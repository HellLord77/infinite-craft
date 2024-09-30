import {Injectable} from '@angular/core';
import {Instance} from '../models/instance.model';

@Injectable({
  providedIn: 'root',
})
export class ConstantService {
  readonly instances: Instance[] = [];

  private _zIndex = 10;

  getZIndex(): number {
    return (this._zIndex += 1);
  }
}
