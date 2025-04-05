import {Component} from '@angular/core';

import {SidebarDiscoveriesComponent} from './sidebar-discoveries.component';
import {SidebarSortComponent} from './sidebar-sort.component';
import {SidebarTrashComponent} from './sidebar-trash.component';

@Component({
  selector: 'app-sidebar-sorting',
  standalone: true,
  imports: [SidebarDiscoveriesComponent, SidebarSortComponent, SidebarTrashComponent],
  templateUrl: './sidebar-sorting.component.html',
  styleUrl: './sidebar-sorting.component.css',
})
export class SidebarSortingComponent {}
