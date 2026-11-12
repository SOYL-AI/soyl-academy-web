// Visuals for ISC 11 Mathematics ch13 Conic Sections: Introduction and Parabola.
// Every number in a table or figure is computed here (exact rationals, point tests, independent routes) and asserted.
// K holds computed strings that build.mjs quotes in slide bullets, so a slide never repeats a typed number.
import { table, flow, plot as plot0 } from './lib.mjs';
import { Conic, Par, fr, sqrtF, sqTex, pt, d2, P, range, focusConic, ps2, pl2, e2At, coneSection, coneSectionByForm, numStr, parFns, dirFn, tx } from './conic.mjs';

const r = String.raw;
/** plot() that also marks 'free' points on_curve: false (the shared stage-4 lint needs the flag). */
const plot = (spec, alt, caption) => { const v = plot0(spec, alt, caption); (spec.pts ?? []).forEach((p, i) => { if (p[3] === 'free') v.spec.points[i].on_curve = false; }); return v; };
export const must = (cond, msg) => { if (!cond) throw new Error(`self-check failed: ${msg}`); };
export const V = {};
export const K = {};
const M = (t) => `$${t}$`;
const nm = (c) => ({ circle: 'a circle', ellipse: 'an ellipse', parabola: 'a parabola', hyperbola: 'a hyperbola', point: 'a single point', line: 'one straight line', 'pair of lines': 'a pair of intersecting lines' }[c]);
/** Marked point on a curve: asserted by the exact conic or parabola. */
const dec = (v) => { if (typeof v !== 'number' || Number.isInteger(v)) return fr(v); const [i, f] = String(v).split('.'); return fr(BigInt(i + f), 10n ** BigInt(f.length)); };
const on = (obj, x, y, label) => { must(obj.on([dec(x), dec(y)]), `(${x}, ${y}) lies on the curve`); return label === undefined ? [x, y] : [x, y, label]; };
const fl = (x, y, label) => [x, y, label, 'free'];
const n = (x) => fr(x).num();
/** Identity check: the expanded conic equals a polynomial given as a JS function of (x, y) at 49 integer points (sign fixed by the conic's normalisation). */
const sameAs = (c, f) => range(-3, 3).every((x) => range(-3, 3).every((y) => c.val([x, y]).eq(fr(f(x, y)))));

// ================================================================ deck 1
V.route1 = flow('LR', [['a', 'Sections of a double cone'], ['b', 'Focus, directrix and eccentricity'], ['c', 'Latus rectum'], ['d', 'Equation of a conic from S, l and e'], ['e', 'The parabola as the case e = 1']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Route map of Part 1: sections of a double cone, the focus, directrix and eccentricity, the latus rectum, finding the equation of a conic from a focus, a directrix and the eccentricity, and the parabola as the case where the eccentricity is 1.', 'Part 1 at a glance.');
V.goals1 = table(['You will be able to', 'Using', 'Key result'], [
  ['Name a section of a cone', r`the angle $\beta$ of the plane`, r`$\beta$ against the semi-vertical angle $\alpha$`],
  ['State the focus-directrix property', 'a fixed point and a fixed line', M(r`PS = e \cdot PL`)],
  ['Classify a conic from $e$', r`$e < 1$, $e = 1$, $e > 1$`, 'ellipse, parabola, hyperbola'],
  ['Find a latus rectum', r`the distance $p$ from focus to directrix`, M(r`2ep`)],
  ['Find the equation of a conic', 'distance formula and $e^2$', 'a second-degree equation, possibly with an $xy$ term'],
], 'Table of goals for Part 1: name a section of a cone from the angle of the plane, state the focus-directrix property, classify a conic from its eccentricity, find a latus rectum from the distance between focus and directrix, and write the equation of a conic.', 'What Part 1 covers.');

// cone sections
{
  const alpha = 40, rows = [90, 65, 40, 22, 0].map((b) => {
    const m = coneSection(alpha, b), v = coneSection(alpha, b, true);
    must(m === coneSectionByForm(alpha, b) && v === coneSectionByForm(alpha, b, true), `cone ${b}`);
    return [M(`${b}^\\circ`), b > alpha ? M(r`\beta > \alpha`) : b === alpha ? M(r`\beta = \alpha`) : M(r`\beta < \alpha`), m, v];
  });
  must(rows.map((x) => x[2]).join() === 'circle,ellipse,parabola,hyperbola,hyperbola' && rows.map((x) => x[3]).join() === 'point,point,line,pair of lines,pair of lines', 'cone table values');
  V.cone = table([r`Angle $\beta$ of the plane with the axis`, r`Compare with $\alpha = 40^\circ$`, 'Plane misses the vertex', 'Plane passes through the vertex'], rows, 'Table of sections of a double cone with semi-vertical angle 40 degrees: a plane at 90 degrees gives a circle, at 65 degrees an ellipse, at 40 degrees a parabola, and at 22 degrees or 0 degrees a hyperbola when it misses the vertex; through the vertex the same planes give a point, a point, one line, and a pair of lines.', r`Compare $\beta$ with the semi-vertical angle $\alpha$.`);
}
{
  const a = 47, rows = [[60, 'point'], [47, 'line'], [20, 'pair of lines']].map(([b, w]) => { must(coneSection(a, b, true) === w && coneSectionByForm(a, b, true) === w, `degenerate ${b}`); return [M(`${b}^\\circ`), b > a ? M(r`\beta > \alpha`) : b === a ? M(r`\beta = \alpha`) : M(r`\beta < \alpha`), nm(w)]; });
  V.degen = table([r`Angle $\beta$ (cone with $\alpha = 47^\circ$)`, 'Compare', 'Section through the vertex'], rows, 'Table of the degenerate sections made by a plane through the vertex of a double cone with semi-vertical angle 47 degrees: a plane at 60 degrees meets it in a single point, at 47 degrees in one straight line, and at 20 degrees in a pair of intersecting straight lines.', 'A plane through the vertex gives a point, a line or two lines.');
}
{
  const a = 52, rows = [70, 52, 25].map((b) => [M(`${b}^\\circ`), nm(coneSection(a, b)).replace(/^a /, '').replace(/^an /, ''), nm(coneSection(a, b, true))]);
  must(rows.map((x) => x[1]).join() === 'ellipse,parabola,hyperbola' && rows.map((x) => x[2]).join() === 'a single point,one straight line,a pair of intersecting lines' && [70, 52, 25].every((b) => coneSection(a, b) === coneSectionByForm(a, b) && coneSection(a, b, true) === coneSectionByForm(a, b, true)), 'we1 cone values');
  V.we1 = table([r`Angle $\beta$ ($\alpha = 52^\circ$)`, 'Plane misses the vertex', 'Plane through the vertex'], rows, 'Worked example 1 table for a cone with semi-vertical angle 52 degrees: a plane at 70 degrees gives an ellipse or a single point, at 52 degrees a parabola or one straight line, and at 25 degrees a hyperbola or a pair of intersecting lines.', 'Compare $\\beta$ with $52^\\circ$.');
}
// focus-directrix property
{
  const p = new Par('R', 2);
  p.verify();
  const S = p.focus, ln = p.line;
  const pts = [[2, 4], [2, -4], [8, 8]];
  pts.forEach(([x, y]) => must(p.on([x, y]) && e2At(S, ln, [x, y]).eq(1), 'PS = PL'));
  must(sqrtF(ps2(S, [8, 8])).eq(10) && sqrtF(pl2(ln, [8, 8])).eq(10), 'P(8,8): PS = PL = 10');
  V.fd = plot({ x: [-3, 12], y: [-10, 10], fns: parFns(p, [-3, 12]), pts: [fl(2, 0, '$S(2, 0)$'), fl(-2, 0, '$(-2, 0)$'), on(p, 8, 8, '$P(8, 8)$'), on(p, 2, 4, '$(2, 4)$'), on(p, 2, -4, '$(2, -4)$')] }, 'Plot of the parabola y squared equals 8 x with its focus S at 2, 0; the directrix is the vertical line x equals minus 2, which meets the x-axis at minus 2, 0. The point P at 8, 8 is 10 units from S and 10 units from the directrix.', 'Here $PS = PL = 10$ for $P(8, 8)$; the directrix is the line $x = -2$.');
}
// classification by e: focus (0,0), directrix x = 4
const F0 = [0, 0], L4 = [1, 0, -4];
const eRows = [[fr(3, 4), [0, 3]], [fr(1), [0, 4]], [fr(5, 2), [8, 6]]];
{
  const rows = eRows.map(([e, p]) => {
    const c = focusConic(F0, L4, e.mul(e));
    const ps = sqrtF(ps2(F0, p)), pl = sqrtF(pl2(L4, p));
    must(c.on(p) && ps.div(pl).eq(e) && c.kind() === (e.eq(1) ? 'parabola' : e.lt(1) ? 'ellipse' : 'hyperbola'), `class e ${e}`);
    return [M(tx(e)), M(pt(...p)), M(ps.tex()), M(pl.tex()), c.kind(), M(c.tex())];
  });
  must(rows[0][5] === M('7x^2 + 16y^2 + 72x - 144 = 0') && rows[1][5] === M('y^2 + 8x - 16 = 0') && rows[2][5] === M('21x^2 - 4y^2 - 200x + 400 = 0'), 'eclass equations');
  K.e34 = rows[0][5]; K.eq1 = rows[1][5]; K.e52 = rows[2][5];
  V.eclass = table(['$e$', 'A point $P$ on the conic', '$PS$', '$PL$', 'Conic', 'Equation (from $PS^2 = e^2 PL^2$)'], rows, 'Table for the focus S at the origin and the directrix x equals 4: with e equal to three quarters the point 0, 3 has PS 3 and PL 4, an ellipse; with e equal to 1 the point 0, 4 has PS 4 and PL 4, a parabola; with e equal to five halves the point 8, 6 has PS 10 and PL 4, a hyperbola.', r`$e = PS \div PL$ is less than $1$, equal to $1$, or greater than $1$.`);
}
// latus rectum in general
{
  const rows = eRows.map(([e, p]) => {
    const c = focusConic(F0, L4, e.mul(e)), dist = fr(4), lr = e.mul(dist).mul(2);
    const ys = range(-40, 40).filter((y) => c.on([0, y]));
    must(ys.length === 2 && fr(ys[1] - ys[0]).eq(lr) && ys.every((y) => e2At(F0, L4, [0, y]).eq(e.mul(e))), `latus rectum e ${e}`);
    return [M(tx(e)), M(r`2ep = 2 \times ${tx(e)} \times 4 = ${lr.tex()}`), M(`(0, ${ys[0]}) \\text{ and } (0, ${ys[1]})`)];
  });
  K.lr34 = 6; K.lr1 = 8; K.lr52 = 20;
  must(rows[0][1].includes('= 6') && rows[1][1].includes('= 8') && rows[2][1].includes('= 20'), 'lr values');
  V.lrgen = table([r`$e$ (focus $(0, 0)$, directrix $x = 4$, so $p = 4$)`, 'Length of the latus rectum', 'Ends of the latus rectum'], rows, 'Table of latus rectums for the focus at the origin and the directrix x equals 4, where p is 4: for e equal to three quarters the latus rectum has length 6 with ends 0, minus 3 and 0, 3; for e equal to 1 it has length 8; for e equal to five halves it has length 20 with ends 0, minus 10 and 0, 10.', 'The latus rectum is the chord through the focus perpendicular to the axis.');
}
V.method = table(['Step', 'What to write'], [
  ['1. Name the point', r`Let $P(x, y)$ be any point of the conic, $S(p, q)$ the focus`],
  ['2. Distance from the focus', M(r`PS^2 = (x - p)^2 + (y - q)^2`)],
  ['3. Distance from the directrix', M(r`PL^2 = \dfrac{(ax + by + c)^2}{a^2 + b^2}`)],
  ['4. Apply the property', M(r`PS^2 = e^2 \, PL^2`)],
  ['5. Clear fractions and collect', 'a second-degree equation, with an $xy$ term when $a \\ne 0$ and $b \\ne 0$'],
  ['6. Name the conic', r`from $e$: $e < 1$, $e = 1$ or $e > 1$`],
], 'Table of the method for the equation of a conic from a focus, a directrix and the eccentricity: name the point, write PS squared, write PL squared with the perpendicular distance formula, set PS squared equal to e squared times PL squared, clear fractions and collect, then name the conic from e.', 'Square the property so that no root is needed.');
// we2: hyperbola, focus (-1,2), x = 3, e = 3/2
{
  const c = focusConic([-1, 2], [1, 0, -3], fr(9, 4));
  must(c.tex() === '5x^2 - 4y^2 - 62x + 16y + 61 = 0' && sameAs(c, (x, y) => 9 * (x - 3) ** 2 - 4 * (x + 1) ** 2 - 4 * (y - 2) ** 2) && c.kind() === 'hyperbola', 'we2');
  K.we2 = c.tex();
  V.we2 = table(['Step', 'Work'], [
    ['Distances', M(r`PS^2 = (x + 1)^2 + (y - 2)^2, \quad PL = \lvert x - 3 \rvert`)],
    ['Apply $PS^2 = e^2 PL^2$ with $e = \\dfrac{3}{2}$', M(r`(x + 1)^2 + (y - 2)^2 = \dfrac{9}{4}(x - 3)^2`)],
    ['Clear the fraction', M(r`4(x + 1)^2 + 4(y - 2)^2 = 9(x - 3)^2`)],
    ['Expand and collect', M(c.tex())],
    ['Name the conic', r`$e = \dfrac{3}{2} > 1$: a hyperbola`],
  ], 'Worked example 2 table: for the focus at minus 1, 2, the directrix x equals 3 and e equal to three halves, PS squared equals nine quarters PL squared, which gives 5 x squared minus 4 y squared minus 62 x plus 16 y plus 61 equals 0, a hyperbola because e is greater than 1.', 'The directrix is vertical, so there is no $xy$ term.');
}
// we3: oblique directrix, ellipse, focus (3,1), x + y = 2, e = 1/2
{
  const c = focusConic([3, 1], [1, 1, -2], fr(1, 4));
  must(c.tex() === '7x^2 - 2xy + 7y^2 - 44x - 12y + 76 = 0' && sameAs(c, (x, y) => 8 * ((x - 3) ** 2 + (y - 1) ** 2) - (x + y - 2) ** 2) && c.kind() === 'ellipse' && c.disc().eq(-192), 'we3');
  K.we3 = c.tex();
  V.we3 = table(['Step', 'Work'], [
    ['Distances', M(r`PS^2 = (x - 3)^2 + (y - 1)^2, \quad PL^2 = \dfrac{(x + y - 2)^2}{2}`)],
    ['Apply $PS^2 = e^2 PL^2$ with $e = \\dfrac{1}{2}$', M(r`(x - 3)^2 + (y - 1)^2 = \dfrac{1}{4} \times \dfrac{(x + y - 2)^2}{2}`)],
    ['Clear fractions (multiply by $8$)', M(r`8(x - 3)^2 + 8(y - 1)^2 = (x + y - 2)^2`)],
    ['Expand and collect', M(c.tex())],
    ['Name the conic', r`$e = \dfrac{1}{2} < 1$: an ellipse (the $xy$ term appears because the directrix is oblique)`],
  ], 'Worked example 3 table: for the focus at 3, 1, the directrix x plus y equals 2 and e equal to one half, PS squared equals one quarter PL squared with PL squared equal to x plus y minus 2 all squared over 2; multiplying by 8 and collecting gives 7 x squared minus 2 x y plus 7 y squared minus 44 x minus 12 y plus 76 equals 0, an ellipse.', 'An oblique directrix gives an $xy$ term.');
}
// quick check with B^2 - 4AC
{
  const eq = (S, ln, e2) => focusConic(S, ln, e2);
  const items = [[fr(3, 2), eq([-1, 2], [1, 0, -3], fr(9, 4))], [fr(1, 2), eq([3, 1], [1, 1, -2], fr(1, 4))], [fr(2, 3), eq([4, 0], [1, 0, -9], fr(4, 9))], [fr(1), eq([2, 1], [1, -1, 1], fr(1))]];
  const rows = items.map(([e, c]) => [M(tx(e)), M(c.tex()), M(String(c.disc().str())), c.kind()]);
  must(rows.map((x) => x[2]).join() === [`$${items[0][1].disc()}$`, '$-192$', `$${items[2][1].disc()}$`, '$0$'].join() && items[0][1].disc().sign() > 0 && items[2][1].disc().sign() < 0 && items[3][1].disc().isZero(), 'disc rows');
  V.disc = table(['$e$', 'Equation of the conic', r`$B^2 - 4AC$`, 'Conic'], rows, 'Table comparing the eccentricity with the sign of B squared minus 4 A C for four conics: e of three halves gives a positive value and a hyperbola, e of one half and two thirds give negative values and ellipses, and e equal to 1 gives zero and a parabola.', r`For $Ax^2 + Bxy + Cy^2 + \cdots = 0$ the sign of $B^2 - 4AC$ agrees with $e$.`);
}
// we4: locus, ellipse from focus (4,0), x = 9, e = 2/3
{
  const c = focusConic([4, 0], [1, 0, -9], fr(4, 9));
  must(c.tex() === '5x^2 + 9y^2 - 180 = 0' && c.kind() === 'ellipse', 'we4');
  const f1 = { expr: 'sqrt(20-5*x^2/9)', domain: [-5.9999, 5.9999], label: 'upper half' }, f2 = { expr: '-sqrt(20-5*x^2/9)', domain: [-5.9999, 5.9999], label: 'lower half' };
  must(c.on([4, fr(10, 3)]) && c.on([4, fr(-10, 3)]) && fr(20).sub(fr(5, 9).mul(16)).eq(fr(100, 9)) && !c.on([4, 3]), 'we4 points');
  K.we4 = c.tex();
  V.we4 = plot({ x: [-8, 12], y: [-6, 6], fns: [f1, f2], pts: [fl(4, 0, '$S(4, 0)$'), fl(9, 0, '$(9, 0)$'), [4, 10 / 3, '$A$'], [4, -10 / 3, '$B$']] }, 'Plot of the curve 5 x squared plus 9 y squared equals 180, drawn as an upper and a lower half; the focus S is at 4, 0, the directrix is the vertical line x equals 9, and the two points A and B at x equal to 4 lie on the curve.', 'The locus of $P$ with $PS = \\dfrac{2}{3}PL$ is a closed curve.');
}
// parabola as e = 1
{
  const p = new Par('R', 3);
  p.verify();
  must(p.eqTex() === 'y^2 = 12x' && p.on([12, 12]) && p.on([12, -12]) && sqrtF(ps2(p.focus, [12, 12])).eq(15) && sqrtF(pl2(p.line, [12, 12])).eq(15), 'par1');
  V.par1 = plot({ x: [-5, 15], y: [-14, 14], fns: parFns(p, [-5, 15]), pts: [fl(3, 0, '$S(3, 0)$'), fl(-3, 0, '$(-3, 0)$'), on(p, 3, 6, '$(3, 6)$'), on(p, 3, -6, '$(3, -6)$'), on(p, 12, 12, '$P(12, 12)$')] }, 'Plot of the parabola y squared equals 12 x, from the focus 3, 0 and the directrix x equals minus 3; the ends of the latus rectum 3, 6 and 3, minus 6, and the point P at 12, 12 lie on it, with PS and PL both equal to 15 for P.', 'With $e = 1$: $(x - 3)^2 + y^2 = (x + 3)^2$ gives $y^2 = 12x$.');
}
{
  const cons = [[fr(3, 4), 'ellipse'], [fr(1), 'parabola'], [fr(5, 2), 'hyperbola']];
  must(cons.every(([e, k]) => focusConic(F0, L4, e.mul(e)).kind() === k), 'sum1');
  V.sum1 = table(['Idea', 'Result'], [
    ['Section of a cone', r`$\beta > \alpha$ ellipse, $\beta = \alpha$ parabola, $\beta < \alpha$ hyperbola; $\beta = 90^\circ$ circle`],
    ['Through the vertex', r`$\beta > \alpha$ a point, $\beta = \alpha$ one line, $\beta < \alpha$ two lines`],
    ['Focus-directrix property', M(r`PS = e \cdot PL, \quad e < 1, \; e = 1, \; e > 1`)],
    ['Latus rectum', M(r`2ep, \text{ where } p \text{ is the distance from the focus to the directrix}`)],
    ['Equation', M(r`PS^2 = e^2 PL^2 \text{ with } PL^2 = \dfrac{(ax + by + c)^2}{a^2 + b^2}`)],
  ], 'Summary table for Part 1: the three sections of a cone by the angle of the plane, the degenerate sections through the vertex, the focus-directrix property with the three ranges of e, the latus rectum 2 e p, and the equation from PS squared equals e squared PL squared.', 'The angle decides the section; $e$ decides the conic.');
}
V.tips1 = table(['Marks', 'Show'], [['1', 'the name of the conic, with the comparison of $\\beta$ and $\\alpha$ or of $e$ and $1$'], ['2-3', 'PS squared, PL squared, the equation $PS^2 = e^2 PL^2$ and the expanded form'], ['5, in parts', 'the equation, the name from $e$, the latus rectum and a check of one point']], 'Table of exam tips for Part 1: for 1 mark name the conic with the comparison; for 2 or 3 marks show PS squared, PL squared, the equation PS squared equals e squared PL squared and the expanded form; for 5 marks set in parts give the equation, the name, the latus rectum and a check of one point.', 'Check one point of the conic in $PS = e \\cdot PL$.');

// ================================================================ deck 2
V.route2 = flow('LR', [['a', 'Four standard forms'], ['b', 'Reading an equation'], ['c', 'Writing an equation'], ['d', 'Focal distance'], ['e', 'General position, vertex (h, k) and applications']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Route map of Part 2: the four standard forms of the parabola, reading an equation, writing an equation from data, the focal distance of a point, and then parabolas in general position, with vertex at h, k, and applications.', 'Part 2 at a glance.');
V.goals2 = table(['You will be able to', 'Using', 'Key result'], [
  ['Read a parabola from its equation', r`$y^2 = \pm 4ax$, $x^2 = \pm 4ay$`, 'focus, directrix, axis, latus rectum'],
  ['Sketch a parabola', 'the vertex and the ends of the latus rectum', 'a rough curve'],
  ['Write the equation from data', 'focus, directrix, a point, a latus rectum', r`$a$ and the form`],
  ['Find a focal distance', r`$x + a$ for $y^2 = 4ax$`, r`$a(t^2 + 1)$ for $(at^2, 2at)$`],
  ['Handle general position and applications', r`$PS^2 = PL^2$, vertex $(h, k)$`, 'arches, dishes, cables, paths'],
], 'Table of goals for Part 2: reading a parabola from its standard equation, sketching it, writing its equation from data, finding a focal distance, and handling general position, a vertex at h, k and applications.', 'What Part 2 covers.');
// four forms, a = 3
{
  const ps = [new Par('R', 3), new Par('L', 3), new Par('U', 3), new Par('D', 3)];
  ps.forEach((p) => p.verify());
  const opens = ['to the right', 'to the left', 'upward', 'downward'], axis = ['$x$-axis', '$x$-axis', '$y$-axis', '$y$-axis'];
  const rows = ps.map((p, i) => [M(p.eqTex()), opens[i], axis[i], M(p.focTex()), M(p.dirTex()), M(`(${p.lrEnds[0].map((v) => v.tex()).join(', ')}) \\text{ and } (${p.lrEnds[1].map((v) => v.tex()).join(', ')})`)]);
  must(rows.map((x) => x[0]).join() === ['$y^2 = 12x$', '$y^2 = -12x$', '$x^2 = 12y$', '$x^2 = -12y$'].join() && ps[1].focTex() === '(-3, 0)' && ps[3].dirTex() === 'y = 3' && ps[2].lr.eq(12), 'forms a = 3');
  V.forms = table(['Standard form ($a = 3$)', 'Opens', 'Axis', 'Focus', 'Directrix', 'Ends of the latus rectum'], rows, 'Table of the four standard parabolas with a equal to 3: y squared equals 12 x opens right with focus 3, 0 and directrix x equals minus 3; y squared equals minus 12 x opens left; x squared equals 12 y opens up with focus 0, 3 and directrix y equals minus 3; x squared equals minus 12 y opens down; each latus rectum has length 12.', 'Focus at distance $a$ from the vertex, directrix at distance $a$ on the other side.');
}
// sketches
{
  const R = new Par('R', 2), L = new Par('L', 2);
  [R, L].forEach((p) => p.verify());
  const f1 = parFns(R, [-12, 12], false), f2 = parFns(L, [-12, 12], false);
  f1[0].label = 'y^2 = 8x'; f2[0].label = 'y^2 = -8x';
  V.sk1 = plot({ x: [-12, 12], y: [-10, 10], fns: [...f1, ...f2], pts: [fl(0, 0, '$O$'), fl(2, 0, '$S_1(2, 0)$'), fl(-2, 0, '$S_2(-2, 0)$'), on(R, 2, 4, '$(2, 4)$'), on(R, 2, -4, '$(2, -4)$'), on(L, -2, 4, '$(-2, 4)$'), on(L, -2, -4, '$(-2, -4)$')] }, 'Plot of the two parabolas y squared equals 8 x, opening right with focus 2, 0, and y squared equals minus 8 x, opening left with focus minus 2, 0; the ends of the latus rectums 2, 4 and 2, minus 4 and minus 2, 4 and minus 2, minus 4 lie on them.', 'Both have $a = 2$: latus rectum $4a = 8$.');
}
{
  const U = new Par('U', 3), D = new Par('D', 3);
  [U, D].forEach((p) => p.verify());
  const f1 = parFns(U, [-9, 9], false), f2 = parFns(D, [-9, 9], false);
  f1[0].label = 'x^2 = 12y'; f2[0].label = 'x^2 = -12y';
  V.sk2 = plot({ x: [-10, 10], y: [-8, 8], fns: [...f1, ...f2, dirFn(U, [-9, 9], 'directrix of x^2 = 12y'), dirFn(D, [-9, 9], 'directrix of x^2 = -12y')], pts: [on(U, 0, 0, '$O$'), fl(0, 3, '$S_1(0, 3)$'), fl(0, -3, '$S_2(0, -3)$'), on(U, 6, 3, '$(6, 3)$'), on(U, -6, 3, '$(-6, 3)$'), on(D, 6, -3, '$(6, -3)$'), on(D, -6, -3, '$(-6, -3)$')] }, 'Plot of the parabolas x squared equals 12 y, opening up with focus 0, 3, and x squared equals minus 12 y, opening down with focus 0, minus 3, together with their horizontal directrices y equals minus 3 and y equals 3; the ends of the latus rectums plus or minus 6, 3 and plus or minus 6, minus 3 lie on the curves.', 'Both have $a = 3$: latus rectum $4a = 12$.');
}
// we1: x^2 = -16y
{
  const p = new Par('D', 4);
  p.verify();
  must(p.eqTex() === 'x^2 = -16y' && p.focTex() === '(0, -4)' && p.dirTex() === 'y = 4' && p.lr.eq(16) && p.lrEnds.map((e) => pt(...e)).join() === '(8, -4),(-8, -4)', 'we1');
  K.we1 = { focus: p.focTex(), dir: p.dirTex(), ends: p.lrEnds.map((e) => pt(...e)) };
  V.p1 = table(['Step', 'Work'], [
    ['Compare with $x^2 = -4ay$', M(r`4a = 16 \Rightarrow a = 4`)],
    ['Axis and opening', 'the $y$-axis, opening downward'],
    ['Focus', M(r`(0, -a) = (0, -4)`)],
    ['Directrix', M(r`y = a, \text{ that is } y = 4`)],
    ['Latus rectum', M(r`4a = 16, \text{ with ends } (\pm 8, -4)`)],
  ], 'Worked example 1 table for the parabola x squared equals minus 16 y: 4a is 16 so a is 4, the axis is the y-axis and it opens downward, the focus is 0, minus 4, the directrix is y equals 4, and the latus rectum has length 16 with ends plus or minus 8, minus 4.', 'Opens downward: the focus is below the vertex.');
}
// find the equation
V.find = table(['Given', 'Form', 'Find $a$ from'], [
  ['Focus $(a, 0)$ with $a > 0$, or directrix $x = -a$', M(r`y^2 = 4ax`), 'the focus or the directrix'],
  ['Focus $(-a, 0)$, or directrix $x = a$', M(r`y^2 = -4ax`), 'the focus or the directrix'],
  ['Focus $(0, a)$, or directrix $y = -a$', M(r`x^2 = 4ay`), 'the focus or the directrix'],
  ['Focus $(0, -a)$, or directrix $y = a$', M(r`x^2 = -4ay`), 'the focus or the directrix'],
  ['A point $(x_1, y_1)$ of the parabola', 'the form its position allows', r`substitute: $a = \dfrac{y_1^2}{4x_1}$ or $\dfrac{x_1^2}{4y_1}$ up to sign`],
  ['The latus rectum $4a$', 'the form from the axis', r`$a = \dfrac{\text{length}}{4}$`],
], 'Table for finding the equation of a parabola with vertex at the origin: the focus or directrix on the x-axis gives y squared equals plus or minus 4 a x and on the y-axis gives x squared equals plus or minus 4 a y; a point of the parabola is substituted to find a, and a latus rectum of length L gives a equal to L over 4.', 'Choose the form from the axis and the side, then find $a$.');
// we2: y^2 = -9x through (-4, 6)
{
  const p = new Par('L', fr(9, 4));
  p.verify();
  must(p.eqTex() === 'y^2 = -9x' && p.on([-4, 6]) && p.focTex() === '(-\\dfrac{9}{4}, 0)' && p.dirTex() === 'x = \\dfrac{9}{4}' && p.lr.eq(9) && [new Par('R', 1), new Par('L', 1), new Par('U', 1), new Par('D', 1)].filter((q) => q.horizontal && q.on([-4, 6])).length === 0, 'we2');
  K.we2p = p;
  V.p2 = plot({ x: [-14, 3], y: [-12, 12], fns: parFns(p, [-14, 3]), pts: [fl(0, 0, '$O$'), fl(-2.25, 0, '$S$'), on(p, -4, 6, '$P(-4, 6)$'), on(p, -4, -6, '$(-4, -6)$'), on(p, -2.25, 4.5, '$(-2.25, 4.5)$'), on(p, -2.25, -4.5, '$(-2.25, -4.5)$')] }, 'Plot of the parabola y squared equals minus 9 x, opening left, with focus S at minus 9 over 4, 0; it passes through P at minus 4, 6 and its reflection minus 4, minus 6, and the ends of its latus rectum are minus 2.25, 4.5 and minus 2.25, minus 4.5.', 'The point $(-4, 6)$ lies on $y^2 = -9x$: $36 = 36$.');
}
// focal distance and parametric point
{
  const p = new Par('R', 3), t = 2;
  const q = p.param(t);
  must(pt(...q) === '(12, 12)' && p.focal(q).eq(15) && p.focal(q).eq(q[0].add(3)) && p.focal(q).eq(p.a.mul(fr(t * t + 1))), 'focal t = 2');
  const rows = [new Par('R', 3), new Par('L', 3), new Par('U', 3), new Par('D', 3)].map((pp, i) => {
    const pq = pp.param(2), f = pp.focal(pq);
    const rule = ['x_1 + a', 'a - x_1', 'y_1 + a', 'a - y_1'][i];
    const num = [pq[0].add(3), fr(3).sub(pq[0]), pq[1].add(3), fr(3).sub(pq[1])][i];
    must(f.eq(num), `focal rule ${i}`);
    return [M(pp.eqTex()), M(rule), M(pt(...pq)), M(f.tex())];
  });
  V.focal = table(['Parabola ($a = 3$)', 'Focal distance of $(x_1, y_1)$', 'Point for $t = 2$', 'Focal distance'], rows, 'Table of focal distances for the four standard parabolas with a equal to 3: for y squared equals 12 x the distance is x one plus a, for y squared equals minus 12 x it is a minus x one, for x squared equals 12 y it is y one plus a, and for x squared equals minus 12 y it is a minus y one; for the parameter t equal to 2 each focal distance is 15.', r`The point $(at^2, 2at)$ of $y^2 = 4ax$ has focal distance $a(t^2 + 1)$.`);
}
// we3: x^2 = -36y, P(-12, -4)
{
  const p = new Par('D', 9);
  p.verify();
  const q = [-12, -4];
  must(p.eqTex() === 'x^2 = -36y' && p.on(q) && p.focal(q).eq(13) && p.focal(q).eq(fr(9).sub(q[1])) && p.focTex() === '(0, -9)', 'we3');
  V.p3 = plot({ x: [-26, 26], y: [-22, 12], fns: [...parFns(p, [-26, 26]), dirFn(p, [-26, 26])], pts: [on(p, 0, 0, '$O$'), fl(0, -9, '$S(0, -9)$'), on(p, -12, -4, '$P(-12, -4)$'), on(p, 12, -4, '$(12, -4)$')] }, 'Plot of the parabola x squared equals minus 36 y, opening down, with focus S at 0, minus 9 and directrix y equals 9; the point P at minus 12, minus 4 and its mirror image 12, minus 4 lie on it, and P is 13 units from S.', 'For $x^2 = -4ay$ the focal distance is $a - y_1$.');
}
// shifted forms: vertex (2, -1), a = 2
{
  const ps = [new Par('R', 2, 2, -1), new Par('L', 2, 2, -1), new Par('U', 2, 2, -1), new Par('D', 2, 2, -1)];
  ps.forEach((p) => p.verify());
  const rows = ps.map((p) => [M(p.eqTex()), M(p.focTex()), M(p.dirTex()), M(p.axisTex())]);
  must(rows[0][0] === '$(y + 1)^2 = 8(x - 2)$' && ps[1].focTex() === '(0, -1)' && ps[2].dirTex() === 'y = -3' && ps[3].axisTex() === 'x = 2' && ps[0].focTex() === '(4, -1)', 'shifted table');
  V.shift = table(['Parabola with vertex $(2, -1)$ and $a = 2$', 'Focus', 'Directrix', 'Axis'], rows, 'Table of the four parabolas with vertex at 2, minus 1 and a equal to 2: y plus 1 all squared equals 8 times x minus 2 opens right with focus 4, minus 1; the left-opening one has focus 0, minus 1; x minus 2 all squared equals 8 times y plus 1 opens up with directrix y equals minus 3; and the downward one has axis x equals 2.', 'Replace $x$ by $x - h$ and $y$ by $y - k$.');
}
// we4: vertex (2, -1), focus (2, 3)
{
  const p = new Par('U', 4, 2, -1);
  p.verify();
  must(p.eqTex() === '(x - 2)^2 = 16(y + 1)' && p.genTex() === 'x^2 - 4x - 16y - 12 = 0' && p.focTex() === '(2, 3)' && p.dirTex() === 'y = -5' && p.on([10, 3]) && p.on([-6, 3]), 'we4');
  K.we4p = p;
  V.p4 = plot({ x: [-10, 14], y: [-8, 8], fns: [...parFns(p, [-10, 14]), dirFn(p, [-10, 14])], pts: [on(p, 2, -1, '$V(2, -1)$'), fl(2, 3, '$S(2, 3)$'), on(p, 10, 3, '$(10, 3)$'), on(p, -6, 3, '$(-6, 3)$')] }, 'Plot of the parabola x minus 2 all squared equals 16 times y plus 1, with vertex V at 2, minus 1, focus S at 2, 3 and directrix y equals minus 5; the ends of the latus rectum 10, 3 and minus 6, 3 lie on it.', 'Vertex $(2, -1)$, $a = 4$, opening upward.');
}
// general position
V.gen = table(['Step', 'Work for focus $S(p, q)$ and directrix $ax + by + c = 0$'], [
  ['Distance from the focus', M(r`PS^2 = (x - p)^2 + (y - q)^2`)],
  ['Distance from the directrix', M(r`PL = \dfrac{\lvert ax + by + c \rvert}{\sqrt{a^2 + b^2}}`)],
  ['The parabola has $e = 1$', M(r`PS^2 = PL^2`)],
  ['Clear the denominator', M(r`(a^2 + b^2)\left[(x - p)^2 + (y - q)^2\right] = (ax + by + c)^2`)],
  ['The result', r`a second-degree equation with $B^2 - 4AC = 0$`],
], 'Table of the method for a parabola in general position: write PS squared from the focus, write PL from the perpendicular distance formula, set PS squared equal to PL squared, multiply by a squared plus b squared, and the result is a second-degree equation for which B squared minus 4 A C is zero.', 'No root is needed once both sides are squared.');
// we5: focus (2,1), directrix x - y + 1 = 0
{
  const c = focusConic([2, 1], [1, -1, 1], fr(1));
  must(c.tex() === 'x^2 + 2xy + y^2 - 10x - 2y + 9 = 0' && c.disc().isZero() && sameAs(c, (x, y) => 2 * ((x - 2) ** 2 + (y - 1) ** 2) - (x - y + 1) ** 2) && c.on([fr(3, 2), fr(3, 2)]) && c.on([3, 2]) && c.on([3, -6]), 'we5');
  must(sqrtF(ps2([2, 1], [3, 2])) === null && ps2([2, 1], [3, 2]).eq(2) && pl2([1, -1, 1], [3, 2]).eq(2), 'we5 P: PS^2 = PL^2 = 2');
  K.we5 = c.tex();
  const upper = { expr: '1-x+sqrt(8*(x-1))', label: 'upper branch', domain: [1.0001, 6] }, lower = { expr: '1-x-sqrt(8*(x-1))', label: 'lower branch', domain: [1.0001, 6] };
  const dirl = { expr: 'x+1', label: 'directrix', domain: [-2, 5.5] }, axis = { expr: '3-x', label: 'axis', domain: [-1, 5] };
  V.p5 = plot({ x: [-3, 8], y: [-13, 7], fns: [upper, lower, dirl, axis], pts: [on(c, 1.5, 1.5, '$V$'), fl(2, 1, '$S(2, 1)$'), [1, 2, '$(1, 2)$'], on(c, 3, 2, '$P(3, 2)$'), on(c, 3, -6, '$Q(3, -6)$')] }, 'Plot of the parabola x squared plus 2 x y plus y squared minus 10 x minus 2 y plus 9 equals 0, with focus S at 2, 1 and directrix the line y equals x plus 1; the axis y equals 3 minus x meets the curve at the vertex V at 3 over 2, 3 over 2, and the points P at 3, 2 and Q at 3, minus 6 lie on it.', 'Focus $(2, 1)$, directrix $x - y + 1 = 0$: an oblique axis.');
}
// modelling
V.model = table(['Step', 'What to do'], [
  ['1. Place the axes', 'Put the vertex at the origin when you can; the axis of the parabola along a coordinate axis'],
  ['2. Choose the form', r`$x^2 = \pm 4ay$ for an arch or dish with a vertical axis; $y^2 = \pm 4ax$ for a horizontal axis`],
  ['3. Use a measurement', 'Substitute the half-width and the depth or height of a known point to find $a$'],
  ['4. Answer', 'Read the focus, a height, or a width from the equation'],
  ['5. Check', 'Put the answer point back into the equation'],
], 'Table of the method for application problems: place the axes with the vertex at the origin, choose the form from the axis, substitute a measured point to find a, read the required quantity from the equation, and check the point in the equation.', 'Write the units in the answer.');
// we6: arch, 24 m wide, 9 m high; x^2 = -16(y - 9)
{
  const p = new Par('D', 4, 0, 9);
  p.verify();
  must(p.eqTex() === 'x^2 = -16(y - 9)' && p.on([12, 0]) && p.on([-12, 0]) && p.on([8, 5]) && p.on([-8, 5]) && p.focTex() === '(0, 5)', 'we6');
  K.we6 = p;
  V.p6 = plot({ x: [-14, 14], y: [-2, 11], fns: [{ expr: '9-x^2/16', label: 'arch', domain: [-12, 12] }], pts: [on(p, 0, 9, '$(0, 9)$'), on(p, 8, 5, '$(8, 5)$'), on(p, -8, 5, '$(-8, 5)$')] }, 'Plot of the arch y equals 9 minus x squared over 16 between x equal to minus 12 and 12, with its top at 0, 9; at 8 metres from the centre line the height is 5 metres, marked at 8, 5 and minus 8, 5.', 'Span $24$ m, height $9$ m: the height at $8$ m from the centre is $5$ m.');
}
// we7: dish 4 m across, 0.5 m deep
{
  const p = new Par('U', 2);
  p.verify();
  must(p.eqTex() === 'x^2 = 8y' && p.on([2, fr(1, 2)]) && p.on([-2, fr(1, 2)]) && p.focTex() === '(0, 2)', 'we7');
  K.we7 = p;
  V.p7 = plot({ x: [-3, 3], y: [-0.5, 3], fns: [{ expr: 'x^2/8', label: 'dish', domain: [-2, 2] }], pts: [on(p, 0, 0, '$V(0, 0)$'), on(p, 2, 0.5, '$(2, 0.5)$'), on(p, -2, 0.5, '$(-2, 0.5)$'), fl(0, 2, '$S(0, 2)$')] }, 'Plot of the dish y equals x squared over 8 between x equal to minus 2 and 2, with its vertex at 0, 0 and its rim points at plus or minus 2, 0.5; the focus S at 0, 2 lies on the axis, 2 metres above the vertex.', 'Rim width $4$ m and depth $0.5$ m put the focus $2$ m above the vertex.');
}
// we8: projectile (x - 20)^2 = -20(y - 20)
{
  const p = new Par('D', 5, 20, 20);
  p.verify();
  must(p.eqTex() === '(x - 20)^2 = -20(y - 20)' && p.on([0, 0]) && p.on([40, 0]) && p.on([8, fr(64, 5)]) && p.on([10, 15]) && p.on([30, 15]) && p.focTex() === '(20, 15)', 'we8');
  K.we8 = p;
  V.p8 = plot({ x: [-4, 44], y: [-2, 24], fns: [{ expr: '20-(x-20)^2/20', label: 'path', domain: [0, 40] }], pts: [on(p, 20, 20, '$(20, 20)$'), on(p, 8, 12.8, '$(8, 12.8)$'), on(p, 10, 15, '$(10, 15)$'), on(p, 30, 15, '$(30, 15)$')] }, 'Plot of the path y equals 20 minus x minus 20 all squared over 20 from x equal to 0 to 40, with its highest point at 20, 20; the height is 12.8 metres at 8 metres along and 15 metres at 10 and 30 metres along.', 'Highest point $(20, 20)$; it lands $40$ m from the start.');
}
{
  V.sum2 = table(['Idea', 'Result'], [
    ['Standard forms', M(r`y^2 = \pm 4ax, \quad x^2 = \pm 4ay`)],
    ['Focus and directrix', r`at distance $a$ from the vertex, on opposite sides`],
    ['Latus rectum', M(r`4a, \text{ ends } (a, \pm 2a) \text{ for } y^2 = 4ax`)],
    ['Focal distance', M(r`x_1 + a \text{ for } y^2 = 4ax; \quad a(t^2 + 1) \text{ for } (at^2, 2at)`)],
    ['Vertex $(h, k)$', M(r`(y - k)^2 = 4a(x - h), \quad (x - h)^2 = 4a(y - k)`)],
    ['General position', M(r`PS^2 = PL^2 \text{ with } PL^2 = \dfrac{(ax + by + c)^2}{a^2 + b^2}`)],
  ], 'Summary table for Part 2: the four standard forms, the focus and directrix at distance a from the vertex, the latus rectum of length 4a with ends a, plus or minus 2a, the focal distance x one plus a, the shifted forms with vertex h, k, and the general-position equation from PS squared equals PL squared.', 'Find $a$ first; everything else follows from it.');
  V.tips2 = table(['Marks', 'Show'], [['1-2', r`the form, the value of $a$ and the requested focus, directrix or latus rectum`], ['3', r`the form, $a$ from the given point, the equation and one verification`], ['5, in parts', 'the model with the axes placed, the equation, each requested quantity, and a check by substitution']], 'Table of exam tips for Part 2: for 1 or 2 marks give the form, the value of a and the requested feature; for 3 marks give the form, a from the given point, the equation and a verification; for 5 marks set in parts place the axes, give the equation and each quantity, and check by substitution.', 'Always say which way the parabola opens.');
}
