// Exact matrix arithmetic for the ISC 12 ch03 re-solve checks and computed tables.
// Every matrix is an array of rows of integers; fractions only appear as an integer matrix over a common
// integer denominator (for example (A + A')/2 or an inverse (1/d) M), so all arithmetic stays exact.
// Authored answers are typed as literals in questions.mjs; the checks recompute them with these functions.
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
export const eqM = (A, B) => A.length === B.length && A.every((row, i) => row.length === B[i].length && row.every((a, j) => a === B[i][j]));
export const pow = (A, n) => (n === 1 ? A : mul(A, pow(A, n - 1)));
export const isSym = (A) => eqM(A, T(A));
export const isSkew = (A) => eqM(T(A), scal(-1, A));
export const isZero = (A) => A.every((row) => row.every((a) => a === 0));
export const order = (A) => `${A.length}x${A[0].length}`;
export const fromRule = (m, n, rule) => Array.from({ length: m }, (_, i) => Array.from({ length: n }, (_, j) => rule(i + 1, j + 1)));
export const trace = (A) => A.reduce((s, row, i) => s + row[i], 0);
/** Classification used in t01 (square matrices only for the square types). */
export function kinds(A) {
  const m = A.length, n = A[0].length, sq = m === n, out = [];
  const offZero = sq && A.every((row, i) => row.every((a, j) => i === j || a === 0));
  if (isZero(A)) out.push('zero');
  if (m === 1) out.push('row');
  if (n === 1) out.push('column');
  if (sq) out.push('square');
  if (offZero) out.push('diagonal');
  if (offZero && A.every((row, i) => row[i] === A[0][0])) out.push('scalar');
  if (sq && eqM(A, I(m))) out.push('identity');
  if (sq && A.every((row, i) => row.every((a, j) => j >= i || a === 0))) out.push('upper');
  if (sq && A.every((row, i) => row.every((a, j) => j <= i || a === 0))) out.push('lower');
  return out;
}
/** 2 x 2 determinant (the number that decides singular / non-singular for 2 x 2 matrices). */
export const det2 = ([[a, b], [c, d]]) => a * d - b * c;
/** 3 x 3 determinant by the first row. */
export const det3 = (A) => A[0][0] * (A[1][1] * A[2][2] - A[1][2] * A[2][1]) - A[0][1] * (A[1][0] * A[2][2] - A[1][2] * A[2][0]) + A[0][2] * (A[1][0] * A[2][1] - A[1][1] * A[2][0]);
/** Integer matrix M with det2(A) * A^-1 = M for a 2 x 2 A (swap the diagonal, negate the rest). */
export const swapNeg = ([[a, b], [c, d]]) => [[d, -b], [-c, a]];
/** True when B is the inverse of A, checked exactly: k*A*N = k*N*A = k*I where B = N/k. */
export const isInverseOver = (A, N, k) => eqM(mul(A, N), scal(k, I(A.length))) && eqM(mul(N, A), scal(k, I(A.length)));
const gcd = (a, b) => (b === 0 ? Math.abs(a) : gcd(b, a % b));
/** Exact fraction p/q as LaTeX. */
export function fr(p, q = 1) {
  if (q < 0) { p = -p; q = -q; }
  const g = gcd(p, q) || 1;
  p /= g; q /= g;
  if (q === 1) return String(p);
  return `${p < 0 ? '-' : ''}\\frac{${Math.abs(p)}}{${q}}`;
}
/** LaTeX for an integer matrix, or for the matrix N/k entry by entry (no surrounding $). */
export const bm = (A, k = 1) => `\\begin{bmatrix} ${A.map((row) => row.map((a) => fr(a, k)).join(' & ')).join(' \\\\ ')} \\end{bmatrix}`;
/** LaTeX for (1/k) N with the scalar outside, e.g. \frac{1}{7}\begin{bmatrix}…\end{bmatrix}. */
export const bmOut = (N, k) => (k === 1 ? bm(N) : `${fr(1, k)}${bm(N)}`);
