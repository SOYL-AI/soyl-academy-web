// Constructions for ICSE 10 Mathematics ch18 (tangents from an external point, circumcircle and incircle of a
// triangle, regular hexagon with its circles). Every constructed point is computed as an exact (floating point,
// 1e-9) intersection of the loci a student draws with a ruler and compasses, the geometric facts are ASSERTED here
// (right angles at the points of contact, equal tangents, equal distances from the circumcentre, equal distances
// from the incentre to the sides, the hexagon's sides and circles) and the values a student would measure are
// computed and rounded to the precision of a drawing (0.1 cm, nearest degree) by the callers.
import { must, near, dist, angDeg, r1, r2, deg, vec, mid, unit, polar, line, through, at, distLine, foot, perpBis, bisector, intLL, intLC, intCC, triSSS, triSAS } from './loci.mjs';

export { must, near, dist, angDeg, r1, r2, deg, vec, mid, polar, line, through, at, distLine, foot, perpBis, bisector, intLL, intLC, intCC, triSSS, triSAS };
export const rad = (d) => (d * Math.PI) / 180;
export const sinD = (d) => Math.sin(rad(d));
export const cosD = (d) => Math.cos(rad(d));
export const asinD = (v) => deg(Math.asin(v));
export const acosD = (v) => deg(Math.acos(v));
/** Round a measured angle to the nearest degree. */
export const rd = (v) => Math.round(v + 1e-9);
export const O = [0, 0];

/**
 * Tangents from P to the circle (centre O, radius r) with OP = d: the circle on OP as diameter (centre M) cuts the
 * given circle at the points of contact A (above OP) and B (below OP).
 */
export function tangents(r, d) {
  must(d > r, 'P must be outside the circle');
  const P = [d, 0], M = [d / 2, 0];
  const pts = intCC(O, r, M, d / 2);
  must(pts.length === 2, 'the circle on OP as diameter cuts the circle at two points');
  const [A, B] = pts[0][1] > 0 ? pts : [pts[1], pts[0]];
  must(A[1] > 0 && B[1] < 0, 'A above, B below');
  [A, B].forEach((T, i) => {
    must(near(dist(O, T), r, 1e-9), `contact point ${i} is on the circle`);
    must(near(dist(M, T), d / 2, 1e-9), `contact point ${i} is on the circle with diameter OP`);
    must(near(angDeg(T, O, P), 90, 1e-9), `angle OTP is a right angle at contact point ${i}`);
  });
  const len = Math.sqrt(d * d - r * r);
  must(near(dist(P, A), len, 1e-9) && near(dist(P, B), len, 1e-9), 'PA = PB = sqrt(d squared minus r squared)');
  const between = angDeg(P, A, B), angAPO = angDeg(P, A, O), angAOB = angDeg(O, A, B), angAOP = angDeg(O, A, P);
  must(near(between, 2 * asinD(r / d), 1e-9) && near(angAPO, asinD(r / d), 1e-9), 'angle between the tangents is 2 asin(r/d)');
  must(near(angAOB + between, 180, 1e-9) && near(angAOP, acosD(r / d), 1e-9), 'angle AOB + angle APB = 180');
  return { r, d, O, P, M, A, B, len, between, angAPO, angAOB, angAOP, kite: 2 * (0.5 * r * len) };
}

/** A chord of the outer circle (radius R) that touches the inner concentric circle (radius r). */
export function concentric(R, r) {
  must(R > r, 'R > r');
  const T = [0, r], L = line(T, [1, 0]);
  const ends = intLC(L, O, R);
  must(ends.length === 2 && near(distLine(O, L), r, 1e-9), 'the chord is r from the centre');
  must(near(angDeg(T, O, ends[0]), 90, 1e-9), 'OT is perpendicular to the chord');
  must(near(dist(T, ends[0]), dist(T, ends[1]), 1e-9), 'T is the mid-point of the chord');
  const half = Math.sqrt(R * R - r * r);
  must(near(dist(ends[0], ends[1]), 2 * half, 1e-9), 'chord = 2 sqrt(R^2 - r^2)');
  return { R, r, T, P: ends[0], Q: ends[1], half, chord: 2 * half };
}

const crs = (a, b) => a[0] * b[1] - a[1] * b[0];
/** Triangle with every construction point: circumcentre S (perpendicular bisectors), incentre I (angle bisectors). */
export function triangle(T) {
  const { A, B, C } = T;
  const a = dist(B, C), b = dist(C, A), c = dist(A, B);
  const K = Math.abs(crs(vec(A, B), vec(A, C))) / 2, s = (a + b + c) / 2;
  const S = intLL(perpBis(A, B), perpBis(B, C));
  const R = dist(S, A);
  must(near(dist(S, B), R, 1e-9) && near(dist(S, C), R, 1e-9), 'circumcentre is equidistant from the three vertices');
  must(near(R, (a * b * c) / (4 * K), 1e-9), 'R = abc / (4 area)');
  const I = [(a * A[0] + b * B[0] + c * C[0]) / (2 * s), (a * A[1] + b * B[1] + c * C[1]) / (2 * s)];
  const bA = bisector(A, B, C), bB = bisector(B, C, A), bC = bisector(C, A, B);
  must(dist(intLL(bA, bB), I) < 1e-9 && dist(intLL(bB, bC), I) < 1e-9, 'the three angle bisectors meet at the incentre');
  const sides = { BC: through(B, C), CA: through(C, A), AB: through(A, B) };
  const r = K / s;
  Object.entries(sides).forEach(([n, L]) => must(near(distLine(I, L), r, 1e-9), `incentre is r from side ${n}`));
  const D = foot(I, sides.BC), E = foot(I, sides.CA), F = foot(I, sides.AB);
  must(near(angDeg(D, I, B), 90, 1e-9) && near(angDeg(E, I, C), 90, 1e-9) && near(angDeg(F, I, A), 90, 1e-9), 'radii to the points of contact are perpendicular to the sides');
  must(near(dist(A, F), s - a, 1e-9) && near(dist(A, E), s - a, 1e-9) && near(dist(B, D), s - b, 1e-9) && near(dist(C, D), s - c, 1e-9), 'tangent lengths from the vertices are s - a, s - b, s - c');
  const angles = { A: angDeg(A, B, C), B: angDeg(B, C, A), C: angDeg(C, A, B) };
  must(near(angles.A + angles.B + angles.C, 180, 1e-9), 'angles sum to 180');
  const rightAt = Object.entries(angles).find(([, v]) => near(v, 90, 1e-9))?.[0] ?? null;
  const obtuse = Object.values(angles).some((v) => v > 90 + 1e-9);
  const inside = (() => { const sg = [crs(vec(A, B), vec(A, S)), crs(vec(B, C), vec(B, S)), crs(vec(C, A), vec(C, S))]; return sg.every((v) => v > 1e-9) || sg.every((v) => v < -1e-9); })();
  if (rightAt) { const h = { A: [B, C], B: [C, A], C: [A, B] }[rightAt]; must(dist(S, mid(h[0], h[1])) < 1e-9, 'right triangle: the circumcentre is the mid-point of the hypotenuse'); }
  must(obtuse ? !inside : rightAt ? !inside : inside, 'circumcentre inside (acute), on the hypotenuse (right) or outside (obtuse)');
  must(dist(I, S) ** 2 - (R * R - 2 * R * r) < 1e-9 && Math.abs(dist(I, S) ** 2 - (R * R - 2 * R * r)) < 1e-9, "Euler: OI^2 = R^2 - 2Rr");
  return { ...T, a, b, c, K, s, S, R, I, r, D, E, F, sides, angles, rightAt, obtuse, inside, bA, bB, bC };
}

/** Regular hexagon ABCDEF with side a and centre O: circumcircle radius a, incircle radius a sqrt(3) / 2. */
export function hexagon(a) {
  const names = ['A', 'B', 'C', 'D', 'E', 'F'];
  const V = Object.fromEntries(names.map((n, i) => [n, polar(O, a, 60 * i)]));
  names.forEach((n, i) => {
    const m = names[(i + 1) % 6];
    must(near(dist(V[n], V[m]), a, 1e-9), `side ${n}${m} = ${a}`);
    must(near(dist(O, V[n]), a, 1e-9), `vertex ${n} is on the circumcircle`);
    must(near(angDeg(V[n], V[names[(i + 5) % 6]], V[m]), 120, 1e-9), `interior angle at ${n} is 120`);
    must(near(angDeg(O, V[n], V[m]), 60, 1e-9), `triangle O${n}${m} is equilateral`);
  });
  const ap = (a * Math.sqrt(3)) / 2;
  const mids = Object.fromEntries(names.map((n, i) => [`M${n}${names[(i + 1) % 6]}`, mid(V[n], V[names[(i + 1) % 6]])]));
  Object.entries(mids).forEach(([n, m]) => must(near(dist(O, m), ap, 1e-9), `mid-point ${n} is on the incircle`));
  const sideL = through(V.A, V.B);
  must(near(distLine(O, sideL), ap, 1e-9) && near(angDeg(mids.MAB, O, V.A), 90, 1e-9), 'the incircle touches the side at its mid-point');
  return { a, V, ap, R: a, mids, perimeter: 6 * a, area: (3 * Math.sqrt(3) * a * a) / 2 };
}
