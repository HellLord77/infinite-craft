import {Component, HostBinding, HostListener, inject} from '@angular/core';
import {InfiniteCraftDataService} from '../services/infinite-craft-data.service';

@Component({
  selector: 'app-dark-mode-icon',
  standalone: true,
  imports: [],
  templateUrl: './dark-mode-icon.component.html',
  styleUrl: './dark-mode-icon.component.css',
})
export class DarkModeIconComponent {
  infiniteCraftDataService = inject(InfiniteCraftDataService);

  @HostBinding('class.dark-mode') get darkMode() {
    return this.infiniteCraftDataService.isDarkMode();
  }

  @HostListener('click') onClick() {
    this.infiniteCraftDataService.toggleDarkMode();
  }
}
