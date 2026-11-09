// The data sets of ISC 11 Mathematics ch18 (measures of dispersion). Every set is an exact Dist (BigInt rationals) and is
// verified on load: the variance by the definition, by sum(f x^2)/n - mean^2, by the assumed-mean route and by the
// step-deviation route must agree exactly; the deviations from the mean must add to zero. Headline numbers are asserted below.
import { Dist, fr } from './stat2.mjs';

const ok = (d, A, h = 1) => { d.verify(A, h); return d; };

// ---------------------------------------------------------------- ungrouped (raw)
export const RAIN = ok(Dist.raw([9, 12, 15, 16, 20, 21, 23, 28]), 20);        // daily rainfall (mm), imagined hill town, 8 days
export const SCORE = ok(Dist.raw([34, 58, 41, 67, 25, 52]), 45);               // runs of an imagined cricketer, 6 innings
export const PA = ok(Dist.raw([40, 45, 50, 55, 60]), 50);                       // innings of Meera
export const PB = ok(Dist.raw([20, 35, 50, 65, 80]), 50);                       // innings of Tara
export const BOX = ok(Dist.raw([18, 7, 10, 6, 14]), 10);                        // masses of five imagined parcels (kg)
export const CUP = ok(Dist.raw([23, 24, 22, 33, 16, 26, 17]), 25);             // cups of tea sold, 7 days
export const SIX = ok(Dist.raw([25, 11, 19, 17, 23, 13]), 18);                 // quiz marks, 6 pupils
export const EIGHT = ok(Dist.raw([12, 23, 14, 11, 7, 18, 29, 30]), 20);        // cycle trips, 8 days
export const EIGHTB = ok(Dist.raw([14, 40, 25, 38, 35, 39, 10, 7]), 25);       // lengths of 8 imagined ropes
export const TEN = ok(Dist.raw([42, 43, 44, 14, 10, 46, 45, 36, 23, 7]), 30);  // 10 imagined seedlings (days to sprout)
export const SIXB = ok(Dist.raw([52, 16, 56, 28, 20, 8]), 30);                 // units sold by 6 stalls

// ---------------------------------------------------------------- discrete
export const BOOKS = ok(Dist.discrete([10, 20, 30, 40, 50], [14, 4, 10, 8, 4]), 30, 10);        // pages read per night, 40 pupils
export const MINS = ok(Dist.discrete([20, 30, 40, 50, 60], [11, 10, 5, 12, 2]), 40, 10);        // minutes of practice, 40 players
export const TEAS = ok(Dist.discrete([4, 6, 8, 10, 12], [7, 6, 10, 6, 11]), 8, 2);              // goals per match... (4..12), 40 matches
export const FIVE = ok(Dist.discrete([3, 4, 5, 6, 7], [6, 4, 6, 2, 7]), 5, 1);                  // customers per hour, 25 hours
export const SQ40 = ok(Dist.discrete([20, 30, 40, 50, 60], [8, 3, 11, 9, 9]), 40, 10);          // sd 14

// ---------------------------------------------------------------- grouped
export const MARKS = ok(Dist.grouped(0, 10, [8, 13, 8, 13, 8]), 25, 10);        // 50 pupils, mean 25, var 180
export const WORK = ok(Dist.grouped(0, 10, [13, 8, 13, 8, 8]), 25, 10);         // 50 workers, mean 23, var 196
export const SIXC = ok(Dist.grouped(20, 10, [4, 13, 6, 14, 7, 6]), 55, 10);     // 50 items, mean 50, var 225
export const WIDE = ok(Dist.grouped(0, 20, [6, 10, 12, 2, 10]), 50, 20);        // 40 items, mean 50, var 760
export const FIVEW = ok(Dist.grouped(0, 5, [3, 3, 9, 9, 6]), 12.5, 5);          // 30 items, mean 14.5, var 36
export const FOURW = ok(Dist.grouped(8, 4, [11, 6, 7, 8, 9, 9]), 20, 4);        // 50 items, mean 20, var 52
export const TENW = ok(Dist.grouped(10, 10, [11, 4, 7, 10, 8]), 35, 10);        // 40 items, mean 35, var 225
export const FORTY = ok(Dist.grouped(10, 10, [8, 3, 11, 9, 9]), 35, 10);        // 40 items, mean 37, var 196

// ---------------------------------------------------------------- headline numbers, asserted against the text
function expect(name, d, o) {
  for (const [k, v] of Object.entries(o)) {
    const got = k === 'sd' ? d.variance.sqrt() : d[k];
    if (!got || !got.eq(v)) throw new Error(`data check ${name}.${k}: expected ${v}, got ${got}`);
  }
}
expect('RAIN', RAIN, { mean: 18, mdMean: 5, range: 19, variance: '67/2' });
expect('SCORE', SCORE, { range: 42 });
expect('PA', PA, { mean: 50, mdMean: 6, variance: 50 });
expect('PB', PB, { mean: 50, mdMean: 18, variance: 450 });
expect('BOX', BOX, { mean: 11, mdMean: 4, variance: 20 });
expect('CUP', CUP, { mean: 23, variance: 28 });
expect('SIX', SIX, { mean: 18, variance: 25, sd: 5 });
expect('EIGHT', EIGHT, { mean: 18, mdMean: 7, variance: 64, sd: 8 });
expect('EIGHTB', EIGHTB, { mean: 26, mdMean: 12, variance: 169, sd: 13 });
expect('TEN', TEN, { mean: 31, mdMean: 14, variance: 225, sd: 15 });
expect('BOOKS', BOOKS, { mean: 26, mdMean: '62/5', variance: 194 });
expect('MINS', MINS, { mean: 36, mdMean: '59/5', variance: 169, sd: 13 });
expect('TEAS', TEAS, { mean: '42/5', variance: '206/25' });
expect('FIVE', FIVE, { mean: 5, variance: '58/25' });
expect('SQ40', SQ40, { mean: 42, variance: 196, sd: 14 });
expect('MARKS', MARKS, { mean: 25, mdMean: '58/5', variance: 180 });
expect('WORK', WORK, { mean: 23, variance: 196, sd: 14 });
expect('SIXC', SIXC, { mean: 50, mdMean: 13, variance: 225, sd: 15 });
expect('WIDE', WIDE, { mean: 50, variance: 760 });
expect('FIVEW', FIVEW, { mean: '29/2', mdMean: 5, variance: 36, sd: 6 });
expect('FOURW', FOURW, { mean: 20, mdMean: '32/5', variance: 52 });
expect('TENW', TENW, { mean: 35, mdMean: 13, variance: 225, sd: 15 });
expect('FORTY', FORTY, { mean: 37, mdMean: '117/10', variance: 196, sd: 14 });
