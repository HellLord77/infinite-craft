import {Component, HostBinding, HostListener, inject} from '@angular/core';

import {StateService} from '../services/state.service';

@Component({
  selector: 'app-sort-direction',
  imports: [],
  templateUrl: './sort-direction.component.html',
  styleUrl: './sort-direction.component.css',
})
export class SortDirectionComponent {
  @HostBinding('class.flip') flip = false;

  stateService = inject(StateService);

  @HostListener('click') onClick() {
    this.flip = this.stateService.toggleSortFlip();
  }
}
