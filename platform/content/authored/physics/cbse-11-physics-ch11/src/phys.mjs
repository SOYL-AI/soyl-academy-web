// ch11 Thermodynamics: shared constants and numerical helpers, kept independent of the closed forms the items print
// (re-solves integrate P dV numerically and take polygon areas, so they are real checks).
// Units used throughout: pressure in kPa, volume in litres, so that 1 kPa x 1 L = 1 J.
export const R = 8.314; // J mol^-1 K^-1
export const GAMMA_MONO = 5 / 3; // monatomic ideal gas (Cv = 3R/2), quoted as data in the items that use it
export const GAMMA_DI = 7 / 5; // diatomic gas at room temperature (Cv = 5R/2), quoted as data

/** Simpson integral of f from a to b (n even). */
export function integ(f, a, b, n = 4000) {
  const h = (b - a) / n;
  let s = f(a) + f(b);
  for (let i = 1; i < n; i++) s += f(a + i * h) * (i % 2 ? 4 : 2);
  return (s * h) / 3;
}
/** Work done BY the gas around a closed loop given as [[V, P], ...] vertices (V right, P up): positive for a clockwise loop. */
export function loopWork(pts) {
  let s = 0;
  for (let i = 0; i < pts.length; i++) {
    const [x1, y1] = pts[i];
    const [x2, y2] = pts[(i + 1) % pts.length];
    s += x1 * y2 - x2 * y1;
  }
  return -s / 2; // kPa x L = J
}
/** Area under a polyline [[x, y], ...] (x increasing or decreasing), signed by the direction of travel in x. */
export function areaUnder(pts) {
  let s = 0;
  for (let i = 1; i < pts.length; i++) s += ((pts[i][1] + pts[i - 1][1]) / 2) * (pts[i][0] - pts[i - 1][0]);
  return s;
}
/** Samples a function of V into a polyline of [V, P] points. */
export function sample(f, v0, v1, n = 60) {
  const out = [];
  for (let k = 0; k <= n; k++) {
    const v = v0 + ((v1 - v0) * k) / n;
    out.push([v, f(v)]);
  }
  return out;
}
/** Pressure on the isotherm with constant product pv. */
export const isotherm = (pv) => (v) => pv / v;
/** Pressure on the adiabat through (v0, p0). */
export const adiabat = (p0, v0, gamma) => (v) => p0 * (v0 / v) ** gamma;
/** Clean rounding to n decimals. */
export const R6 = (x) => Math.round(x * 1e6) / 1e6;
