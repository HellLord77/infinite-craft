import { Injectable } from '@angular/core';
import { Instance } from '../models/instance.model';

@Injectable({
  providedIn: 'root',
})
export class ConstantService {
  readonly instances: Instance[] = [];

  private _id: number = 0;
  private _zIndex: number = 10;

  getId(): number {
    return (this._id += 1);
  }

  getZIndex(): number {
    return (this._zIndex += 1);
  }
}
