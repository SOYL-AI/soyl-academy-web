// Exact arithmetic for ICSE 10 Mathematics ch10 Geometric Progression.
// Numbers are exact rationals over BigInt (no floating point anywhere in a stated value), so powers such as
// 3^{10} or (1.04)^{3} stay exact. Every GP fact the chapter states is computed here twice:
//   * a term by the formula a r^{n-1} AND by listing the sequence (repeated multiplication), which must agree;
//   * a sum by the formula a(r^n - 1)/(r - 1), by a(1 - r^n)/(1 - r) AND by adding the listed terms;
//   * "which term" and "how many terms" answers by walking the listed terms / partial sums (unique hit);
//   * a and r from two given terms by exact rational k-th roots (every root found, each checked back).
// The working-line checker at the end parses typed TeX (fractions, powers, brackets, percentages, named
// terms T_{n} and sums S_{n}) and evaluates it exactly; see steps().

const babs = (x) => (x < 0n ? -x : x);
const bgcd = (a, b) => { a = babs(a); b = babs(b); while (b) [a, b] = [b, a % b]; return a; };

export class Q {
  constructor(n, d = 1n) {
    n = BigInt(n); d = BigInt(d);
    if (d === 0n) throw new Error('zero denominator');
    if (d < 0n) { n = -n; d = -d; }
    const g = bgcd(n, d) || 1n;
    this.n = n / g;
    this.d = this.n === 0n ? 1n : d / g;
    Object.freeze(this);
  }
  static of(v) {
    if (v instanceof Q) return v;
    if (typeof v === 'bigint') return new Q(v);
    if (typeof v === 'number') { if (!Number.isSafeInteger(v)) throw new Error(`not an exact integer: ${v} (use a string such as "1.05")`); return new Q(BigInt(v)); }
    if (Array.isArray(v)) return new Q(BigInt(v[0]), BigInt(v[1]));
    if (typeof v === 'string') {
      const s = v.trim();
      let m = /^(-?)(\d+)(?:\.(\d+))?$/.exec(s);
      if (m) { const frac = m[3] ?? ''; const n = BigInt(m[2] + frac) * (m[1] ? -1n : 1n); return new Q(n, 10n ** BigInt(frac.length)); }
      m = /^(-?\d+)\/(\d+)$/.exec(s);
      if (m) return new Q(BigInt(m[1]), BigInt(m[2]));
    }
    throw new Error(`not an exact value: ${v}`);
  }
  add(o) { o = Q.of(o); return new Q(this.n * o.d + o.n * this.d, this.d * o.d); }
  sub(o) { o = Q.of(o); return new Q(this.n * o.d - o.n * this.d, this.d * o.d); }
  mul(o) { o = Q.of(o); return new Q(this.n * o.n, this.d * o.d); }
  div(o) { o = Q.of(o); if (o.n === 0n) throw new Error('division by zero'); return new Q(this.n * o.d, this.d * o.n); }
  neg() { return new Q(-this.n, this.d); }
  abs() { return new Q(babs(this.n), this.d); }
  inv() { return new Q(1n, 1n).div(this); }
  pow(k) {
    if (typeof k !== 'number' || !Number.isInteger(k)) throw new Error(`bad power ${k}`);
    if (k < 0) return this.inv().pow(-k);
    return new Q(this.n ** BigInt(k), this.d ** BigInt(k));
  }
  eq(o) { o = Q.of(o); return this.n === o.n && this.d === o.d; }
  cmp(o) { o = Q.of(o); const x = this.n * o.d - o.n * this.d; return x < 0n ? -1 : x > 0n ? 1 : 0; }
  lt(o) { return this.cmp(o) < 0; }
  gt(o) { return this.cmp(o) > 0; }
  sign() { return this.n < 0n ? -1 : this.n > 0n ? 1 : 0; }
  isZero() { return this.n === 0n; }
  isInt() { return this.d === 1n; }
  num() { return Number(this.n) / Number(this.d); }
  /** Exact decimal string when the denominator has only factors 2 and 5, else null. */
  dec() {
    let d = this.d, k = 0;
    while (d % 2n === 0n) { d /= 2n; k++; }
    let j = 0;
    while (d % 5n === 0n) { d /= 5n; j++; }
    if (d !== 1n) return null;
    const p = Math.max(k, j);
    const scaled = babs(this.n) * 10n ** BigInt(p) / this.d;
    const s = scaled.toString().padStart(p + 1, '0');
    const out = p ? `${s.slice(0, -p)}.${s.slice(-p)}` : s;
    return (this.n < 0n ? '-' : '') + out;
  }
  /** TeX: 12, -5, \dfrac{3}{4}, -\dfrac{3}{4}. */
  tex() { return this.d === 1n ? String(this.n) : `${this.n < 0n ? '-' : ''}\\dfrac{${babs(this.n)}}{${this.d}}`; }
  /** TeX as a decimal where exact, else as a fraction. */
  dtex() { return this.dec() ?? this.tex(); }
  /** TeX safe as a power base: 2, (-2), 1.04, \left(\dfrac{1}{2}\right), \left(-\dfrac{3}{4}\right). */
  ptex(useDec = false) {
    const t = useDec ? this.dtex() : this.tex();
    if (this.n < 0n) return t.includes('frac') ? `\\left(${t}\\right)` : `(${t})`;
    return t.includes('frac') ? `\\left(${t}\\right)` : t;
  }
  toString() { return this.d === 1n ? String(this.n) : `${this.n}/${this.d}`; }
}
export const q = (n, d = 1) => new Q(BigInt(n), BigInt(d));
const ZERO = q(0), ONE = q(1);
const assert = (c, m) => { if (!c) throw new Error(`gp check failed: ${m}`); };

// ---------------------------------------------------------------- geometric progressions
export class GP {
  constructor(a, r) {
    this.a = Q.of(a); this.r = Q.of(r);
    assert(!this.a.isZero() && !this.r.isZero(), 'a GP needs a non-zero first term and ratio');
    Object.freeze(this);
  }
  /** The first n terms by repeated multiplication. */
  list(n) { const out = [this.a]; while (out.length < n) out.push(out[out.length - 1].mul(this.r)); return out; }
  /** T_n = a r^{n-1}, checked against the listed sequence. */
  term(n) {
    assert(Number.isInteger(n) && n >= 1, `term index ${n}`);
    const v = this.a.mul(this.r.pow(n - 1));
    assert(v.eq(this.list(n)[n - 1]), `T_${n} formula vs listing`);
    return v;
  }
  /** S_n by both closed forms (when r is not 1) and by adding the listed terms. */
  sum(n) {
    const L = this.list(n).reduce((s, t) => s.add(t), ZERO);
    if (this.r.eq(1)) assert(L.eq(this.a.mul(n)), 'S_n = na when r = 1');
    else {
      const f1 = this.a.mul(this.r.pow(n).sub(1)).div(this.r.sub(1));
      const f2 = this.a.mul(ONE.sub(this.r.pow(n))).div(ONE.sub(this.r));
      assert(f1.eq(L) && f2.eq(L), `S_${n} formulas vs listing`);
    }
    return L;
  }
  /** The k-th term from the end of the GP whose last term is T_N: T_{N-k+1}, checked as l (1/r)^{k-1}. */
  fromEnd(N, k) {
    const l = this.term(N);
    const v = l.mul(this.r.inv().pow(k - 1));
    assert(v.eq(this.term(N - k + 1)), 'term from the end');
    return v;
  }
  /** Index of the term equal to t (walking the listed terms), or null; the hit must be unique. */
  whichTerm(t, max = 200) {
    t = Q.of(t);
    const L = this.list(max);
    const hits = L.map((x, i) => (x.eq(t) ? i + 1 : 0)).filter(Boolean);
    assert(hits.length <= 1 || this.r.abs().eq(1), 'a value appears twice');
    return hits.length ? hits[0] : null;
  }
  /** Number of terms whose sum is S (walking the partial sums), or null. */
  termsForSum(S, max = 200) {
    S = Q.of(S);
    let s = ZERO;
    const hits = [];
    this.list(max).forEach((t, i) => { s = s.add(t); if (s.eq(S)) hits.push(i + 1); });
    assert(hits.length <= 1, 'sum reached twice');
    if (hits.length) assert(this.sum(hits[0]).eq(S), 'sum by formula');
    return hits.length ? hits[0] : null;
  }
  /** Least n with S_n > bound (partial sums walked), or null. */
  firstSumAbove(bound, max = 200) {
    bound = Q.of(bound);
    let s = ZERO;
    const L = this.list(max);
    for (let i = 0; i < L.length; i++) { s = s.add(L[i]); if (s.gt(bound)) return i + 1; }
    return null;
  }
  /** Least n with T_n compared to bound ('>' or '<'), or null. */
  firstTerm(cmp, bound, max = 200) {
    bound = Q.of(bound);
    const L = this.list(max);
    const i = L.findIndex((t) => (cmp === '>' ? t.gt(bound) : t.lt(bound)));
    return i < 0 ? null : i + 1;
  }
}
export const gp = (a, r) => new GP(a, r);

/** Common ratio of a list of numbers, or null if it is not a GP (zero terms are not allowed). */
export function ratioOf(list) {
  const L = list.map(Q.of);
  if (L.length < 2 || L.some((x) => x.isZero())) return null;
  const r = L[1].div(L[0]);
  return L.every((x, i) => i === 0 || x.div(L[i - 1]).eq(r)) ? r : null;
}

function bigRoot(x, k) {
  // integer k-th root of x >= 0, or null when x is not a perfect k-th power
  if (x < 0n) return null;
  if (x < 2n) return x;
  let lo = 0n, hi = 1n;
  while (hi ** BigInt(k) <= x) hi *= 2n;
  while (hi - lo > 1n) { const m = (lo + hi) / 2n; if (m ** BigInt(k) <= x) lo = m; else hi = m; }
  return lo ** BigInt(k) === x ? lo : null;
}
/** Every rational y with y^k = x (k >= 1), ascending. */
export function rationalRoots(x, k) {
  x = Q.of(x);
  if (x.isZero()) return [ZERO];
  const neg = x.sign() < 0;
  if (neg && k % 2 === 0) return [];
  const n = bigRoot(babs(x.n), k), d = bigRoot(x.d, k);
  if (n === null || d === null) return [];
  const y = new Q(n, d);
  const out = k % 2 === 0 ? [y.neg(), y] : [neg ? y.neg() : y];
  out.forEach((v) => assert(v.pow(k).eq(x), 'root check'));
  return out;
}
/** Every GP with T_p = Tp and T_m = Tm (p < m): r^{m-p} = Tm / Tp, a = Tp / r^{p-1}; each checked back. */
export function fromTwoTerms(p, Tp, m, Tm) {
  Tp = Q.of(Tp); Tm = Q.of(Tm);
  const rs = rationalRoots(Tm.div(Tp), m - p);
  return rs.map((r) => { const g = gp(Tp.div(r.pow(p - 1)), r); assert(g.term(p).eq(Tp) && g.term(m).eq(Tm), 'two-term GP'); return g; });
}

// ---------------------------------------------------------------- TeX for sequences and standard working
/** "3, 6, 12, 24, \ldots" from terms (fractions as \dfrac; decimals when dec). */
export const seqTex = (terms, { dots = true, dec = false } = {}) => terms.map((t) => (dec ? Q.of(t).dtex() : Q.of(t).tex())).join(', ') + (dots ? r`, \ldots` : '');
/** "2 - 4 + 8 - 16" (a sum of listed terms with signs folded in). */
export const addTex = (terms, { dec = false } = {}) => terms.map(Q.of).map((t, i) => { const s = dec ? t.abs().dtex() : t.abs().tex(); return i === 0 ? (dec ? t.dtex() : t.tex()) : `${t.sign() < 0 ? ' - ' : ' + '}${s}`; }).join('');
function r(strings, ...vals) { return String.raw(strings, ...vals); }
/** Coefficient times something: omits "1 \times". */
const times = (A, X) => (A === '1' ? X : `${A} \\times ${X}`);
/** T_n = a r^{n-1} = a × r^{n-1} = value (typed in full, checked by steps()). */
/** A factor after "\times": negatives bracketed, positives bare. */
const wrapNeg = (x, dec) => (x.sign() < 0 ? x.ptex(dec) : dec ? x.dtex() : x.tex());
export function termLine(g, n, { dec = false, name = 'T', short = false } = {}) {
  const t = (x) => (dec ? x.dtex() : x.tex());
  const A = t(g.a), R = g.r.ptex(dec), P = g.r.pow(n - 1), V = g.term(n);
  const head = `${name}_{${n}} = ${short ? '' : `ar^{${n - 1}} = `}${times(A, `${R}^{${n - 1}}`)}`;
  return g.a.eq(1) ? `${head} = ${t(V)}` : `${head} = ${times(A, wrapNeg(P, dec))} = ${t(V)}`;
}
/** S_n by the formula that suits r (r > 1: (r^n - 1)/(r - 1); r < 1: (1 - r^n)/(1 - r)), typed in full. */
export function sumLine(g, n, { dec = false, name = 'S' } = {}) {
  const t = (x) => (dec ? x.dtex() : x.tex());
  const A = t(g.a), R = g.r.ptex(dec), Rn = g.r.pow(n), V = g.sum(n);
  const lead = A === '1' ? '' : A === '-1' ? '-' : A;
  if (g.r.gt(1)) {
    const top = Rn.sub(1), bot = g.r.sub(1);
    const first = `\\dfrac{${lead}\\left(${R}^{${n}} - 1\\right)}{${t(g.r)} - 1}`;
    const second = `\\dfrac{${times(A, wrapNeg(top, dec))}}{${t(bot)}}`;
    return `${name}_{${n}} = ${first} = ${second} = ${t(V)}`;
  }
  const top = ONE.sub(Rn), bot = ONE.sub(g.r);
  const first = `\\dfrac{${lead}\\left(1 - ${R}^{${n}}\\right)}{1 - ${wrapNeg(g.r, dec)}}`;
  const second = `\\dfrac{${times(A, wrapNeg(top, dec))}}{${t(bot)}}`;
  return `${name}_{${n}} = ${first} = ${second} = ${t(V)}`;
}

// ---------------------------------------------------------------- working-line checker
// A typed line is split into pieces at \Rightarrow, \text{so|and|hence}, ", ", ";" and \quad. In each piece the
// relations = < > \le \ge \approx \ne separate sides. A side is evaluated exactly in the context: letters are
// variables given by a verified solution (ctx.sols, e.g. { n: 7 } or { r: 3 } / { r: -3 }) or free variables
// (ctx.free, sampled, so the two sides must be identical), and T_{k}, S_{k} (or other ctx.fns) are evaluated by
// the GP that produced them. A side with \text, \ldots or an unknown letter is a label and is skipped, but every
// piece must compare at least two evaluated sides. Adjacent evaluated sides must satisfy the relation between
// them (\approx: the right side is the left rounded to the decimals shown) for one verified solution; pieces
// joined by \text{ or } must between them hold for every verified solution. Any parse error stops the build.

function lex(tex) {
  const toks = [];
  let i = 0;
  const s = tex;
  while (i < s.length) {
    const c = s[i];
    if (/\s|~/.test(c)) { i++; continue; }
    if (c === '\\') {
      const m = /^\\([a-zA-Z]+|.)/.exec(s.slice(i));
      const cmd = m[1];
      i += m[0].length;
      if ([',', ';', '!', ':', ' '].includes(cmd) || cmd === 'left' || cmd === 'right' || cmd === 'displaystyle') continue;
      if (cmd === 'text' || cmd === 'mathrm' || cmd === 'textrm') {
        // swallow the braced argument
        let depth = 0, j = i;
        do { if (s[j] === '{') depth++; else if (s[j] === '}') depth--; j++; } while (depth > 0 && j < s.length);
        toks.push({ k: 'label', v: s.slice(i, j) });
        i = j;
        continue;
      }
      if (['ldots', 'cdots', 'dots'].includes(cmd)) { toks.push({ k: 'label', v: cmd }); continue; }
      if (cmd === 'times' || cmd === 'cdot') { toks.push({ k: 'op', v: '*' }); continue; }
      if (cmd === 'div') { toks.push({ k: 'op', v: '/' }); continue; }
      if (cmd === '%') { toks.push({ k: 'op', v: '%' }); continue; }
      if (['dfrac', 'frac', 'tfrac'].includes(cmd)) { toks.push({ k: 'frac' }); continue; }
      if (['approx', 'ne', 'neq', 'le', 'leq', 'ge', 'geq'].includes(cmd)) { toks.push({ k: 'rel', v: { neq: 'ne', leq: 'le', geq: 'ge' }[cmd] ?? cmd }); continue; }
      throw new Error(`unsupported TeX \\${cmd} in a working line: ${tex}`);
    }
    if (/\d/.test(c)) { const m = /^\d+(?:\.\d+)?/.exec(s.slice(i)); toks.push({ k: 'num', v: m[0] }); i += m[0].length; continue; }
    if (/[a-zA-Z]/.test(c)) { toks.push({ k: 'id', v: c }); i++; continue; }
    if ('+-*/^_(){}'.includes(c)) { toks.push({ k: 'op', v: c }); i++; continue; }
    if (c === '=' || c === '<' || c === '>') { toks.push({ k: 'rel', v: c }); i++; continue; }
    throw new Error(`unexpected "${c}" in working line: ${tex}`);
  }
  return toks;
}

/** Parse a token list (one side) to an AST. */
function parseSide(toks, src) {
  let p = 0;
  const peek = () => toks[p];
  const isOp = (v) => peek()?.k === 'op' && peek().v === v;
  const eat = (v) => { if (!isOp(v)) throw new Error(`expected ${v} in ${src}`); p++; };
  const group = () => { if (isOp('{')) { p++; const e = sum(); eat('}'); return e; } return atom(); };
  function sum() {
    let a = prod();
    while (isOp('+') || isOp('-')) { const op = toks[p++].v; a = { t: op, a, b: prod() }; }
    return a;
  }
  function prod() {
    let a = unary();
    for (;;) {
      if (isOp('*') || isOp('/')) { const op = toks[p++].v; a = { t: op, a, b: unary() }; continue; }
      const t = peek();
      if (t && (t.k === 'id' || t.k === 'frac' || (t.k === 'op' && (t.v === '(' || t.v === '{')))) { a = { t: '*', a, b: power() }; continue; }
      if (t && t.k === 'num') throw new Error(`a number follows an expression without an operator in ${src}`);
      return a;
    }
  }
  function unary() { if (isOp('-')) { p++; return { t: 'neg', a: unary() }; } if (isOp('+')) { p++; return unary(); } return power(); }
  function power() {
    let a = atom();
    for (;;) {
      if (isOp('^')) {
        p++;
        if (peek()?.k === 'num' && peek().v.length > 1) throw new Error(`exponent needs braces in ${src}`);
        a = { t: '^', a, b: isOp('{') ? group() : atom() };
        continue;
      }
      if (isOp('%')) { p++; a = { t: '/', a, b: { t: 'num', v: q(100) } }; continue; }
      return a;
    }
  }
  function atom() {
    const t = toks[p++];
    if (!t) throw new Error(`unexpected end of ${src}`);
    if (t.k === 'num') return { t: 'num', v: Q.of(t.v) };
    if (t.k === 'frac') { const a = group(); const b = group(); return { t: '/', a, b }; }
    if (t.k === 'id') {
      if (isOp('_')) { p++; const arg = isOp('{') ? group() : atom(); return { t: 'call', f: t.v, a: arg }; }
      return { t: 'var', v: t.v };
    }
    if (t.k === 'op' && t.v === '(') { const e = sum(); eat(')'); return e; }
    if (t.k === 'op' && t.v === '{') { const e = sum(); eat('}'); return e; }
    throw new Error(`unexpected ${t.v ?? t.k} in ${src}`);
  }
  const ast = sum();
  if (p !== toks.length) throw new Error(`trailing input in ${src}`);
  return ast;
}
function evalAst(n, env, fns) {
  switch (n.t) {
    case 'num': return n.v;
    case 'var': if (!(n.v in env)) throw new Error(`unknown ${n.v}`); return Q.of(env[n.v]);
    case 'neg': return evalAst(n.a, env, fns).neg();
    case '+': return evalAst(n.a, env, fns).add(evalAst(n.b, env, fns));
    case '-': return evalAst(n.a, env, fns).sub(evalAst(n.b, env, fns));
    case '*': return evalAst(n.a, env, fns).mul(evalAst(n.b, env, fns));
    case '/': return evalAst(n.a, env, fns).div(evalAst(n.b, env, fns));
    case '^': { const e = evalAst(n.b, env, fns); if (!e.isInt()) throw new Error('non-integer power'); return evalAst(n.a, env, fns).pow(Number(e.n)); }
    case 'call': { if (!fns[n.f]) throw new Error(`unknown ${n.f}_`); const k = evalAst(n.a, env, fns); if (!k.isInt()) throw new Error('non-integer index'); return Q.of(fns[n.f](Number(k.n), env)); }
  }
  throw new Error(`bad node ${n.t}`);
}
const usesVar = (n, names) => (n.t === 'var' && names.includes(n.v)) || ['a', 'b'].some((k) => n[k] && typeof n[k] === 'object' && usesVar(n[k], names));

const SAMPLES = { n: [1, 2, 3, 4, 5, 6, 7], k: [1, 2, 3, 4, 5, 6, 7], a: ['3', '-2', '5/7', '11', '-1/3', '4', '9/2'], r: ['2', '-3', '1/2', '5/3', '-2/5', '3', '7/4'], x: ['3', '-2', '5/7', '11', '-1/3', '4', '9/2'] };
const RELS = { '=': (c) => c === 0, '<': (c) => c < 0, '>': (c) => c > 0, le: (c) => c <= 0, ge: (c) => c >= 0, ne: (c) => c !== 0 };

/** Errors (empty = fine) for one typed line in a context { sols: [env…], free: [names], fns: { T: (k, env) => Q } }. */
export function checkLine(line, ctx = {}) {
  const errs = [];
  const sols = ctx.sols?.length ? ctx.sols : [{}];
  const free = ctx.free ?? [];
  const fns = ctx.fns ?? {};
  const envsFor = (sol) => (free.length ? SAMPLES[free[0]].map((_, i) => ({ ...sol, ...Object.fromEntries(free.map((v, j) => [v, SAMPLES[v][(i + 2 * j) % 7]])) })) : [sol]);
  /** Indices of sols at which a piece holds (throws on parse errors). */
  const holds = (piece) => {
    const toks = lex(piece);
    const sides = [[]], rels = [];
    let depth = 0;
    for (const t of toks) {
      if (t.k === 'op' && (t.v === '(' || t.v === '{')) depth++;
      if (t.k === 'op' && (t.v === ')' || t.v === '}')) depth--;
      if (t.k === 'rel' && depth === 0) { rels.push(t.v); sides.push([]); } else sides[sides.length - 1].push(t);
    }
    if (!rels.length) throw new Error(`no relation in "${piece}" of "${line}"`);
    const srcs = [];
    { // source text of each side, for \approx decimals
      let rest = piece;
      const re = /(\\approx|\\neq?|\\leq?|\\geq?(?![a-z])|=|<|>)/;
      for (let i = 0; i < sides.length; i++) { const m = re.exec(rest); srcs.push(m ? rest.slice(0, m.index) : rest); rest = m ? rest.slice(m.index + m[0].length) : ''; }
    }
    const asts = sides.map((s, i) => (s.length === 0 || s.some((t) => t.k === 'label') ? null : parseSide(s, srcs[i])));
    const ok = [];
    sols.forEach((sol, si) => {
      const envs = envsFor(sol);
      const vals = asts.map((ast) => { if (!ast) return null; try { return envs.map((e) => evalAst(ast, e, fns)); } catch (x) { if (/unknown/.test(x.message)) return null; throw x; } });
      const live = vals.map((v, i) => [v, i]).filter(([v]) => v);
      if (live.length < 2) throw new Error(`nothing to check in "${piece}"`);
      let good = true;
      for (let j = 0; j + 1 < live.length; j++) {
        const [va, ia] = live[j], [vb, ib] = live[j + 1];
        const between = rels.slice(ia, ib);
        const strong = between.filter((x) => x !== '=');
        if (strong.length > 1) throw new Error(`two different relations between checked sides in "${piece}"`);
        const rel = strong[0] ?? '=';
        if (rel === 'approx') {
          const m = /(-?\d+)(?:\.(\d+))?\s*$/.exec(srcs[ib].trim());
          const places = m?.[2]?.length ?? 0;
          const half = q(1, 2).div(q(10).pow(places));
          if (!va.every((x, k) => x.sub(vb[k]).abs().cmp(half) <= 0)) good = false;
        } else if (!va.every((x, k) => RELS[rel](x.cmp(vb[k])))) good = false;
      }
      if (good) ok.push(si);
    });
    return ok;
  };
  const pieces = line.split(/\\Rightarrow|\\implies|\\therefore|\\text\{\s*(?:so|and|hence|giving)\s*\}|,\s|;|\\qquad|\\quad/).map((s) => s.trim()).filter(Boolean);
  for (const piece of pieces) {
    try {
      if (/\\text\{\s*or\s*\}/.test(piece)) {
        const covered = new Set();
        for (const alt of piece.split(/\\text\{\s*or\s*\}/)) { const h = holds(alt.trim()); if (!h.length) errs.push(`"${alt.trim()}" holds for no verified solution`); h.forEach((x) => covered.add(x)); }
        if (covered.size !== sols.length) errs.push(`"${piece}": the alternatives cover ${covered.size} of ${sols.length} verified solutions`);
        continue;
      }
      if (!holds(piece).length) errs.push(`"${piece}" does not hold`);
    } catch (x) { throw new Error(`${x.message} [line: ${line}]`); }
  }
  return errs;
}

/** Working lines bound to a context: md for Markdown, verify(C) inside an item check, must() in build code. */
export function steps(ctx, lines) {
  return {
    lines,
    md: lines.map((l) => `$${l}$`),
    verify(C, label = '') { for (const l of lines) { const e = checkLine(l, ctx); C.assert(!e.length, `${label}working line "${l}" ${e.length ? e.join('; ') : 'checked'}`); } },
    must(msg = '') { for (const l of lines) { const e = checkLine(l, ctx); if (e.length) throw new Error(`${msg}: ${e.join('; ')}`); } return this; },
  };
}
/** Context for a GP g: T_{k} and S_{k} evaluate on g; letters a and r are its first term and ratio. */
export const gctx = (g, extra = {}) => ({ sols: [{ a: g.a, r: g.r, ...(extra.sol ?? {}) }], free: extra.free ?? [], fns: { T: (k) => g.term(k), S: (k) => g.sum(k), ...(extra.fns ?? {}) } });
/** Context for an unknown (e.g. n, r or x) with every verified solution listed. */
export const uctx = (name, values, fns = {}) => ({ sols: values.map((v) => ({ [name]: Q.of(v) })), fns });
/** Pure arithmetic. */
export const ARITH = { sols: [{}], fns: {} };
/** Identities in n for a GP g (general term formulas): T_{n} and S_{n} are compared at n = 1…7. */
export const nctx = (g) => ({ sols: [{ a: g.a, r: g.r }], free: ['n'], fns: { T: (k) => g.term(k), S: (k) => g.sum(k) } });
