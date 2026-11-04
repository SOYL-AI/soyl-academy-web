// Statistics and microeconomics helpers for CBSE 11 Economics chapters (D-025/D-026). Every number a chapter states
// (mean, median, mode, correlation, index numbers, elasticity, cost and revenue schedules) is computed with these
// functions in the chapter's questions.mjs/build.mjs and checked with assert, never typed by hand.
// The self-checks at the bottom run on import, so a broken helper fails every build that uses it.
// Import as `../../cbse-11-economics-ch01/src/stats.mjs` (ch01: `./stats.mjs`).
import assert from 'node:assert/strict';

/** Round to `d` decimal places (half away from zero), returning a number. */
export function rnd(x, d = 2) {
  const p = 10 ** d;
  return Math.sign(x) * Math.round(Math.abs(x) * p + 1e-9) / p;
}
/** Assert that a computed value equals the value stated in an item (after rounding to `d` places). */
export function check(computed, stated, d = 2, what = 'value') {
  assert.equal(rnd(computed, d), stated, `${what}: computed ${computed} but the item states ${stated}`);
  return stated;
}

export const sum = (xs) => xs.reduce((a, b) => a + b, 0);

// ---------------------------------------------------------------- central tendency
/** Arithmetic mean of individual observations. */
export const mean = (xs) => sum(xs) / xs.length;
/** Mean of a discrete series: values xs with frequencies fs. */
export const meanDiscrete = (xs, fs) => sum(xs.map((x, i) => x * fs[i])) / sum(fs);
/** Class mid-points of [[lower, upper, f], …] (exclusive classes). */
export const mids = (classes) => classes.map(([l, u]) => (l + u) / 2);
/** Mean of a continuous series by the direct method: Σfm / Σf. */
export function meanGrouped(classes) {
  const m = mids(classes);
  const f = classes.map((c) => c[2]);
  return meanDiscrete(m, f);
}
/** Assumed-mean method: A + Σfd / Σf with d = m − A. Returns { d, fd, sumF, sumFd, mean }. */
export function meanAssumed(classes, A) {
  const m = mids(classes);
  const f = classes.map((c) => c[2]);
  const d = m.map((x) => x - A);
  const fd = d.map((x, i) => x * f[i]);
  return { d, fd, sumF: sum(f), sumFd: sum(fd), mean: A + sum(fd) / sum(f) };
}
/** Step-deviation method: A + (Σfd′ / Σf) × h with d′ = (m − A) / h. */
export function meanStep(classes, A, h) {
  const m = mids(classes);
  const f = classes.map((c) => c[2]);
  const d = m.map((x) => (x - A) / h);
  const fd = d.map((x, i) => x * f[i]);
  return { d, fd, sumF: sum(f), sumFd: sum(fd), mean: A + (sum(fd) / sum(f)) * h };
}
/** Median of individual observations (sorted copy; average of the two middle values when n is even). */
export function median(xs) {
  const s = [...xs].sort((a, b) => a - b);
  const n = s.length;
  return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2;
}
/** Cumulative frequencies ("less than") of a list of frequencies. */
export function cumulative(fs) {
  let c = 0;
  return fs.map((f) => (c += f));
}
/** Median of a continuous series: L + ((N/2 − cf) / f) × h. Returns { cls, L, cf, f, h, N, median }. */
export function medianGrouped(classes) {
  const f = classes.map((c) => c[2]);
  const N = sum(f);
  const cfs = cumulative(f);
  const i = cfs.findIndex((c) => c >= N / 2);
  const [L, U] = classes[i];
  const cf = i ? cfs[i - 1] : 0;
  return { cls: i, L, cf, f: f[i], h: U - L, N, median: L + ((N / 2 - cf) / f[i]) * (U - L) };
}
/** Mode of individual observations (throws if there is no single most frequent value). */
export function mode(xs) {
  const count = new Map();
  for (const x of xs) count.set(x, (count.get(x) ?? 0) + 1);
  const max = Math.max(...count.values());
  const top = [...count].filter(([, c]) => c === max).map(([x]) => x);
  assert.equal(top.length, 1, `mode: ${top.length} values share the highest frequency ${max}`);
  return top[0];
}
/**
 * Mode of a continuous series: L + (D1 / (D1 + D2)) × h, D1 = f1 − f0, D2 = f1 − f2 (modal class = highest f).
 * Throws if two classes share the highest frequency. Returns { cls, L, f0, f1, f2, D1, D2, h, mode }.
 */
export function modeGrouped(classes) {
  const f = classes.map((c) => c[2]);
  const max = Math.max(...f);
  assert.equal(f.filter((x) => x === max).length, 1, 'modeGrouped: modal class is not unique');
  const i = f.indexOf(max);
  const [L, U] = classes[i];
  const f0 = i ? f[i - 1] : 0;
  const f2 = i < f.length - 1 ? f[i + 1] : 0;
  const D1 = max - f0;
  const D2 = max - f2;
  return { cls: i, L, f0, f1: max, f2, D1, D2, h: U - L, mode: L + (D1 / (D1 + D2)) * (U - L) };
}

// ---------------------------------------------------------------- correlation
/** Karl Pearson's coefficient of correlation, r = Σxy / √(Σx² Σy²) on deviations from the means. */
export function pearson(xs, ys) {
  assert.equal(xs.length, ys.length, 'pearson: series of different lengths');
  const mx = mean(xs);
  const my = mean(ys);
  const dx = xs.map((x) => x - mx);
  const dy = ys.map((y) => y - my);
  const sxy = sum(dx.map((a, i) => a * dy[i]));
  const sxx = sum(dx.map((a) => a * a));
  const syy = sum(dy.map((b) => b * b));
  return { mx, my, dx, dy, sxy, sxx, syy, r: sxy / Math.sqrt(sxx * syy) };
}
/** Ranks, 1 = highest value (the NCERT convention), with tied values given the average of their ranks. */
export function ranks(xs) {
  const order = xs.map((x, i) => [x, i]).sort((a, b) => b[0] - a[0]);
  const r = new Array(xs.length);
  for (let k = 0; k < order.length; ) {
    let j = k;
    while (j + 1 < order.length && order[j + 1][0] === order[k][0]) j++;
    const avg = (k + 1 + j + 1) / 2;
    for (let t = k; t <= j; t++) r[order[t][1]] = avg;
    k = j + 1;
  }
  return r;
}
/**
 * Spearman's rank correlation, rs = 1 − 6[ΣD² + Σ(m³ − m)/12] / (n³ − n), where m is the size of each group of
 * repeated ranks. Pass values (ranked here) or ranks (`{ ranked: true }`). Returns { r1, r2, D, D2, cf, n, rs }.
 */
export function spearman(a, b, { ranked = false } = {}) {
  assert.equal(a.length, b.length, 'spearman: series of different lengths');
  const r1 = ranked ? a : ranks(a);
  const r2 = ranked ? b : ranks(b);
  const n = a.length;
  const D = r1.map((x, i) => x - r2[i]);
  const D2 = sum(D.map((d) => d * d));
  const ties = (rs) => {
    const c = new Map();
    for (const x of rs) c.set(x, (c.get(x) ?? 0) + 1);
    return sum([...c.values()].filter((m) => m > 1).map((m) => (m ** 3 - m) / 12));
  };
  const cf = ties(r1) + ties(r2);
  return { r1, r2, D, D2, cf, n, rs: 1 - (6 * (D2 + cf)) / (n ** 3 - n) };
}

// ---------------------------------------------------------------- index numbers
/** Simple aggregative price index: Σp1 / Σp0 × 100. */
export const indexAggregative = (p0, p1) => (sum(p1) / sum(p0)) * 100;
/** Simple average of price relatives: Σ(p1/p0 × 100) / n. */
export const indexRelatives = (p0, p1) => mean(p1.map((p, i) => (p / p0[i]) * 100));
/** Weighted aggregative (Laspeyres, base-year quantities): Σp1q0 / Σp0q0 × 100. */
export const indexLaspeyres = (p0, p1, q0) => (sum(p1.map((p, i) => p * q0[i])) / sum(p0.map((p, i) => p * q0[i]))) * 100;
/** Weighted aggregative (Paasche, current-year quantities): Σp1q1 / Σp0q1 × 100. */
export const indexPaasche = (p0, p1, q1) => (sum(p1.map((p, i) => p * q1[i])) / sum(p0.map((p, i) => p * q1[i]))) * 100;
/** Weighted average of price relatives: Σ(R × W) / ΣW with R = p1/p0 × 100. */
export const indexWeightedRelatives = (p0, p1, w) => sum(p1.map((p, i) => (p / p0[i]) * 100 * w[i])) / sum(w);
/** Rate of inflation between two index values, in per cent. */
export const inflation = (i0, i1) => ((i1 - i0) / i0) * 100;

// ---------------------------------------------------------------- microeconomics
/** Price elasticity of demand by the percentage method, as a positive number: (%ΔQ / %ΔP) ignoring the minus sign. */
export const elasticity = (p0, q0, p1, q1) => Math.abs(((q1 - q0) / q0) / ((p1 - p0) / p0));
/** Price elasticity of supply by the percentage method (positive for an upward-sloping supply). */
export const elasticitySupply = (p0, q0, p1, q1) => ((q1 - q0) / q0) / ((p1 - p0) / p0);
/** Total expenditure method: 'greater than one' | 'equal to one' | 'less than one' from (p0,q0)→(p1,q1). */
export function expenditureVerdict(p0, q0, p1, q1) {
  const e0 = p0 * q0;
  const e1 = p1 * q1;
  if (e0 === e1) return 'equal to one';
  const priceUp = p1 > p0;
  return (e1 < e0) === priceUp ? 'greater than one' : 'less than one';
}
/** Marginal values of a total schedule (TU, TP, TC, TR): [t1 − t0, t2 − t1, …] aligned with t[1…]. */
export const marginal = (t) => t.slice(1).map((x, i) => x - t[i]);
/** Average values: t[i] / q[i] (skip q = 0). */
export const average = (t, q) => t.map((x, i) => (q[i] ? x / q[i] : null));

// ---------------------------------------------------------------- self-checks (run on import)
{
  // Grouped series checked by hand: classes 0–10 … 40–50, f = 5, 8, 12, 10, 5 (N = 40, midpoints 5 … 45).
  const C = [[0, 10, 5], [10, 20, 8], [20, 30, 12], [30, 40, 10], [40, 50, 5]];
  // Σfm = 25 + 120 + 300 + 350 + 225 = 1020 → mean 25.5
  assert.equal(meanGrouped(C), 25.5);
  assert.equal(meanAssumed(C, 25).mean, 25.5);
  assert.equal(meanStep(C, 25, 10).mean, 25.5);
  // N/2 = 20, cf before 20–30 is 13, f = 12 → 20 + (7/12) × 10 = 25.8333…
  assert.equal(rnd(medianGrouped(C).median, 4), 25.8333);
  // D1 = 12 − 8 = 4, D2 = 12 − 10 = 2 → 20 + (4/6) × 10 = 26.6667
  assert.equal(rnd(modeGrouped(C).mode, 4), 26.6667);
  assert.equal(median([7, 3, 9, 1]), 5);
  assert.equal(mode([2, 4, 4, 6]), 4);
  // Perfect positive and negative linear relations.
  assert.equal(rnd(pearson([1, 2, 3, 4], [3, 5, 7, 9]).r, 6), 1);
  assert.equal(rnd(pearson([1, 2, 3, 4], [8, 6, 4, 2]).r, 6), -1);
  // Hand check: x = 2,4,6,8,10; y = 3,5,4,8,10 → dx −4,−2,0,2,4; dy −3,−1,−2,2,4 → Σxy 34, Σx² 40, Σy² 34 → r = 34/√1360 = 0.9220
  assert.equal(rnd(pearson([2, 4, 6, 8, 10], [3, 5, 4, 8, 10]).r, 4), 0.922);
  // Ranks with a tie: 50, 40, 40, 30 → 1, 2.5, 2.5, 4
  assert.deepEqual(ranks([50, 40, 40, 30]), [1, 2.5, 2.5, 4]);
  // Spearman without ties: ranks 1..5 against 2,1,4,3,5 → ΣD² = 4 → 1 − 24/120 = 0.8
  assert.equal(rnd(spearman([1, 2, 3, 4, 5], [2, 1, 4, 3, 5], { ranked: true }).rs, 4), 0.8);
  // With one tie of two: x = 10,20,20,30 (ranks 4,2.5,2.5,1), y = 1,2,3,4 (ranks 4,3,2,1) → ΣD² = 0.5, CF = 0.5
  //   → 1 − 6 × 1 / 60 = 0.9
  assert.equal(rnd(spearman([10, 20, 20, 30], [1, 2, 3, 4]).rs, 4), 0.9);
  // Index numbers: p0 = 10, 20, 30; p1 = 12, 25, 33 → Σ 60 → 70 → 116.67; relatives 120, 125, 110 → 118.33
  assert.equal(rnd(indexAggregative([10, 20, 30], [12, 25, 33])), 116.67);
  assert.equal(rnd(indexRelatives([10, 20, 30], [12, 25, 33])), 118.33);
  // Laspeyres with q0 = 2, 1, 1: Σp1q0 = 24 + 25 + 33 = 82; Σp0q0 = 20 + 20 + 30 = 70 → 117.14
  assert.equal(rnd(indexLaspeyres([10, 20, 30], [12, 25, 33], [2, 1, 1])), 117.14);
  assert.equal(inflation(200, 210), 5);
  // Elasticity: P 10 → 12 (+20%), Q 100 → 80 (−20%) → 1; expenditure 1000 → 960 falls as price rises → > 1
  assert.equal(elasticity(10, 100, 12, 80), 1);
  assert.equal(expenditureVerdict(10, 100, 12, 80), 'greater than one');
  assert.equal(expenditureVerdict(10, 100, 12, 90), 'less than one');
  assert.equal(expenditureVerdict(10, 120, 12, 100), 'equal to one');
  assert.equal(rnd(elasticitySupply(10, 100, 12, 130), 6), 1.5);
  assert.deepEqual(marginal([0, 10, 18, 24]), [10, 8, 6]);
}
