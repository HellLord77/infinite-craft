import {Component, HostBinding, HostListener, inject} from '@angular/core';

import {StateService} from '../services/state.service';

@Component({
  selector: 'app-sidebar-discoveries',
  imports: [],
  templateUrl: './sidebar-discoveries.component.html',
  styleUrl: './sidebar-discoveries.component.css',
})
export class SidebarDiscoveriesComponent {
  @HostBinding('class.active') active = false;

  stateService = inject(StateService);

  @HostListener('click') onClick() {
    this.active = this.stateService.toggleDiscoveriesActive();
  }
}
