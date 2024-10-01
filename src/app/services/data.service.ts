import {Injectable} from '@angular/core';
import {InfiniteCraftData} from '../models/infinite-craft-data.model';
import {HasToJSON} from '../models/has-to-json.model';
import {instanceOf, StorageElement} from '../models/storage-element.model';
import {Element} from '../models/element.model';

@Injectable({
  providedIn: 'root',
})
export class DataService implements HasToJSON {
  private elements!: Map<string, StorageElement>;
  private darkMode!: boolean;

  constructor() {
    this.init();

    const infiniteCraftDataJSON = localStorage.getItem('infinite-craft-data');
    if (infiniteCraftDataJSON !== null) {
      let infiniteCraftData: InfiniteCraftData;
      try {
        infiniteCraftData = JSON.parse(infiniteCraftDataJSON);
      } catch {
        return;
      }

      if (Array.isArray(infiniteCraftData.elements)) {
        for (const element of infiniteCraftData.elements) {
          if (instanceOf(element) && !this.elements.has(element.text)) {
            this.elements.set(element.text, element);
          }
        }
      }

      this.darkMode = Boolean(infiniteCraftData.darkMode);
    }

    this.store();
  }

  toJSON(): InfiniteCraftData {
    for (const element of this.elements.values()) {
      if (element.hidden === false) {
        delete element.hidden;
      }
    }
    return {elements: [...this.elements.values()], darkMode: this.darkMode};
  }

  init() {
    const elements: Element[] = [
      {text: 'Water', emoji: '💧'},
      {text: 'Fire', emoji: '🔥'},
      {
        text: 'Wind',
        emoji: '🌬️',
      },
      {text: 'Earth', emoji: '🌍'},
    ];
    this.elements = new Map(
      elements.map((element): [string, StorageElement] => [
        element.text,
        {
          ...element,
          discovered: false,
        },
      ]),
    );
    this.darkMode = false;
  }

  store() {
    localStorage.setItem('infinite-craft-data', JSON.stringify(this));
  }

  clear() {
    localStorage.removeItem('infinite-craft-data');
  }

  iterElements(): Iterable<StorageElement> {
    return this.elements.values();
  }

  hasElement(element: Element): boolean {
    return this.elements.has(element.text);
  }

  setElement(element: StorageElement) {
    this.elements.set(element.text, element);
    this.store();
  }

  isDarkMode(): boolean {
    return this.darkMode;
  }

  toggleElementHidden(element: StorageElement): boolean {
    element.hidden = !element.hidden;
    this.store();
    return element.hidden;
  }

  toggleDarkMode(): boolean {
    this.darkMode = !this.darkMode;
    this.store();
    return this.darkMode;
  }
}
