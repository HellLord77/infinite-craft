import {Injectable} from '@angular/core';
import {InfiniteCraftData} from '../models/infinite-craft-data.model';
import {HasToJSON} from '../models/has-to-json.model';
import {isInstance, StorageElement} from '../models/storage-element.model';

@Injectable({
  providedIn: 'root',
})
export class InfiniteCraftDataService implements HasToJSON {
  private elements!: StorageElement[];
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

      const elementTexts = new Set<string>();
      for (const element of this.elements) {
        elementTexts.add(element.text);
      }
      if (Array.isArray(infiniteCraftData.elements)) {
        for (const element of infiniteCraftData.elements) {
          if (isInstance(element) && !elementTexts.has(element.text)) {
            this.elements.push(element);
            elementTexts.add(element.text);
          }
        }
      }

      this.darkMode = Boolean(infiniteCraftData.darkMode);
    }
  }

  toJSON(): InfiniteCraftData {
    for (const element of this.elements) {
      if (element.hidden === false) {
        delete element.hidden;
      }
    }
    return {elements: this.elements, darkMode: this.darkMode};
  }

  init() {
    this.elements = [
      {text: 'Water', emoji: '💧', discovered: false},
      {
        text: 'Fire',
        emoji: '🔥',
        discovered: false,
      },
      {text: 'Wind', emoji: '🌬️', discovered: false},
      {text: 'Earth', emoji: '🌍', discovered: false},
    ];
    this.darkMode = false;
  }

  save() {
    localStorage.setItem('infinite-craft-data', JSON.stringify(this));
  }

  reset() {
    localStorage.removeItem('infinite-craft-data');
  }

  getElements(): StorageElement[] {
    return this.elements;
  }

  getDarkMode(): boolean {
    return this.darkMode;
  }

  toggleElementHidden(element: StorageElement): boolean {
    element.hidden = !element.hidden;
    this.save();
    return element.hidden;
  }

  toggleDarkMode(): boolean {
    this.darkMode = !this.darkMode;
    this.save();
    return this.darkMode;
  }
}
