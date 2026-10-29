// Independent numerics for the ch09 re-solve checks: central-difference derivatives, residual of a
// differential equation along a stated solution, an RK4 integrator for initial-value problems,
// order/degree from a structural description, and a numeric homogeneity test.

export const D = (g, x, h = 1e-5) => (g(x + h) - g(x - h)) / (2 * h);
export const D2 = (g, x, h = 1e-4) => (g(x + h) - 2 * g(x) + g(x - h)) / (h * h);
export const near = (a, b, tol = 1e-6) => Math.abs(a - b) <= tol * Math.max(1, Math.abs(b));
export const R6 = (v) => Math.round(v * 1e6) / 1e6;

/** Largest |F(x, y, y′, y″)| along y = g(x) at the sample points (numeric derivatives). */
export function residual(F, g, xs) {
  return Math.max(...xs.map((x) => Math.abs(F(x, g(x), D(g, x), D2(g, x)))));
}
/** True when y = g(x) satisfies F(x, y, y′, y″) = 0 at every sample point. */
export const solves = (F, g, xs, tol = 1e-4) => xs.every((x) => Number.isFinite(g(x))) && residual(F, g, xs) < tol;

/** Classical RK4 for y′ = fn(x, y) from (x0, y0) to x1. */
export function rk4(fn, x0, y0, x1, n = 4000) {
  const h = (x1 - x0) / n;
  let x = x0, y = y0;
  for (let i = 0; i < n; i++) {
    const k1 = fn(x, y);
    const k2 = fn(x + h / 2, y + (h * k1) / 2);
    const k3 = fn(x + h / 2, y + (h * k2) / 2);
    const k4 = fn(x + h, y + h * k3);
    y += (h / 6) * (k1 + 2 * k2 + 2 * k3 + k4);
    x += h;
  }
  return y;
}

/**
 * Order and degree from terms [[k, p], …] (k = order of the derivative in the term, p = its power).
 * poly = false when some derivative sits inside sin, cos, tan, e^, log, …: the degree is then not defined.
 */
export function od(terms, poly = true) {
  const order = Math.max(...terms.map(([k]) => k));
  const degree = poly ? Math.max(...terms.filter(([k]) => k === order).map(([, p]) => p)) : null;
  return { order, degree, degreeText: degree === null ? 'none' : String(degree) };
}

/** Numeric degree of homogeneity of F(x, y), or null if F is not homogeneous at the sample points. */
export function homDegree(F, pts = [[1.3, 0.7], [2.1, 1.9], [0.8, 2.6], [3.2, 1.1]], lams = [2, 3.5, 0.5]) {
  let n = null;
  for (const [x, y] of pts) for (const l of lams) {
    const a = F(l * x, l * y), b = F(x, y);
    if (!Number.isFinite(a) || !Number.isFinite(b) || b === 0 || a / b <= 0) return null;
    const k = Math.log(a / b) / Math.log(l);
    if (n === null) n = k;
    else if (Math.abs(n - k) > 1e-9) return null;
  }
  return Math.round(n * 1e9) / 1e9;
}

export const grid = (a, b, n = 7) => Array.from({ length: n }, (_, i) => a + ((b - a) * i) / (n - 1));
