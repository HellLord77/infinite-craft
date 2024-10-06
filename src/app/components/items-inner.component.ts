import {Component, inject, input} from '@angular/core';

import {Sort} from '../enums/sort';
import {StorageElement} from '../models/storage-element.model';
import {DataService} from '../services/data.service';
import {StateService} from '../services/state.service';
import {UtilityService} from '../services/utility.service';
import {InstancesComponent} from './instances.component';
import {ItemComponent} from './item.component';
import {ItemsRowComponent} from './items-row.component';

@Component({
  selector: 'app-items-inner',
  standalone: true,
  imports: [ItemComponent, ItemsRowComponent],
  templateUrl: './items-inner.component.html',
  styleUrl: './items-inner.component.css',
})
export class ItemsInnerComponent {
  instancesComponent = input.required<InstancesComponent>();

  utilityService = inject(UtilityService);
  stateService = inject(StateService);
  dataService = inject(DataService);

  getElements() {
    // TODO: cache

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

    if (this.stateService.getSort() === Sort.name) {
      return elements.sort((element1, element2) => element1.text.localeCompare(element2.text));
    } else if (this.stateService.getSort() === Sort.emoji) {
      return elements.sort((element1, element2) => element1.emoji.localeCompare(element2.emoji));
    }
    return elements;
  }

  getElementRows() {
    const elements = this.getElements();
    const rows: StorageElement[][] = [[], [], [], []];
    for (let index = 0; index < elements.length; ++index) {
      let pushed = false;
      const element = elements[index];
      for (const row of rows) {
        if (row.length < 4 && !pushed) {
          row.push(element);
          pushed = true;
        }
      }
      if (!pushed) {
        rows[index % 4].push(element);
      }
    }
    return rows;
  }
}
