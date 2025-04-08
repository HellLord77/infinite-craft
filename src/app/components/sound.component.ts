import {Component, HostListener, inject} from '@angular/core';

import {DataService} from '../services/data.service';

@Component({
  selector: 'app-sound',
  imports: [],
  templateUrl: './sound.component.html',
  styleUrl: './sound.component.css',
})
export class SoundComponent {
  dataService = inject(DataService);

  @HostListener('click') onClick() {
    this.dataService.toggleMuted();
  }
}
