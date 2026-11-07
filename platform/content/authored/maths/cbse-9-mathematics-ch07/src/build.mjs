// Build CBSE 9 Mathematics ch07 Introduction to Euclid's Geometry: Axioms and Postulates. Run from platform/:
//   npx tsx content/_stage/maths/cbse-9-mathematics-ch07/src/build.mjs
// Every figure is drawn from computed coordinates (circle intersections, angles, areas asserted); every number in a table is
// recomputed before it is printed.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, topic, deck, sl, table, flow, build, chapterTests } from './lib.mjs';
import { r, must, fx, close, dist, polar, angleAt, circInter, lineInter, fig, rectFig, area, brick, hyp, POSTULATES, NOTIONS } from './h.mjs';

setUnit('cbse-9-mathematics-ch07', 'claude-sonnet-5-5 (writer); reviewed by claude-opus-5-5 (subject-producer)');
await import('./questions.mjs');
await import('./questions2.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const M = (v) => `$${fx(v)}$`;

// ================================================================ figures
// Rope-stretcher triangle 3-4-5
must(hyp(3, 4) === 5 && 3 + 4 + 5 === 12, 'rope 3-4-5');
const fRope = fig({
  points: { A: { at: [0, 0], label_position: 'sw' }, B: { at: [4, 0], label_position: 'se' }, C: { at: [0, 3], label_position: 'nw' } },
  segments: [{ from: 'A', to: 'B', label: '4' }, { from: 'A', to: 'C', label: '3' }, { from: 'B', to: 'C', label: '5' }],
  angles: [{ at: 'A', from: 'B', to: 'C', right: true }],
}, 'A right-angled triangle with sides of 3, 4 and 5 equal rope spaces, the right angle at A. A loop of rope with 12 equal spaces, knotted at the corners, makes this triangle.', 'A loop of $12$ equal spaces: sides $3$, $4$, $5$. The right angle is between the sides $3$ and $4$.');

// Brick: three faces of a 4 : 2 : 1 brick, drawn to scale
const bk = brick(1);
must(bk.l === 4 && bk.b === 2 && bk.t === 1 && bk.vol === 8, 'brick unit');
const fBrick = rectFig({
  rects: [[0, 0, bk.l, bk.b, 'top: length by breadth'], [5, 0, 5 + bk.l, bk.t, 'side: length by thickness'], [10, 0, 10 + bk.b, bk.t, 'end: breadth by thickness']],
  sides: [[2, -0.7, 'length 4'], [-0.7, 1, 'breadth 2'], [7, -0.7, 'length 4'], [4.3, 0.5, 'thickness 1'], [11, -0.7, 'breadth 2']],
  margin: 1.1, notToScale: false,
}, 'Three faces of a brick drawn to one scale: the top face is a rectangle 4 units long and 2 wide, the side face is 4 long and 1 thick, and the end face is 2 wide and 1 thick. So length, breadth and thickness are in the ratio 4 to 2 to 1.', 'A brick with length : breadth : thickness $= 4 : 2 : 1$, seen from the top, the side and the end.');

// Square on the diagonal: the outer square (side 4) is built on the diagonal EG of the inner square EFGH (side 2 root 2)
const sq = { A: [0, 0], B: [4, 0], C: [4, 4], D: [0, 4], E: [2, 0], F: [4, 2], G: [2, 4], H: [0, 2] };
must(close(dist(sq.E, sq.F), 2 * Math.SQRT2) && close(dist(sq.E, sq.G), 4) && close(dist(sq.E, sq.F) ** 2, 8) && close(dist(sq.A, sq.B) ** 2, 16) && close(16, 2 * 8), 'square on the diagonal doubles the area');
must(close(angleAt(sq.E, sq.F, sq.H), 90), 'EFGH is a square');
const fDiag = fig({
  points: { A: { at: sq.A, label_position: 'sw' }, B: { at: sq.B, label_position: 'se' }, C: { at: sq.C, label_position: 'ne' }, D: { at: sq.D, label_position: 'nw' }, E: { at: sq.E, label_position: 's' }, F: { at: sq.F, label_position: 'e' }, G: { at: sq.G, label_position: 'n' }, H: { at: sq.H, label_position: 'w' } },
  polygons: [{ vertices: ['A', 'B', 'C', 'D'], highlight: 'outline' }, { vertices: ['E', 'F', 'G', 'H'], fill: true, highlight: 'accent' }],
  segments: [{ from: 'E', to: 'G', dashed: true }],
}, 'A big square ABCD with a smaller square EFGH drawn inside it by joining the mid-points of its sides. The diagonal EG of the small square is a side of the big square, so the big square is built on that diagonal and has twice the area of the small one.', 'The square $ABCD$ is built on the diagonal $EG$ of the square $EFGH$. Area of $ABCD$ is $16$, area of $EFGH$ is $8$.');

// Euclid's structure
const flowElem = flow('LR', [['u', 'Undefined terms and definitions'], ['a', 'Five axioms (common notions)'], ['p', 'Five postulates'], ['t', 'Theorems (propositions)']], [['u', 'a'], ['a', 'p'], ['p', 't']], 'Flow chart of the Elements: first the definitions of terms, then five common notions and five postulates that are accepted without proof, and from them the theorems, which are proved.', 'Euclid builds geometry from a few assumptions to many proved results.');

// Collinear points A B C D
const col = { A: [0, 0], B: [2, 0], C: [5, 0], D: [7, 0] };
must(dist(col.A, col.B) === dist(col.C, col.D) && dist(col.A, col.C) === dist(col.B, col.D) && dist(col.A, col.C) === 5, 'collinear points');
const fColl = fig({
  points: { A: { at: col.A, label_position: 'n' }, B: { at: col.B, label_position: 'n' }, C: { at: col.C, label_position: 'n' }, D: { at: col.D, label_position: 'n' } },
  segments: [{ from: 'A', to: 'B', ticks: 1 }, { from: 'B', to: 'C' }, { from: 'C', to: 'D', ticks: 1 }],
}, 'Four points A, B, C and D in order on a line, with AB and CD marked equal. Adding BC to each of the equal segments AB and CD gives AC equal to BD.', '$AB = CD$. Add $BC$ to both: $AC = BD$.');

// Postulates 1, 2, 3
const p123 = { A: [0, 0], B: [3, 0], E: [5.6, 0], C: polar([0, 0], 3, 62) };
must(close(dist(p123.A, p123.B), 3) && close(dist(p123.A, p123.C), 3), 'circle through B and C');
const fP123 = fig({
  points: { A: { at: p123.A, label_position: 'sw' }, B: { at: p123.B, label_position: 'se' }, E: { at: p123.E, label_position: 'se' }, C: { at: p123.C, label_position: 'n' } },
  segments: [{ from: 'A', to: 'B' }, { from: 'A', to: 'C' }, { from: 'B', to: 'E', dashed: true }],
  circles: [{ center: 'A', radius: 3, label: 'circle' }],
}, 'A circle with centre A. A segment AB is a radius, the segment AC joins A to another point C on the circle, and the dashed piece BE shows the segment AB being extended beyond B.', 'Postulate $1$: join $A$ to $C$. Postulate $2$: extend $AB$ to $E$. Postulate $3$: the circle with centre $A$ and radius $AB$.');

// Fifth postulate: interior angles 70 and 80 add up to 150 < 180, so the lines meet on the right
const aU = 70, aL = 80;
const U = [0, 4], L = [0, 0];
const dirU = [Math.cos(((-90 + aU) * Math.PI) / 180), Math.sin(((-90 + aU) * Math.PI) / 180)], dirL = [Math.cos(((90 - aL) * Math.PI) / 180), Math.sin(((90 - aL) * Math.PI) / 180)];
const Pm = lineInter(U, [U[0] + dirU[0], U[1] + dirU[1]], L, [L[0] + dirL[0], L[1] + dirL[1]]);
must(Pm && Pm[0] > 0 && close(angleAt(U, L, Pm), aU) && close(angleAt(L, U, Pm), aL) && aU + aL < 180, 'fifth postulate figure');
const fFifth = fig({
  points: { U: { at: U, label_position: 'nw' }, L: { at: L, label_position: 'sw' }, T: { at: [0, 5.2], label: 't', label_position: 'w' }, S: { at: [0, -1.2], label: false }, P: { at: Pm, label_position: 'ne' } },
  segments: [{ from: 'S', to: 'T' }, { from: 'U', to: 'P' }, { from: 'L', to: 'P' }],
  angles: [{ at: 'U', from: 'L', to: 'P', label: '70°' }, { at: 'L', from: 'U', to: 'P', label: '80°' }],
}, 'A line t crosses two other lines at U and L. On the right of t the two interior angles are 70 degrees and 80 degrees, which add up to 150 degrees, less than 180 degrees. The two lines lean towards each other and meet at the point P on the right.', 'Interior angles on one side: $70^\\circ + 80^\\circ = 150^\\circ < 180^\\circ$, so the lines meet at $P$ on that side.');

// Playfair: unique parallel through P
const pf = { A: [0, 0], B: [6, 0], P: [2.4, 2.6], M1: [-0.4, 2.6], M2: [6.4, 2.6], Q: [4.6, 0], X: [0.6, 5.2], Y: [5.6, -1.3] };
const toQ = [pf.Q[0] - pf.P[0], pf.Q[1] - pf.P[1]];
must(lineInter(pf.P, pf.Q, pf.A, pf.B) && close(lineInter(pf.P, pf.Q, pf.A, pf.B)[0], 4.6) && lineInter(pf.M1, pf.M2, pf.A, pf.B) === null && toQ[1] !== 0, 'Playfair figure');
const fPlay = fig({
  points: { A: { at: pf.A, label: false }, B: { at: pf.B, label: 'l', label_position: 'se' }, P: { at: pf.P, label_position: 'n' }, M1: { at: pf.M1, label: false }, M2: { at: pf.M2, label: 'm', label_position: 'ne' }, Q: { at: pf.Q, label_position: 's' } },
  segments: [{ from: 'A', to: 'B', arrows: 1 }, { from: 'M1', to: 'M2', arrows: 1 }, { from: 'P', to: 'Q', dashed: true }],
}, 'A horizontal line l and a point P above it. The horizontal line m through P is parallel to l and never meets it. The dashed slanted line through P cuts l at Q, so it is not parallel to l.', 'Through $P$ there is exactly one line $m$ parallel to $l$. Every other line through $P$, such as $PQ$, meets $l$.');

// Equilateral triangle on AB (circles of radius AB)
const eqA = [0, 0], eqB = [3, 0];
const [eqC, eqD] = circInter(eqA, 3, eqB, 3);
must(close(dist(eqA, eqC), 3) && close(dist(eqB, eqC), 3) && close(dist(eqA, eqB), 3) && close(eqC[0], 1.5) && close(eqC[1], 3 * Math.sqrt(3) / 2) && close(dist(eqA, eqD), 3) && close(dist(eqB, eqD), 3) && eqD[1] < 0, 'equilateral triangle');
const fEq = fig({
  points: { A: { at: eqA, label_position: 'w' }, B: { at: eqB, label_position: 'e' }, C: { at: eqC, label_position: 'n' } },
  segments: [{ from: 'A', to: 'B', ticks: 1 }, { from: 'A', to: 'C', ticks: 1 }, { from: 'B', to: 'C', ticks: 1 }],
  circles: [{ center: 'A', radius: 3 }, { center: 'B', radius: 3 }],
}, 'Two circles of the same radius AB, one with centre A and one with centre B. They cross at the point C above the line. The triangle ABC has all three sides marked equal.', 'Circles with centres $A$ and $B$ and radius $AB$ meet at $C$: $AC = AB = BC$.');
const fRh = fig({
  points: { A: { at: eqA, label_position: 'w' }, B: { at: eqB, label_position: 'e' }, C: { at: eqC, label_position: 'n' }, D: { at: eqD, label_position: 's' } },
  segments: [{ from: 'A', to: 'B', dashed: true }, { from: 'A', to: 'C', ticks: 1 }, { from: 'B', to: 'C', ticks: 1 }, { from: 'A', to: 'D', ticks: 1 }, { from: 'B', to: 'D', ticks: 1 }],
  polygons: [{ vertices: ['A', 'C', 'B', 'D'], fill: true, highlight: 'shade' }],
}, 'Two equilateral triangles ABC and ABD on opposite sides of the segment AB. The four sides AC, CB, BD and DA are all marked equal, so the figure ACBD has four equal sides.', 'Triangles $ABC$ and $ABD$ share $AB$. Then $AC = CB = BD = DA$.');

// Square on a segment (A at origin, AB = 3, B' = (-3, 0), X on the perpendicular bisector of BB')
const sA = [0, 0], sB = [3, 0], sB1 = [-3, 0];
const [sX] = circInter(sB, 5, sB1, 5);
const sD = [0, 3];
const [sC] = circInter(sB, 3, sD, 3);
must(close(sX[0], 0) && close(sX[1], 4) && close(dist(sB, sX), 5) && close(dist(sB1, sX), 5) && close(sC[0], 3) && close(sC[1], 3) && close(angleAt(sA, sB, sD), 90) && close(dist(sA, sB), dist(sB, sC)) && close(dist(sB, sC), dist(sC, sD)) && close(dist(sC, sD), dist(sD, sA)), 'square construction');
must([sA, sB, sC, sD].every((p, i, a) => close(dist(p, a[(i + 1) % 4]), 3)) && close(angleAt(sA, sB, sC), 45) && close(dist(sA, sC), 3 * Math.SQRT2), 'ABCD is a square');
const fSquare = fig({
  points: { A: { at: sA, label_position: 'sw' }, B: { at: sB, label_position: 'se' }, B1: { at: sB1, label: "B'", label_position: 'sw' }, X: { at: sX, label_position: 'n' }, D: { at: sD, label_position: 'nw' }, C: { at: sC, label_position: 'ne' } },
  segments: [{ from: 'B1', to: 'A' }, { from: 'A', to: 'B' }, { from: 'A', to: 'X' }, { from: 'B', to: 'X', dashed: true, ticks: 2 }, { from: 'B1', to: 'X', dashed: true, ticks: 2 }, { from: 'B', to: 'C', ticks: 1 }, { from: 'D', to: 'C', ticks: 1 }],
  circles: [{ center: 'A', radius: 3 }],
  angles: [{ at: 'A', from: 'B', to: 'D', right: true }],
  polygons: [{ vertices: ['A', 'B', 'C', 'D'], fill: true, highlight: 'shade' }],
}, 'Square ABCD built on the segment AB. The segment AB is extended to B dash on the other side of A with A B dash equal to AB. The points B and B dash are both the same distance from X, so AX is at right angles to AB. D is on AX with AD equal to AB, and C is where circles with centres B and D, both of radius AB, meet.', 'Square $ABCD$: $AX \\perp BB^{\\prime}$ gives the right angle at $A$, and the four sides are radii of equal circles.');

// ================================================================ tables, deck 1
const goalFlow1 = flow('LR', [['e', 'Egypt: rope-stretchers'], ['i', 'India: bricks and Sulba Sutras'], ['g', 'Greece: Euclid, definitions and axioms']], [['e', 'i'], ['i', 'g']], 'Flow of Part 1: geometry in Egypt, then in India with Harappan bricks and the Sulba Sutras, then in Greece with Euclid, his definitions and his axioms.', 'Part 1 road map.');
const tTime = table(['Place', 'Who or what', 'How geometry was used'], [
  ['Egypt', 'Rope-stretchers, farmers and builders', 'Marking field boundaries again after the Nile floods; laying out corners of buildings with knotted ropes'],
  ['India: Harappan cities', 'Brick makers and town planners', 'Bricks made in the ratio $4 : 2 : 1$; streets and buildings laid out in neat rectangles'],
  ['India: Sulba Sutras', 'Priests and builders, with Baudhayana as a famous author', 'Rope rules for building squares, rectangles and altars, including a rule equivalent to the Pythagorean theorem'],
  ['Greece', 'Thinkers such as Thales, then Euclid, about $300$ BCE', 'Proving geometric statements step by step from a few assumptions'],
], 'Table of three places. Egypt: rope-stretchers re-marked fields after the Nile floods. India: Harappan bricks in the ratio 4 to 2 to 1, and the Sulba Sutras with rope rules for altars. Greece: thinkers who proved results, and Euclid about 300 BCE.', 'Geometry grew from practical needs in many places.');
const tSulba = table(['Sulba Sutra idea', 'What it says (in simple words)', 'Example'], [
  ['Square on a diagonal', 'A square drawn on the diagonal of a square has twice its area', r`side $10$: new side $10\sqrt{2}$`],
  ['Rectangle and its diagonal', 'The rope along the diagonal makes an area equal to the two areas made by the sides together', r`$12$ by $5$: diagonal $13$`],
  ['Triples of numbers', 'Sets of three numbers that fit this rule were known and used', r`$3, 4, 5$ and $5, 12, 13$`],
], 'Table of Sulba Sutra ideas: a square on the diagonal has twice the area, with side 10 becoming 10 root 2; the rope along the diagonal of a rectangle gives the sum of the two side areas, so 12 by 5 has diagonal 13; and number triples such as 3, 4, 5 and 5, 12, 13.', 'Baudhayana, a Sulba Sutra author, states the rope rule for a rectangle.');
must(hyp(12, 5) === 13 && hyp(5, 12) === 13 && 12 * 12 + 5 * 5 === 13 * 13 && close(10 * Math.SQRT2, 14.1421356, 1e-6), 'Sulba table');
const tWE1 = table(['Task', 'Working', 'Result'], [
  ['Brick with thickness $6$ cm: length and breadth', r`$4 \times 6$ and $2 \times 6$`, `$${4 * 6}$ cm and $${2 * 6}$ cm`],
  ['Rectangular altar $12$ m by $5$ m: diagonal rope', r`$12^2 + 5^2 = 144 + 25 = 169$`, `$\\sqrt{169} = ${hyp(12, 5)}$ m`],
  ['Square altar of side $10$ m: side of a square of double area', r`area $100 \to 200$; side is the diagonal`, r`$10\sqrt{2} \approx 14.14$ m`],
], 'Table: a brick with thickness 6 centimetres has length 24 and breadth 12; a rectangular altar 12 metres by 5 metres has a diagonal rope of 13 metres; a square altar of side 10 metres needs a side of 10 root 2, about 14.14 metres, for double the area.', 'Ratios and the rope rule give lengths directly.');
must(brick(6).l === 24 && brick(6).b === 12 && 12 * 12 + 5 * 5 === 169 && close(10 * Math.SQRT2, 14.14, 0.005), 'WE1 values');
const root2 = 1 + 1 / 3 + 1 / (3 * 4) - 1 / (3 * 4 * 34);
must(close(root2, 577 / 408) && close(root2, Math.SQRT2, 3e-6) && root2 > Math.SQRT2 && close(17 / 12, 1.41666667, 1e-7), 'Baudhayana root 2');
const tApprox = table(['Step', 'Value so far'], [
  [r`$1$`, M(1)],
  [r`$1 + \dfrac{1}{3}$`, r`$\approx 1.3333$`],
  [r`$1 + \dfrac{1}{3} + \dfrac{1}{3 \times 4}$`, r`$\approx 1.4167$`],
  [r`$1 + \dfrac{1}{3} + \dfrac{1}{3 \times 4} - \dfrac{1}{3 \times 4 \times 34}$`, r`$\approx 1.414216$`],
  [r`$\sqrt{2}$ (calculator)`, r`$\approx 1.414214$`],
], 'Table of the Sulba Sutra rule for the square root of 2: starting from 1, add one third, add one twelfth, then take away one four hundred eighth. The value is about 1.414216, very close to the calculator value 1.414214.', 'A Sulba rule for $\\sqrt{2}$ is correct to five decimal places.');
const sqr = 3 + (3 * Math.SQRT2 - 3) / 3;
must(close(sqr, 3.41421356, 1e-6) && close(Math.PI * sqr * sqr, 36.62, 0.01) && Math.PI * sqr * sqr > 36, 'square to circle');
const sumFlow1 = flow('LR', [['a', 'Practical needs'], ['b', 'Ratios and rope rules'], ['c', 'Euclid: proof from assumptions']], [['a', 'b'], ['b', 'c']], 'Summary flow of Part 1: practical needs led to ratios and rope rules in Egypt and India, and then to Euclid, who proved results from a few assumptions.', 'From practice to proof.');
const tDefs = table(['Term', 'Euclid tried to say', 'Our reading'], [
  ['Point', 'It has no part', 'It marks a position and has no size'],
  ['Line', 'Length without breadth', 'It has length but no width'],
  ['Ends of a line', 'The ends are points', 'A segment has two end points'],
  ['Surface', 'It has only length and breadth', 'A flat sheet has two measures'],
  ['Edges of a surface', 'The edges are lines', 'The boundary of a sheet is made of lines'],
], 'Table of Euclid definitions in simple words: a point has no part, a line has length without breadth, the ends of a line are points, a surface has only length and breadth, and the edges of a surface are lines.', 'Today point, line and plane are left undefined; Euclid tried to define them.');
const tNotions = table(['No.', 'Common notion (axiom)', 'Example'], [
  ['1', NOTIONS[1], r`$x = 7$ and $y = 7$, so $x = y$`],
  ['2', NOTIONS[2], r`$AB = CD$, so $AB + BC = CD + BC$`],
  ['3', NOTIONS[3], r`$AC = BD$, so $AC - BC = BD - BC$`],
  ['4', NOTIONS[4], 'Two segments that fit exactly on each other are equal'],
  ['5', NOTIONS[5], r`A whole segment $AB$ is longer than its part $AC$`],
], 'Table of five common notions: things equal to the same thing are equal to each other; equals added to equals give equals; equals taken from equals give equals; things that coincide are equal; the whole is greater than the part. Each has a short example.', 'These are general truths, used in all of mathematics.');
const tWE2 = table(['Step', 'Statement', 'Reason'], [
  ['1', r`$AB = CD = 2$ and $BC = 3$`, 'Given'],
  ['2', r`$AB + BC = CD + BC$`, 'Equals added to equals (common notion 2)'],
  ['3', r`$AC = BD$ (both equal $5$)`, 'The whole $AC$ is $AB + BC$ and $BD$ is $BC + CD$'],
], 'Table: with AB and CD both equal to 2 and BC equal to 3, add BC to both equal segments by the second common notion. Then AC equals AB plus BC, which is 5, and BD equals BC plus CD, which is also 5.', 'Add the same segment to equal segments.');
must(dist(col.A, col.B) + dist(col.B, col.C) === dist(col.A, col.C) && dist(col.B, col.C) + dist(col.C, col.D) === dist(col.B, col.D) && 2 + 3 === 5, 'WE2 values');

// ================================================================ deck 1
const d1 = deck({
  part: 1,
  title: 'Introduction to Euclid\'s Geometry: Part 1, origins, definitions and axioms',
  goals: ['Describe how geometry grew in Egypt, India and Greece', 'Explain the Sulba Sutra rope rules and the Harappan brick ratio at a simple level', 'State what Euclid\'s Elements is and how it is built', 'Recall Euclid\'s definitions and five common notions (axioms) and use them in simple proofs'],
  slides: [
    sl('title', 'Where geometry began', { b: 'The word geometry means measuring the earth. Farmers, builders and priests needed it long before anyone wrote proofs.', v: tTime, n: `The word geometry means measuring the earth. In Egypt, India and Greece people needed geometry to mark fields after floods, to make bricks and altars, and later to build a whole science of proofs. In this chapter we visit all three places, and then we read the rules that Euclid chose as the foundation of geometry.` }),
    sl('concept', 'What you will be able to do', { ul: ['Tell the story of geometry in **Egypt**, **India** and **Greece**', 'Explain the **Sulba Sutra** rope rules and the **brick ratio**', 'Describe **Euclid\'s Elements**', 'Use Euclid\'s **axioms** in simple proofs'], v: goalFlow1, n: `In this part we first look at the practical geometry of Egypt and India. Then we move to Greece and to Euclid's Elements. We read his definitions and his five axioms, and we use the axioms in a small proof. In the next part we study his five postulates and make two constructions.` }),
    sl('diagram', 'Egypt: the rope-stretchers', { b: r`After each flood of the Nile, boundaries of fields had to be marked again. Rope-stretchers are said to have used a rope with knots at equal spaces. A loop of $12$ spaces makes a triangle with sides $3$, $4$, $5$, and the corner between the $3$ and the $4$ is a right angle.`, v: fRope, n: `After each flood of the river Nile, field boundaries had to be marked again. Rope-stretchers are said to have used a rope with knots at equal spaces. A loop of twelve spaces can be pulled into a triangle with sides three, four and five. The corner between the sides three and four is a right angle, so the builders could mark square corners.` }),
    sl('diagram', 'India: bricks of the Harappan cities', { b: r`Bricks found at Harappan sites are often in the ratio length : breadth : thickness $= 4 : 2 : 1$. With thickness $t$, the brick is $4t$ long and $2t$ wide. Equal bricks stack neatly in walls.`, v: fBrick, n: `In the Harappan cities of the Indus valley, many bricks were made in the ratio four to two to one for length, breadth and thickness. If the thickness is t, the length is four t and the breadth is two t. Bricks of one fixed shape fit together neatly in walls, drains and platforms.` }),
    sl('check', 'Quick check: a brick', { b: 'A brick with length, breadth and thickness in the ratio four to two to one is thirty-six centimetres long. What is its thickness?', v: fBrick, chk: 'm01', n: `The length is four parts. Find one part.` }),
    sl('diagram', 'India: the Sulba Sutras', { b: 'The **Sulba Sutras** are ancient Indian texts with rules for building altars. _Sulba_ means a cord or rope. Baudhayana is one well-known author. The rules use ropes to make squares, rectangles and circles.', v: tSulba, n: `The Sulba Sutras are ancient Indian texts with rules for building altars. The word sulba means a cord. Builders used ropes and pegs to draw squares, rectangles and circles on the ground. One well-known author is Baudhayana. His rules include a statement equivalent to the Pythagorean theorem for a rectangle and its diagonal.` }),
    sl('diagram', 'A square on the diagonal', { b: r`A square built on the diagonal of a square has **twice** its area. In the figure the big square has area $16$ and the small one $8$. If the side of an altar is $10$ m, a double-area altar has side $10\sqrt{2}$ m.`, v: fDiag, m: [r`\text{area on the diagonal} = 2 \times \text{area of the square}`], n: `Here is a picture of the rule. Join the mid-points of the sides of the big square to get a smaller square. The diagonal of the small square is a side of the big square. So the big square is built on that diagonal, and its area is twice the small one. Sixteen is twice eight. Altar builders used this to double the area of an altar.` }),
    sl('example', 'Worked example 1: ratios and ropes', { b: 'Use the brick ratio and the rope rule to find these lengths.', ul: [r`**Brick —** thickness $6$ cm gives length $24$ cm and breadth $12$ cm`, r`**Altar diagonal —** a $12$ m by $5$ m rectangle: $12^2 + 5^2 = 169$, so the rope is $13$ m`, r`**Double area —** a square of side $10$ m has area $100$ square metres; a square of area $200$ has side $10\sqrt{2} \approx 14.14$ m`], v: tWE1, n: `For the brick, multiply the thickness six by four for the length and by two for the breadth. For the rectangular altar, add the squares of the two sides, which gives one hundred sixty-nine. The rope along the diagonal is thirteen metres. For double the area, the new side is the diagonal of the old square, about fourteen point one four metres.` }),
    sl('concept', 'Approximations in the Sulba Sutras', { b: r`A Sulba rule for $\sqrt{2}$ is $1 + \dfrac{1}{3} + \dfrac{1}{3 \times 4} - \dfrac{1}{3 \times 4 \times 34}$, which gives $\dfrac{577}{408} \approx 1.414216$. It differs from the true value by less than $0.000003$. There are also rope rules to turn a square into a circle of nearly equal area.`, v: tApprox, n: `The Sulba Sutras also give clever approximations. One rule for the square root of two starts with one, adds one third, adds one twelfth, and then takes away one part in four hundred eight. The result is very close to the calculator value. Other rules use ropes to turn a square into a circle of nearly the same area.` }),
    sl('check', 'Quick check: what is a Sulba Sutra?', { b: 'The Sulba Sutras are best described as ancient Indian texts that give', v: tSulba, chk: 'm02', n: `Think about what the word sulba means.` }),
    sl('diagram', 'Greece: Euclid\'s Elements', { b: 'Greek thinkers wanted to **prove** statements, not only measure. Euclid, in about $300$ BCE, collected the geometry of his time in a book of $13$ chapters called the **Elements**. It starts from a few assumptions and proves everything else from them.', v: flowElem, n: `Greek thinkers wanted to prove that a statement is true, not only to measure. About three hundred years before the common era, Euclid wrote the Elements, a book of thirteen chapters. He began with definitions, then listed a few statements to be accepted without proof, and from these he proved many theorems step by step. This method is still the model for mathematics.` }),
    sl('concept', 'Euclid\'s definitions', { b: 'Euclid began by defining terms. Some of his definitions use words that need defining themselves, so today we leave **point**, **line** and **plane** as **undefined terms** and build the rest from them.', v: tDefs, n: `Euclid began with definitions. A point has no part. A line has length without breadth. The ends of a line are points. But words like part and breadth also need explaining, and this could go on for ever. So today we leave point, line and plane as undefined terms and define everything else using them.` }),
    sl('concept', 'Axioms: the common notions', { b: 'Euclid used five **common notions**, which we call **axioms**: general truths about equal things and wholes, true in all of mathematics. Some versions of the Elements list a few more.', v: tNotions, n: `Euclid listed five common notions, which we call axioms. Things equal to the same thing are equal to one another. Equals added to equals give equals. Equals taken from equals give equals. Things that coincide are equal. And the whole is greater than the part. They are general truths, and they are used in every part of mathematics.` }),
    sl('example', 'Worked example 2: using a common notion', { b: r`Points $A$, $B$, $C$, $D$ lie in order on a line, with $AB = CD$. Show that $AC = BD$. Take $AB = CD = 2$ and $BC = 3$ to check.`, ul: [r`**Given —** $AB = CD$`, r`**Add $BC$ to both —** $AB + BC = CD + BC$ (equals added to equals)`, r`**Conclude —** $AC = BD$; in numbers $5 = 5$`], v: fColl, n: `Four points A, B, C and D lie in order on a line, and the segments A B and C D are equal. We add the segment B C to both of them. By the second common notion, equals added to equals give equals. The whole A C is A B plus B C, and the whole B D is B C plus C D. So A C equals B D.` }),
    sl('check', 'Quick check: which axiom?', { b: 'If x equals y and y equals z, which common notion shows that x equals z?', v: tNotions, chk: 'm03', n: `Look for the one about things equal to the same thing.` }),
    sl('summary', 'Summary', { ul: ['Geometry grew from **practical needs**: Egypt (rope-stretchers), India (Harappan bricks $4 : 2 : 1$, Sulba Sutras), Greece (proof)', 'Sulba Sutras: rope rules, the diagonal rule for a rectangle, double-area squares, approximations', 'Euclid\'s **Elements** (about $300$ BCE): $13$ chapters, built from assumptions', 'Euclid\'s **five common notions** (axioms) are general truths about equal things'], v: sumFlow1, n: `To sum up. Geometry began with practical needs in Egypt and India: rope-stretchers, Harappan bricks and the Sulba Sutra rope rules. In Greece, Euclid built geometry from a few assumptions in the Elements. He gave definitions and five common notions, which we call axioms. In the next part we meet his five postulates.` }),
    sl('exam-tips', 'Exam tips: how marks are awarded', { ul: ['**History questions (1–2 marks):** name the place, the people and the idea', '**Axiom questions (1–2 marks):** quote the common notion that is used', '**Proofs (2–3 marks):** state the given, then give a reason for each step', '**Mistake:** calling a common notion a postulate', '**Mistake:** giving exact dates for old texts when the question does not ask'], n: `In history questions, name the place, the people and the idea. In axiom questions, quote the common notion you use. In a short proof, state what is given and write a reason for every step. Two common slips: calling a common notion a postulate, and giving exact dates for old texts that nobody knows exactly.` }),
  ],
});

// ================================================================ tables, deck 2
const goalFlow2 = flow('LR', [['p', 'Postulates 1 to 5'], ['s', 'Why the fifth is special'], ['w', 'Axiom, postulate, theorem'], ['c', 'Constructions']], [['p', 's'], ['s', 'w'], ['w', 'c']], 'Flow of Part 2: the five postulates, why the fifth is special, the difference between definition, axiom, postulate and theorem, and two constructions justified by postulates.', 'Part 2 road map.');
const tPost = table(['No.', 'Postulate (in simple words)', 'Use in a figure'], [
  ['1', POSTULATES[1], 'Join two points with a ruler'],
  ['2', POSTULATES[2], 'Extend a segment'],
  ['3', POSTULATES[3], 'Draw a circle with the compass'],
  ['4', POSTULATES[4], 'Compare right angles anywhere'],
  ['5', POSTULATES[5], 'Tells us when lines meet'],
], 'Table of Euclid five postulates in simple words: a line can be drawn between any two points; a segment can be extended; a circle can be drawn with any centre and radius; all right angles are equal; and the fifth, about interior angles adding to less than two right angles, tells us when two lines meet.', 'Postulates are assumptions about geometric figures.');
const tSpecial = table(['Postulates 1 to 4', 'Postulate 5'], [
  ['Short, simple, easy to accept', 'Long and complicated'],
  ['Describe drawings and angles', 'Describes when two lines meet'],
  ['Used from the first proposition', 'Euclid avoided it until his $29$th proposition'],
  ['No one tried to remove them', 'Many mathematicians tried to prove it from the other four'],
  ['', r`Equivalent form: Playfair's axiom`],
], 'Table comparing postulates 1 to 4 with postulate 5. The first four are short and simple. The fifth is long, was avoided by Euclid until his 29th proposition, and many mathematicians tried to prove it from the others. An equivalent form is Playfair axiom.', 'The fifth postulate looks more like a theorem than a postulate.');
const tWords = table(['Word', 'Meaning', 'Example'], [
  ['Definition', 'Tells what a word means', 'A circle is the set of all points at one distance from a point'],
  ['Axiom', 'A general assumption about equals and wholes, used in all of mathematics', 'The whole is greater than the part'],
  ['Postulate', 'An assumption about geometric figures', 'A circle can be drawn with any centre and radius'],
  ['Theorem', 'A statement that is **proved** from earlier statements', 'Euclid\'s Proposition $1$ about the equilateral triangle'],
], 'Table of four words: a definition tells what a word means; an axiom is a general assumption used in all mathematics; a postulate is an assumption about geometry; a theorem is a statement that is proved. Each has an example.', 'Today the words axiom and postulate are often used for the same thing.');
const sortRows = [
  ['A point has no part', 'Definition'],
  ['Things equal to the same thing are equal to one another', 'Axiom'],
  ['A line segment can be extended as far as we like', 'Postulate'],
  ['An equilateral triangle can be drawn on any given segment', 'Theorem'],
];
const tSort = table(['Statement', 'Type', 'Reason'], [
  [sortRows[0][0], sortRows[0][1], 'It explains the meaning of a word'],
  [sortRows[1][0], sortRows[1][1], 'General truth about equal things'],
  [sortRows[2][0], sortRows[2][1], 'It is about figures, and it is assumed'],
  [sortRows[3][0], sortRows[3][1], 'It is proved from postulates and axioms'],
], 'Table sorting four statements: a point has no part is a definition; things equal to the same thing are equal is an axiom; a segment can be extended is a postulate; an equilateral triangle can be drawn on any segment is a theorem, because it is proved.', 'Ask: is it explaining a word, assumed, or proved?');
const tEqSteps = table(['Step', 'What we do', 'Reason'], [
  ['1', 'Draw the circle with centre $A$ and radius $AB$', 'Postulate $3$'],
  ['2', 'Draw the circle with centre $B$ and radius $AB$', 'Postulate $3$'],
  ['3', 'Call a point where the circles cross $C$', 'The circles meet (read from the figure)'],
  ['4', 'Join $AC$ and $BC$', 'Postulate $1$'],
  ['5', r`$AC = AB$ and $BC = AB$`, 'Radii of the same circle are equal (definition of a circle)'],
  ['6', r`$AC = BC = AB$`, 'Things equal to the same thing are equal (common notion $1$)'],
], 'Table of the six steps in Euclid first construction: draw a circle at A with radius AB by postulate 3, draw a circle at B with radius AB by postulate 3, mark a crossing point C, join AC and BC by postulate 1, note AC and BC both equal AB because they are radii, and conclude AC, BC and AB are equal by common notion 1.', 'Each step of the construction has a reason.');
const sqStepRows = [
  ['1', 'Extend $BA$ beyond $A$ and mark $B^{\\prime}$ with $AB^{\\prime} = AB$', 'Postulates $2$ and $3$'],
  ['2', 'With centres $B$ and $B^{\\prime}$ and one radius (more than $AB$), draw two circles meeting at $X$', 'Postulate $3$'],
  ['3', 'Join $AX$', 'Postulate $1$; $XB = XB^{\\prime}$, so $AX$ is at right angles to $BB^{\\prime}$'],
  ['4', 'On $AX$ mark $D$ with $AD = AB$', 'Postulates $1$ and $3$'],
  ['5', 'Circles with centres $B$ and $D$ and radius $AB$ meet again at $C$; join $BC$ and $DC$', 'Postulates $3$ and $1$'],
  ['6', r`$AB = BC = CD = DA$ and $\angle A = 90^\circ$`, 'Radii of equal circles; common notion $1$'],
];
const tSqSteps = table(['Step', 'What we do', 'Reason'], sqStepRows, 'Table of the six steps for a square on a segment AB: extend BA to B dash, draw two circles to find X, join AX which is at right angles to BB dash, mark D on AX with AD equal to AB, find C from two circles of radius AB and join BC and DC. Each step is justified by postulates 1, 2 and 3 and by common notion 1.', 'A square has four equal sides and a right angle.');
must(sqStepRows.length === 6, 'square steps');
const tWE3 = table(['Task', 'Working', 'Result'], [
  [r`Equilateral triangle on a segment of $7.5$ cm: perimeter`, r`$3 \times 7.5$`, M(3 * 7.5) + ' cm'],
  [r`Square on a segment of $6$ cm: area`, r`$6^2$`, M(36) + ' square cm'],
  [r`Same square: the diagonal $AC$`, r`$\sqrt{6^2 + 6^2} = 6\sqrt{2}$`, r`$\approx 8.49$ cm`],
  [r`Rhombus $ACBD$ from two triangles on $AB = 4$: perimeter`, r`$4 \times 4$`, M(16) + ' cm'],
], 'Table: an equilateral triangle on a 7.5 centimetre segment has perimeter 22.5; a square on a 6 centimetre segment has area 36 square centimetres and diagonal 6 root 2, about 8.49 centimetres; a rhombus from two equilateral triangles on a segment of 4 has perimeter 16.', 'The constructions give equal sides, so lengths follow at once.');
must(3 * 7.5 === 22.5 && close(6 * Math.SQRT2, 8.485, 0.005) && 4 * 4 === 16, 'WE3 values');
const sumFlow2 = flow('LR', [['a', 'Postulates 1 to 3: drawing'], ['b', 'Postulates 4 and 5: angles'], ['c', 'Constructions with reasons']], [['a', 'b'], ['b', 'c']], 'Summary flow of Part 2: postulates 1 to 3 for drawing, postulates 4 and 5 about angles, and constructions with a reason for every step.', 'The tools of Part 2.');

// ================================================================ deck 2
const d2 = deck({
  part: 2,
  title: 'Introduction to Euclid\'s Geometry: Part 2, postulates and constructions',
  goals: ['State Euclid\'s five postulates and explain why the fifth is special', 'State Playfair\'s axiom', 'Distinguish definitions, axioms, postulates and theorems', 'Construct an equilateral triangle and a square on a segment and justify each step by a postulate'],
  slides: [
    sl('title', 'Euclid\'s five postulates', { b: 'A **postulate** is an assumption about geometric figures. Euclid used five. Four are about drawing and angles, and the fifth is about when lines meet.', v: tPost, n: `Euclid listed five postulates. These are assumptions about geometric figures that we accept without proof. The first three tell us what we may draw: a line between two points, an extended segment and a circle. The fourth is about right angles, and the fifth tells us when two lines will meet.` }),
    sl('concept', 'What you will be able to do', { ul: ['State all **five postulates**', 'Say why the **fifth** is special, and state **Playfair\'s axiom**', 'Tell a **definition**, **axiom**, **postulate** and **theorem** apart', 'Give a postulate as the **reason** for each construction step'], v: goalFlow2, n: `In this part we state the five postulates and ask why the fifth is special. We learn to tell a definition, an axiom, a postulate and a theorem apart. Finally we do two constructions, an equilateral triangle and a square, and give a reason from the postulates for every step.` }),
    sl('diagram', 'Postulates 1, 2 and 3: what we may draw', { b: r`**Postulate 1:** join any two points by a line. **Postulate 2:** extend a segment as far as we like. **Postulate 3:** draw a circle with any centre and any radius. In the figure the circle has centre $A$ and radius $AB$.`, v: fP123, n: `The first three postulates describe what the ruler and compass can do. Postulate one lets us join any two points, like A and C. Postulate two lets us extend a segment as far as we like, like extending A B to E. Postulate three lets us draw a circle with any centre and any radius, like the circle with centre A and radius A B.` }),
    sl('diagram', 'The fifth postulate in a picture', { b: r`Postulate 4: all right angles are equal. **Postulate 5:** if a line meets two lines so that the interior angles on one side add up to **less than** $180^\circ$ (two right angles), the two lines meet on that side. Here $70^\circ + 80^\circ = 150^\circ$, so they meet at $P$.`, v: fFifth, n: `The fourth postulate says that all right angles are equal. Now the fifth. A line crosses two other lines, and on the right the interior angles are seventy degrees and eighty degrees. Together they make one hundred fifty degrees, which is less than one hundred eighty. The postulate says the two lines lean towards each other and meet on that side.` }),
    sl('concept', 'Why is the fifth postulate special?', { b: 'It is **long and complicated**, unlike the other four. Euclid avoided using it until his $29$th proposition. For about two thousand years mathematicians tried to prove it from the other four, and could not. Later it was shown that it cannot be proved that way, and geometries exist in which it does not hold.', v: tSpecial, n: `The fifth postulate is long and complicated, unlike the other four. Euclid used it as late as his twenty-ninth proposition. For about two thousand years mathematicians tried to prove it from the other postulates, and failed. Later it was understood that it cannot be proved from them, and that other geometries exist in which it is not true.` }),
    sl('check', 'Quick check: which postulate?', { b: 'Euclid draws a circle with centre $A$ and radius $AB$. Which postulate allows this?', v: fP123, chk: 'm04', n: `Think about which postulate is about circles.` }),
    sl('diagram', 'Playfair\'s axiom', { b: r`**Playfair's axiom:** for every line $l$ and every point $P$ not on $l$, there is **exactly one** line through $P$ parallel to $l$. It is equivalent to Euclid's fifth postulate, so many books use it instead.`, v: fPlay, m: [r`\text{through } P \notin l \text{: exactly one line parallel to } l`], n: `A simpler way to say the fifth postulate was given by the Scottish mathematician John Playfair. For every line and every point not on it, there is exactly one line through the point that is parallel to the given line. Every other line through the point must cut the given line. This is equivalent to the fifth postulate, so books often use it instead.` }),
    sl('concept', 'Definition, axiom, postulate, theorem', { b: 'A **definition** explains a word. An **axiom** and a **postulate** are assumed without proof; Euclid used axiom for general truths and postulate for geometry. A **theorem** is **proved**.', v: tWords, n: `A definition tells us what a word means. An axiom is a general truth that we assume, like the whole is greater than the part. A postulate is an assumption about geometry, like drawing a circle with any centre and radius. A theorem is different: it is proved from definitions, axioms, postulates and earlier theorems.` }),
    sl('example', 'Worked example 1: sort the statements', { b: 'Decide whether each statement is a definition, an axiom, a postulate or a theorem.', ul: ['**A point has no part —** a definition, it explains a word', '**Things equal to the same thing are equal —** an axiom, a general truth', '**A segment can be extended as far as we like —** a postulate, about figures', '**An equilateral triangle can be drawn on any segment —** a theorem, it is proved'], v: tSort, n: `Ask one question for each statement: is it explaining a word, is it assumed, or is it proved? A point has no part explains a word, so it is a definition. Things equal to the same thing are equal is a general assumption, an axiom. Extending a segment is a postulate. The last one is proved from the postulates, so it is a theorem.` }),
    sl('check', 'Quick check: parallel lines', { b: 'Through a point not on a line, how many lines parallel to the line can be drawn?', v: fPlay, chk: 'm05', n: `Recall Playfair's axiom.` }),
    sl('diagram', 'Euclid\'s first construction', { b: r`**Task:** draw an equilateral triangle on a given segment $AB$. Draw circles with centres $A$ and $B$, both of radius $AB$. They meet at $C$. Join $AC$ and $BC$.`, v: fEq, n: `Euclid's first proposition is to draw an equilateral triangle on a given segment A B. Draw a circle with centre A and radius A B. Draw another circle with centre B and the same radius. The circles cross at a point C. Join C to A and to B. We now show that the triangle A B C has three equal sides.` }),
    sl('concept', 'Why it works: a reason for every step', { b: r`Each step uses a postulate or a fact. Radii of one circle are equal, so $AC = AB$ and $BC = AB$. By common notion $1$, $AC = BC = AB$.`, v: tEqSteps, n: `Every step has a reason. The two circles come from postulate three. The joins A C and B C come from postulate one. A C is a radius of the first circle, so it equals A B. B C is a radius of the second circle, so it also equals A B. Things equal to the same thing are equal, so all three sides are equal.` }),
    sl('example', 'Worked example 2: two triangles make a rhombus', { b: r`Draw equilateral triangles $ABC$ and $ABD$ on opposite sides of $AB$. Show that $AC = CB = BD = DA$.`, ul: [r`**Circles —** the same two circles meet at $C$ above $AB$ and at $D$ below it`, r`**Radii —** $AC = AB = BC$ and $AD = AB = BD$`, r`**Common notion 1 —** all four sides equal $AB$, so $ACBD$ has four equal sides`], v: fRh, n: `The same two circles cross at two points, one above A B and one below. Call them C and D. The triangle A B C is equilateral, and so is the triangle A B D, because all their sides are radii of the two equal circles. So the four sides A C, C B, B D and D A are all equal to A B, and the figure A C B D has four equal sides.` }),
    sl('diagram', 'A square on a segment', { b: r`To build a square on $AB$ we need four equal sides and a right angle. Mark $B^{\prime}$ on the other side of $A$ with $AB^{\prime} = AB$. Circles about $B$ and $B^{\prime}$ meet at $X$, and $AX$ is at right angles to $BB^{\prime}$.`, v: fSquare, n: `To build a square on A B we need four equal sides and one right angle. Extend B A beyond A to a point B dash so that A B dash equals A B. Draw circles of one radius about B and B dash. They meet at X, which is the same distance from B and B dash. So A X is at right angles to the line. Mark D on A X with A D equal to A B.` }),
    sl('concept', 'Reasons for the square', { b: r`Every step again uses Postulates $1$, $2$ and $3$. Four equal sides and one right angle give a square. The other three angles follow from parallel lines, which we study in the next chapter.`, v: tSqSteps, n: `Here are the steps with their reasons. The extension of B A is postulate two, and the circles are postulate three. The joins are postulate one. The four sides are equal because they are radii of equal circles, and one angle is a right angle. A four-sided figure with four equal sides and a right angle is a square. We prove the other angles are right angles later.` }),
    sl('check', 'Quick check: a reason', { b: 'In the construction of the equilateral triangle, why is $AC$ equal to $AB$?', v: tEqSteps, chk: 'm06', n: `Where does the segment A C lie, with respect to the circle with centre A?` }),
    sl('example', 'Worked example 3: lengths from the constructions', { b: 'Use the equal sides to find lengths.', ul: [r`**Equilateral triangle on $7.5$ cm —** perimeter $3 \times 7.5 = 22.5$ cm`, r`**Square on $6$ cm —** area $36$ square cm, diagonal $6\sqrt{2} \approx 8.49$ cm`, r`**Rhombus from two triangles on $4$ cm —** perimeter $16$ cm`], v: tWE3, n: `Once the sides are known to be equal, lengths follow quickly. An equilateral triangle on a segment of seven point five centimetres has perimeter twenty-two point five. A square on a segment of six centimetres has area thirty-six, and its diagonal is six root two, about eight point four nine. Two triangles on a segment of four give a rhombus of perimeter sixteen.` }),
    sl('summary', 'Summary', { ul: [r`**Postulates 1–3:** join two points, extend a segment, draw a circle`, r`**Postulate 4:** all right angles are equal; **Postulate 5:** interior angles less than $180^\circ$ means the lines meet on that side`, 'Playfair\'s axiom: exactly one parallel through a point; equivalent to the fifth postulate', 'Definition, axiom, postulate, theorem: explained, assumed (general), assumed (geometry), proved', 'Constructions: give a postulate or axiom as the reason for each step'], v: sumFlow2, n: `To sum up. The first three postulates let us draw lines, extend segments and draw circles. The fourth says all right angles are equal. The fifth tells us when two lines meet, and Playfair's axiom says the same thing in another way. A theorem is proved, while axioms and postulates are assumed. In a construction, always give a reason for each step.` }),
    sl('exam-tips', 'Exam tips: how marks are awarded', { ul: ['**State the postulates (1–2 marks):** give the idea, not only the number', '**Constructions (3–5 marks):** list the steps and a reason for each', '**Fifth postulate (2 marks):** add the interior angles and compare with $180^\\circ$', '**Mistake:** mixing up axiom and theorem', '**Mistake:** saying that the construction works without a reason'], n: `When you state a postulate, give the idea and not only the number. In a construction, list every step and write a reason beside it. For the fifth postulate, add the interior angles and compare with one hundred eighty degrees. Two common slips: mixing up an axiom and a theorem, and saying that a construction works without giving any reason.` }),
  ],
});

// ================================================================ notes
const notes = {
  unit: 'cbse-9-mathematics-ch07', version: 1, title: 'Introduction to Euclid\'s Geometry: chapter notes', language: 'en',
  sections: [
    { heading: '1. Geometry in Egypt', body_md: r`Geometry means measuring the earth. After the Nile floods, field boundaries had to be marked again. Rope-stretchers are said to have used a rope with knots at equal spaces: a loop of $12$ spaces gives a triangle with sides $3$, $4$, $5$ and a right angle.`, key_terms: [{ term: 'Rope-stretcher', definition_md: 'A surveyor who used knotted ropes to mark lines and right angles.' }], formulas: [{ latex: r`3^2 + 4^2 = 5^2`, label: 'Rope triangle' }], visual: fRope, visuals: [tTime], topic_ids: [topic(1)] },
    { heading: '2. Geometry in India', body_md: r`**Harappan bricks** are often in the ratio length : breadth : thickness $= 4 : 2 : 1$.\n\nThe **Sulba Sutras** (sulba means cord) give rope rules for building altars. Baudhayana is a well-known author. One rule says that the rope along the diagonal of a rectangle makes an area equal to the sum of the areas made by the two sides, which is the Pythagorean theorem in words. A square on the diagonal of a square has twice its area. The Sulba Sutras also give approximations such as $\sqrt{2} \approx \dfrac{577}{408}$.`, key_terms: [{ term: 'Sulba Sutras', definition_md: 'Ancient Indian texts with rope rules for building altars and shapes.' }, { term: 'Harappan brick ratio', definition_md: 'Length : breadth : thickness $= 4 : 2 : 1$.' }], formulas: [{ latex: r`\text{diagonal}^2 = \text{length}^2 + \text{breadth}^2`, label: 'Rope rule for a rectangle' }], visual: fBrick, visuals: [fDiag, tSulba, tApprox], topic_ids: [topic(1)] },
    { heading: '3. Euclid and the Elements', body_md: r`Euclid, in about $300$ BCE, wrote the **Elements** in $13$ chapters. It starts from definitions, axioms and postulates, and proves theorems from them. This way of building a subject is called an **axiomatic system**.\n\nToday **point**, **line** and **plane** are undefined terms.`, key_terms: [{ term: 'Elements', definition_md: 'Euclid\'s book that builds geometry from definitions, axioms and postulates.' }, { term: 'Undefined term', definition_md: 'A basic word, such as point, line or plane, that is not defined using other words.' }], formulas: [], visual: flowElem, visuals: [tDefs], topic_ids: [topic(1), topic(2)] },
    { heading: '4. Axioms and postulates', body_md: r`**Euclid's five common notions (axioms):** (1) things equal to the same thing are equal to one another; (2) equals added to equals are equal; (3) equals taken from equals are equal; (4) things that coincide are equal; (5) the whole is greater than the part.\n\n**Euclid's five postulates:** (1) a line can be drawn between any two points; (2) a segment can be extended; (3) a circle can be drawn with any centre and radius; (4) all right angles are equal; (5) if the interior angles on one side of a transversal add up to less than $180^\circ$, the two lines meet on that side.\n\nA **definition** explains a word. A **theorem** is proved from these.`, key_terms: [{ term: 'Axiom', definition_md: 'A general assumption accepted without proof, such as the whole is greater than the part.' }, { term: 'Postulate', definition_md: 'An assumption about geometric figures, accepted without proof.' }, { term: 'Theorem', definition_md: 'A statement proved from definitions, axioms, postulates and earlier theorems.' }], formulas: [], visual: tNotions, visuals: [tPost, tWords, tSort, fColl], topic_ids: [topic(2)] },
    { heading: '5. The fifth postulate and Playfair\'s axiom', body_md: r`The fifth postulate is long, and Euclid avoided it until his $29$th proposition. Many tried to prove it from the other four and could not.\n\n**Playfair's axiom:** through a point not on a line there is exactly one line parallel to the line. It is equivalent to the fifth postulate. Check: interior angles $70^\circ$ and $80^\circ$ add to $150^\circ < 180^\circ$, so the lines meet on that side.`, key_terms: [{ term: 'Playfair\'s axiom', definition_md: 'Through a point not on a line, exactly one line can be drawn parallel to the line.' }], formulas: [{ latex: r`\text{interior angles} < 180^\circ \Rightarrow \text{the lines meet on that side}`, label: 'Fifth postulate' }], visual: fFifth, visuals: [tSpecial, fPlay], topic_ids: [topic(2)] },
    { heading: '6. Constructions justified by postulates', body_md: r`**Equilateral triangle on $AB$ (Euclid's Proposition 1):** circles with centres $A$ and $B$ and radius $AB$ meet at $C$. Join $AC$ and $BC$. $AC = AB$ and $BC = AB$ (radii), so $AC = BC = AB$ (common notion $1$).\n\n**Square on $AB$:** extend $BA$ to $B^{\prime}$ with $AB^{\prime} = AB$, find $X$ equally far from $B$ and $B^{\prime}$, join $AX$, mark $D$ on $AX$ with $AD = AB$, find $C$ from circles about $B$ and $D$ of radius $AB$. Each step uses Postulates $1$, $2$ or $3$.`, key_terms: [{ term: 'Construction', definition_md: 'A figure drawn with an unmarked ruler and a compass, where every step has a reason.' }], formulas: [], visual: fEq, visuals: [tEqSteps, fRh, fSquare, tSqSteps, tWE3], topic_ids: [topic(3)] },
  ],
  exam_tips_md: r`**How marks are awarded**\n- *History (1–2 marks):* name the place, the people and the idea; no exact dates.\n- *Axioms and postulates (1–2 marks):* state the idea, and the number if asked.\n- *Proof (2–3 marks):* state the given and a reason for each step.\n- *Construction (3–5 marks):* every step with its postulate.\n\n**Common mistakes**\n1. Calling a common notion a postulate.\n2. Forgetting that a theorem must be proved.\n3. Leaving out the reason for a construction step.\n4. Misreading the fifth postulate: the interior angles must be on the same side of the transversal.`,
  status: 'draft', provenance: d1.provenance,
};

const fcard = (id, front_md, back_md, tag, t) => ({ id, front_md, back_md, tag, topic_id: topic(t) });
const flashcards = {
  unit: 'cbse-9-mathematics-ch07', version: 1, language: 'en',
  cards: [
    fcard('f01', 'What does the word geometry mean?', 'Measuring the earth.', 'definition', 1),
    fcard('f02', 'Why did Egyptian farmers need geometry?', 'The Nile floods washed away field boundaries, which then had to be marked again.', 'concept', 1),
    fcard('f03', 'How did rope-stretchers make a right angle?', r`With a rope of $12$ equal spaces knotted into a triangle with sides $3$, $4$, $5$.`, 'concept', 1),
    fcard('f04', 'What is the Harappan brick ratio?', r`Length : breadth : thickness $= 4 : 2 : 1$.`, 'fact', 1),
    fcard('f05', 'What are the Sulba Sutras?', 'Ancient Indian texts with rope rules for building altars and shapes.', 'definition', 1),
    fcard('f06', 'What does sulba mean?', 'A cord or rope.', 'definition', 1),
    fcard('f07', 'Who is a well-known author of a Sulba Sutra?', 'Baudhayana.', 'fact', 1),
    fcard('f08', 'What is the Sulba Sutra rule for a rectangle?', 'The rope along the diagonal makes an area equal to the two areas made by the sides: the Pythagorean theorem in words.', 'concept', 1),
    fcard('f09', 'How does a square on a diagonal compare with the square?', 'It has twice the area.', 'fact', 1),
    fcard('f10', r`Which Sulba rule gives $\sqrt{2}$?`, r`$1 + \dfrac{1}{3} + \dfrac{1}{3 \times 4} - \dfrac{1}{3 \times 4 \times 34} = \dfrac{577}{408}$, very close to $\sqrt{2}$.`, 'fact', 1),
    fcard('f11', 'Who wrote the Elements, and about when?', r`Euclid, about $300$ BCE.`, 'fact', 1),
    fcard('f12', 'How many chapters does the Elements have?', '$13$.', 'fact', 1),
    fcard('f13', 'What does Euclid\'s method do?', 'It starts from definitions, axioms and postulates and proves theorems step by step.', 'concept', 2),
    fcard('f14', 'Which terms are undefined today?', 'Point, line and plane.', 'definition', 2),
    fcard('f15', 'What is an axiom?', 'A general assumption accepted without proof, used in all of mathematics.', 'definition', 2),
    fcard('f16', 'What is a postulate?', 'An assumption about geometric figures, accepted without proof.', 'definition', 2),
    fcard('f17', 'What is a theorem?', 'A statement that is proved from earlier statements.', 'definition', 2),
    fcard('f18', 'What is a definition?', 'A statement that explains the meaning of a word.', 'definition', 2),
    fcard('f19', 'Common notion 1?', 'Things equal to the same thing are equal to one another.', 'fact', 2),
    fcard('f20', 'Common notion 2 and 3?', 'Equals added to equals are equal; equals taken from equals are equal.', 'fact', 2),
    fcard('f21', 'Common notion 4 and 5?', 'Things that coincide are equal; the whole is greater than the part.', 'fact', 2),
    fcard('f22', 'Postulate 1?', 'A straight line can be drawn from any point to any other point.', 'fact', 2),
    fcard('f23', 'Postulate 2?', 'A line segment can be extended as far as we like.', 'fact', 2),
    fcard('f24', 'Postulate 3?', 'A circle can be drawn with any centre and any radius.', 'fact', 2),
    fcard('f25', 'Postulate 4?', 'All right angles are equal.', 'fact', 2),
    fcard('f26', 'Postulate 5?', r`If the interior angles on one side of a transversal add up to less than $180^\circ$, the two lines meet on that side.`, 'fact', 2),
    fcard('f27', 'Why is the fifth postulate special?', 'It is long and complicated; Euclid avoided it until his $29$th proposition; many tried to prove it from the others.', 'concept', 2),
    fcard('f28', 'Playfair\'s axiom?', 'Through a point not on a line, exactly one line can be drawn parallel to the line. It is equivalent to the fifth postulate.', 'fact', 2),
    fcard('f29', 'Steps of Euclid\'s Proposition 1?', r`Circles at $A$ and $B$ with radius $AB$ meet at $C$; join $AC$, $BC$; then $AC = AB = BC$.`, 'concept', 3),
    fcard('f30', 'Which postulate lets us draw a circle with the compass?', 'Postulate $3$.', 'exam-tip', 3),
    fcard('f31', 'Which postulate lets us join two points with a ruler?', 'Postulate $1$.', 'exam-tip', 3),
    fcard('f32', 'What should every construction step have?', 'A reason: a postulate, an axiom or a definition.', 'exam-tip', 3),
  ],
  status: 'draft', provenance: d1.provenance,
};

const release = {
  unit: 'cbse-9-mathematics-ch07', version: 1, academic_year: '2026-27', created_at: '2026-11-05T00:00:00+05:30',
  decks: [d1, d2], notes, flashcards, questions: [],
  build: { run_id: null, checks: { syllabus: 't01 origins of geometry in Egypt, India (Harappan bricks, Sulba Sutras) and Greece (Euclid); t02 definitions, common notions (axioms), five postulates, the fifth postulate and Playfair\'s axiom, definition vs axiom vs postulate vs theorem; t03 Euclid\'s Proposition 1 and a square on a segment, each step justified by a postulate', self_checks: 'every figure is drawn from computed coordinates: circle intersections, distances and angles are asserted; every number in a table is recomputed' } },
};
const tests = chapterTests('Introduction to Euclid\'s Geometry', {
  A: ['m07', 'm13', 'm18', 'ar1'],
  B: ['s201', 's204', 's302'],
  C: ['l01', 'l03'],
  D: ['c01'],
}, {
  A: ['m08', 'm09', 'm10', 'm11', 'm14', 'm16', 'm19', 'm20', 'ar2', 'ar3'],
  B: ['s202', 's206', ['s203', 's205'], 's301', ['s303', 's304']],
  C: ['l02', ['l04', 'l05']],
  D: ['c02', 'c03'],
});
build({ dir: DIR, release, testsSpec: tests });
