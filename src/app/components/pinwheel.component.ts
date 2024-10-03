import {animate, style, transition, trigger} from '@angular/animations';
import {Component, HostBinding, inject, OnInit} from '@angular/core';
import {interval, Subscription} from 'rxjs';
import {ComponentService} from '../services/component.service';

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
export class PinwheelComponent implements OnInit {
  @HostBinding('style.translate') translate = 'none';

  componentService = inject(ComponentService);

  private show = false;
  private subscription: Subscription | null = null;

  ngOnInit() {
    this.componentService.pinwheelComponent = this;
  }

  getShow() {
    return this.show;
  }

  setShow(show: boolean) {
    if (this.subscription !== null) {
      this.subscription.unsubscribe();
    }
    this.show = show;
    if (show) {
      this.subscription = interval(1200).subscribe(() => {
        this.show = false;
      });
    }
  }
}
