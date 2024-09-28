import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  private darkModeClass = 'dark-mode';
  private container = document.getElementsByTagName('app-container')[0];

  set darkMode(darkMode: boolean) {
    if (darkMode) {
      this.container.classList.add(this.darkModeClass);
    } else {
      this.container.classList.remove(this.darkModeClass);
    }
  }
}
