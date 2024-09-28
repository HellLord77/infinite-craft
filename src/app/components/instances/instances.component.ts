import {Component, inject} from '@angular/core';
import {InstanceElement} from "../../models/instance-element.model";
import {NgStyle} from "@angular/common";
import {ItemComponent} from "../item/item.component";
import {CdkDrag} from "@angular/cdk/drag-drop";
import {InstanceComponent} from "../instance/instance.component";
import {UtilityService} from "../../services/utility.service";

@Component({
  selector: 'app-instances',
  standalone: true,
  imports: [NgStyle, ItemComponent, CdkDrag, InstanceComponent],
  templateUrl: './instances.component.html',
  styleUrl: './instances.component.css'
})
export class InstancesComponent {
  private instanceHoverClass = 'instance-hover';
  private instanceDisabledClass = 'instance-disabled';
  private utilityService = inject(UtilityService);
  private intersectionItem: Element | null = null;

  get elements(): InstanceElement[] {
    return this.utilityService.elements;
  }

  get zIndex(): number {
    return this.utilityService.zIndex;
  }

  onDragStarted(instanceComponent: InstanceComponent) {
    instanceComponent.zIndex.set(this.zIndex);
    this.intersectionItem = null;
  }

  onDragEnded(instanceComponent: InstanceComponent) {
    if (this.intersectionItem !== null) {
      this.onDragDropped(instanceComponent);
    }
    this.intersectionItem = null;
  }

  onDragMoved(instanceComponent: InstanceComponent) {
    const boundingClientRect1 = instanceComponent.item.getBoundingClientRect();
    if (this.intersectionItem !== null) {
      const boundingClientRect2 = this.intersectionItem.getBoundingClientRect();
      if (this.utilityService.doesIntersect(boundingClientRect1, boundingClientRect2)) {
        return;
      } else {
        this.onDragExited(instanceComponent);
        this.intersectionItem = null;
      }
    }

    const instances = document.getElementsByTagName('app-instance');
    for (let index = 0; index < instances.length; ++index) {
      const instance = instances[index];
      const item = instance.getElementsByTagName('app-item')[0];
      if (item !== instanceComponent.item) {
        const boundingClientRect2 = item.getBoundingClientRect();
        if (this.utilityService.doesIntersect(boundingClientRect1, boundingClientRect2)) {
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
