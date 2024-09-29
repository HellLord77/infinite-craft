import { Component, ElementRef, inject, input } from '@angular/core';
import { Element } from '../models/element.model';
import { ItemEmojiComponent } from './item-emoji.component';
import { Point } from '@angular/cdk/drag-drop';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [ItemEmojiComponent],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css',
})
export class ItemComponent {
  static readonly instanceSelectedClass = 'instance-selected';
  static readonly instanceHoverClass = 'instance-hover';
  static readonly instanceDisabledClass = 'instance-disabled';

  element = input.required<Element>();

  private elementRef = inject(ElementRef);
  private utilityService = inject(UtilityService);

  getBoundingClientRect(): DOMRect {
    return this.elementRef.nativeElement.getBoundingClientRect();
  }

  getCenter(): Point {
    return this.utilityService.rectToCenter(this.getBoundingClientRect());
  }
}
