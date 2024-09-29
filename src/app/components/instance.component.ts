import { Component, ElementRef, inject, input, viewChild } from '@angular/core';
import { ItemComponent } from './item.component';
import { UtilityService } from '../services/utility.service';
import { Instance } from '../models/instance.model';
import { ConstantService } from '../services/constant.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-instance',
  standalone: true,
  imports: [NgClass, ItemComponent],
  templateUrl: './instance.component.html',
  styleUrl: './instance.component.css',
})
export class InstanceComponent {
  itemClassList: string[] = [];

  itemComponent = viewChild.required(ItemComponent);

  instance = input.required<Instance>();

  private elementRef = inject(ElementRef);
  private constantService = inject(ConstantService);
  private utilityService = inject(UtilityService);

  onContextMenu(mouseEvent: MouseEvent) {
    console.log('instance.onContextMenu()', mouseEvent);
    mouseEvent.preventDefault();
    this.utilityService.arrayRemoveItem(
      this.constantService.instances,
      this.instance(),
    );
  }

  onDblClick() {
    const instance = this.instance();
    const boundingClientRect: DOMRect =
      this.elementRef.nativeElement.getBoundingClientRect();
    const center = this.utilityService.rectToCenter(boundingClientRect);
    center.x += 10;
    center.y -= 10;
    const otherInstance: Instance = {
      element: instance.element,
      id: this.constantService.getId(),
      center: center,
      zIndex: this.constantService.getZIndex(),
    };
    this.constantService.instances.push(otherInstance);
  }
}
