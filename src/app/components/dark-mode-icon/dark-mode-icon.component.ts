import {Component, inject, OnInit} from '@angular/core';
import {InfiniteCraftDataService} from "../../services/infinite-craft-data.service";
import {DarkModeService} from "../../services/dark-mode.service";

@Component({
  selector: 'app-dark-mode-icon',
  standalone: true,
  imports: [],
  templateUrl: './dark-mode-icon.component.html',
  styleUrl: './dark-mode-icon.component.css',
})
export class DarkModeIconComponent implements OnInit {
  private infiniteCraftDataService = inject(InfiniteCraftDataService);
  private darkModeService = inject(DarkModeService);

  get darkMode() { /* TODO */
    return this.infiniteCraftDataService.darkMode;
  }

  ngOnInit() {
    this.darkModeService.darkMode = this.darkMode;
  }

  onClick() {
    this.darkModeService.darkMode = this.infiniteCraftDataService.toggleDarkMode();
  }
}
