// CBSE 9 Mathematics ch11 Circles: further recall and understanding items, and one hard item (bank only, none is on a check slide).
// The mix was widened here, not retagged, so that application or higher stays inside the 45-65% band.
import { Q, mk } from './lib.mjs';
import { r, close, dist, polar, angleAt, lineDist } from './h.mjs';
import { cycPts, O } from './figs.mjs';

const T = (k, o, chk) => Q(k, mk.mcq({ stem: o.stem, opts: o.opts, key: 'a', sol: o.sol, d: o.d, c: o.c, t: o.t, time: o.time ?? 75, assets: o.assets }), chk);
const half = (rr, d) => Math.sqrt(rr * rr - d * d);

{
  const A = [-4, 0], B = [4, 0];
  T('m21', { stem: 'The angle in a semicircle is', opts: ['a right angle', 'an acute angle', 'an obtuse angle', 'a straight angle'], sol: r`A diameter subtends a straight angle of $180^\circ$ at the centre, so it subtends half of it, $90^\circ$, at every point of the circle. So the angle in a semicircle is a right angle.`, d: 1, c: 'recall', t: [3], time: 45 }, (Cx) => {
    const kind = (a) => (Math.abs(a - 90) < 1e-9 ? 'right' : a < 90 ? 'acute' : a < 180 ? 'obtuse' : 'straight');
    Cx.assert([15, 50, 90, 130, 165].every((t) => kind(angleAt(polar(O, 4, t), A, B)) === 'right'), 'every point sees the diameter at 90');
    Cx.which(['right', 'acute', 'obtuse', 'straight'], kind(angleAt(polar(O, 4, 50), A, B)));
  });
}
{
  const A = [-4, -3], B = [4, -3], M = [0, -3];
  T('m22', { stem: 'The line drawn from the centre of a circle perpendicular to a chord', opts: ['bisects the chord', 'is as long as the chord', 'is parallel to the chord', 'is a diameter of the circle'], sol: 'The two right triangles formed by the perpendicular and the radii to the ends of the chord are congruent, so the perpendicular meets the chord at its mid-point: it bisects the chord. It is perpendicular (not parallel) to the chord, it is shorter than the chord, and it is a part of a radius, not a diameter.', d: 1, c: 'recall', t: [2], time: 60 }, (Cx) => {
    Cx.assert(close(lineDist(O, A, B), 3) && close(dist(A, M), dist(M, B)), 'foot is the mid-point');
    Cx.which([close(dist(A, M), dist(M, B)), close(dist(O, M), dist(A, B)), false, close(dist(O, M), 8)], true);
  });
}
{
  const long = 2 * half(13, 5), short = 2 * half(13, 12);
  T('m23', { stem: r`In a circle of radius $13$ cm there are two parallel chords, of lengths $24$ cm and $10$ cm. The distance between the two chords is`, opts: [r`$7$ cm or $17$ cm`, r`$17$ cm only`, r`$7$ cm only`, r`$13$ cm`], sol: r`The $24$ cm chord is $\sqrt{13^2 - 12^2} = 5$ cm from the centre, and the $10$ cm chord is $\sqrt{13^2 - 5^2} = 12$ cm from the centre. If the chords are on opposite sides of the centre, the distance between them is $5 + 12 = 17$ cm; if they are on the same side, it is $12 - 5 = 7$ cm. Both are possible, so the answer is $7$ cm or $17$ cm.`, d: 4, c: 'analysis', t: [2], time: 120 }, (Cx) => {
    const d1 = lineDist(O, [-12, -5], [12, -5]), d2 = lineDist(O, [-5, -12], [5, -12]);
    Cx.assert(close(long, 24) && close(short, 10) && close(d1, 5) && close(d2, 12) && close(dist(O, [-12, -5]), 13) && close(dist(O, [-5, -12]), 13), 'distances 5 and 12');
    Cx.which([[d1 + d2, d2 - d1], [d1 + d2], [d2 - d1], [13]], [17, 7]);
  });
}
Q('tf4', mk.tf({ stem: r`The opposite angles of every quadrilateral add up to $180^\circ$.`, key: 'f', sol: r`This holds only for cyclic quadrilaterals. For example, a parallelogram with angles $60^\circ$ and $120^\circ$ has opposite angles $60^\circ$ and $60^\circ$, which add up to $120^\circ$, not $180^\circ$. The statement is false.`, d: 1, c: 'understanding', t: [3] }), (Cx) => {
  const P = [[0, 0], [6, 0], [9, 3 * Math.sqrt(3)], [3, 3 * Math.sqrt(3)]], at = (i) => angleAt(P[i], P[(i + 3) % 4], P[(i + 1) % 4]);
  Cx.assert(close(at(0), 60) && close(at(1), 120) && !close(at(0) + at(2), 180) && close(at(0) + at(1), 180), 'a parallelogram that is not cyclic');
  Cx.key('f');
});
Q('tf5', mk.tf({ stem: r`If the opposite angles of a quadrilateral add up to $180^\circ$, a circle can be drawn through its four corners.`, key: 't', sol: 'This is the converse of the cyclic quadrilateral theorem, and it is true: a quadrilateral whose opposite angles are supplementary is cyclic. The statement is true.', d: 1, c: 'recall', t: [3] }), (Cx) => {
  const q = cycPts([110, 60, 80, 110], 5);
  Cx.assert(close(q.angA + q.angC, 180) && close(q.angB + q.angD, 180), 'such a quadrilateral exists on a circle');
  Cx.key('t');
});
Q('fb4', mk.fill({ stem: 'The angle subtended by an arc at the centre of a circle is ____ the angle it subtends at a point of the remaining part of the circle.', acc: [['double', 'twice']], sol: 'The angle at the centre is double (twice) the angle at the circumference. So the blank is double.', d: 1, c: 'recall', t: [3] }), (Cx) => {
  const A = polar(O, 4, 200), B = polar(O, 4, 340), P = polar(O, 4, 90);
  Cx.assert(close(angleAt(O, A, B), 2 * angleAt(P, A, B)), 'double');
  Cx.blank('double');
});
Q('fb5', mk.fill({ stem: 'A quadrilateral whose four corners all lie on a circle is called a ____ quadrilateral.', acc: [['cyclic']], sol: 'A quadrilateral inscribed in a circle is called a cyclic quadrilateral. So the blank is cyclic.', d: 1, c: 'recall', t: [3] }), (Cx) => { Cx.blank('cyclic'); });
Q('s208', mk.short({ marks: 2, stem: 'State the theorem on the opposite angles of a cyclic quadrilateral, and state its converse.', model: r`**Theorem:** the opposite angles of a cyclic quadrilateral add up to $180^\circ$.\n\n**Converse:** if the opposite angles of a quadrilateral add up to $180^\circ$, the quadrilateral is cyclic, that is, a circle passes through its four corners.`, sol: 'Theorem: opposite angles are supplementary. Converse: supplementary opposite angles mean the quadrilateral is cyclic.', scheme: [['Theorem stated: opposite angles add up to 180 degrees', 1], ['Converse stated correctly', 1]], d: 1, c: 'understanding', t: [3], time: 90 }), (Cx) => {
  const q = cycPts([80, 90, 70, 120], 25);
  Cx.assert(close(q.angA + q.angC, 180) && close(q.angB + q.angD, 180), 'supplementary opposite angles on a circle');
  Cx.model([180]);
});
