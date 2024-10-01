import {Component, HostBinding, inject} from '@angular/core';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-sound',
  standalone: true,
  imports: [],
  templateUrl: './sound.component.html',
  styleUrl: './sound.component.css',
})
export class SoundComponent {
  dataService = inject(DataService);

  @HostBinding('class.dark-mode') get darkMode() {
    return this.dataService.isDarkMode();
  }
}
