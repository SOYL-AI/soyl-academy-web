// Computed values shared by decks, notes and questions (ch01 Cell). Illustrative data are labelled "(given)" where used.
import { near, dec } from './lib.mjs';

// Magnification worked example: drawing 24 mm across at magnification 400.
export const MAG = { image_mm: 24, m: 400 };
MAG.actual_mm = MAG.image_mm / MAG.m; // 0.06 mm
MAG.actual_um = MAG.actual_mm * 1000; // 60 micrometres
if (!near(MAG.actual_um, 60, 1e-9)) throw new Error('mag example');

// Potato strips, 10.0 g each, left 1 hour in sugar solutions (illustrative).
export const POTATO = [
  { conc: 0, final: 11.2 },
  { conc: 5, final: 10.3 },
  { conc: 10, final: 9.4 },
  { conc: 15, final: 8.6 },
].map((p) => ({ ...p, start: 10.0, change: p.final - 10.0, pct: ((p.final - 10.0) / 10.0) * 100 }));
const [p0, p5, p10, p15] = POTATO;
// isotonic concentration: linear interpolation between the last gain (5 %) and the first loss (10 %)
export const ISO = p5.conc + ((p10.conc - p5.conc) * p5.pct) / (p5.pct - p10.pct);
if (!near(p0.pct, 12, 1e-9) || !near(p5.pct, 3, 1e-9) || !near(p10.pct, -6, 1e-9) || !near(p15.pct, -14, 1e-9)) throw new Error('potato data');
if (!near(ISO, 6.667, 0.001)) throw new Error('iso');
export const ISO_TXT = dec(ISO, 2);

// Chromosome counts (textbook values) used in examples and questions.
export const CHR = { human: 46, onion: 16, maize: 20, fruitfly: 8, pea: 14, rice: 24 };
export const gamete = (n) => n / 2;
