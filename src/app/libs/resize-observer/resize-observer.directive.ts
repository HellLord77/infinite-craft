import {
  AfterViewInit,
  Directive,
  ElementRef,
  inject,
  input,
  OnChanges,
  OnDestroy,
  output,
  SimpleChanges,
} from '@angular/core';

import {ResizeObserverService} from './resize-observer.service';

@Directive({
  selector: '[appResizeObserver]',
  standalone: true,
})
export class ResizeObserverDirective implements AfterViewInit, OnChanges, OnDestroy {
  resizeBoxModel = input('');

  resizeobserve = output<ResizeObserverEntry>();

  elementRef: ElementRef<HTMLElement> = inject(ElementRef);
  resizeObserverService = inject(ResizeObserverService);

  private observing = false;

  ngAfterViewInit() {
    this.observe();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.observing && (changes['resizeBoxModel'] || changes['onResize'])) {
      this.unobserve();
      this.observe();
    }
  }

  ngOnDestroy() {
    this.unobserve();
  }

  private observe() {
    if (!this.observing) {
      this.resizeObserverService.observe(
        this.elementRef.nativeElement,
        (entry) => this.resizeobserve.emit(entry),
        this.resizeBoxModel(),
      );
      this.observing = true;
    }
  }

  private unobserve() {
    if (this.observing) {
      this.resizeObserverService.unobserve(this.elementRef.nativeElement);
      this.observing = false;
    }
  }
}
