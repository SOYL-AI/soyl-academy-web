// Independent numeric calculus for the ISC 12 ch08 re-solve checks (copied from cbse-12-mathematics-ch07/src/calc.mjs): central-difference derivatives (an
// antiderivative is correct when its derivative matches the integrand at several sample points),
// composite Simpson's rule for definite integrals, and a tolerance compare.

export const D = (g, x, h = 1e-5) => (g(x + h) - g(x - h)) / (2 * h);
export const near = (a, b, tol = 1e-6) => Math.abs(a - b) <= tol * Math.max(1, Math.abs(b));

/** True when F′(x) ≈ g(x) at every sample point. */
export function isAnti(F, g, xs, tol = 1e-5) {
  return xs.every((x) => {
    const d = D(F, x);
    const v = g(x);
    return Number.isFinite(d) && Number.isFinite(v) && Math.abs(d - v) <= tol * Math.max(1, Math.abs(v));
  });
}

/** Composite Simpson's rule with n (even) panels; works for b < a too. */
export function simpson(g, a, b, n = 20000) {
  const h = (b - a) / n;
  let s = g(a) + g(b);
  for (let k = 1; k < n; k++) s += (k % 2 ? 4 : 2) * g(a + k * h);
  return (s * h) / 3;
}

/** Two expressions are the same function: equal at every sample point. */
export const same = (u, v, xs, tol = 1e-9) => xs.every((x) => Math.abs(u(x) - v(x)) <= tol * Math.max(1, Math.abs(v(x))));

export const ln = Math.log;
export const R6 = (v) => (typeof v === 'number' ? Math.round(v * 1e6) / 1e6 : v);
