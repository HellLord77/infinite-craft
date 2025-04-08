import {Component} from '@angular/core';

import {SortDirectionComponent} from './sort-direction.component';
import {SortNameComponent} from './sort-name.component';

@Component({
  selector: 'app-sort-wrapper',
  imports: [SortNameComponent, SortDirectionComponent],
  templateUrl: './sort-wrapper.component.html',
  styleUrl: './sort-wrapper.component.css',
})
export class SortWrapperComponent {}
