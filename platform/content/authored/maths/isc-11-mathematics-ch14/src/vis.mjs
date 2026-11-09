// Visuals for ISC 11 Mathematics ch14 Ellipse and Hyperbola. Every number in a table or figure is computed here and asserted.
import { table, flow, plot as plot0 } from './lib.mjs';
import { Ellipse, Hyperbola, fdConic, quadTex, quadAt, fdGap, quadKind, quadHalves, fr, sqrtF, sqTex, kSqTex, d2, P, pt, numStr } from './conic.mjs';

const r = String.raw;
/** plot() that also marks 'free' points on_curve: false (the shared stage-4 lint needs the flag). */
const plot = (spec, alt, caption) => { const v = plot0(spec, alt, caption); (spec.pts ?? []).forEach((p, i) => { if (p[3] === 'free') v.spec.points[i].on_curve = false; }); return v; };
export const must = (cond, msg) => { if (!cond) throw new Error(`self-check failed: ${msg}`); };
export const V = {};
const M = (t) => `$${t}$`;
const num = (x) => fr(x).num();
/** The distance between two points with rational coordinates, as exact text (null when irrational). */
const dist = (p, q) => sqrtF(d2(P(...p), P(...q)));

// ================================================================ deck 1: the ellipse
V.route1 = flow('LR', [['a', 'Standard form, axes, foci and directrices'], ['b', 'Reading an equation: a bigger than b, a smaller than b'], ['c', 'Writing the equation from data'], ['d', 'Focus and directrix: a second-degree equation'], ['e', 'Focal property and loci']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Route map of Part 1: the standard form of an ellipse with its axes, foci and directrices; reading an equation when the major axis lies along either axis; writing the equation from data; the equation from a focus, a directrix and the eccentricity; and the focal property with loci.', 'Part 1 at a glance.');
V.goals1 = table(['You will be able to', 'Using', 'Key result'], [
  ['Read the parts of an ellipse from its equation', 'standard form', M(r`\dfrac{x^2}{a^2} + \dfrac{y^2}{b^2} = 1, \; b^2 = a^2(1 - e^2)`)],
  ['Find foci, directrices and latus rectum', r`$a$ and $e$`, M(r`(\pm ae, 0), \; x = \pm \dfrac{a}{e}, \; \dfrac{2b^2}{a}`)],
  ['Write an equation from given data', r`$a$, $b$, $e$, points`, 'solve for $a^2$ and $b^2$'],
  ['Find the equation from a focus and a directrix', r`$PS = e \cdot PL$`, 'a second-degree equation'],
  ['Use the focal property', r`$SP + S'P = 2a$`, 'distances and loci'],
], 'Table of goals for Part 1: reading the parts of an ellipse, finding foci, directrices and latus rectum, writing an equation from data, finding the equation from a focus and a directrix, and using the focal property.', 'What Part 1 covers.');

// the ellipse x^2/25 + y^2/16 = 1
const E0 = new Ellipse(25, 16);
{
  must(E0.verify() && E0.c.eq(3) && E0.e.eq(fr(3, 5)) && E0.A.eq(5) && E0.B.eq(4) && E0.fociTex() === r`(\pm 3, 0)` && E0.dirTex() === r`x = \pm \dfrac{25}{3}` && E0.lrTex() === r`\dfrac{32}{5}` && E0.lrEndsTex() === r`(\pm 3, \pm \dfrac{16}{5})`, 'E0 facts');
  must(E0.on(3, fr(16, 5)) && E0.on(-4, fr(12, 5)) && E0.on(0, 4) && E0.on(5, 0), 'E0 points');
  V.def = plot({ x: [-7, 7], y: [-6, 6], fns: E0.fns(), pts: [[3, 0, '$S(3, 0)$', 'free'], [-3, 0, "$S'(-3, 0)$", 'free'], [5, 0, '$(5, 0)$', 'free'], [-5, 0, '$(-5, 0)$', 'free'], [0, 4, '$(0, 4)$'], [0, -4, '$(0, -4)$'], [3, 3.2, r`$\left(3, \dfrac{16}{5}\right)$`], [-4, 2.4, '$P(-4, 2.4)$']] }, 'Plot of the ellipse x squared over 25 plus y squared over 16 equals 1, drawn as an upper and a lower half: the foci S and S dash at plus and minus 3 on the x-axis, the vertices at plus and minus 5, the ends of the minor axis at 0, plus and minus 4, and the end 3, 16 over 5 of a latus rectum.', 'An ellipse with its foci, vertices and a latus rectum end.');
  V.std = table(['Quantity', 'Formula (for $a > b$)', r`For $\dfrac{x^2}{25} + \dfrac{y^2}{16} = 1$`], [
    ['Relation', M(r`b^2 = a^2(1 - e^2), \quad 0 < e < 1`), M(r`16 = 25\left(1 - \dfrac{9}{25}\right), \; e = \dfrac{3}{5}`)],
    ['Vertices', M(r`(\pm a, 0)`), M(E0.verticesTex())],
    ['Ends of the minor axis', M(r`(0, \pm b)`), M(E0.minorEndsTex())],
    ['Foci', M(r`(\pm ae, 0)`), M(E0.fociTex())],
    ['Directrices', M(r`x = \pm \dfrac{a}{e}`), M(E0.dirTex())],
    ['Latus rectum', M(r`\dfrac{2b^2}{a}`), M(E0.lrTex())],
  ], 'Table of the parts of the ellipse with a greater than b and their values for x squared over 25 plus y squared over 16 equals 1: relation b squared equals a squared times 1 minus e squared with e equal to three fifths, vertices plus and minus 5, minor axis ends plus and minus 4, foci plus and minus 3, directrices x equal to plus and minus 25 over 3, and latus rectum 32 over 5.', 'Here $a = 5$, $b = 4$, $e = \\dfrac{3}{5}$.');
}
// we1: x^2/100 + y^2/36 = 1
{
  const E = new Ellipse(100, 36);
  must(E.verify() && E.fociTex() === r`(\pm 8, 0)` && E.dirTex() === r`x = \pm \dfrac{25}{2}` && E.lrTex() === r`\dfrac{36}{5}` && E.lrEndsTex() === r`(\pm 8, \pm \dfrac{18}{5})` && E.eTex() === r`\dfrac{4}{5}` && E.on(8, fr(18, 5)) && E.on(0, 6), 'we1');
  V.we1 = plot({ x: [-13, 13], y: [-8, 8], fns: E.fns(), pts: [[8, 0, '$S(8, 0)$', 'free'], [-8, 0, "$S'(-8, 0)$", 'free'], [8, 3.6, '$(8, 3.6)$'], [8, -3.6, '$(8, -3.6)$'], [-8, 3.6, '$(-8, 3.6)$'], [-8, -3.6, '$(-8, -3.6)$']] }, 'Plot of the ellipse x squared over 100 plus y squared over 36 equals 1: the foci at plus and minus 8 on the x-axis and the four ends of the two latus recta at x equal to plus and minus 8 and y equal to plus and minus 3.6.', 'Foci $(\\pm 8, 0)$; latus rectum ends $(\\pm 8, \\pm 3.6)$.');
}
// a < b case
{
  const Ea = new Ellipse(25, 16), Eb = new Ellipse(16, 25);
  must(Ea.fociTex() === r`(\pm 3, 0)` && Eb.fociTex() === r`(0, \pm 3)` && Ea.e.eq(fr(3, 5)) && Eb.e.eq(fr(3, 5)) && Ea.ax === 'x' && Eb.ax === 'y' && Eb.dirTex() === r`y = \pm \dfrac{25}{3}` && Eb.lrTex() === r`\dfrac{32}{5}` && Eb.verify(), 'two cases');
  V.cases = table(['', r`$a > b$: major axis along the $x$-axis`, r`$a < b$: major axis along the $y$-axis`], [
    ['Eccentricity relation', M(r`b^2 = a^2(1 - e^2)`), M(r`a^2 = b^2(1 - e^2)`)],
    ['Vertices', M(r`(\pm a, 0)`), M(r`(0, \pm b)`)],
    ['Ends of the minor axis', M(r`(0, \pm b)`), M(r`(\pm a, 0)`)],
    ['Foci', M(r`(\pm ae, 0)`), M(r`(0, \pm be)`)],
    ['Directrices', M(r`x = \pm \dfrac{a}{e}`), M(r`y = \pm \dfrac{b}{e}`)],
    ['Latus rectum', M(r`\dfrac{2b^2}{a}`), M(r`\dfrac{2a^2}{b}`)],
  ], 'Table comparing the two cases of the ellipse x squared over a squared plus y squared over b squared equals 1: when a is greater than b the major axis is along the x-axis with foci plus and minus a e on the x-axis, and when a is less than b it is along the y-axis with foci plus and minus b e on the y-axis; the relation, vertices, directrices and latus rectum change accordingly.', 'The larger denominator tells the axis of the foci.');
}
// we2: 16x^2 + 7y^2 = 112
{
  const E = new Ellipse(7, 16);
  must(E.verify() && E.ax === 'y' && E.fociTex() === r`(0, \pm 3)` && E.eTex() === r`\dfrac{3}{4}` && E.dirTex() === r`y = \pm \dfrac{16}{3}` && E.lrTex() === r`\dfrac{7}{2}` && E.lrEndsTex() === r`(\pm \dfrac{7}{4}, \pm 3)` && E.on(fr(7, 4), 3) && E.on(0, 4), 'we2');
  V.we2 = plot({ x: [-4, 4], y: [-5, 5], fns: E.fns(), pts: [[0, 3, '$S(0, 3)$', 'free'], [0, -3, "$S'(0, -3)$", 'free'], [0, 4, '$(0, 4)$'], [0, -4, '$(0, -4)$'], [1.75, 3, '$(1.75, 3)$'], [-1.75, 3, '$(-1.75, 3)$']] }, 'Plot of the ellipse 16 x squared plus 7 y squared equals 112, whose major axis is along the y-axis: the foci at 0, plus and minus 3, the vertices at 0, plus and minus 4 and the latus rectum ends at x equal to plus and minus 1.75, y equal to 3.', 'Major axis along the $y$-axis; foci $(0, \\pm 3)$.');
}
// data table
{
  const a = new Ellipse(25, 16), b = new Ellipse(100, 64), c = new Ellipse(64, 24), d = new Ellipse(20, 5);
  must(a.c.eq(3) && a.B2.eq(16) && b.e.eq(fr(3, 5)) && b.B2.eq(64) && c.B2.mul(2).div(c.A.eq(8) ? 8 : 0).eq(6) && c.B2.eq(24) && d.on(2, 2) && d.on(4, 1) && fr(4).div(20).add(fr(4).div(5)).eq(1) && fr(16).div(20).add(fr(1).div(5)).eq(1), 'data table');
  V.data = table(['Given', 'Method', 'Result'], [
    [r`Foci $(\pm 3, 0)$ and vertices $(\pm 5, 0)$`, r`$b^2 = a^2 - c^2$ with $c = ae$`, M(r`b^2 = 25 - 9 = 16`)],
    [r`$a = 10$ and $e = \dfrac{3}{5}$`, r`$b^2 = a^2(1 - e^2)$`, M(r`b^2 = 100 - 36 = 64`)],
    [r`$a = 8$ and latus rectum $6$`, r`$\dfrac{2b^2}{a} = 6$`, M(r`b^2 = 24`)],
    [r`Points $(2, 2)$ and $(4, 1)$ on the curve`, r`substitute: $\dfrac{4}{a^2} + \dfrac{4}{b^2} = 1$, $\dfrac{16}{a^2} + \dfrac{1}{b^2} = 1$`, M(r`a^2 = 20, \; b^2 = 5`)],
  ], 'Table of four ways to find the equation of an ellipse: from foci and vertices, b squared equals a squared minus c squared giving 16; from a equal to 10 and e equal to three fifths, b squared 64; from a equal to 8 and a latus rectum of 6, b squared 24; and from two points on the curve, a squared 20 and b squared 5.', 'Find $a^2$ and $b^2$, then write the standard form.');
}
// we3: foci (+-3, 0), e = 1/2
{
  const E = new Ellipse(36, 27);
  must(E.verify() && E.c.eq(3) && E.e.eq(fr(1, 2)) && E.A.eq(6) && E.B2.eq(27) && E.lrTex() === '9' && E.on(3, fr(9, 2)), 'we3');
  V.we3 = table(['Step', 'Work'], [['Use $c = ae$', M(r`3 = a \times \dfrac{1}{2} \Rightarrow a = 6`)], ['Find $b^2$', M(r`b^2 = a^2(1 - e^2) = 36 \times \dfrac{3}{4} = 27`)], ['Equation', M(E.eq())], ['Latus rectum', M(r`\dfrac{2b^2}{a} = \dfrac{54}{6} = 9, \; \text{ends } \left(\pm 3, \pm \dfrac{9}{2}\right)`)]], 'Worked example 3 table: foci plus and minus 3 and eccentricity one half give a equal to 6 and b squared equal to 27, so the ellipse is x squared over 36 plus y squared over 27 equals 1 with latus rectum 9.', 'The foci give $c = 3$; $c = ae$ gives $a$.');
}
// we4: through (2, 2) and (4, 1)
{
  const E = new Ellipse(20, 5);
  must(E.verify() && E.on(2, 2) && E.on(4, 1) && E.eTex() === r`\dfrac{\sqrt{3}}{2}` && E.fociTex() === r`(\pm \sqrt{15}, 0)` && fr(16).sub(fr(4).mul(4)).eq(0), 'we4');
  V.we4 = plot({ x: [-6, 6], y: [-3.5, 3.5], fns: E.fns(), pts: [[2, 2, '$(2, 2)$'], [4, 1, '$(4, 1)$'], [-2, -2, '$(-2, -2)$'], [Math.sqrt(15), 0, r`$S(\sqrt{15}, 0)$`, 'free'], [-Math.sqrt(15), 0, r`$S'(-\sqrt{15}, 0)$`, 'free']] }, 'Plot of the ellipse x squared over 20 plus y squared over 5 equals 1 through the points 2, 2 and 4, 1, with the foci at plus and minus root 15 on the x-axis.', 'Two points give two equations in $\\dfrac{1}{a^2}$ and $\\dfrac{1}{b^2}$.');
}
// t02: focus-directrix
{
  const S = [1, 1], line = [1, 1, -6], e2 = fr(1, 4), c = fdConic(S, line, e2);
  const N = fr(2), raw = [N.sub(e2), e2.mul(-2), N.sub(e2), N.mul(-2).sub(e2.mul(2).mul(-6)), N.mul(-2).sub(e2.mul(2).mul(-6)), N.mul(2).sub(e2.mul(36))];
  const ratio = raw[0].div(c.A);
  must(raw.every((x, i) => x.eq(ratio.mul([c.A, c.B, c.C, c.D, c.E, c.F][i]))) && quadTex(c) === '7x^2 - 2xy + 7y^2 - 4x - 4y - 20 = 0' && quadKind(c) === 'ellipse', 'raw and normalised coefficients are proportional');
  V.fd = table(['Step', 'Work'], [
    ['Set up', M(r`P(x, y), \; S(p, q), \; \text{directrix } lx + my + n = 0`)],
    [r`Distances`, M(r`PS^2 = (x - p)^2 + (y - q)^2, \quad PL = \dfrac{\lvert lx + my + n \rvert}{\sqrt{l^2 + m^2}}`)],
    [r`Square $PS = e \cdot PL$`, M(r`(l^2 + m^2)\left[(x - p)^2 + (y - q)^2\right] = e^2 (lx + my + n)^2`)],
    ['Collect terms', M(r`Ax^2 + Bxy + Cy^2 + Dx + Ey + F = 0, \quad B = -2e^2 lm`)],
    ['An $xy$ term', r`appears whenever the directrix is not parallel to an axis ($l \ne 0$ and $m \ne 0$)`],
    ['Type', M(r`B^2 - 4AC < 0 \text{ for } 0 < e < 1: \text{ an ellipse}`)],
  ], 'Table of the method for a conic from a focus, a directrix and the eccentricity: write PS squared and the perpendicular distance PL, square PS equals e times PL, collect the terms into a second-degree equation whose xy coefficient is minus 2 e squared l m, and read the type from B squared minus 4 A C.', 'Square both sides to remove the roots.');
}
// we5: focus (1, 0), directrix x = 9, e = 1/3
{
  const c = fdConic([1, 0], [1, 0, -9], fr(1, 9)), E = new Ellipse(9, 8);
  must(quadTex(c) === '8x^2 + 9y^2 - 72 = 0' && E.verify() && E.fociTex() === r`(\pm 1, 0)` && E.eTex() === r`\dfrac{1}{3}` && fdGap(c, 3, 0).isZero() && fdGap(c, 1, fr(8, 3)).isZero() && fdGap(c, 0, 3).sign() !== 0 && E.on(1, fr(8, 3)), 'we5');
  V.we5 = plot({ x: [-4, 4], y: [-4, 4], fns: E.fns(), pts: [[1, 0, '$S(1, 0)$', 'free'], [-1, 0, "$S'(-1, 0)$", 'free'], [1, 8 / 3, r`$\left(1, \dfrac{8}{3}\right)$`], [1, -8 / 3, r`$\left(1, -\dfrac{8}{3}\right)$`]] }, 'Plot of the ellipse 8 x squared plus 9 y squared equals 72 with focus S at 1, 0: the focus lies on the major axis and the point 1, 8 over 3 above it is one end of the latus rectum.', 'The focus $S(1, 0)$ and the directrix $x = 9$ give this ellipse.');
}
// we6: rotated ellipse
{
  const c = fdConic([1, 1], [1, 1, -6], fr(1, 4)), v1 = [-1, -1], v2 = [fr(5, 3), fr(5, 3)];
  must(quadAt(c, -1, -1).isZero() && quadAt(c, v2[0], v2[1]).isZero() && fdGap(c, -1, -1).isZero() && fdGap(c, v2[0], v2[1]).isZero() && !quadAt(c, 0, 0).isZero(), 'we6 vertices');
  const cen = [fr(1, 3), fr(1, 3)], sc2 = d2(cen, P(1, 1)), a2 = d2(cen, P(-1, -1));
  must(sc2.eq(fr(8, 9)) && a2.eq(fr(32, 9)) && sc2.div(a2).eq(fr(1, 4)) && d2(cen, v2).eq(a2), 'we6: centre (1/3, 1/3), SC^2 / a^2 = e^2 = 1/4');
  V.we6 = plot({ x: [-3, 4], y: [-3, 4], fns: [...quadHalves(c), { expr: '6-x', label: 'directrix x + y = 6', domain: [2.2, 4] }, { expr: 'x', label: 'axis', domain: [-2, 3] }], pts: [[1, 1, '$S(1, 1)$'], [-1, -1, '$(-1, -1)$'], [5 / 3, 5 / 3, r`$\left(\dfrac{5}{3}, \dfrac{5}{3}\right)$`]] }, 'Plot of the ellipse 7 x squared minus 2 x y plus 7 y squared minus 4 x minus 4 y minus 20 equals 0, drawn as an upper and a lower half and tilted along the line y equals x, with its focus S at 1, 1, the directrix x plus y equals 6 and the two vertices minus 1, minus 1 and 5 over 3, 5 over 3 on the axis.', 'A tilted ellipse: the $xy$ term comes from the slanting directrix.');
}
// focal property table
{
  const S = [3, 0], S2 = [-3, 0], pts = [[5, 0], [0, 4], [3, fr(16, 5)], [-4, fr(12, 5)]];
  const rows = pts.map(([x, y]) => {
    const u = dist(S, [x, y]), w = dist(S2, [x, y]);
    must(E0.on(x, y) && u && w && u.add(w).eq(10) && u.eq(fr(5).sub(fr(3, 5).mul(x))) && w.eq(fr(5).add(fr(3, 5).mul(x))), `focal row ${x}, ${y}`);
    return [M(pt(x, y)), M(u.tex()), M(w.tex()), M(u.add(w).tex())];
  });
  V.focal = table([r`$P$ on $\dfrac{x^2}{25} + \dfrac{y^2}{16} = 1$`, '$SP$', "$S'P$", "$SP + S'P$"], rows, 'Table of four points of the ellipse x squared over 25 plus y squared over 16 equals 1 with their distances from the foci S 3, 0 and S dash minus 3, 0: 2 and 8, 5 and 5, 3.2 and 6.8, and 7.4 and 2.6 in fractions, and in every row the sum is 10, the length of the major axis.', 'The sum is $2a = 10$ for every point.');
}
// we7: focal distances on x^2/144 + y^2/63 = 1, P(8, sqrt 35)
{
  const E = new Ellipse(144, 63), x = 8, y2 = fr(35);
  must(E.verify() && E.c.eq(9) && E.e.eq(fr(3, 4)) && E.onSq(64, y2) && y2.eq(fr(63).mul(fr(1).sub(fr(64, 144)))) && fr(x - 9).mul(x - 9).add(y2).eq(36) && fr(x + 9).mul(x + 9).add(y2).eq(324) && fr(12).sub(fr(3, 4).mul(8)).eq(6) && fr(12).add(fr(3, 4).mul(8)).eq(18), 'we7');
  V.we7 = table(['Step', 'Work'], [['Foci and $e$', M(r`c^2 = 144 - 63 = 81, \; c = 9, \; e = \dfrac{9}{12} = \dfrac{3}{4}`)], [r`Ordinate at $x = 8$`, M(r`y^2 = 63\left(1 - \dfrac{64}{144}\right) = 35`)], ['Distance from $S(9, 0)$', M(r`SP = a - ex = 12 - \dfrac{3}{4} \times 8 = 6`)], ["Distance from $S'(-9, 0)$", M(r`S'P = a + ex = 12 + 6 = 18`)], ['Check', M(r`SP^2 = (8 - 9)^2 + 35 = 36, \; S'P^2 = 17^2 + 35 = 324, \; SP + S'P = 24 = 2a`)]], 'Worked example 7 table: for the ellipse x squared over 144 plus y squared over 63 equals 1 the foci are at plus and minus 9 and e is three quarters; at x equal to 8 the focal distances are 12 minus 6, which is 6, and 12 plus 6, which is 18, and they sum to 24.', 'Focal distances $a \\mp ex$.');
}
// we8: locus PA + PB = 12 with A(0, 4), B(0, -4)
{
  const E = new Ellipse(20, 36);
  must(E.verify() && E.c.eq(4) && E.A.eq(6) && E.B2.eq(20) && E.on(fr(10, 3), 4) && dist([0, 4], [fr(10, 3), 4]).eq(fr(10, 3)) && dist([0, -4], [fr(10, 3), 4]).eq(fr(26, 3)) && dist([0, 4], [fr(10, 3), 4]).add(dist([0, -4], [fr(10, 3), 4])).eq(12) && E.lrTex() === r`\dfrac{20}{3}`, 'we8');
  V.we8 = plot({ x: [-6, 6], y: [-7, 7], fns: E.fns(), pts: [[0, 4, '$A(0, 4)$', 'free'], [0, -4, '$B(0, -4)$', 'free'], [10 / 3, 4, r`$P\left(\dfrac{10}{3}, 4\right)$`], [-10 / 3, 4, r`$\left(-\dfrac{10}{3}, 4\right)$`], [0, 6, '$(0, 6)$'], [0, -6, '$(0, -6)$']] }, 'Plot of the ellipse x squared over 20 plus y squared over 36 equals 1, the locus of the points whose distances from A 0, 4 and B 0, minus 4 add to 12: the point P 10 over 3, 4 has PA equal to 10 over 3 and PB equal to 26 over 3.', 'The locus of $P$ with $PA + PB = 12$.');
}
V.sum1 = table(['Task', 'Method', 'Result'], [
  ['Parts of an ellipse', r`$a^2$ = larger denominator`, M(r`c^2 = a^2 - b^2, \; e = \dfrac{c}{a}`)],
  ['Foci and directrices', 'along the major axis', M(r`(\pm ae, 0), \; x = \pm \dfrac{a}{e}`)],
  ['Latus rectum', r`through a focus, $\perp$ major axis`, M(r`\dfrac{2b^2}{a}`)],
  ['Equation from a focus, directrix, $e$', r`$PS = e \cdot PL$, squared`, 'second-degree equation'],
  ['Focal property', 'sum of focal distances', M(r`SP + S'P = 2a, \; SP = a - ex`)],
], 'Summary table for Part 1: parts of an ellipse, foci and directrices along the major axis, the latus rectum 2 b squared over a, the equation from a focus, a directrix and e by squaring PS equals e times PL, and the focal property with SP equal to a minus e x.', 'Choose the method from the data given.');
V.tips1 = table(['Marks', 'Show'], [['1', 'the value only, after finding $a^2$ and $b^2$'], ['2 to 3', r`$a^2$, $b^2$, then $c$ or $e$, then the required parts`], ['5, in parts', 'the standard form first, then each part from it, with a check by substitution']], 'Table of exam tips for Part 1: for 1 mark give the value after finding a squared and b squared; for 2 to 3 marks show a squared, b squared, then c or e and the parts; for 5 marks in parts write the standard form first and check by substitution.', 'Decide which denominator is $a^2$ first.');

// ================================================================ deck 2: the hyperbola
V.route2 = flow('LR', [['a', 'Standard form, axes, foci and directrices'], ['b', 'Conjugate and rectangular hyperbolas'], ['c', 'Writing the equation from data'], ['d', "Focal property |SP - S'P| = 2a"], ['e', 'Loci and the focus-directrix equation']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Route map of Part 2: the standard form of a hyperbola with its axes, foci and directrices; the conjugate and rectangular hyperbolas; writing the equation from data; the focal property with the difference of the focal distances; loci and the focus-directrix equation.', 'Part 2 at a glance.');
V.goals2 = table(['You will be able to', 'Using', 'Key result'], [
  ['Read the parts of a hyperbola from its equation', 'standard form', M(r`\dfrac{x^2}{a^2} - \dfrac{y^2}{b^2} = 1, \; b^2 = a^2(e^2 - 1)`)],
  ['Use the conjugate hyperbola', r`$e$ and $e'$`, M(r`\dfrac{1}{e^2} + \dfrac{1}{e'^2} = 1`)],
  ['Write an equation from given data', r`$a$, $b$, $e$, foci`, 'solve for $a^2$ and $b^2$'],
  ['Use the focal property', r`$\lvert SP - S'P \rvert = 2a$`, 'focal distances $ex \\pm a$'],
  ['Find a locus or a conic from a focus and directrix', r`$PS = e \cdot PL$, $e > 1$`, 'a hyperbola'],
], 'Table of goals for Part 2: reading the parts of a hyperbola, using the conjugate hyperbola with one over e squared plus one over e dash squared equal to 1, writing an equation from data, using the focal property, and finding a locus or a conic from a focus and a directrix with e greater than 1.', 'What Part 2 covers.');
// the standard hyperbola x^2/4 - y^2/5 = 1
{
  const H = new Hyperbola(4, 5);
  must(H.verify() && H.c.eq(3) && H.e.eq(fr(3, 2)) && H.lrTex() === '5' && H.lrEndsTex() === r`(\pm 3, \pm \dfrac{5}{2})` && H.on(3, fr(5, 2)) && H.dirTex() === r`x = \pm \dfrac{4}{3}`, 'H0');
  V.hdef = plot({ x: [-9, 9], y: [-9, 9], fns: [...H.fns(9), ...H.asymptotes(9)], pts: [[3, 0, '$S(3, 0)$', 'free'], [-3, 0, "$S'(-3, 0)$", 'free'], [2, 0, '$A(2, 0)$', 'free'], [-2, 0, "$A'(-2, 0)$", 'free'], [3, 2.5, '$(3, 2.5)$'], [3, -2.5, '$(3, -2.5)$'], [-3, 2.5, '$(-3, 2.5)$'], [-3, -2.5, '$(-3, -2.5)$']] }, 'Plot of the hyperbola x squared over 4 minus y squared over 5 equals 1 with its two branches, each drawn as an upper and a lower half, its asymptotes, the vertices at plus and minus 2, the foci at plus and minus 3 and the four latus rectum ends at x equal to plus and minus 3, y equal to plus and minus 2.5.', 'Vertices $(\\pm 2, 0)$, foci $(\\pm 3, 0)$, $e = \\dfrac{3}{2}$.');
}
// we1: x^2/9 - y^2/7 = 1
{
  const H = new Hyperbola(9, 7);
  must(H.verify() && H.c.eq(4) && H.e.eq(fr(4, 3)) && H.fociTex() === r`(\pm 4, 0)` && H.dirTex() === r`x = \pm \dfrac{9}{4}` && H.lrTex() === r`\dfrac{14}{3}` && H.lrEndsTex() === r`(\pm 4, \pm \dfrac{7}{3})` && H.on(4, fr(7, 3)) && sqTex(7) === r`\sqrt{7}`, 'hwe1');
  V.hwe1 = table(['Quantity', r`For $\dfrac{x^2}{9} - \dfrac{y^2}{7} = 1$`], [
    [r`$a^2$, $b^2$`, M(r`a^2 = 9, \; b^2 = 7, \; c^2 = a^2 + b^2 = 16`)],
    ['Eccentricity', M(r`e = \dfrac{c}{a} = \dfrac{4}{3}`)],
    ['Vertices and foci', M(r`(\pm 3, 0) \text{ and } (\pm 4, 0)`)],
    ['Transverse and conjugate axes', M(r`2a = 6 \text{ along the } x\text{-axis}, \; 2b = 2\sqrt{7} \text{ along the } y\text{-axis}`)],
    ['Directrices', M(H.dirTex())],
    ['Latus rectum', M(r`\dfrac{2b^2}{a} = \dfrac{14}{3}, \; \text{ends } \left(\pm 4, \pm \dfrac{7}{3}\right)`)],
  ], 'Worked example 1 table: for x squared over 9 minus y squared over 7 equals 1, c squared is 16, e is four thirds, the vertices are plus and minus 3, the foci plus and minus 4, the transverse axis is 6 and the conjugate axis 2 root 7, the directrices are x equal to plus and minus 9 over 4 and the latus rectum is 14 over 3.', 'Here $c^2 = a^2 + b^2$ (a plus sign for a hyperbola).');
}
// conjugate pair x^2/64 - y^2/36 = 1 and y^2/36 - x^2/64 = 1
const H1 = new Hyperbola(64, 36), H1c = H1.conj();
{
  must(H1.verify() && H1c.verify() && H1.eTex() === r`\dfrac{5}{4}` && H1c.eTex() === r`\dfrac{5}{3}` && H1c.eq() === r`\dfrac{y^2}{36} - \dfrac{x^2}{64} = 1` && H1.slope2().eq(fr(9, 16)) && H1c.slope2().eq(fr(9, 16)) && fr(1).div(fr(25, 16)).add(fr(1).div(fr(25, 9))).eq(1), 'conjugate pair');
  V.conj = plot({ x: [-22, 22], y: [-16, 16], fns: [...H1.fns(22), ...H1c.fns(22), ...H1.asymptotes(22)], pts: [[10, 0, '$(10, 0)$', 'free'], [-10, 0, '$(-10, 0)$', 'free'], [0, 10, '$(0, 10)$', 'free'], [0, -10, '$(0, -10)$', 'free'], [8, 0, '$(8, 0)$', 'free'], [-8, 0, '$(-8, 0)$', 'free'], [0, 6, '$(0, 6)$'], [0, -6, '$(0, -6)$']] }, 'Plot of the hyperbola x squared over 64 minus y squared over 36 equals 1 and its conjugate hyperbola y squared over 36 minus x squared over 64 equals 1 with their common asymptotes: the first has vertices plus and minus 8 and foci plus and minus 10 on the x-axis, the second has vertices 0, plus and minus 6 and foci 0, plus and minus 10 on the y-axis.', 'A hyperbola, its conjugate and the shared asymptotes.');
  V.hwe2 = table(['Quantity', r`$\dfrac{y^2}{36} - \dfrac{x^2}{64} = 1$, the conjugate of $\dfrac{x^2}{64} - \dfrac{y^2}{36} = 1$`], [
    ['Transverse and conjugate axes', M(r`2b = 12 \text{ along the } y\text{-axis}, \; 2a = 16 \text{ along the } x\text{-axis}`)],
    ['Vertices and foci', M(r`(0, \pm 6) \text{ and } (0, \pm 10)`)],
    ["Eccentricity $e'$", M(r`e'^2 = 1 + \dfrac{a^2}{b^2} = \dfrac{100}{36}, \; e' = \dfrac{5}{3}`)],
    ['Directrices', M(H1c.dirTex())],
    ['Latus rectum', M(r`\dfrac{2a^2}{b} = \dfrac{64}{3}`)],
    ['Check with $e = \\dfrac{5}{4}$', M(r`\dfrac{1}{e^2} + \dfrac{1}{e'^2} = \dfrac{16}{25} + \dfrac{9}{25} = 1`)],
  ], 'Worked example 2 table: the conjugate hyperbola y squared over 36 minus x squared over 64 equals 1 has its transverse axis 12 along the y-axis, vertices 0, plus and minus 6, foci 0, plus and minus 10, eccentricity five thirds, directrices y equal to plus and minus 18 over 5 and latus rectum 64 over 3; and one over e squared plus one over e dash squared is 1.', 'Swap the roles of $a$ and $b$.');
}
// we3: e = 25/24, conjugate axis 14
{
  const H = new Hyperbola(576, 49);
  must(H.verify() && H.e.eq(fr(25, 24)) && H.c.eq(25) && fr(625, 576).sub(1).eq(fr(49, 576)) && H.lrTex() === r`\dfrac{49}{12}`, 'hwe3');
  V.hwe3 = table(['Step', 'Work'], [['Conjugate axis', M(r`2b = 14 \Rightarrow b = 7, \; b^2 = 49`)], [r`Use $e^2 = 1 + \dfrac{b^2}{a^2}$`, M(r`\dfrac{625}{576} = 1 + \dfrac{49}{a^2} \Rightarrow \dfrac{49}{576} = \dfrac{49}{a^2}`)], ['Solve', M(r`a^2 = 576, \; a = 24`)], ['Equation', M(H.eq())], ['Check', M(r`c = ae = 25, \; c^2 = 576 + 49 = 625`)]], 'Worked example 3 table: a conjugate axis of 14 gives b equal to 7; e equal to 25 over 24 gives a squared equal to 576; the hyperbola is x squared over 576 minus y squared over 49 equals 1 and c equal to 25 checks with 576 plus 49 equal to 625.', 'Use $b$ and $e$ to find $a$.');
}
// rectangular x^2 - y^2 = 16
{
  const H = new Hyperbola(16, 16), f = Math.sqrt(32);
  must(H.verify() && H.e2.eq(2) && H.e2conj.eq(2) && H.slope2().eq(1) && H.on(5, 3) && H.on(f * 0 + 4, 0) && sqTex(32) === r`4\sqrt{2}` && H.lrTex() === '8' && H.lrEndsTex() === r`(\pm 4\sqrt{2}, \pm 4)` && fr(32).div(16).sub(fr(16).div(16)).eq(1), 'rect');
  V.rect = plot({ x: [-12, 12], y: [-9, 9], fns: [...H.fns(12), ...H.asymptotes(12)], pts: [[f, 0, r`$S(4\sqrt{2}, 0)$`, 'free'], [-f, 0, r`$S'(-4\sqrt{2}, 0)$`, 'free'], [4, 0, '$A(4, 0)$', 'free'], [-4, 0, "$A'(-4, 0)$", 'free'], [f, 4, r`$(4\sqrt{2}, 4)$`], [5, 3, '$(5, 3)$']] }, 'Plot of the rectangular hyperbola x squared minus y squared equals 16 with its perpendicular asymptotes y equal to plus and minus x: the vertices at plus and minus 4, the foci at plus and minus 4 root 2 and the point 5, 3 on the curve.', 'A rectangular hyperbola: $a = b$, asymptotes at right angles.');
}
// we4: rectangular through (13, 5)
{
  const a2 = fr(13 * 13 - 5 * 5), H = new Hyperbola(a2, a2);
  must(a2.eq(144) && H.verify() && H.on(13, 5) && H.e2.eq(2) && H.c2.eq(288) && sqTex(288) === r`12\sqrt{2}` && H.dirTex() === r`x = \pm 6\sqrt{2}` && H.lrTex() === '24' && H.fociTex() === r`(\pm 12\sqrt{2}, 0)`, 'hwe4');
  V.hwe4 = table(['Step', 'Work'], [['Substitute $(13, 5)$ in $x^2 - y^2 = a^2$', M(r`a^2 = 169 - 25 = 144, \; a = 12`)], ['Equation', M(r`x^2 - y^2 = 144`)], ['Eccentricity', M(r`e = \sqrt{2}, \; c = ae = 12\sqrt{2}`)], ['Foci', M(H.fociTex())], ['Directrices', M(r`x = \pm \dfrac{a}{e} = \pm \dfrac{12}{\sqrt{2}} = \pm 6\sqrt{2}`)], ['Latus rectum', M(r`\dfrac{2b^2}{a} = 2a = 24`)]], 'Worked example 4 table: the rectangular hyperbola x squared minus y squared equals a squared through 13, 5 has a squared equal to 144, eccentricity root 2, foci plus and minus 12 root 2, directrices x equal to plus and minus 6 root 2 and latus rectum 24.', 'For a rectangular hyperbola $e = \\sqrt{2}$ and $b = a$.');
}
// focal property table of x^2/9 - y^2/7
{
  const H = new Hyperbola(9, 7), S = [4, 0], S2 = [-4, 0], pts = [[3, 0], [4, fr(7, 3)], [-4, fr(-7, 3)], [-3, 0]];
  const rows = pts.map(([x, y]) => {
    const u = dist(S, [x, y]), w = dist(S2, [x, y]);
    const ex = fr(4, 3).mul(fr(x).abs());
    must(H.on(x, y) && u && w && u.sub(w).abs().eq(6) && (u.lt(w) ? u : w).eq(ex.sub(3)) && (u.lt(w) ? w : u).eq(ex.add(3)), `hfocal row ${x}`);
    return [M(pt(x, y)), M(u.tex()), M(w.tex()), M(u.sub(w).abs().tex())];
  });
  V.hfocal = table([r`$P$ on $\dfrac{x^2}{9} - \dfrac{y^2}{7} = 1$`, '$SP$', "$S'P$", "$\\lvert SP - S'P \\rvert$"], rows, 'Table of four points of the hyperbola x squared over 9 minus y squared over 7 equals 1 with their distances from the foci S 4, 0 and S dash minus 4, 0: 1 and 7, 7 over 3 and 25 over 3, 25 over 3 and 7 over 3, and 7 and 1, and in every row the difference of the focal distances is 6, the length of the transverse axis.', 'The difference is $2a = 6$ for every point.');
}
// we5: focal distances on x^2/64 - y^2/36 = 1, P(16, 6 sqrt 3)
{
  const H = new Hyperbola(64, 36), y2 = fr(108);
  must(H.verify() && H.onSq(256, y2) && y2.eq(fr(36).mul(fr(256, 64).sub(1))) && fr(16 - 10).mul(6).add(y2).eq(144) && fr(16 + 10).mul(26).add(y2).eq(784) && fr(5, 4).mul(16).sub(8).eq(12) && fr(5, 4).mul(16).add(8).eq(28) && sqTex(108) === r`6\sqrt{3}`, 'hwe5');
  V.hwe5 = table(['Step', 'Work'], [['Foci and $e$', M(r`c^2 = 64 + 36 = 100, \; c = 10, \; e = \dfrac{10}{8} = \dfrac{5}{4}`)], [r`Ordinate at $x = 16$`, M(r`y^2 = 36\left(\dfrac{256}{64} - 1\right) = 108, \; y = \pm 6\sqrt{3}`)], ['Distance from $S(10, 0)$', M(r`SP = ex - a = \dfrac{5}{4} \times 16 - 8 = 12`)], ["Distance from $S'(-10, 0)$", M(r`S'P = ex + a = 20 + 8 = 28`)], ['Check', M(r`SP^2 = 6^2 + 108 = 144, \; S'P^2 = 26^2 + 108 = 784, \; S'P - SP = 16 = 2a`)]], 'Worked example 5 table: on the hyperbola x squared over 64 minus y squared over 36 equals 1 the point with x equal to 16 has y equal to plus or minus 6 root 3, and its distances from the foci are 20 minus 8, which is 12, and 20 plus 8, which is 28, with difference 16.', 'Focal distances $ex \\mp a$ on the right branch.');
}
// locus conditions
{
  const A = [-5, 0], B = [5, 0], Pt = [5, fr(16, 3)];
  const h = new Hyperbola(9, 16);
  must(h.on(5, fr(16, 3)) && dist(A, Pt).eq(fr(34, 3)) && dist(B, Pt).eq(fr(16, 3)) && dist(A, Pt).sub(dist(B, Pt)).eq(6) && dist(A, B).eq(10) && dist(A, [8, 0]).sub(dist(B, [8, 0])).eq(10) && dist(A, [-8, 0]).sub(dist(B, [-8, 0])).eq(-10), 'locus conditions');
  let grid = true; for (let x = -30; x <= 30; x += 0.5) for (let y = -30; y <= 30; y += 0.5) { if (Math.abs(Math.hypot(x + 5, y) - Math.hypot(x - 5, y)) > 10 + 1e-9) grid = false; }
  must(grid, 'no point has |PA - PB| above AB (triangle inequality on a grid)');
  V.hloc = table([r`$\lvert PA - PB \rvert = k$, with $A(-5, 0)$, $B(5, 0)$, $AB = 10$`, 'The locus', 'Example'], [
    [r`$k = 6 < AB$`, 'a hyperbola with foci $A$, $B$ and $2a = 6$', M(r`\dfrac{x^2}{9} - \dfrac{y^2}{16} = 1, \; P\left(5, \dfrac{16}{3}\right)`)],
    [r`$k = 10 = AB$`, 'two rays along the $x$-axis, not a hyperbola', r`$P(8, 0)$: $PA = 13$, $PB = 3$`],
    [r`$k = 12 > AB$`, 'no point at all', r`impossible: $\lvert PA - PB \rvert \le AB$`],
  ], 'Table of the locus of a point P with the absolute difference of PA and PB equal to k, for A minus 5, 0 and B 5, 0 which are 10 apart: for k equal to 6 it is the hyperbola x squared over 9 minus y squared over 16 equals 1; for k equal to 10 it is two rays along the x-axis; for k equal to 12 there is no point.', 'The constant $2a$ must be less than the distance between the fixed points.');
}
// we6: locus |PA - PB| = 24, A(15, 0), B(-15, 0)
{
  const H = new Hyperbola(144, 81), P1 = [20, 12], PA = dist([15, 0], P1), PB = dist([-15, 0], P1);
  must(H.verify() && H.c.eq(15) && H.on(20, 12) && H.on(20, -12) && PA.eq(13) && PB.eq(37) && PB.sub(PA).eq(24) && H.eTex() === r`\dfrac{5}{4}` && H.dirTex() === r`x = \pm \dfrac{48}{5}`, 'hwe6');
  V.hwe6 = plot({ x: [-34, 34], y: [-26, 26], fns: H.fns(34), pts: [[15, 0, '$A(15, 0)$', 'free'], [-15, 0, '$B(-15, 0)$', 'free'], [12, 0, '$(12, 0)$', 'free'], [-12, 0, '$(-12, 0)$', 'free'], [20, 12, '$P(20, 12)$'], [20, -12, '$(20, -12)$']] }, 'Plot of the hyperbola x squared over 144 minus y squared over 81 equals 1, the locus of the points whose distances from A 15, 0 and B minus 15, 0 differ by 24: the point P 20, 12 has PA equal to 13 and PB equal to 37.', 'The locus of $P$ with $\\lvert PA - PB \\rvert = 24$.');
}
// focus-directrix, hyperbola
{
  const c = fdConic([10, 0], [2, 0, -5], fr(4)), H = new Hyperbola(25, 75);
  must(quadTex(c) === '3x^2 - y^2 - 75 = 0' && quadKind(c) === 'hyperbola' && H.verify() && H.e.eq(2) && H.fociTex() === r`(\pm 10, 0)` && H.dirTex() === r`x = \pm \dfrac{5}{2}` && H.lrTex() === '30' && fdGap(c, 5, 0).isZero() && fdGap(c, 10, 15).isZero() && fdGap(c, 10, -15).isZero(), 'hwe7');
  V.hfd = table(['Step', 'Work'], [
    ['Same method', r`$PS = e \cdot PL$ with $e > 1$, squared`],
    ['Type', M(r`B^2 - 4AC > 0: \text{ a hyperbola}`)],
    [r`Example: $S(10, 0)$, directrix $2x - 5 = 0$, $e = 2$`, M(r`(x - 10)^2 + y^2 = 4\left(x - \dfrac{5}{2}\right)^2`)],
    ['Simplify', M(r`x^2 - 20x + 100 + y^2 = 4x^2 - 20x + 25 \Rightarrow 3x^2 - y^2 = 75`)],
    ['Standard form', M(H.eq())],
  ], 'Table for a hyperbola from a focus, a directrix and e: the method is the same as for the ellipse with e greater than 1 and B squared minus 4 A C positive; for the focus 10, 0, the directrix 2 x minus 5 equal to 0 and e equal to 2 the equation is 3 x squared minus y squared equals 75, that is x squared over 25 minus y squared over 75 equals 1.', 'Same method, $e > 1$.');
  V.hwe7 = plot({ x: [-22, 22], y: [-32, 32], fns: H.fns(22), pts: [[10, 0, '$S(10, 0)$', 'free'], [-10, 0, "$S'(-10, 0)$", 'free'], [5, 0, '$(5, 0)$', 'free'], [-5, 0, '$(-5, 0)$', 'free'], [10, 15, '$(10, 15)$'], [10, -15, '$(10, -15)$']] }, 'Plot of the hyperbola 3 x squared minus y squared equals 75 with its focus S at 10, 0, its vertices at plus and minus 5 and the two ends 10, 15 and 10, minus 15 of the latus rectum through S.', 'Focus $S(10, 0)$, directrix $x = \\dfrac{5}{2}$, $e = 2$.');
}
// we8: tilted rectangular hyperbola
{
  const c = fdConic([2, 2], [1, 1, 0], fr(2));
  const ys = [[2, 0], [0, 2], [-4, -6], [-6, -4]];
  must(quadTex(c) === 'xy + 2x + 2y - 4 = 0' && quadKind(c) === 'hyperbola' && ys.every(([x, y]) => quadAt(c, x, y).isZero() && fdGap(c, x, y).isZero()) && fr(8).div(fr(2).add(2)).sub(2).eq(0) && fr(8).div(fr(-4).add(2)).sub(2).eq(-6), 'we8 tilted');
  V.hwe8 = plot({ x: [-12, 10], y: [-12, 12], fns: [{ expr: '8/(x+2)-2', label: 'right branch', domain: [-1.2, 10] }, { expr: '8/(x+2)-2', label: 'left branch', domain: [-12, -2.8] }, { expr: '-x', label: 'directrix x + y = 0', domain: [-12, 10] }], pts: [[2, 2, '$S(2, 2)$', 'free'], [2, 0, '$(2, 0)$'], [0, 2, '$(0, 2)$'], [-4, -6, '$(-4, -6)$'], [-6, -4, '$(-6, -4)$']] }, 'Plot of the hyperbola x y plus 2 x plus 2 y minus 4 equals 0, that is x plus 2 times y plus 2 equals 8, with its two branches, the focus S at 2, 2, the directrix x plus y equals 0 and the points 2, 0; 0, 2; minus 4, minus 6 and minus 6, minus 4.', 'The focus $(2, 2)$, the directrix $x + y = 0$ and $e = \\sqrt{2}$.');
}
V.sum2 = table(['Task', 'Method', 'Result'], [
  ['Parts of a hyperbola', r`$a^2$ under the positive term`, M(r`c^2 = a^2 + b^2, \; e = \dfrac{c}{a} > 1`)],
  ['Conjugate hyperbola', r`swap $a^2$ and $b^2$, signs`, M(r`\dfrac{1}{e^2} + \dfrac{1}{e'^2} = 1`)],
  ['Latus rectum and directrices', 'along the transverse axis', M(r`\dfrac{2b^2}{a}, \; x = \pm \dfrac{a}{e}`)],
  ['Rectangular hyperbola', r`$a = b$`, M(r`e = \sqrt{2}, \; x^2 - y^2 = a^2`)],
  ['Focal property', 'difference of focal distances', M(r`\lvert SP - S'P \rvert = 2a, \; ex \pm a`)],
], 'Summary table for Part 2: parts of a hyperbola with c squared equal to a squared plus b squared, the conjugate hyperbola with one over e squared plus one over e dash squared equal to 1, the latus rectum and directrices along the transverse axis, the rectangular hyperbola with e equal to root 2, and the focal property.', 'Choose the method from the data given.');
V.tips2 = table(['Marks', 'Show'], [['1', 'the value only, after finding $a^2$ and $b^2$'], ['2 to 3', r`$a^2$, $b^2$, then $c$ or $e$, then the required parts`], ['5, in parts', 'the standard form first, then each part, and a check with the focal property']], 'Table of exam tips for Part 2: for 1 mark give the value after finding a squared and b squared; for 2 to 3 marks show a squared, b squared, then c or e and the parts; for 5 marks in parts write the standard form first and check with the focal property.', 'Remember $c^2 = a^2 + b^2$ here.');
