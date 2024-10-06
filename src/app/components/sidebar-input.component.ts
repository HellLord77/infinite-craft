import {Component, ElementRef, HostListener, inject, input, viewChild} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

import {DataService} from '../services/data.service';
import {StateService} from '../services/state.service';
import {ItemsInnerComponent} from './items-inner.component';

@Component({
  selector: 'app-sidebar-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sidebar-input.component.html',
  styleUrl: './sidebar-input.component.css',
})
export class SidebarInputComponent {
  itemsInnerComponent = input.required<ItemsInnerComponent>();

  stateService = inject(StateService);
  dataService = inject(DataService);

  private inputElementRef = viewChild.required<ElementRef<HTMLInputElement>>('inputElement');

  @HostListener('window:keydown', ['$event']) onWindowKeyDown(keyboardEvent: KeyboardEvent) {
    if (keyboardEvent.key === 'Escape') {
      this.stateService.searchControl.setValue('');
    } else {
      this.inputElementRef().nativeElement.focus();
    }
  }
}
