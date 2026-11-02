// Figures for ICSE 10 Mathematics ch15 Loci. Every figure is drawn from computed coordinates (loci.mjs) and every
// geometric fact the picture shows is asserted here: equal distances, right angles, bisected angles, points on circles,
// tangent and secant counts, and the measured value a student would read off (rounded to 0.1 cm).
import {
  must, near, dist, angDeg, r1, r2, deg, vec, mid, unit, polar, line, through, at, distLine, proj, foot, perpBis, bisector, bisector2,
  parallel, intLL, intLC, intCC, triSAS, triSSS, inTri, drawL, equalDist,
} from './loci.mjs';

/** Small scene builder around drawL: points, segments, lines (drawn as long segments), circles, angles. */
export class Fig {
  constructor(k, o = {}) { Object.assign(this, { k, pts: {}, names: {}, pos: {}, segs: [], circles: [], angles: [], polys: [], o }); }
  pt(n, p, label, pos) { this.pts[n] = p; if (label) this.names[n] = label; if (pos) this.pos[n] = pos; return p; }
  hid(n, p) { this.pts[`_${n}`] = p; return `_${n}`; }
  seg(a, b, label, o) { this.segs.push([a, b, label, o]); }
  /** Line L drawn from parameter t0 to t1; an optional label sits at the t1 end. */
  ln(tag, L, t0, t1, label, o, pos = 'ne') {
    const a = this.hid(`${tag}a`, at(L, t0));
    const b = label ? (this.pt(`${tag}b`, at(L, t1), label, pos), `${tag}b`) : this.hid(`${tag}b`, at(L, t1));
    this.seg(a, b, undefined, o);
  }
  circle(c, r, label) { this.circles.push([c, r, label]); }
  ang(at_, from, to, label, o) { this.angles.push([at_, from, to, label, o]); }
  poly(vs, h) { this.polys.push([vs, h]); }
  /** A right angle mark at F between the directions to P and Q. */
  right(F, P, Q) { this.ang(F, P, Q, undefined, { right: true }); }
  draw(alt, caption) { return drawL({ pts: this.pts, k: this.k, segs: this.segs, circles: this.circles, angles: this.angles, polys: this.polys, pos: this.pos, names: this.names, ...this.o }, alt, caption); }
}

const O = [0, 0];
const onCircle = (P, C, r, what) => must(near(dist(P, C), r, 1e-9), `${what}: point is not on the circle`);

// ============================================================ deck 1
// Title: points at one distance from O
export const fTitle = (() => {
  const f = new Fig(0.8);
  f.pt('O', O, 'O', 'sw');
  const ps = { P: 20, Q: 110, R: 200, S: 290 };
  for (const [n, a] of Object.entries(ps)) { const p = polar(O, 2.5, a); onCircle(p, O, 2.5, n); f.pt(n, p, n, a < 90 || a > 270 ? 'e' : a < 180 ? 'n' : 'w'); f.seg('O', n, undefined, { dashed: true, ticks: 1 }); }
  f.circle('O', 2.5);
  return f.draw('A circle with centre O and four points P, Q, R and S on it. The dashed segments from O to each point carry one tick, showing that all four points are the same distance from O. The circle is the locus of such points.', 'Points at the same distance from $O$ lie on a circle: the locus.');
})();

// Concept: inside, on and outside a circle of radius 3
export const dKinds = { inside: 2, on: 3, outside: 4.2 };
export const fKinds = (() => {
  const f = new Fig(0.55);
  const X = polar(O, 2, 40), P = polar(O, 3, 300), Y = polar(O, 4.2, 200);
  must(dist(O, X) < 3 && near(dist(O, P), 3) && dist(O, Y) > 3, 'inside, on, outside');
  f.pt('O', O, 'O', 'sw'); f.pt('X', X, 'X', 'ne'); f.pt('P', P, 'P', 'se'); f.pt('Y', Y, 'Y', 'sw');
  f.seg('O', 'X', '2', { dashed: true }); f.seg('O', 'P', '3', { dashed: true }); f.seg('O', 'Y', '4.2', { dashed: true });
  f.circle('O', 3);
  return f.draw('A circle of radius 3 centimetres with centre O. Point X is inside, 2 centimetres from O; point P is on the circle, 3 centimetres from O; point Y is outside, 4.2 centimetres from O.', 'Distance from $O$: $X$ is inside ($2$), $P$ is on the circle ($3$), $Y$ is outside ($4.2$). Lengths in cm.');
})();

// Fixed distance from a line: two parallels at 2 cm
export const fFixedLine = (() => {
  const f = new Fig(0.6);
  const L = line(O, [1, 0]), U = parallel(L, 2), D = parallel(L, -2);
  f.ln('l', L, -0.5, 9, 'l', undefined, 'e'); f.ln('m', U, -0.5, 9, 'm', undefined, 'e'); f.ln('n', D, -0.5, 9, 'n', undefined, 'e');
  const Q1 = at(U, 2.5), Q2 = at(D, 6);
  must(near(distLine(Q1, L), 2) && near(distLine(Q2, L), 2) && near(distLine(at(U, 7.7), L), 2), 'points on m and n are 2 cm from l');
  const F1 = foot(Q1, L), F2 = foot(Q2, L);
  f.pt('Q', Q1, 'Q', 'n'); f.pt('R', Q2, 'R', 's'); f.pt('F1', F1, undefined); f.pt('F2', F2, undefined);
  f.seg('Q', 'F1', '2', { dashed: true }); f.seg('R', 'F2', '2', { dashed: true });
  f.right('F1', 'Q', f.hid('r1', at(L, 3.5))); f.right('F2', 'R', f.hid('r2', at(L, 7)));
  return f.draw('A horizontal line l with two parallel lines m and n, one 2 centimetres above and one 2 centimetres below. Point Q on m and point R on n are each joined to l by a perpendicular of length 2 centimetres.', 'Points $2$ cm from $l$ lie on two parallels, one on each side. Lengths in cm.');
})();

// Coin rolling along a ruler edge: the centre keeps 1.5 cm from the edge
export const fCoin = (() => {
  const f = new Fig(0.65);
  const L = line(O, [1, 0]), Pth = parallel(L, 1.5);
  f.ln('l', L, -0.5, 10.5, 'edge', undefined, 'ne'); f.ln('m', Pth, -0.5, 10.5, 'path', { dashed: true }, 'ne');
  const C1 = [3, 1.5], C2 = [7.5, 1.5], T1 = [3, 0];
  must(near(distLine(C1, L), 1.5) && near(distLine(C2, L), 1.5) && near(distLine(C1, Pth), 0), 'coin centres on the path, 1.5 cm from the edge');
  f.pt('C1', C1, 'C', 'n'); f.pt('C2', C2, undefined); f.pt('T', T1, 'T', 's');
  f.circle('C1', 1.5); f.circle('C2', 1.5);
  f.seg('C1', 'T', '1.5', { dashed: true }); f.right('T', 'C1', f.hid('r', [4, 0]));
  return f.draw('A coin of radius 1.5 centimetres rolls along a straight ruler edge. Two positions of the coin are drawn, both touching the edge. The centre C of the coin stays on a dashed line parallel to the edge and 1.5 centimetres above it.', 'The centre of the coin keeps $1.5$ cm from the edge: it moves on a parallel line. Lengths in cm.');
})();

// Perpendicular bisector of AB = 6
export const fPB = (() => {
  const f = new Fig(0.7);
  const A = [0, 0], B = [6, 0], M = mid(A, B), L = perpBis(A, B);
  const P1 = at(L, 2), P2 = at(L, -3);
  f.pt('A', A, 'A', 'sw'); f.pt('B', B, 'B', 'se'); f.pt('M', M, 'M', 'se'); f.pt('P', P1, 'P', 'ne'); f.pt('Q', P2, 'Q', 'se');
  equalDist([[P1, A], [P1, B]], 'P'); equalDist([[P2, A], [P2, B]], 'Q');
  f.ln('m', L, -3.9, 4.2, 'm', undefined, 'ne');
  f.seg('A', 'B', '6'); f.seg('P', 'A', undefined, { dashed: true, ticks: 1 }); f.seg('P', 'B', undefined, { dashed: true, ticks: 1 });
  f.seg('Q', 'A', undefined, { dashed: true, ticks: 2 }); f.seg('Q', 'B', undefined, { dashed: true, ticks: 2 });
  f.right('M', 'B', 'P');
  return f.draw('A horizontal segment AB of length 6 centimetres with its perpendicular bisector m drawn through the mid-point M. Point P on m above AB and point Q on m below AB are each joined to A and B by dashed segments; the segments to A and B from the same point carry the same number of ticks, so PA equals PB and QA equals QB.', 'Every point of the perpendicular bisector $m$ is equidistant from $A$ and $B$: $PA = PB$ and $QA = QB$. Length in cm.');
})();

// Constructing the perpendicular bisector of AB = 5 with arcs of radius 3.5
export const rPB = (() => {
  const A = [0, 0], B = [5, 0], r = 3.5, M = mid(A, B), [X, Y] = intCC(A, r, B, r);
  must(X[1] > 0 && Y[1] < 0 && near(dist(X, A), r) && near(dist(X, B), r) && near(dist(Y, A), r) && near(dist(Y, B), r), 'arcs meet at X and Y');
  must(near(X[0], 2.5) && near(X[1], Math.sqrt(6)), 'X = (2.5, sqrt 6)');
  must(near(angDeg(M, B, X), 90), 'XY is perpendicular to AB at M');
  return { A, B, r, M, X, Y };
})();
export const fPBBuild = (() => {
  const { A, B, r, M, X, Y } = rPB;
  const f = new Fig(0.5);
  f.pt('A', A, 'A', 'sw'); f.pt('B', B, 'B', 'se'); f.pt('M', M, 'M', 'sw'); f.pt('X', X, 'X', 'n'); f.pt('Y', Y, 'Y', 's');
  f.circle('A', r); f.circle('B', r);
  f.seg('A', 'B', '5'); f.seg('X', 'Y');
  f.right('M', 'B', 'X');
  return f.draw('Segment AB of length 5 centimetres. A circle of radius 3.5 centimetres is drawn about A and another about B; they meet at X above AB and Y below AB. The line XY crosses AB at its mid-point M at a right angle.', 'Arcs of equal radius (more than half of $AB$) from $A$ and $B$ meet at $X$ and $Y$; $XY$ is the perpendicular bisector. Lengths in cm.');
})();

// WE: A, B 6 apart; P on the bisector with PA = 5, so PM = 4
export const wePB = (() => {
  const A = [0, 0], B = [6, 0], L = perpBis(A, B), M = mid(A, B);
  const P = at(L, 4), Q = at(L, -4);
  must(near(dist(P, A), 5) && near(dist(P, B), 5) && near(dist(Q, A), 5) && near(dist(Q, B), 5) && near(dist(P, M), 4), 'PA = PB = 5, PM = 4');
  return { A, B, M, P, Q, L };
})();
export const fPBWE = (() => {
  const { A, B, M, P, Q, L } = wePB;
  const f = new Fig(0.55);
  f.pt('A', A, 'A', 'sw'); f.pt('B', B, 'B', 'se'); f.pt('M', M, 'M', 'se'); f.pt('P', P, 'P', 'ne'); f.pt('Q', Q, 'Q', 'se');
  f.ln('m', L, -4.7, 4.7, 'm', undefined, 'ne');
  f.seg('A', 'B', '6'); f.seg('P', 'A', '5', { dashed: true }); f.seg('P', 'B', '5', { dashed: true }); f.seg('P', 'M', '4');
  f.seg('Q', 'A', undefined, { dashed: true }); f.seg('Q', 'B', undefined, { dashed: true });
  f.right('M', 'B', 'P');
  return f.draw('Worked example: A and B are 6 centimetres apart. P and Q lie on the perpendicular bisector of AB, each 5 centimetres from A and from B. The distance PM from P to the mid-point M is 4 centimetres.', 'Given $AB = 6$ and $PA = PB = 5$ (cm). The right triangle $AMP$ has $AM = 3$, $AP = 5$, so $PM = 4$.');
})();

// Equidistant from two parallel lines 4 apart
export const fMid = (() => {
  const f = new Fig(0.6);
  const L = line(O, [1, 0]), U = parallel(L, 4), Mid = parallel(L, 2);
  f.ln('l', L, -0.5, 9, 'l', undefined, 'e'); f.ln('m', U, -0.5, 9, 'm', undefined, 'e'); f.ln('n', Mid, -0.5, 9, 'n', { dashed: true }, 'e');
  const X = at(Mid, 2.5), F = foot(X, L), G = foot(X, U);
  must(near(distLine(X, L), 2) && near(distLine(X, U), 2) && near(distLine(at(Mid, 7), L), distLine(at(Mid, 7), U)), 'midline equidistant');
  f.pt('X', X, 'X', 'se'); f.pt('F', F); f.pt('G', G);
  f.seg('X', 'F', '2', { dashed: true }); f.seg('X', 'G', '2', { dashed: true });
  f.right('F', 'X', f.hid('r1', at(L, 3.5))); f.right('G', 'X', f.hid('r2', at(U, 3.5)));
  const H = at(L, 7), J = at(U, 7); f.pt('H', H); f.pt('J', J); f.seg('H', 'J', '4', { dashed: true });
  return f.draw('Two parallel lines l and m, 4 centimetres apart, with a dashed line n halfway between them. Point X on n is joined by perpendiculars of length 2 centimetres to l and to m.', 'Points equidistant from the parallels $l$ and $m$ lie on the line $n$ halfway between them. Lengths in cm.');
})();

// ============================================================ deck 2
// Equidistant from two intersecting lines (50 degrees): one bisector with perpendicular distances
const A50 = polar(O, 1, 50);
export const L50a = line(O, [1, 0]), L50b = line(O, [Math.cos(50 * Math.PI / 180), Math.sin(50 * Math.PI / 180)]);
export const fBis1 = (() => {
  const f = new Fig(0.55);
  const b = bisector(O, [1, 0], A50);
  must(near(deg(Math.atan2(b.d[1], b.d[0])), 25), 'bisector at 25 degrees');
  const X = at(b, 4.5), F1 = foot(X, L50a), F2 = foot(X, L50b);
  const d1 = equalDist([[X, F1], [X, F2]], 'X is equidistant from the two lines');
  must(near(d1, 4.5 * Math.sin(25 * Math.PI / 180)) && near(distLine(X, L50a), distLine(X, L50b)), 'distance = 4.5 sin 25');
  f.pt('O', O, 'O', 'sw'); f.pt('X', X, 'X', 'ne'); f.pt('F1', F1, undefined); f.pt('F2', F2, undefined);
  f.ln('p', L50a, -1.5, 7, 'p', undefined, 'e'); f.ln('q', L50b, -1.5, 6.3, 'q', undefined, 'ne'); f.ln('b', b, -1, 6.3, 'b', { dashed: true }, 'ne');
  f.seg('X', 'F1', undefined, { dashed: true, ticks: 1 }); f.seg('X', 'F2', undefined, { dashed: true, ticks: 1 });
  f.right('F1', 'X', f.hid('r1', at(L50a, proj(X, L50a) + 1))); f.right('F2', 'X', f.hid('r2', at(L50b, proj(X, L50b) + 1)));
  return f.draw('Two lines p and q meet at O at an angle of 50 degrees. The dashed line b bisects that angle. Point X on b is joined by perpendiculars to p and to q; the two perpendiculars carry one tick each, so they are equal.', 'Every point of the bisector $b$ is the same distance from the two lines $p$ and $q$.');
})();

// Constructing the bisector of a 70 degree angle
export const fBisBuild = (() => {
  const f = new Fig(0.5);
  const A = [6, 0], B = polar(O, 6, 70), P = [3, 0], Q = polar(O, 3, 70);
  const cand = intCC(P, 2.2, Q, 2.2), R = cand.sort((u, v) => dist(v, O) - dist(u, O))[0];
  must(near(dist(R, P), 2.2) && near(dist(R, Q), 2.2) && near(angDeg(O, A, R), 35) && near(angDeg(O, R, B), 35), 'R is on the bisector');
  f.pt('O', O, 'O', 'sw'); f.pt('A', A, 'A', 'se'); f.pt('B', B, 'B', 'ne'); f.pt('P', P, 'P', 'sw'); f.pt('Q', Q, 'Q', 'nw'); f.pt('R', R, 'R', 'ne');
  const R2 = polar(O, 5.8, 35); f.hid('x', R2);
  f.seg('O', 'A'); f.seg('O', 'B'); f.seg('O', '_x', undefined, { dashed: true });
  f.circle('O', 3); f.circle('P', 2.2); f.circle('Q', 2.2);
  f.ang('O', 'A', 'R', '$35^\\circ$'); f.ang('O', 'R', 'B', '$35^\\circ$');
  return f.draw('An angle AOB of 70 degrees. A circle about O cuts the arms at P and Q. Equal circles about P and Q meet at R. The dashed line OR bisects the angle, giving two angles of 35 degrees.', 'Steps: arc from $O$ cuts the arms at $P$, $Q$; equal arcs from $P$ and $Q$ meet at $R$; $OR$ bisects $\\angle AOB$.');
})();

// WE1 deck 2: point on the bisector of a 70 degree angle, 4 cm from the vertex; distance to the arms
export const wBis = (() => {
  const A = [6.5, 0], C = polar(O, 6.5, 70), L1 = line(O, [1, 0]), L2 = through(O, C), b = bisector(O, A, C);
  const P = at(b, 4), F1 = foot(P, L1), F2 = foot(P, L2);
  const d = equalDist([[P, F1], [P, F2]], 'P is equidistant');
  must(near(d, 4 * Math.sin(35 * Math.PI / 180)) && r1(d) === 2.3, 'distance 2.3 cm');
  return { A, C, L1, L2, b, P, F1, F2, d };
})();
export const fBisWE = (() => {
  const { A, C, L1, L2, b, P, F1, F2 } = wBis;
  const f = new Fig(0.6);
  f.pt('B', O, 'B', 'sw'); f.pt('A', A, 'A', 'se'); f.pt('C', C, 'C', 'ne'); f.pt('P', P, 'P', 'ne'); f.pt('F1', F1, undefined); f.pt('F2', F2, undefined);
  f.seg('B', 'A'); f.seg('B', 'C'); f.seg('B', 'P', '4', { dashed: true }); f.seg('P', 'F1', undefined, { dashed: true, ticks: 1 }); f.seg('P', 'F2', undefined, { dashed: true, ticks: 1 });
  f.ang('B', 'A', 'P', '$35^\\circ$'); f.ang('B', 'P', 'C', '$35^\\circ$');
  f.right('F1', 'P', f.hid('r1', at(L1, proj(P, L1) + 1))); f.right('F2', 'P', f.hid('r2', at(L2, proj(P, L2) + 1)));
  f.hid('bb', at(b, 5.2)); f.seg('P', '_bb', undefined, { dashed: true });
  return f.draw('An angle ABC of 70 degrees with its bisector drawn as a dashed line. Point P on the bisector is 4 centimetres from B, and the two perpendiculars from P to the arms BA and BC carry one tick each, so they are equal.', 'Each half of the $70^\\circ$ angle is $35^\\circ$. $BP = 4$ cm; the perpendiculars from $P$ to the arms are equal. Length in cm.');
})();

// Both bisectors of two lines at 50 degrees are perpendicular
export const fBisBoth = (() => {
  const f = new Fig(0.5);
  const b1 = bisector(O, [1, 0], A50), b2 = bisector2(b1);
  const R1 = at(b1, 4), R2 = at(b2, 3.4);
  must(near(angDeg(O, R1, R2), 90) && near(deg(Math.atan2(b2.d[1], b2.d[0])), 115), 'the bisectors meet at 90 degrees');
  const X = at(b2, 3.4);
  must(near(distLine(X, L50a), distLine(X, L50b)), 'points of the second bisector are equidistant too');
  f.pt('O', O, 'O', 'sw'); f.pt('R1', R1, undefined); f.pt('R2', R2, undefined);
  f.ln('p', L50a, -4, 6, 'p', undefined, 'e'); f.ln('q', L50b, -4, 5, 'q', undefined, 'ne');
  f.ln('b', b1, -3.5, 5.5, 'b', { dashed: true }, 'ne'); f.ln('c', b2, -3.5, 4.5, 'c', { dashed: true }, 'nw');
  f.right('O', 'R1', 'R2');
  return f.draw('Two lines p and q crossing at O at 50 degrees, with both angle bisectors drawn dashed. The bisector b of the 50 degree angle and the bisector c of the 130 degree angle meet at O at a right angle, which is marked.', 'The locus is a pair of lines, $b$ and $c$, at right angles to each other.');
})();

// WE2 deck 2: parallel lines 3.6 apart
export const fMidWE = (() => {
  const f = new Fig(0.7);
  const L = line(O, [1, 0]), U = parallel(L, 3.6), Mid = parallel(L, 1.8);
  f.ln('l', L, -0.5, 9, 'l', undefined, 'e'); f.ln('m', U, -0.5, 9, 'm', undefined, 'e'); f.ln('n', Mid, -0.5, 9, 'n', { dashed: true }, 'e');
  const X = at(Mid, 2.5), F = foot(X, L), G = foot(X, U);
  must(near(distLine(X, L), 1.8) && near(distLine(X, U), 1.8), 'midline at 1.8');
  f.pt('X', X, 'X', 'se'); f.pt('F', F); f.pt('G', G); f.pt('H', at(L, 7)); f.pt('J', at(U, 7));
  f.seg('X', 'F', '1.8', { dashed: true }); f.seg('X', 'G', '1.8', { dashed: true }); f.seg('H', 'J', '3.6', { dashed: true });
  f.right('F', 'X', f.hid('r1', at(L, 3.5))); f.right('G', 'X', f.hid('r2', at(U, 3.5)));
  return f.draw('Worked example: two parallel lines l and m are 3.6 centimetres apart. The dashed line n halfway between them is 1.8 centimetres from each.', 'Lines $l$ and $m$ are $3.6$ cm apart: the locus $n$ is $1.8$ cm from each. Lengths in cm.');
})();

// Intersection of a circle and lines: 2, 1 and 0 common points
export const fIntersect = (() => {
  const f = new Fig(0.5);
  f.pt('A', O, 'A', 'ne'); f.circle('A', 3);
  const L1 = line([0, 1], [1, 0]), L2 = line([0, -3], [1, 0]), L3 = line([0, 4], [1, 0]);
  const c = [nc(L1), nc(L2), nc(L3)];
  function nc(L) { return intLC(L, O, 3).length; }
  must(c.join() === '2,1,0', 'secant, tangent, line outside: 2, 1, 0 points');
  const [X, Y] = intLC(L1, O, 3), [T] = intLC(L2, O, 3);
  onCircle(X, O, 3, 'X'); onCircle(Y, O, 3, 'Y'); onCircle(T, O, 3, 'T');
  f.ln('p', L1, -4.2, 4.2, 'p', undefined, 'e'); f.ln('q', L2, -4.2, 4.2, 'q', undefined, 'e'); f.ln('s', L3, -4.2, 4.2, 's', undefined, 'e');
  f.pt('X', X, 'X', 'nw'); f.pt('Y', Y, 'Y', 'ne'); f.pt('T', T, 'T', 'sw');
  return f.draw('A circle with centre A and radius 3 centimetres and three horizontal lines. Line p cuts the circle at two points X and Y, line q just touches it at T, and line s misses it altogether.', 'A line and a circle can have $2$, $1$ or $0$ points in common: so two loci can give $2$, $1$ or $0$ solutions.');
})();

// WE3 deck 2: points 3 cm from A and equidistant from A and B (AB = 4)
export const wePt = (() => {
  const A = [0, 0], B = [4, 0], L = perpBis(A, B), M = mid(A, B);
  const [Q, P] = intLC(L, A, 3);
  must(P[1] > 0 && near(dist(P, A), 3) && near(dist(P, B), 3) && near(dist(Q, A), 3) && near(dist(Q, B), 3), 'P and Q are 3 cm from A and from B');
  const pq = dist(P, Q);
  must(near(pq, 2 * Math.sqrt(5)) && r1(pq) === 4.5 && r2(P[1]) === 2.24, 'PQ = 2 sqrt 5 = 4.47');
  return { A, B, L, M, P, Q, pq };
})();
export const fPtWE = (() => {
  const { A, B, L, M, P, Q } = wePt;
  const f = new Fig(0.7);
  f.pt('A', A, 'A', 'sw'); f.pt('B', B, 'B', 'se'); f.pt('M', M, 'M', 'sw'); f.pt('P', P, 'P', 'ne'); f.pt('Q', Q, 'Q', 'se');
  f.circle('A', 3); f.ln('m', L, -3.4, 3.4, 'm', undefined, 'ne');
  f.seg('A', 'B', '4'); f.seg('A', 'P', '3', { dashed: true }); f.seg('B', 'P', '3', { dashed: true }); f.seg('A', 'Q', '3', { dashed: true }); f.seg('B', 'Q', '3', { dashed: true });
  f.right('M', 'B', 'P');
  return f.draw('A and B are 4 centimetres apart. A circle of radius 3 centimetres is drawn about A, and the perpendicular bisector m of AB is drawn. They meet at P above AB and Q below it, and each of these is 3 centimetres from A and from B.', 'Locus 1: circle, radius $3$ about $A$. Locus 2: perpendicular bisector $m$ of $AB$. They meet at $P$ and $Q$. Lengths in cm.');
})();

/** Triangle ABC from BC, AB and angle B; locus 1 is the bisector of angle B, locus 2 the perpendicular bisector of BC. */
export function bisPerp({ bc, ab, angB }, alt, caption, k = 0.6) {
  const T = triSAS(bc, ab, angB), M = mid(T.B, T.C);
  const bis = bisector(T.B, T.C, T.A), pb = perpBis(T.B, T.C), P = intLL(bis, pb);
  must(near(P[0], bc / 2), 'P is on the perpendicular bisector of BC');
  must(near(angDeg(T.B, T.C, P), angB / 2) && near(angDeg(T.B, P, T.A), angB / 2), 'BP bisects angle B');
  must(near(dist(P, T.B), dist(P, T.C)), 'PB = PC');
  must(near(distLine(P, through(T.B, T.A)), distLine(P, through(T.B, T.C))), 'P is equidistant from BA and BC');
  const BP = dist(P, T.B), half = angB / 2 * Math.PI / 180;
  must(near(BP, bc / 2 / Math.cos(half)), 'BP = (BC / 2) / cos(B / 2)');
  const inside = inTri(P, T.A, T.B, T.C);
  const f = new Fig(k);
  f.pt('B', T.B, 'B', 'sw'); f.pt('C', T.C, 'C', 'se'); f.pt('A', T.A, 'A', 'n'); f.pt('M', M, 'M', 'sw'); f.pt('P', P, 'P', 'ne');
  f.poly(['A', 'B', 'C']);
  f.ln('m', pb, -0.7, dist(P, M) + 0.9, undefined, { dashed: true });
  f.hid('bx', at(bis, BP + 1)); f.seg('B', '_bx', undefined, { dashed: true });
  f.seg('B', 'M', undefined, { ticks: 1 }); f.seg('M', 'C', undefined, { ticks: 1 });
  f.seg('A', 'B', String(ab)); f.seg('B', 'C', String(bc));
  f.right('M', 'C', 'P');
  if (Number.isInteger(angB / 2) || Math.abs(angB / 2 - Math.round(angB / 2)) < 1e-9) { f.ang('B', 'C', 'P', `$${angB / 2}^\\circ$`); f.ang('B', 'P', 'A', `$${angB / 2}^\\circ$`); }
  return { T, M, P, BP, inside, bis, pb, fig: f.draw(alt, caption) };
}

/** Triangle ABC from three sides; P lies on the bisector of angle A and on the parallel to BC at height h. */
export function bisParallel({ a, b, c, h }, alt, caption, k = 0.6) {
  const T = triSSS(a, b, c), bis = bisector(T.A, T.B, T.C), BC = through(T.B, T.C), par = parallel(line(T.B, [1, 0]), h);
  const P = intLL(bis, par), D = intLL(bis, BC);
  must(near(P[1], h) && P[1] < T.A[1] && P[1] > 0, 'P is at height h inside the triangle');
  must(near(angDeg(T.A, T.B, T.C) / 2, angDeg(T.A, T.B, P)) && near(angDeg(T.A, T.B, P), angDeg(T.A, P, T.C)), 'AP bisects angle A');
  const dAB = distLine(P, through(T.A, T.B)), dAC = distLine(P, through(T.A, T.C));
  must(near(dAB, dAC) && inTri(P, T.A, T.B, T.C), 'P equidistant from AB and AC, inside the triangle');
  const AP = dist(T.A, P);
  const U = intLL(par, through(T.A, T.B)), V = intLL(par, through(T.A, T.C)), E = [P[0], 0];
  const f = new Fig(k);
  f.pt('B', T.B, 'B', 'sw'); f.pt('C', T.C, 'C', 'se'); f.pt('A', T.A, 'A', 'n'); f.pt('P', P, 'P', 'e'); f.pt('D', D, 'D', 's'); f.pt('U', U, 'U', 'w'); f.pt('V', V, 'V', 'e'); f.pt('E', E, 'E', 's');
  f.poly(['A', 'B', 'C']);
  f.seg('A', 'D', undefined, { dashed: true }); f.seg('U', 'V'); f.seg('P', 'E', String(h), { dashed: true });
  f.right('E', 'P', 'C');
  f.seg('B', 'C', String(a)); f.seg('A', 'B', String(c)); f.seg('A', 'C', String(b));
  return { T, P, AP, dAB, dAC, D, fig: f.draw(alt, caption) };
}

// ============================================================ the deck-2 region example (nearer B than C, within 3.5 of A)
export const reg = (() => {
  const B = [0, 0], C = [8, 0], A = [2, 5.5], r = 3.5, L = perpBis(B, C);
  const tests = { T1: [2.5, 3.5], T2: [5, 4], T3: [1, 1], T4: [3, 3] };
  const rows = Object.entries(tests).map(([n, p]) => {
    const nearer = dist(p, B) < dist(p, C), within = dist(p, A) < r, inside = inTri(p, A, B, C);
    return { n, p, nearer, within, inside, ok: nearer && within && inside };
  });
  return { A, B, C, r, L, tests, rows };
})();
export const fRegion = (() => {
  const { A, B, C, r, L, tests } = reg;
  const f = new Fig(0.55);
  f.pt('A', A, 'A', 'n'); f.pt('B', B, 'B', 'sw'); f.pt('C', C, 'C', 'se');
  f.poly(['A', 'B', 'C']); f.circle('A', r);
  f.ln('m', L, -0.5, 6.1, 'm', { dashed: true }, 'ne');
  for (const [n, p] of Object.entries(tests)) f.pt(n, p, n.replace('T', '$T_') + '$', 'e');
  return f.draw('Triangle ABC with a circle of radius 3.5 centimetres about A and the dashed perpendicular bisector m of BC. Four test points T1 to T4 are marked. The region wanted is inside the triangle, inside the circle and on the same side of m as B.', 'Region: inside $\\triangle ABC$, within $3.5$ cm of $A$, and nearer to $B$ than to $C$ (left of $m$).');
})();

