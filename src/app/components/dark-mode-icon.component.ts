import {Component, HostBinding, HostListener, inject} from '@angular/core';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-dark-mode-icon',
  standalone: true,
  imports: [],
  templateUrl: './dark-mode-icon.component.html',
  styleUrl: './dark-mode-icon.component.css',
})
export class DarkModeIconComponent {
  dataService = inject(DataService);

  @HostBinding('class.dark-mode') get darkMode() {
    return this.dataService.isDarkMode();
  }

  @HostListener('click') onClick() {
    this.dataService.toggleDarkMode();
  }
}
