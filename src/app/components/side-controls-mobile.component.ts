import {Component, HostBinding, inject} from '@angular/core';
import {DarkModeIconComponent} from './dark-mode-icon.component';
import {SoundComponent} from './sound.component';
import {UtilityService} from '../services/utility.service';

@Component({
  selector: 'app-side-controls-mobile',
  standalone: true,
  imports: [DarkModeIconComponent, SoundComponent],
  templateUrl: './side-controls-mobile.component.html',
  styleUrl: './side-controls-mobile.component.css',
})
export class SideControlsMobileComponent {
  utilityService = inject(UtilityService);

  @HostBinding('class.hidden') get hidden() {
    return !this.utilityService.isMobile();
  }
}
