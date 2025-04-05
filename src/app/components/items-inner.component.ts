import {Component, inject, input} from '@angular/core';

import {environment} from '../../environments/environment';
import {toCompareFn} from '../enums/sort';
import {StorageElement} from '../models/storage-element.model';
import {DataService} from '../services/data.service';
import {StateService} from '../services/state.service';
import {InstancesComponent} from './instances.component';
import {ItemWrapperComponent} from './item-wrapper.component';
import {ItemsRowComponent} from './items-row.component';
import {SidebarComponent} from './sidebar.component';

@Component({
  selector: 'app-items-inner',
  standalone: true,
  imports: [ItemsRowComponent, ItemWrapperComponent],
  templateUrl: './items-inner.component.html',
  styleUrl: './items-inner.component.css',
})
export class ItemsInnerComponent {
  sidebarComponent = input.required<SidebarComponent>();
  instancesComponent = input.required<InstancesComponent>();

  stateService = inject(StateService);
  dataService = inject(DataService);

  private cachedValue?: StorageElement[];

  private cachedKey = '';

  getElements() {
    const search = this.stateService.searchControl.value!.toLowerCase();
    const discoveriesActive = this.stateService.isDiscoveriesActive();
    const hiddenMode = this.stateService.isHiddenMode();
    const sort = this.stateService.getSort();
    const sortFlip = this.stateService.isSortFlip();

    const key = JSON.stringify([search, discoveriesActive, hiddenMode, sort, sortFlip]);
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
    if (!hiddenMode) {
      elements = elements.filter((element) => !element.hidden);
    }
    elements = elements.slice(0, environment.itemsInnerMaxElementCount);

    const compareFn = toCompareFn(sort);
    elements = compareFn ? elements.sort(compareFn) : elements;

    if (sortFlip) {
      elements = elements.reverse();
    }

    this.dataService.elementsChanged = false;
    this.cachedKey = key;
    this.cachedValue = elements;

    Promise.resolve().then(() => {
      this.sidebarComponent().updateFadeShow();
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
