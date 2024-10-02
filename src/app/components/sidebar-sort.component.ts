import {Component, HostListener, inject} from '@angular/core';
import {ConstantService} from '../services/constant.service';
import {Sort} from '../enums/sort';

@Component({
  selector: 'app-sidebar-sort',
  standalone: true,
  imports: [],
  templateUrl: './sidebar-sort.component.html',
  styleUrl: './sidebar-sort.component.css',
})
export class SidebarSortComponent {
  sort = 'time';

  constantService = inject(ConstantService);

  @HostListener('click') onClick() {
    this.sort = Sort[this.constantService.nextSort()];
  }
}
