// CBSE 11 Mathematics ch11 Introduction to Three-dimensional Geometry — objective items (mcq, assertion-reason, true-false,
// fill-blank, numerical) with independent re-solve checks. Octants, feet, images, distances (exact surds), collinearity,
// triangle types and section points are all computed in space.mjs; distractors come from the plausible wrong method.
import { Q, mk } from './lib.mjs';
import { Rat, r, must, near, tx, pt, dsq, sqTex, dTex, dNum, octant, ROMAN, where, footPlane, footAxis, dsqAxis, reflectPlane, reflectAxis, reflectOrigin, sect, mid, centroid, planeRatio, ratioTex, collinear, triangleKind, N } from './space.mjs';

export { r };
const P$ = (p) => `$${pt(p)}$`;
const nums = (arr) => arr.map((p) => p.map(N));

// =============================================================== MCQ
Q('m01', mk.mcq({ stem: r`Among the three coordinate planes of three-dimensional space, the one that contains both the $y$-axis and the $z$-axis is the`, opts: ['$yz$-plane', '$xy$-plane', '$zx$-plane', r`plane $y = z$`], key: 'a', sol: r`A point lies in the plane that holds the $y$-axis and the $z$-axis exactly when its $x$-coordinate is $0$, so that plane is the $yz$-plane. The $xy$-plane holds the $x$- and $y$-axes, the $zx$-plane holds the $z$- and $x$-axes, and $y = z$ is not a coordinate plane at all.`, d: 1, c: 'recall', t: [1], time: 45 }), (Cx) => {
  Cx.assert(where([0, 3, -4]) === 'yz-plane' && where([2, 3, 0]) === 'xy-plane' && where([2, 0, 3]) === 'zx-plane', 'x = 0 is the yz-plane');
  Cx.which(['yz', 'xy', 'zx', 'y=z'], 'yz');
});
Q('m02', mk.mcq({ stem: r`The point $(0, -5, 0)$ lies on which of the coordinate axes?`, opts: ['$y$-axis', '$x$-axis', '$z$-axis', 'none of the three axes'], key: 'a', sol: r`Two of its coordinates are $0$ (the $x$- and the $z$-coordinate), so it lies on the axis of the remaining coordinate, the $y$-axis, $5$ units on the negative side of the origin.`, d: 1, c: 'recall', t: [1], time: 45 }), (Cx) => {
  Cx.assert(where([0, -5, 0]) === 'y-axis', 'on the y-axis');
  Cx.which(['y-axis', 'x-axis', 'z-axis', 'none'], 'y-axis');
});
{
  const P = [-3, 4, -2], vals = [octant(P), octant([-P[0], P[1], P[2]]), octant([P[0], -P[1], P[2]]), octant([P[0], P[1], -P[2]])];
  Q('m03', mk.mcq({ stem: r`In which octant does the point $(-3, 4, -2)$ lie?`, opts: vals.map((v) => `octant ${ROMAN[v]}`), key: 'a', sol: r`The signs of $(x, y, z)$ are $(-, +, -)$, which is the pattern of octant VI. Changing one sign gives a neighbouring octant: octant V if $x$ were positive, octant VII if $y$ were negative, and octant II if $z$ were positive.`, d: 2, c: 'understanding', t: [1], time: 60 }), (Cx) => {
    Cx.assert(vals.join() === '6,5,7,2', 'octants VI, V, VII, II');
    Cx.which(vals, 6);
  });
}
{
  const P = [5, -2, 7], opts = [reflectPlane(P, 'xy'), reflectAxis(P, 'z'), reflectPlane(P, 'zx'), reflectOrigin(P)];
  Q('m04', mk.mcq({ stem: r`The image of the point $P(5, -2, 7)$ in the $xy$-plane is`, opts: opts.map(P$), key: 'a', sol: r`Reflection in the $xy$-plane changes only the sign of the $z$-coordinate, so the image is $(5, -2, -7)$. The point $(-5, 2, 7)$ is the image in the $z$-axis, $(5, 2, 7)$ the image in the $zx$-plane, and $(-5, 2, -7)$ the image in the origin.`, d: 2, c: 'understanding', t: [1], time: 60 }), (Cx) => {
    Cx.assert(opts[0].join() === '5,-2,-7' && opts[1].join() === '-5,2,7' && opts[2].join() === '5,2,7' && opts[3].join() === '-5,2,-7', 'images');
    Cx.which(nums(opts), [5, -2, -7]);
  });
}
{
  const P = [3, -4, 12], d = dNum([0, 0, 0], P), vals = [d, dsq([0, 0, 0], P), P[0] + P[1] + P[2], Math.abs(P[0]) + Math.abs(P[1]) + Math.abs(P[2])];
  Q('m05', mk.mcq({ stem: r`A point in space has coordinates $(3, -4, 12)$. How far is it from the origin $O$ of the three coordinate axes?`, opts: vals.map(String), key: 'a', sol: r`$OP = \sqrt{3^2 + (-4)^2 + 12^2} = \sqrt{9 + 16 + 144} = \sqrt{169} = 13$. Stopping at $169$ forgets the square root, $3 - 4 + 12 = 11$ adds the coordinates instead of their squares, and $3 + 4 + 12 = 19$ adds their absolute values.`, d: 2, c: 'application', t: [2], time: 60 }), (Cx) => {
    Cx.assert(dsq([0, 0, 0], P) === 169 && d === 13 && vals.join() === '13,169,11,19', 'OP = 13');
    Cx.which(vals, 13);
  });
}
{
  const A = [3, -2, 5], B = [7, 2, 7], s = [dsq(A, B), dsq(A, B) ** 2, 4 + 4 + 2, 32], vals = [Math.sqrt(s[0]), s[0], s[2], Math.sqrt(s[3])];
  Q('m06', mk.mcq({ stem: r`In three-dimensional space, the straight-line gap from $A(3, -2, 5)$ to $B(7, 2, 7)$ equals`, opts: ['$6$', '$36$', '$10$', `$${sqTex(32)}$`], key: 'a', sol: r`The differences are $4$, $4$, $2$, so $AB^2 = 16 + 16 + 4 = 36$ and $AB = 6$. The value $36$ is $AB^2$, the value $10$ adds the differences $4 + 4 + 2$, and $4\sqrt{2}$ leaves out the $z$-difference.`, d: 2, c: 'application', t: [2], time: 75 }), (Cx) => {
    Cx.assert(dsq(A, B) === 36 && dTex(A, B) === '6' && sqTex(32) === '4\\sqrt{2}', 'AB = 6');
    Cx.which(vals, 6);
  });
}
{
  const pts = [[-2, -5, 1], [2, -5, 1], [-2, 5, 1], [-2, -5, -1]], oc = pts.map(octant);
  Q('m07', mk.mcq({ stem: r`Exactly one of the four points listed lies in the third octant. Which one?`, opts: pts.map(P$), key: 'a', sol: r`The third octant has the sign pattern $(-, -, +)$. Only $(-2, -5, 1)$ matches. The other points are in octant IV $(+, -, +)$, octant II $(-, +, +)$ and octant VII $(-, -, -)$.`, d: 2, c: 'understanding', t: [1], time: 60 }), (Cx) => {
    Cx.assert(oc.join() === '3,4,2,7', 'octants III, IV, II, VII');
    Cx.which(oc, 3);
  });
}
{
  const P = [-4, 7, -3], vals = [Math.sqrt(dsqAxis(P, 'y')), 7, Math.sqrt(dsq([0, 0, 0], P)), 4];
  Q('m08', mk.mcq({ stem: r`The distance of the point $P(-4, 7, -3)$ from the $y$-axis is`, opts: ['$5$', '$7$', `$${sqTex(dsq([0, 0, 0], P))}$`, '$4$'], key: 'a', sol: r`The foot of the perpendicular on the $y$-axis is $(0, 7, 0)$, so the distance is $\sqrt{(-4)^2 + (-3)^2} = \sqrt{25} = 5$: the $y$-coordinate plays no part. The value $7$ is the $y$-coordinate, $\sqrt{74}$ is the distance from the origin, and $4$ is the distance from the $yz$-plane.`, d: 3, c: 'application', t: [1], time: 75 }), (Cx) => {
    Cx.assert(dsqAxis(P, 'y') === 25 && footAxis(P, 'y').join() === '0,7,0' && dsq([0, 0, 0], P) === 74, 'distance from the y-axis is 5');
    Cx.which(vals, 5);
  });
}
{
  const P = [6, -8, 3], vals = [Math.abs(P[1]), P[0], P[2], Math.sqrt(dsqAxis(P, 'z'))];
  Q('m09', mk.mcq({ stem: r`The perpendicular distance of the point $(6, -8, 3)$ from the $zx$-plane is`, opts: vals.map((v) => `$${v}$`), key: 'a', sol: r`The $zx$-plane is $y = 0$, so the distance is $|y| = |-8| = 8$. The numbers $6$ and $3$ are the distances from the $yz$-plane and the $xy$-plane, and $10 = \sqrt{6^2 + (-8)^2}$ is the distance from the $z$-axis.`, d: 2, c: 'understanding', t: [1], time: 60 }), (Cx) => {
    Cx.assert(Number(tx(P[1])) === -8 && footPlane(P, 'zx').join() === '6,0,3' && dsqAxis(P, 'z') === 100, 'distance 8');
    Cx.which(vals, 8);
  });
}
{
  const P = [4, -3, 6], opts = [footAxis(P, 'x'), footPlane(P, 'yz'), footAxis(P, 'y'), footPlane(P, 'xy')];
  Q('m10', mk.mcq({ stem: r`The foot of the perpendicular drawn from the point $P(4, -3, 6)$ to the $x$-axis is`, opts: opts.map(P$), key: 'a', sol: r`A point of the $x$-axis has the form $(t, 0, 0)$, and the perpendicular from $P$ meets it at the point with the same $x$-coordinate, $(4, 0, 0)$. The point $(0, -3, 6)$ is the foot on the $yz$-plane, $(0, -3, 0)$ the foot on the $y$-axis and $(4, -3, 0)$ the foot on the $xy$-plane.`, d: 2, c: 'understanding', t: [1], time: 60 }), (Cx) => {
    Cx.assert(opts.map((p) => p.join()).join('|') === '4,0,0|0,-3,6|0,-3,0|4,-3,0', 'feet');
    Cx.which(nums(opts), [4, 0, 0]);
  });
}
{
  const A = [-4, 7, 2], B = [10, -3, 8], M = mid(A, B), opts = [M, [A[0] + B[0], A[1] + B[1], A[2] + B[2]], [(B[0] - A[0]) / 2, (B[1] - A[1]) / 2, (B[2] - A[2]) / 2], [B[0] - A[0], B[1] - A[1], B[2] - A[2]]];
  Q('m11', mk.mcq({ stem: r`The mid-point of the segment joining $A(-4, 7, 2)$ and $B(10, -3, 8)$ is`, opts: opts.map(P$), key: 'a', sol: r`The mid-point averages each pair of coordinates: $\left(\dfrac{-4 + 10}{2}, \dfrac{7 - 3}{2}, \dfrac{2 + 8}{2}\right) = (3, 2, 5)$. The point $(6, 4, 10)$ forgets to halve the sums, $(7, -5, 3)$ halves the differences, and $(14, -10, 6)$ is the vector from $A$ to $B$.`, d: 2, c: 'understanding', t: [3], time: 60 }), (Cx) => {
    Cx.assert(M.join() === '3,2,5' && opts[1].join() === '6,4,10' && opts[2].join() === '7,-5,3' && opts[3].join() === '14,-10,6', 'mid-point (3, 2, 5)');
    Cx.which(nums(opts), [3, 2, 5]);
  });
}
{
  const A = [3, -6, 9], B = [-6, 3, 0], P = sect(A, B, 1, 2), opts = [P, sect(A, B, 2, 1), [P[0].mul(3), P[1].mul(3), P[2].mul(3)], mid(A, B)];
  Q('m12', mk.mcq({ stem: r`The point $P$ lies on the segment from $A(3, -6, 9)$ to $B(-6, 3, 0)$ with $AP : PB = 1 : 2$. The coordinates of $P$ are`, opts: opts.map(P$), key: 'a', sol: r`With $m = 1$ and $n = 2$, each coordinate is $\dfrac{1\cdot(\text{end of } B) + 2\cdot(\text{end of } A)}{3}$: $x = \dfrac{-6 + 6}{3} = 0$, $y = \dfrac{3 - 12}{3} = -3$, $z = \dfrac{0 + 18}{3} = 6$. Swapping the ratio gives $(-3, 0, 3)$, leaving out the division by $m + n$ gives $(0, -9, 18)$, and the mid-point is $\left(-\dfrac{3}{2}, -\dfrac{3}{2}, \dfrac{9}{2}\right)$.`, d: 3, c: 'application', t: [3], time: 90 }), (Cx) => {
    Cx.assert(P.join() === '0,-3,6' && opts[1].join() === '-3,0,3' && opts[2].join() === '0,-9,18', 'P = (0, -3, 6)');
    Cx.which(nums(opts), [0, -3, 6]);
  });
}
{
  const A = [1, 0, -2], B = [3, 4, 0], ks = [2, 4, 6, 0], good = ks.filter((k) => collinear(A, B, [5, 8, k]));
  Q('m13', mk.mcq({ stem: r`The points $A(1, 0, -2)$, $B(3, 4, 0)$ and $C(5, 8, k)$ are collinear. The value of $k$ is`, opts: ks.map((k) => `$${k}$`), key: 'a', sol: r`$\vec{AB} = (2, 4, 2)$ and $\vec{AC} = (4, 8, k + 2)$. For collinear points $\vec{AC} = 2\,\vec{AB} = (4, 8, 4)$, so $k + 2 = 4$ and $k = 2$. Forgetting the $+2$ gives $k = 4$.`, d: 3, c: 'application', t: [2], time: 90 }), (Cx) => {
    Cx.assert(good.join() === '2', 'only k = 2 makes A, B, C collinear');
    Cx.which(ks, 2);
  });
}
{
  const A = [2, 1, 3], B = [4, 5, 5], C = [6, 3, 5], tk = triangleKind(A, B, C);
  Q('m14', mk.mcq({ stem: r`Points $A(2, 1, 3)$, $B(4, 5, 5)$ and $C(6, 3, 5)$ are the corners of a triangle. Which description is correct?`, opts: ['isosceles but not right-angled', 'equilateral', 'right-angled but not isosceles', 'isosceles and right-angled'], key: 'a', sol: r`$AB^2 = 4 + 16 + 4 = 24$, $AC^2 = 16 + 4 + 4 = 24$ and $BC^2 = 4 + 4 + 0 = 8$. Two sides are equal, so it is isosceles; the three sides are not all equal, and $24 + 8 \ne 24$, $24 + 24 \ne 8$ show that no angle is a right angle.`, d: 3, c: 'application', t: [2], time: 90 }), (Cx) => {
    Cx.assert(tk.sides.join() === '24,8,24' && tk.kind === 'isosceles' && !tk.right && !tk.equi, 'isosceles, not right');
    Cx.which(['isosceles', 'equilateral', 'right-angled', 'isosceles right-angled'], tk.kind);
  });
}
{
  const opts = [[-6, 0, -4], [6, 0, 4], [0, -6, -4], [-4, 0, -6]], P = opts[0];
  Q('m15', mk.mcq({ stem: r`A point lies in the $zx$-plane, $6$ units from the $yz$-plane on the negative side of the $x$-axis, and $4$ units below the $xy$-plane. Its coordinates are`, opts: opts.map(P$), key: 'a', sol: r`In the $zx$-plane the $y$-coordinate is $0$. The distance from the $yz$-plane is $|x| = 6$ with $x$ negative, so $x = -6$; the distance from the $xy$-plane is $|z| = 4$ with $z$ below the plane, so $z = -4$. The point is $(-6, 0, -4)$; the others swap or flip signs, or place the point in the wrong plane.`, d: 2, c: 'application', t: [1], time: 75 }), (Cx) => {
    Cx.assert(where(P) === 'zx-plane' && Math.abs(P[0]) === 6 && P[0] < 0 && Math.abs(P[2]) === 4 && P[2] < 0, '(-6, 0, -4)');
    Cx.which(nums(opts), [-6, 0, -4]);
  });
}
{
  const A = [-4, 1, 6], B = [6, -3, 2], pr = planeRatio(A, B, 0), P = sect(A, B, 2, 3);
  Q('m16', mk.mcq({ stem: r`The $yz$-plane divides the segment joining $A(-4, 1, 6)$ and $B(6, -3, 2)$ in the ratio $AP : PB =$`, opts: ['$2 : 3$', '$3 : 2$', '$1 : 2$', '$2 : 1$'], key: 'a', sol: r`On the $yz$-plane $x = 0$. If the ratio is $k : 1$, then $\dfrac{6k - 4}{k + 1} = 0$, so $k = \dfrac{2}{3}$ and the ratio is $2 : 3$. Check: with $m = 2$, $n = 3$ the $x$-coordinate is $\dfrac{12 - 12}{5} = 0$. The ratio $3 : 2$ is the same ratio taken from $B$.`, d: 3, c: 'application', t: [3], time: 90 }), (Cx) => {
    Cx.assert(pr.m === 4 && pr.n === 6 && pr.valid && ratioTex(pr.m, pr.n) === '2 : 3' && P[0].isZero(), 'ratio 2 : 3');
    Cx.which(['2 : 3', '3 : 2', '1 : 2', '2 : 1'], ratioTex(pr.m, pr.n));
  });
}
{
  const P0 = [2, -2, 3], ks = Array.from({ length: 41 }, (_, i) => i - 20).filter((k) => dsq([k, 2, -1], P0) === 36), opts = [ks.reduce((s, k) => s + k, 0), 2, 8, 6];
  Q('m17', mk.mcq({ stem: r`Two points are $P(k, 2, -1)$ and $Q(2, -2, 3)$, and the distance $PQ$ is $6$ units. The sum of all possible values of $k$ is`, opts: opts.map((v) => `$${v}$`), key: 'a', sol: r`$PQ^2 = (k - 2)^2 + 16 + 16 = 36$, so $(k - 2)^2 = 4$ and $k - 2 = \pm 2$, giving $k = 4$ or $k = 0$. Their sum is $4$. Counting the root $k = 4$ twice gives $8$.`, d: 3, c: 'application', t: [2], time: 90 }), (Cx) => {
    Cx.assert(ks.join() === '0,4' && opts[0] === 4, 'k = 0 or 4');
    Cx.which(opts, 4);
  });
}
{
  const Pn = [2, 3, 6], zs = Array.from({ length: 61 }, (_, i) => i - 30).filter((z) => dsq([0, 0, z], Pn) === 49), opts = [12, 6, 13, -12];
  Q('m18', mk.mcq({ stem: r`A point $T$ on the $z$-axis lies above the $xy$-plane and is $7$ units from the point $P(2, 3, 6)$. The coordinates of $T$ are`, opts: opts.map((z) => `$(0, 0, ${z})$`), key: 'a', sol: r`Write $T(0, 0, z)$ with $z > 0$. Then $TP^2 = 4 + 9 + (z - 6)^2 = 49$, so $(z - 6)^2 = 36$ and $z = 12$ or $z = 0$. Only $z = 12$ is above the $xy$-plane. The value $z = 6$ is the height of $P$ itself.`, d: 4, c: 'analysis', t: [2], time: 120 }), (Cx) => {
    Cx.assert(zs.join() === '0,12' && zs.filter((z) => z > 0).join() === '12', 'z = 12');
    Cx.which(opts, 12);
  });
}

// =============================================================== assertion-reason
Q('ar1', mk.ar({ a: r`The image of the point $(4, -1, 2)$ in the $yz$-plane is $(-4, -1, 2)$.`, r: r`Reflection in the $yz$-plane changes the sign of the $x$-coordinate and leaves the $y$- and $z$-coordinates unchanged.`, key: 'a', sol: r`R is true: the $yz$-plane is $x = 0$, and the mirror image of a point has the same $y$ and $z$ but the opposite $x$. Applying R to $(4, -1, 2)$ gives $(-4, -1, 2)$, which is A, so R explains A.`, d: 2, c: 'understanding', t: [1] }), (Cx) => { Cx.assert(reflectPlane([4, -1, 2], 'yz').join() === '-4,-1,2', 'image (-4, -1, 2)'); Cx.key('a'); });
Q('ar2', mk.ar({ a: r`The point $(0, 4, -3)$ lies on the $y$-axis.`, r: r`Every point of the $y$-axis has its $x$-coordinate and its $z$-coordinate equal to $0$.`, key: 'd', sol: r`R is true: the $y$-axis is the set of points $(0, b, 0)$. For $(0, 4, -3)$ the $z$-coordinate is $-3 \ne 0$, so the point is in the $yz$-plane but not on the $y$-axis, and A is false.`, d: 2, c: 'understanding', t: [1] }), (Cx) => { Cx.assert(where([0, 4, -3]) === 'yz-plane' && where([0, 4, 0]) === 'y-axis', 'A false, R true'); Cx.key('d'); });
Q('ar3', mk.ar({ a: r`The distance of the point $(2, -3, 6)$ from the origin is $7$ units.`, r: r`The distance of a point $(x, y, z)$ from the origin is $|x| + |y| + |z|$.`, key: 'c', sol: r`A is true: $\sqrt{4 + 9 + 36} = \sqrt{49} = 7$. R is false: the distance is $\sqrt{x^2 + y^2 + z^2}$, and $|x| + |y| + |z| = 2 + 3 + 6 = 11$ gives the wrong value here.`, d: 3, c: 'understanding', t: [2] }), (Cx) => { Cx.assert(dsq([0, 0, 0], [2, -3, 6]) === 49 && 2 + 3 + 6 === 11, 'A true, R false'); Cx.key('c'); });
Q('ar4', mk.ar({ a: r`The point $(2, -3, 5)$ lies in the fourth octant.`, r: r`The first octant is the region of space in which all three coordinates are positive.`, key: 'b', sol: r`A is true: the signs $(+, -, +)$ are those of octant IV. R is also true, since octant I is the one with all coordinates positive. But R only tells us where numbering starts; it does not say why $(+, -, +)$ is the fourth octant, so R is not the explanation.`, d: 3, c: 'understanding', t: [1] }), (Cx) => { Cx.assert(octant([2, -3, 5]) === 4 && octant([1, 1, 1]) === 1, 'octant IV'); Cx.key('b'); });
Q('ar5', mk.ar({ a: r`The mid-point of the segment joining $(-2, 4, 6)$ and $(8, -6, 0)$ is $(3, -1, 3)$.`, r: r`The mid-point divides a segment internally in the ratio $1 : 1$, so each of its coordinates is the average of the corresponding end coordinates.`, key: 'a', sol: r`R is the section formula with $m = n = 1$. Using it: $\dfrac{-2 + 8}{2} = 3$, $\dfrac{4 - 6}{2} = -1$, $\dfrac{6 + 0}{2} = 3$, which is A, so R explains A.`, d: 2, c: 'understanding', t: [3] }), (Cx) => { Cx.assert(mid([-2, 4, 6], [8, -6, 0]).join() === '3,-1,3', 'mid-point (3, -1, 3)'); Cx.key('a'); });
{
  const O = [0, 0, 0], K = [2, 3, 6], L = [6, 9, 19];
  Q('ar6', mk.ar({ a: r`The points $J(0, 0, 0)$, $K(2, 3, 6)$ and $L(6, 9, 19)$ lie on one straight line.`, r: r`Three points are collinear when the largest of their three mutual distances equals the sum of the other two.`, key: 'd', sol: r`R is true. For the points: $JK = 7$, $KL = \sqrt{16 + 36 + 169} = \sqrt{221} \approx 14.87$ and $JL = \sqrt{36 + 81 + 361} = \sqrt{478} \approx 21.86$. Since $7 + 14.87 = 21.87$ is close to but not equal to $21.86$, the exact test fails: $JL^2 = 478$ while $(7 + \sqrt{221})^2 = 270 + 14\sqrt{221} \ne 478$. So A is false.`, d: 4, c: 'analysis', t: [2] }), (Cx) => {
    Cx.assert(!collinear(O, K, L) && dsq(O, K) === 49 && dsq(K, L) === 221 && dsq(O, L) === 478 && Math.abs(7 + Math.sqrt(221) - Math.sqrt(478)) < 0.02 && 270 + 14 * Math.sqrt(221) !== 478 && !(Math.abs(270 + 14 * Math.sqrt(221) - 478) < 1e-9), 'near-miss: not collinear');
    Cx.assert(Math.abs(Math.sqrt(221) - 14.866) < 0.001 && Math.abs(Math.sqrt(478) - 21.863) < 0.001 && Math.abs(7 + Math.sqrt(221) - 21.866) < 0.001, 'decimals 14.87, 21.86, 21.87');
    Cx.key('d');
  });
}

// =============================================================== true-false
Q('tf1', mk.tf({ stem: r`The point $(-4, 0, 7)$ lies in the $zx$-plane.`, key: 't', sol: r`Its $y$-coordinate is $0$, and the $zx$-plane is exactly the set of points with $y = 0$, so the statement is true.`, d: 1, c: 'recall', t: [1] }), (Cx) => { Cx.assert(where([-4, 0, 7]) === 'zx-plane', 'zx-plane'); Cx.key('t'); });
Q('tf2', mk.tf({ stem: r`The points $(1, 0, 0)$, $(0, 1, 0)$ and $(0, 0, 1)$ are the vertices of an equilateral triangle.`, key: 't', sol: r`Each pair of points has a squared distance $1 + 1 + 0 = 2$, so all three sides equal $\sqrt{2}$, and the triangle is equilateral.`, d: 2, c: 'application', t: [2] }), (Cx) => { const tk = triangleKind([1, 0, 0], [0, 1, 0], [0, 0, 1]); Cx.assert(tk.sides.join() === '2,2,2' && tk.equi, 'equilateral, side root 2'); Cx.key('t'); });
Q('tf3', mk.tf({ stem: r`The point $(3, -1, 2)$ is closer to the $yz$-plane than it is to the $xy$-plane.`, key: 'f', sol: r`The distance from the $yz$-plane is $|x| = 3$ and the distance from the $xy$-plane is $|z| = 2$. Since $3 > 2$ the point is farther from the $yz$-plane, so the statement is false.`, d: 2, c: 'understanding', t: [1] }), (Cx) => { Cx.assert(3 > 2 && Math.abs(3) === 3 && Math.abs(2) === 2, '3 > 2'); Cx.key('f'); });
Q('tf4', mk.tf({ stem: r`The origin $O(0, 0, 0)$ belongs to the first octant.`, key: 'f', sol: r`An octant contains only points with all three coordinates non-zero and of a fixed sign pattern. The origin has all coordinates zero, so it lies on every axis and every plane and belongs to no octant.`, d: 2, c: 'understanding', t: [1] }), (Cx) => { Cx.assert(octant([0, 0, 0]) === 0 && where([0, 0, 0]) === 'origin', 'origin is in no octant'); Cx.key('f'); });
{
  const G = centroid([3, 0, 0], [0, 6, 0], [0, 0, 9]);
  Q('tf5', mk.tf({ stem: r`The centroid of the triangle with vertices $(3, 0, 0)$, $(0, 6, 0)$ and $(0, 0, 9)$ is $(1, 2, 3)$.`, key: 't', sol: r`The centroid averages the three vertices: $\left(\dfrac{3 + 0 + 0}{3}, \dfrac{0 + 6 + 0}{3}, \dfrac{0 + 0 + 9}{3}\right) = (1, 2, 3)$, so the statement is true.`, d: 2, c: 'application', t: [3] }), (Cx) => { Cx.assert(G.join() === '1,2,3', 'centroid (1, 2, 3)'); Cx.key('t'); });
}

// =============================================================== fill in the blank
Q('fb1', mk.fill({ stem: r`The foot of the perpendicular from the point $(5, -3, 8)$ to the $yz$-plane has $z$-coordinate ___.`, acc: [['8']], sol: r`The foot on the $yz$-plane keeps $y$ and $z$ and replaces $x$ by $0$, giving $(0, -3, 8)$, so the blank is $8$.`, d: 1, c: 'recall', t: [1] }), (Cx) => { Cx.assert(footPlane([5, -3, 8], 'yz').join() === '0,-3,8', 'foot (0, -3, 8)'); Cx.blank(8); });
Q('fb2', mk.fill({ stem: r`The point on the $z$-axis that is $5$ units from the origin on the negative side has $z$-coordinate ___.`, acc: [['-5']], sol: r`A point of the $z$-axis is $(0, 0, z)$ and its distance from the origin is $|z|$. With $|z| = 5$ on the negative side, $z = -5$.`, d: 1, c: 'recall', t: [1] }), (Cx) => { Cx.assert(where([0, 0, -5]) === 'z-axis' && dsq([0, 0, 0], [0, 0, -5]) === 25, '(0, 0, -5)'); Cx.blank(-5); });
Q('fb3', mk.fill({ stem: r`The three coordinate planes of space divide it into ___ regions called octants.`, acc: [['8', 'eight']], sol: r`Each coordinate can be positive or negative, so there are $2 \times 2 \times 2 = 8$ sign patterns and $8$ octants.`, d: 1, c: 'recall', t: [1] }), (Cx) => { Cx.assert(new Set(Object.values(Object.fromEntries([1, -1].flatMap((a) => [1, -1].flatMap((b) => [1, -1].map((c) => [`${a}${b}${c}`, octant([a, b, c])])))))).size === 8, 'eight distinct octants'); Cx.blank(8); });
Q('fb4', mk.fill({ stem: r`The distance of the point $(6, -6, 7)$ from the origin is ___ units.`, acc: [['11']], sol: r`$OP = \sqrt{6^2 + (-6)^2 + 7^2} = \sqrt{36 + 36 + 49} = \sqrt{121} = 11$ units.`, d: 2, c: 'understanding', t: [2] }), (Cx) => { Cx.assert(dsq([0, 0, 0], [6, -6, 7]) === 121 && dNum([0, 0, 0], [6, -6, 7]) === 11, 'OP = 11'); Cx.blank(11); });
Q('fb5', mk.fill({ stem: r`The mid-point of the segment joining $(4, -9, 1)$ and $(10, 3, 5)$ has $y$-coordinate ___.`, acc: [['-3']], sol: r`$y = \dfrac{-9 + 3}{2} = -3$, so the blank is $-3$.`, d: 2, c: 'understanding', t: [3] }), (Cx) => { Cx.assert(mid([4, -9, 1], [10, 3, 5])[1].eq(-3), 'y = -3'); Cx.blank(-3); });

// =============================================================== numerical
{
  const A = [-3, 2, -1], B = [-1, 8, 8];
  Q('n1', mk.num({ stem: r`Find the distance between the points $A(-3, 2, -1)$ and $B(-1, 8, 8)$, in units.`, value: 11, sol: r`$AB^2 = (-1 + 3)^2 + (8 - 2)^2 + (8 + 1)^2 = 4 + 36 + 81 = 121$, so $AB = \sqrt{121} = 11$.`, scheme: [['Differences 2, 6, 9', 0.5], ['Sum of squares 121', 0.5]], marks: 1, d: 2, c: 'understanding', t: [2], time: 75 }), (Cx) => { Cx.assert(dsq(A, B) === 121, 'AB^2 = 121'); Cx.val(dNum(A, B)); });
}
{
  const ys = Array.from({ length: 81 }, (_, i) => i - 40).filter((y) => dsq([3, y, -2], [-1, 2, 2]) === 81);
  Q('n2', mk.num({ stem: r`The point $P(3, y, -2)$ is $9$ units from $Q(-1, 2, 2)$. Find the larger of the two possible values of $y$.`, value: 9, sol: r`$PQ^2 = 16 + (y - 2)^2 + 16 = 81$, so $(y - 2)^2 = 49$ and $y - 2 = \pm 7$. The values are $y = 9$ and $y = -5$; the larger is $y = 9$.`, scheme: [['(y - 2)^2 = 49', 0.5], ['y = 9 or -5, larger 9', 0.5]], marks: 1, d: 3, c: 'application', t: [2], time: 105 }), (Cx) => { Cx.assert(ys.join() === '-5,9', 'y = -5 or 9'); Cx.val(Math.max(...ys)); });
}
{
  const A = [2, -1, 3], B = [-6, -1, 3], C = [-4, 5, 6], per = dNum(A, B) + dNum(B, C) + dNum(C, A);
  Q('n3', mk.num({ stem: r`Triangle $ABC$ has $A(2, -1, 3)$, $B(-6, -1, 3)$ and $C(-4, 5, 6)$. Find its perimeter, in units.`, value: 24, sol: r`$AB^2 = 64$, $BC^2 = 4 + 36 + 9 = 49$ and $CA^2 = 36 + 36 + 9 = 81$, so $AB = 8$, $BC = 7$, $CA = 9$. Perimeter $= 8 + 7 + 9 = 24$.`, scheme: [['Sides 8, 7, 9', 0.5], ['Perimeter 24', 0.5]], marks: 1, d: 3, c: 'application', t: [2], time: 105 }), (Cx) => { Cx.assert([dsq(A, B), dsq(B, C), dsq(C, A)].join() === '64,49,81' && !collinear(A, B, C), 'sides 8, 7, 9'); Cx.val(per); });
}
{
  const P = [-6, 4, 9], tot = Math.abs(P[0]) + Math.abs(P[1]) + Math.abs(P[2]);
  Q('n4', mk.num({ stem: r`A point $P(-6, 4, 9)$ is given. Find the sum of its three distances from the $yz$-plane, the $zx$-plane and the $xy$-plane.`, value: 19, sol: r`The distances are $|x| = 6$, $|y| = 4$ and $|z| = 9$, so the sum is $6 + 4 + 9 = 19$.`, scheme: [['Distances 6, 4, 9', 0.5], ['Sum 19', 0.5]], marks: 1, d: 2, c: 'understanding', t: [1], time: 75 }), (Cx) => { Cx.assert([Math.abs(P[0]), Math.abs(P[1]), Math.abs(P[2])].join() === '6,4,9', 'distances 6, 4, 9'); Cx.val(tot); });
}
{
  const A = [-4, 6, -2], B = [8, -2, 10], Pn = sect(A, B, 1, 3), sum = Pn.reduce((s, v) => s.add(v), Rat.of(0));
  Q('n5', mk.num({ stem: r`The point $P$ divides the segment from $A(-4, 6, -2)$ to $B(8, -2, 10)$ internally in the ratio $AP : PB = 1 : 3$. Find the sum of the three coordinates of $P$.`, value: 4, sol: r`$P = \left(\dfrac{8 - 12}{4}, \dfrac{-2 + 18}{4}, \dfrac{10 - 6}{4}\right) = (-1, 4, 1)$, so the sum is $-1 + 4 + 1 = 4$.`, scheme: [['P = (-1, 4, 1)', 0.5], ['Sum 4', 0.5]], marks: 1, d: 3, c: 'application', t: [3], time: 105 }), (Cx) => { Cx.assert(Pn.join() === '-1,4,1', 'P = (-1, 4, 1)'); Cx.val(sum.num()); });
}
{
  const V = [[7, -4, 9], [-3, 2, 5], [5, 8, -2]], G = centroid(...V);
  Q('n6', mk.num({ stem: r`A thin triangular plate hangs in space with corners at $(7, -4, 9)$, $(-3, 2, 5)$ and $(5, 8, -2)$. Its balance point is the centroid; find the height ($z$-coordinate) of that point.`, value: 4, sol: r`The centroid's $z$-coordinate is the average $\dfrac{9 + 5 - 2}{3} = \dfrac{12}{3} = 4$.`, scheme: [['Sum of z-coordinates 12', 0.5], ['Average 4', 0.5]], marks: 1, d: 2, c: 'understanding', t: [3], time: 75 }), (Cx) => { Cx.assert(G.join() === '3,2,4', 'centroid (3, 2, 4)'); Cx.val(G[2].num()); });
}
{
  const P = [3, -7, 2], I = reflectPlane(P, 'zx');
  Q('n7', mk.num({ stem: r`The image of the point $P(3, -7, 2)$ in the $zx$-plane is $P'$. Find the distance $PP'$, in units.`, value: 14, sol: r`The image changes the sign of $y$, so $P' = (3, 7, 2)$ and $PP'^2 = 0 + (7 + 7)^2 + 0 = 196$, so $PP' = \sqrt{196} = 14$.`, scheme: [["P' = (3, 7, 2)", 0.5], ["PP' = 14", 0.5]], marks: 1, d: 3, c: 'application', t: [1], time: 90 }), (Cx) => { Cx.assert(I.join() === '3,7,2' && dsq(P, I) === 196, "P' = (3, 7, 2), PP' = 14"); Cx.val(dNum(P, I)); });
}
