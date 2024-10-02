import {Component, ElementRef, HostListener, inject, viewChild} from '@angular/core';
import {DataService} from '../services/data.service';
import {ConstantService} from '../services/constant.service';
import {ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-sidebar-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sidebar-input.component.html',
  styleUrl: './sidebar-input.component.css',
})
export class SidebarInputComponent {
  constantService = inject(ConstantService);
  dataService = inject(DataService);

  private inputElementRef = viewChild.required<ElementRef<HTMLInputElement>>('inputElement');

  @HostListener('window:keydown', ['$event']) onWindowKeyDown(keyboardEvent: KeyboardEvent) {
    if (keyboardEvent.key === 'Escape') {
      this.constantService.search.setValue('');
    } else {
      this.inputElementRef().nativeElement.focus();
    }
  }
}
