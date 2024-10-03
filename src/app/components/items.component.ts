import {Component, inject, viewChild} from '@angular/core';
import {ItemsInnerComponent} from './items-inner.component';
import {DataService} from '../services/data.service';
import {InstructionComponent} from './instruction.component';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [ItemsInnerComponent, InstructionComponent],
  templateUrl: './items.component.html',
  styleUrl: './items.component.css',
})
export class ItemsComponent {
  itemsInnerComponent = viewChild.required(ItemsInnerComponent);

  dataService = inject(DataService);
}
