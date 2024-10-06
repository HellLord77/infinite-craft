import {Component, HostBinding, inject, input} from '@angular/core';

import {DataService} from '../services/data.service';

import {ItemsInnerComponent} from './items-inner.component';
import {SidebarSearchComponent} from './sidebar-search.component';
import {SidebarSortingComponent} from './sidebar-sorting.component';

@Component({
  selector: 'app-sidebar-controls',
  standalone: true,
  imports: [SidebarSortingComponent, SidebarSearchComponent],
  templateUrl: './sidebar-controls.component.html',
  styleUrl: './sidebar-controls.component.css',
})
export class SidebarControlsComponent {
  @HostBinding('class.fade-show') fadeShow = false;

  itemsInnerComponent = input.required<ItemsInnerComponent>();

  dataService = inject(DataService);

  @HostBinding('class.dark-mode') get darkMode() {
    return this.dataService.isDarkMode();
  }
}
