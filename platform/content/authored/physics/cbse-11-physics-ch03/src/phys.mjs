// ch03 shared numbers and numerical helpers. Re-solves use these (stepping integrators, finite differences, bisection,
// component arithmetic), kept independent of the closed-form formulae that the slides and items print.
export const g = 9.8; // m s^-2, stated in every item that uses it
export const rad = (d) => (d * Math.PI) / 180;
export const deg = (r) => (r * 180) / Math.PI;
export const R6 = (x) => Math.round(x * 1e6) / 1e6;

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
};

/** Closed-form projectile quantities (launch height h0 above the landing level). */
export function proj(u, thetaDeg, h0 = 0, gg = g) {
  const ux = u * Math.cos(rad(thetaDeg));
  const uy = u * Math.sin(rad(thetaDeg));
  const T = (uy + Math.sqrt(uy * uy + 2 * gg * h0)) / gg;
  return { ux, uy, T, H: uy > 0 ? (uy * uy) / (2 * gg) : 0, R: ux * T, tTop: uy / gg };
}
/** Independent numerical flight: leapfrog stepping with a small time step; returns time of flight, rise above launch and range. */
export function projNumeric(u, thetaDeg, h0 = 0, gg = g, dt = 2e-5) {
  let x = 0;
  let y = h0;
  let vx = u * Math.cos(rad(thetaDeg));
  let vy = u * Math.sin(rad(thetaDeg));
  let t = 0;
  let ymax = y;
  let ok = false;
  while (t < 200) {
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
    ok = true;
  }
  return ok ? null : null;
}
/** Central-difference derivative. */
export const deriv = (f, x, h = 1e-4) => (f(x + h) - f(x - h)) / (2 * h);
/** Magnitude of the second derivative of a 2D path p(t) = [x(t), y(t)] by central differences. */
export function accelMag(p, t, h = 1e-3) {
  const a = p(t - h);
  const b = p(t);
  const c = p(t + h);
  return Math.hypot((a[0] - 2 * b[0] + c[0]) / (h * h), (a[1] - 2 * b[1] + c[1]) / (h * h));
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
/** Resultant of two vectors by the law of cosines and by components: returns both for cross-checking. */
export function resultant2(A, B, thetaDeg) {
  const R = Math.sqrt(A * A + B * B + 2 * A * B * Math.cos(rad(thetaDeg)));
  const alpha = deg(Math.atan2(B * Math.sin(rad(thetaDeg)), A + B * Math.cos(rad(thetaDeg))));
  const c = Vec.add([A, 0], Vec.polar(B, thetaDeg));
  return { R, alpha, Rc: Vec.mag(c), alphac: Vec.ang(c), comps: c };
}
/** Signed minus for printed schemes. */
export const mn = (x) => String(x).replace('-', '−');
