import {Component, inject} from '@angular/core';
import {ItemComponent} from "../item/item.component";
import {InfiniteCraftDataService} from "../../services/infinite-craft-data.service";
import {InstanceElement} from "../../models/instance-element.model";
import {UtilityService} from "../../services/utility.service";

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [ItemComponent],
  templateUrl: './items.component.html',
  styleUrl: './items.component.css'
})
export class ItemsComponent {
  private infiniteCraftDataService = inject(InfiniteCraftDataService);
  private utilityService = inject(UtilityService);

  get elements() { /* TODO */
    return this.infiniteCraftDataService.elements;
  }

  onMouseDown(itemComponent: ItemComponent) {
    let instanceElement: InstanceElement = {...itemComponent.element(), 'center': itemComponent.center};
    this.utilityService.elements.push(instanceElement);
  }
}
