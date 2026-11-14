// ch20 SVGs, part A: types of reaction, bond fission, stability ladders, inductive effect with pKa bars.
import { svgDoc, S } from './lib.mjs';
import { chk, MUTED, RED, BLUE, GREEN, YEL, ACC, FILL, t, sm, bond, pair, dot, curly, tokens } from './kit.mjs';

// ---------------------------------------------------------------- 1. substitution, addition, elimination
export const TYPES = (() => {
  const b = [];
  const rows = [
    ['Substitution', 'an atom or group is replaced by another', [['CH₃CH₂–', null, true], ['Br', RED], ['+', null], ['OH⁻', BLUE], ['→', null], ['CH₃CH₂–', null, true], ['OH', BLUE], ['+', null], ['Br⁻', RED]]],
    ['Addition', 'a π bond breaks and two σ bonds form', [['CH₂=CH₂', null], ['+', null], ['Br–Br', BLUE], ['→', null], ['BrCH₂–CH₂Br', BLUE]]],
    ['Elimination', 'a small molecule leaves and a π bond forms', [['CH₃CH₂–Br', RED], ['+', null], ['KOH (alcoholic)', null], ['→', null], ['CH₂=CH₂', null], ['+', null], ['KBr', RED], ['+', null], ['H₂O', null]]],
  ];
  rows.forEach(([name, note, toks], i) => {
    const y = 38 + i * 62;
    b.push(S.rect(8, y - 22, 524, 52, { sw: 1, rx: 4, c: MUTED, fill: FILL, fop: 0.35 }));
    b.push(t(16, y, name, { w: 'bold', c: BLUE }));
    b.push(tokens(116, y, toks).svg);
    b.push(sm(116, y + 20, note, { c: MUTED }));
  });
  chk(rows.length === 3, 'three reaction types drawn');
  return svgDoc(540, 200, 'Three types of organic reaction with an example of each: substitution of bromine by hydroxide in bromoethane, addition of bromine to ethene, and elimination of hydrogen bromide from bromoethane to give ethene.', b.join(''));
})();

// ---------------------------------------------------------------- 2. homolytic and heterolytic fission
export const FISSION = (() => {
  const b = [];
  b.push(t(130, 18, 'Homolytic fission', { a: 'middle', w: 'bold', c: BLUE }));
  b.push(t(405, 18, 'Heterolytic fission', { a: 'middle', w: 'bold', c: BLUE }));
  b.push(S.line(268, 8, 268, 214, { c: MUTED, w: 1, dash: '3 3' }));
  // homolytic
  b.push(t(92, 86, 'A', { a: 'middle', size: 20, w: 'bold' }) + t(168, 86, 'B', { a: 'middle', size: 20, w: 'bold' }) + pair(130, 80));
  b.push(curly(127, 74, 112, 40, 96, 66, { c: RED, half: true }));
  b.push(curly(133, 74, 148, 40, 164, 66, { c: RED, half: true, side: -1 }));
  b.push(S.arrow(130, 100, 130, 122, { size: 6 }));
  b.push(t(98, 154, 'A', { a: 'middle', size: 20, w: 'bold' }) + dot(111, 149, RED));
  b.push(t(162, 154, 'B', { a: 'middle', size: 20, w: 'bold' }) + dot(149, 149, RED));
  b.push(sm(130, 176, 'each atom keeps one electron', { a: 'middle' }));
  b.push(sm(130, 190, 'two neutral free radicals', { a: 'middle', c: RED }));
  b.push(sm(130, 208, 'CH₃–CH₃ → 2 CH₃·', { a: 'middle', c: MUTED }));
  // heterolytic
  b.push(t(366, 86, 'A', { a: 'middle', size: 20, w: 'bold' }) + t(444, 86, 'B', { a: 'middle', size: 20, w: 'bold' }) + pair(405, 80));
  b.push(curly(405, 74, 428, 34, 440, 66, { c: BLUE }));
  b.push(S.arrow(405, 100, 405, 122, { size: 6 }));
  b.push(t(372, 154, 'A', { a: 'middle', size: 20, w: 'bold' }) + t(386, 144, '+', { size: 14, c: GREEN }));
  b.push(t(430, 154, 'B', { a: 'middle', size: 20, w: 'bold' }) + pair(417, 134, BLUE) + t(446, 144, '−', { size: 14, c: RED }));
  b.push(sm(405, 176, 'the more electronegative atom takes both electrons', { a: 'middle' }));
  b.push(sm(405, 190, 'a cation and an anion', { a: 'middle', c: GREEN }));
  b.push(sm(405, 208, '(CH₃)₃C–Br → (CH₃)₃C⁺ + Br⁻', { a: 'middle', c: MUTED }));
  return svgDoc(540, 218, 'Homolytic and heterolytic bond fission. Homolytic: the bonding electron pair splits, one electron to each atom, shown with two half-headed arrows, giving two free radicals. Heterolytic: both electrons go to the more electronegative atom, shown with one full-headed arrow, giving a cation and an anion.', b.join(''));
})();

// ---------------------------------------------------------------- 3. stability of carbocations, free radicals and carbanions
const ALKYL = [0, 1, 2, 3]; // number of alkyl (methyl) groups on the charged carbon
const ALPHA_H = ALKYL.map((n) => 3 * n); // alpha C–H bonds available for hyperconjugation, computed from the structures
chk(ALPHA_H.join(',') === '0,3,6,9', `alpha C–H counts computed from the number of methyl groups: ${ALPHA_H.join(', ')}`);
export const STABIL = (() => {
  const b = [];
  const names = ['CH₃⁺', 'CH₃CH₂⁺', '(CH₃)₂CH⁺', '(CH₃)₃C⁺'];
  const cls = ['methyl', 'primary (1°)', 'secondary (2°)', 'tertiary (3°)'];
  const base = 150;
  b.push(t(20, 20, 'Carbocations and free radicals', { w: 'bold', c: BLUE }));
  ALPHA_H.forEach((n, i) => {
    const x = 40 + i * 118;
    const h = 8 + n * 8;
    b.push(S.rect(x, base - h, 70, h, { sw: 1.3, c: BLUE, fill: BLUE, fop: 0.15 + i * 0.12 }));
    b.push(sm(x + 35, base - h - 6, `α C–H: ${n}`, { a: 'middle' }));
    b.push(t(x + 35, base + 18, names[i], { a: 'middle', size: 12, w: 'bold' }));
    b.push(sm(x + 35, base + 32, cls[i], { a: 'middle', c: MUTED }));
  });
  b.push(S.arrow(40, 52, 450, 52, { c: GREEN, w: 2, size: 8 }));
  b.push(sm(245, 44, 'stability increases (hyperconjugation and +I effect of alkyl groups)', { a: 'middle', c: GREEN }));
  b.push(S.line(14, 196, 500, 196, { c: MUTED, w: 1, dash: '3 3' }));
  b.push(t(20, 216, 'Carbanions', { w: 'bold', c: BLUE }));
  b.push(t(130, 216, 'CH₃⁻ > 1° > 2° > 3°', { w: 'bold' }));
  b.push(S.arrow(330, 212, 480, 212, { c: RED, w: 1.5, size: 6 }));
  b.push(sm(405, 206, 'stability falls', { a: 'middle', c: RED }));
  b.push(sm(250, 234, 'alkyl groups push electrons towards the negative carbon and destabilise it: the order is reversed', { a: 'middle', c: RED }));
  return svgDoc(520, 244, 'Stability of carbocations and free radicals rises from methyl to primary, secondary and tertiary, with the number of alpha C–H bonds 0, 3, 6 and 9 drawn as bars. Carbanions follow the reverse order.', b.join(''));
})();

// ---------------------------------------------------------------- 4. inductive effect and the acid strengths of chloroethanoic acids
const PKA = [
  { f: 'CH₃COOH', v: 4.76 },
  { f: 'ClCH₂COOH', v: 2.86 },
  { f: 'Cl₂CHCOOH', v: 1.29 },
  { f: 'Cl₃CCOOH', v: 0.65 },
];
chk(PKA.every((p, i) => i === 0 || p.v < PKA[i - 1].v), 'pKa values fall as chlorine atoms are added (4.76, 2.86, 1.29, 0.65)');
export const INDUCT = (() => {
  const b = [];
  b.push(t(120, 18, '−I effect of chlorine', { a: 'middle', w: 'bold', c: BLUE }));
  const xs = [20, 70, 120, 170, 222];
  const labs = ['C', 'C', 'C', 'C', 'Cl'];
  xs.forEach((x, i) => {
    b.push(t(x, 96, labs[i], { a: 'middle', size: 14, w: 'bold', c: i === 4 ? GREEN : 'currentColor' }));
    if (i < 4) b.push(bond(x + 10, 92, xs[i + 1] - (i === 3 ? 14 : 10), 92));
  });
  // arrows on the bonds, drawn thinner as the effect weakens with distance
  [[3, 3.6], [2, 2.6], [1, 1.8], [0, 1.1]].forEach(([i, w]) => {
    const x1 = xs[i] + 14;
    const x2 = xs[i + 1] - 16;
    b.push(S.line(x1 + 4, 80, x2 - 2, 80, { c: BLUE, w }) + S.head(x2, 80, 0, { size: 4 + w, c: BLUE }));
  });
  b.push(t(xs[3], 120, 'δ+', { a: 'middle', size: 13, c: BLUE, w: 'bold' }));
  b.push(t(xs[2], 120, 'δ+', { a: 'middle', size: 11, c: BLUE }));
  b.push(t(xs[1], 120, 'δ+', { a: 'middle', size: 10, c: BLUE }));
  b.push(t(xs[4], 120, 'δ−', { a: 'middle', size: 13, c: GREEN, w: 'bold' }));
  b.push(sm(120, 146, 'electrons are pulled along the σ bonds;', { a: 'middle' }));
  b.push(sm(120, 160, 'the pull fades with distance from Cl', { a: 'middle' }));
  b.push(S.line(250, 8, 250, 178, { c: MUTED, w: 1, dash: '3 3' }));
  b.push(t(390, 18, 'pKa (lower = stronger acid)', { a: 'middle', w: 'bold', c: BLUE }));
  PKA.forEach((p, i) => {
    const y = 42 + i * 34;
    b.push(sm(344, y + 11, p.f, { a: 'end' }));
    b.push(S.rect(350, y, p.v * 28, 18, { sw: 1.2, c: i === 0 ? MUTED : RED, fill: i === 0 ? MUTED : RED, fop: 0.2 + i * 0.1 }));
    b.push(sm(354 + p.v * 28, y + 13, p.v.toFixed(2), { c: 'currentColor' }));
  });
  return svgDoc(520, 182, 'Inductive effect: the electron-withdrawing chlorine pulls the sigma electrons along a carbon chain with an effect that weakens with distance. A bar chart of pKa values shows ethanoic acid at 4.76, chloroethanoic acid at 2.86, dichloroethanoic acid at 1.29 and trichloroethanoic acid at 0.65, so more chlorine atoms make a stronger acid.', b.join(''));
})();
