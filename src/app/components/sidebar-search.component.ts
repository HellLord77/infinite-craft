import {Component} from '@angular/core';
import {SidebarInputComponent} from './sidebar-input.component';
import {SidebarInputCloseComponent} from './sidebar-input-close.component';

@Component({
  selector: 'app-sidebar-search',
  standalone: true,
  imports: [SidebarInputComponent, SidebarInputCloseComponent],
  templateUrl: './sidebar-search.component.html',
  styleUrl: './sidebar-search.component.css',
})
export class SidebarSearchComponent {}
