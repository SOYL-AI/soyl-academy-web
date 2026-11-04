// CBSE 11 Mathematics ch10 Conic Sections — objective items (mcq, assertion-reason, true-false, fill-blank, numerical)
// with independent re-solve checks. Every centre, radius, focus, directrix, axis, eccentricity and latus rectum is computed from the
// equation in conic.mjs (exact rationals and exact surds), and every curve is tested numerically there. Distractors come from the plausible wrong method.
import { Q, mk } from './lib.mjs';
import { r, range, Rat, q, N, tx, Circle, Parabola, Ellipse, Hyperbola, sectionOf, sqrtQ, near } from './conic.mjs';

export { r };

// =============================================================== MCQ
{
  Q('m01', mk.mcq({ stem: r`A right circular cone is cut by a plane that is perpendicular to its axis and does not pass through the vertex. The curve of section is a`, opts: ['circle', 'ellipse', 'parabola', 'hyperbola'], key: 'a', sol: r`Every point of the section is at the same distance from the point where the axis meets the plane, so it is a circle. A tilted plane would give an ellipse, a plane parallel to a slant side a parabola, and a steep plane cutting both cones a hyperbola.`, d: 1, c: 'recall', t: [1], time: 45 }), (Cx) => { Cx.assert(sectionOf(35, 90) === 'circle', 'beta = 90 gives a circle'); Cx.which([sectionOf(35, 90), sectionOf(35, 60), sectionOf(35, 35), sectionOf(35, 10)], 'circle'); });
}
{
  Q('m02', mk.mcq({ stem: r`The semi-vertical angle of a right circular cone is $35^\circ$. A plane that misses the vertex meets the axis at an angle of $50^\circ$. The section is a`, opts: ['ellipse', 'parabola', 'hyperbola', 'circle'], key: 'a', sol: r`The angle $50^\circ$ lies between the semi-vertical angle $35^\circ$ and $90^\circ$, so the plane cuts across one cone and the section is an ellipse. The angle would have to equal $35^\circ$ for a parabola, be smaller for a hyperbola, and be $90^\circ$ for a circle.`, d: 2, c: 'understanding', t: [1], time: 60 }), (Cx) => { Cx.assert(35 < 50 && 50 < 90, '35 < 50 < 90'); Cx.which([sectionOf(35, 50), sectionOf(35, 35), sectionOf(35, 20), sectionOf(35, 90)], 'ellipse'); });
}
{
  Q('m03', mk.mcq({ stem: r`A plane makes an angle of $25^\circ$ with the axis of a right circular cone whose semi-vertical angle is $40^\circ$, and it does not pass through the vertex. The curve in which it cuts the cone is a`, opts: ['hyperbola', 'ellipse', 'parabola', 'circle'], key: 'a', sol: r`The plane is steeper than a slant side, because $25^\circ < 40^\circ$, so it cuts both cones and gives the two branches of a hyperbola. An ellipse needs an angle above $40^\circ$, and a parabola exactly $40^\circ$.`, d: 2, c: 'application', t: [1], time: 60 }), (Cx) => { Cx.assert(25 < 40, '25 < 40'); Cx.which([sectionOf(40, 25), sectionOf(40, 60), sectionOf(40, 40), sectionOf(40, 90)], 'hyperbola'); });
}
{
  const c = Circle.fromGeneral(6, -2, -6), W = (h, k, rr) => `centre $(${tx(h)}, ${tx(k)})$, radius $${tx(rr)}$`;
  const g2 = Rat.of(9).add(1).add(-6); // g^2 + f^2 + c with the wrong sign of c
  Q('m04', mk.mcq({ stem: r`The circle $x^2 + y^2 + 6x - 2y - 6 = 0$ has`, opts: [W(-3, 1, 4), W(3, -1, 4), W(-3, 1, 16), W(-3, 1, 2)], key: 'a', sol: r`Here $g = 3$, $f = -1$, $c = -6$. The centre is $(-g, -f) = (-3, 1)$ and $r = \sqrt{9 + 1 + 6} = 4$. Taking the centre as $(g, f) = (3, -1)$ gives the wrong centre, stopping at $r^2 = 16$ gives radius $16$, and using $r^2 = g^2 + f^2 + c = 4$ gives radius $2$.`, d: 2, c: 'application', t: [1], time: 75 }), (Cx) => { Cx.assert(c.h.eq(-3) && c.k.eq(1) && c.radius.eq(4) && g2.eq(4) && c.std() === '(x + 3)^2 + (y - 1)^2 = 16' && c.verifySampling(), 'centre (-3, 1), radius 4'); Cx.which([[-3, 1, 4], [3, -1, 4], [-3, 1, 16], [-3, 1, N(sqrtQ(g2))]], [N(c.h), N(c.k), N(c.radius)]); });
}
{
  const c = new Circle(-2, 5, 25);
  const O = (h, k, rr) => `$${new Circle(h, k, rr).std()}$`;
  Q('m05', mk.mcq({ stem: r`The circle whose centre is $(-2, 5)$ and which passes through the point $(1, 1)$ has the equation`, opts: [O(-2, 5, 25), O(2, -5, 25), O(-2, 5, 5), O(-2, 5, 7)], key: 'a', sol: r`$r^2 = (1 + 2)^2 + (1 - 5)^2 = 9 + 16 = 25$, so the equation is $(x + 2)^2 + (y - 5)^2 = 25$. The centre $(2, -5)$ has wrong signs, writing $5$ on the right uses $r$ in place of $r^2$, and $7$ adds the coordinate differences $3 + 4$.`, d: 2, c: 'application', t: [1], time: 75 }), (Cx) => { Cx.assert(c.on([1, 1]) && !new Circle(2, -5, 25).on([1, 1]) && c.radius.eq(5), '(1, 1) on the circle'); Cx.which([[-2, 5, 25], [2, -5, 25], [-2, 5, 5], [-2, 5, 7]], [-2, 5, N(c.r2)]); });
}
{
  const c = Circle.fromDiameter([1, 2], [7, 6]);
  const O = (h, k, rr) => `$${new Circle(h, k, rr).std()}$`;
  Q('m06', mk.mcq({ stem: r`The line segment joining $A(1, 2)$ and $B(7, 6)$ is a diameter of a circle. The equation of the circle is`, opts: [O(4, 4, 13), O(4, 4, 52), O(4, 4, 26), O(8, 8, 13)], key: 'a', sol: r`The centre is the midpoint $(4, 4)$ and $r^2 = (4 - 1)^2 + (4 - 2)^2 = 13$, so the equation is $(x - 4)^2 + (y - 4)^2 = 13$. The value $52$ is the whole diameter squared, $26$ is half of that, and the centre $(8, 8)$ is the sum of the ends, not the midpoint.`, d: 3, c: 'application', t: [1], time: 90 }), (Cx) => { Cx.assert(c.h.eq(4) && c.k.eq(4) && c.r2.eq(13) && c.on([1, 2]) && c.on([7, 6]), 'centre (4, 4), r^2 = 13'); Cx.which([[4, 4, 13], [4, 4, 52], [4, 4, 26], [8, 8, 13]], [4, 4, N(c.r2)]); });
}
{
  const c = new Circle(1, -2, 25), pts = [[3, 0], [4, 2], [6, 3], [-3, -5]], sg = pts.map((p) => c.pos(p));
  Q('m07', mk.mcq({ stem: r`With respect to the circle $(x - 1)^2 + (y + 2)^2 = 25$, exactly one of the following points lies strictly inside it. It is`, opts: ['$(3, 0)$', '$(4, 2)$', '$(6, 3)$', '$(-3, -5)$'], key: 'a', sol: r`The squared distances from the centre $(1, -2)$ are $8$, $25$, $50$ and $25$ for $(3, 0)$, $(4, 2)$, $(6, 3)$ and $(-3, -5)$ in that order. Only $8 < 25$ is inside; $(4, 2)$ and $(-3, -5)$ lie on the circle and $(6, 3)$ outside.`, d: 2, c: 'application', t: [1], time: 75 }), (Cx) => { Cx.assert(sg.join() === '-1,0,1,0' && [8, 25, 50, 25].every((v, i) => Rat.of(pts[i][0] - 1).pow(2).add(Rat.of(pts[i][1] + 2).pow(2)).eq(v)), 'only (3, 0) is inside'); Cx.which(sg, -1); });
}
{
  const c = Circle.fromGeneral(-4, 6, 4);
  const touchX = c.k.abs().eq(c.radius), touchY = c.h.abs().eq(c.radius);
  Q('m08', mk.mcq({ stem: r`The circle $x^2 + y^2 - 4x + 6y + 4 = 0$ touches`, opts: ['the $x$-axis only', 'the $y$-axis only', 'both the $x$-axis and the $y$-axis', 'neither axis'], key: 'a', sol: r`The centre is $(2, -3)$ and $r^2 = 4 + 9 - 4 = 9$, so $r = 3$. The distance from the centre to the $x$-axis is $|-3| = 3 = r$, so the circle touches the $x$-axis. The distance to the $y$-axis is $2 < 3$, so the $y$-axis cuts it in two points.`, d: 3, c: 'analysis', t: [1], time: 105 }), (Cx) => { Cx.assert(c.h.eq(2) && c.k.eq(-3) && c.radius.eq(3) && touchX && !touchY && c.xCut() === null && c.yCut().half2.eq(5), 'touches the x-axis only'); Cx.which([touchX && !touchY, !touchX && touchY, touchX && touchY, !touchX && !touchY], true); });
}
{
  const p = new Parabola('y2', 24);
  Q('m09', mk.mcq({ stem: r`The parabola $y^2 = 24x$ has its focus at`, opts: ['$(6, 0)$', '$(24, 0)$', '$(12, 0)$', '$(0, 6)$'], key: 'a', sol: r`Compare with $y^2 = 4ax$: $4a = 24$, so $a = 6$ and the focus is $(a, 0) = (6, 0)$. The point $(24, 0)$ uses $4a$, $(12, 0)$ uses $2a$, and $(0, 6)$ puts $a$ on the wrong axis.`, d: 1, c: 'recall', t: [2], time: 45 }), (Cx) => { Cx.assert(p.a.eq(6) && p.verify(), 'a = 6'); Cx.which([[6, 0], [24, 0], [12, 0], [0, 6]], [N(p.focus[0]), N(p.focus[1])]); });
}
{
  const p = new Parabola('x2', -20), d = p.directrix;
  Q('m10', mk.mcq({ stem: r`The directrix of the parabola $x^2 = -20y$ is the line`, opts: ['$y = 5$', '$y = -5$', '$x = 5$', '$y = 20$'], key: 'a', sol: r`Compare with $x^2 = -4ay$: $4a = 20$, so $a = 5$. The parabola opens downward with focus $(0, -5)$, so the directrix lies above the vertex: $y = a = 5$. The line $y = -5$ passes through the focus, $x = 5$ is vertical, and $y = 20$ uses $4a$.`, d: 2, c: 'understanding', t: [2], time: 60 }), (Cx) => { Cx.assert(p.a.eq(5) && p.focus[1].eq(-5) && d.axis === 'y' && d.value.eq(5) && p.verify(), 'directrix y = 5'); Cx.which(['y=5', 'y=-5', 'x=5', 'y=20'], `${d.axis}=${d.value}`); });
}
{
  const p = new Parabola('y2', -10);
  Q('m11', mk.mcq({ stem: r`The length of the latus rectum of the parabola $y^2 = -10x$ is`, opts: ['$10$', '$5$', '$2.5$', '$40$'], key: 'a', sol: r`For $y^2 = -4ax$ the latus rectum has length $4a$, which is the size of the coefficient: $|-10| = 10$. Here $a = 2.5$, so $5$ is $2a$, $2.5$ is $a$, and $40$ is $4 \times 10$.`, d: 2, c: 'understanding', t: [2], time: 60 }), (Cx) => { Cx.assert(p.lr.eq(10) && p.a.eq('5/2') && p.verify(), 'LR = 10'); Cx.which([N(p.lr), N(p.a.mul(2)), N(p.a), 40], 10); });
}
{
  const p = new Parabola('y2', 20), via = new Parabola('y2', Rat.of(5).mul(4));
  Q('m12', mk.mcq({ stem: r`A parabola has its vertex at the origin and its focus at $(5, 0)$. Its equation is`, opts: ['$y^2 = 20x$', '$y^2 = 5x$', '$y^2 = 10x$', '$x^2 = 20y$'], key: 'a', sol: r`The focus is on the positive $x$-axis, so the parabola opens right: $y^2 = 4ax$ with $a = 5$, giving $y^2 = 20x$. The equation $y^2 = 5x$ forgets the factor $4$, $y^2 = 10x$ uses $2a$, and $x^2 = 20y$ has its focus on the $y$-axis.`, d: 2, c: 'understanding', t: [2], time: 60 }), (Cx) => { Cx.assert(via.k.eq(20) && via.kind === 'y2' && via.focus[0].eq(5) && p.verify(), 'y^2 = 20x'); Cx.which(['y2=20', 'y2=5', 'y2=10', 'x2=20'], `${via.kind}=${via.k}`); });
}
{
  const k = Rat.of(36).div(-3), p = new Parabola('x2', k);
  Q('m13', mk.mcq({ stem: r`A parabola has its vertex at the origin, its axis along the $y$-axis, and it passes through the point $(6, -3)$. Its equation is`, opts: ['$x^2 = -12y$', '$x^2 = 12y$', '$y^2 = -12x$', '$x^2 = -3y$'], key: 'a', sol: r`The point has $y < 0$, so the parabola opens downward: $x^2 = ky$ with $k < 0$. Then $36 = k(-3)$ gives $k = -12$, so $x^2 = -12y$. The equation $x^2 = 12y$ has the wrong sign, $y^2 = -12x$ the wrong axis, and $x^2 = -3y$ is not satisfied by $(6, -3)$.`, d: 3, c: 'application', t: [2], time: 75 }), (Cx) => { Cx.assert(k.eq(-12) && p.on([6, -3]) && !new Parabola('x2', -3).on([6, -3]) && !new Parabola('x2', 12).on([6, -3]), 'x^2 = -12y'); Cx.which(['x2=-12', 'x2=12', 'y2=-12', 'x2=-3'], `${p.kind}=${p.k}`); });
}
{
  const p = new Parabola('y2', 24);
  const dist = p.a.add(10);
  // exact check with the (irrational) ordinate through squares: (x - a)^2 + y^2 = (x + a)^2 with y^2 = 4ax
  const lhs = Rat.of(10).sub(6).pow(2).add(Rat.of(24).mul(10)), rhs = Rat.of(10).add(6).pow(2);
  Q('m14', mk.mcq({ stem: r`A point $P$ on the parabola $y^2 = 24x$ has abscissa $10$. Its distance from the focus is`, opts: ['$16$', '$10$', '$6$', '$34$'], key: 'a', sol: r`The focus is $(6, 0)$ and the directrix is $x = -6$. The distance from the focus equals the distance from the directrix: $10 + 6 = 16$. The value $10$ is the distance from the $y$-axis, $6$ is $a$, and $34$ adds $24$ instead of $6$.`, d: 3, c: 'application', t: [2], time: 90 }), (Cx) => { Cx.assert(dist.eq(16) && lhs.eq(rhs) && rhs.eq(256) && p.verify(), 'distance 16'); Cx.which([N(dist), 10, N(p.a), 10 + 24], 16); });
}
{
  const e = new Ellipse(169, 25);
  Q('m15', mk.mcq({ stem: r`The foci of the ellipse $\dfrac{x^2}{169} + \dfrac{y^2}{25} = 1$ are`, opts: [r`$(\pm 12, 0)$`, r`$(\pm 13, 0)$`, r`$(\pm 5, 0)$`, r`$(0, \pm 12)$`], key: 'a', sol: r`The larger denominator is under $x^2$, so the major axis is along the $x$-axis with $a^2 = 169$ and $b^2 = 25$. Then $c^2 = 169 - 25 = 144$ and $c = 12$: foci $(\pm 12, 0)$. The points $(\pm 13, 0)$ are the vertices, $(\pm 5, 0)$ use $b$, and $(0, \pm 12)$ are on the wrong axis.`, d: 2, c: 'understanding', t: [3], time: 75 }), (Cx) => { Cx.assert(e.major === 'x' && e.c.eq(12) && e.a.eq(13) && e.b.eq(5) && e.verifySampling(), 'foci (+-12, 0)'); Cx.which(['x12', 'x13', 'x5', 'y12'], `${e.major}${e.c}`); });
}
{
  const e = new Ellipse(49, 36), wrong = Rat.of(36).div(49);
  Q('m16', mk.mcq({ stem: r`The eccentricity of the ellipse $\dfrac{x^2}{49} + \dfrac{y^2}{36} = 1$ is`, opts: [r`$\dfrac{\sqrt{13}}{7}$`, r`$\dfrac{6}{7}$`, r`$\dfrac{13}{49}$`, r`$\dfrac{\sqrt{85}}{7}$`], key: 'a', sol: r`Here $a = 7$ and $b = 6$, so $c^2 = 49 - 36 = 13$ and $e = \dfrac{c}{a} = \dfrac{\sqrt{13}}{7}$. The value $\dfrac{6}{7}$ is $\dfrac{b}{a}$, $\dfrac{13}{49}$ is $e^2$, and $\dfrac{\sqrt{85}}{7}$ comes from $c^2 = a^2 + b^2$.`, d: 3, c: 'application', t: [3], time: 90 }), (Cx) => { Cx.assert(e.e2.eq('13/49') && e.tex('e') === '\\dfrac{\\sqrt{13}}{7}' && e.verifySampling() && wrong.eq('36/49'), 'e = sqrt(13)/7'); Cx.which(['13/49', '36/49', '169/2401', '85/49'], e.e2.toString()); });
}
{
  const h = new Hyperbola('y', 144, 25);
  Q('m17', mk.mcq({ stem: r`The foci of the hyperbola $\dfrac{y^2}{144} - \dfrac{x^2}{25} = 1$ are`, opts: [r`$(0, \pm 13)$`, r`$(\pm 13, 0)$`, r`$(0, \pm \sqrt{119})$`, r`$(0, \pm 12)$`], key: 'a', sol: r`The $y^2$ term is positive, so the transverse axis is along the $y$-axis. Here $a^2 = 144$, $b^2 = 25$ and, for a hyperbola, $c^2 = a^2 + b^2 = 169$, so $c = 13$: foci $(0, \pm 13)$. The option $(\pm 13, 0)$ is on the wrong axis, $\sqrt{119}$ comes from $a^2 - b^2$, and $(0, \pm 12)$ are the vertices.`, d: 3, c: 'understanding', t: [3], time: 90 }), (Cx) => { Cx.assert(h.kind === 'y' && h.c.eq(13) && Rat.of(144).sub(25).eq(119) && h.verifySampling(), 'foci (0, +-13)'); Cx.which(['y13', 'x13', 'y119', 'y12'], `${h.kind}${h.c}`); });
}
{
  const h = new Hyperbola('x', 25, 144);
  Q('m18', mk.mcq({ stem: r`The latus rectum of the hyperbola $\dfrac{x^2}{25} - \dfrac{y^2}{144} = 1$ has length`, opts: [r`$\dfrac{288}{5}$`, r`$\dfrac{144}{5}$`, r`$\dfrac{25}{6}$`, r`$\dfrac{24}{5}$`], key: 'a', sol: r`With $a = 5$ and $b = 12$, the latus rectum is $\dfrac{2b^2}{a} = \dfrac{2 \times 144}{5} = \dfrac{288}{5}$. The value $\dfrac{144}{5}$ is half of it, $\dfrac{25}{6}$ is $\dfrac{2a^2}{b}$ and $\dfrac{24}{5}$ is $\dfrac{2b}{a}$.`, d: 3, c: 'understanding', t: [3], time: 90 }), (Cx) => { Cx.assert(h.lr.eq('288/5') && h.verifySampling(), '288/5'); Cx.which([N(h.lr), N(h.lr.div(2)), 50 / 12, 24 / 5], 288 / 5); });
}
{
  const e = new Ellipse(100, 64), A = (a, b) => `$\\dfrac{x^2}{${a}} + \\dfrac{y^2}{${b}} = 1$`;
  Q('m19', mk.mcq({ stem: r`An ellipse has its centre at the origin, its foci at $(\pm 6, 0)$ and eccentricity $\dfrac{3}{5}$. Its equation is`, opts: [A(100, 64), A(64, 100), A(100, 136), A(100, 36)], key: 'a', sol: r`$c = 6$ and $e = \dfrac{c}{a} = \dfrac{3}{5}$ give $a = 10$. Then $b^2 = a^2 - c^2 = 100 - 36 = 64$, so the equation is $\dfrac{x^2}{100} + \dfrac{y^2}{64} = 1$. Swapping the axes puts $100$ under $y^2$ instead, $b^2 = a^2 + c^2$ gives $136$, and $b^2 = c^2$ gives $36$.`, d: 4, c: 'analysis', t: [3], time: 120 }), (Cx) => { Cx.assert(e.c.eq(6) && e.a.eq(10) && e.e.eq('3/5') && e.verifySampling(), 'x^2/100 + y^2/64 = 1'); Cx.which([[100, 64], [64, 100], [100, 136], [100, 36]], [N(e.A), N(e.B)]); });
}

// =============================================================== assertion-reason
{
  Q('ar1', mk.ar({ a: r`A plane perpendicular to the axis of a right circular cone, not through the vertex, cuts the cone in a circle.`, r: r`Every point of such a section is at the same distance from the point where the axis meets the plane.`, key: 'a', sol: r`By symmetry about the axis, all points of the section are equally far from the point where the axis meets the plane, which is exactly the definition of a circle, so R explains A.`, d: 2, c: 'understanding', t: [1] }), (Cx) => { Cx.assert(sectionOf(30, 90) === 'circle' && sectionOf(55, 90) === 'circle', 'circle for any cone'); Cx.key('a'); });
}
{
  let threw = false; try { Circle.fromGeneral(4, -6, 20); } catch { threw = true; }
  const t = Rat.of(2).pow(2).add(Rat.of(-3).pow(2)).sub(20);
  Q('ar2', mk.ar({ a: r`The equation $x^2 + y^2 + 4x - 6y + 20 = 0$ represents a circle.`, r: r`The equation $x^2 + y^2 + 2gx + 2fy + c = 0$ represents a real circle only when $g^2 + f^2 - c > 0$.`, key: 'd', sol: r`R is true, because $g^2 + f^2 - c$ is the square of the radius. For the given equation $g = 2$, $f = -3$, $c = 20$ and $g^2 + f^2 - c = 4 + 9 - 20 = -7 < 0$, so there is no real circle and A is false.`, d: 3, c: 'analysis', t: [1] }), (Cx) => { Cx.assert(threw && t.eq(-7), 'g^2 + f^2 - c = -7'); Cx.key('d'); });
}
{
  const p = new Parabola('y2', -16), q2 = new Parabola('x2', 4);
  Q('ar3', mk.ar({ a: r`The parabola $y^2 = -16x$ has its focus at $(-4, 0)$.`, r: r`Every parabola whose vertex is at the origin has a vertical directrix.`, key: 'c', sol: r`A is true: $4a = 16$, $a = 4$, and the parabola opens left with focus $(-4, 0)$. R is false: the parabola $x^2 = 4y$ also has its vertex at the origin, but its directrix $y = -1$ is horizontal.`, d: 3, c: 'understanding', t: [2] }), (Cx) => { Cx.assert(p.focus[0].eq(-4) && p.focus[1].eq(0) && q2.directrix.axis === 'y' && q2.directrix.value.eq(-1), 'A true, R false'); Cx.key('c'); });
}
{
  const e = new Ellipse(289, 225);
  Q('ar4', mk.ar({ a: r`The ellipse $\dfrac{x^2}{289} + \dfrac{y^2}{225} = 1$ has eccentricity $\dfrac{8}{17}$.`, r: r`The eccentricity of every ellipse is a number strictly between $0$ and $1$.`, key: 'b', sol: r`A is true: $a = 17$, $b = 15$, $c^2 = 289 - 225 = 64$, $c = 8$ and $e = \dfrac{8}{17}$. R is also true, since $c < a$ and $c > 0$ for an ellipse that is not a circle. But R is a general fact; it does not compute $\dfrac{8}{17}$, so it does not explain A.`, d: 3, c: 'understanding', t: [3] }), (Cx) => { Cx.assert(e.c.eq(8) && e.e.eq('8/17') && e.e2.gt(0) && e.e2.lt(1), 'e = 8/17'); Cx.key('b'); });
}
{
  const h = new Hyperbola('x', 9, 16);
  Q('ar5', mk.ar({ a: r`The asymptotes of the hyperbola $\dfrac{x^2}{9} - \dfrac{y^2}{16} = 1$ are the lines $y = \pm\dfrac{4}{3}x$.`, r: r`The asymptotes of $\dfrac{x^2}{a^2} - \dfrac{y^2}{b^2} = 1$ are $y = \pm\dfrac{b}{a}x$.`, key: 'a', sol: r`With $a = 3$ and $b = 4$, the rule in R gives $y = \pm\dfrac{4}{3}x$, which is exactly A. So R is the correct explanation of A.`, d: 2, c: 'understanding', t: [3] }), (Cx) => { Cx.assert(h.slope2.eq('16/9') && h.a.eq(3) && h.b.eq(4), 'slope 4/3'); Cx.key('a'); });
}
{
  const h = new Hyperbola('x', 16, 9);
  Q('ar6', mk.ar({ a: r`The two foci of the hyperbola $\dfrac{x^2}{16} - \dfrac{y^2}{9} = 1$ are $10$ units apart.`, r: r`The foci of every hyperbola lie on its conjugate axis.`, key: 'c', sol: r`A is true: $c^2 = 16 + 9 = 25$, $c = 5$ and the foci $(\pm 5, 0)$ are $2c = 10$ apart. R is false: the foci lie on the transverse axis (here the $x$-axis), which passes through the vertices, not on the conjugate axis.`, d: 3, c: 'understanding', t: [3] }), (Cx) => { Cx.assert(h.c.eq(5) && h.kind === 'x' && h.verifySampling(), 'foci on the x-axis, 2c = 10'); Cx.key('c'); });
}

// =============================================================== true-false
{
  Q('tf1', mk.tf({ stem: r`A plane passing through the vertex of a right circular cone can meet the cone in a pair of intersecting straight lines.`, key: 't', sol: r`If the plane through the vertex makes an angle with the axis that is smaller than the semi-vertical angle, it cuts both cones along two straight lines that cross at the vertex.`, d: 2, c: 'understanding', t: [1] }), (Cx) => { Cx.assert(sectionOf(40, 25, true) === 'a pair of intersecting straight lines' && sectionOf(40, 60, true) === 'a single point', 'pair of lines'); Cx.key('t'); });
}
{
  const t = Rat.of(-3).pow(2).add(1).sub(10);
  Q('tf2', mk.tf({ stem: r`The equation $x^2 + y^2 - 6x + 2y + 10 = 0$ represents a circle of positive radius.`, key: 'f', sol: r`Here $g = -3$, $f = 1$, $c = 10$, and $g^2 + f^2 - c = 9 + 1 - 10 = 0$. The radius is zero, so the equation represents only the single point $(3, -1)$.`, d: 3, c: 'analysis', t: [1] }), (Cx) => { Cx.assert(t.isZero() && (x => (x[0] - 3) ** 2 + (x[1] + 1) ** 2 === 0)([3, -1]), 'radius 0'); Cx.key('f'); });
}
{
  const p = new Parabola('y2', -10);
  Q('tf3', mk.tf({ stem: r`The point $(10, 10)$ lies on the parabola $y^2 = -10x$.`, key: 'f', sol: r`Substituting gives $y^2 = 100$ but $-10x = -100$, and $100 \ne -100$. The parabola opens left, so every point has $x \le 0$; the point $(-10, 10)$ does lie on it.`, d: 2, c: 'understanding', t: [2] }), (Cx) => { Cx.assert(!p.on([10, 10]) && p.on([-10, 10]) && p.on([-10, -10]), '(10, 10) not on it'); Cx.key('f'); });
}
{
  const h = new Hyperbola('x', 25, 144);
  Q('tf4', mk.tf({ stem: r`The hyperbola $\dfrac{x^2}{25} - \dfrac{y^2}{144} = 1$ has eccentricity $\dfrac{13}{5}$, which is greater than $1$.`, key: 't', sol: r`$a = 5$, $b = 12$, $c^2 = 25 + 144 = 169$, so $c = 13$ and $e = \dfrac{c}{a} = \dfrac{13}{5} = 2.6 > 1$, as it must be for every hyperbola.`, d: 2, c: 'understanding', t: [3] }), (Cx) => { Cx.assert(h.e.eq('13/5') && h.e.gt(1) && h.verifySampling(), 'e = 13/5'); Cx.key('t'); });
}
{
  const e = new Ellipse(49, 81);
  Q('tf5', mk.tf({ stem: r`The foci of the ellipse $\dfrac{x^2}{49} + \dfrac{y^2}{81} = 1$ lie on the $x$-axis.`, key: 'f', sol: r`The larger denominator, $81$, is under $y^2$, so the major axis is along the $y$-axis. With $c^2 = 81 - 49 = 32$, the foci are $(0, \pm 4\sqrt{2})$ on the $y$-axis.`, d: 2, c: 'understanding', t: [3] }), (Cx) => { Cx.assert(e.major === 'y' && e.c2.eq(32) && e.tex('c') === '4\\sqrt{2}' && e.verifySampling(), 'foci on the y-axis'); Cx.key('f'); });
}

// =============================================================== fill in the blank
{
  const c = Circle.fromGeneral(-4, 2, -4);
  Q('fb1', mk.fill({ stem: r`The circle $x^2 + y^2 - 4x + 2y - 4 = 0$ has radius ____ units.`, acc: [['3']], sol: r`$g = -2$, $f = 1$, $c = -4$, so $r = \sqrt{4 + 1 + 4} = \sqrt{9} = 3$.`, d: 2, c: 'understanding', t: [1] }), (Cx) => { Cx.assert(c.h.eq(2) && c.k.eq(-1) && c.radius.eq(3) && c.verifySampling(), 'radius 3'); Cx.blank(N(c.radius)); });
}
{
  const p = new Parabola('y2', -28);
  Q('fb2', mk.fill({ stem: r`The directrix of the parabola $y^2 = -28x$ is the vertical line $x = $ ____.`, acc: [['7']], sol: r`$4a = 28$, so $a = 7$. The parabola opens left with focus $(-7, 0)$, and its directrix is $x = a = 7$.`, d: 2, c: 'understanding', t: [2] }), (Cx) => { Cx.assert(p.a.eq(7) && p.directrix.axis === 'x' && p.directrix.value.eq(7) && p.verify(), 'x = 7'); Cx.blank(N(p.directrix.value)); });
}
{
  const p = new Parabola('x2', 18);
  Q('fb3', mk.fill({ stem: r`A chord of the parabola $x^2 = 18y$ passes through its focus and is perpendicular to its axis. The length of this chord is ____ units.`, acc: [['18']], sol: r`This chord is the latus rectum, whose length is the coefficient $4a = 18$. Its ends are $(\pm 9, 4.5)$.`, d: 2, c: 'understanding', t: [2] }), (Cx) => { const [e1, e2] = p.lrEnds; Cx.assert(p.lr.eq(18) && e1[0].eq(9) && e1[1].eq('9/2') && e2[0].eq(-9) && p.verify(), 'latus rectum 18'); Cx.blank(N(p.lr)); });
}
{
  const e = new Ellipse(16, 25);
  Q('fb4', mk.fill({ stem: r`The length of the minor axis of the ellipse $25x^2 + 16y^2 = 400$ is ____ units.`, acc: [['8']], sol: r`Dividing by $400$ gives $\dfrac{x^2}{16} + \dfrac{y^2}{25} = 1$, so $a^2 = 25$ (along the $y$-axis) and $b^2 = 16$. The minor axis has length $2b = 8$.`, d: 2, c: 'understanding', t: [3] }), (Cx) => { Cx.assert(e.major === 'y' && e.b.eq(4) && e.a.eq(5) && Rat.of(25).mul(16).add(Rat.of(16).mul(25)).eq(800) && e.verifySampling(), 'minor axis 8'); Cx.blank(N(e.b.mul(2))); });
}
{
  const h = new Hyperbola('x', 9, 16);
  Q('fb5', mk.fill({ stem: r`The eccentricity of the hyperbola $\dfrac{x^2}{9} - \dfrac{y^2}{16} = 1$, as a fraction, is ____.`, acc: [['5/3', r`$\dfrac{5}{3}$`]], sol: r`$a = 3$, $b = 4$, so $c^2 = 9 + 16 = 25$ and $c = 5$. Then $e = \dfrac{c}{a} = 5/3$.`, d: 2, c: 'understanding', t: [3] }), (Cx) => { Cx.assert(h.e.eq('5/3') && h.verifySampling(), 'e = 5/3'); Cx.blank(N(h.e)); });
}

// =============================================================== numerical
{
  const c = (k) => { try { return Circle.fromGeneral(-2, 8, k); } catch { return null; } };
  const hits = range(-30, 30).filter((k) => c(k) && c(k).r2.eq(25));
  Q('n01', mk.num({ stem: r`The circle $x^2 + y^2 - 2x + 8y + k = 0$ has radius $5$. Find the value of $k$.`, value: -8, sol: r`$g = -1$ and $f = 4$, so $r^2 = g^2 + f^2 - k = 1 + 16 - k = 25$, which gives $k = -8$.`, scheme: [['r^2 = g^2 + f^2 - k = 25', 0.5], ['k = -8', 0.5]], d: 3, c: 'application', t: [1], time: 90 }), (Cx) => { Cx.assert(hits.join() === '-8' && c(-8).radius.eq(5), 'k = -8'); Cx.val(hits[0]); });
}
{
  const c = Circle.fromGeneral(-10, -6, 9), cut = c.xCut();
  const xs = range(-5, 15).filter((x) => c.on([x, 0]));
  Q('n02', mk.num({ stem: r`The circle $x^2 + y^2 - 10x - 6y + 9 = 0$ meets the $x$-axis at two points. Find the distance between these two points.`, value: 8, sol: r`Put $y = 0$: $x^2 - 10x + 9 = 0$, so $(x - 1)(x - 9) = 0$ and $x = 1$ or $x = 9$. The distance between the points is $9 - 1 = 8$.`, scheme: [['x^2 - 10x + 9 = 0, so x = 1 and 9', 0.5], ['distance 9 - 1 = 8', 0.5]], d: 3, c: 'application', t: [1], time: 90 }), (Cx) => { Cx.assert(xs.join() === '1,9' && cut.half2.eq(16) && cut.root.eq(4) && c.h.eq(5) && c.k.eq(3) && c.radius.eq(5), 'chord 8'); Cx.val(xs[1] - xs[0]); });
}
{
  const c = Circle.fromThree([1, 1], [5, 1], [1, 4]);
  Q('n03', mk.num({ stem: r`A circle passes through the three points $(1, 1)$, $(5, 1)$ and $(1, 4)$. Find its radius.`, value: 2.5, sol: r`The three points form a right angle at $(1, 1)$, so the hypotenuse from $(5, 1)$ to $(1, 4)$ is a diameter. Its length is $\sqrt{16 + 9} = 5$, so the radius is $5 \div 2 = 2.5$.`, scheme: [['Right angle at (1, 1), so the hypotenuse is a diameter', 0.5], ['r = 5 / 2 = 2.5', 0.5]], d: 3, c: 'analysis', t: [1], time: 120 }), (Cx) => { Cx.assert(c.h.eq(3) && c.k.eq('5/2') && c.r2.eq('25/4') && c.radius.eq('5/2') && c.verifySampling(), 'radius 2.5'); Cx.val(N(c.radius)); });
}
{
  const p = new Parabola('x2', -20), pt = [20, -20];
  Q('n04', mk.num({ stem: r`The point $(20, -20)$ lies on the parabola $x^2 = -20y$. Find its distance from the focus of the parabola.`, value: 25, sol: r`$4a = 20$, so $a = 5$ and the focus is $(0, -5)$. The distance is $\sqrt{20^2 + (-20 + 5)^2} = \sqrt{400 + 225} = \sqrt{625} = 25$, which equals the distance $5 - (-20) = 25$ from the directrix $y = 5$.`, scheme: [['Focus (0, -5)', 0.5], ['Distance sqrt(625) = 25', 0.5]], d: 3, c: 'application', t: [2], time: 90 }), (Cx) => { Cx.assert(p.on(pt) && p.focalDistance(pt).eq(25) && Math.hypot(20, -15) === 25, '25'); Cx.val(N(p.focalDistance(pt))); });
}
{
  const p = new Parabola('x2', Rat.of(24 * 24).div(9));
  Q('n05', mk.num({ stem: r`A torch reflector is a paraboloid whose cross-section is a parabola. The reflector is $48$ mm wide at its open end and $9$ mm deep. The bulb is at the focus. How far, in mm, is the bulb from the vertex of the reflector?`, value: 16, sol: r`Place the vertex at the origin with the axis along the $y$-axis: $x^2 = 4ay$. The rim point is $(24, 9)$, so $24^2 = 4a \times 9$, which gives $36a = 576$ and $a = 16$. The bulb is $16$ mm from the vertex.`, scheme: [['Rim point (24, 9) in x^2 = 4ay', 0.5], ['a = 576 / 36 = 16', 0.5]], d: 3, c: 'application', t: [2], time: 105 }), (Cx) => { Cx.assert(p.k.eq(64) && p.a.eq(16) && p.on([24, 9]) && p.on([-24, 9]) && p.focus[1].eq(16), 'a = 16'); Cx.val(N(p.a)); });
}
{
  const e = new Ellipse(169, 144), P = [5, Rat.of(144).div(13)];
  const ex = e.on(P);
  const d1 = Rat.of(5).add(5).pow(2).add(Rat.of(144).div(13).pow(2)), d2 = Rat.of(5).sub(5).pow(2).add(Rat.of(144).div(13).pow(2));
  Q('n06', mk.num({ stem: r`$F_1$ and $F_2$ are the foci of the ellipse $\dfrac{x^2}{169} + \dfrac{y^2}{144} = 1$, and $P$ is any point on the ellipse. Find the value of $PF_1 + PF_2$.`, value: 26, sol: r`For every point of an ellipse the sum of the focal distances equals the length of the major axis, $2a$. Here $a^2 = 169$, so $a = 13$ and $PF_1 + PF_2 = 2 \times 13 = 26$.`, scheme: [['Sum of focal distances = 2a', 0.5], ['a = 13, so 26', 0.5]], d: 2, c: 'understanding', t: [3], time: 60 }), (Cx) => { Cx.assert(ex && e.a.eq(13) && e.c.eq(5) && sqrtQ(d1).eq('194/13') && sqrtQ(d2).eq('144/13') && sqrtQ(d1).add(sqrtQ(d2)).eq(26) && e.verifySampling(), 'sum 26 at P(5, 144/13)'); Cx.val(N(e.a.mul(2))); });
}
{
  const h = new Hyperbola('x', 64, 225);
  Q('n07', mk.num({ stem: r`Find the distance between the two foci of the hyperbola $\dfrac{x^2}{64} - \dfrac{y^2}{225} = 1$.`, value: 34, sol: r`$a^2 = 64$ and $b^2 = 225$, so $c^2 = a^2 + b^2 = 64 + 225 = 289$ and $c = 17$. The foci are $(\pm 17, 0)$, so the distance between them is $2c = 34$.`, scheme: [['c^2 = 64 + 225 = 289', 0.5], ['2c = 34', 0.5]], d: 2, c: 'understanding', t: [3], time: 75 }), (Cx) => { Cx.assert(h.c.eq(17) && h.verifySampling(), 'distance 34'); Cx.val(N(h.c.mul(2))); });
}
