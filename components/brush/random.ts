/**
 * Shared types and the seeded random number generator for the paint worker and the recipes (ADR-033).
 */
import type * as BrushModule from 'p5.brush/standalone';

export type Brush = typeof BrushModule;

export interface PaintContext {
  b: Brush;
  /** Logical (CSS pixel) size of the painting. */
  w: number;
  h: number;
  /** Seeded random number in [0, 1). */
  rand: () => number;
}

export type Step = () => void;
export type Recipe = (ctx: PaintContext) => Step[];

/** Mulberry32: a small, fast, seedable PRNG. */
export function seededRandom(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
