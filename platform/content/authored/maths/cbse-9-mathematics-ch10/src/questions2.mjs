// CBSE 9 Mathematics ch10 4-gons (Quadrilaterals): written items (short 2 and 3 marks, long 5 marks, case-based).
// Lengths, angles and types are recomputed from coordinates built from the givens; proofs carry a numerical spot-check on a drawn example.
import { Q, caseQ, child, mk } from './lib.mjs';
import { r, close, range, dist, angleAt, polar, lineInter, fig } from './h.mjs';
import { classify, symmetries, varignon, polyArea, add, sub, scale, mid, par } from './q.mjs';
import { triSSS } from './g.mjs';

const pt = (at, label_position) => ({ at, ...(label_position ? { label_position } : {}) });
// figure for the parallelogram with diagonal points P and Q (long item)
const pA = [0, 0], pB = [6, 0], pD = [2, 3], pC = add(pB, pD), pP = add(pB, scale(sub(pD, pB), 0.25)), pQ = add(pD, scale(sub(pB, pD), 0.25));
const figAPCQ = fig({
  points: { A: pt(pA, 'sw'), B: pt(pB, 'se'), C: pt(pC, 'ne'), D: pt(pD, 'nw'), P: pt(pP, 'ne'), Q: pt(pQ, 'sw') },
  segments: [{ from: 'A', to: 'B' }, { from: 'B', to: 'C' }, { from: 'C', to: 'D' }, { from: 'D', to: 'A' }, { from: 'B', to: 'P', ticks: 1 }, { from: 'Q', to: 'D', ticks: 1 }, { from: 'P', to: 'Q' }, { from: 'A', to: 'P', dashed: true }, { from: 'P', to: 'C', dashed: true }, { from: 'C', to: 'Q', dashed: true }, { from: 'Q', to: 'A', dashed: true }],
}, 'A parallelogram ABCD with the diagonal BD. The points P and Q lie on BD with BP equal to DQ, marked with one tick each. The dashed lines join A to P, P to C, C to Q and Q to A to form the 4-gon APCQ.', 'ABCD is a parallelogram and BP = DQ.');

// =============================================================== short answer, 2 marks
Q('s201', mk.short({ marks: 2, stem: 'Define a parallelogram and a rhombus. How is a rhombus related to a parallelogram?', model: r`A **parallelogram** is a 4-gon in which both pairs of opposite sides are parallel. A **rhombus** is a parallelogram with all four sides equal, so every rhombus is a parallelogram (a special one).`, sol: 'Parallelogram: opposite sides parallel. Rhombus: a parallelogram with four equal sides.', scheme: [['Definition of a parallelogram', 1], ['Rhombus defined as a parallelogram with four equal sides', 1]], d: 1, c: 'understanding', t: [1], time: 90 }), null, 'definitions: marked by the scheme');
{
  Q('s202', mk.short({ marks: 2, stem: r`Prove that the angles of a 4-gon $ABCD$ add up to $360^\circ$. Three angles of a 4-gon-shaped plot are $85^\circ$, $100^\circ$ and $75^\circ$: find the fourth.`, model: r`Join the diagonal $AC$ inside the 4-gon. It makes $\triangle ABC$ and $\triangle ACD$, each with angle sum $180^\circ$. The angles of the two triangles together make the four angles of $ABCD$, so the sum is $2 \times 180^\circ = 360^\circ$.\n\nThe fourth angle is $360^\circ - (85^\circ + 100^\circ + 75^\circ) = 100^\circ$.`, sol: 'Two triangles, then subtract.', scheme: [['Proof with a diagonal: 2 times 180 = 360', 1], ['The fourth angle is 100 degrees', 1]], d: 2, c: 'application', t: [1], time: 100 }), (Cx) => { Cx.assert(360 - (85 + 100 + 75) === 100, '100'); Cx.model([360, 100, 180]); });
}
{
  const xs = range(1, 60).filter((x) => 4 * x - 10 === 2 * x + 30), a = 4 * 20 - 10;
  Q('s203', mk.short({ marks: 2, stem: r`In a parallelogram $ABCD$, $\angle A = (4x - 10)^\circ$ and $\angle C = (2x + 30)^\circ$. Find $x$ and all four angles.`, model: r`Opposite angles are equal, so $4x - 10 = 2x + 30$, giving $x = 20$ and $\angle A = \angle C = 70^\circ$.\n\nAdjacent angles add up to $180^\circ$, so $\angle B = \angle D = 180^\circ - 70^\circ = 110^\circ$.`, sol: 'Opposite angles equal; adjacent angles supplementary.', scheme: [['x = 20 and angles A and C 70 degrees', 1], ['Angles B and D 110 degrees', 1]], d: 2, c: 'application', t: [1], time: 90 }), (Cx) => { Cx.assert(xs.join() === '20' && a === 70 && 2 * 20 + 30 === 70, 'x = 20'); Cx.model([20, 70, 110]); });
}
{
  const c = classify([[0, 0], [12, 0], [12, 5], [0, 5]]);
  Q('s204', mk.short({ marks: 2, stem: r`A rectangular gate of a school in Nashik is $12$ m wide and $5$ m high. A diagonal brace is fixed from one corner to the opposite corner. Find the length of the brace, and the distance from a corner to the point where the two diagonals cross.`, model: r`The brace is the hypotenuse of a right-angled triangle: $\sqrt{12^2 + 5^2} = \sqrt{169} = 13$ m.\n\nThe diagonals of a rectangle are equal and bisect each other, so the crossing point is $13 \div 2 = 6.5$ m from each corner.`, sol: 'Pythagoras, then halve.', scheme: [['The brace is 13 m', 1], ['The distance 6.5 m, since the diagonals bisect each other', 1]], d: 2, c: 'application', t: [1], time: 90 }), (Cx) => { Cx.assert(c.rectangle && close(c.diag.AC, 13) && close(dist([0, 0], c.o), 6.5), '13 and 6.5'); Cx.model([13, 6.5]); });
}
{
  Q('s205', mk.short({ marks: 2, stem: r`In $\triangle PQR$, $S$ and $T$ are the midpoints of $PQ$ and $PR$. $ST = 9.5$ cm and $\angle PST = 62^\circ$. Find $QR$ and $\angle PQR$, giving the reasons.`, model: r`By the midpoint theorem $ST \parallel QR$ and $ST = \frac12 QR$, so $QR = 2 \times 9.5 = 19$ cm.\n\nSince $ST \parallel QR$, the corresponding angles $\angle PST$ and $\angle PQR$ are equal, so $\angle PQR = 62^\circ$.`, sol: 'Midpoint theorem, then corresponding angles.', scheme: [['QR = 19 cm by the midpoint theorem', 1], ['Angle PQR = 62 degrees, corresponding angles', 1]], d: 2, c: 'application', t: [2], time: 90 }), (Cx) => { const P = [2, 6], Qp = [0, 0], R = [9, 0], S = mid(P, Qp), Tt = mid(P, R); Cx.assert(close(dist(Qp, R), 2 * dist(S, Tt)) && close(angleAt(S, P, Tt), angleAt(Qp, P, R)), 'QR is twice ST and the corresponding angles are equal'); Cx.model([19, 62]); });
}
{
  Q('s206', mk.short({ marks: 2, stem: r`In $\triangle ABC$, $D$ is the midpoint of $AB$ and the line through $D$ parallel to $BC$ meets $AC$ at $E$. $DE = 7.2$ cm and $AC = 15.6$ cm. Find $BC$ and $AE$, naming the theorems used.`, model: r`By the converse of the midpoint theorem, $E$ is the midpoint of $AC$, so $AE = 15.6 \div 2 = 7.8$ cm.\n\nBy the midpoint theorem, $DE = \frac12 BC$, so $BC = 2 \times 7.2 = 14.4$ cm.`, sol: 'Converse of the midpoint theorem, then the theorem.', scheme: [['AE = 7.8 cm by the converse', 1], ['BC = 14.4 cm by the midpoint theorem', 1]], d: 2, c: 'application', t: [2], time: 90 }), (Cx) => { Cx.assert(close(15.6 / 2, 7.8) && close(7.2 * 2, 14.4), '7.8 and 14.4'); Cx.model([7.8, 14.4]); });
}
{
  const W = [[0, 0], [5, -3], [14, 0], [5, 6]], pq = varignon(W);
  Q('s207', mk.short({ marks: 2, stem: r`The diagonals of a 4-gon-shaped field $ABCD$ are $14$ m and $10$ m. The midpoints of its sides are joined in order. Name the figure formed and find its perimeter.`, model: r`The midpoints of the sides of any 4-gon form a **parallelogram**, whose sides are parallel to the diagonals and half as long: $7$ m and $5$ m.\n\nIts perimeter is $2(7 + 5) = 24$ m.`, sol: 'Varignon parallelogram with sides half the diagonals.', scheme: [['A parallelogram with sides 7 m and 5 m', 1], ['Perimeter 24 m', 1]], d: 2, c: 'application', t: [3], time: 90 }), (Cx) => { Cx.assert(classify(pq).parallelogram && close(classify(pq).sides[0], dist(W[0], W[2]) / 2) && 2 * (14 / 2 + 10 / 2) === 24, 'parallelogram, perimeter 24 for diagonals 14 and 10'); Cx.model([7, 5, 24]); });
}
{
  Q('s208', mk.short({ marks: 2, stem: r`Write the order of rotational symmetry, and the smallest angle of turn that makes the figure fit itself, for (i) a parallelogram that is not a rectangle or a rhombus, (ii) a square.`, model: r`**(i)** A parallelogram fits itself after a half-turn about the point where the diagonals meet: order $2$, smallest turn $180^\circ$.\n\n**(ii)** A square fits itself after a quarter-turn: order $4$, smallest turn $360^\circ \div 4 = 90^\circ$.`, sol: 'Order n means a turn of 360 divided by n.', scheme: [['(i) order 2 and 180 degrees', 1], ['(ii) order 4 and 90 degrees', 1]], d: 2, c: 'understanding', t: [4], time: 90 }), (Cx) => { Cx.assert(symmetries([[0, 0], [4.5, 0], [5.7, 2.2], [1.2, 2.2]]).order === 2 && symmetries([[0, 0], [3, 0], [3, 3], [0, 3]]).order === 4 && 360 / 4 === 90, 'orders 2 and 4'); Cx.model([2, 180, 4, 90]); });
}

// =============================================================== short answer, 3 marks
{
  const A = [0, 0], B = [5, 0], C = [7, 2], D = [2, 2];
  Q('s301', mk.short({ marks: 3, stem: r`In a 4-gon $ABCD$, $AB = DC$ and $AB \parallel DC$. Prove that $ABCD$ is a parallelogram. Check with $A(0, 0)$, $B(5, 0)$, $C(7, 2)$, $D(2, 2)$.`, model: r`Join $AC$. $\angle BAC = \angle ACD$ (alternate angles, $AB \parallel DC$), $AB = CD$ (given) and $AC = CA$ (common). So $\triangle ABC \cong \triangle CDA$ by SAS.\n\nBy CPCT $\angle ACB = \angle CAD$. These are alternate angles for $BC$ and $AD$, so $BC \parallel AD$. Both pairs of opposite sides are parallel, so $ABCD$ is a parallelogram.\n\nCheck: $AB = DC = 5$ and $BC = AD = \sqrt{8}$.`, sol: 'SAS with the alternate angles, then CPCT.', scheme: [['SAS for the triangles ABC and CDA', 1], ['CPCT gives equal alternate angles, so BC is parallel to AD', 1], ['Conclusion and the check AB = DC = 5', 1]], d: 3, c: 'analysis', t: [1], time: 160 }), (Cx) => { const c = classify([A, B, C, D]); Cx.assert(c.parallelogram && close(c.sides[0], 5) && close(c.sides[2], 5), 'parallelogram with AB = DC = 5'); Cx.model([5]); });
}
{
  const c = classify([[0, 0], [8, 0], [8, 6], [0, 6]]);
  Q('s302', mk.short({ marks: 3, stem: r`Prove that the diagonals of a rectangle $ABCD$ are equal. Check with $AB = 8$ cm and $BC = 6$ cm.`, model: r`In $\triangle ABC$ and $\triangle DCB$: $AB = DC$ (opposite sides of a rectangle), $\angle ABC = \angle DCB = 90^\circ$ and $BC = CB$ (common).\n\nSo $\triangle ABC \cong \triangle DCB$ by SAS, and $AC = DB$ by CPCT.\n\nCheck: $AC = BD = \sqrt{8^2 + 6^2} = 10$ cm.`, sol: 'SAS with the right angles, then CPCT.', scheme: [['Two sides and the right angle between them', 1], ['SAS and CPCT, so AC = DB', 1], ['The check: both diagonals 10 cm', 1]], d: 2, c: 'application', t: [1], time: 150 }), (Cx) => { Cx.assert(c.rectangle && close(c.diag.AC, 10) && close(c.diag.BD, 10), 'diagonals 10'); Cx.model([8, 6, 10, 90]); });
}
{
  const c = classify([[-4, 0], [0, -3], [4, 0], [0, 3]]);
  Q('s303', mk.short({ marks: 3, stem: r`Prove that the diagonals of a rhombus $ABCD$ are perpendicular to each other. Check with diagonals $8$ cm and $6$ cm.`, model: r`The diagonals meet at $O$ and bisect each other (a rhombus is a parallelogram), so $OB = OD$. In $\triangle AOB$ and $\triangle AOD$: $AB = AD$ (sides of a rhombus), $OB = OD$ and $AO = AO$ (common).\n\nSo the triangles are congruent by SSS and $\angle AOB = \angle AOD$. They form a linear pair, so each is $90^\circ$.\n\nCheck: $AB = \sqrt{4^2 + 3^2} = 5$ cm for all four sides.`, sol: 'SSS, then a linear pair.', scheme: [['The diagonals bisect each other, so OB = OD', 1], ['SSS for the triangles AOB and AOD', 1], ['The equal angles form a linear pair, so each is 90 degrees', 1]], d: 3, c: 'analysis', t: [1], time: 160 }), (Cx) => { Cx.assert(c.rhombus && c.diag.perpendicular && close(c.sides[0], 5) && close(c.diag.AC, 8) && close(c.diag.BD, 6), 'perpendicular diagonals, side 5'); Cx.model([5, 90]); });
}
{
  const A = [0, 0], B = [4, 0], D = polar(A, 6, 70), C = add(B, D);
  const E = lineInter(A, polar(A, 1, 35), B, C);
  Q('s304', mk.short({ marks: 3, stem: r`In a parallelogram $ABCD$ the bisector of $\angle A$ meets $BC$ at $E$. Prove that $BE = AB$. Check with $AB = 4$ cm and $AD = 6$ cm, and find $EC$.`, model: r`$\angle DAE = \angle BAE$ ($AE$ bisects $\angle A$). Since $AD \parallel BC$, $\angle DAE = \angle AEB$ (alternate angles). So $\angle BAE = \angle AEB$.\n\nIn $\triangle ABE$ the sides opposite equal angles are equal, so $BE = AB$.\n\nCheck: $BE = AB = 4$ cm and $BC = AD = 6$ cm, so $EC = 6 - 4 = 2$ cm.`, sol: 'Alternate angles make triangle ABE isosceles.', scheme: [['Angle DAE = angle BAE, and angle DAE = angle AEB (alternate)', 1], ['So BE = AB (equal angles, equal opposite sides)', 1], ['EC = 2 cm in the check', 1]], d: 3, c: 'analysis', t: [1], time: 170 }), (Cx) => { Cx.assert(close(dist(B, E), 4) && close(dist(E, C), 2) && close(dist(B, C), 6), 'BE = 4, EC = 2'); Cx.model([4, 6, 2]); });
}
{
  const T = triSSS(12, 14, 10), [a, b, c] = T, d = mid(b, c), e = mid(c, a), f = mid(a, b);
  const sides = (P) => [dist(P[0], P[1]), dist(P[1], P[2]), dist(P[2], P[0])].sort((x, y) => x - y);
  Q('s305', mk.short({ marks: 3, stem: r`In $\triangle ABC$, $D$, $E$, $F$ are the midpoints of $BC$, $CA$, $AB$. Prove that the four triangles $AFE$, $FBD$, $EDC$ and $DEF$ are congruent. Check with $AB = 10$, $BC = 12$, $CA = 14$ cm.`, model: r`By the midpoint theorem $EF = \frac12 BC$, $FD = \frac12 CA$ and $DE = \frac12 AB$. Also $AF = FB = \frac12 AB$, $BD = DC = \frac12 BC$ and $CE = EA = \frac12 CA$.\n\nSo each of the four triangles has sides equal to $\frac12 AB$, $\frac12 BC$ and $\frac12 CA$, and they are congruent by SSS.\n\nCheck: every small triangle has sides $5$, $6$ and $7$ cm.`, sol: 'Midpoint theorem gives the half sides; then SSS.', scheme: [['The sides of triangle DEF are halves of the sides of ABC', 1], ['The other triangles also have the half sides', 1], ['SSS, with sides 5, 6 and 7 cm', 1]], d: 3, c: 'analysis', t: [2], time: 170 }), (Cx) => { const tri = [[a, f, e], [f, b, d], [e, d, c], [d, e, f]].map(sides); Cx.assert(tri.every((s) => s.every((v, i) => close(v, [5, 6, 7][i]))), 'all four triangles have sides 5, 6, 7'); Cx.model([5, 6, 7]); });
}

// =============================================================== long answer, 5 marks
{
  const A = [3, 5.5], B = [0, 0], C = [8, 0], D = mid(A, B), E = mid(A, C);
  Q('l01', mk.long({ stem: r`Prove the midpoint theorem: the segment joining the midpoints $D$ and $E$ of the sides $AB$ and $AC$ of $\triangle ABC$ is parallel to $BC$ and equal to half of it. (a) Extend $DE$ to $F$ with $EF = DE$ and join $CF$; state the construction. (b) Prove $\triangle AED \cong \triangle CEF$. (c) Show that $BDFC$ is a parallelogram. (d) Conclude. (e) Check with $BC = 8$ cm.`, model: r`**(a)** Extend $DE$ to $F$ so that $EF = DE$, and join $CF$.\n\n**(b)** $AE = EC$ ($E$ is the midpoint), $\angle AED = \angle CEF$ (vertically opposite) and $DE = EF$ (construction), so $\triangle AED \cong \triangle CEF$ by SAS.\n\n**(c)** By CPCT $CF = AD = BD$ and $\angle ADE = \angle CFE$, so $CF \parallel AB$ (alternate angles). Thus $BD$ and $CF$ are equal and parallel, and $BDFC$ is a parallelogram.\n\n**(d)** $DF \parallel BC$ and $DF = BC$, so $DE \parallel BC$ and $DE = \frac12 DF = \frac12 BC$.\n\n**(e)** If $BC = 8$ cm, then $DE = 4$ cm.`, sol: 'Congruent triangles, then a parallelogram.', scheme: [['(a) the construction', 1], ['(b) the congruent triangles with reasons', 1], ['(c) BDFC is a parallelogram', 1], ['(d) DE parallel to BC and half of it', 1], ['(e) the check: DE = 4 cm', 1]], d: 3, c: 'application', t: [2], time: 420, assets: [] }), (Cx) => { Cx.assert(par(D, E, B, C) && close(dist(D, E), 4) && close(dist(B, C), 8), 'DE = 4'); Cx.model([8, 4]); });
}
{
  const A = [2, 6], B = [0, 0], C = [9, 0], D = mid(A, B), E = lineInter(D, add(D, [1, 0]), A, C);
  Q('l02', mk.long({ stem: r`Prove the converse of the midpoint theorem: a line through the midpoint $D$ of $AB$ in $\triangle ABC$, parallel to $BC$, meets $AC$ at its midpoint. (a) Let $E'$ be the midpoint of $AC$; what does the midpoint theorem say about $DE'$? (b) What is the position of $DE$ relative to $BC$? (c) Why must $DE$ and $DE'$ be the same line? (d) Conclude. (e) Check with $A(2, 6)$, $B(0, 0)$, $C(9, 0)$: find $E$.`, model: r`**(a)** By the midpoint theorem $DE' \parallel BC$.\n\n**(b)** $DE \parallel BC$ (given).\n\n**(c)** Both $DE$ and $DE'$ are lines through $D$ parallel to $BC$, and only one line through $D$ is parallel to $BC$. So they are the same line.\n\n**(d)** Therefore $E = E'$, the midpoint of $AC$, and $AE = EC$.\n\n**(e)** $D = (1, 3)$, the line $y = 3$ meets $AC$ at $E = (5.5, 3)$, the midpoint of $A(2, 6)$ and $C(9, 0)$.`, sol: 'Midpoint theorem and uniqueness of the parallel line.', scheme: [['(a) DE-prime is parallel to BC', 1], ['(b) DE is parallel to BC', 1], ['(c) only one parallel line through D', 1], ['(d) E is the midpoint of AC', 1], ['(e) E = (5.5, 3) in the check', 1]], d: 3, c: 'application', t: [2], time: 420 }), (Cx) => { Cx.assert(close(E[0], 5.5) && close(E[1], 3) && close(dist(A, E), dist(E, C)), 'E = (5.5, 3)'); Cx.model([1, 3, 5.5]); });
}
{
  const V = [[0, 0], [7, 1], [6, 5.5], [1, 4]], [P, Qp, R, S] = varignon(V);
  Q('l03', mk.long({ stem: r`Prove that the midpoints $P$, $Q$, $R$, $S$ of the sides $AB$, $BC$, $CD$, $DA$ of any 4-gon $ABCD$ form a parallelogram. (a) Join $AC$. (b) Use the midpoint theorem in $\triangle ABC$. (c) Use it in $\triangle ADC$. (d) Compare $PQ$ and $SR$. (e) Conclude, and check with $A(0, 0)$, $B(7, 1)$, $C(6, 5.5)$, $D(1, 4)$.`, model: r`**(a)** Join the diagonal $AC$.\n\n**(b)** In $\triangle ABC$, $P$ and $Q$ are the midpoints of $AB$ and $BC$, so $PQ \parallel AC$ and $PQ = \frac12 AC$.\n\n**(c)** In $\triangle ADC$, $S$ and $R$ are the midpoints of $AD$ and $DC$, so $SR \parallel AC$ and $SR = \frac12 AC$.\n\n**(d)** So $PQ \parallel SR$ and $PQ = SR$.\n\n**(e)** One pair of opposite sides of $PQRS$ is equal and parallel, so $PQRS$ is a parallelogram. Check: $AC \approx 8.14$ and $PQ = SR \approx 4.07$.`, sol: 'Midpoint theorem twice.', scheme: [['(a) the diagonal AC', 1], ['(b) PQ parallel to AC, half of it', 1], ['(c) SR parallel to AC, half of it', 1], ['(d) PQ parallel and equal to SR', 1], ['(e) parallelogram, and the check 8.14 and 4.07', 1]], d: 3, c: 'application', t: [3], time: 420 }), (Cx) => { Cx.assert(classify([P, Qp, R, S]).parallelogram && dist(V[0], V[2]).toFixed(2) === '8.14' && dist(P, Qp).toFixed(2) === '4.07' && close(dist(S, R), dist(P, Qp)), 'Varignon check'); Cx.model([8.14, 4.07]); });
}
{
  const A = [2, 6], B = [0, 0], C = [9, 0], Dd = mid(B, C), E = mid(C, A), F = mid(A, B), G = scale(add(add(A, B), C), 1 / 3);
  Q('l04', mk.long({ stem: r`Prove that the medians $BE$ and $CF$ of $\triangle ABC$ meet at a point $G$ with $BG = 2\,GE$. (a) Let $P$ and $Q$ be the midpoints of $GB$ and $GC$; use the midpoint theorem in $\triangle ABC$ for $FE$. (b) Use it in $\triangle GBC$ for $PQ$. (c) Show that $FEQP$ is a parallelogram. (d) Use its diagonals to show $BG = 2\,GE$. (e) Why does the third median pass through $G$? Check with $A(2, 6)$, $B(0, 0)$, $C(9, 0)$.`, model: r`**(a)** $FE \parallel BC$ and $FE = \frac12 BC$.\n\n**(b)** $PQ \parallel BC$ and $PQ = \frac12 BC$.\n\n**(c)** So $FE \parallel PQ$ and $FE = PQ$, and $FEQP$ is a parallelogram.\n\n**(d)** Its diagonals $EP$ and $FQ$ lie along $BE$ and $CF$ and bisect each other at $G$, so $EG = GP$. $P$ is the midpoint of $GB$, so $BG = 2\,GP = 2\,GE$.\n\n**(e)** In the same way $CG = 2\,GF$. The third median $AD$ meets $BE$ at the point that divides it $2 : 1$ from $B$, and there is only one such point, $G$. So the three medians are concurrent.\n\nCheck: $G = (\frac{11}{3}, 2)$ lies on all three medians, and $BG \approx 4.18$ is twice $GE \approx 2.09$.`, sol: 'Midpoint theorem twice, then a parallelogram.', scheme: [['(a) FE parallel and half of BC', 1], ['(b) PQ parallel and half of BC', 1], ['(c) FEQP is a parallelogram', 1], ['(d) BG = 2 GE from the diagonals', 1], ['(e) the third median through G, and the check', 1]], d: 4, c: 'analysis', t: [3], time: 480, assets: [] }), (Cx) => { const on = (P, X, Y) => Math.abs((Y[0] - X[0]) * (P[1] - X[1]) - (Y[1] - X[1]) * (P[0] - X[0])) < 1e-9; Cx.assert(on(G, A, Dd) && on(G, B, E) && on(G, C, F) && close(dist(B, G), 2 * dist(G, E)) && dist(B, G).toFixed(2) === '4.18' && dist(G, E).toFixed(2) === '2.09', 'centroid'); Cx.model([4.18, 2.09]); });
}
{
  const c = classify([pA, pP, pC, pQ]);
  Q('l05', mk.long({ stem: r`$ABCD$ is a parallelogram, and $P$, $Q$ are points on the diagonal $BD$ with $BP = DQ$. Prove that $APCQ$ is a parallelogram. (a) Let the diagonals of $ABCD$ meet at $O$; what is true of $O$? (b) Show that $OP = OQ$. (c) What do the diagonals $AC$ and $PQ$ of $APCQ$ do? (d) Conclude. (e) Check with $A(0, 0)$, $B(6, 0)$, $D(2, 3)$, $BP = DQ = \frac14 BD$.`, model: r`**(a)** The diagonals of a parallelogram bisect each other, so $O$ is the midpoint of $AC$ and of $BD$: $OB = OD$.\n\n**(b)** $OP = OB - BP$ and $OQ = OD - DQ$. Since $OB = OD$ and $BP = DQ$, $OP = OQ$.\n\n**(c)** $O$ is the midpoint of $AC$ and also of $PQ$, so the diagonals $AC$ and $PQ$ of $APCQ$ bisect each other.\n\n**(d)** A 4-gon whose diagonals bisect each other is a parallelogram, so $APCQ$ is a parallelogram.\n\n**(e)** $O = (4, 1.5)$ is the midpoint of $AC$, and of $PQ$ with $P = (5, 0.75)$ and $Q = (3, 2.25)$.`, sol: 'Both diagonals bisect each other at O.', scheme: [['(a) O is the midpoint of AC and BD', 1], ['(b) OP = OQ', 1], ['(c) AC and PQ bisect each other at O', 1], ['(d) APCQ is a parallelogram', 1], ['(e) the check with coordinates', 1]], d: 3, c: 'analysis', t: [1], time: 420, assets: [figAPCQ] }), (Cx) => { Cx.assert(c.parallelogram && c.diagBisect && close(pP[0], 5) && close(pP[1], 0.75) && close(pQ[0], 3) && close(pQ[1], 2.25) && close(mid(pA, pC)[0], 4) && close(mid(pA, pC)[1], 1.5), 'APCQ is a parallelogram with centre (4, 1.5)'); Cx.model([4, 1.5, 5, 0.75, 3, 2.25]); });
}

// =============================================================== case-based
{
  const angs = [85, 95, 70], x = 360 - angs.reduce((s, v) => s + v, 0);
  caseQ('c01', {
    passage: r`A tile maker in Jaipur cuts floor tiles in the shape of a 4-gon. Three angles of a tile are $85^\circ$, $95^\circ$ and $70^\circ$. Four copies of the tile are placed round a point, each with a different corner at the point.`,
    d: 2, c: 'application',
    model: r`(a) Option (a). (b) $110$. (c) (i) The four angles fill a full turn of $360^\circ$. Or (ii) $110^\circ$.`,
    sol: r`(a) The angles of a 4-gon add up to $360^\circ$. (b) $360 - (85 + 95 + 70) = 110$. (c) (i) The four corners at the point add up to $85 + 95 + 70 + 110 = 360$, a full turn, so there is no gap. (ii) If the $110^\circ$ corner is missing, a gap of $110^\circ$ remains.`,
    children: [
      child('a', mk.mcq({ stem: 'The four angles of every 4-gon add up to', opts: [r`$360^\circ$`, r`$180^\circ$`, r`$270^\circ$`, r`$540^\circ$`], key: 'a', sol: r`A diagonal splits a 4-gon into two triangles, each with angle sum $180^\circ$, so the sum is $360^\circ$. The value $540^\circ$ is the angle sum of a 5-gon.`, d: 1, c: 'understanding', t: [4], time: 60 })),
      child('b', mk.num({ stem: 'Find the fourth angle of the tile, in degrees.', value: 110, sol: r`The fourth angle is $360^\circ - (85^\circ + 95^\circ + 70^\circ) = 110^\circ$.`, scheme: [['Sum of angles 360', 0.5], ['110 degrees', 0.5]], d: 1, c: 'understanding', t: [4], time: 60 })),
      child('c', mk.short({ marks: 2, stem: r`**(i)** Show that the four corners fit round the point with no gap.`, model: r`At the point the four angles are $85^\circ$, $95^\circ$, $70^\circ$ and $110^\circ$, and $85 + 95 + 70 + 110 = 360$. This is a full turn, so there is no gap and no overlap.`, sol: 'The four angles add up to 360 degrees.', scheme: [['The four angles listed', 1], ['Sum 360, a full turn', 1]], d: 2, c: 'application', t: [4], time: 90 }), [
        mk.short({ marks: 2, stem: r`**(ii)** A worker places only three corners, with angles $85^\circ$, $95^\circ$ and $70^\circ$, round a point. Find the gap that is left.`, model: r`The three angles add up to $85 + 95 + 70 = 250^\circ$, so the gap is $360^\circ - 250^\circ = 110^\circ$, which is exactly the fourth angle of the tile.`, sol: 'Subtract from 360 degrees.', scheme: [['Three angles add up to 250', 1], ['The gap is 110 degrees', 1]], d: 2, c: 'application', t: [4], time: 90 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which([360, 180, 270, 540], 360);
    Cx.child('b').val(x);
    Cx.child('c').assert(x + 250 === 360, 'sum 360');
    Cx.child('c').model([85, 95, 70, 110, 360]);
    Cx.child('cii').assert(360 - 250 === x, 'gap 110');
    Cx.child('cii').model([250, 110]);
  });
}
{
  const AC = 40, BD = 30, W = [[0, 0], [20, -15], [40, 0], [20, 15]], pq = varignon(W), c = classify(pq);
  const E = [[0, 0], [20, -20], [40, 0], [20, 20]], ce = classify(varignon(E));
  caseQ('c02', {
    passage: r`A municipal plot $ABCD$ in Bhopal is a 4-gon with diagonals $AC = 40$ m and $BD = 30$ m. The gardener ties a rope round the midpoints $P$, $Q$, $R$, $S$ of its four sides, in order.`,
    d: 3, c: 'application',
    model: r`(a) Option (a). (b) $70$. (c) (i) $300$ square metres. Or (ii) a rhombus of perimeter $80$ m.`,
    sol: r`(a) The midpoints of the sides of any 4-gon form a parallelogram. (b) The sides are $20$ m and $15$ m, so the perimeter is $2(20 + 15) = 70$ m. (c) (i) The diagonals are perpendicular, so $PQRS$ is a rectangle of $20$ m by $15$ m: $300$ square metres. (ii) If both diagonals are $40$ m, all sides are $20$ m: a rhombus of perimeter $80$ m.`,
    children: [
      child('a', mk.mcq({ stem: 'The rope $PQRS$ forms', opts: ['a parallelogram', 'a rectangle', 'a rhombus', 'a trapezium that is not a parallelogram'], key: 'a', sol: 'The midpoints of the sides of any 4-gon form a parallelogram. It is a rectangle only if the diagonals are perpendicular and a rhombus only if they are equal, which is not given here.', d: 2, c: 'understanding', t: [3], time: 75 })),
      child('b', mk.num({ stem: 'Find the length of the rope, in metres.', value: 70, sol: r`The sides of $PQRS$ are half of the diagonals: $20$ m and $15$ m, in two pairs. The perimeter is $2(20 + 15) = 70$ m.`, scheme: [['Sides 20 m and 15 m', 0.5], ['70 m', 0.5]], d: 2, c: 'application', t: [3], time: 90 })),
      child('c', mk.short({ marks: 2, stem: r`**(i)** The diagonals $AC$ and $BD$ cross at right angles. Find the type and the area of $PQRS$.`, model: r`$PQRS$ is a rectangle with sides $20$ m and $15$ m, because its sides are parallel to the perpendicular diagonals. Its area is $20 \times 15 = 300$ square metres.`, sol: 'Perpendicular diagonals give a rectangle.', scheme: [['A rectangle with sides 20 m and 15 m', 1], ['Area 300 square metres', 1]], d: 3, c: 'application', t: [3], time: 100 }), [
        mk.short({ marks: 2, stem: r`**(ii)** In a different plot both diagonals are $40$ m long. Name the figure $PQRS$ and find its perimeter.`, model: r`All four sides of $PQRS$ are half of $40$ m, that is $20$ m, so $PQRS$ is a rhombus. Its perimeter is $4 \times 20 = 80$ m.`, sol: 'Equal diagonals give a rhombus.', scheme: [['A rhombus with sides 20 m', 1], ['Perimeter 80 m', 1]], d: 3, c: 'application', t: [3], time: 100 }),
      ]),
    ],
  }, (Cx) => {
    const cg = classify(varignon([[0, 0], [14, -12], [40, 0], [26, 18]])); Cx.child('a').which([cg.parallelogram && !cg.rectangle && !cg.rhombus, cg.rectangle, cg.rhombus, cg.exactlyOnePair], true);
    Cx.child('b').val(c.sides.reduce((s, v) => s + v, 0));
    Cx.child('c').assert(c.rectangle && close(polyArea(pq), 300) && close(dist(W[0], W[2]), AC) && close(dist(W[1], W[3]), BD), 'rectangle, area 300');
    Cx.child('c').model([20, 15, 300]);
    Cx.child('cii').assert(ce.rhombus && close(ce.sides.reduce((s, v) => s + v, 0), 80), 'rhombus, perimeter 80');
    Cx.child('cii').model([20, 80]);
  });
}
{
  const A = [3, 5.5], B = [0, 0], C = [9.6, 0], Ad = [4.8, 7], D = mid(Ad, B), E = mid(Ad, C);
  caseQ('c03', {
    passage: r`The gable of a house in Shillong is a triangle $ABC$ with base $BC = 9.6$ m. A horizontal beam $DE$ joins the midpoints $D$ and $E$ of the slanting sides $AB$ and $AC$. The perimeter of the gable $ABC$ is $31.2$ m.`,
    d: 3, c: 'application',
    model: r`(a) Option (a). (b) $4.8$. (c) (i) $15.6$ m. Or (ii) $68^\circ$.`,
    sol: r`(a) The midpoint theorem. (b) $DE = \frac12 \times 9.6 = 4.8$ m. (c) (i) The triangle $ADE$ has half the sides, so half the perimeter: $31.2 \div 2 = 15.6$ m. (ii) $DE \parallel BC$, so $\angle ADE = \angle ABC = 68^\circ$ (corresponding angles).`,
    children: [
      child('a', mk.mcq({ stem: r`The beam $DE$ is parallel to $BC$ and half as long because of`, opts: ['the midpoint theorem', 'the angle sum of a 4-gon', 'the converse of the midpoint theorem only', 'the property of a rhombus'], key: 'a', sol: 'The segment joining the midpoints of two sides of a triangle is parallel to the third side and half as long: this is the midpoint theorem.', d: 1, c: 'understanding', t: [2], time: 60 })),
      child('b', mk.num({ stem: 'Find the length of the beam $DE$, in metres.', value: 4.8, sol: r`$DE = \frac12 BC = \frac12 \times 9.6 = 4.8$ m.`, scheme: [['DE = half of BC', 0.5], ['4.8 m', 0.5]], d: 1, c: 'understanding', t: [2], time: 60 })),
      child('c', mk.short({ marks: 2, stem: r`**(i)** Find the perimeter of the triangle $ADE$ above the beam.`, model: r`Each side of $\triangle ADE$ is half of the matching side of $\triangle ABC$ ($AD = \frac12 AB$, $AE = \frac12 AC$, $DE = \frac12 BC$), so its perimeter is $31.2 \div 2 = 15.6$ m.`, sol: 'Half the perimeter.', scheme: [['All three sides are halved', 1], ['Perimeter 15.6 m', 1]], d: 2, c: 'application', t: [2], time: 90 }), [
        mk.short({ marks: 2, stem: r`**(ii)** The angle $\angle ABC = 68^\circ$. Find $\angle ADE$ and give the reason.`, model: r`$DE \parallel BC$ (midpoint theorem), so $\angle ADE$ and $\angle ABC$ are corresponding angles and $\angle ADE = 68^\circ$.`, sol: 'Corresponding angles, DE parallel to BC.', scheme: [['DE parallel to BC', 1], ['Angle ADE = 68 degrees, corresponding angles', 1]], d: 2, c: 'application', t: [2], time: 90 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which(['midpoint', 'angle sum', 'converse only', 'rhombus'], 'midpoint');
    Cx.child('b').val(dist(D, E));
    Cx.child('c').assert(par(D, E, B, C) && close(31.2 / 2, 15.6), 'half the perimeter');
    Cx.child('c').model([31.2, 15.6]);
    Cx.child('cii').assert(par(D, E, B, C) && close(angleAt(D, Ad, E), angleAt(B, Ad, C)), 'corresponding angles');
    Cx.child('cii').model([68]);
  });
}
{
  const rho = [[-4, 0], [0, -3], [4, 0], [0, 3]], sq = [[0, 0], [3, 0], [3, 3], [0, 3]], rec = [[0, 0], [6, 0], [6, 4], [0, 4]];
  caseQ('c04', {
    passage: r`A floor designer in Mysuru uses three kinds of tile: a rhombus that is not a square, a square, and a rectangle that is not a square. She wants to know their symmetries before she lays a pattern.`,
    d: 2, c: 'application',
    model: r`(a) Option (a). (b) $4$. (c) (i) $2$ lines and order $2$. Or (ii) the square has $2$ more lines than the rectangle.`,
    sol: r`(a) A rhombus has $2$ lines of symmetry, its diagonals. (b) A square has rotational symmetry of order $4$. (c) (i) A rectangle has $2$ lines of symmetry and a half-turn makes it fit itself, so order $2$. (ii) $4 - 2 = 2$.`,
    children: [
      child('a', mk.mcq({ stem: 'The number of lines of symmetry of the rhombus tile is', opts: ['$2$', '$4$', '$1$', '$0$'], key: 'a', sol: 'The two diagonals of a rhombus are its lines of symmetry. It has $4$ only if it is a square.', d: 1, c: 'understanding', t: [4], time: 60 })),
      child('b', mk.num({ stem: 'Find the order of rotational symmetry of the square tile.', value: 4, sol: r`A quarter-turn of $90^\circ$ makes the square fit itself, and $360 \div 90 = 4$, so the order is $4$.`, scheme: [['Quarter-turn', 0.5], ['Order 4', 0.5]], d: 1, c: 'understanding', t: [4], time: 60 })),
      child('c', mk.short({ marks: 2, stem: r`**(i)** For the rectangle tile, state the number of lines of symmetry and the order of rotational symmetry.`, model: r`A rectangle has $2$ lines of symmetry, the lines joining the midpoints of opposite sides. A half-turn about its centre makes it fit itself, so its order is $2$.`, sol: 'Two lines; half-turn.', scheme: [['2 lines of symmetry', 1], ['Order 2', 1]], d: 2, c: 'application', t: [4], time: 90 }), [
        mk.short({ marks: 2, stem: r`**(ii)** How many more lines of symmetry does the square have than the rectangle? Give the reason in one line.`, model: r`The square has $4$ lines of symmetry (two through midpoints of opposite sides and two diagonals) and the rectangle has $2$, so the square has $2$ more. The diagonals of a rectangle are not lines of symmetry because its adjacent sides are unequal.`, sol: '4 minus 2.', scheme: [['4 and 2 lines', 1], ['2 more, with the reason about the diagonals', 1]], d: 2, c: 'application', t: [4], time: 90 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which([symmetries(rho).lines, 4, 1, 0], 2);
    Cx.child('b').val(symmetries(sq).order);
    Cx.child('c').assert(symmetries(rec).lines === 2 && symmetries(rec).order === 2, 'rectangle 2 and 2');
    Cx.child('c').model([2]);
    Cx.child('cii').assert(symmetries(sq).lines - symmetries(rec).lines === 2, '2 more');
    Cx.child('cii').model([4, 2]);
  });
}
