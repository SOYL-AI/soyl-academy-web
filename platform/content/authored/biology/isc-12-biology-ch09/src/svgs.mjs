// SVG diagrams for ISC 12 Biology ch09. MILLER and LIMBS_SVG are copied from cbse-12-biology-ch06/src/svgs.mjs (same author);
// RADIOCARBON (decay curve computed from calc.mjs) and RADIATION (Darwin's finches) are new for ISC.
import { svgDoc, S } from '../../isc-12-biology-ch01/src/lib.mjs';
import { remaining, HALF_LIFE } from './calc.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });

// 1. Miller's experiment (schematic)
export const MILLER = svgDoc(
  460,
  250,
  'Miller’s experiment, schematic: water boiled in a flask sends vapour into a large flask containing methane, ammonia and hydrogen, where electrodes produce sparks; a condenser cools the gases, and the liquid that collects in a trap is found to contain amino acids',
  [
    S.circle(80, 190, 34, { fill: 'var(--diagram-blue)', fop: 0.2, sw: 1.5 }),
    S.path('M60 226 L100 226', { w: 2 }),
    ...[64, 80, 96].map((x) => S.path(`M${x} 244 C${x - 4} 236 ${x + 4} 232 ${x} 226`, { w: 1.5, c: 'var(--diagram-red)' })),
    S.path('M80 156 L80 70 L190 70', { w: 4, c: 'var(--diagram-muted)' }),
    S.circle(240, 80, 50, { fill: 'var(--diagram-yellow)', fop: 0.15, sw: 1.5 }),
    S.line(220, 30, 228, 70, { w: 2 }), S.line(260, 30, 252, 70, { w: 2 }),
    S.path('M230 76 L236 82 L232 86 L240 92 L246 86 L250 80', { w: 1.5, c: 'var(--diagram-accent)' }),
    S.path('M290 80 L360 80 L360 170', { w: 4, c: 'var(--diagram-muted)' }),
    S.rect(348, 100, 24, 60, { fill: 'var(--diagram-blue)', fop: 0.15, sw: 1.2 }),
    S.path('M360 170 C360 200 330 210 300 206 L120 206', { w: 4, c: 'var(--diagram-muted)' }),
    S.path('M200 206 L200 230 C200 240 216 240 216 230 L216 206', { fill: 'var(--diagram-brown)', fop: 0.3, w: 1.2 }),
    lab(4, 150, 'Boiling water'),
    lab(4, 163, '(vapour)'),
    S.lead(40, 158, 52, 176),
    lab(300, 24, 'Electrodes: sparks'),
    S.lead(298, 28, 262, 40),
    lab(150, 140, 'CH₄, NH₃, H₂, water vapour', { size: 10 }),
    S.lead(190, 130, 226, 108),
    lab(380, 120, 'Condenser'),
    S.lead(378, 124, 372, 130),
    lab(226, 246, 'Trap: liquid with amino acids'),
    S.lead(240, 238, 216, 230),
  ].join(''),
);

// 2. Homologous forelimbs as bone blocks (proportions schematic)
const LIMBS = [
  ['Human|grasping', [30, 26, 8, 14, 20]],
  ['Cheetah|running', [28, 30, 6, 18, 10]],
  ['Whale|swimming', [12, 10, 8, 16, 40]],
  ['Bat|flying', [26, 30, 4, 46, 34]],
];
const BONES = [['Humerus', 'var(--diagram-blue)'], ['Radius and ulna', 'var(--diagram-green)'], ['Carpals', 'var(--diagram-yellow)'], ['Metacarpals', 'var(--diagram-brown)'], ['Phalanges', 'var(--diagram-red)']];
export const LIMBS_SVG = svgDoc(
  460,
  230,
  'Forelimbs of a human, a cheetah, a whale and a bat drawn as blocks of the same five bone groups in the same order — humerus, radius and ulna, carpals, metacarpals, phalanges — but with different proportions suited to grasping, running, swimming and flying; they are homologous organs',
  [
    ...LIMBS.map(([name, lens], i) => {
      const x = 40 + i * 80;
      let y = 20;
      const blocks = lens.map((len, k) => {
        const b = S.rect(x - 14, y, 28, len * 1.2, { fill: BONES[k][1], fop: 0.35, sw: 1 });
        y += len * 1.2;
        return b;
      });
      const [a, b] = name.split('|');
      return blocks.join('') + S.text(x, 208, a, { a: 'middle', size: 10, w: 'bold' }) + S.text(x, 221, b, { a: 'middle', size: 10 });
    }),
    ...BONES.map(([b, c], k) => S.rect(330, 40 + k * 22, 12, 12, { fill: c, fop: 0.35, sw: 1 }) + S.text(348, 50 + k * 22, b, { size: 10 })),
  ].join(''),
);

// ---------------------------------------------------------------- new for ISC ch09
// 3. Radiocarbon decay (computed)
const T_MAX = 4 * HALF_LIFE;
const px = (t) => 60 + (t / T_MAX) * 360;
const py = (f) => 190 - f * 150;
const PTS = Array.from({ length: 41 }, (_, i) => (i / 40) * T_MAX).map((t) => [px(t), py(remaining(t))]);
export const RADIOCARBON = svgDoc(
  460,
  240,
  `Radioactive decay of carbon-14 in a dead organism: the fraction of carbon-14 left halves every ${HALF_LIFE} years, falling to one half after one half-life, one quarter after two and one eighth after three, so the fraction left gives the age of a fossil`,
  [
    S.line(60, 190, 425, 190, { w: 1.5 }), S.line(60, 190, 60, 30, { w: 1.5 }),
    S.path('M' + PTS.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(' L'), { w: 2.5, c: 'var(--diagram-accent)' }),
    ...[1, 2, 3].map((n) => {
      const t = n * HALF_LIFE, f = remaining(t);
      return S.line(px(t), 190, px(t), py(f), { w: 1, dash: '4 3', c: 'var(--diagram-muted)' }) + S.line(60, py(f), px(t), py(f), { w: 1, dash: '4 3', c: 'var(--diagram-muted)' }) +
        S.circle(px(t), py(f), 3.5, { fill: 'var(--diagram-red)', sw: 0 }) + S.text(px(t), 205, String(t), { a: 'middle', size: 10 }) + S.text(54, py(f) + 4, ['½', '¼', '⅛'][n - 1], { a: 'end', size: 11 });
    }),
    S.text(54, py(1) + 4, '1', { a: 'end', size: 11 }),
    S.text(60, 205, '0', { a: 'middle', size: 10 }),
    S.text(240, 228, 'Time since death (years)', { a: 'middle', size: 11 }),
    S.text(70, 22, 'Fraction of carbon-14 left', { size: 11 }),
    lab(250, 70, `Half-life of carbon-14 = ${HALF_LIFE} years`, { size: 10, c: 'var(--diagram-accent)' }),
  ].join(''),
);

// 4. Adaptive radiation of Darwin's finches
const FINCH = [
  ['Ground finch', 'seeds', 22, 18],
  ['Cactus finch', 'cactus flowers', 30, 10],
  ['Warbler finch', 'insects', 26, 6],
  ['Woodpecker finch', 'grubs in bark', 28, 9],
  ['Tree finch', 'buds and fruits', 16, 14],
];
export const RADIATION = svgDoc(
  460,
  240,
  'Adaptive radiation of Darwin’s finches on the Galapagos Islands: from one ancestral seed-eating finch that reached the islands, several species evolved with beaks suited to different foods — a large crushing beak for seeds, a long beak for cactus flowers, a thin beak for insects, a woodpecker-like beak with a cactus spine tool for grubs in bark, and a short parrot-like beak for buds and fruits',
  [
    ...FINCH.map(([name, food, len, depth], i) => {
      const cx = 48 + i * 91, y = 54;
      return S.rect(cx - 43, 20, 86, 92, { rx: 6, fill: 'var(--diagram-green)', fop: 0.12, sw: 1 }) +
        S.circle(cx - 12, y, 12, { fill: 'var(--diagram-brown)', fop: 0.35, sw: 1 }) +
        S.path(`M${cx} ${y - depth / 2} L${cx + len} ${y} L${cx} ${y + depth / 2} Z`, { fill: 'var(--diagram-yellow)', fop: 0.8, w: 1 }) +
        S.text(cx, 84, name, { a: 'middle', size: 10, w: 'bold' }) + S.text(cx, 100, food, { a: 'middle', size: 10 }) +
        S.line(cx, 112, 230, 178, { w: 1.2, c: 'var(--diagram-muted)' });
    }),
    S.rect(130, 178, 200, 34, { rx: 8, fill: 'var(--diagram-yellow)', fop: 0.25, sw: 1.2 }),
    S.text(230, 193, 'Ancestral seed-eating finch', { a: 'middle', size: 11, w: 'bold' }),
    S.text(230, 207, '(from the mainland)', { a: 'middle', size: 10 }),
    S.text(230, 232, 'Different foods on the islands → different beaks', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }),
  ].join(''),
);

export const ALL = { MILLER, LIMBS_SVG, RADIOCARBON, RADIATION };
