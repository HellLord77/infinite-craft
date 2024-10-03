import {Component, HostBinding, HostListener, inject} from '@angular/core';
import {StateService} from '../services/state.service';

@Component({
  selector: 'app-sidebar-discoveries',
  standalone: true,
  imports: [],
  templateUrl: './sidebar-discoveries.component.html',
  styleUrl: './sidebar-discoveries.component.css',
})
export class SidebarDiscoveriesComponent {
  @HostBinding('class.discoveries-active') discoveriesActive = false;

  stateService = inject(StateService);

  @HostListener('click') onClick() {
    this.discoveriesActive = this.stateService.toggleDiscoveriesActive();
  }
}
