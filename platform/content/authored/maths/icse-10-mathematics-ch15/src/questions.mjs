// ICSE 10 Mathematics ch15 Loci — objective items (mcq, assertion-reason, true-false, fill-blank, numerical).
// Short and long items are in questions2.mjs. Every key is recomputed from the givens with the constructions of loci.mjs
// (distances, intersections, bisectors) or with exact fractions; MC() requires exactly one option to carry the right value.
import { Q, mk, r } from './lib.mjs';
import { F } from './fr.mjs';
import { eqctx } from './work.mjs';
import {
  must, near, dist, angDeg, r1, polar, line, through, at, distLine, perpBis, bisector, bisector2, parallel, intLL, intLC, intCC, mid,
} from './loci.mjs';
import { J, A, W, fr, rat, MC } from './qh.mjs';

const O = [0, 0];
const sinD = (d) => Math.sin((d * Math.PI) / 180);
const cosD = (d) => Math.cos((d * Math.PI) / 180);
const count = (xs) => xs.length;

// =============================================================== MCQ
MC('m01', { stem: r`In the chapter on loci, what does the "locus" of a moving point mean?`, key: 'b',
  right: { t: 'the set of all points, and only those points, that satisfy the given condition', v: 'set' },
  wrong: [{ t: 'the single point where two paths cross', v: 'point' }, { t: 'the longest segment that can be drawn in the figure', v: 'segment' }, { t: 'the angle between the path and a fixed line', v: 'angle' }],
  sol: r`A locus is a set of points: every point of the set satisfies the condition, and every point that satisfies the condition is in the set. It is a path or a region (a circle, a line, a pair of lines), not one point, one segment or one angle.`, d: 1, c: 'recall', t: [1], time: 45 }, 'set');

MC('m02', { stem: r`A lamp on a pole lights every spot on level ground that is exactly $6$ m from the foot of the pole. What is the locus of the spots lit at exactly that distance?`, key: 'a',
  right: { t: r`a circle of radius $6$ m with the foot of the pole as centre`, v: 'circle' },
  wrong: [{ t: r`a straight line $6$ m from the pole`, v: 'line' }, { t: r`two parallel lines, each $6$ m from the pole`, v: 'pair' }, { t: r`a disc of radius $12$ m about the pole`, v: 'disc' }],
  sol: r`The points at a fixed distance from a fixed point form a circle with that point as centre and the distance as radius. Every point of the circle is $6$ m from the pole and no other point is. A line or a pair of lines cannot stay a constant distance from a point, and a disc contains points nearer than $6$ m.`, d: 2, c: 'understanding', t: [1], time: 60 },
  'circle', (C) => { C.assert([0, 45, 100, 170, 250, 330].every((a) => near(dist(polar(O, 6, a), O), 6)), 'points of the circle are 6 from the centre'); });

MC('m03', { stem: r`Bus stops $S$ and $T$ are on a straight road. A shelter is to stand at a spot equally far from $S$ and from $T$. The possible spots form`, key: 'd',
  right: { t: r`the perpendicular bisector of $ST$`, v: 'perp' },
  wrong: [{ t: r`the circle with $ST$ as diameter`, v: 'circle' }, { t: r`the line through $S$ and $T$`, v: 'line' }, { t: r`a line parallel to $ST$ through its mid-point`, v: 'parallel' }],
  sol: r`The locus of points equidistant from two fixed points is the perpendicular bisector of the segment joining them. The mid-point of $ST$ is on it, but the line $ST$ itself is not (its points are not equally far from $S$ and $T$ except the mid-point), and a line parallel to $ST$ would never cross the bisector at right angles.`, d: 1, c: 'understanding', t: [2], time: 45 },
  'perp', (C) => { const S = [0, 0], T = [7, 0], L = perpBis(S, T); C.assert([-5, -1, 2, 6].every((t) => near(dist(at(L, t), S), dist(at(L, t), T))), 'bisector points are equidistant'); C.assert(!near(dist([2, 0], S), dist([2, 0], T)), 'the line ST is not equidistant'); });

MC('m04', { stem: r`Two straight footpaths cross at a junction. What is the locus of the points that are equally far from both footpaths?`, key: 'c',
  right: { t: 'the two lines that bisect the angles between the footpaths', v: 'two bisectors' },
  wrong: [{ t: 'one line only: the bisector of the smaller angle', v: 'one bisector' }, { t: 'a circle through the junction', v: 'circle' }, { t: 'a line parallel to both footpaths', v: 'parallel' }],
  sol: r`A point equidistant from two intersecting lines lies on an angle bisector. The two lines make two pairs of vertically opposite angles, and each pair has its own bisector, so the locus is a pair of lines, not one line. It is never a circle or a parallel line.`, d: 1, c: 'recall', t: [3], time: 45 },
  'two bisectors', (C) => { const b1 = bisector(O, [1, 0], polar(O, 1, 70)), b2 = bisector2(b1), L1 = line(O, [1, 0]), L2 = line(O, polar(O, 1, 70)); C.assert([b1, b2].every((b) => [-3, 2, 5].every((t) => near(distLine(at(b, t), L1), distLine(at(b, t), L2)))), 'both bisectors are equidistant from the lines'); });

MC('m05', { stem: r`The two rails of a straight railway track are $1.5$ m apart. Points that are the same distance from each rail lie on`, key: 'a',
  right: { t: r`a line parallel to the rails, $0.75$ m from each`, v: 0.75 },
  wrong: [{ t: r`a line parallel to the rails, $1.5$ m from each`, v: 1.5 }, { t: r`two lines parallel to the rails, $0.75$ m from the nearer rail on the outside`, v: 'outside' }, { t: 'a line at right angles to the rails', v: 'across' }],
  sol: r`The locus of points equidistant from two parallel lines is the parallel line midway between them. The gap is $1.5$ m, so the middle line is $\dfrac{1.5}{2} = 0.75$ m from each rail.`, d: 2, c: 'understanding', t: [3], time: 60 },
  0.75, (C) => { A([r`\dfrac{1.5}{2} = 0.75`]).verify(C); });

MC('m06', { stem: r`A boundary wall is straight. On level ground, the locus of points exactly $4$ m from the wall (on either side) is`, key: 'c',
  right: { t: r`two lines parallel to the wall, one on each side, each $4$ m from it`, v: 'pair' },
  wrong: [{ t: r`a single line parallel to the wall, $4$ m from it`, v: 'one' }, { t: r`a circle of radius $4$ m about the middle of the wall`, v: 'circle' }, { t: r`two lines parallel to the wall, each $2$ m from it`, v: 'half' }],
  sol: r`Points at a fixed distance from a line are on two parallel lines, one on each side of it. Each is $4$ m from the wall, so the lines are $8$ m apart. A single line would cover only one side, and a circle is the locus for a fixed point, not a fixed line.`, d: 2, c: 'understanding', t: [1], time: 60 },
  'pair', (C) => { const W = line(O, [1, 0]); C.assert([parallel(W, 4), parallel(W, -4)].every((p) => [-2, 3, 9].every((t) => near(distLine(at(p, t), W), 4))), 'pair of parallels at 4'); });

const pq = Math.sqrt(15 * 15 - 9 * 9);
MC('m07', { stem: r`Villages $P$ and $Q$ are $18$ km apart on a straight canal bank. A clinic is on the perpendicular bisector of $PQ$ and $15$ km from $P$. How far is the clinic from the canal bank $PQ$?`, key: 'b',
  right: { t: r`$12$ km`, v: 12 }, wrong: [{ t: r`$6$ km`, v: 6 }, { t: r`$17.5$ km`, v: 17.5 }, { t: r`$9$ km`, v: 9 }],
  sol: r`The clinic is above the mid-point $M$ of $PQ$, with $PM = 9$ km, so the clinic, $M$ and $P$ form a right triangle with hypotenuse $15$: $\sqrt{15^2 - 9^2} = \sqrt{144} = 12$ km. The value $6$ is $15 - 9$, $17.5$ is $\sqrt{15^2 + 9^2}$ rounded, and $9$ is the half-length $PM$ itself.`, d: 2, c: 'application', t: [2], time: 90 },
  12, (C) => { A([r`\sqrt{15^2 - 9^2} = \sqrt{144} = 12`]).verify(C); C.assert(near(pq, 12) && 15 - 9 === 6 && r1(Math.hypot(15, 9)) === 17.5, 'distractors'); });

const dSens = 8 * sinD(25);
MC('m08', { stem: r`Two walls meet in a corner at an angle of $50^\circ$. A sensor on the line that bisects this angle is $8$ m from the corner. To the nearest $0.1$ m, how far is the sensor from each wall?`, key: 'd',
  right: { t: r`$3.4$ m`, v: 3.4 }, wrong: [{ t: r`$7.3$ m`, v: 7.3 }, { t: r`$6.1$ m`, v: 6.1 }, { t: r`$4.0$ m`, v: 4 }],
  sol: r`The bisector makes $25^\circ$ with each wall, and the perpendicular from the sensor to a wall is the side opposite $25^\circ$ in a right triangle with hypotenuse $8$: $8 \sin 25^\circ = 3.4$ m. The value $7.3$ is $8 \cos 25^\circ$, $6.1$ uses the whole angle ($8 \sin 50^\circ$) and $4.0$ halves the distance from the corner.`, d: 3, c: 'application', t: [3], time: 100 },
  3.4, (C) => { C.assert(r1(dSens) === 3.4 && r1(8 * cosD(25)) === 7.3 && r1(8 * sinD(50)) === 6.1, 'distance and distractors'); const b = bisector(O, [1, 0], polar(O, 1, 50)), X = at(b, 8); C.assert(near(distLine(X, line(O, [1, 0])), dSens) && near(distLine(X, through(O, polar(O, 1, 50))), dSens), 'constructed point is 3.38 from each wall'); });

const nCirc = (d, a, b) => count(intCC([0, 0], a, [d, 0], b));
MC('m09', { stem: r`A sprinkler at $A$ and a tap at $B$ are $4$ m apart. A seedling is to be planted $3$ m from the sprinkler and $3$ m from the tap. How many positions are possible?`, key: 'a',
  right: { t: r`$2$`, v: 2 }, wrong: [{ t: r`$1$`, v: 1 }, { t: r`$0$`, v: 0 }, { t: r`$4$`, v: 4 }],
  sol: r`Such a point lies on the circle of radius $3$ about $A$ and on the circle of radius $3$ about $B$. The centres are $4$ apart, which is less than $3 + 3 = 6$ and more than $3 - 3 = 0$, so the circles cut in $2$ points, one on each side of $AB$.`, d: 2, c: 'application', t: [4], time: 75 },
  2, (C) => { C.assert(nCirc(4, 3, 3) === 2 && nCirc(6, 3, 3) === 1 && nCirc(7, 3, 3) === 0, 'circle counts: 2, 1, 0'); });

const eqR = [4, 8, 3, 5].map((rr) => nCirc(8, rr, rr));
MC('m10', { stem: r`Two lamp posts stand $8$ m apart. A kiosk is to be the same distance $r$ from both posts. For which value of $r$ is there exactly one possible position for the kiosk?`, key: 'c',
  right: { t: r`$r = 4$ m`, v: 1 }, wrong: [{ t: r`$r = 8$ m`, v: 2 }, { t: r`$r = 3$ m`, v: 0 }, { t: r`$r = 5$ m`, v: 2 }],
  sol: r`The kiosk is on the circle of radius $r$ about each post, and the two circles have exactly one common point when they touch, that is when $r + r = 8$, so $r = 4$ m. For $r = 3$ m the circles are $8 > 3 + 3$ apart and do not meet; for $r = 8$ m and $r = 5$ m they cut in two points.`, d: 3, c: 'analysis', t: [4], time: 90 },
  1, (C) => { C.assert(eqR.join() === '1,2,0,2', 'tangent for r = 4 only: counts ' + eqR.join()); });

const nPts = (h, rr) => count(intLC(parallel(line(O, [1, 0]), h), O, rr)) + count(intLC(parallel(line(O, [1, 0]), -h), O, rr));
MC('m11', { stem: r`$C$ is a point on a long straight fence $l$. A surveyor needs pegs that are $2.5$ m from the fence and $3$ m from $C$. How many peg positions are there?`, key: 'b',
  right: { t: r`$4$`, v: 4 }, wrong: [{ t: r`$2$`, v: 2 }, { t: r`$1$`, v: 1 }, { t: r`$8$`, v: 8 }],
  sol: r`Pegs $2.5$ m from the fence lie on two lines parallel to it, one on each side. The circle of radius $3$ about $C$ reaches each of them, because $2.5 < 3$, and cuts each in $2$ points. That gives $2 + 2 = 4$ positions.`, d: 2, c: 'application', t: [4], time: 75 },
  4, (C) => { C.assert(nPts(2.5, 3) === 4 && nPts(3, 3) === 2 && nPts(3.5, 3) === 0, 'counts 4, 2, 0'); });

MC('m12', { stem: r`Two crossing laser beams meet at the point $O$. The locus of the points that are the same distance from both beams is a pair of lines. At what angle do these two lines meet?`, key: 'd',
  right: { t: r`$90^\circ$`, v: 90 }, wrong: [{ t: r`$45^\circ$`, v: 45 }, { t: r`$60^\circ$`, v: 60 }, { t: r`$180^\circ$`, v: 180 }],
  sol: r`The two bisectors cut the straight angle on a line into two halves that add up to $\dfrac{180^\circ}{2} = 90^\circ$: if the beams make $\theta$ and $180^\circ - \theta$, the bisectors are $\dfrac{\theta}{2} + \dfrac{180^\circ - \theta}{2} = 90^\circ$ apart. So the pair of lines are always perpendicular, whatever the angle between the beams.`, d: 2, c: 'understanding', t: [3], time: 60 },
  90, (C) => { for (const a of [30, 50, 72, 110]) { const b1 = bisector(O, [1, 0], polar(O, 1, a)), b2 = bisector2(b1); C.assert(near(angDeg(O, at(b1, 1), at(b2, 1)), 90), `bisectors at 90 for ${a}`); } });

const locFor = (angle, rr) => { const b1 = bisector(O, [1, 0], polar(O, 1, angle)), b2 = bisector2(b1); return count(intLC(b1, O, rr)) + count(intLC(b2, O, rr)); };
MC('m13', { stem: r`Two straight roads cross at $60^\circ$. A fire station is to be equally far from both roads and $5$ km from the crossing. How many sites can it have?`, key: 'a',
  right: { t: r`$4$`, v: 4 }, wrong: [{ t: r`$2$`, v: 2 }, { t: r`$1$`, v: 1 }, { t: r`$8$`, v: 8 }],
  sol: r`Equidistant from both roads means on one of the two angle bisectors. A circle of radius $5$ km about the crossing meets each bisector, which passes through the centre, in $2$ points. So there are $2 + 2 = 4$ sites.`, d: 3, c: 'application', t: [3, 4], time: 75 },
  4, (C) => { C.assert(locFor(60, 5) === 4, 'four points'); });

MC('m14', { stem: r`A rotating sprinkler waters up to $2.5$ m from its post. On a garden plan drawn so that $1$ cm stands for $0.5$ m, the edge of the watered region is drawn as a circle of radius`, key: 'c',
  right: { t: r`$5$ cm`, v: 5 }, wrong: [{ t: r`$1.25$ cm`, v: 1.25 }, { t: r`$2.5$ cm`, v: 2.5 }, { t: r`$10$ cm`, v: 10 }],
  sol: r`The locus is a circle of real radius $2.5$ m. On the plan each $0.5$ m becomes $1$ cm, so the radius is $\dfrac{2.5}{0.5} = 5$ cm. The value $1.25$ multiplies instead of dividing, $2.5$ ignores the scale and $10$ is the diameter.`, d: 2, c: 'application', t: [1], time: 75 },
  5, (C) => { A([r`\dfrac{2.5}{0.5} = 5`]).verify(C); C.assert(2.5 * 0.5 === 1.25 && 2 * 5 === 10, 'distractors'); });

MC('m15', { stem: r`To construct the perpendicular bisector of a segment $PQ = 7$ cm with a pair of compasses, the radius used for the arcs drawn from $P$ and from $Q$ must be`, key: 'b',
  right: { t: r`greater than $3.5$ cm`, v: 'greater' }, wrong: [{ t: r`less than $3.5$ cm`, v: 'less' }, { t: r`exactly $3.5$ cm`, v: 'exact' }, { t: r`less than $1$ cm`, v: 'tiny' }],
  sol: r`The arcs from $P$ and $Q$ must cross, which needs the radius to exceed half of $PQ$, that is $\dfrac{7}{2} = 3.5$ cm. At exactly $3.5$ cm the arcs only touch at the mid-point, which is one point, not two, so the bisecting line cannot be drawn; at a smaller radius they do not meet at all.`, d: 2, c: 'understanding', t: [2], time: 60 },
  'greater', (C) => { C.assert(nCirc(7, 4, 4) === 2 && nCirc(7, 3.5, 3.5) === 1 && nCirc(7, 3, 3) === 0, 'arcs cross only for radius above 3.5'); });

const Bm = [8, 1], Am = [2, 1], Lm = perpBis(Am, Bm);
const Pm = intLC(Lm, Am, 5).sort((u, v) => v[1] - u[1])[0];
MC('m16', { stem: r`In a coordinate plan, $A(2, 1)$ and $B(8, 1)$ are two survey pegs. A third peg $P$ is the same distance from $A$ and from $B$ and $5$ units from $A$, with a positive $y$-coordinate. The coordinates of $P$ are`, key: 'd',
  right: { t: r`$(5, 5)$`, v: '5,5' }, wrong: [{ t: r`$(5, -3)$`, v: '5,-3' }, { t: r`$(5, 6)$`, v: '5,6' }, { t: r`$(6, 5)$`, v: '6,5' }],
  sol: r`Equal distances from $A$ and $B$ put $P$ on the perpendicular bisector of $AB$, the vertical line $x = 5$. Then $PA^2 = (5 - 2)^2 + (y - 1)^2 = 25$ gives $(y - 1)^2 = 16$, so $y = 5$ (taking the positive value). The point $(5, -3)$ is the other solution, $(5, 6)$ adds $5$ to $y = 1$ and $(6, 5)$ moves off the bisector.`, d: 3, c: 'application', t: [2], time: 100 },
  `${Math.round(Pm[0])},${Math.round(Pm[1])}`, (C) => { C.assert(near(Pm[0], 5) && near(Pm[1], 5) && near(dist(Pm, Am), dist(Pm, Bm)) && near(dist(Pm, Am), 5), 'P = (5, 5)'); C.assert(near(dist([5, -3], Am), 5) && !near(dist([6, 5], Am), dist([6, 5], Bm)) && !near(dist([5, 6], Am), 5), 'distractors'); });

MC('m17', { stem: r`Two straight canal banks are parallel and $8$ m apart. A buoy is to be the same distance from both banks and $3$ m from one of them. How many positions can the buoy have?`, key: 'a',
  right: { t: r`$0$`, v: 0 }, wrong: [{ t: r`$1$`, v: 1 }, { t: r`$2$`, v: 2 }, { t: r`$4$`, v: 4 }],
  sol: r`Equidistant from the banks means on the middle line, which is $\dfrac{8}{2} = 4$ m from each bank. A buoy on that line is $4$ m from each bank, never $3$ m. The conditions cannot hold together, so there are $0$ positions.`, d: 4, c: 'analysis', t: [3, 4], time: 90 },
  0, (C) => { const L = line(O, [1, 0]), mdl = parallel(L, 4); C.assert(near(distLine(at(mdl, 3), L), 4) && !near(distLine(at(mdl, 3), L), 3), 'the middle line is 4 from each bank, so no point is 3 from one'); });

const SA = [0, 0], SB = [6, 0], SC = [0, 8], Sc = intLL(perpBis(SA, SB), perpBis(SB, SC));
MC('m18', { stem: r`In a coordinate plan the corners of a plot are $A(0, 0)$, $B(6, 0)$ and $C(0, 8)$. A water tank is to be the same distance from $A$, $B$ and $C$. Where does it stand?`, key: 'c',
  right: { t: r`$(3, 4)$`, v: '3,4' }, wrong: [{ t: r`$(3, 0)$`, v: '3,0' }, { t: r`$(0, 4)$`, v: '0,4' }, { t: r`$(6, 8)$`, v: '6,8' }].slice(0, 3),
  sol: r`Equal distance from $A$ and $B$ puts the tank on the line $x = 3$; equal distance from $A$ and $C$ puts it on $y = 4$. These perpendicular bisectors meet at $(3, 4)$, and $\sqrt{3^2 + 4^2} = 5$, $\sqrt{(6 - 3)^2 + 4^2} = 5$, $\sqrt{3^2 + (8 - 4)^2} = 5$ confirm it. The points $(3, 0)$ and $(0, 4)$ are the mid-points of $AB$ and $AC$, each on only one bisector.`, d: 4, c: 'analysis', t: [2, 4], time: 100 },
  '3,4', (C) => { A([r`\sqrt{3^2 + 4^2} = 5`, r`\sqrt{(6 - 3)^2 + 4^2} = 5`, r`\sqrt{3^2 + (8 - 4)^2} = 5`]).verify(C); C.assert(near(Sc[0], 3) && near(Sc[1], 4) && near(dist(Sc, SA), dist(Sc, SB)) && near(dist(Sc, SA), dist(Sc, SC)), 'circumcentre (3, 4)'); C.assert(!near(dist([3, 0], SC), dist([3, 0], SA)), '(3, 0) is not equidistant from A and C'); });

MC('m19', { stem: r`Two crossing roads make an angle at a junction. The line that divides this angle into two equal angles is called the`, key: 'd',
  right: { t: 'angle bisector', v: 'angle bisector' }, wrong: [{ t: 'perpendicular bisector', v: 'perpendicular bisector' }, { t: 'median', v: 'median' }, { t: 'tangent', v: 'tangent' }],
  sol: r`The line through the vertex that splits an angle into two equal parts is the angle bisector, and it is the locus of points equidistant from the arms. A perpendicular bisector belongs to a segment, a median to a triangle, and a tangent to a circle.`, d: 1, c: 'recall', t: [3], time: 30 },
  'angle bisector', (C) => { const b = bisector(O, [1, 0], polar(O, 1, 58)); C.assert(near(angDeg(O, [1, 0], at(b, 2)), angDeg(O, at(b, 2), polar(O, 1, 58))) && near(angDeg(O, [1, 0], at(b, 2)), 29), 'the bisector makes equal angles'); });

MC('m20', { stem: r`A security camera at $C$ can see every spot on level ground that is at most $5$ m from $C$. The set of all the spots it can see is`, key: 'a',
  right: { t: r`a disc: the circle of radius $5$ m together with all the points inside it`, v: 'disc' },
  wrong: [{ t: r`the circle of radius $5$ m only`, v: 'circle' }, { t: r`the region outside the circle of radius $5$ m`, v: 'outside' }, { t: r`a straight line through $C$`, v: 'line' }],
  sol: r`"At most $5$ m" includes the spots exactly $5$ m away, which form the circle, and all the nearer spots inside it, so the set is the circle together with its inside. The circle alone would be "exactly $5$ m", and the outside is "more than $5$ m".`, d: 2, c: 'understanding', t: [1], time: 45 },
  'disc', (C) => { C.assert(dist(polar(O, 5, 77), O) <= 5 && dist(polar(O, 3, 200), O) <= 5 && dist(polar(O, 6, 10), O) > 5, 'on and inside are seen, outside is not'); });

// =============================================================== assertion-reason (keys a c d b a c)
Q('ar1', mk.ar({ a: r`The perpendicular bisector of a segment $AB$ passes through the mid-point of $AB$.`, r: r`The locus of points that are equidistant from $A$ and from $B$ is the perpendicular bisector of $AB$.`, key: 'c', sol: r`A is true, and so is R. The mid-point $M$ of $AB$ is the same distance from $A$ and from $B$, so by R it lies on the locus, which is the perpendicular bisector. So R explains A.`, d: 2, c: 'understanding', t: [2] }), (C) => { const A_ = [1, 2], B_ = [9, 8], M = mid(A_, B_); C.assert(near(dist(M, A_), dist(M, B_)) && near(distLine(M, perpBis(A_, B_)), 0), 'the mid-point is equidistant and on the bisector'); C.key('c'); });

Q('ar2', mk.ar({ a: r`The locus of points equidistant from two parallel lines $6$ cm apart is a line parallel to both, $3$ cm from each.`, r: r`The locus of points equidistant from any two straight lines is a pair of lines that cross at right angles.`, key: 'a', sol: r`A is true: the middle line is $\dfrac{6}{2} = 3$ cm from each. R is false: it is the rule for lines that intersect. Two parallel lines have no point of intersection and give a single middle line, not a crossing pair.`, d: 2, c: 'understanding', t: [3] }), (C) => { A([r`\dfrac{6}{2} = 3`]).verify(C); const L = line(O, [1, 0]), m = parallel(L, 3), U = parallel(L, 6); C.assert(near(distLine(at(m, 4), L), distLine(at(m, 4), U)) && intLL(L, U) === null, 'one midline; the parallels never meet'); C.key('a'); });

Q('ar3', mk.ar({ a: r`The locus of the points $3$ cm from a straight line $l$ is a single line parallel to $l$.`, r: r`Points that are $3$ cm from $l$ can lie on either side of $l$, so they form two lines parallel to $l$.`, key: 'b', sol: r`R is true: one parallel line on each side of $l$. A is false, because it leaves out the second parallel; the locus is a pair of lines $6$ cm apart.`, d: 3, c: 'analysis', t: [1] }), (C) => { const L = line(O, [1, 0]); C.assert(near(distLine(at(parallel(L, 3), 2), L), 3) && near(distLine(at(parallel(L, -3), 2), L), 3) && 3 + 3 === 6, 'two parallels, 6 apart'); C.key('b'); });

Q('ar4', mk.ar({ a: r`The two lines that bisect the angles between two intersecting lines are perpendicular to each other.`, r: r`Every point on the bisector of an angle is equidistant from the two arms of the angle.`, key: 'd', sol: r`Both are true, but R does not explain A. R tells us what is special about the points of one bisector; the perpendicularity of the two bisectors comes from adding the half-angles of a straight line, $\dfrac{\theta}{2} + \dfrac{180^\circ - \theta}{2} = 90^\circ$.`, d: 3, c: 'analysis', t: [3] }), (C) => { const b1 = bisector(O, [1, 0], polar(O, 1, 38)), b2 = bisector2(b1); C.assert(near(angDeg(O, at(b1, 1), at(b2, 1)), 90) && near(distLine(at(b1, 3), line(O, [1, 0])), distLine(at(b1, 3), through(O, polar(O, 1, 38)))), 'bisectors are perpendicular and each is equidistant'); C.key('d'); });

Q('ar5', mk.ar({ a: r`If $AB = 8$ cm, no point is $2$ cm from $A$ and $3$ cm from $B$.`, r: r`A point that is $2$ cm from $A$ and $3$ cm from $B$ can only exist if $AB$ is at most $2 + 3 = 5$ cm.`, key: 'c', sol: r`The point would lie on a circle of radius $2$ about $A$ and a circle of radius $3$ about $B$. For $AB = 8$ these circles are $8 > 2 + 3$ apart, so they do not meet; R states exactly this condition, so it explains A.`, d: 3, c: 'analysis', t: [4] }), (C) => { C.assert(count(intCC([0, 0], 2, [8, 0], 3)) === 0 && count(intCC([0, 0], 2, [5, 0], 3)) === 1 && count(intCC([0, 0], 2, [4, 0], 3)) === 2, 'no meeting at 8, touching at 5'); C.key('c'); });

Q('ar6', mk.ar({ a: r`Every circle that passes through two points $A$ and $B$ has its centre on the perpendicular bisector of $AB$.`, r: r`Every point of the perpendicular bisector of $AB$ is $\dfrac{AB}{2}$ from $A$.`, key: 'a', sol: r`A is true: the centre is the same distance (the radius) from $A$ and from $B$. R is false: only the mid-point $M$ is $\dfrac{AB}{2}$ from $A$. For $A(0, 0)$, $B(6, 0)$ the point $(3, 4)$ is on the bisector but $5$ from $A$, not $3$.`, d: 3, c: 'analysis', t: [2] }), (C) => { const a = [0, 0], b = [6, 0], c1 = [3, 4]; C.assert(near(dist(c1, a), dist(c1, b)) && near(dist(c1, a), 5) && !near(dist(c1, a), 3), 'a bisector point is not 3 from A'); C.key('a'); });

// =============================================================== true-false
Q('tf1', mk.tf({ stem: r`The tip of a minute hand $7$ cm long, as the hand turns round a clock face, traces a circle of radius $7$ cm.`, key: 't', sol: r`True. The tip is always $7$ cm from the pivot, so it moves along the locus of points at a fixed distance from a fixed point: a circle with the pivot as centre and radius $7$ cm.`, d: 1, c: 'recall', t: [1] }), (C) => { C.assert([0, 60, 180, 300].every((a) => near(dist(polar(O, 7, a), O), 7)), 'constant distance'); C.key('t'); });

Q('tf2', mk.tf({ stem: r`The locus of the points equally far from two lines that cross each other is a single straight line.`, key: 'f', sol: r`False. Crossing lines form two pairs of vertically opposite angles, and each pair has its own bisector, so the locus is two lines (at right angles to each other).`, d: 1, c: 'understanding', t: [3] }), (C) => { const b1 = bisector(O, [1, 0], polar(O, 1, 66)), b2 = bisector2(b1); C.assert(!near(angDeg(O, at(b1, 1), at(b2, 1)), 0) && !near(angDeg(O, at(b1, 1), at(b2, 1)), 180), 'two distinct bisectors'); C.key('f'); });

Q('tf3', mk.tf({ stem: r`A point $P$ is equidistant from $A$ and $B$ exactly when $P$ lies on the perpendicular bisector of $AB$.`, key: 't', sol: r`True, in both directions: a point of the perpendicular bisector is the same distance from $A$ and $B$, and a point with $PA = PB$ cannot be anywhere else, since it is on the bisector. This is the definition of the locus.`, d: 2, c: 'understanding', t: [2] }), (C) => { const a = [-2, 3], b = [5, -1], L = perpBis(a, b); C.assert([-4, 0, 3].every((t) => near(dist(at(L, t), a), dist(at(L, t), b))) && !near(dist([1, 1], a), dist([1, 1], b)), 'on the bisector iff equidistant'); C.key('t'); });

Q('tf4', mk.tf({ stem: r`A circle of radius $3$ cm about one lamp post and a circle of radius $4$ cm about another post, $8$ cm away, cut each other in two points.`, key: 'f', sol: r`False. The radii add up to $3 + 4 = 7$ cm, which is less than the $8$ cm between the centres, so the circles lie apart and have no common point.`, d: 2, c: 'application', t: [4] }), (C) => { C.assert(count(intCC([0, 0], 3, [8, 0], 4)) === 0, 'no common point'); C.key('f'); });

Q('tf5', mk.tf({ stem: r`The perpendicular bisector of a chord of a circle passes through the centre of the circle.`, key: 't', sol: r`True. The centre is the same distance (the radius) from the two ends of the chord, so by the locus of points equidistant from two points it lies on the perpendicular bisector of the chord.`, d: 2, c: 'understanding', t: [2] }), (C) => { const Cc = [1, 2], a = polar(Cc, 5, 20), b = polar(Cc, 5, 140); C.assert(near(distLine(Cc, perpBis(a, b)), 0), 'centre on the bisector of a chord'); C.key('t'); });

Q('tf6', mk.tf({ stem: r`A circle of radius $3$ cm drawn about a point $C$ on a line $l$ meets the pair of lines parallel to $l$ and $2$ cm from it in four points altogether.`, key: 't', sol: r`True. The two parallels are $2$ cm from $l$ and $2 < 3$, so the circle cuts each of them in $2$ points: $2 + 2 = 4$ points.`, d: 2, c: 'application', t: [4] }), (C) => { C.assert(nPts(2, 3) === 4, 'four points'); C.key('t'); });

Q('tf7', mk.tf({ stem: r`Two parallel kerbs have exactly one line of points that are equally far from both of them.`, key: 't', sol: r`True. The points equidistant from two parallel lines lie on the single line parallel to both and midway between them; unlike crossing lines, parallel lines have no second bisector.`, d: 1, c: 'understanding', t: [3] }), (C) => { const L = line(O, [1, 0]), U = parallel(L, 5), m = parallel(L, 2.5); C.assert(near(distLine(at(m, 1), L), distLine(at(m, 1), U)) && intLL(L, U) === null, 'one midline'); C.key('t'); });

Q('tf8', mk.tf({ stem: r`The perpendicular bisector of a segment $AB$ is the line $AB$ itself.`, key: 'f', sol: r`False. The perpendicular bisector crosses $AB$ at right angles at its mid-point. A point of the line $AB$ other than the mid-point is nearer to one end than the other, so it is not equidistant.`, d: 1, c: 'understanding', t: [2] }), (C) => { const a = [0, 0], b = [6, 0]; C.assert(!near(dist([1, 0], a), dist([1, 0], b)) && near(dist([3, 0], a), dist([3, 0], b)), 'only the mid-point of AB is equidistant'); C.key('f'); });

Q('tf9', mk.tf({ stem: r`A circle is the locus of the points that are at a given distance from a given point, the centre.`, key: 't', sol: r`True. This is the definition: the given distance is the radius, and every point at that distance is on the circle.`, d: 1, c: 'recall', t: [1] }), (C) => { C.assert([15, 95, 215].every((a) => near(dist(polar([2, 3], 4, a), [2, 3]), 4)), 'points of a circle'); C.key('t'); });

Q('tf10', mk.tf({ stem: r`A straight line and a circle can have exactly one point in common.`, key: 't', sol: r`True. When the line is at a distance from the centre equal to the radius, it touches the circle at one point (a tangent). Otherwise they meet in two points or not at all.`, d: 2, c: 'understanding', t: [4] }), (C) => { C.assert(count(intLC(line([0, 3], [1, 0]), O, 3)) === 1 && count(intLC(line([0, 2], [1, 0]), O, 3)) === 2 && count(intLC(line([0, 4], [1, 0]), O, 3)) === 0, 'counts 1, 2, 0'); C.key('t'); });

// =============================================================== fill in the blank
Q('fb1', mk.fill({ stem: r`The locus of points $3$ cm from a straight line is a pair of parallel lines that are ___ cm apart.`, acc: [['6']], sol: r`One parallel is $3$ cm from the line on each side, so the two are $3 + 3 = 6$ cm apart.`, d: 1, c: 'recall', t: [1] }), (C) => { A([r`3 + 3 = 6`]).verify(C); C.blank(6); });

Q('fb2', mk.fill({ stem: r`$P$ lies on the perpendicular bisector of $AB$, with $AB = 8$ cm and $PA = 5$ cm. The distance from $P$ to the mid-point of $AB$ is ___ cm.`, acc: [['3']], sol: r`With $M$ the mid-point, $AM = 4$ and the right triangle $AMP$ gives $PM = \sqrt{5^2 - 4^2} = \sqrt{9} = 3$ cm.`, d: 2, c: 'application', t: [2] }), (C) => { A([r`\sqrt{5^2 - 4^2} = \sqrt{9} = 3`]).verify(C); C.blank(3); });

Q('fb3', mk.fill({ stem: r`The two lines that form the locus of points equidistant from two crossing roads meet each other at an angle of ___ degrees.`, acc: [['90']], sol: r`The two bisectors are perpendicular: the half-angles of a straight line add up to $90^\circ$.`, d: 1, c: 'recall', t: [3] }), (C) => { C.blank(90); });

Q('fb4', mk.fill({ stem: r`A path has two straight parallel edges $9$ m apart. A line of lamps equidistant from the two edges is ___ m from each edge.`, acc: [['4.5', '9/2']], sol: r`The middle line is half the gap from each: $\dfrac{9}{2} = 4.5$ m.`, d: 1, c: 'understanding', t: [3] }), (C) => { A([r`\dfrac{9}{2} = 4.5`]).verify(C); C.blank(4.5); });

Q('fb5', mk.fill({ stem: r`The locus of the points that are equally far from two fixed points is the ___ of the line segment that joins them.`, acc: [['perpendicular bisector', 'perpendicular-bisector']], sol: r`Points equidistant from two fixed points lie on the perpendicular bisector of the segment joining them: it is the line through the mid-point at right angles to the segment, and it is the locus.`, d: 1, c: 'recall', t: [2] }), (C) => { C.blank('perpendicular bisector'); });

Q('fb6', mk.fill({ stem: r`A bisector of an angle of $84^\circ$ makes an angle of ___ degrees with each arm.`, acc: [['42']], sol: r`The bisector halves the angle: $\dfrac{84}{2} = 42$, so each part is $42^\circ$.`, d: 1, c: 'recall', t: [3] }), (C) => { A([r`\dfrac{84}{2} = 42`]).verify(C); C.blank(42); });

Q('fb7', mk.fill({ stem: r`All the points that are $4$ cm from a fixed point $O$ lie on a ___ of radius $4$ cm.`, acc: [['circle']], sol: r`The locus of points at a fixed distance from a fixed point is a circle: here the circle with centre $O$ and radius $4$ cm.`, d: 1, c: 'recall', t: [1] }), (C) => { C.blank('circle'); });

Q('fb8', mk.fill({ stem: r`The perpendicular bisector of a segment $AB$ passes through the ___ of $AB$.`, acc: [['mid-point', 'midpoint', 'mid point']], sol: r`By construction it cuts $AB$ at right angles at its mid-point, which is the one point of $AB$ equidistant from $A$ and $B$.`, d: 1, c: 'recall', t: [2] }), (C) => { C.blank('mid-point'); });

// =============================================================== numerical
const wn1 = A([r`\sqrt{17^2 - 8^2} = \sqrt{225} = 15`]);
Q('n01', mk.num({ stem: r`A buoy $P$ is the same distance from piers $A$ and $B$, which are $16$ m apart, and it is $17$ m from each pier. Find its distance from the line $AB$, in m.`, value: 15, sol: r`$P$ is on the perpendicular bisector of $AB$, so the foot of its perpendicular to $AB$ is the mid-point $M$ with $AM = 8$ m: ${wn1.md[0]}.`, scheme: [['PM = 15 m', 1]], d: 2, c: 'application', t: [2], time: 75 }), (C) => { wn1.verify(C); C.val(Math.sqrt(17 * 17 - 8 * 8)); });

Q('n02', mk.num({ stem: r`A point lies on the bisector of a $40^\circ$ angle between two straight rails, $10$ cm from the vertex. Find its distance from each rail, to the nearest $0.1$ cm.`, value: 3.4, tol: 0.05, sol: r`The bisector makes $20^\circ$ with each rail, so the distance is $10 \sin 20^\circ = 3.4$ cm.`, scheme: [['10 sin 20 degrees = 3.4 cm', 1]], d: 3, c: 'application', t: [3], time: 90 }), (C) => { const b = bisector(O, [1, 0], polar(O, 1, 40)), X = at(b, 10); C.assert(near(distLine(X, line(O, [1, 0])), 10 * sinD(20)) && near(distLine(X, line(O, [1, 0])), distLine(X, through(O, polar(O, 1, 40)))), 'equidistant, 10 sin 20'); C.val(r1(10 * sinD(20))); });

const wn3 = W(eqctx('x', [1]), [r`x = \dfrac{-3 + 5}{2} = 1`]);
Q('n03', mk.num({ stem: r`On a number line of survey markers, the points $A(-3, 0)$ and $B(5, 0)$ are given. A marker $P(x, y)$ is equidistant from $A$ and $B$. Find $x$.`, value: 1, sol: r`The perpendicular bisector of $AB$ is the vertical line through the mid-point, whose $x$-coordinate is ${wn3.md[0]}, so every such marker has $x = 1$.`, scheme: [['x = 1', 1]], d: 2, c: 'application', t: [2], time: 75 }), (C) => { const a = [-3, 0], b = [5, 0], L = perpBis(a, b); C.assert([-6, 1, 4].every((t) => near(at(L, t)[0], 1) && near(dist(at(L, t), a), dist(at(L, t), b))), 'x = 1 for every point of the bisector'); C.val(mid(a, b)[0]); });

const Ra = dist(Sc, SA);
Q('n04', mk.num({ marks: 2, stem: r`A rectangular plot has corners $A(0, 0)$, $B(6, 0)$ and $C(0, 8)$ on a plan. A fountain is placed at the point equidistant from all three corners. How far, in plan units, is it from $A$?`, value: 5, sol: r`The fountain is where the perpendicular bisectors of $AB$ and $AC$ meet: $x = 3$ and $y = 4$. Its distance from $A$ is $\sqrt{3^2 + 4^2} = 5$ units.`, scheme: [['centre (3, 4)', 1], ['distance 5', 1]], d: 4, c: 'analysis', t: [2, 4], time: 120 }), (C) => { A([r`\sqrt{3^2 + 4^2} = 5`]).verify(C); C.assert(near(Sc[0], 3) && near(Sc[1], 4), 'centre (3, 4)'); C.val(Ra); });

const wn5 = A([r`\dfrac{3}{50} = 0.06`, r`0.06 \times 100 = 6`]);
Q('n05', mk.num({ stem: r`A garden plan is drawn to the scale $1 : 50$. A sprinkler waters a circle of radius $3$ m. What is the radius of that circle on the plan, in cm?`, value: 6, sol: r`The real radius is $3$ m, which is $300$ cm, so on the plan it is $\dfrac{300}{50} = 6$ cm. In metres, $\dfrac{3}{50} = 0.06$ m, and ${wn5.md[1]} cm.`, scheme: [['6 cm', 1]], d: 2, c: 'application', t: [1], time: 90 }), (C) => { wn5.verify(C); C.val((3 * 100) / 50); });

const wn6 = A([r`\dfrac{5.4}{2} = 2.7`]);
Q('n06', mk.num({ stem: r`A paved cycle track has two straight parallel edges $5.4$ m apart. A line of reflectors is fixed equally far from both edges. How far is it from each edge, in m?`, value: 2.7, sol: r`The reflectors lie on the line midway between the edges: ${wn6.md[0]} m from each.`, scheme: [['2.7 m', 1]], d: 1, c: 'understanding', t: [3], time: 60 }), (C) => { wn6.verify(C); C.val(5.4 / 2); });

const half7 = (Math.asin(6 / 12) * 180) / Math.PI;
Q('n07', mk.num({ marks: 2, stem: r`A point on the bisector of the angle between two straight pipes is $12$ cm from the point where the pipes meet and $6$ cm from each pipe. Find the angle between the pipes, in degrees.`, value: 60, sol: r`The perpendicular to a pipe, the segment to the vertex and the pipe form a right triangle in which $\sin\left(\dfrac{\theta}{2}\right) = \dfrac{6}{12} = \dfrac{1}{2}$, so $\dfrac{\theta}{2} = 30^\circ$ and the angle between the pipes is $2 \times 30 = 60$ degrees.`, scheme: [['sin(half angle) = 1/2', 1], ['angle 60 degrees', 1]], d: 4, c: 'analysis', t: [3], time: 120 }), (C) => { A([r`\dfrac{6}{12} = \dfrac{1}{2}`, r`2 \times 30 = 60`]).verify(C); C.assert(near(half7, 30), 'half-angle 30'); const b = bisector(O, [1, 0], polar(O, 1, 60)), X = at(b, 12); C.assert(near(distLine(X, line(O, [1, 0])), 6), 'the constructed point is 6 from each pipe'); C.val(2 * half7); });

const wn8 = A([r`6.5^2 - 2.5^2 = 36`, r`\sqrt{36} = 6`, r`2 \times 6 = 12`]);
Q('n08', mk.num({ marks: 2, stem: r`Surveyors set pegs $2.5$ m from a straight fence and $6.5$ m from a gatepost $C$ on the fence. Two such pegs stand on the same side of the fence. Find the distance between them, in m.`, value: 12, sol: r`The pegs are where the circle of radius $6.5$ about $C$ meets the parallel at $2.5$ m. Each is $\sqrt{6.5^2 - 2.5^2} = \sqrt{36} = 6$ m along the fence from the foot of the perpendicular from $C$, on opposite sides, so they are ${wn8.md[2]} m apart.`, scheme: [['half-distance 6 m', 1], ['distance 12 m', 1]], d: 3, c: 'application', t: [4], time: 120 }), (C) => { wn8.verify(C); const pts = intLC(parallel(line(O, [1, 0]), 2.5), O, 6.5); C.assert(pts.length === 2 && pts.every((p) => near(dist(p, O), 6.5) && near(p[1], 2.5)), 'two pegs'); C.val(dist(pts[0], pts[1])); });

const wn9 = A([r`\dfrac{9.6}{2} = 4.8`]);
Q('n09', mk.num({ stem: r`Two taps $A$ and $B$ are fitted on a straight pipe $9.6$ m apart. A valve is to be fixed on the pipe at the point equally far from both taps. How far from $A$, in m, is the valve?`, value: 4.8, sol: r`On the segment $AB$ the only point equidistant from $A$ and $B$ is its mid-point, so the valve is ${wn9.md[0]} m from $A$.`, scheme: [['4.8 m', 1]], d: 1, c: 'understanding', t: [2], time: 45 }), (C) => { wn9.verify(C); C.val(mid([0, 0], [9.6, 0])[0]); });

// questions with short and long answers follow
await import('./questions2.mjs');
