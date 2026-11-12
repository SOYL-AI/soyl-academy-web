// Figures shared by the decks, notes and questions of ICSE 9 Mathematics ch09. Each is built from coordinates by geo.mjs,
// which throws if a label, tick, arrow or angle mark disagrees with the coordinates.
import { fig, midTheorem, midProof, converse, medial, quadMid, trapezium, intercepts, divide, mid, lerp, add, sub, dist, polar, triFromSides, near, must, meet } from './geo.mjs';

// ---------------------------------------------------------------- the main triangle
export const T1 = { A: [3.6, 6.4], B: [0, 0], C: [8, 0] };
export const M1 = midTheorem(T1.A, T1.B, T1.C); // D (1.8, 3.2), E (5.8, 3.2)
const triPts = (T, M) => ({ A: T.A, B: T.B, C: T.C, D: M.D, E: M.E });

/** Mid-point theorem figure, plain (ticks on the halves, arrows on DE and BC). */
export const figMid = () => fig({
  pts: triPts(T1, M1), pos: { D: 'w', E: 'e', A: 'n' },
  segs: [['A', 'D', undefined, { ticks: 1 }], ['D', 'B', undefined, { ticks: 1 }], ['A', 'E', undefined, { ticks: 2 }], ['E', 'C', undefined, { ticks: 2 }], ['B', 'C', undefined, { arrows: 1 }], ['D', 'E', undefined, { arrows: 1 }]],
}, 'Triangle A B C with D the mid-point of A B and E the mid-point of A C. Equal tick marks show A D equals D B and A E equals E C. The segment D E has the same parallel arrow mark as B C, so D E is parallel to B C.', 'D and E are mid-points: D E is parallel to B C and half as long.');
/** Labelled version: BC = 8 cm, DE = 4 cm. */
export const figMidN = () => fig({
  pts: triPts(T1, M1), pos: { D: 'w', E: 'e', A: 'n' },
  segs: [['A', 'D', undefined, { ticks: 1 }], ['D', 'B', undefined, { ticks: 1 }], ['A', 'E', undefined, { ticks: 2 }], ['E', 'C', undefined, { ticks: 2 }], ['B', 'C', '8 cm', { arrows: 1 }], ['D', 'E', '4 cm', { arrows: 1 }]],
}, 'Triangle A B C with B C eight centimetres. D and E are the mid-points of A B and A C and D E measures four centimetres, half of B C, and is parallel to it.', 'Drawn to scale: B C is 8 cm and D E is 4 cm.');

// ---------------------------------------------------------------- proof of the mid-point theorem
export const P1 = midProof(T1.A, T1.B, T1.C); // F (9.8, 3.2)
const proofPts = () => ({ ...triPts(T1, M1), F: P1.F });
export const figProof = (stage = 3) => fig({
  pts: proofPts(), pos: { D: 'w', E: 's', F: 'e', A: 'n' },
  segs: [['A', 'D', undefined, stage >= 2 ? { ticks: 1 } : {}], ['D', 'B', undefined, stage >= 2 ? { ticks: 1 } : {}], ['A', 'E', undefined, stage >= 2 ? { ticks: 2 } : {}], ['E', 'C', undefined, stage >= 2 ? { ticks: 2 } : {}], ['B', 'C'], ['D', 'E', undefined, { ticks: 3 }], ['E', 'F', undefined, { ticks: 3 }], ['C', 'F', undefined, stage >= 3 ? { ticks: 1 } : { dashed: true }]],
  polys: stage >= 2 ? [[['A', 'E', 'D'], 'shade'], [['C', 'E', 'F'], 'accent']] : [],
}, 'The proof figure. Triangle A B C has D and E the mid-points of A B and A C. D E is produced to F so that E F equals D E, and C F is joined. Triangles A E D and C E F are shaded and have equal tick marks on their matching sides.', 'Construction: produce D E to F so that E F = D E, then join C F.');

// ---------------------------------------------------------------- converse
export const T3 = { A: [2.4, 6], B: [0, 0], C: [9, 0] };
export const C3 = converse(T3.A, T3.B, T3.C); // D (1.2, 3), E (5.7, 3)
export const figConv = (showE = true) => fig({
  pts: { A: T3.A, B: T3.B, C: T3.C, D: C3.D, E: C3.E }, pos: { D: 'w', E: 'e', A: 'n' },
  segs: [['A', 'D', undefined, { ticks: 1 }], ['D', 'B', undefined, { ticks: 1 }], ['A', 'E', undefined, showE ? { ticks: 2 } : {}], ['E', 'C', undefined, showE ? { ticks: 2 } : {}], ['B', 'C', undefined, { arrows: 1 }], ['D', 'E', undefined, { arrows: 1 }]],
}, 'Triangle A B C with D the mid-point of A B. The line through D parallel to B C meets A C at E, and equal tick marks show that E is the mid-point of A C.', 'The line through D parallel to B C bisects A C.');

// ---------------------------------------------------------------- triangle of mid-points
export const T4 = { A: [3, 7], B: [0, 0], C: [10, 0] };
export const MD = medial(T4.A, T4.B, T4.C);
export const figMedial = () => fig({
  pts: { A: T4.A, B: T4.B, C: T4.C, D: MD.D, E: MD.E, F: MD.F }, pos: { D: 's', E: 'ne', F: 'nw', A: 'n' },
  segs: [['A', 'F', undefined, { ticks: 1 }], ['F', 'B', undefined, { ticks: 1 }], ['D', 'E', undefined, { ticks: 1 }], ['A', 'E', undefined, { ticks: 2 }], ['E', 'C', undefined, { ticks: 2 }], ['D', 'F', undefined, { ticks: 2 }], ['B', 'D', undefined, { ticks: 3 }], ['D', 'C', undefined, { ticks: 3 }], ['E', 'F', undefined, { ticks: 3 }]],
  polys: [[['D', 'E', 'F'], 'shade']],
}, 'Triangle A B C with D, E, F the mid-points of B C, C A and A B. The mid-point triangle D E F is shaded. Matching tick marks show that each side of D E F is half of a side of A B C and parallel to it.', 'Triangle D E F of mid-points: each of its sides is half a side of A B C.');

// ---------------------------------------------------------------- quadrilateral of mid-points
export const Q5 = { A: [0.5, 1.5], B: [6, 0], C: [9, 5], D: [2, 7.5] };
export const QM = quadMid(Q5.A, Q5.B, Q5.C, Q5.D);
export const figQuad = () => fig({
  pts: { ...Q5, P: QM.P, Q: QM.Q, R: QM.R, S: QM.S }, pos: { P: 'sw', Q: 'se', R: 'ne', S: 'nw', A: 'sw', B: 's', C: 'e', D: 'n' },
  segs: [['A', 'P'], ['P', 'B'], ['B', 'Q'], ['Q', 'C'], ['C', 'R'], ['R', 'D'], ['D', 'S'], ['S', 'A'], ['A', 'C', undefined, { dashed: true, arrows: 1 }], ['B', 'D', undefined, { dashed: true, arrows: 2 }], ['P', 'Q', undefined, { ticks: 1, arrows: 1 }], ['S', 'R', undefined, { ticks: 1, arrows: 1 }], ['Q', 'R', undefined, { ticks: 2, arrows: 2 }], ['P', 'S', undefined, { ticks: 2, arrows: 2 }]],
  polys: [[['P', 'Q', 'R', 'S'], 'shade']],
}, 'Quadrilateral A B C D with its diagonals A C and B D dashed. P, Q, R, S are the mid-points of A B, B C, C D, D A. The shaded quadrilateral P Q R S has P Q and S R parallel to A C and equal, and Q R and P S parallel to B D and equal.', 'P Q R S is a parallelogram; its sides are parallel to the diagonals.');

// ---------------------------------------------------------------- equal intercepts
const I = { T1a: [0, 0], T1b: [2.4, 6.6], dir: [1, 0.35], ts: [0, 1 / 3, 2 / 3, 1], T2a: [8.2, -0.6], T2b: [9.6, 6.2] };
export const IN = intercepts(I.T1a, I.T1b, I.dir, I.ts, I.T2a, I.T2b);
export const figIntercept = () => {
  const names = ['A', 'B', 'C', 'D'], names2 = ['P', 'Q', 'R', 'S'];
  const pts = {};
  names.forEach((n, i) => { pts[n] = IN.on1[i]; pts[names2[i]] = IN.on2[i]; });
  const segs = [];
  names.forEach((n, i) => segs.push([n, names2[i], undefined, { arrows: 1 }]));
  for (let i = 0; i < 3; i++) { segs.push([names[i], names[i + 1], undefined, { ticks: 1 }]); segs.push([names2[i], names2[i + 1], undefined, { ticks: 2 }]); }
  return fig({ pts, segs, pos: { A: 'nw', B: 'w', C: 'w', D: 'sw', P: 'ne', Q: 'e', R: 'e', S: 'se' } },
    'Four parallel lines, marked with the same arrow, cut two transversals. On the left transversal the intercepts A B, B C and C D are equal. On the right transversal the intercepts P Q, Q R and R S are also equal, as the tick marks show.', 'Equal intercepts on one transversal give equal intercepts on every transversal.');
};

// ---------------------------------------------------------------- dividing a segment into equal parts
export const DV = (() => {
  const A = [0, 0], B = [7.5, 0];
  return { A, B, n: 5, ...divide(A, B, 5, 52, 1.5) };
})();
export const figDivide = () => {
  const pts = { A: DV.A, B: DV.B };
  const segs = [['A', 'B']];
  DV.marks.slice(1).forEach((m, i) => { pts[`M${i + 1}`] = m; });
  DV.pts.slice(1, -1).forEach((p, i) => { pts[`X${i + 1}`] = p; });
  segs.push(['A', 'M1', undefined, { ticks: 1 }], ...[1, 2, 3, 4].map((i) => [`M${i}`, `M${i + 1}`, undefined, { ticks: 1 }]), ['M5', 'B', undefined, { arrows: 1 }]);
  [1, 2, 3, 4].forEach((i) => segs.push([`M${i}`, `X${i}`, undefined, { arrows: 1 }]));
  const names = { M1: '1', M2: '2', M3: '3', M4: '4', M5: '5', X1: 'P', X2: 'Q', X3: 'R', X4: 'S' };
  return fig({ pts, segs, names, pos: { A: 'sw', B: 'se', X1: 's', X2: 's', X3: 's', X4: 's', M1: 'nw', M2: 'nw', M3: 'nw', M4: 'nw', M5: 'n' }, k: 0.8 },
    'Segment A B divided into five equal parts. From A a ray is marked with five equal steps numbered one to five. The last mark five is joined to B, and lines parallel to it through marks one to four cut A B at P, Q, R and S.', 'Lines parallel to M5 B through the marks 1, 2, 3, 4 cut A B into five equal parts.');
};

// ---------------------------------------------------------------- trapezium
export const TZ = { A: [2, 5], B: [7, 5], C: [10, 0], D: [0, 0] };
export const TR = trapezium(TZ.A, TZ.B, TZ.C, TZ.D);
export const figTrap = (diagonals = false) => fig({
  pts: { ...TZ, M: TR.M, N: TR.N, ...(diagonals ? { P: TR.P, Q: TR.Q } : {}) }, pos: { A: 'nw', B: 'ne', C: 'se', D: 'sw', M: 'w', N: 'e', P: 'n', Q: 's' },
  segs: [['A', 'B', undefined, { arrows: 1 }], ['D', 'C', undefined, { arrows: 1 }], ['A', 'M', undefined, { ticks: 1 }], ['M', 'D', undefined, { ticks: 1 }], ['B', 'N', undefined, { ticks: 2 }], ['N', 'C', undefined, { ticks: 2 }], ['M', 'N', undefined, { arrows: 1 }], ...(diagonals ? [['A', 'C', undefined, { dashed: true }], ['B', 'D', undefined, { dashed: true }]] : [])],
}, diagonals ? 'Trapezium A B C D with A B parallel to D C. M and N are the mid-points of the legs. The diagonals A C and B D are dashed and their mid-points P and Q lie on M N.' : 'Trapezium A B C D with A B parallel to D C. M and N are the mid-points of the non-parallel sides A D and B C, and M N has the same parallel mark as the two bases.', diagonals ? 'The mid-points P and Q of the diagonals lie on M N.' : 'M N joins the mid-points of the legs and is parallel to both bases.');

// ---------------------------------------------------------------- extra helpers for example figures
export const triFig = (T, extra, o = {}, alt, cap) => fig({ pts: { ...T, ...extra }, ...o }, alt, cap);
export { fig, mid, lerp, add, sub, dist, polar, triFromSides, near, must, meet };

// ---------------------------------------------------------------- figures for the slides
/** Corresponding angles in the mid-point figure: angle ADE = angle ABC and angle AED = angle ACB. */
export const figAngles = () => fig({
  pts: triPts(T1, M1), pos: { D: 'w', E: 'e', A: 'n' },
  segs: [['A', 'D'], ['D', 'B'], ['A', 'E'], ['E', 'C'], ['B', 'C', undefined, { arrows: 1 }], ['D', 'E', undefined, { arrows: 1 }]],
  angles: [['D', 'A', 'E', undefined, { arcs: 1 }], ['B', 'A', 'C', undefined, { arcs: 1 }], ['E', 'A', 'D', undefined, { arcs: 2 }], ['C', 'A', 'B', undefined, { arcs: 2 }]],
}, 'Triangle A B C with D E joining the mid-points of A B and A C and parallel to B C. The angle A D E carries one arc and equals the angle A B C, which also carries one arc. The angle A E D carries two arcs and equals the angle A C B.', 'Corresponding angles: angle ADE = angle ABC and angle AED = angle ACB.');
/** Three parallel lines, equal intercepts AB = BC on one transversal, and the construction of the equal intercept proof. */
export const IP = (() => {
  const s = intercepts([0, 0], [2.4, 7.2], [1, 0.35], [0, 0.5, 1], [8, -0.5], [9.8, 6.6]);
  const [A, B, C] = s.on1, [P, Q, R] = s.on2; const dir = [1, 0.35]; const pr = sub(R, P);
  const S = meet(A, add(A, pr), B, add(B, dir)), T = meet(A, add(A, pr), C, add(C, dir));
  return { A, B, C, P, Q, R, S, T, dir };
})();
export const figIntProof = (stage = 2) => fig({
  pts: { A: IP.A, B: IP.B, C: IP.C, P: IP.P, Q: IP.Q, R: IP.R, S: IP.S, T: IP.T }, pos: { A: 'nw', B: 'w', C: 'sw', P: 'ne', Q: 'e', R: 'se', S: 'se', T: 'se' },
  segs: [['A', 'B', undefined, { ticks: 1 }], ['B', 'C', undefined, { ticks: 1 }], ['A', 'P', undefined, { arrows: 1 }], ['B', 'Q', undefined, { arrows: 1 }], ['C', 'R', undefined, { arrows: 1 }], ['P', 'Q'], ['Q', 'R'], ['A', 'S', undefined, { dashed: true }], ['S', 'T', undefined, { dashed: true }]],
  polys: stage >= 2 ? [[['A', 'P', 'Q', 'S'], 'shade'], [['S', 'Q', 'R', 'T'], 'accent']] : [],
}, 'Three parallel lines marked with arrows cut one transversal at A, B, C with A B equal to B C and a second transversal at P, Q, R. A dashed line through A, parallel to P R, meets the second and third lines at S and T. The parallelograms A P Q S and S Q R T are shaded.', 'Construction: through A draw a line parallel to P R.');
export const figChain = () => {
  const X = [3.2, 6.4], Y = [0, 0], Z = [8.4, 0]; const c = converse(X, Y, Z);
  const R = meet(c.E, add(c.E, sub(Y, X)), Y, Z);
  must(isMidP(R, Y, Z), 'R is the mid-point of YZ');
  return { X, Y, Z, P: c.D, Q: c.E, R, fig: fig({ pts: { X, Y, Z, P: c.D, Q: c.E, R }, pos: { X: 'n', P: 'w', Q: 'e', Y: 'sw', Z: 'se', R: 's' },
    segs: [['X', 'P', undefined, { ticks: 1, arrows: 2 }], ['P', 'Y', undefined, { ticks: 1, arrows: 2 }], ['X', 'Q', undefined, { ticks: 2 }], ['Q', 'Z', undefined, { ticks: 2 }], ['Y', 'R', undefined, { ticks: 3, arrows: 1 }], ['R', 'Z', undefined, { ticks: 3, arrows: 1 }], ['P', 'Q', undefined, { arrows: 1 }], ['Q', 'R', undefined, { arrows: 2 }]] },
  'Triangle X Y Z with P the mid-point of X Y. The line P Q is parallel to Y Z and meets X Z at Q, and the line Q R is parallel to X Y and meets Y Z at R. Tick marks show that Q is the mid-point of X Z and R is the mid-point of Y Z.', 'Two uses of the converse: Q and then R are mid-points.') };
};
const isMidP = (M, A, B) => near(M[0], (A[0] + B[0]) / 2) && near(M[1], (A[1] + B[1]) / 2);
