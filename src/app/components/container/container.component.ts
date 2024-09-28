import {Component} from '@angular/core';
import {SidebarComponent} from "../sidebar/sidebar.component";
import {SideControlsComponent} from "../side-controls/side-controls.component";
import {ResetComponent} from "../reset/reset.component";
import {LogoComponent} from "../logo/logo.component";
import {InstancesComponent} from "../instances/instances.component";

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [SidebarComponent, SideControlsComponent, LogoComponent, ResetComponent, InstancesComponent],
  templateUrl: './container.component.html',
  styleUrl: './container.component.css'
})
export class ContainerComponent {
}
