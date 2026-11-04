// CBSE 11 Economics, ch06 Correlation: question bank. Every student, school, stall, village, shop, judge and firm is imagined
// and written for this chapter; no real statistics are used. Every coefficient, deviation total, rank and correction factor
// below is computed with stats.mjs (or plain code) from the imagined data and pinned with check() where it is written in prose.
import assert from 'node:assert/strict';
import { Q, mcq, ar, tf, fb, match, ord, num, short, long, caseQ, child } from '../../cbse-11-economics-ch01/src/lib.mjs';
import { sum, mean, rnd, check, pearson, ranks, spearman } from '../../cbse-11-economics-ch01/src/stats.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];
export const S = (x) => String(rnd(x, 2));
export const R = (x) => S(x).replace('-', '−');
export const L = (xs) => xs.join(', ');
const same = (a, b, what) => assert.ok(Math.abs(a - b) < 1e-12, `${what}: ${a} differs from ${b}`);

/** The actual-value form of Pearson's coefficient: (n Σxy − Σx Σy) / √[(n Σx² − (Σx)²)(n Σy² − (Σy)²)]. */
export function rawForm(xs, ys) {
  const n = xs.length;
  const sx = sum(xs), sy = sum(ys);
  const sxy = sum(xs.map((x, i) => x * ys[i]));
  const sxx = sum(xs.map((x) => x * x));
  const syy = sum(ys.map((y) => y * y));
  const top = n * sxy - sx * sy;
  const dx = n * sxx - sx * sx;
  const dy = n * syy - sy * sy;
  return { n, sx, sy, sxy, sxx, syy, top, dx, dy, r: top / Math.sqrt(dx * dy) };
}

// ---------------------------------------------------------------- imagined data (computed)
// 1. Lotus Valley School: hours of study per day (x) and marks (y) of five students. r = 0.8.
export const ST_X = [4, 5, 6, 7, 8];
export const ST_Y = [50, 45, 55, 65, 60];
export const st = pearson(ST_X, ST_Y);
export const stRaw = rawForm(ST_X, ST_Y);
check(st.mx, 6, 2, 'study hours mean');
check(st.my, 55, 2, 'marks mean');
check(st.sxy, 40, 2, 'study sum xy');
check(st.sxx, 10, 2, 'study sum x2');
check(st.syy, 250, 2, 'study sum y2');
check(st.r, 0.8, 2, 'study r');
same(stRaw.r, st.r, 'actual-value form equals deviation form');
check(stRaw.sx, 30, 0, 'sum of hours');
check(stRaw.sy, 275, 0, 'sum of marks');
check(stRaw.sxy, 1690, 0, 'raw sum xy');
check(stRaw.sxx, 190, 0, 'raw sum x2');
check(stRaw.syy, 15375, 0, 'raw sum y2');
check(stRaw.top, 200, 0, 'n sxy minus sx sy');
check(stRaw.dx, 50, 0, 'n sxx minus sx squared');
check(stRaw.dy, 1250, 0, 'n syy minus sy squared');
// Change of origin and scale: u = x - 6, v = (y - 55) / 5; and a second transformation; and a reversed sign.
export const stU = ST_X.map((x) => x - 6);
export const stV = ST_Y.map((y) => (y - 55) / 5);
export const stT = pearson(stU, stV);
export const stX2 = ST_X.map((x) => 10 * x + 3);
export const stY2 = ST_Y.map((y) => y / 5);
export const stT2 = pearson(stX2, stY2);
export const stNeg = pearson(ST_X.map((x) => -x), ST_Y);
same(stT.r, st.r, 'origin and scale leave r unchanged');
same(stT2.r, st.r, 'second change of origin and scale');
same(stNeg.r, -st.r, 'reversing the sign of x reverses the sign of r');
check(stT.sxy, 8, 2, 'transformed sum uv');
check(stT.sxx, 10, 2, 'transformed sum u2');
check(stT.syy, 10, 2, 'transformed sum v2');
export const stShift = pearson(ST_X.map((x) => x + 2), ST_Y);
export const stHalf = pearson(ST_X, ST_Y.map((y) => y / 5));
same(stShift.r, st.r, 'shift of 2 hours');
same(stHalf.r, st.r, 'marks divided by 5');

// 2. Mango Mart fruit stall: price of apples (Rs per kg) and quantity sold (kg a day). r = -0.6.
export const FR_X = [120, 130, 140, 150, 160];
export const FR_Y = [50, 35, 40, 45, 30];
export const fr = pearson(FR_X, FR_Y);
check(fr.mx, 140, 2, 'apple price mean');
check(fr.my, 40, 2, 'apple quantity mean');
check(fr.sxy, -300, 2, 'fruit sum xy');
check(fr.sxx, 1000, 2, 'fruit sum x2');
check(fr.syy, 250, 2, 'fruit sum y2');
check(fr.r, -0.6, 2, 'fruit r');

// 3. Rainfall (cm) and paddy yield (quintals per hectare) in seven years of the imagined Kaveripur district. r = 6/7.
export const RN_X = [40, 50, 60, 70, 80, 90, 100];
export const RN_Y = [12, 14, 18, 16, 22, 24, 20];
export const rn = pearson(RN_X, RN_Y);
check(rn.mx, 70, 2, 'rainfall mean');
check(rn.my, 18, 2, 'yield mean');
check(rn.sxy, 480, 2, 'rain sum xy');
check(rn.sxx, 2800, 2, 'rain sum x2');
check(rn.syy, 112, 2, 'rain sum y2');
check(rn.r, 0.86, 2, 'rain r');
export const rnRaw = rawForm(RN_X, RN_Y);
same(rnRaw.r, rn.r, 'rain actual-value form');

// 4. Anjali Tuition Centre: monthly fee (Rs hundred) and students enrolled (tens). r = -0.74.
export const TU_X = [3, 5, 7, 9, 11];
export const TU_Y = [8, 6, 9, 4, 3];
export const tu = pearson(TU_X, TU_Y);
check(tu.mx, 7, 2, 'fee mean');
check(tu.my, 6, 2, 'enrolment mean');
check(tu.sxy, -24, 2, 'tuition sum xy');
check(tu.sxx, 40, 2, 'tuition sum x2');
check(tu.syy, 26, 2, 'tuition sum y2');
check(tu.r, -0.74, 2, 'tuition r');
export const tuSqrt = Math.sqrt(tu.sxx * tu.syy);
check(tuSqrt, 32.25, 2, 'tuition root');

// 5. Summations given directly.
export const SM1 = { sxy: 96, sxx: 100, syy: 144 };
SM1.r = SM1.sxy / Math.sqrt(SM1.sxx * SM1.syy);
check(SM1.r, 0.8, 2, 'given sums r');
export const SM2 = { sxy: -72, sxx: 64, syy: 225 };
SM2.r = SM2.sxy / Math.sqrt(SM2.sxx * SM2.syy);
check(SM2.r, -0.6, 2, 'given sums negative r');

// 6. Hill-town temperature (degrees) and electricity use (units a day): a U-shaped relation with r = 0.
export const UT_X = [12, 16, 20, 24, 28, 32, 36];
export const UT_Y = [26, 16, 10, 8, 10, 16, 26];
export const ut = pearson(UT_X, UT_Y);
check(ut.mx, 24, 2, 'temperature mean');
check(ut.my, 16, 2, 'electricity mean');
check(ut.sxy, 0, 2, 'U-shape sum xy');
check(ut.r, 0, 2, 'U-shape r');
// A second U: x = -3..3, y = x squared.
export const U2_X = [-3, -2, -1, 0, 1, 2, 3];
export const U2_Y = U2_X.map((x) => x * x);
export const u2 = pearson(U2_X, U2_Y);
check(u2.r, 0, 2, 'x and x squared r');

// 7. Seven imagined pairs for the scatter diagrams: x = 1 to 7.
export const SC_X = [1, 2, 3, 4, 5, 6, 7];
export const SC = {
  perfectPos: SC_X.map((x) => 2 * x),
  highPos: [1, 2, 4, 3, 6, 7, 5],
  lowPos: [1, 3, 5, 6, 7, 4, 2],
  none: [1, 5, 6, 4, 7, 3, 2],
  highNeg: [5, 7, 6, 4, 3, 1, 2],
  perfectNeg: SC_X.map((x) => 16 - 2 * x),
};
export const scR = Object.fromEntries(Object.entries(SC).map(([k, ys]) => [k, pearson(SC_X, ys).r]));
check(scR.perfectPos, 1, 2, 'perfect positive r');
check(scR.highPos, 0.86, 2, 'high positive r');
check(scR.lowPos, 0.25, 2, 'low positive r');
check(scR.none, 0, 2, 'no correlation r');
check(scR.highNeg, -0.86, 2, 'high negative r');
check(scR.perfectNeg, -1, 2, 'perfect negative r');

// 8. Debate judges, five contestants (ranks given). rs = 0.8.
export const JG5 = { names: ['Meera', 'Karan', 'Tara', 'Imran', 'Nisha'], j1: [3, 1, 4, 2, 5], j2: [2, 1, 5, 3, 4] };
export const jg5 = spearman(JG5.j1, JG5.j2, { ranked: true });
check(jg5.D2, 4, 2, 'debate sum D2');
check(sum(jg5.D), 0, 2, 'debate sum D');
check(jg5.rs, 0.8, 2, 'debate rs');
check(jg5.n ** 3 - jg5.n, 120, 0, 'n cubed minus n for 5');
// 9. Essay-contest judges, six entries (ranks given). rs = 0.6.
export const JG6 = { names: ['A', 'B', 'C', 'D', 'E', 'F'], j1: [4, 1, 6, 3, 2, 5], j2: [6, 1, 3, 4, 2, 5] };
export const jg6 = spearman(JG6.j1, JG6.j2, { ranked: true });
check(jg6.D2, 14, 2, 'essay sum D2');
check(sum(jg6.D), 0, 2, 'essay sum D');
check(jg6.rs, 0.6, 2, 'essay rs');
check(jg6.n ** 3 - jg6.n, 210, 0, 'n cubed minus n for 6');
// 10. Five paintings ranked by two teachers. rs = 0.6.
export const PT = { r1: [1, 2, 3, 4, 5], r2: [3, 1, 2, 5, 4] };
export const pt = spearman(PT.r1, PT.r2, { ranked: true });
check(pt.D2, 8, 2, 'paintings sum D2');
check(pt.rs, 0.6, 2, 'paintings rs');
// 11. Six imagined kiosks: distance from the bus stand (hundred metres) and daily sales (Rs): ranks assigned from values. rs = -0.6.
export const KI = { x: [12, 3, 18, 9, 15, 6], y: [390, 690, 590, 510, 450, 640] };
export const ki = spearman(KI.x, KI.y);
check(ki.D2, 56, 2, 'kiosk sum D2');
check(ki.cf, 0, 2, 'kiosk correction factor');
check(ki.rs, -0.6, 2, 'kiosk rs');
assert.deepEqual(ki.r1, [3, 6, 1, 4, 2, 5]);
assert.deepEqual(ki.r2, [6, 1, 3, 4, 5, 2]);
// 12. Two tests of six imagined students, one tie in the first series. rs = 0.8.
export const T1 = { a: [72, 65, 65, 80, 58, 50], b: [74, 64, 57, 80, 70, 40] };
export const t1 = spearman(T1.a, T1.b);
assert.deepEqual(t1.r1, [2, 3.5, 3.5, 1, 5, 6]);
assert.deepEqual(t1.r2, [2, 4, 5, 1, 3, 6]);
check(t1.D2, 6.5, 2, 'two-test sum D2');
check(t1.cf, 0.5, 2, 'two-test correction factor');
check(t1.D2 + t1.cf, 7, 2, 'two-test sum D2 plus CF');
check(t1.rs, 0.8, 2, 'two-test rs');
// 13. Seven stalls at the imagined Sundarpur fair: visitors (hundreds) and sales (Rs thousand); a tie in each series. rs = 0.75.
export const FA = { x: [85, 70, 70, 64, 58, 52, 45], y: [92, 88, 80, 40, 60, 60, 55] };
export const fa = spearman(FA.x, FA.y);
assert.deepEqual(fa.r1, [1, 2.5, 2.5, 4, 5, 6, 7]);
assert.deepEqual(fa.r2, [1, 2, 3, 7, 4.5, 4.5, 6]);
check(fa.D2, 13, 2, 'fair sum D2');
check(fa.cf, 1, 2, 'fair correction factor');
check(fa.rs, 0.75, 2, 'fair rs');
check(fa.n ** 3 - fa.n, 336, 0, 'n cubed minus n for 7');
// 14. Eight trainees: theory and practical marks; a group of three tied in the first series. rs = 0.5.
export const TR = { x: [90, 80, 75, 75, 75, 60, 55, 40], y: [96, 91, 84, 50, 41, 70, 58, 64] };
export const tr = spearman(TR.x, TR.y);
assert.deepEqual(tr.r1, [1, 2, 4, 4, 4, 6, 7, 8]);
assert.deepEqual(tr.r2, [1, 2, 3, 7, 8, 4, 6, 5]);
check(tr.D2, 40, 2, 'trainee sum D2');
check(tr.cf, 2, 2, 'trainee correction factor');
check(tr.rs, 0.5, 2, 'trainee rs');
check(tr.n ** 3 - tr.n, 504, 0, 'n cubed minus n for 8');
// 15. An extreme value: monthly sales of five imagined shops (Rs thousand) and customer rating. r = 0.75 but rs = 1.
export const EX = { x: [20, 24, 28, 32, 200], y: [3, 4, 5, 6, 7] };
export const ex = pearson(EX.x, EX.y);
export const exSp = spearman(EX.x, EX.y);
check(ex.r, 0.75, 2, 'extreme value r');
check(exSp.rs, 1, 2, 'extreme value rs');
// 16. Ice-cream sales (hundreds of cones) and sunburn cases in six months of the imagined town of Seaview. r = 0.96.
export const SE = { x: [4, 6, 8, 10, 12], y: [5, 6, 9, 10, 15] };
export const se = pearson(SE.x, SE.y);
check(se.sxy, 48, 2, 'seaview sum xy');
check(se.sxx, 40, 2, 'seaview sum x2');
check(se.syy, 62, 2, 'seaview sum y2');
check(se.r, 0.96, 2, 'seaview r');
// 17. Ties by group size.
export const CFG = [2, 3];
export const cfEach = CFG.map((m) => (m ** 3 - m) / 12);
export const cfTotal = sum(cfEach);
check(cfEach[0], 0.5, 2, 'correction for a pair');
check(cfEach[1], 2, 2, 'correction for a triple');
check(cfTotal, 2.5, 2, 'correction for a pair and a triple');
// 18. Ranks assigned from values with a tie (batting score of six imagined players).
export const BT = [48, 35, 35, 62, 20, 35];
export const btRanks = ranks(BT);
assert.deepEqual(btRanks, [2, 4, 4, 1, 6, 4]);
// 19. Ranks of a tie at second and third place.
export const tieRank = ranks([90, 70, 70, 60])[1];
check(tieRank, 2.5, 2, 'tie at second and third place');

// ================================================================ t01 Meaning, properties and scatter diagram
Q('m_def', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which statement best defines correlation between two variables?',
  opts: ['It is the degree and direction of the linear relationship between them', 'It is the average of the two variables', 'It is the difference between the highest and the lowest value of each variable', 'It is the cause by which one variable forces the other to change'],
  sol: 'Correlation measures how closely, and in which direction, two variables move together in a straight-line pattern. It is not an average of the variables, not a range, and it does not state that one variable causes the other.',
}));
Q('m_pos_ex', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'The imagined Gopal Juice Corner records its daily sales of cold drinks and the afternoon temperature for a month. On hotter days it sells more. The two variables are',
  opts: ['positively correlated, since both tend to rise together', 'negatively correlated, since one rises while the other falls', 'uncorrelated, since temperature is not controlled by the shop', 'perfectly correlated, since every hot day has the same sales'],
  sol: 'When higher values of one variable go with higher values of the other, the correlation is positive. Being outside the shop\'s control does not make them uncorrelated, and the sales need not be identical for the relation to be positive.',
}));
Q('m_neg_ex', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'At the imagined Sundar Soup Stall in a hill town, daily sales of hot soup are noted against the day\'s temperature. Soup sells more on colder days. The correlation is',
  opts: ['negative, since the variables move in opposite directions', 'positive, since both are recorded daily', 'zero, since temperature does not depend on the stall', 'positive, since the stall earns more on busy days'],
  sol: 'As temperature rises, soup sales fall, so the variables move in opposite directions and the correlation is negative. Recording both daily does not make it positive.',
}));
Q('m_third', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'In the imagined seaside town of Shorepur, monthly sales of ice cream and the number of people swimming at the beach are highly correlated. The most sensible explanation is that',
  opts: ['a third variable, the summer heat, raises both of them', 'ice cream sales make people swim', 'swimming makes people buy ice cream and so proves a cause', 'the correlation must be an arithmetic mistake'],
  sol: 'A third factor, here the heat, can push both variables up together, so a high correlation does not show that either causes the other. The other options claim a cause that the figures cannot show or deny a result that may be correct.',
}));
Q('m_spur', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: 'A spurious correlation is one in which',
  opts: ['two variables appear related, but the link is due to chance or to a third factor rather than a real connection between them', 'two variables have a coefficient of exactly zero', 'the relationship between the variables is non-linear', 'the data come from a sample and not from a census'],
  sol: 'A spurious correlation looks real in the figures but arises from coincidence or a common third variable. A zero coefficient, a non-linear pattern and sampling are different matters.',
}));
Q('m_scat_pos', mcq({
  t: 1, d: 1, c: 'understanding',
  stem: 'In a scatter diagram of the daily hours of study and marks of the imagined students of Lotus Valley School, the dots run from the lower left to the upper right. This shows',
  opts: ['positive correlation', 'negative correlation', 'no correlation', 'perfect negative correlation'],
  sol: 'Dots that rise from lower left to upper right show that large values of one variable go with large values of the other: positive correlation. Falling dots would show negative correlation, and a shapeless cloud no correlation.',
}));
Q('m_scat_none', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'The dots of a scatter diagram of the shoe sizes and test marks of an imagined Class 11 are spread over the whole graph with no visible direction. The coefficient of correlation is most likely',
  opts: ['close to zero', 'close to +1', 'close to −1', 'greater than +1'],
  sol: 'A shapeless cloud shows no linear relation, so the coefficient is near zero. A value near +1 or −1 needs dots close to a straight line, and no coefficient can exceed +1.',
}));
Q('m_perfect_neg', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'All the dots of a scatter diagram of the price and quantity demanded of an imagined product lie exactly on one falling straight line. The coefficient of correlation is',
  opts: ['−1', '0', '+1', '−0.5'],
  sol: 'Dots on a falling straight line show perfect negative correlation, which is −1. Zero means no linear relation, +1 is a rising line, and −0.5 is a loose falling pattern, not an exact line.',
}));
Q('m_range', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'A student of the imagined Pinecrest College reports the coefficient of correlation of her data as 1.4. Which statement is correct?',
  opts: ['It must be wrong, since the coefficient always lies between −1 and +1', 'It is possible, since it shows a very strong relation', 'It is possible if the data are in rupees', 'It is possible only for rank correlation'],
  sol: 'The coefficient of correlation can never be outside the limits −1 and +1, whatever the units, so 1.4 shows an error in the work. Units and the type of coefficient do not change the limits.',
}));
Q('m_unit', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'The coefficient of correlation between the price of apples in rupees per kg and the quantity sold in kg at the imagined Mango Mart is',
  opts: ['a pure number with no unit', 'measured in rupees per kg', 'measured in kg', 'measured in rupees'],
  sol: 'The units of the two variables cancel out in the formula, so the coefficient has no unit and can be compared across different studies. It is not in rupees or in kg.',
}));
Q('m_origin', mcq({
  t: 1, d: 3, c: 'application',
  stem: `The coefficient of correlation between daily hours of study and marks of five imagined students of Lotus Valley School is ${S(st.r)}. If every student's hours are increased by 2 for a new record, the marks staying the same, the new coefficient is`,
  opts: [`${S(stShift.r)}`, `${S(st.r + 2)}`, `${S(st.r * 2)}`, '0'],
  sol: `Adding a constant to every value is a change of origin, which leaves the deviations from the mean, and therefore the coefficient, unchanged: ${S(stShift.r)}. Adding 2 to the coefficient or doubling it would not follow from the formula, and the relation does not disappear.`,
}));
Q('m_scale', mcq({
  t: 1, d: 3, c: 'application',
  stem: `The marks of the five imagined students of Lotus Valley School are rescaled by dividing each by 5, while hours of study are left as they are. If the original coefficient was ${S(st.r)}, the coefficient for the rescaled marks is`,
  opts: [`${S(stHalf.r)}`, `${S(st.r / 5)}`, `${S(st.r * 5)}`, `${S(-st.r)}`],
  sol: `Dividing every value by a positive constant is a change of scale, which does not alter the coefficient: it stays ${S(stHalf.r)}. Dividing the coefficient by 5, multiplying it by 5, or reversing its sign would not follow, since the dots keep their pattern.`,
}));
Q('m_nonlin', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: `The imagined hill town of Himgiri records daily temperature and electricity use: heaters on cold days and fans on hot days make use high at both ends. A coefficient of ${S(ut.r)} is found. The correct conclusion is that`,
  opts: ['there is no linear relation, but a non-linear relation clearly exists', 'temperature and electricity use are unrelated in every way', 'electricity use is the cause of the temperature', 'the data must contain an error'],
  sol: 'The coefficient measures only linear association. A U-shaped pattern, where use falls and then rises, can give a coefficient of zero although the variables are strongly related. Zero does not prove that no relation of any kind exists.',
}));

// ================================================================ t02 Pearson and Spearman
Q('m_pearson_form', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'Karl Pearson\'s coefficient of correlation, with x and y as deviations from the respective means, is given by',
  opts: ['Σxy divided by the square root of (Σx² × Σy²)', 'Σx² divided by the square root of (Σxy × Σy²)', 'Σxy multiplied by the square root of (Σx² × Σy²)', 'the sum of x divided by the sum of y'],
  sol: 'The coefficient is the sum of the products of deviations divided by the square root of the product of the two sums of squared deviations. The other expressions put the quantities in the wrong places.',
}));
Q('m_sign_sxy', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'While working out Karl Pearson\'s coefficient for an imagined data set, a student finds Σxy to be negative. The coefficient is',
  opts: ['negative, since the denominator is always positive', 'positive, since squares are positive', 'zero, since the deviations cancel', 'undefined'],
  sol: 'The denominator is the square root of a product of sums of squares, which is positive, so the sign of the coefficient is the sign of Σxy. Here it is negative. It is not zero unless Σxy is zero.',
}));
Q('m_sp_form', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'The Spearman rank correlation coefficient, when no ranks are repeated, is calculated by the formula',
  opts: ['1 − 6ΣD² ÷ (n³ − n)', '1 − 6ΣD ÷ (n³ − n)', '1 + 6ΣD² ÷ (n³ − n)', '1 − 6ΣD² ÷ (n² − n)'],
  sol: 'Rank correlation is 1 minus six times the sum of squared rank differences divided by n cubed minus n. Using ΣD (which is always zero), a plus sign, or n squared would give wrong values.',
}));
Q('m_sp_when', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Which of these is the best case for using the rank correlation coefficient?',
  opts: ['Two judges ranking contestants of an imagined talent show on stage presence, which cannot be measured in numbers', 'Two exactly measured series of rainfall and yield with no unusual values', 'Two series that each contain several thousand observations', 'Two series that are perfectly linear'],
  sol: 'Rank correlation suits qualitative characteristics that can be ranked but not measured, and also data with extreme values. Exactly measured, well-behaved series are handled by Karl Pearson\'s coefficient.',
}));
Q('m_tie_rank', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'Four imagined contestants score 90, 70, 70 and 60 and are ranked from the highest. The two who score 70 would occupy the second and third places together, so each is given the rank',
  opts: [`${tieRank}`, '2', '3', '1.5'],
  sol: `Tied values share the ranks they would have taken and each gets the average of these ranks: (2 + 3) ÷ 2 = ${tieRank}. Giving both rank 2 or both rank 3 would favour or penalise them, and 1.5 is wrongly placed.`,
}));
Q('m_cf_value', mcq({
  t: 2, d: 3, c: 'application',
  stem: `In ranking the monthly sales of an imagined set of shops, three shops are found to have the same sales. The correction factor to be added to ΣD² for this group of three is`,
  opts: [`${S(cfEach[1])}`, `${S(cfEach[0])}`, '3', '27'],
  sol: `For a group of m tied items the factor is (m³ − m) ÷ 12. With m = 3 it is (27 − 3) ÷ 12 = ${S(cfEach[1])}. ${S(cfEach[0])} is the factor for a pair, and 3 and 27 are parts of the formula, not its value.`,
}));
Q('m_sp_interp', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'A rank correlation coefficient of 0.9 between the rankings of two imagined critics of a film festival means that',
  opts: ['the critics\' rankings agree closely', 'the critics disagree almost completely', 'ninety per cent of the films were ranked equally', 'the critics ranked the films in exactly opposite order'],
  sol: 'A coefficient near +1 shows strong agreement between the two rankings. It does not mean that 90 per cent of films have the same rank, and opposite orders would give a value near −1.',
}));
Q('m_neg07', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'The coefficient of correlation between the number of hours of television watched and the marks of imagined Class 11 students of Riverdale School is −0.7. The best reading is',
  opts: ['students who watch more television tend to score fewer marks, with a fairly strong relation, though this alone does not prove cause', 'watching television lowers marks by exactly 70 per cent', 'there is a weak relation between the variables', 'watching more television raises marks'],
  sol: 'A value of −0.7 is a fairly strong negative association: the variables tend to move in opposite directions. It says nothing about a 70 per cent effect, it is not weak, and a rise in marks would need a positive sign.',
}));
Q('m_dsum', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'In working out the rank correlation of two sets of ranks, a student finds that the differences D between the ranks add up to 2. This shows that',
  opts: ['there is an error, since the sum of the rank differences must be zero', 'the coefficient is 2', 'the coefficient is negative', 'the two sets have tied ranks'],
  sol: 'Both sets of ranks have the same total, so the differences between them always add to zero. A different total signals a slip. It does not give the coefficient or its sign.',
}));
Q('m_extreme', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: `Monthly sales (Rs thousand) of five imagined shops are ${L(EX.x)} and their customer ratings are ${L(EX.y)}. One shop has a very large sales figure. Compared with the rank correlation, Karl Pearson's coefficient for these data is`,
  opts: [`${S(ex.r)}, lower than the rank correlation of ${S(exSp.rs)}, because the extreme value pulls it`, `${S(exSp.rs)}, the same as the rank correlation`, `${S(ex.r)}, higher than the rank correlation`, `${R(ex.r)}, with a changed sign`],
  sol: `The ratings rise with sales at every step, so the rankings agree exactly and the rank coefficient is ${S(exSp.rs)}. The very large sales figure stretches the scale and brings Karl Pearson's coefficient down to ${S(ex.r)}. Rank correlation is therefore preferred when extreme values are present.`,
}));
Q('m_denom', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'Six imagined contestants of a quiz in the Sunrise Club are ranked by two judges. The value of n³ − n in the denominator of the rank correlation formula is',
  opts: [`${jg6.n ** 3 - jg6.n}`, `${jg6.n ** 3}`, `${jg6.n ** 2 - jg6.n}`, `${jg6.n * 6}`],
  sol: `With n = 6, n³ − n = 216 − 6 = ${jg6.n ** 3 - jg6.n}. ${jg6.n ** 3} forgets to subtract n, ${jg6.n ** 2 - jg6.n} uses n squared, and ${jg6.n * 6} is not part of the formula.`,
}));

// ---- assertion-reason
Q('ar_cause', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'A high correlation between two variables does not prove that one of them causes the other.',
  r: 'A third variable may affect both of them, or the link may be chance.',
  sol: 'Both are true and R explains A. If a common factor or chance can produce the pattern, a high coefficient alone cannot establish cause.',
}));
Q('ar_range', ar({
  t: 1, d: 2, c: 'understanding', verdict: 'both-true-not-explains',
  a: 'The coefficient of correlation lies between −1 and +1.',
  r: 'Rank correlation is used when the characteristics can only be ranked.',
  sol: 'Both are true, but R does not explain A. The limits come from the way the coefficient is built from deviations, whereas R states when rank correlation is applied.',
}));
Q('ar_origin', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'Subtracting the same number from every value of a variable does not change the coefficient of correlation.',
  r: 'The coefficient is worked out from deviations from the means, and these deviations stay the same after the subtraction.',
  sol: 'Both are true and R explains A. A change of origin shifts each value and its mean by the same amount, so every deviation is unchanged.',
}));
Q('ar_u', ar({
  t: 1, d: 4, c: 'evaluation', verdict: 'A-false-R-true',
  a: 'If the coefficient of correlation of two variables is zero, there is no relationship of any kind between them.',
  r: 'The coefficient of correlation measures only the linear relationship between two variables.',
  sol: 'A is false: a curved, for example U-shaped, relation can give zero. R is true, and it is the reason why a zero value shows only the absence of a linear relation.',
}));
Q('ar_ties', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'A-true-R-false',
  a: 'When two values of a series are equal, each is given the average of the ranks they would otherwise occupy.',
  r: 'When ranks are repeated, the rank correlation formula cannot be used at all.',
  sol: 'A is true. R is false: the formula is still used, with a correction factor of (m³ − m) ÷ 12 added to ΣD² for each group of m repeated ranks.',
}));

// ---- true-false, fill-blank, match, ordering
Q('tf_cause', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: `True or false? Because the coefficient for hours of study and marks of the imagined students of Lotus Valley School is ${S(st.r)}, studying longer must be the cause of the higher marks.`,
  sol: 'A high coefficient shows association, not cause. Other factors, such as ability or sleep, may affect both.',
}));
Q('tf_dsum', tf({
  t: 2, d: 2, c: 'understanding', ans: true,
  stem: `True or false? For the debate ranks given by two judges, ${L(JG5.j1)} and ${L(JG5.j2)}, the differences of the ranks add up to ${sum(jg5.D)}.`,
  sol: `The differences are ${L(jg5.D)}, which add up to ${sum(jg5.D)}, as they must for two sets of ranks of the same items.`,
}));
Q('tf_strength', tf({
  t: 1, d: 3, c: 'understanding', ans: false,
  stem: 'True or false? A coefficient of correlation of +0.5 shows a stronger relationship than a coefficient of −0.8, because it is positive.',
  sol: 'Strength depends on the distance from zero, not on the sign. −0.8 is farther from zero than +0.5, so it shows the stronger relationship; the sign shows only the direction.',
}));
Q('fb_dev', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'In Karl Pearson\'s formula, x and y stand for the deviations of the observations from their respective ___.',
  acc: [['means', 'mean', 'arithmetic means', 'arithmetic mean']],
  sol: 'The deviations are measured from the arithmetic means of the two series.',
}));
Q('fb_cf', fb({
  t: 2, d: 2, c: 'recall',
  stem: 'When ranks are repeated, the term added to ΣD² for each group of m tied items is called the ___ factor.',
  acc: [['correction']],
  sol: 'It is the correction factor, (m³ − m) ÷ 12.',
}));
Q('fb_n3n', fb({
  t: 2, d: 2, c: 'application',
  stem: `For the ${PT.r1.length} imagined paintings ranked by two art teachers, the denominator n³ − n of the rank correlation formula equals ___.`,
  acc: [[`${pt.n ** 3 - pt.n}`]],
  sol: `With n = ${pt.n}, n³ − n = ${pt.n ** 3} − ${pt.n} = ${pt.n ** 3 - pt.n}.`,
}));
Q('mt_scatter', match({
  t: 1, d: 2, c: 'understanding',
  stem: 'Match each pattern of dots in a scatter diagram with the kind of correlation it shows.',
  pairs: [
    ['Dots on one rising straight line', 'Perfect positive correlation'],
    ['Dots on one falling straight line', 'Perfect negative correlation'],
    ['Dots scattered with no direction', 'No correlation'],
    ['Dots falling in a narrow band from upper left to lower right', 'High negative correlation'],
  ],
  sol: 'A straight line gives a perfect relation, the direction of the line gives the sign, a shapeless cloud gives no correlation, and a narrow falling band gives a high negative value.',
}));
Q('mt_values', match({
  t: 2, d: 3, c: 'understanding',
  stem: 'Match each value of a coefficient of correlation with its usual reading.',
  pairs: [
    [`${R(scR.perfectPos)}`, 'Perfect positive linear relationship'],
    [`${R(scR.highNeg)}`, 'High negative correlation'],
    [`${R(scR.lowPos)}`, 'Low positive correlation'],
    [`${R(scR.none)}`, 'No linear relationship'],
  ],
  sol: 'A value of +1 is perfect positive; a value near −0.9 is a high negative relation; a value near 0.25 is low and positive; and 0 shows no linear relation.',
}));
Q('ord_pearson', ord({
  t: 2, d: 2, c: 'application', marks: 2,
  stem: 'Arrange the steps of working out Karl Pearson\'s coefficient from five imagined pairs of observations in a sensible order.',
  items: [
    'Find the arithmetic mean of each series',
    'Find the deviations of the values of each series from its mean',
    'Multiply the paired deviations and square each deviation, and add each column',
    'Divide Σxy by the square root of Σx² times Σy²',
  ],
  sol: 'The means come first, then the deviations from them, then the columns of products and squares with their totals, and last the division.',
}));
Q('ord_rank', ord({
  t: 2, d: 3, c: 'application', marks: 2,
  stem: 'Arrange the steps of finding the rank correlation for two series of values, one of which has a tie, in a sensible order.',
  items: [
    'Rank each series from the highest value, giving tied values the average of their ranks',
    'Find the difference D between the two ranks of each item',
    'Square each difference and add them to get ΣD²',
    'Add the correction factor for each group of tied ranks and put the total in the formula',
  ],
  sol: 'Ranks come first, then the differences and their squares, and the correction factor is added to ΣD² just before the formula is used.',
}));

// ---- numerical
Q('n_study_r', num({
  t: 2, d: 3, c: 'application', value: rnd(st.r, 2), unit: null, tol: 0.01,
  stem: `The imagined Lotus Valley School noted the daily hours of study (x) and the marks (y) of five students: ${ST_X.map((x, i) => `${x} hours and ${ST_Y[i]} marks`).join('; ')}. Find Karl Pearson's coefficient of correlation, correct to two decimals.`,
  sol: `Step 1: Means are ${S(st.mx)} hours and ${S(st.my)} marks.\nStep 2: Deviations x are ${L(st.dx)}; deviations y are ${L(st.dy)}.\nStep 3: Σxy = ${S(st.sxy)}, Σx² = ${S(st.sxx)}, Σy² = ${S(st.syy)}.\nStep 4: r = ${S(st.sxy)} ÷ √(${S(st.sxx)} × ${S(st.syy)}) = ${S(st.sxy)} ÷ ${S(Math.sqrt(st.sxx * st.syy))} = ${S(st.r)}.`,
}));
Q('n_fruit_r', num({
  t: 2, d: 3, c: 'application', value: rnd(fr.r, 2), unit: null, tol: 0.01,
  stem: `At the imagined Mango Mart the price of apples (Rs per kg) and the quantity sold (kg a day) on five days were: ${FR_X.map((x, i) => `Rs ${x} and ${FR_Y[i]} kg`).join('; ')}. Find the coefficient of correlation between price and quantity.`,
  sol: `Step 1: Means are Rs ${S(fr.mx)} and ${S(fr.my)} kg.\nStep 2: Deviations x are ${L(fr.dx)}; deviations y are ${L(fr.dy)}.\nStep 3: Σxy = ${S(fr.sxy)}, Σx² = ${S(fr.sxx)}, Σy² = ${S(fr.syy)}.\nStep 4: r = ${S(fr.sxy)} ÷ √(${S(fr.sxx)} × ${S(fr.syy)}) = ${S(fr.sxy)} ÷ ${S(Math.sqrt(fr.sxx * fr.syy))} = ${S(fr.r)}.`,
}));
Q('n_rain_r', num({
  t: 2, d: 4, c: 'application', value: rnd(rn.r, 2), unit: null, tol: 0.01,
  stem: `For seven years in the imagined district of Kaveripur, rainfall (cm) and paddy yield (quintals per hectare) were: ${RN_X.map((x, i) => `${x} and ${RN_Y[i]}`).join('; ')}. Find the coefficient of correlation, correct to two decimals.`,
  sol: `Step 1: Means are ${S(rn.mx)} cm and ${S(rn.my)} quintals.\nStep 2: Σxy = ${S(rn.sxy)}, Σx² = ${S(rn.sxx)}, Σy² = ${S(rn.syy)}.\nStep 3: r = ${S(rn.sxy)} ÷ √(${S(rn.sxx)} × ${S(rn.syy)}) = ${S(rn.sxy)} ÷ ${S(Math.sqrt(rn.sxx * rn.syy))} = ${S(rn.r)}.`,
}));
Q('n_sums_r', num({
  t: 2, d: 2, c: 'application', value: rnd(SM1.r, 2), unit: null, tol: 0.01,
  stem: `For the paddy and rainfall figures of the imagined village of Kedarpur, the deviations from the means gave Σxy = ${SM1.sxy}, Σx² = ${SM1.sxx} and Σy² = ${SM1.syy}. Find the coefficient of correlation.`,
  sol: `Step 1: Σx² × Σy² = ${SM1.sxx} × ${SM1.syy} = ${SM1.sxx * SM1.syy}; its square root is ${S(Math.sqrt(SM1.sxx * SM1.syy))}.\nStep 2: r = ${SM1.sxy} ÷ ${S(Math.sqrt(SM1.sxx * SM1.syy))} = ${S(SM1.r)}.`,
}));
Q('n_origin', num({
  t: 1, d: 3, c: 'application', value: rnd(stT.r, 2), unit: null, tol: 0.01,
  stem: `For the five students of the imagined Lotus Valley School the coefficient between hours of study x and marks y is ${S(st.r)}. A teacher defines u = x − 6 and v = (y − 55) ÷ 5 for each student. Find the coefficient of correlation between u and v.`,
  sol: `Step 1: Subtracting 6 and 55 is a change of origin, and dividing by 5 is a change of scale. Neither alters the coefficient.\nStep 2: Check with the new values: u = ${L(stU)}, v = ${L(stV)}, Σuv = ${S(stT.sxy)}, Σu² = ${S(stT.sxx)}, Σv² = ${S(stT.syy)}, so the coefficient is ${S(stT.sxy)} ÷ ${S(Math.sqrt(stT.sxx * stT.syy))} = ${S(stT.r)}.`,
}));
Q('n_ushape', num({
  t: 1, d: 4, c: 'analysis', value: rnd(ut.r, 2), unit: null, tol: 0.01,
  stem: `Daily temperature (degrees) and electricity use (units) in the imagined hill town of Himgiri over seven days: ${UT_X.map((x, i) => `${x} and ${UT_Y[i]}`).join('; ')}. Find the coefficient of correlation.`,
  sol: `Step 1: Means are ${S(ut.mx)} degrees and ${S(ut.my)} units.\nStep 2: Deviations x are ${L(ut.dx)}; deviations y are ${L(ut.dy)}.\nStep 3: The products of the deviations are ${L(ut.dx.map((a, i) => a * ut.dy[i]))}, so Σxy = ${S(ut.sxy)}.\nStep 4: r = ${S(ut.sxy)} ÷ √(${S(ut.sxx)} × ${S(ut.syy)}) = ${S(ut.r)}, although use is closely tied to temperature in a curve.`,
}));
Q('n_actual_form', num({
  t: 2, d: 4, c: 'application', value: stRaw.top, unit: null, tol: 0,
  stem: `The actual-value form of Karl Pearson's coefficient has the numerator n Σxy − Σx Σy. For the five imagined students of Lotus Valley School (hours ${L(ST_X)}; marks ${L(ST_Y)}), Σx = ${stRaw.sx}, Σy = ${stRaw.sy} and Σxy = ${stRaw.sxy}. Find the value of the numerator.`,
  sol: `Step 1: n Σxy = ${stRaw.n} × ${stRaw.sxy} = ${stRaw.n * stRaw.sxy}.\nStep 2: Σx Σy = ${stRaw.sx} × ${stRaw.sy} = ${stRaw.sx * stRaw.sy}.\nStep 3: Numerator = ${stRaw.n * stRaw.sxy} − ${stRaw.sx * stRaw.sy} = ${stRaw.top}.`,
}));
Q('n_judges_rs', num({
  t: 2, d: 3, c: 'application', value: rnd(jg5.rs, 2), unit: null, tol: 0.01,
  stem: `Two imagined judges ranked five contestants (${JG5.names.join(', ')}) of a school debate. The first judge's ranks are ${L(JG5.j1)} and the second judge's ranks are ${L(JG5.j2)}. Find the rank correlation coefficient.`,
  sol: `Step 1: D = ${L(jg5.D)}, so ΣD² = ${S(jg5.D2)}.\nStep 2: n³ − n = ${jg5.n ** 3} − ${jg5.n} = ${jg5.n ** 3 - jg5.n}.\nStep 3: rs = 1 − 6 × ${S(jg5.D2)} ÷ ${jg5.n ** 3 - jg5.n} = 1 − ${S((6 * jg5.D2) / (jg5.n ** 3 - jg5.n))} = ${S(jg5.rs)}.`,
}));
Q('n_kiosk_rs', num({
  t: 2, d: 4, c: 'application', value: rnd(ki.rs, 2), unit: null, tol: 0.01,
  stem: `Six imagined kiosks near a bus stand have distances from the stand (hundred metres) of ${L(KI.x)} and daily sales (Rs) of ${L(KI.y)}. Rank each series from the highest value and find the rank correlation coefficient.`,
  sol: `Step 1: Ranks of distance: ${L(ki.r1)}; ranks of sales: ${L(ki.r2)}.\nStep 2: D = ${L(ki.D)}; ΣD² = ${S(ki.D2)}.\nStep 3: rs = 1 − 6 × ${S(ki.D2)} ÷ ${ki.n ** 3 - ki.n} = 1 − ${S((6 * ki.D2) / (ki.n ** 3 - ki.n))} = ${S(ki.rs)}.`,
}));
Q('n_tie_cf', num({
  t: 2, d: 3, c: 'application', value: cfTotal, unit: null, tol: 0.01,
  stem: `In ranking the scores of the imagined Greenfield Academy's quiz, two students share one score and three other students share another. Find the total correction factor to be added to ΣD².`,
  sol: `Step 1: For the pair, (2³ − 2) ÷ 12 = ${S(cfEach[0])}.\nStep 2: For the group of three, (3³ − 3) ÷ 12 = ${S(cfEach[1])}.\nStep 3: Total = ${S(cfEach[0])} + ${S(cfEach[1])} = ${S(cfTotal)}.`,
}));
Q('n_tie_rs', num({
  t: 2, d: 4, c: 'application', value: rnd(t1.rs, 2), unit: null, tol: 0.01,
  stem: `Six imagined students of the Sagar Coaching Institute scored ${L(T1.a)} in a Monday test and ${L(T1.b)} in a Friday test. Rank both series from the highest score, treating repeated scores as tied, and find the rank correlation coefficient.`,
  sol: `Step 1: Ranks in the Monday test: ${L(t1.r1)}; in the Friday test: ${L(t1.r2)}.\nStep 2: D = ${L(t1.D)}; ΣD² = ${S(t1.D2)}.\nStep 3: One group of 2 tied, so the correction factor is ${S(t1.cf)}.\nStep 4: rs = 1 − 6 × (${S(t1.D2)} + ${S(t1.cf)}) ÷ ${t1.n ** 3 - t1.n} = 1 − ${S((6 * (t1.D2 + t1.cf)) / (t1.n ** 3 - t1.n))} = ${S(t1.rs)}.`,
}));
Q('n_tie_both', num({
  t: 2, d: 5, c: 'analysis', value: rnd(fa.rs, 2), unit: null, tol: 0.01,
  stem: `At the imagined Sundarpur fair, seven stalls had visitors (hundreds) of ${L(FA.x)} and sales (Rs thousand) of ${L(FA.y)}. Rank each series from the highest value, using average ranks for ties, and find the rank correlation coefficient.`,
  sol: `Step 1: Ranks of visitors: ${L(fa.r1)}; ranks of sales: ${L(fa.r2)}.\nStep 2: D = ${L(fa.D)}; ΣD² = ${S(fa.D2)}.\nStep 3: Each series has one tied pair, so the correction factor is ${S(fa.cf)}.\nStep 4: rs = 1 − 6 × (${S(fa.D2)} + ${S(fa.cf)}) ÷ ${fa.n ** 3 - fa.n} = ${S(fa.rs)}.`,
}));
Q('n_triple_rs', num({
  t: 2, d: 5, c: 'analysis', value: rnd(tr.rs, 2), unit: null, tol: 0.01,
  stem: `Eight imagined trainees at the Orion Training Hub scored ${L(TR.x)} in theory and ${L(TR.y)} in practical. Rank both series from the highest, with average ranks for ties, and find the rank correlation coefficient.`,
  sol: `Step 1: Theory ranks: ${L(tr.r1)}; practical ranks: ${L(tr.r2)}.\nStep 2: D = ${L(tr.D)}; ΣD² = ${S(tr.D2)}.\nStep 3: Three trainees tie, so the correction factor is (27 − 3) ÷ 12 = ${S(tr.cf)}.\nStep 4: rs = 1 − 6 × (${S(tr.D2)} + ${S(tr.cf)}) ÷ ${tr.n ** 3 - tr.n} = 1 − ${S((6 * (tr.D2 + tr.cf)) / (tr.n ** 3 - tr.n))} = ${S(tr.rs)}.`,
}));
Q('n_extreme_rs', num({
  t: 2, d: 4, c: 'analysis', value: rnd(exSp.rs, 2), unit: null, tol: 0.01,
  stem: `Five imagined shops had monthly sales (Rs thousand) of ${L(EX.x)} and customer ratings of ${L(EX.y)}. Find the rank correlation coefficient between sales and ratings.`,
  sol: `Step 1: Ranks of sales: ${L(exSp.r1)}; ranks of ratings: ${L(exSp.r2)}.\nStep 2: The ranks are identical, so every D is 0 and ΣD² = ${S(exSp.D2)}.\nStep 3: rs = 1 − 0 = ${S(exSp.rs)}, even though the extreme value of ${EX.x[4]} gives Karl Pearson's coefficient only ${S(ex.r)}.`,
}));

// ---- short 2-mark
Q('s2_def', short({
  t: 1, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'Define correlation and state what its sign shows.',
  model: '**Correlation** measures how closely two variables are related along a straight line, and in which direction. A **positive** sign shows that the variables move in the same direction, and a **negative** sign shows that they move in opposite directions.',
  sol: 'Definition and meaning of the sign.',
  scheme: [['Definition of correlation', 1], ['Meaning of positive and negative sign', 1]],
}));
Q('s2_types', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Give one imagined example each of positive and of negative correlation between two variables of a village market.',
  model: '**Positive:** the number of customers at an imagined village market and its daily sales, since both rise together. **Negative:** the price of tomatoes and the quantity bought, since buyers purchase less when the price is higher.',
  sol: 'One example of each kind, with the direction explained.',
  scheme: [['Positive example', 1], ['Negative example', 1]],
}));
Q('s2_scatter_none', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'A scatter diagram of the shoe sizes and the marks of the imagined students of Green Hill College shows dots spread all over the graph. What does it show, and what is the likely value of the coefficient?',
  model: 'The dots show **no correlation**: shoe size gives no guidance about marks. The coefficient of correlation is likely to be **close to zero**, as there is no straight-line pattern.',
  sol: 'No correlation, coefficient near zero.',
  scheme: [['No correlation stated with reason', 1], ['Coefficient near zero', 1]],
}));
Q('s2_range', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Between which limits does the coefficient of correlation lie? What do the two limits show?',
  model: 'The coefficient lies between **−1 and +1**. The value **+1** shows perfect positive correlation, with all dots on a rising straight line, and **−1** shows perfect negative correlation, with all dots on a falling straight line.',
  sol: 'Limits −1 and +1, and their meaning.',
  scheme: [['Limits −1 and +1', 1], ['Meaning of the two limits', 1]],
}));
Q('s2_origin', short({
  t: 1, d: 3, c: 'application', marks: 2, wl: S2,
  stem: `The coefficient between hours of study and marks of the imagined students is ${S(st.r)}. What is the coefficient if every mark is multiplied by 2 and then increased by 10? Give a reason.`,
  model: `The coefficient stays **${S(st.r)}**. Multiplying by a positive number is a change of scale and adding 10 is a change of origin; the coefficient is not affected by either, because it is a ratio built from deviations from the means.`,
  sol: `The coefficient stays ${S(st.r)}.`,
  scheme: [['Unchanged value stated', 1], ['Reason: origin and scale', 1]],
}));
Q('s2_cause', short({
  t: 1, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'A report on an imagined town notes that the number of fire engines sent to a fire and the damage done are positively correlated, and concludes that fire engines cause damage. Why is this conclusion not justified?',
  model: 'Correlation does not prove **causation**. A **third variable**, the size of the fire, raises both the number of engines sent and the damage done, so the link is not one of cause and effect.',
  sol: 'Third variable, the size of the fire.',
  scheme: [['Correlation is not causation', 1], ['Third variable identified', 1]],
}));
Q('s2_rank_tie', short({
  t: 2, d: 3, c: 'application', marks: 2, wl: S2,
  stem: `Six imagined batters scored ${L(BT)} runs in a match. Rank them from the highest score, giving tied scores the average rank.`,
  model: `The ranks are **${L(btRanks)}**. The highest score, ${BT[3]}, has rank 1 and ${BT[0]} has rank 2. The three batters on ${BT[1]} would occupy ranks 3, 4 and 5, so each gets (3 + 4 + 5) ÷ 3 = **${btRanks[1]}**. The score ${BT[4]} is last, with rank 6.`,
  sol: `Ranks ${L(btRanks)}.`,
  scheme: [['Ranks of the untied scores', 1], ['Average rank of the tied scores', 1]],
}));
Q('s2_cf', short({
  t: 2, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'In ranking an imagined series, one group of two values and one group of three values are tied. State the correction factor for each group and its total.',
  model: `For a group of m tied items the factor is (m³ − m) ÷ 12. For the pair it is (8 − 2) ÷ 12 = **${S(cfEach[0])}**; for the group of three it is (27 − 3) ÷ 12 = **${S(cfEach[1])}**. The total to be added to ΣD² is **${S(cfTotal)}**.`,
  sol: `Factors ${S(cfEach[0])} and ${S(cfEach[1])}; total ${S(cfTotal)}.`,
  scheme: [['Formula applied to the two groups', 1], ['Total correction factor', 1]],
}));
Q('s2_when_rank', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two situations in which the rank correlation coefficient is preferred to Karl Pearson\'s coefficient.',
  model: 'Rank correlation is preferred when the characteristics are **qualitative**, such as honesty or beauty, and can only be ranked, and when the data contain **extreme values** that would distort Karl Pearson\'s coefficient.',
  sol: 'Qualitative characteristics; extreme values.',
  scheme: [['First situation', 1], ['Second situation', 1]],
}));
Q('s2_interp', short({
  t: 2, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'Interpret coefficients of +0.9, +0.3 and −0.7 between the monthly spending on advertisements and sales of imagined firms.',
  model: 'A value of **+0.9** shows a very strong positive relation; **+0.3** shows a weak positive relation; **−0.7** shows a fairly strong negative relation, in which higher advertising goes with lower sales. None of them alone proves cause.',
  sol: 'Strong positive, weak positive, fairly strong negative.',
  scheme: [['+0.9 and +0.3 interpreted', 1], ['−0.7 interpreted', 1]],
}));

// ---- short 3-mark
Q('s3_props', short({
  t: 1, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'State any three properties of the coefficient of correlation.',
  model: '1. It lies between **−1 and +1**.\n2. It has **no unit**: the units of the two variables cancel in the ratio.\n3. It is **not affected by a change of origin or scale**, so adding the same number to every value, or multiplying every value by a positive number, leaves it unchanged.',
  sol: 'Three properties.',
  scheme: [['First property', 1], ['Second property', 1], ['Third property', 1]],
}));
Q('s3_ushape', short({
  t: 1, d: 4, c: 'analysis', marks: 3, wl: S3,
  stem: `For seven days in the imagined hill town of Himgiri, temperature in degrees was ${L(UT_X)} and electricity use in units was ${L(UT_Y)}. The coefficient is ${S(ut.r)}. Explain why this does not mean that the variables are unrelated.`,
  model: `Use is highest at both the lowest and the highest temperatures and lowest in the middle, a **U-shaped** pattern. The deviations from the means give Σxy = **${S(ut.sxy)}**, because the positive and negative products cancel. The coefficient measures only the **linear** relation, so ${S(ut.r)} shows that there is no linear relation, while a strong **non-linear** relation exists.`,
  sol: `Σxy = ${S(ut.sxy)}, so r = ${S(ut.r)}; the relation is U-shaped, not linear.`,
  scheme: [['U-shaped pattern described', 1], [`Σxy = ${S(ut.sxy)} through cancelling products`, 1], ['Only linear relation measured', 1]],
}));
Q('s3_sums_interp', short({
  t: 2, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `For the imagined Haven Cafe the deviation totals are Σxy = ${R(SM2.sxy)}, Σx² = ${SM2.sxx} and Σy² = ${SM2.syy}. Find Karl Pearson's coefficient and interpret it.`,
  model: `Karl Pearson's coefficient is r = Σxy ÷ √(Σx² × Σy²) = ${R(SM2.sxy)} ÷ √(${SM2.sxx} × ${SM2.syy}) = ${R(SM2.sxy)} ÷ ${S(Math.sqrt(SM2.sxx * SM2.syy))} = **${R(SM2.r)}**. The sign is negative, so the weekly rent and the number of customers move in opposite directions, and a size of ${S(Math.abs(SM2.r))} shows a moderate relation, neither very weak nor very strong.`,
  sol: `r = ${R(SM2.r)}, a moderate negative relation.`,
  scheme: [['Formula with values substituted', 1], [`Coefficient ${R(SM2.r)}`, 1], ['Interpretation of sign and size', 1]],
}));
Q('s3_rank_basic', short({
  t: 2, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `Two imagined art teachers ranked five paintings. The first gave ranks ${L(PT.r1)} and the second gave ${L(PT.r2)} to the same paintings in the same order. Find the rank correlation coefficient.`,
  model: `The rank differences are D = ${L(pt.D)}, which add up to ${S(sum(pt.D))} as they should. Their squares add up to ΣD² = **${S(pt.D2)}**. With n = ${pt.n}, n³ − n = ${pt.n ** 3} − ${pt.n} = ${pt.n ** 3 - pt.n}. Then rs = 1 − 6 × ${S(pt.D2)} ÷ ${pt.n ** 3 - pt.n} = 1 − ${S((6 * pt.D2) / (pt.n ** 3 - pt.n))} = **${S(pt.rs)}**, a fairly strong agreement between the two teachers.`,
  sol: `ΣD² = ${S(pt.D2)}; rs = ${S(pt.rs)}.`,
  scheme: [['Differences and ΣD²', 1], ['Formula with n³ − n', 1], [`Coefficient ${S(pt.rs)}`, 1]],
}));
Q('s3_compare', short({
  t: 2, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Compare Karl Pearson\'s coefficient with the rank correlation coefficient on the type of data, the effect of extreme values and the quantities used.',
  model: '1. **Type of data.** Pearson\'s coefficient needs measured values; rank correlation can be used for ranks and qualitative data.\n2. **Extreme values.** Pearson\'s coefficient is affected by them; rank correlation is much less affected, since only ranks are used.\n3. **Quantities used.** Pearson uses deviations from the means; rank correlation uses differences of ranks.',
  sol: 'Three points of comparison.',
  scheme: [['Type of data', 1], ['Extreme values', 1], ['Quantities used', 1]],
}));
Q('s3_choose', short({
  t: 2, d: 4, c: 'evaluation', marks: 3, wl: S3,
  stem: 'Which coefficient would you choose in (i) the grades given by two imagined teachers to the neatness of the notebooks of ten pupils, and (ii) the weights and heights of the same ten pupils? Give a reason for each.',
  model: '(i) **Rank correlation**: neatness cannot be measured exactly, only ranked, so the grades are turned into ranks.\n(ii) **Karl Pearson\'s coefficient**: weights and heights are measured exactly, so deviations from the means can be used, unless an extreme value is present.',
  sol: 'Rank correlation for neatness; Pearson for weight and height.',
  scheme: [['Rank correlation for (i)', 1], ['Pearson for (ii)', 1], ['A reason for each', 1]],
}));

// ---- long 5-mark
Q('l_scatter', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Describe how a scatter diagram of two variables is drawn, and explain what it shows in the cases of perfect positive, perfect negative, high, low and no correlation.',
  model: 'Mark one variable on the horizontal axis and the other on the vertical axis, and put a **dot** for each pair of values. If all dots lie on a **rising** straight line, correlation is **perfect positive**; on a **falling** line, **perfect negative**. Dots close to a line show **high** correlation, dots widely spread around a trend show **low** correlation, and a shapeless cloud shows **no** correlation.',
  sol: 'Drawing, and the five patterns.',
  scheme: [['Axes and dots', 1], ['Perfect positive and negative', 1], ['High correlation', 1], ['Low correlation', 1], ['No correlation', 1]],
}));
Q('l_props', long({
  t: 1, d: 4, c: 'application', marks: 5, wl: L5,
  stem: `The coefficient between daily hours of study (x) and marks (y) of the five imagined students of Lotus Valley School is ${S(st.r)}. Show, using u = x − 6 and v = (y − 55) ÷ 5, that the coefficient is not affected by a change of origin and scale, and state two other properties.`,
  model: `Subtracting 6 from the hours and 55 from the marks, and dividing the marks by 5, gives u = ${L(stU)} and v = ${L(stV)}. Their means are zero, so the deviations are these values themselves. Then Σuv = ${S(stT.sxy)}, Σu² = ${S(stT.sxx)} and Σv² = ${S(stT.syy)}, so the coefficient is ${S(stT.sxy)} ÷ √(${S(stT.sxx)} × ${S(stT.syy)}) = ${S(stT.sxy)} ÷ ${S(Math.sqrt(stT.sxx * stT.syy))} = **${S(stT.r)}**, the same as the original ${S(st.r)}. Two other properties: the coefficient lies between **−1 and +1**, and it has **no unit**.`,
  sol: `New coefficient ${S(stT.r)}, equal to the original ${S(st.r)}.`,
  scheme: [['Transformed values u and v', 1], ['Σuv, Σu² and Σv²', 1], [`Coefficient ${S(stT.r)}`, 1], ['Comparison with the original', 1], ['Two other properties', 1]],
}));
Q('l_pearson', long({
  t: 2, d: 4, c: 'application', marks: 5, wl: L5,
  stem: `The imagined Anjali Tuition Centre charged monthly fees (Rs hundred) of ${L(TU_X)} over five terms, when the enrolments (in tens) were ${L(TU_Y)}. Calculate Karl Pearson's coefficient of correlation and interpret it.`,
  model: `The means are fee ${S(tu.mx)} and enrolment ${S(tu.my)}. The deviations of the fee are ${L(tu.dx)} and those of the enrolment are ${L(tu.dy)}. The products of the deviations add up to Σxy = **${S(tu.sxy)}**, and the squares give Σx² = **${S(tu.sxx)}** and Σy² = **${S(tu.syy)}**. So r = ${R(tu.sxy)} ÷ √(${S(tu.sxx)} × ${S(tu.syy)}) = ${R(tu.sxy)} ÷ ${S(tuSqrt)} = **${R(tu.r)}**. This is a fairly strong negative correlation: higher fees go with fewer students enrolled.`,
  sol: `r = ${R(tu.r)}.`,
  scheme: [['Means', 1], ['Deviations of both series', 1], ['Σxy, Σx² and Σy²', 1], [`Substitution to give ${R(tu.r)}`, 1], ['Interpretation', 1]],
}));
Q('l_spearman_ties', long({
  t: 2, d: 5, c: 'application', marks: 5, wl: L5,
  stem: `Six imagined students of the Sagar Coaching Institute scored ${L(T1.a)} in a Monday test and ${L(T1.b)} in a Friday test. Find the rank correlation coefficient, using a correction for the tied scores, and interpret it.`,
  model: `Ranking from the highest, the Monday scores take ranks ${L(t1.r1)} and the Friday scores take ranks ${L(t1.r2)}, the equal Monday scores sharing the average rank ${t1.r1[1]}. The differences are ${L(t1.D)}, so ΣD² = **${S(t1.D2)}**. One pair is tied, so the correction factor is (8 − 2) ÷ 12 = **${S(t1.cf)}**. Then rs = 1 − 6 × (${S(t1.D2)} + ${S(t1.cf)}) ÷ ${t1.n ** 3 - t1.n} = 1 − ${S((6 * (t1.D2 + t1.cf)) / (t1.n ** 3 - t1.n))} = **${S(t1.rs)}**: a strong agreement between the two tests.`,
  sol: `rs = ${S(t1.rs)}.`,
  scheme: [['Ranks with average rank for the tie', 1], ['D and ΣD²', 1], [`Correction factor ${S(t1.cf)}`, 1], [`Coefficient ${S(t1.rs)}`, 1], ['Interpretation', 1]],
}));
Q('l_compare', long({
  t: 2, d: 5, c: 'evaluation', marks: 5, wl: L5,
  stem: `Monthly sales (Rs thousand) of five imagined shops were ${L(EX.x)} with customer ratings of ${L(EX.y)}. Find the rank correlation, state Karl Pearson's coefficient (${S(ex.r)}) and explain which is better and why.`,
  model: `The sales rank as ${L(exSp.r1)} and the ratings rank as ${L(exSp.r2)}. The two sets of ranks agree exactly, so every difference is zero, ΣD² = ${S(exSp.D2)} and rs = 1 − 0 = **${S(exSp.rs)}**. Karl Pearson's coefficient is only **${S(ex.r)}**, because the very large sales figure of ${EX.x[4]} thousand stretches the scale and dominates the deviations. Rank correlation is the better measure here: it uses only the order of the values, so it is little affected by an extreme value, and it shows that the ratings rise with sales at every step.`,
  sol: `rs = ${S(exSp.rs)} against r = ${S(ex.r)}.`,
  scheme: [['Ranks of both series', 1], ['ΣD² and rs', 1], ['Pearson\'s value compared', 1], ['Effect of the extreme value explained', 1], ['Conclusion on the better measure', 1]],
}));
Q('l_causation', long({
  t: 1, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'A report on the imagined town of Seaview finds that ice cream sales and the number of sunburn cases move together closely. Explain why this does not show that ice cream causes sunburn. Use the ideas of causation, a third variable and spurious correlation.',
  model: 'A high coefficient shows only that two variables move together; it does not prove that one **causes** the other. Here the **third variable**, hot sunny weather, raises both ice cream sales and sunburn. A link produced in this way, or by chance, is called a **spurious correlation**. To claim cause one needs a clear mechanism and evidence that other factors have been ruled out.',
  sol: 'Causation, third variable and spurious correlation.',
  scheme: [['Correlation is not causation', 1], ['Third variable named', 1], ['How it affects both', 1], ['Spurious correlation defined', 1], ['What is needed to claim cause', 1]],
}));

// ---- case-based
Q('cb_rain', caseQ({
  t: 1, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the imagined data and answer the questions that follow.',
  passage: `**Imagined rainfall and paddy yield in Kaveripur**\n\nAn agricultural officer of the imagined district of Kaveripur recorded the rainfall (cm) and the paddy yield (quintals per hectare) of seven years. Rainfall: ${L(RN_X)}. Yield: ${L(RN_Y)}. A scatter diagram shows the dots rising from the lower left to the upper right, with some scatter.`,
  parts: [
    child('a', short({ t: 1, d: 2, c: 'understanding', marks: 1, stem: 'What type of correlation does the scatter diagram show?', model: '**Positive** correlation: the dots rise from lower left to upper right.', sol: 'Rising dots mean positive correlation.', scheme: [['Positive correlation', 1]] })),
    child('b', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Find the mean rainfall of the seven years.', model: `(${RN_X.join(' + ')}) ÷ ${RN_X.length} = **${S(rn.mx)} cm**.`, sol: `Mean rainfall ${S(rn.mx)} cm.`, scheme: [['Correct mean', 1]] })),
    child('c', short({ t: 2, d: 4, c: 'analysis', marks: 2, stem: `**Either** (i): Given Σxy = ${rn.sxy}, Σx² = ${rn.sxx.toLocaleString('en-IN')} and Σy² = ${rn.syy} for the deviations from the means, find the coefficient of correlation.`, model: `r = ${S(rn.sxy)} ÷ √(${S(rn.sxx)} × ${S(rn.syy)}) = ${S(rn.sxy)} ÷ ${S(Math.sqrt(rn.sxx * rn.syy))} = **${S(rn.r)}**.`, sol: `r = ${S(rn.r)}.`, scheme: [['Substitution in the formula', 1], [`Coefficient ${S(rn.r)}`, 1]] }), [
      short({ t: 1, d: 4, c: 'evaluation', marks: 2, stem: '**Or** (ii): The officer says that the high coefficient proves that rainfall alone produces the extra yield. Comment on this claim.', model: 'The claim goes too far. A high coefficient shows that rainfall and yield **move together**, but it does not prove cause. Other factors, such as **fertiliser, seed quality and irrigation**, may also have changed and may influence the yield.', sol: 'Correlation is not causation; other factors.', scheme: [['Correlation is not proof of cause', 1], ['Another factor named', 1]] }),
    ]),
  ],
}));
Q('cb_fruit', caseQ({
  t: 2, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the imagined data and answer the questions that follow.',
  passage: `**Imagined apple sales at Mango Mart**\n\nThe owner of the imagined Mango Mart noted, on five days, the price of apples (Rs per kg) and the quantity sold (kg): ${FR_X.map((x, i) => `Rs ${x}, ${FR_Y[i]} kg`).join('; ')}. He wants to know how closely the two move together.`,
  parts: [
    child('a', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Find the mean price and the mean quantity.', model: `Mean price = **Rs ${S(fr.mx)}**; mean quantity = **${S(fr.my)} kg**.`, sol: 'Both means.', scheme: [['Both means correct', 1]] })),
    child('b', short({ t: 2, d: 3, c: 'application', marks: 1, stem: 'Find Σxy, the sum of the products of the deviations from the means.', model: `The products are ${L(fr.dx.map((a, i) => a * fr.dy[i]))}, so Σxy = **${R(fr.sxy)}**.`, sol: `Σxy = ${R(fr.sxy)}.`, scheme: [['Correct Σxy', 1]] })),
    child('c', short({ t: 2, d: 4, c: 'analysis', marks: 2, stem: `**Either** (i): Given Σx² = ${fr.sxx.toLocaleString('en-IN')} and Σy² = ${fr.syy}, find the coefficient of correlation and state the direction of the relation.`, model: `r = ${R(fr.sxy)} ÷ √(${S(fr.sxx)} × ${S(fr.syy)}) = ${R(fr.sxy)} ÷ ${S(Math.sqrt(fr.sxx * fr.syy))} = **${R(fr.r)}**. The sign is negative: a higher price goes with a smaller quantity sold.`, sol: `r = ${R(fr.r)}, negative.`, scheme: [['Coefficient computed', 1], ['Direction stated', 1]] }), [
      short({ t: 2, d: 4, c: 'evaluation', marks: 2, stem: '**Or** (ii): If the owner records the quantity in grams instead of kilograms, how will the coefficient change? Give a reason.', model: 'It will **not change**. Converting kilograms to grams multiplies every value by 1,000, a change of scale, and the coefficient is a pure number that is not affected by a change of scale.', sol: 'Unchanged, by the scale property.', scheme: [['Unchanged', 1], ['Reason: change of scale', 1]] }),
    ]),
  ],
}));
Q('cb_cause', caseQ({
  t: 1, d: 4, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the imagined passage and answer the questions that follow.',
  passage: `**Imagined ice cream and sunburn in Seaview**\n\nIn the imagined seaside town of Seaview, a student collected the monthly ice cream sales (hundreds of cones) and the number of sunburn cases reported at the town clinic over five months. Sales: ${L(SE.x)}. Sunburn cases: ${L(SE.y)}. She found that Σxy = ${S(se.sxy)}, Σx² = ${S(se.sxx)} and Σy² = ${S(se.syy)}, and wrote that ice cream causes sunburn.`,
  parts: [
    child('a', short({ t: 1, d: 2, c: 'understanding', marks: 1, stem: 'Name the type of correlation shown by the data.', model: '**Positive** correlation: both variables rise together.', sol: 'Both rise together.', scheme: [['Positive', 1]] })),
    child('b', short({ t: 2, d: 3, c: 'application', marks: 1, stem: 'Find the coefficient of correlation correct to two decimals.', model: `r = ${S(se.sxy)} ÷ √(${S(se.sxx)} × ${S(se.syy)}) = ${S(se.sxy)} ÷ ${S(Math.sqrt(se.sxx * se.syy))} = **${S(se.r)}**.`, sol: `r = ${S(se.r)}.`, scheme: [['Correct coefficient', 1]] })),
    child('c', short({ t: 1, d: 4, c: 'evaluation', marks: 2, stem: '**Either** (i): Is the student\'s conclusion that ice cream causes sunburn justified? Name the likely third variable.', model: `No. The coefficient of ${S(se.r)} shows only that the two move together. The likely **third variable** is hot, sunny weather, which raises both ice cream sales and sunburn cases.`, sol: 'Not justified; sunny weather is the third variable.', scheme: [['Conclusion rejected', 1], ['Third variable named', 1]] }), [
      short({ t: 1, d: 4, c: 'evaluation', marks: 2, stem: '**Or** (ii): What is a spurious correlation? Say whether the Seaview link fits it.', model: 'A **spurious correlation** is a link between two variables that is due to chance or a common third factor and not to a real connection. The Seaview link **fits** it, because sunny weather drives both variables.', sol: 'Definition, and the Seaview link is spurious.', scheme: [['Definition', 1], ['Application to Seaview', 1]] }),
    ]),
  ],
}));
Q('cb_judges', caseQ({
  t: 2, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the imagined data and answer the questions that follow.',
  passage: `**Imagined essay contest at the Sunrise Club**\n\nTwo judges of an imagined essay contest at the Sunrise Club ranked six entries, A to F. The first judge gave ranks ${L(JG6.j1)} and the second judge gave ranks ${L(JG6.j2)}, in the order A, B, C, D, E, F. Neither judge gave tied ranks.`,
  parts: [
    child('a', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Find the difference D between the two judges\' ranks for entry C.', model: `D = ${JG6.j1[2]} − ${JG6.j2[2]} = **${jg6.D[2]}**.`, sol: `D for entry C is ${jg6.D[2]}.`, scheme: [['Correct difference', 1]] })),
    child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Find ΣD².', model: `D = ${L(jg6.D)}; D² = ${L(jg6.D.map((d) => d * d))}; ΣD² = **${S(jg6.D2)}**.`, sol: `ΣD² = ${S(jg6.D2)}.`, scheme: [['Correct ΣD²', 1]] })),
    child('c', short({ t: 2, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): Find the rank correlation coefficient and interpret it.', model: `rs = 1 − 6 × ${S(jg6.D2)} ÷ ${jg6.n ** 3 - jg6.n} = 1 − ${S((6 * jg6.D2) / (jg6.n ** 3 - jg6.n))} = **${S(jg6.rs)}**: a fairly strong agreement between the judges.`, sol: `rs = ${S(jg6.rs)}.`, scheme: [['Coefficient computed', 1], ['Interpretation', 1]] }), [
      short({ t: 2, d: 4, c: 'evaluation', marks: 2, stem: '**Or** (ii): Why is rank correlation, and not Karl Pearson\'s coefficient of marks, the natural measure here?', model: 'The judges gave **ranks**, not exact measurements, and the quality of an essay is **qualitative**. Rank correlation works directly with ranks, so it suits this case.', sol: 'Ranks and qualitative judgement.', scheme: [['Data are ranks', 1], ['Qualitative judgement', 1]] }),
    ]),
  ],
}));
