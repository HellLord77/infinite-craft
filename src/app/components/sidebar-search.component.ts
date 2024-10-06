import {Component, input} from '@angular/core';

import {ItemsInnerComponent} from './items-inner.component';
import {SidebarInputCloseComponent} from './sidebar-input-close.component';
import {SidebarInputComponent} from './sidebar-input.component';

@Component({
  selector: 'app-sidebar-search',
  standalone: true,
  imports: [SidebarInputComponent, SidebarInputCloseComponent],
  templateUrl: './sidebar-search.component.html',
  styleUrl: './sidebar-search.component.css',
})
export class SidebarSearchComponent {
  itemsInnerComponent = input.required<ItemsInnerComponent>();
}
