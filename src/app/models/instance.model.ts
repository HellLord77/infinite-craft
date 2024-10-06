import {Point} from './point.model';
import {StorageElement} from './storage-element.model';

export interface Instance {
  id: number;
  readonly element: StorageElement;
  readonly center: Point;
  lineCount?: number;
}
