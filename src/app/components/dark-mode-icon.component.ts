import {Component, HostListener, inject} from '@angular/core';
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

  @HostListener('click') onClick() {
    this.infiniteCraftDataService.toggleDarkMode();
  }
}
