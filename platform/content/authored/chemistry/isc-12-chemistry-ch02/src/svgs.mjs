// Hand-drawn SVG schematics for ISC 12 Chemistry ch02 (from the CBSE 12 ch01 set; allow-listed elements, palette colours only).
import { svgDoc, S } from './lib.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const dot = (x, y, o = {}) => S.circle(x, y, o.r ?? 3, { fill: o.c ?? 'currentColor', sw: 0 });
const sq = (x, y, c = 'var(--diagram-accent)') => S.rect(x - 3.5, y - 3.5, 7, 7, { fill: c, sw: 0 });
const water = (x, y, w, h) => S.rect(x, y, w, h, { fill: 'var(--diagram-blue)', fop: 0.22, sw: 0 });

// 1. Henry's law: the same liquid under a gas at low and at high pressure.
function cylinder(x0, pistonY, gas, dissolved, title, sub) {
  const out = [
    water(x0 + 1, 120, 98, 49),
    S.line(x0 + 1, 120, x0 + 99, 120, { c: 'var(--diagram-blue)', w: 1.5 }),
    S.path(`M${x0} 30 V170 H${x0 + 100} V30`, { w: 2 }),
    S.rect(x0 + 2, pistonY - 8, 96, 8, { fill: 'var(--diagram-muted)', sw: 1 }),
    S.line(x0 + 50, pistonY - 8, x0 + 50, 22, { w: 3 }),
    ...gas.map(([x, y]) => dot(x0 + x, y)),
    ...dissolved.map(([x, y]) => dot(x0 + x, y, { c: 'var(--diagram-accent)' })),
    lab(x0 + 50, 188, title, { a: 'middle', w: 'bold' }),
    lab(x0 + 50, 202, sub, { a: 'middle' }),
  ];
  return out.join('');
}
export const HENRY = svgDoc(
  360,
  212,
  'Two identical cylinders containing water under a gas. On the left the piston is high, the gas is at low pressure and only a few gas particles are dissolved in the water. On the right the piston has been pushed down, the gas is at higher pressure and many more gas particles are dissolved.',
  [
    cylinder(30, 62, [[20, 76], [52, 90], [80, 72], [34, 104], [70, 110], [88, 96]], [[24, 140], [70, 156]], 'Low gas pressure', 'few particles dissolve'),
    cylinder(220, 96, [[16, 106], [34, 112], [52, 104], [68, 112], [84, 106], [26, 102]], [[14, 134], [36, 150], [58, 132], [80, 146], [24, 162], [66, 160], [46, 142], [88, 132]], 'Higher gas pressure', 'more particles dissolve'),
    S.arrow(300, 40, 300, 84, { c: 'var(--diagram-accent)', w: 2 }),
    lab(306, 50, 'push', { c: 'var(--diagram-accent)' }),
    lab(180, 100, 'gas', { a: 'middle' }),
    lab(180, 146, 'water', { a: 'middle' }),
  ].join(''),
);

// 2. Lowering of vapour pressure: pure solvent vs solution.
function beaker(x0, solute, escapes, title) {
  const surface = [];
  for (let x = x0 + 10; x < x0 + 120; x += 12) surface.push(x);
  return [
    water(x0 + 1, 100, 128, 69),
    S.path(`M${x0} 60 V170 H${x0 + 130} V60`, { w: 2 }),
    ...surface.map((x, i) => (solute.includes(i) ? sq(x, 104) : dot(x, 104))),
    ...[[18, 130], [44, 144], [70, 128], [96, 150], [112, 132], [30, 158], [84, 160]].map(([x, y], i) => (solute.length && i % 2 === 0 ? sq(x0 + x, y) : dot(x0 + x, y))),
    ...escapes.map((i) => S.arrow(x0 + 10 + i * 12, 96, x0 + 10 + i * 12, 70, { c: 'var(--diagram-accent)', w: 1.5, size: 6 })),
    lab(x0 + 65, 190, title, { a: 'middle', w: 'bold' }),
  ].join('');
}
export const VPLOWER = svgDoc(
  360,
  226,
  'Left: a beaker of pure solvent; every place at the surface is a solvent particle and many particles escape as vapour. Right: a solution; some surface places are taken by non-volatile solute particles, drawn as squares, so fewer solvent particles escape and the vapour pressure is lower.',
  [
    beaker(20, [], [0, 2, 4, 6, 8], 'Pure solvent'),
    beaker(210, [1, 3, 6, 8], [0, 4, 7], 'Solution'),
    dot(30, 210),
    lab(38, 214, 'solvent particle'),
    sq(150, 210),
    lab(158, 214, 'non-volatile solute particle'),
    lab(85, 36, 'more escape:', { a: 'middle', size: 10 }),
    lab(85, 48, 'higher vapour pressure', { a: 'middle', size: 10 }),
    lab(275, 36, 'fewer escape:', { a: 'middle', size: 10 }),
    lab(275, 48, 'lower vapour pressure', { a: 'middle', size: 10 }),
  ].join(''),
);

// 3. Osmosis in a U-tube with a semipermeable membrane.
export const OSMOSIS = svgDoc(
  360,
  230,
  'A U-tube divided at the bottom by a semipermeable membrane. The left arm holds pure water, the right arm holds a sugar solution. Water passes through the membrane from left to right, so the level in the right arm rises above the left arm by a height h; the extra pressure of this column equals the osmotic pressure.',
  [
    water(92, 110, 46, 90),
    water(138, 180, 84, 20),
    water(222, 70, 46, 130),
    S.path('M90 30 V200 H270 V30', { w: 2 }),
    S.path('M140 30 V178 H220 V30', { w: 2 }),
    S.line(180, 178, 180, 200, { c: 'var(--diagram-accent)', w: 3, dash: '3 2' }),
    S.line(92, 110, 138, 110, { c: 'var(--diagram-blue)', w: 1.5 }),
    S.line(222, 70, 268, 70, { c: 'var(--diagram-blue)', w: 1.5 }),
    ...[[234, 100], [254, 130], [240, 160], [258, 92], [232, 186], [206, 192]].map(([x, y]) => sq(x, y)),
    S.arrow(160, 190, 200, 190, { c: 'var(--diagram-accent)', w: 2, size: 6 }),
    S.line(280, 70, 300, 70, { c: 'var(--diagram-muted)', w: 1, dash: '3 2' }),
    S.line(280, 110, 300, 110, { c: 'var(--diagram-muted)', w: 1, dash: '3 2' }),
    S.line(140, 110, 280, 110, { c: 'var(--diagram-muted)', w: 1, dash: '3 2' }),
    S.arrow(292, 90, 292, 72, { size: 5 }),
    S.arrow(292, 90, 292, 108, { size: 5 }),
    lab(304, 94, 'h'),
    lab(115, 22, 'Pure water', { a: 'middle' }),
    lab(245, 22, 'Sugar solution', { a: 'middle' }),
    lab(180, 220, 'Semipermeable membrane (lets only water through)', { a: 'middle' }),
    S.lead(180, 210, 180, 202),
    lab(20, 150, 'water flows', { c: 'var(--diagram-accent)' }),
    lab(20, 163, 'into the solution', { c: 'var(--diagram-accent)' }),
  ].join(''),
);

// 4. Reverse osmosis for desalination.
export const RO = svgDoc(
  360,
  208,
  'Reverse osmosis: a tank divided by a semipermeable membrane. On the left, sea water containing salt particles is pushed by a piston with a pressure larger than its osmotic pressure. Water molecules are forced through the membrane into the right side, which collects pure water.',
  [
    water(62, 50, 116, 110),
    water(182, 50, 136, 110),
    S.rect(20, 40, 300, 130, { sw: 2 }),
    S.rect(46, 42, 14, 126, { fill: 'var(--diagram-muted)', sw: 1 }),
    S.line(10, 105, 46, 105, { w: 3 }),
    S.line(180, 42, 180, 168, { c: 'var(--diagram-accent)', w: 3, dash: '4 3' }),
    ...[[80, 70], [110, 92], [140, 64], [96, 130], [128, 146], [156, 118], [74, 110]].map(([x, y]) => sq(x, y)),
    ...[[204, 76], [240, 100], [276, 70], [220, 136], [266, 140]].map(([x, y]) => dot(x, y)),
    ...[[88, 84], [120, 118], [150, 90]].map(([x, y]) => dot(x, y)),
    S.arrow(150, 105, 210, 105, { c: 'var(--diagram-accent)', w: 2 }),
    S.arrow(12, 86, 44, 86, { c: 'var(--diagram-accent)', w: 2 }),
    lab(10, 30, 'Pressure greater than the osmotic pressure', { c: 'var(--diagram-accent)' }),
    lab(110, 186, 'Sea water', { a: 'middle' }),
    lab(110, 199, '(squares = salt)', { a: 'middle', size: 10 }),
    lab(250, 186, 'Pure water', { a: 'middle' }),
    lab(250, 199, 'collected', { a: 'middle', size: 10 }),
    lab(184, 56, 'Membrane', { size: 10 }),
  ].join(''),
);
