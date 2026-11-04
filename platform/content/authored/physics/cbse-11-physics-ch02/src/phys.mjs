// ch02 shared numbers and numerical helpers (kept independent of the closed-form formulae the items use, so re-solves are real checks).
export const g = 9.8; // m s^-2, as stated in every item that uses it

/** Central-difference derivative of f at x. */
export const deriv = (f, x, h = 1e-5) => (f(x + h) - f(x - h)) / (2 * h);
/** Simpson integral of f from a to b (n even). */
export function integ(f, a, b, n = 2000) {
  const h = (b - a) / n;
  let s = f(a) + f(b);
  for (let i = 1; i < n; i++) s += f(a + i * h) * (i % 2 ? 4 : 2);
  return (s * h) / 3;
}
/** Piecewise-linear velocity from [[t, v], …] knots. */
export function pwl(knots) {
  return (t) => {
    for (let i = 1; i < knots.length; i++) {
      const [t0, v0] = knots[i - 1];
      const [t1, v1] = knots[i];
      if (t >= t0 && t <= t1) return v0 + ((v1 - v0) * (t - t0)) / (t1 - t0);
    }
    return knots[knots.length - 1][1];
  };
}
/** Path length travelled by a particle whose position function is x(t), by fine sampling of |dx|. */
export function pathLength(x, a, b, n = 200000) {
  let s = 0;
  let prev = x(a);
  for (let i = 1; i <= n; i++) {
    const cur = x(a + ((b - a) * i) / n);
    s += Math.abs(cur - prev);
    prev = cur;
  }
  return s;
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
