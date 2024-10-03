import {Component, HostListener} from '@angular/core';

@Component({
  selector: 'app-sound',
  standalone: true,
  imports: [],
  templateUrl: './sound.component.html',
  styleUrl: './sound.component.css',
})
export class SoundComponent {
  @HostListener('click') onClick() {
    console.log('soundOnClick');
  }
}
