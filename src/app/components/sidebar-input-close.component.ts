import {Component, HostBinding, HostListener, inject} from '@angular/core';

import {StateService} from '../services/state.service';

@Component({
  selector: 'app-sidebar-input-close',
  standalone: true,
  imports: [],
  templateUrl: './sidebar-input-close.component.html',
  styleUrl: './sidebar-input-close.component.css',
})
export class SidebarInputCloseComponent {
  stateService = inject(StateService);

  @HostBinding('hidden') get hidden() {
    return this.stateService.searchControl.value!.length === 0;
  }

  @HostListener('click') onClick() {
    this.stateService.searchControl.setValue('');
  }
}
