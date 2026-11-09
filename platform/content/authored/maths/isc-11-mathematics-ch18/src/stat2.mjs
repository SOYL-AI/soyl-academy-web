// Extra exact tools for ISC 11 Mathematics ch18 (measures of dispersion): exact surd standard deviations, the three
// working tables (direct, short-cut, step-deviation), combined statistics checked by brute force on a real merged
// data set, and correction of a wrongly copied observation. Everything is BigInt rationals (see stat.mjs).
import { Fr, fr, T, tex, isqrt, Dist, cls, sumOf } from './stat.mjs';
import { table } from './lib.mjs';

export { Fr, fr, T, tex, Dist, cls, sumOf };
export const r = String.raw;
const babs = (a) => (a < 0n ? -a : a);
const bgcd = (a, b) => { a = babs(a); b = babs(b); while (b) [a, b] = [b, a % b]; return a; };

/** sqrt(x) for a non-negative rational as p*sqrt(q)/den in lowest terms (q square-free). */
export function surd(x) {
  x = fr(x);
  let n = x.n * x.d, den = x.d; // sqrt(n/d) = sqrt(n d)/d
  let p = 1n, q = 1n;
  let m = n;
  for (let k = 2n; k * k <= m; k += 1n) { while (m % (k * k) === 0n) { m /= k * k; p *= k; } }
  q = m;
  const g = bgcd(p, den);
  p /= g; den /= g;
  return { p, q, den };
}
/** LaTeX of the exact standard deviation sqrt(x): an integer, a fraction, or a surd. */
export function sdTex(x) {
  x = fr(x);
  const e = x.sqrt();
  if (e) return tex(e);
  const { p, q, den } = surd(x);
  const top = `${p === 1n ? '' : p}\\sqrt{${q}}`;
  return den === 1n ? top : `\\dfrac{${top}}{${den}}`;
}
/** Check the exact surd: (p sqrt q / den)^2 equals x and q is square-free. */
export function surdOk(x) {
  x = fr(x);
  const { p, q, den } = surd(x);
  let sqfree = true;
  for (let k = 2n; k * k <= q; k += 1n) if (q % (k * k) === 0n) sqfree = false;
  return sqfree && new Fr(p * p * q, den * den).eq(x);
}
/** Standard deviation to dp places, exact (integer square root) and independently re-checked. */
export function sdRound(x, dp = 2) {
  x = fr(x);
  const s = x.sqrtRound(dp);
  // independent check: the rounded value lies within half a unit in the last place of the true root
  const v = fr(s), half = fr(1).div(2 * 10 ** dp);
  const lo = v.sub(half).pow(2), hi = v.add(half).pow(2);
  if (!(lo.cmp(x) <= 0 && x.cmp(hi) <= 0)) throw new Error(`sd rounding failed for ${x}: ${s}`);
  return s;
}
/** Percentage SD/mean to dp places, with the same independent check. */
export function cvRound(sdSq, mean, dp = 1) {
  const v = fr(sdSq).div(fr(mean).pow(2)).mul(10000);
  const s = v.sqrtRound(dp);
  const a = fr(s), half = fr(1).div(2 * 10 ** dp);
  if (!(a.sub(half).pow(2).cmp(v) <= 0 && v.cmp(a.add(half).pow(2)) <= 0)) throw new Error(`cv rounding failed ${v}`);
  return s;
}

// ---------------------------------------------------------------- working tables generated from the data
const labelX = (d, i) => (d.kind === 'grouped' ? cls(d, i) : T(d.x[i]));
const isRaw = (d) => d.kind === 'raw';
/** Direct method: x, f, fx, (x - mean), squared, f times squared. mean must be a terminating decimal. */
export function dirTable(d) {
  const m = d.mean, raw = isRaw(d);
  const head = [d.kind === 'grouped' ? 'Class' : '$x$', ...(d.kind === 'grouped' ? ['Mark $x$'] : []), ...(raw ? [] : ['$f$', '$fx$']), r`$x - \bar{x}$`, r`$(x - \bar{x})^2$`, ...(raw ? [] : [r`$f(x - \bar{x})^2$`])];
  const rows = d.x.map((x, i) => [labelX(d, i), ...(d.kind === 'grouped' ? [T(x)] : []), ...(raw ? [] : [T(d.f[i]), T(d.f[i].mul(x))]), T(x.sub(m)), T(x.sub(m).pow(2)), ...(raw ? [] : [T(d.f[i].mul(x.sub(m).pow(2)))])]);
  const ssq = d.sumF((x) => x.sub(m).pow(2));
  const tot = ['Total', ...(d.kind === 'grouped' ? [''] : []), ...(raw ? [] : [T(d.n), T(d.sumFx)]), T(d.sumF((x) => x.sub(m))), raw ? T(ssq) : '', ...(raw ? [] : [T(ssq)])];
  return { head, rows: [...rows, tot] };
}
/** Short-cut (assumed mean) method: x, f, d = x - A, fd, fd^2. */
export function shortTable(d, A) {
  A = fr(A);
  const raw = isRaw(d);
  const head = [d.kind === 'grouped' ? 'Class' : '$x$', ...(d.kind === 'grouped' ? ['Mark $x$'] : []), ...(raw ? [] : ['$f$']), `$d = x - ${T(A)}$`, ...(raw ? [] : ['$fd$']), raw ? '$d^2$' : '$fd^2$'];
  const rows = d.x.map((x, i) => [labelX(d, i), ...(d.kind === 'grouped' ? [T(x)] : []), ...(raw ? [] : [T(d.f[i])]), T(x.sub(A)), ...(raw ? [] : [T(d.f[i].mul(x.sub(A)))]), T(d.f[i].mul(x.sub(A).pow(2)))]);
  const sd = d.sumF((x) => x.sub(A)), sd2 = d.sumF((x) => x.sub(A).pow(2));
  const tot = ['Total', ...(d.kind === 'grouped' ? [''] : []), ...(raw ? [] : [T(d.n)]), raw ? T(sd) : '', ...(raw ? [] : [T(sd)]), T(sd2)];
  return { head, rows: [...rows, tot] };
}
/** Sums used in the short-cut and step formulas. */
export function sums(d, A, h = 1) {
  A = fr(A); h = fr(h);
  return { n: d.n, sd: d.sumF((x) => x.sub(A)), sd2: d.sumF((x) => x.sub(A).pow(2)), su: d.sumF((x) => x.sub(A).div(h)), su2: d.sumF((x) => x.sub(A).div(h).pow(2)), sx: d.sumFx, sx2: d.sumF((x) => x.pow(2)) };
}
export const asTable = ({ head, rows }, alt, caption) => table(head, rows, alt, caption);
export { stepTable, mdTable } from './stat.mjs';

// ---------------------------------------------------------------- combined statistics
/** Combined size, mean and variance of two groups from (n, mean, variance) by the d_i formula. */
export function combine(g1, g2) {
  const n1 = fr(g1.n), n2 = fr(g2.n), m1 = fr(g1.mean), m2 = fr(g2.mean), v1 = fr(g1.var), v2 = fr(g2.var);
  const n = n1.add(n2);
  const mean = n1.mul(m1).add(n2.mul(m2)).div(n);
  const d1 = m1.sub(mean), d2 = m2.sub(mean);
  const v = n1.mul(v1.add(d1.pow(2))).add(n2.mul(v2.add(d2.pow(2)))).div(n);
  return { n, mean, d1, d2, var: v };
}
/** A raw list of n values (n even, integer sd >= 0) with exactly the given mean and standard deviation. */
export function synth(n, mean, sd) {
  if (n % 2) throw new Error('synth needs even n');
  const m = fr(mean), s = fr(sd);
  return [...Array(n / 2).fill(m.add(s)), ...Array(n / 2).fill(m.sub(s))];
}
/** Brute-force check of combine(): build real data for both groups (or take given raw lists), merge, recompute. */
export function checkCombine(g1, g2, raw1 = null, raw2 = null) {
  const a = raw1 ?? synth(Number(fr(g1.n).n), g1.mean, fr(g1.var).sqrt() ?? (() => { throw new Error('sd not rational'); })());
  const b = raw2 ?? synth(Number(fr(g2.n).n), g2.mean, fr(g2.var).sqrt() ?? (() => { throw new Error('sd not rational'); })());
  const da = Dist.raw(a), db = Dist.raw(b);
  if (!da.mean.eq(g1.mean) || !da.variance.eq(g1.var) || !db.mean.eq(g2.mean) || !db.variance.eq(g2.var)) throw new Error('synthetic groups do not match the given statistics');
  const all = Dist.raw([...a, ...b]);
  const c = combine(g1, g2);
  if (!all.mean.eq(c.mean) || !all.variance.eq(c.var) || !all.n.eq(c.n)) throw new Error(`combined formula ${c.var} vs merged data ${all.variance}`);
  return c;
}

// ---------------------------------------------------------------- correcting a copied observation
/** Statistics after replacing one observation of a raw list, from the sums only (n, sum x, sum x^2 as the question gives them). */
export function correct(n, mean, variance, wrong, right) {
  n = fr(n); mean = fr(mean); variance = fr(variance); wrong = fr(wrong); right = fr(right);
  const sx = n.mul(mean), sx2 = n.mul(variance.add(mean.pow(2)));
  const nsx = sx.sub(wrong).add(right), nsx2 = sx2.sub(wrong.pow(2)).add(right.pow(2));
  const nm = nsx.div(n), nv = nsx2.div(n).sub(nm.pow(2));
  return { sx, sx2, nsx, nsx2, mean: nm, var: nv };
}
/** Build a raw list consistent with (n, mean, variance) where one entry equals wrong, to brute-force check correct(). */
export function checkCorrect(rawRight, idx, wrong) {
  const right = rawRight[idx];
  const wr = rawRight.map((x, i) => (i === idx ? fr(wrong) : fr(x)));
  const dw = Dist.raw(wr), dr = Dist.raw(rawRight);
  const c = correct(dw.n, dw.mean, dw.variance, wrong, right);
  if (!c.mean.eq(dr.mean) || !c.var.eq(dr.variance)) throw new Error('correction formula disagrees with the true list');
  return { wrong: dw, right: dr, c };
}
