// CBSE 10 Mathematics ch10 Circles — practice bank with independent re-solve checks
// (lengths by Pythagoras from the givens, angles measured on coordinates built from the givens with the
// exact tangent construction, tangent-length bookkeeping for circumscribed polygons).
import { Q, caseQ, child, mk, r, geom, dist, angleDeg, polar, tangentPts, meet, pt, tangentialPolygon, along, tangentPtsRaw } from './lib.mjs';

const leg = (h, a) => Math.sqrt(h * h - a * a);
const hyp = (a, b) => Math.hypot(a, b);
const near = (u, v, e = 1e-9) => Math.abs(u - v) < e;
const deg = (x) => (x * Math.PI) / 180;
/** Number of common points of a circle of radius rr and a line at distance d from its centre. */
const meets = (rr, d) => (d < rr ? 2 : d === rr ? 1 : 0);
/** Number of tangents from a point at distance d from the centre. */
const tangentsFrom = (rr, d) => (d < rr ? 0 : d === rr ? 1 : 2);
/** Tangents from P to the unit circle when the angle between them is a: returns O, P, A, B. */
function twoTangents(a, rr = 1) {
  const O = [0, 0];
  const P = [rr / Math.sin(deg(a / 2)), 0];
  const [A, B] = tangentPtsRaw(O, rr, P);
  return { O, P, A, B };
}
/** Tangent lengths of a triangle with sides a = BC, b = CA, c = AB: [from A, from B, from C]. */
const tri = (a, b, c) => { const s = (a + b + c) / 2; return [s - a, s - b, s - c]; };

// ---------------------------------------------------------------- figures used in questions
const ABcd = (() => {
  const O = [3, 2.5], A = [1, 2.5], B = [5, 2.5], C = polar(O, 2, 64);
  const D = meet(C, [C[0] + Math.sin(deg(64)), C[1] - Math.cos(deg(64))], A, B);
  return { O, A, B, C, D };
})();
const figS307 = geom({
  width: 8.2, height: 4.9,
  points: { O: ABcd.O, A: ABcd.A, B: ABcd.B, C: { at: ABcd.C, label_position: 'n' }, D: ABcd.D },
  segments: [{ from: 'A', to: 'D' }, { from: 'A', to: 'C' }, { from: 'C', to: 'B' }, { from: 'C', to: 'D' }, { from: 'O', to: 'C', dashed: true }],
  circles: [{ center: 'O', radius: 2 }],
  angles: [{ at: 'A', from: 'B', to: 'C', label: '32°' }, { at: 'D', from: 'C', to: 'A', label: '?' }, { at: 'C', from: 'O', to: 'D', right: true }],
  on: [['A', 'O'], ['B', 'O'], ['C', 'O']], perp: [['O', 'C', 'D']], col: [['A', 'B', 'D'], ['A', 'O', 'B']], deg: [['B', 'A', 'C', 32], ['C', 'D', 'A', 26], ['B', 'C', 'D', 32]],
}, 'Circle with centre O and diameter AB extended beyond B to a point D. Chord AC makes an angle of 32 degrees with AB, and the tangent at C meets the line AB at D. The angle at D is marked with a question mark.', 'AB is a diameter, $\\angle BAC = 32^\\circ$ and $CD$ is the tangent at $C$.');

const wheel = (() => {
  const k = 0.1; const F = [3, 0.4]; const O = [3, 0.4 + 24 * k]; const A = [3 + 7 * k, 0.4];
  const [T1, T2] = tangentPts(O, 15 * k, A); const T = T1[0] > T2[0] ? T1 : T2; const T2b = T1[0] > T2[0] ? T2 : T1;
  return { O, F, A, T, T2: T2b, k };
})();
const figWheel = geom({
  width: 6.2, height: 4.7,
  points: { O: wheel.O, F: { at: wheel.F, label_position: 's' }, A: { at: wheel.A, label_position: 's' }, T: { at: wheel.T, label_position: 'ne' }, G: { at: [0.3, 0.4], label: false }, H: { at: [6, 0.4], label: false } },
  segments: [{ from: 'G', to: 'H' }, { from: 'O', to: 'F', label: '24 m', dashed: true }, { from: 'F', to: 'A', label: '7 m' }, { from: 'O', to: 'T', label: '15 m' }, { from: 'A', to: 'T', label: '?' }, { from: 'O', to: 'A', dashed: true }],
  circles: [{ center: 'O', radius: 1.5 }],
  angles: [{ at: 'F', from: 'O', to: 'A', right: true }, { at: 'T', from: 'O', to: 'A', right: true }],
  on: [['T', 'O']], perp: [['O', 'T', 'A'], ['O', 'F', 'A']],
}, 'A giant wheel drawn as a circle of radius 15 metres whose centre O is 24 metres above the ground at F. An anchor A on the ground is 7 metres from F. A cable from A touches the wheel at T, at right angles to the radius OT; its length is marked with a question mark.', 'The cable $AT$ is a tangent: $OT \\perp AT$. (Scale: $1$ unit $= 10$ m.)');

const bangle = { P: [0.5, 0.5], O: [2.25, 2.25], A: [2.25, 0.5], B: [0.5, 2.25] };
const figBangle = geom({
  width: 5, height: 5,
  points: { P: { at: bangle.P, label_position: 'sw' }, O: bangle.O, A: { at: bangle.A, label_position: 's' }, B: { at: bangle.B, label_position: 'w' }, X: { at: [4.6, 0.5], label: false }, Y: { at: [0.5, 4.6], label: false } },
  segments: [{ from: 'P', to: 'X' }, { from: 'P', to: 'Y' }, { from: 'O', to: 'A', label: '3.5 cm' }, { from: 'O', to: 'B', dashed: true }, { from: 'O', to: 'P', dashed: true }],
  circles: [{ center: 'O', radius: 1.75 }],
  angles: [{ at: 'P', from: 'X', to: 'Y', right: true }, { at: 'A', from: 'O', to: 'X', right: true }, { at: 'B', from: 'O', to: 'Y', right: true }],
  on: [['A', 'O'], ['B', 'O']], perp: [['O', 'A', 'P'], ['O', 'B', 'P'], ['X', 'P', 'Y']], eq: [['P', 'A', 'P', 'B']],
}, 'A bangle drawn as a circle of radius 3.5 centimetres resting in the square corner P of a tray. It touches one edge at A and the other edge at B; the radii OA and OB are perpendicular to the edges.', 'The edges $PA$ and $PB$ are tangents to the bangle.');

const kiteQ = tangentialPolygon([10, 15, 16, 13], 0.13, [4.1, 3.75], 205);
const figPlot = (() => {
  const [A, B, C, D] = kiteQ.V; const [P, Qp, R, S] = kiteQ.T;
  return geom({
    width: 8.4, height: 7.4,
    points: { A: { at: A, label_position: 'sw' }, B: { at: B, label_position: 'se' }, C: { at: C, label_position: 'ne' }, D: { at: D, label_position: 'nw' }, O: [4.1, 3.75], P: { at: P, label_position: 's' }, Q: { at: Qp, label_position: 'e' }, R: { at: R, label_position: 'n' }, S: { at: S, label_position: 'w' } },
    segments: [{ from: 'A', to: 'B', label: '25 m' }, { from: 'B', to: 'C', label: '31 m' }, { from: 'C', to: 'D', label: '29 m' }, { from: 'D', to: 'A', label: '?' }],
    circles: [{ center: 'O', radius: kiteQ.rd }],
    on: [['P', 'O'], ['Q', 'O'], ['R', 'O'], ['S', 'O']], perp: [['O', 'P', 'B'], ['O', 'Q', 'C'], ['O', 'R', 'D'], ['O', 'S', 'A']], col: [['A', 'P', 'B'], ['B', 'Q', 'C'], ['C', 'R', 'D'], ['D', 'S', 'A']],
  }, 'A four-sided plot ABCD with a circular pond inside that touches all four sides at P, Q, R and S. AB is 25 metres, BC is 31 metres, CD is 29 metres, and DA is marked with a question mark.', 'The pond touches $AB$, $BC$, $CD$ and $DA$ at $P$, $Q$, $R$ and $S$.');
})();

// =============================================================== MCQ
Q('m01', mk.mcq({ stem: 'A tangent to a circle meets the circle at', opts: ['exactly one point', 'exactly two points', 'no point', 'infinitely many points'], key: 'a', sol: r`By definition a tangent **touches** the circle: it has exactly one point in common with it, the point of contact. A line meeting the circle at two points is a secant (b); a line with no common point (c) does not meet the circle at all.`, d: 1, c: 'recall', t: [1], time: 30 }), (C) => C.which(['one', 'two', 'none', 'many'], ['none', 'one', 'two'][meets(5, 5)]));
Q('m02', mk.mcq({ stem: 'How many tangents can be drawn to a circle from a point that lies inside the circle?', opts: ['none', 'exactly one', 'exactly two', 'infinitely many'], key: 'a', sol: r`Every line through an interior point cuts the circle at two points, so every such line is a secant. No tangent passes through a point inside the circle. (From a point **on** the circle there is exactly one tangent; from a point outside, exactly two.)`, d: 1, c: 'recall', t: [1], time: 45 }), (C) => C.which(['none', 'one', 'two', 'many'], ['none', 'one', 'two'][tangentsFrom(5, 3)]));
Q('m03', mk.mcq({ stem: 'A line that meets a circle at two distinct points is called', opts: ['a secant', 'a tangent', 'a radius', 'a diameter'], key: 'a', sol: r`A line with two common points with the circle is a **secant**. A tangent has one common point; a radius and a diameter are segments through the centre, not lines that just "meet" the circle.`, d: 1, c: 'recall', t: [1], time: 30 }), (C) => { C.assert(meets(5, 3) === 2, 'line at distance 3 < 5 meets twice'); C.key('a'); });
Q('m04', mk.mcq({ stem: r`The centre of a circle of radius $5$ cm is at a distance of $5$ cm from a line $l$. Then $l$ is`, opts: ['a secant of the circle', 'a tangent to the circle', 'a line that does not meet the circle', 'a diameter of the circle'], key: 'b', sol: r`Compare the distance $d$ of the line from the centre with the radius $r$: $d < r$ secant, $d = r$ tangent, $d > r$ no common point. Here $d = r = 5$ cm, so $l$ touches the circle at the foot of the perpendicular from the centre: a **tangent**.`, d: 2, c: 'understanding', t: [1], time: 45 }), (C) => C.which(['secant', 'tangent', 'none', 'diameter'], ['none', 'tangent', 'secant'][meets(5, 5)]));
Q('m05', mk.mcq({ stem: r`$PQ$ is a tangent at $P$ to a circle with centre $O$ and radius $10$ cm. If $OQ = 26$ cm, then $PQ$ is`, opts: ['$24$ cm', '$16$ cm', '$36$ cm', r`$2\sqrt{194}$ cm`], key: 'a', sol: r`$OP \perp PQ$, so $\triangle OPQ$ is right-angled at $P$ with hypotenuse $OQ$: $PQ = \sqrt{26^2 - 10^2} = \sqrt{676 - 100} = \sqrt{576} = 24$ cm. Option (d) adds the squares, treating $PQ$ as the hypotenuse; (b) and (c) subtract or add the lengths.`, d: 2, c: 'understanding', t: [2], time: 60 }), (C) => C.which([24, 16, 36, 2 * Math.sqrt(194)], leg(26, 10)));
Q('m06', mk.mcq({ stem: r`$PT$ is a tangent at $P$ to a circle with centre $O$, and $T$ is a point on the tangent with $\angle OTP = 35^\circ$. Then $\angle POT$ is`, opts: [r`$55^\circ$`, r`$35^\circ$`, r`$145^\circ$`, r`$90^\circ$`], key: 'a', sol: r`The radius $OP$ is perpendicular to the tangent, so $\angle OPT = 90^\circ$. In $\triangle OPT$: $\angle POT = 180^\circ - 90^\circ - 35^\circ = 55^\circ$. Option (c) forgets the right angle.`, d: 2, c: 'understanding', t: [2], time: 60 }), (C) => { const O = [0, 0], P = [0, -1], T = [1 / Math.tan(deg(35)), -1]; C.assert(near(angleDeg(T, O, P), 35, 1e-6), 'built with 35°'); C.which([55, 35, 145, 90], Math.round(angleDeg(O, P, T) * 1e6) / 1e6); });
Q('m07', mk.mcq({ stem: 'The tangents drawn at the two ends of a diameter of a circle are', opts: ['parallel to each other', 'perpendicular to each other', r`inclined to each other at $45^\circ$`, 'intersecting at the centre'], key: 'a', sol: r`Each tangent is perpendicular to the diameter $AB$ (radius $\perp$ tangent at the point of contact). Two lines perpendicular to the same line make equal alternate angles ($90^\circ$ each) with it, so they are **parallel**. They never meet, so (b), (c) and (d) are impossible.`, d: 1, c: 'understanding', t: [2], time: 45 }), (C) => { const dirA = [1, 0], dirB = [-1, 0]; C.assert(dirA[0] * dirB[1] - dirA[1] * dirB[0] === 0, 'tangents at (0, 1) and (0, −1) are both horizontal'); C.key('a'); });
Q('m08', mk.mcq({ stem: r`$PT$ is the tangent at $P$ to a circle with centre $O$, and $PR$ is a chord with $\angle TPR = 50^\circ$. Then $\angle POR$ is`, opts: [r`$100^\circ$`, r`$50^\circ$`, r`$80^\circ$`, r`$130^\circ$`], key: 'a', sol: r`**Step 1.** $\angle OPT = 90^\circ$, so $\angle OPR = 90^\circ - 50^\circ = 40^\circ$.

**Step 2.** $OP = OR$ (radii), so $\angle ORP = 40^\circ$.

**Step 3.** $\angle POR = 180^\circ - 40^\circ - 40^\circ = 100^\circ$, twice the angle between the tangent and the chord. Option (c) stops at $\angle OPR + \angle ORP$.`, d: 3, c: 'application', t: [2], time: 90 }), (C) => { const P = [0, -1], t = 2 * Math.sin(deg(50)); const R = [t * Math.cos(deg(50)), -1 + t * Math.sin(deg(50))]; C.assert(near(dist([0, 0], R), 1, 1e-12), 'R on circle'); C.which([100, 50, 80, 130], Math.round(angleDeg([0, 0], P, R) * 1e6) / 1e6); });
Q('m09', mk.mcq({ stem: r`From a point $P$, two tangents $PA$ and $PB$ are drawn to a circle. If $PA = 7$ cm and $\angle APB = 60^\circ$, then the chord $AB$ is`, opts: ['$7$ cm', '$14$ cm', r`$7\sqrt3$ cm`, '$3.5$ cm'], key: 'a', sol: r`$PA = PB$ (tangents from an external point), so $\triangle PAB$ is isosceles and $\angle PAB = \angle PBA = \dfrac{180^\circ - 60^\circ}{2} = 60^\circ$. All angles are $60^\circ$: the triangle is equilateral and $AB = PA = 7$ cm.`, d: 3, c: 'application', t: [3], time: 75 }), (C) => { const { P, A, B } = twoTangents(60); const k = 7 / dist(P, A); C.which([7, 14, 7 * Math.sqrt(3), 3.5], Math.round(dist(A, B) * k * 1e9) / 1e9); });
Q('m10', mk.mcq({ stem: r`$PA$ and $PB$ are tangents from $P$ to a circle with centre $O$. If $\angle APB = 70^\circ$, then $\angle AOB$ is`, opts: [r`$110^\circ$`, r`$70^\circ$`, r`$140^\circ$`, r`$35^\circ$`], key: 'a', sol: r`In quadrilateral $OAPB$, $\angle OAP = \angle OBP = 90^\circ$. The angle sum is $360^\circ$, so $\angle AOB = 360^\circ - 90^\circ - 90^\circ - 70^\circ = 110^\circ$: the two angles are **supplementary**.`, d: 2, c: 'understanding', t: [3], time: 60 }), (C) => { const { O, A, B } = twoTangents(70); C.which([110, 70, 140, 35], Math.round(angleDeg(O, A, B) * 1e6) / 1e6); });
Q('m11', mk.mcq({ stem: r`$PA$ and $PB$ are tangents from $P$ to a circle with centre $O$, and $\angle AOB = 130^\circ$. Then $\angle PAB$ is`, opts: [r`$65^\circ$`, r`$50^\circ$`, r`$25^\circ$`, r`$130^\circ$`], key: 'a', sol: r`**Step 1.** $\angle APB = 180^\circ - 130^\circ = 50^\circ$.

**Step 2.** $PA = PB$, so $\angle PAB = \angle PBA = \dfrac{180^\circ - 50^\circ}{2} = 65^\circ$.

Option (b) is $\angle APB$; option (c) is $\angle OAB$.`, d: 3, c: 'application', t: [3], time: 90 }), (C) => { const O = [0, 0], P = [1 / Math.cos(deg(65)), 0]; const [A, B] = tangentPtsRaw(O, 1, P); C.assert(near(angleDeg(O, A, B), 130, 1e-6), 'AOB 130'); C.which([65, 50, 25, 130], Math.round(angleDeg(A, P, B) * 1e6) / 1e6); });
Q('m12', mk.mcq({ stem: r`A quadrilateral $ABCD$ is drawn to circumscribe a circle. If $AB = 6$ cm, $BC = 7$ cm and $CD = 5$ cm, then $AD$ is`, opts: ['$4$ cm', '$8$ cm', '$6$ cm', '$3$ cm'], key: 'a', sol: r`For a quadrilateral circumscribing a circle, $AB + CD = BC + AD$. So $6 + 5 = 7 + AD$ and $AD = 4$ cm. Option (b) pairs the sides wrongly ($AB + BC - CD$).`, d: 2, c: 'understanding', t: [3], time: 60 }), (C) => { const ad = 6 + 5 - 7; C.which([4, 8, 6, 3], ad); const q = tangentialPolygon([2, 4, 3, 2], 1, [0, 0]); C.assert(q.r > 0, 'such a quadrilateral exists (tangent lengths 2, 4, 3, 2)'); });
Q('m13', mk.mcq({ stem: r`A circle is inscribed in $\triangle ABC$, touching $BC$, $CA$ and $AB$ at $D$, $E$ and $F$. If $AF = 4$ cm, $BD = 5$ cm and $CE = 6$ cm, the perimeter of $\triangle ABC$ is`, opts: ['$30$ cm', '$15$ cm', '$60$ cm', '$24$ cm'], key: 'a', sol: r`Tangents from a vertex are equal: $AE = AF = 4$, $BF = BD = 5$, $CD = CE = 6$. Each tangent length is used twice, so the perimeter is $2(4 + 5 + 6) = 30$ cm. Option (b) counts each length once.`, d: 2, c: 'application', t: [3], time: 75 }), (C) => { const AB = 4 + 5, BC = 5 + 6, CA = 6 + 4; C.assert(tri(BC, CA, AB).join() === '4,5,6', 'tangent lengths'); C.which([30, 15, 60, 24], AB + BC + CA); });
Q('m14', mk.mcq({ stem: r`A circle is inscribed in a parallelogram $ABCD$ (it touches all four sides). If $AB = 8$ cm, then $BC$ is`, opts: ['$8$ cm', '$4$ cm', '$16$ cm', 'impossible to find from the data'], key: 'a', sol: r`Since the parallelogram circumscribes a circle, $AB + CD = BC + DA$. In a parallelogram $AB = CD$ and $BC = DA$, so $2AB = 2BC$ and $BC = AB = 8$ cm: the parallelogram is a **rhombus**. Option (d) misses this hidden condition.`, d: 3, c: 'analysis', t: [3], time: 90 }), (C) => { const AB = 8, CD = 8; const BC = (AB + CD) / 2; C.which([8, 4, 16, 'x'], BC); });
Q('m15', mk.mcq({ stem: r`The distance between two parallel tangents of a circle is $18$ cm. The radius of the circle is`, opts: ['$9$ cm', '$18$ cm', '$36$ cm', '$4.5$ cm'], key: 'a', sol: r`Two parallel tangents touch the circle at the ends of a diameter (the radii to the points of contact are both perpendicular to the same direction). So the distance between them is the diameter: $2r = 18$ and $r = 9$ cm.`, d: 1, c: 'understanding', t: [2], time: 45 }), (C) => C.which([9, 18, 36, 4.5], 18 / 2));
Q('m16', mk.mcq({ stem: r`From a point $Q$ at a distance of $29$ cm from the centre of a circle, the length of the tangent is $21$ cm. The **diameter** of the circle is`, opts: ['$40$ cm', '$20$ cm', '$8$ cm', '$50$ cm'], key: 'a', sol: r`Radius $= \sqrt{29^2 - 21^2} = \sqrt{841 - 441} = \sqrt{400} = 20$ cm, so the diameter is $40$ cm. Option (b) stops at the radius; (c) and (d) subtract or add the lengths.`, d: 2, c: 'application', t: [2], time: 75 }), (C) => C.which([40, 20, 8, 50], 2 * leg(29, 21)));
Q('m17', mk.mcq({ stem: r`Two tangents $PA$ and $PB$ are drawn from $P$ to a circle with centre $O$ such that $\angle APB = 90^\circ$. If $OA = 5$ cm, then $OP$ is`, opts: [r`$5\sqrt2$ cm`, '$10$ cm', '$5$ cm', r`$10\sqrt2$ cm`], key: 'a', sol: r`In $OAPB$, $\angle OAP = \angle OBP = \angle APB = 90^\circ$, so the fourth angle $\angle AOB$ is also $90^\circ$. With $OA = OB$, the rectangle $OAPB$ has equal adjacent sides: it is a square of side $5$ cm, and $OP$ is its diagonal: $OP = \sqrt{25 + 25} = 5\sqrt2$ cm.`, d: 3, c: 'application', t: [3], time: 90 }), (C) => { const { O, P } = twoTangents(90, 5); C.which([5 * Math.SQRT2, 10, 5, 10 * Math.SQRT2], Math.round(dist(O, P) * 1e9) / 1e9); });
Q('m18', mk.mcq({ stem: r`A line touches a circle with centre $O$ and radius $9$ cm at $P$. $Q$ is a point on the line with $PQ = 12$ cm. Then $OQ$ is`, opts: ['$15$ cm', '$21$ cm', r`$3\sqrt7$ cm`, '$3$ cm'], key: 'a', sol: r`$\angle OPQ = 90^\circ$, so $OQ$ is the hypotenuse: $OQ = \sqrt{9^2 + 12^2} = \sqrt{81 + 144} = \sqrt{225} = 15$ cm. Option (c) subtracts the squares.`, d: 1, c: 'understanding', t: [2], time: 45 }), (C) => C.which([15, 21, 3 * Math.sqrt(7), 3], hyp(9, 12)));

// =============================================================== Assertion-reason (keys a b c d a d)
Q('ar1', mk.ar({ a: r`The tangent at a point $P$ of a circle with centre $O$ is perpendicular to $OP$.`, r: r`Of all the segments from $O$ to points of the tangent, $OP$ is the shortest, and the shortest segment from a point to a line is perpendicular to it.`, key: 'a', sol: r`Every point of the tangent other than $P$ lies outside the circle, so its distance from $O$ is more than the radius $OP$. Hence $OP$ is the shortest distance from $O$ to the line, and the shortest segment is the perpendicular. R is exactly the proof of A.`, d: 2, c: 'understanding', t: [2] }), (C) => { const ok = [-3, -1, -0.2, 0.4, 2].every((x) => hyp(x, 5) > 5); C.assert(ok, 'every other point of the tangent y = 5 is farther than 5 from O'); C.key('a'); });
Q('ar2', mk.ar({ a: 'From a point outside a circle, exactly two tangents can be drawn to the circle.', r: 'A tangent meets a circle at exactly one point.', key: 'b', sol: r`A is true: from an external point there are exactly two tangents. R is true too (it is the definition of a tangent), but it does not explain why there are **two** tangents from an outside point, so R is not the explanation of A.`, d: 2, c: 'understanding', t: [1] }), (C) => { C.assert(tangentsFrom(5, 8) === 2, 'two tangents'); C.key('b'); });
Q('ar3', mk.ar({ a: r`$PA$ and $PB$ are tangents from $P$ to a circle with centre $O$. If $\angle APB = 80^\circ$, then $\angle AOB = 100^\circ$.`, r: r`The angle between two tangents from an external point is equal to the angle subtended at the centre by the segment joining the points of contact.`, key: 'c', sol: r`A: in $OAPB$, $\angle AOB = 360^\circ - 90^\circ - 90^\circ - 80^\circ = 100^\circ$, so A is true. R is false: the two angles are **supplementary** (they add to $180^\circ$), not equal.`, d: 3, c: 'analysis', t: [3] }), (C) => { const { O, A, B } = twoTangents(80); C.assert(near(angleDeg(O, A, B), 100, 1e-6), 'AOB = 100'); C.key('c'); });
Q('ar4', mk.ar({ a: r`A line at a distance of $4$ cm from the centre of a circle of radius $5$ cm is a tangent to the circle.`, r: 'A line is a tangent to a circle when its distance from the centre equals the radius.', key: 'd', sol: r`R is true. By R, a tangent must be at distance $5$ cm; this line is at $4$ cm $< 5$ cm, so it cuts the circle at two points: it is a secant. A is false.`, d: 2, c: 'understanding', t: [1] }), (C) => { C.assert(meets(5, 4) === 2, 'secant'); C.key('d'); });
Q('ar5', mk.ar({ a: r`If a quadrilateral $ABCD$ circumscribes a circle, then $AB + CD = BC + DA$.`, r: 'The lengths of the two tangents drawn from an external point to a circle are equal.', key: 'a', sol: r`Let the circle touch $AB, BC, CD, DA$ at $P, Q, R, S$. By R, $AP = AS$, $BP = BQ$, $CR = CQ$, $DR = DS$. Adding, $AB + CD = (AP + BP) + (CR + DR) = AS + BQ + CQ + DS = BC + DA$. R is the reason for A.`, d: 2, c: 'understanding', t: [3] }), (C) => { const [a, b, c, d] = [3, 4, 5, 2]; C.assert((a + b) + (c + d) === (b + c) + (d + a), 'sum identity'); C.key('a'); });
Q('ar6', mk.ar({ a: 'A rectangle that is not a square can be drawn to circumscribe a circle.', r: 'A parallelogram that circumscribes a circle is a rhombus.', key: 'd', sol: r`R is true: $AB + CD = BC + DA$ with $AB = CD$, $BC = DA$ forces $AB = BC$. A rectangle is a parallelogram, so a circumscribing rectangle must have all sides equal, i.e. be a square. A is false.`, d: 3, c: 'analysis', t: [3] }), (C) => { const [l, b] = [6, 4]; C.assert(l + l !== b + b, 'rectangle 6 by 4 fails AB + CD = BC + DA'); C.key('d'); });

// =============================================================== True / false
Q('tf1', mk.tf({ stem: 'Exactly one tangent can be drawn to a circle at a point that lies on the circle.', key: 't', sol: r`The tangent at $P$ must be perpendicular to the radius $OP$, and through $P$ there is exactly one line perpendicular to $OP$. So the tangent at a point of the circle is unique.`, d: 1, c: 'recall', t: [1] }), (C) => { C.assert(tangentsFrom(5, 5) === 1, 'one'); C.key('t'); });
Q('tf2', mk.tf({ stem: r`If the radius of a circle is $5$ cm and the length of the tangent from a point $P$ is $12$ cm, then $P$ is $17$ cm from the centre.`, key: 'f', sol: r`The radius and the tangent are perpendicular, so the distance is the hypotenuse: $\sqrt{5^2 + 12^2} = \sqrt{169} = 13$ cm, not $17$ cm. Adding the two lengths is the mistake.`, d: 2, c: 'understanding', t: [2] }), (C) => { C.assert(hyp(5, 12) === 13, '13'); C.key('f'); });
Q('tf3', mk.tf({ stem: r`If $PA$ and $PB$ are tangents from $P$ to a circle with centre $O$, then $\angle AOP = \angle BOP$.`, key: 't', sol: r`$\triangle OAP \cong \triangle OBP$ by RHS ($\angle OAP = \angle OBP = 90^\circ$, hypotenuse $OP$ common, $OA = OB$). So $\angle AOP = \angle BOP$: $OP$ bisects $\angle AOB$ (and $\angle APB$).`, d: 2, c: 'understanding', t: [3] }), (C) => { const { O, P, A, B } = twoTangents(52); C.assert(near(angleDeg(O, A, P), angleDeg(O, B, P), 1e-9), 'equal'); C.key('t'); });
Q('tf4', mk.tf({ stem: 'A secant can meet a circle at three points.', key: 'f', sol: r`A line meets a circle at **at most two** points. A secant meets it at exactly two points.`, d: 1, c: 'recall', t: [1] }), (C) => { C.assert(meets(5, 0) === 2, 'at most two'); C.key('f'); });
Q('tf5', mk.tf({ stem: r`If a circle inscribed in $\triangle ABC$ touches $AB$ at $F$, then $AF = BF$ for every triangle.`, key: 'f', sol: r`$AF$ equals the tangent from $A$ and $BF$ the tangent from $B$; these are equal only when $CA = CB$. Counter-example: $AB = 13$, $BC = 14$, $CA = 15$ cm gives $AF = 7$ cm and $BF = 6$ cm.`, d: 3, c: 'analysis', t: [3] }), (C) => { const [ta, tb] = tri(14, 15, 13); C.assert(ta === 7 && tb === 6, 'counter-example 7 vs 6'); C.key('f'); });

// =============================================================== Fill in the blank
Q('fb1', mk.fill({ stem: 'A line that touches a circle at exactly one point is called a ___ to the circle.', acc: [['tangent']], sol: 'Such a line is a **tangent**; the common point is the point of contact.', d: 1, c: 'recall', t: [1] }), (C) => C.blank('tangent'));
Q('fb2', mk.fill({ stem: 'The common point of a tangent and a circle is called the ___.', acc: [['point of contact', 'point of tangency', 'contact point']], sol: 'It is the **point of contact** (also called the point of tangency).', d: 1, c: 'recall', t: [1] }), (C) => C.blank('point of contact'));
Q('fb3', mk.fill({ stem: 'The angle between a tangent to a circle and the radius through the point of contact is ___ degrees.', acc: [['90', '90°']], sol: r`The tangent at any point is perpendicular to the radius through the point of contact: the angle is $90^\circ$.`, d: 1, c: 'recall', t: [2] }), (C) => C.blank(90));
Q('fb4', mk.fill({ stem: r`$PA$ and $PB$ are tangents from $P$ to a circle with centre $O$. If $\angle AOB = 115^\circ$, then $\angle APB =$ ___ degrees.`, acc: [['65', '65°']], sol: r`$\angle APB = 180^\circ - \angle AOB = 180^\circ - 115^\circ = 65^\circ$ (the angles at $A$ and $B$ in $OAPB$ are right angles).`, d: 2, c: 'understanding', t: [3] }), (C) => { const O = [0, 0], P = [1 / Math.cos(deg(57.5)), 0]; const [A, B] = tangentPtsRaw(O, 1, P); C.assert(near(angleDeg(O, A, B), 115, 1e-6), 'AOB'); C.blank(Math.round(angleDeg(P, A, B) * 1e6) / 1e6); });
Q('fb5', mk.fill({ stem: r`A circle inscribed in $\triangle ABC$ touches $BC$ at $D$, $CA$ at $E$ and $AB$ at $F$. If $BF = 4$ cm and $CE = 5$ cm, then $BC =$ ___ cm.`, acc: [['9']], sol: r`$BD = BF = 4$ cm and $CD = CE = 5$ cm (tangents from a point are equal), so $BC = BD + DC = 9$ cm.`, d: 2, c: 'application', t: [3] }), (C) => C.blank(4 + 5));

// =============================================================== Numerical
Q('n01', mk.num({ stem: r`The radius of a circle is $12$ cm and a point $Q$ is $37$ cm from its centre. Find the length (in cm) of the tangent drawn from $Q$ to the circle.`, value: 35, unit: 'cm', marks: 2, sol: r`**Step 1.** The tangent $QP$ is perpendicular to the radius $OP$, so $\triangle OPQ$ is right-angled at $P$ with hypotenuse $OQ = 37$ cm.

**Step 2.** $QP = \sqrt{37^2 - 12^2} = \sqrt{1369 - 144} = \sqrt{1225} = 35$ cm.`, scheme: [['Right angle at the point of contact, Pythagoras set up', 1], ['35 cm', 1]], d: 2, c: 'understanding', t: [2], time: 90 }), (C) => C.val(leg(37, 12)));
Q('n02', mk.num({ stem: r`The length of the tangent from a point $P$ to a circle is $30$ cm, and $P$ is $34$ cm from the centre. Find the radius of the circle in cm.`, value: 16, unit: 'cm', marks: 2, sol: r`**Step 1.** Radius $\perp$ tangent, and $OP = 34$ cm is the hypotenuse.

**Step 2.** $r = \sqrt{34^2 - 30^2} = \sqrt{1156 - 900} = \sqrt{256} = 16$ cm.`, scheme: [['Pythagoras with OP as hypotenuse', 1], ['16 cm', 1]], d: 2, c: 'understanding', t: [2], time: 90 }), (C) => C.val(leg(34, 30)));
Q('n03', mk.num({ stem: r`$PA$ and $PB$ are tangents from $P$ to a circle with centre $O$, and $\angle APB = 72^\circ$. Find $\angle OAB$ in degrees.`, value: 36, unit: '°', marks: 2, sol: r`**Step 1.** $PA = PB$, so $\angle PAB = \dfrac{180^\circ - 72^\circ}{2} = 54^\circ$.

**Step 2.** $\angle OAP = 90^\circ$, so $\angle OAB = 90^\circ - 54^\circ = 36^\circ$ (half of $\angle APB$).`, scheme: [['∠PAB = 54°', 1], ['∠OAB = 36°', 1]], d: 3, c: 'application', t: [3], time: 120 }), (C) => { const { O, A, B } = twoTangents(72); C.val(Math.round(angleDeg(A, O, B) * 1e6) / 1e6); C.sol([54]); });
Q('n04', mk.num({ stem: r`A quadrilateral $ABCD$ circumscribes a circle, with $AB = 9.5$ cm, $BC = 8$ cm and $CD = 7.5$ cm. Find $AD$ in cm.`, value: 9, unit: 'cm', sol: r`$AB + CD = BC + AD$: $9.5 + 7.5 = 8 + AD$, so $AD = 17 - 8 = 9$ cm.`, scheme: [['9 cm', 1]], d: 2, c: 'understanding', t: [3], time: 60 }), (C) => C.val(9.5 + 7.5 - 8));
Q('n05', mk.num({ stem: r`A circle is inscribed in $\triangle ABC$ with $AB = 12$ cm, $BC = 15$ cm and $CA = 11$ cm. It touches $BC$ at $D$. Find $BD$ in cm.`, value: 8, unit: 'cm', marks: 2, sol: r`**Step 1.** Let the tangent lengths from $A$, $B$, $C$ be $x$, $y$, $z$. Then $x + y = 12$, $y + z = 15$, $z + x = 11$.

**Step 2.** Adding, $2(x + y + z) = 38$, so $x + y + z = 19$. Then $y = 19 - 11 = 8$. Hence $BD = 8$ cm (and $CD = 7$ cm, $AF = 4$ cm).`, scheme: [['Tangent-length equations', 1], ['BD = 8 cm', 1]], d: 3, c: 'application', t: [3], time: 150 }), (C) => { const [x, y, z] = tri(15, 11, 12); C.val(y); C.sol([19, z, x]); });
Q('n06', mk.num({ stem: r`Two concentric circles have radii $17$ cm and $8$ cm. Find the length (in cm) of the chord of the larger circle that touches the smaller circle.`, value: 30, unit: 'cm', marks: 2, sol: r`**Step 1.** Let the chord $AB$ touch the small circle at $M$. Then $OM \perp AB$ (radius $\perp$ tangent), and the perpendicular from the centre bisects the chord.

**Step 2.** $AM = \sqrt{17^2 - 8^2} = \sqrt{289 - 64} = \sqrt{225} = 15$ cm, so $AB = 2 \times 15 = 30$ cm.`, scheme: [['OM ⟂ AB and AM by Pythagoras', 1], ['AB = 30 cm', 1]], d: 3, c: 'application', t: [2], time: 150 }), (C) => C.val(2 * leg(17, 8)));
Q('n07', mk.num({ stem: r`The tangent $PT$ from a point $P$ to a circle is $9$ cm long. The line from $P$ to the centre $O$ meets the circle first at $Q$, with $PQ = 3$ cm. Find the radius of the circle in cm.`, value: 12, unit: 'cm', marks: 2, sol: r`**Step 1.** $OP = r + 3$ and $\angle OTP = 90^\circ$, so $(r + 3)^2 = r^2 + 9^2$.

**Step 2.** $r^2 + 6r + 9 = r^2 + 81 \Rightarrow 6r = 72 \Rightarrow r = 12$ cm. **Check:** $15^2 = 225 = 144 + 81$ ✓.`, scheme: [['(r + 3)² = r² + 81', 1], ['r = 12 cm', 1]], d: 4, c: 'analysis', t: [2], time: 180 }), (C) => { let rr = null; for (let k = 1; k <= 100; k++) if (near(hyp(k, 9), k + 3)) rr = k; C.val(rr); C.sol([225, 144, 81]); });
Q('n08', mk.num({ stem: r`$PA$ and $PB$ are tangents from $P$ to a circle with centre $O$ and radius $9$ cm. If $OP = 15$ cm, find the area of the quadrilateral $OAPB$ in cm².`, value: 108, unit: 'cm²', marks: 2, sol: r`**Step 1.** $PA = \sqrt{15^2 - 9^2} = \sqrt{144} = 12$ cm.

**Step 2.** $OP$ splits $OAPB$ into two congruent right triangles, each of area $\dfrac12 \times 9 \times 12 = 54$ cm². Area $= 2 \times 54 = 108$ cm².`, scheme: [['PA = 12 cm', 1], ['Area 108 cm²', 1]], d: 3, c: 'application', t: [2, 3], time: 150 }), (C) => { const O = [0, 0], P = [15, 0]; const [A, B] = tangentPtsRaw(O, 9, P); const area = Math.abs(A[0] * P[1] - P[0] * A[1]) / 2 + Math.abs(P[0] * B[1] - B[0] * P[1]) / 2; C.val(Math.round(area * 1e3) / 1e3, 1e-2); C.sol([12, 54]); });
Q('n09', mk.num({ stem: r`Two tangents drawn from a point $P$ to a circle of radius $8$ cm are inclined to each other at $60^\circ$. Find the distance of $P$ from the centre, in cm.`, value: 16, unit: 'cm', marks: 2, sol: r`**Step 1.** $OP$ bisects the angle between the tangents, so $\angle OPA = 30^\circ$, and $\angle OAP = 90^\circ$.

**Step 2.** $\sin 30^\circ = \dfrac{OA}{OP}$, so $OP = \dfrac{8}{1/2} = 16$ cm.`, scheme: [['∠OPA = 30° with right angle at A', 1], ['OP = 16 cm', 1]], d: 3, c: 'application', t: [3], time: 120 }), (C) => { const { O, P } = twoTangents(60, 8); C.val(Math.round(dist(O, P) * 1e9) / 1e9); });

// =============================================================== Short answer, 2 marks
Q('s201', mk.short({ marks: 2, stem: 'Prove that the tangents drawn at the ends of a diameter of a circle are parallel.', model: r`Let $AB$ be a diameter of a circle with centre $O$, and let $l$ and $m$ be the tangents at $A$ and $B$.

The tangent at a point is perpendicular to the radius through it, so $OA \perp l$ and $OB \perp m$. Hence $l$ and $m$ make angles of $90^\circ$ with the line $AB$ on opposite sides, i.e. a pair of equal alternate angles with the transversal $AB$.

So $l \parallel m$.`, sol: 'Use the tangent–radius theorem twice, then the alternate-angles test for parallel lines.', scheme: [['OA ⟂ l and OB ⟂ m (tangent ⟂ radius)', 1], ['Equal alternate angles, hence l ∥ m', 1]], d: 2, c: 'understanding', t: [2], time: 120 }), null, 'proof: structure checked by hand (two perpendiculars, alternate angles)');
Q('s202', mk.short({ marks: 2, stem: r`$PA$ and $PB$ are tangents from an external point $P$ to a circle with centre $O$. If $\angle PAB = 62^\circ$, find $\angle APB$ and $\angle AOB$.`, model: r`$PA = PB$ (tangents from an external point), so $\angle PBA = \angle PAB = 62^\circ$ and $\angle APB = 180^\circ - 124^\circ = 56^\circ$.

In $OAPB$, $\angle OAP = \angle OBP = 90^\circ$, so $\angle AOB = 360^\circ - 180^\circ - 56^\circ = 124^\circ$.`, sol: r`The angle between the tangents and the angle at the centre are supplementary: $56^\circ + 124^\circ = 180^\circ$.`, scheme: [['∠APB = 56° (isosceles triangle PAB)', 1], ['∠AOB = 124°', 1]], d: 2, c: 'application', t: [3], time: 120 }), (C) => { const { O, P, A, B } = twoTangents(56); C.assert(near(angleDeg(A, P, B), 62, 1e-6) && near(angleDeg(O, A, B), 124, 1e-6), 'PAB 62, AOB 124'); C.model([56, 124]); });
Q('s203', mk.short({ marks: 2, stem: r`A circle touches all four sides of a quadrilateral $ABCD$, with $AB = 11$ cm, $BC = 9$ cm and $CD = 7$ cm. Find $AD$ and the perimeter of $ABCD$.`, model: r`For a quadrilateral circumscribing a circle, $AB + CD = BC + AD$.

$11 + 7 = 9 + AD$, so $AD = 9$ cm.

Perimeter $= 11 + 9 + 7 + 9 = 36$ cm (also $= 2(AB + CD) = 2 \times 18$).`, sol: 'Opposite sides of a circumscribed quadrilateral have equal sums, so the perimeter is twice either sum.', scheme: [['AD = 9 cm', 1], ['Perimeter 36 cm', 1]], d: 2, c: 'understanding', t: [3], time: 90 }), (C) => { const ad = 11 + 7 - 9; C.assert(ad === 9, 'AD'); C.model([9, 36, 18]); });
Q('s204', mk.short({ marks: 2, stem: 'Prove that the line drawn perpendicular to a tangent at its point of contact passes through the centre of the circle.', model: r`Let the tangent at $P$ be $l$, and let $PX \perp l$ at $P$. Suppose $PX$ does not pass through the centre $O$.

By the tangent–radius theorem, $OP \perp l$ as well. Then $OP$ and $PX$ are two **different** lines through $P$, both perpendicular to $l$. This is impossible: through a point of a line there is only one perpendicular to it.

So $PX$ coincides with $PO$, i.e. it passes through the centre.`, sol: 'Proof by contradiction using the uniqueness of the perpendicular at a point.', scheme: [['OP ⟂ l by the theorem', 1], ['Uniqueness of the perpendicular gives the conclusion', 1]], d: 3, c: 'analysis', t: [2], time: 150 }), null, 'proof: contradiction structure checked by hand');
Q('s205', mk.short({ marks: 2, stem: r`A circle is inscribed in an isosceles triangle $ABC$ with $AB = AC = 13$ cm and $BC = 10$ cm. It touches $BC$ at $D$ and $AB$ at $F$. Find $BD$ and $AF$.`, model: r`Let the tangent lengths from $A$, $B$, $C$ be $x$, $y$, $z$: $x + y = 13$, $y + z = 10$, $z + x = 13$. Adding: $x + y + z = 18$.

So $BD = y = 18 - 13 = 5$ cm and $AF = x = 18 - 10 = 8$ cm. ($D$ is the midpoint of $BC$, as expected by symmetry.)`, sol: 'Each tangent length is the semi-perimeter minus the opposite side.', scheme: [['Semi-perimeter 18 and the tangent-length method', 1], ['BD = 5 cm, AF = 8 cm', 1]], d: 3, c: 'application', t: [3], time: 150 }), (C) => { const [x, y] = tri(10, 13, 13); C.assert(x === 8 && y === 5, 'lengths'); C.model([18, 5, 8]); });
Q('s206', mk.short({ marks: 2, stem: r`$PQ$ is the tangent at $P$ to a circle with centre $O$ and radius $6$ cm, and $Q$ is a point on it with $\angle POQ = 60^\circ$. Find $OQ$ and $PQ$.`, model: r`$\angle OPQ = 90^\circ$ (tangent $\perp$ radius).

$\cos 60^\circ = \dfrac{OP}{OQ}$, so $OQ = \dfrac{6}{1/2} = 12$ cm.

$\tan 60^\circ = \dfrac{PQ}{OP}$, so $PQ = 6\sqrt3 \approx 10.39$ cm.`, sol: r`Check: $6^2 + (6\sqrt3)^2 = 36 + 108 = 144 = 12^2$ ✓.`, scheme: [['Right angle at P; OQ = 12 cm', 1], ['PQ = 6√3 cm', 1]], d: 3, c: 'application', t: [2], time: 150 }), (C) => { const O = [0, 0], P = [0, -6], Qp = [6 * Math.tan(deg(60)), -6]; C.assert(near(angleDeg(O, P, Qp), 60, 1e-9) && near(dist(O, Qp), 12, 1e-9) && near(dist(P, Qp), 6 * Math.sqrt(3), 1e-9), 'OQ 12, PQ 6√3'); C.model([12, '6\\sqrt3', 10.39]); C.sol([108, 144]); });
Q('s207', mk.short({ marks: 2, stem: r`Ravi is told that the tangent $PA$ is drawn from $P$ to a circle with centre $O$, $OA = 6$ cm and $OP = 10$ cm. He writes: "$PA = \sqrt{OA^2 + OP^2} = \sqrt{136}$ cm." Find his mistake and the correct length.`, model: r`In $\triangle OAP$ the right angle is at $A$ (tangent $\perp$ radius), so the **hypotenuse is $OP$**, not $PA$. Ravi treated $PA$ as the hypotenuse.

Correctly, $PA = \sqrt{OP^2 - OA^2} = \sqrt{100 - 36} = \sqrt{64} = 8$ cm.`, sol: 'The side opposite the right angle (at the point of contact) is the hypotenuse.', scheme: [['Identifies OP as the hypotenuse', 1], ['PA = 8 cm', 1]], d: 3, c: 'evaluation', t: [2], time: 120 }), (C) => { C.assert(leg(10, 6) === 8, '8'); C.model([100, 36, 64, 8]); });
Q('s208', mk.short({ marks: 2, stem: r`A circle is inscribed in $\triangle ABC$ with $BC = 8$ cm, $CA = 10$ cm and $AB = 12$ cm. Find the lengths of the tangents drawn from $A$, $B$ and $C$ to the circle.`, model: r`Let the tangents from $A$, $B$, $C$ be $x$, $y$, $z$. Then $x + y = 12$, $y + z = 8$, $z + x = 10$, so $x + y + z = 15$.

$x = 15 - 8 = 7$ cm, $y = 15 - 10 = 5$ cm, $z = 15 - 12 = 3$ cm.`, sol: r`Check: $7 + 5 = 12$, $5 + 3 = 8$, $3 + 7 = 10$ ✓.`, scheme: [['Equations and x + y + z = 15', 1], ['7 cm, 5 cm, 3 cm', 1]], d: 3, c: 'application', t: [3], time: 150 }), (C) => { const ts = tri(8, 10, 12); C.assert(ts.join() === '7,5,3', ts.join()); C.model([15, 7, 5, 3]); });
Q('s209', mk.short({ marks: 2, stem: r`Two circles have the same centre $O$. A chord $AB$ of the larger circle touches the smaller circle at $M$. Prove that $AM = MB$.`, model: r`$OM$ is a radius of the smaller circle and $AB$ touches it at $M$, so $OM \perp AB$.

In right triangles $OMA$ and $OMB$: $OA = OB$ (radii of the larger circle) and $OM$ is common. By RHS, $\triangle OMA \cong \triangle OMB$, so $AM = MB$.`, sol: 'Radius ⟂ tangent, then RHS congruence (equivalently: the perpendicular from the centre bisects a chord).', scheme: [['OM ⟂ AB (tangent ⟂ radius)', 1], ['RHS congruence and AM = MB', 1]], d: 2, c: 'understanding', t: [2], time: 120 }), null, 'proof: RHS congruence checked by hand');

// =============================================================== Short answer, 3 marks
Q('s301', mk.short({ marks: 3, stem: r`From a point $P$, $25$ cm from the centre $O$ of a circle of radius $15$ cm, tangents $PA$ and $PB$ are drawn. Find the length of the chord $AB$.`, model: r`$PA = \sqrt{25^2 - 15^2} = \sqrt{400} = 20$ cm.

By symmetry ($\triangle OAP \cong \triangle OBP$), $AB \perp OP$; let them meet at $M$, so $AB = 2AM$.

Area of right $\triangle OAP$ in two ways: $\dfrac12 \times OA \times PA = \dfrac12 \times OP \times AM$, so $AM = \dfrac{15 \times 20}{25} = 12$ cm.

Hence $AB = 24$ cm.`, sol: r`Alternatively $OM = \dfrac{OA^2}{OP} = \dfrac{225}{25} = 9$ cm and $AM = \sqrt{225 - 81} = 12$ cm.`, scheme: [['PA = 20 cm', 1], ['AB ⟂ OP and AM = 12 cm', 1], ['AB = 24 cm', 1]], d: 4, c: 'analysis', t: [2, 3], time: 270 }), (C) => { const [A, B] = tangentPtsRaw([0, 0], 15, [25, 0]); C.assert(near(dist(A, B), 24, 1e-6) && near(A[0], 9, 1e-6), 'AB 24, OM 9'); C.model([20, 12, 24]); C.sol([9, 225, 81]); });
Q('s302', mk.short({ marks: 3, stem: r`$PA$ and $PB$ are tangents from $P$ to a circle with centre $O$. Show that $OP$ bisects $\angle APB$, and that $\angle AOP = 90^\circ - \dfrac12\angle APB$. Hence find $\angle AOB$ when $\angle APB = 48^\circ$.`, model: r`In $\triangle OAP$ and $\triangle OBP$: $\angle OAP = \angle OBP = 90^\circ$, $OA = OB$, $OP$ common. By RHS they are congruent, so $\angle APO = \angle BPO = \dfrac12\angle APB$: $OP$ bisects $\angle APB$.

In $\triangle OAP$: $\angle AOP = 180^\circ - 90^\circ - \dfrac12\angle APB = 90^\circ - \dfrac12\angle APB$.

With $\angle APB = 48^\circ$: $\angle AOP = 90^\circ - 24^\circ = 66^\circ$, and $\angle AOB = 2 \times 66^\circ = 132^\circ$.`, sol: r`Check: $132^\circ + 48^\circ = 180^\circ$ ✓.`, scheme: [['RHS congruence, OP bisects ∠APB', 1], ['∠AOP = 90° − ½∠APB', 1], ['∠AOB = 132°', 1]], d: 3, c: 'application', t: [3], time: 240 }), (C) => { const { O, A, B } = twoTangents(48); C.assert(near(angleDeg(O, A, B), 132, 1e-6), '132'); C.model([66, 132, 24]); });
Q('s303', mk.short({ marks: 3, stem: r`A circle with centre $O$ and radius $4$ cm is inscribed in a quadrilateral $ABCD$ in which $\angle A = 90^\circ$. The circle touches $AB$ at $P$ and $AD$ at $S$. Prove that $APOS$ is a square, and find $AP$ and $OA$.`, model: r`$\angle OPA = \angle OSA = 90^\circ$ (radius $\perp$ tangent) and $\angle PAS = 90^\circ$, so $\angle POS = 360^\circ - 270^\circ = 90^\circ$: all four angles of $APOS$ are right angles.

$OP = OS = 4$ cm (radii) and $AP = AS$ (tangents from $A$), so adjacent sides are equal: with four right angles, $APOS$ is a square.

$AP = OP = 4$ cm, and $OA$ is its diagonal: $OA = \sqrt{4^2 + 4^2} = 4\sqrt2 \approx 5.66$ cm.`, sol: 'A rectangle with two adjacent sides equal is a square.', scheme: [['Four right angles', 1], ['Adjacent sides equal: square', 1], ['AP = 4 cm, OA = 4√2 cm', 1]], d: 3, c: 'analysis', t: [2, 3], time: 240 }), (C) => { C.assert(near(hyp(4, 4), 4 * Math.SQRT2), 'diagonal'); C.model([4, '4\\sqrt2', 5.66]); });
Q('s304', mk.short({ marks: 3, stem: r`A circle is inscribed in a triangle $ABC$ right-angled at $B$, with $AB = 8$ cm, $BC = 15$ cm and $AC = 17$ cm. Find the radius of the circle.`, model: r`Let the circle (centre $O$, radius $r$) touch $AB$, $BC$, $CA$ at $F$, $D$, $E$. As in a square corner, $BFOD$ has four right angles and $OF = OD = r$, so it is a square and $BF = BD = r$.

Then $AE = AF = 8 - r$ and $CE = CD = 15 - r$. Since $AE + CE = AC$: $(8 - r) + (15 - r) = 17$, so $23 - 2r = 17$ and $r = 3$ cm.`, sol: r`Check with area: $\dfrac12 \times 8 \times 15 = 60$ and $r \times$ semi-perimeter $= 3 \times 20 = 60$ ✓.`, scheme: [['BF = BD = r (square)', 1], ['Tangent lengths 8 − r and 15 − r', 1], ['r = 3 cm', 1]], d: 3, c: 'application', t: [3], time: 240 }), (C) => { const rr = (8 + 15 - 17) / 2; C.assert(rr === 3 && 0.5 * 8 * 15 === rr * 20, 'r = 3, area check'); C.model([23, 17, 3]); C.sol([60, 20]); });
Q('s305', mk.short({ marks: 3, stem: r`A parallelogram $ABCD$ circumscribes a circle. If $AB = (3x + 1)$ cm and $BC = (5x - 7)$ cm, find $x$ and the perimeter of $ABCD$.`, model: r`Since $ABCD$ circumscribes a circle, $AB + CD = BC + DA$. In a parallelogram $CD = AB$ and $DA = BC$, so $2AB = 2BC$, i.e. $AB = BC$ (a rhombus).

$3x + 1 = 5x - 7 \Rightarrow 2x = 8 \Rightarrow x = 4$.

Each side is $3(4) + 1 = 13$ cm, so the perimeter is $4 \times 13 = 52$ cm.`, sol: r`Check: $5(4) - 7 = 13$ ✓.`, scheme: [['AB + CD = BC + DA', 1], ['AB = BC so x = 4', 1], ['Perimeter 52 cm', 1]], d: 4, c: 'analysis', t: [3], time: 240 }), (C) => { const x = 8 / 2; C.assert(3 * x + 1 === 5 * x - 7 && 3 * x + 1 === 13, 'x = 4'); C.model([4, 13, 52]); });
Q('s306', mk.short({ marks: 3, stem: r`Sanjay says: "Any line perpendicular to a radius of a circle is a tangent to the circle." Using a circle of radius $10$ cm and the line perpendicular to a radius $OA$ at its midpoint $M$, show that he is wrong, and state the correct result.`, model: r`$OM = 5$ cm and the line is perpendicular to $OA$ at $M$. Its distance from $O$ is $5$ cm $< 10$ cm, so it cuts the circle. The points where it meets the circle are at distance $\sqrt{10^2 - 5^2} = \sqrt{75} = 5\sqrt3 \approx 8.66$ cm from $M$ on either side: two points, so the line is a **secant**, not a tangent.

**Correct result:** the line perpendicular to a radius **at its endpoint on the circle** is a tangent (its distance from the centre equals the radius).`, sol: 'Step 1: the line is perpendicular to $OA$ at $M$, so its distance from $O$ is $OM = 5$ cm. Step 2: $5$ cm is less than the radius $10$ cm, so the line meets the circle twice and is a secant. Step 3: a line perpendicular to a radius is a tangent only when it passes through the end of the radius on the circle.', scheme: [['Distance 5 cm < radius', 1], ['Two intersection points: secant', 1], ['Correct statement', 1]], d: 4, c: 'evaluation', t: [1, 2], time: 240 }), (C) => { C.assert(meets(10, 5) === 2 && near(leg(10, 5), 5 * Math.sqrt(3)), 'secant'); C.model([5, '5\\sqrt3', 8.66]); });
Q('s307', mk.short({ marks: 3, stem: r`In the figure, $AB$ is a diameter of a circle with centre $O$, $AC$ is a chord with $\angle BAC = 32^\circ$, and the tangent at $C$ meets $AB$ produced at $D$. Find $\angle BCD$ and $\angle ADC$.`, assets: [figS307], model: r`$OA = OC$, so $\angle OCA = \angle OAC = 32^\circ$. The angle in a semicircle is a right angle: $\angle ACB = 90^\circ$, so $\angle OCB = 90^\circ - 32^\circ = 58^\circ$.

$\angle OCD = 90^\circ$ (tangent $\perp$ radius), so $\angle BCD = 90^\circ - 58^\circ = 32^\circ$.

In $\triangle ACD$: $\angle ACD = 32^\circ + 90^\circ = 122^\circ$, so $\angle ADC = 180^\circ - 32^\circ - 122^\circ = 26^\circ$.`, sol: r`Check: the exterior angle $\angle COD = 2 \times 32^\circ = 64^\circ$, and in right $\triangle OCD$, $\angle ODC = 90^\circ - 64^\circ = 26^\circ$ ✓.`, scheme: [['∠OCA = 32° and ∠OCB = 58°', 1], ['∠BCD = 32°', 1], ['∠ADC = 26°', 1]], d: 4, c: 'analysis', t: [2], time: 270 }), (C) => { const { O, A, B, C: Cc, D } = ABcd; C.assert(near(angleDeg(A, B, Cc), 32, 1e-2) && near(angleDeg(Cc, B, D), 32, 1e-2) && near(angleDeg(D, Cc, A), 26, 1e-2) && near(angleDeg(Cc, O, D), 90, 1e-2), 'measured on the construction'); C.model([32, 58, 122, 26]); C.sol([64]); });

// =============================================================== Long answer, 5 marks
Q('l01', mk.long({ stem: r`(a) Prove that the tangent at any point of a circle is perpendicular to the radius through the point of contact.
(b) A tangent is drawn from a point $Q$ that is $41$ cm from the centre of a circle of radius $9$ cm. Use (a) to find the length of the tangent.`, model: r`(a) **Given:** a circle with centre $O$ and a tangent $XY$ at the point $P$. **To prove:** $OP \perp XY$.

**Proof.** Take any point $Q$ on $XY$ other than $P$, and join $OQ$. $Q$ must lie **outside** the circle: if it lay on or inside the circle, $XY$ would meet the circle at a second point and be a secant, not a tangent. So $OQ$ meets the circle at a point $R$ between $O$ and $Q$, and $OQ = OR + RQ > OR = OP$.

Thus $OP$ is shorter than $OQ$ for every other point $Q$ of $XY$: $OP$ is the shortest distance from $O$ to the line. The shortest segment from a point to a line is the perpendicular, so $OP \perp XY$.

(b) $\angle OPQ = 90^\circ$, so the tangent length is $\sqrt{41^2 - 9^2} = \sqrt{1681 - 81} = \sqrt{1600} = 40$ cm.`, sol: 'Every other point of the tangent is outside the circle, so the radius to the point of contact is the shortest segment, hence perpendicular.', scheme: [['Given, to prove and figure', 1], ['Q outside the circle (else secant)', 1], ['OQ > OP for every Q ≠ P', 1], ['Shortest segment is perpendicular: conclusion', 1], ['(b) 40 cm', 1]], d: 3, c: 'understanding', t: [2], time: 600 }), (C) => { C.assert(leg(41, 9) === 40, '40'); C.model([1600, 40]); });
Q('l02', mk.long({ stem: r`(a) Prove that the lengths of the two tangents drawn from an external point to a circle are equal.
(b) Tangents $PA$ and $PB$ are drawn from $P$ to a circle, with $PA = 10$ cm and $\angle APB = 60^\circ$. Find the length of the chord $AB$ and the perimeter of $\triangle PAB$.`, model: r`(a) **Given:** a circle with centre $O$; $PA$ and $PB$ are tangents from the external point $P$. **To prove:** $PA = PB$. **Construction:** join $OA$, $OB$, $OP$.

**Proof.** $\angle OAP = \angle OBP = 90^\circ$ (tangent $\perp$ radius). In right triangles $OAP$ and $OBP$: hypotenuse $OP$ is common and $OA = OB$ (radii). So $\triangle OAP \cong \triangle OBP$ (RHS) and $PA = PB$ (CPCT).

(b) $PA = PB = 10$ cm, so $\angle PAB = \angle PBA = \dfrac{180^\circ - 60^\circ}{2} = 60^\circ$: $\triangle PAB$ is equilateral. Hence $AB = 10$ cm and the perimeter is $30$ cm.`, sol: 'RHS congruence of the two right triangles with the common hypotenuse OP.', scheme: [['Given, to prove, construction', 1], ['Right angles at A and B', 1], ['RHS congruence and PA = PB', 1], ['Triangle PAB equilateral, AB = 10 cm', 1], ['Perimeter 30 cm', 1]], d: 3, c: 'understanding', t: [3], time: 600 }), (C) => { const { P, A, B } = twoTangents(60); C.assert(near(dist(A, B), dist(P, A), 1e-9), 'equilateral'); C.model([10, 30]); });
Q('l03', mk.long({ stem: r`(a) A quadrilateral $ABCD$ is drawn to circumscribe a circle. Prove that $AB + CD = AD + BC$.
(b) In such a quadrilateral, $AB = 6$ cm, $BC = (x + 4)$ cm, $CD = 9$ cm and $DA = (2x - 1)$ cm. Find $x$, the lengths of $BC$ and $DA$, and the perimeter.`, model: r`(a) Let the circle touch $AB$, $BC$, $CD$, $DA$ at $P$, $Q$, $R$, $S$. Tangents from an external point are equal, so $AP = AS$, $BP = BQ$, $CR = CQ$, $DR = DS$.

Adding: $AP + BP + CR + DR = AS + BQ + CQ + DS$, i.e. $(AP + BP) + (CR + DR) = (AS + DS) + (BQ + CQ)$, so $AB + CD = AD + BC$.

(b) $6 + 9 = (x + 4) + (2x - 1) \Rightarrow 15 = 3x + 3 \Rightarrow x = 4$.

$BC = 8$ cm, $DA = 7$ cm. Perimeter $= 6 + 8 + 9 + 7 = 30$ cm.`, sol: r`Check: $AB + CD = 15 = BC + DA$ ✓.`, scheme: [['Four pairs of equal tangents', 1], ['Adding and regrouping', 1], ['Conclusion AB + CD = AD + BC', 1], ['x = 4', 1], ['BC = 8, DA = 7, perimeter 30 cm', 1]], d: 3, c: 'application', t: [3], time: 600 }), (C) => { const x = (15 - 3) / 3; C.assert(x === 4 && 6 + 9 === x + 4 + 2 * x - 1, 'x'); C.model([4, 8, 7, 30, 15]); });
Q('l04', mk.long({ stem: r`A circle with centre $O$ and radius $r$ is inscribed in a triangle $ABC$ right-angled at $C$, with legs $BC = a$, $CA = b$ and hypotenuse $AB = c$.
(a) Prove that $r = \dfrac{a + b - c}{2}$.
(b) Prove that the area of the triangle equals $r \times s$, where $s$ is half the perimeter.
(c) For $a = 12$ cm, $b = 35$ cm and $c = 37$ cm, find $r$ by both results and check that they agree.`, model: r`(a) Let the circle touch $BC$, $CA$, $AB$ at $D$, $E$, $F$. $\angle ODC = \angle OEC = \angle DCE = 90^\circ$ and $OD = OE = r$, so $ODCE$ is a square and $CD = CE = r$.

Then $BF = BD = a - r$ and $AF = AE = b - r$. Since $AF + FB = c$: $(b - r) + (a - r) = c$, so $r = \dfrac{a + b - c}{2}$.

(b) Join $OA$, $OB$, $OC$. The radii to the points of contact are perpendicular to the sides, so
area $= \dfrac12 ar + \dfrac12 br + \dfrac12 cr = r \times \dfrac{a + b + c}{2} = rs$.

(c) By (a): $r = \dfrac{12 + 35 - 37}{2} = 5$ cm.

By (b): area $= \dfrac12 \times 12 \times 35 = 210$ cm², $s = \dfrac{12 + 35 + 37}{2} = 42$ cm, so $r = \dfrac{210}{42} = 5$ cm ✓.`, sol: 'Part (a) uses the square at the right-angle corner and equal tangents; part (b) splits the triangle into three triangles of height r.', scheme: [['Square ODCE, CD = CE = r', 1], ['Tangent lengths a − r, b − r and r = (a + b − c)/2', 1], ['Area = rs by splitting', 1], ['r = 5 cm by (a)', 1], ['Area 210, s = 42, r = 5 cm by (b)', 1]], d: 5, c: 'analysis', t: [2, 3], time: 720 }), (C) => { const [a, b, c] = [12, 35, 37]; C.assert(a * a + b * b === c * c, 'right triangle'); const r1 = (a + b - c) / 2, r2 = (0.5 * a * b) / ((a + b + c) / 2); C.assert(r1 === 5 && r2 === 5, 'both 5'); C.model([5, 210, 42]); });
Q('l05', mk.long({ stem: r`$PQ$ is a chord of length $16$ cm of a circle with centre $O$ and radius $10$ cm. The tangents at $P$ and $Q$ meet at $T$.
(a) Prove that $OT$ is the perpendicular bisector of $PQ$.
(b) Find the distance of the chord from the centre.
(c) Find $OT$ and $TP$.`, model: r`(a) $TP = TQ$ (tangents from $T$) and $OP = OQ$ (radii). So both $T$ and $O$ are equidistant from $P$ and $Q$, and the line $OT$ is the perpendicular bisector of $PQ$. Let it meet $PQ$ at $M$: $PM = MQ = 8$ cm and $OM \perp PQ$.

(b) $OM = \sqrt{10^2 - 8^2} = \sqrt{36} = 6$ cm.

(c) In $\triangle OMP$ and $\triangle OPT$: $\angle OMP = \angle OPT = 90^\circ$ and $\angle O$ is common, so they are similar (AA). Hence $\dfrac{OT}{OP} = \dfrac{OP}{OM}$, giving $OT = \dfrac{100}{6} = \dfrac{50}{3} \approx 16.67$ cm.

$TP = \sqrt{OT^2 - OP^2} = \sqrt{\dfrac{2500}{9} - 100} = \sqrt{\dfrac{1600}{9}} = \dfrac{40}{3} \approx 13.33$ cm.`, sol: r`Check with $TM = OT - OM = \dfrac{50}{3} - 6 = \dfrac{32}{3}$: $TM^2 + PM^2 = \dfrac{1024}{9} + 64 = \dfrac{1600}{9} = TP^2$ ✓.`, scheme: [['O and T equidistant from P and Q: perpendicular bisector', 1], ['OM = 6 cm', 1], ['Similar triangles OMP and OPT', 1], ['OT = 50/3 cm', 1], ['TP = 40/3 cm', 1]], d: 4, c: 'analysis', t: [2, 3], time: 720 }), (C) => { const O = [0, 0], P = [-8, -6], Qp = [8, -6]; const T = meet(P, [P[0] + 6, P[1] - 8], Qp, [Qp[0] - 6, Qp[1] - 8]); C.assert(near(dist(O, P), 10) && near(dist(O, T), 50 / 3, 1e-3) && near(dist(T, P), 40 / 3, 1e-3), 'OT 50/3, TP 40/3'); C.model([6, '\\dfrac{50}{3}', '\\dfrac{40}{3}', 16.67, 13.33]); C.sol(['\\dfrac{32}{3}', '\\dfrac{1600}{9}']); });
Q('l06', mk.long({ stem: r`A circle with centre $O$ is inscribed in a triangle $ABC$ with $AB = AC$. It touches $BC$ at $D$, $CA$ at $E$ and $AB$ at $F$.
(a) Prove that $D$ is the midpoint of $BC$.
(b) Prove that $A$, $O$ and $D$ lie on one straight line.
(c) If $AB = AC = 10$ cm and $BC = 12$ cm, find the radius of the circle and the length $AF$.`, model: r`(a) Equal tangents: $AF = AE$, $BF = BD$, $CE = CD$. Since $AB = AC$, $AB - AF = AC - AE$, i.e. $BF = CE$. Hence $BD = CD$: $D$ is the midpoint of $BC$.

(b) $OD \perp BC$ (radius $\perp$ tangent). In isosceles $\triangle ABC$, the line from $A$ to the midpoint $D$ of $BC$ is also perpendicular to $BC$. Through $D$ there is only one perpendicular to $BC$, so $DO$ and $DA$ are the same line: $A$, $O$, $D$ are collinear.

(c) $BD = 6$ cm, so the altitude $AD = \sqrt{10^2 - 6^2} = 8$ cm and the area is $\dfrac12 \times 12 \times 8 = 48$ cm². Semi-perimeter $s = 16$ cm, so $r = \dfrac{48}{16} = 3$ cm.

$AF = s - BC = 16 - 12 = 4$ cm. (Check: $AO = 8 - 3 = 5$ and $AF = \sqrt{5^2 - 3^2} = 4$ ✓.)`, sol: 'The incircle touches the base of an isosceles triangle at its midpoint, on the axis of symmetry.', scheme: [['(a) BF = CE hence BD = CD', 1], ['(b) Both OD and AD perpendicular to BC at D', 1], ['AD = 8 cm and area 48 cm²', 1], ['r = 3 cm', 1], ['AF = 4 cm', 1]], d: 4, c: 'analysis', t: [2, 3], time: 720 }), (C) => { const t = { A: [6, 8], B: [0, 0], Cc: [12, 0] }; const a = 12, b = 10, c = 10, s = (a + b + c) / 2; const I = [(a * t.A[0] + b * t.B[0] + c * t.Cc[0]) / (2 * s), (a * t.A[1] + b * t.B[1] + c * t.Cc[1]) / (2 * s)]; C.assert(near(I[0], 6) && near(I[1], 3) && tri(a, b, c)[0] === 4, 'incentre (6, 3), r = 3, AF = 4'); C.model([8, 48, 16, 3, 4]); });

// =============================================================== Case-based
caseQ('c01', {
  passage: r`At the Dussehra fair in Mysuru, a giant wheel of radius $15$ m has its centre $O$ at a height of $24$ m above the point $F$ on the ground. To steady it in the wind, a straight cable runs from an anchor $A$ on the ground, $7$ m from $F$, and just touches the rim of the wheel at $T$. The figure shows the set-up.`,
  assets: [figWheel], d: 3, c: 'application',
  model: r`(a) Option (a): $\angle OTA = 90^\circ$. (b) $OA = 25$ m. (c) (i) $AT = 20$ m. Or (ii) $AT' = AT = 20$ m and the area of $OTAT'$ is $300$ m².`,
  sol: r`(b) $OA = \sqrt{24^2 + 7^2} = \sqrt{625} = 25$ m. (c) (i) $AT = \sqrt{25^2 - 15^2} = \sqrt{400} = 20$ m. (ii) Two right triangles, each $\dfrac12 \times 15 \times 20 = 150$ m².`,
  children: [
    child('a', mk.mcq({ stem: r`The angle between the cable $AT$ and the radius $OT$ is`, opts: [r`$90^\circ$`, r`$45^\circ$`, r`$60^\circ$`, 'impossible to find without measuring'], key: 'a', sol: 'The cable touches the wheel, so it is a tangent at T and is perpendicular to the radius OT.', d: 1, c: 'understanding', t: [2], time: 45 })),
    child('b', mk.num({ stem: r`Find the distance $OA$ from the centre of the wheel to the anchor, in metres.`, value: 25, unit: 'm', sol: r`$\angle OFA = 90^\circ$: $OA = \sqrt{24^2 + 7^2} = \sqrt{576 + 49} = \sqrt{625} = 25$ m.`, scheme: [['25 m', 1]], d: 2, c: 'application', t: [2], time: 75 })),
    child('c', mk.short({ marks: 2, stem: '**(i)** Find the length of the cable AT.', model: r`$OT \perp AT$, so $AT = \sqrt{OA^2 - OT^2} = \sqrt{625 - 225} = \sqrt{400} = 20$ m.`, sol: 'Right angle at the point of contact; OA is the hypotenuse.', scheme: [['Right triangle OTA with hypotenuse OA', 1], ['AT = 20 m', 1]], d: 2, c: 'application', t: [2], time: 120 }), [
      mk.short({ marks: 2, stem: r`**(ii)** A second cable from the same anchor touches the wheel at $T'$ on the other side of $OA$. Find its length, and the area of the quadrilateral $OTAT'$.`, model: r`Tangents from $A$ are equal, so $AT' = AT = 20$ m. $OA$ splits $OTAT'$ into two congruent right triangles, each of area $\dfrac12 \times 15 \times 20 = 150$ m², so the area is $300$ m².`, sol: 'Equal tangents and two congruent right triangles.', scheme: [["AT' = 20 m", 1], ['Area 300 m²', 1]], d: 3, c: 'application', t: [3], time: 150 }),
    ]),
  ],
}, (C) => { const k = wheel.k; const OA = dist(wheel.O, wheel.A) / k, AT = dist(wheel.A, wheel.T) / k; C.assert(near(angleDeg(wheel.T, wheel.O, wheel.A), 90, 1e-2), 'right angle at T'); C.child('a').key('a'); C.child('b').val(Math.round(OA * 1e3) / 1e3, 1e-3); C.child('c').model([Math.round(AT)]); C.child('cii').model([20, 150, 300]); C.assert(near(AT, 20, 1e-2) && 2 * 0.5 * 15 * 20 === 300, 'AT 20, area 300'); });

caseQ('c02', {
  passage: r`A triangular park $ABC$ in Chandigarh has sides $AB = 13$ m, $BC = 14$ m and $CA = 15$ m. A circular lotus pond is built so that its edge just touches all three boundary walls: $BC$ at $D$, $CA$ at $E$ and $AB$ at $F$. The area of the park is $84$ m².`,
  d: 3, c: 'application',
  model: r`(a) Option (a): $BF$. (b) $BD = 6$ m. (c) (i) $AF = AE = 7$ m and $CD = CE = 8$ m. Or (ii) $r = 4$ m.`,
  sol: r`Tangent lengths $x, y, z$ from $A, B, C$: $x + y = 13$, $y + z = 14$, $z + x = 15$, so $x + y + z = 21$: $x = 7$, $y = 6$, $z = 8$. Area $= \dfrac12 r(13 + 14 + 15) = 21r = 84$ gives $r = 4$ m.`,
  children: [
    child('a', mk.mcq({ stem: r`Which length is always equal to $BD$?`, opts: ['$BF$', '$CD$', '$AF$', '$AE$'], key: 'a', sol: 'BD and BF are the two tangents from B to the pond, so they are equal.', d: 1, c: 'understanding', t: [3], time: 45 })),
    child('b', mk.num({ stem: r`Find $BD$ in metres.`, value: 6, unit: 'm', sol: r`With tangent lengths $x, y, z$ from $A, B, C$: $x + y + z = \dfrac{13 + 14 + 15}{2} = 21$, so $BD = y = 21 - 15 = 6$ m.`, scheme: [['6 m', 1]], d: 2, c: 'application', t: [3], time: 90 })),
    child('c', mk.short({ marks: 2, stem: '**(i)** Find AF and CE, and check that the tangent lengths add up to the sides.', model: r`$AF = 21 - 14 = 7$ m and $CE = 21 - 13 = 8$ m. Check: $AB = 7 + 6 = 13$, $BC = 6 + 8 = 14$, $CA = 8 + 7 = 15$ ✓.`, sol: 'Each tangent length is the semi-perimeter minus the opposite side.', scheme: [['AF = 7 m, CE = 8 m', 1], ['Check of all three sides', 1]], d: 2, c: 'application', t: [3], time: 120 }), [
      mk.short({ marks: 2, stem: '**(ii)** By joining the centre of the pond to A, B and C, find the radius of the pond.', model: r`The radii to $D$, $E$, $F$ are perpendicular to the walls, so the three triangles $OBC$, $OCA$, $OAB$ have height $r$: area $= \dfrac12 r(14 + 15 + 13) = 21r$. So $21r = 84$ and $r = 4$ m.`, sol: 'Area = r × semi-perimeter.', scheme: [['Area = 21r', 1], ['r = 4 m', 1]], d: 3, c: 'analysis', t: [2, 3], time: 150 }),
    ]),
  ],
}, (C) => { const [x, y, z] = tri(14, 15, 13); const { A, B, C: Cc } = { A: [5, 12], B: [0, 0], C: [14, 0] }; C.assert(near(dist(A, B), 13) && near(dist(A, Cc), 15), 'triangle'); const area = 0.5 * 14 * 12; C.assert(area === 84 && area / 21 === 4, 'area 84, r 4'); C.child('a').key('a'); C.child('b').val(y); C.child('c').model([x, z]); C.child('cii').model([21, 4]); });

caseQ('c03', {
  passage: r`Meera places a glass bangle of radius $3.5$ cm in the corner $P$ of a tray. The two edges of the tray at $P$ are perpendicular, and the bangle touches the edges at $A$ and $B$. The figure shows the bangle with centre $O$.`,
  assets: [figBangle], d: 3, c: 'application',
  model: r`(a) Option (a): a square. (b) $PA = 3.5$ cm. (c) (i) $OP = 3.5\sqrt2 \approx 4.95$ cm. Or (ii) $OP = 7$ cm.`,
  sol: r`$\angle OAP = \angle OBP = \angle APB = 90^\circ$ and $OA = OB$, $PA = PB$: $OAPB$ is a square of side $3.5$ cm, with diagonal $OP = 3.5\sqrt2$. For a $60^\circ$ corner, $\angle OPA = 30^\circ$ and $OP = \dfrac{OA}{\sin 30^\circ} = 7$ cm.`,
  children: [
    child('a', mk.mcq({ stem: r`The quadrilateral $OAPB$ is`, opts: ['a square', 'a rectangle that is not a square', 'a trapezium that is not a parallelogram', 'a kite that is not a rhombus'], key: 'a', sol: r`All four angles are $90^\circ$ (two by tangent $\perp$ radius, one at the corner, so the fourth too), and $OA = OB$: a square.`, d: 2, c: 'understanding', t: [2, 3], time: 60 })),
    child('b', mk.num({ stem: r`Find $PA$ in cm.`, value: 3.5, unit: 'cm', sol: r`$OAPB$ is a square, so $PA = OB = 3.5$ cm.`, scheme: [['3.5 cm', 1]], d: 2, c: 'application', t: [3], time: 60 })),
    child('c', mk.short({ marks: 2, stem: '**(i)** Find the distance OP of the centre of the bangle from the corner.', model: r`$OP$ is the diagonal of the square $OAPB$: $OP = \sqrt{3.5^2 + 3.5^2} = 3.5\sqrt2 \approx 4.95$ cm.`, sol: 'Diagonal of a square = side × √2.', scheme: [['Right triangle OAP', 1], ['OP = 3.5√2 ≈ 4.95 cm', 1]], d: 2, c: 'application', t: [2], time: 90 }), [
      mk.short({ marks: 2, stem: r`**(ii)** The same bangle is placed in a corner where the edges meet at $60^\circ$. Find the distance of its centre from the corner.`, model: r`$OP$ bisects the $60^\circ$ angle between the two tangents, so $\angle OPA = 30^\circ$, with $\angle OAP = 90^\circ$. Then $\sin 30^\circ = \dfrac{OA}{OP}$, so $OP = \dfrac{3.5}{1/2} = 7$ cm.`, sol: 'The centre lies on the bisector of the angle between the tangents.', scheme: [['∠OPA = 30° with right angle at A', 1], ['OP = 7 cm', 1]], d: 4, c: 'analysis', t: [3], time: 150 }),
    ]),
  ],
}, (C) => { const k = 0.5; C.assert(near(dist(bangle.P, bangle.A) / k, 3.5) && near(dist(bangle.O, bangle.P) / k, 3.5 * Math.SQRT2), 'square'); C.child('a').key('a'); C.child('b').val(dist(bangle.P, bangle.A) / k); C.child('c').model(['3.5\\sqrt2', 4.95]); const { O, P } = twoTangents(60, 3.5); C.child('cii').model([Math.round(dist(O, P) * 1e9) / 1e9]); });

caseQ('c04', {
  passage: r`A circular well in a village near Nashik has a radius of $3.3$ m. To lift a heavy bucket, two ropes are tied to a peg $P$ fixed in the ground $6.5$ m from the centre $O$ of the well, and stretched so that each just touches the rim of the well, at $A$ and at $B$.`,
  d: 3, c: 'application',
  model: r`(a) Option (a). (b) $PA = 5.6$ m. (c) (i) Area of $OAPB = 18.48$ m². Or (ii) $\triangle OAP \cong \triangle OBP$ (RHS), so $\angle APO = \angle BPO$; and in $OAPB$, $\angle AOB + \angle APB = 360^\circ - 90^\circ - 90^\circ = 180^\circ$.`,
  sol: r`(b) $PA = \sqrt{6.5^2 - 3.3^2} = \sqrt{42.25 - 10.89} = \sqrt{31.36} = 5.6$ m. (c) (i) $2 \times \dfrac12 \times 3.3 \times 5.6 = 18.48$ m².`,
  children: [
    child('a', mk.mcq({ stem: 'The two ropes PA and PB are of equal length because', opts: ['tangents drawn from an external point to a circle are equal', 'all radii of a circle are equal', 'the peg is on the perpendicular bisector of the well', 'the ropes are tied to the same bucket'], key: 'a', sol: 'PA and PB are tangents from the same external point P, so they are equal. (Equal radii are used inside the proof, but they are not the reason by themselves.)', d: 1, c: 'understanding', t: [3], time: 45 })),
    child('b', mk.num({ stem: 'Find the length of each rope, PA, in metres.', value: 5.6, unit: 'm', sol: r`$\angle OAP = 90^\circ$: $PA = \sqrt{6.5^2 - 3.3^2} = \sqrt{42.25 - 10.89} = \sqrt{31.36} = 5.6$ m.`, scheme: [['5.6 m', 1]], d: 2, c: 'application', t: [2], time: 90 })),
    child('c', mk.short({ marks: 2, stem: '**(i)** Find the area of the region OAPB enclosed by the two ropes and the radii OA and OB.', model: r`$OP$ splits $OAPB$ into two congruent right triangles, each of area $\dfrac12 \times 3.3 \times 5.6 = 9.24$ m². Area $= 2 \times 9.24 = 18.48$ m².`, sol: 'Two right triangles with legs 3.3 m and 5.6 m.', scheme: [['One triangle 9.24 m²', 1], ['Area 18.48 m²', 1]], d: 3, c: 'application', t: [2, 3], time: 120 }), [
      mk.short({ marks: 2, stem: r`**(ii)** Show that $OP$ bisects the angle between the two ropes, and that $\angle AOB + \angle APB = 180^\circ$.`, model: r`In right triangles $OAP$ and $OBP$: $OA = OB$ (radii), $OP$ is common, so they are congruent (RHS) and $\angle APO = \angle BPO$: $OP$ bisects $\angle APB$.

In quadrilateral $OAPB$, $\angle OAP = \angle OBP = 90^\circ$, so $\angle AOB + \angle APB = 360^\circ - 180^\circ = 180^\circ$.`, sol: 'RHS congruence, then the angle sum of a quadrilateral.', scheme: [['RHS congruence and bisector', 1], ['Angle sum gives 180°', 1]], d: 3, c: 'analysis', t: [3], time: 150 }),
    ]),
  ],
}, (C) => { const PA = leg(6.5, 3.3); C.assert(near(PA, 5.6, 1e-9), 'PA 5.6'); C.child('a').key('a'); C.child('b').val(Math.round(PA * 1e6) / 1e6); C.child('c').model([9.24, 18.48]); C.child('cii').model([180]); C.assert(near(2 * 0.5 * 3.3 * 5.6, 18.48), 'area'); });

caseQ('c05', {
  passage: r`A farmer in Anand owns a four-sided plot $ABCD$ with a circular pond that touches all four boundaries, $AB$ at $P$, $BC$ at $Q$, $CD$ at $R$ and $DA$ at $S$. The boundaries measure $AB = 25$ m, $BC = 31$ m and $CD = 29$ m, as shown in the figure. The fourth side $DA$ has not been measured.`,
  assets: [figPlot], d: 3, c: 'application',
  model: r`(a) Option (a). (b) $DA = 23$ m. (c) (i) $BQ = 15$ m, $CR = 16$ m, $DS = 13$ m. Or (ii) perimeter $108$ m; cost ₹$16200$.`,
  sol: r`(b) $AB + CD = BC + DA$: $25 + 29 = 31 + DA$, so $DA = 23$ m. (c) (i) $BP = 25 - 10 = 15 = BQ$; $CQ = 31 - 15 = 16 = CR$; $DR = 29 - 16 = 13 = DS$; check $AS = 23 - 13 = 10 = AP$ ✓. (ii) $25 + 31 + 29 + 23 = 108$ m; $108 \times 150 = 16200$.`,
  children: [
    child('a', mk.mcq({ stem: 'Which relation must hold for the four sides of the plot?', opts: ['AB + CD = BC + DA', 'AB + BC = CD + DA', 'AB = CD and BC = DA', 'AB × CD = BC × DA'], key: 'a', sol: 'For a quadrilateral circumscribing a circle, the sums of opposite sides are equal (from the four pairs of equal tangents).', d: 1, c: 'understanding', t: [3], time: 45 })),
    child('b', mk.num({ stem: 'Find the length of DA in metres.', value: 23, unit: 'm', sol: r`$25 + 29 = 31 + DA \Rightarrow DA = 54 - 31 = 23$ m.`, scheme: [['23 m', 1]], d: 2, c: 'application', t: [3], time: 60 })),
    child('c', mk.short({ marks: 2, stem: r`**(i)** The pond touches $AB$ at $P$ with $AP = 10$ m. Find $BQ$, $CR$ and $DS$.`, model: r`$BQ = BP = 25 - 10 = 15$ m; $CR = CQ = 31 - 15 = 16$ m; $DS = DR = 29 - 16 = 13$ m. Check: $AS = DA - DS = 23 - 13 = 10 = AP$ ✓.`, sol: 'Walk round the plot using equal tangents.', scheme: [['BQ = 15 m', 0.5], ['CR = 16 m and DS = 13 m', 1], ['Check AS = AP', 0.5]], d: 3, c: 'analysis', t: [3], time: 150 }), [
      mk.short({ marks: 2, stem: '**(ii)** The farmer fences all four sides at ₹150 per metre. Find the cost.', model: r`Perimeter $= 25 + 31 + 29 + 23 = 108$ m (also $2 \times 54$). Cost $= 108 \times 150 = $ ₹$16200$.`, sol: 'Perimeter = twice the sum of a pair of opposite sides.', scheme: [['Perimeter 108 m', 1], ['₹16200', 1]], d: 2, c: 'application', t: [3], time: 90 }),
    ]),
  ],
}, (C) => { const [A, B, Cc, D] = kiteQ.V; const k = 0.13; const s = [dist(A, B), dist(B, Cc), dist(Cc, D), dist(D, A)].map((v) => Math.round((v / k) * 10) / 10); C.assert(s.join() === '25,31,29,23', `sides ${s}`); C.child('a').key('a'); C.child('b').val(s[3]); C.child('c').model([15, 16, 13, 10]); C.child('cii').model([108, 16200]); C.assert(near(dist(A, kiteQ.T[0]) / k, 10, 1e-3), 'AP = 10 on the drawing'); });
