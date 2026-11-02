// Build ICSE 10 Mathematics ch18 Constructions: Tangents and Circles. Run from platform/:
//   npx tsx content/authored/maths/icse-10-mathematics-ch18/src/build.mjs
// Every construction is computed (tang.mjs, figs.mjs): the builders assert right angles at points of contact, equal
// tangents, equal distances from the circumcentre and from the incentre, and the hexagon's sides and circles; every
// length and angle a student would measure is computed and rounded to 0.1 cm or the nearest degree; every exact
// working line is parsed and evaluated with exact fractions (work.mjs).
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, topic, deck, sl, table, flow, build, chapterTests, r } from './lib.mjs';
import { steps, ARITH } from './work.mjs';
import { must, near, dist, r1, rd, tangents, concentric, triangle, hexagon, triSSS, triSAS, sinD, asinD } from './tang.mjs';
import * as G from './figs.mjs';

setUnit('icse-10-mathematics-ch18');
await import('./questions.mjs');
await import('./questions2.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const A = (lines, msg) => steps(ARITH, lines).must(msg);
const f1 = (v) => (Math.round(v * 10 + 1e-9) / 10).toFixed(1);
const f2 = (v) => (Math.round(v * 100 + 1e-9) / 100).toFixed(2);

// ================================================================ asserted worked values
const T35 = tangents(3, 5);
must(near(T35.len, 4) && rd(T35.between) === 74 && rd(T35.angAOB) === 106 && f2(T35.between) === '73.74', 'D1 WE1: PA = 4, 74 and 106 degrees');
A([r`\sqrt{5^2 - 3^2} = \sqrt{16} = 4`, r`\dfrac{3}{5} = 0.6`], 'D1 WE1');
const T36 = tangents(3, 6);
must(near(T36.between, 60) && r1(T36.len) === 5.2, 'D1 WE2: tangents at 60 degrees, OP = 6, PA = 5.2');
A([r`5 \div \dfrac{1}{2} = 10`, r`3 \div \dfrac{1}{2} = 6`, r`6^2 - 3^2 = 27`], 'D1 WE2');
const CC = concentric(5, 3);
must(near(CC.chord, 8), 'D1 WE3: chord 8');
A([r`\sqrt{5^2 - 3^2} = \sqrt{16} = 4`, r`2 \times 4 = 8`], 'D1 WE3');
const T26 = tangents(2.5, 6.5);
must(near(T26.len, 6), 'two tangents 6');

const tC = triangle(triSAS(7, 5, 60)); // D2 WE1
must(r1(tC.R) === 3.6 && r1(tC.b) === 6.2 && tC.inside, 'D2 WE1: AC = 6.2, R = 3.6');
A([r`7^2 + 5^2 - 2 \times 7 \times 5 \times \dfrac{1}{2} = 39`], 'D2 WE1');
const t1 = G.tri1; // 6.5, 7, 7.5
must(near(t1.r, 2) && near(t1.K, 21) && near(t1.s, 10.5) && near(t1.D[0], t1.sides.BC.p[0] + (t1.s - t1.b) * 1) , 'D2 WE2: r = 2, BD = s - b');
A([r`\dfrac{6.5 + 7 + 7.5}{2} = 10.5`, r`10.5 - 6.5 = 4`, r`10.5 - 7 = 3.5`, r`10.5 - 7.5 = 3`, r`4 + 3.5 = 7.5`, r`\sqrt{10.5 \times 4 \times 3.5 \times 3} = \sqrt{441} = 21`, r`\dfrac{21}{10.5} = 2`], 'D2 WE2');
must(near(dist(t1.A, t1.F), 4) && near(dist(t1.B, t1.D), 3.5) && near(dist(t1.C, t1.D), 3) && near(dist(t1.A, t1.E), 4), 'D2 WE2: tangent lengths 4, 3.5, 3');
const eq = G.triEq;
must(r1(eq.R) === 3.5 && r1(eq.r) === 1.7 && near(eq.R, 2 * eq.r), 'D2 WE3: R = 3.5, r = 1.7');
const hx4 = G.hx4, hx35 = G.hx35;
must(near(hx4.R, 4) && r1(hx4.ap) === 3.5 && near(hx4.ap ** 2, 12), 'D2 WE4: hexagon side 4');
A([r`4^2 - 2^2 = 12`, r`6 \times 4 = 24`], 'D2 WE4');
must(near(hx35.R, 3.5) && r1(hx35.ap) === 3.0 && near(hx35.perimeter, 21), 'D2 WE5: hexagon in a circle of radius 3.5');
A([r`6 \times 3.5 = 21`], 'D2 WE5');
const tOb = G.triObt, tRt = G.triRt;
must(tOb.obtuse && !tOb.inside && r1(tOb.R) === 4.9 && tRt.rightAt === 'A' && near(tRt.R, 5), 'position of the circumcentre');
A([r`4^2 + 5^2 = 41`, r`8^2 = 64`, r`\dfrac{10}{2} = 5`], 'position table');

// ================================================================ tables and flows
const tSum1 = table(['Idea', 'Fact', 'Use'], [
  ['tangent and radius', r`the radius to the point of contact is perpendicular to the tangent`, r`$PA^2 = OP^2 - r^2$`],
  ['two tangents from $P$', r`$PA = PB$, and $PO$ bisects $\angle APB$`, r`$\sin\angle APO = \dfrac{r}{OP}$`],
  ['construction', 'circle on $OP$ as diameter cuts the circle at $A$ and $B$', r`join $PA$ and $PB$`],
  ['concentric circles', 'a chord of the larger circle touching the smaller one is bisected at the point of contact', r`chord $= 2\sqrt{R^2 - r^2}$`],
], 'Summary table of part one: the radius to the point of contact is perpendicular to the tangent, giving the tangent length from the right triangle; the two tangents from an outside point are equal and the line to the centre bisects the angle between them; the circle on the line from the centre to the point as diameter cuts the circle at the points of contact; for concentric circles a chord of the larger circle touching the smaller is bisected at the point of contact and has length twice the square root of the difference of the squares of the radii.', 'Tangents: the facts and the construction on one card.');
const tCentres = table(['', 'Circumcircle', 'Incircle'], [
  ['centre', 'circumcentre $O$', 'incentre $I$'],
  ['found as the meeting point of', 'the perpendicular bisectors of the sides', 'the bisectors of the angles'],
  ['touches or passes through', 'passes through the three vertices', 'touches the three sides'],
  ['radius from the centre', 'to a vertex: $OA = OB = OC = R$', 'to a side: $ID = IE = IF = r$, at right angles'],
  ['where the centre lies', 'inside, on the hypotenuse, or outside the triangle', 'always inside the triangle'],
], 'Comparison table: the circumcircle has the circumcentre as its centre, found where the perpendicular bisectors of the sides meet, passes through the three vertices, and its centre lies inside, on the hypotenuse or outside the triangle; the incircle has the incentre as its centre, found where the angle bisectors meet, touches the three sides at right angles to the radii, and its centre is always inside the triangle.', 'The two circles of a triangle compared.');
const tPos = table(['Triangle', 'Test with squares', 'Circumcentre', 'Radius R'], [
  [r`sides $6$, $8$, $10$`, r`$6^2 + 8^2 = 100 = 10^2$`, 'mid-point of the hypotenuse', r`$\dfrac{10}{2} = 5$`],
  [r`sides $8$, $5$, $4$`, r`$4^2 + 5^2 = 41 < 8^2 = 64$`, 'outside the triangle', `$${f1(tOb.R)}$ (measured)`],
  [r`sides $6.5$, $7$, $7.5$`, r`$6.5^2 + 7^2 = 91.25 > 7.5^2 = 56.25$`, 'inside the triangle', `$${f1(t1.R)}$ (measured)`],
], 'Table of positions of the circumcentre: for sides six, eight, ten the squares satisfy the right-angle test and the centre is the mid-point of the hypotenuse with radius five; for sides eight, five, four the sum of the two smaller squares is forty-one, less than sixty-four, so the triangle is obtuse and the centre is outside, with radius about four point nine; for sides six point five, seven, seven point five the triangle is acute and the centre is inside, with radius about four point one.', 'Position of the circumcentre by the type of triangle.');
must(near(6.5 ** 2 + 7 ** 2, 91.25) && near(7.5 ** 2, 56.25) && 6.5 ** 2 + 7 ** 2 > 7.5 ** 2, 'table: acute test');
// note: the acute test uses the two smaller sides against the largest side; 6.5, 7 are the two smaller
const tHex = table(['Regular hexagon of side $a$', 'Value', 'For $a = 4$'], [
  ['circumradius $R$', r`$R = a$`, `$${f1(hx4.R)}$ cm`],
  ['inradius $r$ (centre to a side)', r`$r = \dfrac{a\sqrt{3}}{2} = a \sin 60^\circ$`, `$${f1(hx4.ap)}$ cm`],
  ['angle at the centre for one side', r`$\dfrac{360^\circ}{6}$`, r`$60^\circ$`],
  ['perimeter', r`$6a$`, `$${f1(hx4.perimeter)}$ cm`],
], 'Table for a regular hexagon of side a: the circumradius equals a, the inradius is a times the square root of three over two, which is a times the sine of sixty degrees; each side subtends sixty degrees at the centre; the perimeter is six a. For a equal to four these are four, about three point five, sixty degrees and twenty-four centimetres.', 'The numbers of a regular hexagon.');
must(r1(hx4.perimeter) === 24.0, 'hexagon perimeter 24');
const fTan = flow('TB', [['a', 'Join OP'], ['b', 'Bisect OP: perpendicular bisector, mid-point M'], ['c', 'Circle with centre M through O and P'], ['d', 'It cuts the given circle at A and B'], ['e', 'Join PA and PB: the tangents']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow chart of the construction of tangents from an external point: join O and P, bisect OP at M, draw the circle with centre M through O and P, mark where it cuts the given circle at A and B, and join P to A and to B.', 'Steps of construction of the tangents from $P$.');
const fCircSteps = flow('TB', [['a', 'Draw the triangle to the given measurements'], ['b', 'Perpendicular bisectors of two sides'], ['c', 'They meet at the circumcentre O'], ['d', 'Circle with centre O and radius OA'], ['e', 'Measure the radius with a ruler']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow chart for the circumcircle: draw the triangle, draw the perpendicular bisectors of two sides, they meet at the circumcentre O, draw the circle with centre O and radius OA, and measure the radius.', 'Steps of construction of the circumcircle.');
const fInSteps = flow('TB', [['a', 'Draw the triangle to the given measurements'], ['b', 'Bisect two of the angles'], ['c', 'Bisectors meet at the incentre I'], ['d', 'Perpendicular from I to a side: foot D'], ['e', 'Circle with centre I and radius ID']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow chart for the incircle: draw the triangle, bisect two angles, the bisectors meet at the incentre I, draw the perpendicular from I to a side with foot D, and draw the circle with centre I and radius ID.', 'Steps of construction of the incircle.');
const fHexSteps = flow('TB', [['a', 'Circle of radius a, centre O; mark A'], ['b', 'Same radius from A: cut the circle at B'], ['c', 'Continue round: C, D, E, F'], ['d', 'Join the six points in order'], ['e', 'Circumcircle: the circle already drawn']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow chart for a regular hexagon: draw a circle with the side as radius and mark A, with the same radius from A cut the circle at B, continue round to C, D, E and F, join the six points in order; the circle already drawn is the circumcircle.', 'Steps of construction of a regular hexagon.');

// ================================================================ decks
const d1 = deck({
  part: 1,
  title: 'Constructions — Part 1: Tangents from an external point',
  goals: ['State that a tangent is perpendicular to the radius at the point of contact', 'Construct the two tangents from an external point to a circle, with steps of construction', 'Calculate the length of a tangent and the angle between two tangents, and check against measurement', 'Solve problems on concentric circles and on tangents inclined at a given angle'],
  slides: [
    sl('title', 'Tangents from a point: construction', { b: 'A **tangent** touches a circle at exactly one point. From a point **outside** a circle you can draw **two** tangents, and with ruler and compasses you can construct them exactly.', v: G.fTitle, n: 'Welcome to constructions. Here a circle with centre O has a point P outside it. Two straight lines from P just touch the circle, at A and at B. These are the tangents. They are equal in length, here four centimetres each, and each is at a right angle to the radius at its point of contact. In this part we construct them and measure them.' }),
    sl('concept', 'What you will be able to do', { ul: ['Use the **right angle** between a tangent and a radius', 'Follow and write the **steps of construction** of the tangents', 'Find the **length** of a tangent and the **angle** between two tangents', 'Handle **concentric circles** and tangents at a given angle'], n: 'These are your goals for part one. You will use the right angle between a tangent and a radius. You will follow and write the steps of the construction. You will find the length of a tangent and the angle between two tangents, and you will solve problems on concentric circles.' }),
    sl('concept', 'A tangent and the radius to its point of contact', { b: 'A tangent meets the circle in **one point** $T$, the **point of contact**. The radius $OT$ is **perpendicular** to the tangent, and every other point of the tangent lies outside the circle.', m: [r`OT \perp \text{tangent at } T`], ul: ['the tangent at $T$ is the **only** line through $T$ that does not enter the circle', 'from a point **inside** the circle no tangent can be drawn'], v: G.fTouch, n: 'A tangent meets the circle in one point only, called the point of contact. The radius to that point is perpendicular to the tangent. Every other point of the tangent lies outside the circle, as the dashed line from O to Q shows, because it is longer than the radius. From a point inside a circle no tangent can be drawn at all.' }),
    sl('concept', 'Two tangents from an outside point', { b: 'From an outside point $P$ two tangents $PA$ and $PB$ can be drawn. They are **equal**, and the line $PO$ **bisects** the angle between them.', m: [r`PA = PB, \qquad PA^2 = OP^2 - r^2`], ul: ['the right triangles $OAP$ and $OBP$ are congruent: same $OP$, same radius', 'so $\\angle APO = \\angle BPO$ and $\\angle AOP = \\angle BOP$'], v: G.fTwo, n: 'Here the circle has radius two point five centimetres and P is six point five centimetres from the centre. The tangents P A and P B are equal. The two right triangles share the side O P and have equal radii, so they are congruent. That gives equal tangents, and the line P O bisects the angle at P. Each tangent is six centimetres long, since six point five squared minus two point five squared is thirty six.' }),
    sl('concept', 'Steps of construction of the tangents', { b: 'The points of contact must see $OP$ at a **right angle**, so they lie on the circle with $OP$ as diameter.', ul: ['join $OP$ and bisect it at $M$', 'draw the circle with centre $M$ and radius $MO$', 'it cuts the given circle at $A$ and $B$', 'join $PA$ and $PB$'], v: fTan, n: 'Here are the steps of construction. Join O to P and bisect it, with arcs of equal radius from O and from P, to get the mid point M. With centre M and radius M O draw a circle. It passes through O and P and cuts the given circle at two points, A and B. Join P to A and P to B. These are the two tangents.' }),
    sl('concept', 'The construction on the page', { b: 'Keep **every arc**: the marks are for the construction. The circle on $OP$ as diameter passes through $O$, $A$, $P$ and $B$.', v: G.fBuild, n: 'This is the finished construction for a circle of radius three centimetres and a point five centimetres from the centre. The mid point M of O P is two point five centimetres from each end. The circle about M cuts the given circle at A above and B below. The two tangents P A and P B are then drawn with a ruler. Leave all the arcs visible.' }),
    sl('example', 'Worked example 1: measure and check', { b: 'Construct the tangents from $P$, $OP = 5$ cm, to a circle of radius $3$ cm. Measure $PA$ and $\\angle APB$, and check by calculation.', ul: ['**Step 1 —** $\\angle OAP = 90^\\circ$, so $PA = \\sqrt{5^2 - 3^2} = \\sqrt{16} = 4$ cm; measuring gives $PA = PB = 4.0$ cm.', `**Step 2 —** $\\sin\\angle APO = \\dfrac{3}{5} = 0.6$, so $\\angle APO \\approx ${f2(T35.angAPO)}^\\circ$.`, `**Step 3 —** $\\angle APB = 2 \\times ${f2(T35.angAPO)}^\\circ = ${f2(T35.between)}^\\circ$, which measures $${rd(T35.between)}^\\circ$ to the nearest degree.`], v: G.fTitle, n: 'In the right triangle O A P the longest side is five and one leg is three, so P A is the square root of sixteen, which is four centimetres. Measuring on the drawing gives the same. The sine of the angle at P is three over five, which is point six, so the angle is about thirty six point eight seven degrees. Doubling gives seventy three point seven four, so the angle between the tangents is seventy four degrees to the nearest degree.' }),
    sl('check', 'Quick check: which circle?', { b: 'Which circle locates the points of contact?', chk: 'm01', n: 'Think about which circle passes through every point that sees the segment O P at a right angle.' }),
    sl('concept', 'Why the construction works', { b: 'Every point of the circle on $OP$ as diameter sees $OP$ at a **right angle** (angle in a semicircle). So at the point $A$ where it meets the given circle, $\\angle OAP = 90^\\circ$ and $PA$ is perpendicular to the radius $OA$: $PA$ is a tangent.', v: G.fWhy, n: 'Here the circle with diameter O P has centre M and radius two point five centimetres. The point A is on this circle, so the angle O A P is an angle in a semicircle and is a right angle. A is also on the given circle, so O A is a radius. A line at a right angle to a radius at its end touches the circle, so P A is a tangent.' }),
    sl('check', 'Quick check: tangent and radius', { b: 'What angle does the radius make with the tangent?', chk: 'm02', n: 'Recall the key property that links a tangent to the radius at its point of contact.' }),
    sl('example', 'Worked example 2: tangents at a given angle', { b: 'Two tangents to a circle of radius $3$ cm are inclined at $60^\\circ$. Find $OP$ and the length of each tangent.', ul: ['**Step 1 —** $PO$ bisects the angle, so $\\angle APO = 30^\\circ$ and $\\sin 30^\\circ = \\dfrac{1}{2} = \\dfrac{3}{OP}$.', '**Step 2 —** $OP = 3 \\div \\dfrac{1}{2} = 6$ cm.', `**Step 3 —** $PA = \\sqrt{6^2 - 3^2} = \\sqrt{27} \\approx ${f1(T36.len)}$ cm.`], v: G.fWE3, n: 'The line P O bisects the sixty degree angle, so the angle at P in the right triangle is thirty degrees. The sine of thirty degrees is one half, which equals three over O P. So O P is three divided by one half, which is six centimetres. Then each tangent is the square root of six squared minus three squared, which is the square root of twenty seven, about five point two centimetres.' }),
    sl('check', 'Quick check: equal tangents', { b: 'Which statement is true for every pair of tangents?', chk: 'm04', n: 'Compare the two right triangles formed with the centre.' }),
    sl('concept', 'Concentric circles and a touching chord', { b: 'Two circles with the **same centre** and radii $R > r$. A chord $PQ$ of the larger circle that touches the smaller circle at $T$ is **bisected** at $T$, because $OT \\perp PQ$.', m: [r`PQ = 2\sqrt{R^2 - r^2}`], v: G.fConc, n: 'Two circles share the centre O, with radii five and three centimetres. A chord P Q of the larger circle touches the smaller one at T. The radius O T is perpendicular to the chord, and a perpendicular from the centre to a chord bisects it. So the chord is twice the square root of R squared minus r squared.' }),
    sl('example', 'Worked example 3: a plank across a ring', { b: 'A plank is a chord of a circle of radius $5$ m and just touches a concentric circle of radius $3$ m. Find its length.', ul: ['**Step 1 —** $OT \\perp PQ$, so $PT = \\sqrt{5^2 - 3^2} = \\sqrt{16} = 4$ m.', '**Step 2 —** $T$ is the mid-point, so $PQ = 2 \\times 4 = 8$ m.'], v: G.fConc, n: 'The radius to the touching point is three metres and is perpendicular to the plank. In the right triangle O T P the longest side is five, so P T is the square root of twenty five minus nine, which is four metres. The touching point is the mid point of the plank, so the plank is two times four, which is eight metres long.' }),
    sl('check', 'Quick check: a point inside', { b: 'How many tangents from a point inside the circle?', chk: 'm20', n: 'Compare the distance of the point from the centre with the radius.' }),
    sl('summary', 'Summary', { ul: ['The radius to the point of contact is **perpendicular** to the tangent', 'Two tangents from $P$ are **equal** and $PO$ bisects the angle between them', 'Construction: circle on **$OP$ as diameter** cuts the circle at $A$ and $B$', 'Length $\\sqrt{OP^2 - r^2}$; angle $\\angle APB = 2\\sin^{-1}\\dfrac{r}{OP}$'], v: tSum1, n: 'To sum up part one. The radius to the point of contact is perpendicular to the tangent. Two tangents from a point are equal and the line to the centre bisects the angle between them. To construct them draw the circle on O P as diameter, and join P to the two points where it cuts the circle. The tangent length comes from Pythagoras, and the angle from the sine ratio.' }),
    sl('exam-tips', 'Exam tips: how marks are awarded', { ul: ['**Given figure (1–2 marks):** circle with the exact radius, $P$ at the exact distance', '**Construction (2–3 marks):** perpendicular bisector of $OP$, the circle on $OP$, tangents joined; arcs left visible', '**Measurement (1–2 marks):** tangent length to $0.1$ cm, angle to the nearest degree', '**Mistake:** a bisecting radius smaller than half of $OP$, so the arcs do not cross', '**Mistake:** drawing the second circle with centre $P$ instead of $M$', '**Habit:** check $PA$ with $\\sqrt{OP^2 - r^2}$'], n: 'In the exam, draw the circle and the point with exact measurements. For the construction show the perpendicular bisector of O P, the circle on O P as diameter and the two tangents, with all arcs visible. Measure the tangent to a tenth of a centimetre. Common slips are using a radius smaller than half of O P so the arcs do not cross, and drawing the second circle about P instead of about the mid point.' }),
  ],
});

const d2 = deck({
  part: 2,
  title: 'Constructions — Part 2: Circumcircle, incircle and the regular hexagon',
  goals: ['Construct the circumcircle of a triangle and say where its centre lies for acute, right and obtuse triangles', 'Construct the incircle of a triangle and measure its radius', 'Construct a regular hexagon and draw its circumcircle and incircle', 'Calculate and check the radii against the measured values'],
  slides: [
    sl('title', 'Circles of a triangle and a hexagon', { b: 'Every triangle has a circle **through its three corners**, the **circumcircle**, and a circle **touching its three sides**, the **incircle**. A regular hexagon has both too.', v: G.fCircEq, n: 'Welcome to part two. Here is an equilateral triangle with side six centimetres. The perpendicular bisectors of its sides meet at the centre O, and the circle about O through the corners is the circumcircle. In this part we construct the circumcircle and the incircle of a triangle, and of a regular hexagon, and we measure their radii.' }),
    sl('concept', 'What you will be able to do', { ul: ['Construct the **circumcircle** with perpendicular bisectors', 'Construct the **incircle** with angle bisectors', 'Say where the **circumcentre** lies for each kind of triangle', 'Construct a **regular hexagon** with its two circles'], n: 'These are your goals for part two. You will construct the circumcircle with perpendicular bisectors and the incircle with angle bisectors. You will say where the circumcentre lies for each kind of triangle. Finally you will construct a regular hexagon with its circumcircle and its incircle.' }),
    sl('concept', 'The circumcircle', { b: 'The perpendicular bisectors of the three sides meet at one point, the **circumcentre** $O$. It is equally far from the three corners, so the circle with centre $O$ and radius $OA$ passes through $A$, $B$ and $C$.', m: [r`OA = OB = OC = R`], v: G.fCirc1, n: 'The perpendicular bisector of a side holds every point equally far from the two ends of that side. The three bisectors meet at one point, O. So O is equally far from A, B and C, and the circle with centre O and radius O A passes through all three corners. The dashed segments carry one tick because they are equal. This circle is the circumcircle.' }),
    sl('concept', 'Steps of construction: circumcircle', { b: 'Two perpendicular bisectors are enough to fix $O$; the third is a check.', v: fCircSteps, n: 'First draw the triangle to the measurements given. Then draw the perpendicular bisectors of two of the sides, using equal arcs from each end. They meet at the circumcentre O. With centre O and radius O A draw the circle, which should pass through B and C as well. Finally measure the radius with a ruler.' }),
    sl('example', 'Worked example 1: circumcircle of a triangle', { b: 'Construct triangle $ABC$ with $BC = 7$ cm, $AB = 5$ cm and $\\angle B = 60^\\circ$. Draw its circumcircle and measure the radius.', ul: ['**Step 1 —** draw $BC$, make $\\angle B = 60^\\circ$ and cut $BA = 5$ cm; then $AC^2 = 7^2 + 5^2 - 2 \\times 7 \\times 5 \\times \\dfrac{1}{2} = 39$, so $AC \\approx ' + f1(tC.b) + '$ cm.', '**Step 2 —** draw the perpendicular bisectors of $AB$ and $BC$; they meet at $O$ inside the triangle.', `**Step 3 —** the circle with centre $O$ through $A$ passes through $B$ and $C$; its radius measures $${f1(tC.R)}$ cm.`], v: G.fCircSAS, n: 'Draw B C seven centimetres, make a sixty degree angle at B and cut B A five centimetres. By the cosine rule A C squared is thirty nine, so A C is about six point two centimetres. Draw the perpendicular bisectors of A B and B C. They meet at O inside the triangle. The circle about O through A also passes through B and C, and its radius measures about three point six centimetres.' }),
    sl('check', 'Quick check: finding the circumcentre', { b: 'Which lines meet at the circumcentre?', chk: 'm05', n: 'Remember which lines are made of points equally far from two corners.' }),
    sl('concept', 'Where is the circumcentre?', { b: 'The position depends on the **largest angle**. If $a^2 + b^2 = c^2$ the triangle is right-angled; if $a^2 + b^2 < c^2$ it is obtuse.', ul: ['**acute** triangle: $O$ is **inside**', '**right** triangle: $O$ is the **mid-point of the hypotenuse**', '**obtuse** triangle: $O$ is **outside**, beyond the longest side'], v: G.fCircObt, n: 'Here is a triangle with sides eight, five and four. Four squared plus five squared is forty one, which is less than eight squared, sixty four, so the triangle is obtuse. Its perpendicular bisectors meet outside the triangle, beyond the longest side. For an acute triangle the circumcentre is inside, and for a right triangle it is the mid point of the hypotenuse.' }),
    sl('concept', 'A right triangle: the hypotenuse is a diameter', { b: 'In a right triangle the circumcentre is the **mid-point of the hypotenuse**, so the hypotenuse is a **diameter** and $R = \\dfrac{\\text{hypotenuse}}{2}$.', m: [r`R = \dfrac{10}{2} = 5`], v: G.fCircRt, n: 'This triangle has sides six, eight and ten. The right angle is at A. The circumcentre sits at the mid point of the hypotenuse B C, so the hypotenuse is a diameter of the circumcircle. The radius is half of ten, which is five centimetres. This is the converse of the angle in a semicircle.' }),
    sl('concept', 'The incircle', { b: 'The bisectors of the three angles meet at one point, the **incentre** $I$, which is equally far from the three **sides**. The circle with centre $I$ touching the sides is the **incircle**.', v: G.fBisect, n: 'A point on an angle bisector is equally far from the two sides of the angle. The bisectors of the three angles meet at one point, the incentre I, which is equally far from all three sides. The circle about I that touches the sides is the incircle. In this figure the two halves of angle B carry one arc each, and the halves of angle C carry two arcs each.' }),
    sl('concept', 'Steps of construction: incircle', { b: 'Two angle bisectors fix $I$. The radius is the **perpendicular** distance from $I$ to a side.', v: fInSteps, n: 'Draw the triangle first. Bisect two of its angles with arcs and a ruler. The bisectors meet at the incentre I. From I draw a perpendicular to one side, which meets it at D. With centre I and radius I D draw the circle. It touches all three sides, each at the foot of a perpendicular from I.' }),
    sl('example', 'Worked example 2: incircle and touching points', { b: 'Triangle $ABC$ has $BC = 6.5$ cm, $CA = 7$ cm and $AB = 7.5$ cm. Find the inradius and the lengths from each vertex to the points of contact.', ul: ['**Step 1 —** $s = \\dfrac{6.5 + 7 + 7.5}{2} = 10.5$ and the area is $\\sqrt{10.5 \\times 4 \\times 3.5 \\times 3} = \\sqrt{441} = 21$ cm$^2$.', '**Step 2 —** $r = \\dfrac{21}{10.5} = 2$ cm; the drawing shows $ID = IE = IF = 2.0$ cm.', '**Step 3 —** tangents from a vertex are equal: $AF = AE = s - a = 4$, $BD = BF = s - b = 3.5$, $CD = CE = s - c = 3$ (cm), and $4 + 3.5 = 7.5 = AB$.'], v: G.fIn1, n: 'The semi perimeter is ten point five. The area by Heron is the square root of ten point five times four times three point five times three, which is twenty one. So the inradius is twenty one over ten point five, which is two centimetres. The two tangents from a vertex to the incircle are equal. From A they are ten point five minus six point five, which is four. From B they are three point five, and from C they are three.' }),
    sl('check', 'Quick check: the incentre', { b: 'Where must the centre of the tank be?', chk: 'm06', n: 'The tank must be equally far from all three edges of the lawn.' }),
    sl('example', 'Worked example 3: an equilateral triangle', { b: 'Construct an equilateral triangle of side $6$ cm. Draw its incircle and circumcircle and compare the radii.', ul: [`**Step 1 —** the bisectors and the perpendicular bisectors are the same lines, so the circles have the **same centre**.`, `**Step 2 —** measuring gives $R \\approx ${f1(eq.R)}$ cm and $r \\approx ${f1(eq.r)}$ cm.`, '**Step 3 —** $R = 2r$: the circumcentre divides each height in the ratio $2 : 1$.'], v: G.fInEq, n: 'In an equilateral triangle each perpendicular bisector is also an angle bisector, so the circumcentre and the incentre are the same point. Measuring the radii on an accurate drawing gives about three point five centimetres for the circumcircle and about one point seven centimetres for the incircle. The circumradius is exactly twice the inradius.' }),
    sl('concept', 'The regular hexagon', { b: 'A regular hexagon is made of **six equilateral triangles** meeting at the centre $O$. So its side equals the radius of the circle through its corners, and each side subtends $60^\\circ$ at $O$.', v: G.fHexTri, n: 'A regular hexagon splits into six equilateral triangles that meet at the centre. Each triangle has all sides four centimetres here, and each angle at O is sixty degrees. So the distance from the centre to a corner equals the side. This is why a hexagon can be constructed by stepping the radius round a circle.' }),
    sl('concept', 'Steps of construction: regular hexagon', { b: 'The circle you draw is already the **circumcircle**.', v: fHexSteps, n: 'To construct a regular hexagon with side a, draw a circle of radius a with centre O and mark a point A on it. With the same radius and centre A cut the circle at B. Continue round with centres B, C, D and E to mark the remaining points. Join the six points in order. The circle you started with passes through all six corners, so it is the circumcircle.' }),
    sl('example', 'Worked example 4: hexagon with its two circles', { b: 'A regular hexagon has side $4$ cm. Draw its circumcircle and incircle and find both radii.', ul: ['**Step 1 —** $R = 4$ cm, the side.', '**Step 2 —** the incircle touches each side at its mid-point $M$; $OM^2 = 4^2 - 2^2 = 12$.', `**Step 3 —** $OM = \\sqrt{12} \\approx ${f1(hx4.ap)}$ cm, which the drawing confirms.`], v: G.fHex4, n: 'The circumradius equals the side, four centimetres. The incircle touches each side at its mid point M, and the radius O M is perpendicular to the side. In the right triangle O M A the longest side is four and one leg is half the side, two. So O M squared is sixteen minus four, which is twelve, and O M is about three point five centimetres.' }),
    sl('check', 'Quick check: hexagon radius', { b: 'What is the radius of the circle through the corners?', chk: 'm09', n: 'Use the six equilateral triangles that make up the hexagon.' }),
    sl('example', 'Worked example 5: hexagon in a given circle', { b: 'Construct a regular hexagon in a circle of radius $3.5$ cm. Find its side, its perimeter and the radius of its incircle.', ul: ['**Step 1 —** the side equals the radius: $3.5$ cm.', '**Step 2 —** the perimeter is $6 \\times 3.5 = 21$ cm.', `**Step 3 —** the incircle radius is $3.5 \\sin 60^\\circ \\approx ${f1(hx35.ap)}$ cm.`], v: G.fHexBuild, n: 'The side of the hexagon equals the radius of the circle, three point five centimetres. The perimeter is six times three point five, which is twenty one centimetres. The incircle radius is the height of one equilateral triangle, three point five times the sine of sixty degrees, which is about three point zero centimetres to the nearest tenth.' }),
    sl('check', 'Quick check: where the incircle touches', { b: 'At which points does the incircle touch the sides?', chk: 'm10', n: 'Think about the perpendicular from the centre to a side.' }),
    sl('summary', 'Summary', { ul: ['**Circumcircle:** perpendicular bisectors meet at $O$; passes through the **corners**', '**Incircle:** angle bisectors meet at $I$; touches the **sides**, $r = \\dfrac{\\text{area}}{s}$', '**Circumcentre:** inside (acute), mid-point of hypotenuse (right), outside (obtuse)', '**Hexagon:** $R = a$ and $r = a \\sin 60^\\circ$'], v: tCentres, n: 'To sum up part two. The circumcircle passes through the corners and its centre is where the perpendicular bisectors meet. The incircle touches the sides and its centre is where the angle bisectors meet. The circumcentre is inside an acute triangle, at the middle of the hypotenuse of a right triangle, and outside an obtuse triangle. For a regular hexagon the circumradius equals the side and the inradius is the side times the sine of sixty degrees.' }),
    sl('exam-tips', 'Exam tips: how marks are awarded', { ul: ['**Triangle (2–3 marks):** exact lengths and angles', '**Circle construction (2–3 marks):** two perpendicular bisectors or two angle bisectors, arcs left visible', '**Radius (1–2 marks):** measured to $0.1$ cm with units; check with a formula', '**Mistake:** using the angle bisectors for the circumcircle, or the perpendicular bisectors for the incircle', '**Mistake:** the incircle radius taken from $I$ to a vertex instead of to a side', '**Habit:** the hexagon is made of six equilateral triangles'], n: 'In the exam, draw the triangle with exact measurements. Show two perpendicular bisectors for the circumcircle, or two angle bisectors for the incircle, with the arcs visible. Measure the radius to a tenth of a centimetre and write the unit. Common slips are using the wrong kind of bisector for the circle, and measuring the incircle radius to a vertex instead of to a side.' }),
  ],
});

// ================================================================ notes
const notes = {
  unit: 'icse-10-mathematics-ch18', version: 1, title: 'Constructions: Tangents and Circles — chapter notes', language: 'en',
  sections: [
    { heading: '1. Tangent and radius', body_md: r`- A **tangent** meets a circle in **one** point, the **point of contact** $T$.
- The radius $OT$ is **perpendicular** to the tangent; every other point of the tangent is outside the circle.
- From a point on the circle there is **one** tangent; from a point inside there is **none**; from a point outside there are **two**.

*Example:* $OP = 5$, $r = 3$: $PT = \sqrt{5^2 - 3^2} = 4$.`, key_terms: [{ term: 'Tangent', definition_md: 'A line that touches a circle at exactly one point.' }, { term: 'Point of contact', definition_md: 'The point where a tangent touches the circle; the radius to it is perpendicular to the tangent.' }], formulas: [{ latex: 'PT^2 = OP^2 - r^2', label: 'Length of a tangent from $P$' }], visual: G.fTouch, visuals: [G.fTwo], topic_ids: [topic(1)] },
    { heading: '2. Constructing tangents from an external point', body_md: r`- **Steps of construction:** join $OP$; bisect it at $M$; with centre $M$ and radius $MO$ draw a circle; it cuts the given circle at $A$ and $B$; join $PA$ and $PB$.
- **Why it works:** $A$ is on the circle with diameter $OP$, so $\angle OAP = 90^\circ$ (angle in a semicircle).
- The tangents are equal, $PA = PB$, and $PO$ bisects $\angle APB$.
- $\sin\angle APO = \dfrac{r}{OP}$, so $\angle APB = 2\sin^{-1}\dfrac{r}{OP}$ and $\angle AOB = 180^\circ - \angle APB$.

*Example:* $r = 3$, $OP = 5$: $PA = 4$, $\angle APB \approx 74^\circ$, $\angle AOB \approx 106^\circ$.`, key_terms: [{ term: 'Circle on OP as diameter', definition_md: 'The auxiliary circle whose intersections with the given circle are the points of contact.' }], formulas: [{ latex: '\\angle APB = 2\\sin^{-1}\\left(\\dfrac{r}{OP}\\right)', label: 'Angle between the tangents' }], visual: fTan, visuals: [G.fBuild, G.fWhy, G.fWE3, tSum1], topic_ids: [topic(1)] },
    { heading: '3. Concentric circles', body_md: r`- A chord of the larger circle (radius $R$) that touches the smaller one (radius $r$) is **bisected** at the point of contact.
- Its length is $2\sqrt{R^2 - r^2}$.
- Tangents from a point of the **outer** circle to the **inner** circle are parts of such chords.

*Example:* $R = 5$, $r = 3$: chord $= 2 \times 4 = 8$.`, key_terms: [{ term: 'Concentric circles', definition_md: 'Circles with the same centre and different radii.' }], formulas: [{ latex: '2\\sqrt{R^2 - r^2}', label: 'Chord of the larger circle touching the smaller' }], visual: G.fConc, visuals: [], topic_ids: [topic(1)] },
    { heading: '4. The circumcircle of a triangle', body_md: r`- The **perpendicular bisectors** of the sides meet at the **circumcentre** $O$; $OA = OB = OC = R$.
- **Steps:** draw the triangle; perpendicular bisectors of two sides meet at $O$; circle with centre $O$ and radius $OA$; measure $R$.
- Acute triangle: $O$ **inside**. Right triangle: $O$ is the **mid-point of the hypotenuse**, $R = \dfrac{c}{2}$. Obtuse triangle: $O$ **outside**.
- Check: $R = \dfrac{abc}{4 \times \text{area}}$.

*Example:* $BC = 7$, $AB = 5$, $\angle B = 60^\circ$: $R \approx 3.6$ cm.`, key_terms: [{ term: 'Circumcircle', definition_md: 'The circle through the three vertices of a triangle.' }, { term: 'Circumcentre', definition_md: 'The point where the perpendicular bisectors of the sides meet.' }], formulas: [{ latex: 'R = \\dfrac{abc}{4K}', label: 'Circumradius, $K$ the area' }], visual: G.fCirc1, visuals: [fCircSteps, G.fCircSAS, G.fCircRt, G.fCircObt, tPos], topic_ids: [topic(2)] },
    { heading: '5. The incircle of a triangle', body_md: r`- The **angle bisectors** meet at the **incentre** $I$, equally far from the three sides; $ID = IE = IF = r$, each perpendicular to its side.
- **Steps:** draw the triangle; bisect two angles; they meet at $I$; draw $ID$ perpendicular to a side; circle with centre $I$ and radius $ID$.
- $r = \dfrac{\text{area}}{s}$ where $s$ is the semi-perimeter; for a right triangle $r = \dfrac{a + b - c}{2}$.
- Tangents from a vertex are equal: $AF = AE = s - a$.

*Example:* sides $6.5$, $7$, $7.5$: $s = 10.5$, area $21$, $r = 2$ cm.`, key_terms: [{ term: 'Incircle', definition_md: 'The circle that touches the three sides of a triangle from inside.' }, { term: 'Incentre', definition_md: 'The point where the angle bisectors meet.' }], formulas: [{ latex: 'r = \\dfrac{K}{s}', label: 'Inradius' }], visual: G.fBisect, visuals: [fInSteps, G.fIn1, G.fInRt, tCentres], topic_ids: [topic(2)] },
    { heading: '6. The regular hexagon', body_md: r`- A regular hexagon is **six equilateral triangles** around the centre $O$: side $a$, $R = a$, each angle at $O$ is $60^\circ$.
- **Steps:** circle of radius $a$ about $O$; mark $A$; with the same radius cut $B$, $C$, $D$, $E$, $F$ round the circle; join in order.
- The circle drawn is the **circumcircle**. The **incircle** has centre $O$ and radius $OM$ with $M$ the mid-point of a side: $r = a\sin 60^\circ = \dfrac{a\sqrt{3}}{2}$.
- Perimeter $6a$.

*Example:* $a = 4$: $R = 4$, $r = \sqrt{12} \approx 3.5$.`, key_terms: [{ term: 'Regular hexagon', definition_md: 'A six-sided figure with equal sides and equal angles of $120^\\circ$.' }], formulas: [{ latex: 'r = a \\sin 60^\\circ', label: 'Inradius of a regular hexagon of side $a$' }], visual: G.fHexTri, visuals: [fHexSteps, G.fHexBuild, G.fHex4, tHex], topic_ids: [topic(3)] },
    { heading: '7. Measuring and checking', body_md: r`- Measure lengths to **0.1 cm** and angles to the **nearest degree**; write the unit.
- Always check a measured value with a calculation: $\sqrt{OP^2 - r^2}$ for tangents; $\dfrac{abc}{4K}$ and $\dfrac{K}{s}$ for the two radii; $a\sin 60^\circ$ for the hexagon.
- Keep every construction arc; label every point.
- Ring between two circles: $\pi(R^2 - r^2)$.

*Example:* hexagon side $5$: ring area $3.14 \times 6.25 \approx 19.6$ cm$^2$.`, key_terms: [{ term: 'Steps of construction', definition_md: 'The numbered list of what you draw, in order, written with the figure.' }], formulas: [{ latex: '\\pi(R^2 - r^2)', label: 'Area of a ring' }], visual: tCentres, visuals: [], topic_ids: [topic(2), topic(3)] },
  ],
  exam_tips_md: r`**How marks are awarded**
- *Given figure (1–3 marks):* exact radius, lengths and angles.
- *Construction (2–4 marks):* perpendicular bisector of $OP$ and the circle on $OP$; or two perpendicular bisectors or two angle bisectors; arcs left visible.
- *Measurement and check (1–3 marks):* lengths to $0.1$ cm, angles to the nearest degree, with a calculation.
- *10-mark structured question:* parts (a), (b), (c), usually $3 + 3 + 4$: the figure, then the construction, then the measurements.

**Common mistakes**
1. Drawing the second circle with centre $P$ instead of the mid-point $M$ of $OP$.
2. Using angle bisectors for the circumcircle, or perpendicular bisectors for the incircle.
3. Measuring the inradius to a vertex instead of to a side.
4. Forgetting that the circumcentre of an obtuse triangle is outside it.
5. Taking the inradius of a hexagon as its side.
6. Rubbing out the construction arcs.`,
  status: 'draft', provenance: d1.provenance,
};

// ================================================================ flashcards
const fc = (id, front_md, back_md, tag, t) => ({ id, front_md, back_md, tag, topic_id: topic(t) });
const flashcards = {
  unit: 'icse-10-mathematics-ch18', version: 1, language: 'en',
  cards: [
    fc('f01', 'What is a **tangent** to a circle?', 'A line that meets the circle in exactly one point.', 'definition', 1),
    fc('f02', 'How is the radius to the point of contact related to the tangent?', 'It is perpendicular to the tangent.', 'concept', 1),
    fc('f03', 'How many tangents can be drawn from a point (a) outside, (b) on, (c) inside a circle?', '(a) two, (b) one, (c) none.', 'concept', 1),
    fc('f04', 'Tangents $PA$ and $PB$ from $P$: what do you know about $PA$ and $PB$?', '$PA = PB$, and $PO$ bisects $\\angle APB$.', 'concept', 1),
    fc('f05', 'Length of a tangent from $P$, with $OP = d$ and radius $r$?', '$\\sqrt{d^2 - r^2}$.', 'formula', 1),
    fc('f06', '$OP = 13$, $r = 5$. Length of the tangent?', '$\\sqrt{13^2 - 5^2} = 12$.', 'example', 1),
    fc('f07', 'Which circle gives the points of contact in the construction?', 'The circle with $OP$ as diameter.', 'concept', 1),
    fc('f08', 'Steps of construction of tangents from $P$?', 'Join $OP$; bisect it at $M$; circle with centre $M$ through $O$ and $P$; it cuts the circle at $A$, $B$; join $PA$, $PB$.', 'concept', 1),
    fc('f09', 'Why is $\\angle OAP = 90^\\circ$ in that construction?', 'It is an angle in a semicircle, on the circle with diameter $OP$.', 'concept', 1),
    fc('f10', 'Formula for the angle between two tangents?', '$\\angle APB = 2\\sin^{-1}\\left(\\dfrac{r}{OP}\\right)$.', 'formula', 1),
    fc('f11', '$r = 3$, $OP = 5$: $\\sin\\angle APO$?', '$\\dfrac{3}{5} = 0.6$, so $\\angle APO \\approx 36.87^\\circ$ and $\\angle APB \\approx 74^\\circ$.', 'example', 1),
    fc('f12', '$\\angle APB + \\angle AOB = $ ?', '$180^\\circ$ (the kite $OAPB$ has two right angles).', 'concept', 1),
    fc('f13', 'A chord of the larger of two concentric circles touches the smaller. Its length?', '$2\\sqrt{R^2 - r^2}$.', 'formula', 1),
    fc('f14', '$R = 5$, $r = 3$: chord touching the inner circle?', '$2\\sqrt{25 - 9} = 8$.', 'example', 1),
    fc('f15', 'What is the **circumcircle** of a triangle?', 'The circle through the three vertices.', 'definition', 2),
    fc('f16', 'Which lines meet at the circumcentre?', 'The perpendicular bisectors of the sides.', 'definition', 2),
    fc('f17', 'Where is the circumcentre of an acute, a right and an obtuse triangle?', 'Inside; at the mid-point of the hypotenuse; outside.', 'concept', 2),
    fc('f18', 'Circumradius of a right triangle?', 'Half the hypotenuse.', 'formula', 2),
    fc('f19', 'What is the **incircle** of a triangle?', 'The circle that touches the three sides from inside.', 'definition', 2),
    fc('f20', 'Which lines meet at the incentre?', 'The bisectors of the angles.', 'definition', 2),
    fc('f21', 'Formula for the inradius?', '$r = \\dfrac{\\text{area}}{s}$, $s$ the semi-perimeter.', 'formula', 2),
    fc('f22', 'Inradius of a right triangle with legs $a$, $b$ and hypotenuse $c$?', '$\\dfrac{a + b - c}{2}$.', 'formula', 2),
    fc('f23', 'Tangent lengths from the vertices to the incircle?', '$s - a$, $s - b$, $s - c$ from $A$, $B$, $C$.', 'formula', 2),
    fc('f24', 'How many bisectors do you need to draw to find the incentre?', 'Two; the third is a check.', 'exam-tip', 2),
    fc('f25', 'How are the radii of the two circles of an equilateral triangle related?', '$R = 2r$, and the centres coincide.', 'concept', 2),
    fc('f26', 'A regular hexagon of side $a$: circumradius?', '$R = a$.', 'formula', 3),
    fc('f27', 'A regular hexagon of side $a$: inradius?', '$a\\sin 60^\\circ = \\dfrac{a\\sqrt{3}}{2}$.', 'formula', 3),
    fc('f28', 'Steps of construction of a regular hexagon?', 'Circle of radius $a$; mark $A$; with the same radius step round to $B$, $C$, $D$, $E$, $F$; join in order.', 'concept', 3),
    fc('f29', 'Where does the incircle of a regular hexagon touch a side?', 'At the mid-point of the side.', 'concept', 3),
    fc('f30', 'Which common mistake do students make with circles of a triangle?', 'Using angle bisectors for the circumcircle, or perpendicular bisectors for the incircle.', 'exam-tip', 2),
  ],
  status: 'draft', provenance: d1.provenance,
};

// ================================================================ release + tests
const release = {
  unit: 'icse-10-mathematics-ch18', version: 1, academic_year: '2026-27', created_at: '2026-11-02T00:00:00+05:30',
  decks: [d1, d2], notes, flashcards, questions: [],
  build: { run_id: null, checks: {
    syllabus: 'topics t01 to t03 exactly as in the ICSE 2027 syllabus: constructing tangents from an external point with measurement; circumscribing and inscribing a circle on a triangle; regular hexagon with its circumcircle and incircle.',
    figures: 'every figure is drawn from computed coordinates; the builders assert right angles at the points of contact, equal tangents, points on the circle with diameter OP, equal distances from the circumcentre to the vertices and from the incentre to the sides, right angles at the touching points, tangent lengths s - a, s - b, s - c, the hexagon sides, angles and circles, and that numeric segment labels equal the true lengths on one scale',
    constructions: 'every constructed point is an exact intersection of the loci a student draws (circles, perpendicular bisectors, angle bisectors) and every value a student would measure (lengths to 0.1 cm, angles to the nearest degree) is computed and asserted against the model answer; exact working lines are checked by an exact parser',
  } },
};
const tests = chapterTests('Constructions: Tangents and Circles', {
  A: ['m07', 'm11', 'm16', 'ar4', 's301', 's303'],
  B: ['l01', 'l04'],
}, {
  A: ['m12', 'm13', 'm14', 'm17', 'm18', 'm19', 'ar2', 'ar5', 's401', 's403', 's405'],
  B: ['l02', 'l05', 'l07'],
});
build({ dir: DIR, release, testsSpec: tests });
void sinD; void asinD; void hexagon;
