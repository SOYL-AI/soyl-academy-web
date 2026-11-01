// Hand-drawn schematics for ICSE 10 Chemistry ch14 (allow-listed elements, palette colours only): displayed formulae
// (atoms as labels, bonds trimmed to the label box), two laboratory preparations and the bromine-water test.
import { svgDoc, S } from './lib.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const muted = (x, y, s, o) => S.text(x, y, s, { size: 10, c: 'var(--diagram-muted)', ...o });
const HAL = { Cl: 'var(--diagram-green)', Br: 'var(--diagram-red)' };

/** Molecule: atoms [[x, y, label]…] (label '' = bare vertex), bonds [[i, j, order]…], offset (ox, oy). */
function mol(ox, oy, atoms, bonds, { size = 13 } = {}) {
  const hw = (t) => (t ? Math.max(5, t.length * size * 0.32) : 0);
  const hh = size * 0.5;
  const out = [];
  for (const [i, j, ord = 1] of bonds) {
    const [x1, y1, l1] = atoms[i];
    const [x2, y2, l2] = atoms[j];
    const L = Math.hypot(x2 - x1, y2 - y1);
    const ux = (x2 - x1) / L;
    const uy = (y2 - y1) / L;
    const cut = (t) => (t ? Math.min(hw(t) / Math.max(Math.abs(ux), 1e-6), hh / Math.max(Math.abs(uy), 1e-6)) + 3 : 0);
    const c1 = cut(l1);
    const c2 = cut(l2);
    const ax = ox + x1 + ux * c1;
    const ay = oy + y1 + uy * c1;
    const bx = ox + x2 - ux * c2;
    const by = oy + y2 - uy * c2;
    const offs = ord === 1 ? [0] : ord === 2 ? [-2.2, 2.2] : [-3.6, 0, 3.6];
    for (const o of offs) out.push(S.line(ax - uy * o, ay + ux * o, bx - uy * o, by + ux * o, { w: 1.3 }));
  }
  for (const [x, y, t] of atoms) if (t) out.push(S.text(ox + x, oy + y + size * 0.36, t, { a: 'middle', size, c: HAL[t], w: t === 'C' ? 'bold' : undefined }));
  return out.join('');
}

/** Displayed formula of an open chain: cs = [{ u, d, b, l, r }…]; u/d default 'H', null for none, or [label, order]. */
function chain(ox, oy, cs, { dx = 40, dy = 30, size = 13 } = {}) {
  const atoms = [];
  const bonds = [];
  const sub = (v, x, y, ci) => {
    if (v === null) return;
    const [t, o] = Array.isArray(v) ? v : [v ?? 'H', 1];
    atoms.push([x, y, t]);
    bonds.push([ci, atoms.length - 1, o]);
  };
  cs.forEach((_, i) => atoms.push([i * dx, 0, 'C']));
  cs.forEach((c, i) => {
    sub(c.u, i * dx, -dy, i);
    sub(c.d, i * dx, dy, i);
    if (i < cs.length - 1) bonds.push([i, i + 1, c.b ?? 1]);
  });
  const first = cs[0];
  const last = cs[cs.length - 1];
  if (first.l !== null) {
    atoms.push([-dx * 0.8, 0, first.l ?? 'H']);
    bonds.push([0, atoms.length - 1, 1]);
  }
  if (last.r !== null) {
    atoms.push([(cs.length - 1) * dx + dx * 0.8, 0, last.r ?? 'H']);
    bonds.push([cs.length - 1, atoms.length - 1, 1]);
  }
  return mol(ox, oy, atoms, bonds, { size });
}
const one = (ox, oy, u, d, l, r) => chain(ox, oy, [{ u, d, l, r }]);
const plus = (x, y) => lab(x, y + 4, '+', { a: 'middle', size: 14 });

/** Inverted gas jar over water in a trough, fed by a delivery tube ending at (jx, 190). */
function trough(jx, gas) {
  return [
    S.rect(jx - 70, 150, 150, 70, { sw: 1.5 }),
    S.rect(jx - 69, 166, 148, 53, { sw: 0, fill: 'var(--diagram-blue)', fop: 0.15, c: 'var(--diagram-blue)' }),
    S.line(jx - 69, 166, jx + 79, 166, { c: 'var(--diagram-blue)', w: 1 }),
    S.path(`M${jx - 25} 196 V70 H${jx + 35} V196`, { w: 1.5 }),
    S.rect(jx - 24, 150, 58, 46, { sw: 0, fill: 'var(--diagram-blue)', fop: 0.15, c: 'var(--diagram-blue)' }),
    lab(jx + 5, 100, gas, { a: 'middle', w: 'bold' }),
    muted(jx + 5, 236, 'water in a trough', { a: 'middle' }),
  ].join('');
}

// 1. Methane and ethane, the first two alkanes.
export const ALKANES = svgDoc(
  420,
  140,
  'Displayed formulae of the first two alkanes. Methane: one carbon atom bonded to four hydrogen atoms. Ethane: two carbon atoms joined by a single bond, each also bonded to three hydrogen atoms. Both contain only single bonds and fit the general formula CnH2n plus 2.',
  [
    one(90, 62),
    lab(90, 120, 'methane, CH₄', { a: 'middle', w: 'bold' }),
    chain(270, 62, [{}, {}]),
    lab(290, 120, 'ethane, C₂H₆', { a: 'middle', w: 'bold' }),
    muted(210, 136, 'only single bonds: saturated, CₙH₂ₙ₊₂', { a: 'middle' }),
  ].join(''),
);

// 2. Laboratory preparation of methane from sodium ethanoate and soda lime.
export const METHANE_PREP = svgDoc(
  460,
  245,
  'Laboratory preparation of methane. A hard glass test tube, clamped almost horizontally with its mouth slightly lower than its closed end, contains a mixture of sodium ethanoate and soda lime and is heated with a burner. A delivery tube leads from the cork down into a trough of water and up into an inverted gas jar filled with water. Methane bubbles up and collects in the jar by downward displacement of water.',
  [
    S.path('M200 92 H58 A14 14 0 0 0 58 120 H200', { w: 1.6 }),
    S.rect(200, 90, 14, 32, { sw: 1.2, fill: 'var(--diagram-muted)', fop: 0.3, c: 'var(--diagram-muted)' }),
    S.path('M52 108 H140 V119 H58 A11 11 0 0 1 52 108 Z', { sw: 0, fill: 'var(--diagram-accent)', fop: 0.45, c: 'var(--diagram-accent)' }),
    S.lead(126, 116, 146, 146), S.lines(140, 158, ['sodium ethanoate', '+ soda lime'], { size: 10, dy: 12 }),
    S.path('M80 222 L88 186 H108 L116 222 Z', { w: 1.4 }),
    S.path('M98 184 C88 170 94 152 98 140 C104 152 110 170 98 184 Z', { sw: 1.2, fill: 'var(--diagram-red)', fop: 0.35, c: 'var(--diagram-red)' }),
    muted(124, 214, 'heat'),
    S.path('M214 106 H272 V206 H322 V190', { w: 1.6 }),
    muted(214, 84, 'delivery tube'),
    lab(118, 84, 'hard glass test tube', { a: 'middle', size: 10 }),
    trough(330, 'methane'),
  ].join(''),
);

// 3. Stepwise substitution of methane by chlorine.
export const CHLORINATION = svgDoc(
  530,
  160,
  'Stepwise substitution of methane by chlorine in diffused sunlight. Each step replaces one more hydrogen atom by a chlorine atom and gives off hydrogen chloride: methane becomes chloromethane, then dichloromethane, then trichloromethane, also called chloroform, and finally tetrachloromethane, also called carbon tetrachloride.',
  [
    ...[['CH₄', 40], ['CH₃Cl', 150, 'H', 'Cl'], ['CH₂Cl₂', 260, 'Cl', 'Cl'], ['CHCl₃', 370, 'Cl', 'Cl', 'Cl'], ['CCl₄', 480, 'Cl', 'Cl', 'Cl', 'Cl']].map(([t, x, ...subs]) => one(x, 72, ...subs) + lab(x, 128, t, { a: 'middle', w: 'bold', size: 10 })),
    ...[40, 150, 260, 370].map((x) => S.arrow(x + 22, 22, x + 88, 22, { c: 'var(--diagram-muted)', size: 6 }) + muted(x + 55, 14, '+ Cl₂', { a: 'middle' })),
    muted(265, 152, 'each step gives off HCl; diffused sunlight is needed', { a: 'middle' }),
  ].join(''),
);

// 4. Ethene and ethyne.
export const UNSAT = svgDoc(
  420,
  140,
  'Displayed formulae of the first alkene and the first alkyne. Ethene: two carbon atoms joined by a double bond, each also bonded to two hydrogen atoms. Ethyne: two carbon atoms joined by a triple bond, each also bonded to one hydrogen atom.',
  [
    chain(88, 62, [{ b: 2, l: null }, { r: null }], { dx: 44 }),
    lab(110, 120, 'ethene, C₂H₄ (C=C)', { a: 'middle', w: 'bold' }),
    chain(270, 62, [{ u: null, d: null, b: 3 }, { u: null, d: null }], { dx: 44 }),
    lab(292, 120, 'ethyne, C₂H₂ (C≡C)', { a: 'middle', w: 'bold' }),
    muted(210, 136, 'unsaturated: they add hydrogen and halogens', { a: 'middle' }),
  ].join(''),
);

// 5. Laboratory preparation of ethyne from calcium carbide and water.
export const ETHYNE_PREP = svgDoc(
  460,
  245,
  'Laboratory preparation of ethyne. Water from a dropping funnel falls drop by drop onto lumps of calcium carbide in a conical flask. A delivery tube from the stopper leads down into a trough of water and up into an inverted gas jar, where ethyne collects by downward displacement of water.',
  [
    S.path('M88 70 V108 L42 212 H170 L124 108 V70', { w: 1.6 }),
    S.rect(84, 62, 44, 12, { sw: 1.2, fill: 'var(--diagram-muted)', fop: 0.3, c: 'var(--diagram-muted)' }),
    ...[[62, 198], [80, 200], [98, 197], [116, 200], [134, 198], [72, 188], [108, 189]].map(([x, y]) => S.rect(x, y, 14, 10, { sw: 1, fill: 'var(--diagram-accent)', fop: 0.5, c: 'var(--diagram-accent)' })),
    S.lead(150, 196, 176, 176), muted(178, 172, 'calcium carbide', { c: 'currentColor' }),
    S.ellipse(98, 30, 18, 14, { sw: 1.4, fill: 'var(--diagram-blue)', fop: 0.15, c: 'currentColor' }),
    S.line(98, 44, 98, 120, { w: 1.4 }),
    S.line(91, 54, 105, 54, { w: 2 }),
    muted(122, 22, 'dropping funnel with water'),
    S.path('M118 62 V50 H272 V206 H322 V190', { w: 1.6 }),
    muted(170, 42, 'delivery tube'),
    trough(330, 'ethyne'),
  ].join(''),
);

// 6. Addition of bromine to ethene and to ethyne.
export const ADDITION = svgDoc(
  460,
  210,
  'Addition of bromine. Top row: ethene plus one molecule of bromine gives 1,2-dibromoethane, in which each carbon atom carries one bromine atom and the double bond has become a single bond. Bottom row: ethyne plus two molecules of bromine gives 1,1,2,2-tetrabromoethane, in which each carbon atom carries two bromine atoms and the triple bond has become a single bond.',
  [
    chain(40, 45, [{ b: 2, l: null }, { r: null }], { dx: 40 }),
    plus(104, 45),
    lab(136, 49, 'Br–Br', { a: 'middle', size: 12, c: 'var(--diagram-red)' }),
    S.arrow(168, 45, 236, 45),
    chain(290, 45, [{ d: 'Br' }, { d: 'Br' }]),
    lab(310, 98, '1,2-dibromoethane', { a: 'middle', size: 10, w: 'bold' }),
    chain(40, 150, [{ u: null, d: null, b: 3 }, { u: null, d: null }], { dx: 40 }),
    plus(132, 150),
    lab(166, 154, '2 Br–Br', { a: 'middle', size: 12, c: 'var(--diagram-red)' }),
    S.arrow(198, 150, 240, 150),
    chain(290, 150, [{ u: 'Br', d: 'Br' }, { u: 'Br', d: 'Br' }]),
    lab(310, 204, '1,1,2,2-tetrabromoethane', { a: 'middle', size: 10, w: 'bold' }),
    muted(110, 100, 'C=C or C≡C becomes C–C', { a: 'middle' }),
  ].join(''),
);

// 7. Bromine-water test for unsaturation.
const tube = (x, liquid, op) =>
  S.path(`M${x} 70 V180 A16 16 0 0 0 ${x + 32} 180 V70`, { w: 1.6 }) +
  S.path(`M${x + 1} 120 V180 A15 15 0 0 0 ${x + 31} 180 V120 Z`, { sw: 0, fill: liquid, fop: op, c: liquid }) +
  S.line(x + 16, 30, x + 16, 186, { w: 1.3 });
export const BROMINE_TEST = svgDoc(
  440,
  250,
  'Test for unsaturation. Two test tubes contain orange-brown bromine water. Ethane is bubbled into the first tube and the colour stays orange-brown: no reaction. Ethene is bubbled into the second tube and the solution becomes colourless, because ethene adds bromine across its double bond. Ethyne gives the same result as ethene.',
  [
    tube(90, 'var(--diagram-accent)', 0.55),
    lab(106, 22, 'ethane', { a: 'middle', w: 'bold' }),
    lab(106, 224, 'stays orange-brown', { a: 'middle', size: 10 }),
    muted(106, 240, 'saturated: no addition', { a: 'middle' }),
    tube(290, 'var(--diagram-blue)', 0.08),
    lab(306, 22, 'ethene (or ethyne)', { a: 'middle', w: 'bold' }),
    lab(306, 224, 'becomes colourless', { a: 'middle', size: 10 }),
    muted(306, 240, 'unsaturated: bromine adds', { a: 'middle' }),
    ...[0, 1, 2].map((k) => S.circle(102 + k * 6, 150 + k * 12, 2.4, { sw: 1 }) + S.circle(302 + k * 6, 150 + k * 12, 2.4, { sw: 1 })),
    muted(200, 130, 'bromine water', { a: 'middle' }),
  ].join(''),
);
