// Hand-drawn SVG schematics for ch08 Atoms and Molecules (allow-listed elements, palette colours only). Geometry is computed and self-checked.
import { svgDoc, S, near } from './lib.mjs';
import { crisscross, ION } from './data.mjs';

export const SELF_CHECKS = [];
const chk = (ok, msg) => SELF_CHECKS.push(`${ok ? 'ok' : 'FAIL'} ${msg}`);
const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const small = (x, y, s, o) => S.text(x, y, s, { size: 10, ...o });
const SUB = '₀₁₂₃₄₅₆₇₈₉';
const sub = (s) => s.replace(/\d/g, (d) => SUB[Number(d)]);

// ------------------------------------------------------------------ 1. conservation of mass: closed flask before and after
const before = { flaskAndChips: 45.2, acidTube: 16.1 };
const total = before.flaskAndChips + before.acidTube;
const afterTotal = 61.3; // closed flask after the reaction: gas stays inside
chk(near(total, afterTotal, 1e-9), 'conservation flask: 45.20 + 16.10 g before equals 61.30 g after in the closed flask');
const flaskPanel = (ox, isAfter) => {
  const parts = [];
  const bal = isAfter ? 17 : 9;
  parts.push(S.ellipse(ox + 90, 60 - (isAfter ? 4 : 0), bal, isAfter ? 22 : 9, { fill: 'var(--diagram-red)', fop: 0.3, c: 'var(--diagram-red)' }));
  parts.push(S.rect(ox + 82, 82, 16, 28, { fill: 'var(--diagram-brown)', fop: 0.4, c: 'var(--diagram-brown)' }));
  parts.push(S.path(`M${ox + 82} 110 L${ox + 82} 135 L${ox + 32} 205 L${ox + 32} 214 L${ox + 148} 214 L${ox + 148} 205 L${ox + 98} 135 L${ox + 98} 110`, { w: 2 }));
  if (isAfter) {
    parts.push(S.path(`M${ox + 44} 190 L${ox + 136} 190 L${ox + 148} 205 L${ox + 148} 214 L${ox + 32} 214 L${ox + 32} 205 Z`, { fill: 'var(--diagram-blue)', fop: 0.25, c: 'none' }));
    for (const [bx, by] of [[70, 175], [95, 160], [112, 178], [84, 145], [105, 130]]) parts.push(S.circle(ox + bx, by, 3, { c: 'var(--diagram-muted)', sw: 1 }));
    parts.push(lab(ox + 90, 296, 'gas stays in the closed flask', { a: 'middle', size: 10 }));
  } else {
    parts.push(S.rect(ox + 112, 170, 18, 42, { fill: 'var(--diagram-blue)', fop: 0.3, c: 'currentColor', sw: 1.2 }));
    parts.push(S.rect(ox + 114, 178, 14, 34, { fill: 'var(--diagram-blue)', fop: 0.2, c: 'none' }));
    for (let i = 0; i < 4; i++) parts.push(S.circle(ox + 48 + i * 14, 207, 5, { fill: 'var(--diagram-fill)', c: 'var(--diagram-muted)', sw: 1 }));
    parts.push(small(ox + 156, 186, 'acid in', { a: 'start' }));
    parts.push(small(ox + 156, 198, 'small tube', { a: 'start' }));
    parts.push(S.lead(ox + 154, 192, ox + 131, 192));
    parts.push(small(ox + 26, 210, 'marble chips', { a: 'end' }));
    parts.push(S.lead(ox + 28, 207, ox + 41, 207));
    parts.push(lab(ox + 90, 296, 'tube is tipped only after weighing', { a: 'middle', size: 10 }));
  }
  parts.push(S.rect(ox + 10, 216, 160, 8, { fill: 'var(--diagram-muted)', fop: 0.5, c: 'var(--diagram-muted)' }));
  parts.push(S.rect(ox + 20, 224, 140, 52, { fill: 'var(--diagram-fill)', fop: 0.7, c: 'currentColor', sw: 1.5 }));
  parts.push(S.rect(ox + 45, 232, 90, 26, { fill: 'var(--diagram-yellow)', fop: 0.25, c: 'currentColor', sw: 1 }));
  parts.push(S.text(ox + 90, 251, '61.30 g', { a: 'middle', size: 14, w: 'bold' }));
  parts.push(lab(ox + 90, 22, isAfter ? 'After the reaction' : 'Before the reaction', { a: 'middle', w: 'bold' }));
  return parts.join('');
};
export const CONSERVATION = svgDoc(
  640,
  306,
  'A closed flask on a balance, before and after a reaction. Before, the flask holds marble chips and a small tube of acid, with a flat balloon on top, and the balance reads 61.30 grams. After the acid is tipped onto the marble and the gas fills the balloon, the balance still reads 61.30 grams, so the total mass has not changed.',
  [
    flaskPanel(90, false),
    flaskPanel(430, true),
    S.arrow(335, 150, 420, 150, { w: 2.5, size: 9, c: 'var(--diagram-red)' }),
    lab(377, 136, 'mix the acid', { a: 'middle', c: 'var(--diagram-red)' }),
    lab(377, 172, 'with the chips', { a: 'middle', c: 'var(--diagram-red)' }),
    lab(377, 215, 'same reading', { a: 'middle', w: 'bold' }),
    lab(377, 230, '61.30 g', { a: 'middle', w: 'bold' }),
  ].join(''),
);

// ------------------------------------------------------------------ 2. atomicity chart
const R = 11;
const link = (a, b) => S.line(a[0], a[1], b[0], b[1], { w: 2.5, c: 'var(--diagram-muted)' });
const dot = (p, c) => S.circle(p[0], p[1], R, { fill: c, fop: 0.5, c });
const ring = (cx, cy, n, rad) => [...Array(n)].map((_, i) => [cx + rad * Math.cos((2 * Math.PI * i) / n - Math.PI / 2), cy + rad * Math.sin((2 * Math.PI * i) / n - Math.PI / 2)]);
const molecules = [
  { name: 'Helium', f: 'He', kind: 'monoatomic', atoms: [[60, 100]], bonds: [], c: 'var(--diagram-green)' },
  { name: 'Oxygen', f: 'O2', kind: 'diatomic', atoms: [[168, 100], [196, 100]], bonds: [[0, 1]], c: 'var(--diagram-red)' },
  { name: 'Ozone', f: 'O3', kind: 'triatomic', atoms: [[300, 112], [326, 88], [352, 112]], bonds: [[0, 1], [1, 2]], c: 'var(--diagram-red)' },
  { name: 'White phosphorus', f: 'P4', kind: 'tetratomic', atoms: [[438, 82], [470, 82], [438, 114], [470, 114]], bonds: [[0, 1], [1, 3], [3, 2], [2, 0], [0, 3]], c: 'var(--diagram-yellow)' },
  { name: 'Sulphur', f: 'S8', kind: 'octa-atomic', atoms: ring(570, 100, 8, 32), bonds: [0, 1, 2, 3, 4, 5, 6, 7].map((i) => [i, (i + 1) % 8]), c: 'var(--diagram-brown)' },
];
const wantAtoms = [1, 2, 3, 4, 8];
molecules.forEach((m, i) => chk(m.atoms.length === wantAtoms[i] && /\d/.test(m.f) === (m.atoms.length > 1) && (m.atoms.length === 1 || Number(m.f.replace(/\D/g, '')) === m.atoms.length), `atomicity chart: ${m.f} is drawn with ${m.atoms.length} atoms, matching its formula`));
chk(molecules.every((m) => m.bonds.every(([a, b]) => a < m.atoms.length && b < m.atoms.length)), 'atomicity chart: every bond joins two drawn atoms');
export const ATOMICITY = svgDoc(
  640,
  200,
  'Chart of atomicity. Helium is monoatomic with one atom per molecule. Oxygen, O2, is diatomic with two atoms. Ozone, O3, is triatomic with three atoms. White phosphorus, P4, is tetratomic with four atoms. Sulphur, S8, is octa-atomic with eight atoms in a ring.',
  [
    ...molecules.flatMap((m) => {
      const cx = m.atoms.reduce((s, p) => s + p[0], 0) / m.atoms.length;
      return [
        ...m.bonds.map(([a, b]) => link(m.atoms[a], m.atoms[b])),
        ...m.atoms.map((p) => dot(p, m.c)),
        lab(cx, 28, sub(m.f), { a: 'middle', w: 'bold', size: 14 }),
        lab(cx, 160, m.name, { a: 'middle' }),
        small(cx, 176, `${m.kind}: ${m.atoms.length} ${m.atoms.length === 1 ? 'atom' : 'atoms'}`, { a: 'middle' }),
      ];
    }),
    small(320, 194, 'Schematic, not to scale.', { a: 'middle' }),
  ].join(''),
);

// ------------------------------------------------------------------ 3. criss-cross method
const cc = crisscross(ION.Al, ION.SO4);
chk(cc.formula === 'Al2(SO4)3' && cc.c === 2 && cc.a === 3, 'criss-cross: Al (valency 3) with SO4 (valency 2) gives Al2(SO4)3 computed from the method');
const ccOx = crisscross(ION.Mg, ION.O);
chk(ccOx.formula === 'MgO' && ccOx.g === 2, 'criss-cross: Mg (2) with O (2) first gives Mg2O2, which reduces by the common factor 2 to MgO');
const bx = 40;
export const CRISSCROSS = svgDoc(
  560,
  300,
  'The criss-cross method for aluminium sulphate. Step 1: write the symbols, Al and SO4. Step 2: write the valencies, 3 for aluminium and 2 for sulphate. Step 3: cross them over, so the valency of aluminium becomes the subscript of sulphate and the valency of sulphate becomes the subscript of aluminium. Step 4: put the sulphate group in brackets because its subscript is more than one, giving Al2(SO4)3.',
  [
    lab(bx, 24, 'Step 1  Write the symbols', {}),
    S.rect(bx + 190, 8, 70, 24, { fill: 'var(--diagram-blue)', fop: 0.25, c: 'var(--diagram-blue)', rx: 4 }),
    lab(bx + 225, 25, 'Al', { a: 'middle', w: 'bold', size: 14 }),
    S.rect(bx + 290, 8, 90, 24, { fill: 'var(--diagram-red)', fop: 0.25, c: 'var(--diagram-red)', rx: 4 }),
    lab(bx + 335, 25, sub('SO4'), { a: 'middle', w: 'bold', size: 14 }),
    lab(bx, 74, 'Step 2  Write the valencies', {}),
    lab(bx + 225, 76, '3', { a: 'middle', w: 'bold', size: 16, c: 'var(--diagram-blue)' }),
    lab(bx + 335, 76, '2', { a: 'middle', w: 'bold', size: 16, c: 'var(--diagram-red)' }),
    small(bx + 400, 76, '(charges 3+ and 2−)', {}),
    lab(bx, 128, 'Step 3  Criss-cross', {}),
    lab(bx + 225, 120, 'Al', { a: 'middle', w: 'bold', size: 14 }),
    lab(bx + 335, 120, sub('SO4'), { a: 'middle', w: 'bold', size: 14 }),
    S.arrow(bx + 230, 84, bx + 326, 106, { c: 'var(--diagram-blue)', w: 2, size: 7 }),
    S.arrow(bx + 334, 84, bx + 238, 106, { c: 'var(--diagram-red)', w: 2, size: 7 }),
    lab(bx + 244, 128, '2', { w: 'bold', size: 13, c: 'var(--diagram-red)' }),
    lab(bx + 368, 128, '3', { w: 'bold', size: 13, c: 'var(--diagram-blue)' }),
    lab(bx, 190, 'Step 4  Write the formula', {}),
    small(bx + 160, 232, 'Brackets go round a group when its subscript is more than 1.', {}),
    S.rect(bx + 160, 152, 240, 56, { fill: 'var(--diagram-green)', fop: 0.2, c: 'var(--diagram-green)', rx: 6 }),
    lab(bx + 280, 189, `Al${sub('2')}(SO${sub('4')})${sub('3')}`, { a: 'middle', w: 'bold', size: 22 }),
    lab(bx, 262, 'Check: total positive charge 2 × 3 = 6, total negative charge 3 × 2 = 6, so the formula is neutral.', {}),
    small(bx, 284, `If the subscripts share a common factor, divide by it: Mg${sub('2')}O${sub('2')} becomes MgO.`, {}),
  ].join(''),
);

// ------------------------------------------------------------------ 4. constant proportions: two samples of magnesium oxide
const samples = [
  { name: 'Sample A', mg: 6.0, o: 4.0 },
  { name: 'Sample B', mg: 1.8, o: 1.2 },
];
const k = 32; // px per gram
chk(samples.every((s) => near(s.mg / s.o, 1.5, 1e-9)), 'constant proportions: both magnesium oxide samples have Mg : O = 3 : 2');
chk(samples.every((s) => near(s.mg + s.o, s.name === 'Sample A' ? 10.0 : 3.0, 1e-9)), 'constant proportions: the oxide masses are 10.0 g and 3.0 g');
export const PROPORTION = svgDoc(
  600,
  230,
  'Two samples of magnesium oxide made in different ways. Sample A has 6.0 grams of magnesium and 4.0 grams of oxygen, 10.0 grams in all. Sample B has 1.8 grams of magnesium and 1.2 grams of oxygen, 3.0 grams in all. In both, the ratio of magnesium to oxygen is 3 to 2.',
  [
    lab(30, 22, 'Mass of magnesium and oxygen in two samples of magnesium oxide', { w: 'bold' }),
    ...samples.flatMap((s, i) => {
      const y = 50 + i * 80;
      const w1 = s.mg * k;
      const w2 = s.o * k;
      return [
        lab(30, y + 20, s.name, { w: 'bold' }),
        S.rect(110, y, w1, 36, { fill: 'var(--diagram-blue)', fop: 0.35, c: 'var(--diagram-blue)' }),
        S.rect(110 + w1, y, w2, 36, { fill: 'var(--diagram-red)', fop: 0.3, c: 'var(--diagram-red)' }),
        lab(110 + w1 / 2, y + 22, `Mg ${s.mg.toFixed(1)} g`, { a: 'middle', size: w1 < 80 ? 10 : 11 }),
        lab(110 + w1 + w2 / 2, y + 22, `O ${s.o.toFixed(1)} g`, { a: 'middle', size: w2 < 60 ? 10 : 11 }),
        lab(110 + w1 + w2 + 10, y + 16, `total ${(s.mg + s.o).toFixed(1)} g`, {}),
        lab(110 + w1 + w2 + 10, y + 32, `Mg : O = ${s.mg} : ${s.o} = 3 : 2`, { w: 'bold' }),
      ];
    }),
    small(30, 220, 'Illustrative masses chosen for practice; the ratio is the same whatever the source.', {}),
  ].join(''),
);
