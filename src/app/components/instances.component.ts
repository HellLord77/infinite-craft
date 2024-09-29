import { Component, inject, viewChildren } from '@angular/core';
import { NgStyle } from '@angular/common';
import { ItemComponent } from './item.component';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { InstanceComponent } from './instance.component';
import { UtilityService } from '../services/utility.service';
import { Instance } from '../models/instance.model';
import { ConstantService } from '../services/constant.service';
import {
  animate,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-instances',
  standalone: true,
  imports: [NgStyle, CdkDrag, InstanceComponent, ItemComponent],
  templateUrl: './instances.component.html',
  styleUrl: './instances.component.css',
  animations: [
    trigger('instance-anim', [
      transition(':enter', [
        style({ transform: 'scale(0.5)' }),
        animate('0.13s ease-in', style({ transform: 'scale(1)' })),
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
  private intersectionInstanceComponent: InstanceComponent | null = null;

  private instanceComponents = viewChildren(InstanceComponent);

  private utilityService = inject(UtilityService);
  private constantService = inject(ConstantService);

  getInstances(): Instance[] {
    return this.constantService.instances;
  }

  onDragStarted(instanceComponent: InstanceComponent) {
    const instance = instanceComponent.instance();
    instance.zIndex = this.constantService.getZIndex();
    instanceComponent.itemClassList.push(ItemComponent.instanceSelectedClass);
    this.intersectionInstanceComponent = null;
  }

  onDragEnded(instanceComponent: InstanceComponent) {
    if (this.intersectionInstanceComponent !== null) {
      this.onDragDropped(instanceComponent);
    }
    this.utilityService.arrayRemoveItem(
      instanceComponent.itemClassList,
      ItemComponent.instanceSelectedClass,
    );
    this.intersectionInstanceComponent = null;
  }

  onDragMoved(instanceComponent: InstanceComponent) {
    const itemComponent = instanceComponent.itemComponent();
    const boundingClientRect = itemComponent.getBoundingClientRect();
    instanceComponent.instance().center = itemComponent.getCenter();

    if (this.intersectionInstanceComponent !== null) {
      const otherItemComponent =
        this.intersectionInstanceComponent.itemComponent();
      const otherBoundingClientRect =
        otherItemComponent.getBoundingClientRect();
      if (
        this.utilityService.doRectsIntersect(
          boundingClientRect,
          otherBoundingClientRect,
        )
      ) {
        return;
      } else {
        this.onDragExited(instanceComponent);
        this.intersectionInstanceComponent = null;
      }
    }

    for (const otherInstanceComponent of this.instanceComponents()) {
      const otherItemComponent = otherInstanceComponent.itemComponent();
      if (otherInstanceComponent !== instanceComponent) {
        const otherBoundingClientRect =
          otherItemComponent.getBoundingClientRect();
        if (
          this.utilityService.doRectsIntersect(
            boundingClientRect,
            otherBoundingClientRect,
          )
        ) {
          this.intersectionInstanceComponent = otherInstanceComponent;
          this.onDragEntered(instanceComponent);
          break;
        }
      }
    }
  }

  onDragEntered(instanceComponent: InstanceComponent) {
    console.log('instances.onDragEntered()', instanceComponent);
    this.intersectionInstanceComponent!.itemClassList.push(
      ItemComponent.instanceHoverClass,
    );
  }

  onDragExited(instanceComponent: InstanceComponent) {
    console.log('instances.onDragExited()', instanceComponent);
    this.utilityService.arrayRemoveItem(
      this.intersectionInstanceComponent!.itemClassList,
      ItemComponent.instanceHoverClass,
    );
  }

  onDragDropped(instanceComponent: InstanceComponent) {
    console.log('instances.onDragDropped()', instanceComponent);
    instanceComponent.itemClassList.push(ItemComponent.instanceDisabledClass);
    this.intersectionInstanceComponent!.itemClassList.push(
      ItemComponent.instanceDisabledClass,
    );
    // httpClient service
    // reactive if request failed or result === Nothing
    // pinwheel if result not in local storage
    // remove these and add new if valid result
  }

  onDragReleased() {
    console.log('instances.onDragReleased()');
  }
}
