import {Component, HostBinding, HostListener, inject} from '@angular/core';
import {ConstantService} from '../services/constant.service';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-clear',
  standalone: true,
  imports: [],
  templateUrl: './clear.component.html',
  styleUrl: './clear.component.css',
})
export class ClearComponent {
  constantService = inject(ConstantService);
  dataService = inject(DataService);

  @HostBinding('class.dark-mode') get darkMode() {
    return this.dataService.isDarkMode();
  }

  @HostListener('click') onClick() {
    this.constantService.instances.length = 0;
  }
}
