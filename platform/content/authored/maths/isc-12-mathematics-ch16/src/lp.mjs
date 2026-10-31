// Independent linear-programming arithmetic for ISC 12 Mathematics ch16 (copied from cbse-12-mathematics-ch12/src/lp.mjs).
// A constraint is [a, b, op, c] meaning a·x + b·y (op) c with op '<=' or '>='. Non-negativity x ≥ 0, y ≥ 0
// is always added. Corners come from solving every pair of boundary lines and keeping the feasible
// intersections; optima are cross-checked by brute force on a fine grid, and unbounded regions by the
// open half-plane test on a large grid.
const EPS = 1e-9;
const NONNEG = [[1, 0, '>=', 0], [0, 1, '>=', 0]];
const all = (cons) => [...cons, ...NONNEG];
const round = (v) => (Math.abs(v - Math.round(v)) < 1e-9 ? Math.round(v) : Math.round(v * 1e9) / 1e9);

export function feasible(cons, x, y) {
  return all(cons).every(([a, b, op, c]) => (op === '<=' ? a * x + b * y <= c + EPS : a * x + b * y >= c - EPS));
}

/** Feasible corner points, sorted by x then y. */
export function corners(cons) {
  const L = all(cons);
  const out = [];
  for (let i = 0; i < L.length; i++) for (let j = i + 1; j < L.length; j++) {
    const [a1, b1, , c1] = L[i];
    const [a2, b2, , c2] = L[j];
    const det = a1 * b2 - a2 * b1;
    if (Math.abs(det) < EPS) continue;
    const x = round((c1 * b2 - c2 * b1) / det), y = round((a1 * c2 - a2 * c1) / det);
    if (feasible(cons, x, y) && !out.some(([u, v]) => Math.abs(u - x) < 1e-7 && Math.abs(v - y) < 1e-7)) out.push([x, y]);
  }
  return out.sort((p, q) => p[0] - q[0] || p[1] - q[1]);
}

/** Grid search of the feasible region in [0, R]²; returns the best Z found (or null when empty). */
function gridBest(cons, p, q, kind, R, step) {
  let best = null;
  for (let x = 0; x <= R + 1e-9; x += step) for (let y = 0; y <= R + 1e-9; y += step) {
    if (!feasible(cons, x, y)) continue;
    const z = p * x + q * y;
    if (best === null || (kind === 'max' ? z > best : z < best)) best = z;
  }
  return best;
}

/**
 * Solve max/min of Z = p·x + q·y. Returns { corners, values, value, at, bounded, exists }.
 * `exists` is false when the region is empty or the optimum is not attained (unbounded direction).
 */
export function solveLP(cons, p, q, kind) {
  const cs = corners(cons);
  if (!cs.length) return { corners: cs, values: [], value: null, at: [], exists: false, empty: true };
  const values = cs.map(([x, y]) => round(p * x + q * y));
  const value = kind === 'max' ? Math.max(...values) : Math.min(...values);
  const at = cs.filter((_, k) => Math.abs(values[k] - value) < 1e-9);
  const M = Math.max(...cs.flat(), 1);
  // bounded? test feasibility far away along the first-quadrant directions
  const far = 1e4 * M;
  const bounded = ![0, 0.1, 0.25, 0.5, 0.75, 1, 1.5, 2, 4, 10, 1e3].some((t) => feasible(cons, far, far * t)) && !feasible(cons, 0, far);
  // half-plane test: any feasible point strictly better than the corner optimum?
  const R = bounded ? M : 30 * M;
  const step = R / 600;
  const g = gridBest(cons, p, q, kind, R, step);
  const better = kind === 'max' ? g > value + 1e-7 : g < value - 1e-7;
  return { corners: cs, values, value, at, bounded, exists: !better, empty: false };
}

export const sameSet = (A, B) => A.length === B.length && A.every(([x, y]) => B.some(([u, v]) => Math.abs(u - x) < 1e-7 && Math.abs(v - y) < 1e-7));
