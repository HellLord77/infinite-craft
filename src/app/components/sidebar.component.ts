import {Component, ElementRef, inject} from '@angular/core';
import {SidebarControlsComponent} from './sidebar-controls.component';
import {SidebarInnerComponent} from './sidebar-inner.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SidebarInnerComponent, SidebarControlsComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  elementRef = inject(ElementRef);
}
