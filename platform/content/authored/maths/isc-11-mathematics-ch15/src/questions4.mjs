// ISC 11 Mathematics ch15 Introduction to Three-Dimensional Geometry - 5-mark long-answer items (set in labelled parts).
import { Q, mk } from './lib.mjs';
import { r, pt, dsq, sqTex, where, sect, mid, centroid, triangleKind, collinear, vminus, Rat } from './space.mjs';
import { ext, fourth, planeCut, onLine } from './x3.mjs';

{
  const A = [-1, 2, -3], G = [4, 6, 1];
  const verts = []; for (const x of [-1, 4]) for (const y of [2, 6]) for (const z of [-3, 1]) verts.push([x, y, z]);
  const cen = mid(A, G), diag = dsq(A, G);
  Q('l01', mk.long({ stem: r`A rectangular box has its faces parallel to the coordinate planes. Two opposite corners of the box are $A(-1, 2, -3)$ and $G(4, 6, 1)$. Find

(a) the coordinates of all eight corners, [2]

(b) the length of the diagonal $AG$, [1]

(c) the coordinates of the centre of the box, [1]

(d) the distance of the centre from the $xy$-plane. [1]`, model: r`(a) The corners take every combination of $x \in \{-1, 4\}$, $y \in \{2, 6\}$, $z \in \{-3, 1\}$. On the face $z = -3$: $(-1, 2, -3)$, $(4, 2, -3)$, $(4, 6, -3)$, $(-1, 6, -3)$. On the face $z = 1$: $(-1, 2, 1)$, $(4, 2, 1)$, $(4, 6, 1)$, $(-1, 6, 1)$.

(b) $AG = \sqrt{(4 + 1)^2 + (6 - 2)^2 + (1 + 3)^2} = \sqrt{25 + 16 + 16} = \sqrt{57}$.

(c) The centre is the mid-point of $AG$: $\left(\dfrac{-1 + 4}{2}, \dfrac{2 + 6}{2}, \dfrac{-3 + 1}{2}\right) = \left(\dfrac{3}{2}, 4, -1\right)$.

(d) The distance from the $xy$-plane is $\lvert z \rvert = \lvert -1 \rvert = 1$.`, sol: 'Corners come from the two values of each coordinate; the centre is the mid-point of a space diagonal.', scheme: [['Four corners with $z = -3$', 1], ['Four corners with $z = 1$', 1], ['$AG = \\sqrt{57}$', 1], ['Centre $\\left(\\dfrac{3}{2}, 4, -1\\right)$', 1], ['Distance $1$ from the $xy$-plane', 1]], d: 3, c: 'application', t: [1, 2], time: 330 }), (C) => {
    const mids = [...Array(4)].map(() => 0);
    C.assert(verts.length === 8 && new Set(verts.map(String)).size === 8 && diag === 57 && cen.join() === '3/2,4,-1' && Math.abs(cen[2].num()) === 1 && verts.every((v) => mid(v, [3 - v[0], 8 - v[1], -2 - v[2]]).join() === cen.join()) && mids.length === 4, 'eight corners; AG^2 = 57; centre (3/2, 4, -1) is the mid-point of every opposite pair; distance 1'); C.model([57, 25, 16, 4, 1]);
  });
}
{
  const A = [-3, 4, 3], B = [0, -2, 3], Cc = [4, 0, -1], D = fourth(A, B, Cc);
  Q('l02', mk.long({ stem: r`The points $A(-3, 4, 3)$, $B(0, -2, 3)$, $C(4, 0, -1)$ and $D(1, 6, -1)$ are taken in order. Find

(a) the lengths of the four sides $AB$, $BC$, $CD$ and $DA$, [2]

(b) the lengths and the mid-points of the diagonals $AC$ and $BD$, [2]

(c) the name of the quadrilateral $ABCD$, with a reason. [1]`, model: r`(a) $AB^2 = 9 + 36 + 0 = 45$, so $AB = 3\sqrt{5}$; $BC^2 = 16 + 4 + 16 = 36$, so $BC = 6$; $CD^2 = 9 + 36 + 0 = 45$, so $CD = 3\sqrt{5}$; $DA^2 = 16 + 4 + 16 = 36$, so $DA = 6$.

(b) $AC^2 = 49 + 16 + 16 = 81$ and $BD^2 = 1 + 64 + 16 = 81$, so both diagonals have length $9$. The mid-point of $AC$ is $\left(\dfrac{-3 + 4}{2}, \dfrac{4 + 0}{2}, \dfrac{3 - 1}{2}\right) = \left(\dfrac{1}{2}, 2, 1\right)$ and the mid-point of $BD$ is $\left(\dfrac{0 + 1}{2}, \dfrac{-2 + 6}{2}, \dfrac{3 - 1}{2}\right) = \left(\dfrac{1}{2}, 2, 1\right)$.

(c) The diagonals have the same mid-point, so $ABCD$ is a parallelogram; they are equal in length, so it is a rectangle. It is not a square, because the adjacent sides $3\sqrt{5}$ and $6$ are different.`, sol: 'Compare the sides in pairs, then the diagonals; a common mid-point gives a parallelogram and equal diagonals make it a rectangle.', scheme: [['$AB = CD = 3\\sqrt{5}$', 1], ['$BC = DA = 6$', 1], ['Both diagonals have length $9$', 1], ['Both mid-points are $\\left(\\dfrac{1}{2}, 2, 1\\right)$', 1], ['Rectangle, not a square, with the reason', 1]], d: 4, c: 'analysis', t: [2], time: 330 }), (C) => {
    C.assert(D.join() === '1,6,-1' && [dsq(A, B), dsq(B, Cc), dsq(Cc, D), dsq(D, A)].join() === '45,36,45,36' && sqTex(45) === r`3\sqrt{5}` && dsq(A, Cc) === 81 && dsq(B, D) === 81 && mid(A, Cc).join() === '1/2,2,1' && mid(B, D).join() === '1/2,2,1' && vminus(A, B).reduce((s, v, i) => s + v * vminus(B, Cc)[i], 0) === 0, 'sides 3 sqrt 5, 6, 3 sqrt 5, 6; diagonals 9; common mid-point (1/2, 2, 1); AB is perpendicular to BC'); C.model([45, 36, 81, 9, 6, 2, 1]);
  });
}
{
  const A = [-1, 2, 4], B = [5, -4, 0], Cc = [-1, -3, 5], k = triangleKind(A, B, Cc), Mm = mid(A, B);
  Q('l03', mk.long({ stem: r`The vertices of a triangle are $A(-1, 2, 4)$, $B(5, -4, 0)$ and $C(-1, -3, 5)$. Find

(a) the squares of the lengths of its three sides, [2]

(b) which angle of the triangle is a right angle, with a reason, [1]

(c) the mid-point $M$ of the longest side, and show that $MA = MB = MC$. [2]`, model: r`(a) $AB^2 = 36 + 36 + 16 = 88$, $BC^2 = 36 + 1 + 25 = 62$, $CA^2 = 0 + 25 + 1 = 26$.

(b) $BC^2 + CA^2 = 62 + 26 = 88 = AB^2$, so the angle at $C$ is a right angle and $AB$ is the hypotenuse.

(c) The longest side is $AB$, with mid-point $M = \left(\dfrac{-1 + 5}{2}, \dfrac{2 - 4}{2}, \dfrac{4 + 0}{2}\right) = (2, -1, 2)$. Then $MA^2 = 9 + 9 + 4 = 22$, $MB^2 = 9 + 9 + 4 = 22$ and $MC^2 = 9 + 4 + 9 = 22$, so $MA = MB = MC = \sqrt{22}$.`, sol: 'The longest squared side is the sum of the other two if the triangle is right-angled; the mid-point of the hypotenuse is equidistant from all three vertices.', scheme: [['$AB^2 = 88$', 1], ['$BC^2 = 62$ and $CA^2 = 26$', 1], ['Right angle at $C$ since $62 + 26 = 88$', 1], ['$M = (2, -1, 2)$', 1], ['$MA^2 = MB^2 = MC^2 = 22$', 1]], d: 4, c: 'analysis', t: [2, 3], time: 330 }), (C) => {
    C.assert(k.sides.join() === '88,62,26' && k.right && !k.iso && Mm.join() === '2,-1,2' && [dsq(Mm, A), dsq(Mm, B), dsq(Mm, Cc)].join() === '22,22,22' && 62 + 26 === 88, 'squared sides 88, 62, 26; right angle at C; M = (2, -1, 2) with MA^2 = MB^2 = MC^2 = 22'); C.model([88, 62, 26, 22, 2]);
  });
}
{
  const A = [-3, 5, 2], B = [9, -7, 14], P1 = sect(A, B, 1, 3), P2 = ext(A, B, 3, 1), pc = planeCut(A, B, 2);
  Q('l04', mk.long({ stem: r`The points $A(-3, 5, 2)$ and $B(9, -7, 14)$ are given. Find

(a) the point $P$ that divides $AB$ internally in the ratio $AP : PB = 1 : 3$, [1]

(b) the point $R$ that divides $AB$ externally in the ratio $AR : RB = 3 : 1$, [2]

(c) the ratio in which the $xy$-plane divides $AB$, and the point where it meets the line $AB$. [2]`, model: r`(a) $P = \left(\dfrac{1(9) + 3(-3)}{4}, \dfrac{1(-7) + 3(5)}{4}, \dfrac{1(14) + 3(2)}{4}\right) = (0, 2, 5)$.

(b) For external division, $R = \left(\dfrac{3(9) - 1(-3)}{3 - 1}, \dfrac{3(-7) - 1(5)}{3 - 1}, \dfrac{3(14) - 1(2)}{3 - 1}\right) = (15, -13, 20)$.

(c) On the $xy$-plane $z = 0$, so $AP : PB = -z_1 : z_2 = -2 : 14 = -1 : 7$. The ratio is negative (both $A$ and $B$ lie above the plane), so the division is external in the ratio $1 : 7$. The point is $\left(\dfrac{1(9) - 7(-3)}{1 - 7}, \dfrac{1(-7) - 7(5)}{1 - 7}, \dfrac{1(14) - 7(2)}{1 - 7}\right) = (-5, 7, 0)$.`, sol: 'Internal division uses $m x_2 + n x_1$ over $m + n$; external division uses $m x_2 - n x_1$ over $m - n$; a coordinate plane gives the ratio $-a_k : b_k$.', scheme: [['$P = (0, 2, 5)$', 1], ['External formula with $m = 3$, $n = 1$', 1], ['$R = (15, -13, 20)$', 1], ['Ratio $-2 : 14$, external $1 : 7$', 1], ['Meeting point $(-5, 7, 0)$', 1]], d: 3, c: 'application', t: [3], time: 330 }), (C) => {
    C.assert(P1.join() === '0,2,5' && P2.join() === '15,-13,20' && pc.text === '1 : 7' && !pc.internal && pc.P.join() === '-5,7,0' && dsq(P2.map((v) => v.num()), A) === 9 * dsq(P2.map((v) => v.num()), B), 'P = (0, 2, 5); R = (15, -13, 20) with RA = 3 RB; xy-plane external 1 : 7 at (-5, 7, 0)'); C.model([0, 2, 5, 15, 13, 20, 7, 14]);
  });
}
{
  const A = [5, -7, 9], B = [-3, 4, 1], Cc = [1, 6, 5], D = mid(B, Cc), G = centroid(A, B, Cc), P0 = sect(A, D, 2, 1);
  Q('l05', mk.long({ stem: r`A triangle has vertices $A(5, -7, 9)$, $B(-3, 4, 1)$ and $C(1, 6, 5)$. Find

(a) the mid-point $D$ of $BC$, [1]

(b) the point $G$ on $AD$ with $AG : GD = 2 : 1$, [2]

(c) the centroid of the triangle, and say how it compares with $G$, [1]

(d) the length $AG$. [1]`, model: r`(a) $D = \left(\dfrac{-3 + 1}{2}, \dfrac{4 + 6}{2}, \dfrac{1 + 5}{2}\right) = (-1, 5, 3)$.

(b) $G = \left(\dfrac{2(-1) + 1(5)}{3}, \dfrac{2(5) + 1(-7)}{3}, \dfrac{2(3) + 1(9)}{3}\right) = (1, 1, 5)$.

(c) The centroid is $\left(\dfrac{5 - 3 + 1}{3}, \dfrac{-7 + 4 + 6}{3}, \dfrac{9 + 1 + 5}{3}\right) = (1, 1, 5)$, the same point as $G$: the centroid divides each median in the ratio $2 : 1$ from the vertex.

(d) $AG = \sqrt{(1 - 5)^2 + (1 + 7)^2 + (5 - 9)^2} = \sqrt{16 + 64 + 16} = \sqrt{96} = 4\sqrt{6}$.`, sol: 'Use the mid-point, then the internal section formula with $2 : 1$, then compare with the average of the vertices.', scheme: [['$D = (-1, 5, 3)$', 1], ['Section formula with $m = 2$, $n = 1$', 1], ['$G = (1, 1, 5)$', 1], ['Centroid $(1, 1, 5)$ equals $G$', 1], ['$AG = 4\\sqrt{6}$', 1]], d: 3, c: 'application', t: [3, 2], time: 330 }), (C) => {
    C.assert(D.join() === '-1,5,3' && P0.join() === '1,1,5' && G.join() === '1,1,5' && dsq(A, [1, 1, 5]) === 96 && sqTex(96) === r`4\sqrt{6}`, 'D = (-1, 5, 3); G = (1, 1, 5) is the centroid; AG^2 = 96'); C.model([1, 5, 3, 96, 4, 6]);
  });
}
{
  const P0 = [2, 1, -3], Q0 = [6, -1, 2], R0 = [3, 5, 1];
  const X = [0, 1, 2].map((i) => Q0[i] + R0[i] - P0[i]), Y = [0, 1, 2].map((i) => P0[i] + R0[i] - Q0[i]), Z = [0, 1, 2].map((i) => P0[i] + Q0[i] - R0[i]);
  const g1 = centroid(P0, Q0, R0), g2 = centroid(X, Y, Z);
  Q('l06', mk.long({ stem: r`$P(2, 1, -3)$, $Q(6, -1, 2)$ and $R(3, 5, 1)$ are three vertices of a parallelogram, but the order of the vertices is not stated. Find

(a) the three possible positions of the fourth vertex, [3]

(b) the centroid of triangle $PQR$ and the centroid of the triangle formed by the three positions found in (a), and show that they coincide. [2]`, model: r`(a) The fourth vertex is opposite one of the three given vertices, and the diagonals bisect each other. If it is opposite $P$: $X = Q + R - P = (6 + 3 - 2, -1 + 5 - 1, 2 + 1 + 3) = (7, 3, 6)$. If it is opposite $Q$: $Y = P + R - Q = (2 + 3 - 6, 1 + 5 + 1, -3 + 1 - 2) = (-1, 7, -4)$. If it is opposite $R$: $Z = P + Q - R = (2 + 6 - 3, 1 - 1 - 5, -3 + 2 - 1) = (5, -5, -2)$.

(b) The centroid of $PQR$ is $\left(\dfrac{2 + 6 + 3}{3}, \dfrac{1 - 1 + 5}{3}, \dfrac{-3 + 2 + 1}{3}\right) = \left(\dfrac{11}{3}, \dfrac{5}{3}, 0\right)$. The centroid of $XYZ$ is $\left(\dfrac{7 - 1 + 5}{3}, \dfrac{3 + 7 - 5}{3}, \dfrac{6 - 4 - 2}{3}\right) = \left(\dfrac{11}{3}, \dfrac{5}{3}, 0\right)$. The two centroids coincide.`, sol: 'Use $A + C = B + D$ for each choice of the opposite pair, then average each triple of vertices.', scheme: [['$X = (7, 3, 6)$', 1], ['$Y = (-1, 7, -4)$', 1], ['$Z = (5, -5, -2)$', 1], ['Centroid of $PQR$ is $\\left(\\dfrac{11}{3}, \\dfrac{5}{3}, 0\\right)$', 1], ['Centroid of $XYZ$ is the same point', 1]], d: 4, c: 'analysis', t: [3], time: 330 }), (C) => {
    const fixes = [[X, P0, Q0, R0], [Y, Q0, P0, R0], [Z, R0, P0, Q0]];
    C.assert(X.join() === '7,3,6' && Y.join() === '-1,7,-4' && Z.join() === '5,-5,-2' && fixes.every(([S, opp, a, b]) => mid(S, opp).join() === mid(a, b).join()) && g1.join() === '11/3,5/3,0' && g2.join() === g1.join(), 'three fourth vertices, each with matching diagonal mid-points; both centroids are (11/3, 5/3, 0)'); C.model([7, 3, 6, 5, 4, 2, 11, 0]);
  });
}
{
  const A = [-1, -3, 5], Cc = [11, 9, -7], B = sect(A, Cc, 1, 3), D = ext(A, Cc, 1, 3), Bn = B.map((v) => v.num());
  Q('l07', mk.long({ stem: r`The points $A(-1, -3, 5)$, $B(2, 0, 2)$ and $C(11, 9, -7)$ are given.

(a) Show, by finding the three distances, that $A$, $B$ and $C$ are collinear. [2]

(b) Find the ratio $AB : BC$. [1]

(c) Find the point $D$ that divides $AC$ externally in the same ratio $AD : DC$. [2]`, model: r`(a) $AB^2 = 9 + 9 + 9 = 27$, so $AB = 3\sqrt{3}$; $BC^2 = 81 + 81 + 81 = 243$, so $BC = 9\sqrt{3}$; $AC^2 = 144 + 144 + 144 = 432$, so $AC = 12\sqrt{3}$. Since $AB + BC = 3\sqrt{3} + 9\sqrt{3} = 12\sqrt{3} = AC$, the points are collinear.

(b) $AB : BC = 3\sqrt{3} : 9\sqrt{3} = 1 : 3$.

(c) External division in the ratio $1 : 3$: $D = \left(\dfrac{1(11) - 3(-1)}{1 - 3}, \dfrac{1(9) - 3(-3)}{1 - 3}, \dfrac{1(-7) - 3(5)}{1 - 3}\right) = (-7, -9, 11)$.`, sol: 'Find the three distances as surds, take their ratio, then use the external formula with the same $m : n$.', scheme: [['Distances $3\\sqrt{3}$, $9\\sqrt{3}$, $12\\sqrt{3}$', 1], ['$AB + BC = AC$, so collinear', 1], ['Ratio $1 : 3$', 1], ['External formula with $m = 1$, $n = 3$', 1], ['$D = (-7, -9, 11)$', 1]], d: 4, c: 'analysis', t: [2, 3], time: 330 }), (C) => {
    C.assert(B.join() === '2,0,2' && dsq(A, Bn) === 27 && dsq(Bn, Cc) === 243 && dsq(A, Cc) === 432 && sqTex(27) === r`3\sqrt{3}` && sqTex(243) === r`9\sqrt{3}` && sqTex(432) === r`12\sqrt{3}` && collinear(A, Bn, Cc) && D.join() === '-7,-9,11' && onLine(A, Cc, D.map((v) => v.num())).eq(Rat.of([-1, 2])), 'distances 3 sqrt 3, 9 sqrt 3, 12 sqrt 3; ratio 1 : 3; external point (-7, -9, 11) on the line beyond A'); C.model([27, 243, 432, 3, 9, 12, 1, -7, -9, 11]);
  });
}
