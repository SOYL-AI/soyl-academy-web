// ISC 11 Mathematics ch12 Circles - extra routine practice items (recall and direct-formula questions).
import { Q, mk } from './lib.mjs';
import { Circle, fr, relPos } from './circ.mjs';

const r = String.raw;
const T = (x) => `$${x}$`;

{
  const c = Circle.general(-10, 4, 3), o = ['(5, -2)', '(-5, 2)', '(10, -4)', '(-10, 4)'].map(T);
  Q('m21', mk.mcq({ key: 'a', stem: r`Which point is the centre of the circle $x^2 + y^2 - 10x + 4y + 3 = 0$?`, opts: o, sol: r`Here $2g = -10$ and $2f = 4$, so $g = -5$ and $f = 2$. The centre is $(-g, -f) = (5, -2)$. The point $(-5, 2)$ is $(g, f)$, and $(10, -4)$ and $(-10, 4)$ use the full coefficients $2g$ and $2f$.`, d: 1, c: 'understanding', t: [1], time: 40 }), (C) => {
    C.assert(c.cen() === '(5, -2)' && c.r2.eq(26) && c.on([10, -3]) && c.on([0, -3]), 'centre (5, -2), r^2 = 26; (10, -3) and (0, -3) are on the circle'); C.which(['(5, -2)', '(-5, 2)', '(10, -4)', '(-10, 4)'], '(5, -2)');
  });
}
Q('tf6', mk.tf({ stem: r`The centre of the circle $x^2 + y^2 - 6x + 10y + 9 = 0$ is the point $(3, -5)$.`, key: 't', sol: r`Here $2g = -6$ and $2f = 10$, so $g = -3$ and $f = 5$, and the centre $(-g, -f)$ is $(3, -5)$.`, d: 1, c: 'understanding', t: [1], time: 35 }), (C) => {
  const c = Circle.general(-6, 10, 9);
  C.assert(c.cen() === '(3, -5)' && c.r2.eq(25) && c.on([3, 0]) && c.on([-1, -2]), 'centre (3, -5), radius 5'); C.key('t');
});
Q('tf7', mk.tf({ stem: r`The equation $2x^2 + 3y^2 - 6x + 4y - 1 = 0$ represents a circle.`, key: 'f', sol: r`The coefficients of $x^2$ and $y^2$ are different. In a circle both are equal (so that the equation can be divided to give $x^2 + y^2 + \cdots$), so this equation is not a circle; it represents an ellipse.`, d: 2, c: 'understanding', t: [1], time: 40 }), (C) => {
  const f = (x, y) => 2 * x * x + 3 * y * y - 6 * x + 4 * y - 1;
  // completing squares: 2(x - 3/2)^2 + 3(y + 2/3)^2 = 41/6, so the half-axes squared are 41/12 and 41/18 (different)
  const rhs = fr(1).add(fr(2).mul(fr(9, 4))).add(fr(3).mul(fr(4, 9))), a2 = rhs.div(2), b2 = rhs.div(3);
  C.assert(rhs.eq(fr(41, 6)) && !a2.eq(b2) && Math.abs(f(1.5 + Math.sqrt(a2.num()), -2 / 3)) < 1e-9 && Math.abs(f(1.5, -2 / 3 + Math.sqrt(b2.num()))) < 1e-9, 'unequal coefficients: the half-axes squared are 41/12 and 41/18, so the curve is not a circle (an ellipse)'); C.key('f');
});
Q('tf8', mk.tf({ stem: r`The circle $(x - 4)^2 + (y + 3)^2 = 16$ touches the $y$-axis.`, key: 't', sol: r`The centre is $(4, -3)$, so its distance from the $y$-axis is $4$, which equals the radius $\sqrt{16} = 4$. Equivalently $x = 0$ gives $(y + 3)^2 = 0$, a repeated root.`, d: 2, c: 'understanding', t: [1], time: 40 }), (C) => {
  const c = new Circle(4, -3, 16);
  C.assert(c.h.abs().eq(c.rad) && c.yCut().disc.isZero() && c.yCut().roots.map(String).join() === '-3,-3', 'x = 0 gives the repeated root y = -3'); C.key('t');
});
Q('fb6', mk.fill({ stem: r`A circle has centre $(-2, 5)$ and radius $3$. Its equation is $(x + 2)^2 + (y - 5)^2 = $ ____.`, acc: [['9']], sol: r`The right side is $r^2 = 3^2 = 9$.`, d: 1, c: 'recall', t: [1], time: 30 }), (C) => {
  const c = new Circle(-2, 5, 9);
  C.assert(c.rad.eq(3) && c.on([1, 5]) && c.on([-2, 8]), 'r^2 = 9: (1, 5) and (-2, 8) are on the circle'); C.blank(9);
});
Q('fb7', mk.fill({ stem: r`Two circles of radii $3$ and $4$ touch each other externally. The distance between their centres is ____ units.`, acc: [['7']], sol: r`For external contact $d = r_1 + r_2 = 3 + 4 = 7$.`, d: 1, c: 'recall', t: [3], time: 30 }), (C) => {
  const a = new Circle(0, 0, 9), b = new Circle(7, 0, 16), c = new Circle(1, 0, 16);
  C.assert(relPos(a, b) === 'external' && relPos(a, c) === 'internal', 'd = 7 gives external contact (d = 1 would be internal)'); C.blank(7);
});
Q('n7', mk.num({ stem: r`Find the radius of the circle $x^2 + y^2 - 2x + 4y - 4 = 0$.`, value: 3, unit: null, sol: r`$g = -1$, $f = 2$, $c = -4$, so $r = \sqrt{1 + 4 + 4} = 3$.`, scheme: [['$r = \\sqrt{g^2 + f^2 - c}$ with $g = -1$, $f = 2$, $c = -4$', 1]], marks: 1, d: 1, c: 'understanding', t: [1], time: 45 }), (C) => {
  const c = Circle.general(-2, 4, -4);
  C.assert(c.rad.eq(3) && c.cen() === '(1, -2)' && c.on([4, -2]) && c.on([1, 1]), 'radius 3, centre (1, -2)'); C.val(3);
});
Q('n8', mk.num({ stem: r`Find the radius of the circle with centre $(-4, 3)$ that passes through the origin.`, value: 5, unit: null, sol: r`The radius is the distance from the centre to the origin: $\sqrt{4^2 + 3^2} = \sqrt{25} = 5$.`, scheme: [['$r = \\sqrt{(-4)^2 + 3^2}$', 1]], marks: 1, d: 1, c: 'understanding', t: [1], time: 45 }), (C) => {
  const c = Circle.centreThrough([-4, 3], [0, 0]);
  C.assert(c.rad.eq(5) && c.on([0, 0]) && c.on([-4, 8]) && c.F.isZero(), 'radius 5, through the origin'); C.val(5);
});
