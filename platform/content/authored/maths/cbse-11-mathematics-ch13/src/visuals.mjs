// Visuals for ch13 Statistics. Every number in a caption or alt text is taken from the verified data sets.
import { plot, table, flow, r } from './lib.mjs';
import { T, fr, Dist, asTable, mdTable, stepTable, cls } from './stat.mjs';
import { TEMP, FERRY, WASTE, SEED, SCORE, KIOSK_X, KIOSK_Y, WAIT, SLOT, SPEND, SCREEN, BAKE } from './data.mjs';

export { asTable, mdTable, stepTable };

/** Two raw data sets on a number line (dot strips) with the common mean marked by a vertical line. */
export function twoStrips(a, b, aName, bName, alt, caption) {
  if (!a.mean.eq(b.mean)) throw new Error('strips need a common mean');
  const lo = Math.min(...a.x.concat(b.x).map((x) => x.num())), hi = Math.max(...a.x.concat(b.x).map((x) => x.num()));
  const p = plot({ x: [Math.floor(lo / 10) * 10 - 5, Math.ceil(hi / 10) * 10 + 5], y: [0, 3], xl: 'value', yl: 'data set', series: [{ label: aName, points: a.x.map((x) => [x.num(), 2]), kind: 'scatter' }, { label: bName, points: b.x.map((x) => [x.num(), 1]), kind: 'scatter' }] }, alt, caption);
  p.spec.vlines = [{ x: a.mean.num(), label: `mean ${T(a.mean)}`, dashed: true }];
  return p;
}
/** One raw data set on a number line, with its smallest and largest value marked: the range. */
export function rangeStrip(d, unit, alt, caption) {
  const xs = d.x.map((x) => x.num());
  const lo = Math.min(...xs), hi = Math.max(...xs);
  const p = plot({ x: [lo - 3, hi + 3], y: [0, 2], xl: unit, yl: '', series: [{ label: 'observations', points: xs.map((x) => [x, 1]), kind: 'scatter' }] }, alt, caption);
  p.spec.vlines = [{ x: lo, label: `least ${lo}`, dashed: true }, { x: hi, label: `greatest ${hi}`, dashed: true }];
  return p;
}
/** The curve g(a) = (sum of |x - a|) / n for a raw set; its lowest point is at the median. */
export function mdCurve(d, xr, yr, unit, alt, caption) {
  const terms = d.x.map((x) => `abs(x-${T(x)})`).join('+');
  const med = d.median, mn = d.mean;
  return plot({ x: xr, y: yr, xl: `$a$ (${unit})`, yl: 'mean deviation about $a$', fns: [{ expr: `(${terms})/${d.x.length}` }], pts: [[med.num(), d.md(med).num(), `median ${T(med)}`], [mn.num(), d.md(mn).num(), `mean ${T(mn)}`]] }, alt, caption);
}
/** The curve g(a) = (sum of (x - a)^2) / n; its lowest point is at the mean and its height there is the variance. */
export function sqCurve(d, xr, yr, alt, caption) {
  const terms = d.x.map((x) => `(x-${T(x)})^2`).join('+');
  return plot({ x: xr, y: yr, xl: '$a$', yl: 'mean of squared distances from $a$', fns: [{ expr: `(${terms})/${d.x.length}` }], pts: [[d.mean.num(), d.variance.num(), `lowest at the mean ${T(d.mean)}`]] }, alt, caption);
}
/** Histogram (bar series at the class marks) of a grouped distribution, optional mean marker. */
export function hist(d, xl, yl, alt, caption, { mark = null, ymax = null } = {}) {
  const lo = d.classes[0][0].num(), hi = d.classes[d.count - 1][1].num();
  const top = ymax ?? Math.ceil((Math.max(...d.f.map((f) => f.num())) * 1.2) / 2) * 2;
  const p = plot({ x: [lo, hi], y: [0, top], xl, yl, series: [{ label: 'frequency', points: d.x.map((x, i) => [x.num(), d.f[i].num()]), kind: 'bar' }] }, alt, caption);
  if (mark) p.spec.vlines = mark.map(([x, label]) => ({ x, label, dashed: true }));
  return p;
}
/** Bar chart of a discrete frequency distribution. */
export function bars(d, xl, yl, alt, caption, { mark = null } = {}) {
  const xs = d.x.map((x) => x.num());
  const step = xs.length > 1 ? xs[1] - xs[0] : 1;
  const top = Math.ceil((Math.max(...d.f.map((f) => f.num())) * 1.2) / 2) * 2;
  const p = plot({ x: [xs[0] - step, xs[xs.length - 1] + step], y: [0, top], xl, yl, series: [{ label: 'frequency', points: xs.map((x, i) => [x, d.f[i].num()]), kind: 'bar' }] }, alt, caption);
  if (mark) p.spec.vlines = mark.map(([x, label]) => ({ x, label, dashed: true }));
  return p;
}
export { table, flow, plot, r };
export const D = { TEMP, FERRY, WASTE, SEED, SCORE, KIOSK_X, KIOSK_Y, WAIT, SLOT, SPEND, SCREEN, BAKE };
