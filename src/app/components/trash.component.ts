import {Component, HostBinding, HostListener, inject} from '@angular/core';

import {StateService} from '../services/state.service';

@Component({
  selector: 'app-trash',
  standalone: true,
  imports: [],
  templateUrl: './trash.component.html',
  styleUrl: './trash.component.css',
})
export class TrashComponent {
  @HostBinding('class.active') active = false;

  stateService = inject(StateService);

  @HostListener('click') onClick() {
    this.active = this.stateService.toggleDeleteMode();
  }
}
