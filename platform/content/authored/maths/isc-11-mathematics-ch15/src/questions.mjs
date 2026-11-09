// ISC 11 Mathematics ch15 Introduction to Three-Dimensional Geometry - multiple-choice and assertion-reason items.
// Every key is recomputed from the givens (exact integers and rationals); every distractor comes from its own wrong method and is asserted to differ.
import { Q, mk } from './lib.mjs';
import { r, pt, dsq, sqTex, octant, ROMAN, where, footPlane, footAxis, dsqAxis, sect, mid, centroid, triangleKind, Rat } from './space.mjs';
import { ext, fourth, planeCut, bisector, sphere, lin } from './x3.mjs';

const M = (id, o, check) => Q(id, mk.mcq({ key: 'a', ...o }), check);
const T = (x) => `$${x}$`;
const same = (C, texts, key) => { C.assert(new Set(texts).size === 4, 'four different options'); C.which(texts, key); };
const P3 = (p) => pt(p);

// ============================================================ MCQ
{
  const cands = [[0, 0, -4], [0, -4, 0], [-4, 0, 0], [0, -4, -4]], o = cands.map((p) => T(P3(p)));
  M('m01', { stem: r`Which of the following points lies on the negative part of the $z$-axis?`, opts: o, sol: r`A point of the $z$-axis has $x = 0$ and $y = 0$, and the negative part has $z < 0$, so $(0, 0, -4)$ is the one. The point $(0, -4, 0)$ is on the negative $y$-axis and $(-4, 0, 0)$ on the negative $x$-axis; $(0, -4, -4)$ has only $x = 0$, so it lies in the $yz$-plane and not on an axis.`, d: 1, c: 'recall', t: [1], time: 40 }, (C) => {
    C.assert(where(cands[0]) === 'z-axis' && cands[0][2] < 0 && where(cands[1]) === 'y-axis' && where(cands[2]) === 'x-axis' && where(cands[3]) === 'yz-plane', 'only (0, 0, -4) is on the negative z-axis; the others are on the y-axis, the x-axis and the yz-plane'); same(C, o, o[0]);
  });
}
{
  const o = ['$y = 0$', '$x = 0$', '$z = 0$', '$x = 0$ and $z = 0$'];
  M('m02', { stem: r`The $zx$-plane consists of all points $(x, y, z)$ for which`, opts: o, sol: r`The $zx$-plane is the plane spanned by the $z$-axis and the $x$-axis, so only $y$ is free to be zero: its points are $(x, 0, z)$ and the condition is $y = 0$. The condition $x = 0$ describes the $yz$-plane, $z = 0$ the $xy$-plane, and $x = 0$ with $z = 0$ describes the $y$-axis only.`, d: 1, c: 'recall', t: [1], time: 40 }, (C) => {
    C.assert(where([3, 0, -2]) === 'zx-plane' && where([0, 5, 2]) === 'yz-plane' && where([4, 1, 0]) === 'xy-plane' && where([0, 6, 0]) === 'y-axis', 'y = 0 gives the zx-plane; x = 0 the yz-plane; z = 0 the xy-plane; x = z = 0 the y-axis'); same(C, o, o[0]);
  });
}
{
  const p = [5, -1, -3], oc = (a) => `octant ${ROMAN[octant(a)]}`;
  const wrong = [[5, -1, 3], [5, 1, -3], [-5, -1, -3]], o = [oc(p), ...wrong.map(oc)];
  M('m03', { stem: r`The point $(5, -1, -3)$ lies in`, opts: o, sol: r`The signs are $(+, -, -)$, which is octant VIII. Octant IV has the signs $(+, -, +)$, so it misreads $z$; octant V has $(+, +, -)$, so it misreads $y$; octant VII has $(-, -, -)$, so it misreads $x$.`, d: 2, c: 'understanding', t: [1], time: 45 }, (C) => {
    C.assert(octant(p) === 8 && wrong.map(octant).join() === '4,5,7' && new Set(o).size === 4, 'signs (+, -, -) give octant VIII; the three misreadings give IV, V and VII'); same(C, o, o[0]);
  });
}
{
  const want = ROMAN[octant([-1, 1, -1])] === 'VI';
  const o = [r`$a < 0$, $b > 0$, $c < 0$`, r`$a < 0$, $b < 0$, $c > 0$`, r`$a > 0$, $b > 0$, $c < 0$`, r`$a < 0$, $b > 0$, $c > 0$`].map((s) => s);
  M('m04', { stem: r`A point $(a, b, c)$ lies in octant VI. Then`, opts: o, sol: r`The octants run I to IV above the $xy$-plane with the $xy$-quadrants $(+, +)$, $(-, +)$, $(-, -)$, $(+, -)$, and V to VIII below it in the same order. Octant VI is the second quadrant below the plane: $a < 0$, $b > 0$, $c < 0$. The signs $(-, -, +)$ belong to octant III, $(+, +, -)$ to octant V, and $(-, +, +)$ to octant II.`, d: 2, c: 'understanding', t: [1], time: 55 }, (C) => {
    C.assert(want && octant([-1, -1, 1]) === 3 && octant([1, 1, -1]) === 5 && octant([-1, 1, 1]) === 2 && octant([-2, 3, -4]) === 6, 'octant VI has signs (-, +, -); the other three sign patterns are octants III, V and II'); same(C, o, o[0]);
  });
}
{
  const P0 = [-4, 9, -2], f = footPlane(P0, 'yz'), cands = [footAxis(P0, 'x'), f, footPlane(P0, 'xy'), footAxis(P0, 'z')], o = cands.map((p) => T(P3(p)));
  M('m05', { key: 'b', stem: r`The foot of the perpendicular drawn from $P(-4, 9, -2)$ to the $yz$-plane is`, opts: o, sol: r`The $yz$-plane is $x = 0$, so the perpendicular from $P$ changes only the $x$-coordinate to $0$ and keeps $y$ and $z$: $(0, 9, -2)$. The point $(-4, 0, 0)$ is the foot on the $x$-axis, $(-4, 9, 0)$ is the foot on the $xy$-plane, and $(0, 0, -2)$ is the foot on the $z$-axis.`, d: 2, c: 'understanding', t: [1], time: 50 }, (C) => {
    C.assert(f.join() === '0,9,-2' && cands.map((p) => p.join()).join('|') === '-4,0,0|0,9,-2|-4,9,0|0,0,-2' && dsq(P0, f) === 16, 'foot on the yz-plane is (0, 9, -2), at distance 4 = |x|; the others are other feet'); same(C, o, o[1]);
  });
}
{
  const P0 = [7, -5, 3], f = footAxis(P0, 'y'), cands = [footAxis(P0, 'x'), f, footPlane(P0, 'yz'), footPlane(P0, 'zx')], o = cands.map((p) => T(P3(p)));
  M('m06', { key: 'b', stem: r`The foot of the perpendicular from the point $T(7, -5, 3)$ to the $y$-axis is`, opts: o, sol: r`On the $y$-axis only the $y$-coordinate survives, so the foot is $(0, -5, 0)$. The point $(7, 0, 0)$ is the foot on the $x$-axis, $(0, -5, 3)$ is the foot on the $yz$-plane, and $(7, 0, 3)$ is the foot on the $zx$-plane.`, d: 2, c: 'understanding', t: [1], time: 50 }, (C) => {
    C.assert(f.join() === '0,-5,0' && dsq(P0, f) === 58 && dsqAxis(P0, 'y') === 58 && cands.map((p) => where(p)).join() === 'x-axis,y-axis,yz-plane,zx-plane', 'foot on the y-axis is (0, -5, 0); the others are the foot on the x-axis, yz-plane and zx-plane'); same(C, o, o[1]);
  });
}
{
  const P0 = [-6, 8, -10], v = dsqAxis(P0, 'x'), o = [sqTex(164), sqTex(100), sqTex(136), sqTex(200)].map(T);
  M('m07', { stem: r`How far is the point $(-6, 8, -10)$ from the $x$-axis?`, opts: o, sol: r`The nearest point of the $x$-axis is $(-6, 0, 0)$, so the distance is $\sqrt{8^2 + (-10)^2} = \sqrt{164} = 2\sqrt{41}$. The value $10$ is the distance from the $z$-axis, $2\sqrt{34}$ from the $y$-axis, and $10\sqrt{2}$ from the origin.`, d: 2, c: 'understanding', t: [1], time: 70 }, (C) => {
    C.assert(v === 164 && sqTex(164) === r`2\sqrt{41}` && dsqAxis(P0, 'z') === 100 && dsqAxis(P0, 'y') === 136 && dsq([0, 0, 0], P0) === 200 && sqTex(200) === r`10\sqrt{2}` && sqTex(136) === r`2\sqrt{34}`, 'distance squared from the x-axis is 64 + 100 = 164; the others are from the z-axis, y-axis and origin'); C.which([sqTex(164), sqTex(100), sqTex(136), sqTex(200)], sqTex(v));
  });
}
{
  const want = [-3, 5, -2], cands = [want, want.map((v) => -v), [-3, 5, 2], [5, -3, -2]], o = cands.map((p) => T(P3(p)));
  M('m08', { stem: r`A point in octant VI is $3$ units from the $yz$-plane, $5$ units from the $zx$-plane and $2$ units from the $xy$-plane. Its coordinates are`, opts: o, sol: r`The distances from the $yz$-, $zx$- and $xy$-planes are $\lvert x \rvert$, $\lvert y \rvert$, $\lvert z \rvert$, so the magnitudes are $3$, $5$, $2$. Octant VI has the signs $(-, +, -)$, giving $(-3, 5, -2)$. The point $(3, -5, 2)$ reverses all three signs and is in octant IV; $(-3, 5, 2)$ has $z > 0$, so it is in octant II; and $(5, -3, -2)$ swaps the distances from the first two planes.`, d: 4, c: 'analysis', t: [1], time: 90 }, (C) => {
    const ok = (p) => octant(p) === 6 && Math.abs(p[0]) === 3 && Math.abs(p[1]) === 5 && Math.abs(p[2]) === 2;
    C.assert(cands.filter(ok).length === 1 && ok(want) && octant(cands[1]) === 4 && octant(cands[2]) === 2 && octant(cands[3]) === 8, 'only (-3, 5, -2) is in octant VI with the stated distances'); same(C, o, o[0]);
  });
}
{
  const A = [2, -1, 4], B = [5, 3, 4], o = ['5', '7', '25', '12'].map(T);
  M('m09', { stem: r`A segment has end points $(2, -1, 4)$ and $(5, 3, 4)$. Its length is`, opts: o, sol: r`The $z$-coordinates agree, so $d = \sqrt{3^2 + 4^2 + 0^2} = \sqrt{25} = 5$. The value $7$ adds the differences $3 + 4$ before squaring, $25$ forgets the square root, and $12$ multiplies the differences.`, d: 1, c: 'recall', t: [2], time: 40 }, (C) => {
    C.assert(dsq(A, B) === 25 && Math.hypot(3, 4, 0) === 5 && 3 + 4 === 7 && 3 * 4 === 12, 'distance squared is 9 + 16 + 0 = 25, so the distance is 5'); C.which([5, 7, 25, 12], 5);
  });
}
{
  const A = [-2, 6, 1], B = [4, -2, 8], o = [sqTex(149), sqTex(101), '149', '10'].map(T);
  M('m10', { stem: r`Find the length of the segment joining $(-2, 6, 1)$ and $(4, -2, 8)$.`, opts: o, sol: r`The differences are $6$, $-8$, $7$, so $d^2 = 36 + 64 + 49 = 149$ and $d = \sqrt{149}$. The value $\sqrt{101}$ adds the coordinates instead of subtracting the first, $149$ leaves out the square root, and $10$ ignores the $z$-difference.`, d: 2, c: 'understanding', t: [2], time: 60 }, (C) => {
    const wrong = (-2 + 4) ** 2 + (6 - 2) ** 2 + (1 + 8) ** 2;
    C.assert(dsq(A, B) === 149 && wrong === 101 && 36 + 64 === 100 && sqTex(149) === r`\sqrt{149}`, 'd^2 = 36 + 64 + 49 = 149; the sum-instead-of-difference slip gives 101; dropping z gives 10'); same(C, o, o[0]);
  });
}
{
  const ks = [-30, ...Array.from({ length: 61 }, (_, i) => i - 30)].filter((k) => dsq([k, 5, -2], [1, 2, 2]) === 169);
  const o = [r`$13$ and $-11$`, r`$12$ and $-12$`, r`$11$ and $-13$`, r`$14$ and $-12$`];
  M('m11', { stem: r`The points $P(k, 5, -2)$ and $Q(1, 2, 2)$ are $13$ units apart. The possible values of $k$ are`, opts: o, sol: r`$PQ^2 = (k - 1)^2 + 3^2 + (-4)^2 = 169$, so $(k - 1)^2 = 144$ and $k - 1 = \pm 12$, giving $k = 13$ or $k = -11$. The values $\pm 12$ forget to subtract $1$; $11$ and $-13$ solve $(k + 1)^2 = 144$; and $14$, $-12$ come from $(k - 1)^2 = 169$, forgetting the other two differences.`, d: 3, c: 'application', t: [2], time: 90 }, (C) => {
    C.assert(ks.join() === '-11,13' && (1 + 12) === 13 && (1 - 12) === -11 && [12, -12].every((k) => dsq([k, 5, -2], [1, 2, 2]) !== 169) && [11, -13].every((k) => dsq([k, 5, -2], [1, 2, 2]) !== 169) && [14, -12].every((k) => dsq([k, 5, -2], [1, 2, 2]) !== 169), 'search over -30..30 gives exactly k = -11 and 13; the other pairs fail'); same(C, o, o[0]);
  });
}
{
  const A = [2, -3, 1], B = [-4, 1, 5];
  const zs = Array.from({ length: 81 }, (_, i) => -10 + i / 4).filter((z) => Math.abs(dsq([0, 0, z], A) - dsq([0, 0, z], B)) < 1e-9);
  const o = [pt([0, 0, Rat.of([7, 2])]), pt([0, 0, 3]), pt([0, 0, Rat.of([-7, 2])]), pt([0, 0, 7])].map(T);
  M('m12', { stem: r`Of the points below, the one on the $z$-axis whose distances from $P(2, -3, 1)$ and from $Q(-4, 1, 5)$ are the same is`, opts: o, sol: r`Let the point be $(0, 0, z)$. Then $4 + 9 + (z - 1)^2 = 16 + 1 + (z - 5)^2$, which gives $14 - 2z = 42 - 10z$, so $z = \dfrac{7}{2}$. The point $(0, 0, 3)$ uses the mid-point of the $z$-values; $\left(0, 0, -\dfrac{7}{2}\right)$ has the wrong sign; and $(0, 0, 7)$ stops at $4z = 28$.`, d: 3, c: 'application', t: [2], time: 100 }, (C) => {
    C.assert(zs.join() === '3.5' && dsq([0, 0, 3.5], A) === dsq([0, 0, 3.5], B) && dsq([0, 0, 3.5], A) === 19.25 && dsq([0, 0, 3], A) !== dsq([0, 0, 3], B), 'search over steps of 1/4 gives only z = 7/2, with PA^2 = PB^2 = 77/4'); same(C, o, o[0]);
  });
}
{
  const T1 = [[-1, 0, -3], [-2, 2, -2], [-4, 0, 0]], k = triangleKind(...T1);
  const o = ['right-angled but not isosceles', 'isosceles but not right-angled', 'equilateral', 'neither right-angled nor isosceles'];
  M('m13', { stem: r`Triangle $ABC$ has $A(-1, 0, -3)$, $B(-2, 2, -2)$ and $C(-4, 0, 0)$ as its corners. Which description fits it?`, opts: o, sol: r`$AB^2 = 1 + 4 + 1 = 6$, $BC^2 = 4 + 4 + 4 = 12$, $CA^2 = 9 + 0 + 9 = 18$. The three are different, so it is not isosceles or equilateral, and $AB^2 + BC^2 = 6 + 12 = 18 = CA^2$, so the angle at $B$ is a right angle.`, d: 3, c: 'application', t: [2], time: 100 }, (C) => {
    C.assert(k.sides.join() === '6,12,18' && k.right && !k.iso && !k.equi && k.kind === 'right-angled', 'squared sides 6, 12, 18: 6 + 12 = 18, all different'); same(C, o, o[0]);
  });
}
{
  const C0 = [-1, 3, -2], S = sphere(C0, 25), want = S.gen;
  const g2 = (co, d) => T(`x^2 + y^2 + z^2 ${lin(co, d).startsWith('-') ? '- ' + lin(co, d).slice(1) : '+ ' + lin(co, d)} = 0`);
  const o = [g2([2, -6, 4], -11), g2([-2, 6, -4], -11), g2([2, -6, 4], 39), g2([2, -6, 4], -25)];
  M('m14', { stem: r`A point moves so that it is always $5$ units from the fixed point $(-1, 3, -2)$. The equation of its path, written without brackets, is`, opts: o, sol: r`$(x + 1)^2 + (y - 3)^2 + (z + 2)^2 = 25$, which expands to $x^2 + y^2 + z^2 + 2x - 6y + 4z + 14 - 25 = 0$, that is $x^2 + y^2 + z^2 + 2x - 6y + 4z - 11 = 0$. The option with $-2x + 6y - 4z$ reverses the signs of the linear terms; the constant $39$ adds $25$ to $14$; and $-25$ forgets the $14$ from the squared centre coordinates.`, d: 3, c: 'application', t: [2], time: 100 }, (C) => {
    C.assert(want === 'x^2 + y^2 + z^2 + 2x - 6y + 4z - 11 = 0' && S.con === -11 && 1 + 9 + 4 === 14 && S.lattice > 5 && o[0] === T(want), 'expanded form of the sphere checked at every lattice point near it, in both forms'); same(C, o, o[0]);
  });
}
{
  const A = [6, -2, 9], B = [-4, 8, 3], Mi = mid(A, B), o = [P3(Mi), P3([2, 6, 12]), P3([5, -5, 3]), P3([10, -10, 6])].map(T);
  M('m15', { stem: r`The point $M$ halfway between $(6, -2, 9)$ and $(-4, 8, 3)$ has coordinates`, opts: o, sol: r`Each coordinate is the average of the two: $\left(\dfrac{6 - 4}{2}, \dfrac{-2 + 8}{2}, \dfrac{9 + 3}{2}\right) = (1, 3, 6)$. The point $(2, 6, 12)$ is the sum and forgets the halving; $(5, -5, 3)$ is half the difference; and $(10, -10, 6)$ is the difference.`, d: 1, c: 'recall', t: [3], time: 45 }, (C) => {
    C.assert(Mi.join() === '1,3,6' && [0, 1, 2].every((i) => 2 * Mi[i].num() === A[i] + B[i]), 'mid-point is (1, 3, 6)'); same(C, o, o[0]);
  });
}
{
  const A = [-5, 0, 10], B = [5, 5, -5], P0 = sect(A, B, 2, 3), sw = sect(A, B, 3, 2), E = ext(A, B, 2, 3), md = mid(A, B);
  const o = [P3(P0), P3(sw), P3(md), P3(E)].map(T);
  M('m16', { stem: r`A segment joins $A(-5, 0, 10)$ and $B(5, 5, -5)$, and a point $P$ on it satisfies $AP : PB = 2 : 3$. Then $P$ is`, opts: o, sol: r`With $m = 2$, $n = 3$: $\left(\dfrac{2(5) + 3(-5)}{5}, \dfrac{2(5) + 3(0)}{5}, \dfrac{2(-5) + 3(10)}{5}\right) = (-1, 2, 4)$. The point $(1, 3, 1)$ swaps the ratio to $3 : 2$; $\left(0, \dfrac{5}{2}, \dfrac{5}{2}\right)$ is the mid-point; and $(-25, -10, 40)$ divides externally.`, d: 2, c: 'understanding', t: [3], time: 75 }, (C) => {
    C.assert(P0.join() === '-1,2,4' && sw.join() === '1,3,1' && md.join() === '0,5/2,5/2' && E.join() === '-25,-10,40', 'internal 2 : 3 gives (-1, 2, 4); swapped, mid-point and external give the others'); same(C, o, o[0]);
  });
}
{
  const A = [1, 2, -3], B = [4, -1, 3], E = ext(A, B, 3, 1), I = sect(A, B, 3, 1), S13 = ext(A, B, 1, 3), W = A.map((a, i) => Rat.of(3 * B[i] - a).div(4));
  const o = [P3(E), P3(I), P3(S13), P3(W)].map(T);
  M('m17', { stem: r`The point $R$ divides the segment from $A(1, 2, -3)$ to $B(4, -1, 3)$ externally in the ratio $AR : RB = 3 : 1$. Then $R$ is`, opts: o, sol: r`For external division the formula is $\dfrac{m x_2 - n x_1}{m - n}$ with $m = 3$, $n = 1$: $\left(\dfrac{12 - 1}{2}, \dfrac{-3 - 2}{2}, \dfrac{9 + 3}{2}\right) = \left(\dfrac{11}{2}, -\dfrac{5}{2}, 6\right)$. The point $\left(\dfrac{13}{4}, -\dfrac{1}{4}, \dfrac{3}{2}\right)$ divides internally; $\left(-\dfrac{1}{2}, \dfrac{7}{2}, -6\right)$ uses the ratio $1 : 3$; and $\left(\dfrac{11}{4}, -\dfrac{5}{4}, 3\right)$ divides by $m + n$ instead of $m - n$.`, d: 3, c: 'application', t: [3], time: 100 }, (C) => {
    C.assert(E.join() === '11/2,-5/2,6' && I.join() === '13/4,-1/4,3/2' && S13.join() === '-1/2,7/2,-6' && W.join() === '11/4,-5/4,3' && Math.hypot(...E.map((e, i) => e.num() - A[i])) === 3 * Math.hypot(...E.map((e, i) => e.num() - B[i])), 'R is outside AB with RA = 3 RB; the other three are the internal, swapped and wrong-denominator points'); same(C, o, o[0]);
  });
}
{
  const A = [2, 5, -4], B = [-1, 3, 6], pc = planeCut(A, B, 2);
  const o = ['$2 : 3$ internally', '$3 : 2$ internally', '$2 : 3$ externally', '$2 : 1$ internally'];
  M('m18', { stem: r`The segment from $A(2, 5, -4)$ to $B(-1, 3, 6)$ is cut by the $xy$-plane. The plane divides $AB$ in the ratio $AP : PB =$`, opts: o, sol: r`On the $xy$-plane $z = 0$, so $AP : PB = -z_1 : z_2 = 4 : 6 = 2 : 3$, and since $z_1$ and $z_2$ have opposite signs the division is internal. The ratio $3 : 2$ swaps the parts; "externally" ignores the opposite signs; and $2 : 1$ comes from the $x$-coordinates, $-2 : -1$, which cut the $yz$-plane instead.`, d: 3, c: 'application', t: [3], time: 80 }, (C) => {
    const cx = planeCut(A, B, 0);
    C.assert(pc.text === '2 : 3' && pc.internal && pc.P.join() === '4/5,21/5,0' && cx.text === '2 : 1' && cx.internal, 'xy-plane cuts AB internally in 2 : 3 at (4/5, 21/5, 0); the yz-plane would give 2 : 1'); same(C, o, o[0]);
  });
}
{
  const V3 = [[5, -1, 2], [-2, 4, 8], [0, 6, -1]], G = centroid(...V3), o = [P3(G), P3([3, 9, 9]), P3([Rat.of([3, 2]), Rat.of([9, 2]), Rat.of([9, 2])]), P3(mid(V3[0], V3[1]))].map(T);
  M('m19', { stem: r`The vertices of a triangle are $(5, -1, 2)$, $(-2, 4, 8)$ and $(0, 6, -1)$. Its centroid is`, opts: o, sol: r`The centroid is the average of the three vertices: $\left(\dfrac{5 - 2 + 0}{3}, \dfrac{-1 + 4 + 6}{3}, \dfrac{2 + 8 - 1}{3}\right) = (1, 3, 3)$. The point $(3, 9, 9)$ is the sum without dividing; $\left(\dfrac{3}{2}, \dfrac{9}{2}, \dfrac{9}{2}\right)$ divides by $2$; and $\left(\dfrac{3}{2}, \dfrac{3}{2}, 5\right)$ is the mid-point of the first two vertices only.`, d: 2, c: 'understanding', t: [3], time: 70 }, (C) => {
    C.assert(G.join() === '1,3,3' && mid(V3[0], V3[1]).join() === '3/2,3/2,5', 'centroid (1, 3, 3)'); same(C, o, o[0]);
  });
}
{
  const A = [2, -3, 1], B = [5, 1, -2], Cc = [7, 0, 4], D = fourth(A, B, Cc), alt = [B.map((b, i) => b + Cc[i] - A[i]), A.map((a, i) => a + B[i] - Cc[i]), A.map((a, i) => a + B[i] + Cc[i])];
  const o = [P3(D), P3(alt[0]), P3(alt[1]), P3(alt[2])].map(T);
  M('m20', { stem: r`$ABCD$ is a parallelogram, with its vertices taken in order, and $A(2, -3, 1)$, $B(5, 1, -2)$ and $C(7, 0, 4)$ are three of them. The fourth vertex $D$ is`, opts: o, sol: r`The diagonals $AC$ and $BD$ bisect each other, so $A + C = B + D$ and $D = A + C - B = (4, -4, 7)$. The point $(10, 4, 1)$ is $B + C - A$, which would make $A$ the opposite vertex to $D$ in a different parallelogram; $(0, -2, -5)$ is $A + B - C$, the same slip for $C$; and $(14, -2, 3)$ is $A + B + C$.`, d: 4, c: 'analysis', t: [3], time: 100 }, (C) => {
    C.assert(D.join() === '4,-4,7' && mid(A, Cc).join() === mid(B, D.map((v) => v)).join() && alt[0].join() === '10,4,1' && alt[1].join() === '0,-2,-5' && alt[2].join() === '14,-2,3', 'diagonal mid-points agree for D = (4, -4, 7); the other three are the other sum slips'); same(C, o, o[0]);
  });
}

// ============================================================ assertion-reason
Q('ar1', mk.ar({ a: r`The point $(3, -4, 0)$ lies in the $xy$-plane.`, r: r`Every point of the $xy$-plane has $z$-coordinate $0$.`, key: 'a', sol: r`Its $z$-coordinate is $0$ and the other two are not both $0$, so it is in the $xy$-plane: A is true. R is the defining property of the $xy$-plane, and it is the reason A holds.`, d: 1, c: 'understanding', t: [1] }), (C) => {
  C.assert(where([3, -4, 0]) === 'xy-plane' && where([2, 5, 1]) !== 'xy-plane', 'where (3, -4, 0) is the xy-plane'); C.sol([0]);
});
Q('ar2', mk.ar({ a: r`The point $(-2, -5, -1)$ lies in octant VII.`, r: r`Octant I is the octant in which all three coordinates are positive.`, key: 'b', sol: r`All three coordinates are negative, which is octant VII, so A is true. R is also true, but it only names octant I; it says nothing about which octant has three negative signs, so it does not explain A.`, d: 2, c: 'understanding', t: [1] }), (C) => {
  C.assert(octant([-2, -5, -1]) === 7 && octant([1, 1, 1]) === 1 && octant([-1, -1, 1]) !== 7, 'three negative coordinates give octant VII; all positive gives octant I'); 
});
Q('ar3', mk.ar({ a: r`The mid-point of the segment joining $(4, -2, 6)$ and $(-2, 8, 0)$ is $(1, 3, 3)$.`, r: r`The mid-point of a segment divides it externally in the ratio $1 : 1$.`, key: 'c', sol: r`The averages are $\dfrac{4 - 2}{2} = 1$, $\dfrac{-2 + 8}{2} = 3$ and $\dfrac{6 + 0}{2} = 3$, so A is true. R is false: the mid-point divides internally in the ratio $1 : 1$, and external division in the ratio $1 : 1$ does not exist because $m - n = 0$.`, d: 2, c: 'understanding', t: [3] }), (C) => {
  C.assert(mid([4, -2, 6], [-2, 8, 0]).join() === '1,3,3' && sect([4, -2, 6], [-2, 8, 0], 1, 1).join() === '1,3,3' && (() => { try { ext([4, -2, 6], [-2, 8, 0], 1, 1); return false; } catch { return true; } })(), 'mid-point (1, 3, 3) is the internal 1 : 1 point; the external 1 : 1 point does not exist'); C.sol([4, 2, 8, 3]);
});
Q('ar4', mk.ar({ a: r`The foot of the perpendicular from the point $(6, -3, 8)$ to the $x$-axis is $(0, -3, 8)$.`, r: r`The foot of the perpendicular from a point to the $x$-axis keeps the $x$-coordinate and replaces the other two coordinates by $0$.`, key: 'd', sol: r`By R, the foot is $(6, 0, 0)$, so R is true. Then A is false, because $(0, -3, 8)$ is the foot on the $yz$-plane, not on the $x$-axis.`, d: 3, c: 'analysis', t: [1] }), (C) => {
  C.assert(footAxis([6, -3, 8], 'x').join() === '6,0,0' && footPlane([6, -3, 8], 'yz').join() === '0,-3,8', 'foot on the x-axis is (6, 0, 0); (0, -3, 8) is the foot on the yz-plane'); C.sol([6, 0]);
});
Q('ar5', mk.ar({ a: r`The set of points equidistant from $A(1, 0, 0)$ and $B(-1, 0, 0)$ is the plane $x = 0$.`, r: r`A point equidistant from two given points lies on the plane through the mid-point of the segment joining them and perpendicular to it.`, key: 'a', sol: r`$PA^2 = PB^2$ gives $(x - 1)^2 + y^2 + z^2 = (x + 1)^2 + y^2 + z^2$, so $4x = 0$ and $x = 0$: A is true. The mid-point is the origin, which is on $x = 0$, and the plane is perpendicular to $AB$ (along the $x$-axis), exactly as R says, so R explains A.`, d: 3, c: 'application', t: [2] }), (C) => {
  const b = bisector([1, 0, 0], [-1, 0, 0]);
  C.assert(b.co.join() === '-1,0,0' && b.d === 0, 'equal-distance condition reduces to x = 0'); C.sol([1, 4, 0]);
});
Q('ar6', mk.ar({ a: r`The distance of the point $(-4, 8, 8)$ from the origin is $12$.`, r: r`The distance of the point $(x, y, z)$ from the $z$-axis is $\sqrt{x^2 + y^2}$.`, key: 'b', sol: r`$\sqrt{16 + 64 + 64} = \sqrt{144} = 12$, so A is true. R is also true, but it gives the distance from the $z$-axis, not from the origin, so it does not explain A.`, d: 2, c: 'understanding', t: [2] }), (C) => {
  C.assert(dsq([0, 0, 0], [-4, 8, 8]) === 144 && dsqAxis([-4, 8, 8], 'z') === 80 && 80 !== 144, 'distance from the origin is 12; from the z-axis sqrt 80'); C.sol([16, 64, 144, 12]);
});
