// CBSE 11 Mathematics ch13 Statistics — long answers (5 marks) and case-based questions (1 + 1 + 2 with an either/or part (c)).
import { Q, mk, caseQ, child, r } from './lib.mjs';
import { Dist, fr, T, sumOf, freqMd, mdTable, stepTable, cls } from './stat.mjs';

export { r };
const N = (x) => fr(x).num();
const raw = (xs) => Dist.raw(xs);
const disc = (v, f) => Dist.discrete(v, f);
const grp = (lo, h, f) => Dist.grouped(lo, h, f);
const same = (a, b) => fr(a).eq(b);
const L = (xs) => xs.map((v) => T(v)).join(', ');
const absDev = (d, a) => d.x.map((x) => x.sub(a).abs());
const sqDev = (d, a) => d.x.map((x) => x.sub(a).pow(2));
const distinct = (vals) => new Set(vals.map((v) => fr(v).toString())).size === vals.length;
const V = (x) => `$${T(x)}$`;
/** Markdown table of a calculation, built from the same engine rows. */
const mdt = (t) => `| ${t.head.join(' | ')} |\n|${'---|'.repeat(t.head.length)}\n${t.rows.map((row) => `| ${row.join(' | ')} |`).join('\n')}`;

// =============================================================== long answer, 5 marks
{
  const d = raw([24, 13, 35, 16, 11, 28, 14, 19]);
  const s = [...d.x].sort((p, q) => p.cmp(q));
  const tm = d.sumF((x) => x.sub(d.mean).abs()), tn = d.sumF((x) => x.sub(d.median).abs());
  Q('l01', mk.long({ stem: r`An imagined food truck served $24, 13, 35, 16, 11, 28, 14, 19$ customers on eight days. Find the mean deviation about the mean and the mean deviation about the median, and state which is smaller.`, model: r`**Mean.** $\sum x = ${T(d.sumFx)}$, so $\bar{x} = \dfrac{${T(d.sumFx)}}{8} = ${T(d.mean)}$.

**Median.** In order the values are $${L(s)}$, so the median is $\dfrac{16 + 19}{2} = ${T(d.median)}$.

**About the mean.** The absolute deviations $|x - 20|$ are $${L(absDev(d, d.mean))}$ with total $${T(tm)}$, so the mean deviation is $\dfrac{${T(tm)}}{8} = ${T(d.mdMean)}$.

**About the median.** The absolute deviations $|x - 17.5|$ are $${L(absDev(d, d.median))}$ with total $${T(tn)}$, so the mean deviation is $\dfrac{${T(tn)}}{8} = ${T(d.mdMedian)}$.

The mean deviation about the median, $${T(d.mdMedian)}$, is smaller than the one about the mean, $${T(d.mdMean)}$.`, sol: 'The same formula is used about two centres; the median gives the smaller total.', scheme: [['Mean 20', 1], ['Ordered list and median 17.5', 1], ['Mean deviation about the mean 6.75', 1], ['Mean deviation about the median 6.5', 1], ['Comparison stated', 1]], d: 3, c: 'application', t: [1], time: 300 }), (Cx) => { Cx.assert(same(d.mean, 20) && same(d.median, '35/2') && same(tm, 54) && same(tn, 52) && same(d.mdMean, '27/4') && same(d.mdMedian, '13/2') && d.mdMedian.cmp(d.mdMean) < 0, 'MD 6.75 and 6.5'); Cx.model([20, 17.5, 54, 6.75, 52, 6.5]); });
}
{
  const d = disc([15, 20, 25, 30, 35, 40], [10, 3, 4, 11, 8, 4]);
  const t = mdt(mdTable(d, d.mean, '27'));
  const tot = d.sumF((x) => x.sub(d.mean).abs());
  Q('l02', mk.long({ stem: r`The number of imagined text messages sent in an hour by $40$ club members is shown.

${freqMd(d, { first: 'Messages', second: 'Members' })}

Find the mean deviation about the mean, and state the percentage of members whose count lies within one mean deviation of the mean (that is, between $27 - 7.45$ and $27 + 7.45$).`, model: r`**Mean.** $\sum fx = ${T(d.sumFx)}$ and $n = 40$, so $\bar{x} = \dfrac{${T(d.sumFx)}}{40} = ${T(d.mean)}$.

**Deviations.**

${t}

**Mean deviation.** $\dfrac{\sum f|x - \bar{x}|}{\sum f} = \dfrac{${T(tot)}}{40} = ${T(d.mdMean)}$.

**Interval.** $27 - 7.45 = 19.55$ and $27 + 7.45 = 34.45$, so the counts $20, 25, 30$ lie inside, with frequencies $3 + 4 + 11 = 18$. The percentage is $\dfrac{18}{40} \times 100 = 45\%$.`, sol: 'Weighted absolute deviations about the mean, then the counts inside the interval.', scheme: [['Mean 27', 1], ['Absolute deviations |x - 27|', 1], ['Sum f|x - 27| = 298', 1], ['Mean deviation 7.45', 1], ['45 per cent inside the interval', 1]], d: 4, c: 'application', t: [1], time: 360 }), (Cx) => { const inside = d.x.reduce((s, x, i) => (x.cmp(fr(27).sub('149/20')) > 0 && x.cmp(fr(27).add('149/20')) < 0 ? s.add(d.f[i]) : s), fr(0)); Cx.assert(same(d.mean, 27) && same(tot, 298) && same(d.mdMean, '149/20') && same(inside, 18) && same(inside.div(d.n).mul(100), 45), 'MD 7.45, 45 per cent'); Cx.model([27, 298, 7.45, 19.55, 34.45, 18, 45]); });
}
{
  const d = grp(0, 20, [7, 9, 8, 7, 9]);
  const cf = d.cumF();
  const t = mdt(mdTable(d, d.median, 'M'));
  const tot = d.sumF((x) => x.sub(d.median).abs());
  Q('l03', mk.long({ stem: r`The weekly distances (in km) cycled by $40$ imagined commuters are grouped below.

${freqMd(d, { first: 'Distance (km)', second: 'Commuters' })}

Find the median and the mean deviation about the median.`, model: r`**Median.** The cumulative frequencies are $${L(cf)}$. Since $\dfrac{n}{2} = 20$, the median class is $40$–$60$ with $l = 40$, $cf = 16$, $f = 8$, $h = 20$. Median $= 40 + \dfrac{20 - 16}{8} \times 20 = ${T(d.median)}$.

**Deviations.** Using the class marks:

${t}

**Mean deviation.** $\dfrac{\sum f|x - M|}{\sum f} = \dfrac{${T(tot)}}{40} = ${T(d.mdMedian)}$ km.`, sol: 'Median class from cumulative frequency, then weighted absolute gaps of the class marks.', scheme: [['Cumulative frequencies and the median class 40-60', 1], ['Median 50', 1], ['|x - 50| for the class marks', 1], ['Sum f|x - 50| = 960', 1], ['Mean deviation 24 km', 1]], d: 4, c: 'application', t: [1], time: 360 }), (Cx) => { Cx.assert(same(d.median, 50) && d.medianClass === 2 && same(cf[1], 16) && same(tot, 960) && same(d.mdMedian, 24), 'median 50, MD 24'); Cx.model([16, 50, 960, 24]); });
}
{
  const d = disc([2, 4, 6, 8, 10, 12], [2, 13, 12, 8, 12, 3]);
  const t = mdt(stepTable(d, 6, 2));
  const su = d.sumF((x) => x.sub(6).div(2)), su2 = d.sumF((x) => x.sub(6).div(2).pow(2));
  Q('l04', mk.long({ stem: r`The imagined number of goals scored by a school hockey team in each of $50$ matches is recorded.

${freqMd(d, { first: 'Goals', second: 'Matches' })}

Using $A = 6$ and $h = 2$, find the mean, the variance and the standard deviation of the number of goals.`, model: r`Take $u = \dfrac{x - 6}{2}$.

${t}

**Mean.** $\bar{x} = A + h\dfrac{\sum fu}{n} = 6 + 2 \times \dfrac{${T(su)}}{50} = ${T(d.mean)}$.

**Variance.** $\sigma^2 = h^2\left[\dfrac{\sum fu^2}{n} - \left(\dfrac{\sum fu}{n}\right)^2\right] = 4\left[\dfrac{${T(su2)}}{50} - \left(\dfrac{${T(su)}}{50}\right)^2\right] = ${T(d.variance)}$.

**Standard deviation.** $\sigma = \sqrt{${T(d.variance)}} = ${T(d.variance.sqrt())}$.`, sol: 'Step deviations keep the sums small; the shortcut formula then gives the variance.', scheme: [['u values and fu, fu^2 columns', 1], ['sum fu = 24 and sum fu^2 = 104', 1], ['Mean 6.96', 1], ['Variance 7.3984', 1], ['Standard deviation 2.72', 1]], d: 4, c: 'application', t: [2], time: 420 }), (Cx) => { Cx.assert(d.verify(6, 2).eq(d.variance) && same(d.mean, '174/25') && same(d.variance, '4624/625') && d.variance.sqrt().eq('68/25'), 'SD 2.72'); Cx.model([su.num(), su2.num(), 6.96, 7.3984, 2.72]); });
}
{
  const d = grp(40, 8, [2, 4, 10, 10, 14]);
  const t = mdt(stepTable(d, 60, 8));
  const su = d.sumF((x) => x.sub(60).div(8)), su2 = d.sumF((x) => x.sub(60).div(8).pow(2));
  Q('l05', mk.long({ stem: r`The times (in minutes) taken by $40$ imagined students to solve a puzzle are grouped below.

${freqMd(d, { first: 'Time (min)', second: 'Students' })}

Taking $A = 60$ and $h = 8$, find the variance and the standard deviation correct to two decimal places.`, model: r`The class marks are $44, 52, 60, 68, 76$; let $u = \dfrac{x - 60}{8}$.

${t}

**Variance.** $\sigma^2 = h^2\left[\dfrac{\sum fu^2}{n} - \left(\dfrac{\sum fu}{n}\right)^2\right] = 64\left[\dfrac{${T(su2)}}{40} - \left(\dfrac{${T(su)}}{40}\right)^2\right] = ${T(d.variance)}$.

**Standard deviation.** $\sigma = \sqrt{${T(d.variance)}} \approx ${d.variance.sqrtRound(2)}$ minutes.`, sol: 'Class marks, step deviations, then the shortcut formula.', scheme: [['Class marks and u values', 1], ['sum fu = 30 and sum fu^2 = 78', 1], ['Substituting in the formula', 1], ['Variance 88.8', 1], ['Standard deviation about 9.42', 1]], d: 4, c: 'application', t: [2], time: 420 }), (Cx) => { Cx.assert(d.verify(60, 8).eq(d.variance) && same(d.variance, '444/5') && d.variance.sqrtRound(2) === '9.42' && same(d.mean, 66), 'variance 88.8, SD 9.42'); Cx.model([su.num(), su2.num(), 88.8, 9.42]); });
}
{
  const a = raw([9, 10, 13, 12, 18, 10]), b = raw([18, 30, 22, 12, 22, 28]);
  const sa = a.variance.sqrt(), sb = b.variance.sqrt();
  const cva = sa.div(a.mean).mul(100), cvb = sb.div(b.mean).mul(100);
  Q('l06', mk.long({ stem: r`Two imagined delivery riders log the number of parcels per day over six days. Rider P: $9, 10, 13, 12, 18, 10$. Rider Q: $18, 30, 22, 12, 22, 28$. Find the mean and standard deviation of each, and decide, using the coefficient of variation, which rider is more consistent.`, model: r`**Rider P.** Mean $= \dfrac{72}{6} = ${T(a.mean)}$; squared deviations $${L(sqDev(a, a.mean))}$ add to $${T(sumOf(sqDev(a, a.mean)))}$; variance $= \dfrac{54}{6} = ${T(a.variance)}$; standard deviation $= ${T(sa)}$.

**Rider Q.** Mean $= \dfrac{132}{6} = ${T(b.mean)}$; squared deviations $${L(sqDev(b, b.mean))}$ add to $${T(sumOf(sqDev(b, b.mean)))}$; variance $= \dfrac{216}{6} = ${T(b.variance)}$; standard deviation $= ${T(sb)}$.

**Coefficients of variation.** P: $\dfrac{3}{12} \times 100 = ${T(cva)}\%$. Q: $\dfrac{6}{22} \times 100 \approx ${cvb.round(2)}\%$.

Since $${T(cva)} < ${cvb.round(2)}$, rider P is more consistent, although Q delivers more parcels on average.`, sol: 'Mean and SD of each set, then compare coefficients of variation.', scheme: [['Mean and standard deviation of P: 12 and 3', 1], ['Mean and standard deviation of Q: 22 and 6', 1], ['Coefficient of variation of P is 25 per cent', 1], ['Coefficient of variation of Q is about 27.27 per cent', 1], ['P is more consistent', 1]], d: 4, c: 'analysis', t: [2], time: 420 }), (Cx) => { Cx.assert(same(a.mean, 12) && same(a.variance, 9) && sa.eq(3) && same(b.mean, 22) && same(b.variance, 36) && sb.eq(6) && same(cva, 25) && cvb.round(2) === '27.27' && cva.cmp(cvb) < 0, 'CV 25 and 27.27'); Cx.model([12, 54, 9, 3, 22, 216, 36, 6, 25, 27.27]); });
}
{
  const n = 6, sx = 78, sx2 = 1170;
  const m = fr(sx).div(n), v = fr(sx2).div(n).sub(m.pow(2));
  const probes = [raw([3, 8, 8, 15, 21]), raw([5, 11, 11, 13, 17, 29]), raw([2, 2, 9, 30])];
  const ident = probes.every((d) => sumOf(sqDev(d, d.mean)).eq(d.sumF((x) => x.pow(2)).sub(d.n.mul(d.mean.pow(2)))));
  Q('l07', mk.long({ stem: r`Show that $\sum (x_i - \bar{x})^2 = \sum x_i^2 - n\bar{x}^2$ for $n$ observations with mean $\bar{x}$, and hence that the variance is $\dfrac{\sum x_i^2}{n} - \bar{x}^2$. Use the result to find the variance of six imagined sensor readings with $\sum x = 78$ and $\sum x^2 = 1170$.`, model: r`**Expand.** $(x_i - \bar{x})^2 = x_i^2 - 2\bar{x}x_i + \bar{x}^2$.

**Add over all $n$ terms.** $\sum (x_i - \bar{x})^2 = \sum x_i^2 - 2\bar{x}\sum x_i + n\bar{x}^2$.

**Use $\sum x_i = n\bar{x}$.** The middle term is $-2n\bar{x}^2$, so $\sum (x_i - \bar{x})^2 = \sum x_i^2 - 2n\bar{x}^2 + n\bar{x}^2 = \sum x_i^2 - n\bar{x}^2$.

**Divide by $n$.** $\sigma^2 = \dfrac{\sum x_i^2}{n} - \bar{x}^2$.

**Numbers.** $\bar{x} = \dfrac{78}{6} = ${T(m)}$ and $\dfrac{\sum x^2}{6} = \dfrac{1170}{6} = ${T(fr(sx2).div(n))}$, so $\sigma^2 = 195 - 13^2 = 195 - 169 = ${T(v)}$.`, sol: 'Expand the square, sum term by term and replace the sum of x by n times the mean.', scheme: [['Square expanded', 1], ['Summed over all terms', 1], ['Replacing the sum by n times the mean', 1], ['Dividing by n to reach the formula', 1], ['Variance 195 - 169 = 26', 1]], d: 4, c: 'analysis', t: [2], time: 360 }), (Cx) => { Cx.assert(ident && same(m, 13) && same(v, 26), 'identity holds on test sets; variance 26'); Cx.model([195, 169, 26]); });
}

// =============================================================== case-based questions
{
  const d = raw([6, 15, 22, 23, 23, 25, 27, 35]);
  const s = [...d.x].sort((p, q) => p.cmp(q));
  const vals = [N(d.range), 35, 14.5, 6];
  const tn = d.sumF((x) => x.sub(d.median).abs()), tm = d.sumF((x) => x.sub(d.mean).abs());
  caseQ('c01', {
    passage: r`An imagined rider for a grocery app completed $6, 15, 22, 23, 23, 25, 27$ and $35$ deliveries on eight consecutive days. The manager wants to describe how much the rider's daily workload varies.`,
    d: 3, c: 'application',
    model: r`(a) Option (a). (b) $${T(d.mean)}$. (c) (i) Median $23$; absolute deviations $${L(absDev(d, d.median))}$ add to $${T(tn)}$; mean deviation $\dfrac{${T(tn)}}{8} = ${T(d.mdMedian)}$. Or (ii) Mean $22$; absolute deviations $${L(absDev(d, d.mean))}$ add to $${T(tm)}$; mean deviation $\dfrac{${T(tm)}}{8} = ${T(d.mdMean)}$.`,
    sol: r`(a) Range $= 35 - 6 = 29$. (b) $\sum x = 176$, so the mean is $\dfrac{176}{8} = 22$. (c) The two choices of centre give $5.5$ and $5.75$.`,
    children: [
      child('a', mk.mcq({ stem: 'The range of the rider\'s daily deliveries is', opts: vals.map(V), key: 'a', sol: r`Range $= 35 - 6 = ${T(d.range)}$. The value $35$ is only the greatest count, $14.5$ is half the range, and $6$ is the least count.`, d: 1, c: 'application', t: [1], time: 45 })),
      child('b', mk.num({ stem: 'Find the mean number of deliveries per day.', value: 22, sol: r`$\bar{x} = \dfrac{6 + 15 + 22 + 23 + 23 + 25 + 27 + 35}{8} = \dfrac{176}{8} = ${T(d.mean)}$.`, scheme: [['Mean 22', 1]], d: 2, c: 'application', t: [1], time: 60 })),
      child('c', mk.short({ marks: 2, stem: r`**(i)** Find the mean deviation about the median.`, model: r`In order: $${L(s)}$, so the median is $\dfrac{23 + 23}{2} = ${T(d.median)}$. The absolute deviations are $${L(absDev(d, d.median))}$ with total $${T(tn)}$, so the mean deviation is $\dfrac{${T(tn)}}{8} = ${T(d.mdMedian)}$.`, sol: 'Order the data, find the median, then average the absolute gaps.', scheme: [['Median 23 and absolute deviations, total 44', 1], ['Mean deviation 5.5', 1]], d: 3, c: 'application', t: [1], time: 90 }), [
        mk.short({ marks: 2, stem: r`**(ii)** Find the mean deviation about the mean.`, model: r`The mean is $${T(d.mean)}$. The absolute deviations are $${L(absDev(d, d.mean))}$ with total $${T(tm)}$, so the mean deviation is $\dfrac{${T(tm)}}{8} = ${T(d.mdMean)}$.`, sol: 'Use the mean as the centre this time.', scheme: [['Absolute deviations about 22, total 46', 1], ['Mean deviation 5.75', 1]], d: 3, c: 'application', t: [1], time: 90 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which([N(d.range), 35, 14.5, 6], 29);
    Cx.child('b').val(N(d.mean));
    Cx.child('c').assert(same(d.median, 23) && same(tn, 44) && same(d.mdMedian, '11/2'), 'MD about median 5.5');
    Cx.child('c').model([23, 44, 5.5]);
    Cx.child('cii').assert(same(d.mean, 22) && same(tm, 46) && same(d.mdMean, '23/4'), 'MD about mean 5.75');
    Cx.child('cii').model([22, 46, 5.75]);
  });
}
{
  const d = grp(30, 10, [5, 8, 7, 14, 6]);
  const tot = d.sumF((x) => x.sub(d.mean).abs());
  const su = d.sumF((x) => x.sub(55).div(10)), su2 = d.sumF((x) => x.sub(55).div(10).pow(2));
  const totM = d.sumF((x) => x.sub(d.median).abs());
  const vals = [N(d.mean), 55, N(d.sumFx), 52.5];
  caseQ('c02', {
    passage: r`An imagined online quiz was taken by $40$ players, and the time each spent (in seconds) is grouped below.

${freqMd(d, { first: 'Time (s)', second: 'Players' })}`,
    d: 3, c: 'application',
    model: r`(a) Option (a). (b) $${T(tot)}$. (c) (i) With $A = 55$ and $h = 10$: $\sum fu = ${T(su)}$, $\sum fu^2 = ${T(su2)}$, variance $= 100\left[\dfrac{${T(su2)}}{40} - \left(\dfrac{${T(su)}}{40}\right)^2\right] = ${T(d.variance)}$ and the standard deviation is about $${d.variance.sqrtRound(2)}$. Or (ii) The median class is $50$–$60$ and the median is $50 + \dfrac{20 - 13}{7} \times 10 = ${T(d.median)}$; $\sum f|x - 60| = ${T(totM)}$, so the mean deviation about the median is $\dfrac{${T(totM)}}{40} = ${T(d.mdMedian)}$ seconds.`,
    sol: r`(a) $\sum fx = ${T(d.sumFx)}$, so the mean is $57$. (b) The deviations $|x - 57|$ of the class marks weighted by frequency add to $440$. (c) Variance $161$ and SD about $12.69$, or a median $60$ with mean deviation $11$.`,
    children: [
      child('a', mk.mcq({ stem: 'The mean time taken by the players is', opts: vals.map((x) => `$${T(x)}$ seconds`), key: 'a', sol: r`The class marks are $35, 45, 55, 65, 75$, so $\sum fx = ${T(d.sumFx)}$ and the mean is $\dfrac{${T(d.sumFx)}}{40} = ${T(d.mean)}$. The value $55$ is just the middle class mark, $${T(d.sumFx)}$ forgets to divide, and $52.5$ is the mean of the class marks without frequencies being used properly.`, d: 2, c: 'application', t: [1], time: 90 })),
      child('b', mk.num({ stem: r`Find $\sum f|x - \bar{x}|$ for the distribution, using the class marks.`, value: 440, sol: r`With $\bar{x} = 57$ the products $f|x - 57|$ are $${L(d.x.map((x, i) => d.f[i].mul(x.sub(d.mean).abs())))}$, so $\sum f|x - 57| = ${d.x.map((x, i) => T(d.f[i].mul(x.sub(d.mean).abs()))).join(' + ')} = ${T(tot)}$.`, scheme: [['Sum of f|x - 57| = 440', 1]], d: 3, c: 'application', t: [1], time: 120 })),
      child('c', mk.short({ marks: 2, stem: r`**(i)** Using $A = 55$ and $h = 10$, find the variance and the standard deviation, correct to two decimal places.`, model: r`The values $u = \dfrac{x - 55}{10}$ are $-2, -1, 0, 1, 2$, so $\sum fu = ${T(su)}$ and $\sum fu^2 = ${T(su2)}$. Variance $= 100\left[\dfrac{${T(su2)}}{40} - \left(\dfrac{${T(su)}}{40}\right)^2\right] = ${T(d.variance)}$ and the standard deviation is $\sqrt{${T(d.variance)}} \approx ${d.variance.sqrtRound(2)}$ seconds.`, sol: 'Step deviations about the middle class mark.', scheme: [['sum fu = 8 and sum fu^2 = 66', 1], ['Variance 161, standard deviation about 12.69', 1]], d: 3, c: 'application', t: [2], time: 120 }), [
        mk.short({ marks: 2, stem: r`**(ii)** Find the median time and the mean deviation about the median.`, model: r`The cumulative frequencies are $5, 13, 20, 34, 40$, so the median class is $50$–$60$ and the median is $50 + \dfrac{20 - 13}{7} \times 10 = ${T(d.median)}$. The sum $\sum f|x - 60|$ is $${T(totM)}$, so the mean deviation about the median is $\dfrac{${T(totM)}}{40} = ${T(d.mdMedian)}$ seconds.`, sol: 'Median from the cumulative frequencies, then weighted gaps.', scheme: [['Median 60', 1], ['Mean deviation 11', 1]], d: 3, c: 'application', t: [1], time: 120 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which(vals.map(N), 57);
    Cx.child('b').val(N(tot));
    Cx.child('c').assert(d.verify(55, 10).eq(d.variance) && same(su, 8) && same(su2, 66) && same(d.variance, 161) && d.variance.sqrtRound(2) === '12.69', 'variance 161, SD 12.69');
    Cx.child('c').model([8, 66, 161, 12.69]);
    Cx.child('cii').assert(same(d.median, 60) && same(totM, 440) && same(d.mdMedian, 11) && d.medianClass === 2, 'median 60, MD 11');
    Cx.child('cii').model([13, 60, 440, 11]);
  });
}
