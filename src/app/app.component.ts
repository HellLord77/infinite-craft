import {Component} from '@angular/core';
import {ContainerComponent} from './components/container.component';
import {NgClass} from '@angular/common';

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
}
