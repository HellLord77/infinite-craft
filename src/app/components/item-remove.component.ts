import {Component, HostBinding, HostListener, inject, input} from '@angular/core';

import {StorageElement} from '../models/storage-element.model';
import {DataService} from '../services/data.service';
import {SoundService} from '../services/sound.service';

@Component({
  selector: 'app-item-remove',
  standalone: true,
  imports: [],
  templateUrl: './item-remove.component.html',
  styleUrl: './item-remove.component.css',
})
export class ItemRemoveComponent {
  element = input.required<StorageElement>();

  soundService = inject(SoundService);

  dataService = inject(DataService);

  @HostBinding('class.dark-mode') get darkMode() {
    return this.dataService.isDarkMode();
  }

  @HostListener('click') onClick() {
    this.dataService.toggleElementHidden(this.element());
    this.soundService.playDelete();
  }
}
