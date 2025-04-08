import {
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  inject,
  input,
  OnInit,
  viewChild,
} from '@angular/core';

import {environment} from '../../environments/environment';
import {TouchContextDirective} from '../directives/touch-context.directive';
import {TouchDoubleDirective} from '../directives/touch-double.directive';
import {MouseButton} from '../enums/mouse-button';
import {Instance} from '../models/instance.model';
import {clone, equals, get, getSubtracted, Point, toTranslate, update} from '../models/point.model';
import {SoundService} from '../services/sound.service';
import {StateService} from '../services/state.service';
import {UtilityService} from '../services/utility.service';
import {InstanceDiscoveredTextComponent} from './instance-discovered-text.component';
import {InstancesComponent} from './instances.component';
import {ItemComponent} from './item.component';
import {SidebarComponent} from './sidebar.component';

@Component({
  selector: 'app-instance',
  imports: [ItemComponent, InstanceDiscoveredTextComponent],
  templateUrl: './instance.component.html',
  styleUrl: './instance.component.css',
  hostDirectives: [
    {directive: TouchContextDirective, outputs: ['touchcontext']},
    {directive: TouchDoubleDirective, outputs: ['touchdouble']},
  ],
})
export class InstanceComponent implements OnInit {
  @HostBinding('class.selected') selected = false;
  @HostBinding('class.disabled') disabled = false;
  @HostBinding('class.hover') hover = false;
  @HostBinding('style.translate') translate = 'none';
  @HostBinding('style.z-index') zIndex = 0;

  itemComponent = viewChild.required(ItemComponent);

  instance = input.required<Instance>();
  sidebarComponent = input.required<SidebarComponent>();
  instancesComponent = input.required<InstancesComponent>();

  elementRef: ElementRef<HTMLElement> = inject(ElementRef);
  utilityService = inject(UtilityService);
  stateService = inject(StateService);
  soundService = inject(SoundService);

  private firstMouseDownPosition?: Point;

  private lastTouchDoubleEvent?: TouchEvent;

  ngOnInit() {
    this.setCenter(this.instance().center);
    this.zIndex = this.stateService.nextZIndex();
    this.itemComponent().instance = true;
  }

  @HostListener('window:resize') onWindowResize() {
    this.updateCenter();
  }

  @HostListener('mousedown', ['$event']) onMouseDown(
    mouseEvent: MouseEvent,
    fromItemMouseDown = false,
  ) {
    if (mouseEvent.button !== MouseButton.Left) {
      return true;
    }

    if (fromItemMouseDown) {
      this.firstMouseDownPosition = clone(mouseEvent);
    } else {
      this.soundService.playInstance(0.09);
    }

    const instancesComponent = this.instancesComponent();
    const instance = this.instance();
    instancesComponent.selectedOffset = getSubtracted(instance.center, mouseEvent);
    instancesComponent.selectedInstanceComponent = this;

    this.instancesComponent().dragStart();
    return false;
  }

  @HostListener('touchstart', ['$event']) onTouchStart(touchEvent: TouchEvent) {
    if (touchEvent === this.lastTouchDoubleEvent) {
      return false;
    }

    return this.onMouseDown(this.utilityService.touchEventGetMouseEvent(touchEvent)!);
  }

  @HostListener('contextmenu') onContextMenu() {
    this.stateService.removeInstance(this.instance());
    this.soundService.playDelete();
    return false;
  }

  @HostListener('dblclick') onDblClick() {
    const center = this.utilityService.elementRefGetCenter(this.itemComponent().elementRef);
    center.x += 10;
    center.y -= 10;
    const instance = this.stateService.addInstance(this.instance().element, center);

    const instancesComponent = this.instancesComponent();
    instancesComponent.changeDetectorRef.detectChanges();
    Promise.resolve().then(() => {
      instancesComponent.getLastInstanceComponent(instance)!.updateCenter();
    });
  }

  @HostListener('touchcontext') onTouchContext() {
    this.onContextMenu();
  }

  @HostListener('touchdouble', ['$event']) onTouchDouble(touchEvent: TouchEvent) {
    this.lastTouchDoubleEvent = touchEvent;
    this.onDblClick();
  }

  onMouseUp(mouseEvent: MouseEvent) {
    if (this.firstMouseDownPosition === undefined) {
      return false;
    }

    // TODO: handle dragEvent.start === dragEvent.end
    const notDragged = equals(this.firstMouseDownPosition, mouseEvent);

    if (notDragged) {
      const angle = 2 * Math.PI * Math.random();
      const offsetX = 50 * Math.sin(angle);
      const offsetY = 50 * Math.cos(angle);

      const center = get();
      if (this.stateService.isMobile()) {
        center.x = offsetX - 40 + innerWidth / 2;
        center.y = offsetY - 100 + innerHeight / 2;
      } else {
        center.x =
          offsetX +
          (innerWidth -
            this.utilityService.elementRefGetBoundingClientRect(this.sidebarComponent().elementRef)
              .width) /
            2;
        center.y = offsetY - 40 + innerHeight / 2;
      }

      this.setCenter(center);
      this.updateCenter();
    }

    this.firstMouseDownPosition = undefined;
    return notDragged;
  }

  setCenter(center: Point) {
    update(this.instance().center, center);
    this.translate = toTranslate(center);
  }

  updateCenter() {
    let offsetX = 0;
    let offsetY = 0;
    if (this.stateService.isMobile()) {
      offsetY = -this.utilityService.elementRefGetBoundingClientRect(
        this.sidebarComponent().elementRef,
      ).height;
    } else {
      offsetX = -this.utilityService.elementRefGetBoundingClientRect(
        this.sidebarComponent().elementRef,
      ).width;
    }

    const center = clone(this.instance().center);
    const width = this.elementRef.nativeElement.offsetWidth;
    const height = this.elementRef.nativeElement.offsetHeight;

    const minX = environment.instanceMarginX + width / 2;
    const maxX = offsetX - environment.instanceMarginX + innerWidth - width / 2;
    center.x =
      minX > maxX ? (minX + maxX) / 2 : this.utilityService.numberClamp(center.x, minX, maxX);

    const minY = environment.instanceMarginY + height / 2;
    const maxY = offsetY - environment.instanceMarginY + innerHeight - height / 2;
    center.y =
      minY > maxY ? (minY + maxY) / 2 : this.utilityService.numberClamp(center.y, minY, maxY);

    this.setCenter(center);
  }
}
