import {Component, HostBinding, HostListener, inject} from '@angular/core';

import {StateService} from '../services/state.service';

@Component({
  selector: 'app-sidebar-trash',
  standalone: true,
  imports: [],
  templateUrl: './sidebar-trash.component.html',
  styleUrl: './sidebar-trash.component.css',
})
export class SidebarTrashComponent {
  @HostBinding('class.active') active = false;

  stateService = inject(StateService);

  @HostListener('click') onClick() {
    this.active = this.stateService.toggleHiddenMode();
  }
}
