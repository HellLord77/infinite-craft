import {Component, inject, input, viewChild} from '@angular/core';
import {ItemsInnerComponent} from './items-inner.component';
import {DataService} from '../services/data.service';
import {InstructionComponent} from './instruction.component';
import {InstancesComponent} from './instances.component';

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
