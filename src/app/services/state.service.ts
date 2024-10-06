import {Injectable} from '@angular/core';
import {FormControl} from '@angular/forms';

import {Sort} from '../enums/sort';
import {Instance} from '../models/instance.model';
import {Point} from '../models/point.model';
import {StorageElement} from '../models/storage-element.model';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  readonly searchControl = new FormControl('');

  private readonly instances = new Map<number, Instance>();

  private deleteMode = false;
  private discoveriesActive = false;
  private sort = Sort.time;
  private id = 0;
  private zIndex = 10;

  iterInstances() {
    return this.instances.values();
  }

  clearInstances() {
    this.instances.clear();
  }

  addInstance(element: StorageElement, center: Point) {
    const instance: Instance = {
      id: ++this.id,
      element: element,
      center: center,
    };
    this.instances.set(instance.id, instance);
  }

  removeInstance(instance: Instance) {
    this.instances.delete(instance.id);
  }

  isDeleteMode() {
    return this.deleteMode;
  }

  resetDeleteMode() {
    this.deleteMode = false;
  }

  toggleDeleteMode() {
    this.deleteMode = !this.deleteMode;
  }

  isDiscoveriesActive() {
    return this.discoveriesActive;
  }

  toggleDiscoveriesActive() {
    return (this.discoveriesActive = !this.discoveriesActive);
  }

  getSort() {
    return this.sort;
  }

  nextSort() {
    this.sort = (this.sort + 1) % 3;
  }

  nextZIndex() {
    return ++this.zIndex;
  }
}
