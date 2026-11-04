// CBSE 11 Mathematics ch09 Straight Lines — written items (short 2 and 3 marks, long 5 marks, case-based) with re-solve checks.
// Every slope, angle, equation, intercept, meeting point and distance in a model answer is computed exactly (ln.mjs).
import { Q, caseQ, child, mk } from './lib.mjs';
import { r, P, K, T, deg, rad } from './qh.mjs';
import { F, Fr, slope, through, join, byIntercepts, meet, isParallel, isPerp, line, on, xInt, yInt, xAt, yAt, slopeOf, inclination, angleBetween, dist, distParallel, normalForm, perpThrough, parallelThrough, tx, eqTex, yTex, dx, surdOver, d2, mid, range } from './ln.mjs';

// ---------------------------------------------------------------- local helpers
const area2 = (A, B, C) => A[0].mul(B[1].sub(C[1])).add(B[0].mul(C[1].sub(A[1]))).add(C[0].mul(A[1].sub(B[1]))).abs().div(2); // shoelace
const lenTex = (p, q) => { const s = d2(p, q); return s; };
const dec = (v, n = 2) => (Math.round(v * 10 ** n) / 10 ** n).toString();

// =============================================================== short answer, 2 marks
{
  const A = P(-5, 2), B = P(1, -2), L = join(A, B), G = line(2, 3, -8);
  Q('s201', mk.short({ marks: 2, stem: r`Using slopes, verify that the line joining $(-5, 2)$ and $(1, -2)$ runs parallel to $2x + 3y - 8 = 0$.`, model: r`Slope of the line through the two points $= \dfrac{-2 - 2}{1 - (-5)} = \dfrac{-4}{6} = -\dfrac{2}{3}$.\n\nThe line $2x + 3y - 8 = 0$ has slope $-\dfrac{2}{3}$ as well. The slopes are equal, and $(-5, 2)$ does not satisfy $2x + 3y - 8 = 0$ (it gives $-12$), so the lines are distinct and parallel.`, sol: 'Compare the two slopes, then check that the lines are not the same line.', scheme: [['Slope of the first line is -2/3', 1], ['Equal slopes and a point check: parallel, not coincident', 1]], d: 2, c: 'application', t: [1], time: 90 }), (Cx) => { Cx.assert(slope(A, B).eq(F(-2, 3)) && slopeOf(G).eq(F(-2, 3)) && isParallel(L, G) && G.a * -5 + G.b * 2 + G.c === -12, 'parallel, distinct'); Cx.model([4, 6, 12]); });
}
{
  const L1 = line(7, -2, 5), L2 = line(2, 7, -9);
  Q('s202', mk.short({ marks: 2, stem: r`Prove that the lines $7x - 2y + 5 = 0$ and $2x + 7y - 9 = 0$ are perpendicular to each other.`, model: r`The slopes are $m_1 = \dfrac{7}{2}$ and $m_2 = -\dfrac{2}{7}$.\n\nTheir product is $m_1 m_2 = \dfrac{7}{2} \times \left(-\dfrac{2}{7}\right) = -1$, so the lines are perpendicular.`, sol: 'The product of the slopes of perpendicular lines is -1.', scheme: [['The slopes 7/2 and -2/7', 1], ['Product is -1, so perpendicular', 1]], d: 2, c: 'understanding', t: [1], time: 75 }), (Cx) => { Cx.assert(slopeOf(L1).eq(F(7, 2)) && slopeOf(L2).eq(F(-2, 7)) && isPerp(L1, L2), 'perpendicular'); Cx.model([7, 2]); });
}
{
  const B = P(4, 1), C = P(6, 5), pp = xAt(join(B, C), -3), A = P(pp, -3);
  Q('s203', mk.short({ marks: 2, stem: r`The points $A(p, -3)$, $B(4, 1)$ and $C(6, 5)$ lie on a straight line. Find $p$.`, model: r`Slope of $BC = \dfrac{5 - 1}{6 - 4} = 2$.\n\nSlope of $AB = \dfrac{1 - (-3)}{4 - p} = \dfrac{4}{4 - p}$. For collinear points the slopes are equal: $\dfrac{4}{4 - p} = 2$, so $4 - p = 2$ and $p = ${pp}$.`, sol: 'Equal slopes of AB and BC.', scheme: [['Slope of BC is 2', 1], ['4/(4 - p) = 2, so p = 2', 1]], d: 2, c: 'application', t: [1], time: 90 }), (Cx) => { Cx.assert(slope(B, C).eq(2) && pp.eq(2) && on(join(B, C), A), 'p = 2'); Cx.model([2, 4]); });
}
{
  const L1 = line(2, -3, 5), L2 = line(1, 4, -7), ab = angleBetween(L1, L2);
  Q('s204', mk.short({ marks: 2, stem: r`Find the tangent of the acute angle between the lines $2x - 3y + 5 = 0$ and $x + 4y - 7 = 0$.`, model: r`The slopes are $m_1 = \dfrac{2}{3}$ and $m_2 = -\dfrac{1}{4}$.\n\n$\tan\theta = \left|\dfrac{m_1 - m_2}{1 + m_1m_2}\right| = \left|\dfrac{\frac{2}{3} + \frac{1}{4}}{1 - \frac{1}{6}}\right| = \dfrac{11/12}{5/6} = \dfrac{11}{10}$.`, sol: 'Use the tangent formula with the two slopes.', scheme: [['Slopes 2/3 and -1/4', 1], ['tan(theta) = 11/10', 1]], d: 3, c: 'application', t: [1], time: 105 }), (Cx) => { Cx.assert(slopeOf(L1).eq(F(2, 3)) && slopeOf(L2).eq(F(-1, 4)) && ab.tan.eq(F(11, 10)) && Math.abs(ab.acute - 47.72631099390) < 1e-8, 'tan = 11/10'); Cx.model([11, 10, 12, 5, 6]); });
}
{
  const p = P(-6, 4), L = through(p, F(5, 3));
  Q('s205', mk.short({ marks: 2, stem: r`Find the equation of the line through $(-6, 4)$ whose slope is $\dfrac{5}{3}$. Write it as $ax + by + c = 0$.`, model: r`Point-slope form: $y - 4 = \dfrac{5}{3}(x + 6)$.\n\nMultiply by $3$: $3y - 12 = 5x + 30$, so $${eqTex(L)}$.`, sol: 'Use y - y1 = m(x - x1), then clear the fraction.', scheme: [['y - 4 = (5/3)(x + 6)', 1], ['5x - 3y + 42 = 0', 1]], d: 1, c: 'understanding', t: [2], time: 75 }), (Cx) => { Cx.assert(K(L) === '5,-3,42' && on(L, p), '5x - 3y + 42 = 0'); Cx.model([5, 3, 42, 12, 30]); });
}
{
  const A = P(-2, 8), B = P(4, -1), L = join(A, B);
  Q('s206', mk.short({ marks: 2, stem: r`Find the equation of the line passing through the points $(-2, 8)$ and $(4, -1)$.`, model: r`Slope $= \dfrac{-1 - 8}{4 - (-2)} = -\dfrac{3}{2}$.\n\n$y - 8 = -\dfrac{3}{2}(x + 2)$ gives $2y - 16 = -3x - 6$, so $${eqTex(L)}$.`, sol: 'Find the slope, then use point-slope form with either point.', scheme: [['Slope -3/2', 1], ['3x + 2y - 10 = 0', 1]], d: 2, c: 'understanding', t: [2], time: 90 }), (Cx) => { Cx.assert(K(L) === '3,2,-10' && on(L, A) && on(L, B) && slope(A, B).eq(F(-3, 2)), '3x + 2y - 10 = 0'); Cx.model([3, 2, 10]); });
}
{
  const L = byIntercepts(6, -5);
  Q('s207', mk.short({ marks: 2, stem: r`A line cuts off intercepts $6$ on the $x$-axis and $-5$ on the $y$-axis. Find its equation.`, model: r`Intercept form: $\dfrac{x}{6} + \dfrac{y}{-5} = 1$.\n\nMultiplying by $30$: $5x - 6y = 30$, that is $${eqTex(L)}$.`, sol: 'Use x/a + y/b = 1 and clear the denominators.', scheme: [['x/6 + y/(-5) = 1', 1], ['5x - 6y - 30 = 0', 1]], d: 2, c: 'understanding', t: [2], time: 75 }), (Cx) => { Cx.assert(K(L) === '5,-6,-30' && xInt(L).eq(6) && yInt(L).eq(-5), '5x - 6y - 30 = 0'); Cx.model([30, 5, 6]); });
}
{
  const L = line(5, 12, -25), p = P(4, -5), d = dist(L, p);
  Q('s208', mk.short({ marks: 2, stem: r`Calculate the length of the perpendicular drawn from $(4, -5)$ to the line $5x + 12y - 25 = 0$.`, model: r`$d = \dfrac{|5(4) + 12(-5) - 25|}{\sqrt{5^2 + 12^2}} = \dfrac{|-65|}{13} = 5$ units.`, sol: 'Substitute the point into the distance formula.', scheme: [['|20 - 60 - 25| = 65 and root of 169 = 13', 1], ['d = 5', 1]], d: 2, c: 'understanding', t: [3], time: 75 }), (Cx) => { Cx.assert(d.signed.eq(-65) && d.value === 5, '65/13 = 5'); Cx.model([65, 13, 5]); });
}
{
  const L = line(3, 1, -2), p = P(4, -3), d = dist(L, p);
  Q('s209', mk.short({ marks: 2, stem: r`Find the distance of the point $(4, -3)$ from the line $3x + y - 2 = 0$, giving the answer in surd form.`, model: r`$d = \dfrac{|3(4) + (-3) - 2|}{\sqrt{3^2 + 1^2}} = \dfrac{7}{\sqrt{10}} = ${d.tex}$ units (about $${dec(d.value)}$).`, sol: 'Rationalise the denominator at the end.', scheme: [['|12 - 3 - 2| = 7 over root 10', 1], ['7 root 10 over 10', 1]], d: 3, c: 'application', t: [3], time: 90 }), (Cx) => { Cx.assert(d.signed.eq(7) && d.r2 === 10 && d.tex === surdOver(7, 10) && Math.abs(d.value - 2.2135943621) < 1e-9 && d.sq.eq(F(49, 10)), '7/sqrt 10'); Cx.model([7, 10, 2.21]); });
}
{
  const L = line(8, -15, 34), nf = normalForm(L);
  Q('s210', mk.short({ marks: 2, stem: r`Reduce the line $8x - 15y + 34 = 0$ to the normal form $x\cos\omega + y\sin\omega = p$ and state $p$. (Formative practice.)`, model: r`$\sqrt{8^2 + 15^2} = 17$. Since the constant $34$ is positive, write $-8x + 15y = 34$ and divide by $17$:\n\n$-\dfrac{8}{17}x + \dfrac{15}{17}y = 2$.\n\nSo $\cos\omega = -\dfrac{8}{17}$, $\sin\omega = \dfrac{15}{17}$ and $p = 2$.`, sol: 'Change signs so that p is positive, then divide by the square root of a squared plus b squared.', scheme: [['Divide by 17 after moving the constant to the right', 1], ['cos and sin and p = 2', 1]], d: 3, c: 'application', t: [4], time: 105 }), (Cx) => { Cx.assert(nf.cn === -8 && nf.sn === 15 && nf.pnum === 34 && nf.r2 === 289 && nf.pv === 2, 'cos -8/17, sin 15/17, p = 2'); Cx.model([17, 8, 15, 2, 34]); });
}

// =============================================================== short answer, 3 marks
{
  const A = P(-4, -3), B = P(2, -1), C = P(3, -4);
  Q('s301', mk.short({ marks: 3, stem: r`The vertices of a triangle are $A(-4, -3)$, $B(2, -1)$ and $C(3, -4)$. Using slopes, show that the angle at $B$ is a right angle.`, model: r`Slope of $AB = \dfrac{-1 - (-3)}{2 - (-4)} = \dfrac{2}{6} = \dfrac{1}{3}$.\n\nSlope of $BC = \dfrac{-4 - (-1)}{3 - 2} = -3$.\n\nThe product is $\dfrac{1}{3} \times (-3) = -1$, so $AB \perp BC$ and the angle at $B$ is $90^\circ$. (For comparison, the slope of $AC$ is $-\dfrac{1}{7}$.)`, sol: 'Find the slopes of the two sides at B and multiply.', scheme: [['Slope of AB = 1/3', 1], ['Slope of BC = -3', 1], ['Product -1: right angle at B', 1]], d: 3, c: 'application', t: [1], time: 120 }), (Cx) => { Cx.assert(slope(A, B).eq(F(1, 3)) && slope(B, C).eq(-3) && isPerp(join(A, B), join(B, C)) && slope(A, C).eq(F(-1, 7)) && !isPerp(join(A, C), join(A, B)) && !isPerp(join(A, C), join(B, C)), 'right angle at B only'); Cx.model([3, 6, 7]); });
}
{
  const L1 = line(6, -2, 1), L2 = line(1, 2, -8), ab = angleBetween(L1, L2);
  Q('s302', mk.short({ marks: 3, stem: r`Find $\tan\theta$ for the acute angle $\theta$ between the lines $6x - 2y + 1 = 0$ and $x + 2y - 8 = 0$, and say whether $\theta$ is greater than $60^\circ$ (use $\tan 60^\circ = \sqrt{3} \approx 1.73$).`, model: r`The slopes are $m_1 = 3$ and $m_2 = -\dfrac{1}{2}$.\n\n$\tan\theta = \left|\dfrac{3 - \left(-\frac{1}{2}\right)}{1 + 3\left(-\frac{1}{2}\right)}\right| = \left|\dfrac{7/2}{-1/2}\right| = 7$.\n\nSince $\tan$ increases on $0^\circ$ to $90^\circ$ and $7 > 1.73$, $\theta > 60^\circ$ (indeed $\theta \approx ${dec(ab.acute)}^\circ$).`, sol: 'Take the absolute value to get the acute angle, then compare tangents.', scheme: [['Slopes 3 and -1/2', 1], ['tan(theta) = 7', 1], ['7 > 1.73, so theta > 60 degrees', 1]], d: 3, c: 'application', t: [1], time: 135 }), (Cx) => { Cx.assert(slopeOf(L1).eq(3) && slopeOf(L2).eq(F(-1, 2)) && ab.tan.eq(7) && ab.acute > 60 && Math.abs(ab.acute - 81.869897645844) < 1e-9, 'tan 7, 81.87 degrees'); Cx.model([7, 81.87, 60]); });
}
{
  const A = P(1, -4), B = P(5, 2), Lab = join(A, B), p = P(-2, 3), L = perpThrough(Lab, p);
  Q('s303', mk.short({ marks: 3, stem: r`Find the equation of the line through $(-2, 3)$ that is perpendicular to the line joining $(1, -4)$ and $(5, 2)$.`, model: r`Slope of the joining line $= \dfrac{2 - (-4)}{5 - 1} = \dfrac{3}{2}$.\n\nThe perpendicular has slope $-\dfrac{2}{3}$, since $\dfrac{3}{2} \times \left(-\dfrac{2}{3}\right) = -1$.\n\n$y - 3 = -\dfrac{2}{3}(x + 2)$ gives $3y - 9 = -2x - 4$, so $${eqTex(L)}$.`, sol: 'Perpendicular slope is the negative reciprocal; then point-slope form.', scheme: [['Slope of the joining line 3/2', 1], ['Perpendicular slope -2/3', 1], ['2x + 3y - 5 = 0', 1]], d: 3, c: 'application', t: [2], time: 120 }), (Cx) => { Cx.assert(slope(A, B).eq(F(3, 2)) && K(L) === '2,3,-5' && on(L, p) && isPerp(L, Lab), '2x + 3y - 5 = 0'); Cx.model([3, 2, 5, 9, 4]); });
}
{
  const A = P(-6, 0), B = P(3, 4), L = join(A, B);
  Q('s304', mk.short({ marks: 3, stem: r`A line has $x$-intercept $-6$ and passes through the point $(3, 4)$. Find its equation and its $y$-intercept.`, model: r`The line passes through $(-6, 0)$ and $(3, 4)$, so its slope is $\dfrac{4 - 0}{3 + 6} = \dfrac{4}{9}$.\n\n$y = \dfrac{4}{9}(x + 6)$ gives $9y = 4x + 24$, so $${eqTex(L)}$.\n\nPutting $x = 0$: $9y = 24$, so the $y$-intercept is $\dfrac{8}{3}$.`, sol: 'The x-intercept gives a second point on the line.', scheme: [['Second point (-6, 0) and slope 4/9', 1], ['4x - 9y + 24 = 0', 1], ['y-intercept 8/3', 1]], d: 3, c: 'application', t: [2], time: 135 }), (Cx) => { Cx.assert(K(L) === '4,-9,24' && yInt(L).eq(F(8, 3)) && xInt(L).eq(-6), '4x - 9y + 24 = 0, y-intercept 8/3'); Cx.model([4, 9, 24, 8, 3]); });
}
{
  const L = line(6, -5, 30), m = slopeOf(L), a = xInt(L), b = yInt(L), I = byIntercepts(a, b);
  Q('s305', mk.short({ marks: 3, stem: r`Reduce the line $6x - 5y + 30 = 0$ to (i) slope-intercept form and (ii) intercept form, and read off its slope and its intercepts on the axes.`, model: r`(i) $-5y = -6x - 30$, so $y = \dfrac{6}{5}x + 6$: slope $\dfrac{6}{5}$ and $y$-intercept $6$.\n\n(ii) Write $6x - 5y = -30$ and divide by $-30$: $\dfrac{x}{-5} + \dfrac{y}{6} = 1$.\n\nThe intercepts are $-5$ on the $x$-axis and $6$ on the $y$-axis.`, sol: 'Solve for y for the first form; divide by the constant for the second.', scheme: [['y = (6/5)x + 6 with slope 6/5', 1], ['x/(-5) + y/6 = 1', 1], ['Intercepts -5 and 6', 1]], d: 2, c: 'application', t: [2, 4], time: 135 }), (Cx) => { Cx.assert(m.eq(F(6, 5)) && b.eq(6) && a.eq(-5) && K(I) === K(L), 'slope 6/5, intercepts -5 and 6'); Cx.model([6, 5, 30]); });
}
{
  const A = P(1, -3), B = P(7, 5), L = join(A, B), p = P(5, -2), d = dist(L, p);
  Q('s306', mk.short({ marks: 3, stem: r`Find the distance of the point $(5, -2)$ from the line through $A(1, -3)$ and $B(7, 5)$.`, model: r`Slope of $AB = \dfrac{5 + 3}{7 - 1} = \dfrac{4}{3}$, so $y + 3 = \dfrac{4}{3}(x - 1)$ gives $${eqTex(L)}$.\n\n$d = \dfrac{|4(5) - 3(-2) - 13|}{\sqrt{4^2 + 3^2}} = \dfrac{13}{5} = 2.6$ units.`, sol: 'First find the equation of the line, then use the distance formula.', scheme: [['Slope 4/3', 1], ['4x - 3y - 13 = 0', 1], ['d = 13/5 = 2.6', 1]], d: 3, c: 'application', t: [2, 3], time: 135 }), (Cx) => { Cx.assert(K(L) === '4,-3,-13' && d.signed.eq(13) && d.value === 2.6, '13/5'); Cx.model([4, 3, 13, 5, 2.6]); });
}
{
  const L = line(5, 12, -26), want = [F(8), F(-12, 5)], dd = (k) => dist(L, P(k, 1)).value;
  Q('s307', mk.short({ marks: 3, stem: r`The distance of the point $(k, 1)$ from the line $5x + 12y - 26 = 0$ is $2$ units. Find both possible values of $k$.`, model: r`$\dfrac{|5k + 12 - 26|}{\sqrt{5^2 + 12^2}} = 2$ gives $|5k - 14| = 26$.\n\nCase 1: $5k - 14 = 26$, so $k = 8$.\n\nCase 2: $5k - 14 = -26$, so $5k = -12$ and $k = -\dfrac{12}{5}$.`, sol: 'The modulus gives two linear equations.', scheme: [['|5k - 14| = 26', 1], ['k = 8', 1], ['k = -12/5', 1]], d: 3, c: 'application', t: [3], time: 135 }), (Cx) => { Cx.assert(want.every((k) => Math.abs(dd(k) - 2) < 1e-12) && range(-40, 40).every((n) => { const k = F(n, 5); return (Math.abs(dd(k) - 2) < 1e-12) === (k.eq(8) || k.eq(F(-12, 5))); }), 'k = 8 or -12/5 and no other fifth'); Cx.model([26, 8, 12, 5]); });
}
{
  const L = line(3, 4, -5), a = line(3, 4, 5), b = line(3, 4, -15);
  Q('s308', mk.short({ marks: 3, stem: r`Find the equations of the two lines that are parallel to $3x + 4y - 5 = 0$ and at a distance of $2$ units from it.`, model: r`A parallel line has the form $3x + 4y + c = 0$. Its distance from $3x + 4y - 5 = 0$ is $\dfrac{|c - (-5)|}{\sqrt{3^2 + 4^2}} = \dfrac{|c + 5|}{5} = 2$, so $|c + 5| = 10$.\n\nThen $c = 5$ or $c = -15$, giving $${eqTex(a)}$ and $${eqTex(b)}$.`, sol: 'Use the parallel-distance formula with c unknown.', scheme: [['Form 3x + 4y + c = 0', 1], ['|c + 5| = 10', 1], ['The two lines', 1]], d: 4, c: 'analysis', t: [3], time: 150 }), (Cx) => { Cx.assert(distParallel(L, a).value === 2 && distParallel(L, b).value === 2 && range(-30, 30).filter((c) => c !== -5 && Math.abs(distParallel(L, line(3, 4, c)).value - 2) < 1e-12).join() === '-15,5', 'c = 5 or -15'); Cx.model([5, 10, 15, 3, 4]); });
}
{
  const L = line(3, 4, -20), nf = normalForm(L), cs = F(3, 5), sn = F(4, 5), foot = P(cs.mul(4), sn.mul(4));
  Q('s309', mk.short({ marks: 3, stem: r`A line is at a perpendicular distance $4$ from the origin, and the perpendicular makes an angle $\omega$ with the positive $x$-axis where $\cos\omega = \dfrac{3}{5}$ and $\sin\omega = \dfrac{4}{5}$. Find the equation of the line in the form $ax + by + c = 0$. (Formative practice.)`, model: r`Normal form: $x\cos\omega + y\sin\omega = p$, so $\dfrac{3}{5}x + \dfrac{4}{5}y = 4$.\n\nMultiplying by $5$: $3x + 4y = 20$, that is $${eqTex(L)}$.\n\nCheck: the distance of the origin from this line is $\dfrac{20}{\sqrt{3^2 + 4^2}} = 4$.`, sol: 'Put the given cosine, sine and p into the normal form.', scheme: [['(3/5)x + (4/5)y = 4', 1], ['3x + 4y - 20 = 0', 1], ['Distance check: 20/5 = 4', 1]], d: 3, c: 'application', t: [4], time: 120 }), (Cx) => { Cx.assert(K(L) === '3,4,-20' && nf.cn === 3 && nf.sn === 4 && nf.pv === 4 && dist(L, P(0, 0)).value === 4 && on(L, foot), 'normal form to 3x + 4y - 20 = 0'); Cx.model([3, 4, 5, 20]); });
}

// =============================================================== long answer, 5 marks
{
  const Pp = P(-2, 5), Qq = P(6, 1), R = P(2, -5), Lpq = join(Pp, Qq), alt = perpThrough(Lpq, R), foot = meet(Lpq, alt), dR = dist(Lpq, R);
  const rf2 = d2(R, foot), pq2 = d2(Pp, Qq), ar = area2(Pp, Qq, R);
  Q('l01', mk.long({ stem: r`The vertices of a triangle are $P(-2, 5)$, $Q(6, 1)$ and $R(2, -5)$. Find (a) the slope and equation of $PQ$; (b) the equation of the altitude from $R$ to $PQ$; (c) the foot $F$ of this altitude; (d) the length $RF$ by the distance formula; (e) the area of triangle $PQR$.`, model: r`**(a)** Slope of $PQ = \dfrac{1 - 5}{6 + 2} = -\dfrac{1}{2}$. Then $y - 5 = -\dfrac{1}{2}(x + 2)$ gives $${eqTex(Lpq)}$.\n\n**(b)** The altitude is perpendicular to $PQ$, so its slope is $2$. Through $R(2, -5)$: $y + 5 = 2(x - 2)$ gives $${eqTex(alt)}$.\n\n**(c)** Solve $x + 2y = 8$ and $2x - y = 9$: from the second, $y = 2x - 9$, so $x + 4x - 18 = 8$ and $x = \dfrac{26}{5}$, $y = \dfrac{7}{5}$. So $F\left(\dfrac{26}{5}, \dfrac{7}{5}\right)$.\n\n**(d)** $RF = \dfrac{|2 + 2(-5) - 8|}{\sqrt{1^2 + 2^2}} = \dfrac{16}{\sqrt{5}} = ${dR.tex}$ units. (Check: $RF^2 = \left(\dfrac{16}{5}\right)^2 + \left(\dfrac{32}{5}\right)^2 = \dfrac{1280}{25} = \dfrac{256}{5}$.)\n\n**(e)** $PQ = \sqrt{8^2 + 4^2} = \sqrt{80} = 4\sqrt{5}$, so the area is $\dfrac{1}{2} \times 4\sqrt{5} \times \dfrac{16}{\sqrt{5}} = ${ar}$ square units.`, sol: 'Slope of PQ, then the perpendicular through R; the foot is the meeting point and the area is half base times height.', scheme: [['(a) slope -1/2 and x + 2y - 8 = 0', 1], ['(b) altitude 2x - y - 9 = 0', 1], ['(c) foot (26/5, 7/5)', 1], ['(d) RF = 16 over root 5', 1], ['(e) area 32', 1]], d: 3, c: 'application', t: [1, 2, 3], time: 420 }), (Cx) => { Cx.assert(K(Lpq) === '1,2,-8' && K(alt) === '2,-1,-9' && foot[0].eq(F(26, 5)) && foot[1].eq(F(7, 5)) && dR.value === 16 / Math.sqrt(5) && dR.sq.eq(F(256, 5)) && rf2.eq(F(256, 5)) && pq2.eq(80) && ar.eq(32) && dR.tex === surdOver(16, 5), 'foot, RF and area'); Cx.model([8, 9, 26, 7, 16, 32, 80, 5, 1280]); });
}
{
  const L1 = line(3, -4, 8), L2 = line(1, 2, -9), ab = angleBetween(L1, L2), p = meet(L1, L2), L3 = perpThrough(L1, p);
  Q('l02', mk.long({ stem: r`Two imagined solar-panel rails on a roof plan are the lines $L_1: 3x - 4y + 8 = 0$ and $L_2: x + 2y - 9 = 0$. Find (a) the slope of each rail; (b) $\tan\theta$ for the acute angle $\theta$ between them, and $\theta$ to two decimal places; (c) the point $P$ where they meet; (d) the equation of the line through $P$ perpendicular to $L_1$.`, model: r`**(a)** $L_1$: $4y = 3x + 8$ so $m_1 = \dfrac{3}{4}$. $L_2$: $2y = -x + 9$ so $m_2 = -\dfrac{1}{2}$.\n\n**(b)** $\tan\theta = \left|\dfrac{\frac{3}{4} + \frac{1}{2}}{1 - \frac{3}{8}}\right| = \dfrac{5/4}{5/8} = 2$, so $\theta = \tan^{-1} 2 \approx ${dec(ab.acute)}^\circ$.\n\n**(c)** From $L_2$, $x = 9 - 2y$. Put in $L_1$: $27 - 6y - 4y + 8 = 0$, so $y = \dfrac{7}{2}$ and $x = 2$. So $P\left(2, \dfrac{7}{2}\right)$.\n\n**(d)** The perpendicular to $L_1$ has slope $-\dfrac{4}{3}$: $y - \dfrac{7}{2} = -\dfrac{4}{3}(x - 2)$, and multiplying by $6$ gives $6y - 21 = -8x + 16$, so $${eqTex(L3)}$.`, sol: 'Slopes first; the tangent formula; solve the two equations; then the perpendicular slope.', scheme: [['(a) slopes 3/4 and -1/2', 1], ['(b) tan(theta) = 2 and 63.43 degrees', 1.5], ['(c) P(2, 7/2)', 1], ['(d) 8x + 6y - 37 = 0', 1.5]], d: 3, c: 'application', t: [1, 2], time: 420 }), (Cx) => { Cx.assert(slopeOf(L1).eq(F(3, 4)) && slopeOf(L2).eq(F(-1, 2)) && ab.tan.eq(2) && Math.abs(ab.acute - 63.434948822922) < 1e-9 && p[0].eq(2) && p[1].eq(F(7, 2)) && K(L3) === '8,6,-37' && isPerp(L3, L1) && on(L3, p), 'tan 2, P(2, 7/2), 8x + 6y - 37 = 0'); Cx.model([2, 63.43, 7, 37, 27, 16]); });
}
{
  const p = P(-2, 6), L = through(p, F(-3, 4)), a = xInt(L), b = yInt(L), A = P(a, 0), B = P(0, b), len2 = d2(A, B), I = byIntercepts(a, b), ar = a.abs().mul(b.abs()).div(2);
  Q('l03', mk.long({ stem: r`A straight line passes through $(-2, 6)$ and has slope $-\dfrac{3}{4}$. (a) Find its equation as $ax + by + c = 0$. (b) Find its intercepts $a$ and $b$ on the axes and write its intercept form. (c) Find the area of the triangle it forms with the axes. (d) Find the length of the part of the line between the axes.`, model: r`**(a)** $y - 6 = -\dfrac{3}{4}(x + 2)$ gives $4y - 24 = -3x - 6$, so $${eqTex(L)}$.\n\n**(b)** Put $y = 0$: $3x = 18$, so $a = 6$. Put $x = 0$: $4y = 18$, so $b = \dfrac{9}{2}$. Intercept form: $\dfrac{x}{6} + \dfrac{y}{9/2} = 1$.\n\n**(c)** Area $= \dfrac{1}{2} \times 6 \times \dfrac{9}{2} = \dfrac{27}{2} = 13.5$ square units.\n\n**(d)** Length $= \sqrt{6^2 + \left(\dfrac{9}{2}\right)^2} = \sqrt{36 + \dfrac{81}{4}} = \sqrt{\dfrac{225}{4}} = \dfrac{15}{2} = 7.5$ units.`, sol: 'Intercepts by putting each coordinate zero; the triangle is right-angled at the origin.', scheme: [['(a) 3x + 4y - 18 = 0', 1], ['(b) intercepts 6 and 9/2 with intercept form', 1.5], ['(c) area 27/2', 1], ['(d) length 15/2', 1.5]], d: 3, c: 'application', t: [2], time: 390 }), (Cx) => { Cx.assert(K(L) === '3,4,-18' && a.eq(6) && b.eq(F(9, 2)) && K(I) === K(L) && ar.eq(F(27, 2)) && len2.eq(F(225, 4)) && Math.sqrt(len2.num()) === 7.5, '3x + 4y - 18 = 0'); Cx.model([18, 6, 4.5, 13.5, 7.5, 225]); });
}
{
  const p = P(-3, 4), A = P(-6, 0), B = P(0, 8), M = mid(A, B), L = join(A, B), d0 = dist(L, P(0, 0));
  Q('l04', mk.long({ stem: r`A line meets the $x$-axis at $A$ and the $y$-axis at $B$, and the point $P(-3, 4)$ is the mid-point of $AB$. Find (a) the coordinates of $A$ and $B$; (b) the equation of $AB$ in intercept form and as $ax + by + c = 0$; (c) the slope of $AB$ and the length $AB$; (d) the distance of the origin from $AB$.`, model: r`**(a)** Let $A(a, 0)$ and $B(0, b)$. The mid-point is $\left(\dfrac{a}{2}, \dfrac{b}{2}\right) = (-3, 4)$, so $a = -6$ and $b = 8$: $A(-6, 0)$ and $B(0, 8)$.\n\n**(b)** Intercept form: $\dfrac{x}{-6} + \dfrac{y}{8} = 1$. Multiplying by $24$: $-4x + 3y = 24$, so $${eqTex(L)}$.\n\n**(c)** Slope $= -\dfrac{4}{-3}$, that is $\dfrac{4}{3}$. Length $AB = \sqrt{6^2 + 8^2} = 10$ units.\n\n**(d)** $d = \dfrac{|24|}{\sqrt{4^2 + 3^2}} = \dfrac{24}{5} = 4.8$ units.`, sol: 'Half the intercepts are the mid-point coordinates.', scheme: [['(a) A(-6, 0), B(0, 8)', 1.5], ['(b) intercept form and 4x - 3y + 24 = 0', 1.5], ['(c) slope 4/3 and AB = 10', 1], ['(d) distance 24/5', 1]], d: 3, c: 'application', t: [2, 3], time: 390 }), (Cx) => { Cx.assert(M[0].eq(-3) && M[1].eq(4) && K(L) === '4,-3,24' && slopeOf(L).eq(F(4, 3)) && d2(A, B).eq(100) && d0.value === 4.8 && on(L, p), 'A(-6, 0), B(0, 8), 4x - 3y + 24 = 0'); Cx.model([6, 8, 24, 10, 4.8]); });
}
{
  const L = line(4, -3, 10), pts = [F(5, 2), F(-15, 2)], dd = (a) => dist(L, P(a, 0)).value, M = line(8, -6, -35), dp = distParallel(L, M), mid1 = line(16, -12, -15);
  Q('l05', mk.long({ stem: r`(a) Find the points on the $x$-axis whose distance from the line $4x - 3y + 10 = 0$ is $4$ units. (b) Find the distance between the lines $4x - 3y + 10 = 0$ and $8x - 6y - 35 = 0$. (c) Find the equation of the line that is parallel to both and exactly half-way between them.`, model: r`**(a)** For $(a, 0)$: $\dfrac{|4a + 10|}{\sqrt{4^2 + 3^2}} = 4$ gives $|4a + 10| = 20$. Then $4a + 10 = 20$ gives $a = \dfrac{5}{2}$, and $4a + 10 = -20$ gives $a = -\dfrac{15}{2}$. The points are $\left(\dfrac{5}{2}, 0\right)$ and $\left(-\dfrac{15}{2}, 0\right)$.\n\n**(b)** Write the second line as $4x - 3y - 17.5 = 0$. Then $d = \dfrac{|10 - (-17.5)|}{5} = \dfrac{27.5}{5} = 5.5$ units.\n\n**(c)** A parallel line $4x - 3y + c = 0$ half-way between has $c = \dfrac{10 + (-17.5)}{2} = -3.75$, so $4x - 3y - 3.75 = 0$, that is $${eqTex(mid1)}$. Its distance from each of the lines is $\dfrac{13.75}{5} = 2.75$ units, half of $5.5$.`, sol: 'Use the point-line distance for (a), the parallel-lines formula for (b), and the mean of the constants for (c).', scheme: [['(a) |4a + 10| = 20', 1], ['(a) points (5/2, 0) and (-15/2, 0)', 1], ['(b) 4x - 3y - 17.5 = 0 and d = 5.5', 1.5], ['(c) c = -3.75 and 16x - 12y - 15 = 0', 1.5]], d: 4, c: 'analysis', t: [3], time: 420 }), (Cx) => { Cx.assert(pts.every((a) => Math.abs(dd(a) - 4) < 1e-12) && range(-120, 40).filter((n) => Math.abs(dd(F(n, 8)) - 4) < 1e-12).length === 2 && dp.value === 5.5 && K(mid1) === '16,-12,-15' && Math.abs(distParallel(L, mid1).value - 2.75) < 1e-12 && Math.abs(distParallel(M, mid1).value - 2.75) < 1e-12, 'a = 5/2 or -15/2; 5.5; midline 16x - 12y - 15 = 0'); Cx.model([20, 5, 15, 17.5, 5.5, 3.75, 15, 2.75]); });
}
{
  const A = P(-2, 1), B = P(10, 6), C = P(1, -1), Lab = join(A, B), dC = dist(Lab, C), ar = area2(A, B, C), Lc = parallelThrough(Lab, C), dp = distParallel(Lab, Lc), ab2 = d2(A, B);
  Q('l06', mk.long({ stem: r`In triangle $ABC$ the vertices are $A(-2, 1)$, $B(10, 6)$ and $C(1, -1)$. Find (a) the length $AB$; (b) the equation of $AB$; (c) the length of the altitude from $C$ to $AB$; (d) the area of the triangle; (e) the equation of the line through $C$ parallel to $AB$, and its distance from $AB$.`, model: r`**(a)** $AB = \sqrt{12^2 + 5^2} = \sqrt{169} = 13$ units.\n\n**(b)** Slope $= \dfrac{6 - 1}{10 + 2} = \dfrac{5}{12}$, so $y - 1 = \dfrac{5}{12}(x + 2)$ gives $${eqTex(Lab)}$.\n\n**(c)** The altitude is the distance of $C$ from $AB$: $\dfrac{|5(1) - 12(-1) + 22|}{\sqrt{5^2 + 12^2}} = \dfrac{39}{13} = 3$ units.\n\n**(d)** Area $= \dfrac{1}{2} \times 13 \times 3 = \dfrac{39}{2} = 19.5$ square units.\n\n**(e)** The parallel through $C$ has the same slope: $y + 1 = \dfrac{5}{12}(x - 1)$, so $${eqTex(Lc)}$. The distance between the two parallel lines is $\dfrac{|22 - (-17)|}{13} = 3$ units, the same as the altitude.`, sol: 'Length, line, then the point-line distance as the altitude; parallel lines are as far apart as the altitude.', scheme: [['(a) AB = 13', 1], ['(b) 5x - 12y + 22 = 0', 1], ['(c) altitude 3', 1], ['(d) area 39/2', 1], ['(e) 5x - 12y - 17 = 0 at distance 3', 1]], d: 3, c: 'application', t: [2, 3], time: 450 }), (Cx) => { Cx.assert(ab2.eq(169) && K(Lab) === '5,-12,22' && dC.value === 3 && ar.eq(F(39, 2)) && ar.eq(ab2.num() === 169 ? F(13).mul(3).div(2) : F(0)) && K(Lc) === '5,-12,-17' && dp.value === 3, 'AB 13, altitude 3, area 19.5'); Cx.model([13, 22, 39, 3, 19.5, 17]); });
}
{
  const L = line(12, -5, 52), nf = normalForm(L), ft = P(F(nf.cn * nf.pnum, nf.r2), F(nf.sn * nf.pnum, nf.r2)), M = line(8, 15, -102), nm = normalForm(M);
  Q('l07', mk.long({ stem: r`(Formative practice.) (a) Reduce $12x - 5y + 52 = 0$ to the normal form $x\cos\omega + y\sin\omega = p$ and state $p$, $\cos\omega$ and $\sin\omega$. (b) Find the equation of the line for which $p = 6$, $\cos\omega = \dfrac{8}{17}$ and $\sin\omega = \dfrac{15}{17}$. (c) Show that the foot of the perpendicular from the origin to the line in (a) is $\left(-\dfrac{48}{13}, \dfrac{20}{13}\right)$.`, model: r`**(a)** $\sqrt{12^2 + 5^2} = 13$. The constant $52$ is positive, so write $-12x + 5y = 52$ and divide by $13$: $-\dfrac{12}{13}x + \dfrac{5}{13}y = 4$. So $p = 4$, $\cos\omega = -\dfrac{12}{13}$ and $\sin\omega = \dfrac{5}{13}$.\n\n**(b)** $\dfrac{8}{17}x + \dfrac{15}{17}y = 6$, and multiplying by $17$: $8x + 15y = 102$, that is $${eqTex(M)}$.\n\n**(c)** The foot is $(p\cos\omega, p\sin\omega) = \left(4 \times \left(-\dfrac{12}{13}\right), 4 \times \dfrac{5}{13}\right) = \left(-\dfrac{48}{13}, \dfrac{20}{13}\right)$. Check: $12\left(-\dfrac{48}{13}\right) - 5\left(\dfrac{20}{13}\right) + 52 = \dfrac{-576 - 100 + 676}{13} = 0$.`, sol: 'p is the distance from the origin; the foot of the perpendicular is p cos omega, p sin omega.', scheme: [['(a) divide by 13: cos, sin and p = 4', 1.5], ['(b) (8/17)x + (15/17)y = 6', 1], ['(b) 8x + 15y - 102 = 0', 1], ['(c) foot (-48/13, 20/13) and the check on the line', 1.5]], d: 3, c: 'application', t: [4], time: 390 }), (Cx) => { Cx.assert(nf.cn === -12 && nf.sn === 5 && nf.pv === 4 && ft[0].eq(F(-48, 13)) && ft[1].eq(F(20, 13)) && on(L, ft) && K(M) === '8,15,-102' && nm.pv === 6 && nm.cn === 8 && nm.sn === 15 && dist(L, P(0, 0)).value === 4, 'normal form p = 4, foot (-48/13, 20/13), 8x + 15y - 102 = 0'); Cx.model([13, 4, 12, 5, 102, 48, 20, 576, 676]); });
}

// =============================================================== case-based
{
  const A = P(-2, 3), B = P(6, 7), L = join(A, B), m = slope(A, B), c = yInt(L), Lp = perpThrough(L, B);
  caseQ('c01', {
    passage: r`The imagined Tarana Fields drone club draws its flight paths on a map grid in which $1$ unit stands for $100$ m. Path $1$ is a straight line from the take-off point $A(-2, 3)$ to the landing point $B(6, 7)$.`,
    d: 3, c: 'application',
    model: r`(a) Option (a). (b) $${c}$. (c) (i) $${eqTex(L)}$. Or (ii) $${eqTex(Lp)}$.`,
    sol: r`(a) $m = \dfrac{7 - 3}{6 + 2} = \dfrac{1}{2}$. (b) $y - 3 = \dfrac{1}{2}(x + 2)$ gives $y = \dfrac{x}{2} + 4$. (c) (i) $${eqTex(L)}$. (ii) slope $-2$ through $B$: $${eqTex(Lp)}$.`,
    children: [
      child('a', mk.mcq({ stem: 'The slope of path 1 is', opts: [r`$\dfrac{1}{2}$`, '$2$', r`$-\dfrac{1}{2}$`, '$-2$'], key: 'a', sol: r`$m = \dfrac{7 - 3}{6 - (-2)} = \dfrac{4}{8} = \dfrac{1}{2}$. The value $2$ inverts the fraction, and the negative values reverse the sign.`, d: 1, c: 'understanding', t: [1], time: 45 })),
      child('b', mk.num({ stem: 'Path 1, if it were extended, would cross the vertical axis of the map at height $y = k$. Find $k$.', value: 4, sol: r`$y - 3 = \dfrac{1}{2}(x + 2)$. Put $x = 0$: $y = 3 + 1 = 4$, so $k = 4$.`, scheme: [['y - 3 = (1/2)(x + 2) and y = 4 at x = 0', 1]], d: 2, c: 'application', t: [2], time: 75 })),
      child('c', mk.short({ marks: 2, stem: '**(i)** Write the equation of path 1 in the form $ax + by + c = 0$.', model: r`Slope $\dfrac{1}{2}$ through $(-2, 3)$: $y - 3 = \dfrac{1}{2}(x + 2)$, so $2y - 6 = x + 2$ and $${eqTex(L)}$.`, sol: 'Point-slope form, then clear the fraction.', scheme: [['y - 3 = (1/2)(x + 2)', 1], ['x - 2y + 8 = 0', 1]], d: 2, c: 'application', t: [2], time: 90 }), [
        mk.short({ marks: 2, stem: '**(ii)** A second path runs through the landing point $B$ at right angles to path 1. Find its equation in the form $ax + by + c = 0$.', model: r`The perpendicular slope is $-2$. Through $B(6, 7)$: $y - 7 = -2(x - 6)$ gives $${eqTex(Lp)}$.`, sol: 'Negative reciprocal slope through B.', scheme: [['Slope -2', 1], ['2x + y - 19 = 0', 1]], d: 3, c: 'application', t: [2], time: 105 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which([m.num(), 2, -0.5, -2], 0.5);
    Cx.child('b').val(c.num());
    Cx.child('c').assert(K(L) === '1,-2,8' && on(L, A) && on(L, B), 'x - 2y + 8 = 0');
    Cx.child('c').model([2, 6, 8]);
    Cx.child('cii').assert(K(Lp) === '2,1,-19' && isPerp(Lp, L) && on(Lp, B), '2x + y - 19 = 0');
    Cx.child('cii').model([2, 7, 6, 19]);
  });
}
{
  const L1 = line(1, -1, 2), L2 = line(1, -3, 8), ab = angleBetween(L1, L2), p = meet(L1, L2), L3 = perpThrough(L2, p);
  caseQ('c02', {
    passage: r`Two imagined laser beams in a school science lab are modelled, on a grid in centimetres, by the lines $L_1: x - y + 2 = 0$ and $L_2: x - 3y + 8 = 0$. The beams cross at a point $P$.`,
    d: 3, c: 'application',
    model: r`(a) Option (a). (b) $${dx(ab.tan)}$. (c) (i) $P(${p[0]}, ${p[1]})$. Or (ii) $${eqTex(L3)}$.`,
    sol: r`(a) $x - 3y + 8 = 0$ gives $y = \dfrac{x}{3} + \dfrac{8}{3}$. (b) $\tan\theta = \left|\dfrac{1 - \frac{1}{3}}{1 + \frac{1}{3}}\right| = \dfrac{1}{2} = 0.5$. (c) (i) subtract: $2y - 6 = 0$, so $y = 3$, $x = 1$. (ii) slope $-3$ through $P$: $${eqTex(L3)}$.`,
    children: [
      child('a', mk.mcq({ stem: 'The slope of beam $L_2$ is', opts: [r`$\dfrac{1}{3}$`, '$3$', r`$-\dfrac{1}{3}$`, r`$\dfrac{8}{3}$`], key: 'a', sol: r`$3y = x + 8$, so $y = \dfrac{1}{3}x + \dfrac{8}{3}$ and the slope is $\dfrac{1}{3}$. The value $3$ inverts it, $-\dfrac{1}{3}$ changes the sign, and $\dfrac{8}{3}$ is the $y$-intercept.`, d: 1, c: 'recall', t: [1], time: 45 })),
      child('b', mk.num({ stem: 'Find the tangent of the acute angle between the two beams (as a decimal).', value: 0.5, sol: r`The slopes are $1$ and $\dfrac{1}{3}$, so $\tan\theta = \left|\dfrac{1 - \frac{1}{3}}{1 + 1 \times \frac{1}{3}}\right| = \dfrac{2/3}{4/3} = 0.5$.`, scheme: [['Slopes 1 and 1/3', 0.5], ['tan(theta) = 0.5', 0.5]], d: 3, c: 'application', t: [1], time: 90 })),
      child('c', mk.short({ marks: 2, stem: '**(i)** Find the coordinates of the point $P$ where the beams cross.', model: r`Subtracting $L_2$ from $L_1$: $(x - y + 2) - (x - 3y + 8) = 2y - 6 = 0$, so $y = 3$. Then $x = y - 2 = 1$. So $P(1, 3)$.`, sol: 'Eliminate x by subtracting the two equations.', scheme: [['2y - 6 = 0, y = 3', 1], ['x = 1, so P(1, 3)', 1]], d: 2, c: 'application', t: [1, 2], time: 90 }), [
        mk.short({ marks: 2, stem: '**(ii)** A third beam passes through $P$ at right angles to $L_2$. Find its equation in the form $ax + by + c = 0$.', model: r`The slope of $L_2$ is $\dfrac{1}{3}$, so the perpendicular has slope $-3$. Through $P(1, 3)$: $y - 3 = -3(x - 1)$ gives $${eqTex(L3)}$.`, sol: 'Negative reciprocal slope through the crossing point.', scheme: [['Slope -3', 1], ['3x + y - 6 = 0', 1]], d: 3, c: 'application', t: [1, 2], time: 105 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which([slopeOf(L2).num(), 3, -1 / 3, 8 / 3], 1 / 3);
    Cx.child('b').val(ab.tan.num());
    Cx.child('c').assert(p[0].eq(1) && p[1].eq(3) && on(L1, p) && on(L2, p), 'P(1, 3)');
    Cx.child('c').model([2, 6, 3, 1]);
    Cx.child('cii').assert(K(L3) === '3,1,-6' && isPerp(L3, L2) && on(L3, p), '3x + y - 6 = 0');
    Cx.child('cii').model([3, 1, 6]);
  });
}
{
  const L = byIntercepts(9, -12), A = P(9, 0), B = P(0, -12), len = d2(A, B), d0 = dist(L, P(0, 0));
  const w1 = byIntercepts(-9, 12), w2 = byIntercepts(12, -9), w3 = byIntercepts(9, 12);
  caseQ('c03', {
    passage: r`A support rail for imagined solar panels on a roof plan meets the $x$-axis of the plan at $A(9, 0)$ and the $y$-axis at $B(0, -12)$, with lengths in metres.`,
    d: 3, c: 'application',
    model: r`(a) Option (a). (b) $${Math.sqrt(len.num())}$. (c) (i) $${eqTex(L)}$. Or (ii) $${d0.value}$.`,
    sol: r`(a) $\dfrac{x}{9} + \dfrac{y}{-12} = 1$. (b) $\sqrt{9^2 + 12^2} = ${Math.sqrt(len.num())}$. (c) (i) multiply by $36$: $4x - 3y = 36$. (ii) $\dfrac{36}{\sqrt{4^2 + 3^2}} = ${d0.value}$.`,
    children: [
      child('a', mk.mcq({ stem: 'The intercept form of the line through $A$ and $B$ is', opts: [r`$\dfrac{x}{9} + \dfrac{y}{-12} = 1$`, r`$\dfrac{x}{-9} + \dfrac{y}{12} = 1$`, r`$\dfrac{x}{12} + \dfrac{y}{-9} = 1$`, r`$\dfrac{x}{9} + \dfrac{y}{12} = 1$`], key: 'a', sol: r`The $x$-intercept is $9$ and the $y$-intercept is $-12$, so $\dfrac{x}{9} + \dfrac{y}{-12} = 1$. The other options change a sign or swap the intercepts.`, d: 2, c: 'understanding', t: [2], time: 60 })),
      child('b', mk.num({ stem: 'Find the length $AB$ of the rail, in metres.', value: 15, sol: r`$AB = \sqrt{(9 - 0)^2 + (0 + 12)^2} = \sqrt{225} = 15$ m.`, scheme: [['sqrt(81 + 144) = 15', 1]], d: 2, c: 'application', t: [2], time: 75 })),
      child('c', mk.short({ marks: 2, stem: '**(i)** Write the equation of the rail in the form $ax + by + c = 0$.', model: r`From $\dfrac{x}{9} - \dfrac{y}{12} = 1$, multiply by $36$: $4x - 3y = 36$, that is $${eqTex(L)}$.`, sol: 'Clear the denominators of the intercept form.', scheme: [['x/9 - y/12 = 1', 1], ['4x - 3y - 36 = 0', 1]], d: 2, c: 'application', t: [2], time: 90 }), [
        mk.short({ marks: 2, stem: '**(ii)** Find the perpendicular distance of the origin of the plan from the rail.', model: r`$d = \dfrac{|4(0) - 3(0) - 36|}{\sqrt{4^2 + 3^2}} = \dfrac{36}{5} = ${d0.value}$ m.`, sol: 'Substitute the origin into the distance formula.', scheme: [['|-36| over root 25', 1], ['d = 7.2 m', 1]], d: 3, c: 'application', t: [3], time: 90 }),
      ]),
    ],
  }, (Cx) => {
    Cx.assert(len.eq(225) && xInt(L).eq(9) && yInt(L).eq(-12) && K(L) === '4,-3,-36', 'rail 4x - 3y - 36 = 0');
    Cx.child('a').which([K(L), K(w1), K(w2), K(w3)], K(byIntercepts(9, -12)));
    Cx.child('b').val(Math.sqrt(len.num()));
    Cx.child('c').assert(on(L, A) && on(L, B), 'both points on the rail');
    Cx.child('c').model([36, 4, 3]);
    Cx.child('cii').assert(d0.value === 7.2 && d0.signed.eq(-36), '7.2');
    Cx.child('cii').model([36, 5, 7.2]);
  });
}
{
  const L = line(8, 15, -30), V = P(-5, -1), d = dist(L, V), L2 = parallelThrough(L, V), a = xInt(L), b = yInt(L), len2 = d2(P(a, 0), P(0, b)), dp = distParallel(L, L2);
  caseQ('c04', {
    passage: r`On the map of an imagined farming village, canal $1$ follows the line $8x + 15y - 30 = 0$ and the village well stands at $V(-5, -1)$. One unit on the map is $1$ km.`,
    d: 4, c: 'application',
    model: r`(a) Option (a). (b) $${d.value}$. (c) (i) $${eqTex(L2)}$. Or (ii) $${Math.sqrt(len2.num())}$.`,
    sol: r`(a) $15y = -8x + 30$, so $m = -\dfrac{8}{15}$. (b) $\dfrac{|8(-5) + 15(-1) - 30|}{17} = \dfrac{85}{17} = ${d.value}$. (c) (i) $8x + 15y + c = 0$ through $V$ gives $-55 + c = 0$. (ii) the intercepts are $\dfrac{15}{4}$ and $2$, so the length is $\sqrt{\dfrac{225}{16} + 4} = \dfrac{17}{4}$.`,
    children: [
      child('a', mk.mcq({ stem: 'The slope of canal 1 is', opts: [r`$-\dfrac{8}{15}$`, r`$\dfrac{8}{15}$`, r`$-\dfrac{15}{8}$`, r`$-2$`], key: 'a', sol: r`$15y = -8x + 30$, so $y = -\dfrac{8}{15}x + 2$ and the slope is $-\dfrac{8}{15}$. The other values change the sign, invert the fraction, or read the $y$-intercept with a minus sign.`, d: 1, c: 'recall', t: [1], time: 45 })),
      child('b', mk.num({ stem: 'Find the shortest distance, in km, from the well $V$ to canal 1.', value: 5, sol: r`$d = \dfrac{|8(-5) + 15(-1) - 30|}{\sqrt{8^2 + 15^2}} = \dfrac{85}{17} = 5$ km.`, scheme: [['|-40 - 15 - 30| = 85 and root of 289 = 17', 0.5], ['d = 5', 0.5]], d: 2, c: 'application', t: [3], time: 75 })),
      child('c', mk.short({ marks: 2, stem: '**(i)** A second canal runs through the well parallel to canal 1. Find its equation in the form $ax + by + c = 0$.', model: r`A parallel line is $8x + 15y + c = 0$. Through $V(-5, -1)$: $-40 - 15 + c = 0$, so $c = 55$ and the canal is $${eqTex(L2)}$.`, sol: 'Keep the coefficients; fix c by the point.', scheme: [['Form 8x + 15y + c = 0', 1], ['c = 55', 1]], d: 3, c: 'application', t: [2, 3], time: 105 }), [
        mk.short({ marks: 2, stem: '**(ii)** Find the length, in km, of the part of canal 1 that lies between the two axes of the map.', model: r`Putting $y = 0$ gives $x = \dfrac{15}{4}$, and putting $x = 0$ gives $y = 2$. The length is $\sqrt{\left(\dfrac{15}{4}\right)^2 + 2^2} = \sqrt{\dfrac{289}{16}} = \dfrac{17}{4} = 4.25$ km.`, sol: 'Find both intercepts, then use the distance between them.', scheme: [['Intercepts 15/4 and 2', 1], ['Length 17/4 = 4.25 km', 1]], d: 4, c: 'application', t: [2], time: 135 }),
      ]),
    ],
  }, (Cx) => {
    Cx.assert(slopeOf(L).eq(F(-8, 15)) && d.signed.eq(-85) && d.r2 === 289 && dp.value === 5, 'slope -8/15, distance 5');
    Cx.child('a').which([slopeOf(L).num(), 8 / 15, -15 / 8, -2], -8 / 15);
    Cx.child('b').val(d.value);
    Cx.child('c').assert(K(L2) === '8,15,55' && on(L2, V) && isParallel(L, L2), '8x + 15y + 55 = 0');
    Cx.child('c').model([40, 15, 55, 8]);
    Cx.child('cii').assert(a.eq(F(15, 4)) && b.eq(2) && len2.eq(F(289, 16)) && Math.sqrt(len2.num()) === 4.25, '17/4');
    Cx.child('cii').model([15, 4, 2, 17, 4.25]);
  });
}
{
  const L1 = line(5, -12, 17), L2 = line(5, -12, -22), dp = distParallel(L1, L2), Mid = line(10, -24, -5), T0 = P(-1, 1), d2t = dist(L2, T0);
  caseQ('c05', {
    passage: r`Two straight irrigation channels in an imagined orchard are modelled, with lengths in metres, by the parallel lines $5x - 12y + 17 = 0$ and $5x - 12y - 22 = 0$. A mango tree stands at $T(-1, 1)$.`,
    d: 4, c: 'application',
    model: r`(a) Option (a). (b) $${dp.value}$. (c) (i) $${eqTex(Mid)}$. Or (ii) $T$ lies on the first channel and is $${d2t.value}$ m from the second.`,
    sol: r`(a) $m = \dfrac{5}{12}$. (b) $\dfrac{|17 - (-22)|}{13} = \dfrac{39}{13} = ${dp.value}$. (c) (i) $c = \dfrac{17 + (-22)}{2} = -2.5$. (ii) $5(-1) - 12 + 17 = 0$ and $\dfrac{|-5 - 12 - 22|}{13} = 3$.`,
    children: [
      child('a', mk.mcq({ stem: 'The slope of both channels is', opts: [r`$\dfrac{5}{12}$`, r`$-\dfrac{5}{12}$`, r`$\dfrac{12}{5}$`, r`$-\dfrac{12}{5}$`], key: 'a', sol: r`$12y = 5x + 17$, so $y = \dfrac{5}{12}x + \dfrac{17}{12}$ and the slope is $\dfrac{5}{12}$. The same coefficients $5$ and $-12$ give the same slope for the second channel. The other values change the sign or invert the fraction.`, d: 1, c: 'recall', t: [1], time: 45 })),
      child('b', mk.num({ stem: 'Find the distance, in metres, between the two channels.', value: 3, sol: r`The coefficients already match, so $d = \dfrac{|17 - (-22)|}{\sqrt{5^2 + 12^2}} = \dfrac{39}{13} = 3$ m.`, scheme: [['|17 + 22| over root 169', 0.5], ['d = 3', 0.5]], d: 2, c: 'application', t: [3], time: 75 })),
      child('c', mk.short({ marks: 2, stem: '**(i)** A footpath is to run half-way between the channels, parallel to them. Find its equation in the form $ax + by + c = 0$ with integer coefficients.', model: r`The path is $5x - 12y + c = 0$ with $c = \dfrac{17 + (-22)}{2} = -2.5$, that is $5x - 12y - 2.5 = 0$. Multiplying by $2$ gives $${eqTex(Mid)}$.`, sol: 'The constant is the mean of the two constants.', scheme: [['c = -2.5', 1], ['10x - 24y - 5 = 0', 1]], d: 3, c: 'application', t: [3], time: 105 }), [
        mk.short({ marks: 2, stem: '**(ii)** Show that the tree $T$ lies on the first channel, and find its distance from the second channel.', model: r`Substituting $T(-1, 1)$ in the first channel: $5(-1) - 12(1) + 17 = 0$, so $T$ lies on it.\n\nDistance from $5x - 12y - 22 = 0$: $\dfrac{|-5 - 12 - 22|}{13} = \dfrac{39}{13} = 3$ m.`, sol: 'Substitute the point in each equation.', scheme: [['The first equation is satisfied', 1], ['Distance 3 m', 1]], d: 3, c: 'application', t: [3], time: 105 }),
      ]),
    ],
  }, (Cx) => {
    Cx.assert(slopeOf(L1).eq(F(5, 12)) && dp.value === 3 && dp.diff.eq(39), 'slope 5/12, distance 3');
    Cx.child('a').which([slopeOf(L1).num(), -5 / 12, 12 / 5, -12 / 5], 5 / 12);
    Cx.child('b').val(dp.value);
    Cx.child('c').assert(K(Mid) === '10,-24,-5' && Math.abs(distParallel(L1, Mid).value - 1.5) < 1e-12 && Math.abs(distParallel(L2, Mid).value - 1.5) < 1e-12, '10x - 24y - 5 = 0 at 1.5 m from each');
    Cx.child('c').model([17, 22, 2.5, 10, 24, 5]);
    Cx.child('cii').assert(on(L1, T0) && d2t.value === 3 && d2t.signed.eq(-39), 'T on the first channel, 3 m from the second');
    Cx.child('cii').model([5, 12, 17, 22, 39, 13, 3]);
  });
}
