import {Component} from '@angular/core';
import {ItemsComponent} from "../items/items.component";
import {SidebarControlsComponent} from "../sidebar-controls/sidebar-controls.component";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [ItemsComponent, SidebarControlsComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

}
