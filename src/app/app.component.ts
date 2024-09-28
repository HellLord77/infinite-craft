import {Component} from '@angular/core';
import {ContainerComponent} from "./components/container/container.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Infinite Craft';
}
