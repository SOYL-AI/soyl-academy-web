// Exact arithmetic for CBSE 11 Mathematics ch08 Sequences and Series (builds on the exact rationals of gp.mjs, a copy of the
// ICSE 10 ch10 module). Everything is computed twice: by a closed formula and by listing the sequence or adding its terms.
//   * AP: a_n = a + (n-1)d and S_n = (n/2)(2a + (n-1)d) = (n/2)(a + l), each against the listed terms;
//   * GP: a r^{n-1} and S_n by both closed forms, each against the listed terms (the GP class of gp.mjs);
//   * infinite GP: S = a/(1-r) for |r| < 1, checked through the exact remainder S - S_n = a r^n/(1-r) and a four-hundred-term partial sum;
//   * AM and GM of two numbers, the AM-GM inequality (A^2 >= ab with equality only for a = b) and numbers inserted between two numbers;
//   * recurring decimals as infinite GPs, checked by long division of the resulting fraction;
//   * sums of the first n natural numbers, squares and cubes by formula and by adding.
import { Q as Rat, q, GP, gp, rationalRoots, ratioOf } from './gp.mjs';

export { Rat, q, GP, gp, rationalRoots, ratioOf };
export const r = (s, ...v) => String.raw(s, ...v).replace(/\\n(?![a-z])/g, '\n');
export const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
const assert = (c, m) => { if (!c) throw new Error(`seq check failed: ${m}`); };
export const ZERO = q(0), ONE = q(1);
export const sumList = (L) => L.map(Rat.of).reduce((s, t) => s.add(t), ZERO);
export const N = (x) => (typeof x === 'bigint' ? Number(x) : Rat.of(x).num());
/** TeX of a rational. */
export const tx = (x) => Rat.of(x).tex();
/** "3, 5, 9, 17" from terms. */
export const lst = (L) => L.map(tx).join(', ');
export const lstDots = (L) => `${lst(L)}, \\ldots`;
/** "3 + 5 + 9" with signs folded in. */
export const addTex = (L) => L.map(Rat.of).map((t, i) => (i === 0 ? t.tex() : `${t.sign() < 0 ? ' - ' : ' + '}${t.abs().tex()}`)).join('');

// ---------------------------------------------------------------- arithmetic progressions
export class AP {
  constructor(a, d) { this.a = Rat.of(a); this.d = Rat.of(d); Object.freeze(this); }
  list(n) { const out = [this.a]; while (out.length < n) out.push(out[out.length - 1].add(this.d)); return out; }
  term(n) { const v = this.a.add(this.d.mul(n - 1)); assert(v.eq(this.list(n)[n - 1]), `a_${n} formula vs listing`); return v; }
  sum(n) {
    const L = sumList(this.list(n));
    const f1 = this.a.mul(2).add(this.d.mul(n - 1)).mul(n).div(2);
    const f2 = this.a.add(this.term(n)).mul(n).div(2);
    assert(f1.eq(L) && f2.eq(L), `S_${n} formulas vs listing`);
    return L;
  }
  /** Index of the term equal to t, or null (unique). */
  whichTerm(t, max = 400) { t = Rat.of(t); const h = this.list(max).map((x, i) => (x.eq(t) ? i + 1 : 0)).filter(Boolean); assert(h.length <= 1, 'repeated value in an AP'); return h[0] ?? null; }
  /** Index n with S_n = S, or null. */
  termsForSum(S, max = 400) { S = Rat.of(S); let s = ZERO; const h = []; this.list(max).forEach((t, i) => { s = s.add(t); if (s.eq(S)) h.push(i + 1); }); return h[0] ?? null; }
}
export const ap = (a, d) => new AP(a, d);
/** The AP through a_p = Ap and a_m = Am. */
export function apFromTwo(p, Ap, m, Am) {
  const d = Rat.of(Am).sub(Ap).div(m - p), a = Rat.of(Ap).sub(d.mul(p - 1));
  const g = ap(a, d);
  assert(g.term(p).eq(Ap) && g.term(m).eq(Am), 'AP from two terms');
  return g;
}
/** a_n from S_n = A n^2 + B n (listing S_n for n = 1..40 and subtracting); returns {a, d, A, B}. */
export function apFromSumRule(A, B) {
  const S = (n) => Rat.of(A).mul(n * n).add(Rat.of(B).mul(n));
  const a = S(1), d = S(2).sub(S(1)).sub(S(1));
  const g = ap(a, d);
  for (let n = 1; n <= 40; n++) assert(g.sum(n).eq(S(n)), `S_${n} rule`);
  for (let n = 2; n <= 40; n++) assert(S(n).sub(S(n - 1)).eq(g.term(n)), `a_${n} = S_n - S_(n-1)`);
  return g;
}

// ---------------------------------------------------------------- means and the AM-GM inequality
export const am = (a, b) => Rat.of(a).add(b).div(2);
/** Exact positive geometric mean sqrt(ab) as a rational, or null when it is irrational. */
export function gmExact(a, b) { const p = Rat.of(a).mul(b); const rs = rationalRoots(p, 2).filter((x) => x.sign() > 0); return rs[0] ?? null; }
/** AM >= GM for positive a, b, checked as A^2 >= ab; equality iff a = b. Returns { A, G (rational or null), gap2 = A^2 - ab }. */
export function amGm(a, b) {
  a = Rat.of(a); b = Rat.of(b);
  assert(a.sign() > 0 && b.sign() > 0, 'AM-GM needs positive numbers');
  const A = am(a, b), gap2 = A.mul(A).sub(a.mul(b));
  assert(gap2.sign() >= 0, `A^2 >= ab for ${a}, ${b}`);
  assert(gap2.isZero() === a.eq(b), 'equality iff a = b');
  assert(gap2.eq(a.sub(b).mul(a.sub(b)).div(4)), 'A^2 - ab = (a-b)^2 / 4');
  return { A, G: gmExact(a, b), gap2 };
}
/** n arithmetic means between a and b: the AP with a_1 = a and a_(n+2) = b. */
export function insertAMs(a, b, n) {
  const d = Rat.of(b).sub(a).div(n + 1), g = ap(a, d), L = g.list(n + 2);
  assert(L[n + 1].eq(b), 'last term is b');
  return { d, all: L, means: L.slice(1, -1), sumOfMeans: sumList(L.slice(1, -1)), ap: g };
}
/** Every GP with n geometric means between a and b: r^(n+1) = b/a. Each is listed and checked. */
export function insertGMs(a, b, n) {
  a = Rat.of(a); b = Rat.of(b);
  return rationalRoots(b.div(a), n + 1).map((ratio) => {
    const g = gp(a, ratio), L = g.list(n + 2);
    assert(L[n + 1].eq(b), 'last term is b');
    return { r: ratio, all: L, means: L.slice(1, -1), productOfMeans: L.slice(1, -1).reduce((p, x) => p.mul(x), ONE), gp: g };
  });
}

// ---------------------------------------------------------------- infinite geometric series
/** S_infinity = a / (1 - r) for |r| < 1, with the exact remainder S - S_n = a r^n / (1 - r) checked for n = 1..40. */
export function infSum(a, ratio) {
  a = Rat.of(a); ratio = Rat.of(ratio);
  assert(ratio.abs().lt(1) && !ratio.isZero(), `|r| < 1 needed, got ${ratio}`);
  const S = a.div(ONE.sub(ratio)), g = gp(a, ratio);
  for (let n = 1; n <= 40; n++) assert(S.sub(g.sum(n)).eq(a.mul(ratio.pow(n)).div(ONE.sub(ratio))), `remainder after ${n} terms`);
  assert(S.sub(g.sum(400)).abs().lt(new Rat(1n, 10n ** 6n)), 'four hundred terms are within 1e-6 of the sum');
  return S;
}
/** Least n with |S - S_n| < eps (exact). */
export function termsWithin(a, ratio, eps) {
  const S = infSum(a, ratio), g = gp(a, ratio);
  for (let n = 1; n <= 400; n++) if (S.sub(g.sum(n)).abs().lt(eps)) return n;
  return null;
}
/** The first n decimal digits of a fraction in [0,1), by long division. */
export function digits(x, n) { x = Rat.of(x); let rem = x.n, out = ''; for (let i = 0; i < n; i++) { rem *= 10n; out += (rem / x.d).toString(); rem %= x.d; } return out; }
/** Value of 0.p(block repeated) as an infinite GP: p / 10^k + (block / 10^(k+m)) / (1 - 10^-m); checked by long division. */
export function recurring(prefix, block) {
  const k = prefix.length, m = block.length;
  const pre = new Rat(BigInt(prefix || '0'), 10n ** BigInt(k));
  const first = new Rat(BigInt(block), 10n ** BigInt(k + m));
  const ratio = new Rat(1n, 10n ** BigInt(m));
  const v = pre.add(infSum(first, ratio));
  assert(digits(v, 40) === (prefix + block.repeat(40)).slice(0, 40), `long division of ${v} reproduces 0.${prefix}(${block})`);
  return { value: v, first, ratio, pre };
}

// ---------------------------------------------------------------- sums of n, n^2 and n^3
export const sumK = (n, p) => { let s = 0n; for (let k = 1n; k <= BigInt(n); k++) s += k ** BigInt(p); return s; };
export function powerSums(n) {
  const b = BigInt(n);
  const f1 = (b * (b + 1n)) / 2n, f2 = (b * (b + 1n) * (2n * b + 1n)) / 6n, f3 = f1 * f1;
  assert(f1 === sumK(n, 1) && f2 === sumK(n, 2) && f3 === sumK(n, 3), `power sums for n = ${n}`);
  return { s1: f1, s2: f2, s3: f3 };
}
