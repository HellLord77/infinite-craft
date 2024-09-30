import {Component, HostBinding, HostListener, inject, OnInit} from '@angular/core';
import {DeleteModeService} from '../services/delete-mode.service';

@Component({
  selector: 'app-trash',
  standalone: true,
  imports: [],
  templateUrl: './trash.component.html',
  styleUrl: './trash.component.css',
})
export class TrashComponent implements OnInit {
  @HostBinding('class.trash-active') trashActive = false;

  deleteModeService = inject(DeleteModeService);

  ngOnInit() {
    this.deleteModeService.trashComponent = this;
  }

  @HostListener('click') onClick() {
    this.deleteModeService.toggleDeleteMode();
  }
}
