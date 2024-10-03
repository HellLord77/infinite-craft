import {Component, inject, viewChildren} from '@angular/core';
import {ItemComponent} from './item.component';
import {UtilityService} from '../services/utility.service';
import {ConstantService} from '../services/constant.service';
import {DataService} from '../services/data.service';
import {Instance} from '../models/instance.model';
import {Sort} from '../enums/sort';

@Component({
  selector: 'app-items-inner',
  standalone: true,
  imports: [ItemComponent],
  templateUrl: './items-inner.component.html',
  styleUrl: './items-inner.component.css',
})
export class ItemsInnerComponent {
  itemComponents = viewChildren(ItemComponent);

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

  getFilteredElements() {
    let elements = this.dataService.getElements();
    let searchValue = this.constantService.searchControl.value!;
    if (searchValue.length !== 0) {
      searchValue = searchValue.toLowerCase();
      elements = elements.filter((element) => element.text.toLowerCase().includes(searchValue));
    }
    if (this.constantService.isDiscoveriesActive()) {
      elements = elements.filter((element) => element.discovered);
    }
    if (this.constantService.isDeleteMode()) {
      elements = elements.filter((element) => !element.hidden);
    }
    return elements;
  }

  getSortedElements() {
    const elements = this.getFilteredElements();
    if (this.constantService.getSort() === Sort.name) {
      return elements.sort((element1, element2) => element1.text.localeCompare(element2.text));
    } else if (this.constantService.getSort() === Sort.emoji) {
      return elements.sort((element1, element2) => element1.emoji.localeCompare(element2.emoji));
    }
    return elements;
  }
}
