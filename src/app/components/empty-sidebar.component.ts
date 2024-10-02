import {Component} from '@angular/core';
import {EmptySidebarIconComponent} from './empty-sidebar-icon.component';

@Component({
  selector: 'app-empty-sidebar',
  standalone: true,
  imports: [EmptySidebarIconComponent],
  templateUrl: './empty-sidebar.component.html',
  styleUrl: './empty-sidebar.component.css',
})
export class EmptySidebarComponent {}
