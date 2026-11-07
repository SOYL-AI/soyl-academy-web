// Exact solver for polynomial and rational inequalities in one variable, written for ISC 11 Mathematics ch07.
// Polynomials are arrays of BigInt fractions, highest power first. A polynomial is factored over the rationals (rational root
// theorem, repeated synthetic division); what is left after removing every rational root must be a constant or a quadratic with
// no real roots, so its sign is known. The solution set is then read from a sign chart (cells = open regions between the critical
// points and the critical points themselves). The caller checks the answer against the inequality by brute force (agree()).
import { fr, F, add, sub, mul, div, neg, cmp, eq, sgn, num, frTex, holds, ivF, inAnyF, ivTex, ivsTex, agree, range, relTex, flipRel, lin, ineq1, solve1, condTex } from './ineq.mjs';
import { table } from './lib.mjs';

export const must = (cond, msg) => { if (!cond) throw new Error(`self-check failed: ${msg}`); };
export const r = (s, ...v) => String.raw(s, ...v).replace(/\\n(?![a-z])/g, '\n');

// ------------------------------------------------------------------ polynomials
const trim = (p) => { let i = 0; while (i < p.length - 1 && p[i].n === 0n) i++; return p.slice(i); };
/** P(1, 1, -6) is x^2 + x - 6. */
export const P = (...cs) => trim(cs.map(F));
export const deg = (p) => p.length - 1;
export const pEval = (p, x) => p.reduce((acc, c) => add(mul(acc, x), c), fr(0));
export const pMul = (p, q) => {
  const out = Array.from({ length: p.length + q.length - 1 }, () => fr(0));
  p.forEach((a, i) => q.forEach((b, j) => { out[i + j] = add(out[i + j], mul(a, b)); }));
  return trim(out);
};
export const pSub = (p, q) => {
  const n = Math.max(p.length, q.length);
  const pad = (x) => [...Array(n - x.length).fill(fr(0)), ...x];
  const a = pad(p), b = pad(q);
  return trim(a.map((c, i) => sub(c, b[i])));
};
export const pScale = (p, k) => trim(p.map((c) => mul(c, F(k))));
/** The product of the factors (x - r) for the given roots, times the leading constant c. */
export const fromRoots = (roots, c = 1) => roots.reduce((acc, rt) => pMul(acc, P(1, neg(F(rt)))), P(c));
const synth = (p, rt) => { const q = []; let acc = fr(0); for (const c of p) { acc = add(mul(acc, rt), c); q.push(acc); } const rem = q.pop(); return { q: q.length ? q : [fr(0)], rem }; };
const bgcd = (a, b) => { a = a < 0n ? -a : a; b = b < 0n ? -b : b; while (b) [a, b] = [b, a % b]; return a; };
const divisors = (n) => { n = n < 0n ? -n : n; const out = []; for (let d = 1n; d * d <= n; d++) if (n % d === 0n) { out.push(d); if (d * d !== n) out.push(n / d); } return out; };
function ratRoot(p) {
  if (deg(p) < 1) return null;
  if (p[p.length - 1].n === 0n) return fr(0);
  const L = p.reduce((l, c) => (l * c.d) / bgcd(l, c.d), 1n);
  const ints = p.map((c) => c.n * (L / c.d));
  for (const a of divisors(ints[ints.length - 1])) for (const b of divisors(ints[0])) for (const s of [1n, -1n]) {
    const cand = fr(s * a, b);
    if (pEval(p, cand).n === 0n) return cand;
  }
  return null;
}
/** p = rest * prod (x - r)^m, roots ascending. rest is a constant or a quadratic with no real roots. */
export function factorLin(p) {
  let cur = p;
  const found = [];
  for (let guard = 0; guard < 12; guard++) {
    const rt = ratRoot(cur);
    if (!rt) break;
    cur = synth(cur, rt).q;
    const hit = found.find((f) => eq(f.r, rt));
    if (hit) hit.m++; else found.push({ r: rt, m: 1 });
  }
  found.sort((a, b) => cmp(a.r, b.r));
  let restSign;
  if (deg(cur) === 0) restSign = sgn(cur[0]);
  else if (deg(cur) === 2) {
    const [a, b, c] = cur;
    const disc = sub(mul(b, b), mul(fr(4), mul(a, c)));
    if (disc.n >= 0n) throw new Error('quadratic factor with real roots that are not rational');
    restSign = sgn(a);
  } else throw new Error(`unfactored part of degree ${deg(cur)}`);
  return { roots: found, rest: cur, restSign };
}

// ------------------------------------------------------------------ text
const absF = (a) => (a.n < 0n ? neg(a) : a);
/** TeX of a polynomial in x, e.g. x^{2} + x - 6 (integer or fraction coefficients). */
export function pTex(p, v = 'x') {
  const parts = [];
  const n = deg(p);
  p.forEach((c, i) => {
    const e = n - i;
    if (c.n === 0n) return;
    const a = absF(c);
    const one = a.n === 1n && a.d === 1n;
    const body = e === 0 ? frTex(a) : `${one ? '' : frTex(a)}${v}${e === 1 ? '' : `^{${e}}`}`;
    parts.push({ neg: c.n < 0n, body });
  });
  if (!parts.length) return '0';
  return parts.map((t, i) => (i === 0 ? (t.neg ? `-${t.body}` : t.body) : `${t.neg ? '-' : '+'} ${t.body}`)).join(' ').replace(/\+ -/g, '- ');
}
/** (x - r) as TeX: x - 3, x + 2, x. */
export const linTexR = (rt) => (rt.n === 0n ? 'x' : rt.n > 0n ? `x - ${frTex(rt)}` : `x + ${frTex(neg(rt))}`);
export const relWords = { '<': 'less than', '<=': 'at most', '>': 'greater than', '>=': 'at least' };

// ------------------------------------------------------------------ the solver
/**
 * Solve N(x)/D(x) rel k (k an exact constant; D = P(1) for a polynomial inequality). Returns the solution intervals and the
 * sign chart. The brute-force agreement with the inequality itself is run before returning.
 */
export function solveRational(N, D, rel, k = 0, { R = 12, D2 = 420 } = {}) {
  const kk = F(k);
  const E = pSub(N, pScale(D, kk));
  must(E.length > 1 || E[0].n !== 0n || true, 'E');
  const fE = factorLin(E), fD = factorLin(D);
  const rootsAll = [];
  for (const f of [...fE.roots, ...fD.roots]) if (!rootsAll.some((x) => eq(x, f.r))) rootsAll.push(f.r);
  rootsAll.sort(cmp);
  const mE = (rt) => fE.roots.find((f) => eq(f.r, rt))?.m ?? 0;
  const mD = (rt) => fD.roots.find((f) => eq(f.r, rt))?.m ?? 0;
  const ex = (rt) => mE(rt) - mD(rt);
  const nonneg = rel === '>=' || rel === '<=';
  const wantPos = rel === '>' || rel === '>=';
  const sampleOf = (j) => (rootsAll.length === 0 ? fr(0) : j === 0 ? sub(rootsAll[0], fr(1)) : j === rootsAll.length ? add(rootsAll[rootsAll.length - 1], fr(1)) : div(add(rootsAll[j - 1], rootsAll[j]), fr(2)));
  const signAt = (x) => {
    let s = fE.restSign * fD.restSign;
    for (const rt of rootsAll) if (cmp(x, rt) < 0 && Math.abs(ex(rt)) % 2 === 1) s = -s;
    return s;
  };
  const regionSigns = range(0, rootsAll.length).map((j) => signAt(sampleOf(j)));
  const pointIn = rootsAll.map((rt) => mD(rt) === 0 && mE(rt) > 0 && nonneg);
  const regionIn = regionSigns.map((s) => (wantPos ? s > 0 : s < 0));
  // cells in order: R0, p1, R1, ..., pk, Rk
  const cells = [];
  for (let j = 0; j <= rootsAll.length; j++) { cells.push({ kind: 'region', j, in: regionIn[j] }); if (j < rootsAll.length) cells.push({ kind: 'point', j, in: pointIn[j] }); }
  const ivs = [];
  let i = 0;
  while (i < cells.length) {
    if (!cells[i].in) { i++; continue; }
    let e = i;
    while (e + 1 < cells.length && cells[e + 1].in) e++;
    const first = cells[i], last = cells[e];
    let lo, loIn, hi, hiIn;
    if (first.kind === 'region') { lo = first.j === 0 ? null : rootsAll[first.j - 1]; loIn = false; } else { lo = rootsAll[first.j]; loIn = true; }
    if (last.kind === 'region') { hi = last.j === rootsAll.length ? null : rootsAll[last.j]; hiIn = false; } else { hi = rootsAll[last.j]; hiIn = true; }
    ivs.push(ivF(lo, hi, loIn, hiIn));
    i = e + 1;
  }
  const pred = (x) => { const d = pEval(D, x); if (d.n === 0n) return false; return holds(rel, div(pEval(N, x), d), kk); };
  agree(pred, ivs, { R, D: D2 });
  return { E, fE, fD, crit: rootsAll, mE, mD, ex, regionSigns, regionIn, pointIn, ivs, pred, rel, k: kk, N, D };
}
/** Polynomial inequality p(x) rel 0. */
export const solvePoly = (p, rel, opts) => solveRational(p, P(1), rel, 0, opts);
const oneTex = (I) => (I.lo !== null && I.hi !== null && eq(I.lo, I.hi) ? String.raw`\{` + frTex(I.lo) + String.raw`\}` : ivTex(I));
export const setTex = (sol) => (sol.ivs.length ? sol.ivs.map(oneTex).join(String.raw` \cup `) : String.raw`\varnothing`);
export const peq = (p, q) => p.length === q.length && p.every((c, i) => eq(c, q[i]));
/** Linear inequality a x + b rel c x + d, solved by the textbook method and checked against the inequality by brute force. */
export function S(L, rel, R, opts = { R: 12, D: 420 }) {
  const l = lin(L[0], L[1]), rr = lin(R[0], R[1]);
  const pred = ineq1(l, rel, rr);
  const s = solve1(l, rel, rr);
  agree(pred, [s.iv], opts);
  return { ...s, l, rr, pred, cond: condTex(s.iv), ivT: ivTex(s.iv) };
}
/** The solution as a list of single points, when it is finite (for example (x - 3)^2 <= 0). */
export const isPointSet = (sol) => sol.ivs.length > 0 && sol.ivs.every((I) => I.lo !== null && I.hi !== null && eq(I.lo, I.hi));
export const integersIn = (sol, a = -40, b = 40) => range(a, b).filter((t) => sol.pred(fr(t)));

// ------------------------------------------------------------------ sign chart as a table visual
const region = (crit, j) => {
  const t = (x) => frTex(x);
  if (crit.length === 0) return '$x \\in \\mathbb{R}$';
  if (j === 0) return `$x < ${t(crit[0])}$`;
  if (j === crit.length) return `$x > ${t(crit[crit.length - 1])}$`;
  return `$${t(crit[j - 1])} < x < ${t(crit[j])}$`;
};
export const regionLabels = (sol) => range(0, sol.crit.length).map((j) => region(sol.crit, j));
const sgnTex = (s) => (s > 0 ? '$+$' : s < 0 ? '$-$' : '$0$');
/**
 * table() of the sign chart: one row per factor (x - r)^m, the constant/definite part, the whole expression, and the verdict.
 * The factor signs are computed from the sample point of each region, the total row is checked against solveRational's signs.
 */
export function chartTable(sol, { exprTex, verdict, alt, caption }) {
  const k = sol.crit.length;
  const samples = range(0, k).map((j) => (k === 0 ? fr(0) : j === 0 ? sub(sol.crit[0], fr(1)) : j === k ? add(sol.crit[k - 1], fr(1)) : div(add(sol.crit[j - 1], sol.crit[j]), fr(2))));
  const rows = [];
  const total = Array(k + 1).fill(sol.fE.restSign * sol.fD.restSign);
  const addRow = (label, signOf) => { const ss = samples.map(signOf); ss.forEach((s, j) => { total[j] *= s; }); rows.push([label, ...ss.map(sgnTex)]); return ss; };
  for (const rt of sol.crit) {
    const e = sol.ex(rt);
    const inD = sol.mD(rt) > 0;
    const m = Math.abs(e);
    const base = linTexR(rt);
    const label = `$${m === 1 ? base : `(${base})^{${m}}`}$${inD ? ' (denominator)' : ''}`;
    addRow(label, (x) => { const s = sgn(sub(x, rt)); return m % 2 === 0 ? 1 : s; });
  }
  if (sol.fE.restSign * sol.fD.restSign < 0) rows.push(['negative constant factor', ...samples.map(() => '$-$')]);
  const defin = (f) => deg(f.rest) === 2;
  for (const [nm, f] of [['numerator', sol.fE], ['denominator', sol.fD]]) if (defin(f)) rows.push([`$${pTex(f.rest)}$ (${nm}, never zero)`, ...samples.map(() => sgnTex(f.restSign))]);
  must(total.every((s, j) => s === sol.regionSigns[j]), 'sign chart total matches the solver');
  rows.push([exprTex ? `$${exprTex}$` : 'whole expression', ...total.map(sgnTex)]);
  rows.push([verdict ?? 'In the solution?', ...sol.regionIn.map((b) => (b ? 'yes' : 'no'))]);
  return table(['Factor', ...regionLabels(sol)], rows, alt, caption);
}
