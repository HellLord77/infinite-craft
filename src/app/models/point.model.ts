import {Speed} from './speed.model';

export interface Point {
  x: number;
  y: number;
}

export function toTranslate(point: Point): string {
  return `${point.x}px ${point.y}px`;
}

export function getUpdated(point: Point, speed: Speed, deltaTime: number): Point {
  return {x: point.x + speed.x * deltaTime, y: point.y + speed.y * deltaTime};
}

export function getDistance(point: Point, other: Point): number {
  return Math.sqrt(Math.pow(point.x - other.x, 2) + Math.pow(point.y - other.y, 2));
}
