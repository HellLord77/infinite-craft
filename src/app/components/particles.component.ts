import {
  Component,
  ElementRef,
  inject,
  OnInit,
  viewChild,
} from '@angular/core';
import { Particle } from '../models/particle.model';
import { ConstantService } from '../services/constant.service';
import { Color } from '../models/color.model';
import { DarkModeService } from '../services/dark-mode.service';
import { UtilityService } from '../services/utility.service';
import { Instance } from '../models/instance.model';

@Component({
  selector: 'app-particles',
  standalone: true,
  imports: [],
  templateUrl: './particles.component.html',
  styleUrl: './particles.component.css',
})
export class ParticlesComponent implements OnInit {
  color!: Color;
  protected readonly innerHeight = innerHeight;
  protected readonly innerWidth = innerWidth;
  private context!: CanvasRenderingContext2D;
  private canvasElementRef =
    viewChild.required<ElementRef<HTMLCanvasElement>>('canvasElement');
  private lastTime: DOMHighResTimeStamp = 0;
  private particles: Particle[] = [];
  private boundFrameRequestCallback = this.frameRequestCallback.bind(this);
  private constantService = inject(ConstantService);
  private utilityService = inject(UtilityService);
  private darkModeService = inject(DarkModeService);

  ngOnInit() {
    this.darkModeService.particleComponent = this;

    const canvasElementRef = this.canvasElementRef();
    this.context = canvasElementRef.nativeElement.getContext('2d')!;

    this.createParticles();
    requestAnimationFrame(this.boundFrameRequestCallback);
  }

  createParticle(): Particle {
    const x = Math.random() * innerWidth;
    const y = Math.random() * innerHeight;
    const xSpeed = 0.03 * Math.random() - 0.015;
    const ySpeed = 0.03 * Math.random() - 0.015;
    const random = Math.random();
    const radius = 1.2 * random + 1.1;
    const opacity = 0.4 * (1 - random) + 0.1;
    return {
      center: { x: x, y: y },
      xSpeed: xSpeed,
      ySpeed: ySpeed,
      radius: radius,
      opacity: opacity,
    };
  }

  createParticles() {
    const count = Math.min(150, (innerWidth * innerHeight) / 12e3);
    for (let index = 0; index < count; ++index) {
      const particle = this.createParticle();
      this.particles.push(particle);
    }
  }

  updateParticle(particle: Particle, deltaTime: DOMHighResTimeStamp) {
    particle.center.x += particle.xSpeed * deltaTime;
    if (particle.center.x < 0) {
      particle.center.x = innerWidth;
    } else if (particle.center.x > innerWidth) {
      particle.center.x = 10;
    }

    particle.center.y += particle.ySpeed * deltaTime;
    if (particle.center.y < 0) {
      particle.center.y = innerHeight;
    } else if (particle.center.y > innerHeight) {
      particle.center.y = 10;
    }
  }

  drawParticle(particle: Particle) {
    this.context.beginPath();
    this.context.arc(
      particle.center.x,
      particle.center.y,
      particle.radius,
      0,
      2 * Math.PI,
    );
    this.context.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${particle.opacity})`;
    this.context.fill();
    this.context.closePath();
  }

  drawLine(particle: Particle, instance: Instance, opacity: number) {
    this.context.beginPath();
    this.context.moveTo(particle.center.x, particle.center.y);
    this.context.lineTo(instance.center.x, instance.center.y);
    this.context.strokeStyle = `rgba(175, 175, 175, ${opacity})`;
    this.context.stroke();
    this.context.closePath();
  }

  frameRequestCallback(time: DOMHighResTimeStamp) {
    let deltaTime = time - this.lastTime;
    if (deltaTime > 15) {
      this.lastTime = time;
      deltaTime = Math.min(deltaTime, 30);

      for (const particle of this.particles) {
        this.updateParticle(particle, deltaTime);
      }
    }

    this.context.clearRect(0, 0, innerWidth, innerHeight);

    for (const particle of this.particles) {
      this.drawParticle(particle);
    }

    const particleLineCounts: number[] = Array(this.particles.length).fill(0);
    const instanceLineCounts: number[] = Array(
      this.constantService.instances.length,
    ).fill(0);

    this.particles.forEach((particle, particleIndex) => {
      this.constantService.instances.forEach((instance, instanceIndex) => {
        if (
          particleLineCounts[particleIndex] <= 3 &&
          instanceLineCounts[instanceIndex] <= 7
        ) {
          const lineLength = this.utilityService.getPointsDistance(
            particle.center,
            instance.center,
          );
          if (lineLength < 250) {
            ++particleLineCounts[particleIndex];
            ++instanceLineCounts[instanceIndex];

            this.drawLine(
              particle,
              instance,
              Math.min(1, 1 - lineLength / 250),
            );
          }
        }
      });
    });

    requestAnimationFrame(this.boundFrameRequestCallback);
  }
}
