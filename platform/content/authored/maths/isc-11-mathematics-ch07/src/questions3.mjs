// ISC 11 Mathematics ch07: 3-mark short-answer and 5-mark long-answer items (set in parts). The sets in the model answers are
// interpolated from the exact sign-chart solver (rat.mjs) and re-checked by brute force there.
import { Q, mk } from './lib.mjs';
import { fr, eq, cmp, add, sub, mul, frTex, range, andIv, ivF, ivTex } from './ineq.mjs';
import { P, solvePoly, solveRational, setTex, fromRoots, peq, pMul, pEval, integersIn, S, must, r } from './rat.mjs';

// =============================================================== short answer, 3 marks
{
  const p = P(2, 1, -6), s = solvePoly(p, '>=');
  must(peq(pMul(P(2, -3), P(1, 2)), p) && setTex(s) === r`(-\infty, -2] \cup [\dfrac{3}{2}, \infty)`, 's301');
  Q('s301', mk.short({ marks: 3, stem: r`Solve $2x^2 + x - 6 \ge 0$ for real $x$, using a sign chart, and write the solution set in interval form.`, model: r`Factorise: $2x^2 + x - 6 = (2x - 3)(x + 2)$. The critical points are $x = -2$ and $x = \dfrac{3}{2}$. Sign chart: for $x < -2$ both factors are negative, so the product is positive; for $-2 < x < \dfrac{3}{2}$ the product is negative; for $x > \dfrac{3}{2}$ both factors are positive, so the product is positive. The inequality is $\ge 0$, so we take the positive regions and include both end points. The solution set is $${setTex(s)}$.`, sol: r`Factorise, mark the critical points, read the signs.`, scheme: [[r`Factorise $(2x - 3)(x + 2)$`, 1], ['Critical points and sign of each region', 1], ['Regions with both end points: the set', 1]], d: 3, c: 'application', t: [2], time: 130 }),
    (C_) => C_.model([setTex(s), 3, 2]));
}
{
  const p = P(-1, -2, 15), s = solvePoly(p, '>');
  must(setTex(s) === '(-5, 3)' && peq(pMul(P(1, 5), P(1, -3)), P(1, 2, -15)), 's302');
  Q('s302', mk.short({ marks: 3, stem: r`Find all real $x$ for which $15 - 2x - x^2 > 0$.`, model: r`Multiply by $-1$ and reverse the sign: $x^2 + 2x - 15 < 0$. Factorise: $(x + 5)(x - 3) < 0$. The roots are $-5$ and $3$. The parabola $x^2 + 2x - 15$ opens upwards, so it is negative between the roots. The inequality is strict, so the end points are left out. The solution set is $${setTex(s)}$, that is $-5 < x < 3$.`, sol: r`Make the leading coefficient positive first.`, scheme: [[r`Rewrite as $x^2 + 2x - 15 < 0$ (sign reversed)`, 1], [r`Factorise and find the roots $-5$ and $3$`, 1], [r`Between the roots: $(-5, 3)$`, 1]], d: 3, c: 'application', t: [2], time: 120 }),
    (C_) => C_.model([setTex(s), -5, 3]));
}
{
  const s = solveRational(P(4, 1), P(1, -3), '<=', 3);
  must(setTex(s) === '[-10, 3)' && peq(s.E, P(1, 10)), 's303');
  Q('s303', mk.short({ marks: 3, stem: r`Solve $\dfrac{4x + 1}{x - 3} \le 3$ for real $x$ and state which end points are included.`, model: r`Subtract $3$: $\dfrac{4x + 1 - 3(x - 3)}{x - 3} = \dfrac{x + 10}{x - 3} \le 0$. The critical points are $-10$ (top zero) and $3$ (bottom zero). The fraction is negative between them. At $x = -10$ the value is $0$, allowed by $\le$, so $-10$ is included. At $x = 3$ the denominator is $0$, so $3$ is excluded. The solution set is $${setTex(s)}$.`, sol: r`One side zero, sign chart, pole excluded.`, scheme: [[r`Reduce to $\dfrac{x + 10}{x - 3} \le 0$`, 1], ['Critical points and sign chart', 1], ['Set $[-10, 3)$ with the reason for each end point', 1]], d: 3, c: 'application', t: [3], time: 130 }),
    (C_) => C_.model([setTex(s), 10, 3]));
}
{
  const s = solveRational(P(1, -2), P(1, 1), '<=', 4);
  must(setTex(s) === r`(-\infty, -2] \cup (-1, \infty)` && peq(s.E, P(-3, -6)), 's304');
  Q('s304', mk.short({ marks: 3, stem: r`Solve $\dfrac{x - 2}{x + 1} \le 4$ for real $x \ne -1$.`, model: r`Subtract $4$: $\dfrac{x - 2 - 4(x + 1)}{x + 1} = \dfrac{-3x - 6}{x + 1} \le 0$. Dividing by $-3$ reverses the sign: $\dfrac{x + 2}{x + 1} \ge 0$. The critical points are $-2$ and $-1$. The fraction is positive for $x < -2$ and for $x > -1$, and zero at $x = -2$ (included). The point $-1$ makes the denominator $0$ (excluded). The solution set is $${setTex(s)}$.`, sol: r`Reverse the sign when removing the factor $-3$.`, scheme: [[r`Reduce to $\dfrac{-3x - 6}{x + 1} \le 0$ and then $\dfrac{x + 2}{x + 1} \ge 0$`, 1], ['Critical points and signs', 1], [r`Set, with $-2$ in and $-1$ out`, 1]], d: 4, c: 'application', t: [3], time: 140 }),
    (C_) => C_.model([setTex(s), -3, 4]));
}
{
  const a = solvePoly(P(1, -5, 4), '<'), b = S([2, -3], '>=', [0, 1]);
  const common = andIv(a.ivs[0], b.iv);
  must(setTex(a) === '(1, 4)' && b.cond === 'x \\ge 2' && ivTex(common) === '[2, 4)', 's305');
  Q('s305', mk.short({ marks: 3, stem: r`Find the values of the real number $x$ that satisfy both $x^2 - 5x + 4 < 0$ and $2x - 3 \ge 1$, and show the common part on a number line in words.`, model: r`First: $x^2 - 5x + 4 = (x - 1)(x - 4) < 0$ gives $1 < x < 4$. Second: $2x \ge 4$ gives $x \ge 2$. Both must hold, so we take the common part of $(1, 4)$ and $[2, \infty)$, which is $${ivTex(common)}$. On the number line: a filled circle at $2$, an open circle at $4$, and the line between them shaded.`, sol: r`Solve each condition, then intersect.`, scheme: [['First condition: $(1, 4)$', 1], ['Second condition: $x \\ge 2$', 1], ['Common part $[2, 4)$ and its description', 1]], d: 3, c: 'application', t: [1, 2], time: 130 }),
    (C_) => C_.model([ivTex(common), 2, 4]));
}
{
  // a x^2 + 8x + 2 > 0 for every real x: a > 0 and 64 - 8a < 0, i.e. a > 8
  const holds = (a) => { const p = P(a, 8, 2); const vertex = fr(-8, 2 * a); return a > 0 && pEval(p, vertex).n > 0n; };
  const grid = (a) => range(-120, 120).every((i) => pEval(P(a, 8, 2), fr(i, 8)).n > 0n);
  const as = range(-6, 14).filter((a) => a !== 0);
  must(as.every((a) => holds(a) === grid(a)) && as.filter(holds).join() === '9,10,11,12,13,14' && !holds(8) && !grid(8) === true, 's306');
  Q('s306', mk.short({ marks: 3, stem: r`Find all the values of the constant $a$ for which $ax^2 + 8x + 2 > 0$ holds for every real number $x$.`, model: r`For a quadratic to stay positive for every $x$ it must open upwards, so $a > 0$, and it must have no real root, so the discriminant is negative: $D = 8^2 - 4(a)(2) = 64 - 8a < 0$, which gives $a > 8$. Both conditions hold exactly when $a > 8$. Check: $a = 8$ gives $8x^2 + 8x + 2 = 2(2x + 1)^2$, which is $0$ at $x = -\dfrac{1}{2}$, so $a = 8$ is not allowed.`, sol: r`Two conditions: upward parabola and negative discriminant.`, scheme: [[r`Opens upwards: $a > 0$`, 1], [r`$D = 64 - 8a < 0$, so $a > 8$`, 1], [r`Combine and check $a = 8$ fails`, 1]], d: 4, c: 'analysis', t: [2], time: 150 }),
    (C_) => C_.model([64, 8, 2]));
}
{
  const s = solveRational(pMul(P(1, -2), P(1, -3)), P(1, 1), '>=', 0);
  must(setTex(s) === r`(-1, 2] \cup [3, \infty)`, 's307');
  Q('s307', mk.short({ marks: 3, stem: r`Solve $\dfrac{(x - 2)(x - 3)}{x + 1} \ge 0$ for real $x \ne -1$.`, model: r`The critical points are $-1$, $2$ and $3$. Sign of the fraction: for $x < -1$ all three factors are negative, so it is negative; for $-1 < x < 2$ the bottom is positive and both top factors are negative, so it is positive; for $2 < x < 3$ it is negative; for $x > 3$ it is positive. We need $\ge 0$, so include the zeros $2$ and $3$ but not $-1$. The solution set is $${setTex(s)}$.`, sol: r`Three critical points give four regions.`, scheme: [['Critical points $-1$, $2$, $3$', 1], ['Signs in the four regions', 1], ['Set with the zeros in and the pole out', 1]], d: 3, c: 'application', t: [3], time: 140 }),
    (C_) => C_.model([setTex(s), -1, 2, 3]));
}
{
  const s = solvePoly(P(1, -20, 96), '<=');
  must(setTex(s) === '[8, 12]' && peq(pMul(P(1, -8), P(1, -12)), P(1, -20, 96)) && eq(pEval(P(-1, 20, 0), fr(8)), fr(96)) && eq(pEval(P(-1, 20, 0), fr(12)), fr(96)), 's308');
  Q('s308', mk.short({ marks: 3, stem: r`An imagined farmer fences a rectangular plot with $40$ m of wire, using all of it. If the length is $x$ m, find the possible values of $x$ for the area to be at least $96$ square metres.`, model: r`The perimeter is $40$ m, so length plus breadth is $20$ m and the breadth is $(20 - x)$ m. The area is $x(20 - x)$, and we need $x(20 - x) \ge 96$, that is $x^2 - 20x + 96 \le 0$. Factorise: $(x - 8)(x - 12) \le 0$, true between the roots. So $${setTex(s)}$: the length lies between $8$ m and $12$ m, end points included.`, sol: r`Breadth is $20 - x$; area inequality gives a quadratic.`, scheme: [[r`Breadth $20 - x$ and area inequality $x(20 - x) \ge 96$`, 1], [r`Rewrite $x^2 - 20x + 96 \le 0$ and factorise`, 1], [r`Between the roots: $8 \le x \le 12$`, 1]], d: 3, c: 'application', t: [2], time: 140 }),
    (C_) => C_.model([setTex(s), 96, 8, 12]));
}
{
  const s = solveRational(pMul(P(1, -1), P(1, -1)), P(1, 2), '<=', 0);
  must(setTex(s) === r`(-\infty, -2) \cup \{1\}` && s.pred(fr(1)) && !s.pred(fr(0)) && s.pred(fr(-3)), 's309');
  Q('s309', mk.short({ marks: 3, stem: r`Solve $\dfrac{(x - 1)^2}{x + 2} \le 0$ for real $x \ne -2$, and explain why one isolated value belongs to the solution set.`, model: r`The top $(x - 1)^2$ is never negative, so the sign of the fraction is the sign of $x + 2$ whenever $x \ne 1$. For $x < -2$ the bottom is negative, so the fraction is negative and satisfies $\le 0$. For $x > -2$ and $x \ne 1$ the fraction is positive. At $x = 1$ the top is $0$, so the value is $0$, which is allowed by $\le$. The point $-2$ is excluded (denominator $0$). The solution set is $${setTex(s)}$; the value $1$ belongs because the fraction is $0$ there although it is positive on both sides.`, sol: r`A square factor does not change the sign but still gives a zero.`, scheme: [[r`Sign follows $x + 2$ for $x \ne 1$: negative for $x < -2$`, 1], [r`$x = 1$ gives value $0$, allowed`, 1], [r`Set $(-\infty, -2) \cup \{1\}$ with $-2$ excluded`, 1]], d: 4, c: 'analysis', t: [2, 3], time: 150 }),
    (C_) => C_.model([setTex(s), 1, -2]));
}
{
  const s = solveRational(P(1, 1), P(1, -2), '>=', 2);
  must(setTex(s) === '(2, 5]' && peq(s.E, P(-1, 5)) && !s.pred(fr(2)) && s.pred(fr(5)), 's310');
  const wrong = S([1, 1], '>=', [2, -4]);
  must(wrong.cond === 'x \\le 5' && wrong.pred(fr(1)) && !s.pred(fr(1)) && eq(pEval(P(1, 1), fr(1)), fr(2)), 's310 wrong set');
  Q('s310', mk.short({ marks: 3, stem: r`Aman solves $\dfrac{x + 1}{x - 2} \ge 2$ by multiplying both sides by $x - 2$ to get $x + 1 \ge 2x - 4$, and answers $x \le 5$. Show with a test value that his answer is wrong, and give the correct solution set.`, model: r`Take $x = 1$, which is in his set $x \le 5$. Then $\dfrac{x + 1}{x - 2} = \dfrac{2}{-1} = -2$, and $-2 \ge 2$ is false, so his answer is wrong. He multiplied by $x - 2$ without knowing its sign. Correct method: $\dfrac{x + 1}{x - 2} - 2 = \dfrac{5 - x}{x - 2} \ge 0$, that is $\dfrac{x - 5}{x - 2} \le 0$. The critical points are $2$ (excluded) and $5$ (included), and the fraction is negative between them. The solution set is $${setTex(s)}$.`, sol: r`Test a value from the claimed set; then use one side zero.`, scheme: [[r`Test $x = 1$: value $-2$, not $\ge 2$`, 1], [r`Correct reduction $\dfrac{x - 5}{x - 2} \le 0$`, 1], [r`Set $(2, 5]$ with reasons for the end points`, 1]], d: 3, c: 'analysis', t: [3], time: 150 }),
    (C_) => C_.model([setTex(s), -2, 5, 2]));
}
{
  const p = P(1, -3, -10), s = solvePoly(p, '<=');
  must(setTex(s) === '[-2, 5]' && peq(fromRoots([-2, 5]), p), 's311');
  Q('s311', mk.short({ marks: 3, stem: r`The solution set of $x^2 + px + q \le 0$ over the real numbers is the closed interval $[-2, 5]$. Find the numbers $p$ and $q$.`, model: r`A quadratic with leading coefficient $1$ is $\le 0$ between its roots, so the roots are $x = -2$ and $x = 5$. Then $x^2 + px + q = (x + 2)(x - 5) = x^2 - 3x - 10$. Comparing coefficients, $p = -3$ and $q = -10$. Check with $x = 0$: $-10 \le 0$ is true, while $x = 6$ gives $36 - 18 - 10 = 8 > 0$.`, sol: r`The end points of the interval are the roots.`, scheme: [['The roots are $-2$ and $5$', 1], [r`Expand $(x + 2)(x - 5)$`, 1], [r`$p = -3$, $q = -10$ with a check`, 1]], d: 3, c: 'application', t: [2], time: 120 }),
    (C_) => C_.model([-3, -10, 36 - 18 - 10]));
}

// =============================================================== long answer, 5 marks (in parts)
{
  const p = P(2, -7, -4), s = solvePoly(p, '<=');
  const ints = integersIn(s);
  const sum = ints.reduce((a, b) => a + b, 0);
  must(setTex(s) === r`[-\dfrac{1}{2}, 4]` && peq(pMul(P(2, 1), P(1, -4)), p) && ints.join() === '0,1,2,3,4' && sum === 10, 'l01');
  Q('l01', mk.long({ marks: 5, stem: r`Answer both parts.\n\n(a) Solve $2x^2 - 7x - 4 \le 0$ for real $x$, using a sign chart. [3]\n\n(b) List the integers that satisfy the inequality and find their sum. [2]`, model: r`(a) Factorise: $2x^2 - 7x - 4 = (2x + 1)(x - 4)$. The critical points are $x = -\dfrac{1}{2}$ and $x = 4$. Sign chart: for $x < -\dfrac{1}{2}$ both factors are negative, so the product is positive; between the points the product is negative; for $x > 4$ both factors are positive. We need $\le 0$, so we take the middle region with both end points. The solution set is $${setTex(s)}$.\n\n(b) The integers in $-\dfrac{1}{2} \le x \le 4$ are $0, 1, 2, 3, 4$. Their sum is $0 + 1 + 2 + 3 + 4 = 10$.`, sol: r`Part (a) is a sign chart; part (b) lists the integers inside the closed interval.`, scheme: [[r`Factorise $(2x + 1)(x - 4)$ and find the critical points`, 1], ['Sign chart showing the middle region is negative', 1], [r`Set $[-\dfrac{1}{2}, 4]$ with both end points`, 1], ['Integers $0, 1, 2, 3, 4$', 1], ['Sum $10$', 1]], d: 3, c: 'application', t: [2], time: 240 }),
    (C_) => C_.model([setTex(s), 10, 4]));
}
{
  const s = solvePoly(P(1, -6, 8), '<=');
  const none = P(1, -6, 10);
  const dd = 36 - 40;
  must(setTex(s) === '[2, 4]' && eq(pEval(P(-5, 30, 0), fr(2)), fr(40)) && eq(pEval(P(-5, 30, 0), fr(4)), fr(40)) && eq(pEval(P(-5, 30, 0), fr(3)), fr(45)) && dd === -4 && range(-80, 120).every((i) => pEval(none, fr(i, 8)).n > 0n), 'l02');
  Q('l02', mk.long({ marks: 5, stem: r`In an imagined demonstration, a model rocket has height $h = 30t - 5t^2$ metres at time $t$ seconds, for $0 \le t \le 6$.\n\n(a) For which values of $t$ is the rocket at least $40$ m above the ground? [3]\n\n(b) Show that the rocket never reaches a height of $50$ m. [2]`, model: r`(a) We need $30t - 5t^2 \ge 40$, so $5t^2 - 30t + 40 \le 0$, that is $t^2 - 6t + 8 \le 0$. Factorise: $(t - 2)(t - 4) \le 0$, which holds between the roots, end points included. So the rocket is at least $40$ m high for $${setTex(s)}$: from $t = 2$ s to $t = 4$ s.\n\n(b) A height of at least $50$ m needs $30t - 5t^2 \ge 50$, that is $t^2 - 6t + 10 \le 0$. The discriminant is $36 - 40 = -4 < 0$, so $t^2 - 6t + 10$ has no real root and, with leading coefficient $1$, is always positive. So $t^2 - 6t + 10 \le 0$ has no solution and the height never reaches $50$ m. (The greatest height is $45$ m, at $t = 3$.)`, sol: r`Both parts reduce to a quadratic inequality in $t$.`, scheme: [[r`Form $t^2 - 6t + 8 \le 0$`, 1], [r`Factorise and solve: $2 \le t \le 4$`, 1], ['Interpret: from $2$ s to $4$ s', 1], [r`Form $t^2 - 6t + 10 \le 0$ and find $D = -4$`, 1], ['Conclude no solution (positive leading coefficient)', 1]], d: 4, c: 'analysis', t: [2], time: 260 }),
    (C_) => C_.model([setTex(s), -4, 45, 50]));
}
{
  const a = solveRational(P(3, 1), P(1, -2), '<', 1);
  const b = S([4, -3], '>=', [0, -5]);
  const common = andIv(a.ivs[0], b.iv);
  must(setTex(a) === r`(-\dfrac{3}{2}, 2)` && peq(a.E, P(2, 3)) && b.cond === 'x \\ge -\\dfrac{1}{2}' && ivTex(common) === r`[-\dfrac{1}{2}, 2)`, 'l03');
  Q('l03', mk.long({ marks: 5, stem: r`Answer both parts.\n\n(a) Solve $\dfrac{3x + 1}{x - 2} < 1$ for real $x \ne 2$. [3]\n\n(b) Find the real numbers $x$ that satisfy both $\dfrac{3x + 1}{x - 2} < 1$ and $4x - 3 \ge -5$. [2]`, model: r`(a) Subtract $1$: $\dfrac{3x + 1 - (x - 2)}{x - 2} = \dfrac{2x + 3}{x - 2} < 0$. The critical points are $-\dfrac{3}{2}$ and $2$. The fraction is negative when the top and bottom have opposite signs, that is between them. The strict sign leaves out both end points, and $2$ is excluded anyway. The solution set is $${setTex(a)}$.\n\n(b) The second inequality gives $4x \ge -2$, so $x \ge -\dfrac{1}{2}$. The common part of $(-\dfrac{3}{2}, 2)$ and $[-\dfrac{1}{2}, \infty)$ is $${ivTex(common)}$.`, sol: r`Part (a) needs one side zero; part (b) is a common part.`, scheme: [[r`Reduce to $\dfrac{2x + 3}{x - 2} < 0$`, 1], ['Critical points and sign chart', 1], [r`Set $(-\dfrac{3}{2}, 2)$`, 1], [r`Second inequality: $x \ge -\dfrac{1}{2}$`, 1], [r`Common part $[-\dfrac{1}{2}, 2)$`, 1]], d: 3, c: 'application', t: [3, 1], time: 260 }),
    (C_) => C_.model([setTex(a), ivTex(common), 3]));
}
{
  // x^2 - 2kx + 3k + 4 > 0 for all real x  <=>  k^2 - 3k - 4 < 0  <=>  -1 < k < 4
  const kset = solvePoly(P(1, -3, -4), '<');
  const allPos = (k) => range(-160, 200).every((i) => pEval(P(1, mul(fr(-2), k), add(mul(fr(3), k), fr(4))), fr(i, 8)).n > 0n);
  const ks = range(-40, 60).map((q) => fr(q, 8));
  must(setTex(kset) === '(-1, 4)' && peq(pMul(P(1, 1), P(1, -4)), P(1, -3, -4)) && ks.every((k) => allPos(k) === kset.pred(k)) && eq(pEval(P(1, -10, 19), fr(5)), fr(-6)) && eq(pEval(P(1, 0, 4), fr(0)), fr(4)), 'l04');
  Q('l04', mk.long({ marks: 5, stem: r`The quadratic $x^2 - 2kx + 3k + 4$ has a constant $k$.\n\n(a) State the condition on the discriminant for $x^2 - 2kx + 3k + 4 > 0$ to hold for every real $x$. [1]\n\n(b) Hence find the set of values of $k$. [3]\n\n(c) Verify your answer by testing $k = 0$ and $k = 5$. [1]`, model: r`(a) The parabola opens upwards, so the expression is positive for every real $x$ exactly when it has no real root: $D < 0$.\n\n(b) $D = (-2k)^2 - 4(1)(3k + 4) = 4k^2 - 12k - 16 < 0$, so $k^2 - 3k - 4 < 0$. Factorise: $(k + 1)(k - 4) < 0$, which holds between the roots. So $${setTex(kset)}$, that is $-1 < k < 4$.\n\n(c) For $k = 0$ the expression is $x^2 + 4$, which is positive for all real $x$, as predicted since $0$ is in $(-1, 4)$. For $k = 5$ it is $x^2 - 10x + 19$, which equals $25 - 50 + 19 = -6 < 0$ at $x = 5$, as predicted since $5$ is outside the set.`, sol: r`Negative discriminant, then a quadratic inequality in $k$.`, scheme: [[r`Condition $D < 0$ with the reason`, 1], [r`$D = 4k^2 - 12k - 16$ and $k^2 - 3k - 4 < 0$`, 1], [r`Factorise $(k + 1)(k - 4) < 0$`, 1], [r`Set $-1 < k < 4$`, 1], [r`Check $k = 0$ and $k = 5$ (value $-6$ at $x = 5$)`, 1]], d: 4, c: 'analysis', t: [2], time: 280 }),
    (C_) => C_.model([setTex(kset), -16, -6, 4]));
}
{
  const a = solvePoly(P(1, -1, -12), '<='), b = solveRational(P(1, 1), P(1, -6), '<', 0);
  const common = andIv(a.ivs[0], b.ivs[0]);
  must(setTex(a) === '[-3, 4]' && peq(pMul(P(1, 3), P(1, -4)), P(1, -1, -12)) && setTex(b) === '(-1, 6)' && ivTex(common) === '(-1, 4]', 'l05');
  Q('l05', mk.long({ marks: 5, stem: r`Consider the two conditions on a real number $x$: $x^2 - x - 12 \le 0$ and $\dfrac{x + 1}{x - 6} < 0$.\n\n(a) Solve the first condition. [2]\n\n(b) Solve the second condition. [2]\n\n(c) Write the set of $x$ satisfying both conditions. [1]`, model: r`(a) $x^2 - x - 12 = (x + 3)(x - 4) \le 0$, true between the roots with both included: $${setTex(a)}$.\n\n(b) The critical points are $-1$ and $6$. The fraction is negative when its top and bottom have opposite signs, that is for $-1 < x < 6$. Both end points are excluded: $${setTex(b)}$.\n\n(c) The common part of $[-3, 4]$ and $(-1, 6)$ is $${ivTex(common)}$: $-1$ is out because the second condition is strict, and $4$ is in because both conditions allow it.`, sol: r`Solve each condition separately, then take the common part.`, scheme: [[r`Factorise $(x + 3)(x - 4)$`, 1], [r`Set $[-3, 4]$`, 1], ['Critical points $-1$ and $6$ with signs', 1], [r`Set $(-1, 6)$`, 1], [r`Common part $(-1, 4]$`, 1]], d: 3, c: 'application', t: [2, 3], time: 260 }),
    (C_) => C_.model([setTex(a), setTex(b), ivTex(common)]));
}
{
  const s = solvePoly(P(1, -4, -12), '>=');
  const stu = (x) => cmp(x, fr(12)) >= 0 || cmp(add(x, fr(-4)), fr(12)) >= 0;
  const holds = (x) => cmp(sub(mul(x, x), mul(fr(4), x)), fr(12)) >= 0;
  must(setTex(s) === r`(-\infty, -2] \cup [6, \infty)` && peq(pMul(P(1, 2), P(1, -6)), P(1, -4, -12)) && holds(fr(7)) && !stu(fr(7)) && holds(fr(-3)) && !stu(fr(-3)) && eq(sub(mul(fr(7), fr(7)), mul(fr(4), fr(7))), fr(21)), 'l06');
  Q('l06', mk.long({ marks: 5, stem: r`A student solves $x^2 - 4x \ge 12$ as follows: "$x(x - 4) \ge 12$, so $x \ge 12$ or $x - 4 \ge 12$."\n\n(a) Explain the error in this method. [1]\n\n(b) Solve $x^2 - 4x \ge 12$ correctly. [3]\n\n(c) Show with a number that the student's answer misses part of the solution. [1]`, model: r`(a) The factor method is only valid when the product is compared with $0$. If $ab \ge 12$ it does not follow that $a \ge 12$ or $b \ge 12$ (for example $3 \times 5 = 15 \ge 12$ with both factors below $12$).\n\n(b) Move everything to one side: $x^2 - 4x - 12 \ge 0$. Factorise: $(x + 2)(x - 6) \ge 0$. The critical points are $-2$ and $6$. The product is positive outside the roots and zero at them, so the solution set is $${setTex(s)}$.\n\n(c) The student's answer is $x \ge 12$ (the second case $x \ge 16$ adds nothing). Take $x = 7$: $7^2 - 4(7) = 21 \ge 12$ is true, but $7$ is not in the student's set. Also $x = -3$ gives $9 + 12 = 21 \ge 12$.`, sol: r`Always compare with zero before factorising.`, scheme: [['Error: factor method needs the right side $0$', 1], [r`Rewrite as $(x + 2)(x - 6) \ge 0$`, 1], ['Critical points and signs', 1], [r`Set $(-\infty, -2] \cup [6, \infty)$`, 1], [r`Counterexample $x = 7$ or $x = -3$ (value $21$)`, 1]], d: 4, c: 'evaluation', t: [2], time: 280 }),
    (C_) => C_.model([setTex(s), 21, 12]));
}
{
  const area = solvePoly(P(2, 3, -90), '<=');
  const peri = S([6, 6], '>=', [0, 30]);
  const xs = range(1, 12).filter((x) => cmp(fr(x * (2 * x + 3)), fr(90)) <= 0 && 6 * x + 6 >= 30);
  must(setTex(area) === '[-\\dfrac{15}{2}, 6]' && peq(pMul(P(2, 15), P(1, -6)), P(2, 3, -90)) && peri.cond === 'x \\ge 4' && xs.join() === '4,5,6' && 6 * (2 * 6 + 3) === 90, 'l07');
  Q('l07', mk.long({ marks: 5, stem: r`An imagined notice board is a rectangle of breadth $x$ cm and length $(2x + 3)$ cm. Its area must be at most $90$ square centimetres and its perimeter at least $30$ cm.\n\n(a) Show that the area condition is $2x^2 + 3x - 90 \le 0$ and solve it for $x > 0$. [2]\n\n(b) Form and solve the perimeter condition. [1]\n\n(c) Find the whole-number values of $x$ that satisfy both conditions and the area of the board for the greatest one. [2]`, model: r`(a) Area $= x(2x + 3) \le 90$, so $2x^2 + 3x - 90 \le 0$. Factorise: $(2x + 15)(x - 6) \le 0$, true for $-\dfrac{15}{2} \le x \le 6$. Since a breadth is positive, $0 < x \le 6$.\n\n(b) Perimeter $= 2\bigl(x + 2x + 3\bigr) = 6x + 6 \ge 30$, so $6x \ge 24$ and $x \ge 4$.\n\n(c) Both conditions give $4 \le x \le 6$, so the whole numbers are $4, 5, 6$. For the greatest, $x = 6$, the area is $6 \times 15 = 90$ square centimetres.`, sol: r`Area gives a quadratic inequality; perimeter gives a linear one; then combine.`, scheme: [[r`Form $2x^2 + 3x - 90 \le 0$`, 1], [r`Factorise and solve: $0 < x \le 6$`, 1], [r`Perimeter $6x + 6 \ge 30$, so $x \ge 4$`, 1], [r`Whole numbers $4, 5, 6$`, 1], [r`Area for $x = 6$: $90$ square centimetres`, 1]], d: 4, c: 'application', t: [1, 2], time: 280 }),
    (C_) => C_.model([r`-\dfrac{15}{2} \le x \le 6`, 4, 6, 90]));
}
