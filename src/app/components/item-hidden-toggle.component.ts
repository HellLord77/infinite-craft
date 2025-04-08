import {Component, HostBinding, HostListener, inject, input} from '@angular/core';

import {DataService} from '../services/data.service';
import {SoundService} from '../services/sound.service';
import {ItemComponent} from './item.component';

@Component({
  selector: 'app-item-hidden-toggle',
  imports: [],
  templateUrl: './item-hidden-toggle.component.html',
  styleUrl: './item-hidden-toggle.component.css',
})
export class ItemHiddenToggleComponent {
  itemComponent = input.required<ItemComponent>();

  soundService = inject(SoundService);

  dataService = inject(DataService);

  @HostBinding('class.dark-mode') get darkMode() {
    return this.dataService.isDarkMode();
  }

  @HostListener('click') onClick() {
    const itemComponent = this.itemComponent();
    itemComponent.hidden = this.dataService.toggleElementHidden(itemComponent.element());
    this.soundService.playDelete();
  }
}
