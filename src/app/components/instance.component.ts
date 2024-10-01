import {Component, ElementRef, HostBinding, inject, input, OnInit, viewChild} from '@angular/core';
import {ItemComponent} from './item.component';
import {UtilityService} from '../services/utility.service';
import {Instance} from '../models/instance.model';
import {ConstantService} from '../services/constant.service';
import {NgClass} from '@angular/common';
import {toTranslate} from '../models/point.model';

@Component({
  selector: 'app-instance',
  standalone: true,
  imports: [NgClass, ItemComponent],
  templateUrl: './instance.component.html',
  styleUrl: './instance.component.css',
})
export class InstanceComponent implements OnInit {
  @HostBinding('style.translate') translate = 'none';
  @HostBinding('style.z-index') zIndex = 0;

  itemComponent = viewChild.required(ItemComponent);

  instance = input.required<Instance>();

  elementRef = inject(ElementRef);
  utilityService = inject(UtilityService);
  constantService = inject(ConstantService);

  ngOnInit() {
    this.zIndex = this.constantService.getZIndex();
    this.translate = toTranslate(this.instance().center);

    const itemComponent = this.itemComponent();
    itemComponent.instance = true;
    itemComponent.emojiComponent().instanceEmoji = true;
  }

  onItemContextMenu(mouseEvent: MouseEvent) {
    mouseEvent.preventDefault();
    this.utilityService.arrayRemoveItem(this.constantService.instances, this.instance());
  }

  onItemDblClick() {
    const boundingClientRect = this.utilityService.elementRefGetBoundingClientRect(this.elementRef);
    const center = this.utilityService.rectGetCenter(boundingClientRect);
    center.x += 10;
    center.y -= 10;
    const otherInstance: Instance = {
      element: this.instance().element,
      center: center,
    };
    this.constantService.instances.push(otherInstance);
  }
}
