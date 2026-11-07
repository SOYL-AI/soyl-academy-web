// Build ISC 11 Mathematics ch04 Compound, Multiple and Sub-multiple Angles. Run from platform/:
//   npx tsx content/authored/maths/isc-11-mathematics-ch04/src/build.mjs
// ISC 2028 Class XI scope (Unit 1): addition and subtraction formulae (sin, cos, tan, cot of A +- B, tan(A + B + C)),
// double, triple, half and one-third angle formulae, sum and difference to product, product to sum or difference.
// Trigonometric equations and conditional identities are not in the ISC topic list for this chapter and are not taught.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, topic, deck, sl, table, flow, build, chapterTests } from './lib.mjs';
import { r, rn, D, S, C, T, PI, f4, f3, triple, angOf } from './h4.mjs';
import { fr, el, tx, sinD, cosD, tanD, add, sub, mul, div, eq, near, rad, holds1 } from './trig.mjs';
import { plotF, unitCircle } from './figs.mjs';
import { verifyAll } from './ids.mjs';

setUnit('isc-11-mathematics-ch04');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const must = (cond, msg) => { if (!cond) throw new Error(`self-check failed: ${msg}`); };
const IDSIZES = verifyAll();
await import('./questions.mjs');
await import('./questions2.mjs');
const one = el(1);
const half = (v) => mul(v, el(fr(1, 2)));
const R = rad;
const sq = (v) => mul(v, v);

// ================================================================ deck 1 visuals (t01, t02: addition, double, triple)
const route1 = flow('LR', [['a', 'Why sums of angles need formulae'], ['b', 'Sine and cosine of $A \\pm B$'], ['c', 'Tangent, cotangent, $A + B + C$'], ['d', 'Double angle $2x$'], ['e', 'Triple angle $3x$']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Route map of Part 1: why sums of angles need formulae, sine and cosine of A plus or minus B, tangent and cotangent and the three-angle sum, the double angle, and the triple angle.', 'Part 1 at a glance.');
// no shortcut table
const nsRows = [[30, 60], [45, 45], [20, 70], [50, 25]].map(([a, b]) => ({ a, b, l: S(R(a + b)), rr: S(R(a)) + S(R(b)) }));
must(nsRows.every((x) => Math.abs(x.l - x.rr) > 0.05), 'sine of a sum is not the sum of sines');
const tblNo = table(['Angles', '$\\sin(A + B)$', '$\\sin A + \\sin B$', 'Equal?'], nsRows.map((x) => [`$A = ${x.a}^\\circ$, $B = ${x.b}^\\circ$`, f4(x.l), f4(x.rr), 'No']), 'Table of four angle pairs showing that the sine of a sum is not the sum of the sines: for 30 and 60 degrees the left side is 1.0000 and the right side is 1.3660, and the other pairs also differ.', 'Sine does not distribute over a sum.');
// unit circle derivation
const A0 = 70, B0 = 25;
{
  const P = [C(R(A0)), S(R(A0))], Q = [C(R(B0)), S(R(B0))], X = [1, 0], Rr = [C(R(A0 - B0)), S(R(A0 - B0))];
  const d1 = Math.hypot(P[0] - Q[0], P[1] - Q[1]), d2 = Math.hypot(X[0] - Rr[0], X[1] - Rr[1]);
  must(near(d1, d2) && near(d1 * d1, 2 - 2 * (C(R(A0)) * C(R(B0)) + S(R(A0)) * S(R(B0)))) && near(d2 * d2, 2 - 2 * C(R(A0 - B0))), 'unit circle chord argument');
}
const figUC = unitCircle({ pts: [{ deg: A0, name: 'P', label: '$P$', pos: 'ne' }, { deg: B0, name: 'Q', label: '$Q$', pos: 'e' }, { deg: A0 - B0, name: 'R', label: '$R$', pos: 'ne' }], angle: { deg: A0, label: '$A$' }, chords: [['P', 'Q'], ['X', 'R']], alt: 'Unit circle with the points P at angle A, Q at angle B and R at angle A minus B measured from the positive x-axis. The chord PQ and the chord from the point (1, 0) to R are drawn; they subtend equal angles at the centre, so they have equal length.', caption: 'Chord $PQ$ = chord from $(1, 0)$ to $R$: this gives $\\cos(A - B)$.' });
// six formula table with numerical check
const a1 = R(75), b1 = R(40);
const rowsAdd = [
  ['$\\sin(A + B)$', '$\\sin A\\cos B + \\cos A\\sin B$', S(a1 + b1), S(a1) * C(b1) + C(a1) * S(b1)],
  ['$\\sin(A - B)$', '$\\sin A\\cos B - \\cos A\\sin B$', S(a1 - b1), S(a1) * C(b1) - C(a1) * S(b1)],
  ['$\\cos(A + B)$', '$\\cos A\\cos B - \\sin A\\sin B$', C(a1 + b1), C(a1) * C(b1) - S(a1) * S(b1)],
  ['$\\cos(A - B)$', '$\\cos A\\cos B + \\sin A\\sin B$', C(a1 - b1), C(a1) * C(b1) + S(a1) * S(b1)],
];
must(rowsAdd.every(([, , l, rr]) => near(l, rr, 1e-12)), 'sin cos addition rows');
const tblAdd = table(['Left side', 'Right side', 'Left at $75^\\circ, 40^\\circ$', 'Right at $75^\\circ, 40^\\circ$'], rowsAdd.map(([a, b, l, rr]) => [a, b, f4(l), f4(rr)]), 'Table of the four sine and cosine addition formulae with a numerical check at A equal 75 degrees and B equal 40 degrees: for instance sine of 115 degrees is 0.9063 and equals sine 75 cosine 40 plus cosine 75 sine 40.', 'Cosine changes the sign between the two products; sine keeps it.');
// tan and cot table
const tblTan = table(['Formula', 'Valid when'], [
  [D('\\tan(A + B) = \\dfrac{\\tan A + \\tan B}{1 - \\tan A\\tan B}'), D('A,\\ B,\\ A + B \\ne (2n + 1)\\dfrac{\\pi}{2}') + ' and ' + D('\\tan A\\tan B \\ne 1')],
  [D('\\tan(A - B) = \\dfrac{\\tan A - \\tan B}{1 + \\tan A\\tan B}'), D('A,\\ B,\\ A - B \\ne (2n + 1)\\dfrac{\\pi}{2}') + ' and ' + D('\\tan A\\tan B \\ne -1')],
  [D('\\cot(A + B) = \\dfrac{\\cot A\\cot B - 1}{\\cot B + \\cot A}'), D('A,\\ B,\\ A + B \\ne n\\pi') + ' and ' + D('\\cot A + \\cot B \\ne 0')],
  [D('\\cot(A - B) = \\dfrac{\\cot A\\cot B + 1}{\\cot B - \\cot A}'), D('A,\\ B,\\ A - B \\ne n\\pi') + ' and ' + D('\\cot B \\ne \\cot A')],
], 'Table of the tangent and cotangent addition and subtraction formulae with their validity conditions: the angles and their sum or difference must lie where the function is defined, and the denominator must not be zero.', 'Each quotient formula needs its denominator to be non-zero.');
// WE1: exact sin 75 and tan 15
must(eq(sinD(75), add(mul(sinD(45), cosD(30)), mul(cosD(45), sinD(30)))) && eq(tanD(15), div(sub(tanD(60), tanD(45)), add(one, mul(tanD(60), tanD(45))))) && eq(tanD(15), el(2, 0, -1)) && near(S(R(75)), 0.9659258262890683), 'WE1 exact values');
const we1 = table(['Value', 'Split of the angle', 'Working', 'Result'], [
  [D('\\sin 75^\\circ'), D('45^\\circ + 30^\\circ'), D('\\sin 45^\\circ\\cos 30^\\circ + \\cos 45^\\circ\\sin 30^\\circ'), D(tx(sinD(75)))],
  [D('\\tan 15^\\circ'), D('60^\\circ - 45^\\circ'), D('\\dfrac{\\tan 60^\\circ - \\tan 45^\\circ}{1 + \\tan 60^\\circ\\tan 45^\\circ} = \\dfrac{\\sqrt{3} - 1}{1 + \\sqrt{3}}'), D(tx(tanD(15)))],
], 'Worked example 1 table: sine of 75 degrees from 45 plus 30 degrees equals root 6 plus root 2 over 4, and tangent of 15 degrees from 60 minus 45 degrees equals 2 minus root 3.', 'Choose a split into angles whose values you know.');
// WE2: sin A = 12/37 (acute), cos B = -16/65 (second quadrant)
const sA = fr(12, 37), cA = fr(35, 37), cB = fr(-16, 65), sB = fr(63, 65);
const sAB = sA.mul(cB).add(cA.mul(sB)), cAB = cA.mul(cB).sub(sA.mul(sB));
{
  const A = Math.asin(12 / 37), B = Math.acos(-16 / 65);
  must(near(C(A), 35 / 37) && near(S(B), 63 / 65) && near(S(A + B), sAB.v) && near(C(A + B), cAB.v) && sAB.eq(fr(2013, 2405)) && cAB.eq(fr(-1316, 2405)) && sAB.v > 0 && cAB.v < 0 && sAB.mul(sAB).add(cAB.mul(cAB)).eq(fr(1)), 'WE2 values');
}
const we2 = table(['Quantity', 'Value', 'Reason'], [
  [D('\\cos A'), D(cA.tex()), 'acute angle: cosine positive'],
  [D('\\sin B'), D(sB.tex()), 'second quadrant: sine positive'],
  [D('\\sin(A + B)'), D(sAB.tex()), D('\\sin A\\cos B + \\cos A\\sin B')],
  [D('\\cos(A + B)'), D(cAB.tex()), D('\\cos A\\cos B - \\sin A\\sin B')],
], 'Worked example 2 table: sine A is 12 over 37 with A acute, cosine B is minus 16 over 65 with B in the second quadrant. Then cosine A is 35 over 37, sine B is 63 over 65, sine of A plus B is 2013 over 2405 and cosine of A plus B is minus 1316 over 2405, so A plus B is in the second quadrant.', 'Sine positive and cosine negative: $A + B$ lies in quadrant II.');
// tan(A + B + C)
const [tA, tB, tC] = [R(40), R(65), R(75)];
const sumT = T(tA) + T(tB) + T(tC), prodT = T(tA) * T(tB) * T(tC);
must(near(sumT, prodT, 1e-12) && near(T(tA + tB + tC), 0, 1e-9), 'tan A + tan B + tan C');
const tblABC = table(['Case', 'Result', 'Numerical check'], [
  ['Any $A, B, C$', D('\\tan(A + B + C) = \\dfrac{\\tan A + \\tan B + \\tan C - \\tan A\\tan B\\tan C}{1 - \\tan A\\tan B - \\tan B\\tan C - \\tan C\\tan A}'), 'defined when the denominator is not zero'],
  [D('A + B + C = 180^\\circ'), D('\\tan A + \\tan B + \\tan C = \\tan A\\tan B\\tan C'), `$40^\\circ, 65^\\circ, 75^\\circ$: sum ${f4(sumT)}, product ${f4(prodT)}`],
], 'Table for the sum of three angles: the general formula for tangent of A plus B plus C, and the special case A plus B plus C equal to 180 degrees where the sum of the tangents equals their product; for 40, 65 and 75 degrees both are 6.7157.', 'The special case follows because $\\tan 180^\\circ = 0$.');
// WE3: sin(A + B)/(cos A cos B) = tan A + tan B
{
  const a = R(35), b = R(20);
  must(near(S(a + b) / (C(a) * C(b)), T(a) + T(b), 1e-12) && holds1((x) => S(x + 0.4) / (C(x) * C(0.4)), (x) => T(x) + T(0.4)), 'WE3 identity');
}
const we3 = table(['Step', 'Working'], [
  ['Expand the numerator', D('\\dfrac{\\sin A\\cos B + \\cos A\\sin B}{\\cos A\\cos B}')],
  ['Split the fraction', D('\\dfrac{\\sin A\\cos B}{\\cos A\\cos B} + \\dfrac{\\cos A\\sin B}{\\cos A\\cos B}')],
  ['Cancel', D('\\dfrac{\\sin A}{\\cos A} + \\dfrac{\\sin B}{\\cos B} = \\tan A + \\tan B')],
  ['Numerical check', `$A = 35^\\circ$, $B = 20^\\circ$: both sides ${f4(S(R(55)) / (C(R(35)) * C(R(20))))}`],
], `Worked example 3 table proving that sine of A plus B over cosine A cosine B equals tangent A plus tangent B: expand the numerator, split the fraction, cancel; at A equal 35 degrees and B equal 20 degrees both sides equal ${f4(S(R(55)) / (C(R(35)) * C(R(20))))}.`, 'Left side to right side in three moves.');
// double angle
const tblDbl = table(['Quantity', 'Formulae', 'Comes from'], [
  [D('\\sin 2x'), D('2\\sin x\\cos x = \\dfrac{2\\tan x}{1 + \\tan^2 x}'), D('\\sin(x + x)')],
  [D('\\cos 2x'), D('\\cos^2 x - \\sin^2 x = 2\\cos^2 x - 1 = 1 - 2\\sin^2 x = \\dfrac{1 - \\tan^2 x}{1 + \\tan^2 x}'), D('\\cos(x + x)')],
  [D('\\tan 2x'), D('\\dfrac{2\\tan x}{1 - \\tan^2 x}'), D('\\tan(x + x)')],
], 'Table of the double angle formulae, each obtained by putting B equal to A in the addition formulae: sine 2x, the four forms of cosine 2x, and tangent 2x.', 'Choose the cosine form that uses what is given.');
const pDbl = plotF({ x: [0, 6.6], y: [-1.5, 1.5], fns: [{ expr: 'sin(2x)', label: '$y = \\sin 2x$' }, { expr: '2sin(x)cos(x)', label: '$y = 2\\sin x\\cos x$' }], pts: [[PI / 4, 1, '$\\left(\\dfrac{\\pi}{4}, 1\\right)$'], [3 * PI / 4, -1, '$\\left(\\dfrac{3\\pi}{4}, -1\\right)$'], [5 * PI / 4, 1, '$\\left(\\dfrac{5\\pi}{4}, 1\\right)$'], [7 * PI / 4, -1, '$\\left(\\dfrac{7\\pi}{4}, -1\\right)$']] }, 'The graphs of y equal sine 2x and y equal 2 sine x cosine x from 0 to 6.6. They are one and the same curve: two full waves between 0 and 2 pi, with peaks of height 1 at pi over 4 and 5 pi over 4 and troughs of depth minus 1 at 3 pi over 4 and 7 pi over 4.', 'The two expressions draw the same wave of period $\\pi$.');
must(holds1((x) => S(2 * x), (x) => 2 * S(x) * C(x), Array.from({ length: 700 }, (_, k) => k * 0.0094)), 'plot sin 2x');
// WE4: cos x = -7/25, x in quadrant III
const dc = fr(-7, 25), ds = fr(-24, 25);
const d2s = fr(2).mul(ds).mul(dc), d2c = dc.mul(dc).sub(ds.mul(ds)), d2t = d2s.div(d2c);
{
  const x = angOf(ds, dc);
  must(x > PI && x < 1.5 * PI && near(C(x), -7 / 25) && near(S(2 * x), d2s.v) && near(C(2 * x), d2c.v) && near(T(2 * x), d2t.v) && d2s.eq(fr(336, 625)) && d2c.eq(fr(-527, 625)) && d2t.eq(fr(-336, 527)) && d2c.eq(fr(2).mul(dc).mul(dc).sub(fr(1))), 'WE4 double angle');
}
const we4 = table(['Quantity', 'Working', 'Value'], [
  [D('\\sin x'), 'third quadrant: sine negative, from ' + D('\\sin^2 x = 1 - \\dfrac{49}{625}'), D(ds.tex())],
  [D('\\sin 2x'), D('2\\sin x\\cos x = 2\\left(-\\dfrac{24}{25}\\right)\\left(-\\dfrac{7}{25}\\right)'), D(d2s.tex())],
  [D('\\cos 2x'), D('2\\cos^2 x - 1 = \\dfrac{98}{625} - 1'), D(d2c.tex())],
  [D('\\tan 2x'), D('\\dfrac{\\sin 2x}{\\cos 2x}'), D(d2t.tex())],
], 'Worked example 4 table: cosine x is minus 7 over 25 with x in the third quadrant. Then sine x is minus 24 over 25, sine 2x is 336 over 625, cosine 2x is minus 527 over 625 and tangent 2x is minus 336 over 527.', 'The sign of $\\sin x$ comes from the quadrant of $x$.');
// triple angle
const tblTri = table(['Quantity', 'Formula', 'Derivation'], [
  [D('\\sin 3x'), D('3\\sin x - 4\\sin^3 x'), D('\\sin(2x + x)') + ', then ' + D('\\cos^2 x = 1 - \\sin^2 x')],
  [D('\\cos 3x'), D('4\\cos^3 x - 3\\cos x'), D('\\cos(2x + x)') + ', then ' + D('\\sin^2 x = 1 - \\cos^2 x')],
  [D('\\tan 3x'), D('\\dfrac{3\\tan x - \\tan^3 x}{1 - 3\\tan^2 x}'), D('\\tan(2x + x)')],
], 'Table of the triple angle formulae: sine 3x is 3 sine x minus 4 sine cubed x, cosine 3x is 4 cosine cubed x minus 3 cosine x, and tangent 3x is 3 tangent x minus tangent cubed x over 1 minus 3 tangent squared x; each comes from writing 3x as 2x plus x.', 'Write $3x = 2x + x$ and use the double angle formulae.');
const pTri = plotF({ x: [0, 6.5], y: [-1.5, 1.5], fns: [{ expr: 'cos(3x)', label: '$y = \\cos 3x$' }, { expr: '4cos(x)^3 - 3cos(x)', label: '$y = 4\\cos^3 x - 3\\cos x$' }], pts: [[0, 1, '$(0, 1)$'], [PI / 3, -1, '$\\left(\\dfrac{\\pi}{3}, -1\\right)$'], [2 * PI / 3, 1, '$\\left(\\dfrac{2\\pi}{3}, 1\\right)$'], [PI, -1, '$(\\pi, -1)$'], [4 * PI / 3, 1, '$\\left(\\dfrac{4\\pi}{3}, 1\\right)$'], [5 * PI / 3, -1, '$\\left(\\dfrac{5\\pi}{3}, -1\\right)$']] }, 'The graphs of y equal cosine 3x and y equal 4 cosine cubed x minus 3 cosine x from 0 to 6.5. They coincide: three full waves between 0 and 2 pi, with value 1 at 0, 2 pi over 3 and 4 pi over 3 and value minus 1 at pi over 3, pi and 5 pi over 3.', 'Three waves in $2\\pi$: the cubic in $\\cos x$ draws the same curve.');
must(holds1((x) => C(3 * x), (x) => 4 * C(x) ** 3 - 3 * C(x), Array.from({ length: 700 }, (_, k) => k * 0.0094)), 'plot cos 3x');
// WE5: cos 3A = cos A (2 cos 2A - 1)
{
  const a = R(25);
  must(near(C(3 * a), C(a) * (2 * C(2 * a) - 1), 1e-12), 'WE5 numeric');
}
const we5 = table(['Step', 'Working'], [
  ['Start from the triple angle formula', D('\\cos 3A = 4\\cos^3 A - 3\\cos A = \\cos A\\,(4\\cos^2 A - 3)')],
  ['Rewrite the bracket', D('4\\cos^2 A - 3 = 2(2\\cos^2 A - 1) - 1 = 2\\cos 2A - 1')],
  ['Conclusion', D('\\cos 3A = \\cos A\\,(2\\cos 2A - 1)')],
  ['Numerical check', `$A = 25^\\circ$: left ${f4(C(R(75)))}, right ${f4(C(R(25)) * (2 * C(R(50)) - 1))}`],
], 'Worked example 5 table proving that cosine 3A equals cosine A times the bracket 2 cosine 2A minus 1: factor cosine A from the triple angle formula, rewrite the bracket with the double angle formula, and check at A equal 25 degrees where both sides are 0.2588.', 'The check at $25^\\circ$ agrees to four places.');
const summary1 = flow('LR', [['a', 'Addition: $\\sin$, $\\cos$, $\\tan$, $\\cot$ of $A \\pm B$'], ['b', 'Put $B = A$: double angle'], ['c', 'Use $2x + x$: triple angle'], ['d', 'Check by a numerical angle']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Summary flow of Part 1: the addition formulae, the double angle formulae from B equal to A, the triple angle formulae from 2x plus x, and a numerical check at a chosen angle.', 'Part 1 in one line.');
const tips1 = table(['Question type', 'How ISC marks are usually given'], [['Exact value (2)', 'split of the angle 1, correct surd 1'], ['Given $\\sin A$, $\\cos B$ (3)', 'missing ratios 1, formula 1, answer 1'], ['Prove an identity (3)', 'expansion 1, simplification 1, conclusion 1'], ['Multiple angle value (2-3)', 'formula chosen 1, substitution 1, answer 1']], 'Exam tips table for Part 1: exact values earn the split and the surd, given-ratio questions earn the missing ratios, the formula and the answer, identities earn the expansion, simplification and conclusion, and multiple angle values earn the formula, substitution and answer.', 'Always find the missing ratio with the correct sign.');

// ================================================================ deck 2 visuals (t02: half and one-third, t03, t04)
const route2 = flow('LR', [['a', 'Half-angle formulae'], ['b', 'One-third angle'], ['c', 'Sum to product'], ['d', 'Product to sum']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Route map of Part 2: half-angle formulae, one-third angle formulae, sums of sines and cosines turned into products, and products turned into sums.', 'Part 2 at a glance.');
const x100 = R(100);
const hrows = [
  ['$\\sin^2\\dfrac{x}{2}$', '$\\dfrac{1 - \\cos x}{2}$', S(x100 / 2) ** 2, (1 - C(x100)) / 2],
  ['$\\cos^2\\dfrac{x}{2}$', '$\\dfrac{1 + \\cos x}{2}$', C(x100 / 2) ** 2, (1 + C(x100)) / 2],
  ['$\\tan^2\\dfrac{x}{2}$', '$\\dfrac{1 - \\cos x}{1 + \\cos x}$', T(x100 / 2) ** 2, (1 - C(x100)) / (1 + C(x100))],
  ['$\\tan\\dfrac{x}{2}$', '$\\dfrac{1 - \\cos x}{\\sin x} = \\dfrac{\\sin x}{1 + \\cos x}$', T(x100 / 2), S(x100) / (1 + C(x100))],
];
must(hrows.every(([, , l, rr]) => near(l, rr, 1e-12)) && near(T(x100 / 2), (1 - C(x100)) / S(x100), 1e-12), 'half-angle rows');
const tblHalf = table(['Left side', 'Right side', 'Left at $x = 100^\\circ$', 'Right at $x = 100^\\circ$'], hrows.map(([a, b, l, rr]) => [a, b, f4(l), f4(rr)]), 'Table of the half-angle formulae with a numerical check at x equal 100 degrees: sine squared of 50 degrees is 0.5868, cosine squared is 0.4132, tangent squared is 1.4203 and tangent is 1.1918, each on both sides.', 'Half-angle values come as squares, so the sign needs a separate decision.');
// sign table for half angles
const signOf = (v) => (v > 0 ? '$+$' : '$-$');
const signRows = [[0, 90], [90, 180], [180, 270], [270, 360]].map(([lo, hi]) => {
  const xs = [0.2, 0.5, 0.8].map((t) => R(lo + (hi - lo) * t) / 2);
  const sg = (g) => { const s = xs.map((x) => Math.sign(g(x))); must(s.every((v) => v === s[0]), 'sign constant'); return s[0]; };
  const quad = lo / 2 < 90 && hi / 2 <= 90 ? 'I' : 'II';
  must((quad === 'I') === (sg(S) > 0 && sg(C) > 0), 'quadrant of the half-angle');
  return [`$${lo}^\\circ < x < ${hi}^\\circ$`, `$${lo / 2}^\\circ < \\dfrac{x}{2} < ${hi / 2}^\\circ$`, quad, signOf(sg(S)), signOf(sg(C)), signOf(sg(T))];
});
const tblSign = table(['Range of $x$', 'Range of $\\dfrac{x}{2}$', 'Quadrant', '$\\sin\\dfrac{x}{2}$', '$\\cos\\dfrac{x}{2}$', '$\\tan\\dfrac{x}{2}$'], signRows, 'Table of the signs of the half-angle ratios for x between 0 and 360 degrees: half of x lies in the first quadrant when x is below 180 degrees, where all three ratios are positive, and in the second quadrant when x is between 180 and 360 degrees, where sine is positive and cosine and tangent are negative.', 'Decide the quadrant of $\\dfrac{x}{2}$ first, then the sign.');
// WE1 half: 22.5 degrees
{
  const s2 = half(sub(one, cosD(45))), c2 = half(add(one, cosD(45)));
  must(eq(s2, el(fr(1, 2), fr(-1, 4))) && eq(c2, el(fr(1, 2), fr(1, 4))) && near(S(R(22.5)) ** 2, (1 / 2 - Math.SQRT2 / 4), 1e-12) && near(C(R(22.5)), Math.sqrt(2 + Math.SQRT2) / 2, 1e-12) && near(S(R(22.5)), Math.sqrt(2 - Math.SQRT2) / 2, 1e-12) && eq(div(sinD(45), add(one, cosD(45))), el(-1, 1)) && near(T(R(22.5)), Math.SQRT2 - 1, 1e-12), 'WE1 half-angle');
}
const we1h = table(['Value', 'Half-angle formula with $x = 45^\\circ$', 'Result'], [
  [D('\\cos 22.5^\\circ'), D('\\cos^2 22.5^\\circ = \\dfrac{1 + \\cos 45^\\circ}{2} = \\dfrac{2 + \\sqrt{2}}{4}'), D('\\dfrac{\\sqrt{2 + \\sqrt{2}}}{2}')],
  [D('\\sin 22.5^\\circ'), D('\\sin^2 22.5^\\circ = \\dfrac{1 - \\cos 45^\\circ}{2} = \\dfrac{2 - \\sqrt{2}}{4}'), D('\\dfrac{\\sqrt{2 - \\sqrt{2}}}{2}')],
  [D('\\tan 22.5^\\circ'), D('\\dfrac{\\sin 45^\\circ}{1 + \\cos 45^\\circ} = \\dfrac{\\sqrt{2}/2}{1 + \\sqrt{2}/2}'), D('\\sqrt{2} - 1')],
], 'Worked example 1 table: using x equal 45 degrees in the half-angle formulae, cosine 22.5 degrees is root of 2 plus root 2 over 2, sine 22.5 degrees is root of 2 minus root 2 over 2, and tangent 22.5 degrees is root 2 minus 1; the angle is acute, so every root is positive.', 'An acute angle takes the positive root.');
// WE2 half: cos x = 7/25, 270 < x < 360
const hc = fr(7, 25);
const hs = fr(1).sub(hc).mul(fr(1, 2)), hcc = fr(1).add(hc).mul(fr(1, 2));
{
  const x = 2 * PI - Math.acos(7 / 25);
  must(x > 1.5 * PI && x < 2 * PI && hs.eq(fr(9, 25)) && hcc.eq(fr(16, 25)) && near(S(x / 2), 3 / 5, 1e-12) && near(C(x / 2), -4 / 5, 1e-12) && near(T(x / 2), -3 / 4, 1e-12) && x / 2 > PI / 2 && x / 2 < PI, 'WE2 half-angle');
}
const we2h = table(['Quantity', 'Working', 'Value'], [
  [D('\\dfrac{x}{2}'), D('135^\\circ < \\dfrac{x}{2} < 180^\\circ'), 'second quadrant'],
  [D('\\sin\\dfrac{x}{2}'), D('\\sqrt{\\dfrac{1 - 7/25}{2}} = \\sqrt{\\dfrac{9}{25}}'), D('\\dfrac{3}{5}')],
  [D('\\cos\\dfrac{x}{2}'), D('-\\sqrt{\\dfrac{1 + 7/25}{2}} = -\\sqrt{\\dfrac{16}{25}}'), D('-\\dfrac{4}{5}')],
  [D('\\tan\\dfrac{x}{2}'), D('\\dfrac{\\sin(x/2)}{\\cos(x/2)}'), D('-\\dfrac{3}{4}')],
], 'Worked example 2 table: cosine x is 7 over 25 with x between 270 and 360 degrees, so x over 2 is in the second quadrant; sine of x over 2 is 3 over 5, cosine of x over 2 is minus 4 over 5 and tangent of x over 2 is minus 3 over 4.', 'Quadrant first: in quadrant II cosine and tangent are negative.');
// one-third angle
const tblThird = table(['Relation', 'With $y = \\dfrac{x}{3}$', 'Cubic satisfied by the unknown'], [
  [D('\\sin x'), D('3\\sin y - 4\\sin^3 y'), D('4s^3 - 3s + \\sin x = 0') + ', ' + D('s = \\sin\\dfrac{x}{3}')],
  [D('\\cos x'), D('4\\cos^3 y - 3\\cos y'), D('4c^3 - 3c - \\cos x = 0') + ', ' + D('c = \\cos\\dfrac{x}{3}')],
  [D('\\tan x'), D('\\dfrac{3\\tan y - \\tan^3 y}{1 - 3\\tan^2 y}'), D('t^3 - 3\\tan x\\,t^2 - 3t + \\tan x = 0') + ', ' + D('t = \\tan\\dfrac{x}{3}')],
], 'Table of the one-third angle relations: the triple angle formulae read with y equal x over 3, which turn sine x, cosine x and tangent x into cubics satisfied by sine, cosine and tangent of x over 3.', 'The triple angle formula, read backwards, is a cubic for $x/3$.');
{
  const x = R(37), t = T(x / 3);
  must(near(t ** 3 - 3 * T(x) * t * t - 3 * t + T(x), 0, 1e-9) && near(4 * S(x / 3) ** 3 - 3 * S(x / 3) + S(x), 0, 1e-12) && near(4 * C(x / 3) ** 3 - 3 * C(x / 3) - C(x), 0, 1e-12), 'third-angle cubics');
}
// WE3: cos 20 is a root of 8c^3 - 6c - 1 = 0
const roots = [20, 140, 260].map((d) => C(R(d)));
const cub = (c) => 8 * c ** 3 - 6 * c - 1;
must(roots.every((c) => Math.abs(cub(c)) < 1e-12) && near(roots[0] + roots[1] + roots[2], 0, 1e-12) && near(roots[0] * roots[1] * roots[2], 1 / 8, 1e-12) && near(C(R(60)), 0.5, 1e-12), 'cubic roots');
const we3t = table(['Angle $\\theta$', '$\\cos 3\\theta$', '$c = \\cos\\theta$', '$8c^3 - 6c - 1$'], [20, 140, 260].map((d, i) => [`$${d}^\\circ$`, `$\\cos ${3 * d}^\\circ = ${f4(C(R(3 * d)))}$`, f4(roots[i]), f4(cub(roots[i])).replace('-0.0000', '0.0000')]), 'Worked example 3 table: for 20, 140 and 260 degrees the angle 3 theta is 60, 420 and 780 degrees, all with cosine one half, so cosine theta is a root of 8c cubed minus 6c minus 1; the values 0.9397, minus 0.1736 and minus 0.7660 each give 0 in the cubic.', 'Three angles, one cubic: the roots sum to $0$ and multiply to $\\dfrac{1}{8}$.');
const pCub = plotF({ x: [-1.2, 1.2], y: [-4, 4], fns: [{ expr: '8x^3 - 6x - 1', label: '$y = 8x^3 - 6x - 1$' }], pts: [[roots[1], 0, '$x = \\cos 140^\\circ$'], [roots[0], 0, '$x = \\cos 20^\\circ$'], [roots[2], 0, '$x = \\cos 260^\\circ$']] }, 'Graph of y equal 8 x cubed minus 6 x minus 1 for x from minus 1.2 to 1.2. The curve crosses the x-axis three times, at about minus 0.766, minus 0.174 and 0.940, which are the cosines of 140, 260 and 20 degrees.', 'The three roots are $\\cos 20^\\circ$, $\\cos 140^\\circ$ and $\\cos 260^\\circ$.');
// sum to product
const cc = R(110), dd = R(30);
const prows = [
  ['$\\sin C + \\sin D$', '$2\\sin\\dfrac{C + D}{2}\\cos\\dfrac{C - D}{2}$', S(cc) + S(dd), 2 * S((cc + dd) / 2) * C((cc - dd) / 2)],
  ['$\\sin C - \\sin D$', '$2\\cos\\dfrac{C + D}{2}\\sin\\dfrac{C - D}{2}$', S(cc) - S(dd), 2 * C((cc + dd) / 2) * S((cc - dd) / 2)],
  ['$\\cos C + \\cos D$', '$2\\cos\\dfrac{C + D}{2}\\cos\\dfrac{C - D}{2}$', C(cc) + C(dd), 2 * C((cc + dd) / 2) * C((cc - dd) / 2)],
  ['$\\cos C - \\cos D$', '$-2\\sin\\dfrac{C + D}{2}\\sin\\dfrac{C - D}{2}$', C(cc) - C(dd), -2 * S((cc + dd) / 2) * S((cc - dd) / 2)],
];
must(prows.every(([, , l, rr]) => near(l, rr, 1e-12)), 'sum to product rows');
const tblSP = table(['Left side', 'Right side', 'Left at $110^\\circ, 30^\\circ$', 'Right at $110^\\circ, 30^\\circ$'], prows.map(([a, b, l, rr]) => [a, b, f4(l), f4(rr)]), 'Table of the four sum and difference to product formulae with a check at C equal 110 degrees and D equal 30 degrees: for example sine 110 plus sine 30 is 1.4397 on both sides, and cosine 110 minus cosine 30 is minus 1.2080 on both sides.', 'Only $\\cos C - \\cos D$ has a minus sign in front.');
const pBeat = plotF({ x: [0, 6.4], y: [-2.5, 2.5], fns: [{ expr: 'sin(5x) + sin(3x)', label: '$y = \\sin 5x + \\sin 3x$' }, { expr: '2cos(x)', label: '$y = 2\\cos x$' }, { expr: '-2cos(x)', label: '$y = -2\\cos x$' }], pts: [] }, 'The graph of y equal sine 5x plus sine 3x from 0 to 6.4 with the curves y equal 2 cosine x and y equal minus 2 cosine x. The fast wave sine 4x is enclosed by these two slow curves, because the sum equals 2 sine 4x cosine x.', 'The product form shows the slow envelope $\\pm 2\\cos x$ and the fast wave $\\sin 4x$.');
must(holds1((x) => S(5 * x) + S(3 * x), (x) => 2 * S(4 * x) * C(x), Array.from({ length: 700 }, (_, k) => k * 0.0094)) && Array.from({ length: 700 }, (_, k) => k * 0.0094).every((x) => Math.abs(S(5 * x) + S(3 * x)) <= 2 * Math.abs(C(x)) + 1e-12), 'beats plot');
// WE4: (sin 7x + sin 3x)/(cos 7x + cos 3x) = tan 5x
{
  const x = R(8);
  must(near((S(7 * x) + S(3 * x)) / (C(7 * x) + C(3 * x)), T(5 * x), 1e-12) && holds1((x) => (S(7 * x) + S(3 * x)) / (C(7 * x) + C(3 * x)), (x) => T(5 * x)), 'WE4 identity');
}
const we4p = table(['Step', 'Working'], [
  ['Numerator', D('\\sin 7x + \\sin 3x = 2\\sin 5x\\cos 2x')],
  ['Denominator', D('\\cos 7x + \\cos 3x = 2\\cos 5x\\cos 2x')],
  ['Divide and cancel', D('\\dfrac{2\\sin 5x\\cos 2x}{2\\cos 5x\\cos 2x} = \\tan 5x')],
  ['Numerical check', `$x = 8^\\circ$: both sides ${f4(T(R(40)))}`],
], 'Worked example 4 table proving that sine 7x plus sine 3x over cosine 7x plus cosine 3x equals tangent 5x: turn the numerator and the denominator into products, cancel 2 cosine 2x, and check at x equal 8 degrees where both sides are 0.8391.', 'Pair the angles so that the half-sum is the same in both.');
// product to sum
const pa = R(65), pb = R(20);
const qrows = [
  ['$2\\sin A\\cos B$', '$\\sin(A + B) + \\sin(A - B)$', 2 * S(pa) * C(pb), S(pa + pb) + S(pa - pb)],
  ['$2\\cos A\\sin B$', '$\\sin(A + B) - \\sin(A - B)$', 2 * C(pa) * S(pb), S(pa + pb) - S(pa - pb)],
  ['$2\\cos A\\cos B$', '$\\cos(A + B) + \\cos(A - B)$', 2 * C(pa) * C(pb), C(pa + pb) + C(pa - pb)],
  ['$2\\sin A\\sin B$', '$\\cos(A - B) - \\cos(A + B)$', 2 * S(pa) * S(pb), C(pa - pb) - C(pa + pb)],
];
must(qrows.every(([, , l, rr]) => near(l, rr, 1e-12)), 'product to sum rows');
const tblPS = table(['Product', 'Sum or difference', 'Left at $65^\\circ, 20^\\circ$', 'Right at $65^\\circ, 20^\\circ$'], qrows.map(([a, b, l, rr]) => [a, b, f4(l), f4(rr)]), `Table of the four product to sum formulae with a check at A equal 65 degrees and B equal 20 degrees: for example 2 sine 65 cosine 20 is ${f4(qrows[0][2])} and equals sine 85 plus sine 45, also ${f4(qrows[0][3])}.`, 'Add or subtract the two addition formulae to get these.');
// WE5: exact products
const exP = [
  { lhs: mul(cosD(75), cosD(15)), rhs: half(add(cosD(90), cosD(60))), tex: '\\cos 75^\\circ\\cos 15^\\circ', how: '\\dfrac{1}{2}\\left[\\cos 90^\\circ + \\cos 60^\\circ\\right]' },
  { lhs: mul(sinD(105), cosD(45)), rhs: half(add(sinD(150), sinD(60))), tex: '\\sin 105^\\circ\\cos 45^\\circ', how: '\\dfrac{1}{2}\\left[\\sin 150^\\circ + \\sin 60^\\circ\\right]' },
  { lhs: mul(sinD(135), sinD(15)), rhs: half(sub(cosD(120), cosD(150))), tex: '\\sin 135^\\circ\\sin 15^\\circ', how: '\\dfrac{1}{2}\\left[\\cos 120^\\circ - \\cos 150^\\circ\\right]' },
];
must(exP.every((e) => eq(e.lhs, e.rhs)) && eq(exP[0].lhs, el(fr(1, 4))) && eq(exP[1].lhs, el(fr(1, 4), 0, fr(1, 4))) && eq(exP[2].lhs, el(fr(-1, 4), 0, fr(1, 4))), 'WE5 exact products');
const we5p = table(['Product', 'Product to sum', 'Exact value'], exP.map((e) => [D(e.tex), D(e.how), D(tx(e.lhs))]), 'Worked example 5 table: cosine 75 cosine 15 equals one quarter, sine 105 cosine 45 equals 1 plus root 3 over 4, and sine 135 sine 15 equals root 3 minus 1 over 4, each found by turning the product into a sum of values at 90, 150, 60, 120 and 150 degrees.', 'Each product is evaluated without using the value of either factor.');
const pPS = plotF({ x: [0, 6.4], y: [-2.5, 2.5], fns: [{ expr: 'cos(x) - cos(5x)', label: '$y = \\cos x - \\cos 5x$' }, { expr: '2sin(3x)sin(2x)', label: '$y = 2\\sin 3x\\sin 2x$' }], pts: [] }, 'The graphs of y equal cosine x minus cosine 5x and y equal 2 sine 3x sine 2x from 0 to 6.4. The two curves lie on top of each other, a wave of height up to 2 that changes sign as sine 2x does.', 'Sum or product: one curve, two descriptions.');
must(holds1((x) => C(x) - C(5 * x), (x) => 2 * S(3 * x) * S(2 * x), Array.from({ length: 700 }, (_, k) => k * 0.0094)), 'plot cos x - cos 5x');
// WE6: (cos 2A - cos 6A)/(sin 6A + sin 2A) = tan 2A
{
  must(holds1((x) => (C(2 * x) - C(6 * x)) / (S(6 * x) + S(2 * x)), (x) => T(2 * x)) && near((C(R(22)) - C(R(66))) / (S(R(66)) + S(R(22))), T(R(22)), 1e-11), 'WE6 identity');
}
const we6 = table(['Step', 'Working'], [
  ['Numerator', D('\\cos 2A - \\cos 6A = 2\\sin 4A\\sin 2A')],
  ['Denominator', D('\\sin 6A + \\sin 2A = 2\\sin 4A\\cos 2A')],
  ['Divide', D('\\dfrac{2\\sin 4A\\sin 2A}{2\\sin 4A\\cos 2A} = \\tan 2A')],
  ['Numerical check', `$A = 11^\\circ$: both sides ${f4(T(R(22)))}`],
], 'Worked example 6 table proving that cosine 2A minus cosine 6A over sine 6A plus sine 2A equals tangent 2A: write the numerator and the denominator as products, cancel 2 sine 4A, and check at A equal 11 degrees where both sides are 0.4040.', 'The common factor $2\\sin 4A$ cancels.');
const guide = flow('LR', [['q', 'Read the expression'], ['a', 'Sum or difference of two sines or two cosines'], ['b', 'Product of two sines or cosines'], ['c', 'Angle $2x$, $3x$ or $\\dfrac{x}{2}$'], ['d', 'Sum or difference of two angles'], ['a2', 'Use sum to product'], ['b2', 'Use product to sum'], ['c2', 'Use multiple or half-angle formulae'], ['d2', 'Use the addition formulae']], [['q', 'a'], ['q', 'b'], ['q', 'c'], ['q', 'd'], ['a', 'a2'], ['b', 'b2'], ['c', 'c2'], ['d', 'd2']], 'Decision guide: look at the expression; a sum or difference of sines or cosines needs the sum to product formulae, a product needs the product to sum formulae, an angle 2x, 3x or x over 2 needs the multiple or half-angle formulae, and a sum or difference of angles needs the addition formulae.', 'Name what you see, then pick the family of formulae.');
const summary2 = flow('LR', [['a', 'Half-angle: square, then decide the sign'], ['b', 'One-third angle: a cubic'], ['c', 'Sum to product: half-sum and half-difference'], ['d', 'Product to sum: two products of the addition formulae']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Summary flow of Part 2: half-angle formulae give squares and need a sign decision, one-third angle formulae are cubics, sums become products with half-sum and half-difference, and products become sums by adding or subtracting addition formulae.', 'Part 2 in one line.');
const tips2 = table(['Question type', 'How ISC marks are usually given'], [['Half-angle value (3)', 'quadrant of the half angle 1, formula 1, answer 1'], ['Prove by sum to product (3)', 'pairing 1, products 1, cancel 1'], ['Evaluate a product (2-3)', 'formula 1, values 1, answer 1'], ['Section D identity (5)', 'each stage of the proof 1']], 'Exam tips table for Part 2: half-angle questions earn the quadrant decision, the formula and the answer, proofs by sum to product earn the pairing, the products and the cancellation, products evaluated earn the formula, values and answer, and Section D identities earn a mark per stage.', 'Show the pairing of angles; it carries the method marks.');

// ================================================================ deck 1
const d1 = deck({
  part: 1,
  title: 'Compound, Multiple and Sub-multiple Angles - Part 1: Addition formulae and multiple angles',
  goals: ['Expand the sine, cosine, tangent and cotangent of a sum or difference of two angles', 'Find exact values such as sine 75 degrees and tangent 15 degrees', 'Use the formula for tangent of A plus B plus C', 'Write the double and triple angle formulae and use them in values and proofs'],
  slides: [
    sl('title', 'Compound, Multiple and Sub-multiple Angles, Part 1', { b: 'From the angles you know to the angles you can build.', v: route1, n: 'Welcome to part one. You know the sine and cosine of thirty, forty five and sixty degrees. In this part you learn how to find the values for sums and differences of these angles, and then for double and triple angles, using one family of formulae.' }),
    sl('concept', 'Why a sum of angles needs a formula', { b: r`It is tempting to write $\sin(A + B) = \sin A + \sin B$. The table shows that this fails for every pair we try, so we need the true formula.`, v: tblNo, n: 'Try the idea that the sine of a sum is the sum of the sines. At thirty and sixty degrees the left side is exactly one but the right side is more than one point three. Other pairs also disagree. The sine function does not split over addition, and the next slides give the correct rule.' }),
    sl('diagram', 'The unit circle gives cos(A minus B)', { b: r`Points $P$ and $Q$ at angles $A$ and $B$, and $R$ at angle $A - B$, are on the unit circle. Chord $PQ$ and chord $XR$ subtend the same angle at $O$.`, ul: [r`$PQ^2 = (\cos A - \cos B)^2 + (\sin A - \sin B)^2 = 2 - 2(\cos A\cos B + \sin A\sin B)$`, r`$XR^2 = (\cos(A - B) - 1)^2 + \sin^2(A - B) = 2 - 2\cos(A - B)$`, r`Equal chords give $\cos(A - B) = \cos A\cos B + \sin A\sin B$`], v: figUC, n: 'Place the points on the unit circle. The chord from P to Q and the chord from the point one, zero to R both span the same angle at the centre, so they are equal. Write each squared length with coordinates, simplify using sine squared plus cosine squared equals one, and compare. The result is the cosine of A minus B.' }),
    sl('concept', 'Sine and cosine of a sum and a difference', { b: r`Replace $B$ by $-B$ in the cosine result, and use $\sin\theta = \cos(90^\circ - \theta)$, to obtain the four formulae.`, v: tblAdd, n: 'From the cosine of A minus B we get the other three. Replacing B by minus B gives the cosine of A plus B. Writing sine as cosine of ninety degrees minus the angle gives the sine formulae. The table checks all four at seventy five and forty degrees, and each pair of values agrees to four decimal places.' }),
    sl('check', 'Quick check: a false rule', { b: 'Decide whether the sine of a sum can equal the sum of the sines for all angles.', chk: 'tf1', n: 'Recall the table of four angle pairs and decide whether one counter example is enough.' }),
    sl('concept', 'Tangent and cotangent of A plus B and A minus B', { b: r`Divide $\sin(A \pm B)$ by $\cos(A \pm B)$ and divide top and bottom by $\cos A\cos B$ to get the tangent formulae; the cotangent formulae come from dividing by $\sin A\sin B$.`, v: tblTan, n: 'Divide the sine formula by the cosine formula, then divide every term by cosine A times cosine B. The tangent formulae appear. For cotangent divide by sine A times sine B instead. Each formula holds only where the functions are defined and the denominator is not zero, so check that before using it.' }),
    sl('example', 'Worked example 1: exact values', { b: r`Find the exact values of $\sin 75^\circ$ and $\tan 15^\circ$.`, ul: [r`$75^\circ = 45^\circ + 30^\circ$ for the sine`, r`$15^\circ = 60^\circ - 45^\circ$ for the tangent, with $\tan 60^\circ = \sqrt{3}$ and $\tan 45^\circ = 1$`, r`Rationalise: $\dfrac{\sqrt{3} - 1}{\sqrt{3} + 1} = 2 - \sqrt{3}$`], v: we1, n: 'Split seventy five degrees as forty five plus thirty, and use the sine of a sum with the known values. For the tangent of fifteen degrees, split as sixty minus forty five. The quotient root three minus one over root three plus one becomes two minus root three after rationalising the denominator.' }),
    sl('check', 'Quick check: a collapsing sum', { b: 'Recognise an addition formula in reverse.', chk: 'fb1', n: 'Read the expression from right to left as the sine of a sum.' }),
    sl('example', 'Worked example 2: from given ratios', { b: r`$\sin A = \dfrac{12}{37}$ with $A$ acute and $\cos B = -\dfrac{16}{65}$ with $B$ in quadrant II. Find $\sin(A + B)$ and $\cos(A + B)$ and the quadrant of $A + B$.`, ul: [r`$\cos A = \dfrac{35}{37}$ and $\sin B = \dfrac{63}{65}$`, r`$\sin(A + B) = \dfrac{12}{37}\left(-\dfrac{16}{65}\right) + \dfrac{35}{37}\cdot\dfrac{63}{65} = \dfrac{2013}{2405}$`, r`$\cos(A + B) = -\dfrac{1316}{2405}$: sine positive, cosine negative, so quadrant II`], v: we2, n: 'First find the missing ratios, taking the sign from the quadrant. Cosine of A is thirty five over thirty seven. Sine of B is positive, sixty three over sixty five. Then substitute into the two formulae. The sine of the sum is positive and the cosine is negative, so the sum lies in the second quadrant.' }),
    sl('concept', 'Tangent of A plus B plus C', { b: r`Write $A + B + C = (A + B) + C$ and apply the tangent formula twice. When $A + B + C = 180^\circ$, the numerator must vanish because $\tan 180^\circ = 0$.`, v: tblABC, n: 'Treat A plus B as one angle and add C. The result has the three tangents in the numerator, minus the product of all three, over one minus the sum of the pairwise products. When the three angles add up to one hundred eighty degrees the tangent is zero, so the sum of the tangents equals their product.' }),
    sl('check', 'Quick check: angles of a triangle', { b: 'Use the three-angle result for the angles of a triangle.', chk: 'tf2', n: 'The three angles of a triangle add up to one hundred eighty degrees.' }),
    sl('example', 'Worked example 3: proving an identity', { b: r`Prove that $\dfrac{\sin(A + B)}{\cos A\cos B} = \tan A + \tan B$.`, ul: ['Expand the numerator by the addition formula', 'Split into two fractions and cancel', 'Check with numbers'], v: we3, n: 'Start from the left side. Expand sine of A plus B in the numerator. Split into two fractions: in each, one trigonometric factor cancels with the denominator, leaving tangent A and tangent B. A numerical check at thirty five and twenty degrees gives the same number on both sides.' }),
    sl('concept', 'Double angle formulae', { b: r`Put $B = A$ in the sum formulae. The cosine has three forms; choose the one that uses what you are given.`, v: tblDbl, n: 'Setting B equal to A turns each addition formula into a double angle formula. Sine of two x is two sine x cosine x. Cosine of two x has three forms, using cosine squared minus sine squared, or only cosine, or only sine. Tangent of two x is two tangent x over one minus tangent squared x.' }),
    sl('diagram', 'sin 2x and 2 sin x cos x are one curve', { b: r`The graph of $y = \sin 2x$ has period $\pi$, twice as fast as $\sin x$, and the product $2\sin x\cos x$ traces exactly the same curve.`, v: pDbl, n: 'Here are the graphs of sine two x and of two sine x cosine x on the same axes. They lie on top of each other, which is what an identity means graphically. The wave has period pi, so it completes two cycles between zero and two pi, with peaks and troughs of height one.' }),
    sl('example', 'Worked example 4: double angle from cos x', { b: r`If $\cos x = -\dfrac{7}{25}$ and $x$ is in quadrant III, find $\sin 2x$, $\cos 2x$ and $\tan 2x$.`, ul: [r`$\sin x = -\dfrac{24}{25}$ (quadrant III)`, r`$\sin 2x = 2\left(-\dfrac{24}{25}\right)\left(-\dfrac{7}{25}\right) = \dfrac{336}{625}$`, r`$\cos 2x = 2\cdot\dfrac{49}{625} - 1 = -\dfrac{527}{625}$`, r`$\tan 2x = -\dfrac{336}{527}$`], v: we4, n: 'Find sine x first. In the third quadrant it is negative, minus twenty four over twenty five. Then apply the double angle formulae. Sine of two x is a product of two negatives, so it is positive. Cosine of two x is negative. The tangent is their quotient, minus three hundred thirty six over five hundred twenty seven.' }),
    sl('check', 'Quick check: a double angle value', { b: 'Find the cosine of a double angle from the cosine of the angle.', chk: 'fb2', n: 'Choose the form of cosine two x that uses only cosine.' }),
    sl('concept', 'Triple angle formulae', { b: r`Write $3x = 2x + x$. Each formula is a cubic in the same function of $x$.`, v: tblTri, n: 'Write three x as two x plus x and expand. For sine, replace cosine squared by one minus sine squared and you get three sine x minus four sine cubed x. For cosine, do the same with sine squared and you get four cosine cubed x minus three cosine x. The tangent formula comes from the tangent addition rule.' }),
    sl('diagram', 'cos 3x as a cubic in cos x', { b: r`The curve $y = \cos 3x$ makes three waves in $2\pi$, and the cubic $4\cos^3 x - 3\cos x$ draws it too.`, v: pTri, n: 'The graph shows cosine three x and the cubic expression in cosine x. They coincide. Three waves fit in a full turn, so the peaks at zero, two pi over three and four pi over three have height one, and the troughs between them have depth minus one. The cubic form is the key to the one third angle formulae later.' }),
    sl('example', 'Worked example 5: a triple angle identity', { b: r`Prove that $\cos 3A = \cos A\,(2\cos 2A - 1)$.`, ul: [r`Factor $\cos A$ out of $4\cos^3 A - 3\cos A$`, r`$4\cos^2 A - 3 = 2(2\cos^2 A - 1) - 1$`, 'Recognise the double angle formula'], v: we5, n: 'Start from cosine three A written in cosine only, and factor out cosine A. The bracket is four cosine squared A minus three. Write it as two times the bracket two cosine squared A minus one, minus one. The inner bracket is cosine two A, so the bracket equals two cosine two A minus one.' }),
    sl('check', 'Quick check: a triple angle value', { b: 'Evaluate the triple angle formula at a special angle.', chk: 'tf3', n: 'Substitute thirty degrees into the sine formula and compare with sine of ninety degrees.' }),
    sl('summary', 'Summary', { ul: [r`$\sin(A \pm B)$, $\cos(A \mp B)$ keep the sign as shown`, r`$\tan(A \pm B) = \dfrac{\tan A \pm \tan B}{1 \mp \tan A\tan B}$`, r`$A + B + C = 180^\circ$: $\tan A + \tan B + \tan C = \tan A\tan B\tan C$`, r`$\sin 2x = 2\sin x\cos x$ and $\sin 3x = 3\sin x - 4\sin^3 x$`], v: summary1, n: 'To sum up. The addition formulae give sine, cosine, tangent and cotangent of sums and differences. Putting the two angles equal gives the double angle formulae, and writing three x as two x plus x gives the triple angle formulae. Always check the formula with a numerical angle before relying on it.' }),
    sl('exam-tips', 'Exam tips', { ul: ['Find the missing ratio with the **correct sign** from the quadrant', 'The cosine formula changes the sign between the two products', 'Check a tangent formula for **zero denominators**', 'Test any identity you prove at one numerical angle'], v: tips1, n: 'In the examination, find the missing ratio with the correct sign, using the quadrant. Remember that the cosine addition formula changes the sign between its two products. Look out for zero denominators in tangent formulae. And once you have proved an identity, test it at one numerical angle to catch slips.' }),
  ],
});

// ================================================================ deck 2
const d2 = deck({
  part: 2,
  title: 'Compound, Multiple and Sub-multiple Angles - Part 2: Half-angle, one-third angle and product formulae',
  goals: ['Use the half-angle formulae and decide the sign from the quadrant', 'Use the one-third angle relations to form and solve cubics', 'Change a sum or difference of sines or cosines into a product', 'Change a product of sines or cosines into a sum or difference'],
  slides: [
    sl('title', 'Compound, Multiple and Sub-multiple Angles, Part 2', { b: 'Halves, thirds, and the exchange between sums and products.', v: route2, n: 'Welcome to part two. You will find the trigonometric ratios of half an angle and one third of an angle, and learn to exchange sums and products of sines and cosines. These tools finish most proofs and exact value questions in this chapter.' }),
    sl('concept', 'Half-angle formulae', { b: r`Use $\cos 2\theta = 1 - 2\sin^2\theta = 2\cos^2\theta - 1$ with $\theta = \dfrac{x}{2}$. The formulae give **squares**.`, v: tblHalf, n: 'Take the double angle formulae for cosine and put theta equal to x over two. Solving for sine squared and cosine squared gives the first two lines. Dividing them gives the tangent squared formula, and the last line expresses tangent of half an angle without a square root. The table checks each at one hundred degrees.' }),
    sl('diagram', 'The sign of a half-angle', { b: r`A formula for $\sin^2\dfrac{x}{2}$ gives only the size. The sign depends on the **quadrant of $\dfrac{x}{2}$**, not of $x$.`, v: tblSign, n: 'If x lies between zero and ninety, or ninety and one hundred eighty degrees, half of x is in the first quadrant and all three ratios are positive. If x lies between one hundred eighty and three hundred sixty degrees, half of x is in the second quadrant, so the sine is positive but cosine and tangent are negative.' }),
    sl('example', 'Worked example 1: the angle 22.5 degrees', { b: r`Find $\sin 22.5^\circ$, $\cos 22.5^\circ$ and $\tan 22.5^\circ$ exactly.`, ul: [r`$22.5^\circ = \dfrac{45^\circ}{2}$, an acute angle, so every root is positive`, r`$\tan 22.5^\circ = \dfrac{\sin 45^\circ}{1 + \cos 45^\circ} = \sqrt{2} - 1$`], v: we1h, n: 'Take x equal to forty five degrees. The cosine squared of the half angle is one plus root two over two, all over two, which is two plus root two over four. Take the positive root, since twenty two point five degrees is acute. The tangent avoids a nested root and simplifies to root two minus one.' }),
    sl('check', 'Quick check: the half-angle square', { b: 'Evaluate a half-angle square from a given cosine.', chk: 'fb3', n: 'Use the formula for cosine squared of half an angle.' }),
    sl('example', 'Worked example 2: half-angle values from cos x', { b: r`If $\cos x = \dfrac{7}{25}$ and $270^\circ < x < 360^\circ$, find $\sin\dfrac{x}{2}$, $\cos\dfrac{x}{2}$ and $\tan\dfrac{x}{2}$.`, ul: [r`$\dfrac{x}{2}$ is in quadrant II: sine positive, cosine negative`, r`$\sin^2\dfrac{x}{2} = \dfrac{9}{25}$ and $\cos^2\dfrac{x}{2} = \dfrac{16}{25}$`, r`$\tan\dfrac{x}{2} = -\dfrac{3}{4}$`], v: we2h, n: 'Decide the quadrant first. Half of an angle between two hundred seventy and three hundred sixty degrees lies between one hundred thirty five and one hundred eighty, in the second quadrant. Sine squared is nine over twenty five, so sine is three fifths. Cosine squared is sixteen over twenty five, so cosine is minus four fifths.' }),
    sl('concept', 'One-third angle formulae', { b: r`The triple angle formulae with $y = \dfrac{x}{3}$ give $\sin x$, $\cos x$ and $\tan x$ in terms of $\sin y$, $\cos y$, $\tan y$. Read backwards, each is a **cubic** for the one-third angle.`, v: tblThird, n: 'There is no simple square root formula for a third of an angle. Instead, we use the triple angle formula backwards. If x is known, the sine of x over three satisfies a cubic equation, and the three roots correspond to three different angles whose triples have the same sine.' }),
    sl('example', 'Worked example 3: a cubic from cos 3 theta', { b: r`Show that $\cos 20^\circ$, $\cos 140^\circ$ and $\cos 260^\circ$ are roots of $8c^3 - 6c - 1 = 0$.`, ul: [r`$\cos 3\theta = 4c^3 - 3c$ with $c = \cos\theta$`, r`For $\theta = 20^\circ, 140^\circ, 260^\circ$: $3\theta = 60^\circ, 420^\circ, 780^\circ$, all with cosine $\dfrac{1}{2}$`, r`$4c^3 - 3c = \dfrac{1}{2}$ gives $8c^3 - 6c - 1 = 0$`], v: we3t, n: 'For each of the three angles, three times the angle differs from sixty degrees by a whole number of turns, so the cosine of the triple angle is one half. Put that into the triple angle formula and multiply by two. All three cosines satisfy the same cubic, and the table confirms each value.' }),
    sl('diagram', 'The three roots on the graph', { b: r`The cubic $y = 8x^3 - 6x - 1$ meets the $x$-axis exactly three times, at the cosines of the three angles.`, v: pCub, n: 'The graph of the cubic crosses the horizontal axis three times, at about minus zero point seven seven, minus zero point one seven and zero point nine four. These are the cosines of one hundred forty, two hundred sixty and twenty degrees. A cubic has at most three roots, so there are no other values.' }),
    sl('check', 'Quick check: roots of the cubic', { b: 'Apply the sum of the roots of this cubic.', chk: 'tf4', n: 'The sum of the roots of a cubic comes from the coefficient of x squared, which is zero here.' }),
    sl('concept', 'Sum and difference to product', { b: r`Put $A + B = C$ and $A - B = D$ in the product formulae, so that $A = \dfrac{C + D}{2}$ and $B = \dfrac{C - D}{2}$.`, v: tblSP, n: 'To turn a sum of two sines or cosines into a product, use the half sum and half difference of the two angles. The sum of sines becomes two sine of half sum times cosine of half difference. For the difference of cosines there is a minus sign, and the two sines appear.' }),
    sl('diagram', 'The product form shows the envelope', { b: r`$\sin 5x + \sin 3x = 2\sin 4x\cos x$: a fast wave $\sin 4x$ inside the slow envelope $\pm 2\cos x$.`, v: pBeat, n: 'Here is the graph of sine five x plus sine three x. It looks complicated as a sum, but as a product it is two cosine x times sine four x. The slow curve two cosine x and its mirror image enclose the fast wave, which is how beats arise when two notes of nearby pitch sound together.' }),
    sl('example', 'Worked example 4: a quotient of sums', { b: r`Prove that $\dfrac{\sin 7x + \sin 3x}{\cos 7x + \cos 3x} = \tan 5x$.`, ul: ['Half sum $= 5x$, half difference $= 2x$ in both', 'Cancel the common factor $2\\cos 2x$'], v: we4p, n: 'Use the same pair in the numerator and the denominator. The half sum of seven x and three x is five x, and the half difference is two x. The numerator becomes two sine five x cosine two x, and the denominator becomes two cosine five x cosine two x. Cancel the common factors and the tangent of five x remains.' }),
    sl('check', 'Quick check: a sum as a product', { b: 'Complete a sum-to-product formula.', chk: 'fb4', n: 'Find the half sum of the two angles.' }),
    sl('concept', 'Product to sum and difference', { b: r`Add and subtract the addition formulae: for example $\sin(A + B) + \sin(A - B) = 2\sin A\cos B$.`, v: tblPS, n: 'The product formulae are the addition formulae read backwards. Adding the sine of A plus B and the sine of A minus B leaves two sine A cosine B. Subtracting leaves two cosine A sine B. For cosines, adding gives two cosine A cosine B, and subtracting gives two sine A sine B, with the order of the terms as in the table.' }),
    sl('example', 'Worked example 5: exact products', { b: r`Find the exact values of $\cos 75^\circ\cos 15^\circ$, $\sin 105^\circ\cos 45^\circ$ and $\sin 135^\circ\sin 15^\circ$.`, ul: ['Write each product as half of a sum or difference of values at **standard angles**', 'No factor needs its own value'], v: we5p, n: 'For the first, the sum of the angles is ninety and the difference is sixty, so the product is half of cosine ninety plus cosine sixty, which is one quarter. For the second, the angles one hundred fifty and sixty give one plus root three over four. For the third, use the cosine difference form with one hundred twenty and one hundred fifty.' }),
    sl('diagram', 'A difference of cosines as a product', { b: r`$\cos x - \cos 5x = 2\sin 3x\sin 2x$: the wave changes sign each time $\sin 2x$ does.`, v: pPS, n: 'Both expressions are drawn here and they give the same curve. The difference of the cosines is simply a product of two sines. The curve is zero wherever either factor is zero, so the zeros are easiest to read from the product form.' }),
    sl('example', 'Worked example 6: an identity with A', { b: r`Prove that $\dfrac{\cos 2A - \cos 6A}{\sin 6A + \sin 2A} = \tan 2A$.`, ul: [r`$\cos 2A - \cos 6A = 2\sin 4A\sin 2A$`, r`$\sin 6A + \sin 2A = 2\sin 4A\cos 2A$`], v: we6, n: 'Pair the angles two A and six A. Their half sum is four A and their half difference is two A. The numerator becomes two sine four A sine two A, and the denominator becomes two sine four A cosine two A. Dividing leaves sine two A over cosine two A, which is tangent two A.' }),
    sl('check', 'Quick check: product to difference', { b: 'Complete a product-to-sum formula.', chk: 'fb5', n: 'Use the formula for two sine times sine.' }),
    sl('concept', 'Which formulae do I need?', { b: 'Read the expression and decide the family of formulae before you start.', v: guide, n: 'Before you start, name what you see. A sum or difference of sines or cosines suggests sum to product. A product suggests product to sum. A multiple or half of an angle suggests the multiple or half-angle formulae. A sum or difference of two known angles suggests the addition formulae.' }),
    sl('summary', 'Summary', { ul: [r`$\sin^2\dfrac{x}{2} = \dfrac{1 - \cos x}{2}$, $\cos^2\dfrac{x}{2} = \dfrac{1 + \cos x}{2}$: sign from the quadrant`, r`One-third angle: $4c^3 - 3c = \cos x$ for $c = \cos\dfrac{x}{3}$`, r`$\cos C - \cos D = -2\sin\dfrac{C + D}{2}\sin\dfrac{C - D}{2}$`, r`$2\sin A\sin B = \cos(A - B) - \cos(A + B)$`], v: summary2, n: 'To sum up. Half-angle formulae give squares, and the quadrant of the half angle fixes the sign. The one third angle formulae are cubics. A sum of sines or cosines becomes a product using the half sum and half difference, and a product becomes a sum or difference by adding or subtracting the addition formulae.' }),
    sl('exam-tips', 'Exam tips', { ul: ['Pair the angles so that the half-sum is the **same** in numerator and denominator', 'The sign of a half-angle value comes from the quadrant of the **half angle**', 'Write the half-sum and half-difference on their own line', 'Check every proof with one numerical angle'], v: tips2, n: 'In the examination, pair the angles so the half sum is the same in the numerator and denominator, then the common factor cancels. Decide the sign of a half angle value from the quadrant of the half angle. Write the half sum and half difference on a separate line, and check each proof with one numerical angle.' }),
  ],
});

// ================================================================ notes
const notes = {
  unit: 'isc-11-mathematics-ch04', version: 1, title: 'Compound, Multiple and Sub-multiple Angles - chapter notes', language: 'en',
  sections: [
    { heading: '1. Why we need addition formulae', body_md: rn`The trigonometric ratios do **not** split over addition: $\sin(A + B) \ne \sin A + \sin B$ in general. For example $\sin 90^\circ = 1$ but $\sin 30^\circ + \sin 60^\circ \approx 1.366$.\n\nThe key result is $\cos(A - B) = \cos A\cos B + \sin A\sin B$, proved on the unit circle by equating the chords $PQ$ and $XR$. Everything else in this chapter follows from it by substitution.`, key_terms: [{ term: 'Compound angle', definition_md: 'An angle written as a sum or difference of two angles, such as $A + B$ or $A - B$.' }, { term: 'Multiple angle', definition_md: 'An angle such as $2x$ or $3x$, a whole-number multiple of $x$.' }, { term: 'Sub-multiple angle', definition_md: 'An angle such as $\\dfrac{x}{2}$ or $\\dfrac{x}{3}$.' }], formulas: [{ latex: r`\cos(A - B) = \cos A\cos B + \sin A\sin B`, label: 'Basic result' }], visual: tblNo, visuals: [figUC], topic_ids: [topic(1)] },
    { heading: '2. Sine and cosine of A plus or minus B', body_md: rn`Replace $B$ by $-B$ to get $\cos(A + B)$; use $\sin\theta = \cos(90^\circ - \theta)$ to get the sine formulae.\n\nSine formulae keep the sign of the angle ($\sin(A + B)$ has a plus between its products); cosine formulae reverse it. They give exact values at angles such as $15^\circ$, $75^\circ$, $105^\circ$, once you split the angle into two angles with known ratios.`, key_terms: [{ term: 'Sign pattern', definition_md: 'Sine: same sign as the angle; cosine: opposite sign.' }], formulas: [{ latex: r`\sin(A \pm B) = \sin A\cos B \pm \cos A\sin B`, label: 'Sine' }, { latex: r`\cos(A \pm B) = \cos A\cos B \mp \sin A\sin B`, label: 'Cosine' }, { latex: r`\sin 75^\circ = \dfrac{\sqrt{6} + \sqrt{2}}{4}`, label: 'Exact value' }], visual: tblAdd, visuals: [we1, we2], topic_ids: [topic(1)] },
    { heading: '3. Tangent, cotangent and tan(A + B + C)', body_md: rn`Divide sine by cosine, then top and bottom by $\cos A\cos B$, to get the tangent formulae; divide by $\sin A\sin B$ for cotangent. Each holds only where the functions are defined and the denominator is not zero.\n\nFor three angles, $\tan(A + B + C) = \dfrac{\tan A + \tan B + \tan C - \tan A\tan B\tan C}{1 - \tan A\tan B - \tan B\tan C - \tan C\tan A}$. If $A + B + C = 180^\circ$ (angles of a triangle), then $\tan A + \tan B + \tan C = \tan A\tan B\tan C$.`, key_terms: [{ term: 'Validity condition', definition_md: 'The angles and the sum or difference must not be odd multiples of $\\dfrac{\\pi}{2}$ (tangent) or multiples of $\\pi$ (cotangent).' }], formulas: [{ latex: r`\tan(A \pm B) = \dfrac{\tan A \pm \tan B}{1 \mp \tan A\tan B}`, label: 'Tangent' }, { latex: r`\cot(A \pm B) = \dfrac{\cot A\cot B \mp 1}{\cot B \pm \cot A}`, label: 'Cotangent' }], visual: tblTan, visuals: [tblABC, we3], topic_ids: [topic(1)] },
    { heading: '4. Double angle formulae', body_md: rn`Putting $B = A$ gives $\sin 2x = 2\sin x\cos x$ and $\cos 2x = \cos^2 x - \sin^2 x$, which has two further forms, $2\cos^2 x - 1$ and $1 - 2\sin^2 x$, and $\tan 2x = \dfrac{2\tan x}{1 - \tan^2 x}$. In terms of $t = \tan x$: $\sin 2x = \dfrac{2t}{1 + t^2}$ and $\cos 2x = \dfrac{1 - t^2}{1 + t^2}$.\n\nThe sign of $\sin x$ or $\cos x$ is decided by the quadrant of $x$ before you substitute.`, key_terms: [{ term: 'Double angle', definition_md: 'The angle $2x$; its ratios follow from the addition formulae with $B = A$.' }], formulas: [{ latex: r`\sin 2x = 2\sin x\cos x`, label: 'Sine' }, { latex: r`\cos 2x = 2\cos^2 x - 1 = 1 - 2\sin^2 x`, label: 'Cosine' }, { latex: r`\tan 2x = \dfrac{2\tan x}{1 - \tan^2 x}`, label: 'Tangent' }], visual: tblDbl, visuals: [pDbl, we4], topic_ids: [topic(2)] },
    { heading: '5. Triple angle formulae', body_md: rn`Write $3x = 2x + x$ and use the double angle formulae: $\sin 3x = 3\sin x - 4\sin^3 x$, $\cos 3x = 4\cos^3 x - 3\cos x$, $\tan 3x = \dfrac{3\tan x - \tan^3 x}{1 - 3\tan^2 x}$.\n\nUseful rewritings: $\dfrac{\sin 3x}{\sin x} = 3 - 4\sin^2 x$ and $\cos 3x = \cos x\,(2\cos 2x - 1)$.`, key_terms: [{ term: 'Triple angle', definition_md: 'The angle $3x$; its sine and cosine are cubic expressions in $\\sin x$ and $\\cos x$.' }], formulas: [{ latex: r`\sin 3x = 3\sin x - 4\sin^3 x`, label: 'Sine' }, { latex: r`\cos 3x = 4\cos^3 x - 3\cos x`, label: 'Cosine' }, { latex: r`\tan 3x = \dfrac{3\tan x - \tan^3 x}{1 - 3\tan^2 x}`, label: 'Tangent' }], visual: tblTri, visuals: [pTri, we5], topic_ids: [topic(2)] },
    { heading: '6. Half-angle and one-third angle formulae', body_md: rn`From $\cos x = 1 - 2\sin^2\dfrac{x}{2} = 2\cos^2\dfrac{x}{2} - 1$: $\sin^2\dfrac{x}{2} = \dfrac{1 - \cos x}{2}$, $\cos^2\dfrac{x}{2} = \dfrac{1 + \cos x}{2}$, $\tan\dfrac{x}{2} = \dfrac{1 - \cos x}{\sin x} = \dfrac{\sin x}{1 + \cos x}$. The **sign** of a root is that of the ratio in the quadrant of $\dfrac{x}{2}$.\n\nWith $y = \dfrac{x}{3}$, the triple angle formulae say $\sin x = 3\sin y - 4\sin^3 y$ and $\cos x = 4\cos^3 y - 3\cos y$; read backwards, the sine, cosine or tangent of $\dfrac{x}{3}$ is a root of a cubic whose other roots belong to the angles $\dfrac{x + 360^\circ k}{3}$.`, key_terms: [{ term: 'Half-angle formula', definition_md: 'Gives the square of a ratio of $\\dfrac{x}{2}$; the quadrant of $\\dfrac{x}{2}$ fixes the sign.' }], formulas: [{ latex: r`\sin^2\dfrac{x}{2} = \dfrac{1 - \cos x}{2}`, label: 'Half-angle sine' }, { latex: r`\cos^2\dfrac{x}{2} = \dfrac{1 + \cos x}{2}`, label: 'Half-angle cosine' }, { latex: r`\tan 22.5^\circ = \sqrt{2} - 1`, label: 'Exact value' }], visual: tblHalf, visuals: [tblSign, we1h, we2h, tblThird, we3t, pCub], topic_ids: [topic(2)] },
    { heading: '7. Sum to product and product to sum', body_md: rn`Put $C = A + B$, $D = A - B$ in the product formulae: $\sin C + \sin D = 2\sin\dfrac{C + D}{2}\cos\dfrac{C - D}{2}$, $\sin C - \sin D = 2\cos\dfrac{C + D}{2}\sin\dfrac{C - D}{2}$, $\cos C + \cos D = 2\cos\dfrac{C + D}{2}\cos\dfrac{C - D}{2}$, $\cos C - \cos D = -2\sin\dfrac{C + D}{2}\sin\dfrac{C - D}{2}$.\n\nRead the other way: $2\sin A\cos B = \sin(A + B) + \sin(A - B)$, $2\cos A\sin B = \sin(A + B) - \sin(A - B)$, $2\cos A\cos B = \cos(A + B) + \cos(A - B)$, $2\sin A\sin B = \cos(A - B) - \cos(A + B)$.\n\nIn a proof pair the angles so that the half-sum is the same in the numerator and the denominator.`, key_terms: [{ term: 'Half-sum and half-difference', definition_md: '$\\dfrac{C + D}{2}$ and $\\dfrac{C - D}{2}$, the two angles that appear in a sum-to-product result.' }], formulas: [{ latex: r`\cos C - \cos D = -2\sin\dfrac{C + D}{2}\sin\dfrac{C - D}{2}`, label: 'Difference of cosines' }, { latex: r`2\sin A\sin B = \cos(A - B) - \cos(A + B)`, label: 'Product of sines' }], visual: tblSP, visuals: [pBeat, we4p, tblPS, we5p, pPS, we6, guide], topic_ids: [topic(3), topic(4)] },
  ],
  exam_tips_md: rn`**How ISC marks are usually awarded**\n- *Exact value (2 marks):* the split of the angle, then the surd.\n- *Given ratios (3 marks):* the missing ratios with signs, the formula, the answer.\n- *Identity (3 marks):* expansion or pairing, simplification, conclusion.\n- *Half-angle value (3 marks):* the quadrant of the half angle, the formula, the answer.\n- *Section D (5 marks):* questions come in parts such as 2 + 3; label each part and give a mark's worth of working per step.\n\n**Common mistakes**\n- Writing $\sin(A + B) = \sin A + \sin B$.\n- Using $+$ between the products in $\cos(A + B)$.\n- Taking the sign of a half-angle ratio from the quadrant of $x$ instead of $\dfrac{x}{2}$.\n- Forgetting the minus sign in $\cos C - \cos D$.\n- Using $\tan(A + B)$ where $\tan A\tan B = 1$ or an angle is $90^\circ$.`,
  status: 'draft', provenance: d1.provenance,
};

const fc = (id, front_md, back_md, tag, t) => ({ id, front_md, back_md, tag, topic_id: topic(t) });
const flashcards = {
  unit: 'isc-11-mathematics-ch04', version: 1, language: 'en',
  cards: [
    fc('f01', 'Is $\\sin(A + B) = \\sin A + \\sin B$ in general?', 'No. For $A = 30^\\circ$, $B = 60^\\circ$: $1 \\ne 1.366$.', 'concept', 1),
    fc('f02', 'State $\\cos(A - B)$.', '$\\cos A\\cos B + \\sin A\\sin B$.', 'formula', 1),
    fc('f03', 'State $\\cos(A + B)$.', '$\\cos A\\cos B - \\sin A\\sin B$.', 'formula', 1),
    fc('f04', 'State $\\sin(A + B)$ and $\\sin(A - B)$.', '$\\sin A\\cos B \\pm \\cos A\\sin B$ (same sign as the angle).', 'formula', 1),
    fc('f05', 'State $\\tan(A + B)$.', '$\\dfrac{\\tan A + \\tan B}{1 - \\tan A\\tan B}$.', 'formula', 1),
    fc('f06', 'State $\\tan(A - B)$.', '$\\dfrac{\\tan A - \\tan B}{1 + \\tan A\\tan B}$.', 'formula', 1),
    fc('f07', 'State $\\cot(A + B)$.', '$\\dfrac{\\cot A\\cot B - 1}{\\cot B + \\cot A}$.', 'formula', 1),
    fc('f08', 'State $\\cot(A - B)$.', '$\\dfrac{\\cot A\\cot B + 1}{\\cot B - \\cot A}$.', 'formula', 1),
    fc('f09', 'Exact value of $\\sin 75^\\circ$', '$\\dfrac{\\sqrt{6} + \\sqrt{2}}{4}$, from $45^\\circ + 30^\\circ$.', 'example', 1),
    fc('f10', 'Exact value of $\\tan 15^\\circ$', '$2 - \\sqrt{3}$, from $60^\\circ - 45^\\circ$.', 'example', 1),
    fc('f11', 'State $\\tan(A + B + C)$.', '$\\dfrac{\\tan A + \\tan B + \\tan C - \\tan A\\tan B\\tan C}{1 - \\tan A\\tan B - \\tan B\\tan C - \\tan C\\tan A}$.', 'formula', 1),
    fc('f12', 'What follows if $A + B + C = 180^\\circ$?', '$\\tan A + \\tan B + \\tan C = \\tan A\\tan B\\tan C$ (the numerator is zero).', 'concept', 1),
    fc('f13', 'State $\\sin 2x$ in two forms.', '$2\\sin x\\cos x = \\dfrac{2\\tan x}{1 + \\tan^2 x}$.', 'formula', 2),
    fc('f14', 'Give the three forms of $\\cos 2x$ in $\\cos x$ and $\\sin x$.', '$\\cos^2 x - \\sin^2 x = 2\\cos^2 x - 1 = 1 - 2\\sin^2 x$.', 'formula', 2),
    fc('f15', 'State $\\tan 2x$.', '$\\dfrac{2\\tan x}{1 - \\tan^2 x}$.', 'formula', 2),
    fc('f16', 'State $\\sin 3x$.', '$3\\sin x - 4\\sin^3 x$.', 'formula', 2),
    fc('f17', 'State $\\cos 3x$.', '$4\\cos^3 x - 3\\cos x$.', 'formula', 2),
    fc('f18', 'State $\\tan 3x$.', '$\\dfrac{3\\tan x - \\tan^3 x}{1 - 3\\tan^2 x}$.', 'formula', 2),
    fc('f19', 'State $\\sin^2\\dfrac{x}{2}$ and $\\cos^2\\dfrac{x}{2}$.', '$\\dfrac{1 - \\cos x}{2}$ and $\\dfrac{1 + \\cos x}{2}$.', 'formula', 2),
    fc('f20', 'Two forms of $\\tan\\dfrac{x}{2}$ without a root', '$\\dfrac{1 - \\cos x}{\\sin x} = \\dfrac{\\sin x}{1 + \\cos x}$.', 'formula', 2),
    fc('f21', 'How is the sign of $\\sin\\dfrac{x}{2}$ decided?', 'By the quadrant in which $\\dfrac{x}{2}$ lies, not the quadrant of $x$.', 'exam-tip', 2),
    fc('f22', 'Exact value of $\\tan 22.5^\\circ$', '$\\sqrt{2} - 1$.', 'example', 2),
    fc('f23', 'What equation does $\\cos\\dfrac{x}{3}$ satisfy?', '$4c^3 - 3c = \\cos x$, a cubic, from $\\cos 3y = 4\\cos^3 y - 3\\cos y$.', 'concept', 2),
    fc('f24', 'State $\\sin C + \\sin D$ as a product.', '$2\\sin\\dfrac{C + D}{2}\\cos\\dfrac{C - D}{2}$.', 'formula', 3),
    fc('f25', 'State $\\sin C - \\sin D$ as a product.', '$2\\cos\\dfrac{C + D}{2}\\sin\\dfrac{C - D}{2}$.', 'formula', 3),
    fc('f26', 'State $\\cos C + \\cos D$ as a product.', '$2\\cos\\dfrac{C + D}{2}\\cos\\dfrac{C - D}{2}$.', 'formula', 3),
    fc('f27', 'State $\\cos C - \\cos D$ as a product.', '$-2\\sin\\dfrac{C + D}{2}\\sin\\dfrac{C - D}{2}$ (note the minus sign).', 'formula', 3),
    fc('f28', 'State $2\\sin A\\cos B$ and $2\\cos A\\sin B$ as sums.', '$\\sin(A + B) + \\sin(A - B)$ and $\\sin(A + B) - \\sin(A - B)$.', 'formula', 4),
    fc('f29', 'State $2\\cos A\\cos B$ and $2\\sin A\\sin B$ as sums.', '$\\cos(A + B) + \\cos(A - B)$ and $\\cos(A - B) - \\cos(A + B)$.', 'formula', 4),
    fc('f30', 'In a proof with sums of sines and cosines, how do you pair the angles?', 'So that the half-sum is the same in numerator and denominator; the common factor then cancels.', 'exam-tip', 3),
  ],
};
must(flashcards.cards.length === 30, 'flashcards');

const release = {
  unit: 'isc-11-mathematics-ch04', version: 1, academic_year: '2026-27', created_at: '2026-11-05T00:00:00+05:30',
  decks: [d1, d2], notes, flashcards, questions: [],
  build: { run_id: null, checks: { syllabus: 'topics t01-t04 of isc-11-mathematics-ch04; trigonometric equations and conditional identities are not in the ISC topic list for this chapter and are not taught', self_checks: `every formula taught is tested numerically on dense grids in all four quadrants and exactly in Q(sqrt 2, sqrt 3) at multiples of 15 degrees (${Object.keys(IDSIZES).length} identity families); every table cell, figure, plotted point and worked example is computed in build.mjs and asserted` } },
};
const tests = chapterTests('Compound, Multiple and Sub-multiple Angles', {
  A: ['m02', 'm05', 'm11', 'm16', 'ar1'],
  B: ['s201', ['s202', 's208']],
  C: ['s301', ['s304', 's309']],
  D: ['l01'],
}, {
  A: ['m03', 'm06', 'm09', 'm12', 'm14', 'm17', 'm19', 'm21', 'm22', 'm24', 'ar3', 'ar5'],
  B: ['s203', 's205', ['s207', 's210']],
  C: ['s303', 's305', 's307', ['s306', 's311']],
  D: ['l03', ['l04', 'l06']],
});
build({ dir: DIR, release, testsSpec: tests });
