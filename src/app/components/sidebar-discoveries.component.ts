import {Component, HostBinding, HostListener, inject} from '@angular/core';
import {ConstantService} from '../services/constant.service';

@Component({
  selector: 'app-sidebar-discoveries',
  standalone: true,
  imports: [],
  templateUrl: './sidebar-discoveries.component.html',
  styleUrl: './sidebar-discoveries.component.css',
})
export class SidebarDiscoveriesComponent {
  @HostBinding('class.sidebar-discoveries-active') sidebarDiscoveriesActive = false;

  constantService = inject(ConstantService);

  @HostListener('click') onClick() {
    this.sidebarDiscoveriesActive = this.constantService.toggleDiscoveriesActive();
  }
}
