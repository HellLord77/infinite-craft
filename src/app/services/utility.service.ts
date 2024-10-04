import {ElementRef, Injectable} from '@angular/core';
import {Point} from '../models/point.model';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  isValid<T>(object: T | null | undefined): object is T {
    return object !== null && object !== undefined;
  }

  arrayFrom<T>(length: number, item: T): T[] {
    const array: T[] = Array(length);
    array.fill(item);
    return array;
  }

  arrayRandomItem<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }

  arrayRemoveItem<T>(array: T[] | null | undefined, item: T): void {
    if (this.isValid(array)) {
      const index = array.indexOf(item);
      if (index !== -1) {
        array.splice(index, 1);
      }
    }
  }

  rectGetCenter(rect: DOMRect): Point {
    return {x: rect.x + rect.width / 2, y: rect.y + rect.height / 2};
  }

  rectIntersects(rect: DOMRect, other: DOMRect): boolean {
    return (
      rect.left < other.right &&
      rect.right > other.left &&
      rect.top < other.bottom &&
      rect.bottom > other.top
    );
  }

  elementRefGetBoundingClientRect(elementRef: ElementRef): DOMRect {
    return elementRef.nativeElement.getBoundingClientRect();
  }

  elementRefGetCenter(elementRef: ElementRef): Point {
    return this.rectGetCenter(this.elementRefGetBoundingClientRect(elementRef));
  }
}
