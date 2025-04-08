import {Component, HostListener, inject} from '@angular/core';

import {DataService} from '../services/data.service';

@Component({
  selector: 'app-dark-mode-icon',
  imports: [],
  templateUrl: './dark-mode-icon.component.html',
  styleUrl: './dark-mode-icon.component.css',
})
export class DarkModeIconComponent {
  dataService = inject(DataService);

  @HostListener('click') onClick() {
    this.dataService.toggleDarkMode();
  }
}
