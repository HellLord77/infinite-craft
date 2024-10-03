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
  stateService = inject(StateService);

  @HostBinding('class.active') get active() {
    return this.stateService.isDeleteMode();
  }

  @HostListener('click') onClick() {
    this.stateService.toggleDeleteMode();
  }
}
