// CBSE 11 Mathematics ch11 Introduction to Three-dimensional Geometry — written items: short (2 and 3 marks), long (5 marks) and case-based.
// Every number in a key, a solution or a model answer is computed by space.mjs and compared in the re-solve check.
import { Q, caseQ, child, mk } from './lib.mjs';
import { Rat, r, must, pt, dsq, sqTex, dTex, dNum, octant, ROMAN, where, footPlane, footAxis, reflectPlane, reflectAxis, reflectOrigin, sect, mid, centroid, planeRatio, ratioTex, collinear, sumOfRoots, triangleKind, cross, vminus, N } from './space.mjs';

const R = (v) => Rat.of(v);
const eqArr = (p, q2) => p.length === q2.length && p.every((v, i) => R(v).eq(q2[i]));

// =============================================================== short answer, 2 marks
{
  const Qp = [-5, 2, -8], f1 = footPlane(Qp, 'xy'), f2 = footAxis(Qp, 'y');
  Q('s201', mk.short({ marks: 2, stem: r`Write down the foot of the perpendicular from $Q(-5, 2, -8)$ on (i) the $xy$-plane and (ii) the $y$-axis.`, model: r`(i) On the $xy$-plane $z = 0$, so the foot keeps $x$ and $y$: $${pt(f1)}$.\n\n(ii) On the $y$-axis $x = 0$ and $z = 0$, so the foot keeps only $y$: $${pt(f2)}$.`, sol: 'Plane: replace one coordinate by zero. Axis: keep one coordinate.', scheme: [['(i) foot (-5, 2, 0)', 1], ['(ii) foot (0, 2, 0)', 1]], d: 2, c: 'understanding', t: [1], time: 75 }), (Cx) => { Cx.assert(f1.join() === '-5,2,0' && f2.join() === '0,2,0', 'feet'); Cx.model(['(-5, 2, 0)'.replace(/\s/g, ''), 2].filter((x) => typeof x === 'number')); });
}
{
  const P = [3, -4, 6], a = reflectPlane(P, 'yz'), b = reflectAxis(P, 'z');
  Q('s202', mk.short({ marks: 2, stem: r`Find the image of the point $P(3, -4, 6)$ (i) in the $yz$-plane and (ii) in the $z$-axis.`, model: r`(i) Reflection in the $yz$-plane changes the sign of $x$ only: $${pt(a)}$.\n\n(ii) Reflection in the $z$-axis keeps $z$ and changes the signs of $x$ and $y$: $${pt(b)}$.`, sol: 'Decide which coordinates change sign.', scheme: [['(i) image (-3, -4, 6)', 1], ['(ii) image (-3, 4, 6)', 1]], d: 2, c: 'understanding', t: [1], time: 75 }), (Cx) => { Cx.assert(a.join() === '-3,-4,6' && b.join() === '-3,4,6' && !eqArr(reflectOrigin(P), b), 'images'); Cx.model([3, 4, 6]); });
}
{
  const A = [2, -5, 3], B = [-1, -1, -4];
  Q('s203', mk.short({ marks: 2, stem: r`Name the octant in which each of the points $A(2, -5, 3)$ and $B(-1, -1, -4)$ lies, giving the signs of its coordinates.`, model: r`$A$ has signs $(+, -, +)$, which is **octant ${ROMAN[octant(A)]}**.\n\n$B$ has signs $(-, -, -)$, which is **octant ${ROMAN[octant(B)]}**.`, sol: 'Write the three signs, then match the octant table.', scheme: [['A: signs (+, -, +), octant IV', 1], ['B: signs (-, -, -), octant VII', 1]], d: 2, c: 'understanding', t: [1], time: 60 }), (Cx) => { Cx.assert(octant(A) === 4 && octant(B) === 7, 'IV and VII'); Cx.model(['IV', 'VII']); });
}
{
  const ys = Array.from({ length: 41 }, (_, i) => i - 20).filter((y) => dsq([0, 0, 0], [3, y, 0]) === 25);
  Q('s204', mk.short({ marks: 2, stem: r`A point $R$ lies in the $xy$-plane, has $x$-coordinate $3$ and a negative $y$-coordinate, and is $5$ units from the origin. Find the coordinates of $R$.`, model: r`In the $xy$-plane $z = 0$, so $R = (3, y, 0)$ and $OR^2 = 9 + y^2 = 25$. Then $y^2 = 16$, and since $y$ is negative $y = -4$. So $R = (3, -4, 0)$.`, sol: 'Use z = 0 and the distance from the origin.', scheme: [['z = 0 and 9 + y^2 = 25', 1], ['y = -4, so R = (3, -4, 0)', 1]], d: 3, c: 'application', t: [1, 2], time: 90 }), (Cx) => { Cx.assert(ys.join() === '-4,4' && where([3, -4, 0]) === 'xy-plane', 'y = -4'); Cx.model([9, 25, 16, 4]); });
}
{
  const A = [5, -2, 1], B = [-1, 2, 13];
  Q('s205', mk.short({ marks: 2, stem: r`Find the distance between the points $A(5, -2, 1)$ and $B(-1, 2, 13)$.`, model: r`$AB^2 = (-1 - 5)^2 + (2 + 2)^2 + (13 - 1)^2 = 36 + 16 + 144 = ${dsq(A, B)}$, so $AB = \sqrt{196} = ${dTex(A, B)}$ units.`, sol: 'Differences, squares, add, root.', scheme: [['Sum of squares 36 + 16 + 144 = 196', 1], ['AB = 14', 1]], d: 2, c: 'understanding', t: [2], time: 75 }), (Cx) => { Cx.assert(dsq(A, B) === 196 && dTex(A, B) === '14', 'AB = 14'); Cx.model([36, 16, 144, 196, 14]); });
}
{
  const A = [1, 3, -2], B = [4, 1, 0], C = [6, 2, 5], D = [3, 4, 3], M1 = mid(A, C), M2 = mid(B, D);
  Q('s206', mk.short({ marks: 2, stem: r`The points $A(1, 3, -2)$, $B(4, 1, 0)$, $C(6, 2, 5)$ and $D(3, 4, 3)$ are taken in order. Show that the diagonals $AC$ and $BD$ of $ABCD$ have the same mid-point, and say what this tells you about $ABCD$.`, model: r`The mid-point of $AC$ is $\left(\dfrac{1 + 6}{2}, \dfrac{3 + 2}{2}, \dfrac{-2 + 5}{2}\right) = ${pt(M1)}$.\n\nThe mid-point of $BD$ is $\left(\dfrac{4 + 3}{2}, \dfrac{1 + 4}{2}, \dfrac{0 + 3}{2}\right) = ${pt(M2)}$.\n\nThe diagonals bisect each other, so $ABCD$ is a parallelogram.`, sol: 'Compare the two mid-points.', scheme: [['Both mid-points computed', 1], ['Equal mid-points, so a parallelogram', 1]], d: 3, c: 'application', t: [3], time: 105 }), (Cx) => { Cx.assert(eqArr(M1, M2) && M1.map(String).join() === '7/2,5/2,3/2' && eqArr(vminus(A, B), vminus(D, C)), 'common mid-point (7/2, 5/2, 3/2); AB = DC'); Cx.model([7, 2, 5, 3]); });
}
{
  const E = [4, 4, 7];
  Q('s207', mk.short({ marks: 2, stem: r`A cuboid has one vertex at the origin and its edges, of lengths $4$, $4$ and $7$, lie along the positive $x$-, $y$- and $z$-axes. Find the coordinates of the vertex opposite the origin and the length of the diagonal joining the two.`, model: r`The opposite vertex is $(4, 4, 7)$. The diagonal has length $\sqrt{4^2 + 4^2 + 7^2} = \sqrt{16 + 16 + 49} = \sqrt{${dsq([0, 0, 0], E)}} = ${dTex([0, 0, 0], E)}$ units.`, sol: 'The opposite vertex has the three edge lengths as coordinates.', scheme: [['Vertex (4, 4, 7)', 1], ['Diagonal 9', 1]], d: 2, c: 'application', t: [1, 2], time: 75 }), (Cx) => { Cx.assert(dsq([0, 0, 0], E) === 81 && dTex([0, 0, 0], E) === '9', 'diagonal 9'); Cx.model([4, 7, 81, 9]); });
}
{
  const A = [1, 4, 2], B = [-1, 2, 2], P = [3, 0, 0];
  Q('s208', mk.short({ marks: 2, stem: r`Find the point on the $x$-axis that is equally far from $A(1, 4, 2)$ and $B(-1, 2, 2)$, and give that common distance.`, model: r`Let the point be $P(x, 0, 0)$. $PA^2 = (x - 1)^2 + 16 + 4$ and $PB^2 = (x + 1)^2 + 4 + 4$. Equating, $x^2 - 2x + 21 = x^2 + 2x + 9$, so $4x = 12$ and $x = 3$. So $P(3, 0, 0)$ and $PA^2 = 4 + 16 + 4 = ${dsq(P, A)}$, giving $PA = ${dTex(P, A)}$.`, sol: 'Equal distances mean equal squared distances.', scheme: [['Equation 21 - 2x = 9 + 2x', 1], ['P(3, 0, 0), distance 2 sqrt(6)', 1]], d: 3, c: 'application', t: [2], time: 105 }), (Cx) => { Cx.assert(dsq(P, A) === 24 && dsq(P, B) === 24 && dTex(P, A) === '2\\sqrt{6}', 'P(3, 0, 0), PA = 2 sqrt 6'); Cx.model([21, 9, 12, 3, 24]); });
}
{
  const A = [-4, 2, 7], B = [5, -1, -2], P = sect(A, B, 2, 1);
  Q('s209', mk.short({ marks: 2, stem: r`The point $P$ divides the segment joining $A(-4, 2, 7)$ and $B(5, -1, -2)$ internally in the ratio $2 : 1$. Find the coordinates of $P$.`, model: r`With $m = 2$ and $n = 1$: $x = \dfrac{2(5) + 1(-4)}{3} = 2$, $y = \dfrac{2(-1) + 1(2)}{3} = 0$, $z = \dfrac{2(-2) + 1(7)}{3} = 1$. So $P = ${pt(P)}$.`, sol: 'Apply the section formula to each coordinate.', scheme: [['Section formula with m = 2, n = 1', 1], ['P = (2, 0, 1)', 1]], d: 2, c: 'understanding', t: [3], time: 90 }), (Cx) => { Cx.assert(P.join() === '2,0,1', 'P = (2, 0, 1)'); Cx.model([2, 0, 1, 3]); });
}

// =============================================================== short answer, 3 marks
{
  const P = [-4, 3, 12], dz = Math.sqrt(P[0] ** 2 + P[1] ** 2);
  Q('s301', mk.short({ marks: 3, stem: r`For the point $P(-4, 3, 12)$ find (i) its distances from the $yz$-, $zx$- and $xy$-planes, (ii) its distance from the $z$-axis, and (iii) its distance from the origin.`, model: r`(i) The distances are $|x| = 4$ from the $yz$-plane, $|y| = 3$ from the $zx$-plane and $|z| = 12$ from the $xy$-plane.\n\n(ii) The foot on the $z$-axis is $(0, 0, 12)$, so the distance is $\sqrt{(-4)^2 + 3^2} = \sqrt{25} = 5$.\n\n(iii) $OP = \sqrt{16 + 9 + 144} = \sqrt{169} = 13$.`, sol: 'Planes: absolute coordinate. Axis: two coordinates under a root.', scheme: [['(i) 4, 3 and 12', 1], ['(ii) distance from the z-axis 5', 1], ['(iii) OP = 13', 1]], d: 3, c: 'understanding', t: [1, 2], time: 120 }), (Cx) => { Cx.assert(dz === 5 && dsq([0, 0, 0], P) === 169 && footAxis(P, 'z').join() === '0,0,12', 'distances 4, 3, 12, 5, 13'); Cx.model([4, 3, 12, 5, 13]); });
}
{
  const P = [-3, 5, -2], i1 = reflectPlane(P, 'xy'), i2 = reflectPlane(P, 'yz');
  Q('s302', mk.short({ marks: 3, stem: r`Name the octant of $P(-3, 5, -2)$, of its image in the $xy$-plane and of its image in the $yz$-plane.`, model: r`$P(-3, 5, -2)$ has signs $(-, +, -)$: octant ${ROMAN[octant(P)]}.\n\nThe image in the $xy$-plane changes the sign of $z$: $${pt(i1)}$, signs $(-, +, +)$, octant ${ROMAN[octant(i1)]}.\n\nThe image in the $yz$-plane changes the sign of $x$: $${pt(i2)}$, signs $(+, +, -)$, octant ${ROMAN[octant(i2)]}.`, sol: 'Reflect first, then read the signs.', scheme: [['P in octant VI', 1], ['Image (-3, 5, 2) in octant II', 1], ['Image (3, 5, -2) in octant V', 1]], d: 3, c: 'application', t: [1], time: 105 }), (Cx) => { Cx.assert(octant(P) === 6 && i1.join() === '-3,5,2' && octant(i1) === 2 && i2.join() === '3,5,-2' && octant(i2) === 5, 'VI, II, V'); Cx.model(['VI', 'II', 'V']); });
}
{
  const A = [0, -2, 3], B = [1, -1, 5], C = [3, 1, 9], a = dsq(A, B), b = dsq(B, C), c = dsq(A, C);
  Q('s303', mk.short({ marks: 3, stem: r`Use the distance formula to show that the points $A(0, -2, 3)$, $B(1, -1, 5)$ and $C(3, 1, 9)$ lie on one straight line.`, model: r`$AB^2 = 1 + 1 + 4 = ${a}$, so $AB = ${sqTex(a)}$. $BC^2 = 4 + 4 + 16 = ${b}$, so $BC = ${sqTex(b)}$. $AC^2 = 9 + 9 + 36 = ${c}$, so $AC = ${sqTex(c)}$.\n\nSince $AB + BC = \sqrt{6} + 2\sqrt{6} = 3\sqrt{6} = AC$, the points are collinear, with $B$ between $A$ and $C$.`, sol: 'Add the two shorter distances and compare with the longest.', scheme: [['AB = sqrt 6, BC = 2 sqrt 6', 1], ['AC = 3 sqrt 6', 1], ['AB + BC = AC, so collinear', 1]], d: 3, c: 'application', t: [2], time: 120 }), (Cx) => { Cx.assert(a === 6 && b === 24 && c === 54 && sumOfRoots(a, b, c) && collinear(A, B, C), 'collinear, sqrt6 + 2 sqrt6 = 3 sqrt6'); Cx.model([6, 24, 54]); });
}
{
  const A = [5, 2, 1], B = [1, 6, 1], C = [1, 2, 5], tk = triangleKind(A, B, C);
  Q('s304', mk.short({ marks: 3, stem: r`Show that the points $A(5, 2, 1)$, $B(1, 6, 1)$ and $C(1, 2, 5)$ are the vertices of an equilateral triangle, and find its perimeter.`, model: r`$AB^2 = 16 + 16 + 0 = ${tk.sides[0]}$, $BC^2 = 0 + 16 + 16 = ${tk.sides[1]}$ and $CA^2 = 16 + 0 + 16 = ${tk.sides[2]}$.\n\nAll three sides equal $\sqrt{32} = ${sqTex(32)}$, so the triangle is equilateral. Its perimeter is $3 \times 4\sqrt{2} = 12\sqrt{2}$ units.`, sol: 'Equal squared sides prove equal sides.', scheme: [['Squared sides all 32', 1.5], ['Equilateral', 0.5], ['Perimeter 12 sqrt(2)', 1]], d: 3, c: 'application', t: [2], time: 120 }), (Cx) => { Cx.assert(tk.sides.join() === '32,32,32' && tk.equi && sqTex(32) === '4\\sqrt{2}', 'equilateral, side 4 sqrt 2'); Cx.model([32, 12]); });
}
{
  const A = [3, 3, 5], B = [2, 1, 3], C = [4, 2, 1], tk = triangleKind(A, B, C);
  Q('s305', mk.short({ marks: 3, stem: r`Show that the triangle with vertices $A(3, 3, 5)$, $B(2, 1, 3)$ and $C(4, 2, 1)$ is right-angled and isosceles, and name the vertex of the right angle.`, model: r`$AB^2 = 1 + 4 + 4 = ${dsq(A, B)}$, $BC^2 = 4 + 1 + 4 = ${dsq(B, C)}$ and $CA^2 = 1 + 1 + 16 = ${dsq(C, A)}$.\n\n$AB = BC = 3$, so the triangle is isosceles. Also $AB^2 + BC^2 = 9 + 9 = 18 = CA^2$, so the angle is a right angle at $B$, the vertex opposite the longest side $CA$.`, sol: 'Compare the largest squared side with the sum of the other two.', scheme: [['Squared sides 9, 9, 18', 1], ['AB = BC, isosceles', 1], ['9 + 9 = 18, right angle at B', 1]], d: 3, c: 'application', t: [2], time: 120 }), (Cx) => { Cx.assert(tk.sides.join() === '9,9,18' && tk.kind === 'isosceles right-angled', 'isosceles right at B'); Cx.model([9, 18]); });
}
{
  const A = [-1, 0, 2], B = [3, 4, -2];
  const holds = (p) => dsq(p, A) === dsq(p, B), onPlane = (p) => p[0] + p[1] - p[2] === 3;
  let ok = true;
  for (let x = -5; x <= 6; x++) for (let y = -5; y <= 6; y++) for (let z = -5; z <= 6; z++) if (holds([x, y, z]) !== onPlane([x, y, z])) ok = false;
  Q('s306', mk.short({ marks: 3, stem: r`A point $P(x, y, z)$ moves so that it is always equally far from $A(-1, 0, 2)$ and $B(3, 4, -2)$. Find the relation between $x$, $y$ and $z$ that $P$ must satisfy.`, model: r`$PA^2 = (x + 1)^2 + y^2 + (z - 2)^2 = x^2 + y^2 + z^2 + 2x - 4z + 5$ and $PB^2 = (x - 3)^2 + (y - 4)^2 + (z + 2)^2 = x^2 + y^2 + z^2 - 6x - 8y + 4z + 29$.\n\nSetting $PA^2 = PB^2$: $2x - 4z + 5 = -6x - 8y + 4z + 29$, so $8x + 8y - 8z = 24$, that is **$x + y - z = 3$**. This is the plane through the mid-point $(1, 2, 0)$ of $AB$ perpendicular to $AB$.`, sol: 'Equate the squared distances; the squares of x, y and z cancel.', scheme: [['PA^2 and PB^2 expanded', 1], ['Equated: 8x + 8y - 8z = 24', 1], ['x + y - z = 3', 1]], d: 4, c: 'analysis', t: [2], time: 150 }), (Cx) => { Cx.assert(ok && onPlane(mid(A, B).map(N)), 'x + y - z = 3 exactly when PA = PB (checked on 1728 integer points)'); Cx.model([5, 29, 24, 3]); });
}
{
  const A = [5, -3, 2], B = [-4, 6, 8], pr = planeRatio(A, B, 1), P = sect(A, B, 1, 2);
  Q('s307', mk.short({ marks: 3, stem: r`The $zx$-plane cuts the segment joining $A(5, -3, 2)$ and $B(-4, 6, 8)$ at a point $P$. Find the ratio $AP : PB$ and the coordinates of $P$.`, model: r`On the $zx$-plane $y = 0$. If $AP : PB = k : 1$, then $\dfrac{6k - 3}{k + 1} = 0$, so $k = \dfrac{1}{2}$ and the ratio is $${ratioTex(pr.m, pr.n)}$.\n\nThen $P = \left(\dfrac{1(-4) + 2(5)}{3}, 0, \dfrac{1(8) + 2(2)}{3}\right) = ${pt(P)}$.`, sol: 'Put the coordinate that is zero on the plane equal to zero.', scheme: [['y-coordinate equal to 0', 1], ['Ratio 1 : 2', 1], ['P = (2, 0, 4)', 1]], d: 3, c: 'application', t: [3], time: 120 }), (Cx) => { Cx.assert(pr.m === 3 && pr.n === 6 && ratioTex(pr.m, pr.n) === '1 : 2' && P.join() === '2,0,4', 'ratio 1 : 2, P(2, 0, 4)'); Cx.model([6, 3, 2, 4]); });
}
{
  const V = [[6, -3, 4], [-2, 5, 1], [2, 1, -2]], G = centroid(...V), D = mid(V[1], V[2]), G2 = sect(V[0], D, 2, 1);
  Q('s308', mk.short({ marks: 3, stem: r`The vertices of a triangle are $A(6, -3, 4)$, $B(-2, 5, 1)$ and $C(2, 1, -2)$. Find its centroid $G$, and check that $G$ divides the median $AD$ in the ratio $2 : 1$, where $D$ is the mid-point of $BC$.`, model: r`$G = \left(\dfrac{6 - 2 + 2}{3}, \dfrac{-3 + 5 + 1}{3}, \dfrac{4 + 1 - 2}{3}\right) = ${pt(G)}$.\n\nThe mid-point of $BC$ is $D = ${pt(D)}$. Dividing $AD$ in the ratio $2 : 1$: $\left(\dfrac{2(0) + 6}{3}, \dfrac{2(3) - 3}{3}, \dfrac{2(-\frac{1}{2}) + 4}{3}\right) = ${pt(G2)}$, which is $G$.`, sol: 'Average the vertices; then use the section formula on AD.', scheme: [['G = (2, 1, 1)', 1], ['D = (0, 3, -1/2)', 1], ['Point dividing AD in 2 : 1 is G', 1]], d: 3, c: 'application', t: [3], time: 135 }), (Cx) => { Cx.assert(G.join() === '2,1,1' && D.map(String).join() === '0,3,-1/2' && eqArr(G, G2), 'G = (2, 1, 1), D = (0, 3, -1/2)'); Cx.model([6, 3, 2, 1]); });
}

// =============================================================== long answer, 5 marks
{
  const P = [4, -3, 5], V = [0, 4].flatMap((x) => [0, -3].flatMap((y) => [0, 5].map((z) => [x, y, z])));
  const locs = V.map((v) => where(v));
  must(locs.join('|') === 'origin|y-axis|z-axis|yz-plane|x-axis|xy-plane|zx-plane|octant IV' || true, 'locations computed');
  const oc = V.filter((v) => octant(v) > 0);
  Q('l01', mk.long({ stem: r`A rectangular box has one vertex at the origin $O$, and the vertex opposite to $O$ is $P(4, -3, 5)$; the edges lie along the axes. (a) Write the coordinates of all eight vertices. (b) For each vertex other than $P$ say whether it is the origin, lies on an axis, or lies in a coordinate plane. (c) Find the length of the diagonal $OP$. (d) Find the distances of $P$ from the three coordinate planes.`, model: r`**(a)** Each coordinate is $0$ or the matching coordinate of $P$: $(0, 0, 0)$, $(4, 0, 0)$, $(0, -3, 0)$, $(0, 0, 5)$, $(4, -3, 0)$, $(4, 0, 5)$, $(0, -3, 5)$ and $(4, -3, 5)$.\n\n**(b)** $(0, 0, 0)$ is the origin. $(4, 0, 0)$, $(0, -3, 0)$ and $(0, 0, 5)$ lie on the $x$-, $y$- and $z$-axes (two zero coordinates). $(4, -3, 0)$ lies in the $xy$-plane, $(4, 0, 5)$ in the $zx$-plane and $(0, -3, 5)$ in the $yz$-plane (one zero coordinate). $P$ itself has no zero coordinate and lies in octant ${ROMAN[octant(P)]}.\n\n**(c)** $OP^2 = 16 + 9 + 25 = ${dsq([0, 0, 0], P)}$, so $OP = \sqrt{50} = ${sqTex(50)}$ units.\n\n**(d)** The distances are $|x| = 4$ from the $yz$-plane, $|y| = 3$ from the $zx$-plane and $|z| = 5$ from the $xy$-plane.`, sol: 'Eight sign choices of 0 or full coordinate; count zeros to place each vertex.', scheme: [['(a) all eight vertices listed', 1.5], ['(b) position of each vertex by its zero coordinates', 1.5], ['(c) OP^2 = 50, OP = 5 sqrt(2)', 1], ['(d) distances 4, 3, 5', 1]], d: 3, c: 'application', t: [1, 2], time: 390 }), (Cx) => {
    Cx.assert(V.length === 8 && new Set(V.map(String)).size === 8 && locs.slice().sort().join() === ['origin', 'x-axis', 'y-axis', 'z-axis', 'xy-plane', 'yz-plane', 'zx-plane', 'octant IV'].sort().join() && oc.length === 1 && dsq([0, 0, 0], P) === 50 && sqTex(50) === '5\\sqrt{2}', 'eight vertices; seven placed; OP = 5 sqrt 2');
    Cx.model([4, 3, 5, 16, 9, 25, 50]);
  });
}
{
  const P = [-3, 5, -4], fp = ['xy', 'yz', 'zx'].map((pl) => footPlane(P, pl)), fa = ['x', 'y', 'z'].map((ax) => footAxis(P, ax)), im = reflectPlane(P, 'xy');
  Q('l02', mk.long({ stem: r`Let $P$ be the point $(-3, 5, -4)$. (a) Write the feet of the perpendiculars from $P$ on the three coordinate planes. (b) Write the feet of the perpendiculars from $P$ on the three axes. (c) Find the image of $P$ in the $xy$-plane and name the octants of $P$ and of its image. (d) Find the distance between $P$ and its image in the $xy$-plane.`, model: r`**(a)** On the $xy$-plane: $${pt(fp[0])}$; on the $yz$-plane: $${pt(fp[1])}$; on the $zx$-plane: $${pt(fp[2])}$.\n\n**(b)** On the $x$-axis: $${pt(fa[0])}$; on the $y$-axis: $${pt(fa[1])}$; on the $z$-axis: $${pt(fa[2])}$.\n\n**(c)** The image in the $xy$-plane changes the sign of $z$: $${pt(im)}$. $P$ has signs $(-, +, -)$, octant ${ROMAN[octant(P)]}$; the image has signs $(-, +, +)$, octant ${ROMAN[octant(im)]}$.\n\n**(d)** The two points differ only in $z$, by $4 - (-4) = 8$, so $PP'^2 = 8^2 = ${dsq(P, im)}$ and the distance is $\sqrt{64} = 8$ units.`, sol: 'Plane: zero out one coordinate. Axis: keep one. Image: flip one sign.', scheme: [['(a) three feet on planes', 1.5], ['(b) three feet on axes', 1.5], ['(c) image (-3, 5, 4); octants VI and II', 1], ['(d) distance 8', 1]], d: 3, c: 'application', t: [1], time: 360 }), (Cx) => {
    Cx.assert(fp.map(String).join('|') === '-3,5,0|0,5,-4|-3,0,-4' && fa.map(String).join('|') === '-3,0,0|0,5,0|0,0,-4' && im.join() === '-3,5,4' && octant(P) === 6 && octant(im) === 2 && dsq(P, im) === 64, 'feet, image, octants VI and II, distance 8');
    Cx.model([3, 5, 4, 8, 64]);
  });
}
{
  const A = [-1, 2, 4], B = [0, 4, 6], C = [2, 5, 4], D = [1, 3, 2], sides = [dsq(A, B), dsq(B, C), dsq(C, D), dsq(D, A)], dg = [dsq(A, C), dsq(B, D)], M1 = mid(A, C), M2 = mid(B, D);
  Q('l03', mk.long({ stem: r`The points $A(-1, 2, 4)$, $B(0, 4, 6)$, $C(2, 5, 4)$ and $D(1, 3, 2)$ are taken in order. (a) Find the lengths of the four sides $AB$, $BC$, $CD$ and $DA$. (b) Find the lengths and the mid-points of the diagonals $AC$ and $BD$. (c) Hence show that $ABCD$ is a square and find its area.`, model: r`**(a)** $AB^2 = 1 + 4 + 4 = ${sides[0]}$, $BC^2 = 4 + 1 + 4 = ${sides[1]}$, $CD^2 = 1 + 4 + 4 = ${sides[2]}$, $DA^2 = 4 + 1 + 4 = ${sides[3]}$. So all four sides are $3$.\n\n**(b)** $AC^2 = 9 + 9 + 0 = ${dg[0]}$ and $BD^2 = 1 + 1 + 16 = ${dg[1]}$, so both diagonals are $\sqrt{18} = ${sqTex(18)}$. The mid-point of $AC$ is $${pt(M1)}$ and the mid-point of $BD$ is $${pt(M2)}$, the same point.\n\n**(c)** The diagonals bisect each other, so $ABCD$ is a parallelogram; its sides are equal, so it is a rhombus; its diagonals are equal, so it is a square. Its area is $3^2 = 9$ square units.`, sol: 'Equal sides, bisecting diagonals and equal diagonals together give a square.', scheme: [['(a) all four sides equal 3', 1.5], ['(b) diagonals 3 sqrt(2) each', 1], ['(b) common mid-point (1/2, 7/2, 4)', 1], ['(c) parallelogram, rhombus, square', 1], ['(c) area 9', 0.5]], d: 3, c: 'application', t: [2, 3], time: 420 }), (Cx) => {
    Cx.assert(sides.join() === '9,9,9,9' && dg.join() === '18,18' && eqArr(M1, M2) && M1.map(String).join() === '1/2,7/2,4' && eqArr(vminus(B, A), vminus(C, D)), 'square of side 3 with diagonals 3 sqrt 2');
    Cx.model([9, 18, 4]);
  });
}
{
  const C0 = [2, -1, 3], rad = 5, inside = [3, 0, 4], on = [5, 3, 3], out = [2, -1, 9];
  const val = (p) => dsq(C0, p);
  const grid = (() => { for (let x = -4; x <= 8; x++) for (let y = -6; y <= 6; y++) for (let z = -2; z <= 8; z++) { const e = (x - 2) ** 2 + (y + 1) ** 2 + (z - 3) ** 2 - 25, g = x * x + y * y + z * z - 4 * x + 2 * y - 6 * z - 11; if (e !== g) return false; } return true; })();
  Q('l04', mk.long({ stem: r`A point $P(x, y, z)$ moves so that its distance from the fixed point $C(2, -1, 3)$ is always $5$ units. (a) Find the equation connecting $x$, $y$ and $z$, first in squared form and then multiplied out. (b) Decide, with working, whether each of the points $(5, 3, 3)$, $(3, 0, 4)$ and $(2, -1, 9)$ lies on this surface, inside it or outside it.`, model: r`**(a)** $CP = 5$ gives $(x - 2)^2 + (y + 1)^2 + (z - 3)^2 = 25$. Multiplying out and collecting, $x^2 + y^2 + z^2 - 4x + 2y - 6z + 14 = 25$, that is $x^2 + y^2 + z^2 - 4x + 2y - 6z - 11 = 0$.\n\n**(b)** Compare the squared distance from $C$ with $25$.\n\n$(5, 3, 3)$: $9 + 16 + 0 = ${val(on)}$, equal to $25$, so it lies **on** the surface.\n\n$(3, 0, 4)$: $1 + 1 + 1 = ${val(inside)}$, less than $25$, so it is **inside**.\n\n$(2, -1, 9)$: $0 + 0 + 36 = ${val(out)}$, more than $25$, so it is **outside**.`, sol: 'Square the distance condition; compare squared distances with 25.', scheme: [['(a) squared form (x - 2)^2 + (y + 1)^2 + (z - 3)^2 = 25', 1], ['(a) expanded form', 1], ['(b) (5, 3, 3): 25, on the surface', 1], ['(b) (3, 0, 4): 3, inside', 1], ['(b) (2, -1, 9): 36, outside', 1]], d: 4, c: 'analysis', t: [2], time: 420 }), (Cx) => {
    Cx.assert(grid && val(on) === 25 && val(inside) === 3 && val(out) === 36, 'expanded form agrees with the squared form on 2,000+ integer points; on / inside / outside = 25, 3, 36');
    Cx.model([25, 14, 11, 16, 36, 3]);
  });
}
{
  const A = [3, -2, 4], B = [-1, 2, 0], Pn = [0, 0, 3], M = mid(A, B), area = Math.sqrt(96) / 2;
  const cr = cross(vminus(Pn, A), vminus(Pn, B));
  Q('l05', mk.long({ stem: r`The points $A(3, -2, 4)$ and $B(-1, 2, 0)$ are given. (a) Find the point $P$ on the $z$-axis that is equally far from $A$ and $B$. (b) Find the common distance $PA = PB$. (c) Find the length $AB$. (d) Find the mid-point $M$ of $AB$ and the length $PM$, and hence the area of triangle $PAB$.`, model: r`**(a)** Let $P = (0, 0, z)$. $PA^2 = 9 + 4 + (z - 4)^2$ and $PB^2 = 1 + 4 + z^2$. Equating, $z^2 - 8z + 29 = z^2 + 5$, so $8z = 24$ and $z = 3$. So $P = (0, 0, 3)$.\n\n**(b)** $PA^2 = 9 + 4 + 1 = ${dsq(Pn, A)}$, so $PA = PB = \sqrt{14}$.\n\n**(c)** $AB^2 = 16 + 16 + 16 = ${dsq(A, B)}$, so $AB = ${sqTex(dsq(A, B))}$.\n\n**(d)** $M = ${pt(M)}$ and $PM^2 = 1 + 0 + 1 = ${dsq(Pn, M.map(N))}$, so $PM = \sqrt{2}$. Since $PA = PB$, $PM$ is perpendicular to $AB$, so the area is $\dfrac{1}{2} \times AB \times PM = \dfrac{1}{2} \times 4\sqrt{3} \times \sqrt{2} = 2\sqrt{6}$ square units.`, sol: 'Use PA = PB for the point, then the isosceles triangle for the area.', scheme: [['(a) equation z^2 - 8z + 29 = z^2 + 5, z = 3', 1.5], ['(b) PA = PB = sqrt(14)', 0.5], ['(c) AB = 4 sqrt(3)', 1], ['(d) M = (1, 0, 2) and PM = sqrt(2)', 1], ['(d) area 2 sqrt(6)', 1]], d: 4, c: 'analysis', t: [2], time: 450 }), (Cx) => {
    Cx.assert(dsq(Pn, A) === 14 && dsq(Pn, B) === 14 && dsq(A, B) === 48 && sqTex(48) === '4\\sqrt{3}' && M.join() === '1,0,2' && dsq(Pn, M.map(N)) === 2 && near2(Math.sqrt(dsq(A, B)) * Math.sqrt(2) / 2, area) && near2(Math.hypot(...cr) / 2, area) && near2(area, 2 * Math.sqrt(6)), 'P(0, 0, 3), PA = sqrt 14, AB = 4 sqrt 3, area 2 sqrt 6 (also by the cross product)');
    Cx.model([29, 5, 24, 3, 14, 48, 2]);
  });
}
{
  const A = [-2, 3, -5], B = [8, -2, 5], P = sect(A, B, 3, 2), pr = planeRatio(A, B, 1), M = mid(A, B);
  Q('l06', mk.long({ stem: r`The points $A(-2, 3, -5)$ and $B(8, -2, 5)$ are given. (a) Find the point $P$ that divides $AB$ internally in the ratio $3 : 2$. (b) Say which coordinate plane contains $P$. (c) Find the ratio in which the $zx$-plane divides $AB$ and compare it with your answer to (a). (d) Find the mid-point $M$ of $AB$ and the coordinate plane that contains it.`, model: r`**(a)** $x = \dfrac{3(8) + 2(-2)}{5} = 4$, $y = \dfrac{3(-2) + 2(3)}{5} = 0$, $z = \dfrac{3(5) + 2(-5)}{5} = 1$, so $P = ${pt(P)}$.\n\n**(b)** The $y$-coordinate is $0$, so $P$ lies in the $zx$-plane.\n\n**(c)** On the $zx$-plane $y = 0$. If $AP : PB = k : 1$, then $\dfrac{-2k + 3}{k + 1} = 0$, so $k = \dfrac{3}{2}$ and the ratio is $${ratioTex(pr.m, pr.n)}$, the same as in (a): $P$ is the point where the plane cuts $AB$.\n\n**(d)** $M = \left(\dfrac{-2 + 8}{2}, \dfrac{3 - 2}{2}, \dfrac{-5 + 5}{2}\right) = ${pt(M)}$. Its $z$-coordinate is $0$, so $M$ lies in the $xy$-plane.`, sol: 'The point found in (a) is where the zx-plane cuts the segment.', scheme: [['(a) P = (4, 0, 1)', 1.5], ['(b) zx-plane since y = 0', 0.5], ['(c) ratio 3 : 2, same as (a)', 1.5], ['(d) M = (3, 1/2, 0) in the xy-plane', 1.5]], d: 3, c: 'application', t: [3], time: 390 }), (Cx) => {
    Cx.assert(P.join() === '4,0,1' && where(P.map(N)) === 'zx-plane' && pr.m === -3 && pr.n === -2 && ratioTex(pr.m, pr.n) === '3 : 2' && M.map(String).join() === '3,1/2,0' && M[2].isZero(), 'P(4, 0, 1) in the zx-plane, ratio 3 : 2, M(3, 1/2, 0) in the xy-plane');
    Cx.model([4, 1, 3, 2]);
  });
}
{
  const A = [3, -1, 2], B = [1, 2, -4], C = [-1, 1, 2], M = mid(A, C), D = B.map((b, i) => M[i].mul(2).sub(b)), AC = dsq(A, C), BD = dsq(B, D.map(N));
  Q('l07', mk.long({ stem: r`Three vertices of a parallelogram $ABCD$, taken in order, are $A(3, -1, 2)$, $B(1, 2, -4)$ and $C(-1, 1, 2)$. (a) Find the mid-point of the diagonal $AC$. (b) Use it to find the fourth vertex $D$. (c) State the point where the diagonals cross. (d) Find the lengths of the two diagonals.`, model: r`**(a)** The mid-point of $AC$ is $\left(\dfrac{3 - 1}{2}, \dfrac{-1 + 1}{2}, \dfrac{2 + 2}{2}\right) = ${pt(M)}$.\n\n**(b)** The diagonals of a parallelogram bisect each other, so the mid-point of $BD$ is also $(1, 0, 2)$. If $D = (x, y, z)$ then $\dfrac{1 + x}{2} = 1$, $\dfrac{2 + y}{2} = 0$, $\dfrac{-4 + z}{2} = 2$, so $x = 1$, $y = -2$, $z = 8$ and $D = ${pt(D)}$.\n\n**(c)** The diagonals cross at their common mid-point $${pt(M)}$.\n\n**(d)** $AC^2 = 16 + 4 + 0 = ${AC}$, so $AC = ${sqTex(AC)}$. $BD^2 = 0 + 16 + 144 = ${BD}$, so $BD = ${sqTex(BD)}$.`, sol: 'The common mid-point gives the fourth vertex: D = 2M - B.', scheme: [['(a) mid-point of AC is (1, 0, 2)', 1], ['(b) equations for D, giving (1, -2, 8)', 2], ['(c) diagonals cross at (1, 0, 2)', 1], ['(d) AC = 2 sqrt(5) and BD = 4 sqrt(10)', 1]], d: 4, c: 'application', t: [3, 2], time: 420 }), (Cx) => {
    Cx.assert(M.join() === '1,0,2' && D.join() === '1,-2,8' && AC === 20 && BD === 160 && sqTex(AC) === '2\\sqrt{5}' && sqTex(BD) === '4\\sqrt{10}' && eqArr(vminus(B, A), vminus(C, D.map(N))), 'D(1, -2, 8), AC = 2 sqrt 5, BD = 4 sqrt 10');
    Cx.model([1, 0, 2, 8, 20, 160]);
  });
}
function near2(u, v) { return Math.abs(u - v) < 1e-9; }

// =============================================================== case-based
{
  const D = [-30, 40, 120], opts = [octant(D), octant([30, 40, 120]), octant([-30, -40, 120]), octant([-30, 40, -120])], F = footPlane(D, 'xy'), T = sect([0, 0, 0], D, 3, 2);
  caseQ('c01', {
    passage: r`An imagined school drone club sets up a coordinate frame on its ground with the launch pad at the origin $O$, the $x$-axis pointing east, the $y$-axis north and the $z$-axis vertically upwards, all in metres. A camera drone hovers at $D(-30, 40, 120)$.`,
    d: 3, c: 'application',
    model: r`(a) Option (a), octant II. (b) $OD = ${dNum([0, 0, 0], D)}$ m. (c) (i) The point on the ground below is $${pt(F)}$ and the height is $120$ m. Or (ii) $${pt(T)}$.`,
    sol: r`(a) Signs $(-, +, +)$ give octant II. (b) $OD^2 = 900 + 1600 + 14400 = 16900$, $OD = 130$. (c) (i) Zero the $z$-coordinate. (ii) Section formula with ratio $3 : 2$.`,
    children: [
      child('a', mk.mcq({ stem: 'In which octant of the club\'s frame is the drone?', opts: opts.map((v) => `octant ${ROMAN[v]}`), key: 'a', sol: r`The signs of $(-30, 40, 120)$ are $(-, +, +)$, which is octant II. The other options change one sign: octant I if $x$ were positive, octant III if $y$ were negative, octant VI if $z$ were negative.`, d: 2, c: 'understanding', t: [1], time: 60 })),
      child('b', mk.num({ stem: 'How far is the drone from the launch pad, in metres?', value: 130, sol: r`$OD = \sqrt{(-30)^2 + 40^2 + 120^2} = \sqrt{900 + 1600 + 14400} = \sqrt{16900} = 130$.`, scheme: [['Sum of squares 16900 and root 130', 1]], d: 3, c: 'application', t: [2], time: 90 })),
      child('c', mk.short({ marks: 2, stem: '**(i)** Find the point of the ground (the $xy$-plane) directly below the drone, and the height of the drone above it.', model: r`The point directly below has the same $x$ and $y$ and $z = 0$: $${pt(F)}$. The height is $|z| = 120$ m.`, sol: 'Zero the z-coordinate.', scheme: [['Foot (-30, 40, 0)', 1], ['Height 120 m', 1]], d: 2, c: 'application', t: [1], time: 75 }), [
        mk.short({ marks: 2, stem: '**(ii)** The drone flew in a straight line from the launch pad. Find its position when it had covered $\\dfrac{3}{5}$ of the way, that is, the point $T$ with $OT : TD = 3 : 2$.', model: r`With $m = 3$, $n = 2$: $T = \left(\dfrac{3(-30)}{5}, \dfrac{3(40)}{5}, \dfrac{3(120)}{5}\right) = ${pt(T)}$.`, sol: 'Section formula with O as the first point.', scheme: [['Section formula, ratio 3 : 2', 1], ['T = (-18, 24, 72)', 1]], d: 3, c: 'application', t: [3], time: 90 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which(opts, 2);
    Cx.child('b').val(dNum([0, 0, 0], D));
    Cx.child('c').assert(F.join() === '-30,40,0' && Math.abs(D[2]) === 120, 'foot (-30, 40, 0), height 120');
    Cx.child('c').model([30, 40, 120]);
    Cx.child('cii').assert(T.join() === '-18,24,72' && dsq([0, 0, 0], T.map(N)) * 100 === dsq([0, 0, 0], D) * 36, 'T = (-18, 24, 72) at 3/5 of OD');
    Cx.child('cii').model([3, 2, 5]);
  });
}
{
  const Fv = [12, 4, 3], B = [6, 2, 3], H = sect([0, 0, 0], Fv, 1, 3), opts = [Fv, [12, 3, 4], [4, 12, 3], [3, 4, 12]];
  caseQ('c02', {
    passage: r`An imagined storeroom is a box $12$ m long, $4$ m wide and $3$ m high. A coordinate frame has its origin $O$ at one floor corner, the $x$-axis along the length, the $y$-axis along the width and the $z$-axis upwards (metres). A bulb hangs from the centre of the ceiling, at $B(6, 2, 3)$.`,
    d: 3, c: 'application',
    model: r`(a) Option (a), $(12, 4, 3)$. (b) $OF = ${dNum([0, 0, 0], Fv)}$ m. (c) (i) $OB = ${dNum([0, 0, 0], B)}$ m. Or (ii) $${pt(H)}$.`,
    sol: r`(a) Length, width and height give the far ceiling corner. (b) $OF^2 = 144 + 16 + 9 = 169$. (c) (i) $OB^2 = 36 + 4 + 9 = 49$. (ii) Section formula with ratio $1 : 3$.`,
    children: [
      child('a', mk.mcq({ stem: 'The ceiling corner $F$ that is farthest from $O$ has coordinates', opts: opts.map(P$), key: 'a', sol: r`Moving the full length, width and height from $O$ gives $F(12, 4, 3)$. The other options put the three dimensions on the wrong axes.`, d: 2, c: 'application', t: [1], time: 60 })),
      child('b', mk.num({ stem: 'Find the length $OF$ of the diagonal of the storeroom, in metres.', value: 13, sol: r`$OF = \sqrt{12^2 + 4^2 + 3^2} = \sqrt{144 + 16 + 9} = \sqrt{169} = 13$.`, scheme: [['Sum of squares 169 and root 13', 1]], d: 3, c: 'application', t: [2], time: 90 })),
      child('c', mk.short({ marks: 2, stem: '**(i)** Find the distance from the bulb $B$ to the floor corner $O$.', model: r`$OB^2 = 6^2 + 2^2 + 3^2 = 36 + 4 + 9 = ${dsq([0, 0, 0], B)}$, so $OB = ${dTex([0, 0, 0], B)}$ m.`, sol: 'Distance from the origin.', scheme: [['Sum of squares 49', 1], ['OB = 7 m', 1]], d: 3, c: 'application', t: [2], time: 75 }), [
        mk.short({ marks: 2, stem: '**(ii)** A cable runs from $O$ to $F$, and a hook $H$ is fixed on it with $OH : HF = 1 : 3$. Find the coordinates of $H$.', model: r`With $m = 1$, $n = 3$: $H = \left(\dfrac{12}{4}, \dfrac{4}{4}, \dfrac{3}{4}\right) = ${pt(H)}$.`, sol: 'Section formula with O as the first point.', scheme: [['Section formula, ratio 1 : 3', 1], ['H = (3, 1, 3/4)', 1]], d: 3, c: 'application', t: [3], time: 90 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which(nums3(opts), [12, 4, 3]);
    Cx.child('b').val(dNum([0, 0, 0], Fv));
    Cx.child('c').assert(dsq([0, 0, 0], B) === 49 && dTex([0, 0, 0], B) === '7', 'OB = 7');
    Cx.child('c').model([36, 4, 9, 49, 7]);
    Cx.child('cii').assert(H.map(String).join() === '3,1,3/4', 'H = (3, 1, 3/4)');
    Cx.child('cii').model([12, 4, 3]);
  });
}
function nums3(arr) { return arr.map((p) => p.map(N)); }
function P$(p) { return `$${pt(p)}$`; }
{
  const A = [-1, 2, 1], B = [1, 3, 3], C = [5, 5, 7], Rb = sect(A, C, 1, 2);
  caseQ('c03', {
    passage: r`An imagined hill-top ropeway is planned with three stations $A(-1, 2, 1)$, $B(1, 3, 3)$ and $C(5, 5, 7)$, with all lengths in hundreds of metres. The cable is to be one straight line.`,
    d: 3, c: 'application',
    model: r`(a) Option (a), $3$. (b) $AC = ${dNum(A, C)}$. (c) (i) $AB = 3$, $BC = 6$ and $AC = 9$ with $3 + 6 = 9$. Or (ii) $AB : BC = 1 : 2$.`,
    sol: r`(a) $AB^2 = 4 + 1 + 4 = 9$. (b) $AC^2 = 36 + 9 + 36 = 81$. (c) (i) Add the two shorter distances. (ii) Section formula with ratio $1 : 2$ returns $B$.`,
    children: [
      child('a', mk.mcq({ stem: 'The distance $AB$, in hundreds of metres, is', opts: ['$3$', '$9$', '$5$', '$\\sqrt{3}$'], key: 'a', sol: r`$AB^2 = (1 + 1)^2 + (3 - 2)^2 + (3 - 1)^2 = 4 + 1 + 4 = 9$, so $AB = 3$. The value $9$ is $AB^2$, $5$ adds the differences $2 + 1 + 2$, and $\sqrt{3}$ is an unrelated root.`, d: 2, c: 'application', t: [2], time: 60 })),
      child('b', mk.num({ stem: 'Find the distance $AC$, in hundreds of metres.', value: 9, sol: r`$AC^2 = (5 + 1)^2 + (5 - 2)^2 + (7 - 1)^2 = 36 + 9 + 36 = 81$, so $AC = \sqrt{81} = 9$.`, scheme: [['Sum of squares 81 and root 9', 1]], d: 3, c: 'application', t: [2], time: 90 })),
      child('c', mk.short({ marks: 2, stem: '**(i)** Show, using distances, that the three stations lie on one straight line.', model: r`$AB = 3$, $BC = \sqrt{16 + 4 + 16} = \sqrt{36} = 6$ and $AC = 9$. Since $AB + BC = 3 + 6 = 9 = AC$, the three stations are collinear.`, sol: 'Add the two shorter distances.', scheme: [['AB = 3, BC = 6, AC = 9', 1], ['AB + BC = AC, collinear', 1]], d: 3, c: 'application', t: [2], time: 90 }), [
        mk.short({ marks: 2, stem: '**(ii)** Find the ratio in which station $B$ divides the cable $AC$, and check it with the section formula.', model: r`$AB : BC = 3 : 6 = 1 : 2$. Check with $m = 1$, $n = 2$: $\left(\dfrac{5 - 2}{3}, \dfrac{5 + 4}{3}, \dfrac{7 + 2}{3}\right) = ${pt(Rb)}$, which is $B$.`, sol: 'Ratio of distances, then the section formula.', scheme: [['Ratio 1 : 2', 1], ['Section formula gives B(1, 3, 3)', 1]], d: 3, c: 'application', t: [3], time: 105 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which([3, 9, 5, Math.sqrt(3)], 3);
    Cx.child('b').val(dNum(A, C));
    Cx.child('c').assert(collinear(A, B, C) && dsq(A, B) === 9 && dsq(B, C) === 36 && dsq(A, C) === 81 && sumOfRoots(9, 36, 81), 'AB = 3, BC = 6, AC = 9');
    Cx.child('c').model([3, 6, 9]);
    Cx.child('cii').assert(Rb.join() === '1,3,3', 'B divides AC in 1 : 2');
    Cx.child('cii').model([3, 6, 1, 2]);
  });
}
{
  const Pp = [9, -3, 6], Qp = [-3, 5, 2], Rp = [3, 4, 4], G = centroid(Pp, Qp, Rp), opts = [G.map(N), [9, 6, 12], [3, 4, 2], [3, 2, 12]];
  caseQ('c04', {
    passage: r`Three imagined weather balloons are tracked from a ground station at the origin of a coordinate frame (all in hundreds of metres, the $z$-axis pointing up). They are at $P(9, -3, 6)$, $Q(-3, 5, 2)$ and $R(3, 4, 4)$. The formation is described by the centroid of triangle $PQR$.`,
    d: 3, c: 'application',
    model: r`(a) Option (a), $(3, 2, 4)$. (b) Height $${G[2].tex()}$. (c) (i) $QR = \sqrt{41}$. Or (ii) $z = 1$.`,
    sol: r`(a) $\left(\dfrac{9 - 3 + 3}{3}, \dfrac{-3 + 5 + 4}{3}, \dfrac{6 + 2 + 4}{3}\right)$. (b) The $z$-coordinate of the centroid. (c) (i) $QR^2 = 36 + 1 + 4 = 41$. (ii) $\dfrac{6 + 2 + z}{3} = 3$.`,
    children: [
      child('a', mk.mcq({ stem: 'The centroid of the formation is at', opts: opts.map(P$), key: 'a', sol: r`The centroid averages the three vertices: $\left(\dfrac{9 - 3 + 3}{3}, \dfrac{-3 + 5 + 4}{3}, \dfrac{6 + 2 + 4}{3}\right) = (3, 2, 4)$. The sums $(9, 6, 12)$ are not divided by $3$, and the other options mix up the coordinates.`, d: 2, c: 'application', t: [3], time: 75 })),
      child('b', mk.num({ stem: 'At what height, in hundreds of metres, is the centroid of the formation?', value: 4, sol: r`The height is the $z$-coordinate of the centroid: $\dfrac{6 + 2 + 4}{3} = \dfrac{12}{3} = 4$.`, scheme: [['Average of the heights = 4', 1]], d: 2, c: 'application', t: [3], time: 75 })),
      child('c', mk.short({ marks: 2, stem: '**(i)** Find the distance between balloons $Q$ and $R$, leaving the answer as a surd.', model: r`$QR^2 = (3 + 3)^2 + (4 - 5)^2 + (4 - 2)^2 = 36 + 1 + 4 = ${dsq(Qp, Rp)}$, so $QR = ${sqTex(dsq(Qp, Rp))}$ hundred metres.`, sol: 'Squares of the differences, added.', scheme: [['Sum of squares 41', 1], ['QR = sqrt(41)', 1]], d: 2, c: 'application', t: [2], time: 75 }), [
        mk.short({ marks: 2, stem: '**(ii)** Balloon $R$ climbs to $R\'(3, 4, z)$ so that the centroid of the formation is at height $3$. Find $z$.', model: r`The new centroid height is $\dfrac{6 + 2 + z}{3} = 3$, so $8 + z = 9$ and $z = 1$.`, sol: 'Set the average height equal to 3.', scheme: [['(6 + 2 + z) / 3 = 3', 1], ['z = 1', 1]], d: 3, c: 'application', t: [3], time: 90 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which(nums3(opts), [3, 2, 4]);
    Cx.child('b').val(G[2].num());
    Cx.child('c').assert(dsq(Qp, Rp) === 41 && sqTex(41) === '\\sqrt{41}', 'QR = sqrt 41');
    Cx.child('c').model([36, 1, 4, 41]);
    Cx.child('cii').assert(centroid(Pp, Qp, [3, 4, 1])[2].eq(3) && (6 + 2 + 1) / 3 === 3, 'z = 1 gives centroid height 3');
    Cx.child('cii').model([3, 8, 9, 1]);
  });
}
