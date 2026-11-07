// CBSE 9 Mathematics ch11 Circles: objective items. Every answer is recomputed from coordinates on a circle (polar points, distances,
// angles at a vertex) or by solving the stated equation by search; the options are typed independently of the computation.
import { Q, mk } from './lib.mjs';
import { r, must, close, range, dist, polar, angleAt, lineDist, circumcentre, lineInter, mid } from './h.mjs';
import { cycPts, O } from './figs.mjs';

const T = (k, o, chk) => Q(k, mk.mcq({ stem: o.stem, opts: o.opts, key: 'a', sol: o.sol, d: o.d, c: o.c, t: o.t, time: o.time ?? 75, assets: o.assets }), chk);
const half = (rr, d) => Math.sqrt(rr * rr - d * d);
const cyclic = (pts) => { const c = circumcentre(pts[0], pts[1], pts[2]); return !!c && Math.abs(dist(c, pts[3]) - dist(c, pts[0])) < 1e-9; };

// =============================================================== MCQ (m01-m06 are the check-slide items)
{
  const A = polar(O, 5, 0), B = polar(O, 5, 180), C = polar(O, 5, 100), D = polar(O, 5, 160);
  T('m01', { stem: 'A chord of a circle that passes through the centre is called a', opts: ['diameter', 'radius', 'sector', 'minor arc'], sol: 'A chord is a line segment joining two points of the circle. When it passes through the centre it is the longest chord and is called a diameter. A radius joins the centre to a point of the circle, and a sector and an arc are parts of the circle itself.', d: 1, c: 'understanding', t: [1], time: 60 }, (Cx) => {
    const kind = (p, q) => (lineDist(O, p, q) < 1e-9 ? 'diameter' : 'chord');
    Cx.assert(kind(A, B) === 'diameter' && kind(C, D) === 'chord' && close(dist(A, B), 10), 'a chord through the centre is a diameter, 2r long');
    Cx.which([kind(A, B), 'radius', 'sector', 'minor arc'], 'diameter');
  });
}
{
  const A = [-9, -12], B = [9, -12], rad = dist(O, A);
  T('m02', { stem: r`A chord of a circular clay lid is $18$ cm long and lies $12$ cm from the centre. The radius of the lid is`, opts: [r`$15$ cm`, r`$21$ cm`, r`$9$ cm`, r`$30$ cm`], sol: r`The perpendicular from the centre bisects the chord, so half the chord is $9$ cm. In the right triangle formed with the radius, $r^2 = 9^2 + 12^2 = 81 + 144 = 225$, so $r = 15$ cm. The value $21$ is $9 + 12$ and $30$ is $18 + 12$.`, d: 2, c: 'application', t: [2], time: 75 }, (Cx) => {
    Cx.assert(close(dist(A, B), 18) && close(lineDist(O, A, B), 12) && close(rad, dist(O, B)), 'chord 18 at distance 12');
    Cx.which([rad, 21, 9, 30], 15);
  });
}
{
  const rr = Math.hypot(7, 6), A = [-7, -6], B = [7, -6];
  const d2 = Math.sqrt(rr * rr - 49);
  T('m03', { stem: r`In a circle with centre $O$ the chords $AB$ and $CD$ are each $14$ cm long. The chord $AB$ is $6$ cm from the centre. The distance of $CD$ from the centre is`, opts: [r`$6$ cm`, r`$7$ cm`, r`$14$ cm`, r`$8$ cm`], sol: r`Equal chords of a circle are equidistant from the centre. Since $AB = CD$ and $AB$ is $6$ cm from the centre, $CD$ is also $6$ cm from the centre. (Check: $r^2 = 7^2 + 6^2$, and a chord of $14$ cm leaves $\sqrt{r^2 - 7^2} = 6$ cm.)`, d: 1, c: 'understanding', t: [2], time: 60 }, (Cx) => {
    Cx.assert(close(dist(A, B), 14) && close(lineDist(O, A, B), 6) && close(d2, 6), 'the second chord of the same length is also 6 cm away');
    Cx.which([d2, 7, 14, 8], 6);
  });
}
{
  const A = polar(O, 4, 214), B = polar(O, 4, 326), P = polar(O, 4, 90), ang = angleAt(P, A, B);
  T('m04', { stem: r`Two spokes $OA$ and $OB$ of a bicycle wheel make an angle of $112^\circ$ at the hub $O$. A reflector $P$ on the rim, on the major arc $AB$, sees the chord $AB$ at an angle $\angle APB$ equal to`, opts: [r`$56^\circ$`, r`$112^\circ$`, r`$224^\circ$`, r`$68^\circ$`], sol: r`The angle at the centre is double the angle at any point of the remaining part of the circle. So $\angle APB = \dfrac{1}{2} \times 112^\circ = 56^\circ$. The value $224^\circ$ is double the central angle and $68^\circ$ is $180^\circ - 112^\circ$.`, d: 2, c: 'application', t: [3], time: 75 }, (Cx) => {
    Cx.assert(close(angleAt(O, A, B), 112) && close(ang, 56), 'central 112, rim 56');
    Cx.which([Math.round(ang), 112, 224, 68], 56);
  });
}
{
  const A = polar(O, 4, 230), B = polar(O, 4, 304), P = polar(O, 4, 60), Q = polar(O, 4, 140);
  T('m05', { stem: r`$P$ and $Q$ lie on the same side of a chord $AB$ of a circle, and $\angle APB = 37^\circ$. Then $\angle AQB$ is`, opts: [r`$37^\circ$`, r`$53^\circ$`, r`$74^\circ$`, r`$143^\circ$`], sol: r`$P$ and $Q$ are in the same segment of the circle, so the angles they make with the chord $AB$ are equal: $\angle AQB = \angle APB = 37^\circ$. The value $74^\circ$ would be the angle at the centre.`, d: 1, c: 'understanding', t: [3], time: 60 }, (Cx) => {
    Cx.assert(close(angleAt(P, A, B), 37) && close(angleAt(Q, A, B), 37) && close(angleAt(O, A, B), 74), 'same segment angles 37, centre 74');
    Cx.which([Math.round(angleAt(Q, A, B)), 53, Math.round(angleAt(O, A, B)), 143], 37);
  });
}
{
  const q = cycPts([70, 100, 114, 76], 25);
  T('m06', { stem: r`$ABCD$ is a cyclic quadrilateral and $\angle A = 107^\circ$. Then $\angle C$ is`, opts: [r`$73^\circ$`, r`$107^\circ$`, r`$83^\circ$`, r`$253^\circ$`], sol: r`Opposite angles of a cyclic quadrilateral add up to $180^\circ$, so $\angle C = 180^\circ - 107^\circ = 73^\circ$. The value $107^\circ$ would hold only if the angles were equal.`, d: 1, c: 'understanding', t: [3], time: 60 }, (Cx) => {
    Cx.assert(close(q.angA, 107) && close(q.angC, 73) && close(q.angB + q.angD, 180), 'A = 107 gives C = 73');
    Cx.which([Math.round(q.angC), 107, 83, 253], 73);
  });
}

// =============================================================== MCQ for the tests
T('m07', { stem: 'The number of circles that can be drawn through three points that do not lie on one straight line is', opts: ['exactly one', 'none', 'exactly two', 'infinitely many'], sol: 'The centre of such a circle must lie on the perpendicular bisectors of the segments joining the points, and two of these lines meet at exactly one point. So there is exactly one circle. (For points on one line there is no circle at all.)', d: 1, c: 'recall', t: [1], time: 60 }, (Cx) => {
  const ok = [[[0, 0], [4, 0], [1, 5]], [[-2, 3], [6, 1], [2, 9]]].every((t) => circumcentre(...t) !== null);
  Cx.assert(ok && circumcentre([0, 0], [2, 2], [5, 5]) === null, 'one centre for non-collinear points, none for collinear points');
  Cx.which([1, 0, 2, Infinity], 1);
});
T('m08', { stem: 'The region of a circle between a chord and the arc that it cuts off is called a', opts: ['segment', 'sector', 'semicircle', 'radius'], sol: 'A chord cuts the circular region into two parts. Each part, bounded by the chord and an arc, is a segment. A sector is bounded by two radii and an arc, and a semicircle is the special segment cut off by a diameter.', d: 1, c: 'recall', t: [1], time: 60 }, (Cx) => { Cx.which(['segment', 'sector', 'semicircle', 'radius'], 'segment'); });
{
  const t = { A: [1, 2], B: [8, 1], C: [5, 10] }, c = circumcentre(t.A, t.B, t.C);
  const eqd = (p) => Math.abs(dist(p, t.A) - dist(p, t.B)) < 1e-9 && Math.abs(dist(p, t.B) - dist(p, t.C)) < 1e-9;
  const m = mid(t.A, t.C), f = [t.B[0] + 1, t.B[1] - 0.2];
  T('m09', { stem: 'Three trees stand at $A$, $B$ and $C$ in a village park, not in one straight line. A lamp post must be at the same distance from all three trees. It should be placed at', opts: ['the point where the perpendicular bisectors of $AB$ and $BC$ meet', 'the mid-point of $AC$', 'the point $B$ itself', 'the point where $AB$ and $BC$ meet when extended'], sol: 'The points equidistant from $A$ and $B$ lie on the perpendicular bisector of $AB$, and those equidistant from $B$ and $C$ lie on the perpendicular bisector of $BC$. The point where they meet is equidistant from all three, and it is the centre of the circle through $A$, $B$, $C$. The mid-point of $AC$ and the point $B$ are not equally far from all three trees.', d: 2, c: 'application', t: [1], time: 75 }, (Cx) => {
    Cx.assert(eqd(c) && !eqd(m) && !eqd(t.B) && !eqd(f), 'only the circumcentre is equidistant from all three');
    Cx.which([eqd(c), eqd(m), eqd(t.B), eqd(f)], true);
  });
}
{
  const d = Math.sqrt(29 * 29 - 20 * 20);
  T('m10', { stem: r`A circular table top has radius $29$ cm. A chord $40$ cm long is marked on it for an inlay. The distance of this chord from the centre of the table top is`, opts: [r`$21$ cm`, r`$9$ cm`, r`$20$ cm`, r`$24.5$ cm`], sol: r`The perpendicular from the centre bisects the chord, so half the chord is $20$ cm. Then $d^2 = 29^2 - 20^2 = 841 - 400 = 441$, so $d = 21$ cm. The value $9$ is $29 - 20$.`, d: 2, c: 'application', t: [2], time: 75 }, (Cx) => {
    const A = [-20, -d], B = [20, -d];
    Cx.assert(close(dist(O, A), 29) && close(dist(A, B), 40) && close(lineDist(O, A, B), 21), '40 cm chord in radius 29 is 21 from the centre');
    Cx.which([d, 9, 20, 24.5], 21);
  });
}
{
  const xs = range(1, 60).filter((x) => 3 * x + 10 === 5 * x - 30);
  T('m11', { stem: r`$AB$ and $CD$ are equal chords of a circle with centre $O$. If $\angle AOB = (3x + 10)^\circ$ and $\angle COD = (5x - 30)^\circ$, the value of $x$ is`, opts: ['$20$', '$10$', '$25$', '$40$'], sol: r`Equal chords subtend equal angles at the centre, so $3x + 10 = 5x - 30$, that is $2x = 40$ and $x = 20$. Each angle is $70^\circ$.`, d: 2, c: 'application', t: [2], time: 75 }, (Cx) => {
    const a = polar(O, 5, 0), b = polar(O, 5, 70), c = polar(O, 5, 130), d = polar(O, 5, 200);
    Cx.assert(xs.join() === '20' && 3 * 20 + 10 === 70 && 5 * 20 - 30 === 70 && close(dist(a, b), dist(c, d)) && close(angleAt(O, a, b), 70) && close(angleAt(O, c, d), 70), 'x = 20 and the chords are equal');
    Cx.which([xs[0], 10, 25, 40], 20);
  });
}
{
  const A = polar(O, 5, 10), B = polar(O, 5, 60), C = polar(O, 5, 130), D = polar(O, 5, 180);
  T('m12', { stem: 'Two chords of a circle subtend equal angles at the centre. Then the two chords are', opts: ['equal in length', 'parallel to each other', 'perpendicular to each other', 'both diameters'], sol: 'If two chords subtend equal angles at the centre, the two triangles formed by the chords and the radii are congruent (two radii and the included angle), so the chords are equal. They need not be parallel or perpendicular, and they are not diameters unless the angle is $180^\\circ$.', d: 1, c: 'understanding', t: [2], time: 60 }, (Cx) => {
    const u = [B[0] - A[0], B[1] - A[1]], v = [D[0] - C[0], D[1] - C[1]];
    const par = Math.abs(u[0] * v[1] - u[1] * v[0]) < 1e-9, perp = Math.abs(u[0] * v[0] + u[1] * v[1]) < 1e-9;
    Cx.assert(close(angleAt(O, A, B), angleAt(O, C, D)) && close(dist(A, B), dist(C, D)) && !par && !perp, 'equal central angles give equal chords, not parallel or perpendicular');
    Cx.which([close(dist(A, B), dist(C, D)), par, perp, close(dist(A, B), 10)], true);
  });
}
{
  const A = [-4, 0], B = [4, 0], P = polar(O, 4, 82);
  T('m13', { stem: r`$AB$ is a diameter of a circle and $P$ is a point of the circle with $\angle PAB = 41^\circ$. Then $\angle PBA$ is`, opts: [r`$49^\circ$`, r`$41^\circ$`, r`$139^\circ$`, r`$90^\circ$`], sol: r`The angle in a semicircle is a right angle, so $\angle APB = 90^\circ$. The angles of triangle $APB$ add up to $180^\circ$, so $\angle PBA = 180^\circ - 90^\circ - 41^\circ = 49^\circ$. The value $90^\circ$ is $\angle APB$.`, d: 2, c: 'application', t: [3], time: 75 }, (Cx) => {
    Cx.assert(close(angleAt(A, P, B), 41) && close(angleAt(P, A, B), 90) && close(angleAt(B, P, A), 49), 'diameter triangle 41, 90, 49');
    Cx.which([Math.round(angleAt(B, P, A)), 41, 139, 90], 49);
  });
}
{
  const A = polar(O, 4, 220), B = polar(O, 4, 320), R = polar(O, 4, 270);
  T('m14', { stem: r`The chord $AB$ of a circle subtends $100^\circ$ at the centre. A point $R$ lies on the minor arc $AB$. Then $\angle ARB$ is`, opts: [r`$130^\circ$`, r`$50^\circ$`, r`$100^\circ$`, r`$260^\circ$`], sol: r`A point $P$ on the major arc sees the chord at $\dfrac{1}{2} \times 100^\circ = 50^\circ$. The quadrilateral $APBR$ is cyclic, so its opposite angles at $P$ and $R$ add up to $180^\circ$: $\angle ARB = 180^\circ - 50^\circ = 130^\circ$. The value $50^\circ$ is the angle from the major arc.`, d: 3, c: 'analysis', t: [3], time: 105 }, (Cx) => {
    const P = polar(O, 4, 90);
    Cx.assert(close(angleAt(O, A, B), 100) && close(angleAt(P, A, B), 50) && close(angleAt(R, A, B), 130), 'minor arc angle 130');
    Cx.which([Math.round(angleAt(R, A, B)), Math.round(angleAt(P, A, B)), 100, 260], 130);
  });
}
{
  const parts = 7 + 11, unit = 180 / parts;
  T('m15', { stem: r`In a cyclic quadrilateral $ABCD$ the opposite angles $\angle A$ and $\angle C$ are in the ratio $7 : 11$. The larger of the two angles is`, opts: [r`$110^\circ$`, r`$70^\circ$`, r`$77^\circ$`, r`$100^\circ$`], sol: r`The opposite angles add up to $180^\circ$ and $7 + 11 = 18$ parts, so one part is $180^\circ \div 18 = 10^\circ$. The angles are $70^\circ$ and $110^\circ$, and the larger is $110^\circ$.`, d: 2, c: 'application', t: [3], time: 75 }, (Cx) => {
    const q = cycPts([90, 70, 110, 90], 15);
    Cx.assert(unit === 10 && 7 * unit === 70 && 11 * unit === 110 && close(q.angA + q.angC, 180), 'parts of 10');
    Cx.which([11 * unit, 7 * unit, 77, 100], 110);
  });
}
{
  const q = cycPts([70, 86, 100, 104], 20), B = q.B, A = q.A, E = [B[0] + (B[0] - A[0]), B[1] + (B[1] - A[1])];
  T('m16', { stem: r`$ABCD$ is a cyclic quadrilateral and the side $AB$ is produced to a point $E$. If $\angle ADC = 78^\circ$, then the exterior angle $\angle CBE$ is`, opts: [r`$78^\circ$`, r`$102^\circ$`, r`$156^\circ$`, r`$39^\circ$`], sol: r`$\angle ABC + \angle ADC = 180^\circ$ (cyclic quadrilateral), so $\angle ABC = 102^\circ$. Then $\angle CBE = 180^\circ - 102^\circ = 78^\circ$ (linear pair). So the exterior angle equals the interior opposite angle $\angle ADC$.`, d: 2, c: 'application', t: [3], time: 90 }, (Cx) => {
    Cx.assert(close(q.angD, 78) && close(q.angB, 102) && close(angleAt(B, q.C, E), 78), 'exterior angle 78');
    Cx.which([Math.round(angleAt(B, q.C, E)), 102, 156, 39], 78);
  });
}
{
  const rhombus = [[0, 0], [5, 3], [10, 0], [5, -3]], rect = [[0, 0], [6, 0], [6, 4], [0, 4]], square = [[0, 0], [4, 0], [4, 4], [0, 4]], trap = [[0, 0], [8, 0], [6, 3], [2, 3]];
  T('m17', { stem: 'Which of these quadrilaterals can have all four corners on a circle only when it is a square?', opts: ['a rhombus', 'a rectangle', 'an isosceles trapezium', 'a square'], sol: 'Opposite angles of a rhombus are equal, so they add up to $180^\\circ$ only when each is $90^\\circ$, and then the rhombus is a square. A rectangle (all angles $90^\\circ$), a square, and an isosceles trapezium (opposite angles supplementary) can always be drawn inside a circle.', d: 2, c: 'analysis', t: [3], time: 90 }, (Cx) => {
    Cx.assert(!cyclic(rhombus) && cyclic(rect) && cyclic(square) && cyclic(trap), 'a general rhombus is not cyclic; the others are');
    Cx.which([cyclic(rhombus), cyclic(rect), cyclic(trap), cyclic(square)], false);
  });
}
{
  const c = [2, 1], rr = 5, A = polar(c, rr, 10), B = polar(c, rr, 120), C = polar(c, rr, 200), D = polar(c, rr, 300);
  const bis = (p, q) => { const m = mid(p, q); return [m, [m[0] - (q[1] - p[1]), m[1] + (q[0] - p[0])]]; };
  const meet = lineInter(...bis(A, B), ...bis(C, D));
  T('m18', { stem: 'The perpendicular bisectors of two different chords of a circle meet at', opts: ['the centre of the circle', 'the mid-point of the longer chord', 'a point on the circle', 'an end of a diameter'], sol: 'The perpendicular from the centre to a chord passes through the mid-point of the chord, so the perpendicular bisector of every chord passes through the centre. Two such lines meet at the centre.', d: 1, c: 'understanding', t: [2], time: 60 }, (Cx) => {
    Cx.assert(close(meet[0], c[0]) && close(meet[1], c[1]), 'two bisectors meet at the centre');
    Cx.which([close(dist(meet, c), 0), close(dist(meet, mid(A, B)), 0), close(dist(meet, c), rr), false], true);
  });
}
{
  const nearer = 2 * half(13, 5), farther = 2 * half(13, 12);
  T('m19', { stem: r`In a circle of radius $13$ cm, one chord is $5$ cm from the centre and another is $12$ cm from the centre. Their lengths are, in that order,`, opts: [r`$24$ cm and $10$ cm`, r`$10$ cm and $24$ cm`, r`$26$ cm and $10$ cm`, r`$12$ cm and $5$ cm`], sol: r`The chord at $5$ cm has half-length $\sqrt{13^2 - 5^2} = 12$, so it is $24$ cm long. The chord at $12$ cm has half-length $\sqrt{13^2 - 12^2} = 5$, so it is $10$ cm long. The chord nearer the centre is the longer one.`, d: 3, c: 'analysis', t: [2], time: 105 }, (Cx) => {
    Cx.assert(close(nearer, 24) && close(farther, 10) && nearer > farther, 'nearer chord is longer: 24 and 10');
    Cx.which([[nearer, farther], [farther, nearer], [26, 10], [12, 5]], [24, 10]);
  });
}
{
  const A = polar(O, 6, 270), B = polar(O, 6, 330), P = polar(O, 6, 100);
  T('m20', { stem: 'A chord $AB$ of a circle is as long as its radius. A point $P$ lies on the major arc $AB$. Then $\\angle APB$ is', opts: [r`$30^\circ$`, r`$60^\circ$`, r`$120^\circ$`, r`$150^\circ$`], sol: r`If $OA = OB = AB$, triangle $OAB$ is equilateral, so $\angle AOB = 60^\circ$. The angle at $P$ on the major arc is half of it: $\angle APB = 30^\circ$. The value $150^\circ$ would be the angle on the minor arc.`, d: 3, c: 'analysis', t: [3], time: 105 }, (Cx) => {
    Cx.assert(close(dist(A, B), 6) && close(angleAt(O, A, B), 60) && close(angleAt(P, A, B), 30), 'equilateral OAB, rim angle 30');
    Cx.which([Math.round(angleAt(P, A, B)), 60, 120, 150], 30);
  });
}

// =============================================================== assertion-reason
Q('ar1', mk.ar({ a: 'The angle in a semicircle is a right angle.', r: r`The angle at the centre on a diameter is a straight angle of $180^\circ$, and the angle at the circumference is half of the angle at the centre.`, key: 'a', sol: r`A is true. R is also true and it is the proof of A: the arc on one side of a diameter subtends $180^\circ$ at the centre, so it subtends $\dfrac{180^\circ}{2} = 90^\circ$ at any point of the circle on the other side. So R explains A.`, d: 2, c: 'analysis', t: [3] }), (Cx) => {
  Cx.assert([20, 65, 110, 155].every((t) => { const P = polar(O, 4, t); return close(angleAt(P, [-4, 0], [4, 0]), 90) && close(angleAt(O, [-4, 0], [4, 0]), 180); }), 'semicircle angle 90 from centre angle 180');
  Cx.key('a');
});
Q('ar2', mk.ar({ a: 'Angles in the same segment of a circle are equal.', r: 'The opposite angles of a cyclic quadrilateral are supplementary.', key: 'b', sol: 'Both statements are true. But R is about the four angles of a quadrilateral inscribed in a circle, while A follows from the fact that each of the angles is half of the angle at the centre on the same arc. So R is not the explanation of A.', d: 2, c: 'analysis', t: [3] }), (Cx) => {
  const A = polar(O, 4, 250), B = polar(O, 4, 310), q = cycPts([75, 85, 110, 90], 30);
  Cx.assert([40, 80, 120, 160].every((t) => close(angleAt(polar(O, 4, t), A, B), angleAt(polar(O, 4, 90), A, B))) && close(q.angA + q.angC, 180) && close(q.angB + q.angD, 180), 'both statements hold');
  Cx.key('b');
});
Q('ar3', mk.ar({ a: 'The perpendicular from the centre of a circle to a chord bisects the chord.', r: 'The perpendicular from the centre to a chord is always equal to half the length of the chord.', key: 'c', sol: r`A is true: it is a theorem. R is false: in a circle of radius $5$ cm, a chord $8$ cm long is $3$ cm from the centre, and $3$ cm is not half of $8$ cm.`, d: 2, c: 'analysis', t: [2] }), (Cx) => {
  const A = [-4, -3], B = [4, -3], M = [0, -3];
  Cx.assert(close(dist(A, M), dist(M, B)) && close(lineDist(O, A, B), 3) && close(dist(A, B) / 2, 4) && !close(lineDist(O, A, B), dist(A, B) / 2), 'bisected at the foot; distance 3 is not half of 8');
  Cx.key('c');
});
Q('ar4', mk.ar({ a: 'The angle at the centre of a circle is half of the angle at the circumference on the same arc.', r: 'The angle at the centre is double the angle at any point on the remaining part of the circle.', key: 'd', sol: 'A is false: it is the other way round, and the angle at the circumference is half of the angle at the centre. R is true, and it is the correct statement of the theorem.', d: 2, c: 'analysis', t: [3] }), (Cx) => {
  const A = polar(O, 4, 210), B = polar(O, 4, 330), P = polar(O, 4, 80);
  Cx.assert(close(angleAt(O, A, B), 2 * angleAt(P, A, B)) && !close(angleAt(O, A, B), angleAt(P, A, B) / 2), 'centre is double rim');
  Cx.key('d');
});
Q('ar5', mk.ar({ a: r`A quadrilateral $ABCD$ with $\angle A = 70^\circ$, $\angle B = 100^\circ$, $\angle C = 110^\circ$, $\angle D = 80^\circ$ can have all four corners on one circle.`, r: r`Its opposite angles add up to $180^\circ$: $70^\circ + 110^\circ = 180^\circ$ and $100^\circ + 80^\circ = 180^\circ$.`, key: 'a', sol: r`R is true, and by the converse of the cyclic quadrilateral theorem a quadrilateral whose opposite angles are supplementary can be inscribed in a circle. So A is true and R explains A.`, d: 3, c: 'analysis', t: [3] }), (Cx) => {
  const angs = { A: 70, B: 100, C: 110, D: 80 };
  // build the quadrilateral from the arcs: angle A = (BC + CD) / 2 = 70, B = (CD + DA) / 2 = 100, C = (DA + AB) / 2 = 110, D = (AB + BC) / 2 = 80
  const AB = 120, BC = 40, CD = 100, DA = 100, p = cycPts([AB, BC, CD, DA], 10);
  Cx.assert(close(p.angA, 70) && close(p.angB, 100) && close(p.angC, 110) && close(p.angD, 80) && angs.A + angs.C === 180 && angs.B + angs.D === 180, 'the quadrilateral exists on a circle');
  Cx.key('a');
});
Q('ar6', mk.ar({ a: 'A diameter is the longest chord of a circle.', r: 'The nearer a chord is to the centre, the shorter it is.', key: 'c', sol: 'A is true: every chord has length $2\\sqrt{r^2 - d^2} \\le 2r$, with equality when the distance $d$ is $0$. R is false: the nearer chord is the longer one, which is why the diameter, at distance $0$, is the longest.', d: 2, c: 'analysis', t: [2] }), (Cx) => {
  const len = (d) => 2 * half(13, d);
  Cx.assert(len(0) === 26 && [1, 3, 5, 9, 12].every((d) => len(d) < len(0)) && len(5) > len(12), 'diameter longest; nearer is longer');
  Cx.key('c');
});

// =============================================================== true-false
Q('tf1', mk.tf({ stem: 'The diameter is the longest chord of a circle.', key: 't', sol: r`Every chord at distance $d$ from the centre has length $2\sqrt{r^2 - d^2}$, which is largest when $d = 0$, that is, for a chord through the centre. So the diameter, of length $2r$, is the longest chord. The statement is true.`, d: 1, c: 'recall', t: [1] }), (Cx) => {
  const lens = [0, 2, 4, 7, 11].map((d) => 2 * half(12, d));
  Cx.assert(Math.max(...lens) === 24 && lens[0] === 24, 'the diameter is longest');
  Cx.key('t');
});
Q('tf2', mk.tf({ stem: 'Two different circles can pass through the same three points that do not lie on one line.', key: 'f', sol: 'The centre of a circle through the three points must lie on the perpendicular bisectors of the segments joining them, and these lines meet at only one point. So the centre, and then the radius, is fixed and there is only one circle. The statement is false.', d: 1, c: 'understanding', t: [1] }), (Cx) => {
  const t = [[0, 0], [6, 0], [2, 7]], c = circumcentre(...t);
  Cx.assert(c !== null && close(dist(c, t[0]), dist(c, t[1])) && close(dist(c, t[1]), dist(c, t[2])), 'a unique circumcentre');
  Cx.key('f');
});
Q('tf3', mk.tf({ stem: 'An angle in the minor segment of a circle is always an acute angle.', key: 'f', sol: r`A point on the minor arc sees the chord at $180^\circ$ minus half the angle at the centre, and the angle at the centre is less than $180^\circ$ for a minor arc. For example, if the chord subtends $100^\circ$ at the centre, the angle in the minor segment is $180^\circ - 50^\circ = 130^\circ$, which is obtuse. The statement is false.`, d: 2, c: 'understanding', t: [3] }), (Cx) => {
  const A = polar(O, 4, 220), B = polar(O, 4, 320), R = polar(O, 4, 270);
  Cx.assert(close(angleAt(R, A, B), 130) && angleAt(R, A, B) > 90, 'obtuse in the minor segment');
  Cx.key('f');
});

// =============================================================== fill in the blank
Q('fb1', mk.fill({ stem: 'The longest chord of a circle is called its ____.', acc: [['diameter']], sol: 'The chord through the centre is the longest chord, and it is called the diameter. So the blank is diameter.', d: 1, c: 'recall', t: [1] }), (Cx) => { Cx.blank('diameter'); });
{
  const rr = Math.hypot(9, 40);
  Q('fb2', mk.fill({ stem: r`A chord $18$ cm long lies $40$ cm from the centre of a large circular dance floor. The radius of the floor is ____ cm.`, acc: [['41']], sol: r`Half the chord is $9$ cm, so $r^2 = 9^2 + 40^2 = 81 + 1600 = 1681$ and $r = 41$ cm. So the blank is $41$.`, d: 2, c: 'application', t: [2] }), (Cx) => {
    Cx.assert(close(dist(O, [-9, -40]), rr) && close(lineDist(O, [-9, -40], [9, -40]), 40), 'chord 18 at 40');
    Cx.blank(rr);
  });
}
{
  Q('fb3', mk.fill({ stem: r`$PQRS$ is a cyclic quadrilateral and $\angle Q = 66^\circ$. Then $\angle S = $ ____ degrees.`, acc: [['114']], sol: r`The opposite angles of a cyclic quadrilateral are supplementary, so $\angle S = 180^\circ - 66^\circ = 114^\circ$. So the blank is $114$.`, d: 1, c: 'understanding', t: [3] }), (Cx) => {
    // Q = (RS + SP) / 2 = 66 and S = (PQ + QR) / 2 = 114: arcs PQ + QR = 228 and RS + SP = 132
    const c = cycPts([100, 128, 60, 72], 10);
    Cx.assert(close(c.angB, 66) && close(c.angD, 114) && close(c.angB + c.angD, 180), 'Q = 66 gives S = 114');
    Cx.blank(Math.round(c.angD));
  });
}

// =============================================================== match (2 marks)
{
  const right = ['Sector', 'Arc', 'Diameter', 'Segment'], order = [2, 3, 0, 1];
  const expected = ['Diameter', 'Segment', 'Sector', 'Arc'];
  Q('mt1', mk.match({ stem: 'Match each description in Column I with its name in Column II.', left: ['A chord that passes through the centre', 'The region between a chord and the arc it cuts off', 'The region between two radii and the arc they cut off', 'The part of a circle between two of its points'], right, order, sol: 'A chord through the centre is a diameter; a chord and its arc enclose a segment; two radii and an arc enclose a sector; and a part of the circle itself between two points is an arc.', d: 1, c: 'recall', t: [1] }), (Cx) => Cx.assert(expected.every((e, i) => right[order[i]] === e), 'each description matches its name'));
}
{
  const right = [r`$70^\circ$`, r`$68^\circ$`, r`$90^\circ$`, r`$45^\circ$`], order = [3, 2, 0, 1], vals = [70, 68, 90, 45];
  const A = polar(O, 4, 135), B = polar(O, 4, 225), P = polar(O, 4, 0);
  const expected = [90 / 2, angleAt(polar(O, 4, 90), [-4, 0], [4, 0]), 2 * 35, 180 - 112];
  Q('mt2', mk.match({ stem: 'For the circle figure in this question, match each angle described in Column I with its measure in Column II.', left: [r`The angle on the circle (major arc) when the angle at the centre on the same arc is $90^\circ$`, 'The angle in a semicircle', r`The angle at the centre when the angle on the circle on the same arc is $35^\circ$`, r`The angle opposite to an angle of $112^\circ$ in a cyclic quadrilateral`], right, order, sol: r`The angle on the circle is half the angle at the centre: $\dfrac{90}{2} = 45^\circ$. The angle in a semicircle is $90^\circ$. The angle at the centre is double: $2 \times 35 = 70^\circ$. Opposite angles of a cyclic quadrilateral add up to $180^\circ$: $180 - 112 = 68^\circ$.`, d: 2, c: 'application', t: [3] }), (Cx) => {
    Cx.assert(close(angleAt(P, A, B), 45) && close(angleAt(O, A, B), 90), 'figure: 90 at the centre, 45 on the rim');
    Cx.assert(expected.every((v, i) => close(v, vals[order[i]])), 'matches 45, 90, 70, 68');
  });
}

// =============================================================== numerical
{
  const rr = Math.hypot(12, 35);
  Q('n01', mk.num({ stem: r`A circular flower bed in a park in Chandigarh has a straight path $24$ m long cut across it as a chord. The path is $35$ m from the centre of the bed. Find the radius of the bed, in metres.`, value: 37, sol: r`Half the chord is $12$ m, and the perpendicular from the centre meets the chord at its mid-point. So $r^2 = 12^2 + 35^2 = 144 + 1225 = 1369$, and $r = 37$ m.`, scheme: [['Half the chord is 12 m: r squared = 12 squared + 35 squared', 0.5], ['37', 0.5]], d: 2, c: 'application', t: [2], time: 90 }), (Cx) => {
    Cx.assert(close(dist(O, [-12, -35]), rr) && close(lineDist(O, [-12, -35], [12, -35]), 35) && close(dist([-12, -35], [12, -35]), 24), 'chord 24, distance 35');
    Cx.val(rr);
  });
}
{
  const d = 12, rr = 20, len = 2 * half(rr, d);
  Q('n02', mk.num({ stem: r`A circular jali window in Jaipur has radius $20$ cm. A straight bar is fixed along a chord that is $12$ cm from the centre of the window. Find the length of the bar, in centimetres.`, value: 32, sol: r`Half the bar is $\sqrt{20^2 - 12^2} = \sqrt{400 - 144} = \sqrt{256} = 16$ cm, because the perpendicular from the centre bisects the chord. So the bar is $2 \times 16 = 32$ cm long.`, scheme: [['Half the chord = sqrt(20 squared - 12 squared) = 16', 0.5], ['32', 0.5]], d: 2, c: 'application', t: [2], time: 90 }), (Cx) => {
    Cx.assert(close(dist(O, [-16, -d]), rr) && close(dist([-16, -d], [16, -d]), len), 'chord at distance 12 in radius 20');
    Cx.val(len);
  });
}
{
  // chord AB with angle OAB = 25 degrees; C on the major arc
  const A = polar(O, 6, 245), B = polar(O, 6, 15), C = polar(O, 6, 120);
  Q('n03', mk.num({ stem: r`$AB$ is a chord of a circle with centre $O$, and $\angle OAB = 25^\circ$. $C$ is a point on the major arc $AB$. Find $\angle ACB$, in degrees.`, value: 65, sol: r`$OA = OB$ (radii), so $\angle OBA = \angle OAB = 25^\circ$ and $\angle AOB = 180^\circ - 25^\circ - 25^\circ = 130^\circ$. The angle at $C$ is half the angle at the centre: $\angle ACB = \dfrac{130^\circ}{2} = 65^\circ$.`, scheme: [['Angle AOB = 130 from the isosceles triangle OAB', 0.5], ['65', 0.5]], d: 3, c: 'analysis', t: [3], time: 105 }), (Cx) => {
    Cx.assert(close(angleAt(A, O, B), 25) && close(angleAt(O, A, B), 130) && close(angleAt(C, A, B), 65), 'OAB = 25 gives AOB = 130 and ACB = 65');
    Cx.val(angleAt(C, A, B));
  });
}
