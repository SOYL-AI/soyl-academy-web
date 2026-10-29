/**
 * Subject glyphs (design-system, 2026-10-29): small original drawings for course cards and subject headers, in
 * place of the letter tiles ("Sc", "En"). 48 × 48 grid, drawn in `currentColor` (the tile's hue token) with a
 * soft tint of the same colour, so they follow the theme like text does.
 */
import { circle as C, ellipse as E, line as L, path as P, type SvgNode } from './svg-tree';

export const SUBJECT_ART_KINDS = [
  'maths',
  'science',
  'physics',
  'chemistry',
  'biology',
  'history',
  'geography',
  'civics',
  'economics',
  'social',
  'english',
  'hindi',
  'sanskrit',
  'computer',
  'generic',
] as const;
export type SubjectArtKind = (typeof SUBJECT_ART_KINDS)[number];

const INK = 'currentColor';
const tint = (d: string, opacity = 0.18): SvgNode => P(d, INK, { opacity });
const ln = (d: string, w = 2.4) => L(d, INK, w);

const ART: Record<SubjectArtKind, SvgNode[]> = {
  // Set square, compass arc and a plus.
  maths: [tint('M8 40V12l28 28Z'), ln('M8 40V12l28 28Z'), ln('M14 34v-8l8 8Z', 1.8), ln('M30 8a10 10 0 0 1 10 10', 2.2), ln('M36 26v8M32 30h8')],
  // Microscope.
  science: [tint('M10 40h28v-4H10Z', 0.25), ln('M10 40h28M24 36v-4M17 32h16'), ln('M22 30l-6-14 5-2 6 14Z'), tint('M22 30l-6-14 5-2 6 14Z'), ln('M15 13l6-3'), ln('M30 32a8 8 0 0 0 4-14', 2)],
  // An atom: nucleus and three orbits.
  physics: [E(24, 24, 18, 7, 'none', 0, { stroke: INK, strokeWidth: 2.2 }), E(24, 24, 18, 7, 'none', 60, { stroke: INK, strokeWidth: 2.2 }), E(24, 24, 18, 7, 'none', -60, { stroke: INK, strokeWidth: 2.2 }), C(24, 24, 3.6, INK), C(24, 24, 9, INK, { opacity: 0.14 })],
  // Conical flask with liquid and bubbles.
  chemistry: [tint('M14 40l6-12h8l6 12Z', 0.3), ln('M20 8h8M21 8v11L11 40h26L27 19V8'), C(22, 34, 1.6, INK), C(27, 31, 1.2, INK), C(30, 13, 1.6, INK, { opacity: 0.6 }), C(33, 8, 1.2, INK, { opacity: 0.45 })],
  // A leaf with veins.
  biology: [tint('M10 38C10 20 22 9 40 8c0 18-11 30-30 30Z'), ln('M10 38C10 20 22 9 40 8c0 18-11 30-30 30Z'), ln('M10 38L32 16M18 30h8M22 26v-7M26 22h7', 1.8)],
  // A classical building.
  history: [tint('M8 16L24 7l16 9Z', 0.3), ln('M8 16L24 7l16 9ZM9 40h30M11 36h26'), ln('M13 19v15M20 19v15M28 19v15M35 19v15', 2.2)],
  // A globe with meridians.
  geography: [C(24, 24, 16, INK, { opacity: 0.16 }), C(24, 24, 16, 'none', { stroke: INK, strokeWidth: 2.4 }), E(24, 24, 7, 16, 'none', 0, { stroke: INK, strokeWidth: 1.8 }), ln('M8.5 19h31M8.5 29h31', 1.8), tint('M16 14c3 1 4 4 3 6s-4 2-5 5-3 1-4-1c0-4 2-8 6-10Z', 0.4)],
  // Balance scales.
  civics: [ln('M24 8v30M14 40h20M10 14h28'), tint('M5 26h14a7 7 0 0 1-14 0Z', 0.3), tint('M29 26h14a7 7 0 0 1-14 0Z', 0.3), ln('M10 14l-5 12h14ZM38 14l-5 12h14Z', 1.8), C(24, 8, 2.4, INK)],
  // Rising bars and a coin.
  economics: [tint('M9 30h6v10H9ZM19 23h6v17h-6ZM29 16h6v24h-6Z', 0.3), ln('M9 30h6v10H9ZM19 23h6v17h-6ZM29 16h6v24h-6Z', 2), ln('M8 15l9-6 7 4 10-7', 2.2), C(39, 10, 5, 'none', { stroke: INK, strokeWidth: 2 })],
  // A folded map with a pin.
  social: [tint('M7 12l11-4 12 4 11-4v28l-11 4-12-4-11 4Z', 0.16), ln('M7 12l11-4 12 4 11-4v28l-11 4-12-4-11 4ZM18 8v28M30 12v28'), P('M24 30s-6-6-6-10a6 6 0 0 1 12 0c0 4-6 10-6 10Z', INK), C(24, 20, 2.2, 'var(--p-surface)')],
  // A quill over writing lines.
  english: [tint('M8 10h22v30H8Z', 0.16), ln('M8 10h22v30H8ZM12 18h12M12 24h14M12 30h9', 2), tint('M42 5c-9 3-15 10-18 21l3 1c5-9 10-15 15-22Z', 0.45), ln('M42 5c-9 3-15 10-18 21M24 26l-2 6', 2)],
  // A page with the Devanagari headline (shirorekha) and hanging strokes.
  hindi: [tint('M8 8h32v32H8Z', 0.14), ln('M11 17h26', 3), ln('M16 17v14M16 24c3 0 5 2 5 5M27 17v14M27 24h5c2 0 3 2 3 4s-1 4-4 4', 2.2)],
  // A palm-leaf manuscript with binding holes.
  sanskrit: [tint('M4 18c0-3 3-5 6-5h28c3 0 6 2 6 5v12c0 3-3 5-6 5H10c-3 0-6-2-6-5Z', 0.2), ln('M4 18c0-3 3-5 6-5h28c3 0 6 2 6 5v12c0 3-3 5-6 5H10c-3 0-6-2-6-5Z'), ln('M10 20h28M10 25h10M26 25h12M10 30h28', 1.6), C(23, 25, 1.8, INK)],
  // A monitor showing angle brackets.
  computer: [tint('M6 9h36v24H6Z', 0.16), ln('M6 9h36v24H6ZM18 40h12M24 33v7'), ln('M19 16l-5 5 5 5M29 16l5 5-5 5M26 14l-4 14', 2.2)],
  // An open book with a spark.
  generic: [tint('M6 12c6-2 12-1 18 3v24c-6-4-12-5-18-3Z', 0.2), tint('M42 12c-6-2-12-1-18 3v24c6-4 12-5 18-3Z', 0.32), ln('M6 12c6-2 12-1 18 3 6-4 12-5 18-3v24c-6-2-12-1-18 3-6-4-12-5-18-3ZM24 15v24', 2.2), ln('M38 3v6M35 6h6', 1.8)],
};

export function subjectArt(kind: SubjectArtKind): SvgNode[] {
  return ART[kind] ?? ART.generic;
}
