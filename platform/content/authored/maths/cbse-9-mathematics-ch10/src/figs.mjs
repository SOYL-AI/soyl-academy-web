// Figures of CBSE 9 Mathematics ch10 4-gons (Quadrilaterals). Every coordinate is computed and asserted: the type of each 4-gon is
// decided by classify() from its coordinates, parallel and equal marks are checked, labelled lengths are drawn to scale (1 unit = 1 cm)
// and each labelled angle is measured by the lint against the drawn coordinates.
import { fig, polar, lineInter, angleAt, must, close, dist } from './h.mjs';
import { move, triSSS } from './g.mjs';
import { sub, add, scale, mid, par, rightAt, classify, symmetries, reflectsOnto, varignon, quad80, centroid } from './q.mjs';

const pt = (at, label_position, label) => ({ at, ...(label_position ? { label_position } : {}), ...(label !== undefined ? { label } : {}) });
const rad = (d) => (d * Math.PI) / 180;

// ---- six kinds of 4-gon in one figure (names under each)
const shapes = {
  trap: { P: [[0, 0], [5, 0], [4, 2.2], [1.2, 2.2]], name: 'Trapezium', off: [0, 6], arrows: [1, 0, 1, 0] },
  par: { P: [[0, 0], [4.5, 0], [5.7, 2.2], [1.2, 2.2]], name: 'Parallelogram', off: [8, 6], arrows: [1, 2, 1, 2] },
  rho: { P: (() => { const a = [3, 0], d = polar([0, 0], 3, 70); return [[0, 0], a, add(a, d), d]; })(), name: 'Rhombus', off: [17, 6], ticks: [1, 1, 1, 1] },
  rec: { P: [[0, 0], [5, 0], [5, 2.5], [0, 2.5]], name: 'Rectangle', off: [0, 0], ticks: [1, 2, 1, 2], right: true },
  sq: { P: [[0, 0], [3, 0], [3, 3], [0, 3]], name: 'Square', off: [8, 0], ticks: [1, 1, 1, 1], right: true },
  kite: { P: [[0, 0], [1.7, 1.2], [0, 3.6], [-1.7, 1.2]], name: 'Kite', off: [19, 0], ticks: [1, 2, 2, 1] },
};
const cl = Object.fromEntries(Object.entries(shapes).map(([k, s]) => [k, classify(s.P)]));
must(cl.trap.trapezium && cl.trap.exactlyOnePair && !cl.trap.parallelogram, 'trapezium');
must(cl.par.parallelogram && !cl.par.rhombus && !cl.par.rectangle, 'parallelogram');
must(cl.rho.rhombus && !cl.rho.rectangle, 'rhombus');
must(cl.rec.rectangle && !cl.rec.rhombus, 'rectangle');
must(cl.sq.square && cl.sq.rectangle && cl.sq.rhombus, 'square');
must(cl.kite.kite && !cl.kite.trapezium, 'kite');
const typePoints = {}, typeSegs = [], typeAngles = [];
for (const [k, s] of Object.entries(shapes)) {
  const names = s.P.map((_, i) => `${k}${'ABCD'[i]}`);
  s.P.forEach((p, i) => { typePoints[names[i]] = { at: add(p, s.off), label: false }; });
  s.P.forEach((_, i) => typeSegs.push({ from: names[i], to: names[(i + 1) % 4], ...(s.ticks ? { ticks: s.ticks[i] } : {}), ...(s.arrows && s.arrows[i] ? { arrows: s.arrows[i] } : {}) }));
  if (s.right) s.P.forEach((_, i) => typeAngles.push({ at: names[i], from: names[(i + 1) % 4], to: names[(i + 3) % 4], right: true }));
  const xs = s.P.map((p) => p[0]), cx = (Math.min(...xs) + Math.max(...xs)) / 2;
  typePoints[`${k}L`] = { at: add([cx, -0.9], s.off), label: s.name, label_position: 's' };
}
export const f4Types = fig({ points: typePoints, segments: typeSegs, angles: typeAngles },
  'Six kinds of four-sided figure, each with its name below: a trapezium with one pair of parallel sides marked with arrows, a parallelogram with two pairs of parallel sides, a rhombus with four equal sides, a rectangle with four right angles, a square with four equal sides and four right angles, and a kite with two pairs of equal adjacent sides.',
  'Trapezium, parallelogram, rhombus, rectangle, square and kite.');

// ---- a general 4-gon, its diagonals, and the angle sum 360
const Q = quad80(), [qA, qB, qC, qD] = Q;
must([angleAt(qA, qB, qD), angleAt(qB, qA, qC), angleAt(qC, qB, qD), angleAt(qD, qC, qA)].every((v, i) => close(v, [80, 95, 70, 115][i], 1e-9)), 'quad angles 80 95 70 115');
must(classify(Q).trapezium === false && classify(Q).kite === false, 'a general 4-gon');
export const fQuad = fig({
  points: { A: pt(qA, 'sw'), B: pt(qB, 'se'), C: pt(qC, 'ne'), D: pt(qD, 'nw') },
  segments: [{ from: 'A', to: 'B' }, { from: 'B', to: 'C' }, { from: 'C', to: 'D' }, { from: 'D', to: 'A' }, { from: 'A', to: 'C', dashed: true }, { from: 'B', to: 'D', dashed: true }],
}, 'A four-sided figure ABCD with its four vertices A, B, C and D in order, four sides AB, BC, CD and DA, and two dashed diagonals AC and BD that join opposite vertices.', 'A 4-gon has four vertices, four sides and two diagonals.');
const t1 = angleAt(qA, qB, qC) + angleAt(qB, qA, qC) + angleAt(qC, qA, qB), t2 = angleAt(qA, qC, qD) + angleAt(qC, qA, qD) + angleAt(qD, qA, qC);
must(close(angleAt(qA, qB, qD), angleAt(qA, qB, qC) + angleAt(qA, qC, qD)) && close(angleAt(qC, qB, qD), angleAt(qC, qB, qA) + angleAt(qC, qA, qD)) && close(t1, 180) && close(t2, 180) && close(t1 + t2, 360), 'diagonal AC makes two triangles with angle sum 180 each, so the 4-gon has 360');
export const fAngleSum = fig({
  points: { A: pt(qA, 'sw'), B: pt(qB, 'se'), C: pt(qC, 'ne'), D: pt(qD, 'nw') },
  segments: [{ from: 'A', to: 'B' }, { from: 'B', to: 'C' }, { from: 'C', to: 'D' }, { from: 'D', to: 'A' }, { from: 'A', to: 'C', dashed: true }],
  angles: [{ at: 'A', from: 'B', to: 'D', label: '80°' }, { at: 'B', from: 'C', to: 'A', label: '95°' }, { at: 'C', from: 'D', to: 'B', label: '70°' }, { at: 'D', from: 'A', to: 'C', label: '115°' }],
}, 'A four-sided figure ABCD with angles of 80 degrees at A, 95 degrees at B, 70 degrees at C and 115 degrees at D. The dashed diagonal AC splits it into two triangles ABC and ACD.', 'The angles add up to $80^\\circ + 95^\\circ + 70^\\circ + 115^\\circ = 360^\\circ$.');

// ---- parallelogram: opposite sides and angles are equal (diagonal AC and alternate angles)
const pA = [0, 0], pB = [6, 0], pD = polar(pA, 3.6, 65), pC = add(pB, pD);
const cPar = classify([pA, pB, pC, pD]);
must(cPar.parallelogram && cPar.oppSidesEqual && cPar.oppAnglesEqual && cPar.diagBisect, 'parallelogram properties');
must(close(angleAt(pA, pD, pC), angleAt(pC, pA, pB), 1e-9) && close(angleAt(pA, pB, pC), angleAt(pC, pA, pD), 1e-9), 'alternate angles at the diagonal AC');
export const fPar = fig({
  points: { A: pt(pA, 'sw'), B: pt(pB, 'se'), C: pt(pC, 'ne'), D: pt(pD, 'nw') },
  segments: [{ from: 'A', to: 'B', arrows: 1 }, { from: 'D', to: 'C', arrows: 1 }, { from: 'A', to: 'D', arrows: 2 }, { from: 'B', to: 'C', arrows: 2 }, { from: 'A', to: 'C', dashed: true }],
  angles: [{ at: 'A', from: 'C', to: 'D', arcs: 1 }, { at: 'C', from: 'A', to: 'B', arcs: 1 }, { at: 'A', from: 'B', to: 'C', arcs: 2 }, { at: 'C', from: 'D', to: 'A', arcs: 2 }],
}, 'A parallelogram ABCD with AB parallel to DC and AD parallel to BC, marked with arrows. The dashed diagonal AC makes two triangles. The alternate angles DAC and ACB have one arc each, and the alternate angles BAC and ACD have two arcs each.', 'The diagonal AC makes alternate angles equal: $\\angle DAC = \\angle ACB$ and $\\angle BAC = \\angle ACD$.');

// ---- parallelogram: the diagonals bisect each other (triangles AOB and COD)
const dA = [0, 0], dB = [7, 0], dD = polar(dA, 3.2, 52), dC = add(dB, dD), dO = mid(dA, dC);
must(classify([dA, dB, dC, dD]).parallelogram && close(dist(dO, mid(dB, dD)), 0, 1e-9), 'diagonals bisect');
must(close(angleAt(dO, dA, dB), angleAt(dO, dC, dD)) && close(angleAt(dA, dO, dB), angleAt(dC, dO, dD)) && close(angleAt(dB, dO, dA), angleAt(dD, dO, dC)), 'triangles AOB and COD have equal angles');
export const fParDiag = fig({
  points: { A: pt(dA, 'sw'), B: pt(dB, 'se'), C: pt(dC, 'ne'), D: pt(dD, 'nw'), O: pt(dO, 's') },
  segments: [{ from: 'A', to: 'B' }, { from: 'B', to: 'C' }, { from: 'C', to: 'D' }, { from: 'D', to: 'A' }, { from: 'A', to: 'O', ticks: 1 }, { from: 'O', to: 'C', ticks: 1 }, { from: 'B', to: 'O', ticks: 2 }, { from: 'O', to: 'D', ticks: 2 }],
  angles: [{ at: 'O', from: 'A', to: 'B', arcs: 1 }, { at: 'O', from: 'C', to: 'D', arcs: 1 }, { at: 'A', from: 'B', to: 'O', arcs: 2 }, { at: 'C', from: 'D', to: 'O', arcs: 2 }],
}, 'A parallelogram ABCD with diagonals AC and BD crossing at O. AO and OC carry one tick, BO and OD carry two ticks. The vertically opposite angles AOB and COD have one arc each, and the alternate angles OAB and OCD have two arcs each.', 'The diagonals meet at O with $AO = OC$ and $BO = OD$.');

// ---- rhombus (diagonals 8 and 6, side 5) and rectangle (8 by 6, diagonals 10)
const rh = { A: [-4, 0], B: [0, -3], C: [4, 0], D: [0, 3], O: [0, 0] };
const rhc = classify([rh.A, rh.B, rh.C, rh.D]);
must(rhc.rhombus && !rhc.rectangle && close(rhc.sides[0], 5) && close(rhc.diag.AC, 8) && close(rhc.diag.BD, 6) && rhc.diag.perpendicular && rhc.diagBisect, 'rhombus 5, 8, 6');
const rc = [[0, 0], [8, 0], [8, 6], [0, 6]].map((p) => add(p, [11, -3]));
const rcc = classify(rc);
must(rcc.rectangle && !rcc.rhombus && rcc.diag.equal && close(rcc.diag.AC, 10) && rcc.diagBisect, 'rectangle 8 by 6');
export const fRhRect = fig({
  points: { A: pt(rh.A, 'w'), B: pt(rh.B, 's'), C: pt(rh.C, 'e'), D: pt(rh.D, 'n'), O: pt(rh.O, 'ne'), P: pt(rc[0], 'sw'), Q: pt(rc[1], 'se'), R: pt(rc[2], 'ne'), S: pt(rc[3], 'nw'), M: pt(rcc.o, 's') },
  segments: [{ from: 'A', to: 'B', ticks: 1, label: '5 cm' }, { from: 'B', to: 'C', ticks: 1 }, { from: 'C', to: 'D', ticks: 1 }, { from: 'D', to: 'A', ticks: 1 }, { from: 'A', to: 'C', dashed: true, label: '8 cm' }, { from: 'B', to: 'D', dashed: true, label: '6 cm' },
    { from: 'P', to: 'Q', label: '8 cm' }, { from: 'Q', to: 'R', label: '6 cm' }, { from: 'R', to: 'S' }, { from: 'S', to: 'P' }, { from: 'P', to: 'R', dashed: true, label: '10 cm' }, { from: 'Q', to: 'S', dashed: true, label: '10 cm' }],
  angles: [{ at: 'O', from: 'C', to: 'D', right: true }, { at: 'P', from: 'Q', to: 'S', right: true }, { at: 'Q', from: 'R', to: 'P', right: true }],
}, 'Left: a rhombus ABCD with all sides 5 centimetres and diagonals of 8 and 6 centimetres that cross at O at a right angle. Right: a rectangle PQRS of 8 by 6 centimetres whose two diagonals PR and QS are both 10 centimetres.', 'The diagonals of a rhombus are perpendicular; the diagonals of a rectangle are equal.');

// ---- numerical example: consecutive angles of a parallelogram, (2x + 20) and (3x - 10) with x = 34
const nA = [0, 0], nB = [6, 0], nD = polar(nA, 4, 88), nC = add(nB, nD);
must(classify([nA, nB, nC, nD]).parallelogram && close(angleAt(nA, nB, nD), 88) && close(angleAt(nB, nA, nC), 92) && close(88 + 92, 180), 'parallelogram with angles 88 and 92');
export const fParNum = fig({
  points: { A: pt(nA, 'sw'), B: pt(nB, 'se'), C: pt(nC, 'ne'), D: pt(nD, 'nw') },
  segments: [{ from: 'A', to: 'B', arrows: 1 }, { from: 'D', to: 'C', arrows: 1 }, { from: 'A', to: 'D', arrows: 2 }, { from: 'B', to: 'C', arrows: 2 }],
  angles: [{ at: 'A', from: 'B', to: 'D', label: '(2x + 20)°' }, { at: 'B', from: 'C', to: 'A', label: '(3x - 10)°' }],
}, 'A parallelogram ABCD. The angle at A is marked 2x plus 20 degrees and the adjacent angle at B is marked 3x minus 10 degrees.', 'Adjacent angles of a parallelogram add up to $180^\\circ$.');

// ---- converse: the diagonals bisect each other, so ABCD is a parallelogram
const wO = [0, 0], wC = polar(wO, 3.5, 10), wA = polar(wO, 3.5, 190), wB = polar(wO, 2.5, 80), wD = polar(wO, 2.5, 260);
const cW = classify([wA, wB, wC, wD]);
must(cW.parallelogram && cW.diagBisect && !cW.rhombus && !cW.rectangle && close(angleAt(wO, wC, wB), 70), 'diagonals bisect so parallelogram');
export const fBisect = fig({
  points: { A: pt(wA, 'w'), B: pt(wB, 'n'), C: pt(wC, 'e'), D: pt(wD, 's'), O: pt(wO, 'se') },
  segments: [{ from: 'A', to: 'B' }, { from: 'B', to: 'C' }, { from: 'C', to: 'D' }, { from: 'D', to: 'A' }, { from: 'A', to: 'O', ticks: 1, label: '3.5 cm' }, { from: 'O', to: 'C', ticks: 1, label: '3.5 cm' }, { from: 'B', to: 'O', ticks: 2, label: '2.5 cm' }, { from: 'O', to: 'D', ticks: 2, label: '2.5 cm' }],
  angles: [{ at: 'O', from: 'C', to: 'B', label: '70°', arcs: 1 }],
}, 'A four-sided figure ABCD whose diagonals AC and BD cross at O. OA and OC are both 3.5 centimetres, OB and OD are both 2.5 centimetres, and the angle COB is 70 degrees. The task is to show that ABCD is a parallelogram.', 'The diagonals bisect each other.');

// ---- midpoint theorem
const mA = [3, 5.5], mB = [0, 0], mC = [8, 0], mD = mid(mA, mB), mE = mid(mA, mC);
must(par(mD, mE, mB, mC) && close(dist(mD, mE), 4) && close(dist(mB, mC), 8) && close(dist(mD, mE), dist(mB, mC) / 2), 'midpoint theorem figure');
export const fMid = fig({
  points: { A: pt(mA, 'n'), B: pt(mB, 'sw'), C: pt(mC, 'se'), D: pt(mD, 'w'), E: pt(mE, 'e') },
  segments: [{ from: 'A', to: 'D', ticks: 1 }, { from: 'D', to: 'B', ticks: 1 }, { from: 'A', to: 'E', ticks: 2 }, { from: 'E', to: 'C', ticks: 2 }, { from: 'D', to: 'E', arrows: 1, label: '4 cm' }, { from: 'B', to: 'C', arrows: 1, label: '8 cm' }],
}, 'A triangle ABC with D the midpoint of AB and E the midpoint of AC. The segment DE is parallel to BC, marked with arrows, and is 4 centimetres while BC is 8 centimetres.', 'The segment joining the midpoints of two sides is parallel to the third side and half as long.');
const mF = sub(scale(mE, 2), mD);
must(par(mB, mD, mC, mF) && close(dist(mB, mD), dist(mC, mF)) && classify([mB, mC, mF, mD]).parallelogram && close(angleAt(mE, mA, mD), angleAt(mE, mC, mF)), 'BDFC is a parallelogram');
export const fMidProof = fig({
  points: { A: pt(mA, 'n'), B: pt(mB, 'sw'), C: pt(mC, 'se'), D: pt(mD, 'w'), E: pt(mE, 'ne'), F: pt(mF, 'e') },
  segments: [{ from: 'A', to: 'D', ticks: 1 }, { from: 'D', to: 'B', ticks: 1 }, { from: 'A', to: 'E', ticks: 2 }, { from: 'E', to: 'C', ticks: 2 }, { from: 'D', to: 'E', ticks: 3 }, { from: 'E', to: 'F', ticks: 3, dashed: true }, { from: 'C', to: 'F', dashed: true }, { from: 'B', to: 'C' }],
  angles: [{ at: 'E', from: 'A', to: 'D', arcs: 1 }, { at: 'E', from: 'C', to: 'F', arcs: 1 }],
}, 'The triangle ABC with D and E the midpoints of AB and AC. The line DE is extended to F so that EF equals DE, and F is joined to C with a dashed line. The vertically opposite angles AED and CEF have one arc each.', 'Extend $DE$ to $F$ with $EF = DE$, and join $CF$.');

// ---- converse of the midpoint theorem
const cA = [2, 6], cB = [0, 0], cC = [9, 0], cD = mid(cA, cB), cE = lineInter(cD, add(cD, [1, 0]), cA, cC);
must(close(dist(cE, cA), dist(cE, cC)) && par(cD, cE, cB, cC), 'the line through the midpoint parallel to BC meets AC at its midpoint');
export const fConv = fig({
  points: { A: pt(cA, 'n'), B: pt(cB, 'sw'), C: pt(cC, 'se'), D: pt(cD, 'w'), E: pt(cE, 'e') },
  segments: [{ from: 'A', to: 'D', ticks: 1 }, { from: 'D', to: 'B', ticks: 1 }, { from: 'A', to: 'E', label: '?' }, { from: 'E', to: 'C', label: '?' }, { from: 'D', to: 'E', arrows: 1 }, { from: 'B', to: 'C', arrows: 1 }],
}, 'A triangle ABC with D the midpoint of AB. A line through D parallel to BC, marked with arrows, meets AC at E. The segments AE and EC are marked with question marks: they should be equal.', 'A line through the midpoint of one side, parallel to a second side, bisects the third side.');

// ---- the medial triangle of a triangle with sides 12, 14, 10
const T = triSSS(12, 14, 10), [tA, tB, tC] = T, tD = mid(tB, tC), tE = mid(tC, tA), tF = mid(tA, tB);
must(close(dist(tE, tF), 6) && close(dist(tF, tD), 7) && close(dist(tD, tE), 5) && par(tE, tF, tB, tC) && par(tF, tD, tC, tA) && par(tD, tE, tA, tB), 'medial triangle 6, 7, 5');
export const fMedial = fig({
  points: { A: pt(tA, 'n'), B: pt(tB, 'sw'), C: pt(tC, 'se'), D: pt(tD, 's'), E: pt(tE, 'ne'), F: pt(tF, 'nw') },
  segments: [{ from: 'A', to: 'B', label: '10 cm' }, { from: 'B', to: 'C', label: '12 cm' }, { from: 'C', to: 'A', label: '14 cm' }, { from: 'E', to: 'F', dashed: true, label: '6 cm' }, { from: 'F', to: 'D', dashed: true, label: '7 cm' }, { from: 'D', to: 'E', dashed: true, label: '5 cm' }],
}, 'A triangle ABC with sides AB of 10, BC of 12 and CA of 14 centimetres. D, E and F are the midpoints of BC, CA and AB, and the dashed triangle DEF inside has sides EF of 6, FD of 7 and DE of 5 centimetres, each half of a side of ABC and parallel to it.', 'Joining the midpoints of the sides gives a triangle with half-size sides.');

// ---- medians and the centroid
const gA = [2, 6], gB = [0, 0], gC = [9, 0], gD = mid(gB, gC), gE = mid(gC, gA), gF = mid(gA, gB), gG = scale(add(add(gA, gB), gC), 1 / 3);
const onLine = (P, X, Y) => Math.abs((Y[0] - X[0]) * (P[1] - X[1]) - (Y[1] - X[1]) * (P[0] - X[0])) < 1e-9;
must(onLine(gG, gA, gD) && onLine(gG, gB, gE) && onLine(gG, gC, gF) && close(dist(gA, gG), 2 * dist(gG, gD)) && close(dist(gB, gG), 2 * dist(gG, gE)) && close(dist(gC, gG), 2 * dist(gG, gF)), 'centroid: three medians meet at G, dividing each 2 : 1');
export const fMedians = fig({
  points: { A: pt(gA, 'n'), B: pt(gB, 'sw'), C: pt(gC, 'se'), D: pt(gD, 's'), E: pt(gE, 'ne'), F: pt(gF, 'nw'), G: pt(gG, 'se') },
  segments: [{ from: 'A', to: 'F', ticks: 3 }, { from: 'F', to: 'B', ticks: 3 }, { from: 'B', to: 'D', ticks: 1 }, { from: 'D', to: 'C', ticks: 1 }, { from: 'C', to: 'E', ticks: 2 }, { from: 'E', to: 'A', ticks: 2 }, { from: 'A', to: 'D', dashed: true }, { from: 'B', to: 'E', dashed: true }, { from: 'C', to: 'F', dashed: true }],
}, 'A triangle ABC with D, E and F the midpoints of BC, CA and AB, marked with ticks. The three dashed medians AD, BE and CF all pass through one point G.', 'The three medians meet at the centroid $G$.');
const mP = mid(gG, gB), mQ = mid(gG, gC);
must(classify([gF, gE, mQ, mP]).parallelogram && onLine(gG, gF, mQ) && onLine(gG, gE, mP) && close(dist(gE, gG), dist(gG, mP)) && close(dist(gF, gG), dist(gG, mQ)), 'FEQP is a parallelogram whose diagonals lie along the medians');
export const fMedProof = fig({
  points: { A: pt(gA, 'n'), B: pt(gB, 'sw'), C: pt(gC, 'se'), E: pt(gE, 'ne'), F: pt(gF, 'nw'), G: pt(gG, 's'), P: pt(mP, 'sw'), Q: pt(mQ, 'se') },
  segments: [{ from: 'A', to: 'B' }, { from: 'B', to: 'C' }, { from: 'C', to: 'A' }, { from: 'B', to: 'E' }, { from: 'C', to: 'F' }, { from: 'F', to: 'E', dashed: true, ticks: 1 }, { from: 'P', to: 'Q', dashed: true, ticks: 1 }, { from: 'E', to: 'Q', dashed: true, ticks: 2 }, { from: 'F', to: 'P', dashed: true, ticks: 2 }],
}, 'A triangle ABC with the medians BE and CF meeting at G. P is the midpoint of GB and Q is the midpoint of GC. The dashed lines FE and PQ have one tick each, and the dashed lines EQ and FP have two ticks each: FEQP is a parallelogram.', 'FEQP is a parallelogram: its diagonals FQ and EP lie along the medians.');

// ---- Varignon parallelogram of an irregular 4-gon
const vA = [0, 0], vB = [7, 1], vC = [6, 5.5], vD = [1, 4], V = [vA, vB, vC, vD], [vP, vQ, vR, vS] = varignon(V);
const cV = classify([vP, vQ, vR, vS]);
must(cV.parallelogram && !cV.rhombus && !cV.rectangle && par(vP, vQ, vA, vC) && par(vQ, vR, vB, vD) && close(dist(vP, vQ), dist(vA, vC) / 2) && close(dist(vQ, vR), dist(vB, vD) / 2), 'Varignon parallelogram');
export const fVar = fig({
  points: { A: pt(vA, 'sw'), B: pt(vB, 'se'), C: pt(vC, 'ne'), D: pt(vD, 'nw'), P: pt(vP, 's'), Q: pt(vQ, 'e'), R: pt(vR, 'n'), S: pt(vS, 'w') },
  segments: [{ from: 'A', to: 'B' }, { from: 'B', to: 'C' }, { from: 'C', to: 'D' }, { from: 'D', to: 'A' }, { from: 'A', to: 'C', dashed: true }, { from: 'B', to: 'D', dashed: true }, { from: 'P', to: 'Q', ticks: 1 }, { from: 'S', to: 'R', ticks: 1 }, { from: 'Q', to: 'R', ticks: 2 }, { from: 'P', to: 'S', ticks: 2 }],
}, 'An irregular four-sided figure ABCD with dashed diagonals AC and BD. P, Q, R and S are the midpoints of AB, BC, CD and DA. Joining them gives the four-sided figure PQRS, whose opposite sides have the same number of ticks: it is a parallelogram.', 'The midpoints of the sides of any 4-gon are the vertices of a parallelogram.');

// ---- numerical example: diagonals AC = 10 and BD = 6 at right angles
const wA2 = [0, 0], wC2 = [10, 0], wB2 = [4, -2], wD2 = [4, 4], W2 = [wA2, wB2, wC2, wD2], [uP, uQ, uR, uS] = varignon(W2);
const cU = classify([uP, uQ, uR, uS]);
must(rightAt([4, 0], wC2, wD2) && close(dist(wA2, wC2), 10) && close(dist(wB2, wD2), 6) && cU.rectangle && close(dist(uP, uQ), 5) && close(dist(uQ, uR), 3), 'perpendicular diagonals give a rectangle 5 by 3');
export const fVar2 = fig({
  points: { A: pt(wA2, 'w'), B: pt(wB2, 's'), C: pt(wC2, 'e'), D: pt(wD2, 'n'), P: pt(uP, 'sw'), Q: pt(uQ, 'se'), R: pt(uR, 'ne'), S: pt(uS, 'nw') },
  segments: [{ from: 'A', to: 'B' }, { from: 'B', to: 'C' }, { from: 'C', to: 'D' }, { from: 'D', to: 'A' }, { from: 'A', to: 'C', dashed: true, label: '10 cm' }, { from: 'B', to: 'D', dashed: true, label: '6 cm' }, { from: 'P', to: 'Q', label: '5 cm' }, { from: 'Q', to: 'R', label: '3 cm' }, { from: 'R', to: 'S' }, { from: 'S', to: 'P' }],
  angles: [{ at: 'P', from: 'S', to: 'Q', right: true }],
}, 'A four-sided figure ABCD whose diagonals AC of 10 centimetres and BD of 6 centimetres cross at a right angle. The midpoints P, Q, R and S of its sides form a rectangle PQRS of 5 by 3 centimetres.', 'Perpendicular diagonals give a rectangle of midpoints.');

// ---- lines of symmetry: rectangle, rhombus, kite (axes drawn dashed)
const sRec = [[0, 0], [6, 0], [6, 4], [0, 4]], sRho = [[-4, 0], [0, -3], [4, 0], [0, 3]].map((p) => add(p, [11, 2]));
const sKite = [[0, 0], [1.7, 1.2], [0, 3.6], [-1.7, 1.2]].map((p) => add(p, [20, 0]));
const syRec = symmetries(sRec), syRho = symmetries(sRho), syKite = symmetries(sKite), syPar = symmetries(shapes.par.P), sySq = symmetries(shapes.sq.P);
must(syRec.lines === 2 && syRec.order === 2 && syRho.lines === 2 && syRho.order === 2 && syKite.lines === 1 && syKite.order === 1 && syPar.lines === 0 && syPar.order === 2 && sySq.lines === 4 && sySq.order === 4, 'symmetry counts');
must(reflectsOnto(sRec, [3, 2], 0) && reflectsOnto(sRec, [3, 2], 90) && reflectsOnto(sRho, [11, 2], 0) && reflectsOnto(sRho, [11, 2], 90) && reflectsOnto(sKite, [20, 0], 90) && !reflectsOnto(sKite, [20, 0], 0), 'drawn axes are axes of symmetry');
export const fSym = fig({
  points: {
    R1: pt(sRec[0]), R2: pt(sRec[1]), R3: pt(sRec[2]), R4: pt(sRec[3]), Rh1: { at: [-0.7, 2], label: false }, Rh2: { at: [6.7, 2], label: false }, Rv1: { at: [3, -0.7], label: false }, Rv2: { at: [3, 4.7], label: false },
    H1: pt(sRho[0]), H2: pt(sRho[1]), H3: pt(sRho[2]), H4: pt(sRho[3]), Hh1: { at: [6.3, 2], label: false }, Hh2: { at: [15.7, 2], label: false }, Hv1: { at: [11, -1.3], label: false }, Hv2: { at: [11, 5.3], label: false },
    K1: pt(sKite[0]), K2: pt(sKite[1]), K3: pt(sKite[2]), K4: pt(sKite[3]), Kv1: { at: [20, -0.7], label: false }, Kv2: { at: [20, 4.3], label: false },
  },
  segments: [
    { from: 'R1', to: 'R2' }, { from: 'R2', to: 'R3' }, { from: 'R3', to: 'R4' }, { from: 'R4', to: 'R1' }, { from: 'Rh1', to: 'Rh2', dashed: true }, { from: 'Rv1', to: 'Rv2', dashed: true },
    { from: 'H1', to: 'H2' }, { from: 'H2', to: 'H3' }, { from: 'H3', to: 'H4' }, { from: 'H4', to: 'H1' }, { from: 'Hh1', to: 'Hh2', dashed: true }, { from: 'Hv1', to: 'Hv2', dashed: true },
    { from: 'K1', to: 'K2' }, { from: 'K2', to: 'K3' }, { from: 'K3', to: 'K4' }, { from: 'K4', to: 'K1' }, { from: 'Kv1', to: 'Kv2', dashed: true },
  ],
}, 'Three four-sided figures with their lines of symmetry drawn as dashed lines: a rectangle with two lines of symmetry joining midpoints of opposite sides, a rhombus with two lines of symmetry along its diagonals, and a kite with one line of symmetry along its longer diagonal.', 'A rectangle has 2 lines of symmetry, a rhombus 2 and a kite 1.');

// ---- rotational symmetry: a square (turn through 90 degrees) and a parallelogram (half-turn)
const rSq = [[-2, -2], [2, -2], [2, 2], [-2, 2]], rPar = [[0, 0], [5, 0], [6.5, 3], [1.5, 3]].map((p) => add(p, [8, -1.5]));
const rParO = centroid(rPar);
must(symmetries(rSq).order === 4 && symmetries(rPar).order === 2 && close(dist(rParO, mid(rPar[0], rPar[2])), 0, 1e-9) && rightAt([0, 0], sub(rSq[0], [0, 0]), sub(rSq[1], [0, 0])), 'rotational symmetry orders');
export const fRot = fig({
  points: { A: pt(rSq[0], 'sw'), B: pt(rSq[1], 'se'), C: pt(rSq[2], 'ne'), D: pt(rSq[3], 'nw'), O: pt([0, 0], 's'), P: pt(rPar[0], 'sw'), Q: pt(rPar[1], 'se'), R: pt(rPar[2], 'ne'), S: pt(rPar[3], 'nw'), M: pt(rParO, 's') },
  segments: [{ from: 'A', to: 'B' }, { from: 'B', to: 'C' }, { from: 'C', to: 'D' }, { from: 'D', to: 'A' }, { from: 'A', to: 'O', dashed: true }, { from: 'O', to: 'B', dashed: true }, { from: 'O', to: 'C', dashed: true }, { from: 'O', to: 'D', dashed: true },
    { from: 'P', to: 'Q' }, { from: 'Q', to: 'R' }, { from: 'R', to: 'S' }, { from: 'S', to: 'P' }, { from: 'P', to: 'M', dashed: true }, { from: 'M', to: 'R', dashed: true }],
  angles: [{ at: 'O', from: 'A', to: 'B', right: true }, { at: 'O', from: 'B', to: 'C', right: true }, { at: 'M', from: 'P', to: 'R', label: '180°' }],
}, 'Left: a square ABCD with its centre O. The turns from OA to OB to OC to OD are right angles, so a quarter-turn about O maps the square onto itself. Right: a parallelogram PQRS with its centre M, where the angle PMR is a straight angle of 180 degrees, so a half-turn about M maps the parallelogram onto itself.', 'The square has rotational symmetry of order 4, the parallelogram of order 2.');

// ---- tiling: four copies of the 80-95-70-115 4-gon meet at a point, one angle each
const Qd = quad80(), orient = (P, v, n, startDeg) => {
  const o = P[v], h = (Math.atan2(P[n][1] - o[1], P[n][0] - o[0]) * 180) / Math.PI, t = rad(startDeg - h);
  return P.map((p) => { const d = sub(p, o); return [d[0] * Math.cos(t) - d[1] * Math.sin(t), d[0] * Math.sin(t) + d[1] * Math.cos(t)]; });
};
const uA = orient(Qd, 0, 1, 0), uD = orient(Qd, 3, 0, 80), uC = orient(Qd, 2, 3, 195), uB = orient(Qd, 1, 2, 265);
must(close(dist(uA[3], uD[0]), 0, 1e-9) && close(dist(uD[2], uC[3]), 0, 1e-9) && close(dist(uC[1], uB[2]), 0, 1e-9) && close(dist(uB[0], uA[1]), 0, 1e-9), 'the equal sides of neighbouring tiles lie along the same rays');
const tl = [['a', uA], ['d', uD], ['c', uC], ['b', uB]];
const tPts = { O: pt([0, 0], 'e') }, tSegs = [], tAng = [];
tl.forEach(([k, P]) => { P.forEach((p, i) => { if (i !== ['a', 'b', 'c', 'd'].indexOf(k)) tPts[`${k}${i}`] = { at: p, label: false }; }); });
// the vertex of each tile that sits at O is the shared point O
const name = (k, i) => (i === ['a', 'b', 'c', 'd'].indexOf(k) ? 'O' : `${k}${i}`);
tl.forEach(([k]) => { for (let i = 0; i < 4; i++) tSegs.push({ from: name(k, i), to: name(k, (i + 1) % 4) }); });
// wedge angles at O: tile a (80), d (115), c (70), b (95)
tAng.push({ at: 'O', from: name('a', 1), to: name('a', 3), label: '80°', arcs: 1 }, { at: 'O', from: name('d', 0), to: name('d', 2), label: '115°', arcs: 2 }, { at: 'O', from: name('c', 3), to: name('c', 1), label: '70°', arcs: 3 }, { at: 'O', from: name('b', 2), to: name('b', 0), label: '95°' });
must(close(angleAt([0, 0], uA[1], uA[3]), 80) && close(angleAt([0, 0], uD[0], uD[2]), 115) && close(angleAt([0, 0], uC[3], uC[1]), 70) && close(angleAt([0, 0], uB[2], uB[0]), 95) && 80 + 115 + 70 + 95 === 360, 'the four angles fill the point');

export const fTile = fig({ points: tPts, segments: tSegs, angles: tAng },
  'Four copies of the same four-sided figure, with angles of 80, 95, 70 and 115 degrees, meet at a point O. Each copy has a different one of its angles at O, and together the angles 80, 115, 70 and 95 fill the whole turn of 360 degrees around O, with no gap and no overlap.', 'Four copies of the 4-gon fit around a point: $80^\\circ + 115^\\circ + 70^\\circ + 95^\\circ = 360^\\circ$.');
export const tileData = { tl: tl.map(([k, P]) => [k, P]) };
export const quadPoints = Q;
export const classOf = cl;
