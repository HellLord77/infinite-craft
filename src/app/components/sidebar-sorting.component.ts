import {Component} from '@angular/core';

import {SidebarDiscoveriesComponent} from './sidebar-discoveries.component';
import {SidebarSortComponent} from './sidebar-sort.component';

@Component({
  selector: 'app-sidebar-sorting',
  standalone: true,
  imports: [SidebarDiscoveriesComponent, SidebarSortComponent],
  templateUrl: './sidebar-sorting.component.html',
  styleUrl: './sidebar-sorting.component.css',
})
export class SidebarSortingComponent {}
