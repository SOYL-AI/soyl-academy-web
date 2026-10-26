// Hand-drawn SVG schematics for ch08 Heredity (allow-listed elements, palette colours only).
import { svgDoc, S } from '../../cbse-10-science-ch06/src/lib.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });

// 1. Accumulation of variation over generations (asexual)
const node = (x, y, dots) =>
  S.circle(x, y, 17, { fill: 'var(--diagram-fill)' }) +
  dots.map(([c, dx, dy]) => S.circle(x + dx, y + dy, 4, { fill: `var(--diagram-${c})`, sw: 0 })).join('');
export const VARIATION = svgDoc(
  340,
  232,
  'Variation accumulating over three generations of asexual reproduction: each offspring keeps the small changes of its parent and adds new ones of its own, so the third generation shows four slightly different individuals',
  [
    S.line(180, 46, 112, 86), S.line(180, 46, 248, 86),
    S.line(112, 120, 72, 154), S.line(112, 120, 152, 154), S.line(248, 120, 212, 154), S.line(248, 120, 292, 154),
    node(180, 30, []),
    node(112, 103, [['blue', 0, 0]]),
    node(248, 103, [['green', 0, 0]]),
    node(72, 170, [['blue', -6, 0], ['red', 6, 0]]),
    node(152, 170, [['blue', 0, 0]]),
    node(212, 170, [['green', -6, 0], ['yellow', 6, 0]]),
    node(292, 170, [['green', -6, -4], ['brown', 6, 4]]),
    lab(6, 34, 'Generation 1'),
    lab(6, 107, 'Generation 2'),
    lab(6, 204, 'Generation 3'),
    lab(170, 226, 'Each coloured dot = one new variation', { a: 'middle', c: 'var(--diagram-accent)' }),
  ].join(''),
);

// 2. Free and attached earlobes
export const EARLOBES = svgDoc(
  320,
  206,
  'Two types of earlobe: a free earlobe hangs below the point where the ear joins the side of the head; an attached earlobe joins the side of the head directly',
  [
    S.line(64, 16, 64, 170, { c: 'var(--diagram-muted)', w: 1.5 }),
    S.path('M64 34 C92 8 132 22 132 66 C132 100 116 112 108 128 C102 144 100 160 86 162 C74 162 70 150 70 140 L64 136', { fill: 'var(--diagram-brown)', fop: 0.15, w: 2 }),
    S.path('M80 46 C100 36 116 50 114 70 C112 88 100 96 94 108', { w: 1.2 }),
    S.line(224, 16, 224, 170, { c: 'var(--diagram-muted)', w: 1.5 }),
    S.path('M224 34 C252 8 292 22 292 66 C292 100 276 114 266 130 C258 144 244 152 224 152', { fill: 'var(--diagram-brown)', fop: 0.15, w: 2 }),
    S.path('M240 46 C260 36 276 50 274 70 C272 88 260 96 254 108', { w: 1.2 }),
    lab(114, 152, 'Lobe hangs free', { c: 'var(--diagram-accent)' }),
    S.lead(112, 150, 100, 156),
    lab(240, 170, 'Lobe joins', { c: 'var(--diagram-accent)' }),
    lab(240, 182, 'the head', { c: 'var(--diagram-accent)' }),
    S.lead(238, 166, 228, 154),
    lab(96, 200, 'Free earlobe', { a: 'middle', w: 'bold' }),
    lab(258, 200, 'Attached earlobe', { a: 'middle', w: 'bold' }),
    lab(68, 12, 'Side of head', { c: 'var(--diagram-muted)' }),
  ].join(''),
);

// 3. Chromosome pairs sorting into germ cells
const chromo = (x, y, len, c) => S.rect(x - 4, y - len / 2, 8, len, { rx: 4, fill: `var(--diagram-${c})`, sw: 1 });
const gamete = (x, y, cl, cs) => S.circle(x, y, 26, { fill: 'var(--diagram-fill)' }) + chromo(x - 7, y, 30, cl) + chromo(x + 8, y, 16, cs);
export const PAIRS = svgDoc(
  340,
  220,
  'A body cell has two copies of each chromosome, one from the father and one from the mother; each germ cell gets only one chromosome of each pair, in any combination, so four kinds of germ cell are possible from two pairs',
  [
    S.circle(78, 104, 56, { fill: 'var(--diagram-fill)' }),
    chromo(54, 104, 46, 'blue'), chromo(70, 104, 46, 'red'),
    chromo(90, 104, 24, 'blue'), chromo(106, 104, 24, 'red'),
    S.arrow(140, 104, 176, 104, { w: 2 }),
    gamete(212, 56, 'blue', 'blue'),
    gamete(292, 56, 'blue', 'red'),
    gamete(212, 150, 'red', 'blue'),
    gamete(292, 150, 'red', 'red'),
    lab(78, 178, 'Body cell: two copies', { a: 'middle' }),
    lab(78, 191, 'of each chromosome', { a: 'middle' }),
    lab(252, 196, 'Germ cells: one of each pair,', { a: 'middle' }),
    lab(252, 209, 'in any combination', { a: 'middle' }),
    lab(6, 18, 'Blue: from the father', { c: 'var(--diagram-blue)' }),
    lab(6, 32, 'Red: from the mother', { c: 'var(--diagram-red)' }),
  ].join(''),
);

// 4. Sex chromosomes
const xch = (x, y, k, c) => S.path(`M${x - 12 * k} ${y - 22 * k} L${x + 12 * k} ${y + 22 * k} M${x + 12 * k} ${y - 22 * k} L${x - 12 * k} ${y + 22 * k}`, { w: 9 * Math.min(1, k + 0.3), c, cap: 'round' });
const ych = (x, y, c) => S.path(`M${x - 8} ${y - 12} L${x} ${y} M${x + 8} ${y - 12} L${x} ${y} M${x} ${y} L${x} ${y + 16}`, { w: 8, c, cap: 'round' });
export const XY = svgDoc(
  320,
  180,
  'Sex chromosomes: a woman has two X chromosomes (XX); a man has one X and one smaller Y chromosome (XY); the other 22 pairs are alike in both',
  [
    S.rect(16, 30, 128, 100, { rx: 10, c: 'var(--diagram-muted)', sw: 1 }),
    xch(56, 80, 1, 'var(--diagram-red)'),
    xch(104, 80, 1, 'var(--diagram-red)'),
    S.rect(176, 30, 128, 100, { rx: 10, c: 'var(--diagram-muted)', sw: 1 }),
    xch(216, 80, 1, 'var(--diagram-blue)'),
    ych(266, 82, 'var(--diagram-blue)'),
    lab(56, 124, 'X', { a: 'middle', w: 'bold' }),
    lab(104, 124, 'X', { a: 'middle', w: 'bold' }),
    lab(216, 124, 'X', { a: 'middle', w: 'bold' }),
    lab(266, 124, 'Y', { a: 'middle', w: 'bold' }),
    lab(80, 22, 'Female: XX', { a: 'middle', w: 'bold' }),
    lab(240, 22, 'Male: XY', { a: 'middle', w: 'bold' }),
    lab(160, 156, 'The other 22 pairs (autosomes) are alike in both', { a: 'middle' }),
    lab(160, 172, 'Y is shorter than X', { a: 'middle', c: 'var(--diagram-accent)' }),
  ].join(''),
);

export const ALL = { VARIATION, EARLOBES, PAIRS, XY };
