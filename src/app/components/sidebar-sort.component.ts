import {Component} from '@angular/core';

import {SortWrapperComponent} from './sort-wrapper.component';

@Component({
  selector: 'app-sidebar-sort',
  standalone: true,
  imports: [SortWrapperComponent],
  templateUrl: './sidebar-sort.component.html',
  styleUrl: './sidebar-sort.component.css',
})
export class SidebarSortComponent {}
