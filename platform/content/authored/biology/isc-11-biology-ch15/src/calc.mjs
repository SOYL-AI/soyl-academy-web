// ISC 11 Biology ch15 Plant Growth and Development — every number in a stem, answer, table or slide is computed here and asserted.
export const round = (x, dp = 0) => Math.round(x * 10 ** dp) / 10 ** dp;
/** Throws when a computed value does not match the expected one. */
export const eq = (v, e, what) => {
  if (!(v === e || (typeof v === 'number' && typeof e === 'number' && Math.abs(v - e) < 1e-9))) throw new Error(`calc: ${what}: got ${v}, expected ${e}`);
  return v;
};

// ---------------------------------------------------------------- arithmetic and geometric growth
/** Arithmetic growth: L(t) = L0 + r t. */
export const arith = (l0, r, t) => round(l0 + r * t, 4);
export const ROOT = { l0: 3, r: 0.8 }; // cm and cm per day
eq(arith(ROOT.l0, ROOT.r, 10), 11, 'root length after 10 days');
eq(arith(ROOT.l0, ROOT.r, 5), 7, 'root length after 5 days');
/** Geometric growth by repeated doubling: N(t) = N0 * 2^(t / T). */
export const doubling = (n0, hours, T) => n0 * 2 ** (hours / T);
export const CELLS = { n0: 1, T: 12 };
eq(doubling(CELLS.n0, 72, CELLS.T), 64, 'cells after 72 h');
eq(doubling(CELLS.n0, 48, CELLS.T), 16, 'cells after 48 h');
eq(doubling(CELLS.n0, 24, CELLS.T), 4, 'cells after 24 h');
export const doublingsFor = (target, n0 = 1) => Math.log2(target / n0);
eq(doublingsFor(1024), 10, 'doublings to reach 1024 cells');

// ---------------------------------------------------------------- absolute and relative growth rates
export const agr = (l1, l2, days) => round((l2 - l1) / days, 4);
export const rgr = (l1, l2, days) => round((l2 - l1) / l1 / days, 4);
export const SEEDLINGS = { A: [10, 16], B: [30, 36], days: 3 };
export const AGR = { A: agr(...SEEDLINGS.A, SEEDLINGS.days), B: agr(...SEEDLINGS.B, SEEDLINGS.days) };
export const RGR = { A: rgr(...SEEDLINGS.A, SEEDLINGS.days), B: rgr(...SEEDLINGS.B, SEEDLINGS.days) };
eq(AGR.A, 2, 'absolute growth rate of A');
eq(AGR.B, 2, 'absolute growth rate of B');
eq(RGR.A, 0.2, 'relative growth rate of A');
eq(RGR.B, 0.0667, 'relative growth rate of B');
export const RGR_PCT = { A: round(RGR.A * 100, 1), B: round(RGR.B * 100, 1) };
eq(RGR_PCT.A, 20, 'RGR A percent per day');
eq(RGR_PCT.B, 6.7, 'RGR B percent per day');

// ---------------------------------------------------------------- sigmoid (logistic) growth of a shoot, a teaching model
export const LOG = { K: 60, r: 0.5, t0: 10 }; // final height cm, per day, day of fastest growth
export const height = (t) => LOG.K / (1 + Math.exp(-LOG.r * (t - LOG.t0)));
export const tAt = (frac) => LOG.t0 + Math.log(frac / (1 - frac)) / LOG.r;
export const MAXRATE = (LOG.r * LOG.K) / 4;
eq(round(height(10), 1), 30, 'height at inflection');
eq(MAXRATE, 7.5, 'maximum growth rate');
export const LAG_END = Math.round(tAt(0.05));
export const LOG_END = Math.round(tAt(0.95));
eq(LAG_END, 4, 'end of lag phase');
eq(LOG_END, 16, 'end of log phase');
export const DAYS = Array.from({ length: 11 }, (_, i) => i * 2);
export const HEIGHTS = DAYS.map((t) => round(height(t), 1));
eq(HEIGHTS[0], 0.4, 'height at day 0');
eq(HEIGHTS[5], 30, 'height at day 10');
eq(HEIGHTS[10], 59.6, 'height at day 20');
export const gain = (t1, t2) => round(height(t2) - height(t1), 1);
export const GAIN = { lag: gain(0, 4), log: gain(LAG_END, LOG_END), stat: gain(LOG_END, 20) };
eq(GAIN.lag, 2.4, 'gain in the lag phase');
eq(GAIN.log, 54.3, 'gain in the log phase');
eq(GAIN.stat, 2.4, 'gain in the stationary phase');
eq(round(height(4), 1), 2.8, 'height at day 4');
eq(round(height(16), 1), 57.2, 'height at day 16');

// ---------------------------------------------------------------- arc auxanometer
export const AUX = { R: 24, r: 2 }; // pointer length and pulley radius in cm
export const magnification = AUX.R / AUX.r;
eq(magnification, 12, 'auxanometer magnification');
export const actualGrowth = (pointerMm) => round(pointerMm / magnification, 3);
export const pointerFor = (growthMm) => round(growthMm * magnification, 3);
eq(actualGrowth(18), 1.5, 'growth for 18 mm of pointer movement');
eq(pointerFor(3), 36, 'pointer movement for 3 mm of growth');
eq(actualGrowth(30), 2.5, 'growth for 30 mm of pointer movement');

// ---------------------------------------------------------------- Went's Avena curvature test (illustrative, linear in range)
export const WENT = { degPerUnit: 30 }; // degrees of curvature per mg/L of auxin in the agar block
export const curvature = (conc) => round(WENT.degPerUnit * conc, 2);
export const concFor = (deg) => round(deg / WENT.degPerUnit, 3);
export const WENT_CONC = [0.1, 0.2, 0.4, 0.6, 0.8];
export const WENT_DEG = WENT_CONC.map(curvature);
eq(WENT_DEG[2], 12, 'curvature at 0.4');
eq(WENT_DEG[4], 24, 'curvature at 0.8');
eq(concFor(21), 0.7, 'concentration for 21 degrees');
eq(curvature(0.5), 15, 'curvature at 0.5');

// ---------------------------------------------------------------- dilution of growth-regulator sprays (C1 V1 = C2 V2, ppm = mg per litre)
export const stockVolume = (stockPpm, wantPpm, wantMl) => round((wantPpm * wantMl) / stockPpm, 3);
export const D1 = { stock: 1000, want: 50, ml: 2000 };
eq(stockVolume(D1.stock, D1.want, D1.ml), 100, 'stock for 2 L of 50 ppm');
export const D2 = { stock: 1000, want: 20, ml: 5000 };
eq(stockVolume(D2.stock, D2.want, D2.ml), 100, 'stock for 5 L of 20 ppm');
export const D3 = { stock: 1000, want: 100, ml: 500 };
eq(stockVolume(D3.stock, D3.want, D3.ml), 50, 'stock for 500 mL of 100 ppm');
export const milligrams = (ppm, ml) => round((ppm * ml) / 1000, 3);
eq(milligrams(50, 2000), 100, 'mg of regulator in 2 L of 50 ppm');

// ---------------------------------------------------------------- tissue culture: auxin to cytokinin ratio decides the organ
export const MEDIA = [
  { id: 'M1', auxin: 2.0, cytokinin: 0.2 },
  { id: 'M2', auxin: 0.2, cytokinin: 2.0 },
  { id: 'M3', auxin: 1.0, cytokinin: 1.0 },
];
export const ratio = (m) => round(m.auxin / m.cytokinin, 2);
export const outcome = (m) => (ratio(m) > 1 ? 'roots' : ratio(m) < 1 ? 'shoots' : 'undifferentiated callus');
eq(ratio(MEDIA[0]), 10, 'ratio of M1');
eq(ratio(MEDIA[1]), 0.1, 'ratio of M2');
eq(outcome(MEDIA[0]), 'roots', 'M1 outcome');
eq(outcome(MEDIA[1]), 'shoots', 'M2 outcome');
eq(outcome(MEDIA[2]), 'undifferentiated callus', 'M3 outcome');

// ---------------------------------------------------------------- fresh and dry weight of a germinating seed, a growth measure
export const FW = [['Day 0', 1.2, 1.1], ['Day 4', 2.6, 1.0], ['Day 8', 4.8, 1.3]];
export const pctWater = (fw, dw) => round(((fw - dw) / fw) * 100, 1);
eq(pctWater(2.6, 1.0), 61.5, 'water content on day 4');
eq(pctWater(4.8, 1.3), 72.9, 'water content on day 8');
