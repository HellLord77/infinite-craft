import { Element } from './element.model';

export interface StorageElement extends Element {
  discovered: boolean;
  hidden?: boolean;
}
