// ISC 11 Mathematics ch12 Circles - true-false, fill-blank, numerical and 2-mark short-answer items.
import { Q, mk } from './lib.mjs';
import { Circle, fr, relPos, d2, P, range } from './circ.mjs';

const r = String.raw;
const collinear = (a, b, c) => fr(b[1] - a[1]).mul(c[0] - b[0]).eq(fr(c[1] - b[1]).mul(b[0] - a[0]));

// ============================================================ true-false
Q('tf1', mk.tf({ stem: r`A circle can be drawn through any three points of the plane.`, key: 'f', sol: r`Three points on one straight line, such as $(1, 2)$, $(3, 4)$ and $(6, 7)$, lie on no circle, because a line meets a circle in at most two points. Three non-collinear points always give exactly one circle.`, d: 2, c: 'understanding', t: [2], time: 45 }), (C) => {
  let threw = false;
  try { Circle.three([1, 2], [3, 4], [6, 7]); } catch { threw = true; }
  C.assert(threw && collinear([1, 2], [3, 4], [6, 7]) && !collinear([1, 2], [3, 4], [6, 8]) && Circle.three([1, 2], [3, 4], [6, 8]).verify(), 'collinear triple has no circle; a non-collinear triple does'); C.key('f');
});
Q('tf2', mk.tf({ stem: r`The circle $x^2 + y^2 + 10x - 4y + 25 = 0$ touches the $x$-axis.`, key: 't', sol: r`Putting $y = 0$ gives $x^2 + 10x + 25 = (x + 5)^2 = 0$, a repeated root, so the circle touches the $x$-axis at $(-5, 0)$. Equivalently $g^2 = 25 = c$, and the radius is $2 = \lvert k \rvert$ for the centre $(-5, 2)$.`, d: 3, c: 'application', t: [3], time: 55 }), (C) => {
  const c = Circle.general(10, -4, 25);
  C.assert(c.xCut().disc.isZero() && c.xCut().roots.map(String).join() === '-5,-5' && c.cen() === '(-5, 2)' && c.rad.eq(2) && c.k.abs().eq(c.rad), 'repeated root x = -5; centre (-5, 2), radius 2 = k'); C.key('t');
});
Q('tf3', mk.tf({ stem: r`Two different circles with the same radius can touch each other internally.`, key: 'f', sol: r`Internal contact needs $d = \lvert r_1 - r_2 \rvert$. With equal radii this is $d = 0$, so the centres coincide and the two circles are the same circle, not two different ones. Equal circles can touch externally, with $d = 2r$, but never internally.`, d: 3, c: 'analysis', t: [3], time: 60 }), (C) => {
  const a = new Circle(0, 0, 9), same = new Circle(0, 0, 9), ext = new Circle(6, 0, 9);
  C.assert(relPos(a, same) === 'same' && relPos(a, ext) === 'external' && range(-12, 12).every((t) => relPos(a, new Circle(t, 0, 9)) !== 'internal'), 'equal circles are never internally tangent: d = 0 means identical; d = 6 gives external contact'); C.key('f');
});
Q('tf4', mk.tf({ stem: r`The point $(2 + 5\cos\theta, \; -1 + 5\sin\theta)$ lies on the circle $(x - 2)^2 + (y + 1)^2 = 25$ for every real value of $\theta$.`, key: 't', sol: r`Substituting gives $(5\cos\theta)^2 + (5\sin\theta)^2 = 25(\cos^2\theta + \sin^2\theta) = 25$, which holds for every $\theta$. This is why $x = h + r\cos\theta$, $y = k + r\sin\theta$ is the parametric form of the circle.`, d: 2, c: 'understanding', t: [1], time: 50 }), (C) => {
  const c = new Circle(2, -1, 25);
  const ok = range(0, 719).every((i) => { const t = (i * Math.PI) / 360, x = 2 + 5 * Math.cos(t), y = -1 + 5 * Math.sin(t); return Math.abs((x - 2) ** 2 + (y + 1) ** 2 - 25) < 1e-9; });
  C.assert(ok && c.verify(), '720 sampled values of theta all give points of the circle'); C.key('t');
});
Q('tf5', mk.tf({ stem: r`A circle that passes through the origin and has its centre on the $y$-axis has an equation with no $x$ term, of the form $x^2 + y^2 + 2fy = 0$.`, key: 't', sol: r`The centre is $(0, k)$, so $g = 0$; passing through the origin makes $c = 0$. The equation is $x^2 + y^2 + 2fy = 0$ with $f = -k$. For example the centre $(0, 3)$ gives $x^2 + y^2 - 6y = 0$.`, d: 2, c: 'understanding', t: [1], time: 50 }), (C) => {
  const c = new Circle(0, 3, 9), d = Circle.general(0, -6, 0);
  C.assert(c.on([0, 0]) && c.D.isZero() && c.F.isZero() && c.gen() === 'x^2 + y^2 - 6y = 0' && d.cen() === '(0, 3)' && d.on([0, 0]) && range(-5, 5).filter((k) => k !== 0).every((k) => Circle.centreThrough([0, k], [0, 0]).D.isZero() && Circle.centreThrough([0, k], [0, 0]).F.isZero()), 'for centres (0, k) through the origin: D = 0 and F = 0'); C.key('t');
});

// ============================================================ fill-blank
Q('fb1', mk.fill({ stem: r`The circle $x^2 + y^2 + 4x - 12y - 41 = 0$ has radius ____ units.`, acc: [['9']], sol: r`$g = 2$, $f = -6$, $c = -41$, so $r = \sqrt{4 + 36 + 41} = \sqrt{81} = 9$.`, d: 2, c: 'understanding', t: [1], time: 50 }), (C) => {
  const c = Circle.general(4, -12, -41);
  C.assert(c.rad.eq(9) && c.cen() === '(-2, 6)' && c.on([7, 6]) && c.on([-2, -3]), 'radius 9, centre (-2, 6); (7, 6) and (-2, -3) are on the circle'); C.blank(9);
});
Q('fb2', mk.fill({ stem: r`The ends of a diameter of a circle are $(3, -7)$ and $(-5, 1)$. The sum of the coordinates of its centre is ____.`, acc: [['-4']], sol: r`The centre is the midpoint $\left(\dfrac{3 - 5}{2}, \dfrac{-7 + 1}{2}\right) = (-1, -3)$, and $-1 + (-3) = -4$.`, d: 2, c: 'understanding', t: [1], time: 50 }), (C) => {
  const c = Circle.diameter([3, -7], [-5, 1]);
  C.assert(c.cen() === '(-1, -3)' && c.h.add(c.k).eq(-4) && c.r2.eq(32), 'centre (-1, -3); sum -4; r^2 = 32'); C.blank(-4);
});
Q('fb3', mk.fill({ stem: r`A circle with centre $(4, -5)$ touches the $y$-axis. Its radius is ____ units.`, acc: [['4']], sol: r`The distance from the centre to the $y$-axis is $\lvert 4 \rvert = 4$, and a circle touching an axis has this distance as its radius.`, d: 1, c: 'recall', t: [1], time: 35 }), (C) => {
  const c = new Circle(4, -5, 16);
  C.assert(c.rad.eq(4) && c.h.eq(4) && c.yCut().disc.isZero() && c.yCut().roots.map(String).join() === '-5,-5', 'radius 4: x = 0 gives a repeated root y = -5'); C.blank(4);
});
Q('fb4', mk.fill({ stem: r`Two circles of radii $7$ and $12$ touch each other internally. The distance between their centres is ____ units.`, acc: [['5']], sol: r`For internal contact $d = \lvert r_1 - r_2 \rvert = 12 - 7 = 5$.`, d: 1, c: 'recall', t: [3], time: 35 }), (C) => {
  const a = new Circle(0, 0, 144), b = new Circle(5, 0, 49), c = new Circle(19, 0, 49);
  C.assert(relPos(a, b) === 'internal' && relPos(a, c) === 'external' && d2(P(0, 0), P(5, 0)).eq(25), 'd = 5 gives internal contact (d = 19 would be external)'); C.blank(5);
});
Q('fb5', mk.fill({ stem: r`The circle $x^2 + y^2 - 4x - 12 = 0$ meets the $x$-axis at $(6, 0)$ and at a second point whose $x$-coordinate is ____.`, acc: [['-2']], sol: r`Putting $y = 0$ gives $x^2 - 4x - 12 = (x - 6)(x + 2) = 0$, so the other point has $x = -2$.`, d: 2, c: 'understanding', t: [3], time: 45 }), (C) => {
  const c = Circle.general(-4, 0, -12);
  C.assert(c.xCut().roots.map(String).join() === '-2,6' && c.on([-2, 0]) && c.on([6, 0]), 'x-intercepts -2 and 6'); C.blank(-2);
});

// ============================================================ numerical
Q('n1', mk.num({ stem: r`The circle $x^2 + y^2 - 14x + 4y + 45 = 0$ cuts the $x$-axis at two points. How far apart are these points?`, value: 4, unit: null, sol: r`Putting $y = 0$ gives $x^2 - 14x + 45 = (x - 5)(x - 9) = 0$, so the intercept is $9 - 5 = 4$.`, scheme: [['$x^2 - 14x + 45 = 0$ with roots $5$ and $9$', 1]], marks: 1, d: 2, c: 'understanding', t: [3], time: 70 }), (C) => {
  const c = Circle.general(-14, 4, 45);
  C.assert(c.xCut().roots.map(String).join() === '5,9' && c.xCut().disc.eq(16) && 9 - 5 === 4, 'x-intercepts 5 and 9, length 4'); C.val(4);
});
Q('n2', mk.num({ stem: r`The points $O(0, 0)$, $A(12, 0)$ and $B(0, 5)$ lie on a circle. Find the radius of the circle.`, value: 6.5, unit: null, sol: r`Angle $AOB$ is a right angle, so $AB$ is a diameter and $AB = \sqrt{12^2 + 5^2} = 13$. The radius is $13 \div 2 = 6.5$.`, scheme: [['$AB$ is a diameter of length $13$', 1]], marks: 1, d: 3, c: 'application', t: [2], time: 100 }), (C) => {
  const c = Circle.three([0, 0], [12, 0], [0, 5]);
  C.assert(c.gen() === 'x^2 + y^2 - 12x - 5y = 0' && c.r2.eq(fr(169, 4)) && c.rad.eq(fr(13, 2)) && c.cen() === '(6, \\dfrac{5}{2})' && d2(P(12, 0), P(0, 5)).eq(169), 'x^2 + y^2 - 12x - 5y = 0, r^2 = 169/4, r = 13/2'); C.val(6.5);
});
Q('n3', mk.num({ stem: r`The circle $x^2 + y^2 - 4x + 6y + k = 0$ passes through the point $(5, 1)$. Find the value of $k$.`, value: -12, unit: null, sol: r`Substituting gives $25 + 1 - 20 + 6 + k = 0$, so $12 + k = 0$ and $k = -12$.`, scheme: [['Substitute $(5, 1)$ and solve for $k$', 1]], marks: 1, d: 2, c: 'understanding', t: [1], time: 60 }), (C) => {
  const ks = range(-60, 60).filter((k) => 25 + 1 - 20 + 6 + k === 0), c = Circle.general(-4, 6, -12);
  C.assert(ks.join() === '-12' && c.on([5, 1]) && c.cen() === '(2, -3)' && c.r2.eq(25), 'k = -12 (search -60..60); the circle has centre (2, -3), radius 5'); C.val(-12);
});
Q('n4', mk.num({ stem: r`For how many positive whole-number values of $k$ does $x^2 + y^2 - 6x + 4y + k = 0$ represent a circle of positive radius?`, value: 12, unit: null, sol: r`$g = -3$, $f = 2$, so $r^2 = 9 + 4 - k = 13 - k > 0$ needs $k < 13$. The positive whole numbers $1, 2, \ldots, 12$ give $12 = 13 - 1$ values; $k = 13$ gives a point.`, scheme: [['$13 - k > 0$, so $k < 13$', 1]], marks: 1, d: 3, c: 'application', t: [1], time: 80 }), (C) => {
  const ks = range(1, 40).filter((k) => 13 - k > 0);
  C.assert(ks.length === 12 && ks[11] === 12 && Circle.general(-6, 4, 12).r2.eq(1) && 13 - 13 === 0, 'k = 1 to 12: 12 values (k = 13 gives radius 0)'); C.val(12);
});
Q('n5', mk.num({ stem: r`A circle has centre $(-3, 2)$ and radius $4$. A second circle with centre $(2, 14)$ touches it externally. Find the radius of the second circle.`, value: 9, unit: null, sol: r`The distance between the centres is $\sqrt{5^2 + 12^2} = 13$. For external contact $d = r_1 + r_2$, so $13 = 4 + r_2$ and $r_2 = 9$.`, scheme: [['$d = 13$ and $d = r_1 + r_2$', 1]], marks: 1, d: 2, c: 'application', t: [3], time: 80 }), (C) => {
  const a = new Circle(-3, 2, 16), b = new Circle(2, 14, 81);
  C.assert(d2(P(-3, 2), P(2, 14)).eq(169) && relPos(a, b) === 'external' && [5, 7, 9, 11].filter((rr) => relPos(a, new Circle(2, 14, rr * rr)) === 'external').join() === '9', 'd = 13; only radius 9 gives external contact'); C.val(9);
});
Q('n6', mk.num({ stem: r`A point on the circle $x = -2 + 10\cos\theta$, $y = 3 + 10\sin\theta$ has $\cos\theta = \dfrac{3}{5}$ and $\sin\theta = -\dfrac{4}{5}$. Find the sum of its coordinates.`, value: -1, unit: null, sol: r`$x = -2 + 10 \times \dfrac{3}{5} = 4$ and $y = 3 + 10 \times \left(-\dfrac{4}{5}\right) = -5$, so $x + y = 4 - 5 = -1$.`, scheme: [['$x = 4$ and $y = -5$', 1]], marks: 1, d: 3, c: 'application', t: [1], time: 90 }), (C) => {
  const x = fr(-2).add(fr(3, 5).mul(10)), y = fr(3).add(fr(-4, 5).mul(10)), c = new Circle(-2, 3, 100);
  C.assert(x.eq(4) && y.eq(-5) && c.on([x, y]) && x.add(y).eq(-1) && fr(3, 5).mul(fr(3, 5)).add(fr(4, 5).mul(fr(4, 5))).eq(1), 'point (4, -5) lies on the circle; sum -1'); C.val(-1);
});

// ============================================================ short, 2 marks
{
  const c = new Circle(-2, 5, 16);
  Q('s201', mk.short({ marks: 2, stem: r`Find the equation of the circle with centre $(-2, 5)$ and radius $4$, in the form $x^2 + y^2 + Dx + Ey + F = 0$.`, model: r`$(x + 2)^2 + (y - 5)^2 = 16$, that is $x^2 + 4x + 4 + y^2 - 10y + 25 = 16$, so $x^2 + y^2 + 4x - 10y + 13 = 0$.`, sol: 'Write the standard form first, then multiply out and collect the constant.', scheme: [['$(x + 2)^2 + (y - 5)^2 = 16$', 1], ['$x^2 + y^2 + 4x - 10y + 13 = 0$', 1]], d: 1, c: 'understanding', t: [1], time: 80 }), (C) => {
    C.assert(c.gen() === 'x^2 + y^2 + 4x - 10y + 13 = 0' && c.F.eq(4 + 25 - 16) && c.verify(), 'x^2 + y^2 + 4x - 10y + 13 = 0 from centre (-2, 5), radius 4'); C.model([16, 4, 10, 13]);
  });
}
{
  const c = Circle.general(8, -6, -24);
  Q('s202', mk.short({ marks: 2, stem: r`Determine the centre and the radius of the circle with equation $x^2 + y^2 + 8x - 6y - 24 = 0$.`, model: r`$g = 4$, $f = -3$, $c = -24$. The centre is $(-g, -f) = (-4, 3)$ and $r = \sqrt{16 + 9 + 24} = \sqrt{49} = 7$.`, sol: 'Read $g$, $f$ and $c$ from the coefficients, then apply the two formulae.', scheme: [['Centre $(-4, 3)$', 1], ['Radius $7$', 1]], d: 2, c: 'understanding', t: [1], time: 80 }), (C) => {
    C.assert(c.cen() === '(-4, 3)' && c.rad.eq(7) && c.on([3, 3]) && c.on([-4, -4]), 'centre (-4, 3), radius 7; (3, 3) and (-4, -4) on the circle'); C.model([4, 3, 24, 49, 7]);
  });
}
{
  const c = Circle.diameter([5, -3], [-1, 7]);
  Q('s203', mk.short({ marks: 2, stem: r`Use the diameter form to find the equation of the circle that has the segment joining $P(5, -3)$ and $Q(-1, 7)$ as a diameter.`, model: r`$(x - 5)(x + 1) + (y + 3)(y - 7) = 0$, so $x^2 - 4x - 5 + y^2 - 4y - 21 = 0$, that is $x^2 + y^2 - 4x - 4y - 26 = 0$.`, sol: 'Multiply the two products and collect like terms.', scheme: [['Diameter form $(x - 5)(x + 1) + (y + 3)(y - 7) = 0$', 1], ['$x^2 + y^2 - 4x - 4y - 26 = 0$', 1]], d: 2, c: 'understanding', t: [1], time: 90 }), (C) => {
    C.assert(c.gen() === 'x^2 + y^2 - 4x - 4y - 26 = 0' && c.cen() === '(2, 2)' && c.r2.eq(34) && c.on([5, -3]) && c.on([-1, 7]), 'x^2 + y^2 - 4x - 4y - 26 = 0; centre (2, 2), r^2 = 34'); C.model([5, 3, 7, 4, 21, 26]);
  });
}
{
  const c = new Circle(-4, 1, 9), ok = range(0, 359).every((deg) => { const t = (deg * Math.PI) / 180, x = 3 * Math.cos(t) - 4, y = 3 * Math.sin(t) + 1; return Math.abs((x + 4) ** 2 + (y - 1) ** 2 - 9) < 1e-9; });
  Q('s204', mk.short({ marks: 2, stem: r`A point moves so that $x = 3\cos\theta - 4$ and $y = 3\sin\theta + 1$. Eliminate $\theta$ and state the centre and radius of the curve traced.`, model: r`$\cos\theta = \dfrac{x + 4}{3}$ and $\sin\theta = \dfrac{y - 1}{3}$, so $(x + 4)^2 + (y - 1)^2 = 9$. The curve is a circle with centre $(-4, 1)$ and radius $3$.`, sol: 'Use $\\cos^2\\theta + \\sin^2\\theta = 1$ after isolating the cosine and sine.', scheme: [['$(x + 4)^2 + (y - 1)^2 = 9$', 1], ['Centre $(-4, 1)$, radius $3$', 1]], d: 2, c: 'understanding', t: [1], time: 90 }), (C) => {
    C.assert(ok && c.cen() === '(-4, 1)' && c.rad.eq(3), '360 sampled values of theta satisfy (x + 4)^2 + (y - 1)^2 = 9'); C.model([4, 3, 1, 9]);
  });
}
{
  const c = new Circle(1, -2, 29), ks = range(-30, 30).filter((k) => c.on([k, 3]));
  Q('s205', mk.short({ marks: 2, stem: r`The point $(k, 3)$ lies on the circle $(x - 1)^2 + (y + 2)^2 = 29$. Find all possible values of $k$.`, model: r`$(k - 1)^2 + (3 + 2)^2 = 29$, so $(k - 1)^2 = 4$ and $k - 1 = \pm 2$. Hence $k = 3$ or $k = -1$.`, sol: 'Substitute and take both square roots.', scheme: [['$(k - 1)^2 = 4$', 1], ['$k = 3$ or $k = -1$', 1]], d: 2, c: 'application', t: [1], time: 90 }), (C) => {
    C.assert(ks.join() === '-1,3' && c.on([3, 3]) && c.on([-1, 3]), 'k = -1 and k = 3 (search -30..30)'); C.model([29, 4, 2, 3, 1]);
  });
}
{
  const c = Circle.general(-2, 0, -15), xc = c.xCut();
  Q('s206', mk.short({ marks: 2, stem: r`Find the points at which the circle $x^2 + y^2 - 2x - 15 = 0$ meets the $x$-axis.`, model: r`Put $y = 0$: $x^2 - 2x - 15 = 0$, so $(x - 5)(x + 3) = 0$ and $x = 5$ or $x = -3$. The points are $(5, 0)$ and $(-3, 0)$.`, sol: 'Meeting the $x$-axis means $y = 0$.', scheme: [['$x^2 - 2x - 15 = 0$', 1], ['$(5, 0)$ and $(-3, 0)$', 1]], d: 2, c: 'understanding', t: [3], time: 80 }), (C) => {
    C.assert(xc.roots.map(String).join() === '-3,5' && c.on([5, 0]) && c.on([-3, 0]), 'x-intercepts -3 and 5'); C.model([2, 15, 5, 3]);
  });
}
{
  const c1 = new Circle(0, 0, 25), c2 = Circle.general(-18, -24, 125);
  Q('s207', mk.short({ marks: 2, stem: r`Show that the circles $x^2 + y^2 = 25$ and $x^2 + y^2 - 18x - 24y + 125 = 0$ touch externally.`, model: r`The first circle has centre $(0, 0)$ and $r_1 = 5$. The second has centre $(9, 12)$ and $r_2 = \sqrt{81 + 144 - 125} = 10$. Then $d = \sqrt{81 + 144} = 15 = 5 + 10 = r_1 + r_2$, so they touch externally.`, sol: 'Compare $d$ with $r_1 + r_2$.', scheme: [['Centres and radii $5$ and $10$', 1], ['$d = 15 = r_1 + r_2$', 1]], d: 2, c: 'application', t: [3], time: 100 }), (C) => {
    C.assert(c2.cen() === '(9, 12)' && c2.rad.eq(10) && relPos(c1, c2) === 'external' && d2(P(0, 0), P(9, 12)).eq(225), 'centre (9, 12), radius 10, d = 15 = 5 + 10: external'); C.model([5, 9, 12, 81, 144, 125, 10, 15]);
  });
}
{
  const c = new Circle(-4, -6, 16);
  Q('s208', mk.short({ marks: 2, stem: r`A circle with centre $(-4, -6)$ touches the $y$-axis. Find its equation.`, model: r`The distance from the centre to the $y$-axis is $\lvert -4 \rvert = 4$, so $r = 4$. The equation is $(x + 4)^2 + (y + 6)^2 = 16$.`, sol: 'For a circle touching the $y$-axis the radius is $\\lvert h \\rvert$.', scheme: [['$r = 4$', 1], ['$(x + 4)^2 + (y + 6)^2 = 16$', 1]], d: 1, c: 'understanding', t: [1], time: 60 }), (C) => {
    C.assert(c.yCut().disc.isZero() && c.xCut().disc.sign() < 0 && c.h.abs().eq(c.rad), 'x = 0 gives a repeated root (it touches the y-axis); y = 0 has no real root'); C.model([4, 6, 16]);
  });
}
{
  const c = Circle.centreThrough([3, -4], [0, 0]);
  Q('s209', mk.short({ marks: 2, stem: r`Find the equation of the circle whose centre is $(3, -4)$ and which passes through the origin, in the form $x^2 + y^2 + 2gx + 2fy + c = 0$.`, model: r`$r^2 = 3^2 + 4^2 = 25$, so $(x - 3)^2 + (y + 4)^2 = 25$, which expands to $x^2 + y^2 - 6x + 8y = 0$.`, sol: 'Passing through the origin means the constant term is $0$.', scheme: [['$r^2 = 25$ and $(x - 3)^2 + (y + 4)^2 = 25$', 1], ['$x^2 + y^2 - 6x + 8y = 0$', 1]], d: 2, c: 'understanding', t: [2], time: 80 }), (C) => {
    C.assert(c.gen() === 'x^2 + y^2 - 6x + 8y = 0' && c.on([0, 0]) && c.F.isZero() && c.r2.eq(25), 'x^2 + y^2 - 6x + 8y = 0; r^2 = 25'); C.model([3, 4, 25, 6, 8]);
  });
}
{
  const c1 = new Circle(0, 0, 100), c2 = Circle.general(-4, -2, -11);
  Q('s210', mk.short({ marks: 2, stem: r`Show that the circle $x^2 + y^2 - 4x - 2y - 11 = 0$ lies entirely inside the circle $x^2 + y^2 = 100$.`, model: r`The first circle has centre $(2, 1)$ and $r_1 = \sqrt{4 + 1 + 11} = 4$; the second has centre $(0, 0)$ and $r_2 = 10$. Then $d = \sqrt{2^2 + 1^2} = \sqrt{5}$, and $r_2 - r_1 = 6$. Since $\sqrt{5} < 6$, one circle lies inside the other.`, sol: 'Compare $d$ with $r_2 - r_1$.', scheme: [['Centres $(2, 1)$, $(0, 0)$; radii $4$ and $10$', 1], ['$d = \\sqrt{5} < 6$, so it lies inside', 1]], d: 3, c: 'application', t: [3], time: 100 }), (C) => {
    C.assert(c2.cen() === '(2, 1)' && c2.rad.eq(4) && relPos(c1, c2) === 'inside' && d2(P(0, 0), P(2, 1)).eq(5) && fr(5).lt(36), 'centre (2, 1), radius 4; d^2 = 5 < 36: inside'); C.model([2, 1, 11, 4, 10, 5, 6]);
  });
}
