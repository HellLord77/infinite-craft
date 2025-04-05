import {Component, HostListener, inject} from '@angular/core';

import {Sort} from '../enums/sort';
import {StateService} from '../services/state.service';

@Component({
  selector: 'app-sort-name',
  standalone: true,
  imports: [],
  templateUrl: './sort-name.component.html',
  styleUrl: './sort-name.component.css',
})
export class SortNameComponent {
  stateService = inject(StateService);

  @HostListener('click') onClick() {
    this.stateService.nextSort();
  }

  getSort() {
    return Sort[this.stateService.getSort()];
  }
}
