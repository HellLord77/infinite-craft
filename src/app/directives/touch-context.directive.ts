import {Directive, HostListener, input, OnDestroy, output} from '@angular/core';
import {Subscription, timer} from 'rxjs';

@Directive({
  selector: '[appTouchContext]',
  standalone: true,
})
export class TouchContextDirective implements OnDestroy {
  minDuration = input(500);
  maxDistance = input(10);
  circularDistance = input(true);

  touchcontext = output<TouchEvent>();

  private lastEvent?: TouchEvent;
  private lastSubscription?: Subscription;

  ngOnDestroy() {
    this.end();
  }

  @HostListener('touchstart', ['$event']) onTouchStart(touchEvent: TouchEvent) {
    this.start(touchEvent);
  }

  @HostListener('touchmove', ['$event']) onTouchMove(touchEvent: TouchEvent) {
    if (this.lastEvent !== undefined) {
      const touch = touchEvent.touches[0];
      const lastTouch = this.lastEvent.touches[0];

      const deltaX = lastTouch.clientX - touch.clientX;
      const deltaY = lastTouch.clientY - touch.clientY;

      if (
        this.circularDistance()
          ? Math.sqrt(deltaX * deltaX + deltaY * deltaY) > this.maxDistance()
          : Math.abs(deltaX) > this.maxDistance() || Math.abs(deltaY) > this.maxDistance()
      ) {
        this.end();
      }
    }
  }

  @HostListener('touchend') onTouchEnd() {
    this.end();
  }

  private start(event: TouchEvent) {
    this.end();
    this.lastEvent = event;

    this.lastSubscription = timer(this.minDuration()).subscribe(() => {
      this.touchcontext.emit(event);
    });
  }

  private end() {
    this.lastSubscription?.unsubscribe();
    this.lastSubscription = undefined;
  }
}
