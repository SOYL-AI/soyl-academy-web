// ICSE 9 Mathematics ch11 Rectilinear Figures: Parallelograms: short answers (2 and 3 marks) and structured long answers (10 marks).
// Proofs are qualitative, so each check builds the figure from coordinates and asserts every fact the proof uses (parallel sides,
// equal alternate angles, equal sides, congruent triangles, mid-points of the diagonals, right angles) together with every number
// in the model answer.
import { Q, mk, r } from './lib.mjs';
import * as G from './geo.mjs';

const { fig, dist, near, angDeg, ang, interior, paraSA, para, paraDiag, paraTri, rhombusD, rhombus, rectLB, squareS, area, perimeter, parallel, isMid, triASA, add, sub, mid } = G;
const fm = (v) => G.r6(v);
const V = (p) => [p.A, p.B, p.C, p.D];

// ---------------------------------------------------------------- short answers, 2 marks
{
  const p = paraSA(6.5, 4, 78);
  Q('s201', mk.short({ marks: 2, stem: r`In a parallelogram-shaped signboard $PQRS$, $\angle P = 78^\circ$. Write down $\angle R$, $\angle Q$ and $\angle S$, giving a reason for each.`, model: r`$\angle R = \angle P = 78^\circ$, because the opposite angles of a parallelogram are equal.

$\angle Q = 180^\circ - 78^\circ = 102^\circ$, because $PS \parallel QR$ and the neighbouring angles $\angle P$ and $\angle Q$ are co-interior angles. Then $\angle S = \angle Q = 102^\circ$ (opposite angles).`, sol: r`Use the opposite angles for $\angle R$ and the co-interior angles (sum $180^\circ$) for $\angle Q$, then the opposite angle again for $\angle S$.`, scheme: [['angle R = 78 (opposite angles equal)', 1], ['angle Q = angle S = 102 (co-interior angles add to 180)', 1]], d: 1, c: 'understanding', t: [1], time: 75 }), (C) => { C.assert(near(p.angA, 78) && near(interior(V(p), 2), 78) && near(p.angB, 102) && near(interior(V(p), 3), 102), 'R = 78, Q = S = 102'); C.model([78, 102]); });
}
{
  const p = paraSA(8, 5, 76);
  Q('s202', mk.short({ marks: 2, stem: r`In a quadrilateral $ABCD$, $AB \parallel DC$ and $AB = DC$. If $\angle ABC = 104^\circ$, find $\angle ADC$ and $\angle BAD$.`, model: r`A quadrilateral with one pair of opposite sides equal and parallel is a parallelogram, so its opposite angles are equal: $\angle ADC = \angle ABC = 104^\circ$.

$AD \parallel BC$, so $\angle BAD + \angle ABC = 180^\circ$ (co-interior angles): $\angle BAD = 180^\circ - 104^\circ = 76^\circ$.`, sol: r`Recognise the parallelogram, then use the opposite angle and the co-interior angle.`, scheme: [['ABCD is a parallelogram; angle ADC = 104 (opposite angles)', 1], ['angle BAD = 180 - 104 = 76 (co-interior angles)', 1]], d: 2, c: 'understanding', t: [1], time: 90 }), (C) => { const o = G.onePairProof(p.A, p.B, p.C, p.D); C.assert(near(interior(V(p), 1), 104) && near(interior(V(p), 3), 104) && near(o.angA, 76), 'B = D = 104, A = 76'); C.model([104, 76]); });
}
{
  const p = paraSA(7, 5, 65);
  Q('s203', mk.short({ marks: 2, stem: r`Meera says: "In the parallelogram $ABCD$, $\angle A = 65^\circ$, so $\angle B = 65^\circ$ as well, because the angles at the two ends of $AB$ are equal." Find her mistake and give the correct $\angle B$.`, model: r`The angles $\angle A$ and $\angle B$ are neighbouring angles, which are co-interior angles between the parallel sides $AD$ and $BC$, so they are not equal: they add up to $180^\circ$. It is the opposite angles ($\angle A$ and $\angle C$) that are equal.

Correct value: $\angle B = 180^\circ - 65^\circ = 115^\circ$.`, sol: r`Neighbouring angles are supplementary; opposite angles are equal.`, scheme: [['Mistake: neighbouring angles add to 180, they are not equal', 1], ['angle B = 180 - 65 = 115', 1]], d: 3, c: 'analysis', t: [1], time: 90 }), (C) => { C.assert(near(p.angA, 65) && near(p.angB, 115) && !near(p.angA, p.angB), 'B = 115, not 65'); C.model([115, 65]); });
}
{
  const p = paraDiag(16.4, 9.8, 65);
  Q('s204', mk.short({ marks: 2, stem: r`The crossing wires of a parallelogram-shaped lampshade $ABCD$ meet at $O$, with $AC = 16.4$ cm and $BD = 9.8$ cm. Find $OA$ and $OB$, and name the property you use.`, model: r`The diagonals of a parallelogram bisect each other.

So $OA = \dfrac{1}{2} \times 16.4 = 8.2$ cm and $OB = \dfrac{1}{2} \times 9.8 = 4.9$ cm.`, sol: r`$O$ is the mid-point of both diagonals.`, scheme: [['Property: the diagonals bisect each other', 1], ['OA = 8.2 cm and OB = 4.9 cm', 1]], d: 1, c: 'understanding', t: [2], time: 60 }), (C) => { C.assert(near(dist(p.A, p.O), 8.2) && near(dist(p.B, p.O), 4.9) && isMid(p.O, p.A, p.C) && isMid(p.O, p.B, p.D), 'OA = 8.2, OB = 4.9'); C.model([8.2, 4.9]); });
}
{
  const p = paraTri(7, 4, 6);
  Q('s205', mk.short({ marks: 2, stem: r`The diagonals of a parallelogram $ABCD$ meet at $O$. $AB = 6$ cm and the perimeter of $\triangle AOB$ is $17$ cm. Find the sum $AC + BD$ of the two diagonals.`, model: r`$OA + OB = 17 - 6 = 11$ cm. The diagonals bisect each other, so $AC = 2 \times OA$ and $BD = 2 \times OB$.

Hence $AC + BD = 2(OA + OB) = 2 \times 11 = 22$ cm.`, sol: r`Each diagonal is twice its half, so the sum of the diagonals is twice $OA + OB$.`, scheme: [['OA + OB = 17 - 6 = 11', 1], ['AC + BD = 2 x 11 = 22 cm (diagonals bisect each other)', 1]], d: 3, c: 'application', t: [2], time: 90 }), (C) => { C.assert(near(p.ab, 6) && near(perimeter(p.A, p.O, p.B), 17) && near(p.ac + p.bd, 22), 'perimeter 17, diagonals sum 22'); C.model([11, 22]); });
}
{
  const rh = rhombusD(48, 20);
  Q('s206', mk.short({ marks: 2, stem: r`The diagonals of a rhombus-shaped garden plot $ABCD$ are $AC = 48$ m and $BD = 20$ m and cross at $O$. Find the length of a side of the plot.`, model: r`The diagonals of a rhombus bisect each other at right angles, so $OA = 24$ m, $OB = 10$ m and $\angle AOB = 90^\circ$.

$AB^2 = 24^2 + 10^2 = 576 + 100 = 676$, so $AB = 26$ m.`, sol: r`Use the right angle at $O$ and the theorem of Pythagoras.`, scheme: [['OA = 24, OB = 10, right angle at O', 1], ['AB squared = 676, AB = 26 m', 1]], d: 2, c: 'application', t: [3], time: 90 }), (C) => { C.assert(near(dist(rh.A, rh.O), 24) && near(dist(rh.B, rh.O), 10) && near(rh.side, 26), 'side 26'); C.model([24, 10, 26]); });
}
{
  const x = 7; const re = rectLB(15, Math.sqrt(27 * 27 - 15 * 15));
  Q('s207', mk.short({ marks: 2, stem: r`The diagonals of a rectangular frame $ABCD$ are $AC = (5x - 8)$ cm and $BD = (3x + 6)$ cm. Find $x$, and the length $OA$ where $O$ is the point at which the diagonals meet.`, model: r`The diagonals of a rectangle are equal: $5x - 8 = 3x + 6$, so $x = 7$ and $AC = 5(7) - 8 = 27$ cm.

The diagonals bisect each other, so $OA = \dfrac{27}{2} = 13.5$ cm.`, sol: r`Equal diagonals give $x$; then $O$ is the mid-point of $AC$.`, scheme: [['5x - 8 = 3x + 6, x = 7, AC = 27 cm', 1], ['OA = 13.5 cm (diagonals bisect each other)', 1]], d: 3, c: 'application', t: [3], time: 100 }), (C) => { C.assert(5 * x - 8 === 3 * x + 6 && near(re.ac, 27) && near(re.bd, 27) && near(dist(re.O, re.A), 13.5), 'x = 7, AC = BD = 27, OA = 13.5'); C.model([7, 27, 13.5]); });
}
{
  const sq = squareS(5);
  Q('s208', mk.short({ marks: 2, stem: r`$PQRS$ is a square whose diagonals meet at $O$. Find $\angle PRS$ and $\angle POQ$, with a reason for each.`, model: r`A diagonal of a square bisects the right angle at the corner, so $\angle PRS = \dfrac{90^\circ}{2} = 45^\circ$.

The diagonals of a square meet at right angles, so $\angle POQ = 90^\circ$.`, sol: r`A square is a rhombus (diagonals perpendicular) and bisects the corner angles (45 degrees each).`, scheme: [['angle PRS = 45 (diagonal bisects the right angle)', 1], ['angle POQ = 90 (diagonals meet at right angles)', 1]], d: 2, c: 'understanding', t: [3], time: 75 }), (C) => { C.assert(near(ang(sq.A, sq.C, sq.D), 45) && near(angDeg(sq.O, sq.A, sq.B), 90), 'PRS = 45, POQ = 90'); C.model([45, 90]); });
}

// ---------------------------------------------------------------- short answers, 3 marks
{
  const p = paraSA(9, 5.5, 63);
  Q('s301', mk.short({ marks: 3, stem: r`In the parallelogram $ABCD$, the sides satisfy $AD \parallel BC$ and $AB \parallel DC$. Use these two facts to prove that $\angle A = \angle C$ and $\angle B = \angle D$.`, model: r`$AD \parallel BC$ with the transversal $AB$: $\angle A + \angle B = 180^\circ$ (co-interior angles).

$AB \parallel DC$ with the transversal $BC$: $\angle B + \angle C = 180^\circ$ (co-interior angles).

So $\angle A + \angle B = \angle B + \angle C$, which gives $\angle A = \angle C$. In the same way, $\angle B + \angle C = 180^\circ = \angle C + \angle D$ gives $\angle B = \angle D$.`, sol: r`Two pairs of co-interior angles, each adding to $180^\circ$, share the angle $\angle B$ (and $\angle C$).`, scheme: [['angle A + angle B = 180 (AD parallel to BC)', 1], ['angle B + angle C = 180 (AB parallel to DC)', 1], ['hence angle A = angle C, and in the same way angle B = angle D', 1]], d: 3, c: 'analysis', t: [1], time: 150 }), (C) => { const v = V(p); G.oppAnglesProof(...v); C.assert(near(interior(v, 0) + interior(v, 1), 180) && near(interior(v, 1) + interior(v, 2), 180) && near(interior(v, 2) + interior(v, 3), 180), 'three co-interior pairs add to 180'); C.model(['co-interior', 'transversal', '180']); });
}
{
  const p = paraSA(8, 5, 58);
  Q('s302', mk.short({ marks: 3, stem: r`The diagonals $AC$ and $BD$ of the parallelogram $ABCD$ cross at $O$. Show that $OA = OC$ and $OB = OD$.`, model: r`Compare $\triangle AOB$ and $\triangle COD$.

$AB = CD$ (opposite sides of a parallelogram). $\angle OAB = \angle OCD$ (alternate angles, $AB \parallel DC$, transversal $AC$) and $\angle OBA = \angle ODC$ (alternate angles, transversal $BD$).

So $\triangle AOB \cong \triangle COD$ (angle side angle). Hence $OA = OC$ and $OB = OD$ (corresponding parts), so the diagonals bisect each other.`, sol: r`The alternate angles come from $AB \parallel DC$; the equal sides $AB = CD$ complete the angle-side-angle match.`, scheme: [['AB = CD and the two pairs of alternate angles equal', 1], ['triangles AOB and COD congruent (angle side angle)', 1], ['OA = OC and OB = OD (corresponding parts)', 1]], d: 3, c: 'analysis', t: [2], time: 150 }), (C) => { const q = G.diagProof(p.A, p.B, p.C, p.D); C.assert(near(dist(q.O, q.A), dist(q.O, q.C)) && near(dist(q.O, q.B), dist(q.O, q.D)), 'OA = OC, OB = OD'); C.model(['alternate', 'angle side angle', 'OA = OC']); });
}
{
  const p = paraSA(6.4, 4.2, 68);
  Q('s303', mk.short({ marks: 3, stem: r`A parallelogram-shaped sheet $ABCD$ is cut along its diagonal $AC$. Show that the two pieces, $\triangle ABC$ and $\triangle CDA$, are congruent, giving the reason for each matching pair of parts.`, model: r`In $\triangle ABC$ and $\triangle CDA$:

$\angle BAC = \angle DCA$ (alternate angles, $AB \parallel DC$, transversal $AC$);

$AC = CA$ (common side);

$\angle BCA = \angle DAC$ (alternate angles, $AD \parallel BC$, transversal $AC$).

So $\triangle ABC \cong \triangle CDA$ (angle side angle).`, sol: r`Two pairs of alternate angles and the common diagonal give angle side angle.`, scheme: [['angle BAC = angle DCA (alternate angles, AB parallel to DC)', 1], ['AC common to both triangles', 1], ['angle BCA = angle DAC (alternate, AD parallel to BC): congruent', 1]], d: 3, c: 'analysis', t: [2], time: 150 }), (C) => { C.assert(parallel(p.A, p.B, p.D, p.C) && parallel(p.A, p.D, p.B, p.C) && near(ang(p.B, p.A, p.C), ang(p.D, p.C, p.A)) && near(ang(p.B, p.C, p.A), ang(p.D, p.A, p.C)) && G.congruentSSS([p.A, p.B, p.C], [p.C, p.D, p.A]), 'ASA match and congruent'); C.model(['alternate', 'common', 'angle side angle']); });
}
{
  const rh = rhombusD(16, 12);
  Q('s304', mk.short({ marks: 3, stem: r`The diagonals of a rhombus $ABCD$ meet at $O$. Prove that they cross each other at right angles.`, model: r`The diagonals of a rhombus bisect each other, so $OB = OD$.

In $\triangle AOB$ and $\triangle AOD$: $AB = AD$ (sides of a rhombus), $OB = OD$ and $AO$ is common. So $\triangle AOB \cong \triangle AOD$ (side side side), and $\angle AOB = \angle AOD$.

These two angles lie on the straight line $BD$, so they add up to $180^\circ$. Each is $90^\circ$, so $AC \perp BD$.`, sol: r`Congruent triangles give equal angles at $O$; a straight line then forces each to be $90^\circ$.`, scheme: [['OB = OD (diagonals bisect each other), AB = AD, AO common', 1], ['triangles AOB and AOD congruent (side side side), so angle AOB = angle AOD', 1], ['angles on a straight line add to 180, so each is 90 degrees', 1]], d: 3, c: 'analysis', t: [3], time: 150 }), (C) => { const q = G.rhombusProof(rh.A, rh.B, rh.C, rh.D); C.assert(near(angDeg(q.O, q.A, q.B), 90) && near(angDeg(q.O, q.A, q.B) + angDeg(q.O, q.A, q.D), 180), 'right angle at O'); C.model(['side side side', '180', '90']); });
}
{
  const p = paraSA(6, 6, 64); const rh = rhombus(...V(p));
  Q('s305', mk.short({ marks: 3, stem: r`In a rhombus-shaped kite $ABCD$, drawn by Kabir for a festival, $\angle DAB = 64^\circ$. Find $\angle ABC$, $\angle CAB$ and $\angle ABD$, giving a reason for each.`, model: r`$\angle ABC = 180^\circ - 64^\circ = 116^\circ$ (neighbouring angles of a parallelogram add up to $180^\circ$).

The diagonal $AC$ bisects $\angle A$ in a rhombus, so $\angle CAB = \dfrac{64^\circ}{2} = 32^\circ$.

The diagonal $BD$ bisects $\angle B$, so $\angle ABD = \dfrac{116^\circ}{2} = 58^\circ$.`, sol: r`Co-interior angles, then the diagonals bisect the angles of a rhombus.`, scheme: [['angle ABC = 116 (co-interior angles)', 1], ['angle CAB = 32 (diagonal bisects angle A)', 1], ['angle ABD = 58 (diagonal bisects angle B)', 1]], d: 2, c: 'application', t: [3], time: 120 }), (C) => { C.assert(rh.side > 0 && near(p.angB, 116) && near(ang(p.B, p.A, p.C), 32) && near(ang(p.A, p.B, p.D), 58), '116, 32, 58'); C.model([116, 32, 58]); });
}
{
  const sq = squareS(6);
  Q('s306', mk.short({ marks: 3, stem: r`Explain why the two diagonals of a square are equal and meet at right angles, using what you know about the rectangle and the rhombus.`, model: r`A square is a rectangle (four right angles), and the diagonals of a rectangle are equal. So the diagonals of a square are equal.

A square is also a rhombus (four equal sides), and the diagonals of a rhombus meet at right angles.

So the diagonals of a square are equal and perpendicular, and they bisect each other because a square is a parallelogram.`, sol: r`A square belongs to both families, so it inherits the diagonal property of each.`, scheme: [['a square is a rectangle, so its diagonals are equal', 1], ['a square is a rhombus, so its diagonals meet at right angles', 1], ['a square is a parallelogram, so the diagonals bisect each other', 1]], d: 3, c: 'analysis', t: [3], time: 120 }), (C) => { C.assert(near(sq.ac, sq.bd) && near(angDeg(sq.O, sq.A, sq.B), 90) && isMid(sq.O, sq.A, sq.C), 'equal, perpendicular, bisecting'); C.model(['rectangle', 'rhombus', 'bisect']); });
}

// ---------------------------------------------------------------- long answers, 10 marks
{
  const x = 20; const p = paraSA(9.5, 6.2, 72);
  Q('l01', mk.long({ marks: 10, stem: r`$ABCD$ is a parallelogram.

(a) Prove that $\angle A = \angle C$. [3]

(b) If $\angle A = (3x + 12)^\circ$ and $\angle C = (5x - 28)^\circ$, find $x$ and all four angles of the parallelogram. [3]

(c) The parallelogram is a cloth patch with $AB = 9.5$ cm and $BC = 6.2$ cm. A tailor sews lace round all four edges at ₹ 3 per cm. Find the length of lace and its cost. [4]`, model: r`(a) $AD \parallel BC$ with the transversal $AB$: $\angle A + \angle B = 180^\circ$ (co-interior angles). $AB \parallel DC$ with the transversal $BC$: $\angle B + \angle C = 180^\circ$. So $\angle A + \angle B = \angle B + \angle C$ and $\angle A = \angle C$.

(b) Opposite angles are equal: $3x + 12 = 5x - 28$, so $2x = 40$ and $x = 20$. Then $\angle A = \angle C = 72^\circ$ and $\angle B = \angle D = 180^\circ - 72^\circ = 108^\circ$.

(c) The opposite sides are equal, so $CD = 9.5$ cm and $AD = 6.2$ cm. The length of lace is the perimeter $2(9.5 + 6.2) = 2 \times 15.7 = 31.4$ cm. The cost is $31.4 \times 3 = $ ₹ 94.20.`, sol: r`Part (a) uses two pairs of co-interior angles; part (b) uses opposite angles equal and neighbouring angles supplementary; part (c) uses opposite sides equal for the perimeter.`, scheme: [['(a) A + B = 180 (AD parallel to BC) and B + C = 180 (AB parallel to DC)', 2], ['(a) hence angle A = angle C', 1], ['(b) 3x + 12 = 5x - 28, so x = 20', 1], ['(b) angle A = angle C = 72, angle B = angle D = 108', 2], ['(c) CD = 9.5 and AD = 6.2 (opposite sides equal); perimeter 31.4 cm', 2], ['(c) cost 31.4 x 3 = 94.20 rupees', 2]], d: 3, c: 'application', t: [1], time: 540 }), (C) => {
    C.assert(G.oppAnglesProof(...V(p)).per > 0 && 3 * x + 12 === 5 * x - 28 && near(p.angA, 72) && near(interior(V(p), 2), 72) && near(p.angB, 108) && near(interior(V(p), 3), 108), 'x = 20: 72, 108, 72, 108');
    C.assert(near(p.per, 31.4) && near(p.per * 3, 94.2), 'perimeter 31.4, cost 94.2'); C.model([20, 72, 108, 31.4, 94.2, 'co-interior']);
  });
}
{
  const t = triASA(8.4, 38, 112); const A = t.A, B = t.B, Cc = t.C, D = sub(add(A, Cc), B);
  Q('l02', mk.long({ marks: 10, stem: r`In a quadrilateral $ABCD$, $AB \parallel DC$ and $AB = DC$. The diagonal $AC$ is joined.

(a) Prove that $\triangle ABC \cong \triangle CDA$. [3]

(b) Hence prove that $\angle B = \angle D$ and that $AD \parallel BC$. [3]

(c) $AB = 8.4$ cm, $\angle ABC = 112^\circ$ and $\angle BAC = 38^\circ$. Find $\angle ACB$, $\angle DAC$ and $\angle BAD$, and state the length of $CD$. [4]`, model: r`(a) In $\triangle ABC$ and $\triangle CDA$: $AB = CD$ (given); $\angle BAC = \angle DCA$ (alternate angles, $AB \parallel DC$, transversal $AC$); $AC$ is common. So $\triangle ABC \cong \triangle CDA$ (side angle side).

(b) By corresponding parts of congruent triangles, $\angle B = \angle D$ and $\angle BCA = \angle DAC$. The angles $\angle BCA$ and $\angle DAC$ are alternate angles for the lines $BC$ and $AD$ with the transversal $AC$, and they are equal, so $AD \parallel BC$. Thus $ABCD$ is a parallelogram.

(c) In $\triangle ABC$: $\angle ACB = 180^\circ - 112^\circ - 38^\circ = 30^\circ$. Then $\angle DAC = \angle ACB = 30^\circ$ (corresponding parts), and $\angle BAD = \angle BAC + \angle DAC = 38^\circ + 30^\circ = 68^\circ$. Also $CD = AB = 8.4$ cm.`, sol: r`Part (a) is the side-angle-side match from the alternate angles; part (b) reads off equal angles and then proves the second pair of sides parallel; part (c) is an angle sum in $\triangle ABC$ followed by the corresponding parts.`, scheme: [['(a) AB = CD and angle BAC = angle DCA (alternate angles)', 2], ['(a) AC common, so congruent (side angle side)', 1], ['(b) angle B = angle D (corresponding parts)', 1], ['(b) angle BCA = angle DAC alternate, so AD parallel to BC', 2], ['(c) angle ACB = 180 - 112 - 38 = 30, angle DAC = 30', 2], ['(c) angle BAD = 38 + 30 = 68, and CD = 8.4 cm', 2]], d: 4, c: 'analysis', t: [1], time: 540 }), (C) => {
    const o = G.onePairProof(A, B, Cc, D); const v = [A, B, Cc, D];
    C.assert(near(dist(A, B), 8.4) && near(interior(v, 1), 112) && near(ang(B, A, Cc), 38) && near(ang(B, Cc, A), 30) && near(ang(D, A, Cc), 30) && near(interior(v, 0), 68) && near(dist(Cc, D), 8.4) && o.per > 0, 'angles 30, 30, 68 and CD = 8.4'); C.model([30, 68, 8.4, 112, 38]);
  });
}
{
  const p = paraTri(12, 6, 10.8); // AB = 10.8, BC = 15.6, AC = 24, BD = 12
  const pAOB = perimeter(p.A, p.O, p.B), pBOC = perimeter(p.B, p.O, p.C);
  Q('l03', mk.long({ marks: 10, stem: r`The diagonals $AC$ and $BD$ of a parallelogram $ABCD$ meet at $O$.

(a) Prove that $OA = OC$ and $OB = OD$. [3]

(b) $AB = 10.8$ cm, $BC = 15.6$ cm, $AC = 24$ cm and $BD = 12$ cm. Find the perimeters of $\triangle AOB$ and $\triangle BOC$. [3]

(c) Find by how much the two perimeters differ, and explain why the difference equals $BC - AB$. Also explain why $\triangle AOB$ and $\triangle BOC$ have equal areas. [4]`, model: r`(a) In $\triangle AOB$ and $\triangle COD$: $AB = CD$ (opposite sides); $\angle OAB = \angle OCD$ and $\angle OBA = \angle ODC$ (alternate angles, $AB \parallel DC$). So $\triangle AOB \cong \triangle COD$ (angle side angle) and $OA = OC$, $OB = OD$.

(b) $OA = \dfrac{24}{2} = 12$ cm and $OB = \dfrac{12}{2} = 6$ cm. The perimeter of $\triangle AOB$ is $10.8 + 12 + 6 = 28.8$ cm. As $OC = 12$ cm, the perimeter of $\triangle BOC$ is $15.6 + 12 + 6 = 33.6$ cm.

(c) The difference is $33.6 - 28.8 = 4.8$ cm. The triangles share the side $OB$ and have $OA = OC$, so the perimeters differ only in the third side: $BC - AB = 15.6 - 10.8 = 4.8$ cm.

The triangles $AOB$ and $BOC$ have equal bases $OA = OC$ on the line $AC$ and the same height, the perpendicular distance from $B$ to $AC$. So their areas are equal.`, sol: r`Part (a) is the angle-side-angle match; parts (b) and (c) use that the diagonals bisect each other, so each half-diagonal is shared or equal.`, scheme: [['(a) AB = CD and two pairs of alternate angles', 1], ['(a) triangles AOB and COD congruent (angle side angle)', 1], ['(a) OA = OC and OB = OD', 1], ['(b) OA = 12 and OB = 6', 1], ['(b) perimeters 28.8 cm and 33.6 cm', 2], ['(c) difference 4.8 = BC - AB (OB shared, OA = OC)', 2], ['(c) equal areas: equal bases OA = OC, same height from B', 2]], d: 4, c: 'analysis', t: [2], time: 540 }), (C) => {
    const q = G.diagProof(p.A, p.B, p.C, p.D);
    C.assert(near(p.ab, 10.8) && near(dist(p.B, p.C), 15.6) && near(p.ac, 24) && near(p.bd, 12) && near(q.O[0], 0), 'AB, BC, AC, BD');
    C.assert(near(pAOB, 28.8) && near(pBOC, 33.6) && near(pBOC - pAOB, 4.8) && near(dist(p.B, p.C) - dist(p.A, p.B), 4.8), 'perimeters 28.8, 33.6, difference 4.8 = BC - AB');
    C.assert(near(area(p.A, p.O, p.B), area(p.B, p.O, p.C)), 'equal areas'); C.model([12, 6, 28.8, 33.6, 4.8]);
  });
}
{
  const p = para([0, 0], [11, 0], [3.6, 4.8]); // AB = 11, AD = 6, C = (14.6, 4.8)
  const O = p.O; const P = [4.1, 0]; const Qp = [2 * O[0] - P[0], 2 * O[1] - P[1]];
  Q('l04', mk.long({ marks: 10, stem: r`The diagonals of a parallelogram $ABCD$ meet at $O$. A straight cut through $O$ meets $AB$ at $P$ and $DC$ at $Q$.

(a) Prove that $\triangle AOP \cong \triangle COQ$ and hence that $OP = OQ$. [3]

(b) Deduce that $AP = CQ$ and that $PB = DQ$. [3]

(c) $AB = 11$ cm, $AP = 4.1$ cm, $PQ = 8$ cm and $AD = 6$ cm. Find $CQ$, $DQ$ and the perimeter of the quadrilateral $APQD$. [4]`, model: r`(a) In $\triangle AOP$ and $\triangle COQ$: $OA = OC$ (the diagonals bisect each other); $\angle AOP = \angle COQ$ (vertically opposite angles); $\angle OAP = \angle OCQ$ (alternate angles, $AB \parallel DC$, transversal $AC$). So $\triangle AOP \cong \triangle COQ$ (angle side angle), and $OP = OQ$.

(b) $AP = CQ$ (corresponding parts of the congruent triangles). Since $AB = DC$ (opposite sides), $PB = AB - AP = DC - CQ = DQ$.

(c) $CQ = AP = 4.1$ cm. $DC = AB = 11$ cm, so $DQ = 11 - 4.1 = 6.9$ cm. The perimeter of $APQD$ is $AP + PQ + QD + DA = 4.1 + 8 + 6.9 + 6 = 25$ cm.`, sol: r`The centre $O$ of the parallelogram makes the cut symmetric: the congruent triangles move the segment $AP$ across to $CQ$.`, scheme: [['(a) OA = OC and vertically opposite angles equal', 1], ['(a) alternate angles OAP = OCQ, so congruent (angle side angle)', 1], ['(a) OP = OQ', 1], ['(b) AP = CQ (corresponding parts)', 1], ['(b) AB = DC, so PB = AB - AP = DC - CQ = DQ', 2], ['(c) CQ = 4.1 and DQ = 11 - 4.1 = 6.9', 2], ['(c) perimeter of APQD = 4.1 + 8 + 6.9 + 6 = 25 cm', 2]], d: 4, c: 'analysis', t: [2], time: 540 }), (C) => {
    C.assert(near(p.ab, 11) && near(p.ad, 6) && G.isMid(O, P, Qp) && parallel(P, Qp, P, O) && near(Qp[1], 4.8) && Qp[0] > p.D[0] && Qp[0] < p.C[0] && near(dist(P, Qp), 8), 'Q on DC, PQ = 8');
    C.assert(near(dist(p.A, P), 4.1) && near(dist(p.C, Qp), 4.1) && near(dist(p.D, Qp), 6.9) && near(dist(p.B, P), dist(p.D, Qp)) && near(perimeter(p.A, P, Qp, p.D), 25), 'AP = CQ = 4.1, DQ = 6.9, perimeter 25');
    C.assert(near(angDeg(O, p.A, P), angDeg(O, p.C, Qp)) && G.congruentSSS([p.A, O, P], [p.C, O, Qp]), 'triangles AOP and COQ congruent, alternate angles equal'); C.model([4.1, 6.9, 25, 8]);
  });
}
{
  const p = paraSA(6, 6, 64); const rh = rhombus(...V(p)); const rh2 = rhombusD(30, 16);
  Q('l05', mk.long({ marks: 10, stem: r`$ABCD$ is a rhombus with diagonals $AC$ and $BD$ meeting at $O$.

(a) Prove that the diagonal $BD$ bisects $\angle ABC$ and $\angle ADC$. [3]

(b) If $\angle ABC = 116^\circ$, find $\angle ABD$, $\angle BAD$ and $\angle BAC$. [3]

(c) If $AC = 30$ cm and $BD = 16$ cm, find the length of a side, the perimeter, and the area of the rhombus. [4]`, model: r`(a) In $\triangle ABD$ and $\triangle CBD$: $AB = CB$ and $AD = CD$ (sides of a rhombus), and $BD$ is common. So $\triangle ABD \cong \triangle CBD$ (side side side), and $\angle ABD = \angle CBD$, $\angle ADB = \angle CDB$. Thus $BD$ bisects $\angle ABC$ and $\angle ADC$.

(b) $\angle ABD = \dfrac{116^\circ}{2} = 58^\circ$. $\angle BAD = 180^\circ - 116^\circ = 64^\circ$ (co-interior angles), and $AC$ bisects $\angle A$, so $\angle BAC = \dfrac{64^\circ}{2} = 32^\circ$.

(c) The diagonals bisect each other at right angles: $OA = 15$ cm, $OB = 8$ cm. $AB^2 = 15^2 + 8^2 = 289$, so a side is $17$ cm and the perimeter is $4 \times 17 = 68$ cm. The rhombus is four right triangles with legs $15$ and $8$: area $= 4 \times \dfrac{1}{2} \times 15 \times 8 = 240$ cm$^{2}$.`, sol: r`Part (a) is a side-side-side match; part (b) uses the bisected angles; part (c) uses the right angle at $O$ and the four equal triangles.`, scheme: [['(a) AB = CB, AD = CD, BD common', 1], ['(a) congruent (side side side)', 1], ['(a) angle ABD = angle CBD and angle ADB = angle CDB', 1], ['(b) angle ABD = 58', 1], ['(b) angle BAD = 64 and angle BAC = 32', 2], ['(c) OA = 15, OB = 8, side 17 and perimeter 68', 2], ['(c) area = 4 x (1/2 x 15 x 8) = 240', 2]], d: 3, c: 'application', t: [1, 3], time: 540 }), (C) => {
    C.assert(rh.side > 0 && near(interior(V(p), 0), 64) && near(p.angB, 116) && near(ang(p.A, p.B, p.D), 58) && near(ang(p.B, p.A, p.C), 32) && G.congruentSSS([p.A, p.B, p.D], [p.C, p.B, p.D]), 'angles 58, 64, 32 and triangles ABD, CBD congruent');
    C.assert(near(rh2.ac, 30) && near(rh2.bd, 16) && near(rh2.side, 17) && near(rh2.per, 68) && near(rh2.area, 240), 'side 17, perimeter 68, area 240'); C.model([58, 64, 32, 15, 8, 17, 68, 240]);
  });
}
{
  const re = rectLB(20, 21);
  Q('l06', mk.long({ marks: 10, stem: r`$ABCD$ is a rectangle whose diagonals $AC$ and $BD$ meet at $O$.

(a) Prove that $AC = BD$. [3]

(b) Hence show that $OA = OB = OC = OD$. [3]

(c) $AB = 20$ cm and $BC = 21$ cm. Find $AC$, and the perimeters of $\triangle AOB$ and $\triangle BOC$. [4]`, model: r`(a) In $\triangle ABC$ and $\triangle DCB$: $AB = DC$ (opposite sides of a rectangle); $\angle ABC = \angle DCB = 90^\circ$; $BC$ is common. So $\triangle ABC \cong \triangle DCB$ (side angle side) and $AC = DB$.

(b) A rectangle is a parallelogram, so its diagonals bisect each other: $OA = OC = \dfrac{1}{2}AC$ and $OB = OD = \dfrac{1}{2}BD$. Since $AC = BD$, all four are equal: $OA = OB = OC = OD$.

(c) In the right triangle $ABC$: $AC^2 = 20^2 + 21^2 = 400 + 441 = 841$, so $AC = 29$ cm. Then $OA = OB = 14.5$ cm. The perimeter of $\triangle AOB$ is $20 + 14.5 + 14.5 = 49$ cm. The perimeter of $\triangle BOC$ is $21 + 14.5 + 14.5 = 50$ cm.`, sol: r`Part (a) is a side-angle-side match using the right angles; part (b) combines it with the bisecting diagonals; part (c) uses the theorem of Pythagoras.`, scheme: [['(a) AB = DC and angle ABC = angle DCB = 90', 2], ['(a) BC common, congruent (side angle side), so AC = BD', 1], ['(b) diagonals bisect each other: OA = OC = half of AC, OB = OD = half of BD', 2], ['(b) AC = BD, so all four are equal', 1], ['(c) AC squared = 841, AC = 29, OA = OB = 14.5', 2], ['(c) perimeters 49 cm and 50 cm', 2]], d: 3, c: 'application', t: [3], time: 540 }), (C) => {
    const q = G.rectProof(re.A, re.B, re.C, re.D);
    C.assert(near(q.ac, 29) && near(dist(q.O, q.A), 14.5) && [q.A, q.B, q.C, q.D].every((P) => near(dist(q.O, P), 14.5)), 'AC = 29, OA = OB = OC = OD = 14.5');
    C.assert(near(perimeter(q.A, q.O, q.B), 49) && near(perimeter(q.B, q.O, q.C), 50), 'perimeters 49 and 50'); C.model([29, 14.5, 49, 50, 841]);
  });
}
void fig; void mid;
