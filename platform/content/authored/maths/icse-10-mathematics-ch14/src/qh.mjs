// Shared helpers for the ch14 question files: exact-fraction shorthands and the figures used inside questions.
import { Fr } from './fr.mjs';
import { steps, ARITH } from './work.mjs';
import { must, near, angDeg, lerp, draw, triSides, bptTri, trapezium, shadows, rightAlt } from './sim.mjs';

export const J = (lines) => lines.join('\n\n');
export const A = (lines) => steps(ARITH, lines);
export const W = (ctx, lines) => steps(ctx, lines);
export const fr = (v) => Fr.of(v);
export const rat = (a, b) => fr(a).div(fr(b));
export const allEq = (xs) => xs.every((x) => x.eq(xs[0]));
/** Ratio of corresponding sides if all three are equal, else null. */
export const sss = (s1, s2) => { const q = s1.map((x, i) => rat(x, s2[i])); return allEq(q) ? q[0] : null; };
/** The sides of a triangle named by vertex pairs correspond under a vertex map exactly when the images match. */
export const corresponds = (map, s1, s2) => [...s1].map((v) => map[v]).sort().join('') === [...s2].sort().join('');

// Trapezium ABCD, AB parallel to DC, diagonals meeting at O (no numbers on it).
export const figTrap = trapezium({ ab: 14, dc: 9, h: 5, off: 2, k: 0.5 }, 'A trapezium ABCD with AB parallel to DC. The diagonals AC and BD cross at O, which makes two triangles AOB and COD facing each other.', 'Trapezium $ABCD$ with $AB \\parallel DC$ and diagonals meeting at $O$.').fig;

// Triangle ABC (AB = 14, AC = 10, BC = 12) with P on AB, Q on AC, AP = 4, AQ = 5.6, so that angle APQ = angle ACB.
export const fig401 = (() => {
  const T = triSides(12, 10, 14);
  const P = lerp(T.A, T.B, 4 / 14), Q = lerp(T.A, T.C, 5.6 / 10);
  must(near(angDeg(P, T.A, Q), angDeg(T.C, T.A, T.B), 1e-9), 'angle APQ equals angle ACB (AP : AC = AQ : AB, common angle A)');
  must(near(Math.hypot(P[0] - Q[0], P[1] - Q[1]), (12 * 4) / 10, 1e-9), 'PQ = BC x AP / AC = 4.8');
  return draw({ pts: { ...T, P, Q }, k: 0.5, segs: [['A', 'P', '4'], ['P', 'B', '10'], ['B', 'C', '12'], ['P', 'Q', undefined, { dashed: true }]], angles: [['P', 'A', 'Q', undefined, { arcs: 1 }], ['C', 'A', 'B', undefined, { arcs: 1 }]], polys: [[['A', 'B', 'C']]], pos: { A: 'n', B: 'sw', C: 'se', P: 'w', Q: 'e' }, scaleUnit: 'cm' }, 'Triangle ABC with P on AB and Q on AC. The angle at P in triangle APQ and the angle at C in triangle ABC carry the same single arc, so they are equal. AP is 4, PB is 10 and BC is 12 centimetres.', 'The marked angles at $P$ and $C$ are equal. Lengths in cm.');
})();

// Question l01: DE parallel to BC, AD = 6, DB = 9, AE = 8 (EC = 12 hidden); triangle 15, 20, 25 has area 150.
export const figL01 = bptTri({ s: [25, 20, 15], m: 6, n: 9, k: 0.35, lab: { AD: '6', DB: '9', AE: '8' }, names: { E: 'E' } }, 'Triangle ABC with D on AB and E on AC and DE parallel to BC. AD is 6 centimetres, DB is 9 and AE is 8; the lengths EC and BC are not given.', 'Triangle $ABC$ with $DE \\parallel BC$. Lengths in cm.').fig;

// Question l02: trapezium with AB = 18, DC = 12, AC = 25 (D at (8, 15), C at (20, 15)); area of triangle AOB is 81.
export const figL02 = trapezium({ ab: 18, dc: 12, h: 15, off: 8, k: 0.3, lab: { AB: '18', DC: '12', AC: '25' } }, 'Trapezium ABCD with AB 18 centimetres at the bottom and DC 12 centimetres on top, parallel to it. The diagonal AC is 25 centimetres and the diagonals cross at O.', 'Trapezium $ABCD$, $AB \\parallel DC$; diagonals meet at $O$. Lengths in cm.').fig;

// Question l03: man (1.6, shadow 1.2) and tower (shadow 21): the tower is 28 tall.
export const figL03 = shadows({ h1: 1.6, s1: 1.2, h2: 28, s2: 21, gap: 3, k: 0.18, unit: 'm', lab: { h1: '1.6', s1: '1.2', s2: '21' } }, 'A man 1.6 metres tall casts a shadow 1.2 metres long, and a tower beside him casts a shadow 21 metres long in the same sunlight. The sun rays to the two shadow tips are parallel, so the two right triangles are similar.', 'Man $AB$ and tower $PQ$, shadows $AC$ and $PR$ (lengths in m).').fig;

// Question l04: right triangle ABC, right angle at B, AB = 15, BC = 20, AC = 25, BD perpendicular to AC.
export const figL04 = rightAlt({ ab: 15, bc: 20, k: 0.3, lab: { AB: '15', BC: '20', AC: '25' } }, 'Right-angled triangle ABC with the right angle at B, AB 15, BC 20 and hypotenuse AC 25 centimetres. The dashed line BD is drawn from B perpendicular to AC.', 'Right angle at $B$; $BD \\perp AC$. Lengths in cm.').fig;
