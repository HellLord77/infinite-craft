import {Component, HostBinding, inject} from '@angular/core';
import {TrashComponent} from './trash.component';
import {DarkModeIconComponent} from './dark-mode-icon.component';
import {ClearComponent} from './clear.component';
import {SoundComponent} from './sound.component';
import {NgClass} from '@angular/common';
import {UtilityService} from '../services/utility.service';

@Component({
  selector: 'app-side-controls',
  standalone: true,
  imports: [NgClass, TrashComponent, DarkModeIconComponent, ClearComponent, SoundComponent],
  templateUrl: './side-controls.component.html',
  styleUrl: './side-controls.component.css',
})
export class SideControlsComponent {
  utilityService = inject(UtilityService);

  @HostBinding('class.hidden') get hidden() {
    return this.utilityService.isMobile();
  }
}
