import {isInstance as pointIsInstance, Point} from './point.model';
import {isInstance as instanceElementIsInstance, StorageElement} from './storage-element.model';

export interface InstanceStorageElement extends StorageElement {
  center: Point;
}

export function isInstance(object: unknown): object is InstanceStorageElement {
  return instanceElementIsInstance(object) && 'center' in object && pointIsInstance(object.center);
}
