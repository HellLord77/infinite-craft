import { Point } from '@angular/cdk/drag-drop';

export interface Particle {
  center: Point;
  xSpeed: number;
  ySpeed: number;
  radius: number;
  opacity: number;
}
