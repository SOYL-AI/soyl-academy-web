// CBSE 9 Mathematics ch11 Circles: written items (short 2 and 3 marks, long 5 marks, case-based). Every number is recomputed from
// coordinates on a circle or by solving the stated equation by search; proofs are marked by their scheme and each proof also carries a
// numerical spot-check computed from coordinates.
import { Q, caseQ, child, mk } from './lib.mjs';
import { r, close, range, dist, polar, angleAt, lineDist, circumcentre, mid } from './h.mjs';
import { cycPts, O, fProof1, fEqual, fPerp, fCyc, fSemi, fSameSeg, fCentreRim } from './figs.mjs';

const half = (rr, d) => Math.sqrt(rr * rr - d * d);

// =============================================================== short answer, 2 marks
Q('s201', mk.short({ marks: 2, stem: 'Define a chord and a sector of a circle. How is a diameter different from other chords?', model: r`A **chord** is a line segment joining two points of a circle. A **sector** is the region between two radii and the arc they cut off.\n\nA diameter is a chord that passes through the centre. It is the longest chord, and its length is $2r$.`, sol: 'Chord: joins two points of the circle. Sector: two radii and an arc. Diameter: a chord through the centre.', scheme: [['Defines a chord and a sector', 1], ['A diameter passes through the centre and is the longest chord', 1]], d: 1, c: 'understanding', t: [1], time: 90 }), null, 'definitions: marked by the scheme');
Q('s202', mk.short({ marks: 2, stem: 'A broken piece of a circular clay plate shows only a part of its rim. Describe how you can find the centre of the plate from this piece, and explain why the method works.', model: r`Mark three points $A$, $B$, $C$ on the rim, not in one line, and join $AB$ and $BC$. Draw the perpendicular bisector of each chord. The two bisectors meet at a point $O$.\n\nThe perpendicular bisector of every chord passes through the centre, so $O$ is the centre of the plate. Equivalently, $O$ is equally far from $A$, $B$ and $C$.`, sol: 'Draw two chords and their perpendicular bisectors; they meet at the centre.', scheme: [['Two chords and their perpendicular bisectors meet at O', 1], ['Reason: the perpendicular bisector of a chord passes through the centre', 1]], d: 2, c: 'understanding', t: [1], time: 90 }), null, 'construction of the centre: marked by the scheme');
{
  const rr = 6.5, d = Math.sqrt(rr * rr - 36);
  Q('s203', mk.short({ marks: 2, stem: r`A circular glass paperweight has radius $6.5$ cm. A straight scratch along a chord is $12$ cm long. Find how far the scratch is from the centre of the paperweight.`, model: r`The perpendicular from the centre bisects the chord, so half the chord is $6$ cm.\n\n$d^2 = 6.5^2 - 6^2 = 42.25 - 36 = 6.25$, so $d = 2.5$ cm.`, sol: 'Half the chord, then Pythagoras.', scheme: [['Half the chord = 6 cm', 0.5], ['d squared = 6.5 squared - 6 squared = 6.25', 1], ['d = 2.5 cm', 0.5]], d: 2, c: 'application', t: [2], time: 90 }), (Cx) => {
    Cx.assert(close(d, 2.5) && close(dist(O, [-6, -d]), rr) && close(dist([-6, -d], [6, -d]), 12), 'chord 12 in radius 6.5 is 2.5 away');
    Cx.model([6, 42.25, 6.25, 2.5]);
  });
}
{
  const A = polar(O, 5, 20), B = polar(O, 5, 84), C = polar(O, 5, 160), D = polar(O, 5, 224);
  Q('s204', mk.short({ marks: 2, stem: r`$AB$ and $CD$ are equal chords of a circle with centre $O$, and $\angle AOB = 64^\circ$. Find $\angle COD$ and $\angle OAB$.`, model: r`Equal chords subtend equal angles at the centre, so $\angle COD = \angle AOB = 64^\circ$.\n\nIn triangle $OAB$, $OA = OB$, so $\angle OAB = \angle OBA = \dfrac{180^\circ - 64^\circ}{2} = 58^\circ$.`, sol: 'Equal chords, equal central angles; then the isosceles triangle OAB.', scheme: [['COD = 64 degrees', 1], ['OAB = (180 - 64) / 2 = 58 degrees', 1]], d: 2, c: 'application', t: [2], time: 90 }), (Cx) => {
    Cx.assert(close(dist(A, B), dist(C, D)) && close(angleAt(O, A, B), 64) && close(angleAt(O, C, D), 64) && close(angleAt(A, O, B), 58), 'COD = 64, OAB = 58');
    Cx.model([64, 58, 180]);
  });
}
Q('s205', mk.short({ marks: 2, stem: 'State the converse of the theorem "Equal chords of a circle subtend equal angles at the centre". Is it true? Give a reason.', model: r`**Converse:** If two chords of a circle subtend equal angles at the centre, the chords are equal.\n\nIt is true: the two triangles formed by each chord and the two radii have two equal sides (radii) and the equal included angles, so they are congruent (SAS) and the chords are equal.`, sol: 'Swap the given and the conclusion; use congruence of the triangles with the radii.', scheme: [['Converse stated correctly', 1], ['True, because the triangles are congruent (two radii and the included angle)', 1]], d: 2, c: 'understanding', t: [2], time: 90 }), (Cx) => {
  const A = polar(O, 5, 10), B = polar(O, 5, 75), C = polar(O, 5, 150), D = polar(O, 5, 215);
  Cx.assert(close(angleAt(O, A, B), angleAt(O, C, D)) && close(dist(A, B), dist(C, D)), 'equal central angles give equal chords');
  Cx.model(['SAS', 'radii']);
});
{
  const A = polar(O, 5, 230), B = polar(O, 5, 314), P = polar(O, 5, 80), R = polar(O, 5, 270);
  Q('s206', mk.short({ marks: 2, stem: r`An arc $AB$ of a circle subtends $84^\circ$ at the centre. Find the angle that the chord $AB$ makes at a point on the major arc and at a point on the minor arc.`, model: r`On the major arc, the angle is half the angle at the centre: $\dfrac{84^\circ}{2} = 42^\circ$.\n\nOn the minor arc, the angle is $180^\circ - 42^\circ = 138^\circ$, because the four points make a cyclic quadrilateral whose opposite angles add up to $180^\circ$.`, sol: 'Half the central angle, then the supplement for the minor arc.', scheme: [['Major arc: 84 / 2 = 42 degrees', 1], ['Minor arc: 180 - 42 = 138 degrees', 1]], d: 3, c: 'analysis', t: [3], time: 105 }), (Cx) => {
    Cx.assert(close(angleAt(O, A, B), 84) && close(angleAt(P, A, B), 42) && close(angleAt(R, A, B), 138), '42 on the major arc, 138 on the minor arc');
    Cx.model([84, 42, 138, 180]);
  });
}
{
  Q('s207', mk.short({ marks: 2, stem: r`A quadrilateral $ABCD$ has $\angle A = 95^\circ$, $\angle B = 80^\circ$, $\angle C = 85^\circ$ and $\angle D = 100^\circ$. Can all four corners lie on a circle? Give a reason.`, model: r`Yes. The opposite angles add up to $180^\circ$: $\angle A + \angle C = 95^\circ + 85^\circ = 180^\circ$ and $\angle B + \angle D = 80^\circ + 100^\circ = 180^\circ$.\n\nBy the converse of the cyclic quadrilateral theorem, the quadrilateral is cyclic.`, sol: 'Check both pairs of opposite angles.', scheme: [['Both pairs of opposite angles add up to 180 degrees', 1], ['Concludes: yes, by the converse theorem', 1]], d: 2, c: 'application', t: [3], time: 90 }), (Cx) => {
    const p = cycPts([100, 100, 90, 70], 0);
    Cx.assert(95 + 85 === 180 && 80 + 100 === 180 && close(p.angA, 95) && close(p.angB, 80) && close(p.angC, 85) && close(p.angD, 100), 'the angles 95, 80, 85, 100 occur on a circle');
    Cx.model([95, 85, 80, 100, 180]);
  });
}

// =============================================================== short answer, 3 marks
{
  const A = polar(O, 5, 20), B = polar(O, 5, 90), C = polar(O, 5, 200), D = polar(O, 5, 270);
  Q('s301', mk.short({ marks: 3, stem: r`Prove that equal chords of a circle subtend equal angles at the centre. Check it for the chords $AB$ and $CD$ of the figure, each subtending $70^\circ$.`, model: r`Let $AB = CD$ be chords of a circle with centre $O$. In triangles $AOB$ and $COD$: $OA = OC$ (radii), $OB = OD$ (radii) and $AB = CD$ (given).\n\nSo $\triangle AOB \cong \triangle COD$ (SSS), and therefore $\angle AOB = \angle COD$ (corresponding parts).\n\nCheck: in the figure both angles measure $70^\circ$.`, sol: 'SSS congruence of the two triangles with the centre.', scheme: [['Two pairs of radii equal and the chords equal', 1], ['Congruent by SSS', 1], ['Equal angles at the centre; the check with 70 degrees', 1]], d: 3, c: 'analysis', t: [2], time: 150, assets: [fEqual] }), (Cx) => {
    Cx.assert(close(dist(A, B), dist(C, D)) && close(angleAt(O, A, B), 70) && close(angleAt(O, C, D), 70), 'equal chords, both 70 at the centre');
    Cx.model([70, 'SSS']);
  });
}
{
  Q('s302', mk.short({ marks: 3, stem: r`Prove that the perpendicular from the centre of a circle to a chord bisects the chord. In the figure check it for $AM$ and $MB$.`, model: r`Let $OM \perp AB$, where $O$ is the centre. Join $OA$ and $OB$. In the right triangles $OMA$ and $OMB$: $OA = OB$ (radii), $OM = OM$ (common) and $\angle OMA = \angle OMB = 90^\circ$.\n\nSo $\triangle OMA \cong \triangle OMB$ (RHS) and $AM = MB$.\n\nCheck: in the figure $AM = MB = 4$ cm.`, sol: 'RHS congruence of the two right triangles.', scheme: [['Right triangles with equal hypotenuses OA = OB and the common side OM', 1], ['Congruent by RHS', 1], ['AM = MB; check 4 cm each', 1]], d: 3, c: 'analysis', t: [2], time: 150, assets: [fPerp] }), (Cx) => {
    const A = [-4, -3], B = [4, -3], M = [0, -3];
    Cx.assert(close(dist(O, A), dist(O, B)) && close(angleAt(M, O, B), 90) && close(dist(A, M), 4) && close(dist(M, B), 4), 'AM = MB = 4');
    Cx.model([4, 'RHS']);
  });
}
{
  Q('s303', mk.short({ marks: 3, stem: r`Prove that equal chords of a circle are equidistant from the centre. Check it for two chords of $8$ cm in a circle of radius $5$ cm.`, model: r`Let $AB = CD$ be chords of a circle with centre $O$, and let $OM \perp AB$ and $ON \perp CD$. The perpendicular from the centre bisects a chord, so $AM = \dfrac{1}{2}AB = \dfrac{1}{2}CD = CN$.\n\nIn the right triangles $OMA$ and $ONC$: $OA = OC$ (radii), $AM = CN$ and the angles at $M$ and $N$ are $90^\circ$. So the triangles are congruent (RHS) and $OM = ON$.\n\nCheck: each half-chord is $4$ cm, so each distance is $\sqrt{5^2 - 4^2} = 3$ cm.`, sol: 'Half the chords are equal; the right triangles are congruent.', scheme: [['The perpendiculars bisect the chords, so AM = CN', 1], ['Right triangles OMA and ONC are congruent (RHS), so OM = ON', 1], ['Check: both distances are 3 cm', 1]], d: 3, c: 'analysis', t: [2], time: 150 }), (Cx) => {
    const d = half(5, 4), N = polar(O, 3, 30), u = [-0.5, Math.sqrt(3) / 2], C = [N[0] + 4 * u[0], N[1] + 4 * u[1]], D = [N[0] - 4 * u[0], N[1] - 4 * u[1]];
    Cx.assert(close(d, 3) && close(lineDist(O, [-4, -3], [4, -3]), 3) && close(dist(C, D), 8) && close(dist(O, C), 5) && close(lineDist(O, C, D), 3), 'both chords of 8 cm are 3 cm from the centre');
    Cx.model([4, 3, 'RHS']);
  });
}
{
  const A = polar(O, 5, 190), B = polar(O, 5, 340), Pt = polar(O, 5, 100);
  Q('s304', mk.short({ marks: 3, stem: r`$P$ is a point on the major arc $AB$ of a circle with centre $O$, and $O$ lies inside $\angle APB$. The line $PO$ is extended to meet the circle at $Q$. Show that $\angle AOQ = 2 \angle OPA$. Hence find $\angle AOB$ when $\angle OPA = 40^\circ$ and $\angle OPB = 25^\circ$.`, model: r`$OP = OA$ (radii), so $\angle OAP = \angle OPA$. $\angle AOQ$ is an exterior angle of triangle $AOP$, so $\angle AOQ = \angle OPA + \angle OAP = 2\angle OPA$.\n\nIn the same way $\angle BOQ = 2\angle OPB$. Adding, $\angle AOB = 2\angle OPA + 2\angle OPB = 2 \times 40^\circ + 2 \times 25^\circ = 80^\circ + 50^\circ = 130^\circ$.`, sol: 'Exterior angle of the isosceles triangle AOP, twice, then add.', scheme: [['OP = OA gives equal base angles', 1], ['Exterior angle: angle AOQ = 2 angle OPA; the same for angle BOQ', 1], ['AOB = 2 x 40 + 2 x 25 = 130 degrees', 1]], d: 3, c: 'analysis', t: [3], time: 150, assets: [fProof1] }), (Cx) => {
    const Q1 = polar(O, 5, 280);
    Cx.assert(close(angleAt(O, A, Q1), 2 * angleAt(Pt, O, A)) && close(angleAt(O, B, Q1), 2 * angleAt(Pt, O, B)) && close(angleAt(O, A, B), 2 * angleAt(Pt, A, B)) && 2 * 40 + 2 * 25 === 130, 'exterior angle theorem and the sum 130');
    Cx.model([80, 50, 130]);
  });
}
{
  const xs = range(1, 60).filter((x) => 3 * x + 5 + 5 * x - 25 === 180), ys = range(1, 60).filter((y) => 2 * y + 15 + 4 * y - 15 === 180);
  Q('s305', mk.short({ marks: 3, stem: r`$ABCD$ is a cyclic quadrilateral with $\angle A = (3x + 5)^\circ$, $\angle C = (5x - 25)^\circ$, $\angle B = (2y + 15)^\circ$ and $\angle D = (4y - 15)^\circ$. Find $x$, $y$ and the four angles.`, model: r`Opposite angles add up to $180^\circ$. $(3x + 5) + (5x - 25) = 180$ gives $8x = 200$, so $x = 25$, $\angle A = 80^\circ$ and $\angle C = 100^\circ$.\n\n$(2y + 15) + (4y - 15) = 180$ gives $6y = 180$, so $y = 30$, $\angle B = 75^\circ$ and $\angle D = 105^\circ$.`, sol: 'Two equations from the two pairs of opposite angles.', scheme: [['A + C = 180: x = 25, angles 80 and 100', 1.5], ['B + D = 180: y = 30, angles 75 and 105', 1.5]], d: 3, c: 'application', t: [3], time: 150 }), (Cx) => {
    Cx.assert(xs.join() === '25' && ys.join() === '30' && 3 * 25 + 5 === 80 && 5 * 25 - 25 === 100 && 2 * 30 + 15 === 75 && 4 * 30 - 15 === 105, 'x = 25, y = 30');
    Cx.model([25, 30, 80, 100, 75, 105]);
  });
}

// =============================================================== long answer, 5 marks
{
  const rr = 34, len = 60, d = half(rr, len / 2);
  Q('l01', mk.long({ stem: r`(a) Prove that the perpendicular from the centre of a circle to a chord bisects the chord. (b) State the converse. (c) Prove the converse: the line from the centre to the mid-point of a chord is perpendicular to the chord. (d) A circular fountain has radius $34$ m and a footbridge along a chord $60$ m long. How far is the bridge from the centre of the fountain?`, model: r`**(a)** Let $OM \perp AB$. In right triangles $OMA$ and $OMB$: $OA = OB$ (radii), $OM$ is common and the angles at $M$ are $90^\circ$. So they are congruent (RHS) and $AM = MB$.\n\n**(b)** The line joining the centre to the mid-point of a chord is perpendicular to the chord.\n\n**(c)** Let $M$ be the mid-point of $AB$. In triangles $OMA$ and $OMB$: $OA = OB$, $AM = MB$ and $OM$ is common, so they are congruent (SSS). Then $\angle OMA = \angle OMB$, and since they form a linear pair they add up to $180^\circ$, so each is $90^\circ$: $OM \perp AB$.\n\n**(d)** Half the bridge is $30$ m. The distance is $\sqrt{34^2 - 30^2} = \sqrt{1156 - 900} = \sqrt{256} = 16$ m.`, sol: 'RHS for the theorem, SSS for the converse, then Pythagoras.', scheme: [['(a) RHS congruence, AM = MB', 1.5], ['(b) the converse stated', 0.5], ['(c) SSS congruence and the linear pair give 90 degrees', 1.5], ['(d) half chord 30 and the distance 16 m', 1.5]], d: 3, c: 'application', t: [2], time: 420 }), (Cx) => {
    Cx.assert(d === 16 && close(dist(O, [-30, -16]), rr) && close(dist([-30, -16], [30, -16]), len) && close(lineDist(O, [-30, -16], [30, -16]), 16), 'chord 60 in radius 34 is 16 from the centre');
    Cx.model([30, 1156, 900, 256, 16]);
  });
}
{
  const A = polar(O, 5, 195), B = polar(O, 5, 335), P = polar(O, 5, 95), Q1 = polar(O, 5, 275);
  Q('l02', mk.long({ stem: r`$A$ and $B$ are points of a circle with centre $O$, and $P$ is a point on the major arc $AB$ such that $O$ lies inside $\angle APB$. The line $PO$ is extended to meet the circle at $Q$. (a) Why is $\angle OAP = \angle OPA$? (b) Show that $\angle AOQ = 2\angle OPA$. (c) In the same way, write $\angle BOQ$ in terms of $\angle OPB$. (d) Prove that $\angle AOB = 2\angle APB$. (e) Check with $\angle OPA = 36^\circ$ and $\angle OPB = 29^\circ$.`, model: r`**(a)** $OA = OP$ (radii), so the angles opposite them in triangle $OAP$ are equal: $\angle OAP = \angle OPA$.\n\n**(b)** $\angle AOQ$ is an exterior angle of triangle $OAP$, so $\angle AOQ = \angle OAP + \angle OPA = 2\angle OPA$.\n\n**(c)** In the same way $\angle BOQ = 2\angle OPB$.\n\n**(d)** $\angle AOB = \angle AOQ + \angle BOQ = 2\angle OPA + 2\angle OPB = 2(\angle OPA + \angle OPB) = 2\angle APB$.\n\n**(e)** $\angle APB = 36^\circ + 29^\circ = 65^\circ$ and $\angle AOB = 2 \times 65^\circ = 130^\circ$.`, sol: 'Exterior angles of two isosceles triangles, then add.', scheme: [['(a) OA = OP gives equal angles', 0.5], ['(b) exterior angle: AOQ = 2 OPA', 1.5], ['(c) BOQ = 2 OPB', 0.5], ['(d) adding gives AOB = 2 APB', 1.5], ['(e) 65 and 130 degrees', 1]], d: 3, c: 'analysis', t: [3], time: 420, assets: [fProof1] }), (Cx) => {
    Cx.assert(close(angleAt(O, A, Q1), 2 * angleAt(P, O, A)) && close(angleAt(O, B, Q1), 2 * angleAt(P, O, B)) && close(angleAt(O, A, B), 2 * angleAt(P, A, B)) && 36 + 29 === 65 && 2 * 65 === 130, 'twice at the centre; 65 and 130');
    Cx.model([36, 29, 65, 130]);
  });
}
{
  const Ab = [-5, 0], Bb = [5, 0], Pp = polar(O, 5, 62), A2 = polar(O, 5, 235), B2 = polar(O, 5, 315), P1 = polar(O, 5, 70), P2 = polar(O, 5, 150);
  Q('l03', mk.long({ stem: r`(a) State the angle in a semicircle and prove it using the theorem that the angle at the centre is double the angle at the circumference. (b) Prove that angles in the same segment of a circle are equal. (c) $AB$ is a diameter of a circular rangoli and $P$ is a point on its edge with $\angle PAB = 34^\circ$. Find $\angle ABP$. (d) The chord $CD$ subtends $80^\circ$ at the centre. Two lamps $L$ and $M$ stand on the same major arc $CD$. Find $\angle CLD$ and $\angle CMD$.`, model: r`**(a)** The angle in a semicircle is a right angle. For the diameter $AB$ the angle at the centre is the straight angle $\angle AOB = 180^\circ$, so for $P$ on the circle $\angle APB = \dfrac{1}{2} \times 180^\circ = 90^\circ$.\n\n**(b)** Let $P$ and $Q$ be in the same segment on the chord $AB$. Each of $\angle APB$ and $\angle AQB$ is half of the angle $\angle AOB$ at the centre on the same arc. So $\angle APB = \dfrac{1}{2}\angle AOB = \angle AQB$.\n\n**(c)** $\angle APB = 90^\circ$ and $\angle PAB = 34^\circ$, so $\angle ABP = 180^\circ - 90^\circ - 34^\circ = 56^\circ$.\n\n**(d)** The angle at the circumference is half of the angle at the centre: $\angle CLD = \dfrac{80^\circ}{2} = 40^\circ$. $L$ and $M$ are in the same segment, so $\angle CMD = 40^\circ$.`, sol: 'Half of the angle at the centre, each time.', scheme: [['(a) 180 at the centre, so 90', 1.5], ['(b) both are half of the angle at the centre', 1.5], ['(c) 56 degrees', 1], ['(d) 40 and 40 degrees', 1]], d: 3, c: 'application', t: [3], time: 420, assets: [fSemi, fSameSeg] }), (Cx) => {
    const Pe = polar(O, 5, 68);
    Cx.assert(close(angleAt(Pp, Ab, Bb), 90) && close(angleAt(Ab, Pe, Bb), 34) && close(angleAt(Bb, Pe, Ab), 56) && close(angleAt(O, A2, B2), 80) && close(angleAt(P1, A2, B2), 40) && close(angleAt(P2, A2, B2), 40), 'semicircle 90, 34 and 56, same segment 40');
    Cx.model([180, 90, 34, 56, 80, 40]);
  });
}
{
  const q = cycPts([76, 108, 104, 72], 10), B = q.B, C = q.C, D = q.D;
  const E = [C[0] + 0.5 * (C[0] - B[0]), C[1] + 0.5 * (C[1] - B[1])];
  Q('l04', mk.long({ stem: r`$ABCD$ is a quadrilateral with all four corners on a circle with centre $O$. (a) Join $OB$ and $OD$. If the arc $BCD$ (not containing $A$) subtends the angle $x$ at $O$, write $\angle A$ in terms of $x$. (b) Write $\angle C$ in terms of $x$. (c) Prove that $\angle A + \angle C = 180^\circ$. (d) The side $BC$ is produced to $E$. Show that $\angle DCE = \angle A$. (e) If $\angle A = 84^\circ$, find $\angle C$ and $\angle DCE$.`, model: r`**(a)** $\angle A$ stands on the arc $BCD$, so $\angle A = \dfrac{x}{2}$.\n\n**(b)** $\angle C$ stands on the other arc $BAD$, which subtends the reflex angle $360^\circ - x$ at $O$, so $\angle C = \dfrac{360^\circ - x}{2}$.\n\n**(c)** $\angle A + \angle C = \dfrac{x}{2} + \dfrac{360^\circ - x}{2} = 180^\circ$.\n\n**(d)** $\angle DCE + \angle BCD = 180^\circ$ (linear pair) and $\angle A + \angle BCD = 180^\circ$ (part (c)). So $\angle DCE = \angle A$.\n\n**(e)** $\angle C = 180^\circ - 84^\circ = 96^\circ$ and $\angle DCE = \angle A = 84^\circ$.`, sol: 'Half of x and half of the reflex angle; then a linear pair.', scheme: [['(a) A = x / 2', 1], ['(b) C = (360 - x) / 2', 1], ['(c) sum 180 degrees', 1], ['(d) exterior angle equals the opposite interior angle', 1], ['(e) 96 and 84 degrees', 1]], d: 4, c: 'analysis', t: [3], time: 420, assets: [fCyc] }), (Cx) => {
    const z = cycPts([100, 96, 72, 92], 10), Ez = [z.C[0] + 0.5 * (z.C[0] - z.B[0]), z.C[1] + 0.5 * (z.C[1] - z.B[1])];
    Cx.assert(close(q.angA + q.angC, 180) && close(angleAt(C, D, E), q.angA) && close(z.angA, 84) && close(z.angC, 96) && close(angleAt(z.C, z.D, Ez), 84), 'A + C = 180; exterior angle = A; 96 and 84');
    Cx.model([360, 180, 96, 84]);
  });
}
{
  const A = [0, 0], B = [8, 0], C = [2, 6], c = circumcentre(A, B, C), rr = dist(c, A);
  Q('l05', mk.long({ stem: r`Three lamp posts $A$, $B$, $C$ in a village square stand at the grid points $A(0, 0)$, $B(8, 0)$ and $C(2, 6)$ (in metres). A fountain is to be built at the centre of the circle through the three posts. (a) Why is there exactly one such circle? (b) Find the perpendicular bisector of $AB$. (c) Find the perpendicular bisector of $AC$. (d) Find the centre $O$. (e) Find $OA^2$ and show that $O$ is equally far from $C$.`, model: r`**(a)** The centre must lie on the perpendicular bisectors of $AB$ and $AC$. These two lines are not parallel (the points are not in one line), so they meet at exactly one point, and the radius is then fixed. So there is one circle.\n\n**(b)** The mid-point of $AB$ is $(4, 0)$ and $AB$ is along the $x$-axis, so the bisector is the line $x = 4$.\n\n**(c)** The mid-point of $AC$ is $(1, 3)$. A point $(x, y)$ on the bisector satisfies $x^2 + y^2 = (x - 2)^2 + (y - 6)^2$, that is $0 = -4x - 12y + 40$, so $x + 3y = 10$.\n\n**(d)** Put $x = 4$: $3y = 6$, so $y = 2$. The centre is $O(4, 2)$.\n\n**(e)** $OA^2 = 4^2 + 2^2 = 20$ and $OC^2 = (4 - 2)^2 + (2 - 6)^2 = 4 + 16 = 20$. So $OA = OC = OB = \sqrt{20}$ m, about $4.47$ m.`, sol: 'Two perpendicular bisectors meet at the centre.', scheme: [['(a) the bisectors meet at one point', 1], ['(b) x = 4', 1], ['(c) x + 3y = 10', 1], ['(d) centre (4, 2)', 1], ['(e) OA squared = OC squared = 20', 1]], d: 3, c: 'application', t: [1], time: 420 }), (Cx) => {
    Cx.assert(close(c[0], 4) && close(c[1], 2) && close(rr * rr, 20) && close(dist(c, B), rr) && close(dist(c, C), rr) && close(Math.sqrt(20), 4.4721, 1e-3), 'circumcentre (4, 2), radius squared 20');
    const m = mid(A, C);
    Cx.assert(close(m[0], 1) && close(m[1], 3) && close(1 + 3 * 3, 10) && close(4 + 3 * 2, 10), 'bisector of AC passes through (1, 3) and (4, 2): x + 3y = 10');
    Cx.model([4, 10, 2, 20, 4.47]);
  });
}

// =============================================================== case-based
{
  const A = [0, 0], B = [6, 0], C = [8, 4], c = circumcentre(A, B, C), D = [-2, 4];
  caseQ('c01', {
    passage: r`A potter in Khurja draws a plan of a circular plate on a grid, in centimetres. Three points on the rim of the plate are $A(0, 0)$, $B(6, 0)$ and $C(8, 4)$. The potter wants to find the centre $O$ of the plate.`,
    d: 3, c: 'application',
    model: r`(a) Option (a). (b) $4$. (c) (i) $5$ cm. Or (ii) Yes.`,
    sol: r`(a) $O$ lies on the perpendicular bisector of $AB$, which is the line $x = 3$. (b) The bisector of $AC$ is $2x + y = 10$; with $x = 3$ this gives $y = 4$, so $O(3, 4)$. (c) (i) $OA = \sqrt{3^2 + 4^2} = 5$ cm, and $OC = \sqrt{5^2 + 0^2} = 5$ cm. (ii) $OD = \sqrt{(-2 - 3)^2 + (4 - 4)^2} = 5$ cm, which equals the radius, so $D$ lies on the circle.`,
    children: [
      child('a', mk.mcq({ stem: r`The centre $O$ lies on the perpendicular bisector of $AB$. This is the line`, opts: [r`$x = 3$`, r`$y = 3$`, r`$x = 6$`, r`$y = 0$`], key: 'a', sol: r`$A(0, 0)$ and $B(6, 0)$ are on the $x$-axis, and the mid-point of $AB$ is $(3, 0)$. The perpendicular bisector is the vertical line through it, $x = 3$.`, d: 2, c: 'application', t: [1], time: 75 })),
      child('b', mk.num({ stem: 'The perpendicular bisector of $AC$ is the line $2x + y = 10$. Find the $y$-coordinate of the centre $O$.', value: 4, sol: r`The centre is on both bisectors, so put $x = 3$ in $2x + y = 10$: $6 + y = 10$, so $y = 4$. The centre is $O(3, 4)$.`, scheme: [['Substitute x = 3', 0.5], ['4', 0.5]], d: 2, c: 'application', t: [1], time: 75 })),
      child('c', mk.short({ marks: 2, stem: r`**(i)** Find the radius of the plate and show that $C$ is on the circle.`, model: r`$OA = \sqrt{(3 - 0)^2 + (4 - 0)^2} = \sqrt{9 + 16} = 5$ cm. $OC = \sqrt{(8 - 3)^2 + (4 - 4)^2} = \sqrt{25} = 5$ cm. Since $OC = OA$, $C$ is on the circle.`, sol: 'Distance from O to A and to C.', scheme: [['OA = 5 cm', 1], ['OC = 5 cm = OA', 1]], d: 3, c: 'application', t: [1], time: 105 }), [
        mk.short({ marks: 2, stem: r`**(ii)** The potter also marks a point $D(-2, 4)$. Is $D$ on the rim of the plate? Give a reason.`, model: r`$OD = \sqrt{(-2 - 3)^2 + (4 - 4)^2} = \sqrt{25} = 5$ cm, which is equal to the radius. So $D$ is on the rim: yes.`, sol: 'Compare OD with the radius.', scheme: [['OD = 5 cm', 1], ['Equal to the radius: yes', 1]], d: 3, c: 'application', t: [1], time: 105 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which(['x = 3', 'y = 3', 'x = 6', 'y = 0'], `x = ${mid(A, B)[0]}`);
    Cx.child('b').val(c[1]);
    Cx.child('c').assert(close(c[0], 3) && close(dist(c, A), 5) && close(dist(c, C), 5), 'O (3, 4), radius 5');
    Cx.child('c').model([5, 25, 9, 16]);
    Cx.child('cii').assert(close(dist(c, D), 5), 'D on the circle');
    Cx.child('cii').model([5, 25]);
  });
}
{
  const A = polar(O, 6, 250), B = polar(O, 6, 326), P = polar(O, 6, 70), R = polar(O, 6, 110), S = polar(O, 6, 288);
  caseQ('c02', {
    passage: r`A circular plaza in Surat has a centre $O$. Two entry gates are at $A$ and $B$ on its edge, and the angle $\angle APB$ seen from a security camera $P$ on the longer part of the edge is $38^\circ$. A second camera $R$ stands on the same longer part of the edge, and a third camera $S$ stands on the shorter part of the edge between $A$ and $B$.`,
    d: 3, c: 'analysis',
    model: r`(a) Option (a). (b) $38$. (c) (i) $142^\circ$. Or (ii) $52^\circ$.`,
    sol: r`(a) The angle at the centre is double the angle at the edge: $2 \times 38 = 76^\circ$. (b) $R$ and $P$ are in the same segment, so $\angle ARB = 38^\circ$. (c) (i) The quadrilateral $APBS$ is cyclic, so $\angle ASB = 180^\circ - 38^\circ = 142^\circ$. (ii) $OA = OB$, so $\angle OAB = \dfrac{180^\circ - 76^\circ}{2} = 52^\circ$.`,
    children: [
      child('a', mk.mcq({ stem: r`The angle $\angle AOB$ at the centre is`, opts: [r`$76^\circ$`, r`$38^\circ$`, r`$19^\circ$`, r`$142^\circ$`], key: 'a', sol: r`The angle at the centre is double the angle at any point of the remaining part of the circle, so $\angle AOB = 2 \times 38^\circ = 76^\circ$. The value $19^\circ$ is half of $38^\circ$.`, d: 2, c: 'application', t: [3], time: 75 })),
      child('b', mk.num({ stem: r`Find $\angle ARB$, in degrees.`, value: 38, sol: r`$R$ and $P$ are on the same part of the circle, that is, in the same segment on the chord $AB$. Angles in the same segment are equal, so $\angle ARB = \angle APB = 38^\circ$.`, scheme: [['Same segment', 0.5], ['38', 0.5]], d: 2, c: 'understanding', t: [3], time: 60 })),
      child('c', mk.short({ marks: 2, stem: r`**(i)** Find $\angle ASB$ seen from the camera $S$ on the shorter part of the edge.`, model: r`The points $A$, $P$, $B$, $S$ lie on the circle, so $APBS$ is a cyclic quadrilateral. Its opposite angles at $P$ and $S$ add up to $180^\circ$, so $\angle ASB = 180^\circ - 38^\circ = 142^\circ$.`, sol: 'Cyclic quadrilateral: opposite angles are supplementary.', scheme: [['The quadrilateral APBS is cyclic', 1], ['180 - 38 = 142 degrees', 1]], d: 3, c: 'analysis', t: [3], time: 105 }), [
        mk.short({ marks: 2, stem: r`**(ii)** Find $\angle OAB$.`, model: r`$\angle AOB = 76^\circ$ and $OA = OB$ (radii), so $\angle OAB = \angle OBA$. Then $\angle OAB = \dfrac{180^\circ - 76^\circ}{2} = 52^\circ$.`, sol: 'Isosceles triangle OAB with the apex angle 76 degrees.', scheme: [['OA = OB, so the base angles are equal', 1], ['(180 - 76) / 2 = 52 degrees', 1]], d: 3, c: 'analysis', t: [3], time: 105 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which([Math.round(angleAt(O, A, B)), 38, 19, 142], 76);
    Cx.child('b').val(angleAt(R, A, B));
    Cx.child('c').assert(close(angleAt(P, A, B), 38) && close(angleAt(S, A, B), 142), '142');
    Cx.child('c').model([180, 38, 142]);
    Cx.child('cii').assert(close(angleAt(A, O, B), 52), '52');
    Cx.child('cii').model([76, 52, 180]);
  });
}
{
  const xs = range(1, 60).filter((x) => 8 * x === 180 || 3 * x + 6 + 5 * x - 6 === 180);
  const q = cycPts([108, 60, 87, 105], 20); // A = (60 + 87) / 2 = 73.5, B = (87 + 105) / 2 = 96, C = (105 + 108) / 2 = 106.5, D = (108 + 60) / 2 = 84
  caseQ('c03', {
    passage: r`A glass artist in Firozabad cuts a mosaic tile $ABCD$ so that all four corners lie on a circle. The tile has $\angle A = (3x + 6)^\circ$ and $\angle C = (5x - 6)^\circ$, where $x$ is a number. The angle $\angle B$ is $96^\circ$.`,
    d: 3, c: 'application',
    model: r`(a) Option (a). (b) $22.5$. (c) (i) $84^\circ$. Or (ii) $96^\circ$.`,
    sol: r`(a) The opposite angles of a cyclic quadrilateral add up to $180^\circ$. (b) $(3x + 6) + (5x - 6) = 180$, so $8x = 180$ and $x = 22.5$. (c) (i) $\angle D = 180^\circ - 96^\circ = 84^\circ$. (ii) The side $AB$ is produced to $E$, and the exterior angle $\angle CBE = 180^\circ - 96^\circ = 84^\circ$ (linear pair); it equals the opposite angle $\angle ADC = 84^\circ$.`,
    children: [
      child('a', mk.mcq({ stem: r`Which equation does $x$ satisfy?`, opts: [r`$(3x + 6) + (5x - 6) = 180$`, r`$(3x + 6) = (5x - 6)$`, r`$(3x + 6) + (5x - 6) = 360$`, r`$(3x + 6) + (5x - 6) = 90$`], key: 'a', sol: r`$A$ and $C$ are opposite angles of a cyclic quadrilateral, so they add up to $180^\circ$: $(3x + 6) + (5x - 6) = 180$.`, d: 2, c: 'understanding', t: [3], time: 75 })),
      child('b', mk.num({ stem: r`Find the value of $x$.`, value: 22.5, sol: r`$(3x + 6) + (5x - 6) = 180$ gives $8x = 180$, so $x = 22.5$. Then $\angle A = 3 \times 22.5 + 6 = 73.5^\circ$ and $\angle C = 5 \times 22.5 - 6 = 106.5^\circ$.`, scheme: [['8x = 180', 0.5], ['22.5', 0.5]], d: 2, c: 'application', t: [3], time: 75 })),
      child('c', mk.short({ marks: 2, stem: r`**(i)** Find $\angle D$.`, model: r`$\angle B$ and $\angle D$ are opposite angles of a cyclic quadrilateral, so $\angle D = 180^\circ - 96^\circ = 84^\circ$.`, sol: 'Opposite angles are supplementary.', scheme: [['B + D = 180', 1], ['D = 84 degrees', 1]], d: 2, c: 'application', t: [3], time: 90 }), [
        mk.short({ marks: 2, stem: r`**(ii)** The side $AB$ is produced to a point $E$. Find the exterior angle $\angle CBE$ and name the interior angle it equals.`, model: r`$\angle CBE = 180^\circ - \angle ABC = 180^\circ - 96^\circ = 84^\circ$ (linear pair). It is equal to the interior opposite angle $\angle ADC = 84^\circ$.`, sol: 'Linear pair at B; the exterior angle equals the opposite interior angle.', scheme: [['Linear pair: 180 - 96 = 84 degrees', 1], ['It equals the opposite angle ADC', 1]], d: 3, c: 'application', t: [3], time: 105 }),
      ]),
    ],
  }, (Cx) => {
    Cx.assert(close(q.angA, 73.5) && close(q.angC, 106.5) && close(q.angA + q.angC, 180), 'A + C = 180 with A = 73.5, C = 106.5');
    Cx.child('a').which(['sum 180', 'equal', 'sum 360', 'sum 90'], close(q.angA + q.angC, 180) ? 'sum 180' : 'none');
    Cx.child('b').val(180 / 8);
    Cx.child('c').assert(close(q.angB, 96) && close(q.angD, 84), 'D = 84');
    Cx.child('c').model([180, 96, 84]);
    const E = [q.B[0] + (q.B[0] - q.A[0]), q.B[1] + (q.B[1] - q.A[1])];
    Cx.child('cii').assert(close(angleAt(q.B, q.C, E), 84) && close(q.angD, 84), 'exterior angle 84');
    Cx.child('cii').model([180, 96, 84]);
  });
}
{
  const rr = 53, dAB = Math.sqrt(rr * rr - 28 * 28), dCD = Math.sqrt(rr * rr - 45 * 45);
  caseQ('c04', {
    passage: r`A circular lake in a Pune park has radius $53$ m and centre $O$. A straight footbridge $AB$ is $56$ m long, and a second straight footbridge $CD$ is $90$ m long. Each bridge is a chord of the lake's circular boundary.`,
    d: 3, c: 'analysis',
    model: r`(a) Option (a). (b) $45$. (c) (i) $28$ m. Or (ii) $17$ m.`,
    sol: r`(a) The longer chord is nearer the centre, so $CD$ is nearer. (b) Half of $AB$ is $28$ m, so $d^2 = 53^2 - 28^2 = 2809 - 784 = 2025$ and $d = 45$ m. (c) (i) Half of $CD$ is $45$ m, so $d^2 = 53^2 - 45^2 = 2809 - 2025 = 784$ and $d = 28$ m. (ii) The difference is $45 - 28 = 17$ m.`,
    children: [
      child('a', mk.mcq({ stem: 'Which bridge is nearer to the centre $O$ of the lake?', opts: ['$CD$, because it is the longer chord', '$AB$, because it is the shorter chord', 'They are equally near', 'It cannot be decided'], key: 'a', sol: 'The nearer a chord is to the centre, the longer it is. $CD$ is longer than $AB$, so $CD$ is nearer to the centre.', d: 2, c: 'understanding', t: [2], time: 75 })),
      child('b', mk.num({ stem: r`Find the distance of the bridge $AB$ from the centre $O$, in metres.`, value: 45, sol: r`The perpendicular from $O$ bisects $AB$, so half the bridge is $28$ m. Then $d^2 = 53^2 - 28^2 = 2809 - 784 = 2025$ and $d = 45$ m.`, scheme: [['Half of AB is 28 m: d squared = 53 squared - 28 squared', 0.5], ['45', 0.5]], d: 2, c: 'application', t: [2], time: 90 })),
      child('c', mk.short({ marks: 2, stem: r`**(i)** Find the distance of the bridge $CD$ from the centre $O$.`, model: r`Half of $CD$ is $45$ m, so $d^2 = 53^2 - 45^2 = 2809 - 2025 = 784$ and $d = 28$ m.`, sol: 'Half the chord, then Pythagoras.', scheme: [['Half of CD = 45 m: d squared = 784', 1], ['d = 28 m', 1]], d: 3, c: 'application', t: [2], time: 105 }), [
        mk.short({ marks: 2, stem: r`**(ii)** The bridges are parallel and on opposite sides of $O$. Find the distance between them.`, model: r`$AB$ is $45$ m from $O$ on one side and $CD$ is $28$ m from $O$ on the other side, so the distance between the bridges is $45 + 28 = 73$ m.`, sol: 'Add the two distances.', scheme: [['The distances are 45 m and 28 m', 1], ['45 + 28 = 73 m', 1]], d: 3, c: 'application', t: [2], time: 105 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which([true, false, false, false], 90 > 56);
    Cx.child('b').val(dAB);
    Cx.child('c').assert(close(dCD, 28) && close(dist(O, [-45, -28]), rr), 'CD at 28');
    Cx.child('c').model([45, 784, 28]);
    Cx.child('cii').assert(close(dAB + dCD, 73), '73');
    Cx.child('cii').model([45, 28, 73]);
  });
}
