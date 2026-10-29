// Independent determinant and matrix arithmetic for the ch04 re-solve checks, plus LaTeX formatters.
// Matrix helpers follow cbse-12-mathematics-ch03/src/mat.mjs (copied, not imported, so each chapter stands alone).
export const mul = (A, B) => {
  if (A[0].length !== B.length) throw new Error('mul: orders do not match');
  return A.map((row) => B[0].map((_, j) => row.reduce((s, a, k) => s + a * B[k][j], 0)));
};
export const scal = (k, A) => A.map((row) => row.map((a) => k * a));
export const T = (A) => A[0].map((_, j) => A.map((row) => row[j]));
export const I = (n) => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)));
export const eqM = (A, B) => A.length === B.length && A.every((row, i) => row.length === B[i].length && row.every((a, j) => Math.abs(a - B[i][j]) < 1e-9));
export const isInverse = (A, B) => eqM(mul(A, B), I(A.length)) && eqM(mul(B, A), I(A.length));
export const flat = (A) => A.flat();
export const col = (v) => v.map((x) => [x]);

/** Submatrix without row i and column j (0-based). */
export const sub = (A, i, j) => A.filter((_, r) => r !== i).map((row) => row.filter((_, c) => c !== j));
/** Determinant by cofactor expansion along the first row (independent of the text's choice of row). */
export const det = (A) => (A.length === 1 ? A[0][0] : A[0].reduce((s, a, j) => s + (j % 2 ? -1 : 1) * a * det(sub(A, 0, j)), 0));
/** Minor and cofactor with 1-based indices, as written in the text (M_ij, A_ij). */
export const minor = (A, i, j) => det(sub(A, i - 1, j - 1));
export const cof = (A, i, j) => ((i + j) % 2 ? -1 : 1) * minor(A, i, j);
/** Cofactor matrix and adjoint (transpose of the cofactor matrix). */
export const cofM = (A) => A.map((row, i) => row.map((_, j) => cof(A, i + 1, j + 1)));
export const adj = (A) => (A.length === 1 ? [[1]] : T(cofM(A)));
export const inv = (A) => { const d = det(A); if (Math.abs(d) < 1e-12) return null; return scal(1 / d, adj(A)); };
/** Expansion along row r or column c (1-based), to check "any row or column gives the same value". */
export const expandRow = (A, r) => A[r - 1].reduce((s, a, j) => s + a * cof(A, r, j + 1), 0);
export const expandCol = (A, c) => A.reduce((s, row, i) => s + row[c - 1] * cof(A, i + 1, c), 0);
/** ½|det| area of a triangle with vertices [x, y]. */
export const triDet = (P, Q, R) => det([[P[0], P[1], 1], [Q[0], Q[1], 1], [R[0], R[1], 1]]);
export const area = (P, Q, R) => Math.abs(triDet(P, Q, R)) / 2;
/** Solves AX = B for a non-singular A (B a flat list); returns a flat list. */
export const solve = (A, B) => mul(inv(A), col(B)).map((r) => Math.round(r[0] * 1e9) / 1e9);
/** Classifies AX = B: unique, none or infinite (|A| = 0 with (adj A)B = O is infinite for the systems used here; checked by rank below). */
export function classify(A, B) {
  if (Math.abs(det(A)) > 1e-12) return 'unique';
  const aB = mul(adj(A), col(B)).flat();
  if (aB.some((v) => Math.abs(v) > 1e-9)) return 'none';
  // (adj A)B = O: decide by comparing ranks of A and [A | B] (small brute force for 2x2 and 3x3).
  const rank = (M) => { const m = M.map((r) => [...r]); let rk = 0; const cols = m[0].length; for (let c = 0; c < cols && rk < m.length; c++) { let p = m.findIndex((r, i) => i >= rk && Math.abs(r[c]) > 1e-9); if (p < 0) continue; [m[rk], m[p]] = [m[p], m[rk]]; for (let i = 0; i < m.length; i++) if (i !== rk) { const f = m[i][c] / m[rk][c]; m[i] = m[i].map((v, k) => v - f * m[rk][k]); } rk++; } return rk; };
  return rank(A) === rank(A.map((r, i) => [...r, B[i]])) ? 'infinite' : 'none';
}
const BS = String.fromCharCode(92);
/** Number to LaTeX: integers as is, simple fractions as frac{p}{q}. */
export function num(v) {
  if (Object.is(v, -0) || Math.abs(v) < 1e-12) return '0';
  if (Math.abs(v - Math.round(v)) < 1e-9) return String(Math.round(v));
  for (let q = 2; q <= 40; q++) { const p = v * q; if (Math.abs(p - Math.round(p)) < 1e-9) return `${p < 0 ? '-' : ''}${BS}frac{${Math.abs(Math.round(p))}}{${q}}`; }
  throw new Error(`num: ${v} is not a simple fraction`);
}
const env = (name, A) => `${BS}begin{${name}} ${A.map((row) => row.map(num).join(' & ')).join(` ${BS}${BS} `)} ${BS}end{${name}}`;
export const bm = (A) => env('bmatrix', A);
export const vm = (A) => env('vmatrix', A);
