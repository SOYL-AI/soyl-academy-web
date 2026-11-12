// ISC 11 Mathematics ch13 Conic Sections: Introduction and Parabola - 5-mark long-answer items (set in labelled parts).
import { Q, mk } from './lib.mjs';
import { Conic, Par, fr, sqrtF, pt, range, focusConic, ps2, pl2, e2At } from './conic.mjs';

const r = String.raw;

{
  const S = [-2, 1], ln = [1, 0, -4], e = fr(1, 2), c = focusConic(S, ln, e.mul(e)), ys = range(-30, 30).filter((y) => c.on([-2, y]));
  Q('l01', mk.long({ stem: r`A conic has its focus at $S(-2, 1)$, its directrix at $x = 4$ and eccentricity $\dfrac{1}{2}$.

(a) Find the equation of the conic. [2]

(b) Name the conic, giving the reason. [1]

(c) Find the length of the latus rectum and the coordinates of its ends. [1]

(d) Verify that one end of the latus rectum satisfies $PS = e \cdot PL$. [1]`, model: r`(a) $PS^2 = e^2 PL^2$ gives $(x + 2)^2 + (y - 1)^2 = \dfrac{1}{4}(x - 4)^2$, so $4x^2 + 16x + 16 + 4y^2 - 8y + 4 = x^2 - 8x + 16$, that is $3x^2 + 4y^2 + 24x - 8y + 4 = 0$.

(b) $e = \dfrac{1}{2} < 1$, so the conic is an ellipse.

(c) The distance from the focus to the directrix is $p = 4 - (-2) = 6$, so the latus rectum has length $2ep = 2 \times \dfrac{1}{2} \times 6 = 6$. It lies on $x = -2$, $3$ units each side of the focus: the ends are $(-2, 4)$ and $(-2, -2)$.

(d) For $A(-2, 4)$: $PS = \sqrt{0^2 + 3^2} = 3$ and $PL = 4 - (-2) = 6$, so $PS = 3 = \dfrac{1}{2} \times 6 = e \cdot PL$.`, sol: 'Every later part uses the focus, the directrix and $e$ directly.', scheme: [['(a) $PS^2 = e^2 PL^2$ with $(x + 2)^2 + (y - 1)^2 = \\dfrac{1}{4}(x - 4)^2$', 1], ['(a) $3x^2 + 4y^2 + 24x - 8y + 4 = 0$', 1], ['(b) Ellipse, since $e < 1$', 1], ['(c) Length $6$; ends $(-2, 4)$ and $(-2, -2)$', 1], ['(d) $PS = 3$, $PL = 6$, $PS = e \\cdot PL$', 1]], d: 3, c: 'application', t: [1], time: 330 }), (C) => {
    C.assert(c.tex() === '3x^2 + 4y^2 + 24x - 8y + 4 = 0' && c.kind() === 'ellipse' && ys.join() === '-2,4' && e.mul(6).mul(2).eq(6) && ps2(S, [-2, 4]).eq(9) && pl2(ln, [-2, 4]).eq(36) && e2At(S, ln, [-2, -2]).eq(fr(1, 4)), 'ellipse 3x^2 + 4y^2 + 24x - 8y + 4 = 0; x = -2 meets it at y = -2 and 4 (length 6 = 2ep); PS = 3, PL = 6'); C.model([4, 2, 1, 16, 8, 3, 24, 6]);
  });
}
{
  const S = [0, 0], ln = [1, 1, -2], c = focusConic(S, ln, fr(2));
  Q('l02', mk.long({ stem: r`A conic has its focus at the origin, the line $x + y = 2$ as its directrix, and eccentricity $\sqrt{2}$.

(a) Use $PS^2 = e^2 PL^2$ to find its equation. [2]

(b) Show that the equation can be written as $(x - 2)(y - 2) = 2$, and name the conic. [1]

(c) Show that $P(4, 3)$ lies on the conic and that $PS = \sqrt{2} \cdot PL$ there. [1]

(d) Find the point where the conic meets the $x$-axis. [1]`, model: r`(a) $PS^2 = x^2 + y^2$ and $PL^2 = \dfrac{(x + y - 2)^2}{2}$. With $e^2 = 2$: $x^2 + y^2 = (x + y - 2)^2 = x^2 + y^2 + 4 + 2xy - 4x - 4y$, so $2xy - 4x - 4y + 4 = 0$, that is $xy - 2x - 2y + 2 = 0$.

(b) $(x - 2)(y - 2) = xy - 2x - 2y + 4$, so the equation is $(x - 2)(y - 2) - 2 = 0$, that is $(x - 2)(y - 2) = 2$. Since $e = \sqrt{2} > 1$, the conic is a hyperbola.

(c) $(4 - 2)(3 - 2) = 2$, so $P$ lies on the conic. $PS = \sqrt{16 + 9} = 5$ and $PL = \dfrac{\lvert 4 + 3 - 2 \rvert}{\sqrt{2}} = \dfrac{5}{\sqrt{2}}$, so $PS = \sqrt{2} \times \dfrac{5}{\sqrt{2}} = \sqrt{2} \cdot PL$.

(d) Put $y = 0$: $-2x + 2 = 0$, so $x = 1$. The point is $(1, 0)$.`, sol: 'Keep $e^2 = 2$ rational throughout; no root is needed until part (c).', scheme: [['(a) $x^2 + y^2 = (x + y - 2)^2$', 1], ['(a) $xy - 2x - 2y + 2 = 0$', 1], ['(b) $(x - 2)(y - 2) = 2$; hyperbola since $e > 1$', 1], ['(c) $(4 - 2)(3 - 2) = 2$ and $PS = 5 = \\sqrt{2} \\cdot PL$', 1], ['(d) $(1, 0)$', 1]], d: 4, c: 'application', t: [1], time: 330 }), (C) => {
    C.assert(c.tex() === 'xy - 2x - 2y + 2 = 0' && c.kind() === 'hyperbola' && range(-4, 6).every((x) => range(-4, 6).every((y) => c.val([x, y]).eq(fr((x - 2) * (y - 2) - 2)))) && c.on([4, 3]) && ps2(S, [4, 3]).eq(25) && pl2(ln, [4, 3]).eq(fr(25, 2)) && e2At(S, ln, [4, 3]).eq(2) && c.on([1, 0]) && e2At(S, ln, [1, 0]).eq(2), 'xy - 2x - 2y + 2 = (x - 2)(y - 2) - 2; P(4, 3): PS^2 = 25, PL^2 = 25/2; (1, 0) is on it'); C.model([2, 4, 3, 5, 1]);
  });
}
{
  const p = new Par('U', 2), q = [-12, 18];
  Q('l03', mk.long({ stem: r`A parabola has its vertex at the origin and its axis along the $y$-axis, and it passes through $P(-12, 18)$.

(a) Find the equation of the parabola. [1]

(b) Write down its focus and its directrix. [1]

(c) Find the length of its latus rectum and the coordinates of the ends of the latus rectum. [1]

(d) Find the distance of $P$ from the focus. [1]

(e) Find the points of the parabola that are $10$ units from the focus. [1]`, model: r`(a) $P$ lies above the $x$-axis, so $x^2 = 4ay$. Then $144 = 4a \times 18$ gives $4a = 8$, so $a = 2$ and the equation is $x^2 = 8y$.

(b) The focus is $(0, a) = (0, 2)$ and the directrix is $y = -2$.

(c) The latus rectum has length $4a = 8$. Putting $y = 2$ gives $x^2 = 16$, so the ends are $(4, 2)$ and $(-4, 2)$.

(d) $PS = y_1 + a = 18 + 2 = 20$. Check: $\sqrt{12^2 + 16^2} = \sqrt{400} = 20$.

(e) $y_1 + a = 10$ gives $y_1 = 8$, so $x_1^2 = 8 \times 8 = 64$ and $x_1 = \pm 8$. The points are $(8, 8)$ and $(-8, 8)$.`, sol: 'Find $a$ first; the focal distance of a point of $x^2 = 4ay$ is $y_1 + a$.', scheme: [['(a) $x^2 = 8y$', 1], ['(b) Focus $(0, 2)$, directrix $y = -2$', 1], ['(c) Length $8$, ends $(\\pm 4, 2)$', 1], ['(d) $PS = 20$', 1], ['(e) $(8, 8)$ and $(-8, 8)$', 1]], d: 3, c: 'application', t: [2], time: 330 }), (C) => {
    p.verify();
    const near = range(-40, 40).flatMap((x) => range(-5, 60).filter((y) => p.on([x, y]) && ps2(p.focus, [x, y]).eq(100)).map((y) => [x, y]));
    C.assert(p.eqTex() === 'x^2 = 8y' && p.on(q) && p.focTex() === '(0, 2)' && p.dirTex() === 'y = -2' && p.lr.eq(8) && p.lrEnds.map((e) => pt(...e)).join() === '(4, 2),(-4, 2)' && p.focal(q).eq(20) && near.map((x) => pt(...x)).join() === '(-8, 8),(8, 8)', 'a = 2: x^2 = 8y through (-12, 18); PS = 20; points at distance 10: (+-8, 8)'); C.model([144, 18, 8, 2, 4, 20, 12, 16, 10]);
  });
}
{
  const p = new Par('R', 4), q4 = (t) => p.param(t);
  Q('l04', mk.long({ stem: r`Consider the parabola $y^2 = 16x$ and the point $P(at^2, 2at)$ on it.

(a) Find its focus and directrix. [1]

(b) Show that $P(4t^2, 8t)$ lies on the parabola for every $t$. [1]

(c) Show that the distance $PS$ from the focus is $4(t^2 + 1)$. [1]

(d) Find the points $P$ whose distance from the focus is $20$. [1]

(e) Find the ends of the latus rectum and its length. [1]`, model: r`(a) $4a = 16$, so $a = 4$. The focus is $(4, 0)$ and the directrix is $x = -4$.

(b) $y^2 = (8t)^2 = 64t^2$ and $16x = 16 \times 4t^2 = 64t^2$, so $P$ lies on the parabola.

(c) $PS = x + a = 4t^2 + 4 = 4(t^2 + 1)$.

(d) $4(t^2 + 1) = 20$ gives $t^2 = 4$, so $t = \pm 2$. The points are $(16, 16)$ and $(16, -16)$.

(e) $t = \pm 1$ gives $x = 4$ and $y = \pm 8$, so the ends are $(4, 8)$ and $(4, -8)$ and the length is $4a = 16$.`, sol: 'The parameter $t$ gives the focal distance as $a(t^2 + 1)$ at once.', scheme: [['(a) Focus $(4, 0)$, directrix $x = -4$', 1], ['(b) $64t^2 = 64t^2$', 1], ['(c) $PS = 4(t^2 + 1)$', 1], ['(d) $t = \\pm 2$, points $(16, \\pm 16)$', 1], ['(e) Ends $(4, \\pm 8)$, length $16$', 1]], d: 3, c: 'application', t: [2], time: 330 }), (C) => {
    p.verify();
    C.assert(p.focTex() === '(4, 0)' && p.dirTex() === 'x = -4' && range(-5, 5).every((t) => p.on(q4(t)) && p.focal(q4(t)).eq(fr(4 * (t * t + 1)))) && pt(...q4(2)) === '(16, 16)' && pt(...q4(-2)) === '(16, -16)' && p.focal(q4(2)).eq(20) && pt(...q4(1)) === '(4, 8)' && p.lr.eq(16), 'a = 4: PS = 4(t^2 + 1) for t = -5 .. 5; t = +-2 gives distance 20; t = +-1 gives the latus rectum ends'); C.model([16, 4, 64, 20, 2, 8]);
  });
}
{
  const S = [1, 0], ln = [4, -3, 21], c = focusConic(S, ln, fr(1)), foot = [-3, 3], vx = [fr(-1), fr(3, 2)];
  Q('l05', mk.long({ stem: r`A parabola has its focus at $S(1, 0)$ and the line $4x - 3y + 21 = 0$ as its directrix.

(a) Find the equation of the parabola. [2]

(b) Show that the terms of second degree form a perfect square, $(3x + 4y)^2$, and that $B^2 - 4AC = 0$. [1]

(c) Find the foot $F$ of the perpendicular from $S$ to the directrix. [1]

(d) Find the vertex and verify that it lies on the parabola. [1]`, model: r`(a) $PS^2 = (x - 1)^2 + y^2$ and $PL^2 = \dfrac{(4x - 3y + 21)^2}{25}$. Setting $PS^2 = PL^2$: $25(x - 1)^2 + 25y^2 = (4x - 3y + 21)^2$, so $25x^2 - 50x + 25 + 25y^2 = 16x^2 + 9y^2 + 441 - 24xy + 168x - 126y$. Collecting, $9x^2 + 24xy + 16y^2 - 218x + 126y - 416 = 0$.

(b) The second-degree terms are $9x^2 + 24xy + 16y^2 = (3x + 4y)^2$. Also $B^2 - 4AC = 24^2 - 4 \times 9 \times 16 = 576 - 576 = 0$.

(c) $F = S + t(4, -3)$ lies on the directrix: $4(1 + 4t) - 3(-3t) + 21 = 0$, so $25 + 25t = 0$ and $t = -1$. Then $F = (1 - 4, 3) = (-3, 3)$.

(d) The vertex is the midpoint of $SF$: $\left(\dfrac{1 - 3}{2}, \dfrac{0 + 3}{2}\right) = \left(-1, \dfrac{3}{2}\right)$. Check: $9 + 24(-1)\left(\dfrac{3}{2}\right) + 16 \times \dfrac{9}{4} - 218(-1) + 126 \times \dfrac{3}{2} - 416 = 9 - 36 + 36 + 218 + 189 - 416 = 0$.`, sol: 'The vertex is halfway between the focus and the foot of the perpendicular on the directrix.', scheme: [['(a) $25[(x - 1)^2 + y^2] = (4x - 3y + 21)^2$', 1], ['(a) $9x^2 + 24xy + 16y^2 - 218x + 126y - 416 = 0$', 1], ['(b) $(3x + 4y)^2$ and $B^2 - 4AC = 0$', 1], ['(c) $F = (-3, 3)$', 1], ['(d) Vertex $\\left(-1, \\dfrac{3}{2}\\right)$ with the check', 1]], d: 5, c: 'analysis', t: [3], time: 360 }), (C) => {
    const vTotal = 9 + 24 * -1 * 1.5 + 16 * 2.25 + 218 + 126 * 1.5 - 416;
    C.assert(c.tex() === '9x^2 + 24xy + 16y^2 - 218x + 126y - 416 = 0' && c.disc().isZero() && 24 * 24 - 4 * 9 * 16 === 0 && pl2(ln, S).eq(25) && c.on(vx) && ps2(S, vx).eq(pl2(ln, vx)) && 4 * foot[0] - 3 * foot[1] + 21 === 0 && foot[0] - 1 === -4 && foot[1] - 0 === 3 && Math.abs(vTotal) < 1e-12 && range(-3, 3).every((x) => range(-3, 3).every((y) => c.val([x, y]).eq(fr(25 * ((x - 1) ** 2 + y * y) - (4 * x - 3 * y + 21) ** 2)))), 'parabola 9x^2 + 24xy + 16y^2 - 218x + 126y - 416 = 0; foot (-3, 3); vertex (-1, 3/2) on it with PS = PL'); C.model([25, 4, 3, 21, 9, 24, 16, 218, 126, 416, 576, 441, 168, 50]);
  });
}
{
  const p = new Par('U', fr(3, 2));
  Q('l06', mk.long({ stem: r`The cross-section of a satellite dish is a parabola. The dish is $6$ m across at its open end and $1.5$ m deep. Take the vertex as the origin and the axis of the dish as the $y$-axis.

(a) Find the equation of the parabola. [1]

(b) How far from the vertex is the focus, where the receiver is placed? [1]

(c) Find the length of the latus rectum. [1]

(d) Find the width of the dish at a height of $0.375$ m above the vertex. [1]

(e) Show that the focus is at the same height as the rim of the dish. [1]`, model: r`(a) The rim point is $(3, 1.5)$ and $x^2 = 4ay$, so $9 = 4a \times 1.5 = 6a$. Then $a = \dfrac{3}{2}$ and the equation is $x^2 = 6y$.

(b) The focus is at $(0, a) = (0, 1.5)$, which is $1.5$ m from the vertex.

(c) The latus rectum has length $4a = 6$ m.

(d) At $y = 0.375$: $x^2 = 6 \times 0.375 = 2.25$, so $x = \pm 1.5$ and the width is $3$ m.

(e) The rim is at height $y = 1.5$ m, the depth of the dish, and the focus is at $y = a = 1.5$ m, so they are at the same height.`, sol: 'Use the rim point to find $a$; every other part is read from $x^2 = 4ay$.', scheme: [['(a) $9 = 6a$, so $x^2 = 6y$', 1], ['(b) Focus $(0, 1.5)$, $1.5$ m from the vertex', 1], ['(c) Latus rectum $6$ m', 1], ['(d) Width $3$ m at height $0.375$ m', 1], ['(e) Focus and rim both at height $1.5$ m', 1]], d: 3, c: 'application', t: [3], time: 330 }), (C) => {
    p.verify();
    C.assert(p.eqTex() === 'x^2 = 6y' && p.on([3, fr(3, 2)]) && p.focus[1].eq(fr(3, 2)) && p.lr.eq(6) && p.on([fr(3, 2), fr(3, 8)]) && p.on([fr(-3, 2), fr(3, 8)]) && p.focus[1].eq(fr(3, 2)), 'a = 3/2: x^2 = 6y; rim (3, 1.5); at y = 0.375 the points are (+-1.5, 0.375); focus (0, 1.5)'); C.model([6, 9, 1.5, 0.375, 2.25, 3]);
  });
}
{
  const p = new Par('D', 8, 24, 18);
  Q('l07', mk.long({ stem: r`A football is kicked from the ground and follows a parabolic path with its highest point $18$ m above the ground, at a horizontal distance of $24$ m from the kick. Take the point of the kick as the origin, with $x$ along the ground and $y$ upward.

(a) Find the equation of the path. [2]

(b) Find how far from the kick the ball lands. [1]

(c) Find the height of the ball when it is $8$ m from the kick, measured horizontally. [1]

(d) Find the horizontal distances from the kick at which the height is $16$ m. [1]`, model: r`(a) The vertex is $(24, 18)$ and the path opens downward: $(x - 24)^2 = -4a(y - 18)$. The origin gives $576 = 72a$, so $4a = 32$ and $(x - 24)^2 = -32(y - 18)$.

(b) Put $y = 0$: $(x - 24)^2 = 576$, so $x - 24 = \pm 24$ and $x = 0$ or $x = 48$. The ball lands $48$ m from the kick.

(c) At $x = 8$: $(8 - 24)^2 = 256 = -32(y - 18)$, so $y - 18 = -8$ and $y = 10$ m.

(d) At $y = 16$: $(x - 24)^2 = -32(16 - 18) = 64$, so $x - 24 = \pm 8$ and $x = 16$ or $x = 32$.`, sol: 'Place the vertex at the highest point and use the kick point to find $a$.', scheme: [['(a) $(x - 24)^2 = -4a(y - 18)$', 1], ['(a) $(x - 24)^2 = -32(y - 18)$', 1], ['(b) Lands $48$ m away', 1], ['(c) Height $10$ m at $x = 8$', 1], ['(d) $x = 16$ and $x = 32$', 1]], d: 4, c: 'application', t: [3], time: 330 }), (C) => {
    p.verify();
    C.assert(p.eqTex() === '(x - 24)^2 = -32(y - 18)' && p.on([0, 0]) && p.on([48, 0]) && p.on([8, 10]) && p.on([16, 16]) && p.on([32, 16]) && range(-5, 60).filter((x) => p.on([x, 16])).join() === '16,32' && range(-5, 60).filter((x) => p.on([x, 0])).join() === '0,48', 'a = 8: passes through (0, 0), (48, 0), (8, 10), (16, 16) and (32, 16)'); C.model([24, 18, 576, 72, 32, 48, 8, 256, 10, 16, 64]);
  });
}
