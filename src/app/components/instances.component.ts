import {animate, style, transition, trigger} from '@angular/animations';
import {
  ChangeDetectorRef,
  Component,
  HostListener,
  inject,
  input,
  viewChildren,
} from '@angular/core';
import {finalize} from 'rxjs';

import {Instance} from '../models/instance.model';
import {get, getCenter, Point, toTranslate} from '../models/point.model';
import {toStorageElement} from '../models/result.model';
import {ApiService} from '../services/api.service';
import {DataService} from '../services/data.service';
import {SoundService} from '../services/sound.service';
import {StateService} from '../services/state.service';
import {UtilityService} from '../services/utility.service';
import {InstanceComponent} from './instance.component';
import {ItemComponent} from './item.component';
import {PinwheelComponent} from './pinwheel.component';
import {SidebarComponent} from './sidebar.component';

@Component({
  selector: 'app-instances',
  standalone: true,
  imports: [InstanceComponent, ItemComponent],
  templateUrl: './instances.component.html',
  styleUrl: './instances.component.css',
  animations: [
    trigger('instance-anim', [
      transition(':enter', [style({scale: 0.5}), animate('0.13s ease-in', style({scale: 1}))]),
      transition(':leave', [
        animate(
          '0.16s linear',
          style({
            scale: 0,
            opacity: 0,
          }),
        ),
      ]),
    ]),
  ],
})
export class InstancesComponent {
  touchedTouchEvent?: TouchEvent;
  touchedItemComponent?: ItemComponent;
  selectedInstanceComponent?: InstanceComponent;

  readonly selectedOffset = get();

  instanceComponents = viewChildren(InstanceComponent);

  sidebarComponent = input.required<SidebarComponent>();
  pinwheelComponent = input.required<PinwheelComponent>();

  changeDetectorRef = inject(ChangeDetectorRef);
  utilityService = inject(UtilityService);
  stateService = inject(StateService);
  soundService = inject(SoundService);
  dataService = inject(DataService);
  apiService = inject(ApiService);

  private intersectedInstanceComponent?: InstanceComponent;

  @HostListener('document:mouseup', ['$event']) onDocumentMouseUp(mouseEvent: MouseEvent) {
    if (this.selectedInstanceComponent !== undefined) {
      this.dragEnd(mouseEvent);
    }
  }

  @HostListener('document:mousemove', ['$event']) onDocumentMouseMove(mouseEvent: MouseEvent) {
    if (this.selectedInstanceComponent === undefined) {
      return true;
    }

    const center: Point = {
      x: this.selectedOffset.x + mouseEvent.clientX,
      y: this.selectedOffset.y + mouseEvent.clientY,
    };
    this.selectedInstanceComponent.setCenter(center);

    this.drag();
    return false;
  }

  @HostListener('document:touchend', ['$event']) onDocumentTouchEnd(touchEvent: TouchEvent) {
    this.onDocumentMouseUp(this.utilityService.touchEventGetMouseEvent(touchEvent)!);
  }

  @HostListener('document:touchmove', ['$event']) onDocumentTouchMove(touchEvent: TouchEvent) {
    if (this.touchedTouchEvent !== undefined) {
      const mouseEvent = this.utilityService.touchEventGetMouseEvent(touchEvent)!;
      const touchedMouseEvent = this.utilityService.touchEventGetMouseEvent(
        this.touchedTouchEvent,
      )!;

      const deltaX = Math.abs(mouseEvent.clientX - touchedMouseEvent.clientX);
      const deltaY = Math.abs(mouseEvent.clientY - touchedMouseEvent.clientY);

      if (
        (this.utilityService.isMobile() ? Math.atan2(deltaY, deltaX) : Math.atan2(deltaX, deltaY)) >
        0.7
      ) {
        this.touchedItemComponent!.onMouseDown(touchedMouseEvent);
      }

      this.touchedTouchEvent = undefined;
      this.touchedItemComponent = undefined;
    }

    this.onDocumentMouseMove(this.utilityService.touchEventGetMouseEvent(touchEvent)!);
  }

  dragStart() {
    const selectedInstanceComponent = this.selectedInstanceComponent!;
    selectedInstanceComponent.selected = true;
    selectedInstanceComponent.zIndex = this.stateService.nextZIndex();
  }

  dragEnd(mouseEvent: MouseEvent) {
    const selectedInstanceComponent = this.selectedInstanceComponent!;
    selectedInstanceComponent.selected = false;
    this.dragLeave();

    if (!selectedInstanceComponent.onMouseUp(mouseEvent)) {
      this.drop();
    }

    this.selectedInstanceComponent = undefined;
    this.intersectedInstanceComponent = undefined;
  }

  dragEnter() {
    this.intersectedInstanceComponent!.hover = true;
  }

  dragLeave() {
    if (this.intersectedInstanceComponent !== undefined) {
      this.intersectedInstanceComponent.hover = false;
    }
  }

  drag() {
    const itemComponent = this.selectedInstanceComponent!.itemComponent();
    const boundingClientRect = this.utilityService.elementRefGetBoundingClientRect(
      itemComponent.elementRef,
    );

    if (this.intersectedInstanceComponent !== undefined) {
      const otherBoundingClientRect = this.utilityService.elementRefGetBoundingClientRect(
        this.intersectedInstanceComponent.elementRef,
      );
      if (!this.utilityService.rectIntersects(boundingClientRect, otherBoundingClientRect)) {
        this.dragLeave();
        this.intersectedInstanceComponent = undefined;
      }
    }

    let maxZIndex = 0;
    let intersectedInstanceComponent = undefined;
    for (const otherInstanceComponent of this.instanceComponents()) {
      if (
        this.selectedInstanceComponent !== otherInstanceComponent &&
        !otherInstanceComponent.disabled &&
        otherInstanceComponent.zIndex > maxZIndex
      ) {
        const otherBoundingClientRect = this.utilityService.elementRefGetBoundingClientRect(
          otherInstanceComponent.itemComponent().elementRef,
        );
        if (this.utilityService.rectIntersects(boundingClientRect, otherBoundingClientRect)) {
          maxZIndex = otherInstanceComponent.zIndex;
          intersectedInstanceComponent = otherInstanceComponent;
        }
      }
    }

    if (
      intersectedInstanceComponent !== undefined &&
      intersectedInstanceComponent !== this.intersectedInstanceComponent
    ) {
      this.dragLeave();
      this.intersectedInstanceComponent = intersectedInstanceComponent;
      this.dragEnter();
    }
  }

  drop() {
    const selectedInstanceComponent = this.selectedInstanceComponent!;
    const selectedInstance = selectedInstanceComponent.instance();

    if (this.intersectedInstanceComponent !== undefined) {
      selectedInstanceComponent.disabled = true;
      selectedInstanceComponent.updateCenter();

      const intersectedInstanceComponent = this.intersectedInstanceComponent!;
      intersectedInstanceComponent.disabled = true;
      const intersectedInstance = intersectedInstanceComponent.instance();

      this.apiService
        .pair(selectedInstance.element, intersectedInstance.element)
        .pipe(
          finalize(() => {
            selectedInstanceComponent.disabled = false;
            intersectedInstanceComponent.disabled = false;
          }),
        )
        .subscribe((result) => {
          if (result.result === 'Nothing') {
            this.soundService.playError();
          } else {
            this.stateService.removeInstance(selectedInstance);
            this.stateService.removeInstance(intersectedInstance);

            const element = toStorageElement(result);
            const center = getCenter(selectedInstance.center, intersectedInstance.center);
            const instance = this.stateService.addInstance(element, center);

            this.changeDetectorRef.detectChanges();
            Promise.resolve().then(() => {
              this.getLastInstanceComponent(instance)!.updateCenter();
            });

            if (this.dataService.hasElement(element)) {
              this.soundService.playInstance();
            } else {
              this.soundService.playDiscovery();
              this.soundService.playReward();

              const pinwheelComponent = this.pinwheelComponent();
              pinwheelComponent.translate = toTranslate(center);
              pinwheelComponent.setShown(true);

              this.dataService.setElement(element);
            }
          }
        });
    } else {
      const boundingClientRect = this.utilityService.elementRefGetBoundingClientRect(
        selectedInstanceComponent.itemComponent().elementRef,
      );
      const sidebarBoundingClientRect = this.utilityService.elementRefGetBoundingClientRect(
        this.sidebarComponent().elementRef,
      );
      const intersectsSidebarComponent = this.utilityService.rectIntersects(
        boundingClientRect,
        sidebarBoundingClientRect,
      );

      if (intersectsSidebarComponent) {
        this.stateService.removeInstance(selectedInstance);
        this.soundService.playDelete();
      } else {
        selectedInstanceComponent.updateCenter();
      }
    }
  }

  getLastInstanceComponent(instance: Instance) {
    const instanceComponents = this.instanceComponents();
    for (let index = instanceComponents.length - 1; index >= 0; --index) {
      const instanceComponent = instanceComponents[index];
      if (instance.id === instanceComponent.instance().id) {
        return instanceComponent;
      }
    }
    return null;
  }
}
