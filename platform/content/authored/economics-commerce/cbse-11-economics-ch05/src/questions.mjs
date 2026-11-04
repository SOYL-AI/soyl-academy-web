// CBSE 11 Economics, ch05 Measures of Central Tendency: question bank. Every hill station, factory, shop, school and family is
// imagined and written for this chapter; no real statistics are used. Every figure is computed with stats.mjs (or plain code)
// from the imagined data and pinned with check() wherever it is written in prose.
import { Q, mcq, ar, tf, fb, match, ord, num, short, long, caseQ, child } from '../../cbse-11-economics-ch01/src/lib.mjs';
import { sum, rnd, check, mean, meanDiscrete, mids, meanGrouped, meanAssumed, meanStep, median, cumulative, medianGrouped, mode, modeGrouped } from '../../cbse-11-economics-ch01/src/stats.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];
export const S = (x, d = 2) => String(rnd(x, d));
const J = (a) => a.join(', ');
const ser = (cls) => cls.map((c) => `${c[0]} to ${c[1]}: ${c[2]}`).join('; ');
const dis = (xs, fs) => xs.map((x, i) => `${x}: ${fs[i]}`).join('; ');
const fN = (cls) => sum(cls.map((c) => c[2]));
export const inr = (x) => `Rs ${x.toLocaleString('en-IN')}`;

/** Median of a discrete series: the ((N + 1) / 2)th item, found from cumulative frequencies. */
export function medianDiscrete(xs, fs) {
  const cf = cumulative(fs);
  const N = cf[cf.length - 1];
  const pos = (N + 1) / 2;
  const at = (k) => xs[cf.findIndex((c) => c >= k)];
  return { N, cf, pos, median: (at(Math.floor(pos)) + at(Math.ceil(pos))) / 2 };
}
/** Mode of a discrete series: the value with the highest frequency (must be unique). */
export function modeDiscrete(xs, fs) {
  const m = Math.max(...fs);
  if (fs.filter((f) => f === m).length !== 1) throw new Error('modeDiscrete: not unique');
  return xs[fs.indexOf(m)];
}
/** Graphic location of the mode on a histogram of equal classes: intersection of the two joining lines. */
export function modeGraphic(cls) {
  const { cls: i } = modeGrouped(cls);
  const [L, U, f1] = cls[i];
  const f0 = cls[i - 1][2];
  const f2 = cls[i + 1][2];
  // line A: top-right corner of the preceding bar (L, f0) to top-right corner of the modal bar (U, f1)
  // line B: top-left corner of the modal bar (L, f1) to top-left corner of the following bar (U, f2)
  const t = (f1 - f0) / ((f1 - f0) + (f1 - f2));
  return { x: L + t * (U - L), y: f0 + t * (f1 - f0), L, U, f0, f1, f2 };
}

// ---------------------------------------------------------------- imagined data (computed)
// 1. Dhunmarg hill station: daily rainfall (mm) over 10 days.
export const RAIN = [12, 8, 15, 9, 20, 6, 10, 14, 11, 5];
export const rainMean = mean(RAIN);
export const rainDev = RAIN.map((x) => x - rainMean);
export const rainPos = sum(rainDev.filter((d) => d > 0));
export const rainNeg = sum(rainDev.filter((d) => d < 0));
export const RAIN_A = 10;
export const rainD = RAIN.map((x) => x - RAIN_A);
export const rainMed = median(RAIN);
export const RAIN_X = RAIN.map((x) => (x === 20 ? 70 : x));
check(rainMean, 11, 6, 'Dhunmarg mean');
check(sum(rainDev), 0, 6, 'deviations from the mean add to zero');
check(rainPos, 17, 6, 'positive deviations');
check(rainNeg, -17, 6, 'negative deviations');
check(RAIN_A + sum(rainD) / RAIN.length, 11, 6, 'Dhunmarg assumed mean');
check(rainMed, 10.5, 6, 'Dhunmarg median');
check(mean(RAIN_X), 16, 6, 'Dhunmarg mean with the extreme day');
check(median(RAIN_X), 10.5, 6, 'median is unmoved by the extreme day');

// 2. Kaladhar hill station: rainfall (mm), 8 days.
export const KAL = [6, 9, 12, 4, 15, 8, 10, 12];
export const kalMean = mean(KAL);
export const kalD = KAL.map((x) => x - 10);
check(kalMean, 9.5, 6, 'Kaladhar mean');
check(sum(kalD), -4, 6, 'Kaladhar sum of deviations from 10');

// 3. Chandanpur hamlet: monthly family incomes (thousand rupees), 7 families.
export const INC = [18, 20, 22, 24, 26, 28, 100];
export const incMean = mean(INC);
export const incMed = median(INC);
export const incMean6 = mean(INC.slice(0, 6));
check(incMean, 34, 6, 'Chandanpur mean');
check(incMed, 24, 6, 'Chandanpur median');
check(incMean6, 23, 6, 'Chandanpur mean without the extreme family');

// 4. Step-Up Footwear: shoe sizes of 60 pairs sold.
export const SHOE_X = [5, 6, 7, 8, 9, 10];
export const SHOE_F = [5, 10, 20, 15, 7, 3];
export const shoeN = sum(SHOE_F);
export const shoeMean = meanDiscrete(SHOE_X, SHOE_F);
export const shoeFX = SHOE_X.map((x, i) => x * SHOE_F[i]);
export const shoeMed = medianDiscrete(SHOE_X, SHOE_F);
export const shoeMode = modeDiscrete(SHOE_X, SHOE_F);
check(shoeN, 60, 0, 'Step-Up pairs');
check(sum(shoeFX), 438, 0, 'Step-Up sum fX');
check(shoeMean, 7.3, 6, 'Step-Up mean');
check(shoeMed.pos, 30.5, 6, 'Step-Up median position');
check(shoeMed.median, 7, 6, 'Step-Up median');
check(shoeMode, 7, 6, 'Step-Up mode');

// 5. Hourly shoe sizes at a counter (individual series), for the mode.
export const SHOE_HR = [7, 8, 6, 7, 9, 7, 8, 6, 7, 10, 8, 7];
export const shoeHrMode = mode(SHOE_HR);
check(shoeHrMode, 7, 6, 'hourly shoe mode');

// 6. Tarapur Cable Works: weekly wages (Rs) of 50 workers, classes of width 100.
export const WAGE = [[500, 600, 4], [600, 700, 8], [700, 800, 14], [800, 900, 12], [900, 1000, 8], [1000, 1100, 4]];
export const wN = fN(WAGE);
export const wM = mids(WAGE);
export const wFM = WAGE.map((c, i) => c[2] * wM[i]);
export const wMean = meanGrouped(WAGE);
export const wA = 850;
export const wH = 100;
export const wAs = meanAssumed(WAGE, wA);
export const wSt = meanStep(WAGE, wA, wH);
export const wCum = cumulative(WAGE.map((c) => c[2]));
export const wMore = WAGE.map((_, i) => wN - (i ? wCum[i - 1] : 0));
export const wMed = medianGrouped(WAGE);
export const wMode = modeGrouped(WAGE);
export const wGraph = modeGraphic(WAGE);
check(wN, 50, 0, 'Tarapur workers');
check(sum(wFM), 39900, 0, 'Tarapur sum fm');
check(wMean, 798, 6, 'Tarapur mean (direct)');
check(wAs.mean, 798, 6, 'Tarapur mean (assumed)');
check(wSt.mean, 798, 6, 'Tarapur mean (step)');
check(wAs.sumFd, -2600, 6, 'Tarapur sum fd');
check(wSt.sumFd, -26, 6, 'Tarapur sum fd prime');
check(wMed.median, 792.86, 2, 'Tarapur median');
check(wMode.mode, 775, 6, 'Tarapur mode');
check(wGraph.x, wMode.mode, 6, 'graphic mode agrees with the formula');
check(wMode.D1, 6, 0, 'Tarapur D1');
check(wMode.D2, 2, 0, 'Tarapur D2');

// 7. Lotus Public School: quiz marks out of 10 of 40 pupils (discrete).
export const QZ_X = [4, 5, 6, 7, 8, 9];
export const QZ_F = [3, 5, 12, 10, 7, 3];
export const qzN = sum(QZ_F);
export const qzMean = meanDiscrete(QZ_X, QZ_F);
export const qzMed = medianDiscrete(QZ_X, QZ_F);
export const qzMode = modeDiscrete(QZ_X, QZ_F);
check(qzN, 40, 0, 'quiz pupils');
check(qzMean, 6.55, 6, 'quiz mean');
check(qzMed.median, 6.5, 6, 'quiz median');
check(qzMode, 6, 6, 'quiz mode');

// 8. Vidyamandir Evening School: marks of 40 learners in a test out of 80 (continuous).
export const MK = [[20, 30, 4], [30, 40, 6], [40, 50, 12], [50, 60, 10], [60, 70, 6], [70, 80, 2]];
export const mkN = fN(MK);
export const mkMean = meanGrouped(MK);
export const mkSt = meanStep(MK, 45, 10);
export const mkMed = medianGrouped(MK);
export const mkMode = modeGrouped(MK);
check(mkN, 40, 0, 'Vidyamandir learners');
check(mkMean, 48.5, 6, 'Vidyamandir mean');
check(mkSt.mean, 48.5, 6, 'Vidyamandir step-deviation mean');
check(mkSt.sumFd, 14, 6, 'Vidyamandir sum fd prime');
check(mkMed.median, 48.33, 2, 'Vidyamandir median');
check(mkMode.mode, 47.5, 6, 'Vidyamandir mode');

// 9. Anandpur Dairy Cooperative: litres delivered per day by 40 farmers.
export const DY = [[0, 10, 4], [10, 20, 6], [20, 30, 14], [30, 40, 10], [40, 50, 6]];
export const dyN = fN(DY);
export const dyM = mids(DY);
export const dyMean = meanGrouped(DY);
export const dyCum = cumulative(DY.map((c) => c[2]));
export const dyMed = medianGrouped(DY);
export const dyMode = modeGrouped(DY);
check(dyN, 40, 0, 'Anandpur farmers');
check(dyMean, 27, 6, 'Anandpur mean');
check(dyMed.median, 27.14, 2, 'Anandpur median');
check(dyMode.mode, 26.67, 2, 'Anandpur mode');

// 10. Sunrise Health Camp: ages (years) of 50 visitors.
export const AG = [[0, 20, 6], [20, 40, 10], [40, 60, 16], [60, 80, 12], [80, 100, 6]];
export const agN = fN(AG);
export const agMean = meanGrouped(AG);
export const agAs = meanAssumed(AG, 50);
export const agSt = meanStep(AG, 50, 20);
export const agM = mids(AG);
check(agN, 50, 0, 'health camp visitors');
check(agMean, 50.8, 6, 'health camp mean');
check(agAs.mean, 50.8, 6, 'health camp assumed mean');
check(agSt.mean, 50.8, 6, 'health camp step mean');
check(agAs.sumFd, 40, 6, 'health camp sum fd');
check(agSt.sumFd, 2, 6, 'health camp sum fd prime');

// 11. Riverside Cooperative Bank: service time (minutes) of 50 customers.
export const BK = [[0, 5, 4], [5, 10, 16], [10, 15, 14], [15, 20, 10], [20, 25, 6]];
export const bkN = fN(BK);
export const bkCum = cumulative(BK.map((c) => c[2]));
export const bkMean = meanGrouped(BK);
export const bkMed = medianGrouped(BK);
export const bkMode = modeGrouped(BK);
check(bkN, 50, 0, 'bank customers');
check(bkMean, 12.3, 6, 'bank mean');
check(bkMed.median, 11.79, 2, 'bank median');
check(bkMode.mode, 9.29, 2, 'bank mode');
check(bkMode.cls, 1, 0, 'bank modal class index');
check(bkMed.cf, 20, 0, 'bank cf before the median class');

// 12. Rapid Footwear Mart: shoe sizes of 50 pairs sold.
export const SH2_X = [6, 7, 8, 9, 10];
export const SH2_F = [4, 14, 20, 10, 2];
export const sh2N = sum(SH2_F);
export const sh2Cum = cumulative(SH2_F);
export const sh2Mean = meanDiscrete(SH2_X, SH2_F);
export const sh2Med = medianDiscrete(SH2_X, SH2_F);
export const sh2Mode = modeDiscrete(SH2_X, SH2_F);
check(sh2N, 50, 0, 'Rapid Footwear pairs');
check(sh2Mean, 7.84, 6, 'Rapid Footwear mean');
check(sh2Med.median, 8, 6, 'Rapid Footwear median');
check(sh2Mode, 8, 6, 'Rapid Footwear mode');

// 13. Neelgiri hill station: rainfall (mm) over 10 days with one extreme day.
export const NG = [4, 6, 5, 7, 6, 5, 4, 6, 7, 50];
export const ngMean = mean(NG);
export const ngMed = median(NG);
export const ngMode = mode(NG);
export const NG_FIX = NG.map((x) => (x === 50 ? 5 : x));
check(ngMean, 10, 6, 'Neelgiri mean');
check(ngMed, 6, 6, 'Neelgiri median');
check(ngMode, 6, 6, 'Neelgiri mode');
check(mean(NG_FIX), 5.5, 6, 'Neelgiri mean with the extreme day replaced');

// 14. Weighted means.
export const WT_N = ['Mathematics', 'Science', 'English', 'Hindi'];
export const WT_W = [4, 3, 2, 1];
export const MEERA = [80, 70, 60, 50];
export const meeraW = sum(MEERA.map((x, i) => x * WT_W[i])) / sum(WT_W);
export const meeraS = mean(MEERA);
export const ARJUN = [75, 65, 55, 80];
export const arjunW = sum(ARJUN.map((x, i) => x * WT_W[i])) / sum(WT_W);
check(meeraW, 70, 6, 'Meera weighted mean');
check(meeraS, 65, 6, 'Meera simple mean');
check(arjunW, 68.5, 6, 'Arjun weighted mean');
export const BAS_N = ['Food', 'Fuel', 'Clothing', 'Housing'];
export const BAS_R = [120, 110, 140, 100];
export const BAS_W = [50, 20, 10, 20];
export const basW = sum(BAS_R.map((r, i) => r * BAS_W[i])) / sum(BAS_W);
export const basS = mean(BAS_R);
check(basW, 116, 6, 'Sundarpur basket weighted mean');
check(basS, 117.5, 6, 'Sundarpur basket simple mean');
export const CR_M = [70, 60, 80];
export const CR_W = [2, 3, 5];
export const crW = sum(CR_M.map((x, i) => x * CR_W[i])) / sum(CR_W);
export const crS = mean(CR_M);
check(crW, 72, 6, 'credit-weighted mean');
check(crS, 70, 6, 'credit simple mean');

// 15. Odds and ends.
export const W25 = { n: 25, mean: 480, wrong: 540, right: 450 };
export const w25Fix = (W25.n * W25.mean - W25.wrong + W25.right) / W25.n;
check(w25Fix, 476.4, 6, 'corrected mean wage');
export const MISS = { known: [30, 35, 40, 45, 50], mean: 42 };
export const missing = MISS.mean * (MISS.known.length + 1) - sum(MISS.known);
check(missing, 52, 6, 'missing observation');
export const STALL = [40, 45, 50, 55, 60];
export const STALL_X = [40, 45, 50, 55, 160];
check(mean(STALL), 50, 6, 'stall mean');
check(mean(STALL_X), 70, 6, 'stall mean with one extreme');
check(median(STALL_X), 50, 6, 'stall median with one extreme');
export const Z4 = [14, 18, 20, 28];
export const z4Mean = mean(Z4);
export const z4Dev = Z4.map((x) => x - z4Mean);
check(z4Mean, 20, 6, 'four-value mean');
check(sum(z4Dev), 0, 6, 'four-value deviations');
export const EV6 = [34, 20, 28, 40, 25, 31];
export const ev6Med = median(EV6);
check(ev6Med, 29.5, 6, 'even-count median');
export const TEA = [42, 38, 46, 50, 44];
export const teaA = 45;
export const teaD = TEA.map((x) => x - teaA);
export const teaMean = teaA + sum(teaD) / TEA.length;
check(sum(teaD), -5, 6, 'tea stall sum of d');
check(teaMean, 44, 6, 'tea stall mean');
export const LB_X = [1, 2, 3, 4, 5];
export const LB_F = [3, 5, 6, 4, 2];
export const lbMean = meanDiscrete(LB_X, LB_F);
check(sum(LB_F), 20, 0, 'library members');
check(lbMean, 2.85, 6, 'library mean');
export const PH_X = [0, 1, 2, 3, 4];
export const PH_F = [6, 10, 12, 8, 4];
export const phMed = medianDiscrete(PH_X, PH_F);
export const phMode = modeDiscrete(PH_X, PH_F);
check(sum(PH_F), 40, 0, 'Phoolbagh households');
check(phMed.median, 2, 6, 'Phoolbagh median');
check(phMode, 2, 6, 'Phoolbagh mode');
export const MG = [[200, 250, 3], [250, 300, 8], [300, 350, 14], [350, 400, 12], [400, 450, 3]];
export const mgMode = modeGrouped(MG);
check(fN(MG), 40, 0, 'mangoes');
check(mgMode.mode, 337.5, 6, 'mango mode');
export const ORB = [24, 25, 26, 26, 27, 28, 29, 30, 100];
check(mean(ORB), 35, 6, 'Orbit mean');
check(median(ORB), 27, 6, 'Orbit median');
export const HP = [30, 32, 35, 38, 215];
check(mean(HP), 70, 6, 'lane mean');
check(median(HP), 35, 6, 'lane median');
export const M8 = [11, 15, 18, 22, 26, 30, 34, 45];
check(median(M8), 24, 6, 'eight-value median');
export const M5 = [8, 10, 12, 14, 16];
check(mean(M5) + 5, 17, 6, 'mean after adding 5');
export const D5 = [12, 15, 9, 18, 6];
check(mean(D5), 12, 6, 'five-value mean');
check(sum(D5.map((x) => x - mean(D5))), 0, 6, 'five-value deviations');

// ================================================================ t01 Arithmetic mean
Q('m_avg_meaning', mcq({
  t: 1, d: 1, c: 'recall',
  stem: `A statistician says that the average weekly wage of the workers of the imagined Tarapur Cable Works is Rs ${wMean}. In statistics an average is`,
  opts: ['a single value that represents the whole set of data', 'the largest value in the data', 'the difference between the largest and the smallest value', 'the number of observations in the data'],
  sol: 'An average sums up a whole distribution in one representative value that lies near its centre. The largest value, the range and the count of observations do not represent the group as a whole.',
}));
Q('m_mean_def', mcq({
  t: 1, d: 1, c: 'recall',
  stem: `The imagined Kaladhar hill station recorded rainfall of ${J(KAL)} millimetres over ${KAL.length} days. The arithmetic mean of these observations is obtained by`,
  opts: ['dividing the sum of the observations by their number', 'dividing the largest observation by the number of observations', 'taking the value in the middle after arranging them in order', 'taking the value that occurs most often'],
  sol: 'The arithmetic mean is the sum of all observations divided by how many there are. Taking the middle value gives the median, and the most frequent value is the mode.',
}));
Q('m_assumed_formula', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'For an individual series with an assumed mean A, deviations d = X − A and N observations, the arithmetic mean by the assumed-mean method is',
  opts: ['A + Σd / N', 'A − Σd / N', 'A × Σd / N', 'Σd / (A × N)'],
  sol: 'Each X is A + d, so the sum of X is N times A plus Σd, and dividing by N gives A + Σd / N. The other expressions do not reduce to ΣX / N.',
}));
Q('m_step_formula', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'In the step-deviation method for a continuous series with assumed mean A, class width h and d′ = (m − A) / h, the mean is',
  opts: ['A + (Σfd′ / Σf) × h', 'A + Σfd′ / Σf', 'A + (Σfd′ × h) / A', 'h + (Σfd′ / Σf) × A'],
  sol: 'Because d′ was divided by h, the average of d′ must be multiplied back by h before it is added to A. Leaving out h, or swapping the roles of h and A, gives a wrong mean.',
}));
Q('m_dev_zero', mcq({
  t: 1, d: 3, c: 'application',
  stem: `The mean of the five weekly sales ${J(D5)} (in crates) of an imagined fruit stall is ${mean(D5)}. The sum of the deviations of these five values from their mean is`,
  opts: ['zero', `${mean(D5)}`, `${sum(D5)}`, 'negative'],
  sol: `The deviations are ${J(D5.map((x) => x - mean(D5)))}; the positive and negative ones cancel and add to 0, which is true of every series. ${mean(D5)} is the mean itself and ${sum(D5)} is the sum of the observations, not of the deviations.`,
}));
Q('m_extreme_mean', mcq({
  t: 1, d: 3, c: 'application',
  stem: `The monthly incomes of seven families of the imagined Chandanpur hamlet are ${J(INC)} thousand rupees. Which statement about the arithmetic mean is correct?`,
  opts: [`It is ${incMean} thousand, pulled up by the one very high income`, `It is ${incMed} thousand, the middle income`, `It is ${incMean6} thousand, the same as without the highest income`, `It cannot be calculated for such unequal incomes`],
  sol: `The mean uses every value: ${sum(INC)} ÷ ${INC.length} = ${incMean}. The ${incMed} thousand figure is the median, ${incMean6} would be the mean only if the highest income were dropped, and a mean can be found for any numerical data.`,
}));
Q('m_classmark', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'To find the mean of a continuous series by the direct method for the imagined Vidyamandir Evening School, the value taken to represent the class 40 to 50 is',
  opts: [`${(40 + 50) / 2}, the class mark`, '40, the lower limit', '50, the upper limit', '10, the class width'],
  sol: 'Every item of a class is taken to be at its mid-point, the class mark, which is (lower limit + upper limit) ÷ 2. Using a limit or the width would shift the mean wrongly.',
}));
Q('m_weighted_when', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: 'A weighted arithmetic mean is preferred to the simple mean when',
  opts: ['the items in the data differ in importance', 'the data have an even number of items', 'the data contain a repeated value', 'the data are written in class intervals'],
  sol: 'Weights express the relative importance of the items, as when a subject carries more marks or a price matters more in a household basket. Even counts, repeated values and class intervals do not call for weights.',
}));
Q('m_open_end', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: 'The wages of workers of an imagined firm are grouped in classes that end with an open class, Rs 1,000 and above. The arithmetic mean cannot be found exactly because',
  opts: ['the class mark of the open class cannot be calculated without assuming a limit', 'the mean can be found only when every class has a frequency of at least ten', 'open classes always have zero frequency', 'the mean needs the items to be in ascending order'],
  sol: 'The mean needs a class mark for every class, and an open class has no upper limit, so one would have to be assumed. Frequencies and ordering are not the difficulty here.',
}));
Q('m_mean_shift', mcq({
  t: 1, d: 3, c: 'application',
  stem: `The daily sales of an imagined tea stall on five days are ${J(M5)} cups, with a mean of ${mean(M5)}. If each day's sale were 5 cups more, the new mean would be`,
  opts: [`${mean(M5) + 5}`, `${mean(M5)}`, `${mean(M5) * 5}`, `${sum(M5) + 5}`],
  sol: `Adding a constant to every observation adds the same constant to the mean: ${mean(M5)} + 5 = ${mean(M5) + 5}. The mean does not stay the same, is not multiplied by 5, and ${sum(M5) + 5} confuses the sum with the mean.`,
}));
Q('m_assumed_why', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'The assumed-mean method is preferred to the direct method for a series with large values mainly because',
  opts: ['it reduces the size of the numbers to be multiplied and added', 'it gives a more accurate mean than the direct method', 'it avoids the use of frequencies', 'it can be used only for large data'],
  sol: 'Deviations from a convenient A are small, so the arithmetic is lighter, but the result is exactly the same as by the direct method. It does not give a different or more accurate mean, and frequencies are still used.',
}));

// ================================================================ t02 Median and mode
Q('m_median_def', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'The median of the monthly marks of the learners of an imagined class, after the marks are arranged in order, is',
  opts: ['the middle value, which divides the series into two equal parts', 'the sum of the marks divided by the number of learners', 'the mark obtained by the largest number of learners', 'the difference between the highest and the lowest marks'],
  sol: 'The median is the middle item of an arranged series, with half the items on either side. The other three descriptions are the mean, the mode and the range.',
}));
Q('m_median_pos', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'The weekly wages of 31 workers of an imagined mill are arranged in ascending order. The median is the value of the',
  opts: [`${(31 + 1) / 2}th item`, `${31 / 2}th item`, '31st item', `${(31 + 1) / 4}th item`],
  sol: `For an odd number of items the median is the ((N + 1) ÷ 2)th item, that is (31 + 1) ÷ 2 = ${(31 + 1) / 2}. Half of 31 is not a whole item number, 31st is the largest item, and a quarter point is not the median.`,
}));
Q('m_median_even', mcq({
  t: 2, d: 3, c: 'application',
  stem: `The ages (years) of eight members of the imagined Green Park Cycling Club, arranged in order, are ${J(M8)}. The median age is`,
  opts: [`${median(M8)} years`, `${M8[3]} years`, `${M8[4]} years`, `${rnd(mean(M8), 2)} years`],
  sol: `With eight items the median is the average of the 4th and 5th items: (${M8[3]} + ${M8[4]}) ÷ 2 = ${median(M8)}. Taking only the 4th or only the 5th item is incomplete, and ${rnd(mean(M8), 2)} is the mean.`,
}));
Q('m_cf_use', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'To find the median size from a discrete series of shoe sizes and the number of pairs sold in the imagined Rapid Footwear Mart, the most helpful column to add is the',
  opts: ['cumulative frequency', 'product of size and frequency', 'class mark', 'difference of successive frequencies'],
  sol: 'The cumulative frequency tells which size contains the middle item. The product of size and frequency is used for the mean, a class mark belongs to continuous series, and differences of frequencies help in locating the mode of classes.',
}));
Q('m_median_cont', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: 'In the formula Median = L + ((N / 2 − c.f.) / f) × h for a continuous series, c.f. stands for',
  opts: ['the cumulative frequency of the class before the median class', 'the cumulative frequency of the median class itself', 'the frequency of the median class', 'the class factor, the same as the class width'],
  sol: 'The median class is found where the cumulative frequency first reaches N / 2, and c.f. is the total of the frequencies of all classes before it. The frequency of the median class is f, and h is the class width.',
}));
Q('m_median_robust', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: `The weekly sales (crates) of five imagined stalls are ${J(STALL)}. If the last stall's sale is recorded wrongly as 160, which measure stays at ${median(STALL_X)}?`,
  opts: ['the median', 'the arithmetic mean', 'the sum of the sales', 'the average of the smallest and the largest sale'],
  sol: `The median depends on the position of the middle item, which is the third, and the extreme value does not change its position, so it stays ${median(STALL_X)}. The mean moves from ${mean(STALL)} to ${mean(STALL_X)}, and the sum and the average of the extremes also change.`,
}));
Q('m_mode_def', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'In a record of the shoe sizes bought from the imagined Step-Up Footwear in one day, the mode is the',
  opts: ['size that occurs most frequently', 'average of all the sizes', 'middle size after arranging in order', 'difference between the largest and the smallest size'],
  sol: 'The mode is the most frequently occurring value. The average is the mean, the middle value is the median, and the difference of extremes is the range.',
}));
Q('m_mode_shoe', mcq({
  t: 2, d: 2, c: 'application',
  stem: `The imagined Step-Up Footwear owner wants to order most pairs in the size that sells best. The sizes sold in one hour are ${J(SHOE_HR)}. She should order for the size`,
  opts: [`${shoeHrMode}, the mode`, `${rnd(mean(SHOE_HR), 2)}, the mean`, `${median(SHOE_HR)}, the median`, `${Math.max(...SHOE_HR)}, the largest`],
  sol: `The size sold most often, ${shoeHrMode}, is the mode, and it is the right guide for stocking. A mean of ${rnd(mean(SHOE_HR), 2)} is not even a size that exists, and the largest size is the least useful guide.`,
}));
Q('m_modal_class', mcq({
  t: 2, d: 3, c: 'application',
  stem: `The mango weights (grams) of the imagined Maple Orchard are grouped as ${ser(MG)}. The modal class is`,
  opts: [`${MG[2][0]} to ${MG[2][1]}`, `${MG[3][0]} to ${MG[3][1]}`, `${MG[1][0]} to ${MG[1][1]}`, `${MG[0][0]} to ${MG[0][1]}`],
  sol: `The modal class is the class with the highest frequency, ${MG[2][2]} here, which is ${MG[2][0]} to ${MG[2][1]}. The ${MG[3][0]} to ${MG[3][1]} class has ${MG[3][2]} mangoes and the others have fewer.`,
}));
Q('m_d1d2', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: 'In the formula Mode = L + (D1 / (D1 + D2)) × h for a continuous series with equal classes, D1 is',
  opts: ['the frequency of the modal class minus the frequency of the class before it', 'the frequency of the modal class minus the frequency of the class after it', 'the frequency of the modal class itself', 'the width of the modal class'],
  sol: 'D1 = f1 − f0, taking the modal class frequency less that of the preceding class. D2 is the same with the following class, and h is the class width.',
}));
Q('m_choose_income', mcq({
  t: 2, d: 3, c: 'evaluation',
  stem: `A report on the incomes of seven families of the imagined Chandanpur hamlet, ${J(INC)} thousand rupees, has to state a typical income. The best choice is`,
  opts: [`the median, ${incMed} thousand, because one very high income distorts the mean`, `the mean, ${incMean} thousand, because it uses every value`, `the mode, because every income occurs only once`, 'the largest income, since it shows the maximum earnings'],
  sol: `With one extreme income, the median ${incMed} stays near what most families earn while the mean ${incMean} is dragged upward. The mode does not exist, and the largest income is not typical.`,
}));
Q('m_ogive_med', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: `The less than and more than ogives of the weekly wages of the 50 workers of the imagined Tarapur Cable Works are drawn on one graph. At the point where they cross, the cumulative frequency is`,
  opts: [`${wN / 2}, which is N / 2`, `${wN}, which is N`, `${wN + 1}, which is N + 1`, 'zero'],
  sol: `At the median, half the items lie below and half above, so each ogive reads N / 2 = ${wN / 2}. A reading of ${wN} is the top of the less than curve, and the curves never read ${wN + 1} or zero at their crossing.`,
}));
Q('m_mode_graph', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: 'To locate the mode of a continuous series from its histogram, the two lines drawn from the modal bar meet. The mode is read',
  opts: ['on the horizontal axis directly below their meeting point', 'on the vertical axis across from their meeting point', 'at the top of the tallest bar', 'at the midpoint of the base of the modal bar'],
  sol: 'The vertical line from the meeting point of the two joining lines cuts the horizontal axis at the mode. The vertical axis shows frequency, the top of the bar shows only the modal frequency, and the midpoint of the base would ignore the neighbouring bars.',
}));

// ---- assertion-reason
Q('ar_median_pos', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'The median of a series is not changed when its largest value is replaced by a much larger one.',
  r: 'The median is a positional average, determined by the middle item of the arranged series and not by the size of the extreme values.',
  sol: 'Both are true and R explains A. The middle position is the same after the largest value grows, so the median is untouched.',
}));
Q('ar_mean_extreme', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'The arithmetic mean is affected by extreme values.',
  r: 'The algebraic sum of the deviations of the observations from their mean is zero.',
  sol: 'Both statements are true, but R is not the reason for A. The mean moves with extreme values because it is computed from every value, whereas the zero sum of deviations is a separate property that holds for any data.',
}));
Q('ar_mode_cum', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'A-true-R-false',
  a: 'The mode of a discrete series is the value with the highest frequency.',
  r: 'The mode of a discrete series is found from the cumulative frequencies.',
  sol: 'A is true. R is false, because cumulative frequencies are used to locate the median; the mode is read directly from the frequency column.',
}));
Q('ar_weighted', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'A-false-R-true',
  a: 'The weighted arithmetic mean of marks always equals the simple mean of the marks.',
  r: 'In the weighted mean each value is multiplied by its weight before the products are added and divided by the total of the weights.',
  sol: `A is false: when the weights differ, the two means differ, as for a learner whose weighted mean is ${meeraW} and simple mean is ${meeraS}. R correctly describes the weighted mean and shows why the two usually differ.`,
}));
Q('ar_mode_shoe', ar({
  t: 2, d: 2, c: 'understanding', verdict: 'both-true-explains',
  a: 'A shopkeeper who wants to stock the most popular shoe size should use the mode.',
  r: 'The mode is the value that occurs most frequently in the data.',
  sol: 'Both are true and R explains A. The most frequent size is the one customers buy most, so it is the guide for stocking.',
}));

// ---- true-false, fill-blank, match, ordering
Q('tf_median_even', tf({
  t: 2, d: 3, c: 'understanding', ans: false,
  stem: `True or false? For the six sales ${J(EV6)} of an imagined bakery, the median must be one of the six sales figures.`,
  sol: `Arranged, the figures are ${J([...EV6].sort((a, b) => a - b))}; with six items the median is the average of the 3rd and 4th, ${ev6Med}, which is not one of the figures.`,
}));
Q('tf_dev_zero', tf({
  t: 1, d: 2, c: 'application', ans: true,
  stem: `True or false? For the four daily takings ${J(Z4)} (hundreds of rupees) of an imagined juice cart, the deviations from the mean add up to zero.`,
  sol: `The mean is ${z4Mean} and the deviations are ${J(z4Dev)}, whose sum is ${sum(z4Dev)}, so the statement is true.`,
}));
Q('tf_one_mode', tf({
  t: 2, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? Every series of observations has exactly one mode.',
  sol: 'A series can have two modes when two values share the highest frequency, and it has none when no value is repeated.',
}));
Q('fb_mean_def', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'The arithmetic mean is found by dividing the ___ of all the observations by their ___.',
  acc: [['sum', 'total'], ['number', 'count', 'number of observations']],
  sol: 'The mean equals the sum of the observations divided by their number.',
}));
Q('fb_step_h', fb({
  t: 1, d: 2, c: 'recall',
  stem: 'In the step-deviation method the deviation of a class mark is divided by the ___ of the classes to get d′.',
  acc: [['width', 'class width', 'class interval', 'size']],
  sol: 'The common width h of the classes is the divisor in d′ = (m − A) ÷ h, and the final result is multiplied by the same width.',
}));
Q('mt_averages', match({
  t: 2, d: 2, c: 'understanding',
  stem: 'Match each average with how it is described.',
  pairs: [
    ['Arithmetic mean', 'Sum of the observations divided by their number'],
    ['Median', 'Middle value of the arranged series'],
    ['Mode', 'Most frequently occurring value'],
    ['Weighted mean', 'Mean in which items count according to their importance'],
  ],
  sol: 'The mean is the sum over the count, the median is the central value, the mode is the commonest value and the weighted mean attaches weights.',
}));
Q('mt_situation', match({
  t: 2, d: 3, c: 'application',
  stem: 'Match each imagined situation with the most suitable average.',
  pairs: [
    ['Typical family income in a hamlet where one family is very rich', 'Median'],
    ['Shoe size to stock in the largest number', 'Mode'],
    ['Overall performance of a class on one test, using every score', 'Arithmetic mean'],
    ['Overall result of a learner whose subjects carry different marks', 'Weighted mean'],
  ],
  sol: 'An extreme income calls for the median, a most popular item calls for the mode, scores of a class suit the mean, and unequal subject marks need a weighted mean.',
}));
Q('ord_median_cont', ord({
  t: 2, d: 3, c: 'application', marks: 2,
  stem: 'Arrange the steps of finding the median of a continuous series of the daily milk deliveries of an imagined dairy.',
  items: [
    'Add the frequencies successively to form the cumulative frequencies',
    'Find N / 2, half the total frequency',
    'Pick the first class whose cumulative frequency is N / 2 or more as the median class',
    'Substitute L, c.f., f and h in the median formula',
  ],
  sol: 'Cumulative frequencies come first, then half the total; the median class follows from them and the formula is applied last.',
}));
Q('ord_assumed', ord({
  t: 1, d: 3, c: 'application', marks: 2,
  stem: 'Arrange the steps of finding the mean of the daily sales of an imagined tea stall by the assumed-mean method.',
  items: [
    'Choose a convenient assumed mean A',
    'Find the deviation d = X − A for every observation',
    'Add the deviations to get Σd',
    'Compute A + Σd / N',
  ],
  sol: 'A must be chosen before deviations can be found, and the deviations must be added before the formula can be used.',
}));

// ---- numerical
Q('n_kal_mean', num({
  t: 1, d: 2, c: 'application', value: rnd(kalMean, 2), unit: 'millimetres', tol: 0.01,
  stem: `The rainfall (mm) recorded on ${KAL.length} days at the imagined Kaladhar hill station was ${J(KAL)}. Find the arithmetic mean daily rainfall by the direct method.`,
  sol: `Step 1: Σ X = ${KAL.join(' + ')} = ${sum(KAL)}.\nStep 2: Mean = ${sum(KAL)} ÷ ${KAL.length} = ${S(kalMean)} millimetres.`,
}));
Q('n_kal_sumd', num({
  t: 1, d: 3, c: 'application', value: sum(kalD), unit: null,
  stem: `For the Kaladhar rainfall (mm) ${J(KAL)}, an assumed mean of 10 is taken and d = X − 10. Find Σd.`,
  sol: `Step 1: The deviations are ${J(kalD)}.\nStep 2: Σd = ${sum(kalD)}. The mean is then 10 + (${sum(kalD)}) ÷ ${KAL.length} = ${S(10 + sum(kalD) / KAL.length)}.`,
}));
Q('n_quiz_mean', num({
  t: 1, d: 3, c: 'application', value: rnd(qzMean, 2), unit: 'marks', tol: 0.01,
  stem: `${qzN} pupils of the imagined Lotus Public School scored the following marks out of 10 in a quiz (marks: number of pupils): ${dis(QZ_X, QZ_F)}. Find the mean mark.`,
  sol: `Step 1: Σf = ${qzN} and ΣfX = ${J(QZ_X.map((x, i) => x * QZ_F[i]))} added = ${sum(QZ_X.map((x, i) => x * QZ_F[i]))}.\nStep 2: Mean = ${sum(QZ_X.map((x, i) => x * QZ_F[i]))} ÷ ${qzN} = ${S(qzMean)} marks.`,
}));
Q('n_marks_step', num({
  t: 1, d: 3, c: 'application', value: rnd(mkSt.mean, 2), unit: 'marks', tol: 0.01,
  stem: `The marks out of 80 of ${mkN} learners of the imagined Vidyamandir Evening School are grouped as ${ser(MK)}. Using the step-deviation method with A = 45 and h = 10, find the mean mark.`,
  sol: `Step 1: d′ = ${J(mkSt.d)} and fd′ = ${J(mkSt.fd)}, so Σfd′ = ${mkSt.sumFd}.\nStep 2: Mean = 45 + (${mkSt.sumFd} ÷ ${mkSt.sumF}) × 10 = ${S(mkSt.mean)} marks.`,
}));
Q('n_dairy_mean', num({
  t: 1, d: 3, c: 'application', value: rnd(dyMean, 2), unit: 'litres', tol: 0.01,
  stem: `The daily milk (litres) delivered by ${dyN} farmers to the imagined Anandpur Dairy Cooperative is grouped as ${ser(DY)}. Find the mean quantity delivered by the direct method.`,
  sol: `Step 1: Class marks ${J(dyM)}; Σfm = ${sum(DY.map((c, i) => c[2] * dyM[i]))}; Σf = ${dyN}.\nStep 2: Mean = ${sum(DY.map((c, i) => c[2] * dyM[i]))} ÷ ${dyN} = ${S(dyMean)} litres.`,
}));
Q('n_wtd_arjun', num({
  t: 1, d: 3, c: 'application', value: rnd(arjunW, 2), unit: 'marks', tol: 0.01,
  stem: `A school counts Mathematics, Science, English and Hindi with weights ${J(WT_W)}. The imagined learner Arjun scored ${J(ARJUN)} in these subjects. Find his weighted mean mark.`,
  sol: `Step 1: ΣWX = ${ARJUN.map((x, i) => `${x}×${WT_W[i]}`).join(' + ')} = ${sum(ARJUN.map((x, i) => x * WT_W[i]))} and ΣW = ${sum(WT_W)}.\nStep 2: Weighted mean = ${sum(ARJUN.map((x, i) => x * WT_W[i]))} ÷ ${sum(WT_W)} = ${S(arjunW)} marks.`,
}));
Q('n_basket', num({
  t: 1, d: 4, c: 'application', value: rnd(basW, 2), unit: null, tol: 0.01,
  stem: `In the imagined town of Sundarpur the price relatives of four groups in a household basket are ${BAS_N.map((n, i) => `${n.toLowerCase()} ${BAS_R[i]}`).join(', ')}, with weights ${J(BAS_W)} respectively. Find the weighted arithmetic mean of the relatives.`,
  sol: `Step 1: ΣWX = ${BAS_R.map((x, i) => `${x}×${BAS_W[i]}`).join(' + ')} = ${sum(BAS_R.map((x, i) => x * BAS_W[i]))}; ΣW = ${sum(BAS_W)}.\nStep 2: Weighted mean = ${sum(BAS_R.map((x, i) => x * BAS_W[i]))} ÷ ${sum(BAS_W)} = ${S(basW)}.`,
}));
Q('n_corrected', num({
  t: 1, d: 4, c: 'application', value: rnd(w25Fix, 2), unit: 'rupees', tol: 0.01,
  stem: `The mean daily wage of ${W25.n} workers of the imagined Mehta Spinning Mill was worked out as Rs ${W25.mean}. Later it was found that one wage was entered as Rs ${W25.wrong} instead of Rs ${W25.right}. Find the correct mean wage.`,
  sol: `Step 1: Wrong total = ${W25.n} × ${W25.mean} = ${W25.n * W25.mean}.\nStep 2: Correct total = ${W25.n * W25.mean} − ${W25.wrong} + ${W25.right} = ${W25.n * W25.mean - W25.wrong + W25.right}.\nStep 3: Correct mean = ${W25.n * W25.mean - W25.wrong + W25.right} ÷ ${W25.n} = ${S(w25Fix)} rupees.`,
}));
Q('n_missing', num({
  t: 1, d: 4, c: 'application', value: missing, unit: null,
  stem: `The mean of six daily takings (in hundreds of rupees) of an imagined sweet shop is ${MISS.mean}. Five of them are ${J(MISS.known)}. Find the sixth.`,
  sol: `Step 1: Total of six = ${MISS.mean} × 6 = ${MISS.mean * 6}.\nStep 2: Sixth = ${MISS.mean * 6} − ${sum(MISS.known)} = ${missing}.`,
}));
Q('n_rain_median', num({
  t: 2, d: 3, c: 'application', value: median(NG_FIX), unit: 'millimetres', tol: 0.01,
  stem: `The rainfall (mm) at the imagined Neelgiri hill station on ten days was ${J(NG_FIX)}. Find the median rainfall.`,
  sol: `Step 1: Arranged: ${J([...NG_FIX].sort((a, b) => a - b))}.\nStep 2: N = 10, so the median is the average of the 5th and 6th items: (${[...NG_FIX].sort((a, b) => a - b)[4]} + ${[...NG_FIX].sort((a, b) => a - b)[5]}) ÷ 2 = ${median(NG_FIX)} millimetres.`,
}));
Q('n_quiz_median', num({
  t: 2, d: 3, c: 'application', value: qzMed.median, unit: 'marks', tol: 0.01,
  stem: `The quiz marks out of 10 of the imagined Lotus Public School pupils are (marks: pupils) ${dis(QZ_X, QZ_F)}. Find the median mark.`,
  sol: `Step 1: Cumulative frequencies ${J(qzMed.cf)}; N = ${qzMed.N}, so the median lies between the ${Math.floor(qzMed.pos)}th and ${Math.ceil(qzMed.pos)}th items.\nStep 2: The ${Math.floor(qzMed.pos)}th item is ${QZ_X[2]} (cumulative frequency ${qzMed.cf[2]}) and the ${Math.ceil(qzMed.pos)}th is ${QZ_X[3]}, so the median = (${QZ_X[2]} + ${QZ_X[3]}) ÷ 2 = ${qzMed.median} marks.`,
}));
Q('n_marks_median', num({
  t: 2, d: 4, c: 'application', value: rnd(mkMed.median, 2), unit: 'marks', tol: 0.01,
  stem: `The marks out of 80 of ${mkN} learners of the imagined Vidyamandir Evening School are grouped as ${ser(MK)}. Find the median mark.`,
  sol: `Step 1: N ÷ 2 = ${mkN / 2}; cumulative frequencies ${J(cumulative(MK.map((c) => c[2])))}, so the median class is ${mkMed.L} to ${mkMed.L + mkMed.h}, with c.f. = ${mkMed.cf} and f = ${mkMed.f}.\nStep 2: Median = ${mkMed.L} + (${mkN / 2} − ${mkMed.cf}) ÷ ${mkMed.f} × ${mkMed.h} = ${S(mkMed.median)} marks.`,
}));
Q('n_dairy_mode', num({
  t: 2, d: 4, c: 'application', value: rnd(dyMode.mode, 2), unit: 'litres', tol: 0.01,
  stem: `The imagined Anandpur Dairy Cooperative lists its ${dyN} farmers by the litres supplied in a day: ${DY.map((c) => `${c[2]} farmers supplied ${c[0]}–${c[1]} litres`).join(', ')}. Calculate the modal quantity.`,
  sol: `Step 1: The modal class is ${dyMode.L} to ${dyMode.L + dyMode.h} (f1 = ${dyMode.f1}), with f0 = ${dyMode.f0} and f2 = ${dyMode.f2}; D1 = ${dyMode.D1}, D2 = ${dyMode.D2}.\nStep 2: Mode = ${dyMode.L} + ${dyMode.D1} ÷ (${dyMode.D1} + ${dyMode.D2}) × ${dyMode.h} = ${S(dyMode.mode)} litres.`,
}));

// ---- short 2-mark
Q('s2_avg', short({
  t: 1, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'What is meant by an average? Why are averages called measures of central tendency?',
  model: 'An **average** is one representative figure that sums up an entire distribution. Because the items of a series tend to cluster around a central figure, such averages are known as **measures of central tendency**.',
  sol: 'Definition of an average and the reason for the name.',
  scheme: [['Average defined as a representative value', 1], ['Reason for the name central tendency', 1]],
}));
Q('s2_mean_def', short({
  t: 1, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'Define the arithmetic mean and write its formula for an individual series by the direct method and by the assumed-mean method.',
  model: 'The **arithmetic mean** is found by adding up every observation and dividing the total by how many there are. Direct method: X̄ = ΣX / N. Assumed-mean method: X̄ = A + Σd / N, where d = X − A and A is the assumed mean.',
  sol: 'Definition and both formulae.',
  scheme: [['Definition', 1], ['Both formulae', 1]],
}));
Q('s2_zero', short({
  t: 1, d: 3, c: 'application', marks: 2, wl: S2,
  stem: `Show that the deviations of the four daily takings ${J(Z4)} of an imagined bangle stall from their mean add up to zero.`,
  model: `The mean is ${sum(Z4)} ÷ ${Z4.length} = ${z4Mean}. The deviations are ${J(z4Dev)}. Their sum is ${z4Dev.filter((d) => d < 0).join(' ')} + ${z4Dev.filter((d) => d > 0).join(' + ')} = **${sum(z4Dev)}**, so the deviations from the mean cancel.`,
  sol: `Mean ${z4Mean}; deviations ${J(z4Dev)}; sum ${sum(z4Dev)}.`,
  scheme: [['Mean computed', 1], ['Deviations added to zero', 1]],
}));
Q('s2_extreme', short({
  t: 1, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: `The mean sale of five imagined fruit stalls is ${mean(STALL)} crates when their sales are ${J(STALL)}. Show what happens to the mean if the last sale is wrongly entered as 160, and state the property this shows.`,
  model: `With 160 the total becomes ${sum(STALL_X)} and the mean ${sum(STALL_X)} ÷ ${STALL_X.length} = **${mean(STALL_X)}**, up from ${mean(STALL)}. One extreme value moves the mean a lot: the arithmetic mean is affected by extreme values.`,
  sol: `Mean rises from ${mean(STALL)} to ${mean(STALL_X)}.`,
  scheme: [['New mean computed', 1], ['Property stated', 1]],
}));
Q('s2_weighted_why', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Why is a weighted arithmetic mean used for the overall result of a learner whose subjects carry different marks? Write its formula.',
  model: 'Subjects of unequal importance should not count equally, so each mark is multiplied by its **weight**. The weighted mean is X̄w = ΣWX / ΣW, where W is the weight and X the mark.',
  sol: 'Reason and formula.',
  scheme: [['Reason: unequal importance', 1], ['Formula ΣWX / ΣW', 1]],
}));
Q('s2_median_def', short({
  t: 2, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'Define the median. Why is it called a positional average?',
  model: 'The **median** is the middle value of a series arranged in order, which divides it into two equal parts. It is a **positional average** because it is fixed by the position of the middle item, not by the sizes of all the values.',
  sol: 'Definition and why it is positional.',
  scheme: [['Median defined', 1], ['Positional reason', 1]],
}));
Q('s2_median_even', short({
  t: 2, d: 3, c: 'application', marks: 2, wl: S2,
  stem: `The monthly sales (thousand rupees) of six outlets of an imagined bakery chain are ${J(EV6)}. Find the median.`,
  model: `Arranged: ${J([...EV6].sort((a, b) => a - b))}. With N = 6 the median is the average of the 3rd and 4th items: (${[...EV6].sort((a, b) => a - b)[2]} + ${[...EV6].sort((a, b) => a - b)[3]}) ÷ 2 = **${ev6Med}** thousand rupees.`,
  sol: `Median ${ev6Med}.`,
  scheme: [['Arranged in order', 1], ['Average of the two middle items', 1]],
}));
Q('s2_mode_def', short({
  t: 2, d: 2, c: 'application', marks: 2, wl: S2,
  stem: `Define the mode and find it for the shoe sizes ${J(SHOE_HR)} sold at a counter of the imagined Step-Up Footwear in one hour.`,
  model: `The **mode** is the value that occurs most frequently. Size ${shoeHrMode} occurs ${SHOE_HR.filter((x) => x === shoeHrMode).length} times, more than any other size, so the mode is **${shoeHrMode}**.`,
  sol: `Mode ${shoeHrMode}, occurring ${SHOE_HR.filter((x) => x === shoeHrMode).length} times.`,
  scheme: [['Mode defined', 1], ['Mode found', 1]],
}));
Q('s2_d1d2', short({
  t: 2, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'Write the formula for the mode of a continuous series with equal classes and say what D1 and D2 stand for.',
  model: 'Mode = L + (D1 / (D1 + D2)) × h, where L is the lower limit of the modal class and h its width. **D1 = f1 − f0** and **D2 = f1 − f2**, where f1 is the modal frequency and f0, f2 are those of the preceding and following classes.',
  sol: 'Formula and meaning of D1 and D2.',
  scheme: [['Formula', 1], ['D1 and D2 explained', 1]],
}));
Q('s2_merits', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State one merit and one demerit of the arithmetic mean.',
  model: 'Merit: it is easy to understand and calculate, and it uses every observation in the data, so it is the most widely used average. Demerit: it is affected by extreme values, and it cannot be found exactly when a class is open-ended.',
  sol: 'One merit and one demerit.',
  scheme: [['One merit', 1], ['One demerit', 1]],
}));

// ---- short 3-mark
Q('s3_assumed', short({
  t: 1, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `The daily sales of an imagined tea stall over five days were ${J(TEA)} cups. Find the mean by the assumed-mean method, taking A = ${teaA}.`,
  model: `Deviations d = X − ${teaA}: ${J(teaD)}, so Σd = **${sum(teaD)}**. Mean = A + Σd / N = ${teaA} + (${sum(teaD)}) ÷ ${TEA.length} = **${teaMean} cups**, the same as ${sum(TEA)} ÷ ${TEA.length} by the direct method.`,
  sol: `Σd = ${sum(teaD)}; mean ${teaMean}.`,
  scheme: [['Deviations from A', 1], ['Σd', 1], ['Mean from the formula', 1]],
}));
Q('s3_discrete_mean', short({
  t: 1, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `${sum(LB_F)} members of the imagined Kamal Library were asked how many books they borrowed last month (books: members): ${dis(LB_X, LB_F)}. Find the mean number of books borrowed.`,
  model: `Multiply each number of books by the number of members who borrowed that many: ΣfX = ${LB_X.map((x, i) => `${x}×${LB_F[i]}`).join(' + ')} = **${sum(LB_X.map((x, i) => x * LB_F[i]))}**. The total number of members is Σf = **${sum(LB_F)}**. Mean = ΣfX / Σf = ${sum(LB_X.map((x, i) => x * LB_F[i]))} ÷ ${sum(LB_F)} = **${lbMean} books** per member, borrowed in the month.`,
  sol: `Mean ${lbMean}.`,
  scheme: [['Products fX', 1], ['ΣfX and Σf', 1], ['Mean', 1]],
}));
Q('s3_median_disc', short({
  t: 2, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `${sum(PH_F)} households of the imagined Phoolbagh colony own the following numbers of two-wheelers (number: households): ${dis(PH_X, PH_F)}. Find the median using cumulative frequencies.`,
  model: `Cumulative frequencies: ${J(phMed.cf)}. N = ${phMed.N}, so the median is the average of the ${Math.floor(phMed.pos)}th and ${Math.ceil(phMed.pos)}th items, with position (N + 1) ÷ 2 = ${phMed.pos}. Both items fall where the cumulative frequency reaches ${phMed.cf[2]}, the value **${phMed.median}**, so the median is ${phMed.median} two-wheelers.`,
  sol: `Median ${phMed.median}.`,
  scheme: [['Cumulative frequencies', 1], ['Median position', 1], ['Median value', 1]],
}));
Q('s3_modal', short({
  t: 2, d: 4, c: 'application', marks: 3, wl: S3,
  stem: `The weights (grams) of ${fN(MG)} mangoes of the imagined Maple Orchard are grouped as ${ser(MG)}. Find the mode.`,
  model: `The modal class is ${mgMode.L} to ${mgMode.L + mgMode.h} (f1 = ${mgMode.f1}), with f0 = ${mgMode.f0} and f2 = ${mgMode.f2}, so D1 = **${mgMode.D1}** and D2 = **${mgMode.D2}**. Mode = ${mgMode.L} + ${mgMode.D1} ÷ (${mgMode.D1} + ${mgMode.D2}) × ${mgMode.h} = **${mgMode.mode} grams**.`,
  sol: `Modal class ${mgMode.L} to ${mgMode.L + mgMode.h}; mode ${mgMode.mode}.`,
  scheme: [['Modal class identified', 1], ['D1 and D2', 1], ['Mode from the formula', 1]],
}));
Q('s3_compare', short({
  t: 2, d: 4, c: 'evaluation', marks: 3, wl: S3,
  stem: `The monthly salaries (thousand rupees) of nine employees of the imagined Orbit Software are ${J(ORB)}. Compute the mean and the median and say which is the better description of a typical salary.`,
  model: `Mean = ${sum(ORB)} ÷ ${ORB.length} = **${mean(ORB)}** thousand. The median is the 5th item, **${median(ORB)}** thousand. Eight of the nine employees earn ${median(ORB)} thousand or less, with one very high salary raising the mean, so the **median** describes a typical salary better.`,
  sol: `Mean ${mean(ORB)}, median ${median(ORB)}; median is better.`,
  scheme: [['Mean', 1], ['Median', 1], ['Reasoned choice', 1]],
}));
Q('s3_mm_merits', short({
  t: 2, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'State two merits of the median and one demerit of the mode.',
  model: '**Median:** (1) it is not affected by extreme values; (2) it can be located even from a series with open-ended classes and can be found graphically from ogives. **Mode:** a series may have no mode or more than one mode, and the mode depends on how classes are grouped.',
  sol: 'Two merits of the median, one demerit of the mode.',
  scheme: [['First merit of the median', 1], ['Second merit of the median', 1], ['Demerit of the mode', 1]],
}));

// ---- long 5-mark
Q('l_mean3', long({
  t: 1, d: 4, c: 'application', marks: 5, wl: L5,
  stem: `The ages (years) of the ${agN} visitors of an imagined Sunrise Health Camp are grouped as ${ser(AG)}. Find the mean age by the assumed-mean method with A = 50 and by the step-deviation method, and show that they agree.`,
  model: `Class marks ${J(agM)}. **Assumed mean:** d = m − 50 = ${J(agAs.d)}; fd = ${J(agAs.fd)}; Σfd = **${agAs.sumFd}**. Mean = 50 + ${agAs.sumFd} ÷ ${agN} = **${agAs.mean}**. **Step deviation:** d′ = d ÷ 20 = ${J(agSt.d)}; Σfd′ = **${agSt.sumFd}**. Mean = 50 + (${agSt.sumFd} ÷ ${agN}) × 20 = **${agSt.mean}** years. Both methods agree.`,
  sol: `Σfd = ${agAs.sumFd}, Σfd′ = ${agSt.sumFd}; mean ${agMean} by both.`,
  scheme: [['Class marks', 1], ['Deviations and Σfd', 1], ['Mean by assumed mean', 1], ['d′ and Σfd′', 1], ['Mean by step deviation and agreement', 1]],
}));
Q('l_median_cont', long({
  t: 2, d: 4, c: 'application', marks: 5, wl: L5,
  stem: `The daily milk (litres) delivered by ${dyN} farmers to the imagined Anandpur Dairy Cooperative is grouped as ${ser(DY)}. Find the median quantity, showing the cumulative frequencies, the median class and the formula.`,
  model: `Add the frequencies down the table to get the cumulative frequencies: ${J(dyCum)}. The total is N = ${dyN}, so N ÷ 2 = **${dyN / 2}**. The first cumulative frequency that reaches ${dyN / 2} is ${dyCum[dyMed.cls]}, so the median class is **${dyMed.L} to ${dyMed.L + dyMed.h}**, with L = ${dyMed.L}, c.f. = ${dyMed.cf}, f = ${dyMed.f} and h = ${dyMed.h}. Median = L + ((N/2 − c.f.) ÷ f) × h = ${dyMed.L} + (${dyN / 2} − ${dyMed.cf}) ÷ ${dyMed.f} × ${dyMed.h} = **${S(dyMed.median)} litres**.`,
  sol: `Median class ${dyMed.L} to ${dyMed.L + dyMed.h}; median ${S(dyMed.median)}.`,
  scheme: [['Cumulative frequencies', 1], ['N / 2 and the median class', 1], ['Values of L, c.f., f and h', 1], ['Substitution', 1], ['Median', 1]],
}));
Q('l_mode_cont', long({
  t: 2, d: 4, c: 'application', marks: 5, wl: L5,
  stem: `In a test out of 80 at the imagined Vidyamandir Evening School, ${MK.map((c) => `${c[2]} learners scored ${c[0]}–${c[1]}`).join(', ')}. Find the mode by calculation and explain in brief how it is found from a histogram.`,
  model: `The modal class is **${mkMode.L} to ${mkMode.L + mkMode.h}** (f1 = ${mkMode.f1}); f0 = ${mkMode.f0}, f2 = ${mkMode.f2}, so D1 = **${mkMode.D1}** and D2 = **${mkMode.D2}**. Mode = ${mkMode.L} + ${mkMode.D1} ÷ (${mkMode.D1} + ${mkMode.D2}) × ${mkMode.h} = **${mkMode.mode}** marks. On the histogram, join the top corners of the modal bar to those of its neighbours across; the lines meet above ${mkMode.mode} on the horizontal axis.`,
  sol: `Mode ${mkMode.mode}; read below the meeting point.`,
  scheme: [['Modal class', 1], ['D1 and D2', 1], ['Substitution', 1], ['Mode', 1], ['Graphic method described', 1]],
}));
Q('l_props', long({
  t: 1, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: `The weekly sales (crates) of five imagined fruit stalls are ${J(STALL)}. Using these values, show two properties of the arithmetic mean, one of which concerns the deviations and the other extreme values, using 160 in place of the last value.`,
  model: `Mean = ${sum(STALL)} ÷ ${STALL.length} = **${mean(STALL)}** crates. **Property 1:** the deviations from this mean are ${J(STALL.map((x) => x - mean(STALL)))}; the negative and positive ones cancel and add to **${sum(STALL.map((x) => x - mean(STALL)))}**. **Property 2:** with 160 for the last sale the total becomes ${sum(STALL_X)} and the mean **${mean(STALL_X)}**, a rise of ${mean(STALL_X) - mean(STALL)} crates from one changed value, while the median stays ${median(STALL_X)}. So the mean is affected by extreme values, but the median is not.`,
  sol: `Zero sum of deviations; mean moves from ${mean(STALL)} to ${mean(STALL_X)}.`,
  scheme: [['Mean computed', 1], ['Deviations listed', 1], ['Their sum is zero', 1], ['Mean with the extreme value', 1], ['Conclusion about extreme values', 1]],
}));
Q('l_choose', long({
  t: 2, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: `Choose the most suitable average, with a reason, for each imagined case: (i) the prices (lakh rupees) of five houses in a lane, ${J(HP)}; (ii) the shoe size to stock most of in a shop; (iii) the scores of a whole class in one test.`,
  model: `(i) **Median**: the mean price is ${mean(HP)} lakh, dragged up by one very costly house, while the median is **${median(HP)} lakh**, which is what a typical house in the lane costs. (ii) **Mode**: the size sold most often is the one that customers buy most, so it is the size to stock in the largest number. (iii) **Arithmetic mean**: every score matters and no extreme value dominates, so the mean describes the performance of the class as a whole.`,
  sol: `Median ${median(HP)} (mean ${mean(HP)}); mode; mean.`,
  scheme: [['Median chosen for the houses', 1], ['Reason with the figures', 1], ['Mode with reason', 1], ['Mean chosen for the scores', 1], ['Reason for the mean', 1]],
}));
Q('l_weighted', long({
  t: 1, d: 4, c: 'application', marks: 5, wl: L5,
  stem: `A learner of an imagined college has marks ${J(CR_M)} in three courses with credits ${J(CR_W)}. Find her weighted mean mark and the simple mean, and explain why they differ.`,
  model: `ΣWX = ${CR_M.map((x, i) => `${x}×${CR_W[i]}`).join(' + ')} = **${sum(CR_M.map((x, i) => x * CR_W[i]))}** and ΣW = **${sum(CR_W)}**, so the weighted mean = ${sum(CR_M.map((x, i) => x * CR_W[i]))} ÷ ${sum(CR_W)} = **${crW}**. The simple mean is ${sum(CR_M)} ÷ ${CR_M.length} = **${crS}**. The two means differ because the weighted mean gives more importance to the courses with more credits. Here the course with the most credits (${CR_W[2]}) also carries the highest mark (${CR_M[2]}), so it pulls the weighted mean above the simple mean, which treats all three courses alike.`,
  sol: `Weighted mean ${crW}; simple mean ${crS}.`,
  scheme: [['ΣWX', 1], ['ΣW', 1], ['Weighted mean', 1], ['Simple mean', 1], ['Reason for the difference', 1]],
}));

// ---- case-based
Q('cb_hamlet', caseQ({
  t: 1, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the imagined passage and answer the questions that follow.',
  passage: `**Imagined incomes in Chandanpur hamlet**\n\nA survey team of an imagined hamlet, Chandanpur, noted the monthly income (in thousand rupees) of seven families: ${J(INC)}. The team's leader says that the average income of the hamlet is very high, while the sarpanch says that most families earn far less.`,
  parts: [
    child('a', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Find the arithmetic mean income of the seven families.', model: `${sum(INC)} ÷ ${INC.length} = **${incMean} thousand rupees**.`, sol: `Mean ${incMean}.`, scheme: [['Correct mean', 1]] })),
    child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Find the median income of the seven families.', model: `The 4th item of the arranged series is **${incMed} thousand rupees**.`, sol: `Median ${incMed}.`, scheme: [['Correct median', 1]] })),
    child('c', short({ t: 2, d: 4, c: 'evaluation', marks: 2, stem: '**Either** (i): Which of the two speakers is describing the data with the mean and which with the median? Explain why the two figures differ.', model: `The leader uses the **mean**, ${incMean}, and the sarpanch the **median**, ${incMed}. The one income of ${INC[6]} thousand raises the mean, but it does not move the middle item, so the median stays low.`, sol: 'Leader mean, sarpanch median; the extreme income explains the gap.', scheme: [['Speakers matched to averages', 1], ['Reason for the difference', 1]] }), [
      short({ t: 1, d: 4, c: 'analysis', marks: 2, stem: '**Or** (ii): Find the mean income if the highest-income family is left out, and state what this shows about the arithmetic mean.', model: `Mean of the other six = ${sum(INC.slice(0, 6))} ÷ 6 = **${incMean6} thousand**, far below ${incMean}. It shows that the arithmetic mean is strongly affected by an extreme value.`, sol: `Mean without the extreme family ${incMean6}.`, scheme: [['Mean of six families', 1], ['Property of the mean stated', 1]] }),
    ]),
  ],
}));
Q('cb_footwear', caseQ({
  t: 2, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the imagined data and answer the questions that follow.',
  passage: `**Imagined sales of Rapid Footwear Mart**\n\nThe imagined Rapid Footwear Mart sold ${sh2N} pairs of school shoes in a week. The sizes and the number of pairs sold were (size: pairs): ${dis(SH2_X, SH2_F)}. The manager must decide the sizes to order for the next week.`,
  parts: [
    child('a', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Which size is the mode?', model: `Size **${sh2Mode}**, sold in ${Math.max(...SH2_F)} pairs, the highest frequency.`, sol: `Mode ${sh2Mode}.`, scheme: [['Correct mode', 1]] })),
    child('b', short({ t: 2, d: 3, c: 'application', marks: 1, stem: 'Find the median size using cumulative frequencies.', model: `Cumulative frequencies ${J(sh2Cum)}; the ${Math.floor(sh2Med.pos)}th and ${Math.ceil(sh2Med.pos)}th items both lie where the cumulative frequency reaches ${sh2Cum[2]}, so the median is size **${sh2Med.median}**.`, sol: `Median ${sh2Med.median}.`, scheme: [['Correct median', 1]] })),
    child('c', short({ t: 1, d: 3, c: 'application', marks: 2, stem: '**Either** (i): Find the arithmetic mean size sold.', model: `ΣfX = ${SH2_X.map((x, i) => `${x}×${SH2_F[i]}`).join(' + ')} = ${sum(SH2_X.map((x, i) => x * SH2_F[i]))}; mean = ${sum(SH2_X.map((x, i) => x * SH2_F[i]))} ÷ ${sh2N} = **${sh2Mean}**.`, sol: `Mean ${sh2Mean}.`, scheme: [['ΣfX and Σf', 1], ['Mean', 1]] }), [
      short({ t: 2, d: 4, c: 'evaluation', marks: 2, stem: '**Or** (ii): The manager proposes to order the most pairs in the size of the arithmetic mean. Is that sensible? Which average should guide the order?', model: `No. The mean, ${sh2Mean}, is not a size on sale, so no customer can buy it. The **mode**, size ${sh2Mode}, shows what sells most, so it should guide the order.`, sol: 'The mode, not the mean, guides stocking.', scheme: [['Mean is not a real size', 1], ['Mode chosen with reason', 1]] }),
    ]),
  ],
}));
Q('cb_bank', caseQ({
  t: 2, d: 4, c: 'application', origin: 'soyl-original',
  stem: 'Read the imagined data and answer the questions that follow.',
  passage: `**Imagined service times at Riverside Cooperative Bank**\n\nThe imagined Riverside Cooperative Bank timed the service of ${bkN} customers at its counter. The times (minutes) and the number of customers were: ${ser(BK)}.`,
  parts: [
    child('a', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Which is the modal class, and what is its class mark?', model: `The modal class is **${BK[bkMode.cls][0]} to ${BK[bkMode.cls][1]}** (highest frequency ${bkMode.f1}); its class mark is **${(BK[bkMode.cls][0] + BK[bkMode.cls][1]) / 2}** minutes.`, sol: 'Highest frequency gives the modal class.', scheme: [['Modal class and its class mark', 1]] })),
    child('b', short({ t: 2, d: 3, c: 'application', marks: 1, stem: 'Find N / 2 and the cumulative frequency of the class before the median class.', model: `N ÷ 2 = **${bkN / 2}**; cumulative frequencies are ${J(bkCum)}, so the median class is ${bkMed.L} to ${bkMed.L + bkMed.h} and the c.f. before it is **${bkMed.cf}**.`, sol: `N/2 = ${bkN / 2}; c.f. = ${bkMed.cf}.`, scheme: [['N/2 and c.f.', 1]] })),
    child('c', short({ t: 2, d: 4, c: 'application', marks: 2, stem: '**Either** (i): Find the median service time.', model: `Median = ${bkMed.L} + (${bkN / 2} − ${bkMed.cf}) ÷ ${bkMed.f} × ${bkMed.h} = **${S(bkMed.median)} minutes**.`, sol: `Median ${S(bkMed.median)}.`, scheme: [['Substitution', 1], ['Median', 1]] }), [
      short({ t: 2, d: 4, c: 'application', marks: 2, stem: '**Or** (ii): Find the mode of the service time.', model: `D1 = ${bkMode.f1} − ${bkMode.f0} = **${bkMode.D1}** and D2 = ${bkMode.f1} − ${bkMode.f2} = **${bkMode.D2}**. Mode = ${bkMode.L} + ${bkMode.D1} ÷ (${bkMode.D1} + ${bkMode.D2}) × ${bkMode.h} = **${S(bkMode.mode)} minutes**.`, sol: `Mode ${S(bkMode.mode)}.`, scheme: [['D1 and D2', 1], ['Mode', 1]] }),
    ]),
  ],
}));
Q('cb_rain', caseQ({
  t: 2, d: 4, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the imagined data and answer the questions that follow.',
  passage: `**Imagined rainfall at Neelgiri**\n\nThe imagined Neelgiri hill station recorded rainfall (mm) on ten consecutive days: ${J(NG)}. A tourist brochure says that the average daily rainfall is ${ngMean} mm, but the hotel owners say that a typical day is much drier.`,
  parts: [
    child('a', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Find the arithmetic mean daily rainfall.', model: `${sum(NG)} ÷ ${NG.length} = **${ngMean} mm**.`, sol: `Mean ${ngMean}.`, scheme: [['Correct mean', 1]] })),
    child('b', short({ t: 2, d: 3, c: 'application', marks: 1, stem: 'Find the median rainfall.', model: `Arranged: ${J([...NG].sort((a, b) => a - b))}; the median is the average of the 5th and 6th items, **${ngMed} mm**.`, sol: `Median ${ngMed}.`, scheme: [['Correct median', 1]] })),
    child('c', short({ t: 2, d: 4, c: 'evaluation', marks: 2, stem: '**Either** (i): Which average gives the better idea of a typical day at Neelgiri, and why? Give the mode as support.', model: `The **median**, ${ngMed} mm, with the mode ${ngMode} mm. One very wet day of ${Math.max(...NG)} mm lifts the mean to ${ngMean}, but nine of the ten days had ${Math.max(...NG_FIX.filter((x) => x < 50))} mm or less.`, sol: 'Median and mode show a typical day; the mean is distorted.', scheme: [['Median chosen with the mode', 1], ['Reason: the extreme day', 1]] }), [
      short({ t: 1, d: 4, c: 'analysis', marks: 2, stem: '**Or** (ii): Find the mean if the wettest day had been 5 mm instead of 50 mm, and state what this shows.', model: `Total = ${sum(NG_FIX)}, so the mean = ${sum(NG_FIX)} ÷ ${NG_FIX.length} = **${mean(NG_FIX)} mm**, close to the median. One extreme value changes the mean a great deal.`, sol: `Mean falls to ${mean(NG_FIX)}.`, scheme: [['New mean', 1], ['Effect of one extreme value', 1]] }),
    ]),
  ],
}));
