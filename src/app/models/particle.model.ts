import {Point} from './point.model';

export interface Particle {
  center: Point;
  speed: Point;
  radius: number;
  opacity: number;
  lineCount?: number;
}

export function update(particle: Particle, deltaTime: DOMHighResTimeStamp) {
  particle.center.x += particle.speed.x * deltaTime;
  particle.center.y += particle.speed.y * deltaTime;
}
