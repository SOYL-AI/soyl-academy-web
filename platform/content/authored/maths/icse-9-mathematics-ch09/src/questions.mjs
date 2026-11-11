// ICSE 9 Mathematics ch09 Mid-Point and Intercept Theorems: objective items (mcq, assertion-reason, true-false, fill-blank, numerical).
// Answers, keys and option values are typed as literals; each check re-solves them from coordinates with geo.mjs: mid-points,
// lengths, parallelism (cross products), intercepts and angles are computed, never assumed, and the counter-examples behind the
// distractors are built and tested.
import { Q, mk, r } from './lib.mjs';
import * as G from './geo.mjs';

const { fig, mid, lerp, dist, polar, near, must, midTheorem, converse, medial, quadMid, trapezium, intercepts, divide, triFromSides, perimeter, area, parallel, isMid, angDeg, meet, add, sub } = G;
const O = (a) => a.map((s) => `$${s}$`);
const T = (A, B, C) => ({ A, B, C });
const fm = (v) => G.r6(v);

// ---------------------------------------------------------------- multiple-choice
Q('m01', mk.mcq({ stem: 'Which statement is the mid-point theorem?', opts: ['The segment joining the mid-points of two sides of a triangle is parallel to the third side and half as long as it.', 'The segment joining the mid-points of two sides of a triangle is parallel to the third side and equal to it.', 'The segment joining the mid-points of two sides of a triangle is perpendicular to the third side and half as long as it.', 'A line through the mid-point of one side of a triangle, parallel to a second side, bisects the third side.'], key: 'a', sol: r`Join the mid-points $D$ and $E$ of two sides $AB$ and $AC$ of $\triangle ABC$. Then $DE \parallel BC$ and $DE = \dfrac{1}{2}BC$. The wrong answers give the wrong length (equal to the third side), the wrong direction (perpendicular), or state the converse of the theorem, which is a different statement.`, d: 1, c: 'recall', t: [1], time: 60 }), (C) => {
  const { D, E } = midTheorem([3, 7], [0, 0], [10, 0]);
  C.assert(parallel(D, E, [0, 0], [10, 0]) && near(dist(D, E), 5) && !near(dist(D, E), 10) && Math.abs(G.dot(sub(E, D), [10, 0])) > 1, 'DE is parallel to BC, half of it, not equal and not perpendicular'); C.key('a');
});
{
  const t = T([5, 9], [0, 0], [15.6, 0]); const m = midTheorem(t.A, t.B, t.C);
  Q('m02', mk.mcq({ stem: r`In $\triangle XYZ$, $P$ and $Q$ are the mid-points of $XY$ and $XZ$ and $YZ = 15.6$ cm. The length of $PQ$ is`, opts: O([r`7.8 \text{ cm}`, r`15.6 \text{ cm}`, r`31.2 \text{ cm}`, r`3.9 \text{ cm}`]), key: 'a', sol: r`By the mid-point theorem $PQ = \dfrac{1}{2}YZ = \dfrac{1}{2} \times 15.6 = 7.8$ cm. The other values double, repeat or halve again.`, d: 1, c: 'understanding', t: [1], time: 60 }), (C) => { C.which([7.8, 15.6, 31.2, 3.9], fm(m.de)); C.assert(near(m.bc, 15.6), 'YZ = 15.6'); });
}
{
  const B = [0, 0], Cc = [9, 0], A = polar(Cc, 7, 112); const { D, E } = midTheorem(A, B, Cc);
  const fg = fig({ pts: { A, B, C: Cc, D, E }, pos: { A: 'n', D: 'w', E: 'e' }, segs: [['A', 'D'], ['D', 'B'], ['A', 'E'], ['E', 'C'], ['B', 'C'], ['D', 'E', undefined, { arrows: 1 }]], angles: [['C', 'B', 'A', r`$68^\circ$`], ['E', 'D', 'C', '$x$']] }, 'Triangle A B C with D and E the mid-points of A B and A C. The angle at C measures sixty eight degrees and the angle D E C is marked x.', 'Angle A C B is 68 degrees; find angle D E C.');
  Q('m03', mk.mcq({ stem: r`In $\triangle ABC$, $D$ and $E$ are the mid-points of $AB$ and $AC$, and $\angle ACB = 68^\circ$. The angle $\angle DEC$ is`, opts: O([r`112^\circ`, r`68^\circ`, r`22^\circ`, r`124^\circ`]), key: 'a', sol: r`$DE \parallel BC$ by the mid-point theorem, with $AC$ as a transversal. The angles $\angle DEC$ and $\angle ECB$ are co-interior angles, so $\angle DEC = 180^\circ - 68^\circ = 112^\circ$. (The angle $68^\circ$ itself is $\angle AED$, a corresponding angle.)`, d: 2, c: 'application', t: [1], time: 75, assets: [fg] }), (C) => { C.which([112, 68, 22, 124], fm(angDeg(E, D, Cc))); C.assert(near(angDeg(Cc, B, A), 68) && near(angDeg(E, A, D), 68), 'angle ACB = angle AED = 68'); });
}
{
  const t = T([0.9, 2.6], [0, 0], [1.84, 0]); const m = midTheorem(t.A, t.B, t.C);
  Q('m04', mk.mcq({ stem: 'Anita ties a string between the mid-points of the two slanting sides of a triangular banner. The base of the banner is 1.84 m. The string is', opts: ['0.92 m long and parallel to the base', '1.84 m long and parallel to the base', '3.68 m long and parallel to the base', '0.46 m long and parallel to the base'], key: 'a', sol: r`The string joins the mid-points of two sides of the triangle, so it is parallel to the base and half as long: $\dfrac{1}{2} \times 1.84 = 0.92$ m.`, d: 2, c: 'understanding', t: [1], time: 60 }), (C) => { C.assert(parallel(m.D, m.E, t.B, t.C), 'string parallel to base'); C.which([0.92, 1.84, 3.68, 0.46], fm(m.de)); });
}
{
  const t = T([6, 8], [0, 0], [15, 0]);
  const D = mid(t.A, t.B);
  const t3 = lerp(t.A, t.B, 1 / 3), e3 = meet(t3, add(t3, sub(t.C, t.B)), t.A, t.C); // D at one third, DE parallel to BC
  const e3b = meet(D, add(D, [1, 0.37]), t.A, t.C); // any line through the mid-point D
  const perp = meet(D, add(D, [-(t.B[1] - t.A[1]), t.B[0] - t.A[0]]), t.A, t.C); // perpendicular to AB at D
  Q('m05', mk.mcq({ stem: r`In $\triangle ABC$, the point $D$ lies on $AB$ and the point $E$ lies on $AC$. In which situation is $E$ certain to be the mid-point of $AC$?`, opts: [r`$D$ is the mid-point of $AB$ and $DE \parallel BC$.`, r`$D$ is any point of $AB$ and $DE \parallel BC$.`, r`$D$ is the mid-point of $AB$ and $DE$ is any line through $D$.`, r`$D$ is the mid-point of $AB$ and $DE \perp AB$.`], key: 'a', sol: r`This is the converse of the mid-point theorem: the line through the mid-point of one side, parallel to a second side, meets the third side at its mid-point. In the other three situations $E$ can lie elsewhere: if $D$ is one third of the way along $AB$, the parallel to $BC$ meets $AC$ one third of the way along; a line through the mid-point $D$ can meet $AC$ at other points; and a perpendicular to $AB$ at $D$ generally misses the mid-point of $AC$.`, d: 2, c: 'understanding', t: [2], time: 90 }), (C) => {
    C.assert(converse(t.A, t.B, t.C) && isMid(converse(t.A, t.B, t.C).E, t.A, t.C), 'D mid-point and parallel: E is the mid-point');
    C.assert(parallel(t3, e3, t.B, t.C) && !isMid(e3, t.A, t.C) && near(dist(t.A, e3), dist(t.A, t.C) / 3), 'D at a third: E at a third, not the mid-point');
    C.assert(!isMid(e3b, t.A, t.C) && !isMid(perp, t.A, t.C), 'other lines through D miss the mid-point'); C.key('a');
  });
}
{
  const A = [0, 0], Cc = [32, 0], B = [10, 14]; const { D, E } = converse(A, B, Cc);
  const x = (1 + 9) / 2; // 3x + 1 = 5x - 9
  Q('m06', mk.mcq({ stem: r`In $\triangle ABC$, $D$ is the mid-point of $AB$ and the line through $D$ parallel to $BC$ meets $AC$ at $E$. If $AE = (3x + 1)$ cm and $EC = (5x - 9)$ cm, then $AC$ is`, opts: O([r`32 \text{ cm}`, r`16 \text{ cm}`, r`26 \text{ cm}`, r`48 \text{ cm}`]), key: 'a', sol: r`By the converse of the mid-point theorem $E$ is the mid-point of $AC$, so $AE = EC$: $3x + 1 = 5x - 9$, giving $x = 5$. Then $AE = 16$ cm, $EC = 16$ cm and $AC = 32$ cm. The value $16$ cm is only one half.`, d: 3, c: 'application', t: [2], time: 90 }), (C) => { C.assert(x === 5 && near(dist(A, E), 3 * x + 1) && near(dist(E, Cc), 5 * x - 9) && isMid(E, A, Cc), 'x = 5 gives AE = EC = 16 on a triangle with AC = 32'); C.which([32, 16, 26, 48], fm(dist(A, Cc))); });
}
{
  const t = triFromSides(7.4, 9.8, 12.2); const m = medial(t.A, t.B, t.C);
  Q('m07', mk.mcq({ stem: 'A triangular plate has sides 7.4 cm, 9.8 cm and 12.2 cm. Its three mid-points are joined to form a smaller triangle. The perimeter of the smaller triangle is', opts: ['14.7 cm', '29.4 cm', '58.8 cm', '7.35 cm'], key: 'a', sol: r`Each side of the triangle of mid-points is half of the side of the plate that is parallel to it. So its perimeter is half of $7.4 + 9.8 + 12.2 = 29.4$, which is $14.7$ cm.`, d: 2, c: 'application', t: [1], time: 75 }), (C) => { C.assert(near(m.perABC, 29.4, 1e-9), 'perimeter 29.4'); C.which([14.7, 29.4, 58.8, 7.35], fm(m.per)); });
}
{
  const a = 14, h = a * Math.sqrt(3) / 2; const t = T([a / 2, h], [0, 0], [a, 0]); const m = medial(t.A, t.B, t.C);
  Q('m08', mk.mcq({ stem: 'The mid-points of the sides of an equilateral triangle of side 14 cm are joined to form a smaller triangle. Its perimeter is', opts: ['21 cm', '42 cm', '14 cm', '7 cm'], key: 'a', sol: r`Each side of the smaller triangle is $\dfrac{1}{2} \times 14 = 7$ cm, so its perimeter is $3 \times 7 = 21$ cm (half of $42$ cm).`, d: 2, c: 'understanding', t: [1], time: 60 }), (C) => { C.assert(near(dist(t.A, t.B), 14) && near(dist(m.D, m.E), 7) && near(dist(m.E, m.F), 7) && near(dist(m.F, m.D), 7), 'every side is 7'); C.which([21, 42, 14, 7], fm(m.per)); });
}
{
  const R = [[0, 0], [9, 0], [9, 4], [0, 4]]; const m = quadMid(...R);
  Q('m09', mk.mcq({ stem: 'The mid-points of the four sides of a 9 cm by 4 cm rectangle are joined in order. The figure formed is', opts: ['a rhombus that is not a square', 'a rectangle that is not a square', 'a square', 'a parallelogram whose adjacent sides are unequal'], key: 'a', sol: r`The sides of the figure of mid-points are parallel to the diagonals of the rectangle and half as long. The diagonals of a rectangle are equal, so all four sides are equal: it is a rhombus. The diagonals of a $9$ by $4$ rectangle are not perpendicular, so the rhombus has no right angle and is not a square.`, d: 3, c: 'application', t: [1], time: 90 }), (C) => {
    const [P, Q2, R2, S] = [m.P, m.Q, m.R, m.S];
    C.assert(m.equalDiagonals && !m.perpendicularDiagonals && [dist(P, Q2), dist(Q2, R2), dist(R2, S), dist(S, P)].every((x) => near(x, dist(P, Q2))) && Math.abs(G.dot(sub(Q2, P), sub(R2, Q2))) > 1, 'four equal sides, no right angle'); C.key('a');
  });
}
{
  const A = [0, 0], Cc = [9.2, 0], B = [4, -2.4], D = [4, 4]; const m = quadMid(A, B, Cc, D);
  Q('m10', mk.mcq({ stem: 'A kite-maker joins the mid-points of the four sides of a flat frame whose diagonals measure 9.2 cm and 6.4 cm. The perimeter of the figure formed by the joins is', opts: ['15.6 cm', '31.2 cm', '7.8 cm', '12.8 cm'], key: 'a', sol: r`The figure is a parallelogram with sides parallel to the diagonals and half as long: two sides of $4.6$ cm and two of $3.2$ cm. Its perimeter is $2(4.6 + 3.2) = 15.6$ cm, which is the sum of the two diagonals.`, d: 2, c: 'understanding', t: [1], time: 75 }), (C) => { C.assert(near(m.ac, 9.2) && near(m.bd, 6.4) && near(dist(m.P, m.Q), 4.6) && near(dist(m.Q, m.R), 3.2), 'sides 4.6 and 3.2'); C.which([15.6, 31.2, 7.8, 12.8], fm(m.per)); });
}
{
  const s = intercepts([0, 0], [3, 7], [1, 0.4], [0, 0.5, 1], [9, -1], [10.5, 6]);
  Q('m11', mk.mcq({ stem: r`Three parallel lines cut off equal intercepts $AB = BC$ on one transversal. A second transversal meets the lines at $P$, $Q$ and $R$. Then`, opts: [r`$PQ = QR$`, r`$PQ = 2\,QR$`, r`$PQ + QR = AB$`, r`$PQ \parallel QR$`], key: 'a', sol: r`By the equal intercept theorem, parallel lines that cut equal intercepts on one transversal cut equal intercepts on every transversal, so $PQ = QR$. The intercepts $PQ$ and $QR$ need not equal $AB$ and lie along one straight line, so they are not parallel.`, d: 1, c: 'understanding', t: [3], time: 60 }), (C) => { C.assert(near(s.s1[0], s.s1[1]) && near(s.s2[0], s.s2[1]) && !near(s.s2[0], 2 * s.s2[1]) && !near(s.s2[0] + s.s2[1], s.s1[0]), 'PQ = QR, and PQ + QR differs from AB'); C.key('a'); });
}
{
  const s = intercepts([0, 0], [2, 6], [1, 0.3], [0, 0.5, 1], [8, 0], [9.4, 6.5]); const pr = dist(s.on2[0], s.on2[2]);
  Q('m12', mk.mcq({ stem: r`The three parallel rails of a gate are equally spaced along a slanting bar. A second bar crosses the rails at $P$, $Q$ and $R$ with $PR = 9.6$ cm. The length $PQ$ is`, opts: ['4.8 cm', '9.6 cm', '2.4 cm', '19.2 cm'], key: 'a', sol: r`The rails are equally spaced along the first bar, so they make equal intercepts on the second bar: $PQ = QR$. Hence $PQ = \dfrac{1}{2} \times 9.6 = 4.8$ cm.`, d: 2, c: 'understanding', t: [3], time: 60 }), (C) => { C.assert(near(s.s2[0], s.s2[1]) && near(pr, 2 * s.s2[0]), 'PQ = QR = PR / 2'); C.which([4.8, 9.6, 2.4, 19.2], 9.6 / 2); });
}
{
  const s = intercepts([0, 0], [2.4, 7], [1, 0.35], [0, 0.25, 0.5, 0.75, 1], [8, -0.5], [9.5, 6.5]); const tot = dist(s.on2[0], s.on2[4]), part = dist(s.on2[1], s.on2[3]);
  Q('m13', mk.mcq({ stem: 'Five parallel lines make equal intercepts on one transversal. On a second transversal the first and the fifth line are 18.4 cm apart. The distance on this transversal between the second line and the fourth line is', opts: ['9.2 cm', '4.6 cm', '13.8 cm', '18.4 cm'], key: 'a', sol: r`The four intercepts on the second transversal are equal, each $\dfrac{18.4}{4} = 4.6$ cm. The second and fourth lines are two intercepts apart: $2 \times 4.6 = 9.2$ cm.`, d: 3, c: 'application', t: [3], time: 90 }), (C) => { C.assert(s.s2.length === 4 && s.s2.every((x) => near(x, s.s2[0])) && near(part, tot / 2), 'second to fourth line is half of the total'); C.which([9.2, 4.6, 13.8, 18.4], 18.4 / 2); });
}
{
  const A = [2, 4.5], B = [9.2, 4.5], Cc = [11.6, 0], D = [0, 0]; const m = trapezium(A, B, Cc, D);
  const fg = fig({ pts: { A, B, C: Cc, D, M: m.M, N: m.N }, pos: { A: 'nw', B: 'ne', C: 'se', D: 'sw', M: 'w', N: 'e' }, segs: [['A', 'B', '7.2 cm', { arrows: 1 }], ['D', 'C', '11.6 cm', { arrows: 1 }], ['A', 'M', undefined, { ticks: 1 }], ['M', 'D', undefined, { ticks: 1 }], ['B', 'N', undefined, { ticks: 2 }], ['N', 'C', undefined, { ticks: 2 }], ['M', 'N', undefined, { arrows: 1 }]] }, 'Trapezium A B C D with A B equal to seven point two centimetres parallel to D C equal to eleven point six centimetres. M and N are the mid-points of A D and B C.', 'Drawn to scale.');
  Q('m14', mk.mcq({ stem: r`In trapezium $ABCD$, $AB \parallel DC$, $AB = 7.2$ cm and $DC = 11.6$ cm. $M$ and $N$ are the mid-points of the legs $AD$ and $BC$. The length $MN$ is`, opts: O([r`9.4 \text{ cm}`, r`18.8 \text{ cm}`, r`4.4 \text{ cm}`, r`2.2 \text{ cm}`]), key: 'a', sol: r`The segment joining the mid-points of the legs of a trapezium is parallel to the bases and equal to half of their sum: $MN = \dfrac{1}{2}(7.2 + 11.6) = 9.4$ cm. The value $18.8$ is the sum, $4.4$ is the difference.`, d: 2, c: 'application', t: [3], time: 75, assets: [fg] }), (C) => { C.assert(near(dist(A, B), 7.2) && near(dist(D, Cc), 11.6), 'bases'); C.which([9.4, 18.8, 4.4, 2.2], fm(m.mn)); });
}
{
  const x = (26 - 2) / 6; const p = 2 * x + 3, q = 4 * x - 1; const A = [3, 5], B = [3 + p, 5], D = [0, 0], Cc = [q, 0]; const m = trapezium(A, B, Cc, D);
  Q('m15', mk.mcq({ stem: r`The parallel sides of a trapezium are $(2x + 3)$ cm and $(4x - 1)$ cm long, and the line joining the mid-points of its legs is $13$ cm long. The shorter parallel side is`, opts: O([r`11 \text{ cm}`, r`15 \text{ cm}`, r`13 \text{ cm}`, r`26 \text{ cm}`]), key: 'a', sol: r`The mid-line is half the sum of the parallel sides: $\dfrac{(2x + 3) + (4x - 1)}{2} = 13$, so $6x + 2 = 26$ and $x = 4$. The parallel sides are $2(4) + 3 = 11$ cm and $4(4) - 1 = 15$ cm; the shorter is $11$ cm.`, d: 3, c: 'application', t: [3], time: 90 }), (C) => { C.assert(x === 4 && p === 11 && q === 15 && near(m.mn, 13), 'x = 4: sides 11 and 15, mid-line 13'); C.which([11, 15, 13, 26], Math.min(p, q)); });
}
{
  const A2 = [2.5, 5], B2 = [11.5, 5], D2 = [0, 0], C2 = [14, 0]; const m = trapezium(A2, B2, C2, D2);
  Q('m16', mk.mcq({ stem: 'The parallel sides of a trapezium are 14 cm and 9 cm. The segment that joins the mid-points of its two diagonals is', opts: ['2.5 cm long', '5 cm long', '11.5 cm long', '23 cm long'], key: 'a', sol: r`The mid-points of the diagonals lie on the line joining the mid-points of the legs. Applying the mid-point theorem in the triangles formed by a diagonal shows that this segment is half of the difference of the parallel sides: $\dfrac{1}{2}(14 - 9) = 2.5$ cm. The value $11.5$ cm is the mid-line, which joins the mid-points of the legs.`, d: 4, c: 'analysis', t: [3], time: 120 }), (C) => { C.assert(near(dist(A2, B2), 9) && near(dist(D2, C2), 14) && near(m.mn, 11.5), 'bases and mid-line'); C.which([2.5, 5, 11.5, 23], fm(m.pq)); });
}
{
  const t = T([1.6, 6], [0, 0], [8, 0]); const c = converse(t.A, t.B, t.C);
  const tt = lerp(t.A, t.B, 0.25), ee = meet(tt, add(tt, sub(t.C, t.B)), t.A, t.C), through = meet(c.D, add(c.D, [2, 1]), t.A, t.C);
  Q('m17', mk.mcq({ stem: 'Which statement is the converse of the mid-point theorem?', opts: ['A line drawn through the mid-point of one side of a triangle, parallel to a second side, bisects the third side.', 'The line joining the mid-points of two sides of a triangle is parallel to the third side.', 'A line through the mid-point of one side of a triangle bisects the third side.', 'A line drawn parallel to one side of a triangle bisects the other two sides.'], key: 'a', sol: r`The converse says that if $D$ is the mid-point of $AB$ and $DE \parallel BC$ with $E$ on $AC$, then $E$ is the mid-point of $AC$. Without the word parallel, or without the mid-point, the claim fails: a line through $D$ can meet $AC$ anywhere, and a line parallel to $BC$ cuts $AB$ and $AC$ in the same ratio, which need not be $1 : 1$.`, d: 1, c: 'recall', t: [2], time: 60 }), (C) => { C.assert(isMid(c.E, t.A, t.C) && !isMid(through, t.A, t.C) && !isMid(ee, t.A, t.C) && parallel(tt, ee, t.B, t.C), 'converse holds; a non-parallel line, or a parallel from a non-mid-point, fails'); C.key('a'); });
}
{
  const t = T([6, 8], [0, 0], [15, 0]); const D1 = lerp(t.A, t.B, 1 / 3); const E1 = meet(D1, add(D1, sub(t.C, t.B)), t.A, t.C);
  const iso = T([5, 9], [0, 0], [10, 0]); const D2 = lerp(iso.A, iso.B, 1 / 3), E2 = meet(D2, add(D2, sub(iso.C, iso.B)), iso.A, iso.C);
  const rt = T([0, 7], [0, 0], [9, 0]); const D3 = lerp(rt.A, rt.B, 1 / 3), E3 = meet(D3, add(D3, sub(rt.C, rt.B)), rt.A, rt.C);
  Q('m18', mk.mcq({ stem: r`Ravi says: "$D$ is a point on $AB$ and $E$ a point on $AC$ with $DE \parallel BC$, so $E$ is the mid-point of $AC$." What must be added for his statement to be correct?`, opts: [r`$D$ must be the mid-point of $AB$.`, r`$AB$ must equal $AC$.`, r`$\angle ADE$ must be a right angle.`, r`$DE$ must be shorter than $BC$.`], key: 'a', sol: r`A line parallel to $BC$ cuts $AB$ and $AC$ in the same ratio, so $E$ is the mid-point of $AC$ exactly when $D$ is the mid-point of $AB$. Making the triangle isosceles, or $\angle ADE$ a right angle, does not help: with $D$ one third of the way along $AB$ the parallel still meets $AC$ one third of the way along. And $DE$ is always shorter than $BC$ here, whatever the position of $D$.`, d: 3, c: 'analysis', t: [2], time: 90 }), (C) => {
    C.assert(parallel(D1, E1, t.B, t.C) && !isMid(E1, t.A, t.C), 'D at a third, E at a third');
    C.assert(near(dist(iso.A, iso.B), dist(iso.A, iso.C)) && parallel(D2, E2, iso.B, iso.C) && !isMid(E2, iso.A, iso.C), 'isosceles does not help');
    C.assert(near(angDeg(D3, rt.A, E3), 90) && parallel(D3, E3, rt.B, rt.C) && !isMid(E3, rt.A, rt.C), 'a right angle ADE does not help');
    C.assert(dist(D1, E1) < dist(t.B, t.C), 'DE is shorter than BC'); C.key('a');
  });
}
{
  const t = triFromSides(10.4, 9.4, 7.2); const m = medial(t.A, t.B, t.C);
  const F = mid(t.A, t.B), E = mid(t.A, t.C), D = mid(t.B, t.C);
  Q('m19', mk.mcq({ stem: r`In $\triangle ABC$, $AB = 10.4$ cm, $BC = 9.4$ cm and $CA = 7.2$ cm. $D$, $E$, $F$ are the mid-points of $BC$, $CA$, $AB$. The perimeter of the quadrilateral $AFDE$ is`, opts: O([r`17.6 \text{ cm}`, r`8.8 \text{ cm}`, r`35.2 \text{ cm}`, r`27 \text{ cm}`]), key: 'a', sol: r`$AFDE$ is a parallelogram, because $FD \parallel AC$ and $DE \parallel AB$ (mid-point theorem), with $AF = DE = \dfrac{1}{2}AB = 5.2$ cm and $AE = FD = \dfrac{1}{2}AC = 3.6$ cm. Its perimeter is $2(5.2 + 3.6) = 17.6$ cm, which equals $AB + AC$. The value $27$ cm would be the perimeter of $\triangle ABC$.`, d: 3, c: 'application', t: [1], time: 90 }), (C) => { C.assert(G.parallelogram(t.A, F, D, E) && near(m.perABC, 27), 'AFDE parallelogram; triangle perimeter 27'); C.which([17.6, 8.8, 35.2, 27], fm(perimeter(t.A, F, D, E))); });
}
{
  const d = divide([0, 0], [8, 0], 7, 50);
  Q('m20', mk.mcq({ stem: 'A segment AB is to be divided into 7 equal parts by drawing a ray from A, marking equal steps along it, joining the last mark to B and drawing parallels through the other marks. How many equal steps are marked on the ray?', opts: ['7', '6', '8', '14'], key: 'a', sol: r`To make $7$ equal parts we need $7$ equal steps on the ray. The last (seventh) mark is joined to $B$, and the six lines parallel to this join pass through marks $1$ to $6$ and cut $AB$ into $7$ equal parts.`, d: 1, c: 'recall', t: [3], time: 60 }), (C) => { C.assert(d.marks.length - 1 === 7 && d.pts.length - 2 === 6, '7 steps, 6 inner parallels'); C.which([7, 6, 8, 14], d.marks.length - 1); });
}
{
  const t = T([4, 8], [0, 0], [13.6, 0]); const S = mid(t.A, t.B); const Tt = meet(S, add(S, sub(t.C, t.B)), t.A, t.C); const U = meet(Tt, add(Tt, sub(t.B, t.A)), t.B, t.C);
  const fg = fig({ pts: { P: t.A, Q: t.B, R: t.C, S, T: Tt, U }, pos: { P: 'n', S: 'w', T: 'e', Q: 'sw', R: 'se', U: 's' }, segs: [['P', 'S', undefined, { ticks: 1, arrows: 2 }], ['S', 'Q', undefined, { ticks: 1 }], ['P', 'T', undefined, { ticks: 2 }], ['T', 'R', undefined, { ticks: 2 }], ['Q', 'R', '13.6 cm', { arrows: 1 }], ['S', 'T', undefined, { arrows: 1 }], ['T', 'U', undefined, { arrows: 2 }]] }, 'Triangle P Q R with S the mid-point of P Q. The line S T is parallel to Q R, and the line T U is drawn from T parallel to P Q to meet Q R at U. Q R measures thirteen point six centimetres.', 'Drawn to scale.');
  Q('m21', mk.mcq({ stem: r`In $\triangle PQR$, $S$ is the mid-point of $PQ$. The line through $S$ parallel to $QR$ meets $PR$ at $T$, and the line through $T$ parallel to $PQ$ meets $QR$ at $U$. If $QR = 13.6$ cm, then $QU$ is`, opts: O([r`6.8 \text{ cm}`, r`13.6 \text{ cm}`, r`3.4 \text{ cm}`, r`10.2 \text{ cm}`]), key: 'a', sol: r`By the converse of the mid-point theorem in $\triangle PQR$, $T$ is the mid-point of $PR$. Now apply it again with $T$ and the line $TU \parallel PQ$: $U$ is the mid-point of $QR$. So $QU = \dfrac{1}{2} \times 13.6 = 6.8$ cm.`, d: 3, c: 'application', t: [2], time: 90, assets: [fg] }), (C) => { C.assert(isMid(Tt, t.A, t.C) && isMid(U, t.B, t.C) && G.parallelogram(t.B, U, Tt, S), 'T and U are mid-points; SQUT is a parallelogram'); C.which([6.8, 13.6, 3.4, 10.2], fm(dist(t.B, U))); });
}
{
  const t = T([2, 7], [0, 0], [11, 0]); const m = midTheorem(t.A, t.B, t.C);
  Q('m22', mk.mcq({ stem: r`$D$ and $E$ are the mid-points of $AB$ and $AC$ in a scalene $\triangle ABC$. Which of these statements is **not** true?`, opts: [r`$\angle ADE = \angle ACB$`, r`$DE \parallel BC$`, r`$DE = \dfrac{1}{2}BC$`, r`$\angle ADE = \angle ABC$`], key: 'a', sol: r`$DE \parallel BC$ and $DE = \dfrac{1}{2}BC$ are the mid-point theorem. Since $DE \parallel BC$, $AB$ is a transversal and the corresponding angles are equal: $\angle ADE = \angle ABC$. The angle equal to $\angle ACB$ is $\angle AED$, so $\angle ADE = \angle ACB$ is false unless $AB = AC$, which a scalene triangle rules out.`, d: 3, c: 'analysis', t: [1], time: 75 }), (C) => { C.assert(parallel(m.D, m.E, t.B, t.C) && near(angDeg(m.D, t.A, m.E), angDeg(t.B, t.A, t.C)) && !near(angDeg(m.D, t.A, m.E), angDeg(t.C, t.A, t.B)) && !near(dist(t.A, t.B), dist(t.A, t.C)) && !near(dist(t.A, t.B), dist(t.B, t.C)) && !near(dist(t.A, t.C), dist(t.B, t.C)), 'angle ADE = ABC, not ACB, in a scalene triangle'); C.key('a'); });
}

// ---------------------------------------------------------------- assertion-reason
Q('ar1', mk.ar({ a: r`In $\triangle ABC$, if $D$ and $E$ are the mid-points of $AB$ and $AC$ and $DE = 5$ cm, then $BC = 10$ cm.`, r: 'The segment joining the mid-points of two sides of a triangle is half of the third side.', key: 'c', sol: r`By the mid-point theorem $DE = \dfrac{1}{2}BC$, so $BC = 2 \times 5 = 10$ cm. So A is true, R is true, and R is exactly the reason for A. Option (c).`, d: 1, c: 'understanding', t: [1] }), (C) => { const m = midTheorem([2, 6], [0, 0], [10, 0]); C.assert(near(m.de, 5) && near(m.bc, 10), 'DE = 5, BC = 10'); C.key('c'); });
{
  const t = T([6, 8], [0, 0], [15, 0]); const D = mid(t.A, t.B); const E1 = meet(D, add(D, sub(t.C, t.B)), t.A, t.C); const E2 = meet(D, add(D, [3, 1]), t.A, t.C);
  Q('ar2', mk.ar({ a: r`In $\triangle ABC$, $D$ is the mid-point of $AB$ and $E$ is a point of $AC$ with $DE \parallel BC$. Then $AE = EC$.`, r: r`If a line through $D$ meets $AC$ at $E$, then $DE = \dfrac{1}{2}BC$.`, key: 'a', sol: r`A is true: it is the converse of the mid-point theorem. R is false: a line through $D$ that is not parallel to $BC$ also meets $AC$, but then $DE$ is not parallel to $BC$ and has no reason to be half of it. Option (a).`, d: 2, c: 'understanding', t: [2] }), (C) => { C.assert(isMid(E1, t.A, t.C) && !near(dist(D, E2), dist(t.B, t.C) / 2, 1e-6), 'A true; R fails for a slanted line'); C.key('a'); });
}
{
  const t = T([6, 8], [0, 0], [15, 0]); const D = mid(t.A, t.B); const hits = []; // points E on AC with DE = BC / 2
  const u = sub(t.C, t.A), w = sub(t.A, D); const a2 = G.dot(u, u), b2 = 2 * G.dot(u, w), c2 = G.dot(w, w) - (dist(t.B, t.C) / 2) ** 2; const disc = b2 * b2 - 4 * a2 * c2;
  for (const s of [(-b2 + Math.sqrt(disc)) / (2 * a2), (-b2 - Math.sqrt(disc)) / (2 * a2)]) hits.push(add(t.A, [u[0] * s, u[1] * s]));
  const other = hits.find((h) => !isMid(h, t.A, t.C));
  Q('ar3', mk.ar({ a: r`In $\triangle ABC$, if $D$ is the mid-point of $AB$ and $E$ is a point of $AC$ with $DE = \dfrac{1}{2}BC$, then $E$ must be the mid-point of $AC$.`, r: 'The line through the mid-point of one side of a triangle, parallel to a second side, meets the third side at its mid-point.', key: 'b', sol: r`R is true: it is the converse of the mid-point theorem. A is false: a circle of radius $\dfrac{1}{2}BC$ about $D$ cuts the line $AC$ in two points, and only one of them is the mid-point, so the length alone does not decide $E$. (R is also not a reason for A, because A does not mention parallel lines.) Option (b).`, d: 3, c: 'analysis', t: [2] }), (C) => { C.assert(hits.length === 2 && hits.some((h) => isMid(h, t.A, t.C)) && other && near(dist(D, other), dist(t.B, t.C) / 2) && !isMid(other, t.A, t.C) && !parallel(D, other, t.B, t.C), 'a second point E has DE = BC/2 but is not the mid-point'); C.key('b'); });
}
{
  const tz = trapezium([2, 5], [7, 5], [10, 0], [0, 0]);
  Q('ar4', mk.ar({ a: r`In trapezium $ABCD$ with $AB \parallel DC$, the line joining the mid-points of the legs $AD$ and $BC$ is parallel to $AB$.`, r: 'The line joining the mid-points of the legs of a trapezium is half of the sum of the parallel sides.', key: 'd', sol: r`A is true and R is true. But R is a statement about length, while A is about direction, so R does not explain A. The parallelism is explained by the mid-point theorem applied in the triangle formed by joining $A$ to the mid-point of $BC$ and extending that line to meet $DC$ produced. Option (d).`, d: 3, c: 'analysis', t: [3] }), (C) => { C.assert(parallel(tz.M, tz.N, [2, 5], [7, 5]) && near(tz.mn, (5 + 10) / 2), 'A and R both true'); C.key('d'); });
}
{
  const m = quadMid([0, 0], [4, -2], [10, 0], [4, 4.0]); // diagonals AC = 10 (horizontal) and BD = 6 (vertical)
  Q('ar5', mk.ar({ a: 'The mid-points of the sides of a quadrilateral whose diagonals are 10 cm and 6 cm form a parallelogram of perimeter 16 cm.', r: 'Each side of the parallelogram of mid-points is parallel to a diagonal of the quadrilateral and half as long.', key: 'c', sol: r`By R the sides of the parallelogram are $5$ cm, $3$ cm, $5$ cm and $3$ cm, so its perimeter is $16$ cm. A is true, and R is the reason. Option (c).`, d: 2, c: 'application', t: [1] }), (C) => { C.assert(near(m.ac, 10) && near(m.bd, 6) && near(m.per, 16), 'perimeter 16'); C.key('c'); });
}

// ---------------------------------------------------------------- true-false
Q('tf1', mk.tf({ stem: r`Priya joins the mid-points $D$ and $E$ of $AB$ and $AC$ in $\triangle ABC$ and says: "$DE \parallel BC$, so $DE = BC$."`, key: 'f', sol: r`Being parallel does not make the segments equal. By the mid-point theorem $DE = \dfrac{1}{2}BC$, so $DE$ is only half as long.`, d: 1, c: 'understanding', t: [1] }), (C) => { const m = midTheorem([3, 7], [0, 0], [10, 0]); C.assert(parallel(m.D, m.E, [0, 0], [10, 0]) && near(m.de, 5) && !near(m.de, 10), 'parallel but half'); C.key('f'); });
Q('tf2', mk.tf({ stem: r`The line joining the mid-points of the non-parallel sides of a trapezium is parallel to the parallel sides.`, key: 't', sol: r`True: if $AB \parallel DC$ and $M$, $N$ are the mid-points of $AD$ and $BC$, then $MN \parallel AB \parallel DC$, and $MN = \dfrac{1}{2}(AB + DC)$.`, d: 2, c: 'understanding', t: [3] }), (C) => { const m = trapezium([1, 6], [8, 6], [11, 0], [0, 0]); C.assert(parallel(m.M, m.N, [1, 6], [8, 6]) && parallel(m.M, m.N, [0, 0], [11, 0]), 'MN parallel to both bases'); C.key('t'); });
{
  const t = T([6, 8], [0, 0], [15, 0]); const D = mid(t.A, t.B); const E = meet(D, add(D, [4, 1]), t.A, t.C);
  Q('tf3', mk.tf({ stem: r`In $\triangle ABC$, a line through the mid-point $D$ of $AB$ meets $AC$ at $E$. Then $E$ is always the mid-point of $AC$.`, key: 'f', sol: r`False. $E$ is the mid-point only when the line through $D$ is parallel to $BC$. A slanted line through $D$ meets $AC$ at some other point, so the word "parallel" cannot be dropped from the converse.`, d: 3, c: 'analysis', t: [2] }), (C) => { C.assert(!isMid(E, t.A, t.C) && !parallel(D, E, t.B, t.C), 'a slanted line through D misses the mid-point'); C.key('f'); });
}
{
  const s = intercepts([0, 0], [2, 6], [1, 0.3], [0, 0.5, 1], [6, 0], [12, 7]);
  Q('tf4', mk.tf({ stem: r`In the equal intercept theorem, the two transversals that cut the parallel lines need not be parallel to each other.`, key: 't', sol: r`True. Any two lines that cross the parallel lines can serve as transversals; the theorem says that equal intercepts on one transversal force equal intercepts on the other. The transversals may even meet outside the figure.`, d: 2, c: 'understanding', t: [3] }), (C) => { C.assert(!parallel([0, 0], [2, 6], [6, 0], [12, 7]) && near(s.s2[0], s.s2[1]), 'non-parallel transversals still give equal intercepts'); C.key('t'); });
}
{
  const m = quadMid([0, 0], [4, -2], [10, 0], [4, 4]); // perpendicular diagonals 10 and 6
  Q('tf5', mk.tf({ stem: r`If the diagonals of a quadrilateral are perpendicular, the quadrilateral formed by joining the mid-points of its sides is a rhombus.`, key: 'f', sol: r`False. The sides of the figure of mid-points are parallel to the diagonals, so perpendicular diagonals make adjacent sides perpendicular: the figure is a rectangle. It is a rhombus only if the diagonals are also equal; for diagonals of $10$ cm and $6$ cm its sides are $5$ cm and $3$ cm.`, d: 3, c: 'analysis', t: [1] }), (C) => { C.assert(m.perpendicularDiagonals && !m.equalDiagonals && near(dist(m.P, m.Q), 5) && near(dist(m.Q, m.R), 3), 'a rectangle 5 by 3, not a rhombus'); C.key('f'); });
}

// ---------------------------------------------------------------- fill in the blank
{
  const t = T([0.6, 1.8], [0, 0], [1.3, 0]); const m = midTheorem(t.A, t.B, t.C);
  Q('f1', mk.fill({ stem: r`The two sloping legs of an A-shaped step-ladder have their feet $1.3$ m apart. A crossbar is fixed between the mid-points of the legs. The crossbar is ______ m long.`, acc: [['0.65']], sol: r`The crossbar joins the mid-points of two sides of the triangle formed by the legs and the floor, so it is half the third side: $\dfrac{1}{2} \times 1.3 = 0.65$ m.`, d: 1, c: 'understanding', t: [1] }), (C) => { C.assert(near(dist(t.B, t.C), 1.3) && parallel(m.D, m.E, t.B, t.C), 'crossbar parallel to the floor'); C.blank(fm(m.de)); });
}
{
  const m = quadMid([0, 0], [4, -2], [11, 0], [4, 5]);
  Q('f2', mk.fill({ stem: 'The mid-points of the sides of a quadrilateral whose diagonals are 11 cm and 7 cm are joined in order. The perimeter of the parallelogram formed is ______ cm.', acc: [['18']], sol: r`Its sides are half the diagonals: $5.5$ cm and $3.5$ cm, each twice. The perimeter is $2(5.5 + 3.5) = 18$ cm.`, d: 2, c: 'understanding', t: [1] }), (C) => { C.assert(near(m.ac, 11) && near(m.bd, 7), 'diagonals 11 and 7'); C.blank(fm(m.per)); });
}
{
  const m = trapezium([2, 4], [10.5, 4], [13.7, 0], [0, 0]);
  Q('f3', mk.fill({ stem: 'In a trapezium the parallel sides are 8.5 cm and 13.7 cm. The line joining the mid-points of the other two sides is ______ cm long.', acc: [['11.1']], sol: r`The mid-line is half the sum of the parallel sides: $\dfrac{1}{2}(8.5 + 13.7) = \dfrac{22.2}{2} = 11.1$ cm.`, d: 2, c: 'understanding', t: [3] }), (C) => { C.assert(near(dist([2, 4], [10.5, 4]), 8.5) && near(dist([0, 0], [13.7, 0]), 13.7), 'bases 8.5 and 13.7'); C.blank(fm(m.mn)); });
}
{
  const d = divide([0, 0], [9, 0], 6, 55);
  Q('f4', mk.fill({ stem: 'A segment AB is divided into 6 equal parts by the parallel-line method. Besides the line through the last mark of the ray (which passes through B), ______ parallel lines are drawn through the other marks.', acc: [['5']], sol: r`There are $6$ marks on the ray. The sixth is joined to $B$; the lines through marks $1$ to $5$ are parallel to that join and cut $AB$ into $6$ equal parts. So $5$ more parallel lines are drawn.`, d: 2, c: 'understanding', t: [3] }), (C) => { C.assert(d.pts.length - 2 === 5, 'five inner parallels'); C.blank(d.pts.length - 2); });
}
{
  const t = triFromSides(11.2, 12.6, 14.8); const m = medial(t.A, t.B, t.C);
  Q('f5', mk.fill({ stem: 'The perimeter of a triangle is 38.6 cm. The triangle formed by joining the mid-points of its sides has perimeter ______ cm.', acc: [['19.3']], sol: r`Each side of the triangle of mid-points is half of the parallel side of the original, so its perimeter is half: $\dfrac{38.6}{2} = 19.3$ cm.`, d: 2, c: 'understanding', t: [1] }), (C) => { C.assert(near(m.perABC, 38.6), 'perimeter 38.6'); C.blank(fm(m.per)); });
}

// ---------------------------------------------------------------- numerical
{
  const t = triFromSides(12.8, 18.4, 15.2); const m = midTheorem(t.A, t.B, t.C);
  Q('n1', mk.num({ stem: r`In $\triangle ABC$, $AB = 12.8$ cm, $BC = 18.4$ cm and $CA = 15.2$ cm. $D$ and $E$ are the mid-points of $AB$ and $AC$. Find the perimeter of $\triangle ADE$, in cm.`, value: 23.2, sol: r`$AD = \dfrac{1}{2} \times 12.8 = 6.4$, $AE = \dfrac{1}{2} \times 15.2 = 7.6$ and $DE = \dfrac{1}{2} \times 18.4 = 9.2$ (mid-point theorem). The perimeter is $6.4 + 7.6 + 9.2 = 23.2$ cm, half of the perimeter $46.4$ cm of $\triangle ABC$.`, scheme: [['AD = 6.4, AE = 7.6', 0.5], ['DE = 9.2, perimeter 23.2', 0.5]], d: 2, c: 'application', t: [1], time: 90 }), (C) => { C.val(fm(dist(t.A, m.D) + dist(t.A, m.E) + m.de)); C.assert(near(dist(t.A, t.B) + dist(t.B, t.C) + dist(t.C, t.A), 46.4), 'perimeter 46.4'); });
}
{
  const A = [0, 0], Cc = [24, 0], B = [9, -6], D = [9, 12]; const m = quadMid(A, B, Cc, D);
  Q('n2', mk.num({ marks: 2, stem: r`The diagonals $AC$ and $BD$ of a kite-shaped frame $ABCD$ are perpendicular, with $AC = 24$ cm and $BD = 18$ cm. The mid-points of its four sides are joined in order. Find the area, in cm$^{2}$, of the figure formed.`, value: 108, sol: r`The figure of mid-points has sides parallel to the diagonals and half as long. As the diagonals are perpendicular, adjacent sides are perpendicular, so it is a rectangle $12$ cm by $9$ cm. Its area is $12 \times 9 = 108$ cm$^{2}$.`, scheme: [['Sides 12 and 9, rectangle (perpendicular diagonals)', 1], ['Area 108', 1]], d: 3, c: 'application', t: [1], time: 120 }), (C) => { C.assert(m.perpendicularDiagonals && near(m.ac, 24) && near(m.bd, 18) && near(dist(m.P, m.Q), 12) && near(dist(m.Q, m.R), 9), 'rectangle 12 by 9'); C.val(fm(area(m.P, m.Q, m.R, m.S))); });
}
{
  const m = trapezium([3, 5], [13.2, 5], [18.8, 0], [0, 0]);
  Q('n3', mk.num({ stem: r`The line joining the mid-points of the legs of a trapezium is $14.5$ cm long, and one of the parallel sides is $10.2$ cm. Find the other parallel side, in cm.`, value: 18.8, sol: r`The mid-line is half the sum of the parallel sides, so the sum is $2 \times 14.5 = 29$ cm. The other side is $29 - 10.2 = 18.8$ cm.`, scheme: [['Sum of parallel sides 29', 0.5], ['Other side 18.8', 0.5]], d: 2, c: 'application', t: [3], time: 75 }), (C) => { C.assert(near(m.mn, 14.5) && near(dist([3, 5], [13.2, 5]), 10.2), 'mid-line 14.5, base 10.2'); C.val(fm(dist([0, 0], [18.8, 0]))); });
}
{
  const t = T([20, 30], [0, 0], [56, 0]); const m = midTheorem(t.A, t.B, t.C); const x = 10;
  Q('n4', mk.num({ marks: 2, stem: r`In $\triangle ABC$, $D$ and $E$ are the mid-points of $AB$ and $AC$. $DE = (3x - 2)$ cm and $BC = (5x + 6)$ cm. Find the length of $BC$, in cm.`, value: 56, sol: r`$BC = 2\,DE$, so $5x + 6 = 2(3x - 2) = 6x - 4$, giving $x = 10$. Then $BC = 5(10) + 6 = 56$ cm. Check: $DE = 3(10) - 2 = 28$ cm and $2 \times 28 = 56$.`, scheme: [['5x + 6 = 2(3x - 2)', 1], ['x = 10, BC = 56', 1]], d: 3, c: 'application', t: [1], time: 120 }), (C) => { C.assert(5 * x + 6 === 2 * (3 * x - 2) && near(m.de, 3 * x - 2) && near(m.bc, 5 * x + 6), 'x = 10: DE = 28, BC = 56'); C.val(fm(m.bc)); });
}
{
  const s = intercepts([0, 0], [2.4, 7], [1, 0.35], [0, 1 / 3, 2 / 3, 1], [8, -0.5], [9.5, 6.5]); const tot = dist(s.on2[0], s.on2[3]);
  Q('n5', mk.num({ stem: r`Four parallel lines make equal intercepts on one transversal. On a second transversal the first and the fourth line are $16.5$ cm apart. Find the distance, in cm, between the first and the second line along the second transversal.`, value: 5.5, sol: r`The three intercepts on the second transversal are equal (equal intercept theorem), so each is $\dfrac{16.5}{3} = 5.5$ cm.`, scheme: [['The three intercepts are equal', 0.5], ['16.5 divided by 3 = 5.5', 0.5]], d: 2, c: 'application', t: [3], time: 75 }), (C) => { C.assert(s.s2.length === 3 && s.s2.every((x) => near(x, s.s2[0])) && near(s.s2[0], tot / 3), 'three equal intercepts'); C.val(16.5 / 3); });
}
{
  const m = trapezium([3, 4], [15.4, 4], [19, 0], [0, 0]);
  Q('n6', mk.num({ marks: 2, stem: r`The parallel sides of a trapezium are $19$ cm and $12.4$ cm. Find the length, in cm, of the segment that joins the mid-points of its diagonals.`, value: 3.3, sol: r`The segment joining the mid-points of the diagonals lies along the mid-line of the trapezium and equals half of the difference of the parallel sides: $\dfrac{1}{2}(19 - 12.4) = \dfrac{6.6}{2} = 3.3$ cm.`, scheme: [['Half of the difference of the parallel sides', 1], ['(19 - 12.4) / 2 = 3.3', 1]], d: 4, c: 'analysis', t: [3], time: 120 }), (C) => { C.assert(near(dist([3, 4], [15.4, 4]), 12.4) && near(dist([0, 0], [19, 0]), 19), 'bases 12.4 and 19'); C.val(fm(m.pq)); });
}
{
  const t = T([5, 9.5], [0, 0], [16, 0]); const m = medial(t.A, t.B, t.C);
  Q('n7', mk.num({ stem: r`The area of $\triangle ABC$ is $76$ cm$^{2}$. Its three mid-points are joined to form a smaller triangle. Find the area of the smaller triangle, in cm$^{2}$.`, value: 19, sol: r`The three lines joining the mid-points cut $\triangle ABC$ into four triangles that are congruent to the triangle of mid-points (each has sides half of $\triangle ABC$'s sides). The smaller triangle is one of four equal parts: $\dfrac{76}{4} = 19$ cm$^{2}$.`, scheme: [['Four congruent triangles', 0.5], ['76 / 4 = 19', 0.5]], d: 2, c: 'understanding', t: [1], time: 75 }), (C) => { C.assert(near(area(t.A, t.B, t.C), 76) && near(area(m.D, m.E, m.F), 19), 'areas 76 and 19'); C.val(fm(area(m.D, m.E, m.F))); });
}
