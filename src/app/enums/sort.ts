import {StorageElement} from '../models/storage-element.model';

export enum Sort {
  time,
  name,
  emoji,
  length,
  random,
}

function sortName(element1: StorageElement, element2: StorageElement) {
  return element1.text.localeCompare(element2.text);
}

function sortEmoji(element1: StorageElement, element2: StorageElement) {
  return element1.emoji.localeCompare(element2.emoji);
}

function sortLength(element1: StorageElement, element2: StorageElement) {
  return element1.text.length - element2.text.length;
}

function sortRandom() {
  return Math.random() - 0.5;
}

export function toCompareFn(
  sort: Sort,
): ((element1: StorageElement, element2: StorageElement) => number) | undefined {
  switch (sort) {
    case Sort.name:
      return sortName;
    case Sort.emoji:
      return sortEmoji;
    case Sort.length:
      return sortLength;
    case Sort.random:
      return sortRandom;
    default:
      return undefined;
  }
}
