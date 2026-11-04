// Visuals for CBSE 11 Mathematics ch10 Conic Sections: every figure is computed from the equations by conic.mjs and
// asserted (marked points on their curves, focus-directrix and focal-distance properties, cone angles).
import { plot, table, flow, geom } from './lib.mjs';
import { r, Rat, sqrtQ, circleGeneral, Circle, Parabola, Ellipse, Hyperbola, sectionOf, near } from './conic.mjs';

export const must = (cond, msg) => { if (!cond) throw new Error(`self-check failed: ${msg}`); };
/** plot() that also marks 'free' points on_curve: false (the shared stage-4 lint needs the flag). */
export const plotF = (spec, alt, caption) => { const v = plot(spec, alt, caption); (spec.pts ?? []).forEach((p, i) => { if (p[3] === 'free') v.spec.points[i].on_curve = false; }); return v; };
const minus = (s) => String(s).replace(/-/g, '−');
/** "(x, y)" label with a Unicode minus sign, numbers printed as short decimals. */
const L = (x, y, name = '') => `${name}(${minus(+x.toFixed(4))}, ${minus(+y.toFixed(4))})`;

// ================================================================ deck 1: cone, circle, parabola
// ---- double cone with four cutting planes (side view, not to scale); angles computed and classified
const ALPHA = 30, tanA = Math.tan((ALPHA * Math.PI) / 180);
const V = [6, 4], topY = 7.6, botY = 0.4, half = (y) => Math.abs(y - V[1]) * tanA;
const edgeX = (side, y) => V[0] + side * half(y); // side = -1 left, +1 right
const betaOf = (a, b) => (Math.acos(Math.abs(b[1] - a[1]) / Math.hypot(b[0] - a[0], b[1] - a[1])) * 180) / Math.PI;
const cutCircle = [[edgeX(-1, 6.4), 6.4], [edgeX(1, 6.4), 6.4]];
const cutEllipse = [[edgeX(-1, 5.3), 5.3], [edgeX(1, 7.1), 7.1]];
const cutParabola = [[edgeX(-1, 6.0), 6.0], [edgeX(-1, 6.0) + (topY - 6.0) * tanA, topY]];
const cutHyper = [[7.1, topY], [7.1, botY]];
must(near(betaOf(...cutCircle), 90) && sectionOf(ALPHA, 90) === 'circle', 'circle cut is perpendicular to the axis');
must(betaOf(...cutEllipse) > ALPHA && betaOf(...cutEllipse) < 90 && sectionOf(ALPHA, Math.round(betaOf(...cutEllipse))) === 'ellipse', 'ellipse cut');
must(near(betaOf(...cutParabola), ALPHA) && sectionOf(ALPHA, ALPHA) === 'parabola', 'parabola cut is parallel to a side');
must(betaOf(...cutHyper) < ALPHA && sectionOf(ALPHA, 0.0001) === 'hyperbola', 'hyperbola cut is steeper than a side');
must(cutHyper[0][0] > edgeX(1, 5.0) && cutHyper[0][0] < edgeX(1, topY), 'hyperbola cut crosses both nappes');
const r2 = (v) => +v.toFixed(3);
const pts = (a) => a.map((v) => r2(v));
export const coneFig = geom({
  width: 12, height: 8,
  points: {
    V: { at: pts(V), label: 'vertex', label_position: 'e' },
    A: { at: pts([edgeX(-1, topY), topY]), label: false }, B: { at: pts([edgeX(1, topY), topY]), label: false },
    C: { at: pts([edgeX(-1, botY), botY]), label: false }, D: { at: pts([edgeX(1, botY), botY]), label: false },
    X1: { at: pts([6, topY]), label: false }, X2: { at: pts([6, botY]), label: false },
    c1: { at: pts(cutCircle[0]), label: 'circle', label_position: 'w' }, c2: { at: pts(cutCircle[1]), label: false },
    e1: { at: pts(cutEllipse[0]), label: 'ellipse', label_position: 'w' }, e2: { at: pts(cutEllipse[1]), label: false },
    p1: { at: pts(cutParabola[0]), label: 'parabola', label_position: 'w' }, p2: { at: pts(cutParabola[1]), label: false },
    h1: { at: pts(cutHyper[0]), label: 'hyperbola', label_position: 'e' }, h2: { at: pts(cutHyper[1]), label: false },
  },
  segments: [
    { from: 'A', to: 'C' }, { from: 'B', to: 'D' }, { from: 'A', to: 'B' }, { from: 'C', to: 'D' }, { from: 'X1', to: 'X2', dashed: true },
    { from: 'c1', to: 'c2' }, { from: 'e1', to: 'e2' }, { from: 'p1', to: 'p2' }, { from: 'h1', to: 'h2' },
  ],
  not_to_scale: true,
}, 'Side view of a double cone with its vertex marked and four straight cutting lines, each standing for a plane: a horizontal line gives a circle, a tilted line across one side gives an ellipse, a line parallel to the slant side gives a parabola, and a steep line crossing both cones gives a hyperbola.', 'Four planes cutting a double cone (side view, not to scale).');

export const sectionsTable = table(['Cutting plane (not through the vertex)', 'Angle $\\beta$ with the axis ($\\alpha$ = semi-vertical angle)', 'Curve'], [
  ['Perpendicular to the axis', r`$\beta = 90^\circ$`, 'Circle'],
  ['Tilted, cutting only one cone all the way round', r`$\alpha < \beta < 90^\circ$`, 'Ellipse'],
  ['Parallel to a slant side of the cone', r`$\beta = \alpha$`, 'Parabola'],
  ['Steeper, cutting both cones', r`$0 \le \beta < \alpha$`, 'Hyperbola (two branches)'],
  ['Through the vertex, $\\beta > \\alpha$', 'The plane meets the cone only at the vertex', 'A single point'],
  ['Through the vertex, $\\beta = \\alpha$ or $\\beta < \\alpha$', 'The plane touches along a side, or cuts both cones', 'A straight line, or a pair of intersecting lines'],
], 'Table of cone sections: a plane perpendicular to the axis gives a circle, a tilted plane with the angle beta between alpha and 90 degrees gives an ellipse, beta equal to alpha gives a parabola, beta below alpha gives a hyperbola; planes through the vertex give a point, a line or two lines.', 'The angle between the plane and the axis decides the curve.');
must(['circle', 'ellipse', 'parabola', 'hyperbola'].join() === [sectionOf(40, 90), sectionOf(40, 60), sectionOf(40, 40), sectionOf(40, 25)].join() && sectionOf(40, 60, true) === 'a single point' && sectionOf(40, 40, true) === 'a single straight line' && sectionOf(40, 25, true) === 'a pair of intersecting straight lines', 'section table rows');

export const locusTable = table(['Eccentricity $e$', 'Curve', 'Defining idea'], [
  ['$e = 0$', 'Circle', 'Constant distance from one point, the centre'],
  [r`$0 < e < 1$`, 'Ellipse', r`Distance from the focus $= e \times$ distance from the directrix`],
  ['$e = 1$', 'Parabola', 'Distance from the focus equals distance from the directrix'],
  [r`$e > 1$`, 'Hyperbola', r`Distance from the focus $= e \times$ distance from the directrix`],
], 'Table of conics by eccentricity: 0 for a circle, between 0 and 1 for an ellipse, exactly 1 for a parabola and more than 1 for a hyperbola, where the distance from the focus is e times the distance from the directrix.', 'One number, $e$, sorts the four curves.');

// ---- circle plot: centre (2, -1), radius 5
export const C0 = new Circle(2, -1, 25);
must(C0.radius.eq(5) && C0.std() === '(x - 2)^2 + (y + 1)^2 = 25' && [[5, 3], [-1, 3], [6, -4], [-2, -4], [2, 4], [2, -6]].every((p) => C0.on(p)), 'circle plot points');
export const circlePlot = plotF({
  x: [-5, 9], y: [-8, 8], xl: 'x', yl: 'y',
  fns: [{ expr: '-1+sqrt(25-(x-2)^2)', label: 'upper half', domain: [-3, 7] }, { expr: '-1-sqrt(25-(x-2)^2)', label: 'lower half', domain: [-3, 7] }],
  pts: [[2, -1, L(2, -1, 'C'), 'free'], [2, 4, L(2, 4)], [2, -6, L(2, -6)], [5, 3, L(5, 3)], [-1, 3, L(-1, 3)], [6, -4, L(6, -4)]],
}, 'Plot of the circle with centre C at (2, minus 1) and radius 5, drawn as an upper half and a lower half. The points (2, 4) and (2, minus 6) are straight above and below the centre, and (5, 3), (minus 1, 3) and (6, minus 4) also lie on the circle, each 5 units from the centre.', r`The circle $(x - 2)^2 + (y + 1)^2 = 25$: every point is $5$ units from $C(2, -1)$.`);

// ---- general equation table
const gen = [[8, -10, 5], [-6, 4, -12], [2, 6, -15], [-4, 2, 5]].map(([D, E, F]) => ({ D, E, F, c: (() => { try { return Circle.fromGeneral(D, E, F); } catch { return null; } })() }));
must(gen[0].c.h.eq(-4) && gen[0].c.k.eq(5) && gen[0].c.radius.eq(6) && gen[1].c.h.eq(3) && gen[1].c.k.eq(-2) && gen[1].c.radius.eq(5) && gen[2].c.h.eq(-1) && gen[2].c.k.eq(-3) && gen[2].c.radius.eq(5) && gen[3] && gen[3].c === null, 'general equation table');
// the fourth row has g^2 + f^2 - c = 4 + 1 - 5 = 0: a point, not a circle
const g4 = new Rat(-4n, 1n).div(-2).pow(2).add(Rat.of(2).div(-2).pow(2)).sub(5);
must(g4.isZero(), 'fourth row has r^2 = 0');
export const circleGenTable = table(['Equation', r`$(-g, -f)$ = centre`, r`$r^2 = g^2 + f^2 - c$`, 'Result'], [
  ...gen.slice(0, 3).map(({ D, E, F, c }) => [`$${c.general()}$`, `$(${c.h.dtex()}, ${c.k.dtex()})$`, `$${c.r2.dtex()}$`, `Circle, radius $${c.radius.tex()}$`]),
  [`$${circleGeneral(-4, 2, 5)}$`, '$(2, -1)$', `$${g4.dtex()}$`, 'Only the point $(2, -1)$, not a circle'],
], 'Table of four equations of the form x squared plus y squared plus 2gx plus 2fy plus c equals 0, each with its centre and the value of g squared plus f squared minus c: the first three give circles of radius 6, 5 and 5, and the fourth gives zero, so it is only a single point.', r`Read $g$, $f$, $c$; then centre $(-g, -f)$ and $r^2 = g^2 + f^2 - c$.`);

// ---- WE1 general equation x^2 + y^2 + 8x - 10y + 5 = 0
export const W1 = Circle.fromGeneral(8, -10, 5);
must(W1.h.eq(-4) && W1.k.eq(5) && W1.r2.eq(36) && W1.radius.eq(6) && W1.std() === '(x + 4)^2 + (y - 5)^2 = 36' && W1.verifySampling(), 'WE1 circle');
export const we1Table = table(['Step', 'Working'], [
  ['Compare', r`$x^2 + y^2 + 2gx + 2fy + c = 0$ with $2g = 8$, $2f = -10$, $c = 5$, so $g = 4$, $f = -5$`],
  ['Centre', r`$(-g, -f) = (-4, 5)$`],
  ['Radius', r`$r = \sqrt{g^2 + f^2 - c} = \sqrt{16 + 25 - 5} = \sqrt{36} = 6$`],
  ['Check by completing the square', `$${W1.std()}$, so the centre is $(-4, 5)$ and $r^2 = 36$`],
], 'Table finding the centre and radius of the circle x squared plus y squared plus 8x minus 10y plus 5 equals 0: g is 4 and f is minus 5, so the centre is (minus 4, 5) and the radius is the square root of 16 plus 25 minus 5, which is 6.', 'Centre $(-g, -f)$, radius $\\sqrt{g^2 + f^2 - c}$.');

// ---- WE2 circle on a diameter
export const W2 = Circle.fromDiameter([-2, 3], [6, 7]);
must(W2.h.eq(2) && W2.k.eq(5) && W2.r2.eq(20) && W2.general() === 'x^2 + y^2 - 4x - 10y + 9 = 0' && W2.on([-2, 3]) && W2.on([6, 7]) && W2.radius === null, 'WE2 circle');
export const we2Table = table(['Step', 'Working'], [
  ['Centre', r`Midpoint of $A(-2, 3)$ and $B(6, 7)$: $\left(\dfrac{-2 + 6}{2}, \dfrac{3 + 7}{2}\right) = (2, 5)$`],
  ['Radius squared', r`$r^2 = (2 + 2)^2 + (5 - 3)^2 = 16 + 4 = 20$`],
  ['Standard form', `$${W2.std()}$`],
  ['Expanded form', `$${W2.general()}$`],
  ['Check with $B$', r`$(6 - 2)^2 + (7 - 5)^2 = 16 + 4 = 20$`],
], 'Table building the circle on the diameter joining A(minus 2, 3) and B(6, 7): the centre is the midpoint (2, 5), the radius squared is 20, the equation is (x minus 2) squared plus (y minus 5) squared equals 20, which expands to x squared plus y squared minus 4x minus 10y plus 9 equals 0.', 'Centre = midpoint of the diameter; $r^2$ = squared distance to an end.');

// ---- parabola y^2 = 20x with focus, directrix, latus rectum
export const P1 = new Parabola('y2', 20);
must(P1.verify() && P1.focus[0].eq(5) && P1.directrix.value.eq(-5) && P1.lr.eq(20) && P1.on([5, 10]) && P1.on([5, -10]) && P1.on([20, 20]) && P1.focalDistance([20, 20]).eq(25), 'P1');
export const parabTermsPlot = plotF({
  x: [-8, 24], y: [-22, 22], xl: 'x', yl: 'y',
  fns: [{ expr: 'sqrt(20*x)', label: 'upper branch', domain: [0, 22] }, { expr: '-sqrt(20*x)', label: 'lower branch', domain: [0, 22] }],
  pts: [[5, 0, L(5, 0, 'F'), 'free'], [5, 10, L(5, 10)], [5, -10, L(5, -10)], [20, 20, L(20, 20, 'P')]],
}, 'Plot of the parabola y squared equals 20x, an upper and a lower branch opening to the right from the vertex at the origin, with its focus F(5, 0) inside, the vertical directrix x equals minus 5 outside, and the ends of the latus rectum (5, 10) and (5, minus 10) directly above and below the focus. The point P(20, 20) is 25 units from both F and the directrix.', r`$y^2 = 20x$: focus $(5, 0)$, directrix $x = -5$, latus rectum length $20$.`);
parabTermsPlot.spec.vlines = [{ x: -5, label: '$x = -5$', dashed: true }];
const focalRows = [[0, 0], [5, 10], [20, 20]].map((p) => { const toF = P1.focalDistance(p), toD = sqrtQ(P1.focalSquares(p).toDirectrix2); if (!toF.eq(toD)) throw new Error('focal row'); return [p[0] === 0 ? '$(0, 0)$ (the vertex)' : `$(${p[0]}, ${p[1]})$`, `$${toF.tex()}$`, `$${toD.tex()}$`]; });
export const focalTable = table(['Point $P$ on $y^2 = 20x$', 'Distance to focus $(5, 0)$', 'Distance to directrix $x = -5$'], focalRows, 'Table of points of the parabola y squared equals 20x and their distances: the vertex is 5 from the focus and 5 from the directrix, the end of the latus rectum (5, 10) is 10 from both, and the point (20, 20) is 25 from both.', 'On a parabola the two distances are always equal.');
must(P1.focalDistance([5, 10]).eq(10) && P1.focalDistance([0, 0]).eq(5), 'focal table values');

export const formsTable = table(['Equation', 'Opens', 'Focus', 'Directrix', 'Axis', 'Latus rectum'], [
  [r`$y^2 = 4ax$`, 'right', '$(a, 0)$', '$x = -a$', '$x$-axis', '$4a$'],
  [r`$y^2 = -4ax$`, 'left', '$(-a, 0)$', '$x = a$', '$x$-axis', '$4a$'],
  [r`$x^2 = 4ay$`, 'upward', '$(0, a)$', '$y = -a$', '$y$-axis', '$4a$'],
  [r`$x^2 = -4ay$`, 'downward', '$(0, -a)$', '$y = a$', '$y$-axis', '$4a$'],
], 'Table of the four standard parabolas with vertex at the origin and a positive: y squared equals 4ax opens right with focus (a, 0) and directrix x equals minus a; y squared equals minus 4ax opens left; x squared equals 4ay opens up with focus (0, a); x squared equals minus 4ay opens down; the latus rectum is 4a in every case.', 'The squared variable shows the axis; the sign shows the direction.');
must([['y2', 12, 'right', 3], ['y2', -12, 'left', 3], ['x2', 12, 'upward', 3], ['x2', -12, 'downward', 3]].every(([k, v, o, a]) => { const p = new Parabola(k, v); return p.opens === o && p.a.eq(a) && p.lr.eq(4 * a) && p.verify(); }), 'forms table');

export const PU = new Parabola('x2', 8), PD = new Parabola('x2', -8);
must(PU.verify() && PD.verify() && PU.focus[1].eq(2) && PD.focus[1].eq(-2) && PU.directrix.value.eq(-2) && PD.directrix.value.eq(2) && PU.on([4, 2]) && PU.on([-4, 2]) && PD.on([4, -2]) && PD.on([-4, -2]), 'PU PD');
export const upDownPlot = plotF({
  x: [-10, 10], y: [-10, 10], xl: 'x', yl: 'y',
  fns: [{ expr: 'x^2/8', label: r`$x^2 = 8y$`, domain: [-8, 8] }, { expr: '-x^2/8', label: r`$x^2 = -8y$`, domain: [-8, 8] }],
  pts: [[0, 0, L(0, 0, 'O')], [0, 2, L(0, 2, 'F'), 'free'], [0, -2, L(0, -2, 'F'), 'free'], [4, 2, L(4, 2)], [-4, 2, L(-4, 2)], [4, -2, L(4, -2)], [-4, -2, L(-4, -2)]],
}, 'Plot of two parabolas with the origin as common vertex: x squared equals 8y opens upward with focus (0, 2) and the latus rectum ends (4, 2) and (minus 4, 2), and x squared equals minus 8y opens downward with focus (0, minus 2) and the latus rectum ends (4, minus 2) and (minus 4, minus 2). Each directrix is a horizontal line two units from the vertex on the far side of the focus.', r`$x^2 = \pm 8y$: $a = 2$, latus rectum $8$, directrices $y = \mp 2$.`);
upDownPlot.spec.hlines = [{ y: -2, label: '$y = -2$', dashed: true }, { y: 2, label: '$y = 2$', dashed: true }];

// ---- WE3 two parabolas
export const Wp1 = new Parabola('y2', -18), Wp2 = new Parabola('x2', 30);
must(Wp1.verify() && Wp2.verify() && Wp1.a.eq('9/2') && Wp1.focus[0].eq('-9/2') && Wp1.directrix.value.eq('9/2') && Wp1.lr.eq(18) && Wp2.a.eq('15/2') && Wp2.focus[1].eq('15/2') && Wp2.directrix.value.eq('-15/2') && Wp2.lr.eq(30), 'WE3 parabolas');
export const we3Table = table(['Parabola', r`$4a$ and $a$`, 'Focus', 'Directrix', 'Latus rectum', 'Opens'], [
  [r`$y^2 = -18x$`, r`$4a = 18$, $a = 4.5$`, '$(-4.5, 0)$', '$x = 4.5$', '$18$', 'left'],
  [r`$x^2 = 30y$`, r`$4a = 30$, $a = 7.5$`, '$(0, 7.5)$', '$y = -7.5$', '$30$', 'upward'],
], 'Table of two parabolas: y squared equals minus 18x has 4a equal to 18, so a is 4.5, focus (minus 4.5, 0), directrix x equals 4.5, latus rectum 18, opening left; x squared equals 30y has a equal to 7.5, focus (0, 7.5), directrix y equals minus 7.5, latus rectum 30, opening upward.', 'Divide the coefficient by $4$ to get $a$.');

// ---- WE4 equations of parabolas
export const Wq1 = new Parabola('x2', -16), Wq2 = new Parabola('y2', -20);
must(Wq1.directrix.value.eq(4) && Wq1.focus[1].eq(-4) && Wq1.verify() && Wq2.on([-5, 10]) && Wq2.on([-5, -10]) && Wq2.focus[0].eq(-5) && Wq2.lr.eq(20), 'WE4 parabolas');
export const we4Table = table(['Part', 'Working', 'Equation'], [
  [r`Vertex $(0, 0)$, directrix $y = 4$`, r`Directrix above the vertex, so the parabola opens downward: $x^2 = -4ay$ with $a = 4$ and focus $(0, -4)$`, `$${Wq1.eq()}$`],
  [r`Vertex $(0, 0)$, axis along the $x$-axis, through $(-5, 10)$`, r`$x$ is negative, so $y^2 = -4ax = kx$ with $k < 0$: $100 = k(-5)$, so $k = -20$`, `$${Wq2.eq()}$`],
], 'Table of two parabola equations: with vertex at the origin and directrix y equals 4 the parabola opens downward and is x squared equals minus 16y; with axis along the x-axis and passing through (minus 5, 10) it is y squared equals minus 20x.', 'Decide the axis and direction first, then find $a$.');

// ---- WE5 reflector x^2 = 16y through (12, 9)
export const Pr = new Parabola('x2', 16);
must(Pr.verify() && Pr.on([12, 9]) && Pr.on([-12, 9]) && Pr.a.eq(4) && Pr.focalDistance([12, 9]).eq(13) && Math.hypot(12, 9 - 4) === 13, 'reflector');
export const reflectorPlot = plotF({
  x: [-14, 14], y: [-2, 12], xl: 'x (cm)', yl: 'y (cm)',
  fns: [{ expr: 'x^2/16', label: r`$x^2 = 16y$`, domain: [-12, 12] }],
  pts: [[0, 0, L(0, 0, 'V')], [0, 4, L(0, 4, 'F'), 'free'], [12, 9, L(12, 9)], [-12, 9, L(-12, 9)]],
}, 'Plot of the cross-section of a parabolic reflector, the curve x squared equals 16y from x equal to minus 12 to 12. The vertex V is at the origin, the rim points are (12, 9) and (minus 12, 9), and the bulb at the focus F is at (0, 4), 4 cm above the vertex.', r`Width $24$ cm and depth $9$ cm give $a = 4$: the bulb sits $4$ cm from the vertex.`);
export const we5Table = table(['Step', 'Working'], [
  ['Place the vertex at the origin', r`Opening upward: $x^2 = 4ay$; the rim point is $(12, 9)$, since the width is $24$ cm and the depth $9$ cm`],
  ['Find $a$', r`$12^2 = 4a \times 9$, so $36a = 144$ and $a = 4$`],
  ['Equation and focus', r`$x^2 = 16y$; focus $(0, 4)$`],
  ['Distance from the bulb to the rim', r`$\sqrt{12^2 + (9 - 4)^2} = \sqrt{169} = 13$ cm, which equals $9 + 4$ (the focus-directrix distance)`],
], 'Table for a parabolic reflector 24 cm wide and 9 cm deep: the rim point (12, 9) gives a equal to 4, so the equation is x squared equals 16y with the bulb at the focus (0, 4), and the distance from the bulb to the rim is 13 cm.', 'A point on the rim: use it to find $a$.');

export const summary1 = flow('LR', [['s', 'Cone sections: circle, ellipse, parabola, hyperbola'], ['c', r`Circle: $(x - h)^2 + (y - k)^2 = r^2$`], ['g', r`General: centre $(-g, -f)$, $r = \sqrt{g^2 + f^2 - c}$`], ['p', r`Parabola: focus, directrix, $4a$`]], [['s', 'c'], ['c', 'g'], ['g', 'p']], 'Summary flow: a plane cuts a cone in a circle, ellipse, parabola or hyperbola; the circle has the standard form with its centre and radius; the general form gives the centre as minus g, minus f and the radius from g squared plus f squared minus c; the parabola is fixed by its focus, directrix and the number 4a.', 'Cone sections, the circle and the parabola.');

// ================================================================ deck 2: ellipse and hyperbola
// ---- confocal ellipse and hyperbola, foci (+-5, 0)
export const Ec = new Ellipse(36, 11), Hc = new Hyperbola('x', 16, 9);
Ec.verifySampling(); Hc.verifySampling();
must(Ec.c.eq(5) && Hc.c.eq(5) && Ec.e.eq('5/6') && Hc.e.eq('5/4'), 'confocal conics');
// intersection: x^2 = 23.04, y^2 = 3.96
const X2 = Rat.of('2880/125'), Y2 = Rat.of(9).mul(X2.div(16)).sub(9);
must(X2.eq('576/25') && Y2.eq('99/25') && X2.div(36).add(Y2.div(11)).eq(1) && X2.div(16).sub(Y2.div(9)).eq(1), 'intersection of the confocal pair');
const ix = Math.sqrt(23.04), iy = Math.sqrt(3.96);
must(near(ix, 4.8) && near(0.75 * Math.sqrt(ix * ix - 16), iy) && near(Math.sqrt(11 * (1 - ix * ix / 36)), iy), 'intersection on both plotted curves');
// distances from the intersection to the foci: 10 and 2 (sum 12 = 2a of the ellipse, difference 8 = 2a of the hyperbola)
{ const d1 = Math.hypot(ix + 5, iy), d2 = Math.hypot(ix - 5, iy); must(near(d1, 10) && near(d2, 2) && near(d1 + d2, 12) && near(d1 - d2, 8), 'focal distances at the intersection'); }
export const confocalPlot = plotF({
  x: [-10, 10], y: [-7, 7], xl: 'x', yl: 'y',
  fns: [
    { expr: 'sqrt(11*(1-x^2/36))', label: 'ellipse', domain: [-6, 6] }, { expr: '-sqrt(11*(1-x^2/36))', label: 'ellipse', domain: [-6, 6] },
    { expr: '0.75*sqrt(x^2-16)', label: 'hyperbola', domain: [4, 10] }, { expr: '-0.75*sqrt(x^2-16)', label: 'hyperbola', domain: [4, 10] },
    { expr: '0.75*sqrt(x^2-16)', label: 'hyperbola', domain: [-10, -4] }, { expr: '-0.75*sqrt(x^2-16)', label: 'hyperbola', domain: [-10, -4] },
  ],
  pts: [[5, 0, L(5, 0, 'F'), 'free'], [-5, 0, L(-5, 0, 'F'), 'free'], [ix, iy, 'P'], [-ix, iy, 'P'], [ix, -iy, 'P'], [-ix, -iy, 'P']],
}, 'Plot of an ellipse and a hyperbola that share the same two foci F at (5, 0) and (minus 5, 0): the closed ellipse x squared over 36 plus y squared over 11 equals 1, and the two branches of the hyperbola x squared over 16 minus y squared over 9 equals 1, which cross the ellipse at four points P.', r`Same foci $(\pm 5, 0)$: the ellipse has constant sum $12$, the hyperbola constant difference $8$.`);

// ---- ellipse definition: x^2/25 + y^2/9 = 1 with P(3, 2.4)
export const Ed = new Ellipse(25, 9);
Ed.verifySampling();
must(Ed.c.eq(4) && Ed.on([3, '12/5']) && near(Math.hypot(7, 2.4) + Math.hypot(1, 2.4), 10), 'ellipse definition P');
must(near(Math.hypot(7, 2.4), 7.4) && near(Math.hypot(1, 2.4), 2.6), 'PF1 = 7.4 and PF2 = 2.6');
export const ellipseDefPlot = plotF({
  x: [-7, 7], y: [-5, 5], xl: 'x', yl: 'y',
  fns: [{ expr: '3*sqrt(1-x^2/25)', label: 'upper half', domain: [-5, 5] }, { expr: '-3*sqrt(1-x^2/25)', label: 'lower half', domain: [-5, 5] }],
  pts: [[-4, 0, L(-4, 0, 'F'), 'free'], [4, 0, L(4, 0, 'F'), 'free'], [3, 2.4, L(3, 2.4, 'P')]],
  series: [{ label: 'PF (7.4)', points: [[-4, 0], [3, 2.4]], kind: 'line' }, { label: 'PF (2.6)', points: [[4, 0], [3, 2.4]], kind: 'line' }],
}, 'Plot of the ellipse x squared over 25 plus y squared over 9 equals 1 with its two foci (minus 4, 0) and (4, 0) and the point P(3, 2.4) on the curve. The two focal segments from P have lengths 7.4 and 2.6, and their sum is 10, the length of the major axis.', 'The two focal distances of $P$ add up to $10 = 2a$ for every point of the ellipse.');

export const formsEllipse = table(['', r`$\dfrac{x^2}{a^2} + \dfrac{y^2}{b^2} = 1$, $a > b$`, r`$\dfrac{x^2}{b^2} + \dfrac{y^2}{a^2} = 1$, $a > b$`], [
  ['Major axis along', '$x$-axis', '$y$-axis'],
  ['Vertices', r`$(\pm a, 0)$`, r`$(0, \pm a)$`],
  ['Foci', r`$(\pm c, 0)$`, r`$(0, \pm c)$`],
  ['Length of major axis', '$2a$', '$2a$'],
  ['Length of minor axis', '$2b$', '$2b$'],
  ['Relation and eccentricity', r`$c^2 = a^2 - b^2$, $e = \dfrac{c}{a}$`, r`$c^2 = a^2 - b^2$, $e = \dfrac{c}{a}$`],
  ['Latus rectum', r`$\dfrac{2b^2}{a}$`, r`$\dfrac{2b^2}{a}$`],
], 'Table of the two standard ellipses with centre at the origin: when the larger denominator is under x squared the major axis lies along the x-axis with vertices (plus or minus a, 0) and foci (plus or minus c, 0), otherwise along the y-axis; in both cases c squared is a squared minus b squared, the eccentricity is c over a, and the latus rectum is 2 b squared over a.', 'The larger denominator is $a^2$ and tells you the major axis.');

// ---- vertical ellipse x^2/144 + y^2/225 = 1
export const Ev = new Ellipse(144, 225);
Ev.verifySampling();
must(Ev.major === 'y' && Ev.a.eq(15) && Ev.b.eq(12) && Ev.c.eq(9) && Ev.e.eq('3/5') && Ev.lr.eq('288/15') && Ev.lr.eq('96/5') && Ev.on([Rat.of('48/5'), 9]) && Ev.on([Rat.of('-48/5'), 9]) && Ev.on([0, 15]), 'vertical ellipse');
export const ellipseVertPlot = plotF({
  x: [-14, 14], y: [-17, 17], xl: 'x', yl: 'y',
  fns: [{ expr: '15*sqrt(1-x^2/144)', label: 'upper half', domain: [-12, 12] }, { expr: '-15*sqrt(1-x^2/144)', label: 'lower half', domain: [-12, 12] }],
  pts: [[0, 15, L(0, 15, 'V')], [0, -15, L(0, -15, 'V')], [0, 9, L(0, 9, 'F'), 'free'], [0, -9, L(0, -9, 'F'), 'free'], [9.6, 9, L(9.6, 9)], [-9.6, 9, L(-9.6, 9)]],
}, 'Plot of the ellipse x squared over 144 plus y squared over 225 equals 1, taller than wide. Its vertices are V(0, 15) and V(0, minus 15) on the major axis, its foci are F(0, 9) and F(0, minus 9), and the ends of the latus rectum through the upper focus are (9.6, 9) and (minus 9.6, 9).', r`$a = 15$, $b = 12$, $c = 9$, $e = \dfrac{3}{5}$, latus rectum $\dfrac{2 \times 144}{15} = 19.2$.`);

// ---- eccentricity and shape: a = 25 fixed
const eccRows = [[24, 7], [20, 15], [15, 20], [7, 24]].map(([b, c]) => { const E = new Ellipse(625, b * b); must(E.c.eq(c) && E.a.eq(25) && E.verifySampling(), `ecc row ${b}`); return { b, c, E }; });
export const eccEllipseTable = table(['$a$', '$b$', '$c = \\sqrt{a^2 - b^2}$', r`$e = \dfrac{c}{a}$`, 'Shape'], eccRows.map(({ b, c, E }, i) => ['$25$', `$${b}$`, `$${c}$`, `$${E.e.dtex()}$`, ['almost a circle', 'a little flattened', 'noticeably flat', 'long and thin'][i]]), 'Table of four ellipses with a equal to 25: b equal to 24 gives e equal to 0.28, almost a circle; b 20 gives e 0.6; b 15 gives e 0.8; b 7 gives e 0.96, long and thin. The larger e is, the flatter the ellipse.', r`$e$ near $0$: nearly a circle; $e$ near $1$: long and thin.`);

// ---- WE1 9x^2 + 16y^2 = 144
export const Ew1 = new Ellipse(16, 9);
Ew1.verifySampling();
must(Ew1.major === 'x' && Ew1.a.eq(4) && Ew1.b.eq(3) && Ew1.c2.eq(7) && Ew1.c === null && Ew1.e2.eq('7/16') && Ew1.lr.eq('9/2') && Ew1.tex('e') === '\\dfrac{\\sqrt{7}}{4}' && Ew1.tex('c') === '\\sqrt{7}', 'WE1 ellipse');
export const ew1Table = table(['Step', 'Working'], [
  ['Standard form', r`Divide by $144$: $\dfrac{x^2}{16} + \dfrac{y^2}{9} = 1$, so $a^2 = 16$ and $b^2 = 9$ ($16 > 9$: major axis along the $x$-axis)`],
  ['Axes and vertices', r`$a = 4$, $b = 3$: vertices $(\pm 4, 0)$, major axis $8$, minor axis $6$`],
  ['Foci', r`$c^2 = a^2 - b^2 = 7$, so the foci are $(\pm \sqrt{7}, 0)$`],
  ['Eccentricity', r`$e = \dfrac{c}{a} = \dfrac{\sqrt{7}}{4}$, about $0.66$`],
  ['Latus rectum', r`$\dfrac{2b^2}{a} = \dfrac{2 \times 9}{4} = \dfrac{9}{2}$`],
], 'Table analysing the ellipse 9x squared plus 16y squared equals 144: dividing by 144 gives x squared over 16 plus y squared over 9 equals 1, so a is 4 and b is 3, the foci are at plus or minus the square root of 7, the eccentricity is root 7 over 4 and the latus rectum is 9 over 2.', 'Divide to get $1$ on the right; compare the denominators.');
must(near(Math.sqrt(7) / 4, 0.6614, 1e-3), 'e is about 0.66');

// ---- WE2 foci (0, +-9), e = 3/5 -> x^2/144 + y^2/225 = 1
export const ew2Table = table(['Step', 'Working'], [
  ['Axis', r`The foci lie on the $y$-axis, so the major axis is along the $y$-axis: $\dfrac{x^2}{b^2} + \dfrac{y^2}{a^2} = 1$`],
  ['Find $a$', r`$c = 9$ and $e = \dfrac{c}{a} = \dfrac{3}{5}$, so $a = \dfrac{9}{3/5} = 15$`],
  ['Find $b$', r`$b^2 = a^2 - c^2 = 225 - 81 = 144$`],
  ['Equation', r`$\dfrac{x^2}{144} + \dfrac{y^2}{225} = 1$`],
  ['Check', r`Latus rectum $\dfrac{2 \times 144}{15} = 19.2$; the point $(9.6, 9)$ lies on the curve`],
], 'Table finding the ellipse with foci (0, 9) and (0, minus 9) and eccentricity 3 over 5: the major axis is along the y-axis, a is 9 divided by 3 over 5, which is 15, b squared is 225 minus 81 equals 144, so the equation is x squared over 144 plus y squared over 225 equals 1.', 'Foci and $e$ give $a$; then $b^2 = a^2 - c^2$.');

// ---- hyperbola definition x^2/16 - y^2/9 = 1 with P(5, 2.25)
export const Hd = new Hyperbola('x', 16, 9);
Hd.verifySampling();
must(Hd.c.eq(5) && Hd.on([5, '9/4']) && near(Math.hypot(10, 2.25), 10.25) && near(Math.hypot(0, 2.25), 2.25) && near(10.25 - 2.25, 8), 'hyperbola definition P');
export const hypDefPlot = plotF({
  x: [-9, 9], y: [-7, 7], xl: 'x', yl: 'y',
  fns: [
    { expr: '0.75*sqrt(x^2-16)', label: 'right branch', domain: [4, 9] }, { expr: '-0.75*sqrt(x^2-16)', label: 'right branch', domain: [4, 9] },
    { expr: '0.75*sqrt(x^2-16)', label: 'left branch', domain: [-9, -4] }, { expr: '-0.75*sqrt(x^2-16)', label: 'left branch', domain: [-9, -4] },
  ],
  pts: [[-5, 0, L(-5, 0, 'F'), 'free'], [5, 0, L(5, 0, 'F'), 'free'], [5, 2.25, L(5, 2.25, 'P')]],
  series: [{ label: 'PF (10.25)', points: [[-5, 0], [5, 2.25]], kind: 'line' }, { label: 'PF (2.25)', points: [[5, 0], [5, 2.25]], kind: 'line' }],
}, 'Plot of the hyperbola x squared over 16 minus y squared over 9 equals 1: two separate branches opening left and right, with foci (minus 5, 0) and (5, 0) and the point P(5, 2.25) on the right branch. The focal distances of P are 10.25 and 2.25, and their difference is 8, the length of the transverse axis.', 'The two focal distances of $P$ differ by $8 = 2a$ for every point of the hyperbola.');

export const formsHyp = table(['', r`$\dfrac{x^2}{a^2} - \dfrac{y^2}{b^2} = 1$`, r`$\dfrac{y^2}{a^2} - \dfrac{x^2}{b^2} = 1$`], [
  ['Transverse axis along', '$x$-axis', '$y$-axis'],
  ['Vertices', r`$(\pm a, 0)$`, r`$(0, \pm a)$`],
  ['Foci', r`$(\pm c, 0)$`, r`$(0, \pm c)$`],
  ['Asymptotes', r`$y = \pm \dfrac{b}{a}x$`, r`$y = \pm \dfrac{a}{b}x$`],
  ['Transverse and conjugate axes', '$2a$ and $2b$', '$2a$ and $2b$'],
  ['Relation and eccentricity', r`$c^2 = a^2 + b^2$, $e = \dfrac{c}{a} > 1$`, r`$c^2 = a^2 + b^2$, $e = \dfrac{c}{a} > 1$`],
  ['Latus rectum', r`$\dfrac{2b^2}{a}$`, r`$\dfrac{2b^2}{a}$`],
], 'Table of the two standard hyperbolas with centre at the origin: the positive term shows the transverse axis, the vertices are at plus or minus a, the foci at plus or minus c with c squared equal to a squared plus b squared, the eccentricity c over a exceeds 1, the latus rectum is 2 b squared over a, and the asymptotes are y equals plus or minus b over a x or a over b x.', 'The positive term gives the axis of the two branches; $c^2 = a^2 + b^2$.');

// ---- hyperbola y^2/16 - x^2/9 = 1 with asymptotes
export const Hv = new Hyperbola('y', 16, 9);
Hv.verifySampling();
must(Hv.a.eq(4) && Hv.b.eq(3) && Hv.c.eq(5) && Hv.e.eq('5/4') && Hv.lr.eq('9/2') && Hv.on([0, 4]) && Hv.on(['9/4', 5]) && Hv.on(['-9/4', 5]) && Hv.slope2.eq('16/9'), 'vertical hyperbola');
export const hypPlot = plotF({
  x: [-9, 9], y: [-13, 13], xl: 'x', yl: 'y',
  fns: [
    { expr: '4*sqrt(1+x^2/9)', label: 'upper branch', domain: [-9, 9] }, { expr: '-4*sqrt(1+x^2/9)', label: 'lower branch', domain: [-9, 9] },
    { expr: '4*x/3', label: 'asymptote', domain: [-9, 9] }, { expr: '-4*x/3', label: 'asymptote', domain: [-9, 9] },
  ],
  pts: [[0, 4, L(0, 4, 'V')], [0, -4, L(0, -4, 'V')], [0, 5, L(0, 5, 'F'), 'free'], [0, -5, L(0, -5, 'F'), 'free'], [2.25, 5, L(2.25, 5)], [-2.25, 5, L(-2.25, 5)]],
}, 'Plot of the hyperbola y squared over 16 minus x squared over 9 equals 1, with an upper and a lower branch opening up and down, vertices (0, 4) and (0, minus 4), foci (0, 5) and (0, minus 5), and the two asymptotes y equal to plus or minus 4 over 3 times x, which the branches approach but never touch. The ends of the latus rectum through the upper focus are (2.25, 5) and (minus 2.25, 5).', r`$a = 4$, $b = 3$, $c = 5$, $e = \dfrac{5}{4}$; asymptotes $y = \pm \dfrac{4}{3}x$.`);

// ---- WE3 two hyperbolas
export const Hw1 = new Hyperbola('x', 225, 64), Hw2 = new Hyperbola('y', 9, 16);
Hw1.verifySampling(); Hw2.verifySampling();
must(Hw1.a.eq(15) && Hw1.b.eq(8) && Hw1.c.eq(17) && Hw1.e.eq('17/15') && Hw1.lr.eq('128/15') && Hw2.a.eq(3) && Hw2.b.eq(4) && Hw2.c.eq(5) && Hw2.e.eq('5/3') && Hw2.lr.eq('32/3') && Hw2.slope2.eq('9/16'), 'WE3 hyperbolas');
export const we3hTable = table(['Part', 'Standard form', 'Values'], [
  [r`$\dfrac{x^2}{225} - \dfrac{y^2}{64} = 1$`, r`$a = 15$, $b = 8$, transverse axis along the $x$-axis`, r`$c = \sqrt{225 + 64} = 17$; foci $(\pm 17, 0)$; vertices $(\pm 15, 0)$; $e = \dfrac{17}{15}$; latus rectum $\dfrac{2 \times 64}{15} = \dfrac{128}{15}$`],
  [r`$16y^2 - 9x^2 = 144$`, r`Divide by $144$: $\dfrac{y^2}{9} - \dfrac{x^2}{16} = 1$, so $a = 3$, $b = 4$, transverse axis along the $y$-axis`, r`$c = 5$; foci $(0, \pm 5)$; vertices $(0, \pm 3)$; $e = \dfrac{5}{3}$; latus rectum $\dfrac{2 \times 16}{3} = \dfrac{32}{3}$; asymptotes $y = \pm \dfrac{3}{4}x$`],
], 'Table analysing two hyperbolas: x squared over 225 minus y squared over 64 equals 1 has a 15, b 8, c 17, e 17 over 15 and latus rectum 128 over 15; 16y squared minus 9x squared equals 144 becomes y squared over 9 minus x squared over 16 equals 1 with a 3, b 4, c 5, e 5 over 3, latus rectum 32 over 3 and asymptotes y equal to plus or minus 3 over 4 x.', 'The positive term decides the axis; then $c^2 = a^2 + b^2$.');

// ---- WE4 hyperbola from vertices and foci
export const Hq = new Hyperbola('y', 49, 576);
Hq.verifySampling();
must(Hq.a.eq(7) && Hq.c.eq(25) && Hq.b.eq(24) && Hq.e.eq('25/7') && Hq.lr.eq('1152/7'), 'WE4 hyperbola');
export const we4hTable = table(['Step', 'Working'], [
  ['Axis', r`Vertices and foci are on the $y$-axis, so the form is $\dfrac{y^2}{a^2} - \dfrac{x^2}{b^2} = 1$`],
  ['Read off', r`$a = 7$ (vertex) and $c = 25$ (focus)`],
  ['Find $b$', r`$b^2 = c^2 - a^2 = 625 - 49 = 576$, so $b = 24$`],
  ['Equation', r`$\dfrac{y^2}{49} - \dfrac{x^2}{576} = 1$`],
  ['Eccentricity', r`$e = \dfrac{c}{a} = \dfrac{25}{7}$`],
], 'Table finding the hyperbola with vertices (0, 7) and (0, minus 7) and foci (0, 25) and (0, minus 25): a is 7, c is 25, b squared is 625 minus 49 equals 576, so the equation is y squared over 49 minus x squared over 576 equals 1 with eccentricity 25 over 7.', 'Here $b^2 = c^2 - a^2$, the opposite subtraction to the ellipse.');

// ---- comparison table
export const compareTable = table(['', 'Circle', 'Ellipse', 'Parabola', 'Hyperbola'], [
  ['Eccentricity', '$0$', r`$0 < e < 1$`, '$1$', r`$e > 1$`],
  ['Standard equation', r`$x^2 + y^2 = r^2$`, r`$\dfrac{x^2}{a^2} + \dfrac{y^2}{b^2} = 1$`, '$y^2 = 4ax$', r`$\dfrac{x^2}{a^2} - \dfrac{y^2}{b^2} = 1$`],
  ['Relation of the constants', '$-$', '$c^2 = a^2 - b^2$', '$-$', '$c^2 = a^2 + b^2$'],
  ['Defining property', 'Fixed distance from the centre', 'Sum of focal distances $= 2a$', 'Focal distance = distance from directrix', 'Difference of focal distances $= 2a$'],
  ['Latus rectum', '$-$', r`$\dfrac{2b^2}{a}$`, '$4a$', r`$\dfrac{2b^2}{a}$`],
], 'Table comparing the four conics: the circle has eccentricity 0, the ellipse between 0 and 1 with c squared equal to a squared minus b squared and a constant sum of focal distances, the parabola exactly 1 with latus rectum 4a, and the hyperbola more than 1 with c squared equal to a squared plus b squared and a constant difference of focal distances.', 'Same word, same letters $a$, $b$, $c$: the signs change the curve.');
must(Rat.of(0).isZero() && [new Ellipse(16, 9).e2, new Ellipse(25, 24).e2].every((x) => x.sign() > 0 && x.lt(1)) && new Hyperbola('x', 16, 9).e2.gt(1), 'compare table e');

// ---- WE5 focal distance check for P(6, 4.8) on x^2/100 + y^2/36 = 1
export const E5 = new Ellipse(100, 36);
E5.verifySampling();
must(E5.c.eq(8) && E5.on([6, '24/5']) && near(Math.hypot(14, 4.8), 14.8) && near(Math.hypot(2, 4.8), 5.2) && near(14.8 + 5.2, 20), 'WE5 focal distances');
const d5a = Rat.of(14).mul(14).add(Rat.of('24/5').mul('24/5')), d5b = Rat.of(2).mul(2).add(Rat.of('24/5').mul('24/5'));
must(d5a.eq('5476/25') && sqrtQ(d5a).eq('74/5') && sqrtQ(d5b).eq('26/5'), 'exact focal distances 74/5 and 26/5');
export const we5eTable = table(['Step', 'Working'], [
  ['Is $P(6, 4.8)$ on the ellipse?', r`$\dfrac{36}{100} + \dfrac{4.8^2}{36} = 0.36 + 0.64 = 1$, yes`],
  ['Foci', r`$a = 10$, $b = 6$, $c = 8$: $F_1(-8, 0)$ and $F_2(8, 0)$`],
  [r`Distance $PF_1$`, r`$\sqrt{(6 + 8)^2 + 4.8^2} = \sqrt{219.04} = 14.8$`],
  [r`Distance $PF_2$`, r`$\sqrt{(6 - 8)^2 + 4.8^2} = \sqrt{27.04} = 5.2$`],
  ['Sum', r`$14.8 + 5.2 = 20 = 2a$, the length of the major axis`],
], 'Table checking the focal property of the ellipse x squared over 100 plus y squared over 36 equals 1 at the point P(6, 4.8): the foci are (minus 8, 0) and (8, 0), the distances from P are 14.8 and 5.2, and they add to 20, the length of the major axis.', 'Sum of the two focal distances $= 2a$.');

export const summary2 = flow('LR', [['e', r`Ellipse: $\dfrac{x^2}{a^2} + \dfrac{y^2}{b^2} = 1$, $c^2 = a^2 - b^2$`], ['h', r`Hyperbola: $\dfrac{x^2}{a^2} - \dfrac{y^2}{b^2} = 1$, $c^2 = a^2 + b^2$`], ['c', r`$e = \dfrac{c}{a}$: $e < 1$ ellipse, $e > 1$ hyperbola`], ['l', r`Latus rectum $\dfrac{2b^2}{a}$; asymptotes $y = \pm\dfrac{b}{a}x$`]], [['e', 'h'], ['h', 'c'], ['c', 'l']], 'Summary flow: the ellipse has c squared equal to a squared minus b squared and the hyperbola c squared equal to a squared plus b squared; the eccentricity c over a is below 1 for an ellipse and above 1 for a hyperbola; both have latus rectum 2 b squared over a, and the hyperbola has asymptotes y equal to plus or minus b over a times x.', 'Ellipse and hyperbola.');
