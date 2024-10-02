import {Component, HostBinding, HostListener, inject} from '@angular/core';
import {ConstantService} from '../services/constant.service';

@Component({
  selector: 'app-sidebar-input-close',
  standalone: true,
  imports: [],
  templateUrl: './sidebar-input-close.component.html',
  styleUrl: './sidebar-input-close.component.css',
})
export class SidebarInputCloseComponent {
  constantService = inject(ConstantService);

  @HostBinding('hidden') get hidden() {
    return this.constantService.search.value!.length === 0;
  }

  @HostListener('click') onClick() {
    this.constantService.search.setValue('');
  }
}
