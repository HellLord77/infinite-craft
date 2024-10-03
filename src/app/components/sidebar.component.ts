import {Component, ElementRef, inject, OnInit} from '@angular/core';
import {SidebarControlsComponent} from './sidebar-controls.component';
import {SidebarInnerComponent} from './sidebar-inner.component';
import {ComponentService} from '../services/component.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SidebarInnerComponent, SidebarControlsComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  elementRef = inject(ElementRef);
  componentService = inject(ComponentService);

  ngOnInit() {
    this.componentService.sidebarComponent = this;
  }
}
