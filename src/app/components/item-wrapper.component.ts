import {Component, inject, input} from '@angular/core';

import {StorageElement} from '../models/storage-element.model';
import {StateService} from '../services/state.service';
import {InstancesComponent} from './instances.component';
import {ItemComponent} from './item.component';
import {ItemHiddenToggleComponent} from './item-hidden-toggle.component';

@Component({
  selector: 'app-item-wrapper',
  imports: [ItemHiddenToggleComponent, ItemComponent],
  templateUrl: './item-wrapper.component.html',
  styleUrl: './item-wrapper.component.css',
})
export class ItemWrapperComponent {
  element = input.required<StorageElement>();
  instancesComponent = input.required<InstancesComponent>();

  stateService = inject(StateService);
}
