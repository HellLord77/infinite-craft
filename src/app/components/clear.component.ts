import {Component, HostListener, inject} from '@angular/core';
import {ConstantService} from '../services/constant.service';

@Component({
  selector: 'app-clear',
  standalone: true,
  imports: [],
  templateUrl: './clear.component.html',
  styleUrl: './clear.component.css',
})
export class ClearComponent {
  private constantService = inject(ConstantService);

  @HostListener('click') onClick() {
    this.constantService.instances.length = 0;
  }
}
