// Data and figures for the long questions of ICSE 10 Mathematics ch15 Loci. Each set-up is computed from its givens
// and asserted (equal distances, points on circles and lines, the measured value after rounding to 0.1 cm).
import {
  must, near, dist, r1, r2, deg, mid, polar, line, through, at, distLine, proj, perpBis, bisector, bisector2, parallel, intLL, intLC, triSSS, inTri,
} from './loci.mjs';
import { Fig } from './figs.mjs';

const O = [0, 0];

// l03: rectangle ABCD (AB = 8, BC = 5): equidistant from A and B, and 5 cm from C
export const rect = (() => {
  const A = [0, 0], B = [8, 0], C = [8, 5], D = [0, 5], L = perpBis(A, B);
  const pts = intLC(L, C, 5);
  must(pts.length === 2, 'two points on the circle and the bisector');
  const P = pts.find((p) => p[1] >= 0 && p[1] <= 5), Q = pts.find((p) => p[1] > 5);
  must(near(P[0], 4) && near(P[1], 2) && near(Q[1], 8), 'points (4, 2) and (4, 8)');
  must(near(dist(P, A), dist(P, B)) && near(dist(P, C), 5), 'P is equidistant from A and B, and 5 from C');
  const PA = dist(P, A);
  must(near(PA, Math.sqrt(20)) && r1(PA) === 4.5 && near(distLine(P, through(A, B)), 2) && near(distLine(P, through(C, D)), 3), 'PA = sqrt 20; distances 2 and 3');
  return { A, B, C, D, L, P, Q, PA };
})();
export const fRect = (() => {
  const { A, B, C, D, L, P, Q } = rect;
  const f = new Fig(0.5);
  f.pt('A', A, 'A', 'sw'); f.pt('B', B, 'B', 'se'); f.pt('C', C, 'C', 'ne'); f.pt('D', D, 'D', 'nw'); f.pt('P', P, 'P', 'sw'); f.pt('Q', Q, 'Q', 'n');
  f.poly(['A', 'B', 'C', 'D']); f.circle('C', 5); f.ln('m', L, -0.8, 8.6, 'm', { dashed: true }, 'ne');
  f.seg('A', 'B', '8'); f.seg('B', 'C', '5');
  f.seg('P', 'A', undefined, { dashed: true, ticks: 1 }); f.seg('P', 'B', undefined, { dashed: true, ticks: 1 });
  return f.draw('Rectangle ABCD with AB 8 centimetres and BC 5 centimetres. A circle of radius 5 centimetres is drawn about C and the dashed perpendicular bisector m of AB is drawn. They meet at P inside the rectangle and at Q above it.', 'Rectangle $ABCD$; circle about $C$ of radius $5$; $m$ is the perpendicular bisector of $AB$. Lengths in cm.');
})();

// l04: relay tower, 1 cm = 1 km: A(0,0), B(8,0), lighthouse L(1,5), tower 5 km from L and equidistant from A and B
export const relay = (() => {
  const A = [0, 0], B = [8, 0], Lh = [1, 5], L = perpBis(A, B);
  const [T1, T2] = intLC(L, Lh, 5);
  must(near(T1[0], 4) && near(T1[1], 1) && near(T2[1], 9), 'towers at (4, 1) and (4, 9)');
  must(near(dist(T1, A), dist(T1, B)) && near(dist(T2, A), dist(T2, B)) && near(dist(T1, Lh), 5) && near(dist(T2, Lh), 5), 'both are equidistant from A and B and 5 km from L');
  const d1 = dist(T1, A), d2 = dist(T2, A);
  must(r1(d1) === 4.1 && r1(d2) === 9.8, 'distances from A: 4.1 and 9.8');
  return { A, B, Lh, L, T1, T2, d1, d2 };
})();
export const fRelay = (() => {
  const { A, B, Lh, L, T1, T2 } = relay;
  const f = new Fig(0.45);
  f.pt('A', A, 'A', 'sw'); f.pt('B', B, 'B', 'se'); f.pt('L', Lh, 'L', 'w'); f.pt('T1', T1, '$T_1$', 'se'); f.pt('T2', T2, '$T_2$', 'e');
  f.circle('L', 5); f.ln('m', L, -1, 10.2, 'm', { dashed: true }, 'ne');
  f.seg('A', 'B', '8'); f.seg('L', 'T1', '5', { dashed: true }); f.seg('L', 'T2', '5', { dashed: true });
  return f.draw('Map drawn at 1 centimetre to 1 kilometre. Masts A and B are 8 centimetres apart. The lighthouse L is marked and a circle of radius 5 centimetres is drawn about it. The dashed perpendicular bisector m of AB meets the circle at T1 below and T2 above.', 'Scale $1$ cm $= 1$ km. Circle about $L$ of radius $5$; $m$ is the perpendicular bisector of $AB$.');
})();

// l05: two roads at 60 degrees; points equidistant from the roads and 4 km from X on one road (1 cm = 1 km)
export const roads = (() => {
  const L1 = line(O, [1, 0]), L2 = line(O, [Math.cos(Math.PI / 3), Math.sin(Math.PI / 3)]);
  const b1 = bisector(O, [1, 0], polar(O, 1, 60)), b2 = bisector2(b1), X = at(L2, 6);
  must(near(deg(Math.atan2(b1.d[1], b1.d[0])), 30) && near(deg(Math.atan2(b2.d[1], b2.d[0])), 120), 'bisectors at 30 and 120 degrees');
  const on1 = intLC(b1, X, 4), on2 = intLC(b2, X, 4);
  must(on1.length === 2 && on2.length === 0 && near(distLine(X, b1), 3) && near(distLine(X, b2), 3 * Math.sqrt(3)), 'two points on b1, none on b2');
  const ts = on1.map((p) => proj(p, b1));
  must(near(ts[0] + ts[1], 2 * 6 * Math.cos(Math.PI / 6)) && on1.every((p) => near(dist(p, X), 4) && near(distLine(p, L1), distLine(p, L2))), 'points are 4 from X and equidistant from the roads');
  const [P1, P2] = on1;
  return { L1, L2, b1, b2, X, P1, P2, OP1: ts[0], OP2: ts[1], dRoad1: distLine(P1, L1), dRoad2: distLine(P2, L1), dX: distLine(X, b2) };
})();
export const fRoads = (() => {
  const { L1, L2, b1, b2, X, P1, P2 } = roads;
  const f = new Fig(0.45);
  f.pt('O', O, 'O', 'sw'); f.pt('X', X, 'X', 'nw'); f.pt('P1', P1, '$P_1$', 'se'); f.pt('P2', P2, '$P_2$', 'se');
  f.circle('X', 4); f.ln('p', L1, -2.2, 9.5, 'p', undefined, 'e'); f.ln('q', L2, -2.2, 8.2, 'q', undefined, 'ne');
  f.ln('b', b1, -2.2, 9.8, 'b', { dashed: true }, 'ne'); f.ln('c', b2, -2.2, 6.5, 'c', { dashed: true }, 'nw');
  f.seg('X', 'P1', '4', { dashed: true }); f.seg('X', 'P2', '4', { dashed: true });
  return f.draw('Two roads p and q meet at O at 60 degrees, with both angle bisectors b and c drawn dashed. The point X is on road q, 6 centimetres from O. A circle of radius 4 centimetres about X cuts bisector b at P1 and P2 and misses bisector c.', 'Roads $p$, $q$ at $60^\\circ$; bisectors $b$, $c$; circle about $X$ ($OX = 6$) of radius $4$. Scale $1$ cm $= 1$ km.');
})();

// l06: circumcircle of triangle ABC with BC = 7, CA = 6, AB = 5
export const circ = (() => {
  const T = triSSS(7, 6, 5), { A, B, C } = T;
  const L1 = perpBis(A, B), L2 = perpBis(B, C), L3 = perpBis(C, A), Oc = intLL(L1, L2);
  const R = dist(Oc, A);
  const s = 9, K = Math.sqrt(s * (s - 7) * (s - 6) * (s - 5));
  must(near(dist(Oc, B), R) && near(dist(Oc, C), R) && near(distLine(Oc, L3), 0), 'S is equidistant from A, B, C and on the third bisector');
  must(near(R, (7 * 6 * 5) / (4 * K)) && r1(R) === 3.6, 'R = abc / 4K = 3.57');
  return { T, A, B, C, L1, L2, L3, Oc, R, K };
})();
export const fCirc = (() => {
  const { A, B, C, Oc, R } = circ;
  const f = new Fig(0.55);
  const M1 = mid(A, B), M2 = mid(B, C);
  f.pt('A', A, 'A', 'n'); f.pt('B', B, 'B', 'sw'); f.pt('C', C, 'C', 'se'); f.pt('M1', M1, '$M_1$', 'nw'); f.pt('M2', M2, '$M_2$', 's'); f.pt('S', Oc, 'S', 'ne');
  f.poly(['A', 'B', 'C']); f.circle('S', R);
  f.seg('A', 'M1', undefined, { ticks: 1 }); f.seg('M1', 'B', undefined, { ticks: 1 }); f.seg('B', 'M2', undefined, { ticks: 2 }); f.seg('M2', 'C', undefined, { ticks: 2 });
  f.seg('M1', 'S', undefined, { dashed: true }); f.seg('M2', 'S', undefined, { dashed: true });
  f.seg('B', 'C', '7'); f.seg('C', 'A', '6'); f.seg('A', 'B', '5');
  f.right('M1', 'B', 'S'); f.right('M2', 'C', 'S');
  return f.draw('Triangle ABC with sides AB 5, BC 7 and CA 6 centimetres. The perpendicular bisectors of AB and BC are drawn from the mid-points M1 and M2 and meet at S inside the triangle. A circle about S passes through A, B and C.', 'The perpendicular bisectors of $AB$ and $BC$ meet at $S$, the same distance from $A$, $B$ and $C$. Lengths in cm.');
})();

// l07: parallel roads l (y = 0) and m (y = 6); A on l, B on m with AB = 10
export const par2 = (() => {
  const L = line(O, [1, 0]), U = parallel(L, 6), Mid = parallel(L, 3), A = [0, 0], B = [8, 6], pb = perpBis(A, B);
  const P = intLL(Mid, pb);
  must(near(dist(A, B), 10) && near(P[0], 4) && near(P[1], 3) && near(dist(P, A), 5) && near(dist(P, B), 5) && near(distLine(P, L), 3) && near(distLine(P, U), 3), 'P = (4, 3) is the mid-point of AB');
  must(near(P[0], mid(A, B)[0]) && near(P[1], mid(A, B)[1]), 'P is the mid-point of AB');
  return { L, U, Mid, A, B, pb, P };
})();
export const fPar2 = (() => {
  const { L, U, Mid, A, B, pb, P } = par2;
  const f = new Fig(0.55);
  f.pt('A', A, 'A', 'sw'); f.pt('B', B, 'B', 'ne'); f.pt('P', P, 'P', 'se');
  f.ln('l', L, -1, 10, 'l', undefined, 'e'); f.ln('m', U, -1, 10, 'm', undefined, 'e'); f.ln('n', Mid, -1, 10, 'n', { dashed: true }, 'e');
  f.ln('s', pb, -4, 4, 's', { dashed: true }, 'ne');
  f.seg('A', 'B', '10'); f.seg('A', 'P', '5', { ticks: 1 }); f.seg('P', 'B', '5', { ticks: 1 });
  f.right('P', 'B', f.hid('r', at(pb, 1.5)));
  return f.draw('Two parallel roads l and m, 6 centimetres apart, with a dashed line n halfway between them. A is a point on l and B a point on m, with AB equal to 10 centimetres. The dashed perpendicular bisector s of AB meets n at P, which is also the mid-point of AB.', 'Roads $l$, $m$ ($6$ cm apart); $n$ midway; $s$ the perpendicular bisector of $AB$ meets $n$ at $P$. Lengths in cm.');
})();
