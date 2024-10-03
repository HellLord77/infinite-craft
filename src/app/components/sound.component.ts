import {Component, HostListener, inject} from '@angular/core';
import {SoundService} from '../services/sound.service';

@Component({
  selector: 'app-sound',
  standalone: true,
  imports: [],
  templateUrl: './sound.component.html',
  styleUrl: './sound.component.css',
})
export class SoundComponent {
  soundService = inject(SoundService);

  @HostListener('click') onClick() {
    this.soundService.toggleMuted();
  }
}
