// Exact integer and rational helpers for ISC 12 ch04 (determinants, adjoints, inverses, systems).
// Written for this chapter; matrices are integer arrays, so determinants and adjoints are exact integers.
// Rationals are [p, q] pairs in lowest terms with q > 0. Used by the re-solve checks and to generate the
// numbers printed in stems, so the printed givens and the computed answers cannot drift apart.
export const gcd = (a, b) => (b === 0 ? Math.abs(a) : gcd(b, a % b));
export const frac = (p, q) => { if (q === 0) throw new Error('frac: zero denominator'); const g = gcd(p, q) || 1; const s = q < 0 ? -1 : 1; return [(s * p) / g, (s * q) / g]; };
export const fval = ([p, q]) => p / q;

export const sub = (A, i, j) => A.filter((_, r) => r !== i).map((row) => row.filter((_, c) => c !== j));
/** Determinant by first-row expansion (exact for integer entries). */
export const det = (A) => (A.length === 1 ? A[0][0] : A.length === 2 ? A[0][0] * A[1][1] - A[0][1] * A[1][0] : A[0].reduce((s, a, j) => s + (j % 2 ? -1 : 1) * a * det(sub(A, 0, j)), 0));
/** 1-based minor and cofactor, as written in the text. */
export const minor = (A, i, j) => det(sub(A, i - 1, j - 1));
export const cof = (A, i, j) => ((i + j) % 2 ? -1 : 1) * minor(A, i, j);
export const cofM = (A) => A.map((row, i) => row.map((_, j) => cof(A, i + 1, j + 1)));
export const T = (A) => A[0].map((_, j) => A.map((row) => row[j]));
export const adj = (A) => (A.length === 1 ? [[1]] : T(cofM(A)));
export const mul = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, a, k) => s + a * B[k][j], 0)));
export const scal = (k, A) => A.map((row) => row.map((a) => k * a));
export const I = (n) => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)));
export const eqM = (A, B) => A.length === B.length && A.every((row, i) => row.every((a, j) => a === B[i][j]));
export const col = (v) => v.map((x) => [x]);
/** Expansion along row r or column c (1-based): the same value as det. */
export const expandRow = (A, r) => A[r - 1].reduce((s, a, j) => s + a * cof(A, r, j + 1), 0);
export const expandCol = (A, c) => A.reduce((s, row, i) => s + row[c - 1] * cof(A, i + 1, c), 0);
/** Signed triangle determinant and area (as a rational [p, 2]). */
export const triDet = (P, Q, R) => det([[P[0], P[1], 1], [Q[0], Q[1], 1], [R[0], R[1], 1]]);
export const area = (P, Q, R) => Math.abs(triDet(P, Q, R)) / 2;
/** Exact solution of AX = B for non-singular integer A: list of rationals. */
export const solveExact = (A, B) => { const d = det(A); return mul(adj(A), col(B)).map((r) => frac(r[0], d)); };
/** Rank by fraction-free elimination on a copy (small matrices). */
export function rank(M) {
  const m = M.map((r) => r.map((x) => x));
  let rk = 0;
  for (let c = 0; c < m[0].length && rk < m.length; c++) {
    const p = m.findIndex((r, i) => i >= rk && r[c] !== 0);
    if (p < 0) continue;
    [m[rk], m[p]] = [m[p], m[rk]];
    for (let i = 0; i < m.length; i++) if (i !== rk && m[i][c] !== 0) { const a = m[rk][c], b = m[i][c]; m[i] = m[i].map((v, k) => a * v - b * m[rk][k]); }
    rk++;
  }
  return rk;
}
/** unique | none | infinite, decided by ranks (independent of the adjoint test used in the text). */
export const classify = (A, B) => (det(A) !== 0 ? 'unique' : rank(A) === rank(A.map((r, i) => [...r, B[i]])) ? 'infinite' : 'none');

// ---------------------------------------------------------------- LaTeX
const BS = String.fromCharCode(92);
export const ftex = (x) => { const [p, q] = Array.isArray(x) ? x : [x, 1]; return q === 1 ? String(p) : `${p < 0 ? '-' : ''}${BS}dfrac{${Math.abs(p)}}{${q}}`; };
const env = (name, A) => `${BS}begin{${name}} ${A.map((row) => row.map((v) => (typeof v === 'string' ? v : ftex(v))).join(' & ')).join(` ${BS}${BS} `)} ${BS}end{${name}}`;
export const bm = (A) => env('bmatrix', A);
export const vm = (A) => env('vmatrix', A);
/** A^{-1} written as (1/|A|) adj A. */
export const invTex = (A) => { const d = det(A); return `${d < 0 ? '-' : ''}${BS}dfrac{1}{${Math.abs(d)}}${bm(adj(A))}`; };
