// ISC 11 Mathematics ch15 Introduction to Three-Dimensional Geometry - true-false, fill-blank, numerical and 2-mark short-answer items.
import { Q, mk } from './lib.mjs';
import { r, pt, dsq, sqTex, octant, ROMAN, where, footPlane, footAxis, dsqAxis, sect, mid, centroid, triangleKind, collinear, Rat } from './space.mjs';
import { ext, planeCut, tetraCentroid } from './x3.mjs';

// ============================================================ true-false
Q('tf1', mk.tf({ stem: r`$(0, -2, 5)$ is a point of the $yz$-plane.`, key: 't', sol: r`Its $x$-coordinate is $0$ and its $y$- and $z$-coordinates are non-zero, so it lies in the $yz$-plane, away from every axis.`, d: 1, c: 'recall', t: [1], time: 35 }), (C) => {
  C.assert(where([0, -2, 5]) === 'yz-plane', 'x = 0 only: the yz-plane'); C.key('t');
});
Q('tf2', mk.tf({ stem: r`The point $(3, 2, 0)$ lies in the first octant.`, key: 'f', sol: r`A point belongs to an octant only when all three coordinates are non-zero. Here $z = 0$, so the point lies in the $xy$-plane, on the boundary between octant I and octant V.`, d: 2, c: 'understanding', t: [1], time: 45 }), (C) => {
  C.assert(octant([3, 2, 0]) === 0 && where([3, 2, 0]) === 'xy-plane' && octant([3, 2, 1]) === 1 && octant([3, 2, -1]) === 5, 'z = 0 means no octant; z = 1 gives octant I and z = -1 gives octant V'); C.key('f');
});
Q('tf3', mk.tf({ stem: r`The points $O(0, 0, 0)$, $A(3, 0, 0)$ and $B(0, 0, 4)$ form a right-angled triangle whose hypotenuse has length $5$.`, key: 't', sol: r`$OA = 3$, $OB = 4$ and $AB = \sqrt{9 + 0 + 16} = 5$. Since $3^2 + 4^2 = 5^2$, the right angle is at $O$ and $AB$ is the hypotenuse.`, d: 2, c: 'application', t: [2], time: 55 }), (C) => {
  const k = triangleKind([0, 0, 0], [3, 0, 0], [0, 0, 4]);
  C.assert(k.sorted.join() === '9,16,25' && k.right && !k.iso, 'squared sides 9, 16, 25: right-angled, hypotenuse 5'); C.key('t');
});
Q('tf4', mk.tf({ stem: r`Halfway between $(2, 5, -1)$ and $(8, -3, 7)$ lies the point $(10, 2, 6)$.`, key: 'f', sol: r`The mid-point averages the coordinates: $\left(\dfrac{2 + 8}{2}, \dfrac{5 - 3}{2}, \dfrac{-1 + 7}{2}\right) = (5, 1, 3)$. The point $(10, 2, 6)$ is the sum of the coordinates and has not been halved.`, d: 1, c: 'understanding', t: [3], time: 45 }), (C) => {
  C.assert(mid([2, 5, -1], [8, -3, 7]).join() === '5,1,3' && [10, 2, 6].join() !== '5,1,3', 'mid-point is (5, 1, 3)'); C.key('f');
});
Q('tf5', mk.tf({ stem: r`The tetrahedron with vertices $(0, 0, 0)$, $(8, 0, 0)$, $(0, 4, 0)$ and $(0, 0, 12)$ has its centroid at $(2, 1, 3)$.`, key: 't', sol: r`The centroid of four points is the average of their coordinates: $\left(\dfrac{0 + 8 + 0 + 0}{4}, \dfrac{0 + 0 + 4 + 0}{4}, \dfrac{0 + 0 + 0 + 12}{4}\right) = (2, 1, 3)$.`, d: 2, c: 'understanding', t: [3], time: 50 }), (C) => {
  C.assert(tetraCentroid([[0, 0, 0], [8, 0, 0], [0, 4, 0], [0, 0, 12]]).join() === '2,1,3', 'tetrahedron centroid (2, 1, 3), also dividing each vertex-to-face line 3 : 1'); C.key('t');
});

// ============================================================ fill-blank
Q('fb1', mk.fill({ stem: r`A point on the $y$-axis has its $x$-coordinate and its ____ coordinate both equal to $0$.`, acc: [['z']], sol: r`Every point of the $y$-axis has the form $(0, b, 0)$, so the $x$- and $z$-coordinates are $0$; the missing one is $z$.`, d: 1, c: 'recall', t: [1], time: 30 }), (C) => {
  C.assert(where([0, 7, 0]) === 'y-axis' && where([0, 7, 1]) !== 'y-axis' && where([1, 7, 0]) !== 'y-axis', 'a point (0, b, 0) is on the y-axis; making z or x non-zero leaves the axis'); C.blank('z');
});
Q('fb2', mk.fill({ stem: r`The point $(12, -5, 0)$ is ____ units away from the origin.`, acc: [['13']], sol: r`$\sqrt{12^2 + (-5)^2 + 0^2} = \sqrt{169} = 13$.`, d: 1, c: 'recall', t: [2], time: 35 }), (C) => {
  C.assert(dsq([0, 0, 0], [12, -5, 0]) === 169 && Math.hypot(12, -5, 0) === 13, 'distance squared 169, so 13'); C.blank(13);
});
Q('fb3', mk.fill({ stem: r`The point midway between $(-8, 5, 3)$ and $(2, -1, 9)$ has first coordinate ____.`, acc: [['-3']], sol: r`$\dfrac{-8 + 2}{2} = -3$.`, d: 1, c: 'recall', t: [3], time: 30 }), (C) => {
  C.assert(mid([-8, 5, 3], [2, -1, 9])[0].eq(-3), 'x of the mid-point is -3'); C.blank(-3);
});
Q('fb4', mk.fill({ stem: r`The triangle with vertices $(4, 7, -2)$, $(-1, 3, 5)$ and $(6, -4, 3)$ has its centroid at height $z =$ ____.`, acc: [['2']], sol: r`$z = \dfrac{-2 + 5 + 3}{3} = 2$.`, d: 2, c: 'understanding', t: [3], time: 45 }), (C) => {
  C.assert(centroid([4, 7, -2], [-1, 3, 5], [6, -4, 3]).join() === '3,2,2', 'centroid is (3, 2, 2)'); C.blank(2);
});
Q('fb5', mk.fill({ stem: r`The $zx$-plane cuts the segment joining $(2, -6, 1)$ and $(5, 3, 7)$ in the ratio $2 :$ ____.`, acc: [['1']], sol: r`On the $zx$-plane $y = 0$, so the ratio is $-y_1 : y_2 = 6 : 3 = 2 : 1$, and the blank is $1$.`, d: 3, c: 'application', t: [3], time: 55 }), (C) => {
  const pc = planeCut([2, -6, 1], [5, 3, 7], 1);
  C.assert(pc.text === '2 : 1' && pc.internal && pc.P.join() === '4,0,5', 'ratio 2 : 1 internal, at (4, 0, 5)'); C.blank(1);
});

// ============================================================ numerical
Q('n1', mk.num({ stem: r`Find the distance between $A(-2, 3, 5)$ and $B(4, 9, 8)$, in units.`, value: 9, unit: null, sol: r`$AB = \sqrt{6^2 + 6^2 + 3^2} = \sqrt{81} = 9$.`, scheme: [['$AB^2 = 36 + 36 + 9 = 81$ and $AB = 9$', 1]], marks: 1, d: 2, c: 'understanding', t: [2], time: 60 }), (C) => {
  C.assert(dsq([-2, 3, 5], [4, 9, 8]) === 81, 'AB^2 = 81'); C.val(9);
});
Q('n2', mk.num({ stem: r`The points $P(a, -1, 3)$ and $Q(2, 3, -5)$ are $12$ units apart. Find the positive value of $a$.`, value: 10, unit: null, sol: r`$(a - 2)^2 + 4^2 + (-8)^2 = 144$ gives $(a - 2)^2 = 64$, so $a - 2 = \pm 8$ and the positive value is $a = 10$.`, scheme: [['$(a - 2)^2 = 64$, so $a = 10$ or $a = -6$', 1]], marks: 1, d: 3, c: 'application', t: [2], time: 80 }), (C) => {
  const as = Array.from({ length: 41 }, (_, i) => i - 20).filter((a) => dsq([a, -1, 3], [2, 3, -5]) === 144);
  C.assert(as.join() === '-6,10', 'search over -20..20 gives a = -6 and a = 10'); C.val(10);
});
Q('n3', mk.num({ stem: r`Triangle $ABC$ has vertices $A(-3, 5, 5)$, $B(5, 1, -3)$ and $C(-3, 2, 1)$. Find its perimeter, in units.`, value: 26, unit: null, sol: r`$AB = \sqrt{64 + 16 + 64} = 12$, $BC = \sqrt{64 + 1 + 16} = 9$, $CA = \sqrt{0 + 9 + 16} = 5$, so the perimeter is $12 + 9 + 5 = 26$.`, scheme: [['The three sides $12$, $9$, $5$', 1]], marks: 1, d: 3, c: 'application', t: [2], time: 100 }), (C) => {
  const A = [-3, 5, 5], B = [5, 1, -3], Cc = [-3, 2, 1];
  C.assert([dsq(A, B), dsq(B, Cc), dsq(Cc, A)].join() === '144,81,25' && 12 + 9 + 5 === 26 && !triangleKind(A, B, Cc).right, 'squared sides 144, 81, 25: all perfect squares, perimeter 26'); C.val(26);
});
Q('n4', mk.num({ stem: r`For the point $P(8, -6, 24)$, find the difference between its distance from the origin and its distance from the $z$-axis, in units.`, value: 16, unit: null, sol: r`$OP = \sqrt{64 + 36 + 576} = 26$ and the distance from the $z$-axis is $\sqrt{64 + 36} = 10$, so the difference is $26 - 10 = 16$.`, scheme: [['$OP = 26$ and the $z$-axis distance $10$', 1]], marks: 1, d: 3, c: 'application', t: [1], time: 90 }), (C) => {
  C.assert(dsq([0, 0, 0], [8, -6, 24]) === 676 && dsqAxis([8, -6, 24], 'z') === 100 && 26 - 10 === 16, 'OP = 26, distance from the z-axis = 10'); C.val(16);
});
Q('n5', mk.num({ stem: r`The point $R$ divides the segment from $A(-4, 2, 3)$ to $B(5, -1, 6)$ externally in the ratio $AR : RB = 5 : 2$. Find the sum of the three coordinates of $R$.`, value: 16, unit: null, sol: r`$R = \left(\dfrac{5(5) - 2(-4)}{3}, \dfrac{5(-1) - 2(2)}{3}, \dfrac{5(6) - 2(3)}{3}\right) = (11, -3, 8)$, and $11 - 3 + 8 = 16$.`, scheme: [['$R = (11, -3, 8)$', 1]], marks: 1, d: 3, c: 'application', t: [3], time: 100 }), (C) => {
  const R = ext([-4, 2, 3], [5, -1, 6], 5, 2);
  C.assert(R.join() === '11,-3,8' && R.reduce((s, v) => s + v.num(), 0) === 16, 'external 5 : 2 gives (11, -3, 8)'); C.val(16);
});
Q('n6', mk.num({ stem: r`The centroid of triangle $ABC$ is $G(2, -1, 4)$, and $A$ and $B$ are $(3, 6, -2)$ and $(-1, -4, 9)$. Find the sum of the coordinates of $C$.`, value: 4, unit: null, sol: r`$C = 3G - A - B = (6 - 3 + 1, -3 - 6 + 4, 12 + 2 - 9) = (4, -5, 5)$, so the sum is $4 - 5 + 5 = 4$.`, scheme: [['$C = (4, -5, 5)$', 1]], marks: 1, d: 4, c: 'application', t: [3], time: 100 }), (C) => {
  const Cc = [0, 1, 2].map((i) => 3 * [2, -1, 4][i] - [3, 6, -2][i] - [-1, -4, 9][i]);
  C.assert(Cc.join() === '4,-5,5' && centroid([3, 6, -2], [-1, -4, 9], Cc).join() === '2,-1,4' && Cc.reduce((s, v) => s + v, 0) === 4, 'C = (4, -5, 5) gives centroid (2, -1, 4)'); C.val(4);
});

// ============================================================ short, 2 marks
{
  const Qp = [-8, 3, -6], Rp = [2, 5, -4];
  Q('s201', mk.short({ marks: 2, stem: r`Name the octant in which each of the points $Q(-8, 3, -6)$ and $R(2, 5, -4)$ lies, stating the signs of its coordinates.`, model: r`$Q$ has the signs $(-, +, -)$, so it is in octant VI. $R$ has the signs $(+, +, -)$, so it is in octant V.`, sol: 'Read the three signs, then match them with the octant table.', scheme: [['Signs of $Q$ and octant VI', 1], ['Signs of $R$ and octant V', 1]], d: 2, c: 'understanding', t: [1], time: 80 }), (C) => {
    C.assert(octant(Qp) === 6 && octant(Rp) === 5, 'Q in octant VI, R in octant V'); C.model(['VI', 'V']);
  });
}
{
  const P0 = [-5, 8, -3], a = footPlane(P0, 'xy'), b = footPlane(P0, 'yz'), c = footPlane(P0, 'zx');
  Q('s202', mk.short({ marks: 2, stem: r`Write down the feet of the perpendiculars drawn from $P(-5, 8, -3)$ to the $xy$-plane, the $yz$-plane and the $zx$-plane.`, model: r`Each foot keeps the two coordinates that are not zero in the plane and replaces the other by $0$. On the $xy$-plane: $(-5, 8, 0)$. On the $yz$-plane: $(0, 8, -3)$. On the $zx$-plane: $(-5, 0, -3)$.`, sol: 'Zero the one coordinate that is zero in the plane.', scheme: [['Foot on the $xy$-plane', 1], ['Feet on the $yz$- and $zx$-planes', 1]], d: 2, c: 'understanding', t: [1], time: 80 }), (C) => {
    C.assert(a.join() === '-5,8,0' && b.join() === '0,8,-3' && c.join() === '-5,0,-3' && dsq(P0, a) === 9 && dsq(P0, b) === 25 && dsq(P0, c) === 64, 'feet (-5, 8, 0), (0, 8, -3), (-5, 0, -3) at distances 3, 5, 8'); C.model([5, 8, 0, 3]);
  });
}
{
  const P0 = [6, -2, 3];
  Q('s203', mk.short({ marks: 2, stem: r`Find the distances of the point $P(6, -2, 3)$ from the $x$-axis, the $y$-axis and the $z$-axis.`, model: r`The distance from an axis is the square root of the sum of the squares of the other two coordinates. From the $x$-axis: $\sqrt{(-2)^2 + 3^2} = \sqrt{13}$. From the $y$-axis: $\sqrt{6^2 + 3^2} = \sqrt{45} = 3\sqrt{5}$. From the $z$-axis: $\sqrt{6^2 + (-2)^2} = \sqrt{40} = 2\sqrt{10}$.`, sol: 'Drop the coordinate along the axis, square and add the other two.', scheme: [['Distance from the $x$-axis: $\\sqrt{13}$', 1], ['Distances from the $y$- and $z$-axes', 1]], d: 3, c: 'application', t: [1], time: 100 }), (C) => {
    C.assert(dsqAxis(P0, 'x') === 13 && dsqAxis(P0, 'y') === 45 && dsqAxis(P0, 'z') === 40 && sqTex(45) === r`3\sqrt{5}` && sqTex(40) === r`2\sqrt{10}` && Math.abs(footAxis(P0, 'x').join() === '6,0,0' ? 0 : 1) === 0, 'sqrt 13, 3 sqrt 5, 2 sqrt 10'); C.model([13, 45, 40, 3, 2, 10]);
  });
}
{
  const A = [-5, 2, -7], B = [-1, -4, -3];
  Q('s204', mk.short({ marks: 2, stem: r`Find the distance between $A(-5, 2, -7)$ and $B(-1, -4, -3)$, leaving the answer as a simplified surd.`, model: r`$AB^2 = (-1 + 5)^2 + (-4 - 2)^2 + (-3 + 7)^2 = 16 + 36 + 16 = 68$, so $AB = \sqrt{68} = 2\sqrt{17}$.`, sol: 'Square the three differences, add, and simplify the root.', scheme: [['$AB^2 = 16 + 36 + 16 = 68$', 1], ['$AB = 2\\sqrt{17}$', 1]], d: 2, c: 'understanding', t: [2], time: 75 }), (C) => {
    C.assert(dsq(A, B) === 68 && sqTex(68) === r`2\sqrt{17}` && Math.abs(Math.hypot(4, -6, 4) - 2 * Math.sqrt(17)) < 1e-12, 'AB^2 = 68, AB = 2 sqrt 17'); C.model([16, 36, 68, 2, 17]);
  });
}
{
  const T1 = [[6, 2, 3], [3, 2, 4], [3, 5, -1]], k = triangleKind(...T1);
  Q('s205', mk.short({ marks: 2, stem: r`Show that the triangle with vertices $A(6, 2, 3)$, $B(3, 2, 4)$ and $C(3, 5, -1)$ is isosceles but not right-angled.`, model: r`$AB^2 = 9 + 0 + 1 = 10$, $BC^2 = 0 + 9 + 25 = 34$, $CA^2 = 9 + 9 + 16 = 34$. Since $BC = CA$ the triangle is isosceles. It is not right-angled because no two squared sides add up to the third: $10 + 34 = 44 \ne 34$ and $34 + 34 = 68 \ne 10$.`, sol: 'Find the three squared sides, then test the sums.', scheme: [['Squared sides $10$, $34$, $34$, so isosceles', 1], ['No pair of squared sides adds to the third', 1]], d: 3, c: 'application', t: [2], time: 100 }), (C) => {
    C.assert(k.sides.join() === '10,34,34' && k.iso && !k.right && !k.equi && 10 + 34 !== 34 && 34 + 34 !== 10, 'squared sides 10, 34, 34: isosceles, not right-angled'); C.model([10, 34, 44, 68]);
  });
}
{
  const A = [2, 1, -3], B = [-2, 5, 3], ss = Array.from({ length: 61 }, (_, i) => -10 + i / 3).filter((s) => Math.abs(dsq([0, s, 0], A) - dsq([0, s, 0], B)) < 1e-9);
  Q('s206', mk.short({ marks: 2, stem: r`Locate the point $T$ lying on the $y$-axis for which $TA = TB$, where $A$ is $(2, 1, -3)$ and $B$ is $(-2, 5, 3)$.`, model: r`Let the point be $P(0, s, 0)$. $PA^2 = 4 + (s - 1)^2 + 9$ and $PB^2 = 4 + (s - 5)^2 + 9$. Equating, $(s - 1)^2 = (s - 5)^2$, so $-2s + 1 = -10s + 25$ and $s = 3$. The point is $(0, 3, 0)$.`, sol: 'A point of the $y$-axis is $(0, s, 0)$; equate the squared distances.', scheme: [['$PA^2 = PB^2$ with $P(0, s, 0)$', 1], ['$s = 3$, so $P(0, 3, 0)$', 1]], d: 3, c: 'application', t: [2], time: 100 }), (C) => {
    C.assert(ss.join() === '3' && dsq([0, 3, 0], A) === 17 && dsq([0, 3, 0], B) === 17, 'search over steps of 1/3 gives only s = 3, with PA^2 = PB^2 = 17'); C.model([4, 9, 1, 5, 3]);
  });
}
{
  const Pm = [5, -4, -1], Mm = [1, -2, 3], Qp = Mm.map((m, i) => 2 * m - Pm[i]);
  Q('s207', mk.short({ marks: 2, stem: r`The mid-point of the segment $PQ$ is $(1, -2, 3)$ and $P$ is the point $(5, -4, -1)$. Find the coordinates of $Q$.`, model: r`Let $Q = (x, y, z)$. Then $\dfrac{5 + x}{2} = 1$, $\dfrac{-4 + y}{2} = -2$ and $\dfrac{-1 + z}{2} = 3$, so $x = -3$, $y = 0$ and $z = 7$. Hence $Q = (-3, 0, 7)$.`, sol: 'Use mid-point = average, then solve each coordinate for $Q$.', scheme: [['Three mid-point equations', 1], ['$Q = (-3, 0, 7)$', 1]], d: 2, c: 'understanding', t: [3], time: 80 }), (C) => {
    C.assert(Qp.join() === '-3,0,7' && mid(Pm, Qp).join() === Mm.join(), 'Q = (-3, 0, 7) has mid-point (1, -2, 3) with P'); C.model([-3, 0, 7]);
  });
}
{
  const P0 = [4, -1, 3], Qp = [6, 2, -2], R = ext(P0, Qp, 2, 1);
  Q('s208', mk.short({ marks: 2, stem: r`Find the point $R$ that divides the segment from $P(4, -1, 3)$ to $Q(6, 2, -2)$ externally in the ratio $PR : RQ = 2 : 1$.`, model: r`For external division, $R = \left(\dfrac{2(6) - 1(4)}{2 - 1}, \dfrac{2(2) - 1(-1)}{2 - 1}, \dfrac{2(-2) - 1(3)}{2 - 1}\right) = (8, 5, -7)$.`, sol: 'Use $m x_2 - n x_1$ over $m - n$ with $m = 2$, $n = 1$.', scheme: [['External section formula with $m = 2$, $n = 1$', 1], ['$R = (8, 5, -7)$', 1]], d: 3, c: 'application', t: [3], time: 90 }), (C) => {
    C.assert(R.join() === '8,5,-7' && dsq(P0, R.map((v) => v.num())) === 4 * dsq(R.map((v) => v.num()), Qp), 'R = (8, 5, -7) lies beyond Q with PR = 2 RQ'); C.model([8, 5, -7, 2, 1]);
  });
}
{
  const A = [2, -1, 4], B = [8, 3, -6], pc = planeCut(A, B, 0);
  Q('s209', mk.short({ marks: 2, stem: r`In what ratio does the $yz$-plane divide the segment joining $A(2, -1, 4)$ and $B(8, 3, -6)$? State whether the division is internal or external.`, model: r`On the $yz$-plane $x = 0$, so $AP : PB = -x_1 : x_2 = -2 : 8 = -1 : 4$. The ratio is negative because $x_1$ and $x_2$ have the same sign, so the division is external, in the ratio $1 : 4$.`, sol: 'Put $x = 0$ in the section formula and read the sign of the ratio.', scheme: [['Ratio $-x_1 : x_2 = -1 : 4$', 1], ['External division in the ratio $1 : 4$', 1]], d: 3, c: 'application', t: [3], time: 90 }), (C) => {
    C.assert(pc.text === '1 : 4' && !pc.internal && pc.P.join() === '0,-7/3,22/3', 'external 1 : 4 at (0, -7/3, 22/3)'); C.model([2, 8, 1, 4]);
  });
}
{
  const V3 = [[-2, 1, 6], [4, -7, 3], [7, 3, -3]], G = centroid(...V3);
  Q('s210', mk.short({ marks: 2, stem: r`Find the centroid of the triangle whose vertices are $(-2, 1, 6)$, $(4, -7, 3)$ and $(7, 3, -3)$.`, model: r`The sums of the coordinates are $-2 + 4 + 7 = 9$, $1 - 7 + 3 = -3$ and $6 + 3 - 3 = 6$. Dividing each by $3$, the centroid is $(3, -1, 2)$.`, sol: 'Average each coordinate of the three vertices.', scheme: [['Sums $9$, $-3$, $6$ of the coordinates', 1], ['Centroid $(3, -1, 2)$', 1]], d: 2, c: 'understanding', t: [3], time: 80 }), (C) => {
    C.assert(G.join() === '3,-1,2', 'centroid (3, -1, 2)'); C.model([9, -3, 6, 3, -1, 2]);
  });
}
