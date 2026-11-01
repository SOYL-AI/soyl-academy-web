// Hand-drawn SVG schematics for ICSE 10 Chemistry ch01 (allow-listed elements, palette colours only).
import { svgDoc, S } from './lib.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });

// 1. Short periodic table: elements 1–20 in periods 1–4, groups 1, 2 and 13–18 (transition block shown as a gap).
const CELLS = [
  [1, 1, 'H', 1], [1, 18, 'He', 2],
  [2, 1, 'Li', 3], [2, 2, 'Be', 4], [2, 13, 'B', 5], [2, 14, 'C', 6], [2, 15, 'N', 7], [2, 16, 'O', 8], [2, 17, 'F', 9], [2, 18, 'Ne', 10],
  [3, 1, 'Na', 11], [3, 2, 'Mg', 12], [3, 13, 'Al', 13], [3, 14, 'Si', 14], [3, 15, 'P', 15], [3, 16, 'S', 16], [3, 17, 'Cl', 17], [3, 18, 'Ar', 18],
  [4, 1, 'K', 19], [4, 2, 'Ca', 20],
];
const COLX = { 1: 60, 2: 100, 13: 180, 14: 220, 15: 260, 16: 300, 17: 340, 18: 380 };
export const SHORT_TABLE = svgDoc(
  430,
  230,
  'The first twenty elements arranged in the modern periodic table. Period 1 holds hydrogen in group 1 and helium in group 18. Period 2 runs from lithium to neon and period 3 from sodium to argon, filling groups 1, 2 and 13 to 18. Period 4 begins with potassium and calcium in groups 1 and 2. A gap between groups 2 and 13 marks where the transition elements fit from period 4 onwards. Each box shows the symbol and the atomic number.',
  [
    ...Object.entries(COLX).map(([g, x]) => lab(x + 16, 22, String(g), { a: 'middle', size: 10, c: 'var(--diagram-muted)' })),
    ...[1, 2, 3, 4].map((p) => lab(22, 30 + p * 42, String(p), { a: 'middle', size: 10, c: 'var(--diagram-muted)' })),
    lab(8, 14, 'Period', { size: 10, c: 'var(--diagram-muted)' }),
    lab(210, 10, 'Group', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }),
    ...CELLS.map(([p, g, sym, z]) => {
      const x = COLX[g];
      const y = 8 + p * 42;
      const fill = g <= 2 ? 'var(--diagram-blue)' : g === 18 ? 'var(--diagram-muted)' : g >= 15 ? 'var(--diagram-green)' : 'var(--diagram-accent)';
      return S.rect(x, y, 34, 34, { fill, fop: 0.18, sw: 1.2 }) + S.text(x + 17, y + 13, String(z), { a: 'middle', size: 10 }) + S.text(x + 17, y + 28, sym, { a: 'middle', size: 13, w: 'bold' });
    }),
    S.rect(136, 176, 36, 34, { dash: '3 2', sw: 1, c: 'var(--diagram-muted)' }),
    lab(154, 222, 'transition block', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }),
  ].join(''),
);

// 2. Trend arrows over a periodic-table outline.
export const TRENDS = svgDoc(
  420,
  250,
  'Trend arrows on an outline of the periodic table. Across a period from left to right, atomic size and metallic character decrease, while ionisation potential, electron affinity, electronegativity and non-metallic character increase. Down a group, atomic size and metallic character increase, while ionisation potential, electron affinity and electronegativity decrease.',
  [
    S.rect(70, 50, 300, 150, { sw: 1.5 }),
    S.arrow(80, 36, 360, 36, { c: 'var(--diagram-red)' }),
    lab(220, 28, 'Across a period: size ↓  metallic ↓', { a: 'middle', size: 11, c: 'var(--diagram-red)' }),
    lab(220, 216, 'Across a period: IP ↑  EA ↑  EN ↑  non-metallic ↑', { a: 'middle', size: 11, c: 'var(--diagram-blue)' }),
    S.arrow(80, 228, 360, 228, { c: 'var(--diagram-blue)' }),
    S.arrow(50, 60, 50, 190, { c: 'var(--diagram-green)' }),
    S.lines(8, 110, ['Down', 'a group:', 'size ↑', 'metallic ↑', 'IP, EA,', 'EN ↓'], { size: 10, c: 'var(--diagram-green)', dy: 12 }),
    lab(110, 80, 'Na, K', { size: 11 }),
    lab(110, 96, '(most metallic)', { size: 10, c: 'var(--diagram-muted)' }),
    lab(300, 80, 'F, Cl', { size: 11 }),
    lab(290, 96, '(most non-metallic)', { size: 10, c: 'var(--diagram-muted)' }),
    lab(220, 150, 'noble-gas radii are not compared with the rest', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }),
  ].join(''),
);
