import {Component, inject, input, viewChildren} from '@angular/core';
import {NgStyle} from '@angular/common';
import {ItemComponent} from './item.component';
import {CdkDrag} from '@angular/cdk/drag-drop';
import {InstanceComponent} from './instance.component';
import {UtilityService} from '../services/utility.service';
import {ConstantService} from '../services/constant.service';
import {animate, query, style, transition, trigger} from '@angular/animations';
import {SidebarComponent} from './sidebar.component';

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

  utilityService = inject(UtilityService);
  constantService = inject(ConstantService);

  private intersectsSidebarComponent = false;
  private intersectedItemComponent: ItemComponent | null = null;

  onDragStartedInstance(instanceComponent: InstanceComponent) {
    instanceComponent.zIndex = this.constantService.getZIndex();
    instanceComponent.itemComponent().instanceSelected = true;
    this.intersectedItemComponent = null;
  }

  onDragEndedInstance(instanceComponent: InstanceComponent) {
    if (this.intersectsSidebarComponent) {
      this.drop(instanceComponent);
    } else if (this.intersectedItemComponent !== null) {
      this.drop(instanceComponent);
    }
    instanceComponent.itemComponent().instanceSelected = false;
    this.intersectedItemComponent = null;
  }

  onDragMovedInstance(instanceComponent: InstanceComponent) {
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

  drop(instanceComponent: InstanceComponent) {
    if (this.intersectsSidebarComponent) {
      this.utilityService.arrayRemoveItem(
        this.constantService.instances,
        instanceComponent.instance(),
      );
    } else {
      instanceComponent.itemComponent().instanceDisabled = true;
      this.intersectedItemComponent!.instanceDisabled = true;
      // httpClient service
      // reactive if request failed or result === Nothing
      // pinwheel if result not in local storage
      // remove these and add new if valid result
    }
  }
}
