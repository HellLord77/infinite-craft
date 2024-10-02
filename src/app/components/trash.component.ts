import {Component, HostBinding, HostListener, inject} from '@angular/core';
import {ConstantService} from '../services/constant.service';

@Component({
  selector: 'app-trash',
  standalone: true,
  imports: [],
  templateUrl: './trash.component.html',
  styleUrl: './trash.component.css',
})
export class TrashComponent {
  constantService = inject(ConstantService);

  @HostBinding('class.trash-active') get trashActive() {
    return this.constantService.isDeleteMode();
  }

  @HostListener('click') onClick() {
    this.constantService.toggleDeleteMode();
  }
}
