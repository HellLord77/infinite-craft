import {inject, Injectable} from '@angular/core';
import {InfiniteCraftData} from "../models/infinite-craft-data.model";
import {HasToJSON} from "../models/has-to-json.model";
import {StorageElement} from "../models/storage-element.model";
import {UtilityService} from "./utility.service";

@Injectable({
  providedIn: 'root'
})
export class InfiniteCraftDataService implements InfiniteCraftData, HasToJSON {
  private utilityService = inject(UtilityService);

  constructor() {
    this.init();

    let infiniteCraftDataJSON = localStorage.getItem('infinite-craft-data');
    if (infiniteCraftDataJSON !== null) {
      let infiniteCraftData: InfiniteCraftData;
      try {
        infiniteCraftData = JSON.parse(infiniteCraftDataJSON);
      } catch (e) {
        return;
      }

      const elementTexts: Set<string> = new Set();
      for (const element of this._elements) {
        elementTexts.add(element.text);
      }
      if (Array.isArray(infiniteCraftData.elements)) {
        for (const element of infiniteCraftData.elements) {
          if (this.utilityService.isObjectStorageElement(element) && !elementTexts.has(element.text)) {
            this._elements.push(element);
            elementTexts.add(element.text);
          }
        }
      }

      this._darkMode = Boolean(infiniteCraftData.darkMode);
    }
  }

  private _elements!: StorageElement[];

  get elements(): StorageElement[] {
    return this._elements;
  }

  set elements(elements: StorageElement[]) {
    this._elements = elements;
    this.store();
  }

  private _darkMode!: boolean;

  get darkMode(): boolean {
    return this._darkMode;
  }

  set darkMode(darkMode: boolean) {
    this._darkMode = darkMode;
    this.store();
  }

  toJSON(): InfiniteCraftData {
    return {elements: this._elements, darkMode: this._darkMode};
  }

  init() {
    this._elements = [
      {"text": "Water", "emoji": "💧", "discovered": false},
      {"text": "Fire", "emoji": "🔥", "discovered": false},
      {"text": "Wind", "emoji": "🌬️", "discovered": false},
      {"text": "Earth", "emoji": "🌍", "discovered": false}
    ];
    this._darkMode = false;
  }

  store() {
    localStorage.setItem('infinite-craft-data', JSON.stringify(this));
  }

  reset() {
    this.init();
    this.store();
  }

  toggleDarkMode(): boolean {
    return this.darkMode = !this._darkMode;
  }
}
