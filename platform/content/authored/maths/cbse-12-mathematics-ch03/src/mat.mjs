// Independent matrix arithmetic for the ch03 re-solve checks, plus a LaTeX formatter.
// Authored answers are typed as literal arrays in questions.mjs; the checks recompute them from the
// givens with these functions and compare the formatted strings or the numbers.
export const mul = (A, B) => {
  if (A[0].length !== B.length) throw new Error(`mul: ${A.length}x${A[0].length} by ${B.length}x${B[0].length} not defined`);
  return A.map((row) => B[0].map((_, j) => row.reduce((s, a, k) => s + a * B[k][j], 0)));
};
export const add = (A, B) => A.map((row, i) => row.map((a, j) => a + B[i][j]));
export const sub = (A, B) => A.map((row, i) => row.map((a, j) => a - B[i][j]));
export const scal = (k, A) => A.map((row) => row.map((a) => k * a));
export const T = (A) => A[0].map((_, j) => A.map((row) => row[j]));
export const I = (n) => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)));
export const O = (m, n = m) => Array.from({ length: m }, () => Array(n).fill(0));
export const eqM = (A, B) => A.length === B.length && A.every((row, i) => row.length === B[i].length && row.every((a, j) => Math.abs(a - B[i][j]) < 1e-9));
export const pow = (A, n) => (n === 1 ? A : mul(A, pow(A, n - 1)));
export const isSym = (A) => eqM(A, T(A));
export const isSkew = (A) => eqM(T(A), scal(-1, A));
export const isInverse = (A, B) => eqM(mul(A, B), I(A.length)) && eqM(mul(B, A), I(A.length));
export const sum = (A) => A.flat().reduce((s, v) => s + v, 0);
export const flat = (A) => A.flat();
/** Builds an m x n matrix from a rule a(i, j) with 1-based indices. */
export const fromRule = (m, n, rule) => Array.from({ length: m }, (_, i) => Array.from({ length: n }, (_, j) => rule(i + 1, j + 1)));
/** Number to LaTeX: integers as is, simple fractions as \frac{p}{q}. */
export function num(v) {
  if (Object.is(v, -0) || Math.abs(v) < 1e-12) return '0';
  if (Math.abs(v - Math.round(v)) < 1e-9) return String(Math.round(v));
  for (let q = 2; q <= 12; q++) {
    const p = v * q;
    if (Math.abs(p - Math.round(p)) < 1e-9) return `${p < 0 ? '-' : ''}\\frac{${Math.abs(Math.round(p))}}{${q}}`;
  }
  throw new Error(`num: ${v} is not a simple fraction`);
}
/** LaTeX for a matrix (no surrounding $): \begin{bmatrix} a & b \\ c & d \end{bmatrix} */
export const bm = (A) => `\\begin{bmatrix} ${A.map((row) => row.map(num).join(' & ')).join(' \\\\ ')} \\end{bmatrix}`;
