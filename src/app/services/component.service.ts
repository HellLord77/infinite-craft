import {Injectable} from '@angular/core';
import {ItemsComponent} from '../components/items.component';
import {PinwheelComponent} from '../components/pinwheel.component';
import {SidebarComponent} from '../components/sidebar.component';

@Injectable({
  providedIn: 'root',
})
export class ComponentService {
  sidebarComponent!: SidebarComponent;
  itemsComponent!: ItemsComponent;
  pinwheelComponent!: PinwheelComponent;
}
