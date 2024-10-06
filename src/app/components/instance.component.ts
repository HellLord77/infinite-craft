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
import {ItemComponent} from './item.component';
import {UtilityService} from '../services/utility.service';
import {Instance} from '../models/instance.model';
import {StateService} from '../services/state.service';
import {get, Point, toTranslate, update} from '../models/point.model';
import {InstanceDiscoveredTextComponent} from './instance-discovered-text.component';
import {SoundService} from '../services/sound.service';
import {InstancesComponent} from './instances.component';
import {MouseButton} from '../enums/mouse-button';
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
  stateService = inject(StateService);
  soundService = inject(SoundService);

  private firstMouseDown: Point | null = null;

  ngOnInit() {
    this.setCenter(this.instance().center);
    this.zIndex = this.stateService.nextZIndex();
    this.itemComponent().instance = true;
  }

  @HostListener('mousedown', ['$event']) onMouseDown(mouseEvent: MouseEvent, simulated = false) {
    if (mouseEvent.button === MouseButton.Left) {
      if (simulated) {
        this.firstMouseDown = {x: mouseEvent.clientX, y: mouseEvent.clientY};
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
      if (this.firstMouseDown !== null) {
        if (
          this.firstMouseDown.x === mouseEvent.clientX &&
          this.firstMouseDown.y === mouseEvent.clientY
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
        this.firstMouseDown = null;
      }
    }
  }

  @HostListener('contextmenu') onContextMenu() {
    this.stateService.removeInstance(this.instance());
    this.soundService.playDelete();
    return false;
  }

  @HostListener('dblclick') onDblClick() {
    const boundingClientRect = this.utilityService.elementRefGetBoundingClientRect(this.elementRef);
    const center = this.utilityService.rectGetCenter(boundingClientRect);
    center.x += 10;
    center.y -= 10;
    this.stateService.addInstance(this.instance().element, center);
  }

  setCenter(center: Point) {
    update(this.instance().center, center);
    this.translate = toTranslate(center);
  }
}
