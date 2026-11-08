// ISC 11 Mathematics ch12 Circles - 3-mark short-answer and 5-mark long-answer items.
import { Q, mk } from './lib.mjs';
import { Circle, fr, sqTex, relPos, contact, d2, P, range, solve2 } from './circ.mjs';

const r = String.raw;
const collinear = (a, b, c) => fr(b[1] - a[1]).mul(c[0] - b[0]).eq(fr(c[1] - b[1]).mul(b[0] - a[0]));

// ============================================================ short, 3 marks
{
  const c = Circle.three([1, 5], [-5, -3], [2, -2]);
  const rows = [[1, 5], [-5, -3], [2, -2]].map(([x, y]) => x * x + y * y + 4 * x - 2 * y - 20);
  Q('s301', mk.short({ marks: 3, stem: r`Find the equation of the circle that passes through the points $A(1, 5)$, $B(-5, -3)$ and $P(2, -2)$.`, model: r`Let the circle be $x^2 + y^2 + Dx + Ey + F = 0$. Substituting the points:

$A$: $D + 5E + F = -26$; $B$: $-5D - 3E + F = -34$; $P$: $2D - 2E + F = -8$.

Solving gives $D = 4$, $E = -2$, $F = -20$, so the circle is $x^2 + y^2 + 4x - 2y - 20 = 0$.`, sol: 'Three points give three linear equations in $D$, $E$, $F$; check the answer on each point.', scheme: [['Substitute the three points into the general form', 1], ['Solve: $D = 4$, $E = -2$, $F = -20$', 1], ['$x^2 + y^2 + 4x - 2y - 20 = 0$', 1]], d: 3, c: 'application', t: [2], time: 170 }), (C) => {
    C.assert(c.gen() === 'x^2 + y^2 + 4x - 2y - 20 = 0' && rows.every((v) => v === 0) && 1 + 25 + 4 - 10 - 20 === 0 && c.cen() === '(-2, 1)' && c.r2.eq(25), 'D = 4, E = -2, F = -20 satisfies all three equations; centre (-2, 1), r = 5'); C.model([26, 34, 8, 4, 2, 20]);
  });
}
{
  const sol = solve2(3, 4, 8, 3, 2, 10), c = Circle.centreThrough(sol, [7, 1]);
  Q('s302', mk.short({ marks: 3, stem: r`A circle passes through the points $(7, 1)$ and $(1, -3)$, and its centre lies on the line $3x + 4y = 8$. Find its equation.`, model: r`Let the centre be $(h, k)$. On the line: $3h + 4k = 8$. Equal distances to the two points: $(h - 7)^2 + (k - 1)^2 = (h - 1)^2 + (k + 3)^2$, which simplifies to $3h + 2k = 10$. Subtracting, $2k = -2$, so $k = -1$ and $h = 4$. Then $r^2 = (7 - 4)^2 + (1 + 1)^2 = 13$, and the circle is $(x - 4)^2 + (y + 1)^2 = 13$.`, sol: 'The centre lies on the line and on the perpendicular bisector of the chord.', scheme: [['$3h + 4k = 8$ and $3h + 2k = 10$', 1], ['Centre $(4, -1)$', 1], ['$r^2 = 13$ and the equation', 1]], d: 3, c: 'application', t: [2], time: 170 }), (C) => {
    const lhs = (h, k) => d2(P(h, k), P(7, 1)).sub(d2(P(h, k), P(1, -3)));
    C.assert(sol.map(String).join() === '4,-1' && c.r2.eq(13) && c.on([1, -3]) && 3 * 4 + 4 * -1 === 8 && range(-5, 5).every((h) => range(-5, 5).every((k) => lhs(h, k).eq(-12 * h - 8 * k + 40))), 'centre (4, -1) on the line, r^2 = 13; the bisector condition is 3h + 2k = 10'); C.model([8, 10, 4, 13]);
  });
}
{
  const c = Circle.diameter([-3, 0], [7, 2]);
  Q('s303', mk.short({ marks: 3, stem: r`Find the equation of the circle that has the segment joining $A(-3, 0)$ and $B(7, 2)$ as a diameter, and show that the point $D(3, 6)$ lies on it.`, model: r`Diameter form: $(x + 3)(x - 7) + (y - 0)(y - 2) = 0$, so $x^2 - 4x - 21 + y^2 - 2y = 0$, that is $x^2 + y^2 - 4x - 2y - 21 = 0$. At $D(3, 6)$: $9 + 36 - 12 - 12 - 21 = 0$, so $D$ lies on the circle.`, sol: 'Substitute the coordinates of $D$ into the left side and show that it is $0$.', scheme: [['Diameter form with the two ends', 1], ['$x^2 + y^2 - 4x - 2y - 21 = 0$', 1], ['Substitute $D$: $0$', 1]], d: 3, c: 'application', t: [1], time: 150 }), (C) => {
    C.assert(c.gen() === 'x^2 + y^2 - 4x - 2y - 21 = 0' && c.on([3, 6]) && 9 + 36 - 12 - 12 - 21 === 0 && c.cen() === '(2, 1)' && c.r2.eq(26) && (3 + 3) * (3 - 7) + 6 * (6 - 2) === 0, 'x^2 + y^2 - 4x - 2y - 21 = 0 passes through A, B and D(3, 6)'); C.model([3, 7, 4, 21, 2, 9, 36, 12]);
  });
}
{
  const c = Circle.general(-14, -2, -15), xc = c.xCut(), yc = c.yCut();
  Q('s304', mk.short({ marks: 3, stem: r`Find the lengths of the intercepts made by the circle $x^2 + y^2 - 14x - 2y - 15 = 0$ on the $x$-axis and on the $y$-axis.`, model: r`On the $x$-axis ($y = 0$): $x^2 - 14x - 15 = (x - 15)(x + 1) = 0$, so $x = 15$ or $x = -1$ and the intercept is $15 - (-1) = 16$. On the $y$-axis ($x = 0$): $y^2 - 2y - 15 = (y - 5)(y + 3) = 0$, so $y = 5$ or $y = -3$ and the intercept is $5 - (-3) = 8$.`, sol: 'The length of an intercept is the distance between its two roots.', scheme: [['Put $y = 0$: roots $15$ and $-1$', 1], ['Put $x = 0$: roots $5$ and $-3$', 1], ['Lengths $16$ and $8$', 1]], d: 3, c: 'application', t: [3], time: 150 }), (C) => {
    C.assert(xc.roots.map(String).join() === '-1,15' && yc.roots.map(String).join() === '-3,5' && xc.disc.eq(256) && yc.disc.eq(64) && 15 - -1 === 16 && 5 - -3 === 8, 'x-intercepts -1 and 15 (length 16); y-intercepts -3 and 5 (length 8)'); C.model([15, 1, 16, 5, 3, 8]);
  });
}
{
  const c = new Circle(5, -3, 25), hs = range(-60, 60).filter((h) => h !== 0 && (8 - h) ** 2 + 16 === h * h);
  Q('s305', mk.short({ marks: 3, stem: r`A circle touches the $y$-axis at the point $(0, -3)$ and passes through $(8, 1)$. Find its equation.`, model: r`The centre is $(h, -3)$ and the radius is $h$, since the circle touches the $y$-axis at $(0, -3)$. Passing through $(8, 1)$: $(8 - h)^2 + (1 + 3)^2 = h^2$, so $64 - 16h + 16 = 0$ and $h = 5$. The circle is $(x - 5)^2 + (y + 3)^2 = 25$.`, sol: 'The point of contact fixes the line containing the centre and the radius.', scheme: [['Centre $(h, -3)$, radius $h$', 1], ['$(8 - h)^2 + 16 = h^2$, so $h = 5$', 1], ['$(x - 5)^2 + (y + 3)^2 = 25$', 1]], d: 3, c: 'application', t: [2], time: 150 }), (C) => {
    C.assert(hs.join() === '5' && c.on([8, 1]) && c.on([0, -3]) && c.yCut().disc.isZero() && c.yCut().roots.map(String).join() === '-3,-3', 'h = 5: passes through (8, 1), touches x = 0 at (0, -3)'); C.model([3, 8, 1, 16, 5, 25]);
  });
}
{
  const c = Circle.general(8, -6, 0);
  Q('s306', mk.short({ marks: 3, stem: r`A circle passes through the origin and cuts off an intercept of length $8$ on the negative $x$-axis and an intercept of length $6$ on the positive $y$-axis. Find its equation and its radius.`, model: r`The circle passes through $O(0, 0)$, $(-8, 0)$ and $(0, 6)$. Since it passes through the origin, take $x^2 + y^2 + Dx + Ey = 0$. At $(-8, 0)$: $64 - 8D = 0$, so $D = 8$. At $(0, 6)$: $36 + 6E = 0$, so $E = -6$. The circle is $x^2 + y^2 + 8x - 6y = 0$, with centre $(-4, 3)$ and radius $\sqrt{16 + 9} = 5$.`, sol: 'Through the origin the constant term is zero, so only $D$ and $E$ are unknown.', scheme: [['$x^2 + y^2 + Dx + Ey = 0$ with points $(-8, 0)$ and $(0, 6)$', 1], ['$D = 8$, $E = -6$ and the equation', 1], ['Radius $5$', 1]], d: 3, c: 'application', t: [3], time: 150 }), (C) => {
    C.assert(c.gen() === 'x^2 + y^2 + 8x - 6y = 0' && c.on([0, 0]) && c.on([-8, 0]) && c.on([0, 6]) && c.rad.eq(5) && c.cen() === '(-4, 3)' && c.xCut().roots.map(String).join() === '-8,0' && c.yCut().roots.map(String).join() === '0,6', 'x^2 + y^2 + 8x - 6y = 0: intercept points (-8, 0), (0, 0), (0, 6); radius 5'); C.model([8, 6, 64, 36, 16, 9, 5]);
  });
}
{
  const c1 = Circle.general(4, -6, -156), c2 = Circle.general(-2, -14, -14), p = contact(c1, c2);
  Q('s307', mk.short({ marks: 3, stem: r`Show that the circles $x^2 + y^2 + 4x - 6y - 156 = 0$ and $x^2 + y^2 - 2x - 14y - 14 = 0$ touch each other internally, and find the point of contact.`, model: r`The first circle has centre $C_1(-2, 3)$ and $r_1 = \sqrt{4 + 9 + 156} = 13$. The second has centre $C_2(1, 7)$ and $r_2 = \sqrt{1 + 49 + 14} = 8$. Then $d = \sqrt{3^2 + 4^2} = 5 = 13 - 8 = r_1 - r_2$, so they touch internally. The point of contact divides $C_1C_2$ externally in the ratio $13 : 8$: $\left(\dfrac{13 \times 1 - 8 \times (-2)}{5}, \dfrac{13 \times 7 - 8 \times 3}{5}\right) = \left(\dfrac{29}{5}, \dfrac{67}{5}\right)$.`, sol: 'Internal contact: the point divides the line of centres externally in the ratio of the radii.', scheme: [['Centres $(-2, 3)$, $(1, 7)$; radii $13$, $8$', 1], ['$d = 5 = r_1 - r_2$: internal contact', 1], ['Point of contact $\\left(\\dfrac{29}{5}, \\dfrac{67}{5}\\right)$', 1]], d: 4, c: 'application', t: [3], time: 200 }), (C) => {
    C.assert(c1.cen() === '(-2, 3)' && c1.rad.eq(13) && c2.cen() === '(1, 7)' && c2.rad.eq(8) && relPos(c1, c2) === 'internal' && p.map(String).join() === '29/5,67/5' && c1.on(p) && c2.on(p), 'radii 13 and 8, d = 5: internal contact at (29/5, 67/5), on both circles'); C.model([13, 8, 5, 4, 156, 14, 29, 67, 7, 3, 49]);
  });
}
{
  const ks = [], c1 = new Circle(0, 0, 16);
  for (let k = -12; k <= 12; k++) { const k2 = relPos(c1, new Circle(k, 0, 9)); if (k2 === 'external' || k2 === 'internal') ks.push([k, k2]); }
  Q('s308', mk.short({ marks: 3, stem: r`The circles $x^2 + y^2 = 16$ and $(x - k)^2 + y^2 = 9$ touch each other. Find all possible values of $k$.`, model: r`The radii are $r_1 = 4$ and $r_2 = 3$, and the distance between the centres is $d = \lvert k \rvert$. External contact: $\lvert k \rvert = 4 + 3 = 7$, so $k = \pm 7$. Internal contact: $\lvert k \rvert = 4 - 3 = 1$, so $k = \pm 1$. Hence $k = 7, -7, 1$ or $-1$.`, sol: 'Treat external and internal contact as two separate cases.', scheme: [['$d = \\lvert k \\rvert$, $r_1 = 4$, $r_2 = 3$', 1], ['External: $k = \\pm 7$', 1], ['Internal: $k = \\pm 1$', 1]], d: 4, c: 'analysis', t: [3], time: 140 }), (C) => {
    C.assert(ks.map(([k, t]) => `${k}${t[0]}`).join() === '-7e,-1i,1i,7e', 'k = -7, 7 (external) and -1, 1 (internal) among all integers -12..12'); C.model([4, 3, 7, 1]);
  });
}
{
  const o = Circle.general(-4, 6, -3), c = Circle.centreThrough([2, -3], [4, -6]);
  Q('s309', mk.short({ marks: 3, stem: r`Find the equation of the circle that has the same centre as $x^2 + y^2 - 4x + 6y - 3 = 0$ and passes through $(4, -6)$. Is it larger or smaller than the given circle?`, model: r`The given circle has $g = -2$, $f = 3$, so its centre is $(2, -3)$ and $r^2 = 4 + 9 + 3 = 16$, $r = 4$. The new circle has the same centre and $r^2 = (4 - 2)^2 + (-6 + 3)^2 = 13$, so its equation is $(x - 2)^2 + (y + 3)^2 = 13$. Since $\sqrt{13} < 4$, it is smaller.`, sol: 'Concentric circles share the centre; only the radius changes.', scheme: [['Centre $(2, -3)$ and $r^2 = 16$ of the given circle', 1], ['$r^2 = 13$ and the equation', 1], ['$\\sqrt{13} < 4$: smaller', 1]], d: 2, c: 'application', t: [2], time: 120 }), (C) => {
    C.assert(o.cen() === '(2, -3)' && o.r2.eq(16) && c.r2.eq(13) && c.on([4, -6]) && c.r2.lt(o.r2) && c.cen() === o.cen(), 'same centre (2, -3); r^2 = 13 < 16'); C.model([2, 3, 16, 4, 6, 13]);
  });
}
{
  Q('s310', mk.short({ marks: 3, stem: r`Show that no circle passes through the three points $A(-3, -7)$, $B(0, -1)$ and $D(4, 7)$.`, model: r`The slope of $AB$ is $\dfrac{-1 + 7}{0 + 3} = 2$ and the slope of $BD$ is $\dfrac{7 + 1}{4 - 0} = \dfrac{8}{4} = 2$. The slopes are equal and $B$ is common, so $A$, $B$, $D$ lie on one straight line. A straight line meets a circle in at most two points, so no circle passes through all three.`, sol: 'Check collinearity before trying to solve for $D$, $E$, $F$.', scheme: [['Slope of $AB = 2$', 1], ['Slope of $BD = 2$, so the points are collinear', 1], ['A line meets a circle in at most two points', 1]], d: 3, c: 'analysis', t: [2], time: 130 }), (C) => {
    let threw = false;
    try { Circle.three([-3, -7], [0, -1], [4, 7]); } catch { threw = true; }
    C.assert(threw && collinear([-3, -7], [0, -1], [4, 7]) && fr(-1 + 7, 0 + 3).eq(2) && fr(7 + 1, 4).eq(2), 'slopes 2 and 2: collinear; the elimination for D, E, F fails'); C.model([1, 7, 3, 2, 8, 4]);
  });
}
{
  const c = new Circle(2, -1, 16);
  Q('s311', mk.short({ marks: 3, stem: r`Write the parametric equations of the circle with centre $(2, -1)$ and radius $4$. Find the point of the circle for $\theta = 60^\circ$ and verify that it lies on the circle.`, model: r`$x = 2 + 4\cos\theta$, $y = -1 + 4\sin\theta$. For $\theta = 60^\circ$: $x = 2 + 4 \times \dfrac{1}{2} = 4$ and $y = -1 + 4 \times \dfrac{\sqrt{3}}{2} = -1 + 2\sqrt{3}$. Check: $(4 - 2)^2 + (-1 + 2\sqrt{3} + 1)^2 = 4 + 12 = 16$.`, sol: 'Substitute $\\cos 60^\\circ = \\dfrac{1}{2}$ and $\\sin 60^\\circ = \\dfrac{\\sqrt{3}}{2}$.', scheme: [['$x = 2 + 4\\cos\\theta$, $y = -1 + 4\\sin\\theta$', 1], ['The point $(4, -1 + 2\\sqrt{3})$', 1], ['Check: $4 + 12 = 16$', 1]], d: 3, c: 'application', t: [1], time: 130 }), (C) => {
    const dx = fr(2), dy2 = fr(12);
    C.assert(dx.mul(dx).add(dy2).eq(16) && fr(4, 1).sub(2).eq(2) && c.verify() && Math.abs(2 + 4 * Math.cos(Math.PI / 3) - 4) < 1e-12 && Math.abs(-1 + 4 * Math.sin(Math.PI / 3) - (-1 + 2 * Math.sqrt(3))) < 1e-12 && sqTex(12) === r`2\sqrt{3}`, 'point (4, -1 + 2 sqrt 3): offsets 2 and 2 sqrt 3, squares 4 + 12 = 16'); C.model([2, 4, 3, 12, 16, 1]);
  });
}

// ============================================================ long, 5 marks
{
  const c = Circle.three([6, 6], [-2, 8], [4, -2]), xc = c.xCut(), yc = c.yCut();
  Q('l01', mk.long({ stem: r`The points $A(6, 6)$, $B(-2, 8)$ and $P(4, -2)$ lie on a circle $S$. Find

(a) the equation of $S$, [2]

(b) the centre and the radius of $S$, [1]

(c) the points where $S$ meets the $x$-axis, [1]

(d) the length of the intercept that $S$ makes on the $y$-axis. [1]`, model: r`(a) Let $S$ be $x^2 + y^2 + Dx + Ey + F = 0$. Then $A$: $6D + 6E + F = -72$; $B$: $-2D + 8E + F = -68$; $P$: $4D - 2E + F = -20$. Solving, $D = -2$, $E = -6$, $F = -24$, so $S$ is $x^2 + y^2 - 2x - 6y - 24 = 0$.

(b) $g = -1$, $f = -3$, so the centre is $(1, 3)$ and $r = \sqrt{1 + 9 + 24} = \sqrt{34}$.

(c) Put $y = 0$: $x^2 - 2x - 24 = (x - 6)(x + 4) = 0$, so the points are $(6, 0)$ and $(-4, 0)$.

(d) Put $x = 0$: $y^2 - 6y - 24 = 0$, with discriminant $36 + 96 = 132$. The intercept is $\sqrt{132} = 2\sqrt{33}$.`, sol: 'Solve for $D$, $E$, $F$ first; every later part reads the general equation.', scheme: [['(a) Three equations from the points', 1], ['(a) $x^2 + y^2 - 2x - 6y - 24 = 0$', 1], ['(b) Centre $(1, 3)$, $r = \\sqrt{34}$', 1], ['(c) $(6, 0)$ and $(-4, 0)$', 1], ['(d) $2\\sqrt{33}$', 1]], d: 3, c: 'application', t: [2, 3], time: 330 }), (C) => {
    C.assert(c.gen() === 'x^2 + y^2 - 2x - 6y - 24 = 0' && c.cen() === '(1, 3)' && c.r2.eq(34) && xc.roots.map(String).join() === '-4,6' && yc.disc.eq(132) && sqTex(132) === r`2\sqrt{33}` && [[6, 6], [-2, 8], [4, -2]].every(([x, y]) => c.on([x, y])), 'S: x^2 + y^2 - 2x - 6y - 24 = 0 through A, B, D; x-points (-4, 0), (6, 0); y-intercept sqrt 132'); C.model([72, 68, 20, 2, 6, 24, 1, 3, 34, 4, 132, 33]);
  });
}
{
  const sol = solve2(2, -1, 0, 2, -3, 4), c = Circle.centreThrough([-1, -2], [5, 0]);
  const lhs = (h, k) => d2(P(h, k), P(5, 0)).sub(d2(P(h, k), P(-3, 4)));
  Q('l02', mk.long({ stem: r`A circle $S$ passes through $A(5, 0)$ and $B(-3, 4)$, and its centre lies on the line $2x - 3y = 4$. Find

(a) the coordinates of the centre of $S$, [2]

(b) the equation of $S$, [1]

(c) the other point at which $S$ meets the $x$-axis, [1]

(d) the length of the intercept that $S$ makes on the $y$-axis. [1]`, model: r`(a) Let the centre be $(h, k)$. Equal distances from $A$ and $B$: $(h - 5)^2 + k^2 = (h + 3)^2 + (k - 4)^2$, which simplifies to $-16h + 8k = 0$, that is $k = 2h$. With $2h - 3k = 4$: $2h - 6h = 4$, so $h = -1$ and $k = -2$. The centre is $(-1, -2)$.

(b) $r^2 = (5 + 1)^2 + (0 + 2)^2 = 40$, so $S$ is $(x + 1)^2 + (y + 2)^2 = 40$, that is $x^2 + y^2 + 2x + 4y - 35 = 0$.

(c) Put $y = 0$: $x^2 + 2x - 35 = (x - 5)(x + 7) = 0$. The other point is $(-7, 0)$.

(d) Put $x = 0$: $y^2 + 4y - 35 = 0$, with discriminant $16 + 140 = 156$. The intercept is $\sqrt{156} = 2\sqrt{39}$.`, sol: 'The centre is on the perpendicular bisector of $AB$ and on the given line.', scheme: [['(a) Equal distances: $k = 2h$', 1], ['(a) Centre $(-1, -2)$', 1], ['(b) $r^2 = 40$ and the equation', 1], ['(c) $(-7, 0)$', 1], ['(d) $2\\sqrt{39}$', 1]], d: 4, c: 'application', t: [2, 3], time: 330 }), (C) => {
    C.assert(sol.map(String).join() === '-1,-2' && c.r2.eq(40) && c.on([-3, 4]) && c.gen() === 'x^2 + y^2 + 2x + 4y - 35 = 0' && c.xCut().roots.map(String).join() === '-7,5' && c.yCut().disc.eq(156) && sqTex(156) === r`2\sqrt{39}` && range(-5, 5).every((h) => range(-5, 5).every((k) => lhs(h, k).eq(-16 * h + 8 * k))) && 2 * -1 - 3 * -2 === 4, 'centre (-1, -2) on the line; r^2 = 40; x-points -7 and 5; y-intercept sqrt 156'); C.model([5, 3, 4, 16, 8, 2, 6, 40, 35, 7, 156, 39]);
  });
}
{
  const c1 = Circle.general(6, 2, -390), c2 = Circle.general(-6, -14, -42), p = contact(c1, c2);
  Q('l03', mk.long({ stem: r`Two circles have the equations $S_1: x^2 + y^2 + 6x + 2y - 390 = 0$ and $S_2: x^2 + y^2 - 6x - 14y - 42 = 0$.

(a) Find the centre and the radius of each circle. [2]

(b) Show that the circles touch each other internally. [1]

(c) Find the coordinates of the point of contact $T$. [1]

(d) Verify that $T$ lies on both circles. [1]`, model: r`(a) $S_1$: $g = 3$, $f = 1$, $c = -390$, so the centre is $C_1(-3, -1)$ and $r_1 = \sqrt{9 + 1 + 390} = 20$. $S_2$: $g = -3$, $f = -7$, $c = -42$, so the centre is $C_2(3, 7)$ and $r_2 = \sqrt{9 + 49 + 42} = 10$.

(b) $d = C_1C_2 = \sqrt{6^2 + 8^2} = 10 = 20 - 10 = r_1 - r_2$, so the circles touch internally.

(c) $T$ divides $C_1C_2$ externally in the ratio $20 : 10$: $T = \left(\dfrac{20 \times 3 - 10 \times (-3)}{10}, \dfrac{20 \times 7 - 10 \times (-1)}{10}\right) = (9, 15)$.

(d) In $S_1$: $81 + 225 + 54 + 30 - 390 = 0$. In $S_2$: $81 + 225 - 54 - 210 - 42 = 0$. Both hold, so $T$ lies on both circles.`, sol: 'Internal contact: $d = r_1 - r_2$, and $T$ is on the line of centres beyond the smaller centre.', scheme: [['(a) $C_1(-3, -1)$, $r_1 = 20$', 1], ['(a) $C_2(3, 7)$, $r_2 = 10$', 1], ['(b) $d = 10 = r_1 - r_2$', 1], ['(c) $T = (9, 15)$', 1], ['(d) Substitution in both equations', 1]], d: 3, c: 'application', t: [3], time: 330 }), (C) => {
    C.assert(c1.cen() === '(-3, -1)' && c1.rad.eq(20) && c2.cen() === '(3, 7)' && c2.rad.eq(10) && relPos(c1, c2) === 'internal' && p.map(String).join() === '9,15' && 81 + 225 + 54 + 30 - 390 === 0 && 81 + 225 - 54 - 210 - 42 === 0, 'radii 20 and 10, d = 10: internal contact at (9, 15), on both circles'); C.model([3, 1, 390, 20, 7, 42, 10, 6, 8, 9, 15, 81, 225, 54, 30, 210]);
  });
}
{
  const c = new Circle(3, -2, 25), ys = c.yCut(), xs = c.xCut(), px = fr(3).add(fr(4, 5).mul(5)), py = fr(-2).add(fr(3, 5).mul(5));
  Q('l04', mk.long({ stem: r`A circle is given by $x = 3 + 5\cos\theta$, $y = -2 + 5\sin\theta$.

(a) Find its equation in the form $(x - h)^2 + (y - k)^2 = r^2$. [1]

(b) Write the equation in the form $x^2 + y^2 + 2gx + 2fy + c = 0$. [1]

(c) Find the point of the circle for which $\cos\theta = \dfrac{4}{5}$ and $\sin\theta = \dfrac{3}{5}$, and verify that it lies on the circle. [1]

(d) Find the points where the circle meets the $y$-axis. [1]

(e) Find the points where the circle meets the $x$-axis. [1]`, model: r`(a) $\cos\theta = \dfrac{x - 3}{5}$ and $\sin\theta = \dfrac{y + 2}{5}$, so $(x - 3)^2 + (y + 2)^2 = 25$.

(b) Expanding: $x^2 - 6x + 9 + y^2 + 4y + 4 = 25$, so $x^2 + y^2 - 6x + 4y - 12 = 0$.

(c) $x = 3 + 5 \times \dfrac{4}{5} = 7$ and $y = -2 + 5 \times \dfrac{3}{5} = 1$. Check: $(7 - 3)^2 + (1 + 2)^2 = 16 + 9 = 25$.

(d) Put $x = 0$: $9 + (y + 2)^2 = 25$, so $y + 2 = \pm 4$ and $y = 2$ or $y = -6$. The points are $(0, 2)$ and $(0, -6)$.

(e) Put $y = 0$: $(x - 3)^2 + 4 = 25$, so $(x - 3)^2 = 21$ and $x = 3 \pm \sqrt{21}$. The points are $(3 + \sqrt{21}, 0)$ and $(3 - \sqrt{21}, 0)$.`, sol: 'Eliminate $\\theta$ once; every other part follows from the equation.', scheme: [['(a) $(x - 3)^2 + (y + 2)^2 = 25$', 1], ['(b) $x^2 + y^2 - 6x + 4y - 12 = 0$', 1], ['(c) $(7, 1)$ with the check', 1], ['(d) $(0, 2)$ and $(0, -6)$', 1], ['(e) $x = 3 \\pm \\sqrt{21}$', 1]], d: 3, c: 'application', t: [1, 3], time: 330 }), (C) => {
    C.assert(c.gen() === 'x^2 + y^2 - 6x + 4y - 12 = 0' && px.eq(7) && py.eq(1) && c.on([px, py]) && ys.roots.map(String).join() === '-6,2' && xs.disc.eq(84) && fr(21).mul(4).eq(84) && sqTex(21) === r`\sqrt{21}` && c.verify(), 'circle (3, -2), r = 5; point (7, 1); y-points (0, -6), (0, 2); x = 3 +- sqrt 21 (discriminant 84 = 4 x 21)'); C.model([3, 2, 25, 6, 4, 12, 7, 1, 16, 9, 21]);
  });
}
{
  const sol = solve2(1, 1, 9, 2, -1, 6), c = Circle.centreThrough(sol, [1, 4]);
  Q('l05', mk.long({ stem: r`A circle $S$ passes through $A(1, 4)$ and $B(5, 8)$, and its centre lies on the line $2x - y = 6$.

(a) Find the centre of $S$. [2]

(b) Find the equation of $S$ in the form $x^2 + y^2 + 2gx + 2fy + c = 0$. [1]

(c) Show that $S$ touches the $x$-axis. [1]

(d) Find the point at which $S$ touches the $x$-axis. [1]`, model: r`(a) For the centre $(h, k)$, equal distances from $A$ and $B$: $(h - 1)^2 + (k - 4)^2 = (h - 5)^2 + (k - 8)^2$, which simplifies to $h + k = 9$. With $2h - k = 6$: $3h = 15$, so $h = 5$ and $k = 4$. The centre is $(5, 4)$.

(b) $r^2 = (1 - 5)^2 + (4 - 4)^2 = 16$, so $(x - 5)^2 + (y - 4)^2 = 16$, that is $x^2 + y^2 - 10x - 8y + 25 = 0$.

(c) Put $y = 0$: $x^2 - 10x + 25 = (x - 5)^2 = 0$, a repeated root. (Also $r = 4 = \lvert k \rvert$.) So $S$ touches the $x$-axis.

(d) The repeated root is $x = 5$, so the point of contact is $(5, 0)$.`, sol: 'A repeated root when $y = 0$ means the circle touches the $x$-axis.', scheme: [['(a) $h + k = 9$ from equal distances', 1], ['(a) Centre $(5, 4)$', 1], ['(b) $x^2 + y^2 - 10x - 8y + 25 = 0$', 1], ['(c) $(x - 5)^2 = 0$, a repeated root', 1], ['(d) $(5, 0)$', 1]], d: 3, c: 'application', t: [2, 3], time: 300 }), (C) => {
    const lhs = (h, k) => d2(P(h, k), P(1, 4)).sub(d2(P(h, k), P(5, 8)));
    C.assert(sol.map(String).join() === '5,4' && c.r2.eq(16) && c.on([5, 8]) && c.gen() === 'x^2 + y^2 - 10x - 8y + 25 = 0' && c.xCut().disc.isZero() && c.xCut().roots.map(String).join() === '5,5' && range(-5, 8).every((h) => range(-5, 8).every((k) => lhs(h, k).eq(8 * h + 8 * k - 72))) && 2 * 5 - 4 === 6, 'centre (5, 4) on the line, r = 4, repeated root x = 5'); C.model([1, 4, 5, 8, 9, 6, 3, 16, 10, 25]);
  });
}
{
  const C0 = Circle.general(-12, -16, 96), a = new Circle(0, 0, 64), b = new Circle(12, 0, 64);
  const ts = range(-30, 30).filter((t) => d2(P(t, 0), P(6, 8)).eq(100)), tin = range(-30, 30).filter((t) => d2(P(t, 0), P(6, 8)).eq(36));
  Q('l06', mk.long({ stem: r`A circle $C$ has the equation $x^2 + y^2 - 12x - 16y + 96 = 0$.

(a) Find the centre and the radius of $C$. [1]

(b) A circle of radius $8$ has its centre on the $x$-axis and touches $C$ externally. Find the possible positions of its centre. [2]

(c) Write down the equations of these circles. [1]

(d) Show that no circle of radius $8$ with its centre on the $x$-axis can touch $C$ internally. [1]`, model: r`(a) $g = -6$, $f = -8$, $c = 96$, so the centre is $(6, 8)$ and $r = \sqrt{36 + 64 - 96} = 2$.

(b) Let the centre be $(t, 0)$. External contact needs $d = 2 + 8 = 10$, so $(t - 6)^2 + 8^2 = 100$. Then $(t - 6)^2 = 36$ and $t = 0$ or $t = 12$. The centres are $(0, 0)$ and $(12, 0)$.

(c) $x^2 + y^2 = 64$ and $(x - 12)^2 + y^2 = 64$.

(d) Internal contact needs $d = 8 - 2 = 6$. But the distance from $(6, 8)$ to any point $(t, 0)$ of the $x$-axis is at least $8$, since $(t - 6)^2 + 64 \ge 64$. As $8 > 6$, this is impossible.`, sol: 'Compare the distance from the centre to the $x$-axis with the required $d$.', scheme: [['(a) Centre $(6, 8)$, $r = 2$', 1], ['(b) $d = 10$ and $(t - 6)^2 + 64 = 100$', 1], ['(b) $t = 0$ or $12$', 1], ['(c) Both equations', 1], ['(d) $d = 6$ but the distance is at least $8$', 1]], d: 4, c: 'analysis', t: [3], time: 330 }), (C) => {
    C.assert(C0.cen() === '(6, 8)' && C0.rad.eq(2) && ts.join() === '0,12' && relPos(C0, a) === 'external' && relPos(C0, b) === 'external' && tin.length === 0 && a.gen() === 'x^2 + y^2 - 64 = 0' && b.gen() === 'x^2 + y^2 - 24x + 80 = 0' && range(-30, 30).every((t) => d2(P(t, 0), P(6, 8)).sub(64).sign() >= 0), 'centres (0, 0), (12, 0): external contact; internal would need d = 6 < 8, the least distance'); C.model([6, 8, 96, 36, 64, 2, 10, 100, 0, 12]);
  });
}
{
  const c = (k) => Circle.general(-8, -6, k);
  const rad2 = range(-5, 30).filter((k) => 25 - k === 4), tx = range(-5, 40).filter((k) => 64 - 4 * k === 0), ty = range(-5, 40).filter((k) => 36 - 4 * k === 0);
  Q('l07', mk.long({ stem: r`For each real number $k$ the equation $x^2 + y^2 - 8x - 6y + k = 0$ describes a circle, a point or no real curve.

(a) Show that, whenever it describes a circle, the centre is the same for every $k$, and find it. [1]

(b) Find the set of values of $k$ for which the equation represents a circle of positive radius. [1]

(c) Find $k$ when the radius is $2$. [1]

(d) Find $k$ when the circle touches the $x$-axis, and the point of contact. [1]

(e) Find $k$ when the circle touches the $y$-axis, and the point of contact. [1]`, model: r`(a) Here $g = -4$ and $f = -3$ do not involve $k$, so the centre is $(4, 3)$ for every $k$.

(b) $r^2 = 16 + 9 - k = 25 - k > 0$ needs $k < 25$.

(c) $25 - k = 4$ gives $k = 21$.

(d) Put $y = 0$: $x^2 - 8x + k = 0$. Equal roots need $64 - 4k = 0$, so $k = 16$ and $x = 4$. The point of contact is $(4, 0)$ (the radius is then $3$, equal to the $y$-coordinate of the centre).

(e) Put $x = 0$: $y^2 - 6y + k = 0$. Equal roots need $36 - 4k = 0$, so $k = 9$ and $y = 3$. The point of contact is $(0, 3)$ (the radius is then $4$, equal to the $x$-coordinate of the centre).`, sol: 'Only the constant term changes with $k$, so the centre stays fixed while $r^2 = 25 - k$.', scheme: [['(a) Centre $(4, 3)$ for every $k$', 1], ['(b) $25 - k > 0$, so $k < 25$', 1], ['(c) $k = 21$', 1], ['(d) $64 - 4k = 0$: $k = 16$, point $(4, 0)$', 1], ['(e) $36 - 4k = 0$: $k = 9$, point $(0, 3)$', 1]], d: 4, c: 'analysis', t: [1, 3], time: 330 }), (C) => {
    C.assert(c(21).rad.eq(2) && rad2.join() === '21' && tx.join() === '16' && ty.join() === '9' && c(16).xCut().roots.map(String).join() === '4,4' && c(16).rad.eq(3) && c(16).k.abs().eq(c(16).rad) && c(9).yCut().roots.map(String).join() === '3,3' && c(9).rad.eq(4) && c(9).h.abs().eq(c(9).rad) && [0, 10, 24].every((k) => c(k).cen() === '(4, 3)') && 25 - 25 === 0, 'centre (4, 3) for all k; k = 21 (r = 2), k = 16 (touches x-axis at (4, 0)), k = 9 (touches y-axis at (0, 3))'); C.model([4, 3, 25, 21, 64, 16, 36, 9]);
  });
}
