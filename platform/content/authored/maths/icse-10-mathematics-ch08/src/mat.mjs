// Exact integer matrix arithmetic for ICSE 10 Mathematics ch08 (Matrices), plus LaTeX helpers.
// Every product, sum, difference, scalar multiple, equality-of-matrices solution and identity in the
// chapter is recomputed with these functions. All values are JS integers (|v| far below 2^53), so the
// arithmetic is exact; a rational scalar p/q is allowed only when every entry it produces is an integer.
// ICSE 2027 scope: addition, subtraction and multiplication only for matrices up to order 2 x 2
// (row and column matrices of order 1 x 2 and 2 x 1 included); mul() throws for anything larger.

const isInt = (v) => Number.isSafeInteger(v);
function check(A, who) {
  if (!Array.isArray(A) || !A.length || !A.every((row) => Array.isArray(row) && row.length === A[0].length && row.every(isInt)))
    throw new Error(`${who}: not a rectangular integer matrix: ${JSON.stringify(A)}`);
  return A;
}
const small = (A) => A.length <= 2 && A[0].length <= 2;

/** "2 -1; 0 3" -> [[2, -1], [0, 3]] (rows separated by ";"). */
export const mat = (s) => check(s.split(';').map((row) => row.trim().split(/\s+/).map(Number)), `mat("${s}")`);
/** Integer to LaTeX. */
export function num(v) {
  if (!isInt(v)) throw new Error(`num: ${v} is not an integer`);
  return String(Object.is(v, -0) ? 0 : v);
}
/** LaTeX for a matrix (no surrounding $): \begin{bmatrix} a & b \\ c & d \end{bmatrix} */
export const bm = (A) => `\\begin{bmatrix} ${check(A, 'bm').map((row) => row.map(num).join(' & ')).join(' \\\\ ')} \\end{bmatrix}`;
/** LaTeX for a matrix typed as "a b; c d". */
export const M = (s) => bm(mat(s));
/** Reads the numbers back from a bmatrix LaTeX string (used to check option texts). */
export function parseBm(tex) {
  const m = /\\begin\{bmatrix\}([\s\S]*?)\\end\{bmatrix\}/.exec(tex);
  if (!m) throw new Error(`parseBm: no bmatrix in ${tex}`);
  return check(m[1].split('\\\\').map((row) => row.split('&').map((c) => Number(c.trim()))), `parseBm(${tex})`);
}
/** Shape-and-entries key, e.g. "2x1:4,-13". */
export const key = (A) => `${A.length}x${A[0].length}:${A.flat().join(',')}`;
export const optKey = (tex) => key(parseBm(tex));

export const rows = (A) => A.length;
export const cols = (A) => A[0].length;
export const order = (A) => `${rows(A)} \\times ${cols(A)}`;
export const eqM = (A, B) => rows(A) === rows(B) && cols(A) === cols(B) && A.every((row, i) => row.every((a, j) => a === B[i][j]));
export const canAdd = (A, B) => rows(A) === rows(B) && cols(A) === cols(B);
export const canMul = (A, B) => cols(A) === rows(B);
/** Orders only: [m, n] pairs. */
export const canMulO = ([, n], [p]) => n === p;
export const prodOrder = ([m, n], [p, q]) => (n === p ? [m, q] : null);

export function add(A, B) {
  if (!canAdd(check(A, 'add'), check(B, 'add')) || !small(A)) throw new Error('add: orders differ or larger than 2 x 2');
  return A.map((row, i) => row.map((a, j) => a + B[i][j]));
}
export function sub(A, B) {
  if (!canAdd(check(A, 'sub'), check(B, 'sub')) || !small(A)) throw new Error('sub: orders differ or larger than 2 x 2');
  return A.map((row, i) => row.map((a, j) => a - B[i][j]));
}
/** k A for an integer k, or a rational p/q given as [p, q] (every entry must stay an integer). */
export function scal(k, A) {
  const [p, q] = Array.isArray(k) ? k : [k, 1];
  if (!isInt(p) || !isInt(q) || q <= 0 || p === 0) throw new Error(`scal: bad scalar ${k}`);
  return check(A, 'scal').map((row) => row.map((a) => {
    if ((a * p) % q !== 0) throw new Error(`scal: ${p}/${q} x ${a} is not an integer`);
    return (a * p) / q + 0;
  }));
}
export function mul(A, B) {
  check(A, 'mul'); check(B, 'mul');
  if (!canMul(A, B)) throw new Error(`mul: ${order(A)} by ${order(B)} not defined`);
  if (!small(A) || !small(B)) throw new Error('mul: factor larger than 2 x 2 (removed for ICSE 2027)');
  return A.map((row) => B[0].map((_, j) => row.reduce((s, a, k) => s + a * B[k][j], 0) + 0));
}
export const sq = (A) => mul(A, A);
export const I2 = [[1, 0], [0, 1]];
export const O = (m = 2, n = m) => Array.from({ length: m }, () => Array(n).fill(0));
export const flat = (A) => A.flat();
export const sumAll = (A) => A.flat().reduce((s, v) => s + v, 0);
export const trace = (A) => A[0][0] + A[1][1];
export const det = (A) => A[0][0] * A[1][1] - A[0][1] * A[1][0];
/** Transpose (not taught in this chapter; used only to compute a "columns instead of rows" distractor). */
export const T = (A) => A[0].map((_, j) => A.map((row) => row[j]));
/** Entrywise product (a classic wrong method, used for distractors only). */
export const hadamard = (A, B) => A.map((row, i) => row.map((a, j) => a * B[i][j]));

// types
export const isRow = (A) => rows(A) === 1;
export const isCol = (A) => cols(A) === 1;
export const isSquare = (A) => rows(A) === cols(A);
export const isZero = (A) => A.flat().every((v) => v === 0);
export const isIdentity = (A) => isSquare(A) && A.every((row, i) => row.every((v, j) => v === (i === j ? 1 : 0)));

/** p(v): a number in a product term, negatives in brackets. */
const pn = (v) => (v < 0 ? `(${v})` : `${v}`);
/** Row-by-column working for A B as a bmatrix of terms, e.g. 2 \times 1 + 3 \times (-4). */
export function prodWork(A, B) {
  mul(A, B); // compatibility and size checks
  const W = A.map((row) => B[0].map((_, j) => row.map((a, k) => `${pn(a)} \\times ${pn(B[k][j])}`).join(' + ')));
  return `\\begin{bmatrix} ${W.map((row) => row.join(' & ')).join(' \\\\ ')} \\end{bmatrix}`;
}
/** One entry's working, e.g. "3 \times 25 + 10 \times 5" for row i, column j (1-based). */
export function entryWork(A, B, i, j) {
  return A[i - 1].map((a, k) => `${pn(a)} \\times ${pn(B[k][j - 1])}`).join(' + ');
}
export const entry = (A, i, j) => A[i - 1][j - 1];

/** Exact integer solution of a1 x + b1 y = c1, a2 x + b2 y = c2 (throws unless unique and integral). */
export function solveInt(a1, b1, c1, a2, b2, c2) {
  const D = a1 * b2 - a2 * b1;
  if (D === 0) throw new Error('solveInt: no unique solution');
  const x = (c1 * b2 - c2 * b1) / D, y = (a1 * c2 - a2 * c1) / D;
  if (!isInt(x) || !isInt(y)) throw new Error(`solveInt: non-integer solution ${x}, ${y}`);
  return [x + 0, y + 0];
}

// self-checks (run on import)
{
  const A = mat('2 -1; 0 3'), B = mat('4; 5');
  const ok = bm(A) === '\\begin{bmatrix} 2 & -1 \\\\ 0 & 3 \\end{bmatrix}' && eqM(parseBm(bm(A)), A) && key(mul(A, B)) === '2x1:3,15'
    && eqM(mul(A, I2), A) && eqM(mul(I2, A), A) && eqM(scal([1, 2], mat('4 -2; 6 0')), mat('2 -1; 3 0')) && det(A) === 6 && trace(A) === 5
    && prodWork(A, B) === '\\begin{bmatrix} 2 \\times 4 + (-1) \\times 5 \\\\ 0 \\times 4 + 3 \\times 5 \\end{bmatrix}'
    && solveInt(1, 1, 11, 1, -1, 3).join() === '7,4';
  // Cayley-Hamilton for 2 x 2: A^2 - (trace) A + (det) I = O, a check on mul/add/scal
  const C = mat('5 -2; 3 -1');
  if (!ok || !isZero(add(sub(sq(C), scal(trace(C), C)), scal(det(C), I2)))) throw new Error('mat.mjs self-check failed');
  let threw = false;
  try { mul(mat('1 2 3'), mat('1; 2; 3')); } catch { threw = true; }
  if (!threw) throw new Error('mat.mjs: larger-than-2x2 product was not refused');
}
