// Exact solver and working-line generator for ICSE 9 Mathematics ch05 Simultaneous Linear Equations.
//   * Fr: exact rational arithmetic (integers n/d, always in lowest terms).
//   * Sys: a pair a1 x + b1 y = c1, a2 x + b2 y = c2 with integer coefficients. The solution is found exactly by
//     Cramer's rule, cross-checked against lib.mjs `solve2` (floating point) and substituted back into both
//     equations in exact arithmetic; a pair without a unique solution stops the build.
//   * elimSteps / substSteps / crossSteps: generate every working line of the three methods from the computed
//     values (multipliers, sums, denominators, back-substitution), and assert that the answer each method reaches is
//     the exact solution of the pair.
//   * parseTex / holds / W: parse a typed working line (an equation, a chain a = b = c, or arithmetic) exactly and
//     check it at the verified solution, so a typed line with a slip stops the build.
//   * words: integers in English for the slide narration.
import { solve2 } from './lib.mjs';

const gcd = (a, b) => (b === 0 ? Math.abs(a) : gcd(b, a % b));
const lcm = (a, b) => Math.abs(a * b) / gcd(a, b);

// ---------------------------------------------------------------- exact rationals
export class Fr {
  constructor(n, d = 1) {
    if (!Number.isInteger(n) || !Number.isInteger(d)) throw new Error(`Fr needs integers: ${n}/${d}`);
    if (d === 0) throw new Error('division by zero');
    if (d < 0) { n = -n; d = -d; }
    const g = gcd(n, d) || 1;
    this.n = n / g; this.d = d / g;
  }
  add(o) { return new Fr(this.n * o.d + o.n * this.d, this.d * o.d); }
  sub(o) { return new Fr(this.n * o.d - o.n * this.d, this.d * o.d); }
  mul(o) { return new Fr(this.n * o.n, this.d * o.d); }
  div(o) { return new Fr(this.n * o.d, this.d * o.n); }
  neg() { return new Fr(-this.n, this.d); }
  abs() { return new Fr(Math.abs(this.n), this.d); }
  pow(k) { let v = new Fr(1); for (let i = 0; i < Math.abs(k); i++) v = v.mul(this); return k < 0 ? new Fr(1).div(v) : v; }
  eq(o) { return this.n === o.n && this.d === o.d; }
  get isInt() { return this.d === 1; }
  get isZero() { return this.n === 0; }
  get sign() { return Math.sign(this.n); }
  get num() { return this.n / this.d; }
  tex() { return this.d === 1 ? `${this.n}` : `${this.n < 0 ? '-' : ''}\\dfrac{${Math.abs(this.n)}}{${this.d}}`; }
}
export const F = (n, d = 1) => (n instanceof Fr ? n : new Fr(n, d));
/** TeX of a value as it is put inside a bracket-needing position: negatives and fractions get brackets. */
const par = (v) => (v.sign < 0 || !v.isInt ? `(${v.tex()})` : v.tex());

/** a1 v1 + a2 v2 + ... + k as TeX: terms = [[coef, 'x'], [coef, ''], ...] (coef Fr or integer; zero coefficients are dropped). */
export function polyTex(terms) {
  const ts = terms.map(([c, v]) => [F(c), v]).filter(([c]) => !c.isZero);
  if (!ts.length) return '0';
  return ts.map(([c, v], i) => {
    const ab = c.abs();
    const body = v === '' ? ab.tex() : ab.eq(F(1)) ? v : `${ab.tex()}${v}`;
    if (i === 0) return `${c.sign < 0 ? '-' : ''}${body}`;
    return ` ${c.sign < 0 ? '-' : '+'} ${body}`;
  }).join('');
}
export const eqTex = (a, b, c, vx = 'x', vy = 'y') => `${polyTex([[a, vx], [b, vy]])} = ${F(c).tex()}`;
/** a x + b y + c = 0, the standard form of the cross-multiplication scheme (c is the constant term, not the right-hand side). */
export const stdTex = (a, b, c, vx = 'x', vy = 'y') => `${polyTex([[a, vx], [b, vy], [c, '']])} = 0`;

// ---------------------------------------------------------------- exact parser for typed working lines
function parseAst(src) {
  const s = src.replace(/\\left|\\right/g, '').replace(/\\[,;!]|\\ |\\quad|\\qquad/g, ' ').replace(/\\[dt]frac/g, '\\frac').replace(/\\times|\\cdot/g, '*').replace(/\\div/g, '/');
  let i = 0;
  const err = (m) => { throw new Error(`${m} in "${src}" at ${i} ("${s.slice(i, i + 12)}")`); };
  const sk = () => { while (s[i] === ' ') i++; };
  const expr = () => { let v = term(); for (;;) { sk(); if (s[i] === '+') { i++; v = ['+', v, term()]; } else if (s[i] === '-') { i++; v = ['-', v, term()]; } else return v; } };
  const term = () => {
    let v = unary();
    for (;;) {
      sk();
      const c = s[i];
      if (c === '*') { i++; v = ['*', v, unary()]; }
      else if (c === '/') { i++; v = ['/', v, unary()]; }
      else if (c !== undefined && (/[a-zA-Z(]/.test(c) || s.startsWith('\\frac', i))) v = ['*', v, power()];
      else return v;
    }
  };
  const unary = () => { sk(); if (s[i] === '-') { i++; return ['neg', unary()]; } if (s[i] === '+') { i++; return unary(); } return power(); };
  const power = () => {
    const b = atom();
    sk();
    if (s[i] === '^') { i++; sk(); let e; if (s[i] === '{') { i++; e = expr(); sk(); if (s[i++] !== '}') err('missing }'); } else { const m = /^-?\d+/.exec(s.slice(i)); if (!m) err('bad exponent'); i += m[0].length; e = ['n', F(Number(m[0]))]; } return ['^', b, e]; }
    return b;
  };
  const atom = () => {
    sk();
    const c = s[i];
    if (c === undefined) err('unexpected end');
    if (/\d/.test(c)) { const m = /^\d+(?:\.\d+)?/.exec(s.slice(i)); i += m[0].length; const [ip, fp = ''] = m[0].split('.'); return ['n', new Fr(Number(ip + fp), 10 ** fp.length)]; }
    if (/[a-zA-Z]/.test(c)) { i++; return ['v', c]; }
    if (c === '(') { i++; const e = expr(); sk(); if (s[i++] !== ')') err('missing )'); return e; }
    if (c === '{') { i++; const e = expr(); sk(); if (s[i++] !== '}') err('missing }'); return e; }
    if (s.startsWith('\\frac', i)) {
      i += 5; sk();
      if (s[i++] !== '{') err('frac needs {'); const a = expr(); sk(); if (s[i++] !== '}') err('frac missing }');
      sk(); if (s[i++] !== '{') err('frac needs second {'); const b = expr(); sk(); if (s[i++] !== '}') err('frac missing second }');
      return ['/', a, b];
    }
    return err(`unsupported token "${c}"`);
  };
  const ast = expr();
  sk();
  if (i < s.length) err('trailing text');
  return ast;
}
function evalAst(a, env) {
  switch (a[0]) {
    case 'n': return a[1];
    case 'v': if (!(a[1] in env)) throw new Error(`unknown letter ${a[1]}`); return F(env[a[1]]);
    case 'neg': return evalAst(a[1], env).neg();
    case '+': return evalAst(a[1], env).add(evalAst(a[2], env));
    case '-': return evalAst(a[1], env).sub(evalAst(a[2], env));
    case '*': return evalAst(a[1], env).mul(evalAst(a[2], env));
    case '/': return evalAst(a[1], env).div(evalAst(a[2], env));
    case '^': { const e = evalAst(a[2], env); if (!e.isInt) throw new Error('fractional exponent'); return evalAst(a[1], env).pow(e.n); }
    default: throw new Error('bad ast');
  }
}
/** Exact value of a TeX expression at env (letters map to Fr or integers). */
export const evalTex = (tex, env = {}) => evalAst(parseAst(tex), env);

/** The line is one or more statements "p = q = r" (split on \Rightarrow, \text{ and }, and the semicolon); every side must be equal at env. */
export function holds(env, line) {
  const statements = line.split(/\\Rightarrow|\\Longrightarrow|\\text\{\s*and\s*\}|;/).map((t) => t.trim()).filter(Boolean);
  const bad = [];
  for (const st of statements) {
    const sides = st.split('=');
    if (sides.length < 2) throw new Error(`not an equation: ${st}`);
    const vals = sides.map((t) => evalTex(t, env));
    if (!vals.every((v) => v.eq(vals[0]))) bad.push(`${st}  [sides: ${vals.map((v) => v.tex()).join(' | ')}]`);
  }
  return bad;
}
/** Asserts every line at env; throws with the offending lines. Returns true so it can sit inside C.assert(...). */
export function W(env, lines) {
  const bad = lines.flatMap((ln) => holds(env, ln).map((b) => `${ln}: ${b}`));
  if (bad.length) throw new Error(`working line(s) wrong at ${JSON.stringify(Object.fromEntries(Object.entries(env).map(([k, v]) => [k, F(v).tex()])))}:\n    ${bad.join('\n    ')}`);
  return true;
}

/** Coefficients [a, b, c] of the equation "L = R" typed in TeX, written a x + b y = c; throws if it is not linear in x and y. */
export function coefsOf(tex, vx = 'x', vy = 'y') {
  const [L, R] = tex.split('=');
  if (R === undefined || tex.split('=').length !== 2) throw new Error(`need one "=": ${tex}`);
  const P = (x, y) => evalTex(L, { [vx]: x, [vy]: y }).sub(evalTex(R, { [vx]: x, [vy]: y }));
  const p00 = P(0, 0), a = P(1, 0).sub(p00), b = P(0, 1).sub(p00);
  if (!P(2, 3).eq(p00.add(a.mul(F(2))).add(b.mul(F(3)))) || !P(-5, 7).eq(p00.add(a.mul(F(-5))).add(b.mul(F(7))))) throw new Error(`not linear: ${tex}`);
  return [a, b, p00.neg()];
}
/** Integer coefficients [a, b, c] of the equation after clearing every denominator (and dividing out a common factor). */
export function cleared(tex, vx = 'x', vy = 'y') {
  const cs = coefsOf(tex, vx, vy);
  const L = cs.reduce((m, v) => lcm(m, v.d), 1);
  const ints = cs.map((v) => v.mul(F(L)).n);
  const g = ints.reduce((m, v) => gcd(m, v), 0) || 1;
  return ints.map((v) => v / g);
}
/** Same line (equal up to a non-zero multiple)? */
export function sameEq(t1, t2, vx = 'x', vy = 'y') {
  const p = coefsOf(t1, vx, vy), q = coefsOf(t2, vx, vy);
  const k = !p[0].isZero ? q[0].div(p[0]) : q[1].div(p[1]);
  return !k.isZero && p.every((v, i) => q[i].eq(v.mul(k)));
}

// ---------------------------------------------------------------- the pair of equations
export class Sys {
  constructor(a1, b1, c1, a2, b2, c2, vx = 'x', vy = 'y') {
    Object.assign(this, { a1, b1, c1, a2, b2, c2, vx, vy });
    for (const v of [a1, b1, c1, a2, b2, c2]) if (!Number.isInteger(v)) throw new Error('Sys takes integer coefficients');
    this.det = a1 * b2 - a2 * b1;
    if (this.det === 0) throw new Error(`no unique solution for ${this.tex(1)}, ${this.tex(2)}`);
    this.x = new Fr(c1 * b2 - c2 * b1, this.det);
    this.y = new Fr(a1 * c2 - a2 * c1, this.det);
    const [fx, fy] = solve2(a1, b1, c1, a2, b2, c2);
    if (Math.abs(fx - this.x.num) > 1e-9 || Math.abs(fy - this.y.num) > 1e-9) throw new Error('exact solution disagrees with solve2');
    const ok = F(a1).mul(this.x).add(F(b1).mul(this.y)).eq(F(c1)) && F(a2).mul(this.x).add(F(b2).mul(this.y)).eq(F(c2));
    if (!ok) throw new Error('solution does not satisfy both equations');
  }
  tex(i) { return i === 1 ? eqTex(this.a1, this.b1, this.c1, this.vx, this.vy) : eqTex(this.a2, this.b2, this.c2, this.vx, this.vy); }
  get env() { return { [this.vx]: this.x, [this.vy]: this.y }; }
  get pair() { return [this.x.num, this.y.num]; }
  /** Does (x, y) satisfy equation i? */
  satisfies(i, x, y) { const [a, b, c] = i === 1 ? [this.a1, this.b1, this.c1] : [this.a2, this.b2, this.c2]; return F(a).mul(F(x)).add(F(b).mul(F(y))).eq(F(c)); }
  both(x, y) { return this.satisfies(1, x, y) && this.satisfies(2, x, y); }
}
/** The pair with the chosen integer-or-fraction solution (x0, y0): the right-hand sides are computed, then the pair is re-solved. */
export function sysFrom(a1, b1, a2, b2, x0, y0, vx = 'x', vy = 'y') {
  const c1 = F(a1).mul(F(x0)).add(F(b1).mul(F(y0))), c2 = F(a2).mul(F(x0)).add(F(b2).mul(F(y0)));
  if (!c1.isInt || !c2.isInt) throw new Error('right-hand sides are not integers');
  const S = new Sys(a1, b1, c1.n, a2, b2, c2.n, vx, vy);
  if (!S.x.eq(F(x0)) || !S.y.eq(F(y0))) throw new Error('chosen solution not recovered');
  return S;
}

// ---------------------------------------------------------------- elimination
/**
 * Eliminate variable `ev` (S.vx or S.vy). Returns { m1, m2, op, rows } where rows is [label, tex] pairs:
 * multiply, the two scaled equations, the sum or difference, the single-variable equation, its solution,
 * and the back-substitution into equation `back` (1 or 2). Asserts the answer equals the exact solution.
 */
export function elimSteps(S, ev, back = 1) {
  const { vx, vy } = S;
  const onX = ev === vx;
  const p1 = onX ? S.a1 : S.b1, p2 = onX ? S.a2 : S.b2;
  const L = lcm(Math.abs(p1), Math.abs(p2));
  const m1 = L / Math.abs(p1), m2 = L / Math.abs(p2);
  const E1 = [S.a1 * m1, S.b1 * m1, S.c1 * m1], E2 = [S.a2 * m2, S.b2 * m2, S.c2 * m2];
  const subtract = p1 * p2 > 0;
  const R = E1.map((v, i) => (subtract ? v - E2[i] : v + E2[i]));
  const gone = onX ? R[0] : R[1];
  if (gone !== 0) throw new Error('elimination left the variable');
  const w = onX ? vy : vx; // the variable that remains
  const k = onX ? R[1] : R[0], rhs = R[2];
  const wv = new Fr(rhs, k);
  if (!wv.eq(onX ? S.y : S.x)) throw new Error('elimination result is not the exact solution');
  const rows = [];
  const mult = [m1 !== 1 ? `equation (1) by $${m1}$` : null, m2 !== 1 ? `equation (2) by $${m2}$` : null].filter(Boolean).join(' and ');
  if (mult) rows.push([`Multiply ${mult} so the coefficients of $${ev}$ match in size`, '']);
  rows.push([m1 !== 1 ? 'New (1)' : 'Equation (1)', eqTex(E1[0], E1[1], E1[2], vx, vy)], [m2 !== 1 ? 'New (2)' : 'Equation (2)', eqTex(E2[0], E2[1], E2[2], vx, vy)]);
  const lhs1 = polyTex([[E1[0], vx], [E1[1], vy]]), lhs2 = polyTex([[E2[0], vx], [E2[1], vy]]);
  rows.push([subtract ? 'The $' + ev + '$-terms have the same sign: subtract (2) from (1)' : 'The $' + ev + '$-terms have opposite signs: add (1) and (2)', `(${lhs1}) ${subtract ? '-' : '+'} (${lhs2}) = ${F(E1[2]).tex()} ${subtract ? '-' : '+'} ${par(F(E2[2]))}`]);
  rows.push(['Simplify: $' + ev + '$ has gone', `${polyTex([[k, w]])} = ${F(rhs).tex()}`]);
  if (k !== 1) rows.push([`Divide by $${k}$`, `${w} = \\dfrac{${rhs}}{${k}} = ${wv.tex()}`]);
  else rows.push([`Read off $${w}$`, `${w} = ${wv.tex()}`]);
  // back-substitution
  const [ea, eb, ec] = back === 1 ? [S.a1, S.b1, S.c1] : [S.a2, S.b2, S.c2];
  const cw = F(onX ? eb : ea), cv = F(onX ? ea : eb); // coefficient of w and of ev in the chosen equation
  const known = cw.mul(wv); // value of the w-term
  const back1 = (onX ? [[cv, ev], [cw, w]] : [[cw, w], [cv, ev]]).map(([c, v]) => (v === w ? subTerm(c, wv) : { sign: c.sign, body: c.abs().eq(F(1)) ? v : `${c.abs().tex()}${v}` }));
  rows.push([`Put $${w} = ${wv.tex()}$ into equation (${back})`, joinTerms(back1) + ` = ${F(ec).tex()}`]);
  const evv = F(ec).sub(known).div(cv);
  if (!evv.eq(onX ? S.x : S.y)) throw new Error('back-substitution is not the exact solution');
  rows.push(['Isolate the $' + ev + '$-term', `${polyTex([[cv, ev]])} = ${F(ec).tex()} ${known.sign < 0 ? '+' : '-'} ${known.abs().tex()} = ${F(ec).sub(known).tex()}`]);
  rows.push([`Solve for $${ev}$`, cv.eq(F(1)) ? `${ev} = ${evv.tex()}` : `${ev} = \\dfrac{${F(ec).sub(known).tex()}}{${cv.tex()}} = ${evv.tex()}`]);
  return { m1, m2, op: subtract ? 'subtract' : 'add', E1, E2, R, k, rhs, wv, evv, rows, w };
}
function subTerm(c, val) { // coefficient c times the number val, as a bracketed term
  const ab = c.abs();
  return { sign: c.sign, body: ab.eq(F(1)) ? par(val) : `${ab.tex()}(${val.tex()})` };
}
function joinTerms(ts) {
  const live = ts.filter((t) => t.sign !== 0);
  return live.map((t, i) => (i === 0 ? `${t.sign < 0 ? '-' : ''}${t.body}` : ` ${t.sign < 0 ? '-' : '+'} ${t.body}`)).join('');
}

// ---------------------------------------------------------------- substitution
/**
 * Isolate variable `w` from equation `iso` (1 or 2) and substitute into the other equation. Rows as in elimSteps.
 */
export function substSteps(S, iso, w) {
  const { vx, vy } = S;
  const [pa, pb, pc] = iso === 1 ? [S.a1, S.b1, S.c1] : [S.a2, S.b2, S.c2];
  const [qa, qb, qc] = iso === 1 ? [S.a2, S.b2, S.c2] : [S.a1, S.b1, S.c1];
  const o = w === vx ? vy : vx;
  const p = F(w === vx ? pa : pb), q = F(w === vx ? pb : pa); // in the isolating equation: coefficient of w and of o
  if (p.isZero) throw new Error('cannot isolate a variable with coefficient 0');
  const const0 = F(pc).div(p), slope = q.neg().div(p);
  const expr = polyTex([[const0, ''], [slope, o]]);
  const rows = [];
  rows.push([`Make $${w}$ the subject of equation (${iso})`, `${w} = ${expr}`]);
  const pj = F(w === vx ? qa : qb), qj = F(w === vx ? qb : qa); // in the other equation
  const sub = { sign: pj.sign, body: pj.abs().eq(F(1)) ? `(${expr})` : `${pj.abs().tex()}(${expr})` };
  const other = { sign: qj.sign, body: qj.abs().eq(F(1)) ? o : `${qj.abs().tex()}${o}` };
  const subTex = joinTerms(w === vx ? [sub, other] : [other, sub]);
  rows.push([`Replace $${w}$ in equation (${3 - iso})`, `${subTex} = ${F(qc).tex()}`]);
  const K = qj.add(pj.mul(slope)), C = F(qc).sub(pj.mul(const0));
  if (K.isZero) throw new Error('substitution left no unknown');
  rows.push(['Expand and collect like terms', `${polyTex([[K, o]])} = ${C.tex()}`]);
  const ov = C.div(K);
  if (!ov.eq(o === vx ? S.x : S.y)) throw new Error('substitution result is not the exact solution');
  rows.push([`Solve for $${o}$`, K.eq(F(1)) ? `${o} = ${ov.tex()}` : `${o} = \\dfrac{${C.tex()}}{${K.tex()}} = ${ov.tex()}`]);
  const wv = const0.add(slope.mul(ov));
  if (!wv.eq(w === vx ? S.x : S.y)) throw new Error('substitution back-step is not the exact solution');
  rows.push([`Put $${o} = ${ov.tex()}$ into $${w} = ${expr}$`, `${w} = ${substInto(const0, slope, ov)} = ${wv.tex()}`]);
  return { K, C, ov, wv, rows, expr, o };
}
function substInto(const0, slope, ov) {
  const t = { sign: slope.sign, body: slope.abs().eq(F(1)) ? par(ov) : `${slope.abs().tex()}(${ov.tex()})` };
  const c0 = const0.isZero ? '' : const0.tex();
  if (!c0) return `${t.sign < 0 ? '-' : ''}${t.body}`;
  return `${c0} ${t.sign < 0 ? '-' : '+'} ${t.body}`;
}

// ---------------------------------------------------------------- cross-multiplication
/**
 * The ICSE arrow scheme for a1 x + b1 y + c1 = 0, a2 x + b2 y + c2 = 0 (so c = -right-hand side):
 *   x / (b1 c2 - b2 c1) = y / (c1 a2 - c2 a1) = 1 / (a1 b2 - a2 b1).
 */
export function crossSteps(S) {
  const { vx, vy } = S;
  const a1 = S.a1, b1 = S.b1, c1 = -S.c1, a2 = S.a2, b2 = S.b2, c2 = -S.c2;
  const Dx = b1 * c2 - b2 * c1, Dy = c1 * a2 - c2 * a1, D = a1 * b2 - a2 * b1;
  if (D !== S.det) throw new Error('scheme determinant differs from a1 b2 - a2 b1');
  const xv = new Fr(Dx, D), yv = new Fr(Dy, D);
  if (!xv.eq(S.x) || !yv.eq(S.y)) throw new Error('cross-multiplication is not the exact solution');
  const prod = (p, q) => `${par(F(p))} \\times ${par(F(q))}`;
  const dif = (p, q, r2, s) => `${prod(p, q)} - ${prod(r2, s)} = ${p * q} - ${par(F(r2 * s))} = ${p * q - r2 * s}`;
  const rows = [
    ['Standard form $ax + by + c = 0$ for (1)', stdTex(a1, b1, c1, vx, vy)],
    ['Standard form for (2)', stdTex(a2, b2, c2, vx, vy)],
    [`Denominator of $${vx}$: $b_1c_2 - b_2c_1$`, dif(b1, c2, b2, c1)],
    [`Denominator of $${vy}$: $c_1a_2 - c_2a_1$`, dif(c1, a2, c2, a1)],
    ['Denominator of $1$: $a_1b_2 - a_2b_1$', dif(a1, b2, a2, b1)],
    ['The scheme', `\\dfrac{${vx}}{${Dx}} = \\dfrac{${vy}}{${Dy}} = \\dfrac{1}{${D}}`],
    [`Equate $${vx}$ and $${vy}$ to $\\dfrac{1}{${D}}$`, `${vx} = \\dfrac{${Dx}}{${D}} = ${xv.tex()}, \\quad ${vy} = \\dfrac{${Dy}}{${D}} = ${yv.tex()}`],
  ];
  return { a1, b1, c1, a2, b2, c2, Dx, Dy, D, xv, yv, rows };
}

// ---------------------------------------------------------------- reciprocal forms
/** a1/x + b1/y = c1, a2/x + b2/y = c2: solved in u = 1/x, v = 1/y; x and y are the reciprocals. */
export function recipSys(a1, b1, c1, a2, b2, c2) {
  const S = new Sys(a1, b1, c1, a2, b2, c2, 'u', 'v');
  if (S.x.isZero || S.y.isZero) throw new Error('u or v is zero, so x or y does not exist');
  const x = F(1).div(S.x), y = F(1).div(S.y);
  const recipTex = (a, b, c) => `${a < 0 ? '-' : ''}\\dfrac{${Math.abs(a)}}{x} ${b < 0 ? '-' : '+'} \\dfrac{${Math.abs(b)}}{y} = ${F(c).tex()}`;
  return { S, x, y, tex1: recipTex(a1, b1, c1), tex2: recipTex(a2, b2, c2), env: { x, y, u: S.x, v: S.y } };
}

/** Generated steps as Markdown: "label: $working$" paragraphs (a step with no working is a plain sentence). */
export const stepsMd = (steps) => steps.map(([l, t]) => (t ? `${l}: $${t}$` : l)).join('\n\n');

// ---------------------------------------------------------------- narration helpers
const ONES = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
/** Integer in English words (narration is read aloud, so numbers are spelled out). */
export function words(n) {
  const v = n instanceof Fr ? (n.isInt ? n.n : NaN) : n;
  if (!Number.isInteger(v)) throw new Error(`words() needs an integer, got ${n}`);
  if (v < 0) return `minus ${words(-v)}`;
  if (v < 20) return ONES[v];
  if (v < 100) return TENS[Math.floor(v / 10)] + (v % 10 ? ` ${ONES[v % 10]}` : '');
  if (v < 1000) return `${ONES[Math.floor(v / 100)]} hundred${v % 100 ? ` ${words(v % 100)}` : ''}`;
  if (v < 100000) return `${words(Math.floor(v / 1000))} thousand${v % 1000 ? ` ${words(v % 1000)}` : ''}`;
  throw new Error('number too large');
}
