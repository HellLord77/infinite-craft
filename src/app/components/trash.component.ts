import {Component, HostBinding, HostListener, inject} from '@angular/core';
import {InfiniteCraftDataService} from '../services/infinite-craft-data.service';
import {ConstantService} from '../services/constant.service';

@Component({
  selector: 'app-trash',
  standalone: true,
  imports: [],
  templateUrl: './trash.component.html',
  styleUrl: './trash.component.css',
})
export class TrashComponent {
  constantService = inject(ConstantService);
  infiniteCraftDataService = inject(InfiniteCraftDataService);

  @HostBinding('class.dark-mode') get darkMode() {
    return this.infiniteCraftDataService.isDarkMode();
  }

  @HostBinding('class.trash-active') get trashActive() {
    return this.constantService.isDeleteMode();
  }

  @HostListener('click') onClick() {
    this.constantService.toggleDeleteMode();
  }
}
