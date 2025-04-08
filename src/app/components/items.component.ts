import {Component, inject, input, viewChild} from '@angular/core';

import {DataService} from '../services/data.service';
import {InstancesComponent} from './instances.component';
import {InstructionComponent} from './instruction.component';
import {ItemsInnerComponent} from './items-inner.component';
import {SidebarComponent} from './sidebar.component';

@Component({
  selector: 'app-items',
  imports: [ItemsInnerComponent, InstructionComponent],
  templateUrl: './items.component.html',
  styleUrl: './items.component.css',
})
export class ItemsComponent {
  itemsInnerComponent = viewChild.required(ItemsInnerComponent);

  sidebarComponent = input.required<SidebarComponent>();
  instancesComponent = input.required<InstancesComponent>();

  dataService = inject(DataService);
}
