// Figures and number-words shared by the decks and notes of ICSE 9 Mathematics ch11 (Rectilinear Figures: Parallelograms).
// Every figure is built from coordinates by geo.mjs, which throws if a length label, tick (equal length), arrow (parallel), right-angle
// mark or degree label disagrees with the coordinates; the proofs shown on the slides are re-asserted here by oppAnglesProof,
// onePairProof, diagProof, rhombusProof, rectProof and square.
import { r } from './lib.mjs';
import * as G from './geo.mjs';

const { fig, must, near, dist, mid } = G;

/** Number words for narration (integers below 1000 and decimals): "sixty two", "four point five". */
const ONES = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
const int = (n) => {
  if (n < 20) return ONES[n];
  if (n < 100) return TENS[Math.floor(n / 10)] + (n % 10 ? ` ${ONES[n % 10]}` : '');
  return `${ONES[Math.floor(n / 100)]} hundred` + (n % 100 ? ` ${int(n % 100)}` : '');
};
export const nw = (v) => {
  const s = String(G.r6(v));
  const [i, f] = s.split('.');
  return int(Number(i)) + (f ? ` point ${[...f].map((c) => ONES[Number(c)]).join(' ')}` : '');
};

// ---------------------------------------------------------------- the main parallelogram: AB = 8, AD = 4.5, angle A = 62
export const P = G.paraSA(8, 4.5, 62);
G.oppAnglesProof(P.A, P.B, P.C, P.D);
G.diagProof(P.A, P.B, P.C, P.D);
const four = (X) => ({ A: X.A, B: X.B, C: X.C, D: X.D });
const withO = (X) => ({ ...four(X), O: X.O });
const POS = { A: 'sw', B: 'se', C: 'ne', D: 'nw' };
const opp = { A: 1, B: 2 };

/** Both pairs of opposite sides parallel (arrows) and equal (ticks). */
export const figParT = () => fig({
  pts: four(P), pos: POS,
  segs: [['A', 'B', undefined, { arrows: 1, ticks: 1 }], ['D', 'C', undefined, { arrows: 1, ticks: 1 }], ['A', 'D', undefined, { arrows: 2, ticks: 2 }], ['B', 'C', undefined, { arrows: 2, ticks: 2 }]],
}, 'Parallelogram A B C D. A B and D C carry the same single arrow mark and a single tick, so they are parallel and equal. A D and B C carry double arrow marks and double ticks, so they are parallel and equal.', 'Opposite sides are parallel (arrows) and equal (ticks).');
/** Only parallel sides marked (the definition). */
export const figPar = () => fig({
  pts: four(P), pos: POS,
  segs: [['A', 'B', undefined, { arrows: 1 }], ['D', 'C', undefined, { arrows: 1 }], ['A', 'D', undefined, { arrows: 2 }], ['B', 'C', undefined, { arrows: 2 }]],
}, 'Parallelogram A B C D with arrow marks showing that A B is parallel to D C and A D is parallel to B C.', 'A parallelogram has both pairs of opposite sides parallel.');
/** Lengths: AB = 8 cm, AD = 4.5 cm. */
export const figParLen = () => fig({
  pts: four(P), pos: POS,
  segs: [['A', 'B', '8 cm', { arrows: 1, ticks: 1 }], ['D', 'C', undefined, { arrows: 1, ticks: 1 }], ['A', 'D', '4.5 cm', { arrows: 2, ticks: 2 }], ['B', 'C', undefined, { arrows: 2, ticks: 2 }]],
}, 'Parallelogram A B C D drawn to scale with A B equal to eight centimetres and A D equal to four point five centimetres. The opposite sides D C and B C carry the same tick marks, so they are equal to them.', 'Drawn to scale: A B = D C = 8 cm, A D = B C = 4.5 cm.');
/** Numeric angles: A = C = 62, B = D = 118. */
export const figAng = () => fig({
  pts: four(P), pos: POS,
  segs: [['A', 'B', undefined, { arrows: 1 }], ['D', 'C', undefined, { arrows: 1 }], ['A', 'D', undefined, { arrows: 2 }], ['B', 'C', undefined, { arrows: 2 }]],
  angles: [['A', 'B', 'D', r`$62^\circ$`, { arcs: 1 }], ['B', 'C', 'A', r`$118^\circ$`, { arcs: 2 }], ['C', 'D', 'B', r`$62^\circ$`, { arcs: 1 }], ['D', 'A', 'C', r`$118^\circ$`, { arcs: 2 }]],
}, 'Parallelogram A B C D with angle A and angle C each sixty two degrees, shown with one arc, and angle B and angle D each one hundred eighteen degrees, shown with two arcs.', 'Opposite angles are equal; neighbouring angles add to 180 degrees.');
/** Symbolic angles for the proof: A = C = a, B = D = b, a + b = 180. */
export const figAngSym = () => fig({
  pts: four(P), pos: POS,
  segs: [['A', 'B', undefined, { arrows: 1 }], ['D', 'C', undefined, { arrows: 1 }], ['A', 'D', undefined, { arrows: 2 }], ['B', 'C', undefined, { arrows: 2 }]],
  angles: [['A', 'B', 'D', '$a$', { arcs: 1 }], ['B', 'C', 'A', '$b$', { arcs: 2 }], ['C', 'D', 'B', '$a$', { arcs: 1 }]],
}, 'Parallelogram A B C D with angle A and angle C marked a, shown with one arc, and angle B marked b, shown with two arcs. The proof shows that a plus b is one hundred eighty.', 'Co-interior angles: a + b = 180, so the opposite angles are equal.');

// ---------------------------------------------------------------- one pair of opposite sides equal and parallel
/** ABCD with AB parallel and equal to DC (same parallelogram, only that pair marked), AC joined. */
const one = G.onePairProof(P.A, P.B, P.C, P.D);
export const figOne = (withDiagonal = false) => fig({
  pts: four(P), pos: POS,
  segs: [['A', 'B', undefined, { arrows: 1, ticks: 1 }], ['D', 'C', undefined, { arrows: 1, ticks: 1 }], ['A', 'D'], ['B', 'C'], ...(withDiagonal ? [['A', 'C', undefined, { dashed: true }]] : [])],
  polys: withDiagonal ? [[['A', 'B', 'C'], 'shade'], [['C', 'D', 'A'], 'accent']] : [],
  angles: withDiagonal ? [['A', 'B', 'C', '$p$', { arcs: 1 }], ['C', 'D', 'A', '$p$', { arcs: 1 }]] : [],
}, withDiagonal ? 'Quadrilateral A B C D in which A B is parallel and equal to D C. The diagonal A C is dashed. Triangles A B C and C D A are shaded. Angle B A C and angle D C A are alternate angles, both marked p.' : 'Quadrilateral A B C D in which A B and D C carry the same arrow and the same tick, so they are parallel and equal.', withDiagonal ? 'Join A C: triangles A B C and C D A match.' : 'One pair of opposite sides is equal and parallel.');

// ---------------------------------------------------------------- diagonals
const diagPts = () => withO(P);
export const figDiag = () => fig({
  pts: diagPts(), pos: { ...POS, O: 'n' },
  segs: [['A', 'B'], ['B', 'C'], ['C', 'D'], ['D', 'A'], ['A', 'O', undefined, { dashed: true, ticks: 1 }], ['O', 'C', undefined, { dashed: true, ticks: 1 }], ['B', 'O', undefined, { dashed: true, ticks: 2 }], ['O', 'D', undefined, { dashed: true, ticks: 2 }]],
}, 'Parallelogram A B C D with the diagonals A C and B D dashed. They cross at O. Tick marks show that O A equals O C and O B equals O D.', 'The diagonals bisect each other at O.');
export const figDiagProof = () => fig({
  pts: diagPts(), pos: { ...POS, O: 'n' },
  segs: [['A', 'B', undefined, { ticks: 3 }], ['B', 'C'], ['C', 'D', undefined, { ticks: 3 }], ['D', 'A'], ['A', 'O', undefined, { dashed: true }], ['O', 'C', undefined, { dashed: true }], ['B', 'O', undefined, { dashed: true }], ['O', 'D', undefined, { dashed: true }]],
  polys: [[['A', 'O', 'B'], 'shade'], [['C', 'O', 'D'], 'accent']],
  angles: [['A', 'O', 'B', '$p$', { arcs: 1 }], ['C', 'O', 'D', '$p$', { arcs: 1 }], ['B', 'A', 'O', '$q$', { arcs: 2 }], ['D', 'C', 'O', '$q$', { arcs: 2 }]],
}, 'Parallelogram A B C D with the diagonals crossing at O. Triangles A O B and C O D are shaded. Their sides A B and C D carry the same tick marks. Angle O A B equals angle O C D, marked p, and angle A B O equals angle C D O, marked q.', 'Triangles A O B and C O D match: angle, side, angle.');
export const figCong = () => fig({
  pts: four(P), pos: POS,
  segs: [['A', 'B'], ['B', 'C'], ['C', 'D'], ['D', 'A'], ['A', 'C', undefined, { dashed: true }]],
  polys: [[['A', 'B', 'C'], 'shade'], [['C', 'D', 'A'], 'accent']],
  angles: [['B', 'A', 'C', '$p$', { arcs: 1 }], ['D', 'C', 'A', '$p$', { arcs: 1 }], ['B', 'C', 'A', '$q$', { arcs: 2 }], ['D', 'A', 'C', '$q$', { arcs: 2 }]],
}, 'Parallelogram A B C D cut along the diagonal A C into two shaded triangles, A B C and C D A. The marked angles at A and C are equal alternate angles, and the diagonal A C is common to both triangles.', 'A diagonal cuts a parallelogram into two congruent triangles.');

// ---------------------------------------------------------------- rhombus
export const RH = G.rhombusD(32, 24); // A (-16, 0), B (0, -12), C (16, 0), D (0, 12): side 20
G.rhombusProof(RH.A, RH.B, RH.C, RH.D);
const rhPts = () => ({ A: RH.A, B: RH.B, C: RH.C, D: RH.D, O: RH.O });
const rhPos = { A: 'w', B: 's', C: 'e', D: 'n', O: 'ne' };
export const figRh = () => fig({
  pts: { A: RH.A, B: RH.B, C: RH.C, D: RH.D }, pos: rhPos,
  segs: [['A', 'B', undefined, { ticks: 1, arrows: 1 }], ['B', 'C', undefined, { ticks: 1, arrows: 2 }], ['C', 'D', undefined, { ticks: 1, arrows: 1 }], ['D', 'A', undefined, { ticks: 1, arrows: 2 }]],
}, 'Rhombus A B C D. All four sides carry the same tick mark, so they are equal, and opposite sides carry matching arrow marks, so they are parallel.', 'A rhombus: a parallelogram with four equal sides.');
export const figRhDiag = () => fig({
  pts: rhPts(), pos: rhPos,
  segs: [['A', 'B'], ['B', 'C'], ['C', 'D'], ['D', 'A'], ['A', 'O', undefined, { dashed: true, ticks: 2 }], ['O', 'C', undefined, { dashed: true, ticks: 2 }], ['B', 'O', undefined, { dashed: true, ticks: 3 }], ['O', 'D', undefined, { dashed: true, ticks: 3 }]],
  angles: [['O', 'A', 'B', undefined, { right: true }]],
}, 'Rhombus A B C D with its diagonals dashed, crossing at O at a right angle marked by a small square. The tick marks show that O A equals O C and O B equals O D.', 'The diagonals of a rhombus bisect each other at right angles.');
export const figRhProof = () => fig({
  pts: rhPts(), pos: rhPos,
  segs: [['A', 'B', undefined, { ticks: 1 }], ['B', 'C'], ['C', 'D'], ['D', 'A', undefined, { ticks: 1 }], ['A', 'O', undefined, { dashed: true }], ['O', 'C', undefined, { dashed: true }], ['B', 'O', undefined, { dashed: true, ticks: 2 }], ['O', 'D', undefined, { dashed: true, ticks: 2 }]],
  polys: [[['A', 'O', 'B'], 'shade'], [['A', 'O', 'D'], 'accent']],
  angles: [['O', 'A', 'B', '$m$', { arcs: 1 }], ['O', 'A', 'D', '$m$', { arcs: 1 }]],
}, 'Rhombus A B C D with triangles A O B and A O D shaded. A B equals A D, O B equals O D, and A O is common. The angles at O in the two triangles are marked m and are equal.', 'Triangles A O B and A O D match on three sides.');
/** Rhombus of the first worked example: diagonals 14 and 48, side 25. */
export const RH2 = G.rhombusD(48, 14);
export const figRhNum = () => fig({
  pts: { A: RH2.A, B: RH2.B, C: RH2.C, D: RH2.D, O: RH2.O }, pos: { A: 'w', B: 's', C: 'e', D: 'n', O: 'ne' }, k: 0.2, margin: 0.9,
  segs: [['A', 'B'], ['B', 'C'], ['C', 'D'], ['D', 'A'], ['A', 'C', '48 cm', { dashed: true }], ['B', 'D', '14 cm', { dashed: true }]],
  angles: [['O', 'A', 'B', undefined, { right: true }]],
}, 'Rhombus with diagonals forty eight centimetres and fourteen centimetres, drawn to scale, crossing at right angles at O. The side is to be found.', 'Drawn to scale: diagonals 48 cm and 14 cm.');
/** Rhombus with angle A = 76 (angle chase example). */
export const RH3 = G.rhombus(...(() => { const p = G.paraSA(6, 6, 76); return [p.A, p.B, p.C, p.D]; })());
export const figRhAng = () => fig({
  pts: { A: RH3.A, B: RH3.B, C: RH3.C, D: RH3.D, O: RH3.O }, pos: { A: 'sw', B: 'se', C: 'ne', D: 'nw', O: 'n' },
  segs: [['A', 'B', undefined, { ticks: 1 }], ['B', 'C', undefined, { ticks: 1 }], ['C', 'D', undefined, { ticks: 1 }], ['D', 'A', undefined, { ticks: 1 }], ['A', 'C', undefined, { dashed: true }], ['B', 'D', undefined, { dashed: true }]],
  angles: [['A', 'B', 'D', r`$76^\circ$`], ['A', 'B', 'C', '$x$'], ['O', 'A', 'B', undefined, { right: true }]],
}, 'Rhombus A B C D with angle D A B equal to seventy six degrees. Its diagonals are dashed and cross at O at a right angle. The angle B A C is marked x.', 'Rhombus with angle A = 76 degrees; find angle BAC and angle ABD.');

// ---------------------------------------------------------------- rectangle
export const RE = G.rectLB(24, 10); // diagonal 26
G.rectProof(RE.A, RE.B, RE.C, RE.D);
const reP = () => ({ A: RE.A, B: RE.B, C: RE.C, D: RE.D, O: RE.O });
export const figRect = () => fig({
  pts: reP(), pos: { A: 'sw', B: 'se', C: 'ne', D: 'nw', O: 'n' }, k: 0.28,
  segs: [['A', 'B'], ['B', 'C'], ['C', 'D'], ['D', 'A'], ['A', 'O', undefined, { dashed: true, ticks: 1 }], ['O', 'C', undefined, { dashed: true, ticks: 1 }], ['B', 'O', undefined, { dashed: true, ticks: 1 }], ['O', 'D', undefined, { dashed: true, ticks: 1 }]],
  angles: [['A', 'B', 'D', undefined, { right: true }], ['C', 'B', 'D', undefined, { right: true }], ['D', 'C', 'A', undefined, { right: true }]],
}, 'Rectangle A B C D with its equal diagonals dashed, crossing at O. The four half-diagonals O A, O B, O C and O D carry the same tick mark, so they are equal. The four corners are right angles.', 'The diagonals of a rectangle are equal and bisect each other.');
export const figRectNum = () => fig({
  pts: reP(), pos: { A: 'sw', B: 'se', C: 'ne', D: 'nw', O: 'n' }, k: 0.28,
  segs: [['A', 'B', '24 cm'], ['B', 'C', undefined], ['C', 'D'], ['D', 'A'], ['A', 'C', '26 cm', { dashed: true }], ['B', 'D', undefined, { dashed: true }]],
  angles: [['A', 'B', 'D', undefined, { right: true }]],
}, 'Rectangle A B C D drawn to scale with length A B equal to twenty four centimetres and the diagonal A C equal to twenty six centimetres. The breadth B C is to be found.', 'Drawn to scale: A B = 24 cm, A C = 26 cm.');
/** Rectangle with angle ADB = 28. */
export const RE2 = G.rectLB(9, 9 * Math.tan((62 * Math.PI) / 180)); // angle ABD = 62 so angle ADB = 28
export const figRectAng = () => fig({
  pts: { A: RE2.A, B: RE2.B, C: RE2.C, D: RE2.D, O: RE2.O }, pos: { A: 'sw', B: 'se', C: 'ne', D: 'nw', O: 'e' }, k: 0.32,
  segs: [['A', 'B'], ['B', 'C'], ['C', 'D'], ['D', 'A'], ['A', 'C', undefined, { dashed: true }], ['B', 'D', undefined, { dashed: true }]],
  angles: [['D', 'A', 'B', r`$28^\circ$`], ['B', 'A', 'D', '$y$'], ['O', 'A', 'B', '$z$']],
}, 'Rectangle A B C D with diagonals A C and B D crossing at O. The angle A D B is twenty eight degrees. The angle A B D is marked y and the angle A O B is marked z.', 'Rectangle with angle ADB = 28 degrees; find y = angle ABD and z = angle AOB.');

// ---------------------------------------------------------------- square
export const SQ = G.squareS(6);
export const figSq = () => fig({
  pts: { A: SQ.A, B: SQ.B, C: SQ.C, D: SQ.D, O: SQ.O }, pos: { A: 'sw', B: 'se', C: 'ne', D: 'nw', O: 'n' }, k: 0.5,
  segs: [['A', 'B', undefined, { ticks: 1 }], ['B', 'C', undefined, { ticks: 1 }], ['C', 'D', undefined, { ticks: 1 }], ['D', 'A', undefined, { ticks: 1 }], ['A', 'O', undefined, { dashed: true, ticks: 2 }], ['O', 'C', undefined, { dashed: true, ticks: 2 }], ['B', 'O', undefined, { dashed: true, ticks: 2 }], ['O', 'D', undefined, { dashed: true, ticks: 2 }]],
  angles: [['A', 'B', 'C', r`$45^\circ$`], ['O', 'A', 'B', undefined, { right: true }]],
}, 'Square A B C D with its diagonals dashed, crossing at O at a right angle. All four sides carry the same tick, and the four half-diagonals carry the same double tick. The diagonal A C makes forty five degrees with the side A B.', 'Square: equal diagonals that meet at right angles and bisect the corners.');
/** Square with diagonal 18 (worked example). */
export const SQ2 = G.square([0, 0], [18 / Math.SQRT2, 0], [18 / Math.SQRT2, 18 / Math.SQRT2], [0, 18 / Math.SQRT2]);
export const figSqNum = () => fig({
  pts: { A: SQ2.A, B: SQ2.B, C: SQ2.C, D: SQ2.D, O: SQ2.O }, pos: { A: 'sw', B: 'se', C: 'ne', D: 'nw', O: 'n' }, k: 0.36,
  segs: [['A', 'B'], ['B', 'C'], ['C', 'D'], ['D', 'A'], ['A', 'C', '18 cm', { dashed: true }], ['B', 'D', undefined, { dashed: true }]],
  angles: [['O', 'A', 'B', undefined, { right: true }]],
}, 'Square A B C D drawn to scale with the diagonal A C equal to eighteen centimetres and the other diagonal B D dashed. The diagonals cross at right angles at O. The area is to be found.', 'Drawn to scale: diagonal A C = 18 cm.');

// ---------------------------------------------------------------- worked-example parallelograms
/** Example 1: parallelogram PQRS with angle P = 64. */
export const E1 = G.paraSA(7.2, 4, 64);
export const figE1 = () => fig({
  pts: { P: E1.A, Q: E1.B, R: E1.C, S: E1.D }, pos: { P: 'sw', Q: 'se', R: 'ne', S: 'nw' },
  segs: [['P', 'Q', undefined, { arrows: 1 }], ['S', 'R', undefined, { arrows: 1 }], ['P', 'S', undefined, { arrows: 2 }], ['Q', 'R', undefined, { arrows: 2 }]],
  angles: [['P', 'Q', 'S', r`$64^\circ$`], ['Q', 'R', 'P', '$a$'], ['R', 'S', 'Q', '$b$'], ['S', 'P', 'R', '$c$']],
}, 'Parallelogram P Q R S with angle P equal to sixty four degrees. The angles at Q, R and S are marked a, b and c.', 'Find a, b and c.');
/** Example 3: sides (2x + 3) and (5x - 12) with x = 5: AB = DC = 13, AD = 8. */
export const E3 = G.paraSA(13, 8, 70);
export const figE3 = () => fig({
  pts: four(E3), pos: POS,
  segs: [['A', 'B', r`$(2x + 3)$ cm`, { arrows: 1 }], ['D', 'C', r`$(5x - 12)$ cm`, { arrows: 1 }], ['A', 'D', '8 cm', { arrows: 2 }], ['B', 'C', undefined, { arrows: 2 }]],
}, 'Parallelogram A B C D with A B equal to two x plus three centimetres, D C equal to five x minus twelve centimetres and A D equal to eight centimetres.', 'Opposite sides are equal: find x.');
/** Example 4: diagonals 28 and 22 crossing at 55 degrees: OA = OC = 14, OB = OD = 11. */
export const E4 = G.paraDiag(28, 22, 55);
export const figE4 = () => fig({
  pts: { A: E4.A, B: E4.B, C: E4.C, D: E4.D, O: E4.O }, pos: { A: 'w', B: 'sw', C: 'e', D: 'ne', O: 'n' }, k: 0.3,
  segs: [['A', 'B'], ['B', 'C'], ['C', 'D'], ['D', 'A'], ['A', 'O', r`$(3x - 1)$`, { dashed: true }], ['O', 'C', r`$(x + 9)$`, { dashed: true }], ['B', 'D', '22 cm', { dashed: true }]],
}, 'Parallelogram A B C D with the diagonals crossing at O. O A is three x minus one and O C is x plus nine. The diagonal B D is twenty two centimetres.', 'Diagonals bisect each other: find x, AC and OB.');
/** Example 5: AB = 9, AC = 14, BD = 11. */
export const E5 = G.paraTri(7, 5.5, 9);
export const figE5 = () => fig({
  pts: { A: E5.A, B: E5.B, C: E5.C, D: E5.D, O: E5.O }, pos: { A: 'w', B: 'n', C: 'e', D: 's', O: 'se' }, k: 0.4,
  segs: [['A', 'B', '9 cm'], ['B', 'C'], ['C', 'D'], ['D', 'A'], ['A', 'C', '14 cm', { dashed: true }], ['B', 'D', '11 cm', { dashed: true }]],
  polys: [[['A', 'O', 'B'], 'shade']],
}, 'Parallelogram A B C D with A B equal to nine centimetres and the diagonals A C of fourteen centimetres and B D of eleven centimetres crossing at O. Triangle A O B is shaded.', 'Drawn to scale: find the perimeter of triangle A O B.');
export const E5info = () => ({ ao: dist(E5.A, E5.O), bo: dist(E5.B, E5.O), ab: dist(E5.A, E5.B) });

// ---------------------------------------------------------------- the special parallelogram family and a mixed example
export const flowFamily = () => ({
  nodes: [['p', 'Parallelogram'], ['rh', 'Rhombus: four equal sides'], ['re', 'Rectangle: four right angles'], ['sq', 'Square: both']],
  edges: [['p', 'rh', 'add equal sides'], ['p', 're', 'add a right angle'], ['rh', 'sq', 'add a right angle'], ['re', 'sq', 'add equal sides']],
});
/** Mixed example: parallelogram with perpendicular diagonals, AB = 13, AC = 24: a rhombus with BD = 10. */
export const RH4 = G.rhombusD(24, 10);
export const figMix = () => fig({
  pts: { A: RH4.A, B: RH4.B, C: RH4.C, D: RH4.D, O: RH4.O }, pos: { A: 'w', B: 's', C: 'e', D: 'n', O: 'ne' }, k: 0.28,
  segs: [['A', 'B', '13 cm'], ['B', 'C'], ['C', 'D'], ['D', 'A'], ['A', 'C', '24 cm', { dashed: true }], ['B', 'D', undefined, { dashed: true }]],
  angles: [['O', 'A', 'B', undefined, { right: true }]],
}, 'Parallelogram A B C D whose diagonals meet at right angles at O. A B is thirteen centimetres and A C is twenty four centimetres. The length B D is to be found.', 'Drawn to scale: A B = 13 cm, A C = 24 cm, diagonals at right angles.');
void must; void near; void mid;
