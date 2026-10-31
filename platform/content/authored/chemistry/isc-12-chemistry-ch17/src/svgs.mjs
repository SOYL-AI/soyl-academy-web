// Hand-drawn SVG schematics for ISC 12 Chemistry ch16–ch18 (from the CBSE 12 ch08 set; allow-listed elements, palette colours only).
import { svgDoc, S } from './lib.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
function atom(x, y, label, fill = 'var(--diagram-fill)', r = 12, size = 10) {
  return S.circle(x, y, r, { fill }) + S.text(x, y + 4, label, { a: 'middle', size });
}
function dbl(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  const ox = (-dy / len) * 2.5;
  const oy = (dx / len) * 2.5;
  return S.line(x1 + ox, y1 + oy, x2 + ox, y2 + oy, { w: 1.5 }) + S.line(x1 - ox, y1 - oy, x2 - ox, y2 - oy, { w: 1.5 });
}

// 1. The carbonyl group: trigonal planar, polar.
export const CARBONYL = svgDoc(
  340,
  170,
  'The carbonyl group. A carbon atom is joined by a double bond to an oxygen atom and by single bonds to two other groups, R and R′, with bond angles of about 120 degrees in one plane. Oxygen is more electronegative, so carbon carries a partial positive charge and oxygen a partial negative charge; a nucleophile attacks the carbon from above or below the plane.',
  [
    atom(150, 85, 'C', 'var(--diagram-fill)', 14, 11),
    atom(240, 85, 'O', 'var(--diagram-red)', 15, 11),
    dbl(164, 85, 225, 85),
    S.line(140, 75, 105, 40, { w: 1.5 }),
    S.line(140, 95, 105, 130, { w: 1.5 }),
    atom(96, 32, 'R', 'var(--diagram-fill)', 12, 10),
    atom(96, 138, 'R′', 'var(--diagram-fill)', 12, 10),
    lab(150, 60, 'δ+', { a: 'middle', size: 13, w: 'bold', c: 'var(--diagram-blue)' }),
    lab(240, 60, 'δ−', { a: 'middle', size: 13, w: 'bold', c: 'var(--diagram-red)' }),
    lab(118, 89, '120°', { size: 10, c: 'var(--diagram-accent)' }),
    S.arrow(190, 20, 160, 66, { c: 'var(--diagram-blue)', w: 2, size: 6 }),
    lab(196, 22, 'Nu⁻ attacks the carbon', { size: 10, c: 'var(--diagram-blue)' }),
    lab(170, 162, 'sp² carbon: planar, polar C=O', { a: 'middle', size: 10 }),
  ].join(''),
);

// 2. Nucleophilic addition in two steps.
export const NUCADD = svgDoc(
  360,
  150,
  'Nucleophilic addition to a carbonyl group in two steps. Step 1: the nucleophile attacks the carbonyl carbon, and the pi electrons move onto oxygen, giving a tetrahedral alkoxide intermediate. Step 2: the alkoxide oxygen takes a proton from the medium to give the addition product with an O–H group.',
  [
    atom(40, 70, 'C', 'var(--diagram-fill)', 12, 10),
    dbl(52, 70, 80, 70),
    atom(92, 70, 'O', 'var(--diagram-red)', 12, 10),
    lab(40, 30, 'Nu⁻', { a: 'middle', size: 11, c: 'var(--diagram-blue)', w: 'bold' }),
    S.arrow(40, 36, 40, 56, { c: 'var(--diagram-blue)', size: 5 }),
    S.arrow(112, 70, 140, 70, { size: 6 }),
    lab(126, 60, 'step 1', { a: 'middle', size: 10 }),
    atom(180, 75, 'C', 'var(--diagram-fill)', 12, 10),
    S.line(180, 63, 180, 42, { w: 1.5 }),
    lab(180, 36, 'Nu', { a: 'middle', size: 11, c: 'var(--diagram-blue)', w: 'bold' }),
    S.line(192, 75, 212, 75, { w: 1.5 }),
    atom(224, 75, 'O⁻', 'var(--diagram-red)', 12, 10),
    lab(200, 110, 'tetrahedral', { a: 'middle', size: 10 }),
    lab(200, 123, 'intermediate', { a: 'middle', size: 10 }),
    S.arrow(244, 75, 272, 75, { size: 6 }),
    lab(258, 64, 'H⁺', { a: 'middle', size: 10 }),
    atom(300, 75, 'C', 'var(--diagram-fill)', 12, 10),
    S.line(300, 63, 300, 42, { w: 1.5 }),
    lab(300, 36, 'Nu', { a: 'middle', size: 11, c: 'var(--diagram-blue)', w: 'bold' }),
    S.line(312, 75, 326, 75, { w: 1.5 }),
    atom(340, 75, 'OH', 'var(--diagram-red)', 13, 10),
    lab(320, 123, 'addition product', { a: 'middle', size: 10 }),
    lab(180, 145, 'sp² (planar) → sp³ (tetrahedral)', { a: 'middle', size: 10 }),
  ].join(''),
);

// 3. Resonance in the carboxylate ion.
export const CARBOXYLATE = svgDoc(
  340,
  150,
  'Two equivalent resonance structures of the carboxylate ion, R–COO⁻. In one, the negative charge is on the lower oxygen and the upper oxygen is double bonded; in the other, the roles are swapped. The real ion has the charge spread equally over both oxygen atoms and two equal C–O bonds.',
  [
    atom(70, 75, 'C', 'var(--diagram-fill)', 12, 10),
    S.line(58, 75, 28, 75, { w: 1.5 }),
    lab(18, 79, 'R', { a: 'middle', w: 'bold' }),
    dbl(78, 66, 98, 42),
    atom(105, 34, 'O', 'var(--diagram-red)', 12, 10),
    S.line(78, 84, 98, 108, { w: 1.5 }),
    atom(105, 116, 'O⁻', 'var(--diagram-red)', 12, 10),
    S.arrow(140, 75, 190, 75, { size: 6 }),
    S.arrow(190, 75, 140, 75, { size: 6 }),
    atom(250, 75, 'C', 'var(--diagram-fill)', 12, 10),
    S.line(238, 75, 208, 75, { w: 1.5 }),
    lab(198, 79, 'R', { a: 'middle', w: 'bold' }),
    S.line(258, 66, 278, 42, { w: 1.5 }),
    atom(285, 34, 'O⁻', 'var(--diagram-red)', 12, 10),
    dbl(258, 84, 278, 108),
    atom(285, 116, 'O', 'var(--diagram-red)', 12, 10),
    lab(170, 145, 'equivalent structures: charge shared by two O atoms', { a: 'middle', size: 10 }),
  ].join(''),
);
