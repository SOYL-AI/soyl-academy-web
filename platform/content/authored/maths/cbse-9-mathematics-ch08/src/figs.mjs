// Figures of CBSE 9 Mathematics ch08 Lines and Angles, shared by the deck builder and the question banks (a figure used as a
// question asset is the same object as in the deck). Every angle label is a value computed from ray directions; the lint also
// measures each labelled arc against the drawn coordinates.
import { fig, transFig, crossFig, aroundFig, polar, lineInter, angleAt, eight, crossAngles, gap, must, close, dist } from './h.mjs';

const O = [0, 0];

// ---- line, segment, ray
export const fLSR = fig({
  points: { A: { at: [0, 3], label_position: 'n' }, B: { at: [4, 3], label_position: 'n' }, C: { at: [0, 1.8], label_position: 's' }, D: { at: [4, 1.8], label_position: 's' }, P: { at: [0, 0.6], label_position: 's' }, E: { at: [2.6, 0.6], label_position: 's' } },
  segments: [{ from: 'A', to: 'B', label: 'segment AB' }],
  lines: [{ through: ['C', 'D'], label: 'line CD' }],
  rays: [{ from: 'P', through: 'E', label: 'ray PE' }],
}, 'Three drawings. A segment AB with two end points. A line CD that goes on in both directions. A ray PE that starts at P and goes on beyond E.', 'A segment has two ends, a line has none, and a ray has one starting point.');

// ---- an angle of 50 degrees
const aB = polar(O, 3, 50);
must(close(angleAt(O, [3, 0], aB), 50), 'angle 50');
export const fAngle = fig({
  points: { O: { at: O, label_position: 'sw' }, A: { at: [3, 0], label_position: 'e' }, B: { at: aB, label_position: 'ne' } },
  rays: [{ from: 'O', through: 'A' }, { from: 'O', through: 'B' }],
  angles: [{ at: 'O', from: 'A', to: 'B', label: '50°' }],
}, 'Two rays OA and OB starting from the same point O. They are the arms of an angle AOB, which measures 50 degrees. The point O is the vertex.', 'Angle $AOB$ has vertex $O$ and arms $OA$ and $OB$.');

// ---- acute, right, obtuse
const t1 = [0, 0], t2 = [4, 0], t3 = [9, 0];
must(close(angleAt(t1, [2.4, 0], polar(t1, 2.4, 40)), 40) && close(angleAt(t2, [6.4, 0], [4, 2.4]), 90) && close(angleAt(t3, [11.4, 0], polar(t3, 2.4, 130)), 130), 'type angles');
export const fTypes = fig({
  points: { O1: { at: t1, label: false }, A1: { at: [2.4, 0], label: false }, B1: { at: polar(t1, 2.4, 40), label: false }, O2: { at: t2, label: false }, A2: { at: [6.4, 0], label: false }, B2: { at: [4, 2.4], label: false }, O3: { at: t3, label: false }, A3: { at: [11.4, 0], label: false }, B3: { at: polar(t3, 2.4, 130), label: false } },
  segments: [{ from: 'O1', to: 'A1' }, { from: 'O1', to: 'B1' }, { from: 'O2', to: 'A2' }, { from: 'O2', to: 'B2' }, { from: 'O3', to: 'A3' }, { from: 'O3', to: 'B3' }],
  angles: [{ at: 'O1', from: 'A1', to: 'B1', label: '40°' }, { at: 'O2', from: 'A2', to: 'B2', right: true }, { at: 'O3', from: 'A3', to: 'B3', label: '130°' }],
}, 'Three angles side by side: an acute angle of 40 degrees, a right angle of 90 degrees marked with a square corner, and an obtuse angle of 130 degrees.', 'Acute $40^\\circ$, right $90^\\circ$, obtuse $130^\\circ$.');

// ---- complementary and supplementary
const cs1 = [0, 0], cs2 = [7, 0];
must(close(angleAt(cs1, [3, 0], polar(cs1, 3, 35)), 35) && close(angleAt(cs1, polar(cs1, 3, 35), [0, 3]), 55) && close(angleAt(cs2, [10, 0], polar(cs2, 3, 110)), 110) && close(angleAt(cs2, polar(cs2, 3, 110), [4, 0]), 70), 'comp supp');
export const fCS = fig({
  points: { P: { at: cs1, label: false }, A: { at: [3, 0], label: false }, B: { at: polar(cs1, 3, 35), label: false }, C: { at: [0, 3], label: false }, Q: { at: cs2, label: false }, X: { at: [4, 0], label: false }, Y: { at: [10, 0], label: false }, Z: { at: polar(cs2, 3, 110), label: false } },
  segments: [{ from: 'P', to: 'A' }, { from: 'P', to: 'B' }, { from: 'P', to: 'C' }, { from: 'X', to: 'Y' }, { from: 'Q', to: 'Z' }],
  angles: [{ at: 'P', from: 'A', to: 'B', label: '35°' }, { at: 'P', from: 'B', to: 'C', label: '55°' }, { at: 'Q', from: 'Y', to: 'Z', label: '110°' }, { at: 'Q', from: 'Z', to: 'X', label: '70°' }],
}, 'Left: a right angle split into 35 degrees and 55 degrees, which are complementary. Right: a straight line with a ray, making 110 degrees and 70 degrees, which are supplementary.', 'Complementary: $35^\\circ + 55^\\circ = 90^\\circ$. Supplementary: $110^\\circ + 70^\\circ = 180^\\circ$.');

// ---- linear pair (symbols) and its proof figure (numbers)
export const fLinear = fig({
  points: { A: { at: [-3, 0], label_position: 'sw' }, O: { at: O, label_position: 's' }, B: { at: [3, 0], label_position: 'se' }, C: { at: polar(O, 2.7, 65), label_position: 'ne' } },
  segments: [{ from: 'A', to: 'B' }, { from: 'O', to: 'C' }],
  angles: [{ at: 'O', from: 'A', to: 'C', label: 'x', arcs: 1 }, { at: 'O', from: 'C', to: 'B', label: 'y', arcs: 2 }],
}, 'A straight line AB with a point O on it and a ray OC standing on the line. The two angles AOC and COB next to each other are called x and y. Together they make a straight angle.', 'A linear pair: $\\angle AOC = x$ and $\\angle COB = y$ with $x + y = 180^\\circ$.');
const lpC = polar(O, 2.7, 65);
must(close(angleAt(O, [-3, 0], [0, 2.7]), 90) && close(angleAt(O, [0, 2.7], lpC), 25) && close(angleAt(O, lpC, [3, 0]), 65) && close(angleAt(O, [-3, 0], lpC), 115), 'linear pair proof figure');
export const fLinProof = fig({
  points: { A: { at: [-3, 0], label_position: 'sw' }, O: { at: O, label_position: 's' }, B: { at: [3, 0], label_position: 'se' }, D: { at: [0, 2.7], label_position: 'n' }, C: { at: lpC, label_position: 'ne' } },
  segments: [{ from: 'A', to: 'B' }, { from: 'O', to: 'D' }, { from: 'O', to: 'C' }],
  angles: [{ at: 'O', from: 'A', to: 'D', right: true }, { at: 'O', from: 'D', to: 'C', label: '25°', arcs: 1 }, { at: 'O', from: 'C', to: 'B', label: '65°', arcs: 2 }],
}, 'A straight line AB with the ray OD at right angles to it, and a ray OC between OD and OB. The angle DOC is 25 degrees and the angle COB is 65 degrees, so the angle AOC is 90 plus 25, which is 115 degrees.', 'Proof figure: $OD \\perp AB$. Here $\\angle DOC = 25^\\circ$ and $\\angle COB = 65^\\circ$.');

// ---- crossing lines
const vo = crossAngles(20, 85);
must(close(vo.BOC, 65) && close(vo.AOD, 65) && close(vo.COA, 115) && close(vo.DOB, 115), 'vertical angles figure');
export const fVO = crossFig(20, 85, [['BOC', '65°', 1], ['AOD', '65°', 1], ['COA', '115°', 2], ['DOB', '115°', 2]], 'Two straight lines AB and CD crossing at O. The opposite angles BOC and AOD are both 65 degrees, and the other two opposite angles COA and DOB are both 115 degrees.', 'Vertically opposite angles are equal: $65^\\circ = 65^\\circ$ and $115^\\circ = 115^\\circ$.');
const woE = crossAngles(0, 115);
must(close(woE.COA, 65) && close(woE.DOB, 65) && close(woE.BOC, 115), 'worked example crossing');
export const fWE2 = crossFig(0, 115, [['COA', '(2x + 15)°', 1], ['DOB', '(3x - 10)°', 1], ['BOC', '?', 2]], 'Two lines AB and CD crossing at O. The angle AOC is marked 2x plus 15 degrees and its vertically opposite angle BOD is marked 3x minus 10 degrees. The angle BOC is marked with a question mark.', '$\\angle AOC = (2x + 15)^\\circ$ and $\\angle BOD = (3x - 10)^\\circ$.');

// ---- around a point
const arD = [0, 70, 165, 275];
const arV = arD.map((d, i) => gap(d, arD[(i + 1) % 4]));
must(arV.join() === '70,95,110,85' && arV.reduce((s, v) => s + v, 0) === 360, 'around a point');
export const fAround = aroundFig(arD, ['70°', '95°', '110°', '85°'], ['P', 'Q', 'R', 'S'], 'Four rays from a point O making angles of 70, 95, 110 and 85 degrees one after the other. Together they go all the way round the point.', 'Angles around a point: $70^\\circ + 95^\\circ + 110^\\circ + 85^\\circ = 360^\\circ$.');
const weD = [0, 50, 150, 260], weV = weD.map((d, i) => gap(d, weD[(i + 1) % 4]));
must(weV.join() === '50,100,110,100' && weV.reduce((s, v) => s + v, 0) === 360, 'worked example 3 figure');
export const fWE3 = aroundFig(weD, ['x', '2x', '(x + 60)°', '100°'], ['P', 'Q', 'R', 'S'], 'Four rays from a point O. The angles between them in order are x, 2x, x plus 60 degrees and 100 degrees, and together they make a full turn.', 'Around $O$: $x + 2x + (x + 60) + 100 = 360$.');

// ---- parallel lines and a transversal (alpha = 65)
const E65 = eight(65);
must([1, 3, 5, 7].every((i) => close(E65[i], 115)) && [2, 4, 6, 8].every((i) => close(E65[i], 65)), 'eight angles for 65');
const sel8 = (vals) => [1, 2, 3, 4, 5, 6, 7, 8].map((i) => [i, vals ? `${Math.round(E65[i])}°` : String(i), vals ? 1 + (i % 2) : undefined]);
export const fRail = transFig(65, [[2, '65°', 1], [6, '65°', 1]], 'Two parallel lines l and m, marked with arrows, cut by a transversal t. The angle between t and l on the upper right is 65 degrees, and the matching angle at m is also 65 degrees.', 'Parallel lines cut by a transversal: matching angles are equal.');
export const fNames = transFig(65, sel8(false), 'Two parallel lines l and m cut by a transversal t. The eight angles are numbered 1 to 4 at the upper crossing and 5 to 8 at the lower crossing, going round from the upper left.', 'The eight angles. Angles $1$ and $5$ are corresponding; $3$ and $5$ are alternate interior; $3$ and $6$ are co-interior.');
export const fCorr = transFig(65, [[1, '115°', 2], [5, '115°', 2]], 'Parallel lines l and m with a transversal t. The upper left angle at l and the upper left angle at m are corresponding angles, and both are 115 degrees.', 'Corresponding angles ($\\angle 1$ and $\\angle 5$) are equal when $l \\parallel m$.');
export const fAlt = transFig(65, [[3, '115°', 1], [5, '115°', 1]], 'Parallel lines l and m with a transversal t. The angle 3 below l on the right of t and the angle 5 above m on the left of t are alternate interior angles, both 115 degrees.', 'Alternate interior angles ($\\angle 3$ and $\\angle 5$) are equal when $l \\parallel m$.');
export const fCoin = transFig(65, [[3, '115°'], [6, '65°']], 'Parallel lines l and m with a transversal t. The two angles between the lines on the same side of t are 115 degrees and 65 degrees, which add up to 180 degrees.', 'Co-interior angles: $115^\\circ + 65^\\circ = 180^\\circ$.');
export const fWE1 = transFig(65, sel8(true), 'Parallel lines l and m cut by a transversal t with all eight angles marked: at each crossing the angles are 115, 65, 115 and 65 degrees going round.', 'If one angle is $65^\\circ$, the other seven are $65^\\circ$ or $115^\\circ$.');
const E70 = eight(70);
must([3, 5].every((i) => close(E70[i], 110)), 'converse figure');
export const fConv = transFig(70, [[3, '110°', 1], [5, '110°', 1]], 'Two lines l and m cut by a transversal t so that the alternate interior angles 3 and 5 are both 110 degrees. This shows that the lines l and m are parallel.', 'Equal alternate interior angles ($110^\\circ$ each) tell us that $l \\parallel m$.');

// ---- three parallel lines
const T3 = Math.tan((65 * Math.PI) / 180), yL = [0, 2.2, 4.4];
const X3 = yL.map((y) => [y / T3, y]);
const dir65 = [Math.cos((65 * Math.PI) / 180), Math.sin((65 * Math.PI) / 180)];
must(X3.every((p) => close(angleAt(p, [p[0] + 3, p[1]], [p[0] + dir65[0], p[1] + dir65[1]]), 65)) && X3.every((p, i) => i === 0 || close(angleAt(X3[i - 1], [X3[i - 1][0] + 3, X3[i - 1][1]], p), 65)), 'three lines: the transversal is straight and makes 65 degrees with each');
export const fTrans3 = fig({
  points: {
    N: { at: X3[0], label: false }, M: { at: X3[1], label: false }, L: { at: X3[2], label: false },
    Nl: { at: [X3[0][0] - 3, 0], label: false }, Nr: { at: [X3[0][0] + 3, 0], label: 'n', label_position: 'se' },
    Ml: { at: [X3[1][0] - 3, 2.2], label: false }, Mr: { at: [X3[1][0] + 3, 2.2], label: 'm', label_position: 'e' },
    Ll: { at: [X3[2][0] - 3, 4.4], label: false }, Lr: { at: [X3[2][0] + 3, 4.4], label: 'l', label_position: 'ne' },
    Tt: { at: [X3[2][0] + dir65[0], 4.4 + dir65[1]], label: 't', label_position: 'ne' }, Tb: { at: [-dir65[0], -dir65[1]], label: false },
  },
  segments: [{ from: 'Nl', to: 'Nr', arrows: 1 }, { from: 'Ml', to: 'Mr', arrows: 1 }, { from: 'Ll', to: 'Lr', arrows: 1 }, { from: 'Tb', to: 'Tt' }],
  angles: [{ at: 'N', from: 'Nr', to: 'M', label: '65°', arcs: 1 }, { at: 'M', from: 'Mr', to: 'L', label: '65°', arcs: 1 }, { at: 'L', from: 'Lr', to: 'Tt', label: '65°', arcs: 1 }],
}, 'Three parallel lines l, m and n, each marked with an arrow, cut by one transversal t. At every crossing the angle on the upper right is 65 degrees, so the corresponding angles are all equal.', 'If $l \\parallel m$ and $m \\parallel n$, a transversal makes the same angle with all three, so $l \\parallel n$.');

// ---- triangle angle sum from a parallel line (50, 60, 70)
const tB = [0, 0], tC = [6, 0];
const tA = lineInter(tB, polar(tB, 1, 50), tC, polar(tC, 1, 120));
must(close(angleAt(tB, tC, tA), 50) && close(angleAt(tC, tB, tA), 60) && close(angleAt(tA, tB, tC), 70), 'triangle 50 60 70');
const tP = [tA[0] - 3.2, tA[1]], tQ = [tA[0] + 3.2, tA[1]];
must(close(angleAt(tA, tP, tB), 50) && close(angleAt(tA, tQ, tC), 60) && close(angleAt(tA, tP, tB) + angleAt(tA, tB, tC) + angleAt(tA, tC, tQ), 180), 'parallel through A');
export const fTri = fig({
  points: { B: { at: tB, label_position: 'sw' }, C: { at: tC, label_position: 'se' }, A: { at: tA, label_position: 'n' }, P: { at: tP, label_position: 'w' }, Q: { at: tQ, label_position: 'e' } },
  segments: [{ from: 'B', to: 'C', arrows: 1 }, { from: 'A', to: 'B' }, { from: 'A', to: 'C' }, { from: 'P', to: 'Q', arrows: 1 }],
  angles: [{ at: 'B', from: 'C', to: 'A', label: '50°', arcs: 1 }, { at: 'C', from: 'B', to: 'A', label: '60°', arcs: 2 }, { at: 'A', from: 'P', to: 'B', label: '50°', arcs: 1 }, { at: 'A', from: 'C', to: 'Q', label: '60°', arcs: 2 }, { at: 'A', from: 'B', to: 'C', label: '70°', arcs: 3 }],
}, 'A triangle ABC with angles of 50 degrees at B and 60 degrees at C. A line PQ through A is drawn parallel to BC. The alternate angles PAB and CAQ are 50 and 60 degrees, and the three angles at A, 50, 70 and 60, make a straight angle of 180 degrees.', '$PQ \\parallel BC$ gives $\\angle PAB = \\angle B$ and $\\angle QAC = \\angle C$, so $\\angle A + \\angle B + \\angle C = 180^\\circ$.');

// ---- a bent path between parallel lines: the angle at E is the sum of the two angles at A and C
export function zigPoints(angA, angC) {
  const A = [0, 3], C = [1, 0];
  const E = lineInter(A, polar(A, 1, -angA), C, polar(C, 1, angC));
  must(E[1] > 0 && E[1] < 3 && close(angleAt(A, [3, 3], E), angA) && close(angleAt(C, [4, 0], E), angC) && close(angleAt(E, A, C), angA + angC), 'bent path');
  return { A, C, E, total: angleAt(E, A, C) };
}
export function zigFig(angA, angC) {
  const { A, C, E } = zigPoints(angA, angC);
  return fig({
    points: { A: { at: A, label_position: 'nw' }, R: { at: [5.5, 3], label: 'l', label_position: 'ne' }, L1: { at: [-1.2, 3], label: false }, C: { at: C, label_position: 'sw' }, R2: { at: [5.5, 0], label: 'm', label_position: 'se' }, L2: { at: [-1.2, 0], label: false }, E: { at: E, label_position: 'e' }, F1: { at: [-1.2, E[1]], label: false }, F2: { at: [5.5, E[1]], label: false } },
    segments: [{ from: 'L1', to: 'R', arrows: 1 }, { from: 'L2', to: 'R2', arrows: 1 }, { from: 'A', to: 'E' }, { from: 'C', to: 'E' }, { from: 'F1', to: 'F2', dashed: true, arrows: 1 }],
    angles: [{ at: 'A', from: 'R', to: 'E', label: angA + '°' }, { at: 'C', from: 'R2', to: 'E', label: angC + '°' }, { at: 'E', from: 'A', to: 'C', label: '?' }],
  }, 'Two \\parallel lines l and m. A bent path runs from A on l to a point E between the lines and on to C on m. The angle at A between l and AE is ' + angA + ' degrees and the angle at C between m and CE is ' + angC + ' degrees. A dashed line through E is parallel to both lines. The angle AEC is marked with a question mark.', '$l \\parallel m$. The dashed line through $E$ is parallel to both, so $\\angle AEC = ' + angA + '^\\circ + ' + angC + '^\\circ$.');
}
export const fZig = zigFig(35, 40);

// ---- two lines meet in one point
const cP = [2, 1.2];
export const fContr = fig({
  points: { P: { at: cP, label_position: 's' }, L1: { at: polar(cP, 3, 200), label: false }, L2: { at: polar(cP, 3, 20), label: 'l', label_position: 'e' }, M1: { at: polar(cP, 3, 250), label: false }, M2: { at: polar(cP, 3, 70), label: 'm', label_position: 'n' } },
  segments: [{ from: 'L1', to: 'L2' }, { from: 'M1', to: 'M2' }],
}, 'Two different straight lines l and m that cross at a single point P. They cannot cross at a second point.', 'Two different lines meet in at most one point.');

