import {
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  inject,
  input,
  OnInit,
} from '@angular/core';

import {MouseButton} from '../enums/mouse-button';
import {StorageElement} from '../models/storage-element.model';
import {SoundService} from '../services/sound.service';
import {StateService} from '../services/state.service';
import {UtilityService} from '../services/utility.service';
import {InstancesComponent} from './instances.component';
import {ItemEmojiComponent} from './item-emoji.component';

@Component({
  selector: 'app-item',
  imports: [ItemEmojiComponent],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css',
})
export class ItemComponent implements OnInit {
  instance = false;

  @HostBinding('class.hidden') hidden = false;

  element = input.required<StorageElement>();
  instancesComponent = input.required<InstancesComponent>();

  elementRef: ElementRef<HTMLElement> = inject(ElementRef);
  utilityService = inject(UtilityService);
  stateService = inject(StateService);
  soundService = inject(SoundService);

  @HostBinding('class.hidden-mode') get isHiddenMode() {
    return !this.instance && this.stateService.isHiddenMode();
  }

  ngOnInit() {
    this.hidden = this.element().hidden!;
  }

  @HostListener('mousedown', ['$event']) onMouseDown(mouseEvent: MouseEvent) {
    if (mouseEvent.button === MouseButton.Left) {
      if (!this.instance && !this.stateService.isHiddenMode()) {
        const center = this.utilityService.elementRefGetCenter(this.elementRef);
        const instance = this.stateService.addInstance(this.element(), center);

        const instancesComponent = this.instancesComponent();
        instancesComponent.changeDetectorRef.detectChanges();
        Promise.resolve().then(() => {
          instancesComponent.getLastInstanceComponent(instance)!.onMouseDown(mouseEvent, true);
        });

        this.soundService.playInstance();
      }
    }
  }

  @HostListener('touchstart', ['$event']) onTouchStart(touchEvent: TouchEvent) {
    const instancesComponent = this.instancesComponent();
    instancesComponent.touchedTouchEvent = touchEvent;
    instancesComponent.touchedItemComponent = this;
  }
}
