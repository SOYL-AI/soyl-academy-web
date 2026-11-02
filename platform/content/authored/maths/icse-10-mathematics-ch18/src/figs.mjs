// Figures for ICSE 10 Mathematics ch18. Every figure is drawn from computed coordinates (tang.mjs); the builders assert
// the geometry the picture shows (right angles at the points of contact, equal tangents, equal distances from the
// circumcentre and from the incentre, hexagon sides and circles), and numeric segment labels are checked against the
// true length by drawL.
import {
  must, near, dist, angDeg, mid, polar, line, at, distLine, foot, O, tangents, concentric, triangle, hexagon, triSSS, triSAS, through,
} from './tang.mjs';
import { drawL } from './loci.mjs';

/** Small scene builder around drawL: points, segments, lines, circles, angles. */
export class Fig {
  constructor(k, o = {}) { Object.assign(this, { k, pts: {}, names: {}, pos: {}, segs: [], circles: [], angles: [], polys: [], o }); }
  pt(n, p, label, pos) { this.pts[n] = p; if (label) this.names[n] = label; if (pos) this.pos[n] = pos; return p; }
  hid(n, p) { this.pts[`_${n}`] = p; return `_${n}`; }
  seg(a, b, label, o) { this.segs.push([a, b, label, o]); }
  circle(c, r, label) { this.circles.push([c, r, label]); }
  ang(at_, from, to, label, o) { this.angles.push([at_, from, to, label, o]); }
  poly(vs, h) { this.polys.push([vs, h]); }
  right(F, P, Q) { this.ang(F, P, Q, undefined, { right: true }); }
  draw(alt, caption) { return drawL({ pts: this.pts, k: this.k, segs: this.segs, circles: this.circles, angles: this.angles, polys: this.polys, pos: this.pos, names: this.names, ...this.o }, alt, caption); }
}

export const fmt = (v) => String(+Number(v).toFixed(6));
const num = (v) => fmt(v); // only for exact values

// ============================================================ tangents from an external point
/** Tangent pair figure; opts: construction (draw the circle on OP and M), contact (right angles), label lengths if exact. */
export function tangentFig(t, { k = 0.55, construction = false, contact = true, lens = null, radii = null, between = null, dOP = true, ticks = true }, alt, caption) {
  const { O: C0, P, M, A, B } = t;
  const f = new Fig(k);
  f.pt('O', C0, 'O', 'w'); f.pt('P', P, 'P', 'e'); f.pt('A', A, 'A', 'n'); f.pt('B', B, 'B', 's');
  if (construction) f.pt('M', M, 'M', 's');
  f.circle('O', t.r);
  if (construction) f.circle('M', t.d / 2);
  f.seg('P', 'A', lens ? num(lens) : undefined, ticks ? { ticks: 1 } : {}); f.seg('P', 'B', lens ? num(lens) : undefined, ticks ? { ticks: 1 } : {});
  f.seg('O', 'A', radii ? num(radii) : undefined, { dashed: true }); f.seg('O', 'B', radii ? num(radii) : undefined, { dashed: true });
  f.seg('O', 'P', dOP ? num(t.d) : undefined, { dashed: true });
  if (contact) { f.right('A', 'O', 'P'); f.right('B', 'O', 'P'); }
  if (between !== null) f.ang('P', 'A', 'B', `$${between}^\\circ$`);
  return f.draw(alt, caption);
}
const T35 = tangents(3, 5), T26 = tangents(2.5, 6.5), T36 = tangents(3, 6);
must(near(T35.len, 4) && near(T26.len, 6) && near(T36.between, 60), 'tangent figure values');
export const fTitle = tangentFig(T35, { lens: 4, radii: 3, ticks: true }, 'A circle with centre O and radius 3 centimetres. P is a point outside the circle with OP equal to 5 centimetres. Two tangents PA and PB touch the circle at A and B; each is 4 centimetres long and carries one tick. The radii OA and OB are dashed and meet the tangents at right angles.', 'Two tangents from $P$ to a circle of radius $3$ cm: $PA = PB = 4$ cm. Lengths in cm.');
export const fTwo = tangentFig(T26, { k: 0.5, lens: 6, radii: 2.5 }, 'A circle with centre O and radius 2.5 centimetres, and an outside point P with OP equal to 6.5 centimetres. The tangents PA and PB are each 6 centimetres long, with one tick each, and meet the radii OA and OB at right angles.', 'From the external point $P$: $PA = PB = 6$ cm and $OA \\perp PA$, $OB \\perp PB$. Lengths in cm.');
export const fBuild = tangentFig(T35, { k: 0.6, construction: true, contact: false, ticks: false, lens: null, radii: null, dOP: true }, 'Construction of the tangents from P to the circle with centre O and radius 3 centimetres, with OP equal to 5 centimetres. M is the mid-point of OP. The circle with centre M and radius 2.5 centimetres, drawn on OP as diameter, cuts the given circle at A and B. Joining PA and PB gives the two tangents.', 'Steps: bisect $OP$ at $M$; draw the circle with diameter $OP$; it cuts the circle at $A$ and $B$; join $PA$ and $PB$.');
export const fWhy = (() => {
  const t = T35, f = new Fig(0.6);
  f.pt('O', t.O, 'O', 'w'); f.pt('P', t.P, 'P', 'e'); f.pt('A', t.A, 'A', 'n'); f.pt('M', t.M, 'M', 's');
  f.circle('O', t.r); f.circle('M', t.d / 2);
  f.seg('O', 'P', '5', { dashed: true }); f.seg('M', 'A', '2.5', { dashed: true }); f.seg('P', 'A'); f.seg('O', 'A', '3');
  f.right('A', 'O', 'P');
  must(near(dist(t.M, t.A), 2.5) && near(dist(t.M, t.O), 2.5) && near(dist(t.M, t.P), 2.5), 'M is the centre of the circle through O, A, P');
  return f.draw('A circle with diameter OP of length 5 centimetres and centre M; A is a point on it and also on the given circle of radius 3 centimetres. The angle OAP is drawn as a right angle, because it is an angle in a semicircle. MA, MO and MP are each 2.5 centimetres.', 'Why it works: $A$ is on the circle with diameter $OP$, so $\\angle OAP = 90^\\circ$ (angle in a semicircle) and $PA$ touches the circle at $A$. Lengths in cm.');
})();
export const fWE3 = (() => {
  const t = T36, f = new Fig(0.5);
  f.pt('O', t.O, 'O', 'w'); f.pt('P', t.P, 'P', 'e'); f.pt('A', t.A, 'A', 'n'); f.pt('B', t.B, 'B', 's');
  f.circle('O', t.r);
  f.seg('P', 'A', undefined, { ticks: 1 }); f.seg('P', 'B', undefined, { ticks: 1 }); f.seg('O', 'A', '3', { dashed: true }); f.seg('O', 'B', '3', { dashed: true }); f.seg('O', 'P', '6', { dashed: true });
  f.right('A', 'O', 'P'); f.right('B', 'O', 'P'); f.ang('P', 'A', 'B', '$60^\\circ$');
  return f.draw('A circle with centre O and radius 3 centimetres. P is 6 centimetres from O. The two tangents PA and PB from P include an angle of 60 degrees at P. The radii OA and OB are dashed and meet the tangents at right angles.', 'Tangents inclined at $60^\\circ$ to a circle of radius $3$ cm: $OP = 6$ cm. Lengths in cm.');
})();
// a tangent at a point of the circle
export const fTouch = (() => {
  const r = 2.5, f = new Fig(0.7), Tp = polar(O, r, 50), L = { p: Tp, d: [-Math.sin((50 * Math.PI) / 180), Math.cos((50 * Math.PI) / 180)] };
  const E1 = at(L, -2.4), E2 = at(L, 2.2), Q = at(L, 1.4);
  must(near(distLine(O, L), r) && near(angDeg(Tp, O, E1), 90) && near(angDeg(Tp, O, E2), 90), 'the tangent is r from O and perpendicular to OT');
  must(dist(O, Q) > r && dist(O, E1) > r && dist(O, E2) > r, 'every other point of the tangent is outside the circle');
  f.pt('O', O, 'O', 'sw'); f.pt('T', Tp, 'T', 'ne'); f.pt('Q', Q, 'Q', 'n'); f.pt('E1', E1); f.pt('E2', E2);
  f.circle('O', r); f.seg('E1', 'E2'); f.seg('O', 'T', '2.5', { dashed: true }); f.seg('O', 'Q', undefined, { dashed: true });
  f.right('T', 'O', 'Q');
  return f.draw('A circle with centre O and radius 2.5 centimetres. A straight line touches the circle at T and is perpendicular to the radius OT. A point Q on the line, other than T, is joined to O by a dashed segment that is longer than the radius, so Q is outside the circle.', 'A tangent touches the circle at one point $T$ and is perpendicular to the radius $OT$; every other point of it is outside. Length in cm.');
})();
// concentric circles
const CC = concentric(5, 3);
must(near(CC.chord, 8), 'concentric: chord 8');
export const fConc = (() => {
  const c = CC, f = new Fig(0.55);
  f.pt('O', O, 'O', 's'); f.pt('P', c.P, 'P', 'nw'); f.pt('Q', c.Q, 'Q', 'ne'); f.pt('T', c.T, 'T', 'n');
  f.circle('O', c.R); f.circle('O', c.r);
  f.seg('P', 'Q', '8'); f.seg('O', 'T', '3', { dashed: true }); f.seg('O', 'P', '5', { dashed: true });
  f.right('T', 'O', 'Q');
  return f.draw('Two concentric circles with centre O, of radii 5 and 3 centimetres. A chord PQ of the larger circle touches the smaller circle at T. The radius OT of 3 centimetres is perpendicular to PQ, OP is 5 centimetres, and the chord PQ is 8 centimetres long.', 'A chord of the larger circle that touches the smaller one: $OT \\perp PQ$, so $T$ bisects $PQ$ and $PQ = 8$. Lengths in cm.');
})();

// ============================================================ triangles
const TRI = (a, b, c) => triangle(triSSS(a, b, c));
export const tri1 = TRI(6.5, 7, 7.5); // R = 4.0625, r = 2
export const triEq = triangle(triSSS(6, 6, 6));
export const triRt = TRI(10, 8, 6); // right angle at A
export const triObt = TRI(8, 5, 4); // obtuse at A
export const triSAS1 = triangle(triSAS(7, 5, 60)); // BC = 7, AB = 5, angle B = 60
const placeLabels = { A: 'n', B: 'sw', C: 'se' };

export function circFig(t, { k = 0.55, lens = null, sidesLab = null, rLab = undefined, ticks = true }, alt, caption) {
  const f = new Fig(k);
  const { A, B, C, S } = t;
  f.pt('A', A, 'A', placeLabels.A); f.pt('B', B, 'B', placeLabels.B); f.pt('C', C, 'C', placeLabels.C); f.pt('O', S, 'O', 'ne');
  const mids = { D: mid(B, C), E: mid(C, A), F: mid(A, B) };
  const on = (n) => dist(S, mids[n]) < 1e-9; // right triangle: the circumcentre is the mid-point of the hypotenuse
  const lp = { D: 's', E: 'ne', F: 'nw' };
  for (const n of ['D', 'E', 'F']) f.pt(n, mids[n], on(n) ? undefined : n, lp[n]);
  f.circle('O', t.R);
  f.poly(['A', 'B', 'C']);
  const sl = sidesLab ?? {};
  f.seg('B', 'C', sl.a); f.seg('C', 'A', sl.b); f.seg('A', 'B', sl.c);
  for (const [n, q] of [['D', 'C'], ['E', 'A'], ['F', 'B']]) {
    if (on(n)) continue;
    f.seg('O', n, undefined, { dashed: true });
    must(near(angDeg(mids[n], S, t[q]), 90, 1e-9), `O${n} is perpendicular to the side`);
    f.right(n, 'O', q);
  }
  if (ticks) { f.seg('O', 'A', rLab, { dashed: true, ticks: 1 }); f.seg('O', 'B', undefined, { dashed: true, ticks: 1 }); f.seg('O', 'C', undefined, { dashed: true, ticks: 1 }); }
  return f.draw(alt, caption);
}
export const fCirc1 = circFig(tri1, { k: 0.62, sidesLab: { a: '6.5', b: '7', c: '7.5' } }, 'Triangle ABC with BC 6.5, CA 7 and AB 7.5 centimetres. The perpendicular bisectors of the sides meet at the circumcentre O inside the triangle. D, E and F are the mid-points of the sides. OA, OB and OC are dashed and carry one tick each because they are equal; the circle through A, B and C has centre O.', 'Circumcircle: the perpendicular bisectors of the sides meet at $O$, and $OA = OB = OC$. Lengths in cm.');
export const fCircRt = circFig(triRt, { k: 0.6, sidesLab: { a: '10', b: '8', c: '6' } }, 'A right-angled triangle ABC with the right angle at A, BC 10, CA 8 and AB 6 centimetres. The circumcentre O is the mid-point of the hypotenuse BC, so the circumcircle has BC as a diameter and radius 5 centimetres.', 'Right triangle: the circumcentre is the mid-point of the hypotenuse, $R = \\dfrac{10}{2} = 5$. Lengths in cm.');
export const fCircObt = circFig(triObt, { k: 0.6, sidesLab: { a: '8', b: '5', c: '4' } }, 'An obtuse triangle ABC with BC 8, CA 5 and AB 4 centimetres, obtuse at A. The perpendicular bisectors of the sides meet at the circumcentre O, which lies outside the triangle, on the opposite side of BC from A. The circle through A, B and C has centre O.', 'Obtuse triangle: the circumcentre $O$ lies outside the triangle. Lengths in cm.');
export const fCircEq = circFig(triEq, { k: 0.7, sidesLab: { a: '6', b: '6', c: '6' } }, 'An equilateral triangle ABC of side 6 centimetres. The perpendicular bisectors of the sides meet at the centre O, which is also where the angle bisectors meet. The circumcircle passes through A, B and C.', 'Equilateral triangle: the perpendicular bisectors meet at the centre $O$. Lengths in cm.');
export const fCircSAS = circFig(triSAS1, { k: 0.62, sidesLab: { a: '7', b: undefined, c: '5' } }, 'Triangle ABC with BC 7 centimetres, AB 5 centimetres and angle B equal to 60 degrees. The perpendicular bisectors of the sides meet at O inside the triangle and the circle with centre O passes through A, B and C.', 'Triangle with $BC = 7$, $AB = 5$, $\\angle B = 60^\\circ$ and its circumcircle. Lengths in cm.');

export function inFig(t, { k = 0.55, sidesLab = null, rLab = true, touchLens = false }, alt, caption) {
  const f = new Fig(k);
  const { A, B, C, I } = t;
  f.pt('A', A, 'A', placeLabels.A); f.pt('B', B, 'B', placeLabels.B); f.pt('C', C, 'C', placeLabels.C); f.pt('I', I, 'I', 'n');
  f.pt('D', t.D, 'D', 's'); f.pt('E', t.E, 'E', 'ne'); f.pt('F', t.F, 'F', 'nw');
  f.circle('I', t.r);
  f.poly(['A', 'B', 'C']);
  const sl = sidesLab ?? {};
  f.seg('B', 'C', sl.a); f.seg('C', 'A', sl.b); f.seg('A', 'B', sl.c);
  for (const v of ['A', 'B', 'C']) f.seg(v, 'I', undefined, { dashed: true });
  const lab = rLab ? fmt(t.r) : undefined;
  if (rLab) must(near(t.r, Number(lab), 1e-9), 'the radius label is exact');
  f.seg('I', 'D', lab, { dashed: true }); f.seg('I', 'E', lab, { dashed: true }); f.seg('I', 'F', lab, { dashed: true });
  f.right('D', 'I', 'B'); f.right('E', 'I', 'C'); f.right('F', 'I', 'A');
  void touchLens;
  return f.draw(alt, caption);
}
export const fIn1 = inFig(tri1, { k: 0.62, sidesLab: { a: '6.5', b: '7', c: '7.5' } }, 'Triangle ABC with BC 6.5, CA 7 and AB 7.5 centimetres. The dashed bisectors of the three angles meet at the incentre I, inside the triangle. The circle with centre I touches the sides at D on BC, E on CA and F on AB; each radius ID, IE, IF is 2 centimetres and is perpendicular to its side.', 'Incircle: the angle bisectors meet at $I$; $ID = IE = IF = 2$ cm and each radius is perpendicular to its side. Lengths in cm.');
export const fInRt = inFig(triRt, { k: 0.6, sidesLab: { a: '10', b: '8', c: '6' } }, 'A right-angled triangle ABC with the right angle at A, BC 10, CA 8 and AB 6 centimetres. The incircle has centre I at the meeting point of the angle bisectors and radius 2 centimetres, and touches the sides at D, E and F.', 'Right triangle $6$-$8$-$10$: incircle radius $\\dfrac{6 + 8 - 10}{2} = 2$. Lengths in cm.');
export const fInEq = inFig(triEq, { k: 0.7, sidesLab: { a: '6', b: '6', c: '6' }, rLab: false }, 'An equilateral triangle ABC of side 6 centimetres with its incircle. The centre I is where the angle bisectors meet, and the circle touches each side at its mid-point D, E or F.', 'Equilateral triangle: the incircle touches each side at its mid-point. Lengths in cm.');

// angle-bisector construction picture: arcs and bisector from one vertex
export const fBisect = (() => {
  const t = tri1, f = new Fig(0.62);
  f.pt('A', t.A, 'A', 'n'); f.pt('B', t.B, 'B', 'sw'); f.pt('C', t.C, 'C', 'se'); f.pt('I', t.I, 'I', 'n');
  f.poly(['A', 'B', 'C']);
  f.seg('B', 'C', '6.5'); f.seg('C', 'A', '7'); f.seg('A', 'B', '7.5');
  f.seg('A', 'I', undefined, { dashed: true }); f.seg('B', 'I', undefined, { dashed: true }); f.seg('C', 'I', undefined, { dashed: true });
  must(near(angDeg(t.B, t.C, t.I), angDeg(t.B, t.I, t.A), 1e-9) && near(angDeg(t.C, t.B, t.I), angDeg(t.C, t.I, t.A), 1e-9), 'the bisectors halve angles B and C');
  f.ang('B', 'C', 'I', undefined, { arcs: 1 }); f.ang('B', 'I', 'A', undefined, { arcs: 1 });
  f.ang('C', 'B', 'I', undefined, { arcs: 2 }); f.ang('C', 'I', 'A', undefined, { arcs: 2 });
  return f.draw('Triangle ABC with BC 6.5, CA 7 and AB 7.5 centimetres. The dashed bisectors of angles B and C meet at the incentre I. The two halves of angle B carry one arc each and the two halves of angle C carry two arcs each, showing that each angle is cut into two equal parts.', 'The bisectors of $\\angle B$ and $\\angle C$ meet at $I$; each angle is cut into two equal parts. Lengths in cm.');
})();

// ============================================================ hexagon
export const hx4 = hexagon(4), hx35 = hexagon(3.5);
export function hexFig(h, { k = 0.6, build = false, aLab = true }, alt, caption) {
  const f = new Fig(k), names = Object.keys(h.V);
  const lab = { A: 'e', B: 'ne', C: 'nw', D: 'w', E: 'sw', F: 'se' };
  f.pt('O', O, 'O', 'n');
  names.forEach((n) => f.pt(n, h.V[n], n, lab[n]));
  f.circle('O', h.R);
  const mAB = h.mids.MAB;
  if (!build) { f.circle('O', h.ap); f.pt('M', mAB, 'M', 'ne'); }
  names.forEach((n, i) => f.seg(n, names[(i + 1) % 6], aLab ? fmt(h.a) : undefined));
  f.poly(names);
  if (!build) { f.seg('O', 'M', undefined, { dashed: true }); f.right('M', 'O', 'B'); f.seg('O', 'A', fmt(h.a), { dashed: true }); }
  else { f.seg('O', 'A', undefined, { dashed: true }); f.seg('O', 'D', undefined, { dashed: true }); f.circle('A', h.a); }
  return f.draw(alt, caption);
}
export const fHex4 = hexFig(hx4, { k: 0.6 }, 'A regular hexagon ABCDEF with side 4 centimetres and centre O. The circumcircle passes through all six vertices and has radius OA equal to 4 centimetres. The incircle touches each side at its mid-point, for example M on AB, where OM is perpendicular to AB; its radius OM is about 3.5 centimetres.', 'Regular hexagon of side $4$ cm: circumradius $R = 4$ cm, inradius $OM \\approx 3.5$ cm. Lengths in cm.');
export const fHexBuild = hexFig(hx35, { k: 0.62, build: true }, 'Construction of a regular hexagon in a circle of radius 3.5 centimetres with centre O. A circle with centre A and the same radius passes through O, and the six equal chords of 3.5 centimetres step round the circle from A to F. The dashed lines OA and OD form a diameter.', 'Stepping the radius $3.5$ cm round the circle gives six equal chords: a regular hexagon. Lengths in cm.');
// the six equilateral triangles
export const fHexTri = (() => {
  const h = hx4, f = new Fig(0.6), names = Object.keys(h.V);
  f.pt('O', O, 'O', 'n'); names.forEach((n) => f.pt(n, h.V[n], n, { A: 'e', B: 'ne', C: 'nw', D: 'w', E: 'sw', F: 'se' }[n]));
  names.forEach((n, i) => { f.seg(n, names[(i + 1) % 6], '4'); f.seg('O', n, '4', { dashed: true }); });
  f.poly(names);
  names.forEach((n, i) => f.ang('O', n, names[(i + 1) % 6], '$60^\\circ$'));
  return f.draw('A regular hexagon ABCDEF of side 4 centimetres with centre O. The segments joining O to the six vertices are each 4 centimetres and cut the hexagon into six equilateral triangles; each angle at O is 60 degrees.', 'A regular hexagon is six equilateral triangles: $OA = OB = \\dots = 4$ and each angle at $O$ is $60^\\circ$. Lengths in cm.');
})();

/** Circumcircle (centre O, perpendicular bisectors to D, E, F) and incircle (centre I, touching at X, Y, Z) together. */
export function bothFig(t, { k = 0.55, sidesLab = {}, exact = false }, alt, caption) {
  const f = new Fig(k), { A, B, C } = t;
  f.pt('A', A, 'A', placeLabels.A); f.pt('B', B, 'B', placeLabels.B); f.pt('C', C, 'C', placeLabels.C);
  f.pt('O', t.S, 'O', 'nw'); f.pt('I', t.I, 'I', 'se');
  const mm = { D: mid(B, C), E: mid(C, A), F: mid(A, B) }, lq = { D: 's', E: 'ne', F: 'nw' };
  for (const n of ['D', 'E', 'F']) f.pt(n, mm[n], dist(t.S, mm[n]) < 1e-9 ? undefined : n, lq[n]);
  f.pt('X', t.D, 'X', 's'); f.pt('Y', t.E, 'Y', 'n'); f.pt('Z', t.F, 'Z', 'w');
  f.circle('O', t.R); f.circle('I', t.r); f.poly(['A', 'B', 'C']);
  f.seg('B', 'C', sidesLab.a); f.seg('C', 'A', sidesLab.b); f.seg('A', 'B', sidesLab.c);
  for (const n of ['D', 'E', 'F']) if (dist(t.S, mm[n]) > 1e-9) f.seg('O', n, undefined, { dashed: true });
  for (const v of ['A', 'B', 'C']) f.seg(v, 'I', undefined, { dashed: true });
  f.seg('I', 'X', exact ? fmt(t.r) : undefined, { dashed: true }); f.seg('I', 'Y', undefined, { dashed: true }); f.seg('I', 'Z', undefined, { dashed: true });
  f.right('X', 'I', 'B'); f.right('Y', 'I', 'C'); f.right('Z', 'I', 'A');
  return f.draw(alt, caption);
}

void through; void foot; void line; void tangents;
