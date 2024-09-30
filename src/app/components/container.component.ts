import {Component, HostBinding, inject, OnInit} from '@angular/core';
import {SidebarComponent} from './sidebar.component';
import {SideControlsComponent} from './side-controls.component';
import {ResetComponent} from './reset.component';
import {LogoComponent} from './logo.component';
import {InstancesComponent} from './instances.component';
import {PinwheelComponent} from './pinwheel.component';
import {ParticlesComponent} from './particles.component';
import {SideControlsMobileComponent} from './side-controls-mobile.component';
import {UtilityService} from '../services/utility.service';
import {DarkModeService} from '../services/dark-mode.service';
import {InfiniteCraftDataService} from '../services/infinite-craft-data.service';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [
    SideControlsComponent,
    SideControlsMobileComponent,
    ParticlesComponent,
    SidebarComponent,
    InstancesComponent,
    PinwheelComponent,
    LogoComponent,
    ResetComponent,
  ],
  templateUrl: './container.component.html',
  styleUrl: './container.component.css',
})
export class ContainerComponent implements OnInit {
  @HostBinding('class.dark-mode') darkMode = false;

  private utilityService = inject(UtilityService);
  private infiniteCraftDataService = inject(InfiniteCraftDataService);
  private darkModeService = inject(DarkModeService);

  constructor() {
    this.darkMode = this.infiniteCraftDataService.getDarkMode();
  }

  ngOnInit() {
    this.darkModeService.containerComponent = this;
  }

  isMobile(): boolean {
    return this.utilityService.isMobile();
  }
}
