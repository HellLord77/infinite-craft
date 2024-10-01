import {Injectable} from '@angular/core';
import {Instance} from '../models/instance.model';

@Injectable({
  providedIn: 'root',
})
export class ConstantService {
  readonly instances: Instance[] = [];

  private deleteMode = false;
  private zIndex = 10;

  isDeleteMode(): boolean {
    return this.deleteMode;
  }

  toggleDeleteMode(): boolean {
    return (this.deleteMode = !this.deleteMode);
  }

  getZIndex(): number {
    return (this.zIndex += 1);
  }
}
