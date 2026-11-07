// ISC 11 Mathematics ch07 Linear and Quadratic Inequalities: multiple-choice and assertion-reason items. Every solution set is
// recomputed by the exact sign-chart solver (rat.mjs) and checked against the inequality by brute force; option values are the
// sets typed as TeX, compared with the re-solved target so exactly one option matches. Authored with the key as option (a); the
// build rotates the keys.
import { Q, mk } from './lib.mjs';
import { fr, eq, cmp, sub, mul, frTex, ivF, condTex, range, draw } from './ineq.mjs';
import { P, solvePoly, solveRational, setTex, fromRoots, peq, pMul, pEval, integersIn, S, must, r } from './rat.mjs';
import { numberLine } from './nl.mjs';
import { CAP } from './vis.mjs';

const T = (s) => `$${s}$`;
const cnt = (pred, a = -60, b = 60) => range(a, b).filter((k) => pred(fr(k))).length;
/** Interval-valued mcq: option (a) is the re-solved set (truth), the others are typed wrong-method sets. */
function setMcq(key, { stem, truth, wrong, ...o }) {
  Q(key, mk.mcq({ stem, opts: [T(truth), ...wrong.map(T)], key: 'a', ...o }), (C_) => C_.which([truth, ...wrong], truth));
}

// =============================================================== t01: linear inequalities
Q('m01', mk.mcq({ stem: r`Both sides of the true statement $-3 < 5$ are multiplied by $-2$. The statement that results is`, opts: [r`$6 > -10$`, r`$6 < -10$`, r`$-6 > 10$`, r`$-6 < 10$`], key: 'a', sol: r`Multiplying by a negative number reverses the sign: $(-3)(-2) = 6$ and $(5)(-2) = -10$, so $6 > -10$. Option (b) keeps the old sign, which makes a false statement.`, d: 1, c: 'recall', t: [1], time: 40 }),
  (C_) => { const a = -3 * -2, b = 5 * -2; C_.which(['6 > -10', '6 < -10', '-6 > 10', '-6 < 10'], `${a} ${a < b ? '<' : '>'} ${b}`); });
{
  const s = S([7, -4], '>', [2, 21]);
  setMcq('m02', { stem: r`For real $x$, the inequality $7x - 4 > 2x + 21$ is true exactly for`, truth: s.ivT, wrong: [r`(-\infty, 5)`, r`[5, \infty)`, r`(-5, \infty)`], sol: r`Collect the $x$ terms: $7x - 2x > 21 + 4$, so $5x > 25$ and $x > 5$, which is $(5, \infty)$. Option (c) includes the end point $5$, but $x = 5$ gives $31 > 31$, which is false.`, d: 2, c: 'understanding', t: [1], time: 60 });
}
{
  const s = S([-3, 11], '>=', [2, -4]);
  must(s.cond === 'x \\le 3', 'm03');
  setMcq('m03', { stem: r`Over the real numbers, the inequality $11 - 3x \ge 2x - 4$ is satisfied by exactly`, truth: s.ivT, wrong: [r`[3, \infty)`, r`(-\infty, 3)`, r`[-3, \infty)`], sol: r`Collect: $11 + 4 \ge 2x + 3x$, so $15 \ge 5x$ and $x \le 3$. Option (b) divides by the positive number $5$ but still turns the sign round; option (c) is the set for $x \ge -3$.`, d: 2, c: 'understanding', t: [1], time: 60 });
}
{
  const hold = (x) => { const v = sub(mul(fr(3), x), fr(1)); return cmp(fr(-7), v) <= 0 && cmp(v, fr(11)) < 0; };
  const n = cnt(hold);
  must(n === 6 && hold(fr(-2)) && !hold(fr(4)) && !hold(fr(-3)), 'm04 count');
  Q('m04', mk.mcq({ stem: r`The number of integers $x$ that satisfy the double inequality $-7 \le 3x - 1 < 11$ is`, opts: [T('6'), T('5'), T('7'), T('4')], key: 'a', sol: r`Add $1$ to every part: $-6 \le 3x < 12$. Divide every part by $3$: $-2 \le x < 4$. The integers are $-2, -1, 0, 1, 2, 3$, which is $6$ of them. Option (c) counts the end point $4$, which is left out.`, d: 3, c: 'application', t: [1], time: 80 }),
    (C_) => C_.which([6, 5, 7, 4], n));
}
{
  const I = ivF(fr(-2), fr(5), true, false);
  const nl = numberLine({ from: -4, to: 7, rows: [{ tag: 'solution set', ivs: [draw(I)] }] }, CAP, { lead: 'A solution set drawn on a number line.' });
  Q('m05', mk.mcq({ stem: r`The number line below shows the solution set of an inequality in the real number $x$. Which statement describes exactly this set?`, opts: [T(condTex(I)), T(r`-2 < x \le 5`), T(r`-2 \le x \le 5`), T(r`x < -2 \text{ or } x \ge 5`)], key: 'a', sol: r`The circle at $-2$ is filled, so $-2$ belongs to the set; the circle at $5$ is open, so $5$ does not. The set is $-2 \le x < 5$. Option (b) swaps the two end points.`, d: 2, c: 'understanding', t: [1], time: 60, assets: [nl] }),
    (C_) => C_.which([condTex(I), r`-2 < x \le 5`, r`-2 \le x \le 5`, r`x < -2 \text{ or } x \ge 5`], condTex(I)));
}
{
  const s = S([[1, 6], [4, 3]], '<', [0, 2]);
  const greatest = Math.max(...range(-60, 60).filter((k) => s.pred(fr(k))));
  must(s.cond === 'x < 4' && greatest === 3, 'm06');
  Q('m06', mk.mcq({ stem: r`The greatest integer that satisfies $\dfrac{2x + 1}{3} - \dfrac{x - 2}{2} < 2$ is`, opts: [T('3'), T('4'), T('2'), T('5')], key: 'a', sol: r`Multiply by $6$: $2(2x + 1) - 3(x - 2) < 12$, so $4x + 2 - 3x + 6 < 12$ and $x + 8 < 12$, giving $x < 4$. The end point $4$ is left out, so the greatest integer is $3$.`, d: 3, c: 'application', t: [1], time: 90 }),
    (C_) => C_.which([3, 4, 2, 5], greatest));
}
{
  const ks = [-4, 4, -3, 9];
  const conds = ks.map((k) => S([k, 6], '>', [0, 18]).cond);
  const hits = ks.filter((k, i) => conds[i] === 'x < -3');
  must(hits.length === 1 && hits[0] === -4, 'm07');
  Q('m07', mk.mcq({ stem: r`The inequality $kx + 6 > 18$, with $k$ a non-zero constant, has exactly the same solution set as $x < -3$. The value of $k$ is`, opts: ks.map((k) => T(String(k))), key: 'a', sol: r`$kx > 12$. The solution points to the left ($x < -3$), so the sign was reversed and $k$ is negative. Then $x < \dfrac{12}{k}$, and $\dfrac{12}{k} = -3$ gives $k = -4$. Check: $-4x + 6 > 18$ gives $-4x > 12$, so $x < -3$.`, d: 3, c: 'application', t: [1], time: 90 }),
    (C_) => C_.which(ks, hits[0]));
}

// =============================================================== t02: quadratic inequalities
Q('m08', mk.mcq({ stem: r`The inequality $(x - 4)(x + 1) < 0$ is true for exactly those real numbers $x$ that lie`, opts: ['between $-1$ and $4$', 'outside the interval from $-1$ to $4$', 'between $-4$ and $1$', 'outside the interval from $-4$ to $1$'], key: 'a', sol: r`The critical points are $-1$ and $4$. A product of two factors is negative when the factors have opposite signs, which happens only between the roots: $-1 < x < 4$.`, d: 1, c: 'recall', t: [2], time: 40 }),
  (C_) => { const s = solvePoly(fromRoots([4, -1]), '<'); C_.assert(setTex(s) === '(-1, 4)', 'between -1 and 4'); C_.key('a'); });
{
  const p = P(1, -7, 10);
  const s = solvePoly(p, '<=');
  setMcq('m09', { stem: r`The solution set of $x^2 - 7x + 10 \le 0$ is`, truth: setTex(s), wrong: [r`(-\infty, 2] \cup [5, \infty)`, r`(2, 5)`, r`[-5, -2]`], sol: r`$x^2 - 7x + 10 = (x - 2)(x - 5)$. The parabola opens upwards, so it is negative or zero between the roots, and the roots are included because of $\le$: $[2, 5]$. Option (b) is the set for $\ge 0$.`, d: 2, c: 'understanding', t: [2], time: 60 });
  must(peq(pMul(P(1, -2), P(1, -5)), p), 'm09 factors');
}
{
  const s = solvePoly(P(1, 0, -9), '>');
  setMcq('m10', { stem: r`For real $x$, the inequality $x^2 - 9 > 0$ holds for`, truth: setTex(s), wrong: [r`(-3, 3)`, r`(3, \infty)`, r`(-\infty, 3)`], sol: r`$x^2 - 9 = (x - 3)(x + 3)$, positive outside the roots $-3$ and $3$, which are left out because the inequality is strict. Option (c) forgets the negative values: $x = -5$ gives $16 > 0$.`, d: 2, c: 'understanding', t: [2], time: 60 });
}
{
  const s = solvePoly(P(-1, -1, 6), '>=');
  must(setTex(s) === '[-3, 2]' && peq(pMul(P(1, 3), P(1, -2)), P(1, 1, -6)), 'm11');
  setMcq('m11', { stem: r`The inequality $6 - x - x^2 \ge 0$ is satisfied by`, truth: setTex(s), wrong: [r`(-\infty, -3] \cup [2, \infty)`, r`[-2, 3]`, r`(-3, 2)`], sol: r`Multiply by $-1$ and reverse the sign: $x^2 + x - 6 \le 0$, that is $(x + 3)(x - 2) \le 0$. This holds between the roots, end points included: $[-3, 2]$. Option (b) does not reverse the sign.`, d: 3, c: 'application', t: [2], time: 80 });
}
{
  const s = solvePoly(pMul(P(2, -5), P(2, -5)), '<=');
  must(setTex(s) === r`\{\dfrac{5}{2}\}`, 'm12');
  setMcq('m12', { stem: r`The set of real numbers $x$ that satisfy $(2x - 5)^2 \le 0$ is`, truth: setTex(s), wrong: [r`\varnothing`, r`\mathbb{R}`, r`(-\infty, \dfrac{5}{2}]`], sol: r`A square is never negative, so $(2x - 5)^2 \le 0$ only when $(2x - 5)^2 = 0$, that is $2x - 5 = 0$ and $x = \dfrac{5}{2}$. The set has one member.`, d: 2, c: 'understanding', t: [2], time: 60 });
}
Q('m13', mk.mcq({ stem: r`For real $x$, the inequality $x^2 + 4x + 9 > 0$ is true`, opts: ['for every real number $x$', 'for no real number $x$', r`only for $x > -2$`, 'only outside the roots of $x^2 + 4x + 9 = 0$'], key: 'a', sol: r`The discriminant is $16 - 36 = -20 < 0$, so the parabola never meets the $x$-axis. It opens upwards, so it lies above the axis: the inequality is true for every real $x$. Option (d) refers to roots that do not exist.`, d: 2, c: 'understanding', t: [2], time: 60 }),
  (C_) => { const p = P(1, 4, 9); const s = solvePoly(p, '>'); C_.assert(setTex(s) === r`(-\infty, \infty)` && 16 - 36 === -20, 'all real x'); C_.key('a'); });
{
  const s = solvePoly(P(1, -2, -15), '<');
  const n = cnt(s.pred);
  must(setTex(s) === '(-3, 5)' && n === 7 && peq(pMul(P(1, 3), P(1, -5)), P(1, -2, -15)), 'm14');
  Q('m14', mk.mcq({ stem: r`How many integers $x$ satisfy $x^2 - 2x - 15 < 0$?`, opts: [T('7'), T('9'), T('8'), T('6')], key: 'a', sol: r`$x^2 - 2x - 15 = (x - 5)(x + 3) < 0$ for $-3 < x < 5$. The integers are $-2, -1, 0, 1, 2, 3, 4$: seven of them. Option (c) counts $-3$ and option (b) counts both end points, but both are left out.`, d: 3, c: 'application', t: [2], time: 80 }),
    (C_) => C_.which([7, 9, 8, 6], n));
}
{
  const ks = range(-20, 20).map((q) => fr(q, 2));
  const allReal = ks.map((k) => { const p = P(1, -4, k); const minPos = pEval(p, fr(2)).n > 0n; const gridPos = range(-60, 80).every((i) => pEval(p, fr(i, 4)).n > 0n); must(minPos === gridPos, 'm15 grid agrees with the minimum'); return minPos; });
  must(ks.every((k, i) => allReal[i] === (cmp(k, fr(4)) > 0)), 'm15 k > 4');
  Q('m15', mk.mcq({ stem: r`For which values of the constant $k$ is $x^2 - 4x + k > 0$ true for every real $x$?`, opts: [T('k > 4'), T(r`k \ge 4`), T('k < 4'), T('k > 16')], key: 'a', sol: r`The parabola opens upwards, so it stays above the axis exactly when it has no real root: $D = 16 - 4k < 0$, so $k > 4$. For $k = 4$ the expression is $(x - 2)^2$, which is $0$ at $x = 2$, so $k = 4$ is not allowed (Option (b)). Option (d) solves $D < 0$ with $\sqrt{D}$ instead.`, d: 4, c: 'analysis', t: [2], time: 100 }),
    (C_) => C_.which(['k>4', 'k>=4', 'k<4', 'k>16'], 'k>4'));
}
{
  const want = r`(-\infty, -3] \cup [2, \infty)`;
  const cand = [[P(1, 1, -6), '>='], [P(1, 1, -6), '<='], [P(1, -1, -6), '>='], [P(1, 1, -6), '>']];
  const sets = cand.map(([p, rel]) => setTex(solvePoly(p, rel)));
  must(sets.filter((x) => x === want).length === 1 && sets[0] === want, 'm16');
  Q('m16', mk.mcq({ stem: r`Which inequality in the real number $x$ has the solution set $(-\infty, -3] \cup [2, \infty)$?`, opts: [T(r`x^2 + x - 6 \ge 0`), T(r`x^2 + x - 6 \le 0`), T(r`x^2 - x - 6 \ge 0`), T(r`x^2 + x - 6 > 0`)], key: 'a', sol: r`The roots must be $-3$ and $2$ (included), and the set lies outside them, so the parabola opens upwards and the sign is $\ge$. $x^2 + x - 6 = (x + 3)(x - 2)$ has these roots. Option (b) is the set between the roots; option (c) has roots $-2$ and $3$; option (d) leaves out the roots.`, d: 3, c: 'analysis', t: [2], time: 90 }),
    (C_) => C_.which(sets, want));
}

// =============================================================== t03: rational inequalities
{
  const s = solveRational(P(1, -2), P(1, 3), '>', 0);
  setMcq('m17', { stem: r`The solution set of $\dfrac{x - 2}{x + 3} > 0$ is`, truth: setTex(s), wrong: [r`(-3, 2)`, r`(-\infty, -3] \cup [2, \infty)`, r`(2, \infty)`], sol: r`The fraction changes sign only at $-3$ and $2$. It is positive for $x < -3$ (both factors negative) and for $x > 2$ (both positive), and negative between. Both end points are left out: $-3$ makes the denominator $0$ and $2$ gives $0$, not a positive value.`, d: 2, c: 'understanding', t: [3], time: 70 });
}
{
  const s = solveRational(P(1, 1), P(1, -2), '<=', 0);
  setMcq('m18', { stem: r`For real $x \ne 2$, the inequality $\dfrac{x + 1}{x - 2} \le 0$ holds exactly for`, truth: setTex(s), wrong: [r`[-1, 2]`, r`(-1, 2)`, r`(-\infty, -1] \cup (2, \infty)`], sol: r`The fraction is negative between $-1$ and $2$ and equals $0$ at $x = -1$, which is allowed by $\le$. The point $x = 2$ makes the denominator $0$ and is never allowed: $[-1, 2)$. Option (b), $[-1, 2]$, wrongly includes $2$.`, d: 3, c: 'understanding', t: [3], time: 75 });
}
{
  const s = solveRational(P(2, -1), P(1, 4), '>=', 1);
  must(setTex(s) === r`(-\infty, -4) \cup [5, \infty)` && peq(s.E, P(1, -5)), 'm19');
  setMcq('m19', { stem: r`The solution set of $\dfrac{2x - 1}{x + 4} \ge 1$ is`, truth: setTex(s), wrong: [r`(-\infty, -4] \cup [5, \infty)`, r`[5, \infty)`, r`(-4, 5]`], sol: r`Subtract $1$: $\dfrac{2x - 1 - (x + 4)}{x + 4} = \dfrac{x - 5}{x + 4} \ge 0$. The critical points are $-4$ and $5$; the fraction is positive for $x < -4$ and $x > 5$. Include $5$ (value $0$), exclude $-4$ (denominator $0$).`, d: 3, c: 'application', t: [3], time: 90 });
}
{
  const s = solveRational(P(3), P(1, -1), '<', 2);
  must(setTex(s) === r`(-\infty, 1) \cup (\dfrac{5}{2}, \infty)` && peq(s.E, P(-2, 5)), 'm20');
  setMcq('m20', { stem: r`The inequality $\dfrac{3}{x - 1} < 2$ is true for exactly`, truth: setTex(s), wrong: [r`(1, \dfrac{5}{2})`, r`(-\infty, \dfrac{5}{2})`, r`(\dfrac{5}{2}, \infty)`], sol: r`Move $2$ across: $\dfrac{3 - 2(x - 1)}{x - 1} = \dfrac{5 - 2x}{x - 1} < 0$, that is $\dfrac{2x - 5}{x - 1} > 0$. This is positive for $x < 1$ and for $x > \dfrac{5}{2}$. Option (d) multiplies by $x - 1$ as if it were positive and misses $x < 1$: $x = 0$ gives $-3 < 2$, which is true.`, d: 4, c: 'application', t: [3], time: 100 });
}
{
  const s = solveRational(P(3, 1), P(1, -6), '>=', 2);
  const vals = [fr(6), fr(-13), fr(7), fr(-20)];
  const member = vals.map((x) => s.pred(x));
  must(setTex(s) === r`(-\infty, -13] \cup (6, \infty)` && member.join() === 'false,true,true,true', 'm21');
  Q('m21', mk.mcq({ stem: r`Which of these values of $x$ can never be in the solution set of $\dfrac{3x + 1}{x - 6} \ge 2$?`, opts: [T('6'), T('-13'), T('7'), T('-20')], key: 'a', sol: r`Subtract $2$: $\dfrac{x + 13}{x - 6} \ge 0$, with solution set $(-\infty, -13] \cup (6, \infty)$. The value $x = 6$ makes the denominator $0$, so it is excluded whatever the inequality says. The others are in the set: $-13$ gives $0$, $7$ gives $22$ and $-20$ gives $\dfrac{59}{26}$.`, d: 3, c: 'application', t: [3], time: 80 }),
    (C_) => { C_.which(member, false); C_.assert(eq(pEval(P(3, 1), fr(7)), fr(22)) && cmp(fr(59, 26), fr(2)) >= 0, 'values'); });
}
{
  const s = solveRational(P(1, 0, -4), P(1, 0, -1), '>', 0);
  must(setTex(s) === r`(-\infty, -2) \cup (-1, 1) \cup (2, \infty)`, 'm22');
  setMcq('m22', { stem: r`The solution set of $\dfrac{x^2 - 4}{x^2 - 1} > 0$ is`, truth: setTex(s), wrong: [r`(-2, -1) \cup (1, 2)`, r`(-\infty, -2] \cup (-1, 1) \cup [2, \infty)`, r`(-\infty, -2) \cup (2, \infty)`], sol: r`Write the fraction as $\dfrac{(x + 2)(x - 2)}{(x + 1)(x - 1)}$ with critical points $-2, -1, 1, 2$. It is positive for $x < -2$, negative on $(-2, -1)$, positive on $(-1, 1)$, negative on $(1, 2)$ and positive for $x > 2$. Every critical point is left out (strict sign; the denominator is zero at $\pm 1$).`, d: 3, c: 'application', t: [3], time: 100 });
}

// =============================================================== assertion-reason
Q('ar1', mk.ar({ a: r`For every real number $x$, the inequality $x^2 - 6x + 9 \ge 0$ is true.`, r: r`$x^2 - 6x + 9 = (x - 3)^2$, and the square of a real number is never negative.`, key: 'a', sol: r`$(x - 3)^2 \ge 0$ for all real $x$ because a square is never negative, and $x^2 - 6x + 9$ is exactly $(x - 3)^2$. Both statements are true and (R) explains (A).`, d: 2, c: 'understanding', t: [2], time: 60 }),
  (C_) => { const s = solvePoly(P(1, -6, 9), '>='); C_.assert(setTex(s) === r`(-\infty, \infty)` && peq(fromRoots([3, 3]), P(1, -6, 9)), 'all reals'); C_.key('a'); });
Q('ar2', mk.ar({ a: r`The solution set of $4 - x \ge 1$ over the real numbers is $(-\infty, 3]$.`, r: r`On a number line, an end point drawn as a filled circle belongs to the solution set.`, key: 'b', sol: r`$4 - x \ge 1$ gives $-x \ge -3$ and $x \le 3$, so (A) is true. (R) is also a true statement about number lines, but it does not explain why the solution is $x \le 3$ (that comes from reversing the sign when dividing by $-1$). Both true, (R) not the explanation.`, d: 2, c: 'understanding', t: [1], time: 70 }),
  (C_) => { const s = S([-1, 4], '>=', [0, 1]); C_.assert(s.ivT === r`(-\infty, 3]`, 'x <= 3'); C_.key('b'); });
Q('ar3', mk.ar({ a: r`For real $x$, the inequality $x^2 + x + 5 > 0$ is true for every $x$.`, r: r`A quadratic expression with a positive leading coefficient is positive for every real $x$.`, key: 'c', sol: r`The discriminant is $1 - 20 = -19 < 0$, so $x^2 + x + 5$ never reaches $0$ and is always positive: (A) is true. (R) is false in general: $x^2 - 1$ has a positive leading coefficient but is negative at $x = 0$.`, d: 3, c: 'analysis', t: [2], time: 80 }),
  (C_) => { const s = solvePoly(P(1, 1, 5), '>'); const g = solvePoly(P(1, 0, -1), '>'); C_.assert(setTex(s) === r`(-\infty, \infty)` && 1 - 20 === -19 && !g.pred(fr(0)), 'A true, R false'); C_.key('c'); });
Q('ar4', mk.ar({ a: r`The inequality $\dfrac{2x - 3}{x + 1} \ge 2$ is equivalent to $2x - 3 \ge 2(x + 1)$.`, r: r`Multiplying both sides of an inequality by an expression whose sign is not known need not preserve the inequality.`, key: 'd', sol: r`(A) is false: $2x - 3 \ge 2x + 2$ reduces to $-3 \ge 2$, which is false for every $x$, yet $\dfrac{2x - 3}{x + 1} \ge 2$ is true for $x < -1$ (for example $x = -2$ gives $7 \ge 2$). The correct way is $\dfrac{-5}{x + 1} \ge 0$, so $x < -1$. (R) is true; it is exactly why (A) fails.`, d: 3, c: 'analysis', t: [3], time: 90 }),
  (C_) => { const s = solveRational(P(2, -3), P(1, 1), '>=', 2); C_.assert(setTex(s) === r`(-\infty, -1)` && s.pred(fr(-2)) && !S([2, -3], '>=', [2, 2]).pred(fr(-2)), 'A false'); C_.key('d'); });
Q('ar5', mk.ar({ a: r`The solution set of $4 - x^2 \ge 0$ over the real numbers is $[-2, 2]$.`, r: r`$4 - x^2 \ge 0$ is equivalent to $x^2 - 4 \le 0$, and $x^2 - 4 = (x - 2)(x + 2)$ is negative or zero between its roots.`, key: 'a', sol: r`Multiplying by $-1$ reverses the sign, so $4 - x^2 \ge 0$ is $x^2 - 4 \le 0$. The parabola $x^2 - 4$ opens upwards and is $\le 0$ between its roots $-2$ and $2$, end points included. Both statements are true and (R) explains (A).`, d: 2, c: 'understanding', t: [2], time: 70 }),
  (C_) => { const s = solvePoly(P(-1, 0, 4), '>='); const s2 = solvePoly(P(1, 0, -4), '<='); C_.assert(setTex(s) === '[-2, 2]' && setTex(s2) === '[-2, 2]', 'same set'); C_.key('a'); });
Q('ar6', mk.ar({ a: r`The solution set of $(x - 5)^2 > 0$ over the real numbers is every real number except $5$.`, r: r`The number $5$ is a root of the equation $x^2 - 10x + 25 = 0$.`, key: 'b', sol: r`$(x - 5)^2$ is positive for every $x \ne 5$ and $0$ at $x = 5$, so (A) is true. (R) is true as well, since $x^2 - 10x + 25 = (x - 5)^2$, but it only names the root; it does not say why the expression keeps a positive sign on both sides of $5$ (a perfect square never changes sign). Both true, (R) not the explanation.`, d: 3, c: 'analysis', t: [2], time: 80 }),
  (C_) => { const s = solvePoly(fromRoots([5, 5]), '>'); C_.assert(setTex(s) === r`(-\infty, 5) \cup (5, \infty)` && peq(fromRoots([5, 5]), P(1, -10, 25)), 'A and R true'); C_.key('b'); });
