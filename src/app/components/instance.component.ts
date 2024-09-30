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
  /* TODO: fix size */

  @HostBinding('style.z-index') zIndex = 0;

  itemComponent = viewChild.required(ItemComponent);

  instance = input.required<Instance>();

  private elementRef = inject(ElementRef);
  private utilityService = inject(UtilityService);
  private constantService = inject(ConstantService);

  ngOnInit() {
    this.zIndex = this.constantService.getZIndex();
    const instance = this.instance();
    this.elementRef.nativeElement.style.translate = toTranslate(instance.center);
  }

  onContextMenuItem(mouseEvent: MouseEvent) {
    mouseEvent.preventDefault();
    this.utilityService.arrayRemoveItem(this.constantService.instances, this.instance());
  }

  onDblClickItem() {
    const instance = this.instance();
    const boundingClientRect: DOMRect = this.elementRef.nativeElement.getBoundingClientRect();
    const center = this.utilityService.rectGetCenter(boundingClientRect);
    center.x += 10;
    center.y -= 10;
    const otherInstance: Instance = {
      element: instance.element,
      center: center,
    };
    this.constantService.instances.push(otherInstance);
  }
}
