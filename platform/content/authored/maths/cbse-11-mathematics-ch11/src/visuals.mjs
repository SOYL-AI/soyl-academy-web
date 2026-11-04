// Visuals for CBSE 11 Mathematics ch11 Introduction to Three-dimensional Geometry. Every figure and table value is computed
// by space.mjs (exact integers and rationals) and asserted; the oblique sketches are marked not to scale.
import { table, flow } from './lib.mjs';
import { r, must, near, tx, pt, dsq, sqTex, dTex, diffSq, sqTerms, vminus, octant, ROMAN, where, footPlane, footAxis, dsqAxis, reflectPlane, reflectOrigin, sect, mid, centroid, planeRatio, ratioTex, collinear, sumOfRoots, triangleKind, fig3d, Rat, N } from './space.mjs';

const um = (v) => String(v).replace(/-/g, '−');
/** Label "A(−3, 2, 1)" with Unicode minus signs (plain text in a figure) */
export const L = (name, p) => `${name}(${p.map((v) => um(+N(v).toFixed(4))).join(', ')})`;
/** Parses a "(a, b, c)" label and checks it against the drawn point. */
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
const T = (headers, rows, alt, caption) => table(headers, rows, alt, caption);
const P$ = (p) => `$${pt(p)}$`;

// ================================================================ figures
export const figAxes = fig({
  pts: {
    X3: { p: [3, 0, 0], label: false }, Y3: { p: [0, 3, 0], label: false }, Z3: { p: [0, 0, 3], label: false },
    XY: { p: [3, 3, 0], label: 'xy-plane', pos: 'e' }, YZ: { p: [0, 3, 3], label: 'yz-plane', pos: 'n' }, ZX: { p: [3, 0, 3], label: 'zx-plane', pos: 'w' },
  },
  segments: [{ from: 'X3', to: 'XY' }, { from: 'Y3', to: 'XY' }, { from: 'Y3', to: 'YZ' }, { from: 'Z3', to: 'YZ' }, { from: 'X3', to: 'ZX' }, { from: 'Z3', to: 'ZX' }],
  axes: [4, 4, 4],
  alt: 'A sketch of three mutually perpendicular axes x, y and z meeting at the origin O. Three square patches are drawn: the xy-plane flat on the floor between the x and y axes, the yz-plane between the y and z axes, and the zx-plane between the z and x axes.',
  caption: 'The three axes and the three coordinate planes (sketch, not to scale).',
});
const BX = [3, 4, 2];
export const figBox = fig({
  pts: {
    X1: { p: [BX[0], 0, 0], label: false }, Y1: { p: [0, BX[1], 0], label: false }, Z1: { p: [0, 0, BX[2]], label: false },
    XY: { p: [BX[0], BX[1], 0], label: L('N', [BX[0], BX[1], 0]), pos: 'se' }, YZ: { p: [0, BX[1], BX[2]], label: false }, ZX: { p: [BX[0], 0, BX[2]], label: false },
    P: { p: BX, label: L('P', BX), pos: 'n' },
  },
  segments: [{ from: 'X1', to: 'XY' }, { from: 'Y1', to: 'XY' }, { from: 'Y1', to: 'YZ' }, { from: 'Z1', to: 'YZ' }, { from: 'X1', to: 'ZX' }, { from: 'Z1', to: 'ZX' }, { from: 'XY', to: 'P' }, { from: 'YZ', to: 'P' }, { from: 'ZX', to: 'P' }, { from: 'O', to: 'P', dashed: true }],
  axes: [4, 5, 3],
  alt: 'A sketch of the axes with a rectangular box that has one corner at the origin O and the opposite corner at P, at 3, 4, 2. The box edges lie along the axes: 3 units along x, 4 along y and 2 along z. The foot N of P on the xy-plane, at 3, 4, 0, is marked.',
  caption: 'P(3, 4, 2) is reached by going 3 along x, 4 along y and 2 along z (sketch, not to scale).',
});
// eight octants, one labelled point in each (the label is the octant computed from the signs)
const octPts = {};
for (const sx of [1, -1]) for (const sy of [1, -1]) for (const sz of [1, -1]) {
  const p = [2 * sx, 2 * sy, 2 * sz];
  octPts[`o${ROMAN[octant(p)]}`] = { p, label: ROMAN[octant(p)], pos: 'ne' };
}
must(Object.keys(octPts).length === 8, 'eight octants');
export const figOct = fig({
  pts: octPts, axes: [3, 3, 3],
  alt: 'A sketch of the three axes with eight labelled points, one deep inside each octant. Octant I has all three coordinates positive; octants II, III and IV are above the xy-plane and octants V to VIII are below it.',
  caption: 'One point in each octant, labelled by its octant number (sketch, not to scale).',
});
const FP = [2, 3, 4];
export const figFoot = fig({
  pts: {
    P: { p: FP, label: L('P', FP), pos: 'n' }, F: { p: footPlane(FP, 'xy'), label: L('F', footPlane(FP, 'xy')), pos: 'e' },
    I: { p: reflectPlane(FP, 'xy'), label: L('P′', reflectPlane(FP, 'xy')), pos: 'e' }, M: { p: footAxis(FP, 'x'), label: L('M', footAxis(FP, 'x')), pos: 'sw' },
  },
  segments: [{ from: 'P', to: 'F' }, { from: 'F', to: 'I', dashed: true }, { from: 'P', to: 'M', dashed: true }, { from: 'F', to: 'M', dashed: true }],
  axes: [4, 5, 5],
  alt: 'A sketch of the axes with a point P above the xy-plane at 2, 3, 4. A vertical segment drops from P to its foot F on the xy-plane at 2, 3, 0 and continues the same distance below the plane to the image P prime at 2, 3, minus 4. A dashed segment from P reaches M, the foot on the x-axis at 2, 0, 0.',
  caption: 'F is the foot of P on the xy-plane, P′ is the image of P in that plane, M is the foot on the x-axis (sketch, not to scale).',
});
must(dsq(FP, footPlane(FP, 'xy')) === 16 && dsq(footPlane(FP, 'xy'), reflectPlane(FP, 'xy')) === 16 && dsqAxis(FP, 'x') === 25 && dsq(FP, footAxis(FP, 'x')) === 25, 'foot figure distances: PF = FP′ = 4, PM = 5');
const DA = [1, 1, 1], DB = [3, 4, 7], DC = [3, 4, 1];
must(dsq(DA, DC) === 13 && dsq(DC, DB) === 36 && dsq(DA, DB) === 49 && dsq(DA, DC) + dsq(DC, DB) === dsq(DA, DB), 'distance figure: AC^2 + CB^2 = AB^2');
export const figDist = fig({
  pts: { A: { p: DA, label: L('A', DA), pos: 'se' }, B: { p: DB, label: L('B', DB), pos: 'n' }, C: { p: DC, label: L('C', DC), pos: 'e' } },
  segments: [{ from: 'A', to: 'B' }, { from: 'A', to: 'C', dashed: true }, { from: 'C', to: 'B', dashed: true }],
  axes: [4, 5, 8],
  alt: 'A sketch of the axes with two points A, at 1, 1, 1, and B, at 3, 4, 7. A dashed segment from A runs level to C, at 3, 4, 1, directly below B, and a dashed vertical segment rises from C to B. The segment AB is the long side of the right triangle ACB.',
  caption: 'AB² = AC² + CB²: first across the floor (AC² = 13), then up (CB = 6), so AB = 7 (sketch, not to scale).',
});
const SA = [-3, 2, 1], SB = [7, -3, 6], SP = sect(SA, SB, 2, 3);
must(SP.every((v, i) => v.eq([1, 0, 3][i])), 'section figure point');
export const figSect = fig({
  pts: { A: { p: SA, label: L('A', SA), pos: 'w' }, B: { p: SB, label: L('B', SB), pos: 'e' }, Pn: { p: SP, label: L('P', SP), pos: 'n' } },
  segments: [{ from: 'A', to: 'Pn', label: '2 parts' }, { from: 'Pn', to: 'B', label: '3 parts' }],
  axes: [3, 4, 4],
  alt: 'A sketch of the axes with the segment from A, at minus 3, 2, 1, to B, at 7, minus 3, 6. The point P, at 1, 0, 3, lies on it and cuts it into two parts from A and three parts to B, so AP to PB is 2 to 3.',
  caption: 'P divides AB internally in the ratio 2 : 3 (sketch, not to scale).',
});
const TR = [2, -1, 4], TP = [3, 1, 6], TS = [4, 1, 1];
must(triangleKind(TR, TP, TS).kind === 'right-angled' && dsq(TR, TP) === 9 && dsq(TR, TS) === 17 && dsq(TP, TS) === 26, 'triangle R P S is right-angled at R');
export const figTri = fig({
  pts: { R: { p: TR, label: L('R', TR), pos: 'w' }, P: { p: TP, label: L('P', TP), pos: 'n' }, S: { p: TS, label: L('S', TS), pos: 'e' } },
  segments: [{ from: 'R', to: 'P', label: 'RP² = 9' }, { from: 'R', to: 'S', label: 'RS² = 17' }, { from: 'P', to: 'S', label: 'PS² = 26' }],
  axes: [4, 3, 6],
  alt: 'A sketch of the axes with a triangle RPS in space. The squared side lengths are RP squared equal to 9, RS squared equal to 17 and PS squared equal to 26. Since 9 plus 17 is 26, the angle at R is a right angle.',
  caption: '9 + 17 = 26, so the angle at R is a right angle (sketch, not to scale).',
});

// ================================================================ tables
export const placesTable = T(['Where the point lies', 'Form of the point', 'Rule'], [
  ['Origin', '$(0, 0, 0)$', 'all three coordinates are $0$'],
  ['On the $x$-axis', '$(a, 0, 0)$', '$y = 0$ and $z = 0$'],
  ['On the $y$-axis', '$(0, b, 0)$', '$x = 0$ and $z = 0$'],
  ['On the $z$-axis', '$(0, 0, c)$', '$x = 0$ and $y = 0$'],
  ['In the $xy$-plane', '$(a, b, 0)$', '$z = 0$'],
  ['In the $yz$-plane', '$(0, b, c)$', '$x = 0$'],
  ['In the $zx$-plane', '$(a, 0, c)$', '$y = 0$'],
], 'Table of positions: the origin has all coordinates zero; a point on an axis has the other two coordinates zero; a point in a coordinate plane has the coordinate that names the missing axis equal to zero.', 'A zero coordinate puts the point on a plane; two zero coordinates put it on an axis.');
const WE1 = [[4, 0, 0], [0, -3, 5], [-2, 6, 0], [0, 0, -7], [3, -1, 4]];
const we1Where = WE1.map(where);
must(we1Where.join() === 'x-axis,yz-plane,xy-plane,z-axis,octant IV', 'WE1 positions');
export const we1Table = T(['Point', 'Zero coordinates', 'Position'], WE1.map((p, i) => {
  const zs = ['x', 'y', 'z'].filter((_, k) => p[k] === 0);
  return [P$(p), zs.length ? zs.map((z) => `$${z}$`).join(' and ') : 'none', we1Where[i].replace(/^(x|y|z|xy|yz|zx)-(axis|plane)$/, (m, a, b) => `$${a}$-${b}`)];
}), 'Table classifying five points. (4, 0, 0) lies on the x-axis; (0, -3, 5) in the yz-plane; (-2, 6, 0) in the xy-plane; (0, 0, -7) on the z-axis; and (3, -1, 4), with no zero coordinate, lies in octant IV.', 'Count the zero coordinates first.');
const signs = (p) => `(${p.map((v) => (v > 0 ? '+' : '−')).join(', ')})`;
const OCTEX = { 1: [3, 2, 1], 2: [-3, 2, 1], 3: [-3, -2, 1], 4: [3, -2, 1], 5: [3, 2, -1], 6: [-3, 2, -1], 7: [-3, -2, -1], 8: [3, -2, -1] };
for (const [n, p] of Object.entries(OCTEX)) must(octant(p) === Number(n), `octant example ${n}`);
export const octantTable = T(['Octant', 'Signs of $x, y, z$', 'Example'], Object.entries(OCTEX).map(([n, p]) => [ROMAN[n], signs(p), P$(p)]), 'Table of the eight octants with the signs of x, y and z and an example point in each. Octants I to IV lie above the xy-plane and V to VIII below it; I is (+, +, +), II is (-, +, +), III is (-, -, +) and IV is (+, -, +); V to VIII repeat these with z negative.', 'Octants I–IV have $z > 0$; octants V–VIII are the same four quadrants with $z < 0$.');
const WE2 = [[2, -3, 5], [-4, 1, -2], [-1, -6, 3], [5, 2, -8], [-7, -2, -9]];
export const we2Table = T(['Point', 'Signs of $x, y, z$', 'Octant'], WE2.map((p) => [P$(p), signs(p), ROMAN[octant(p)]]), 'Table naming the octant of five points from the signs of their coordinates: (2, -3, 5) is in octant IV, (-4, 1, -2) in VI, (-1, -6, 3) in III, (5, 2, -8) in V and (-7, -2, -9) in VII.', 'Read the three signs, then match them to the octant table.');
export const feetTable = T(['Plane or axis', 'Foot of $P(x, y, z)$', 'Distance from $P$'], [
  ['$xy$-plane', '$(x, y, 0)$', '$|z|$'],
  ['$yz$-plane', '$(0, y, z)$', '$|x|$'],
  ['$zx$-plane', '$(x, 0, z)$', '$|y|$'],
  ['$x$-axis', '$(x, 0, 0)$', r`$\sqrt{y^2 + z^2}$`],
  ['$y$-axis', '$(0, y, 0)$', r`$\sqrt{x^2 + z^2}$`],
  ['$z$-axis', '$(0, 0, z)$', r`$\sqrt{x^2 + y^2}$`],
], 'Table of feet of perpendiculars: on a coordinate plane you replace the matching coordinate by zero and the distance is its absolute value; on an axis you keep one coordinate and the distance is the square root of the sum of the squares of the other two.', 'The image in a coordinate plane changes the sign of the same coordinate.');
const WE3 = [5, -4, 7];
const w3 = { xy: footPlane(WE3, 'xy'), yz: footPlane(WE3, 'yz'), zx: footPlane(WE3, 'zx'), x: footAxis(WE3, 'x') };
must(w3.xy.join() === '5,-4,0' && w3.yz.join() === '0,-4,7' && w3.zx.join() === '5,0,7' && w3.x.join() === '5,0,0', 'WE3 feet');
export const we3Table = T(['Question', 'Working', 'Answer'], [
  ['Foot on the $xy$-plane', 'replace $z$ by $0$', P$(w3.xy)],
  ['Distance from the $xy$-plane', '$|z| = |7|$', '$7$'],
  ['Foot on the $yz$-plane', 'replace $x$ by $0$', P$(w3.yz)],
  ['Distance from the $zx$-plane', '$|y| = |-4|$', '$4$'],
  ['Image in the $xy$-plane', 'change the sign of $z$', P$(reflectPlane(WE3, 'xy'))],
  ['Image in the $yz$-plane', 'change the sign of $x$', P$(reflectPlane(WE3, 'yz'))],
  ['Distance from the $x$-axis', r`$\sqrt{(-4)^2 + 7^2} = \sqrt{${dsqAxis(WE3, 'x')}}$`, `$${sqTex(dsqAxis(WE3, 'x'))}$`],
], 'Table of worked answers for P(5, -4, 7): the foot on the xy-plane is (5, -4, 0) at distance 7; the foot on the yz-plane is (0, -4, 7); the distance from the zx-plane is 4; the images are (5, -4, -7) and (-5, -4, 7); the distance from the x-axis is the square root of 65.', 'Plane: change one coordinate. Axis: keep one coordinate.');
must(dsqAxis(WE3, 'x') === 65 && reflectPlane(WE3, 'xy').join() === '5,-4,-7' && reflectPlane(WE3, 'yz').join() === '-5,-4,7', 'WE3 images and axis distance');

// ---- deck 2
const D4A = [-1, 2, 3], D4B = [3, -2, 1];
must(dsq(D4A, D4B) === 36 && dsq([0, 0, 0], D4A) === 14, 'WE4 distances');
export const distFormulaTable = T(['Distance', 'Formula'], [
  ['$AB$, with $A(x_1, y_1, z_1)$ and $B(x_2, y_2, z_2)$', r`$\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2 + (z_2 - z_1)^2}$`],
  ['$OP$, from the origin to $P(x, y, z)$', r`$\sqrt{x^2 + y^2 + z^2}$`],
  ['$AB^2$', r`$(x_2 - x_1)^2 + (y_2 - y_1)^2 + (z_2 - z_1)^2$ (no square root)`],
], 'Table of distance formulas: the distance between two points is the square root of the sum of the squares of the three coordinate differences; from the origin it is the square root of x squared plus y squared plus z squared.', 'Square first, add, and take the square root last.');
export const we4Table = T(['Step', 'Working'], [
  ['Differences', `$x_2 - x_1 = ${D4B[0] - D4A[0]}$, $y_2 - y_1 = ${D4B[1] - D4A[1]}$, $z_2 - z_1 = ${D4B[2] - D4A[2]}$`],
  ['Squares added', `$AB^2 = ${diffSq(D4A, D4B)} = ${sqTerms(D4A, D4B)} = ${dsq(D4A, D4B)}$`],
  ['Distance $AB$', `$AB = ${dTex(D4A, D4B)}$`],
  ['Distance $OA$', `$OA = \\sqrt{(-1)^2 + 2^2 + 3^2} = \\sqrt{${dsq([0, 0, 0], D4A)}}$, which stays as $${dTex([0, 0, 0], D4A)}$`],
], 'Table for the worked example: the distance between A, at minus 1, 2, 3, and B, at 3, minus 2, 1, uses the differences 4, minus 4 and minus 2, whose squares 16, 16 and 4 add to 36, so AB is 6. The distance of A from the origin is the square root of 14.', 'Leave a non-perfect square as a surd.');
const W5 = [[-2, 1, 0], [-1, 1, 3], [1, 1, 9]];
must(collinear(...W5) && sumOfRoots(dsq(W5[0], W5[1]), dsq(W5[1], W5[2]), dsq(W5[0], W5[2])) && dsq(W5[0], W5[1]) === 10 && dsq(W5[1], W5[2]) === 40 && dsq(W5[0], W5[2]) === 90, 'WE5 collinear');
export const we5Table = T(['Side', 'Squared length', 'Length'], [
  ['$PQ$', `$${sqTerms(W5[0], W5[1])} = ${dsq(W5[0], W5[1])}$`, `$${dTex(W5[0], W5[1])}$`],
  ['$QR$', `$${sqTerms(W5[1], W5[2])} = ${dsq(W5[1], W5[2])}$`, `$${dTex(W5[1], W5[2])}$`],
  ['$PR$', `$${sqTerms(W5[0], W5[2])} = ${dsq(W5[0], W5[2])}$`, `$${dTex(W5[0], W5[2])}$`],
  ['Test', r`$PQ + QR = \sqrt{10} + 2\sqrt{10} = 3\sqrt{10} = PR$`, 'collinear'],
], 'Table for the collinearity test of P, minus 2, 1, 0, Q, minus 1, 1, 3 and R, 1, 1, 9. The lengths are PQ equal to root 10, QR equal to 2 root 10 and PR equal to 3 root 10. Since PQ plus QR equals PR, the three points lie on one straight line.', 'Add the two shorter lengths and compare with the longest.');
export const we6Table = T(['Side', 'Squared length'], [
  ['$RP$', `$${sqTerms(TR, TP)} = ${dsq(TR, TP)}$`],
  ['$RS$', `$${sqTerms(TR, TS)} = ${dsq(TR, TS)}$`],
  ['$PS$', `$${sqTerms(TP, TS)} = ${dsq(TP, TS)}$`],
  ['Test', `$${dsq(TR, TP)} + ${dsq(TR, TS)} = ${dsq(TP, TS)}$, so $RP^2 + RS^2 = PS^2$`],
  ['Conclusion', 'right angle at $R$; the sides $3$, $\\sqrt{17}$, $\\sqrt{26}$ are all different, so the triangle is scalene'],
], 'Table showing the triangle with R at 2, minus 1, 4, P at 3, 1, 6 and S at 4, 1, 1 has squared sides 9, 17 and 26. Since 9 plus 17 equals 26, it is right angled at R, and it is scalene because the three sides differ.', 'The largest squared side must equal the sum of the other two.');
const EA = [2, 7, 1], EB = [1, 2, 3];
function equidAxis(A, B, k) {
  const t = Rat.of(dsq([0, 0, 0], A) - dsq([0, 0, 0], B)).div(2 * (A[k] - B[k]));
  const Pn = [0, 0, 0].map((_, i) => (i === k ? t : Rat.of(0)));
  const dA = A.reduce((s, a, i) => s.add(Pn[i].sub(a).pow(2)), Rat.of(0)), dB = B.reduce((s, b, i) => s.add(Pn[i].sub(b).pow(2)), Rat.of(0));
  must(dA.eq(dB), 'equidistant point has PA = PB');
  return { t, PA2: dA };
}
export { equidAxis };
const E7 = equidAxis(EA, EB, 1);
must(E7.t.eq(4) && E7.PA2.eq(14), 'WE7 point (0, 4, 0)');
export const we7Table = T(['Step', 'Working'], [
  ['Point', r`$P(0, y, 0)$ on the $y$-axis; $PA = PB$ means $PA^2 = PB^2$`],
  ['Squares', `$(0 - 2)^2 + (y - 7)^2 + (0 - 1)^2 = (0 - 1)^2 + (y - 2)^2 + (0 - 3)^2$`],
  ['Expand', `$y^2 - 14y + ${dsq([0, 0, 0], EA)} = y^2 - 4y + ${dsq([0, 0, 0], EB)}$`],
  ['Solve', `$-10y = -40$, so $y = ${E7.t.tex()}$, $P(0, 4, 0)$`],
  ['Check', `$PA^2 = 4 + 9 + 1 = ${E7.PA2.tex()}$ and $PB^2 = 1 + 4 + 9 = 14$`],
], 'Table for the worked example: for a point P at 0, y, 0 on the y-axis equidistant from A at 2, 7, 1 and B at 1, 2, 3, equating the squared distances gives y squared minus 14 y plus 54 equal to y squared minus 4 y plus 14, so y is 4 and the point is 0, 4, 0.', 'Equal distances mean equal squared distances.');
export const sectFormulaTable = T(['Result', 'Formula'], [
  [r`$P$ divides $AB$ internally in the ratio $m : n$ ($AP : PB = m : n$)`, r`$P\left(\dfrac{mx_2 + nx_1}{m + n},\ \dfrac{my_2 + ny_1}{m + n},\ \dfrac{mz_2 + nz_1}{m + n}\right)$`],
  ['Mid-point of $AB$ ($m = n = 1$)', r`$\left(\dfrac{x_1 + x_2}{2},\ \dfrac{y_1 + y_2}{2},\ \dfrac{z_1 + z_2}{2}\right)$`],
  ['Centroid of a triangle with vertices $(x_i, y_i, z_i)$', r`$\left(\dfrac{x_1 + x_2 + x_3}{3},\ \dfrac{y_1 + y_2 + y_3}{3},\ \dfrac{z_1 + z_2 + z_3}{3}\right)$`],
], 'Table of formulas: the internal section formula gives each coordinate as m times the second plus n times the first, over m plus n; the midpoint is the average; the centroid is the average of the three vertices.', 'The ratio multiplies the opposite end: m goes with B, n goes with A.');
const S8 = sect(SA, SB, 2, 3), M8 = mid(SA, SB);
must(M8.map((v) => v.tex()).join() === '2,-\\dfrac{1}{2},\\dfrac{7}{2}', 'WE8 midpoint');
export const we8Table = T(['Step', 'Working'], [
  ['Ratio', '$AP : PB = 2 : 3$, so $m = 2$ and $n = 3$, $m + n = 5$'],
  ['$x$', `$\\dfrac{2(${SB[0]}) + 3(${SA[0]})}{5} = \\dfrac{${2 * SB[0] + 3 * SA[0]}}{5} = ${S8[0].tex()}$`],
  ['$y$', `$\\dfrac{2(${SB[1]}) + 3(${SA[1]})}{5} = \\dfrac{${2 * SB[1] + 3 * SA[1]}}{5} = ${S8[1].tex()}$`],
  ['$z$', `$\\dfrac{2(${SB[2]}) + 3(${SA[2]})}{5} = \\dfrac{${2 * SB[2] + 3 * SA[2]}}{5} = ${S8[2].tex()}$`],
  ['Point $P$', `$${pt(S8)}$, which lies in the $zx$-plane`],
  ['Mid-point $M$', `$${pt(M8)}$`],
], 'Table for the worked example: with A at minus 3, 2, 1 and B at 7, minus 3, 6 and the ratio 2 to 3, the coordinates of P are 1, 0 and 3. The midpoint of AB is 2, minus one half, seven halves.', 'Substitute with the signs of the coordinates, then divide by $m + n$.');
const W9A = [2, -3, 4], W9B = [-4, 3, -2], W9 = planeRatio(W9A, W9B, 2), W9P = sect(W9A, W9B, 2, 1);
must(W9.m === -4 && W9.n === -2 && W9.valid && ratioTex(W9.m, W9.n) === '2 : 1' && W9P.join() === '-2,1,0', 'WE9 plane crossing');
export const we9Table = T(['Step', 'Working'], [
  ['Idea', 'Every point of the $xy$-plane has $z = 0$; suppose it divides $AB$ in the ratio $k : 1$'],
  ['Equation', `$\\dfrac{k(${W9B[2]}) + ${W9A[2]}}{k + 1} = 0$, so $-2k + 4 = 0$ and $k = 2$`],
  ['Ratio', 'the $xy$-plane divides $AB$ internally in the ratio $2 : 1$'],
  ['Point', `$x = \\dfrac{2(${W9B[0]}) + ${W9A[0]}}{3} = ${W9P[0].tex()}$, $y = \\dfrac{2(${W9B[1]}) + (${W9A[1]})}{3} = ${W9P[1].tex()}$; the point is $${pt(W9P)}$`],
], 'Table for the worked example: the segment from A, at 2, minus 3, 4, to B, at minus 4, 3, minus 2, meets the xy-plane where z is zero. Solving gives the ratio 2 to 1 and the point minus 2, 1, 0.', 'Put the coordinate that is zero in the plane equal to $0$ and solve for the ratio.');
export const centroidTable = (() => {
  const V = [[6, -3, 4], [-2, 5, 1], [2, 1, -2]], G = centroid(...V);
  must(G.join() === '2,1,1', 'centroid example');
  return T(['Quantity', 'Working'], [
    ['Vertices', `$A${pt(V[0])}$, $B${pt(V[1])}$, $C${pt(V[2])}$`],
    ['Centroid $G$', `$\\left(\\dfrac{6 - 2 + 2}{3},\\ \\dfrac{-3 + 5 + 1}{3},\\ \\dfrac{4 + 1 - 2}{3}\\right) = ${pt(G)}$`],
    ['Check', `the mid-point of $BC$ is $D${pt(mid(V[1], V[2]))}$, and $G$ divides $AD$ in the ratio $2 : 1$`],
  ], 'Table: the centroid of the triangle with vertices at 6, minus 3, 4, at minus 2, 5, 1 and at 2, 1, minus 2 is the average of the coordinates, 2, 1, 1. It also divides the median from the first vertex in the ratio 2 to 1.', 'The centroid is the average of the three vertices.');
})();

// ---- summaries and strategy
export const summary1 = T(['Idea', 'Rule'], [
  ['Axes and planes', 'three perpendicular axes; the $xy$-, $yz$- and $zx$-planes cut space into $8$ octants'],
  ['Coordinates', '$(x, y, z)$: signed distances from the $yz$-, $zx$- and $xy$-planes'],
  ['Zero coordinates', 'one zero: on a plane; two zeros: on an axis; three: the origin'],
  ['Octants', 'signs $(+, +, +)$ is octant I; octants I–IV above the $xy$-plane, V–VIII below'],
  ['Feet and images', 'plane: change one coordinate (to $0$ for the foot, to its negative for the image); axis: keep one coordinate'],
], 'Summary table of coordinates in three dimensions: axes and planes, coordinates as signed distances, zero coordinates, octants by sign pattern, and feet and images in planes and axes.', 'Signs decide the octant; zeros decide the plane or axis.');
export const summary2 = T(['Idea', 'Rule'], [
  ['Distance', r`$AB = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2 + (z_2 - z_1)^2}$; $OP = \sqrt{x^2 + y^2 + z^2}$`],
  ['Collinear', 'the longest of three distances equals the sum of the other two'],
  ['Triangles', 'compare squared sides: equal sides give isosceles or equilateral; $a^2 + b^2 = c^2$ gives a right angle'],
  ['Equidistant', 'equate squared distances; a point on an axis has one unknown'],
  ['Section formula', r`$P = \dfrac{m\vec{B} + n\vec{A}}{m + n}$ coordinate by coordinate; mid-point $m = n$; centroid: average of three vertices`],
], 'Summary table of distance and section ideas: the distance formula, collinearity by adding distances, triangle types by squared sides, equidistant points by equating squares, and the section formula with its mid-point and centroid cases.', 'Use squared distances for tests, and take the root at the end.');
export const strategyTable = T(['You are asked', 'Do this'], [
  ['Where does a point lie?', 'count zero coordinates, then read the signs'],
  ['A foot, image or distance from a plane or axis', 'use the table of feet: change or keep coordinates'],
  ['A distance', 'differences, squares, add, root; keep surds exact'],
  ['Collinear points', 'add the two smaller distances and compare with the largest'],
  ['Type of triangle or quadrilateral', 'squared sides, then diagonals or the mid-point test'],
  ['A point dividing a segment', 'section formula; ratio from a plane: put the coordinate $= 0$'],
], 'Table of strategies for three-dimensional coordinate geometry: for position count zeros and read signs; for feet and images use the table; for distance square, add and root; for collinear points add distances; for triangles compare squared sides; for division use the section formula.', 'Start by deciding which of the three jobs the question is.');
export const flowPlan = flow('LR', [['a', 'Plot or read the point'], ['b', 'Octant, plane or axis'], ['c', 'Distance or foot'], ['d', 'Divide or test']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow chart of the chapter: first read or plot the point, then say which octant, plane or axis it lies on, then find distances or feet, then divide a segment or test collinearity and triangle type.', 'The chapter in four steps.');
export const octCompare = T(['Region', 'Description'], [
  ['Origin', 'the point $O(0, 0, 0)$ belongs to no octant'],
  ['Axes', 'a point on an axis belongs to no octant'],
  ['Coordinate planes', 'a point in a plane belongs to no octant'],
  ['Octants', 'open regions with all three coordinates non-zero'],
], 'Table of which points belong to octants: the origin, points on the axes and points on the coordinate planes belong to no octant; only points with all three coordinates non-zero lie inside an octant.', 'Octants are the open regions between the planes.');
export const collRule = T(['Question', 'Test using distances'], [
  ['Are $A$, $B$, $C$ on one straight line?', 'find $AB$, $BC$, $CA$; the longest must equal the sum of the other two'],
  ['Which point lies between the others?', 'the point common to the two shorter distances'],
  ['Exact comparison with surds', 'write each length as a multiple of one surd, for example $\\sqrt{10}$, $2\\sqrt{10}$, $3\\sqrt{10}$'],
], 'Table for testing collinearity: find the three distances; the longest must equal the sum of the other two; the point common to the two shorter distances lies between the others; write lengths as multiples of one surd to compare exactly.', 'If no distance equals the sum of the other two, the points form a triangle.');
export const triTests = T(['Triangle', 'Test on the squared sides'], [
  ['Isosceles', 'two squared sides are equal'],
  ['Equilateral', 'all three squared sides are equal'],
  ['Right-angled', 'the largest squared side equals the sum of the other two'],
  ['Isosceles right-angled', 'two squared sides equal $a^2$ and the third is $2a^2$'],
  ['Scalene', 'all three squared sides differ'],
], 'Table of triangle tests using squared side lengths: isosceles has two equal, equilateral has three equal, right-angled has the largest equal to the sum of the other two, isosceles right-angled has two equal and the third double, scalene has all different.', 'Compare squared sides; no square roots are needed.');
export const quadTests = T(['Quadrilateral $ABCD$', 'Tests'], [
  ['Parallelogram', 'the diagonals $AC$ and $BD$ have the same mid-point'],
  ['Rhombus', 'a parallelogram with $AB = BC$'],
  ['Rectangle', 'a parallelogram with $AC = BD$'],
  ['Square', 'a parallelogram with $AB = BC$ and $AC = BD$'],
], 'Table of tests for a quadrilateral: equal diagonal mid-points give a parallelogram; add equal adjacent sides for a rhombus, equal diagonals for a rectangle, and both for a square.', 'Mid-point test first, then lengths.');
