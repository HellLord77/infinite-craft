import {Component, HostListener, inject} from '@angular/core';

import {SoundService} from '../services/sound.service';
import {StateService} from '../services/state.service';

@Component({
  selector: 'app-clear',
  standalone: true,
  imports: [],
  templateUrl: './clear.component.html',
  styleUrl: './clear.component.css',
})
export class ClearComponent {
  stateService = inject(StateService);
  soundService = inject(SoundService);

  @HostListener('window:keydown.Escape') onWindowKeyDown() {
    this.stateService.normalMode();
  }

  @HostListener('click') onClick() {
    this.stateService.clearInstances();
    this.soundService.playDelete();
  }
}
