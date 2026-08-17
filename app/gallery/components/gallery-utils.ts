import type { GalleryImageSource } from "./gallery-types";

export const GRID_COLUMNS = 4;
export const GRID_ROWS = 3;

export function modulo(value: number, divisor: number) {
  return ((value % divisor) + divisor) % divisor;
}

export function imageSource(image: GalleryImageSource) {
  return typeof image === "string" ? image : image.src;
}

export function imageSourceSet(image: GalleryImageSource) {
  return typeof image === "string" ? undefined : image.srcSet;
}

export function imageAlt(image: GalleryImageSource, fallback: string) {
  return typeof image === "string" ? fallback : image.alt || fallback;
}

function seededUnit(seed: number) {
  const value = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return value - Math.floor(value);
}

export function tileVariation(row: number, column: number) {
  const localRow = modulo(row, GRID_ROWS);
  const localColumn = modulo(column, GRID_COLUMNS);
  const seed = localRow * GRID_COLUMNS + localColumn + 1;

  return {
    x: seededUnit(seed * 1.17) - 0.5,
    y: seededUnit(seed * 2.31) - 0.5,
    rotation: seededUnit(seed * 4.73) - 0.5,
    scale: 0.82 + seededUnit(seed * 6.11) * 0.34,
    delay: seededUnit(seed * 8.93) * 0.32,
  };
}

export function itemIndexForCell(row: number, column: number, itemCount: number) {
  if (itemCount <= 0) return 0;
  const patternIndex =
    modulo(row, GRID_ROWS) * GRID_COLUMNS + modulo(column, GRID_COLUMNS);
  return patternIndex % itemCount;
}

