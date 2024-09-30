import {Element} from './element.model';

export interface StorageElement extends Element {
  discovered: boolean;
  hidden?: boolean;
}

export function isInstance(object: unknown): object is StorageElement {
  return (
    object !== null &&
    typeof object === 'object' &&
    'text' in object &&
    typeof object.text === 'string' &&
    'emoji' in object &&
    typeof object.emoji === 'string' &&
    'discovered' in object &&
    typeof object.discovered === 'boolean' &&
    (!('hidden' in object) || typeof object.hidden === 'boolean')
  );
}
