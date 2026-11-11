// ISC 11 ch08 shared numbers and independent numerical helpers. Slides and items print closed-form results (W = FS cos θ, ½mv², ½kx²,
// mgh, P = Fv); the re-solves use these instead: numerical integration of a force over a path, stepping the equations of motion (a
// falling body, a pendulum, a mass on a spring), and root finding.
export const g = 9.8; // m s^-2, stated in every item that uses it
export const c = 3.0e8; // m s^-1, speed of light as used in school problems
export const rad = (d) => (d * Math.PI) / 180;
export const deg = (r) => (r * 180) / Math.PI;
export const R6 = (x) => Math.round(x * 1e6) / 1e6;
/** Proper minus sign for printed plain text. */
export const mn = (x) => String(x).replace('-', '−');

/** Trapezoid-rule integral of f over [a, b] with n strips. */
export function trapz(f, a, b, n = 20000) {
  const h = (b - a) / n;
  let s = 0.5 * (f(a) + f(b));
  for (let i = 1; i < n; i++) s += f(a + i * h);
  return s * h;
}
/** Piecewise-linear function through the points [[x, y], ...]. */
export const piecewise = (pts) => (x) => {
  for (let i = 0; i < pts.length - 1; i++) {
    const [x0, y0] = pts[i];
    const [x1, y1] = pts[i + 1];
    if (x >= x0 && x <= x1) return y0 + ((y1 - y0) * (x - x0)) / (x1 - x0);
  }
  return 0;
};
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
/** Work done by a force F(x) (N, as a function of the distance moved along the path) over [a, b], by numerical integration. */
export const workOver = (F, a, b) => trapz(F, a, b);

/** Speed of a body that falls from rest through height h (no air resistance), by stepping the motion. */
export function fallSpeed(h, dt = 1e-5) {
  let y = 0;
  let v = 0;
  while (y < h) {
    v += g * dt;
    y += v * dt;
  }
  return v;
}
/** Distance to stop a mass m moving at v0 under a constant retarding force F, by stepping the motion. */
export function stopDist(m, v0, F, dt = 1e-5) {
  let x = 0;
  let v = v0;
  const a = F / m;
  while (v > 0) {
    v -= a * dt;
    x += Math.max(v, 0) * dt;
  }
  return x;
}
/** Speed of a pendulum bob (length L, released from rest at angle th0 degrees) when it passes angle thEnd (degrees), by stepping the equation of motion. */
export function pendulumSpeed(L, th0, thEnd = 0, dt = 1e-5) {
  let th = rad(th0);
  let w = 0;
  const target = rad(thEnd);
  while (th > target) {
    w -= (g / L) * Math.sin(th) * dt;
    th += w * dt;
  }
  return Math.abs(w) * L;
}
/** Mass on a spring (stiffness k) released from rest at amplitude A: returns the speed when the displacement first falls to x (|x| <= A), by stepping. */
export function springSpeedAt(m, k, A, x, dt = 1e-6) {
  let y = A;
  let v = 0;
  while (y > x) {
    v += (-k / m) * y * dt;
    y += v * dt;
  }
  return Math.abs(v);
}
/** Energy gained by lifting m through h against gravity, by summing the work of the lifting force over small steps. */
export function liftWork(m, h) {
  return trapz(() => m * g, 0, h, 2000);
}
