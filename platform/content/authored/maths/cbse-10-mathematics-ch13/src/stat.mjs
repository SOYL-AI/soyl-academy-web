// Grouped-data helpers for ch13 Statistics. Stems' frequency tables and worked-solution columns are
// generated from the same data arrays the re-solve uses, so a table can never disagree with its key.
// Mean is computed independently by the direct, assumed-mean and step-deviation methods (they must agree).
import { table, plot } from '../../cbse-10-mathematics-ch10/src/lib.mjs';

export const fx = (v) => (Number.isInteger(v) ? String(v) : String(+v.toFixed(4)));
const minus = (v) => (v < 0 ? `−${fx(-v)}` : fx(v));
const mm = (v) => (v < 0 ? `$-${fx(-v)}$` : `$${fx(v)}$`);

/** Grouped distribution with equal classes [lo + kh, lo + (k+1)h). */
export function G(lo, h, f, { inclusive = false } = {}) {
  const k = f.length;
  const cls = f.map((_, i) => [lo + i * h, lo + (i + 1) * h]);
  const x = cls.map(([a, b]) => (inclusive ? (a + b - 1) / 2 : (a + b) / 2));
  const n = f.reduce((s, v) => s + v, 0);
  const cf = f.map((_, i) => f.slice(0, i + 1).reduce((s, v) => s + v, 0));
  return { lo, h, f, k, cls, x, n, cf, inclusive };
}
export const label = (g, i) => (g.inclusive ? `${g.cls[i][0]}–${g.cls[i][1] - 1}` : `${g.cls[i][0]}–${g.cls[i][1]}`);
export const sumFx = (g) => g.f.reduce((s, v, i) => s + v * g.x[i], 0);
export const meanDirect = (g) => sumFx(g) / g.n;
export const meanAssumed = (g, a) => a + g.f.reduce((s, v, i) => s + v * (g.x[i] - a), 0) / g.n;
export const meanStep = (g, a) => a + (g.f.reduce((s, v, i) => s + v * ((g.x[i] - a) / g.h), 0) / g.n) * g.h;
export function mean(g, a = g.x[Math.floor(g.k / 2)]) {
  const m = [meanDirect(g), meanAssumed(g, a), meanStep(g, a)];
  if (Math.abs(m[0] - m[1]) > 1e-9 || Math.abs(m[0] - m[2]) > 1e-9) throw new Error(`mean methods disagree ${m}`);
  return m[0];
}
/** Index of the median class: first class whose cumulative frequency reaches n/2. */
export const medianIdx = (g) => g.cf.findIndex((c) => c >= g.n / 2);
export function median(g) {
  const i = medianIdx(g);
  const l = g.inclusive ? g.cls[i][0] - 0.5 : g.cls[i][0];
  const before = i ? g.cf[i - 1] : 0;
  return l + ((g.n / 2 - before) / g.f[i]) * g.h;
}
/** Median by walking the cumulative frequency linearly through the median class (independent check). */
export function medianWalk(g) {
  let acc = 0;
  for (let i = 0; i < g.k; i++) {
    if (acc + g.f[i] >= g.n / 2) {
      const start = g.inclusive ? g.cls[i][0] - 0.5 : g.cls[i][0];
      return start + g.h * ((g.n / 2 - acc) / g.f[i]);
    }
    acc += g.f[i];
  }
  throw new Error('no median class');
}
export function modalIdx(g) {
  const mx = Math.max(...g.f);
  const idx = g.f.map((v, i) => (v === mx ? i : -1)).filter((i) => i >= 0);
  if (idx.length !== 1) throw new Error(`bimodal or tied modal classes ${idx}`);
  return idx[0];
}
export function mode(g) {
  const i = modalIdx(g);
  const f1 = g.f[i], f0 = i ? g.f[i - 1] : 0, f2 = i < g.k - 1 ? g.f[i + 1] : 0;
  const l = g.inclusive ? g.cls[i][0] - 0.5 : g.cls[i][0];
  return l + ((f1 - f0) / (2 * f1 - f0 - f2)) * g.h;
}

/** Horizontal markdown table for a stem: one row of classes, one row of frequencies. */
export function mdRow(g, clsHead, fHead, fOverride) {
  const fs = fOverride ?? g.f.map(String);
  return `| ${clsHead} | ${g.cls.map((_, i) => label(g, i)).join(' | ')} |\n|---|${g.cls.map(() => '---').join('|')}|\n| ${fHead} | ${fs.join(' | ')} |`;
}
/** Vertical working table (markdown) for a solution: class, f, x, and the method's columns. */
export function mdWork(g, method, a = 0) {
  const rows = g.f.map((v, i) => {
    const x = g.x[i];
    if (method === 'direct') return [label(g, i), v, fx(x), fx(v * x)];
    if (method === 'assumed') return [label(g, i), v, fx(x), minus(x - a), minus(v * (x - a))];
    if (method === 'step') return [label(g, i), v, fx(x), minus((x - a) / g.h), minus((v * (x - a)) / g.h)];
    return [label(g, i), v, g.cf[i]];
  });
  const head = { direct: ['Class', '$f_i$', '$x_i$', '$f_ix_i$'], assumed: ['Class', '$f_i$', '$x_i$', '$d_i = x_i - ' + fx(a) + '$', '$f_id_i$'], step: ['Class', '$f_i$', '$x_i$', '$u_i = \\dfrac{x_i - ' + fx(a) + '}{' + fx(g.h) + '}$', '$f_iu_i$'], cf: ['Class', '$f_i$', 'cf'] }[method];
  const tot = method === 'direct' ? ['Total', g.n, '', fx(sumFx(g))] : method === 'assumed' ? ['Total', g.n, '', '', minus(g.f.reduce((s, v, i) => s + v * (g.x[i] - a), 0))] : method === 'step' ? ['Total', g.n, '', '', minus(g.f.reduce((s, v, i) => s + (v * (g.x[i] - a)) / g.h, 0))] : null;
  const all = tot ? [...rows, tot] : rows;
  return `| ${head.join(' | ')} |\n|${head.map(() => '---').join('|')}|\n${all.map((r) => `| ${r.join(' | ')} |`).join('\n')}`;
}
export const sumFd = (g, a) => g.f.reduce((s, v, i) => s + v * (g.x[i] - a), 0);
export const sumFu = (g, a) => g.f.reduce((s, v, i) => s + (v * (g.x[i] - a)) / g.h, 0);

/** Table visual of the working columns (decks and notes). */
export function workTable(g, method, a, alt, caption) {
  const md = mdWork(g, method, a).split('\n');
  const cells = (line) => line.split('|').slice(1, -1).map((c) => c.trim());
  const headers = cells(md[0]);
  const rows = md.slice(2).map(cells).map((r) => r.map((c, j) => (j === 0 || c === '' || c === 'Total' ? c : `$${c.replace(/−/g, '-')}$`)));
  return table(headers, rows, alt, caption);
}
/** Histogram (bar series) of a distribution; the modal class can be named in the caption. */
export function hist(g, xl, yl, alt, caption) {
  const ymax = Math.max(...g.f);
  return plot({ x: [g.cls[0][0] - (g.inclusive ? 0.5 : 0), g.cls[g.k - 1][1] - (g.inclusive ? 0.5 : 0)], y: [0, Math.ceil((ymax * 1.15) / 2) * 2], xl, yl, series: [{ label: 'frequency', points: g.x.map((x, i) => [g.inclusive ? x : x, g.f[i]]), kind: 'bar' }] }, alt, caption);
}
export { mm };
