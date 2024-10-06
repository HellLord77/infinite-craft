import {Component} from '@angular/core';

import {ClearComponent} from './clear.component';
import {DarkModeIconComponent} from './dark-mode-icon.component';
import {SoundComponent} from './sound.component';
import {TrashComponent} from './trash.component';

@Component({
  selector: 'app-side-controls',
  standalone: true,
  imports: [TrashComponent, DarkModeIconComponent, ClearComponent, SoundComponent],
  templateUrl: './side-controls.component.html',
  styleUrl: './side-controls.component.css',
})
export class SideControlsComponent {}
