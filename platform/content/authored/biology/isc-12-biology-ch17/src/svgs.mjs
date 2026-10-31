// SVG diagrams for ISC 12 Biology ch17 Ecosystem. ENERGY and PYRAMIDS are adapted from cbse-12-biology-ch12/src/svgs.mjs
// (same author; ISC model values); POND (pond ecosystem) and DECAY (litter decomposition, computed) are new for ISC.
import { svgDoc, S } from '../../isc-12-biology-ch01/src/lib.mjs';
import { tenPercent, litterLeft, K_DECAY } from './calc.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });

// 1. Energy flow through trophic levels with heat loss (10 percent law)
export const E = tenPercent(20000, 4);
const LV = [['Producers', 'var(--diagram-green)'], ['Primary consumers', 'var(--diagram-yellow)'], ['Secondary consumers', 'var(--diagram-blue)'], ['Tertiary consumers', 'var(--diagram-red)']];
export const ENERGY = svgDoc(
  460,
  250,
  `Energy flow through four trophic levels, shown as boxes from producers to tertiary consumers. Arrows between levels carry about 10 percent of the energy upward: ${E.map((e) => `${e} J`).join(', ')}. At every level most of the energy is lost as heat in respiration, shown by wavy arrows, so energy flow is unidirectional and the number of trophic levels is limited`,
  [
    ...LV.map(([name, c], i) => {
      const x = 20 + i * 110;
      const y = 150 - i * 34;
      return S.rect(x, y, 96, 52, { rx: 6, fill: c, fop: 0.25, sw: 1.2 }) +
        S.text(x + 48, y + 20, name.split(' ')[0], { a: 'middle', size: 10, w: 'bold' }) +
        (name.includes(' ') ? S.text(x + 48, y + 32, name.split(' ')[1], { a: 'middle', size: 10, w: 'bold' }) : '') +
        S.text(x + 48, y + 46, `${E[i]} J`, { a: 'middle', size: 10 }) +
        S.path(`M${x + 48} ${y} q -6 -8 0 -16 q 6 -8 0 -16`, { c: 'var(--diagram-red)', w: 1.5 }) +
        S.text(x + 56, y - 22, 'heat', { size: 10, c: 'var(--diagram-red)' });
    }),
    ...[0, 1, 2].map((i) => S.arrow(116 + i * 110, 176 - i * 34, 128 + i * 110, 176 - (i + 1) * 34, { size: 6 })),
    S.arrow(20, 236, 60, 236, { c: 'var(--diagram-yellow)', w: 2 }),
    lab(66, 240, 'Sunlight: plants capture only 2–10 percent of PAR', { size: 10 }),
    lab(446, 236, 'About 10 percent passes on', { size: 10, a: 'end', c: 'var(--diagram-muted)' }),
  ].join(''),
);

// 2. Three ecological pyramids
const pyr = (cx, title, rows, unit) => {
  const h = 26;
  return rows.map(([, w, val], i) => {
    const y = 190 - (i + 1) * h;
    return S.rect(cx - w / 2, y, w, h - 2, { fill: LV[i][1], fop: 0.3, sw: 1 }) + S.text(cx, y + 16, `${val}`, { a: 'middle', size: 10 });
  }).join('') + S.text(cx, 212, title, { a: 'middle', size: 11, w: 'bold' }) + S.text(cx, 226, unit, { a: 'middle', size: 10, c: 'var(--diagram-muted)' });
};
export const PYR = {
  number: [['Grass', 130, '1 500 000'], ['Insects', 90, '150 000'], ['Frogs', 50, '15 000'], ['Snakes', 18, '15']],
  biomassSea: [['Phytoplankton', 34, '4'], ['Zooplankton', 120, '21']],
  energy: E.map((e, i) => [LV[i][0], 130 - i * 36, `${e}`]),
};
export const PYRAMIDS = svgDoc(
  460,
  240,
  `Three ecological pyramids. Left: an upright pyramid of numbers in a grassland, with very many grass plants at the base and very few top carnivores. Middle: an inverted pyramid of biomass in the sea, where the standing crop of phytoplankton (${PYR.biomassSea[0][2]} g per square metre) is smaller than that of zooplankton (${PYR.biomassSea[1][2]} g per square metre). Right: a pyramid of energy, which is always upright because energy is lost as heat at every level`,
  [
    pyr(80, 'Numbers (grassland)', PYR.number, 'individuals per area'),
    pyr(230, 'Biomass (sea)', PYR.biomassSea, 'g per square metre'),
    pyr(380, 'Energy', PYR.energy, 'J'),
    lab(230, 24, 'Producers at the base; top consumers at the apex', { size: 10, a: 'middle', c: 'var(--diagram-muted)' }),
    lab(230, 100, 'Inverted', { size: 10, a: 'middle', c: 'var(--diagram-red)' }),
    lab(380, 70, 'Always upright', { size: 10, a: 'middle', c: 'var(--diagram-green)' }),
  ].join(''),
);

// ---------------------------------------------------------------- new for ISC ch17
// 3. Pond ecosystem
export const POND = svgDoc(
  460,
  250,
  'A pond ecosystem: abiotic components are water, dissolved inorganic and organic substances and the soil deposit at the bottom, with sunlight and temperature; producers are phytoplankton, algae and floating, submerged and marginal plants; consumers are zooplankton and free-swimming and bottom-dwelling animals; decomposers such as bacteria and fungi at the bottom break down dead matter and return minerals',
  [
    S.path('M10 70 L450 70 L410 210 C330 240 130 240 50 210 Z', { fill: 'var(--diagram-blue)', fop: 0.12, w: 1.5 }),
    S.path('M50 210 C130 240 330 240 410 210', { w: 6, c: 'var(--diagram-brown)', op: 0.5 }),
    S.circle(420, 26, 14, { fill: 'var(--diagram-yellow)', fop: 0.7, sw: 1 }), lab(380, 30, 'Sunlight', { size: 10, a: 'end' }),
    ...[[80, 90], [130, 100], [180, 88], [240, 96], [300, 92]].map(([x, y]) => S.circle(x, y, 3, { fill: 'var(--diagram-green)', fop: 0.9, sw: 0 })),
    lab(70, 112, 'Phytoplankton (producers)', { size: 10, c: 'var(--diagram-green)' }),
    S.path('M60 210 L60 50 M60 80 C50 70 48 62 50 54', { w: 2, c: 'var(--diagram-green)' }), lab(66, 52, 'Marginal plant', { size: 10 }),
    S.path('M360 205 C356 180 366 160 360 130 M360 160 C372 154 376 148 378 140', { w: 2, c: 'var(--diagram-green)' }), lab(300, 128, 'Submerged plant', { size: 10 }),
    S.ellipse(250, 70, 26, 5, { fill: 'var(--diagram-green)', fop: 0.6, sw: 1 }), lab(232, 60, 'Floating plant', { size: 10 }),
    ...[[150, 140], [170, 150], [210, 136]].map(([x, y]) => S.circle(x, y, 2.5, { fill: 'var(--diagram-red)', fop: 0.8, sw: 0 })),
    lab(140, 166, 'Zooplankton (consumers)', { size: 10, c: 'var(--diagram-red)' }),
    S.path('M250 180 q14 -10 28 0 q-14 10 -28 0 Z M278 180 l8 -6 l0 12 Z', { fill: 'var(--diagram-red)', fop: 0.4, w: 1 }), lab(292, 184, 'Fish', { size: 10 }),
    lab(120, 246, 'Bottom sediment: decomposers (bacteria, fungi) release minerals', { size: 10, c: 'var(--diagram-brown)' }),
    lab(96, 198, 'Water with dissolved substances', { size: 10 }),
  ].join(''),
);

// 4. Decomposition of leaf litter (computed: exponential loss of mass)
const DX = (m) => 60 + m * 30;
const DY = (pct) => 190 - pct * 1.5;
const curvePts = (k) => Array.from({ length: 49 }, (_, i) => i / 4).map((m) => [DX(m), DY(litterLeft(100, k, m))]);
const toPath = (pts) => 'M' + pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(' L');
export const DECAY = svgDoc(
  460,
  240,
  `Mass of leaf litter remaining over 12 months: in a warm, moist tropical forest the litter decomposes quickly (about ${Math.round(litterLeft(100, K_DECAY.warm, 12))} percent left after a year), while in a cold, dry habitat it decomposes slowly (about ${Math.round(litterLeft(100, K_DECAY.cold, 12))} percent left), because warmth and moisture favour decomposers`,
  [
    S.line(60, 190, 440, 190, { w: 1.5 }), S.line(60, 190, 60, 30, { w: 1.5 }),
    ...[0, 25, 50, 75, 100].map((p) => S.text(54, DY(p) + 4, String(p), { a: 'end', size: 10 }) + S.line(60, DY(p), 440, DY(p), { w: 0.5, c: 'var(--diagram-muted)', dash: '2 4' })),
    ...[0, 3, 6, 9, 12].map((m) => S.text(DX(m), 205, String(m), { a: 'middle', size: 10 })),
    S.path(toPath(curvePts(K_DECAY.warm)), { w: 2.5, c: 'var(--diagram-green)' }),
    S.path(toPath(curvePts(K_DECAY.cold)), { w: 2.5, c: 'var(--diagram-blue)', dash: '5 3' }),
    lab(300, DY(litterLeft(100, K_DECAY.warm, 8)) - 8, 'Warm, moist', { size: 10, c: 'var(--diagram-green)' }),
    lab(300, DY(litterLeft(100, K_DECAY.cold, 8)) - 8, 'Cold, dry', { size: 10, c: 'var(--diagram-blue)' }),
    S.text(250, 230, 'Months', { a: 'middle', size: 11 }),
    S.text(66, 24, 'Litter remaining (percent)', { size: 11 }),
  ].join(''),
);

export const ALL = { ENERGY, PYRAMIDS, POND, DECAY };
