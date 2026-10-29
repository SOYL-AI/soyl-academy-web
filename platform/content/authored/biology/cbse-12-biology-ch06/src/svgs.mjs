// SVG diagrams for ch06 Evolution (allow-listed elements, palette colours only). Curves and areas are computed.
import { svgDoc, S } from '../../cbse-12-biology-ch01/src/lib.mjs';
import { hwFromP, curve } from './calc.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const f1 = (n) => (Math.round(n * 10) / 10).toString();

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

// 3. Three types of natural selection (computed curves)
const panel = (x0, title, before, after) => {
  const sx = (x) => x0 + (x / 100) * 120;
  const sy = (y) => 150 - y * 100;
  const path = (pts) => pts.map(([x, y], i) => `${i ? 'L' : 'M'}${f1(sx(x))} ${f1(sy(y))}`).join(' ');
  return [
    S.line(x0, 150, x0 + 120, 150, { w: 1 }),
    S.text(x0 + 60, 28, title, { a: 'middle', size: 11, w: 'bold' }),
    S.path(path(before), { w: 1.5, dash: '4 3', c: 'var(--diagram-muted)' }),
    S.path(path(after), { w: 2.5, c: 'var(--diagram-accent)' }),
    S.text(x0 + 60, 168, 'Phenotype →', { a: 'middle', size: 10 }),
  ].join('');
};
const BASE = curve(50, 14, 0, 100);
const disruptive = BASE.map(([x], i) => [x, Math.max(curve(25, 10, 0, 100)[i][1], curve(75, 10, 0, 100)[i][1])]);
export const SELECTION = svgDoc(
  460,
  210,
  'Three types of natural selection shown as frequency curves of a phenotype. Stabilising: the curve becomes narrower and taller around the mean. Directional: the whole curve shifts towards one extreme. Disruptive: the middle falls and two peaks form at both extremes. A dashed curve shows the population before selection in each panel',
  [
    panel(20, 'Stabilising', BASE, curve(50, 7, 0, 100)),
    panel(170, 'Directional', BASE, curve(68, 14, 0, 100)),
    panel(320, 'Disruptive', BASE, disruptive),
    S.line(20, 190, 44, 190, { w: 1.5, dash: '4 3', c: 'var(--diagram-muted)' }),
    lab(50, 194, 'Before selection', { size: 10 }),
    S.line(170, 190, 194, 190, { w: 2.5, c: 'var(--diagram-accent)' }),
    lab(200, 194, 'After selection', { size: 10 }),
  ].join(''),
);

// 4. Hardy–Weinberg square (areas computed from p = 0.7)
const HW = hwFromP(0.7);
const SZ = 180;
export const HWSQ = svgDoc(
  440,
  240,
  `Hardy–Weinberg square for allele frequencies p = ${HW.p} and q = ${HW.q}: random union of gametes gives AA = p squared = ${HW.AA}, Aa = 2pq = ${HW.Aa} and aa = q squared = ${HW.aa}; the areas of the boxes are proportional to these frequencies`,
  [
    S.text(60 + (SZ * HW.p) / 2, 30, `A (p = ${HW.p})`, { a: 'middle', size: 11 }),
    S.text(60 + SZ * HW.p + (SZ * HW.q) / 2, 30, `a (q = ${HW.q})`, { a: 'middle', size: 11 }),
    S.text(52, 40 + (SZ * HW.p) / 2, 'A', { a: 'end', size: 11 }),
    S.text(52, 40 + SZ * HW.p + (SZ * HW.q) / 2, 'a', { a: 'end', size: 11 }),
    S.rect(60, 40, SZ * HW.p, SZ * HW.p, { fill: 'var(--diagram-green)', fop: 0.35, sw: 1 }),
    S.rect(60 + SZ * HW.p, 40, SZ * HW.q, SZ * HW.p, { fill: 'var(--diagram-yellow)', fop: 0.35, sw: 1 }),
    S.rect(60, 40 + SZ * HW.p, SZ * HW.p, SZ * HW.q, { fill: 'var(--diagram-yellow)', fop: 0.35, sw: 1 }),
    S.rect(60 + SZ * HW.p, 40 + SZ * HW.p, SZ * HW.q, SZ * HW.q, { fill: 'var(--diagram-red)', fop: 0.3, sw: 1 }),
    S.text(60 + (SZ * HW.p) / 2, 44 + (SZ * HW.p) / 2, `AA = ${HW.AA}`, { a: 'middle', size: 11 }),
    S.text(60 + SZ * HW.p + (SZ * HW.q) / 2, 44 + (SZ * HW.p) / 2, 'Aa', { a: 'middle', size: 11 }),
    S.text(60 + (SZ * HW.p) / 2, 44 + SZ * HW.p + (SZ * HW.q) / 2, 'Aa', { a: 'middle', size: 11 }),
    S.text(60 + SZ * HW.p + (SZ * HW.q) / 2, 44 + SZ * HW.p + (SZ * HW.q) / 2, `aa`, { a: 'middle', size: 11 }),
    lab(270, 80, `p² (AA) = ${HW.AA}`),
    lab(270, 104, `2pq (Aa) = ${HW.Aa}`),
    lab(270, 128, `q² (aa) = ${HW.aa}`),
    lab(270, 160, `Total = ${HW.AA} + ${HW.Aa} + ${HW.aa} = 1`, { w: 'bold' }),
  ].join(''),
);

// 5. Brain capacity of hominins (bar chart from approximate textbook values)
export const BRAINS = [['Homo habilis', 650, 800], ['Homo erectus', 900, 900], ['Neanderthal man', 1400, 1400]];
export const BRAIN = svgDoc(
  440,
  210,
  'Bar chart of approximate brain capacity: Homo habilis 650 to 800 cubic centimetres, Homo erectus about 900, Neanderthal man about 1400',
  [
    S.line(120, 30, 120, 180, { w: 1 }),
    S.line(120, 180, 420, 180, { w: 1 }),
    ...[0, 500, 1000, 1500].map((v) => S.text(116, 184 - v * 0.1, String(v), { a: 'end', size: 10 }) + S.line(120, 180 - v * 0.1, 420, 180 - v * 0.1, { w: 0.5, c: 'var(--diagram-muted)', dash: '2 4' })),
    ...BRAINS.map(([n, lo, hi], i) => {
      const x = 150 + i * 90;
      return S.rect(x, 180 - hi * 0.1, 50, hi * 0.1, { fill: 'var(--diagram-accent)', fop: 0.35, sw: 1 }) + (lo !== hi ? S.line(x, 180 - lo * 0.1, x + 50, 180 - lo * 0.1, { w: 1, dash: '3 2' }) : '') + S.text(x + 25, 196, n, { a: 'middle', size: 10 }) + S.text(x + 25, 174 - hi * 0.1, lo === hi ? `≈ ${hi}` : `${lo}–${hi}`, { a: 'middle', size: 10 });
    }),
    S.text(20, 100, 'Brain capacity (cc)', { size: 10 }),
  ].join(''),
);

export const ALL = { MILLER, LIMBS_SVG, SELECTION, HWSQ, BRAIN };
