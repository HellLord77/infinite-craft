import {animate, style, transition, trigger} from '@angular/animations';
import {Component, HostBinding} from '@angular/core';
import {Subscription, interval} from 'rxjs';

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

  private shown = false;
  private lastSubscription: Subscription | null = null;

  getShown() {
    return this.shown;
  }

  setShown(shown: boolean) {
    if (this.lastSubscription !== null) {
      this.lastSubscription.unsubscribe();
    }
    this.shown = shown;
    if (shown) {
      this.lastSubscription = interval(1200).subscribe(() => {
        this.shown = false;
      });
    }
  }
}
