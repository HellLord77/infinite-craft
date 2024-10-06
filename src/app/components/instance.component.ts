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

  private firstMouseDownPosition: Point | null = null;

  ngOnInit() {
    this.setCenter(this.instance().center);
    this.zIndex = this.stateService.nextZIndex();
    this.itemComponent().instance = true;
  }

  @HostListener('window:resize') onWindowResize() {
    let offsetX = 0;
    let offsetY = 0;
    if (this.utilityService.isMobile()) {
      offsetY = -this.sidebarComponent().elementRef.nativeElement.clientHeight;
    } else {
      offsetX = -this.sidebarComponent().elementRef.nativeElement.clientWidth;
    }

    const boundingClientRect = this.utilityService.elementRefGetBoundingClientRect(this.elementRef);
    const center = clone(this.instance().center);

    const maxRight = offsetX - this.configService.instanceMargin + innerWidth;
    if (boundingClientRect.right > maxRight) {
      center.x = maxRight - boundingClientRect.width / 2;
    }
    const maxBottom = offsetY - this.configService.instanceMargin + innerHeight;
    if (boundingClientRect.bottom > maxBottom) {
      center.y = maxBottom - boundingClientRect.height / 2;
    }

    this.setCenter(center);
  }

  @HostListener('mousedown', ['$event']) onMouseDown(
    mouseEvent: MouseEvent,
    fromItemMouseDown = false,
  ) {
    if (mouseEvent.button === MouseButton.Left) {
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
    }
  }

  @HostListener('mouseup', ['$event']) onMouseUp(mouseEvent: MouseEvent) {
    if (mouseEvent.button === MouseButton.Left) {
      if (this.firstMouseDownPosition !== null) {
        if (
          this.firstMouseDownPosition.x === mouseEvent.clientX &&
          this.firstMouseDownPosition.y === mouseEvent.clientY
        ) {
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
              (innerWidth - this.sidebarComponent().elementRef.nativeElement.clientWidth) / 2;
            center.y = offsetY - 40 + innerHeight / 2;
          }
          this.setCenter(center);
        }
        this.firstMouseDownPosition = null;
      }
    }
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
    this.stateService.addInstance(this.instance().element, center);
  }

  setCenter(center: Point) {
    update(this.instance().center, center);
    this.translate = toTranslate(center);
  }
}
