// Figures for CBSE 11 Mathematics ch12 Limits and Derivatives. Every number in a table is computed here
// (exact fractions, or numeric differentiation / limits with an assertion) and the build throws if a check fails.
import { plot, table, flow } from './lib.mjs';
import { r, F, Fr, P, X, Poly, limRat, approachExact, near, numLim, dnum, checkDeriv, fpPoly, dec } from './calc.mjs';

function must(cond, msg) { if (!cond) throw new Error(`visual check failed: ${msg}`); }
const T = (s) => `$${s}$`;

// ---------------------------------------------------------------- deck 1: limits
// f(x) = (x^2 + x - 6)/(x - 2) is x + 3 for x != 2, undefined at 2; limit 5
const N0 = P(1, 1, -6), D0 = P(1, -2);
must(limRat(N0, D0, 2).value.eq(5) && approachExact(N0, D0, 2, F(5)), 'limit 5');
const approachXs = ['1.9', '1.99', '1.999', '2.001', '2.01', '2.1'];
const approachRows = approachXs.map((s) => { const x = Fr.of(s); const v = N0.eval(x).div(D0.eval(x)); must(v.dec() !== null && Math.abs(v.num() - 5) < 0.11, 'approach'); return [s, v.dec()]; });
export const tblApproach = table(['$x$ (near 2)', r`$f(x) = \dfrac{x^2 + x - 6}{x - 2}$`], approachRows, 'Table of values of x squared plus x minus 6 over x minus 2 for x equal to 1.9, 1.99, 1.999, 2.001, 2.01 and 2.1. The values are 4.9, 4.99, 4.999, 5.001, 5.01 and 5.1: they close in on 5 from both sides although the function is not defined at 2.', 'As $x$ gets close to $2$ from either side, $f(x)$ gets close to $5$.');
export const plotHole = plot({ x: [-1, 5], y: [0, 9], fns: [{ expr: 'x + 3', label: r`$y = \dfrac{x^2 + x - 6}{x - 2}$, $x \ne 2$`, domain: [-1, 5] }], pts: [[2, 5, '(2, 5)']] }, 'The graph of x squared plus x minus 6 over x minus 2 is the straight line y equals x plus 3 with one point missing. The line rises through (0, 3) and (4, 7); at x equal to 2 there is a hole at the height 5, marked (2, 5).', 'A hole at $(2, 5)$: $f(2)$ does not exist, yet the limit as $x \\to 2$ is $5$.');

// one-sided limits: f(x) = 3 - x for x < 2, x^2 - 1 for x >= 2
const jl = (x) => 3 - x, jr = (x) => x * x - 1;
must(near(jl(2), 1) && near(jr(2), 3) && numLim(jl, 2, 1, [1e-1, 1e-2, 1e-3, 1e-4]) && numLim(jr, 2, 3, [1e-1, 1e-2, 1e-3, 1e-4]), 'jump limits');
export const plotJump = plot({ x: [-1, 3.2], y: [-0.5, 9.5], fns: [{ expr: '3 - x', label: r`$y = 3 - x,\ x < 2$`, domain: [-1, 2] }, { expr: 'x^2 - 1', label: r`$y = x^2 - 1,\ x \ge 2$`, domain: [2, 3.2] }], pts: [[2, 1, '(2, 1)'], [2, 3, '(2, 3)']] }, 'A graph in two pieces: the line y equals 3 minus x falling towards the point (2, 1), and the parabola piece y equals x squared minus 1 starting at the higher point (2, 3). There is a vertical gap of 2 at x equal to 2.', 'Left-hand limit $1$, right-hand limit $3$: the two disagree, so $\\displaystyle\\lim_{x \\to 2} f(x)$ does not exist.');

export const tblAlgebra = table(['If $\\displaystyle\\lim_{x \\to a} f(x) = l$ and $\\displaystyle\\lim_{x \\to a} g(x) = m$', 'then the limit of the combination is'], [
  ['Sum or difference $f \\pm g$', T('l \\pm m')],
  ['Constant multiple $kf$', T('kl')],
  ['Product $f \\cdot g$', T('l \\cdot m')],
  ['Quotient $\\dfrac{f}{g}$ (needs $m \\ne 0$)', T('\\dfrac{l}{m}')],
  ['Power $[f(x)]^n$', T('l^n')],
], 'Table of the algebra of limits: the limit of a sum or difference is the sum or difference of the limits, a constant multiple comes out, the limit of a product is the product, the limit of a quotient is the quotient provided the bottom limit is not zero, and the limit of a power is the power.', 'Limits can be added, multiplied and divided term by term, provided each limit exists (and the divisor limit is not $0$).');

// WE1: lim_{x -> -1} (2x^3 - x^2 + 4)/(x^2 + 3) = 1/4
const n1 = P(2, -1, 0, 4), d1 = P(1, 0, 3);
must(n1.eval(-1).eq(1) && d1.eval(-1).eq(4) && limRat(n1, d1, -1).value.eq(F(1, 4)), 'WE1');
export const we1Tbl = table(['Step', 'Working'], [
  ['Numerator at $x = -1$', T('2(-1)^3 - (-1)^2 + 4 = -2 - 1 + 4 = 1')],
  ['Denominator at $x = -1$', T('(-1)^2 + 3 = 4')],
  ['Denominator is not zero', 'so substitute directly'],
  ['Limit', T('\\dfrac{1}{4}')],
], 'Working table for the limit as x tends to minus 1 of two x cubed minus x squared plus 4 over x squared plus 3: the numerator becomes 1, the denominator becomes 4, and since the denominator is not zero the limit is one quarter.', 'A rational function with a non-zero denominator: just substitute.');

export const flowZero = flow('TB', [['a', 'Substitute x = a'], ['b', 'A number? That is the limit'], ['c', 'Zero over zero? Factorise top and bottom'], ['d', 'Cancel the common factor (x - a)'], ['e', 'Substitute x = a again']], [['a', 'b', 'denominator not 0'], ['a', 'c', '0/0'], ['c', 'd'], ['d', 'e']], 'Flow chart for limits of rational functions: substitute first; if the denominator is not zero the answer is the limit; if you get zero over zero, factorise, cancel the common factor and substitute again.', 'Zero over zero is not an answer: it tells you to cancel a common factor.');

// WE2: lim_{x -> 3} (x^2 - 5x + 6)/(x^2 - 9) = 1/6
const n2 = P(1, -5, 6), d2 = P(1, 0, -9);
const L2 = limRat(n2, d2, 3);
must(L2.value.eq(F(1, 6)) && approachExact(n2, d2, 3, F(1, 6)) && n2.eq(P(1, -2).mul(P(1, -3))) && d2.eq(P(1, 3).mul(P(1, -3))), 'WE2');
const we2Rows = ['2.9', '2.99', '2.999', '3.001', '3.01', '3.1'].map((s) => { const x = Fr.of(s); const v = n2.eval(x).div(d2.eval(x)).num(); return [s, dec(v)]; });
must(we2Rows.every(([, v]) => Math.abs(Number(v) - 1 / 6) < 0.02), 'WE2 rows');
const we2Vals = we2Rows.map(([x, v]) => `${Number(v).toFixed(4)} at ${x}`).join(', ');
export const we2Tbl = table(['$x$', r`$\dfrac{x^2 - 5x + 6}{x^2 - 9}$ (4 d.p.)`], we2Rows.map(([x, v]) => [x, String(Number(v).toFixed(4))]), `Values of x squared minus 5x plus 6 over x squared minus 9 near x equal to 3: ${we2Vals}. They approach one sixth, about 0.1667.`, 'After cancelling $(x - 3)$ the limit is $\\dfrac{3 - 2}{3 + 3} = \\dfrac{1}{6}$; the table agrees.');

// power limits
const pw = [[3, 2], [4, 3], [5, 2], [6, 1]];
const pwRows = pw.map(([n, a]) => { const ln = n * a ** (n - 1); const g = (x) => (x ** n - a ** n) / (x - a); must(numLim(g, a, ln, [1e-1, 1e-2, 1e-3, 1e-4], 5e-3), `power limit ${n},${a}`); return [T(`n = ${n},\\ a = ${a}`), T(`\\displaystyle\\lim_{x \\to ${a}} \\dfrac{x^{${n}} - ${a ** n}}{x - ${a}}`), T(`${n} \\times ${a}^{${n - 1}} = ${ln}`)]; });
export const tblPowerLim = table(['Case', 'Limit', r`Value $na^{n-1}$`], pwRows, 'Table of four cases of the standard limit of x to the n minus a to the n over x minus a as x tends to a: n 3 and a 2 gives 12; n 4 and a 3 gives 108; n 5 and a 2 gives 80; n 6 and a 1 gives 6. Each equals n times a to the power n minus 1.', r`$\displaystyle\lim_{x \to a}\dfrac{x^n - a^n}{x - a} = na^{n-1}$, checked numerically in each case.`);

// WE3: lim_{x -> 3} (x^6 - 729)/(x^4 - 81) = 27/2
const ratio = F(6 * 3 ** 5, 4 * 3 ** 3);
must(ratio.eq(F(27, 2)) && numLim((x) => (x ** 6 - 729) / (x ** 4 - 81), 3, 13.5, [1e-1, 1e-2, 1e-3, 1e-4], 5e-3), 'WE3');
export const we3Tbl = table(['Step', 'Working'], [
  ['Divide top and bottom by $x - 3$', T('\\dfrac{(x^6 - 3^6)/(x - 3)}{(x^4 - 3^4)/(x - 3)}')],
  ['Top limit', T('6 \\times 3^5 = 1458')],
  ['Bottom limit', T('4 \\times 3^3 = 108')],
  ['Quotient', T('\\dfrac{1458}{108} = \\dfrac{27}{2}')],
], 'Working table for the limit as x tends to 3 of x to the sixth minus 729 over x to the fourth minus 81: divide by x minus 3, the top tends to 1458 and the bottom to 108, so the limit is 1458 over 108, which is twenty-seven halves.', 'Use the standard limit twice, then divide.');

// sin x / x
export const plotSinc = plot({ x: [-12, 12], y: [-0.5, 1.3], fns: [{ expr: 'sin(x)/x', label: r`$y = \dfrac{\sin x}{x}$, $x \ne 0$`, domain: [-12, -0.001] }, { expr: 'sin(x)/x', domain: [0.001, 12] }], pts: [[0, 1, '(0, 1)', 'free']] }, 'The graph of sine x over x: a bell-shaped peak at the middle that closes in on the height 1 as x approaches 0 from either side, then small decaying ripples on both sides. The point (0, 1) is marked as a hole because the function is not defined at 0.', 'As $x \\to 0$, $\\dfrac{\\sin x}{x}$ closes in on $1$ (with $x$ in radians); the point $(0, 1)$ itself is missing.');
plotSinc.spec.points[0].on_curve = false; // the hole is not on the plotted pieces (the shared stage-4 lint needs the flag)

// trigonometric limits table
const trigDefs = [
  [r`\dfrac{\sin x}{x}`, (x) => Math.sin(x) / x, 1, '1'],
  [r`\dfrac{\tan x}{x}`, (x) => Math.tan(x) / x, 1, '1'],
  [r`\dfrac{\sin 4x}{x}`, (x) => Math.sin(4 * x) / x, 4, '4'],
  [r`\dfrac{1 - \cos x}{x}`, (x) => (1 - Math.cos(x)) / x, 0, '0'],
  [r`\dfrac{1 - \cos x}{x^2}`, (x) => (1 - Math.cos(x)) / (x * x), 0.5, r`\dfrac{1}{2}`],
];
export const tblTrig = table(['Expression', r`At $x = 0.001$`, 'Limit as $x \\to 0$'], trigDefs.map(([tex, g, L, ltx]) => { must(numLim(g, 0, L, [1e-1, 1e-2, 1e-3], 5e-3), `trig ${tex}`); const shown = dec(Math.round(g(0.001) * 1e6) / 1e6); return [T(tex), shown, T(ltx)]; }),
  'Table of trigonometric limits as x tends to 0: sine x over x tends to 1; tangent x over x tends to 1; sine 4x over x tends to 4; one minus cosine x over x tends to 0; one minus cosine x over x squared tends to one half. Each is shown with its value at x equal to 0.001.', 'The angle must be in radians. For $\\dfrac{\\sin kx}{x}$ the limit is $k$ (here $k = 4$); for $\\dfrac{1 - \\cos x}{x^2}$ it is $\\dfrac{1}{2}$.');

// WE4: sin 7x / tan 4x -> 7/4; (1 - cos 6x)/(x sin 3x) -> 6
must(numLim((x) => Math.sin(7 * x) / Math.tan(4 * x), 0, 1.75, [1e-1, 1e-2, 1e-3, 1e-4], 5e-3) && numLim((x) => (1 - Math.cos(6 * x)) / (x * Math.sin(3 * x)), 0, 6, [1e-1, 1e-2, 1e-3, 1e-4], 5e-3), 'WE4');
export const we4Tbl = table(['Limit', 'Working', 'Value'], [
  [T(r`\displaystyle\lim_{x \to 0}\dfrac{\sin 7x}{\tan 4x}`), T(r`\dfrac{\sin 7x}{7x} \cdot \dfrac{4x}{\tan 4x} \cdot \dfrac{7}{4}`), T(r`\dfrac{7}{4}`)],
  [T(r`\displaystyle\lim_{x \to 0}\dfrac{1 - \cos 6x}{x \sin 3x}`), T(r`\dfrac{1 - \cos 6x}{x^2} \div \dfrac{\sin 3x}{x} = 18 \div 3`), T('6')],
], 'Table of two worked limits as x tends to 0: sine 7x over tangent 4x equals seven quarters after dividing by 7x and 4x; one minus cosine 6x over x times sine 3x equals 18 divided by 3, which is 6.', 'Make the angle in the denominator match the angle inside, then use the standard limits.');

// exponential and logarithmic limits
const expDefs = [
  [r`\dfrac{e^x - 1}{x}`, (x) => (Math.exp(x) - 1) / x, 1, '1'],
  [r`\dfrac{e^{3x} - 1}{x}`, (x) => (Math.exp(3 * x) - 1) / x, 3, '3'],
  [r`\dfrac{\ln(1 + x)}{x}`, (x) => Math.log(1 + x) / x, 1, '1'],
  [r`\dfrac{\ln(1 + 5x)}{x}`, (x) => Math.log(1 + 5 * x) / x, 5, '5'],
];
export const tblExpLog = table(['Expression', r`At $x = 0.001$`, 'Limit as $x \\to 0$'], expDefs.map(([tex, g, L, ltx]) => { must(numLim(g, 0, L, [1e-1, 1e-2, 1e-3, 1e-4], 2e-2), `exp ${tex}`); return [T(tex), dec(Math.round(g(0.001) * 1e4) / 1e4), T(ltx)]; }),
  'Table of exponential and logarithmic limits as x tends to 0: e to the x minus 1 over x tends to 1; e to the 3x minus 1 over x tends to 3; natural log of 1 plus x over x tends to 1; natural log of 1 plus 5x over x tends to 5. Each is shown with its value near x equal to 0.001.', r`$\dfrac{e^{kx} - 1}{x} \to k$ and $\dfrac{\ln(1 + kx)}{x} \to k$ as $x \to 0$.`);

// WE5: (e^{3x} - 1)/x -> 3? use (e^{6x} - 1)/(2x) -> 3 and ln(1 + 5x)/(2x)... keep both: values 3 and 5/2
must(numLim((x) => (Math.exp(6 * x) - 1) / (2 * x), 0, 3, [1e-1, 1e-2, 1e-3, 1e-4], 5e-2) && numLim((x) => Math.log(1 + 5 * x) / (2 * x), 0, 2.5, [1e-1, 1e-2, 1e-3, 1e-4], 5e-2), 'WE5');
export const we5Tbl = table(['Limit', 'Working', 'Value'], [
  [T(r`\displaystyle\lim_{x \to 0}\dfrac{e^{6x} - 1}{2x}`), T(r`\dfrac{e^{6x} - 1}{6x} \times \dfrac{6}{2}`), T('3')],
  [T(r`\displaystyle\lim_{x \to 0}\dfrac{\ln(1 + 5x)}{2x}`), T(r`\dfrac{\ln(1 + 5x)}{5x} \times \dfrac{5}{2}`), T(r`\dfrac{5}{2}`)],
], 'Table of two worked limits as x tends to 0: e to the 6x minus 1 over 2x equals 6 over 2, which is 3; natural log of 1 plus 5x over 2x equals 5 over 2.', 'Divide and multiply by the coefficient inside, then use the standard limit.');

export const summary1 = table(['Type', 'Method', 'Standard value'], [
  ['Polynomial, or rational with $D(a) \\ne 0$', 'Substitute', 'The value at $a$'],
  ['Rational, $\\dfrac{0}{0}$', 'Factorise and cancel $(x - a)$', 'Then substitute'],
  [T(r`\dfrac{x^n - a^n}{x - a}`), 'Standard limit', T('na^{n-1}')],
  ['Trigonometric ($x$ in radians)', 'Match the angles', T(r`\dfrac{\sin x}{x} \to 1,\ \dfrac{1 - \cos x}{x^2} \to \dfrac{1}{2}`)],
  ['Exponential and logarithmic', 'Match the coefficient', T(r`\dfrac{e^x - 1}{x} \to 1,\ \dfrac{\ln(1 + x)}{x} \to 1`)],
], 'Summary table of limit methods: substitute for polynomials and rational functions with a non-zero denominator; factorise and cancel for zero over zero; the standard limit n a to the n minus 1 for x to the n minus a to the n over x minus a; matching angles for trigonometric limits; matching coefficients for exponential and logarithmic limits.', 'A one-page map of the methods for limits.');

// ---------------------------------------------------------------- deck 2: derivatives
// y = 0.5x^2 + 1 at P(2, 3): secants through P and Q at x = 4 and x = 3, tangent of slope 2
const cf = (x) => 0.5 * x * x + 1;
must(near(cf(2), 3) && near(cf(4), 9) && near(cf(3), 5.5) && near((cf(4) - 3) / 2, 3) && near((cf(3) - 3) / 1, 2.5) && near(dnum(cf, 2), 2), 'secant plot');
export const plotSecant = plot({ x: [0, 4.6], y: [0, 11], fns: [{ expr: '0.5*x^2 + 1', label: r`$y = \dfrac{1}{2}x^2 + 1$` }, { expr: '3 + 3*(x - 2)', label: 'secant to Q(4, 9), slope 3', domain: [0.5, 4.5] }, { expr: '3 + 2.5*(x - 2)', label: 'secant to Q(3, 5.5), slope 2.5', domain: [0.5, 4.5] }, { expr: '3 + 2*(x - 2)', label: 'tangent at P, slope 2', domain: [0.5, 4.5] }], pts: [[2, 3, 'P(2, 3)'], [3, 5.5, 'Q(3, 5.5)'], [4, 9, 'Q(4, 9)']] }, 'The curve y equals half x squared plus 1 with the point P at (2, 3). Two secant lines from P to the points (3, 5.5) and (4, 9) have slopes 2.5 and 3; as the second point slides down the curve towards P the secant swings to the tangent at P, whose slope is 2.',  'Secant slopes $3$, $2.5$, ... close in on the tangent slope $2$ at $P$.');

// rate of change: s(t) = 2t^2 + 3t, average speed over [2, 2 + h] = 11 + 2h
const s = P(2, 3, 0);
must(s.eval(2).eq(14), 's(2)');
const hs = ['1', '0.1', '0.01', '0.001'];
const rateRows = hs.map((hStr) => { const h = Fr.of(hStr); const v = s.eval(F(2).add(h)).sub(s.eval(2)).div(h); must(v.eq(F(11).add(h.mul(2))), 'avg speed'); return [hStr, s.eval(F(2).add(h)).dec(), v.dec()]; });
export const tblRate = table(['$h$ (seconds)', 'Distance $s(2 + h)$ (m)', 'Average speed over $[2, 2 + h]$ (m/s)'], rateRows, `Table for a toy car whose distance is s of t equal to 2 t squared plus 3 t metres. Over the time from 2 to 2 plus h, for h equal to ${hs.join(', ')}, the distances are ${rateRows.map((x) => x[1]).join(', ')} metres and the average speeds ${rateRows.map((x) => x[2]).join(', ')} metres per second, closing in on 11.`, 'Average speeds $11 + 2h$ close in on the speed $11$ m/s at $t = 2$.');

export const tblNotation = table(['Name', 'Notation', 'Meaning'], [
  ['Derivative of $f$ at $x$', T(r`f'(x) = \displaystyle\lim_{h \to 0}\dfrac{f(x + h) - f(x)}{h}`), 'Slope of the tangent; instantaneous rate of change'],
  ['Same thing, other notation', T(r`\dfrac{dy}{dx},\ \dfrac{d}{dx}f(x)`), 'The derivative of $y = f(x)$ with respect to $x$'],
  ['Value at a point', T(r`f'(a)`), T(r`\displaystyle\lim_{h \to 0}\dfrac{f(a + h) - f(a)}{h}`)],
], 'Table of notation: the derivative of f at x is the limit as h tends to 0 of f of x plus h minus f of x, over h. It is also written dy by dx. The value at a point a is f dash of a. It is the slope of the tangent and the instantaneous rate of change.', 'The derivative is a limit of difference quotients.');

// WE1: first principles for f(x) = 3x^2 + 2x - 1; f(x+h) - f(x) = 6xh + 3h^2 + 2h
const f1 = P(3, 2, -1);
for (const x of [F(-3), F(0), F(1, 2), F(2), F(7)]) for (const h of [F(1), F(1, 10), F(-1, 3)]) must(f1.eval(x.add(h)).sub(f1.eval(x)).eq(x.mul(h).mul(6).add(h.mul(h).mul(3)).add(h.mul(2))), 'WE1 expansion');
for (const x0 of [-3, 0, 2, 5]) must(fpPoly(f1, x0).value.eq(6 * x0 + 2), 'WE1 derivative');
export const we1dTbl = table(['Step', 'Working'], [
  ['$f(x + h)$', T('3(x + h)^2 + 2(x + h) - 1 = 3x^2 + 6xh + 3h^2 + 2x + 2h - 1')],
  ['$f(x + h) - f(x)$', T('6xh + 3h^2 + 2h')],
  ['Divide by $h$', T('6x + 3h + 2')],
  ['Let $h \\to 0$', T("f'(x) = 6x + 2")],
], 'Working table for the derivative of 3x squared plus 2x minus 1 from first principles: f of x plus h minus f of x equals 6xh plus 3h squared plus 2h; dividing by h gives 6x plus 3h plus 2; letting h tend to 0 gives f dash of x equal to 6x plus 2.', 'Always expand, cancel $f(x)$, divide by $h$, then let $h \\to 0$.');

// WE2: first principles for g(x) = 1/(2x + 1): -2/(2x + 1)^2
const gx = (x) => F(1).div(F(2).mul(x).add(1));
for (const x0 of [F(1), F(2), F(-3), F(1, 2)]) {
  const exact = F(-2).div(F(2).mul(x0).add(1).pow(2));
  for (const k of [3, 5, 7]) { const h = new Fr(1n, 10n ** BigInt(k)); const q = gx(x0.add(h)).sub(gx(x0)).div(h); must(Math.abs(q.sub(exact).num()) < 4 * h.num(), 'WE2d approach'); must(q.eq(F(-2).div(F(2).mul(x0.add(h)).add(1).mul(F(2).mul(x0).add(1)))), 'WE2d algebra'); }
}
export const we2dTbl = table(['Step', 'Working'], [
  ['Difference', T(r`\dfrac{1}{2x + 2h + 1} - \dfrac{1}{2x + 1} = \dfrac{(2x + 1) - (2x + 2h + 1)}{(2x + 2h + 1)(2x + 1)} = \dfrac{-2h}{(2x + 2h + 1)(2x + 1)}`)],
  ['Divide by $h$', T(r`\dfrac{-2}{(2x + 2h + 1)(2x + 1)}`)],
  ['Let $h \\to 0$', T(r`g'(x) = \dfrac{-2}{(2x + 1)^2}`)],
], 'Working table for the derivative of 1 over 2x plus 1 from first principles: the difference of the two fractions over a common denominator is minus 2h over the product, dividing by h gives minus 2 over the product, and letting h tend to 0 gives minus 2 over 2x plus 1 squared.', 'Combine the fractions first; the factor $h$ then cancels.');

// sin and cos from first principles
for (const x of [0.3, 1.1, 2.5]) for (const h of [0.5, 0.01]) {
  must(near(Math.sin(x + h) - Math.sin(x), 2 * Math.cos(x + h / 2) * Math.sin(h / 2), 1e-9), 'sum to product sin');
  must(near(Math.cos(x + h) - Math.cos(x), -2 * Math.sin(x + h / 2) * Math.sin(h / 2), 1e-9), 'sum to product cos');
}
must(checkDeriv(Math.sin, Math.cos, [0.3, 1.1, 2.5]) && checkDeriv(Math.cos, (x) => -Math.sin(x), [0.3, 1.1, 2.5]), 'sin cos derivatives');
export const tblSinCos = table(['Function', 'Difference', 'Divide by $h$ and let $h \\to 0$', 'Derivative'], [
  [T(r`\sin x`), T(r`\sin(x + h) - \sin x = 2\cos\left(x + \dfrac{h}{2}\right)\sin\dfrac{h}{2}`), T(r`\cos\left(x + \dfrac{h}{2}\right) \cdot \dfrac{\sin(h/2)}{h/2} \to \cos x \cdot 1`), T(r`\cos x`)],
  [T(r`\cos x`), T(r`\cos(x + h) - \cos x = -2\sin\left(x + \dfrac{h}{2}\right)\sin\dfrac{h}{2}`), T(r`-\sin\left(x + \dfrac{h}{2}\right) \cdot \dfrac{\sin(h/2)}{h/2} \to -\sin x`), T(r`-\sin x`)],
], 'Table: the derivative of sine x from first principles. The difference sine of x plus h minus sine x equals 2 cosine of x plus h over 2 times sine of h over 2. After dividing by h and using sine u over u tends to 1, the result is cosine x. The same method gives the derivative of cosine x as minus sine x.', 'Sum-to-product identity, then $\\dfrac{\\sin u}{u} \\to 1$.');

// power rule table with numeric checks
const rules = [
  ['c', (x) => 5, (x) => 0, '5', '0'],
  ['x^n', (x) => x ** 4, (x) => 4 * x ** 3, 'x^4', '4x^3'],
  ['x^{-2}', (x) => x ** -2, (x) => -2 * x ** -3, 'x^{-2}', '-2x^{-3}'],
  ['\\sqrt{x}', (x) => Math.sqrt(x), (x) => 0.5 * x ** -0.5, '\\sqrt{x}', '\\dfrac{1}{2\\sqrt{x}}'],
  ['\\sin x', Math.sin, Math.cos, '\\sin x', '\\cos x'],
  ['\\cos x', Math.cos, (x) => -Math.sin(x), '\\cos x', '-\\sin x'],
  ['\\tan x', Math.tan, (x) => 1 / Math.cos(x) ** 2, '\\tan x', '\\sec^2 x'],
  ['\\cot x', (x) => 1 / Math.tan(x), (x) => -1 / Math.sin(x) ** 2, '\\cot x', '-\\operatorname{cosec}^2 x'],
  ['\\sec x', (x) => 1 / Math.cos(x), (x) => Math.sin(x) / Math.cos(x) ** 2, '\\sec x', '\\sec x \\tan x'],
  ['\\operatorname{cosec} x', (x) => 1 / Math.sin(x), (x) => -Math.cos(x) / Math.sin(x) ** 2, '\\operatorname{cosec} x', '-\\operatorname{cosec} x \\cot x'],
];
for (const [, g, dg] of rules) must(checkDeriv(g, dg, [0.4, 0.9, 1.3]), 'rule table');
export const tblRules = table(['Function $f(x)$', "Derivative $f'(x)$"], [
  [T('c'), T('0')], [T('x^n'), T('nx^{n-1}')], [T(r`\sin x`), T(r`\cos x`)], [T(r`\cos x`), T(r`-\sin x`)],
  [T(r`\tan x`), T(r`\sec^2 x`)], [T(r`\cot x`), T(r`-\operatorname{cosec}^2 x`)], [T(r`\sec x`), T(r`\sec x \tan x`)], [T(r`\operatorname{cosec} x`), T(r`-\operatorname{cosec} x \cot x`)],
], 'Table of standard derivatives: a constant has derivative 0; x to the n has n x to the n minus 1; sine x gives cosine x; cosine x gives minus sine x; tangent x gives secant squared x; cotangent x gives minus cosecant squared x; secant x gives secant x tangent x; cosecant x gives minus cosecant x cotangent x.', 'The standard list; each entry is also checked numerically.');

export const tblAlgebraD = table(['Rule', 'Formula'], [
  ['Constant multiple', T(r`(kf)\prime = kf\prime`)],
  ['Sum and difference', T(r`(f \pm g)\prime = f\prime \pm g\prime`)],
  ['Product', T(r`(fg)\prime = f\prime g + fg\prime`)],
  ['Quotient', T(r`\left(\dfrac{f}{g}\right)\prime = \dfrac{f\prime g - fg\prime}{g^2},\ g \ne 0`)],
], 'Table of the algebra of derivatives: a constant multiple comes out, sums and differences are taken term by term, the product rule is f dash g plus f g dash, and the quotient rule is f dash g minus f g dash over g squared.', 'The derivative of a product is not the product of the derivatives.');

// WE3: (x^2 + 3)(2x - 5) -> 6x^2 - 10x + 6
const u3 = P(1, 0, 3), v3 = P(2, -5);
must(u3.deriv().mul(v3).add(u3.mul(v3.deriv())).eq(P(6, -10, 6)) && u3.mul(v3).deriv().eq(P(6, -10, 6)), 'WE3 product');
export const we3dTbl = table(['Step', 'Working'], [
  ['Take $u = x^2 + 3$, $v = 2x - 5$', T("u' = 2x,\\ v' = 2")],
  ['Product rule', T("(uv)' = u'v + uv' = 2x(2x - 5) + 2(x^2 + 3)")],
  ['Expand', T('4x^2 - 10x + 2x^2 + 6 = 6x^2 - 10x + 6')],
  ['Check by multiplying first', T('uv = 2x^3 - 5x^2 + 6x - 15,\\ (uv)\' = 6x^2 - 10x + 6')],
], 'Working table for the derivative of x squared plus 3 times 2x minus 5: u dash is 2x and v dash is 2; the product rule gives 2x times 2x minus 5 plus 2 times x squared plus 3, which is 6x squared minus 10x plus 6, and multiplying out first gives the same answer.', 'Two routes, one answer: the product rule and expanding first.');

// WE4: (2x + 3)/(x^2 + 4)
const q4 = (x) => (2 * x + 3) / (x * x + 4);
const dq4 = (x) => (-2 * x * x - 6 * x + 8) / (x * x + 4) ** 2;
must(checkDeriv(q4, dq4, [-2, 0, 1.5, 3]) && P(-2, -6, 8).eq(P(2).mul(P(1, 0, 4)).sub(P(2, 3).mul(P(2, 0)))), 'WE4 quotient');
export const we4dTbl = table(['Step', 'Working'], [
  ['Take $u = 2x + 3$, $v = x^2 + 4$', T("u' = 2,\\ v' = 2x")],
  ['Quotient rule', T("\\dfrac{u'v - uv'}{v^2} = \\dfrac{2(x^2 + 4) - (2x + 3)(2x)}{(x^2 + 4)^2}")],
  ['Simplify the top', T('2x^2 + 8 - 4x^2 - 6x = -2x^2 - 6x + 8')],
  ['Result', T(r`\dfrac{-2x^2 - 6x + 8}{(x^2 + 4)^2}`)],
], 'Working table for the derivative of 2x plus 3 over x squared plus 4: u dash is 2 and v dash is 2x; the quotient rule gives 2 times x squared plus 4 minus 2x plus 3 times 2x, over x squared plus 4 squared; the top simplifies to minus 2x squared minus 6x plus 8.', 'Top: $u\'v - uv\'$; bottom: $v^2$.');

// tan and sec^2
export const plotTan = plot({ x: [-1.1, 1.1], y: [-3, 6], fns: [{ expr: 'tan(x)', label: r`$y = \tan x$` }, { expr: '1/cos(x)^2', label: r`$y = \sec^2 x$ (the slope of $\tan x$)` }], pts: [[0, 0, '(0, 0)'], [0, 1, '(0, 1)']] }, 'Two curves for x between minus 1.1 and 1.1: y equals tangent x rising through the origin, and y equals secant squared x, a U-shaped curve with lowest value 1 at x equal to 0. The height of the second curve is the slope of the first: 1 at the origin and growing as tangent x steepens.', 'The slope of $\\tan x$ is $\\sec^2 x$: it is $1$ at the origin and grows as the curve steepens.');

// WE5: sin x/(1 + cos x) -> 1/(1 + cos x)
const q5 = (x) => Math.sin(x) / (1 + Math.cos(x));
const dq5 = (x) => 1 / (1 + Math.cos(x));
const pts5 = [0.4, 1.0, 2.0];
must(checkDeriv(q5, dq5, pts5), 'WE5');
export const we5dTbl = table(['Step', 'Working'], [
  ['Quotient rule', T(r`\dfrac{\cos x(1 + \cos x) - \sin x \cdot (-\sin x)}{(1 + \cos x)^2}`)],
  ['Simplify the top', T(r`\cos x + \cos^2 x + \sin^2 x = 1 + \cos x`)],
  ['Cancel', T(r`\dfrac{1 + \cos x}{(1 + \cos x)^2} = \dfrac{1}{1 + \cos x}`)],
  ['Numeric check at $x = 1$', T(`${dec(dnum(q5, 1))} \\approx \\dfrac{1}{1 + \\cos 1} = ${dec(dq5(1))}`)],
], 'Working table for the derivative of sine x over 1 plus cosine x: the quotient rule gives cosine x times 1 plus cosine x plus sine squared x over 1 plus cosine x squared; the top simplifies to 1 plus cosine x and one factor cancels to leave 1 over 1 plus cosine x. A numeric check at x equal to 1 agrees.', 'Use $\\sin^2 x + \\cos^2 x = 1$ to simplify.');

// tangent slope: y = x^3 - 6x at x = 2, slope 6, tangent y = 6x - 16
const cu = (x) => x ** 3 - 6 * x;
must(near(cu(2), -4) && near(dnum(cu, 2), 6) && near(6 * 2 - 16, -4), 'tangent plot');
export const plotTangent = plot({ x: [-3, 3.2], y: [-12, 12], fns: [{ expr: 'x^3 - 6*x', label: r`$y = x^3 - 6x$` }, { expr: '6*x - 16', label: 'tangent at $(2, -4)$', domain: [1, 3] }], pts: [[2, -4, '(2, -4)']] }, 'The cubic curve y equals x cubed minus 6x, rising, falling and rising again, with the point (2, minus 4) marked. A straight line of slope 6 touches the curve at that point and just skims it.', 'The slope of $y = x^3 - 6x$ at $x = 2$ is $f\'(2) = 3(4) - 6 = 6$.');

export const tblChain = table(['Function', 'Inner $g(x)$', 'Outer $f$', 'Derivative'], [
  [T(r`(3x - 1)^5`), T('3x - 1'), T('u^5'), T('5(3x - 1)^4 \\times 3 = 15(3x - 1)^4')],
  [T(r`\sin 7x`), T('7x'), T(r`\sin u`), T(r`\cos 7x \times 7 = 7\cos 7x`)],
  [T(r`\cos(x^2)`), T('x^2'), T(r`\cos u`), T(r`-\sin(x^2) \times 2x = -2x\sin(x^2)`)],
], 'Table for the chain rule: for the function of a function f of g of x, the derivative is f dash of g of x times g dash of x. Three cases: 3x minus 1 to the 5 gives 15 times 3x minus 1 to the 4; sine 7x gives 7 cosine 7x; cosine of x squared gives minus 2x sine of x squared.', 'Differentiate the outside, keep the inside, then multiply by the derivative of the inside.');
for (const [g, dg] of [[(x) => (3 * x - 1) ** 5, (x) => 15 * (3 * x - 1) ** 4], [(x) => Math.sin(7 * x), (x) => 7 * Math.cos(7 * x)], [(x) => Math.cos(x * x), (x) => -2 * x * Math.sin(x * x)]]) must(checkDeriv(g, dg, [0.3, 0.8, 1.4]), 'chain table');

// WE6: (x^2 + x + 1)^6 -> 6(2x + 1)(x^2 + x + 1)^5 ; sin 7x -> 7cos 7x (table of numeric check)
const g6 = (x) => (x * x + x + 1) ** 6, dg6 = (x) => 6 * (2 * x + 1) * (x * x + x + 1) ** 5;
must(checkDeriv(g6, dg6, [-1, 0.5, 1.2], 1e-6), 'WE6');
export const we6Tbl = table(['Function', 'Working', 'Derivative'], [
  [T(r`(x^2 + x + 1)^6`), T(r`6(x^2 + x + 1)^5 \times (2x + 1)`), T(r`6(2x + 1)(x^2 + x + 1)^5`)],
  [T(r`\tan 5x`), T(r`\sec^2 5x \times 5`), T(r`5\sec^2 5x`)],
], 'Table of two chain rule examples: x squared plus x plus 1 to the 6 has derivative 6 times 2x plus 1 times x squared plus x plus 1 to the 5; tangent 5x has derivative 5 secant squared 5x.', 'Outer derivative at the inner function, times the inner derivative.');
must(checkDeriv((x) => Math.tan(5 * x), (x) => 5 / Math.cos(5 * x) ** 2, [0.05, 0.1, 0.15]), 'tan 5x');

export const summary2 = table(['Topic', 'Key results'], [
  ['Definition', T(r`f'(x) = \displaystyle\lim_{h \to 0}\dfrac{f(x + h) - f(x)}{h}`)],
  ['Powers and constants', T('(x^n)\' = nx^{n-1},\\ (c)\' = 0')],
  ['Trigonometric', T(r`(\sin x)' = \cos x,\ (\cos x)' = -\sin x,\ (\tan x)' = \sec^2 x`)],
  ['Product, quotient', T(r`(fg)' = f'g + fg',\ \left(\dfrac{f}{g}\right)' = \dfrac{f'g - fg'}{g^2}`)],
  ['Chain rule (formative)', T(r`\dfrac{d}{dx}f(g(x)) = f'(g(x))\,g'(x)`)],
], 'Summary table of derivative results: the definition as a limit, the power rule and constants, the derivatives of sine, cosine and tangent, the product and quotient rules, and the chain rule for functions of a function.', 'The results of the chapter in one table.');

// notes-only strategy flow
export const flowStrategy = flow('TB', [['a', 'What is asked?'], ['b', 'A limit'], ['c', 'A derivative'], ['d', 'Substitute; if 0/0 factorise, use a standard limit'], ['e', 'From first principles?'], ['f', 'Use the difference quotient and let h tend to 0'], ['g', 'Otherwise use the rules: power, sum, product, quotient, chain']], [['a', 'b'], ['a', 'c'], ['b', 'd'], ['c', 'e'], ['e', 'f', 'asked to'], ['e', 'g', 'not asked']], 'Strategy chart: for a limit, substitute and if zero over zero factorise or use a standard limit; for a derivative, use the difference quotient only if first principles is asked, otherwise use the rules.', 'Choose the method from the wording of the question.');
