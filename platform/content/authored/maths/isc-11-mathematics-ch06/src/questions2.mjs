// ISC 11 Mathematics ch06 Quadratic Equations - short (2 and 3 marks) and long (5 marks, in parts) items.
// Roots are substituted exactly in the ring Q[s] (s^2 = d); symmetric functions are computed from the actual roots;
// formed equations are tested at the roots they must have.
import { Q, mk, plot } from './lib.mjs';
import { r, range, fr, fval, fadd, fsub, fmul, fdiv, fneg, feq, fpow, E, eadd, emul, einv, ezero, polyAt, isRoot, isPmRoot, hasRoots, verifyQuad, quad, nature, disc, rootsPow, rootsProd, vertex, qval, near, formEq } from './qe.mjs';

const pm = isPmRoot;
const rootNear = (g, x) => Math.abs(g(x)) < 1e-9;

// =============================================================== short answer (2 marks)
Q('s201', mk.short({ marks: 2, stem: r`Solve $2x^2 - 2x + 5 = 0$ in the complex numbers.`, model: r`Here $a = 2$, $b = -2$, $c = 5$, so $D = 4 - 40 = -36$. Then $x = \dfrac{2 \pm \sqrt{-36}}{4} = \dfrac{2 \pm 6i}{4} = \dfrac{1}{2} \pm \dfrac{3}{2}i$.`, sol: 'Find $D$ first; a negative value gives a conjugate pair.', scheme: [['$D = -36$', 1], [r`Roots $\dfrac{1 \pm 3i}{2}$`, 1]], d: 2, c: 'understanding', t: [1], time: 90 }), (C) => { C.assert(disc(2, -2, 5) === -36 && pm([2, -2, 5], fr(1, 2), fr(3, 2), -1), 'D = -36, roots (1 +- 3i)/2'); C.model([36, 6, 3]); });
{
  const g = (x) => x * x - 2 * Math.sqrt(7) * x + 7;
  Q('s202', mk.short({ marks: 2, stem: r`Without solving, decide the nature of the roots of $x^2 - 2\sqrt{7}\,x + 7 = 0$, giving a reason, and then state the root.`, model: r`The discriminant is $D = (2\sqrt{7})^2 - 4(1)(7) = 28 - 28 = 0$. So the roots are real and equal, each equal to $-\dfrac{b}{2a} = \dfrac{2\sqrt{7}}{2} = \sqrt{7}$.`, sol: 'A zero discriminant means a repeated real root at $-\\dfrac{b}{2a}$.', scheme: [['$D = 0$ so the roots are real and equal', 1], [r`The root is $\sqrt{7}$`, 1]], d: 2, c: 'understanding', t: [3], time: 80 }), (C) => { C.assert(near((2 * Math.sqrt(7)) ** 2 - 28, 0, 1e-12) && rootNear(g, Math.sqrt(7)) && g(Math.sqrt(7) + 0.01) > 0 && g(Math.sqrt(7) - 0.01) > 0, 'D = 0, double root sqrt 7'); C.model([28, 0]); });
}
{
  const roots = [fr(4), fr(-7, 3)];
  Q('s203', mk.short({ marks: 2, stem: r`Form the quadratic equation with integer coefficients whose roots are $4$ and $-\dfrac{7}{3}$.`, model: r`Sum of roots $= 4 - \dfrac{7}{3} = \dfrac{5}{3}$ and product $= 4 \times \left(-\dfrac{7}{3}\right) = -\dfrac{28}{3}$. So $x^2 - \dfrac{5}{3}x - \dfrac{28}{3} = 0$, that is $3x^2 - 5x - 28 = 0$.`, sol: 'Use $x^2 - (\\text{sum})x + (\\text{product}) = 0$ and clear the fractions.', scheme: [['Sum $\\dfrac{5}{3}$ and product $-\\dfrac{28}{3}$', 1], ['$3x^2 - 5x - 28 = 0$', 1]], d: 2, c: 'understanding', t: [4], time: 80 }), (C) => { C.assert(formEq(fadd(roots[0], roots[1]), fmul(roots[0], roots[1])).join() === '3,-5,-28' && hasRoots([3, -5, -28], roots), '3x^2 - 5x - 28'); C.model([5, 3, 28, 4]); });
}
{
  const q = quad(1, -5, 3);
  const s2 = fval(fadd(fr(5), fr(2))), p2 = 3 + 5 + 1;
  const eq = formEq(fr(7), fr(9));
  const ok = ezero(polyAt(eq, eadd(q.r1, E(1)), q.d)) && ezero(polyAt(eq, eadd(q.r2, E(1)), q.d));
  Q('s204', mk.short({ marks: 2, stem: r`The roots of $x^2 - 5x + 3 = 0$ are $\alpha$ and $\beta$. Form the equation whose roots are $\alpha + 1$ and $\beta + 1$.`, model: r`$\alpha + \beta = 5$ and $\alpha\beta = 3$. The new sum is $(\alpha + 1) + (\beta + 1) = 5 + 2 = 7$ and the new product is $(\alpha + 1)(\beta + 1) = \alpha\beta + \alpha + \beta + 1 = 3 + 5 + 1 = 9$. The equation is $x^2 - 7x + 9 = 0$.`, sol: 'Express the new sum and product through $\\alpha + \\beta$ and $\\alpha\\beta$.', scheme: [['New sum $7$ and new product $9$', 1], ['$x^2 - 7x + 9 = 0$', 1]], d: 3, c: 'application', t: [4], time: 90 }), (C) => { C.assert(ok && eq.join() === '1,-7,9' && s2 === 7 && p2 === 9 && rootsProd(q) && true, 'roots shifted by 1 satisfy x^2 - 7x + 9'); C.model([7, 9]); });
}
{
  const ks = range(-50, 50).filter((k) => disc(1, k - 3, k - 7) >= 0 && k - 3 === 0);
  Q('s205', mk.short({ marks: 2, stem: r`The roots of $x^2 + (k - 3)x + (k - 7) = 0$ are equal in size and opposite in sign. Find $k$ and the roots.`, model: r`Roots of equal size and opposite sign have sum $0$, so $-(k - 3) = 0$ and $k = 3$. The equation becomes $x^2 - 4 = 0$, with roots $x = 2$ and $x = -2$.`, sol: 'The sum of the roots must vanish.', scheme: [['Sum $= 0$ gives $k = 3$', 1], ['Roots $2$ and $-2$', 1]], d: 2, c: 'understanding', t: [3], time: 90 }), (C) => { C.assert(ks.join() === '3' && hasRoots([1, 0, -4], [fr(2), fr(-2)]) && feq(verifyQuad(1, 0, -4).sum, fr(0)), 'k = 3, roots +-2'); C.model([3, 2, -2]); });
}
{
  const co = [1, 0, -5, -36];
  const full = [1, 0, -5, 0, -36];
  Q('s206', mk.short({ marks: 2, stem: r`Find all the roots of $x^4 - 5x^2 - 36 = 0$ in the complex numbers.`, model: r`Put $y = x^2$: $y^2 - 5y - 36 = (y - 9)(y + 4) = 0$, so $y = 9$ or $y = -4$. Then $x^2 = 9$ gives $x = \pm 3$ and $x^2 = -4$ gives $x = \pm 2i$.`, sol: 'Substitute $y = x^2$ and solve the quadratic in $y$.', scheme: [['$y = 9$ or $y = -4$', 1], [r`$x = \pm 3$ and $x = \pm 2i$`, 1]], d: 3, c: 'application', t: [2], time: 90 }), (C) => { C.assert(hasRoots([1, -5, -36], [fr(9), fr(-4)]) && isRoot(full, 3, 0, 1) && isRoot(full, -3, 0, 1) && pm(full, 0, 2, -1) && co.length === 4, 'roots 3, -3, 2i, -2i'); C.model([9, -4, 3, 2]); });
}
{
  const v = vertex(-2, 5, 3), mx = qval(-2, 5, 3, v.x);
  Q('s207', mk.short({ marks: 2, stem: r`Find the greatest value of $3 + 5x - 2x^2$ and the value of $x$ at which it occurs.`, model: r`The coefficient of $x^2$ is negative, so the greatest value is at $x = -\dfrac{b}{2a} = \dfrac{5}{4}$. It equals $3 + \dfrac{25}{4} - \dfrac{25}{8} = \dfrac{49}{8}$.`, sol: 'Use the vertex $x = -\\dfrac{b}{2a}$ and substitute back.', scheme: [[r`Position $x = \dfrac{5}{4}$`, 1], [r`Greatest value $\dfrac{49}{8}$`, 1]], d: 2, c: 'understanding', t: [5], time: 90 }), (C) => { C.assert(feq(v.x, fr(5, 4)) && feq(mx, fr(49, 8)), 'maximum 49/8 at 5/4'); C.model([5 / 4, 49 / 8]); });
}
{
  const cubic = [1, -5, 11, -15];
  Q('s208', mk.short({ marks: 2, stem: r`A cubic equation with real coefficients has $1 + 2i$ as a root. Explain why it must have a real root. If the real root is $3$ and the leading coefficient is $1$, write down the cubic.`, model: r`Non-real roots of a real polynomial occur in conjugate pairs, so $1 - 2i$ is also a root. The theorem on the number of roots says a cubic has three, so the third root cannot be one of a pair and must be real. The cubic is $(x - 3)\big(x^2 - 2x + 5\big) = x^3 - 5x^2 + 11x - 15$, because the pair has sum $2$ and product $5$.`, sol: 'Count roots in conjugate pairs, then multiply out the factors.', scheme: [['Conjugate pair, so the third root is real', 1], [r`$x^3 - 5x^2 + 11x - 15 = 0$`, 1]], d: 3, c: 'analysis', t: [1, 4], time: 100 }), (C) => { C.assert(pm(cubic, 1, 2, -1) && isRoot(cubic, 3, 0, 1) && feq(verifyQuad(1, -2, 5).prod, fr(5)), '1 +- 2i and 3 are the roots'); C.model([5, 11, 15, 2]); });
}

// =============================================================== short answer (3 marks)
Q('s301', mk.short({ marks: 3, stem: r`Solve $5x^2 - 6x + 3 = 0$ over the complex numbers and write the roots in the form $a \pm bi$.`, model: r`$D = (-6)^2 - 4(5)(3) = 36 - 60 = -24$ and $\sqrt{-24} = 2i\sqrt{6}$. So $x = \dfrac{6 \pm 2i\sqrt{6}}{10} = \dfrac{3 \pm i\sqrt{6}}{5}$, that is $\dfrac{3}{5} \pm \dfrac{\sqrt{6}}{5}i$.`, sol: 'Simplify $\\sqrt{-24}$ before dividing by $2a$.', scheme: [['$D = -24$', 1], [r`$\sqrt{-24} = 2i\sqrt{6}$`, 1], [r`Roots $\dfrac{3 \pm i\sqrt{6}}{5}$`, 1]], d: 2, c: 'understanding', t: [1], time: 120 }), (C) => { C.assert(disc(5, -6, 3) === -24 && pm([5, -6, 3], fr(3, 5), fr(1, 5), -6), 'roots (3 +- i sqrt 6)/5'); C.model([24, 6, 5, 3]); });
{
  const q = quad(3, -5, -4);
  const ab = emul(q.r1, einv(q.r2, q.d), q.d), ba = emul(q.r2, einv(q.r1, q.d), q.d);
  const ratio = eadd(ab, ba);
  Q('s302', mk.short({ marks: 3, stem: r`If $\alpha$ and $\beta$ are the roots of $3x^2 - 5x - 4 = 0$, find $\alpha^2 + \beta^2$ and $\dfrac{\alpha}{\beta} + \dfrac{\beta}{\alpha}$ without solving the equation.`, model: r`$\alpha + \beta = \dfrac{5}{3}$ and $\alpha\beta = -\dfrac{4}{3}$. Then $\alpha^2 + \beta^2 = \dfrac{25}{9} + \dfrac{8}{3} = \dfrac{49}{9}$. Also $\dfrac{\alpha}{\beta} + \dfrac{\beta}{\alpha} = \dfrac{\alpha^2 + \beta^2}{\alpha\beta} = \dfrac{49}{9} \times \left(-\dfrac{3}{4}\right) = -\dfrac{49}{12}$.`, sol: 'Write both quantities through the sum and the product of the roots.', scheme: [['Sum $\\dfrac{5}{3}$ and product $-\\dfrac{4}{3}$', 1], [r`$\alpha^2 + \beta^2 = \dfrac{49}{9}$`, 1], [r`Ratio sum $-\dfrac{49}{12}$`, 1]], d: 3, c: 'application', t: [3, 4], time: 150 }), (C) => { C.assert(feq(rootsPow(q, 2), fr(49, 9)) && ratio.b.n === 0 && feq(ratio.a, fr(-49, 12)), '49/9 and -49/12 from the roots'); C.model([49, 9, 12, 4]); });
}
{
  const q = quad(2, -1, -3);
  const c1 = emul(q.r1, emul(q.r1, q.r1, q.d), q.d), c2 = emul(q.r2, emul(q.r2, q.r2, q.d), q.d);
  const eq = [8, -19, -27];
  Q('s303', mk.short({ marks: 3, stem: r`The roots of $2x^2 - x - 3 = 0$ are $\alpha$ and $\beta$. Form the quadratic equation whose roots are $\alpha^3$ and $\beta^3$.`, model: r`$\alpha + \beta = \dfrac{1}{2}$ and $\alpha\beta = -\dfrac{3}{2}$. The new sum is $\alpha^3 + \beta^3 = \left(\dfrac{1}{2}\right)^3 - 3\left(-\dfrac{3}{2}\right)\left(\dfrac{1}{2}\right) = \dfrac{1}{8} + \dfrac{9}{4} = \dfrac{19}{8}$ and the new product is $(\alpha\beta)^3 = -\dfrac{27}{8}$. The equation is $x^2 - \dfrac{19}{8}x - \dfrac{27}{8} = 0$, i.e. $8x^2 - 19x - 27 = 0$.`, sol: 'Use $\\alpha^3 + \\beta^3 = (\\alpha + \\beta)^3 - 3\\alpha\\beta(\\alpha + \\beta)$.', scheme: [['Sum and product of the original roots', 1], [r`$\alpha^3 + \beta^3 = \dfrac{19}{8}$ and $\alpha^3\beta^3 = -\dfrac{27}{8}$`, 1], ['$8x^2 - 19x - 27 = 0$', 1]], d: 3, c: 'application', t: [4], time: 150 }), (C) => { C.assert(ezero(polyAt(eq, c1, q.d)) && ezero(polyAt(eq, c2, q.d)) && formEq(fr(19, 8), fr(-27, 8)).join() === '8,-19,-27' && hasRoots([2, -1, -3], [fr(3, 2), fr(-1)]), 'cubes of the roots satisfy 8x^2 - 19x - 27'); C.model([19 / 8, 27 / 8, 8, 19, 27]); });
}
{
  const ks = range(-100, 100).filter((k) => { const D = 36 - 4 * k; if (D < 0) return false; const s = Math.sqrt(D); const a = (6 + s) / 2, b = (6 - s) / 2; return Math.abs(a * a - b) < 1e-9 || Math.abs(b * b - a) < 1e-9; });
  Q('s304', mk.short({ marks: 3, stem: r`Find the values of $k$ for which one root of $x^2 - 6x + k = 0$ is the square of the other.`, model: r`Let the roots be $m$ and $m^2$. Their sum is $m + m^2 = 6$, so $m^2 + m - 6 = (m + 3)(m - 2) = 0$ and $m = 2$ or $m = -3$. The product is $m \times m^2 = m^3 = k$. So $k = 2^3 = 8$ (roots $2, 4$) or $k = (-3)^3 = -27$ (roots $-3, 9$).`, sol: 'Call the roots $m$ and $m^2$ and use the sum first.', scheme: [[r`$m + m^2 = 6$`, 1], ['$m = 2$ or $m = -3$', 1], ['$k = 8$ or $k = -27$', 1]], d: 4, c: 'application', t: [3], time: 160 }), (C) => { C.assert(ks.join() === '-27,8' && hasRoots([1, -6, 8], [fr(2), fr(4)]) && hasRoots([1, -6, -27], [fr(-3), fr(9)]), 'k = 8 and k = -27'); C.model([8, -27, 2, -3]); });
}
{
  const bad = range(-40, 40).filter((k) => {
    const c1 = [1, 2, k], c2 = [1, k, 2];
    // resultant of two monic quadratics: (c1 - c2)^2 = (b1 - b2)(b2 c1 - ... ) - use the elimination formula (c1 a2 - c2 a1)^2 = (a1 b2 - a2 b1)(b1 c2 - b2 c1)
    return (c1[2] - c2[2]) ** 2 === (c1[0] * c2[1] - c2[0] * c1[1]) * (c1[1] * c2[2] - c2[1] * c1[2]);
  });
  Q('s305', mk.short({ marks: 3, stem: r`Find the values of $k$ for which $x^2 + 2x + k = 0$ and $x^2 + kx + 2 = 0$ have a common root.`, model: r`Subtracting the equations, $(2 - k)x + (k - 2) = 0$, that is $(2 - k)(x - 1) = 0$. If $k \ne 2$ then the common root is $x = 1$, and $1 + 2 + k = 0$ gives $k = -3$. If $k = 2$ the two equations are identical, so every root is common. Hence $k = -3$ or $k = 2$.`, sol: 'Subtract to eliminate $x^2$, then substitute the common root back.', scheme: [[r`$(2 - k)(x - 1) = 0$`, 1], ['$x = 1$ gives $k = -3$', 1], ['$k = 2$ also works: identical equations', 1]], d: 3, c: 'application', t: [4], time: 150 }), (C) => { C.assert(bad.join() === '-3,2' && isRoot([1, 2, -3], 1, 0, 1) && isRoot([1, -3, 2], 1, 0, 1) && JSON.stringify([1, 2, 2]) === JSON.stringify([1, 2, 2]), 'k = -3 (common root 1) and k = 2 (identical)'); C.model([3, 2, 1]); });
}
{
  const v = vertex(2, -3, 4), mn = qval(2, -3, 4, v.x);
  const xs = range(-80, 80).map((k) => k / 8);
  Q('s306', mk.short({ marks: 3, stem: r`Show that $2x^2 - 3x + 4$ is positive for every real $x$, and find its least value and where it occurs.`, model: r`The discriminant is $D = 9 - 32 = -23 < 0$ and the coefficient of $x^2$ is positive, so the expression is positive for all real $x$. Its least value is at $x = \dfrac{3}{4}$ and equals $2 \times \dfrac{9}{16} - \dfrac{9}{4} + 4 = \dfrac{23}{8}$.`, sol: 'Combine the sign of $a$ with the sign of $D$, then use the vertex.', scheme: [['$D = -23 < 0$ with $a > 0$: always positive', 1], [r`Position $x = \dfrac{3}{4}$`, 1], [r`Least value $\dfrac{23}{8}$`, 1]], d: 3, c: 'application', t: [5], time: 140 }), (C) => { C.assert(disc(2, -3, 4) === -23 && xs.every((x) => 2 * x * x - 3 * x + 4 > 0) && feq(v.x, fr(3, 4)) && feq(mn, fr(23, 8)), 'D = -23, minimum 23/8 at 3/4'); C.model([23, 3 / 4, 23 / 8]); });
}
{
  const vx = vertex(-1, 2, 8);
  Q('s307', mk.short({ marks: 3, stem: r`For the function $y = -x^2 + 2x + 8$, find the points where the graph meets the axes and the coordinates of its highest point.`, model: r`At $x = 0$, $y = 8$, so it meets the $y$-axis at $(0, 8)$. At $y = 0$, $x^2 - 2x - 8 = (x - 4)(x + 2) = 0$, so it meets the $x$-axis at $(-2, 0)$ and $(4, 0)$. The coefficient of $x^2$ is negative, so the highest point is at $x = 1$, where $y = -1 + 2 + 8 = 9$: the point $(1, 9)$.`, sol: 'Set $x = 0$, then $y = 0$, then use $x = -\\dfrac{b}{2a}$.', scheme: [[r`$y$-intercept $(0, 8)$`, 1], [r`$x$-intercepts $(-2, 0)$ and $(4, 0)$`, 1], [r`Highest point $(1, 9)$`, 1]], d: 2, c: 'understanding', t: [5], time: 140 }), (C) => { C.assert(qval(-1, 2, 8, fr(0)).n === 8 && hasRoots([-1, 2, 8], [fr(-2), fr(4)]) && feq(vx.x, fr(1)) && feq(vx.y, fr(9)), 'intercepts 8, -2, 4; vertex (1, 9)'); C.model([8, -2, 4, 1, 9]); });
}
{
  const full = [1, -4, -7, 22, 24];
  Q('s308', mk.short({ marks: 3, stem: r`Solve $(x^2 - 2x)^2 - 11(x^2 - 2x) + 24 = 0$.`, model: r`Put $y = x^2 - 2x$. Then $y^2 - 11y + 24 = (y - 3)(y - 8) = 0$, so $y = 3$ or $y = 8$. From $x^2 - 2x - 3 = 0$ we get $x = 3$ or $x = -1$. From $x^2 - 2x - 8 = 0$ we get $x = 4$ or $x = -2$. So the roots are $-2, -1, 3, 4$.`, sol: 'Substitute for the repeated expression, then solve each quadratic in $x$.', scheme: [['$y = 3$ or $y = 8$', 1], [r`$x = 3$ or $-1$ from $y = 3$`, 1], [r`$x = 4$ or $-2$ from $y = 8$`, 1]], d: 3, c: 'application', t: [2], time: 150 }), (C) => { C.assert(hasRoots([1, -11, 24], [fr(3), fr(8)]) && hasRoots(full, [fr(3), fr(-1), fr(4), fr(-2)]) && [3, -1, 4, -2].every((x) => (x * x - 2 * x) ** 2 - 11 * (x * x - 2 * x) + 24 === 0), 'roots 3, -1, 4, -2'); C.model([3, 8, -1, 4, -2]); });
}
{
  const xs = range(-80, 80).map((k) => k / 8);
  Q('s309', mk.short({ marks: 3, stem: r`Prove that $x^2 + kx - (k^2 + 1) = 0$ has two distinct real roots for every real value of $k$.`, model: r`The discriminant is $D = k^2 + 4(k^2 + 1) = 5k^2 + 4$. Since $k^2 \ge 0$ for every real $k$, we have $D \ge 4 > 0$. A positive discriminant gives two distinct real roots, whatever the value of $k$.`, sol: 'Show that the discriminant never drops to zero or below.', scheme: [[r`$D = k^2 + 4(k^2 + 1)$`, 1], [r`$D = 5k^2 + 4$`, 1], ['$D > 0$ for all real $k$, so two distinct real roots', 1]], d: 3, c: 'analysis', t: [3], time: 120 }), (C) => { C.assert(xs.every((k) => near(k * k + 4 * (k * k + 1), 5 * k * k + 4) && 5 * k * k + 4 >= 4) && disc(1, 3, -(9 + 1)) === 49 && nature(1, 3, -10) === 'rational', 'D = 5k^2 + 4 >= 4'); C.model([5, 4]); });
}

// =============================================================== long answer (5 marks, in parts)
{
  const q = quad(2, -5, 1);
  const sq = [emul(q.r1, q.r1, q.d), emul(q.r2, q.r2, q.d)];
  const eq = [4, -21, 1];
  Q('l01', mk.long({ stem: r`The roots of $2x^2 - 5x + 1 = 0$ are $\alpha$ and $\beta$.

(a) Find the discriminant and state the nature of the roots. [1]

(b) Write down $\alpha + \beta$ and $\alpha\beta$. [1]

(c) Find $\alpha^2 + \beta^2$ and $\alpha^3 + \beta^3$. [2]

(d) Form the quadratic equation with integer coefficients whose roots are $\alpha^2$ and $\beta^2$. [1]`, model: r`(a) $D = 25 - 8 = 17 > 0$ and $17$ is not a perfect square, so the roots are real, unequal and irrational.

(b) $\alpha + \beta = \dfrac{5}{2}$ and $\alpha\beta = \dfrac{1}{2}$.

(c) $\alpha^2 + \beta^2 = \left(\dfrac{5}{2}\right)^2 - 2 \times \dfrac{1}{2} = \dfrac{25}{4} - 1 = \dfrac{21}{4}$. Also $\alpha^3 + \beta^3 = \left(\dfrac{5}{2}\right)^3 - 3 \times \dfrac{1}{2} \times \dfrac{5}{2} = \dfrac{125}{8} - \dfrac{15}{4} = \dfrac{95}{8}$.

(d) The new sum is $\dfrac{21}{4}$ and the new product is $(\alpha\beta)^2 = \dfrac{1}{4}$. So $x^2 - \dfrac{21}{4}x + \dfrac{1}{4} = 0$, that is $4x^2 - 21x + 1 = 0$.`, sol: 'Find the sum and product once, then build everything from them.', scheme: [['(a) $D = 17$, irrational and unequal roots', 1], ['(b) Sum $\\dfrac{5}{2}$, product $\\dfrac{1}{2}$', 1], [r`(c) $\alpha^2 + \beta^2 = \dfrac{21}{4}$`, 1], [r`(c) $\alpha^3 + \beta^3 = \dfrac{95}{8}$`, 1], ['(d) $4x^2 - 21x + 1 = 0$', 1]], d: 3, c: 'application', t: [3, 4], time: 330 }), (C) => { C.assert(q.D === 17 && nature(2, -5, 1) === 'irrational' && feq(rootsPow(q, 2), fr(21, 4)) && feq(rootsPow(q, 3), fr(95, 8)) && ezero(polyAt(eq, sq[0], q.d)) && ezero(polyAt(eq, sq[1], q.d)) && formEq(fr(21, 4), fr(1, 4)).join() === '4,-21,1', 'D = 17; 21/4; 95/8; 4x^2 - 21x + 1'); C.model([17, 21 / 4, 95 / 8, 21, 4]); });
}
{
  const co = [4, -4, 17];
  const q = quad(4, -4, 17);
  const a = { a: fr(1, 2), b: fr(2) }; // 1/2 + 2i in the ring with s^2 = -1
  const inv = einv(a, fr(-1));
  const invc = einv({ a: fr(1, 2), b: fr(-2) }, fr(-1));
  const eq = [17, -4, 4];
  Q('l02', mk.long({ stem: r`Consider the equation $4x^2 - 4x + 17 = 0$ with roots $\alpha$ and $\beta$.

(a) Find the discriminant and say what it tells you about the roots. [1]

(b) Solve the equation, giving $\alpha$ and $\beta$ in the form $p \pm qi$. [1]

(c) Verify that $\alpha + \beta = 1$ and $\alpha\beta = \dfrac{17}{4}$ using your roots. [1]

(d) Form the equation with integer coefficients whose roots are $\dfrac{1}{\alpha}$ and $\dfrac{1}{\beta}$. [2]`, model: r`(a) $D = 16 - 272 = -256 < 0$, so the roots are non-real and form a conjugate pair.

(b) $x = \dfrac{4 \pm \sqrt{-256}}{8} = \dfrac{4 \pm 16i}{8} = \dfrac{1}{2} \pm 2i$.

(c) The sum is $\left(\dfrac{1}{2} + 2i\right) + \left(\dfrac{1}{2} - 2i\right) = 1$ and the product is $\dfrac{1}{4} + 4 = \dfrac{17}{4}$, since $(2i)^2 = -4$.

(d) The new sum is $\dfrac{1}{\alpha} + \dfrac{1}{\beta} = \dfrac{\alpha + \beta}{\alpha\beta} = \dfrac{1}{17/4} = \dfrac{4}{17}$ and the new product is $\dfrac{1}{\alpha\beta} = \dfrac{4}{17}$. So $x^2 - \dfrac{4}{17}x + \dfrac{4}{17} = 0$, that is $17x^2 - 4x + 4 = 0$.`, sol: 'Use $D$ for the nature, the formula for the roots, then sum and product for part (d).', scheme: [['(a) $D = -256$, so a non-real conjugate pair', 1], [r`(b) Roots $\dfrac{1}{2} \pm 2i$`, 1], ['(c) Sum $1$ and product $\\dfrac{17}{4}$ checked', 1], [r`(d) New sum and product both $\dfrac{4}{17}$`, 1], ['(d) $17x^2 - 4x + 4 = 0$', 1]], d: 3, c: 'application', t: [1, 3, 4], time: 330 }), (C) => { C.assert(disc(4, -4, 17) === -256 && pm(co, fr(1, 2), fr(2), -1) && feq(q.r1.a, fr(1, 2)) && ezero(polyAt(eq, inv, fr(-1))) && ezero(polyAt(eq, invc, fr(-1))) && formEq(fr(4, 17), fr(4, 17)).join() === '17,-4,4' && feq(verifyQuad(4, -4, 17).prod, fr(17, 4)), 'D = -256, roots 1/2 +- 2i, reciprocal equation 17x^2 - 4x + 4'); C.model([256, 17, 4]); });
}
{
  const ks = range(-60, 60).filter((k) => { const D = 25 - 4 * k; if (D < 0) return false; const s = Math.sqrt(D); const al = (5 + s) / 2, be = (5 - s) / 2; return Math.abs(al * al - be * be - 15) < 1e-9; });
  Q('l03', mk.long({ stem: r`The real roots $\alpha$ and $\beta$ (with $\alpha > \beta$) of $x^2 - 5x + k = 0$ satisfy $\alpha^2 - \beta^2 = 15$.

(a) Use $\alpha + \beta = 5$ to find $\alpha - \beta$. [1]

(b) Find $\alpha$ and $\beta$. [1]

(c) Find the value of $k$. [1]

(d) Form the equation with integer coefficients whose roots are $\alpha + \beta$ and $\alpha - \beta$. [2]`, model: r`(a) $\alpha^2 - \beta^2 = (\alpha + \beta)(\alpha - \beta) = 15$, and $\alpha + \beta = 5$, so $\alpha - \beta = 3$.

(b) Adding and subtracting $\alpha + \beta = 5$ and $\alpha - \beta = 3$: $2\alpha = 8$ and $2\beta = 2$, so $\alpha = 4$ and $\beta = 1$.

(c) $k = \alpha\beta = 4 \times 1 = 4$. Check: $D = 25 - 16 = 9 > 0$.

(d) The new roots are $5$ and $3$. Their sum is $8$ and their product is $15$, so the equation is $x^2 - 8x + 15 = 0$.`, sol: 'Factorise $\\alpha^2 - \\beta^2$, solve the pair of equations, then use sum and product.', scheme: [['(a) $\\alpha - \\beta = 3$', 1], ['(b) $\\alpha = 4$, $\\beta = 1$', 1], ['(c) $k = 4$', 1], ['(d) New sum $8$ and product $15$', 1], ['(d) $x^2 - 8x + 15 = 0$', 1]], d: 3, c: 'application', t: [3, 4], time: 300 }), (C) => { C.assert(ks.join() === '4' && hasRoots([1, -5, 4], [fr(4), fr(1)]) && hasRoots([1, -8, 15], [fr(5), fr(3)]) && formEq(fr(8), fr(15)).join() === '1,-8,15', 'k = 4; x^2 - 8x + 15'); C.model([3, 4, 1, 8, 15]); });
}
{
  const f = (x) => 6 + 4 * x - 2 * x * x;
  const fig = plot({ x: [-3, 5], y: [-12, 10], fns: [{ expr: '6 + 4x - 2x^2', label: '$y = -2x^2 + 4x + 6$' }], pts: [[-1, 0, '(-1, 0)'], [3, 0, '(3, 0)'], [1, 8, '(1, 8)'], [0, 6, '(0, 6)']] }, 'Graph of y equal to minus 2 x squared plus 4 x plus 6: a downward-opening parabola crossing the x-axis at minus 1 and 3, crossing the y-axis at 6 and peaking at the point (1, 8).', 'The curve of $f(x) = -2x^2 + 4x + 6$.');
  const v = vertex(-2, 4, 6);
  Q('l04', mk.long({ stem: r`The figure shows the graph of $f(x) = -2x^2 + 4x + 6$.

(a) Write $f(x)$ in the form $a(x - h)^2 + k$. [1]

(b) State the greatest value of $f(x)$ and the value of $x$ at which it occurs. [1]

(c) Find the points where the graph meets the axes. [1.5]

(d) State the real values of $x$ for which $f(x) > 0$, and explain from the sign of $a$ why $f(x) < 0$ outside that range. [1.5]`, model: r`(a) $f(x) = -2(x^2 - 2x) + 6 = -2(x - 1)^2 + 2 + 6 = -2(x - 1)^2 + 8$.

(b) Since $(x - 1)^2 \ge 0$, $f(x) \le 8$, and the greatest value is $8$, at $x = 1$.

(c) At $x = 0$, $f = 6$: the point $(0, 6)$. At $f = 0$, $x^2 - 2x - 3 = (x - 3)(x + 1) = 0$, so the graph meets the $x$-axis at $(-1, 0)$ and $(3, 0)$.

(d) $f(x) > 0$ for $-1 < x < 3$, between the roots. Because $a = -2 < 0$, the parabola opens downward, so it lies above the axis only between its roots and below it for $x < -1$ and $x > 3$.`, sol: 'Complete the square for (a) and (b); the roots give the intercepts and the sign pattern.', scheme: [['(a) $-2(x - 1)^2 + 8$', 1], ['(b) Greatest value $8$ at $x = 1$', 1], [r`(c) $y$-intercept $(0, 6)$`, 0.5], [r`(c) $x$-intercepts $(-1, 0)$ and $(3, 0)$`, 1], ['(d) $-1 < x < 3$', 1], ['(d) Reason from $a < 0$ (opens downward)', 0.5]], d: 3, c: 'application', t: [5], time: 330, assets: [fig] }), (C) => { const xs = range(-80, 80).map((k) => k / 8); C.assert(xs.every((x) => near(f(x), -2 * (x - 1) ** 2 + 8)) && feq(v.x, fr(1)) && feq(v.y, fr(8)) && hasRoots([-2, 4, 6], [fr(-1), fr(3)]) && xs.every((x) => (f(x) > 0) === (x > -1 && x < 3) || x === -1 || x === 3) && f(0) === 6, 'f = -2(x - 1)^2 + 8; max 8 at 1; zeros -1 and 3; positive between'); C.model([8, 1, 6, -1, 3]); });
}
{
  const full = [12, -56, 89, -56, 12];
  const yq = [12, -56, 65];
  const roots = [fr(2), fr(1, 2), fr(3, 2), fr(2, 3)];
  const ys = roots.map((x) => fadd(x, fdiv(fr(1), x)));
  Q('l05', mk.long({ stem: r`Consider the equation $12x^4 - 56x^3 + 89x^2 - 56x + 12 = 0$, whose coefficients read the same forwards and backwards.

(a) Divide by $x^2$ and put $y = x + \dfrac{1}{x}$ to obtain a quadratic equation in $y$. [2]

(b) Solve the quadratic in $y$. [1]

(c) Hence find all four values of $x$. [2]`, model: r`(a) Dividing by $x^2$: $12\left(x^2 + \dfrac{1}{x^2}\right) - 56\left(x + \dfrac{1}{x}\right) + 89 = 0$. Since $x^2 + \dfrac{1}{x^2} = y^2 - 2$, this becomes $12(y^2 - 2) - 56y + 89 = 0$, that is $12y^2 - 56y + 65 = 0$.

(b) $D = 3136 - 3120 = 16$, so $y = \dfrac{56 \pm 4}{24}$, giving $y = \dfrac{5}{2}$ or $y = \dfrac{13}{6}$.

(c) For $y = \dfrac{5}{2}$: $2x^2 - 5x + 2 = 0$, so $x = 2$ or $x = \dfrac{1}{2}$. For $y = \dfrac{13}{6}$: $6x^2 - 13x + 6 = 0$, so $x = \dfrac{3}{2}$ or $x = \dfrac{2}{3}$. The four roots are $2, \dfrac{1}{2}, \dfrac{3}{2}, \dfrac{2}{3}$.`, sol: 'Divide by $x^2$, substitute $y = x + \\dfrac{1}{x}$, then solve two quadratics in $x$.', scheme: [[r`(a) Division by $x^2$ and $x^2 + \dfrac{1}{x^2} = y^2 - 2$`, 1], ['(a) $12y^2 - 56y + 65 = 0$', 1], [r`(b) $y = \dfrac{5}{2}$ or $\dfrac{13}{6}$`, 1], [r`(c) $x = 2$ or $\dfrac{1}{2}$`, 1], [r`(c) $x = \dfrac{3}{2}$ or $\dfrac{2}{3}$`, 1]], d: 4, c: 'application', t: [2], time: 360 }), (C) => { C.assert(hasRoots(full, roots) && hasRoots(yq, [fr(5, 2), fr(13, 6)]) && ys.every((y) => feq(y, fr(5, 2)) || feq(y, fr(13, 6))) && verifyQuad(12, -56, 65).D === 16 && hasRoots([2, -5, 2], [fr(2), fr(1, 2)]) && hasRoots([6, -13, 6], [fr(3, 2), fr(2, 3)]), 'four roots 2, 1/2, 3/2, 2/3'); C.model([65, 16, 5, 13, 6, 2, 3]); });
}
