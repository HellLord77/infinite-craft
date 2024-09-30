import {Component, ElementRef, HostBinding, inject, input} from '@angular/core';
import {ItemEmojiComponent} from './item-emoji.component';
import {Point} from '../models/point.model';
import {UtilityService} from '../services/utility.service';
import {ItemRemoveComponent} from './item-remove.component';
import {StorageElement} from '../models/storage-element.model';

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

  private elementRef = inject(ElementRef);
  private utilityService = inject(UtilityService);

  getBoundingClientRect(): DOMRect {
    return this.elementRef.nativeElement.getBoundingClientRect();
  }

  getCenter(): Point {
    return this.utilityService.rectGetCenter(this.getBoundingClientRect());
  }
}
