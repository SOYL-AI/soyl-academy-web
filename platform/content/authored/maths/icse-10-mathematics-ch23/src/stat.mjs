// Exact statistics for ICSE 10 Mathematics ch22 Measures of Central Tendency.
// Everything is a BigInt rational (Fr from prop.mjs): raw-data mean/median/mode, frequency distributions of
// single values, and grouped distributions (continuous classes a-b, discontinuous classes a-b with a gap of 1).
// The three grouped-mean methods are computed independently and must agree exactly. Median and modal CLASS are
// identified from cumulative frequency and maximum frequency (the median/mode formulas are not in the syllabus).
import { fr } from './prop.mjs';
import { table } from './lib.mjs';

/** Terminating-decimal text of a number ("44.75"); throws for a recurring decimal so a key is never rounded. */
export const T = (x) => { const s = fr(x).dec(); if (s === null) throw new Error(`non-terminating ${fr(x)}`); return s; };
/** Inline maths for a number (uses a real minus in LaTeX). */
export const M = (x) => `$${T(x)}$`;
export const sum = (xs) => xs.reduce((s, v) => s.add(v), fr(0));

// ---------------------------------------------------------------- raw data
export const meanL = (xs) => sum(xs.map((v) => fr(v))).div(xs.length);
export const sortedL = (xs) => xs.map((v) => fr(v)).sort((p, q) => p.cmp(q));
export function medianL(xs) {
  const s = sortedL(xs), n = s.length;
  return n % 2 ? s[(n - 1) / 2] : s[n / 2 - 1].add(s[n / 2]).div(2);
}
/** All modes (values with the highest count), ascending. */
export function modesL(xs) {
  const cnt = new Map();
  for (const v of xs) cnt.set(fr(v).toString(), (cnt.get(fr(v).toString()) ?? 0) + 1);
  const mx = Math.max(...cnt.values());
  return [...cnt].filter(([, c]) => c === mx).map(([k]) => fr(k)).sort((p, q) => p.cmp(q));
}

// ---------------------------------------------------------------- frequency distribution of single values
export function D(v, f) {
  const n = f.reduce((s, x) => s + x, 0);
  const list = v.flatMap((x, i) => Array(f[i]).fill(x));
  const cf = f.map((_, i) => f.slice(0, i + 1).reduce((s, x) => s + x, 0));
  const fx = v.map((x, i) => fr(x).mul(f[i]));
  const mean = sum(fx).div(n);
  if (!mean.eq(meanL(list))) throw new Error('D mean disagrees with raw list');
  const med = medianL(list);
  const modes = modesL(list);
  return { v, f, n, list, cf, fx, sumfx: sum(fx), mean, median: med, modes };
}
export function dTable(d, xh, fh, withFx = false) {
  const hdr = [xh, '$f$', ...(withFx ? ['$fx$'] : [])];
  const rows = d.v.map((x, i) => [`$${T(x)}$`, `$${d.f[i]}$`, ...(withFx ? [`$${T(d.fx[i])}$`] : [])]);
  if (withFx) rows.push(['Total', `$${d.n}$`, `$${T(d.sumfx)}$`]);
  return [hdr, rows];
}

// ---------------------------------------------------------------- grouped data
/** Equal classes of width h starting at lo; inc = discontinuous (inclusive) classes a-(a+h-1). */
export function G(lo, h, f, { inc = false } = {}) {
  const L = fr(lo), H = fr(h);
  const cls = f.map((_, i) => [L.add(H.mul(i)), L.add(H.mul(i + 1)).sub(inc ? 1 : 0)]);
  const x = cls.map(([a, b]) => a.add(b).div(2));
  const n = f.reduce((s, v) => s + v, 0);
  const cf = f.map((_, i) => f.slice(0, i + 1).reduce((s, v) => s + v, 0));
  return { lo: L, h: H, f, k: f.length, cls, x, n, cf, inc };
}
export const lab = (g, i) => `${T(g.cls[i][0])}–${T(g.cls[i][1])}`;
export const sumFx = (g) => sum(g.f.map((v, i) => g.x[i].mul(v)));
export const meanDirect = (g) => sumFx(g).div(g.n);
export const sumFd = (g, a) => sum(g.f.map((v, i) => g.x[i].sub(a).mul(v)));
export const sumFu = (g, a) => sum(g.f.map((v, i) => g.x[i].sub(a).div(g.h).mul(v)));
export const meanAssumed = (g, a) => fr(a).add(sumFd(g, fr(a)).div(g.n));
export const meanStep = (g, a) => fr(a).add(sumFu(g, fr(a)).mul(g.h).div(g.n));
/** The mean, computed by all three methods; throws unless they agree exactly. a must be one of the class marks. */
export function mean(g, a) {
  if (!g.x.some((v) => v.eq(a))) throw new Error('assumed mean should be a class mark');
  const m = [meanDirect(g), meanAssumed(g, a), meanStep(g, a)];
  if (!m[0].eq(m[1]) || !m[0].eq(m[2])) throw new Error(`mean methods disagree ${m}`);
  return m[0];
}
/** Index of the median class: the first class whose cumulative frequency reaches n/2. */
export const medianIdx = (g) => g.cf.findIndex((c) => fr(c).cmp(fr(g.n).div(2)) >= 0);
/** The same class found by counting observations one by one up to the n/2-th (independent check). */
export function medianIdxWalk(g) {
  const target = Math.ceil(g.n / 2);
  let seen = 0;
  for (let i = 0; i < g.k; i++) { seen += g.f[i]; if (seen >= target) return i; }
  throw new Error('no median class');
}
export function modalIdx(g) {
  const mx = Math.max(...g.f);
  const idx = g.f.map((v, i) => (v === mx ? i : -1)).filter((i) => i >= 0);
  if (idx.length !== 1) throw new Error(`tied modal classes ${idx}`);
  return idx[0];
}
/** Solve for a missing frequency (class index j) given the mean exactly. Returns the exact frequency. */
export function missingFreq(g, j, meanGiven) {
  // sum_{i != j} f_i x_i + y x_j = mean (sum_{i != j} f_i + y)
  const others = g.f.map((v, i) => (i === j ? fr(0) : g.x[i].mul(v)));
  const nOther = g.f.reduce((s, v, i) => s + (i === j ? 0 : v), 0);
  const y = fr(meanGiven).mul(nOther).sub(sum(others)).div(g.x[j].sub(meanGiven));
  return y;
}
/** Same class distribution with frequency y in class j. */
export const withFreq = (g, j, y) => G(g.lo, g.h, g.f.map((v, i) => (i === j ? Number(fr(y).v) : v)), { inc: g.inc });

// ---------------------------------------------------------------- tables
const cell = (v) => `$${v}$`;
const tx = (x) => T(x);
/** Rows for the working table of a method: 'direct' | 'assumed' | 'step' | 'freq' | 'cf'. */
export function workRows(g, method, a) {
  const A = a === undefined ? undefined : fr(a);
  const body = g.f.map((v, i) => {
    const x = g.x[i];
    if (method === 'freq') return [lab(g, i), cell(v)];
    if (method === 'cf') return [lab(g, i), cell(v), cell(g.cf[i])];
    if (method === 'direct') return [lab(g, i), cell(v), cell(tx(x)), cell(tx(x.mul(v)))];
    if (method === 'assumed') return [lab(g, i), cell(v), cell(tx(x)), cell(tx(x.sub(A))), cell(tx(x.sub(A).mul(v)))];
    return [lab(g, i), cell(v), cell(tx(x)), cell(tx(x.sub(A).div(g.h))), cell(tx(x.sub(A).div(g.h).mul(v)))];
  });
  const tot = method === 'direct' ? ['Total', cell(g.n), '', cell(tx(sumFx(g)))]
    : method === 'assumed' ? ['Total', cell(g.n), '', '', cell(tx(sumFd(g, A)))]
    : method === 'step' ? ['Total', cell(g.n), '', '', cell(tx(sumFu(g, A)))]
    : method === 'freq' || method === 'cf' ? ['Total', cell(g.n), ...(method === 'cf' ? [''] : [])] : null;
  return tot ? [...body, tot] : body;
}
export function workHead(g, method, a, cls = 'Class') {
  if (method === 'freq') return [cls, '$f$'];
  if (method === 'cf') return [cls, '$f$', 'Cumulative frequency'];
  if (method === 'direct') return [cls, '$f$', 'Class mark $x$', '$fx$'];
  if (method === 'assumed') return [cls, '$f$', '$x$', `$d = x - ${tx(a)}$`, '$fd$'];
  return [cls, '$f$', '$x$', `$u = \\dfrac{x - ${tx(a)}}{${tx(g.h)}}$`, '$fu$'];
}
/** Markdown table of the working (for stems and model answers). */
export function mdWork(g, method, a, cls) {
  const head = workHead(g, method, a, cls), rows = workRows(g, method, a);
  return `| ${head.join(' | ')} |\n|${head.map(() => '---').join('|')}|\n${rows.map((r) => `| ${r.join(' | ')} |`).join('\n')}`;
}
/** Visual table of the working. */
export function workTable(g, method, a, alt, caption, cls) {
  return table(workHead(g, method, a, cls), workRows(g, method, a), alt, caption);
}
/** Two-row markdown table (classes across, frequencies below) for stems. */
export function mdRow(g, clsHead, fHead, fOverride) {
  const fs = fOverride ?? g.f.map(String);
  return `| ${clsHead} | ${g.cls.map((_, i) => lab(g, i)).join(' | ')} |\n|---|${g.cls.map(() => '---').join('|')}|\n| ${fHead} | ${fs.join(' | ')} |`;
}
/** Two-row markdown table for a frequency distribution of single values. */
export function mdRowD(d, xHead, fHead) {
  return `| ${xHead} | ${d.v.map((x) => T(x)).join(' | ')} |\n|---|${d.v.map(() => '---').join('|')}|\n| ${fHead} | ${d.f.join(' | ')} |`;
}
