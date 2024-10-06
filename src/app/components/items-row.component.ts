import {Component, input} from '@angular/core';

import {StorageElement} from '../models/storage-element.model';
import {InstancesComponent} from './instances.component';
import {ItemComponent} from './item.component';

@Component({
  selector: 'app-items-row',
  standalone: true,
  imports: [ItemComponent],
  templateUrl: './items-row.component.html',
  styleUrl: './items-row.component.css',
})
export class ItemsRowComponent {
  elements = input.required<StorageElement[]>();
  instancesComponent = input.required<InstancesComponent>();
}
