import {Component, inject, input, viewChildren} from '@angular/core';
import {NgStyle} from '@angular/common';
import {ItemComponent} from './item.component';
import {CdkDrag} from '@angular/cdk/drag-drop';
import {InstanceComponent} from './instance.component';
import {UtilityService} from '../services/utility.service';
import {ConstantService} from '../services/constant.service';
import {animate, query, style, transition, trigger} from '@angular/animations';
import {SidebarComponent} from './sidebar.component';
import {ApiService} from '../services/api.service';
import {toStorageElement} from '../models/result.model';
import {DataService} from '../services/data.service';
import {Instance} from '../models/instance.model';
import {getCenter, toTranslate} from '../models/point.model';
import {PinwheelComponent} from './pinwheel.component';

@Component({
  selector: 'app-instances',
  standalone: true,
  imports: [NgStyle, CdkDrag, InstanceComponent, ItemComponent],
  templateUrl: './instances.component.html',
  styleUrl: './instances.component.css',
  animations: [
    trigger('instance-anim', [
      transition(':enter', [
        style({transform: 'scale(0.5)'}),
        animate('0.13s ease-in', style({transform: 'scale(1)'})),
      ]),
      transition(':leave', [
        query(
          'app-item',
          animate(
            '0.16s linear',
            style({
              transform: 'scale(0)',
              opacity: 0,
            }),
          ),
        ),
      ]),
    ]),
  ],
})
export class InstancesComponent {
  instanceComponents = viewChildren(InstanceComponent);

  sidebarComponent = input.required<SidebarComponent>();
  pinwheelComponent = input.required<PinwheelComponent>();

  utilityService = inject(UtilityService);
  constantService = inject(ConstantService);
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
      this.intersectedInstanceComponent.itemComponent().instanceHover = false;
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

    for (const otherInstanceComponent of this.instanceComponents()) {
      const otherItemComponent = otherInstanceComponent.itemComponent();
      if (otherItemComponent !== itemComponent) {
        const otherBoundingClientRect = this.utilityService.elementRefGetBoundingClientRect(
          otherItemComponent.elementRef,
        );
        if (this.utilityService.rectIntersects(boundingClientRect, otherBoundingClientRect)) {
          this.intersectedInstanceComponent = otherInstanceComponent;
          this.dragEnter();
          break;
        }
      }
    }
  }

  onInstanceDragReleased() {
    console.log('instances.onDragReleased()');
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
              // TODO: pinwheel
              this.pinwheelComponent().translate = toTranslate(center);
              this.dataService.setElement(element);
            }
          }
        });
    }
  }
}
