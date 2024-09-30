import {Component, ElementRef, HostBinding, inject, input} from '@angular/core';
import {ItemEmojiComponent} from './item-emoji.component';
import {ItemRemoveComponent} from './item-remove.component';
import {StorageElement} from '../models/storage-element.model';
import {InfiniteCraftDataService} from '../services/infinite-craft-data.service';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [ItemEmojiComponent, ItemRemoveComponent],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css',
})
export class ItemComponent {
  @HostBinding('class.is-delete-mode') deleteMode = false;
  @HostBinding('class.instance-selected') instanceSelected = false;
  @HostBinding('class.instance-hover') instanceHover = false;
  @HostBinding('class.instance-disabled') instanceDisabled = false;

  element = input.required<StorageElement>();

  elementRef = inject(ElementRef);
  infiniteCraftDataService = inject(InfiniteCraftDataService);
}
