// Independent numeric calculus for the ch06 re-solve checks: central-difference derivatives,
// sign sampling of f′ on an interval, turning points by sign changes of f′, and dense search
// (with golden-section refinement) for absolute extrema and optimisation answers.

export const D = (g, x, h = 1e-5) => (g(x + h) - g(x - h)) / (2 * h);
export const D2 = (g, x, h = 1e-4) => (g(x + h) - 2 * g(x) + g(x - h)) / (h * h);
export const close = (a, b, tol = 1e-6) => Math.abs(a - b) <= tol * Math.max(1, Math.abs(b));

/** +1 if f′ > 0 on (a, b) apart from isolated zeros, −1 if f′ < 0 likewise, 0 otherwise. */
export function mono(g, a, b, N = 4000) {
  let pos = 0, neg = 0;
  for (let k = 1; k < N; k++) {
    const x = a + ((b - a) * k) / N;
    const d = D(g, x);
    if (d > 1e-7) pos++;
    else if (d < -1e-7) neg++;
  }
  if (pos && !neg) return 1;
  if (neg && !pos) return -1;
  return 0;
}

/** Turning points of g on (a, b): x where g′ changes sign, with 'max' (+ to −) or 'min' (− to +). */
export function turning(g, a, b, N = 20000) {
  const out = [];
  const h = (b - a) / N;
  let prev = D(g, a + h);
  let prevX = a + h;
  for (let k = 2; k < N; k++) {
    const x = a + h * k;
    const d = D(g, x);
    if (Math.sign(d) !== Math.sign(prev) && Math.sign(d) !== 0 && Math.sign(prev) !== 0) {
      let lo = prevX, hi = x;
      for (let i = 0; i < 80; i++) { const m = (lo + hi) / 2; if (Math.sign(D(g, m)) === Math.sign(D(g, lo))) lo = m; else hi = m; }
      const z = (lo + hi) / 2;
      out.push({ x: Math.round(z * 1e6) / 1e6, y: g(z), type: prev > 0 ? 'max' : 'min' });
    }
    if (Math.sign(d) !== 0) { prev = d; prevX = x; }
  }
  return out;
}

/** Absolute max or min of g on [a, b] by dense search plus golden-section refinement. */
export function extremum(g, a, b, kind = 'max', N = 40000) {
  const better = kind === 'max' ? (u, v) => u > v : (u, v) => u < v;
  let bx = a, by = g(a);
  for (let k = 1; k <= N; k++) {
    const x = a + ((b - a) * k) / N, y = g(x);
    if (better(y, by)) { bx = x; by = y; }
  }
  let lo = Math.max(a, bx - (b - a) / N), hi = Math.min(b, bx + (b - a) / N);
  for (let i = 0; i < 100; i++) {
    const m1 = lo + (hi - lo) / 3, m2 = hi - (hi - lo) / 3;
    if (better(g(m1), g(m2)) || g(m1) === g(m2)) hi = m2; else lo = m1;
  }
  const x = (lo + hi) / 2;
  const y = g(x);
  return better(by, y) ? { x: bx, y: by } : { x, y };
}

export const round = (v, d = 6) => Math.round(v * 10 ** d) / 10 ** d;
