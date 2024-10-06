import {Component, ElementRef, HostBinding, HostListener, inject, input} from '@angular/core';

import {MouseButton} from '../enums/mouse-button';
import {StorageElement} from '../models/storage-element.model';
import {SoundService} from '../services/sound.service';
import {StateService} from '../services/state.service';
import {UtilityService} from '../services/utility.service';

import {InstancesComponent} from './instances.component';
import {ItemEmojiComponent} from './item-emoji.component';
import {ItemRemoveComponent} from './item-remove.component';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [ItemEmojiComponent, ItemRemoveComponent],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css',
})
export class ItemComponent {
  instance = false;

  element = input.required<StorageElement>();
  instancesComponent = input.required<InstancesComponent>();

  elementRef: ElementRef<HTMLElement> = inject(ElementRef);
  utilityService = inject(UtilityService);
  stateService = inject(StateService);
  soundService = inject(SoundService);

  @HostBinding('class.is-delete-mode') get isDeleteMode() {
    return !this.instance && this.stateService.isDeleteMode();
  }

  @HostBinding('class.hidden') get hidden() {
    return this.element().hidden;
  }

  @HostListener('mousedown', ['$event']) onMouseDown(mouseEvent: MouseEvent) {
    if (mouseEvent.button === MouseButton.Left) {
      if (!this.instance && !this.stateService.isDeleteMode()) {
        this.soundService.playInstance();

        const center = this.utilityService.elementRefGetCenter(this.elementRef);
        this.stateService.addInstance(this.element(), center);

        const instancesComponent = this.instancesComponent();
        instancesComponent.changeDetectorRef.detectChanges();

        Promise.resolve().then(() => {
          const instanceComponent = this.utilityService.arrayLastItem(
            instancesComponent.instanceComponents(),
          )!;
          instanceComponent.onMouseDown(mouseEvent, true);
        });
      }
    }
  }
}
