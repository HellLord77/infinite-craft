import {Component, HostListener, inject} from '@angular/core';
import {InfiniteCraftDataService} from '../services/infinite-craft-data.service';

@Component({
  selector: 'app-reset',
  standalone: true,
  imports: [],
  templateUrl: './reset.component.html',
  styleUrl: './reset.component.css',
})
export class ResetComponent {
  infiniteCraftDataService = inject(InfiniteCraftDataService);

  @HostListener('click') onClick() {
    const confirmed = confirm('Are you sure? This will delete all your progress!');
    if (confirmed) {
      this.infiniteCraftDataService.reset();
      location.reload();
    }
  }
}
