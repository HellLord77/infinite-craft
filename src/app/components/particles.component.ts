import {Component, ElementRef, HostListener, inject, OnInit, viewChild} from '@angular/core';
import {Particle, update} from '../models/particle.model';
import {ConstantService} from '../services/constant.service';
import {Color} from '../models/color.model';
import {getDistance, Point} from '../models/point.model';
import {InfiniteCraftDataService} from '../services/infinite-craft-data.service';
import {UtilityService} from '../services/utility.service';

@Component({
  selector: 'app-particles',
  standalone: true,
  imports: [],
  templateUrl: './particles.component.html',
  styleUrl: './particles.component.css',
})
export class ParticlesComponent implements OnInit {
  /* TODO: optimize viewChild */

  width!: number;
  height!: number;

  utilityService = inject(UtilityService);
  constantService = inject(ConstantService);
  infiniteCraftDataService = inject(InfiniteCraftDataService);

  private pixelRatio!: number;
  private context!: CanvasRenderingContext2D;

  private readonly maxParticleLineCount = 3;
  private readonly maxInstanceLineCount = 7;
  private readonly maxLineLength = 250;

  private lastTime = 0;
  private particles: Particle[] = [];
  private boundFrameRequestCallback = this.frameRequestCallback.bind(this);
  private canvasElementRef = viewChild.required<ElementRef<HTMLCanvasElement>>('canvasElement');

  ngOnInit() {
    const canvasElementRef = this.canvasElementRef();
    this.context = canvasElementRef.nativeElement.getContext('2d')!;

    this.onWindowResize();
    this.createParticles();

    requestAnimationFrame(this.boundFrameRequestCallback);
  }

  @HostListener('window:resize') onWindowResize() {
    this.pixelRatio = Math.min(2, devicePixelRatio);
    this.width = this.pixelRatio * innerWidth;
    this.height = this.pixelRatio * innerHeight;
  }

  createParticle(): Particle {
    const centerX = this.width * Math.random();
    const centerY = this.height * Math.random();
    const speedX = 0.03 * Math.random() - 0.015;
    const speedY = 0.03 * Math.random() - 0.015;
    const random = Math.random();
    const radius = this.pixelRatio * (1.1 + 1.2 * random);
    const opacity = 0.1 + 0.4 * (1 - random);
    return {
      center: {x: centerX, y: centerY},
      speed: {x: speedX, y: speedY},
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

  updateParticle(particle: Particle, deltaTime: number) {
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

  frameRequestCallback(time: number) {
    let deltaTime = time - this.lastTime;
    if (deltaTime > 15) {
      this.lastTime = time;
      deltaTime = Math.min(30, deltaTime);

      for (const particle of this.particles) {
        this.updateParticle(particle, deltaTime);
      }
    }

    this.context.clearRect(0, 0, this.width, this.height);

    const color: Color = {r: 0, g: 0, b: 0};
    if (this.infiniteCraftDataService.isDarkMode()) {
      color.r = color.g = color.b = 255;
    }

    for (const particle of this.particles) {
      this.drawParticle(particle, color);
    }

    const particleLineCounts = this.utilityService.arrayFrom(this.particles.length, 0);
    const instanceLineCounts = this.utilityService.arrayFrom(
      this.constantService.instances.length,
      0,
    );

    this.particles.forEach((particle, particleIndex) => {
      this.constantService.instances.forEach((instance, instanceIndex) => {
        if (
          particleLineCounts[particleIndex] < this.maxParticleLineCount &&
          instanceLineCounts[instanceIndex] < this.maxInstanceLineCount
        ) {
          const instanceCenter: Point = {
            x: this.pixelRatio * instance.center.x,
            y: this.pixelRatio * instance.center.y,
          };
          const lineLength = getDistance(particle.center, instanceCenter);
          if (lineLength < this.maxLineLength) {
            ++particleLineCounts[particleIndex];
            ++instanceLineCounts[instanceIndex];

            this.drawLine(
              particle,
              instanceCenter,
              Math.min(1, 1 - lineLength / this.maxLineLength),
            );
          }
        }
      });
    });

    requestAnimationFrame(this.boundFrameRequestCallback);
  }
}
