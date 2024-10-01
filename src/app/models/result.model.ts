import {StorageElement} from './storage-element.model';

export interface Result {
  result: string;
  emoji: string;
  isNew: boolean;
}

export function toStorageElement(result: Result): StorageElement {
  return {text: result.result, emoji: result.emoji, discovered: result.isNew};
}
