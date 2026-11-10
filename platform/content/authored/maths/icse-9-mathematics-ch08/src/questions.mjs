// ICSE 9 Mathematics ch08 Triangles: Congruency and Inequalities — objective items (mcq, assertion-reason, true-false,
// fill-blank, numerical). Short and long items are in questions2.mjs. Every key is recomputed from coordinates (tri.mjs):
// the givens are asserted on the figure, the answer is measured, option values are typed independently, and the test that
// applies is found by criterion() from the structure of the equal parts.
import { Q, mk, r } from './lib.mjs';
import { A, W, eqctx, must, near, dist, ang, len, byAngles, bySides, iso, asa, sas, polar, add, foot, copy, canForm, criterion, sideOrder, angleOrder, notCongruent, congruent, norm, r2, fig } from './qh.mjs';

// =============================================================== MCQ (m01-m05, m07-m09 are the check-slide items)
Q('m01', mk.mcq({ stem: r`Two triangular sails $PQR$ and $XYZ$ for a model boat have $PQ = XY$, $QR = YZ$ and $\angle Q = \angle Y$. The sails are congruent by the test`, opts: ['SAS', 'SSS', 'ASA', 'RHS'], key: 'a', sol: r`The equal sides $PQ = XY$ and $QR = YZ$ meet at $Q$ and $Y$, and the equal angle $\angle Q = \angle Y$ is the angle between them. Two sides and the included angle are equal: SAS. SSS needs a third pair of sides, ASA needs two angles and RHS needs a right angle.`, d: 1, c: 'understanding', t: [1], time: 60 }), (C) => { C.which([criterion(['P', 'Q', 'R'], ['PQ', 'QR', '<Q']), 'SSS', 'ASA', 'RHS'], 'SAS'); });

Q('m02', mk.mcq({ stem: r`Triangular flags $LMN$ and $UVW$ have $\angle L = \angle U$, $\angle M = \angle V$ and $LM = UV$. They are congruent by the test`, opts: ['ASA', 'AAS', 'SAS', 'SSS'], key: 'a', sol: r`The side $LM$ joins the vertices $L$ and $M$ of the two equal angles, so it lies between them: two angles and the included side, ASA. AAS would need a side that is not between the angles, and SAS and SSS need more equal sides.`, d: 2, c: 'understanding', t: [1], time: 60 }), (C) => { C.which([criterion(['L', 'M', 'N'], ['<L', '<M', 'LM']), 'AAS', 'SAS', 'SSS'], 'ASA'); });

{
  const g = bySides(['A', 'B', 'C'], [7, 8, 9]); // any triangle: angles at A, B, C
  const aA = 58, aB = 71, aC = 180 - 58 - 71;
  const T = byAngles(['A', 'B', 'C'], [aA, aB, aC]);
  const T2 = copy(T, ['A', 'B', 'C'], ['Q', 'R', 'P'], { flip: true, dx: 14 });
  const WW = { ...T, ...T2 };
  congruent(WW, ['A', 'B', 'C'], ['Q', 'R', 'P'], 'm03');
  Q('m03', mk.mcq({ stem: r`$\triangle ABC \cong \triangle QRP$, with $\angle A = 58^\circ$ and $\angle B = 71^\circ$. The angle $\angle P$ measures`, opts: [r`$51^\circ$`, r`$58^\circ$`, r`$71^\circ$`, r`$109^\circ$`], key: 'a', sol: r`The letters are in matching order: $A \leftrightarrow Q$, $B \leftrightarrow R$, $C \leftrightarrow P$. So $\angle P = \angle C = 180^\circ - 58^\circ - 71^\circ = 51^\circ$. Option (b) wrongly matches $P$ with $A$, (c) matches $P$ with $B$, and (d) is $180^\circ - 71^\circ$.`, d: 2, c: 'application', t: [1], time: 75 }), (C) => { A([r`180^\circ - 58^\circ - 71^\circ = 51^\circ`]).verify(C); C.assert(g && ang(WW, 'A', 'B', 'C') === 58 && ang(WW, 'B', 'A', 'C') === 71, 'givens on the figure'); C.which([51, 58, 71, 109], ang(WW, 'P', 'Q', 'R')); });
}

{
  const guar = [['AB', 'AC', '<C'], ['AB', 'AC', '<A'], ['<A', '<B', 'AB'], ['R<B', 'AC', 'AB']].map((p) => criterion(['A', 'B', 'C'], p) !== null);
  Q('m04', mk.mcq({ stem: 'Four sets of equal parts of two triangles are listed. Which set does **not** prove that the triangles are congruent?', opts: ['two sides and an angle that is not between them', 'two sides and the angle between them', 'two angles and the side between them', 'right angles, equal hypotenuses and one more equal side'], key: 'a', sol: r`Two sides with a non-included angle (SSA) can fit two different triangles, so it is not a test. The other three are SAS, ASA and RHS.`, d: 1, c: 'recall', t: [1], time: 60 }), (C) => { C.assert(guar.join() === 'false,true,true,true', 'SSA gives no test; SAS, ASA, RHS do'); C.which(guar, false); });
}

{
  const T = iso(52, 5);
  Q('m05', mk.mcq({ stem: r`In an isosceles triangle $ABC$ with $AB = AC$, the angle $\angle A = 52^\circ$. The angle $\angle B$ is`, opts: [r`$64^\circ$`, r`$128^\circ$`, r`$52^\circ$`, r`$26^\circ$`], key: 'a', sol: r`Angles opposite equal sides are equal, so $\angle B = \angle C$ and $\angle B = \dfrac{180^\circ - 52^\circ}{2} = 64^\circ$. Option (b) is $180^\circ - 52^\circ$, (c) repeats $\angle A$ and (d) halves $\angle A$.`, d: 1, c: 'understanding', t: [2], time: 60 }), (C) => { A([r`\dfrac{180^\circ - 52^\circ}{2} = 64^\circ`]).verify(C); C.assert(near(dist(T.A, T.B), dist(T.A, T.C)) && ang(T, 'A', 'B', 'C') === 52, 'iso with apex 52'); C.which([64, 128, 52, 26], ang(T, 'B', 'A', 'C')); });
}

{
  const T = byAngles(['Q', 'R', 'P'], [34, 34, 112]);
  const pairs = [['PQ', 'PR'], ['QR', 'PQ'], ['QR', 'PR']];
  const eq = pairs.filter(([x, y]) => near(len(T, x[0], x[1]), len(T, y[0], y[1]))).map(([x, y]) => `${x} = ${y}`);
  Q('m06', mk.mcq({ stem: r`In $\triangle PQR$, $\angle Q = \angle R = 34^\circ$. Which two sides are equal?`, opts: [r`$PQ = PR$`, r`$QR = PQ$`, r`$QR = PR$`, 'no two sides need be equal'], key: 'a', sol: r`Sides opposite equal angles are equal. The side opposite $\angle R$ is $PQ$ and the side opposite $\angle Q$ is $PR$, so $PQ = PR$. The side $QR$ is opposite $\angle P = 112^\circ$, which differs.`, d: 2, c: 'understanding', t: [2], time: 60 }), (C) => { C.assert(eq.length === 1 && ang(T, 'P', 'Q', 'R') === 112, 'exactly one pair of equal sides: PQ = PR'); C.which(['PQ = PR', 'QR = PQ', 'QR = PR', 'none'], eq[0]); });
}

{
  const T = byAngles(['A', 'B', 'C'], [40, 75, 65]);
  const longest = sideOrder(T, ['A', 'B', 'C'])[2];
  Q('m07', mk.mcq({ stem: r`In $\triangle ABC$, $\angle A = 40^\circ$, $\angle B = 75^\circ$ and $\angle C = 65^\circ$. The longest side is`, opts: [r`$AC$`, r`$AB$`, r`$BC$`, 'cannot be decided'], key: 'a', sol: r`The longest side is opposite the largest angle. The largest angle is $\angle B = 75^\circ$, and the side opposite $B$ is $AC$. $AB$ is opposite $65^\circ$ and $BC$ is opposite $40^\circ$.`, d: 1, c: 'understanding', t: [3], time: 60 }), (C) => { C.assert(ang(T, 'A', 'B', 'C') === 40 && ang(T, 'B', 'A', 'C') === 75, 'givens'); C.which(['AC', 'AB', 'BC', '?'], norm(longest)); });
}

{
  const sets = [[7, 9, 15], [6, 8, 15], [5, 5, 10], [4, 9, 14]];
  Q('m08', mk.mcq({ stem: 'Which set of lengths, in centimetres, can be the sides of a triangle?', opts: ['$7$, $9$, $15$', '$6$, $8$, $15$', '$5$, $5$, $10$', '$4$, $9$, $14$'], key: 'a', sol: r`The two smaller lengths must add up to more than the largest. $7 + 9 = 16 > 15$ works. $6 + 8 = 14 < 15$, $5 + 5 = 10$ equals $10$ (the sides would lie flat) and $4 + 9 = 13 < 14$ all fail.`, d: 2, c: 'application', t: [3], time: 75 }), (C) => { A([r`7 + 9 = 16`, r`6 + 8 = 14`, r`5 + 5 = 10`, r`4 + 9 = 13`]).verify(C); C.which(sets.map((s) => canForm(...s)), true); });
}

{
  const P = [2, 7], pts = [[-4, 0], [0, 0], [2, 0], [5, 0], [9, 0]];
  const ds = pts.map((p) => dist(P, p)), shortest = Math.min(...ds);
  Q('m09', mk.mcq({ stem: 'Of all the segments joining a point to a given straight line, the shortest is', opts: ['the perpendicular from the point to the line', 'the segment that makes an angle of $45^\\circ$ with the line', 'the segment to the mid-point of any chord', 'none, since all of them are equal'], key: 'a', sol: r`In the right-angled triangle formed with the perpendicular, the right angle is the largest angle, so the opposite side (the slanting segment) is the longest. The perpendicular is therefore the shortest.`, d: 1, c: 'recall', t: [4], time: 45 }), (C) => { C.assert(near(shortest, dist(P, foot(P, [0, 0], [1, 0]))) && ds.filter((d) => near(d, shortest)).length === 1, 'sample: the foot of the perpendicular is strictly nearest'); C.key('a'); });
}

{
  const opts = [11, 12, 12.5, 15];
  Q('m10', mk.mcq({ stem: 'A water tap $P$ is $12$ cm from a straight pipe $l$ in a scale drawing. A thread runs from $P$ to a point $Q$ of the pipe. The length of the thread $PQ$ cannot be', opts: ['$11$ cm', '$12$ cm', '$12.5$ cm', '$15$ cm'], key: 'a', sol: r`The perpendicular is the shortest segment from $P$ to the pipe and measures $12$ cm, so every thread has length at least $12$ cm. A length of $11$ cm is impossible; $12$ cm is the perpendicular, and $12.5$ cm and $15$ cm reach points of the pipe at a slant.`, d: 2, c: 'application', t: [4], time: 75 }), (C) => { C.assert(opts.every((v) => (v >= 12) === (Math.sqrt(Math.max(0, v * v - 144)) >= 0 && v >= 12)), 'a point of l at distance v exists exactly when v >= 12'); C.which(opts.map((v) => v < 12), true); });
}

{
  Q('m11', mk.mcq({ stem: r`Two triangular shelf brackets $ABC$ and $DEF$ have $\angle A = \angle D$, $\angle B = \angle E$ and $BC = EF$. Which congruence condition shows that the brackets are congruent?`, opts: ['AAS', 'ASA', 'SAS', 'RHS'], key: 'a', sol: r`The equal side $BC$ is opposite $\angle A$ and does not join the vertices $A$ and $B$ of the equal angles, so it is not between them: AAS. ASA would need the side $AB$, SAS needs two sides, and no right angle is given.`, d: 2, c: 'understanding', t: [1], time: 60 }), (C) => { C.which([criterion(['A', 'B', 'C'], ['<A', '<B', 'BC']), 'ASA', 'SAS', 'RHS'], 'AAS'); });
}

{
  const K = { A: [0, 6], B: [-5, 0], C: [0, -2], D: [5, 0] };
  congruent(K, ['A', 'B', 'C'], ['A', 'D', 'C'], 'kite');
  const claimTrue = [near(ang(K, 'B', 'A', 'C'), ang(K, 'D', 'A', 'C')), near(ang(K, 'A', 'B', 'D'), ang(K, 'C', 'B', 'D')), near(ang(K, 'B', 'A', 'C'), ang(K, 'A', 'B', 'D')), near(ang(K, 'C', 'A', 'B'), ang(K, 'A', 'C', 'B'))];
  Q('m12', mk.mcq({ stem: r`A kite-shaped frame $ABCD$ has $AB = AD$ and $CB = CD$, and the bar $AC$ is added. Which pair of angles does the congruence of $\triangle ABC$ and $\triangle ADC$ show to be equal?`, opts: [r`$\angle ABC = \angle ADC$`, r`$\angle BAD = \angle BCD$`, r`$\angle ABC = \angle BAD$`, r`$\angle ACB = \angle CAB$`], key: 'a', sol: r`$\triangle ABC \cong \triangle ADC$ by SSS ($AB = AD$, $CB = CD$, $AC$ common), with $A \leftrightarrow A$, $B \leftrightarrow D$, $C \leftrightarrow C$. The angles at $B$ and $D$ correspond, so $\angle ABC = \angle ADC$. The angles at $A$ and $C$ of the whole kite need not be equal, and $\angle ACB$ and $\angle CAB$ are not corresponding parts.`, d: 3, c: 'application', t: [1], time: 90 }), (C) => { C.assert(claimTrue.filter(Boolean).length === 1, 'exactly one of the four equalities holds on the kite'); C.which(claimTrue, true); });
}

{
  // SSA: AB = 7, AC = 5, angle B = 40; two triangles
  const c40 = Math.cos((40 * Math.PI) / 180), disc = Math.sqrt(49 * c40 * c40 - 24);
  const ts = [7 * c40 - disc, 7 * c40 + disc];
  const tri = ts.map((t) => ({ B: [0, 0], A: [7, 0], C: polar(t, 40) }));
  const ok = tri.every((T) => near(dist(T.A, T.C), 5) && near(ang(T, 'B', 'A', 'C'), 40) && near(dist(T.A, T.B), 7));
  Q('m13', mk.mcq({ stem: r`Ritu claims $\triangle ABC \cong \triangle DEF$ because $AB = DE = 7$ cm, $AC = DF = 5$ cm and $\angle B = \angle E = 40^\circ$. Her reasoning is wrong because`, opts: ['the equal angle is not between the two equal sides, so SAS does not apply', 'two sides are never enough to decide a triangle', 'an angle of $40^\\circ$ is too small to be used', 'a pair of equal sides must be shorter than $7$ cm'], key: 'a', sol: r`The angle $\angle B$ lies between $AB$ and $BC$, not between $AB$ and $AC$. So the given parts are two sides and a non-included angle (SSA), which is not a test: a triangle with $AB = 7$ cm, $AC = 5$ cm and $\angle B = 40^\circ$ can be drawn in two different ways.`, d: 3, c: 'analysis', t: [1], time: 100 }), (C) => { C.assert(ok && ts.every((t) => t > 0) && !near(ts[0], ts[1]), 'two different triangles satisfy the three equal parts'); C.assert(criterion(['A', 'B', 'C'], ['AB', 'AC', '<B']) === null, 'SSA is not a test'); C.key('a'); });
}

{
  const x = 12;
  const iT = iso(180 - 2 * (3 * x + 4), 5);
  Q('m14', mk.mcq({ stem: r`In $\triangle XYZ$, $XY = XZ$, $\angle Y = (3a + 4)^\circ$ and $\angle Z = (5a - 20)^\circ$. The value of $a$ is`, opts: ['$12$', '$24$', '$16$', '$8$'], key: 'a', sol: r`$XY = XZ$, so $\angle Y = \angle Z$ and $3a + 4 = 5a - 20$, which gives $2a = 24$, $a = 12$. Then both angles are $40^\circ$. Option (b) comes from adding the two angles and equating the sum to $180^\circ$ by mistake.`, d: 2, c: 'application', t: [2], time: 90 }), (C) => { W(eqctx('a', [12]), [r`3a + 4 = 5a - 20 \Rightarrow 24 = 2a \Rightarrow a = 12`, r`3 \times 12 + 4 = 40`, r`5 \times 12 - 20 = 40`]).verify(C); C.assert(ang(iT, 'B', 'A', 'C') === 40 && ang(iT, 'C', 'A', 'B') === 40, 'both base angles measure 40'); C.which([12, 24, 16, 8], x); });
}

{
  const T = iso(128, 5);
  Q('m15', mk.mcq({ stem: r`The gable of a hill-station cottage is an isosceles triangle whose apex angle is $128^\circ$. Each base angle is`, opts: [r`$26^\circ$`, r`$52^\circ$`, r`$64^\circ$`, r`$128^\circ$`], key: 'a', sol: r`The base angles are equal and the three angles add up to $180^\circ$: $\dfrac{180^\circ - 128^\circ}{2} = 26^\circ$. Option (b) is $180^\circ - 128^\circ$, (c) halves the apex angle and (d) repeats it.`, d: 2, c: 'application', t: [2], time: 75 }), (C) => { A([r`\dfrac{180^\circ - 128^\circ}{2} = 26^\circ`]).verify(C); C.assert(ang(T, 'A', 'B', 'C') === 128, 'apex 128'); C.which([26, 52, 64, 128], ang(T, 'B', 'A', 'C')); });
}

{
  const T = bySides(['P', 'Q', 'R'], [8, 11, 9]); // PQ = 8, QR = 11, RP = 9
  const largest = angleOrder(T, ['P', 'Q', 'R'])[2];
  Q('m16', mk.mcq({ stem: r`In $\triangle PQR$, $PQ = 8$ cm, $QR = 11$ cm and $PR = 9$ cm. Which angle is the largest?`, opts: [r`$\angle P$`, r`$\angle Q$`, r`$\angle R$`, 'all three are equal'], key: 'a', sol: r`The largest angle is opposite the longest side. The longest side is $QR = 11$ cm and it is opposite $P$, so $\angle P$ is the largest. $\angle R$ is opposite $PQ = 8$ cm, the shortest side.`, d: 2, c: 'understanding', t: [3], time: 60 }), (C) => { C.assert(len(T, 'P', 'Q') === 8 && len(T, 'Q', 'R') === 11 && len(T, 'R', 'P') === 9, 'sides'); C.which(['P', 'Q', 'R', '?'], largest); });
}

{
  const cand = [150, 30, 160, 20];
  Q('m17', mk.mcq({ stem: 'Two sides of a triangular plot measure $6.5$ m and $9.5$ m. The third side, in metres, can be', opts: ['$15$', '$3$', '$16$', '$2$'], key: 'a', sol: r`The third side $c$ must satisfy $9.5 - 6.5 < c < 9.5 + 6.5$, that is $3 < c < 16$. So $15$ is possible. $3$ and $16$ are the end values, where the plot would collapse to a line, and $2$ is too short.`, d: 3, c: 'application', t: [3], time: 90 }), (C) => { A([r`9.5 - 6.5 = 3`, r`9.5 + 6.5 = 16`]).verify(C); C.which(cand.map((x) => canForm(65, 95, x)), true); });
}

{
  const T = byAngles(['A', 'B', 'C'], [75, 45, 60]);
  const longest = sideOrder(T, ['A', 'B', 'C'])[2];
  Q('m18', mk.mcq({ stem: r`The angles of $\triangle ABC$ are in the ratio $\angle A : \angle B : \angle C = 5 : 3 : 4$. The longest side is`, opts: [r`$BC$`, r`$AB$`, r`$AC$`, 'all three sides are equal'], key: 'a', sol: r`The angles are $5k$, $3k$, $4k$ with $12k = 180^\circ$, so $k = 15^\circ$ and the angles are $75^\circ$, $45^\circ$, $60^\circ$. The largest angle is $\angle A$, and the side opposite it, $BC$, is the longest.`, d: 3, c: 'application', t: [3], time: 100 }), (C) => { W(eqctx('k', [15]), [r`5k + 3k + 4k = 180 \Rightarrow 12k = 180 \Rightarrow k = 15`, r`5 \times 15 = 75`, r`3 \times 15 = 45`, r`4 \times 15 = 60`]).verify(C); C.assert(ang(T, 'A', 'B', 'C') === 75 && ang(T, 'B', 'A', 'C') === 45, 'angles 75, 45, 60'); C.which(['BC', 'AB', 'AC', '?'], norm(longest)); });
}

{
  const d = [7.3, 6.4, 8.1, 6.9]; // PA, PB, PC, PD
  const foots = 'ABCD'[d.indexOf(Math.min(...d))];
  Q('m19', mk.mcq({ stem: r`A street lamp $P$ stands beside a straight wall. Its distances to four marked points $A$, $B$, $C$, $D$ of the wall are $PA = 7.3$ m, $PB = 6.4$ m, $PC = 8.1$ m and $PD = 6.9$ m, and the foot of the perpendicular from $P$ to the wall is one of these four points. The foot is`, opts: ['$B$', '$A$', '$C$', '$D$'], key: 'a', sol: r`The perpendicular is the shortest segment from $P$ to the wall, so the foot is the marked point nearest to $P$. The least of $7.3$, $6.4$, $8.1$, $6.9$ is $6.4$ m, which is $PB$, so the foot is $B$.`, d: 3, c: 'application', t: [4], time: 75 }), (C) => { C.which(['B', 'A', 'C', 'D'], foots); });
}

{
  // sample triangles: AD perpendicular to line BC always shorter than AB and AC
  const samples = [[[0, 5], [-3, 0], [4, 0]], [[1, 4], [-2, 0], [6, 0]], [[7, 3], [0, 0], [4, 0]], [[-5, 2], [0, 0], [3, 0]], [[2, 6], [-1, 0], [1, 0]]];
  const rows = samples.map(([Ap, Bp, Cp]) => { const D = foot(Ap, Bp, Cp); return { ad: dist(Ap, D), ab: dist(Ap, Bp), ac: dist(Ap, Cp), bd: dist(Bp, D) }; });
  const a = rows.every((x) => x.ad < x.ab && x.ad < x.ac), b = rows.every((x) => x.ad < x.bd), c = rows.every((x) => near(x.ad, (x.ab + x.ac) / 2)), d = rows.every((x) => x.ad > Math.min(x.ab, x.ac));
  Q('m20', mk.mcq({ stem: r`In $\triangle ABC$, $AD$ is drawn perpendicular to the line $BC$ from $A$ to the point $D$ of that line. Which statement is true for every such triangle?`, opts: [r`$AD < AB$ and $AD < AC$`, r`$AD < BD$`, r`$AD = \dfrac{AB + AC}{2}$`, r`$AD$ is longer than the shorter of $AB$ and $AC$`], key: 'a', sol: r`The perpendicular from a point to a line is the shortest segment from the point to the line, so $AD$ is shorter than $AB$ and $AC$ (even when $D$ lies outside the segment $BC$). Option (b) fails when $D$ is close to $B$, (c) fails because the perpendicular is shorter than both, and (d) says the opposite of the shortest-distance property.`, d: 4, c: 'analysis', t: [4], time: 120 }), (C) => { C.assert(a && !b && !c && !d, 'over five sample triangles: AD < AB, AC always; the other three statements fail'); C.which([a, b, c, d], true); });
}

Q('m21', mk.mcq({ stem: 'In any triangle, the side opposite the smallest angle is', opts: ['the shortest side', 'the longest side', 'equal to the longest side', 'the side joining the two larger angles'], key: 'a', sol: r`The greater side is opposite the greater angle, so the smallest angle faces the shortest side. The longest side faces the largest angle.`, d: 1, c: 'recall', t: [3], time: 45 }), (C) => { const T = byAngles(['A', 'B', 'C'], [35, 60, 85]); C.assert(sideOrder(T, ['A', 'B', 'C'])[0] === 'BC' && angleOrder(T, ['A', 'B', 'C'])[0] === 'A', 'smallest angle A faces the shortest side BC'); C.key('a'); });

// =============================================================== assertion-reason
{
  const T = iso(50, 6);
  Q('ar1', mk.ar({ a: r`In an isosceles triangle, the two angles at the base are equal.`, r: r`Angles opposite equal sides of a triangle are equal.`, key: 'c', sol: r`Both statements are true. The base angles of an isosceles triangle are the angles opposite its two equal sides, so (R) is exactly the reason for (A). The correct option is (c).`, d: 1, c: 'understanding', t: [2] }), (C) => { C.assert(near(ang(T, 'B', 'A', 'C'), ang(T, 'C', 'A', 'B')) && near(dist(T.A, T.B), dist(T.A, T.C)), 'equal sides, equal base angles'); C.key('c'); });
}
Q('ar2', mk.ar({ a: r`The lengths $4$ cm, $5$ cm and $9$ cm cannot be the sides of a triangle.`, r: r`The sum of two sides of a triangle is always less than the third side.`, key: 'a', sol: r`(A) is true: $4 + 5 = 9$, which is not more than $9$, so the sides would lie flat. (R) is false: the sum of two sides is always **greater** than the third side, as in a triangle with sides $3$, $4$, $5$ where $3 + 4 > 5$. The correct option is (a).`, d: 2, c: 'analysis', t: [3] }), (C) => { C.assert(!canForm(4, 5, 9) && canForm(3, 4, 5) && 3 + 4 > 5, '(A) true; (R) false by a counter-example'); C.key('a'); });
{
  const s1 = { A: [0, 3], B: [0, 0], C: [4, 0] }, s2 = { P: [0, 6], Q: [0, 0], R: [8, 0] };
  const WN = { ...s1, ...s2 };
  Q('ar3', mk.ar({ a: r`Two triangles with all three angles equal are always congruent.`, r: r`Two triangles with two sides and the included angle equal are congruent.`, key: 'b', sol: r`(A) is false: a triangle with sides $3$, $4$, $5$ and one with sides $6$, $8$, $10$ have the same angles but are not congruent. (R) is true: it is the SAS test. The correct option is (b).`, d: 2, c: 'analysis', t: [1] }), (C) => { C.assert(notCongruent(WN, ['A', 'B', 'C'], ['P', 'Q', 'R']) && near(ang(WN, 'A', 'B', 'C'), ang(WN, 'P', 'Q', 'R')) && near(ang(WN, 'C', 'A', 'B'), ang(WN, 'R', 'P', 'Q')), '(A) false: equal angles, different sizes'); C.assert(criterion(['A', 'B', 'C'], ['AB', 'AC', '<A']) === 'SAS', '(R) true'); C.key('b'); });
}
{
  const T = byAngles(['A', 'B', 'C'], [50, 60, 70]);
  Q('ar4', mk.ar({ a: r`In a triangle with angles $50^\circ$, $60^\circ$ and $70^\circ$, the longest side is opposite the $70^\circ$ angle.`, r: r`If three sides of one triangle equal three sides of another, the triangles are congruent.`, key: 'd', sol: r`(A) is true: the greater side is opposite the greater angle. (R) is also true, it is the SSS test, but it says nothing about which side is longest, so it is not the reason for (A). The correct option is (d).`, d: 2, c: 'understanding', t: [1, 3] }), (C) => { C.assert(sideOrder(T, ['A', 'B', 'C'])[2] === 'AB' && ang(T, 'C', 'A', 'B') === 70, '(A) true: the 70 degree angle at C faces AB, the longest side'); C.assert(criterion(['A', 'B', 'C'], ['AB', 'BC', 'CA']) === 'SSS', '(R) true, unrelated'); C.key('d'); });
}
{
  const P = [0, 9], M = [0, 0], A1 = [4, 0];
  Q('ar5', mk.ar({ a: r`If $PM \perp l$, then $PM < PA$ for every other point $A$ of the line $l$.`, r: r`In the right-angled triangle $PMA$ the angle at $M$ is the largest angle, so the side $PA$ opposite it is the largest side.`, key: 'c', sol: r`Both statements are true. The right angle at $M$ is the largest angle of $\triangle PMA$ because the other two angles are acute, so $PA > PM$. That is precisely why the perpendicular is the shortest segment, so (R) explains (A). The correct option is (c).`, d: 3, c: 'analysis', t: [3, 4] }), (C) => { C.assert(ang({ P, M, A: A1 }, 'M', 'P', 'A') === 90 && dist(P, A1) > dist(P, M), 'right angle at M; PA > PM'); C.key('c'); });
}

// =============================================================== true-false
Q('tf1', mk.tf({ stem: 'Two triangles whose three angles are equal in pairs are always congruent.', key: 'f', sol: r`False. Equal angles give triangles of the same shape, but not necessarily the same size: sides $3$, $4$, $5$ and $6$, $8$, $10$ give equal angles without congruence.`, d: 1, c: 'understanding', t: [1], time: 45 }), (C) => { C.assert(criterion(['A', 'B', 'C'], ['<A', '<B', '<C']) === null, 'AAA is not a test'); C.key('f'); });
Q('tf2', mk.tf({ stem: r`In $\triangle ABC$ and $\triangle PQR$, $AB = PQ = 8$ cm, $BC = QR = 5$ cm and $\angle A = \angle P = 30^\circ$. The triangles must be congruent.`, key: 'f', sol: r`False. The angle $\angle A$ is not between the sides $AB$ and $BC$ (it is opposite $BC$), so the given parts are SSA, which is not a test.`, d: 3, c: 'analysis', t: [1], time: 60 }), (C) => { C.assert(criterion(['A', 'B', 'C'], ['AB', 'BC', '<A']) === null, 'SSA'); C.key('f'); });
Q('tf3', mk.tf({ stem: r`A triangle in which two angles are equal is isosceles.`, key: 't', sol: r`True. By the converse of the isosceles theorem, the sides opposite the two equal angles are equal, so the triangle has two equal sides.`, d: 1, c: 'understanding', t: [2], time: 45 }), (C) => { const T = byAngles(['A', 'B', 'C'], [65, 65, 50]); C.assert(near(len(T, 'A', 'C'), len(T, 'B', 'C')), 'equal angles at A and B: equal sides CA and CB'); C.key('t'); });
Q('tf4', mk.tf({ stem: r`A triangle can have sides $8$ cm, $8$ cm and $16$ cm.`, key: 'f', sol: r`False. $8 + 8 = 16$, which is not more than $16$, so the sides lie along one straight line.`, d: 2, c: 'understanding', t: [3], time: 45 }), (C) => { C.assert(!canForm(8, 8, 16), '8 + 8 is not more than 16'); C.key('f'); });
Q('tf5', mk.tf({ stem: r`Of all the segments from a point to a line, only one is the shortest.`, key: 't', sol: r`True. The shortest segment is the perpendicular, and there is exactly one perpendicular from a point to a line. Every other segment is longer.`, d: 2, c: 'understanding', t: [4], time: 45 }), (C) => { const P = [1, 5], ds = [-3, -1, 1, 2, 6].map((x) => dist(P, [x, 0])); C.assert(ds.filter((d) => near(d, Math.min(...ds))).length === 1 && near(Math.min(...ds), 5), 'a unique shortest distance, 5'); C.key('t'); });
{
  const T = byAngles(['A', 'B', 'C'], [100, 45, 35]);
  Q('tf6', mk.tf({ stem: r`In $\triangle ABC$ with $\angle A = 100^\circ$, the side $BC$ is the shortest side.`, key: 'f', sol: r`False. $\angle A = 100^\circ$ is the largest angle, so the side opposite it, $BC$, is the longest side.`, d: 2, c: 'understanding', t: [3], time: 45 }), (C) => { C.assert(sideOrder(T, ['A', 'B', 'C'])[2] === 'BC', 'BC is the longest'); C.key('f'); });
}

// =============================================================== fill in the blanks
Q('fb1', mk.fill({ stem: r`If $\triangle PQR \cong \triangle XYZ$, the side $PQ$ corresponds to the side ____ .`, acc: [['XY', 'YX']], sol: r`The letters are in matching order: $P \leftrightarrow X$ and $Q \leftrightarrow Y$, so $PQ$ corresponds to $XY$.`, d: 1, c: 'recall', t: [1], time: 45 }), (C) => { const names = ['P', 'Q', 'R'], to = ['X', 'Y', 'Z']; C.blank(['P', 'Q'].map((n) => to[names.indexOf(n)]).join('')); });
Q('fb2', mk.fill({ stem: r`The apex angle of an isosceles triangular signboard is $84^\circ$, so each base angle is ____ degrees.`, acc: [['48']], sol: r`The base angles are equal: $\dfrac{180^\circ - 84^\circ}{2} = 48^\circ$.`, d: 1, c: 'understanding', t: [2], time: 45 }), (C) => { A([r`\dfrac{180^\circ - 84^\circ}{2} = 48^\circ`]).verify(C); const T = iso(84, 4); C.blank(ang(T, 'B', 'A', 'C')); });
Q('fb3', mk.fill({ stem: r`Two sides of a triangle are $6$ cm and $11$ cm. The third side is greater than ____ cm and less than ____ cm.`, acc: [['5'], ['17']], scheme: [['both limits correct (5 and 17)', 1]], sol: r`The third side $c$ satisfies $11 - 6 < c < 11 + 6$, so it is greater than $5$ cm and less than $17$ cm.`, d: 2, c: 'understanding', t: [3], time: 60 }), (C) => { A([r`11 - 6 = 5`, r`11 + 6 = 17`]).verify(C); const xs = []; for (let x = 1; x < 30; x++) if (canForm(6, 11, x)) xs.push(x); C.blank(Math.min(...xs) - 1, 0); C.blank(Math.max(...xs) + 1, 1); });
Q('fb4', mk.fill({ stem: r`The distance of a point from a straight line is the length of the ____ from the point to the line.`, acc: [['perpendicular']], sol: r`The perpendicular is the shortest segment from the point to the line, and its length is the distance.`, d: 1, c: 'recall', t: [4], time: 30 }), (C) => { C.blank('perpendicular'); });
Q('fb5', mk.fill({ stem: r`In the RHS test, the letter R stands for a ____ angle.`, acc: [['right', 'right-angle', 'right angle']], sol: r`RHS means Right angle, Hypotenuse, Side: the triangles each have a right angle.`, d: 1, c: 'recall', t: [1], time: 30 }), (C) => { C.blank('right'); });

// =============================================================== numerical
{
  const x = 18, T = iso(4 * x - 10, 5);
  Q('n1', mk.num({ stem: r`In $\triangle ABC$, $AB = AC$, $\angle A = (4x - 10)^\circ$ and $\angle B = (3x + 5)^\circ$. Find $x$.`, value: 18, unit: null, scheme: [['sum of angles gives 4x - 10 + 2(3x + 5) = 180', 1]], sol: r`$AB = AC$, so $\angle B = \angle C$ and the angle sum gives $4x - 10 + 2(3x + 5) = 180$, so $10x = 180$ and $x = 18$. Check: $\angle A = 62^\circ$, $\angle B = \angle C = 59^\circ$ and $62 + 59 + 59 = 180$.`, d: 3, c: 'application', t: [2], time: 90 }), (C) => { W(eqctx('x', [18]), [r`4x - 10 + 2(3x + 5) = 180 \Rightarrow 10x = 180 \Rightarrow x = 18`, r`4 \times 18 - 10 = 62`, r`3 \times 18 + 5 = 59`, r`62 + 59 + 59 = 180`]).verify(C); C.assert(ang(T, 'A', 'B', 'C') === 62 && ang(T, 'B', 'A', 'C') === 59, 'figure: 62, 59, 59'); C.val(x); });
}
{
  const T = iso(56, 5), E = add(T.B, [T.B[0] - T.C[0], T.B[1] - T.C[1]]);
  const W2 = { ...T, E };
  Q('n2', mk.num({ stem: r`In $\triangle PQR$, $PQ = PR$. The side $RQ$ is produced beyond $Q$ to a point $S$ and the exterior angle $\angle PQS = 118^\circ$. Find $\angle QPR$ in degrees.`, value: 56, unit: 'degrees', marks: 2, scheme: [['angle PQR = 180 - 118 = 62 and angle PRQ = 62', 1], ['angle QPR = 180 - 62 - 62 = 56', 1]], sol: r`$\angle PQR = 180^\circ - 118^\circ = 62^\circ$ (angles on a straight line). $PQ = PR$ gives $\angle PRQ = \angle PQR = 62^\circ$, so $\angle QPR = 180^\circ - 62^\circ - 62^\circ = 56^\circ$.`, d: 3, c: 'application', t: [2], time: 100 }), (C) => { A([r`180^\circ - 118^\circ = 62^\circ`, r`180^\circ - 62^\circ - 62^\circ = 56^\circ`]).verify(C); C.assert(ang(W2, 'B', 'A', 'E') === 118, 'the exterior angle measures 118'); C.val(ang(T, 'A', 'B', 'C')); });
}
{
  const count = []; for (let x = 1; x < 40; x++) if (canForm(8, 13, x)) count.push(x);
  Q('n3', mk.num({ stem: r`Two sides of a triangular garden bed are $8$ m and $13$ m, and the third side is a whole number of metres. How many different third sides are possible?`, value: 15, unit: null, marks: 2, scheme: [['limits 5 < c < 21', 1], ['whole numbers 6 to 20: 15 values', 1]], sol: r`The third side $c$ satisfies $13 - 8 < c < 13 + 8$, so $5 < c < 21$. The whole numbers from $6$ to $20$ give $20 - 6 + 1 = 15$ possible values.`, d: 3, c: 'application', t: [3], time: 100 }), (C) => { A([r`13 - 8 = 5`, r`13 + 8 = 21`, r`20 - 6 + 1 = 15`]).verify(C); C.assert(count[0] === 6 && count[count.length - 1] === 20, 'values from 6 to 20'); C.val(count.length); });
}
{
  const ks = []; for (let k = 0; k < 30; k++) if (canForm(5, 9, 2 * k + 1)) ks.push(k);
  Q('n4', mk.num({ stem: r`The sides of a triangle are $5$ cm, $9$ cm and $(2k + 1)$ cm, with $k$ a whole number. Find the greatest possible value of $k$.`, value: 6, unit: null, scheme: [['2k + 1 < 14 gives k < 6.5 so k = 6', 1]], sol: r`The third side must be less than $5 + 9 = 14$, so $2k + 1 < 14$ and $k < 6.5$. The greatest whole number is $k = 6$, giving a side of $13$ cm (and $5 + 9 > 13$ holds).`, d: 3, c: 'application', t: [3], time: 90 }), (C) => { A([r`5 + 9 = 14`, r`2 \times 6 + 1 = 13`]).verify(C); C.val(Math.max(...ks)); });
}
Q('n5', mk.num({ stem: r`$\triangle ABC \cong \triangle DEF$ with $AB = 9.5$ cm, $BC = 11.5$ cm and perimeter of $\triangle ABC$ equal to $34.5$ cm. Find the length $DF$ in cm.`, value: 13.5, unit: 'cm', scheme: [['AC = 34.5 - 9.5 - 11.5 = 13.5 and DF = AC', 1]], sol: r`$AC = 34.5 - 9.5 - 11.5 = 13.5$ cm. In the congruence $A \leftrightarrow D$, $C \leftrightarrow F$, so $DF = AC = 13.5$ cm.`, d: 2, c: 'understanding', t: [1], time: 75 }), (C) => { A([r`345 - 95 - 115 = 135`]).verify(C); C.val((345 - 95 - 115) / 10); });
{
  const O = [0, 0], Ap = polar(6, 150), Bp = polar(6, 330), Cp = polar(5, 35), Dp = polar(5, 215);
  must(near(dist(Ap, Cp), dist(Bp, Dp)), 'AC = BD');
  Q('n6', mk.num({ stem: r`Two bamboo poles $AB$ of $12$ m and $CD$ of $10$ m cross at $O$, the mid-point of both, so that $\angle AOC = 115^\circ$. The ends are joined by ropes $AC$ and $BD$. Find the length of the rope $BD$, to two decimal places.`, value: 9.29, tol: 0.01, unit: 'm', marks: 2, scheme: [['triangles AOC and BOD congruent by SAS, so BD = AC', 1], ['AC squared = 36 + 25 - 60 cos 115 gives 9.29 m', 1]], sol: r`$OA = OB = 6$ m, $OC = OD = 5$ m and $\angle AOC = \angle BOD = 115^\circ$ (vertically opposite), so $\triangle AOC \cong \triangle BOD$ by SAS and $BD = AC$. By the cosine rule $AC^2 = 6^2 + 5^2 - 2 \times 6 \times 5 \cos 115^\circ = 61 + 25.36 = 86.36$, so $AC = 9.29$ m (to two decimal places).`, d: 4, c: 'application', t: [1], time: 150 }), (C) => { C.assert(near(dist(Bp, Dp), Math.sqrt(36 + 25 - 60 * Math.cos((115 * Math.PI) / 180))) && ang({ O, A: Ap, C: Cp }, 'O', 'A', 'C') === 115, 'figure: BD from the coordinates'); C.assert(r2(dist(Bp, Dp)) === 9.29, '9.29 m'); C.val(dist(Bp, Dp), 0.01); });
}
Q('n7', mk.num({ stem: r`A point $P$ is $d$ cm from a straight line $l$, where $d$ is a whole number. Three points of $l$ are at distances $12.4$ cm, $9.7$ cm and $10.3$ cm from $P$. Find the greatest possible value of $d$.`, value: 9, unit: 'cm', scheme: [['d is at most every distance, so d <= 9.7', 1]], sol: r`The perpendicular distance $d$ is the shortest of all distances from $P$ to $l$, so $d \le 9.7$. The greatest whole number is $9$.`, d: 3, c: 'application', t: [4], time: 90 }), (C) => { const ds = [12.4, 9.7, 10.3]; C.val(Math.floor(Math.min(...ds))); });
