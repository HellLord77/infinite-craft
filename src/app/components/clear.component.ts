import {Component, HostBinding, HostListener, inject} from '@angular/core';
import {ConstantService} from '../services/constant.service';
import {InfiniteCraftDataService} from '../services/infinite-craft-data.service';

@Component({
  selector: 'app-clear',
  standalone: true,
  imports: [],
  templateUrl: './clear.component.html',
  styleUrl: './clear.component.css',
})
export class ClearComponent {
  constantService = inject(ConstantService);
  infiniteCraftDataService = inject(InfiniteCraftDataService);

  @HostBinding('class.dark-mode') get darkMode() {
    return this.infiniteCraftDataService.isDarkMode();
  }

  @HostListener('click') onClick() {
    this.constantService.instances.length = 0;
  }
}
