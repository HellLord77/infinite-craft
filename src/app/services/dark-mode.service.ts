import { inject, Injectable } from '@angular/core';
import { ContainerComponent } from '../components/container.component';
import { AppComponent } from '../app.component';
import { UtilityService } from './utility.service';
import { ParticlesComponent } from '../components/particles.component';

@Injectable({
  providedIn: 'root',
})
export class DarkModeService {
  appComponent!: AppComponent;
  particleComponent!: ParticlesComponent;

  private utilityService = inject(UtilityService);

  set darkMode(darkMode: boolean) {
    if (darkMode) {
      this.appComponent.containerClassList.push(
        ContainerComponent.darkModeClass,
      );
      this.particleComponent.color = { r: 255, g: 255, b: 255 };
    } else {
      this.utilityService.arrayRemoveItem(
        this.appComponent.containerClassList,
        ContainerComponent.darkModeClass,
      );
      this.particleComponent.color = { r: 0, g: 0, b: 0 };
    }
  }
}
