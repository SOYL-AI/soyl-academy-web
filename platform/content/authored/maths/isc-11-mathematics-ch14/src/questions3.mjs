// ISC 11 Mathematics ch14 Ellipse and Hyperbola - 3-mark short-answer and 5-mark long-answer items.
import { Q, mk } from './lib.mjs';
import { Ellipse, Hyperbola, fdConic, quadTex, quadAt, quadKind, fdGap, fr, sqrtF, sqTex, kSqTex, d2, P, solve2 } from './conic.mjs';

const r = String.raw;
const near = (u, v) => Math.abs(u - v) < 1e-9;

// ============================================================ short, 3 marks
{
  const sol = solve2(36, 16, 1, 64, 9, 1), E = new Ellipse(100, 25);
  Q('s301', mk.short({ marks: 3, stem: r`The axes of an ellipse lie along the coordinate axes and its centre is the origin. The points $(6, 4)$ and $(8, 3)$ are on the curve. Determine the equation of the ellipse and the value of $e$.`, model: r`Let the ellipse be $\dfrac{x^2}{a^2} + \dfrac{y^2}{b^2} = 1$ and put $u = \dfrac{1}{a^2}$, $v = \dfrac{1}{b^2}$. Then $36u + 16v = 1$ and $64u + 9v = 1$. Multiplying by $9$ and by $16$: $324u + 144v = 9$ and $1024u + 144v = 16$, so $700u = 7$, $u = \dfrac{1}{100}$, and then $16v = 1 - \dfrac{36}{100} = \dfrac{16}{25}$, $v = \dfrac{1}{25}$. The ellipse is $\dfrac{x^2}{100} + \dfrac{y^2}{25} = 1$. Here $a > b$, so $25 = 100(1 - e^2)$, $e^2 = \dfrac{3}{4}$ and $e = \dfrac{\sqrt{3}}{2}$.`, sol: 'Two points give two linear equations in $\\dfrac{1}{a^2}$ and $\\dfrac{1}{b^2}$.', scheme: [['$36u + 16v = 1$ and $64u + 9v = 1$', 1], ['$u = \\dfrac{1}{100}$, $v = \\dfrac{1}{25}$: $\\dfrac{x^2}{100} + \\dfrac{y^2}{25} = 1$', 1], ['$e = \\dfrac{\\sqrt{3}}{2}$', 1]], d: 3, c: 'application', t: [1], time: 180 }), (C) => {
    C.assert(sol.map(String).join() === '1/100,1/25' && E.verify() && E.on(6, 4) && E.on(8, 3) && E.eTex() === r`\dfrac{\sqrt{3}}{2}` && fr(36).mul(9).eq(324) && fr(64).mul(16).eq(1024) && fr(1024 - 324).eq(700), 'u = 1/100, v = 1/25; both points on x^2/100 + y^2/25 = 1; e = sqrt 3 / 2'); C.model([36, 16, 64, 9, 324, 144, 1024, 700, 100, 25, 3, 4]);
  });
}
{
  const E = new Ellipse(45, 81);
  Q('s302', mk.short({ marks: 3, stem: r`The foci of an ellipse lie on the $y$-axis and its centre is at the origin. The eccentricity is $\dfrac{2}{3}$ and the latus rectum has length $10$. Find the equation of the ellipse.`, model: r`Let the ellipse be $\dfrac{x^2}{a^2} + \dfrac{y^2}{b^2} = 1$ with $b > a$ (foci on the $y$-axis). With $e = \dfrac{2}{3}$, $a^2 = b^2(1 - e^2) = \dfrac{5}{9}b^2$, and the latus rectum is $\dfrac{2a^2}{b} = \dfrac{10b}{9} = 10$, so $b = 9$ and $b^2 = 81$. Then $a^2 = \dfrac{5}{9} \times 81 = 45$. The equation is $\dfrac{x^2}{45} + \dfrac{y^2}{81} = 1$.`, sol: 'With the foci on the $y$-axis the latus rectum is $\\dfrac{2a^2}{b}$.', scheme: [['$a^2 = \\dfrac{5}{9}b^2$', 1], ['$\\dfrac{2a^2}{b} = 10$ gives $b = 9$', 1], ['$a^2 = 45$: $\\dfrac{x^2}{45} + \\dfrac{y^2}{81} = 1$', 1]], d: 3, c: 'application', t: [1], time: 170 }), (C) => {
    C.assert(E.verify() && E.ax === 'y' && E.e.eq(fr(2, 3)) && E.lrTex() === '10' && E.lrOn() && fr(5, 9).mul(81).eq(45) && fr(10).mul(9).div(10).eq(9), 'x^2/45 + y^2/81 = 1: e = 2/3, latus rectum 10'); C.model([2, 3, 10, 5, 9, 81, 45]);
  });
}
{
  const E = new Ellipse(16, 12);
  Q('s303', mk.short({ marks: 3, stem: r`For the ellipse $3x^2 + 4y^2 = 48$, write down the vertices, the ends of the minor axis, the foci and the eccentricity.`, model: r`Dividing by $48$: $\dfrac{x^2}{16} + \dfrac{y^2}{12} = 1$, so $a = 4$ and $b^2 = 12$, $b = 2\sqrt{3}$. The vertices are $(\pm 4, 0)$ and the ends of the minor axis are $(0, \pm 2\sqrt{3})$. Then $c^2 = 16 - 12 = 4$, $c = 2$, so the foci are $(\pm 2, 0)$ and $e = \dfrac{c}{a} = \dfrac{1}{2}$.`, sol: 'Read $a$ and $b$ after dividing by $48$.', scheme: [['Standard form; vertices $(\\pm 4, 0)$', 1], ['Ends of the minor axis $(0, \\pm 2\\sqrt{3})$', 1], ['Foci $(\\pm 2, 0)$ and $e = \\dfrac{1}{2}$', 1]], d: 2, c: 'understanding', t: [1], time: 130 }), (C) => {
    C.assert(E.verify() && E.verticesTex() === r`(\pm 4, 0)` && E.minorEndsTex() === r`(0, \pm 2\sqrt{3})` && E.fociTex() === r`(\pm 2, 0)` && E.e.eq(fr(1, 2)), 'x^2/16 + y^2/12 = 1: vertices (+-4, 0), minor ends (0, +-2 sqrt 3), foci (+-2, 0), e = 1/2'); C.model([48, 16, 12, 4, 2, 3]);
  });
}
{
  const c = fdConic([0, 0], [1, 1, -4], fr(1, 4));
  Q('s304', mk.short({ marks: 3, stem: r`Find the equation of the conic whose focus is the origin, whose directrix is the line $x + y = 4$ and whose eccentricity is $\dfrac{1}{2}$. Show that it passes through the point $(-2, -2)$.`, model: r`Let $P(x, y)$ be on the conic. Then $PS^2 = x^2 + y^2$ and $PL^2 = \dfrac{(x + y - 4)^2}{2}$. $PS = \dfrac{1}{2}PL$ gives $x^2 + y^2 = \dfrac{(x + y - 4)^2}{8}$, so $8x^2 + 8y^2 = x^2 + y^2 + 2xy + 16 - 8x - 8y$, that is $7x^2 - 2xy + 7y^2 + 8x + 8y - 16 = 0$. At $(-2, -2)$: $28 - 8 + 28 - 16 - 16 - 16 = 0$, so the point lies on the conic.`, sol: 'The $xy$ term appears because the directrix slants.', scheme: [['$8(x^2 + y^2) = (x + y - 4)^2$', 1], ['$7x^2 - 2xy + 7y^2 + 8x + 8y - 16 = 0$', 1], ['Substitution of $(-2, -2)$ gives $0$', 1]], d: 4, c: 'application', t: [2], time: 190 }), (C) => {
    C.assert(quadTex(c) === '7x^2 - 2xy + 7y^2 + 8x + 8y - 16 = 0' && quadKind(c) === 'ellipse' && quadAt(c, -2, -2).isZero() && fdGap(c, -2, -2).isZero() && fdGap(c, fr(2, 3), fr(2, 3)).isZero() && 28 - 8 + 28 - 16 - 16 - 16 === 0 && !quadAt(c, 0, 0).isZero(), 'the conic passes through (-2, -2) and (2/3, 2/3) with PS = (1/2) PL; it is an ellipse'); C.model([4, 2, 8, 7, 16, 28]);
  });
}
{
  const E = new Ellipse(81, 56);
  Q('s305', mk.short({ marks: 3, stem: r`The sum of the distances of a point $P$ from $A(-5, 0)$ and from $B(5, 0)$ is $18$. Find the equation of the curve traced by $P$ and its eccentricity.`, model: r`$AB = 10 < 18$, so $P$ traces an ellipse with foci $A$ and $B$ and centre at the origin. Then $2a = 18$, $a = 9$ and $c = 5$, so $b^2 = a^2 - c^2 = 81 - 25 = 56$. The equation is $\dfrac{x^2}{81} + \dfrac{y^2}{56} = 1$ and the eccentricity is $e = \dfrac{c}{a} = \dfrac{5}{9}$.`, sol: 'The constant sum is $2a$ and half the distance between the fixed points is $c$.', scheme: [['Ellipse with foci $A$, $B$: $a = 9$, $c = 5$', 1], ['$b^2 = 81 - 25 = 56$ and the equation', 1], ['$e = \\dfrac{5}{9}$', 1]], d: 3, c: 'application', t: [2], time: 150 }), (C) => {
    C.assert(E.verify() && E.A.eq(9) && E.c.eq(5) && E.B2.eq(56) && E.e.eq(fr(5, 9)), 'a = 9, c = 5, b^2 = 56, e = 5/9 (PA + PB = 18 verified at 720 points)'); C.model([10, 18, 9, 5, 81, 25, 56]);
  });
}
{
  const E = new Ellipse(45, 36), x = 5, y2 = fr(16);
  Q('s306', mk.short({ marks: 3, stem: r`The point $P(5, 4)$ lies on the ellipse $\dfrac{x^2}{45} + \dfrac{y^2}{36} = 1$. Find its distances from the two foci and verify that their sum equals the length of the major axis.`, model: r`Here $a^2 = 45$, $b^2 = 36$ and $c^2 = 9$, so the foci are $S(3, 0)$ and $S'(-3, 0)$. Then $SP^2 = (5 - 3)^2 + 4^2 = 20$, so $SP = 2\sqrt{5}$, and $S'P^2 = (5 + 3)^2 + 4^2 = 80$, so $S'P = 4\sqrt{5}$. The sum is $6\sqrt{5}$, and the major axis is $2a = 2\sqrt{45} = 6\sqrt{5}$, so the focal property holds.`, sol: 'Use the distance formula, then compare the sum with $2a$.', scheme: [['Foci $(\\pm 3, 0)$', 1], ['$SP = 2\\sqrt{5}$, $S\'P = 4\\sqrt{5}$', 1], ['Sum $6\\sqrt{5} = 2a$', 1]], d: 4, c: 'application', t: [2], time: 170 }), (C) => {
    C.assert(E.verify() && E.on(5, 4) && E.c.eq(3) && fr(5 - 3).mul(2).add(y2).eq(20) && fr(5 + 3).mul(8).add(y2).eq(80) && sqTex(20) === r`2\sqrt{5}` && sqTex(80) === r`4\sqrt{5}` && kSqTex(2, 45) === r`6\sqrt{5}` && near(Math.sqrt(20) + Math.sqrt(80), 2 * Math.sqrt(45)), 'SP = 2 sqrt 5, S\'P = 4 sqrt 5, sum 6 sqrt 5 = 2 sqrt 45'); C.model([45, 36, 9, 3, 5, 4, 20, 80, 6]);
  });
}
{
  const H = new Hyperbola(16, 20);
  Q('s307', mk.short({ marks: 3, stem: r`A hyperbola has its centre at the origin and its foci on the $x$-axis. Its eccentricity is $\dfrac{3}{2}$ and it passes through the point $(6, 5)$. Find its equation.`, model: r`Let the hyperbola be $\dfrac{x^2}{a^2} - \dfrac{y^2}{b^2} = 1$. With $e = \dfrac{3}{2}$, $e^2 = 1 + \dfrac{b^2}{a^2} = \dfrac{9}{4}$ gives $b^2 = \dfrac{5}{4}a^2$. The point $(6, 5)$ gives $\dfrac{36}{a^2} - \dfrac{25}{b^2} = 1$, that is $\dfrac{36}{a^2} - \dfrac{20}{a^2} = 1$, so $a^2 = 16$ and $b^2 = 20$. The equation is $\dfrac{x^2}{16} - \dfrac{y^2}{20} = 1$.`, sol: 'Use $e$ to link $b^2$ with $a^2$, then the point.', scheme: [['$b^2 = \\dfrac{5}{4}a^2$ from $e$', 1], ['$\\dfrac{36}{a^2} - \\dfrac{20}{a^2} = 1$ so $a^2 = 16$', 1], ['$\\dfrac{x^2}{16} - \\dfrac{y^2}{20} = 1$', 1]], d: 3, c: 'application', t: [3], time: 170 }), (C) => {
    C.assert(H.verify() && H.e.eq(fr(3, 2)) && H.on(6, 5) && fr(9, 4).sub(1).eq(fr(5, 4)) && fr(36).sub(fr(25).div(fr(5, 4))).eq(16) && H.C2.eq(20), 'x^2/16 - y^2/20 = 1: e = 3/2 and (6, 5) on the curve'); C.model([3, 2, 6, 5, 9, 4, 36, 25, 20, 16]);
  });
}
{
  const H = new Hyperbola(12, 13), Hc = H.conj();
  Q('s308', mk.short({ marks: 3, stem: r`Find the eccentricities $e$ and $e'$ of the hyperbola $\dfrac{x^2}{12} - \dfrac{y^2}{13} = 1$ and of its conjugate hyperbola, and verify that $\dfrac{1}{e^2} + \dfrac{1}{e'^2} = 1$.`, model: r`For $\dfrac{x^2}{12} - \dfrac{y^2}{13} = 1$: $e^2 = 1 + \dfrac{13}{12} = \dfrac{25}{12}$, so $e = \dfrac{5}{2\sqrt{3}} = \dfrac{5\sqrt{3}}{6}$. The conjugate hyperbola is $\dfrac{y^2}{13} - \dfrac{x^2}{12} = 1$, with $e'^2 = 1 + \dfrac{12}{13} = \dfrac{25}{13}$, so $e' = \dfrac{5\sqrt{13}}{13}$. Then $\dfrac{1}{e^2} + \dfrac{1}{e'^2} = \dfrac{12}{25} + \dfrac{13}{25} = 1$.`, sol: 'The conjugate swaps $a^2$ and $b^2$ in the eccentricity formula.', scheme: [['$e^2 = \\dfrac{25}{12}$, $e = \\dfrac{5\\sqrt{3}}{6}$', 1], ['$e\'^2 = \\dfrac{25}{13}$, $e\' = \\dfrac{5\\sqrt{13}}{13}$', 1], ['$\\dfrac{12}{25} + \\dfrac{13}{25} = 1$', 1]], d: 4, c: 'application', t: [3], time: 170 }), (C) => {
    C.assert(H.verify() && Hc.verify() && H.e2.eq(fr(25, 12)) && Hc.e2.eq(fr(25, 13)) && H.eTex() === r`\dfrac{5\sqrt{3}}{6}` && Hc.eTex() === r`\dfrac{5\sqrt{13}}{13}` && fr(1).div(H.e2).add(fr(1).div(Hc.e2)).eq(1) && fr(12, 25).add(fr(13, 25)).eq(1), 'e^2 = 25/12, e\'^2 = 25/13, and 12/25 + 13/25 = 1'); C.model([12, 13, 25, 5, 3, 6, 1]);
  });
}
{
  const H = new Hyperbola(32, 32);
  Q('s309', mk.short({ marks: 3, stem: r`Find the foci, the directrices and the length of the latus rectum of the rectangular hyperbola $x^2 - y^2 = 32$.`, model: r`Here $a^2 = b^2 = 32$, so $c^2 = a^2 + b^2 = 64$, $c = 8$ and $e = \dfrac{c}{a} = \sqrt{2}$. The foci are $(\pm 8, 0)$. The directrices are $x = \pm \dfrac{a^2}{c} = \pm \dfrac{32}{8} = \pm 4$. The latus rectum is $\dfrac{2b^2}{a} = \dfrac{64}{4\sqrt{2}} = 8\sqrt{2}$.`, sol: 'For a rectangular hyperbola $b = a$ and $e = \\sqrt{2}$.', scheme: [['$c^2 = 64$, foci $(\\pm 8, 0)$', 1], ['Directrices $x = \\pm 4$', 1], ['Latus rectum $8\\sqrt{2}$', 1]], d: 2, c: 'understanding', t: [3], time: 140 }), (C) => {
    C.assert(H.verify() && H.c.eq(8) && H.e2.eq(2) && H.fociTex() === r`(\pm 8, 0)` && H.dirTex() === r`x = \pm 4` && H.lrTex() === r`8\sqrt{2}` && H.lrOn() && sqTex(32) === r`4\sqrt{2}`, 'x^2 - y^2 = 32: foci (+-8, 0), directrices x = +-4, latus rectum 8 sqrt 2'); C.model([32, 64, 8, 2, 4]);
  });
}
{
  const H = new Hyperbola(16, 20, 'y');
  Q('s310', mk.short({ marks: 3, stem: r`A point $P$ moves so that $\lvert PA - PB \rvert = 8$, where $A$ is $(0, -6)$ and $B$ is $(0, 6)$. Find the equation of the locus of $P$.`, model: r`$AB = 12 > 8$, so the locus is a hyperbola with foci $A$, $B$. Take $PA - PB = 8$. Since $PA^2 - PB^2 = \left[x^2 + (y + 6)^2\right] - \left[x^2 + (y - 6)^2\right] = 24y$, we get $PA + PB = \dfrac{24y}{8} = 3y$. Hence $PA = \dfrac{8 + 3y}{2}$, so $4\left[x^2 + (y + 6)^2\right] = (8 + 3y)^2$, that is $4x^2 + 4y^2 + 48y + 144 = 64 + 48y + 9y^2$ and $4x^2 - 5y^2 + 80 = 0$. The locus is $\dfrac{y^2}{16} - \dfrac{x^2}{20} = 1$ (the case $PB - PA = 8$ gives the same equation).`, sol: 'Alternatively use $2a = 8$, $c = 6$, $b^2 = c^2 - a^2$.', scheme: [['$PA^2 - PB^2 = 24y$ and $PA + PB = 3y$', 1], ['$4x^2 - 5y^2 + 80 = 0$', 1], ['$\\dfrac{y^2}{16} - \\dfrac{x^2}{20} = 1$', 1]], d: 4, c: 'application', t: [4], time: 200 }), (C) => {
    const pa = (x, y) => Math.hypot(x, y + 6), pb = (x, y) => Math.hypot(x, y - 6);
    let ok = true; for (const s of [1, -1]) for (let i = -9; i <= 9; i++) { const y = s * 4 * Math.cosh(i / 3), x = Math.sqrt(20) * Math.sinh(i / 3); if (!near(Math.abs(pa(x, y) - pb(x, y)), 8) || !near(4 * x * x - 5 * y * y + 80, 0)) ok = false; }
    C.assert(H.verify() && ok && H.c.eq(6) && H.T.mul(2).eq(8) && H.C2.eq(20) && fr(36).sub(16).eq(20), 'the key hyperbola has |PA - PB| = 8 at 38 sampled points and 4x^2 - 5y^2 + 80 = 0'); C.model([12, 8, 24, 3, 4, 6, 144, 64, 48, 9, 5, 80, 16, 20]);
  });
}
{
  const H = new Hyperbola(16, 20), y2 = fr(60);
  Q('s311', mk.short({ marks: 3, stem: r`The point $P$ on the right branch of $\dfrac{x^2}{16} - \dfrac{y^2}{20} = 1$ has abscissa $8$. Find its distances from the two foci, and verify that they differ by the length of the transverse axis.`, model: r`Here $a = 4$, $b^2 = 20$, $c = 6$ and $e = \dfrac{3}{2}$. On the right branch $SP = ex - a = \dfrac{3}{2} \times 8 - 4 = 8$ and $S'P = ex + a = 12 + 4 = 16$. Check with $y^2 = 20\left(\dfrac{64}{16} - 1\right) = 60$: $SP^2 = (8 - 6)^2 + 60 = 64$ and $S'P^2 = (8 + 6)^2 + 60 = 256$. The difference $S'P - SP = 16 - 8 = 8 = 2a$.`, sol: 'On the right branch the focal distances are $ex \\mp a$.', scheme: [['$SP = ex - a = 8$', 1], ['$S\'P = ex + a = 16$', 1], ['Difference $8 = 2a$', 1]], d: 3, c: 'understanding', t: [4], time: 150 }), (C) => {
    C.assert(H.verify() && H.onSq(64, y2) && y2.eq(fr(20).mul(fr(64, 16).sub(1))) && fr(8 - 6).mul(2).add(y2).eq(64) && fr(8 + 6).mul(14).add(y2).eq(256) && fr(3, 2).mul(8).sub(4).eq(8) && fr(3, 2).mul(8).add(4).eq(16) && sqrtF(64).eq(8) && sqrtF(256).eq(16), 'SP^2 = 4 + 60 = 64, S\'P^2 = 196 + 60 = 256: distances 8 and 16, difference 8 = 2a'); C.model([4, 20, 6, 3, 2, 8, 12, 16, 64, 60, 256]);
  });
}

// ============================================================ long, 5 marks
{
  const E = new Ellipse(25, 9), ps = fr(9, 5), ps2 = fr(41, 5);
  Q('l01', mk.long({ stem: r`The ellipse $S$ has the equation $9x^2 + 25y^2 = 225$.

(a) Write the equation in the form $\dfrac{x^2}{a^2} + \dfrac{y^2}{b^2} = 1$ and state $a$ and $b$. [1]

(b) Find the foci and the eccentricity of $S$. [1]

(c) Find the equations of the directrices of $S$. [1]

(d) Find the length of the latus rectum and the coordinates of the ends of the latus rectum through the focus on the positive $x$-axis. [1]

(e) Verify the focal property at one of these ends. [1]`, model: r`(a) Dividing by $225$: $\dfrac{x^2}{25} + \dfrac{y^2}{9} = 1$, so $a = 5$ and $b = 3$.

(b) $c^2 = a^2 - b^2 = 25 - 9 = 16$, so $c = 4$. The foci are $(\pm 4, 0)$ and $e = \dfrac{c}{a} = \dfrac{4}{5}$.

(c) The directrices are $x = \pm \dfrac{a}{e} = \pm \dfrac{25}{4}$.

(d) The latus rectum is $\dfrac{2b^2}{a} = \dfrac{18}{5}$. At $x = 4$: $\dfrac{16}{25} + \dfrac{y^2}{9} = 1$, so $y^2 = \dfrac{81}{25}$ and $y = \pm \dfrac{9}{5}$. The ends are $\left(4, \dfrac{9}{5}\right)$ and $\left(4, -\dfrac{9}{5}\right)$.

(e) For $P\left(4, \dfrac{9}{5}\right)$ and $S(4, 0)$: $SP = \dfrac{9}{5}$. For $S'(-4, 0)$: $S'P = \sqrt{8^2 + \left(\dfrac{9}{5}\right)^2} = \sqrt{\dfrac{1681}{25}} = \dfrac{41}{5}$. The sum is $\dfrac{50}{5} = 10 = 2a$.`, sol: 'Every part reads the standard form found in (a).', scheme: [['(a) $\\dfrac{x^2}{25} + \\dfrac{y^2}{9} = 1$, $a = 5$, $b = 3$', 1], ['(b) Foci $(\\pm 4, 0)$, $e = \\dfrac{4}{5}$', 1], ['(c) $x = \\pm \\dfrac{25}{4}$', 1], ['(d) Length $\\dfrac{18}{5}$, ends $\\left(4, \\pm \\dfrac{9}{5}\\right)$', 1], ['(e) $\\dfrac{9}{5} + \\dfrac{41}{5} = 10 = 2a$', 1]], d: 3, c: 'application', t: [1, 2], time: 330 }), (C) => {
    C.assert(E.verify() && E.fociTex() === r`(\pm 4, 0)` && E.eTex() === r`\dfrac{4}{5}` && E.dirTex() === r`x = \pm \dfrac{25}{4}` && E.lrTex() === r`\dfrac{18}{5}` && E.on(4, ps) && sqrtF(d2(P(4, 0), [fr(4), ps])).eq(ps) && sqrtF(d2(P(-4, 0), [fr(4), ps])).eq(ps2) && ps.add(ps2).eq(10) && fr(225).div(9).eq(25) && fr(225).div(25).eq(9), 'x^2/25 + y^2/9 = 1: foci (+-4, 0), e = 4/5, directrices +-25/4, latus rectum 18/5, SP + S\'P = 9/5 + 41/5 = 10'); C.model([225, 25, 9, 5, 3, 16, 4, 25, 18, 81, 41, 10]);
  });
}
{
  const c = fdConic([2, 1], [1, 0, -8], fr(1, 4)), y = 1 + 2 * Math.sqrt(3);
  Q('l02', mk.long({ stem: r`An ellipse has focus $S(2, 1)$, directrix $x = 8$ and eccentricity $\dfrac{1}{2}$.

(a) Find its equation in the form $Ax^2 + By^2 + Dy + F = 0$. [2]

(b) By completing the square, write the equation in the form $\dfrac{x^2}{a^2} + \dfrac{(y - 1)^2}{b^2} = 1$. [1]

(c) Find the other focus $S'$ and the other directrix. [1]

(d) Verify the focal property for the point $P(0, 1 + 2\sqrt{3})$. [1]`, model: r`(a) For $P(x, y)$: $PS^2 = (x - 2)^2 + (y - 1)^2$ and $PL^2 = (x - 8)^2$. $PS = \dfrac{1}{2}PL$ gives $4\left[(x - 2)^2 + (y - 1)^2\right] = (x - 8)^2$, so $4x^2 - 16x + 16 + 4y^2 - 8y + 4 = x^2 - 16x + 64$, that is $3x^2 + 4y^2 - 8y - 44 = 0$.

(b) $3x^2 + 4(y - 1)^2 - 4 = 44$, so $3x^2 + 4(y - 1)^2 = 48$ and $\dfrac{x^2}{16} + \dfrac{(y - 1)^2}{12} = 1$.

(c) The centre is $(0, 1)$, $a = 4$ and $e = \dfrac{1}{2}$, so $ae = 2$ and $\dfrac{a}{e} = 8$. The other focus is $S'(-2, 1)$ and the other directrix is $x = -8$.

(d) $SP = \sqrt{(0 - 2)^2 + (2\sqrt{3})^2} = \sqrt{16} = 4$ and $S'P = \sqrt{(0 + 2)^2 + (2\sqrt{3})^2} = 4$. The sum is $8 = 2a$.`, sol: 'The centre of the ellipse is $(0, 1)$, midway between the foci.', scheme: [['(a) $4\\left[(x - 2)^2 + (y - 1)^2\\right] = (x - 8)^2$', 1], ['(a) $3x^2 + 4y^2 - 8y - 44 = 0$', 1], ['(b) $\\dfrac{x^2}{16} + \\dfrac{(y - 1)^2}{12} = 1$', 1], ['(c) $S\'(-2, 1)$ and $x = -8$', 1], ['(d) $SP = S\'P = 4$, sum $8 = 2a$', 1]], d: 4, c: 'application', t: [2], time: 340 }), (C) => {
    C.assert(quadTex(c) === '3x^2 + 4y^2 - 8y - 44 = 0' && quadKind(c) === 'ellipse' && Math.abs(quadAt(c, 0, 0).num()) > 0 && near(3 * 0 + 4 * y * y - 8 * y - 44, 0) && fdGap(c, 4, 1).isZero() && fdGap(c, -4, 1).isZero() && near(Math.hypot(2, y - 1), 4) && near(Math.hypot(-2, y - 1), 4) && near((y - 1) ** 2, 12) && fr(3).mul(0).add(48).eq(48), 'x^2/16 + (y-1)^2/12 = 1: vertices (+-4, 1) satisfy PS = e PL; P(0, 1 + 2 sqrt 3) has SP = S\'P = 4'); C.model([2, 1, 8, 4, 16, 64, 3, 44, 12, 48, 0, 8]);
  });
}
{
  const E = new Ellipse(36, 100), ps = fr(18, 5), pa = fr(18, 5), pb = fr(82, 5);
  Q('l03', mk.long({ stem: r`A point $P$ moves so that $PA + PB = 20$, where $A$ is $(0, 8)$ and $B$ is $(0, -8)$.

(a) Show that the locus of $P$ is an ellipse and find its equation. [2]

(b) Find the eccentricity and the equations of the directrices. [1]

(c) Find the length of the latus rectum and the ends of the latus rectum through $A$. [1]

(d) Verify the focal property at one of these ends. [1]`, model: r`(a) $AB = 16 < 20$, so $P$ traces an ellipse with foci $A$, $B$ and centre at the origin. The constant $20$ is the major axis, so the semi-major axis is $10$ along the $y$-axis, and $c = 8$. Then the other square is $10^2 - 8^2 = 36$, and the ellipse is $\dfrac{x^2}{36} + \dfrac{y^2}{100} = 1$.

(b) $e = \dfrac{c}{10} = \dfrac{4}{5}$. The directrices are $y = \pm \dfrac{10}{e} = \pm \dfrac{25}{2}$.

(c) The latus rectum is $\dfrac{2 \times 36}{10} = \dfrac{36}{5}$. At $y = 8$: $\dfrac{x^2}{36} = 1 - \dfrac{64}{100} = \dfrac{9}{25}$, so $x = \pm \dfrac{18}{5}$. The ends are $\left(\pm \dfrac{18}{5}, 8\right)$.

(d) For $P\left(\dfrac{18}{5}, 8\right)$: $PA = \dfrac{18}{5}$ and $PB = \sqrt{\left(\dfrac{18}{5}\right)^2 + 16^2} = \sqrt{\dfrac{6724}{25}} = \dfrac{82}{5}$. The sum is $\dfrac{100}{5} = 20$.`, sol: 'The major axis is along the $y$-axis, since the foci are on it.', scheme: [['(a) Ellipse with foci $A$, $B$ because $AB < 20$', 1], ['(a) $\\dfrac{x^2}{36} + \\dfrac{y^2}{100} = 1$', 1], ['(b) $e = \\dfrac{4}{5}$, $y = \\pm \\dfrac{25}{2}$', 1], ['(c) $\\dfrac{36}{5}$ and $\\left(\\pm \\dfrac{18}{5}, 8\\right)$', 1], ['(d) $\\dfrac{18}{5} + \\dfrac{82}{5} = 20$', 1]], d: 3, c: 'application', t: [2], time: 330 }), (C) => {
    C.assert(E.verify() && E.ax === 'y' && E.c.eq(8) && E.eTex() === r`\dfrac{4}{5}` && E.dirTex() === r`y = \pm \dfrac{25}{2}` && E.lrTex() === r`\dfrac{36}{5}` && E.on(ps, 8) && sqrtF(d2(P(0, 8), [ps, fr(8)])).eq(pa) && sqrtF(d2(P(0, -8), [ps, fr(8)])).eq(pb) && pa.add(pb).eq(20), 'x^2/36 + y^2/100 = 1: e = 4/5, directrices y = +-25/2, latus rectum 36/5, PA + PB = 18/5 + 82/5 = 20'); C.model([20, 8, 16, 10, 36, 100, 4, 5, 25, 2, 18, 64, 6724, 82]);
  });
}
{
  const H = new Hyperbola(36, 13), Hc = H.conj();
  Q('l04', mk.long({ stem: r`The hyperbola $S$ has the equation $13x^2 - 36y^2 = 468$.

(a) Write the equation in the form $\dfrac{x^2}{a^2} - \dfrac{y^2}{b^2} = 1$. [1]

(b) Find the vertices, the foci and the eccentricity of $S$. [1]

(c) Find the equations of the directrices and the length of the latus rectum of $S$. [1]

(d) Write down the equation of the conjugate hyperbola of $S$, find its eccentricity $e'$ and verify that $\dfrac{1}{e^2} + \dfrac{1}{e'^2} = 1$. [2]`, model: r`(a) Dividing by $468$: $\dfrac{x^2}{36} - \dfrac{y^2}{13} = 1$, so $a^2 = 36$ and $b^2 = 13$.

(b) $c^2 = a^2 + b^2 = 49$, so $c = 7$. The vertices are $(\pm 6, 0)$, the foci are $(\pm 7, 0)$ and $e = \dfrac{7}{6}$.

(c) The directrices are $x = \pm \dfrac{a}{e} = \pm \dfrac{36}{7}$. The latus rectum is $\dfrac{2b^2}{a} = \dfrac{26}{6} = \dfrac{13}{3}$.

(d) The conjugate hyperbola is $-\dfrac{x^2}{36} + \dfrac{y^2}{13} = 1$. Its eccentricity satisfies $e'^2 = 1 + \dfrac{36}{13} = \dfrac{49}{13}$, so $e' = \dfrac{7}{\sqrt{13}} = \dfrac{7\sqrt{13}}{13}$. Then $\dfrac{1}{e^2} + \dfrac{1}{e'^2} = \dfrac{36}{49} + \dfrac{13}{49} = 1$.`, sol: 'For a hyperbola $c^2 = a^2 + b^2$; the conjugate swaps $a^2$ and $b^2$.', scheme: [['(a) $\\dfrac{x^2}{36} - \\dfrac{y^2}{13} = 1$', 1], ['(b) Vertices $(\\pm 6, 0)$, foci $(\\pm 7, 0)$, $e = \\dfrac{7}{6}$', 1], ['(c) $x = \\pm \\dfrac{36}{7}$ and latus rectum $\\dfrac{13}{3}$', 1], ['(d) $-\\dfrac{x^2}{36} + \\dfrac{y^2}{13} = 1$ and $e\' = \\dfrac{7\\sqrt{13}}{13}$', 1], ['(d) $\\dfrac{36}{49} + \\dfrac{13}{49} = 1$', 1]], d: 3, c: 'application', t: [3], time: 330 }), (C) => {
    C.assert(H.verify() && Hc.verify() && fr(468).div(13).eq(36) && fr(468).div(36).eq(13) && H.c.eq(7) && H.e.eq(fr(7, 6)) && H.dirTex() === r`x = \pm \dfrac{36}{7}` && H.lrTex() === r`\dfrac{13}{3}` && H.lrOn() && Hc.eqXFirst() === r`-\dfrac{x^2}{36} + \dfrac{y^2}{13} = 1` && Hc.eTex() === r`\dfrac{7\sqrt{13}}{13}` && fr(1).div(H.e2).add(fr(1).div(Hc.e2)).eq(1) && fr(36, 49).add(fr(13, 49)).eq(1), 'x^2/36 - y^2/13 = 1: c = 7, e = 7/6, directrices +-36/7, latus rectum 13/3; e\'^2 = 49/13, 36/49 + 13/49 = 1'); C.model([468, 36, 13, 49, 7, 6, 3, 26, 1]);
  });
}
{
  const H = new Hyperbola(81, 144), y2 = fr(1152), PA = fr(36), PB = fr(54);
  Q('l05', mk.long({ stem: r`A point $P$ moves so that $\lvert PA - PB \rvert = 18$, where $A$ is $(15, 0)$ and $B$ is $(-15, 0)$.

(a) Show that the locus of $P$ is a hyperbola and find its equation. [2]

(b) Find its eccentricity and the equations of its directrices. [1]

(c) Find the $y$-coordinates of the points of the locus whose $x$-coordinate is $27$. [1]

(d) For one of these points, find $PA$ and $PB$ and verify the focal property. [1]`, model: r`(a) $AB = 30 > 18$, so the locus is a hyperbola with foci $A$, $B$ and centre at the origin. Then $2a = 18$, $a = 9$ and $c = 15$, so $b^2 = c^2 - a^2 = 225 - 81 = 144$. The equation is $\dfrac{x^2}{81} - \dfrac{y^2}{144} = 1$.

(b) $e = \dfrac{c}{a} = \dfrac{15}{9} = \dfrac{5}{3}$. The directrices are $x = \pm \dfrac{a}{e} = \pm \dfrac{27}{5}$.

(c) At $x = 27$: $\dfrac{y^2}{144} = \dfrac{729}{81} - 1 = 8$, so $y^2 = 1152$ and $y = \pm 24\sqrt{2}$.

(d) For $P(27, 24\sqrt{2})$: $PA^2 = (27 - 15)^2 + 1152 = 1296$, so $PA = 36$, and $PB^2 = (27 + 15)^2 + 1152 = 2916$, so $PB = 54$. Then $\lvert PA - PB \rvert = 18 = 2a$.`, sol: 'Use $c^2 = a^2 + b^2$; the distances can also be checked as $ex \\mp a$.', scheme: [['(a) Hyperbola with foci $A$, $B$ because $18 < AB$', 1], ['(a) $a = 9$, $c = 15$, $b^2 = 144$: $\\dfrac{x^2}{81} - \\dfrac{y^2}{144} = 1$', 1], ['(b) $e = \\dfrac{5}{3}$ and $x = \\pm \\dfrac{27}{5}$', 1], ['(c) $y = \\pm 24\\sqrt{2}$', 1], ['(d) $PA = 36$, $PB = 54$, difference $18$', 1]], d: 4, c: 'application', t: [3, 4], time: 340 }), (C) => {
    C.assert(H.verify() && H.c.eq(15) && H.e.eq(fr(5, 3)) && H.dirTex() === r`x = \pm \dfrac{27}{5}` && H.onSq(729, y2) && sqTex(1152) === r`24\sqrt{2}` && fr(27 - 15).mul(12).add(y2).eq(1296) && fr(27 + 15).mul(42).add(y2).eq(2916) && sqrtF(1296).eq(PA) && sqrtF(2916).eq(PB) && PB.sub(PA).eq(18) && fr(5, 3).mul(27).sub(9).eq(PA) && fr(5, 3).mul(27).add(9).eq(PB), 'x^2/81 - y^2/144 = 1: e = 5/3, directrices +-27/5; at x = 27, y^2 = 1152, PA = 36, PB = 54'); C.model([30, 18, 9, 15, 225, 81, 144, 5, 3, 27, 729, 8, 1152, 24, 1296, 36, 2916, 54]);
  });
}
{
  const c = fdConic([3, 3], [1, 1, 0], fr(2));
  Q('l06', mk.long({ stem: r`A conic has focus $S(3, 3)$, the line $x + y = 0$ as its directrix and eccentricity $\sqrt{2}$.

(a) Find its equation. [2]

(b) Show that the conic is a hyperbola and that it passes through $(0, 3)$ and $(-1, 6)$. [1]

(c) For the point $(-1, 6)$, verify that $PS = \sqrt{2} \cdot PL$. [1]

(d) Write the equation in the form $(x + 3)(y + 3) = k$ and explain why the hyperbola is rectangular. [1]`, model: r`(a) For $P(x, y)$: $PS^2 = (x - 3)^2 + (y - 3)^2$ and $PL^2 = \dfrac{(x + y)^2}{2}$. $PS^2 = 2 \, PL^2$ gives $(x - 3)^2 + (y - 3)^2 = (x + y)^2$, so $x^2 - 6x + 9 + y^2 - 6y + 9 = x^2 + 2xy + y^2$, that is $xy + 3x + 3y - 9 = 0$.

(b) With $A = 0$, $B = 1$, $C = 0$: $B^2 - 4AC = 1 > 0$, so the conic is a hyperbola. At $(0, 3)$: $0 + 0 + 9 - 9 = 0$. At $(-1, 6)$: $-6 - 3 + 18 - 9 = 0$.

(c) $PS = \sqrt{(-1 - 3)^2 + (6 - 3)^2} = 5$ and $PL = \dfrac{\lvert -1 + 6 \rvert}{\sqrt{2}} = \dfrac{5}{\sqrt{2}}$, so $PS = \sqrt{2} \times PL$.

(d) Adding $9$ to both sides, $xy + 3x + 3y + 9 = 18$, that is $(x + 3)(y + 3) = 18$. The eccentricity is $\sqrt{2}$, so $1 + \dfrac{b^2}{a^2} = 2$ and $b = a$: the hyperbola is rectangular.`, sol: 'A rectangular hyperbola has $e = \\sqrt{2}$.', scheme: [['(a) $(x - 3)^2 + (y - 3)^2 = (x + y)^2$', 1], ['(a) $xy + 3x + 3y - 9 = 0$', 1], ['(b) $B^2 - 4AC = 1 > 0$; both points satisfy the equation', 1], ['(c) $PS = 5$, $PL = \\dfrac{5}{\\sqrt{2}}$', 1], ['(d) $(x + 3)(y + 3) = 18$; $e = \\sqrt{2}$ gives $b = a$', 1]], d: 4, c: 'analysis', t: [4], time: 330 }), (C) => {
    C.assert(quadTex(c) === 'xy + 3x + 3y - 9 = 0' && quadKind(c) === 'hyperbola' && quadAt(c, 0, 3).isZero() && quadAt(c, -1, 6).isZero() && fdGap(c, 0, 3).isZero() && fdGap(c, -1, 6).isZero() && fdGap(c, -1, 6).isZero() && fr(-1 - 3).mul(-4).add(fr(3).mul(3)).eq(25) && fr(25).div(fr(25, 2)).eq(2) && fr(2).sub(1).eq(1) && !quadAt(c, 1, 1).isZero() && quadAt(c, 3, 3).num() === 9 + 9 + 9 - 9, 'xy + 3x + 3y - 9 = 0: B^2 - 4AC = 1; (0, 3) and (-1, 6) satisfy PS^2 = 2 PL^2; e^2 = 2'); C.model([3, 6, 9, 2, 1, 0, 5, 18]);
  });
}
{
  const E = new Ellipse(100, 36), H = new Hyperbola(16, 48), y2 = fr(27);
  Q('l07', mk.long({ stem: r`The ellipse $E: \dfrac{x^2}{100} + \dfrac{y^2}{36} = 1$ and a hyperbola $H$ have the same foci. The eccentricity of $H$ is $2$.

(a) Find the foci of $E$. [1]

(b) Find the equation of $H$. [1]

(c) Find the points at which $E$ and $H$ meet. [2]

(d) For one of these points $P$, verify the focal property of $E$ and the focal property of $H$. [1]`, model: r`(a) $c^2 = 100 - 36 = 64$, so the foci of $E$ are $(\pm 8, 0)$.

(b) $H$ has $c = 8$ and $e = 2$, so $a = \dfrac{c}{e} = 4$ and $a^2 = 16$. Then $b^2 = c^2 - a^2 = 64 - 16 = 48$, and $H$ is $\dfrac{x^2}{16} - \dfrac{y^2}{48} = 1$.

(c) From $H$: $y^2 = 3x^2 - 48$. Substituting in $E$: $\dfrac{x^2}{100} + \dfrac{3x^2 - 48}{36} = 1$, so $36x^2 + 300x^2 - 4800 = 3600$, that is $336x^2 = 8400$ and $x^2 = 25$. Then $y^2 = 75 - 48 = 27$, so the points are $(\pm 5, \pm 3\sqrt{3})$.

(d) For $P(5, 3\sqrt{3})$ and $S(8, 0)$, $S'(-8, 0)$: $SP^2 = 3^2 + 27 = 36$, so $SP = 6$, and $S'P^2 = 13^2 + 27 = 196$, so $S'P = 14$. For $E$: $SP + S'P = 20 = 2a$. For $H$: $S'P - SP = 8 = 2a$.`, sol: 'The two conics share $c = 8$ but have different $a$.', scheme: [['(a) Foci $(\\pm 8, 0)$', 1], ['(b) $a = 4$, $b^2 = 48$: $\\dfrac{x^2}{16} - \\dfrac{y^2}{48} = 1$', 1], ['(c) $x^2 = 25$', 1], ['(c) $y^2 = 27$: $(\\pm 5, \\pm 3\\sqrt{3})$', 1], ['(d) $SP = 6$, $S\'P = 14$: sum $20$, difference $8$', 1]], d: 5, c: 'analysis', t: [1, 2, 3, 4], time: 360 }), (C) => {
    C.assert(E.verify() && H.verify() && E.c.eq(8) && H.c.eq(8) && H.e.eq(2) && E.onSq(25, y2) && H.onSq(25, y2) && fr(1, 100).mul(25).add(y2.div(36)).eq(1) && fr(25).mul(3).sub(48).eq(27) && sqrtF(fr(5 - 8).mul(-3).add(y2)).eq(6) && sqrtF(fr(5 + 8).mul(13).add(y2)).eq(14) && fr(336).mul(25).eq(8400) && sqTex(27) === r`3\sqrt{3}`, 'E and H meet at (+-5, +-3 sqrt 3); SP = 6, S\'P = 14: sum 20, difference 8'); C.model([100, 36, 64, 8, 2, 4, 16, 48, 3, 300, 4800, 3600, 336, 8400, 25, 75, 27, 13, 196, 6, 14, 20]);
  });
}
