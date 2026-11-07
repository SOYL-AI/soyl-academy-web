// ISC 11 Mathematics ch06 Quadratic Equations - objective items (mcq, assertion-reason, true-false, fill-blank, numerical)
// with independent re-solve checks: every root is substituted exactly (ring Q[s], s^2 = d), every symmetric function is
// computed from the actual roots, every formed equation is tested at the roots it must have.
import { Q, mk } from './lib.mjs';
import { r, range, fr, fval, fstr, fadd, fsub, fmul, fdiv, fneg, feq, fpow, E, ezero, polyAt, isRoot, isPmRoot, hasRoots, einv, verifyQuad, quad, nature, disc, powerSums, rootsPow, rootsProd, vertex, qval, near, formEq, intRoots } from './qe.mjs';

const pm = isPmRoot;

// =============================================================== MCQ
Q('m01', mk.mcq({ stem: r`A quadratic equation with real coefficients has two non-real roots exactly when its discriminant is`, opts: ['positive', 'zero', 'negative', 'a perfect square'], key: 'c', sol: r`The roots are $\dfrac{-b \pm \sqrt{D}}{2a}$. A negative $D$ makes $\sqrt{D}$ imaginary, so the roots are non-real (and conjugate). A positive $D$ gives two real roots and $D = 0$ gives one repeated real root.`, d: 1, c: 'recall', t: [1, 3], time: 30 }), (C) => { C.assert(nature(1, 1, 1) === 'non-real' && nature(1, -2, 1) === 'equal' && nature(1, -3, 1) === 'irrational' && nature(1, -3, 2) === 'rational', 'D < 0 is the non-real case'); C.key('c'); });
{
  const co = [1, -4, 13];
  Q('m02', mk.mcq({ stem: r`The roots of $x^2 - 4x + 13 = 0$ are`, opts: [r`$2 \pm 3i$`, r`$4 \pm 6i$`, r`$-2 \pm 3i$`, r`$2 \pm 9i$`], key: 'a', sol: r`$D = 16 - 52 = -36$, so $x = \dfrac{4 \pm 6i}{2} = 2 \pm 3i$. Option (b) forgets to divide by $2a$; option (d) divides the imaginary part by $2$ but uses $\sqrt{-36} = 18i$.`, d: 2, c: 'understanding', t: [1], time: 60 }), (C) => { C.assert(disc(...co) === -36, 'D = -36'); C.which([pm(co, 2, 3, -1), pm(co, 4, 6, -1), pm(co, -2, 3, -1), pm(co, 2, 9, -1)], true); });
}
{
  const co = [3, 2, 5];
  Q('m03', mk.mcq({ stem: r`Solving $3x^2 + 2x + 5 = 0$ in the complex numbers gives $x =$`, opts: [r`$\dfrac{-1 \pm i\sqrt{14}}{3}$`, r`$\dfrac{-1 \pm i\sqrt{56}}{3}$`, r`$\dfrac{-2 \pm i\sqrt{14}}{6}$`, r`$\dfrac{1 \pm i\sqrt{14}}{3}$`], key: 'a', sol: r`$D = 4 - 60 = -56$ and $\sqrt{-56} = 2i\sqrt{14}$, so $x = \dfrac{-2 \pm 2i\sqrt{14}}{6} = \dfrac{-1 \pm i\sqrt{14}}{3}$. Options (b) and (c) skip the factor $2$ in $\sqrt{56}$ or in the numerator; (d) has the wrong sign.`, d: 2, c: 'understanding', t: [1], time: 75 }), (C) => { C.assert(disc(...co) === -56, 'D = -56'); C.which([pm(co, fr(-1, 3), fr(1, 3), -14), pm(co, fr(-1, 3), fr(2, 3), -14), pm(co, fr(-1, 3), fr(1, 6), -14), pm(co, fr(1, 3), fr(1, 3), -14)], true); });
}
Q('m04', mk.mcq({ stem: r`The roots of $12x^2 + x - 6 = 0$ are`, opts: ['real, rational and unequal', 'real, irrational and unequal', 'real and equal', 'non-real'], key: 'a', sol: r`$D = 1 + 288 = 289 = 17^2$ is positive and a perfect square, so the roots $\dfrac{-1 \pm 17}{24}$, namely $\dfrac{2}{3}$ and $-\dfrac{3}{4}$, are rational and unequal.`, d: 2, c: 'understanding', t: [3], time: 60 }), (C) => { C.assert(disc(12, 1, -6) === 289 && nature(12, 1, -6) === 'rational' && hasRoots([12, 1, -6], [fr(2, 3), fr(-3, 4)]), 'D = 289, roots 2/3 and -3/4'); C.key('a'); });
{
  const Dk = (k) => 4 * (k + 1) ** 2 - 4 * (k + 7);
  const eqK = range(-60, 60).filter((k) => Dk(k) === 0);
  Q('m05', mk.mcq({ stem: r`The roots of $x^2 + 2(k + 1)x + (k + 7) = 0$ are real and equal. The possible values of $k$ are`, opts: [r`$k = -3$ or $k = 2$`, r`$k = 3$ or $k = -2$`, r`$k = -3$ only`, r`$k = 2$ or $k = 7$`], key: 'a', sol: r`$D = 4(k + 1)^2 - 4(k + 7) = 4(k^2 + k - 6) = 4(k + 3)(k - 2)$. Equal roots need $D = 0$, so $k = -3$ or $k = 2$. Option (c) drops one factor.`, d: 3, c: 'application', t: [3], time: 100 }), (C) => { C.assert(eqK.join() === '-3,2', 'D = 0 at k = -3 and 2'); C.which([[-3, 2], [-2, 3], [-3], [2, 7]], eqK); });
}
{
  const m = 2;
  Q('m06', mk.mcq({ stem: r`The roots of $5x^2 - 11x + (2m + 1) = 0$ are reciprocals of each other. Then $m$ equals`, opts: ['$1$', '$2$', r`$\dfrac{5}{2}$`, '$3$'], key: 'b', sol: r`Reciprocal roots have product $1$, so $\dfrac{2m + 1}{5} = 1$, giving $2m + 1 = 5$ and $m = 2$. The equation becomes $5x^2 - 11x + 5 = 0$ with $D = 21 > 0$, so the roots are real.`, d: 2, c: 'understanding', t: [3], time: 75 }), (C) => { const v = verifyQuad(5, -11, 2 * m + 1); C.assert(feq(v.prod, fr(1)) && v.D === 21 && [1, 2, 2.5, 3].filter((x) => (2 * x + 1) / 5 === 1).join() === '2', 'product 1 only at m = 2'); C.which([1, 2, 2.5, 3], m); });
}
{
  const v = verifyQuad(1, -7, 3), q = quad(1, -7, 3);
  const t = fval(rootsPow(q, 2));
  Q('m07', mk.mcq({ stem: r`If $\alpha$ and $\beta$ are the roots of $x^2 - 7x + 3 = 0$, then $\alpha^2 + \beta^2$ equals`, opts: ['$43$', '$49$', '$46$', '$55$'], key: 'a', sol: r`$\alpha + \beta = 7$ and $\alpha\beta = 3$, so $\alpha^2 + \beta^2 = (\alpha + \beta)^2 - 2\alpha\beta = 49 - 6 = 43$. Option (c) subtracts $\alpha\beta$ once instead of twice; (d) adds $2\alpha\beta$.`, d: 2, c: 'understanding', t: [3], time: 60 }), (C) => { C.assert(fval(v.sum) === 7 && fval(v.prod) === 3 && t === 43, 'sum 7, product 3, sum of squares 43 from the roots'); C.which([43, 49, 46, 55], t); });
}
{
  const q = quad(2, -7, 4);
  const d2 = fval(fdiv(fr(q.D), fr(4)));
  Q('m08', mk.mcq({ stem: r`The roots $\alpha$ and $\beta$ of $2x^2 - 7x + 4 = 0$ satisfy $|\alpha - \beta| =$`, opts: [r`$\dfrac{\sqrt{17}}{2}$`, r`$\dfrac{17}{4}$`, r`$\sqrt{17}$`, r`$\dfrac{7}{2}$`], key: 'a', sol: r`$\alpha + \beta = \dfrac{7}{2}$ and $\alpha\beta = 2$, so $(\alpha - \beta)^2 = \left(\dfrac{7}{2}\right)^2 - 4 \times 2 = \dfrac{49}{4} - 8 = \dfrac{17}{4}$ and $|\alpha - \beta| = \dfrac{\sqrt{17}}{2}$. Option (b) forgets the square root; (d) is the sum.`, d: 3, c: 'application', t: [3], time: 90 }), (C) => { const s = fr(7, 2), p = fr(2); const sq = fsub(fmul(s, s), fmul(4, p)); C.assert(feq(sq, fr(17, 4)) && feq(sq, fdiv(fr(q.D), fr(4))) && d2 === 4.25, '(alpha - beta)^2 = 17/4'); C.which([Math.sqrt(4.25), 4.25, Math.sqrt(17), 3.5], Math.sqrt(d2)); });
}
{
  const q = quad(2, -3, -4), t = rootsPow(q, 3);
  Q('m09', mk.mcq({ stem: r`If $\alpha, \beta$ are the roots of $2x^2 - 3x - 4 = 0$, the value of $\alpha^3 + \beta^3$ is`, opts: [r`$\dfrac{99}{8}$`, r`$\dfrac{75}{8}$`, r`$-\dfrac{45}{8}$`, r`$\dfrac{99}{4}$`], key: 'a', sol: r`$\alpha + \beta = \dfrac{3}{2}$ and $\alpha\beta = -2$. Then $\alpha^3 + \beta^3 = (\alpha + \beta)^3 - 3\alpha\beta(\alpha + \beta) = \dfrac{27}{8} + 9 = \dfrac{99}{8}$. Option (c) uses $+3\alpha\beta(\alpha+\beta)$; option (b) forgets the factor $\alpha + \beta$ in the second term.`, d: 3, c: 'application', t: [3, 4], time: 90 }), (C) => { const s = fr(3, 2), p = fr(-2); const f1 = fsub(fpow(s, 3), fmul(fmul(3, p), s)); C.assert(feq(t, fr(99, 8)) && feq(f1, t), 'cubes of the actual roots sum to 99/8'); C.which([fval(t), fval(fsub(fpow(s, 3), fmul(3, p))), fval(fadd(fpow(s, 3), fmul(fmul(3, p), s))), 24.75], fval(t)); });
}
{
  const co = [1, -6, 7];
  Q('m10', mk.mcq({ stem: r`A quadratic equation with rational coefficients has $3 - \sqrt{2}$ as one root. The equation could be`, opts: [r`$x^2 - 6x + 7 = 0$`, r`$x^2 - 6x + 11 = 0$`, r`$x^2 + 6x + 7 = 0$`, r`$x^2 - 3x + 7 = 0$`], key: 'a', sol: r`With rational coefficients the conjugate $3 + \sqrt{2}$ is also a root. Sum $= 6$, product $= 9 - 2 = 7$, so $x^2 - 6x + 7 = 0$. Option (b) uses $9 + 2$ for the product.`, d: 2, c: 'application', t: [3, 4], time: 75 }), (C) => { C.which([[1, -6, 7], [1, -6, 11], [1, 6, 7], [1, -3, 7]].map((c) => isPmRoot(c, 3, -1, 2) || isPmRoot(c, 3, 1, 2)), true); });
}
Q('m11', mk.mcq({ stem: r`The quadratic equation with integer coefficients, leading coefficient $12$, whose roots are $\dfrac{2}{3}$ and $-\dfrac{1}{4}$ is`, opts: [r`$12x^2 - 5x - 2 = 0$`, r`$12x^2 + 5x - 2 = 0$`, r`$12x^2 - 5x + 2 = 0$`, r`$12x^2 - 11x - 2 = 0$`], key: 'a', sol: r`Sum $= \dfrac{2}{3} - \dfrac{1}{4} = \dfrac{5}{12}$ and product $= -\dfrac{1}{6}$, so $x^2 - \dfrac{5}{12}x - \dfrac{1}{6} = 0$, i.e. $12x^2 - 5x - 2 = 0$. Option (d) adds $\dfrac{2}{3} + \dfrac{1}{4}$ by mistake.`, d: 2, c: 'understanding', t: [4], time: 75 }), (C) => { const roots = [fr(2, 3), fr(-1, 4)]; C.assert(formEq(fadd(roots[0], roots[1]), fmul(roots[0], roots[1])).join() === '12,-5,-2', 'formed equation 12, -5, -2'); C.which([[12, -5, -2], [12, 5, -2], [12, -5, 2], [12, -11, -2]].map((c) => hasRoots(c, roots)), true); });
{
  const q = quad(1, 3, -7);
  const inv1 = einv(q.r1, q.d), inv2 = einv(q.r2, q.d);
  const okFor = (c) => ezero(polyAt(c, inv1, q.d)) && ezero(polyAt(c, inv2, q.d));
  Q('m12', mk.mcq({ stem: r`Let $\alpha$ and $\beta$ be the roots of $x^2 + 3x - 7 = 0$. The equation whose roots are $\dfrac{1}{\alpha}$ and $\dfrac{1}{\beta}$ is`, opts: [r`$7x^2 - 3x - 1 = 0$`, r`$7x^2 + 3x - 1 = 0$`, r`$x^2 - 3x - 7 = 0$`, r`$x^2 + 7x - 3 = 0$`], key: 'a', sol: r`The new sum is $\dfrac{1}{\alpha} + \dfrac{1}{\beta} = \dfrac{\alpha + \beta}{\alpha\beta} = \dfrac{-3}{-7} = \dfrac{3}{7}$ and the new product is $\dfrac{1}{\alpha\beta} = -\dfrac{1}{7}$. So $x^2 - \dfrac{3}{7}x - \dfrac{1}{7} = 0$, i.e. $7x^2 - 3x - 1 = 0$.`, d: 3, c: 'application', t: [4], time: 100 }), (C) => { C.assert(q.D === 37, 'D = 37'); C.which([[7, -3, -1], [7, 3, -1], [1, -3, -7], [1, 7, -3]].map(okFor), true); });
}
{
  const ks = range(-60, 60).filter((k) => isRoot([1, -4, 3], 1, 0, 1) && ((1 - 7 + k === 0) || (9 - 21 + k === 0)));
  Q('m13', mk.mcq({ stem: r`The equations $x^2 - 4x + 3 = 0$ and $x^2 - 7x + k = 0$ have at least one root in common. The possible values of $k$ are`, opts: [r`$k = 6$ or $k = 12$`, r`$k = 6$ only`, r`$k = 12$ only`, r`$k = 3$ or $k = 4$`], key: 'a', sol: r`The first equation has roots $1$ and $3$, and a common root must satisfy the second. $x = 1$ gives $1 - 7 + k = 0$, so $k = 6$; $x = 3$ gives $9 - 21 + k = 0$, so $k = 12$. Both values work.`, d: 3, c: 'application', t: [4], time: 90 }), (C) => { C.assert(ks.join() === '6,12' && hasRoots([1, -4, 3], [1, 3]) && isRoot([1, -7, 6], 1, 0, 1) && isRoot([1, -7, 12], 3, 0, 1), 'k = 6 and k = 12'); C.which([[6, 12], [6], [12], [3, 4]], ks); });
}
{
  const g = (x) => -2 * x * x + 3 * x - 5;
  Q('m14', mk.mcq({ stem: r`For real $x$, the expression $-2x^2 + 3x - 5$ is`, opts: ['positive for every real $x$', 'negative for every real $x$', 'positive for some $x$ and negative for others', 'zero at two real values of $x$'], key: 'b', sol: r`Here $a = -2 < 0$ and $D = 9 - 40 = -31 < 0$, so the parabola opens downward and never meets the $x$-axis: the expression is negative for all real $x$. The greatest value, $-\dfrac{31}{8}$ at $x = \dfrac{3}{4}$, is still negative.`, d: 2, c: 'understanding', t: [5], time: 60 }), (C) => { const xs = range(-80, 80).map((k) => k / 8); C.assert(disc(-2, 3, -5) === -31 && xs.every((x) => g(x) < 0) && feq(qval(-2, 3, -5, fr(3, 4)), fr(-31, 8)), 'always negative, maximum -31/8'); C.key('b'); });
}
{
  const v = vertex(-2, 8, 7), mx = qval(-2, 8, 7, v.x);
  Q('m15', mk.mcq({ stem: r`The greatest value of $7 + 8x - 2x^2$ over the real numbers is`, opts: ['$15$', '$7$', '$23$', '$2$'], key: 'a', sol: r`With $a = -2 < 0$ the greatest value is at $x = -\dfrac{b}{2a} = 2$, and it equals $7 + 16 - 8 = 15$. Option (b) is the value at $x = 4$ (from using $-\dfrac{b}{a}$); (d) is the position of the vertex, not the value.`, d: 2, c: 'understanding', t: [5], time: 70 }), (C) => { C.assert(feq(v.x, fr(2)) && feq(mx, fr(15)) && feq(qval(-2, 8, 7, fr(4)), fr(7)), 'vertex at 2, value 15'); C.which([15, 7, 23, 2], fval(mx)); });
}
{
  const v = vertex(3, -12, 5), mn = qval(3, -12, 5, v.x);
  Q('m16', mk.mcq({ stem: r`The least value of the quadratic function $f(x) = 3x^2 - 12x + 5$ is`, opts: ['$-7$', '$-4$', '$2$', '$5$'], key: 'a', sol: r`With $a = 3 > 0$ the least value is at $x = \dfrac{12}{6} = 2$, and $f(2) = 12 - 24 + 5 = -7$. Option (b) is $f(1)$, option (c) is the position of the minimum and (d) is $f(0)$.`, d: 2, c: 'understanding', t: [5], time: 70 }), (C) => { C.assert(feq(v.x, fr(2)) && feq(mn, fr(-7)) && qval(3, -12, 5, fr(1)).n === -4 && qval(3, -12, 5, fr(0)).n === 5, 'minimum -7 at x = 2'); C.which([-7, -4, 2, 5], fval(mn)); });
}
{
  const co = [1, 0, -2, 0, -8];
  const f = (x) => x ** 4 - 2 * x * x - 8;
  Q('m17', mk.mcq({ stem: r`How many real roots does $x^4 - 2x^2 - 8 = 0$ have?`, opts: ['$0$', '$2$', '$3$', '$4$'], key: 'b', sol: r`Put $y = x^2$: $y^2 - 2y - 8 = (y - 4)(y + 2) = 0$, so $y = 4$ or $y = -2$. The value $y = 4$ gives $x = \pm 2$, but $y = -2$ would need $x^2 = -2$, which has no real solution. So there are exactly $2$ real roots.`, d: 3, c: 'application', t: [2], time: 90 }), (C) => { const xs = range(-400, 400).map((k) => k / 100); const signChanges = xs.filter((x) => f(x) === 0).length; C.assert(isRoot(co, 2, 0, 1) && isRoot(co, -2, 0, 1) && isPmRoot(co, 0, 1, -2) && xs.every((x) => near(f(x), (x * x - 4) * (x * x + 2))) && signChanges === 2, 'roots 2, -2 and the pair i sqrt 2; only two real'); C.which([0, 2, 3, 4], 2); });
}
Q('m18', mk.mcq({ stem: r`The fundamental theorem of algebra states that a polynomial equation of degree $n \ge 1$ with complex coefficients`, opts: ['has exactly $n$ distinct real roots', r`has at least one complex root, and so exactly $n$ complex roots counted with multiplicity`, 'has at least one real root', r`has at most $n - 1$ complex roots`], key: 'b', sol: r`The theorem guarantees one complex root; dividing out the factor $x - \alpha$ and repeating gives $n$ roots in all, counted with multiplicity. The roots need not be real (as in $x^2 + 1 = 0$) or distinct (as in $(x - 2)^2 = 0$).`, d: 1, c: 'recall', t: [1], time: 40 }), (C) => { C.assert(isPmRoot([1, 0, 1], 0, 1, -1) && !isRoot([1, 0, 1], 1, 0, 1) && isRoot([1, -4, 4], 2, 0, 1), 'x^2 + 1 has no real roots; (x - 2)^2 has a repeated root'); C.key('b'); });
{
  const poly = (c) => c;
  Q('m19', mk.mcq({ stem: r`One root of a quadratic equation with real coefficients is $5 - 2i$. A quadratic equation satisfying this is`, opts: [r`$x^2 - 10x + 29 = 0$`, r`$x^2 - 10x + 21 = 0$`, r`$x^2 + 10x + 29 = 0$`, r`$x^2 - 5x + 29 = 0$`], key: 'a', sol: r`Non-real roots of a real quadratic come in conjugate pairs, so the other root is $5 + 2i$. Sum $= 10$, product $= 25 + 4 = 29$, giving $x^2 - 10x + 29 = 0$. Option (b) writes $25 - 4$ for the product.`, d: 2, c: 'application', t: [1, 4], time: 75 }), (C) => { C.which([[1, -10, 29], [1, -10, 21], [1, 10, 29], [1, -5, 29]].map((c) => isPmRoot(poly(c), 5, 2, -1)), true); });
}
{
  const Dk = (k) => 4 * k * k - 4 * (k + 6);
  const real = (k) => Dk(k) >= 0;
  const grid = range(-80, 80).map((k) => k / 8);
  const p = [(k) => k <= -2 || k >= 3, (k) => k >= -2 && k <= 3, (k) => k <= -3 || k >= 2, (k) => k >= 3];
  Q('m20', mk.mcq({ stem: r`For which real values of $k$ are the roots of $x^2 - 2kx + (k + 6) = 0$ real?`, opts: [r`$k \le -2$ or $k \ge 3$`, r`$-2 \le k \le 3$`, r`$k \le -3$ or $k \ge 2$`, r`$k \ge 3$ only`], key: 'a', sol: r`$D = 4k^2 - 4(k + 6) = 4(k - 3)(k + 2)$. Real roots need $D \ge 0$. The product $(k - 3)(k + 2)$ is positive outside the roots $-2$ and $3$ and zero at them, so $k \le -2$ or $k \ge 3$.`, d: 3, c: 'application', t: [3, 5], time: 100 }), (C) => { C.assert(grid.every((k) => near(Dk(k), 4 * (k - 3) * (k + 2))), 'D factorises'); C.which(p.map((f) => grid.every((k) => f(k) === real(k))), true); });
}
Q('m21', mk.mcq({ stem: r`The parabola $y = ax^2 + bx + c$ opens upward and its discriminant is zero. Which statement describes its graph?`, opts: ['It touches the $x$-axis at exactly one point and lies on or above the axis everywhere', 'It crosses the $x$-axis at two points', 'It lies entirely below the $x$-axis', 'It lies entirely above the $x$-axis without touching it'], key: 'a', sol: r`$D = 0$ means a repeated real root, so the vertex sits on the $x$-axis. With $a > 0$ the curve rises on both sides of it, so $y \ge 0$ with equality only at the vertex.`, d: 2, c: 'understanding', t: [5], time: 50 }), (C) => { const xs = range(-80, 80).map((k) => k / 8); C.assert(disc(2, -12, 18) === 0 && xs.every((x) => 2 * x * x - 12 * x + 18 >= 0) && qval(2, -12, 18, fr(3)).n === 0, 'a > 0, D = 0: y >= 0, zero only at the vertex'); C.key('a'); });

// =============================================================== assertion-reason
Q('ar1', mk.ar({ a: r`The equation $2x^2 - 3x + 7 = 0$ has no real root.`, r: r`If the discriminant of a quadratic equation with real coefficients is negative, the equation has no real root.`, key: 'a', sol: r`For $2x^2 - 3x + 7 = 0$, $D = 9 - 56 = -47 < 0$, so A is true. R is the general rule that explains it: a negative discriminant makes the square root in the formula non-real.`, d: 2, c: 'understanding', t: [3] }), (C) => { C.assert(disc(2, -3, 7) === -47 && nature(2, -3, 7) === 'non-real' && pm([2, -3, 7], fr(3, 4), fr(1, 4), -47), 'D = -47, roots non-real'); C.key('a'); });
{
  // counter-example for A: p, q real, root 2 + sqrt 3, other root 1
  const p = -(3 + Math.sqrt(3)), qq = 2 + Math.sqrt(3);
  const f = (x) => x * x + p * x + qq;
  Q('ar2', mk.ar({ a: r`If $p$ and $q$ are real numbers and $2 + \sqrt{3}$ is a root of $x^2 + px + q = 0$, then $2 - \sqrt{3}$ must also be a root.`, r: r`If a quadratic equation has rational coefficients and one root is $m + \sqrt{n}$ with $\sqrt{n}$ irrational ($m, n$ rational), the other root is $m - \sqrt{n}$.`, key: 'd', sol: r`R is true: with rational coefficients the sum and product of the roots are rational, which forces the other root to be the conjugate. A is false because $p$ and $q$ are only real: $x^2 - (3 + \sqrt{3})x + (2 + \sqrt{3}) = 0$ has the roots $2 + \sqrt{3}$ and $1$, not $2 - \sqrt{3}$.`, d: 4, c: 'analysis', t: [3] }), (C) => { const d = 3; const q2 = quad(1, -6, 6); C.assert(near(f(2 + Math.sqrt(3)), 0, 1e-12) && near(f(1), 0, 1e-12) && Math.abs(f(2 - Math.sqrt(3))) > 0.1 && isPmRoot([1, -4, 1], 2, 1, d) && ezero(polyAt([1, -4, 1], E(2, 1), d)) && q2.D === 12, 'counter-example with real coefficients; rational case gives the conjugate'); C.key('d'); });
}
{
  const v = verifyQuad(1, -7, 1);
  Q('ar3', mk.ar({ a: r`The roots of $x^2 - 7x + 1 = 0$ are real.`, r: r`The product of the roots of $x^2 - 7x + 1 = 0$ is $1$.`, key: 'b', sol: r`For $x^2 - 7x + 1 = 0$, $D = 49 - 4 = 45 > 0$, so A is true; R is also true because the product is $\dfrac{c}{a} = 1$. But the product being $1$ says nothing about whether the roots are real (the equation $x^2 + 1 = 0$ also has product $1$ and no real roots), so R does not explain A.`, d: 3, c: 'analysis', t: [3] }), (C) => { C.assert(v.D === 45 && feq(v.prod, fr(1)) && nature(1, 0, 1) === 'non-real' && feq(verifyQuad(1, 0, 1).prod, fr(1)), 'real roots, product 1, but x^2 + 1 shows R is no explanation'); C.key('b'); });
}
{
  const xs = range(-80, 80).map((k) => k / 8);
  Q('ar4', mk.ar({ a: r`The quadratic expression $2x^2 - x + 3$ is positive for every real $x$.`, r: r`Every quadratic expression $ax^2 + bx + c$ with $a > 0$ is positive for every real $x$.`, key: 'c', sol: r`A is true: $a = 2 > 0$ and $D = 1 - 24 = -23 < 0$, so the graph stays above the $x$-axis. R is false because positivity also needs $D < 0$; for example $x^2 - 1$ has $a > 0$ and is negative at $x = 0$.`, d: 3, c: 'analysis', t: [5] }), (C) => { C.assert(disc(2, -1, 3) === -23 && xs.every((x) => 2 * x * x - x + 3 > 0) && 0 * 0 - 1 < 0, 'A holds, R fails at x^2 - 1'); C.key('c'); });
}
{
  const co = [1, 0, 3, 0, 2];
  Q('ar5', mk.ar({ a: r`The equation $x^4 + 3x^2 + 2 = 0$ has four real roots.`, r: r`Putting $y = x^2$ gives $y = -1$ or $y = -2$, and $x^2 = y$ has no real solution when $y$ is negative.`, key: 'd', sol: r`R is true: $y^2 + 3y + 2 = (y + 1)(y + 2) = 0$ gives two negative values of $y$, and a real $x$ has $x^2 \ge 0$. So the four roots are $\pm i$ and $\pm i\sqrt{2}$, all non-real, and A is false.`, d: 3, c: 'analysis', t: [2] }), (C) => { C.assert(isPmRoot(co, 0, 1, -1) && isPmRoot(co, 0, 1, -2) && range(-300, 300).every((k) => { const x = k / 50; return x ** 4 + 3 * x * x + 2 > 0; }), 'roots +-i and +-i sqrt 2; no real root'); C.key('d'); });
}
{
  const v = vertex(-1, -4, 5);
  Q('ar6', mk.ar({ a: r`The function $f(x) = 5 - 4x - x^2$ has greatest value $9$, reached at $x = -2$.`, r: r`When $a < 0$, the quadratic function $ax^2 + bx + c$ has its greatest value at $x = -\dfrac{b}{2a}$.`, key: 'a', sol: r`Here $a = -1 < 0$ and $-\dfrac{b}{2a} = -\dfrac{-4}{-2} = -2$, so by R the greatest value occurs at $x = -2$. It is $f(-2) = 5 + 8 - 4 = 9$, which is A; R is exactly why.`, d: 2, c: 'application', t: [5] }), (C) => { C.assert(feq(v.x, fr(-2)) && feq(v.y, fr(9)) && range(-80, 80).map((k) => k / 8).every((x) => qval(-1, -4, 5, fr(Math.round(x * 8), 8)).n / qval(-1, -4, 5, fr(Math.round(x * 8), 8)).d <= 9), 'maximum 9 at -2'); C.key('a'); });
}

// =============================================================== true-false
{
  const grid = [];
  for (const a of range(1, 4)) for (const b of range(-6, 6)) for (const c of range(-6, 6)) grid.push([a, b, c]);
  const nonReal = grid.filter(([a, b, c]) => disc(a, b, c) < 0).map(([a, b, c]) => quad(a, b, c));
  Q('tf1', mk.tf({ stem: r`A quadratic equation with real coefficients can have exactly one non-real root.`, key: 'f', sol: r`If $D < 0$ both roots $\dfrac{-b \pm i\sqrt{-D}}{2a}$ are non-real, and if $D \ge 0$ both are real. Non-real roots occur in conjugate pairs, so the number of non-real roots is $0$ or $2$, never $1$.`, d: 2, c: 'understanding', t: [3] }), (C) => { C.assert(nonReal.length > 20 && nonReal.every((q) => q.r1.b.n !== 0 && q.r2.b.n !== 0) && grid.filter(([a, b, c]) => disc(a, b, c) >= 0).every(([a, b, c]) => nature(a, b, c) !== 'non-real'), 'non-real roots come in pairs'); C.key('f'); });
}
{
  const grid = [];
  for (const a of range(1, 5)) for (const b of range(-8, 8)) for (const c of range(-8, 8)) if (disc(a, b, c) >= 0 && Number.isInteger(Math.sqrt(disc(a, b, c)))) grid.push([a, b, c]);
  Q('tf2', mk.tf({ stem: r`If a quadratic equation has rational coefficients and its discriminant is the square of a rational number, then both of its roots are rational.`, key: 't', sol: r`The roots are $\dfrac{-b \pm \sqrt{D}}{2a}$. When $\sqrt{D}$ is rational, so are $-b \pm \sqrt{D}$ and their quotient by $2a$. For example, $D = 289 = 17^2$ for $12x^2 + x - 6 = 0$ gives $\dfrac{2}{3}$ and $-\dfrac{3}{4}$.`, d: 2, c: 'understanding', t: [3] }), (C) => { C.assert(grid.length > 30 && grid.every(([a, b, c]) => nature(a, b, c) !== 'irrational') && hasRoots([12, 1, -6], [fr(2, 3), fr(-3, 4)]), 'perfect-square D gives rational roots'); C.key('t'); });
}
Q('tf3', mk.tf({ stem: r`The equations $x^2 - 3x + 2 = 0$ and $2x^2 - 6x + 4 = 0$ have both their roots in common.`, key: 't', sol: r`The second equation is twice the first, so it has the same roots, $1$ and $2$. Direct substitution confirms it: $2 - 6 + 4 = 0$ at $x = 1$ and $8 - 12 + 4 = 0$ at $x = 2$.`, d: 2, c: 'understanding', t: [4] }), (C) => { C.assert(hasRoots([1, -3, 2], [1, 2]) && hasRoots([2, -6, 4], [1, 2]) && intRoots(1, -3, 2).join() === intRoots(2, -6, 4).join(), 'same roots 1 and 2'); C.key('t'); });
Q('tf4', mk.tf({ stem: r`A quadratic function $ax^2 + bx + c$ with $a < 0$ has a least value.`, key: 'f', sol: r`With $a < 0$ the parabola opens downward and the values fall without bound as $|x|$ grows, so there is a **greatest** value (at the vertex) but no least value. For $-x^2 + 4$ the values at $x = 10$ and $x = 100$ are already $-96$ and $-9996$.`, d: 1, c: 'understanding', t: [5] }), (C) => { const g = (x) => -x * x + 4; C.assert(g(10) === -96 && g(100) === -9996 && g(1000) < g(100), 'values fall without bound'); C.key('f'); });
Q('tf5', mk.tf({ stem: r`The graph of $y = x^2 - 6x + 9$ lies entirely above the $x$-axis.`, key: 'f', sol: r`$x^2 - 6x + 9 = (x - 3)^2$ has $D = 0$, so the parabola touches the $x$-axis at $(3, 0)$. It lies on or above the axis, but not strictly above it.`, d: 2, c: 'understanding', t: [5] }), (C) => { C.assert(disc(1, -6, 9) === 0 && qval(1, -6, 9, fr(3)).n === 0 && range(-80, 80).map((k) => k / 8).every((x) => x * x - 6 * x + 9 >= 0), 'touches at (3, 0)'); C.key('f'); });

// =============================================================== fill in the blank
{
  const v = verifyQuad(5, -7, 2);
  Q('fb1', mk.fill({ stem: r`The sum of the roots of $5x^2 - 7x + 2 = 0$ is ____.`, acc: [['7/5', '1.4']], sol: r`The sum of the roots is $-\dfrac{b}{a} = \dfrac{7}{5}$, which is $1.4$. (The roots are $1$ and $\dfrac{2}{5}$, which indeed add to $\dfrac{7}{5}$.)`, d: 1, c: 'recall', t: [3] }), (C) => { C.assert(feq(v.sum, fr(7, 5)) && hasRoots([5, -7, 2], [fr(1), fr(2, 5)]), 'sum 7/5, roots 1 and 2/5'); C.blank(1.4); });
}
{
  const ks = range(1, 60).filter((k) => disc(3, -k, 12) === 0);
  Q('fb2', mk.fill({ stem: r`For a positive constant $k$, the equation $3x^2 - kx + 12 = 0$ has two coincident roots exactly when $k =$ ____.`, acc: [['12']], sol: r`Equal roots need $D = k^2 - 4 \times 3 \times 12 = k^2 - 144 = 0$, so $k = 12$ for $k > 0$.`, d: 2, c: 'understanding', t: [3] }), (C) => { C.assert(ks.join() === '12' && verifyQuad(3, -12, 12).D === 0, 'k = 12'); C.blank(12); });
}
{
  const q = quad(1, -9, 18);
  Q('fb3', mk.fill({ stem: r`In $x^2 - 9x + k = 0$ one root is twice the other. Then $k =$ ____.`, acc: [['18']], sol: r`Let the roots be $m$ and $2m$. Their sum is $3m = 9$, so $m = 3$ and the roots are $3$ and $6$. Then $k = 3 \times 6 = 18$.`, d: 3, c: 'application', t: [3] }), (C) => { const ks = range(-100, 100).filter((k) => { const D = 81 - 4 * k; if (D < 0) return false; const s = Math.sqrt(D); const a = (9 + s) / 2, b = (9 - s) / 2; return Math.abs(a - 2 * b) < 1e-9 || Math.abs(b - 2 * a) < 1e-9; }); C.assert(ks.join() === '18' && hasRoots([1, -9, 18], [fr(3), fr(6)]) && q.D === 9, 'k = 18'); C.blank(18); });
}
{
  const co = [1, -10, 9];
  Q('fb4', mk.fill({ stem: r`Putting $y = x^2$ in $x^4 - 10x^2 + 9 = 0$ gives $y = 1$ or $y =$ ____.`, acc: [['9']], sol: r`$y^2 - 10y + 9 = (y - 1)(y - 9) = 0$, so the second value is $y = 9$. (Then $x = \pm 1$ or $x = \pm 3$.)`, d: 1, c: 'understanding', t: [2] }), (C) => { C.assert(hasRoots(co, [fr(1), fr(9)]) && hasRoots([1, 0, -10, 0, 9], [fr(1), fr(-1), fr(3), fr(-3)]), 'y = 1 or 9'); C.blank(9); });
}
{
  const v = vertex(1, -8, 19);
  Q('fb5', mk.fill({ stem: r`The least value of $x^2 - 8x + 19$ over the real numbers is ____.`, acc: [['3']], sol: r`$x^2 - 8x + 19 = (x - 4)^2 + 3 \ge 3$, with equality at $x = 4$. So the least value is $3$.`, d: 2, c: 'understanding', t: [5] }), (C) => { C.assert(feq(v.x, fr(4)) && feq(v.y, fr(3)), 'minimum 3 at x = 4'); C.blank(3); });
}

// =============================================================== numerical
{
  const q = quad(1, -7, 5), t = rootsPow(q, 3);
  Q('n1', mk.num({ stem: r`If $\alpha$ and $\beta$ are the roots of $x^2 - 7x + 5 = 0$, find the value of $\alpha^3 + \beta^3$.`, value: 238, tol: 0, scheme: [['Sum and product of the roots', 0.5], ['Value 238', 0.5]], sol: r`$\alpha + \beta = 7$ and $\alpha\beta = 5$. So $\alpha^3 + \beta^3 = (\alpha + \beta)^3 - 3\alpha\beta(\alpha + \beta) = 343 - 105 = 238$.`, d: 3, c: 'application', t: [3, 4], time: 90 }), (C) => { C.assert(feq(t, fr(238)) && feq(rootsProd(q), fr(5)), 'alpha^3 + beta^3 = 238 from the roots'); C.val(fval(t)); });
}
{
  const ks = range(-50, 50).filter((k) => 2 * k + 3 === k + 9);
  Q('n2', mk.num({ stem: r`The roots of $x^2 - (2k + 3)x + (k + 9) = 0$ have a sum equal to their product. Find $k$.`, value: 6, tol: 0, scheme: [['Equation in $k$ from sum = product', 0.5], ['$k = 6$', 0.5]], sol: r`Sum $= 2k + 3$ and product $= k + 9$. Setting them equal, $2k + 3 = k + 9$, so $k = 6$. The equation is then $x^2 - 15x + 15 = 0$ with $D = 165 > 0$.`, d: 2, c: 'understanding', t: [3], time: 75 }), (C) => { const v = verifyQuad(1, -15, 15); C.assert(ks.join() === '6' && feq(v.sum, v.prod) && v.D === 165, 'k = 6'); C.val(6); });
}
{
  const hmax = qval(-4, 12, 2, vertex(-4, 12, 2).x);
  Q('n3', mk.num({ stem: r`An imagined ball thrown from a balcony has height $h = 2 + 12t - 4t^2$ metres at time $t$ seconds. Find the greatest height reached, in metres.`, value: 11, tol: 0, scheme: [['Vertex at $t = 1.5$', 0.5], ['Greatest height 11', 0.5]], unit: 'm', sol: r`The coefficient of $t^2$ is negative, so $h$ has a greatest value at $t = -\dfrac{12}{2(-4)} = 1.5$. Then $h = 2 + 18 - 9 = 11$ metres.`, d: 3, c: 'application', t: [5], time: 90 }), (C) => { C.assert(feq(vertex(-4, 12, 2).x, fr(3, 2)) && feq(hmax, fr(11)), 'maximum 11 at t = 1.5'); C.val(fval(hmax)); });
}
{
  const q = quad(2, -11, 12);
  const dd = fsub(fmul(fr(11, 2), fr(11, 2)), fmul(4, fr(6)));
  Q('n4', mk.num({ stem: r`The roots $\alpha$ and $\beta$ of $2x^2 - 11x + 12 = 0$ are real. Without solving the equation, find $(\alpha - \beta)^2$ as a decimal.`, value: 6.25, tol: 0, scheme: [['Use $S^2 - 4P$', 0.5], ['Value 6.25', 0.5]], sol: r`$\alpha + \beta = \dfrac{11}{2}$ and $\alpha\beta = 6$. Then $(\alpha - \beta)^2 = (\alpha + \beta)^2 - 4\alpha\beta = \dfrac{121}{4} - 24 = \dfrac{25}{4} = 6.25$. (The roots are $4$ and $\dfrac{3}{2}$, which differ by $\dfrac{5}{2}$.)`, d: 3, c: 'application', t: [3], time: 80 }), (C) => { C.assert(feq(dd, fr(25, 4)) && hasRoots([2, -11, 12], [fr(4), fr(3, 2)]) && feq(fdiv(fr(q.D), fr(4)), dd), '(alpha - beta)^2 = 25/4'); C.val(fval(dd)); });
}
{
  const ks = range(-50, 50).filter((k) => { const D = 25 - 4 * k; return D >= 0 && Math.abs(Math.sqrt(D) - 3) < 1e-9; });
  Q('n5', mk.num({ stem: r`The roots of $x^2 - 5x + k = 0$ differ by $3$. Find $k$.`, value: 4, tol: 0, scheme: [[r`$\alpha = 4$ and $\beta = 1$`, 0.5], ['$k = 4$', 0.5]], sol: r`Let the roots be $\alpha > \beta$ with $\alpha - \beta = 3$ and $\alpha + \beta = 5$. Then $\alpha = 4$ and $\beta = 1$, so $k = \alpha\beta = 4$. Check: $D = 25 - 16 = 9 = 3^2$.`, d: 3, c: 'application', t: [3], time: 80 }), (C) => { C.assert(ks.join() === '4' && hasRoots([1, -5, 4], [fr(4), fr(1)]), 'k = 4'); C.val(4); });
}
