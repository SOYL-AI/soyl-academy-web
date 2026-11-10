// Exact arithmetic for ICSE 9 Mathematics ch01 (Rational and Irrational Numbers).
// A number is a rational combination of 1 and square roots of square-free integers:  p + q1*sqrt(c1) + q2*sqrt(c2) + ...
// with p, q rational (exact fractions of safe integers). Every simplification, sum, product, power and
// rationalisation on the slides and in the bank is computed here and compared exactly, never by decimals.
// `V(tex)` parses a TeX line (numbers, \sqrt{..}, \dfrac{..}{..}, + - \times \cdot \div, brackets, ^2, implicit
// multiplication) into an exact number; `chain(lines)` asserts that every "=" segment of every line has the same value.
// Recurring decimals are converted to p/q and checked by long division (`expansion`).

export const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; };
const SAFE = Number.MAX_SAFE_INTEGER;
const sane = (v) => { if (!Number.isSafeInteger(v)) throw new Error('integer overflow in exact arithmetic'); return v; };

// ------------------------------------------------------------------ fractions [n, d], d > 0, lowest terms
export const fr = (n, d = 1) => {
  if (!d) throw new Error('zero denominator');
  if (d < 0) { n = -n; d = -d; }
  const g = gcd(n, d) || 1;
  return [sane(n / g), sane(d / g)];
};
const fadd = ([a, b], [c, d]) => fr(sane(a * d + c * b), sane(b * d));
const fmul = ([a, b], [c, d]) => fr(sane(a * c), sane(b * d));
const fz = ([a]) => a === 0;

/** Square-free decomposition: n = s^2 * c. */
export function split(n) {
  if (!Number.isInteger(n) || n < 0) throw new Error(`bad radicand ${n}`);
  let s = 1, c = n;
  for (let p = 2; p * p <= c; p++) while (c % (p * p) === 0) { c /= p * p; s *= p; }
  return [s, c];
}

// ------------------------------------------------------------------ numbers: Map<radicand, fraction> (1 = rational part)
export class N {
  constructor(m = new Map()) { this.m = new Map([...m].filter(([, v]) => !fz(v)).sort((x, y) => x[0] - y[0])); }
  static q(n, d = 1) { return new N(new Map([[1, fr(n, d)]])); }
  static root(n, k = 1) { const [s, c] = split(n); return new N(new Map([[c, fr(k * s)]])); }
  get rational() { return [...this.m.keys()].every((k) => k === 1); }
  get zero() { return this.m.size === 0; }
  get terms() { return this.m.size; }
  part(c = 1) { return this.m.get(c) ?? [0, 1]; }
  add(o) { const m = new Map(this.m); for (const [k, v] of o.m) m.set(k, fadd(m.get(k) ?? [0, 1], v)); return new N(m); }
  neg() { return new N(new Map([...this.m].map(([k, [a, b]]) => [k, [-a, b]]))); }
  sub(o) { return this.add(o.neg()); }
  mul(o) {
    let out = new N();
    for (const [k1, v1] of this.m) for (const [k2, v2] of o.m) {
      const [s, c] = split(k1 * k2);
      out = out.add(new N(new Map([[c, fmul(fmul(v1, v2), fr(s))]])));
    }
    return out;
  }
  pow(n) { let out = N.q(1); for (let i = 0; i < n; i++) out = out.mul(this); return out; }
  /** Reciprocal. Single term k*sqrt(c): rationalise; two terms: multiply by the conjugate (product must be rational). */
  inv() {
    if (this.zero) throw new Error('division by zero');
    if (this.terms === 1) {
      const [[c, v]] = [...this.m];
      return new N(new Map([[c, fr(v[1], v[0] * c)]])); // 1/(v sqrt c) = sqrt c / (v c)
    }
    if (this.terms === 2) {
      const [[k1, v1], [k2, v2]] = [...this.m];
      const conj = new N(new Map([[k1, v1], [k2, [-v2[0], v2[1]]]]));
      const den = this.mul(conj);
      if (!den.rational || den.zero) throw new Error('cannot rationalise this denominator');
      return conj.mul(N.q(den.part()[1], den.part()[0]));
    }
    throw new Error('denominator with more than two terms is not supported');
  }
  div(o) { return this.mul(o.inv()); }
  eq(o) { return this.sub(o).zero; }
  get value() { let s = 0; for (const [k, [a, b]] of this.m) s += (a / b) * Math.sqrt(k); return s; }
  /** a + b sqrt(c) → [a, b] as fractions (for "find a and b"). */
  ab(c) { return [this.part(1), this.part(c)]; }
}
export const rat = (n, d = 1) => N.q(n, d);
export const sq = (n, k = 1) => N.root(n, k);

// ------------------------------------------------------------------ TeX output
const fnum = ([a, b]) => (b === 1 ? String(a) : `${a < 0 ? '-' : ''}\\dfrac{${Math.abs(a)}}{${b}}`);
/** Canonical TeX of a number: terms in order (rational, then radicands ascending) over a common denominator. */
export function tex(x) {
  if (x.zero) return '0';
  const ent = [...x.m];
  const den = ent.reduce((l, [, [, b]]) => (l * b) / gcd(l, b), 1);
  const parts = ent.map(([k, [a, b]]) => [k, (a * den) / b]);
  const g = parts.reduce((gg, [, a]) => gcd(gg, a), 0);
  const body = (ps0) => { const i = ps0.findIndex(([, a]) => a > 0); const ps = ps0[0][1] < 0 && i > 0 ? [ps0[i], ...ps0.filter((_, j) => j !== i)] : ps0; return body2(ps); };
  const body2 = (ps) => ps.map(([k, a], i) => {
    const m = Math.abs(a);
    const t = k === 1 ? String(m) : `${m === 1 ? '' : m}\\sqrt{${k}}`;
    return i === 0 ? (a < 0 ? `-${t}` : t) : `${a < 0 ? '-' : '+'} ${t}`;
  }).join(' ');
  if (den === 1) return body(parts);
  // all terms negative: pull the sign out
  const allNeg = parts.every(([, a]) => a < 0);
  const ps = allNeg ? parts.map(([k, a]) => [k, -a]) : parts;
  const sign = allNeg ? '-' : '';
  if (parts.length === 1) { const [k, a] = ps[0]; const g2 = gcd(Math.abs(a), den); void g; if (k === 1) return `${sign}\\dfrac{${Math.abs(a)}}{${den}}`; return `${sign}\\dfrac{${Math.abs(a) === 1 ? '' : Math.abs(a)}\\sqrt{${k}}}{${den}}`; }
  return `${sign}\\dfrac{${body(ps)}}{${den}}`;
}
/** Decimal text of x to d places (for tables); refuses values within 1e-7 of a rounding boundary. */
export function dec(x, d) {
  const v = x.value, s = v * 10 ** d, f = s - Math.floor(s);
  if (Math.abs(f - 0.5) < 1e-6 && d < 9) throw new Error(`rounding boundary ${v}`);
  return v.toFixed(d);
}

// ------------------------------------------------------------------ TeX parser
function tokens(s) {
  const out = [];
  const re = /\s+|\\[,;! ]|(\\[a-zA-Z]+)|(\d+(?:\.\d+)?)|([+\-*/^(){}=])|(.)/gy;
  let m;
  while ((m = re.exec(s))) {
    if (m[1]) out.push(m[1]);
    else if (m[2]) out.push(m[2]);
    else if (m[3]) out.push(m[3]);
    else if (m[4]) throw new Error(`unexpected "${m[4]}" in ${s}`);
  }
  return out;
}
function decimalN(t) {
  const [i, f = ''] = t.split('.');
  return N.q(Number(i + f), 10 ** f.length);
}
export function V(texLine) {
  const t = tokens(texLine);
  let p = 0;
  const peek = () => t[p];
  const eat = (x) => { if (t[p] !== x) throw new Error(`expected ${x} at ${p} in ${texLine}`); p++; };
  const startsAtom = (x) => x !== undefined && (/^\d/.test(x) || x === '\\sqrt' || x === '\\dfrac' || x === '\\frac' || x === '(' || x === '\\left');
  function expr() {
    let v = term();
    while (peek() === '+' || peek() === '-') { const op = t[p++]; const w = term(); v = op === '+' ? v.add(w) : v.sub(w); }
    return v;
  }
  function term() {
    let v = unary();
    for (;;) {
      const x = peek();
      if (x === '\\times' || x === '\\cdot' || x === '*') { p++; v = v.mul(unary()); }
      else if (x === '\\div' || x === '/') { p++; v = v.div(unary()); }
      else if (startsAtom(x)) v = v.mul(power());
      else return v;
    }
  }
  function unary() { if (peek() === '-') { p++; return unary().neg(); } if (peek() === '+') { p++; return unary(); } return power(); }
  function power() {
    const b = atom();
    if (peek() === '^') {
      p++;
      let e;
      if (peek() === '{') { p++; e = Number(t[p++]); eat('}'); } else e = Number(t[p++]);
      return b.pow(e);
    }
    return b;
  }
  function group() { eat('{'); const v = expr(); eat('}'); return v; }
  function atom() {
    const x = t[p++];
    if (x === undefined) throw new Error(`unexpected end in ${texLine}`);
    if (/^\d/.test(x)) return decimalN(x);
    if (x === '\\sqrt') {
      const v = peek() === '{' ? group() : decimalN(t[p++]);
      if (!v.rational || v.part()[0] < 0) throw new Error(`sqrt of a non-rational or negative in ${texLine}`);
      const [n, d] = v.part();
      return N.root(n * d).mul(N.q(1, d));
    }
    if (x === '\\dfrac' || x === '\\frac') { const a = group(); const b = group(); return a.div(b); }
    if (x === '(' || x === '\\left') { if (x === '\\left') eat('('); const v = expr(); if (peek() === '\\right') p++; eat(')'); return v; }
    throw new Error(`unexpected token ${x} in ${texLine}`);
  }
  const v = expr();
  if (p !== t.length) throw new Error(`trailing tokens in ${texLine}: ${t.slice(p).join(' ')}`);
  return v;
}

/** Every "=" segment (and "\Rightarrow" part) of every line must have the same exact value; returns that value. */
export function chain(lines, target = null) {
  const segs = lines.flatMap((l) => l.split(/=|\\Rightarrow/).map((s) => s.trim()).filter(Boolean));
  const vals = segs.map((s) => V(s));
  for (let i = 1; i < vals.length; i++) if (!vals[i].eq(vals[0])) throw new Error(`working line fails: "${segs[0]}" vs "${segs[i]}" in ${lines.join(' ; ')}`);
  if (target && !vals[0].eq(typeof target === 'string' ? V(target) : target)) throw new Error(`chain value ${tex(vals[0])} is not the target ${typeof target === 'string' ? target : tex(target)}`);
  return vals[0];
}
/** A "found" check: the typed answer string equals the exact computed number. */
export const same = (s, x) => V(s).eq(x);

// ------------------------------------------------------------------ decimals and recurring decimals
/** Decimal expansion of n/d (d > 0): { int, pre, rep } with pre the non-repeating digits and rep the repeating block ('' if terminating). */
export function expansion(n, d) {
  const neg = n < 0;
  n = Math.abs(n);
  const int = Math.floor(n / d);
  let rem = n % d;
  const seen = new Map();
  const digits = [];
  while (rem !== 0 && !seen.has(rem)) {
    seen.set(rem, digits.length);
    rem *= 10;
    digits.push(Math.floor(rem / d));
    rem %= d;
  }
  if (rem === 0) return { neg, int, pre: digits.join(''), rep: '' };
  const at = seen.get(rem);
  return { neg, int, pre: digits.slice(0, at).join(''), rep: digits.slice(at).join('') };
}
/** Fraction (lowest terms [p, q]) of int.pre(rep)(rep)... */
export function fromRecurring(int, pre, rep) {
  const a = pre.length, b = rep.length;
  const whole = Number(int + pre + rep) - Number(int + pre);
  return fr(whole, (10 ** b - 1) * 10 ** a);
}
export const recurTex = ({ neg, int, pre, rep }) => `${neg ? '-' : ''}${int}.${pre}${rep ? `\\overline{${rep}}` : ''}`;
/** Terminates iff the denominator (lowest terms) has only the prime factors 2 and 5. */
export function terminates(n, d) {
  let [, q] = fr(n, d);
  while (q % 2 === 0) q /= 2;
  while (q % 5 === 0) q /= 5;
  return q === 1;
}
/** Short form of the first digits of the expansion, e.g. "0.363636…" */
export function digitsTex(n, d, k = 8) {
  const e = expansion(n, d);
  let s = e.pre, r = e.rep;
  if (!r) return `${e.neg ? '-' : ''}${e.int}.${s}`;
  while (s.length < k) { s += r; }
  return `${e.neg ? '-' : ''}${e.int}.${s.slice(0, Math.max(k, e.pre.length + 2 * r.length))}\\ldots`;
}

// ------------------------------------------------------------------ geometry helpers
export const dist = ([x1, y1], [x2, y2]) => Math.hypot(x1 - x2, y1 - y2);
export const near = (u, w, e = 1e-9) => Math.abs(u - w) < e;
