import {Component, HostListener, inject} from '@angular/core';

import {DataService} from '../services/data.service';

@Component({
  selector: 'app-reset',
  standalone: true,
  imports: [],
  templateUrl: './reset.component.html',
  styleUrl: './reset.component.css',
})
export class ResetComponent {
  dataService = inject(DataService);

  @HostListener('click') onClick() {
    const confirmed = confirm('Are you sure? This will delete all your progress!');
    if (confirmed) {
      this.dataService.clear();
      location.reload();
    }
  }
}
