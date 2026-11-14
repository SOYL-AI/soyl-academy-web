// Figures shared by the decks, notes and questions of ICSE 9 Mathematics ch10 (Pythagoras Theorem). Each is built from coordinates by
// pyth.mjs, which throws if a numeric label, tick, arrow, right-angle mark or degree label disagrees with the coordinates. Surd labels
// are generated from the exact squared length (lab), never typed.
import { fig, areaProof, pythag, iso, equi, perpQuad, rhombus, rectDiag, ladder, lab, len, E, area, must, near, dist, mid, triFromSides, scaled } from './pyth.mjs';

const lbl = (v, P, Q, unit, u) => (v === true ? lab(P, Q, unit, u) : v || undefined);

/** Right triangle ABC, right angle at B (A above B, C to the right). labels: true = computed length, string = given text. Returns the figure. */
export function rtFig(x, y, o = {}) {
  const { ab, bc, ac, unit = 'cm', u = 1, k = 0.5, alt, cap, pos = { A: 'n', B: 'sw', C: 'se' }, names = {}, extra = {}, hide = false } = o;
  const A = [0, y], B = [0, 0], C = [x, 0];
  pythag(A, B, C, u);
  return fig({
    pts: { A, B, C }, pos, names, k,
    segs: [['A', 'B', lbl(ab, A, B, unit, u)], ['B', 'C', lbl(bc, B, C, unit, u)], ['A', 'C', lbl(ac, A, C, unit, u)]],
    angles: [['B', 'A', 'C', undefined, { right: true }]], unit, ...extra,
  }, alt, cap);
}

// ---------------------------------------------------------------- squares on the three sides (legs 3 and 2, areas 9, 4 and 13)
export const SQ = (() => {
  const B = [0, 0], C = [3, 0], A = [0, 2];
  const sq = (P, Q, nx, ny) => [P, Q, [Q[0] + nx, Q[1] + ny], [P[0] + nx, P[1] + ny]];
  const onBC = sq(B, C, 0, -3), onAB = sq(A, B, -2, 0), onAC = sq(C, A, 2, 3);
  const p = pythag(A, B, C);
  must(area(...onBC) === 9 && area(...onAB) === 4 && area(...onAC) === 13 && p.ac2 === 13 && 9 + 4 === 13, 'the squares on the legs and on the hypotenuse');
  for (const s of [onBC, onAB, onAC]) must(s.every((q, i) => E(q, s[(i + 1) % 4]) === E(s[0], s[1])), 'each is a square');
  return { A, B, C, onBC, onAB, onAC };
})();
export const figSquares = () => fig({
  pts: { A: SQ.A, B: SQ.B, C: SQ.C, _a1: SQ.onBC[2], _a2: SQ.onBC[3], _b1: SQ.onAB[2], _b2: SQ.onAB[3], _c1: SQ.onAC[2], _c2: SQ.onAC[3] }, pos: { A: 'ne', B: 'ne', C: 'e' }, k: 0.5,
  segs: [['A', 'B'], ['B', 'C'], ['A', 'C'], ['B', '_a2'], ['_a2', '_a1'], ['_a1', 'C'], ['A', '_b1'], ['_b1', '_b2'], ['_b2', 'B'], ['C', '_c1'], ['_c1', '_c2'], ['_c2', 'A']],
  angles: [['B', 'A', 'C', undefined, { right: true }]],
  polys: [[['B', '_a2', '_a1', 'C'], 'shade'], [['A', '_b1', '_b2', 'B'], 'shade'], [['C', '_c1', '_c2', 'A'], 'accent']],
}, 'A right triangle with legs three and two units, with a square drawn outwards on each side. The squares on the legs have areas nine and four; the square on the longest side has area thirteen.', 'Areas of the three squares: 9 + 4 = 13.');

// ---------------------------------------------------------------- the area proof (legs a = 3 and b = 5)
export const AP = areaProof(3, 5); // c^2 = 34, big square 64
export const figProof = (stage = 1) => {
  const [Ep, Fp, Gp, Hp] = AP.P;
  const t = (n) => (stage >= 1 ? { ticks: n } : {});
  const segs = [['A', 'E', undefined, t(1)], ['E', 'B', undefined, t(2)], ['B', 'F', undefined, t(1)], ['F', 'C', undefined, t(2)], ['C', 'G', undefined, t(1)], ['G', 'D', undefined, t(2)], ['D', 'H', undefined, t(1)], ['H', 'A', undefined, t(2)],
    ['E', 'F', undefined, { ticks: 3 }], ['F', 'G', undefined, { ticks: 3 }], ['G', 'H', undefined, { ticks: 3 }], ['H', 'E', undefined, { ticks: 3 }]];
  const angles = stage >= 2 ? [['E', 'A', 'H', '$x$', { arcs: 1 }], ['E', 'F', 'B', '$y$', { arcs: 2 }], ['E', 'H', 'F', undefined, { right: true }]] : [];
  const polys = stage >= 3 ? [[['E', 'F', 'G', 'H'], 'accent'], [['A', 'E', 'H'], 'shade'], [['B', 'F', 'E'], 'shade'], [['C', 'G', 'F'], 'shade'], [['D', 'H', 'G'], 'shade']] : [];
  const alt = [
    'A big square A B C D with a point on each side: E on A B, F on B C, G on C D and H on D A. Joining E F G H cuts off four right triangles at the corners. Equal tick marks show the short sides are equal and the long sides are equal, and the four slanting sides E F, F G, G H, H E have three tick marks.',
    'The same figure with the angle at E marked. The angle x of triangle A E H and the angle y of triangle B F E sit beside the angle H E F, and the angle H E F carries a right-angle mark.',
    'The same figure shaded: four right triangles in one shade and the tilted square E F G H in another.',
  ][stage - 1];
  return fig({ pts: { A: AP.Q[0], B: AP.Q[1], C: AP.Q[2], D: AP.Q[3], E: Ep, F: Fp, G: Gp, H: Hp }, pos: { A: 'sw', B: 'se', C: 'ne', D: 'nw', E: 's', F: 'e', G: 'n', H: 'w' }, k: 0.5, segs, angles, polys }, alt,
    ['The big square has side a + b; the four triangles have legs a and b.', 'The angles at E: x + y = 90, so the angle of the inner square is 90.', 'Big square = four triangles + tilted square.'][stage - 1]);
};

// ---------------------------------------------------------------- ladder (foot 3.6 m from the wall, top 7.7 m up, length 8.5 m)
export const figLadder = (L = { d: 3.6, h: 7.7, len: 8.5 }, show = { d: true, h: false, l: false }) => {
  const g = ladder(L.d, L.h, L.len, 10);
  return fig({
    pts: { W: g.W, F: g.F, T: g.T }, pos: { W: 'sw', F: 'se', T: 'nw' }, k: 0.55, unit: 'm',
    segs: [['W', 'T', show.h ? `${L.h} m` : undefined], ['W', 'F', show.d ? `${L.d} m` : undefined], ['F', 'T', show.l ? `${L.len} m` : undefined]],
    angles: [['W', 'T', 'F', undefined, { right: true }]],
  }, `A ladder leans against a vertical wall. The foot F is ${show.d ? L.d + ' metres' : 'some distance'} from the wall base W, the top T is on the wall, and the angle at W is a right angle.`, 'Wall, ground and ladder make a right triangle.');
};

// ---------------------------------------------------------------- rectangle and square with a diagonal
export const figRect = (l, b, labels = { l: true, b: true, d: false }, unit = 'm', k = 0.3) => {
  const g = rectDiag(l, b);
  return fig({
    pts: { A: g.A, B: g.B, C: g.C, D: g.D }, pos: { A: 'sw', B: 'se', C: 'ne', D: 'nw' }, k, unit,
    segs: [['A', 'B', labels.l ? lab(g.A, g.B, unit) : undefined], ['B', 'C', labels.b ? lab(g.B, g.C, unit) : undefined], ['C', 'D'], ['D', 'A'], ['A', 'C', labels.d ? lab(g.A, g.C, unit) : undefined, { dashed: true }]],
    angles: [['B', 'A', 'C', undefined, { right: true }]],
  }, `A rectangle A B C D, ${l} by ${b}, with its diagonal A C dashed. Triangle A B C has its right angle at B.`, 'The diagonal is the hypotenuse of a right triangle.');
};

// ---------------------------------------------------------------- isosceles and equilateral triangles with the altitude
export const figIso = (base, side, o = {}) => {
  const { u = 1, unit = 'cm', k = 0.3, lb = true, ls = true, lh = false } = o;
  const g = iso(base, side, u);
  return fig({
    pts: { A: g.A, B: g.B, C: g.C, M: g.M }, pos: { A: 'n', B: 'sw', C: 'se', M: 's' }, k, unit,
    segs: [['A', 'B', ls ? `${side} ${unit}` : undefined, { ticks: 1 }], ['A', 'C', undefined, { ticks: 1 }], ['B', 'M', undefined, { ticks: 2 }], ['M', 'C', lb ? `${base / 2} ${unit}` : undefined, { ticks: 2 }], ['A', 'M', lh ? lab(g.A, g.M, unit, u) : undefined, { dashed: true }]],
    angles: [['M', 'A', 'C', undefined, { right: true }]],
  }, `An isosceles triangle A B C with A B equal to A C. The altitude A M is dashed; it meets B C at right angles at its mid-point M, so B M equals M C.`, 'The altitude of an isosceles triangle bisects the base.');
};
export const figEqui = (s, o = {}) => {
  const { unit = 'cm', k = 0.5, lh = false } = o;
  const g = equi(s);
  return fig({
    pts: { A: g.A, B: g.B, C: g.C, M: g.M }, pos: { A: 'n', B: 'sw', C: 'se', M: 's' }, k, unit,
    segs: [['A', 'B', `${s} ${unit}`, { ticks: 1 }], ['A', 'C', undefined, { ticks: 1 }], ['B', 'C', undefined, { ticks: 1 }], ['A', 'M', lh ? lab(g.A, g.M, unit) : undefined, { dashed: true }]],
    angles: [['M', 'A', 'C', undefined, { right: true }]],
  }, `An equilateral triangle A B C of side ${s} ${unit} with its altitude A M dashed, meeting B C at right angles at the mid-point M.`, 'In an equilateral triangle the altitude also bisects the base.');
};

// ---------------------------------------------------------------- rhombus and quadrilateral with perpendicular diagonals
export const figRhombus = (p, q, o = {}) => {
  const { unit = 'cm', k = 0.3, labels = { op: true, oq: true, side: false } } = o;
  const g = rhombus(p, q);
  return fig({
    pts: { A: g.A, B: g.B, C: g.C, D: g.D, O: g.O }, pos: { A: 'w', B: 's', C: 'e', D: 'n', O: 'ne' }, k, unit,
    segs: [['A', 'B', labels.side ? lab(g.A, g.B, unit) : undefined, { ticks: 1 }], ['B', 'C', undefined, { ticks: 1 }], ['C', 'D', undefined, { ticks: 1 }], ['D', 'A', undefined, { ticks: 1 }], ['A', 'C', undefined, { dashed: true }], ['B', 'D', undefined, { dashed: true }],
      ['O', 'C', labels.op ? `${p} ${unit}` : undefined], ['O', 'D', labels.oq ? `${q} ${unit}` : undefined]],
    angles: [['O', 'C', 'D', undefined, { right: true }]],
  }, `A rhombus A B C D with its diagonals dashed, meeting at O at right angles. O C is ${p} ${unit} and O D is ${q} ${unit}. All four sides have one tick mark.`, 'The diagonals of a rhombus bisect each other at right angles.');
};
export const figPerp = (p, q, r, s, o = {}) => {
  const { unit = 'cm', k = 0.4, label = false } = o;
  const g = perpQuad(p, q, r, s);
  return fig({
    pts: { A: g.A, B: g.B, C: g.C, D: g.D, O: g.O }, pos: { A: 'w', B: 's', C: 'e', D: 'n', O: 'ne' }, k, unit,
    segs: [['A', 'B'], ['B', 'C'], ['C', 'D'], ['D', 'A'], ['A', 'C', label ? `${p + q} ${unit}` : undefined, { dashed: true }], ['B', 'D', label ? `${r + s} ${unit}` : undefined, { dashed: true }]],
    angles: [['O', 'A', 'B', undefined, { right: true }]],
  }, 'A quadrilateral A B C D whose diagonals A C and B D are dashed and meet at O at right angles.', 'Diagonals at right angles: four right triangles at O.');
};

// ---------------------------------------------------------------- generic: a triangle from three sides (for the converse)
export const figSides = (x, y, z, o = {}) => {
  const { unit = 'cm', k = 0.45, marks = false, alt, cap } = o;
  const t = triFromSides(x, y, z); // AB = x, BC = y, CA = z
  return fig({
    pts: { A: t.A, B: t.B, C: t.C }, pos: { A: 'n', B: 'sw', C: 'se' }, k, unit,
    segs: [['A', 'B', `${x} ${unit}`], ['B', 'C', `${y} ${unit}`], ['C', 'A', `${z} ${unit}`]],
    angles: marks ? [['B', 'A', 'C', undefined, { right: true }]] : [],
  }, alt ?? `A triangle A B C with A B ${x}, B C ${y} and C A ${z} ${unit}.`, cap);
};

// ---------------------------------------------------------------- a route: east then north, and the direct line
export const figRoute = (e, n, o = {}) => {
  const { unit = 'km', k = 0.1, alt, labels = true, names = { A: 'A', B: 'B', C: 'C' } } = o;
  const A = [0, 0], B = [e, 0], C = [e, n];
  pythag(A, B, C);
  return fig({
    pts: { A, B, C }, pos: { A: 'sw', B: 'se', C: 'ne' }, k, unit, names,
    segs: [['A', 'B', labels ? `${e} ${unit}` : undefined], ['B', 'C', labels ? `${n} ${unit}` : undefined], ['A', 'C', undefined, { dashed: true }]],
    angles: [['B', 'A', 'C', undefined, { right: true }]],
  }, alt ?? `A route from A ${e} ${unit} east to B then ${n} ${unit} north to C, with the direct path A C dashed.`, 'East then north makes a right angle at B.');
};
void [len, near, dist, mid, scaled];
