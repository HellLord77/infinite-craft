import {Result} from './result.model';

export interface Element {
  readonly text: string;
  readonly emoji: string;
}

export function get(): Element {
  return {text: 'Nothing', emoji: ''};
}

export function toResult(element: Element): Result {
  return {result: element.text, emoji: element.emoji, isNew: false};
}
