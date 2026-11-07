// ISC 11 Mathematics ch07: true-false, fill-blank, numerical and 2-mark short-answer items. Sets and counts come from the exact
// sign-chart solver (rat.mjs); working in the model answers interpolates the computed values.
import { Q, mk } from './lib.mjs';
import { fr, eq, cmp, add, sub, mul, frTex, range, ivTex } from './ineq.mjs';
import { P, solvePoly, solveRational, setTex, fromRoots, peq, pMul, pEval, integersIn, S, must, r } from './rat.mjs';

const T = (s) => `$${s}$`;

// =============================================================== true-false
{
  const s = S([-2, 0], '<', [0, 10]);
  must(s.cond === 'x > -5', 'tf1');
  Q('tf1', mk.tf({ stem: r`If a real number $x$ satisfies $-2x < 10$, then $x < -5$.`, key: 'f', sol: r`Dividing by $-2$ reverses the sign: $x > -5$. For example $x = -6$ gives $12 < 10$, which is false, so the statement is false.`, d: 1, c: 'understanding', t: [1], time: 40 }),
    (C_) => { C_.assert(!s.pred(fr(-6)) && s.pred(fr(0)), 'x = -6 fails'); C_.key('f'); });
}
{
  const s = solvePoly(P(1, 0, -9), '>=');
  must(setTex(s) === r`(-\infty, -3] \cup [3, \infty)` && !s.pred(fr(0)) && s.pred(fr(-5)), 'tf2');
  Q('tf2', mk.tf({ stem: r`Over the real numbers, the solution set of $x^2 \ge 9$ is the closed interval $[-3, 3]$.`, key: 'f', sol: r`The solution set is $(-\infty, -3] \cup [3, \infty)$. The numbers between $-3$ and $3$ give $x^2 < 9$; for example $x = 0$ gives $0 \ge 9$, which is false.`, d: 2, c: 'understanding', t: [2], time: 45 }),
    (C_) => { C_.assert(!s.pred(fr(0)) && s.pred(fr(-5)) && s.pred(fr(3)), 'x=0 fails, -5 and 3 work'); C_.key('f'); });
}
{
  const a = solveRational(P(1, -1), P(1, 2), '>=', 0), b = solvePoly(pMul(P(1, -1), P(1, 2)), '>=');
  must(setTex(a) === r`(-\infty, -2) \cup [1, \infty)` && setTex(b) === r`(-\infty, -2] \cup [1, \infty)`, 'tf3');
  Q('tf3', mk.tf({ stem: r`The inequalities $\dfrac{x - 1}{x + 2} \ge 0$ and $(x - 1)(x + 2) \ge 0$ have exactly the same solution set over the real numbers.`, key: 'f', sol: r`They differ at $x = -2$. In the product $x = -2$ gives $0$, which is allowed by $\ge$, but in the fraction it makes the denominator $0$ and is not allowed.`, d: 3, c: 'analysis', t: [3], time: 60 }),
    (C_) => { C_.assert(b.pred(fr(-2)) && !a.pred(fr(-2)), 'differ at -2'); C_.key('f'); });
}
{
  const s = solvePoly(P(3, 0, 2), '<');
  must(setTex(s) === r`\varnothing`, 'tf4');
  Q('tf4', mk.tf({ stem: r`There is no real number $x$ for which $3x^2 + 2 < 0$.`, key: 't', sol: r`$3x^2 \ge 0$ for every real $x$, so $3x^2 + 2 \ge 2 > 0$. The expression is never negative, so the statement is true.`, d: 2, c: 'understanding', t: [2], time: 45 }),
    (C_) => { C_.assert(s.ivs.length === 0, 'empty'); C_.key('t'); });
}
{
  const s = solvePoly(P(1, -8, 16), '<=');
  must(setTex(s) === r`\{4\}`, 'tf5');
  Q('tf5', mk.tf({ stem: r`The number $4$ is the only real number that satisfies $x^2 - 8x + 16 \le 0$.`, key: 't', sol: r`$x^2 - 8x + 16 = (x - 4)^2$, which is never negative and is $0$ only at $x = 4$. So the solution set is $\{4\}$ and the statement is true.`, d: 2, c: 'understanding', t: [2], time: 45 }),
    (C_) => { C_.assert(integersIn(s, -30, 30).join() === '4' && s.pred(fr(4)), 'only 4'); C_.key('t'); });
}
{
  const s = solveRational(P(2), P(1, -3), '<', 1);
  must(setTex(s) === r`(-\infty, 3) \cup (5, \infty)` && !solvePoly(P(1, -5), '>').pred(fr(0)), 'tf6');
  Q('tf6', mk.tf({ stem: r`For $x \ne 3$, the inequality $\dfrac{2}{x - 3} < 1$ can be solved by multiplying both sides by $x - 3$ to get $2 < x - 3$, so $x > 5$.`, key: 'f', sol: r`Multiplying by $x - 3$ is only valid when $x - 3 > 0$. For $x < 3$ the fraction is negative, so it is also less than $1$: $x = 0$ gives $-\dfrac{2}{3} < 1$. The full solution is $x < 3$ or $x > 5$.`, d: 3, c: 'analysis', t: [3], time: 60 }),
    (C_) => { C_.assert(s.pred(fr(0)) && s.pred(fr(6)) && !s.pred(fr(4)) && !s.pred(fr(3)), 'x = 0 is a solution too'); C_.key('f'); });
}

Q('tf7', mk.tf({ stem: r`The number $3$ is a member of the solution set of $x > 3$.`, key: 'f', sol: r`The sign is strict, so the end point is left out: $3 > 3$ is false.`, d: 1, c: 'recall', t: [1], time: 30 }),
  (C_) => { const s = S([1, 0], '>', [0, 3]); C_.assert(!s.pred(fr(3)) && s.pred(fr(4)), '3 is not in the set'); C_.key('f'); });
{
  const grid = range(-30, 30).map((k) => fr(k, 3));
  const ok = grid.every((a) => grid.every((b) => cmp(a, b) >= 0 || grid.every((c) => cmp(add(a, c), add(b, c)) < 0)));
  must(ok, 'tf8 adding keeps the sign (grid)');
  Q('tf8', mk.tf({ stem: r`If $a < b$ for real numbers $a$ and $b$, then $a + c < b + c$ for every real number $c$, whether $c$ is positive, zero or negative.`, key: 't', sol: r`Adding the same number to both sides keeps the sign, because $(b + c) - (a + c) = b - a > 0$. Only multiplying or dividing by a negative number reverses it.`, d: 1, c: 'understanding', t: [1], time: 40 }),
    (C_) => { C_.assert(ok, 'checked on a rational grid'); C_.key('t'); });
}

// =============================================================== fill-blank
{
  const s = S([-3, 5], '<', [0, 11]);
  must(s.cond === 'x > -2', 'fb1');
  Q('fb1', mk.fill({ stem: r`For real $x$, the inequality $5 - 3x < 11$ has the solution $x$ ___ $-2$ (write the sign).`, acc: [['>', 'greater than']], sol: r`$-3x < 6$; dividing by $-3$ reverses the sign, so $x > -2$.`, d: 1, c: 'understanding', t: [1], time: 40 }),
    (C_) => C_.blank('>'));
}
{
  const s = solvePoly(pMul(P(1, 1), P(1, -6)), '<=');
  must(setTex(s) === '[-1, 6]', 'fb2');
  Q('fb2', mk.fill({ stem: r`The solution set of $(x + 1)(x - 6) \le 0$ is written as the interval ___.`, acc: [['[-1, 6]', '[-1,6]']], sol: r`The parabola opens upwards, so the product is negative or zero between its roots, end points included: $[-1, 6]$.`, d: 2, c: 'understanding', t: [2], time: 45 }),
    (C_) => C_.blank('[-1, 6]'));
}
{
  const s = solvePoly(fromRoots([7, 7]), '>');
  must(setTex(s) === r`(-\infty, 7) \cup (7, \infty)`, 'fb3');
  Q('fb3', mk.fill({ stem: r`Every real number except $x =$ ___ satisfies $(x - 7)^2 > 0$.`, acc: [['7']], sol: r`A square is positive except where it is $0$, and $(x - 7)^2 = 0$ only at $x = 7$.`, d: 2, c: 'understanding', t: [2], time: 40 }),
    (C_) => C_.blank(7));
}
{
  const p = P(1, -6, 13);
  const s = solvePoly(p, '>=');
  must(setTex(s) === r`(-\infty, \infty)` && 36 - 52 === -16, 'fb4');
  Q('fb4', mk.fill({ stem: r`For the quadratic $x^2 - 6x + 13$, the discriminant is negative, so the inequality $x^2 - 6x + 13 \ge 0$ holds for ___ (say for which real numbers).`, acc: [['all real numbers', 'every real number', 'all real x', 'every real x']], sol: r`$D = 36 - 52 = -16 < 0$, so the upward parabola never meets the axis and is positive everywhere: it holds for all real numbers.`, d: 2, c: 'understanding', t: [2], time: 45 }),
    (C_) => C_.blank('all real numbers'));
}
{
  const s = S([4, -9], '>', [2, 7]);
  const least = Math.min(...range(-60, 60).filter((k) => s.pred(fr(k))));
  must(s.cond === 'x > 8' && least === 9, 'fb5');
  Q('fb5', mk.fill({ stem: r`The least integer that satisfies $4x - 9 > 2x + 7$ is ___.`, acc: [['9']], sol: r`$2x > 16$ gives $x > 8$. The integer $8$ itself is left out, so the least integer is $9$.`, d: 2, c: 'application', t: [1], time: 45 }),
    (C_) => C_.blank(least));
}
{
  const s = solveRational(P(1, 5), P(2, -6), '<=', 1);
  must(setTex(s) === r`(-\infty, 3) \cup [11, \infty)`, 'fb6');
  Q('fb6', mk.fill({ stem: r`In solving $\dfrac{x + 5}{2x - 6} \le 1$ the value $x =$ ___ must be excluded, because it makes the denominator zero.`, acc: [['3']], sol: r`$2x - 6 = 0$ gives $x = 3$. The solution set is $(-\infty, 3) \cup [11, \infty)$ and does not contain $3$.`, d: 2, c: 'understanding', t: [3], time: 45 }),
    (C_) => { C_.blank(3); C_.assert(!s.pred(fr(3)), '3 excluded'); });
}

Q('fb7', mk.fill({ stem: r`In interval notation such as $[2, 9)$, the end point beside a square bracket is ___ in the set (write included or excluded).`, acc: [['included']], sol: r`A square bracket keeps the end point, so $2$ is included; the round bracket leaves $9$ out.`, d: 1, c: 'recall', t: [1], time: 30 }),
  (C_) => C_.blank('included'));

// =============================================================== numerical
{
  const s = solvePoly(P(1, -1, -12), '<');
  const ints = integersIn(s);
  const sum = ints.reduce((a, b) => a + b, 0);
  must(setTex(s) === '(-3, 4)' && ints.join() === '-2,-1,0,1,2,3' && sum === 3 && peq(pMul(P(1, 3), P(1, -4)), P(1, -1, -12)), 'n1');
  Q('n1', mk.num({ stem: r`Every integer $x$ that makes $x^2 - x - 12 < 0$ true is written down and the numbers are added up. What is the total?`, value: sum, marks: 2, unit: null, sol: r`$x^2 - x - 12 = (x + 3)(x - 4) < 0$ for $-3 < x < 4$. The integers are $-2, -1, 0, 1, 2, 3$ and their sum is $-2 - 1 + 0 + 1 + 2 + 3 = 3$.`, scheme: [['Factorise and read the set $(-3, 4)$', 1], ['Add the integers: $3$', 1]], d: 3, c: 'application', t: [2], time: 90 }),
    (C_) => C_.val(sum));
}
{
  const s = solvePoly(P(-5, 20, -15), '>');
  const dur = 3 - 1;
  must(setTex(s) === '(1, 3)' && eq(pEval(P(-5, 20, 0), fr(1)), fr(15)) && eq(pEval(P(-5, 20, 0), fr(3)), fr(15)) && dur === 2, 'n2');
  Q('n2', mk.num({ stem: r`In an imagined demonstration, a ball thrown upwards from the ground has height $h = 20t - 5t^2$ metres at time $t$ seconds, for $0 \le t \le 4$. For how many seconds is the ball more than $15$ metres above the ground?`, value: dur, marks: 2, unit: 's', sol: r`$20t - 5t^2 > 15$ gives $t^2 - 4t + 3 < 0$, that is $(t - 1)(t - 3) < 0$, so $1 < t < 3$. The duration is $3 - 1 = 2$ seconds.`, scheme: [['Form $t^2 - 4t + 3 < 0$', 1], ['Solve $1 < t < 3$ and subtract: $2$ seconds', 1]], d: 3, c: 'application', t: [2], time: 100 }),
    (C_) => C_.val(dur));
}
{
  const s = solveRational(P(1, 3), P(1, -2), '<=', 2);
  const least = Math.min(...range(3, 60).filter((k) => s.pred(fr(k))));
  must(setTex(s) === r`(-\infty, 2) \cup [7, \infty)` && least === 7, 'n3');
  Q('n3', mk.num({ stem: r`Find the least integer greater than $2$ that satisfies $\dfrac{x + 3}{x - 2} \le 2$.`, value: least, marks: 2, unit: null, sol: r`Subtract $2$: $\dfrac{x + 3 - 2(x - 2)}{x - 2} = \dfrac{7 - x}{x - 2} \le 0$, that is $\dfrac{x - 7}{x - 2} \ge 0$, so $x < 2$ or $x \ge 7$. For $x > 2$ the least integer is $x = 7$.`, scheme: [['Reduce to $\\dfrac{x - 7}{x - 2} \\ge 0$', 1], ['Solution set and the least integer above $2$: $7$', 1]], d: 3, c: 'application', t: [3], time: 100 }),
    (C_) => C_.val(least));
}
{
  const s = solvePoly(P(1, 7, -60), '<=');
  const greatest = Math.max(...range(1, 60).filter((k) => s.pred(fr(k))));
  must(setTex(s) === '[-12, 5]' && greatest === 5 && peq(pMul(P(1, 12), P(1, -5)), P(1, 7, -60)), 'n4');
  Q('n4', mk.num({ stem: r`A rectangular poster in an imagined school fair has breadth $x$ cm (a whole number) and length $(x + 7)$ cm. Its area must be at most $60$ square centimetres. Find the greatest possible value of $x$.`, value: greatest, marks: 2, unit: 'cm', sol: r`$x(x + 7) \le 60$ gives $x^2 + 7x - 60 \le 0$, that is $(x + 12)(x - 5) \le 0$, so $-12 \le x \le 5$. A breadth is positive, so the greatest whole number is $5$.`, scheme: [['Form and factorise $(x + 12)(x - 5) \\le 0$', 1], ['Reject negative $x$: greatest value $5$', 1]], d: 3, c: 'application', t: [2], time: 100 }),
    (C_) => C_.val(greatest));
}
{
  const ks = range(-12, 12);
  const good = ks.filter((k) => { const p = P(1, k, 9); const vertexPos = pEval(p, fr(-k, 2)).n > 0n; const gridPos = range(-80, 80).every((i) => pEval(p, fr(i, 4)).n > 0n); must(vertexPos === gridPos, 'n5 grid agrees with the minimum'); return vertexPos; });
  must(good.join() === '-5,-4,-3,-2,-1,0,1,2,3,4,5' && good.length === 11, 'n5');
  Q('n5', mk.num({ stem: r`For how many integer values of the constant $k$ is $x^2 + kx + 9 > 0$ true for every real number $x$?`, value: good.length, marks: 2, unit: null, sol: r`No real root is needed: $D = k^2 - 36 < 0$, so $(k - 6)(k + 6) < 0$ and $-6 < k < 6$. The integers $-5, -4, \ldots, 5$ number $11$, so the count is $11$. At $k = \pm 6$ the expression is a perfect square, zero at $x = \mp 3$.`, scheme: [['Condition $k^2 - 36 < 0$', 1], ['Integers from $-5$ to $5$: $11$', 1]], d: 4, c: 'analysis', t: [2], time: 110 }),
    (C_) => C_.val(good.length));
}
{
  const s = solvePoly(P(1, -10, 21), '>=');
  const hits = range(1, 10).filter((k) => s.pred(fr(k)));
  must(hits.join() === '1,2,3,7,8,9,10' && peq(pMul(P(1, -3), P(1, -7)), P(1, -10, 21)), 'n6');
  Q('n6', mk.num({ stem: r`How many of the integers $1, 2, 3, \ldots, 10$ satisfy $x^2 - 10x + 21 \ge 0$?`, value: hits.length, marks: 1, unit: null, sol: r`$x^2 - 10x + 21 = (x - 3)(x - 7) \ge 0$ for $x \le 3$ or $x \ge 7$. The integers $1, 2, 3$ and $7, 8, 9, 10$ give $3 + 4 = 7$.`, scheme: [['Set $x \\le 3$ or $x \\ge 7$ and count: $7$', 1]], d: 2, c: 'application', t: [2], time: 70 }),
    (C_) => C_.val(hits.length));
}

// =============================================================== short answer, 2 marks
{
  const s = S([5, -3], '>', [7, 9]);
  must(s.cond === 'x < -6' && s.ivT === r`(-\infty, -6)`, 's201');
  Q('s201', mk.short({ marks: 2, stem: r`Solve $5x - 3 > 7x + 9$ for real $x$. Write the solution set as an interval and say how the end point is marked on the number line.`, model: r`$5x - 7x > 9 + 3$, so $-2x > 12$. Dividing by $-2$ reverses the sign: $x < -6$. The solution set is $(-\infty, -6)$. The end point $-6$ is left out, so it is marked with an open circle, with the line shaded to the left.`, sol: r`Collect, divide by the negative coefficient and reverse the sign.`, scheme: [['Collect and divide by $-2$ with the sign reversed: $x < -6$', 1], ['Interval $(-\\infty, -6)$ and open circle at $-6$', 1]], d: 2, c: 'understanding', t: [1], time: 100 }),
    (C_) => C_.model([r`x < -6`, s.ivT, 'open circle']));
}
{
  const s = solvePoly(pMul(P(1, -3), P(1, 6)), '<');
  must(setTex(s) === '(-6, 3)', 's202');
  Q('s202', mk.short({ marks: 2, stem: r`Find every real number $x$ for which $(x - 3)(x + 6) < 0$, giving the answer in interval form.`, model: r`The critical points are $-6$ and $3$. The factors have opposite signs between them: for $x = 0$ the product is $(-3)(6) = -18 < 0$. Outside, both factors have the same sign. The strict sign leaves out the end points, so the solution set is $(-6, 3)$.`, sol: r`Critical points, one test value, strict sign.`, scheme: [['Critical points $-6$ and $3$ with a sign test', 1], ['Interval $(-6, 3)$', 1]], d: 2, c: 'understanding', t: [2], time: 90 }),
    (C_) => C_.model([setTex(s), -18]));
}
{
  const s = solvePoly(P(1, 0, -16), '>=');
  must(setTex(s) === r`(-\infty, -4] \cup [4, \infty)`, 's203');
  Q('s203', mk.short({ marks: 2, stem: r`A student solves $x^2 \ge 16$ by writing "$x \ge 4$". Say what is missing and give the complete solution set.`, model: r`$x^2 \ge 16$ means $(x - 4)(x + 4) \ge 0$, which is true when $x \le -4$ or $x \ge 4$. The student missed the negative values: $x = -5$ gives $25 \ge 16$, which is true. The complete solution set is $(-\infty, -4] \cup [4, \infty)$.`, sol: r`Factorise; a square can be large through a negative number.`, scheme: [['Missing: the negative values (e.g. $x = -5$ works)', 1], ['Complete set $(-\\infty, -4] \\cup [4, \\infty)$', 1]], d: 3, c: 'analysis', t: [2], time: 90 }),
    (C_) => { C_.model([setTex(s), 25]); C_.assert(s.pred(fr(-5)), '-5 works'); });
}
{
  const s = solvePoly(pMul(P(3, -2), P(3, -2)), '<=');
  must(setTex(s) === r`\{\dfrac{2}{3}\}` && peq(pMul(P(3, -2), P(3, -2)), P(9, -12, 4)), 's204');
  Q('s204', mk.short({ marks: 2, stem: r`Solve $9x^2 - 12x + 4 \le 0$ for real $x$.`, model: r`$9x^2 - 12x + 4 = (3x - 2)^2$, a perfect square, which is never negative. So $(3x - 2)^2 \le 0$ only when $3x - 2 = 0$. The solution set is the single number $x = \dfrac{2}{3}$, that is $\{\dfrac{2}{3}\}$.`, sol: r`Recognise the square; a square is zero only at its root.`, scheme: [[r`Recognise $(3x - 2)^2$`, 1], [r`Only $x = \dfrac{2}{3}$`, 1]], d: 3, c: 'application', t: [2], time: 90 }),
    (C_) => C_.model([setTex(s)]));
}
{
  const p = P(1, 3, 5);
  must(9 - 20 === -11 && solvePoly(p, '>').ivs.length === 1 && solvePoly(p, '>').ivs[0].lo === null, 's205');
  Q('s205', mk.short({ marks: 2, stem: r`Show that $x^2 + 3x + 5 > 0$ for every real number $x$.`, model: r`The discriminant is $D = 3^2 - 4(1)(5) = 9 - 20 = -11 < 0$, so $x^2 + 3x + 5 = 0$ has no real root and the parabola never meets the $x$-axis. Its leading coefficient $1$ is positive, so it opens upwards and lies above the axis: $x^2 + 3x + 5 > 0$ for every real $x$.`, sol: r`Negative discriminant and an upward parabola.`, scheme: [[r`$D = -11 < 0$, no real roots`, 1], ['Upward parabola, so always positive', 1]], d: 2, c: 'understanding', t: [2], time: 80 }),
    (C_) => C_.model([-11, 9, 20]));
}
{
  const s = solveRational(P(1, 1), P(1, -4), '<', 0);
  must(setTex(s) === '(-1, 4)', 's206');
  Q('s206', mk.short({ marks: 2, stem: r`Solve $\dfrac{x + 1}{x - 4} < 0$ for real $x$.`, model: r`The critical points are $-1$ (top zero) and $4$ (bottom zero). A fraction is negative when its top and bottom have opposite signs, which happens for $-1 < x < 4$; at $x = 0$ the value is $-\dfrac{1}{4} < 0$. Neither end point is included, so the solution set is $(-1, 4)$.`, sol: r`Opposite signs between the critical points.`, scheme: [['Critical points $-1$ and $4$, sign test', 1], ['Set $(-1, 4)$ with $4$ excluded', 1]], d: 2, c: 'understanding', t: [3], time: 90 }),
    (C_) => C_.model([setTex(s)]));
}
{
  const s = S([2, 1], '>=', [0, -3]), t = S([2, 1], '<', [0, 9]);
  const ints = [];
  must(s.cond === 'x \\ge -2' && t.cond === 'x < 4', 's207');
  Q('s207', mk.short({ marks: 2, stem: r`Solve the double inequality $-3 \le 2x + 1 < 9$ for real $x$ and write the solution set as an interval.`, model: r`Subtract $1$ from every part: $-4 \le 2x < 8$. Divide every part by $2$: $-2 \le x < 4$. The solution set is $[-2, 4)$: the end point $-2$ is included and $4$ is left out.`, sol: r`Work on all three parts together.`, scheme: [['Subtract $1$ and divide by $2$ on all three parts', 1], ['Interval $[-2, 4)$', 1]], d: 2, c: 'understanding', t: [1], time: 80 }),
    (C_) => { C_.model([r`[-2, 4)`, -4, 8]); void ints; });
}
{
  const s = solveRational(P(5), P(1, -2), '<', 1);
  must(setTex(s) === r`(-\infty, 2) \cup (7, \infty)` && peq(s.E, P(-1, 7)), 's208');
  Q('s208', mk.short({ marks: 2, stem: r`Solve $\dfrac{5}{x - 2} < 1$ for real $x$.`, model: r`Subtract $1$: $\dfrac{5 - (x - 2)}{x - 2} = \dfrac{7 - x}{x - 2} < 0$, that is $\dfrac{x - 7}{x - 2} > 0$. The critical points are $2$ and $7$, and the fraction is positive for $x < 2$ and for $x > 7$. The solution set is $(-\infty, 2) \cup (7, \infty)$.`, sol: r`One side zero, then a sign chart.`, scheme: [[r`Reduce to $\dfrac{x - 7}{x - 2} > 0$`, 1], ['Set $(-\\infty, 2) \\cup (7, \\infty)$', 1]], d: 3, c: 'application', t: [3], time: 100 }),
    (C_) => C_.model([setTex(s), 7]));
}
{
  const s = S([2, -1], '<=', [0, 7]);
  const ints = range(-20, 20).filter((k) => { const v = 2 * k - 1; return v > -5 && v <= 7; });
  must(ints.join() === '-1,0,1,2,3,4', 's209');
  Q('s209', mk.short({ marks: 2, stem: r`List all the integers $x$ that satisfy $-5 < 2x - 1 \le 7$.`, model: r`Add $1$ to every part: $-4 < 2x \le 8$. Divide by $2$: $-2 < x \le 4$. The integers in this set are $-1, 0, 1, 2, 3, 4$ (the end point $-2$ is left out, $4$ is included).`, sol: r`Solve the three-part inequality, then list the integers.`, scheme: [['Reduce to $-2 < x \\le 4$', 1], ['List $-1, 0, 1, 2, 3, 4$', 1]], d: 2, c: 'application', t: [1], time: 80 }),
    (C_) => { C_.model([-2, 4, ints.join(', ')]); void s; });
}
{
  const s = solveRational(P(1, 1), P(1, -3), '>=', 0);
  must(setTex(s) === r`(-\infty, -1] \cup (3, \infty)` && s.pred(fr(-1)) && !s.pred(fr(3)), 's210');
  Q('s210', mk.short({ marks: 2, stem: r`Decide whether $x = 3$ and $x = -1$ satisfy $\dfrac{x + 1}{x - 3} \ge 0$. Give the value or the reason in each case.`, model: r`At $x = 3$ the denominator is $3 - 3 = 0$, so the fraction is undefined and $x = 3$ does not satisfy the inequality. At $x = -1$ the value is $\dfrac{-1 + 1}{-1 - 3} = 0$, and $0 \ge 0$ is true, so $x = -1$ satisfies it.`, sol: r`Substitute each value: one is undefined, one gives zero.`, scheme: [[r`$x = 3$: undefined, not a solution`, 1], [r`$x = -1$: value $0$, a solution`, 1]], d: 2, c: 'understanding', t: [3], time: 80 }),
    (C_) => C_.model([0, 3, -1]));
}
