// ISC 11 Mathematics ch13 Conic Sections: Introduction and Parabola - multiple-choice and assertion-reason items.
// Every key is recomputed from the givens (exact rationals, point tests, the focus-directrix conic builder); every distractor comes from
// its own wrong method and is asserted to be wrong.
import { Q, mk } from './lib.mjs';
import { Conic, Par, fr, sqrtF, pt, range, focusConic, ps2, pl2, e2At, coneSection, coneSectionByForm } from './conic.mjs';

const r = String.raw;
const M = (id, o, check) => Q(id, mk.mcq({ key: 'a', ...o }), check);
const T = (x) => `$${x}$`;
const same = (C, texts, key) => C.which(texts, key);
const nm = (c) => ({ circle: 'a circle', ellipse: 'an ellipse', parabola: 'a parabola', hyperbola: 'a hyperbola', point: 'a single point', line: 'one straight line', 'pair of lines': 'a pair of intersecting straight lines' }[c]);
const distinct = (o) => new Set(o).size === o.length;
/** Integer points of a conic in a box. */
const lattice = (c, lim = 40) => range(-lim, lim).flatMap((x) => range(-lim, lim).filter((y) => c.on([x, y])).map((y) => [x, y]));

// ============================================================ MCQ
{
  const alphas = range(20, 70).filter((a) => coneSection(a, a) === 'parabola' && coneSectionByForm(a, a) === 'parabola');
  const o = ['a parabola', 'an ellipse', 'a hyperbola', 'a circle'];
  M('m01', { stem: r`A plane parallel to a generator of a double cone, and not passing through the vertex, cuts the cone in`, opts: o, sol: r`When the plane makes the same angle with the axis as a generator does ($\beta = \alpha$), the section is a parabola. A larger angle gives an ellipse (a circle at $90^\circ$), and a smaller angle gives a hyperbola.`, d: 1, c: 'recall', t: [1], time: 35 }, (C) => {
    C.assert(alphas.length === 51 && distinct(o), 'beta = alpha gives a parabola for every semi-vertical angle from 20 to 70 degrees (two routes)'); same(C, o, nm(coneSection(33, 33)));
  });
}
{
  const bs = [15, 28, 44, 90], hits = bs.filter((b) => coneSection(28, b) === 'hyperbola' && coneSectionByForm(28, b) === 'hyperbola');
  M('m02', { stem: r`A double cone has semi-vertical angle $28^\circ$. A plane that misses the vertex makes an angle $\beta$ with the axis. The section is a hyperbola when $\beta$ equals`, opts: bs.map((b) => T(`${b}^\\circ`)), sol: r`A hyperbola needs $\beta < \alpha = 28^\circ$, and only $15^\circ$ is smaller. At $28^\circ$ the section is a parabola, $44^\circ$ gives an ellipse and $90^\circ$ a circle.`, d: 2, c: 'understanding', t: [1], time: 55 }, (C) => {
    C.assert(hits.join() === '15' && coneSection(28, 28) === 'parabola' && coneSection(28, 44) === 'ellipse' && coneSection(28, 90) === 'circle', 'only 15 degrees (below 28) gives a hyperbola; 28 a parabola, 44 an ellipse, 90 a circle'); same(C, bs, hits[0]);
  });
}
{
  const o = ['a pair of intersecting straight lines', 'a single point', 'one straight line', 'a hyperbola'], got = coneSection(47, 20, true);
  M('m03', { stem: r`A plane through the vertex of a double cone of semi-vertical angle $47^\circ$ makes an angle of $20^\circ$ with the axis. It meets the cone in`, opts: o, sol: r`The angle $20^\circ$ is less than $\alpha = 47^\circ$, so the plane cuts both nappes through the vertex and the section is a pair of intersecting straight lines. A single point needs $\beta > \alpha$ and one line needs $\beta = \alpha$; a hyperbola arises only when the plane misses the vertex.`, d: 2, c: 'understanding', t: [1], time: 55 }, (C) => {
    C.assert(got === 'pair of lines' && coneSectionByForm(47, 20, true) === 'pair of lines' && coneSection(47, 60, true) === 'point' && coneSection(47, 47, true) === 'line', 'beta < alpha through the vertex: a pair of lines (beta > alpha: a point; beta = alpha: one line)'); same(C, o, nm(got));
  });
}
{
  const S = [2, 3], ln = [1, 0, 1], c = focusConic(S, ln, fr(25, 16)), o = ['a hyperbola', 'a circle', 'an ellipse', 'a parabola'], pts = lattice(c);
  M('m04', { stem: r`A point moves so that its distance from the point $(2, 3)$ is always $\dfrac{5}{4}$ times its distance from the line $x = -1$. The path of the point is`, opts: o, sol: r`The ratio of the distance from the focus to the distance from the directrix is $e = \dfrac{5}{4} > 1$, so the path is a hyperbola. A ratio below $1$ would give an ellipse and a ratio of exactly $1$ a parabola; a circle has no directrix.`, d: 2, c: 'understanding', t: [1], time: 55 }, (C) => {
    C.assert(c.kind() === 'hyperbola' && pts.length > 0 && pts.every((p) => e2At(S, ln, p).eq(fr(25, 16))), 'e = 5/4 > 1: the conic from PS^2 = e^2 PL^2 is a hyperbola (B^2 - 4AC > 0), and its lattice points have PS/PL = 5/4'); same(C, o, nm(c.kind()));
  });
}
{
  const e = fr(2, 3), p = 6, c = focusConic([0, 0], [1, 0, -p], e.mul(e)), ys = range(-30, 30).filter((y) => c.on([0, y]));
  const o = ['8', '4', '18', '9'];
  M('m05', { stem: r`A conic has a focus $S$ and a directrix at a distance of $6$ units from $S$, and its eccentricity is $\dfrac{2}{3}$. The length of its latus rectum is`, opts: o.map(T), sol: r`The latus rectum has length $2ep = 2 \times \dfrac{2}{3} \times 6 = 8$. The value $4$ is half of it, $ep$; $18$ is $\dfrac{2p}{e}$, with $e$ inverted; and $9$ is $\dfrac{p}{e}$.`, d: 3, c: 'understanding', t: [1], time: 75 }, (C) => {
    C.assert(e.mul(p).mul(2).eq(8) && ys.length === 2 && ys[1] - ys[0] === 8 && ys.every((y) => e2At([0, 0], [1, 0, -p], [0, y]).eq(fr(4, 9))) && fr(2 * p).div(e).eq(18) && fr(p).div(e).eq(9), 'chord through the focus perpendicular to the axis: ends (0, -4), (0, 4), length 8 = 2ep'); C.opt(8);
  });
}
{
  const S = [2, 0], ln = [1, 0, -8], key = focusConic(S, ln, fr(1, 4));
  const w1 = Conic.fromFocus(S, ln, fr(1, 2)), w2 = Conic.fromFocus([-2, 0], ln, fr(1, 4)), w3 = Conic.fromFocus(S, ln, fr(4));
  const o = [key, w1, w2, w3].map((c) => T(c.tex()));
  M('m06', { stem: r`The conic with focus $(2, 0)$, directrix $x = 8$ and eccentricity $\dfrac{1}{2}$ has the equation`, opts: o, sol: r`$PS^2 = e^2 PL^2$ gives $(x - 2)^2 + y^2 = \dfrac{1}{4}(x - 8)^2$, so $4x^2 - 16x + 16 + 4y^2 = x^2 - 16x + 64$, that is $3x^2 + 4y^2 - 48 = 0$. The equation $${w1.tex()}$ uses $e$ instead of $e^2$; $${w2.tex()}$ puts the focus at $(-2, 0)$; and $${w3.tex()}$ uses $e^2 = 4$, the inverted ratio.`, d: 3, c: 'application', t: [1], time: 100 }, (C) => {
    C.assert(key.tex() === '3x^2 + 4y^2 - 48 = 0' && key.on([4, 0]) && key.on([-4, 0]) && e2At(S, ln, [4, 0]).eq(fr(1, 4)) && e2At(S, ln, [-4, 0]).eq(fr(1, 4)) && distinct(o) && [w1, w2, w3].every((w) => !w.on([4, 0]) && !w.same(key)), '3x^2 + 4y^2 - 48 = 0 passes through (4, 0) and (-4, 0) with PS^2 / PL^2 = 1/4; the three wrong equations miss (4, 0)'); same(C, o, o[0]);
  });
}
{
  const S = [0, 0], ln = [1, 1, -4], key = focusConic(S, ln, fr(1, 2));
  const w1 = Conic.fromFocus(S, ln, fr(1, 2), 1), w2 = Conic.fromFocus(S, [1, 1, 4], fr(1, 2)), w3 = Conic.fromFocus(S, ln, fr(2));
  const o = [key, w1, w2, w3].map((c) => T(c.tex()));
  M('m07', { stem: r`A conic has its focus at the origin, the line $x + y = 4$ as directrix, and eccentricity $\dfrac{1}{\sqrt{2}}$. Its equation is`, opts: o, sol: r`$PL^2 = \dfrac{(x + y - 4)^2}{2}$ and $e^2 = \dfrac{1}{2}$, so $x^2 + y^2 = \dfrac{(x + y - 4)^2}{4}$, which gives $3x^2 - 2xy + 3y^2 + 8x + 8y - 16 = 0$. The equation $${w1.tex()}$ forgets to divide by $a^2 + b^2 = 2$; $${w2.tex()}$ takes the directrix as $x + y + 4 = 0$; and $${w3.tex()}$ inverts $e^2$.`, d: 4, c: 'application', t: [1], time: 130 }, (C) => {
    C.assert(key.tex() === '3x^2 - 2xy + 3y^2 + 8x + 8y - 16 = 0' && key.on([0, -4]) && e2At(S, ln, [0, -4]).eq(fr(1, 2)) && key.kind() === 'ellipse' && distinct(o) && [w1, w2, w3].every((w) => !w.on([0, -4]) && !w.same(key)) && w1.tex() === 'x^2 - 2xy + y^2 + 8x + 8y - 16 = 0' && w3.tex() === 'xy - 4x - 4y + 8 = 0', 'the equation passes through (0, -4) where PS^2 = 16 and PL^2 = 32 (ratio 1/2); the wrong equations miss that point'); same(C, o, o[0]);
  });
}
{
  const o = [r`\dfrac{3}{5}`, r`\dfrac{5}{3}`, r`\dfrac{3}{8}`, r`\dfrac{2}{3}`], vals = [0.6, 5 / 3, 3 / 8, 2 / 3];
  M('m08', { stem: r`A point $P$ of a conic is $9$ units from the focus and $15$ units from the directrix. The eccentricity of the conic is`, opts: o.map(T), sol: r`$e = \dfrac{PS}{PL} = \dfrac{9}{15} = \dfrac{3}{5}$, so the conic is an ellipse. The value $\dfrac{5}{3}$ divides the other way, $\dfrac{3}{8}$ is $\dfrac{PS}{PS + PL}$ with $\dfrac{9}{24}$ simplified, and $\dfrac{2}{3}$ is $\dfrac{PL - PS}{PS}$.`, d: 1, c: 'recall', t: [1], time: 40 }, (C) => {
    C.assert(fr(9, 15).eq(fr(3, 5)) && fr(9, 24).eq(fr(3, 8)) && fr(6, 9).eq(fr(2, 3)) && fr(3, 5).lt(1) && distinct(o), 'e = 9/15 = 3/5 < 1 (ellipse); distractors 5/3, 9/24 = 3/8, 6/9 = 2/3'); C.which(vals, 0.6);
  });
}
{
  const p = new Par('L', 9), S = pt(...p.focus), o = [S, pt(9, 0), pt(-18, 0), pt(0, -9)].map(T);
  M('m09', { stem: r`The coordinates of the focus of the parabola $y^2 = -36x$ are`, opts: o, sol: r`Comparing with $y^2 = -4ax$ gives $4a = 36$, so $a = 9$. The parabola opens to the left, so the focus is $(-9, 0)$. The point $(9, 0)$ ignores the sign; $(-18, 0)$ uses $2a$; and $(0, -9)$ swaps the coordinates.`, d: 1, c: 'recall', t: [2], time: 40 }, (C) => {
    p.verify();
    C.assert(p.eqTex() === 'y^2 = -36x' && S === '(-9, 0)' && p.dirTex() === 'x = 9' && distinct(o), 'a = 9, focus (-9, 0) (the parabola re-derived from focus and directrix by PS = PL)'); same(C, o, T(S));
  });
}
{
  const p = new Par('U', fr(7, 2)), o = [p.dirTex(), 'y = \\dfrac{7}{2}', 'y = -7', 'x = -\\dfrac{7}{2}'].map(T);
  M('m10', { stem: r`The line that is the directrix of the parabola $x^2 = 14y$ has the equation`, opts: o, sol: r`$4a = 14$, so $a = \dfrac{7}{2}$. The parabola opens upward, so the directrix lies below the vertex: $y = -\dfrac{7}{2}$. The line $y = \dfrac{7}{2}$ has the wrong sign; $y = -7$ uses $\dfrac{4a}{2}$; and $x = -\dfrac{7}{2}$ has the wrong axis.`, d: 2, c: 'understanding', t: [2], time: 50 }, (C) => {
    p.verify();
    C.assert(p.eqTex() === 'x^2 = 14y' && p.dirTex() === 'y = -\\dfrac{7}{2}' && p.focTex() === '(0, \\dfrac{7}{2})' && distinct(o), 'a = 7/2, directrix y = -7/2'); same(C, o, o[0]);
  });
}
{
  const p = new Par('R', fr(3, 5)), o = [r`\dfrac{12}{5}`, r`\dfrac{3}{5}`, r`\dfrac{6}{5}`, '12'];
  M('m11', { stem: r`A latus rectum of the parabola $5y^2 = 12x$ has length`, opts: o.map(T), sol: r`Write $y^2 = \dfrac{12}{5}x$, so $4a = \dfrac{12}{5}$ and the latus rectum has length $\dfrac{12}{5}$. The value $\dfrac{3}{5}$ is $a$ and $\dfrac{6}{5}$ is $2a$, the half-length; and $12$ reads the coefficient before dividing by $5$.`, d: 3, c: 'understanding', t: [2], time: 80 }, (C) => {
    p.verify();
    const ends = p.lrEnds;
    C.assert(p.lr.eq(fr(12, 5)) && ends.every(([x, y]) => fr(5).mul(y).mul(y).eq(fr(12).mul(x))) && ends[0][1].sub(ends[1][1]).eq(fr(12, 5)) && distinct(o), '5y^2 = 12x has 4a = 12/5; the ends (3/5, +-6/5) satisfy 5y^2 = 12x'); C.which([2.4, 0.6, 1.2, 12], 2.4);
  });
}
{
  const key = new Par('R', 12), o = [key.eqTex(), new Par('L', 12).eqTex(), new Par('R', 3).eqTex(), new Par('U', 12).eqTex()].map(T);
  M('m12', { stem: r`A parabola has its vertex at the origin and the line $x = -12$ as its directrix. Its equation is`, opts: o, sol: r`The directrix $x = -12$ gives $a = 12$, and the focus $(12, 0)$ lies on the positive side, so the parabola opens to the right: $y^2 = 48x$. The equation $y^2 = -48x$ opens the wrong way; $y^2 = 12x$ takes $4a = 12$; and $x^2 = 48y$ has a vertical axis.`, d: 2, c: 'understanding', t: [2], time: 60 }, (C) => {
    key.verify();
    C.assert(key.eqTex() === 'y^2 = 48x' && key.dirTex() === 'x = -12' && new Par('L', 12).dirVal.eq(12) && new Par('R', 3).dirVal.eq(-3) && !new Par('U', 12).horizontal && distinct(o), 'a = 12: y^2 = 48x has directrix x = -12; the wrong forms have other directrices'); same(C, o, o[0]);
  });
}
{
  const key = new Par('D', 8), o = [key.eqTex(), new Par('U', 8).eqTex(), new Par('L', 8).eqTex(), new Par('D', 2).eqTex()].map(T);
  M('m13', { stem: r`A parabola has its vertex at the origin and its axis along the $y$-axis, and it passes through the point $(8, -2)$. Its equation is`, opts: o, sol: r`The point lies below the $x$-axis, so $x^2 = -4ay$. Then $64 = -4a(-2)$ gives $4a = 32$ and $x^2 = -32y$. The equation $x^2 = 32y$ opens upward and misses the point; $y^2 = -32x$ has the wrong axis; and $x^2 = -8y$ takes $4a = 8$, the value of $\dfrac{64}{8}$.`, d: 3, c: 'application', t: [2], time: 80 }, (C) => {
    key.verify();
    C.assert(key.eqTex() === 'x^2 = -32y' && key.on([8, -2]) && ![new Par('U', 8), new Par('L', 8), new Par('D', 2)].some((p) => p.on([8, -2])) && distinct(o), 'x^2 = -32y passes through (8, -2): 64 = 64; the wrong equations do not'); same(C, o, o[0]);
  });
}
{
  const p = new Par('U', 9), q = [24, 16], f = p.focal(q), o = ['25', '7', '34', '24'];
  M('m14', { stem: r`A point $P$ of the parabola $x^2 = 36y$ has ordinate $16$. The distance of $P$ from the focus is`, opts: o.map(T), sol: r`Here $a = 9$ and the focal distance is $y_1 + a = 16 + 9 = 25$. The value $7$ is $y_1 - a$; $34$ uses $y_1 + 2a$; and $24$ is the abscissa of $P$.`, d: 3, c: 'understanding', t: [2], time: 70 }, (C) => {
    p.verify();
    C.assert(p.on(q) && f.eq(25) && p.focus[1].eq(9) && ps2(p.focus, q).eq(625) && fr(16 - 9).eq(7) && fr(16 + 18).eq(34), 'P(24, 16) is on x^2 = 36y; its distance from S(0, 9) is 25 = y + a'); C.opt(25);
  });
}
{
  const p = new Par('R', 5), tx2 = (e) => pt(...e), o = [r`(5, \pm 10)`, r`(5, \pm 5)`, r`(\pm 5, 10)`, r`(10, \pm 5)`];
  M('m15', { stem: r`The ends of the latus rectum of the parabola $y^2 = 20x$ are`, opts: o.map(T), sol: r`$4a = 20$, so $a = 5$ and the focus is $(5, 0)$. Putting $x = 5$ gives $y^2 = 100$, so the ends are $(5, 10)$ and $(5, -10)$. The pair $(5, \pm 5)$ uses $a$ instead of $2a$; $(\pm 5, 10)$ swaps the coordinates; and $(10, \pm 5)$ swaps them with $2a$ and $a$.`, d: 2, c: 'understanding', t: [2], time: 60 }, (C) => {
    p.verify();
    C.assert(p.lrEnds.map(tx2).join() === '(5, 10),(5, -10)' && p.on([5, 10]) && p.on([5, -10]) && ![[5, 5], [-5, 10], [10, 5]].some((q) => p.on(q)) && distinct(o), 'a = 5, ends (5, 10) and (5, -10) are on y^2 = 20x; (5, 5), (-5, 10), (10, 5) are not'); same(C, o, o[0]);
  });
}
{
  const key = new Par('D', fr(4, 3), 0, 12), w = new Par('D', fr(16, 3), 0, 12);
  const h = (p) => fr(12).sub(fr(16).div(p.a.mul(4))), v = [h(key), h(w), fr(6), fr(3)], o = ['9 m', '11.25 m', '6 m', '3 m'];
  M('m16', { stem: r`A road tunnel has a parabolic opening, $16$ m wide at road level and $12$ m high at the middle. Its height at a point $4$ m from the middle line, measured horizontally, is`, opts: o, sol: r`Put the vertex $(0, 12)$ at the top, so $x^2 = -4a(y - 12)$. The road-level point $(8, 0)$ gives $64 = 48a$, so $a = \dfrac{4}{3}$ and $x^2 = -\dfrac{16}{3}(y - 12)$. At $x = 4$: $16 = -\dfrac{16}{3}(y - 12)$, so $y - 12 = -3$ and $y = 9$ m. The height $11.25$ m uses the full width $16$ as the half-width; $6$ m assumes a straight-line roof; and $3$ m is the drop from the top, not the height.`, d: 4, c: 'application', t: [3], time: 130 }, (C) => {
    key.verify();
    C.assert(key.on([8, 0]) && key.on([-8, 0]) && key.on([4, 9]) && h(key).eq(9) && h(w).eq(fr(45, 4)) && w.on([16, 0]) && key.a.eq(fr(4, 3)) && fr(12).sub(12 * 4 / 8).eq(6) && fr(12).sub(9).eq(3) && distinct(o), 'a = 4/3 from (8, 0): the arch passes through (4, 9); the wrong readings give 11.25, 6 and 3'); C.which([9, 11.25, 6, 3], 9);
  });
}
