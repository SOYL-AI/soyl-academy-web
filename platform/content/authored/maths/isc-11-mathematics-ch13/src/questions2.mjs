// ISC 11 Mathematics ch13 Conic Sections: Introduction and Parabola - more multiple-choice items (general position, vertex form) and assertion-reason items.
import { Q, mk } from './lib.mjs';
import { Conic, Par, fr, pt, range, focusConic, ps2, pl2, e2At, coneSection, coneSectionByForm } from './conic.mjs';

const r = String.raw;
const M = (id, o, check) => Q(id, mk.mcq({ key: 'a', ...o }), check);
const T = (x) => `$${x}$`;
const same = (C, texts, key) => C.which(texts, key);
const distinct = (o) => new Set(o).size === o.length;
const lattice = (c, lim = 40) => range(-lim, lim).flatMap((x) => range(-lim, lim).filter((y) => c.on([x, y])).map((y) => [x, y]));

{
  const S = [0, 0], ln = [1, 1, 2], key = focusConic(S, ln, fr(1));
  const w1 = Conic.fromFocus(S, ln, fr(1), 1), w2 = Conic.fromFocus(S, [1, 1, -2], fr(1)), w3 = Conic.fromFocus(S, [1, -1, 2], fr(1));
  const o = [key, w1, w2, w3].map((c) => T(c.tex()));
  M('m17', { stem: r`The parabola whose focus is the origin and whose directrix is the line $x + y + 2 = 0$ has the equation`, opts: o, sol: r`$PS^2 = PL^2$ with $PL^2 = \dfrac{(x + y + 2)^2}{2}$ gives $2(x^2 + y^2) = (x + y + 2)^2$, that is $x^2 - 2xy + y^2 - 4x - 4y - 4 = 0$. The equation $${w1.tex()}$ forgets to divide by $a^2 + b^2 = 2$; $${w2.tex()}$ takes the directrix as $x + y - 2 = 0$; and $${w3.tex()}$ takes it as $x - y + 2 = 0$.`, d: 4, c: 'application', t: [3], time: 130 }, (C) => {
    const q0 = lattice(key, 30).find((q) => [w1, w2, w3].every((w) => !w.on(q)));
    C.assert(key.tex() === 'x^2 - 2xy + y^2 - 4x - 4y - 4 = 0' && q0 && key.on(q0) && e2At(S, ln, q0).eq(1) && key.disc().isZero() && distinct(o) && [w1, w2, w3].every((w) => !w.on(q0) && !w.same(key)), 'the parabola passes through a lattice point q0 with PS^2 = PL^2 that none of the wrong equations passes through'); same(C, o, o[0]);
  });
}
{
  const key = new Par('U', 3, -2, 3), w = [new Par('U', 3, 2, -3), new Par('U', fr(3, 2), -2, 3), new Par('R', 3, -2, 3)];
  const o = [key, ...w].map((p) => T(p.eqTex()));
  M('m18', { stem: r`A parabola has its vertex at $(-2, 3)$ and its focus at $(-2, 6)$. Its equation is`, opts: o, sol: r`The axis is the vertical line $x = -2$ and $a = 6 - 3 = 3$, with the focus above the vertex, so $(x + 2)^2 = 12(y - 3)$. The equation $(x - 2)^2 = 12(y + 3)$ has the vertex $(2, -3)$; $(x + 2)^2 = 6(y - 3)$ takes $4a = 6$; and $(y - 3)^2 = 12(x + 2)$ has a horizontal axis.`, d: 3, c: 'understanding', t: [3], time: 80 }, (C) => {
    key.verify();
    C.assert(key.eqTex() === '(x + 2)^2 = 12(y - 3)' && key.focTex() === '(-2, 6)' && w.every((p) => p.focTex() !== '(-2, 6)') && distinct(o), 'a = 3: (x + 2)^2 = 12(y - 3) has focus (-2, 6); the wrong equations have other foci'); same(C, o, o[0]);
  });
}
{
  const p = new Par('R', 2, -3, 1), o = [p.focTex(), new Par('L', 2, -3, 1).focTex(), new Par('U', 2, -3, 1).focTex(), pt(1, -1)].map(T);
  M('m19', { stem: r`The focus of the parabola $(y - 1)^2 = 8(x + 3)$ is`, opts: o, sol: r`The vertex is $(-3, 1)$ and $4a = 8$, so $a = 2$. The parabola opens to the right, so the focus is $(-3 + 2, 1) = (-1, 1)$. The point $(-5, 1)$ is $a$ to the left of the vertex, on the directrix side; $(-3, 3)$ measures $a$ along the wrong axis; and $(1, -1)$ reverses both signs of the answer.`, d: 2, c: 'understanding', t: [3], time: 60 }, (C) => {
    p.verify();
    C.assert(p.eqTex() === '(y - 1)^2 = 8(x + 3)' && p.focTex() === '(-1, 1)' && p.dirTex() === 'x = -5' && distinct(o), 'vertex (-3, 1), a = 2, focus (-1, 1) (re-derived from focus and directrix by PS = PL)'); same(C, o, o[0]);
  });
}
{
  const p = new Par('U', 2, 3, 2), c = new Conic(1, 0, 0, -6, -8, 25), o = [p.focTex(), pt(-3, 4), pt(3, 6), pt(3, 2)].map(T);
  M('m20', { stem: r`Complete the square on $x^2 - 6x - 8y + 25 = 0$; the focus of this parabola is`, opts: o, sol: r`Complete the square: $(x - 3)^2 = 8y - 16 = 8(y - 2)$. The vertex is $(3, 2)$ and $4a = 8$, so $a = 2$; the parabola opens upward and the focus is $(3, 4)$. The point $(-3, 4)$ changes the sign of $h$; $(3, 6)$ takes $a = 4$; and $(3, 2)$ is the vertex.`, d: 3, c: 'application', t: [3], time: 100 }, (C) => {
    p.verify();
    C.assert(p.conic().same(c) && p.focTex() === '(3, 4)' && p.eqTex() === '(x - 3)^2 = 8(y - 2)' && c.disc().isZero() && distinct(o), 'x^2 - 6x - 8y + 25 = 0 equals (x - 3)^2 = 8(y - 2): vertex (3, 2), a = 2, focus (3, 4)'); same(C, o, o[0]);
  });
}

// ============================================================ assertion-reason
Q('ar1', mk.ar({ a: r`A plane through the vertex of a double cone of semi-vertical angle $30^\circ$ makes an angle of $45^\circ$ with the axis, and it meets the cone in a single point.`, r: r`A plane through the vertex that makes an angle with the axis greater than the semi-vertical angle meets the cone only at the vertex.`, key: 'a', sol: r`Here $\beta = 45^\circ > \alpha = 30^\circ$, so the plane touches the cone only at the vertex and A is true. R states exactly this rule, so R is true and it explains A.`, d: 2, c: 'understanding', t: [1] }), (C) => {
  C.assert(coneSection(30, 45, true) === 'point' && coneSectionByForm(30, 45, true) === 'point' && coneSection(30, 30, true) === 'line' && coneSection(30, 20, true) === 'pair of lines', 'beta = 45 > alpha = 30: a point; beta = 30 would give a line, beta = 20 a pair of lines'); C.key('a');
});
Q('ar2', mk.ar({ a: r`The conic with focus $(0, 0)$, directrix $x = 4$ and eccentricity $\dfrac{3}{4}$ has a latus rectum of length $6$.`, r: r`A conic whose eccentricity is $\dfrac{3}{4}$ is an ellipse.`, key: 'b', sol: r`The latus rectum is $2ep = 2 \times \dfrac{3}{4} \times 4 = 6$, so A is true. R is also true, since $e < 1$ gives an ellipse, but the type of the conic does not produce the number $6$: that comes from $2ep$. So R does not explain A.`, d: 3, c: 'analysis', t: [1] }), (C) => {
  const e = fr(3, 4), c = focusConic([0, 0], [1, 0, -4], e.mul(e)), ys = range(-30, 30).filter((y) => c.on([0, y]));
  C.assert(e.mul(4).mul(2).eq(6) && ys.length === 2 && ys[1] - ys[0] === 6 && c.kind() === 'ellipse', 'latus rectum ends (0, -3) and (0, 3): length 6 = 2ep; the conic is an ellipse (e < 1)'); C.key('b');
});
Q('ar3', mk.ar({ a: r`The latus rectum of the parabola $y^2 = 20x$ has length $20$.`, r: r`The latus rectum of the parabola $y^2 = 4ax$ has length $2a$.`, key: 'c', sol: r`For $y^2 = 4ax$ the chord $x = a$ gives $y = \pm 2a$, so the latus rectum has length $4a$, which is $20$ here: A is true. R says $2a$, which is only half the length, so R is false.`, d: 2, c: 'understanding', t: [2] }), (C) => {
  const p = new Par('R', 5), ends = p.lrEnds;
  p.verify();
  C.assert(p.lr.eq(20) && ends[0][1].sub(ends[1][1]).eq(20) && !p.lr.eq(p.a.mul(2)) && p.a.mul(2).eq(10), 'a = 5: the ends (5, 10) and (5, -10) are 20 apart, which is 4a, not 2a = 10'); C.key('c');
});
Q('ar4', mk.ar({ a: r`The parabola $x^2 = -8y$ opens upward.`, r: r`The axis of the parabola $x^2 = 4ay$ is the $y$-axis.`, key: 'd', sol: r`Here $4a = -8$, so $a = -2$ and the focus is $(0, -2)$, below the vertex; for every point $x^2 \ge 0$ forces $y \le 0$, so the parabola opens downward and A is false. R is true: in $x^2 = 4ay$ the squared variable is $x$ and the axis is the $y$-axis.`, d: 2, c: 'understanding', t: [2] }), (C) => {
  const p = new Par('D', 2);
  p.verify();
  C.assert(p.eqTex() === 'x^2 = -8y' && p.focTex() === '(0, -2)' && p.on([4, -2]) && !p.on([4, 2]) && !p.horizontal && range(-12, 12).every((x) => range(-12, 12).every((y) => !p.on([x, y]) || y <= 0)), 'every lattice point of x^2 = -8y has y <= 0 (opens downward); the axis is vertical'); C.key('d');
});
Q('ar5', mk.ar({ a: r`The point $(3, 2)$ lies on the parabola whose focus is $(2, 1)$ and whose directrix is the line $x - y + 1 = 0$.`, r: r`Every point of a parabola is at equal distances from its focus and from its directrix.`, key: 'a', sol: r`From $(3, 2)$ to the focus: $PS^2 = 1^2 + 1^2 = 2$. From $(3, 2)$ to the line: $PL^2 = \dfrac{(3 - 2 + 1)^2}{2} = 2$. So $PS = PL$ and A is true. R is the defining property, and it is the test used to show A, so R explains A.`, d: 3, c: 'application', t: [3] }), (C) => {
  const c = focusConic([2, 1], [1, -1, 1], fr(1));
  C.assert(ps2([2, 1], [3, 2]).eq(2) && pl2([1, -1, 1], [3, 2]).eq(2) && c.on([3, 2]) && c.disc().isZero(), 'PS^2 = 2 = PL^2 at (3, 2); the parabola x^2 + 2xy + y^2 - 10x - 2y + 9 = 0 passes through it'); C.key('a');
});
Q('ar6', mk.ar({ a: r`The parabola $x^2 - 4x - 8y + 12 = 0$ has its vertex at $(2, 1)$.`, r: r`The vertex of the parabola $(x - h)^2 = 4a(y - k)$ is the point $(k, h)$.`, key: 'c', sol: r`Completing the square gives $(x - 2)^2 = 8y - 8 = 8(y - 1)$, so $h = 2$, $k = 1$ and the vertex is $(2, 1)$: A is true. In the form $(x - h)^2 = 4a(y - k)$ the vertex is $(h, k)$, not $(k, h)$, so R is false.`, d: 3, c: 'analysis', t: [3] }), (C) => {
  const p = new Par('U', 2, 2, 1), c = new Conic(1, 0, 0, -4, -8, 12);
  p.verify();
  C.assert(p.conic().same(c) && p.on([2, 1]) && !p.on([1, 2]) && p.eqTex() === '(x - 2)^2 = 8(y - 1)', 'x^2 - 4x - 8y + 12 = 0 is (x - 2)^2 = 8(y - 1): (2, 1) is on it, (1, 2) is not'); C.key('c');
});
