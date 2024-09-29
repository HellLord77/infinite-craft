import {Component, ElementRef, inject, input} from '@angular/core';
import {ItemComponent} from "../item/item.component";
import {UtilityService} from "../../services/utility.service";
import {Instance} from "../../models/instance.model";
import {ConstantService} from "../../services/constant.service";

@Component({
  selector: 'app-instance',
  standalone: true,
  imports: [ItemComponent],
  templateUrl: './instance.component.html',
  styleUrl: './instance.component.css'
})
export class InstanceComponent {
  instance = input.required<Instance>();
  private elementRef = inject(ElementRef);
  private constantService = inject(ConstantService);
  private utilityService = inject(UtilityService);

  get item(): HTMLElement {
    return this.elementRef.nativeElement.getElementsByTagName('app-item')[0];
  }

  onContextMenu(mouseEvent: MouseEvent) {
    console.log('instance.onContextMenu()', mouseEvent);
    mouseEvent.preventDefault();
  }

  onDblClick() {
    const boundingClientRect = this.elementRef.nativeElement.getBoundingClientRect();
    const center = this.utilityService.rectToCenter(boundingClientRect);
    center.x += 10;
    center.y -= 10;
    const instance: Instance = {
      element: this.instance().element,
      id: this.constantService.id,
      center: center,
      zIndex: this.constantService.zIndex
    };
    this.constantService.instances.push(instance);
  }
}
