import {Component} from '@angular/core';
import {SidebarSortingComponent} from './sidebar-sorting.component';
import {SidebarSearchComponent} from './sidebar-search.component';

@Component({
  selector: 'app-sidebar-controls',
  standalone: true,
  imports: [SidebarSortingComponent, SidebarSearchComponent],
  templateUrl: './sidebar-controls.component.html',
  styleUrl: './sidebar-controls.component.css',
})
export class SidebarControlsComponent {}
