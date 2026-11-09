// ISC 11 Mathematics ch14 Ellipse and Hyperbola - true-false, fill-blank, numerical and 2-mark short-answer items.
import { Q, mk } from './lib.mjs';
import { Ellipse, Hyperbola, fdConic, quadTex, fdGap, fr, sqrtF, sqTex, kSqTex, d2, P, pt, range } from './conic.mjs';

const r = String.raw;

// ============================================================ true-false
Q('tf1', mk.tf({ stem: r`In the ellipse $\dfrac{x^2}{9} + \dfrac{y^2}{16} = 1$ both foci are on the $x$-axis.`, key: 'f', sol: r`The larger denominator, $16$, is under $y^2$, so the major axis is along the $y$-axis and the foci are on the $y$-axis: $c^2 = 16 - 9 = 7$, foci $(0, \pm \sqrt{7})$. They would lie on the $x$-axis only if the larger denominator were under $x^2$.`, d: 2, c: 'understanding', t: [1], time: 45 }), (C) => {
  const E = new Ellipse(9, 16);
  C.assert(E.ax === 'y' && E.fociTex() === r`(0, \pm \sqrt{7})` && new Ellipse(16, 9).ax === 'x' && E.verify(), 'x^2/9 + y^2/16 = 1 has major axis along y and foci (0, +-sqrt 7)'); C.key('f');
});
Q('tf2', mk.tf({ stem: r`The distance between the two foci of an ellipse is always less than the length of its major axis.`, key: 't', sol: r`The foci are $(\pm ae, 0)$, so they are $2ae$ apart, while the major axis is $2a$. Since $0 < e < 1$, $2ae < 2a$. Equivalently $c^2 = a^2 - b^2 < a^2$.`, d: 2, c: 'understanding', t: [2], time: 45 }), (C) => {
  let ok = true;
  for (const p of range(1, 30)) for (const q of range(1, 30)) if (p !== q) { const E = new Ellipse(p, q); if (!(E.c2.lt(E.A2) && E.e2.lt(1))) ok = false; }
  C.assert(ok, 'for all 870 integer pairs (p, q) with p != q up to 30, c^2 < a^2 and e < 1'); C.key('t');
});
Q('tf3', mk.tf({ stem: r`The hyperbola $\dfrac{x^2}{25} - \dfrac{y^2}{49} = 1$ and its conjugate hyperbola $-\dfrac{x^2}{25} + \dfrac{y^2}{49} = 1$ have the same asymptotes.`, key: 't', sol: r`The asymptotes come from replacing the right-hand side $1$ by $0$: both equations give $\dfrac{x^2}{25} = \dfrac{y^2}{49}$, that is $y = \pm \dfrac{7}{5}x$. A hyperbola and its conjugate always share their asymptotes.`, d: 2, c: 'understanding', t: [3], time: 50 }), (C) => {
  const H = new Hyperbola(25, 49), Hc = H.conj();
  C.assert(H.verify() && Hc.verify() && H.slope2().eq(fr(49, 25)) && Hc.slope2().eq(fr(49, 25)) && !new Hyperbola(25, 16).slope2().eq(H.slope2()), 'both have slope^2 = 49/25 (y = +-7x/5); an unrelated hyperbola does not'); C.key('t');
});
Q('tf4', mk.tf({ stem: r`The eccentricity of a rectangular hyperbola is $2$.`, key: 'f', sol: r`For a rectangular hyperbola $b = a$, so $e^2 = 1 + \dfrac{b^2}{a^2} = 2$ and $e = \sqrt{2}$, not $2$. (An eccentricity of $2$ would need $b^2 = 3a^2$.)`, d: 1, c: 'recall', t: [3], time: 40 }), (C) => {
  C.assert(range(1, 12).every((a) => new Hyperbola(a * a, a * a).e2.eq(2)) && new Hyperbola(1, 3).e.eq(2), 'a = b gives e^2 = 2 for every a tested; e = 2 needs b^2 = 3a^2'); C.key('f');
});
Q('tf5', mk.tf({ stem: r`Two fixed points $A$ and $B$ are $10$ units apart. There is a point $P$ for which $\lvert PA - PB \rvert = 12$.`, key: 'f', sol: r`In triangle $PAB$, the triangle inequality gives $\lvert PA - PB \rvert \le AB = 10$ (equality only on the line $AB$ outside the segment). A difference of $12$ is greater than $10$, so no such point exists.`, d: 3, c: 'analysis', t: [4], time: 60 }), (C) => {
  let worst = 0;
  for (let xi = -80; xi <= 80; xi++) for (let yi = -80; yi <= 80; yi++) { const x = xi / 2, y = yi / 2; worst = Math.max(worst, Math.abs(Math.hypot(x + 5, y) - Math.hypot(x - 5, y))); }
  C.assert(worst <= 10 + 1e-9 && worst > 9.9, 'on an 81 x 81 grid |PA - PB| never exceeds AB = 10 (the maximum found is 10)'); C.key('f');
});

// ============================================================ fill-blank
Q('fb1', mk.fill({ stem: r`The major axis of the ellipse $5x^2 + 9y^2 = 45$ has length ____ units.`, acc: [['6']], sol: r`Dividing by $45$ gives $\dfrac{x^2}{9} + \dfrac{y^2}{5} = 1$, so $a = 3$ and the major axis is $2a = 6$.`, d: 2, c: 'understanding', t: [1], time: 50 }), (C) => {
  const E = new Ellipse(9, 5);
  C.assert(E.ax === 'x' && E.A.eq(3) && E.A.mul(2).eq(6) && E.verify(), 'x^2/9 + y^2/5 = 1: major axis 6'); C.blank(6);
});
Q('fb2', mk.fill({ stem: r`The latus rectum of the ellipse $\dfrac{x^2}{25} + \dfrac{y^2}{16} = 1$ has length ____ units.`, acc: [['32/5', '6.4']], sol: r`The latus rectum is $\dfrac{2b^2}{a} = \dfrac{2 \times 16}{5} = \dfrac{32}{5} = 6.4$.`, d: 2, c: 'understanding', t: [1], time: 50 }), (C) => {
  const E = new Ellipse(25, 16);
  C.assert(E.lrTex() === r`\dfrac{32}{5}` && E.lrOn() && fr(32, 5).num() === 6.4, 'latus rectum 2b^2/a = 32/5 = 6.4 (end (3, 16/5) on the curve)'); C.blank(6.4);
});
Q('fb3', mk.fill({ stem: r`The directrices of the hyperbola $\dfrac{x^2}{81} - \dfrac{y^2}{19} = 1$ are the lines $x = \pm$ ____.`, acc: [['8.1', '81/10']], sol: r`Here $a^2 = 81$, $b^2 = 19$, $c^2 = 100$, so $c = 10$. The directrices are $x = \pm \dfrac{a^2}{c} = \pm \dfrac{81}{10} = \pm 8.1$.`, d: 3, c: 'application', t: [3], time: 70 }), (C) => {
  const H = new Hyperbola(81, 19);
  C.assert(H.verify() && H.c.eq(10) && H.e.eq(fr(10, 9)) && H.dirTex() === r`x = \pm \dfrac{81}{10}` && fr(81, 10).num() === 8.1 && fr(9).div(fr(10, 9)).eq(fr(81, 10)), 'c = 10, a/e = 9 / (10/9) = 81/10 = 8.1'); C.blank(8.1);
});
Q('fb4', mk.fill({ stem: r`$S$ and $S'$ are the foci of an ellipse whose major axis has length $20$. A point $P$ of the ellipse has $SP = 7$. Then $S'P =$ ____.`, acc: [['13']], sol: r`By the focal property $SP + S'P = 2a = 20$, so $S'P = 20 - 7 = 13$.`, d: 1, c: 'recall', t: [2], time: 40 }), (C) => {
  const E = new Ellipse(100, 36);
  C.assert(E.verify() && E.A.mul(2).eq(20) && fr(20).sub(7).eq(13) && fr(10).sub(fr(4, 5).mul(fr(15, 4))).eq(7) && fr(10).add(fr(4, 5).mul(fr(15, 4))).eq(13), 'with a = 10, e = 4/5, SP = 7 at x = 15/4 and S\'P = 13'); C.blank(13);
});
Q('fb5', mk.fill({ stem: r`For every point $P$ of the hyperbola $\dfrac{x^2}{49} - \dfrac{y^2}{576} = 1$ with foci $S$ and $S'$, $\lvert SP - S'P \rvert =$ ____.`, acc: [['14']], sol: r`For a hyperbola $\lvert SP - S'P \rvert = 2a$. Here $a^2 = 49$, so $a = 7$ and the difference is $2a = 14$.`, d: 1, c: 'recall', t: [4], time: 40 }), (C) => {
  const H = new Hyperbola(49, 576);
  C.assert(H.verify() && H.c.eq(25) && H.T.mul(2).eq(14), 'a = 7, c = 25; |SP - S\'P| = 14 (verified at 50 sampled points)'); C.blank(14);
});

// ============================================================ numerical
Q('n1', mk.num({ stem: r`The ellipse $\dfrac{x^2}{225} + \dfrac{y^2}{81} = 1$ has two foci. Find the distance between them.`, value: 24, unit: null, sol: r`$c^2 = a^2 - b^2 = 225 - 81 = 144$, so $c = 12$. The foci $(\pm 12, 0)$ are $2c = 24$ apart.`, scheme: [['$c = 12$, so the foci are $24$ apart', 1]], marks: 1, d: 2, c: 'understanding', t: [1], time: 60 }), (C) => {
  const E = new Ellipse(225, 81);
  C.assert(E.verify() && E.c.eq(12) && E.c.mul(2).eq(24) && E.e.eq(fr(4, 5)), 'c = 12, foci 24 apart'); C.val(24);
});
Q('n2', mk.num({ stem: r`The two foci of an ellipse are $6$ units apart, and the sum of the distances of any point of the ellipse from them is $10$. Find the length of its minor axis.`, value: 8, unit: null, sol: r`$2a = 10$ gives $a = 5$ and $2c = 6$ gives $c = 3$. Then $b^2 = a^2 - c^2 = 25 - 9 = 16$, $b = 4$, and the minor axis is $2b = 8$.`, scheme: [['$a = 5$, $c = 3$, so $b = 4$ and $2b = 8$', 1]], marks: 1, d: 3, c: 'application', t: [2], time: 80 }), (C) => {
  const E = new Ellipse(25, 16);
  C.assert(E.verify() && E.A.eq(5) && E.c.eq(3) && E.c.mul(2).eq(6) && E.B.mul(2).eq(8), 'a = 5, c = 3, b = 4: minor axis 8'); C.val(8);
});
Q('n3', mk.num({ stem: r`Find the distance between the two directrices of the hyperbola $\dfrac{x^2}{36} - \dfrac{y^2}{64} = 1$.`, value: 7.2, unit: null, sol: r`$c^2 = 36 + 64 = 100$, so $c = 10$. The directrices are $x = \pm \dfrac{a^2}{c} = \pm \dfrac{36}{10} = \pm 3.6$, so the distance between them is $2 \times 3.6 = 7.2$.`, scheme: [['Directrices $x = \\pm 3.6$, distance $7.2$', 1]], marks: 1, d: 3, c: 'application', t: [3], time: 80 }), (C) => {
  const H = new Hyperbola(36, 64);
  C.assert(H.verify() && H.c.eq(10) && fr(36).div(10).eq(fr(18, 5)) && fr(36).div(10).mul(2).num() === 7.2 && H.dirTex() === r`x = \pm \dfrac{18}{5}`, 'directrices x = +-3.6, distance 7.2'); C.val(7.2);
});
Q('n4', mk.num({ stem: r`The rectangular hyperbola $x^2 - y^2 = 50$ has two foci. Find the distance between them.`, value: 20, unit: null, sol: r`Here $a^2 = b^2 = 50$, so $c^2 = a^2 + b^2 = 100$ and $c = 10$. The foci $(\pm 10, 0)$ are $2c = 20$ apart.`, scheme: [['$c = 10$, so the foci are $20$ apart', 1]], marks: 1, d: 2, c: 'understanding', t: [3], time: 60 }), (C) => {
  const H = new Hyperbola(50, 50);
  C.assert(H.verify() && H.c.eq(10) && H.e2.eq(2) && H.c.mul(2).eq(20), 'c = 10, foci 20 apart'); C.val(20);
});
Q('n5', mk.num({ stem: r`$S$ and $S'$ are the foci of a hyperbola whose transverse axis has length $18$. A point $P$ on the branch nearer to $S$ is $8$ units from $S$. Find $S'P$.`, value: 26, unit: null, sol: r`On the branch nearer to $S$, $S'P - SP = 2a = 18$, so $S'P = 8 + 18 = 26$.`, scheme: [['$S\'P - SP = 18$, so $S\'P = 26$', 1]], marks: 1, d: 2, c: 'understanding', t: [4], time: 60 }), (C) => {
  const H = new Hyperbola(81, 144);
  C.assert(H.verify() && H.T.mul(2).eq(18) && fr(8).add(18).eq(26) && fr(5, 3).mul(fr(51, 5)).sub(9).eq(8) && fr(5, 3).mul(fr(51, 5)).add(9).eq(26), 'a = 9, e = 5/3: x = 51/5 gives SP = 8 and S\'P = 26'); C.val(26);
});
Q('n6', mk.num({ stem: r`$S$ is the focus $(8, 0)$ of the ellipse $\dfrac{x^2}{100} + \dfrac{y^2}{36} = 1$ and $S'$ is the other focus. A point $P$ of the ellipse has $S'P = 3 \times SP$. Find the $x$-coordinate of $P$.`, value: 6.25, unit: null, sol: r`$SP + S'P = 2a = 20$ and $S'P = 3SP$ give $SP = 5$. With $e = \dfrac{4}{5}$, $SP = a - ex = 10 - \dfrac{4}{5}x = 5$, so $x = \dfrac{25}{4} = 6.25$.`, scheme: [['$SP = 5$ from the focal property', 1]], marks: 1, d: 4, c: 'application', t: [2], time: 120 }), (C) => {
  const E = new Ellipse(100, 36), x = fr(25, 4), y2 = fr(36).mul(fr(1).sub(x.mul(x).div(100)));
  C.assert(E.verify() && E.e.eq(fr(4, 5)) && E.onSq(x.mul(x), y2) && y2.sign() > 0 && fr(8).sub(x).mul(fr(8).sub(x)).add(y2).eq(25) && x.add(8).mul(x.add(8)).add(y2).eq(225), 'x = 25/4: SP^2 = 25, S\'P^2 = 225, so S\'P = 15 = 3 SP'); C.val(6.25);
});

// ============================================================ short, 2 marks
{
  const E = new Ellipse(7, 9);
  Q('s201', mk.short({ marks: 2, stem: r`Find the eccentricity and the foci of the ellipse $9x^2 + 7y^2 = 63$.`, model: r`Dividing by $63$: $\dfrac{x^2}{7} + \dfrac{y^2}{9} = 1$. The larger denominator, $9$, is under $y^2$, so the major axis is along the $y$-axis, with semi-major axis $3$ and $c^2 = 9 - 7 = 2$. Then $e = \dfrac{c}{3} = \dfrac{\sqrt{2}}{3}$ and the foci are $(0, \pm \sqrt{2})$.`, sol: 'Divide by the constant first, then compare the denominators.', scheme: [['$\\dfrac{x^2}{7} + \\dfrac{y^2}{9} = 1$, major axis along the $y$-axis', 1], ['$e = \\dfrac{\\sqrt{2}}{3}$ and foci $(0, \\pm \\sqrt{2})$', 1]], d: 2, c: 'understanding', t: [1], time: 100 }), (C) => {
    C.assert(E.verify() && E.ax === 'y' && E.c2.eq(2) && E.eTex() === r`\dfrac{\sqrt{2}}{3}` && E.fociTex() === r`(0, \pm \sqrt{2})`, 'x^2/7 + y^2/9 = 1: c^2 = 2, e = sqrt 2 / 3, foci (0, +-sqrt 2)'); C.model([63, 7, 9, 2, 3]);
  });
}
{
  const E = new Ellipse(49, 33);
  Q('s202', mk.short({ marks: 2, stem: r`Find the equation of the ellipse with centre at the origin, foci $(\pm 4, 0)$ and major axis of length $14$.`, model: r`$2a = 14$ gives $a = 7$, and the foci give $c = 4$. Then $b^2 = a^2 - c^2 = 49 - 16 = 33$, so the ellipse is $\dfrac{x^2}{49} + \dfrac{y^2}{33} = 1$.`, sol: 'Use $b^2 = a^2 - c^2$.', scheme: [['$a = 7$, $c = 4$, $b^2 = 49 - 16 = 33$', 1], ['$\\dfrac{x^2}{49} + \\dfrac{y^2}{33} = 1$', 1]], d: 2, c: 'application', t: [1], time: 100 }), (C) => {
    C.assert(E.verify() && E.c.eq(4) && E.A.mul(2).eq(14) && E.B2.eq(33) && E.ax === 'x', 'foci (+-4, 0), major axis 14: b^2 = 33'); C.model([14, 7, 4, 49, 16, 33]);
  });
}
{
  const E = new Ellipse(16, 7);
  Q('s203', mk.short({ marks: 2, stem: r`Find the equations of the directrices and the length of the latus rectum of the ellipse $7x^2 + 16y^2 = 112$.`, model: r`Dividing by $112$: $\dfrac{x^2}{16} + \dfrac{y^2}{7} = 1$, so $a = 4$, $b^2 = 7$, $c^2 = 9$, $c = 3$ and $e = \dfrac{3}{4}$. The directrices are $x = \pm \dfrac{a}{e} = \pm \dfrac{16}{3}$ and the latus rectum is $\dfrac{2b^2}{a} = \dfrac{7}{2}$.`, sol: 'The directrices are at $\\pm \\dfrac{a}{e}$ along the major axis.', scheme: [['$a = 4$, $e = \\dfrac{3}{4}$, directrices $x = \\pm \\dfrac{16}{3}$', 1], ['Latus rectum $\\dfrac{7}{2}$', 1]], d: 2, c: 'understanding', t: [1], time: 100 }), (C) => {
    C.assert(E.verify() && E.c.eq(3) && E.e.eq(fr(3, 4)) && E.dirTex() === r`x = \pm \dfrac{16}{3}` && E.lrTex() === r`\dfrac{7}{2}` && fr(4).div(fr(3, 4)).eq(fr(16, 3)), 'x^2/16 + y^2/7 = 1: e = 3/4, directrices +-16/3, latus rectum 7/2'); C.model([112, 16, 7, 9, 3, 4, 16, 2]);
  });
}
{
  const E = new Ellipse(9, 25);
  Q('s204', mk.short({ marks: 2, stem: r`An ellipse has its centre at the origin and its major axis along the $y$-axis. Its minor axis has length $6$ and it passes through the point $\left(\dfrac{9}{5}, 4\right)$. Find its equation.`, model: r`The minor axis $2b = 6$ gives the $x$-denominator $3^2 = 9$, so the ellipse is $\dfrac{x^2}{9} + \dfrac{y^2}{q} = 1$ with $q > 9$. Substituting $\left(\dfrac{9}{5}, 4\right)$: $\dfrac{81/25}{9} + \dfrac{16}{q} = 1$, so $\dfrac{9}{25} + \dfrac{16}{q} = 1$ and $q = 25$. The equation is $\dfrac{x^2}{9} + \dfrac{y^2}{25} = 1$.`, sol: 'The minor axis fixes one denominator; the point fixes the other.', scheme: [['$\\dfrac{x^2}{9} + \\dfrac{y^2}{q} = 1$ with the point substituted', 1], ['$q = 25$ and the equation', 1]], d: 3, c: 'application', t: [1], time: 120 }), (C) => {
    C.assert(E.verify() && E.ax === 'y' && E.on(fr(9, 5), 4) && E.B.mul(2).eq(6) && fr(81, 25).div(9).eq(fr(9, 25)) && fr(16).div(25).eq(fr(1).sub(fr(9, 25))), 'x^2/9 + y^2/25 = 1 passes through (9/5, 4); minor axis 6'); C.model([6, 9, 5, 4, 81, 25, 16]);
  });
}
{
  const E = new Ellipse(36, 32);
  Q('s205', mk.short({ marks: 2, stem: r`Find the foci of the ellipse $8x^2 + 9y^2 = 288$ and the coordinates of the ends of the latus rectum through the focus on the positive $x$-axis.`, model: r`Dividing by $288$: $\dfrac{x^2}{36} + \dfrac{y^2}{32} = 1$, so $a = 6$, $b^2 = 32$, $c^2 = 4$ and the foci are $(\pm 2, 0)$. At $x = 2$: $\dfrac{4}{36} + \dfrac{y^2}{32} = 1$, so $y^2 = 32 \times \dfrac{8}{9} = \dfrac{256}{9}$ and $y = \pm \dfrac{16}{3}$. The ends are $\left(2, \dfrac{16}{3}\right)$ and $\left(2, -\dfrac{16}{3}\right)$.`, sol: 'The latus rectum through the focus $(c, 0)$ has the points with $x = c$.', scheme: [['Foci $(\\pm 2, 0)$', 1], ['Ends $\\left(2, \\pm \\dfrac{16}{3}\\right)$', 1]], d: 3, c: 'understanding', t: [1], time: 110 }), (C) => {
    C.assert(E.verify() && E.c.eq(2) && E.on(2, fr(16, 3)) && E.on(2, fr(-16, 3)) && E.lrEndsTex() === r`(\pm 2, \pm \dfrac{16}{3})` && E.lrTex() === r`\dfrac{32}{3}`, 'foci (+-2, 0); ends (2, +-16/3) on the ellipse'); C.model([288, 36, 32, 4, 2, 8, 9, 256, 16, 3]);
  });
}
{
  const c = fdConic([0, -3], [0, 1, 12], fr(1, 4)), E = new Ellipse(27, 36);
  Q('s206', mk.short({ marks: 2, stem: r`Find the equation of the ellipse whose focus is $(0, -3)$, whose directrix is the line $y = -12$ and whose eccentricity is $\dfrac{1}{2}$.`, model: r`Let $P(x, y)$ be a point of the ellipse. Then $PS^2 = x^2 + (y + 3)^2$ and $PL^2 = (y + 12)^2$, and $PS = \dfrac{1}{2} PL$ gives $4\left[x^2 + (y + 3)^2\right] = (y + 12)^2$. So $4x^2 + 4y^2 + 24y + 36 = y^2 + 24y + 144$, that is $4x^2 + 3y^2 = 108$, or $\dfrac{x^2}{27} + \dfrac{y^2}{36} = 1$.`, sol: 'Square $PS = e \\cdot PL$ and collect the terms.', scheme: [['$4\\left[x^2 + (y + 3)^2\\right] = (y + 12)^2$', 1], ['$4x^2 + 3y^2 = 108$', 1]], d: 3, c: 'application', t: [2], time: 120 }), (C) => {
    C.assert(quadTex(c) === '4x^2 + 3y^2 - 108 = 0' && E.verify() && E.fociTex() === r`(0, \pm 3)` && fdGap(c, 0, -6).isZero() && fdGap(c, 0, 6).isZero() && fdGap(c, fr(9, 2), -3).isZero() && !fdGap(c, 0, 0).isZero(), '4x^2 + 3y^2 = 108: the vertices (0, +-6) and the latus rectum end (9/2, -3) satisfy PS = e PL; the centre does not'); C.assert(E.on(0, 6) && E.on(0, -6) && fr(27).mul(4).eq(108) && fr(36).mul(3).eq(108) && fr(3).div(6).eq(fr(1, 2)), 'x^2/27 + y^2/36 = 1; PS : PL = 1 : 2 at (0, -6)'); C.model([4, 3, 12, 36, 24, 144, 108, 27]);
  });
}
{
  const E = new Ellipse(25, 16), PS = fr(16, 5), PS2 = fr(34, 5);
  Q('s207', mk.short({ marks: 2, stem: r`The foci of an ellipse are $S(3, 0)$ and $S'(-3, 0)$ and its major axis has length $10$. Using the focal property, show that the point $P\left(3, \dfrac{16}{5}\right)$ lies on the ellipse.`, model: r`With $S(3, 0)$ and $P\left(3, \dfrac{16}{5}\right)$ on the same vertical line, $SP = \dfrac{16}{5}$. $S'P = \sqrt{6^2 + \left(\dfrac{16}{5}\right)^2} = \sqrt{\dfrac{900 + 256}{25}} = \sqrt{\dfrac{1156}{25}} = \dfrac{34}{5}$. Then $SP + S'P = \dfrac{16}{5} + \dfrac{34}{5} = 10 = 2a$, so $P$ is on the ellipse.`, sol: 'A point is on the ellipse exactly when the focal distances add up to $2a$.', scheme: [['$SP = \\dfrac{16}{5}$ and $S\'P = \\dfrac{34}{5}$', 1], ['Sum $= 10 = 2a$', 1]], d: 3, c: 'application', t: [2], time: 120 }), (C) => {
    C.assert(E.on(3, fr(16, 5)) && sqrtF(d2(P(3, 0), [fr(3), fr(16, 5)])).eq(PS) && sqrtF(d2(P(-3, 0), [fr(3), fr(16, 5)])).eq(PS2) && PS.add(PS2).eq(10) && fr(900 + 256, 25).eq(fr(1156, 25)) && sqrtF(1156).eq(34), 'SP = 16/5, S\'P = 34/5, sum 10 = 2a; (3, 16/5) satisfies x^2/25 + y^2/16 = 1'); C.model([3, 16, 5, 6, 900, 256, 1156, 25, 34, 10]);
  });
}
{
  const H = new Hyperbola(25, 11);
  Q('s208', mk.short({ marks: 2, stem: r`Find the foci and the eccentricity of the hyperbola $11x^2 - 25y^2 = 275$.`, model: r`Dividing by $275$: $\dfrac{x^2}{25} - \dfrac{y^2}{11} = 1$. The positive term is in $x$, so the foci are on the $x$-axis, with $a^2 = 25$, $b^2 = 11$ and $c^2 = a^2 + b^2 = 36$, so $c = 6$. The foci are $(\pm 6, 0)$ and $e = \dfrac{c}{a} = \dfrac{6}{5}$.`, sol: 'For a hyperbola $c^2 = a^2 + b^2$.', scheme: [['$\\dfrac{x^2}{25} - \\dfrac{y^2}{11} = 1$ and $c^2 = 36$', 1], ['Foci $(\\pm 6, 0)$ and $e = \\dfrac{6}{5}$', 1]], d: 2, c: 'understanding', t: [3], time: 100 }), (C) => {
    C.assert(H.verify() && H.c.eq(6) && H.e.eq(fr(6, 5)) && H.fociTex() === r`(\pm 6, 0)` && fr(275).div(11).eq(25) && fr(275).div(25).eq(11), 'x^2/25 - y^2/11 = 1: c = 6, e = 6/5'); C.model([275, 25, 11, 36, 6, 5]);
  });
}
{
  const H = new Hyperbola(36, 64, 'y');
  Q('s209', mk.short({ marks: 2, stem: r`Find the equation of the hyperbola with centre at the origin, foci $(0, \pm 10)$ and transverse axis of length $12$.`, model: r`The foci are on the $y$-axis, so the transverse axis is along the $y$-axis. $2 \times 6 = 12$ gives the semi-transverse axis $6$, and $c = 10$, so the other square is $c^2 - 6^2 = 100 - 36 = 64$. The equation is $\dfrac{y^2}{36} - \dfrac{x^2}{64} = 1$.`, sol: 'Here $c^2 = 36 + b^2$ for the semi-transverse axis $6$.', scheme: [['Transverse axis along $y$; $36$ and $c = 10$', 1], ['$\\dfrac{y^2}{36} - \\dfrac{x^2}{64} = 1$', 1]], d: 2, c: 'application', t: [3], time: 100 }), (C) => {
    C.assert(H.verify() && H.ax === 'y' && H.c.eq(10) && H.T.mul(2).eq(12) && H.C2.eq(64) && H.eq() === r`\dfrac{y^2}{36} - \dfrac{x^2}{64} = 1`, 'foci (0, +-10), transverse axis 12: y^2/36 - x^2/64 = 1'); C.model([2, 6, 12, 10, 100, 36, 64]);
  });
}
{
  const H = new Hyperbola(4, 45);
  Q('s210', mk.short({ marks: 2, stem: r`Find the locus of a point $P$ such that $\lvert PA - PB \rvert = 4$, where $A$ is $(-7, 0)$ and $B$ is $(7, 0)$.`, model: r`$AB = 14 > 4$, so the locus is a hyperbola with foci $A$, $B$ and centre at the origin. $2a = 4$ gives $a = 2$ and $c = 7$, so $b^2 = c^2 - a^2 = 49 - 4 = 45$. The locus is $\dfrac{x^2}{4} - \dfrac{y^2}{45} = 1$.`, sol: 'The difference $2a$ is less than the distance $2c$ between the fixed points.', scheme: [['$2a = 4$, $c = 7$, so $b^2 = 49 - 4 = 45$', 1], ['$\\dfrac{x^2}{4} - \\dfrac{y^2}{45} = 1$', 1]], d: 2, c: 'application', t: [4], time: 100 }), (C) => {
    C.assert(H.verify() && H.c.eq(7) && H.T.mul(2).eq(4) && H.C2.eq(45) && H.e.eq(fr(7, 2)), 'a = 2, c = 7: b^2 = 45; |PA - PB| = 4 at 50 sampled points (verify)'); C.model([14, 4, 2, 7, 49, 45]);
  });
}
