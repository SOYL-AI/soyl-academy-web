// Build CBSE 10 Mathematics ch10 Circles. Run from platform/:
//   npx tsx content/authored/maths/cbse-10-mathematics-ch10/src/build.mjs
// Every figure is computed: points of contact from the exact tangent construction, incircles from the
// tangent lengths, and each figure carries self-checks (points on circles, right angles, equal tangents).
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, topic, deck, sl, table, flow, geom, build, chapterTests, r, polar, tangentPts, along, pt, foot, incircle, triangleSSS, tangentialPolygon, dist } from './lib.mjs';

setUnit('cbse-10-mathematics-ch10');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- figures
const fig3Lines = (() => {
  const O = [3.5, 3], s3 = Math.sqrt(3);
  return geom({
    width: 7.2, height: 6.3,
    points: { O, T: { at: [3.5, 5], label_position: 'n' }, A: { at: pt(3.5 - s3, 2), label_position: 'sw' }, B: { at: pt(3.5 + s3, 2), label_position: 'se' }, L1: { at: [0.3, 5.7], label: false }, M1: { at: [6.9, 5.7], label: false }, L2: { at: [0.3, 5], label: false }, M2: { at: [6.9, 5], label: false }, L3: { at: [0.3, 2], label: false }, M3: { at: [6.9, 2], label: false } },
    lines: [{ through: ['L1', 'M1'], label: 'no common point', dashed: true }, { through: ['L2', 'M2'], label: 'tangent' }, { through: ['L3', 'M3'], label: 'secant' }],
    segments: [{ from: 'O', to: 'T', dashed: true }],
    circles: [{ center: 'O', radius: 2 }],
    angles: [{ at: 'T', from: 'O', to: 'M2', right: true }],
    on: [['T', 'O'], ['A', 'O'], ['B', 'O']], perp: [['O', 'T', 'M2']],
  }, 'A circle with centre O and three horizontal lines: the top line misses the circle, the middle line touches it at exactly one point T, and the lower line cuts it at two points A and B.', 'Three positions of a line: no common point, one common point (tangent at $T$), two common points (secant through $A$ and $B$).');
})();
const figLimit = (() => {
  const O = [3, 2.7], P = [3, 0.9];
  const q = [40, -15, -55].map((a) => polar(O, 1.8, a));
  return geom({
    width: 6.4, height: 4.8,
    points: { O, P: { at: P, label_position: 's' }, Q1: { at: q[0], label: '$Q_1$' }, Q2: { at: q[1], label: '$Q_2$' }, Q3: { at: q[2], label: '$Q_3$', label_position: 'e' }, X: { at: [0.2, 0.9], label: false }, Y: { at: [6.2, 0.9], label: false } },
    lines: [{ through: ['P', 'Q1'], dashed: true }, { through: ['P', 'Q2'], dashed: true }, { through: ['P', 'Q3'], dashed: true }, { through: ['X', 'Y'], label: 'tangent at P' }],
    circles: [{ center: 'O', radius: 1.8 }],
    on: [['P', 'O'], ['Q1', 'O'], ['Q2', 'O'], ['Q3', 'O']],
  }, 'A circle with a fixed point P at the bottom and three secants through P meeting the circle again at Q1, Q2 and Q3, each closer to P than the last; the horizontal tangent at P is the limiting position.', 'As $Q$ slides towards $P$, the secant $PQ$ turns into the tangent at $P$.');
})();
const figCount = (() => {
  const O1 = [1.6, 1.8], O2 = [5.3, 1.8], O3 = [9, 1.8], R0 = [11.6, 1.8];
  const [T1, T2] = tangentPts(O3, 1.2, R0);
  return geom({
    width: 12, height: 3.7,
    points: { O1: { at: O1, label: false }, O2: { at: O2, label: false }, O3: { at: O3, label: false }, P: [2.1, 1.5], Q: { at: [5.3, 3], label_position: 'n' }, R: { at: R0, label_position: 'e' }, T1: { at: T1, label: false }, T2: { at: T2, label: false }, U: { at: [4.0, 3], label: false }, V: { at: [6.6, 3], label: false } },
    segments: [{ from: 'U', to: 'V' }, { from: 'R', to: 'T1' }, { from: 'R', to: 'T2' }],
    circles: [{ center: 'O1', radius: 1.2, label: 'P inside: none' }, { center: 'O2', radius: 1.2, label: 'Q on: one' }, { center: 'O3', radius: 1.2, label: 'R outside: two' }],
    on: [['Q', 'O2'], ['T1', 'O3'], ['T2', 'O3']], perp: [['O3', 'T1', 'R'], ['O3', 'T2', 'R'], ['O2', 'Q', 'V']],
  }, 'Three equal circles. In the first, a point P lies inside and no tangent passes through it. In the second, a point Q lies on the circle with exactly one tangent. In the third, a point R lies outside with two tangents to the circle.', 'Number of tangents from a point: $0$ (inside), $1$ (on the circle), $2$ (outside).');
})();
const thm = (() => {
  const O = [3, 3], P = [3, 1], Qp = [5.4, 1];
  return { O, P, Q: Qp, R: along(O, Qp, 2) };
})();
const figThm = geom({
  width: 6.8, height: 5.3,
  points: { O: thm.O, P: { at: thm.P, label_position: 's' }, Q: { at: thm.Q, label_position: 's' }, R: { at: thm.R, label_position: 'ne' }, X: { at: [0.4, 1], label_position: 's' }, Y: { at: [6.4, 1], label_position: 's' } },
  segments: [{ from: 'X', to: 'Y' }, { from: 'O', to: 'P' }, { from: 'O', to: 'Q', dashed: true }],
  circles: [{ center: 'O', radius: 2 }],
  angles: [{ at: 'P', from: 'O', to: 'Y', right: true }],
  on: [['P', 'O'], ['R', 'O']], perp: [['O', 'P', 'Y']], col: [['O', 'R', 'Q'], ['X', 'P', 'Y']],
}, 'Circle with centre O and tangent XY at P. A point Q on the tangent is joined to O; the segment OQ crosses the circle at R, so OQ is longer than the radius OR, which equals OP. The radius OP is perpendicular to XY.', 'Theorem: the tangent at $P$ is perpendicular to the radius $OP$. $OQ > OR = OP$ for every other point $Q$ of the tangent.');
const well = (() => {
  const O = [2.3, 2.6], Qp = [6.55, 2.6];
  const [P1, P2] = tangentPts(O, 2, Qp);
  return { O, Q: Qp, P: P1[1] > P2[1] ? P1 : P2 };
})();
const figWell = geom({
  width: 7.1, height: 5,
  points: { O: well.O, Q: { at: well.Q, label_position: 'e' }, P: { at: well.P, label_position: 'n' } },
  segments: [{ from: 'O', to: 'P', label: '8 m' }, { from: 'O', to: 'Q', label: '17 m', dashed: true }, { from: 'P', to: 'Q', label: '?' }],
  circles: [{ center: 'O', radius: 2 }],
  angles: [{ at: 'P', from: 'O', to: 'Q', right: true }],
  on: [['P', 'O']], perp: [['O', 'P', 'Q']],
}, 'A circular well of radius 8 metres with centre O. A peg Q is 17 metres from O. A taut rope from Q touches the rim at P, making a right angle with the radius OP. The rope length PQ is unknown.', 'The rope $QP$ is a tangent, so $\\angle OPQ = 90^\\circ$.');
const ch = (() => {
  const O = [3, 3], P = [3, 0.8], Qp = polar(O, 2.2, 20);
  return { O, P, Q: Qp };
})();
const figChord = geom({
  width: 6.8, height: 5.6,
  points: { O: ch.O, P: { at: ch.P, label_position: 's' }, Q: { at: ch.Q, label_position: 'ne' }, T: { at: [6.4, 0.8], label_position: 's' }, S: { at: [0.4, 0.8], label_position: 's' } },
  segments: [{ from: 'S', to: 'T' }, { from: 'O', to: 'P' }, { from: 'O', to: 'Q' }, { from: 'P', to: 'Q' }],
  circles: [{ center: 'O', radius: 2.2 }],
  angles: [{ at: 'O', from: 'P', to: 'Q', label: '110°' }, { at: 'P', from: 'T', to: 'Q', label: '?' }, { at: 'P', from: 'O', to: 'S', right: true }],
  on: [['P', 'O'], ['Q', 'O']], perp: [['O', 'P', 'T']], deg: [['T', 'P', 'Q', 55], ['O', 'P', 'Q', 35]],
}, 'Circle with centre O; ST is the tangent at P. A chord PQ makes an angle with the tangent marked with a question mark, and the angle POQ at the centre is 110 degrees.', '$\\angle POQ = 110^\\circ$ and $ST$ is the tangent at $P$. Find $\\angle TPQ$.');
const figParallel = geom({
  width: 6, height: 5.2,
  points: { O: [3, 2.6], A: { at: [3, 4.4], label_position: 'n' }, B: { at: [3, 0.8], label_position: 's' }, L: { at: [0.4, 4.4], label: 'l' }, L2: { at: [5.6, 4.4], label: false }, M: { at: [0.4, 0.8], label: 'm' }, M2: { at: [5.6, 0.8], label: false } },
  segments: [{ from: 'L', to: 'L2' }, { from: 'M', to: 'M2' }, { from: 'A', to: 'B' }],
  circles: [{ center: 'O', radius: 1.8 }],
  angles: [{ at: 'A', from: 'O', to: 'L2', right: true }, { at: 'B', from: 'O', to: 'M2', right: true }],
  on: [['A', 'O'], ['B', 'O']], perp: [['O', 'A', 'L2'], ['O', 'B', 'M2']], col: [['A', 'O', 'B']],
}, 'Circle with diameter AB. The tangent l at A and the tangent m at B are both perpendicular to AB, so they are parallel, and the distance between them is the diameter.', 'Tangents at the ends of a diameter are parallel; the distance between them is $2r$.');
const two = (() => {
  const O = [2.6, 2.6], P = [7.8, 2.6];
  const [A, B] = tangentPts(O, 1.8, P);
  return { O, P, A, B };
})();
const figTwo = geom({
  width: 8.4, height: 5.2,
  points: { O: two.O, P: { at: two.P, label_position: 'e' }, A: { at: two.A, label_position: 'n' }, B: { at: two.B, label_position: 's' } },
  segments: [{ from: 'P', to: 'A', ticks: 1 }, { from: 'P', to: 'B', ticks: 1 }, { from: 'O', to: 'A' }, { from: 'O', to: 'B' }, { from: 'O', to: 'P', dashed: true }],
  circles: [{ center: 'O', radius: 1.8 }],
  angles: [{ at: 'A', from: 'O', to: 'P', right: true }, { at: 'B', from: 'O', to: 'P', right: true }],
  on: [['A', 'O'], ['B', 'O']], perp: [['O', 'A', 'P'], ['O', 'B', 'P']], eq: [['P', 'A', 'P', 'B']],
}, 'Circle with centre O and an external point P. Two tangents PA and PB touch the circle at A and B and are marked equal; the radii OA and OB meet them at right angles, and OP is joined.', 'Tangents from an external point are equal: $PA = PB$.');
const ang = (() => {
  const O = [2.4, 2.6], P = [5.6, 2.6];
  const [A, B] = tangentPts(O, 1.6, P);
  return { O, P, A, B };
})();
const figAngles = geom({
  width: 6.4, height: 5.2,
  points: { O: ang.O, P: { at: ang.P, label_position: 'e' }, A: { at: ang.A, label_position: 'n' }, B: { at: ang.B, label_position: 's' } },
  segments: [{ from: 'P', to: 'A', ticks: 1 }, { from: 'P', to: 'B', ticks: 1 }, { from: 'O', to: 'A' }, { from: 'O', to: 'B' }, { from: 'O', to: 'P', dashed: true }, { from: 'A', to: 'B', dashed: true }],
  circles: [{ center: 'O', radius: 1.6 }],
  angles: [{ at: 'P', from: 'B', to: 'A', label: '60°' }, { at: 'O', from: 'A', to: 'B', label: '120°' }, { at: 'A', from: 'O', to: 'P', right: true }, { at: 'B', from: 'O', to: 'P', right: true }],
  on: [['A', 'O'], ['B', 'O']], perp: [['O', 'A', 'P'], ['O', 'B', 'P']], deg: [['A', 'P', 'O', 30], ['A', 'O', 'P', 60]],
}, 'Two tangents from P make an angle of 60 degrees; the angle AOB at the centre is 120 degrees. OP bisects both angles and the chord AB is perpendicular to OP.', '$\\angle APB + \\angle AOB = 60^\\circ + 120^\\circ = 180^\\circ$, and $OP$ bisects both angles.');
const ex1 = (() => {
  const O = [2.2, 2.4], P = [5.2, 2.4];
  const [A, B] = tangentPts(O, 1.8, P);
  return { O, P, A, B };
})();
const figEx1 = geom({
  width: 5.8, height: 4.6,
  points: { O: ex1.O, P: { at: ex1.P, label_position: 'e' }, A: { at: ex1.A, label_position: 'n' }, B: { at: ex1.B, label_position: 's' } },
  segments: [{ from: 'O', to: 'A', label: '6 cm' }, { from: 'O', to: 'P', label: '10 cm', dashed: true }, { from: 'P', to: 'A', label: '?' }, { from: 'P', to: 'B' }, { from: 'O', to: 'B' }],
  circles: [{ center: 'O', radius: 1.8 }],
  angles: [{ at: 'A', from: 'O', to: 'P', right: true }],
  on: [['A', 'O'], ['B', 'O']], perp: [['O', 'A', 'P']], eq: [['P', 'A', 'P', 'B']],
}, 'Circle of radius 6 centimetres with centre O; P is 10 centimetres from O. Tangents PA and PB are drawn; the length PA is unknown.', 'Radius $6$ cm, $OP = 10$ cm. Find $PA$.');
const ex2 = (() => {
  const O = [2.4, 2.6], P = [2.4 + 1.6 / Math.sin((25 * Math.PI) / 180), 2.6];
  const [A, B] = tangentPts(O, 1.6, pt(...P));
  return { O, P: pt(...P), A, B };
})();
const figEx2 = geom({
  width: 6.8, height: 4.8,
  points: { O: ex2.O, P: { at: ex2.P, label_position: 'e' }, A: { at: ex2.A, label_position: 'n' }, B: { at: ex2.B, label_position: 's' } },
  segments: [{ from: 'P', to: 'A' }, { from: 'P', to: 'B' }, { from: 'O', to: 'A' }, { from: 'O', to: 'B' }, { from: 'A', to: 'B' }],
  circles: [{ center: 'O', radius: 1.6 }],
  angles: [{ at: 'P', from: 'B', to: 'A', label: '50°' }, { at: 'A', from: 'O', to: 'B', label: '?' }],
  on: [['A', 'O'], ['B', 'O']], perp: [['O', 'A', 'P'], ['O', 'B', 'P']], deg: [['O', 'A', 'B', 25], ['P', 'A', 'B', 65]],
}, 'Two tangents from P to a circle with centre O meet at an angle of 50 degrees. The chord AB is drawn and the angle OAB is marked with a question mark.', 'Tangents $PA$, $PB$ with $\\angle APB = 50^\\circ$. Find $\\angle OAB$.');
const quad = tangentialPolygon([3, 4, 5, 3], 0.4, [3.4, 3.1], 200);
const figQuad = (() => {
  const [A, B, C, D] = quad.V, [P, Q, R, S] = quad.T;
  return geom({
    width: 6.8, height: 6.2,
    points: { A: { at: A, label_position: 'w' }, B: { at: B, label_position: 's' }, C: { at: C, label_position: 'e' }, D: { at: D, label_position: 'n' }, O: [3.4, 3.1], P: { at: P, label_position: 'sw' }, Q: { at: Q, label_position: 'se' }, R: { at: R, label_position: 'ne' }, S: { at: S, label_position: 'nw' } },
    segments: [{ from: 'A', to: 'B', label: '7 cm' }, { from: 'B', to: 'C', label: '9 cm' }, { from: 'C', to: 'D', label: '8 cm' }, { from: 'D', to: 'A', label: '?' }],
    circles: [{ center: 'O', radius: quad.rd }],
    on: [['P', 'O'], ['Q', 'O'], ['R', 'O'], ['S', 'O']], perp: [['O', 'P', 'B'], ['O', 'Q', 'C'], ['O', 'R', 'D'], ['O', 'S', 'A']], col: [['A', 'P', 'B'], ['B', 'Q', 'C'], ['C', 'R', 'D'], ['D', 'S', 'A']], eq: [['A', 'P', 'A', 'S'], ['B', 'P', 'B', 'Q'], ['C', 'Q', 'C', 'R'], ['D', 'R', 'D', 'S']],
  }, 'A quadrilateral ABCD drawn around a circle that touches its sides at P, Q, R and S. AB is 7 centimetres, BC is 9 centimetres, CD is 8 centimetres and DA is marked with a question mark.', '$ABCD$ circumscribes the circle: $AB + CD = BC + DA$.');
})();
const tri = (() => {
  const k = 0.32;
  const { A, B, C } = triangleSSS(14 * k, 12 * k, 10 * k, [0.5, 0.5]);
  const { I, r: rd } = incircle(A, B, C);
  return { A, B, C, I, rd, D: along(B, C, 6 * k), E: along(C, A, 8 * k), F: along(B, A, 6 * k) };
})();
const figTri = geom({
  width: 5.5, height: 3.7,
  points: { A: { at: tri.A, label_position: 'n' }, B: { at: tri.B, label_position: 'sw' }, C: { at: tri.C, label_position: 'se' }, O: tri.I, D: { at: tri.D, label_position: 's' }, E: { at: tri.E, label_position: 'ne' }, F: { at: tri.F, label_position: 'nw' } },
  segments: [{ from: 'A', to: 'B', label: '10 cm' }, { from: 'B', to: 'D', label: '6 cm' }, { from: 'D', to: 'C', label: '8 cm' }, { from: 'C', to: 'A', label: '?' }],
  circles: [{ center: 'O', radius: tri.rd }],
  on: [['D', 'O'], ['E', 'O'], ['F', 'O']], perp: [['O', 'D', 'C'], ['O', 'E', 'A'], ['O', 'F', 'B']],
}, 'Triangle ABC with a circle inside touching BC at D, CA at E and AB at F. AB is 10 centimetres, BD is 6 centimetres, DC is 8 centimetres, and AC is marked with a question mark.', 'The incircle touches $BC$ at $D$: $BD = 6$ cm, $DC = 8$ cm, $AB = 10$ cm.');
const rh = (() => {
  const c = [3, 2.2], A = [0.6, 2.2], B = [3, 0.6], C = [5.4, 2.2], D = [3, 3.8];
  const rr = (2.4 * 1.6) / Math.hypot(2.4, 1.6);
  return { c, A, B, C, D, rr: Math.round(rr * 1e4) / 1e4, T: [foot(c, A, B), foot(c, B, C), foot(c, C, D), foot(c, D, A)] };
})();
const figRhombus = geom({
  width: 6, height: 4.4,
  points: { O: rh.c, A: { at: rh.A, label_position: 'w' }, B: { at: rh.B, label_position: 's' }, C: { at: rh.C, label_position: 'e' }, D: { at: rh.D, label_position: 'n' }, P: { at: rh.T[0], label: false }, Q: { at: rh.T[1], label: false }, R: { at: rh.T[2], label: false }, S: { at: rh.T[3], label: false } },
  segments: [{ from: 'A', to: 'B', ticks: 1 }, { from: 'B', to: 'C', ticks: 1 }, { from: 'C', to: 'D', ticks: 1 }, { from: 'D', to: 'A', ticks: 1 }],
  circles: [{ center: 'O', radius: rh.rr }],
  on: [['P', 'O'], ['Q', 'O'], ['R', 'O'], ['S', 'O']], eq: [['A', 'B', 'B', 'C'], ['B', 'C', 'C', 'D'], ['C', 'D', 'D', 'A']],
}, 'A parallelogram ABCD drawn around a circle. All four sides are marked equal, showing that it must be a rhombus.', 'A parallelogram that circumscribes a circle has $AB + CD = BC + DA$, so all its sides are equal: a rhombus.');
const figPark = geom({
  width: 5.6, height: 5.6,
  points: { O: [2.8, 2.8], A: { at: [0.4, 2.1], label_position: 'w' }, B: { at: [5.2, 2.1], label_position: 'e' }, M: { at: [2.8, 2.1], label_position: 's' } },
  segments: [{ from: 'A', to: 'M', label: '?' }, { from: 'M', to: 'B' }, { from: 'O', to: 'A', label: '25 m', dashed: true }, { from: 'O', to: 'M', label: '7 m' }],
  circles: [{ center: 'O', radius: 2.5 }, { center: 'O', radius: 0.7 }],
  angles: [{ at: 'M', from: 'O', to: 'B', right: true }],
  on: [['A', 'O'], ['B', 'O']], perp: [['O', 'M', 'B']], eq: [['A', 'M', 'M', 'B']],
}, 'Two circles with the same centre O: a park of radius 25 metres and a pool of radius 7 metres. A straight path AB across the park touches the pool at M; OM is perpendicular to AB.', 'The path $AB$ touches the pool at $M$, so $OM \\perp AB$ and $M$ is the midpoint of $AB$.');

const caseTable = table(['Line', 'Distance $d$ from centre', 'Common points', 'Name'], [['misses the circle', '$d > r$', '$0$', '—'], ['touches the circle', '$d = r$', '$1$', 'tangent'], ['cuts the circle', '$d < r$', '$2$', 'secant']], 'Table: a line at a distance greater than the radius has no common point with the circle; at a distance equal to the radius it has one common point and is a tangent; at a distance less than the radius it has two and is a secant.', 'Compare the distance of the line from the centre with the radius.');
const summary1 = table(['Result', 'Use it to'], [['Tangent $\\perp$ radius at the point of contact', 'get a right angle, then Pythagoras or the angle sum'], ['Tangents at the ends of a diameter are parallel', 'distance between parallel tangents $= 2r$'], ['The perpendicular to a tangent at its point of contact passes through the centre', 'locate the centre'], ['Tangents from a point: $0$ inside, $1$ on, $2$ outside', 'count tangents']], 'Summary table of part one: the tangent is perpendicular to the radius, tangents at the ends of a diameter are parallel and 2 r apart, the perpendicular to a tangent at its point of contact passes through the centre, and the number of tangents from a point is 0, 1 or 2.', 'Every result in this chapter starts from the right angle at the point of contact.');
const summary2 = table(['Configuration', 'Result'], [['Tangents $PA$, $PB$ from $P$', '$PA = PB$; $OP$ bisects $\\angle APB$ and $\\angle AOB$'], ['Angles', '$\\angle APB + \\angle AOB = 180^\\circ$'], ['Quadrilateral round a circle', '$AB + CD = BC + DA$'], ['Triangle round a circle', 'tangent from a vertex $=$ semi-perimeter $-$ opposite side'], ['Parallelogram round a circle', 'it is a rhombus']], 'Summary table of part two: tangents from a point are equal and O P bisects the angles; the angle between the tangents and the angle at the centre add to 180 degrees; a circumscribed quadrilateral has equal sums of opposite sides; in a circumscribed triangle the tangent from a vertex is the semi-perimeter minus the opposite side; a circumscribed parallelogram is a rhombus.', 'One theorem, many consequences.');
const exampleWE1 = table(['Line', 'Distance from $O$', 'Compare with $r = 5$ cm', 'Position'], [['$l_1$', '$3$ cm', '$3 < 5$', 'secant; chord $= 2\\sqrt{25 - 9} = 8$ cm'], ['$l_2$', '$5$ cm', '$5 = 5$', 'tangent'], ['$l_3$', '$7$ cm', '$7 > 5$', 'no common point']], 'Worked table: for a circle of radius 5 centimetres, a line 3 centimetres from the centre is a secant with a chord of 8 centimetres, a line 5 centimetres away is a tangent, and a line 7 centimetres away misses the circle.', 'Distance less than, equal to, or more than the radius.');
const proofFlow = flow('TB', [['g', 'Given: tangent $XY$ at $P$; to prove $OP \\perp XY$'], ['q', 'Take any other point $Q$ on $XY$'], ['o', '$Q$ is outside the circle (else $XY$ is a secant)'], ['l', '$OQ > OR = OP$'], ['s', '$OP$ is the shortest segment from $O$ to $XY$'], ['c', 'Shortest segment is perpendicular: $OP \\perp XY$']], [['g', 'q'], ['q', 'o'], ['o', 'l'], ['l', 's'], ['s', 'c']], 'Proof chain: take any other point Q on the tangent; it lies outside the circle, so O Q is longer than the radius; hence O P is the shortest segment from O to the tangent, and the shortest segment is the perpendicular.', 'The proof in five links.');

// ---------------------------------------------------------------- deck 1
const d1 = deck({
  part: 1,
  title: 'Circles — Part 1: Tangents and the radius',
  goals: ['Tell a secant from a tangent and a line that misses the circle', 'State how many tangents pass through a point inside, on and outside a circle', 'Prove that the tangent at a point is perpendicular to the radius', 'Use the right angle at the point of contact to find lengths and angles'],
  slides: [
    sl('title', 'Circles, Part 1: Tangents and the radius', { b: 'A line can miss a circle, cut it twice, or just **touch** it once.', v: fig3Lines, n: 'Welcome to Circles. Think of a cycle wheel resting on a road. The road touches the wheel at just one point. In this chapter that kind of line is called a tangent. We will see where tangents come from, prove the one fact that powers the whole chapter, and use it to find lengths and angles.' }),
    sl('concept', 'What you will be able to do', { ul: ['Name the three positions of a line and a circle', 'Count the tangents from a point **inside**, **on** and **outside** a circle', 'Prove: **tangent $\\perp$ radius** at the point of contact', 'Find tangent lengths with Pythagoras', 'Find angles using the right angle at the point of contact'], n: 'Here are your goals for part one. The chapter is short, but every question uses the same small set of facts. If you understand why the tangent is perpendicular to the radius, the rest follows naturally.' }),
    sl('diagram', 'A line and a circle: three cases', { b: 'Let $d$ be the distance of the line from the centre $O$ and $r$ the radius.', v: caseTable, n: 'Drop a perpendicular from the centre to the line, and call its length d. If d is more than the radius, the line misses the circle. If d is less, the line cuts the circle at two points and is called a secant. If d is exactly the radius, the line touches the circle at one point. That line is a tangent.' }),
    sl('concept', 'A tangent is the limit of secants', { b: 'Fix $P$ on the circle and let $Q$ slide along the circle towards $P$. The secant $PQ$ turns, and when $Q$ reaches $P$ it becomes the **tangent at $P$**. The common point is the **point of contact**.', v: figLimit, n: 'Here is another way to see a tangent. Fix a point P on the circle and draw a secant through P and a second point Q. Now slide Q towards P. The secant turns, and the two common points come closer. When they merge into one, the secant has become the tangent at P. There is exactly one tangent at each point.' }),
    sl('check', 'Quick check: which kind of line?', { b: 'Compare the distance of the line from the centre with the radius.', chk: 'm04', n: 'Is the distance from the centre smaller than the radius, equal to it, or larger? That single comparison decides the answer.' }),
    sl('diagram', 'How many tangents from a point?', { b: 'From a point **inside**: none. From a point **on** the circle: exactly one. From a point **outside**: exactly two.', v: figCount, n: 'Every line through an inside point cuts the circle twice, so no tangent passes through it. At a point on the circle there is exactly one tangent. From a point outside there are two, one touching each side of the circle. Remember the pattern: none, one, two.' }),
    sl('example', 'Worked example 1: position of a line', { b: 'A circle has radius $5$ cm. Lines $l_1$, $l_2$, $l_3$ are $3$ cm, $5$ cm and $7$ cm from its centre. Describe each, and find the chord cut off by the secant.', ul: ['**Step 1 —** $3 < 5$: $l_1$ is a **secant**.', '**Step 2 —** $5 = 5$: $l_2$ is a **tangent**; $7 > 5$: $l_3$ misses the circle.', '**Step 3 —** The perpendicular from $O$ bisects the chord: half-chord $= \\sqrt{5^2 - 3^2} = 4$ cm.', '**Answer —** The chord on $l_1$ is $8$ cm long.'], v: exampleWE1, n: 'Compare each distance with the radius: three is less than five, five equals five, and seven is more. So we have a secant, a tangent and a line that misses. For the chord, use the class nine fact that the perpendicular from the centre bisects a chord. Pythagoras gives half the chord as four, so the chord is eight centimetres.' }),
    sl('diagram', 'Theorem: the tangent is perpendicular to the radius', { b: '**Theorem.** The tangent at any point of a circle is perpendicular to the radius through the point of contact.', v: figThm, n: 'Here is the key theorem of the chapter. The tangent at any point of a circle is perpendicular to the radius through the point of contact. In the figure, the tangent X Y touches the circle at P, and the radius O P meets it at a right angle. Learn the statement exactly; it is examined as a proof.' }),
    sl('concept', 'Proof of the theorem', { b: '**Given:** tangent $XY$ at $P$, centre $O$. **To prove:** $OP \\perp XY$.', ul: ['Take any point $Q$ on $XY$ other than $P$; join $OQ$', '$Q$ lies **outside** the circle — otherwise $XY$ would cut the circle twice', 'So $OQ$ meets the circle at $R$, and $OQ > OR = OP$', '$OP$ is the **shortest** segment from $O$ to $XY$', 'The shortest segment from a point to a line is perpendicular: $OP \\perp XY$'], v: proofFlow, n: 'Take any other point Q on the tangent. It cannot be inside the circle, or the line would be a secant. So Q is outside, and O Q is longer than the radius. That makes O P the shortest segment from O to the tangent. And the shortest segment from a point to a line is the perpendicular. That completes the proof.' }),
    sl('example', 'Worked example 2: a rope round a well', { b: 'A circular well in a Rajasthan village has radius $8$ m. A rope from a peg $Q$, $17$ m from the centre, is pulled taut so that it just touches the rim at $P$. How long is $QP$?', ul: ['**Step 1 —** The rope touches the rim, so $QP$ is a tangent and $\\angle OPQ = 90^\\circ$.', '**Step 2 —** In right $\\triangle OPQ$ the hypotenuse is $OQ = 17$ m.', '**Step 3 —** $QP = \\sqrt{17^2 - 8^2} = \\sqrt{289 - 64} = \\sqrt{225} = 15$ m.', '**Check —** $8^2 + 15^2 = 64 + 225 = 289 = 17^2$ ✓.'], v: figWell, n: 'The rope touches the rim, so it is a tangent, and the radius to the point of contact makes a right angle with it. Now it is just Pythagoras. Be careful: the hypotenuse is the line from the centre to the peg, seventeen metres, because it is opposite the right angle. So the rope is fifteen metres long.' }),
    sl('check', 'Quick check: tangent length', { b: 'Find the right angle first, then decide which side is the hypotenuse.', chk: 'm05', n: 'Where is the right angle? The side opposite it is the hypotenuse. Then use Pythagoras.' }),
    sl('example', 'Worked example 3: tangent and chord', { b: '$ST$ is the tangent at $P$ to a circle with centre $O$, and $PQ$ is a chord with $\\angle POQ = 110^\\circ$. Find $\\angle TPQ$.', ul: ['**Step 1 —** $OP = OQ$, so $\\angle OPQ = \\angle OQP = \\dfrac{180^\\circ - 110^\\circ}{2} = 35^\\circ$.', '**Step 2 —** $\\angle OPT = 90^\\circ$ (tangent $\\perp$ radius).', '**Step 3 —** $\\angle TPQ = 90^\\circ - 35^\\circ = 55^\\circ$.', '**Pattern —** The angle between the tangent and the chord is half the angle at the centre.'], v: figChord, n: 'Two facts do all the work. First, the triangle O P Q has two equal radii, so its base angles are equal, thirty five degrees each. Second, the tangent makes a right angle with the radius O P. Subtract to get fifty five degrees. Notice it is exactly half of one hundred and ten. That pattern always holds.' }),
    sl('diagram', 'Two consequences of the theorem', { b: '(1) The line perpendicular to a tangent at its point of contact **passes through the centre**. (2) The tangents at the two ends of a diameter are **parallel**, $2r$ apart.', v: figParallel, n: 'Two useful consequences. First, if you draw the perpendicular to a tangent at its point of contact, it must pass through the centre, because the radius is already that perpendicular. Second, the tangents at the two ends of a diameter are both perpendicular to it, so they are parallel. The distance between them is the diameter.' }),
    sl('check', 'Quick check: angle between tangent and chord', { b: 'Use the right angle and the isosceles triangle.', chk: 'm08', n: 'Start with the right angle between the tangent and the radius. Then use the two equal radii.' }),
    sl('summary', 'Summary', { ul: ['$d > r$: no common point; $d = r$: **tangent**; $d < r$: **secant**', 'Tangents from a point: none inside, one on, two outside', '**Tangent $\\perp$ radius** at the point of contact — prove it by "shortest distance"', 'Right triangle $OPQ$: hypotenuse is $OQ$, from the centre to the outside point', 'Tangent–chord angle $=$ half the angle at the centre'], v: summary1, n: 'To sum up part one. Compare the distance of a line from the centre with the radius to name it. Count tangents from a point: none, one or two. Above all, the tangent is perpendicular to the radius at the point of contact. That right angle lets you use Pythagoras and angle sums in almost every question.' }),
    sl('exam-tips', 'Exam tips: how marks are awarded', { ul: ['**Theorem proof (3–5 marks):** given, to prove and figure 1 + point $Q$ outside 1 + $OQ > OP$ 1 + "shortest is perpendicular" 1', '**Tangent length (2 marks):** right angle stated with reason 1 + Pythagoras and answer 1', '**Mistake:** taking the tangent as the hypotenuse', '**Mistake:** marking the right angle at the outside point instead of at the point of contact', '**Mistake:** forgetting to write the reason "tangent $\\perp$ radius"'], n: 'In proofs, write given, to prove, and draw a neat figure; each earns credit. In numerical questions, always write the reason for the right angle: tangent perpendicular to radius. The most common slip is using the wrong hypotenuse. The hypotenuse always runs from the centre to the outside point.' }),
  ],
});

// ---------------------------------------------------------------- deck 2
const d2 = deck({
  part: 2,
  title: 'Circles — Part 2: Tangents from an external point',
  goals: ['Prove that the two tangents from an external point are equal', 'Use the angle facts: OP bisects the angles and the angle between the tangents is supplementary to the angle at the centre', 'Solve problems on quadrilaterals and triangles drawn round a circle', 'Combine both theorems in multi-step problems'],
  slides: [
    sl('title', 'Circles, Part 2: Tangents from an external point', { b: 'Two tangents, one point, and a surprising equality.', v: figTwo, n: 'Welcome to part two. From a point outside a circle we can draw two tangents. Measure them and you will find they are always equal. In this part we prove that, and then use it to solve problems on triangles and quadrilaterals drawn around a circle, like a pond touching every wall of a park.' }),
    sl('concept', 'What you will be able to do', { ul: ['Prove: **tangents from an external point are equal**', 'Use: $OP$ bisects $\\angle APB$; $\\angle APB + \\angle AOB = 180^\\circ$', 'Prove and use $AB + CD = BC + DA$ for a quadrilateral round a circle', 'Find tangent lengths in a triangle round a circle', 'Show that a parallelogram round a circle is a rhombus'], n: 'These are your goals for part two. The second theorem is short to prove, and it unlocks a whole family of results. The board often asks for its proof, and then for a calculation that uses it.' }),
    sl('diagram', 'Theorem: tangents from an external point are equal', { b: '**Theorem.** The lengths of the two tangents drawn from an external point to a circle are equal: $PA = PB$.', v: figTwo, n: 'Here is the theorem. The two tangents drawn from a point outside a circle have equal lengths. In the figure, P A equals P B. The radii O A and O B meet the tangents at right angles, because of the first theorem. That is the key to the proof.' }),
    sl('concept', 'Proof by RHS congruence', { b: '**Given:** $PA$, $PB$ tangents from $P$; centre $O$. **To prove:** $PA = PB$. **Join** $OA$, $OB$, $OP$.', ul: ['$\\angle OAP = \\angle OBP = 90^\\circ$ (tangent $\\perp$ radius)', '$OA = OB$ (radii)', '$OP = OP$ (common hypotenuse)', '$\\triangle OAP \\cong \\triangle OBP$ (RHS), so $PA = PB$ (CPCT)'], v: figTwo, n: 'Join O to A, B and P. The angles at A and B are right angles by the first theorem. The radii O A and O B are equal, and the hypotenuse O P is shared. So the two right triangles are congruent by R H S, and the corresponding sides P A and P B are equal. Four lines, four marks.' }),
    sl('diagram', 'What else the congruence gives', { b: 'From $\\triangle OAP \\cong \\triangle OBP$: $OP$ **bisects** $\\angle APB$ and $\\angle AOB$. In $OAPB$ two angles are $90^\\circ$, so $\\angle APB + \\angle AOB = 180^\\circ$. Also $AB \\perp OP$.', v: figAngles, n: 'The same congruence gives more. The angles at P are equal, so O P bisects the angle between the tangents, and it also bisects the angle at the centre. The quadrilateral O A P B has two right angles, so the other two angles add to one hundred and eighty degrees. Here, sixty and one hundred and twenty.' }),
    sl('check', 'Quick check: angle at the centre', { b: 'Use the angle sum of the quadrilateral $OAPB$.', chk: 'm10', n: 'Two angles of the quadrilateral are right angles. What must the other two add up to?' }),
    sl('example', 'Worked example 1: lengths', { b: 'From $P$, $10$ cm from the centre of a circle of radius $6$ cm, tangents $PA$ and $PB$ are drawn. Find $PA$ and the length of the chord $AB$.', ul: ['**Step 1 —** $\\angle OAP = 90^\\circ$: $PA = \\sqrt{10^2 - 6^2} = 8$ cm, and $PB = PA = 8$ cm.', '**Step 2 —** $AB \\perp OP$ at $M$. Area of $\\triangle OAP$: $\\dfrac12 \\times 6 \\times 8 = \\dfrac12 \\times 10 \\times AM$.', '**Step 3 —** $AM = \\dfrac{48}{10} = 4.8$ cm, so $AB = 9.6$ cm.', '**Check —** $OM = \\dfrac{36}{10} = 3.6$ and $3.6^2 + 4.8^2 = 12.96 + 23.04 = 36$ ✓.'], v: figEx1, n: 'Start with the right angle at A and Pythagoras: P A is eight centimetres, and P B is the same. For the chord, remember that A B is perpendicular to O P. Write the area of triangle O A P in two ways, once with base O A and once with base O P. That gives half the chord, four point eight, so the chord is nine point six.' }),
    sl('example', 'Worked example 2: angles', { b: 'Tangents $PA$ and $PB$ meet at $P$ with $\\angle APB = 50^\\circ$. Find $\\angle PAB$ and $\\angle OAB$.', ul: ['**Step 1 —** $PA = PB$, so $\\angle PAB = \\angle PBA = \\dfrac{180^\\circ - 50^\\circ}{2} = 65^\\circ$.', '**Step 2 —** $\\angle OAP = 90^\\circ$, so $\\angle OAB = 90^\\circ - 65^\\circ = 25^\\circ$.', '**Pattern —** $\\angle OAB = \\dfrac12 \\angle APB$ always.', '**Check —** $\\angle AOB = 180^\\circ - 50^\\circ = 130^\\circ$, and in isosceles $\\triangle OAB$: $\\dfrac{180^\\circ - 130^\\circ}{2} = 25^\\circ$ ✓.'], v: figEx2, n: 'Because the tangents are equal, triangle P A B is isosceles, so each base angle is sixty five degrees. The radius makes a right angle with the tangent at A, so the angle O A B is ninety minus sixty five, twenty five degrees. Check it another way, through the angle at the centre. Both routes agree.' }),
    sl('diagram', 'A quadrilateral round a circle', { b: 'If a circle touches all four sides of $ABCD$ at $P$, $Q$, $R$, $S$, then $AB + CD = BC + DA$.', ul: ['Equal tangents: $AP = AS$, $BP = BQ$, $CR = CQ$, $DR = DS$', 'Add: $(AP + BP) + (CR + DR) = (AS + DS) + (BQ + CQ)$', 'So $AB + CD = AD + BC$'], v: figQuad, n: 'Now draw a quadrilateral around a circle. Each vertex sends out two equal tangents. Add the four pieces that make up A B and C D, then regroup them into A D and B C. The sums of opposite sides come out equal. This proof is short and is a favourite in board papers.' }),
    sl('example', 'Worked example 3: the missing side', { b: 'In the figure, $AB = 7$ cm, $BC = 9$ cm, $CD = 8$ cm. Find $DA$. If $AP = 3$ cm, find the tangent lengths from $B$, $C$ and $D$.', ul: ['**Step 1 —** $AB + CD = BC + DA$: $7 + 8 = 9 + DA$, so $DA = 6$ cm.', '**Step 2 —** $BQ = BP = 7 - 3 = 4$ cm; $CR = CQ = 9 - 4 = 5$ cm.', '**Step 3 —** $DS = DR = 8 - 5 = 3$ cm.', '**Check —** $AS = DA - DS = 6 - 3 = 3 = AP$ ✓.'], v: figQuad, n: 'The opposite-sides rule gives the missing side at once: six centimetres. If one tangent length is known, walk around the quadrilateral. Each side minus the tangent already known gives the next tangent. When you come back to A, you should get the length you started with. That final check catches arithmetic slips.' }),
    sl('check', 'Quick check: circumscribed quadrilateral', { b: 'Pair the opposite sides correctly.', chk: 'm12', n: 'Which sides are opposite? Their sums must be equal.' }),
    sl('example', 'Worked example 4: a triangle round a circle', { b: 'The incircle of $\\triangle ABC$ touches $BC$ at $D$, $CA$ at $E$, $AB$ at $F$, with $BD = 6$ cm, $DC = 8$ cm and $AB = 10$ cm. Find $AC$ and the perimeter.', ul: ['**Step 1 —** $BF = BD = 6$ cm, so $AF = 10 - 6 = 4$ cm.', '**Step 2 —** $AE = AF = 4$ cm and $CE = CD = 8$ cm.', '**Step 3 —** $AC = 4 + 8 = 12$ cm. Perimeter $= 10 + 14 + 12 = 36$ cm.', '**Shortcut —** tangent from a vertex $=$ semi-perimeter $-$ opposite side: $AF = 18 - 14 = 4$ ✓.'], v: figTri, n: 'Each vertex sends out two equal tangents. From B, both are six. So A F is four, and A E is also four. From C, both tangents are eight. Add them to get A C, twelve centimetres. A neat shortcut: the tangent from any vertex equals the semi-perimeter minus the side opposite that vertex.' }),
    sl('check', 'Quick check: perimeter from tangent lengths', { b: 'Each tangent length appears twice in the perimeter.', chk: 'm13', n: 'Write each side as the sum of two tangent lengths. How many times does each tangent length appear?' }),
    sl('diagram', 'A parallelogram round a circle is a rhombus', { b: 'If parallelogram $ABCD$ circumscribes a circle: $AB + CD = BC + DA$ with $AB = CD$, $BC = DA$, so $2AB = 2BC$ and **all four sides are equal**.', v: figRhombus, n: 'Combine the opposite-sides rule with what you know about parallelograms. Opposite sides are equal, so the rule becomes two A B equals two B C. All four sides are equal, so the parallelogram must be a rhombus. A rectangle that is not a square can never be drawn around a circle.' }),
    sl('example', 'Worked example 5: a path past a pool', { b: 'A circular park in Pune has radius $25$ m, and a circular pool with the same centre has radius $7$ m. A straight path $AB$ crosses the park and just touches the pool at $M$. Find the length of the path.', ul: ['**Step 1 —** $OM \\perp AB$ (radius $\\perp$ tangent).', '**Step 2 —** $\\triangle OMA \\cong \\triangle OMB$ (RHS), so $M$ is the midpoint of $AB$.', '**Step 3 —** $AM = \\sqrt{25^2 - 7^2} = \\sqrt{625 - 49} = \\sqrt{576} = 24$ m.', '**Answer —** $AB = 48$ m.'], v: figPark, n: 'The path touches the pool, so it is a tangent to the small circle, and O M is perpendicular to it. For the big circle, the same path is a chord, and the perpendicular from the centre bisects it. Pythagoras in triangle O M A gives twenty four metres, so the whole path is forty eight metres.' }),
    sl('summary', 'Summary', { ul: ['**Tangents from an external point are equal** — proof by RHS', '$OP$ bisects $\\angle APB$ and $\\angle AOB$; $\\angle APB + \\angle AOB = 180^\\circ$', 'Quadrilateral round a circle: $AB + CD = BC + DA$', 'Triangle round a circle: tangent from a vertex $= s -$ opposite side', 'Parallelogram round a circle is a rhombus'], v: summary2, n: 'To sum up part two. Tangents from an outside point are equal, proved by R H S. The line to the centre bisects the angles, and the angle between the tangents is supplementary to the angle at the centre. For figures drawn around a circle, mark the equal tangents from every vertex and the rest is addition.' }),
    sl('exam-tips', 'Exam tips: how marks are awarded', { ul: ['**Equal tangents proof (3 marks):** figure with radii joined 1 + right angles and RHS 1 + conclusion 1', '**Quadrilateral proof (3 marks):** four pairs of equal tangents 1 + adding and regrouping 1 + conclusion 1', '**Mistake:** writing $\\angle APB = \\angle AOB$ instead of supplementary', '**Mistake:** pairing adjacent sides in $AB + CD = BC + DA$', '**Mistake:** in a triangle, subtracting the wrong side from the semi-perimeter'], n: 'In proofs, join the radii in your figure and state the right angles with the reason. Name the congruence rule, R H S. In quadrilateral problems, write the four pairs of equal tangents before adding. Watch the classic slips: the angles at P and O are supplementary, not equal, and opposite sides, not adjacent sides, have equal sums.' }),
  ],
});

// ---------------------------------------------------------------- notes
const notes = {
  unit: 'cbse-10-mathematics-ch10', version: 1, title: 'Circles — chapter notes', language: 'en',
  sections: [
    { heading: '1. Lines and circles', body_md: r`Let $d$ be the distance of a line from the centre $O$ of a circle of radius $r$.

- $d > r$: the line has **no common point** with the circle.
- $d = r$: exactly **one** common point — the line is a **tangent**, and the common point is the **point of contact**.
- $d < r$: **two** common points — the line is a **secant**.

A tangent is the limiting position of a secant $PQ$ as $Q$ moves along the circle to $P$. At each point of a circle there is exactly one tangent.

**Number of tangents from a point:** none from a point inside, exactly one from a point on the circle, exactly two from a point outside.`, key_terms: [{ term: 'Tangent', definition_md: 'A line that meets a circle at exactly one point.' }, { term: 'Secant', definition_md: 'A line that meets a circle at two distinct points.' }, { term: 'Point of contact', definition_md: 'The common point of a tangent and the circle.' }], formulas: [], visual: fig3Lines, visuals: [figCount], topic_ids: [topic(1)] },
    { heading: '2. Theorem: tangent ⟂ radius', body_md: r`**Theorem 1.** The tangent at any point of a circle is perpendicular to the radius through the point of contact.

**Proof.** Let $XY$ be the tangent at $P$. Take any point $Q \ne P$ on $XY$. $Q$ lies outside the circle (otherwise $XY$ would be a secant), so $OQ$ meets the circle at $R$ with $OQ > OR = OP$. Hence $OP$ is the shortest segment from $O$ to $XY$, and the shortest segment from a point to a line is perpendicular to it: $OP \perp XY$.

**Consequences.**
- The perpendicular to a tangent at its point of contact passes through the centre.
- The tangents at the ends of a diameter are parallel; the distance between two parallel tangents is the diameter.`, key_terms: [{ term: 'Normal', definition_md: 'The line through the point of contact perpendicular to the tangent; it passes through the centre.' }], formulas: [{ latex: '\\angle OPT = 90^\\circ', label: 'Radius to the point of contact' }], visual: figThm, visuals: [proofFlow, figParallel], topic_ids: [topic(2)] },
    { heading: '3. Using the right angle', body_md: r`At the point of contact $P$ of a tangent from an outside point $Q$, $\triangle OPQ$ is right-angled at $P$, with **hypotenuse $OQ$**:

$$OQ^2 = OP^2 + PQ^2.$$

*Example:* radius $8$ m, $OQ = 17$ m gives the tangent $\sqrt{289 - 64} = 15$ m.

**Angles.** If $PQ$ is a chord and $PT$ the tangent at $P$, then $\angle OPQ = 90^\circ - \angle TPQ$, and the isosceles triangle $OPQ$ gives $\angle POQ = 2\angle TPQ$.

*Example:* $\angle POQ = 110^\circ$ gives $\angle TPQ = 55^\circ$.

**Concentric circles.** A chord of the larger circle that touches the smaller one is bisected at the point of contact: half-chord $= \sqrt{R^2 - r^2}$.`, key_terms: [], formulas: [{ latex: 'PQ = \\sqrt{OQ^2 - r^2}', label: 'Length of the tangent from Q' }, { latex: '\\text{chord} = 2\\sqrt{R^2 - r^2}', label: 'Chord of the larger of two concentric circles touching the smaller' }], visual: figWell, visuals: [figChord, figPark], topic_ids: [topic(2)] },
    { heading: '4. Theorem: tangents from an external point', body_md: r`**Theorem 2.** The lengths of the tangents drawn from an external point to a circle are equal.

**Proof.** Let $PA$, $PB$ be the tangents from $P$; join $OA$, $OB$, $OP$. $\angle OAP = \angle OBP = 90^\circ$, $OA = OB$, and $OP$ is common, so $\triangle OAP \cong \triangle OBP$ (RHS) and $PA = PB$.

**Consequences** (from the same congruence):
- $OP$ bisects $\angle APB$ and $\angle AOB$;
- $\angle APB + \angle AOB = 180^\circ$ (angle sum of $OAPB$);
- $\triangle PAB$ is isosceles, $AB \perp OP$, and $\angle OAB = \dfrac12 \angle APB$;
- if $\angle APB = 90^\circ$, $OAPB$ is a square and $OP = r\sqrt2$; if $\angle APB = 60^\circ$, $OP = 2r$ and $\triangle PAB$ is equilateral.`, key_terms: [{ term: 'Length of a tangent', definition_md: 'The length of the segment from the external point to the point of contact.' }], formulas: [{ latex: 'PA = PB', label: 'Equal tangents' }, { latex: '\\angle APB + \\angle AOB = 180^\\circ', label: 'Supplementary angles' }], visual: figTwo, visuals: [figAngles], topic_ids: [topic(3)] },
    { heading: '5. Polygons drawn round a circle', body_md: r`Mark the two equal tangents from every vertex, then add.

**Quadrilateral** $ABCD$ touching the circle at $P, Q, R, S$: $AB + CD = BC + DA$, and the perimeter is $2(AB + CD)$.

**Triangle** $ABC$ with incircle touching $BC$, $CA$, $AB$ at $D$, $E$, $F$: if the tangent lengths are $x$ (from $A$), $y$ (from $B$), $z$ (from $C$), then $x + y = AB$, $y + z = BC$, $z + x = CA$, and $x + y + z = s$ (the semi-perimeter). So

$$x = s - BC, \quad y = s - CA, \quad z = s - AB.$$

*Example:* $AB = 10$, $BD = 6$, $DC = 8$ gives $AF = 4$ and $AC = 12$.

**Area and inradius:** joining the centre to the vertices splits the triangle into three triangles of height $r$, so area $= r \times s$.`, key_terms: [{ term: 'Incircle', definition_md: 'The circle that touches all three sides of a triangle.' }, { term: 'Semi-perimeter', definition_md: '$s = \\dfrac{a + b + c}{2}$' }], formulas: [{ latex: 'AB + CD = BC + DA', label: 'Quadrilateral circumscribing a circle' }, { latex: '\\text{tangent from a vertex} = s - \\text{opposite side}', label: 'Triangle circumscribing a circle' }], visual: figQuad, visuals: [figTri], topic_ids: [topic(3)] },
    { heading: '6. Special results worth remembering', body_md: r`- A **parallelogram** that circumscribes a circle is a **rhombus** ($2AB = 2BC$). So a rectangle round a circle must be a square.
- In a triangle **right-angled at $C$** with legs $a$, $b$ and hypotenuse $c$, the inradius is $r = \dfrac{a + b - c}{2}$ (the corner at $C$ forms a square of side $r$). *Example:* $8$, $15$, $17$ gives $r = 3$.
- In an **isosceles** triangle round a circle, the circle touches the base at its midpoint, and the vertex, the centre and that midpoint are collinear.
- The two tangents at the ends of a chord $PQ$ meet on the perpendicular bisector of $PQ$, which passes through the centre.`, key_terms: [], formulas: [{ latex: 'r = \\frac{a + b - c}{2}', label: 'Inradius of a right triangle' }], visual: figRhombus, topic_ids: [topic(3)] },
  ],
  exam_tips_md: r`**How marks are awarded**
- *Theorem proofs (3–5 marks):* given, to prove and a labelled figure 1; each justified step 1; conclusion 1. Name the reasons: "tangent $\perp$ radius", "RHS", "CPCT".
- *Lengths (2–3 marks):* right angle with reason 1; Pythagoras with the correct hypotenuse 1; answer with unit 1.
- *Angles (1–3 marks):* right angle at the point of contact, isosceles triangles from equal radii or equal tangents, angle sums.
- *Circumscribed figures (2–3 marks):* list the equal tangents, then add.

**Common mistakes**
1. Taking the tangent as the hypotenuse (it is always $OQ$, from the centre to the outside point).
2. Writing $\angle APB = \angle AOB$: they are supplementary.
3. Pairing adjacent sides in $AB + CD = BC + DA$.
4. Forgetting that a point inside the circle has no tangent.
5. Skipping the reason for a right angle in a proof.`,
  status: 'draft', provenance: d1.provenance,
};

const fc = (id, front_md, back_md, tag, t) => ({ id, front_md, back_md, tag, topic_id: topic(t) });
const flashcards = {
  unit: 'cbse-10-mathematics-ch10', version: 1, language: 'en',
  cards: [
    fc('f01', 'What is a **tangent** to a circle?', 'A line that meets the circle at exactly one point.', 'definition', 1),
    fc('f02', 'What is a **secant**?', 'A line that meets the circle at two distinct points.', 'definition', 1),
    fc('f03', 'The common point of a tangent and a circle is called…', 'The point of contact.', 'definition', 1),
    fc('f04', 'A line is at distance $d$ from the centre of a circle of radius $r$. When is it a tangent?', 'When $d = r$ ($d < r$: secant; $d > r$: no common point).', 'concept', 1),
    fc('f05', 'Number of tangents from a point inside / on / outside a circle?', '$0$ / $1$ / $2$', 'fact', 1),
    fc('f06', 'How many tangents does a circle have at one point on it?', 'Exactly one.', 'fact', 1),
    fc('f07', 'A tangent as a limit of secants?', 'As $Q \\to P$ along the circle, the secant $PQ$ turns into the tangent at $P$.', 'concept', 1),
    fc('f08', 'Theorem 1 (statement)?', 'The tangent at any point of a circle is perpendicular to the radius through the point of contact.', 'fact', 2),
    fc('f09', 'Key idea of the proof of Theorem 1?', 'Every other point of the tangent is outside, so $OP$ is the shortest segment from $O$ to the line, hence perpendicular.', 'concept', 2),
    fc('f10', 'In right $\\triangle OPQ$ ($PQ$ tangent at $P$), which side is the hypotenuse?', '$OQ$ — from the centre to the outside point.', 'exam-tip', 2),
    fc('f11', 'Radius $8$ m, $OQ = 17$ m. Tangent length?', '$\\sqrt{289 - 64} = 15$ m', 'example', 2),
    fc('f12', 'Tangents at the ends of a diameter are…', 'Parallel; the distance between them is the diameter.', 'fact', 2),
    fc('f13', 'The perpendicular to a tangent at its point of contact passes through…', 'The centre of the circle.', 'fact', 2),
    fc('f14', 'Tangent $PT$ and chord $PQ$: relation between $\\angle TPQ$ and $\\angle POQ$?', '$\\angle POQ = 2\\angle TPQ$', 'concept', 2),
    fc('f15', 'Chord of the larger of two concentric circles (radii $R > r$) touching the smaller?', '$2\\sqrt{R^2 - r^2}$, bisected at the point of contact.', 'formula', 2),
    fc('f16', 'Theorem 2 (statement)?', 'The tangents drawn from an external point to a circle are equal in length.', 'fact', 3),
    fc('f17', 'Proof of Theorem 2 in one line?', '$\\triangle OAP \\cong \\triangle OBP$ by RHS (right angles at $A$, $B$; $OA = OB$; $OP$ common).', 'concept', 3),
    fc('f18', 'Tangents $PA$, $PB$: relation between $\\angle APB$ and $\\angle AOB$?', 'They add up to $180^\\circ$.', 'formula', 3),
    fc('f19', 'Tangents $PA$, $PB$: what does $OP$ bisect?', 'Both $\\angle APB$ and $\\angle AOB$; also $AB \\perp OP$.', 'fact', 3),
    fc('f20', '$\\angle APB = 50^\\circ$. Find $\\angle OAB$.', '$25^\\circ$ (half of $\\angle APB$).', 'example', 3),
    fc('f21', '$\\angle APB = 90^\\circ$, radius $r$. Shape of $OAPB$ and $OP$?', 'A square; $OP = r\\sqrt2$.', 'diagram', 3),
    fc('f22', '$\\angle APB = 60^\\circ$, radius $r$. Find $OP$.', '$OP = 2r$ (since $\\sin 30^\\circ = \\dfrac12$).', 'example', 3),
    fc('f23', 'Quadrilateral $ABCD$ circumscribes a circle. Relation between sides?', '$AB + CD = BC + DA$', 'formula', 3),
    fc('f24', 'Triangle round a circle: tangent from vertex $A$?', '$s - BC$, where $s$ is the semi-perimeter.', 'formula', 3),
    fc('f25', 'A parallelogram circumscribes a circle. What kind of parallelogram is it?', 'A rhombus.', 'fact', 3),
    fc('f26', 'Can a non-square rectangle circumscribe a circle?', 'No — a circumscribed parallelogram must have all sides equal.', 'concept', 3),
    fc('f27', 'Inradius of a right triangle with legs $a$, $b$, hypotenuse $c$?', '$r = \\dfrac{a + b - c}{2}$', 'formula', 3),
    fc('f28', 'Area of a triangle in terms of its inradius $r$?', 'Area $= r \\times s$ ($s$ = semi-perimeter).', 'formula', 3),
    fc('f29', 'Common slip with $\\angle APB$ and $\\angle AOB$?', 'Writing them equal — they are supplementary.', 'exam-tip', 3),
    fc('f30', 'Common slip in $AB + CD = BC + DA$?', 'Pairing adjacent sides instead of opposite sides.', 'exam-tip', 3),
  ],
  status: 'draft', provenance: d1.provenance,
};

const release = {
  unit: 'cbse-10-mathematics-ch10', version: 1, academic_year: '2026-27', created_at: '2026-10-27T00:00:00+05:30',
  decks: [d1, d2], notes, flashcards, questions: [],
  build: { run_id: null, checks: { syllabus: 'topics t01–t03 only (tangent; tangent ⟂ radius; equal tangents from an external point, incl. circumscribed quadrilaterals and triangles); no removed topics in this chapter. Constructions (deleted chapter) are not used: figures are given, never constructed by the student.' } },
};
const tests = chapterTests('Circles', {
  A: ['m02', 'm09', 'ar5', 'tf2'],
  B: ['s203', 's202', 's302'],
  C: ['l02', 'l03'],
  D: ['c02'],
}, {
  A: ['m05', 'm06', 'm11', 'm14', 'm16', 'm17', 'm18', 'ar1', 'ar3', 'ar6'],
  B: ['s201', 's206', ['s205', 's208'], 's301', ['s303', 's304']],
  C: ['l01', ['l04', 'l06']],
  D: ['c01', 'c04'],
});
build({ dir: DIR, release, testsSpec: tests });
