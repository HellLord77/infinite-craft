import {Injectable} from '@angular/core';
import {Instance} from '../models/instance.model';
import {Sort} from '../enums/sort';
import {FormControl} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  readonly instances: Instance[] = [];
  readonly searchControl = new FormControl('');

  private deleteMode = false;
  private discoveriesActive = false;
  private sort = Sort.time;

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
    return (this.sort = ((this.sort + 1) % 3) as Sort);
  }
}
