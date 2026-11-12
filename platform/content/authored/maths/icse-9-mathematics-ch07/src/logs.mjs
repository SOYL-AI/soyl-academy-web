// Exact logarithm bookkeeping for ICSE 9 Mathematics ch07 Logarithms (writer helper).
// Three independent tools, so that no answer in the chapter rests on a typed number alone:
//   1. Prime-exponent vectors with exact rational exponents. log N = sum of e_p log p, so every law-based
//      simplification (log 12 = 2 log 2 + log 3) is checked by comparing vectors EXACTLY, and again numerically to 1e-12.
//   2. logExact(b, a): the exact rational value of log_b a when a is a rational power of b (vectors proportional), else null.
//      powEq(b, x, N) confirms b^x = N with BigInt arithmetic (x rational).
//   3. Given-value arithmetic: log 2 = 0.3010, log 3 = 0.4771, ... are scaled integers, and a combination such as
//      log 72 = 3 log 2 + 2 log 3 is evaluated exactly (no floating point) and written as a decimal string.
// Numbers are positive integers, [n, d] pairs, or already-built vectors.

const gcd = (a, b) => (b === 0 ? Math.abs(a) : gcd(b, a % b));
export const rat = (n, d = 1) => {
  if (d === 0) throw new Error('zero denominator');
  if (d < 0) { n = -n; d = -d; }
  const k = gcd(n, d) || 1;
  return { n: n / k, d: d / k };
};
const radd = (a, b) => rat(a.n * b.d + b.n * a.d, a.d * b.d);
const rmul = (a, b) => rat(a.n * b.n, a.d * b.d);
export const rEq = (a, b) => a.n === b.n && a.d === b.d;
const toRat = (x) => (typeof x === 'number' ? rat(x) : Array.isArray(x) ? rat(x[0], x[1]) : x);
export const rNum = (x) => x.n / x.d;
/** TeX of a rational: 3, -3, \dfrac{3}{2}, -\dfrac{3}{2}. */
export const ratTex = (x) => (x.d === 1 ? String(x.n) : `${x.n < 0 ? '-' : ''}\\dfrac{${Math.abs(x.n)}}{${x.d}}`);

function primes(n) {
  const out = {};
  for (let p = 2; p * p <= n; p++) while (n % p === 0) { out[p] = (out[p] ?? 0) + 1; n /= p; }
  if (n > 1) out[n] = (out[n] ?? 0) + 1;
  return out;
}
/** Prime-exponent vector {p: Rat} of a positive integer or [n, d] pair (an existing vector passes through). */
export function vecOf(N) {
  if (N && typeof N === 'object' && !Array.isArray(N)) return N;
  const [n, d] = Array.isArray(N) ? N : [N, 1];
  if (!(n > 0 && d > 0) || !Number.isInteger(n) || !Number.isInteger(d)) throw new Error(`vecOf: ${N} is not a positive rational`);
  const v = {};
  for (const [p, e] of Object.entries(primes(n))) v[p] = rat(e);
  for (const [p, e] of Object.entries(primes(d))) v[p] = radd(v[p] ?? rat(0), rat(-e));
  return clean(v);
}
const clean = (v) => Object.fromEntries(Object.entries(v).filter(([, e]) => e.n !== 0));
/** Sum of coef * vecOf(N) over terms [[coef, N], ...]; coef is an integer or [n, d]. */
export function vcomb(terms) {
  const out = {};
  for (const [c, N] of terms) for (const [p, e] of Object.entries(vecOf(N))) out[p] = radd(out[p] ?? rat(0), rmul(toRat(c), e));
  return clean(out);
}
export const vEq = (a, b) => {
  const A = clean(vecOf(a)), B = clean(vecOf(b));
  const ks = new Set([...Object.keys(A), ...Object.keys(B)]);
  return [...ks].every((k) => A[k] && B[k] && rEq(A[k], B[k]));
};
/** Exact law check: sum of coef * log N equals log target as prime vectors AND numerically to 1e-12 (any base). */
export function law(terms, target, base = 10) {
  const num = terms.reduce((s, [c, N]) => s + rNum(toRat(c)) * lg(N, base), 0);
  return vEq(vcomb(terms), vecOf(target)) && Math.abs(num - lg(target, base)) < 1e-12;
}
export const val = (N) => (Array.isArray(N) ? N[0] / N[1] : N);
export const lg = (N, base = 10) => Math.log(val(N)) / Math.log(val(base));

/** Exact log_b a as a Rat when a is a rational power of b, else null. */
export function logExact(b, a) {
  const vb = vecOf(b), va = vecOf(a);
  const kb = Object.keys(vb);
  if (!kb.length) return null; // base 1
  const x = rmul(va[kb[0]] ?? rat(0), rat(vb[kb[0]].d, vb[kb[0]].n));
  const scaled = Object.fromEntries(kb.map((p) => [p, rmul(x, vb[p])]));
  return vEq(scaled, va) ? x : null;
}
/** b^x = N exactly, for rational x = p/q: b^p = N^q (BigInt). */
export function powEq(b, x, N) {
  const X = toRat(x);
  const [bn, bd] = Array.isArray(b) ? b : [b, 1];
  const [nn, nd] = Array.isArray(N) ? N : [N, 1];
  const pw = (v, e) => v ** BigInt(e);
  const p = Math.abs(X.n), q = X.d;
  let lhsN = pw(BigInt(bn), p), lhsD = pw(BigInt(bd), p);
  if (X.n < 0) [lhsN, lhsD] = [lhsD, lhsN];
  const rhsN = pw(BigInt(nn), q), rhsD = pw(BigInt(nd), q);
  return lhsN * rhsD === rhsN * lhsD;
}
/** Number of digits of b^e (exact, BigInt). */
export const digitsOf = (b, e) => String(BigInt(b) ** BigInt(e)).length;
/** Smallest integer n >= 1 with b^n > N (exact, BigInt). */
export const firstPowerAbove = (b, N) => { let n = 1, v = BigInt(b); while (v <= BigInt(N)) { v *= BigInt(b); n++; } return n; };

// ---------------------------------------------------------------- given values in decimals (exact)
/** Four-place common logarithms as given in a problem statement, scaled by 10^4. */
export const GV = { 2: 3010, 3: 4771, 5: 6990, 7: 8451 };
/** Exact decimal string of a Rat whose denominator divides a power of 10; throws otherwise. */
export function decStr(x) {
  let d = x.d, k = 0;
  while (d % 10 === 0) { d /= 10; k++; }
  let t2 = 0, t5 = 0;
  while (d % 2 === 0) { d /= 2; t2++; }
  while (d % 5 === 0) { d /= 5; t5++; }
  if (d !== 1) throw new Error(`decStr: ${x.n}/${x.d} does not terminate`);
  const places = k + Math.max(t2, t5);
  const scaled = (x.n * 10 ** places) / x.d;
  if (!Number.isInteger(scaled)) throw new Error('decStr: scaling failed');
  const neg = scaled < 0;
  let s = String(Math.abs(scaled)).padStart(places + 1, '0');
  if (places) s = `${s.slice(0, -places)}.${s.slice(-places)}`;
  return (neg ? '-' : '') + s;
}
/** Value of sum coef * log N from the given decimals, as an exact Rat (each N must factor over the given primes). */
export function fromGivenRat(terms, gv = GV) {
  const v = vcomb(terms);
  let total = rat(0);
  for (const [p, e] of Object.entries(v)) {
    if (!(p in gv)) throw new Error(`no given value for log ${p}`);
    total = radd(total, rmul(e, rat(gv[p], 10000)));
  }
  return total;
}
/** The same, as an exact decimal string (e.g. 3 log 2 + 2 log 3 = 1.8572). */
export const fromGiven = (terms, gv = GV) => decStr(fromGivenRat(terms, gv));
/** Plain decimal value for tolerance checks. */
export const fromGivenNum = (terms, gv = GV) => rNum(fromGivenRat(terms, gv));
/** Exact decimal arithmetic on strings: a + b, a - b, a * b for terminating decimals. */
const toR = (s) => { const t = String(s); const i = t.indexOf('.'); const k = i < 0 ? 0 : t.length - i - 1; return rat(Number(t.replace('.', '')), 10 ** k); };
export const dadd = (a, b) => decStr(radd(toR(a), toR(b)));
export const dsub = (a, b) => decStr(radd(toR(a), rmul(toR(b), rat(-1))));
export const dmul = (a, b) => decStr(rmul(toR(a), toR(b)));
export const ddiv = (a, b) => rNum(rmul(toR(a), rat(toR(b).d, toR(b).n)));
export const near = (u, w, t = 1e-9) => Math.abs(u - w) < t;
