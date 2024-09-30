import {Component, inject} from '@angular/core';
import {ContainerComponent} from './components/container.component';
import {NgClass} from '@angular/common';
import {InfiniteCraftDataService} from './services/infinite-craft-data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgClass, ContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  /* TODO */
  title = 'Infinite Craft';

  infiniteCraftDataService = inject(InfiniteCraftDataService);
}
