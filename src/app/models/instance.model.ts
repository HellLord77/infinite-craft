import {Point} from './point.model';
import {StorageElement} from './storage-element.model';

export interface Instance {
  element: StorageElement;
  center: Point;
}
