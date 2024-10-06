import {Component, HostListener, inject} from '@angular/core';

import {Sort} from '../enums/sort';
import {StateService} from '../services/state.service';

@Component({
  selector: 'app-sidebar-sort',
  standalone: true,
  imports: [],
  templateUrl: './sidebar-sort.component.html',
  styleUrl: './sidebar-sort.component.css',
})
export class SidebarSortComponent {
  stateService = inject(StateService);

  @HostListener('click') onClick() {
    this.stateService.nextSort();
  }

  getSort() {
    return Sort[this.stateService.getSort()];
  }
}
