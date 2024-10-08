import {
  Component,
  ElementRef,
  HostListener,
  inject,
  NgZone,
  OnInit,
  viewChild,
} from '@angular/core';

import {Color, get} from '../models/color.model';
import {Particle, update} from '../models/particle.model';
import {getDistance, Point} from '../models/point.model';
import {ConfigService} from '../services/config.service';
import {DataService} from '../services/data.service';
import {StateService} from '../services/state.service';

@Component({
  selector: 'app-particles',
  standalone: true,
  imports: [],
  templateUrl: './particles.component.html',
  styleUrl: './particles.component.css',
})
export class ParticlesComponent implements OnInit {
  width = 0;
  height = 0;

  ngZone = inject(NgZone);
  configService = inject(ConfigService);
  stateService = inject(StateService);
  dataService = inject(DataService);

  private context!: CanvasRenderingContext2D;

  private inactive = false;
  private lastTime: DOMHighResTimeStamp = 0;
  private particles: Particle[] = [];
  private canvasElementRef = viewChild.required<ElementRef<HTMLCanvasElement>>('canvasElement');

  ngOnInit() {
    this.context = this.canvasElementRef().nativeElement.getContext('2d')!;

    this.onWindowResize();
    this.createParticles();

    this.frameRequestCallback(0);
  }

  @HostListener('window:resize') onWindowResize() {
    this.width = innerWidth;
    this.height = innerHeight;
  }

  createParticle() {
    const centerX = this.width * Math.random();
    const centerY = this.height * Math.random();

    const speedX = 0.03 * Math.random() - 0.015;
    const speedY = 0.03 * Math.random() - 0.015;

    const random = Math.random();
    const radius = 1.1 + 1.2 * random;
    const opacity = 0.1 + 0.4 * (1 - random);

    const particle: Particle = {
      center: {x: centerX, y: centerY},
      speed: {x: speedX, y: speedY},
      radius: radius,
      opacity: opacity,
    };
    return particle;
  }

  createParticles() {
    const count = Math.min(
      this.configService.particlesMinParticleCount,
      (this.width * this.height) / 12e3,
    );
    for (let index = 0; index < count; ++index) {
      const particle = this.createParticle();
      this.particles.push(particle);
    }
  }

  updateParticle(particle: Particle, deltaTime: DOMHighResTimeStamp) {
    update(particle, deltaTime);

    if (particle.center.x < 0) {
      particle.center.x = this.width;
    } else if (particle.center.x > this.width) {
      particle.center.x = 0;
    }

    if (particle.center.y < 0) {
      particle.center.y = this.height;
    } else if (particle.center.y > this.height) {
      particle.center.y = 0;
    }
  }

  drawParticle(particle: Particle, color: Color) {
    this.context.beginPath();
    this.context.arc(particle.center.x, particle.center.y, particle.radius, 0, 2 * Math.PI);
    this.context.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${particle.opacity})`;
    this.context.fill();
    this.context.closePath();
  }

  drawLine(particle: Particle, point: Point, opacity: number) {
    this.context.beginPath();
    this.context.moveTo(particle.center.x, particle.center.y);
    this.context.lineTo(point.x, point.y);
    this.context.strokeStyle = `rgba(175, 175, 175, ${opacity})`;
    this.context.stroke();
    this.context.closePath();
  }

  frameRequestCallback(time: DOMHighResTimeStamp) {
    let deltaTime = time - this.lastTime;
    if (deltaTime > this.configService.particlesMinFrameInterval) {
      this.lastTime = time;
      deltaTime = Math.min(deltaTime, this.configService.particlesMaxFrameInterval);

      for (const particle of this.particles) {
        this.updateParticle(particle, deltaTime);
      }

      this.context.clearRect(0, 0, this.width, this.height);

      const color = get();
      if (this.dataService.isDarkMode()) {
        color.r = color.g = color.b = 255;
      }

      for (const particle of this.particles) {
        particle.lineCount = 0;
        this.drawParticle(particle, color);
      }
      for (const instance of this.stateService.iterInstances()) {
        instance.lineCount = 0;
      }

      for (const particle of this.particles) {
        for (const instance of this.stateService.iterInstances()) {
          if (
            particle.lineCount! < this.configService.particlesMaxParticleLineCount &&
            instance.lineCount! < this.configService.particlesMaxInstanceLineCount
          ) {
            const lineLength = getDistance(particle.center, instance.center);
            if (lineLength < this.configService.particlesMaxLineLength) {
              ++particle.lineCount!;
              ++instance.lineCount!;

              this.drawLine(
                particle,
                instance.center,
                Math.min(1, 1 - lineLength / this.configService.particlesMaxLineLength),
              );
            }
          }
        }
      }
    }

    if (this.inactive) {
      this.context.clearRect(0, 0, this.width, this.height);
    } else {
      requestAnimationFrame((time) =>
        this.ngZone.runOutsideAngular(() => {
          this.frameRequestCallback(time);
        }),
      );
    }
  }

  toggleInactive() {
    this.inactive = !this.inactive;
    if (!this.inactive) {
      this.frameRequestCallback(0);
    }
    return this.inactive;
  }
}
