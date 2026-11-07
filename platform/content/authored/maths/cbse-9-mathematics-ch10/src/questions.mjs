// CBSE 9 Mathematics ch10 4-gons (Quadrilaterals): objective items (mcq, assertion-reason, true-false, fill-blank, match).
// Types of 4-gon, parallel and equal sides, diagonals and symmetry counts are re-solved from coordinates (q.mjs); equations are solved by search.
import { Q, mk } from './lib.mjs';
import { r, must, close, range, dist, angleAt, polar } from './h.mjs';
import { classify, symmetries, varignon, add, mid } from './q.mjs';
import { f4Types, fVar, fMid, fMedians } from './figs.mjs';

const T = (k, o, chk) => Q(k, mk.mcq({ stem: o.stem, opts: o.opts, key: 'a', sol: o.sol, d: o.d, c: o.c, t: o.t, time: o.time ?? 75, assets: o.assets }), chk);
const S = {
  kite: [[0, 0], [1.7, 1.2], [0, 3.6], [-1.7, 1.2]], trap: [[0, 0], [5, 0], [4, 2.2], [1.2, 2.2]], iso: [[0, 0], [6, 0], [5, 2], [1, 2]],
  rho: [[0, 0], [3, 0], add([3, 0], polar([0, 0], 3, 70)), polar([0, 0], 3, 70)], rec: [[0, 0], [6, 0], [6, 4], [0, 4]], sq: [[0, 0], [3, 0], [3, 3], [0, 3]],
  par: [[0, 0], [4.5, 0], [5.7, 2.2], [1.2, 2.2]],
};

// =============================================================== MCQ (m01-m06 are the check-slide items)
T('m01', { stem: 'A 4-gon has two pairs of equal adjacent sides, but its opposite sides are not parallel. It is a', opts: ['kite', 'trapezium', 'rhombus', 'rectangle'], sol: 'Two pairs of equal adjacent sides is the definition of a kite. A rhombus and a rectangle are parallelograms, so their opposite sides are parallel, and a trapezium need not have equal adjacent sides.', d: 1, c: 'understanding', t: [1], time: 60, assets: [f4Types] }, (Cx) => { const f = (P) => { const c = classify(P); return c.kite && !c.trapezium; }; Cx.which([f(S.kite), f(S.trap), f(S.rho), f(S.rec)], true); });
{
  const A = [0, 0], B = [5, -3], C = [13, 0], D = [8, 3], c = classify([A, B, C, D]);
  T('m02', { stem: 'The diagonals of a parallelogram $ABCD$ meet at $O$ and $OA = 6.5$ cm. The diagonal $AC$ is', opts: ['$13$ cm', '$6.5$ cm', '$26$ cm', '$3.25$ cm'], sol: 'The diagonals of a parallelogram bisect each other, so $O$ is the midpoint of $AC$ and $AC = 2 \\times 6.5 = 13$ cm.', d: 1, c: 'understanding', t: [1], time: 60 }, (Cx) => { Cx.assert(c.parallelogram && close(dist(A, c.o), 6.5) && close(c.diag.AC, 13), 'AC = 13'); Cx.which([c.diag.AC, 6.5, 26, 3.25], 13); });
}
{
  const ex = [classify(S.iso).parallelogram, classify([[0, 0], [4, -2], [10, 0], [6, 2]]).parallelogram, classify([[0, 0], [5, 0], [6, 3], [1, 3]]).parallelogram, classify([[0, 0], [5, 0], [7, 2], [2, 2]]).parallelogram];
  T('m03', { stem: 'Which of these conditions does **not** guarantee that a 4-gon is a parallelogram?', opts: ['one pair of opposite sides is equal', 'the diagonals bisect each other', 'both pairs of opposite sides are equal', 'one pair of opposite sides is equal and parallel'], sol: 'An isosceles trapezium has one pair of equal opposite sides (its legs) but is not a parallelogram, so that condition is not enough. The other three conditions are tests for a parallelogram.', d: 2, c: 'understanding', t: [1], time: 75 }, (Cx) => { Cx.assert(classify(S.iso).oppSidesEqual === false && close(classify(S.iso).sides[1], classify(S.iso).sides[3]), 'one pair of equal sides'); Cx.which(ex, false); });
}
T('m04', { stem: r`In $\triangle ABC$, $D$ and $E$ are the midpoints of $AB$ and $AC$, and $BC = 14$ cm. Then $DE$ is`, opts: ['$7$ cm', '$14$ cm', '$28$ cm', '$3.5$ cm'], sol: 'By the midpoint theorem $DE = \\frac12 BC = 7$ cm.', d: 1, c: 'understanding', t: [2], time: 60, assets: [fMid] }, (Cx) => { Cx.which([14 / 2, 14, 28, 3.5], 7); });
T('m05', { stem: 'The medians of a triangle meet at $G$, and the median $AD$ is $12$ cm long. Then $AG$ is', opts: ['$8$ cm', '$4$ cm', '$6$ cm', '$9$ cm'], sol: '$G$ divides each median in the ratio $2 : 1$ from the vertex, so $AG = \\frac23 \\times 12 = 8$ cm and $GD = 4$ cm.', d: 1, c: 'understanding', t: [3], time: 60, assets: [fMedians] }, (Cx) => { Cx.which([(2 / 3) * 12, 4, 6, 9], 8); });
{
  const x = 360 - 75 - 105 - 85;
  T('m06', { stem: r`Three angles of a tile in the shape of a 4-gon are $75^\circ$, $105^\circ$ and $85^\circ$. The fourth angle is`, opts: [r`$95^\circ$`, r`$85^\circ$`, r`$105^\circ$`, r`$100^\circ$`], sol: r`The angles of a 4-gon add up to $360^\circ$, so the fourth angle is $360^\circ - (75^\circ + 105^\circ + 85^\circ) = 95^\circ$.`, d: 1, c: 'understanding', t: [4], time: 60 }, (Cx) => { Cx.assert(x === 95, 'x = 95'); Cx.which([x, 85, 105, 100], 95); });
}

// =============================================================== MCQ for the tests
{
  const part = 360 / (2 + 3 + 4 + 6);
  T('m07', { stem: r`The angles of a 4-gon in a park plan are in the ratio $2 : 3 : 4 : 6$. The largest angle is`, opts: [r`$144^\circ$`, r`$96^\circ$`, r`$72^\circ$`, r`$120^\circ$`], sol: r`The angles add up to $360^\circ$ and $2 + 3 + 4 + 6 = 15$ parts, so one part is $24^\circ$ and the largest angle is $6 \times 24 = 144^\circ$.`, d: 2, c: 'application', t: [1], time: 75 }, (Cx) => { Cx.assert(part === 24, 'part 24'); Cx.which([6 * part, 4 * part, 3 * part, 5 * part], 144); });
}
{
  const xs = range(1, 60).filter((x) => 5 * x - 20 === 3 * x + 30), ang = 5 * 25 - 20;
  T('m08', { stem: r`In a parallelogram $ABCD$, $\angle A = (5x - 20)^\circ$ and $\angle C = (3x + 30)^\circ$. The angle $\angle B$ is`, opts: [r`$75^\circ$`, r`$105^\circ$`, r`$25^\circ$`, r`$65^\circ$`], sol: r`Opposite angles are equal: $5x - 20 = 3x + 30$, so $x = 25$ and $\angle A = 105^\circ$. Adjacent angles add up to $180^\circ$, so $\angle B = 75^\circ$.`, d: 2, c: 'application', t: [1], time: 90 }, (Cx) => { Cx.assert(xs.join() === '25' && ang === 105, 'x = 25'); Cx.which([180 - ang, ang, 25, 65], 75); });
}
{
  const xs = range(1, 40).filter((x) => 3 * x + 2 === 5 * x - 6);
  T('m09', { stem: r`In a parallelogram-shaped garden plot $ABCD$, $AB = (3x + 2)$ m and $CD = (5x - 6)$ m. The length of $AB$ is`, opts: ['$14$ m', '$12$ m', '$4$ m', '$26$ m'], sol: r`Opposite sides of a parallelogram are equal: $3x + 2 = 5x - 6$, so $x = 4$ and $AB = 3 \times 4 + 2 = 14$ m. The value $4$ is $x$.`, d: 2, c: 'application', t: [1], time: 75 }, (Cx) => { Cx.assert(xs.join() === '4', 'x = 4'); Cx.which([3 * 4 + 2, 12, 4, 26], 14); });
}
{
  const rh = [[-8, 0], [0, -6], [8, 0], [0, 6]], c = classify(rh);
  T('m10', { stem: 'The diagonals of a rhombus-shaped tile are $16$ cm and $12$ cm. Its side is', opts: ['$10$ cm', '$14$ cm', '$20$ cm', '$28$ cm'], sol: 'The diagonals of a rhombus bisect each other at right angles, so a side is the hypotenuse of a right-angled triangle with sides $8$ and $6$: $\\sqrt{64 + 36} = 10$ cm.', d: 2, c: 'application', t: [1], time: 75 }, (Cx) => { Cx.assert(c.rhombus && close(c.sides[0], 10), 'side 10'); Cx.which([c.sides[0], 14, 20, 28], 10); });
}
{
  const rc = classify([[0, 0], [12, 0], [12, 9], [0, 9]]);
  T('m11', { stem: 'A rectangular notice board is $12$ dm long and $9$ dm wide. Its diagonal is', opts: ['$15$ dm', '$21$ dm', '$13.5$ dm', '$10.5$ dm'], sol: 'The diagonal is the hypotenuse of a right-angled triangle with sides $12$ and $9$: $\\sqrt{144 + 81} = 15$ dm. The value $21$ is $12 + 9$.', d: 1, c: 'understanding', t: [1], time: 60 }, (Cx) => { Cx.assert(rc.rectangle && close(rc.diag.AC, 15) && close(rc.diag.BD, 15), 'diagonal 15'); Cx.which([rc.diag.AC, 21, 13.5, 10.5], 15); });
}
T('m12', { stem: r`In $\triangle ABC$, $D$ and $E$ are the midpoints of $AB$ and $AC$. If the perimeter of $\triangle ADE$ is $18$ cm, the perimeter of $\triangle ABC$ is`, opts: ['$36$ cm', '$9$ cm', '$72$ cm', '$24$ cm'], sol: 'Each side of $\\triangle ADE$ is half of the matching side of $\\triangle ABC$ ($AD = \\frac12 AB$, $AE = \\frac12 AC$, $DE = \\frac12 BC$), so the perimeter of $\\triangle ABC$ is $2 \\times 18 = 36$ cm.', d: 2, c: 'application', t: [2], time: 75 }, (Cx) => { const A = [2, 6], B = [0, 0], C = [9, 0], D = mid(A, B), E = mid(A, C); const per = (P, Qp, R) => dist(P, Qp) + dist(Qp, R) + dist(R, P); Cx.assert(close(per(A, B, C), 2 * per(A, D, E)), 'perimeter doubles'); Cx.which([2 * 18, 9, 72, 24], 36); });
{
  const x = 11.4 / 2;
  T('m13', { stem: r`In $\triangle ABC$, $D$ is the midpoint of $AB$ and the line through $D$ parallel to $BC$ meets $AC$ at $E$. If $AC = 11.4$ cm, then $AE$ is`, opts: ['$5.7$ cm', '$11.4$ cm', '$22.8$ cm', '$2.85$ cm'], sol: 'By the converse of the midpoint theorem $E$ is the midpoint of $AC$, so $AE = 11.4 \\div 2 = 5.7$ cm.', d: 1, c: 'understanding', t: [2], time: 60 }, (Cx) => { Cx.which([x, 11.4, 22.8, 2.85], 5.7); });
}
T('m14', { stem: 'The sides of a triangular park are $18$ m, $24$ m and $30$ m. A path joins the midpoints of its three sides. The length of the path round the new triangle is', opts: ['$36$ m', '$72$ m', '$18$ m', '$54$ m'], sol: 'Each side of the triangle of midpoints is half of a side of the park, so the perimeter is half of $18 + 24 + 30 = 72$, that is $36$ m.', d: 2, c: 'application', t: [2], time: 75 }, (Cx) => { Cx.which([(18 + 24 + 30) / 2, 72, 18, 54], 36); });
{
  const D4 = [[0, 0], [6, -3], [12, 0], [6, 4]], AC = 12, BD = 8;
  T('m15', { stem: r`The diagonals of a 4-gon $ABCD$ are $12$ cm and $8$ cm. The 4-gon formed by joining the midpoints of its sides has perimeter`, opts: ['$20$ cm', '$40$ cm', '$10$ cm', '$28$ cm'], sol: 'Its sides are parallel to the diagonals and half as long, so they are $6$ cm and $4$ cm, in two pairs. The perimeter is $2(6 + 4) = 20$ cm.', d: 2, c: 'application', t: [3], time: 75 }, (Cx) => { const [p, q, rr, s] = varignon([[0, 0], [5, -2], [12, 0], [5, 6]]); Cx.assert(classify([p, q, rr, s]).parallelogram, 'a parallelogram'); Cx.which([2 * (AC / 2 + BD / 2), 40, 10, 28], 20); });
}
{
  const iso = [[0, 0], [10, 0], [8, 3], [2, 3]], c = classify(iso), v = classify(varignon(iso));
  T('m16', { stem: 'The diagonals of a 4-gon $ABCD$ are equal. The 4-gon formed by joining the midpoints of its sides is', opts: ['a rhombus', 'a rectangle', 'a square', 'a trapezium with only one pair of parallel sides'], sol: 'The midpoint 4-gon is a parallelogram whose sides are half of the diagonals, and the diagonals are equal, so all four of its sides are equal: it is a rhombus. It is a rectangle only if the diagonals are perpendicular, and a square only if they are both equal and perpendicular.', d: 3, c: 'analysis', t: [3], time: 105 }, (Cx) => { Cx.assert(c.diag.equal && !c.diag.perpendicular, 'equal diagonals, not perpendicular'); Cx.which([v.rhombus, v.rectangle, v.square, v.exactlyOnePair], true); });
}
{
  const rh = [[-4, 0], [0, -3], [4, 0], [0, 3]], v = classify(varignon(rh));
  T('m17', { stem: 'The midpoints of the sides of a rhombus (not a square) are joined in order. The 4-gon so formed is', opts: ['a rectangle', 'a rhombus', 'a square', 'a kite that is not a parallelogram'], sol: 'The diagonals of a rhombus are perpendicular, so the sides of the midpoint parallelogram, which are parallel to the diagonals, are perpendicular: it is a rectangle. Its sides are half of the unequal diagonals, so it is not a square.', d: 3, c: 'analysis', t: [3], time: 105 }, (Cx) => { Cx.assert(classify(rh).rhombus && !classify(rh).square, 'a rhombus that is not a square'); Cx.which([v.rectangle && !v.square, v.rhombus, v.square, v.kite && !v.parallelogram], true); });
}
{
  const BE = 15;
  T('m18', { stem: r`$G$ is the point where the medians of $\triangle ABC$ meet, and the median $BE$ is $15$ cm long. Then $GE$ is`, opts: ['$5$ cm', '$10$ cm', '$7.5$ cm', '$3$ cm'], sol: 'The centroid divides each median in the ratio $2 : 1$, so $BG = 10$ cm and $GE = 15 - 10 = 5$ cm, which is one third of the median.', d: 2, c: 'application', t: [3], time: 75 }, (Cx) => { Cx.which([BE / 3, 10, 7.5, 3], 5); });
}
T('m19', { stem: 'The number of lines of symmetry of a rhombus that is not a square is', opts: ['$2$', '$4$', '$1$', '$0$'], sol: 'The two diagonals of a rhombus are lines of symmetry, and there are no others unless it is a square. So there are $2$.', d: 1, c: 'understanding', t: [4], time: 60 }, (Cx) => { const n = symmetries(S.rho).lines; Cx.which([n, 4, 1, 0], 2); });
T('m20', { stem: 'The order of rotational symmetry of a parallelogram that is not a rectangle or a rhombus is', opts: ['$2$', '$1$', '$4$', '$0$'], sol: 'A half-turn about the point where the diagonals meet makes the parallelogram fit itself, but no smaller turn does, so the order is $2$.', d: 1, c: 'understanding', t: [4], time: 60 }, (Cx) => { const n = symmetries(S.par).order; Cx.which([n, 1, 4, 0], 2); });

// =============================================================== assertion-reason
Q('ar1', mk.ar({ a: 'The diagonals of a parallelogram bisect each other.', r: 'The two triangles formed by the diagonals on a pair of opposite sides are congruent (ASA).', key: 'a', sol: r`A is true, and R explains it: triangles $AOB$ and $COD$ are congruent by ASA, so $OA = OC$ and $OB = OD$.`, d: 2, c: 'analysis', t: [1] }), (Cx) => { Cx.assert(classify(S.par).diagBisect && classify([[0, 0], [7, 0], add([7, 0], polar([0, 0], 3.2, 52)), polar([0, 0], 3.2, 52)]).diagBisect, 'diagonals bisect'); Cx.key('a'); });
Q('ar2', mk.ar({ a: 'In $\\triangle ABC$, if $D$ and $E$ are the midpoints of $AB$ and $AC$, then $DE \\parallel BC$.', r: 'Any segment joining a point on $AB$ to a point on $AC$ is parallel to $BC$.', key: 'c', sol: r`A is true: it is the midpoint theorem. R is false: the segment is parallel to $BC$ only when it joins midpoints (or points that divide the sides in the same ratio). For example, a segment from the midpoint of $AB$ to a point very close to $C$ is not parallel to $BC$.`, d: 2, c: 'analysis', t: [2] }), (Cx) => { const A = [2, 6], B = [0, 0], C = [9, 0], D = mid(A, B), E1 = mid(A, C), E2 = [8, 0.6]; const pr = (P, Qp) => Math.abs((P[0] - Qp[0]) * 0 - (P[1] - Qp[1]) * 1) < 1e-9; Cx.assert(pr(D, E1) === false || close(D[1], E1[1]), 'midpoints parallel'); Cx.assert(close(D[1], E1[1]) && !close(D[1], E2[1]), 'a non-midpoint segment is not parallel to BC'); Cx.key('c'); });
Q('ar3', mk.ar({ a: 'A square is a rhombus.', r: 'A square is a rectangle.', key: 'b', sol: r`A is true: a square has four equal sides and is a parallelogram. R is also true, but it does not explain A: the reason a square is a rhombus is that it has four equal sides.`, d: 2, c: 'analysis', t: [1] }), (Cx) => { const c = classify(S.sq); Cx.assert(c.rhombus && c.rectangle, 'both true'); Cx.key('b'); });
Q('ar4', mk.ar({ a: 'A 4-gon with one pair of equal opposite sides is a parallelogram.', r: 'An isosceles trapezium has a pair of equal opposite sides and is not a parallelogram.', key: 'd', sol: r`A is false, and R gives the counterexample: in an isosceles trapezium the two legs are equal, but the other pair of opposite sides is not equal and not parallel to the legs, so it is not a parallelogram. R is true.`, d: 2, c: 'analysis', t: [1] }), (Cx) => { const c = classify(S.iso); Cx.assert(close(c.sides[1], c.sides[3]) && !c.parallelogram, 'isosceles trapezium'); Cx.key('d'); });
Q('ar5', mk.ar({ a: 'Every 4-gon can be used to tile the plane.', r: 'The four angles of a 4-gon add up to $360^\\circ$, so its four angles can fit round a point.', key: 'a', sol: r`A is true, and R is the reason: using each of the four angles once at a meeting point fills a full turn of $360^\circ$ with no gap and no overlap.`, d: 2, c: 'understanding', t: [4] }), (Cx) => { Cx.assert(80 + 95 + 70 + 115 === 360, 'angle sum fills a turn'); Cx.key('a'); });
Q('ar6', mk.ar({ a: 'A rectangle that is not a square has exactly two lines of symmetry.', r: 'A square has four lines of symmetry.', key: 'b', sol: r`A is true: the lines joining the midpoints of opposite sides. R is also true, but it is about a different figure, so it does not explain A.`, d: 2, c: 'analysis', t: [4] }), (Cx) => { Cx.assert(symmetries(S.rec).lines === 2 && symmetries(S.sq).lines === 4, 'two and four'); Cx.key('b'); });

// =============================================================== true-false
Q('tf1', mk.tf({ stem: 'Every square is a rectangle.', key: 't', sol: 'A square has four right angles, which is the definition of a rectangle (and it also has four equal sides). The statement is true.', d: 1, c: 'understanding', t: [1] }), (Cx) => { Cx.assert(classify(S.sq).rectangle, 'a square is a rectangle'); Cx.key('t'); });
Q('tf2', mk.tf({ stem: 'The diagonals of every parallelogram are equal.', key: 'f', sol: 'This is false. The diagonals of a parallelogram bisect each other, but they are equal only for a rectangle (or a square). For example, in a parallelogram with sides of $4.5$ cm and a slanting side the two diagonals differ.', d: 1, c: 'understanding', t: [1] }), (Cx) => { Cx.assert(classify(S.par).parallelogram && !classify(S.par).diag.equal, 'unequal diagonals'); Cx.key('f'); });
Q('tf3', mk.tf({ stem: 'A 4-gon with four right angles must have four equal sides.', key: 'f', sol: 'This is false. A rectangle that is not a square has four right angles, but its adjacent sides are different, for example $6$ cm and $4$ cm.', d: 2, c: 'understanding', t: [1] }), (Cx) => { const c = classify(S.rec); Cx.assert(c.rectangle && !c.rhombus, 'a 6 by 4 rectangle'); Cx.key('f'); });

// =============================================================== fill in the blanks
Q('fb1', mk.fill({ stem: r`The angles of a 4-gon add up to ____ degrees.`, acc: [['360']], sol: r`A diagonal splits a 4-gon into two triangles, each with angle sum $180^\circ$, so the angles add up to $360^\circ$.`, d: 1, c: 'recall', t: [1] }), (Cx) => { Cx.blank(2 * 180); });
Q('fb2', mk.fill({ stem: r`A carpenter in Shillong fixes a strut $ST$ across a triangular frame $PQR$, joining the midpoints of $PQ$ and $PR$. If the base $QR = 17.6$ cm, the strut is ____ cm long.`, acc: [['8.8']], sol: r`By the midpoint theorem $ST = \frac12 QR = 8.8$ cm.`, d: 1, c: 'understanding', t: [2] }), (Cx) => { Cx.blank(17.6 / 2); });
Q('fb3', mk.fill({ stem: 'A rhombus that is not a square has ____ lines of symmetry.', acc: [['2']], sol: 'Its two diagonals are the lines of symmetry, so it has $2$.', d: 1, c: 'understanding', t: [4] }), (Cx) => { Cx.blank(symmetries(S.rho).lines); });

// =============================================================== match (2 marks)
{
  const left = ['Rectangle', 'Rhombus', 'Kite', 'Trapezium'];
  const R = [classify(S.rec), classify(S.rho), classify(S.kite), classify(S.trap)];
  const right = ['Diagonals are perpendicular and bisect each other', 'Exactly one pair of parallel sides', 'Diagonals are equal and bisect each other', 'Two pairs of equal adjacent sides, diagonals perpendicular but not bisecting each other'];
  const order = [2, 0, 3, 1];
  Q('mt1', mk.match({ stem: 'A craft shop in Jaipur sells tiles of four shapes. Match each shape in Column I with its property in Column II.', left, right, order, sol: 'The diagonals of a rectangle are equal and bisect each other; those of a rhombus are perpendicular and bisect each other; a kite has two pairs of equal adjacent sides with perpendicular diagonals that do not bisect each other; a trapezium has exactly one pair of parallel sides.', d: 2, c: 'understanding', t: [1] }), (Cx) => Cx.assert(R[0].diag.equal && R[0].diagBisect && R[1].diag.perpendicular && R[1].diagBisect && R[2].kite && R[2].diag.perpendicular && !R[2].diagBisect && R[3].exactlyOnePair, 'each shape has its property'));
}
{
  const left = ['Square', 'Rhombus (not a square)', 'Kite', 'Parallelogram (not a rectangle or rhombus)'];
  const L = [symmetries(S.sq).lines, symmetries(S.rho).lines, symmetries(S.kite).lines, symmetries(S.par).lines];
  const right = ['$1$', '$0$', '$4$', '$2$'];
  const order = [2, 3, 0, 1];
  Q('mt2', mk.match({ stem: 'Match each 4-gon in Column I with its number of lines of symmetry in Column II.', left, right, order, sol: 'A square has $4$ lines of symmetry, a rhombus has $2$ (its diagonals), a kite has $1$, and a general parallelogram has $0$.', d: 2, c: 'understanding', t: [4] }), (Cx) => Cx.assert(L.every((v, i) => right[order[i]] === `$${v}$`), 'counts 4, 2, 1, 0'));
}
