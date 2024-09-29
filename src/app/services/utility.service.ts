import { Injectable } from '@angular/core';
import { StorageElement } from '../models/storage-element.model';
import { Point } from '@angular/cdk/drag-drop';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  zip<T, U>(array1: T[], array2: U[]): [T, U][] {
    const length: number = Math.min(array1.length, array2.length);
    const zipped: [T, U][] = [];
    for (let i = 0; i < length; i++) {
      zipped.push([array1[i], array2[i]]);
    }
    return zipped;
  }

  arrayRemoveItem<T>(array: T[], item: T): void {
    const index: number = array.indexOf(item);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }

  isObjectStorageElement(object: any): object is StorageElement {
    return (
      typeof object === 'object' &&
      typeof object.text === 'string' &&
      typeof object.emoji === 'string' &&
      typeof object.discovered === 'boolean' &&
      (object.hidden === undefined || typeof object.hidden === 'boolean')
    );
  }

  pointToTranslate(point: Point): string {
    return `${point.x}px ${point.y}px`;
  }

  getPointsDistance(point1: Point, point2: Point): number {
    return Math.sqrt(
      Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2),
    );
  }

  rectToCenter(boundingClientRect: DOMRect): Point {
    const centerX: number = boundingClientRect.x + boundingClientRect.width / 2;
    const centerY: number =
      boundingClientRect.y + boundingClientRect.height / 2;
    return { x: centerX, y: centerY };
  }

  doRectsIntersect(domRect1: DOMRect, domRect2: DOMRect): boolean {
    return (
      domRect1.left < domRect2.right &&
      domRect1.right > domRect2.left &&
      domRect1.top < domRect2.bottom &&
      domRect1.bottom > domRect2.top
    );
  }
}
