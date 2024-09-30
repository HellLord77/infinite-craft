import {Component, inject, viewChildren} from '@angular/core';
import {NgStyle} from '@angular/common';
import {ItemComponent} from './item.component';
import {CdkDrag} from '@angular/cdk/drag-drop';
import {InstanceComponent} from './instance.component';
import {UtilityService} from '../services/utility.service';
import {ConstantService} from '../services/constant.service';
import {animate, query, style, transition, trigger} from '@angular/animations';

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
  utilityService = inject(UtilityService);
  constantService = inject(ConstantService);
  private intersectedItemComponent: ItemComponent | null = null;
  private instanceComponents = viewChildren(InstanceComponent);

  onDragStartedInstance(instanceComponent: InstanceComponent) {
    instanceComponent.zIndex = this.constantService.getZIndex();
    const itemComponent = instanceComponent.itemComponent();
    itemComponent.instanceSelected = true;
    this.intersectedItemComponent = null;
  }

  onDragEndedInstance(instanceComponent: InstanceComponent) {
    const itemComponent = instanceComponent.itemComponent();
    if (this.intersectedItemComponent !== null) {
      this.drop(itemComponent);
    }
    itemComponent.instanceSelected = false;
    this.intersectedItemComponent = null;
  }

  onDragMovedInstance(instanceComponent: InstanceComponent) {
    const itemComponent = instanceComponent.itemComponent();
    const boundingClientRect = this.utilityService.elementRefGetBoundingClientRect(
      itemComponent.elementRef,
    );
    const instance = instanceComponent.instance();
    instance.center = this.utilityService.elementRefGetCenter(itemComponent.elementRef);

    if (this.intersectedItemComponent !== null) {
      const otherBoundingClientRect = this.utilityService.elementRefGetBoundingClientRect(
        this.intersectedItemComponent.elementRef,
      );
      if (this.utilityService.rectIntersects(boundingClientRect, otherBoundingClientRect)) {
        return;
      } else {
        this.dragLeave();
        this.intersectedItemComponent = null;
      }
    }

    for (const otherInstanceComponent of this.instanceComponents()) {
      const otherItemComponent = otherInstanceComponent.itemComponent();
      if (otherItemComponent !== itemComponent) {
        const otherBoundingClientRect = this.utilityService.elementRefGetBoundingClientRect(
          otherItemComponent.elementRef,
        );
        if (this.utilityService.rectIntersects(boundingClientRect, otherBoundingClientRect)) {
          this.intersectedItemComponent = otherItemComponent;
          this.dragEnter();
          break;
        }
      }
    }
  }

  onDragReleasedInstance() {
    console.log('instances.onDragReleased()');
  }

  dragEnter() {
    this.intersectedItemComponent!.instanceHover = true;
  }

  dragLeave() {
    this.intersectedItemComponent!.instanceHover = false;
  }

  drop(itemComponent: ItemComponent) {
    itemComponent.instanceDisabled = true;
    this.intersectedItemComponent!.instanceDisabled = true;
    // httpClient service
    // reactive if request failed or result === Nothing
    // pinwheel if result not in local storage
    // remove these and add new if valid result
  }
}
