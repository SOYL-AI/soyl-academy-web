// CBSE 11 Mathematics ch05 Linear Inequalities — written items: short (2 and 3 marks), long (5 marks) and case-based.
// Every number in a model answer is recomputed here with exact fractions (ineq.mjs); one-variable answers are checked against
// the inequalities by brute force, two-variable answers by exact point tests, corner points and lattice-point enumeration.
import { Q, caseQ, child, mk, plot, f } from './lib.mjs';
import { fr, ivF, inF, andIv, emptyIv, ivTex, ivsTex, frTex, num, holds, intsWhere, half, holds2, meet, corners, lattice, ptTex, agree, inAnyF, floorF, onLine, closedH } from './ineq.mjs';
import { r, S, must } from './common.mjs';

const both = (a, b) => andIv(a.iv, b.iv);
const conj = (a, b) => agree((x) => a.pred(x) && b.pred(x), [both(a, b)]);

// =============================================================== short answer, 2 marks
{
  const s = S([-2, 9], '>=', [3, -6]);
  must(s.cond === 'x \\le 3' && s.ivT === '(-\\infty, 3]', 's201');
  Q('s201', mk.short({ marks: 2, stem: r`Solve $9 - 2x \ge 3x - 6$ for real $x$ and write the solution set as an interval.`, model: r`Collect the terms: $9 + 6 \ge 3x + 2x$, so $15 \ge 5x$.\n\nDivide by $5$ (positive): $3 \ge x$, that is $x \le 3$.\n\nSolution set: $${s.ivT}$.`, sol: 'Collect x terms on the side that keeps the coefficient positive; no reversal is then needed.', scheme: [['15 >= 5x', 1], ['x <= 3 as (-inf, 3]', 1]], d: 1, c: 'understanding', t: [1], time: 90 }), (Cx) => { Cx.assert(s.ivT === '(-\\infty, 3]', '(-inf, 3]'); Cx.model([15, 5, 3]); });
}
{
  const s = S([[1, 3], -2], '<', [[1, 4], 1]);
  must(s.cond === 'x < 36', 's202');
  Q('s202', mk.short({ marks: 2, stem: r`Find all real $x$ for which $\dfrac{x}{3} - 2 < \dfrac{x}{4} + 1$.`, model: r`Multiply both sides by $12$ (positive): $4x - 24 < 3x + 12$.\n\nSubtract $3x$ and add $24$: $x < 36$.\n\nSolution set: $${s.ivT}$.`, sol: 'Clear the denominators with their positive lowest common multiple.', scheme: [['4x - 24 < 3x + 12', 1], ['x < 36', 1]], d: 2, c: 'application', t: [1], time: 100 }), (Cx) => { Cx.assert(s.cond === 'x < 36', 'x < 36'); Cx.model([12, 24, 36]); });
}
{
  const s = S([-2, 0], '>', [0, 6]);
  must(s.cond === 'x < -3' && s.pred(fr(-5)) && !s.pred(fr(0)), 's203');
  Q('s203', mk.short({ marks: 2, stem: r`Devika solves $-2x > 6$ and writes $x > -3$. State her mistake and give the correct solution, checking it with one number.`, model: r`She divided by $-2$ but kept the sign. Dividing by a negative number reverses the sign, so $x < -3$.\n\nCheck with $x = -5$: $-2(-5) = 10 > 6$, true. For $x = 0$ (which her answer allows): $0 > 6$ is false.`, sol: 'Reverse the sign when dividing by a negative number; test one number of the answer.', scheme: [['Mistake: sign not reversed; x < -3', 1], ['Check with a number', 1]], d: 2, c: 'analysis', t: [1], time: 100 }), (Cx) => { Cx.assert(s.cond === 'x < -3' && s.pred(fr(-5)) && !s.pred(fr(0)), 'x < -3; -5 works; 0 fails'); Cx.model([3, 5, 10, 6]); });
}
{
  const I = ivF(fr(110), fr(150), true, false);
  must(inF(I, fr(110)) && !inF(I, fr(150)) && ivTex(I) === '[110, 150)', 's204');
  Q('s204', mk.short({ marks: 2, stem: r`A ride at an imagined fair admits children whose height $h$ cm is at least $110$ cm but below $150$ cm. Write this as a double inequality and as an interval. Is a child of height exactly $150$ cm admitted?`, model: r`"At least $110$" is $h \ge 110$ and "below $150$" is $h < 150$, so $110 \le h < 150$, the interval $${ivTex(I)}$.\n\nA child of height $150$ cm is not admitted, because the right end $150$ is excluded.`, sol: 'Translate each phrase to a sign; at least includes the end point, below excludes it.', scheme: [['110 <= h < 150 and [110, 150)', 1.5], ['150 cm not admitted, with reason', 0.5]], d: 1, c: 'understanding', t: [1], time: 90 }), (Cx) => { Cx.assert(ivTex(I) === '[110, 150)', 'interval'); Cx.model([110, 150]); });
}
{
  const a = S([-2, 3], '>', [0, -4]), b = S([-2, 3], '<=', [0, 7]);
  const I = both(a, b);
  conj(a, b);
  must(ivTex(I) === '[-2, \\dfrac{7}{2})', 's205');
  Q('s205', mk.short({ marks: 2, stem: r`Solve $-4 < 3 - 2x \le 7$ for real $x$ and write the answer as an interval.`, model: r`Subtract $3$ from every part: $-7 < -2x \le 4$.\n\nDivide every part by $-2$ and reverse both signs: $\dfrac{7}{2} > x \ge -2$, that is $-2 \le x < \dfrac{7}{2}$.\n\nSolution set: $${ivTex(I)}$.`, sol: 'Work on all three parts together; dividing by a negative number reverses both signs.', scheme: [['-7 < -2x <= 4', 1], ['Reverse the signs: [-2, 7/2)', 1]], d: 3, c: 'application', t: [1], time: 110 }), (Cx) => { Cx.assert(ivTex(I) === '[-2, \\dfrac{7}{2})', '[-2, 7/2)'); Cx.model([7, 2, 4]); });
}
{
  const a = S([4, -3], '>', [0, 5]), b = S([-1, 7], '>=', [0, 2]);
  const I = both(a, b);
  conj(a, b);
  must(ivTex(I) === '(2, 5]', 's206');
  Q('s206', mk.short({ marks: 2, stem: r`Find the real numbers $x$ that satisfy both $4x - 3 > 5$ and $7 - x \ge 2$.`, model: r`First: $4x > 8$, so $x > 2$.\n\nSecond: $-x \ge -5$, so $x \le 5$.\n\nBoth hold for $2 < x \le 5$, the interval $${ivTex(I)}$.`, sol: 'Solve each inequality separately, then take the numbers common to both.', scheme: [['x > 2 and x <= 5', 1], ['Common set (2, 5]', 1]], d: 2, c: 'understanding', t: [1], time: 100 }), (Cx) => { Cx.assert(ivTex(I) === '(2, 5]', '(2, 5]'); Cx.model([2, 5]); });
}
{
  const a = S([2, 1], '<', [0, -3]), b = S([1, -1], '>', [0, 0]);
  const I = both(a, b);
  must(emptyIv(I) && a.cond === 'x < -2' && b.cond === 'x > 1', 's207');
  agree((x) => a.pred(x) && b.pred(x), []);
  Q('s207', mk.short({ marks: 2, stem: r`Show that no real number satisfies both $2x + 1 < -3$ and $x - 1 > 0$.`, model: r`$2x + 1 < -3$ gives $2x < -4$, so $x < -2$.\n\n$x - 1 > 0$ gives $x > 1$.\n\nA number below $-2$ cannot also be above $1$, so there is no common solution: the solution set is $\varnothing$.`, sol: 'Solve both, then compare the two rays: they do not overlap.', scheme: [['x < -2 and x > 1', 1], ['Rays do not overlap: empty set', 1]], d: 2, c: 'analysis', t: [1], time: 100 }), (Cx) => { Cx.assert(emptyIv(I), 'empty'); Cx.model([2, 1]); });
}
{
  const h1 = half(2, -3, '>', 8), h2 = half(1, -1, '<=', 3);
  const r1 = holds2(h1, fr(3), fr(-1)), r2 = holds2(h2, fr(3), fr(-1));
  must(r1 && !r2, 's208');
  Q('s208', mk.short({ marks: 2, stem: r`Decide whether the point $(3, -1)$ satisfies (i) $2x - 3y > 8$ and (ii) $x - y \le 3$. Give the value you compute in each case.`, model: r`(i) $2(3) - 3(-1) = 6 + 3 = 9$, and $9 > 8$ is true: the point satisfies the first inequality.\n\n(ii) $3 - (-1) = 4$, and $4 \le 3$ is false: the point does not satisfy the second inequality.`, sol: 'Substitute the coordinates and compare with the right-hand side.', scheme: [['(i) 9 > 8, satisfied', 1], ['(ii) 4 <= 3 is false, not satisfied', 1]], d: 1, c: 'understanding', t: [2], time: 90 }), (Cx) => { Cx.assert(r1 && !r2, 'true then false'); Cx.model([9, 8, 4, 3]); });
}
{
  const h = half(1, 2, '>=', 6);
  const px = meet(h, half(0, 1, '=', 0)), py = meet(h, half(1, 0, '=', 0));
  must(num(px[0]) === 6 && num(py[1]) === 3 && !holds2(h, fr(0), fr(0)), 's209');
  Q('s209', mk.short({ marks: 2, stem: r`For the inequality $x + 2y \ge 6$ find where its boundary line meets each axis, and say which side of the line is shaded and whether the line is solid or dashed.`, model: r`Boundary $x + 2y = 6$: when $y = 0$, $x = 6$; when $x = 0$, $y = 3$. The line passes through $(6, 0)$ and $(0, 3)$.\n\nTest the origin: $0 + 0 = 0 \ge 6$ is false, so shade the side that does not contain the origin. The sign $\ge$ includes the line, so it is solid.`, sol: 'Intercepts, then a test point, then the line style.', scheme: [['Intercepts (6, 0) and (0, 3)', 1], ['Origin fails: shade the far side; solid line', 1]], d: 2, c: 'understanding', t: [2], time: 100 }), (Cx) => { Cx.assert(num(px[0]) === 6 && num(py[1]) === 3 && !holds2(h, fr(0), fr(0)), 'intercepts, origin fails'); Cx.model([6, 3]); });
}

// =============================================================== short answer, 3 marks
{
  const s = S([[1, 10], [-6, 5]], '>=', [0, 1]);
  must(s.cond === 'x \\ge 22', 's301');
  Q('s301', mk.short({ marks: 3, stem: r`Solve $\dfrac{3x - 1}{5} - \dfrac{x + 2}{2} \ge 1$ for real $x$. Write the solution set as an interval and describe its graph on the number line.`, model: r`Multiply by $10$ (positive): $2(3x - 1) - 5(x + 2) \ge 10$.\n\nExpand: $6x - 2 - 5x - 10 \ge 10$, so $x - 12 \ge 10$ and $x \ge 22$.\n\nSolution set: $${s.ivT}$. On the number line: a filled circle at $22$ with the thick line and an arrow going to the right.`, sol: 'Clear denominators with the lowest common multiple; the end point is included because the sign is the non-strict one.', scheme: [['Clear the denominators correctly', 1], ['x >= 22', 1], ['Interval [22, inf) and graph', 1]], d: 3, c: 'application', t: [1], time: 150 }), (Cx) => { Cx.assert(s.ivT === '[22, \\infty)', '[22, inf)'); Cx.model([10, 22]); });
}
{
  const s = S([36, 95], '<=', [0, 500]);
  const n = Math.max(...intsWhere(s.pred, 0, 100));
  must(n === 11 && 36 * 11 + 95 === 491 && 36 * 12 + 95 === 527, 's302');
  Q('s302', mk.short({ marks: 3, stem: r`Maya has ₹$500$. She wants to buy a geometry box for ₹$95$ and some notebooks at ₹$36$ each from an imagined stationery shop. Form an inequality for the number $n$ of notebooks and find the greatest number she can buy.`, model: r`The total cost is $36n + 95$ rupees and it must not exceed $500$: $36n + 95 \le 500$.\n\nThen $36n \le 405$, so $n \le 11.25$.\n\nThe number of notebooks is a whole number, so the greatest is $n = 11$ (cost $36 \times 11 + 95 = 491$; with $12$ it would be $527 > 500$).`, sol: 'Form the inequality, solve, then round down because notebooks are counted in whole numbers.', scheme: [['36n + 95 <= 500', 1], ['n <= 11.25', 1], ['Greatest whole number 11, checked', 1]], d: 2, c: 'application', t: [1], time: 130 }), (Cx) => { Cx.assert(n === 11, 'n = 11'); Cx.model([36, 95, 11.25, 11, 491, 527]); });
}
{
  const s = S([[1, 5], 26], '>=', [0, 33]);
  must(num(s.x0) === 35 && 31 + 38 + 27 + 34 === 130, 's303');
  const I = ivF(fr(35), fr(50), true, true);
  Q('s303', mk.short({ marks: 3, stem: r`Imran scored $31$, $38$, $27$ and $34$ marks (each out of $50$) in four quizzes of an imagined course. What must his fifth score $s$ be for the mean of the five scores to be at least $33$? Write the possible scores as an interval.`, model: r`The four scores add up to $31 + 38 + 27 + 34 = 130$. The mean is $\dfrac{130 + s}{5} \ge 33$.\n\nSo $130 + s \ge 165$ and $s \ge 35$.\n\nA score cannot exceed $50$, so $35 \le s \le 50$, the interval $${ivTex(I)}$.`, sol: 'Write the mean as a fraction, clear the denominator, then respect the maximum score.', scheme: [['Sum 130 and the mean inequality', 1], ['s >= 35', 1], ['Upper limit 50: [35, 50]', 1]], d: 3, c: 'application', t: [1], time: 150 }), (Cx) => { Cx.assert(ivTex(I) === '[35, 50]' && s.cond === 'x \\ge 35', '[35, 50]'); Cx.model([130, 165, 35, 50]); });
}
{
  const a = S([2, 5], '<', [3, -4]), b = S([3, -4], '<=', [5, 6]);
  const I = both(a, b);
  conj(a, b);
  must(a.cond === 'x > 9' && b.cond === 'x \\ge -5' && ivTex(I) === '(9, \\infty)', 's304');
  Q('s304', mk.short({ marks: 3, stem: r`Solve the chain $2x + 5 < 3x - 4 \le 5x + 6$ for real $x$.`, model: r`Split into two inequalities.\n\n$2x + 5 < 3x - 4$: $9 < x$, so $x > 9$.\n\n$3x - 4 \le 5x + 6$: $-10 \le 2x$, so $x \ge -5$.\n\nBoth must hold: $x > 9$ already implies $x \ge -5$, so the solution set is $${ivTex(I)}$.`, sol: 'Treat a chain as two inequalities and intersect their solution sets.', scheme: [['x > 9', 1], ['x >= -5', 1], ['Intersection (9, inf)', 1]], d: 3, c: 'application', t: [1], time: 150 }), (Cx) => { Cx.assert(ivTex(I) === '(9, \\infty)', '(9, inf)'); Cx.model([9, 5, 10]); });
}
{
  const a = S([3, 2], '<', [0, 5]), b = S([2, -1], '>', [0, 9]);
  agree((x) => a.pred(x) || b.pred(x), [ivF(null, fr(1), false, false), ivF(fr(5), null, false, false)]);
  must(a.cond === 'x < 1' && b.cond === 'x > 5', 's305');
  Q('s305', mk.short({ marks: 3, stem: r`Find all real $x$ that satisfy $3x + 2 < 5$ or $2x - 1 > 9$ (at least one of the two). Write the answer as a union of intervals and draw it on the number line in words.`, model: r`$3x + 2 < 5$ gives $3x < 3$, so $x < 1$.\n\n$2x - 1 > 9$ gives $2x > 10$, so $x > 5$.\n\nFor "or" we take every number in either set: $(-\infty, 1) \cup (5, \infty)$.\n\nOn the number line: an open circle at $1$ with an arrow to the left, and an open circle at $5$ with an arrow to the right.`, sol: 'Solve each condition; "or" joins the two solution sets as a union.', scheme: [['x < 1', 1], ['x > 5', 1], ['Union and graph', 1]], d: 3, c: 'application', t: [1], time: 150 }), (Cx) => { Cx.assert(a.cond === 'x < 1' && b.cond === 'x > 5', 'two rays'); Cx.model([1, 5]); });
}
{
  const lineExpr = '(3*x - 12)/4';
  const g = f(lineExpr);
  must([0, 4, 8].every((x) => g(x) === (3 * x - 12) / 4) && g(4) === 0 && g(0) === -3, 's306 line');
  const h = half(3, -4, '<', 12);
  const dir = holds2(h, fr(0), fr(0)) && !onLine(h, fr(0), fr(0));
  const fig = plot({ x: [-3, 7], y: [-5, 3], fns: [{ expr: lineExpr, label: '$3x - 4y = 12$' }], pts: [[4, 0, '(4, 0)'], [0, -3, '(0, -3)']] }, 'The straight line 3x minus 4y equal 12 rising from the lower left to the upper right. It crosses the x-axis at (4, 0) and the y-axis at (0, minus 3), both marked.', r`The boundary line $3x - 4y = 12$ with its two intercepts marked.`);
  Q('s306', mk.short({ marks: 3, stem: r`The figure shows the line $3x - 4y = 12$. For the inequality $3x - 4y < 12$ test the origin, say which side of the line is the solution region, and say whether the line itself is solid or dashed. Give a reason for each.`, assets: [fig], model: r`The intercepts are $(4, 0)$ and $(0, -3)$.\n\nTest the origin: $3(0) - 4(0) = 0 < 12$ is true, so the solution region is the side containing the origin, which is the side above the line.\n\nThe sign is strict ($<$), so points on the line do not satisfy the inequality and the line is dashed.`, sol: 'Test point first; the strict sign decides the dashed line.', scheme: [['Origin test 0 < 12 true', 1], ['Region: side containing the origin (above the line)', 1], ['Dashed line because of the strict sign', 1]], d: 2, c: 'application', t: [2], time: 140 }), (Cx) => { Cx.assert(dir && h.rel === '<', 'origin satisfies the strict inequality'); Cx.model([12, 4, 3]); });
}
{
  const p = meet(half(2, 3, '=', 18), half(1, -1, '=', -1));
  const h1 = half(2, 3, '<=', 18), h2 = half(1, -1, '>=', -1);
  must(num(p[0]) === 3 && num(p[1]) === 4 && holds2(h1, fr(0), fr(0)) && holds2(h2, fr(0), fr(0)), 's307');
  Q('s307', mk.short({ marks: 3, stem: r`Find the point where the boundary lines of $2x + 3y \le 18$ and $x - y \ge -1$ meet, and decide whether the origin lies in the solution region of each inequality.`, model: r`From $x - y = -1$ we get $x = y - 1$. Substitute in $2x + 3y = 18$: $2(y - 1) + 3y = 18$, so $5y = 20$ and $y = 4$, $x = 3$. The lines meet at $(3, 4)$.\n\nOrigin: $2(0) + 3(0) = 0 \le 18$ is true, and $0 - 0 = 0 \ge -1$ is true, so the origin lies in the solution region of both inequalities.`, sol: 'Eliminate one variable between the two boundary equations, then test the origin in each inequality.', scheme: [['Substitution and y = 4', 1], ['Meeting point (3, 4)', 1], ['Origin satisfies both', 1]], d: 2, c: 'application', t: [2], time: 140 }), (Cx) => { Cx.assert(num(p[0]) === 3 && num(p[1]) === 4, '(3, 4)'); Cx.model([5, 4, 3, 18]); });
}
{
  const a = S([3, 2], '>=', [0, -10]), b = S([2, -5], '<', [0, 9]);
  const xs = intsWhere((x) => a.pred(x) && b.pred(x), -30, 30), sum = xs.reduce((s, v) => s + v, 0);
  must(xs.join() === '-4,-3,-2,-1,0,1,2,3,4,5,6' && xs.length === 11 && sum === 11, 's308');
  Q('s308', mk.short({ marks: 3, stem: r`List all the integers $x$ that satisfy both $3x + 2 \ge -10$ and $2x - 5 < 9$, state how many there are and find their sum.`, model: r`$3x + 2 \ge -10$ gives $3x \ge -12$, so $x \ge -4$.\n\n$2x - 5 < 9$ gives $2x < 14$, so $x < 7$.\n\nThe integers with $-4 \le x < 7$ are $-4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6$: there are $11$ of them. Their sum is $(-4 + 6) + (-3 + 5) + (-2 + 4) + (-1 + 3) + (0 + 2) + 1 = 11$.`, sol: 'Intersect the two rays, then list the integers; pair the terms to add them.', scheme: [['x >= -4 and x < 7', 1], ['The eleven integers', 1], ['Sum 11', 1]], d: 3, c: 'application', t: [1], time: 150 }), (Cx) => { Cx.assert(xs.length === 11 && sum === 11, 'eleven integers, sum 11'); Cx.model([4, 7, 11]); });
}

// =============================================================== long answer, 5 marks
{
  const a = S([4, 5], '<=', [9, -20]), b = S([[2, 3], [5, 3]], '<=', [[1, 2], 6]);
  const I = both(a, b), ints = intsWhere((x) => a.pred(x) && b.pred(x), -60, 60);
  conj(a, b);
  must(a.cond === 'x \\ge 5' && b.cond === 'x \\le 26' && ivTex(I) === '[5, 26]' && ints.length === 22, 'l01');
  Q('l01', mk.long({ stem: r`Answer each part for real $x$.\n\n(a) Solve $4(x + 3) - 7 \le 9x - 20$.\n\n(b) Solve $\dfrac{2x + 5}{3} \le \dfrac{x}{2} + 6$.\n\n(c) Write the set of $x$ that satisfies both (a) and (b) as an interval.\n\n(d) How many integers lie in that set?`, model: r`**(a)** $4x + 12 - 7 \le 9x - 20$, so $4x + 5 \le 9x - 20$ and $25 \le 5x$. Hence $x \ge 5$, the set $${a.ivT}$.\n\n**(b)** Multiply by $6$: $2(2x + 5) \le 3x + 36$, so $4x + 10 \le 3x + 36$ and $x \le 26$, the set $${b.ivT}$.\n\n**(c)** Both hold for $5 \le x \le 26$: $${ivTex(I)}$.\n\n**(d)** The integers $5, 6, \dots, 26$ number $26 - 5 + 1 = 22$.`, sol: 'Solve each inequality, intersect, then count the integers from the lower to the upper end point.', scheme: [['(a) x >= 5 with working', 1.5], ['(b) x <= 26 with working', 1.5], ['(c) interval [5, 26]', 1], ['(d) 22 integers', 1]], d: 3, c: 'application', t: [1], time: 330 }), (Cx) => { Cx.assert(ivTex(I) === '[5, 26]' && ints.length === 22, '[5, 26] and 22 integers'); Cx.model([5, 26, 22]); });
}
{
  const a = S([12, 300], '<', [18, 120]);
  const cap = andIv(a.iv, ivF(null, fr(50), false, true));
  const ints = intsWhere((x) => a.pred(x) && holds('<=', x, fr(50)), 0, 100);
  const costA = 300 + 12 * 40, costB = 120 + 18 * 40;
  must(a.cond === 'x > 30' && ivTex(cap) === '(30, 50]' && ints.length === 20 && costA === 780 && costB === 840, 'l02');
  Q('l02', mk.long({ stem: r`Two imagined water-delivery plans for a housing society are: Plan A charges ₹$300$ a month plus ₹$12$ per unit used; Plan B charges ₹$120$ a month plus ₹$18$ per unit used. Let $u$ be the number of units used in a month.\n\n(a) Form and solve an inequality for the values of $u$ for which Plan A is cheaper.\n\n(b) The society never uses more than $50$ units. Write the possible values of $u$ for which A is cheaper as an interval, and count the whole-number values.\n\n(c) For $u = 40$ find the two bills and the difference.`, model: r`**(a)** Plan A is cheaper when $300 + 12u < 120 + 18u$. Then $180 < 6u$, so $u > 30$.\n\n**(b)** With $u \le 50$ as well, $30 < u \le 50$: the interval $${ivTex(cap)}$. The whole numbers $31, 32, \dots, 50$ number $50 - 31 + 1 = 20$.\n\n**(c)** Plan A: $300 + 12 \times 40 = 780$. Plan B: $120 + 18 \times 40 = 840$. Plan A is cheaper by $840 - 780 = 60$ rupees.`, sol: 'Cost of A less than cost of B; then add the usage cap; then substitute u = 40.', scheme: [['(a) inequality 300 + 12u < 120 + 18u', 1], ['(a) u > 30 with working', 1], ['(b) interval (30, 50] and count 20', 1.5], ['(c) bills 780 and 840', 1], ['(c) difference 60', 0.5]], d: 3, c: 'application', t: [1], time: 330 }), (Cx) => { Cx.assert(a.cond === 'x > 30' && ints.length === 20 && costB - costA === 60, 'u > 30, 20 values, difference 60'); Cx.model([30, 50, 20, 780, 840, 60]); });
}
{
  const a = S([[-3, 4], [1, 2]], '>=', [0, -5]), b = S([[-3, 4], [1, 2]], '<', [0, 4]);
  const I = both(a, b), ints = intsWhere((x) => a.pred(x) && b.pred(x), -40, 40);
  conj(a, b);
  const sum = ints.reduce((s, v) => s + v, 0);
  must(ivTex(I) === '(-\\dfrac{14}{3}, \\dfrac{22}{3}]' && ints.join() === '-4,-3,-2,-1,0,1,2,3,4,5,6,7' && sum === 18 && !inF(I, fr(-14, 3)), 'l03');
  Q('l03', mk.long({ stem: r`Consider the double inequality $-5 \le \dfrac{2 - 3x}{4} < 4$ for real $x$.\n\n(a) Solve it and write the solution set as an interval.\n\n(b) Write the greatest and the least integer in the solution set.\n\n(c) Find the number of integers in the solution set and their sum.\n\n(d) Is $x = -\dfrac{14}{3}$ a solution? Give a reason.`, model: r`**(a)** Multiply every part by $4$: $-20 \le 2 - 3x < 16$. Subtract $2$: $-22 \le -3x < 14$. Divide by $-3$ and reverse both signs: $\dfrac{22}{3} \ge x > -\dfrac{14}{3}$. Solution set: $${ivTex(I)}$.\n\n**(b)** $\dfrac{22}{3} = 7.33\ldots$ and $-\dfrac{14}{3} = -4.67\ldots$. The greatest integer is $7$ and the least is $-4$.\n\n**(c)** The integers $-4, -3, \dots, 7$ number $7 - (-4) + 1 = 12$. Their sum is $(-4 + 7) \times 6 = 18$.\n\n**(d)** No. The left end $-\dfrac{14}{3}$ is excluded: at that value the middle expression equals $4$, which is not less than $4$.`, sol: 'Clear the denominator first, reverse both signs at the division by a negative number, then read the integers from the decimals.', scheme: [['(a) -22 <= -3x < 14', 1], ['(a) interval with end points reversed correctly', 1], ['(b) greatest 7 and least -4', 1], ['(c) 12 integers, sum 18', 1], ['(d) excluded end point, with reason', 1]], d: 4, c: 'analysis', t: [1], time: 360 }), (Cx) => { Cx.assert(ints.length === 12 && sum === 18, '12 integers, sum 18'); Cx.model([7, 4, 12, 18, 14, 22]); });
}
{
  const hs = [half(1, 3, '<=', 12), half(3, 1, '<=', 12), half(1, 0, '>=', 0), half(0, 1, '>=', 0)];
  const ps = corners(hs);
  const names = ps.map(ptTex).sort().join(' ');
  const L = lattice(hs, -2, 15, -2, 15);
  const ins = holds2(hs[0], fr(2), fr(2)) && holds2(hs[1], fr(2), fr(2)), out = !holds2(hs[0], fr(4), fr(3));
  must(ps.length === 4 && ps.some((p) => num(p[0]) === 3 && num(p[1]) === 3) && ins && out, 'l04 corners');
  const e1 = '(12 - x)/3', e2 = '12 - 3*x';
  const g1 = f(e1), g2 = f(e2);
  must([0, 3, 6].every((x) => Math.abs(g1(x) - (12 - x) / 3) < 1e-12 && g2(x) === 12 - 3 * x), 'l04 expressions');
  const fig = plot({ x: [-1, 13], y: [-1, 13], fns: [{ expr: e1, label: '$x + 3y = 12$' }, { expr: e2, label: '$3x + y = 12$' }], pts: [[12, 0, '(12, 0)'], [0, 4, '(0, 4)'], [4, 0, '(4, 0)'], [0, 12, '(0, 12)']] }, 'The two lines x plus 3y equal 12 and 3x plus y equal 12 drawn on the first quadrant. The first line meets the axes at (12, 0) and (0, 4); the second at (4, 0) and (0, 12). The lines cross each other above the x-axis.', r`The lines $x + 3y = 12$ and $3x + y = 12$ with their axis intercepts marked.`);
  Q('l04', mk.long({ stem: r`The figure shows the boundary lines of the system $x + 3y \le 12$, $3x + y \le 12$, $x \ge 0$, $y \ge 0$.\n\n(a) Read off or find where each line meets the axes.\n\n(b) Find the corner points of the common solution region.\n\n(c) Test the points $(2, 2)$ and $(4, 3)$ and say which lies in the region.\n\n(d) Count the points of the region whose coordinates are both whole numbers.`, assets: [fig], model: r`**(a)** $x + 3y = 12$ meets the axes at $(12, 0)$ and $(0, 4)$; $3x + y = 12$ meets them at $(4, 0)$ and $(0, 12)$.\n\n**(b)** The two lines meet where $x = 12 - 3y$ and $3(12 - 3y) + y = 12$: $36 - 8y = 12$, so $y = 3$, $x = 3$. With $x \ge 0$, $y \ge 0$ the corner points of the region are $(0, 0)$, $(4, 0)$, $(3, 3)$ and $(0, 4)$.\n\n**(c)** $(2, 2)$: $2 + 6 = 8 \le 12$ and $6 + 2 = 8 \le 12$, so it lies in the region. $(4, 3)$: $4 + 9 = 13 > 12$, so it does not.\n\n**(d)** Counting by $x$: $x = 0$: $y = 0, \dots, 4$ gives $5$ points; $x = 1$: $y \le 3.67$ gives $4$; $x = 2$: $y \le 3.33$ gives $4$; $x = 3$: $y \le 3$ gives $4$; $x = 4$: $y \le 0$ gives $1$. Total $5 + 4 + 4 + 4 + 1 = ${L.length}$.`, sol: 'Intercepts, intersection of the two slanting lines, test points, then count lattice points column by column.', scheme: [['(a) the four intercepts', 1], ['(b) meeting point (3, 3)', 1], ['(b) the four corners', 1], ['(c) test of both points', 1], ['(d) lattice count', 1]], d: 4, c: 'analysis', t: [2], time: 420 }), (Cx) => { Cx.assert(L.length === 18 && ins && out, 'lattice count 18'); Cx.model([12, 4, 3, 13, 18, 5]); });
}
{
  const hs = [half(0, 1, '>=', 0), half(-2, 1, '<=', 0), half(1, 1, '<=', 9)];
  const ps = corners(hs);
  const sh = ps.reduce((a, p, i) => a + (num(p[0]) * num(ps[(i + 1) % ps.length][1]) - num(ps[(i + 1) % ps.length][0]) * num(p[1])), 0) / 2;
  const L = lattice(hs, -2, 12, -2, 12);
  const t1 = holds2(hs[1], fr(5), fr(1)), t2 = holds2(hs[2], fr(0), fr(0));
  must(ps.length === 3 && sh === 27 && ps.some((p) => num(p[0]) === 3 && num(p[1]) === 6) && t1 && t2, 'l05');
  Q('l05', mk.long({ stem: r`A region is described by $y \ge 0$, $y \le 2x$ and $x + y \le 9$ (boundaries included).\n\n(a) For $y \le 2x$ the origin lies on the boundary line. Use the point $(5, 1)$ to decide which side to shade, and use the origin for $x + y \le 9$.\n\n(b) Find the corner points of the region.\n\n(c) Find its area.\n\n(d) How many points with whole-number coordinates lie in the region?`, model: r`**(a)** $y \le 2x$: at $(5, 1)$, $1 \le 10$ is true, so shade the side containing $(5, 1)$, that is below the line $y = 2x$. $x + y \le 9$: at the origin $0 \le 9$ is true, so shade the side containing the origin.\n\n**(b)** $y = 0$ meets $y = 2x$ at $(0, 0)$ and meets $x + y = 9$ at $(9, 0)$. The lines $y = 2x$ and $x + y = 9$ meet where $3x = 9$: $x = 3$, $y = 6$. Corners: $(0, 0)$, $(9, 0)$, $(3, 6)$.\n\n**(c)** Base $9$ on the $x$-axis and height $6$: area $= \dfrac{1}{2} \times 9 \times 6 = 27$ square units.\n\n**(d)** Column by column ($0 \le y \le \min(2x, 9 - x)$): $x = 0$: $1$ point; $x = 1$: $3$; $x = 2$: $5$; $x = 3$: $7$; $x = 4$: $6$; $x = 5$: $5$; $x = 6$: $4$; $x = 7$: $3$; $x = 8$: $2$; $x = 9$: $1$. Total $${L.length}$.`, sol: 'Test points, corners from pairs of lines, area from base and height, then column counting.', scheme: [['(a) shading sides decided by tests', 1], ['(b) the three corners', 1.5], ['(c) area 27', 1], ['(d) lattice count', 1.5]], d: 4, c: 'analysis', t: [2], time: 420 }), (Cx) => { Cx.assert(sh === 27 && L.length === 37, 'area 27, 37 lattice points'); Cx.model([9, 6, 27, 37]); });
}
{
  const s = S([6, 12], '>=', [0, 70]);
  must(true, '');
  const lo = S([6, 12], '>=', [0, 70]), hi = S([6, 12], '<=', [0, 94]);
  const I = both(lo, hi), ints = intsWhere((x) => lo.pred(x) && hi.pred(x), -10, 60);
  conj(lo, hi);
  const per = ints.map((x) => 2 * ((2 * x + 5) + (x + 1)));
  must(ivTex(I) === '[\\dfrac{29}{3}, \\dfrac{41}{3}]' && ints.join() === '10,11,12,13' && per.join() === '72,78,84,90' && 6 * 9 + 12 < 70 && 6 * 14 + 12 > 94, 'l06');
  Q('l06', mk.long({ stem: r`An imagined notice board is a rectangle with length $(2x + 5)$ cm and breadth $(x + 1)$ cm. Its perimeter must be at least $70$ cm and at most $94$ cm.\n\n(a) Write the perimeter in terms of $x$.\n\n(b) Form a double inequality and solve it.\n\n(c) List the whole-number values of $x$ that are possible and the perimeter for each.`, model: r`**(a)** Perimeter $= 2[(2x + 5) + (x + 1)] = 2(3x + 6) = 6x + 12$ cm.\n\n**(b)** $70 \le 6x + 12 \le 94$. Subtract $12$: $58 \le 6x \le 82$. Divide by $6$ (positive): $\dfrac{29}{3} \le x \le \dfrac{41}{3}$, that is $9.67 \le x \le 13.67$. Solution set: $${ivTex(I)}$.\n\n**(c)** The whole numbers in this range are $x = 10, 11, 12, 13$, with perimeters $72$, $78$, $84$ and $90$ cm. ($x = 9$ gives $66 < 70$ and $x = 14$ gives $96 > 94$.)`, sol: 'Perimeter first, then both limits together, then test the whole numbers beside the end points.', scheme: [['(a) perimeter 6x + 12', 1], ['(b) 70 <= 6x + 12 <= 94', 1], ['(b) 29/3 <= x <= 41/3', 1.5], ['(c) the four whole numbers', 1], ['(c) perimeters 72, 78, 84, 90', 0.5]], d: 3, c: 'application', t: [1], time: 330 }), (Cx) => { Cx.assert(per.join() === '72,78,84,90', 'perimeters'); Cx.model([12, 58, 82, 10, 13, 72, 78, 84, 90]); });
}
{
  const P = S([3, -5], '>=', [0, 4]), Qn = S([-2, 12], '>', [0, 2]), Rr = S([1, 1], '<=', [3, -7]);
  const pq = both(P, Qn), qr = both(Qn, Rr), pqr = andIv(pq, Rr.iv);
  const ints = intsWhere((x) => P.pred(x) && Qn.pred(x) && Rr.pred(x), -40, 40);
  agree((x) => P.pred(x) && Qn.pred(x) && Rr.pred(x), [pqr]);
  must(P.ivT === '[3, \\infty)' && Qn.ivT === '(-\\infty, 5)' && Rr.ivT === '[4, \\infty)' && ivTex(pq) === '[3, 5)' && ivTex(qr) === '[4, 5)' && ints.join() === '4', 'l07');
  Q('l07', mk.long({ stem: r`Let $P = \{x \in \mathbb{R} : 3x - 5 \ge 4\}$, $Q = \{x \in \mathbb{R} : 12 - 2x > 2\}$ and $R = \{x \in \mathbb{R} : x + 1 \le 3x - 7\}$.\n\n(a) Write $P$, $Q$ and $R$ as intervals.\n\n(b) Find $P \cap Q$ and $Q \cap R$.\n\n(c) Find all integers in $P \cap Q \cap R$.`, model: r`**(a)** $P$: $3x \ge 9$, so $x \ge 3$ and $P = ${P.ivT}$. $Q$: $-2x > -10$, so (reversing the sign) $x < 5$ and $Q = ${Qn.ivT}$. $R$: $1 + 7 \le 3x - x$, so $8 \le 2x$ and $x \ge 4$, $R = ${Rr.ivT}$.\n\n**(b)** $P \cap Q$: numbers that are at least $3$ and below $5$: $${ivTex(pq)}$. $Q \cap R$: at least $4$ and below $5$: $${ivTex(qr)}$.\n\n**(c)** $P \cap Q \cap R = [4, 5)$ because $R$ is inside $P$. The only integer with $4 \le x < 5$ is $4$.`, sol: 'Solve each set-builder condition, then intersect the intervals; mind the reversal for Q.', scheme: [['(a) P = [3, inf)', 1], ['(a) Q = (-inf, 5) with the reversal', 1], ['(a) R = [4, inf)', 1], ['(b) both intersections', 1], ['(c) the integer 4', 1]], d: 3, c: 'analysis', t: [1], time: 360 }), (Cx) => { Cx.assert(ints.join() === '4' && ivTex(pqr) === '[4, 5)', '[4, 5), integer 4'); Cx.model([3, 5, 4]); });
}

// =============================================================== case-based
{
  const hall = S([150, 4000], '<=', [0, 10000]);
  const g = Math.max(...intsWhere(hall.pred, 0, 200));
  const cheaper = S([150, 4000], '<', [200, 2500]);
  const hallB = S([200, 2500], '<=', [0, 10000]);
  const gB = Math.max(...intsWhere(hallB.pred, 0, 200));
  must(g === 40 && cheaper.cond === 'x > 30' && gB === 37 && 2500 + 200 * 37 === 9900 && 2500 + 200 * 38 === 10100, 'c01');
  const xs = ['4000 + 150g \\le 10000', '4000 + 150g \\ge 10000', '150 + 4000g \\le 10000', '4000 + 150g < 10000'];
  caseQ('c01', {
    passage: r`The imagined Lotus Hall in a small town charges a fixed fee of ₹$4000$ plus ₹$150$ for each guest for a function. A family has a budget of ₹$10000$ and wants to know how many guests ($g$) they can invite. Another imagined hall, Harsh Mandap, charges ₹$2500$ plus ₹$200$ per guest.`,
    d: 3, c: 'application',
    model: r`(a) Option (a). (b) $40$. (c) (i) $g > 30$. Or (ii) at most $37$ guests.`,
    sol: r`(a) Cost $4000 + 150g$ must not exceed $10000$. (b) $150g \le 6000$, $g \le 40$. (c) (i) $4000 + 150g < 2500 + 200g$ gives $1500 < 50g$, $g > 30$. (ii) $2500 + 200g \le 10000$ gives $g \le 37.5$, so $37$.`,
    children: [
      child('a', mk.mcq({ stem: 'Which inequality says that the cost at Lotus Hall stays within the budget?', opts: xs.map((s) => `$${s}$`), key: 'a', sol: r`The cost is fixed fee plus per-guest charge, $4000 + 150g$, and it must not exceed $10000$: $4000 + 150g \le 10000$. Option (b) reverses the sign and (c) swaps the two amounts.`, d: 2, c: 'understanding', t: [1], time: 60 })),
      child('b', mk.num({ stem: 'What is the greatest number of guests the family can invite to Lotus Hall within the budget?', value: g, unit: 'guests', sol: r`$150g \le 10000 - 4000 = 6000$, so $g \le 40$. The greatest number is $g = 40$.`, scheme: [['40', 1]], d: 2, c: 'application', t: [1], time: 75 })),
      child('c', mk.short({ marks: 2, stem: '**(i)** For how many guests is Lotus Hall cheaper than Harsh Mandap? Form an inequality and solve it.', model: r`Lotus is cheaper when $4000 + 150g < 2500 + 200g$. Then $1500 < 50g$, so $g > 30$: for more than $30$ guests.`, sol: 'Cost of Lotus less than cost of Harsh Mandap.', scheme: [['4000 + 150g < 2500 + 200g', 1], ['g > 30', 1]], d: 3, c: 'application', t: [1], time: 110 }), [
        mk.short({ marks: 2, stem: '**(ii)** Find the greatest number of guests the family can invite to Harsh Mandap within the same budget of ₹$10000$.', model: r`$2500 + 200g \le 10000$ gives $200g \le 7500$, so $g \le 37.5$. The greatest whole number is $37$ guests (cost $2500 + 200 \times 37 = 9900$).`, sol: 'Budget inequality, then round down.', scheme: [['g <= 37.5', 1], ['37 guests', 1]], d: 3, c: 'application', t: [1], time: 110 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which(xs, '4000 + 150g \\le 10000');
    Cx.child('b').val(g);
    Cx.child('c').assert(cheaper.cond === 'x > 30', 'g > 30');
    Cx.child('c').model([4000, 2500, 30]);
    Cx.child('cii').assert(gB === 37, '37 guests');
    Cx.child('cii').model([37, 9900]);
  });
}
{
  // sensor reading r, temperature T = (r - 40)/5, required 2 <= T <= 8
  const lo = S([[1, 5], -8], '>=', [0, 2]), hi = S([[1, 5], -8], '<=', [0, 8]);
  const I = both(lo, hi), least = Math.min(...intsWhere((x) => lo.pred(x) && hi.pred(x), 0, 200));
  conj(lo, hi);
  const alarm = [ivF(null, fr(50), false, false), ivF(fr(80), null, false, false)];
  agree((x) => !(lo.pred(x) && hi.pred(x)), alarm);
  must(ivTex(I) === '[50, 80]' && least === 50 && ivsTex(alarm) === '(-\\infty, 50) \\cup (80, \\infty)', 'c02');
  const xs = ['2 \\le \\dfrac{r - 40}{5} \\le 8', '2 \\le \\dfrac{r + 40}{5} \\le 8', '2 \\le 5r - 40 \\le 8', '2 < \\dfrac{r - 40}{5} < 8'];
  caseQ('c02', {
    passage: r`An imagined cold-storage room must stay between $2$ and $8$ degrees Celsius, both limits allowed. Its sensor shows a reading $r$ (a whole-number unit) and the temperature is $T = \dfrac{r - 40}{5}$ degrees Celsius.`,
    d: 3, c: 'application',
    model: r`(a) Option (a). (b) $50$. (c) (i) $[50, 80]$. Or (ii) $(-\infty, 50) \cup (80, \infty)$.`,
    sol: r`(a) $2 \le T \le 8$ with $T = \dfrac{r - 40}{5}$. (b) $10 \le r - 40$ gives $r \ge 50$. (c) (i) $10 \le r - 40 \le 40$, so $50 \le r \le 80$. (ii) The alarm rings when $r < 50$ or $r > 80$.`,
    children: [
      child('a', mk.mcq({ stem: 'Which double inequality gives the sensor readings $r$ for which the room is within the allowed range?', opts: xs.map((s) => `$${s}$`), key: 'a', sol: r`Substitute $T$: $2 \le \dfrac{r - 40}{5} \le 8$. Both limits are allowed, so the signs are $\le$ (option (d) uses strict signs), and $r - 40$ is divided by $5$ (not multiplied).`, d: 2, c: 'understanding', t: [1], time: 70 })),
      child('b', mk.num({ stem: 'What is the smallest whole-number sensor reading $r$ for which the room is within the allowed range?', value: least, sol: r`$2 \le \dfrac{r - 40}{5}$ gives $10 \le r - 40$, so $r \ge 50$. The smallest reading is $r = 50$.`, scheme: [['50', 1]], d: 2, c: 'application', t: [1], time: 75 })),
      child('c', mk.short({ marks: 2, stem: '**(i)** Solve the double inequality from part (a) and write the allowed readings as an interval.', model: r`Multiply every part by $5$: $10 \le r - 40 \le 40$. Add $40$: $50 \le r \le 80$. The allowed readings form the interval $[50, 80]$.`, sol: 'Multiply by the positive 5, then add 40 to all parts.', scheme: [['10 <= r - 40 <= 40', 1], ['[50, 80]', 1]], d: 3, c: 'application', t: [1], time: 110 }), [
        mk.short({ marks: 2, stem: '**(ii)** An alarm rings when the temperature is below $2$ or above $8$ degrees. Write the readings $r$ that ring it, as a union of intervals.', model: r`Below $2$ degrees: $\dfrac{r - 40}{5} < 2$, so $r < 50$. Above $8$ degrees: $\dfrac{r - 40}{5} > 8$, so $r > 80$. The alarm readings are $(-\infty, 50) \cup (80, \infty)$.`, sol: 'Convert each temperature condition to a reading condition; "or" is a union.', scheme: [['r < 50', 1], ['r > 80 and the union', 1]], d: 3, c: 'application', t: [1], time: 110 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which(xs, '2 \\le \\dfrac{r - 40}{5} \\le 8');
    Cx.child('b').val(least);
    Cx.child('c').assert(ivTex(I) === '[50, 80]', '[50, 80]');
    Cx.child('c').model([10, 40, 50, 80]);
    Cx.child('cii').assert(ivsTex(alarm) === '(-\\infty, 50) \\cup (80, \\infty)', 'union');
    Cx.child('cii').model([50, 80]);
  });
}
{
  const adult = ivF(fr(15), fr(40), false, true), kid = ivF(fr(5), fr(25), true, false);
  const common = andIv(adult, kid);
  const n = intsWhere((x) => inF(common, x), 0, 60);
  const unionI = ivF(fr(5), fr(40), true, true);
  const adultOnly = ivF(fr(25), fr(40), true, true);
  agree((x) => inF(adult, x) || inF(kid, x), [unionI]);
  agree((x) => inF(adult, x) && !inF(kid, x), [adultOnly]);
  must(ivTex(common) === '(15, 25)' && n.length === 9 && ivTex(unionI) === '[5, 40]', 'c03');
  const xs = ['(15, 25)', '(15, 25]', '[5, 40]', '[25, 40]'];
  caseQ('c03', {
    passage: r`An imagined pharmacy leaflet lists a safe dose $d$ mg of a cough syrup (a made-up product): for adults $15 < d \le 40$ and for children $5 \le d < 25$. A pharmacist wants a single dose that is safe for both groups.`,
    d: 4, c: 'analysis',
    model: r`(a) Option (a). (b) $9$. (c) (i) $[5, 40]$. Or (ii) $[25, 40]$.`,
    sol: r`(a) Intersection of $(15, 40]$ and $[5, 25)$ is $(15, 25)$. (b) The whole numbers $16, \dots, 24$ number $9$. (c) (i) Union: $[5, 25) \cup (15, 40] = [5, 40]$. (ii) Adults but not children: $25 \le d \le 40$.`,
    children: [
      child('a', mk.mcq({ stem: 'Which interval gives the doses that are safe for both adults and children?', opts: xs.map((s) => `$${s}$`), key: 'a', sol: r`A dose must be above $15$ (adults, excluded) and below $25$ (children, excluded), so it lies in $(15, 25)$. Option (b) wrongly includes $25$, which children may not take, and (c) is the union of the two ranges.`, d: 3, c: 'analysis', t: [1], time: 80 })),
      child('b', mk.num({ stem: 'How many whole-number doses (in mg) are safe for both groups?', value: n.length, unit: 'doses', sol: r`The whole numbers strictly between $15$ and $25$ are $16, 17, \dots, 24$, and $24 - 16 + 1 = 9$.`, scheme: [['9', 1]], d: 2, c: 'application', t: [1], time: 80 })),
      child('c', mk.short({ marks: 2, stem: '**(i)** Write, as a single interval, every dose that is safe for at least one of the two groups.', model: r`Children: $[5, 25)$; adults: $(15, 40]$. The two ranges overlap, so together they cover $[5, 40]$ (the end point $5$ is included from the children's range and $40$ from the adult range).`, sol: 'Union of two overlapping intervals.', scheme: [['The ranges overlap', 1], ['[5, 40]', 1]], d: 3, c: 'analysis', t: [1], time: 110 }), [
        mk.short({ marks: 2, stem: '**(ii)** Write, as an interval, the doses that are safe for adults but not safe for children.', model: r`Adults: $(15, 40]$. Remove the children's doses $[5, 25)$. What remains of the adult range is $25 \le d \le 40$, the interval $[25, 40]$ ($25$ is not safe for children, so it stays).`, sol: 'Adult range minus children range.', scheme: [['Remove [5, 25) from (15, 40]', 1], ['[25, 40]', 1]], d: 4, c: 'analysis', t: [1], time: 120 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which(xs, ivTex(common));
    Cx.child('b').val(n.length);
    Cx.child('c').assert(ivTex(unionI) === '[5, 40]', '[5, 40]');
    Cx.child('c').model([5, 40]);
    Cx.child('cii').assert(ivTex(adultOnly) === '[25, 40]', '[25, 40]');
    Cx.child('cii').model([25, 40]);
  });
}
{
  const hs = [half(2, 3, '<=', 120), half(1, 1, '>=', 50)];
  const yint = meet(hs[0], half(1, 0, '=', 0));
  const p1 = hs.every((h) => holds2(h, fr(40), fr(10))), p2 = hs.every((h) => holds2(h, fr(25), fr(30)));
  const cor = meet(hs[0], hs[1]);
  must(num(yint[1]) === 40 && p1 && !p2 && num(cor[0]) === 30 && num(cor[1]) === 20 && !holds2(hs[0], fr(25), fr(30)), 'c04');
  const xs = ['2x + 3y \\le 120 and x + y \\ge 50', '2x + 3y \\ge 120 and x + y \\le 50', '3x + 2y \\le 120 and x + y \\ge 50', '2x + 3y \\le 120 and x + y \\le 50'];
  caseQ('c04', {
    passage: r`An imagined school canteen makes $x$ idlis and $y$ dosas in a batch (whole numbers). One idli needs $2$ minutes on the cooker and one dosa needs $3$ minutes, and the cooker can run for at most $120$ minutes. The canteen must also make at least $50$ items in all.`,
    d: 3, c: 'application',
    model: r`(a) Option (a). (b) $40$. (c) (i) $(40, 10)$ is possible; $(25, 30)$ is not. Or (ii) the corner is $(30, 20)$.`,
    sol: r`(a) $2x + 3y \le 120$ and $x + y \ge 50$. (b) $x = 0$: $3y = 120$, $y = 40$. (c) (i) $(40, 10)$: $110 \le 120$ and $50 \ge 50$. $(25, 30)$: $140 > 120$. (ii) $x = 50 - y$ gives $100 + y = 120$, so $y = 20$, $x = 30$.`,
    children: [
      child('a', mk.mcq({ stem: 'Which pair of inequalities describes the cooker time and the number of items?', opts: xs.map((s) => s.split(' and ').map((p) => `$${p}$`).join(' and ')), key: 'a', sol: r`Cooker time is $2x + 3y$ minutes and must be at most $120$; the number of items $x + y$ must be at least $50$. Option (c) swaps the times, and (b) and (d) use the wrong direction for a limit.`, d: 2, c: 'application', t: [2], time: 80 })),
      child('b', mk.num({ stem: 'If only dosas are made, what is the greatest number of dosas the cooker time allows?', value: num(yint[1]), unit: 'dosas', sol: r`With $x = 0$ the cooker condition is $3y \le 120$, so $y \le 40$. The greatest number is $y = 40$.`, scheme: [['40', 1]], d: 2, c: 'application', t: [2], time: 70 })),
      child('c', mk.short({ marks: 2, stem: '**(i)** Decide whether the plans $(x, y) = (40, 10)$ and $(25, 30)$ are possible. Show the values you compute.', model: r`$(40, 10)$: $2(40) + 3(10) = 110 \le 120$ and $40 + 10 = 50 \ge 50$, so it is possible.\n\n$(25, 30)$: $2(25) + 3(30) = 140 > 120$, so it is not possible.`, sol: 'Substitute into both inequalities.', scheme: [['(40, 10) satisfies both', 1], ['(25, 30) fails the time condition', 1]], d: 2, c: 'application', t: [2], time: 110 }), [
        mk.short({ marks: 2, stem: '**(ii)** Find the point where the lines $2x + 3y = 120$ and $x + y = 50$ meet.', model: r`From $x + y = 50$, $x = 50 - y$. Then $2(50 - y) + 3y = 120$, so $100 + y = 120$ and $y = 20$, $x = 30$. The lines meet at $(30, 20)$.`, sol: 'Substitute x = 50 - y.', scheme: [['y = 20', 1], ['Point (30, 20)', 1]], d: 3, c: 'application', t: [2], time: 110 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which(xs, '2x + 3y \\le 120 and x + y \\ge 50');
    Cx.child('b').val(num(yint[1]));
    Cx.child('c').assert(p1 && !p2, '(40, 10) yes, (25, 30) no');
    Cx.child('c').model([110, 120, 140, 50]);
    Cx.child('cii').assert(num(cor[0]) === 30 && num(cor[1]) === 20, '(30, 20)');
    Cx.child('cii').model([30, 20, 100, 120]);
  });
}
{
  const hs = [half(0, 1, '>=', 0), half(-1, 1, '<=', 0), half(1, 1, '<=', 8)];
  const ps = corners(hs);
  const sh = ps.reduce((a, p, i) => a + (num(p[0]) * num(ps[(i + 1) % ps.length][1]) - num(ps[(i + 1) % ps.length][0]) * num(p[1])), 0) / 2;
  const L = lattice(hs, -2, 12, -2, 12);
  const opt = [[5, 2], [2, 5], [6, 3], [4, 5]];
  const insd = opt.map(([x, y]) => hs.every((h) => holds2(h, fr(x), fr(y))));
  const e1 = hs.every((h) => holds2(h, fr(5), fr(3))), on = onLine(hs[2], fr(5), fr(3)), e2 = hs.every((h) => holds2(h, fr(5), fr(4)));
  must(ps.length === 3 && sh === 16 && insd.join() === 'true,false,false,false' && e1 && on && !e2 && L.length === 25, 'c05');
  caseQ('c05', {
    passage: r`An imagined garden bed is laid out on a grid of metre squares. Its boundary is described by the three conditions $y \ge 0$, $y \le x$ and $x + y \le 8$, where $x$ and $y$ are the coordinates in metres of a point on the grid from a corner post at the origin.`,
    d: 4, c: 'analysis',
    model: r`(a) Option (a). (b) $16$. (c) (i) There are $${L.length}$ grid points. Or (ii) $(5, 3)$ lies on $x + y = 8$ and in the region; $(5, 4)$ gives $9 > 8$, outside.`,
    sol: r`(a) $(5, 2)$: $2 \ge 0$, $2 \le 5$, $7 \le 8$. (b) The corners are $(0, 0)$, $(8, 0)$, $(4, 4)$: area $\dfrac{1}{2} \times 8 \times 4 = 16$. (c) (i) Column counts $1, 2, 3, 4, 5, 4, 3, 2, 1$ add up to $${L.length}$. (ii) $5 + 3 = 8$ and $3 \le 5$.`,
    children: [
      child('a', mk.mcq({ stem: 'Which of these grid points lies inside the bed (boundary included)?', opts: ['$(5, 2)$', '$(2, 5)$', '$(6, 3)$', '$(4, 5)$'], key: 'a', sol: r`$(5, 2)$ satisfies $y \ge 0$, $y \le x$ ($2 \le 5$) and $x + y = 7 \le 8$. $(2, 5)$ fails $y \le x$, $(6, 3)$ has $x + y = 9 > 8$, and $(4, 5)$ fails $y \le x$.`, d: 3, c: 'application', t: [2], time: 80 })),
      child('b', mk.num({ stem: 'Find the area of the bed in square metres.', value: sh, unit: 'square metres', sol: r`The corners are $(0, 0)$, $(8, 0)$ and $(4, 4)$. Area $= \dfrac{1}{2} \times 8 \times 4 = 16$ square metres.`, scheme: [['16', 1]], d: 3, c: 'application', t: [2], time: 100 })),
      child('c', mk.short({ marks: 2, stem: '**(i)** Count the grid points (both coordinates whole numbers) inside the bed, boundary included. Show the count for each value of $x$.', model: r`For each $x$ the whole numbers $y$ satisfy $0 \le y \le \min(x, 8 - x)$.\n\n$x = 0$: $1$; $x = 1$: $2$; $x = 2$: $3$; $x = 3$: $4$; $x = 4$: $5$; $x = 5$: $4$; $x = 6$: $3$; $x = 7$: $2$; $x = 8$: $1$.\n\nTotal $= ${L.length}$.`, sol: 'Count y values column by column using the smaller of the two upper limits.', scheme: [['Upper limit min(x, 8 - x)', 1], ['Column counts and total', 1]], d: 4, c: 'analysis', t: [2], time: 150 }), [
        mk.short({ marks: 2, stem: '**(ii)** Show that the point $(5, 3)$ lies on the boundary $x + y = 8$ and inside the bed, while $(5, 4)$ lies outside the bed.', model: r`$(5, 3)$: $5 + 3 = 8$, so it is on the line $x + y = 8$; also $3 \ge 0$ and $3 \le 5$, so all three conditions hold.\n\n$(5, 4)$: $5 + 4 = 9 > 8$, so it breaks $x + y \le 8$ and is outside.`, sol: 'Substitute into all three conditions.', scheme: [['(5, 3) on the line and inside', 1], ['(5, 4): 9 > 8 outside', 1]], d: 3, c: 'application', t: [2], time: 110 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').assert(insd.join() === 'true,false,false,false', 'only the first point is inside');
    Cx.child('b').val(sh);
    Cx.child('c').assert(L.length === 25, 'column counts add up');
    Cx.child('c').model([L.length, 8]);
    Cx.child('cii').assert(e1 && on && !e2, '(5, 3) on the line, (5, 4) outside');
    Cx.child('cii').model([8, 9]);
  });
}
