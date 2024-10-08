import {Component, HostBinding, HostListener, inject, input} from '@angular/core';

import {DataService} from '../services/data.service';
import {SoundService} from '../services/sound.service';
import {ItemComponent} from './item.component';

@Component({
  selector: 'app-item-remove',
  standalone: true,
  imports: [],
  templateUrl: './item-remove.component.html',
  styleUrl: './item-remove.component.css',
})
export class ItemRemoveComponent {
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
