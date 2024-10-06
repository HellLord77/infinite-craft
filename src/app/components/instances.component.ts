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

import {Point, get, getCenter, toTranslate} from '../models/point.model';
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
  selectedOffset = get();
  selectedInstanceComponent: InstanceComponent | null = null;

  instanceComponents = viewChildren(InstanceComponent);

  sidebarComponent = input.required<SidebarComponent>();
  pinwheelComponent = input.required<PinwheelComponent>();

  changeDetectorRef = inject(ChangeDetectorRef);
  utilityService = inject(UtilityService);
  stateService = inject(StateService);
  soundService = inject(SoundService);
  dataService = inject(DataService);
  apiService = inject(ApiService);

  private intersectsSidebarComponent = false;
  private intersectedInstanceComponent: InstanceComponent | null = null;

  @HostListener('document:mouseup') onDocumentMouseUp() {
    const selectedInstanceComponent = this.selectedInstanceComponent !== null;
    if (selectedInstanceComponent) {
      this.dragEnd();
    }
    return selectedInstanceComponent;
  }

  @HostListener('document:mousemove', ['$event']) onDocumentMouseMove(mouseEvent: MouseEvent) {
    const selectedInstanceComponent = this.selectedInstanceComponent !== null;
    if (selectedInstanceComponent) {
      const center: Point = {
        x: this.selectedOffset.x + mouseEvent.clientX,
        y: this.selectedOffset.y + mouseEvent.clientY,
      };
      this.selectedInstanceComponent!.setCenter(center);

      this.drag();
    }
    return selectedInstanceComponent;
  }

  dragStart() {
    this.selectedInstanceComponent!.zIndex = this.stateService.nextZIndex();
    this.selectedInstanceComponent!.selected = true;
    this.intersectedInstanceComponent = null;
  }

  dragEnd() {
    this.selectedInstanceComponent!.selected = false;
    if (this.intersectsSidebarComponent) {
      this.drop();
    } else if (this.intersectedInstanceComponent !== null) {
      this.dragLeave();
      this.drop();
    }
    this.selectedInstanceComponent = null;
    this.intersectedInstanceComponent = null;
  }

  dragEnter() {
    this.intersectedInstanceComponent!.hover = true;
  }

  dragLeave() {
    this.intersectedInstanceComponent!.hover = false;
  }

  drag() {
    const itemComponent = this.selectedInstanceComponent!.itemComponent();
    const boundingClientRect = this.utilityService.elementRefGetBoundingClientRect(
      itemComponent.elementRef,
    );

    const sidebarBoundingClientRect = this.utilityService.elementRefGetBoundingClientRect(
      this.sidebarComponent().elementRef,
    );
    this.intersectsSidebarComponent = this.utilityService.rectIntersects(
      boundingClientRect,
      sidebarBoundingClientRect,
    );

    if (this.intersectedInstanceComponent !== null) {
      const otherBoundingClientRect = this.utilityService.elementRefGetBoundingClientRect(
        this.intersectedInstanceComponent.elementRef,
      );
      if (this.utilityService.rectIntersects(boundingClientRect, otherBoundingClientRect)) {
        return;
      } else {
        this.dragLeave();
        this.intersectedInstanceComponent = null;
      }
    }

    let maxZIndex = 0;
    let intersectedInstanceComponent = null;
    for (const otherInstanceComponent of this.instanceComponents()) {
      const otherItemComponent = otherInstanceComponent.itemComponent();
      if (
        otherItemComponent !== itemComponent &&
        !otherInstanceComponent.disabled &&
        otherInstanceComponent.zIndex > maxZIndex
      ) {
        const otherBoundingClientRect = this.utilityService.elementRefGetBoundingClientRect(
          otherItemComponent.elementRef,
        );
        if (this.utilityService.rectIntersects(boundingClientRect, otherBoundingClientRect)) {
          maxZIndex = otherInstanceComponent.zIndex;
          intersectedInstanceComponent = otherInstanceComponent;
        }
      }
    }
    if (intersectedInstanceComponent !== null) {
      this.intersectedInstanceComponent = intersectedInstanceComponent;
      this.dragEnter();
    }
  }

  drop() {
    const instance = this.selectedInstanceComponent!.instance();
    if (this.intersectsSidebarComponent) {
      this.stateService.removeInstance(instance);
      this.soundService.playDelete();
    } else {
      const selectedInstanceComponent = this.selectedInstanceComponent!;
      selectedInstanceComponent.disabled = true;

      const intersectedInstanceComponent = this.intersectedInstanceComponent!;
      intersectedInstanceComponent.disabled = true;

      this.apiService
        .pair(
          selectedInstanceComponent.itemComponent().element(),
          intersectedInstanceComponent.itemComponent().element(),
        )
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
            const intersectedInstance = intersectedInstanceComponent.instance();
            this.stateService.removeInstance(instance);
            this.stateService.removeInstance(intersectedInstance);

            const element = toStorageElement(result);
            const center = getCenter(instance.center, intersectedInstance.center);
            this.stateService.addInstance(element, center);

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
    }
  }
}
