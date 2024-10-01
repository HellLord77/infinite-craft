import {Point} from './point.model';
import {Speed} from './speed.model';

export interface Particle {
  center: Point;
  speed: Speed;
  radius: number;
  opacity: number;
}

export function update(particle: Particle, deltaTime: number) {
  particle.center.x += particle.speed.x * deltaTime;
  particle.center.y += particle.speed.y * deltaTime;
}
