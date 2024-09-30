import {Component, HostBinding, inject} from '@angular/core';
import {InfiniteCraftDataService} from '../services/infinite-craft-data.service';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.css',
})
export class LogoComponent {
  infiniteCraftDataService = inject(InfiniteCraftDataService);

  @HostBinding('class.dark-mode') get darkMode() {
    return this.infiniteCraftDataService.isDarkMode();
  }
}
