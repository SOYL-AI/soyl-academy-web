// Exact polynomial arithmetic for ICSE 9 Mathematics ch03 Expansions: Laurent polynomials in single-letter variables
// with rational coefficients (negative powers allow a + 1/a identities). `P(tex)` parses a typed TeX expression
// (numbers and decimals, letters, + - \times \cdot, brackets, ^, \dfrac{..}{..} with a monomial or number below),
// so every expansion, worked line and table entry is multiplied out and compared exactly. `chain(lines)` requires every
// `=` segment of every typed line to be the same polynomial. `ev(tex, env)` evaluates at a witness point.
const gcd = (a, b) => (b === 0 ? Math.abs(a) : gcd(b, a % b));
const fr = (n, d = 1) => { if (d === 0) throw new Error('zero denominator'); if (d < 0) { n = -n; d = -d; } const g = gcd(n, d) || 1; return [n / g, d / g]; };
const fadd = ([a, b], [c, d]) => fr(a * d + c * b, b * d);
const fmul = ([a, b], [c, d]) => fr(a * c, b * d);
const isSafe = (x) => Number.isSafeInteger(x[0]) && Number.isSafeInteger(x[1]);

const mkey = (m) => Object.keys(m).filter((v) => m[v] !== 0).sort().map((v) => `${v}${m[v]}`).join(',');
const munkey = (k) => Object.fromEntries(k === '' ? [] : k.split(',').map((t) => { const x = /^([a-z])(-?\d+)$/.exec(t); return [x[1], Number(x[2])]; }));

export class Poly {
  constructor(map = new Map()) { this.m = new Map([...map].filter(([, c]) => c[0] !== 0)); }
  static num(n, d = 1) { return new Poly(new Map([['', fr(n, d)]])); }
  static v(name, e = 1) { return new Poly(new Map([[mkey({ [name]: e }), fr(1)]])); }
  add(o) { const m = new Map(this.m); for (const [k, c] of o.m) m.set(k, m.has(k) ? fadd(m.get(k), c) : c); return new Poly(m); }
  neg() { return new Poly(new Map([...this.m].map(([k, c]) => [k, fr(-c[0], c[1])]))); }
  sub(o) { return this.add(o.neg()); }
  mul(o) {
    const m = new Map();
    for (const [k1, c1] of this.m) for (const [k2, c2] of o.m) {
      const a = munkey(k1), b = munkey(k2);
      for (const v of Object.keys(b)) a[v] = (a[v] ?? 0) + b[v];
      const k = mkey(a), c = fmul(c1, c2);
      if (!isSafe(c)) throw new Error('coefficient overflow');
      m.set(k, m.has(k) ? fadd(m.get(k), c) : c);
    }
    return new Poly(m);
  }
  inv() {
    if (this.m.size !== 1) throw new Error('can only divide by a monomial or a number');
    const [[k, c]] = [...this.m];
    const e = munkey(k);
    for (const v of Object.keys(e)) e[v] = -e[v];
    return new Poly(new Map([[mkey(e), fr(c[1], c[0])]]));
  }
  pow(k) {
    if (!Number.isInteger(k)) throw new Error('integer power only');
    if (k < 0) return this.inv().pow(-k);
    let out = Poly.num(1);
    for (let i = 0; i < k; i++) out = out.mul(this);
    return out;
  }
  eq(o) { return this.sub(o).m.size === 0; }
  /** coefficient of the monomial given as { a: 1, b: 2 } as a rational [n, d] */
  coef(mono = {}) { return this.m.get(mkey(mono)) ?? [0, 1]; }
  /** coefficient as a number */
  co(mono = {}) { const [n, d] = this.coef(mono); return n / d; }
  isConst() { return [...this.m.keys()].every((k) => k === ''); }
  /** constant value as a number */
  value() { if (!this.isConst()) throw new Error('not a constant'); const [n, d] = this.coef(); return n / d; }
  terms() { return this.m.size; }
  evalNum(env) {
    let s = 0;
    for (const [k, [n, d]] of this.m) { let t = n / d; for (const [v, e] of Object.entries(munkey(k))) t *= env[v] ** e; s += t; }
    return s;
  }
}

// ---------------------------------------------------------------- TeX parser
function tokenize(src) {
  const out = [];
  const s = src.replace(/\\left|\\right|\\,|\\;|\\!/g, '');
  let i = 0;
  while (i < s.length) {
    const ch = s[i];
    if (ch === ' ') { i++; continue; }
    if (/\d/.test(ch)) { const m = /^\d+(\.\d+)?/.exec(s.slice(i)); out.push({ t: 'num', v: m[0] }); i += m[0].length; continue; }
    if (/[a-z]/.test(ch)) { out.push({ t: 'var', v: ch }); i++; continue; }
    if (ch === '\\') { const m = /^\\([a-zA-Z]+)/.exec(s.slice(i)); if (!m) throw new Error(`bad escape in ${src}`); out.push({ t: 'cmd', v: m[1] }); i += m[0].length; continue; }
    if ('+-^(){}'.includes(ch)) { out.push({ t: ch }); i++; continue; }
    throw new Error(`unexpected "${ch}" in ${src}`);
  }
  return out;
}
function decimal(str) { const [a, b = ''] = str.split('.'); return fr(Number(a + b), 10 ** b.length); }
function parseExpr(tokens, src) {
  let p = 0;
  const peek = () => tokens[p];
  const eat = (t) => { if (!tokens[p] || tokens[p].t !== t) throw new Error(`expected ${t} in ${src}`); return tokens[p++]; };
  const startsFactor = (tk) => tk && (tk.t === 'var' || tk.t === '(' || (tk.t === 'cmd' && (tk.v === 'dfrac' || tk.v === 'frac')));
  function expr() {
    let acc = term();
    while (peek() && (peek().t === '+' || peek().t === '-')) { const op = tokens[p++].t; const t = term(); acc = op === '+' ? acc.add(t) : acc.sub(t); }
    return acc;
  }
  function term() {
    let acc = unary();
    for (;;) {
      const tk = peek();
      if (tk && tk.t === 'cmd' && (tk.v === 'times' || tk.v === 'cdot')) { p++; acc = acc.mul(unary()); }
      else if (startsFactor(tk)) acc = acc.mul(power());
      else break;
    }
    return acc;
  }
  function unary() {
    if (peek() && peek().t === '-') { p++; return unary().neg(); }
    if (peek() && peek().t === '+') { p++; return unary(); }
    return power();
  }
  function power() {
    const base = atom();
    if (peek() && peek().t === '^') {
      p++;
      let neg = false, e;
      if (peek().t === '{') { p++; if (peek().t === '-') { p++; neg = true; } e = Number(eat('num').v); eat('}'); }
      else e = Number(eat('num').v);
      return base.pow(neg ? -e : e);
    }
    return base;
  }
  function atom() {
    const tk = tokens[p++];
    if (!tk) throw new Error(`unexpected end in ${src}`);
    if (tk.t === 'num') return Poly.num(...decimal(tk.v));
    if (tk.t === 'var') return Poly.v(tk.v);
    if (tk.t === '(') { const e = expr(); eat(')'); return e; }
    if (tk.t === 'cmd' && (tk.v === 'dfrac' || tk.v === 'frac')) { eat('{'); const n = expr(); eat('}'); eat('{'); const d = expr(); eat('}'); return n.mul(d.inv()); }
    throw new Error(`unexpected ${tk.t}${tk.v ? ' ' + tk.v : ''} in ${src}`);
  }
  const out = expr();
  if (p !== tokens.length) throw new Error(`trailing tokens in ${src}`);
  return out;
}
/** Parse one expression (no `=`). */
export const P = (src) => parseExpr(tokenize(src), src);
/** Every `=` segment of every line must be the same polynomial; returns the polynomial of the last line. */
export function chain(lines) {
  let last = null;
  for (const line of lines) {
    const segs = line.split('=').map((s) => s.trim());
    if (segs.some((s) => !s)) throw new Error(`empty segment in ${line}`);
    const ps = segs.map(P);
    ps.slice(1).forEach((q, i) => { if (!ps[0].eq(q)) throw new Error(`line is not an identity: ${line} (segments 1 and ${i + 2} differ)`); });
    last = ps[0];
  }
  return last;
}
export const same = (a, b) => P(a).eq(P(b));
/** Value of an expression at a witness point (numbers), e.g. ev('a+b+c', {a: 2, b: 4, c: 5}). */
export const ev = (src, env) => P(src).evalNum(env);
export const close = (u, v, tol = 1e-9) => Math.abs(u - v) <= tol * Math.max(1, Math.abs(u), Math.abs(v));
/** Real a, b with a + b = s and ab = p (null if none). */
export function realPair(s, p) {
  const D = s * s - 4 * p;
  if (D < -1e-12) return null;
  const q = Math.sqrt(Math.max(D, 0));
  return [(s + q) / 2, (s - q) / 2];
}
/** A real number a with a + 1/a = k (|k| >= 2), the larger root. */
export const reciprocalRoot = (k) => realPair(k, 1)?.[0] ?? null;

// ---------------------------------------------------------------- self-tests of the engine itself
(function selfTest() {
  const ok = (c, m) => { if (!c) throw new Error(`poly self-test: ${m}`); };
  ok(P('(a+b)^2').eq(P('a^2+2ab+b^2')), '(a+b)^2');
  ok(P('(a-b)^3').eq(P('a^3-3a^2b+3ab^2-b^3')), '(a-b)^3');
  ok(P('(a+b+c)^2').eq(P('a^2+b^2+c^2+2ab+2bc+2ca')), '(a+b+c)^2');
  ok(P('(a+\\dfrac{1}{a})^3').eq(P('a^3+3a+\\dfrac{3}{a}+\\dfrac{1}{a^3}')), '(a+1/a)^3');
  ok(P('103^2').value() === 10609 && P('(100+3)^2').value() === 10609, '103^2');
  ok(P('\\dfrac{3}{4}+\\dfrac{1}{4}').value() === 1, 'fractions');
  ok(P('1.5 \\times 4').value() === 6, 'decimals');
  ok(P('(2x-3y)^2').co({ x: 1, y: 1 }) === -12, 'cross term');
  ok(!P('(a+b)^3').eq(P('a^3+b^3')), 'a different polynomial is not equal');
  for (const [a, b, c] of [[2, 3, 5], [-1, 4, 7], [3, -2, 1]]) {
    ok(ev('(a+b+c)^2', { a, b, c }) === (a + b + c) ** 2, 'numeric (a+b+c)^2');
    ok(ev('(a-b)^3', { a, b }) === (a - b) ** 3, 'numeric (a-b)^3');
    ok(ev('(a+b)(a^2-ab+b^2)', { a, b }) === a ** 3 + b ** 3, 'numeric sum of cubes');
  }
}());
