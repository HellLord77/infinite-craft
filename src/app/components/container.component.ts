import {Component, HostBinding, inject} from '@angular/core';
import {SidebarComponent} from './sidebar.component';
import {SideControlsComponent} from './side-controls.component';
import {ResetComponent} from './reset.component';
import {LogoComponent} from './logo.component';
import {InstancesComponent} from './instances.component';
import {PinwheelComponent} from './pinwheel.component';
import {ParticlesComponent} from './particles.component';
import {SideControlsMobileComponent} from './side-controls-mobile.component';
import {DataService} from '../services/data.service';

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
  pinwheelVisible = true;

  dataService = inject(DataService);

  @HostBinding('class.dark-mode') get darkMode() {
    return this.dataService.isDarkMode();
  }
}
