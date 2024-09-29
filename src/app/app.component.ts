import { Component, inject, OnInit } from '@angular/core';
import { ContainerComponent } from './components/container.component';
import { NgClass } from '@angular/common';
import { DarkModeService } from './services/dark-mode.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgClass, ContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  /* TODO */
  title = 'Infinite Craft';

  containerClassList: string[] = [];

  private darkModeService = inject(DarkModeService);

  ngOnInit() {
    this.darkModeService.appComponent = this;
  }
}
