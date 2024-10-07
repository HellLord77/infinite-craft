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
import {Subscription, timer} from 'rxjs';

import {MouseButton} from '../enums/mouse-button';
import {Instance} from '../models/instance.model';
import {clone, get, Point, toTranslate, update} from '../models/point.model';
import {ConfigService} from '../services/config.service';
import {SoundService} from '../services/sound.service';
import {StateService} from '../services/state.service';
import {UtilityService} from '../services/utility.service';
import {InstanceDiscoveredTextComponent} from './instance-discovered-text.component';
import {InstancesComponent} from './instances.component';
import {ItemComponent} from './item.component';
import {SidebarComponent} from './sidebar.component';

@Component({
  selector: 'app-instance',
  standalone: true,
  imports: [ItemComponent, InstanceDiscoveredTextComponent],
  templateUrl: './instance.component.html',
  styleUrl: './instance.component.css',
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
  configService = inject(ConfigService);
  stateService = inject(StateService);
  soundService = inject(SoundService);

  private firstMouseDownPosition?: Point;
  private subscriptionTouchLong?: Subscription;

  private lastTouchStart = 0;

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
      this.firstMouseDownPosition = {x: mouseEvent.clientX, y: mouseEvent.clientY};
    } else {
      this.soundService.playInstance(0.09);
    }

    const instancesComponent = this.instancesComponent();
    const instance = this.instance();
    instancesComponent.selectedOffset.x = instance.center.x - mouseEvent.clientX;
    instancesComponent.selectedOffset.y = instance.center.y - mouseEvent.clientY;
    instancesComponent.selectedInstanceComponent = this;

    this.instancesComponent().dragStart();
    return false;
  }

  @HostListener('touchstart', ['$event']) onTouchStart(touchEvent: TouchEvent) {
    const touchStart = Date.now();
    if (touchStart - this.lastTouchStart <= 500) {
      this.onDblClick();
      return false;
    }
    this.lastTouchStart = touchStart;

    this.onTouchMove();

    return this.onMouseDown(this.utilityService.touchEventGetMouseEvent(touchEvent)!);
  }

  @HostListener('touchend') onTouchEnd() {
    if (this.subscriptionTouchLong !== undefined) {
      this.subscriptionTouchLong.unsubscribe();
      this.subscriptionTouchLong = undefined;
    }
  }

  @HostListener('touchmove') onTouchMove() {
    this.onTouchEnd();

    this.subscriptionTouchLong = timer(500).subscribe(() => {
      this.onContextMenu();
    });
  }

  @HostListener('contextmenu') onContextMenu() {
    this.stateService.removeInstance(this.instance());
    this.soundService.playDelete();
    return false;
  }

  @HostListener('dblclick') onDblClick() {
    const center = this.utilityService.elementRefGetCenter(this.elementRef);
    center.x += 10;
    center.y -= 10;
    const instance = this.stateService.addInstance(this.instance().element, center);

    const instancesComponent = this.instancesComponent();
    instancesComponent.changeDetectorRef.detectChanges();
    Promise.resolve().then(() => {
      instancesComponent.getLastInstanceComponent(instance)!.updateCenter();
    });
  }

  onMouseUp(mouseEvent: MouseEvent) {
    if (this.firstMouseDownPosition === undefined) {
      return false;
    }

    // TODO: handle dragEvent.start === dragEvent.end
    const notDragged =
      this.firstMouseDownPosition.x === mouseEvent.clientX &&
      this.firstMouseDownPosition.y === mouseEvent.clientY;

    if (notDragged) {
      const angle = 2 * Math.PI * Math.random();
      const offsetX = 50 * Math.sin(angle);
      const offsetY = 50 * Math.cos(angle);

      const center = get();
      if (this.utilityService.isMobile()) {
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
    if (this.utilityService.isMobile()) {
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

    const minX = this.configService.instanceMarginX + width / 2;
    const maxX = offsetX - this.configService.instanceMarginX + innerWidth - width / 2;
    center.x =
      minX > maxX ? (minX + maxX) / 2 : this.utilityService.numberClamp(center.x, minX, maxX);

    const minY = this.configService.instanceMarginY + height / 2;
    const maxY = offsetY - this.configService.instanceMarginY + innerHeight - height / 2;
    center.y =
      minY > maxY ? (minY + maxY) / 2 : this.utilityService.numberClamp(center.y, minY, maxY);

    this.setCenter(center);
  }
}
