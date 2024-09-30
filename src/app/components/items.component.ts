import {Component, inject, OnInit, viewChildren} from '@angular/core';
import {ItemComponent} from './item.component';
import {InfiniteCraftDataService} from '../services/infinite-craft-data.service';
import {Instance} from '../models/instance.model';
import {ConstantService} from '../services/constant.service';
import {NgClass} from '@angular/common';
import {DeleteModeService} from '../services/delete-mode.service';
import {UtilityService} from '../services/utility.service';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [NgClass, ItemComponent],
  templateUrl: './items.component.html',
  styleUrl: './items.component.css',
})
export class ItemsComponent implements OnInit {
  itemComponents = viewChildren(ItemComponent);

  utilityService = inject(UtilityService);
  constantService = inject(ConstantService);
  infiniteCraftDataService = inject(InfiniteCraftDataService);
  deleteModeService = inject(DeleteModeService);

  ngOnInit() {
    this.deleteModeService.itemsComponent = this;
  }

  onMouseDownItem(itemComponent: ItemComponent) {
    if (!this.deleteModeService.isDeleteMode()) {
      const instance: Instance = {
        element: itemComponent.element(),
        center: this.utilityService.elementRefGetCenter(itemComponent.elementRef),
      };
      this.constantService.instances.push(instance);
    }
  }
}
