import {Component, HostListener, inject} from '@angular/core';
import {StateService} from '../services/state.service';
import {SoundService} from '../services/sound.service';

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
    this.stateService.resetDeleteMode();
  }

  @HostListener('click') onClick() {
    this.stateService.instances.length = 0;
    this.soundService.playDelete();
  }
}
