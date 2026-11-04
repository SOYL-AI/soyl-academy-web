// CBSE 11 Mathematics ch13 Statistics — objective items (mcq, assertion-reason, true-false, fill-blank).
// Every number is computed from the exact distributions of stat.mjs; each item re-solves itself.
import { Q, mk, r } from './lib.mjs';
import { Dist, fr, T, tex, sumOf } from './stat.mjs';
import { SEED, SCORE, FERRY, KIOSK_X, KIOSK_Y } from './data.mjs';

export { r };
const N = (x) => fr(x).num();
const V = (x) => `$${T(x)}$`;
const raw = (xs) => Dist.raw(xs);
const disc = (v, f) => Dist.discrete(v, f);
const grp = (lo, h, f) => Dist.grouped(lo, h, f);
const same = (a, b) => fr(a).eq(b);
/** All values of an array are distinct (options are different numbers). */
const distinct = (vals) => new Set(vals.map((v) => fr(v).toString())).size === vals.length;

// =============================================================== MCQ
{
  Q('m01', mk.mcq({ stem: r`A measure of dispersion for a collection of observations is meant to describe`, opts: ['how widely the observations are scattered about a central value', 'the value that occurs most often among the observations', 'the middle value when the observations are arranged in order', 'the total of all the observations'], key: 'a', sol: r`Dispersion is about spread. The most frequent value is the mode, the middle value is the median, and the total of the observations only helps to find the mean.`, d: 1, c: 'recall', t: [1], time: 45 }), null, 'definition recall: dispersion means spread');
}
{
  const d = raw([23, 17, 31, 9, 26, 14]);
  const vals = [N(d.range), 40, 31, N(d.mean)];
  Q('m02', mk.mcq({ stem: r`The litres of water used on six days by an imagined hostel kitchen were $23, 17, 31, 9, 26, 14$. The range of this data is`, opts: vals.map(V), key: 'a', sol: r`Range = greatest value $-$ least value $= 31 - 9 = ${T(d.range)}$. The value $40$ adds the two extremes, $31$ is only the greatest value, and $${T(d.mean)}$ is the mean, not the range.`, d: 1, c: 'understanding', t: [1], time: 45 }), (Cx) => { Cx.assert(distinct(vals) && same(d.range, 22) && same(d.mean, 20), 'range 31 - 9 = 22'); Cx.which(vals, N(d.range)); });
}
{
  const d = SEED;
  const dev = d.x.map((x) => x.sub(d.mean));
  Q('m03', mk.mcq({ stem: r`Six imagined seedlings grew by $4, 6, 7, 10, 15, 18$ mm in a month. If each growth is subtracted from the mean growth and the six differences are added, the total is`, opts: ['$0$', '$25$', '$150$', '$10$'], key: 'a', sol: r`The mean growth is $10$ mm, so the differences from the mean are $${list0(dev)}$, and the positive and negative ones cancel exactly to give $0$. The value $25$ is the variance, $150$ is the sum of the squared differences, and $10$ is the mean itself.`, d: 2, c: 'understanding', t: [1], time: 75 }), (Cx) => { Cx.assert(sumOf(dev).eq(0) && d.variance.eq(25) && sumOf(dev.map((v) => v.pow(2))).eq(150) && d.mean.eq(10), 'deviations from the mean add to 0'); Cx.which([0, 25, 150, 10], 0); });
}
{
  const d = raw([7, 13, 3, 9, 18]);
  const tot = d.sumF((x) => x.sub(d.mean).abs());
  const vals = [N(d.mdMean), N(tot), N(tot.div(4)), 0];
  Q('m04', mk.mcq({ stem: r`An imagined shop recorded $7, 13, 3, 9, 18$ customers in five consecutive half-hours. The mean deviation about the mean is`, opts: vals.map(V), key: 'a', sol: r`The mean is $${T(d.mean)}$, the absolute deviations are $3, 3, 7, 1, 8$ with total $${T(tot)}$, and the mean deviation is $\dfrac{${T(tot)}}{5} = ${T(d.mdMean)}$. Stopping at $${T(tot)}$ forgets to divide, dividing by $4$ is a variance habit, and $0$ comes from adding signed deviations.`, d: 2, c: 'application', t: [1], time: 90 }), (Cx) => { Cx.assert(distinct(vals) && same(d.mean, 10) && same(tot, 22) && same(d.mdMean, '22/5'), 'MD = 22/5 = 4.4'); Cx.which(vals, N(d.mdMean)); });
}
{
  const d = raw([14, 9, 21, 5, 17, 12, 30]);
  const tot = d.sumF((x) => x.sub(d.median).abs());
  const vals = [N(d.mdMedian), N(tot), N(tot.div(6)), N(d.median)];
  Q('m05', mk.mcq({ stem: r`The lengths, in centimetres, of seven imagined ribbon offcuts are $14, 9, 21, 5, 17, 12, 30$. The mean deviation about the median is`, opts: vals.map(V), key: 'a', sol: r`Arranged in order the offcuts are $5, 9, 12, 14, 17, 21, 30$, so the median is $${T(d.median)}$. The absolute deviations are $9, 5, 2, 0, 3, 7, 16$ with total $${T(tot)}$, and the mean deviation is $\dfrac{${T(tot)}}{7} = ${T(d.mdMedian)}$. Dividing by $6$ gives $7$, and $14$ is the median itself.`, d: 3, c: 'application', t: [1], time: 100 }), (Cx) => { Cx.assert(distinct(vals) && same(d.median, 14) && same(tot, 42) && same(d.mdMedian, 6), 'MD about the median = 6'); Cx.which(vals, N(d.mdMedian)); });
}
{
  const d = disc([10, 20, 30, 40], [3, 5, 7, 5]);
  const tot = d.sumF((x) => x.sub(d.mean).abs());
  const ignoreF = raw([10, 20, 30, 40]).sumF((x) => x.sub(d.mean).abs()).div(4);
  const vals = [N(d.mdMean), N(tot), N(tot.div(4)), N(ignoreF)];
  Q('m06', mk.mcq({ stem: r`In an imagined stamp club, $3$, $5$, $7$ and $5$ members own $10$, $20$, $30$ and $40$ stamps respectively. The mean deviation of the number of stamps about the mean is`, opts: vals.map(V), key: 'a', sol: r`The mean is $\dfrac{${T(d.sumFx)}}{20} = ${T(d.mean)}$. Then $\sum f|x - \bar{x}| = ${T(tot)}$ and the mean deviation is $\dfrac{${T(tot)}}{20} = ${T(d.mdMean)}$. The value $${T(ignoreF)}$ ignores the frequencies, and $${T(tot)}$ forgets to divide.`, d: 3, c: 'application', t: [1], time: 105 }), (Cx) => { Cx.assert(distinct(vals) && same(d.mean, 27) && same(tot, 172) && same(d.mdMean, '43/5') && same(ignoreF, 10), 'MD 172/20 = 8.6'); Cx.which(vals, N(d.mdMean)); });
}
{
  const a = SEED, b = raw(SEED.x.map((x) => x.add(6)));
  Q('m07', mk.mcq({ stem: r`Every reading of an imagined weather station's rainfall data is increased by $6$ mm because of a sensor offset. The mean deviation of the readings about their mean will then be`, opts: ['unchanged', 'increased by $6$ mm', 'multiplied by $6$', 'reduced to $0$'], key: 'a', sol: r`Adding $6$ to every reading moves the mean by $6$ too, so each gap $|x - \bar{x}|$ stays the same and the mean deviation is unchanged. For the seedling data it is $${tex(a.mdMean)}$ both before and after adding $6$.`, d: 2, c: 'understanding', t: [1], time: 60 }), (Cx) => { Cx.assert(a.mdMean.eq(b.mdMean) && !a.mean.eq(b.mean), 'MD unchanged by a shift'); });
}
{
  Q('m08', mk.mcq({ stem: r`For a grouped distribution with class marks $x_i$, frequencies $f_i$ and mean $\bar{x}$, the mean deviation about the mean is given by`, opts: [r`$\dfrac{\sum f_i |x_i - \bar{x}|}{\sum f_i}$`, r`$\dfrac{\sum f_i (x_i - \bar{x})}{\sum f_i}$`, r`$\dfrac{\sum |x_i - \bar{x}|}{\text{number of classes}}$`, r`$\dfrac{\sum f_i |x_i - \bar{x}|}{\text{number of classes}}$`], key: 'a', sol: r`Each class mark is weighted by its frequency and the absolute gaps are averaged over all $\sum f_i$ observations. Without the absolute value the sum is $0$, and dividing by the number of classes ignores the frequencies.`, d: 2, c: 'recall', t: [1], time: 60 }), null, 'formula recall; zero sum without absolute value is asserted in the worked data');
}
{
  const d = grp(20, 10, [3, 5, 9, 7, 2]);
  const vals = [N(d.range), 40, 70, 10];
  Q('m09', mk.mcq({ stem: r`The waiting times at an imagined ticket counter are grouped into the classes $20$–$30$, $30$–$40$, $40$–$50$, $50$–$60$ and $60$–$70$ minutes. Taking the range as the upper limit of the last class minus the lower limit of the first, the range is`, opts: vals.map(V), key: 'a', sol: r`Range $= 70 - 20 = ${T(d.range)}$ minutes. The value $40$ is the difference of the first and last class marks ($65 - 25$), $70$ is just the upper limit of the last class, and $10$ is the class width.`, d: 2, c: 'understanding', t: [1], time: 60 }), (Cx) => { Cx.assert(distinct(vals) && same(d.range, 50) && same(d.x[4].sub(d.x[0]), 40), 'range 50, class-mark difference 40'); Cx.which(vals, N(d.range)); });
}
{
  Q('m10', mk.mcq({ stem: r`For $n$ observations $x_1, x_2, \ldots, x_n$ with mean $\bar{x}$, the variance is defined as`, opts: [r`$\dfrac{1}{n}\sum (x_i - \bar{x})^2$`, r`$\dfrac{1}{n}\sum |x_i - \bar{x}|$`, r`$\left(\dfrac{1}{n}\sum (x_i - \bar{x})\right)^2$`, r`$\sqrt{\dfrac{1}{n}\sum (x_i - \bar{x})^2}$`], key: 'a', sol: r`The variance is the mean of the squared deviations. The second expression is the mean deviation, the third is always $0$ because the deviations cancel, and the fourth is the standard deviation.`, d: 1, c: 'recall', t: [2], time: 45 }), null, 'definition recall; the cancelling third expression is asserted in m03');
}
{
  const v = fr('9/4'), sdv = v.sqrt();
  const vals = [N(sdv), N(sdv.div(2)), N(v.mul(v)), N(sdv.mul(3))];
  Q('m11', mk.mcq({ stem: r`The variance of the masses, in kilograms, of the parcels sorted at an imagined depot is $2.25\ \text{kg}^2$. The standard deviation of the masses is`, opts: vals.map((x) => `$${T(x)}\\ \\text{kg}$`), key: 'a', sol: r`The standard deviation is the positive square root of the variance: $\sqrt{2.25} = ${T(sdv)}$ kg. Half of this is $${T(sdv.div(2))}$, and the square of the variance is $${T(v.mul(v))}$.`, d: 1, c: 'understanding', t: [2], time: 45 }), (Cx) => { Cx.assert(distinct(vals) && same(sdv, '3/2') && same(sdv.mul(sdv), v), 'sqrt 2.25 = 1.5'); Cx.which(vals, N(sdv)); });
}
{
  const d = raw([2, 4, 6, 8, 10]);
  const tot = d.sumF((x) => x.sub(d.mean).pow(2));
  Q('m12', mk.mcq({ stem: r`An imagined pianist practised for $2, 4, 6, 8$ and $10$ minutes on five days. The variance of the practice times is`, opts: [`$${T(d.variance)}$`, `$${T(tot)}$`, r`$2\sqrt{2}$`, `$${T(d.mean)}$`], key: 'a', sol: r`The mean is $${T(d.mean)}$, the squared deviations are $16, 4, 0, 4, 16$ with total $${T(tot)}$, and the variance is $\dfrac{${T(tot)}}{5} = ${T(d.variance)}$. The total $${T(tot)}$ forgets to divide, $2\sqrt{2}$ is the standard deviation, and $${T(d.mean)}$ is the mean.`, d: 2, c: 'understanding', t: [2], time: 75 }), (Cx) => { Cx.assert(same(d.variance, 8) && same(tot, 40) && same(d.mean, 6) && same(d.variance.mul(d.variance), 64) && d.variance.sqrt() === null, 'variance 8, SD 2 sqrt 2'); Cx.which([8, 40, 'sd', 6].map((v) => (v === 'sd' ? 'x' : v)), 8); });
}
{
  const n = 10, sx = 100, sx2 = 1240;
  const v = fr(sx2).div(n).sub(fr(sx).div(n).pow(2));
  const vals = [N(v), N(fr(sx2).div(n).sub(fr(sx).div(n))), N(fr(sx2).div(n)), 4.9];
  Q('m13', mk.mcq({ stem: r`For ten imagined readings from a pressure gauge, $\sum x = 100$ and $\sum x^2 = 1240$. Their variance is`, opts: vals.map(V), key: 'a', sol: r`Variance $= \dfrac{\sum x^2}{n} - \left(\dfrac{\sum x}{n}\right)^2 = ${T(fr(sx2).div(n))} - ${T(fr(sx).div(n).pow(2))} = ${T(v)}$. Subtracting $10$ instead of $100$ gives $${T(vals[1])}$, leaving out the subtraction gives $${T(vals[2])}$, and $4.9$ is the standard deviation rounded.`, d: 2, c: 'application', t: [2], time: 75 }), (Cx) => { Cx.assert(distinct(vals) && same(v, 24) && Math.abs(Math.sqrt(24) - 4.899) < 0.001, 'variance 124 - 100 = 24'); Cx.which(vals, N(v)); });
}
{
  const sd = fr('9/2'), k = 3, shift = 7;
  const vals = [N(sd.mul(k)), N(sd.mul(k).add(shift)), N(sd), N(sd.mul(k * k))];
  const d = raw([4, 8, 9, 15, 24]), e = raw(d.x.map((x) => x.mul(k).add(shift)));
  Q('m14', mk.mcq({ stem: r`The standard deviation of the daily orders received by an imagined tailor is $4.5$. Each day's order count is multiplied by $3$ for a festival month and then $7$ extra orders are added. The standard deviation of the new counts is`, opts: vals.map(V), key: 'a', sol: r`Multiplying by $3$ multiplies the standard deviation by $3$, and adding $7$ shifts every value without changing the spread: $3 \times 4.5 = ${T(sd.mul(k))}$. Adding $7$ to the result gives $${T(vals[1])}$, ignoring the change gives $4.5$, and $${T(vals[3])}$ multiplies by $9$ (the rule for the variance).`, d: 3, c: 'application', t: [2], time: 75 }), (Cx) => { Cx.assert(distinct(vals) && e.variance.eq(d.variance.mul(9)) && same(sd.mul(3), '27/2'), 'SD scales by 3, variance by 9, shift ignored'); Cx.which(vals, N(sd.mul(3))); });
}
{
  const mean = fr(40), v = fr(64), sdv = v.sqrt();
  const cv = sdv.div(mean).mul(100);
  const vals = [N(cv), N(v.div(mean).mul(100)), N(sdv.div(mean)), N(mean.div(sdv).mul(100))];
  Q('m15', mk.mcq({ stem: r`The monthly rainfall of an imagined valley station has mean $40$ cm and variance $64\ \text{cm}^2$. Its coefficient of variation is`, opts: ['$20\\%$', '$160\\%$', '$0.2\\%$', '$500\\%$'], key: 'a', sol: r`The standard deviation is $\sqrt{64} = ${T(sdv)}$, so the coefficient of variation is $\dfrac{${T(sdv)}}{40} \times 100 = ${T(cv)}\%$. Using the variance gives $${T(vals[1])}\%$, forgetting the factor $100$ gives $0.2$, and inverting the ratio gives $${T(vals[3])}\%$.`, d: 3, c: 'application', t: [2], time: 75 }), (Cx) => { Cx.assert(same(cv, 20) && same(vals[1], 160) && same(vals[3], 500), 'CV = 8/40 x 100 = 20%'); Cx.which([20, 160, 0.2, 500], N(cv)); });
}
{
  const d = raw([71, 68, 74, 69, 80, 66, 72, 70]);
  const vals = [N(d.range), N(fr(80).add(66)), 80, N(d.mean)];
  Q('m16', mk.mcq({ stem: r`An imagined runner's eight lap times, in seconds, were $71, 68, 74, 69, 80, 66, 72, 70$. The range of the lap times is`, opts: vals.map(V), key: 'a', sol: r`Range $= 80 - 66 = ${T(d.range)}$ seconds. Adding the extremes gives $146$, $80$ is only the slowest lap, and $${T(d.mean)}$ is the mean lap time.`, d: 1, c: 'understanding', t: [1], time: 45 }), (Cx) => { Cx.assert(distinct(vals) && same(d.range, 14) && same(d.mean, '285/4'), 'range 14'); Cx.which(vals, 14); });
}
{
  const sum = 90, n = 6;
  const v = fr(sum).div(n);
  const vals = [N(v), sum, N(fr(sum).div(n - 1)), sum * n];
  Q('m17', mk.mcq({ stem: r`For six imagined test-tube readings the squares of the deviations from the mean add up to $90$. The variance of the readings is`, opts: vals.map(V), key: 'a', sol: r`Variance $= \dfrac{\sum (x - \bar{x})^2}{n} = \dfrac{90}{6} = ${T(v)}$. The total $90$ forgets to divide, dividing by $5$ gives $${T(vals[2])}$, and multiplying by $6$ gives $540$.`, d: 1, c: 'understanding', t: [2], time: 45 }), (Cx) => { Cx.assert(distinct(vals) && same(v, 15), '90/6 = 15'); Cx.which(vals, 15); });
}
{
  const A = raw([20, 18, 24, 22, 16]), sdA = 6, mA = 20, sdB = 6, mB = 60;
  const cvA = fr(sdA).div(mA).mul(100), cvB = fr(sdB).div(mB).mul(100);
  Q('m18', mk.mcq({ stem: r`Two imagined delivery vans, P and Q, have mean daily distances of $20$ km and $60$ km, and both have a standard deviation of $6$ km. Which statement about the consistency of their daily distances is correct?`, opts: ['Van Q is more consistent, because its coefficient of variation is smaller.', 'Van P is more consistent, because its mean is smaller.', 'The two vans are equally consistent, because the standard deviations are equal.', 'The consistency cannot be compared without the variances.'], key: 'a', sol: r`The coefficient of variation of P is $\dfrac{6}{20} \times 100 = ${T(cvA)}\%$ and of Q is $\dfrac{6}{60} \times 100 = ${T(cvB)}\%$. The smaller value, $${T(cvB)}\%$, belongs to Q, so Q is more consistent. Equal standard deviations do not mean equal consistency when the means differ.`, d: 4, c: 'analysis', t: [2], time: 90 }), (Cx) => { Cx.assert(same(cvA, 30) && same(cvB, 10) && cvB.cmp(cvA) < 0, 'CV of P is 30%, of Q is 10%'); });
}

function list0(devs) { return devs.map((v) => T(v)).join(', '); }

// =============================================================== assertion-reason
{
  const sets = [FERRY, raw([14, 9, 21, 5, 17, 12, 30]), raw([4, 4, 9, 20])];
  const steps = []; for (let a = 0; a <= 40; a += 0.5) steps.push(a);
  const okAll = sets.every((d) => d.mdMedian.cmp(d.mdMean) <= 0 && steps.every((a) => d.md(a).cmp(d.mdMedian) >= 0));
  Q('ar1', mk.ar({ a: 'For an ungrouped data set, the mean deviation about the median is never larger than the mean deviation about the mean.', r: 'The sum of the absolute deviations of the observations from a point $a$ is least when $a$ is the median.', key: 'a', sol: r`The reason is the true minimum property, and it directly gives the assertion: the median gives the least sum, so the mean deviation about it cannot exceed the one about the mean. For the ferry delays $4.6 \le 4.8$.`, d: 3, c: 'analysis', t: [1] }), (Cx) => { Cx.assert(okAll && same(FERRY.mdMedian, '23/5') && same(FERRY.mdMean, '24/5'), 'median minimises the sum of absolute deviations'); Cx.key('a'); });
}
{
  const d = raw([7, 7, 7, 7]);
  Q('ar2', mk.ar({ a: 'The variance of the observations $7, 7, 7, 7$ is $0$.', r: 'The standard deviation is the positive square root of the variance.', key: 'b', sol: r`Every deviation is $7 - 7 = 0$, so the variance is $0$ and the assertion is true. The reason is also a correct statement, but it only defines the standard deviation; it says nothing about why the deviations vanish.`, d: 2, c: 'understanding', t: [2] }), (Cx) => { Cx.assert(d.variance.eq(0) && d.variance.sqrt().eq(0), 'variance 0'); Cx.key('b'); });
}
{
  Q('ar3', mk.ar({ a: 'If a set of plant heights is measured in centimetres, its standard deviation is also in centimetres.', r: 'The variance of a set of heights in centimetres is also measured in centimetres.', key: 'c', sol: r`The standard deviation is a square root of an average of squared gaps, so it returns to the original unit and the assertion is true. The variance is in square centimetres, so the reason is false.`, d: 2, c: 'understanding', t: [2] }), null, 'units of variance (squared) and standard deviation (original), shown in the solutions of m11');
}
{
  const a = SEED, b = raw(SEED.x.map((x) => x.mul(4)));
  Q('ar4', mk.ar({ a: 'If every observation of a data set is multiplied by $4$, its variance is multiplied by $4$.', r: 'If every observation of a data set is multiplied by $4$, its standard deviation is multiplied by $4$.', key: 'd', sol: r`The standard deviation is multiplied by $4$, so the reason is true. The variance is the square of the standard deviation and is multiplied by $16$, so the assertion is false. For the seedling data the variance changes from $${T(a.variance)}$ to $${T(b.variance)}$.`, d: 3, c: 'analysis', t: [2] }), (Cx) => { Cx.assert(b.variance.eq(a.variance.mul(16)) && b.variance.sqrt().eq(a.variance.sqrt().mul(4)), 'variance x16, SD x4'); Cx.key('d'); });
}
{
  const xs = KIOSK_X, ys = KIOSK_Y;
  Q('ar5', mk.ar({ a: 'To compare the consistency of two data sets that have different means, their standard deviations alone are not enough.', r: 'The coefficient of variation expresses the standard deviation as a percentage of the mean.', key: 'a', sol: r`The coefficient of variation scales the spread by the size of the mean, which is exactly why it can be used when the means differ, so the reason explains the assertion. The first kiosk has the larger standard deviation ($6$ against $4$) but the smaller coefficient of variation ($${T(xs.variance.sqrt().div(xs.mean).mul(100))}\%$ against $${T(ys.variance.sqrt().div(ys.mean).mul(100))}\%$).`, d: 3, c: 'analysis', t: [2] }), (Cx) => { Cx.assert(xs.variance.sqrt().cmp(ys.variance.sqrt()) > 0 && xs.cv2.cmp(ys.cv2) < 0 && same(xs.variance.sqrt().div(xs.mean).mul(100), '15/2') && same(ys.variance.sqrt().div(ys.mean).mul(100), 16), 'larger SD but smaller CV'); Cx.key('a'); });
}
{
  const d = grp(20, 10, [3, 5, 9, 7, 2]);
  Q('ar6', mk.ar({ a: 'For a grouped distribution with the classes $20$–$30$, $30$–$40$, $40$–$50$, $50$–$60$ and $60$–$70$, the range is taken as $70 - 20 = 50$.', r: 'The range of a grouped distribution equals the difference between the greatest and the least class mark.', key: 'c', sol: r`With classes the range is estimated from the class limits, $70 - 20 = ${T(d.range)}$, so the assertion is true. The difference of the extreme class marks is $65 - 25 = ${T(d.x[4].sub(d.x[0]))}$, which is not the range, so the reason is false.`, d: 3, c: 'analysis', t: [1] }), (Cx) => { Cx.assert(same(d.range, 50) && same(d.x[4].sub(d.x[0]), 40), 'range 50 not 40'); Cx.key('c'); });
}

// =============================================================== true-false
{
  const d = raw([12, 15, 9, 21, 18]);
  Q('tf1', mk.tf({ stem: r`True or false: for the five imagined bus-fare amounts $12, 15, 9, 21, 18$ (in rupees), the range is $12$.`, key: 't', sol: r`The greatest fare is $21$ and the least is $9$, so the range is $21 - 9 = ${T(d.range)}$ rupees. The statement is true.`, d: 1, c: 'understanding', t: [1] }), (Cx) => { Cx.assert(same(d.range, 12), 'range 12'); Cx.key('t'); });
}
{
  const d = raw([12, 12, 12, 12, 12]);
  Q('tf2', mk.tf({ stem: r`True or false: a bakery that makes exactly $12$ loaves on each of five days has a variance of $12$ for its daily output.`, key: 'f', sol: r`Every observation equals the mean, so every deviation is $0$ and the variance is $${T(d.variance)}$, not $12$. The statement is false.`, d: 1, c: 'understanding', t: [2] }), (Cx) => { Cx.assert(d.variance.eq(0) && d.mean.eq(12), 'variance 0'); Cx.key('f'); });
}
{
  const d = raw([3, 7, 11]);
  Q('tf3', mk.tf({ stem: r`True or false: the mean deviation of the three imagined temperatures $3, 7, 11$ about their mean is $\dfrac{8}{3}$.`, key: 't', sol: r`The mean is $7$ and the absolute deviations are $4, 0, 4$, so the mean deviation is $\dfrac{8}{3}$. The statement is true.`, d: 2, c: 'application', t: [1] }), (Cx) => { Cx.assert(same(d.mean, 7) && same(d.mdMean, '8/3'), 'MD 8/3'); Cx.key('t'); });
}
{
  const d = raw([1, 1, 2, 9, 12]);
  Q('tf4', mk.tf({ stem: r`True or false: a data set in which most observations lie below the mean can have a negative standard deviation.`, key: 'f', sol: r`The standard deviation is the positive square root of a variance, and the variance is an average of squares, so it cannot be negative. Even for $1, 1, 2, 9, 12$, where most values are below the mean $${T(d.mean)}$, the standard deviation is positive. The statement is false.`, d: 2, c: 'understanding', t: [2] }), (Cx) => { Cx.assert(d.mean.cmp(d.x[2]) > 0 && d.variance.cmp(0) > 0 && d.x.filter((x) => x.cmp(d.mean) < 0).length > 2, 'most below the mean, variance positive'); Cx.key('f'); });
}
{
  const a = raw([5, 9, 14, 22]), b = raw(a.x.map((x) => x.add(30)));
  Q('tf5', mk.tf({ stem: r`True or false: adding $30$ to every reading of an imagined sensor log changes the mean but leaves the standard deviation unchanged.`, key: 't', sol: r`The mean rises by $30$, but each deviation $x - \bar{x}$ stays the same, so the variance and standard deviation do not change. For $5, 9, 14, 22$ the variance is $${T(a.variance)}$ before and after the shift. The statement is true.`, d: 2, c: 'understanding', t: [2] }), (Cx) => { Cx.assert(a.variance.eq(b.variance) && !a.mean.eq(b.mean), 'variance unchanged by a shift'); Cx.key('t'); });
}
{
  const xs = KIOSK_X, ys = KIOSK_Y;
  Q('tf6', mk.tf({ stem: r`True or false: of two data sets, the one with the larger standard deviation always has the larger coefficient of variation.`, key: 'f', sol: r`The coefficient of variation also depends on the mean. The first kiosk's sales have standard deviation $6$ and coefficient of variation $${T(xs.variance.sqrt().div(xs.mean).mul(100))}\%$, while the second kiosk's sales have standard deviation $4$ and coefficient of variation $${T(ys.variance.sqrt().div(ys.mean).mul(100))}\%$, so the larger standard deviation has the smaller coefficient. The statement is false.`, d: 3, c: 'analysis', t: [2] }), (Cx) => { Cx.assert(xs.variance.sqrt().cmp(ys.variance.sqrt()) > 0 && xs.cv2.cmp(ys.cv2) < 0, 'counter-example'); Cx.key('f'); });
}

// =============================================================== fill in the blank
{
  const d = raw([34, 27, 45, 19, 38]);
  Q('fb1', mk.fill({ stem: r`The range of the imagined quiz scores $34, 27, 45, 19, 38$ is ____.`, acc: [['26', '$26$']], sol: r`Range $= 45 - 19 = ${T(d.range)}$.`, d: 1, c: 'understanding', t: [1], time: 45 }), (Cx) => { Cx.assert(same(d.range, 26), 'range 26'); Cx.blank(26); });
}
{
  Q('fb2', mk.fill({ stem: r`A data set of imagined bridge-load readings has variance $81$, so its standard deviation is ____.`, acc: [['9', '$9$']], sol: r`The standard deviation is $\sqrt{81} = 9$.`, d: 1, c: 'understanding', t: [2], time: 45 }), (Cx) => { Cx.assert(fr(81).sqrt().eq(9), 'sqrt 81 = 9'); Cx.blank(9); });
}
{
  const d = raw([5, 8, 14]);
  const dev = d.x.map((x) => x.sub(d.mean));
  Q('fb3', mk.fill({ stem: r`The signed deviations of the imagined cycle speeds $5, 8, 14$ from their mean add up to ____.`, acc: [['0', '$0$']], sol: r`The mean is $9$, the deviations are $${list0(dev)}$, and their sum is $0$.`, d: 2, c: 'understanding', t: [1], time: 45 }), (Cx) => { Cx.assert(same(d.mean, 9) && sumOf(dev).eq(0), 'sum 0'); Cx.blank(0); });
}
{
  Q('fb4', mk.fill({ stem: r`A batch of imagined bulbs has mean life $50$ hours and standard deviation $4$ hours, so the coefficient of variation of the batch is ____ per cent.`, acc: [['8', '$8$']], sol: r`The coefficient of variation is $\dfrac{4}{50} \times 100 = 8$ per cent.`, d: 2, c: 'understanding', t: [2], time: 45 }), (Cx) => { Cx.assert(fr(4).div(50).mul(100).eq(8), 'CV 8'); Cx.blank(8); });
}
{
  const d = raw([2, 5, 9, 14, 20]);
  const tot = d.sumF((x) => x.sub(d.mean).abs());
  Q('fb5', mk.fill({ stem: r`The mean deviation about the mean of the imagined jump lengths $2, 5, 9, 14, 20$ is ____.`, acc: [['5.6', '$5.6$', '28/5']], sol: r`The mean is $${T(d.mean)}$, the absolute deviations $8, 5, 1, 4, 10$ add to $${T(tot)}$, and the mean deviation is $\dfrac{${T(tot)}}{5} = ${T(d.mdMean)}$ (that is $\dfrac{28}{5}$).`, d: 2, c: 'application', t: [1], time: 60 }), (Cx) => { Cx.assert(same(d.mean, 10) && same(tot, 28) && same(d.mdMean, '28/5'), 'MD 5.6'); Cx.blank(5.6); });
}
{
  const n = 10, sx = 60, sx2 = 500;
  const v = fr(sx2).div(n).sub(fr(sx).div(n).pow(2));
  Q('fb6', mk.fill({ stem: r`For ten imagined seed weights, $\sum x = 60$ and $\sum x^2 = 500$, so the variance of the weights is ____.`, acc: [['14', '$14$']], sol: r`Variance $= \dfrac{500}{10} - \left(\dfrac{60}{10}\right)^2 = 50 - 36 = ${T(v)}$.`, d: 2, c: 'understanding', t: [2], time: 60 }), (Cx) => { Cx.assert(same(v, 14), 'variance 14'); Cx.blank(14); });
}
