// SVG diagrams for ISC 12 Biology ch10. SELECTION and HWSQ are copied from cbse-12-biology-ch06/src/svgs.mjs (same author);
// REPLICA (Lederberg replica plating), BOTTLENECK (genetic drift, frequencies computed) and HOMININ (brain capacity of six
// hominids) are new for ISC.
import { svgDoc, S } from '../../isc-12-biology-ch01/src/lib.mjs';
import { hwFromP, curve, pct } from './calc.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const f1 = (n) => (Math.round(n * 10) / 10).toString();

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

// ---------------------------------------------------------------- new for ISC ch10
// 5. Lederberg replica plating: resistant colonies are already present before exposure to penicillin
export const COLONIES = [[40, 40, false], [70, 30, true], [95, 55, false], [55, 70, false], [85, 85, true], [30, 95, false], [65, 110, false], [100, 105, false]];
const plate = (cx, cy, title) =>
  S.circle(cx, cy, 62, { fill: 'var(--diagram-fill)', sw: 1.5 }) +
  COLONIES.map(([x, y, res]) => S.circle(cx - 65 + x, cy - 70 + y, 7, { fill: res ? 'var(--diagram-red)' : 'var(--diagram-green)', fop: 0.7, sw: 1 })).join('') +
  S.text(cx, cy + 82, title, { a: 'middle', size: 10, w: 'bold' });
export const RESISTANT = COLONIES.filter(([, , res]) => res).length;
export const REPLICA = svgDoc(
  460,
  230,
  `Lederberg’s replica plating: colonies on a master plate without penicillin are pressed onto sterile velvet and transferred, in the same positions, to a plate without penicillin and a plate with penicillin. Only ${RESISTANT} colonies grow on the penicillin plate, at the same positions as colonies already on the master plate, showing that the resistant bacteria existed before they met penicillin; penicillin only selected them`,
  [
    plate(75, 90, 'Master plate (no penicillin)'),
    S.rect(165, 70, 50, 30, { rx: 4, fill: 'var(--diagram-brown)', fop: 0.3, sw: 1 }), S.text(190, 62, 'Velvet', { a: 'middle', size: 10 }),
    S.arrow(140, 85, 162, 85, { w: 1.5 }),
    S.arrow(218, 78, 262, 52, { w: 1.5 }), S.arrow(218, 92, 262, 140, { w: 1.5 }),
    S.circle(300, 50, 34, { fill: 'var(--diagram-fill)', sw: 1.2 }),
    ...COLONIES.map(([x, y]) => S.circle(300 - 34 + x * 0.52, 50 - 38 + y * 0.52, 4, { fill: 'var(--diagram-green)', fop: 0.7, sw: 0.8 })),
    lab(340, 46, 'No penicillin:', { size: 10 }), lab(340, 60, 'all colonies grow', { size: 10 }),
    S.circle(300, 150, 34, { fill: 'var(--diagram-yellow)', fop: 0.2, sw: 1.2 }),
    ...COLONIES.filter(([, , res]) => res).map(([x, y]) => S.circle(300 - 34 + x * 0.52, 150 - 38 + y * 0.52, 4, { fill: 'var(--diagram-red)', fop: 0.8, sw: 0.8 })),
    lab(340, 146, 'With penicillin:', { size: 10 }), lab(340, 160, `only ${RESISTANT} resistant colonies`, { size: 10, c: 'var(--diagram-red)' }),
    S.text(230, 222, 'Resistant colonies (red) were already on the master plate before exposure', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }),
  ].join(''),
);

// 6. Genetic drift: bottleneck (allele counts computed)
export const BEFORE = { A: 12, a: 8 };
export const SURVIVORS = { A: 1, a: 4 };
const nS = SURVIVORS.A + SURVIVORS.a;
export const AFTER = { A: (SURVIVORS.A / nS) * 20, a: (SURVIVORS.a / nS) * 20 };
const beads = (x0, y0, counts, cols) => {
  const list = [...Array(counts.A).fill('A'), ...Array(counts.a).fill('a')];
  return list.map((g, i) => S.circle(x0 + (i % cols) * 16, y0 + Math.floor(i / cols) * 16, 6, { fill: g === 'A' ? 'var(--diagram-blue)' : 'var(--diagram-yellow)', fop: 0.8, sw: 0.8 })).join('');
};
export const BOTTLENECK = svgDoc(
  460,
  210,
  `Genetic drift by the bottleneck effect: a population with ${pct(BEFORE.A, 20)} percent allele A and ${pct(BEFORE.a, 20)} percent allele a is reduced by chance to ${nS} survivors with ${pct(SURVIVORS.A, nS)} percent A; the population that grows from them keeps that changed frequency, ${pct(AFTER.A, 20)} percent A, although selection played no part`,
  [
    S.text(70, 22, 'Original population', { a: 'middle', size: 11, w: 'bold' }),
    beads(38, 44, BEFORE, 5),
    S.text(70, 130, `A ${pct(BEFORE.A, 20)}% · a ${pct(BEFORE.a, 20)}%`, { a: 'middle', size: 10 }),
    S.path('M150 40 L200 80 L200 110 L150 150', { w: 1.5 }), S.path('M290 40 L240 80 L240 110 L290 150', { w: 1.5 }),
    S.text(220, 22, 'Bottleneck (by chance)', { a: 'middle', size: 11, w: 'bold' }),
    beads(204, 88, SURVIVORS, 3),
    S.text(220, 170, `${nS} survivors: A ${pct(SURVIVORS.A, nS)}%`, { a: 'middle', size: 10 }),
    S.text(370, 22, 'New population', { a: 'middle', size: 11, w: 'bold' }),
    beads(338, 44, AFTER, 5),
    S.text(370, 130, `A ${pct(AFTER.A, 20)}% · a ${pct(AFTER.a, 20)}%`, { a: 'middle', size: 10 }),
    S.circle(40, 196, 6, { fill: 'var(--diagram-blue)', fop: 0.8, sw: 0.8 }), lab(52, 200, 'allele A', { size: 10 }),
    S.circle(120, 196, 6, { fill: 'var(--diagram-yellow)', fop: 0.8, sw: 0.8 }), lab(132, 200, 'allele a', { size: 10 }),
  ].join(''),
);

// 7. Brain capacity of hominids (approximate textbook values, cc)
export const HOMININS = [['Australopithecus', 450, 600], ['Homo habilis', 650, 800], ['Homo erectus', 900, 900], ['Neanderthal man', 1400, 1400], ['Cro-Magnon man', 1650, 1650], ['Modern man', 1350, 1450]];
export const HOMININ = svgDoc(
  460,
  230,
  'Bar chart of approximate brain capacity in cubic centimetres: Australopithecus 450 to 600, Homo habilis 650 to 800, Homo erectus about 900, Neanderthal man about 1400, Cro-Magnon man about 1650 and modern man 1350 to 1450',
  [
    S.line(70, 20, 70, 180, { w: 1 }), S.line(70, 180, 450, 180, { w: 1 }),
    ...[0, 500, 1000, 1500].map((v) => S.text(66, 184 - v * 0.09, String(v), { a: 'end', size: 10 }) + S.line(70, 180 - v * 0.09, 450, 180 - v * 0.09, { w: 0.5, c: 'var(--diagram-muted)', dash: '2 4' })),
    ...HOMININS.map(([n, lo, hi], i) => {
      const x = 82 + i * 62;
      const [w1, w2] = n.split(' ');
      return S.rect(x, 180 - hi * 0.09, 40, hi * 0.09, { fill: 'var(--diagram-accent)', fop: 0.35, sw: 1 }) + (lo !== hi ? S.line(x, 180 - lo * 0.09, x + 40, 180 - lo * 0.09, { w: 1, dash: '3 2' }) : '') +
        S.text(x + 20, 196, w1, { a: 'middle', size: 10 }) + (w2 ? S.text(x + 20, 209, w2, { a: 'middle', size: 10 }) : '') + S.text(x + 20, 174 - hi * 0.09, lo === hi ? `≈ ${hi}` : `${lo}–${hi}`, { a: 'middle', size: 10 });
    }),
    S.text(20, 226, 'Brain capacity (cc), approximate', { size: 10 }),
  ].join(''),
);

export const ALL = { SELECTION, HWSQ, REPLICA, BOTTLENECK, HOMININ };
