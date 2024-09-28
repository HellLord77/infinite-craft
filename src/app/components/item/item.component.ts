import {Component, ElementRef, inject, input} from '@angular/core';
import {Element} from "../../models/element.model";
import {ItemEmojiComponent} from "../item-emoji/item-emoji.component";
import {Point} from "@angular/cdk/drag-drop";
import {UtilityService} from "../../services/utility.service";

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [ItemEmojiComponent],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent {
  element = input.required<Element>();
  private elementRef = inject(ElementRef);
  private utilityService = inject(UtilityService);

  get center(): Point {
    const boundingClientRect = this.elementRef.nativeElement.getBoundingClientRect();
    return this.utilityService.getCenter(boundingClientRect);
  }
}
