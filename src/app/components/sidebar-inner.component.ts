import {Component, input, viewChild} from '@angular/core';
import {ItemsComponent} from './items.component';
import {EmptySidebarComponent} from './empty-sidebar.component';
import {InstancesComponent} from './instances.component';

@Component({
  selector: 'app-sidebar-inner',
  standalone: true,
  imports: [ItemsComponent, EmptySidebarComponent],
  templateUrl: './sidebar-inner.component.html',
  styleUrl: './sidebar-inner.component.css',
})
export class SidebarInnerComponent {
  itemsComponent = viewChild.required(ItemsComponent);

  instancesComponent = input.required<InstancesComponent>();
}
