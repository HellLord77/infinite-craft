import {Element} from './element.model';

export interface StorageElement extends Element {
  discovered: boolean;
  hidden?: boolean;
}

export function isInstance(object: any): object is StorageElement {
  return (
    typeof object === 'object' &&
    typeof object.text === 'string' &&
    typeof object.emoji === 'string' &&
    typeof object.discovered === 'boolean' &&
    (object.hidden === undefined || typeof object.hidden === 'boolean')
  );
}
