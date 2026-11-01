// SVG diagrams for ICSE 10 Biology ch06 Chemical Coordination in Plants. All new drawings.
import { svgDoc, S } from '../../icse-10-biology-ch01/src/lib.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const f = (n) => Math.round(n * 10) / 10;
const GREEN = 'var(--diagram-green)';
const BROWN = 'var(--diagram-brown)';
const YELLOW = 'var(--diagram-yellow)';
const RED = 'var(--diagram-red)';
const BLUE = 'var(--diagram-blue)';
const MUTED = 'var(--diagram-muted)';

/** Point and unit tangent on a cubic Bezier. */
function bez(p0, p1, p2, p3, t) {
  const u = 1 - t;
  const x = u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0];
  const y = u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1];
  const dx = 3 * u * u * (p1[0] - p0[0]) + 6 * u * t * (p2[0] - p1[0]) + 3 * t * t * (p3[0] - p2[0]);
  const dy = 3 * u * u * (p1[1] - p0[1]) + 6 * u * t * (p2[1] - p1[1]) + 3 * t * t * (p3[1] - p2[1]);
  const m = Math.hypot(dx, dy);
  return { x, y, tx: dx / m, ty: dy / m };
}
const leafPair = (x, y, s = 1) =>
  S.path(`M${x} ${y} Q${f(x + 14 * s)} ${f(y - 18 * s)} ${f(x + 26 * s)} ${f(y - 5 * s)} Q${f(x + 12 * s)} ${f(y + 3 * s)} ${x} ${y} Z`, { c: GREEN, fill: GREEN, fop: 0.35, w: 1.2 }) +
  S.path(`M${x} ${y} Q${f(x + 6 * s)} ${f(y + 16 * s)} ${f(x + 22 * s)} ${f(y + 12 * s)} Q${f(x + 12 * s)} ${f(y - 1 * s)} ${x} ${y} Z`, { c: GREEN, fill: GREEN, fop: 0.35, w: 1.2 });
const pot = (cx, top) => S.path(`M${cx - 26} ${top} L${cx + 26} ${top} L${cx + 19} ${top + 38} L${cx - 19} ${top + 38} Z`, { c: BROWN, fill: BROWN, fop: 0.3, w: 1.5 });

// ---------------------------------------------------------------- 1. phototropism of a shoot in a box lit from one side
export const PHOTO = (() => {
  const p = [];
  p.push(S.text(20, 22, 'Seedling in a box lit from one side', { size: 12, w: 'bold' }));
  p.push(S.path('M260 90 L260 40 L30 40 L30 250 L260 250 L260 140', { w: 2 }));
  p.push(lab(36, 58, 'Light-proof box', { c: MUTED }));
  for (const y of [100, 115, 130]) p.push(S.arrow(345, y, 272, y, { c: YELLOW, w: 2.2, size: 8 }));
  p.push(lab(290, 86, 'Light from one side'));
  p.push(pot(120, 210));
  const P0 = [120, 210], P1 = [118, 165], P2 = [124, 138], P3 = [172, 112];
  p.push(S.path(`M${P0[0]} ${P0[1]} C${P1[0]} ${P1[1]} ${P2[0]} ${P2[1]} ${P3[0]} ${P3[1]}`, { c: GREEN, w: 5, cap: 'round' }));
  p.push(leafPair(172, 112));
  for (let t = 0.3; t <= 0.92; t += 0.1) {
    const b = bez(P0, P1, P2, P3, t);
    p.push(S.circle(b.x + b.ty * 7, b.y - b.tx * 7, 2.6, { fill: RED, sw: 0 }));
  }
  p.push(lab(30, 272, 'Red dots: auxin, which moves to the shaded side of the shoot'));
  // inset: cells on the two sides of the bend
  p.push(S.rect(290, 150, 240, 112, { rx: 6, sw: 1, dash: '4 3', c: MUTED }));
  p.push(lab(300, 168, 'Inside the stem, just below the tip', { w: 'bold' }));
  for (let i = 0; i < 3; i++) p.push(S.rect(306, 178 + i * 26, 28, 26, { fill: GREEN, fop: 0.2, sw: 1 }));
  for (let i = 0; i < 3; i++) p.push(S.rect(334, 214 + i * 14, 28, 14, { fill: GREEN, fop: 0.2, sw: 1 }));
  p.push(lab(372, 196, 'Shaded side: more auxin,'), lab(372, 209, 'cells grow much longer'));
  p.push(lab(372, 236, 'Lit side: less auxin,'), lab(372, 249, 'cells grow less'));
  return svgDoc(540, 282, 'Phototropism. A seedling in a pot inside a light-proof box with an opening on one side. Its shoot bends towards the light coming through the opening. Auxin collects on the shaded side of the shoot; an inset shows that cells on the shaded side grow longer than those on the lit side, so the shoot curves towards the light', p.join(''));
})();

// ---------------------------------------------------------------- 2. coleoptile experiments on the tip
export const COLEOPTILE = (() => {
  const p = [];
  const base = 215;
  p.push(S.text(20, 22, 'Oat seedlings (coleoptiles) lit from the right', { size: 12, w: 'bold' }));
  for (const y of [70, 92, 114]) p.push(S.arrow(575, y, 530, y, { c: YELLOW, w: 2.2, size: 8 }));
  p.push(lab(520, 140, 'Light'));
  const xs = [70, 190, 310, 430];
  for (const x of xs) p.push(S.line(x - 40, base, x + 40, base, { c: BROWN, w: 2 }));
  const bend = (x) => S.path(`M${x} ${base} L${x} 140 Q${x} 105 ${x + 30} 88`, { c: GREEN, w: 10, cap: 'round' });
  const straight = (x, top) => S.path(`M${x} ${base} L${x} ${top}`, { c: GREEN, w: 10, cap: 'round' });
  // 1 intact
  p.push(bend(xs[0]));
  // 2 tip cut off
  p.push(straight(xs[1], 150));
  p.push(S.line(xs[1] - 10, 144, xs[1] + 10, 144, { w: 1.5 }));
  p.push(S.path(`M${xs[1] + 22} 120 L${xs[1] + 22} 104 Q${xs[1] + 27} 96 ${xs[1] + 32} 104 L${xs[1] + 32} 120 Z`, { c: GREEN, dash: '3 2', w: 1.2 }));
  p.push(lab(xs[1] + 38, 112, 'tip', { c: MUTED }));
  // 3 opaque cap over the tip
  p.push(straight(xs[2], 100));
  p.push(S.path(`M${xs[2] - 9} 122 L${xs[2] - 9} 98 Q${xs[2]} 84 ${xs[2] + 9} 98 L${xs[2] + 9} 122 Z`, { fill: 'currentColor', sw: 0 }));
  // 4 opaque collar below the tip
  p.push(bend(xs[3]));
  p.push(S.rect(xs[3] - 9, 160, 18, 40, { fill: 'currentColor', sw: 0 }));
  const cap = [
    ['1. Tip intact', 'bends to light'],
    ['2. Tip cut off', 'no bending'],
    ['3. Opaque cap on tip', 'no bending'],
    ['4. Collar below tip', 'bends to light'],
  ];
  cap.forEach(([a, b], i) => p.push(S.text(xs[i], 238, a, { a: 'middle', size: 11, w: 'bold' }), S.text(xs[i], 252, b, { a: 'middle', size: 11 })));
  return svgDoc(590, 264, 'Four oat coleoptiles lit from the right. 1: an intact coleoptile bends towards the light. 2: a coleoptile whose tip has been cut off does not bend. 3: a coleoptile with an opaque cap over its tip grows straight up. 4: a coleoptile with an opaque collar round its lower part, tip uncovered, bends towards the light. The tip senses light and controls the bending', p.join(''));
})();

// ---------------------------------------------------------------- 3. geotropism of a seedling laid flat
export const GEO = (() => {
  const p = [];
  p.push(S.text(110, 24, 'Seedling laid flat', { a: 'middle', size: 12, w: 'bold' }), S.text(380, 24, 'Two days later', { a: 'middle', size: 12, w: 'bold' }));
  const seed = (x, y) => S.ellipse(x, y, 15, 10, { c: BROWN, fill: BROWN, fop: 0.45, w: 1.2 });
  // left: straight
  p.push(S.line(125, 110, 205, 110, { c: GREEN, w: 4, cap: 'round' }), leafPair(205, 110, 0.8));
  p.push(S.line(95, 110, 25, 110, { c: BROWN, w: 3, cap: 'round' }));
  p.push(seed(110, 110));
  p.push(lab(170, 135, 'shoot', { a: 'middle' }), lab(55, 135, 'root', { a: 'middle' }));
  p.push(S.arrow(232, 110, 268, 110, { size: 8 }));
  // right: bent
  p.push(S.path('M395 110 Q440 110 445 62', { c: GREEN, w: 4, cap: 'round' }), leafPair(445, 62, 0.8));
  p.push(S.path('M365 110 Q312 110 306 168', { c: BROWN, w: 3, cap: 'round' }));
  p.push(seed(380, 110));
  p.push(lab(452, 92, 'Shoot grows up:'), lab(452, 105, 'negatively geotropic'));
  p.push(lab(318, 186, 'Root grows down:'), lab(318, 199, 'positively geotropic'));
  p.push(S.arrow(500, 140, 500, 200, { c: MUTED, w: 2, size: 8 }), lab(486, 216, 'gravity', { c: MUTED }));
  return svgDoc(570, 230, 'Geotropism. Left: a germinating seedling laid flat, with its shoot and root both horizontal. Right: two days later the shoot has curved upwards, away from gravity (negative geotropism), and the root has curved downwards, towards gravity (positive geotropism)', p.join(''));
})();

// ---------------------------------------------------------------- 4. hydrotropism, thigmotropism and chemotropism
export const OTHER = (() => {
  const p = [];
  const titles = [[95, 'Hydrotropism'], [285, 'Thigmotropism'], [470, 'Chemotropism']];
  for (const [x, t] of titles) p.push(S.text(x, 22, t, { a: 'middle', size: 12, w: 'bold' }));
  // (a) root bending to moist soil
  p.push(S.rect(15, 70, 160, 140, { c: BROWN, fill: BROWN, fop: 0.12, sw: 1 }));
  p.push(S.rect(120, 70, 55, 140, { c: BLUE, fill: BLUE, fop: 0.2, sw: 0 }));
  p.push(lab(22, 200, 'dry', { c: MUTED }), lab(128, 200, 'moist', { c: BLUE }));
  p.push(S.line(70, 70, 70, 40, { c: GREEN, w: 3 }), leafPair(70, 42, 0.7));
  p.push(S.path('M70 70 Q72 130 135 160', { c: BROWN, w: 3, cap: 'round' }));
  // (b) tendril coiling round a stick
  p.push(S.rect(290, 40, 10, 180, { c: BROWN, fill: BROWN, fop: 0.5, sw: 1 }));
  p.push(S.path('M220 220 Q230 190 245 175', { c: GREEN, w: 3, cap: 'round' }), leafPair(232, 196, 0.8));
  let d = 'M245 175 Q262 168 280 166';
  for (let t = 0; t <= 6 * Math.PI; t += 0.25) d += ` L${f(295 + 15 * Math.sin(t))} ${f(166 - 5.2 * t)}`;
  p.push(S.path(d, { c: GREEN, w: 2.2, join: 'round' }));
  // (c) pollen tube growing down the style to the ovule
  p.push(S.ellipse(470, 185, 40, 30, { c: GREEN, fill: GREEN, fop: 0.15, w: 1.5 }));
  p.push(S.line(463, 157, 463, 62, { c: GREEN, w: 1.5 }), S.line(477, 157, 477, 62, { c: GREEN, w: 1.5 }));
  p.push(S.ellipse(470, 56, 18, 8, { c: GREEN, fill: GREEN, fop: 0.3, w: 1.5 }));
  p.push(S.ellipse(470, 192, 10, 14, { c: GREEN, fill: GREEN, fop: 0.45, w: 1.2 }));
  p.push(S.circle(470, 46, 6, { c: YELLOW, fill: YELLOW, fop: 0.8, sw: 1 }));
  p.push(S.path('M470 52 L470 150 Q470 170 466 180', { c: RED, w: 2 }));
  p.push(S.lead(476, 46, 512, 46), lab(516, 50, 'pollen grain'));
  p.push(S.lead(477, 110, 512, 110), lab(516, 108, 'pollen'), lab(516, 121, 'tube'));
  p.push(S.lead(480, 196, 516, 214), lab(516, 226, 'ovule'));
  const cap = [[95, ['Root grows towards', 'water in the soil']], [285, ['Tendril coils round', 'a support it touches']], [470, ['Pollen tube grows', 'towards the ovule']]];
  for (const [x, ls] of cap) ls.forEach((s, i) => p.push(S.text(x, 245 + i * 13, s, { a: 'middle', size: 11 })));
  return svgDoc(600, 275, 'Three tropisms. Hydrotropism: a root grows sideways towards moist soil and away from dry soil. Thigmotropism: a tendril coils round a stick it touches. Chemotropism: a pollen tube grows from a pollen grain on the stigma down the style towards the ovule', p.join(''));
})();

// ---------------------------------------------------------------- 5. where the regulators act (named and lettered)
function hormoneMap(lettered) {
  const p = [];
  p.push(S.rect(20, 240, 520, 80, { c: BROWN, fill: BROWN, fop: 0.12, sw: 0 }), S.line(20, 240, 540, 240, { c: BROWN, w: 1.5 }));
  p.push('<g transform="translate(60 0)">');
  p.push(S.line(200, 240, 200, 62, { c: GREEN, w: 4, cap: 'round' }));
  p.push(S.path('M194 64 Q200 46 206 64 Z', { c: GREEN, fill: GREEN, fop: 0.6, w: 1.2 }));
  // leaves at nodes
  p.push(S.path('M200 190 Q160 160 120 172 Q160 200 200 190 Z', { c: GREEN, fill: GREEN, fop: 0.35, w: 1.2 }));
  p.push(S.path('M200 140 Q236 112 268 120 Q236 150 200 140 Z', { c: GREEN, fill: GREEN, fop: 0.35, w: 1.2 }));
  p.push(S.path('M200 100 Q170 80 148 90 Q172 110 200 100 Z', { c: GREEN, fill: GREEN, fop: 0.35, w: 1.2 }));
  // fruit on a short stalk
  p.push(S.line(200, 115, 160, 126, { c: GREEN, w: 2 }), S.line(160, 126, 158, 136, { c: GREEN, w: 1.5 }));
  p.push(S.ellipse(158, 150, 12, 15, { c: YELLOW, fill: YELLOW, fop: 0.6, w: 1.2 }));
  // internode bracket
  p.push(S.path('M212 186 L218 186 L218 144 L212 144', { c: MUTED, w: 1 }));
  // roots
  p.push(S.line(200, 240, 200, 300, { c: BROWN, w: 3, cap: 'round' }));
  for (const [y, dx] of [[255, -30], [262, 28], [276, -22], [282, 20]]) p.push(S.line(200, y, 200 + dx, y + 16, { c: BROWN, w: 1.5 }));
  const L = lettered
    ? [['A'], ['B'], ['C'], ['D'], ['E']]
    : [['Shoot tip: auxin'], ['Root tip: cytokinin'], ['Ripening fruit:', 'ethylene'], ['Leaf in dry weather:', 'abscisic acid'], ['Growing internode:', 'gibberellin']];
  const sz = lettered ? 14 : 11;
  const w = lettered ? 'bold' : undefined;
  const put = (i, x1, y1, x2, y2, tx, ty, a = 'start') => p.push(S.lead(x1, y1, x2, y2), S.lines(tx, ty, L[i], { size: sz, w, a }));
  put(0, 205, 54, 286, 54, 290, 58);
  put(1, 204, 300, 286, 300, 290, 304);
  put(2, 146, 152, 90, 152, 86, 156, 'end');
  put(3, 140, 176, 90, 200, 86, 204, 'end');
  put(4, 220, 165, 286, 165, 290, 169);
  p.push('</g>');
  const label = lettered
    ? 'A potted plant with five parts lettered: A, the tip of the main shoot; B, the tip of the main root; C, a yellow fruit hanging from the stem; D, a lower leaf; E, the length of stem between two leaves'
    : 'Where plant growth regulators act: auxin is made at the shoot tip, cytokinin at the root tip, ethylene is given off by a ripening fruit, abscisic acid acts on leaves in dry weather, and gibberellin lengthens the internodes of the stem';
  return svgDoc(560, 320, label, p.join(''));
}
export const HORMONES = hormoneMap(false);
export const HORMONES_LETTERED = hormoneMap(true);
