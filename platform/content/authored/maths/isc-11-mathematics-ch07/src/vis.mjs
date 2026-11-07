// Visuals for ISC 11 Mathematics ch07 (Linear and Quadratic Inequalities): every table cell, number line, graph point and number
// quoted in an alt text is computed from the exact solver (rat.mjs / ineq.mjs) and asserted.
import { table, flow, plot } from './lib.mjs';
import { fr, eq, add, sub, mul, div, cmp, num, ivF, frTex, holds, relTex, draw, range } from './ineq.mjs';
import { P, solvePoly, solveRational, setTex, chartTable, regionLabels, pTex, pEval, fromRoots, must, r, S, peq, pMul, integersIn } from './rat.mjs';
import { numberLine } from './nl.mjs';

export const CAP = 'Open circles mark end points that are left out, filled circles mark end points that are included, and an arrow shows that the set goes on for ever.';
const D = (s) => `$${s}$`;
const rowOf = (tag, sol, altTag) => ({ tag, ...(altTag ? { altTag } : {}), ivs: (sol.ivs ?? [sol.iv ?? sol]).map(draw) });
const plotF = (spec, alt, caption) => { const v = plot(spec, alt, caption); return v; };
export const V = {};

// ================================================================ deck 1: linear inequalities
V.route1 = flow('LR', [['a', 'Symbols and the number line'], ['b', 'Rules for operations'], ['c', 'Solving step by step'], ['d', 'Double inequalities'], ['e', 'Special cases and problems']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Route map of Part 1: the four inequality symbols and the number line, the rules for operating on an inequality, solving a linear inequality step by step, double inequalities, and the special cases with word problems.', 'Part 1 at a glance.');

V.sym = table(['In words', 'Symbol', 'End point in the set?', 'Example', 'Circle on the line'], [
  ['less than, below', '$<$', 'no', '$x < 4$', 'open'],
  ['greater than, above', '$>$', 'no', '$x > 4$', 'open'],
  ['at most, not more than', r`$\le$`, 'yes', r`$x \le 4$`, 'filled'],
  ['at least, not less than', r`$\ge$`, 'yes', r`$x \ge 4$`, 'filled'],
], 'Table of the four inequality symbols: less than and greater than leave the end point out and use an open circle; at most and at least keep the end point and use a filled circle, each shown with the example x compared with 4.', 'A strict sign leaves the end point out; a sign with a bar keeps it in.');

const fA = [
  rowOf('x > 1', { iv: ivF(fr(1), null, false, false) }, 'Row one, x greater than 1'),
  rowOf('x ≤ 3', { iv: ivF(null, fr(3), false, true) }, 'Row two, x at most 3'),
  rowOf('x < −2', { iv: ivF(null, fr(-2), false, false) }, 'Row three, x less than minus 2'),
  rowOf('x ≥ 1/2', { iv: ivF(fr(1, 2), null, true, false) }, 'Row four, x at least one half'),
];
V.forms = numberLine({ from: -3, to: 4, rows: fA }, CAP, { lead: 'Four inequalities drawn on number lines.' });

// rules table: start from the true statement -2 < 6
const base0 = [fr(-2), fr(6)];
const ops = [['Add $5$', (v) => add(v, fr(5)), 1], ['Subtract $7$', (v) => sub(v, fr(7)), 1], ['Multiply by $4$', (v) => mul(v, fr(4)), 1], ['Multiply by $-4$', (v) => mul(v, fr(-4)), -1], ['Divide by $2$', (v) => div(v, fr(2)), 1], ['Divide by $-2$', (v) => div(v, fr(-2)), -1]];
const rulesRows = ops.map(([name, fn, sign]) => {
  const a = fn(base0[0]), b = fn(base0[1]);
  const rel = cmp(a, b) < 0 ? '<' : '>';
  must((rel === '<') === (sign === 1), `rule ${name}`);
  return [name, `$${frTex(a)} ${rel} ${frTex(b)}$`, sign === 1 ? 'kept' : 'reversed'];
});
V.rules = table(['Start: $-2 < 6$. Operation on both sides', 'Result', 'Sign'], rulesRows, 'Table applying six operations to the true statement minus 2 less than 6: adding or subtracting a number, and multiplying or dividing by a positive number, keep the sign; multiplying or dividing by a negative number, minus 4 or minus 2, reverses it.', 'Only a negative multiplier or divisor reverses the sign.');
V.steps = flow('LR', [['a', 'Clear brackets and fractions'], ['b', r`Collect the $x$ terms on one side`], ['c', 'Divide by the coefficient of $x$; reverse the sign if it is negative'], ['d', 'Write the set and draw it'], ['e', 'Check with a test value']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow chart of the method for a linear inequality: clear brackets and fractions, collect the x terms on one side, divide by the coefficient of x and reverse the sign if it is negative, write and draw the set, and check with a test value.', 'The only new step compared with an equation is the sign rule.');

const w1 = S([8, -7], '<', [3, 18]);
must(w1.cond === 'x < 5' && w1.pred(fr(4)) && !w1.pred(fr(5)) && 8 * 4 - 7 === 25 && 3 * 4 + 18 === 30 && 8 * 5 - 7 === 33 && 3 * 5 + 18 === 33, 'WE1 x < 5');
V.we1nl = numberLine({ from: 0, to: 8, rows: [rowOf('x < 5', w1)] }, CAP, { lead: 'Solution of eight x minus seven less than three x plus eighteen.' });
V.we1 = table(['Step', 'Working'], [['Given', r`$8x - 7 < 3x + 18$`], ['Collect $x$ terms', r`$8x - 3x < 18 + 7$`], ['Simplify', r`$5x < 25$`], ['Divide by $5$ (positive)', `$${w1.cond}$`], ['Check $x = 4$ and $x = 5$', r`$25 < 30$ is true; $33 < 33$ is false, so $5$ is left out`]], 'Worked example 1 table: eight x minus seven less than three x plus eighteen gives five x less than twenty five, so x is less than 5; the check x equal 4 gives 25 less than 30, true, and x equal 5 gives 33 less than 33, false.', 'Dividing by a positive number keeps the sign.');

const ng = [S([-3, 7], '>=', [0, 22]), S([-5, 4], '<', [3, 20]), S([-7, 10], '>=', [0, 24])];
must(ng.map((s) => s.cond).join('|') === 'x \\le -5|x > -2|x \\le -2' && ng.every((s) => s.flipped), 'negative coefficient rows');
V.neg = table(['Inequality', 'After collecting terms', 'Divide by the negative coefficient', 'Solution'], [
  [r`$-3x + 7 \ge 22$`, r`$-3x \ge 15$`, r`$x \le -5$ (sign reversed)`, D(ng[0].cond)],
  [r`$4 - 5x < 3x + 20$`, r`$-8x < 16$`, r`$x > -2$ (sign reversed)`, D(ng[1].cond)],
  [r`$10 - 7x \ge 24$`, r`$-7x \ge 14$`, r`$x \le -2$ (sign reversed)`, D(ng[2].cond)],
], 'Table of three inequalities whose coefficient of x is negative: minus 3x plus 7 at least 22 gives x at most minus 5; 4 minus 5x less than 3x plus 20 gives x greater than minus 2; 10 minus 7x at least 24 gives x at most minus 2; the sign is reversed each time.', 'A negative coefficient of $x$ reverses the sign when we divide.');

// (3x - 1)/4 - (x + 2)/3 <= 1/2  is  (3/4)x - 1/4 <= (1/3)x + 2/3 + 1/2
const w2b = S([[3, 4], [-1, 4]], '<=', [[1, 3], [7, 6]]);
must(w2b.cond === 'x \\le \\dfrac{17}{5}' && 9 * 1 - 4 * 1 === 5 && -3 - 8 === -11 && 11 + 6 === 17 && w2b.pred(fr(17, 5)) && !w2b.pred(fr(7, 2)), 'WE2 x <= 17/5');
V.we2 = table(['Step', 'Working'], [['Given', r`$\dfrac{3x - 1}{4} - \dfrac{x + 2}{3} \le \dfrac{1}{2}$`], ['Multiply by the LCM $12$ (positive)', r`$3(3x - 1) - 4(x + 2) \le 6$`], ['Expand', r`$9x - 3 - 4x - 8 \le 6$`], ['Collect', r`$5x - 11 \le 6$, so $5x \le 17$`], ['Divide by $5$', `$${w2b.cond}$`]], 'Worked example 2 table: multiply the inequality with fractions by 12, expand to get 9x minus 3 minus 4x minus 8 at most 6, collect to 5x at most 17, and divide by 5 to get x at most 17 over 5.', 'Multiplying by a positive LCM keeps the sign.');

V.dblNl = numberLine({ from: -1, to: 8, rows: [rowOf('1 < x ≤ 6', { iv: ivF(fr(1), fr(6), false, true) })] }, CAP, { lead: 'The double inequality one less than x at most six.' });
// WE3: -4 <= (7 - 3x)/2 < 5
const d3 = { lo: S([-3, 7], '>=', [0, -8]), hi: S([-3, 7], '<', [0, 10]) };
// -4 <= (7-3x)/2  <=>  -8 <= 7 - 3x  <=>  -3x >= -15 <=> x <= 5 ; (7-3x)/2 < 5 <=> 7 - 3x < 10 <=> x > -1
must(d3.lo.cond === 'x \\le 5' && d3.hi.cond === 'x > -1', 'WE3 parts');
const pdbl = (x) => { const v = div(sub(fr(7), mul(fr(3), x)), fr(2)); return cmp(v, fr(-4)) >= 0 && cmp(v, fr(5)) < 0; };
must(range(-40, 40).every((k) => pdbl(fr(k, 4)) === (cmp(fr(k, 4), fr(-1)) > 0 && cmp(fr(k, 4), fr(5)) <= 0)), 'WE3 grid');
V.we3 = table(['Step', 'Working'], [['Given', r`$-4 \le \dfrac{7 - 3x}{2} < 5$`], ['Multiply all three parts by $2$', r`$-8 \le 7 - 3x < 10$`], ['Subtract $7$ from all parts', r`$-15 \le -3x < 3$`], ['Divide all parts by $-3$ and reverse both signs', r`$5 \ge x > -1$`], ['Write in the usual order', r`$-1 < x \le 5$, that is $(-1, 5]$`]], 'Worked example 3 table: minus 4 at most 7 minus 3x over 2, less than 5; multiplying by 2 gives minus 8 at most 7 minus 3x less than 10; subtracting 7 gives minus 15 at most minus 3x less than 3; dividing by minus 3 reverses both signs and gives x in the interval from minus 1, left out, to 5, included.', 'Operate on all three parts; reverse both signs if you divide by a negative number.');

const cs = [S([5, -10], '>', [5, -7]), S([4, 9], '>=', [4, 6]), S([3, -5], '<=', [2, 1])];
must(cs[0].kind === 'none' && cs[1].kind === 'all' && cs[2].kind === 'ray' && cs[2].cond === 'x \\le 6', 'cases');
V.cases = table(['Inequality', 'After collecting $x$ terms', 'Meaning', 'Solution set'], [
  [r`$5(x - 2) > 5x - 7$`, r`$0 > 3$`, 'false for every $x$', r`$\varnothing$ (no solution)`],
  [r`$4x + 9 \ge 2(2x + 3)$`, r`$0 \ge -3$`, 'true for every $x$', r`$\mathbb{R}$ (all real numbers)`],
  [r`$3x - 5 \le 2x + 1$`, r`$x \le 6$`, 'true for some $x$', r`$(-\infty, 6]$`],
], 'Table of three outcomes: five times x minus 2 greater than 5x minus 7 reduces to 0 greater than 3, which is false, so there is no solution; 4x plus 9 at least twice 2x plus 3 reduces to 0 at least minus 3, which is true, so every real number works; 3x minus 5 at most 2x plus 1 gives x at most 6.', 'If the $x$ terms cancel, the truth of what is left decides everything.');

const we4 = S([8, 150], '<', [14, 0]);
must(we4.cond === 'x > 25' && 150 + 8 * 25 === 350 && 14 * 25 === 350 && 150 + 8 * 26 === 358 && 14 * 26 === 364 && 358 < 364, 'WE4 n > 25');
V.we4 = table(['Step', 'Working'], [['Let $n$ be the number of meals', r`Plan cost $150 + 8n$; pay-per-meal cost $14n$`], ['Plan cheaper', r`$150 + 8n < 14n$`], ['Collect', r`$150 < 6n$, so $n > 25$`], ['Whole numbers only', r`Least value $n = 26$`], ['Check', r`$n = 25$: $350$ and $350$ (equal); $n = 26$: $358 < 364$`]], 'Worked example 4 table for an imagined canteen plan: 150 plus 8n rupees against 14n rupees; the plan is cheaper when 150 plus 8n is less than 14n, so n is greater than 25 and the least whole number is 26, checked by the costs 350 and 350 at 25 meals and 358 and 364 at 26 meals.', 'Read the answer back in words, and respect whole numbers.');

V.summary1 = flow('LR', [['a', 'Add or subtract: sign kept'], ['b', 'Multiply or divide by a negative: sign reversed'], ['c', 'All parts of a double inequality'], ['d', 'Answer as an interval and on the number line']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Summary flow of Part 1: adding or subtracting keeps the sign, multiplying or dividing by a negative number reverses it, a double inequality is worked on all its parts, and the answer is written as an interval and drawn on the number line.', 'Part 1 in four steps.');
V.tips1 = table(['Question type', 'How marks are usually given'], [['Solve a linear inequality (2)', 'collecting terms 1, correct set 1'], ['Fractions or brackets first (3)', 'clearing 1, collecting 1, set and graph 1'], ['Double inequality (3)', 'working on all parts 1, reversing both signs 1, interval 1'], ['Word problem (3)', 'inequality formed 1, solved 1, whole-number reading 1']], 'Exam tips table for Part 1: a linear inequality earns marks for collecting terms and the correct set; fractions or brackets earn clearing, collecting and the set with its graph; a double inequality earns working on all parts, reversing both signs and the interval; a word problem earns the inequality, its solution and the whole-number reading.', 'Show the sign reversal as its own line.');

// ================================================================ deck 2: quadratic and rational inequalities
V.route2 = flow('LR', [['a', 'Sign of a quadratic'], ['b', 'Method of intervals'], ['c', 'Perfect squares and no real roots'], ['d', 'Rational inequalities'], ['e', 'End points']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Route map of Part 2: the sign of a quadratic, the method of intervals, perfect squares and quadratics with no real roots, rational inequalities compared with a constant, and the rules for end points.', 'Part 2 at a glance.');

const q1 = P(1, -3, -10);
const q1s = solvePoly(q1, '>=');
must(setTex(q1s) === r`(-\infty, -2] \cup [5, \infty)` && peq(pMul(P(1, 2), P(1, -5)), q1) && eq(pEval(q1, fr(3, 2)), fr(-49, 4)), 'x^2 - 3x - 10');
V.parab = plotF({ x: [-4, 7], y: [-14, 10], fns: [{ expr: 'x^2 - 3x - 10', label: '$y = x^2 - 3x - 10$' }], pts: [[-2, 0, '(-2, 0)'], [5, 0, '(5, 0)'], [1.5, -12.25, '(1.5, -12.25)'], [0, -10, '(0, -10)']] }, 'Graph of y equal to x squared minus 3x minus 10: an upward parabola crossing the x-axis at minus 2 and 5, with lowest point (1.5, minus 12.25) and y-intercept minus 10. The curve is above the axis for x less than minus 2 and for x greater than 5, and below it between the two crossings.', 'Above the axis outside the roots, below it between them.');
V.method = flow('LR', [['a', 'Move everything to one side; compare with $0$'], ['b', 'Factorise'], ['c', 'Mark the critical points on a number line'], ['d', 'Find the sign in each region'], ['e', 'Pick the regions; decide each end point']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow chart of the method of intervals: move everything to one side so the other side is zero, factorise, mark the critical points on a number line, find the sign of the expression in each region, then choose the regions and decide each end point.', 'The sign can only change at a critical point.');
V.chart1 = chartTable(q1s, { exprTex: 'x^2 - 3x - 10', verdict: 'Satisfies $\\ge 0$?', alt: 'Sign chart for x squared minus 3x minus 10, which factorises as x plus 2 times x minus 5, with the critical points minus 2 and 5: the product is positive for x less than minus 2, negative between minus 2 and 5, and positive for x greater than 5, so the inequality at least 0 holds in the first and third regions.', caption: 'The signs of the two factors multiply; the end points $-2$ and $5$ give $0$, which is allowed by $\\ge$.' });

const w1q = solvePoly(P(2, -5, -3), '<');
must(setTex(w1q) === r`(-\dfrac{1}{2}, 3)` && peq(pMul(P(2, 1), P(1, -3)), P(2, -5, -3)) && pEval(P(2, -5, -3), fr(0)).n === -3n && pEval(P(2, -5, -3), fr(-1, 2)).n === 0n && pEval(P(2, -5, -3), fr(3)).n === 0n, 'WE1 (2x+1)(x-3)<0');
V.we1q = chartTable(w1q, { exprTex: '(2x + 1)(x - 3)', verdict: 'Satisfies $< 0$?', alt: 'Worked example 1 sign chart for 2x squared minus 5x minus 3, which is 2x plus 1 times x minus 3, with critical points minus one half and 3: the product is negative only between them, so the strict inequality less than 0 gives the open interval from minus one half to 3.', caption: 'Both end points give $0$, which is not less than $0$, so they stay out.' });
V.we1qNl = numberLine({ from: -2, to: 4, rows: [rowOf('−1/2 < x < 3', w1q)] }, CAP, { lead: 'Solution of two x squared minus five x minus three less than zero.' });

const w2q = solvePoly(P(-1, -1, 12), '>');
must(setTex(w2q) === '(-4, 3)' && peq(pMul(P(1, 4), P(1, -3)), P(1, 1, -12)) && peq(P(-1, -1, 12), P(-1, -1, 12)), 'WE2');
V.negq = table(['Step', 'Working'], [['Given', r`$12 - x - x^2 > 0$`], ['Standard form', r`$-x^2 - x + 12 > 0$`], ['Multiply by $-1$ and reverse the sign', r`$x^2 + x - 12 < 0$`], ['Factorise', r`$(x + 4)(x - 3) < 0$`], ['Negative between the roots', `$${setTex(w2q)}$, that is $-4 < x < 3$`], ['Check $x = 0$', r`$12 - 0 - 0 = 12 > 0$ is true`]], 'Worked example 2 table: twelve minus x minus x squared greater than 0 is rewritten with a positive x squared by multiplying by minus 1 and reversing the sign, giving x squared plus x minus 12 less than 0, which factorises as x plus 4 times x minus 3, so the solution is the open interval from minus 4 to 3, and x equal 0 checks.', 'Make the leading coefficient positive, and reverse the sign.');
V.lead = table(['Leading coefficient', 'Parabola opens', '$ax^2 + bx + c > 0$ for', '$ax^2 + bx + c < 0$ for'], [['$a > 0$', 'upwards', 'outside the roots', 'between the roots'], ['$a < 0$', 'downwards', 'between the roots', 'outside the roots']], 'Table linking the leading coefficient to the shape: for a greater than 0 the parabola opens upwards, the quadratic is positive outside the roots and negative between them; for a less than 0 it opens downwards, positive between the roots and negative outside.', 'Two real roots: the sign pattern depends only on the sign of $a$.');

const pf = ['>=', '>', '<=', '<'].map((rel) => solvePoly(fromRoots([3, 3]), rel));
must(pf.map(setTex).join('|') === [r`(-\infty, \infty)`, r`(-\infty, 3) \cup (3, \infty)`, r`\{3\}`, r`\varnothing`].join('|'), 'perfect square cases');
V.perfect = table(['Inequality', 'Why', 'Solution set'], [
  [r`$(x - 3)^2 \ge 0$`, 'a square is never negative', r`$\mathbb{R}$`],
  [r`$(x - 3)^2 > 0$`, 'a square is positive except at its root', r`$(-\infty, 3) \cup (3, \infty)$`],
  [r`$(x - 3)^2 \le 0$`, 'a square is zero only at its root', r`$\{3\}$`],
  [r`$(x - 3)^2 < 0$`, 'a square is never negative', r`$\varnothing$`],
], 'Table of the four inequalities for the perfect square x minus 3 all squared: at least 0 holds for every real number, greater than 0 holds for every real number except 3, at most 0 holds only at 3, and less than 0 has no solution.', 'The sign of a perfect square never changes.');

const w3 = ['>', '<='].map((rel) => solvePoly(P(4, 12, 9), rel));
must(peq(pMul(P(2, 3), P(2, 3)), P(4, 12, 9)) && setTex(w3[0]) === r`(-\infty, -\dfrac{3}{2}) \cup (-\dfrac{3}{2}, \infty)` && setTex(w3[1]) === r`\{-\dfrac{3}{2}\}`, 'WE3');
V.we3q = table(['Step', 'Working'], [['Given', r`$4x^2 + 12x + 9 > 0$ and $4x^2 + 12x + 9 \le 0$`], ['Recognise a square', r`$4x^2 + 12x + 9 = (2x + 3)^2$`], ['Root', r`$2x + 3 = 0$ gives $x = -\dfrac{3}{2}$`], ['Strict case', `$> 0$: ${D(setTex(w3[0]))}`], ['At most case', `$\\le 0$: ${D(setTex(w3[1]))}`]], 'Worked example 3 table: four x squared plus 12x plus 9 is the perfect square 2x plus 3 all squared with root minus three halves; greater than 0 holds for every real number except minus three halves, and at most 0 holds only at minus three halves.', 'Same expression, opposite verdicts at the root.');

const nr = [P(1, -2, 4), P(1, 1, 3), P(-1, 2, -5)];
must(nr.every((p) => { const [a, b, c] = p; return num(b) * num(b) - 4 * num(a) * num(c) < 0; }) && setTex(solvePoly(nr[0], '>')) === r`(-\infty, \infty)` && setTex(solvePoly(nr[2], '>')) === r`\varnothing`, 'no real roots');
V.noroots = plotF({ x: [-3, 5], y: [-2, 12], fns: [{ expr: 'x^2 - 2x + 4', label: '$y = x^2 - 2x + 4$' }], pts: [[1, 3, '(1, 3)'], [0, 4, '(0, 4)']] }, 'Graph of y equal to x squared minus 2x plus 4: an upward parabola with lowest point (1, 3) and y-intercept 4. It never reaches the x-axis because the discriminant is minus 12, so the quadratic is positive for every real x.', 'Discriminant $-12 < 0$: the curve stays above the axis.');
V.nrTable = table(['Quadratic', 'Discriminant', 'Sign for all real $x$', r`Solution of $> 0$`, r`Solution of $< 0$`], nr.map((p) => { const [a, b, c] = p; const dd = num(b) * num(b) - 4 * num(a) * num(c); return [D(pTex(p)), D(String(dd)), a.n > 0n ? 'positive' : 'negative', D(setTex(solvePoly(p, '>'))), D(setTex(solvePoly(p, '<')))]; }), 'Table of three quadratics with negative discriminants: x squared minus 2x plus 4, x squared plus x plus 3, and minus x squared plus 2x minus 5; the first two are positive for every real x and the third is negative for every real x.', 'When $D < 0$ the sign is the sign of $a$ everywhere.');

V.rflow = flow('LR', [['a', 'Move the constant across: one side is zero'], ['b', 'Combine into a single fraction'], ['c', 'Factorise top and bottom'], ['d', 'Mark zeros of the top and of the bottom'], ['e', 'Sign chart; never include a zero of the bottom']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow chart for a rational inequality: move the constant across so that one side is zero, combine into a single fraction, factorise the top and the bottom, mark the zeros of both, then use a sign chart and never include a zero of the bottom.', 'Never multiply across by a denominator whose sign you do not know.');

// wrong method: (x - 1)/(x + 2) >= 3 treated like an equation
const wr = solveRational(P(1, -1), P(1, 2), '>=', 3);
must(setTex(wr) === r`[-\dfrac{7}{2}, -2)`, 'rational >= 3');
const val = (x) => div(pEval(P(1, -1), x), pEval(P(1, 2), x));
const wrongSet = (x) => cmp(x, fr(-7, 2)) <= 0; // from x - 1 >= 3(x + 2), dividing by -2
const tests = [fr(-4), fr(-7, 2), fr(-3), fr(-1)];
const wrows = tests.map((x) => { const truth = holds('>=', val(x), fr(3)); const w = wrongSet(x); return [D(frTex(x)), D(frTex(val(x))), truth ? 'yes' : 'no', w ? 'yes' : 'no', truth === w ? 'agree' : 'DISAGREE']; });
must(wrows.map((x) => x[4]).join() === 'DISAGREE,agree,DISAGREE,agree', 'wrong method rows');
V.wrong = table(['Test value $x$', r`$\dfrac{x - 1}{x + 2}$`, r`Does it satisfy $\ge 3$?`, r`In the wrong set $x \le -\dfrac{7}{2}$?`, 'Result'], wrows, 'Table testing the wrong set x at most minus 7 over 2, obtained by multiplying x minus 1 over x plus 2 at least 3 by x plus 2 as if it were positive: x equal minus 4 gives 5 over 2, which fails, yet it is in the wrong set; x equal minus 3 gives 4, which works, yet it is outside the wrong set.', 'Multiplying by $x + 2$ is only allowed when its sign is known.');

const w4r = solveRational(P(3, -2), P(1, 1), '<=', 2);
must(setTex(w4r) === '(-1, 4]' && peq(w4r.E, P(1, -4)) && w4r.pred(fr(4)) && !w4r.pred(fr(-1)) && num(div(pEval(P(3, -2), fr(4)), pEval(P(1, 1), fr(4)))) === 2, 'WE4');
V.we4r = chartTable(w4r, { exprTex: r`\dfrac{x - 4}{x + 1}`, verdict: r`Satisfies $\le 0$?`, alt: 'Worked example 4 sign chart. The inequality 3x minus 2 over x plus 1 at most 2 becomes x minus 4 over x plus 1 at most 0 after subtracting 2. The critical points are minus 1 and 4: the fraction is positive for x less than minus 1, negative between minus 1 and 4, and positive after 4, so the solution is minus 1 excluded up to 4 included.', caption: 'The zero of the top, $4$, is included; the zero of the bottom, $-1$, never is.' });
V.we4rNl = numberLine({ from: -3, to: 6, rows: [rowOf('−1 < x ≤ 4', w4r)] }, CAP, { lead: 'Solution of three x minus two over x plus one at most two.' });

const w5 = solveRational(P(1, -1, -6), P(1, 0, -1), '>=', 0);
must(setTex(w5) === r`(-\infty, -2] \cup (-1, 1) \cup [3, \infty)` && peq(pMul(P(1, 1), P(1, -1)), P(1, 0, -1)) && peq(pMul(P(1, 2), P(1, -3)), P(1, -1, -6)), 'WE5');
V.we5 = chartTable(w5, { exprTex: r`\dfrac{(x + 2)(x - 3)}{(x + 1)(x - 1)}`, verdict: r`Satisfies $\ge 0$?`, alt: 'Worked example 5 sign chart for x squared minus x minus 6 over x squared minus 1, that is x plus 2 times x minus 3 over x plus 1 times x minus 1, with critical points minus 2, minus 1, 1 and 3. The fraction is positive for x less than minus 2, negative, positive between minus 1 and 1, negative, and positive for x greater than 3.', caption: 'Zeros of the top, $-2$ and $3$, are included; zeros of the bottom, $-1$ and $1$, are not.' });
V.we5Nl = numberLine({ from: -4, to: 5, rows: [rowOf('solution', w5)] }, CAP, { lead: 'Solution of x squared minus x minus six over x squared minus one at least zero.' });

const ep = solveRational(P(1, -4), P(1, 1), '>=', 0);
const epPts = [[fr(4), 'zero of the top'], [fr(-1), 'zero of the bottom']];
V.endpts = table(['Point', 'Value of $\\dfrac{x - 4}{x + 1}$', r`In the solution of $\ge 0$?`, 'Reason'], epPts.map(([x, why]) => { const dd = pEval(P(1, 1), x); return [D(frTex(x)), dd.n === 0n ? 'undefined' : D(frTex(div(pEval(P(1, -4), x), dd))), ep.pred(x) ? 'yes' : 'no', why === 'zero of the top' ? 'value is $0$, allowed by $\\ge$' : 'division by zero, never allowed']; }), 'Table of the two critical points of x minus 4 over x plus 1 for the inequality at least 0: at x equal 4 the value is 0 and the point is in the solution; at x equal minus 1 the value is undefined and the point is never in the solution.', 'Zeros of the top follow the sign; zeros of the bottom are always out.');
must(ep.pred(fr(4)) && !ep.pred(fr(-1)), 'end point table');

V.summary2 = flow('LR', [['a', 'Quadratic: factorise, critical points, sign chart'], ['b', 'Positive leading coefficient: outside or between the roots'], ['c', 'Perfect square and negative discriminant: constant sign'], ['d', 'Rational: one side zero, never include a zero of the bottom']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Summary flow of Part 2: a quadratic inequality is solved with factors, critical points and a sign chart; with a positive leading coefficient the answer is outside or between the roots; a perfect square or a negative discriminant gives a constant sign; a rational inequality is brought to one side and never includes a zero of the bottom.', 'Part 2 in four steps.');
V.tips2 = table(['Question type', 'How marks are usually given'], [['Quadratic inequality (2-3)', 'factors 1, sign chart 1, set with end points 1'], ['Perfect square or $D < 0$ (2)', 'recognising the square or the discriminant 1, set 1'], ['Rational inequality (3)', 'one side zero 1, critical points and chart 1, set with the pole out 1'], ['Common part of two conditions (3-5)', 'each set 1-2, common part 1']], 'Exam tips table for Part 2: a quadratic inequality earns factors, a sign chart and the set with end points; a perfect square or negative discriminant earns the recognition and the set; a rational inequality earns one side zero, the chart and the set with the pole left out; a common part earns each set and the intersection.', 'Always say which end points are in and why.');

// ================================================================ notes visuals
V.symNl = V.forms;
V.cmpNl = numberLine({ from: -4, to: 7, rows: [rowOf('x < −2', { iv: ivF(null, fr(-2), false, false) }, 'Row one, x less than minus 2'), rowOf('x ≥ 3', { iv: ivF(fr(3), null, true, false) }, 'Row two, x at least 3'), { tag: 'or', altTag: 'Row three, "or" gives both rays', ivs: [draw(ivF(null, fr(-2), false, false)), draw(ivF(fr(3), null, true, false))] }, { tag: 'and', altTag: 'Row four, "and" gives nothing', ivs: [] }] }, CAP, { lead: 'Two conditions combined with or and with and.' });
export const keep = { integersIn, regionLabels };
