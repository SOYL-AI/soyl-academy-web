// ISC 11 Mathematics ch13 Conic Sections: Introduction and Parabola - true-false, fill-blank, numerical and 2-mark short-answer items.
import { Q, mk } from './lib.mjs';
import { Conic, Par, fr, sqrtF, pt, range, focusConic, ps2, pl2, e2At, coneSection, coneSectionByForm } from './conic.mjs';

const r = String.raw;
const lattice = (c, lim = 40) => range(-lim, lim).flatMap((x) => range(-lim, lim).filter((y) => c.on([x, y])).map((y) => [x, y]));

// ============================================================ true-false
Q('tf1', mk.tf({ stem: r`No plane can meet a double cone in a single point.`, key: 'f', sol: r`A plane through the vertex that makes an angle with the axis greater than the semi-vertical angle meets the cone only at the vertex. For example, a cone with $\alpha = 30^\circ$ and a plane at $\beta = 50^\circ$ give just one point, so the statement is false.`, d: 2, c: 'understanding', t: [1], time: 45 }), (C) => {
  C.assert(coneSection(30, 50, true) === 'point' && coneSectionByForm(30, 50, true) === 'point' && range(11, 89).every((a) => coneSection(a, 90, true) === 'point'), 'beta = 50 > alpha = 30 through the vertex gives a single point (also every alpha < 90 with beta = 90)'); C.key('f');
});
Q('tf2', mk.tf({ stem: r`A point moves so that its distance from a fixed point is always $1.4$ times its distance from a fixed line that does not pass through that point. The path of the point is an ellipse.`, key: 'f', sol: r`The ratio $e = 1.4$ is greater than $1$, so the path is a hyperbola, not an ellipse. An ellipse needs a ratio below $1$.`, d: 2, c: 'understanding', t: [1], time: 45 }), (C) => {
  const c = focusConic([0, 0], [1, 0, -5], fr(49, 25));
  C.assert(fr(7, 5).eq(fr(14, 10)) && c.kind() === 'hyperbola' && c.disc().sign() > 0, 'e = 1.4 = 7/5 > 1: B^2 - 4AC > 0, a hyperbola'); C.key('f');
});
Q('tf3', mk.tf({ stem: r`Every point of the parabola $y^2 = -12x$ has a negative or zero $x$-coordinate.`, key: 't', sol: r`From $y^2 = -12x$ we get $x = -\dfrac{y^2}{12}$, and $y^2 \ge 0$, so $x \le 0$ for every point. The parabola opens to the left of the vertex and never enters the half-plane $x > 0$.`, d: 2, c: 'understanding', t: [2], time: 45 }), (C) => {
  const p = new Par('L', 3), pts = lattice(p, 40);
  p.verify();
  C.assert(pts.length > 5 && pts.every(([x]) => x <= 0) && p.on([-3, 6]) && !p.on([3, 6]), 'every lattice point of y^2 = -12x has x <= 0'); C.key('t');
});
Q('tf4', mk.tf({ stem: r`For a point $P(x_1, y_1)$ of the parabola $y^2 = 4ax$ with $a > 0$, the distance of $P$ from the focus is $x_1 - a$.`, key: 'f', sol: r`The focus is $(a, 0)$ and the directrix is $x = -a$, so $PS = PL = x_1 + a$, not $x_1 - a$. For $y^2 = 12x$ and $P(12, 12)$, the distance is $12 + 3 = 15$, while $x_1 - a = 9$ is smaller than the true distance.`, d: 2, c: 'understanding', t: [2], time: 50 }), (C) => {
  const p = new Par('R', 3), q = [12, 12];
  p.verify();
  C.assert(p.on(q) && p.focal(q).eq(15) && q[0] + 3 === 15 && q[0] - 3 === 9 && ps2(p.focus, q).eq(225), 'a = 3, P(12, 12): focal distance 15 = x1 + a, not 9'); C.key('f');
});
Q('tf5', mk.tf({ stem: r`If the focus lies on the directrix, the points $P$ with $PS = PL$ form a straight line, not a parabola.`, key: 't', sol: r`Take the focus $(1, 2)$ on the line $3x - y - 1 = 0$. Then $PS^2 = PL^2$ reduces to $(x + 3y - 7)^2 = 0$, which is the single straight line $x + 3y - 7 = 0$ through the focus, perpendicular to the directrix. With the focus off the directrix the equation is a genuine parabola.`, d: 4, c: 'analysis', t: [3], time: 80 }), (C) => {
  const c = Conic.fromFocus([1, 2], [3, -1, -1], fr(1), 10), sq = new Conic(1, 6, 9, -14, -42, 49);
  C.assert(c.same(sq) && lattice(c, 30).length > 10 && lattice(c, 30).every(([x, y]) => x + 3 * y - 7 === 0) && 3 * 1 - 2 - 1 === 0 && 3 * 1 + (-1) * 3 === 0, 'focus (1, 2) lies on 3x - y - 1 = 0; PS^2 = PL^2 gives (x + 3y - 7)^2 = 0 and every lattice point satisfies x + 3y = 7'); C.key('t');
});

// ============================================================ fill-blank
Q('fb1', mk.fill({ stem: r`A plane makes an angle of $80^\circ$ with the axis of a double cone of semi-vertical angle $33^\circ$ and misses the vertex. The curve in which it cuts the cone is an ____.`, acc: [['ellipse']], sol: r`Here $\beta = 80^\circ$ is greater than $\alpha = 33^\circ$ (and not $90^\circ$), so the section is an ellipse.`, d: 1, c: 'recall', t: [1], time: 35 }), (C) => {
  C.assert(coneSection(33, 80) === 'ellipse' && coneSectionByForm(33, 80) === 'ellipse', '80 > 33 and 80 < 90: an ellipse'); C.blank('ellipse');
});
Q('fb2', mk.fill({ stem: r`The parabola $y^2 = 52x$ has the directrix $x = $ ____.`, acc: [['-13']], sol: r`$4a = 52$, so $a = 13$. The parabola opens to the right, so the directrix is $x = -13$.`, d: 1, c: 'recall', t: [2], time: 40 }), (C) => {
  const p = new Par('R', 13);
  p.verify();
  C.assert(p.eqTex() === 'y^2 = 52x' && p.dirVal.eq(-13), 'a = 13: directrix x = -13'); C.blank(-13);
});
Q('fb3', mk.fill({ stem: r`The distance between the focus and the directrix of the parabola $y^2 = 18x$ is ____ units.`, acc: [['9']], sol: r`$4a = 18$, so $a = \dfrac{9}{2}$. The focus is at $x = \dfrac{9}{2}$ and the directrix at $x = -\dfrac{9}{2}$, so they are $2a = 9$ units apart.`, d: 2, c: 'understanding', t: [2], time: 50 }), (C) => {
  const p = new Par('R', fr(9, 2));
  p.verify();
  C.assert(p.eqTex() === 'y^2 = 18x' && p.focus[0].sub(p.dirVal).eq(9), 'a = 9/2: focus x = 9/2, directrix x = -9/2, distance 9'); C.blank(9);
});
Q('fb4', mk.fill({ stem: r`A conic has eccentricity $\dfrac{3}{5}$ and its directrix is $10$ units from its focus. The length of its latus rectum is ____ units.`, acc: [['12']], sol: r`The latus rectum has length $2ep = 2 \times \dfrac{3}{5} \times 10 = 12$.`, d: 2, c: 'understanding', t: [1], time: 50 }), (C) => {
  const e = fr(3, 5), c = focusConic([0, 0], [1, 0, -10], e.mul(e)), ys = range(-30, 30).filter((y) => c.on([0, y]));
  C.assert(e.mul(10).mul(2).eq(12) && ys.join() === '-6,6' && ys.every((y) => e2At([0, 0], [1, 0, -10], [0, y]).eq(fr(9, 25))), 'ends (0, -6), (0, 6): length 12'); C.blank(12);
});
Q('fb5', mk.fill({ stem: r`The focus of the parabola $(y - 3)^2 = 12(x + 1)$ has $x$-coordinate ____.`, acc: [['2']], sol: r`The vertex is $(-1, 3)$ and $4a = 12$, so $a = 3$. The parabola opens to the right, so the focus is $(-1 + 3, 3) = (2, 3)$ and its $x$-coordinate is $2$.`, d: 2, c: 'understanding', t: [3], time: 50 }), (C) => {
  const p = new Par('R', 3, -1, 3);
  p.verify();
  C.assert(p.eqTex() === '(y - 3)^2 = 12(x + 1)' && p.focTex() === '(2, 3)', 'vertex (-1, 3), a = 3, focus (2, 3)'); C.blank(2);
});

// ============================================================ numerical
Q('n1', mk.num({ stem: r`The point $P(9, 12)$ lies on a conic whose focus is the origin and whose directrix is the line $x = 4$. Find the eccentricity of the conic.`, value: 3, unit: null, sol: r`$PS = \sqrt{9^2 + 12^2} = 15$ and $PL = 9 - 4 = 5$, so $e = \dfrac{PS}{PL} = \dfrac{15}{5} = 3$. The conic is a hyperbola.`, scheme: [['$PS = 15$, $PL = 5$ and $e = 3$', 1]], marks: 1, d: 2, c: 'understanding', t: [1], time: 70 }), (C) => {
  const S = [0, 0], ln = [1, 0, -4], c = focusConic([0, 0], ln, fr(9));
  C.assert(sqrtF(ps2(S, [9, 12])).eq(15) && sqrtF(pl2(ln, [9, 12])).eq(5) && c.on([9, 12]) && c.kind() === 'hyperbola', 'PS = 15, PL = 5, e = 3 and P(9, 12) is on the conic with e^2 = 9'); C.val(3);
});
Q('n2', mk.num({ stem: r`A chord of the parabola $y^2 = 20x$ passes through its focus and is perpendicular to its axis. How far is this chord from the vertex?`, value: 5, unit: null, sol: r`$4a = 20$, so $a = 5$. The chord is the latus rectum, along the line $x = a$, so its distance from the vertex is $a = 5$.`, scheme: [['$a = 5$ and the chord is $x = a$', 1]], marks: 1, d: 2, c: 'understanding', t: [2], time: 60 }), (C) => {
  const p = new Par('R', 5);
  p.verify();
  C.assert(p.lrEnds.every(([x]) => x.eq(5)) && p.focus[0].eq(5), 'the latus rectum lies on x = 5, so its distance from the vertex is 5'); C.val(5);
});
Q('n3', mk.num({ stem: r`On the parabola $y^2 = 8x$ take the point $P(at^2, 2at)$ for $t = 3$. Find the distance of $P$ from the focus.`, value: 20, unit: null, sol: r`$4a = 8$, so $a = 2$ and $P = (2 \times 9, 2 \times 2 \times 3) = (18, 12)$. The focal distance is $x_1 + a = 18 + 2 = 20$; equally, $a(t^2 + 1) = 2 \times 10 = 20$.`, scheme: [['$P = (18, 12)$ and $PS = x_1 + a = 20$', 1]], marks: 1, d: 3, c: 'application', t: [2], time: 80 }), (C) => {
  const p = new Par('R', 2), q = p.param(3);
  p.verify();
  C.assert(pt(...q) === '(18, 12)' && p.focal(q).eq(20) && ps2(p.focus, q).eq(400), 'P(18, 12), focus (2, 0): distance 20'); C.val(20);
});
Q('n4', mk.num({ stem: r`The parabola $x^2 = 4ay$ passes through the point $(10, 5)$. Find the distance of its focus from its vertex.`, value: 5, unit: null, sol: r`Substituting gives $100 = 4a \times 5$, so $4a = 20$ and $a = 5$. The focus is $(0, 5)$, which is $5$ units from the vertex.`, scheme: [['Substitute the point: $a = 5$', 1]], marks: 1, d: 3, c: 'understanding', t: [2], time: 75 }), (C) => {
  const p = new Par('U', 5);
  p.verify();
  C.assert(p.on([10, 5]) && p.focus[1].eq(5) && range(1, 40).filter((a) => fr(100).eq(fr(4 * a).mul(5))).join() === '5', 'a = 5: x^2 = 20y passes through (10, 5); only a = 5 works among 1..40'); C.val(5);
});
Q('n5', mk.num({ stem: r`The cable of an imagined ropeway hangs between two pylons $80$ m apart in the shape of a parabola, with its lowest point midway between them. Each end of the cable is $20$ m above the lowest point. How many metres above the lowest point is the cable at a place $24$ m from the middle?`, value: 7.2, unit: null, sol: r`Take the lowest point as the origin, so $x^2 = 4ay$. The end $(40, 20)$ gives $1600 = 80a$, so $4a = 80$ and $x^2 = 80y$. At $x = 24$: $y = \dfrac{576}{80} = 7.2$ m.`, scheme: [['$x^2 = 80y$ from the end point', 1]], marks: 1, d: 3, c: 'application', t: [3], time: 100 }), (C) => {
  const p = new Par('U', 20);
  p.verify();
  const y = fr(576).div(80);
  C.assert(p.on([40, 20]) && p.on([-40, 20]) && p.on([24, y]) && y.eq(fr(36, 5)) && p.eqTex() === 'x^2 = 80y', 'x^2 = 80y passes through (40, 20); at x = 24 the height is 36/5 = 7.2'); C.val(7.2);
});
Q('n6', mk.num({ stem: r`How many points of the parabola $y^2 = 12x$ are at a distance of $15$ units from its focus?`, value: 2, unit: null, sol: r`$a = 3$ and the focal distance is $x_1 + a = 15$, so $x_1 = 12$. Then $y_1^2 = 12 \times 12 = 144$ gives $y_1 = \pm 12$, the points $(12, 12)$ and $(12, -12)$, so the number of points $= 2$.`, scheme: [['$x_1 = 12$ and $y_1 = \\pm 12$', 1]], marks: 1, d: 4, c: 'analysis', t: [2], time: 90 }), (C) => {
  const p = new Par('R', 3), pts = lattice(p, 60).filter((q) => ps2(p.focus, q).eq(225));
  p.verify();
  C.assert(pts.length === 2 && pts.map((q) => pt(...q)).join() === '(12, -12),(12, 12)', 'lattice points of y^2 = 12x at distance 15 from (3, 0): (12, 12) and (12, -12)'); C.val(2);
});

// ============================================================ short, 2 marks
Q('s201', mk.short({ marks: 2, stem: r`A double cone has semi-vertical angle $36^\circ$. Name the section made by a plane through its vertex when the plane makes an angle of (i) $36^\circ$ and (ii) $60^\circ$ with the axis.`, model: r`(i) $\beta = 36^\circ = \alpha$, so the plane meets the cone in one straight line (a generator). (ii) $\beta = 60^\circ > \alpha = 36^\circ$, so the plane meets the cone only at the vertex: a single point.`, sol: 'Compare $\\beta$ with the semi-vertical angle $\\alpha$.', scheme: [['(i) One straight line, since $\\beta = \\alpha$', 1], ['(ii) A single point, since $\\beta > \\alpha$', 1]], d: 2, c: 'understanding', t: [1], time: 70 }), (C) => {
  C.assert(coneSection(36, 36, true) === 'line' && coneSection(36, 60, true) === 'point' && coneSectionByForm(36, 36, true) === 'line' && coneSectionByForm(36, 60, true) === 'point', 'beta = alpha: one line; beta = 60 > 36: a point'); C.model([36, 60]);
});
{
  const e = fr(4, 5), S = [1, 2], ln = [1, 0, -11], c = focusConic(S, ln, e.mul(e)), ys = range(-30, 30).filter((y) => c.on([1, y]));
  Q('s202', mk.short({ marks: 2, stem: r`A conic has its focus at $(1, 2)$, its directrix at $x = 11$ and eccentricity $\dfrac{4}{5}$. Find the length of its latus rectum and the coordinates of the ends of the latus rectum.`, model: r`The distance from the focus to the directrix is $p = 11 - 1 = 10$, so the latus rectum has length $2ep = 2 \times \dfrac{4}{5} \times 10 = 16$. It lies on $x = 1$ and extends $8$ units each side of the focus, so its ends are $(1, 10)$ and $(1, -6)$.`, sol: 'The latus rectum is the chord through the focus perpendicular to the axis; its half-length is $ep$.', scheme: [['Length $2ep = 16$', 1], ['Ends $(1, 10)$ and $(1, -6)$', 1]], d: 3, c: 'application', t: [1], time: 90 }), (C) => {
    C.assert(e.mul(10).mul(2).eq(16) && ys.join() === '-6,10' && ys.every((y) => e2At(S, ln, [1, y]).eq(fr(16, 25))), 'x = 1 meets the conic at y = -6 and y = 10: length 16 = 2ep'); C.model([11, 1, 10, 16, 8, 6]);
  });
}
{
  const c = focusConic([5, -1], [1, 0, -1], fr(1));
  Q('s203', mk.short({ marks: 2, stem: r`Find the equation of the conic whose focus is $(5, -1)$, whose directrix is the line $x = 1$ and whose eccentricity is $1$, and name the conic.`, model: r`$PS^2 = PL^2$ gives $(x - 5)^2 + (y + 1)^2 = (x - 1)^2$, so $x^2 - 10x + 25 + y^2 + 2y + 1 = x^2 - 2x + 1$, that is $y^2 - 8x + 2y + 25 = 0$. Since $e = 1$, the conic is a parabola.`, sol: 'Square the property so that no root is needed.', scheme: [['$(x - 5)^2 + (y + 1)^2 = (x - 1)^2$', 1], ['$y^2 - 8x + 2y + 25 = 0$, a parabola', 1]], d: 2, c: 'understanding', t: [1], time: 90 }), (C) => {
    C.assert(c.tex() === 'y^2 - 8x + 2y + 25 = 0' && c.kind() === 'parabola' && c.on([3, -1]) && !c.on([3, 0]), 'y^2 + 2y - 8x + 25 = 0, a parabola (B^2 - 4AC = 0)'); C.model([5, 1, 10, 25, 2, 8]);
  });
}
{
  const p = new Par('D', 3);
  Q('s204', mk.short({ marks: 2, stem: r`The equation of a parabola is $x^2 + 12y = 0$. Find its focus, its directrix and the length of its latus rectum.`, model: r`Write $x^2 = -12y$, so $4a = 12$ and $a = 3$. The parabola opens downward: the focus is $(0, -3)$, the directrix is $y = 3$, and the latus rectum has length $12$.`, sol: 'Rewrite in the form $x^2 = -4ay$ first.', scheme: [['Focus $(0, -3)$ and directrix $y = 3$', 1], ['Latus rectum $12$', 1]], d: 2, c: 'understanding', t: [2], time: 80 }), (C) => {
    p.verify();
    C.assert(new Conic(1, 0, 0, 0, 12, 0).same(p.conic()) && p.focTex() === '(0, -3)' && p.dirTex() === 'y = 3' && p.lr.eq(12), 'x^2 + 12y = 0 is x^2 = -12y: focus (0, -3), directrix y = 3, length 12'); C.model([12, 3]);
  });
}
{
  const p = new Par('D', fr(5, 2));
  Q('s205', mk.short({ marks: 2, stem: r`A parabola has its vertex at the origin and its focus on the negative $y$-axis, $\dfrac{5}{2}$ units from the origin. Find its equation and the equation of its directrix.`, model: r`The focus is $(0, -\dfrac{5}{2})$, so $a = \dfrac{5}{2}$ and the parabola opens downward: $x^2 = -4ay$, that is $x^2 = -10y$. The directrix is $y = \dfrac{5}{2}$.`, sol: 'The focus below the vertex gives the form $x^2 = -4ay$.', scheme: [['$x^2 = -10y$', 1], ['Directrix $y = \\dfrac{5}{2}$', 1]], d: 2, c: 'understanding', t: [2], time: 70 }), (C) => {
    p.verify();
    C.assert(p.eqTex() === 'x^2 = -10y' && p.dirTex() === 'y = \\dfrac{5}{2}' && p.focTex() === '(0, -\\dfrac{5}{2})', 'a = 5/2: x^2 = -10y, directrix y = 5/2'); C.model([5, 2, 4, 10]);
  });
}
{
  const p = new Par('D', fr(15, 2));
  Q('s206', mk.short({ marks: 2, stem: r`Find the coordinates of the ends of the latus rectum of the parabola $x^2 = -30y$.`, model: r`$4a = 30$, so $a = \dfrac{15}{2}$ and the focus is $(0, -\dfrac{15}{2})$. Putting $y = -\dfrac{15}{2}$ gives $x^2 = 225$, so $x = \pm 15$. The ends are $(15, -\dfrac{15}{2})$ and $(-15, -\dfrac{15}{2})$.`, sol: 'Find the focus from 4a, then put its y-coordinate into the equation to get the two ends.', scheme: [['Focus $(0, -\\dfrac{15}{2})$', 1], ['Ends $(\\pm 15, -\\dfrac{15}{2})$', 1]], d: 3, c: 'application', t: [2], time: 80 }), (C) => {
    p.verify();
    C.assert(p.lrEnds.map((e) => pt(...e)).join() === '(15, -\\dfrac{15}{2}),(-15, -\\dfrac{15}{2})' && p.lr.eq(30) && p.on([15, fr(-15, 2)]) && p.on([-15, fr(-15, 2)]), 'a = 15/2: ends (+-15, -15/2) lie on x^2 = -30y (225 = 225)'); C.model([30, 4, 15, 2, 225]);
  });
}
{
  const p = new Par('R', 3), q = p.param(-2);
  Q('s207', mk.short({ marks: 2, stem: r`Show that the point $(at^2, 2at)$ lies on the parabola $y^2 = 4ax$ for every real $t$. Then find the point of the parabola $y^2 = 12x$ that corresponds to $t = -2$.`, model: r`$y^2 = (2at)^2 = 4a^2t^2 = 4a \cdot at^2 = 4ax$, so the point lies on the parabola. For $y^2 = 12x$, $a = 3$, and $t = -2$ gives $x = 3 \times 4 = 12$ and $y = 2 \times 3 \times (-2) = -12$: the point is $(12, -12)$.`, sol: 'Substitute $x = at^2$ and $y = 2at$ into $y^2 = 4ax$.', scheme: [['$(2at)^2 = 4a \\cdot at^2$', 1], ['The point $(12, -12)$', 1]], d: 2, c: 'understanding', t: [2], time: 80 }), (C) => {
    p.verify();
    C.assert(pt(...q) === '(12, -12)' && p.on(q) && range(-5, 5).every((a) => range(-5, 5).every((t) => fr(2 * a * t).mul(2 * a * t).eq(fr(4 * a).mul(a * t * t)))), '(12, -12) is on y^2 = 12x; (2at)^2 = 4a(at^2) for 121 pairs (a, t)'); C.model([4, 3, 2, 12]);
  });
}
{
  const p = new Par('R', 8), q = [2, -8];
  Q('s208', mk.short({ marks: 2, stem: r`The point $P(2, -8)$ lies on the parabola $y^2 = 32x$. Find the focus $S$ of the parabola and the distance $PS$.`, model: r`$4a = 32$, so $a = 8$ and the focus is $S(8, 0)$. The focal distance is $PS = x_1 + a = 2 + 8 = 10$. Check: $PS = \sqrt{(2 - 8)^2 + (-8)^2} = \sqrt{100} = 10$.`, sol: 'For $y^2 = 4ax$ the focal distance of a point is $x_1 + a$.', scheme: [['Focus $(8, 0)$', 1], ['$PS = 10$ with the check', 1]], d: 3, c: 'application', t: [2], time: 80 }), (C) => {
    p.verify();
    C.assert(p.on(q) && p.focTex() === '(8, 0)' && p.focal(q).eq(10) && ps2(p.focus, q).eq(100) && 36 + 64 === 100, 'S(8, 0), P(2, -8): PS = 10 = x1 + a'); C.model([32, 8, 2, 10, 100]);
  });
}
{
  const p = new Par('D', 4, 2, 1);
  Q('s209', mk.short({ marks: 2, stem: r`A parabola has its vertex at $(2, 1)$ and its focus at $(2, -3)$. Find its equation and its directrix.`, model: r`The axis is the line $x = 2$ and $a = 1 - (-3) = 4$. The focus is below the vertex, so the parabola opens downward: $(x - 2)^2 = -16(y - 1)$. The directrix is $4$ units above the vertex: $y = 5$.`, sol: 'The directrix is as far from the vertex as the focus, on the other side.', scheme: [['$(x - 2)^2 = -16(y - 1)$', 1], ['Directrix $y = 5$', 1]], d: 3, c: 'application', t: [3], time: 90 }), (C) => {
    p.verify();
    C.assert(p.eqTex() === '(x - 2)^2 = -16(y - 1)' && p.focTex() === '(2, -3)' && p.dirTex() === 'y = 5', 'a = 4 below the vertex: (x - 2)^2 = -16(y - 1), directrix y = 5'); C.model([2, 1, 3, 4, 16, 5]);
  });
}
{
  const p = new Par('R', 4, -2, 3);
  Q('s210', mk.short({ marks: 2, stem: r`Reduce $y^2 - 6y - 16x - 23 = 0$ to the form $(y - k)^2 = 4a(x - h)$ and write down the vertex, the focus and the directrix.`, model: r`$y^2 - 6y + 9 = 16x + 32$, so $(y - 3)^2 = 16(x + 2)$. Here $h = -2$, $k = 3$ and $4a = 16$, so $a = 4$. The vertex is $(-2, 3)$, the focus is $(2, 3)$ and the directrix is $x = -6$.`, sol: 'Complete the square in $y$ and factor the right side.', scheme: [['$(y - 3)^2 = 16(x + 2)$', 1], ['Vertex $(-2, 3)$, focus $(2, 3)$, directrix $x = -6$', 1]], d: 3, c: 'application', t: [3], time: 100 }), (C) => {
    p.verify();
    C.assert(p.conic().same(new Conic(0, 0, 1, -16, -6, -23)) && p.focTex() === '(2, 3)' && p.dirTex() === 'x = -6' && p.eqTex() === '(y - 3)^2 = 16(x + 2)', 'y^2 - 6y - 16x - 23 = 0 is (y - 3)^2 = 16(x + 2): vertex (-2, 3), focus (2, 3), directrix x = -6'); C.model([6, 9, 16, 32, 3, 2, 4]);
  });
}
