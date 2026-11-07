// Helpers for CBSE 9 Mathematics ch01 Number System: exact fractions, long division with remainder tracking, recurring decimals to
// p/q, surd arithmetic (r + s*sqrt(c) with integer parts over an integer denominator), rational powers by exact roots, and the
// square-root spiral coordinates. Everything printed on a slide or in an answer is computed here, then checked a second way.
export const r = (s, ...v) => String.raw(s, ...v).replace(/\\n(?![a-z])/g, '\n');
export const must = (cond, msg) => { if (!cond) throw new Error(`MUST FAIL: ${msg}`); };

export const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; };

// ---------------------------------------------------------------- fractions
export class Fr {
  constructor(n, d = 1) {
    if (!Number.isSafeInteger(n) || !Number.isSafeInteger(d) || d === 0) throw new Error(`bad fraction ${n}/${d}`);
    if (d < 0) { n = -n; d = -d; }
    const g = gcd(n, d) || 1;
    this.n = n / g === 0 ? 0 : n / g;
    this.d = this.n === 0 ? 1 : d / g;
    Object.freeze(this);
  }
  static of(v) { return v instanceof Fr ? v : Array.isArray(v) ? new Fr(v[0], v[1]) : new Fr(v); }
  add(o) { o = Fr.of(o); return new Fr(this.n * o.d + o.n * this.d, this.d * o.d); }
  sub(o) { o = Fr.of(o); return new Fr(this.n * o.d - o.n * this.d, this.d * o.d); }
  mul(o) { o = Fr.of(o); return new Fr(this.n * o.n, this.d * o.d); }
  div(o) { o = Fr.of(o); return new Fr(this.n * o.d, this.d * o.n); }
  eq(o) { o = Fr.of(o); return this.n === o.n && this.d === o.d; }
  num() { return this.n / this.d; }
  tex() { return this.d === 1 ? String(this.n) : this.n < 0 ? `-\\dfrac{${-this.n}}{${this.d}}` : `\\dfrac{${this.n}}{${this.d}}`; }
  toString() { return this.d === 1 ? String(this.n) : `${this.n}/${this.d}`; }
}
export const F = (n, d = 1) => new Fr(n, d);

// ---------------------------------------------------------------- integers and roots
export const isqrt = (n) => { const s = Math.round(Math.sqrt(n)); for (const k of [s - 1, s, s + 1]) if (k * k === n) return k; return null; };
/** Exact integer q-th root of n, or null. */
export const iroot = (n, q) => { const s = Math.round(n ** (1 / q)); for (const k of [s - 1, s, s + 1]) if (k >= 0 && k ** q === n) return k; return null; };
export const isRatSquare = (n, d = 1) => { const g = gcd(n, d); return isqrt(n / g) !== null && isqrt(d / g) !== null; };
/** n = k^2 m with m square-free: returns { k, m }. */
export function simplifySurd(n) {
  let k = 1, m = n;
  for (let p = 2; p * p <= m; p++) while (m % (p * p) === 0) { m /= p * p; k *= p; }
  return { k, m };
}
export function factors(n) {
  const f = {};
  for (let p = 2; p * p <= n; p++) while (n % p === 0) { f[p] = (f[p] ?? 0) + 1; n /= p; }
  if (n > 1) f[n] = (f[n] ?? 0) + 1;
  return f;
}
/** True when the fraction n/d (any form) has a terminating decimal expansion: its lowest-terms denominator is 2^a 5^b. */
export function terminates(n, d) {
  const g = gcd(n, d);
  let q = Math.abs(d / g);
  while (q % 2 === 0) q /= 2;
  while (q % 5 === 0) q /= 5;
  return q === 1;
}
export const primeStr = (n) => Object.entries(factors(n)).map(([p, e]) => (e === 1 ? p : `${p}^{${e}}`)).join(' \\times ');

// ---------------------------------------------------------------- decimals by long division
/** Long division of n/d (n >= 0, d > 0): integer part, digit list, and where the remainders first repeat. */
export function longDiv(n, d, limit = 80) {
  const ip = Math.floor(n / d);
  let rem = n % d;
  const seen = new Map();
  const digits = [], rems = [rem];
  while (rem !== 0 && !seen.has(rem) && digits.length < limit) {
    seen.set(rem, digits.length);
    rem *= 10;
    digits.push(Math.floor(rem / d));
    rem = rem % d;
    rems.push(rem);
  }
  const terminating = rem === 0;
  const start = terminating ? digits.length : seen.get(rem);
  return { ip, digits, rems, terminating, pre: digits.slice(0, start).join(''), rep: terminating ? '' : digits.slice(start).join(''), period: terminating ? 0 : digits.length - start };
}
/** TeX of the expansion: 0.375, 0.\overline{142857}, 0.58\overline{3}. */
export function decTex(n, d) {
  const L = longDiv(n, d);
  const body = L.terminating ? L.pre : `${L.pre}\\overline{${L.rep}}`;
  return L.terminating && !L.pre ? String(L.ip) : `${L.ip}.${body}`;
}
/** Plain text of the expansion with n digits shown after the point (recurring part repeated). */
export function decDigits(n, d, count) {
  const L = longDiv(n, d, Math.max(count + 20, 100));
  const s = L.terminating ? L.pre : L.pre + L.rep.repeat(Math.ceil(count / L.rep.length) + 1);
  return `${L.ip}.${s.slice(0, count)}`;
}
/** Fraction (Fr) for ip.pre followed by rep repeating. */
export function recurFrac(ip, pre, rep) {
  const p = pre.length, q = rep.length;
  const a = Number(pre + rep), b = Number(pre || '0');
  return F(ip).add(F(a - b, 10 ** p * (10 ** q - 1)));
}
/** The 'number' value of a decimal with repeating part, used for numeric cross-checks. */
export const recurValue = (ip, pre, rep) => Number(`${ip}.${pre}${rep.repeat(12)}`);

// ---------------------------------------------------------------- surds: (p + q sqrt(c)) / den
export function sd(p, q, c, den = 1) {
  if (c !== 1) { const { k, m } = simplifySurd(c); q *= k; c = m; }
  if (c === 1) { p += q; q = 0; }
  let g = gcd(gcd(p, q), den);
  if (g > 1) { p /= g; q /= g; den /= g; }
  if (den < 0) { p = -p; q = -q; den = -den; }
  const sq = `\\sqrt{${c}}`;
  const qt = q === 0 ? '' : `${q < 0 ? '-' : p !== 0 ? '+' : ''}${Math.abs(q) === 1 ? '' : Math.abs(q)}${sq}`;
  const num = p === 0 && q === 0 ? '0' : `${p !== 0 ? p : ''}${qt}`;
  return den === 1 ? num : `\\dfrac{${num}}{${den}}`;
}
export const sdv = (p, q, c, den = 1) => (p + q * Math.sqrt(c)) / den;
/** (p1 + q1 sqrt c)(p2 + q2 sqrt c) */
export const smul = ([p1, q1], [p2, q2], c) => [p1 * p2 + q1 * q2 * c, p1 * q2 + q1 * p2];
/** (x + y sqrt c) / (a + b sqrt c) after multiplying by the conjugate: [p, q, den]. */
export function ratio(x, y, a, b, c) {
  const [p, q] = smul([x, y], [a, -b], c);
  return [p, q, a * a - b * b * c];
}
/** sqrt(n) in the form k sqrt(m) as TeX. */
export const sqTex = (n) => sd(0, 1, n);

// ---------------------------------------------------------------- rational powers
/** a^(p/q) for integer a >= 1: exact Fr when a is a perfect q-th power, else null. */
export function ratPow(a, p, q) {
  const rt = iroot(a, q);
  if (rt === null) return null;
  return p >= 0 ? F(rt ** p) : F(1, rt ** -p);
}
export const powTex = (a, p, q) => (q === 1 ? `${a}^{${p}}` : `${a}^{${p < 0 ? '-' : ''}\\frac{${Math.abs(p)}}{${q}}}`);

// ---------------------------------------------------------------- figures
export const round3 = (v) => Math.round(v * 1000) / 1000;
/** Square-root spiral: points P1..Pn with |O P_k| = s sqrt(k), centred at (cx, cy). */
export function spiral(n, s, cx, cy) {
  const P = [[s, 0]];
  for (let k = 1; k < n; k++) {
    const [x, y] = P[k - 1];
    const len = Math.hypot(x, y);
    P.push([x - (s * y) / len, y + (s * x) / len]); // add a unit step (s long) at right angles to O P_k, anticlockwise
  }
  return P.map(([x, y]) => [round3(cx + x), round3(cy + y)]);
}
export const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
export const angleAtDeg = (V, A, B) => {
  const a = [A[0] - V[0], A[1] - V[1]], b = [B[0] - V[0], B[1] - V[1]];
  return (Math.acos((a[0] * b[0] + a[1] * b[1]) / (Math.hypot(...a) * Math.hypot(...b))) * 180) / Math.PI;
};
