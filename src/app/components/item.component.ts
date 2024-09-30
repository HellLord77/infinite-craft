import {Component, ElementRef, HostBinding, inject, input} from '@angular/core';
import {ItemEmojiComponent} from './item-emoji.component';
import {ItemRemoveComponent} from './item-remove.component';
import {StorageElement} from '../models/storage-element.model';
import {ConstantService} from '../services/constant.service';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [ItemEmojiComponent, ItemRemoveComponent],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css',
})
export class ItemComponent {
  @HostBinding('class.instance-selected') instanceSelected = false;
  @HostBinding('class.instance-hover') instanceHover = false;
  @HostBinding('class.instance-disabled') instanceDisabled = false;

  element = input.required<StorageElement>();

  elementRef = inject(ElementRef);
  constantService = inject(ConstantService);

  @HostBinding('class.is-delete-mode') get isDeleteMode() {
    return this.constantService.isDeleteMode();
  }

  @HostBinding('class.item-hidden') get itemHidden() {
    const element = this.element();
    return element.hidden;
  }
}
