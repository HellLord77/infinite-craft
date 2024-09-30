import {Point} from './point.model';
import {Speed} from './speed.model';

export interface Particle {
  center: Point;
  speed: Speed;
  radius: number;
  opacity: number;
}
