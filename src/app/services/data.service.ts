import {Injectable, inject} from '@angular/core';

import {Element} from '../models/element.model';
import {HasToJSON} from '../models/has-to-json.model';
import {InfiniteCraftData} from '../models/infinite-craft-data.model';
import {StorageElement, instanceOf} from '../models/storage-element.model';

import {ConfigService} from './config.service';

@Injectable({
  providedIn: 'root',
})
export class DataService implements HasToJSON {
  configService = inject(ConfigService);

  private elements!: Map<string, StorageElement>;
  private darkMode!: boolean;

  constructor() {
    this.init();

    const infiniteCraftDataJSON = localStorage.getItem(this.configService.dataKey);
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

  exists() {
    return localStorage.getItem(this.configService.dataKey) !== null;
  }

  store() {
    localStorage.setItem(this.configService.dataKey, JSON.stringify(this));
  }

  clear() {
    localStorage.removeItem(this.configService.dataKey);
  }

  getElements() {
    return Array.from(this.elements.values());
  }

  hasElement(element: Element) {
    return this.elements.has(element.text);
  }

  setElement(element: StorageElement) {
    this.elements.set(element.text, element);
    this.store();
  }

  isDarkMode() {
    return this.darkMode;
  }

  toggleElementHidden(element: StorageElement) {
    element.hidden = !element.hidden;
    this.store();
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    this.store();
  }
}
