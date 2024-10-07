import {Component, inject, input} from '@angular/core';

import {Sort} from '../enums/sort';
import {StorageElement} from '../models/storage-element.model';
import {ConfigService} from '../services/config.service';
import {DataService} from '../services/data.service';
import {StateService} from '../services/state.service';
import {UtilityService} from '../services/utility.service';
import {InstancesComponent} from './instances.component';
import {ItemComponent} from './item.component';
import {ItemsRowComponent} from './items-row.component';
import {SidebarComponent} from './sidebar.component';

@Component({
  selector: 'app-items-inner',
  standalone: true,
  imports: [ItemComponent, ItemsRowComponent],
  templateUrl: './items-inner.component.html',
  styleUrl: './items-inner.component.css',
})
export class ItemsInnerComponent {
  sidebarComponent = input.required<SidebarComponent>();
  instancesComponent = input.required<InstancesComponent>();

  utilityService = inject(UtilityService);
  configService = inject(ConfigService);
  stateService = inject(StateService);
  dataService = inject(DataService);

  private cachedValue?: StorageElement[];

  private cachedKey = '';

  getElements() {
    const search = this.stateService.searchControl.value!.toLowerCase();
    const discoveriesActive = this.stateService.isDiscoveriesActive();
    const deleteMode = this.stateService.isDeleteMode();
    const sort = this.stateService.getSort();

    const key = JSON.stringify([search, discoveriesActive, deleteMode, sort]);
    if (
      !this.dataService.elementsChanged &&
      this.cachedValue !== undefined &&
      key === this.cachedKey
    ) {
      return this.cachedValue;
    }

    let elements = this.dataService.getElements();
    if (search.length !== 0) {
      elements = elements.filter((element) => element.text.toLowerCase().includes(search));
    }
    if (discoveriesActive) {
      elements = elements.filter((element) => element.discovered);
    }
    if (!deleteMode) {
      elements = elements.filter((element) => !element.hidden);
    }
    elements = elements.slice(0, this.configService.itemsInnerMaxElementCount);

    if (sort === Sort.name) {
      elements = elements.sort((element1, element2) => element1.text.localeCompare(element2.text));
    } else if (sort === Sort.emoji) {
      elements = elements.sort((element1, element2) =>
        element1.emoji.localeCompare(element2.emoji),
      );
    }

    this.dataService.elementsChanged = false;
    this.cachedKey = key;
    this.cachedValue = elements;

    Promise.resolve().then(() => {
      this.sidebarComponent().onWindowResize();
    });

    return elements;
  }

  getElementRows() {
    // TODO: cache

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
