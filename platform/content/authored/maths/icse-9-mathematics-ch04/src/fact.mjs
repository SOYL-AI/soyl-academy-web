// Exact polynomial arithmetic in several variables for ICSE 9 Mathematics ch04 (Factorisation).
// Polynomials have integer coefficients and are held as a map from a monomial key ("a1b2": a to the 1, b to the 2) to a
// coefficient. Everything a slide, note or item states about a factorisation is checked here:
//   * `P(tex)` parses a typed TeX expression (integers, single letters, + - \times \cdot, brackets, whole-number powers,
//     implicit multiplication) into an exact polynomial;
//   * `chain(tex)` requires every `=` segment of a working line to expand to the same polynomial, so every factorisation
//     on a slide, in a note or in an item is multiplied back and compared with the original expression;
//   * `full(tex)` decides whether a product is a COMPLETE factorisation (no common factor left in a bracket, no quadratic
//     bracket that still splits over the integers);
//   * `assertSplit(a, b, c, p, q)` checks the split of a middle term: p + q = b and pq = ac;
//   * `canon(tex)` is a canonical string of the expanded polynomial, used to compare typed options with the target.

const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; };
const isSq = (n) => { if (n < 0) return false; const s = Math.round(Math.sqrt(n)); return s * s === n; };
const safe = (n) => { if (!Number.isSafeInteger(n)) throw new Error('coefficient overflow'); return n; };
const parseKey = (k) => [...k.matchAll(/([a-zA-Z])(\d+)/g)].map((m) => [m[1], Number(m[2])]);
const mulKey = (k1, k2) => {
  const e = {};
  for (const [v, n] of [...parseKey(k1), ...parseKey(k2)]) e[v] = (e[v] ?? 0) + n;
  return Object.keys(e).sort().map((v) => `${v}${e[v]}`).join('');
};

export class MP {
  constructor(m = new Map()) { this.m = new Map([...m].filter(([, c]) => c !== 0)); }
  static num(c) { return new MP(new Map([['', c]])); }
  static v(x) { return new MP(new Map([[`${x}1`, 1]])); }
  add(o) { const m = new Map(this.m); for (const [k, c] of o.m) m.set(k, safe((m.get(k) ?? 0) + c)); return new MP(m); }
  neg() { return new MP(new Map([...this.m].map(([k, c]) => [k, -c]))); }
  sub(o) { return this.add(o.neg()); }
  mul(o) { const m = new Map(); for (const [k1, c1] of this.m) for (const [k2, c2] of o.m) { const k = mulKey(k1, k2); m.set(k, safe((m.get(k) ?? 0) + c1 * c2)); } return new MP(m); }
  pow(n) { let r = MP.num(1); for (let i = 0; i < n; i++) r = r.mul(this); return r; }
  isZero() { return this.m.size === 0; }
  eq(o) { return this.sub(o).isZero(); }
  get terms() { return [...this.m].map(([k, c]) => ({ c, e: Object.fromEntries(parseKey(k)) })); }
  get vars() { return [...new Set([...this.m.keys()].flatMap((k) => parseKey(k).map(([v]) => v)))].sort(); }
  /** Total degree. */
  get deg() { return Math.max(0, ...[...this.m.keys()].map((k) => parseKey(k).reduce((s, [, n]) => s + n, 0))); }
  key() { return [...this.m].sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0)).map(([k, c]) => `${c}*${k}`).join('+') || '0'; }
  at(env) { let s = 0; for (const t of this.terms) s = safe(s + t.c * Object.entries(t.e).reduce((p, [v, n]) => p * env[v] ** n, 1)); return s; }
}

// ------------------------------------------------------------------ parser
function tokens(tex) {
  if (/\\(?!left|right|times|cdot|,|;|!)[a-zA-Z]+/.test(tex)) throw new Error(`unsupported command in ${tex}`);
  const s = tex.replace(/\\left|\\right|\\[,;!]/g, '').replace(/\\times|\\cdot/g, '*').replace(/\s+/g, '');
  const out = s.match(/\d+|[a-zA-Z]|[+\-*()^{}=]/g) ?? [];
  if (out.join('') !== s) throw new Error(`cannot tokenise ${tex}`);
  return out;
}
function parseTokens(tk, src) {
  let i = 0;
  const peek = () => tk[i];
  const eat = (t) => { if (tk[i] !== t) throw new Error(`expected ${t} at ${i} in ${src}`); i++; };
  const startsFactor = (t) => t !== undefined && (/^\d/.test(t) || /^[a-zA-Z]$/.test(t) || t === '(');
  function atom() {
    const t = tk[i];
    if (t === '(') { i++; const e = expr(); eat(')'); return e; }
    if (/^\d+$/.test(t)) { i++; return MP.num(Number(t)); }
    if (/^[a-zA-Z]$/.test(t)) { i++; return MP.v(t); }
    throw new Error(`unexpected ${t} in ${src}`);
  }
  function factor() {
    let a = atom();
    while (peek() === '^') {
      i++;
      let n;
      if (peek() === '{') { i++; n = tk[i++]; eat('}'); } else { n = tk[i++]; if (n.length > 1) throw new Error(`ambiguous exponent ${n} in ${src}`); }
      if (!/^\d+$/.test(n)) throw new Error(`bad exponent ${n} in ${src}`);
      a = a.pow(Number(n));
    }
    return a;
  }
  function term() {
    let a = factor();
    while (peek() === '*' || startsFactor(peek())) { if (peek() === '*') i++; a = a.mul(factor()); }
    return a;
  }
  function expr() {
    let sign = 1;
    if (peek() === '-') { sign = -1; i++; } else if (peek() === '+') i++;
    let a = term();
    if (sign < 0) a = a.neg();
    while (peek() === '+' || peek() === '-') { const s = tk[i++]; const b = term(); a = s === '+' ? a.add(b) : a.sub(b); }
    return a;
  }
  const e = expr();
  if (i !== tk.length) throw new Error(`trailing input at ${i} in ${src}`);
  return e;
}
export const P = (tex) => parseTokens(tokens(tex), tex);
export const canon = (tex) => P(tex).key();
/** Every `=` segment of a working line has the same expanded polynomial. Returns that polynomial. */
export function chain(tex) {
  const parts = tex.split('=').map((s) => s.trim());
  if (parts.length < 2 || parts.some((s) => !s)) throw new Error(`not an equation chain: ${tex}`);
  const ps = parts.map(P);
  ps.forEach((p, k) => { if (!p.eq(ps[0])) throw new Error(`working line fails at segment ${k + 1}: "${parts[k]}" is not "${parts[0]}" in ${tex}`); });
  return ps[0];
}
export const same = (a, b) => P(a).eq(P(b));

// ------------------------------------------------------------------ completeness of a factorisation
/** Top-level factors of a typed product: [{ poly, pow, group }] (monomial runs are group:false). */
export function factorsOf(tex) {
  const tk = tokens(tex);
  const out = [];
  let i = 0, mono = [];
  const flush = () => { if (mono.length === 1 && mono[0] === '-') { out.push({ poly: MP.num(-1), pow: 1, group: false }); mono = []; } else if (mono.length) { out.push({ poly: parseTokens(mono, tex), pow: 1, group: false }); mono = []; } };
  while (i < tk.length) {
    const t = tk[i];
    if (t === '(') {
      flush();
      let depth = 0, j = i;
      for (; j < tk.length; j++) { if (tk[j] === '(') depth++; else if (tk[j] === ')') { depth--; if (!depth) break; } }
      const inner = tk.slice(i + 1, j);
      i = j + 1;
      let pow = 1;
      if (tk[i] === '^') { i++; if (tk[i] === '{') { pow = Number(tk[i + 1]); i += 3; } else { pow = Number(tk[i]); i++; } }
      out.push({ poly: parseTokens(inner, tex), pow, group: true });
    } else if (t === '+' || t === '-') {
      if (i !== 0) throw new Error('not a product: '+tex);
      mono.push(t); i++;
    } else { mono.push(t); i++; }
  }
  flush();
  return out;
}
/** Quadratic coefficients [a, b, c] of a polynomial: one variable (x^2, x, 1) or a homogeneous form in two (x^2, xy, y^2). */
export function quadCoeffs(p) {
  const vs = p.vars;
  if (p.deg !== 2) return null;
  const co = (e) => p.terms.filter((t) => Object.entries(e).every(([v, n]) => (t.e[v] ?? 0) === n) && Object.keys(t.e).every((v) => e[v] !== undefined)).reduce((s, t) => s + t.c, 0);
  if (vs.length === 1) { const [x] = vs; return [co({ [x]: 2 }), co({ [x]: 1 }), co({})]; }
  if (vs.length === 2) { const [x, y] = vs; if (p.terms.every((t) => (t.e[x] ?? 0) + (t.e[y] ?? 0) === 2)) return [co({ [x]: 2 }), co({ [x]: 1, [y]: 1 }), co({ [y]: 2 })]; }
  return null;
}
const content = (p) => p.terms.reduce((g, t) => gcd(g, t.c), 0);
const commonVar = (p) => p.vars.some((v) => p.terms.every((t) => (t.e[v] ?? 0) > 0));
/** A quadratic in two letters with a lower-degree part: a pair of lines only if the 3 x 3 conic determinant vanishes (then we refuse to judge). */
function conicIrreducible(p) {
  const [x, y] = p.vars;
  const co = (i, j) => p.terms.filter((t) => (t.e[x] ?? 0) === i && (t.e[y] ?? 0) === j).reduce((s, t) => s + t.c, 0);
  const a = co(2, 0), b = co(1, 1), c = co(0, 2), dd = co(1, 0), e = co(0, 1), f = co(0, 0);
  const det = 2 * a * (4 * c * f - e * e) - b * (2 * b * f - e * dd) + dd * (b * e - 2 * c * dd);
  if (det === 0) throw new Error();
  return true;
}
/** True when a bracket cannot be factorised any further over the integers (or is linear). Throws if it cannot judge. */
export function irreducible(p) {
  if (p.deg <= 1) return p.terms.length > 1 ? content(p) === 1 : false;
  if (p.terms.length < 2) return false;
  if (content(p) > 1 || commonVar(p)) return false;
  if (p.deg >= 3 && p.terms.length === 2) {
    const [t, u] = p.terms;
    const isCube = (n) => { const k = Math.round(Math.cbrt(Math.abs(n))); return k ** 3 === Math.abs(n); };
    const allMul = (m) => [t, u].every((w) => Object.values(w.e).every((n) => n % m === 0));
    if ((isCube(t.c) && isCube(u.c) && allMul(3)) || (isSq(Math.abs(t.c)) && isSq(Math.abs(u.c)) && allMul(2) && Math.sign(t.c) !== Math.sign(u.c))) return false;
  }
  const q = quadCoeffs(p);
  if (!q && p.vars.length === 2 && p.deg === 2) return conicIrreducible(p);
  if (!q) throw new Error(`full(): cannot judge a bracket of degree ${p.deg} (${p.key()})`);
  const [a, b, c] = q;
  return !isSq(b * b - 4 * a * c);
}
/** Is the typed product a complete factorisation? Every bracket must be irreducible. */
export function full(tex) {
  return factorsOf(tex).filter((f) => f.group).every((f) => irreducible(f.poly));
}
/** Canonical string of the expansion plus the completeness flag, for options of "factorise completely". */
export const fcanon = (tex) => `${canon(tex)}|${full(tex) ? 'full' : 'partial'}`;

// ------------------------------------------------------------------ special forms and splitting
/** Two terms, both perfect squares (even powers, square coefficients), with opposite signs. */
export function isDOS(tex) {
  const p = P(tex);
  const ts = p.terms;
  if (ts.length !== 2) return false;
  const sq = (t) => isSq(Math.abs(t.c)) && Object.values(t.e).every((n) => n % 2 === 0);
  return sq(ts[0]) && sq(ts[1]) && Math.sign(ts[0].c) !== Math.sign(ts[1].c);
}
/** Pair [p, q] (ascending) with p + q = b and pq = ac, or null. */
export function splitPair(a, b, c) {
  const ac = a * c;
  const lim = Math.abs(ac) + Math.abs(b) + 1;
  for (let p = -lim; p <= lim; p++) { const q = b - p; if (p <= q && p * q === ac) return [p, q]; }
  return null;
}
export function assertSplit(a, b, c, p, q) {
  if (p + q !== b || p * q !== a * c) throw new Error(`split ${p}, ${q} of ${a}, ${b}, ${c}: sum ${p + q} (want ${b}), product ${p * q} (want ${a * c})`);
  return true;
}
/** Highest common factor of single-term expressions, as a canonical key. */
export function hcfMono(texts) {
  const ps = texts.map(P);
  if (ps.some((p) => p.terms.length !== 1)) throw new Error('hcfMono needs single terms');
  const c = ps.reduce((g, p) => gcd(g, p.terms[0].c), 0);
  const vs = [...new Set(ps.flatMap((p) => p.vars))];
  let m = MP.num(c);
  for (const v of vs) { const n = Math.min(...ps.map((p) => p.terms[0].e[v] ?? 0)); m = m.mul(MP.v(v).pow(n)); }
  return m.key();
}
/** Quadratic coefficients of a typed trinomial. */
export function trinomial(tex) { const q = quadCoeffs(P(tex)); if (!q) throw new Error(`not a quadratic trinomial: ${tex}`); return q; }
/** Does a trinomial split over the integers? (discriminant a perfect square) */
export const splits = (tex) => { const [a, b, c] = trinomial(tex); return isSq(b * b - 4 * a * c); };
/** Value of a typed expression at integer values, e.g. val('x^2+3x', { x: 4 }). */
export const val = (tex, env) => P(tex).at(env);
/** TeX of a polynomial: terms by descending power of the variables in alphabetical order. */
export function texOf(p, order = null) {
  const vs = order ?? p.vars;
  const ts = p.terms.sort((s, t) => { for (const v of vs) { const d = (t.e[v] ?? 0) - (s.e[v] ?? 0); if (d) return d; } return 0; });
  if (!ts.length) return '0';
  return ts.map((t, i) => {
    const mono = vs.filter((v) => t.e[v]).map((v) => (t.e[v] === 1 ? v : `${v}^${t.e[v] > 9 ? `{${t.e[v]}}` : t.e[v]}`)).join('');
    const a = Math.abs(t.c);
    const body = mono ? `${a === 1 ? '' : a}${mono}` : String(a);
    return i === 0 ? `${t.c < 0 ? '-' : ''}${body}` : `${t.c < 0 ? ' - ' : ' + '}${body}`;
  }).join('');
}
