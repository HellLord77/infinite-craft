import {Point} from './point.model';
import {StorageElement} from './storage-element.model';

export interface Instance {
  id: number;
  element: StorageElement;
  center: Point;
  lineCount?: number;
}
