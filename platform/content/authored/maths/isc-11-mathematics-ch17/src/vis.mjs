// Visuals for ISC 11 Mathematics ch17 Derivatives. Every number in a table or figure is computed here and asserted:
// plots by central difference (tangent slope = derivative) and point tests; tables by exact fractions or by numeric identity
// checks of each difference quotient against its simplified form and each derivative against a central difference.
import { table, flow, plot as plot0 } from './lib.mjs';
import { E, F, Fr, cd, near, derivOK, dqOK, XS, XP, XT, ef, poly, round } from './calc.mjs';

const r = String.raw;
/** plot() that also marks 'free' points on_curve: false (the shared stage-4 lint needs the flag). */
const plot = (spec, alt, caption) => { const v = plot0(spec, alt, caption); (spec.pts ?? []).forEach((p, i) => { if (p[3] === 'free') v.spec.points[i].on_curve = false; }); return v; };
export const must = (cond, msg) => { if (!cond) throw new Error(`self-check failed: ${msg}`); };
export const V = {};
const M = (t) => `$${t}$`;
const num = (v) => String(round(v, 6));
/** Expression string of the line through (x0, y0) with slope m, for a plot. */
export const lineExpr = (m, x0, y0) => `${num(y0)}${m < 0 ? '-' : '+'}${num(Math.abs(m))}*(x${x0 < 0 ? '+' : '-'}${num(Math.abs(x0))})`;
/** The simplified quotient q(x, h) equals (f(x + h) - f(x))/h, and the derivative d equals q at h = 0 and a central difference. */
export function dqIdentity(fs, qs, ds, xs = XP, hs = [0.5, 0.1, 0.01, -0.05]) {
  const f = ef(fs), q = E(qs), d = ef(ds);
  for (const x of xs) {
    for (const h of hs) must(near((f(x + h) - f(x)) / h, q.g({ x, h }), 1e-9), `quotient ${qs} for ${fs} at x = ${x}, h = ${h}`);
    must(near(q.g({ x, h: 1e-9 }), d(x), 1e-6), `limit of ${qs} is ${ds} at x = ${x}`);
  }
  must(derivOK(f, d, xs), `${ds} is the derivative of ${fs}`);
  return true;
}
/** Tangent plots: f, the tangent at a, and optional secants through (a, f(a)) and other points. */
export function tangentFns(fs, a, df, extra = []) {
  const f = ef(fs), m = df(a);
  must(near(cd(f, a), m, 1e-6), `slope of the tangent to ${fs} at ${a}`);
  return { f, m, y0: f(a), tangent: lineExpr(m, a, f(a)) };
}

// ================================================================ deck 1
V.route1 = flow('LR', [['a', 'Average and instantaneous velocity'], ['b', 'Slope of a tangent'], ['c', 'The definition of the derivative'], ['d', 'Powers, square roots and reciprocals'], ['e', 'Sine and cosine']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Route map of Part 1: average and instantaneous velocity, the slope of a tangent, the definition of the derivative as a limit, derivatives of powers, square roots and reciprocals from the definition, and then sine and cosine.', 'Part 1 at a glance.');
V.goals1 = table(['You will be able to', 'Using', 'Key result'], [
  ['Find an average and an instantaneous velocity', 'a distance-time function', M(r`\dfrac{s(t + h) - s(t)}{h}`) + ' as ' + M(r`h \to 0`)],
  ['Find the slope and equation of a tangent', 'the derivative at a point', M(r`y - f(a) = f'(a)(x - a)`)],
  ['Differentiate from the definition', 'a limit', M(r`f'(x) = \lim_{h \to 0} \dfrac{f(x + h) - f(x)}{h}`)],
  ['Differentiate powers, roots and reciprocals', 'algebra before the limit', M(r`x^n,\ \sqrt{x},\ \dfrac{1}{x + a}`)],
  ['Differentiate sine and cosine', 'two standard limits', M(r`\dfrac{\sin h}{h} \to 1,\ \dfrac{\cos h - 1}{h} \to 0`)],
], 'Table of goals for Part 1: velocity from a distance-time function, the tangent equation, the definition of the derivative, derivatives of powers, roots and reciprocals from the definition, and derivatives of sine and cosine.', 'What Part 1 covers.');

// average velocity of a trolley, s = t^2 + 3t, on [2, 2 + h]
{
  const s = (t) => t.mul(t).add(t.mul(3));
  const rows = [F(1), F(1, 2), F(1, 10), F(1, 100)].map((h) => {
    const avg = s(F(2).add(h)).sub(s(F(2))).div(h);
    must(avg.eq(F(7).add(h)), 'average velocity 7 + h');
    const hn = h.num();
    return [M(num(hn)), M(`[2,\\ ${num(2 + hn)}]`), M(num(avg.num()))];
  });
  must(s(F(2)).eq(10) && s(F(3)).eq(18), 'trolley distances');
  V.avg = table(['$h$ (seconds)', 'Interval', 'Average velocity (m/s)'], rows, 'Table for a trolley with distance s equal to t squared plus 3 t metres: over the interval from 2 seconds to 2 plus h seconds the average velocity is 8, 7.5, 7.1 and 7.01 metres per second for h equal to 1, 0.5, 0.1 and 0.01, which is 7 plus h and approaches 7.', 'Average velocity on $[2, 2 + h]$ is $7 + h$.');
}
// the distance-time graph with a secant and the tangent
{
  const fs = 'x^2+3x', df = (t) => 2 * t + 3, a = 2, f = ef(fs);
  const tg = tangentFns(fs, a, df);
  const secM = (f(3) - f(2)) / 1;
  must(f(2) === 10 && f(3) === 18 && secM === 8 && tg.m === 7, 'trolley graph');
  const sec = lineExpr(secM, 2, 10), tan = lineExpr(7, 2, 10);
  V.inst = plot({ x: [0, 4], y: [-8, 30], xl: 't (seconds)', yl: 's (metres)', fns: [{ expr: fs, label: 'distance s' }, { expr: sec, label: 'secant PQ' }, { expr: tan, label: 'tangent at P' }], pts: [[2, 10, '$P(2, 10)$'], [3, 18, '$Q(3, 18)$']] }, 'Distance-time graph of s equal to t squared plus 3 t. The secant through P at t equal to 2 and Q at t equal to 3 has slope 8, the average velocity; the tangent at P has slope 7, the instantaneous velocity.', 'Secant slope $8$ (average), tangent slope $7$ (instantaneous).');
}
// we1
{
  const s = (t) => t.mul(t).mul(2).add(t.mul(5));
  must(s(F(1)).eq(7) && s(F(3)).eq(33) && s(F(3)).sub(s(F(1))).div(2).eq(13), 'we1 average');
  must([F(1, 10), F(1, 100), F(1, 1000)].every((h) => s(F(1).add(h)).sub(s(F(1))).div(h).eq(F(9).add(h.mul(2)))), 'we1 quotient 9 + 2h');
  V.we1 = table(['Step', 'Work'], [
    ['Distances', M(r`s(1) = 2 + 5 = 7, \quad s(3) = 18 + 15 = 33`)],
    ['Average velocity on $[1, 3]$', M(r`\dfrac{33 - 7}{3 - 1} = 13 \text{ m/s}`)],
    ['Quotient from $t = 1$', M(r`\dfrac{s(1 + h) - s(1)}{h} = \dfrac{9h + 2h^2}{h} = 9 + 2h`)],
    ['Velocity at $t = 1$', M(r`\lim_{h \to 0} (9 + 2h) = 9 \text{ m/s}`)],
  ], 'Worked example 1 table: for s equal to 2 t squared plus 5 t, the average velocity from t equal to 1 to t equal to 3 is 26 divided by 2, which is 13 metres per second, and the quotient from t equal to 1 is 9 plus 2 h, which tends to 9 metres per second.', 'Average and instantaneous velocity of one cart.');
}
// secants approaching the tangent
{
  const fs = 'x^2-4x+5', f = ef(fs), df = (x) => 2 * x - 4;
  const tg = tangentFns(fs, 3, df);
  const m1 = (f(5) - f(3)) / 2, m2 = (f(4) - f(3)) / 1;
  must(f(3) === 2 && f(5) === 10 && f(4) === 5 && m1 === 4 && m2 === 3 && tg.m === 2, 'secant slopes 4, 3 and tangent 2');
  V.secants = plot({ x: [0, 6], y: [0, 11], fns: [{ expr: fs, label: 'curve' }, { expr: lineExpr(4, 3, 2), label: 'secant PQ1' }, { expr: lineExpr(3, 3, 2), label: 'secant PQ2' }, { expr: lineExpr(2, 3, 2), label: 'tangent at P' }], pts: [[3, 2, '$P(3, 2)$'], [5, 10, '$Q_1(5, 10)$'], [4, 5, '$Q_2(4, 5)$']] }, 'Plot of y equal to x squared minus 4 x plus 5 with P at 3, 2. The secant to Q1 at 5, 10 has slope 4, the secant to Q2 at 4, 5 has slope 3, and the tangent at P has slope 2: the secant slopes decrease to the tangent slope as Q approaches P.', 'Secant slopes $4$, $3$, ... approach the tangent slope $2$.');
}
// tangent equation (table for the same curve)
{
  const f = ef('x^2-4x+5');
  must(f(3) === 2 && [0.1, 0.01, 0.001].every((h) => near((f(3 + h) - f(3)) / h, 2 + h, 1e-9)) && 2 * 3 - 4 === 2 && 2 + 2 * (0 - 3) === -4, 'tangent y = 2x - 4');
  V.tangeq = table(['Step', 'Work'], [
    ['Point of contact', M(r`x = 3: \; f(3) = 9 - 12 + 5 = 2`)],
    ['Slope from the definition', M(r`\dfrac{f(3 + h) - f(3)}{h} = \dfrac{2h + h^2}{h} = 2 + h \to 2`)],
    ['Tangent', M(r`y - 2 = 2(x - 3)`)],
    ['Simplified', M(r`y = 2x - 4`)],
  ], 'Table that finds the tangent to y equal to x squared minus 4 x plus 5 at x equal to 3: f of 3 is 2, the difference quotient is 2 plus h which tends to 2, so the tangent is y minus 2 equals 2 times x minus 3, which is y equal to 2 x minus 4.', 'Tangent: $y - f(a) = f\'(a)(x - a)$.');
}
// we2
{
  const fs = '3x^2-x', f = ef(fs), df = (x) => 6 * x - 1;
  const tg = tangentFns(fs, 2, df);
  must(f(2) === 10 && tg.m === 11 && 11 * 2 - 12 === 10 && [0.1, 0.01].every((h) => near((f(2 + h) - f(2)) / h, 11 + 3 * h, 1e-9)), 'we2');
  V.we2 = plot({ x: [-0.5, 3], y: [-5, 28], fns: [{ expr: fs, label: 'curve' }, { expr: '11*x-12', label: 'tangent at x = 2' }], pts: [[2, 10, '$(2, 10)$']] }, 'Plot of y equal to 3 x squared minus x and its tangent y equal to 11 x minus 12 at the point 2, 10, where both pass.', 'Slope $11$ at $x = 2$.');
}
// the definition: flow
V.def = flow('LR', [['a', 'Write f of x plus h'], ['b', 'Form the difference quotient'], ['c', 'Simplify and cancel h'], ['d', 'Let h tend to zero']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow chart of differentiation from first principles: write f of x plus h, form the difference quotient, simplify and cancel the factor h, then let h tend to zero.', 'Four steps of the definition.');
// x^n, sqrt x, 1/x
{
  const rows = [
    ['x^2', '2x + h', '2x', r`x^2`, r`2x + h`, r`2x`],
    ['x^3', '3x^2 + 3xh + h^2', '3x^2', r`x^3`, r`3x^2 + 3xh + h^2`, r`3x^2`],
    ['sqrt(x)', '1/(sqrt(x+h) + sqrt(x))', '1/(2sqrt(x))', r`\sqrt{x}`, r`\dfrac{1}{\sqrt{x + h} + \sqrt{x}}`, r`\dfrac{1}{2\sqrt{x}}`],
    ['1/x', '-1/(x(x+h))', '-1/x^2', r`\dfrac{1}{x}`, r`-\dfrac{1}{x(x + h)}`, r`-\dfrac{1}{x^2}`],
  ];
  rows.forEach(([f, q, d]) => dqIdentity(f, q, d));
  V.xn = table(['$f(x)$', 'Quotient, simplified', 'Derivative'], rows.map(([, , , a, b, c]) => [M(a), M(b), M(c)]), 'Table of first-principles results: x squared has quotient 2 x plus h and derivative 2 x; x cubed has quotient 3 x squared plus 3 x h plus h squared and derivative 3 x squared; the square root of x has derivative 1 over 2 root x; 1 over x has derivative minus 1 over x squared.', 'Each quotient equals $\\dfrac{f(x + h) - f(x)}{h}$ exactly.');
}
// we3: 1/(x+3)
{
  dqIdentity('1/(x+3)', '-1/((x+h+3)(x+3))', '-1/(x+3)^2');
  V.we3 = table(['Step', 'Work'], [
    ['Quotient', M(r`\dfrac{1}{h}\left[\dfrac{1}{x + h + 3} - \dfrac{1}{x + 3}\right]`)],
    ['Common denominator', M(r`\dfrac{1}{h} \cdot \dfrac{(x + 3) - (x + h + 3)}{(x + h + 3)(x + 3)} = \dfrac{1}{h} \cdot \dfrac{-h}{(x + h + 3)(x + 3)}`)],
    ['Cancel $h$', M(r`-\dfrac{1}{(x + h + 3)(x + 3)}`)],
    [r`Let $h \to 0$`, M(r`f'(x) = -\dfrac{1}{(x + 3)^2}`)],
  ], 'Worked example 3 table: the difference quotient of 1 over x plus 3 simplifies to minus 1 over x plus h plus 3 times x plus 3, and as h tends to zero the derivative is minus 1 over x plus 3 all squared.', 'Combine the fractions, then cancel $h$.');
}
// we4: sqrt x
{
  dqIdentity('sqrt(x)', '1/(sqrt(x+h)+sqrt(x))', '1/(2sqrt(x))');
  must(near(1 / (2 * Math.sqrt(9)), 1 / 6, 1e-12) && dqOK(ef('sqrt(x)'), ef('1/(2sqrt(x))'), 9), 'root 9');
  V.we4 = table(['Step', 'Work'], [
    ['Quotient', M(r`\dfrac{\sqrt{x + h} - \sqrt{x}}{h}`)],
    ['Multiply by the conjugate', M(r`\dfrac{(x + h) - x}{h\left(\sqrt{x + h} + \sqrt{x}\right)}`)],
    ['Cancel $h$', M(r`\dfrac{1}{\sqrt{x + h} + \sqrt{x}}`)],
    ['Limit', M(r`f'(x) = \dfrac{1}{2\sqrt{x}}, \qquad f'(9) = \dfrac{1}{6}`)],
  ], 'Worked example 4 table: rationalising the difference quotient of the square root of x gives 1 over the square root of x plus h plus the square root of x, so the derivative is 1 over 2 root x, which is 1 over 6 at x equal to 9.', 'Multiply top and bottom by the conjugate.');
}
// sin h / h and (cos h - 1)/h
{
  const hs = [0.1, 0.01, 0.001, 0.0001];
  const a = hs.map((h) => Math.sin(h) / h), b = hs.map((h) => (Math.cos(h) - 1) / h);
  must(a.every((v, i) => i === 0 || v > a[i - 1]) && a.every((v) => v < 1) && 1 - a[3] < 1e-7 && b.every((v, i) => i === 0 || v > b[i - 1]) && b.every((v) => v < 0) && Math.abs(b[3]) < 1e-4, 'standard limits approach 1 and 0');
  V.sincos = table(['$h$ (radians)', r`$\dfrac{\sin h}{h}$`, r`$\dfrac{\cos h - 1}{h}$`], hs.map((h, i) => [M(num(h)), M(a[i].toFixed(6)), M(b[i].toFixed(6))]), 'Table of values: for h equal to 0.1, 0.01, 0.001 and 0.0001 radians, sine h over h is 0.998334, 0.999983, 1.000000 and 1.000000 and cosine h minus 1 over h is minus 0.049958, minus 0.005, minus 0.0005 and minus 0.00005, so the limits are 1 and 0.', '$\\dfrac{\\sin h}{h} \\to 1$ and $\\dfrac{\\cos h - 1}{h} \\to 0$.');
}
// we5: sin 2x
{
  dqIdentity('sin(2x)', '2cos(2x+h)sin(h)/h', '2cos(2x)', XS, [0.5, 0.1, 0.01, -0.05]);
  V.we5 = table(['Step', 'Work'], [
    ['Quotient', M(r`\dfrac{\sin(2x + 2h) - \sin 2x}{h}`)],
    ['Factor the numerator', M(r`\sin C - \sin D = 2\cos\dfrac{C + D}{2}\sin\dfrac{C - D}{2} \Rightarrow 2\cos(2x + h)\sin h`)],
    ['Separate', M(r`2\cos(2x + h) \cdot \dfrac{\sin h}{h}`)],
    ['Limit', M(r`\dfrac{d}{dx}(\sin 2x) = 2\cos 2x \cdot 1 = 2\cos 2x`)],
  ], 'Worked example 5 table: the difference quotient of sine 2 x equals 2 cosine of 2 x plus h times sine h over h, which tends to 2 cosine 2 x.', 'Uses $\\dfrac{\\sin h}{h} \\to 1$.');
}
// we6: derivative at a point
{
  const f = ef('1/x');
  must(range2().every((x) => near(((1 / x) - 0.5) / (x - 2), -1 / (2 * x), 1e-9)) && dqOK(f, ef('-1/x^2'), 2) && -1 / (2 * 2) === -0.25, 'f(x) = 1/x at 2');
  V.we6 = table(['Step', 'Work'], [
    ['Definition at a point', M(r`f'(2) = \lim_{x \to 2} \dfrac{f(x) - f(2)}{x - 2}`)],
    ['Substitute', M(r`\dfrac{\frac{1}{x} - \frac{1}{2}}{x - 2} = \dfrac{2 - x}{2x(x - 2)}`)],
    ['Cancel $x - 2$', M(r`-\dfrac{1}{2x}`)],
    ['Limit', M(r`f'(2) = -\dfrac{1}{4}`)],
  ], 'Worked example 6 table: for f of x equal to 1 over x, the quotient f of x minus f of 2 over x minus 2 simplifies to minus 1 over 2 x, so f dash of 2 is minus one quarter.', 'The derivative at a point as a limit in $x$.');
}
function range2() { return [2.5, 2.1, 1.9, 1.5, 3.7]; }
V.sum1 = table(['Idea', 'Result'], [
  ['Average velocity on $[t, t + h]$', M(r`\dfrac{s(t + h) - s(t)}{h}`)],
  ['Instantaneous velocity and tangent slope', M(r`f'(x) = \lim_{h \to 0} \dfrac{f(x + h) - f(x)}{h}`)],
  ['Tangent at $x = a$', M(r`y - f(a) = f'(a)(x - a)`)],
  ['Powers, root and reciprocal', M(r`(x^n)' = nx^{n - 1}, \; (\sqrt{x})' = \dfrac{1}{2\sqrt{x}}, \; \left(\dfrac{1}{x}\right)' = -\dfrac{1}{x^2}`)],
  ['Sine and cosine', M(r`(\sin x)' = \cos x, \; (\cos x)' = -\sin x`)],
], 'Summary table for Part 1: average velocity, the definition of the derivative, the tangent equation, the derivatives of powers, the square root and the reciprocal, and of sine and cosine.', 'Part 1 in five lines.');
V.tips1 = table(['Do', 'Why'], [
  ['Write the quotient, then simplify, then take the limit', 'The limit is taken only after $h$ has been cancelled'],
  ['Expand $(x + h)^n$ with the binomial theorem', 'Only the first two terms matter after dividing by $h$'],
  ['Rationalise a square-root quotient', 'It removes the $\\dfrac{0}{0}$ form'],
  ['Quote $\\dfrac{\\sin h}{h} \\to 1$ for sine and cosine', 'Angles are in radians'],
], 'Exam tips table for Part 1: simplify before taking the limit, expand with the binomial theorem, rationalise square roots, and quote the standard limit with angles in radians.', 'How to set out first principles.');

// ================================================================ deck 2
V.route2 = flow('LR', [['a', 'Standard derivatives'], ['b', 'Sums, differences and constant multiples'], ['c', 'Product rule'], ['d', 'Quotient rule'], ['e', 'Trigonometric functions and applications']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Route map of Part 2: the standard derivatives, sums, differences and constant multiples, the product rule, the quotient rule, and trigonometric functions with applications to slopes and rates.', 'Part 2 at a glance.');
V.goals2 = table(['You will be able to', 'Using', 'Key result'], [
  ['Differentiate sums and constant multiples', 'term by term', M(r`(cf \pm g)' = cf' \pm g'`)],
  ['Differentiate a product', 'the product rule', M(r`(uv)' = u'v + uv'`)],
  ['Differentiate a quotient', 'the quotient rule', M(r`\left(\dfrac{u}{v}\right)' = \dfrac{u'v - uv'}{v^2}`)],
  ['Differentiate trigonometric functions', 'the standard table', M(r`\tan x, \; \sec x, \; \operatorname{cosec} x, \; \cot x`)],
  ['Use a derivative at a point', 'slope and rate', 'tangent slope, horizontal tangent, rate of change'],
], 'Table of goals for Part 2: sums and constant multiples, the product rule, the quotient rule, derivatives of the six trigonometric functions, and slopes and rates from a derivative at a point.', 'What Part 2 covers.');
// the standard table, each row verified
{
  const rows = [['7', '0', XS], ['x^5', '5x^4', XS], ['sin(x)', 'cos(x)', XS], ['cos(x)', '-sin(x)', XS], ['tan(x)', 'sec(x)^2', XT], ['sec(x)', 'sec(x)tan(x)', XT], ['cosec(x)', '-cosec(x)cot(x)', XT], ['cot(x)', '-cosec(x)^2', XT]];
  rows.forEach(([f, d, xs]) => must(derivOK(ef(f), ef(d), xs), `standard ${f}`));
  V.std = table(['$f(x)$', "$f'(x)$"], [[M('c'), M('0')], [M('x^n'), M('nx^{n - 1}')], ...rows.slice(2).map(([f, d]) => [E(f).T, E(d).T])], 'Table of standard derivatives: a constant has derivative 0, x to the n has n x to the n minus 1, sine gives cosine, cosine gives minus sine, tangent gives secant squared, secant gives secant tangent, cosecant gives minus cosecant cotangent, and cotangent gives minus cosecant squared.', 'The eight standard results (angles in radians).');
}
// linearity
{
  must(derivOK(ef('4x^3 - 5sin(x) + 7'), ef('12x^2 - 5cos(x)')) && derivOK(ef('3(x^2 + 2x)'), ef('3(2x + 2)')) && derivOK(ef('x^2 + sin(x)'), ef('2x + cos(x)')), 'linearity');
  V.lin = table(['Rule', 'Statement', 'Example'], [
    ['Constant multiple', M(r`(cf)' = cf'`), M(`(${E('3x^2').tex})' = ${E('6x').tex}`)],
    ['Sum', M(r`(f + g)' = f' + g'`), M(`(${E('x^2 + sin(x)').tex})' = ${E('2x + cos(x)').tex}`)],
    ['Difference', M(r`(f - g)' = f' - g'`), M(`(${E('x^3 - cos(x)').tex})' = ${E('3x^2 + sin(x)').tex}`)],
    ['Whole expression', 'term by term', M(`(${E('4x^3 - 5sin(x) + 7').tex})' = ${E('12x^2 - 5cos(x)').tex}`)],
  ], 'Table of the linearity rules: a constant multiple, a sum, a difference, and a whole expression differentiated term by term, each with a worked example.', 'Differentiate term by term; a constant factor stays.');
  must(derivOK(ef('x^3 - cos(x)'), ef('3x^2 + sin(x)')), 'difference example');
}
// we1d2: a polynomial at a point
{
  const p = poly([1, 4], [-6, 2], [3, 1], [-7, 0]), dp = p.d();
  must(dp.eq(poly([4, 3], [-12, 1], [3, 0])) && dp.at(2).eq(11) && derivOK(p.fn(), dp.fn()), 'we1d2');
  V.we1d2 = table(['Step', 'Work'], [
    ['Function', M(`f(x) = ${p.tex()}`)],
    ['Differentiate each term', M(r`4x^3 - 6 \times 2x + 3 \times 1 - 0`)],
    ['Simplify', M(`f'(x) = ${dp.tex()}`)],
    ['Value at $x = 2$', M(r`f'(2) = 4(8) - 12(2) + 3 = 32 - 24 + 3 = 11`)],
  ], 'Worked example 1 table: the derivative of x to the fourth minus 6 x squared plus 3 x minus 7 is 4 x cubed minus 12 x plus 3, whose value at x equal to 2 is 32 minus 24 plus 3, which is 11.', 'Power rule on each term, then substitute.');
}
// product rule
{
  const u = poly([1, 2]), v = poly([1, 3], [1, 0]);
  const viaRule = u.d().mul(v).add(u.mul(v.d())), viaExpand = u.mul(v).d(), wrong = u.d().mul(v.d());
  must(viaRule.eq(viaExpand) && viaRule.eq(poly([5, 4], [2, 1])) && !wrong.eq(viaRule) && wrong.eq(poly([6, 3])) && derivOK(u.mul(v).fn(), viaRule.fn()), 'product rule example');
  V.prod = table(['Route', 'Work', 'Result'], [
    ['Product rule with $u = x^2$, $v = x^3 + 1$', M(r`u'v + uv' = 2x(x^3 + 1) + x^2(3x^2)`), M(viaRule.tex())],
    ['Expand first', M(r`(x^2)(x^3 + 1) = x^5 + x^2 \Rightarrow 5x^4 + 2x`), M(viaExpand.tex())],
    ['Wrong: product of derivatives', M(r`u'v' = 2x \cdot 3x^2`), M(wrong.tex())],
  ], 'Table for the product rule applied to x squared times x cubed plus 1: the rule and direct expansion both give 5 x to the fourth plus 2 x, while multiplying the two derivatives gives 6 x cubed, which is wrong.', '$(uv)\' = u\'v + uv\'$, not $u\'v\'$.');
}
// we2d2: (x^2 + 3)(2x - 5)
{
  const u = poly([1, 2], [3, 0]), v = poly([2, 1], [-5, 0]);
  const viaRule = u.d().mul(v).add(u.mul(v.d()));
  must(viaRule.eq(poly([6, 2], [-10, 1], [6, 0])) && u.mul(v).d().eq(viaRule) && derivOK(u.mul(v).fn(), viaRule.fn()) && u.mul(v).eq(poly([2, 3], [-5, 2], [6, 1], [-15, 0])), 'we2d2');
  V.we2d2 = table(['Step', 'Work'], [
    ['Choose $u$ and $v$', M(r`u = x^2 + 3, \; v = 2x - 5 \Rightarrow u' = 2x, \; v' = 2`)],
    ['Apply the rule', M(r`2x(2x - 5) + (x^2 + 3)(2)`)],
    ['Simplify', M(`4x^2 - 10x + 2x^2 + 6 = ${viaRule.tex()}`)],
    ['Check by expanding', M(r`2x^3 - 5x^2 + 6x - 15 \Rightarrow 6x^2 - 10x + 6`)],
  ], 'Worked example 2 table: the product x squared plus 3 times 2 x minus 5 has derivative 2 x times 2 x minus 5 plus 2 times x squared plus 3, which simplifies to 6 x squared minus 10 x plus 6; expanding first gives the same.', 'Two routes, one answer.');
}
// quotient rule
{
  const f = 'x^2/(x+2)', d = '(x^2+4x)/(x+2)^2';
  const u = poly([1, 2]), v = poly([1, 1], [2, 0]);
  const num_ = u.d().mul(v).sub(u.mul(v.d()));
  must(num_.eq(poly([1, 2], [4, 1])) && derivOK(ef(f), ef(d), XP) && derivOK(ef(f), ef(d), [-1.5, -3.2, 0.4]), 'quotient example');
  V.quo = table(['Part', 'Work'], [
    ['Rule', M(r`\left(\dfrac{u}{v}\right)' = \dfrac{u'v - uv'}{v^2}, \quad v \ne 0`)],
    ['Example', M(r`u = x^2, \; v = x + 2 \Rightarrow u' = 2x, \; v' = 1`)],
    ['Numerator', M(r`2x(x + 2) - x^2(1) = ${num_.tex()}`)],
    ['Result', M(r`\dfrac{d}{dx}\left(\dfrac{x^2}{x + 2}\right) = \dfrac{x^2 + 4x}{(x + 2)^2}`)],
  ], 'Table for the quotient rule applied to x squared over x plus 2: the numerator is 2 x times x plus 2 minus x squared, which is x squared plus 4 x, so the derivative is x squared plus 4 x over x plus 2 all squared.', 'Bottom times derivative of top, minus top times derivative of bottom, over bottom squared.');
}
// we3d2: (x^2 - 2)/(x + 1)
{
  const u = poly([1, 2], [-2, 0]), v = poly([1, 1], [1, 0]);
  const nm = u.d().mul(v).sub(u.mul(v.d()));
  must(nm.eq(poly([1, 2], [2, 1], [2, 0])) && derivOK(ef('(x^2-2)/(x+1)'), ef('(x^2+2x+2)/(x+1)^2'), [0.3, 1, 2.2, 3.1, -0.4, -2.5]) && nm.at(1).eq(5), 'we3d2');
  V.we3d2 = table(['Step', 'Work'], [
    ['Choose', M(r`u = x^2 - 2, \; v = x + 1 \Rightarrow u' = 2x, \; v' = 1`)],
    ['Numerator', M(r`u'v - uv' = 2x(x + 1) - (x^2 - 2) = ${nm.tex()}`)],
    ['Derivative', M(r`\dfrac{x^2 + 2x + 2}{(x + 1)^2}, \quad x \ne -1`)],
    ['Check at $x = 1$', M(r`\dfrac{1 + 2 + 2}{4} = \dfrac{5}{4}`)],
  ], 'Worked example 3 table: the quotient x squared minus 2 over x plus 1 has numerator 2 x times x plus 1 minus x squared minus 2, which is x squared plus 2 x plus 2, so the derivative is x squared plus 2 x plus 2 over x plus 1 all squared, and at x equal to 1 it is five quarters.', 'Always state where $v \\ne 0$.');
}
// tan, sec, cosec, cot from the quotient rule
{
  const rows = [['tan(x)', 'sin(x)/cos(x)', 'sec(x)^2', r`\dfrac{\cos x \cdot \cos x - \sin x(-\sin x)}{\cos^2 x} = \dfrac{1}{\cos^2 x}`], ['sec(x)', '1/cos(x)', 'sec(x)tan(x)', r`\dfrac{0 \cdot \cos x - 1(-\sin x)}{\cos^2 x} = \dfrac{\sin x}{\cos^2 x}`], ['cosec(x)', '1/sin(x)', '-cosec(x)cot(x)', r`\dfrac{0 \cdot \sin x - 1\cos x}{\sin^2 x} = -\dfrac{\cos x}{\sin^2 x}`], ['cot(x)', 'cos(x)/sin(x)', '-cosec(x)^2', r`\dfrac{-\sin x \cdot \sin x - \cos x\cos x}{\sin^2 x} = -\dfrac{1}{\sin^2 x}`]];
  rows.forEach(([f, form, d]) => must(derivOK(ef(f), ef(d), XT) && derivOK(ef(form), ef(d), XT) && XT.every((x) => near(ef(f)(x), ef(form)(x), 1e-12)), `trig ${f}`));
  V.trig = table(['$f(x)$', 'Written as', 'Quotient rule', "$f'(x)$"], rows.map(([f, form, d, work]) => [E(f).T, E(form).T, M(work), E(d).T]), 'Table that derives the derivatives of tangent, secant, cosecant and cotangent by the quotient rule from sine and cosine, giving secant squared, secant tangent, minus cosecant cotangent and minus cosecant squared.', 'The quotient rule explains the four new results.');
}
// we4d2: x tan x - 2 cosec x
{
  const f = 'x tan(x) - 2cosec(x)', d = 'tan(x) + x sec(x)^2 + 2cosec(x)cot(x)';
  must(derivOK(ef(f), ef(d), XT), 'we4d2');
  V.we4d2 = table(['Step', 'Work'], [
    ['Split into two terms', M(`y = ${E('x tan(x)').tex} - ${E('2cosec(x)').tex}`)],
    ['Product rule on the first', M(r`(x\tan x)' = 1 \cdot \tan x + x\sec^2 x`)],
    ['Standard result on the second', M(r`(2\operatorname{cosec} x)' = -2\operatorname{cosec} x\cot x`)],
    ['Combine', M(`\\dfrac{dy}{dx} = ${E(d).tex}`)],
  ], 'Worked example 4 table: the function x tangent x minus 2 cosecant x has derivative tangent x plus x secant squared x plus 2 cosecant x cotangent x, using the product rule on the first term and a standard result on the second.', 'Product rule for one term, standard result for the other.');
}
// we5d2: sec x tan x
{
  const d = 'sec(x)tan(x)^2 + sec(x)^3';
  must(derivOK(ef('sec(x)tan(x)'), ef(d), XT) && XT.every((x) => near(ef('sec(x)tan(x)^2 + sec(x)^3')(x), ef('sec(x)(tan(x)^2 + sec(x)^2)')(x), 1e-9)), 'we5d2');
  V.we5d2 = table(['Step', 'Work'], [
    ['Product rule', M(r`u = \sec x, \; v = \tan x \Rightarrow u' = \sec x\tan x, \; v' = \sec^2 x`)],
    ['Apply', M(r`\sec x\tan x \cdot \tan x + \sec x \cdot \sec^2 x`)],
    ['Simplify', M(r`\dfrac{d}{dx}(\sec x\tan x) = \sec x\tan^2 x + \sec^3 x`)],
    ['Factorise', M(r`\sec x\left(\tan^2 x + \sec^2 x\right)`)],
  ], 'Worked example 5 table: the product secant x times tangent x has derivative secant x tangent squared x plus secant cubed x, which factorises as secant x times tangent squared x plus secant squared x.', 'Two standard results inside the product rule.');
}
// linear arguments
{
  must(derivOK(ef('sin(3x)'), ef('3cos(3x)')) && derivOK(ef('cos(2x-1)'), ef('-2sin(2x-1)')) && derivOK(ef('(3x+2)^2'), ef('18x+12')) && poly([9, 2], [12, 1], [4, 0]).d().eq(poly([18, 1], [12, 0])), 'linear arguments');
  V.lin2 = table(['Function', 'Derivative', 'Reason'], [
    [E('sin(3x)').T, E('3cos(3x)').T, 'the factor $3$ from the linear argument'],
    [E('cos(2x-1)').T, E('-2sin(2x-1)').T, 'the factor $2$ appears, and the sign changes'],
    [E('(3x+2)^2').T, M('18x + 12'), r`expand first: $9x^2 + 12x + 4$`],
  ], 'Table for linear arguments: sine 3 x has derivative 3 cosine 3 x, cosine of 2 x minus 1 has derivative minus 2 sine of 2 x minus 1, and 3 x plus 2 all squared is expanded to 9 x squared plus 12 x plus 4 with derivative 18 x plus 12.', 'For $\\sin(ax + b)$ the derivative is $a\\cos(ax + b)$.');
}
// we6d2: oven temperature
{
  const T = poly([3, 2], [-18, 1], [200, 0]), dT = T.d();
  must(dT.eq(poly([6, 1], [-18, 0])) && dT.at(1).eq(-12) && dT.at(3).eq(0) && T.at(3).eq(173) && derivOK(T.fn(), dT.fn()), 'we6d2');
  V.we6d2 = table(['Step', 'Work'], [
    ['Model', M(r`T = 3t^2 - 18t + 200, \quad 0 \le t \le 6`) + ', with $T$ in degrees Celsius and $t$ in minutes'],
    ['Rate of change', M(r`\dfrac{dT}{dt} = 6t - 18`)],
    ['At $t = 1$', M(r`6 - 18 = -12`) + ': falling at 12 degrees Celsius per minute'],
    ['Rate is zero', M(r`6t - 18 = 0 \Rightarrow t = 3, \; T(3) = 27 - 54 + 200 = 173`)],
  ], 'Worked example 6 table: an oven temperature of 3 t squared minus 18 t plus 200 degrees Celsius has rate of change 6 t minus 18, which is minus 12 at t equal to 1 and zero at t equal to 3, when the temperature is 173 degrees.', 'The derivative is the rate of change with time.');
}
// horizontal tangents on y = x^3 - 3x
{
  const f = ef('x^3-3x'), df = ef('3x^2-3');
  must(f(-1) === 2 && f(1) === -2 && df(-1) === 0 && df(1) === 0 && derivOK(f, df), 'horizontal tangents');
  V.horiz = plot({ x: [-2.2, 2.2], y: [-4, 4], fns: [{ expr: 'x^3-3x', label: 'curve' }, { expr: '2+0*x', label: 'tangent y = 2' }, { expr: '-2+0*x', label: 'tangent y = -2' }], pts: [[-1, 2, '$(-1, 2)$'], [1, -2, '$(1, -2)$']] }, 'Plot of y equal to x cubed minus 3 x with horizontal tangents y equal to 2 at x equal to minus 1 and y equal to minus 2 at x equal to 1, the two points where the derivative 3 x squared minus 3 is zero.', 'Horizontal tangent where $f\'(x) = 0$.');
}
// we7: y = 2 sin x + cos x at x = pi/2
{
  const fs = '2sin(x)+cos(x)', f = ef(fs), df = ef('2cos(x)-sin(x)');
  const a = Math.PI / 2;
  must(derivOK(f, df) && near(f(a), 2, 1e-12) && near(df(a), -1, 1e-12) && near(cd(f, a), -1, 1e-9), 'we7 slope -1');
  V.we7 = plot({ x: [0, 3.5], y: [-3, 4], fns: [{ expr: fs, label: 'curve' }, { expr: '2-(x-pi/2)', label: 'tangent' }], pts: [[a, 2, r`$P\left(\dfrac{\pi}{2}, 2\right)$`]] }, 'Plot of y equal to 2 sine x plus cosine x and its tangent at the point with x equal to pi over 2, where y is 2 and the slope is minus 1; the tangent is y equal to 2 minus x minus pi over 2.', 'Slope $f\'(\\pi/2) = -1$.');
}
V.sum2 = table(['Topic', 'Result'], [
  ['Sum, difference, multiple', M(r`(cf \pm g)' = cf' \pm g'`)],
  ['Product rule', M(r`(uv)' = u'v + uv'`)],
  ['Quotient rule', M(r`\left(\dfrac{u}{v}\right)' = \dfrac{u'v - uv'}{v^2}`)],
  ['Trigonometric', M(r`\tan x \to \sec^2 x, \; \sec x \to \sec x\tan x, \; \cot x \to -\operatorname{cosec}^2 x, \; \operatorname{cosec} x \to -\operatorname{cosec} x\cot x`)],
  ['Applications', M(r`\text{slope at } a: f'(a); \; \text{horizontal tangent}: f'(x) = 0`)],
], 'Summary table for Part 2: constant multiples, sums and differences, the product rule, the quotient rule, the four trigonometric derivatives, and the slope and horizontal tangent as applications.', 'Part 2 in five lines.');
V.tips2 = table(['Do', 'Why'], [
  ['Name $u$, $v$, $u\'$, $v\'$ before applying a rule', 'Marks are given for the method'],
  ['Check a product or quotient at one value of $x$', 'It catches sign slips'],
  ['State where the denominator is not zero', 'A quotient is defined only there'],
  ['Remember the minus signs in cos, cosec and cot', 'They are the most common lost marks'],
], 'Exam tips table for Part 2: name the parts before using a rule, check at one value of x, state where the denominator is nonzero, and remember the minus signs in the derivatives of cosine, cosecant and cotangent.', 'How to set out differentiation.');
