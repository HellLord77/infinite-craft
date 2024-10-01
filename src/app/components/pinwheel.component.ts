import {Component, HostBinding} from '@angular/core';

@Component({
  selector: 'app-pinwheel',
  standalone: true,
  imports: [],
  templateUrl: './pinwheel.component.html',
  styleUrl: './pinwheel.component.css',
})
export class PinwheelComponent {
  @HostBinding('style.translate') translate = 'none';
}
