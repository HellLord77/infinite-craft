import {Injectable} from '@angular/core';
import {Instance} from '../models/instance.model';

@Injectable({
  providedIn: 'root',
})
export class ConstantService {
  readonly instances: Instance[] = [];

  private _deleteMode = false;
  private _zIndex = 10;

  isDeleteMode(): boolean {
    return this._deleteMode;
  }

  toggleDeleteMode(): void {
    this._deleteMode = !this._deleteMode;
  }

  getZIndex(): number {
    return (this._zIndex += 1);
  }
}
