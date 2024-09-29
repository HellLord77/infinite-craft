import { Component } from '@angular/core';
import { SidebarComponent } from './sidebar.component';
import { SideControlsComponent } from './side-controls.component';
import { ResetComponent } from './reset.component';
import { LogoComponent } from './logo.component';
import { InstancesComponent } from './instances.component';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [
    SideControlsComponent,
    SidebarComponent,
    InstancesComponent,
    LogoComponent,
    ResetComponent,
  ],
  templateUrl: './container.component.html',
  styleUrl: './container.component.css',
})
export class ContainerComponent {
  static readonly darkModeClass = 'dark-mode';
}
