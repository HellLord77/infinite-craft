import {Component} from '@angular/core';
import {DarkModeIconComponent} from './dark-mode-icon.component';
import {SoundComponent} from './sound.component';

@Component({
  selector: 'app-side-controls-mobile',
  standalone: true,
  imports: [DarkModeIconComponent, SoundComponent],
  templateUrl: './side-controls-mobile.component.html',
  styleUrl: './side-controls-mobile.component.css',
})
export class SideControlsMobileComponent {}
