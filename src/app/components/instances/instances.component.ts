import {Component, ElementRef, inject} from '@angular/core';
import {NgStyle} from "@angular/common";
import {ItemComponent} from "../item/item.component";
import {CdkDrag, Point} from "@angular/cdk/drag-drop";
import {InstanceComponent} from "../instance/instance.component";
import {UtilityService} from "../../services/utility.service";
import {Instance} from "../../models/instance.model";
import {ConstantService} from "../../services/constant.service";

@Component({
  selector: 'app-instances',
  standalone: true,
  imports: [NgStyle, ItemComponent, CdkDrag, InstanceComponent],
  templateUrl: './instances.component.html',
  styleUrl: './instances.component.css'
})
export class InstancesComponent {
  private instanceSelectedClass = 'instance-selected';
  private instanceHoverClass = 'instance-hover';
  private instanceDisabledClass = 'instance-disabled';
  private utilityService = inject(UtilityService);
  private elementRef = inject(ElementRef);
  private constantService = inject(ConstantService);
  private intersectionItem: Element | null = null;

  get instances(): Instance[] {
    return this.constantService.instances;
  }

  pointToTranslate(point: Point): string {
    return this.utilityService.pointToTranslate(point);
  }

  onDragStarted(instanceComponent: InstanceComponent) {
    instanceComponent.instance().zIndex = this.constantService.zIndex;
    instanceComponent.item.classList.add(this.instanceSelectedClass);
    this.intersectionItem = null;
  }

  onDragEnded(instanceComponent: InstanceComponent) {
    if (this.intersectionItem !== null) {
      this.onDragDropped(instanceComponent);
    }
    instanceComponent.item.classList.remove(this.instanceSelectedClass);
    this.intersectionItem = null;
  }

  onDragMoved(instanceComponent: InstanceComponent) {
    const boundingClientRect1 = instanceComponent.item.getBoundingClientRect();
    if (this.intersectionItem !== null) {
      const boundingClientRect2 = this.intersectionItem.getBoundingClientRect();
      if (this.utilityService.doRectsIntersect(boundingClientRect1, boundingClientRect2)) {
        return;
      } else {
        this.onDragExited(instanceComponent);
        this.intersectionItem = null;
      }
    }

    const items = this.elementRef.nativeElement.getElementsByTagName('app-item');
    for (let index = 0; index < items.length; ++index) {
      const item = items[index];
      if (item !== instanceComponent.item && !item.classList.contains(this.instanceDisabledClass)) {
        const boundingClientRect2 = item.getBoundingClientRect();
        if (this.utilityService.doRectsIntersect(boundingClientRect1, boundingClientRect2)) {
          this.intersectionItem = item;
          this.onDragEntered(instanceComponent);
          break;
        }
      }
    }
  }

  onDragEntered(instanceComponent: InstanceComponent) {
    console.log('instances.onDragEntered()', instanceComponent, this.intersectionItem);
    this.intersectionItem?.classList.add(this.instanceHoverClass);
  }

  onDragExited(instanceComponent: InstanceComponent) {
    console.log('instances.onDragExited()', instanceComponent, this.intersectionItem);
    this.intersectionItem?.classList.remove(this.instanceHoverClass);
  }

  onDragDropped(instanceComponent: InstanceComponent) {
    console.log('instances.onDragDropped()', instanceComponent, this.intersectionItem);
    instanceComponent.item.classList.add(this.instanceDisabledClass);
    this.intersectionItem?.classList.add(this.instanceDisabledClass);
    // httpClient service
    // reactive if request failed or result === Nothing
    // pinwheel if result not in local storage
    // remove these and add new if valid result
  }

  onDragReleased() {
    console.log('instances.onDragReleased()');
  }
}
