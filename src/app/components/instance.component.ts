import {
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  inject,
  input,
  OnInit,
  viewChild,
} from '@angular/core';
import {ItemComponent} from './item.component';
import {UtilityService} from '../services/utility.service';
import {Instance} from '../models/instance.model';
import {StateService} from '../services/state.service';
import {toTranslate} from '../models/point.model';
import {InstanceDiscoveredTextComponent} from './instance-discovered-text.component';
import {InstancesComponent} from './instances.component';

@Component({
  selector: 'app-instance',
  standalone: true,
  imports: [ItemComponent, InstanceDiscoveredTextComponent],
  templateUrl: './instance.component.html',
  styleUrl: './instance.component.css',
})
export class InstanceComponent implements OnInit {
  @HostBinding('style.translate') translate = 'none';
  @HostBinding('style.z-index') zIndex = 0;

  itemComponent = viewChild.required(ItemComponent);

  instance = input.required<Instance>();
  instancesComponent = input.required<InstancesComponent>();

  elementRef: ElementRef<HTMLElement> = inject(ElementRef);
  utilityService = inject(UtilityService);
  stateService = inject(StateService);

  ngOnInit() {
    this.zIndex = ++this.instancesComponent().zIndex;
    this.translate = toTranslate(this.instance().center);

    const itemComponent = this.itemComponent();
    itemComponent.instance = true;
    itemComponent.emojiComponent().instanceEmoji = true;
  }

  @HostListener('contextmenu', ['$event']) onItemContextMenu(mouseEvent: MouseEvent) {
    mouseEvent.preventDefault();
    this.utilityService.arrayRemoveItem(this.stateService.instances, this.instance());
  }

  @HostListener('dblclick') onItemDblClick() {
    const boundingClientRect = this.utilityService.elementRefGetBoundingClientRect(this.elementRef);
    const center = this.utilityService.rectGetCenter(boundingClientRect);
    center.x += 10;
    center.y -= 10;
    const otherInstance: Instance = {
      element: this.instance().element,
      center: center,
    };
    this.stateService.instances.push(otherInstance);
  }
}
