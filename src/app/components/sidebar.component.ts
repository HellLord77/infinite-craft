import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  inject,
  input,
  OnInit,
  viewChild,
} from '@angular/core';

import {StateService} from '../services/state.service';

import {InstancesComponent} from './instances.component';
import {SidebarControlsComponent} from './sidebar-controls.component';
import {SidebarInnerComponent} from './sidebar-inner.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SidebarInnerComponent, SidebarControlsComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  sidebarControlsComponent = viewChild.required(SidebarControlsComponent);

  instancesComponent = input.required<InstancesComponent>();

  elementRef: ElementRef<HTMLElement> = inject(ElementRef);
  changeDetectorRef = inject(ChangeDetectorRef);
  stateService = inject(StateService);

  private lastScroll = 0;

  ngOnInit() {
    this.onScroll();

    this.stateService.searchControl.valueChanges.subscribe(() => {
      this.changeDetectorRef.detectChanges();

      Promise.resolve().then(() => {
        this.elementRef.nativeElement.scrollTop =
          this.stateService.searchControl.value!.length === 0 ? this.lastScroll : 0;
      });
    });
  }

  @HostListener('scroll') onScroll() {
    if (this.stateService.searchControl.value!.length === 0) {
      this.lastScroll = this.elementRef.nativeElement.scrollTop;
    }

    this.sidebarControlsComponent().fadeShow =
      this.elementRef.nativeElement.scrollHeight >
      this.elementRef.nativeElement.scrollTop + this.elementRef.nativeElement.clientHeight;
  }
}
