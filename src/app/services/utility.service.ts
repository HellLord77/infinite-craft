import {Injectable} from '@angular/core';
import {InstanceElement} from "../models/instance-element.model";
import {StorageElement} from "../models/storage-element.model";
import {Point} from "@angular/cdk/drag-drop";

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  elements: InstanceElement[] = [];
  private _zIndex: number = 10;

  get zIndex(): number {
    return this._zIndex += 1;
  }

  isStorageElement(obj: any): obj is StorageElement {
    return typeof obj === 'object' &&
      typeof obj.text === 'string' &&
      typeof obj.emoji === 'string' &&
      typeof obj.discovered === 'boolean' &&
      (obj.hidden === undefined || typeof obj.hidden === 'boolean');
  }

  getCenter(boundingClientRect: DOMRect): Point {
    const centerX: number = boundingClientRect.x + boundingClientRect.width / 2;
    const centerY: number = boundingClientRect.y + boundingClientRect.height / 2;
    return {'x': centerX, 'y': centerY};
  }

  doesIntersect(domRect1: DOMRect, domRect2: DOMRect): boolean {
    return domRect1.left < domRect2.right &&
      domRect1.right > domRect2.left &&
      domRect1.top < domRect2.bottom &&
      domRect1.bottom > domRect2.top;
  }
}
