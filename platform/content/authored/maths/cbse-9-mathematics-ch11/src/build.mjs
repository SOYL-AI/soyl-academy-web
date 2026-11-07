// Build CBSE 9 Mathematics ch11 Circles. Run from platform/:
//   npx tsx content/_stage/maths/cbse-9-mathematics-ch11/src/build.mjs
// Every figure is drawn from computed coordinates (figs.mjs); every angle and length in a table or worked example is computed from
// coordinates on a circle, and every equation solved in a slide is solved here by search or by Cramer's rule and asserted.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, topic, deck, sl, table, flow, build, chapterTests } from './lib.mjs';
import { r, must, close, range, dist, polar, angleAt, circumcentre, lineDist, mid } from './h.mjs';
import { fTerms, fTwoPts, fCircum, fEqual, fPerp, fEquid, fWE2, fWE3, fCentreRim, fProof1, fCases, fSameSeg, fSemi, fCyc, fCycProof, fConv, T3, T3O, T3R, cycPts, O } from './figs.mjs';

setUnit('cbse-9-mathematics-ch11', 'claude-sonnet-5-5 (writer); reviewed by claude-opus-5-5 (subject-producer)');
await import('./questions.mjs');
await import('./questions2.mjs');
await import('./questions3.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const half = (rr, d) => Math.sqrt(rr * rr - d * d);
const cyclic = (pts) => { const c = circumcentre(pts[0], pts[1], pts[2]); return !!c && Math.abs(dist(c, pts[3]) - dist(c, pts[0])) < 1e-9; };

// ================================================================ tables, deck 1
const tTerms = table(['Term', 'Meaning', 'In the figure'], [
  ['Circle', 'All points at the same distance from a fixed point', 'The whole curve'],
  ['Centre and radius', 'The fixed point, and the distance from it to the circle', '$O$ and $OA$'],
  ['Chord', 'A segment joining two points of the circle', '$DE$'],
  ['Diameter', 'A chord through the centre; the longest chord, of length $2r$', '$BC$'],
  ['Arc', 'A part of the circle between two of its points', 'Arc $AC$'],
  ['Segment', 'The region between a chord and an arc', 'Above $DE$'],
  ['Sector', 'The region between two radii and an arc', '$OAC$'],
], 'Table of circle terms: circle, centre and radius, chord, diameter, arc, segment and sector, each with its meaning and where it appears in the figure.', 'The parts of a circle.');
must(dist(O, polar(O, 3, 77)) === 3, 'terms');

// circle through three points: perpendicular bisector equations a x + b y = c from the coordinates
const bis = (p, q) => { const a = 2 * (q[0] - p[0]), b = 2 * (q[1] - p[1]), c = q[0] ** 2 + q[1] ** 2 - p[0] ** 2 - p[1] ** 2; return [a, b, c]; };
const e1 = bis(T3.A, T3.B), e2 = bis(T3.B, T3.C);
must(e1.join() === '14,-2,60' && e2.join() === '-6,18,60', 'bisector coefficients');
const solve = ([a1, b1, c1], [a2, b2, c2]) => { const D = a1 * b2 - a2 * b1; return [(c1 * b2 - c2 * b1) / D, (a1 * c2 - a2 * c1) / D]; };
const sol3 = solve(e1, e2);
must(close(sol3[0], 5) && close(sol3[1], 5) && close(T3O[0], 5) && close(T3O[1], 5) && close(T3R, 5) && 7 * 5 - 5 === 30 && -5 + 3 * 5 === 10, 'WE1 centre (5, 5)');
must(close(dist(T3O, T3.A), 5) && close(dist(T3O, T3.B), 5) && close(dist(T3O, T3.C), 5) && 16 + 9 === 25 && 9 + 16 === 25 && 0 + 25 === 25, 'WE1 radius 5');
const tConstr = table(['Step', 'What to do', 'Why'], [
  ['1', 'Join $A$ to $B$ and $B$ to $C$', 'Two chords of the circle that we want'],
  ['2', 'Draw the perpendicular bisector of $AB$', 'The centre is equally far from $A$ and $B$'],
  ['3', 'Draw the perpendicular bisector of $BC$', 'The centre is equally far from $B$ and $C$'],
  ['4', 'Mark the point $O$ where they meet', 'It is equally far from $A$, $B$ and $C$'],
  ['5', 'Draw the circle with centre $O$ and radius $OA$', 'It passes through $B$ and $C$ as well'],
], 'Table of five steps to draw the circle through three points: join the points in pairs, draw two perpendicular bisectors, mark where they meet as the centre, and draw the circle with that centre through the first point.', 'Constructing the circle through three points that are not in one line.');
const tWE1 = table(['Step', 'Working', 'Result'], [
  ['Points', r`$A(1, 2)$, $B(8, 1)$, $C(5, 10)$`, 'Not in one line'],
  ['Bisector of $AB$', r`$(x - 1)^2 + (y - 2)^2 = (x - 8)^2 + (y - 1)^2$`, r`$7x - y = 30$`],
  ['Bisector of $BC$', r`$(x - 8)^2 + (y - 1)^2 = (x - 5)^2 + (y - 10)^2$`, r`$-x + 3y = 10$`],
  ['Solve', r`$x = 3y - 10$, so $7(3y - 10) - y = 30$`, r`$y = 5$, $x = 5$: $O(5, 5)$`],
  ['Radius', r`$OA = \sqrt{4^2 + 3^2}$`, r`$5$; also $OB = OC = 5$`],
], 'Table: for the points A(1, 2), B(8, 1) and C(5, 10), the perpendicular bisector of AB is 7x minus y equals 30 and the bisector of BC is minus x plus 3y equals 10. Solving gives the centre O(5, 5), and the radius OA is 5, which is also OB and OC.', 'The centre is where the two perpendicular bisectors meet.');
const tEqProof = table(['Step', 'Statement', 'Reason'], [
  ['1', r`$OA = OC$ and $OB = OD$`, 'Radii of the same circle'],
  ['2', r`$AB = CD$`, 'Given: the chords are equal'],
  ['3', r`$\triangle AOB \cong \triangle COD$`, 'Three pairs of equal sides (side, side, side)'],
  ['4', r`$\angle AOB = \angle COD$`, 'Corresponding parts of congruent triangles'],
  ['Check', r`$70^\circ = 70^\circ$`, r`Figure: both chords subtend $70^\circ$`],
], 'Table: equal chords AB and CD subtend equal angles at the centre. The radii are equal and the chords are equal, so the triangles AOB and COD are congruent by three equal sides, and the angles at the centre are equal. In the figure both are 70 degrees.', 'Equal chords subtend equal angles at the centre. The converse follows from two sides and the included angle.');
const tPerpProof = table(['Step', 'Statement', 'Reason'], [
  ['1', r`$OM \perp AB$, so $\angle OMA = \angle OMB = 90^\circ$`, 'Given'],
  ['2', r`$OA = OB$`, 'Radii (the hypotenuses)'],
  ['3', r`$OM = OM$`, 'Common side'],
  ['4', r`$\triangle OMA \cong \triangle OMB$`, 'Right angle, hypotenuse, side (RHS)'],
  ['5', r`$AM = MB$`, 'Corresponding parts: $OM$ bisects the chord'],
  ['Check', r`$AM = MB = 4$ cm`, r`Figure: $\sqrt{5^2 - 3^2} = 4$`],
], 'Table: the perpendicular OM from the centre to the chord AB makes two right triangles with equal hypotenuses OA and OB and a common side OM. They are congruent, so AM equals MB. In the figure both are 4 centimetres.', 'The perpendicular from the centre bisects the chord. Conversely, the line from the centre to the mid-point of a chord is perpendicular to it.');
must(Math.hypot(4, 3) === 5 && half(5, 3) === 4, 'perp numbers');
const WE2 = { r: 25, d: 7, h: 24 };
must(half(WE2.r, WE2.d) === WE2.h && 2 * WE2.h === 48 && 7 ** 2 + 24 ** 2 === 25 ** 2, 'WE2');
const WE3 = { r: 25, d1: 7, d2: 15 };
const h1 = half(WE3.r, WE3.d1), h2 = half(WE3.r, WE3.d2);
must(h1 === 24 && h2 === 20 && 2 * h1 === 48 && 2 * h2 === 40 && WE3.d1 + WE3.d2 === 22 && WE3.d2 - WE3.d1 === 8, 'WE3');
const tWE3 = table(['Chord', 'Half-chord', 'Distance from $O$'], [
  [r`$PQ = 48$ cm`, r`$24$ cm`, r`$\sqrt{25^2 - 24^2} = 7$ cm`],
  [r`$RS = 40$ cm`, r`$20$ cm`, r`$\sqrt{25^2 - 20^2} = 15$ cm`],
  ['Opposite sides of $O$', 'Add the distances', r`$7 + 15 = 22$ cm`],
  ['Same side of $O$', 'Subtract the distances', r`$15 - 7 = 8$ cm`],
], 'Table: two parallel chords of 48 and 40 centimetres in a circle of radius 25 centimetres are 7 and 15 centimetres from the centre. On opposite sides of the centre they are 22 centimetres apart; on the same side they are 8 centimetres apart.', 'Parallel chords: add the distances if they are on opposite sides of the centre, subtract if they are on the same side.');
const goalFlow1 = flow('LR', [['a', 'Circle terms'], ['b', 'Circle through three points'], ['c', 'Equal chords and angles at the centre'], ['d', 'Perpendicular from the centre'], ['e', 'Equal chords and distances']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow of Part 1: circle terms, the circle through three points, equal chords and the angles they subtend at the centre, the perpendicular from the centre to a chord, and equal chords and their distances from the centre.', 'Part 1 road map.');
const sum1 = flow('LR', [['a', 'One circle through three points'], ['b', 'Equal chords: equal angles at the centre'], ['c', 'Perpendicular from the centre bisects the chord'], ['d', 'Equal chords: equal distances from the centre']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Summary flow of Part 1: one circle through three points, equal chords subtend equal angles at the centre, the perpendicular from the centre bisects the chord, and equal chords are equally far from the centre.', 'Four facts about circles and chords.');

// ================================================================ deck 1
const d1 = deck({
  part: 1,
  title: 'Circles: Part 1, circle terms, the circle through three points and chords',
  goals: ['Name the parts of a circle', 'Construct the unique circle through three points that are not in one line', 'Prove that equal chords subtend equal angles at the centre, and the converse', 'Prove that the perpendicular from the centre bisects a chord, and use it with Pythagoras', 'Show that equal chords are equally far from the centre, and the converse'],
  slides: [
    sl('title', 'A wheel, a coin, a plate', { b: 'Every wheel, coin and plate is a **circle**: all the points of its edge are at the same distance from one point, the **centre**.', v: fTerms, n: `Think of a wheel, a coin or a round plate. Every point on its edge is at the same distance from one point inside it, the centre. That fixed distance is called the radius. In this chapter we meet the parts of a circle, and then discover some surprising rules that connect chords, angles and arcs.` }),
    sl('concept', 'What you will be able to do', { ul: ['Name the **parts** of a circle', 'Draw the **one circle** through three points', 'Use **equal chords** and **equal angles** at the centre', 'Use the **perpendicular from the centre** to a chord', 'Compare chords by their **distance** from the centre'], v: goalFlow1, n: `In this part we first learn the names of the parts of a circle. Then we see that exactly one circle passes through three points that are not in a line. After that we study chords: equal chords and the angles they make at the centre, the perpendicular from the centre, and how far chords lie from the centre.` }),
    sl('diagram', 'Parts of a circle', { b: r`A circle has centre $O$. The segment $OA$ is a **radius**, $DE$ is a **chord** and $BC$ is a **diameter**, a chord through the centre. Part of the circle, like the arc $AC$, is an **arc**.`, v: fTerms, n: `In the figure, O is the centre. The segment O A is a radius. The segment D E joins two points of the circle, so it is a chord. The segment B C is a chord that passes through the centre, so it is a diameter. A part of the circle itself, like the curve from A to C, is an arc.` }),
    sl('concept', 'Circle terms', { b: r`A chord cuts a circle into two **segments**. Two radii cut it into two **sectors**. A diameter cuts it into two **semicircles**.`, v: tTerms, n: `Here is a table of the terms. A chord is a segment joining two points of the circle. The diameter is the longest chord, and its length is twice the radius. A segment is the region between a chord and an arc. A sector is the region between two radii and an arc. A diameter cuts the circle into two equal semicircles.` }),
    sl('check', 'Quick check: a chord through the centre', { b: 'A chord that passes through the centre of a circle has a special name. What is it?', v: fTerms, chk: 'm01', n: `Look at the segment B C in the figure.` }),
    sl('diagram', 'Circles through two points', { b: r`Many circles pass through two given points $A$ and $B$. Their centres all lie on the **perpendicular bisector** of $AB$, because every centre is equally far from $A$ and $B$.`, v: fTwoPts, n: `Take two points, A and B. You can draw many different circles through both of them. A centre must be at the same distance from A and from B, so every centre lies on the perpendicular bisector of the segment A B. The three circles in the figure have their centres on that dashed line. Two points are not enough to fix a circle.` }),
    sl('diagram', 'Three points fix one circle', { b: r`Take **three points** $A$, $B$, $C$ that are **not in one line**. The perpendicular bisectors of $AB$ and $BC$ meet at exactly one point $O$, which is equally far from all three. So **exactly one circle** passes through $A$, $B$ and $C$.`, v: fCircum, n: `Now take three points that are not in a straight line. The centre must lie on the perpendicular bisector of A B and also on the perpendicular bisector of B C. Two such lines meet at just one point, called O. That point is equally far from all three points, so exactly one circle passes through them. If the three points were in a line, no circle would pass through them.` }),
    sl('concept', 'Constructing the circle', { b: 'Follow these steps with a ruler and a pair of compasses.', v: tConstr, n: `To draw the circle through three points, join the points in pairs. Draw the perpendicular bisector of each of the two chords. Mark the point where the bisectors meet, and call it O. Place the compass point on O, and open it to reach the first point. The circle you draw passes through the other two points as well.` }),
    sl('example', 'Worked example 1: find the centre on a grid', { b: r`Find the centre and radius of the circle through $A(1, 2)$, $B(8, 1)$ and $C(5, 10)$.`, ul: [r`**Bisector of $AB$ —** equal distances from $A$ and $B$ give $7x - y = 30$`, r`**Bisector of $BC$ —** equal distances from $B$ and $C$ give $-x + 3y = 10$`, r`**Solve —** $x = 3y - 10$, so $20y = 100$, $y = 5$, $x = 5$`, r`**Radius —** $OA = \sqrt{4^2 + 3^2} = 5$, and $OB = OC = 5$ too`], v: tWE1, n: `Write that a point is equally far from A and from B, and simplify. That gives the first bisector. Do the same for B and C. Solving the two equations gives the centre at five, five. The distance from the centre to A is five, and the distances to B and C are also five. So the circle has radius five.` }),
    sl('diagram', 'Equal chords subtend equal angles at the centre', { b: r`If two chords of a circle are **equal**, they subtend **equal angles at the centre**. In the figure $AB = CD$ and both $\angle AOB$ and $\angle COD$ are $70^\circ$.`, v: fEqual, n: `Look at the two chords A B and C D. They have the same length. Each chord makes an angle at the centre, and both angles are seventy degrees. Equal chords always subtend equal angles at the centre. We prove it by looking at the two triangles that the chords make with the radii.` }),
    sl('concept', 'Proof and converse', { b: r`The proof uses congruent triangles. The **converse** is also true: if two chords subtend equal angles at the centre, the chords are equal (two radii and the included angle are equal).`, v: tEqProof, n: `In the triangles A O B and C O D, the radii are equal, and the chords are equal. So the triangles are congruent, because their three sides are equal. Then the angles at the centre are equal. The converse works the other way. If the angles at the centre are equal, two sides and the angle between them are equal, so again the triangles are congruent and the chords are equal.` }),
    sl('diagram', 'The perpendicular from the centre', { b: r`Draw $OM$ from the centre $O$ **perpendicular** to the chord $AB$. Then $M$ is the **mid-point** of the chord: $AM = MB$.`, v: fPerp, n: `Draw a line from the centre of the circle, at right angles to a chord. It meets the chord at a point M. In the figure the chord is eight centimetres long, and M splits it into two parts of four centimetres each. The perpendicular from the centre always bisects the chord, that is, it cuts the chord into two equal parts.` }),
    sl('concept', 'Why the perpendicular bisects the chord', { b: 'Two right triangles with equal hypotenuses and a common side are congruent. The **converse** is also true: the line from the centre to the mid-point of a chord is perpendicular to the chord.', v: tPerpProof, n: `Join the centre to both ends of the chord. This gives two right triangles. Their longest sides are radii, so they are equal. They share the side O M. So the two triangles are congruent, and the two halves of the chord are equal. The converse follows from three equal sides: then the two angles at M are equal and add up to a straight angle, so each is a right angle.` }),
    sl('check', 'Quick check: find the radius', { b: 'A chord of a clay lid is eighteen centimetres long and twelve centimetres from the centre. What is the radius?', v: fPerp, chk: 'm02', n: `Half the chord and the distance are the two short sides of a right triangle.` }),
    sl('example', 'Worked example 2: a chord and Pythagoras', { b: r`A chord $AB$ of a circle of radius $25$ cm is $7$ cm from the centre. Find the length of the chord.`, ul: [r`**Perpendicular bisects —** $OM = 7$ cm and $OA = 25$ cm`, r`**Half the chord —** $AM = \sqrt{25^2 - 7^2} = \sqrt{576} = 24$ cm`, r`**The chord —** $AB = 2 \times 24 = 48$ cm`], v: fWE2, n: `The perpendicular from the centre bisects the chord, so we get a right triangle with the radius as the longest side. The radius is twenty-five and one short side is seven. The other short side is the square root of six hundred twenty-five minus forty-nine, which is the square root of five hundred seventy-six, that is twenty-four. The whole chord is twice that, forty-eight.` }),
    sl('diagram', 'Equal chords are equally far from the centre', { b: r`If two chords are **equal**, they are at **equal distances from the centre**: here $AB = CD = 8$ cm and $OM = ON = 3$ cm. The **converse** is also true: chords at equal distances from the centre are equal.`, v: fEquid, n: `Here are two chords, each eight centimetres long, in a circle of radius five. The perpendicular distances from the centre are both three centimetres. Equal chords are equally far from the centre. The converse is true too: if two chords are the same distance from the centre, they are equal. And the nearer a chord is to the centre, the longer it is.` }),
    sl('example', 'Worked example 3: parallel chords', { b: r`Two parallel chords $PQ = 48$ cm and $RS = 40$ cm lie in a circle of radius $25$ cm, on opposite sides of the centre. Find the distance between them.`, ul: [r`**$PQ$ —** half is $24$, so its distance is $\sqrt{25^2 - 24^2} = 7$ cm`, r`**$RS$ —** half is $20$, so its distance is $\sqrt{25^2 - 20^2} = 15$ cm`, r`**Opposite sides —** add: $7 + 15 = 22$ cm`], v: fWE3, n: `For each chord, take half its length and use Pythagoras with the radius to find its distance from the centre. The chord of forty-eight is seven away. The chord of forty is fifteen away. They are on opposite sides of the centre, so we add the distances and get twenty-two. If they were on the same side, we would subtract, and get eight.` }),
    sl('check', 'Quick check: equal chords', { b: 'Two chords of the same length lie in one circle. One is six centimetres from the centre. How far is the other?', v: fEquid, chk: 'm03', n: `Think of equal chords and their distances from the centre.` }),
    sl('diagram', 'A second look at the three points', { b: r`The **perpendicular bisector of every chord** passes through the **centre**. So two chords are enough to locate the centre, for example of a **broken plate**.`, v: fCircum, n: `Here is the circle through three points again. The perpendicular bisector of every chord passes through the centre. That is why two of them locate the centre exactly. This also tells you how to find the centre of a round plate from a broken piece of its rim. Draw two chords, bisect them at right angles, and see where the bisectors meet.` }),
    sl('summary', 'Summary', { ul: [r`Chord, diameter, arc, segment, sector: the **parts** of a circle`, r`Exactly **one circle** passes through three points that are not in a line; its centre is where the perpendicular bisectors meet`, r`**Equal chords** subtend **equal angles** at the centre, and conversely`, r`The **perpendicular from the centre** bisects the chord, and conversely; chord length: $2\sqrt{r^2 - d^2}$`, r`**Equal chords** are **equidistant** from the centre, and conversely`], v: sum1, n: `To sum up. A circle has chords, a diameter, arcs, segments and sectors. One circle passes through three points that are not in a line. Equal chords make equal angles at the centre. The perpendicular from the centre bisects a chord. And equal chords are the same distance from the centre. Each of these facts also works in the reverse direction.` }),
    sl('exam-tips', 'Exam tips: how marks are awarded', { ul: ['**Chord numericals (2–3 marks):** draw the perpendicular from the centre, write half the chord, then use Pythagoras', '**Proofs (3 marks):** name the congruence (side side side, or right angle hypotenuse side) and give a reason for each step', '**Mistake:** using the whole chord instead of half the chord in Pythagoras', '**Mistake:** forgetting to add or subtract distances for parallel chords'], n: `In chord problems, draw the perpendicular from the centre, write the half chord, and then use Pythagoras. In proofs, name the congruence you use and give a reason beside every step. Two common slips: using the whole chord instead of half of it, and forgetting whether parallel chords are on the same side of the centre or on opposite sides.` }),
  ],
});

// ================================================================ tables, deck 2
must(true, 'deck 2 start');
const tProof1 = table(['Step', 'Statement', 'Reason'], [
  ['1', r`$OP = OA$, so $\angle OAP = \angle OPA$`, 'Radii; base angles of an isosceles triangle'],
  ['2', r`$\angle AOQ = \angle OPA + \angle OAP = 2\angle OPA$`, 'Exterior angle of triangle $OPA$'],
  ['3', r`$\angle BOQ = 2\angle OPB$`, 'The same reasoning in triangle $OPB$'],
  ['4', r`$\angle AOB = \angle AOQ + \angle BOQ = 2(\angle OPA + \angle OPB)$`, 'Add steps 2 and 3'],
  ['5', r`$\angle AOB = 2\angle APB$`, r`$\angle OPA + \angle OPB = \angle APB$`],
  ['Check', r`$2 \times 45^\circ = 90^\circ$ and $2 \times 30^\circ = 60^\circ$`, r`Figure: $90^\circ + 60^\circ = 150^\circ = 2 \times 75^\circ$`],
], 'Table: the angle at the centre is double the angle at the circumference. OP equals OA, so the angles OAP and OPA are equal; the exterior angle AOQ is twice OPA. In the same way BOQ is twice OPB. Adding gives AOB equal to twice APB. In the figure 90 plus 60 is 150, which is twice 75.', 'The angle at the centre is twice the angle at the circumference.');
const tCases = table(['Case', 'Where is $O$?', 'Why the result holds', 'Numbers'], [
  ['1', r`Inside $\angle APB$`, r`Add $\angle AOQ$ and $\angle BOQ$`, r`$150^\circ = 2 \times 75^\circ$`],
  ['2', r`On the side $PB$`, r`$\angle AOB$ is an exterior angle of the isosceles triangle $OPA$`, r`$90^\circ = 2 \times 45^\circ$`],
  ['3', r`Outside $\angle APB$`, r`Subtract: $\angle AOB = \angle AOQ - \angle BOQ$`, r`$50^\circ = 70^\circ - 20^\circ = 2 \times 25^\circ$`],
], 'Table of the three positions of the centre O: inside the angle APB, where the two exterior angles are added; on the side PB, where one exterior angle is enough; and outside the angle, where the two are subtracted. The numbers are 150 equals 2 times 75, 90 equals 2 times 45 and 50 equals 2 times 25.', 'The centre may be inside the angle, on one arm, or outside; the result is the same.');
must(50 === 70 - 20 && 2 * 25 === 50 && 150 === 90 + 60, 'cases numbers');
const tWE1d2 = table(['Given', 'Rule', 'Result'], [
  [r`Arc $AB$ subtends $140^\circ$ at the centre`, 'Rim angle is half the centre angle', r`$140^\circ \div 2 = 70^\circ$`],
  [r`$\angle APB = 38^\circ$ at $P$ on the major arc`, 'Centre angle is double the rim angle', r`$2 \times 38^\circ = 76^\circ$`],
  [r`Arc $AB$ subtends $140^\circ$; $R$ is on the minor arc`, 'The quadrilateral $APBR$ is cyclic', r`$180^\circ - 70^\circ = 110^\circ$`],
], 'Table of three cases. An arc that subtends 140 degrees at the centre gives 70 degrees on the major arc. A rim angle of 38 degrees gives 76 degrees at the centre. A point on the minor arc of the same chord sees 180 minus 70, which is 110 degrees.', 'Using the theorem in both directions.');
must(140 / 2 === 70 && 2 * 38 === 76 && 180 - 70 === 110, 'WE1 numbers');
{
  const A = polar(O, 4, 200), B = polar(O, 4, 340), Rm = polar(O, 4, 270);
  must(close(angleAt(Rm, A, B), 110), 'minor arc 110');
}
// semicircle worked example: diameter 26 cm, AP = 10 cm
const WE2s = { dia: 26, ap: 10 };
const bp = Math.sqrt(WE2s.dia ** 2 - WE2s.ap ** 2);
must(bp === 24 && 10 ** 2 + 24 ** 2 === 26 ** 2, 'semicircle triple');
const tWE2d2 = table(['Given', 'Reason', 'Result'], [
  [r`$AB$ is a diameter of length $26$ cm`, 'Angle in a semicircle', r`$\angle APB = 90^\circ$`],
  [r`$AP = 10$ cm`, 'Pythagoras in the right triangle $APB$', r`$BP = \sqrt{26^2 - 10^2} = \sqrt{576} = 24$ cm`],
  [r`$\angle PBA = 52^\circ$`, r`Angles of triangle $APB$ add up to $180^\circ$`, r`$\angle PAB = 180^\circ - 90^\circ - 52^\circ = 38^\circ$`],
], 'Table: for a diameter AB of 26 centimetres and a point P on the circle, the angle APB is a right angle. If AP is 10 centimetres, BP is the square root of 676 minus 100, which is 24 centimetres. If the angle PBA is 52 degrees, the angle PAB is 180 minus 90 minus 52, which is 38 degrees.', 'The angle in a semicircle is a right angle, so right-triangle facts apply.');
must(180 - 90 - 52 === 38 && 26 ** 2 - 10 ** 2 === 576, 'WE2 numbers');
const tQuad = (() => {
  const shapes = [
    ['Rectangle', [[0, 0], [6, 0], [6, 4], [0, 4]], 'All four angles are $90^\\circ$, so opposite angles add up to $180^\\circ$'],
    ['Square', [[0, 0], [4, 0], [4, 4], [0, 4]], 'A rectangle with equal sides'],
    ['Isosceles trapezium', [[0, 0], [8, 0], [6, 3], [2, 3]], 'Opposite angles are supplementary'],
    ['Rhombus that is not a square', [[0, 0], [5, 3], [10, 0], [5, -3]], 'Opposite angles are equal, so they add up to $180^\\circ$ only if each is $90^\\circ$'],
    ['Parallelogram that is not a rectangle', [[0, 0], [6, 0], [8, 3], [2, 3]], 'Opposite angles are equal but not right angles'],
  ];
  const expect = [true, true, true, false, false];
  must(shapes.every((s, i) => cyclic(s[1]) === expect[i]), 'which quadrilaterals are cyclic');
  return table(['Quadrilateral', 'Can all four corners lie on a circle?', 'Reason'], shapes.map((s, i) => [s[0], expect[i] ? 'Always' : 'Not in general', s[2]]), 'Table of five quadrilaterals. A rectangle, a square and an isosceles trapezium always have all four corners on a circle. A rhombus that is not a square and a parallelogram that is not a rectangle do not, because their opposite angles do not add up to 180 degrees.', 'Which quadrilaterals are cyclic.');
})();
const x3 = range(1, 80).filter((x) => 2 * x + 4 === 3 * x - 26);
const q3 = cycPts([70, 58, 96, 136], 15);
must(x3.join() === '30' && 2 * 30 + 4 === 64 && 3 * 30 - 26 === 64 && close(q3.angD, 64) && close(q3.angB, 116) && 180 - 64 === 116, 'WE3 deck 2');
const tWE3d2 = table(['Step', 'Working', 'Result'], [
  ['Exterior angle', r`$\angle CBE = \angle ADC$ (opposite interior angle)`, r`$3x - 26 = 2x + 4$`],
  ['Solve', r`$x = 30$`, r`$\angle ADC = 64^\circ$`],
  ['Interior angle at $B$', r`$\angle ABC = 180^\circ - 64^\circ$`, r`$116^\circ$`],
  ['Check', r`$\angle ABC + \angle ADC = 116^\circ + 64^\circ$`, r`$180^\circ$`],
], 'Table: in a cyclic quadrilateral ABCD with the side AB produced to E, the exterior angle CBE equals the opposite interior angle ADC. Setting 3x minus 26 equal to 2x plus 4 gives x equal to 30, so the angle ADC is 64 degrees and the angle ABC is 116 degrees; 116 plus 64 is 180.', 'The exterior angle of a cyclic quadrilateral equals the interior opposite angle.');
const goalFlow2 = flow('LR', [['a', 'Angle at the centre and at the circumference'], ['b', 'Angles in the same segment'], ['c', 'Angle in a semicircle'], ['d', 'Cyclic quadrilaterals and their converse']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow of Part 2: the angle at the centre is double the angle at the circumference, angles in the same segment are equal, the angle in a semicircle is a right angle, and cyclic quadrilaterals with their converse.', 'Part 2 road map.');
const sum2 = flow('LR', [['a', 'Centre angle = 2 x rim angle'], ['b', 'Same segment: equal angles'], ['c', 'Semicircle: 90 degrees'], ['d', 'Cyclic quadrilateral: opposite angles add to 180']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Summary flow of Part 2: the angle at the centre is twice the angle at the circumference, angles in the same segment are equal, the angle in a semicircle is 90 degrees, and opposite angles of a cyclic quadrilateral add up to 180 degrees.', 'Four angle facts about circles.');

// ================================================================ deck 2
const d2 = deck({
  part: 2,
  title: 'Circles: Part 2, angles subtended by arcs and cyclic quadrilaterals',
  goals: ['Prove that the angle at the centre is double the angle at the circumference', 'Show that angles in the same segment are equal and that the angle in a semicircle is a right angle', 'Prove that opposite angles of a cyclic quadrilateral add up to 180 degrees, and the converse', 'Use these facts to find unknown angles'],
  slides: [
    sl('title', 'Seeing the same stage from different seats', { b: 'People sitting along the curved wall of a round hall see the stage at the **same angle**. This part explains why.', v: fSameSeg, n: `Imagine a round hall with a stage along one side. People sitting along the curved wall of the hall all see the two ends of the stage at the same angle. In this part we find out why, and we meet the most useful angle facts about circles, which help us find unknown angles quickly.` }),
    sl('concept', 'What you will be able to do', { ul: ['Compare the angle at the **centre** and at the **circumference**', 'Use **angles in the same segment**', 'Use the **angle in a semicircle**', 'Use **cyclic quadrilaterals** and their converse'], v: goalFlow2, n: `We begin with the key theorem, that the angle at the centre is double the angle at the circumference. From it we get angles in the same segment and the angle in a semicircle. Finally we study quadrilaterals whose four corners lie on a circle, and find a test that tells us when a quadrilateral has this property.` }),
    sl('diagram', 'The angle at the centre', { b: r`The arc $AB$ subtends $\angle AOB = 140^\circ$ at the centre and $\angle APB = 70^\circ$ at the point $P$ of the remaining part of the circle. **Theorem:** the angle at the centre is **double** the angle at the circumference.`, v: fCentreRim, n: `An arc subtends an angle at the centre, and also at any point of the circle on the remaining part. In the figure the arc at the bottom subtends one hundred forty degrees at the centre, and seventy degrees at the point P on the top. The angle at the centre is double the angle at the circumference. Now we prove it.` }),
    sl('diagram', 'Setting up the proof', { b: r`Join $PO$ and extend it to meet the circle at $Q$. Then $OP = OA = OB$, because all are **radii**. The triangles $OPA$ and $OPB$ are **isosceles**.`, ul: [r`$\angle AOQ$ is an exterior angle of triangle $OPA$`, r`$\angle BOQ$ is an exterior angle of triangle $OPB$`], v: fProof1, n: `Join P to the centre O and extend the line until it meets the circle again at Q. The segments O P, O A and O B are all radii, so the triangles O P A and O P B are isosceles. The angles A O Q and B O Q are exterior angles of these two triangles. That is the key to the proof.` }),
    sl('concept', 'Proof when the centre is inside the angle', { b: 'The exterior angle of a triangle is the sum of the two interior opposite angles. Each isosceles triangle has equal base angles.', v: tProof1, n: `In triangle O P A, the sides O P and O A are equal, so the angles at P and at A are equal. The exterior angle A O Q is the sum of these two, so it is twice the angle O P A. In the same way, B O Q is twice O P B. Adding, the angle A O B is twice the angle A P B. In the figure, ninety plus sixty is one hundred fifty, which is twice seventy-five.` }),
    sl('diagram', 'The other two positions of the centre', { b: r`The centre may lie **on a side** of the angle (left), or **outside** the angle (right). The proof is the same: one exterior angle, or the difference of two.`, v: fCases, n: `The centre may lie on one arm of the angle, as in the left circle. Then one exterior angle does the job. Or the centre may lie outside the angle, as in the right circle. Then we subtract the two exterior angles. In both cases the angle at the centre is double the angle at the circumference, ninety is twice forty-five, and fifty is twice twenty-five.` }),
    sl('example', 'Worked example 1: using the theorem', { b: 'Use the theorem in both directions, and the cyclic quadrilateral for the minor arc.', ul: [r`**Centre to rim —** $140^\circ \div 2 = 70^\circ$`, r`**Rim to centre —** $2 \times 38^\circ = 76^\circ$`, r`**Minor arc —** $180^\circ - 70^\circ = 110^\circ$`], v: tWE1d2, n: `When an arc subtends one hundred forty degrees at the centre, the angle on the major arc is half of that, seventy degrees. When the angle on the rim is thirty-eight, the angle at the centre is double, seventy-six. A point on the minor arc of the same chord sees one hundred eighty minus seventy, which is one hundred ten degrees.` }),
    sl('check', 'Quick check: the wheel', { b: 'Two spokes of a wheel make one hundred twelve degrees at the hub. A point on the rim, on the longer arc, sees the chord at what angle?', v: fCentreRim, chk: 'm04', n: `Use the theorem about the centre and the circumference.` }),
    sl('diagram', 'Angles in the same segment', { b: r`Points $P$ and $Q$ in the **same segment** on a chord $AB$ see it at the **same angle**: each is half the angle at the centre. Here $\angle APB = \angle AQB = 40^\circ$, half of $80^\circ$.`, ul: [r`$\angle APB = \tfrac{1}{2}\angle AOB$ and $\angle AQB = \tfrac{1}{2}\angle AOB$`, 'So the two angles are equal, whatever the points'], v: fSameSeg, n: `Two points P and Q lie on the same side of the chord A B, in the same segment. Each of the two angles is half of the angle at the centre on the same arc, so the two angles are equal. In the figure the angle at the centre is eighty degrees, and both angles at the circumference are forty degrees.` }),
    sl('diagram', 'Angle in a semicircle', { b: r`A diameter $AB$ subtends a **straight angle** $180^\circ$ at the centre, so it subtends **half** of it, $90^\circ$, at every point $P$ of the circle: the **angle in a semicircle is a right angle**.`, v: fSemi, n: `Take a diameter A B. At the centre, it makes a straight angle of one hundred eighty degrees. A point P on the circle sees it at half of that, which is ninety degrees. So the angle in a semicircle is a right angle. This is why a set square corner fits exactly into a semicircular shape.` }),
    sl('example', 'Worked example 2: a diameter and a point', { b: r`$AB$ is a diameter of length $26$ cm and $P$ is a point of the circle with $AP = 10$ cm. Find $BP$. If $\angle PBA = 52^\circ$, find $\angle PAB$.`, ul: [r`**Right angle —** $\angle APB = 90^\circ$ (semicircle)`, r`**Pythagoras —** $BP = \sqrt{26^2 - 10^2} = \sqrt{576} = 24$ cm`, r`**Angles —** $\angle PAB = 180^\circ - 90^\circ - 52^\circ = 38^\circ$`], v: tWE2d2, n: `Since A B is a diameter, the angle at P is a right angle. In the right triangle, the longest side is the diameter, twenty-six. With one short side ten, the other is the square root of six hundred seventy-six minus one hundred, which is twenty-four. The angle P A B is one hundred eighty minus ninety minus fifty-two, which is thirty-eight degrees.` }),
    sl('check', 'Quick check: same segment', { b: 'Two points of a circle on the same side of a chord see it at thirty-seven degrees from one point. What is the angle from the other point?', v: fSameSeg, chk: 'm05', n: `Remember angles in the same segment.` }),
    sl('diagram', 'Cyclic quadrilaterals', { b: r`A quadrilateral whose four corners lie on a circle is **cyclic**. **Theorem:** its **opposite angles** are **supplementary**. Here $\angle A + \angle C = 80^\circ + 100^\circ = 180^\circ$ and $\angle B + \angle D = 95^\circ + 85^\circ = 180^\circ$.`, v: fCyc, n: `A quadrilateral with all four corners on a circle is called a cyclic quadrilateral. In the figure the angles are eighty, ninety-five, one hundred and eighty-five degrees. The two opposite angles at A and C add up to one hundred eighty degrees, and so do the two opposite angles at B and D. This is true for every cyclic quadrilateral.` }),
    sl('diagram', 'Why opposite angles add up to 180', { b: r`Join $O$ to $B$ and $D$. The arc $BCD$ subtends $160^\circ$ at $O$ on one side and the arc $BAD$ subtends the rest, $200^\circ$. So $\angle A = \tfrac{1}{2} \times 160^\circ = 80^\circ$ and $\angle C = \tfrac{1}{2} \times 200^\circ = 100^\circ$.`, ul: [r`In general $\angle A = \dfrac{x}{2}$ and $\angle C = \dfrac{360^\circ - x}{2}$`, r`So $\angle A + \angle C = 180^\circ$`], v: fCycProof, n: `Join the centre to B and D. The arc B C D subtends one hundred sixty degrees at the centre, so the angle at A is half of it, eighty degrees. The other arc subtends the rest of the full turn, two hundred degrees, so the angle at C is one hundred degrees. In general the two angles are half of x and half of three hundred sixty minus x, and together they make one hundred eighty degrees.` }),
    sl('diagram', 'The converse and the exterior angle', { b: r`**Converse:** if the **opposite angles** of a quadrilateral add up to $180^\circ$, its corners lie on a **circle**. Here $\angle P + \angle R = 85^\circ + 95^\circ = 180^\circ$, and so the circle through $P$, $Q$, $S$ passes through $R$. Also, an **exterior angle** equals the opposite interior angle.`, v: fConv, n: `The converse is also true. If the opposite angles of a quadrilateral add up to one hundred eighty degrees, then a circle passes through all four corners. In the figure, eighty-five and ninety-five make one hundred eighty, and the circle through three corners also passes through the fourth. A useful consequence: if a side is extended, the exterior angle equals the opposite interior angle.` }),
    sl('concept', 'Which quadrilaterals are cyclic?', { b: 'Test each quadrilateral with the converse theorem. Compare opposite angles.', v: tQuad, n: `Use the test on some familiar shapes. A rectangle and a square have four right angles, so they can be drawn inside a circle. An isosceles trapezium has supplementary opposite angles, so it can too. A rhombus that is not a square, and a parallelogram that is not a rectangle, have equal opposite angles that do not add up to one hundred eighty, so they cannot.` }),
    sl('example', 'Worked example 3: an exterior angle', { b: r`$ABCD$ is a cyclic quadrilateral and the side $AB$ is produced to $E$, with $\angle CBE = (3x - 26)^\circ$ and $\angle ADC = (2x + 4)^\circ$. Find $x$, $\angle ADC$ and $\angle ABC$.`, ul: [r`**Exterior angle —** $\angle CBE = \angle ADC$, so $3x - 26 = 2x + 4$`, r`**Solve —** $x = 30$, so $\angle ADC = 64^\circ$`, r`**Interior angle —** $\angle ABC = 180^\circ - 64^\circ = 116^\circ$`], v: tWE3d2, n: `The exterior angle of a cyclic quadrilateral equals the interior opposite angle. So three x minus twenty-six equals two x plus four, and x is thirty. Then the angle at D is sixty-four degrees. The interior angle at B is one hundred eighty minus sixty-four, which is one hundred sixteen. And one hundred sixteen plus sixty-four is one hundred eighty, as it should be.` }),
    sl('check', 'Quick check: cyclic quadrilateral', { b: 'In a cyclic quadrilateral, one angle is one hundred seven degrees. What is the opposite angle?', v: fCyc, chk: 'm06', n: `Opposite angles of a cyclic quadrilateral add up to a straight angle.` }),
    sl('summary', 'Summary', { ul: [r`The angle at the **centre** is **double** the angle at the circumference on the same arc`, r`Angles in the **same segment** are **equal**`, r`The angle in a **semicircle** is $90^\circ$`, r`**Cyclic quadrilateral:** opposite angles add up to $180^\circ$; the exterior angle equals the opposite interior angle`, r`**Converse:** supplementary opposite angles mean the quadrilateral is cyclic`], v: sum2, n: `To sum up. The angle at the centre is double the angle at the circumference. Angles in the same segment are equal. The angle in a semicircle is a right angle. The opposite angles of a cyclic quadrilateral add up to one hundred eighty degrees, and the exterior angle equals the opposite interior angle. The converse tells us when a quadrilateral can be inscribed in a circle.` }),
    sl('exam-tips', 'Exam tips: how marks are awarded', { ul: ['**Angle problems (2–3 marks):** name the theorem, then calculate', '**Proofs (3–5 marks):** join the centre, mark equal radii, use the exterior angle', '**Mistake:** halving when the angle is at the circumference (the circumference angle is the smaller one)', '**Mistake:** forgetting the minor arc: its angle is $180^\\circ$ minus the major-arc angle'], n: `In angle problems, name the theorem you use and then calculate. In proofs, join the centre, mark the equal radii, and use the exterior angle. Two common slips: halving when you should double, because the angle at the circumference is the smaller one, and forgetting that a point on the minor arc sees the chord at one hundred eighty degrees minus the major arc angle.` }),
  ],
});

// ================================================================ notes
const notes = {
  unit: 'cbse-9-mathematics-ch11', version: 1, title: 'Circles: chapter notes', language: 'en',
  sections: [
    { heading: '1. Circle terms', body_md: r`A **circle** is the set of all points at a fixed distance, the **radius**, from a fixed point, the **centre**. A **chord** joins two points of the circle. A **diameter** is a chord through the centre; it is the longest chord and has length $2r$. A part of the circle is an **arc**. A chord cuts the circle into two **segments**, and two radii cut it into two **sectors**.`, key_terms: [{ term: 'Chord', definition_md: 'A line segment joining two points of a circle.' }, { term: 'Diameter', definition_md: 'A chord through the centre; its length is twice the radius.' }, { term: 'Segment', definition_md: 'The region between a chord and an arc.' }, { term: 'Sector', definition_md: 'The region between two radii and an arc.' }], formulas: [{ latex: r`\text{diameter} = 2 \times \text{radius}`, label: 'Diameter' }], visual: fTerms, visuals: [tTerms], topic_ids: [topic(1)] },
    { heading: '2. The circle through three points', body_md: r`Many circles pass through two points; their centres lie on the **perpendicular bisector** of the segment joining the points. Through **three points not in one line** there is **exactly one circle**. Its centre is where the perpendicular bisectors of two of the chords meet, and the radius is the distance from the centre to any of the points. For three points in one line, there is no circle.\n\nOn a grid, equate the squared distances to find each bisector, then solve the two linear equations: for $A(1, 2)$, $B(8, 1)$, $C(5, 10)$ the centre is $(5, 5)$ and the radius is $5$.`, key_terms: [{ term: 'Perpendicular bisector', definition_md: 'The line through the mid-point of a segment at right angles to it; its points are equally far from the two ends.' }], formulas: [], visual: fCircum, visuals: [fTwoPts, tConstr, tWE1], topic_ids: [topic(1)] },
    { heading: '3. Chords', body_md: r`**Equal chords subtend equal angles at the centre** (side side side), and conversely (two radii and the included angle).\n\nThe **perpendicular from the centre to a chord bisects the chord** (right angle, hypotenuse, side), and conversely the line from the centre to the mid-point of a chord is perpendicular to it.\n\n**Equal chords are equidistant from the centre**, and conversely. A chord nearer the centre is longer, and the diameter is the longest chord.\n\nFor a chord at distance $d$ from the centre of a circle of radius $r$: half the chord is $\sqrt{r^2 - d^2}$.`, key_terms: [{ term: 'Distance of a chord from the centre', definition_md: 'The length of the perpendicular from the centre to the chord.' }], formulas: [{ latex: r`\text{chord} = 2\sqrt{r^2 - d^2}`, label: 'Length of a chord at distance d from the centre' }], visual: fEqual, visuals: [tEqProof, fPerp, tPerpProof, fWE2, fEquid, fWE3, tWE3], topic_ids: [topic(2)] },
    { heading: '4. The angle at the centre', body_md: r`**Theorem:** the angle subtended by an arc at the centre is **double** the angle it subtends at any point of the remaining part of the circle.\n\n*Proof (centre inside the angle):* join $PO$ and extend it to $Q$. In the isosceles triangle $OPA$, the exterior angle $\angle AOQ = 2\angle OPA$; in the same way $\angle BOQ = 2\angle OPB$. Add to get $\angle AOB = 2\angle APB$. If the centre is on one arm, one exterior angle is enough; if it is outside the angle, subtract the two exterior angles.\n\nA point on the **minor** arc sees the chord at $180^\circ$ minus the angle seen from the major arc.`, key_terms: [{ term: 'Angle subtended by an arc', definition_md: 'The angle made at a point by the lines joining the point to the two ends of the arc.' }], formulas: [{ latex: r`\angle AOB = 2\angle APB`, label: 'Angle at the centre' }], visual: fCentreRim, visuals: [fProof1, tProof1, fCases, tCases, tWE1d2], topic_ids: [topic(3)] },
    { heading: '5. Angles in the same segment; the semicircle', body_md: r`**Angles in the same segment of a circle are equal**: each is half of the angle at the centre on the same arc.\n\nThe **angle in a semicircle is a right angle**: a diameter subtends $180^\circ$ at the centre, so $90^\circ$ at the circle. Because of this, the angle at the circle on a diameter makes a right triangle where Pythagoras can be used.`, key_terms: [{ term: 'Angle in a semicircle', definition_md: r`The angle at a point of a circle made by the ends of a diameter; it is $90^\circ$.` }], formulas: [{ latex: r`\angle APB = \angle AQB \quad (\text{same segment})`, label: 'Same segment' }], visual: fSameSeg, visuals: [fSemi, tWE2d2], topic_ids: [topic(3)] },
    { heading: '6. Cyclic quadrilaterals', body_md: r`A quadrilateral whose four corners lie on a circle is a **cyclic quadrilateral**.\n\n**Theorem:** the opposite angles of a cyclic quadrilateral add up to $180^\circ$. *Proof:* if the arc $BCD$ subtends $x$ at the centre then $\angle A = \dfrac{x}{2}$ and $\angle C = \dfrac{360^\circ - x}{2}$.\n\n**Converse:** if the opposite angles of a quadrilateral add up to $180^\circ$, the quadrilateral is cyclic.\n\nWhen a side is produced, the **exterior angle equals the interior opposite angle**. Rectangles, squares and isosceles trapezia are cyclic; a rhombus or a parallelogram is cyclic only if it is a rectangle (or square).`, key_terms: [{ term: 'Cyclic quadrilateral', definition_md: 'A quadrilateral whose four vertices lie on one circle.' }], formulas: [{ latex: r`\angle A + \angle C = 180^\circ, \quad \angle B + \angle D = 180^\circ`, label: 'Cyclic quadrilateral' }], visual: fCyc, visuals: [fCycProof, fConv, tQuad, tWE3d2], topic_ids: [topic(3)] },
  ],
  exam_tips_md: r`**How marks are awarded**\n- *Chord numericals (2–3 marks):* perpendicular from the centre, half the chord, Pythagoras.\n- *Proofs (3–5 marks):* name the congruence or the exterior angle and give a reason for each step.\n- *Angle problems (2–3 marks):* name the theorem first, then calculate.\n\n**Common mistakes**\n1. Using the whole chord instead of half the chord in Pythagoras.\n2. Forgetting to add or subtract the distances of parallel chords.\n3. Halving when you should double (the angle at the circumference is the smaller one).\n4. Forgetting that the minor arc gives $180^\circ$ minus the major-arc angle.\n5. Using the cyclic quadrilateral theorem when the four points are not known to lie on a circle.`,
  status: 'draft', provenance: d1.provenance,
};

const fcard = (id, front_md, back_md, tag, t) => ({ id, front_md, back_md, tag, topic_id: topic(t) });
const flashcards = {
  unit: 'cbse-9-mathematics-ch11', version: 1, language: 'en',
  cards: [
    fcard('f01', 'What is a circle?', 'The set of all points at a fixed distance (the radius) from a fixed point (the centre).', 'definition', 1),
    fcard('f02', 'What is a chord?', 'A line segment joining two points of a circle.', 'definition', 1),
    fcard('f03', 'What is a diameter, and how long is it?', r`A chord through the centre; its length is $2r$ and it is the longest chord.`, 'definition', 1),
    fcard('f04', 'What is an arc?', 'A part of the circle between two of its points.', 'definition', 1),
    fcard('f05', 'What is a segment of a circle?', 'The region between a chord and an arc.', 'definition', 1),
    fcard('f06', 'What is a sector of a circle?', 'The region between two radii and the arc they cut off.', 'definition', 1),
    fcard('f07', 'Where do the centres of circles through two points $A$ and $B$ lie?', r`On the perpendicular bisector of $AB$.`, 'fact', 1),
    fcard('f08', 'How many circles pass through three points that are not in one line?', 'Exactly one.', 'fact', 1),
    fcard('f09', 'How do you find the centre of the circle through three points?', 'Draw the perpendicular bisectors of two of the chords; they meet at the centre.', 'concept', 1),
    fcard('f10', 'Can a circle pass through three points in one line?', 'No: the perpendicular bisectors would be parallel and never meet.', 'concept', 1),
    fcard('f11', 'What do equal chords subtend at the centre?', 'Equal angles.', 'fact', 2),
    fcard('f12', 'State the converse of the equal-chords theorem.', 'If two chords subtend equal angles at the centre, the chords are equal.', 'fact', 2),
    fcard('f13', 'What does the perpendicular from the centre do to a chord?', 'It bisects the chord.', 'fact', 2),
    fcard('f14', 'State the converse of the perpendicular-bisects-chord theorem.', 'The line joining the centre to the mid-point of a chord is perpendicular to the chord.', 'fact', 2),
    fcard('f15', 'Which congruence proves that the perpendicular bisects the chord?', 'Right angle, hypotenuse, side (the radii are the hypotenuses).', 'concept', 2),
    fcard('f16', 'What can you say about equal chords and the centre?', 'They are equidistant from the centre, and conversely.', 'fact', 2),
    fcard('f17', 'Which is longer: a chord near the centre or far from it?', 'The chord nearer the centre is longer.', 'fact', 2),
    fcard('f18', r`Length of a chord at distance $d$ from the centre of a circle of radius $r$?`, r`$2\sqrt{r^2 - d^2}$.`, 'formula', 2),
    fcard('f19', 'Two parallel chords are on opposite sides of the centre. How do you find the distance between them?', 'Find each distance from the centre with Pythagoras and add them (subtract if they are on the same side).', 'exam-tip', 2),
    fcard('f20', 'State the angle at the centre theorem.', 'The angle subtended by an arc at the centre is double the angle subtended at any point of the remaining part of the circle.', 'fact', 3),
    fcard('f21', 'Outline the proof of the angle at the centre theorem.', r`Join $PO$ and extend it to $Q$; use the exterior angles of the isosceles triangles $OPA$ and $OPB$, then add (or subtract).`, 'concept', 3),
    fcard('f22', 'An arc subtends $90^\\circ$ at the centre. What does it subtend on the major arc?', r`$45^\circ$, half of $90^\circ$.`, 'fact', 3),
    fcard('f23', 'What do points in the same segment see?', 'The chord at equal angles.', 'fact', 3),
    fcard('f24', 'Why are angles in the same segment equal?', 'Each is half of the angle at the centre on the same arc.', 'concept', 3),
    fcard('f25', 'What is the angle in a semicircle?', r`$90^\circ$, a right angle.`, 'fact', 3),
    fcard('f26', 'Why is the angle in a semicircle a right angle?', r`A diameter subtends $180^\circ$ at the centre, and half of it is $90^\circ$.`, 'concept', 3),
    fcard('f27', 'What does a point on the minor arc see?', r`$180^\circ$ minus the angle seen from the major arc.`, 'fact', 3),
    fcard('f28', 'What is a cyclic quadrilateral?', 'A quadrilateral whose four corners lie on a circle.', 'definition', 3),
    fcard('f29', 'What is true about the opposite angles of a cyclic quadrilateral?', r`They add up to $180^\circ$.`, 'fact', 3),
    fcard('f30', 'State the converse of the cyclic quadrilateral theorem.', r`If the opposite angles of a quadrilateral add up to $180^\circ$, it is cyclic.`, 'fact', 3),
    fcard('f31', 'What does the exterior angle of a cyclic quadrilateral equal?', 'The interior opposite angle.', 'fact', 3),
    fcard('f32', 'Which parallelograms can be inscribed in a circle?', 'Only rectangles (including squares).', 'exam-tip', 3),
  ],
  status: 'draft', provenance: d1.provenance,
};

const release = {
  unit: 'cbse-9-mathematics-ch11', version: 1, academic_year: '2026-27', created_at: '2026-11-05T00:00:00+05:30',
  decks: [d1, d2], notes, flashcards, questions: [],
  build: { run_id: null, checks: { syllabus: 't01 circle terms and the unique circle through three non-collinear points (constructed from perpendicular bisectors, computed on a grid); t02 equal chords and equal angles at the centre, the perpendicular from the centre and chord distances, each with its converse, with Pythagoras numericals; t03 the angle at the centre is double the angle at the circumference (three positions of the centre), angles in the same segment, the angle in a semicircle, cyclic quadrilaterals and their converse. Tangents are Class 10 and are not included', self_checks: 'every figure is drawn from polar coordinates on a circle; every labelled angle and length is measured by the lint and asserted in figs.mjs; every worked numerical is solved by search or by Cramer rule; every answer in the item banks is recomputed from coordinates' } },
};
void lineDist; void mid;
const tests = chapterTests('Circles', {
  A: ['m07', 'm12', 'm15', 'ar1'],
  B: ['s204', 's206', 's302'],
  C: ['l01', 'l03'],
  D: ['c01'],
}, {
  A: ['m08', 'm09', 'm10', 'm11', 'm13', 'm14', 'm16', 'm17', 'ar2', 'ar3'],
  B: ['s202', 's203', ['s205', 's207'], 's301', ['s304', 's305']],
  C: ['l02', ['l04', 'l05']],
  D: ['c02', 'c03'],
});
build({ dir: DIR, release, testsSpec: tests });
