import {Component, HostListener, inject, input} from '@angular/core';
import {StorageElement} from '../models/storage-element.model';
import {InfiniteCraftDataService} from '../services/infinite-craft-data.service';

@Component({
  selector: 'app-item-remove',
  standalone: true,
  imports: [],
  templateUrl: './item-remove.component.html',
  styleUrl: './item-remove.component.css',
})
export class ItemRemoveComponent {
  element = input.required<StorageElement>();

  infiniteCraftDataService = inject(InfiniteCraftDataService);

  @HostListener('click') onClick() {
    const element = this.element();
    this.infiniteCraftDataService.toggleElementHidden(element);
  }
}
