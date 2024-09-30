import {inject, Injectable} from '@angular/core';
import {ContainerComponent} from '../components/container.component';
import {ParticlesComponent} from '../components/particles.component';
import {InfiniteCraftDataService} from './infinite-craft-data.service';

@Injectable({
  providedIn: 'root',
})
export class DarkModeService {
  containerComponent!: ContainerComponent;
  particleComponent!: ParticlesComponent;

  private infiniteCraftDataService = inject(InfiniteCraftDataService);

  setDarkMode(darkMode: boolean) {
    this.containerComponent.darkMode = darkMode;
    if (darkMode) {
      if (this.particleComponent !== null) {
        this.particleComponent.color = {r: 255, g: 255, b: 255};
      }
    } else {
      if (this.particleComponent !== null) {
        this.particleComponent.color = {r: 0, g: 0, b: 0};
      }
    }
  }

  toggleDarkMode() {
    this.setDarkMode(this.infiniteCraftDataService.toggleDarkMode());
  }
}
