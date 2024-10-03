import {Component, ElementRef, HostBinding, inject, input, viewChild} from '@angular/core';
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
  @HostBinding('class.instance') instance = false;
  @HostBinding('class.instance-selected') instanceSelected = false;
  @HostBinding('class.instance-hover') instanceHover = false;
  @HostBinding('class.instance-disabled') instanceDisabled = false;

  emojiComponent = viewChild.required(ItemEmojiComponent);

  element = input.required<StorageElement>();

  elementRef: ElementRef<HTMLElement> = inject(ElementRef);
  constantService = inject(ConstantService);

  @HostBinding('class.is-delete-mode') get isDeleteMode() {
    return !this.instance && this.constantService.isDeleteMode();
  }

  @HostBinding('class.hidden') get hidden() {
    return this.element().hidden;
  }
}
