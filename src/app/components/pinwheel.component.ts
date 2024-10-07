import {animate, style, transition, trigger} from '@angular/animations';
import {Component, HostBinding} from '@angular/core';
import {interval, Subscription} from 'rxjs';

@Component({
  selector: 'app-pinwheel',
  standalone: true,
  imports: [],
  templateUrl: './pinwheel.component.html',
  styleUrl: './pinwheel.component.css',
  animations: [
    trigger('pinwheel-animation', [
      transition(':leave', [
        animate(
          '0.4s ease-in-out',
          style({
            transform: 'scale(0)',
            opacity: 0,
          }),
        ),
      ]),
    ]),
  ],
})
export class PinwheelComponent {
  @HostBinding('style.translate') translate = 'none';

  private lastSubscription?: Subscription;

  private shown = false;

  getShown() {
    return this.shown;
  }

  setShown(shown: boolean) {
    this.lastSubscription?.unsubscribe();
    this.shown = shown;
    if (shown) {
      this.lastSubscription = interval(1200).subscribe(() => {
        this.shown = false;
      });
    }
  }
}
