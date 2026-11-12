// ISC 11 ch03 shared numbers and numerical helpers. Re-solves use component arithmetic, numerical angles and brute-force
// sampling, kept independent of the closed-form formulae (law of cosines, tan α, a b cos θ) that slides and items print.
export const g = 9.8; // m s^-2, stated in every item that uses it
export const rad = (d) => (d * Math.PI) / 180;
export const deg = (r) => (r * 180) / Math.PI;
export const R6 = (x) => Math.round(x * 1e6) / 1e6;
/** Proper minus sign in printed plain text. */
export const mn = (x) => String(x).replace('-', '−');

/** 2D/3D vector helpers on plain arrays. */
export const Vec = {
  add: (a, b) => a.map((x, i) => x + b[i]),
  sub: (a, b) => a.map((x, i) => x - b[i]),
  scale: (a, k) => a.map((x) => x * k),
  dot: (a, b) => a.reduce((s, x, i) => s + x * b[i], 0),
  mag: (a) => Math.hypot(...a),
  /** angle of a 2D vector from +x in degrees, (-180, 180] */
  ang: (a) => deg(Math.atan2(a[1], a[0])),
  polar: (m, d) => [m * Math.cos(rad(d)), m * Math.sin(rad(d))],
  cross3: (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]],
  cross2: (a, b) => a[0] * b[1] - a[1] * b[0],
  unit: (a) => a.map((x) => x / Math.hypot(...a)),
};
/** Resultant of two vectors by the law of cosines and by components: returns both for cross-checking. */
export function resultant2(A, B, thetaDeg) {
  const R = Math.sqrt(A * A + B * B + 2 * A * B * Math.cos(rad(thetaDeg)));
  const alpha = deg(Math.atan2(B * Math.sin(rad(thetaDeg)), A + B * Math.cos(rad(thetaDeg))));
  const c = Vec.add([A, 0], Vec.polar(B, thetaDeg));
  return { R, alpha, Rc: Vec.mag(c), alphac: Vec.ang(c), comps: c };
}
/** Angle between two vectors by the arccos of the normalised dot product, in degrees. */
export const angleBetween = (a, b) => deg(Math.acos(Vec.dot(a, b) / (Vec.mag(a) * Vec.mag(b))));
/** Angle between two 3D vectors from the cross product magnitude (an independent route to the dot product): atan2(|a x b|, a.b). */
export const angleByCross = (a, b) => deg(Math.atan2(Vec.mag(Vec.cross3(a, b)), Vec.dot(a, b)));
/** Resultant of coplanar forces given as [magnitude, angle in degrees]: by summing components. */
export function sumPolar(list) {
  const s = list.reduce((acc, [m, d]) => Vec.add(acc, Vec.polar(m, d)), [0, 0]);
  return { x: s[0], y: s[1], R: Vec.mag(s), ang: Vec.ang(s) };
}
/** Pairwise-fold resultant using the law of cosines for two vectors at a time (an independent route for polygon problems). */
export function foldPolar(list) {
  let [m, d] = list[0];
  for (const [m2, d2] of list.slice(1)) {
    const th = d2 - d;
    const R = Math.sqrt(m * m + m2 * m2 + 2 * m * m2 * Math.cos(rad(th)));
    const a = deg(Math.atan2(m2 * Math.sin(rad(th)), m + m2 * Math.cos(rad(th))));
    m = R;
    d = d + a;
  }
  return { R: m, ang: d };
}
