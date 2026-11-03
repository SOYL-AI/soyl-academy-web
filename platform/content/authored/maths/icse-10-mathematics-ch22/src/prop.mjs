// Exact arithmetic for ICSE 10 Mathematics ch06 Ratio and Proportion.
// - Fr: BigInt rationals (no floating point anywhere in a key).
// - Kinds of ratio, proportionals and proportion tests on exact rationals.
// - ev(): a tiny exact expression evaluator (variables a..z, + - * / ^ integer powers, sqrt of perfect
//   squares, implicit multiplication) used to re-check equations by substitution and identities at
//   several fixed points.
// Every helper throws when a result would not be exact, so a key can never be a rounded float.

const babs = (x) => (x < 0n ? -x : x);
const bgcd = (a, b) => { a = babs(a); b = babs(b); while (b) [a, b] = [b, a % b]; return a; };
function isqrt(n) {
  if (n < 0n) return null;
  if (n < 2n) return n;
  let x = BigInt(Math.floor(Math.sqrt(Number(n))));
  while (x * x > n) x--;
  while ((x + 1n) * (x + 1n) <= n) x++;
  return x;
}
function icbrt(n) {
  const neg = n < 0n;
  const m = babs(n);
  let x = BigInt(Math.round(Math.cbrt(Number(m))));
  while (x * x * x > m) x--;
  while ((x + 1n) * (x + 1n) * (x + 1n) <= m) x++;
  return neg ? -x : x;
}

export class Fr {
  constructor(n, d = 1n) {
    n = BigInt(n); d = BigInt(d);
    if (d === 0n) throw new Error('zero denominator');
    if (d < 0n) { n = -n; d = -d; }
    const g = bgcd(n, d) || 1n;
    this.n = n / g; this.d = d / g;
  }
  add(o) { o = fr(o); return new Fr(this.n * o.d + o.n * this.d, this.d * o.d); }
  sub(o) { o = fr(o); return new Fr(this.n * o.d - o.n * this.d, this.d * o.d); }
  mul(o) { o = fr(o); return new Fr(this.n * o.n, this.d * o.d); }
  div(o) { o = fr(o); if (o.n === 0n) throw new Error('division by zero'); return new Fr(this.n * o.d, this.d * o.n); }
  neg() { return new Fr(-this.n, this.d); }
  pow(k) {
    if (!Number.isInteger(k)) throw new Error('non-integer power');
    if (k < 0) return fr(1).div(this.pow(-k));
    return new Fr(this.n ** BigInt(k), this.d ** BigInt(k));
  }
  eq(o) { o = fr(o); return this.n === o.n && this.d === o.d; }
  cmp(o) { o = fr(o); const x = this.n * o.d - o.n * this.d; return x < 0n ? -1 : x > 0n ? 1 : 0; }
  get v() { return Number(this.n) / Number(this.d); }
  isInt() { return this.d === 1n; }
  /** Exact square root, or null when it is not rational. */
  sqrt() { if (this.n < 0n) return null; const a = isqrt(this.n), b = isqrt(this.d); return a * a === this.n && b * b === this.d ? new Fr(a, b) : null; }
  cbrt() { const a = icbrt(this.n), b = icbrt(this.d); return a * a * a === this.n && b * b * b === this.d ? new Fr(a, b) : null; }
  toString() { return this.d === 1n ? `${this.n}` : `${this.n}/${this.d}`; }
  /** Terminating decimal string ("37.5"), or null for a recurring decimal. */
  dec() {
    let d = this.d, t = 0;
    while (d % 2n === 0n) { d /= 2n; t++; }
    let u = 0;
    while (d % 5n === 0n) { d /= 5n; u++; }
    if (d !== 1n) return null;
    const k = Math.max(t, u);
    const scaled = (this.n * 10n ** BigInt(k)) / this.d;
    const s = babs(scaled).toString().padStart(k + 1, '0');
    const out = k ? `${s.slice(0, -k)}.${s.slice(-k)}`.replace(/\.?0+$/, '') : s;
    return (scaled < 0n ? '-' : '') + out;
  }
  /** LaTeX: integer, or \dfrac{p}{q} with a leading minus sign. */
  tex() { return this.d === 1n ? `${this.n}` : `${this.n < 0n ? '-' : ''}\\dfrac{${babs(this.n)}}{${this.d}}`; }
}
/** fr(3), fr(3, 4), fr('2.5'), fr(0.4) (a JS number is read through its shortest decimal string). */
export function fr(x, d) {
  if (x instanceof Fr) return d === undefined ? x : x.div(fr(d));
  if (typeof x === 'number' && !Number.isInteger(x)) x = String(x);
  if (typeof x === 'string') {
    const m = /^(-?)(\d+)(?:\.(\d+))?$/.exec(x.trim());
    if (!m) { const p = /^(-?\d+)\/(\d+)$/.exec(x.trim()); if (!p) throw new Error(`bad number ${x}`); return new Fr(p[1], p[2]); }
    const q = m[3] ?? '';
    const v = new Fr(BigInt(m[1] + m[2] + q), 10n ** BigInt(q.length));
    return d === undefined ? v : v.div(fr(d));
  }
  return new Fr(x, d ?? 1);
}
export const F = (...xs) => xs.map((x) => fr(x));

// ---------------------------------------------------------------- ratios
/** a : b in lowest whole-number terms, as [p, q] (JS numbers) with q > 0. */
export function ratio(a, b) {
  const x = fr(a).div(fr(b));
  if (x.n > BigInt(Number.MAX_SAFE_INTEGER) || x.d > BigInt(Number.MAX_SAFE_INTEGER)) throw new Error('ratio too large');
  return [Number(x.n), Number(x.d)];
}
export const rtex = ([p, q]) => `${p} : ${q}`;
export const duplicate = (a, b) => ratio(fr(a).pow(2), fr(b).pow(2));
export const triplicate = (a, b) => ratio(fr(a).pow(3), fr(b).pow(3));
export function subDuplicate(a, b) { const x = fr(a).sqrt(), y = fr(b).sqrt(); if (!x || !y) throw new Error('sub-duplicate not rational'); return ratio(x, y); }
export function subTriplicate(a, b) { const x = fr(a).cbrt(), y = fr(b).cbrt(); if (!x || !y) throw new Error('sub-triplicate not rational'); return ratio(x, y); }
export const reciprocal = (a, b) => ratio(b, a);
/** Compound ratio of [[a, b], [c, d], ...] = (a c ...) : (b d ...). */
export const compound = (pairs) => ratio(pairs.reduce((s, [a]) => s.mul(fr(a)), fr(1)), pairs.reduce((s, [, b]) => s.mul(fr(b)), fr(1)));
export const sameRatio = (r1, r2) => r1[0] * r2[1] === r1[1] * r2[0];

// ---------------------------------------------------------------- proportion
/** a : b = c : d exactly (product of extremes = product of means). */
export const isProp = (a, b, c, d) => fr(a).mul(fr(d)).eq(fr(b).mul(fr(c)));
/** a, b, c in continued proportion: b^2 = ac. */
export const isCont = (a, b, c) => fr(b).pow(2).eq(fr(a).mul(fr(c)));
/** Positive mean proportional sqrt(ab); throws if irrational. */
export function meanProp(a, b) { const m = fr(a).mul(fr(b)).sqrt(); if (!m) throw new Error('mean proportional not rational'); return m; }
export const thirdProp = (a, b) => fr(b).pow(2).div(fr(a));
export const fourthProp = (a, b, c) => fr(b).mul(fr(c)).div(fr(a));
/** The number x added to each of a, b, c, d that makes them proportional: (a+x)(d+x) = (b+x)(c+x). */
export function addToProp(a, b, c, d) {
  const [A, B, C, D] = F(a, b, c, d);
  const x = B.mul(C).sub(A.mul(D)).div(A.add(D).sub(B).sub(C));
  if (!isProp(A.add(x), B.add(x), C.add(x), D.add(x))) throw new Error('addToProp failed');
  return x;
}
/** The number x subtracted from each of a, b, c that makes them continued proportionals: (b-x)^2 = (a-x)(c-x). */
export function subToCont(a, b, c) {
  const [A, B, C] = F(a, b, c);
  // b^2 - 2bx = ac - (a + c)x  =>  x (a + c - 2b) = ac - b^2
  const x = A.mul(C).sub(B.pow(2)).div(A.add(C).sub(B.mul(2)));
  if (!isCont(A.sub(x), B.sub(x), C.sub(x))) throw new Error('subToCont failed');
  return x;
}

/** Numbers a k and b k change by s each and then have ratio m : n; returns k (exact; must be a positive whole number). */
export function kChange(a, b, s, m, n) {
  const k = fr(s).mul(fr(m).sub(fr(n))).div(fr(n).mul(fr(a)).sub(fr(m).mul(fr(b))));
  if (!fr(a).mul(k).add(fr(s)).div(fr(b).mul(k).add(fr(s))).eq(fr(m).div(fr(n)))) throw new Error('kChange check failed');
  if (!k.isInt() || k.cmp(0) <= 0) throw new Error('kChange: k not a positive whole number');
  return Number(k.n);
}

// ---------------------------------------------------------------- exact expression evaluator
function tokenize(src) {
  const out = [];
  let i = 0;
  while (i < src.length) {
    const c = src[i];
    if (c === ' ') { i++; continue; }
    if (/\d/.test(c)) { const m = /^\d+(\.\d+)?/.exec(src.slice(i)); out.push({ k: 'num', v: fr(m[0]) }); i += m[0].length; continue; }
    if (src.startsWith('sqrt', i)) { out.push({ k: 'fn', v: 'sqrt' }); i += 4; continue; }
    if (src.startsWith('cbrt', i)) { out.push({ k: 'fn', v: 'cbrt' }); i += 4; continue; }
    if (/[a-z]/.test(c)) { out.push({ k: 'id', v: c }); i++; continue; }
    if ('+-*/^()'.includes(c)) { out.push({ k: 'op', v: c }); i++; continue; }
    throw new Error(`bad character ${c} in ${src}`);
  }
  return out;
}
/** Evaluates an expression exactly with the variables in env (values: numbers, strings or Fr). */
export function ev(src, env = {}) {
  const t = tokenize(src);
  let p = 0;
  const peek = () => t[p];
  const take = (v) => { const x = t[p]; if (!x || (v && x.v !== v)) throw new Error(`expected ${v} in ${src}`); p++; return x; };
  const E = Object.fromEntries(Object.entries(env).map(([k, v]) => [k, fr(v)]));
  function sum() {
    let a = prod();
    while (peek() && peek().k === 'op' && (peek().v === '+' || peek().v === '-')) { const o = take().v; const b = prod(); a = o === '+' ? a.add(b) : a.sub(b); }
    return a;
  }
  function prod() {
    let a = unary();
    for (;;) {
      const x = peek();
      if (x && x.k === 'op' && (x.v === '*' || x.v === '/')) { take(); const b = unary(); a = x.v === '*' ? a.mul(b) : a.div(b); }
      else if (x && (x.k === 'id' || x.k === 'fn' || x.k === 'num' || (x.k === 'op' && x.v === '('))) a = a.mul(power());
      else return a;
    }
  }
  function unary() { if (peek() && peek().k === 'op' && peek().v === '-') { take(); return unary().neg(); } return power(); }
  function power() {
    const a = atom();
    if (peek() && peek().k === 'op' && peek().v === '^') { take(); const e = unary(); if (!e.isInt()) throw new Error('non-integer power'); return a.pow(Number(e.n)); }
    return a;
  }
  function atom() {
    const x = take();
    if (x.k === 'num') return x.v;
    if (x.k === 'id') { if (!(x.v in E)) throw new Error(`no value for ${x.v} in ${src}`); return E[x.v]; }
    if (x.k === 'fn') { take('('); const v = sum(); take(')'); const r = x.v === 'sqrt' ? v.sqrt() : v.cbrt(); if (!r) throw new Error(`${x.v} not exact in ${src}`); return r; }
    if (x.v === '(') { const v = sum(); take(')'); return v; }
    throw new Error(`unexpected ${x.v} in ${src}`);
  }
  const v = sum();
  if (p !== t.length) throw new Error(`trailing tokens in ${src}`);
  return v;
}
/** An equation lhs = rhs holds exactly at env. */
export const holds = (lhs, rhs, env) => ev(lhs, env).eq(ev(rhs, env));

// Fixed substitution points (chosen once; positive, so no denominator in the chapter's identities vanishes).
const PROP_PTS = [[3, 5, 2], [7, 2, '3/4'], [4, 9, '5/3'], [11, 6, '7/2'], [5, 13, '2/7'], [2, 3, '9/5']];
const CONT_PTS = [[2, 3], [5, '2/3'], [3, '7/4'], [9, '5/2'], [4, '3/7'], [6, '11/3']];
/** Environments for a : b = c : d (a = bk, c = dk). */
export const propEnvs = () => PROP_PTS.map(([b, d, k]) => { const K = fr(k); return { a: fr(b).mul(K), b: fr(b), c: fr(d).mul(K), d: fr(d), k: K }; });
/** Environments for a, b, c, d in continued proportion (b = ak, c = ak^2, d = ak^3). */
export const contEnvs = () => CONT_PTS.map(([a, k]) => { const A = fr(a), K = fr(k); return { a: A, b: A.mul(K), c: A.mul(K.pow(2)), d: A.mul(K.pow(3)), k: K }; });
/** Environments where a : b = c : d fails (to show a conclusion really depends on the hypothesis). */
export const freeEnvs = () => [{ a: fr(2), b: fr(3), c: fr(5), d: fr(7) }, { a: fr(4), b: fr(9), c: fr(1), d: fr(6) }, { a: fr(8), b: fr(5), c: fr(3), d: fr(11) }];
/** lhs = rhs at every environment (exactly). Returns the number of points checked, or 0 on any failure. */
export function identity(lhs, rhs, envs) {
  for (const e of envs) {
    try { if (!holds(lhs, rhs, e)) return 0; } catch { return 0; }
  }
  return envs.length;
}
/** lhs = rhs fails at some environment. */
export function fails(lhs, rhs, envs) {
  return envs.some((e) => { try { return !holds(lhs, rhs, e); } catch { return true; } });
}

// ---------------------------------------------------------------- componendo and dividendo
/** C&D on p/q = m/n gives (p + q)/(p - q) = (m + n)/(m - n): returns that right-hand side exactly. */
export const cd = (m, n) => fr(m).add(fr(n)).div(fr(m).sub(fr(n)));
/** Solves (P x + Q)/(P x - Q) = m/n by C&D: Px/Q = (m + n)/(m - n). */
export function solveCD(P, Q, m, n) {
  const x = cd(m, n).mul(fr(Q)).div(fr(P));
  const lhs = fr(P).mul(x).add(fr(Q)).div(fr(P).mul(x).sub(fr(Q)));
  if (!lhs.eq(fr(m).div(fr(n)))) throw new Error('solveCD check failed');
  return x;
}
