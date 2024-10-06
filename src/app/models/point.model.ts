export interface Point {
  x: number;
  y: number;
}

export function get(): Point {
  return {x: 0, y: 0};
}

export function update(point: Point, other: Point) {
  point.x = other.x;
  point.y = other.y;
}

export function toTranslate(point: Point): string {
  return `${point.x}px ${point.y}px`;
}

export function getCenter(point: Point, other: Point): Point {
  return {
    x: (point.x + other.x) / 2,
    y: (point.y + other.y) / 2,
  };
}

export function getDistance(point: Point, other: Point): number {
  return Math.sqrt(Math.pow(point.x - other.x, 2) + Math.pow(point.y - other.y, 2));
}
