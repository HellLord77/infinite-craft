import {Component, ElementRef, HostListener, inject, OnInit, viewChild} from '@angular/core';
import {Particle, update} from '../models/particle.model';
import {StateService} from '../services/state.service';
import {Color} from '../models/color.model';
import {getDistance, Point} from '../models/point.model';
import {DataService} from '../services/data.service';
import {UtilityService} from '../services/utility.service';
import {ConfigService} from '../services/config.service';

@Component({
  selector: 'app-particles',
  standalone: true,
  imports: [],
  templateUrl: './particles.component.html',
  styleUrl: './particles.component.css',
})
export class ParticlesComponent implements OnInit {
  utilityService = inject(UtilityService);
  configService = inject(ConfigService);
  stateService = inject(StateService);
  dataService = inject(DataService);

  private context!: CanvasRenderingContext2D;

  private lastTime: DOMHighResTimeStamp = 0;
  private particles: Particle[] = [];
  private boundFrameRequestCallback = this.frameRequestCallback.bind(this);
  private canvasElementRef = viewChild.required<ElementRef<HTMLCanvasElement>>('canvasElement');

  ngOnInit() {
    if (!this.configService.particleIsEnabled) {
      return;
    }

    this.context = this.canvasElementRef().nativeElement.getContext('2d')!;

    this.onWindowResize();
    this.createParticles();

    requestAnimationFrame(this.boundFrameRequestCallback);
  }

  @HostListener('window:resize') onWindowResize() {
    const canvasElementRef = this.canvasElementRef();
    canvasElementRef.nativeElement.width = innerWidth;
    canvasElementRef.nativeElement.height = innerHeight;
  }

  createParticle(): Particle {
    const centerX = innerWidth * Math.random();
    const centerY = innerHeight * Math.random();
    const speedX = 0.03 * Math.random() - 0.015;
    const speedY = 0.03 * Math.random() - 0.015;
    const random = Math.random();
    const radius = 1.1 + 1.2 * random;
    const opacity = 0.1 + 0.4 * (1 - random);
    return {
      center: {x: centerX, y: centerY},
      speed: {x: speedX, y: speedY},
      radius: radius,
      opacity: opacity,
    };
  }

  createParticles() {
    const count = Math.min(
      this.configService.particleMinParticleCount,
      (innerWidth * innerHeight) / 12e3,
    );
    for (let index = 0; index < count; ++index) {
      const particle = this.createParticle();
      this.particles.push(particle);
    }
  }

  updateParticle(particle: Particle, deltaTime: DOMHighResTimeStamp) {
    update(particle, deltaTime);

    if (particle.center.x < 0) {
      particle.center.x = innerWidth;
    } else if (particle.center.x > innerWidth) {
      particle.center.x = 0;
    }

    if (particle.center.y < 0) {
      particle.center.y = innerHeight;
    } else if (particle.center.y > innerHeight) {
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
    if (deltaTime > this.configService.particleMinFrameInterval) {
      this.lastTime = time;
      deltaTime = Math.min(this.configService.particleMaxFrameInterval, deltaTime);

      for (const particle of this.particles) {
        this.updateParticle(particle, deltaTime);
      }

      this.context.clearRect(0, 0, innerWidth, innerHeight);

      const color: Color = {r: 0, g: 0, b: 0};
      if (this.dataService.isDarkMode()) {
        color.r = color.g = color.b = 255;
      }

      for (const particle of this.particles) {
        this.drawParticle(particle, color);
      }

      const particleLineCounts = this.utilityService.arrayFrom(this.particles.length, 0);
      const instanceLineCounts = this.utilityService.arrayFrom(
        this.stateService.instances.length,
        0,
      );

      this.particles.forEach((particle, particleIndex) => {
        this.stateService.instances.forEach((instance, instanceIndex) => {
          if (
            particleLineCounts[particleIndex] < this.configService.particleMaxParticleLineCount &&
            instanceLineCounts[instanceIndex] < this.configService.particleMaxInstanceLineCount
          ) {
            const lineLength = getDistance(particle.center, instance.center);
            if (lineLength < this.configService.particleMaxLineLength) {
              ++particleLineCounts[particleIndex];
              ++instanceLineCounts[instanceIndex];

              this.drawLine(
                particle,
                instance.center,
                Math.min(1, 1 - lineLength / this.configService.particleMaxLineLength),
              );
            }
          }
        });
      });
    }
    requestAnimationFrame(this.boundFrameRequestCallback);
  }
}
