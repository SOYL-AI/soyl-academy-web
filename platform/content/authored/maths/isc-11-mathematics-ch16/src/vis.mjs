// Visuals for ISC 11 Mathematics ch16 Limits. Every number in a table or figure is computed here (exact rationals or numeric
// approach from both sides) and asserted. Holes are drawn as marked points with on_curve: false; piecewise functions are
// separate plotted pieces, each with its own domain.
import { table, flow, plot as plot0, f as parse } from './lib.mjs';
import { F, P, ratLim, ratInf, near, noLimit, nearInf, dec, T as M, must } from './lim.mjs';

const r = String.raw;
/** plot() that also marks 'free' points on_curve: false and adds optional hlines / vlines. */
const plot = (spec, alt, caption) => {
  const v = plot0(spec, alt, caption);
  (spec.pts ?? []).forEach((p, i) => { if (p[3] === 'free') v.spec.points[i].on_curve = false; });
  if (spec.hl) v.spec.hlines = spec.hl;
  if (spec.vl) v.spec.vlines = spec.vl;
  return v;
};
/** The plotted expression agrees with the JS function g at the given points. */
const agree = (expr, g, xs) => xs.every((x) => Math.abs(parse(expr)(x) - g(x)) < 1e-9);
const dfr = (s) => { const [a, b = ''] = s.replace('-', '').split('.'); const v = F(BigInt(a + b), 10n ** BigInt(b.length)); return s.startsWith('-') ? v.neg() : v; };
export const V = {};

// ================================================================ deck 1
V.route1 = flow('LR', [['a', 'Meaning of a limit'], ['b', 'One-sided limits and existence'], ['c', 'Modulus and greatest integer'], ['d', 'Finding a constant'], ['e', 'Algebra of limits and indeterminate forms']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Route map of Part 1: the meaning of a limit, left-hand and right-hand limits and existence, the modulus and greatest integer functions, finding a constant so that a limit exists, and the algebra of limits with indeterminate forms.', 'Part 1 at a glance.');
V.goals1 = table(['You will be able to', 'Using', 'Key idea'], [
  ['Read a limit from a table or graph', 'values on both sides of $a$', M(r`x \to a \Rightarrow f(x) \to L`)],
  ['Find one-sided limits', r`$x \to a^{-}$ and $x \to a^{+}$`, 'compare the two values'],
  ['Handle $\\lvert x \\rvert$ and $[x]$ at a point', 'the formula on each side', 'split at the point'],
  ['Find a constant so that a limit exists', 'equal one-sided limits', M(r`\text{LHL} = \text{RHL}`)],
  ['Use the algebra of limits and spot $0/0$', 'the limit theorems', 'indeterminate forms need more work'],
], 'Table of goals for Part 1: reading a limit from values and graphs, one-sided limits, the modulus and greatest integer functions, finding a constant for which a limit exists, and the algebra of limits with indeterminate forms.', 'What Part 1 covers.');

// approaching 3 by (x^2 - x - 6)/(x - 3)
{
  const g = (x) => (x * x - x - 6) / (x - 3);
  const xs = ['2.9', '2.99', '2.999', '3.001', '3.01', '3.1'];
  const vals = xs.map((s) => dfr(s).add(2).num());
  must(xs.every((s, i) => Math.abs(g(Number(s)) - vals[i]) < 1e-6) && near(g, 3, 5) && ratLim(P(1, -1, -6), P(1, -3), 3).eq(5), 'near1');
  V.near1 = table(['$x$', ...xs], [['$f(x)$', ...vals.map((v) => dec(v, 3))]], 'Table of values of f of x equal to x squared minus x minus 6 over x minus 3 for x equal to 2.9, 2.99, 2.999 on the left of 3 and 3.001, 3.01, 3.1 on the right; the values 4.9, 4.99, 4.999 and 5.001, 5.01, 5.1 close in on 5.', 'The function is not defined at $x = 3$, yet the values close in on $5$.');
}
// the hole
{
  const g = (x) => x + 2;
  must(agree('x+2', g, [0, 1, 5]) && near((x) => (x * x - x - 6) / (x - 3), 3, 5), 'hole1');
  V.hole1 = plot({ x: [0, 6], y: [0, 9], fns: [{ expr: 'x+2', label: 'y = x + 2 (the graph of f)' }], pts: [[3, 5, '$(3, 5)$', 'free'], [1, 3, '$(1, 3)$'], [5, 7, '$(5, 7)$']] }, 'Plot of the straight line y equal to x plus 2 with a hole at the point 3, 5, where the function x squared minus x minus 6 over x minus 3 is not defined; the points 1, 3 and 5, 7 are on the line.', 'The graph of $f$ is the line $y = x + 2$ with a hole at $(3, 5)$.');
}
// value versus limit
{
  const p = (x) => 3 * x - 1, q = (x) => (x * x - 25) / (x - 5), s = (x) => (x === 4 ? 0 : x + 1);
  must(near(p, 2, 5) && p(2) === 5 && near(q, 5, 10) && Number.isNaN(q(5)) && near(s, 4, 5) && s(4) === 0 && ratLim(P(1, 0, -25), P(1, -5), 5).eq(10), 'three cases');
  V.three = table(['Function', 'Point', r`Value $f(a)$`, r`Limit as $x \to a$`], [
    [M(r`p(x) = 3x - 1`), '$x = 2$', '$5$', '$5$'],
    [M(r`q(x) = \dfrac{x^2 - 25}{x - 5}`), '$x = 5$', 'not defined', '$10$'],
    [M(r`r(x) = x + 1 \text{ for } x \ne 4, \; r(4) = 0`), '$x = 4$', '$0$', '$5$'],
  ], 'Table of three functions at a point: p of x equal to 3x minus 1 at 2 has value 5 and limit 5; q of x equal to x squared minus 25 over x minus 5 at 5 has no value but limit 10; r of x equal to x plus 1 except r of 4 equal to 0 has value 0 at 4 but limit 5.', 'The limit looks only at values near $a$, never at $a$ itself.');
}
// we1: (x^3 - 1)/(x - 1) near 1
{
  const g = (x) => (x ** 3 - 1) / (x - 1);
  const xs = ['0.9', '0.99', '0.999', '1.001', '1.01', '1.1'];
  const vals = xs.map((s) => { const x = dfr(s); return x.mul(x).add(x).add(1).num(); });
  must(xs.every((s, i) => Math.abs(g(Number(s)) - vals[i]) < 1e-6) && near(g, 1, 3) && ratLim(P(1, 0, 0, -1), P(1, -1), 1).eq(3), 'we1');
  V.we1 = table(['$x$', ...xs], [['$f(x)$', ...vals.map((v) => dec(v, 6))]], 'Table for f of x equal to x cubed minus 1 over x minus 1: at x equal to 0.9, 0.99, 0.999, 1.001, 1.01 and 1.1 the values are 2.71, 2.9701, 2.997001, 3.003001, 3.0301 and 3.31, which close in on 3 from both sides.', 'Both rows of values close in on $3$ as $x \\to 1$.');
}
// left and right limits: jump
{
  const L = (x) => x + 1, R = (x) => 7 - x;
  must(L(2) === 3 && R(2) === 5 && noLimit((x) => (x < 2 ? L(x) : R(x)), 2) && near((x) => (x < 2 ? L(x) : R(x)), 2, 3, { side: 'left' }) && near((x) => (x < 2 ? L(x) : R(x)), 2, 5, { side: 'right' }) && agree('x+1', L, [0, 1]) && agree('7-x', R, [2, 4]), 'lr');
  V.lr = plot({ x: [0, 5], y: [0, 6], fns: [{ expr: 'x+1', label: 'left piece', domain: [0, 2] }, { expr: '7-x', label: 'right piece', domain: [2, 5] }], pts: [[2, 3, '$(2, 3)$', 'free'], [2, 5, '$(2, 5)$']] }, 'Plot of a function with two pieces: the line y equal to x plus 1 for x less than 2, ending at an open point 2, 3, and the line y equal to 7 minus x for x at least 2, starting at the filled point 2, 5; the left-hand limit at 2 is 3 and the right-hand limit is 5.', 'At $x = 2$: left-hand limit $3$, right-hand limit $5$, value $f(2) = 5$.');
}
// we2: both sides give 7
{
  const g = (x) => (x < 3 ? 2 * x + 1 : x * x - 2);
  must(near(g, 3, 7) && 2 * 3 + 1 === 7 && 3 * 3 - 2 === 7 && agree('2x+1', (x) => 2 * x + 1, [1, 3]) && agree('x^2-2', (x) => x * x - 2, [3, 4]), 'we2');
  V.we2 = plot({ x: [1, 4], y: [0, 15], fns: [{ expr: '2x+1', label: 'x < 3', domain: [1, 3] }, { expr: 'x^2-2', label: 'x >= 3', domain: [3, 4] }], pts: [[3, 7, '$(3, 7)$']] }, 'Plot of a function with two pieces: the line y equal to 2x plus 1 up to x equal to 3 and the curve y equal to x squared minus 2 from x equal to 3; both pieces meet at the point 3, 7, so both one-sided limits are 7.', 'The two pieces meet at $(3, 7)$: both one-sided limits are $7$.');
}
// existence
V.exist = table(['Situation', 'Left-hand limit', 'Right-hand limit', 'Does the limit exist?'], [
  ['The two sides agree', '$L$', '$L$', r`yes, and it equals $L$`],
  ['The two sides differ', '$L_1$', r`$L_2 \ne L_1$`, 'no'],
  ['One side grows without bound', 'a number', 'no finite value', 'no'],
], 'Table of the three situations for a limit at a point: when the left-hand and right-hand limits agree the limit exists and equals the common value; when they are different numbers, or when one side has no finite value, the limit does not exist.', 'A limit exists only when both one-sided limits exist and are equal.');
// we3: jump 4 and 5
{
  const g = (x) => (x < 1 ? 5 - x : 2 * x + 3);
  must(near(g, 1, 4, { side: 'left' }) && near(g, 1, 5, { side: 'right' }) && noLimit(g, 1) && agree('5-x', (x) => 5 - x, [-2, 1]) && agree('2x+3', (x) => 2 * x + 3, [1, 4]), 'we3');
  V.we3 = plot({ x: [-2, 4], y: [0, 12], fns: [{ expr: '5-x', label: 'x < 1', domain: [-2, 1] }, { expr: '2x+3', label: 'x > 1', domain: [1, 4] }], pts: [[1, 4, '$(1, 4)$', 'free'], [1, 5, '$(1, 5)$', 'free']] }, 'Plot of a function with two pieces: the line y equal to 5 minus x for x less than 1, ending at an open point 1, 4, and the line y equal to 2x plus 3 for x greater than 1, starting at an open point 1, 5; the one-sided limits 4 and 5 at x equal to 1 differ.', 'A jump at $x = 1$: the limits from the two sides are $4$ and $5$.');
}
// modulus
{
  const g = (x) => Math.abs(x - 2) / (x - 2);
  must(near(g, 2, -1, { side: 'left' }) && near(g, 2, 1, { side: 'right' }) && noLimit(g, 2), 'mod');
  V.mod = plot({ x: [0, 4], y: [-2, 2], fns: [{ expr: '-1', label: 'x < 2', domain: [0, 2] }, { expr: '1', label: 'x > 2', domain: [2, 4] }], pts: [[2, -1, '$(2, -1)$', 'free'], [2, 1, '$(2, 1)$', 'free']] }, 'Plot of the function absolute value of x minus 2 over x minus 2, which equals minus 1 for x less than 2 and 1 for x greater than 2; the open points 2, minus 1 and 2, 1 show that the one-sided limits at 2 are minus 1 and 1.', r`$\dfrac{\lvert x - 2 \rvert}{x - 2}$ is $-1$ to the left of $2$ and $1$ to the right.`);
}
// we4: |x - 3|/(x^2 - 9)
{
  const g = (x) => Math.abs(x - 3) / (x * x - 9);
  must(near(g, 3, -1 / 6, { side: 'left' }) && near(g, 3, 1 / 6, { side: 'right' }) && noLimit(g, 3) && agree('-1/(x+3)', (x) => -1 / (x + 3), [0, 2]) && agree('1/(x+3)', (x) => 1 / (x + 3), [3, 5]), 'we4');
  V.we4 = plot({ x: [0, 6], y: [-0.5, 0.5], fns: [{ expr: '-1/(x+3)', label: 'x < 3', domain: [0, 3] }, { expr: '1/(x+3)', label: 'x > 3', domain: [3, 6] }], pts: [[3, -1 / 6, 'open end of left piece', 'free'], [3, 1 / 6, 'open end of right piece', 'free']] }, 'Plot of absolute value of x minus 3 over x squared minus 9: the curve y equal to minus 1 over x plus 3 for x less than 3 and y equal to 1 over x plus 3 for x greater than 3, with open ends at 3, minus one sixth and 3, one sixth.', 'One-sided limits at $x = 3$: $-\\dfrac{1}{6}$ and $\\dfrac{1}{6}$.');
}
// greatest integer
{
  const pieces = [1, 2, 3, 4, 5];
  const fns = pieces.map((n) => ({ expr: String(n), ...(n === 1 ? { label: 'y = [x]' } : {}), domain: [n, n + 1] }));
  const pts = pieces.flatMap((n) => [[n, n, `$(${n}, ${n})$`], [n + 1, n, undefined, 'free']]);
  must(pieces.every((n) => Math.floor(n) === n && Math.floor(n + 1 - 1e-9) === n), 'gi');
  V.gi = plot({ x: [1, 6], y: [0, 6], fns, pts }, 'Staircase graph of the greatest integer function y equal to the integer part of x from 1 to 6: a horizontal step at each whole-number height n from x equal to n up to x equal to n plus 1, with a filled point at the left end and an open point at the right end.', 'On $n \\le x < n + 1$ the value $[x]$ is the integer $n$.');
}
// we5: [x] near 3 and near 2.5
{
  const g = Math.floor;
  must([2.9, 2.99, 2.999].every((x) => g(x) === 2) && [3.001, 3.01, 3.1].every((x) => g(x) === 3) && [2.4, 2.49, 2.499, 2.501, 2.51, 2.6].every((x) => g(x) === 2) && noLimit(g, 3) && near(g, 2.5, 2), 'we5');
  V.we5 = table(['Approach', r`Values of $[x]$ from the left`, r`Values of $[x]$ from the right`, 'Left limit', 'Right limit', 'Limit'], [
    ['$x \\to 3$', r`$[2.9] = [2.99] = [2.999] = 2$`, r`$[3.001] = [3.01] = [3.1] = 3$`, '$2$', '$3$', 'does not exist'],
    [r`$x \to 2.5$`, r`$[2.4] = [2.49] = [2.499] = 2$`, r`$[2.501] = [2.51] = [2.6] = 2$`, '$2$', '$2$', '$2$'],
  ], 'Table for the greatest integer function: near 3 the values from the left are 2 and from the right are 3, so the limit does not exist; near 2.5 the values on both sides are 2, so the limit is 2.', 'At an integer the limit fails; between integers it equals the constant value.');
}
// constant: method
{
  const m = 2;
  must(m + 4 === 1 + 5 && near((x) => (x < 1 ? m * x + 4 : x * x + 5), 1, 6), 'constant');
  V.constant = table(['Step', 'What to do', r`Example: $f(x) = mx + 4$ for $x < 1$, $f(x) = x^2 + 5$ for $x \ge 1$`], [
    ['1', 'Left-hand limit from the left formula', '$m + 4$'],
    ['2', 'Right-hand limit from the right formula', '$1 + 5 = 6$'],
    ['3', 'Equate the two limits', '$m + 4 = 6$'],
    ['4', 'Solve for the constant and state the limit', r`$m = 2$, limit $= 6$`],
  ], 'Table of the four steps for finding a constant so that a limit exists, with the example mx plus 4 for x below 1 and x squared plus 5 from 1: the left limit is m plus 4, the right limit is 6, so m is 2 and the limit is 6.', 'Equate the two one-sided limits and solve.');
}
// we6: x^2 + kx - 1 / 3x + k at 2, k = 3
{
  const k = 3, g = (x) => (x < 2 ? x * x + k * x - 1 : 3 * x + k);
  must(3 + 2 * k === 6 + k && near(g, 2, 9) && agree('x^2+3x-1', (x) => x * x + 3 * x - 1, [0, 2]) && agree('3x+3', (x) => 3 * x + 3, [2, 3]), 'we6');
  V.we6 = plot({ x: [0, 3], y: [-2, 13], fns: [{ expr: 'x^2+3x-1', label: 'x < 2', domain: [0, 2] }, { expr: '3x+3', label: 'x >= 2', domain: [2, 3] }], pts: [[2, 9, '$(2, 9)$']] }, 'Plot of the function with k equal to 3: the curve y equal to x squared plus 3x minus 1 for x below 2 and the line y equal to 3x plus 3 from x equal to 2; the two pieces meet at the point 2, 9.', 'With $k = 3$ both pieces meet at $(2, 9)$.');
}
// algebra of limits
V.alg = table(['Rule', r`Statement, given $\lim f(x) = A$ and $\lim g(x) = B$`, 'Condition'], [
  ['Sum', M(r`\lim [f(x) + g(x)] = A + B`), 'none'],
  ['Difference', M(r`\lim [f(x) - g(x)] = A - B`), 'none'],
  ['Constant multiple', M(r`\lim [c\, f(x)] = cA`), 'any constant $c$'],
  ['Product', M(r`\lim [f(x)\, g(x)] = AB`), 'none'],
  ['Quotient', M(r`\lim \dfrac{f(x)}{g(x)} = \dfrac{A}{B}`), r`$B \ne 0$`],
  ['Polynomial in $f$', M(r`\lim p\bigl(f(x)\bigr) = p(A)`), 'any polynomial $p$'],
], 'Table of the fundamental theorems on limits, stated without proof: the limit of a sum, a difference, a constant multiple, a product, a quotient when the limit of the denominator is not zero, and a polynomial applied to a function equals the same operation on the limits.', 'The limit of a combination is the combination of the limits.');
// we7: using theorems
{
  const A = F(4), B = F(-3);
  const val = A.mul(2).sub(B.mul(5)).div(A.mul(B).add(1));
  must(val.eq(F(-23, 11)), 'we7');
  V.we7 = table(['Step', 'Work'], [
    ['Numerator', M(r`\lim [2f(x) - 5g(x)] = 2(4) - 5(-3) = 8 + 15 = 23`)],
    ['Denominator', M(r`\lim [f(x)g(x) + 1] = (4)(-3) + 1 = -11 \ne 0`)],
    ['Quotient rule', M(r`\lim \dfrac{2f(x) - 5g(x)}{f(x)g(x) + 1} = \dfrac{23}{-11} = -\dfrac{23}{11}`)],
  ], 'Table that uses the limit theorems with limit of f equal to 4 and limit of g equal to minus 3: the numerator tends to 2 times 4 minus 5 times minus 3, which is 23, the denominator tends to minus 11, so the quotient tends to minus 23 over 11.', 'Find the limit of each part, then apply the quotient rule.');
}
// indeterminate forms
{
  const a = (x) => x / x, b = (x) => (2 * x) / x, c = (x) => (x + 1) - x, d = (x) => (x + 3) - x;
  must(near(a, 0, 1) && near(b, 0, 2) && nearInf((x) => x / x, 1) && nearInf((x) => (3 * x) / x, 3) && nearInf((x) => (x + 1) - x, 1, 1, 1e-6) && c(1e4) - d(1e4) !== 0, 'forms');
  V.forms = table(['Form', 'Indeterminate?', 'Reason or value'], [
    [M(r`\dfrac{0}{0}`), 'yes', M(r`\displaystyle\lim_{x \to 0}\dfrac{x}{x} = 1, \quad \lim_{x \to 0}\dfrac{2x}{x} = 2`)],
    [M(r`\dfrac{\infty}{\infty}`), 'yes', M(r`\displaystyle\lim_{x \to \infty}\dfrac{x}{x} = 1, \quad \lim_{x \to \infty}\dfrac{3x}{x} = 3`)],
    [M(r`\infty - \infty`), 'yes', M(r`(x + 1) - x \to 1, \quad (x + 3) - x \to 3 \text{ as } x \to \infty`)],
    [M(r`1^{\infty}`), 'yes', M(r`\text{standard result } (1 + x)^{1/x} \to e`)],
    [M(r`\dfrac{0}{5}`), 'no', M(r`\text{the value is } 0`)],
    [M(r`\dfrac{5}{0}`), 'no', 'the values grow without bound: no finite limit'],
  ], 'Table of forms: zero over zero, infinity over infinity, infinity minus infinity and one to the power infinity are indeterminate, with two limits of the same form that have different values; zero over a non-zero number is 0 and a non-zero number over zero has no finite limit.', 'An indeterminate form means the limit cannot be read from the form alone.');
}
V.sum1 = table(['Idea', 'Result'], [
  ['Limit at $a$', r`depends on the values near $a$, not at $a$`],
  ['Existence', r`$\text{LHL} = \text{RHL}$`],
  ['Modulus and $[x]$', 'split into the formula on each side'],
  ['Constant in a piecewise function', 'equate the two one-sided limits'],
  ['Algebra of limits', 'sum, difference, product, quotient ($B \\ne 0$)'],
  ['Indeterminate forms', r`$\dfrac{0}{0}, \; \dfrac{\infty}{\infty}, \; \infty - \infty$: simplify first`],
], 'Summary table of Part 1: a limit depends on values near the point; it exists when the left and right limits are equal; handle the modulus and greatest integer by splitting; find constants by equating one-sided limits; use the algebra of limits; simplify indeterminate forms.', 'The key ideas of Part 1.');
V.tips1 = table(['Common slip', 'Do this instead'], [
  [r`Writing $f(a)$ as the limit`, 'check values near $a$ from both sides'],
  [r`Using $\lvert x - a \rvert = x - a$ on both sides`, r`write $a - x$ on the left and $x - a$ on the right`],
  ['Stopping at $0/0$', 'factorise, rationalise or use a standard limit'],
  [r`Calling $\dfrac{5}{0}$ indeterminate`, 'it has no finite limit, it is not an indeterminate form'],
], 'Table of common slips and their remedies: treating the value as the limit, using one formula for the modulus on both sides, stopping at the form zero over zero, and calling a non-zero number over zero indeterminate.', 'Four slips to avoid.');

// ================================================================ deck 2
V.route2 = flow('LR', [['a', 'Substitution and factorisation'], ['b', 'Rationalisation'], ['c', 'The result for x^n - a^n'], ['d', 'Limits at infinity'], ['e', 'Trigonometric limits and the squeeze'], ['f', 'Exponential and logarithmic limits']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e'], ['e', 'f']], 'Route map of Part 2: substitution and factorisation, rationalisation, the standard result for x to the n minus a to the n over x minus a, limits at infinity, trigonometric limits with the squeeze argument, and exponential and logarithmic limits.', 'Part 2 at a glance.');
V.goals2 = table(['You will be able to', 'Using', 'Key result'], [
  ['Evaluate rational limits', 'substitution, factorisation, rationalisation', 'cancel the factor $x - a$'],
  ['Use the power result', 'the standard limit', M(r`\lim_{x \to a}\dfrac{x^n - a^n}{x - a} = n a^{n-1}`)],
  ['Find limits at infinity', 'division by the highest power', 'compare the degrees'],
  ['Use trigonometric limits', r`$\sin x \le x \le \tan x$`, M(r`\lim_{x \to 0}\dfrac{\sin x}{x} = 1`)],
  ['Use exponential and logarithmic limits', 'standard results', M(r`\lim_{x \to 0}\dfrac{e^x - 1}{x} = 1`)],
], 'Table of goals for Part 2: rational limits by substitution, factorisation and rationalisation; the power result; limits at infinity; trigonometric limits by the squeeze argument; exponential and logarithmic limits.', 'What Part 2 covers.');
// method table
{
  const A = (x) => (x * x + 1) / (x + 3), B = (x) => (x * x - 9) / (x * x - 2 * x - 3), C = (x) => (Math.sqrt(x + 4) - 2) / x, D = (x) => (2 * x + 1) / (x + 5);
  must(near(A, 2, 1) && near(B, 3, 1.5) && ratLim(P(1, 0, -9), P(1, -2, -3), 3).eq(F(3, 2)) && near(C, 0, 0.25) && nearInf(D, 2), 'method');
  V.method = table(['Situation', 'Method', 'Example and value'], [
    ['Denominator not zero at $a$', 'substitute', M(r`\displaystyle\lim_{x \to 2}\dfrac{x^2 + 1}{x + 3} = \dfrac{5}{5} = 1`)],
    [r`Polynomials, form $\dfrac{0}{0}$`, r`factorise and cancel $x - a$`, M(r`\displaystyle\lim_{x \to 3}\dfrac{x^2 - 9}{x^2 - 2x - 3} = \lim \dfrac{x + 3}{x + 1} = \dfrac{3}{2}`)],
    [r`Square roots, form $\dfrac{0}{0}$`, 'multiply by the conjugate', M(r`\displaystyle\lim_{x \to 0}\dfrac{\sqrt{x + 4} - 2}{x} = \dfrac{1}{4}`)],
    [r`$x \to \infty$`, 'divide by the highest power', M(r`\displaystyle\lim_{x \to \infty}\dfrac{2x + 1}{x + 5} = 2`)],
  ], 'Table of methods for rational limits: substitute when the denominator is not zero, factorise and cancel for polynomials giving zero over zero, multiply by the conjugate for square roots, and divide by the highest power as x tends to infinity, each with a worked value.', 'Choose the method from the form you get.');
}
// fac1: (x^3 + 2x^2 - x - 2)/(x^2 + x - 2) = x + 1
{
  const g = (x) => (x ** 3 + 2 * x * x - x - 2) / (x * x + x - 2);
  must(ratLim(P(1, 2, -1, -2), P(1, 1, -2), -2).eq(-1) && ratLim(P(1, 2, -1, -2), P(1, 1, -2), 1).eq(2) && near(g, -2, -1) && near(g, 1, 2) && agree('x+1', (x) => x + 1, [-3, 0, 2]) && [0, 2, -3].every((x) => Math.abs(g(x) - (x + 1)) < 1e-9), 'fac1');
  V.fac1 = plot({ x: [-4, 3], y: [-3, 5], fns: [{ expr: 'x+1', label: 'y = x + 1' }], pts: [[-2, -1, '$(-2, -1)$', 'free'], [1, 2, '$(1, 2)$', 'free'], [0, 1, '$(0, 1)$']] }, 'Plot of the line y equal to x plus 1, the simplified form of x cubed plus 2 x squared minus x minus 2 over x squared plus x minus 2, with holes at the points minus 2, minus 1 and 1, 2 where that function is not defined.', 'Holes at $(-2, -1)$ and $(1, 2)$: the limits there are $-1$ and $2$.');
}
// rat1: (sqrt(x+4) - 2)/x
{
  const g = (x) => (Math.sqrt(x + 4) - 2) / x;
  must(near(g, 0, 0.25) && agree('1/(sqrt(x+4)+2)', (x) => 1 / (Math.sqrt(x + 4) + 2), [-3, 0, 5]) && [-3, 1, 5].every((x) => Math.abs(g(x) - 1 / (Math.sqrt(x + 4) + 2)) < 1e-9), 'rat1');
  V.rat1 = plot({ x: [-3.5, 5], y: [0, 0.6], fns: [{ expr: '1/(sqrt(x+4)+2)', label: 'rationalised form' }], pts: [[0, 0.25, '$(0, 0.25)$', 'free'], [5, 0.2, '$(5, 0.2)$']] }, 'Plot of the function square root of x plus 4 minus 2 over x, drawn as its rationalised form 1 over square root of x plus 4 plus 2, with a hole at the point 0, 0.25; the limit at 0 is one quarter.', 'Rationalising shows the hole at $(0, \\tfrac14)$.');
}
// we2: (sqrt(x+4) - 3)/(x - 5) -> 1/6
{
  const g = (x) => (Math.sqrt(x + 4) - 3) / (x - 5);
  must(near(g, 5, 1 / 6), 'we2d2');
  V.we2d2 = table(['Step', 'Work'], [
    ['Multiply by the conjugate', M(r`\dfrac{\sqrt{x + 4} - 3}{x - 5} \times \dfrac{\sqrt{x + 4} + 3}{\sqrt{x + 4} + 3} = \dfrac{(x + 4) - 9}{(x - 5)(\sqrt{x + 4} + 3)}`)],
    ['Cancel $x - 5$', M(r`= \dfrac{1}{\sqrt{x + 4} + 3}`)],
    ['Substitute $x = 5$', M(r`\dfrac{1}{3 + 3} = \dfrac{1}{6}`)],
  ], 'Worked example table: multiplying the square root expression by its conjugate gives x minus 5 in the numerator, which cancels with the denominator, leaving one over the square root of x plus 4 plus 3, whose value at 5 is one sixth.', 'Multiply top and bottom by the conjugate.');
}
// power result
{
  const rows = [[3, 4, 108, '4'], [2, -1, -0.25, '-1'], [4, 0.5, 0.25, '\\dfrac{1}{2}'], [8, 1 / 3, 1 / 12, '\\dfrac{1}{3}']];
  const cell = ([a, n, v, nt]) => {
    const g = (x) => (x ** n - a ** n) / (x - a);
    must(near(g, a, v, { tol: 1e-4, hs: [1e-5, 1e-6, 1e-7] }) && Math.abs(n * a ** (n - 1) - v) < 1e-12, `power ${a} ${n}`);
    return [`$${a}$`, `$${nt}$`, M(String(dec(v, 4))), M(dec(g(a + 1e-8), 4))];
  };
  V.xn = table([r`$a$`, r`$n$`, r`$n a^{n-1}$`, r`Value of $\dfrac{x^n - a^n}{x - a}$ at $x = a + 10^{-8}$`], rows.map(cell), 'Table checking the standard result n a to the n minus 1: for a equal to 3 and n equal to 4 the value is 108, for a equal to 2 and n equal to minus 1 it is minus 0.25, for a equal to 4 and n equal to one half it is 0.25, and for a equal to 8 and n equal to one third it is about 0.0833; the quotient at a point very close to a agrees each time.', 'The result holds for integer and fractional $n$.');
}
// we3d2: (x^5 - 243)/(x - 3) and (x^(1/4) - 2)/(x - 16)
{
  const g1 = (x) => (x ** 5 - 243) / (x - 3), g2 = (x) => (x ** 0.25 - 2) / (x - 16);
  must(near(g1, 3, 405, { tol: 1e-4 }) && 5 * 3 ** 4 === 405 && near(g2, 16, 1 / 32, { tol: 1e-4, hs: [1e-4, 1e-5] }) && Math.abs(0.25 * 16 ** -0.75 - 1 / 32) < 1e-15, 'we3d2');
  V.we3d2 = table(['Part', 'Work', 'Value'], [
    ['(a)', M(r`\displaystyle\lim_{x \to 3}\dfrac{x^5 - 3^5}{x - 3} = 5 \times 3^{4}`), '$405$'],
    ['(b)', M(r`\displaystyle\lim_{x \to 16}\dfrac{x^{1/4} - 16^{1/4}}{x - 16} = \dfrac{1}{4} \times 16^{-3/4} = \dfrac{1}{4} \times \dfrac{1}{8}`), M(r`\dfrac{1}{32}`)],
  ], 'Worked example table: the limit of x to the fifth minus 243 over x minus 3 at 3 is 5 times 3 to the fourth, which is 405; the limit of the fourth root of x minus 2 over x minus 16 at 16 is one quarter times 16 to the minus three quarters, which is one thirty-second.', 'Write the numerator as $x^n - a^n$ first.');
}
// inf1
{
  const g = (x) => (3 * x * x + 1) / (x * x + 2);
  must(ratInf(P(3, 0, 1), P(1, 0, 2)).eq(3) && nearInf(g, 3) && agree('(3x^2+1)/(x^2+2)', g, [0, 2, 7]), 'inf1');
  V.inf1 = plot({ x: [0, 12], y: [0, 4], fns: [{ expr: '(3x^2+1)/(x^2+2)', label: 'y = (3x^2 + 1)/(x^2 + 2)' }], hl: [{ y: 3, label: 'y = 3', dashed: true }], pts: [[0, 0.5, '$(0, 0.5)$']] }, 'Plot of y equal to 3x squared plus 1 over x squared plus 2 for x from 0 to 12, rising from the point 0, 0.5 towards the dashed horizontal line y equal to 3, which it approaches as x grows.', 'As $x$ grows the values approach $3$.');
}
// we4d2
{
  const a = (x) => (4 * x ** 3 - x + 2) / (2 * x ** 3 + 5), b = (x) => (3 * x + 1) / (x * x - 4), c = (x) => (x * x + 1) / (3 * x + 2);
  must(ratInf(P(4, 0, -1, 2), P(2, 0, 0, 5)).eq(2) && nearInf(a, 2) && ratInf(P(3, 1), P(1, 0, -4)).eq(0) && nearInf(b, 0) && ratInf(P(1, 0, 1), P(3, 2)) === null && c(1e6) > 1e5, 'we4d2');
  V.we4d2 = table(['Limit as $x \\to \\infty$', 'Divide by the highest power of $x$ in the denominator', 'Result'], [
    [M(r`\dfrac{4x^3 - x + 2}{2x^3 + 5}`), M(r`\dfrac{4 - \frac{1}{x^2} + \frac{2}{x^3}}{2 + \frac{5}{x^3}} \to \dfrac{4}{2}`), '$2$'],
    [M(r`\dfrac{3x + 1}{x^2 - 4}`), M(r`\dfrac{\frac{3}{x} + \frac{1}{x^2}}{1 - \frac{4}{x^2}} \to \dfrac{0}{1}`), '$0$'],
    [M(r`\dfrac{x^2 + 1}{3x + 2}`), M(r`\dfrac{x + \frac{1}{x}}{3 + \frac{2}{x}} \text{ grows without bound}`), 'no finite limit'],
  ], 'Worked example table for limits at infinity: four x cubed minus x plus 2 over 2 x cubed plus 5 tends to 4 over 2, which is 2; 3x plus 1 over x squared minus 4 tends to 0; x squared plus 1 over 3x plus 2 grows without bound, so there is no finite limit.', 'Compare the degrees of the numerator and the denominator.');
}
// squeeze geometry as a plot of the unit circle
{
  const th = 0.8, px = Math.cos(th), py = Math.sin(th), qy = Math.tan(th);
  must(Math.abs(Math.sqrt(1 - px * px) - py) < 1e-12 && Math.abs(qy - py / px) < 1e-12 && py < th && th < qy, 'squeeze geometry: sin < theta < tan');
  V.sq1 = plot({ x: [-0.2, 1.4], y: [-0.2, 1.3], fns: [{ expr: 'sqrt(1-x^2)', label: 'unit circle (quarter)', domain: [0, 0.995] }, { expr: 'tan(0.8)*x', label: 'line OQ', domain: [0, 1] }], vl: [{ x: 1, label: 'x = 1', dashed: true }], pts: [[px, py, 'P'], [1, qy, 'Q', 'free'], [1, 0, 'A', 'free'], [px, 0, 'N', 'free']] }, 'Figure of a quarter of the unit circle with centre at the origin O and the line OQ at angle 0.8 radian; P is on the circle, N is the foot of the perpendicular from P to the horizontal axis, A is the point 1, 0 and Q is on the vertical line x equal to 1; the height PN is sine of the angle and AQ is tangent of the angle.', 'In the figure $PN = \\sin\\theta$, arc $AP = \\theta$ and $AQ = \\tan\\theta$.');
  V.sq1.spec.points[1].on_curve = false;
}
// sq2
{
  must([0.1, 0.5, 1, 1.2].every((x) => Math.sin(x) < x && x < Math.tan(x)), 'sin < x < tan');
  V.sq2 = plot({ x: [0, 1.2], y: [0, 2.8], fns: [{ expr: 'sin(x)', label: 'y = sin x' }, { expr: 'x', label: 'y = x' }, { expr: 'tan(x)', label: 'y = tan x' }] }, 'Plot of y equal to sine x, y equal to x and y equal to tangent x for x from 0 to 1.2 radians: the sine curve lies below the line y equal to x, which lies below the tangent curve, and all three meet at the origin.', r`$\sin x < x < \tan x$ for $0 < x < \dfrac{\pi}{2}$.`);
}
// sin kx / x forms
{
  const a = (x) => Math.sin(3 * x) / x, b = (x) => Math.tan(4 * x) / x, c = (x) => Math.sin(2 * x) / Math.tan(5 * x);
  must(near(a, 0, 3) && near(b, 0, 4) && near(c, 0, 0.4), 'sin forms');
  V.sinf = table(['Form as $x \\to 0$', 'Limit', 'Why'], [
    [M(r`\dfrac{\sin kx}{x}`), '$k$', M(r`k \cdot \dfrac{\sin kx}{kx} \to k \cdot 1`)],
    [M(r`\dfrac{\tan kx}{x}`), '$k$', M(r`k \cdot \dfrac{\sin kx}{kx} \cdot \dfrac{1}{\cos kx} \to k`)],
    [M(r`\dfrac{\sin ax}{\sin bx}`), M(r`\dfrac{a}{b}`), M(r`\dfrac{a}{b} \cdot \dfrac{\sin ax}{ax} \cdot \dfrac{bx}{\sin bx}`)],
    [M(r`\dfrac{\sin 2x}{\tan 5x}`), M(r`\dfrac{2}{5}`), 'the case $a = 2$, $b = 5$'],
  ], 'Table of sine and tangent limits at zero: sine kx over x tends to k, tangent kx over x tends to k, and sine ax over sine bx tends to a over b, with the case sine 2x over tangent 5x giving two fifths.', 'Match the angle inside the sine with the denominator.');
}
// we5d2: (3x + sin 5x)/(2x) = 4
{
  const g = (x) => (3 * x + Math.sin(5 * x)) / (2 * x);
  must(near(g, 0, 4), 'we5d2');
  V.we5d2 = table(['Step', 'Work'], [
    ['Split the fraction', M(r`\dfrac{3x + \sin 5x}{2x} = \dfrac{3}{2} + \dfrac{\sin 5x}{2x}`)],
    ['Make $\\dfrac{\\sin 5x}{5x}$', M(r`\dfrac{\sin 5x}{2x} = \dfrac{5}{2} \cdot \dfrac{\sin 5x}{5x} \to \dfrac{5}{2} \times 1`)],
    ['Add', M(r`\dfrac{3}{2} + \dfrac{5}{2} = 4`)],
  ], 'Worked example table: splitting the fraction gives three halves plus sine 5x over 2x; the second part tends to five halves, so the limit is three halves plus five halves, which is 4.', 'Split first, then use the standard limit.');
}
// t1: tan x / x and (1 - cos x)/x^2 values
{
  const xs = [0.1, 0.01, 0.001, -0.001, -0.01, -0.1];
  const tn = (x) => Math.tan(x) / x, cs = (x) => (1 - Math.cos(x)) / (x * x);
  must(near(tn, 0, 1) && near(cs, 0, 0.5) && xs.every((x) => Math.abs(tn(x) - 1) < 4e-3 && Math.abs(cs(x) - 0.5) < 1e-2), 't1');
  V.t1 = table(['$x$', ...xs.map(String)], [[r`$\dfrac{\tan x}{x}$`, ...xs.map((x) => dec(tn(x), 5))], [r`$\dfrac{1 - \cos x}{x^2}$`, ...xs.map((x) => dec(cs(x), 5))]], 'Table of values of tangent x over x and of 1 minus cosine x over x squared at x equal to 0.1, 0.01, 0.001 and their negatives: the first row of values closes in on 1 and the second on 0.5.', 'The values approach $1$ and $\\tfrac12$ from both sides.');
}
// we6d2: (1 - cos 3x)/sin^2 2x = 9/8
{
  const g = (x) => (1 - Math.cos(3 * x)) / Math.sin(2 * x) ** 2;
  must(near(g, 0, 9 / 8), 'we6d2');
  V.we6d2 = table(['Step', 'Work'], [
    ['Use $1 - \\cos 3x = 2\\sin^2\\frac{3x}{2}$', M(r`\dfrac{2\sin^2 \frac{3x}{2}}{\sin^2 2x}`)],
    ['Insert the matching arguments', M(r`2 \cdot \left(\dfrac{\sin \frac{3x}{2}}{\frac{3x}{2}}\right)^2 \cdot \dfrac{9x^2}{4} \cdot \dfrac{1}{4x^2} \cdot \left(\dfrac{2x}{\sin 2x}\right)^2`)],
    ['Take the limit', M(r`2 \times 1 \times \dfrac{9}{4} \times \dfrac{1}{4} \times 1 = \dfrac{9}{8}`)],
  ], 'Worked example table: writing 1 minus cosine 3x as twice sine squared of 3x over 2 and inserting the matching arguments gives two times nine quarters times one quarter, so the limit is nine eighths.', 'Rewrite $1 - \\cos$ with a half angle.');
}
// exp1
{
  const x = 0.001;
  const e1 = (t) => (Math.exp(t) - 1) / t, a2 = (t) => (2 ** t - 1) / t, l1 = (t) => Math.log(1 + t) / t;
  must(near(e1, 0, 1) && near(a2, 0, Math.LN2) && near(l1, 0, 1), 'exp1');
  V.exp1 = table(['Standard limit as $x \\to 0$', 'Value', r`Value at $x = 0.001$`], [
    [M(r`\dfrac{e^x - 1}{x}`), '$1$', dec(e1(x), 5)],
    [M(r`\dfrac{a^x - 1}{x}`), M(r`\ln a`), `${dec(a2(x), 5)} for $a = 2$ ($\\ln 2 = ${dec(Math.LN2, 5)}$)`],
    [M(r`\dfrac{\ln(1 + x)}{x}`), '$1$', dec(l1(x), 5)],
  ], 'Table of the exponential and logarithmic standard limits at zero: e to the x minus 1 over x tends to 1, a to the x minus 1 over x tends to the natural logarithm of a, and the natural logarithm of 1 plus x over x tends to 1, each shown with its value at x equal to 0.001.', 'Each limit has the form $0/0$ at $x = 0$.');
}
// we7d2: (e^{2x} - 1)/ln(1 + 5x) = 2/5
{
  const g = (x) => (Math.exp(2 * x) - 1) / Math.log(1 + 5 * x);
  must(near(g, 0, 0.4), 'we7d2');
  V.we7d2 = table(['Step', 'Work'], [
    ['Divide top and bottom by $x$', M(r`\dfrac{e^{2x} - 1}{\ln(1 + 5x)} = \dfrac{(e^{2x} - 1)/x}{\ln(1 + 5x)/x}`)],
    ['Top', M(r`\dfrac{e^{2x} - 1}{x} = 2 \cdot \dfrac{e^{2x} - 1}{2x} \to 2`)],
    ['Bottom and quotient', M(r`\dfrac{\ln(1 + 5x)}{x} = 5 \cdot \dfrac{\ln(1 + 5x)}{5x} \to 5, \quad \text{so the limit is } \dfrac{2}{5}`)],
  ], 'Worked example table: dividing the top and bottom by x, the top e to the 2x minus 1 over x tends to 2 and the bottom natural logarithm of 1 plus 5x over x tends to 5, so the limit is two fifths.', 'Divide by $x$ and scale each standard limit.');
}
// e limit
{
  const xs = [0.1, 0.01, 0.001, -0.001, -0.01, -0.1];
  const g = (x) => (1 + x) ** (1 / x);
  must(xs.every((x) => Math.abs(g(x) - Math.E) < 0.2) && near(g, 0, Math.E, { tol: 1e-4, hs: [1e-4, 1e-5] }), 'e table');
  V.e1 = table(['$x$', ...xs.map(String)], [[r`$(1 + x)^{1/x}$`, ...xs.map((x) => dec(g(x), 4))]], 'Table of values of 1 plus x all to the power 1 over x at x equal to 0.1, 0.01, 0.001 and their negatives: the values 2.5937, 2.7048, 2.7169 and 2.7196, 2.732, 2.868 close in on e, about 2.71828.', 'The values approach $e \\approx 2.71828$.');
}
// we8d2: (1 - 2x)^(5/x) = e^-10
{
  const g = (x) => (1 - 2 * x) ** (5 / x);
  must(Math.abs(g(1e-6) / Math.exp(-10) - 1) < 1e-3 && Math.abs(g(-1e-6) / Math.exp(-10) - 1) < 1e-3, 'we8d2');
  V.we8d2 = table(['Step', 'Work'], [
    ['Put $t = -2x$', M(r`t \to 0 \text{ as } x \to 0, \qquad \dfrac{5}{x} = \dfrac{-10}{t}`)],
    ['Rewrite', M(r`(1 - 2x)^{5/x} = \left[(1 + t)^{1/t}\right]^{-10}`)],
    ['Limit', M(r`e^{-10}`)],
  ], 'Worked example table: putting t equal to minus 2x turns 1 minus 2x all to the power 5 over x into the bracket 1 plus t to the power 1 over t, all raised to the power minus 10, whose limit is e to the minus 10.', 'Make the base $1 + t$ and the power $\\dfrac{1}{t}$.');
}
V.sum2 = table(['Idea', 'Result'], [
  ['Rational limits', 'substitute; if $0/0$ factorise or rationalise'],
  ['Power result', M(r`\lim_{x \to a}\dfrac{x^n - a^n}{x - a} = n a^{n-1}`)],
  ['At infinity', 'divide by the highest power; compare degrees'],
  ['Trigonometric', M(r`\lim_{x \to 0}\dfrac{\sin x}{x} = 1, \; \lim \dfrac{\tan x}{x} = 1, \; \lim \dfrac{1 - \cos x}{x^2} = \dfrac{1}{2}`)],
  ['Exponential and logarithmic', M(r`\lim \dfrac{e^x - 1}{x} = 1, \; \lim \dfrac{a^x - 1}{x} = \ln a, \; \lim \dfrac{\ln(1 + x)}{x} = 1`)],
  ['Number $e$', M(r`\lim_{x \to 0}(1 + x)^{1/x} = e`)],
], 'Summary table of Part 2: rational limits by substitution, factorisation or rationalisation; the power result; limits at infinity by dividing by the highest power; the sine, tangent and cosine limits; the exponential and logarithmic limits; and the limit that defines e.', 'The key results of Part 2.');
V.tips2 = table(['Common slip', 'Do this instead'], [
  ['Cancelling terms instead of factors', 'factorise first, then cancel the factor $x - a$'],
  [r`Using $\dfrac{\sin 3x}{x} \to 1$`, 'match the angle: it tends to $3$'],
  [r`Using the degree form of $\sin x$`, 'the standard limits need $x$ in radians'],
  [r`Forgetting $\ln a$ in $\dfrac{a^x - 1}{x}$`, r`the limit is $\ln a$, equal to $1$ only for $a = e$`],
], 'Table of common slips: cancelling terms rather than factors, using the standard sine limit without matching the angle, using degrees instead of radians, and forgetting the natural logarithm of a in the limit of a to the x minus 1 over x.', 'Four slips to avoid.');
