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
import {SoundService} from '../services/sound.service';

@Component({
  selector: 'app-instance',
  standalone: true,
  imports: [ItemComponent, InstanceDiscoveredTextComponent],
  templateUrl: './instance.component.html',
  styleUrl: './instance.component.css',
})
export class InstanceComponent implements OnInit {
  @HostBinding('class.selected') selected = false;
  @HostBinding('class.disabled') disabled = false;
  @HostBinding('style.translate') translate = 'none';
  @HostBinding('style.z-index') zIndex = 0;

  itemComponent = viewChild.required(ItemComponent);

  instance = input.required<Instance>();

  elementRef: ElementRef<HTMLElement> = inject(ElementRef);
  utilityService = inject(UtilityService);
  stateService = inject(StateService);
  soundService = inject(SoundService);

  ngOnInit() {
    this.zIndex = this.stateService.nextZIndex();
    this.translate = toTranslate(this.instance().center);

    const itemComponent = this.itemComponent();
    itemComponent.instance = true;
    itemComponent.emojiComponent().instanceEmoji = true;
  }

  @HostListener('contextmenu', ['$event']) onItemContextMenu(mouseEvent: MouseEvent) {
    mouseEvent.preventDefault();
    this.stateService.removeInstance(this.instance());
    this.soundService.playDelete();
  }

  @HostListener('dblclick') onItemDblClick() {
    const boundingClientRect = this.utilityService.elementRefGetBoundingClientRect(this.elementRef);
    const center = this.utilityService.rectGetCenter(boundingClientRect);
    center.x += 10;
    center.y -= 10;
    this.stateService.addInstance(this.instance().element, center);
  }
}
