export interface Point {
  x: number;
  y: number;
}

export function toTranslate(point: Point): string {
  return `${point.x}px ${point.y}px`;
}

export function getDistance(point: Point, other: Point): number {
  return Math.sqrt(Math.pow(point.x - other.x, 2) + Math.pow(point.y - other.y, 2));
}
