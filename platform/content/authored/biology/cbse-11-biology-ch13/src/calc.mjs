// ch13 Plant Growth and Development — every number used by decks, SVGs and questions is computed (and checked) here.
export const round = (x, dp = 0) => Math.round(x * 10 ** dp) / 10 ** dp;
export const eq = (value, expected, what) => {
  if (typeof expected === 'string' ? value !== expected : Math.abs(value - expected) > 1e-9) throw new Error(`calc: ${what} = ${value}, expected ${expected}`);
};
export const N = {};

// ---------------------------------------------------------------- growth rates
/** Arithmetic growth: L(t) = L0 + r t. */
export const arith = (L0, r, t) => round(L0 + r * t, 4);
/** Geometric growth: W(t) = W0 e^(r t). */
export const geo = (W0, r, t) => W0 * Math.exp(r * t);
/** Cells after n rounds of division when every cell divides. */
export const cellsAfter = (n0, n) => n0 * 2 ** n;
/** Relative growth rate from two sizes over t units of time (per unit time). */
export const rgr = (W0, Wt, t) => Math.log(Wt / W0) / t;

N.arithRoot = arith(2, 0.8, 6);
N.arithTime = (11 - 2) / 0.8; // days to reach 11 cm
N.geo = round(geo(2, 0.2, 5), 2);
N.geoR = round(rgr(2, 5.44, 5), 2);
N.cells10h = cellsAfter(1, 5);
N.callus = cellsAfter(5, 4);
eq(N.arithRoot, 6.8, 'arithmetic root length after 6 days');
eq(N.arithTime, 11.25, 'days for the root to reach 11 cm');
eq(N.geo, 5.44, 'geometric weight after 5 days');
eq(N.geoR, 0.2, 'relative growth rate');
eq(N.cells10h, 32, 'cells after five doublings');
eq(N.callus, 80, 'callus cells');
N.arith30 = arith(5, 1.5, 8);
eq(N.arith30, 17, 'shoot length after 8 days at 1.5 per day');

// ---------------------------------------------------------------- the sigmoid data set (height of a seedling in cm)
export const DAYS = [0, 5, 10, 15, 20, 25, 30, 35];
export const HEIGHT = [2, 3, 6, 12, 22, 30, 34, 35];
export const incr = HEIGHT.slice(1).map((h, i) => h - HEIGHT[i]);
export const rate = incr.map((d) => round(d / 5, 2));
export const rel = HEIGHT.slice(1).map((h, i) => round(((h - HEIGHT[i]) / HEIGHT[i]) * 100, 1));
N.maxInc = Math.max(...incr);
N.maxIdx = incr.indexOf(N.maxInc);
N.maxIntervalStart = DAYS[N.maxIdx];
N.maxIntervalEnd = DAYS[N.maxIdx + 1];
N.maxRate = rate[N.maxIdx];
N.totalGrowth = HEIGHT[HEIGHT.length - 1] - HEIGHT[0];
N.lastRate = rate[rate.length - 1];
N.firstRate = rate[0];
eq(incr.join(), '1,3,6,10,8,4,1', 'increments per five days');
eq(N.maxInc, 10, 'largest increment');
eq(N.maxIntervalStart, 15, 'start of fastest interval');
eq(N.maxRate, 2, 'fastest growth rate');
eq(N.totalGrowth, 33, 'total growth');
eq(N.lastRate, 0.2, 'last growth rate');
eq(N.firstRate, 0.2, 'first growth rate');
eq(rel[0], 50, 'relative increase in the first interval');
eq(rel[3], 83.3, 'relative increase in interval four');
eq(rel[5], 13.3, 'relative increase in interval six');
N.height25 = HEIGHT[5];
N.height10 = HEIGHT[2];
N.gain10to25 = HEIGHT[5] - HEIGHT[2];
eq(N.gain10to25, 24, 'growth during the log phase');
N.logShare = round((N.gain10to25 / N.totalGrowth) * 100, 1);
eq(N.logShare, 72.7, 'share of total growth made between days 10 and 25');

// ---------------------------------------------------------------- hormone calculations
/** Mass (mg) of a growth regulator needed for a solution of given concentration (mg per litre) and volume (litres). */
export const mass = (conc, litres) => conc * litres;
N.rootMg = mass(20, 0.5);
N.sprayLitres = (1200 / 100) * 1.5;
N.ga = mass(100, 2.5);
eq(N.rootMg, 10, 'IBA mass for 500 mL at 20 mg per litre');
eq(N.sprayLitres, 18, 'spray volume for 1200 square metres');
eq(N.ga, 250, 'gibberellin mass for 2.5 litres at 100 mg per litre');
/** Percentage germination. */
export const percent = (part, whole) => round((part / whole) * 100, 1);
export const SEEDS = { total: 50, control: 18, ga: 36, aba: 6 };
N.gControl = percent(SEEDS.control, SEEDS.total);
N.gGa = percent(SEEDS.ga, SEEDS.total);
N.gAba = percent(SEEDS.aba, SEEDS.total);
N.gFold = N.gGa / N.gControl;
eq(N.gControl, 36, 'control germination');
eq(N.gGa, 72, 'GA germination');
eq(N.gAba, 12, 'ABA germination');
eq(N.gFold, 2, 'GA doubles germination');
N.cuttings = 60;
N.rooted = round((60 * 75) / 100);
eq(N.rooted, 45, 'cuttings that root');
N.bananaDays = 6 - 2;
eq(N.bananaDays, 4, 'days saved by ethylene');

/** Lettered coleoptile experiment: panels A to E in this order. */
export const EXPT_ORDER = ['removed', 'intact', 'agar', 'base', 'cap'];
export const exptLetter = (k) => 'ABCDE'[EXPT_ORDER.indexOf(k)];
eq(exptLetter('agar'), 'C', 'agar panel letter');
eq(exptLetter('cap'), 'E', 'cap panel letter');
eq(exptLetter('removed'), 'A', 'removed panel letter');
eq(exptLetter('intact'), 'B', 'intact panel letter');
eq(exptLetter('base'), 'D', 'base panel letter');

// ---------------------------------------------------------------- numbers used only by questions
export const DAYS2 = [0, 4, 8, 12, 16, 20];
export const HEIGHT2 = [1, 2, 5, 11, 14, 15];
export const incr2 = HEIGHT2.slice(1).map((h, i) => h - HEIGHT2[i]);
N.max2 = Math.max(...incr2);
N.max2Idx = incr2.indexOf(N.max2);
N.max2Rate = N.max2 / (DAYS2[N.max2Idx + 1] - DAYS2[N.max2Idx]);
N.total2 = HEIGHT2[HEIGHT2.length - 1] - HEIGHT2[0];
eq(incr2.join(), '1,3,6,3,1', 'increments of the second data set');
eq(DAYS2[N.max2Idx], 8, 'fastest interval starts at day 8');
eq(N.max2Rate, 1.5, 'fastest growth rate of the second data set');
eq(N.total2, 14, 'total growth of the second data set');
// relative growth: seedling P grows 2 to 4 cm, seedling Q grows 10 to 14 cm in the same time
N.relP = percent(4 - 2, 2);
N.relQ = percent(14 - 10, 10);
eq(N.relP, 100, 'relative increase of seedling P');
eq(N.relQ, 40, 'relative increase of seedling Q');
eq(4 - 2 < 14 - 10, true, 'Q gains more in absolute terms');
// germination test 2
export const SEEDS2 = { total: 40, control: 14, ga: 30, aba: 4 };
N.g2Control = percent(SEEDS2.control, SEEDS2.total);
N.g2Ga = percent(SEEDS2.ga, SEEDS2.total);
N.g2Aba = percent(SEEDS2.aba, SEEDS2.total);
eq(N.g2Control, 35, 'second control germination');
eq(N.g2Ga, 75, 'second GA germination');
eq(N.g2Aba, 10, 'second ABA germination');
// orchard spray
N.orchardLitres = (2400 / 100) * 3;
eq(N.orchardLitres, 72, 'orchard spray volume');
N.arith2 = arith(4, 1.2, 10);
eq(N.arith2, 16, 'arithmetic length 4 + 1.2 x 10');
N.rate2 = rate[2];
eq(N.rate2, 1.2, 'growth rate in the 10 to 15 day interval');
N.geoDay3 = round(geo(10, 0.3, 3), 2);
eq(N.geoDay3, 24.6, 'geometric size 10 e^0.9');
