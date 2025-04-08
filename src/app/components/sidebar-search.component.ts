import {Component, input} from '@angular/core';

import {ItemsInnerComponent} from './items-inner.component';
import {SidebarInputComponent} from './sidebar-input.component';
import {SidebarInputCloseComponent} from './sidebar-input-close.component';

@Component({
  selector: 'app-sidebar-search',
  imports: [SidebarInputComponent, SidebarInputCloseComponent],
  templateUrl: './sidebar-search.component.html',
  styleUrl: './sidebar-search.component.css',
})
export class SidebarSearchComponent {
  itemsInnerComponent = input.required<ItemsInnerComponent>();
}
