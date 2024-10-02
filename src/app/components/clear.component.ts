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
  constantService = inject(ConstantService);

  @HostListener('window:keydown.Escape') onWindowKeyDown() {
    this.constantService.resetDeleteMode();
  }

  @HostListener('click') onClick() {
    this.constantService.instances.length = 0;
  }
}
