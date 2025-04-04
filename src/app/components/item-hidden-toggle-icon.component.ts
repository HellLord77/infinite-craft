import {Component, HostBinding, inject, input} from '@angular/core';

import {DataService} from '../services/data.service';
import {ItemComponent} from './item.component';

@Component({
  selector: 'app-item-hidden-toggle-icon',
  standalone: true,
  imports: [],
  templateUrl: './item-hidden-toggle-icon.component.html',
  styleUrl: './item-hidden-toggle-icon.component.css',
})
export class ItemHiddenToggleIconComponent {
  itemComponent = input.required<ItemComponent>();

  dataService = inject(DataService);

  @HostBinding('class.dark-mode') get darkMode() {
    return this.dataService.isDarkMode();
  }
}
