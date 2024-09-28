import {Component} from '@angular/core';
import {TrashComponent} from "../trash/trash.component";
import {DarkModeIconComponent} from "../dark-mode-icon/dark-mode-icon.component";
import {ClearComponent} from "../clear/clear.component";
import {SoundComponent} from "../sound/sound.component";

@Component({
  selector: 'app-side-controls',
  standalone: true,
  imports: [
    TrashComponent,
    DarkModeIconComponent,
    ClearComponent,
    SoundComponent
  ],
  templateUrl: './side-controls.component.html',
  styleUrl: './side-controls.component.css'
})
export class SideControlsComponent {

}
