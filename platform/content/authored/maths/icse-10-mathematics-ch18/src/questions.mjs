// ICSE 10 Mathematics ch18 Constructions: Tangents and Circles — objective items (mcq, assertion-reason, true-false,
// fill-blank, numerical). Short and long items are in questions2.mjs. Every key is recomputed from the givens with the
// constructions of tang.mjs (tangent points as intersections of circles, circumcentre and incentre as intersections of
// bisectors) or with exact fractions; MC() requires exactly one option to carry the right value.
import { Q, mk, r } from './lib.mjs';
import {
  must, near, dist, angDeg, r1, rd, tangents, concentric, triangle, hexagon, triSSS, triSAS, sinD, cosD, O, distLine, through,
} from './tang.mjs';
import { J, A, MC, f1 } from './qh.mjs';

let threw = (fn) => { try { fn(); return false; } catch { return true; } };
const hexR = (a) => hexagon(a);

// =============================================================== MCQ
MC('m01', { stem: r`To draw the tangents from an external point $P$ to a circle with centre $O$, a second circle is drawn to locate the points of contact. Which circle is it?`, key: 'b',
  right: { t: r`the circle with $OP$ as a diameter`, v: 'diameter' },
  wrong: [{ t: r`the circle with centre $P$ and radius $OP$`, v: 'P' }, { t: r`the circle with centre $O$ and radius $OP$`, v: 'O' }, { t: r`a circle with the mid-point of $OP$ as centre and the same radius as the given circle`, v: 'same' }],
  sol: r`The points of contact $A$ and $B$ must satisfy $\angle OAP = 90^\circ$, and every point that sees $OP$ at a right angle lies on the circle with $OP$ as diameter. So that circle, cut with the given circle, gives $A$ and $B$. The other three circles do not pass through $O$ and $P$ both, or have the wrong radius.`, d: 1, c: 'recall', t: [1], time: 45 },
  'diameter', (C) => { const t = tangents(3, 5); C.assert(near(dist(t.M, t.A), dist(t.M, t.O)) && near(dist(t.M, t.B), dist(t.M, t.P)) && !near(dist(t.M, t.A), t.r), 'contact points lie on the circle with diameter OP, whose radius is not r'); });

MC('m02', { stem: r`A straight rod $PA$ just touches a circular plate with centre $O$ at the point $A$. What is the size of the angle $OAP$ between the rod and the radius $OA$?`, key: 'c',
  right: { t: r`$90^\circ$`, v: 90 }, wrong: [{ t: r`$45^\circ$`, v: 45 }, { t: r`$60^\circ$`, v: 60 }, { t: r`$180^\circ$`, v: 180 }],
  sol: r`A tangent is perpendicular to the radius drawn to the point of contact, so $\angle OAP = 90^\circ$. The rod and the radius are not straight on one line (that would be $180^\circ$), and the other values have no reason to occur.`, d: 1, c: 'recall', t: [1], time: 45 },
  90, (C) => { const t = tangents(2.5, 6.5); C.assert(near(angDeg(t.A, t.O, t.P), 90) && near(angDeg(t.B, t.O, t.P), 90), 'angle OAP is a right angle'); });

MC('m03', { stem: r`A circular pond (imagined) has radius $5$ m. A gardener stands $13$ m from its centre and walks along a straight path that just touches the pond. How far does the gardener walk from the starting point to the point where the path touches the pond?`, key: 'c',
  right: { t: r`$12$ m`, v: 12 }, wrong: [{ t: r`$8$ m`, v: 8 }, { t: r`$13.9$ m`, v: 13.9 }, { t: r`$18$ m`, v: 18 }],
  sol: r`The path is perpendicular to the radius at the point of contact, so the centre, the gardener and the point of contact form a right triangle with hypotenuse $13$: $\sqrt{13^2 - 5^2} = \sqrt{144} = 12$ m. The value $8$ is $13 - 5$, $13.9$ is $\sqrt{13^2 + 5^2}$ rounded and $18$ is $13 + 5$.`, d: 2, c: 'application', t: [1], time: 75 },
  12, (C) => { A([r`\sqrt{13^2 - 5^2} = \sqrt{144} = 12`]).verify(C); C.assert(near(tangents(5, 13).len, 12) && 13 - 5 === 8 && r1(Math.hypot(13, 5)) === 13.9 && 13 + 5 === 18, 'distractors'); });

MC('m04', { stem: r`$PA$ and $PB$ are the two tangents drawn from an outside point $P$ to a circle with centre $O$, touching it at $A$ and $B$. Which statement is true for every such pair of tangents?`, key: 'a',
  right: { t: r`$PA = PB$`, v: 'equal' },
  wrong: [{ t: r`$PA \perp PB$`, v: 'perp' }, { t: r`$PA = OP$`, v: 'OP' }, { t: r`$\angle AOB = \angle APB$`, v: 'angles' }],
  sol: r`The right triangles $OAP$ and $OBP$ share the hypotenuse $OP$ and have $OA = OB$, so $PA = PB$ always. The tangents are at right angles only in the special case $OP = r\sqrt{2}$, $PA$ is shorter than $OP$, and $\angle AOB + \angle APB = 180^\circ$, so those two angles are equal only when both are $90^\circ$.`, d: 2, c: 'understanding', t: [1], time: 60 },
  'equal', (C) => { const t = tangents(3, 5); C.assert(near(dist(t.P, t.A), dist(t.P, t.B)) && !near(t.between, 90) && t.len < t.d && !near(t.angAOB, t.between), 'PA = PB; the other statements fail for r = 3, OP = 5'); });

MC('m05', { stem: r`While drawing the circle that passes through all three corners of a triangle, the centre of the circle is found as the meeting point of which three lines?`, key: 'd',
  right: { t: 'the perpendicular bisectors of the sides', v: 'perp bisectors' },
  wrong: [{ t: 'the bisectors of the angles', v: 'angle bisectors' }, { t: 'the medians', v: 'medians' }, { t: 'the altitudes', v: 'altitudes' }],
  sol: r`A point on the perpendicular bisector of a side is equally far from the two ends of that side. The meeting point of the three perpendicular bisectors is therefore equally far from all three corners, so it is the centre of the circle through them. The angle bisectors give the incircle, and medians and altitudes give no circle centre.`, d: 1, c: 'recall', t: [2], time: 45 },
  'perp bisectors', (C) => { const t = triangle(triSSS(7, 5, 6)); C.assert(near(dist(t.S, t.A), dist(t.S, t.B)) && near(dist(t.S, t.B), dist(t.S, t.C)) && !near(dist(t.I, t.A), dist(t.I, t.B)), 'the circumcentre is equidistant from the vertices, the incentre is not'); });

MC('m06', { stem: r`A circular tank is to be sunk inside a triangular lawn so that it touches all three edges. Where must the centre of the tank be placed?`, key: 'a',
  right: { t: 'where the three angle bisectors of the lawn meet', v: 'angle bisectors' },
  wrong: [{ t: 'where the three perpendicular bisectors of the edges meet', v: 'perp bisectors' }, { t: 'at the mid-point of the longest edge', v: 'midpoint' }, { t: 'at the corner with the largest angle', v: 'corner' }],
  sol: r`A point on an angle bisector is equally far from the two edges that form the angle. The meeting point of the three angle bisectors is equally far from all three edges, so a circle about it with that distance as radius touches all three. The perpendicular bisectors give the circle through the corners instead.`, d: 1, c: 'understanding', t: [2], time: 45 },
  'angle bisectors', (C) => { const t = triangle(triSSS(7, 5, 6)); C.assert(['BC', 'CA', 'AB'].every((n) => near(distLine(t.I, t.sides[n]), t.r)) && !['BC', 'CA', 'AB'].every((n) => near(distLine(t.S, t.sides[n]), distLine(t.S, t.sides.BC))), 'the incentre is equidistant from the sides, the circumcentre is not'); });

MC('m07', { stem: r`A triangular plot (imagined) has a right angle between boundary walls of lengths $8$ m and $15$ m. A circular fence passes through all three corners of the plot. What is the radius of the fence?`, key: 'b',
  right: { t: r`$8.5$ m`, v: 8.5 }, wrong: [{ t: r`$17$ m`, v: 17 }, { t: r`$11.5$ m`, v: 11.5 }, { t: r`$7.5$ m`, v: 7.5 }],
  sol: r`The longest side is $\sqrt{8^2 + 15^2} = \sqrt{289} = 17$ m, and in a right triangle the circumcentre is the mid-point of this hypotenuse, so the radius is $\dfrac{17}{2} = 8.5$ m. The value $17$ is the diameter, $11.5$ is the mean of the two walls and $7.5$ is half the longer wall.`, d: 2, c: 'application', t: [2], time: 90 },
  8.5, (C) => { A([r`\sqrt{8^2 + 15^2} = \sqrt{289} = 17`, r`\dfrac{17}{2} = 8.5`, r`\dfrac{8 + 15}{2} = 11.5`, r`\dfrac{15}{2} = 7.5`]).verify(C); const t = triangle(triSSS(17, 15, 8)); C.assert(near(t.R, 8.5) && t.rightAt === 'A', 'R = 8.5'); });

MC('m08', { stem: r`A disc is to be cut from a right-angled triangular sheet of sides $6$ cm, $8$ cm and $10$ cm so that it just touches all three sides. What is the greatest possible radius of the disc?`, key: 'd',
  right: { t: r`$2$ cm`, v: 2 }, wrong: [{ t: r`$2.4$ cm`, v: 2.4 }, { t: r`$4$ cm`, v: 4 }, { t: r`$1$ cm`, v: 1 }],
  sol: r`The disc is the incircle, with radius $\dfrac{\text{area}}{\text{semi-perimeter}} = \dfrac{24}{12} = 2$ cm (also $\dfrac{6 + 8 - 10}{2} = 2$). The value $2.4$ is half the altitude to the hypotenuse, $4$ is $6 + 8 - 10$ without halving, and $1$ is the area divided by the whole perimeter.`, d: 3, c: 'application', t: [2], time: 90 },
  2, (C) => { A([r`\dfrac{6 \times 8}{2} = 24`, r`\dfrac{6 + 8 + 10}{2} = 12`, r`\dfrac{24}{12} = 2`, r`\dfrac{6 + 8 - 10}{2} = 2`, r`\dfrac{24}{24} = 1`, r`6 + 8 - 10 = 4`]).verify(C); const t = triangle(triSSS(10, 8, 6)); C.assert(near(t.r, 2) && near(t.r * 2, 4) && r1((6 * 8) / 10 / 2) === 2.4, 'inradius 2'); });

MC('m09', { stem: r`A regular hexagon has each side $6$ cm long. What is the radius of the circle that passes through its six corners?`, key: 'a',
  right: { t: r`$6$ cm`, v: 6 }, wrong: [{ t: r`$3$ cm`, v: 3 }, { t: r`$12$ cm`, v: 12 }, { t: r`$5.2$ cm`, v: 5.2 }],
  sol: r`The centre and two neighbouring corners form an equilateral triangle, so the distance from the centre to a corner equals the side: $6$ cm. The value $3$ is half the side, $12$ is the diameter and $5.2$ is the radius of the incircle, not the circumcircle.`, d: 1, c: 'recall', t: [3], time: 45 },
  6, (C) => { const h = hexR(6); C.assert(near(h.R, 6) && r1(h.ap) === 5.2, 'R = 6 and the inradius is 5.2'); });

MC('m10', { stem: r`The incircle of a regular hexagon touches each side of the hexagon. Where does the circle touch a side?`, key: 'c',
  right: { t: 'at the mid-point of the side', v: 'midpoint' },
  wrong: [{ t: 'at one of the two ends of the side', v: 'end' }, { t: 'at the point one third of the way along the side', v: 'third' }, { t: 'at no definite point, because the circle crosses the side', v: 'crosses' }],
  sol: r`The radius to a point of contact is perpendicular to the side, and in a regular hexagon the perpendicular from the centre to a side meets it at its mid-point, by symmetry. The ends of the sides are the corners, which lie on the larger circle through the corners, outside the incircle.`, d: 2, c: 'understanding', t: [3], time: 60 },
  'midpoint', (C) => { const h = hexR(4); C.assert(near(angDeg(h.mids.MAB, O, h.V.A), 90) && near(dist(h.mids.MAB, h.V.A), dist(h.mids.MAB, h.V.B)) && dist(O, h.V.A) > h.ap, 'foot of the perpendicular is the mid-point; corners are outside the incircle'); });

MC('m11', { stem: r`A hexagonal floor tile (imagined) is a regular hexagon of side $8$ cm. A circular mat is to touch all six sides from inside. To the nearest $0.1$ cm, what is the radius of the mat?`, key: 'b',
  right: { t: r`$6.9$ cm`, v: 6.9 }, wrong: [{ t: r`$8$ cm`, v: 8 }, { t: r`$4$ cm`, v: 4 }, { t: r`$9.2$ cm`, v: 9.2 }],
  sol: r`The radius of the incircle is the perpendicular from the centre to a side. In the equilateral triangle formed by the centre and one side it is the height, $8 \sin 60^\circ = 6.9$ cm. The value $8$ is the radius of the circle through the corners, $4$ is half the side, and $9.2$ is $\dfrac{8}{\sin 60^\circ}$, which divides instead of multiplying.`, d: 3, c: 'application', t: [3], time: 90 },
  6.9, (C) => { const h = hexR(8); C.assert(r1(h.ap) === 6.9 && near(h.ap, 8 * sinD(60)) && r1(8 / sinD(60)) === 9.2, 'inradius 6.9; the wrong method gives 9.2'); });

MC('m12', { stem: r`A taut wire from a point $P$ just touches a circular pillar of radius $7$ cm. The point $P$ is $25$ cm from the axis of the pillar. How long is the wire between $P$ and the pillar?`, key: 'd',
  right: { t: r`$24$ cm`, v: 24 }, wrong: [{ t: r`$18$ cm`, v: 18 }, { t: r`$26$ cm`, v: 26 }, { t: r`$32$ cm`, v: 32 }],
  sol: r`The wire is a tangent, so it is at right angles to the radius at the point of contact: $\sqrt{25^2 - 7^2} = \sqrt{576} = 24$ cm. The value $18$ is $25 - 7$, $26$ is $\sqrt{25^2 + 7^2}$ rounded, and $32$ is $25 + 7$.`, d: 3, c: 'application', t: [1], time: 90 },
  24, (C) => { A([r`\sqrt{25^2 - 7^2} = \sqrt{576} = 24`]).verify(C); C.assert(near(tangents(7, 25).len, 24) && 25 - 7 === 18 && r1(Math.hypot(25, 7)) === 26 && 25 + 7 === 32, 'distractors'); });

MC('m13', { stem: r`Two straight paths just touch a circular lawn of radius $2.5$ m and meet at a lamp post $5$ m from the centre of the lawn. What angle do the two paths make with each other at the lamp post?`, key: 'b',
  right: { t: r`$60^\circ$`, v: 60 }, wrong: [{ t: r`$30^\circ$`, v: 30 }, { t: r`$90^\circ$`, v: 90 }, { t: r`$120^\circ$`, v: 120 }],
  sol: r`Each path is a tangent, so the right triangle formed by the centre, the lamp post and a point of contact has $\sin\angle P = \dfrac{2.5}{5} = \dfrac{1}{2}$, so each half-angle is $30^\circ$ and the angle between the paths is $60^\circ$. The value $30^\circ$ forgets to double, and $120^\circ$ is the angle at the centre between the two points of contact.`, d: 3, c: 'application', t: [1], time: 90 },
  60, (C) => { A([r`\dfrac{2.5}{5} = \dfrac{1}{2}`]).verify(C); const t = tangents(2.5, 5); C.assert(near(t.between, 60) && near(t.angAPO, 30) && near(t.angAOB, 120), 'angle APB = 60'); });

MC('m14', { stem: r`A ring-shaped track lies between two concentric circles of radii $13$ m and $5$ m. A straight plank is laid so that its ends touch the outer circle and its middle just touches the inner circle. How long is the plank?`, key: 'a',
  right: { t: r`$24$ m`, v: 24 }, wrong: [{ t: r`$12$ m`, v: 12 }, { t: r`$16$ m`, v: 16 }, { t: r`$26$ m`, v: 26 }],
  sol: r`The plank is a chord of the outer circle touching the inner circle, so the radius to the touching point bisects it at a right angle. Half the plank is $\sqrt{13^2 - 5^2} = \sqrt{144} = 12$ m, so the plank is $2 \times 12 = 24$ m. The value $12$ is only half, $16$ is $2(13 - 5)$ and $26$ is the diameter of the outer circle.`, d: 4, c: 'analysis', t: [1], time: 120 },
  24, (C) => { A([r`\sqrt{13^2 - 5^2} = \sqrt{144} = 12`, r`2 \times 12 = 24`, r`2 \times (13 - 5) = 16`]).verify(C); const c = concentric(13, 5); C.assert(near(c.chord, 24) && near(c.half, 12), 'chord 24'); });

MC('m15', { stem: r`An obtuse-angled triangular sail has its largest angle at $A$. Where does the centre of the circle through $A$, $B$ and $C$ lie?`, key: 'c',
  right: { t: r`outside the triangle, on the opposite side of $BC$ from $A$`, v: 'outside' },
  wrong: [{ t: 'inside the triangle', v: 'inside' }, { t: r`at the mid-point of $BC$`, v: 'midpoint' }, { t: r`at the vertex $A$`, v: 'vertex' }],
  sol: r`The perpendicular bisectors of the sides of an obtuse triangle meet outside it, beyond the longest side $BC$. The centre is inside for an acute triangle and at the mid-point of the longest side only for a right triangle, and it can never be a vertex because it is equidistant from all three.`, d: 2, c: 'understanding', t: [2], time: 60 },
  'outside', (C) => { const t = triangle(triSSS(8, 5, 4)); const sideBC = Math.sign(t.S[1]) !== Math.sign(t.A[1]); C.assert(t.obtuse && !t.inside && t.rightAt === null && sideBC && dist(t.S, t.A) > 0, 'obtuse: circumcentre outside, beyond BC'); });

MC('m16', { stem: r`A signboard in the shape of an equilateral triangle has sides of $9$ cm. A thin wire ring passes through its three corners. To the nearest $0.1$ cm, what is the radius of the ring?`, key: 'c',
  right: { t: r`$5.2$ cm`, v: 5.2 }, wrong: [{ t: r`$4.5$ cm`, v: 4.5 }, { t: r`$2.6$ cm`, v: 2.6 }, { t: r`$7.8$ cm`, v: 7.8 }],
  sol: r`The circumcentre of an equilateral triangle is its centre, and the circumradius is $\dfrac{9}{\sqrt{3}} = 5.2$ cm, which is two thirds of the height $7.8$ cm. The value $4.5$ is half the side, $2.6$ is the inradius (one third of the height), and $7.8$ is the full height.`, d: 3, c: 'application', t: [2], time: 90 },
  5.2, (C) => { const t = triangle(triSSS(9, 9, 9)); C.assert(r1(t.R) === 5.2 && r1(t.r) === 2.6 && r1((9 * Math.sqrt(3)) / 2) === 7.8 && near(t.R, (2 / 3) * ((9 * Math.sqrt(3)) / 2)), 'R = 5.2, r = 2.6, height 7.8'); });

MC('m17', { stem: r`A triangular garden has sides $6.5$ m, $7$ m and $7.5$ m. A circular pond just touches all three sides from inside. What is the radius of the pond?`, key: 'a',
  right: { t: r`$2$ m`, v: 2 }, wrong: [{ t: r`$1$ m`, v: 1 }, { t: r`$4$ m`, v: 4 }, { t: r`$3.2$ m`, v: 3.2 }],
  sol: r`The semi-perimeter is $s = \dfrac{6.5 + 7 + 7.5}{2} = 10.5$ and the area is $\sqrt{10.5 \times 4 \times 3.5 \times 3} = \sqrt{441} = 21$, so the inradius is $\dfrac{21}{10.5} = 2$ m. The value $1$ divides by the whole perimeter, $4$ is $\dfrac{2 \times 21}{10.5}$, and $3.2$ is the area divided by the side $6.5$.`, d: 3, c: 'application', t: [2], time: 120 },
  2, (C) => { A([r`\dfrac{6.5 + 7 + 7.5}{2} = 10.5`, r`\sqrt{10.5 \times 4 \times 3.5 \times 3} = \sqrt{441} = 21`, r`\dfrac{21}{10.5} = 2`]).verify(C); const t = triangle(triSSS(6.5, 7, 7.5)); C.assert(near(t.K, 21) && near(t.r, 2) && near(21 / 21, 1) && r1(21 / 6.5) === 3.2, 'inradius 2'); });

MC('m18', { stem: r`To fix the centre of the incircle of triangle $PQR$ with ruler and compasses, what is the least number of angle bisectors that you must draw?`, key: 'd',
  right: { t: r`$2$`, v: 2 }, wrong: [{ t: r`$1$`, v: 1 }, { t: r`$3$`, v: 3 }, { t: r`$6$`, v: 6 }],
  sol: r`Two lines meet in one point, so two angle bisectors already fix the incentre. A single bisector gives only a line of possible centres. The third bisector passes through the same point and only serves as a check, and six has no meaning here.`, d: 2, c: 'understanding', t: [2], time: 45 },
  2, (C) => { const t = triangle(triSSS(7, 5, 6)); C.assert(dist(intersect2(t.bA, t.bB), t.I) < 1e-9 && dist(intersect2(t.bB, t.bC), t.I) < 1e-9 && dist(intersect2(t.bA, t.bC), t.I) < 1e-9, 'any two bisectors give the incentre'); });

MC('m19', { stem: r`A hexagonal bolt head (imagined) is a regular hexagon with perimeter $30$ mm. What is the radius of the circle through its six corners?`, key: 'c',
  right: { t: r`$5$ mm`, v: 5 }, wrong: [{ t: r`$2.5$ mm`, v: 2.5 }, { t: r`$6$ mm`, v: 6 }, { t: r`$4.3$ mm`, v: 4.3 }],
  sol: r`The six sides are equal, so one side is $\dfrac{30}{6} = 5$ mm, and the radius of the circle through the corners equals the side: $5$ mm. The value $2.5$ is half the side, $6$ is the number of sides, and $4.3$ is the inradius $5 \sin 60^\circ$.`, d: 3, c: 'application', t: [3], time: 75 },
  5, (C) => { A([r`\dfrac{30}{6} = 5`]).verify(C); const h = hexR(5); C.assert(near(h.perimeter, 30) && near(h.R, 5) && r1(h.ap) === 4.3, 'R = 5, inradius 4.3'); });

MC('m20', { stem: r`How many tangents can be drawn to a circle of radius $6$ cm from a point that is $4$ cm from its centre?`, key: 'a',
  right: { t: 'none', v: 0 }, wrong: [{ t: 'exactly one', v: 1 }, { t: 'exactly two', v: 2 }, { t: 'infinitely many', v: 99 }],
  sol: r`A point $4$ cm from the centre of a circle of radius $6$ cm is inside the circle. Every line through an inside point cuts the circle in two points, so none of them touches it, and no tangent exists. Two tangents exist only for a point outside, and one only for a point on the circle.`, d: 2, c: 'understanding', t: [1], time: 45 },
  0, (C) => { C.assert(threw(() => tangents(6, 4)) && 4 < 6, 'no tangents from an inside point'); });

MC('m21', { stem: r`A tangent meets a circle in just one point. What is this point called?`, key: 'd',
  right: { t: 'the point of contact', v: 'contact' },
  wrong: [{ t: 'the mid-point of a chord', v: 'chord' }, { t: 'the external point', v: 'external' }, { t: 'the centre of the circle', v: 'centre' }],
  sol: r`The single common point of a tangent and the circle is the point of contact, and the radius drawn to it is perpendicular to the tangent. The external point is where two tangents start, outside the circle, and the centre is the middle of the circle.`, d: 1, c: 'recall', t: [1], time: 30 },
  'contact', (C) => { const t = tangents(3, 5); C.assert(near(dist(t.A, t.O), 3) && dist(t.P, t.O) > 3, 'A is on the circle, P is outside'); });

MC('m22', { stem: r`In triangle $ABC$ the bisectors of angles $A$ and $B$ meet at $I$. What does the bisector of angle $C$ do?`, key: 'b',
  right: { t: r`it also passes through $I$`, v: 'through I' },
  wrong: [{ t: r`it is parallel to the bisector of angle $A$`, v: 'parallel' }, { t: r`it meets the other two bisectors in two different points`, v: 'different' }, { t: r`it is perpendicular to $AB$`, v: 'perpendicular' }],
  sol: r`The three angle bisectors of a triangle are concurrent: they meet at the incentre $I$, which is equally far from all three sides. So the third bisector passes through the point where the first two meet. It is not parallel to another bisector, and it is perpendicular to $AB$ only for special triangles.`, d: 2, c: 'understanding', t: [2], time: 60 },
  'through I', (C) => { const t = triangle(triSSS(7, 4, 6)); C.assert(distLine(t.I, t.bC) < 1e-9 && !near(t.a, t.b), 'the third bisector passes through I; CA and CB differ, so it is not perpendicular to AB'); });

function intersect2(L1, L2) { const c = L1.d[0] * L2.d[1] - L1.d[1] * L2.d[0]; const w = [L2.p[0] - L1.p[0], L2.p[1] - L1.p[1]]; const t = (w[0] * L2.d[1] - w[1] * L2.d[0]) / c; return [L1.p[0] + L1.d[0] * t, L1.p[1] + L1.d[1] * t]; }

// =============================================================== assertion-reason
Q('ar1', mk.ar({ a: r`When tangents are drawn from $P$ to a circle with centre $O$, the points of contact lie on the circle that has $OP$ as a diameter.`, r: r`A tangent is perpendicular to the radius at its point of contact, and an angle in a semicircle is a right angle.`, key: 'a', sol: r`Both are true. Since $\angle OAP = 90^\circ$ at each point of contact, $A$ and $B$ see $OP$ at a right angle, which happens exactly for points of the circle on $OP$ as diameter. So R explains A.`, d: 2, c: 'understanding', t: [1] }), (C) => { const t = tangents(4, 7); C.assert(near(dist(t.M, t.A), t.d / 2) && near(dist(t.M, t.B), t.d / 2) && near(angDeg(t.A, t.O, t.P), 90), 'contact points on the circle with diameter OP; right angle'); C.key('a'); });

Q('ar2', mk.ar({ a: r`The circumcentre of an obtuse-angled triangle lies inside the triangle.`, r: r`The circumcentre is the point where the perpendicular bisectors of the three sides meet.`, key: 'd', sol: r`R is true: that is how the circumcentre is found. A is false: in an obtuse triangle the three perpendicular bisectors meet outside the triangle, beyond the longest side. So A is false but R is true.`, d: 3, c: 'analysis', t: [2] }), (C) => { const t = triangle(triSSS(9, 5, 5)); C.assert(t.obtuse && !t.inside && near(dist(t.S, t.A), dist(t.S, t.B)), 'the circumcentre of an obtuse triangle is outside'); C.key('d'); });

Q('ar3', mk.ar({ a: r`In an equilateral triangle, the circumcentre and the incentre are the same point.`, r: r`All three angles of an equilateral triangle are $60^\circ$.`, key: 'b', sol: r`Both statements are true. The reason is that the perpendicular bisector of each side also bisects the opposite angle, because the triangle is symmetric about it; the fact that each angle is $60^\circ$ does not by itself show that, so R is true but is not the explanation of A.`, d: 3, c: 'analysis', t: [2] }), (C) => { const t = triangle(triSSS(6, 6, 6)); C.assert(dist(t.S, t.I) < 1e-9 && Object.values(t.angles).every((v) => near(v, 60)), 'centres coincide; all angles 60'); C.key('b'); });

Q('ar4', mk.ar({ a: r`The two tangents from an outside point to a circle make equal angles with the line joining that point to the centre.`, r: r`The two tangents from an outside point to a circle are always perpendicular to each other.`, key: 'c', sol: r`A is true: the right triangles $OAP$ and $OBP$ are congruent, so $\angle APO = \angle BPO$. R is false: the angle between the tangents is $2\sin^{-1}\left(\dfrac{r}{d}\right)$, which is $90^\circ$ only when $d = r\sqrt{2}$; for $r = 3$ and $d = 5$ it is about $74^\circ$.`, d: 2, c: 'understanding', t: [1] }), (C) => { const t = tangents(3, 5); C.assert(near(angDeg(t.P, t.A, t.O), angDeg(t.P, t.B, t.O)) && !near(t.between, 90) && rd(t.between) === 74, 'equal half-angles; the tangents are not perpendicular'); C.key('c'); });

Q('ar5', mk.ar({ a: r`A regular hexagon of side $6$ cm has an incircle of radius $6$ cm.`, r: r`The circle through the six corners of a regular hexagon has a radius equal to its side.`, key: 'd', sol: r`R is true: the radius of the circle through the corners equals the side, $6$ cm. A is false: the incircle is smaller, with radius $6 \sin 60^\circ = 5.2$ cm, because it touches the sides at their mid-points and not at the corners.`, d: 3, c: 'analysis', t: [3] }), (C) => { const h = hexR(6); C.assert(near(h.R, 6) && r1(h.ap) === 5.2 && h.ap < 6, 'circumradius 6, inradius 5.2'); C.key('d'); });

Q('ar6', mk.ar({ a: r`A tangent drawn from a point $13$ cm from the centre of a circle of radius $5$ cm is $12$ cm long.`, r: r`The two tangents drawn from an outside point to a circle are equal in length.`, key: 'b', sol: r`Both are true, but R does not explain the value $12$: that comes from the right triangle, $\sqrt{13^2 - 5^2} = 12$, which uses the tangent being perpendicular to the radius. Equal tangents are a different fact.`, d: 3, c: 'application', t: [1] }), (C) => { A([r`\sqrt{13^2 - 5^2} = \sqrt{144} = 12`]).verify(C); const t = tangents(5, 13); C.assert(near(t.len, 12) && near(dist(t.P, t.A), dist(t.P, t.B)), 'tangent 12, tangents equal'); C.key('b'); });

// =============================================================== true-false
Q('tf1', mk.tf({ stem: r`Two different tangents can be drawn to a circle from a point that lies on the circle itself.`, key: 'f', sol: r`False. Through a point of the circle there is exactly one tangent, the line perpendicular to the radius at that point. Two tangents exist only for a point outside the circle.`, d: 1, c: 'recall', t: [1] }), (C) => { C.assert(threw(() => tangents(3, 3)), 'no pair of tangents from a point on the circle'); C.key('f'); });

Q('tf2', mk.tf({ stem: r`For a regular hexagon of side $4$ cm, the circle that touches its sides from inside has a radius smaller than $4$ cm.`, key: 't', sol: r`True. The radius of the incircle is $4 \sin 60^\circ \approx 3.5$ cm, which is less than the radius $4$ cm of the circle through the corners.`, d: 2, c: 'understanding', t: [3] }), (C) => { const h = hexR(4); C.assert(h.ap < 4 && r1(h.ap) === 3.5, 'inradius 3.5 < 4'); C.key('t'); });

Q('tf3', mk.tf({ stem: r`The centre of the incircle of a triangle is the same distance from the three corners of the triangle.`, key: 'f', sol: r`False. The incentre is the same distance from the three sides (the inradius), not from the corners. The point equidistant from the corners is the circumcentre, and the two points are different unless the triangle is equilateral.`, d: 1, c: 'understanding', t: [2] }), (C) => { const t = triangle(triSSS(7, 5, 6)); C.assert(!near(dist(t.I, t.A), dist(t.I, t.B)) && near(distLine(t.I, t.sides.BC), distLine(t.I, t.sides.CA)), 'not equidistant from the corners, but from the sides'); C.key('f'); });

Q('tf4', mk.tf({ stem: r`A stick from a point $5$ cm away from the centre of a circle of radius $4$ cm just touches the circle. The length of the stick between the point and the circle is $3$ cm.`, key: 't', sol: r`True. The stick is a tangent, so $\sqrt{5^2 - 4^2} = \sqrt{9} = 3$ cm.`, d: 2, c: 'application', t: [1] }), (C) => { A([r`\sqrt{5^2 - 4^2} = \sqrt{9} = 3`]).verify(C); C.assert(near(tangents(4, 5).len, 3), 'tangent 3'); C.key('t'); });

Q('tf5', mk.tf({ stem: r`In a right-angled triangle, the centre of the circle through the three corners is the vertex at the right angle.`, key: 'f', sol: r`False. The centre of the circumcircle of a right triangle is the mid-point of the hypotenuse, so the hypotenuse is a diameter. The vertex at the right angle is on the circle, not at its centre.`, d: 2, c: 'understanding', t: [2] }), (C) => { const t = triangle(triSSS(13, 12, 5)); C.assert(t.rightAt === 'A' && dist(t.S, t.A) > 1 && near(dist(t.S, [(t.B[0] + t.C[0]) / 2, (t.B[1] + t.C[1]) / 2]), 0), 'circumcentre at the mid-point of the hypotenuse'); C.key('f'); });

Q('tf6', mk.tf({ stem: r`The perpendicular bisectors of the three sides of any triangle all pass through one point.`, key: 't', sol: r`True. The meeting point of two perpendicular bisectors is equally far from all three corners, so it lies on the third perpendicular bisector too. This point is the circumcentre.`, d: 1, c: 'understanding', t: [2] }), (C) => { const t = triangle(triSAS(6, 4, 120)); C.assert(['AB', 'BC', 'CA'].every((n) => { const [p, q] = n.split('').map((c) => t[c]); return near(dist(t.S, p), dist(t.S, q)); }), 'S is on all three perpendicular bisectors'); C.key('t'); });

Q('tf7', mk.tf({ stem: r`In a regular hexagon, the length of one side is half the radius of the circle through its six corners.`, key: 'f', sol: r`False. The side equals that radius, because the centre and two neighbouring corners form an equilateral triangle. A side that is half the radius would be too short to close the hexagon.`, d: 2, c: 'understanding', t: [3] }), (C) => { const h = hexR(5); C.assert(near(dist(h.V.A, h.V.B), h.R) && !near(dist(h.V.A, h.V.B), h.R / 2), 'side = radius'); C.key('f'); });

// =============================================================== fill in the blank
Q('fb1', mk.fill({ stem: r`A cable from a hook $P$, $17$ m from the centre of a circular water tank of radius $8$ m, just touches the tank. The length of cable from $P$ to the point where it touches the tank is ___ m.`, acc: [['15']], sol: r`The cable is a tangent, perpendicular to the radius at the point of contact, so its length is $\sqrt{17^2 - 8^2} = \sqrt{225} = 15$ m.`, d: 2, c: 'understanding', t: [1] }), (C) => { A([r`\sqrt{17^2 - 8^2} = \sqrt{225} = 15`]).verify(C); C.assert(near(tangents(8, 17).len, 15), 'tangent 15'); C.blank(15); });

Q('fb2', mk.fill({ stem: r`A triangular metal plate has sides $5$ cm, $12$ cm and $13$ cm. The radius of the circle through its three corners is ___ cm.`, acc: [['6.5']], sol: r`$5^2 + 12^2 = 169 = 13^2$, so the triangle is right-angled and its hypotenuse $13$ is a diameter of the circle through the corners. The radius is $\dfrac{13}{2} = 6.5$ cm.`, d: 2, c: 'application', t: [2] }), (C) => { A([r`5^2 + 12^2 = 169`, r`13^2 = 169`, r`\dfrac{13}{2} = 6.5`]).verify(C); C.assert(near(triangle(triSSS(13, 12, 5)).R, 6.5), 'R = 6.5'); C.blank(6.5); });

Q('fb3', mk.fill({ stem: r`In a regular hexagon with centre $O$, each side subtends an angle of ___ degrees at $O$.`, acc: [['60']], sol: r`The six sides share the full turn of $360^\circ$ equally, so each subtends $\dfrac{360}{6} = 60^\circ$ at the centre.`, d: 1, c: 'recall', t: [3] }), (C) => { A([r`\dfrac{360}{6} = 60`]).verify(C); const h = hexR(4); C.assert(near(angDeg(O, h.V.A, h.V.B), 60), '60 degrees'); C.blank(60); });

Q('fb4', mk.fill({ stem: r`A set square is a right-angled triangle with sides $9$ cm, $12$ cm and $15$ cm. The largest circle that fits inside it has radius ___ cm.`, acc: [['3']], sol: r`The largest circle inside is the incircle, with radius $\dfrac{9 + 12 - 15}{2} = 3$ cm for a right triangle (equivalently the area $54$ divided by the semi-perimeter $18$ is $3$).`, d: 2, c: 'understanding', t: [2] }), (C) => { A([r`\dfrac{9 + 12 - 15}{2} = 3`, r`\dfrac{9 \times 12}{2} = 54`, r`\dfrac{9 + 12 + 15}{2} = 18`, r`\dfrac{54}{18} = 3`]).verify(C); C.assert(near(triangle(triSSS(15, 12, 9)).r, 3), 'r = 3'); C.blank(3); });

Q('fb5', mk.fill({ stem: r`The circle that passes through all three vertices of a triangle is called the ___ of the triangle.`, acc: [['circumcircle', 'circum-circle', 'circum circle']], sol: r`A circle through all three vertices is the circumcircle, and its centre, the circumcentre, is the meeting point of the perpendicular bisectors of the sides.`, d: 1, c: 'recall', t: [2] }), (C) => { C.assert(true, 'definition item'); C.blank('circumcircle'); });

// =============================================================== numerical
Q('n1', mk.num({ stem: r`A rope is stretched from a peg $P$ so that it just touches a circular fountain of radius $9$ m. The peg is $15$ m from the centre of the fountain. Find the length of rope between the peg and the fountain, in m.`, value: 12, sol: r`The rope is a tangent, so it is at right angles to the radius at the point of contact and $\sqrt{15^2 - 9^2} = \sqrt{144} = 12$ m.`, scheme: [['length = 12 m', 1]], d: 2, c: 'understanding', t: [1], time: 75 }), (C) => { A([r`\sqrt{15^2 - 9^2} = \sqrt{144} = 12`]).verify(C); C.val(tangents(9, 15).len); });

Q('n2', mk.num({ stem: r`A ring-shaped garden lies between two circles with the same centre, of radii $17$ m and $8$ m. Find the length of the longest straight path that stays inside the garden and is a chord of the outer circle touching the inner circle, in m.`, value: 30, sol: r`The radius to the touching point bisects the path at a right angle, so half the path is $\sqrt{17^2 - 8^2} = \sqrt{225} = 15$ m, and the whole path is $2 \times 15 = 30$ m.`, scheme: [['half-length 15 m', 1], ['length = 30 m', 1]], marks: 2, d: 3, c: 'analysis', t: [1], time: 100 }), (C) => { A([r`\sqrt{17^2 - 8^2} = \sqrt{225} = 15`, r`2 \times 15 = 30`]).verify(C); C.val(concentric(17, 8).chord); });

Q('n3', mk.num({ stem: r`A triangular glass pane has sides $7$ cm, $24$ cm and $25$ cm. Find the radius of the circular frame that passes through its three corners, in cm.`, value: 12.5, sol: r`$7^2 + 24^2 = 625 = 25^2$, so the pane is right-angled and the longest side is a diameter of the frame. The radius is $\dfrac{25}{2} = 12.5$ cm.`, scheme: [['right angle shown; radius = 12.5 cm', 1]], d: 2, c: 'understanding', t: [2], time: 75 }), (C) => { A([r`7^2 + 24^2 = 625`, r`25^2 = 625`, r`\dfrac{25}{2} = 12.5`]).verify(C); C.val(triangle(triSSS(25, 24, 7)).R); });

Q('n4', mk.num({ stem: r`A triangular plot has sides $13$ m, $14$ m and $15$ m. The largest circular flower bed that fits in the plot touches all three sides. Find its radius, in m.`, value: 4, sol: r`The semi-perimeter is $\dfrac{13 + 14 + 15}{2} = 21$ and the area is $\sqrt{21 \times 8 \times 7 \times 6} = \sqrt{7056} = 84$, so the radius is $\dfrac{84}{21} = 4$ m.`, scheme: [['area 84', 1], ['radius = 4 m', 1]], marks: 2, d: 3, c: 'application', t: [2], time: 120 }), (C) => { A([r`\dfrac{13 + 14 + 15}{2} = 21`, r`\sqrt{21 \times 8 \times 7 \times 6} = \sqrt{7056} = 84`, r`\dfrac{84}{21} = 4`]).verify(C); const t = triangle(triSSS(14, 15, 13)); C.assert(near(t.K, 84), 'area 84'); C.val(t.r, 1e-9); });

Q('n5', mk.num({ stem: r`A table-top is a regular hexagon of side $6$ cm in a model. A circular coaster touches all six sides from inside. Find its radius to the nearest $0.1$ cm.`, value: 5.2, tol: 0.05, sol: r`The radius of the incircle is the height of the equilateral triangle formed by the centre and one side: $6 \sin 60^\circ = 5.2$ cm.`, scheme: [['6 sin 60 degrees = 5.2 cm', 1]], d: 3, c: 'application', t: [3], time: 90 }), (C) => { const h = hexR(6); C.assert(near(h.ap, 6 * sinD(60)) && r1(h.ap) === 5.2, 'inradius 5.2'); C.val(r1(h.ap)); });

Q('n6', mk.num({ stem: r`Two tangents to a circle of radius $5$ cm are inclined to each other at $60^\circ$. Find the distance, in cm, from the point where they meet to the centre of the circle.`, value: 10, sol: r`The line to the centre bisects the $60^\circ$ angle, so each half-angle is $30^\circ$ and $\sin 30^\circ = \dfrac{1}{2} = \dfrac{5}{OP}$. Hence $OP = 5 \div \dfrac{1}{2} = 10$ cm.`, scheme: [['sin 30 degrees = 1/2 used', 1], ['OP = 10 cm', 1]], marks: 2, d: 3, c: 'application', t: [1], time: 100 }), (C) => { A([r`5 \div \dfrac{1}{2} = 10`]).verify(C); const t = tangents(5, 10); C.assert(near(t.between, 60), 'tangents at 60'); C.val(t.d); });
