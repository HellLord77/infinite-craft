import {ElementRef, Injectable} from '@angular/core';

import {MouseButton} from '../enums/mouse-button';
import {Point} from '../models/point.model';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  isValid<T>(object: T | null | undefined): object is T {
    return object !== null && object !== undefined;
  }

  numberClamp(value: number, lower: number, upper: number): number {
    return Math.min(Math.max(value, lower), upper);
  }

  arrayFrom<T>(length: number, item: T): T[] {
    const array: T[] = Array(length);
    array.fill(item);
    return array;
  }

  arrayGetItem<T>(array: readonly T[], index: number): T | null {
    return index < 0 || index >= array.length ? null : array[index];
  }

  arrayLastItem<T>(array: readonly T[]): T | null {
    return this.arrayGetItem(array, array.length - 1);
  }

  arrayRandomItem<T>(array: readonly T[]): T | null {
    return this.arrayGetItem(array, Math.floor(Math.random() * array.length));
  }

  arrayRemoveItem<T>(array: T[] | null | undefined, item: T) {
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

  elementRefGetCenter(elementRef: ElementRef) {
    return this.rectGetCenter(this.elementRefGetBoundingClientRect(elementRef));
  }

  touchEventGetMouseEvent(touchEvent: TouchEvent): MouseEvent | null {
    let type: string;
    switch (touchEvent.type) {
      case 'touchstart':
        type = 'mousedown';
        break;
      case 'touchmove':
        type = 'mousemove';
        break;
      case 'touchend':
        type = 'mouseup';
        break;
      default:
        return null;
    }

    const touch = touchEvent.touches[0];
    return new MouseEvent(type, {
      button: MouseButton.Left,
      buttons: 1,
      clientX: touch.clientX,
      clientY: touch.clientY,
      relatedTarget: touch.target,
      screenX: touch.screenX,
      screenY: touch.screenY,
    });
  }

  isMobile(): boolean {
    return innerWidth < 800;
  }
}
