// Figures of CBSE 9 Mathematics ch11 Circles, shared by the deck builder and the question banks. Every point is computed from a centre,
// a radius and polar angles; every labelled angle or length is asserted from the coordinates (the lint measures them again).
import { fig, polar, onC, P, angleAt, dist, mid, foot, circumcentre, onCircle, must, close, compass, lineDist } from './h.mjs';

const O = [0, 0];
const deg = (V, A, B) => { const v = angleAt(V, A, B); must(Math.abs(v - Math.round(v)) < 1e-9, `angle at ${V} is whole`); return Math.round(v); };
export const lab = (n) => `${n}°`;
const rt = (a, b, c) => ({ at: a, from: b, to: c, right: true });

// ---- circle terms
const tr = 3;
const tA = polar(O, tr, 300), tB = polar(O, tr, 180), tC = polar(O, tr, 0), tD = polar(O, tr, 120), tE = polar(O, tr, 60);
export const fTerms = fig({
  points: { O: P(O, 's'), A: onC(O, tr, 300), B: onC(O, tr, 180), C: onC(O, tr, 0), D: onC(O, tr, 120), E: onC(O, tr, 60) },
  circles: [{ center: 'O', radius: tr }],
  segments: [{ from: 'B', to: 'C', label: 'diameter BC' }, { from: 'O', to: 'A', label: 'radius OA' }, { from: 'D', to: 'E', label: 'chord DE' }],
}, 'A circle with centre O. The segment BC passes through O and is a diameter. The segment OA joins the centre to the circle and is a radius. The segment DE joins two points of the circle and is a chord. The part of the circle from A to C is an arc, the region between the chord DE and the arc above it is a segment, and the region between OA, OC and the arc AC is a sector.', 'Centre $O$, radius $OA$, diameter $BC$, chord $DE$. The arc $AC$ and the radii $OA$ and $OC$ enclose a sector.');
must(close(dist(tB, tC), 2 * tr) && close(dist(O, tA), tr) && dist(tD, tE) < 2 * tr, 'terms figure');

// ---- circles through two points
const tpA = [0, 0], tpB = [6, 0], ks = [0, 2, -5];
const tpO = ks.map((k) => [3, k]);
must(tpO.every((o) => close(dist(o, tpA), dist(o, tpB))), 'centres on the perpendicular bisector');
export const fTwoPts = fig({
  points: { A: P(tpA, 'w'), B: P(tpB, 'e'), O1: P(tpO[0], 'n', 'O1'), O2: P(tpO[1], 'ne', 'O2'), O3: P(tpO[2], 'e', 'O3'), U: P([3, 4], false, false), V: P([3, -6.5], false, false) },
  circles: tpO.map((o, i) => ({ center: `O${i + 1}`, radius: dist(o, tpA) })),
  segments: [{ from: 'A', to: 'B' }, { from: 'U', to: 'V', dashed: true }],
}, 'Two points A and B six units apart, and three different circles that all pass through both of them. The centres O1, O2 and O3 of the circles all lie on the dashed vertical line, which is the perpendicular bisector of AB.', 'Many circles pass through two points; their centres lie on the perpendicular bisector of $AB$.');

// ---- circle through three points (A(1,2), B(8,1), C(5,10))
export const T3 = { A: [1, 2], B: [8, 1], C: [5, 10] };
export const T3O = circumcentre(T3.A, T3.B, T3.C);
export const T3R = dist(T3O, T3.A);
must(close(T3O[0], 5) && close(T3O[1], 5) && close(T3R, 5) && onCircle(T3.B, T3O, T3R) && onCircle(T3.C, T3O, T3R), 'circumcircle of the three points');
const m1 = mid(T3.A, T3.B), m2 = mid(T3.B, T3.C);
must(close((T3O[0] - m1[0]) * (T3.B[0] - T3.A[0]) + (T3O[1] - m1[1]) * (T3.B[1] - T3.A[1]), 0) && close((T3O[0] - m2[0]) * (T3.C[0] - T3.B[0]) + (T3O[1] - m2[1]) * (T3.C[1] - T3.B[1]), 0), 'bisectors perpendicular');
const ext = (a, b, k) => [a[0] + k * (a[0] - b[0]), a[1] + k * (a[1] - b[1])];
export const fCircum = fig({
  points: { A: P(T3.A, 'w'), B: P(T3.B, 'e'), C: P(T3.C, 'n'), O: P(T3O, 'e'), M: P(m1, 's', 'M'), N: P(m2, 'se', 'N') },
  circles: [{ center: 'O', radius: T3R }],
  segments: [{ from: 'A', to: 'B' }, { from: 'B', to: 'C' }, { from: 'C', to: 'A' }, { from: 'M', to: 'O', dashed: true }, { from: 'N', to: 'O', dashed: true }],
  angles: [rt('M', 'A', 'O'), rt('N', 'B', 'O')],
}, 'A triangle ABC with a circle through all three corners. M is the mid-point of AB and N is the mid-point of BC. The dashed perpendicular bisectors of AB and BC meet at the centre O of the circle, and each makes a right angle with its side.', 'The perpendicular bisectors of $AB$ and $BC$ meet at the centre $O$ of the circle through $A$, $B$, $C$.');

// ---- equal chords subtend equal angles at the centre
const eq = { r: 5, a: 20, b: 90, c: 200, d: 270 };
const eqP = Object.fromEntries(['a', 'b', 'c', 'd'].map((k) => [k, polar(O, eq.r, eq[k])]));
must(close(dist(eqP.a, eqP.b), dist(eqP.c, eqP.d)) && deg(O, eqP.a, eqP.b) === 70 && deg(O, eqP.c, eqP.d) === 70, 'equal chords, equal angles');
export const fEqual = fig({
  points: { O: P(O, 's'), A: onC(O, eq.r, eq.a), B: onC(O, eq.r, eq.b), C: onC(O, eq.r, eq.c), D: onC(O, eq.r, eq.d) },
  circles: [{ center: 'O', radius: eq.r }],
  segments: [{ from: 'O', to: 'A' }, { from: 'O', to: 'B' }, { from: 'O', to: 'C' }, { from: 'O', to: 'D' }, { from: 'A', to: 'B', ticks: 1 }, { from: 'C', to: 'D', ticks: 1 }],
  angles: [{ at: 'O', from: 'A', to: 'B', label: lab(70), arcs: 1 }, { at: 'O', from: 'C', to: 'D', label: lab(70), arcs: 1 }],
}, 'A circle with centre O and two chords AB and CD of the same length, marked with one tick each. The angle AOB at the centre is 70 degrees and the angle COD is also 70 degrees.', 'Chords $AB = CD$ subtend equal angles at the centre: $\\angle AOB = \\angle COD = 70^\\circ$.');

// ---- the perpendicular from the centre bisects a chord (3, 4, 5)
const pr = { r: 5, d: 3, h: 4 };
const pA = [-pr.h, -pr.d], pB = [pr.h, -pr.d], pM = [0, -pr.d];
must(onCircle(pA, O, pr.r) && onCircle(pB, O, pr.r) && close(lineDist(O, pA, pB), pr.d) && close(dist(pA, pM), pr.h) && close(dist(pM, pB), pr.h) && close(pr.d * pr.d + pr.h * pr.h, pr.r * pr.r), 'perpendicular figure');
export const fPerp = fig({
  points: { O: P(O, 'n'), A: P(pA, 'sw'), B: P(pB, 'se'), M: P(pM, 's') },
  circles: [{ center: 'O', radius: pr.r }],
  segments: [{ from: 'O', to: 'A', label: '5 cm' }, { from: 'O', to: 'B', label: '5 cm' }, { from: 'O', to: 'M', label: '3 cm' }, { from: 'A', to: 'M', label: '4 cm', ticks: 1 }, { from: 'M', to: 'B', label: '4 cm', ticks: 1 }],
  angles: [rt('M', 'O', 'B')],
}, 'A circle with centre O and a chord AB. The line OM is drawn from the centre at right angles to the chord and meets it at M. OA and OB are 5 centimetres, OM is 3 centimetres, and AM and MB are each 4 centimetres.', 'The perpendicular $OM$ from the centre bisects the chord: $AM = MB = 4$ cm. Here $3^2 + 4^2 = 5^2$.');

// ---- equal chords are equidistant from the centre
const qr = { r: 5, d: 3, h: 4 };
const qM = [0, -qr.d], qA = [-qr.h, -qr.d], qB = [qr.h, -qr.d];
const qN = polar(O, qr.d, 30), qdir = [-Math.sin(Math.PI / 6), Math.cos(Math.PI / 6)];
const qC = [qN[0] + qr.h * qdir[0], qN[1] + qr.h * qdir[1]], qD = [qN[0] - qr.h * qdir[0], qN[1] - qr.h * qdir[1]];
must(onCircle(qC, O, qr.r) && onCircle(qD, O, qr.r) && close(dist(qA, qB), dist(qC, qD)) && close(lineDist(O, qA, qB), lineDist(O, qC, qD)) && close(lineDist(O, qC, qD), 3), 'equal chords are equidistant');
export const fEquid = fig({
  points: { O: P(O, 'sw'), A: P(qA, 'sw'), B: P(qB, 'se'), M: P(qM, 's'), C: P(qC, 'nw'), D: P(qD, 'se', 'D'), N: P(qN, 'e') },
  circles: [{ center: 'O', radius: qr.r }],
  segments: [{ from: 'A', to: 'B', label: '8 cm', ticks: 2 }, { from: 'C', to: 'D', label: '8 cm', ticks: 2 }, { from: 'O', to: 'M', label: '3 cm' }, { from: 'O', to: 'N', label: '3 cm' }],
  angles: [rt('M', 'O', 'B'), rt('N', 'O', 'D')],
}, 'A circle of radius 5 centimetres with two chords AB and CD, each 8 centimetres long. The perpendiculars OM and ON from the centre O to the two chords are each 3 centimetres, so equal chords are equally far from the centre.', 'Equal chords are equidistant from the centre: $OM = ON = 3$ cm.');

// ---- worked example 2: chord at distance 7 in a circle of radius 25 (7, 24, 25)
const we2 = { r: 25, d: 7, h: 24 };
must(we2.d * we2.d + we2.h * we2.h === we2.r * we2.r && Math.sqrt(we2.r * we2.r - we2.d * we2.d) === we2.h, 'WE2 triple');
const w2A = [-we2.h, -we2.d], w2B = [we2.h, -we2.d], w2M = [0, -we2.d];
export const fWE2 = fig({
  points: { O: P(O, 'n'), A: P(w2A, 'sw'), B: P(w2B, 'se'), M: P(w2M, 's') },
  circles: [{ center: 'O', radius: we2.r }],
  segments: [{ from: 'O', to: 'A', label: '25 cm' }, { from: 'O', to: 'M', label: '7 cm' }, { from: 'A', to: 'M', label: '24 cm' }, { from: 'M', to: 'B', label: '24 cm' }, { from: 'O', to: 'B' }],
  angles: [rt('M', 'O', 'B')],
}, 'A circle of radius 25 centimetres with a chord AB. The perpendicular from the centre O meets AB at M and is 7 centimetres long. Right triangle OMA has hypotenuse OA of 25 centimetres, so AM is 24 centimetres and the chord AB is 48 centimetres.', 'Chord at distance $7$ cm in a circle of radius $25$ cm: $AM = \\sqrt{25^2 - 7^2} = 24$ cm.');

// ---- worked example 3: two parallel chords on opposite sides of the centre
const we3 = { r: 25, d1: 7, h1: 24, d2: 15, h2: 20 };
must(we3.d1 ** 2 + we3.h1 ** 2 === we3.r ** 2 && we3.d2 ** 2 + we3.h2 ** 2 === we3.r ** 2, 'WE3 triples');
const w3 = { P: [-we3.h1, -we3.d1], Q: [we3.h1, -we3.d1], R: [-we3.h2, we3.d2], S: [we3.h2, we3.d2] };
export const fWE3 = fig({
  points: { O: P(O, 'e', 'O'), P: P(w3.P, 'sw'), Q: P(w3.Q, 'se'), R: P(w3.R, 'nw'), S: P(w3.S, 'ne'), M: P([0, -we3.d1], 's', 'M'), N: P([0, we3.d2], 'n', 'N') },
  circles: [{ center: 'O', radius: we3.r }],
  segments: [{ from: 'P', to: 'Q', arrows: 1 }, { from: 'R', to: 'S', arrows: 1 }, { from: 'N', to: 'M', dashed: true }, { from: 'O', to: 'P' }, { from: 'O', to: 'R' }],
}, 'A circle of radius 25 centimetres with two parallel chords PQ and RS on opposite sides of the centre O. PQ is 48 centimetres long and RS is 40 centimetres long. The line NM through O is perpendicular to both; OM is 7 centimetres and ON is 15 centimetres.', 'Parallel chords $PQ = 48$ cm and $RS = 40$ cm in a circle of radius $25$ cm, on opposite sides of $O$.');
must(close(dist(w3.P, w3.Q), 48) && close(dist(w3.R, w3.S), 40) && close(lineDist(O, w3.P, w3.Q) + lineDist(O, w3.R, w3.S), 22), 'WE3 lengths');

// ---- angle at the centre and at the circumference (A 200, B 340 centre 140, P 90 gives 70)
const cr = 4;
const cA = polar(O, cr, 200), cB = polar(O, cr, 340), cP = polar(O, cr, 90);
must(deg(O, cA, cB) === 140 && deg(cP, cA, cB) === 70, 'centre and rim');
export const fCentreRim = fig({
  points: { O: P(O, 's'), A: onC(O, cr, 200), B: onC(O, cr, 340), P: onC(O, cr, 90) },
  circles: [{ center: 'O', radius: cr }],
  segments: [{ from: 'O', to: 'A' }, { from: 'O', to: 'B' }, { from: 'P', to: 'A' }, { from: 'P', to: 'B' }],
  angles: [{ at: 'O', from: 'A', to: 'B', label: lab(140), arcs: 2 }, { at: 'P', from: 'A', to: 'B', label: lab(70), arcs: 1 }],
}, 'A circle with centre O. The arc AB at the bottom is cut off by the chord AB. The angle AOB at the centre is 140 degrees and the angle APB at the point P on the major arc is 70 degrees, which is half as much.', 'Arc $AB$ makes $\\angle AOB = 140^\\circ$ at the centre and $\\angle APB = 70^\\circ$ at $P$ on the circle.');

// ---- proof, case 1: centre inside the angle (P 100, A 190, B 340, Q 280)
const p1 = { P: polar(O, cr, 100), A: polar(O, cr, 190), B: polar(O, cr, 340), Q: polar(O, cr, 280) };
must(close(dist(O, p1.P), dist(p1.P, p1.Q) / 2) && deg(O, p1.A, p1.Q) === 90 && deg(p1.P, O, p1.A) === 45 && deg(O, p1.B, p1.Q) === 60 && deg(p1.P, O, p1.B) === 30 && deg(O, p1.A, p1.B) === 150 && deg(p1.P, p1.A, p1.B) === 75, 'proof case 1');
export const fProof1 = fig({
  points: { O: P(O, 'e', 'O'), A: onC(O, cr, 190), B: onC(O, cr, 340), P: onC(O, cr, 100), Q: onC(O, cr, 280) },
  circles: [{ center: 'O', radius: cr }],
  segments: [{ from: 'P', to: 'A' }, { from: 'P', to: 'B' }, { from: 'O', to: 'A' }, { from: 'O', to: 'B' }, { from: 'P', to: 'Q', dashed: true }],
  angles: [{ at: 'P', from: 'O', to: 'A', label: lab(45), arcs: 1 }, { at: 'P', from: 'O', to: 'B', label: lab(30), arcs: 2 }, { at: 'O', from: 'A', to: 'Q', label: lab(90), arcs: 1 }, { at: 'O', from: 'Q', to: 'B', label: lab(60), arcs: 2 }],
}, 'A circle with centre O and a chord AB. P is on the major arc, and the line PO is extended to meet the circle at Q. The angle OPA is 45 degrees and the angle OPB is 30 degrees; the angle AOQ is 90 degrees and the angle QOB is 60 degrees, twice as much each time.', 'Proof figure. $\\angle AOQ = 2\\angle OPA$ and $\\angle QOB = 2\\angle OPB$, so $\\angle AOB = 2\\angle APB$.');

// ---- other cases: (left) centre on PB, (right) centre outside the angle
const cs1 = { P: polar(O, cr, 90), A: polar(O, cr, 180), B: polar(O, cr, 270) };
must(deg(O, cs1.A, cs1.B) === 90 && deg(cs1.P, cs1.A, cs1.B) === 45 && close(angleAt(cs1.P, cs1.A, O), 45), 'case 2');
const O2 = [11, 0];
const cs2 = { P: polar(O2, cr, 90), A: polar(O2, cr, 200), B: polar(O2, cr, 250), Q: polar(O2, cr, 270) };
must(deg(O2, cs2.A, cs2.Q) === 70 && deg(cs2.P, cs2.A, cs2.Q) === 35 && deg(O2, cs2.B, cs2.Q) === 20 && deg(cs2.P, cs2.B, cs2.Q) === 10 && deg(O2, cs2.A, cs2.B) === 50 && deg(cs2.P, cs2.A, cs2.B) === 25, 'case 3');
export const fCases = fig({
  points: {
    O: P(O, 'e', 'O'), A: onC(O, cr, 180), B: onC(O, cr, 270), P: onC(O, cr, 90),
    O2: P(O2, 'e', 'O'), A2: { ...onC(O2, cr, 200), label: 'A' }, B2: { ...onC(O2, cr, 250), label: 'B' }, P2: { ...onC(O2, cr, 90), label: 'P' }, Q2: { ...onC(O2, cr, 270), label: 'Q' },
  },
  circles: [{ center: 'O', radius: cr }, { center: 'O2', radius: cr }],
  segments: [{ from: 'P', to: 'B' }, { from: 'P', to: 'A' }, { from: 'O', to: 'A' }, { from: 'P2', to: 'A2' }, { from: 'P2', to: 'B2' }, { from: 'O2', to: 'A2' }, { from: 'O2', to: 'B2' }, { from: 'P2', to: 'Q2', dashed: true }],
  angles: [{ at: 'O', from: 'A', to: 'B', label: lab(90), arcs: 2 }, { at: 'P', from: 'A', to: 'B', label: lab(45), arcs: 1 }, { at: 'O2', from: 'A2', to: 'B2', label: lab(50), arcs: 2 }, { at: 'P2', from: 'A2', to: 'B2', label: lab(25), arcs: 1 }],
}, 'Two circles. On the left, the centre O lies on the side PB of the angle APB; the angle AOB is 90 degrees and the angle APB is 45 degrees. On the right, the centre O lies outside the angle APB; the angle AOB is 50 degrees and the angle APB is 25 degrees. In both, the angle at the centre is twice the angle at P.', 'Left: $O$ on $PB$, $90^\\circ = 2 \\times 45^\\circ$. Right: $O$ outside $\\angle APB$, $50^\\circ = 2 \\times 25^\\circ$.');

// ---- angles in the same segment (A 230, B 310, P 60, Q 110: 40 each)
const sg = { A: polar(O, cr, 230), B: polar(O, cr, 310), P: polar(O, cr, 60), Q: polar(O, cr, 120) };
must(deg(sg.P, sg.A, sg.B) === 40 && deg(sg.Q, sg.A, sg.B) === 40 && deg(O, sg.A, sg.B) === 80, 'same segment');
export const fSameSeg = fig({
  points: { O: P(O, 's', false), A: onC(O, cr, 230), B: onC(O, cr, 310), P: onC(O, cr, 60), Q: onC(O, cr, 120) },
  circles: [{ center: 'O', radius: cr }],
  segments: [{ from: 'A', to: 'B' }, { from: 'P', to: 'A' }, { from: 'P', to: 'B' }, { from: 'Q', to: 'A' }, { from: 'Q', to: 'B' }],
  angles: [{ at: 'P', from: 'A', to: 'B', label: lab(40), arcs: 1 }, { at: 'Q', from: 'A', to: 'B', label: lab(40), arcs: 1 }],
}, 'A circle with a chord AB along the bottom. Two points P and Q lie on the same major segment above the chord. The angle APB and the angle AQB are both 40 degrees.', 'Angles in the same segment are equal: $\\angle APB = \\angle AQB = 40^\\circ$.');

// ---- angle in a semicircle
const sm = { A: [-cr, 0], B: [cr, 0], P: polar(O, cr, 65) };
must(deg(sm.P, sm.A, sm.B) === 90 || close(angleAt(sm.P, sm.A, sm.B), 90), 'semicircle');
export const fSemi = fig({
  points: { O: P(O, 's'), A: P(sm.A, 'w'), B: P(sm.B, 'e'), P: onC(O, cr, 65) },
  circles: [{ center: 'O', radius: cr }],
  segments: [{ from: 'A', to: 'B' }, { from: 'P', to: 'A' }, { from: 'P', to: 'B' }, { from: 'O', to: 'P', dashed: true }],
  angles: [rt('P', 'A', 'B'), { at: 'O', from: 'B', to: 'A', label: lab(180) }],
}, 'A circle with a diameter AB through the centre O and a point P on the circle above it. The angle APB at P is a right angle, marked with a small square, because the angle AOB at the centre on the diameter is a straight angle of 180 degrees.', 'The angle in a semicircle is a right angle: $\\angle APB = 90^\\circ$.');

// ---- cyclic quadrilateral (arcs AB 80, BC 90, CD 70, DA 120; A at 40)
export const cq = { A: polar(O, cr, 40), B: polar(O, cr, 120), C: polar(O, cr, 210), D: polar(O, cr, 280) };
must(deg(cq.A, cq.D, cq.B) === 80 && deg(cq.B, cq.A, cq.C) === 95 && deg(cq.C, cq.B, cq.D) === 100 && deg(cq.D, cq.C, cq.A) === 85, 'cyclic quadrilateral angles');
must(deg(cq.A, cq.D, cq.B) + deg(cq.C, cq.B, cq.D) === 180 && deg(cq.B, cq.A, cq.C) + deg(cq.D, cq.C, cq.A) === 180, 'opposite angles supplementary');
export const fCyc = fig({
  points: { O: P(O, 's', false), A: onC(O, cr, 40), B: onC(O, cr, 120), C: onC(O, cr, 210), D: onC(O, cr, 280) },
  circles: [{ center: 'O', radius: cr }],
  segments: [{ from: 'A', to: 'B' }, { from: 'B', to: 'C' }, { from: 'C', to: 'D' }, { from: 'D', to: 'A' }],
  angles: [{ at: 'A', from: 'D', to: 'B', label: lab(80), arcs: 1 }, { at: 'B', from: 'A', to: 'C', label: lab(95), arcs: 2 }, { at: 'C', from: 'B', to: 'D', label: lab(100), arcs: 1 }, { at: 'D', from: 'C', to: 'A', label: lab(85), arcs: 2 }],
}, 'A circle with a quadrilateral ABCD whose four corners lie on the circle. The angles at A, B, C and D are 80, 95, 100 and 85 degrees. The opposite angles at A and C add up to 180 degrees, and so do the opposite angles at B and D.', 'A cyclic quadrilateral: $80^\\circ + 100^\\circ = 180^\\circ$ and $95^\\circ + 85^\\circ = 180^\\circ$.');
// the proof figure of the opposite angles: the same quadrilateral with the centre joined to B and D
export const fCycProof = fig({
  points: { O: P(O, 'e', 'O'), A: onC(O, cr, 40), B: onC(O, cr, 120), C: onC(O, cr, 210), D: onC(O, cr, 280) },
  circles: [{ center: 'O', radius: cr }],
  segments: [{ from: 'A', to: 'B' }, { from: 'B', to: 'C' }, { from: 'C', to: 'D' }, { from: 'D', to: 'A' }, { from: 'O', to: 'B', dashed: true }, { from: 'O', to: 'D', dashed: true }],
  angles: [{ at: 'A', from: 'D', to: 'B', label: lab(80), arcs: 1 }, { at: 'C', from: 'B', to: 'D', label: lab(100), arcs: 2 }],
}, 'The same cyclic quadrilateral ABCD with the centre O joined to B and D by dashed lines. The angle at A is 80 degrees, so the angle BOD on the side away from A is 160 degrees; the angle at C is 100 degrees, and 80 plus 100 is 180 degrees.', 'The arc $BCD$ makes $\\angle A = 80^\\circ$ and the other arc $BAD$ makes $\\angle C = 100^\\circ$; the two arcs make a full turn.');
must(deg(O, cq.B, cq.D) === 160 && 360 - 160 === 200 && 200 / 2 === 100, 'angle at centre on BD');

// ---- converse: P 15, Q 105, R 185, S 275 (angles 85, 95, 95, 85)
export const cv = { P: polar(O, cr, 15), Q: polar(O, cr, 105), R: polar(O, cr, 185), S: polar(O, cr, 275) };
must(deg(cv.P, cv.S, cv.Q) === 85 && deg(cv.Q, cv.P, cv.R) === 95 && deg(cv.R, cv.Q, cv.S) === 95 && deg(cv.S, cv.R, cv.P) === 85, 'converse angles');
export const fConv = fig({
  points: { O: P(O, 's', false), P: onC(O, cr, 15), Q: onC(O, cr, 105), R: onC(O, cr, 185), S: onC(O, cr, 275) },
  circles: [{ center: 'O', radius: cr }],
  segments: [{ from: 'P', to: 'Q' }, { from: 'Q', to: 'R' }, { from: 'R', to: 'S' }, { from: 'S', to: 'P' }],
  angles: [{ at: 'P', from: 'S', to: 'Q', label: lab(85), arcs: 1 }, { at: 'Q', from: 'P', to: 'R', label: lab(95), arcs: 2 }, { at: 'R', from: 'Q', to: 'S', label: lab(95), arcs: 2 }, { at: 'S', from: 'R', to: 'P', label: lab(85), arcs: 1 }],
}, 'A quadrilateral PQRS whose opposite angles add up to 180 degrees: 85 and 95 at P and R, and 95 and 85 at Q and S. The circle drawn through P, Q and S also passes through R.', 'Opposite angles supplementary: $85^\\circ + 95^\\circ = 180^\\circ$, so the circle through $P$, $Q$, $S$ passes through $R$.');

// ---- a general cyclic quadrilateral from its four arcs (AB, BC, CD, DA in degrees, A at polar angle start); the interior angles are
// computed from the coordinates and, if show is true, labelled on the figure.
export function cycPts(arcs, start = 40, rr = 4) {
  must(arcs.reduce((s, v) => s + v, 0) === 360, 'arcs make a full turn');
  const a = [start, start + arcs[0], start + arcs[0] + arcs[1], start + arcs[0] + arcs[1] + arcs[2]];
  const pts = a.map((t) => polar(O, rr, t));
  const [A, B, C, D] = pts;
  return { A, B, C, D, angA: angleAt(A, D, B), angB: angleAt(B, A, C), angC: angleAt(C, B, D), angD: angleAt(D, C, A), dirs: a };
}
export function cycFig(arcs, { start = 40, names = ['A', 'B', 'C', 'D'], show = [], extend = null, rr = 4, alt, caption } = {}) {
  const q = cycPts(arcs, start, rr), pts = [q.A, q.B, q.C, q.D], angs = [q.angA, q.angB, q.angC, q.angD];
  const points = { O: P(O, 's', false) };
  names.forEach((n, i) => { points[n] = onC(O, rr, q.dirs[i]); });
  const segments = names.map((n, i) => ({ from: n, to: names[(i + 1) % 4] }));
  const angles = show.map(([i, text]) => ({ at: names[i], from: names[(i + 3) % 4], to: names[(i + 1) % 4], label: text ?? lab(Math.round(angs[i])), arcs: 1 + (i % 2) }));
  if (extend) { // extend[0] = vertex index whose side to the next vertex is produced beyond the next vertex, extend[1] = label of exterior angle
    const [i, text] = extend, from = pts[i], to = pts[(i + 1) % 4], nxt = pts[(i + 2) % 4];
    const E = [to[0] + 0.45 * (to[0] - from[0]), to[1] + 0.45 * (to[1] - from[1])];
    points.E = P(E, 'e');
    segments.push({ from: names[(i + 1) % 4], to: 'E', dashed: true });
    angles.push({ at: names[(i + 1) % 4], from: 'E', to: names[(i + 2) % 4], label: text, arcs: 2 });
    void nxt;
  }
  return fig({ points, circles: [{ center: 'O', radius: rr }], segments, angles }, alt, caption);
}
export { O, cr, rt, deg, compass };
