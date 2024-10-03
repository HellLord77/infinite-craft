import {Component, viewChild} from '@angular/core';
import {ItemsComponent} from './items.component';
import {EmptySidebarComponent} from './empty-sidebar.component';

@Component({
  selector: 'app-sidebar-inner',
  standalone: true,
  imports: [ItemsComponent, EmptySidebarComponent],
  templateUrl: './sidebar-inner.component.html',
  styleUrl: './sidebar-inner.component.css',
})
export class SidebarInnerComponent {
  itemComponent = viewChild.required(ItemsComponent);
}
