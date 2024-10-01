import {Component, inject} from '@angular/core';
import {ItemComponent} from './item.component';
import {DataService} from '../services/data.service';
import {Instance} from '../models/instance.model';
import {ConstantService} from '../services/constant.service';
import {NgClass} from '@angular/common';
import {UtilityService} from '../services/utility.service';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [NgClass, ItemComponent],
  templateUrl: './items.component.html',
  styleUrl: './items.component.css',
})
export class ItemsComponent {
  utilityService = inject(UtilityService);
  constantService = inject(ConstantService);
  dataService = inject(DataService);

  onMouseDownItem(itemComponent: ItemComponent) {
    if (!this.constantService.isDeleteMode()) {
      const instance: Instance = {
        element: itemComponent.element(),
        center: this.utilityService.elementRefGetCenter(itemComponent.elementRef),
      };
      this.constantService.instances.push(instance);
    }
  }
}
