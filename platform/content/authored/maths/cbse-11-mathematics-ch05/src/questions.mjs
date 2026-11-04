// CBSE 11 Mathematics ch05 Linear Inequalities — objective items (mcq, assertion-reason, true-false, fill-blank, numerical).
// Every key is re-solved with exact fractions (ineq.mjs): one-variable solutions are checked against the inequality at 40 000+
// rational points and beside their end points; two-variable items test points, corner points and lattice points exactly.
import { Q, mk } from './lib.mjs';
import { fr, lin, ineq1, agree, ivF, inF, andIv, emptyIv, ivTex, frTex, num, holds, flipRel, intsWhere, half, holds2, meet, corners, lattice, ptTex, range, floorF, ceilF, onLine } from './ineq.mjs';
import { r, S, optsOf, must } from './common.mjs';
import { numberLine } from './nl.mjs';
import { draw } from './ineq.mjs';

const sameIv = (I, J) => ivTex(I) === ivTex(J);

// =============================================================== MCQ
Q('m01', mk.mcq({ stem: r`A lift notice states that the total load $w$ kg may be at most $600$ kg. Which relation expresses this notice?`, opts: optsOf(['w \\le 600', 'w < 600', 'w \\ge 600', 'w > 600']), key: 'a', sol: r`"At most" allows the limit itself, so the load may equal $600$ kg: $w \le 600$. Option (b) would forbid exactly $600$ kg, and (c) and (d) set a minimum instead of a maximum.`, d: 1, c: 'recall', t: [1], time: 45 }), (Cx) => { Cx.assert(holds('<=', fr(600), fr(600)) && !holds('<=', fr(601), fr(600)), 'at most 600 includes 600, excludes 601'); Cx.key('a'); });
{
  const s = S([-3, 0], '>=', [0, 21]);
  const xs = [s.cond, s.cond.replace('\\le', '\\ge'), 'x \\le 7', 'x \\ge 7'];
  must(s.cond === 'x \\le -7', 'm02 solution x <= -7');
  Q('m02', mk.mcq({ stem: r`Both sides of $-3x \ge 21$ are divided by $-3$. The inequality that results is`, opts: optsOf(xs), key: 'a', sol: r`Dividing by a negative number reverses the sign: $x \le \dfrac{21}{-3} = -7$. Option (b) keeps the sign, and (c) and (d) lose the minus sign of the quotient.`, d: 2, c: 'understanding', t: [1], time: 60 }), (Cx) => { Cx.which(xs, s.cond); Cx.assert(s.flipped && s.x0.n === -7n, 'x0 = -7, sign reversed'); });
}
{
  const s = S([5, -9], '<', [2, 12]);
  const flipped = ivTex(ivF(s.x0, null, false, false)), closed = ivTex(ivF(null, s.x0, false, true)), slip = S([7, -9], '<', [0, 12]).ivT;
  const xs = [s.ivT, flipped, closed, slip];
  Q('m03', mk.mcq({ stem: r`For real $x$, the solution set of $5x - 9 < 2x + 12$ is`, opts: optsOf(xs), key: 'a', sol: r`Collect the $x$ terms: $5x - 2x < 12 + 9$, so $3x < 21$ and $x < 7$, which is $${s.ivT}$. Option (b) reverses the sign without a reason, (c) includes $7$ although the sign is strict, and (d) adds the $x$ terms ($7x < 21$) instead of subtracting.`, d: 2, c: 'understanding', t: [1], time: 75 }), (Cx) => { Cx.which(xs, s.ivT); Cx.assert(num(s.x0) === 7 && !s.flipped, 'x < 7'); });
}
{
  const s = S([-3, 4], '<=', [0, 19]);
  const xs = [s.ivT, ivTex(ivF(null, s.x0, false, true)), ivTex(ivF(fr(5), null, true, false)), ivTex(ivF(s.x0, null, false, false))];
  Q('m04', mk.mcq({ stem: r`The solution set of $4 - 3x \le 19$ over the real numbers is`, opts: optsOf(xs), key: 'a', sol: r`$-3x \le 15$. Dividing by $-3$ reverses the sign: $x \ge -5$, so the set is $${s.ivT}$. Option (b) forgets to reverse the sign, (c) mishandles the sign of the quotient, and (d) drops the end point $-5$ although the original sign is $\le$.`, d: 2, c: 'understanding', t: [1], time: 75 }), (Cx) => { Cx.which(xs, s.ivT); Cx.assert(s.flipped && num(s.x0) === -5, 'x >= -5'); });
}
{
  const s = S([[3, 4], [-1, 2]], '>', [[1, 3], [1, 3]]);
  const wrong = S([3, -2], '>', [1, 1]).ivT; // multiplied only the x terms' sides carelessly: 3x - 2 > x + 1
  const xs = [s.ivT, wrong, ivTex(ivF(null, s.x0, false, false)), ivTex(ivF(s.x0, null, true, false))];
  Q('m05', mk.mcq({ stem: r`Which interval gives all real $x$ with $\dfrac{3x - 2}{4} > \dfrac{x + 1}{3}$?`, opts: optsOf(xs), key: 'a', sol: r`Multiply both sides by $12$, a positive number: $3(3x - 2) > 4(x + 1)$, so $9x - 6 > 4x + 4$ and $5x > 10$, giving $x > 2$, that is $${s.ivT}$. Option (b) drops the denominators without multiplying the right side by $4$ and the left by $3$.`, d: 3, c: 'application', t: [1], time: 100 }), (Cx) => { Cx.which(xs, s.ivT); Cx.assert(num(s.x0) === 2 && s.rel2 === '>', 'x > 2'); });
}
{
  const I = ivF(fr(-1), fr(4), false, true);
  const nl = numberLine({ from: -3, to: 6, rows: [{ tag: 'solution set', ivs: [draw(I)] }] }, 'The open circle at minus one means minus one is excluded; the filled circle at four means four is included.', { lead: 'Solution set of an inequality.' });
  const xs = ['(-1, 4]', '[-1, 4)', '(-1, 4)', '[-1, 4]'];
  Q('m06', mk.mcq({ stem: r`The number line below shows the solution set of an inequality in the real number $x$. Which interval does it show?`, assets: [nl], opts: optsOf(xs), key: 'a', sol: r`An open circle at $-1$ means $-1$ is not in the set, and a filled circle at $4$ means $4$ is in it, so the set is $${ivTex(I)}$. The other options swap or change the kind of end point.`, d: 2, c: 'understanding', t: [1], time: 60 }), (Cx) => { Cx.which(xs, ivTex(I)); Cx.assert(!inF(I, fr(-1)) && inF(I, fr(4)) && inF(I, fr(0)), 'membership of the end points'); });
}
{
  const I = ivF(fr(3), null, true, false);
  must(inF(I, fr(3)) && inF(I, fr(4)) && !inF(I, fr(2)), 'x >= 3 includes 3 and goes right');
  Q('m07', mk.mcq({ stem: r`How is the solution set of $x \ge 3$ drawn on a number line for real $x$?`, opts: ['A filled circle at $3$ with the thick line going to the right', 'An open circle at $3$ with the thick line going to the right', 'A filled circle at $3$ with the thick line going to the left', 'An open circle at $3$ with the thick line going to the left'], key: 'a', sol: r`The sign $\ge$ includes $3$, so the circle is filled, and the numbers larger than $3$ lie to the right, so the thick line goes to the right.`, d: 1, c: 'recall', t: [1], time: 45 }), (Cx) => { Cx.assert(inF(I, fr(3)) && inF(I, fr(10)) && !inF(I, fr(1)), 'x >= 3: includes 3, extends right'); Cx.key('a'); });
}
{
  const p = (x) => holds('<', fr(-3), add2(x)) && holds('<=', add2(x), fr(9));
  function add2(x) { return fr(2 * Number(x.n) + Number(x.d), Number(x.d)); } // 2x + 1 for integer x (d = 1)
  const sol = intsWhere(p, -20, 20), strictBoth = intsWhere((x) => holds('<', fr(-3), add2(x)) && holds('<', add2(x), fr(9))), closedBoth = intsWhere((x) => holds('<=', fr(-3), add2(x)) && holds('<=', add2(x), fr(9)));
  must(sol.join() === '-1,0,1,2,3,4' && strictBoth.length === 5 && closedBoth.length === 7, 'm08 counts');
  const vals = [sol.length, strictBoth.length, closedBoth.length, 4];
  Q('m08', mk.mcq({ stem: r`How many integers $x$ satisfy $-3 < 2x + 1 \le 9$?`, opts: vals.map((v) => `$${v}$`), key: 'a', sol: r`Subtract $1$: $-4 < 2x \le 8$; divide by $2$: $-2 < x \le 4$. The integers are $-1, 0, 1, 2, 3, 4$, so there are $6$ of them. Taking both ends as strict gives $5$, and both as included gives $7$.`, d: 3, c: 'application', t: [1], time: 90 }), (Cx) => { Cx.which(vals, sol.length); });
}
{
  const s = S([-2, 7], '<', [3, -14]);
  const sol = intsWhere(s.pred, -30, 30), least = Math.min(...sol);
  must(least === 5 && frTex(s.x0) === '\\dfrac{21}{5}' && s.rel2 === '>', 'm09');
  const vals = [least, floorF(s.x0), least + 1, 3];
  Q('m09', mk.mcq({ stem: r`What is the smallest integer that satisfies $7 - 2x < 3x - 14$?`, opts: vals.map((v) => `$${v}$`), key: 'a', sol: r`Move the terms: $21 < 5x$, so $x > \dfrac{21}{5} = 4.2$. The sign is strict, so the least integer greater than $4.2$ is $5$. The value $4$ comes from rounding $4.2$ down, which does not satisfy the inequality.`, d: 3, c: 'application', t: [1], time: 90 }), (Cx) => { Cx.which(vals, least); Cx.assert(!s.pred(fr(4)) && s.pred(fr(5)), '4 fails, 5 works'); });
}
{
  const s = S([[5, 6], 0], '<=', [0, 11]);
  const g = Math.max(...intsWhere(s.pred, -30, 30));
  must(g === 13 && frTex(s.x0) === '\\dfrac{66}{5}', 'm10');
  const vals = [g, g + 1, g - 1, 11];
  Q('m10', mk.mcq({ stem: r`Among all integers permitted by the sum-of-fractions condition $\dfrac{x}{2} + \dfrac{x}{3} \le 11$, the largest one is`, opts: vals.map((v) => `$${v}$`), key: 'a', sol: r`Add the fractions: $\dfrac{5x}{6} \le 11$, so $x \le \dfrac{66}{5} = 13.2$. The greatest integer not exceeding $13.2$ is $13$. Rounding up to $14$ breaks the inequality.`, d: 3, c: 'application', t: [1], time: 90 }), (Cx) => { Cx.which(vals, g); Cx.assert(s.pred(fr(13)) && !s.pred(fr(14)), '13 works, 14 fails'); });
}
{
  const a = S([3, -1], '>=', [0, 8]), b = S([2, 5], '<', [0, 21]), both = andIv(a.iv, b.iv);
  agree((x) => a.pred(x) && b.pred(x), [both]);
  const xs = [ivTex(both), '(3, 8]', '(3, 8)', '[3, 8]'];
  Q('m11', mk.mcq({ stem: r`For real $x$, the conditions $3x - 1 \ge 8$ and $2x + 5 < 21$ must both hold. The set of such $x$ is`, opts: optsOf(xs), key: 'a', sol: r`The first gives $3x \ge 9$, so $x \ge 3$; the second gives $2x < 16$, so $x < 8$. Both hold exactly for $${ivTex(both)}$, with $3$ included and $8$ excluded. The other options change the kind of an end point.`, d: 2, c: 'understanding', t: [1], time: 90 }), (Cx) => { Cx.which(xs, ivTex(both)); });
}
{
  const a = S([1, -4], '>', [0, 1]), b = S([2, 0], '<', [0, 6]), both = andIv(a.iv, b.iv);
  must(emptyIv(both), 'm12 empty');
  agree((x) => a.pred(x) && b.pred(x), []);
  const xs = ['\\varnothing', '(3, 5)', '(5, \\infty)', '(-\\infty, 3)'];
  Q('m12', mk.mcq({ stem: r`The conditions $x - 4 > 1$ and $2x < 6$ are required together for real $x$. The set of such $x$ is`, opts: optsOf(xs), key: 'a', sol: r`The first gives $x > 5$ and the second gives $x < 3$. No number is both larger than $5$ and smaller than $3$, so the set is empty, $\varnothing$. Option (b) is the interval between $3$ and $5$, which is where the two conditions would meet if their signs were reversed.`, d: 3, c: 'analysis', t: [1], time: 90 }), (Cx) => { Cx.which(xs, '\\varnothing'); });
}
{
  const s = S([3, 4], '<=', [0, 25]);
  const n = Math.max(...intsWhere(s.pred, 0, 60));
  must(n === 7 && 3 * n + 4 === 25, 'm13');
  const xs = ['3n + 4 \\le 25', '3n + 4 \\ge 25', '3n \\le 25 + 4', '3n + 4 < 25'];
  Q('m13', mk.mcq({ stem: r`A crate weighs $4$ kg when empty and each parcel placed in it weighs $3$ kg. The crate with $n$ parcels must not weigh more than $25$ kg. Which inequality describes this?`, opts: optsOf(xs), key: 'a', sol: r`Total weight is $4 + 3n$ kg and it must not exceed $25$ kg, so $3n + 4 \le 25$. This gives $n \le 7$, and with $7$ parcels the weight is exactly $25$ kg, which is allowed. Option (d) uses a strict sign and would forbid exactly $25$ kg.`, d: 2, c: 'application', t: [1], time: 75 }), (Cx) => { Cx.assert(n === 7, 'at most 7 parcels'); Cx.key('a'); });
}
{
  const cands = [2, -2, -4, 4];
  const target = ivF(null, fr(-4), false, false);
  const hits = cands.map((a) => S([a, 3], '>', [0, 11])).map((s) => sameIv(s.iv, target));
  must(hits.filter(Boolean).length === 1 && hits[1], 'm14 only a = -2');
  Q('m14', mk.mcq({ stem: r`For real $x$, the inequality $ax + 3 > 11$ has exactly the same solution set as $x < -4$. The value of $a$ is`, opts: cands.map((v) => `$${v}$`), key: 'b', sol: r`The inequality reduces to $ax > 8$. Its solution is $x < -4$, which has the sign reversed, so $a$ is negative and $x < \dfrac{8}{a}$ with $\dfrac{8}{a} = -4$, giving $a = -2$. Check: $-2x + 3 > 11$ gives $-2x > 8$ and $x < -4$.`, d: 4, c: 'analysis', t: [1], time: 120 }), (Cx) => { Cx.which(cands, -2); });
}
{
  const h = half(3, 2, '>', 12);
  const pts = [[4, 1], [2, 2], [1, 4], [0, 5]];
  const ins = pts.map(([x, y]) => holds2(h, fr(x), fr(y)));
  must(ins.filter(Boolean).length === 1 && ins[0], 'm15 only (4, 1)');
  Q('m15', mk.mcq({ stem: r`Which of these points lies in the half-plane $3x + 2y > 12$?`, opts: ['$(4, 1)$', '$(2, 2)$', '$(1, 4)$', '$(0, 5)$'], key: 'a', sol: r`Substitute each point: $(4, 1)$ gives $12 + 2 = 14 > 12$, true. $(2, 2)$ gives $10$, $(1, 4)$ gives $11$ and $(0, 5)$ gives $10$, all of which are less than $12$.`, d: 2, c: 'understanding', t: [2], time: 75 }), (Cx) => { Cx.assert(ins.join() === 'true,false,false,false', 'only the first option (4, 1) satisfies 3x + 2y > 12'); Cx.key('a'); });
}
{
  const h = half(2, -1, '<=', 4);
  must(holds2(h, fr(0), fr(0)) && h.rel === '<=', 'm16 origin in region, solid line');
  Q('m16', mk.mcq({ stem: r`The inequality $2x - y \le 4$ is graphed. Which statement about the graph is correct?`, opts: ['The origin is in the shaded region and the boundary line is solid', 'The origin is in the shaded region and the boundary line is dashed', 'The origin is not in the shaded region and the boundary line is solid', 'The origin is not in the shaded region and the boundary line is dashed'], key: 'a', sol: r`At the origin $2(0) - 0 = 0 \le 4$ is true, so the origin lies in the solution region. The sign is $\le$, which includes the boundary, so the line $2x - y = 4$ is solid.`, d: 2, c: 'understanding', t: [2], time: 60 }), (Cx) => { Cx.key('a'); });
}
{
  const h1 = half(2, 1, '=', 11), h2 = half(1, -1, '=', 1);
  const p = meet(h1, h2);
  must(p[0].n === 4n && p[1].n === 3n, 'm17 (4, 3)');
  const xs = ['(4, 3)', '(3, 4)', '(5, 1)', '(6, -1)'];
  must(onLine(h1, fr(5), fr(1)) && !onLine(h2, fr(5), fr(1)) && onLine(h1, fr(6), fr(-1)) && !onLine(h2, fr(6), fr(-1)), 'm17 distractors lie on one line only');
  Q('m17', mk.mcq({ stem: r`The boundary lines $2x + y = 11$ and $x - y = 1$ cross at a corner of a solution region. That corner is`, opts: optsOf(xs), key: 'a', sol: r`Add the two equations: $3x = 12$, so $x = 4$, and then $y = 11 - 8 = 3$. The point $(4, 3)$ satisfies both lines. The points $(5, 1)$ and $(6, -1)$ lie on $2x + y = 11$ only, and $(3, 4)$ lies on neither.`, d: 3, c: 'application', t: [2], time: 90 }), (Cx) => { Cx.which(xs, ptTex(p)); });
}
{
  const base = [half(1, 1, '<=', 4), half(1, 0, '>=', 1), half(0, 1, '>=', 1)];
  const L = lattice(base, -5, 10, -5, 10);
  const noMin = lattice([half(1, 1, '<=', 4), half(1, 0, '>=', 0), half(0, 1, '>=', 0)], -5, 10, -5, 10).length;
  const bigger = lattice([half(1, 1, '<=', 5), half(1, 0, '>=', 1), half(0, 1, '>=', 1)], -5, 10, -5, 10).length;
  must(L.length === 6 && noMin === 15 && bigger === 10, 'm18 counts');
  const vals = [L.length, noMin, 3, bigger];
  Q('m18', mk.mcq({ stem: r`How many lattice points (both coordinates integers) lie in the region $x + y \le 4$, $x \ge 1$, $y \ge 1$, boundary included?`, opts: vals.map((v) => `$${v}$`), key: 'a', sol: r`The region is a triangle with corners $(1, 1)$, $(3, 1)$ and $(1, 3)$. For $x = 1$ the integer values of $y$ are $1, 2, 3$; for $x = 2$ they are $1, 2$; for $x = 3$ only $1$. That is $3 + 2 + 1 = 6$ points. Counting $x, y \ge 0$ instead gives $15$, and the three corners alone give $3$.`, d: 4, c: 'analysis', t: [2], time: 120 }), (Cx) => { Cx.which(vals, L.length); });
}

// =============================================================== assertion-reason
{
  const s = S([-4, 0], '<', [0, 20]);
  must(s.cond === 'x > -5', 'ar1');
  Q('ar1', mk.ar({ a: r`For real $x$, the inequality $-4x < 20$ has the solution $x > -5$.`, r: r`Dividing both sides of an inequality by a negative number reverses the inequality sign.`, key: 'a', sol: r`A is true: $x > \dfrac{20}{-4} = -5$ (the sign reverses). R is true and is exactly the rule that turns $<$ into $>$ in this step.`, d: 2, c: 'understanding', t: [1] }), (Cx) => { Cx.assert(s.flipped && s.cond === 'x > -5', 'x > -5 after the reversal'); Cx.key('a'); });
}
{
  const s = S([2, -1], '>=', [0, 5]);
  must(s.pred(fr(3)) && !holds('>', fr(3), fr(3)), 'ar2');
  Q('ar2', mk.ar({ a: r`The number $3$ is a solution of $2x - 1 \ge 5$.`, r: r`The solution set of $2x - 1 \ge 5$ over $\mathbb{R}$ is $x > 3$.`, key: 'c', sol: r`A is true: $2(3) - 1 = 5 \ge 5$. R is false: the solution set is $x \ge 3$, which includes $3$; the sign $\ge$ keeps the end point.`, d: 2, c: 'understanding', t: [1] }), (Cx) => { Cx.assert(s.cond === 'x \\ge 3' && s.pred(fr(3)), 'x >= 3 includes 3'); Cx.key('c'); });
}
{
  const s = S([3, 4], '<', [3, 1]);
  must(s.kind === 'none', 'ar3');
  agree(s.pred, []);
  Q('ar3', mk.ar({ a: r`The inequality $3x + 4 < 3x + 1$ has real solutions.`, r: r`If the $x$ terms cancel and what remains is a false numerical statement, then no real number satisfies the inequality.`, key: 'd', sol: r`Subtracting $3x$ leaves $4 < 1$, which is false for every $x$, so A is false (the solution set is empty). R states exactly this fact and is true.`, d: 3, c: 'analysis', t: [1] }), (Cx) => { Cx.assert(s.kind === 'none', 'reduces to 4 < 1, no solution'); Cx.key('d'); });
}
{
  const s = S([1, 5], '<=', [0, 2]);
  must(s.ivT === '(-\\infty, -3]', 'ar4');
  Q('ar4', mk.ar({ a: r`The solution set of $x + 5 \le 2$ over $\mathbb{R}$ is $(-\infty, -3]$.`, r: r`The interval $(-\infty, -3]$ contains the number $-3$.`, key: 'b', sol: r`A is true: $x \le 2 - 5 = -3$. R is also true, but it only states that the end point belongs to the interval; it does not explain how the inequality $x + 5 \le 2$ leads to $x \le -3$.`, d: 3, c: 'understanding', t: [1] }), (Cx) => { Cx.assert(s.ivT === '(-\\infty, -3]' && inF(s.iv, fr(-3)), '(-inf, -3] includes -3'); Cx.key('b'); });
}
{
  const h = half(1, 1, '<', 3);
  must(holds2(h, fr(0), fr(0)), 'ar5');
  Q('ar5', mk.ar({ a: r`The origin lies in the solution region of $x + y < 3$.`, r: r`The values $x = 0$ and $y = 0$ satisfy $x + y < 3$.`, key: 'a', sol: r`Substituting $(0, 0)$ gives $0 + 0 = 0 < 3$, which is true (R). A point lies in the solution region exactly when its coordinates satisfy the inequality, so R explains A.`, d: 1, c: 'understanding', t: [2] }), (Cx) => { Cx.assert(holds2(h, fr(0), fr(0)), '0 < 3'); Cx.key('a'); });
}
{
  const h = half(2, 3, '<=', 6);
  must(onLine(h, fr(3), fr(0)) && holds2(h, fr(3), fr(0)), 'ar6');
  Q('ar6', mk.ar({ a: r`The graph of $2x + 3y \le 6$ includes its boundary line $2x + 3y = 6$.`, r: r`The boundary line is drawn dashed for every linear inequality in two variables.`, key: 'c', sol: r`A is true: points on the line give $2x + 3y = 6$, which satisfies $\le$ (for example $(3, 0)$). R is false: the line is dashed only for the strict signs $<$ and $>$, and solid for $\le$ and $\ge$.`, d: 2, c: 'understanding', t: [2] }), (Cx) => { Cx.assert(holds2(h, fr(3), fr(0)), '(3, 0) on the line satisfies <='); Cx.key('c'); });
}

// =============================================================== true-false
{
  let ok = true;
  for (let a = -5; a <= 5; a++) for (let b = a + 1; b <= 6; b++) if (!(-3 * a > -3 * b)) ok = false; // reversed for every pair a < b
  must(ok, 'tf1 reversal');
  Q('t1', mk.tf({ stem: r`If $a < b$ for real numbers $a$ and $b$, then $-3a < -3b$.`, key: 'f', sol: r`Multiplying by a negative number reverses the sign. For $a = 1$ and $b = 2$ we have $-3 > -6$, so $-3a > -3b$ in general. The statement is false.`, d: 1, c: 'understanding', t: [1] }), (Cx) => { Cx.assert(ok && !(-3 < -6), 'for 1 < 2, -3 > -6'); Cx.key('f'); });
}
{
  const a = S([4, -3], '>=', [0, 9]), b = S([1, 0], '>=', [0, 3]);
  must(ivTex(a.iv) === ivTex(b.iv), 'tf2');
  Q('t2', mk.tf({ stem: r`Over $\mathbb{R}$, the inequalities $4x - 3 \ge 9$ and $x \ge 3$ have the same solution set.`, key: 't', sol: r`$4x - 3 \ge 9$ gives $4x \ge 12$ and $x \ge 3$, the same condition. Both solution sets are $[3, \infty)$, so the statement is true.`, d: 1, c: 'understanding', t: [1] }), (Cx) => { Cx.assert(ivTex(a.iv) === ivTex(b.iv), 'both [3, inf)'); Cx.key('t'); });
}
{
  const s = S([-3, 5], '<=', [0, -1]);
  must(!s.pred(fr(-2)) && s.cond === 'x \\ge 2', 'tf3');
  Q('t3', mk.tf({ stem: r`The integer $-2$ is a solution of $5 - 3x \le -1$.`, key: 'f', sol: r`Substituting $x = -2$: $5 - 3(-2) = 11$, and $11 \le -1$ is false. In fact the solution set is $x \ge 2$, which does not contain $-2$.`, d: 2, c: 'understanding', t: [1] }), (Cx) => { Cx.assert(!s.pred(fr(-2)) && s.cond === 'x \\ge 2', 'x >= 2'); Cx.key('f'); });
}
{
  const h = half(3, -1, '<=', 1);
  must(onLine(h, fr(2), fr(5)) && holds2(h, fr(2), fr(5)), 'tf4');
  Q('t4', mk.tf({ stem: r`The point $(2, 5)$ lies on the boundary line of $3x - y \le 1$ and also belongs to the solution region of that inequality.`, key: 't', sol: r`At $(2, 5)$: $3(2) - 5 = 1$, so the point is on the line $3x - y = 1$. Since the sign is $\le$, points of the line satisfy the inequality, so the statement is true.`, d: 2, c: 'understanding', t: [2] }), (Cx) => { Cx.assert(onLine(h, fr(2), fr(5)) && holds2(h, fr(2), fr(5)), 'on the line and in the region'); Cx.key('t'); });
}
{
  const a = S([1, 0], '<', [0, 2]), b = S([1, 0], '>', [0, 5]);
  must(emptyIv(andIv(a.iv, b.iv)), 'tf5');
  agree((x) => a.pred(x) && b.pred(x), []);
  Q('t5', mk.tf({ stem: r`The two conditions $x < 2$ and $x > 5$ are satisfied together by exactly the numbers of the interval $(2, 5)$.`, key: 'f', sol: r`A number cannot be smaller than $2$ and larger than $5$ at the same time, so no real number satisfies both. The interval $(2, 5)$ would come from the reversed conditions $x > 2$ and $x < 5$. The statement is false.`, d: 2, c: 'analysis', t: [1] }), (Cx) => { Cx.assert(emptyIv(andIv(a.iv, b.iv)), 'empty'); Cx.key('f'); });
}

// =============================================================== fill-blank
Q('f1', mk.fill({ stem: r`Multiplying both sides of $x < -2$ by $-5$ gives $-5x$ ___ $10$ (write the sign).`, acc: [['>', 'greater than']], sol: r`Multiplying by a negative number reverses the sign: $x < -2$ becomes $-5x > 10$.`, d: 1, c: 'recall', t: [1] }), (Cx) => { Cx.assert(holds('>', fr(-5 * -3), fr(10)) && -3 < -2, 'x = -3 satisfies x < -2 and gives 15 > 10'); Cx.blank('>'); });
{
  const s = S([3, -2], '>', [0, 7]);
  const least = Math.min(...intsWhere(s.pred, -20, 20));
  must(least === 4 && s.x0.n === 3n, 'f2');
  Q('f2', mk.fill({ stem: r`The smallest integer in the solution set of $3x - 2 > 7$ is ___.`, acc: [['4']], sol: r`$3x > 9$ gives $x > 3$. The sign is strict, so $3$ is excluded and the smallest integer is $4$.`, d: 2, c: 'understanding', t: [1] }), (Cx) => { Cx.blank(least); });
}
{
  const s = S([2, -2], '<=', [1, 6]);
  must(s.cond === 'x \\le 8', 'f3');
  Q('f3', mk.fill({ stem: r`The solution of $2(x - 1) \le x + 6$ over $\mathbb{R}$ is $x \le$ ___.`, acc: [['8']], sol: r`Expand: $2x - 2 \le x + 6$, so $x \le 8$.`, d: 2, c: 'understanding', t: [1] }), (Cx) => { Cx.blank(num(s.x0)); });
}
{
  const I = ivF(fr(-2), fr(5), false, true);
  Q('f4', mk.fill({ stem: r`The set of real numbers $x$ with $-2 < x \le 5$ is written in interval notation as ___.`, acc: [['(-2, 5]', '(-2,5]']], sol: r`The left end $-2$ is excluded (round bracket) and the right end $5$ is included (square bracket): $(-2, 5]$.`, d: 1, c: 'recall', t: [1] }), (Cx) => { Cx.assert(ivTex(I) === '(-2, 5]', 'interval text'); Cx.blank('(-2, 5]'); });
}
{
  const h = half(5, 2, '>=', 20), p = meet(h, half(0, 1, '=', 0));
  must(p[0].n === 4n && p[0].d === 1n, 'f5');
  Q('f5', mk.fill({ stem: r`The boundary line of $5x + 2y \ge 20$ cuts the $x$-axis at $x =$ ___.`, acc: [['4']], sol: r`On the $x$-axis $y = 0$, so $5x = 20$ and $x = 4$.`, d: 1, c: 'understanding', t: [2] }), (Cx) => { Cx.blank(num(p[0])); });
}

// =============================================================== numerical
{
  const p = (x) => holds('<', fr(-17), fr(3 * Number(x.n) + 4)) && holds('<=', fr(3 * Number(x.n) + 4), fr(13));
  const xs = intsWhere(p, -40, 40), sum = xs.reduce((a, b) => a + b, 0);
  must(xs.join() === '-6,-5,-4,-3,-2,-1,0,1,2,3' && sum === -15, 'n1');
  Q('n1', mk.num({ stem: r`Find the sum of all the integers $x$ that satisfy $-17 < 3x + 4 \le 13$.`, value: sum, sol: r`Subtract $4$: $-21 < 3x \le 9$; divide by $3$: $-7 < x \le 3$. The integers are $-6, -5, \dots, 3$. The terms $-3, \dots, 3$ cancel in pairs, leaving $-6 - 5 - 4 = -15$. Sum $= -15$.`, scheme: [['Reduce to -7 < x <= 3', 1], ['List the integers and add: -15', 1]], marks: 2, d: 3, c: 'application', t: [1], time: 120 }), (Cx) => { Cx.val(sum); });
}
{
  const s = S([150, 1800], '<=', [0, 5000]);
  const t = Math.max(...intsWhere(s.pred, 0, 100));
  must(t === 21 && 1800 + 150 * 21 <= 5000 && 1800 + 150 * 22 > 5000, 'n2');
  Q('n2', mk.num({ stem: r`An imagined hostel tank holds $5000$ litres. It already contains $1800$ litres and a pump adds $150$ litres every minute. Find the greatest whole number of minutes the pump can run without the tank overflowing.`, value: t, unit: 'minutes', sol: r`After $t$ minutes the tank holds $1800 + 150t$ litres, and $1800 + 150t \le 5000$ gives $150t \le 3200$, so $t \le 21.33$. The greatest whole number of minutes is $t = 21$ (then the tank holds $4950$ litres).`, scheme: [['Correct value', 1]], d: 2, c: 'application', t: [1], time: 100 }), (Cx) => { Cx.val(t); });
}
{
  const s = S([6, 3], '>', [5, 20]);
  const least = Math.min(...intsWhere(s.pred, -50, 50));
  must(least === 18 && s.x0.n === 17n, 'n3');
  Q('n3', mk.num({ stem: r`Find the least integer $x$ for which $3(2x + 1) > 5x + 20$.`, value: least, sol: r`Expand: $6x + 3 > 5x + 20$, so $x > 17$. The sign is strict, so $17$ is excluded and the least integer is $x = 18$.`, scheme: [['Correct value', 1]], d: 2, c: 'understanding', t: [1], time: 75 }), (Cx) => { Cx.val(least); });
}
{
  const hs = [half(2, 1, '<=', 8), half(1, 0, '>=', 0), half(0, 1, '>=', 0)];
  const ps = corners(hs);
  const sh = ps.reduce((a, p, i) => a + (num(p[0]) * num(ps[(i + 1) % ps.length][1]) - num(ps[(i + 1) % ps.length][0]) * num(p[1])), 0) / 2;
  must(ps.length === 3 && sh === 16, 'n4 area');
  Q('n4', mk.num({ stem: r`The solution region of $2x + y \le 8$, $x \ge 0$, $y \ge 0$ is a triangle. Find its area in square units.`, value: sh, unit: 'square units', sol: r`The line $2x + y = 8$ cuts the axes at $(4, 0)$ and $(0, 8)$, so the region has corners $(0, 0)$, $(4, 0)$ and $(0, 8)$. Area $= \dfrac{1}{2} \times 4 \times 8 = 16$ square units.`, scheme: [['Corners (0,0), (4,0), (0,8)', 1], ['Area 16', 1]], marks: 2, d: 3, c: 'application', t: [2], time: 120 }), (Cx) => { Cx.val(sh); });
}
{
  const p = meet(half(4, 1, '=', 23), half(1, -2, '=', -1));
  must(p[0].n === 5n && p[1].n === 3n, 'n5');
  Q('n5', mk.num({ stem: r`The boundary lines $4x + y = 23$ and $x - 2y = -1$ meet at a corner of a solution region. Find the $y$-coordinate of that corner.`, value: num(p[1]), sol: r`From $x - 2y = -1$ we get $x = 2y - 1$. Substituting: $4(2y - 1) + y = 23$, so $9y = 27$ and $y = 3$ (and $x = 5$).`, scheme: [['Correct value', 1]], d: 3, c: 'application', t: [2], time: 100 }), (Cx) => { Cx.val(num(p[1])); });
}
