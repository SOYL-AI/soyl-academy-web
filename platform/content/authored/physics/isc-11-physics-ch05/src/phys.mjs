// ISC 11 ch05 Newton's Laws of Motion: shared numbers and independent numerical helpers. The slides and items print results
// from closed forms; the re-solve checks use the routes here instead (energy for the Atwood machine, a linear solve of the
// equations of motion, torques about a different point for the ladder, a stepped integration for impulse).
export const g = 9.8; // m s^-2, stated in every item that uses it
export const rad = (d) => (d * Math.PI) / 180;
export const deg = (r) => (r * 180) / Math.PI;
export const R6 = (x) => Math.round(x * 1e6) / 1e6;
export const mn = (x) => String(x).replace('-', '−');

/** Gaussian elimination with partial pivoting: solves A x = b. */
export function solveLin(A, b) {
  const n = b.length;
  const M = A.map((row, i) => [...row, b[i]]);
  for (let c = 0; c < n; c++) {
    let p = c;
    for (let i = c + 1; i < n; i++) if (Math.abs(M[i][c]) > Math.abs(M[p][c])) p = i;
    [M[c], M[p]] = [M[p], M[c]];
    for (let i = c + 1; i < n; i++) {
      const k = M[i][c] / M[c][c];
      for (let j = c; j <= n; j++) M[i][j] -= k * M[c][j];
    }
  }
  const x = Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    let s = M[i][n];
    for (let j = i + 1; j < n; j++) s -= M[i][j] * x[j];
    x[i] = s / M[i][i];
  }
  return x;
}

/** Atwood machine, closed forms (m1 > m2): acceleration of m1 downward and the string tension. */
export const atwood = (m1, m2) => ({ a: ((m1 - m2) * g) / (m1 + m2), T: (2 * m1 * m2 * g) / (m1 + m2) });
/** Independent route: speed after m1 has fallen h from energy conservation, then a = v^2 / 2h and T from the lighter mass. */
export function atwoodEnergy(m1, m2, h = 0.5) {
  const v2 = (2 * (m1 - m2) * g * h) / (m1 + m2);
  const a = v2 / (2 * h);
  return { a, T: m2 * (g + a), T1: m1 * (g - a) };
}
/** Block m1 on a smooth table joined over a pulley to a hanging mass m2: closed forms. */
export const tableHang = (m1, m2) => ({ a: (m2 * g) / (m1 + m2), T: (m1 * m2 * g) / (m1 + m2) });
/** Same system as two simultaneous equations: T = m1 a and m2 g - T = m2 a, solved as a linear system in (a, T). */
export function tableHangLin(m1, m2) {
  const [a, T] = solveLin([[m1, -1], [m2, 1]], [0, m2 * g]);
  return { a, T };
}
/** Normal reaction on a person of mass m standing in a lift whose acceleration is a (upward positive). */
export const liftN = (m, a) => m * (g + a);
/** Lamp on two strings at angles alpha (left) and beta (right) to the horizontal, weight W: tensions by Lami. */
export function lamp(W, alpha, beta) {
  const s = Math.sin(rad(alpha + beta));
  return { T1: (W * Math.cos(rad(beta))) / s, T2: (W * Math.cos(rad(alpha))) / s };
}
/** Same lamp by resolving: horizontal and vertical balance as a linear system in (T1, T2). */
export function lampLin(W, alpha, beta) {
  const [T1, T2] = solveLin([[-Math.cos(rad(alpha)), Math.cos(rad(beta))], [Math.sin(rad(alpha)), Math.sin(rad(beta))]], [0, W]);
  return { T1, T2 };
}
/**
 * Ladder of length L and mass m at angle th to the floor, smooth wall, a load M standing d metres up the ladder (along it).
 * Closed form (torque about the foot): wall reaction Nw = (m g L/2 + M g d) cos th / (L sin th); Nf = (m + M) g; Ff = Nw.
 */
export function ladder(L, th, m, M = 0, d = 0) {
  const Nw = ((m * g * (L / 2) + M * g * d) * Math.cos(rad(th))) / (L * Math.sin(rad(th)));
  return { Nw, Nf: (m + M) * g, Ff: Nw };
}
/**
 * Independent route: unknowns (Nw, Nf, Ff); equations: vertical balance, horizontal balance and the torque about the TOP end
 * of the ladder (foot at the origin, wall on the right; counter-clockwise positive).
 */
export function ladderTop(L, th, m, M = 0, d = 0) {
  const c = Math.cos(rad(th));
  const s = Math.sin(rad(th));
  const W = m * g;
  const P = M * g;
  // rows: [Nw, Nf, Ff] . x = rhs. Horizontal: -Nw + Ff = 0. Vertical: Nf = W + P.
  // Torque about the top (L c, L s): Nf at the foot gives -L c Nf, Ff gives +L s Ff, the weight at L/2 gives +W (L/2) c,
  // the load at distance d from the foot gives +P (L - d) c; Nw passes through the top.
  const [Nw, Nf, Ff] = solveLin(
    [
      [-1, 0, 1],
      [0, 1, 0],
      [0, -L * c, L * s],
    ],
    [0, W + P, -(W * (L / 2) * c + P * (L - d) * c)],
  );
  return { Nw, Nf, Ff };
}
/** Impulse of a force given as samples F(t), by the trapezium rule over many small steps (independent of F_avg x dt). */
export function impulseOf(F, t0, t1, n = 20000) {
  let s = 0;
  const h = (t1 - t0) / n;
  for (let i = 0; i < n; i++) s += ((F(t0 + i * h) + F(t0 + (i + 1) * h)) / 2) * h;
  return s;
}
/** Central-difference derivative. */
export const deriv = (f, x, h = 1e-5) => (f(x + h) - f(x - h)) / (2 * h);
/** Relativistic factor 1/sqrt(1 - (v/c)^2) for beta = v/c. */
export const gamma = (beta) => 1 / Math.sqrt(1 - beta * beta);
