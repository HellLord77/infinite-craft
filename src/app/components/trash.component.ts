import {Component, HostBinding, HostListener, inject} from '@angular/core';
import {DataService} from '../services/data.service';
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
  dataService = inject(DataService);

  @HostBinding('class.dark-mode') get darkMode() {
    return this.dataService.isDarkMode();
  }

  @HostBinding('class.trash-active') get trashActive() {
    return this.constantService.isDeleteMode();
  }

  @HostListener('click') onClick() {
    this.constantService.toggleDeleteMode();
  }
}
