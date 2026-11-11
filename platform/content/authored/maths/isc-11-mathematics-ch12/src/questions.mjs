// ISC 11 Mathematics ch12 Circles - multiple-choice and assertion-reason items.
// Every key is recomputed from the givens (exact rationals, point tests); every distractor comes from its own wrong method and is asserted to be wrong.
import { Q, mk } from './lib.mjs';
import { Circle, fr, genTex, sqTex, pt, solve2, relPos, contact, d2, P, range } from './circ.mjs';

const r = String.raw;
const M = (id, o, check) => Q(id, mk.mcq({ key: 'a', ...o }), check);
const T = (x) => `$${x}$`;
const CR = (h, k, rt) => `centre ${T(pt(h, k))}, radius ${T(rt)}`;
const same = (C, texts, key) => C.which(texts, key);

// ============================================================ MCQ
{
  const c = new Circle(-5, 2, 49);
  const o = [CR(-5, 2, '7'), CR(5, -2, '7'), CR(-5, 2, '49'), CR(5, -2, '49')];
  M('m01', { stem: r`The circle $(x + 5)^2 + (y - 2)^2 = 49$ has`, opts: o, sol: r`Comparing with $(x - h)^2 + (y - k)^2 = r^2$ gives $h = -5$, $k = 2$ and $r^2 = 49$, so $r = 7$. The centre $(5, -2)$ changes both signs the wrong way; the radius $49$ forgets to take the square root.`, d: 1, c: 'understanding', t: [1], time: 40 }, (C) => {
    C.assert(c.cen() === '(-5, 2)' && c.rad.eq(7) && c.on([-5, 9]) && c.on([2, 2]) && new Set(o).size === 4, 'centre (-5, 2) and radius 7, checked by two points on the circle'); same(C, o, o[0]);
  });
}
{
  const c = new Circle(3, -4, 16), eq = (x) => T(new Circle(3, -4, x).std());
  const o = [eq(16), eq(9), eq(4), eq(25)];
  M('m02', { stem: r`A circle with centre $(3, -4)$ touches the $x$-axis. Its equation is`, opts: o, sol: r`The distance from the centre to the $x$-axis is $\lvert -4 \rvert = 4$, so $r = 4$ and $r^2 = 16$: $(x - 3)^2 + (y + 4)^2 = 16$. The value $9$ is $h^2$, the radius for a circle touching the $y$-axis; $4$ is $r$ left unsquared; $25$ is $h^2 + k^2$, the squared distance to the origin.`, d: 2, c: 'understanding', t: [1], time: 55 }, (C) => {
    C.assert(c.k.abs().eq(c.rad) && new Circle(3, -4, 16).xCut().disc.isZero() && new Circle(3, -4, 9).xCut().disc.sign() < 0 && new Circle(3, -4, 25).xCut().disc.sign() > 0, 'only r^2 = 16 touches the x-axis (the discriminant of y = 0 is zero)'); same(C, o, o[0]);
  });
}
{
  const c = Circle.general(-12, 6, 20), o = [CR(6, -3, '5'), CR(-6, 3, '5'), CR(6, -3, sqTex(65)), CR(12, -6, sqTex(144 + 36 - 20))];
  M('m03', { stem: r`The centre and radius of the circle $x^2 + y^2 - 12x + 6y + 20 = 0$ are`, opts: o, sol: r`Here $g = -6$, $f = 3$, $c = 20$. The centre is $(-g, -f) = (6, -3)$ and $r = \sqrt{36 + 9 - 20} = 5$. The centre $(-6, 3)$ is $(g, f)$; $\sqrt{65}$ uses $g^2 + f^2 + c$; and $(12, -6)$ uses the coefficients $2g$ and $2f$ as the centre.`, d: 2, c: 'understanding', t: [1], time: 70 }, (C) => {
    C.assert(c.cen() === '(6, -3)' && c.rad.eq(5) && c.on([11, -3]) && c.on([6, 2]) && new Set(o).size === 4, 'centre (6, -3), radius 5; points (11, -3) and (6, 2) lie on the circle'); same(C, o, o[0]);
  });
}
{
  const k = range(-100, 100).filter((kk) => 16 + 25 - kk === 36), v = k[0];
  const o = [5, -5, 77, 41].map(String);
  M('m04', { stem: r`The circle $x^2 + y^2 + 8x - 10y + k = 0$ has radius $6$. The value of $k$ is`, opts: o.map(T), sol: r`$g = 4$, $f = -5$, so $r^2 = 16 + 25 - k = 36$ and $k = 5$. The value $-5$ writes $36 - 41$; $77$ adds, $41 + 36$; and $41$ is $g^2 + f^2$ alone.`, d: 3, c: 'application', t: [1], time: 80 }, (C) => {
    const c = Circle.general(8, -10, 5);
    C.assert(k.join() === '5' && c.rad.eq(6) && c.cen() === '(-4, 5)' && new Set(o).size === 4, 'k = 5 gives radius 6 (search over -100..100 gives only 5)'); C.which([5, -5, 77, 41], v);
  });
}
{
  const c = Circle.diameter([-6, 3], [2, -5]);
  const dg = (D, E, F) => T(genTex(D, E, F)), x1 = -6, x2 = 2, y1 = 3, y2 = -5;
  const D = -(x1 + x2), E = -(y1 + y2), F = x1 * x2 + y1 * y2;
  const o = [dg(D, E, F), dg(-D, -E, F), dg(D, E, -F), dg(D, E, x1 * x2 - y1 * y2)];
  M('m05', { stem: r`The points $(-6, 3)$ and $(2, -5)$ are the ends of a diameter of a circle. The equation of the circle is`, opts: o, sol: r`$(x + 6)(x - 2) + (y - 3)(y + 5) = 0$ gives $x^2 + 4x - 12 + y^2 + 2y - 15 = 0$, that is $x^2 + y^2 + 4x + 2y - 27 = 0$. The equation with $-4x - 2y$ has the signs of the sums reversed; the one with $+27$ changes the constant; the one with $+3$ subtracts $-15$ instead of adding it.`, d: 3, c: 'application', t: [1], time: 100 }, (C) => {
    C.assert(c.gen() === 'x^2 + y^2 + 4x + 2y - 27 = 0' && D === 4 && E === 2 && F === -27 && c.on([-6, 3]) && c.on([2, -5]) && c.cen() === '(-2, -1)' && new Set(o).size === 4, 'diameter form gives x^2 + y^2 + 4x + 2y - 27 = 0; both ends satisfy it, centre (-2, -1)'); same(C, o, o[0]);
  });
}
{
  const c = new Circle(0, -2, 49), eq = (h, k, rr) => T(new Circle(h, k, rr).std());
  const o = [eq(0, -2, 49), eq(0, 2, 49), eq(0, -2, 7), eq(7, -2, 49)];
  M('m06', { stem: r`A point moves so that $x = 7\cos\theta$ and $y = 7\sin\theta - 2$, where $\theta$ takes every real value. The point traces the curve`, opts: o, sol: r`Write $\cos\theta = \dfrac{x}{7}$ and $\sin\theta = \dfrac{y + 2}{7}$. Since $\cos^2\theta + \sin^2\theta = 1$, $x^2 + (y + 2)^2 = 49$. The centre is $(0, -2)$, not $(0, 2)$; the radius squared is $49$, not $7$; and there is no shift in $x$.`, d: 3, c: 'application', t: [1], time: 80 }, (C) => {
    const pts = range(0, 359).map((deg) => { const t = (deg * Math.PI) / 180; return [7 * Math.cos(t), 7 * Math.sin(t) - 2]; });
    const ok = pts.every(([x, y]) => Math.abs(x * x + (y + 2) ** 2 - 49) < 1e-9), shifted = pts.filter(([x, y]) => Math.abs(x * x + (y - 2) ** 2 - 49) < 1e-9).length;
    C.assert(c.cen() === '(0, -2)' && c.r2.eq(49) && c.verify() && ok && shifted < 5, 'x^2 + (y + 2)^2 = 49 holds for the 360 sampled values of theta; the version with y - 2 fits at most the two points on the line y = 2'); same(C, o, o[0]);
  });
}
{
  const isCircle = (D, E, F) => fr(D).mul(D).add(fr(E).mul(E)).div(4).sub(F).sign() > 0;
  const eqs = [{ t: r`x^2 + y^2 + 2xy - 4x - 6y + 1 = 0`, ok: false }, { t: r`x^2 + y^2 + 4x + 6y + 20 = 0`, ok: isCircle(4, 6, 20) }, { t: r`x^2 + y^2 - 6x + 2y + 10 = 0`, ok: isCircle(-6, 2, 10) }, { t: r`2x^2 + 2y^2 - 8x + 4y - 2 = 0`, ok: isCircle(-4, 2, -1) }];
  const ord = [3, 0, 1, 2], o = ord.map((i) => T(eqs[i].t));
  M('m07', { stem: r`Exactly one of the following equations represents a circle with a real, non-zero radius. It is`, opts: o, sol: r`Dividing $2x^2 + 2y^2 - 8x + 4y - 2 = 0$ by $2$ gives $x^2 + y^2 - 4x + 2y - 1 = 0$, with $g^2 + f^2 - c = 4 + 1 + 1 = 6 > 0$. The equation with $2xy$ has an $xy$ term; $x^2 + y^2 + 4x + 6y + 20 = 0$ has $4 + 9 - 20 < 0$; and $x^2 + y^2 - 6x + 2y + 10 = 0$ has $9 + 1 - 10 = 0$, a single point.`, d: 3, c: 'application', t: [1], time: 100 }, (C) => {
    C.assert(eqs.filter((e) => e.ok).length === 1 && eqs[3].ok && !eqs[1].ok && !eqs[2].ok && Circle.scaled(2, -8, 4, -2).r2.eq(6) && Circle.general(-6, 2, 9).r2.eq(1) && fr(-6).mul(-6).add(fr(2).mul(2)).div(4).sub(10).isZero(), 'only the scaled equation is a real circle (radius squared 6); the other two have g^2 + f^2 - c < 0 and = 0; the first has an xy term'); same(C, o, o[0]);
  });
}
{
  const ks = [-20, 0, 12, 13, 14, 30], real = ks.map((k) => (13 - k > 0));
  const o = ['k < 13', 'k > 13', 'k \\le 13', 'k < -13'].map(T);
  M('m08', { stem: r`The equation $x^2 + y^2 + 4x - 6y + k = 0$ represents a real circle of positive radius for`, opts: o, sol: r`$g = 2$, $f = -3$, so $r^2 = 4 + 9 - k = 13 - k$, which is positive only for $k < 13$. At $k = 13$ the radius is $0$ (a single point), so $k \le 13$ is too generous; $k > 13$ and $k < -13$ reverse or misplace the inequality.`, d: 3, c: 'application', t: [1], time: 70 }, (C) => {
    C.assert(real.join() === 'true,true,true,false,false,false' && ks.every((k) => (13 - k > 0) === (4 + 9 - k > 0)) && Circle.general(4, -6, 12).r2.eq(1), 'radius squared 13 - k is positive exactly for the k tested below 13 (-20, 0, 12) and not for 13, 14, 30'); same(C, o, o[0]);
  });
}
{
  const c = Circle.three([8, 0], [-2, 0], [4, 4]), o = [sqTex(26), '26', '5', sqTex(17)].map(T);
  M('m09', { stem: r`A circle passes through $(8, 0)$, $(-2, 0)$ and $(4, 4)$. Its radius is`, opts: o, sol: r`Substituting into $x^2 + y^2 + Dx + Ey + F = 0$ gives $D = -6$, $E = 2$, $F = -16$, so the centre is $(3, -1)$ and $r^2 = 9 + 1 + 16 = 26$. The value $26$ is $r^2$; $5$ is half the chord on the $x$-axis; and $\sqrt{17}$ assumes the centre $(3, 0)$ on the $x$-axis.`, d: 3, c: 'application', t: [2], time: 120 }, (C) => {
    C.assert(c.gen() === 'x^2 + y^2 - 6x + 2y - 16 = 0' && c.r2.eq(26) && c.cen() === '(3, -1)' && d2(P(3, 0), P(4, 4)).eq(17) && !d2(P(3, 0), P(8, 0)).eq(17), 'x^2 + y^2 - 6x + 2y - 16 = 0 through all three points; r^2 = 26'); same(C, o, o[0]);
  });
}
{
  const sol = solve2(1, -1, -3, 3, 2, 1), c = Circle.centreThrough(sol, [2, 2]);
  const bad = solve2(1, 1, 3, 3, 2, 1), mid = [fr(1, 2), fr(7, 2)];
  const o = [pt(-1, 2), pt(mid[0], mid[1]), pt(bad[0], bad[1]), pt(2, -1)].map(T);
  M('m10', { stem: r`A circle passes through $A(2, 2)$ and $B(-1, 5)$, and its centre lies on the line $3x + 2y = 1$. The centre is`, opts: o, sol: r`For the centre $(h, k)$, $AC^2 = BC^2$ gives $(h - 2)^2 + (k - 2)^2 = (h + 1)^2 + (k - 5)^2$, which simplifies to $k - h = 3$. With $3h + 2k = 1$ this gives $h = -1$, $k = 2$. The point $\left(\dfrac{1}{2}, \dfrac{7}{2}\right)$ is only the midpoint of $AB$; $(-5, 8)$ solves $h + k = 3$ by a sign slip; and $(2, -1)$ swaps the coordinates.`, d: 3, c: 'application', t: [2], time: 110 }, (C) => {
    C.assert(sol.map(String).join() === '-1,2' && c.r2.eq(9) && c.on([-1, 5]) && 3 * -1 + 2 * 2 === 1 && bad.map(String).join() === '-5,8' && !(3 * 2 + 2 * -1 === 1) && !(3 * 0.5 + 2 * 3.5 === 1), 'centre (-1, 2) on the line, equidistant (radius 3) from A and B; the distractors fail'); same(C, o, o[0]);
  });
}
{
  const c = Circle.general(-12, -6, 20), xc = c.xCut(), v = 8;
  const o2 = [T('8'), T('4'), T('12'), T(r`4\sqrt{14}`)];
  M('m11', { stem: r`The length of the intercept that the circle $x^2 + y^2 - 12x - 6y + 20 = 0$ makes on the $x$-axis is`, opts: o2, sol: r`Putting $y = 0$ gives $x^2 - 12x + 20 = 0$, so $x = 2$ or $x = 10$ and the intercept is $10 - 2 = 8$; also $2\sqrt{g^2 - c} = 2\sqrt{36 - 20} = 8$. The value $4$ forgets the factor $2$; $12$ is the sum of the roots; and $4\sqrt{14}$ is $2\sqrt{g^2 + c}$.`, d: 2, c: 'understanding', t: [3], time: 60 }, (C) => {
    C.assert(xc.roots.map(String).join() === '2,10' && xc.disc.eq(64) && 10 - 2 === v && 2 * Math.sqrt(36 - 20) === 8 && 2 * Math.sqrt(36 + 20) !== 8 && sqTex(224) === r`4\sqrt{14}`, 'x-intercepts 2 and 10, length 8'); C.which(['8', '4', '12', '4sqrt14'], '8');
  });
}
{
  const c = Circle.general(6, -8, 9), xc = c.xCut(), yc = c.yCut();
  const o = [r`touches the $x$-axis and cuts off a chord of length $2\sqrt{7}$ on the $y$-axis`, r`touches the $y$-axis and cuts off a chord of length $2\sqrt{7}$ on the $x$-axis`, 'touches both axes', 'meets neither axis'];
  M('m12', { stem: r`The circle $x^2 + y^2 + 6x - 8y + 9 = 0$`, opts: o, sol: r`For $y = 0$: $x^2 + 6x + 9 = (x + 3)^2 = 0$, a repeated root, so it touches the $x$-axis at $(-3, 0)$. For $x = 0$: $y^2 - 8y + 9 = 0$ has discriminant $64 - 36 = 28$, so the chord on the $y$-axis has length $\sqrt{28} = 2\sqrt{7}$. The statement that it touches the $y$-axis and cuts a chord of $2\sqrt{7}$ on the $x$-axis swaps the axes; the circle does meet the $y$-axis in two points, so "touches both axes" and "meets neither axis" are false.`, d: 4, c: 'analysis', t: [3], time: 110 }, (C) => {
    C.assert(xc.disc.isZero() && xc.roots.map(String).join() === '-3,-3' && yc.disc.eq(28) && sqTex(28) === r`2\sqrt{7}` && c.cen() === '(-3, 4)' && c.r2.eq(16) && !c.h.abs().eq(c.rad), 'x-axis: repeated root; y-axis: discriminant 28, length 2 sqrt 7; centre (-3, 4), r = 4 so it does not touch the y-axis'); same(C, o, o[0]);
  });
}
{
  const c1 = Circle.general(-4, -6, 9), c2 = Circle.general(-10, -6, 25), o = ['intersect at two points', 'touch externally', 'touch internally', 'lie completely apart'];
  M('m13', { stem: r`The circles $x^2 + y^2 - 4x - 6y + 9 = 0$ and $x^2 + y^2 - 10x - 6y + 25 = 0$`, opts: o, sol: r`The first has centre $(2, 3)$ and $r_1 = \sqrt{4 + 9 - 9} = 2$; the second has centre $(5, 3)$ and $r_2 = \sqrt{25 + 9 - 25} = 3$. The distance between the centres is $d = 3$. Since $r_2 - r_1 = 1 < 3 < 5 = r_1 + r_2$, the circles intersect at two points; $d$ is neither $5$ nor $1$, and it is less than $5$, so they are not apart.`, d: 3, c: 'application', t: [3], time: 110 }, (C) => {
    C.assert(c1.cen() === '(2, 3)' && c1.rad.eq(2) && c2.cen() === '(5, 3)' && c2.rad.eq(3) && relPos(c1, c2) === 'cross' && d2([c1.h, c1.k], [c2.h, c2.k]).eq(9), 'centres 3 apart, radii 2 and 3: 1 < 3 < 5 so two intersection points'); same(C, o, o[0]);
  });
}
{
  const c1 = new Circle(0, 0, 81), c2 = Circle.general(-6, -8, 9), p = contact(c1, c2);
  const dx = (x, y) => T(pt(x, y));
  const o = [dx(fr(27, 5), fr(36, 5)), dx(fr(27, 13), fr(36, 13)), dx(fr(12, 5), fr(16, 5)), dx(3, 4)];
  M('m14', { stem: r`The circles $x^2 + y^2 = 81$ and $x^2 + y^2 - 6x - 8y + 9 = 0$ touch each other. Their point of contact is`, opts: o, sol: r`The radii are $9$ and $\sqrt{9 + 16 - 9} = 4$ with centres $(0, 0)$ and $(3, 4)$, so $d = 5 = 9 - 4$: internal contact. The point lies on the line of centres beyond $(3, 4)$ at distance $9$ from the origin: $\dfrac{9}{5}(3, 4) = \left(\dfrac{27}{5}, \dfrac{36}{5}\right)$. The point $\left(\dfrac{27}{13}, \dfrac{36}{13}\right)$ uses the formula for external contact; $\left(\dfrac{12}{5}, \dfrac{16}{5}\right)$ uses the ratio $r_2 : (r_1 - r_2)$; and $(3, 4)$ is only the second centre.`, d: 4, c: 'application', t: [3], time: 150 }, (C) => {
    C.assert(c2.rad.eq(4) && relPos(c1, c2) === 'internal' && p.map(String).join() === '27/5,36/5' && c1.on(p) && c2.on(p) && !c2.on([fr(27, 13), fr(36, 13)]) && !c1.on([fr(12, 5), fr(16, 5)]) && !c2.on([3, 4]), 'internal contact at (27/5, 36/5), on both circles; the three distractors are on neither'); same(C, o, o[0]);
  });
}
{
  const ks = range(-12, 12).filter((k) => k * k === 16), o = [r`\pm 4`, '4', r`\pm 2`, r`\pm 3`].map(T);
  M('m15', { stem: r`The circle $x^2 + y^2 - 10x + 2ky + 16 = 0$ touches the $y$-axis. The value of $k$ is`, opts: o, sol: r`Putting $x = 0$ gives $y^2 + 2ky + 16 = 0$, which has equal roots when its discriminant $4k^2 - 64$ is zero, so $k^2 = 16$ and $k = \pm 4$. Both signs work because only $k^2$ appears; $\pm 2$ solves $(2k)^2 = 16$; and $\pm 3$ uses $g^2 - c = 9$.`, d: 3, c: 'application', t: [3], time: 90 }, (C) => {
    const okc = (k) => Circle.general(-10, 2 * k, 16);
    C.assert(ks.join() === '-4,4' && okc(4).yCut().disc.isZero() && okc(-4).yCut().disc.isZero() && !okc(2).yCut().disc.isZero() && !okc(3).yCut().disc.isZero() && okc(4).r2.eq(25), 'k = 4 and k = -4 each give a repeated root for x = 0 (radius 5)'); same(C, o, o[0]);
  });
}
{
  const c = Circle.centreThrough(solve2(1, 1, 4, 1, -1, 2), [5, 6]), eq = (h, k, rr) => T(new Circle(h, k, rr).std());
  const o = [eq(3, 1, 29), eq(1, 3, 29), eq(3, 1, 25), eq(-3, -1, 29)];
  M('m16', { stem: r`A circle has its centre at the point where the lines $x + y = 4$ and $x - y = 2$ meet, and it passes through $(5, 6)$. Its equation is`, opts: o, sol: r`Adding the two lines gives $x = 3$ and then $y = 1$. Then $r^2 = (5 - 3)^2 + (6 - 1)^2 = 4 + 25 = 29$, so $(x - 3)^2 + (y - 1)^2 = 29$. The equation $(x - 1)^2 + (y - 3)^2 = 29$ swaps the coordinates of the centre; $(x - 3)^2 + (y - 1)^2 = 25$ keeps only the term $(6 - 1)^2$; and $(x + 3)^2 + (y + 1)^2 = 29$ reverses the signs of the centre.`, d: 3, c: 'application', t: [2], time: 90 }, (C) => {
    C.assert(c.cen() === '(3, 1)' && c.r2.eq(29) && c.on([5, 6]) && !c.on([1, 3]) && !new Circle(1, 3, 29).on([5, 6]) && !new Circle(3, 1, 25).on([5, 6]) && !new Circle(-3, -1, 29).on([5, 6]), 'centre (3, 1) is the intersection; r^2 = 29; the distractors miss (5, 6)'); same(C, o, o[0]);
  });
}
{
  const A = new Circle(1, 2, 9), xs = range(-30, 30).filter((t) => d2(P(t, 2), P(1, 2)).eq(16)), o = ['5', '11', '-3', '4'].map(T);
  M('m17', { stem: r`A circle of radius $7$ touches the circle $(x - 1)^2 + (y - 2)^2 = 9$ internally, and its centre lies on the line $y = 2$. The greater $x$-coordinate of the possible centres is`, opts: o, sol: r`Internal contact needs $d = 7 - 3 = 4$. The centre $(t, 2)$ is at distance $\lvert t - 1 \rvert$ from $(1, 2)$, so $t - 1 = \pm 4$ and $t = 5$ or $t = -3$; the greater is $5$. The value $11$ uses $d = 7 + 3 = 10$, external contact; $-3$ is the smaller centre; and $4$ is the distance itself.`, d: 4, c: 'application', t: [3], time: 120 }, (C) => {
    const big = (t) => new Circle(t, 2, 49);
    C.assert(xs.join() === '-3,5' && relPos(A, big(5)) === 'internal' && relPos(A, big(-3)) === 'internal' && relPos(A, big(11)) === 'external' && Math.max(...xs) === 5, 'centres (5, 2) and (-3, 2) give internal contact; the greater x is 5; x = 11 gives external contact'); C.which([5, 11, -3, 4], 5);
  });
}
{
  const o = [new Circle(0, 0, 49), new Circle(0, 0, 7), new Circle(0, 0, 14), new Circle(7, 7, 49)].map((c) => T(c.std()));
  M('m18', { stem: r`The equation of the circle whose centre is the origin and whose radius is $7$ units is`, opts: o, sol: r`With $h = k = 0$ and $r = 7$, $(x - 0)^2 + (y - 0)^2 = 7^2$, that is $x^2 + y^2 = 49$. The equation $x^2 + y^2 = 7$ forgets to square $r$, and $x^2 + y^2 = 14$ doubles it instead.`, d: 1, c: 'recall', t: [1], time: 35 }, (C) => {
    const c = new Circle(0, 0, 49);
    C.assert(c.gen() === 'x^2 + y^2 - 49 = 0' && c.on([7, 0]) && c.on([0, -7]) && c.on([-7, 0]) && !new Circle(0, 0, 7).on([7, 0]) && o.length === 4, 'x^2 + y^2 = 49 passes through (7, 0), (0, -7) and (-7, 0)'); same(C, o, o[0]);
  });
}
{
  const c = Circle.scaled(5, 20, -30, -15), wrong = Circle.general(20, -30, -15);
  const o = [CR(-2, 3, '4'), CR(-10, 15, sqTex(340)), CR(-2, 3, '16'), CR(2, -3, '4')];
  M('m19', { stem: r`The equation $5x^2 + 5y^2 + 20x - 30y - 15 = 0$ represents a circle with`, opts: o, sol: r`Dividing by $5$ gives $x^2 + y^2 + 4x - 6y - 3 = 0$, so $g = 2$, $f = -3$, $c = -3$. The centre is $(-2, 3)$ and $r = \sqrt{4 + 9 + 3} = 4$. Using $20$ and $-30$ without dividing gives the centre $(-10, 15)$ and $\sqrt{340}$; the value $16$ is $r^2$; and $(2, -3)$ is $(g, f)$.`, d: 3, c: 'application', t: [1], time: 90 }, (C) => {
    C.assert(c.cen() === '(-2, 3)' && c.rad.eq(4) && c.on([2, 3]) && c.on([-2, 7]) && wrong.cen() === '(-10, 15)' && wrong.r2.eq(340) && new Set(o).size === 4, 'centre (-2, 3), radius 4 after dividing by 5; the undivided reading gives (-10, 15), sqrt 340'); same(C, o, o[0]);
  });
}
{
  const c = Circle.general(-6, 4, 0), xc = c.xCut(), o = ['(6, 0)', '(-6, 0)', '(4, 0)', '(0, -4)'].map(T);
  M('m20', { stem: r`The circle $x^2 + y^2 - 6x + 4y + c = 0$ passes through the origin. Besides the origin, it meets the $x$-axis at`, opts: o, sol: r`Substituting $(0, 0)$ gives $c = 0$. Then $y = 0$ gives $x^2 - 6x = 0$, so $x = 0$ or $x = 6$: the other point is $(6, 0)$. The point $(-6, 0)$ takes the root with the wrong sign, $(4, 0)$ is not on the circle, and $(0, -4)$ is the second point on the $y$-axis.`, d: 2, c: 'understanding', t: [3], time: 60 }, (C) => {
    C.assert(c.on([0, 0]) && c.F.isZero() && xc.roots.map(String).join() === '0,6' && c.on([0, -4]) && !c.on([-6, 0]) && !c.on([4, 0]), 'c = 0, x-axis points (0, 0) and (6, 0); (0, -4) is on the y-axis'); same(C, o, o[0]);
  });
}

// ============================================================ assertion-reason
Q('ar1', mk.ar({ a: r`The equation $x^2 + y^2 - 6x + 4y + 13 = 0$ represents a single point.`, r: r`For $x^2 + y^2 + 2gx + 2fy + c = 0$ the radius is $\sqrt{g^2 + f^2 - c}$, which is $0$ when $g^2 + f^2 = c$.`, key: 'a', sol: r`Here $g = -3$, $f = 2$, $c = 13$, and $g^2 + f^2 - c = 9 + 4 - 13 = 0$, so the circle shrinks to the point $(3, -2)$: A is true. R is the radius formula, and it gives A.`, d: 3, c: 'application', t: [1] }), (C) => {
  C.assert(fr(9).add(4).sub(13).isZero() && 36 + 16 - 4 * 13 === 0 && (3 - 3) ** 2 + (-2 + 2) ** 2 === 0 && [[3, -2], [4, -2], [3, -1], [2, -3]].filter(([x, y]) => x * x + y * y - 6 * x + 4 * y + 13 === 0).length === 1, 'g^2 + f^2 - c = 0; only the point (3, -2) satisfies the equation among nearby lattice points'); C.sol([13, 9, 4]);
});
Q('ar2', mk.ar({ a: r`The circle $x^2 + y^2 - 10x + 4y + 16 = 0$ cuts off an intercept of length $6$ on the $x$-axis.`, r: r`The intercept made on the $x$-axis by $x^2 + y^2 + 2gx + 2fy + c = 0$ has length $2\sqrt{g^2 + f^2 - c}$.`, key: 'c', sol: r`Here $g = -5$, $c = 16$, and $y = 0$ gives $x^2 - 10x + 16 = 0$, so $x = 2$ or $8$ and the length is $6$: A is true. But $2\sqrt{g^2 + f^2 - c}$ is the diameter of the circle, here $2\sqrt{25 + 4 - 16} = 2\sqrt{13}$; the intercept is $2\sqrt{g^2 - c}$. So R is false.`, d: 3, c: 'analysis', t: [3] }), (C) => {
  const c = Circle.general(-10, 4, 16);
  C.assert(c.xCut().roots.map(String).join() === '2,8' && 8 - 2 === 6 && 2 * Math.sqrt(25 - 16) === 6 && 2 * Math.sqrt(25 + 4 - 16) !== 6 && fr(25).add(4).sub(16).eq(13), 'x-intercepts 2 and 8; length 6 = 2 sqrt(g^2 - c), not 2 sqrt(g^2 + f^2 - c)'); C.key('c');
});
Q('ar3', mk.ar({ a: r`The circle $(x - 3)^2 + (y - 4)^2 = 9$ touches the $x$-axis.`, r: r`A circle with centre $(h, k)$ touches the $x$-axis when its radius equals $\lvert k \rvert$.`, key: 'd', sol: r`The radius is $3$ but $\lvert k \rvert = 4$, so the circle stays above the $x$-axis (putting $y = 0$ gives $(x - 3)^2 = -7$, no real point): A is false. R is the correct condition, so R is true.`, d: 3, c: 'analysis', t: [1] }), (C) => {
  const c = new Circle(3, 4, 9);
  C.assert(c.rad.eq(3) && !c.k.abs().eq(c.rad) && c.xCut().disc.sign() < 0 && new Circle(3, 4, 16).xCut().disc.isZero(), 'radius 3 is not |k| = 4 (no real point on y = 0); radius 4 would touch'); C.key('d');
});
Q('ar4', mk.ar({ a: r`The circle $x^2 + y^2 - 6x + 8y = 0$ passes through the origin.`, r: r`The centre of a circle is at the same distance from every point of the circle.`, key: 'b', sol: r`Substituting $x = y = 0$ gives $0 = 0$, so A is true (equivalently $c = 0$). R is also true, but it does not tell us whether the origin lies on this particular circle; that needs the equation to be satisfied. So R does not explain A.`, d: 2, c: 'understanding', t: [1] }), (C) => {
  const c = Circle.general(-6, 8, 0);
  C.assert(c.on([0, 0]) && c.F.isZero() && c.cen() === '(3, -4)' && c.r2.eq(25) && c.on([6, 0]) && c.on([0, -8]), 'the origin satisfies the equation (c = 0); centre (3, -4) is 5 from the origin'); C.key('b');
});
Q('ar5', mk.ar({ a: r`No circle passes through the three points $(1, 2)$, $(3, 4)$ and $(6, 7)$.`, r: r`The three points are collinear, and a straight line meets a circle in at most two points.`, key: 'a', sol: r`The slopes of $(1, 2)\to(3, 4)$ and $(3, 4)\to(6, 7)$ are both $1$, so the points are collinear and R's first part is true; a line cuts a circle at most twice, which is true as well. Three collinear points therefore cannot all lie on one circle, so A is true and R explains it.`, d: 3, c: 'analysis', t: [2] }), (C) => {
  let threw = false;
  try { Circle.three([1, 2], [3, 4], [6, 7]); } catch { threw = true; }
  C.assert(threw && fr(4 - 2, 3 - 1).eq(fr(7 - 4, 6 - 3)) && fr(7 - 2, 6 - 1).eq(1), 'the elimination for the three points fails (collinear) and all slopes equal 1'); C.key('a');
});
Q('ar6', mk.ar({ a: r`The circle $x^2 + y^2 - 8x + 6y + 16 = 0$ touches the $x$-axis.`, r: r`A circle $x^2 + y^2 + 2gx + 2fy + c = 0$ touches the $x$-axis when $f^2 = c$.`, key: 'c', sol: r`With $y = 0$ the equation is $x^2 - 8x + 16 = (x - 4)^2 = 0$, a repeated root, so the circle touches the $x$-axis at $(4, 0)$: A is true ($g^2 = 16 = c$). The condition for the $x$-axis is $g^2 = c$; $f^2 = c$ is the condition for the $y$-axis, and here $f^2 = 9$, not $16$. So R is false.`, d: 3, c: 'analysis', t: [3] }), (C) => {
  const c = Circle.general(-8, 6, 16), y = Circle.general(-6, 8, 16);
  C.assert(c.xCut().disc.isZero() && c.xCut().roots.map(String).join() === '4,4' && c.g.mul(c.g).eq(c.F) && !c.f.mul(c.f).eq(c.F) && c.cen() === '(4, -3)' && c.rad.eq(3) && c.k.abs().eq(c.rad) && y.yCut().disc.isZero() && y.f.mul(y.f).eq(y.F), 'repeated root x = 4 (g^2 = c = 16, f^2 = 9 differs from c); a circle with f^2 = c touches the y-axis instead'); C.key('c');
});
