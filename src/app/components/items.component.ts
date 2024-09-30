import {Component, inject, OnInit, viewChildren} from '@angular/core';
import {ItemComponent} from './item.component';
import {InfiniteCraftDataService} from '../services/infinite-craft-data.service';
import {Instance} from '../models/instance.model';
import {ConstantService} from '../services/constant.service';
import {NgClass} from '@angular/common';
import {DeleteModeService} from '../services/delete-mode.service';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [NgClass, ItemComponent],
  templateUrl: './items.component.html',
  styleUrl: './items.component.css',
})
export class ItemsComponent implements OnInit {
  itemComponents = viewChildren(ItemComponent);

  private constantService = inject(ConstantService);
  private infiniteCraftDataService = inject(InfiniteCraftDataService);
  private deleteModeService = inject(DeleteModeService);

  ngOnInit() {
    this.deleteModeService.itemsComponent = this;
  }

  getElements() {
    return this.infiniteCraftDataService.getElements();
  }

  onMouseDownItem(itemComponent: ItemComponent) {
    if (!this.deleteModeService.isDeleteMode()) {
      const instance: Instance = {
        element: itemComponent.element(),
        center: itemComponent.getCenter(),
      };
      this.constantService.instances.push(instance);
    }
  }
}
