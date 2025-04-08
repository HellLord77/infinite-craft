import {Component, HostBinding, HostListener, input} from '@angular/core';

import {ParticlesComponent} from './particles.component';

@Component({
  selector: 'app-particle',
  imports: [],
  templateUrl: './particle.component.html',
  styleUrl: './particle.component.css',
})
export class ParticleComponent {
  @HostBinding('class.inactive') inactive = false;

  particlesComponent = input.required<ParticlesComponent>();

  @HostListener('click') onClick() {
    this.inactive = this.particlesComponent().toggleInactive();
  }
}
