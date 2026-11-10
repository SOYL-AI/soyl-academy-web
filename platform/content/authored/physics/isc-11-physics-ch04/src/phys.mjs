// ISC 11 ch04 shared numbers and numerical helpers. Re-solves use these (a stepping integrator, finite differences and
// bisection), kept independent of the closed-form formulae that the slides and items print.
export const g = 9.8; // m s^-2, stated in every item that uses it
export const rad = (d) => (d * Math.PI) / 180;
export const deg = (r) => (r * 180) / Math.PI;
export const R6 = (x) => Math.round(x * 1e6) / 1e6;
/** Proper minus sign for printed plain text. */
export const mn = (x) => String(x).replace('-', '−');

/** Closed-form projectile quantities for launch and landing at the same level (or launch height h0 above the landing level). */
export function proj(u, thetaDeg, h0 = 0, gg = g) {
  const ux = u * Math.cos(rad(thetaDeg));
  const uy = u * Math.sin(rad(thetaDeg));
  const T = (uy + Math.sqrt(uy * uy + 2 * gg * h0)) / gg;
  return { ux, uy, T, H: uy > 0 ? (uy * uy) / (2 * gg) : 0, R: ux * T, tTop: uy / gg };
}
/** Position (x, y) at time t from the launch point. */
export const pos = (u, thetaDeg, t, gg = g) => [u * Math.cos(rad(thetaDeg)) * t, u * Math.sin(rad(thetaDeg)) * t - 0.5 * gg * t * t];
/** Independent numerical flight: leapfrog stepping; returns time of flight, rise above launch and range (landing at y = 0). */
export function projNumeric(u, thetaDeg, h0 = 0, gg = g, dt = 2e-5) {
  let x = 0;
  let y = h0;
  const vx = u * Math.cos(rad(thetaDeg));
  let vy = u * Math.sin(rad(thetaDeg));
  let t = 0;
  let ymax = y;
  while (t < 400) {
    vy -= 0.5 * gg * dt;
    x += vx * dt;
    const yn = y + vy * dt;
    vy -= 0.5 * gg * dt;
    t += dt;
    if (yn <= 0) {
      const f = y / (y - yn);
      return { T: t - dt + f * dt, H: ymax - h0, R: x - vx * dt + f * vx * dt, vxEnd: vx, vyEnd: vy };
    }
    y = yn;
    if (y > ymax) ymax = y;
  }
  return null;
}
/** Central-difference derivative. */
export const deriv = (f, x, h = 1e-5) => (f(x + h) - f(x - h)) / (2 * h);
/** Velocity components at time t found by differencing the position, independent of vx = u cos, vy = u sin − gt. */
export function velNumeric(u, thetaDeg, t, gg = g) {
  const h = 1e-4;
  const a = pos(u, thetaDeg, t - h, gg);
  const b = pos(u, thetaDeg, t + h, gg);
  return [(b[0] - a[0]) / (2 * h), (b[1] - a[1]) / (2 * h)];
}
/** Bisection root of f on [a, b]. */
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
/** Golden-section maximum of f on [a, b] (unimodal). */
export function argmax(f, a, b) {
  const gr = (Math.sqrt(5) - 1) / 2;
  let c = b - gr * (b - a);
  let d = a + gr * (b - a);
  for (let i = 0; i < 200; i++) {
    if (f(c) > f(d)) b = d;
    else a = c;
    c = b - gr * (b - a);
    d = a + gr * (b - a);
  }
  return (a + b) / 2;
}
