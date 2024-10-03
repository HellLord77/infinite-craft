import {Injectable} from '@angular/core';
import {Instance} from '../models/instance.model';
import {Sort} from '../enums/sort';
import {FormControl} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ConstantService {
  readonly instances: Instance[] = [];
  readonly searchControl = new FormControl('');

  private discoveriesActive = false;
  private deleteMode = false;
  private zIndex = 10;
  private sort = Sort.time;

  isDiscoveriesActive() {
    return this.discoveriesActive;
  }

  toggleDiscoveriesActive() {
    return (this.discoveriesActive = !this.discoveriesActive);
  }

  isDeleteMode() {
    return this.deleteMode;
  }

  resetDeleteMode() {
    this.deleteMode = false;
  }

  toggleDeleteMode() {
    return (this.deleteMode = !this.deleteMode);
  }

  getZIndex() {
    return (this.zIndex += 1);
  }

  getSort() {
    return this.sort;
  }

  nextSort() {
    return (this.sort = ((this.sort + 1) % 3) as Sort);
  }
}
