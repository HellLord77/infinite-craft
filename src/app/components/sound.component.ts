import {Component, HostBinding, inject} from '@angular/core';
import {InfiniteCraftDataService} from '../services/infinite-craft-data.service';

@Component({
  selector: 'app-sound',
  standalone: true,
  imports: [],
  templateUrl: './sound.component.html',
  styleUrl: './sound.component.css',
})
export class SoundComponent {
  infiniteCraftDataService = inject(InfiniteCraftDataService);

  @HostBinding('class.dark-mode') get darkMode() {
    return this.infiniteCraftDataService.isDarkMode();
  }
}
