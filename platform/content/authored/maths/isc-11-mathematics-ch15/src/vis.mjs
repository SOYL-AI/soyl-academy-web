// Visuals for ISC 11 Mathematics ch15 Introduction to Three-Dimensional Geometry. Every coordinate, distance, ratio and section point in a
// table or figure is computed here from exact integers and rationals (space.mjs, x3.mjs) and asserted. Oblique sketches are marked not
// to scale; the 2-D plots are projections on the xy-plane (or a cross-section by it), and their captions say so.
import { table, flow, plot as plot0 } from './lib.mjs';
import { r, must, near, tx, pt, dsq, sqTex, diffSq, sqTerms, vminus, octant, ROMAN, where, footPlane, footAxis, dsqAxis, distPlane, sect, mid, centroid, ratioTex, collinear, triangleKind, fig3d, Rat, N } from './space.mjs';
import { ext, fourth, planeCut, onLine, tetraCentroid, bisector, sphere, lin } from './x3.mjs';

export { must };
export const V = {};
const M = (t) => `$${t}$`;
const P$ = (p) => `$${pt(p)}$`;
const um = (v) => String(v).replace(/-/g, '−');
export const L = (name, p) => `${name}(${p.map((v) => um(+N(v).toFixed(4))).join(', ')})`;
const plot = (spec, alt, caption) => { const v = plot0(spec, alt, caption); (spec.pts ?? []).forEach((p, i) => { if (p[3] === 'free') v.spec.points[i].on_curve = false; }); return v; };
function checkLabels(spec, pts) {
  for (const [id, o] of Object.entries(pts)) {
    if (typeof o.label !== 'string') continue;
    const m = /\(([^)]*)\)/.exec(o.label);
    if (!m) continue;
    const nums = m[1].replace(/−/g, '-').split(',').map(Number);
    must(nums.length === 3 && nums.every((v, i) => near(v, N(o.p[i]))), `label ${o.label} for point ${id} at ${o.p}`);
  }
  return spec;
}
const fig = (o) => fig3d(checkLabels(o, o.pts));
/** Line through two projected points as a plot function on [min x, max x] (exact slope), points checked by the caller. */
export function lineFn(p, q2, label) {
  const nn = (v) => (typeof v === 'number' ? v : Rat.of(v).num());
  const [x1, y1] = p.map(nn), [x2, y2] = q2.map(nn);
  must(x1 !== x2, 'line must not be vertical');
  const xs = x1 < 0 ? `(x+${-x1})` : x1 === 0 ? 'x' : `(x-${x1})`;
  const expr = `((${y2 - y1})/(${x2 - x1}))*${xs}${y1 < 0 ? `-${-y1}` : `+${y1}`}`;
  return { expr, ...(label ? { label } : {}), domain: [Math.min(x1, x2), Math.max(x1, x2)] };
}
const proj = (p) => [N(p[0]), N(p[1])];
const lab2 = (name, p) => `$${name}(${tx(p[0])}, ${tx(p[1])})$`;

// ================================================================ deck 1
V.route1 = flow('LR', [['a', 'Axes, planes and octants'], ['b', 'Feet and distances from axes and planes'], ['c', 'Distance between two points'], ['d', 'Triangle types and collinear points']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Route map of Part 1: coordinates, axes, planes and octants, then feet of perpendiculars and distances from axes and planes, then the distance formula, then triangle types and collinear points.', 'Part 1 in four steps.');
V.goals1 = table(['You will be able to', 'Using', 'Key result'], [
  ['Place a point and name its octant', 'signs of $x$, $y$, $z$', 'eight octants'],
  ['Find feet and distances from axes and planes', 'zeroing coordinates', M(r`\sqrt{y^2 + z^2}, \; \lvert x \rvert`)],
  ['Find the distance between two points', 'distance formula', M(r`\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2 + (z_2 - z_1)^2}`)],
  ['Test collinearity and name triangles', 'squared distances', 'compare the three squared sides'],
], 'Table of goals for Part 1: octants, feet and distances, the distance formula, and collinearity and triangle types.', 'What Part 1 covers.');

// axes and planes
V.axes = fig({
  pts: {
    X3: { p: [3, 0, 0], label: false }, Y3: { p: [0, 3, 0], label: false }, Z3: { p: [0, 0, 3], label: false },
    XY: { p: [3, 3, 0], label: 'xy-plane', pos: 'e' }, YZ: { p: [0, 3, 3], label: 'yz-plane', pos: 'n' }, ZX: { p: [3, 0, 3], label: 'zx-plane', pos: 'w' },
  },
  segments: [{ from: 'X3', to: 'XY' }, { from: 'Y3', to: 'XY' }, { from: 'Y3', to: 'YZ' }, { from: 'Z3', to: 'YZ' }, { from: 'X3', to: 'ZX' }, { from: 'Z3', to: 'ZX' }],
  axes: [4, 4, 4],
  alt: 'An oblique sketch of the x, y and z axes meeting at the origin O at right angles. Three square patches mark the xy-plane between the x and y axes, the yz-plane between the y and z axes, and the zx-plane between the z and x axes.',
  caption: 'The axes and the three coordinate planes (oblique sketch, not to scale).',
});
const BX = [2, 5, 3];
V.box = fig({
  pts: {
    X1: { p: [BX[0], 0, 0], label: false }, Y1: { p: [0, BX[1], 0], label: false }, Z1: { p: [0, 0, BX[2]], label: false },
    XY: { p: [BX[0], BX[1], 0], label: L('N', [BX[0], BX[1], 0]), pos: 'se' }, YZ: { p: [0, BX[1], BX[2]], label: false }, ZX: { p: [BX[0], 0, BX[2]], label: false },
    P: { p: BX, label: L('P', BX), pos: 'n' },
  },
  segments: [{ from: 'X1', to: 'XY' }, { from: 'Y1', to: 'XY' }, { from: 'Y1', to: 'YZ' }, { from: 'Z1', to: 'YZ' }, { from: 'X1', to: 'ZX' }, { from: 'Z1', to: 'ZX' }, { from: 'XY', to: 'P' }, { from: 'YZ', to: 'P' }, { from: 'ZX', to: 'P' }, { from: 'O', to: 'P', dashed: true }],
  axes: [3, 6, 4],
  alt: 'An oblique sketch of the axes with a rectangular box whose corner at the origin O is opposite the corner P at 2, 5, 3. The edges lie along the axes: 2 units along x, 5 along y and 3 along z. The corner N at 2, 5, 0 below P is marked.',
  caption: 'P(2, 5, 3): 2 along x, 5 along y, 3 along z (oblique sketch, not to scale).',
});
must(dsq([0, 0, 0], BX) === 38, 'box diagonal squared 4 + 25 + 9');

// points on axes and planes
const ptsOn = [['Origin', [0, 0, 0], 'origin'], ['$x$-axis', [-4, 0, 0], 'x-axis'], ['$y$-axis', [0, 7, 0], 'y-axis'], ['$z$-axis', [0, 0, -2], 'z-axis'], ['$xy$-plane', [3, -6, 0], 'xy-plane'], ['$yz$-plane', [0, 5, 8], 'yz-plane'], ['$zx$-plane', [-1, 0, 4], 'zx-plane']];
for (const [, p, w] of ptsOn) must(where(p) === w, `where ${p} is ${w}`);
V.onAxes = table(['Position', 'Coordinates', 'Condition', 'Example'], [
  ['Origin', M('(0, 0, 0)'), 'all three are $0$', P$([0, 0, 0])],
  ['On the $x$-axis', M('(a, 0, 0)'), r`$y = 0$ and $z = 0$`, P$([-4, 0, 0])],
  ['On the $y$-axis', M('(0, b, 0)'), r`$x = 0$ and $z = 0$`, P$([0, 7, 0])],
  ['On the $z$-axis', M('(0, 0, c)'), r`$x = 0$ and $y = 0$`, P$([0, 0, -2])],
  ['In the $xy$-plane', M('(a, b, 0)'), '$z = 0$', P$([3, -6, 0])],
  ['In the $yz$-plane', M('(0, b, c)'), '$x = 0$', P$([0, 5, 8])],
  ['In the $zx$-plane', M('(a, 0, c)'), '$y = 0$', P$([-1, 0, 4])],
], 'Table: points on the three axes and in the three coordinate planes, with the coordinates that are zero and one example of each.', 'Which coordinates are zero.');
const we1pts = [[0, -6, 0], [4, 0, -7], [-3, 5, 0], [0, 2, 9], [-5, -1, -2], [0, 0, -3]];
V.we1 = table(['Point', 'Zero coordinates', 'Position'], we1pts.map((p) => [P$(p), p.map((v, i) => (v === 0 ? 'xyz'[i] : null)).filter(Boolean).join(', ') || 'none', where(p).replace('-axis', '-axis').replace('plane', 'plane')]), 'Table for worked example 1: each of six points with its zero coordinates and its position (the y-axis, the zx-plane, the xy-plane, the yz-plane, octant VII, the z-axis).', 'Position from the zero coordinates.');
must(we1pts.map(where).join() === 'y-axis,zx-plane,xy-plane,yz-plane,octant VII,z-axis', 'we1 positions');

// octants
const octPts = {};
for (const sx of [1, -1]) for (const sy of [1, -1]) for (const sz of [1, -1]) {
  const p = [2 * sx, 2 * sy, 2 * sz];
  octPts[`o${ROMAN[octant(p)]}`] = { p, label: ROMAN[octant(p)], pos: 'ne' };
}
must(Object.keys(octPts).length === 8, 'eight octants');
V.octants = fig({
  pts: octPts, axes: [3, 3, 3],
  alt: 'An oblique sketch of the three axes with eight labelled points, one deep in each octant, numbered I to VIII. Octants I to IV lie above the xy-plane and octants V to VIII lie below it.',
  caption: 'One point in each octant, labelled with the octant number (oblique sketch, not to scale).',
});
const octRows = [];
for (const sz of [1, -1]) for (const [sx, sy] of [[1, 1], [-1, 1], [-1, -1], [1, -1]]) {
  const p = [3 * sx, 2 * sy, 4 * sz], o = octant(p);
  octRows.push([ROMAN[o], sx > 0 ? '+' : '-', sy > 0 ? '+' : '-', sz > 0 ? '+' : '-', P$(p)]);
}
must(octRows.map((x) => x[0]).join() === 'I,II,III,IV,V,VI,VII,VIII', 'octant order I..VIII');
V.octTable = table(['Octant', '$x$', '$y$', '$z$', 'Example point'], octRows, 'Table of the eight octants with the sign of x, y and z in each, and an example point: octant I has plus, plus, plus; II minus, plus, plus; III minus, minus, plus; IV plus, minus, plus; V to VIII repeat these with z negative.', 'Octants I to IV have z positive; octants V to VIII are their copies below the xy-plane.');
const we2a = [4, -7, -1], we2b = [-2, -6, 8];
must(octant(we2a) === 8 && octant(we2b) === 3, 'we2');
V.we2 = table(['Point', 'Signs of $(x, y, z)$', 'Octant'], [[P$(we2a), '$(+, -, -)$', 'VIII'], [P$(we2b), '$(-, -, +)$', 'III'], ['$x < 0$, $y > 0$, $z < 0$', '$(-, +, -)$', 'VI']], 'Table for worked example 2: the point 4, minus 7, minus 1 lies in octant VIII, the point minus 2, minus 6, 8 in octant III, and a point with x negative, y positive, z negative in octant VI.', 'Reading the octant from the signs.');
must(octant([-1, 1, -1]) === 6, 'octant VI');

// feet and distances
const FP = [2, 4, 3];
const fxy = footPlane(FP, 'xy'), fx = footAxis(FP, 'x');
must(dsq(FP, fxy) === 9 && dsq(FP, fx) === 25 && dsqAxis(FP, 'x') === 25, 'foot figure: PF = 3, PM = 5');
V.feet = fig({
  pts: { P: { p: FP, label: L('P', FP), pos: 'n' }, F: { p: fxy, label: L('F', fxy), pos: 'e' }, M: { p: fx, label: L('M', fx), pos: 'sw' } },
  segments: [{ from: 'P', to: 'F' }, { from: 'P', to: 'M', dashed: true }, { from: 'F', to: 'M', dashed: true }],
  axes: [4, 5, 5],
  alt: 'An oblique sketch of the axes with a point P at 2, 4, 3 above the xy-plane. A vertical segment drops from P to its foot F at 2, 4, 0 on the xy-plane, and a dashed segment joins P to M at 2, 0, 0, the foot of the perpendicular on the x-axis.',
  caption: 'F is the foot of P on the xy-plane (PF = 3); M is the foot on the x-axis (PM = 5) (oblique sketch, not to scale).',
});
const DP = [-2, 6, 9];
must(dsq([0, 0, 0], DP) === 121 && dsqAxis(DP, 'x') === 117 && dsqAxis(DP, 'y') === 85 && dsqAxis(DP, 'z') === 40 && sqTex(117) === r`3\sqrt{13}` && sqTex(40) === r`2\sqrt{10}`, 'distance table values');
V.distTable = table(['From', 'Distance of $(x, y, z)$', `For ${pt(DP)}`], [
  ['$yz$-plane', M(r`\lvert x \rvert`), M(String(distPlane(DP, 'yz').num()))],
  ['$zx$-plane', M(r`\lvert y \rvert`), M(String(distPlane(DP, 'zx').num()))],
  ['$xy$-plane', M(r`\lvert z \rvert`), M(String(distPlane(DP, 'xy').num()))],
  ['$x$-axis', M(r`\sqrt{y^2 + z^2}`), M(sqTex(117))],
  ['$y$-axis', M(r`\sqrt{x^2 + z^2}`), M(sqTex(85))],
  ['$z$-axis', M(r`\sqrt{x^2 + y^2}`), M(sqTex(40))],
  ['Origin', M(r`\sqrt{x^2 + y^2 + z^2}`), M(sqTex(121))],
], 'Table of distances of the point minus 2, 6, 9 from the three planes (2, 6 and 9), the three axes (3 root 13, root 85 and 2 root 10) and the origin (11), with the general formula for each.', 'Distances of a point from planes, axes and the origin.');
const Q5 = [5, -3, -4], q5a = footPlane(Q5, 'zx'), q5b = footAxis(Q5, 'z');
must(q5a.join() === '5,0,-4' && q5b.join() === '0,0,-4' && dsqAxis(Q5, 'x') === 25, 'we3');
V.we3 = table(['Question', 'Working', 'Answer'], [
  [r`Foot on the $zx$-plane`, 'Make the $y$-coordinate $0$', P$(q5a)],
  [r`Foot on the $z$-axis`, 'Keep $z$; make $x$ and $y$ zero', P$(q5b)],
  [r`Distance from the $x$-axis`, M(r`\sqrt{(-3)^2 + (-4)^2} = \sqrt{25}`), '$5$'],
], 'Table for worked example 3 about the point 5, minus 3, minus 4: its foot on the zx-plane is 5, 0, minus 4; its foot on the z-axis is 0, 0, minus 4; its distance from the x-axis is 5.', 'Feet and a distance for $Q(5, -3, -4)$.');

// distance formula
const DA = [1, 1, 1], DB = [4, 1, 1], DC = [4, 5, 1], DQ = [4, 5, 3];
must(dsq(DA, DC) === 25 && dsq(DC, DQ) === 4 && dsq(DA, DQ) === 29 && dsq(DA, DC) + dsq(DC, DQ) === dsq(DA, DQ), 'distance derivation: 25 + 4 = 29');
V.distFig = fig({
  pts: { A: { p: DA, label: L('P', DA), pos: 'w' }, B: { p: DB, label: false }, C: { p: DC, label: L('R', DC), pos: 'e' }, Q: { p: DQ, label: L('Q', DQ), pos: 'n' } },
  segments: [{ from: 'A', to: 'B' }, { from: 'B', to: 'C' }, { from: 'C', to: 'Q' }, { from: 'A', to: 'C', dashed: true }, { from: 'A', to: 'Q' }],
  axes: [5, 6, 4],
  alt: 'An oblique sketch of a path from P at 1, 1, 1 along the x direction by 3, then along the y direction by 4 to R at 4, 5, 1, then up by 2 to Q at 4, 5, 3. The dashed segment PR lies in a plane parallel to the xy-plane and has length 5; the segment PQ is the required distance.',
  caption: 'PR² = 3² + 4² = 25 and PQ² = PR² + RQ² = 25 + 2² = 29 (oblique sketch, not to scale).',
});
const W4A = [-2, 5, 1], W4B = [4, -1, -3];
must(dsq(W4A, W4B) === 88 && sqTex(88) === r`2\sqrt{22}` && diffSq(W4A, W4B) === '(4 - (-2))^2 + (-1 - 5)^2 + (-3 - 1)^2' && sqTerms(W4A, W4B) === '36 + 36 + 16', 'we4');
V.we4 = table(['Step', 'Work'], [['Differences', M(r`x_2 - x_1 = 6, \quad y_2 - y_1 = -6, \quad z_2 - z_1 = -4`)], ['Squares', M(r`36 + 36 + 16 = 88`)], ['Distance', M(r`AB = \sqrt{88} = 2\sqrt{22}`)]], 'Table for worked example 4: for A at minus 2, 5, 1 and B at 4, minus 1, minus 3 the coordinate differences are 6, minus 6 and minus 4, the squares add to 88, and the distance is 2 root 22.', 'AB for $A(-2, 5, 1)$ and $B(4, -1, -3)$.');
V.tri = table(['Triangle', 'Test on the squared sides'], [['Equilateral', 'all three equal'], ['Isosceles', 'exactly two equal'], ['Right-angled', 'two squared sides add up to the third'], ['Right-angled isosceles', 'two equal, and their sum equals the third'], ['Scalene', 'all three different and no such sum']], 'Table of triangle tests by squared side lengths: equilateral has all three equal, isosceles exactly two equal, right-angled has two squared sides adding to the third.', 'Compare squared sides first; take roots last.');
const T5 = [[1, 3, 0], [1, -3, 2], [-4, 3, 0]], t5 = triangleKind(...T5);
must(t5.sides.join() === '40,65,25' && t5.right && !t5.iso && t5.kind === 'right-angled' && 40 + 25 === 65, 'we5');
V.we5 = table(['Side', 'Squared length'], [['$AB$', M(r`0 + 36 + 4 = 40`)], ['$BC$', M(r`25 + 36 + 4 = 65`)], ['$CA$', M(r`25 + 0 + 0 = 25`)], ['Test', M(r`AB^2 + CA^2 = 40 + 25 = 65 = BC^2`)]], 'Table for worked example 5: the triangle with vertices A at 1, 3, 0, B at 1, minus 3, 2 and C at minus 4, 3, 0 has squared sides 40, 65 and 25, and 40 plus 25 equals 65, so the right angle is at A.', 'Right angle at $A$.');
const C6 = [[-2, 3, 1], [1, 1, 5], [7, -3, 13]];
const [c6a, c6b, c6c] = C6;
must(dsq(c6a, c6b) === 29 && dsq(c6b, c6c) === 116 && dsq(c6a, c6c) === 261 && sqTex(116) === r`2\sqrt{29}` && sqTex(261) === r`3\sqrt{29}` && collinear(c6a, c6b, c6c), 'we6 collinear: sqrt29 + 2 sqrt29 = 3 sqrt29');
V.collin = plot({
  x: [-4, 9], y: [-5, 5], fns: [lineFn(proj(c6a), proj(c6c))],
  pts: C6.map((p, i) => [N(p[0]), N(p[1]), lab2("ABC"[i] + "'", p)]),
  xl: 'x', yl: 'y',
}, 'Projection on the xy-plane of three points A, B and C that lie on one straight line in space; the projections A prime at minus 2, 3, B prime at 1, 1 and C prime at 7, minus 3 lie on one straight line.', 'Projection on the xy-plane: collinear points in space project to collinear points.');
V.we6 = table(['Distance', 'Squared', 'Value'], [['$AB$', M('9 + 4 + 16 = 29'), M(r`\sqrt{29}`)], ['$BC$', M('36 + 16 + 64 = 116'), M(r`2\sqrt{29}`)], ['$AC$', M('81 + 36 + 144 = 261'), M(r`3\sqrt{29}`)], ['Test', M(r`AB + BC = \sqrt{29} + 2\sqrt{29} = 3\sqrt{29} = AC`), 'collinear']], 'Table for worked example 6: for A at minus 2, 3, 1, B at 1, 1, 5 and C at 7, minus 3, 13 the distances are root 29, 2 root 29 and 3 root 29, and the first two add to the third, so the points are collinear.', 'The longest distance equals the sum of the other two.');
V.quad = table(['Quadrilateral $ABCD$', 'Test'], [['Parallelogram', 'opposite sides equal, or the diagonals have the same mid-point'], ['Rhombus', 'a parallelogram with all four sides equal'], ['Rectangle', 'a parallelogram with equal diagonals'], ['Square', 'a rhombus with equal diagonals']], 'Table of tests for quadrilaterals: parallelogram, rhombus, rectangle and square, using side lengths, diagonal lengths and the mid-points of the diagonals.', 'Sides, diagonals and mid-points settle the type.');
const E7A = [3, -1, 2], E7B = [-1, 5, 6];
must(dsq([0, 4, 0], E7A) === 38 && dsq([0, 4, 0], E7B) === 38 && [...Array(41)].map((_, i) => -20 + i).filter((s) => dsq([0, s, 0], E7A) === dsq([0, s, 0], E7B)).join() === '4', 'we7');
V.we7 = table(['Step', 'Work'], [['Point on the $y$-axis', M('P(0, s, 0)')], ['$PA^2$', M(r`9 + (s + 1)^2 + 4`)], ['$PB^2$', M(r`1 + (s - 5)^2 + 36`)], ['Equate', M(r`s^2 + 2s + 14 = s^2 - 10s + 62 \;\Rightarrow\; 12s = 48`)], ['Answer', M(r`s = 4, \; P(0, 4, 0), \; PA = PB = \sqrt{38}`)]], 'Table for worked example 7: the point P at 0, s, 0 on the y-axis equidistant from A at 3, minus 1, 2 and B at minus 1, 5, 6 satisfies s squared plus 2s plus 14 equals s squared minus 10s plus 62, so s is 4 and each distance is root 38.', 'Equidistant point on the $y$-axis.');
// loci
const LA = [-2, 1, 0], LB = [4, 3, 0], bis = bisector(LA, LB);
must(bis.co.join() === '3,1,0' && bis.d === 5, 'bisector 3x + y = 5');
const LM = mid(LA, LB);
const LP1 = [0, 5], LP2 = [2, -1];
must([LP1, LP2].every((p) => dsq([p[0], p[1], 0], LA) === dsq([p[0], p[1], 0], LB)) && LM.join() === '1,2,0', 'bisector points');
V.loc1 = plot({
  x: [-4, 6], y: [-3, 7], fns: [{ expr: '5-3*x', domain: [-1, 2.5] }],
  pts: [[-2, 1, lab2('A', [-2, 1]), 'free'], [4, 3, lab2('B', [4, 3]), 'free'], [1, 2, lab2('M', [1, 2])], [0, 5, lab2('U', [0, 5])], [2, -1, lab2('W', [2, -1])]],
}, 'Cross-section by the xy-plane: the points A at minus 2, 1 and B at 4, 3 lie in the plane; the line y equals 5 minus 3x is where the plane equidistant from A and B cuts the xy-plane, and it passes through the midpoint M at 1, 2.', 'Cross-section by the xy-plane of the plane equidistant from $A$ and $B$.');
const SC = [-3, 0, 4], SP = sphere(SC, 49);
must(SP.sq === '(x + 3)^2 + y^2 + (z - 4)^2 = 49' && SP.gen === 'x^2 + y^2 + z^2 + 6x - 8z - 24 = 0', `sphere forms ${SP.sq} | ${SP.gen}`);
const sec = (cx, cy, rr) => ({ up: `${cy}+sqrt(${rr * rr}-(x-${cx})^2)`, dn: `${cy}-sqrt(${rr * rr}-(x-${cx})^2)` });
const s2 = sec(1, 2, 5);
V.loc2 = plot({
  x: [-5, 7], y: [-5, 9], fns: [{ expr: s2.up, domain: [-4, 6], label: 'upper half' }, { expr: s2.dn, domain: [-4, 6], label: 'lower half' }],
  pts: [[1, 2, 'C(1, 2)', 'free'], [6, 2, '(6, 2)'], [-4, 2, '(-4, 2)'], [1, 7, '(1, 7)'], [1, -3, '(1, -3)'], [4, 6, '(4, 6)']],
}, 'Cross-section of a sphere of radius 5 by a plane through its centre parallel to the xy-plane: a circle with centre 1, 2 and radius 5, drawn as an upper and a lower half. The points 6, 2; minus 4, 2; 1, 7; 1, minus 3 and 4, 6 are all 5 units from the centre.', 'A sphere cut by a plane through its centre: a circle of radius 5 (cross-section only).');
must([[6, 2], [-4, 2], [1, 7], [1, -3], [4, 6]].every(([x, y]) => (x - 1) ** 2 + (y - 2) ** 2 === 25), 'loc2 points on the circle');
V.we8 = table(['Step', 'Work'], [['Condition', M(r`PC = 7 \;\Rightarrow\; PC^2 = 49`)], ['Squared form', M(SP.sq)], ['Expanded', M(SP.gen)]], 'Table for worked example 8: the points P at distance 7 from C at minus 3, 0, 4 satisfy x plus 3 all squared plus y squared plus z minus 4 all squared equals 49, which expands to x squared plus y squared plus z squared plus 6x minus 8z minus 24 equals 0.', 'The set of points 7 units from $(-3, 0, 4)$.');
V.sum1a = table(['Topic', 'Key result'], [['Octants', 'signs of $(x, y, z)$ fix the octant; a zero coordinate means a plane or axis'], ['Feet and distances', r`zero the coordinates; $\sqrt{y^2 + z^2}$ from the $x$-axis`], ['Distance', M(r`\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2 + (z_2 - z_1)^2}`)], ['Tests', 'compare squared sides; collinear when the longest is the sum of the other two']], 'Summary table of Part 1: octants, feet and distances, the distance formula, and tests with squared sides.', 'Part 1 at a glance.');
V.tips1a = table(['Do', 'Avoid'], [['Square the differences and add before taking the root', 'Adding the differences before squaring'], ['Simplify surds: $\\sqrt{88} = 2\\sqrt{22}$', 'Leaving a perfect square inside the root'], ['Use squared distances for equidistance', 'Introducing roots too early'], ['Name the octant from the signs', 'Putting a point with a zero coordinate in an octant']], 'Table of exam tips for Part 1: square then add the differences, simplify surds, use squared distances for equidistance, and name octants only from non-zero signs.', 'Marks in Part 1 come from clear steps.');

// ================================================================ deck 2
V.route2 = flow('LR', [['a', 'Quadrilaterals and equidistant points'], ['b', 'Simple loci'], ['c', 'Mid-point and section formula'], ['d', 'Planes cutting a segment'], ['e', 'Collinearity, centroid, parallelogram']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Route map of Part 2: quadrilaterals and equidistant points, simple loci, the mid-point and section formulas, the ratio in which a coordinate plane divides a segment, and then collinearity, centroids and missing vertices of parallelograms.', 'Part 2 in five steps.');
V.goals2 = table(['You will be able to', 'Using', 'Key result'], [
  ['Classify a quadrilateral', 'sides and diagonals', 'common mid-point of the diagonals'],
  ['Describe a locus', 'equal or fixed distance', 'a plane or a sphere'],
  ['Find a mid-point', 'average of coordinates', M(r`\left(\dfrac{x_1 + x_2}{2}, \dfrac{y_1 + y_2}{2}, \dfrac{z_1 + z_2}{2}\right)`)],
  ['Divide a segment internally or externally', 'section formula', M(r`\dfrac{m x_2 \pm n x_1}{m \pm n}`)],
  ['Find where a plane cuts a segment', 'coordinate $= 0$', M(r`-a_k : b_k`)],
  ['Test collinearity and find a missing vertex', 'ratio and mid-points', 'common ratio for all three coordinates'],
  ['Find a centroid', 'average of the vertices', M(r`\dfrac{x_1 + x_2 + x_3}{3}`)],
], 'Table of goals for Part 2: quadrilaterals, loci, the mid-point formula, internal and external division, where a coordinate plane cuts a segment, collinearity and missing vertices, and centroids.', 'What Part 2 covers.');
const MA = [2, -3, 4], MB = [8, 5, -2], MM = mid(MA, MB);
must(MM.join() === '5,1,1', 'midpoint 5,1,1');
V.mid = plot({
  x: [0, 10], y: [-5, 7], fns: [lineFn(proj(MA), proj(MB))],
  pts: [[2, -3, lab2("A'", MA)], [8, 5, lab2("B'", MB)], [5, 1, lab2("M'", MM)]],
}, 'Projection on the xy-plane of the segment from A at 2, minus 3, 4 to B at 8, 5, minus 2: the projected points A prime at 2, minus 3 and B prime at 8, 5, with the projection of the midpoint M at 5, 1 halfway between them.', 'Projection on the xy-plane: the mid-point projects to the mid-point of the projections.');
const SA = [-4, 2, 5], SB = [6, -8, 0], SPt = sect(SA, SB, 2, 3);
must(SPt.join() === '0,-2,3', 'sect 2:3');
V.sect = table(['Coordinate', 'From $A$', 'To $B$', 'Divided $2 : 3$'], [0, 1, 2].map((i) => ['$' + 'xyz'[i] + '$', M(String(SA[i])), M(String(SB[i])), M(r`\dfrac{2(${SB[i]}) + 3(${SA[i] < 0 ? `${SA[i]}` : SA[i]})}{5} = ${SPt[i].tex()}`)]), 'Table: dividing the segment from A at minus 4, 2, 5 to B at 6, minus 8, 0 in the ratio 2 to 3 divides each coordinate in the same ratio and gives the point 0, minus 2, 3.', 'Each coordinate is divided in the same ratio $m : n$.');
const W1A = [-5, 3, 8], W1B = [7, -9, -4], W1P = sect(W1A, W1B, 1, 3);
must(W1P.join() === '-2,0,5', 'deck2 we1');
V.we1b = table(['Step', 'Work'], [['Ratio', M(r`AP : PB = 1 : 3,\; m = 1,\; n = 3`)], ['$x$', M(r`\dfrac{1(7) + 3(-5)}{4} = -2`)], ['$y$', M(r`\dfrac{1(-9) + 3(3)}{4} = 0`)], ['$z$', M(r`\dfrac{1(-4) + 3(8)}{4} = 5`)], ['Point', P$(W1P) + ' (in the $zx$-plane)']], 'Table for worked example 1 of Part 2: A at minus 5, 3, 8 and B at 7, minus 9, minus 4 with AP to PB equal to 1 to 3 give P at minus 2, 0, 5, which lies in the zx-plane.', 'Internal division $1 : 3$.');
const EA = [3, -2, 5], EB = [5, 2, 1], EP = ext(EA, EB, 3, 2);
must(EP.join() === '9,10,-7', 'ext 3:2');
V.extPlot = plot({
  x: [0, 11], y: [-5, 12], fns: [lineFn(proj(EA), proj(EP))],
  pts: [[3, -2, lab2("A'", EA)], [5, 2, lab2("B'", EB)], [9, 10, lab2("P'", EP)]],
}, 'Projection on the xy-plane of the line through A at 3, minus 2, 5 and B at 5, 2, 1. The point P at 9, 10, minus 7 that divides AB externally in the ratio 3 to 2 lies beyond B on the same line, so its projection P prime at 9, 10 is beyond B prime at 5, 2.', 'Projection on the xy-plane: an external point lies on the line beyond $B$.');
const E2A = [2, -1, 3], E2B = [-4, 5, -3], E2P = ext(E2A, E2B, 5, 3);
must(E2P.join() === '-13,14,-12', 'we2 ext 5:3');
V.we2b = table(['Step', 'Work'], [['Ratio', M(r`AP : PB = 5 : 3`) + ' externally'], ['Formula', M(r`\left(\dfrac{5x_2 - 3x_1}{5 - 3}, \dfrac{5y_2 - 3y_1}{5 - 3}, \dfrac{5z_2 - 3z_1}{5 - 3}\right)`)], ['$x$', M(r`\dfrac{5(-4) - 3(2)}{2} = -13`)], ['$y$', M(r`\dfrac{5(5) - 3(-1)}{2} = 14`)], ['$z$', M(r`\dfrac{5(-3) - 3(3)}{2} = -12`)], ['Point', P$(E2P)]], 'Table for worked example 2 of Part 2: A at 2, minus 1, 3 and B at minus 4, 5, minus 3 divided externally in the ratio 5 to 3 give P at minus 13, 14, minus 12.', 'External division $5 : 3$.');
const PA = [4, -2, 6], PB = [-2, 5, 9];
const pcs = [0, 1, 2].map((k) => planeCut(PA, PB, k));
must(pcs[0].text === '2 : 1' && pcs[0].internal && pcs[1].text === '2 : 5' && pcs[1].internal && pcs[2].text === '2 : 3' && !pcs[2].internal && pcs[2].P.join() === '16,-16,0', 'plane cuts');
V.planeCut = table(['Plane', 'Coordinate used', 'Ratio $AP : PB$', 'Kind', 'Meeting point'], ['yz', 'zx', 'xy'].map((nm, i) => [`$${nm}$-plane`, M(['x', 'y', 'z'][i] + r`: \; -(${PA[i]}) : ${PB[i]}`), M(pcs[i].text), pcs[i].internal ? 'internal' : 'external', P$(pcs[i].P)]), 'Table of where the segment from A at 4, minus 2, 6 to B at minus 2, 5, 9 meets the three coordinate planes: the yz-plane internally in 2 to 1, the zx-plane internally in 2 to 5 and the xy-plane externally in 2 to 3, at 16, minus 16, 0.', 'Ratio $-a_k : b_k$; the sign says internal or external.');
const W3A = [3, -8, 2], W3B = [-1, 4, 6], w3 = planeCut(W3A, W3B, 1);
must(w3.text === '2 : 1' && w3.internal && w3.P.join() === '1/3,0,14/3', 'we3 deck2');
V.we3b = table(['Step', 'Work'], [['Plane $y = 0$', M(r`\text{ratio } -y_1 : y_2 = 8 : 4 = 2 : 1`)], ['Kind', 'both parts positive, so internal'], ['Point', M(r`\left(\dfrac{2(-1) + 1(3)}{3}, 0, \dfrac{2(6) + 1(2)}{3}\right) = \left(\dfrac{1}{3}, 0, \dfrac{14}{3}\right)`)]], 'Table for worked example 3 of Part 2: the zx-plane divides the segment from 3, minus 8, 2 to minus 1, 4, 6 internally in the ratio 2 to 1, at the point one third, 0, fourteen thirds.', 'Where the $zx$-plane cuts $AB$.');
const KA = [1, -2, 3], KB = [4, 1, 9], KC = [7, 4, 15], kt = onLine(KA, KB, KC);
must(kt.eq(2) && collinear(KA, KB, KC) && dsq(KA, KB) === 54 && dsq(KB, KC) === 54 && dsq(KA, KC) === 216, 'collinear section: B is the mid-point of AC');
const KB2 = sect(KA, KC, 1, 1);
must(KB2.join() === KB.join(), 'B is the mid-point of AC');
V.collSec = table(['Method', 'What to do'], [['Distances', M(r`\text{longest} = \text{sum of the other two}`)], ['Section formula', 'find the ratio $\\lambda$ from one coordinate, then check the other two'], ['Vectors of differences', 'the three differences are in the same proportion']], 'Table of three ways to test whether three points are collinear: distances, the section formula with a common ratio, and proportional coordinate differences.', 'Three ways to test collinearity.');
V.we4b = table(['Step', 'Work'], [['Ratio from $x$', M(r`4 = \dfrac{m(7) + n(1)}{m + n} \Rightarrow 3m = 3n,\; m : n = 1 : 1`)], ['Check $y$', M(r`\dfrac{4 + (-2)}{2} = 1`)], ['Check $z$', M(r`\dfrac{15 + 3}{2} = 9`)], ['Conclusion', '$B(4, 1, 9)$ is the mid-point of $AC$, so $A$, $B$, $C$ are collinear']], 'Table for worked example 4 of Part 2: for A at 1, minus 2, 3, B at 4, 1, 9 and C at 7, 4, 15 the x-coordinate gives the ratio 1 to 1 and the y and z coordinates confirm it, so B is the midpoint of AC and the points are collinear.', 'Collinearity by the section formula.');
const GA = [3, 7, 5], GB = [-4, -2, 8], GC = [7, -2, -4], GG = centroid(GA, GB, GC), GD = mid(GB, GC);
must(GG.join() === '2,1,3' && GD.join() === '3/2,-2,2' && sect(GA, GD, 2, 1).join() === '2,1,3', 'centroid');
V.cent = plot({
  x: [-6, 9], y: [-4, 9],
  fns: [lineFn(proj(GA), proj(GB)), lineFn(proj(GB), proj(GC)), lineFn(proj(GC), proj(GA)), lineFn(proj(GA), proj(GD))],
  pts: [[3, 7, lab2("A'", GA)], [-4, -2, lab2("B'", GB)], [7, -2, lab2("C'", GC)], [1.5, -2, "D'(3/2, -2)"], [2, 1, lab2("G'", GG)]],
}, 'Projection on the xy-plane of the triangle with vertices A at 3, 7, 5, B at minus 4, minus 2, 8 and C at 7, minus 2, minus 4, with the median from A to the midpoint D of BC. The centroid G at 2, 1, 3 projects to G prime at 2, 1 on that median, two thirds of the way from A prime to D prime.', 'Projection on the xy-plane of a triangle, its median $AD$ and the centroid $G$.');
const G5A = [2, -4, 6], G5B = [-5, 1, 3], G5G = [1, 2, -1], G5C = G5G.map((g, i) => 3 * g - G5A[i] - G5B[i]);
must(G5C.join() === '6,9,-12' && centroid(G5A, G5B, G5C).join() === '1,2,-1', 'we5 missing vertex from centroid');
V.we5b = table(['Step', 'Work'], [['Centroid condition', M(r`\dfrac{x_A + x_B + x_C}{3} = 1 \Rightarrow 2 - 5 + x_C = 3`)], ['$x_C$', M(String(G5C[0]))], ['$y_C$', M(r`-4 + 1 + y_C = 6 \Rightarrow y_C = ${G5C[1]}`)], ['$z_C$', M(r`6 + 3 + z_C = -3 \Rightarrow z_C = ${G5C[2]}`)], ['Vertex', P$(G5C)]], 'Table for worked example 5 of Part 2: with A at 2, minus 4, 6, B at minus 5, 1, 3 and centroid G at 1, 2, minus 1, the third vertex C is at 6, 9, minus 12.', 'The third vertex from the centroid.');
const TV = [[0, 0, 0], [8, 0, 0], [0, 12, 0], [0, 0, 16]], TG = tetraCentroid(TV);
must(TG.join() === '2,3,4', 'tetra');
V.tetra = table(['Shape', 'Vertices', 'Centroid'], [['Triangle', '3', M(r`\left(\dfrac{x_1 + x_2 + x_3}{3}, \dfrac{y_1 + y_2 + y_3}{3}, \dfrac{z_1 + z_2 + z_3}{3}\right)`)], ['Tetrahedron', '4', M(r`\left(\dfrac{x_1 + x_2 + x_3 + x_4}{4}, \ldots\right)`)], ['Example', P$(TV[0]) + ', ' + P$(TV[1]) + ', ' + P$(TV[2]) + ', ' + P$(TV[3]), P$(TG)]], 'Table: the centroid of a triangle is the average of three vertices and the centroid of a tetrahedron is the average of four; for the tetrahedron with vertices 0, 0, 0; 8, 0, 0; 0, 12, 0 and 0, 0, 16 it is 2, 3, 4.', 'Centroid = average of the vertices.');
const PGA = [-3, -2, 1], PGB = [2, -1, 4], PGC = [5, 3, 2], PGD = fourth(PGA, PGB, PGC), PGM = mid(PGA, PGC);
must(PGD.join() === '0,2,-1' && PGM.join() === '1,1/2,3/2' && mid(PGB, PGD).join() === '1,1/2,3/2', 'parallelogram');
V.para = plot({
  x: [-5, 7], y: [-4, 5],
  fns: [lineFn(proj(PGA), proj(PGB)), lineFn(proj(PGB), proj(PGC)), lineFn(proj(PGC), proj(PGD)), lineFn(proj(PGD), proj(PGA)), lineFn(proj(PGA), proj(PGC)), lineFn(proj(PGB), proj(PGD))],
  pts: [[-3, -2, lab2("A'", PGA)], [2, -1, lab2("B'", PGB)], [5, 3, lab2("C'", PGC)], [0, 2, lab2("D'", PGD)], [1, 0.5, "M'(1, 1/2)"]],
}, 'Projection on the xy-plane of the parallelogram ABCD with A at minus 3, minus 2, 1, B at 2, minus 1, 4, C at 5, 3, 2 and the missing vertex D at 0, 2, minus 1, with both diagonals. They cross at the projection of their common midpoint M at 1, 1 over 2, 3 over 2.', 'Projection on the xy-plane of a parallelogram and its diagonals; they meet at the common mid-point.');
V.we6b = table(['Step', 'Work'], [['Mid-point of $AC$', P$(PGM)], ['Mid-point of $BD$', M(r`\left(\dfrac{2 + x}{2}, \dfrac{-1 + y}{2}, \dfrac{4 + z}{2}\right)`)], ['Equate', M(r`2 + x = 2,\; -1 + y = 1,\; 4 + z = 3`)], ['Vertex', P$(PGD)]], 'Table for worked example 6 of Part 2: for the parallelogram ABCD with A at minus 3, minus 2, 1, B at 2, minus 1, 4 and C at 5, 3, 2 the diagonals share the midpoint 1, one half, three halves, which gives D at 0, 2, minus 1.', 'Missing vertex from the equal mid-points of the diagonals.');
V.method = flow('LR', [['q', 'Read the question'], ['a', 'Two points and a ratio: section formula'], ['b', 'Equal ratio: mid-point'], ['c', 'Three points in a line: ratio or distances'], ['d', 'Three vertices: centroid']], [['q', 'a'], ['q', 'b'], ['q', 'c'], ['q', 'd']], 'Flow chart for choosing a method: from the question, use the section formula for two points and a ratio, the mid-point formula for equal parts, a common ratio or distances for collinearity, and the average of the vertices for a centroid.', 'Choosing the right tool.');
V.sum2a = table(['Topic', 'Key result'], [['Mid-point', M(r`\left(\dfrac{x_1 + x_2}{2}, \dfrac{y_1 + y_2}{2}, \dfrac{z_1 + z_2}{2}\right)`)], ['Internal division', M(r`\dfrac{m x_2 + n x_1}{m + n}`)], ['External division', M(r`\dfrac{m x_2 - n x_1}{m - n}`)], ['Plane cut', M(r`-a_k : b_k`) + ': positive is internal, negative is external'], ['Centroid', 'average of the vertices (3 for a triangle, 4 for a tetrahedron)'], ['Parallelogram', M(r`D = A + C - B`)], ['Quadrilaterals and loci', r`common mid-point of the diagonals; $PA^2 = PB^2$ is a plane; $PC^2 = r^2$ is a sphere`]], 'Summary table of Part 2: quadrilaterals and loci, the mid-point formula, the internal and external section formulas, the ratio in which a plane cuts a segment, centroids, and the missing vertex of a parallelogram.', 'Part 2 at a glance.');
V.tips2 = table(['Do', 'Avoid'], [['State the ratio as $AP : PB$ before using the formula', 'Swapping $m$ and $n$'], ['Use $m - n$ in the denominator for external division', 'Using $m + n$ for an external point'], ['Check all three coordinates for collinearity', 'Checking only one coordinate'], ['Test a plane cut by the sign of $-a_k : b_k$', 'Calling every cut internal']], 'Table of exam tips for Part 2: state the ratio first, use m minus n for external division, check all three coordinates for collinearity, and read internal or external from the sign of the ratio.', 'Marks in Part 2 come from the ratio and a check.');

// ================================================================ notes visuals (reuse the plots and tables; two extra tables)
V.nSigns = V.octTable;
V.nFlow = V.method;
V.nLines = V.collSec;
V.nPara = V.para;
