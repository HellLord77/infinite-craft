import {inject, Injectable, NgZone, OnDestroy} from '@angular/core';

export type ResizeObserverServiceCallback = (resize: ResizeObserverEntry) => void;

@Injectable({
  providedIn: 'root',
})
export class ResizeObserverService implements OnDestroy {
  ngZone = inject(NgZone);

  private observer?: ResizeObserver;

  private callbacks = new Map<Element, ResizeObserverServiceCallback>();

  ngOnDestroy() {
    this.clearObserver();
  }

  observe(element: Element, callback: ResizeObserverServiceCallback, boxModel: string) {
    if (!this.observer) {
      this.observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const callback = this.callbacks.get(entry.target);

          if (callback !== undefined) {
            this.ngZone.run(() => {
              callback(entry);
            });
          }
        }
      });
    }

    if (boxModel === 'border-box') {
      this.observer.observe(element, {
        box: 'border-box',
      });
    } else {
      this.observer.observe(element);
    }

    this.callbacks.set(element, callback);
  }

  unobserve(element: Element) {
    const callback = this.callbacks.get(element);

    if (callback != undefined && this.observer !== undefined) {
      this.observer.unobserve(element);
      this.callbacks.delete(element);

      if (this.callbacks.size === 0) {
        this.clearObserver();
      }
    }
  }

  private clearObserver() {
    this.observer?.disconnect();
    this.observer = undefined;

    this.callbacks.clear();
  }
}
