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

  @HostBinding('class.active') get active() {
    return this.constantService.isDeleteMode();
  }

  @HostListener('click') onClick() {
    this.constantService.toggleDeleteMode();
  }
}
