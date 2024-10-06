import {Component, inject, input, viewChild} from '@angular/core';

import {DataService} from '../services/data.service';
import {InstancesComponent} from './instances.component';
import {InstructionComponent} from './instruction.component';
import {ItemsInnerComponent} from './items-inner.component';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [ItemsInnerComponent, InstructionComponent],
  templateUrl: './items.component.html',
  styleUrl: './items.component.css',
})
export class ItemsComponent {
  itemsInnerComponent = viewChild.required(ItemsInnerComponent);

  instancesComponent = input.required<InstancesComponent>();

  dataService = inject(DataService);
}
