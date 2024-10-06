import {Component, inject, input, viewChildren} from '@angular/core';

import {Sort} from '../enums/sort';
import {DataService} from '../services/data.service';
import {StateService} from '../services/state.service';
import {InstancesComponent} from './instances.component';
import {ItemComponent} from './item.component';

@Component({
  selector: 'app-items-inner',
  standalone: true,
  imports: [ItemComponent],
  templateUrl: './items-inner.component.html',
  styleUrl: './items-inner.component.css',
})
export class ItemsInnerComponent {
  itemComponents = viewChildren(ItemComponent);

  instancesComponent = input.required<InstancesComponent>();

  stateService = inject(StateService);
  dataService = inject(DataService);

  getFilteredElements() {
    let elements = this.dataService.getElements();
    if (this.stateService.searchControl.value!.length !== 0) {
      const searchValue = this.stateService.searchControl.value!.toLowerCase();
      elements = elements.filter((element) => element.text.toLowerCase().includes(searchValue));
    }
    if (this.stateService.isDiscoveriesActive()) {
      elements = elements.filter((element) => element.discovered);
    }
    if (!this.stateService.isDeleteMode()) {
      elements = elements.filter((element) => !element.hidden);
    }
    return elements;
  }

  getSortedElements() {
    const elements = this.getFilteredElements();
    if (this.stateService.getSort() === Sort.name) {
      return elements.sort((element1, element2) => element1.text.localeCompare(element2.text));
    } else if (this.stateService.getSort() === Sort.emoji) {
      return elements.sort((element1, element2) => element1.emoji.localeCompare(element2.emoji));
    }
    return elements;
  }
}
