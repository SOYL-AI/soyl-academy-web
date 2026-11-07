// ch04 shared numbers and numerical helpers. They are deliberately independent of the closed forms the slides and items state
// (linear-system solves of the force equations, time stepping, root finding), so each re-solve is a real second route.
export const g = 9.8; // m s^-2, stated in every item that uses it
export const R6 = (x) => Math.round(x * 1e6) / 1e6;
export const rad = (deg) => (deg * Math.PI) / 180;
export const deg = (r) => (r * 180) / Math.PI;

/** Solves A x = b by Gaussian elimination with partial pivoting. */
export function solveLin(A, b) {
  const n = b.length;
  const M = A.map((row, i) => [...row, b[i]]);
  for (let c = 0; c < n; c++) {
    let p = c;
    for (let i = c + 1; i < n; i++) if (Math.abs(M[i][c]) > Math.abs(M[p][c])) p = i;
    [M[c], M[p]] = [M[p], M[c]];
    for (let i = c + 1; i < n; i++) {
      const f = M[i][c] / M[c][c];
      for (let j = c; j <= n; j++) M[i][j] -= f * M[c][j];
    }
  }
  const x = new Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    let s = M[i][n];
    for (let j = i + 1; j < n; j++) s -= M[i][j] * x[j];
    x[i] = s / M[i][i];
  }
  return x;
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

/** Simpson integral of f from a to b (n even). */
export function integ(f, a, b, n = 2000) {
  const h = (b - a) / n;
  let s = f(a) + f(b);
  for (let i = 1; i < n; i++) s += f(a + i * h) * (i % 2 ? 4 : 2);
  return (s * h) / 3;
}

/** Time-steps x'' = acc(x, v, t) (velocity-Verlet-like RK2) and returns {x, v} at T. */
export function simulate(acc, x0, v0, T, dt = 1e-4) {
  let x = x0;
  let v = v0;
  const n = Math.round(T / dt);
  for (let i = 0; i < n; i++) {
    const t = i * dt;
    const a1 = acc(x, v, t);
    const xm = x + v * (dt / 2);
    const vm = v + a1 * (dt / 2);
    const a2 = acc(xm, vm, t + dt / 2);
    x += vm * dt;
    v += a2 * dt;
  }
  return { x, v };
}

/** Two bodies joined by a light string over a smooth pulley: m1 on a rough horizontal table (mu), m2 hanging. Solves for (a, T). */
export function tablePulley(m1, m2, mu = 0) {
  // T − mu m1 g = m1 a ; m2 g − T = m2 a
  const [a, T] = solveLin([[m1, -1], [m2, 1]], [-mu * m1 * g, m2 * g]);
  return { a, T };
}
/** Atwood machine, m2 > m1: T − m1 g = m1 a ; m2 g − T = m2 a. */
export function atwood(m1, m2) {
  const [a, T] = solveLin([[m1, -1], [m2, 1]], [-m1 * g, m2 * g]);
  return { a, T };
}
/** Level-road or banked-road limiting speed by solving the force equations (theta in degrees, mu the friction coefficient, r in m).
 *  mode 'max' : friction acts down the slope (about to skid outward); 'min': friction acts up the slope (about to slide inward).
 *  Unknowns N and v² for unit mass: N cosθ − s μ N sinθ = g ; N sinθ + s μ N cosθ = v²/r, with s = +1 (max) or −1 (min). */
export function bankLimit(theta, mu, r, mode = 'max') {
  const s = mode === 'max' ? 1 : -1;
  const t = rad(theta);
  const [N, v2] = solveLin([[Math.cos(t) - s * mu * Math.sin(t), 0], [Math.sin(t) + s * mu * Math.cos(t), -1 / r]], [g, 0]);
  void N;
  return Math.sqrt(v2);
}
