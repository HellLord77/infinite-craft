import {Component, HostBinding, inject} from '@angular/core';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.css',
})
export class LogoComponent {
  dataService = inject(DataService);

  @HostBinding('class.dark-mode') get darkMode() {
    return this.dataService.isDarkMode();
  }
}
