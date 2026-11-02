// Build ICSE 10 Mathematics ch15 Loci. Run from platform/:
//   npx tsx content/authored/maths/icse-10-mathematics-ch15/src/build.mjs
// Every construction is computed (loci.mjs, figs.mjs, figs2.mjs): the figure builders assert equal distances, right
// angles, bisected angles, points on circles and the number of common points of lines and circles; every length and
// angle a student would measure is computed here and rounded to 0.1 cm. Every number in a worked example, table, note
// and flashcard is computed with exact arithmetic (fr.mjs, work.mjs) or from the construction.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, topic, deck, sl, table, flow, build, chapterTests, r } from './lib.mjs';
import { steps, ARITH } from './work.mjs';
import { must, near, dist, angDeg, r1, r2, polar, line, through, at, distLine, perpBis, bisector, parallel, intLL, intLC, mid, inTri } from './loci.mjs';
import * as G from './figs.mjs';
import { bisPerp, bisParallel } from './figs.mjs';

setUnit('icse-10-mathematics-ch15');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const A = (lines, msg) => steps(ARITH, lines).must(msg);
const d = (s) => `$${s}$`;
const sinD = (x) => Math.sin((x * Math.PI) / 180);
const cosD = (x) => Math.cos((x * Math.PI) / 180);
const f1 = (v) => (Math.round(v * 10 + 1e-9) / 10).toFixed(1);
const f2 = (v) => (Math.round(v * 100 + 1e-9) / 100).toFixed(2);
const O = [0, 0];

// ================================================================ deck 1 tables and worked values (asserted)
const tEveryday = table(['Situation', 'Condition on the moving point', 'Locus'], [
  ['tip of a minute hand, $7$ cm long', 'always $7$ cm from the pivot', 'a circle of radius $7$ cm'],
  ['centre of a coin rolling along a ruler edge', 'always $1.5$ cm from the edge', 'a line parallel to the edge'],
  ['a shelter equally far from two bus stops', 'same distance from both stops', 'the perpendicular bisector of the stops'],
  ['a lamp equally far from two crossing roads', 'same distance from both roads', 'the two angle bisectors'],
], 'Table of everyday loci: the tip of a seven centimetre minute hand moves on a circle of radius seven centimetres; the centre of a coin rolling along a ruler edge stays one and a half centimetres from the edge, so it moves on a parallel line; a shelter equally far from two bus stops is on the perpendicular bisector of the stops; a lamp equally far from two crossing roads is on one of the two angle bisectors.', 'A locus is the path a point follows when it obeys a rule.');

// WE1: circle of radius 3 about O: where are four points?
const wePoints = [['P', [1, 2]], ['Q', [3, 0]], ['R', [-2, 3]], ['S', [-2.4, 1.8]]];
const weRows = wePoints.map(([n, p]) => { const dd = dist(p, O); return { n, p, dd, where: near(dd, 3) ? 'on the circle' : dd < 3 ? 'inside' : 'outside' }; });
must(weRows.map((x) => x.where).join() === 'inside,on the circle,outside,on the circle', 'WE1 positions');
A([r`1^2 + 2^2 = 5`, r`3^2 + 0^2 = 9`, r`(-2)^2 + 3^2 = 13`, r`2.4^2 + 1.8^2 = 9`], 'WE1 squared distances');
const tWE1 = table(['Point', 'Distance squared from $O$', 'Compare with $3^2 = 9$', 'Position'], [
  [r`$P(1, 2)$`, r`$1^2 + 2^2 = 5$`, r`$5 < 9$`, 'inside'], [r`$Q(3, 0)$`, r`$3^2 + 0^2 = 9$`, r`$9 = 9$`, 'on the circle'],
  [r`$R(-2, 3)$`, r`$(-2)^2 + 3^2 = 13$`, r`$13 > 9$`, 'outside'], [r`$S(-2.4, 1.8)$`, r`$2.4^2 + 1.8^2 = 9$`, r`$9 = 9$`, 'on the circle'],
], 'Table for worked example 1: with centre O and radius 3, point P at one, two has squared distance 5 which is less than 9, so it is inside; point Q at three, zero has 9, so it is on the circle; point R at minus two, three has 13, so it is outside; point S at minus two point four, one point eight has 9, so it is on the circle.', 'Compare the squared distance with $r^2$.');

// WE2: coin of radius 1.5 rolling along an edge
A([r`1.5 + 1.5 = 3`], 'WE2');

// WE3: perpendicular bisector: AB = 6, PA = 5
const wePM = A([r`\sqrt{5^2 - 3^2} = \sqrt{16} = 4`, r`4 + 4 = 8`], 'WE3');
must(near(G.wePB.P[1], 4) && near(dist(G.wePB.P, G.wePB.Q), 8), 'WE3 values');

// WE4: coordinates: A(-2, 1), B(6, 1): bisector x = 2
const cA = [-2, 1], cB = [6, 1];
const cRows = [[2, 5], [2, -3], [3, 1], [0, 4]].map((p) => { const a2 = (p[0] - cA[0]) ** 2 + (p[1] - cA[1]) ** 2, b2 = (p[0] - cB[0]) ** 2 + (p[1] - cB[1]) ** 2; return { p, a2, b2, on: a2 === b2 }; });
must(cRows.map((x) => x.on).join() === 'true,true,false,false' && cRows.every((x) => (x.p[0] === 2) === x.on), 'WE4: points with x = 2 are exactly the equidistant ones');
A([r`\dfrac{-2 + 6}{2} = 2`, r`4^2 + 4^2 = 32`, r`3^2 + 4^2 = 25`, r`(-4)^2 + 3^2 = 25`], 'WE4 lines');
const tWE4 = table(['Point', r`$PA^2$`, r`$PB^2$`, 'On the locus?'], cRows.map((x) => [`$(${x.p[0]}, ${x.p[1]})$`, d(`(${x.p[0]} + 2)^2 + (${x.p[1]} - 1)^2 = ${x.a2}`), d(`(${x.p[0]} - 6)^2 + (${x.p[1]} - 1)^2 = ${x.b2}`), x.on ? 'yes, equal' : 'no, unequal']), 'Table for worked example 4: A is at minus two, one and B at six, one, so the locus is the line x equals two. The points two, five and two, minus three have PA squared equal to PB squared equal to 32 and are on the locus; the points three, one and zero, four have unequal squared distances and are not.', 'The locus of points equidistant from $A(-2, 1)$ and $B(6, 1)$ is the line $x = 2$.');

const tSum1 = table(['Condition on the moving point', 'Locus', 'Construction'], [
  ['a fixed distance $r$ from a fixed point $O$', r`a circle, centre $O$, radius $r$`, 'compass at $O$'],
  [r`a fixed distance $d$ from a fixed line $l$`, r`two lines parallel to $l$, $d$ from it on each side`, 'perpendiculars of length $d$'],
  [r`equidistant from two fixed points $A$, $B$`, r`the perpendicular bisector of $AB$`, 'equal arcs from $A$ and $B$'],
], 'Summary table for part one: a fixed distance from a fixed point gives a circle; a fixed distance from a fixed line gives two parallel lines, one on each side; equal distance from two fixed points gives the perpendicular bisector of the segment joining them.', 'Part 1 on one card.');

// ================================================================ deck 2 worked values (asserted)
// WE1: point on the bisector of 70 degrees, 4 cm from B
const dWE1 = G.wBis.d;
must(r1(dWE1) === 2.3 && near(dWE1, 4 * sinD(35)), 'D2 WE1: 2.3 cm');
// WE2: parallels 3.6 apart
A([r`\dfrac{3.6}{2} = 1.8`], 'D2 WE2');
// WE3: points 3 from A and equidistant from A and B (AB = 4)
A([r`\dfrac{4}{2} = 2`, r`3^2 - 2^2 = 5`], 'D2 WE3');
const pq3 = G.wePt.pq;
must(r1(pq3) === 4.5 && r2(G.wePt.P[1]) === 2.24, 'D2 WE3: P is 2.24 from AB, PQ = 4.5');
// WE4: triangle BC = 6.5, AB = 5, angle B = 60: bisector of B and perpendicular bisector of BC
const w4 = bisPerp({ bc: 6.5, ab: 5, angB: 60 }, 'Worked example 4: triangle ABC with BC 6.5 centimetres, AB 5 centimetres and angle B 60 degrees. The dashed bisector of angle B and the dashed perpendicular bisector of BC meet at P inside the triangle. M is the mid-point of BC and each half of angle B is 30 degrees.', 'Loci: bisector of $\\angle B$ and perpendicular bisector of $BC$ meet at $P$. Lengths in cm.');
must(w4.inside && r1(w4.BP) === 3.8, 'D2 WE4: BP = 3.8, P inside');
A([r`\dfrac{6.5}{2} = 3.25`], 'D2 WE4');
// WE5: triangle 7, 5, 6; bisector of A; parallel to BC at 2
const w5 = bisParallel({ a: 7, b: 5, c: 6, h: 2 }, 'Worked example 5: triangle ABC with BC 7, CA 5 and AB 6 centimetres. The dashed bisector of angle A meets the line UV, drawn parallel to BC and 2 centimetres above it, at P. The perpendicular from P to BC is 2 centimetres.', 'Loci: bisector of $\\angle A$ and the parallel to $BC$ at $2$ cm meet at $P$. Lengths in cm.');
must(r1(w5.AP) === 2.2 && r1(w5.dAB) === 1.4, 'D2 WE5: AP = 2.2, distance from AB 1.4');
// WE6: regions
const rg = G.reg;
must(rg.rows.map((x) => x.ok).join() === 'true,false,false,true', 'D2 WE6 membership');
const yn = (b) => (b ? 'yes' : 'no');
const tReg = table(['Point', 'Nearer to $B$ than to $C$?', 'Within $3.5$ cm of $A$?', 'Inside the triangle?', 'In the region?'], rg.rows.map((x) => [`$T_${x.n.slice(1)}$`, yn(x.nearer), yn(x.within), yn(x.inside), yn(x.ok)]), 'Table for worked example 6: test point one is nearer to B than C, within three and a half centimetres of A and inside the triangle, so it is in the region; test point two is nearer to C and outside the triangle, so it is not; test point three is more than three and a half centimetres from A, so it is not; test point four satisfies all three conditions and is in the region.', 'A point is in the region only if it satisfies all three conditions.');

const tSum2 = table(['Condition on the moving point', 'Locus'], [
  ['a fixed distance from a fixed point', 'a circle'], ['a fixed distance from a fixed line', 'two parallel lines, one on each side'],
  ['equidistant from two points', 'the perpendicular bisector'], ['equidistant from two intersecting lines', 'the two angle bisectors (at right angles)'],
  ['equidistant from two parallel lines', 'the parallel line midway between them'],
], 'Summary table of the five standard loci: a circle for a fixed distance from a point; two parallel lines for a fixed distance from a line; the perpendicular bisector for equal distance from two points; the pair of angle bisectors for equal distance from two intersecting lines; the midway parallel for equal distance from two parallel lines.', 'The five standard loci on one card.');

const fFlow = flow('TB', [['s', 'Read the conditions on the point'], ['a', 'Draw the given figure to scale'], ['b', 'Draw the locus for each condition'], ['c', 'Mark where the loci meet'], ['e', 'Measure and write the answer']], [['s', 'a'], ['a', 'b'], ['b', 'c'], ['c', 'e']], 'Flow chart for a construction problem: read the conditions, draw the given figure to scale, draw the locus for each condition, mark where the loci meet, then measure and write the answer.', 'A point that obeys two conditions lies on both loci.');

// ================================================================ decks
const d1 = deck({
  part: 1,
  title: 'Loci — Part 1: Circles, parallels and the perpendicular bisector',
  goals: ['Explain what a locus is and describe a locus in words', 'Draw the locus of points at a fixed distance from a point (a circle) and from a line (two parallel lines)', 'Draw the perpendicular bisector as the locus of points equidistant from two points and use it to find lengths', 'Check, with distances, whether a point is on a given locus'],
  slides: [
    sl('title', 'Loci, Part 1', { b: 'A **locus** is the path of a point that obeys a rule. In this part we meet three loci you will draw again and again: the circle, the pair of parallel lines and the perpendicular bisector.', v: G.fTitle, n: 'Welcome to loci. Look at these points. Each one is the same distance from the centre O, so together they sit on a circle. That circle is the locus of a point that stays a fixed distance from O. In this part we study three loci: the circle, a pair of parallel lines, and the perpendicular bisector.' }),
    sl('concept', 'What you will be able to do', { ul: ['Say what a **locus** is', 'Draw the locus at a **fixed distance** from a point or a line', 'Draw the **perpendicular bisector** of a segment', 'Test whether a point is **on** a locus'], n: 'These are your goals for part one. First we learn what a locus is. Then we draw the locus of points at a fixed distance from a point, and from a line. Next we construct the perpendicular bisector of a segment, and finally we test whether a given point lies on a locus.' }),
    sl('concept', 'What is a locus?', { b: 'A **locus** is the set of **all** the points, and **only** those points, that obey a given rule. It can be a curve, a line, a pair of lines or a region.', ul: ['every point of the locus obeys the rule', 'every point that obeys the rule is on the locus', 'a locus is drawn, not just described: use a ruler and a pair of compasses'], v: tEveryday, n: 'A locus is the set of all points that obey a rule, and only those points. Every point of the locus obeys the rule, and every point that obeys the rule belongs to the locus. The table shows everyday examples: the tip of a clock hand moves on a circle, and a shelter equally far from two bus stops lies on a special line. We shall learn that line shortly.' }),
    sl('concept', 'Locus 1: a fixed distance from a fixed point', { b: 'The points at a fixed distance $r$ from a fixed point $O$ form a **circle** with centre $O$ and radius $r$. Points nearer than $r$ are inside; points farther than $r$ are outside.', m: [r`OX < r \text{ (inside)}, \quad OP = r \text{ (on the circle)}, \quad OY > r \text{ (outside)}`], v: G.fKinds, n: 'The points that stay the same distance from a fixed point O form a circle. The fixed distance is the radius. Point X is two centimetres from O, so it is inside the circle of radius three. Point P is exactly three centimetres away, so it is on the circle. Point Y is four point two centimetres away, so it is outside.' }),
    sl('example', 'Worked example 1: inside, on or outside?', { b: 'A circle has centre $O$ at the origin and radius $3$ cm. Where are $P(1, 2)$, $Q(3, 0)$, $R(-2, 3)$ and $S(-2.4, 1.8)$ (coordinates in cm)?', ul: ['**Step 1 —** the squared distance of $(x, y)$ from $O$ is $x^2 + y^2$; compare with $r^2 = 9$.', '**Step 2 —** $P$: $1^2 + 2^2 = 5 < 9$, **inside**. $Q$: $3^2 + 0^2 = 9$, **on** the circle.', '**Step 3 —** $R$: $(-2)^2 + 3^2 = 13 > 9$, **outside**. $S$: $2.4^2 + 1.8^2 = 5.76 + 3.24 = 9$, **on** the circle.'], v: tWE1, n: 'To place a point, work out its squared distance from the centre and compare it with the radius squared, which is nine. For P the squared distance is five, less than nine, so P is inside. Q gives nine exactly, so it is on the circle. R gives thirteen, which is more than nine, so R is outside. S gives five point seven six plus three point two four, which is nine, so S is on the circle.' }),
    sl('check', 'Quick check: a circle locus', { b: 'Name the locus, then say what its centre and radius are.', chk: 'm02', n: 'Read the situation carefully. Decide what stays fixed and what moves, and name the locus.' }),
    sl('concept', 'Locus 2: a fixed distance from a fixed line', { b: 'The points at a fixed distance $d$ from a line $l$ lie on **two lines parallel to $l$**, one on each side of $l$, each at distance $d$ from it.', ul: ['the two parallels are $2d$ apart', 'distance from a line is always measured **perpendicular** to the line'], v: G.fFixedLine, n: 'Now take a fixed line instead of a fixed point. Points that stay two centimetres from the line lie on two parallel lines, one above and one below. Distance from a line is measured at a right angle to it, as the dashed segments show. The two parallel lines are four centimetres apart, which is twice the distance.' }),
    sl('example', 'Worked example 2: the path of a coin', { b: 'A coin of radius $1.5$ cm rolls along the straight edge of a ruler, staying on one side. Describe the locus of its centre. If the coin could roll along either side of the edge, how far apart would the two paths be?', ul: ['**Step 1 —** the coin touches the edge, so its centre is always $1.5$ cm from the edge, measured at right angles.', '**Step 2 —** the locus is a **line parallel to the edge**, $1.5$ cm from it, on the side the coin rolls on.', '**Step 3 —** with both sides, the two parallels are $1.5 + 1.5 = 3$ cm apart.'], v: G.fCoin, n: 'When the coin touches the edge, its centre is one and a half centimetres from the edge, which is the radius. So the centre moves on a line parallel to the edge, one and a half centimetres away. If the coin could roll on both sides of the edge, there would be two such lines, one and a half plus one and a half, which is three centimetres apart.' }),
    sl('check', 'Quick check: a pair of lines', { b: 'How many sides of the wall does the locus cover?', chk: 'm06', n: 'Think about which side of the wall the points can be on, and how far each line is from the wall.' }),
    sl('concept', 'Locus 3: equidistant from two points', { b: 'The points equally far from two fixed points $A$ and $B$ lie on the **perpendicular bisector** of $AB$: the line through the mid-point $M$ at right angles to $AB$.', m: [r`PA = PB \iff P \text{ is on the perpendicular bisector of } AB`], v: G.fPB, n: 'Next, the points that are equally far from two fixed points A and B. These lie on the perpendicular bisector of A B. That is the line through the mid point at a right angle to A B. Point P is joined to A and B and the two dashed segments have the same length. The same is true for Q below the line. Every point of the bisector works, and no other point does.' }),
    sl('concept', 'Drawing the perpendicular bisector', { b: 'With compasses and a ruler: draw $AB$. From $A$ and from $B$ draw arcs of the **same radius**, more than half of $AB$, meeting at $X$ and $Y$. Join $XY$.', ul: ['the radius must be **greater than half** of $AB$ or the arcs do not cross', '$XY$ meets $AB$ at its mid-point $M$, at a right angle', 'every point of $XY$ is equidistant from $A$ and $B$'], v: G.fPBBuild, n: 'To draw the perpendicular bisector, set your compasses to more than half of A B. Draw arcs from A and from B with this same radius. They cross at two points, X above and Y below. Join X and Y with a ruler. This line cuts A B at its mid point, at a right angle. If the radius is too small the arcs never meet.' }),
    sl('example', 'Worked example 3: a point on the bisector', { b: '$A$ and $B$ are $6$ cm apart. $P$ is on the perpendicular bisector of $AB$ and $PA = 5$ cm. Find the distance of $P$ from $AB$, and the distance between $P$ and the point $Q$ on the other side of $AB$ with $QA = 5$ cm.', ul: ['**Step 1 —** the foot of the perpendicular from $P$ is the mid-point $M$, and $AM = 3$ cm.', `**Step 2 —** in the right triangle $AMP$: $PM = ${wePM.lines[0]}$ cm.`, `**Step 3 —** $Q$ is the same distance below $AB$, so $PQ = ${wePM.lines[1]}$ cm.`], v: G.fPBWE, n: 'The foot of the perpendicular from P is the mid point M of A B, so A M is three centimetres. The triangle A M P has a right angle at M. So P M is the square root of five squared minus three squared, which is the square root of sixteen, or four centimetres. The point Q is four centimetres below A B, so P Q is four plus four, which is eight centimetres.' }),
    sl('check', 'Quick check: the shelter', { b: 'Which line is equally far from two points?', chk: 'm03', n: 'Remember what the locus of points equally far from two fixed points is called, and where it crosses the segment joining them.' }),
    sl('example', 'Worked example 4: testing points on a coordinate plan', { b: 'On a plan $A$ is $(-2, 1)$ and $B$ is $(6, 1)$. Show that $(2, 5)$ and $(2, -3)$ are equidistant from $A$ and $B$, but $(3, 1)$ and $(0, 4)$ are not.', ul: ['**Step 1 —** the mid-point of $AB$ has $x = \\dfrac{-2 + 6}{2} = 2$, so the locus is the line $x = 2$.', '**Step 2 —** $(2, 5)$: $PA^2 = 4^2 + 4^2 = 32 = PB^2$. The point $(2, -3)$ gives the same.', '**Step 3 —** $(3, 1)$: $PA^2 = 5^2 = 25$ but $PB^2 = 3^2 = 9$. $(0, 4)$: $2^2 + 3^2 = 13$ and $6^2 + 3^2 = 45$.'], v: tWE4, n: 'The points A and B have the same height, so the perpendicular bisector is the vertical line through the mid point. The mid point has x equal to two, so the locus is the line x equals two. Points on it, like two comma five, are the same distance from A and from B. Points off it, like three comma one, are not: their squared distances are twenty five and nine.' }),
    sl('summary', 'Summary', { ul: ['Fixed distance from a **point**: a circle', 'Fixed distance from a **line**: two parallel lines, one on each side', 'Equidistant from two **points**: the perpendicular bisector', 'Distances from a line are measured **at right angles**'], v: tSum1, n: 'To sum up part one. A fixed distance from a point gives a circle. A fixed distance from a line gives two parallel lines, one on each side. Equal distances from two points give the perpendicular bisector of the segment joining them. Always measure distance from a line at a right angle.' }),
    sl('exam-tips', 'Exam tips: how marks are awarded', { ul: ['**Name the locus (1 mark):** circle, pair of parallels or perpendicular bisector, with the distance or points', '**Construction (1–2 marks):** compass arcs left visible, a sharp pencil, labelled points', '**Radius for the bisector:** more than half the segment', '**Mistake:** drawing only **one** parallel when the distance is on both sides', '**Mistake:** measuring distance from a line along a slant', '**Habit:** do not rub out construction arcs'], n: 'In the exam, name the locus and give its distance or its points. Leave your compass arcs visible, because the marks are for the construction. For the perpendicular bisector use a radius of more than half the segment. Common slips are drawing only one of the two parallel lines, and measuring distance from a line along a slant instead of at a right angle.' }),
  ],
});

const d2 = deck({
  part: 2,
  title: 'Loci — Part 2: Angle bisectors, midlines and combined loci',
  goals: ['Draw the angle bisector and use it as the locus of points equidistant from two intersecting lines', 'Draw the locus of points equidistant from two parallel lines', 'Find a point that satisfies two conditions as the intersection of two loci, and count the solutions', 'Solve construction problems: construct, draw the loci, mark the points and measure'],
  slides: [
    sl('title', 'Loci, Part 2', { b: 'Two lines that cross have **two** angle bisectors, and every point on them is equally far from both lines. Combining loci lets us locate points that obey two rules at once.', v: G.fBis1, n: 'Welcome to part two. Two lines cross, and the dashed line bisects the angle between them. The point X on the bisector is joined to each line by a perpendicular, and the two perpendiculars are equal. So the bisector is the locus of points equally far from both lines. Then we combine loci to solve construction problems.' }),
    sl('concept', 'What you will be able to do', { ul: ['Draw the **angle bisector** and use it as a locus', 'Find the locus **between two parallel lines**', 'Locate points by **intersecting** two loci', 'Solve a **construction problem** and measure the answer'], n: 'These are your goals for part two. We draw the angle bisector and use it as a locus. We find the line midway between two parallel lines. We locate points where two loci meet, and we solve construction problems by drawing, marking and measuring.' }),
    sl('concept', 'Locus 4: equidistant from two intersecting lines', { b: 'The points equally far from two lines that cross at $O$ lie on the **bisectors of the angles** between them. Every point of a bisector is the same distance from the two lines.', m: [r`\text{point on a bisector} \Rightarrow \text{distance to } p = \text{distance to } q`], ul: ['distance to each line is measured at a **right angle**'], v: G.fBis1, n: 'Here is the fourth locus. Points that are equally far from two crossing lines lie on the bisectors of the angles between the lines. The two perpendiculars from the point X to the lines carry a tick mark each, because they are equal. This is true for every point on the bisector, not just X.' }),
    sl('concept', 'Drawing an angle bisector', { b: 'Place the compass point at $O$ and cut both arms at $P$ and $Q$. From $P$ and $Q$ draw equal arcs that meet at $R$. Join $OR$: it bisects the angle.', ul: ['the arcs from $P$ and $Q$ must have the **same** radius', '$OR$ makes two **equal** angles with the arms'], v: G.fBisBuild, n: 'To bisect an angle, put the compass point on the vertex O and draw an arc that cuts both arms, at P and Q. Then, with the same radius from P and from Q, draw two arcs that cross at R. A ruler line from O through R splits the seventy degree angle into two angles of thirty five degrees.' }),
    sl('example', 'Worked example 1: distance from the arms', { b: 'The angle $ABC$ is $70^\\circ$. $P$ is on its bisector, $4$ cm from $B$. Find the angle between $BP$ and each arm, and the distance of $P$ from each arm (to $0.1$ cm).', ul: ['**Step 1 —** the bisector halves the angle: $\\dfrac{70}{2} = 35^\\circ$ with each arm.', '**Step 2 —** the perpendicular from $P$ to an arm and $BP$ form a right triangle with hypotenuse $4$.', `**Step 3 —** the distance is $4 \\sin 35^\\circ \\approx ${f1(dWE1)}$ cm, the same for both arms.`], v: G.fBisWE, n: 'The bisector halves the seventy degree angle, so it makes thirty five degrees with each arm. The perpendicular from P to an arm, together with B P and part of the arm, forms a right triangle whose longest side is four centimetres. The distance is four times the sine of thirty five degrees, which is about two point three centimetres, the same for both arms.' }),
    sl('check', 'Quick check: two crossing paths', { b: 'How many lines make up the locus?', chk: 'm04', n: 'Remember that two crossing lines make two pairs of vertically opposite angles.' }),
    sl('concept', 'The two bisectors are at right angles', { b: 'Two lines that cross make two different angles, $\\theta$ and $180^\\circ - \\theta$. Each has a bisector, and the two bisectors meet at $\\dfrac{\\theta}{2} + \\dfrac{180^\\circ - \\theta}{2} = 90^\\circ$.', ul: ['the **full locus** is the pair of bisectors', 'on each bisector the distance to the two lines is the same'], v: G.fBisBoth, n: 'The full locus of points equally far from two crossing lines is a pair of lines, the two angle bisectors. Here the lines cross at fifty degrees. One bisector halves fifty degrees, the other halves the neighbouring one hundred and thirty degrees. Half of fifty plus half of one hundred and thirty is ninety, so the two bisectors always meet at a right angle.' }),
    sl('concept', 'Locus 5: equidistant from two parallel lines', { b: 'The points equally far from two parallel lines $l$ and $m$ lie on a line **parallel to both**, midway between them. If $l$ and $m$ are $g$ apart, it is $\\dfrac{g}{2}$ from each.', v: G.fMid, n: 'The last standard locus uses two parallel lines. Points equally far from both lie on a third parallel line, exactly halfway between them. Here the lines l and m are four centimetres apart, so the dashed line n is two centimetres from each, as the perpendiculars from the point X show.' }),
    sl('example', 'Worked example 2: a line of lamps', { b: 'The two edges of a straight canal path are parallel and $3.6$ m apart. A line of lamps is to be equally far from both edges. Describe where it goes.', ul: ['**Step 1 —** the locus of points equidistant from two parallel lines is a **third parallel line** midway between them.', '**Step 2 —** its distance from each edge is $\\dfrac{3.6}{2} = 1.8$ m.', '**Step 3 —** draw the edges $3.6$ cm apart (scale $1$ cm to $1$ m) and the line $1.8$ cm from each.'], v: G.fMidWE, n: 'Points equally far from two parallel lines lie on a third parallel line halfway between them. The edges are three point six metres apart, so the line of lamps is half of that, one point eight metres, from each edge. On a drawing with one centimetre to one metre, draw the edges three point six centimetres apart and the middle line one point eight centimetres from each.' }),
    sl('concept', 'Intersection of loci', { b: 'A point that obeys **two** conditions lies on **both** loci, so it is where the two loci **intersect**. The number of solutions is the number of common points: a line and a circle can meet in $2$, $1$ or $0$ points.', v: G.fIntersect, n: 'A point that obeys two rules lies on both loci, so we look for the points where the two loci cross. A line and a circle can cross at two points, like line p, touch at one point, like line q, or miss each other completely, like line s. So a problem with two conditions can have two solutions, one solution or none.' }),
    sl('example', 'Worked example 3: equidistant and a fixed distance', { b: '$A$ and $B$ are $4$ cm apart. Find the points that are equally far from $A$ and $B$ and $3$ cm from $A$, and measure the distance between them.', ul: ['**Step 1 —** locus 1: the perpendicular bisector of $AB$, $\\dfrac{4}{2} = 2$ cm from $A$ along $AB$. Locus 2: a circle of radius $3$ cm about $A$.', '**Step 2 —** they meet at $P$ and $Q$ on either side of $AB$, each $\\sqrt{3^2 - 2^2} = \\sqrt{5} \\approx 2.24$ cm from $AB$.', `**Step 3 —** measuring gives $PQ = 2 \\times 2.24 \\approx ${f1(pq3)}$ cm.`], v: G.fPtWE, n: 'Draw the perpendicular bisector of A B, which crosses A B two centimetres from A. Then draw a circle of radius three centimetres about A. They meet at two points, P above and Q below. Each is the square root of nine minus four, about two point two four centimetres, from A B. So P Q is about four point five centimetres.' }),
    sl('check', 'Quick check: how many points?', { b: 'Do the two circles meet?', chk: 'm09', n: 'Compare the distance between the two centres with the sum and the difference of the radii.' }),
    sl('concept', 'Method for a construction problem', { b: 'Always follow the same plan, and keep every construction line.', ul: ['**construct** the given figure to the stated measurements', 'draw each **locus** with ruler and compasses', 'the required point is where the loci **intersect**', 'measure with a ruler or protractor and write the answer **with units**'], v: fFlow, n: 'Every construction problem follows the same plan. First draw the given figure to the measurements stated. Then draw the locus for each condition using a ruler and compasses. Mark the point or points where the loci meet. Finally measure what the question asks for, and write the answer with its units. Keep all your construction lines.' }),
    sl('example', 'Worked example 4: bisector and perpendicular bisector', { b: 'Construct triangle $ABC$ with $BC = 6.5$ cm, $\\angle B = 60^\\circ$ and $AB = 5$ cm. Locate $P$ equidistant from $BA$ and $BC$ and also from $B$ and $C$. Measure $BP$.', ul: ['**Step 1 —** locus 1: the bisector of $\\angle B$, $30^\\circ$ with each arm. Locus 2: the perpendicular bisector of $BC$, through $M$ with $BM = \\dfrac{6.5}{2} = 3.25$ cm.', '**Step 2 —** the loci meet at $P$, inside the triangle.', `**Step 3 —** in the right triangle $BMP$, $BP = \\dfrac{3.25}{\\cos 30^\\circ} \\approx ${f1(w4.BP)}$ cm.`], v: w4.fig, n: 'Construct the triangle first. Locus one is the bisector of angle B, which makes thirty degrees with each arm. Locus two is the perpendicular bisector of B C, through the mid point M, three point two five centimetres from B. They meet at P. In the right triangle B M P, B P is three point two five divided by the cosine of thirty degrees, which measures about three point eight centimetres.' }),
    sl('example', 'Worked example 5: bisector and a parallel', { b: 'Construct triangle $ABC$ with $BC = 7$ cm, $CA = 5$ cm and $AB = 6$ cm. Locate $P$ inside the triangle equally far from $AB$ and $AC$ and $2$ cm from $BC$. Measure $AP$.', ul: ['**Step 1 —** locus 1: the bisector of $\\angle A$. Locus 2: the line parallel to $BC$ and $2$ cm from it, inside the triangle.', '**Step 2 —** mark $P$ where they meet.', `**Step 3 —** measuring gives $AP = ${f1(w5.AP)}$ cm, and $P$ is $${f1(w5.dAB)}$ cm from $AB$ and from $AC$.`], v: w5.fig, n: 'Construct the triangle from its three sides. Locus one is the bisector of angle A. Locus two is the line parallel to B C and two centimetres above it. They meet at P inside the triangle. Measuring on an accurate drawing gives A P as about two point two centimetres, and P is about one point four centimetres from both A B and A C.' }),
    sl('check', 'Quick check: impossible conditions', { b: 'Where is the middle line, and how far is it from each bank?', chk: 'm17', n: 'Find the locus for the first condition, then ask whether any of its points can also meet the second condition.' }),
    sl('example', 'Worked example 6: a region', { b: 'In triangle $ABC$ shade the points that are nearer to $B$ than to $C$ and within $3.5$ cm of $A$. Test the points $T_1$ to $T_4$.', ul: ['**Step 1 —** nearer to $B$ than to $C$: the side of the perpendicular bisector of $BC$ that contains $B$.', '**Step 2 —** within $3.5$ cm of $A$: inside the circle of radius $3.5$ cm about $A$.', '**Step 3 —** inside the triangle too: the region is where all three conditions hold. Only $T_1$ and $T_4$ qualify.'], v: G.fRegion, n: 'Some questions ask for a region instead of a point. Nearer to B than to C means the side of the perpendicular bisector of B C that contains B. Within three point five centimetres of A means inside the circle about A. Add the triangle itself. A point is in the region only if all three conditions hold, and here only the test points one and four qualify.' }),
    sl('summary', 'Summary', { ul: ['Equidistant from **intersecting lines**: the two angle bisectors, at right angles', 'Equidistant from **parallel lines**: the parallel midway between them', 'A point obeying two rules is at the **intersection** of two loci', 'Construct, draw the loci, mark the points, **measure**'], v: tSum2, n: 'To sum up part two. Points equally far from two crossing lines lie on the two angle bisectors, which are at right angles. Points equally far from two parallel lines lie on the parallel halfway between. A point that obeys two rules is where two loci intersect. In construction problems we construct, draw the loci, mark the points and measure.' }),
    sl('exam-tips', 'Exam tips: how marks are awarded', { ul: ['**Given figure (2–3 marks):** exact lengths and angles', '**Each locus (1–2 marks):** correct construction, arcs left visible', '**Point marked and labelled (1 mark)**, then **measurement (1–2 marks)** with units', '**Mistake:** drawing only one bisector when both are needed, or only one parallel', '**Mistake:** forgetting that two loci can meet at **two** points', '**Habit:** check your answer is within $0.1$ cm of the computed value'], n: 'In the exam, draw the given figure with exact lengths and angles. Draw each locus with its construction arcs left visible. Mark and label the point where they meet, then measure and write the answer with its unit. Common slips are drawing only one of two bisectors or parallels, and forgetting that two loci may cross at two points.' }),
  ],
});

// ================================================================ notes
const notes = {
  unit: 'icse-10-mathematics-ch15', version: 1, title: 'Loci — chapter notes', language: 'en',
  sections: [
    { heading: '1. What a locus is; the circle', body_md: r`- A **locus** is the set of **all** the points, and **only** those points, that obey a given rule: a curve, a line, a pair of lines or a region.
- **Fixed distance from a fixed point** $O$: a **circle** with centre $O$ and that distance as radius.
- Inside: $OX < r$; on the circle: $OP = r$; outside: $OY > r$. With coordinates, compare $x^2 + y^2$ with $r^2$.
- Drawing at a scale: a real radius $R$ drawn at $1 : n$ has radius $\dfrac{R}{n}$ on the plan.

*Example:* the tip of a $7$ cm minute hand is always $7$ cm from the pivot: a circle of radius $7$ cm.`, key_terms: [{ term: 'Locus', definition_md: 'The set of all points, and only those points, that satisfy a given condition.' }, { term: 'Circle as a locus', definition_md: 'Points at a fixed distance (the radius) from a fixed point (the centre).' }], formulas: [{ latex: 'OP = r', label: 'On the circle of centre $O$' }], visual: G.fKinds, visuals: [G.fTitle, tEveryday, tWE1], topic_ids: [topic(1)] },
    { heading: '2. Fixed distance from a line', body_md: r`- The points at a fixed distance $d$ from a line $l$ form **two lines parallel to $l$**, one on each side, each at distance $d$.
- Distance from a line is measured **at right angles** to the line.
- The two parallels are $2d$ apart; if only one side is allowed, only one parallel is the locus.

*Example:* a coin of radius $1.5$ cm rolling along an edge has its centre on a line parallel to the edge and $1.5$ cm from it.`, key_terms: [{ term: 'Parallel locus', definition_md: 'The pair of lines parallel to a given line, at a given distance on either side of it.' }], formulas: [], visual: G.fFixedLine, visuals: [G.fCoin], topic_ids: [topic(1)] },
    { heading: '3. Equidistant from two points: the perpendicular bisector', body_md: r`- The points equally far from $A$ and $B$ lie on the **perpendicular bisector** of $AB$: it passes through the mid-point $M$ at right angles to $AB$.
- **Construction:** arcs of equal radius (more than $\dfrac{AB}{2}$) from $A$ and from $B$ meet at $X$ and $Y$; join $XY$.
- A point $P$ on the bisector has $PM = \sqrt{PA^2 - AM^2}$.
- The proofs of the locus theorems are not in the ICSE 2027 syllabus: the results are used.

*Example:* $AB = 6$, $PA = 5$: $PM = \sqrt{25 - 9} = 4$ cm.`, key_terms: [{ term: 'Perpendicular bisector', definition_md: 'The line through the mid-point of a segment, at right angles to it; the locus of points equidistant from its ends.' }], formulas: [{ latex: 'PA = PB', label: 'P on the perpendicular bisector of $AB$' }], visual: G.fPB, visuals: [G.fPBBuild, G.fPBWE, tWE4], topic_ids: [topic(2)] },
    { heading: '4. Equidistant from two intersecting lines: angle bisectors', body_md: r`- The points equally far from two lines that cross lie on the **bisectors of the angles** between them: **two** lines.
- The two bisectors are **at right angles**: $\dfrac{\theta}{2} + \dfrac{180^\circ - \theta}{2} = 90^\circ$.
- **Construction:** arcs from the vertex cut the arms at $P$, $Q$; equal arcs from $P$ and $Q$ meet at $R$; join the vertex to $R$.
- A point on a bisector at distance $s$ from the vertex is $s \sin\left(\dfrac{\theta}{2}\right)$ from each arm.

*Example:* an angle of $70^\circ$, $P$ at $4$ cm on its bisector: distance $4 \sin 35^\circ \approx 2.3$ cm.`, key_terms: [{ term: 'Angle bisector', definition_md: 'The line that divides an angle into two equal angles; the locus of points equidistant from the arms.' }], formulas: [{ latex: 's \\sin\\left(\\dfrac{\\theta}{2}\\right)', label: 'Distance from a point on the bisector to an arm' }], visual: G.fBis1, visuals: [G.fBisBuild, G.fBisWE, G.fBisBoth], topic_ids: [topic(3)] },
    { heading: '5. Equidistant from two parallel lines', body_md: r`- The points equally far from two parallel lines lie on **one line parallel to both**, midway between them.
- If the lines are $g$ apart, the middle line is $\dfrac{g}{2}$ from each.
- Two parallels have no crossing point, so there is just one locus line (unlike crossing lines, which give two).

*Example:* edges $3.6$ m apart: the line of lamps is $1.8$ m from each edge.`, key_terms: [{ term: 'Midline', definition_md: 'The line parallel to two given parallel lines and halfway between them.' }], formulas: [{ latex: '\\dfrac{g}{2}', label: 'Distance of the midline from each parallel' }], visual: G.fMid, visuals: [G.fMidWE, tSum2], topic_ids: [topic(3)] },
    { heading: '6. Intersection of loci', body_md: r`- A point that obeys **two** conditions lies on **both** loci: it is where they **intersect**.
- A line and a circle meet in **2**, **1** or **0** points (secant, tangent, no contact); two circles meet in $2$ points if $|r_1 - r_2| < d < r_1 + r_2$, in $1$ point if $d = r_1 + r_2$ (or $|r_1 - r_2|$), and in none otherwise ($d$ is the distance between centres).
- Always ask: how many solutions are there? Does each one satisfy every condition (for example, inside the triangle)?

*Example:* $A$, $B$ $4$ cm apart; points $3$ cm from $A$ and equidistant from $A$ and $B$: $2$ points, $PQ \approx 4.5$ cm.`, key_terms: [{ term: 'Intersection of loci', definition_md: 'The set of points common to two loci: the points that obey both conditions.' }], formulas: [], visual: G.fIntersect, visuals: [G.fPtWE], topic_ids: [topic(4)] },
    { heading: '7. Construction problems', body_md: r`- **Plan:** (1) construct the given figure, (2) draw each locus, (3) mark the point where they meet, (4) measure and answer with units.
- Keep all construction arcs; use a sharp pencil; label every point.
- Typical pairs: bisector of an angle with the perpendicular bisector of a side; bisector with a line parallel to a side; a circle with a perpendicular bisector; two perpendicular bisectors (the point equidistant from three corners).
- **Regions:** "nearer to $B$ than to $C$" is one side of the perpendicular bisector of $BC$; "within $r$ of $A$" is inside a circle.

*Example:* triangle $BC = 6.5$, $\angle B = 60^\circ$, $AB = 5$: the bisector of $B$ meets the perpendicular bisector of $BC$ at $P$ with $BP \approx 3.8$ cm.`, key_terms: [{ term: 'Construction problem', definition_md: 'A problem asking for a point that obeys two conditions, found by drawing two loci and measuring.' }], formulas: [], visual: fFlow, visuals: [w4.fig, w5.fig, G.fRegion, tReg], topic_ids: [topic(4)] },
  ],
  exam_tips_md: r`**How marks are awarded**
- *Naming a locus (1–2 marks):* the right figure (circle, pair of parallels, perpendicular bisector, angle bisectors, midline) with its distance or points.
- *Construction (2–3 marks):* given figure with exact lengths and angles 1–2; each locus 1; arcs left visible.
- *Point and measurement (2–3 marks):* point marked and labelled 1; measured length or angle with units 1–2 (within $0.1$ cm or $1^\circ$).
- *10-mark structured question:* parts (a), (b), (c), usually $3 + 3 + 4$; the figure first, the loci next, the measurements last.

**Common mistakes**
1. Drawing only one parallel when the distance is on both sides of the line, or only one bisector of two crossing lines.
2. Using a radius less than half the segment when drawing the perpendicular bisector.
3. Measuring a distance from a line along a slant instead of at a right angle.
4. Rubbing out the construction arcs, which loses the construction marks.
5. Forgetting that a circle and a line (or a bisector) can meet in two points, giving two answers; or that they may not meet at all.
6. Accepting a point that obeys the two loci but lies outside the figure the question restricts it to.`,
  status: 'draft', provenance: d1.provenance,
};

// ================================================================ flashcards
const fc = (id, front_md, back_md, tag, t) => ({ id, front_md, back_md, tag, topic_id: topic(t) });
const flashcards = {
  unit: 'icse-10-mathematics-ch15', version: 1, language: 'en',
  cards: [
    fc('f01', 'What is a **locus**?', 'The set of all points, and only those points, that satisfy a given condition.', 'definition', 1),
    fc('f02', 'Locus of points at a fixed distance $r$ from a fixed point $O$?', 'A circle with centre $O$ and radius $r$.', 'definition', 1),
    fc('f03', 'How do you tell whether $(x, y)$ is inside the circle of radius $3$ about the origin?', 'Compare $x^2 + y^2$ with $3^2 = 9$: less means inside, equal means on the circle, more means outside.', 'concept', 1),
    fc('f04', 'Locus of points at a fixed distance $d$ from a line $l$?', 'Two lines parallel to $l$, one on each side, each at distance $d$ from it.', 'definition', 1),
    fc('f05', 'How far apart are the two parallels at distance $3$ cm from a line?', '$3 + 3 = 6$ cm.', 'example', 1),
    fc('f06', 'A coin of radius $1.5$ cm rolls along a straight edge. Locus of its centre?', 'A line parallel to the edge, $1.5$ cm from it.', 'example', 1),
    fc('f07', 'How is distance from a line measured?', 'Along the perpendicular to the line.', 'concept', 1),
    fc('f08', 'On a plan drawn to scale $1 : 50$, how is a circle of real radius $3$ m drawn?', 'Radius $\\dfrac{300}{50} = 6$ cm.', 'example', 1),
    fc('f09', 'Locus of points equidistant from two fixed points $A$ and $B$?', 'The perpendicular bisector of $AB$.', 'definition', 2),
    fc('f10', 'Describe the perpendicular bisector of $AB$.', 'The line through the mid-point of $AB$ at right angles to $AB$.', 'definition', 2),
    fc('f11', 'How do you draw the perpendicular bisector with compasses?', 'Equal arcs from $A$ and $B$ meet at $X$ and $Y$; join $XY$.', 'concept', 2),
    fc('f12', 'What radius may the arcs have?', 'Greater than half of $AB$; otherwise the arcs do not cross.', 'exam-tip', 2),
    fc('f13', '$AB = 6$ cm, $P$ on the bisector, $PA = 5$ cm. Distance of $P$ from $AB$?', '$\\sqrt{5^2 - 3^2} = 4$ cm.', 'example', 2),
    fc('f14', 'Equation of the locus equidistant from $A(-2, 1)$ and $B(6, 1)$?', 'The line $x = 2$ through the mid-point, at right angles to $AB$.', 'example', 2),
    fc('f15', 'Why does the perpendicular bisector of a chord pass through the centre of the circle?', 'The centre is the same distance (the radius) from both ends of the chord.', 'concept', 2),
    fc('f16', 'The perpendicular bisectors of $AB$ and $BC$ meet at $S$. What do you know about $S$?', '$SA = SB = SC$: it is equidistant from the three points.', 'concept', 2),
    fc('f17', 'Locus of points equidistant from two intersecting lines?', 'The two lines that bisect the angles between them.', 'definition', 3),
    fc('f18', 'At what angle do the two bisectors of two crossing lines meet?', '$90^\\circ$: $\\dfrac{\\theta}{2} + \\dfrac{180^\\circ - \\theta}{2} = 90^\\circ$.', 'concept', 3),
    fc('f19', 'How do you draw an angle bisector with compasses?', 'Arc from the vertex cuts the arms at $P$, $Q$; equal arcs from $P$ and $Q$ meet at $R$; join the vertex to $R$.', 'concept', 3),
    fc('f20', 'A bisector of an angle of $84^\\circ$ makes what angle with each arm?', '$\\dfrac{84}{2} = 42^\\circ$.', 'example', 3),
    fc('f21', 'A point is $s$ from the vertex on the bisector of angle $\\theta$. Its distance from each arm?', '$s \\sin\\left(\\dfrac{\\theta}{2}\\right)$.', 'formula', 3),
    fc('f22', 'Locus of points equidistant from two parallel lines $g$ apart?', 'One line parallel to both, midway: $\\dfrac{g}{2}$ from each.', 'definition', 3),
    fc('f23', 'Parallel lines $3.6$ m apart. Distance of the midline from each?', '$\\dfrac{3.6}{2} = 1.8$ m.', 'example', 3),
    fc('f24', 'Common slip with two crossing lines?', 'Drawing only one bisector; the locus has two.', 'exam-tip', 3),
    fc('f25', 'How do you find a point that obeys two conditions?', 'Draw the locus of each condition; the point is where the loci intersect.', 'concept', 4),
    fc('f26', 'How many points can a line and a circle have in common?', '$2$, $1$ (tangent) or $0$.', 'concept', 4),
    fc('f27', 'Two circles of radii $r_1$ and $r_2$ with centres $d$ apart meet in $2$ points when?', '$|r_1 - r_2| < d < r_1 + r_2$.', 'formula', 4),
    fc('f28', 'Order of steps in a construction problem?', 'Construct the given figure, draw each locus, mark the intersection, measure and answer with units.', 'concept', 4),
    fc('f29', 'How do you describe "nearer to $B$ than to $C$"?', 'The side of the perpendicular bisector of $BC$ that contains $B$.', 'concept', 4),
    fc('f30', 'Two loci meet at two points. What should you check?', 'Whether both points satisfy any extra condition, such as lying inside the given figure.', 'exam-tip', 4),
  ],
  status: 'draft', provenance: d1.provenance,
};

// ================================================================ release + tests
const release = {
  unit: 'icse-10-mathematics-ch15', version: 1, academic_year: '2026-27', created_at: '2026-11-01T00:00:00+05:30',
  decks: [d1, d2], notes, flashcards, questions: [],
  build: { run_id: null, checks: {
    syllabus: 'topics t01–t04 exactly as in the ICSE 2027 syllabus (meaning of locus and the circle; fixed distance from a line; the perpendicular bisector; angle bisectors and the midline of parallel lines; intersection of loci and construction problems). Removed for ICSE 2027: proofs of the locus theorems, mentioned only in the notes (the results are used).',
    figures: 'every figure is drawn from computed coordinates; the builders assert equal distances (points on a perpendicular bisector, a bisector, a midline), right angles, bisected angles (35 degrees each), points on circles, the number of common points of a line and a circle, tangent and secant cases, that numeric segment labels equal the true lengths on one scale and that degree labels equal the measured angle',
    constructions: 'every constructed point (intersections of loci) and every value a student would measure (lengths to 0.1 cm, distances to a line, angles) is computed from the givens and asserted against the model answer; coordinate and distance working lines are checked by an exact parser',
  } },
};
const tests = chapterTests('Loci', {
  A: ['m01', 'm07', 'm12', 'ar1', 's301', 's302'],
  B: ['l01', 'l03'],
}, {
  A: ['m05', 'm08', 'm10', 'm14', 'm15', 'm18', 'ar2', 'ar5', 's401', 's402', 's405'],
  B: ['l02', 'l04', 'l06'],
});
build({ dir: DIR, release, testsSpec: tests });
