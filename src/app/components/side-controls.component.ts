import {Component, input} from '@angular/core';

import {ClearComponent} from './clear.component';
import {DarkModeIconComponent} from './dark-mode-icon.component';
import {ParticleComponent} from './particle.component';
import {ParticlesComponent} from './particles.component';
import {SoundComponent} from './sound.component';

@Component({
  selector: 'app-side-controls',
  standalone: true,
  imports: [DarkModeIconComponent, ClearComponent, SoundComponent, ParticleComponent],
  templateUrl: './side-controls.component.html',
  styleUrl: './side-controls.component.css',
})
export class SideControlsComponent {
  particlesComponent = input.required<ParticlesComponent>();
}
