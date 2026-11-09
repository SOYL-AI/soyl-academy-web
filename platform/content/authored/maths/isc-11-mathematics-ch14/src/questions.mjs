// ISC 11 Mathematics ch14 Ellipse and Hyperbola - multiple-choice and assertion-reason items.
// Every key is recomputed from the givens (exact rationals, surds, point tests, sampling); every distractor comes from its own wrong method and is asserted to be wrong.
import { Q, mk } from './lib.mjs';
import { Ellipse, Hyperbola, fdConic, quadTex, quadKind, fdGap, fr, sqrtF, sqTex, kSqTex, d2, P, range } from './conic.mjs';

const r = String.raw;
const M = (id, o, check) => Q(id, mk.mcq({ key: 'a', ...o }), check);
const T = (x) => `$${x}$`;
const same = (C, texts, key) => C.which(texts, key);
const distinct = (o) => new Set(o).size === o.length;
/** A x^2 + B y^2 = k as an ellipse (p = k / A, q = k / B). */
const fromSum = (A, B, k) => new Ellipse(fr(k).div(A), fr(k).div(B));
/** |PA| + |PB| (floating point) for a point of the ellipse at parameter t, foci on the y-axis at (0, +-f). */
const sumY = (E, f) => { let worst = 0; for (let i = 0; i < 360; i++) { const t = (i * Math.PI) / 180, x = Math.sqrt(E.p.num()) * Math.cos(t), y = Math.sqrt(E.q.num()) * Math.sin(t); worst = Math.max(worst, Math.abs(Math.hypot(x, y - f) + Math.hypot(x, y + f) - 6)); } return worst; };

// ============================================================ MCQ
{
  const E = new Ellipse(49, 24), o = [T(E.eTex()), T(E.e2.tex()), T(sqTex(fr(25, 24))), T(E.B2.div(E.A2).tex())];
  M('m01', { stem: r`The ellipse $\dfrac{x^2}{49} + \dfrac{y^2}{24} = 1$ has eccentricity`, opts: o, sol: r`Here $a^2 = 49$ and $b^2 = 24$, so $a > b$, $c^2 = a^2 - b^2 = 25$ and $c = 5$. Then $e = \dfrac{c}{a} = \dfrac{5}{7}$. The value $\dfrac{25}{49}$ is $e^2$; $\dfrac{5\sqrt{6}}{12}$ divides $c$ by $b$ instead of $a$; and $\dfrac{24}{49}$ is $\dfrac{b^2}{a^2}$, which equals $1 - e^2$.`, d: 2, c: 'understanding', t: [1], time: 55 }, (C) => {
    C.assert(E.verify() && E.c.eq(5) && E.e.eq(fr(5, 7)) && E.e2.eq(fr(25, 49)) && E.B2.div(E.A2).eq(fr(24, 49)) && E.e2.add(E.B2.div(E.A2)).eq(1) && sqTex(fr(25, 24)) === r`\dfrac{5\sqrt{6}}{12}` && distinct(o), 'c = 5, e = 5/7; the distractors are e^2, c/b and b^2/a^2'); same(C, o, o[0]);
  });
}
{
  const E = fromSum(36, 11, 396), o = [T(E.fociTex()), T(r`(\pm 5, 0)`), T(r`(0, \pm 25)`), T(r`(0, \pm \sqrt{47})`)];
  M('m02', { stem: r`Which pair of points are the foci of the ellipse $36x^2 + 11y^2 = 396$?`, opts: o, sol: r`Dividing by $396$ gives $\dfrac{x^2}{11} + \dfrac{y^2}{36} = 1$. The larger denominator is under $y^2$, so the foci are on the $y$-axis, and $c^2 = 36 - 11 = 25$, $c = 5$: the foci are $(0, \pm 5)$. The points $(\pm 5, 0)$ are on the wrong axis; $(0, \pm 25)$ forgets the square root; and $(0, \pm \sqrt{47})$ adds the denominators.`, d: 2, c: 'understanding', t: [1], time: 70 }, (C) => {
    C.assert(E.p.eq(11) && E.q.eq(36) && E.ax === 'y' && E.c.eq(5) && E.verify() && E.fociTex() === r`(0, \pm 5)` && fr(11).add(36).eq(47) && !E.on(5, 0) && distinct(o), 'x^2/11 + y^2/36 = 1: foci (0, +-5); (+-5, 0) would be the foci only if the x denominator were larger'); same(C, o, o[0]);
  });
}
{
  const E = fromSum(3, 4, 192), o = [T('12'), T('6'), T(r`8\sqrt{3}`), T(kSqTex(fr(128, 48), 48))];
  M('m03', { stem: r`The latus rectum of the ellipse $3x^2 + 4y^2 = 192$ has length`, opts: o, sol: r`Dividing by $192$ gives $\dfrac{x^2}{64} + \dfrac{y^2}{48} = 1$, so $a^2 = 64$, $b^2 = 48$ and the latus rectum is $\dfrac{2b^2}{a} = \dfrac{96}{8} = 12$. The value $6$ is only half of it, $\dfrac{b^2}{a}$; $8\sqrt{3}$ is the minor axis $2b$; and $\dfrac{32\sqrt{3}}{3}$ uses $\dfrac{2a^2}{b}$, the formula for the other orientation.`, d: 2, c: 'understanding', t: [1], time: 70 }, (C) => {
    C.assert(E.p.eq(64) && E.q.eq(48) && E.lrTex() === '12' && E.B2.div(E.A.neg().neg()).eq(6) && sqTex(192) === r`8\sqrt{3}` && kSqTex(2, 48) === r`8\sqrt{3}` && kSqTex(fr(128, 48), 48) === r`\dfrac{32\sqrt{3}}{3}` && distinct(o) && E.lrOn(), 'latus rectum 2b^2/a = 12; 6 is b^2/a, 8 sqrt 3 is 2b, 32 sqrt 3 / 3 is 2a^2/b'); same(C, o, o[0]);
  });
}
{
  const ks = range(10, 200).filter((k) => fr(1).sub(fr(9, k)).eq(fr(16, 25))), E = new Ellipse(25, 9), alt = new Ellipse(fr(81, 25), 9);
  const o = [T('25'), T('45'), T(r`\dfrac{81}{25}`), T('5')];
  M('m04', { stem: r`The ellipse $\dfrac{x^2}{k} + \dfrac{y^2}{9} = 1$ has its major axis along the $x$-axis and eccentricity $\dfrac{4}{5}$. The value of $k$ is`, opts: o, sol: r`With the major axis along the $x$-axis, $a^2 = k > 9$ and $b^2 = 9 = k(1 - e^2) = k \cdot \dfrac{9}{25}$, so $k = 25$. The value $45$ solves $1 - \dfrac{9}{k} = \dfrac{4}{5}$, using $e$ where $e^2$ is needed; $\dfrac{81}{25}$ would suit a major axis along the $y$-axis ($9 \times \dfrac{9}{25}$); and $5$ is $a$, not $a^2$.`, d: 3, c: 'application', t: [1], time: 90 }, (C) => {
    C.assert(ks.join() === '25' && E.e.eq(fr(4, 5)) && E.ax === 'x' && fr(1).sub(fr(9, 45)).eq(fr(4, 5)) && alt.ax === 'y' && alt.e.eq(fr(4, 5)) && sqrtF(25).eq(5) && distinct(o), 'k = 25 is the only k > 9 with e^2 = 16/25; 81/25 gives the same e but a y-axis major axis; 45 solves 1 - 9/k = e'); C.which([25, 45, 3.24, 5], 25);
  });
}
{
  const E = new Ellipse(56, 81), o = [T(E.eq()), T(new Ellipse(81, 56).eq()), T(new Ellipse(106, 81).eq()), T(r`\dfrac{x^2}{56} + \dfrac{y^2}{9} = 1`)];
  M('m05', { stem: r`The ellipse centred at the origin with foci $(0, \pm 5)$ and eccentricity $\dfrac{5}{9}$ is represented by`, opts: o, sol: r`The foci are on the $y$-axis, so the semi-major axis $b$ satisfies $be = 5$, giving $b = 9$ and $b^2 = 81$. Then $a^2 = b^2 - c^2 = 81 - 25 = 56$, so the equation is $\dfrac{x^2}{56} + \dfrac{y^2}{81} = 1$. The equation $\dfrac{x^2}{81} + \dfrac{y^2}{56} = 1$ swaps the axes (its foci are on the $x$-axis); $\dfrac{x^2}{106} + \dfrac{y^2}{81} = 1$ uses $b^2 + c^2 = 106$ in place of $b^2 - c^2$; and $\dfrac{x^2}{56} + \dfrac{y^2}{9} = 1$ leaves $9$ unsquared.`, d: 3, c: 'application', t: [1], time: 110 }, (C) => {
    C.assert(E.verify() && E.ax === 'y' && E.c.eq(5) && E.e.eq(fr(5, 9)) && new Ellipse(81, 56).ax === 'x' && new Ellipse(106, 81).ax === 'x' && fr(81).add(25).eq(106) && new Ellipse(56, 9).c2.eq(47) && distinct(o), 'x^2/56 + y^2/81 = 1: foci (0, +-5), e = 5/9; the distractors have foci on the x-axis, c^2 = 25 on the wrong axis, or c^2 = 47'); same(C, o, o[0]);
  });
}
{
  const E = fromSum(4, 25, 100), o = ['14', '7', '29', '6'].map(T);
  M('m06', { stem: r`The major axis and the minor axis of the ellipse $4x^2 + 25y^2 = 100$ together have total length`, opts: o, sol: r`Dividing by $100$ gives $\dfrac{x^2}{25} + \dfrac{y^2}{4} = 1$, so $a = 5$ and $b = 2$. The axes have lengths $2a = 10$ and $2b = 4$, and $10 + 4 = 14$. The value $7$ is $a + b$; $29$ is $a^2 + b^2$; and $6$ is $2a - 2b$.`, d: 2, c: 'understanding', t: [1], time: 60 }, (C) => {
    C.assert(E.p.eq(25) && E.q.eq(4) && E.A.eq(5) && E.B.eq(2) && E.A.mul(2).add(E.B.mul(2)).eq(14) && E.A.add(E.B).eq(7) && E.p.add(E.q).eq(29) && E.A.mul(2).sub(E.B.mul(2)).eq(6), 'axes 10 and 4; 7 is a + b, 29 is a^2 + b^2, 6 is the difference'); C.which([14, 7, 29, 6], 14);
  });
}
{
  const eqs = [fromSum(7, 3, 84), new Ellipse(9, 4), fromSum(2, 5, 40), fromSum(3, 7, 84)];
  const txt = [r`7x^2 + 3y^2 = 84`, r`\dfrac{x^2}{9} + \dfrac{y^2}{4} = 1`, r`2x^2 + 5y^2 = 40`, r`3x^2 + 7y^2 = 84`], o = txt.map(T);
  M('m07', { stem: r`Exactly one of the following ellipses has its foci on the $y$-axis. It is`, opts: o, sol: r`Divide each equation to make the right-hand side $1$. $7x^2 + 3y^2 = 84$ becomes $\dfrac{x^2}{12} + \dfrac{y^2}{28} = 1$, whose larger denominator is under $y^2$, so its foci are on the $y$-axis. The others are $\dfrac{x^2}{9} + \dfrac{y^2}{4} = 1$, $\dfrac{x^2}{20} + \dfrac{y^2}{8} = 1$ and $\dfrac{x^2}{28} + \dfrac{y^2}{12} = 1$, each with the larger denominator under $x^2$.`, d: 3, c: 'understanding', t: [1], time: 90 }, (C) => {
    C.assert(eqs.map((e) => e.ax).join() === 'y,x,x,x' && eqs[0].p.eq(12) && eqs[0].q.eq(28) && eqs[2].p.eq(20) && eqs[2].q.eq(8) && eqs[3].p.eq(28) && eqs[3].q.eq(12) && distinct(o), 'only 7x^2 + 3y^2 = 84 has the larger denominator under y^2'); same(C, o, o[0]);
  });
}
{
  const E = new Ellipse(81, 36), dist = (x) => T(x), o = [dist(r`6\sqrt{5}`), dist(r`3\sqrt{5}`), dist(r`6\sqrt{13}`), dist('18')];
  M('m08', { stem: r`An ellipse with its major axis along the $x$-axis has a minor axis of length $12$ and a latus rectum of length $8$. The distance between its foci is`, opts: o, sol: r`The minor axis gives $b = 6$. The latus rectum is $\dfrac{2b^2}{a} = \dfrac{72}{a} = 8$, so $a = 9$. Then $c^2 = a^2 - b^2 = 81 - 36 = 45$, $c = 3\sqrt{5}$ and the foci are $2c = 6\sqrt{5}$ apart. The value $3\sqrt{5}$ is only $c$; $6\sqrt{13}$ uses $c^2 = a^2 + b^2$; and $18$ is the major axis $2a$.`, d: 3, c: 'application', t: [1], time: 110 }, (C) => {
    C.assert(E.B.eq(6) && E.lrTex() === '8' && E.A.eq(9) && E.c2.eq(45) && kSqTex(2, 45) === r`6\sqrt{5}` && kSqTex(1, 45) === r`3\sqrt{5}` && kSqTex(2, 117) === r`6\sqrt{13}` && E.A.mul(2).eq(18) && E.verify() && distinct(o), 'a = 9, b = 6, c = 3 sqrt 5; foci 6 sqrt 5 apart'); same(C, o, o[0]);
  });
}
{
  const c = fdConic([4, 0], [1, 0, -9], fr(4, 9)), wrongSwap = fdConic([0, 4], [0, 1, -9], fr(4, 9)), wrongE = fdConic([4, 0], [1, 0, -9], fr(2, 3)), wrongDir = fdConic([4, 0], [1, 0, 9], fr(4, 9));
  const o = [c, wrongSwap, wrongE, wrongDir].map((q) => T(quadTex(q)));
  M('m09', { stem: r`A point moves so that its distance from the point $(4, 0)$ is always $\dfrac{2}{3}$ of its distance from the line $x = 9$. Its path is the curve`, opts: o, sol: r`Let $P(x, y)$. Then $PS^2 = \dfrac{4}{9} PL^2$ gives $9\left[(x - 4)^2 + y^2\right] = 4(x - 9)^2$, so $9x^2 - 72x + 144 + 9y^2 = 4x^2 - 72x + 324$, that is $5x^2 + 9y^2 - 180 = 0$. The curve $9x^2 + 5y^2 - 180 = 0$ swaps $x$ and $y$; $x^2 + 3y^2 + 12x - 114 = 0$ uses $e$ instead of $e^2$; and $5x^2 + 9y^2 - 144x - 180 = 0$ uses the directrix $x = -9$.`, d: 3, c: 'application', t: [2], time: 130 }, (C) => {
    C.assert(quadTex(c) === '5x^2 + 9y^2 - 180 = 0' && fdGap(c, 6, 0).isZero() && fdGap(c, -6, 0).isZero() && fdGap(c, 4, fr(10, 3)).isZero() && !fdGap(wrongSwap, 6, 0).isZero() && [wrongSwap, wrongE, wrongDir].every((q) => !fdGap(c, 0, 0).isZero() && (q.A.mul(36).add(q.D.mul(6)).add(q.F)).sign() !== 0) && distinct(o), 'the key passes through the vertices (+-6, 0) and the latus rectum end (4, 10/3), all with PS = (2/3) PL; the distractors do not pass through (6, 0)'); same(C, o, o[0]);
  });
}
{
  const E = fromSum(4, 9, 144), o = ['12', '6', '8', '52'].map(T);
  M('m10', { stem: r`For every point of the ellipse $4x^2 + 9y^2 = 144$, the sum of its distances from the two foci is`, opts: o, sol: r`Dividing by $144$ gives $\dfrac{x^2}{36} + \dfrac{y^2}{16} = 1$, so $a = 6$. By the focal property the sum of the focal distances is $2a = 12$. The value $6$ is $a$; $8$ is the minor axis $2b$; and $52$ is $a^2 + b^2$.`, d: 2, c: 'understanding', t: [2], time: 60 }, (C) => {
    C.assert(E.p.eq(36) && E.q.eq(16) && E.verify() && E.A.mul(2).eq(12) && E.B.mul(2).eq(8) && E.p.add(E.q).eq(52), 'a = 6, the sum of focal distances 12 (720 sampled points in verify)'); C.which([12, 6, 8, 52], 12);
  });
}
{
  const E = new Ellipse(400, 144), y2 = fr(108), o = ['12', '10', '16', '8'].map(T);
  M('m11', { stem: r`The point $P(10, 6\sqrt{3})$ lies on the ellipse $\dfrac{x^2}{400} + \dfrac{y^2}{144} = 1$. Its distance from the nearer focus is`, opts: o, sol: r`Here $a = 20$, $b = 12$, $c = 16$ and $e = \dfrac{16}{20} = \dfrac{4}{5}$. The distance from the nearer focus is $a - ex = 20 - \dfrac{4}{5} \times 10 = 12$; the farther one is $20 + 8 = 28$. The value $10$ is $a - x$, which forgets $e$; $16$ is $c$; and $8$ is $ex$.`, d: 3, c: 'application', t: [2], time: 100 }, (C) => {
    C.assert(E.verify() && E.onSq(100, y2) && E.c.eq(16) && E.e.eq(fr(4, 5)) && fr(10 - 16).mul(10 - 16).add(y2).eq(144) && fr(10 + 16).mul(26).add(y2).eq(784) && fr(20).sub(fr(4, 5).mul(10)).eq(12) && sqrtF(144).eq(12) && sqrtF(784).eq(28), 'SP^2 = 36 + 108 = 144 so SP = 12; S\'P^2 = 676 + 108 = 784 so S\'P = 28; a - ex = 12'); C.which([12, 10, 16, 8], 12);
  });
}
{
  const E = new Ellipse(5, 9), o = [E.eq(), new Ellipse(9, 5).eq(), r`\dfrac{x^2}{13} + \dfrac{y^2}{9} = 1`, r`\dfrac{x^2}{32} + \dfrac{y^2}{36} = 1`].map(T);
  M('m12', { stem: r`A point $P$ moves so that $PA + PB = 6$, where $A$ is $(0, -2)$ and $B$ is $(0, 2)$. The locus of $P$ is`, opts: o, sol: r`The fixed points are $4$ apart and $6 > 4$, so $P$ traces an ellipse with foci $A$, $B$: $2b = 6$, $c = 2$, and $a^2 = b^2 - c^2 = 9 - 4 = 5$, giving $\dfrac{x^2}{5} + \dfrac{y^2}{9} = 1$ with the major axis along the $y$-axis. The curve $\dfrac{x^2}{9} + \dfrac{y^2}{5} = 1$ swaps the axes; $\dfrac{x^2}{13} + \dfrac{y^2}{9} = 1$ adds $c^2$ instead of subtracting it; and $\dfrac{x^2}{32} + \dfrac{y^2}{36} = 1$ takes the semi-major axis as $6$ (the whole sum) instead of $3$.`, d: 3, c: 'application', t: [2], time: 110 }, (C) => {
    const bad = [new Ellipse(9, 5), new Ellipse(13, 9), new Ellipse(32, 36)].map((e) => sumY(e, 2));
    C.assert(E.verify() && E.ax === 'y' && E.c.eq(2) && sumY(E, 2) < 1e-9 && bad.every((v) => v > 0.1) && distinct(o), 'on the key ellipse PA + PB = 6 at all 360 sampled points; on each distractor it is not constant 6'); same(C, o, o[0]);
  });
}
{
  const o = [r`the line segment $AB$`, r`an ellipse with foci $A$ and $B$ and eccentricity $\dfrac{1}{2}$`, r`a circle with $AB$ as a diameter`, 'the empty set, because no such point exists'];
  M('m13', { stem: r`Let $A(-4, 0)$ and $B(4, 0)$ be fixed points. If a point $P$ satisfies $PA + PB = 8$, the set of all such points $P$ is`, opts: o, sol: r`Here $AB = 8$, which equals the constant sum, so $2a = 2c$ and $e = 1$: no ellipse is formed. By the triangle inequality $PA + PB \ge AB$ with equality only when $P$ lies on the segment $AB$, so the locus is that segment. It is not an ellipse with $e = \dfrac{1}{2}$ (that needs $PA + PB = 16$ here), not a circle, and not empty, since $(0, 0)$ gives $4 + 4 = 8$.`, d: 4, c: 'analysis', t: [2], time: 120 }, (C) => {
    let on = true, off = true;
    for (let xi = -24; xi <= 24; xi++) for (let yi = -24; yi <= 24; yi++) {
      const x = xi / 4, y = yi / 4, s = Math.hypot(x + 4, y) + Math.hypot(x - 4, y);
      if (Math.abs(s - 8) < 1e-9) { if (!(yi === 0 && Math.abs(x) <= 4)) off = false; } else if (yi === 0 && Math.abs(x) <= 4) on = false;
      if (yi !== 0 && s < 8 + 1e-6) off = false;
    }
    C.assert(on && off && fr(4).add(4).eq(8) && fr(2).mul(8).div(fr(2).mul(4)).eq(2) && fr(4).div(8).eq(fr(1, 2)), 'on a 0.25 grid, PA + PB = 8 exactly for the points of the segment AB and for no other point'); same(C, o, o[0]);
  });
}
{
  const H = new Hyperbola(20, 5), o = [T(H.eTex()), T(H.e2.tex()), T(sqTex(fr(15, 20))), T(sqTex(5))];
  M('m14', { stem: r`The hyperbola $\dfrac{x^2}{20} - \dfrac{y^2}{5} = 1$ has eccentricity`, opts: o, sol: r`Here $a^2 = 20$, $b^2 = 5$, and $c^2 = a^2 + b^2 = 25$, so $e^2 = \dfrac{25}{20} = \dfrac{5}{4}$ and $e = \dfrac{\sqrt{5}}{2}$. The value $\dfrac{5}{4}$ is $e^2$; $\dfrac{\sqrt{3}}{2}$ comes from the ellipse formula $\sqrt{1 - \dfrac{b^2}{a^2}}$; and $\sqrt{5}$ is $\dfrac{c}{b}$.`, d: 2, c: 'understanding', t: [3], time: 70 }, (C) => {
    C.assert(H.verify() && H.c2.eq(25) && H.e2.eq(fr(5, 4)) && H.eTex() === r`\dfrac{\sqrt{5}}{2}` && sqTex(fr(15, 20)) === r`\dfrac{\sqrt{3}}{2}` && sqTex(5) === r`\sqrt{5}` && distinct(o), 'c^2 = 25, e^2 = 5/4, e = sqrt 5 / 2'); same(C, o, o[0]);
  });
}
{
  const H = new Hyperbola(4, 5, 'y'), o = [T(H.fociTex()), T(r`(\pm 3, 0)`), T(r`(0, \pm 1)`), T(r`(0, \pm 9)`)];
  M('m15', { stem: r`For the hyperbola $5y^2 - 4x^2 = 20$, the coordinates of the foci are`, opts: o, sol: r`Dividing by $20$ gives $\dfrac{y^2}{4} - \dfrac{x^2}{5} = 1$: the positive term is $y^2$, so the transverse axis and the foci are on the $y$-axis, and $c^2 = 4 + 5 = 9$, $c = 3$. The foci are $(0, \pm 3)$. The points $(\pm 3, 0)$ are on the wrong axis; $(0, \pm 1)$ subtracts, $5 - 4$; and $(0, \pm 9)$ leaves $c^2$ unrooted.`, d: 2, c: 'understanding', t: [3], time: 70 }, (C) => {
    C.assert(H.verify() && H.on(0, 2) && H.c.eq(3) && H.fociTex() === r`(0, \pm 3)` && fr(5).sub(4).eq(1) && !H.on(3, 0) && distinct(o), 'y^2/4 - x^2/5 = 1: c^2 = 9, foci (0, +-3)'); same(C, o, o[0]);
  });
}
{
  const H = new Hyperbola(4, 5), o = ['5', r`\dfrac{5}{2}`, r`\dfrac{8\sqrt{5}}{5}`, '10'].map(T);
  M('m16', { stem: r`The chord of the hyperbola $5x^2 - 4y^2 = 20$ that passes through a focus and is perpendicular to the transverse axis has length`, opts: o, sol: r`Dividing by $20$ gives $\dfrac{x^2}{4} - \dfrac{y^2}{5} = 1$, so $a = 2$, $b^2 = 5$ and the latus rectum is $\dfrac{2b^2}{a} = \dfrac{10}{2} = 5$. The value $\dfrac{5}{2}$ is half of it; $\dfrac{8\sqrt{5}}{5}$ is $\dfrac{2a^2}{b}$; and $10$ is $2b^2$.`, d: 2, c: 'understanding', t: [3], time: 70 }, (C) => {
    C.assert(H.verify() && H.lrTex() === '5' && H.on(3, fr(5, 2)) && kSqTex(fr(8, 5), 5) === r`\dfrac{8\sqrt{5}}{5}`, 'latus rectum 2b^2/a = 5; its ends (3, +-5/2) lie on the curve'); C.assert(H.C2.mul(2).eq(10) && H.C2.div(H.T).eq(fr(5, 2)) && distinct(o), 'distractors b^2/a, 2a^2/b, 2b^2'); same(C, o, o[0]);
  });
}
{
  const H = new Hyperbola(16, 9), Hc = H.conj(), o = [T(r`\dfrac{5}{3}`), T(r`\dfrac{4}{5}`), T(r`\dfrac{25}{9}`), T(r`\dfrac{3}{4}`)];
  M('m17', { stem: r`A hyperbola has eccentricity $\dfrac{5}{4}$. The eccentricity of its conjugate hyperbola is`, opts: o, sol: r`For a hyperbola and its conjugate, $\dfrac{1}{e^2} + \dfrac{1}{e'^2} = 1$. With $e = \dfrac{5}{4}$: $\dfrac{16}{25} + \dfrac{1}{e'^2} = 1$, so $e'^2 = \dfrac{25}{9}$ and $e' = \dfrac{5}{3}$. The value $\dfrac{4}{5}$ is $\dfrac{1}{e}$; $\dfrac{25}{9}$ is $e'^2$; and $\dfrac{3}{4}$ is the ratio $\dfrac{b}{a}$.`, d: 3, c: 'understanding', t: [3], time: 80 }, (C) => {
    C.assert(H.e.eq(fr(5, 4)) && Hc.e.eq(fr(5, 3)) && H.verify() && Hc.verify() && fr(1).div(H.e2).add(fr(1).div(Hc.e2)).eq(1) && fr(1).sub(fr(16, 25)).eq(fr(9, 25)) && Hc.e2.eq(fr(25, 9)) && H.C.div(H.T).eq(fr(3, 4)) && distinct(o), 'e = 5/4 (a = 4, b = 3) has conjugate e\' = 5/3; 1/e^2 + 1/e\'^2 = 1'); C.which([fr(5, 3).num(), 0.8, fr(25, 9).num(), 0.75], fr(5, 3).num());
  });
}
{
  const H = new Hyperbola(72, 72), o = [72, 144, 36, 288].map((v) => T(`x^2 - y^2 = ${v}`));
  M('m18', { stem: r`The two foci of a rectangular hyperbola $x^2 - y^2 = a^2$ are $24$ units apart. Its equation is`, opts: o, sol: r`The foci are $(\pm c, 0)$ with $2c = 24$, so $c = 12$. For a rectangular hyperbola $b = a$ and $c^2 = a^2 + b^2 = 2a^2$, so $2a^2 = 144$ and $a^2 = 72$. The equation $x^2 - y^2 = 144$ takes $a = c$; $x^2 - y^2 = 36$ takes $c = 2a$; and $x^2 - y^2 = 288$ takes $a^2 = 2c^2$.`, d: 3, c: 'application', t: [3], time: 90 }, (C) => {
    C.assert(H.verify() && H.c.eq(12) && H.e2.eq(2) && fr(144).div(2).eq(72) && new Hyperbola(144, 144).c2.eq(288) && new Hyperbola(36, 36).c2.eq(72) && new Hyperbola(288, 288).c2.eq(576) && distinct(o), 'a^2 = 72 gives c = 12; the distractors give foci 2 sqrt 288, 2 sqrt 72, 2 sqrt 576 apart instead of 24'); same(C, o, o[0]);
  });
}
{
  const H = new Hyperbola(36, 64), y2 = fr(80), o = ['21', '19', '15', '23'].map(T);
  M('m19', { stem: r`The point $P(9, 4\sqrt{5})$ lies on the hyperbola $\dfrac{x^2}{36} - \dfrac{y^2}{64} = 1$. Its distance from the farther focus is`, opts: o, sol: r`Here $a = 6$, $b = 8$, $c = 10$ and $e = \dfrac{5}{3}$. On the right branch the focal distances are $ex - a = 15 - 6 = 9$ and $ex + a = 15 + 6 = 21$, so the farther one is $21$. The value $19$ is $x + c$; $15$ is $ex$; and $23$ is $ex + b$.`, d: 4, c: 'application', t: [4], time: 110 }, (C) => {
    C.assert(H.verify() && H.onSq(81, y2) && H.c.eq(10) && H.e.eq(fr(5, 3)) && fr(9 - 10).mul(9 - 10).add(y2).eq(81) && fr(9 + 10).mul(19).add(y2).eq(441) && sqrtF(441).eq(21) && sqrtF(81).eq(9) && fr(5, 3).mul(9).sub(6).eq(9) && fr(5, 3).mul(9).add(6).eq(21), 'SP^2 = 1 + 80 = 81, S\'P^2 = 361 + 80 = 441: distances 9 and 21; their difference is 12 = 2a'); C.which([21, 19, 15, 23], 21);
  });
}
{
  const H = new Hyperbola(25, 144, 'y'), o = [H.eq(), new Hyperbola(25, 144, 'x').eq(), r`\dfrac{y^2}{25} + \dfrac{x^2}{144} = 1`, new Hyperbola(100, 69, 'y').eq()].map(T);
  M('m20', { stem: r`The distances of a point $P$ from $A(0, -13)$ and from $B(0, 13)$ always differ by $10$ in absolute value. Then $P$ traces the curve`, opts: o, sol: r`The fixed points are $26$ apart and $10 < 26$, so the locus is a hyperbola with foci $A$, $B$: $2a = 10$ is the transverse axis along the $y$-axis, $c = 13$, and $b^2 = c^2 - a^2 = 144$. The equation is $\dfrac{y^2}{25} - \dfrac{x^2}{144} = 1$. The curve $\dfrac{x^2}{25} - \dfrac{y^2}{144} = 1$ puts the transverse axis on the $x$-axis; $\dfrac{y^2}{25} + \dfrac{x^2}{144} = 1$ has a plus sign (an ellipse); and $\dfrac{y^2}{100} - \dfrac{x^2}{69} = 1$ takes $10$ as the semi-axis.`, d: 3, c: 'application', t: [4], time: 110 }, (C) => {
    const diffY = (h) => { let worst = 0; const T_ = Math.sqrt(h.T2.num()), C_ = Math.sqrt(h.C2.num()); for (let i = -10; i <= 10; i++) for (const s of [1, -1]) { const u = s * T_ * Math.cosh(i / 3), v = C_ * Math.sinh(i / 3), x = v, y = u; worst = Math.max(worst, Math.abs(Math.abs(Math.hypot(x, y + 13) - Math.hypot(x, y - 13)) - 10)); } return worst; };
    C.assert(H.verify() && H.c.eq(13) && diffY(H) < 1e-9 && diffY(new Hyperbola(100, 69, 'y')) > 0.1 && new Hyperbola(25, 144, 'x').c.eq(13) && fr(169).sub(25).eq(144) && distinct(o), 'on the key hyperbola | PA - PB | = 10 at 42 sampled points; the fourth option (T2 = 100) gives 20 instead'); same(C, o, o[0]);
  });
}

// ============================================================ assertion-reason
Q('ar1', mk.ar({ a: r`The ellipse $\dfrac{x^2}{25} + \dfrac{y^2}{49} = 1$ has its foci on the $y$-axis.`, r: r`In $\dfrac{x^2}{p} + \dfrac{y^2}{q} = 1$ with $p \ne q$, the major axis lies along the axis whose variable has the larger denominator.`, key: 'a', sol: r`Here $q = 49 > p = 25$, so the major axis is along the $y$-axis and the foci are $(0, \pm 2\sqrt{6})$ on that axis: A is true. R states the rule that decides this, so R is true and explains A.`, d: 2, c: 'understanding', t: [1] }), (C) => {
  const E = new Ellipse(25, 49);
  C.assert(E.ax === 'y' && E.fociTex() === r`(0, \pm 2\sqrt{6})` && E.c2.eq(24) && new Ellipse(49, 25).ax === 'x' && E.verify(), 'x^2/25 + y^2/49 = 1: major axis along y, foci (0, +-2 sqrt 6)'); C.key('a');
});
Q('ar2', mk.ar({ a: r`The ellipse $\dfrac{x^2}{36} + \dfrac{y^2}{20} = 1$ has a latus rectum of length $\dfrac{20}{3}$.`, r: r`The latus rectum of the ellipse $\dfrac{x^2}{a^2} + \dfrac{y^2}{b^2} = 1$ with $a > b$ is $\dfrac{2a^2}{b}$.`, key: 'c', sol: r`With $a^2 = 36$ and $b^2 = 20$, the latus rectum is $\dfrac{2b^2}{a} = \dfrac{40}{6} = \dfrac{20}{3}$, so A is true. But $\dfrac{2a^2}{b} = \dfrac{72}{\sqrt{20}}$ is a different number; the correct formula is $\dfrac{2b^2}{a}$, so R is false.`, d: 3, c: 'analysis', t: [1] }), (C) => {
  const E = new Ellipse(36, 20);
  C.assert(E.lrTex() === r`\dfrac{20}{3}` && E.lrOn() && E.B2.mul(2).div(6).eq(fr(20, 3)) && !fr(72).div(20).eq(fr(20, 3)) && kSqTex(fr(72, 20), 20) === r`\dfrac{36\sqrt{5}}{5}`, 'latus rectum 2b^2/a = 20/3 (end (4, 10/3) on the curve); 2a^2/b = 36 sqrt 5 / 5, not 20/3'); C.key('c');
});
Q('ar3', mk.ar({ a: r`The locus of a point $P$ for which $PS = \dfrac{3}{2} \, PL$, where $S$ is a fixed point and $L$ is the foot of the perpendicular from $P$ to a fixed line not through $S$, is an ellipse.`, r: r`The conic $PS = e \cdot PL$ is an ellipse only when $0 < e < 1$.`, key: 'd', sol: r`Here $e = \dfrac{3}{2} > 1$, so the locus is a hyperbola, not an ellipse: A is false. R is the correct condition for an ellipse, so R is true.`, d: 3, c: 'analysis', t: [2] }), (C) => {
  const c = fdConic([0, 0], [1, 0, -4], fr(9, 4)), d = fdConic([0, 0], [1, 0, -4], fr(1, 4));
  C.assert(quadKind(c) === 'hyperbola' && quadKind(d) === 'ellipse', 'e^2 = 9/4 gives B^2 - 4AC > 0 (hyperbola); e^2 = 1/4 gives < 0 (ellipse)'); C.key('d');
});
Q('ar4', mk.ar({ a: r`The ellipse $\dfrac{x^2}{100} + \dfrac{y^2}{36} = 1$ has eccentricity $\dfrac{4}{5}$.`, r: r`For every point $P$ of an ellipse with foci $S$ and $S'$, the sum $SP + S'P$ is the same.`, key: 'b', sol: r`Here $a = 10$, $b = 6$, $c = \sqrt{100 - 36} = 8$ and $e = \dfrac{8}{10} = \dfrac{4}{5}$: A is true. R is also true (the sum is $2a$), but it does not tell us how to find $e$; that comes from $c^2 = a^2 - b^2$. So R is not the explanation of A.`, d: 2, c: 'understanding', t: [2] }), (C) => {
  const E = new Ellipse(100, 36);
  C.assert(E.e.eq(fr(4, 5)) && E.c.eq(8) && E.verify() && E.A.mul(2).eq(20), 'e = 4/5; the focal sum is the constant 20 (720 sampled points)'); C.key('b');
});
Q('ar5', mk.ar({ a: r`The conjugate hyperbola of $\dfrac{x^2}{64} - \dfrac{y^2}{36} = 1$ has eccentricity $\dfrac{5}{3}$.`, r: r`If $e$ and $e'$ are the eccentricities of a hyperbola and of its conjugate hyperbola, then $\dfrac{1}{e^2} + \dfrac{1}{e'^2} = 1$.`, key: 'a', sol: r`For $\dfrac{x^2}{64} - \dfrac{y^2}{36} = 1$, $e^2 = 1 + \dfrac{36}{64} = \dfrac{25}{16}$, so $e = \dfrac{5}{4}$. Then $\dfrac{16}{25} + \dfrac{1}{e'^2} = 1$ gives $e'^2 = \dfrac{25}{9}$ and $e' = \dfrac{5}{3}$: A is true, and it follows from the relation in R, which is true.`, d: 3, c: 'application', t: [3] }), (C) => {
  const H = new Hyperbola(64, 36), Hc = H.conj();
  C.assert(H.verify() && Hc.verify() && H.e.eq(fr(5, 4)) && Hc.e.eq(fr(5, 3)) && fr(1).div(H.e2).add(fr(1).div(Hc.e2)).eq(1), 'e = 5/4, e\' = 5/3, 1/e^2 + 1/e\'^2 = 1'); C.key('a');
});
Q('ar6', mk.ar({ a: r`The locus of a point $P$ with $\lvert PA - PB \rvert = 10$, where $A$ is $(-13, 0)$ and $B$ is $(13, 0)$, is the hyperbola $\dfrac{x^2}{25} - \dfrac{y^2}{144} = 1$.`, r: r`For every point $P$ of the hyperbola $\dfrac{x^2}{a^2} - \dfrac{y^2}{b^2} = 1$ with foci $S$ and $S'$, the sum $SP + S'P$ equals $2a$.`, key: 'c', sol: r`The fixed points are $26$ apart, $2a = 10$ and $c = 13$, so $b^2 = 169 - 25 = 144$: A is true. But for a hyperbola it is the difference of the focal distances that is $2a$; for example $P(5, 0)$ gives $SP + S'P = 8 + 18 = 26$, not $10$. So R is false.`, d: 3, c: 'analysis', t: [4] }), (C) => {
  const H = new Hyperbola(25, 144), d = (x, y) => [Math.hypot(x - 13, y), Math.hypot(x + 13, y)];
  const [s1, s2] = d(5, 0);
  C.assert(H.verify() && H.c.eq(13) && Math.abs(Math.abs(s1 - s2) - 10) < 1e-9 && Math.abs(s1 + s2 - 26) < 1e-9 && s1 + s2 !== 10 && fr(169).sub(25).eq(144), 'the difference of focal distances is 10, but the sum at (5, 0) is 8 + 18 = 26'); C.key('c');
});
