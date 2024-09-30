import {ElementRef, Injectable} from '@angular/core';
import {Point} from '../models/point.model';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  isValid<T>(object: T | null | undefined): object is T {
    return object !== null && object !== undefined;
  }

  arrayRemoveItem<T>(array: T[] | null | undefined, item: T): void {
    if (this.isValid(array)) {
      const index: number = array.indexOf(item);
      if (index !== -1) {
        array.splice(index, 1);
      }
    }
  }

  rectGetCenter(rect: DOMRect): Point {
    const centerX: number = rect.x + rect.width / 2;
    const centerY: number = rect.y + rect.height / 2;
    return {x: centerX, y: centerY};
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

  isMobile(): boolean {
    return innerWidth < 800;
  }
}
