// ICSE 9 Mathematics ch09 Mid-Point and Intercept Theorems: short answers (2 and 3 marks) and structured long answers (10 marks).
// Proofs are qualitative, so each check builds the figure from coordinates and asserts every fact the proof uses (mid-points,
// parallelism, equal lengths, congruent corresponding parts, parallelograms) together with every number in the model answer.
import { Q, mk, r } from './lib.mjs';
import * as G from './geo.mjs';

const { fig, mid, lerp, dist, polar, near, must, midTheorem, midProof, converse, converseProof, medial, quadMid, trapezium, intercepts, divide, triFromSides, triFromBCAngleCA, perimeter, area, parallel, parallelogram, isMid, angDeg, meet, add, sub, collinear } = G;
const fm = (v) => G.r6(v);

// ---------------------------------------------------------------- short answers, 2 marks
{
  const t = triFromSides(9, 11, 8); const m = midTheorem(t.A, t.B, t.C);
  Q('s201', mk.short({ marks: 2, stem: r`In $\triangle XYZ$, $P$ and $Q$ are the mid-points of $XY$ and $XZ$. State the mid-point theorem for this triangle, giving both of its conclusions about $PQ$.`, model: r`$PQ \parallel YZ$, and $PQ = \dfrac{1}{2}YZ$: the segment joining the mid-points of two sides of a triangle is parallel to the third side and half as long.`, sol: r`The mid-point theorem gives two facts about the segment $PQ$: its direction (parallel to the third side $YZ$) and its length (half of $YZ$).`, scheme: [['PQ is parallel to YZ', 1], ['PQ = half of YZ', 1]], d: 1, c: 'recall', t: [1], time: 60 }), (C) => { C.assert(parallel(m.D, m.E, t.B, t.C) && near(m.de, m.bc / 2), 'PQ parallel to YZ and half of it'); C.model(['YZ', 'parallel']); });
}
{
  const L = [0, 0], M = [16.8, 0], K = polar(L, 13, 64); const m = midTheorem(K, L, M);
  Q('s202', mk.short({ marks: 2, stem: r`In $\triangle KLM$, $P$ and $Q$ are the mid-points of $KL$ and $KM$. $PQ = 8.4$ cm and $\angle KLM = 64^\circ$. Find $LM$ and $\angle LPQ$, giving a reason for each.`, model: r`By the mid-point theorem $PQ \parallel LM$ and $PQ = \dfrac{1}{2}LM$, so $LM = 2 \times 8.4 = 16.8$ cm.

Since $PQ \parallel LM$ and $KL$ is a transversal, $\angle LPQ$ and $\angle KLM$ are co-interior angles, so $\angle LPQ = 180^\circ - 64^\circ = 116^\circ$.`, sol: r`The mid-point theorem gives $LM$ from $PQ$ and the parallel lines give the angle: $\angle LPQ + \angle PLM = 180^\circ$ (co-interior angles).`, scheme: [['PQ parallel to LM; LM = 2 x 8.4 = 16.8 cm', 1], ['Co-interior angles: 180 - 64 = 116 degrees', 1]], d: 2, c: 'understanding', t: [1], time: 90 }), (C) => { C.assert(near(m.de, 8.4) && near(angDeg(L, K, M), 64) && near(angDeg(m.D, L, m.E), 116), 'PQ = 8.4, LM = 16.8, angle LPQ = 116'); C.model([16.8, 116]); });
}
{
  const t = triFromSides(16.2, 13.8, 18.6); const c = converse(t.A, t.B, t.C);
  Q('s203', mk.short({ marks: 2, stem: r`State the converse of the mid-point theorem. In $\triangle PQR$, $S$ is the mid-point of $PQ$ and the line $ST \parallel QR$ meets $PR$ at $T$. If $PR = 18.6$ cm and $QR = 13.8$ cm, find $PT$ and $ST$.`, model: r`Converse: the line drawn through the mid-point of one side of a triangle, parallel to a second side, bisects the third side.

So $T$ is the mid-point of $PR$: $PT = \dfrac{1}{2} \times 18.6 = 9.3$ cm, and $ST = \dfrac{1}{2}QR = \dfrac{1}{2} \times 13.8 = 6.9$ cm.`, sol: r`Apply the converse to find $PT$ and then the mid-point theorem to find $ST$.`, scheme: [['Converse stated: a line through the mid-point of one side, parallel to another side, bisects the third side', 1], ['PT = 9.3 cm and ST = 6.9 cm', 1]], d: 2, c: 'understanding', t: [2], time: 90 }), (C) => { C.assert(isMid(c.E, t.A, t.C) && near(dist(t.A, c.E), 9.3) && near(dist(c.D, c.E), 6.9), 'PT = 9.3, ST = 6.9'); C.model([9.3, 6.9]); });
}
{
  const s = intercepts([0, 0], [2.4, 7], [1, 0.35], [0, 1 / 3, 2 / 3, 1], [8, -0.5], [9.5, 6.5]);
  Q('s204', mk.short({ marks: 2, stem: r`Four parallel rails make equal intercepts on a slanting bar. A second bar crosses the rails at $A$, $B$, $C$ and $D$, and $AB = 3.7$ cm. Find $AD$ and name the theorem you use.`, model: r`By the equal intercept theorem the intercepts $AB$, $BC$ and $CD$ on the second bar are equal, each $3.7$ cm. So $AD = 3 \times 3.7 = 11.1$ cm.`, sol: r`Equal intercepts on one transversal give equal intercepts on every transversal, so the second bar is cut into three equal parts of $3.7$ cm.`, scheme: [['Equal intercept theorem: AB = BC = CD', 1], ['AD = 3 x 3.7 = 11.1 cm', 1]], d: 2, c: 'application', t: [3], time: 75 }), (C) => { C.assert(s.s2.length === 3 && s.s2.every((x) => near(x, s.s2[0])), 'AB = BC = CD'); C.assert(near(3 * 3.7, 11.1), '11.1'); C.model([11.1, 3.7]); });
}
{
  const t = triFromSides(10.6, 8.4, 10.6); const m = midTheorem(t.A, t.B, t.C);
  Q('s205', mk.short({ marks: 2, stem: r`In $\triangle ABC$, $AB = AC = 10.6$ cm and $BC = 8.4$ cm. $D$ and $E$ are the mid-points of $AB$ and $AC$. Name the quadrilateral $BDEC$ and find its perimeter.`, model: r`$DE \parallel BC$ (mid-point theorem), so $BDEC$ is a trapezium; as $BD = EC = 5.3$ cm it is an isosceles trapezium. $DE = \dfrac{1}{2} \times 8.4 = 4.2$ cm, so the perimeter is $5.3 + 4.2 + 5.3 + 8.4 = 23.2$ cm.`, sol: r`The sides are $BD = \dfrac{1}{2}AB$, $DE = \dfrac{1}{2}BC$, $EC = \dfrac{1}{2}AC$ and $CB$.`, scheme: [['DE parallel to BC, so a (isosceles) trapezium', 1], ['BD = EC = 5.3, DE = 4.2, perimeter 23.2 cm', 1]], d: 2, c: 'application', t: [1], time: 90 }), (C) => { C.assert(parallel(m.D, m.E, t.B, t.C) && !parallelogram(t.B, m.D, m.E, t.C) && near(dist(t.B, m.D), dist(m.E, t.C)), 'isosceles trapezium, not a parallelogram'); C.assert(near(perimeter(t.B, t.C, m.E, m.D), 23.2), 'perimeter 23.2'); C.model([5.3, 4.2, 23.2]); });
}
{
  const t = triFromSides(7.5, 10, 7.5); const m = midTheorem(t.A, t.B, t.C);
  Q('s206', mk.short({ marks: 2, stem: r`Asha writes: "In $\triangle ABC$, $D$ and $E$ are the mid-points of $AB$ and $AC$, so $DE \parallel BC$ and $DE = BC$. Hence $BDEC$ is a parallelogram." Find her error and say what $BDEC$ really is when $BC = 10$ cm.`, model: r`The mid-point theorem gives $DE = \dfrac{1}{2}BC$, not $DE = BC$. With $BC = 10$ cm, $DE = 5$ cm. So $BDEC$ has one pair of parallel sides, $DE$ and $BC$, which are unequal: it is a trapezium, not a parallelogram.`, sol: r`A parallelogram needs a pair of opposite sides that are both parallel and equal. Here $DE \parallel BC$ but $DE$ is half of $BC$.`, scheme: [['Error: DE = half of BC (DE = 5 cm), not BC', 1], ['BDEC is a trapezium, not a parallelogram', 1]], d: 3, c: 'analysis', t: [1], time: 90 }), (C) => { C.assert(near(m.bc, 10) && near(m.de, 5) && parallel(m.D, m.E, t.B, t.C) && !parallelogram(t.B, m.D, m.E, t.C), 'DE = 5, BDEC is a trapezium only'); C.model([5, 10]); });
}
{
  const m = trapezium([2, 4], [9, 4], [13, 0], [0, 0]);
  const A = [2, 4], B = [9, 4], D = [0, 0], Cc = [13, 0]; // AB = 7, DC = 13, MN = 10
  Q('s207', mk.short({ marks: 2, stem: r`In trapezium $ABCD$, $AB \parallel DC$. $P$ and $Q$ are the mid-points of the legs $AD$ and $BC$, $PQ = 10$ cm and $AB = 7$ cm. Find $DC$.`, model: r`The segment joining the mid-points of the legs is half of the sum of the parallel sides: $PQ = \dfrac{1}{2}(AB + DC)$. So $10 = \dfrac{1}{2}(7 + DC)$, $7 + DC = 20$ and $DC = 13$ cm.`, sol: r`Use $PQ = \dfrac{1}{2}(AB + DC)$ and solve for $DC$.`, scheme: [['PQ = (AB + DC) / 2', 1], ['DC = 20 - 7 = 13 cm', 1]], d: 2, c: 'application', t: [3], time: 75 }), (C) => { C.assert(near(dist(A, B), 7) && near(dist(D, Cc), 13) && near(m.mn, 10), 'AB = 7, DC = 13, PQ = 10'); C.model([10, 13]); });
}
{
  const t = triFromSides(9.2, 11, 10); const m = medial(t.A, t.B, t.C);
  Q('s208', mk.short({ marks: 2, stem: r`In $\triangle ABC$, $D$, $E$, $F$ are the mid-points of $BC$, $CA$, $AB$ and $AB = 9.2$ cm. Find $AF$ and $DE$, and say why they are equal.`, model: r`$F$ is the mid-point of $AB$, so $AF = \dfrac{1}{2} \times 9.2 = 4.6$ cm. $D$ and $E$ are the mid-points of $BC$ and $CA$, so by the mid-point theorem $DE = \dfrac{1}{2}AB = 4.6$ cm. Both equal half of $AB$, so $AF = DE$.`, sol: r`$AF$ is half of $AB$ by definition of mid-point, and $DE$ is half of $AB$ by the mid-point theorem in $\triangle ABC$.`, scheme: [['AF = 4.6 cm (F is the mid-point of AB)', 1], ['DE = half of AB = 4.6 cm (mid-point theorem), so AF = DE', 1]], d: 2, c: 'understanding', t: [1], time: 75 }), (C) => { C.assert(near(dist(t.A, m.F), 4.6) && near(dist(m.D, m.E), 4.6), 'AF = DE = 4.6'); C.model([4.6]); });
}

// ---------------------------------------------------------------- short answers, 3 marks
{
  const t = { A: [3, 7], B: [0, 0], C: [10, 0] }; const m = medial(t.A, t.B, t.C);
  Q('s301', mk.short({ marks: 3, stem: r`In $\triangle ABC$, $D$, $E$, $F$ are the mid-points of $BC$, $CA$, $AB$. Prove that $AFDE$ is a parallelogram.`, model: r`In $\triangle ABC$, $F$ and $D$ are the mid-points of $AB$ and $BC$, so $FD \parallel AC$, that is $FD \parallel AE$.

Also $E$ and $D$ are the mid-points of $CA$ and $BC$, so $ED \parallel AB$, that is $ED \parallel AF$.

Both pairs of opposite sides of $AFDE$ are parallel, so $AFDE$ is a parallelogram.`, sol: r`Use the mid-point theorem twice, once for each pair of opposite sides.`, scheme: [['FD parallel to AC (mid-point theorem for F and D)', 1], ['ED parallel to AB (mid-point theorem for E and D)', 1], ['Both pairs of opposite sides parallel: parallelogram', 1]], d: 3, c: 'application', t: [1], time: 150 }), (C) => { C.assert(parallel(m.F, m.D, t.A, t.C) && parallel(m.E, m.D, t.A, t.B) && parallelogram(t.A, m.F, m.D, m.E), 'AFDE is a parallelogram'); C.model(['parallelogram', 'AC', 'AB']); });
}
{
  const t = triFromSides(5.6, 7.2, 8.8); const m = medial(t.A, t.B, t.C);
  Q('s302', mk.short({ marks: 3, stem: r`A triangular sail has sides $5.6$ m, $7.2$ m and $8.8$ m. A sailor stitches a ribbon along the three lines that join the mid-points of its sides. Find the length of each piece of ribbon and the total length of ribbon used.`, model: r`Each line joining mid-points is parallel to a side of the sail and half as long (mid-point theorem). The pieces are $\dfrac{1}{2} \times 5.6 = 2.8$ m, $\dfrac{1}{2} \times 7.2 = 3.6$ m and $\dfrac{1}{2} \times 8.8 = 4.4$ m. The total is $2.8 + 3.6 + 4.4 = 10.8$ m, which is half of the perimeter $21.6$ m of the sail.`, sol: r`Apply the mid-point theorem to each pair of sides.`, scheme: [['Each piece is half of the side parallel to it (mid-point theorem)', 1], ['Pieces 2.8 m, 3.6 m, 4.4 m', 1], ['Total 10.8 m', 1]], d: 2, c: 'application', t: [1], time: 120 }), (C) => { const L = [dist(m.D, m.E), dist(m.E, m.F), dist(m.F, m.D)].map(fm).sort((a, b) => a - b); C.assert(L.join() === '2.8,3.6,4.4' && near(m.per, 10.8) && near(m.perABC, 21.6), 'pieces 2.8, 3.6, 4.4; total 10.8'); C.model([2.8, 3.6, 4.4, 10.8]); });
}
{
  const x = 3.4; const t = triFromSides(15.8, 17.4, 20.6); const c = converse(t.A, t.B, t.C);
  Q('s303', mk.short({ marks: 3, stem: r`In $\triangle ABC$, $D$ is the mid-point of $AB$ and the line through $D$ parallel to $BC$ meets $AC$ at $E$. $AE = (2x + 3.5)$ cm, $EC = (5x - 6.7)$ cm and $DE = (3x - 1.5)$ cm. Find $x$, $AC$ and $BC$.`, model: r`By the converse of the mid-point theorem $E$ is the mid-point of $AC$, so $AE = EC$: $2x + 3.5 = 5x - 6.7$, giving $3x = 10.2$ and $x = 3.4$.

Then $AE = 10.3$ cm and $AC = 2 \times 10.3 = 20.6$ cm.

By the mid-point theorem $BC = 2\,DE = 2(3 \times 3.4 - 1.5) = 2 \times 8.7 = 17.4$ cm.`, sol: r`The converse gives $AE = EC$ (an equation for $x$), and the mid-point theorem gives $BC = 2\,DE$.`, scheme: [['AE = EC, so 2x + 3.5 = 5x - 6.7 and x = 3.4', 1], ['AC = 2 x 10.3 = 20.6 cm', 1], ['BC = 2 DE = 2 x 8.7 = 17.4 cm', 1]], d: 3, c: 'application', t: [1, 2], time: 150 }), (C) => { C.assert(near(2 * x + 3.5, 5 * x - 6.7) && near(dist(t.A, c.E), 2 * x + 3.5) && near(dist(c.E, t.C), 5 * x - 6.7) && near(dist(t.A, t.C), 20.6) && near(dist(c.D, c.E), 3 * x - 1.5) && near(dist(t.B, t.C), 17.4), 'x = 3.4, AC = 20.6, DE = 8.7, BC = 17.4'); C.model([3.4, 10.3, 20.6, 17.4]); });
}
{
  const d = divide([0, 0], [7.5, 0], 3, 48);
  Q('s304', mk.short({ marks: 3, stem: r`Describe, using parallel lines, how to divide a line segment $AB$ of length $7.5$ cm into three equal parts, and state the length of each part.`, model: r`Draw a ray from $A$ at an acute angle to $AB$. Mark off three equal steps along it with compasses, and number the marks $1$, $2$, $3$. Join the third mark $3$ to $B$, and through the marks $1$ and $2$ draw lines parallel to $3B$, meeting $AB$ at $P$ and $Q$.

These parallel lines cut the ray in equal intercepts (the three equal steps), so by the equal intercept theorem they make equal intercepts on $AB$: $AP = PQ = QB = 7.5 \div 3 = 2.5$ cm.`, sol: r`The construction is justified by the equal intercept theorem.`, scheme: [['Ray from A at an angle; three equal steps marked on it', 1], ['3 joined to B; parallels through 1 and 2 meet AB at P and Q', 1], ['Equal intercept theorem: AP = PQ = QB = 2.5 cm', 1]], d: 3, c: 'application', t: [3], time: 150 }), (C) => { C.assert(d.pts.length === 4 && near(d.part, 2.5) && d.marks.length === 4, 'three parts of 2.5 cm'); C.model([2.5]); });
}
{
  const A = [2, 5], B = [11, 5], D = [0, 0], Cc = [15, 0]; const M = mid(A, D); const N = meet(M, add(M, sub(B, A)), B, Cc);
  Q('s305', mk.short({ marks: 3, stem: r`In trapezium $ABCD$, $AB \parallel DC$ and $M$ is the mid-point of the leg $AD$. The line through $M$ parallel to $AB$ meets $BC$ at $N$. Prove that $N$ is the mid-point of $BC$.`, model: r`The lines $AB$, $MN$ and $DC$ are parallel (as $MN \parallel AB \parallel DC$) and cut the transversal $AD$ in equal intercepts $AM = MD$.

By the equal intercept theorem they cut equal intercepts on the transversal $BC$ as well, so $BN = NC$.

Hence $N$ is the mid-point of $BC$.`, sol: r`Three parallel lines, equal intercepts on $AD$, therefore equal intercepts on $BC$.`, scheme: [['AB, MN, DC are parallel and AM = MD on transversal AD', 1], ['Equal intercept theorem for the transversal BC', 1], ['BN = NC, so N is the mid-point of BC', 1]], d: 3, c: 'analysis', t: [3], time: 150 }), (C) => { C.assert(parallel(A, B, D, Cc) && parallel(M, N, A, B) && isMid(M, A, D) && isMid(N, B, Cc), 'AM = MD, MN parallel to the bases, BN = NC'); C.model(['equal intercept', 'BN = NC']); });
}
{
  const t = { A: [3, 8], B: [0, 0], C: [12, 0] }; const D = mid(t.A, t.B), E = mid(t.A, t.C), M = mid(t.B, t.C); const P = meet(D, E, t.A, M);
  Q('s306', mk.short({ marks: 3, stem: r`In $\triangle ABC$, $M$ is the mid-point of $BC$, and $D$ and $E$ are the mid-points of $AB$ and $AC$. The segment $DE$ meets $AM$ at $P$. Prove that $P$ is the mid-point of $AM$.`, model: r`$D$ and $E$ are the mid-points of $AB$ and $AC$, so $DE \parallel BC$ (mid-point theorem); hence $DP \parallel BM$.

In $\triangle ABM$, $D$ is the mid-point of $AB$ and $DP \parallel BM$. By the converse of the mid-point theorem, $P$ is the mid-point of $AM$.`, sol: r`First $DE \parallel BC$, then apply the converse in $\triangle ABM$.`, scheme: [['DE parallel to BC, so DP parallel to BM', 1], ['In triangle ABM: D mid-point of AB and DP parallel to BM', 1], ['Converse: P is the mid-point of AM', 1]], d: 3, c: 'analysis', t: [1, 2], time: 150 }), (C) => { C.assert(parallel(D, E, t.B, t.C) && isMid(P, t.A, M), 'P is the mid-point of AM'); C.model(['converse', 'DP']); });
}

// ---------------------------------------------------------------- long answers, 10 marks
{
  const t = triFromSides(11.6, 17.4, 14.2); const pr = midProof(t.A, t.B, t.C); const L = t.A, Mm = t.B, N = t.C, P = pr.D, Qq = pr.E, R = pr.F;
  const fg = fig({ pts: { L, M: Mm, N, P, Q: Qq, R }, pos: { L: 'n', P: 'w', Q: 'ne', R: 'e', M: 'sw', N: 'se' }, segs: [['L', 'P', undefined, { ticks: 1 }], ['P', 'M', undefined, { ticks: 1 }], ['L', 'Q', undefined, { ticks: 2 }], ['Q', 'N', undefined, { ticks: 2 }], ['M', 'N'], ['P', 'Q', undefined, { ticks: 3 }], ['Q', 'R', undefined, { ticks: 3 }], ['N', 'R', undefined, { ticks: 1 }]] }, 'Triangle L M N with P and Q the mid-points of L M and L N. P Q is produced to R so that Q R equals P Q, and N R is joined. Equal tick marks show L P equal to P M, L Q equal to Q N and P Q equal to Q R.', 'Construction for the mid-point theorem.');
  Q('l01', mk.long({ marks: 10, stem: r`In $\triangle LMN$, $P$ and $Q$ are the mid-points of $LM$ and $LN$. $PQ$ is produced to $R$ so that $QR = PQ$, and $NR$ is joined.

(a) Prove that $\triangle LPQ \cong \triangle NRQ$. [3]

(b) Hence prove that $PMNR$ is a parallelogram, and deduce that $PQ \parallel MN$ and $PQ = \dfrac{1}{2}MN$. [3]

(c) $LM = 11.6$ cm, $LN = 14.2$ cm and $MN = 17.4$ cm. Find the perimeter of $\triangle LPQ$ and the perimeter of the quadrilateral $PMNQ$. [4]`, model: r`(a) In $\triangle LPQ$ and $\triangle NRQ$: $LQ = QN$ ($Q$ is the mid-point of $LN$), $PQ = QR$ (construction), and $\angle LQP = \angle NQR$ (vertically opposite angles). So $\triangle LPQ \cong \triangle NRQ$ (SAS).

(b) From the congruence $NR = LP$, and $LP = PM$ ($P$ is the mid-point of $LM$), so $NR = PM$. Also $\angle QLP = \angle QNR$ (corresponding parts), and these are alternate angles for the lines $LM$ and $NR$ with transversal $LN$, so $NR \parallel LM$, that is $NR \parallel PM$. One pair of opposite sides of $PMNR$ is equal and parallel, so $PMNR$ is a parallelogram. Hence $PR \parallel MN$ and $PR = MN$. As $PQ = \dfrac{1}{2}PR$, we get $PQ \parallel MN$ and $PQ = \dfrac{1}{2}MN$.

(c) $LP = 5.8$ cm, $LQ = 7.1$ cm and $PQ = \dfrac{1}{2} \times 17.4 = 8.7$ cm. The perimeter of $\triangle LPQ$ is $5.8 + 7.1 + 8.7 = 21.6$ cm. For $PMNQ$: $PM = 5.8$, $MN = 17.4$, $NQ = 7.1$ and $QP = 8.7$, so its perimeter is $5.8 + 17.4 + 7.1 + 8.7 = 39$ cm.`, sol: r`The proof turns the two mid-points into a pair of congruent triangles; the doubled segment $PR$ then forms a parallelogram with the base $MN$. Part (c) uses the theorem for $PQ$.`, scheme: [['(a) LQ = QN and PQ = QR', 1], ['(a) vertically opposite angles equal; SAS congruence', 2], ['(b) NR = LP = PM and NR parallel to LM (alternate angles)', 1], ['(b) PMNR is a parallelogram (one pair of sides equal and parallel)', 1], ['(b) PR = MN, PQ = half of PR, so PQ parallel to MN and half of it', 1], ['(c) LP = 5.8, LQ = 7.1, PQ = 8.7; perimeter of LPQ = 21.6 cm', 2], ['(c) perimeter of PMNQ = 5.8 + 17.4 + 7.1 + 8.7 = 39 cm', 2]], d: 3, c: 'analysis', t: [1], time: 540, assets: [fg] }), (C) => {
    C.assert(near(dist(L, Mm), 11.6) && near(dist(L, N), 14.2) && near(dist(Mm, N), 17.4) && parallelogram(P, Mm, N, R) && near(dist(P, Qq), 8.7), 'triangle data; PMNR is a parallelogram; PQ = 8.7');
    C.assert(near(perimeter(L, P, Qq), 21.6) && near(perimeter(P, Mm, N, Qq), 39), 'perimeters 21.6 and 39'); C.model([5.8, 7.1, 8.7, 21.6, 39]);
  });
}
{
  const t = triFromBCAngleCA(9.8, 55, 13.4); const X = t.A, Y = t.B, Z = t.C; const cp = converseProof(X, Y, Z);
  Q('l02', mk.long({ marks: 10, stem: r`In $\triangle XYZ$, $P$ is the mid-point of $XY$ and the line through $P$ parallel to $YZ$ meets $XZ$ at $Q$. Let $Q'$ be the mid-point of $XZ$.

(a) State what the mid-point theorem tells you about $PQ'$. [3]

(b) Explain why $PQ$ and $PQ'$ must be the same line, and hence prove that $Q$ is the mid-point of $XZ$. [3]

(c) $XZ = 13.4$ cm, $YZ = 9.8$ cm and $\angle XYZ = 55^\circ$. Find $XQ$, $PQ$ and $\angle XPQ$, giving reasons. [4]`, model: r`(a) $P$ and $Q'$ are the mid-points of $XY$ and $XZ$, so by the mid-point theorem $PQ' \parallel YZ$ and $PQ' = \dfrac{1}{2}YZ$.

(b) Through the point $P$ there is only one line parallel to $YZ$. Both $PQ$ (given) and $PQ'$ (part (a)) pass through $P$ and are parallel to $YZ$, so they are the same line. Then $Q$ and $Q'$ are both the point where this line meets $XZ$, so $Q = Q'$, and $Q$ is the mid-point of $XZ$.

(c) $XQ = \dfrac{1}{2} \times 13.4 = 6.7$ cm. $PQ = \dfrac{1}{2} \times 9.8 = 4.9$ cm. Since $PQ \parallel YZ$, the corresponding angles $\angle XPQ$ and $\angle XYZ$ are equal, so $\angle XPQ = 55^\circ$.`, sol: r`This is the proof of the converse of the mid-point theorem: the mid-point theorem produces the line $PQ'$, and the uniqueness of the parallel through $P$ shows that it is the line $PQ$ already drawn.`, scheme: [['(a) PQ-dash is parallel to YZ', 2], ['(a) PQ-dash = half of YZ', 1], ['(b) only one line through P is parallel to YZ', 1], ['(b) PQ and PQ-dash coincide, so Q = Q-dash', 1], ['(b) Q is the mid-point of XZ', 1], ['(c) XQ = 6.7 cm and PQ = 4.9 cm', 2], ['(c) angle XPQ = 55 degrees (corresponding angles, PQ parallel to YZ)', 2]], d: 3, c: 'analysis', t: [2], time: 540 }), (C) => {
    C.assert(near(dist(X, Z), 13.4) && near(dist(Y, Z), 9.8) && near(angDeg(Y, X, Z), 55), 'data'); C.assert(parallel(cp.D, cp.E2, Y, Z) && isMid(cp.E, X, Z) && near(dist(X, cp.E), 6.7) && near(dist(cp.D, cp.E), 4.9) && near(angDeg(cp.D, X, cp.E), 55), 'XQ = 6.7, PQ = 4.9, angle XPQ = 55'); C.model([6.7, 4.9, 55]);
  });
}
{
  const A = [0, 0], Cc = [26, 0], B = [10, -7], D = [10, 11]; const m = quadMid(A, B, Cc, D);
  Q('l03', mk.long({ marks: 10, stem: r`In the quadrilateral $ABCD$, $P$, $Q$, $R$, $S$ are the mid-points of $AB$, $BC$, $CD$, $DA$.

(a) By joining $AC$, show that $PQ \parallel SR$ and $PQ = SR$. [3]

(b) By joining $BD$, show that $PQRS$ is a parallelogram. [3]

(c) The diagonals $AC$ and $BD$ are perpendicular, with $AC = 26$ cm and $BD = 18$ cm. Name the figure $PQRS$ and find its perimeter and its area. [4]`, model: r`(a) In $\triangle ABC$, $P$ and $Q$ are the mid-points of $AB$ and $BC$, so $PQ \parallel AC$ and $PQ = \dfrac{1}{2}AC$. In $\triangle ADC$, $S$ and $R$ are the mid-points of $DA$ and $DC$, so $SR \parallel AC$ and $SR = \dfrac{1}{2}AC$. Hence $PQ \parallel SR$ and $PQ = SR$.

(b) In $\triangle BCD$, $Q$ and $R$ are the mid-points of $BC$ and $CD$, so $QR \parallel BD$ and $QR = \dfrac{1}{2}BD$. In $\triangle ABD$, $P$ and $S$ are the mid-points of $AB$ and $DA$, so $PS \parallel BD$ and $PS = \dfrac{1}{2}BD$. So $QR \parallel PS$, and with part (a) both pairs of opposite sides of $PQRS$ are parallel: $PQRS$ is a parallelogram.

(c) $PQ = SR = \dfrac{1}{2} \times 26 = 13$ cm and $QR = PS = \dfrac{1}{2} \times 18 = 9$ cm. Since $PQ \parallel AC$, $QR \parallel BD$ and $AC \perp BD$, the sides $PQ$ and $QR$ are perpendicular: $PQRS$ is a rectangle $13$ cm by $9$ cm. Its perimeter is $2(13 + 9) = 44$ cm and its area is $13 \times 9 = 117$ cm$^{2}$.`, sol: r`The diagonals act as the third side of two pairs of triangles, so the mid-point theorem is used four times. In part (c) perpendicular diagonals make the parallelogram a rectangle.`, scheme: [['(a) PQ parallel to AC and PQ = half of AC (triangle ABC)', 1], ['(a) SR parallel to AC and SR = half of AC (triangle ADC)', 1], ['(a) so PQ parallel and equal to SR', 1], ['(b) QR parallel to BD, QR = half of BD (triangle BCD)', 1], ['(b) PS parallel to BD, PS = half of BD (triangle ABD)', 1], ['(b) both pairs of opposite sides parallel: parallelogram', 1], ['(c) sides 13 cm and 9 cm; rectangle (perpendicular diagonals)', 2], ['(c) perimeter 44 cm and area 117 square cm', 2]], d: 3, c: 'analysis', t: [1], time: 540 }), (C) => {
    C.assert(parallel(m.P, m.Q, A, Cc) && parallel(m.S, m.R, A, Cc) && near(dist(m.P, m.Q), dist(m.S, m.R)) && parallelogram(m.P, m.Q, m.R, m.S), '(a), (b)');
    C.assert(m.perpendicularDiagonals && near(m.ac, 26) && near(m.bd, 18) && near(dist(m.P, m.Q), 13) && near(dist(m.Q, m.R), 9) && near(G.dot(sub(m.Q, m.P), sub(m.R, m.Q)), 0, 1e-9) && near(m.per, 44) && near(area(m.P, m.Q, m.R, m.S), 117), '(c) rectangle 13 by 9, perimeter 44, area 117'); C.model([13, 9, 44, 117]);
  });
}
{
  const A = [0, 0], Cc = [16.5, 0]; const bx = 14.3, by = Math.sqrt(14.8 ** 2 - (bx - 5.5) ** 2); const B = [bx, by];
  const D = mid(B, Cc), E = mid(A, D), F = meet(B, E, A, Cc), Gp = meet(D, add(D, sub(F, B)), A, Cc);
  const fg = fig({ pts: { A, B, C: Cc, D, E, F, G: Gp }, pos: { A: 'sw', B: 'n', C: 'se', D: 'ne', E: 'nw', F: 's', G: 's' }, segs: [['A', 'B'], ['B', 'D'], ['D', 'C'], ['A', 'F'], ['F', 'G'], ['G', 'C'], ['A', 'E'], ['E', 'D'], ['B', 'E'], ['E', 'F'], ['D', 'G', undefined, { dashed: true }]] }, 'Triangle A B C with D the mid-point of B C and E the mid-point of A D. B E is produced to meet A C at F, and the dashed line D G is drawn parallel to B F to meet A C at G.', 'Not a proof: the figure shows the construction.');
  Q('l04', mk.long({ marks: 10, stem: r`In $\triangle ABC$, $D$ is the mid-point of $BC$ and $E$ is the mid-point of $AD$. $BE$ produced meets $AC$ at $F$. A line $DG$ is drawn through $D$ parallel to $BF$, meeting $AC$ at $G$.

(a) Prove that $G$ is the mid-point of $FC$. [3]

(b) Prove that $F$ is the mid-point of $AG$. [3]

(c) Hence show that $AF = \dfrac{1}{3}AC$. If $AC = 16.5$ cm and $BF = 14.8$ cm, find $AF$, $FC$ and $DG$. [4]`, model: r`(a) In $\triangle BCF$, $D$ is the mid-point of $BC$ and $DG \parallel BF$ (construction). By the converse of the mid-point theorem, $G$ is the mid-point of $FC$.

(b) In $\triangle ADG$, $E$ is the mid-point of $AD$ and $EF \parallel DG$ (as $EF$ lies along $BF$). By the converse of the mid-point theorem, $F$ is the mid-point of $AG$.

(c) From (a) and (b), $AF = FG$ and $FG = GC$, so $AF = FG = GC$ and $AF = \dfrac{1}{3}AC$. With $AC = 16.5$ cm: $AF = \dfrac{16.5}{3} = 5.5$ cm and $FC = 2 \times 5.5 = 11$ cm. In $\triangle BCF$ the mid-point theorem gives $DG = \dfrac{1}{2}BF = \dfrac{1}{2} \times 14.8 = 7.4$ cm.`, sol: r`The converse of the mid-point theorem is used twice, in two different triangles that share the line $AC$.`, scheme: [['(a) triangle BCF: D mid-point of BC and DG parallel to BF', 1], ['(a) converse of the mid-point theorem: G is the mid-point of FC', 2], ['(b) triangle ADG: E mid-point of AD and EF parallel to DG', 1], ['(b) converse: F is the mid-point of AG', 2], ['(c) AF = FG = GC, so AF = one third of AC', 1], ['(c) AF = 5.5 cm and FC = 11 cm', 2], ['(c) DG = half of BF = 7.4 cm', 1]], d: 4, c: 'analysis', t: [2], time: 600, assets: [fg] }), (C) => {
    C.assert(near(dist(B, F), 14.8) && near(dist(A, Cc), 16.5) && isMid(D, B, Cc) && isMid(E, A, D) && parallel(D, Gp, B, F) && isMid(Gp, F, Cc) && isMid(F, A, Gp), '(a), (b)');
    C.assert(near(dist(A, F), 5.5) && near(dist(F, Cc), 11) && near(dist(D, Gp), 7.4) && near(dist(A, F), dist(F, Gp)) && near(dist(F, Gp), dist(Gp, Cc)), '(c) AF = 5.5, FC = 11, DG = 7.4'); C.model([5.5, 11, 7.4]);
  });
}
{
  const A = [3, 5], B = [19.4, 5], D = [0, 0], Cc = [23.6, 0]; const m = trapezium(A, B, Cc, D);
  const Mm = m.M, Nn = m.N; const E = [2 * Nn[0] - A[0], 2 * Nn[1] - A[1]]; const N2 = meet(Mm, add(Mm, sub(B, A)), B, Cc);
  Q('l05', mk.long({ marks: 10, stem: r`$ABCD$ is a trapezium with $AB \parallel DC$. $M$ and $N$ are the mid-points of the legs $AD$ and $BC$.

(a) The line through $M$ parallel to $AB$ meets $BC$ at $N'$. Use the equal intercept theorem to prove that $N'$ is the mid-point of $BC$, so that $N' = N$. [3]

(b) $AN$ is produced to meet $DC$ produced at $E$. Prove that $\triangle ABN \cong \triangle ECN$, and hence that $MN = \dfrac{1}{2}(AB + DC)$. [3]

(c) $AB = 16.4$ cm and $DC = 23.6$ cm. Find $MN$ and the length of the segment joining the mid-points of the diagonals $AC$ and $BD$. [4]`, model: r`(a) The lines $AB$, $MN'$ and $DC$ are parallel, and on the transversal $AD$ they cut equal intercepts $AM = MD$. By the equal intercept theorem they cut equal intercepts on the transversal $BC$: $BN' = N'C$. So $N'$ is the mid-point of $BC$, which is $N$.

(b) In $\triangle ABN$ and $\triangle ECN$: $BN = NC$ ($N$ is the mid-point), $\angle ANB = \angle ENC$ (vertically opposite angles) and $\angle ABN = \angle ECN$ (alternate angles, $AB \parallel CE$). So the triangles are congruent (ASA), giving $AN = NE$ and $CE = AB$. In $\triangle ADE$, $M$ and $N$ are the mid-points of $AD$ and $AE$, so $MN \parallel DE$ and $MN = \dfrac{1}{2}DE = \dfrac{1}{2}(DC + CE) = \dfrac{1}{2}(DC + AB)$.

(c) $MN = \dfrac{1}{2}(16.4 + 23.6) = \dfrac{40}{2} = 20$ cm. The segment joining the mid-points of the diagonals is half of the difference of the parallel sides: $\dfrac{1}{2}(23.6 - 16.4) = \dfrac{7.2}{2} = 3.6$ cm.`, sol: r`Part (a) is an application of the equal intercept theorem, part (b) is the proof of the mid-line formula through a congruence and the mid-point theorem, and part (c) uses the formula and its companion for the diagonals.`, scheme: [['(a) AB, MN-dash, DC parallel with AM = MD on AD', 1], ['(a) equal intercept theorem: BN-dash = N-dash C', 1], ['(a) N-dash is the mid-point of BC, so it is N', 1], ['(b) triangles ABN and ECN congruent by ASA (BN = NC, vertically opposite, alternate angles)', 1], ['(b) CE = AB and AN = NE', 1], ['(b) mid-point theorem in triangle ADE: MN = half of DE = half of (DC + AB)', 1], ['(c) MN = 20 cm', 2], ['(c) segment joining mid-points of diagonals = 3.6 cm', 2]], d: 3, c: 'analysis', t: [3], time: 540 }), (C) => {
    C.assert(isMid(N2, B, Cc) && near(dist(Nn, N2), 0) && isMid(Mm, A, D), '(a) N-dash = N');
    C.assert(collinear(D, Cc, E) && near(dist(Cc, E), dist(A, B)) && near(dist(A, Nn), dist(Nn, E)) && near(dist(Mm, Nn), dist(D, E) / 2) && parallel(Mm, Nn, D, E), '(b) E on DC produced, CE = AB, MN = DE / 2');
    C.assert(near(dist(A, B), 16.4) && near(dist(D, Cc), 23.6) && near(m.mn, 20) && near(m.pq, 3.6), '(c) MN = 20, PQ = 3.6'); C.model([20, 3.6]);
  });
}
{
  const s = intercepts([0, 0], [2.4, 7.2], [1, 0.35], [0, 0.5, 1], [8, -0.5], [9.8, 6.6]);
  const [A, B, Cc] = s.on1, [P, Qq, R] = s.on2; const dir = [1, 0.35]; const pr = sub(R, P);
  const S = meet(A, add(A, pr), B, add(B, dir)), T = meet(A, add(A, pr), Cc, add(Cc, dir));
  const fg = fig({ pts: { A, B, C: Cc, P, Q: Qq, R, S, T }, pos: { A: 'nw', B: 'w', C: 'sw', P: 'ne', Q: 'e', R: 'se', S: 'se', T: 'se' }, segs: [['A', 'B', undefined, { ticks: 1 }], ['B', 'C', undefined, { ticks: 1 }], ['A', 'P', undefined, { arrows: 1 }], ['B', 'Q', undefined, { arrows: 1 }], ['C', 'R', undefined, { arrows: 1 }], ['P', 'Q'], ['Q', 'R'], ['A', 'S', undefined, { dashed: true }], ['S', 'T', undefined, { dashed: true }]] }, 'Three parallel lines l, m, n marked with arrows cut one transversal at A, B, C with A B equal to B C, and a second transversal at P, Q, R. The dashed line through A parallel to P R meets the line m at S and the line n at T.', 'Construction for the equal intercept theorem.');
  Q('l06', mk.long({ marks: 10, stem: r`Parallel lines $l$, $m$, $n$ meet a transversal at $A$, $B$, $C$ with $AB = BC$, and a second transversal at $P$, $Q$, $R$. Through $A$ a line is drawn parallel to $PR$, meeting $m$ at $S$ and $n$ at $T$.

(a) Prove that $PQ = AS$ and $QR = ST$. [3]

(b) Prove that $S$ is the mid-point of $AT$. [3]

(c) Deduce that $PQ = QR$. Five parallel lines are equally spaced along a transversal and cut off $18.8$ cm on a second transversal between the first and the last line. Find the intercept between consecutive lines on the second transversal, and the distance between the second and the fifth line. [4]`, model: r`(a) $AP \parallel SQ$ (as $l \parallel m$) and $AS \parallel PQ$ (as $AT \parallel PR$), so $APQS$ is a parallelogram and $AS = PQ$. Also $SQ \parallel TR$ (as $m \parallel n$) and $ST \parallel QR$ (as $AT \parallel PR$), so $SQRT$ is a parallelogram and $ST = QR$.

(b) In $\triangle ACT$, $B$ is the mid-point of $AC$ (given $AB = BC$) and $BS \parallel CT$ (as $m \parallel n$). By the converse of the mid-point theorem, $S$ is the mid-point of $AT$.

(c) So $AS = ST$, and by (a) $PQ = AS = ST = QR$. For the five lines there are four equal intercepts on the second transversal: each is $\dfrac{18.8}{4} = 4.7$ cm. The second line and the fifth line are three intercepts apart: $3 \times 4.7 = 14.1$ cm.`, sol: r`The proof builds two parallelograms to move the intercepts $PQ$ and $QR$ onto the line $AT$, then uses the converse of the mid-point theorem to compare them.`, scheme: [['(a) APQS is a parallelogram (AP parallel to SQ, AS parallel to PQ), so AS = PQ', 2], ['(a) SQRT is a parallelogram, so ST = QR', 1], ['(b) in triangle ACT, B is the mid-point of AC', 1], ['(b) BS is parallel to CT', 1], ['(b) converse: S is the mid-point of AT', 1], ['(c) PQ = AS = ST = QR', 1], ['(c) each intercept 18.8 / 4 = 4.7 cm', 1], ['(c) second to fifth line: 3 x 4.7 = 14.1 cm', 2]], d: 4, c: 'analysis', t: [3], time: 600, assets: [fg] }), (C) => {
    C.assert(isMid(B, A, Cc) && parallelogram(A, P, Qq, S) && parallelogram(S, Qq, R, T) && near(dist(A, S), dist(P, Qq)) && near(dist(S, T), dist(Qq, R)) && isMid(S, A, T), '(a), (b)');
    C.assert(near(dist(P, Qq), dist(Qq, R)) && near(18.8 / 4, 4.7) && near(3 * 4.7, 14.1), '(c) 4.7 and 14.1'); C.model([4.7, 14.1]);
    const s5 = intercepts([0, 0], [2.4, 7], [1, 0.35], [0, 0.25, 0.5, 0.75, 1], [8, -0.5], [9.5, 6.5]); C.assert(s5.s2.length === 4 && s5.s2.every((x) => near(x, s5.s2[0])) && near(dist(s5.on2[1], s5.on2[4]) / s5.s2[0], 3), 'five lines: four equal intercepts; 2nd to 5th is three of them');
  });
}
{
  const t = triFromSides(13.2, 9.6, 13.2); const m = medial(t.A, t.B, t.C);
  const P = [0, 0], Qq = [11.6, 0], R = [0, 11.6]; const S = mid(Qq, R), Tt = mid(R, P), U = mid(P, Qq);
  Q('l07', mk.long({ marks: 10, stem: r`In $\triangle ABC$, $AB = AC$, and $D$, $E$, $F$ are the mid-points of $BC$, $CA$, $AB$.

(a) Prove that $AFDE$ is a rhombus. [3]

(b) $AB = AC = 13.2$ cm and $BC = 9.6$ cm. Find $DE$, $FD$, the perimeter of $AFDE$ and the perimeter of $\triangle DEF$. [3]

(c) In another triangle $PQR$, $PQ = PR = 11.6$ cm and $\angle QPR = 90^\circ$. $S$, $T$, $U$ are the mid-points of $QR$, $RP$, $PQ$. Show that $PUST$ is a square and find its area. [4]`, model: r`(a) In $\triangle ABC$, $F$ and $D$ are the mid-points of $AB$ and $BC$, so $FD \parallel AC$; $E$ and $D$ are the mid-points of $CA$ and $BC$, so $ED \parallel AB$. Both pairs of opposite sides of $AFDE$ are parallel, so it is a parallelogram. Also $AF = \dfrac{1}{2}AB = \dfrac{1}{2}AC = AE$, so two adjacent sides are equal and $AFDE$ is a rhombus.

(b) $DE = \dfrac{1}{2}AB = 6.6$ cm and $FD = \dfrac{1}{2}AC = 6.6$ cm. The perimeter of the rhombus $AFDE$ is $4 \times 6.6 = 26.4$ cm. Also $EF = \dfrac{1}{2}BC = 4.8$ cm, so the perimeter of $\triangle DEF$ is $6.6 + 6.6 + 4.8 = 18$ cm.

(c) As in (a), $PUST$ is a parallelogram with $PU = \dfrac{1}{2}PQ = 5.8$ cm and $PT = \dfrac{1}{2}PR = 5.8$ cm, so it is a rhombus. Its angle at $P$ is $\angle QPR = 90^\circ$, and a rhombus with one right angle is a square. Its area is $5.8 \times 5.8 = 33.64$ cm$^{2}$.`, sol: r`Part (a) uses the mid-point theorem twice and the equal sides $AB = AC$. In part (c) the same argument gives a rhombus, and the right angle at $P$ makes it a square.`, scheme: [['(a) FD parallel to AC and ED parallel to AB: parallelogram', 2], ['(a) AF = AE (half of AB = AC): rhombus', 1], ['(b) DE = FD = 6.6 cm and perimeter of AFDE = 26.4 cm', 2], ['(b) EF = 4.8 cm and perimeter of DEF = 18 cm', 1], ['(c) PUST is a rhombus with PU = PT = 5.8 cm', 1], ['(c) angle P = 90 degrees, so a square', 1], ['(c) area = 5.8 x 5.8 = 33.64 square cm', 2]], d: 4, c: 'analysis', t: [1], time: 600 }), (C) => {
    C.assert(parallelogram(t.A, m.F, m.D, m.E) && [dist(t.A, m.F), dist(m.F, m.D), dist(m.D, m.E), dist(m.E, t.A)].every((x) => near(x, 6.6)), '(a), (b) rhombus of side 6.6');
    C.assert(near(perimeter(t.A, m.F, m.D, m.E), 26.4) && near(dist(m.E, m.F), 4.8) && near(m.per, 18), '(b) 26.4 and 18');
    C.assert(parallelogram(P, U, S, Tt) && [dist(P, U), dist(U, S), dist(S, Tt), dist(Tt, P)].every((x) => near(x, 5.8)) && near(angDeg(P, U, Tt), 90) && near(area(P, U, S, Tt), 33.64), '(c) square of side 5.8, area 33.64'); C.model([6.6, 26.4, 4.8, 18, 5.8, 33.64]);
  });
}
