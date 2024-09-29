import {Component, inject} from '@angular/core';
import {ItemComponent} from "../item/item.component";
import {InfiniteCraftDataService} from "../../services/infinite-craft-data.service";
import {Instance} from "../../models/instance.model";
import {ConstantService} from "../../services/constant.service";

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [ItemComponent],
  templateUrl: './items.component.html',
  styleUrl: './items.component.css'
})
export class ItemsComponent {
  private infiniteCraftDataService = inject(InfiniteCraftDataService);
  private constantService = inject(ConstantService);

  get elements() { /* TODO */
    return this.infiniteCraftDataService.elements;
  }

  onMouseDown(itemComponent: ItemComponent) {
    let instance: Instance = {
      element: itemComponent.element(),
      id: this.constantService.id,
      center: itemComponent.center,
      zIndex: this.constantService.zIndex
    };
    this.constantService.instances.push(instance);
  }
}
