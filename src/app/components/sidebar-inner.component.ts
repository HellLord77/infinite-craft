import {Component, input, viewChild} from '@angular/core';

import {EmptySidebarComponent} from './empty-sidebar.component';
import {InstancesComponent} from './instances.component';
import {ItemsComponent} from './items.component';
import {SidebarComponent} from './sidebar.component';

@Component({
  selector: 'app-sidebar-inner',
  standalone: true,
  imports: [ItemsComponent, EmptySidebarComponent],
  templateUrl: './sidebar-inner.component.html',
  styleUrl: './sidebar-inner.component.css',
})
export class SidebarInnerComponent {
  itemsComponent = viewChild.required(ItemsComponent);

  sidebarComponent = input.required<SidebarComponent>();
  instancesComponent = input.required<InstancesComponent>();
}
