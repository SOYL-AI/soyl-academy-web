// Exact rational arithmetic for ICSE 10 Mathematics ch07 (remainder and factor theorems).
// Fractions are held as reduced integer pairs (every operation asserts safe integers), polynomials as
// arrays of fractions, highest power first. Everything a slide, note or item states about a polynomial
// (a remainder, a quotient, a zero, a factorisation, an unknown coefficient) is computed here exactly:
//   * remainders by evaluation f(a) AND by long division, which must agree;
//   * every division is checked back: divisor x quotient + remainder = dividend;
//   * every factorisation is expanded back and must equal the polynomial;
//   * unknown coefficients are solved exactly (Gaussian elimination over fractions) and substituted back.

const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; };

export class Fr {
  constructor(n, d = 1) {
    if (!Number.isSafeInteger(n) || !Number.isSafeInteger(d) || d === 0) throw new Error(`bad fraction ${n}/${d}`);
    if (d < 0) { n = -n; d = -d; }
    const g = gcd(n, d) || 1;
    this.n = n / g === 0 ? 0 : n / g;
    this.d = this.n === 0 ? 1 : d / g;
    Object.freeze(this);
  }
  static of(v) {
    if (v instanceof Fr) return v;
    if (Number.isInteger(v)) return new Fr(v);
    if (Array.isArray(v)) return new Fr(v[0], v[1]);
    throw new Error(`not an exact value: ${v}`);
  }
  add(o) { o = Fr.of(o); return new Fr(this.n * o.d + o.n * this.d, this.d * o.d); }
  sub(o) { o = Fr.of(o); return new Fr(this.n * o.d - o.n * this.d, this.d * o.d); }
  mul(o) { o = Fr.of(o); return new Fr(this.n * o.n, this.d * o.d); }
  div(o) { o = Fr.of(o); if (o.n === 0) throw new Error('division by zero'); return new Fr(this.n * o.d, this.d * o.n); }
  neg() { return new Fr(-this.n, this.d); }
  abs() { return new Fr(Math.abs(this.n), this.d); }
  pow(k) { if (!Number.isInteger(k) || k < 0) throw new Error(`bad power ${k}`); let r = new Fr(1); for (let i = 0; i < k; i++) r = r.mul(this); return r; }
  isZero() { return this.n === 0; }
  isInt() { return this.d === 1; }
  eq(o) { o = Fr.of(o); return this.n === o.n && this.d === o.d; }
  sign() { return Math.sign(this.n); }
  num() { return this.n / this.d; }
  /** TeX: 3, -2, \dfrac{5}{2}, -\dfrac{7}{9}. */
  tex() { return this.d === 1 ? String(this.n) : `${this.n < 0 ? '-' : ''}\\dfrac{${Math.abs(this.n)}}{${this.d}}`; }
  /** TeX safe as a base or a factor: 2, (-2), \left(\dfrac{1}{2}\right), \left(-\dfrac{3}{2}\right). */
  ptex() { if (this.d === 1) return this.n < 0 ? `(${this.n})` : String(this.n); return `\\left(${this.tex()}\\right)`; }
  toString() { return this.d === 1 ? String(this.n) : `${this.n}/${this.d}`; }
}
export const F = (n, d = 1) => new Fr(n, d);
const Z = F(0), ONE = F(1);

export class Poly {
  /** coeffs highest power first; leading zeros are stripped. */
  constructor(coeffs) {
    let c = coeffs.map(Fr.of);
    while (c.length > 1 && c[0].isZero()) c = c.slice(1);
    this.c = c.length ? c : [Z];
    Object.freeze(this);
  }
  get deg() { return this.c.length === 1 && this.c[0].isZero() ? -Infinity : this.c.length - 1; }
  get lead() { return this.c[0]; }
  /** Coefficient of x^k. */
  co(k) { const i = this.c.length - 1 - k; return i >= 0 && i < this.c.length ? this.c[i] : Z; }
  isZero() { return this.c.every((x) => x.isZero()); }
  at(x) { x = Fr.of(x); return this.c.reduce((acc, a) => acc.mul(x).add(a), Z); }
  add(o) { const n = Math.max(this.c.length, o.c.length); const out = []; for (let k = n - 1; k >= 0; k--) out.push(this.co(k).add(o.co(k))); return new Poly(out); }
  sub(o) { return this.add(o.scale(-1)); }
  scale(s) { s = Fr.of(s); return new Poly(this.c.map((a) => a.mul(s))); }
  mul(o) {
    const out = Array.from({ length: this.c.length + o.c.length - 1 }, () => Z);
    this.c.forEach((a, i) => o.c.forEach((b, j) => { out[i + j] = out[i + j].add(a.mul(b)); }));
    return new Poly(out);
  }
  eq(o) { return this.sub(o).isZero(); }
  /** Long division by a non-zero polynomial: quotient, remainder and the steps (for tables and working). */
  divBy(dv) {
    if (dv.isZero()) throw new Error('divide by zero polynomial');
    let r = this;
    const steps = [];
    let q = new Poly([Z]);
    while (!r.isZero() && r.deg >= dv.deg) {
      const k = r.deg - dv.deg;
      const coef = r.lead.div(dv.lead);
      const term = new Poly([coef, ...Array(k).fill(Z)]);
      const prod = term.mul(dv);
      const next = r.sub(prod);
      if (!next.isZero() && next.deg >= r.deg) throw new Error('long division did not reduce the degree');
      steps.push({ dividend: r, term, prod, rem: next });
      q = q.add(term);
      r = next;
    }
    if (!dv.mul(q).add(r).eq(this)) throw new Error('division check failed');
    return { q, r, steps };
  }
  /** TeX in variable v: 2x^3 - x^2 + \dfrac{1}{2}x - 6. */
  tex(v = 'x') {
    const parts = [];
    for (let k = this.deg; k >= 0; k--) {
      const a = this.co(k);
      if (a.isZero()) continue;
      const m = a.abs();
      const body = k === 0 ? m.tex() : `${m.eq(1) ? '' : m.tex()}${v}${k > 1 ? `^${k}` : ''}`;
      parts.push(parts.length ? `${a.sign() < 0 ? ' - ' : ' + '}${body}` : `${a.sign() < 0 ? '-' : ''}${body}`);
    }
    return parts.length ? parts.join('') : '0';
  }
  /** Plot expression in the pipeline grammar (integer coefficients only). */
  expr() {
    if (!this.c.every((a) => a.isInt())) throw new Error('plot expression needs integer coefficients');
    return this.tex('x').replace(/(\d)x/g, '$1*x');
  }
}
export const P = (...cs) => new Poly(cs);
/** The linear polynomial ax + b. */
export const lin = (a, b) => new Poly([a, b]);
/** Linear factor with zero r (a fraction p/q): (qx - p), primitive with positive leading coefficient. */
export const factorOfZero = (r) => { r = Fr.of(r); return lin(r.d, -r.n); };
/** TeX of a factor in brackets: (x - 2), (2x + 3), (x^2 + x + 1). */
export const btex = (p, v = 'x') => `(${p.tex(v)})`;
/** Zero of ax + b. */
export const zeroOf = (l) => { if (l.deg !== 1) throw new Error('not linear'); return l.co(0).neg().div(l.co(1)); };

/** f(a) in TeX: f(2), f(-3), f\left(\dfrac{1}{2}\right). */
export const fat = (name, a) => { a = Fr.of(a); return a.isInt() ? `${name}(${a.n})` : `${name}\\left(${a.tex()}\\right)`; };

/**
 * Evaluation working line: f(2) = 2^3 - 4 \times 2^2 + 2 + 6 = 8 - 16 + 2 + 6 = 0.
 * Every term is c × a^k; the second stage lists each term's value; the last is f(a), computed exactly.
 */
export function evalLine(f, a, name = 'f', { values = true } = {}) {
  a = Fr.of(a);
  const terms = [], vals = [];
  for (let k = f.deg; k >= 0; k--) {
    const c = f.co(k);
    if (c.isZero()) continue;
    const m = c.abs();
    const base = k === 0 ? '' : k === 1 ? a.ptex() : `${a.ptex()}^${k}`;
    const body = k === 0 ? m.tex() : m.eq(1) ? base : `${m.tex()} \\times ${base}`;
    terms.push([c.sign(), body]);
    vals.push(c.mul(a.pow(k)));
  }
  const join = (list) => list.map(([s, b], i) => (i === 0 ? `${s < 0 ? '-' : ''}${b}` : `${s < 0 ? ' - ' : ' + '}${b}`)).join('');
  const valTex = vals.map((v) => [v.sign() || 1, v.abs().tex()]);
  const value = f.at(a);
  const chain = [fat(name, a), join(terms)];
  if (values && vals.length > 1) chain.push(join(valTex));
  chain.push(value.tex());
  // drop a repeated stage (e.g. when every term is already a plain number)
  const out = chain.filter((s, i) => i === 0 || s !== chain[i - 1]);
  return { tex: out.join(' = '), value };
}

/** Candidate rational zeros ±p/q (p | constant, q | leading), smallest |value| first, positive before negative. */
export function candidates(f) {
  if (!f.c.every((a) => a.isInt())) throw new Error('candidates need integer coefficients');
  const divs = (n) => { n = Math.abs(n); const out = []; for (let i = 1; i <= n; i++) if (n % i === 0) out.push(i); return out; };
  const c0 = f.co(0).n, lead = f.lead.n;
  if (c0 === 0) return [Z];
  const set = new Map();
  for (const p of divs(c0)) for (const q of divs(lead)) for (const s of [1, -1]) { const r = F(s * p, q); set.set(r.toString(), r); }
  return [...set.values()].sort((u, w) => Math.abs(u.num()) - Math.abs(w.num()) || w.num() - u.num());
}
/** Rational zeros (distinct), ascending. */
export function rationalZeros(f) {
  return candidates(f).filter((r) => f.at(r).isZero()).sort((u, w) => u.num() - w.num());
}

/**
 * Complete factorisation over the rationals of a polynomial with integer coefficients and degree ≤ 3:
 * f = k × (linear factors, primitive) × rest, where rest has no rational zero. Expanded back and checked.
 */
export function factorise(f) {
  if (f.deg > 3) throw new Error('degree higher than 3 is outside the chapter');
  let rest = f;
  const factors = [];
  for (let guard = 0; guard < 4 && rest.deg >= 1; guard++) {
    const z = rest.deg === 1 ? zeroOf(rest) : rationalZeros(rest)[0];
    if (z === undefined) break;
    const lf = factorOfZero(z);
    const { q, r } = rest.divBy(lf);
    if (!r.isZero()) throw new Error('zero did not divide exactly');
    factors.push(lf);
    rest = q;
  }
  // rest is a constant or has no rational zero; pull out its content when it is a constant
  let k = F(1);
  if (rest.deg <= 0) { k = rest.co(0); rest = new Poly([1]); }
  factors.sort((u, w) => zeroOf(u).num() - zeroOf(w).num());
  const prod = factors.reduce((acc, l) => acc.mul(l), rest.scale(k));
  if (!prod.eq(f)) throw new Error('factorisation does not expand back');
  const tex = `${k.eq(1) ? '' : k.eq(-1) ? '-' : k.tex()}${factors.map((l) => btex(l)).join('')}${rest.deg >= 1 ? btex(rest) : ''}`;
  return { k, factors, rest, tex, zeros: factors.map(zeroOf) };
}

/** Real-root count sign test for a quadratic: discriminant (exact). */
export const disc = (q) => { if (q.deg !== 2) throw new Error('not quadratic'); return q.co(1).mul(q.co(1)).sub(q.co(2).mul(q.co(0)).mul(4)); };

/**
 * Solve for unknown coefficients exactly. tpl(env) → Poly (coefficients affine in the unknowns);
 * conds: [{ at, value }] meaning tpl(env).at(at) = value, or [{ g }] meaning g(env) = 0 (e.g. equal
 * remainders of two polynomials). Returns env with Fr values (unique solution), after checking
 * affinity at extra points and substituting the solution back.
 */
export function solveUnknowns(names, tpl, conds) {
  const zero = Object.fromEntries(names.map((n) => [n, Z]));
  const g = (env, c) => (c.g ? c.g(env) : tpl(env).at(c.at).sub(Fr.of(c.value)));
  const rows = conds.map((c) => {
    const g0 = g(zero, c);
    const co = names.map((n) => g({ ...zero, [n]: ONE }, c).sub(g0));
    // affinity check at two extra points
    for (const pt of [[2, -3, 5], [-1, 4, 7]]) {
      const env = Object.fromEntries(names.map((n, i) => [n, F(pt[i % 3])]));
      const lhs = g(env, c), rhs = co.reduce((s, a, i) => s.add(a.mul(env[names[i]])), g0);
      if (!lhs.eq(rhs)) throw new Error('condition is not linear in the unknowns');
    }
    return [...co, g0.neg()];
  });
  if (rows.length !== names.length) throw new Error('need as many conditions as unknowns');
  const m = rows.map((r) => [...r]);
  const n = names.length;
  for (let col = 0; col < n; col++) {
    const piv = m.findIndex((r, i) => i >= col && !r[col].isZero());
    if (piv < 0) throw new Error('no unique solution');
    [m[col], m[piv]] = [m[piv], m[col]];
    for (let i = 0; i < n; i++) if (i !== col) { const fct = m[i][col].div(m[col][col]); m[i] = m[i].map((v, j) => v.sub(fct.mul(m[col][j]))); }
  }
  const env = Object.fromEntries(names.map((nm, i) => [nm, m[i][n].div(m[i][i])]));
  for (const c of conds) if (!g(env, c).isZero()) throw new Error('solution does not satisfy a condition');
  return env;
}
