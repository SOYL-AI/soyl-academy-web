// SVG diagrams for ch12 Ecosystem (allow-listed elements, palette colours only).
import { svgDoc, S } from '../../cbse-12-biology-ch01/src/lib.mjs';
import { tenPercent } from './calc.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });

// 1. Energy flow through trophic levels with heat loss (10 percent law)
export const E = tenPercent(10000, 4);
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
  return rows.map(([name, w, val], i) => {
    const y = 190 - (i + 1) * h;
    return S.rect(cx - w / 2, y, w, h - 2, { fill: LV[i][1], fop: 0.3, sw: 1 }) + S.text(cx, y + 16, `${val}`, { a: 'middle', size: 10 });
  }).join('') + S.text(cx, 212, title, { a: 'middle', size: 11, w: 'bold' }) + S.text(cx, 226, unit, { a: 'middle', size: 10, c: 'var(--diagram-muted)' });
};
export const PYR = {
  number: [['Grass', 130, '2 000 000'], ['Insects', 90, '200 000'], ['Frogs', 50, '20 000'], ['Snakes', 18, '20']],
  biomassSea: [['Phytoplankton', 34, '5'], ['Zooplankton', 120, '22']],
  energy: E.map((e, i) => [LV[i][0], 130 - i * 36, `${e}`]),
};
export const PYRAMIDS = svgDoc(
  460,
  240,
  'Three ecological pyramids. Left: an upright pyramid of numbers in a grassland, with very many grass plants at the base and very few top carnivores. Middle: an inverted pyramid of biomass in the sea, where the standing crop of phytoplankton (5 g per square metre) is smaller than that of zooplankton (22 g per square metre). Right: a pyramid of energy, which is always upright because energy is lost as heat at every level',
  [
    pyr(80, 'Numbers (grassland)', PYR.number, 'individuals per area'),
    pyr(230, 'Biomass (sea)', PYR.biomassSea, 'g per square metre'),
    pyr(380, 'Energy', PYR.energy, 'J'),
    lab(230, 24, 'Producers at the base; top consumers at the apex', { size: 10, a: 'middle', c: 'var(--diagram-muted)' }),
    lab(230, 100, 'Inverted', { size: 10, a: 'middle', c: 'var(--diagram-red)' }),
    lab(380, 70, 'Always upright', { size: 10, a: 'middle', c: 'var(--diagram-green)' }),
  ].join(''),
);

// 3. Vertical stratification in a forest
const tree = (x, h, c) => S.line(x, 220, x, 220 - h + h * 0.22, { c: 'var(--diagram-brown)', w: 4 }) + S.circle(x, 220 - h, h * 0.22, { fill: c, fop: 0.35, sw: 1 });
export const STRATA = svgDoc(
  460,
  240,
  'Vertical stratification in a forest: tall trees form the top layer, shrubs the second layer, and herbs and grasses the bottom layer near the ground, so different species occupy different levels',
  [
    S.line(10, 220, 450, 220, { c: 'var(--diagram-brown)', w: 2 }),
    tree(60, 170, 'var(--diagram-green)'), tree(150, 160, 'var(--diagram-green)'), tree(250, 175, 'var(--diagram-green)'),
    tree(105, 80, 'var(--diagram-yellow)'), tree(200, 70, 'var(--diagram-yellow)'), tree(290, 85, 'var(--diagram-yellow)'),
    ...[40, 80, 125, 175, 225, 270, 310].map((x) => S.path(`M${x} 220 l 4 -18 l 4 18 l 4 -14 l 4 14`, { c: 'var(--diagram-green)', w: 1.5 })),
    S.line(330, 50, 450, 50, { c: 'var(--diagram-muted)', w: 1, dash: '4 3' }), lab(450, 44, 'Top layer: trees', { size: 10, a: 'end' }),
    S.line(330, 140, 450, 140, { c: 'var(--diagram-muted)', w: 1, dash: '4 3' }), lab(450, 134, 'Second layer: shrubs', { size: 10, a: 'end' }),
    S.line(330, 205, 450, 205, { c: 'var(--diagram-muted)', w: 1, dash: '4 3' }), lab(450, 199, 'Bottom: herbs, grasses', { size: 10, a: 'end' }),
  ].join(''),
);

export const ALL = { ENERGY, PYRAMIDS, STRATA };
