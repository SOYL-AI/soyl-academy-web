// ISC 11 Mathematics ch13 Conic Sections: Introduction and Parabola - 3-mark short-answer items.
import { Q, mk } from './lib.mjs';
import { Conic, Par, fr, sqrtF, pt, range, focusConic, ps2, pl2, e2At } from './conic.mjs';

const r = String.raw;
const lattice = (c, lim = 40) => range(-lim, lim).flatMap((x) => range(-lim, lim).filter((y) => c.on([x, y])).map((y) => [x, y]));

{
  const S = [1, 1], ln = [3, 4, 5], c = focusConic(S, ln, fr(25, 16));
  Q('s301', mk.short({ marks: 3, stem: r`Find the equation of the conic whose focus is $(1, 1)$, whose directrix is the line $3x + 4y + 5 = 0$ and whose eccentricity is $\dfrac{5}{4}$. Name the conic.`, model: r`$PS^2 = (x - 1)^2 + (y - 1)^2$ and $PL^2 = \dfrac{(3x + 4y + 5)^2}{25}$. With $e^2 = \dfrac{25}{16}$, $PS^2 = e^2 PL^2$ gives $(x - 1)^2 + (y - 1)^2 = \dfrac{(3x + 4y + 5)^2}{16}$, so $16x^2 - 32x + 16 + 16y^2 - 32y + 16 = 9x^2 + 16y^2 + 25 + 24xy + 30x + 40y$. Collecting, $7x^2 - 24xy - 62x - 72y + 7 = 0$. Since $e = \dfrac{5}{4} > 1$, the conic is a hyperbola.`, sol: 'Use $PL^2 = \\dfrac{(ax + by + c)^2}{a^2 + b^2}$ and clear the fractions before expanding.', scheme: [['$PS^2$ and $PL^2 = \\dfrac{(3x + 4y + 5)^2}{25}$', 1], ['$7x^2 - 24xy - 62x - 72y + 7 = 0$', 1], ['Hyperbola, because $e > 1$', 1]], d: 4, c: 'application', t: [1], time: 190 }), (C) => {
    C.assert(c.tex() === '7x^2 - 24xy - 62x - 72y + 7 = 0' && c.kind() === 'hyperbola' && fr(16 + 16).eq(32) && range(-3, 3).every((x) => range(-3, 3).every((y) => c.val([x, y]).eq(fr(16 * ((x - 1) ** 2 + (y - 1) ** 2) - (3 * x + 4 * y + 5) ** 2)))), 'expanded equation matches 16 PS^2 - (3x + 4y + 5)^2 at 49 points; B^2 - 4AC = 576 > 0'); C.model([25, 16, 9, 24, 30, 40, 62, 72, 7, 5, 4]);
  });
}
{
  const c = focusConic([4, 0], [1, 0, -1], fr(4));
  Q('s302', mk.short({ marks: 3, stem: r`A point $P$ moves so that its distance from the point $(4, 0)$ is always twice its distance from the line $x = 1$. Find the equation of the path of $P$ and name the curve.`, model: r`Here $PS = 2\,PL$, so $PS^2 = 4\,PL^2$: $(x - 4)^2 + y^2 = 4(x - 1)^2$. Then $x^2 - 8x + 16 + y^2 = 4x^2 - 8x + 4$, which gives $3x^2 - y^2 - 12 = 0$. The ratio $e = 2 > 1$, so the path is a hyperbola.`, sol: 'The ratio of the distances is the eccentricity.', scheme: [['$(x - 4)^2 + y^2 = 4(x - 1)^2$', 1], ['$3x^2 - y^2 - 12 = 0$', 1], ['Hyperbola, since $e = 2 > 1$', 1]], d: 3, c: 'application', t: [1], time: 150 }), (C) => {
    C.assert(c.tex() === '3x^2 - y^2 - 12 = 0' && c.kind() === 'hyperbola' && c.on([2, 0]) && e2At([4, 0], [1, 0, -1], [2, 0]).eq(4) && c.on([4, 6]) && e2At([4, 0], [1, 0, -1], [4, 6]).eq(4), '3x^2 - y^2 - 12 = 0 passes through (2, 0) and (4, 6) with PS = 2 PL'); C.model([4, 8, 16, 2, 1, 3, 12]);
  });
}
{
  const ok = range(1, 9).every((a) => { const p = new Par('R', a); p.verify(); return Conic.fromFocus([a, 0], [1, 0, a], fr(1)).same(new Conic(0, 0, 1, -4 * a, 0, 0)) && p.lr.eq(4 * a); });
  Q('s303', mk.short({ marks: 3, stem: r`A parabola has focus $S(a, 0)$ and directrix $x = -a$, where $a > 0$. Use $PS = PL$ to obtain its equation, and show that its latus rectum has length $4a$.`, model: r`For $P(x, y)$, $PS^2 = PL^2$ gives $(x - a)^2 + y^2 = (x + a)^2$, so $y^2 = 4ax$. The latus rectum lies on the line through the focus perpendicular to the axis, $x = a$. There $y^2 = 4a \cdot a = 4a^2$, so $y = \pm 2a$, and the distance between $(a, 2a)$ and $(a, -2a)$ is $4a$.`, sol: 'The latus rectum is the chord of the parabola along $x = a$.', scheme: [['$(x - a)^2 + y^2 = (x + a)^2$', 1], ['$y^2 = 4ax$', 1], ['At $x = a$: $y = \\pm 2a$, length $4a$', 1]], d: 3, c: 'analysis', t: [1, 2], time: 130 }), (C) => {
    C.assert(ok, 'for a = 1 .. 9: PS = PL from focus (a, 0) and directrix x = -a gives y^2 = 4ax with latus rectum 4a (exact)'); C.model([4, 2]);
  });
}
{
  const p = new Par('R', 9), pts = lattice(p, 60).filter((q) => ps2(p.focus, q).eq(625));
  Q('s304', mk.short({ marks: 3, stem: r`Find the points of the parabola $y^2 = 36x$ whose distance from the focus is $25$ units.`, model: r`$4a = 36$, so $a = 9$. A point $(x_1, y_1)$ has focal distance $x_1 + a = 25$, so $x_1 = 16$. Then $y_1^2 = 36 \times 16 = 576$, so $y_1 = \pm 24$. The points are $(16, 24)$ and $(16, -24)$.`, sol: 'Use the focal distance $x_1 + a$ instead of the distance formula.', scheme: [['$a = 9$ and $x_1 + 9 = 25$', 1], ['$x_1 = 16$ and $y_1^2 = 576$', 1], ['Points $(16, 24)$ and $(16, -24)$', 1]], d: 3, c: 'application', t: [2], time: 130 }), (C) => {
    p.verify();
    C.assert(pts.map((q) => pt(...q)).join() === '(16, -24),(16, 24)' && p.focal([16, 24]).eq(25) && ps2(p.focus, [16, -24]).eq(625), 'lattice points of y^2 = 36x at distance 25 from (9, 0): (16, 24) and (16, -24)'); C.model([36, 9, 25, 16, 576, 24]);
  });
}
{
  const p = new Par('R', 4);
  Q('s305', mk.short({ marks: 3, stem: r`The ends of the latus rectum of a parabola with its vertex at the origin are $(4, 8)$ and $(4, -8)$. Find the equation, the focus and the directrix of the parabola.`, model: r`The latus rectum lies on $x = 4$, so the focus is $(4, 0)$ and the axis is the $x$-axis. Half of the latus rectum is $2a = 8$, so $a = 4$, which agrees with the focus. The parabola opens to the right: $y^2 = 16x$. The directrix is $x = -4$.`, sol: 'The midpoint of the latus rectum is the focus, and its half-length is $2a$.', scheme: [['Focus $(4, 0)$ and $a = 4$', 1], ['$y^2 = 16x$', 1], ['Directrix $x = -4$', 1]], d: 3, c: 'application', t: [2], time: 130 }), (C) => {
    p.verify();
    C.assert(p.lrEnds.map((e) => pt(...e)).join() === '(4, 8),(4, -8)' && p.eqTex() === 'y^2 = 16x' && p.focTex() === '(4, 0)' && p.dirTex() === 'x = -4' && p.lr.eq(16), 'a = 4: y^2 = 16x has latus rectum ends (4, 8) and (4, -8), focus (4, 0), directrix x = -4'); C.model([4, 8, 2, 16]);
  });
}
{
  const p = new Par('R', 3), ok = range(-6, 6).every((t) => p.on([fr(3 * t * t), fr(6 * t)]));
  Q('s306', mk.short({ marks: 3, stem: r`A point moves so that its coordinates are $x = 3t^2$ and $y = 6t$, where $t$ takes every real value. Eliminate $t$ to find the equation of the path, and write down the focus and the directrix of the curve.`, model: r`From $y = 6t$, $t = \dfrac{y}{6}$, so $x = 3 \times \dfrac{y^2}{36}$, that is $y^2 = 12x$. This is $y^2 = 4ax$ with $a = 3$, so the focus is $(3, 0)$ and the directrix is $x = -3$.`, sol: 'Express $t$ from the simpler equation and substitute.', scheme: [['Eliminate $t$: $y^2 = 12x$', 1], ['$a = 3$ and focus $(3, 0)$', 1], ['Directrix $x = -3$', 1]], d: 3, c: 'understanding', t: [2], time: 110 }), (C) => {
    p.verify();
    C.assert(ok && p.eqTex() === 'y^2 = 12x' && p.focTex() === '(3, 0)' && p.dirTex() === 'x = -3', 'the 13 points (3t^2, 6t), t = -6 .. 6, all lie on y^2 = 12x; a = 3'); C.model([6, 36, 3, 12]);
  });
}
{
  const p = new Par('R', 3), a = [3, 6], b = [27, -18];
  Q('s307', mk.short({ marks: 3, stem: r`The points $A(3, 6)$ and $B(27, -18)$ lie on the parabola $y^2 = 12x$, and $S$ is its focus. Verify that both points are on the parabola and find $AS + BS$.`, model: r`At $A$: $y^2 = 36$ and $12x = 36$. At $B$: $y^2 = 324$ and $12x = 324$. Both points lie on the parabola. Here $a = 3$, so $AS = x_1 + a = 3 + 3 = 6$ and $BS = 27 + 3 = 30$. Hence $AS + BS = 36$.`, sol: 'Use the focal distance $x_1 + a$ for each point.', scheme: [['Both points satisfy $y^2 = 12x$', 1], ['$AS = 6$ and $BS = 30$', 1], ['$AS + BS = 36$', 1]], d: 3, c: 'application', t: [2], time: 120 }), (C) => {
    p.verify();
    C.assert(p.on(a) && p.on(b) && p.focal(a).eq(6) && p.focal(b).eq(30) && ps2(p.focus, b).eq(900) && 6 + 30 === 36, 'A and B are on y^2 = 12x; AS = 6, BS = 30, sum 36'); C.model([36, 12, 324, 3, 27, 6, 30]);
  });
}
{
  const c = focusConic([0, 0], [3, 4, -10], fr(1));
  Q('s308', mk.short({ marks: 3, stem: r`Find the equation of the parabola whose focus is the origin and whose directrix is the line $3x + 4y = 10$.`, model: r`$PS^2 = x^2 + y^2$ and $PL^2 = \dfrac{(3x + 4y - 10)^2}{25}$. Setting $PS^2 = PL^2$: $25(x^2 + y^2) = (3x + 4y - 10)^2 = 9x^2 + 16y^2 + 100 + 24xy - 60x - 80y$. Collecting, $16x^2 - 24xy + 9y^2 + 60x + 80y - 100 = 0$.`, sol: 'Write the directrix as $3x + 4y - 10 = 0$ before using the distance formula.', scheme: [['$PL^2 = \\dfrac{(3x + 4y - 10)^2}{25}$', 1], ['$25(x^2 + y^2) = (3x + 4y - 10)^2$', 1], ['$16x^2 - 24xy + 9y^2 + 60x + 80y - 100 = 0$', 1]], d: 4, c: 'application', t: [3], time: 160 }), (C) => {
    C.assert(c.tex() === '16x^2 - 24xy + 9y^2 + 60x + 80y - 100 = 0' && c.disc().isZero() && range(-3, 3).every((x) => range(-3, 3).every((y) => c.val([x, y]).eq(fr(25 * (x * x + y * y) - (3 * x + 4 * y - 10) ** 2)))), 'expanded equation equals 25 PS^2 - (3x + 4y - 10)^2 at 49 points; B^2 - 4AC = 0'); C.model([25, 3, 4, 10, 9, 16, 100, 24, 60, 80]);
  });
}
{
  const p = new Par('D', 1, 6, 9);
  Q('s309', mk.short({ marks: 3, stem: r`A jet of water leaves a nozzle at ground level and follows a parabolic path that reaches its greatest height of $9$ m at a horizontal distance of $6$ m from the nozzle. Taking the nozzle as the origin, find the equation of the path and the height of the water $2$ m from the nozzle, measured horizontally.`, model: r`The highest point is the vertex $(6, 9)$ and the path opens downward: $(x - 6)^2 = -4a(y - 9)$. The nozzle $(0, 0)$ gives $36 = 36a$, so $a = 1$ and $(x - 6)^2 = -4(y - 9)$. At $x = 2$: $16 = -4(y - 9)$, so $y - 9 = -4$ and $y = 5$. The height is $5$ m.`, sol: 'Place the vertex at the highest point and use the nozzle to find $a$.', scheme: [['$(x - 6)^2 = -4a(y - 9)$', 1], ['$a = 1$ from the nozzle', 1], ['Height $5$ m at $x = 2$', 1]], d: 3, c: 'application', t: [3], time: 140 }), (C) => {
    p.verify();
    C.assert(p.eqTex() === '(x - 6)^2 = -4(y - 9)' && p.on([0, 0]) && p.on([12, 0]) && p.on([2, 5]) && p.on([10, 5]), 'a = 1: passes through (0, 0), (12, 0) and (2, 5)'); C.model([6, 9, 36, 1, 4, 2, 16, 5]);
  });
}
{
  const p = new Par('U', 5);
  Q('s310', mk.short({ marks: 3, stem: r`The cross-section of a reflector is a parabola whose focus, where the bulb sits, is $5$ cm from its vertex. The open end of the reflector is $40$ cm across. Find the depth of the reflector.`, model: r`Put the vertex at the origin with the axis along the $y$-axis: $x^2 = 4ay$ with $a = 5$, that is $x^2 = 20y$. The rim has $x = \pm 20$, so $400 = 20y$ and $y = 20$. The depth of the reflector is $20$ cm.`, sol: 'Half the width of the open end is the $x$-coordinate of a rim point.', scheme: [['$x^2 = 20y$ from $a = 5$', 1], ['Rim at $x = 20$', 1], ['Depth $20$ cm', 1]], d: 3, c: 'application', t: [3], time: 120 }), (C) => {
    p.verify();
    C.assert(p.eqTex() === 'x^2 = 20y' && p.on([20, 20]) && p.on([-20, 20]) && p.focus[1].eq(5), 'a = 5: x^2 = 20y has rim points (+-20, 20)'); C.model([5, 20, 400]);
  });
}
{
  const p = new Par('U', 1, -3, 3);
  Q('s311', mk.short({ marks: 3, stem: r`Find the equation of the parabola whose focus is $(-3, 4)$ and whose directrix is the line $y = 2$. Write down its vertex.`, model: r`$PS^2 = PL^2$ gives $(x + 3)^2 + (y - 4)^2 = (y - 2)^2$, so $x^2 + 6x + 9 + y^2 - 8y + 16 = y^2 - 4y + 4$, that is $x^2 + 6x - 4y + 21 = 0$. Then $(x + 3)^2 = 4y - 12 = 4(y - 3)$. The vertex is midway between the focus and the directrix: $(-3, 3)$.`, sol: 'The vertex lies halfway between the focus and the directrix, on the axis.', scheme: [['$(x + 3)^2 + (y - 4)^2 = (y - 2)^2$', 1], ['$x^2 + 6x - 4y + 21 = 0$', 1], ['$(x + 3)^2 = 4(y - 3)$ and vertex $(-3, 3)$', 1]], d: 3, c: 'application', t: [3], time: 140 }), (C) => {
    p.verify();
    C.assert(p.eqTex() === '(x + 3)^2 = 4(y - 3)' && p.genTex() === 'x^2 + 6x - 4y + 21 = 0' && p.focTex() === '(-3, 4)' && p.dirTex() === 'y = 2' && pt(...p.vertex) === '(-3, 3)', '(x + 3)^2 = 4(y - 3) has focus (-3, 4), directrix y = 2, vertex (-3, 3)'); C.model([3, 4, 2, 6, 9, 16, 8, 21, 12]);
  });
}
