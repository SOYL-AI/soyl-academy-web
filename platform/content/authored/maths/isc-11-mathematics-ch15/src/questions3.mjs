// ISC 11 Mathematics ch15 Introduction to Three-Dimensional Geometry - 3-mark short-answer items.
import { Q, mk } from './lib.mjs';
import { r, pt, dsq, sqTex, octant, footPlane, sect, mid, centroid, triangleKind, collinear, vminus, Rat } from './space.mjs';
import { ext, fourth, planeCut, onLine, tetraCentroid, bisector, diffLocus, sphere, lin } from './x3.mjs';

{
  const P0 = [-4, 7, -3], F = footPlane(P0, 'xy');
  Q('s301', mk.short({ marks: 3, stem: r`A point $P$ in octant VI is $4$ units from the $yz$-plane, $7$ units from the $zx$-plane and $3$ units from the $xy$-plane. Write the coordinates of $P$, the foot of the perpendicular from $P$ to the $xy$-plane, and the distance of $P$ from the origin.`, model: r`Octant VI has the signs $(-, +, -)$ and the distances from the planes are $\lvert x \rvert = 4$, $\lvert y \rvert = 7$, $\lvert z \rvert = 3$, so $P = (-4, 7, -3)$. The foot on the $xy$-plane is $(-4, 7, 0)$. The distance from the origin is $\sqrt{16 + 49 + 9} = \sqrt{74}$.`, sol: 'Use the signs of the octant for the coordinates, zero $z$ for the foot, and the distance formula from $O$.', scheme: [['$P = (-4, 7, -3)$', 1], ['Foot $(-4, 7, 0)$', 1], ['$OP = \\sqrt{74}$', 1]], d: 3, c: 'application', t: [1], time: 120 }), (C) => {
    C.assert(octant(P0) === 6 && F.join() === '-4,7,0' && dsq([0, 0, 0], P0) === 74 && sqTex(74) === r`\sqrt{74}`, 'P = (-4, 7, -3) in octant VI; foot (-4, 7, 0); OP^2 = 74'); C.model([4, 7, 3, 74]);
  });
}
{
  const A = [4, -1, 0], B = [5, -3, 3], Cc = [7, -7, 9];
  Q('s302', mk.short({ marks: 3, stem: r`Three points are $A(4, -1, 0)$, $B(5, -3, 3)$ and $C(7, -7, 9)$. By finding the three distances between them, show that they are collinear and say which one is the middle point.`, model: r`$AB = \sqrt{1 + 4 + 9} = \sqrt{14}$, $BC = \sqrt{4 + 16 + 36} = \sqrt{56} = 2\sqrt{14}$ and $AC = \sqrt{9 + 36 + 81} = \sqrt{126} = 3\sqrt{14}$. Since $AB + BC = \sqrt{14} + 2\sqrt{14} = 3\sqrt{14} = AC$, the three points are collinear, and $B$ lies between $A$ and $C$.`, sol: 'The longest of the three distances must equal the sum of the other two.', scheme: [['$AB$, $BC$ and $AC$ as surds', 1], ['$AB + BC = AC$', 1], ['Collinear, with $B$ between $A$ and $C$', 1]], d: 3, c: 'application', t: [2], time: 130 }), (C) => {
    C.assert([dsq(A, B), dsq(B, Cc), dsq(A, Cc)].join() === '14,56,126' && sqTex(56) === r`2\sqrt{14}` && sqTex(126) === r`3\sqrt{14}` && collinear(A, B, Cc) && onLine(A, Cc, B).eq(Rat.of([1, 3])), 'distances sqrt 14, 2 sqrt 14, 3 sqrt 14; B is one third of the way from A to C'); C.model([14, 56, 126, 2, 3]);
  });
}
{
  const T1 = [[-1, 2, 3], [-1, 6, 0], [4, 2, 3]], k = triangleKind(...T1);
  Q('s303', mk.short({ marks: 3, stem: r`Prove that two sides of the triangle with vertices $A(-1, 2, 3)$, $B(-1, 6, 0)$ and $C(4, 2, 3)$ are equal and that the angle between them is a right angle; name the vertex where it occurs.`, model: r`$AB^2 = 0 + 16 + 9 = 25$, $AC^2 = 25 + 0 + 0 = 25$ and $BC^2 = 25 + 16 + 9 = 50$. Since $AB = AC$ the triangle is isosceles. Also $AB^2 + AC^2 = 25 + 25 = 50 = BC^2$, so it is right-angled, and the right angle is at $A$, the vertex between the equal sides.`, sol: 'Find the three squared sides, then compare.', scheme: [['Squared sides $25$, $25$, $50$', 1], ['$AB = AC$, so isosceles', 1], ['$AB^2 + AC^2 = BC^2$, right angle at $A$', 1]], d: 3, c: 'application', t: [2], time: 130 }), (C) => {
    C.assert(k.sides.join() === '25,50,25'.replace('25,50,25', '25,50,25') && k.right && k.iso && !k.equi && k.kind === 'isosceles right-angled' && dsq(T1[0], T1[1]) === dsq(T1[0], T1[2]), 'squared sides AB = 25, BC = 50, CA = 25; right angle at A'); C.model([25, 50]);
  });
}
{
  const A = [3, -4, 2], B = [3, 3, 1], Cc = [-4, 2, 1], D = fourth(A, B, Cc);
  Q('s304', mk.short({ marks: 3, stem: r`The points $A(3, -4, 2)$, $B(3, 3, 1)$, $C(-4, 2, 1)$ and $D(-4, -5, 2)$ are taken in order. Show that $ABCD$ is a rhombus but not a square.`, model: r`The diagonals $AC$ and $BD$ have mid-points $\left(\dfrac{3 - 4}{2}, \dfrac{-4 + 2}{2}, \dfrac{2 + 1}{2}\right) = \left(-\dfrac{1}{2}, -1, \dfrac{3}{2}\right)$ and $\left(\dfrac{3 - 4}{2}, \dfrac{3 - 5}{2}, \dfrac{1 + 2}{2}\right) = \left(-\dfrac{1}{2}, -1, \dfrac{3}{2}\right)$, which are equal, so $ABCD$ is a parallelogram. $AB^2 = 0 + 49 + 1 = 50$ and $BC^2 = 49 + 1 + 0 = 50$, so adjacent sides are equal and it is a rhombus. Its diagonals are $AC^2 = 49 + 36 + 1 = 86$ and $BD^2 = 49 + 64 + 1 = 114$, which are different, so it is not a square.`, sol: 'A common mid-point of the diagonals gives a parallelogram; equal sides then give a rhombus; equal diagonals would make it a square.', scheme: [['Equal mid-points of $AC$ and $BD$: parallelogram', 1], ['$AB^2 = BC^2 = 50$: rhombus', 1], ['$AC^2 = 86 \\ne BD^2 = 114$: not a square', 1]], d: 3, c: 'analysis', t: [2], time: 150 }), (C) => {
    C.assert(D.join() === '-4,-5,2' && mid(A, Cc).join() === mid(B, D).join() && dsq(A, B) === 50 && dsq(B, Cc) === 50 && dsq(Cc, D) === 50 && dsq(D, A) === 50 && dsq(A, Cc) === 86 && dsq(B, D) === 114, 'common mid-point (-1/2, -1, 3/2); sides all 50; diagonals 86 and 114'); C.model([50, 86, 114, 49, 36]);
  });
}
{
  const A = [2, -1, 3], B = [-4, 3, 1], L = diffLocus(A, B, 20);
  Q('s305', mk.short({ marks: 3, stem: r`A point $P(x, y, z)$ moves so that $PA^2 - PB^2 = 20$, where $A$ is $(2, -1, 3)$ and $B$ is $(-4, 3, 1)$. Show that $P$ stays on a plane and find its equation.`, model: r`$PA^2 = (x - 2)^2 + (y + 1)^2 + (z - 3)^2 = x^2 + y^2 + z^2 - 4x + 2y - 6z + 14$ and $PB^2 = (x + 4)^2 + (y - 3)^2 + (z - 1)^2 = x^2 + y^2 + z^2 + 8x - 6y - 2z + 26$. Subtracting, $PA^2 - PB^2 = -12x + 8y - 4z - 12 = 20$. The squared terms cancel, so the condition is linear: $-12x + 8y - 4z = 32$, that is $3x - 2y + z = -8$, which is a plane.`, sol: 'Expand both squared distances; the $x^2 + y^2 + z^2$ terms cancel and leave a linear equation.', scheme: [['$PA^2$ and $PB^2$ expanded', 1], ['The squared terms cancel, leaving a linear equation', 1], ['$3x - 2y + z = -8$', 1]], d: 3, c: 'application', t: [2], time: 150 }), (C) => {
    C.assert(L.co.join() === '-3,2,-1' && L.d === 8 && L.tested > 5 && dsq([0, 0, 0], A) === 14 && dsq([0, 0, 0], B) === 26 && -3 * 0 + 2 * 0 - 1 * -8 === 8, 'plane -3x + 2y - z = 8, i.e. 3x - 2y + z = -8, tested at lattice points'); C.model([14, 26, 12, 20, 32, 8]);
  });
}
{
  const C0 = [2, -3, 1], P1 = [5, 1, -11], r2 = dsq(C0, P1), S = sphere(C0, r2);
  Q('s306', mk.short({ marks: 3, stem: r`Find the equation of the set of points whose distance from $C(2, -3, 1)$ equals $CP$, where $P$ is $(5, 1, -11)$. Give it in the squared form and then without brackets.`, model: r`$CP^2 = (5 - 2)^2 + (1 + 3)^2 + (-11 - 1)^2 = 9 + 16 + 144 = 169$, so the radius is $13$. Every point $(x, y, z)$ of the set satisfies $(x - 2)^2 + (y + 3)^2 + (z - 1)^2 = 169$. Expanding, $x^2 + y^2 + z^2 - 4x + 6y - 2z + 14 - 169 = 0$, that is $x^2 + y^2 + z^2 - 4x + 6y - 2z - 155 = 0$.`, sol: 'Find $CP^2$ first; it is the constant on the right of the squared form.', scheme: [['$CP^2 = 169$', 1], ['$(x - 2)^2 + (y + 3)^2 + (z - 1)^2 = 169$', 1], ['$x^2 + y^2 + z^2 - 4x + 6y - 2z - 155 = 0$', 1]], d: 3, c: 'application', t: [2], time: 130 }), (C) => {
    C.assert(r2 === 169 && S.sq === '(x - 2)^2 + (y + 3)^2 + (z - 1)^2 = 169' && S.gen === 'x^2 + y^2 + z^2 - 4x + 6y - 2z - 155 = 0' && S.con === -155 && S.lattice > 20, 'radius 13; expanded form agrees with the squared form at every lattice point tested'); C.model([169, 13, 155, 14]);
  });
}
{
  const A = [1, -4, 3], B = [7, 2, 9], pc = planeCut(A, B, 2);
  Q('s307', mk.short({ marks: 3, stem: r`The $xy$-plane meets the line through $A(1, -4, 3)$ and $B(7, 2, 9)$ at a point $P$. Find the ratio $AP : PB$, say whether $P$ lies between $A$ and $B$, and find the coordinates of $P$.`, model: r`On the $xy$-plane $z = 0$, so $AP : PB = -z_1 : z_2 = -3 : 9 = -1 : 3$. The ratio is negative, so $P$ divides $AB$ externally in the ratio $1 : 3$ and does not lie between $A$ and $B$ (both points are above the plane). Then $P = \left(\dfrac{1(7) - 3(1)}{1 - 3}, \dfrac{1(2) - 3(-4)}{1 - 3}, \dfrac{1(9) - 3(3)}{1 - 3}\right) = (-2, -7, 0)$.`, sol: 'Use $z = 0$ to get the ratio, read its sign, then apply the external formula.', scheme: [['Ratio $-3 : 9 = -1 : 3$', 1], ['External division, $P$ not between $A$ and $B$', 1], ['$P = (-2, -7, 0)$', 1]], d: 3, c: 'application', t: [3], time: 130 }), (C) => {
    C.assert(pc.text === '1 : 3' && !pc.internal && pc.P.join() === '-2,-7,0' && A[2] > 0 && B[2] > 0, 'external 1 : 3 at (-2, -7, 0); both points above the plane'); C.model([3, 9, 1, -2, -7, 0]);
  });
}
{
  const Pp = [-1, 4, 2], Qq = [3, -2, 5], Rr = [6, 1, -3], S = fourth(Pp, Qq, Rr);
  Q('s308', mk.short({ marks: 3, stem: r`Three consecutive vertices of a parallelogram $PQRS$ are $P(-1, 4, 2)$, $Q(3, -2, 5)$ and $R(6, 1, -3)$. Find the fourth vertex $S$ and verify that the diagonals $PR$ and $QS$ bisect each other.`, model: r`The diagonals bisect each other, so the mid-point of $PR$ equals the mid-point of $QS$. Mid-point of $PR$: $\left(\dfrac{-1 + 6}{2}, \dfrac{4 + 1}{2}, \dfrac{2 - 3}{2}\right) = \left(\dfrac{5}{2}, \dfrac{5}{2}, -\dfrac{1}{2}\right)$. With $S = (x, y, z)$: $\dfrac{3 + x}{2} = \dfrac{5}{2}$, $\dfrac{-2 + y}{2} = \dfrac{5}{2}$, $\dfrac{5 + z}{2} = -\dfrac{1}{2}$, so $S = (2, 7, -6)$. Check: the mid-point of $QS$ is $\left(\dfrac{5}{2}, \dfrac{5}{2}, -\dfrac{1}{2}\right)$.`, sol: 'Equate the mid-points of the two diagonals, then substitute $S$ back.', scheme: [['Mid-point of $PR$', 1], ['$S = (2, 7, -6)$', 1], ['Mid-point of $QS$ equals it', 1]], d: 3, c: 'application', t: [3], time: 130 }), (C) => {
    C.assert(S.join() === '2,7,-6' && mid(Pp, Rr).join() === '5/2,5/2,-1/2' && mid(Qq, S).join() === mid(Pp, Rr).join(), 'S = (2, 7, -6); both diagonals have mid-point (5/2, 5/2, -1/2)'); C.model([5, 2, 7, 6, 1]);
  });
}
{
  const A = [2, -1, 4], B = [8, 5, -2], t = onLine(A, B, [4, 1, 2]), P0 = sect(A, B, 1, 2);
  Q('s309', mk.short({ marks: 3, stem: r`The point $P(4, y, z)$ lies on the straight line through $A(2, -1, 4)$ and $B(8, 5, -2)$. Find $y$ and $z$, and the ratio $AP : PB$.`, model: r`Let $P$ divide $AB$ in the ratio $m : n$. Then $4 = \dfrac{8m + 2n}{m + n}$, so $4m + 4n = 8m + 2n$ and $2n = 4m$, giving $m : n = 1 : 2$. Then $y = \dfrac{1(5) + 2(-1)}{3} = 1$ and $z = \dfrac{1(-2) + 2(4)}{3} = 2$. So $P = (4, 1, 2)$ and $AP : PB = 1 : 2$.`, sol: 'The $x$-coordinate gives the ratio; the same ratio then fixes $y$ and $z$.', scheme: [['Ratio $1 : 2$ from the $x$-coordinate', 1], ['$y = 1$', 1], ['$z = 2$', 1]], d: 3, c: 'application', t: [3], time: 130 }), (C) => {
    C.assert(t.eq(Rat.of([1, 3])) && P0.join() === '4,1,2' && collinear(A, B, [4, 1, 2]) && dsq(A, [4, 1, 2]) * 4 === dsq([4, 1, 2], B), 'P = (4, 1, 2), one third of the way: AP : PB = 1 : 2'); C.model([4, 2, 1, 5]);
  });
}
{
  const A = [-6, 3, 9], B = [3, -6, 0], P1 = sect(A, B, 1, 2), P2 = sect(A, B, 2, 1);
  Q('s310', mk.short({ marks: 3, stem: r`Find the two points that divide the segment from $A(-6, 3, 9)$ to $B(3, -6, 0)$ into three equal parts.`, model: r`The first point $P_1$ has $AP_1 : P_1B = 1 : 2$: $P_1 = \left(\dfrac{1(3) + 2(-6)}{3}, \dfrac{1(-6) + 2(3)}{3}, \dfrac{1(0) + 2(9)}{3}\right) = (-3, 0, 6)$. The second point $P_2$ has $AP_2 : P_2B = 2 : 1$: $P_2 = \left(\dfrac{2(3) + 1(-6)}{3}, \dfrac{2(-6) + 1(3)}{3}, \dfrac{2(0) + 1(9)}{3}\right) = (0, -3, 3)$.`, sol: 'Trisection points divide the segment in the ratios $1 : 2$ and $2 : 1$.', scheme: [['Ratios $1 : 2$ and $2 : 1$', 1], ['$P_1 = (-3, 0, 6)$', 1], ['$P_2 = (0, -3, 3)$', 1]], d: 3, c: 'application', t: [3], time: 130 }), (C) => {
    C.assert(P1.join() === '-3,0,6' && P2.join() === '0,-3,3' && dsq(A, P1.map((v) => v.num())) === dsq(P1.map((v) => v.num()), P2.map((v) => v.num())) && dsq(P1.map((v) => v.num()), P2.map((v) => v.num())) === dsq(P2.map((v) => v.num()), B), 'trisection points (-3, 0, 6) and (0, -3, 3); the three parts have equal length'); C.model([1, 2, 6, 3]);
  });
}
{
  const V4 = [[6, -2, 4], [-2, 6, 0], [4, 2, -6], [0, -2, 2]], G = tetraCentroid(V4), F = centroid(V4[1], V4[2], V4[3]);
  Q('s311', mk.short({ marks: 3, stem: r`A tetrahedron has vertices $A(6, -2, 4)$, $B(-2, 6, 0)$, $C(4, 2, -6)$ and $D(0, -2, 2)$. Find its centroid $G$, find the centroid $F$ of the face $BCD$, and show that $G$ divides $AF$ in the ratio $3 : 1$ measured from $A$.`, model: r`The centroid of the tetrahedron is the average of the four vertices: $G = \left(\dfrac{6 - 2 + 4 + 0}{4}, \dfrac{-2 + 6 + 2 - 2}{4}, \dfrac{4 + 0 - 6 + 2}{4}\right) = (2, 1, 0)$. The centroid of face $BCD$ is $F = \left(\dfrac{-2 + 4 + 0}{3}, \dfrac{6 + 2 - 2}{3}, \dfrac{0 - 6 + 2}{3}\right) = \left(\dfrac{2}{3}, 2, -\dfrac{4}{3}\right)$. The point dividing $AF$ in the ratio $3 : 1$ is $\left(\dfrac{3(2/3) + 1(6)}{4}, \dfrac{3(2) + 1(-2)}{4}, \dfrac{3(-4/3) + 1(4)}{4}\right) = (2, 1, 0) = G$.`, sol: 'Average four vertices for $G$, three for $F$, then use the internal section formula with $3 : 1$.', scheme: [['$G = (2, 1, 0)$', 1], ['$F = \\left(\\dfrac{2}{3}, 2, -\\dfrac{4}{3}\\right)$', 1], ['The $3 : 1$ point on $AF$ is $G$', 1]], d: 4, c: 'analysis', t: [3], time: 160 }), (C) => {
    C.assert(G.join() === '2,1,0' && F.join() === '2/3,2,-4/3' && sect(V4[0], F, 3, 1).join() === '2,1,0', 'G = (2, 1, 0); F = (2/3, 2, -4/3); G divides AF as 3 : 1'); C.model([2, 1, 0, 3, 4, 6]);
  });
}
