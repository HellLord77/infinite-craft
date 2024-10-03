import {Component, inject, viewChildren} from '@angular/core';
import {ItemComponent} from './item.component';
import {CdkDrag} from '@angular/cdk/drag-drop';
import {InstanceComponent} from './instance.component';
import {UtilityService} from '../services/utility.service';
import {ConstantService} from '../services/constant.service';
import {animate, style, transition, trigger} from '@angular/animations';
import {ApiService} from '../services/api.service';
import {toStorageElement} from '../models/result.model';
import {DataService} from '../services/data.service';
import {Instance} from '../models/instance.model';
import {getCenter, toTranslate} from '../models/point.model';
import {ComponentService} from '../services/component.service';

@Component({
  selector: 'app-instances',
  standalone: true,
  imports: [CdkDrag, InstanceComponent, ItemComponent],
  templateUrl: './instances.component.html',
  styleUrl: './instances.component.css',
  animations: [
    trigger('instance-anim', [
      transition(':enter', [
        style({transform: 'scale(0.5)'}),
        animate('0.13s ease-in', style({transform: 'scale(1)'})),
      ]),
      transition(':leave', [
        animate(
          '0.16s linear',
          style({
            transform: 'scale(0)',
            opacity: 0,
          }),
        ),
      ]),
    ]),
  ],
})
export class InstancesComponent {
  instanceComponents = viewChildren(InstanceComponent);

  utilityService = inject(UtilityService);
  constantService = inject(ConstantService);
  componentService = inject(ComponentService);
  dataService = inject(DataService);
  apiService = inject(ApiService);

  private intersectsSidebarComponent = false;
  private intersectedInstanceComponent: InstanceComponent | null = null;

  onInstanceDragStarted(instanceComponent: InstanceComponent) {
    instanceComponent.zIndex = this.constantService.getZIndex();
    instanceComponent.itemComponent().instanceSelected = true;
    this.intersectedInstanceComponent = null;
  }

  onInstanceDragEnded(instanceComponent: InstanceComponent) {
    instanceComponent.itemComponent().instanceSelected = false;
    if (this.intersectsSidebarComponent) {
      this.drop(instanceComponent);
    } else if (this.intersectedInstanceComponent !== null) {
      this.dragLeave();
      this.drop(instanceComponent);
    }
    this.intersectedInstanceComponent = null;
  }

  onInstanceDragMoved(instanceComponent: InstanceComponent) {
    const itemComponent = instanceComponent.itemComponent();
    const boundingClientRect = this.utilityService.elementRefGetBoundingClientRect(
      itemComponent.elementRef,
    );
    const instance = instanceComponent.instance();
    instance.center = this.utilityService.elementRefGetCenter(itemComponent.elementRef);

    const sidebarBoundingClientRect = this.utilityService.elementRefGetBoundingClientRect(
      this.componentService.sidebarComponent.elementRef,
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
      if (otherItemComponent !== itemComponent && otherInstanceComponent.zIndex > maxZIndex) {
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

  dragEnter() {
    this.intersectedInstanceComponent!.itemComponent().instanceHover = true;
  }

  dragLeave() {
    this.intersectedInstanceComponent!.itemComponent().instanceHover = false;
  }

  drop(instanceComponent: InstanceComponent) {
    const instance = instanceComponent.instance();
    if (this.intersectsSidebarComponent) {
      this.utilityService.arrayRemoveItem(this.constantService.instances, instance);
    } else {
      const itemComponent = instanceComponent.itemComponent();
      itemComponent.instanceDisabled = true;
      const intersectedInstanceComponent = this.intersectedInstanceComponent!;
      const intersectedItemComponent = intersectedInstanceComponent.itemComponent();
      intersectedItemComponent.instanceDisabled = true;

      this.apiService
        .pair(itemComponent.element(), intersectedItemComponent.element())
        .subscribe((result) => {
          if (result.result === 'Nothing') {
            itemComponent.instanceDisabled = false;
            intersectedItemComponent.instanceDisabled = false;
          } else {
            const intersectedInstance = intersectedInstanceComponent.instance();
            this.utilityService.arrayRemoveItem(this.constantService.instances, instance);
            this.utilityService.arrayRemoveItem(
              this.constantService.instances,
              intersectedInstance,
            );

            const element = toStorageElement(result);
            const center = getCenter(instance.center, intersectedInstance.center);
            const otherInstance: Instance = {element: element, center: center};
            this.constantService.instances.push(otherInstance);

            if (!this.dataService.hasElement(element)) {
              this.componentService.pinwheelComponent.translate = toTranslate(center);
              this.componentService.pinwheelComponent.setShow(true);

              this.dataService.setElement(element);
            }
          }
        });
    }
  }
}
