import {Injectable} from '@angular/core';
import {Instance} from "../models/instance.model";

@Injectable({
  providedIn: 'root'
})
export class ConstantService {
  instances: Instance[] = [];
  private _id: number = 0;

  get id(): number {
    return this._id += 1;
  }

  private _zIndex: number = 10;

  get zIndex(): number {
    return this._zIndex += 1;
  }
}
