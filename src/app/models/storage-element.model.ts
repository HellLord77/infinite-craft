import {Element} from './element.model';

export interface StorageElement extends Element {
  readonly discovered: boolean;
  hidden?: boolean;
}

export function instanceOf(object: unknown): object is StorageElement {
  return (
    typeof object === 'object' &&
    object !== null &&
    'text' in object &&
    typeof object.text === 'string' &&
    'emoji' in object &&
    typeof object.emoji === 'string' &&
    'discovered' in object &&
    typeof object.discovered === 'boolean' &&
    (!('hidden' in object) || typeof object.hidden === 'boolean')
  );
}
