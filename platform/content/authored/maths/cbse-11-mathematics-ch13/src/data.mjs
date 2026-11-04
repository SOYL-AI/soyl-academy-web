// The data sets of ch13 Statistics. Every set is an exact Dist (BigInt rationals); each is verified on load:
// mean, median, range, mean deviations, and the variance by four independent routes must agree exactly.
import { Dist, fr, T } from './stat.mjs';

const mk = (d, A, h = 1) => { d.verify(A, h); return d; };

// ---------------------------------------------------------------- ungrouped (raw) data
export const TEMP = mk(Dist.raw([6, 11, 4, 9, 13, 8, 10]), 9);               // daily minimum temperature, imagined hill village
export const FERRY = mk(Dist.raw([5, 8, 11, 12, 24]), 12);                      // minutes late, five ferry trips
export const WASTE = mk(Dist.raw([6, 8, 13, 14, 16, 19, 31, 37]), 18);          // kg of waste per day, eight days
export const SEED = mk(Dist.raw([4, 6, 7, 10, 15, 18]), 10);                    // seedling growth in mm, six seedlings
export const SCORE = mk(Dist.raw([20, 9, 12, 26, 11, 12]), 15);                 // points in six matches
export const KIOSK_X = mk(Dist.raw([71, 77, 80, 83, 89]), 80);                  // units sold per day, kiosk X
export const KIOSK_Y = mk(Dist.raw([19, 23, 25, 27, 31]), 25);                  // units sold per day, kiosk Y

// ---------------------------------------------------------------- discrete frequency distributions
export const WAIT = mk(Dist.discrete([15, 20, 25, 30, 35, 40], [14, 11, 8, 10, 2, 5]), 25, 5);   // clinic waiting time, 50 patients
export const SLOT = mk(Dist.discrete([2, 4, 6, 8, 10, 12], [8, 3, 12, 7, 2, 8]), 6, 2);          // customers per quarter hour, 40 slots

// ---------------------------------------------------------------- grouped (continuous classes)
export const SPEND = mk(Dist.grouped(10, 10, [14, 7, 10, 13, 6]), 35, 10);       // rupees spent at a stall, 50 customers
export const SCREEN = mk(Dist.grouped(0, 10, [11, 9, 10, 4, 6, 10]), 25, 10);    // minutes of screen time, 50 students
export const BAKE = mk(Dist.grouped(30, 10, [9, 11, 5, 9, 6]), 55, 10);          // loaves sold per day, 40 days

// ---------------------------------------------------------------- the headline numbers, asserted against the text of the chapter
function expect(d, o) {
  for (const [k, v] of Object.entries(o)) {
    const got = k === 'sd' ? d.variance.sqrt() : d[k];
    if (!got || !got.eq(v)) throw new Error(`data check ${k}: expected ${v}, got ${got}`);
  }
}
expect(TEMP, { mean: '61/7', range: 9 });
expect(FERRY, { mean: 12, median: 11, mdMean: '24/5', mdMedian: '23/5', variance: 42, range: 19 });
expect(WASTE, { mean: 18, median: 15, mdMean: '33/4', mdMedian: '31/4', range: 31 });
expect(SEED, { mean: 10, variance: 25, sd: 5 });
expect(SCORE, { mean: 15, variance: 36, sd: 6 });
expect(KIOSK_X, { mean: 80, variance: 36, sd: 6 });
expect(KIOSK_Y, { mean: 25, variance: 16, sd: 4 });
expect(WAIT, { mean: 24, median: '45/2', mdMean: '34/5', variance: 64, sd: 8 });
expect(SLOT, { mean: '34/5', variance: '289/25', sd: '17/5', median: 6 });
expect(SPEND, { mean: 33, median: 34, mdMean: '308/25', variance: 196, sd: 14 });
expect(SCREEN, { mean: 28, median: 25, mdMean: 16, mdMedian: '77/5', variance: 333 });
expect(BAKE, { mean: 53, median: 50, mdMean: '25/2', mdMedian: '25/2', variance: 196, sd: 14 });
