// Exact engine for ISC 11 Mathematics ch09 Binomial Theorem.
// Every expansion, term and coefficient has independent routes:
//   (1) formula: C(n, r) a^(n-r) b^r with BigInt factorials and exact rational coefficients;
//   (2) multiplication: the n brackets are multiplied out one at a time as exact Laurent polynomials in x and y;
//   (3) counting: the coefficient of x^r in (1 + x)^n is the number of r-subsets of the n brackets (small n);
//   (4) Pascal rows are built by repeated addition.
export const r = (s, ...v) => String.raw(s, ...v).replace(/\\n(?![a-z])/g, '\n');
export const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
export const F = (n) => { let x = 1n; for (let i = 2n; i <= BigInt(n); i++) x *= i; return x; };
export const Cm = (n, k) => (k < 0 || k > n ? 0n : F(n) / (F(k) * F(n - k)));
export const pascalRow = (n) => { let row = [1n]; for (let i = 0; i < n; i++) { const nx = [1n]; for (let j = 1; j < row.length; j++) nx.push(row[j - 1] + row[j]); nx.push(1n); row = nx; } return row; };
export function* kCombs(items, k, start = 0, cur = []) {
  if (cur.length === k) { yield cur.slice(); return; }
  for (let i = start; i < items.length; i++) { cur.push(items[i]); yield* kCombs(items, k, i + 1, cur); cur.pop(); }
}
export const count = (gen, pred = () => true) => { let c = 0; for (const x of gen) if (pred(x)) c++; return c; };
export const S = (v) => String(v);
export const N = (v) => Number(v);
export const bn = (n, k) => `\\binom{${n}}{${k}}`;
export const pw = (b, e) => { let x = 1n; for (let i = 0; i < e; i++) x *= BigInt(b); return x; };

// ------------------------------------------------------------------ rationals {n, d}
const gcdB = (a, b) => { a = a < 0n ? -a : a; b = b < 0n ? -b : b; while (b) [a, b] = [b, a % b]; return a; };
export const fr = (n, d = 1n) => { n = BigInt(n); d = BigInt(d); if (d === 0n) throw new Error('zero denominator'); if (d < 0n) { n = -n; d = -d; } const g = gcdB(n, d) || 1n; return { n: n / g, d: d / g }; };
export const fadd = (x, y) => fr(x.n * y.d + y.n * x.d, x.d * y.d);
export const fmul = (x, y) => fr(x.n * y.n, x.d * y.d);
export const fpow = (x, k) => { let t = fr(1); for (let i = 0; i < k; i++) t = fmul(t, x); return t; };
export const feq = (x, y) => x.n === y.n && x.d === y.d;
export const fabs = (x) => fr(x.n < 0n ? -x.n : x.n, x.d);
export const fTex = (x) => (x.d === 1n ? `${x.n}` : `${x.n < 0n ? '-' : ''}\\dfrac{${x.n < 0n ? -x.n : x.n}}{${x.d}}`);
export const fNum = (x) => Number(x.n) / Number(x.d);
/** Decimal string of a rational rounded half up to dp places (exact big-integer arithmetic). */
export function dec(x, dp) {
  const neg = x.n < 0n; const n = neg ? -x.n : x.n; const sc = 10n ** BigInt(dp);
  const q = (2n * n * sc + x.d) / (2n * x.d);
  let s = q.toString().padStart(dp + 1, '0'); if (dp > 0) s = `${s.slice(0, -dp)}.${s.slice(-dp)}`;
  return (neg ? '-' : '') + s;
}
export const decFr = (s) => { const [i, f = ''] = s.split('.'); return fr(BigInt(i + f), 10n ** BigInt(f.length)); };

// ------------------------------------------------------------------ Laurent polynomials in (x, y): Map "ex,ey" -> {c, e}
const key = (e) => e.join(',');
export const mon = (c, ex = 0, ey = 0) => ({ c: typeof c === 'object' ? c : fr(c), e: [ex, ey] });
const asP = (m) => new Map([[key(m.e), m]]);
function padd(p, q) { const o = new Map(); for (const m of [...p.values(), ...q.values()]) { const k = key(m.e); const cur = o.get(k); const c = cur ? fadd(cur.c, m.c) : m.c; o.set(k, { c, e: m.e }); } for (const [k, m] of [...o]) if (m.c.n === 0n) o.delete(k); return o; }
function pmul(p, q) { const o = new Map(); for (const a of p.values()) for (const b of q.values()) { const e = a.e.map((x, i) => x + b.e[i]); const k = key(e); const cur = o.get(k); const c = cur ? fadd(cur.c, fmul(a.c, b.c)) : fmul(a.c, b.c); o.set(k, { c, e }); } for (const [k, m] of [...o]) if (m.c.n === 0n) o.delete(k); return o; }
const peq = (p, q) => p.size === q.size && [...p].every(([k, m]) => q.has(k) && feq(q.get(k).c, m.c));
export const coefAt = (p, ex, ey = 0) => (p.has(key([ex, ey])) ? p.get(key([ex, ey])).c : fr(0));
export const terms = (p) => [...p.values()].sort((a, b) => b.e[0] - a.e[0] || b.e[1] - a.e[1]);
/** T(r+1) of (a + b)^n as a monomial. */
export function termAt(a, b, n, rr) {
  return { c: fmul(fr(Cm(n, rr)), fmul(fpow(a.c, n - rr), fpow(b.c, rr))), e: a.e.map((x, i) => (n - rr) * x + rr * b.e[i]) };
}
/** Expansion by the formula, as a polynomial. */
export const byFormula = (a, b, n) => range(0, n).reduce((p, k) => padd(p, asP(termAt(a, b, n, k))), new Map());
/** Expansion by multiplying n brackets; agrees with the formula or throws. */
export function expand(a, b, n) {
  let p = asP({ c: fr(1), e: [0, 0] }); const br = padd(asP(a), asP(b));
  for (let i = 0; i < n; i++) p = pmul(p, br);
  if (!peq(p, byFormula(a, b, n))) throw new Error(`formula and multiplication disagree for n = ${n}`);
  return p;
}
export const termList = (a, b, n) => range(0, n).map((k) => ({ r: k, ...termAt(a, b, n, k) }));
/** Monomial part in LaTeX, e.g. x^{3}y^{2}. */
const part = (e, names, sign) => e.map((x, i) => (x * sign > 0 ? (Math.abs(x) === 1 ? names[i] : `${names[i]}^{${Math.abs(x)}}`) : '')).join('');
/** Monomial in LaTeX; negative powers go under the fraction bar. Sign printed only if showSign. */
export function monoTex(m, names = ['x', 'y']) {
  const neg = m.c.n < 0n; const a = fabs(m.c);
  const top = part(m.e, names, 1), bot = part(m.e, names, -1);
  const numer = top === '' ? `${a.n}` : (a.n === 1n ? top : `${a.n}${top}`);
  const denom = bot === '' ? (a.d === 1n ? '' : `${a.d}`) : (a.d === 1n ? bot : `${a.d}${bot}`);
  const body = denom === '' ? numer : `\\dfrac{${numer}}{${denom}}`;
  return `${neg ? '-' : ''}${body}`;
}
/** Polynomial in LaTeX, descending powers of x then y. */
export function polyTex(p, names = ['x', 'y']) {
  return terms(p).map((m, i) => { const t = monoTex({ c: fabs(m.c), e: m.e }, names); return i === 0 ? `${m.c.n < 0n ? '-' : ''}${t}` : ` ${m.c.n < 0n ? '-' : '+'} ${t}`; }).join('') || '0';
}
/** Signed coefficient list (descending powers of x) for a one-variable expansion. */
export const coefList = (p) => terms(p).map((m) => m.c);

// ------------------------------------------------------------------ surds a + b sqrt(d), BigInt a, b
export const sd = (a, b, d) => ({ a: BigInt(a), b: BigInt(b), d: BigInt(d) });
export const smul = (u, v) => sd(u.a * v.a + u.b * v.b * u.d, u.a * v.b + u.b * v.a, u.d);
export const sadd = (u, v) => sd(u.a + v.a, u.b + v.b, u.d);
export const ssub = (u, v) => sd(u.a - v.a, u.b - v.b, u.d);
export const spow = (u, n) => { let t = sd(1, 0, u.d); for (let i = 0; i < n; i++) t = smul(t, u); return t; };
export const sTex = (u) => `${u.a === 0n ? '' : u.a}${u.b === 0n ? '' : `${u.b > 0n && u.a !== 0n ? ' + ' : u.b < 0n ? ' - ' : ''}${(u.b < 0n ? -u.b : u.b) === 1n ? '' : (u.b < 0n ? -u.b : u.b)}\\sqrt{${u.d}}`}` || '0';
