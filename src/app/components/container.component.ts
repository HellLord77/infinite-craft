import {Component, HostBinding, inject} from '@angular/core';

import {DataService} from '../services/data.service';
import {InstancesComponent} from './instances.component';
import {LogoComponent} from './logo.component';
import {ParticlesComponent} from './particles.component';
import {PinwheelComponent} from './pinwheel.component';
import {ResetComponent} from './reset.component';
import {SideControlsComponent} from './side-controls.component';
import {SideControlsMobileComponent} from './side-controls-mobile.component';
import {SidebarComponent} from './sidebar.component';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [
    SideControlsComponent,
    SideControlsMobileComponent,
    ParticlesComponent,
    SidebarComponent,
    InstancesComponent,
    PinwheelComponent,
    LogoComponent,
    ResetComponent,
  ],
  templateUrl: './container.component.html',
  styleUrl: './container.component.css',
})
export class ContainerComponent {
  dataService = inject(DataService);

  @HostBinding('class.dark-mode') get darkMode() {
    return this.dataService.isDarkMode();
  }
}
