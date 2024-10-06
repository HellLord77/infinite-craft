export interface Color {
  r: number;
  g: number;
  b: number;
}

export function get(): Color {
  return {r: 0, g: 0, b: 0};
}
