// Exact graph arithmetic for ICSE 10 Mathematics ch23 Histograms and Ogives.
// Everything is a BigInt rational (Fr from prop.mjs). A grouped distribution is a stat.mjs G object with CONTINUOUS
// classes (discontinuous classes are first converted with cont()). The less-than ogive is the polyline through
// (lower boundary of the first class, 0) and (upper boundary, cumulative frequency) of every class; every reading
// from it is an exact linear interpolation, computed two ways: by the interpolation formula (ogiveX) and by
// evaluating the drawn polyline (ogiveY / lineAt) -- the build asserts that they agree.
import { fr } from './prop.mjs';
import { G, T, lab, sum } from './stat.mjs';
import { plot, r } from './lib.mjs';

export { G, T, lab, sum, fr };
const half = fr('0.5');
const nm = (x) => Number(fr(x).n) / Number(fr(x).d);
export const num = nm;

/** Convert a discontinuous (inclusive) table to continuous classes by subtracting 0.5 / adding 0.5; continuous tables are returned as they are. */
export const cont = (g) => (g.inc ? G(g.lo.sub(half), g.h, g.f) : g);
/** Class boundaries b_0 < ... < b_k (Fr). */
export const bnd = (g) => [g.lo, ...g.f.map((_, i) => g.lo.add(g.h.mul(i + 1)))];
/** Histogram outline as a closed polyline of numbers. */
export function outline(g) {
  const b = bnd(g), pts = [[nm(b[0]), 0]];
  g.f.forEach((v, i) => { pts.push([nm(b[i]), v], [nm(b[i + 1]), v]); });
  pts.push([nm(b[g.k]), 0]);
  return pts;
}
/** Ogive polyline [[boundary, cumulative frequency]] starting at (b_0, 0), as Fr pairs. */
export const ogivePts = (g) => { const b = bnd(g); return [[b[0], fr(0)], ...g.f.map((_, i) => [b[i + 1], fr(g.cf[i])])]; };

/** Value x of the ogive at cumulative frequency y: interpolation formula in the class that contains y. */
export function ogiveX(g, y) {
  y = fr(y);
  if (y.cmp(0) < 0 || y.cmp(g.n) > 0) throw new Error(`y = ${T(y)} is outside the ogive`);
  if (y.eq(0)) return g.lo;
  const i = g.cf.findIndex((c) => fr(c).cmp(y) >= 0), prev = i ? g.cf[i - 1] : 0, b = bnd(g);
  return b[i].add(g.h.mul(y.sub(prev)).div(g.f[i]));
}
/** Straight line through two points evaluated at x (exact). */
export const lineAt = ([x1, y1], [x2, y2], x) => fr(y1).add(fr(y2).sub(y1).mul(fr(x).sub(x1)).div(fr(x2).sub(x1)));
/** Cumulative frequency y of the ogive at x, by evaluating the drawn polyline. */
export function ogiveY(g, x) {
  x = fr(x);
  const P = ogivePts(g);
  if (x.cmp(P[0][0]) < 0) return fr(0);
  if (x.cmp(P[P.length - 1][0]) >= 0) return fr(g.n);
  for (let i = 0; i + 1 < P.length; i++) if (x.cmp(P[i][0]) >= 0 && x.cmp(P[i + 1][0]) <= 0) return lineAt(P[i], P[i + 1], x);
  throw new Error('x not on the ogive');
}
/** A value x read at cumulative frequency y must map back to y on the drawn polyline. */
export const roundTrip = (g, y) => ogiveY(g, ogiveX(g, y)).eq(y);
export const quartile = (g, k) => ogiveX(g, fr(g.n).mul(k).div(4));
export const median = (g) => ogiveX(g, fr(g.n).div(2));
export const iqr = (g) => quartile(g, 3).sub(quartile(g, 1));
/** Number of observations strictly above / at most x (continuous data: the same up to measure zero). */
export const below = (g, x) => ogiveY(g, x);
export const above = (g, x) => fr(g.n).sub(ogiveY(g, x));

/** Estimate of the mode from the histogram: intersection of (top-right corner of the class before the modal bar to top-right
 *  corner of the modal bar) with (top-left corner of the modal bar to top-left corner of the class after it). */
export function modeGraph(g) {
  const mx = Math.max(...g.f), idx = g.f.map((v, i) => (v === mx ? i : -1)).filter((i) => i >= 0);
  if (idx.length !== 1) throw new Error('modal class not unique');
  const j = idx[0];
  if (j === 0 || j === g.k - 1) throw new Error('modal bar must have a neighbour on each side');
  const b = bnd(g), f0 = g.f[j - 1], f1 = g.f[j], f2 = g.f[j + 1], L = b[j], U = b[j + 1], h = g.h;
  const A = [[L, f0], [U, f1]], B = [[L, f1], [U, f2]];
  // y = f0 + (f1 - f0) t and y = f1 + (f2 - f1) t, t = (x - L) / h
  const den = fr(2 * f1 - f0 - f2);
  if (den.cmp(0) === 0) throw new Error('parallel lines');
  const t = fr(f1 - f0).div(den);
  const x = L.add(h.mul(t)), y = lineAt(A[0], A[1], x);
  if (!lineAt(B[0], B[1], x).eq(y)) throw new Error('mode construction: point not on the second line');
  // independent check through the shortcut l + h (f1 - f0) / (2 f1 - f0 - f2)
  if (!x.eq(L.add(h.mul(f1 - f0).div(2 * f1 - f0 - f2)))) throw new Error('mode construction disagrees');
  if (!(x.cmp(L) > 0 && x.cmp(U) < 0)) throw new Error('mode estimate outside the modal class');
  return { j, x, y, A, B, L, U, f0, f1, f2 };
}

// ---------------------------------------------------------------- plots
const rng = (g, pad) => [Math.max(0, nm(g.lo) - pad), nm(bnd(g)[g.k]) + pad];
const ymax = (v, step) => Math.ceil((v + 0.0001) / step) * step;
const lbl = (x, y) => `(${T(x)}, ${T(y)})`;

/** Histogram: closed outline series; optionally the mode construction (two lines and the marked intersection). */
export function histPlot(g, { xl, yl, withMode = false, ystep = 5, alt, caption, name = 'histogram outline', xpad = null }) {
  const series = [{ label: name, points: outline(g), kind: 'line' }];
  const pts = [];
  if (withMode) {
    const m = modeGraph(g);
    series.push({ label: 'join to the next bar', points: m.B.map(([a, c]) => [nm(a), nm(c)]), kind: 'line' });
    series.push({ label: 'join to the previous bar', points: m.A.map(([a, c]) => [nm(a), nm(c)]), kind: 'line' });
    pts.push([nm(m.x), nm(m.y), lbl(m.x, m.y)]);
  }
  const [x0, x1] = rng(g, xpad ?? nm(g.h));
  return plot({ x: [x0, x1], y: [0, ymax(Math.max(...g.f), ystep)], xl, yl, series, pts }, alt, caption);
}

/** Ogive with exact readings: reads = [{ y }] or [{ x }] (the other coordinate is computed on the ogive); dashed guide lines. */
export function ogivePlot(g, { xl, yl, reads = [], guides = true, ystep = null, alt, caption, name = 'less-than ogive', xpad = null, yTop = null }) {
  const series = [{ label: name, points: ogivePts(g).map(([a, c]) => [nm(a), nm(c)]), kind: 'line' }];
  const pts = [], hl = [], vl = [];
  for (const r of reads) {
    const x = r.x !== undefined ? fr(r.x) : ogiveX(g, r.y), y = r.y !== undefined ? fr(r.y) : ogiveY(g, x);
    if (!ogiveY(g, x).eq(y)) throw new Error(`reading ${lbl(x, y)} is not on the ogive`);
    pts.push([nm(x), nm(y), lbl(x, y)]);
    if (guides) { hl.push({ y: nm(y), dashed: true }); vl.push({ x: nm(x), dashed: true }); }
  }
  const step = ystep ?? (g.n <= 60 ? 10 : g.n <= 120 ? 20 : 50);
  const [x0, x1] = rng(g, xpad ?? nm(g.h) / 2);
  const v = plot({ x: [x0, x1], y: [0, yTop ?? ymax(g.n, step)], xl, yl, series, pts }, alt, caption);
  if (hl.length) v.spec.hlines = hl;
  if (vl.length) v.spec.vlines = vl;
  return v;
}

/** Table of upper class boundaries and cumulative frequencies, as markdown for stems / model answers. */
export function mdCf(g, clsHead = 'Class') {
  const head = [clsHead, 'Frequency', 'Cumulative frequency (less than)'];
  const rows = g.f.map((v, i) => [lab(g, i), `$${v}$`, `$${g.cf[i]}$`]);
  return `| ${head.join(' | ')} |\n|---|---|---|\n${rows.map((r) => `| ${r.join(' | ')} |`).join('\n')}`;
}
/** Markdown table: "less than" upper boundary and cumulative frequency, two rows across (for stems that give cf directly). */
export function mdLess(g, head1 = 'Less than', head2 = 'Cumulative frequency') {
  const b = bnd(g).slice(1);
  return `| ${head1} | ${b.map((x) => T(x)).join(' | ')} |\n|---|${b.map(() => '---').join('|')}|\n| ${head2} | ${g.cf.join(' | ')} |`;
}

const pt = (p) => `(${T(p[0])}, ${T(p[1])})`;
/** Worked reading of x at height y: the segment of the ogive containing y and the proportional-parts step, as inline maths text. */
export function readX(g, y) {
  y = fr(y);
  const x = ogiveX(g, y), P = ogivePts(g);
  const i = y.eq(0) ? 0 : g.cf.findIndex((c) => fr(c).cmp(y) >= 0);
  const a = P[i], b = P[i + 1], rise = b[1].sub(a[1]), run = b[0].sub(a[0]), need = y.sub(a[1]), move = need.mul(run).div(rise);
  if (!a[0].add(move).eq(x) || !roundTrip(g, y)) throw new Error('readX disagrees with ogiveX');
  const text = r`The point at height $${T(y)}$ lies on the segment from $${pt(a)}$ to $${pt(b)}$, which rises $${T(rise)}$ over a run of $${T(run)}$. A rise of $${T(need)}$ needs a run of $\dfrac{${T(need)}}{${T(rise)}} \times ${T(run)} = ${T(move)}$, so $x = ${T(a[0])} + ${T(move)} = ${T(x)}$.`;
  return { x, text, seg: [a, b] };
}
/** Worked reading of the height y at x. */
export function readY(g, x) {
  x = fr(x);
  const y = ogiveY(g, x), P = ogivePts(g);
  const i = P.findIndex((p, k) => k + 1 < P.length && x.cmp(p[0]) >= 0 && x.cmp(P[k + 1][0]) <= 0);
  const a = P[i], b = P[i + 1], rise = b[1].sub(a[1]), run = b[0].sub(a[0]), moved = x.sub(a[0]), gain = rise.mul(moved).div(run);
  if (!a[1].add(gain).eq(y)) throw new Error('readY disagrees with ogiveY');
  const text = r`At $x = ${T(x)}$ the ogive lies on the segment from $${pt(a)}$ to $${pt(b)}$, which rises $${T(rise)}$ over a run of $${T(run)}$. The run from $x = ${T(a[0])}$ to $x = ${T(x)}$ is $${T(moved)}$, so the rise is $\dfrac{${T(rise)}}{${T(run)}} \times ${T(moved)} = ${T(gain)}$ and the height is $${T(a[1])} + ${T(gain)} = ${T(y)}$.`;
  return { y, text, seg: [a, b] };
}
/** Points of the ogive as markdown "(x, y)" list text for model answers. */
export const ogiveCoords = (g) => ogivePts(g).map((p) => `$${pt(p)}$`).join(', ');
/** Visual table (for slides/notes) of the cumulative frequency (boundary form). */
export function lessRows(g) {
  const b = bnd(g);
  return b.map((x, i) => [`$${T(x)}$`, `$${i ? g.cf[i - 1] : 0}$`]);
}
/** Candidate search helper (not used by the build): true if all of Q1, median, Q3 are terminating decimals. */
export const clean = (g) => [quartile(g, 1), median(g), quartile(g, 3)].every((x) => x.dec() !== null);

/** Worked graphical-mode construction as text (two lines, their meeting point). */
export function modeText(g) {
  const m = modeGraph(g), h = g.h, L = m.L, U = m.U;
  const up = fr(m.f1 - m.f0), dn = fr(m.f1 - m.f2), coef = up.add(dn).div(h), t = up.div(coef);
  if (!L.add(t).eq(m.x)) throw new Error('modeText disagrees with modeGraph');
  return r`The modal bar stands on $${T(L)}$–$${T(U)}$ with height $${m.f1}$; the bar before it has height $${m.f0}$ and the bar after it has height $${m.f2}$. Join the top right corner of the bar before, $(${T(L)}, ${m.f0})$, to the top right corner of the modal bar, $(${T(U)}, ${m.f1})$; join the top left corner of the modal bar, $(${T(L)}, ${m.f1})$, to the top left corner of the bar after it, $(${T(U)}, ${m.f2})$. With $t = x - ${T(L)}$ the first line has height $${m.f0} + ${T(up.div(h))}t$ and the second $${m.f1} - ${T(dn.div(h))}t$. They meet when $${T(up.div(h))}t + ${T(dn.div(h))}t = ${T(up)}$, that is $${coef.eq(1) ? "" : T(coef)}t = ${T(up)}$, so $t = ${T(t)}$ and $x = ${T(L)} + ${T(t)} = ${T(m.x)}$ (at height $${T(m.y)}$).`;
}
