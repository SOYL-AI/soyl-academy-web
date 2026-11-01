// Hand-drawn SVG schematics for ICSE 10 Chemistry ch12 Study of Compounds: Sulphuric Acid (allow-listed elements, palette colours only).
import { svgDoc, S } from './lib.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });

/** An open beaker with its rim at y = top, base at y = base, from x to x + w. */
const beaker = (x, top, base, w) => S.path(`M ${x - 6} ${top - 4} L ${x} ${top} L ${x} ${base} L ${x + w} ${base} L ${x + w} ${top}`, { w: 1.8 });

// 1. Charring of sugar by concentrated sulphuric acid: before and after.
const PORES = [[372, 96], [392, 118], [380, 146], [404, 160], [370, 186], [398, 200], [384, 226], [408, 236], [366, 222], [394, 82]];
export const SUGAR_CHAR = svgDoc(
  540,
  320,
  'Two beakers showing concentrated sulphuric acid acting on sugar. In the first beaker, a heap of white sugar sits at the bottom while a little concentrated sulphuric acid is poured onto it. In the second beaker, a few minutes later, a tall black spongy column of carbon has risen up out of the beaker, full of holes, with clouds of steam coming off and the beaker feeling very hot. The acid has removed the elements of water from the sugar, leaving carbon.',
  [
    // before
    beaker(60, 150, 290, 120),
    ...[[78, 282], [92, 276], [106, 270], [120, 266], [134, 270], [148, 276], [162, 282], [100, 282], [120, 280], [140, 282], [112, 274], [128, 274]].map(([x, y]) => S.circle(x, y, 3, { sw: 1 })),
    S.path('M 74 288 Q 120 252 166 288', { c: 'var(--diagram-muted)', w: 1 }),
    S.path('M 150 70 L 150 110 L 134 140', { w: 1.5 }),
    S.rect(143, 58, 14, 14, { fill: 'var(--diagram-muted)', fop: 0.4, sw: 1 }),
    S.path('M 132 146 L 128 240', { c: 'var(--diagram-muted)', w: 1.2, dash: '3 3' }),
    S.lines(166, 76, ['conc. H₂SO₄', 'added'], { size: 10, dy: 12 }),
    S.lines(36, 310, ['white sugar (sucrose)'], { size: 10 }),
    lab(120, 40, 'Before', { a: 'middle', size: 12, w: 'bold' }),
    // arrow
    S.arrow(206, 210, 300, 210, { c: 'var(--diagram-accent)' }),
    S.lines(253, 196, ['a few', 'minutes'], { a: 'middle', size: 10, dy: 12, c: 'var(--diagram-accent)' }),
    // after
    beaker(330, 150, 290, 120),
    S.path('M 352 288 L 356 130 Q 360 72 390 66 Q 420 72 424 130 L 428 288 Z', { fill: 'currentColor', fop: 0.75, w: 1.2 }),
    ...PORES.map(([x, y]) => S.circle(x, y, 4, { fill: 'var(--diagram-muted)', fop: 0.6, sw: 0.8, c: 'var(--diagram-muted)' })),
    ...[0, 1, 2].map((i) => S.path(`M ${372 + i * 18} 58 Q ${364 + i * 18} 46 ${372 + i * 18} 34 Q ${380 + i * 18} 22 ${372 + i * 18} 10`, { c: 'var(--diagram-muted)', w: 1.4 })),
    S.lines(456, 30, ['steam'], { size: 10, c: 'var(--diagram-muted)' }),
    S.lines(456, 120, ['black, spongy', 'mass of carbon', 'rises out of', 'the beaker'], { size: 10, dy: 12 }),
    S.lead(426, 132, 452, 124),
    S.lines(456, 250, ['beaker', 'very hot'], { size: 10, dy: 12, c: 'var(--diagram-red)' }),
    lab(390, 312, 'After', { a: 'middle', size: 12, w: 'bold' }),
  ].join(''),
);

// 2. Dehydration of blue copper(II) sulphate crystals by concentrated sulphuric acid.
const tube = (x, top, bottom, w) => S.path(`M ${x} ${top} L ${x} ${bottom} Q ${x + w / 2} ${bottom + w * 0.55} ${x + w} ${bottom} L ${x + w} ${top}`, { w: 1.6 }) + S.line(x - 4, top, x + w + 4, top, { w: 1.6 });
export const CUSO4_WHITE = svgDoc(
  440,
  280,
  'Two test tubes showing the dehydration of copper(II) sulphate crystals. The first tube holds blue crystals of hydrated copper(II) sulphate. Concentrated sulphuric acid is added, and in the second tube the crystals have turned into a white powder of anhydrous copper(II) sulphate at the bottom of the colourless acid, because the acid has removed the water of crystallisation.',
  [
    tube(80, 40, 190, 48),
    ...[[88, 170], [100, 182], [114, 176], [124, 186], [94, 194], [110, 196], [118, 164], [102, 160]].map(([x, y]) => S.rect(x, y, 10, 10, { fill: 'var(--diagram-blue)', fop: 0.75, sw: 0.8, c: 'var(--diagram-blue)' })),
    S.lines(104, 236, ['blue crystals', 'CuSO₄·5H₂O'], { a: 'middle', size: 10, dy: 12 }),
    S.arrow(150, 120, 270, 120, { c: 'var(--diagram-accent)' }),
    S.lines(210, 104, ['add conc. H₂SO₄'], { a: 'middle', size: 10, c: 'var(--diagram-accent)' }),
    S.lines(210, 140, ['water of', 'crystallisation', 'removed'], { a: 'middle', size: 10, dy: 12, c: 'var(--diagram-muted)' }),
    tube(290, 40, 190, 48),
    S.rect(292, 110, 44, 84, { c: 'none', sw: 0, fill: 'var(--diagram-muted)', fop: 0.15 }),
    ...[[298, 182], [308, 188], [318, 184], [328, 188], [302, 194], [314, 198], [324, 196], [312, 176], [322, 178], [304, 174]].map(([x, y]) => S.circle(x, y, 2.6, { sw: 1 })),
    S.lines(314, 236, ['white powder', 'CuSO₄ (anhydrous)'], { a: 'middle', size: 10, dy: 12 }),
    S.lines(350, 100, ['colourless', 'acid'], { size: 10, dy: 12, c: 'var(--diagram-muted)' }),
  ].join(''),
);
