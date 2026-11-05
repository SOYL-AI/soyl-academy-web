// ch09 shared constants and numerical helpers. The helpers (Simpson integral, bisection, derivative, an RK4 integrator) are
// deliberately independent of the closed forms the items use, so the re-solves are real checks.
export const g = 9.8; // m s^-2, stated in every item that uses it
export const RHO = 1000; // kg m^-3, water
export const RHO_HG = 13600; // kg m^-3, mercury
export const PATM = 1.013e5; // Pa
export const ETA_W = 1.0e-3; // Pa s, water
export const S_W = 0.072; // N m^-1, water
export const R6 = (x) => Math.round(x * 1e6) / 1e6;
export const area = (r) => Math.PI * r * r;
export const vol = (r) => (4 / 3) * Math.PI * r ** 3;

/** Central-difference derivative of f at x. */
export const deriv = (f, x, h = 1e-6) => (f(x + h) - f(x - h)) / (2 * h);
/** Simpson integral of f from a to b (n even). */
export function integ(f, a, b, n = 2000) {
  const h = (b - a) / n;
  let s = f(a) + f(b);
  for (let i = 1; i < n; i++) s += f(a + i * h) * (i % 2 ? 4 : 2);
  return (s * h) / 3;
}
/** Bisection root of f on [a, b] (f(a) and f(b) of opposite sign). */
export function root(f, a, b) {
  let lo = a;
  let hi = b;
  for (let i = 0; i < 200; i++) {
    const mid = (lo + hi) / 2;
    if (f(lo) * f(mid) <= 0) hi = mid;
    else lo = mid;
  }
  return (lo + hi) / 2;
}
/** RK4 solution of dv/dt = f(t, v) from v0 at t = 0, returning v(T) after n steps. */
export function rk4(f, v0, T, n = 20000) {
  const h = T / n;
  let v = v0;
  let t = 0;
  for (let i = 0; i < n; i++) {
    const k1 = f(t, v);
    const k2 = f(t + h / 2, v + (h / 2) * k1);
    const k3 = f(t + h / 2, v + (h / 2) * k2);
    const k4 = f(t + h, v + h * k3);
    v += (h / 6) * (k1 + 2 * k2 + 2 * k3 + k4);
    t += h;
  }
  return v;
}
/** Terminal speed of a sphere (radius r, density rs) in a fluid (density sg, viscosity eta) by integrating the equation of motion until the speed settles. */
export function settleSpeed(r, rs, sg, eta) {
  const m = rs * vol(r);
  const f = (_t, v) => ((rs - sg) * vol(r) * g - 6 * Math.PI * eta * r * v) / m;
  const tau = m / (6 * Math.PI * eta * r);
  return rk4(f, 0, 40 * tau);
}
/** Height of a capillary column from the force balance: solves 2 pi r S cos(theta) = rho g pi r^2 h for h by bisection (signed). */
export function capHeight(S, thetaDeg, rho, rad) {
  const up = 2 * Math.PI * rad * S * Math.cos((thetaDeg * Math.PI) / 180);
  return root((h) => up - rho * g * Math.PI * rad * rad * h, -10, 10);
}
