// CBSE 9 Mathematics ch09 Triangles – Congruence Theorems: written items (short 2 and 3 marks, long 5 marks, case-based).
// Lengths and angles are recomputed from coordinates built from the givens; proofs carry a numerical spot-check on a drawn example,
// and each step of the model answer is marked by the scheme.
import { Q, caseQ, child, mk } from './lib.mjs';
import { r, close, range, dist, angleAt, polar, fig } from './h.mjs';
import { criterion, ssaSides, triASA, triSSS, foot, midpoint, sameParts, flip } from './g.mjs';
import { fIsoProof } from './figs.mjs';

const iso = [[3, 4], [0, 0], [6, 0]];
const pt = (at, label_position) => ({ at, ...(label_position ? { label_position } : {}) });

// ---- figures used only by the questions
const lerp = (P, Qp, t) => [P[0] + t * (Qp[0] - P[0]), P[1] + t * (Qp[1] - P[1])];
const dD = lerp(iso[1], iso[0], 2 / 5), dE = lerp(iso[2], iso[0], 2 / 5);
export const figBDCE = fig({
  points: { A: pt(iso[0], 'n'), B: pt(iso[1], 'sw'), C: pt(iso[2], 'se'), D: pt(dD, 'w'), E: pt(dE, 'e') },
  segments: [{ from: 'A', to: 'B', label: '5 cm' }, { from: 'A', to: 'C', label: '5 cm' }, { from: 'B', to: 'C' }, { from: 'B', to: 'D', ticks: 2 }, { from: 'C', to: 'E', ticks: 2 }, { from: 'D', to: 'C', dashed: true }, { from: 'E', to: 'B', dashed: true }],
}, 'An isosceles triangle ABC with AB and AC both 5 centimetres. The point D is on AB and the point E is on AC with BD and CE both 2 centimetres, marked with two ticks. The dashed lines DC and EB join D to C and E to B.', 'AB = AC, BD = CE: show that DC = EB.');
const mid = midpoint(iso[1], iso[2]), eF = foot(mid, iso[1], iso[0]), eG = foot(mid, iso[2], iso[0]);
export const figDEDF = fig({
  points: { A: pt(iso[0], 'n'), B: pt(iso[1], 'sw'), C: pt(iso[2], 'se'), D: pt(mid, 's'), E: pt(eF, 'w'), F: pt(eG, 'e') },
  segments: [{ from: 'A', to: 'B', ticks: 1 }, { from: 'A', to: 'C', ticks: 1 }, { from: 'B', to: 'D', ticks: 2 }, { from: 'D', to: 'C', ticks: 2 }, { from: 'D', to: 'E', dashed: true }, { from: 'D', to: 'F', dashed: true }],
  angles: [{ at: 'E', from: 'D', to: 'A', right: true }, { at: 'F', from: 'D', to: 'A', right: true }],
}, 'An isosceles triangle ABC with AB equal to AC. The point D is the midpoint of the base BC. The dashed line DE is perpendicular to AB with E on AB, and the dashed line DF is perpendicular to AC with F on AC.', 'D is the midpoint of BC, DE perpendicular to AB, DF perpendicular to AC.');

// =============================================================== short answer, 2 marks
Q('s201', mk.short({ marks: 2, stem: r`Define congruent triangles. What does $\triangle ABC \cong \triangle PQR$ tell you about the corresponding sides and angles?`, model: r`Two triangles are **congruent** if they have exactly the same shape and size, so that one fits exactly on the other.\n\n$\triangle ABC \cong \triangle PQR$ means that $A$ matches $P$, $B$ matches $Q$ and $C$ matches $R$, so $AB = PQ$, $BC = QR$, $CA = RP$ and $\angle A = \angle P$, $\angle B = \angle Q$, $\angle C = \angle R$.`, sol: 'Same shape and size; the letters match in order.', scheme: [['Definition of congruent triangles', 1], ['Matching of letters and the six equal parts', 1]], d: 1, c: 'understanding', t: [2], time: 90 }), null, 'definition: marked by the scheme');
{
  const P = [0, 0], Qp = [4, 0], c70 = Math.cos((70 * Math.PI) / 180), s70 = Math.sin((70 * Math.PI) / 180);
  const R1 = [4, 3], R2 = [4 + 3 * c70, 3 * s70];
  Q('s202', mk.short({ marks: 2, stem: r`A frame $PQRS$ of four steel bars has $PQ = SR = 4$ cm and $QR = PS = 3$ cm. In one shape it is a rectangle and the diagonal $PR$ is $5$ cm. The frame is pushed over until $\angle P = 70^\circ$. (a) From an accurate drawing, find $PR$ now, to one decimal place. (b) Why does a $5$ cm brace along $PR$ stop the frame from changing shape?`, model: r`**(a)** In the pushed-over frame the diagonal is no longer $5$ cm: from an accurate drawing, $PR \approx 5.8$ cm. The same four bars therefore make two different shapes.\n\n**(b)** A brace $PR$ of $5$ cm makes triangles $PQR$ and $PSR$ with sides $4$, $3$ and $5$ cm. Three given sides fix a triangle (SSS), so the angles cannot change.`, sol: 'Measure PR; a brace makes triangles, which are rigid.', scheme: [['(a) PR is about 5.8 cm, not 5 cm', 1], ['(b) Two triangles with fixed sides 4, 3 and 5 cm', 1]], d: 2, c: 'application', t: [1], time: 120, assets: [] }), (Cx) => { Cx.assert(close(dist(P, R1), 5) && dist(P, R2).toFixed(1) === '5.8' && close(dist(Qp, R2), 3) && close(dist(R2, [3 * c70, 3 * s70]), 4), 'rectangle diagonal 5, leaning diagonal about 5.8'); Cx.model([5, 5.8, 4, 3]); });
}
Q('s203', mk.short({ marks: 2, stem: r`State the SAS test for congruence of triangles. Why must the angle be the angle between the two sides? Give a reason using the idea of a non-included angle.`, model: r`**SAS:** if two sides and the angle between them in one triangle are equal to two sides and the angle between them in another, the triangles are congruent.\n\nIf the equal angle is not between the equal sides, two different triangles can have the same data. For example, with $\angle A = 45^\circ$, $AB = 4\sqrt{2}$ cm and $BC = 5$ cm, the side $AC$ can be $1$ cm or $7$ cm.`, sol: 'Included angle; SSA can give two triangles.', scheme: [['SAS stated with the included angle', 1], ['A non-included angle can give two triangles (example with AC = 1 and 7)', 1]], d: 2, c: 'understanding', t: [2, 4], time: 120 }), (Cx) => { Cx.assert(ssaSides(45, 4 * Math.SQRT2, 5).map((v) => Math.round(v)).join() === '1,7', 'AC is 1 or 7'); Cx.model([1, 7, 5, 45]); });
{
  const AB = 7, BC = 9, A = 62, B = 54, C = 180 - A - B;
  const T = triASA(BC, B, C), U = flip(T, 31, 5, 2);
  Q('s204', mk.short({ marks: 2, stem: r`$\triangle ABC \cong \triangle DEF$, with the letters matching in order. $AB = 7$ cm, $BC = 9$ cm, $\angle A = 62^\circ$ and $\angle B = 54^\circ$. Find $DE$, $EF$ and $\angle F$, giving the reason.`, model: r`Corresponding parts of congruent triangles are equal (CPCT): $A \leftrightarrow D$, $B \leftrightarrow E$, $C \leftrightarrow F$. So $DE = AB = 7$ cm and $EF = BC = 9$ cm.\n\n$\angle F = \angle C = 180^\circ - 62^\circ - 54^\circ = 64^\circ$.`, sol: 'CPCT, then the angle sum.', scheme: [['DE = 7 cm and EF = 9 cm by CPCT', 1], ['Angle F = angle C = 64 degrees', 1]], d: 2, c: 'application', t: [2], time: 90 }), (Cx) => { Cx.assert(sameParts(T, U) && close(angleAt(U[2], U[0], U[1]), 64) && close(angleAt(T[0], T[1], T[2]), 62), 'angle C is 64'); Cx.assert(C === 64, 'C = 64'); Cx.model([7, 9, 64]); });
}
{
  const xs = range(1, 40).filter((x) => 4 * x - 6 === 2 * x + 24), base = 4 * 15 - 6, apex = 180 - 2 * base;
  Q('s205', mk.short({ marks: 2, stem: r`In an isosceles triangle $ABC$ with $AB = AC$, the base angles are $\angle B = (4x - 6)^\circ$ and $\angle C = (2x + 24)^\circ$. Find $x$ and $\angle A$.`, model: r`The angles opposite the equal sides are equal, so $4x - 6 = 2x + 24$, giving $2x = 30$ and $x = 15$. Each base angle is $4 \times 15 - 6 = 54^\circ$.\n\n$\angle A = 180^\circ - 54^\circ - 54^\circ = 72^\circ$.`, sol: 'Equal base angles give the equation.', scheme: [['4x - 6 = 2x + 24, so x = 15', 1], ['Each base angle 54 degrees and angle A = 72 degrees', 1]], d: 2, c: 'application', t: [3], time: 90 }), (Cx) => { const t = triASA(6, base, base); Cx.assert(xs.join() === '15' && base === 2 * 15 + 24 && close(angleAt(t[0], t[1], t[2]), 72) && apex === 72, 'x = 15, base 54, apex 72'); Cx.model([15, 54, 72]); });
}
{
  const t = triSSS(6, 5, 5);
  Q('s206', mk.short({ marks: 2, stem: 'Write the converse of the statement "If a triangle is equilateral, then it is isosceles". Is the converse true? Give an example to support your answer.', model: r`**Converse:** if a triangle is isosceles, then it is equilateral.\n\nThe converse is **false**. A triangle with sides $5$ cm, $5$ cm and $6$ cm is isosceles, but its three sides are not all equal, so it is not equilateral.`, sol: 'Swap if and then; test with sides 5, 5, 6.', scheme: [['Converse stated correctly', 1], ['False, with the counterexample 5, 5, 6', 1]], d: 2, c: 'analysis', t: [4], time: 90 }), (Cx) => { Cx.assert(close(dist(t[0], t[1]), dist(t[0], t[2])) && !close(dist(t[1], t[2]), dist(t[0], t[1])), 'isosceles but not equilateral'); Cx.model([5, 6]); });
}
{
  const AB = 6 * Math.SQRT2, h = AB * Math.sin(Math.PI / 4), HC = Math.sqrt(6.5 * 6.5 - h * h), two = ssaSides(45, AB, 6.5);
  Q('s207', mk.short({ marks: 2, stem: r`In a triangle $ABC$, $\angle A = 45^\circ$, $AB = 6\sqrt{2}$ m and $BC = 6.5$ m. Let $BH$ be the perpendicular from $B$ to the line through $A$ and $C$. Find $BH$ and $AH$, and show that there are two possible values of $AC$.`, model: r`In the right-angled triangle $ABH$ with $\angle A = 45^\circ$, $BH = AH = 6$ m (since $AB = 6\sqrt{2}$).\n\nIn the right-angled triangle $BHC$, $HC = \sqrt{6.5^2 - 6^2} = \sqrt{6.25} = 2.5$ m. The point $C$ can be on either side of $H$, so $AC = 6 - 2.5 = 3.5$ m or $AC = 6 + 2.5 = 8.5$ m.`, sol: 'Right triangles BHC and ABH.', scheme: [['BH = AH = 6 m and HC = 2.5 m', 1], ['AC = 3.5 m or 8.5 m, two triangles', 1]], d: 3, c: 'analysis', t: [4], time: 150 }), (Cx) => { Cx.assert(close(h, 6) && close(HC, 2.5) && two.length === 2 && close(two[0], 3.5) && close(two[1], 8.5), 'AC is 3.5 or 8.5'); Cx.model([6, 2.5, 3.5, 8.5]); });
}
{
  Q('s208', mk.short({ marks: 2, stem: r`In the roof truss $ABC$ of a school in Pune, $AB = AC$ and $D$ is the midpoint of the tie beam $BC$. Prove that $\triangle ABD \cong \triangle ACD$. (For the drawing, $AB = AC = 5$ m and $BC = 6$ m.)`, model: r`$AB = AC$ (given), $BD = DC$ ($D$ is the midpoint of $BC$) and $AD = AD$ (common side).\n\nSo $\triangle ABD \cong \triangle ACD$ by SSS. In the drawing $BD = DC = 3$ m and $AD = 4$ m.`, sol: 'Three pairs of equal sides.', scheme: [['The three pairs of equal sides with reasons', 1], ['SSS, with the triangles named in matching order', 1]], d: 2, c: 'application', t: [2], time: 90 }), (Cx) => { const D = midpoint(iso[1], iso[2]); Cx.assert(close(dist(iso[1], D), 3) && close(dist(D, iso[2]), 3) && close(dist(iso[0], D), 4) && criterion(['a', 'b', 'c']) === 'SSS', 'BD = DC = 3 and AD = 4'); Cx.model([3, 4]); });
}

// =============================================================== short answer, 3 marks
{
  const D = [3, 0];
  Q('s301', mk.short({ marks: 3, stem: r`In $\triangle ABC$, $D$ is the midpoint of $BC$ and $AD \perp BC$. Prove that $AB = AC$. Check with $BC = 6$ cm and $AD = 4$ cm.`, model: r`In $\triangle ABD$ and $\triangle ACD$: $BD = DC$ ($D$ is the midpoint), $\angle ADB = \angle ADC = 90^\circ$ ($AD \perp BC$) and $AD = AD$ (common).\n\nSo $\triangle ABD \cong \triangle ACD$ by SAS, and $AB = AC$ by CPCT.\n\nCheck: $BD = 3$ cm and $AD = 4$ cm, so $AB = AC = \sqrt{3^2 + 4^2} = 5$ cm.`, sol: 'SAS with the right angles, then CPCT.', scheme: [['Two sides and the angle between them equal, with reasons', 1], ['SAS and CPCT, so AB = AC', 1], ['The check: AB = AC = 5 cm', 1]], d: 2, c: 'application', t: [3], time: 150 }), (Cx) => { Cx.assert(close(dist(iso[0], iso[1]), 5) && close(dist(iso[0], iso[2]), 5) && close(angleAt(D, iso[0], iso[1]), 90) && close(dist(iso[0], D), 4), 'AB = AC = 5'); Cx.model([3, 4, 5, 90]); });
}
{
  Q('s302', mk.short({ marks: 3, stem: r`Prove that the bisector of the angle at the apex of an isosceles triangle bisects the base and is perpendicular to it. Check with $AB = AC = 5$ cm and $BC = 6$ cm.`, model: r`Let $AB = AC$ and let the bisector of $\angle A$ meet $BC$ at $D$. In $\triangle ABD$ and $\triangle ACD$: $AB = AC$, $\angle BAD = \angle CAD$ and $AD = AD$, so they are congruent by SAS.\n\nBy CPCT, $BD = DC$ (so $D$ is the midpoint) and $\angle ADB = \angle ADC$. These angles form a linear pair, so they add up to $180^\circ$ and each is $90^\circ$.\n\nCheck: $BD = DC = 3$ cm and $\angle ADB = 90^\circ$.`, sol: 'SAS, then CPCT and a linear pair.', scheme: [['SAS for the triangles ABD and ACD', 1], ['BD = DC by CPCT', 1], ['The angles at D are equal and form a linear pair, so each is 90 degrees', 1]], d: 3, c: 'analysis', t: [3], time: 180, assets: [fIsoProof] }), (Cx) => { const D = midpoint(iso[1], iso[2]); Cx.assert(close(angleAt(iso[0], iso[1], D), angleAt(iso[0], iso[2], D)) && close(dist(iso[1], D), 3) && close(angleAt(D, iso[0], iso[1]), 90), 'the bisector from A is the median and the altitude'); Cx.model([3, 90, 180]); });
}
Q('s303', mk.short({ marks: 3, stem: r`Use the isosceles triangle theorem to prove that each angle of an equilateral triangle is $60^\circ$.`, model: r`Let $AB = BC = CA$. Since $AB = AC$, the angles opposite them are equal: $\angle C = \angle B$. Since $BA = BC$, $\angle C = \angle A$ as well.\n\nSo $\angle A = \angle B = \angle C$. The three angles add up to $180^\circ$, so each is $180^\circ \div 3 = 60^\circ$.`, sol: 'Apply the isosceles theorem twice.', scheme: [['The theorem used for two pairs of equal sides', 1], ['All three angles are equal', 1], ['Each angle is 180 divided by 3, which is 60 degrees', 1]], d: 2, c: 'application', t: [3], time: 120 }), (Cx) => { const t = triSSS(6, 6, 6); Cx.assert([0, 1, 2].every((i) => close(angleAt(t[i], t[(i + 1) % 3], t[(i + 2) % 3]), 60)) && 180 / 3 === 60, 'each angle is 60'); Cx.model([180, 60]); });
{
  const d1 = dist(mid, eF), d2 = dist(mid, eG);
  Q('s304', mk.short({ marks: 3, stem: r`In an isosceles triangle $ABC$ with $AB = AC$, $D$ is the midpoint of $BC$, $DE \perp AB$ and $DF \perp AC$. Prove that $DE = DF$. Check with $AB = AC = 5$ cm and $BC = 6$ cm, when each perpendicular is $2.4$ cm.`, model: r`In $\triangle DEB$ and $\triangle DFC$: $\angle DEB = \angle DFC = 90^\circ$, $\angle B = \angle C$ (as $AB = AC$) and $BD = DC$ ($D$ is the midpoint).\n\nSo $\triangle DEB \cong \triangle DFC$ by AAS, and $DE = DF$ by CPCT.\n\nCheck: the area of $\triangle ABD$ is $\frac12 \times 3 \times 4 = 6$ cm$^2$, which equals $\frac12 \times 5 \times DE$, so $DE = 2.4$ cm, and the same for $DF$.`, sol: 'AAS in the triangles DEB and DFC.', scheme: [['The three equal parts: two angles and BD = DC', 1], ['AAS, then CPCT gives DE = DF', 1], ['The check: 2.4 cm for each', 1]], d: 3, c: 'analysis', t: [3], time: 180, assets: [figDEDF] }), (Cx) => { Cx.assert(close(d1, 2.4) && close(d2, 2.4) && close(angleAt(eF, mid, iso[0]), 90) && close(angleAt(eG, mid, iso[0]), 90), 'DE = DF = 2.4'); Cx.model([2.4, 6, 90]); });
}
{
  const t = triASA(6, 60, 60), rect = [[0, 0], [4, 0], [4, 3], [0, 3]];
  Q('s305', mk.short({ marks: 3, stem: 'Write the converse of each statement. Say whether it is true, and for a false converse give a counterexample. (i) If a triangle is equilateral, then all its angles are equal. (ii) If a number ends in $5$, then it is divisible by $5$. (iii) If a four-sided figure is a square, then its diagonals are equal.', model: r`**(i)** Converse: if all angles of a triangle are equal, then it is equilateral. **True** (equal angles give equal opposite sides).\n\n**(ii)** Converse: if a number is divisible by $5$, then it ends in $5$. **False**: $20$ is divisible by $5$ but ends in $0$.\n\n**(iii)** Converse: if the diagonals of a four-sided figure are equal, then it is a square. **False**: a rectangle $4$ cm by $3$ cm has two equal diagonals of $5$ cm but is not a square.`, sol: 'Swap if and then; one counterexample refutes a converse.', scheme: [['(i) converse true', 1], ['(ii) false with 20', 1], ['(iii) false with the rectangle 4 by 3', 1]], d: 3, c: 'analysis', t: [4], time: 180 }), (Cx) => { Cx.assert(close(dist(t[0], t[1]), dist(t[1], t[2])) && close(dist(t[0], t[2]), dist(t[1], t[2])), 'equal angles, equal sides'); Cx.assert(20 % 5 === 0 && 20 % 10 === 0 && !String(20).endsWith('5') && close(dist(rect[0], rect[2]), dist(rect[1], rect[3])) && !close(dist(rect[0], rect[1]), dist(rect[1], rect[2])), 'counterexamples: 20 and the 4 by 3 rectangle'); Cx.model([20, 4, 3, 5]); });
}

// =============================================================== long answer, 5 marks
{
  const baseAng = angleAt(iso[1], iso[2], iso[0]);
  Q('l01', mk.long({ stem: r`Prove that if two sides of a triangle are equal, then the angles opposite them are equal. (a) Draw $\triangle ABC$ with $AB = AC$ and the bisector $AD$ of $\angle A$ meeting $BC$ at $D$. (b) Write the three pairs of equal parts of $\triangle ABD$ and $\triangle ACD$, with reasons. (c) Name the test and the congruence. (d) State the conclusion. (e) Check with $AB = AC = 5$ cm and $BC = 6$ cm, where each base angle is about $53.1^\circ$.`, model: r`**(a)** $AD$ is the bisector of $\angle A$, so $\angle BAD = \angle CAD$.\n\n**(b)** $AB = AC$ (given), $\angle BAD = \angle CAD$ ($AD$ bisects $\angle A$) and $AD = AD$ (common side).\n\n**(c)** The angle is between the two sides in each triangle, so $\triangle ABD \cong \triangle ACD$ by SAS.\n\n**(d)** By CPCT, $\angle B = \angle C$.\n\n**(e)** With $AB = AC = 5$ cm and $BC = 6$ cm, $BD = 3$ cm, so $\cos B = 3 \div 5 = 0.6$ and $\angle B = \angle C \approx 53.1^\circ$.`, sol: 'Bisector, SAS, CPCT.', scheme: [['(a) the bisector and the construction', 1], ['(b) three equal pairs with reasons', 1], ['(c) SAS, triangles named in order', 1], ['(d) angle B = angle C by CPCT', 1], ['(e) the check, about 53.1 degrees', 1]], d: 3, c: 'application', t: [3], time: 420, assets: [fIsoProof] }), (Cx) => { Cx.assert(close(baseAng, angleAt(iso[2], iso[1], iso[0])) && baseAng.toFixed(1) === '53.1' && close(Math.acos(3 / 5) * 180 / Math.PI, baseAng), 'base angle 53.1'); Cx.model([3, 5, 0.6, 53.1]); });
}
{
  const D = dD, E = dE;
  Q('l02', mk.long({ stem: r`In an isosceles triangle $ABC$ with $AB = AC$, the points $D$ on $AB$ and $E$ on $AC$ are such that $BD = CE$. (a) Show that $AD = AE$. (b) Prove that $\triangle DBC \cong \triangle ECB$. (c) Hence show that $DC = EB$. (d) Check with $AB = AC = 5$ cm and $BD = CE = 2$ cm: find $AD$, and find $DC$ to two decimal places.`, model: r`**(a)** $AB = AC$ and $BD = CE$, so $AD = AB - BD = AC - CE = AE$. (With the figure, $AD = 5 - 2 = 3$ cm.)\n\n**(b)** In $\triangle DBC$ and $\triangle ECB$: $BD = CE$ (given), $\angle DBC = \angle ECB$ (base angles of the isosceles triangle $ABC$) and $BC = CB$ (common). So $\triangle DBC \cong \triangle ECB$ by SAS.\n\n**(c)** By CPCT, $DC = EB$ and $\angle DCB = \angle EBC$.\n\n**(d)** $AD = 3$ cm and $DC = EB \approx 5.06$ cm.`, sol: 'Subtract equal lengths, then SAS and CPCT.', scheme: [['(a) AD = AE by subtraction', 1], ['(b) the three equal parts with reasons', 1], ['(b) SAS, triangles named in matching order', 1], ['(c) DC = EB by CPCT', 1], ['(d) AD = 3 cm and DC about 5.06 cm', 1]], d: 3, c: 'analysis', t: [2, 3], time: 420, assets: [figBDCE] }), (Cx) => { Cx.assert(close(dist(iso[0], D), 3) && close(dist(iso[0], E), 3) && close(dist(D, iso[2]), dist(E, iso[1])) && dist(D, iso[2]).toFixed(2) === '5.06', 'AD = 3 and DC = EB = 5.06'); Cx.model([3, 5.06, 2, 5]); });
}
{
  Q('l03', mk.long({ stem: r`In $\triangle ABC$, the bisector $AD$ of $\angle A$ is perpendicular to $BC$, with $D$ on $BC$. Prove that $AB = AC$. (a) Write the two angles at $A$. (b) Write the two angles at $D$. (c) Name the common side. (d) State the test. (e) Conclude, and check with $A$ at height $4$ cm above $D$ and $BD = DC = 3$ cm.`, model: r`**(a)** $\angle BAD = \angle CAD$ ($AD$ bisects $\angle A$).\n\n**(b)** $\angle ADB = \angle ADC = 90^\circ$ ($AD \perp BC$).\n\n**(c)** $AD = AD$ is common to both triangles.\n\n**(d)** In $\triangle ABD$ and $\triangle ACD$ two angles and the side between them are equal, so $\triangle ABD \cong \triangle ACD$ by ASA.\n\n**(e)** By CPCT, $AB = AC$. Check: $AB = AC = \sqrt{3^2 + 4^2} = 5$ cm.`, sol: 'ASA, then CPCT.', scheme: [['(a) the two equal angles at A', 1], ['(b) the two right angles at D', 1], ['(c) the common side AD', 1], ['(d) ASA, triangles named in order', 1], ['(e) AB = AC by CPCT, and the check 5 cm', 1]], d: 3, c: 'application', t: [2, 3], time: 420 }), (Cx) => { const D = [3, 0]; Cx.assert(close(angleAt(iso[0], iso[1], D), angleAt(iso[0], iso[2], D)) && close(angleAt(D, iso[0], iso[1]), 90) && close(dist(iso[0], iso[1]), 5) && close(dist(iso[0], iso[2]), 5), 'AB = AC = 5'); Cx.model([90, 3, 4, 5]); });
}
{
  const E = foot(iso[1], iso[0], iso[2]), F = foot(iso[2], iso[0], iso[1]);
  Q('l04', mk.long({ stem: r`In $\triangle ABC$, the altitudes $BE$ (to $AC$) and $CF$ (to $AB$) are equal. Prove that $AB = AC$. (a) Write the right angles. (b) Name the hypotenuse that the two right-angled triangles $BEC$ and $CFB$ share. (c) Write the equal side. (d) State the test and the congruence. (e) Deduce that $AB = AC$, naming the result you use. Check with $AB = AC = 5$ cm and $BC = 6$ cm, where $BE = CF = 4.8$ cm.`, model: r`**(a)** $\angle BEC = \angle CFB = 90^\circ$ (altitudes).\n\n**(b)** $BC$ is the hypotenuse of both triangles, and $BC = CB$.\n\n**(c)** $BE = CF$ (given).\n\n**(d)** Right angle, hypotenuse and a side are equal, so $\triangle BEC \cong \triangle CFB$ by RHS.\n\n**(e)** By CPCT, $\angle ECB = \angle FBC$, that is $\angle C = \angle B$. In $\triangle ABC$ the sides opposite equal angles are equal (converse of the isosceles triangle theorem), so $AB = AC$. Check: $BE = CF = 4.8$ cm for $AB = AC = 5$ cm and $BC = 6$ cm.`, sol: 'RHS, CPCT, then the converse of the isosceles theorem.', scheme: [['(a) the two right angles', 1], ['(b) and (c) hypotenuse BC common and BE = CF', 1], ['(d) RHS, triangles named in order', 1], ['(e) angle B = angle C by CPCT', 1], ['(e) AB = AC by the converse of the isosceles theorem', 1]], d: 4, c: 'analysis', t: [2, 3], time: 480, assets: [] }), (Cx) => { Cx.assert(close(dist(iso[1], E), 4.8) && close(dist(iso[2], F), 4.8) && close(angleAt(E, iso[1], iso[0]), 90) && close(angleAt(F, iso[2], iso[0]), 90) && criterion(['b', 'a'], 'B') === 'RHS', 'BE = CF = 4.8, RHS'); Cx.model([90, 4.8, 5, 6]); });
}
{
  const AB = 6 * Math.SQRT2, v = ssaSides(45, AB, 6.5), t1 = [[0, 0], [AB, 0], polar([0, 0], v[0], 45)], t2 = [[0, 0], [AB, 0], polar([0, 0], v[1], 45)];
  Q('l05', mk.long({ stem: r`Two flower beds $ABC$ and $ABD$ on a school lawn in Dehradun have $\angle A = 45^\circ$, $AB = 6\sqrt{2}$ m, and $BC = BD = 6.5$ m, with $C$ and $D$ on the same ray from $A$. (a) Find the distance $BH$ from $B$ to that ray. (b) Find $HC$. (c) Find $AC$ and $AD$. (d) Are the beds congruent? Give a reason. (e) What would $BC$ have to be for only one bed to be possible, and what is then special about the triangle?`, model: r`**(a)** In the right-angled triangle $ABH$, $\angle A = 45^\circ$ so $BH = AH = 6$ m.\n\n**(b)** $HC = \sqrt{6.5^2 - 6^2} = \sqrt{6.25} = 2.5$ m.\n\n**(c)** $AC = 6 - 2.5 = 3.5$ m and $AD = 6 + 2.5 = 8.5$ m.\n\n**(d)** The beds are not congruent: they share $\angle A$, $AB$ and a side of $6.5$ m opposite the angle (SSA), but $AC \ne AD$.\n\n**(e)** For only one bed, $BC$ must equal $BH = 6$ m. Then $C$ is the foot of the perpendicular and the triangle is right-angled at $C$.`, sol: 'Perpendicular BH, then two positions of C.', scheme: [['(a) BH = AH = 6 m', 1], ['(b) HC = 2.5 m', 1], ['(c) AC = 3.5 m and AD = 8.5 m', 1], ['(d) not congruent, SSA is not a test', 1], ['(e) BC = 6 m, right-angled at C', 1]], d: 3, c: 'analysis', t: [4], time: 420, assets: [] }), (Cx) => { Cx.assert(v.length === 2 && close(v[0], 3.5) && close(v[1], 8.5) && close(dist(t1[1], t1[2]), 6.5) && close(dist(t2[1], t2[2]), 6.5) && !sameParts(t1, t2) && close(AB * Math.sin(Math.PI / 4), 6) && ssaSides(45, AB, 6).length === 1, 'two beds, AC 3.5 or 8.5; BC = 6 gives one'); Cx.model([6, 2.5, 3.5, 8.5, 6.5]); });
}

// =============================================================== case-based
{
  const w = 4, h = 3, brace = Math.hypot(w, h), cost = 120, panels = 12;
  const pieceVerdict = [pieces4(0, 2), false, pieces4(0, 1), false];
  function pieces4(i, j) { const k = j - i; return [k + 1, 4 - k + 1].every((s) => s === 3); }
  caseQ('c01', {
    passage: r`A footbridge over a canal near Cuttack is built from rectangular steel panels, each $4$ m wide and $3$ m high, made of four bars joined at the corners. A panel with only four bars can lean over, so a diagonal brace is welded across every panel. Steel bars cost ₹$120$ per metre.`,
    d: 2, c: 'application',
    model: r`(a) Option (a). (b) $5$. (c) (i) ₹7200. Or (ii) $\triangle ABC \cong \triangle CDA$ by SSS.`,
    sol: r`(a) A brace splits the panel into two triangles, which are rigid. (b) $\sqrt{4^2 + 3^2} = 5$ m. (c) (i) $12 \times 5 = 60$ m of brace, and $60 \times 120 = 7200$ rupees, that is ₹7200. (ii) $AB = CD = 4$ m, $BC = DA = 3$ m and $AC$ is common, so SSS gives $\triangle ABC \cong \triangle CDA$.`,
    children: [
      child('a', mk.mcq({ stem: 'The diagonal brace stops the panel from leaning because it', opts: ['splits the panel into two triangles, which cannot change shape', 'makes the panel heavier', 'makes the panel taller', 'joins the midpoints of two sides'], key: 'a', sol: 'A diagonal splits the four-bar panel into two triangles, and a triangle is rigid. Weight, height and midpoints have nothing to do with it.', d: 1, c: 'understanding', t: [1], time: 60 })),
      child('b', mk.num({ stem: 'Find the length of one brace, in metres.', value: 5, sol: r`The brace is the hypotenuse of a right-angled triangle with sides $4$ m and $3$ m, so it is $\sqrt{16 + 9} = 5$ m.`, scheme: [['Right-angled triangle with sides 4 and 3', 0.5], ['5 m', 0.5]], d: 1, c: 'understanding', t: [1], time: 75 })),
      child('c', mk.short({ marks: 2, stem: r`**(i)** The bridge has $12$ panels with one brace each. Find the cost of the braces.`, model: r`Total brace length $= 12 \times 5 = 60$ m. Cost $= 60 \times 120 = 7200$ rupees, that is ₹7200.`, sol: 'Length of brace times the rate.', scheme: [['Total length 60 m', 1], ['Cost ₹7200', 1]], d: 2, c: 'application', t: [1], time: 90 }), [
        mk.short({ marks: 2, stem: r`**(ii)** In a panel $ABCD$ with the brace $AC$, name the two triangles formed and prove that they are congruent.`, model: r`The triangles are $ABC$ and $CDA$. $AB = CD = 4$ m, $BC = DA = 3$ m and $AC = CA$ (common), so $\triangle ABC \cong \triangle CDA$ by SSS.`, sol: 'Opposite sides of the panel are equal; the brace is common.', scheme: [['Three pairs of equal sides with reasons', 1], ['SSS, triangles named in matching order', 1]], d: 2, c: 'application', t: [2], time: 90 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which(pieceVerdict, true);
    Cx.child('b').val(brace);
    Cx.child('c').assert(panels * brace === 60 && panels * brace * cost === 7200, '7200');
    Cx.child('c').model([60, 7200]);
    Cx.child('cii').assert(criterion(['a', 'b', 'c']) === 'SSS' && close(Math.hypot(w, h), 5), 'SSS');
    Cx.child('cii').model([4, 3]);
  });
}
{
  const OA = 15, OB = 20, O = [0, 0], A = [OA, 0], B = polar(O, OB, 90), C = [-OA, 0], D = [0, -OB];
  const AB = dist(A, B), CD = dist(C, D), angOAB = (Math.atan2(OB, OA) * 180) / Math.PI;
  caseQ('c02', {
    passage: r`To find the width $AB$ of a pond in a village near Alappuzha, Sheela chooses a point $O$ on land from which both $A$ and $B$ can be seen. She extends $AO$ to $C$ so that $OC = OA$, and extends $BO$ to $D$ so that $OD = OB$. She measures $OA = 15$ m, $OB = 20$ m and $CD = 25$ m.`,
    d: 3, c: 'application',
    model: r`(a) Option (a). (b) $25$. (c) (i) $\triangle AOB \cong \triangle COD$ by SAS. Or (ii) $\angle OCD = 53^\circ$.`,
    sol: r`(a) $OA = OC$, $OB = OD$ and $\angle AOB = \angle COD$ (vertically opposite): SAS. (b) By CPCT, $AB = CD = 25$ m. (c) (i) The three equal parts give SAS. (ii) $\angle OCD = \angle OAB = 53^\circ$ by CPCT.`,
    children: [
      child('a', mk.mcq({ stem: r`The triangles $AOB$ and $COD$ are congruent by the test`, opts: ['SAS', 'SSS', 'RHS', 'AAS'], key: 'a', sol: r`$OA = OC$ and $OB = OD$ are equal sides, and $\angle AOB = \angle COD$ because they are vertically opposite angles, and so they are the angles between the equal sides. This is SAS.`, d: 2, c: 'application', t: [2], time: 75 })),
      child('b', mk.num({ stem: 'Find the width $AB$ of the pond, in metres.', value: 25, sol: r`$\triangle AOB \cong \triangle COD$, so $AB = CD = 25$ m by CPCT.`, scheme: [['AB = CD by CPCT', 0.5], ['25 m', 0.5]], d: 1, c: 'understanding', t: [2], time: 60 })),
      child('c', mk.short({ marks: 2, stem: r`**(i)** Prove that $\triangle AOB \cong \triangle COD$.`, model: r`$OA = OC$ (given), $OB = OD$ (given) and $\angle AOB = \angle COD$ (vertically opposite angles). So $\triangle AOB \cong \triangle COD$ by SAS.`, sol: 'Two equal sides and the vertically opposite angles.', scheme: [['OA = OC, OB = OD and the angles are vertically opposite', 1], ['SAS with the triangles named in matching order', 1]], d: 2, c: 'application', t: [2], time: 100 }), [
        mk.short({ marks: 2, stem: r`**(ii)** Sheela measures $\angle OAB = 53^\circ$. Find $\angle OCD$ and give the reason.`, model: r`$A \leftrightarrow C$, $B \leftrightarrow D$, $O \leftrightarrow O$ in the congruence $\triangle AOB \cong \triangle COD$, so $\angle OCD = \angle OAB = 53^\circ$ by CPCT.`, sol: 'CPCT with the matching A and C.', scheme: [['Matching A and C in the congruence', 1], ['53 degrees by CPCT', 1]], d: 2, c: 'application', t: [2], time: 90 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which([criterion(['b', 'c', 'A']) === 'SAS' ? 'SAS' : 'x', 'SSS', 'RHS', 'AAS'], 'SAS');
    Cx.child('b').val(CD);
    Cx.child('c').assert(close(AB, CD) && close(angleAt(O, A, B), angleAt(O, C, D)) && close(dist(O, A), dist(O, C)) && close(dist(O, B), dist(O, D)), 'SAS: the third sides agree');
    Cx.child('cii').assert(Math.round(angOAB) === 53 && close(angleAt(C, O, D), angleAt(A, O, B)) && close(angleAt(C, O, D), angOAB), 'the angle at C equals the angle at A, about 53');
    Cx.child('cii').model([53]);
  });
}
{
  const t = iso, D = midpoint(t[1], t[2]), H = dist(t[0], D), apex = 74;
  caseQ('c03', {
    passage: r`The A-shaped roof truss of a house in Shimla is an isosceles triangle $ABC$ with $AB = AC = 5$ m and a tie beam $BC = 6$ m. A vertical post $AD$ joins the apex $A$ to the midpoint $D$ of $BC$.`,
    d: 3, c: 'application',
    model: r`(a) Option (a). (b) $4$. (c) (i) $90^\circ$. Or (ii) $53^\circ$.`,
    sol: r`(a) $AB = AC$, $BD = DC$ and $AD$ common give SSS. (b) $AD = \sqrt{5^2 - 3^2} = 4$ m. (c) (i) By CPCT $\angle ADB = \angle ADC$, and they form a linear pair, so each is $90^\circ$. (ii) $(180^\circ - 74^\circ) \div 2 = 53^\circ$.`,
    children: [
      child('a', mk.mcq({ stem: r`The triangles $ABD$ and $ACD$ are congruent by the test`, opts: ['SSS', 'ASA', 'RHS', 'SAS with the angle at A'], key: 'a', sol: r`$AB = AC$, $BD = DC$ (as $D$ is the midpoint) and $AD$ is common, so three pairs of sides are equal: SSS. At this point no angle is known, so SAS and ASA cannot be used, and a right angle is not given for RHS.`, d: 2, c: 'application', t: [2], time: 75 })),
      child('b', mk.num({ stem: 'Find the height $AD$ of the post, in metres.', value: 4, sol: r`$\triangle ABD$ is right-angled at $D$ with $AB = 5$ m and $BD = 3$ m, so $AD = \sqrt{5^2 - 3^2} = \sqrt{16} = 4$ m.`, scheme: [['Right-angled triangle ABD with BD = 3', 0.5], ['4 m', 0.5]], d: 1, c: 'understanding', t: [3], time: 75 })),
      child('c', mk.short({ marks: 2, stem: r`**(i)** Find $\angle ADB$ and give the reason.`, model: r`$\triangle ABD \cong \triangle ACD$, so $\angle ADB = \angle ADC$ by CPCT. They form a linear pair, so they add up to $180^\circ$ and each is $90^\circ$. The post is vertical.`, sol: 'CPCT and a linear pair.', scheme: [['Angle ADB = angle ADC by CPCT', 1], ['Each is 90 degrees as they add up to 180', 1]], d: 2, c: 'application', t: [3], time: 90 }), [
        mk.short({ marks: 2, stem: r`**(ii)** In another truss of the same shape the angle at the apex is $\angle A = 74^\circ$. Find $\angle B$ and $\angle C$.`, model: r`$AB = AC$, so $\angle B = \angle C$. They add up to $180^\circ - 74^\circ = 106^\circ$, so each is $106^\circ \div 2 = 53^\circ$.`, sol: 'Equal base angles and the angle sum.', scheme: [['Angle B = angle C because AB = AC', 1], ['Each is 53 degrees', 1]], d: 2, c: 'application', t: [3], time: 90 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which([criterion(['a', 'b', 'c']), 'ASA', 'RHS', 'x'], 'SSS');
    Cx.child('b').val(H);
    Cx.child('c').assert(close(angleAt(D, t[0], t[1]), 90) && close(angleAt(D, t[0], t[2]), 90), 'right angle at D');
    Cx.child('c').model([90, 180]);
    const u = triASA(6, (180 - apex) / 2, (180 - apex) / 2);
    Cx.child('cii').assert(close(angleAt(u[0], u[1], u[2]), apex) && close(angleAt(u[1], u[2], u[0]), 53), 'base angles 53');
    Cx.child('cii').model([106, 53]);
  });
}
{
  const AB = 4 * Math.SQRT2, v = ssaSides(45, AB, 5), h = AB * Math.sin(Math.PI / 4);
  caseQ('c04', {
    passage: r`Two triangular flower beds $ABC$ and $ABD$ in a park in Jodhpur have the same side $AB = 4\sqrt{2}$ m and the same angle $\angle A = 45^\circ$ at $A$, and the sides $BC$ and $BD$ are both $5$ m, with $C$ and $D$ on the same ray from $A$. Arjun says: "Two sides and an angle are equal, so the beds are congruent by SAS."`,
    d: 3, c: 'analysis',
    model: r`(a) Option (a). (b) $1$. (c) (i) $AD = 7$ m. Or (ii) $2$ and $14$.`,
    sol: r`(a) The angle $45^\circ$ is not between $AB$ and $BC$, so it is SSA. (b) The perpendicular from $B$ is $4$ m and meets the ray at $H$ with $AH = 4$, $HC = 3$, so $AC = 4 - 3 = 1$ m. (c) (i) $AD = 4 + 3 = 7$ m. (ii) The areas are $\frac12 \times 1 \times 4 = 2$ and $\frac12 \times 7 \times 4 = 14$ square metres.`,
    children: [
      child('a', mk.mcq({ stem: 'What is wrong with Arjun\'s claim?', opts: ['The equal angle is not between the equal sides, so SAS does not apply', 'Two sides and an angle are never enough for any triangle', 'The beds have different perimeters, so they cannot be congruent', 'The side AB is too long for the test'], key: 'a', sol: r`SAS needs the angle between the two equal sides. Here the angle at $A$ is between $AB$ and $AC$ (or $AD$), but the equal sides are $AB$ and $BC$ (or $BD$). So it is SSA, which is not a test. The beds are in fact different.`, d: 2, c: 'analysis', t: [4], time: 75 })),
      child('b', mk.num({ stem: 'Find the shorter value of $AC$, in metres.', value: 1, sol: r`The perpendicular $BH$ from $B$ to the ray has $BH = AH = 4\sqrt{2} \sin 45^\circ = 4$ m. Then $HC = \sqrt{5^2 - 4^2} = 3$ m, so $AC = 4 - 3 = 1$ m.`, scheme: [['BH = AH = 4 m and HC = 3 m', 0.5], ['AC = 1 m', 0.5]], d: 3, c: 'analysis', t: [4], time: 105 })),
      child('c', mk.short({ marks: 2, stem: r`**(i)** Find $AD$ and explain why the beds are not congruent.`, model: r`$AD = AH + HC = 4 + 3 = 7$ m, while $AC = 1$ m. The beds have different third sides, so they are not congruent: the data $\angle A$, $AB$, $BC$ is SSA, which can give two triangles.`, sol: 'AD = 7 m; SSA gives two triangles.', scheme: [['AD = 7 m', 1], ['AC differs from AD, so not congruent (SSA)', 1]], d: 3, c: 'analysis', t: [4], time: 105 }), [
        mk.short({ marks: 2, stem: r`**(ii)** Find the areas of the two beds, using $BH$ as the height.`, model: r`Area of $ABC = \frac12 \times AC \times BH = \frac12 \times 1 \times 4 = 2$ square metres. Area of $ABD = \frac12 \times 7 \times 4 = 14$ square metres. The beds differ in area, so they are not congruent.`, sol: 'Half base times height for each bed.', scheme: [['Area ABC = 2 square metres', 1], ['Area ABD = 14 square metres', 1]], d: 3, c: 'analysis', t: [4], time: 105 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which([criterion(['c', 'a', 'A']) === 'none' ? 'angle not between' : 'x', 'never', 'perimeters', 'too long'], 'angle not between');
    Cx.child('b').val(v[0]);
    Cx.child('c').assert(close(v[1], 7) && close(h, 4) && ssaSides(45, AB, 5).length === 2, 'AD = 7');
    Cx.child('c').model([7, 1, 4, 3]);
    Cx.child('cii').assert(close(0.5 * v[0] * h, 2) && close(0.5 * v[1] * h, 14), 'areas 2 and 14');
    Cx.child('cii').model([2, 14, 4]);
  });
}
