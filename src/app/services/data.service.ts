import {inject, Injectable} from '@angular/core';

import {environment} from '../../environments/environment';
import {Element} from '../models/element.model';
import {HasToJSON} from '../models/has-to-json.model';
import {InfiniteCraftData} from '../models/infinite-craft-data.model';
import {instanceOf, StorageElement} from '../models/storage-element.model';
import {SoundService} from './sound.service';

@Injectable({
  providedIn: 'root',
})
export class DataService implements HasToJSON {
  elementsChanged = false;

  soundService = inject(SoundService);

  private elements!: Map<string, StorageElement>;
  private darkMode!: boolean;
  private muted!: boolean;

  constructor() {
    this.init();

    const infiniteCraftDataJSON = localStorage.getItem(environment.dataKey);
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

      this.darkMode = Boolean(infiniteCraftData.isDarkMode);
      this.muted = Boolean(infiniteCraftData.isMuted);

      this.soundService.setMuted(this.muted);
    }
  }

  toJSON(): InfiniteCraftData {
    for (const element of this.elements.values()) {
      if (element.hidden === false) {
        delete element.hidden;
      }
    }
    return {
      elements: [...this.elements.values()],
      isDarkMode: this.darkMode,
      isMuted: this.muted,
    };
  }

  init() {
    const elements: Element[] = [
      {text: 'Water', emoji: '💧'},
      {text: 'Fire', emoji: '🔥'},
      {text: 'Wind', emoji: '🌬️'},
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
    this.darkMode = environment.dataDefaultDarkMode;
    this.muted = environment.dataDefaultMuted;
  }

  exists() {
    return localStorage.getItem(environment.dataKey) !== null;
  }

  store() {
    localStorage.setItem(environment.dataKey, JSON.stringify(this));
  }

  clear() {
    localStorage.removeItem(environment.dataKey);
  }

  getElements() {
    return [...this.elements.values()];
  }

  hasElement(element: Element) {
    return this.elements.has(element.text);
  }

  setElement(element: StorageElement) {
    this.elements.set(element.text, element);
    this.elementsChanged = true;
    this.store();
  }

  toggleElementHidden(element: StorageElement) {
    element.hidden = !element.hidden;
    this.elementsChanged = true;
    this.store();
    return element.hidden;
  }

  isDarkMode() {
    return this.darkMode;
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    this.store();
  }

  isMuted() {
    return this.muted;
  }

  toggleMuted() {
    this.muted = !this.muted;
    this.store();
    this.soundService.setMuted(this.muted);
  }
}
