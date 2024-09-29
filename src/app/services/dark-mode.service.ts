import { inject, Injectable } from '@angular/core';
import { ContainerComponent } from '../components/container/container.component';
import { AppComponent } from '../app.component';
import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root',
})
export class DarkModeService {
  appComponent!: AppComponent;

  private utilityService = inject(UtilityService);

  set darkMode(darkMode: boolean) {
    if (darkMode) {
      this.appComponent.containerClassList.push(
        ContainerComponent.darkModeClass,
      );
    } else {
      this.utilityService.arrayRemoveItem(
        this.appComponent.containerClassList,
        ContainerComponent.darkModeClass,
      );
    }
  }
}
