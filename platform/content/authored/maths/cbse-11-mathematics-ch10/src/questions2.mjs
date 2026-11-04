// CBSE 11 Mathematics ch10 Conic Sections — written items (short 2 and 3 marks, long 5 marks, case-based) with re-solve checks.
// Every centre, radius, focus, directrix, axis length, eccentricity and latus rectum in a model answer is computed from the equation in conic.mjs.
import { Q, caseQ, child, mk } from './lib.mjs';
import { r, range, Rat, q, N, tx, dx, sqTex, kSqTex, Circle, Parabola, Ellipse, Hyperbola, sectionOf, sqrtQ, near } from './conic.mjs';

// =============================================================== short answer, 2 marks
{
  Q('s201', mk.short({ marks: 2, stem: r`A right circular cone has semi-vertical angle $30^\circ$, and a plane that misses the vertex makes an angle $\beta$ with the axis. Name the curve of section when (i) $\beta = 30^\circ$ and (ii) $\beta = 55^\circ$, giving a reason each time.`, model: r`(i) $\beta = 30^\circ$ equals the semi-vertical angle, so the plane is parallel to a slant side of the cone and the section is a **parabola**.\n\n(ii) $30^\circ < 55^\circ < 90^\circ$, so the plane cuts across one cone all the way round and the section is an **ellipse**.`, sol: 'Compare the angle of the plane with the semi-vertical angle.', scheme: [['(i) parabola, because the angle equals the semi-vertical angle', 1], ['(ii) ellipse, because the angle lies between 30 and 90 degrees', 1]], d: 2, c: 'understanding', t: [1], time: 75 }), (Cx) => { Cx.assert(sectionOf(30, 30) === 'parabola' && sectionOf(30, 55) === 'ellipse', 'parabola and ellipse'); Cx.model(['parabola', 'ellipse', 30, 55]); });
}
{
  const c = new Circle(4, -3, 49);
  Q('s202', mk.short({ marks: 2, stem: r`Write the equation of the circle with centre $(4, -3)$ and radius $7$, first in standard form and then with the brackets multiplied out.`, model: r`Standard form: $${c.std()}$.\n\nExpanding: $x^2 - 8x + 16 + y^2 + 6y + 9 = 49$, so $${c.general()}$.`, sol: 'Use (x - h)^2 + (y - k)^2 = r^2, then expand and collect.', scheme: [['(x - 4)^2 + (y + 3)^2 = 49', 1], ['x^2 + y^2 - 8x + 6y - 24 = 0', 1]], d: 2, c: 'understanding', t: [1], time: 90 }), (Cx) => { Cx.assert(c.std() === '(x - 4)^2 + (y + 3)^2 = 49' && c.general() === 'x^2 + y^2 - 8x + 6y - 24 = 0' && c.F.eq(-24) && c.verifySampling(), 'both forms'); Cx.model([49, 8, 6, 24]); });
}
{
  const c = Circle.fromGeneral(4, -2, -3), sq = sqTex(c.r2);
  Q('s203', mk.short({ marks: 2, stem: r`Find the centre and the radius of the circle $3x^2 + 3y^2 + 12x - 6y - 9 = 0$.`, model: r`Divide by $3$: $x^2 + y^2 + 4x - 2y - 3 = 0$, so $g = 2$, $f = -1$, $c = -3$.\n\nThe centre is $(-g, -f) = (-2, 1)$ and $r = \sqrt{g^2 + f^2 - c} = \sqrt{4 + 1 + 3} = \sqrt{8} = ${sq}$.`, sol: 'Make the coefficients of x squared and y squared equal to 1 first.', scheme: [['Dividing by 3 and reading g = 2, f = -1, c = -3', 1], ['Centre (-2, 1) and radius 2 sqrt(2)', 1]], d: 3, c: 'application', t: [1], time: 105 }), (Cx) => { Cx.assert(c.h.eq(-2) && c.k.eq(1) && c.r2.eq(8) && sq === '2\\sqrt{2}' && near(Math.sqrt(8), 2 * Math.SQRT2) && 3 * 0 + 3 * 9 + 12 * 0 - 6 * 3 - 9 === 0 && c.on([0, 3]), 'centre (-2, 1), radius 2 sqrt 2'); Cx.model([2, 1, 8]); });
}
{
  const hs = []; for (let h = -40; h <= 40; h++) { const lhs = Rat.of(1 - h).pow(2).add(9), rhs = Rat.of(5 - h).pow(2).add(1); if (lhs.eq(rhs)) hs.push(h); }
  const c = new Circle(2, 0, 10);
  Q('s204', mk.short({ marks: 2, stem: r`A circle has its centre on the $x$-axis and passes through the points $(1, 3)$ and $(5, 1)$. Find its equation.`, model: r`Let the centre be $(h, 0)$. The two points are equally far from it: $(1 - h)^2 + 9 = (5 - h)^2 + 1$, so $h^2 - 2h + 10 = h^2 - 10h + 26$, giving $8h = 16$ and $h = 2$.\n\nThen $r^2 = (1 - 2)^2 + 3^2 = 10$, so the circle is $${c.std()}$.`, sol: 'Equal distances from the unknown centre give a linear equation for h.', scheme: [['(1 - h)^2 + 9 = (5 - h)^2 + 1, so h = 2', 1], ['r^2 = 10 and the equation', 1]], d: 3, c: 'application', t: [1], time: 120 }), (Cx) => { Cx.assert(hs.join() === '2' && c.on([1, 3]) && c.on([5, 1]) && c.std() === '(x - 2)^2 + y^2 = 10', 'h = 2, r^2 = 10'); Cx.model([2, 16, 10]); });
}
{
  const p = new Parabola('x2', 28);
  Q('s205', mk.short({ marks: 2, stem: r`Find the focus, the directrix and the length of the latus rectum of the parabola $x^2 = 28y$.`, model: r`Compare with $x^2 = 4ay$: $4a = 28$, so $a = 7$.\n\nThe focus is $(0, a) = (0, 7)$ and the directrix is $y = -7$. The latus rectum has length $4a = 28$.`, sol: 'Read a from the coefficient, then use the four standard results.', scheme: [['a = 7, focus (0, 7), directrix y = -7', 1], ['Latus rectum 28', 1]], d: 2, c: 'understanding', t: [2], time: 75 }), (Cx) => { Cx.assert(p.a.eq(7) && p.focus[1].eq(7) && p.directrix.value.eq(-7) && p.lr.eq(28) && p.verify(), 'focus (0, 7)'); Cx.model([7, 28]); });
}
{
  const p = new Parabola('x2', -24);
  Q('s206', mk.short({ marks: 2, stem: r`Find the equation of the parabola with its vertex at the origin and its focus at $(0, -6)$. Write down its directrix as well.`, model: r`The focus is below the vertex, so the parabola opens downward: $x^2 = -4ay$ with $a = 6$, that is $x^2 = -24y$.\n\nThe directrix lies on the other side of the vertex: $y = 6$.`, sol: 'The focus fixes the axis, the direction and a.', scheme: [['Opens downward, a = 6, so x^2 = -24y', 1], ['Directrix y = 6', 1]], d: 2, c: 'understanding', t: [2], time: 75 }), (Cx) => { Cx.assert(p.focus[1].eq(-6) && p.a.eq(6) && p.directrix.axis === 'y' && p.directrix.value.eq(6) && p.verify(), 'x^2 = -24y'); Cx.model([6, 24]); });
}
{
  const p = new Parabola('x2', 36);
  Q('s207', mk.short({ marks: 2, stem: r`The vertex of a parabola is at the origin and its directrix is the line $y = -9$. Find its equation and the coordinates of the ends of its latus rectum.`, model: r`The directrix is below the vertex, so the parabola opens upward with $a = 9$ and focus $(0, 9)$. Its equation is $x^2 = 36y$.\n\nThe latus rectum is the chord through the focus perpendicular to the axis, so $y = 9$ and $x^2 = 36 \times 9 = 324$, giving the ends $(18, 9)$ and $(-18, 9)$.`, sol: 'Put y equal to the focal ordinate a in the equation.', scheme: [['x^2 = 36y', 1], ['Ends (18, 9) and (-18, 9)', 1]], d: 3, c: 'application', t: [2], time: 105 }), (Cx) => { const [e1, e2] = p.lrEnds; Cx.assert(p.a.eq(9) && p.directrix.value.eq(-9) && e1[0].eq(18) && e1[1].eq(9) && e2[0].eq(-18) && p.verify(), 'x^2 = 36y and (+-18, 9)'); Cx.model([36, 9, 18, 324]); });
}
{
  const e = new Ellipse(81, 45);
  Q('s208', mk.short({ marks: 2, stem: r`Find the foci and the eccentricity of the ellipse $\dfrac{x^2}{81} + \dfrac{y^2}{45} = 1$.`, model: r`Here $a^2 = 81$ is under $x^2$ and $b^2 = 45$, so the major axis is along the $x$-axis and $c^2 = a^2 - b^2 = 81 - 45 = 36$, so $c = 6$.\n\nThe foci are $(\pm 6, 0)$ and $e = \dfrac{c}{a} = \dfrac{6}{9} = \dfrac{2}{3}$.`, sol: 'c squared is a squared minus b squared for an ellipse.', scheme: [['c^2 = 81 - 45 = 36, foci (+-6, 0)', 1], ['e = 6/9 = 2/3', 1]], d: 2, c: 'understanding', t: [3], time: 90 }), (Cx) => { Cx.assert(e.major === 'x' && e.c.eq(6) && e.e.eq('2/3') && e.verifySampling(), 'foci (+-6, 0), e = 2/3'); Cx.model([36, 6, 9, 2, 3]); });
}
{
  const h = new Hyperbola('x', 144, 25);
  Q('s209', mk.short({ marks: 2, stem: r`Find the vertices, the foci and the eccentricity of the hyperbola $\dfrac{x^2}{144} - \dfrac{y^2}{25} = 1$.`, model: r`Here $a^2 = 144$ and $b^2 = 25$, with the $x^2$ term positive, so the vertices are $(\pm 12, 0)$.\n\nFor a hyperbola $c^2 = a^2 + b^2 = 169$, so $c = 13$: the foci are $(\pm 13, 0)$ and $e = \dfrac{c}{a} = \dfrac{13}{12}$.`, sol: 'c squared is a squared plus b squared for a hyperbola.', scheme: [['Vertices (+-12, 0)', 0.5], ['c^2 = 169, foci (+-13, 0)', 0.5], ['e = 13/12', 1]], d: 2, c: 'understanding', t: [3], time: 90 }), (Cx) => { Cx.assert(h.a.eq(12) && h.c.eq(13) && h.e.eq('13/12') && h.verifySampling(), 'e = 13/12'); Cx.model([12, 169, 13]); });
}
{
  const e = new Ellipse(64, 289);
  Q('s210', mk.short({ marks: 2, stem: r`An ellipse with its centre at the origin has vertices $(0, \pm 17)$ and foci $(0, \pm 15)$. Find its equation.`, model: r`The vertices and foci are on the $y$-axis, so the form is $\dfrac{x^2}{b^2} + \dfrac{y^2}{a^2} = 1$ with $a = 17$ and $c = 15$.\n\n$b^2 = a^2 - c^2 = 289 - 225 = 64$, so the equation is $\dfrac{x^2}{64} + \dfrac{y^2}{289} = 1$.`, sol: 'Use b squared equals a squared minus c squared.', scheme: [['Major axis on the y-axis, a = 17, c = 15', 1], ['b^2 = 64 and the equation', 1]], d: 3, c: 'application', t: [3], time: 105 }), (Cx) => { Cx.assert(e.major === 'y' && e.a.eq(17) && e.c.eq(15) && e.b.eq(8) && e.verifySampling(), 'x^2/64 + y^2/289 = 1'); Cx.model([17, 15, 64, 289]); });
}

// =============================================================== short answer, 3 marks
{
  const c = Circle.fromThree([6, -1], [-4, -1], [2, 3]);
  Q('s301', mk.short({ marks: 3, stem: r`Find the equation of the circle that passes through the three points $(6, -1)$, $(-4, -1)$ and $(2, 3)$, and state its centre and radius.`, model: r`Let the circle be $x^2 + y^2 + Dx + Ey + F = 0$. The three points give\n\n$37 + 6D - E + F = 0$, $\quad 17 - 4D - E + F = 0$, $\quad 13 + 2D + 3E + F = 0$.\n\nSubtracting the first two: $20 + 10D = 0$, so $D = -2$. Then $F - E = -25$ and $3E + F = -9$, so $4E = 16$, $E = 4$ and $F = -21$.\n\nThe circle is $${c.general()}$. Its centre is $(1, -2)$ and $r^2 = 1 + 4 + 21 = 26$, so $r = \sqrt{26}$.`, sol: 'Substitute each point into the general equation and solve the three linear equations.', scheme: [['Three equations from the three points', 1], ['D = -2, E = 4, F = -21', 1], ['Equation, centre (1, -2) and radius sqrt(26)', 1]], d: 3, c: 'application', t: [1], time: 180 }), (Cx) => { Cx.assert(c.D.eq(-2) && c.E.eq(4) && c.F.eq(-21) && c.h.eq(1) && c.k.eq(-2) && c.r2.eq(26) && [[6, -1], [-4, -1], [2, 3]].every((p) => c.on(p)) && 36 + 1 === 37 && 16 + 1 === 17 && 4 + 9 === 13, 'x^2 + y^2 - 2x + 4y - 21 = 0'); Cx.model([2, 4, 21, 26, 37, 17, 13]); });
}
{
  const rs = range(1, 60).filter((rr) => Rat.of(9 - rr).pow(2).add(Rat.of(2 - rr).pow(2)).eq(rr * rr));
  const c1 = new Circle(5, 5, 25), c2 = new Circle(17, 17, 289);
  Q('s302', mk.short({ marks: 3, stem: r`A circle in the first quadrant touches both coordinate axes and passes through the point $(9, 2)$. Find the possible equations of the circle.`, model: r`A circle in the first quadrant touching both axes has centre $(r, r)$ and radius $r$: $(x - r)^2 + (y - r)^2 = r^2$.\n\nThrough $(9, 2)$: $(9 - r)^2 + (2 - r)^2 = r^2$, so $r^2 - 22r + 85 = 0$ and $(r - 5)(r - 17) = 0$.\n\nSo $r = 5$ or $r = 17$, and the circles are $${c1.std()}$ and $${c2.std()}$.`, sol: 'Touching both axes in the first quadrant makes the centre (r, r).', scheme: [['Centre (r, r), radius r', 1], ['r^2 - 22r + 85 = 0', 1], ['r = 5 or 17 and both equations', 1]], d: 4, c: 'analysis', t: [1], time: 180 }), (Cx) => { Cx.assert(rs.join() === '5,17' && c1.on([9, 2]) && c2.on([9, 2]) && Rat.of(22).mul(22).sub(340).eq(144), 'r = 5 or 17'); Cx.model([22, 85, 5, 17, 25, 289]); });
}
{
  const p = new Parabola('y2', 32);
  const kcand = range(1, 200).filter((k) => 64 === 2 * k);
  Q('s303', mk.short({ marks: 3, stem: r`A parabola has its vertex at the origin and its axis along the $x$-axis, and it passes through the point $(2, -8)$. Find its equation, its focus and the length of its latus rectum.`, model: r`The point has $x > 0$, so the parabola opens right: $y^2 = kx$. Then $(-8)^2 = 64 = 2k$, so $k = 32$ and the equation is $y^2 = 32x$.\n\nHere $4a = 32$, $a = 8$ and the focus is $(8, 0)$. The latus rectum has length $4a = 32$.`, sol: 'Substitute the point to find the coefficient k.', scheme: [['y^2 = kx and k = 32', 1], ['Focus (8, 0)', 1], ['Latus rectum 32', 1]], d: 3, c: 'application', t: [2], time: 120 }), (Cx) => { Cx.assert(kcand.join() === '32' && p.on([2, -8]) && p.focus[0].eq(8) && p.lr.eq(32) && p.verify(), 'y^2 = 32x'); Cx.model([64, 32, 8]); });
}
{
  const p = new Parabola('x2', 24);
  const ys = range(0, 100).filter((y) => Rat.of(y).add(6).eq(30));
  const x2 = Rat.of(24).mul(24);
  Q('s304', mk.short({ marks: 3, stem: r`Points $P$ of the parabola $x^2 = 24y$ are at distance $30$ from its focus. Find the coordinates of the points $P$.`, model: r`$4a = 24$, so $a = 6$, the focus is $(0, 6)$ and the directrix is $y = -6$.\n\nThe distance from the focus equals the distance from the directrix: $y + 6 = 30$, so $y = 24$.\n\nThen $x^2 = 24 \times 24 = 576$, so $x = \pm 24$, and the points are $(24, 24)$ and $(-24, 24)$.`, sol: 'Focal distance equals y plus a for an upward parabola.', scheme: [['a = 6 and directrix y = -6', 1], ['y + 6 = 30, y = 24', 1], ['x = +-24, two points', 1]], d: 3, c: 'application', t: [2], time: 135 }), (Cx) => { Cx.assert(ys.join() === '24' && x2.eq(576) && p.on([24, 24]) && p.on([-24, 24]) && p.focalDistance([24, 24]).eq(30) && p.focalDistance([-24, 24]).eq(30), '(+-24, 24)'); Cx.model([6, 24, 576, 30]); });
}
{
  const p = new Parabola('x2', Rat.of(15).pow(2).div(Rat.of('45/4')));
  Q('s305', mk.short({ marks: 3, stem: r`The cross-section of a floodlight reflector is a parabola. The reflector is $30$ cm across its open end and $11.25$ cm deep. Find the distance, in cm, from the vertex to the bulb, which is at the focus.`, model: r`Take the vertex as the origin and the axis along the $y$-axis, so the curve is $x^2 = 4ay$. The rim has $x = 15$ and $y = 11.25$.\n\n$15^2 = 4a \times 11.25$, so $225 = 45a$ and $a = 5$.\n\nThe bulb is at the focus $(0, 5)$, that is $5$ cm from the vertex.`, sol: 'Half the width and the depth give a point of the curve.', scheme: [['Rim point (15, 11.25) on x^2 = 4ay', 1], ['225 = 45a', 1], ['a = 5, bulb 5 cm from the vertex', 1]], d: 3, c: 'application', t: [2], time: 135 }), (Cx) => { Cx.assert(p.k.eq(20) && p.a.eq(5) && p.on([15, '45/4']) && p.on([-15, '45/4']) && Rat.of(45).div(4).mul(4).eq(45), 'a = 5'); Cx.model([225, 45, 5, 11.25]); });
}
{
  const e = new Ellipse(10, 40);
  Q('s306', mk.short({ marks: 3, stem: r`An ellipse with its centre at the origin and its major axis along the $y$-axis passes through the points $(3, 2)$ and $(1, 6)$. Find its equation and its eccentricity.`, model: r`Let the ellipse be $\dfrac{x^2}{b^2} + \dfrac{y^2}{a^2} = 1$ and write $u = \dfrac{1}{b^2}$, $v = \dfrac{1}{a^2}$. The two points give $9u + 4v = 1$ and $u + 36v = 1$.\n\nFrom the second, $u = 1 - 36v$; then $9 - 320v = 1$, so $v = \dfrac{1}{40}$ and $u = \dfrac{1}{10}$.\n\nThe equation is $\dfrac{x^2}{10} + \dfrac{y^2}{40} = 1$. Here $c^2 = 40 - 10 = 30$, so $e = \dfrac{\sqrt{30}}{\sqrt{40}} = \dfrac{\sqrt{3}}{2}$.`, sol: 'Treat the reciprocals of b squared and a squared as the two unknowns.', scheme: [['Two equations 9u + 4v = 1 and u + 36v = 1', 1], ['u = 1/10, v = 1/40, so x^2/10 + y^2/40 = 1', 1], ['e = sqrt(3)/2', 1]], d: 4, c: 'analysis', t: [3], time: 180 }), (Cx) => { Cx.assert(e.major === 'y' && e.on([3, 2]) && e.on([1, 6]) && e.e2.eq('3/4') && e.tex('e') === '\\dfrac{\\sqrt{3}}{2}' && e.verifySampling(), 'x^2/10 + y^2/40 = 1, e = sqrt(3)/2'); Cx.model([9, 4, 36, 10, 40, 30]); });
}
{
  const h = new Hyperbola('x', 36, 64);
  Q('s307', mk.short({ marks: 3, stem: r`A hyperbola has its centre at the origin, vertices $(\pm 6, 0)$ and foci $(\pm 10, 0)$. Find its equation, its eccentricity and the equations of its asymptotes.`, model: r`Here $a = 6$ and $c = 10$, so $b^2 = c^2 - a^2 = 100 - 36 = 64$ and $b = 8$.\n\nThe equation is $\dfrac{x^2}{36} - \dfrac{y^2}{64} = 1$ and $e = \dfrac{c}{a} = \dfrac{10}{6} = \dfrac{5}{3}$.\n\nThe asymptotes are $y = \pm\dfrac{b}{a}x = \pm\dfrac{4}{3}x$.`, sol: 'For a hyperbola b squared is c squared minus a squared.', scheme: [['b^2 = 64 and the equation', 1], ['e = 5/3', 1], ['Asymptotes y = +-(4/3)x', 1]], d: 3, c: 'application', t: [3], time: 150 }), (Cx) => { Cx.assert(h.a.eq(6) && h.c.eq(10) && h.b.eq(8) && h.e.eq('5/3') && h.slope2.eq('16/9') && h.verifySampling(), 'x^2/36 - y^2/64 = 1, e = 5/3'); Cx.model([100, 36, 64, 10, 6, 4, 3]); });
}
{
  const h = new Hyperbola('x', 5, 4);
  Q('s308', mk.short({ marks: 3, stem: r`Find the foci, the eccentricity and the length of the latus rectum of the hyperbola $4x^2 - 5y^2 = 20$.`, model: r`Divide by $20$: $\dfrac{x^2}{5} - \dfrac{y^2}{4} = 1$, so $a^2 = 5$, $b^2 = 4$ and $c^2 = 5 + 4 = 9$, $c = 3$.\n\nThe foci are $(\pm 3, 0)$ and $e = \dfrac{c}{a} = \dfrac{3}{\sqrt{5}} = ${h.tex('e')}$.\n\nThe latus rectum is $\dfrac{2b^2}{a} = \dfrac{8}{\sqrt{5}} = ${h.tex('lr')}$.`, sol: 'Divide to get 1 on the right and keep the surd form.', scheme: [['a^2 = 5, b^2 = 4, c = 3, foci (+-3, 0)', 1], ['e = 3 sqrt(5) / 5', 1], ['Latus rectum 8 sqrt(5) / 5', 1]], d: 4, c: 'application', t: [3], time: 150 }), (Cx) => { Cx.assert(h.c.eq(3) && h.tex('e') === '\\dfrac{3\\sqrt{5}}{5}' && h.tex('lr') === '\\dfrac{8\\sqrt{5}}{5}' && near(3 / Math.sqrt(5), 3 * Math.sqrt(5) / 5) && near(8 / Math.sqrt(5), 8 * Math.sqrt(5) / 5) && h.verifySampling(), 'e = 3 sqrt5 / 5, LR = 8 sqrt5 / 5'); Cx.model([20, 5, 4, 9, 3, 8]); });
}
{
  const ok = [];
  for (let i = -16; i <= 48; i++) { const k = new Rat(BigInt(i), 8n); const A = k.add(2), B = Rat.of(7).sub(k); if (A.sign() > 0 && B.sign() > 0 && B.gt(A)) { ok.push(k); const e = new Ellipse(A, B); if (e.major !== 'y') throw new Error('major'); } }
  const lo = ok[0], hi = ok[ok.length - 1];
  Q('s309', mk.short({ marks: 3, stem: r`For which real values of $k$ does $\dfrac{x^2}{k + 2} + \dfrac{y^2}{7 - k} = 1$ represent an ellipse whose major axis lies along the $y$-axis?`, model: r`Both denominators must be positive for a real ellipse: $k + 2 > 0$ gives $k > -2$, and $7 - k > 0$ gives $k < 7$.\n\nThe major axis is along the $y$-axis when the larger denominator is under $y^2$: $7 - k > k + 2$, so $5 > 2k$ and $k < \dfrac{5}{2}$.\n\nTogether: $-2 < k < \dfrac{5}{2}$.`, sol: 'Both denominators positive, and the one under y squared the larger.', scheme: [['k > -2 and k < 7 for a real ellipse', 1], ['7 - k > k + 2, so k < 5/2', 1], ['-2 < k < 5/2', 1]], d: 4, c: 'analysis', t: [3], time: 165 }), (Cx) => { Cx.assert(lo.eq('-15/8') && hi.eq('19/8') && ok.length === 35 && !ok.some((k) => k.cmp('5/2') >= 0), 'the set is -2 < k < 5/2 on a grid of eighths'); Cx.model([2, 7, 5, 2]); });
}

// =============================================================== long answer, 5 marks
{
  const c = Circle.fromGeneral(6, -12, -4), conc = new Circle(-3, 6, 45), cut = c.xCut();
  const d = [[4, 6], [0, 0], [-3, -2]].map((p) => Rat.of(p[0] + 3).pow(2).add(Rat.of(p[1] - 6).pow(2)));
  Q('l01', mk.long({ stem: r`Consider the circle $S: x^2 + y^2 + 6x - 12y - 4 = 0$. (a) Find its centre and radius. (b) State, with working, whether the points $(4, 6)$, $(0, 0)$ and $(-3, -2)$ lie on the circle, inside it or outside it. (c) Find the length of the chord that $S$ cuts off on the $x$-axis. (d) Find the equation of the circle with the same centre that passes through the origin.`, model: r`**(a)** $g = 3$, $f = -6$, $c = -4$. The centre is $(-g, -f) = (-3, 6)$ and $r = \sqrt{9 + 36 + 4} = \sqrt{49} = 7$.\n\n**(b)** Squared distances from $(-3, 6)$: for $(4, 6)$, $49 + 0 = ${d[0]}$ which equals $r^2$, so the point is **on** the circle; for $(0, 0)$, $9 + 36 = ${d[1]}$, less than $49$, so it is **inside**; for $(-3, -2)$, $0 + 64 = ${d[2]}$, more than $49$, so it is **outside**.\n\n**(c)** Put $y = 0$: $(x + 3)^2 + 36 = 49$, so $(x + 3)^2 = 13$ and $x = -3 \pm \sqrt{13}$. The chord has length $2\sqrt{13}$.\n\n**(d)** The new radius squared is $(0 + 3)^2 + (0 - 6)^2 = 45$, so the circle is $${conc.std()}$.`, sol: 'Complete the square for the centre; compare squared distances with r squared; set y = 0 for the chord.', scheme: [['(a) centre (-3, 6) and radius 7', 1], ['(b) on, inside, outside by squared distances 49, 45, 64', 1.5], ['(c) (x + 3)^2 = 13, chord 2 sqrt(13)', 1.5], ['(d) (x + 3)^2 + (y - 6)^2 = 45', 1]], d: 3, c: 'application', t: [1], time: 390 }), (Cx) => { Cx.assert(c.h.eq(-3) && c.k.eq(6) && c.radius.eq(7) && d.map(String).join() === '49,45,64' && c.pos([4, 6]) === 0 && c.pos([0, 0]) < 0 && c.pos([-3, -2]) > 0 && cut.half2.eq(13) && cut.root === null && conc.on([0, 0]) && conc.r2.eq(45) && conc.verifySampling(), 'centre (-3, 6), r = 7, on/inside/outside, chord 2 sqrt 13, r^2 = 45'); Cx.model([3, 6, 7, 49, 45, 64, 13]); });
}
{
  const c = Circle.fromThree([0, 0], [8, 0], [0, 6]);
  const dAB = Rat.of(8).pow(2).add(36);
  Q('l02', mk.long({ stem: r`Three points $O(0, 0)$, $A(8, 0)$ and $B(0, 6)$ lie on a circle. (a) Find the equation of the circle. (b) Write down its centre and radius. (c) Show that $AB$ is a diameter of the circle. (d) Show that the point $(7, 7)$ also lies on the circle.`, model: r`**(a)** Let the circle be $x^2 + y^2 + Dx + Ey + F = 0$. Through $O$: $F = 0$. Through $A$: $64 + 8D = 0$, so $D = -8$. Through $B$: $36 + 6E = 0$, so $E = -6$. The circle is $${c.general()}$.\n\n**(b)** $g = -4$, $f = -3$: the centre is $(4, 3)$ and $r = \sqrt{16 + 9 - 0} = 5$.\n\n**(c)** The midpoint of $AB$ is $(4, 3)$, which is the centre, and $AB = \sqrt{64 + 36} = ${dAB.num() ** 0.5}$, which equals $2r$. So $AB$ is a diameter.\n\n**(d)** At $(7, 7)$: $49 + 49 - 56 - 42 = 0$, so the point satisfies the equation and lies on the circle.`, sol: 'The origin gives F = 0 at once; then each of the other two points gives one coefficient.', scheme: [['(a) F = 0, D = -8, E = -6', 1.5], ['(b) centre (4, 3), radius 5', 1], ['(c) midpoint of AB is the centre and AB = 10 = 2r', 1.5], ['(d) 49 + 49 - 56 - 42 = 0', 1]], d: 3, c: 'application', t: [1], time: 360 }), (Cx) => { Cx.assert(c.D.eq(-8) && c.E.eq(-6) && c.F.eq(0) && c.h.eq(4) && c.k.eq(3) && c.radius.eq(5) && dAB.eq(100) && c.on([7, 7]) && 49 + 49 - 56 - 42 === 0 && c.verifySampling(), 'circle x^2 + y^2 - 8x - 6y = 0'); Cx.model([8, 6, 4, 3, 5, 10, 56, 42]); });
}
{
  const p = new Parabola('y2', -32), x0 = Rat.of(-18);
  const d1 = Rat.of(-18).add(8).pow(2).add(576), d2 = Rat.of(8).add(18);
  const [e1, e2] = p.lrEnds;
  Q('l03', mk.long({ stem: r`The parabola $y^2 = -32x$ has its vertex at the origin. (a) Find its focus and its directrix. (b) Find the length of its latus rectum and the coordinates of the ends of the latus rectum. (c) Find the points of the parabola whose distance from the focus is $26$. (d) Verify that one of those points is also $26$ units from the directrix.`, model: r`**(a)** $4a = 32$, so $a = 8$. The parabola opens left: the focus is $(-8, 0)$ and the directrix is $x = 8$.\n\n**(b)** The latus rectum has length $4a = 32$. Its ends lie on $x = -8$: $y^2 = 256$, so $y = \pm 16$, giving $(-8, 16)$ and $(-8, -16)$.\n\n**(c)** The distance from the focus equals the distance from the directrix, which is $8 - x$ for a point with abscissa $x$. So $8 - x = 26$ and $x = -18$. Then $y^2 = -32(-18) = 576$ and $y = \pm 24$. The points are $(-18, 24)$ and $(-18, -24)$.\n\n**(d)** For $(-18, 24)$: the distance from the directrix is $8 + 18 = 26$, and the distance from the focus is $\sqrt{(-18 + 8)^2 + 24^2} = \sqrt{100 + 576} = \sqrt{676} = 26$. They agree.`, sol: 'Use the focus-directrix property: for a left-opening parabola the focal distance is a minus x.', scheme: [['(a) a = 8, focus (-8, 0), directrix x = 8', 1], ['(b) latus rectum 32 with ends (-8, +-16)', 1.5], ['(c) x = -18 and y = +-24', 1.5], ['(d) both distances equal 26', 1]], d: 3, c: 'application', t: [2], time: 390 }), (Cx) => { Cx.assert(p.a.eq(8) && p.focus[0].eq(-8) && p.directrix.value.eq(8) && p.lr.eq(32) && e1[0].eq(-8) && e1[1].eq(-16) && e2[1].eq(16) && p.on([-18, 24]) && p.on([-18, -24]) && p.focalDistance([-18, 24]).eq(26) && d2.eq(26) && d1.eq(676) && p.verify(), 'a = 8, (-18, +-24)'); Cx.model([8, 32, 16, 18, 24, 26, 676]); });
}
{
  const p = new Parabola('x2', 125);
  const ys = [[30, Rat.of(900).div(125)], [25, Rat.of(625).div(125)]];
  Q('l04', mk.long({ stem: r`The cable of an imagined footbridge hangs in the shape of a parabola with its lowest point $O$ at the middle of the span. Take $O$ as the origin, with the $y$-axis upward. The two towers are $100$ m apart and each cable end is $20$ m above $O$. (a) Find the equation of the parabola. (b) Find the height of the cable above $O$ at a point $30$ m from the middle. (c) Find the horizontal distance of the points where the cable is $5$ m above $O$. (d) Find the distance from $O$ to the focus.`, model: r`**(a)** The curve is $x^2 = 4ay$ and the cable end is $(50, 20)$, so $50^2 = 2500 = 4a \times 20$, giving $4a = 125$ and $x^2 = 125y$.\n\n**(b)** At $x = 30$: $y = \dfrac{900}{125} = ${ys[0][1].dtex()}$ m.\n\n**(c)** At $y = 5$: $x^2 = 625$, so $x = \pm 25$ m from the middle.\n\n**(d)** $a = \dfrac{125}{4} = ${p.a.dtex()}$, so the focus is $31.25$ m above $O$.`, sol: 'The cable end is a point of x squared equals 4ay, which fixes 4a.', scheme: [['(a) 2500 = 4a x 20, x^2 = 125y', 1.5], ['(b) y = 900 / 125 = 7.2 m', 1], ['(c) x^2 = 625, x = +-25 m', 1.5], ['(d) a = 31.25 m', 1]], d: 3, c: 'application', t: [2], time: 360 }), (Cx) => { Cx.assert(p.k.eq(125) && p.on([50, 20]) && p.on([-50, 20]) && ys[0][1].eq('36/5') && ys[1][0] === 25 && p.on([25, 5]) && p.a.eq('125/4') && p.verify(), 'x^2 = 125y, 7.2, 25, 31.25'); Cx.model([2500, 125, 7.2, 625, 25, 31.25]); });
}
{
  const e = new Ellipse(36, 64);
  const [v1] = e.verticesTex();
  Q('l05', mk.long({ stem: r`The curve $16x^2 + 9y^2 = 576$ is an ellipse with its centre at the origin. (a) Write it in standard form and state which axis carries the major axis. (b) Find the vertices and the lengths of the major and minor axes. (c) Find the foci and the eccentricity. (d) Find the length of the latus rectum.`, model: r`**(a)** Divide by $576$: $\dfrac{x^2}{36} + \dfrac{y^2}{64} = 1$. The larger denominator, $64$, is under $y^2$, so the major axis is along the $y$-axis with $a^2 = 64$ and $b^2 = 36$.\n\n**(b)** $a = 8$ and $b = 6$. The vertices are $(0, \pm 8)$; the major axis has length $2a = 16$ and the minor axis $2b = 12$.\n\n**(c)** $c^2 = a^2 - b^2 = 64 - 36 = 28$, so $c = 2\sqrt{7}$. The foci are $(0, \pm 2\sqrt{7})$ and $e = \dfrac{c}{a} = \dfrac{2\sqrt{7}}{8} = \dfrac{\sqrt{7}}{4}$.\n\n**(d)** The latus rectum is $\dfrac{2b^2}{a} = \dfrac{2 \times 36}{8} = 9$.`, sol: 'Divide by 576 first; the larger denominator is a squared.', scheme: [['(a) x^2/36 + y^2/64 = 1, major axis on the y-axis', 1], ['(b) vertices (0, +-8), axes 16 and 12', 1], ['(c) c = 2 sqrt(7), foci and e = sqrt(7)/4', 2], ['(d) latus rectum 9', 1]], d: 3, c: 'application', t: [3], time: 390 }), (Cx) => { Cx.assert(e.major === 'y' && Rat.of(16).mul(36).eq(576) && Rat.of(9).mul(64).eq(576) && e.a.eq(8) && e.b.eq(6) && e.c2.eq(28) && e.tex('c') === '2\\sqrt{7}' && e.tex('e') === '\\dfrac{\\sqrt{7}}{4}' && e.lr.eq(9) && v1 === '(0, 8)' && e.tex('major') === '16' && e.tex('minor') === '12' && e.verifySampling(), 'x^2/36 + y^2/64 = 1: 8, 6, 2 sqrt 7, sqrt 7 / 4, 9'); Cx.model([576, 36, 64, 8, 16, 12, 28, 7, 4, 9]); });
}
{
  const h = new Hyperbola('y', 25, 16);
  Q('l06', mk.long({ stem: r`The curve $16y^2 - 25x^2 = 400$ is a hyperbola with its centre at the origin. (a) Write it in standard form and find $a$, $b$ and the axis that carries the two branches. (b) Find the vertices and the foci. (c) Find the eccentricity and the length of the latus rectum. (d) Find the equations of the asymptotes.`, model: r`**(a)** Divide by $400$: $\dfrac{y^2}{25} - \dfrac{x^2}{16} = 1$. The $y^2$ term is positive, so the branches open along the $y$-axis (up and down), with $a^2 = 25$, $b^2 = 16$, so $a = 5$ and $b = 4$.\n\n**(b)** The vertices are $(0, \pm 5)$. For a hyperbola $c^2 = a^2 + b^2 = 25 + 16 = 41$, so the foci are $(0, \pm\sqrt{41})$.\n\n**(c)** $e = \dfrac{c}{a} = \dfrac{\sqrt{41}}{5}$, which is greater than $1$. The latus rectum is $\dfrac{2b^2}{a} = \dfrac{32}{5} = 6.4$.\n\n**(d)** For this form the asymptotes are $y = \pm\dfrac{a}{b}x = \pm\dfrac{5}{4}x$.`, sol: 'Divide by 400; the positive term shows the axis; c squared is a squared plus b squared.', scheme: [['(a) y^2/25 - x^2/16 = 1, a = 5, b = 4', 1], ['(b) vertices (0, +-5), foci (0, +-sqrt(41))', 1.5], ['(c) e = sqrt(41)/5 and latus rectum 32/5', 1.5], ['(d) asymptotes y = +-(5/4)x', 1]], d: 4, c: 'application', t: [3], time: 390 }), (Cx) => { Cx.assert(h.kind === 'y' && Rat.of(16).mul(25).eq(400) && Rat.of(25).mul(16).eq(400) && h.a.eq(5) && h.b.eq(4) && h.c2.eq(41) && h.tex('c') === '\\sqrt{41}' && h.tex('e') === '\\dfrac{\\sqrt{41}}{5}' && h.lr.eq('32/5') && h.slope2.eq('25/16') && h.verifySampling(), 'a = 5, b = 4, c = sqrt 41, e = sqrt41 / 5, LR = 32/5, slope 5/4'); Cx.model([400, 25, 16, 5, 4, 41, 32, 6.4]); });
}
{
  const E = new Ellipse(36, 11), H = new Hyperbola('x', 16, 9);
  const X = Rat.of('576/25'), Y = Rat.of('99/25');
  const px = Math.sqrt(23.04), py = Math.sqrt(3.96);
  const d1 = Math.hypot(px + 5, py), d2 = Math.hypot(px - 5, py);
  Q('l07', mk.long({ stem: r`(a) Find the equation of the ellipse with foci $(\pm 5, 0)$ and major axis of length $12$. (b) Find the equation of the hyperbola with foci $(\pm 5, 0)$ and transverse axis of length $8$. (c) Find the eccentricity of each curve. (d) Find the points where the two curves meet. (e) For one of these points $P$, find $PF_1 + PF_2$ and $PF_1 - PF_2$, where $F_1$ and $F_2$ are the foci.`, model: r`**(a)** $2a = 12$, so $a = 6$ and $c = 5$. Then $b^2 = a^2 - c^2 = 36 - 25 = 11$ and the ellipse is $\dfrac{x^2}{36} + \dfrac{y^2}{11} = 1$.\n\n**(b)** $2a = 8$, so $a = 4$ and $c = 5$. Then $b^2 = c^2 - a^2 = 25 - 16 = 9$ and the hyperbola is $\dfrac{x^2}{16} - \dfrac{y^2}{9} = 1$.\n\n**(c)** Ellipse: $e = \dfrac{5}{6}$. Hyperbola: $e = \dfrac{5}{4}$.\n\n**(d)** Put $X = x^2$ and $Y = y^2$: $11X + 36Y = 396$ and $9X - 16Y = 144$. Eliminating $Y$ gives $125X = 2880$, so $X = \dfrac{576}{25}$ and $x = \pm\dfrac{24}{5}$. Then $Y = \dfrac{396 - 11X}{36} = \dfrac{99}{25}$, so $y = \pm\dfrac{3\sqrt{11}}{5}$. There are four common points $\left(\pm\dfrac{24}{5}, \pm\dfrac{3\sqrt{11}}{5}\right)$.\n\n**(e)** For $P$ with $x = 4.8$ and $y^2 = 3.96$: $PF_1 = \sqrt{9.8^2 + 3.96} = \sqrt{100} = 10$ and $PF_2 = \sqrt{0.2^2 + 3.96} = \sqrt{4} = 2$. So $PF_1 + PF_2 = 12$ and $PF_1 - PF_2 = 8$, which are the major-axis length of the ellipse and the transverse-axis length of the hyperbola.`, sol: 'The two curves share c, so only a differs; solve for x squared and y squared together.', scheme: [['(a) x^2/36 + y^2/11 = 1', 1], ['(b) x^2/16 - y^2/9 = 1', 1], ['(c) e = 5/6 and 5/4', 1], ['(d) X = 576/25, Y = 99/25 and the four points', 1.5], ['(e) distances 10 and 2, sum 12, difference 8', 0.5]], d: 5, c: 'analysis', t: [3], time: 420 }), (Cx) => { Cx.assert(E.c.eq(5) && H.c.eq(5) && E.e.eq('5/6') && H.e.eq('5/4') && Rat.of(11).mul(X).add(Rat.of(36).mul(Y)).eq(396) && Rat.of(9).mul(X).sub(Rat.of(16).mul(Y)).eq(144) && X.mul(125).eq(2880) && X.div(36).add(Y.div(11)).eq(1) && X.div(16).sub(Y.div(9)).eq(1) && near(d1, 10) && near(d2, 2) && near(d1 + d2, 12) && near(d1 - d2, 8) && Y.eq('99/25') && near(py, 3 * Math.sqrt(11) / 5) && E.verifySampling() && H.verifySampling(), 'confocal pair: 5/6, 5/4, X = 576/25, Y = 99/25, 10 and 2'); Cx.model([36, 11, 16, 9, 396, 144, 2880, 24, 99, 10, 2, 12, 8]); });
}

// =============================================================== case-based
{
  const c = Circle.fromGeneral(-8, 6, -11), pos = c.pos([9, 0]), cut = c.xCut(), d34 = Rat.of(5).pow(2).add(9);
  const len = 2 * Math.sqrt(27);
  caseQ('c01', {
    passage: r`The map of an imagined park, drawn with $1$ unit $= 1$ m, shows a circular pond with boundary $x^2 + y^2 - 8x + 6y - 11 = 0$. A straight walkway runs along the $x$-axis.`,
    d: 3, c: 'application',
    model: r`(a) Option (a). (b) $${N(c.r2)}$. (c) (i) Inside, since $34 < 36$. Or (ii) $6\sqrt{3} \approx ${len.toFixed(2)}$ m.`,
    sol: r`(a) $g = -4$, $f = 3$, so the centre is $(4, -3)$. (b) $r^2 = 16 + 9 + 11 = 36$, area $36\pi$. (c) (i) $(9 - 4)^2 + (0 + 3)^2 = 34 < 36$. (ii) $y = 0$ gives $(x - 4)^2 = 27$, chord $2\sqrt{27} = 6\sqrt{3}$.`,
    children: [
      child('a', mk.mcq({ stem: 'The centre of the pond on the map is', opts: ['$(4, -3)$', '$(-4, 3)$', '$(8, -6)$', '$(4, 3)$'], key: 'a', sol: r`Comparing with $x^2 + y^2 + 2gx + 2fy + c = 0$ gives $g = -4$, $f = 3$, so the centre is $(-g, -f) = (4, -3)$. The point $(-4, 3)$ has both signs wrong, $(8, -6)$ doubles the centre, and $(4, 3)$ has one sign wrong.`, d: 2, c: 'application', t: [1], time: 60 })),
      child('b', mk.num({ stem: 'The area of the pond is $k\\pi$ square metres. Find $k$.', value: 36, sol: r`$r^2 = g^2 + f^2 - c = 16 + 9 + 11 = 36$, and the area is $\pi r^2 = 36\pi$, so $k = 36$.`, scheme: [['r^2 = 36, area 36 pi', 1]], d: 2, c: 'application', t: [1], time: 75 })),
      child('c', mk.short({ marks: 2, stem: '**(i)** A tree stands at the point $(9, 0)$ of the map. Decide, with working, whether it is inside the pond.', model: r`The squared distance from the centre $(4, -3)$ to $(9, 0)$ is $(9 - 4)^2 + (0 + 3)^2 = ${d34}$. Since $34 < 36 = r^2$, the tree is **inside** the pond.`, sol: 'Compare the squared distance from the centre with r squared.', scheme: [['Squared distance 25 + 9 = 34', 1], ['34 < 36, so inside', 1]], d: 2, c: 'application', t: [1], time: 75 }), [
        mk.short({ marks: 2, stem: '**(ii)** Find the length of the part of the walkway that lies inside the pond, correct to two decimal places.', model: r`On the walkway $y = 0$, so $(x - 4)^2 + 9 = 36$ and $(x - 4)^2 = 27$. The walkway enters and leaves the pond at $x = 4 \pm 3\sqrt{3}$, so the length inside is $2\sqrt{27} = 6\sqrt{3} \approx ${len.toFixed(2)}$ m.`, sol: 'Put y = 0 in the equation and subtract the two roots.', scheme: [['(x - 4)^2 = 27', 1], ['Length 6 sqrt(3), about 10.39 m', 1]], d: 3, c: 'application', t: [1], time: 105 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which([[N(c.h), N(c.k)], [-4, 3], [8, -6], [4, 3]], [4, -3]);
    Cx.child('b').val(N(c.r2));
    Cx.child('c').assert(c.h.eq(4) && c.k.eq(-3) && pos === -1 && d34.eq(34) && c.verifySampling(), 'inside the pond');
    Cx.child('c').model([34, 36]);
    Cx.child('cii').assert(cut.half2.eq(27) && near(len, 10.392304845413264) && len.toFixed(2) === '10.39', '10.39 m');
    Cx.child('cii').model([27, 36, 10.39]);
  });
}
{
  const p = new Parabola('x2', -25), k = Rat.of(36).div(25), height = Rat.of(9).sub(k);
  const x2 = Rat.of(25).mul(4);
  caseQ('c02', {
    passage: r`An imagined footbridge has a parabolic arch. Take the highest point of the arch as the origin, with the $y$-axis pointing upward, and $1$ unit $= 1$ m. The arch is $30$ m wide at ground level and $9$ m high. Its axis is vertical.`,
    d: 4, c: 'application',
    model: r`(a) Option (a). (b) $${height.dtex()}$. (c) (i) The focus is $(0, -6.25)$, which is $6.25$ m below the top. Or (ii) $20$ m.`,
    sol: r`(a) The ground point is $(15, -9)$ and $x^2 = ky$ gives $225 = -9k$, so $k = -25$ and $x^2 = -25y$. (b) Depth below the top at $x = 6$ is $\dfrac{36}{25} = 1.44$, so the height is $9 - 1.44 = 7.56$. (c) (i) $4a = 25$, $a = 6.25$. (ii) At height $5$ the depth is $4$: $x^2 = 100$.`,
    children: [
      child('a', mk.mcq({ stem: 'The equation of the arch in these coordinates is', opts: ['$x^2 = -25y$', '$x^2 = 25y$', '$x^2 = -100y$', '$y^2 = -25x$'], key: 'a', sol: r`The arch opens downward and passes through $(15, -9)$ at the ground, so $x^2 = ky$ with $225 = k(-9)$, giving $k = -25$. The option $x^2 = 25y$ opens upward, $x^2 = -100y$ uses the full width $30$ instead of $15$, and $y^2 = -25x$ has the wrong axis.`, d: 3, c: 'application', t: [2], time: 75 })),
      child('b', mk.num({ stem: 'Find the height of the arch above the ground, in metres, at a point $6$ m from the middle of the span.', value: 7.56, sol: r`At $x = 6$: $36 = -25y$, so $y = -1.44$. The point is $1.44$ m below the top, so its height above the ground is $9 - 1.44 = 7.56$ m.`, scheme: [['y = -36/25 = -1.44', 0.5], ['Height 9 - 1.44 = 7.56', 0.5]], d: 3, c: 'application', t: [2], time: 105 })),
      child('c', mk.short({ marks: 2, stem: '**(i)** Find the focus of the parabola and its distance from the top of the arch.', model: r`$4a = 25$, so $a = ${Rat.of('25/4').dtex()}$. The arch opens downward, so the focus is $(0, -6.25)$, which is $6.25$ m below the top of the arch.`, sol: 'Compare x squared equals minus 4ay with the equation.', scheme: [['a = 6.25', 1], ['Focus (0, -6.25), 6.25 m below the top', 1]], d: 3, c: 'application', t: [2], time: 90 }), [
        mk.short({ marks: 2, stem: '**(ii)** Find the width of the arch at a height of $5$ m above the ground.', model: r`A height of $5$ m above the ground is $9 - 5 = 4$ m below the top, so $y = -4$. Then $x^2 = -25(-4) = ${x2}$, $x = \pm 10$, and the width is $20$ m.`, sol: 'Convert the height above the ground to y below the top.', scheme: [['y = -4, so x^2 = 100', 1], ['x = +-10, width 20 m', 1]], d: 3, c: 'application', t: [2], time: 105 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which(['x2=' + N(p.k), 'x2=25', 'x2=-100', 'y2=-25'], 'x2=-25');
    Cx.child('b').val(N(height));
    Cx.child('c').assert(p.on([15, -9]) && p.on([-15, -9]) && p.a.eq('25/4') && p.focus[1].eq('-25/4') && p.verify(), 'focus 6.25 below the top');
    Cx.child('c').model([25, 6.25]);
    Cx.child('cii').assert(x2.eq(100) && p.on([10, -4]) && p.on([-10, -4]) && Rat.of(10).mul(2).eq(20), 'width 20');
    Cx.child('cii').model([4, 100, 10, 20]);
  });
}
{
  const e = new Ellipse(625, 49);
  const S = [15, '28/5'], F1 = [24, 0], F2 = [-24, 0];
  const d = (p, f) => Rat.of(p[0]).sub(f[0]).pow(2).add(Rat.of(p[1]).pow(2));
  const dA = d(S, F1), dB = d(S, F2);
  caseQ('c03', {
    passage: r`An imagined garden is bounded by the ellipse $\dfrac{x^2}{625} + \dfrac{y^2}{49} = 1$, with $1$ unit $= 1$ m. Two lamps stand at the foci $F_1$ and $F_2$ of the ellipse.`,
    d: 3, c: 'application',
    model: r`(a) Option (a). (b) $${N(e.a.mul(2))}$. (c) (i) $e = \dfrac{24}{25} = 0.96$. Or (ii) $10.6$ m and $39.4$ m.`,
    sol: r`(a) $c^2 = 625 - 49 = 576$, $c = 24$, so the lamps are $2c = 48$ m apart. (b) $PF_1 + PF_2 = 2a = 50$. (c) (i) $e = \dfrac{c}{a} = \dfrac{24}{25}$. (ii) $\sqrt{112.36} = 10.6$ and $\sqrt{1552.36} = 39.4$.`,
    children: [
      child('a', mk.mcq({ stem: 'The distance between the two lamps is', opts: ['$48$ m', '$50$ m', '$14$ m', '$24$ m'], key: 'a', sol: r`$a^2 = 625$, $b^2 = 49$, so $c^2 = 625 - 49 = 576$ and $c = 24$. The lamps at $(\pm 24, 0)$ are $2c = 48$ m apart. The value $50$ is $2a$, $14$ is $2b$, and $24$ is only $c$.`, d: 2, c: 'application', t: [3], time: 75 })),
      child('b', mk.num({ stem: 'Find the sum of the distances, in metres, from any point on the boundary of the garden to the two lamps.', value: 50, sol: r`For every point of an ellipse the sum of the focal distances is the length of the major axis: $2a = 2 \times 25 = 50$.`, scheme: [['Sum of focal distances = 2a = 50', 1]], d: 2, c: 'understanding', t: [3], time: 60 })),
      child('c', mk.short({ marks: 2, stem: '**(i)** Find the eccentricity of the boundary ellipse.', model: r`$c = 24$ and $a = 25$, so $e = \dfrac{c}{a} = \dfrac{24}{25} = 0.96$, close to $1$ because the garden is long and thin.`, sol: 'Use e equals c over a.', scheme: [['c = 24 and a = 25', 1], ['e = 24/25 = 0.96', 1]], d: 2, c: 'application', t: [3], time: 75 }), [
        mk.short({ marks: 2, stem: '**(ii)** A sprinkler stands at $S(15, 5.6)$ on the boundary. Find its distances from the two lamps.', model: r`$S$ lies on the ellipse: $\dfrac{225}{625} + \dfrac{31.36}{49} = 0.36 + 0.64 = 1$. The lamps are $(24, 0)$ and $(-24, 0)$.\n\nDistance from $(24, 0)$: $\sqrt{9^2 + 5.6^2} = \sqrt{112.36} = 10.6$ m. Distance from $(-24, 0)$: $\sqrt{39^2 + 5.6^2} = \sqrt{1552.36} = 39.4$ m. Their sum is $50$ m, as expected.`, sol: 'Use the distance formula from each focus.', scheme: [['Distance 10.6 m from one lamp', 1], ['Distance 39.4 m from the other (sum 50)', 1]], d: 4, c: 'application', t: [3], time: 150 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which([N(e.c.mul(2)), N(e.a.mul(2)), N(e.b.mul(2)), N(e.c)], 48);
    Cx.child('b').val(N(e.a.mul(2)));
    Cx.child('c').assert(e.c.eq(24) && e.e.eq('24/25') && N(e.e) === 0.96 && e.verifySampling(), 'e = 0.96');
    Cx.child('c').model([24, 25, 0.96]);
    Cx.child('cii').assert(e.on([15, '28/5']) && dA.eq('11236/100') && dB.eq('155236/100') && sqrtQ(dA).eq('53/5') && sqrtQ(dB).eq('197/5') && sqrtQ(dA).add(sqrtQ(dB)).eq(50), 'distances 10.6 and 39.4');
    Cx.child('cii').model([112.36, 1552.36, 10.6, 39.4, 50]);
  });
}
{
  const h = new Hyperbola('x', 25, 144);
  const P = [13, '144/5'];
  const dA = Rat.of(13).add(13).pow(2).add(Rat.of(144).div(5).pow(2)), dB = Rat.of(144).div(5).pow(2);
  caseQ('c04', {
    passage: r`Two imagined radio beacons $A$ and $B$ are at $(-13, 0)$ and $(13, 0)$ on a map drawn in km. A boat finds that its distance from $A$ is exactly $10$ km more than its distance from $B$. Such positions of the boat lie on one branch of a hyperbola with foci $A$ and $B$.`,
    d: 4, c: 'application',
    model: r`(a) Option (a). (b) $${N(h.e)}$. (c) (i) $\dfrac{x^2}{25} - \dfrac{y^2}{144} = 1$. Or (ii) $38.8$ and $28.8$ km.`,
    sol: r`(a) $2a = 10$, so $a = 5$. (b) $c = 13$, $e = \dfrac{13}{5} = 2.6$. (c) (i) $b^2 = 169 - 25 = 144$. (ii) $\sqrt{1505.44} = 38.8$ and $28.8$, difference $10$.`,
    children: [
      child('a', mk.mcq({ stem: 'The value of $a$ (half the length of the transverse axis) for this hyperbola is', opts: ['$5$ km', '$10$ km', '$13$ km', '$12$ km'], key: 'a', sol: r`The constant difference of the distances equals the transverse axis, $2a = 10$ km, so $a = 5$ km. The value $10$ is $2a$, $13$ is $c$ (the distance of each beacon from the centre), and $12$ is $b$.`, d: 2, c: 'understanding', t: [3], time: 75 })),
      child('b', mk.num({ stem: 'Find the eccentricity of the hyperbola.', value: 2.6, sol: r`The foci are $(\pm 13, 0)$, so $c = 13$, and $a = 5$. Then $e = \dfrac{c}{a} = \dfrac{13}{5} = 2.6$.`, scheme: [['c = 13, a = 5, e = 2.6', 1]], d: 2, c: 'application', t: [3], time: 75 })),
      child('c', mk.short({ marks: 2, stem: '**(i)** Find the equation of the hyperbola in standard form.', model: r`$a = 5$ and $c = 13$, so $b^2 = c^2 - a^2 = 169 - 25 = 144$. The transverse axis is along the $x$-axis, so the hyperbola is $\dfrac{x^2}{25} - \dfrac{y^2}{144} = 1$.`, sol: 'For a hyperbola b squared is c squared minus a squared.', scheme: [['b^2 = 169 - 25 = 144', 1], ['x^2/25 - y^2/144 = 1', 1]], d: 3, c: 'application', t: [3], time: 90 }), [
        mk.short({ marks: 2, stem: '**(ii)** A boat is at $(13, 28.8)$. Find its distances from $A$ and from $B$, and check the $10$ km condition.', model: r`The point lies on the curve: $\dfrac{169}{25} - \dfrac{28.8^2}{144} = 6.76 - 5.76 = 1$.\n\nDistance from $A(-13, 0)$: $\sqrt{26^2 + 28.8^2} = \sqrt{1505.44} = 38.8$ km. Distance from $B(13, 0)$: $28.8$ km. The difference is $38.8 - 28.8 = 10$ km, as required.`, sol: 'Use the distance formula from each beacon.', scheme: [['Distances 38.8 km and 28.8 km', 1], ['Difference 10 km', 1]], d: 4, c: 'application', t: [3], time: 135 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which([N(h.a), 10, N(h.c), N(h.b)], 5);
    Cx.child('b').val(N(h.e));
    Cx.child('c').assert(h.b.eq(12) && h.c.eq(13) && h.verifySampling(), 'x^2/25 - y^2/144 = 1');
    Cx.child('c').model([169, 25, 144]);
    Cx.child('cii').assert(h.on(P) && sqrtQ(dA).eq('194/5') && sqrtQ(dB).eq('144/5') && sqrtQ(dA).sub(sqrtQ(dB)).eq(10), 'distances 38.8 and 28.8');
    Cx.child('cii').model([1505.44, 38.8, 28.8, 10, 6.76, 5.76]);
  });
}
{
  const e = new Ellipse(100, 36);
  const peri = 2, apo = 18;
  caseQ('c05', {
    passage: r`An imagined asteroid moves in an elliptical orbit with the Sun at one focus. Its least distance from the Sun is $2$ units and its greatest distance is $18$ units. Take the centre of the orbit as the origin and the major axis along the $x$-axis.`,
    d: 4, c: 'application',
    model: r`(a) Option (a). (b) $${N(e.e)}$. (c) (i) $\dfrac{x^2}{100} + \dfrac{y^2}{36} = 1$. Or (ii) $3.6$ units.`,
    sol: r`(a) $2a = 2 + 18 = 20$. (b) $a = 10$, $c = a - 2 = 8$, $e = 0.8$. (c) (i) $b^2 = 100 - 64 = 36$. (ii) $\dfrac{b^2}{a} = 3.6$.`,
    children: [
      child('a', mk.mcq({ stem: 'The length of the major axis of the orbit is', opts: ['$20$ units', '$16$ units', '$10$ units', '$36$ units'], key: 'a', sol: r`The nearest and farthest points lie at the two ends of the major axis, on a line through the Sun, so the major axis is $2 + 18 = 20$. The value $16$ is the difference $18 - 2$, $10$ is $a$, and $36$ is $2 \times 18$.`, d: 3, c: 'application', t: [3], time: 75 })),
      child('b', mk.num({ stem: 'Find the eccentricity of the orbit.', value: 0.8, sol: r`$a = 10$ and the Sun is at distance $a - c = 2$ from the nearer vertex, so $c = 8$. Then $e = \dfrac{c}{a} = \dfrac{8}{10} = 0.8$.`, scheme: [['a = 10, c = 8, e = 0.8', 1]], d: 3, c: 'application', t: [3], time: 90 })),
      child('c', mk.short({ marks: 2, stem: '**(i)** Write the equation of the orbit in standard form.', model: r`$a = 10$ and $c = 8$, so $b^2 = a^2 - c^2 = 100 - 64 = 36$. The orbit is $\dfrac{x^2}{100} + \dfrac{y^2}{36} = 1$.`, sol: 'Use b squared equals a squared minus c squared.', scheme: [['b^2 = 100 - 64 = 36', 1], ['x^2/100 + y^2/36 = 1', 1]], d: 3, c: 'application', t: [3], time: 90 }), [
        mk.short({ marks: 2, stem: '**(ii)** Find the distance from the Sun to the point of the orbit that lies directly above the Sun.', model: r`The point above the focus $(8, 0)$ is an end of the latus rectum, at height $\dfrac{b^2}{a} = \dfrac{36}{10} = 3.6$. Check: $\dfrac{64}{100} + \dfrac{3.6^2}{36} = 0.64 + 0.36 = 1$. The distance is $3.6$ units.`, sol: 'The point is an end of the latus rectum, at height b squared over a.', scheme: [['The point (8, y) with y = b^2/a', 1], ['Distance 3.6 units', 1]], d: 4, c: 'application', t: [3], time: 120 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which([peri + apo, apo - peri, 10, 36], 20);
    Cx.child('b').val(N(e.e));
    Cx.child('c').assert(e.a.eq(10) && e.c.eq(8) && e.b.eq(6) && Rat.of(64).add(36).eq(100) && e.e.eq('4/5') && e.verifySampling(), 'x^2/100 + y^2/36 = 1');
    Cx.child('c').model([100, 64, 36]);
    Cx.child('cii').assert(e.lr.eq('36/5') && e.on([8, '18/5']) && Rat.of('18/5').eq('36/10'), '3.6');
    Cx.child('cii').model([3.6, 36, 10, 0.64, 0.36]);
  });
}
