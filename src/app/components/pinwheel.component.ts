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
    trigger('img-transition', [
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

  private spawn = false;
  private subscription: Subscription | null = null;

  getSpawn() {
    return this.spawn;
  }

  setSpawn(spawn: boolean) {
    if (this.subscription !== null) {
      this.subscription.unsubscribe();
    }
    this.spawn = spawn;
    if (spawn) {
      this.subscription = interval(1600).subscribe(() => {
        this.spawn = false;
      });
    }
  }
}
