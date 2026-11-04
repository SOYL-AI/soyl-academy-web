// Exact algebra engine for CBSE 11 Mathematics ch07 Binomial Theorem.
// Two independent routes to every expansion, term and number:
//   (1) the formula route: C(n, r) a^(n-r) b^r with BigInt factorials and rational coefficients;
//   (2) the multiplication route: the n brackets are multiplied out one at a time as exact polynomials
//       (BigInt rational coefficients, any number of variables, negative exponents allowed).
// The build asserts that both routes agree wherever a chapter number is printed.
import { geom, table } from './lib.mjs';

export const r = (s, ...v) => String.raw(s, ...v).replace(/\\n(?![a-z])/g, '\n');
export const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
export const near = (u, v, e = 1e-9) => Math.abs(u - v) < e;
export { table };

// ------------------------------------------------------------------ integers
export const F = (n) => { let x = 1n; for (let i = 2n; i <= BigInt(n); i++) x *= i; return x; };
export const Cm = (n, k) => (k < 0 || k > n ? 0n : F(n) / (F(k) * F(n - k)));
/** Row n of Pascal's triangle by repeated addition (independent of the factorial formula). */
export const pascalRow = (n) => { let row = [1n]; for (let i = 0; i < n; i++) { const nx = [1n]; for (let j = 1; j < row.length; j++) nx.push(row[j - 1] + row[j]); nx.push(1n); row = nx; } return row; };
export const bgcd = (a, b) => { a = a < 0n ? -a : a; b = b < 0n ? -b : b; while (b) [a, b] = [b, a % b]; return a; };
export const modpow = (b, e, m) => { let res = 1n; b = ((BigInt(b) % BigInt(m)) + BigInt(m)) % BigInt(m); e = BigInt(e); m = BigInt(m); while (e > 0n) { if (e & 1n) res = (res * b) % m; b = (b * b) % m; e >>= 1n; } return res; };
/** Binomial coefficient written in LaTeX. */
export const bn = (n, k) => `\\binom{${n}}{${k}}`;

// ------------------------------------------------------------------ rationals
export const fr = (n, d = 1n) => { n = BigInt(n); d = BigInt(d); if (d === 0n) throw new Error('zero denominator'); if (d < 0n) { n = -n; d = -d; } const g = bgcd(n, d) || 1n; return { n: n / g, d: d / g }; };
export const fadd = (x, y) => fr(x.n * y.d + y.n * x.d, x.d * y.d);
export const fsub = (x, y) => fr(x.n * y.d - y.n * x.d, x.d * y.d);
export const fmul = (x, y) => fr(x.n * y.n, x.d * y.d);
export const fneg = (x) => fr(-x.n, x.d);
export const fpow = (x, k) => { let res = fr(1); for (let i = 0; i < k; i++) res = fmul(res, x); return res; };
export const feq = (x, y) => x.n === y.n && x.d === y.d;
export const fzero = (x) => x.n === 0n;
export const fabs = (x) => fr(x.n < 0n ? -x.n : x.n, x.d);
/** LaTeX of a rational: integer, or \dfrac{p}{q} with the sign in front. */
export const fTex = (x) => (x.d === 1n ? `${x.n}` : `${x.n < 0n ? '-' : ''}\\dfrac{${x.n < 0n ? -x.n : x.n}}{${x.d}}`);
export const fStr = (x) => (x.d === 1n ? `${x.n}` : `${x.n}/${x.d}`);
/** Exact terminating decimal of a rational rounded half up to dp places; also reports exactness. */
export function dec(x, dp) {
  const neg = x.n < 0n; const n = neg ? -x.n : x.n;
  const sc = 10n ** BigInt(dp);
  const q = (2n * n * sc + x.d) / (2n * x.d);
  let s = q.toString().padStart(dp + 1, '0');
  if (dp > 0) s = `${s.slice(0, -dp)}.${s.slice(-dp)}`;
  return (neg ? '-' : '') + s;
}
/** Exact decimal string of a rational whose denominator has only the factors 2 and 5. */
export function decExact(x) {
  for (let dp = 0; dp <= 40; dp++) { const sc = 10n ** BigInt(dp); if ((x.n * sc) % x.d === 0n) return dec(x, dp); }
  throw new Error('not a terminating decimal');
}
/** Decimal fraction p/10^k as an exact rational. */
export const decFr = (s) => { const [i, f = ''] = s.split('.'); return fr(BigInt(i + f), 10n ** BigInt(f.length)); };

// ------------------------------------------------------------------ polynomials in several variables (exponents may be negative)
const key = (e) => e.join(',');
export const mono = (c, e) => new Map([[key(e), { c: typeof c === 'object' ? c : fr(c), e: e.slice() }]]);
export const pconst = (c, nv) => mono(c, Array(nv).fill(0));
export function padd(p, q) { const out = new Map(); for (const m of [...p.values(), ...q.values()]) { const k = key(m.e); const cur = out.get(k); const c = cur ? fadd(cur.c, m.c) : m.c; out.set(k, { c, e: m.e }); } for (const [k, m] of out) if (fzero(m.c)) out.delete(k); return out; }
export function pmul(p, q) { const out = new Map(); for (const a of p.values()) for (const b of q.values()) { const e = a.e.map((x, i) => x + b.e[i]); const k = key(e); const cur = out.get(k); const c = cur ? fadd(cur.c, fmul(a.c, b.c)) : fmul(a.c, b.c); out.set(k, { c, e }); } for (const [k, m] of out) if (fzero(m.c)) out.delete(k); return out; }
export const pscale = (p, c) => { const out = new Map(); for (const [k, m] of p) { const cc = fmul(m.c, typeof c === 'object' ? c : fr(c)); if (!fzero(cc)) out.set(k, { c: cc, e: m.e }); } return out; };
export const pneg = (p) => pscale(p, -1);
/** Repeated multiplication: the multiplication route, independent of the binomial formula. */
export function ppow(p, n) { let res = pconst(1, [...p.values()][0].e.length); for (let i = 0; i < n; i++) res = pmul(res, p); return res; }
export const peq = (p, q) => p.size === q.size && [...p].every(([k, m]) => q.has(k) && feq(q.get(k).c, m.c));
export const pcoef = (p, e) => (p.has(key(e)) ? p.get(key(e)).c : fr(0));
/** Terms in descending order of the exponent of the first variable, then the next ones. */
export const pterms = (p) => [...p.values()].sort((a, b) => { for (let i = 0; i < a.e.length; i++) if (a.e[i] !== b.e[i]) return b.e[i] - a.e[i]; return 0; });
export const monoPart = (e, names) => e.map((x, i) => (x === 0 ? '' : x === 1 ? names[i] : `${names[i]}^{${x}}`)).join('');
function termTex(m, names, first) {
  const part = monoPart(m.e, names);
  const neg = m.c.n < 0n;
  const ac = fabs(m.c);
  const body = part === '' ? fTex(ac) : (feq(ac, fr(1)) ? part : `${fTex(ac)}${part}`);
  return first ? `${neg ? '-' : ''}${body}` : ` ${neg ? '-' : '+'} ${body}`;
}
/** Polynomial in LaTeX, descending powers of the first variable (ascending when asc is true). */
export const pTex = (p, names, asc = false) => { const ts = pterms(p); if (asc) ts.reverse(); return ts.map((m, i) => termTex(m, names, i === 0)).join('') || '0'; };

// ------------------------------------------------------------------ the binomial theorem (formula route)
/** a, b are monomials {c, e}. Term T(r+1) = C(n, r) a^(n-r) b^r as a monomial {c, e}. */
export function binTerm(a, b, n, rr) {
  const c = fmul(fr(Cm(n, rr)), fmul(fpow(a.c, n - rr), fpow(b.c, rr)));
  return { c, e: a.e.map((x, i) => (n - rr) * x + rr * b.e[i]) };
}
export const mon = (c, ...e) => ({ c: typeof c === 'object' ? c : fr(c), e });
export const asPoly = (m) => new Map([[key(m.e), m]]);
/** Expansion by the formula, as a polynomial. */
export function binFormula(a, b, n) { let p = new Map(); for (let k = 0; k <= n; k++) p = padd(p, asPoly(binTerm(a, b, n, k))); return p; }
/** Expansion by multiplying n brackets out; asserted equal to the formula. */
export function expand(a, b, n) {
  const byMul = ppow(padd(asPoly(a), asPoly(b)), n);
  const byFormula = binFormula(a, b, n);
  if (!peq(byMul, byFormula)) throw new Error(`binomial formula disagrees with multiplication for n = ${n}`);
  return byMul;
}
/** The terms T1..T(n+1) in order of r, as printable rows. */
export const termsOf = (a, b, n) => range(0, n).map((k) => ({ r: k, ...binTerm(a, b, n, k) }));

// ------------------------------------------------------------------ surds a + b sqrt(d) with BigInt a, b
export const sd = (a, b, d) => ({ a: BigInt(a), b: BigInt(b), d: BigInt(d) });
export const smul = (x, y) => ({ a: x.a * y.a + x.b * y.b * x.d, b: x.a * y.b + x.b * y.a, d: x.d });
export const sadd = (x, y) => ({ a: x.a + y.a, b: x.b + y.b, d: x.d });
export const ssub = (x, y) => ({ a: x.a - y.a, b: x.b - y.b, d: x.d });
export const spow = (x, n) => { let res = { a: 1n, b: 0n, d: x.d }; for (let i = 0; i < n; i++) res = smul(res, x); return res; };
export const sTex = (x) => (x.b === 0n ? `${x.a}` : x.a === 0n ? `${x.b === 1n ? '' : x.b}\\sqrt{${x.d}}` : `${x.a} ${x.b < 0n ? '-' : '+'} ${(x.b < 0n ? -x.b : x.b) === 1n ? '' : (x.b < 0n ? -x.b : x.b)}\\sqrt{${x.d}}`);

// ------------------------------------------------------------------ figures
const rd = (v) => Math.round(v * 1000) / 1000;
/** Pascal's triangle rows 0..nRows-1 as a geometry figure; `hi` = [row, k] of a value that is the sum of its two parents (drawn dashed). */
export function pascalFig(nRows, hi, alt, caption) {
  const W = rd(nRows + 1.4), H = rd((nRows - 1) * 0.95 + 1.4);
  const pos = (n, k) => [rd(W / 2 + (k - n / 2)), rd(H - 0.7 - n * 0.95)];
  const points = {};
  for (let n = 0; n < nRows; n++) { const row = pascalRow(n); row.forEach((v, k) => { points[`P${n}_${k}`] = { at: pos(n, k), label: String(v), label_position: 'e' }; }); }
  const segments = [];
  if (hi) { const [n, k] = hi; segments.push({ from: `P${n - 1}_${k - 1}`, to: `P${n}_${k}`, dashed: true }, { from: `P${n - 1}_${k}`, to: `P${n}_${k}`, dashed: true }); }
  return geom({ width: W, height: H, points, segments, not_to_scale: true }, alt, caption);
}
