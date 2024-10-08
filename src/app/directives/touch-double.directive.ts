import {Directive, HostListener, input, output} from '@angular/core';

@Directive({
  selector: '[appDoubleTouch]',
  standalone: true,
})
export class TouchDoubleDirective {
  maxDuration = input(500);
  maxDistance = input(10);
  circularDistance = input(true);

  touchdouble = output<TouchEvent>();

  private lastEvent?: TouchEvent;

  private lastTimestamp: DOMHighResTimeStamp = 0;

  @HostListener('touchstart', ['$event']) onTouchStart(touchEvent: TouchEvent) {
    const timestamp = performance.now();
    if (timestamp - this.lastTimestamp < this.maxDuration()) {
      const touch = touchEvent.touches[0];
      const lastTouch = this.lastEvent!.touches[0];

      const deltaX = lastTouch.clientX - touch.clientX;
      const deltaY = lastTouch.clientY - touch.clientY;

      if (
        this.circularDistance()
          ? Math.sqrt(deltaX * deltaX + deltaY * deltaY) < this.maxDistance()
          : Math.abs(deltaX) < this.maxDistance() && Math.abs(deltaY) < this.maxDistance()
      ) {
        this.lastTimestamp = 0;
        this.lastEvent = undefined;
        this.touchdouble.emit(touchEvent);
        return;
      }
    }

    this.lastTimestamp = timestamp;
    this.lastEvent = touchEvent;
  }
}
