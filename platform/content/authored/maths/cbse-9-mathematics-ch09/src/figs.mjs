// Figures of CBSE 9 Mathematics ch09 Triangles. Every coordinate is computed (constructions from sides or angles, rigid moves for the
// congruent copies) and asserted: equal sides and angles are checked numerically, labelled lengths are drawn to scale (1 unit = 1 cm
// or 1 m), and each labelled angle is measured by the lint against the drawn coordinates.
import { fig, polar, angleAt, must, close, dist } from './h.mjs';
import { move, flip, triASA, triSSS, foot, sameParts, parts, midpoint, ssaSides } from './g.mjs';

const rad = (d) => (d * Math.PI) / 180;
const pt = (at, label_position, label) => ({ at, ...(label_position ? { label_position } : {}), ...(label !== undefined ? { label } : {}) });

// ---- a 4-gon frame that wobbles, and a triangle that does not
const c70 = Math.cos(rad(70)), s70 = Math.sin(rad(70));
const rect = [[0, 0], [4, 0], [4, 3], [0, 3]];
const lean = [[0, 0], [4, 0], [4 + 3 * c70, 3 * s70], [3 * c70, 3 * s70]];
const triW = triSSS(4, 5, 3).map((p) => [p[0] + 8, p[1]]);
must(rect.every((p, i) => close(dist(p, rect[(i + 1) % 4]), [4, 3, 4, 3][i])) && lean.every((p, i) => close(dist(p, lean[(i + 1) % 4]), [4, 3, 4, 3][i])), 'same four side lengths');
must(close(dist(rect[0], rect[2]), 5) && !close(dist(lean[0], lean[2]), 5), 'the diagonals differ');
must(close(angleAt([0, 0], [4, 0], lean[3]), 70) && close(angleAt(rect[1], rect[0], rect[2]), 90), 'wobble angles');
must(close(dist(triW[1], triW[2]), 4) && close(dist(triW[2], triW[0]), 5) && close(dist(triW[0], triW[1]), 3) && close(angleAt(triW[1], triW[2], triW[0]), 90), 'triangle 3 4 5');
must(sameParts(triSSS(4, 5, 3), flip(triSSS(4, 5, 3), 40, 1, 1).map((p) => p)), 'the same three sticks always give the same triangle');
export const fWobble = fig({
  points: { P: pt(rect[0], 'sw'), Q: pt(rect[1], 'se'), R: pt(rect[2], 'ne'), S: pt(rect[3], 'nw'), R2: pt(lean[2], 'ne', 'R′'), S2: pt(lean[3], 'n', 'S′'), U: pt(triW[0], 'n'), V: pt(triW[1], 'sw'), W: pt(triW[2], 'se') },
  segments: [
    { from: 'P', to: 'Q', label: '4 cm' }, { from: 'Q', to: 'R', label: '3 cm' }, { from: 'R', to: 'S' }, { from: 'S', to: 'P' },
    { from: 'Q', to: 'R2', dashed: true }, { from: 'R2', to: 'S2', dashed: true }, { from: 'S2', to: 'P', dashed: true },
    { from: 'V', to: 'W', label: '4 cm' }, { from: 'W', to: 'U', label: '5 cm' }, { from: 'U', to: 'V', label: '3 cm' },
  ],
  angles: [{ at: 'Q', from: 'P', to: 'R', right: true }, { at: 'P', from: 'Q', to: 'S2', label: '70°' }, { at: 'V', from: 'W', to: 'U', right: true }],
}, 'Left: a rectangular frame with sides 4 and 3 centimetres, and the same four bars leaning over, dashed, so that the angle at P is 70 degrees instead of 90 degrees: the four-bar frame changes shape. Right: a triangle made of bars of 3, 4 and 5 centimetres, which can only have one shape.', 'The same four bars make many shapes, but three bars make only one triangle.');

// ---- bracing a 4-gon with a diagonal
must(close(dist(rect[0], rect[2]), 5) && close(dist(rect[1], rect[3]), 5), 'diagonal 5');
export const fBrace = fig({
  points: { A: pt(rect[0], 'sw'), B: pt(rect[1], 'se'), C: pt(rect[2], 'ne'), D: pt(rect[3], 'nw') },
  segments: [{ from: 'A', to: 'B', ticks: 1, label: '4 cm' }, { from: 'B', to: 'C', ticks: 2, label: '3 cm' }, { from: 'C', to: 'D', ticks: 1 }, { from: 'D', to: 'A', ticks: 2 }, { from: 'A', to: 'C', ticks: 3, label: '5 cm' }],
  angles: [{ at: 'B', from: 'A', to: 'C', right: true }, { at: 'D', from: 'C', to: 'A', right: true }],
}, 'A rectangular frame ABCD with sides 4 and 3 centimetres and a diagonal brace AC of 5 centimetres. The brace splits the frame into two triangles ABC and CDA, whose three sides match one for one, marked with one, two and three ticks.', 'The brace AC makes two rigid triangles.');

// ---- congruent triangles and the correspondence ABC <-> PQR (ASA data 50, 60, 70)
const T1 = triASA(6, 50, 60);
const T1b = move(T1, 20, 8, 1.5);
must(sameParts(T1, T1b) && close(angleAt(T1[1], T1[2], T1[0]), 50) && close(angleAt(T1[2], T1[1], T1[0]), 60) && close(angleAt(T1[0], T1[1], T1[2]), 70), 'congruent copy');
const congMarks = (A, B, C) => ({
  segments: [{ from: B, to: C, ticks: 1 }, { from: C, to: A, ticks: 2 }, { from: A, to: B, ticks: 3 }],
});
export const fCong = fig({
  points: { A: pt(T1[0], 'n'), B: pt(T1[1], 'sw'), C: pt(T1[2], 'se'), P: pt(T1b[0], 'n'), Q: pt(T1b[1], 'sw'), R: pt(T1b[2], 'se') },
  segments: [...congMarks('A', 'B', 'C').segments, ...congMarks('P', 'Q', 'R').segments],
  angles: [
    { at: 'B', from: 'C', to: 'A', label: '50°', arcs: 1 }, { at: 'C', from: 'B', to: 'A', label: '60°', arcs: 2 }, { at: 'A', from: 'B', to: 'C', label: '70°', arcs: 3 },
    { at: 'Q', from: 'R', to: 'P', label: '50°', arcs: 1 }, { at: 'R', from: 'Q', to: 'P', label: '60°', arcs: 2 }, { at: 'P', from: 'Q', to: 'R', label: '70°', arcs: 3 },
  ],
}, 'Two triangles ABC and PQR. The second is an exact copy of the first, moved and turned. The angles at B and Q are 50 degrees, at C and R 60 degrees and at A and P 70 degrees; the sides BC and QR carry one tick, CA and RP two ticks, AB and PQ three ticks.', 'Triangle ABC is congruent to triangle PQR, with A matching P, B matching Q and C matching R.');

// ---- SAS: AB = PQ = 5, AC = PR = 4, angle A = angle P = 55
const sasA = [0, 0], sasB = polar(sasA, 5, 0), sasC = polar(sasA, 4, 55);
const S1 = [sasA, sasB, sasC], S1b = move(S1, 25, 7, 1);
must(close(angleAt(S1[0], S1[1], S1[2]), 55) && close(dist(S1b[0], S1b[1]), 5) && close(dist(S1b[0], S1b[2]), 4) && close(angleAt(S1b[0], S1b[1], S1b[2]), 55) && close(dist(S1[1], S1[2]), dist(S1b[1], S1b[2])), 'SAS: the third sides agree');
export const fSAS = fig({
  points: { A: pt(S1[0], 'sw'), B: pt(S1[1], 'se'), C: pt(S1[2], 'n'), P: pt(S1b[0], 'sw'), Q: pt(S1b[1], 'se'), R: pt(S1b[2], 'n') },
  segments: [{ from: 'A', to: 'B', ticks: 1, label: '5 cm' }, { from: 'A', to: 'C', ticks: 2, label: '4 cm' }, { from: 'B', to: 'C', label: '?' }, { from: 'P', to: 'Q', ticks: 1, label: '5 cm' }, { from: 'P', to: 'R', ticks: 2, label: '4 cm' }, { from: 'Q', to: 'R', label: '?' }],
  angles: [{ at: 'A', from: 'B', to: 'C', label: '55°', arcs: 1 }, { at: 'P', from: 'Q', to: 'R', label: '55°', arcs: 1 }],
}, 'Two triangles ABC and PQR. In each, one side is 5 centimetres, another side is 4 centimetres and the angle between them is 55 degrees. The third sides BC and QR are marked with question marks: they must be equal too.', 'Two sides and the angle between them are equal, so the triangles are congruent.');

// ---- SSS: sides 7, 6, 5, the second triangle turned over
const T3 = triSSS(7, 6, 5), T3b = flip(T3, 15, 9, 0.5);
must(sameParts(T3, T3b) && close(dist(T3[1], T3[2]), 7) && close(dist(T3[2], T3[0]), 6) && close(dist(T3[0], T3[1]), 5), 'SSS copy');
export const fSSS = fig({
  points: { A: pt(T3[0], 'n'), B: pt(T3[1], 'sw'), C: pt(T3[2], 'se'), P: pt(T3b[0], 'n'), Q: pt(T3b[1], 'sw'), R: pt(T3b[2], 'se') },
  segments: [{ from: 'B', to: 'C', ticks: 1, label: '7 cm' }, { from: 'C', to: 'A', ticks: 2, label: '6 cm' }, { from: 'A', to: 'B', ticks: 3, label: '5 cm' }, { from: 'Q', to: 'R', ticks: 1, label: '7 cm' }, { from: 'R', to: 'P', ticks: 2, label: '6 cm' }, { from: 'P', to: 'Q', ticks: 3, label: '5 cm' }],
  angles: [{ at: 'B', from: 'C', to: 'A', arcs: 1 }, { at: 'C', from: 'B', to: 'A', arcs: 2 }, { at: 'A', from: 'B', to: 'C', arcs: 3 }, { at: 'Q', from: 'R', to: 'P', arcs: 1 }, { at: 'R', from: 'Q', to: 'P', arcs: 2 }, { at: 'P', from: 'Q', to: 'R', arcs: 3 }],
}, 'Two triangles ABC and PQR with sides of 7, 6 and 5 centimetres. The second is the mirror image of the first. The angles at B and Q have one arc, those at C and R two arcs and those at A and P three arcs: all three pairs of angles come out equal.', 'Three equal sides make the triangles congruent, even if one is turned over.');

// ---- ASA: angles 40 and 75 on a side of 6 (so the third angle is 65)
const T4 = triASA(6, 40, 75), T4b = move(T4, -15, 8, 1);
must(close(angleAt(T4[0], T4[1], T4[2]), 65) && sameParts(T4, T4b), 'ASA copy');
export const fASA = fig({
  points: { A: pt(T4[0], 'n'), B: pt(T4[1], 'sw'), C: pt(T4[2], 'se'), P: pt(T4b[0], 'n'), Q: pt(T4b[1], 'sw'), R: pt(T4b[2], 'se') },
  segments: [{ from: 'A', to: 'B' }, { from: 'A', to: 'C' }, { from: 'B', to: 'C', ticks: 1, label: '6 cm' }, { from: 'P', to: 'Q' }, { from: 'P', to: 'R' }, { from: 'Q', to: 'R', ticks: 1, label: '6 cm' }],
  angles: [{ at: 'B', from: 'C', to: 'A', label: '40°', arcs: 1 }, { at: 'C', from: 'B', to: 'A', label: '75°', arcs: 2 }, { at: 'Q', from: 'R', to: 'P', label: '40°', arcs: 1 }, { at: 'R', from: 'Q', to: 'P', label: '75°', arcs: 2 }],
}, 'Two triangles ABC and PQR. In each, the side BC or QR is 6 centimetres, and the angles at its two ends are 40 degrees and 75 degrees. The side lies between the two angles.', 'Two angles and the side between them are equal: ASA.');

// ---- AAS: angles 48 (at B) and 72 (at A), side BC = 7 opposite A; the third angle at C is forced to be 60
const T5 = triASA(7, 48, 60), T5b = move(T5, 30, 8, 0);
must(close(angleAt(T5[0], T5[1], T5[2]), 72) && sameParts(T5, T5b), 'AAS copy');
export const fAAS = fig({
  points: { A: pt(T5[0], 'n'), B: pt(T5[1], 'sw'), C: pt(T5[2], 'se'), P: pt(T5b[0], 'n'), Q: pt(T5b[1], 'sw'), R: pt(T5b[2], 'se') },
  segments: [{ from: 'A', to: 'B' }, { from: 'A', to: 'C' }, { from: 'B', to: 'C', ticks: 1, label: '7 cm' }, { from: 'P', to: 'Q' }, { from: 'P', to: 'R' }, { from: 'Q', to: 'R', ticks: 1, label: '7 cm' }],
  angles: [{ at: 'B', from: 'C', to: 'A', label: '48°', arcs: 1 }, { at: 'A', from: 'B', to: 'C', label: '72°', arcs: 2 }, { at: 'C', from: 'B', to: 'A', label: '60°', arcs: 3 }, { at: 'Q', from: 'R', to: 'P', label: '48°', arcs: 1 }, { at: 'P', from: 'Q', to: 'R', label: '72°', arcs: 2 }, { at: 'R', from: 'Q', to: 'P', label: '60°', arcs: 3 }],
}, 'Two triangles ABC and PQR with a side BC or QR of 7 centimetres opposite the angle of 72 degrees, and an angle of 48 degrees at B or Q. The third angles at C and R must then both be 60 degrees, because the angles of a triangle add up to 180 degrees.', 'Two angles and a side that is not between them are equal: AAS. The third angles are then equal too.');

// ---- RHS: right angle, hypotenuse 13, one side 5 (the other side is 12)
const T6 = [[0, 12], [0, 0], [5, 0]], T6b = flip(T6, 0, 9, 0);
must(close(dist(T6[0], T6[2]), 13) && close(dist(T6[1], T6[0]), 12) && close(angleAt(T6[1], T6[0], T6[2]), 90) && sameParts(T6, T6b), 'RHS copy');
export const fRHS = fig({
  points: { A: pt(T6[0], 'n'), B: pt(T6[1], 'sw'), C: pt(T6[2], 'se'), P: pt(T6b[0], 'n'), Q: pt(T6b[1], 'se'), R: pt(T6b[2], 'sw') },
  segments: [{ from: 'A', to: 'B', label: '?' }, { from: 'B', to: 'C', ticks: 2, label: '5 cm' }, { from: 'A', to: 'C', ticks: 1, label: '13 cm' }, { from: 'P', to: 'Q', label: '?' }, { from: 'Q', to: 'R', ticks: 2, label: '5 cm' }, { from: 'P', to: 'R', ticks: 1, label: '13 cm' }],
  angles: [{ at: 'B', from: 'A', to: 'C', right: true }, { at: 'Q', from: 'P', to: 'R', right: true }],
}, 'Two right-angled triangles ABC and PQR with the right angle at B and at Q. The hypotenuses AC and PR are 13 centimetres and the sides BC and QR are 5 centimetres. The remaining sides AB and PQ are marked with question marks.', 'Right angle, hypotenuse and one side equal: RHS.');

// ---- kite: AB = AD and AC bisects angle A
const kA = [0, 0], kC = [7, 0], kB = polar(kA, 5, 35), kD = polar(kA, 5, -35);
must(close(dist(kB, kC), dist(kD, kC)) && close(angleAt(kB, kA, kC), angleAt(kD, kA, kC)), 'kite');
export const fKite = fig({
  points: { A: pt(kA, 'w'), B: pt(kB, 'n'), C: pt(kC, 'e'), D: pt(kD, 's') },
  segments: [{ from: 'A', to: 'B', ticks: 1, label: '5 cm' }, { from: 'A', to: 'D', ticks: 1, label: '5 cm' }, { from: 'B', to: 'C' }, { from: 'D', to: 'C' }, { from: 'A', to: 'C', dashed: true }],
  angles: [{ at: 'A', from: 'C', to: 'B', label: '35°', arcs: 1 }, { at: 'A', from: 'D', to: 'C', label: '35°', arcs: 1 }],
}, 'A four-sided figure ABCD with AB and AD both 5 centimetres. The diagonal AC, drawn dashed, splits the angle at A into two angles of 35 degrees. The task is to show that BC equals DC.', 'AB = AD and AC bisects angle A.');

// ---- tent pole: pole OA is vertical, ropes AB = AC = 5 m
const tA = [0, 4], tO = [0, 0], tB = [-3, 0], tC = [3, 0];
must(close(dist(tA, tB), 5) && close(dist(tA, tC), 5) && close(angleAt(tO, tA, tB), 90) && close(dist(tO, tB), dist(tO, tC)), 'tent');
export const fTent = fig({
  points: { A: pt(tA, 'n'), O: pt(tO, 's'), B: pt(tB, 'sw'), C: pt(tC, 'se') },
  segments: [{ from: 'A', to: 'O', label: '4 m' }, { from: 'A', to: 'B', ticks: 1 }, { from: 'A', to: 'C', ticks: 1 }, { from: 'B', to: 'O' }, { from: 'O', to: 'C' }],
  angles: [{ at: 'O', from: 'B', to: 'A', right: true }, { at: 'O', from: 'A', to: 'C', right: true }],
}, 'A vertical tent pole OA of 4 metres stands on level ground. Two guy ropes AB and AC of equal length run from the top A to pegs B and C on the ground on either side of the pole. The angles at O are right angles.', 'The ropes AB and AC are equal; the pole OA is common.');

// ---- isosceles triangle ABC with AB = AC = 5, BC = 6
const iso = [[3, 4], [0, 0], [6, 0]];
must(close(dist(iso[0], iso[1]), 5) && close(dist(iso[0], iso[2]), 5) && close(dist(iso[1], iso[2]), 6) && close(angleAt(iso[1], iso[2], iso[0]), angleAt(iso[2], iso[1], iso[0])), 'isosceles');
export const fIso = fig({
  points: { A: pt(iso[0], 'n'), B: pt(iso[1], 'sw'), C: pt(iso[2], 'se') },
  segments: [{ from: 'A', to: 'B', ticks: 1, label: '5 cm' }, { from: 'A', to: 'C', ticks: 1, label: '5 cm' }, { from: 'B', to: 'C', label: '6 cm' }],
  angles: [{ at: 'B', from: 'C', to: 'A', arcs: 1 }, { at: 'C', from: 'B', to: 'A', arcs: 1 }],
}, 'An isosceles triangle ABC with the two equal sides AB and AC of 5 centimetres each, marked with one tick, and the base BC of 6 centimetres. The angles at B and C, opposite the equal sides, carry one arc each.', 'AB = AC, and the angles B and C opposite them are equal.');

// ---- the same triangle with the bisector AD of angle A (proof of the isosceles theorem)
const isoD = midpoint(iso[1], iso[2]);
must(close(angleAt(iso[0], iso[1], isoD), angleAt(iso[0], iso[2], isoD)) && close(angleAt(isoD, iso[0], iso[1]), 90) && close(dist(iso[1], isoD), dist(isoD, iso[2])), 'bisector of the apex angle of an isosceles triangle');
export const fIsoProof = fig({
  points: { A: pt(iso[0], 'n'), B: pt(iso[1], 'sw'), C: pt(iso[2], 'se'), D: pt(isoD, 's') },
  segments: [{ from: 'A', to: 'B', ticks: 1 }, { from: 'A', to: 'C', ticks: 1 }, { from: 'B', to: 'C' }, { from: 'A', to: 'D', ticks: 2, dashed: true }],
  angles: [{ at: 'A', from: 'B', to: 'D', arcs: 1 }, { at: 'A', from: 'D', to: 'C', arcs: 1 }, { at: 'B', from: 'C', to: 'A', arcs: 2 }, { at: 'C', from: 'B', to: 'A', arcs: 2 }],
}, 'The isosceles triangle ABC with AB equal to AC, and the bisector AD of the angle at A drawn dashed to the base. The two small angles at A have one arc each. The angles at B and C, which the proof shows to be equal, have two arcs each.', 'The bisector AD makes triangles ABD and ACD with AB = AC, equal angles at A and AD common.');

// ---- converse: angles B = C = 65, so AB = AC
const isoC = triASA(6, 65, 65);
must(close(angleAt(isoC[0], isoC[1], isoC[2]), 50) && close(dist(isoC[0], isoC[1]), dist(isoC[0], isoC[2])), 'equal angles, equal sides');
const isoCD = midpoint(isoC[1], isoC[2]);
export const fIsoConv = fig({
  points: { A: pt(isoC[0], 'n'), B: pt(isoC[1], 'sw'), C: pt(isoC[2], 'se'), D: pt(isoCD, 's') },
  segments: [{ from: 'A', to: 'B', label: '?' }, { from: 'A', to: 'C', label: '?' }, { from: 'B', to: 'C' }, { from: 'A', to: 'D', dashed: true }],
  angles: [{ at: 'B', from: 'C', to: 'A', label: '65°', arcs: 1 }, { at: 'C', from: 'B', to: 'A', label: '65°', arcs: 1 }, { at: 'A', from: 'B', to: 'D', arcs: 2 }, { at: 'A', from: 'D', to: 'C', arcs: 2 }],
}, 'A triangle ABC with the angles at B and C both 65 degrees. The bisector AD of the angle at A is drawn dashed and the two halves of the angle at A carry two arcs each. The sides AB and AC are marked with question marks: they should come out equal.', 'Equal angles B and C: show that the sides AB and AC opposite them are equal.');

// ---- numerical example: base angles (3x + 5) and (5x - 25), x = 15, so both are 50 and the apex angle is 80
const isoN = triASA(6, 50, 50);
must(close(angleAt(isoN[0], isoN[1], isoN[2]), 80) && close(dist(isoN[0], isoN[1]), dist(isoN[0], isoN[2])), 'numerical example');
export const fIsoNum = fig({
  points: { A: pt(isoN[0], 'n'), B: pt(isoN[1], 'sw'), C: pt(isoN[2], 'se') },
  segments: [{ from: 'A', to: 'B', ticks: 1 }, { from: 'A', to: 'C', ticks: 1 }, { from: 'B', to: 'C' }],
  angles: [{ at: 'B', from: 'C', to: 'A', label: '(3x + 5)°', arcs: 1 }, { at: 'C', from: 'B', to: 'A', label: '(5x - 25)°', arcs: 1 }, { at: 'A', from: 'B', to: 'C', label: '?' }],
}, 'An isosceles triangle ABC with AB equal to AC. The base angle at B is marked 3x plus 5 degrees, the base angle at C is marked 5x minus 25 degrees, and the angle at A is marked with a question mark.', 'Base angles of an isosceles triangle are equal, so $3x + 5 = 5x - 25$.');

// ---- equilateral triangle
const eq = triSSS(6, 6, 6);
must(eq.every((p, i) => close(angleAt(p, eq[(i + 1) % 3], eq[(i + 2) % 3]), 60)), 'equilateral');
export const fEquil = fig({
  points: { A: pt(eq[0], 'n'), B: pt(eq[1], 'sw'), C: pt(eq[2], 'se') },
  segments: [{ from: 'A', to: 'B', ticks: 1, label: '6 cm' }, { from: 'B', to: 'C', ticks: 1, label: '6 cm' }, { from: 'C', to: 'A', ticks: 1, label: '6 cm' }],
  angles: [{ at: 'B', from: 'C', to: 'A', label: '60°', arcs: 1 }, { at: 'C', from: 'A', to: 'B', label: '60°', arcs: 1 }, { at: 'A', from: 'B', to: 'C', label: '60°', arcs: 1 }],
}, 'An equilateral triangle ABC with all three sides 6 centimetres, marked with one tick each, and all three angles 60 degrees.', 'All sides equal means all angles equal, and each is $60^\\circ$.');

// ---- SSA: angle A = 45 degrees, BC = 5, AB = 4 sqrt 2; two different triangles ABC and ABD
const ssaAB = 4 * Math.SQRT2, ssaV = ssaSides(45, ssaAB, 5);
must(ssaV.length === 2 && close(ssaV[0], 1) && close(ssaV[1], 7), 'SSA: AC is 1 or 7');
const sB = [ssaAB, 0], sA = [0, 0], sC = polar(sA, 1, 45), sD = polar(sA, 7, 45);
must(close(dist(sB, sC), 5) && close(dist(sB, sD), 5) && close(angleAt(sA, sB, sC), 45) && close(angleAt(sA, sB, sD), 45) && close(angleAt(sC, sA, sB) + angleAt(sD, sA, sB), 180), 'SSA overlay');
export const fSSA = fig({
  points: { A: pt(sA, 'sw'), B: pt(sB, 'se'), C: pt(sC, 'nw'), D: pt(sD, 'n') },
  segments: [{ from: 'A', to: 'B' }, { from: 'A', to: 'D' }, { from: 'B', to: 'C', ticks: 1, label: '5 cm' }, { from: 'B', to: 'D', ticks: 1, label: '5 cm' }],
  angles: [{ at: 'A', from: 'B', to: 'C', label: '45°', arcs: 1 }],
}, 'A point A with a base line AB and a ray at 45 degrees to it. Two different points C and D on the ray are both 5 centimetres from B. So triangles ABC and ABD share the side AB, the angle at A and a side of 5 centimetres opposite it, but AC is 1 centimetre and AD is 7 centimetres.', 'Two different triangles with the same two sides and the same non-included angle.');
const ssaT1 = [sA, sB, sC], ssaT2 = move([sA, sB, sD], 0, 9, 0);
must(!sameParts(ssaT1, ssaT2.map((p) => p)), 'the two SSA triangles are not congruent');
export const fSSA2 = fig({
  points: { A: pt(ssaT1[0], 'sw'), B: pt(ssaT1[1], 'se'), C: pt(ssaT1[2], 'n'), E: pt(ssaT2[0], 'sw'), F: pt(ssaT2[1], 'se'), G: pt(ssaT2[2], 'n') },
  segments: [{ from: 'A', to: 'B', ticks: 1 }, { from: 'B', to: 'C', ticks: 2, label: '5 cm' }, { from: 'A', to: 'C', label: '1 cm' }, { from: 'E', to: 'F', ticks: 1 }, { from: 'F', to: 'G', ticks: 2, label: '5 cm' }, { from: 'E', to: 'G', label: '7 cm' }],
  angles: [{ at: 'A', from: 'B', to: 'C', label: '45°', arcs: 1 }, { at: 'E', from: 'F', to: 'G', label: '45°', arcs: 1 }],
}, 'Two triangles side by side. In triangle ABC the side AC is 1 centimetre, in triangle EFG the side EG is 7 centimetres. In both, the angle at A or E is 45 degrees, the base AB or EF is the same length, and the side BC or FG is 5 centimetres. The triangles are clearly different.', 'The same SSA data, yet the triangles are not congruent.');

// ---- equal altitudes of an isosceles triangle
const aE = foot(iso[1], iso[0], iso[2]), aF = foot(iso[2], iso[0], iso[1]);
must(close(dist(iso[1], aE), dist(iso[2], aF)) && close(dist(iso[1], aE), 4.8) && close(angleAt(aE, iso[1], iso[0]), 90) && close(angleAt(aF, iso[2], iso[0]), 90), 'equal altitudes');
export const fAltIso = fig({
  points: { A: pt(iso[0], 'n'), B: pt(iso[1], 'sw'), C: pt(iso[2], 'se'), E: pt(aE, 'e'), F: pt(aF, 'w') },
  segments: [{ from: 'A', to: 'B', ticks: 1 }, { from: 'A', to: 'C', ticks: 1 }, { from: 'B', to: 'C' }, { from: 'B', to: 'E', dashed: true }, { from: 'C', to: 'F', dashed: true }],
  angles: [{ at: 'E', from: 'B', to: 'A', right: true }, { at: 'F', from: 'C', to: 'A', right: true }],
}, 'An isosceles triangle ABC with AB equal to AC. The dashed line BE is perpendicular to AC with E on AC, and the dashed line CF is perpendicular to AB with F on AB. The two perpendiculars are the altitudes from B and C.', 'In an isosceles triangle the altitudes BE and CF are equal.');

export const triParts = parts;
