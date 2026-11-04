// CBSE 11 Mathematics ch13 Statistics — numerical, short-answer (2 and 3 marks). Working is in model_answer_md (D-032).
import { Q, mk, r } from './lib.mjs';
import { Dist, fr, T, sumOf, freqMd } from './stat.mjs';

export { r };
const N = (x) => fr(x).num();
const raw = (xs) => Dist.raw(xs);
const disc = (v, f) => Dist.discrete(v, f);
const grp = (lo, h, f) => Dist.grouped(lo, h, f);
const same = (a, b) => fr(a).eq(b);
const L = (xs) => xs.map((v) => T(v)).join(', ');
const absDev = (d, a) => d.x.map((x) => x.sub(a).abs());
const sqDev = (d, a) => d.x.map((x) => x.sub(a).pow(2));

// =============================================================== numerical
{
  const d = raw([16, 22, 9, 35, 13]);
  const tot = d.sumF((x) => x.sub(d.mean).abs());
  Q('n1', mk.num({ stem: r`An imagined courier made $16, 22, 9, 35, 13$ deliveries on five days. Find the mean deviation of the deliveries about their mean.`, value: 7.6, sol: r`The mean is $\dfrac{95}{5} = ${T(d.mean)}$ and the absolute deviations are $${L(absDev(d, d.mean))}$ with total $${T(tot)}$. Mean deviation $= \dfrac{${T(tot)}}{5} = ${T(d.mdMean)}$.`, scheme: [['Mean 19 and absolute deviations, total 38', 1]], d: 2, c: 'application', t: [1], time: 90 }), (Cx) => { Cx.assert(same(d.mean, 19) && same(tot, 38), 'mean 19, total 38'); Cx.val(N(d.mdMean)); });
}
{
  const d = raw([3, 9, 4, 12, 7]);
  const tot = sumOf(sqDev(d, d.mean));
  Q('n2', mk.num({ stem: r`Five imagined lab trials took $3, 9, 4, 12, 7$ minutes. Find the variance of the times, in square minutes.`, value: 10.8, sol: r`The mean is $${T(d.mean)}$ and the squared deviations are $${L(sqDev(d, d.mean))}$ with total $${T(tot)}$. Variance $= \dfrac{${T(tot)}}{5} = ${T(d.variance)}$.`, scheme: [['Mean 7 and squared deviations, total 54', 1]], d: 2, c: 'application', t: [2], time: 90 }), (Cx) => { Cx.assert(same(d.mean, 7) && same(tot, 54) && same(d.varianceShortcut, d.variance), 'variance 54/5'); Cx.val(N(d.variance)); });
}
{
  const d = raw([72, 83, 74, 75, 74, 66]);
  const tot = sumOf(sqDev(d, d.mean));
  Q('n3', mk.num({ stem: r`An imagined athlete's resting pulse readings on six mornings were $72, 83, 74, 75, 74, 66$ beats per minute. Find the standard deviation.`, value: 5, unit: 'beats per minute', sol: r`The mean is $${T(d.mean)}$, the squared deviations are $${L(sqDev(d, d.mean))}$ with total $${T(tot)}$, so the variance is $\dfrac{${T(tot)}}{6} = ${T(d.variance)}$ and the standard deviation is $\sqrt{${T(d.variance)}} = 5$.`, scheme: [['Variance 25', 1]], d: 2, c: 'application', t: [2], time: 105 }), (Cx) => { Cx.assert(same(d.mean, 74) && same(tot, 150) && d.variance.sqrt().eq(5), 'SD 5'); Cx.val(5); });
}
{
  const d = grp(30, 10, [8, 14, 6, 14, 8]);
  const tot = d.sumF((x) => x.sub(d.mean).abs());
  Q('n4', mk.num({ stem: r`The seconds taken by $50$ imagined workers to assemble a toy kit are grouped as below.

${freqMd(d, { first: 'Time (s)' })}

Find the mean deviation about the mean.`, value: 12, unit: 'seconds', sol: r`Class marks $35, 45, 55, 65, 75$ give $\bar{x} = \dfrac{${T(d.sumFx)}}{50} = ${T(d.mean)}$. Then $\sum f|x - \bar{x}| = ${T(tot)}$ and the mean deviation is $\dfrac{${T(tot)}}{50} = ${T(d.mdMean)}$.`, scheme: [['Mean 55 and sum of f|x - mean| = 600', 1]], d: 3, c: 'application', t: [1], time: 120 }), (Cx) => { Cx.assert(same(d.mean, 55) && same(tot, 600) && same(d.mdMean, 12), 'MD 12'); Cx.val(12); });
}
{
  const d = disc([2, 4, 6, 8, 10, 12], [2, 7, 8, 13, 7, 13]);
  Q('n5', mk.num({ stem: r`An imagined book fair recorded the number of books bought per visitor.

${freqMd(d, { first: 'Books bought', second: 'Visitors' })}

Find the standard deviation of the number of books bought.`, value: 3, sol: r`With $A = 6$ and $h = 2$, $u = \dfrac{x - 6}{2}$ gives $\sum fu = ${T(d.sumF((x) => x.sub(6).div(2)))}$ and $\sum fu^2 = ${T(d.sumF((x) => x.sub(6).div(2).pow(2)))}$. Variance $= 4\left[\dfrac{${T(d.sumF((x) => x.sub(6).div(2).pow(2)))}}{50} - \left(\dfrac{${T(d.sumF((x) => x.sub(6).div(2)))}}{50}\right)^2\right] = ${T(d.variance)}$, so the standard deviation is $\sqrt{${T(d.variance)}} = 3$.`, scheme: [['Sums of fu and fu^2', 1]], d: 3, c: 'application', t: [2], time: 150 }), (Cx) => { Cx.assert(same(d.n, 50) && same(d.variance, 9) && d.verify(6, 2).eq(9), 'SD 3'); Cx.val(3); });
}
{
  const mean = 25, v = 9, sd = fr(v).sqrt(), cv = sd.div(mean).mul(100);
  Q('n6', mk.num({ stem: r`An imagined tailor's daily orders have mean $25$ and variance $9$. Find the coefficient of variation of the daily orders, in per cent.`, value: 12, unit: '%', sol: r`The standard deviation is $\sqrt{9} = ${T(sd)}$. Coefficient of variation $= \dfrac{3}{25} \times 100 = ${T(cv)}$ per cent.`, scheme: [['SD 3 and CV 12 per cent', 1]], d: 2, c: 'understanding', t: [2], time: 75 }), (Cx) => { Cx.assert(same(cv, 12), 'CV 12'); Cx.val(12); });
}

// =============================================================== short answer, 2 marks
{
  const d = raw([14, 22, 9, 31, 17, 12, 25, 19, 11]);
  const e = raw(d.x.map((x) => (x.eq(31) ? 60 : x)));
  Q('s201', mk.short({ marks: 2, stem: r`An imagined hospital ward admitted $14, 22, 9, 31, 17, 12, 25, 19, 11$ patients on nine days. Find the range. If the greatest value $31$ is replaced by $60$, find the new range and say what this shows.`, model: r`Range $= 31 - 9 = ${T(d.range)}$. With $60$ in place of $31$ the range is $60 - 9 = ${T(e.range)}$. One extreme value changes the range a great deal, because the range depends only on the greatest and the least observations.`, sol: 'Subtract the least from the greatest each time.', scheme: [['Range 22 and new range 51', 1], ['Range depends only on the two extreme values', 1]], d: 2, c: 'understanding', t: [1], time: 90 }), (Cx) => { Cx.assert(same(d.range, 22) && same(e.range, 51), 'ranges 22 and 51'); Cx.model([22, 51, 31, 9, 60]); });
}
{
  const d = raw([5, 9, 13, 17, 26]);
  const tot = d.sumF((x) => x.sub(d.mean).abs());
  Q('s202', mk.short({ marks: 2, stem: r`The imagined daily footfall (in hundreds) at a stall on five days was $5, 9, 13, 17, 26$. Find the mean deviation about the mean.`, model: r`Mean $= \dfrac{70}{5} = ${T(d.mean)}$. Absolute deviations: $${L(absDev(d, d.mean))}$, total $${T(tot)}$. Mean deviation $= \dfrac{${T(tot)}}{5} = ${T(d.mdMean)}$.`, sol: 'Find the mean first, then average the absolute gaps.', scheme: [['Mean 14 and the absolute deviations', 1], ['Total 30, mean deviation 6', 1]], d: 2, c: 'application', t: [1], time: 90 }), (Cx) => { Cx.assert(same(d.mean, 14) && same(tot, 30) && same(d.mdMean, 6), 'MD 6'); Cx.model([14, 30, 6]); });
}
{
  const d = raw([8, 12, 5, 20, 15, 10]);
  const s = [...d.x].sort((p, q) => p.cmp(q));
  const tot = d.sumF((x) => x.sub(d.median).abs());
  Q('s203', mk.short({ marks: 2, stem: r`Six imagined runners finished a trial in $8, 12, 5, 20, 15, 10$ minutes. Find the mean deviation about the median.`, model: r`In order the times are $${L(s)}$, so the median is $\dfrac{10 + 12}{2} = ${T(d.median)}$. Absolute deviations: $${L(absDev(d, d.median))}$, total $${T(tot)}$. Mean deviation $= \dfrac{${T(tot)}}{6} = ${T(d.mdMedian)}$ minutes.`, sol: 'Arrange in order before taking the middle two values.', scheme: [['Ordered list, median 11', 1], ['Total 24, mean deviation 4', 1]], d: 2, c: 'application', t: [1], time: 105 }), (Cx) => { Cx.assert(same(d.median, 11) && same(tot, 24) && same(d.mdMedian, 4), 'MD about median 4'); Cx.model([11, 24, 4]); });
}
{
  const n = 8, sx = 96, sx2 = 1280;
  const m = fr(sx).div(n), v = fr(sx2).div(n).sub(m.pow(2));
  Q('s204', mk.short({ marks: 2, stem: r`For eight imagined voltage readings, $\sum x = 96$ and $\sum x^2 = 1280$. Find the variance and the standard deviation.`, model: r`Variance $= \dfrac{\sum x^2}{n} - \left(\dfrac{\sum x}{n}\right)^2 = \dfrac{1280}{8} - \left(\dfrac{96}{8}\right)^2 = 160 - 144 = ${T(v)}$. Standard deviation $= \sqrt{${T(v)}} = ${T(v.sqrt())}$.`, sol: 'Use the shortcut form of the variance.', scheme: [['Variance 160 - 144 = 16', 1], ['Standard deviation 4', 1]], d: 2, c: 'application', t: [2], time: 75 }), (Cx) => { Cx.assert(same(m, 12) && same(v, 16) && v.sqrt().eq(4), 'variance 16, SD 4'); Cx.model([160, 144, 16, 4]); });
}
{
  const d = raw([4, 8, 12]);
  const dev = d.x.map((x) => x.sub(d.mean));
  Q('s205', mk.short({ marks: 2, stem: r`Show that the signed deviations of the imagined heights $4, 8, 12$ (in cm) from their mean add up to zero, and say why the mean deviation uses absolute values.`, model: r`The mean is $${T(d.mean)}$ and the deviations are $${L(dev)}$, whose sum is $0$. Because positive and negative deviations always cancel in this way, the mean deviation is built from absolute values: here $\dfrac{4 + 0 + 4}{3} = \dfrac{8}{3}$.`, sol: 'Find the mean, then add the signed gaps.', scheme: [['Mean 8, deviations -4, 0, 4 with sum 0', 1], ['Absolute values prevent cancelling', 1]], d: 2, c: 'understanding', t: [1], time: 90 }), (Cx) => { Cx.assert(same(d.mean, 8) && sumOf(dev).eq(0) && same(d.mdMean, '8/3'), 'sum 0'); Cx.model([8, 4, 0]); });
}
{
  const sd = fr(7), shift = 12, k = fr('1/2');
  const ny = sd.mul(k);
  Q('s206', mk.short({ marks: 2, stem: r`The marks of an imagined class on a practice test have standard deviation $7$. Each mark is increased by $12$ and then halved. Find the standard deviation and the variance of the new marks.`, model: r`Adding $12$ does not change the spread. Halving multiplies the standard deviation by $\dfrac{1}{2}$, so the new standard deviation is $${T(ny)}$. The variance is $${T(ny)}^2 = ${T(ny.pow(2))}$.`, sol: 'A shift leaves the spread unchanged; scaling by k multiplies the SD by |k|.', scheme: [['New standard deviation 3.5', 1], ['Variance 12.25', 1]], d: 3, c: 'application', t: [2], time: 90 }), (Cx) => { const a = raw([10, 20, 30, 50, 70]), b = raw(a.x.map((x) => x.add(shift).div(2))); Cx.assert(b.variance.eq(a.variance.div(4)) && same(ny, '7/2') && same(ny.pow(2), '49/4'), 'SD 3.5, variance 12.25'); Cx.model([3.5, 12.25]); });
}
{
  const n = 12, mean = 15, sx2 = 2988;
  const v = fr(sx2).div(n).sub(fr(mean).pow(2));
  Q('s207', mk.short({ marks: 2, stem: r`Twelve imagined crop yields have mean $15$ and $\sum x^2 = 2988$. Find the variance and the standard deviation, correct to two decimal places.`, model: r`Variance $= \dfrac{2988}{12} - 15^2 = 249 - 225 = ${T(v)}$. Standard deviation $= \sqrt{${T(v)}} = 2\sqrt{6} \approx ${v.sqrtRound(2)}$.`, sol: 'Divide the sum of squares by n and subtract the square of the mean.', scheme: [['Variance 249 - 225 = 24', 1], ['Standard deviation about 4.90', 1]], d: 3, c: 'application', t: [2], time: 90 }), (Cx) => { Cx.assert(same(v, 24) && v.sqrtRound(2) === '4.90' && v.sqrt() === null, 'variance 24, SD 4.90'); Cx.model([249, 225, 24, 4.9]); });
}
{
  const d = disc([10, 20, 30], [2, 3, 5]);
  const tot = d.sumF((x) => x.sub(d.mean).abs());
  Q('s208', mk.short({ marks: 2, stem: r`In an imagined game, $2$, $3$ and $5$ players scored $10$, $20$ and $30$ points respectively. Find the mean deviation of the scores about the mean.`, model: r`Mean $= \dfrac{20 + 60 + 150}{10} = ${T(d.mean)}$. $\sum f|x - \bar{x}| = 2(13) + 3(3) + 5(7) = ${T(tot)}$. Mean deviation $= \dfrac{${T(tot)}}{10} = ${T(d.mdMean)}$.`, sol: 'Weight each absolute deviation by its frequency.', scheme: [['Mean 23', 1], ['Sum 70, mean deviation 7', 1]], d: 2, c: 'application', t: [1], time: 90 }), (Cx) => { Cx.assert(same(d.mean, 23) && same(tot, 70) && same(d.mdMean, 7), 'MD 7'); Cx.model([23, 70, 7]); });
}
{
  const d = grp(25, 10, [2, 5, 9, 7, 4, 1]);
  Q('s209', mk.short({ marks: 2, stem: r`The weekly savings of imagined students (in rupees) are grouped in six classes of width $10$, beginning at $25$. State the classes, and find the range of the data as estimated from the class limits.`, model: r`The classes are $25$–$35$, $35$–$45$, $45$–$55$, $55$–$65$, $65$–$75$ and $75$–$85$. Range $= 85 - 25 = ${T(d.range)}$ rupees.`, sol: 'Last upper limit minus first lower limit.', scheme: [['Six classes listed correctly', 1], ['Range 60', 1]], d: 2, c: 'understanding', t: [1], time: 75 }), (Cx) => { Cx.assert(d.count === 6 && same(d.range, 60) && same(d.classes[5][1], 85), 'range 60'); Cx.model([85, 25, 60]); });
}

// =============================================================== short answer, 3 marks
{
  const d = raw([3, 8, 9, 12, 18]);
  const tot = sumOf(sqDev(d, d.mean));
  Q('s301', mk.short({ marks: 3, stem: r`Five imagined batches of paint used $3, 8, 9, 12, 18$ litres. Using the definition, find the variance and the standard deviation (two decimal places).`, model: r`Mean $= \dfrac{50}{5} = ${T(d.mean)}$. Deviations: $${L(d.x.map((x) => x.sub(d.mean)))}$; squares: $${L(sqDev(d, d.mean))}$, total $${T(tot)}$. Variance $= \dfrac{${T(tot)}}{5} = ${T(d.variance)}$. Standard deviation $= \sqrt{${T(d.variance)}} \approx ${d.variance.sqrtRound(2)}$ litres.`, sol: 'Squared gaps, their mean, then the square root.', scheme: [['Mean 10 and the deviations', 1], ['Squares add to 122, variance 24.4', 1], ['Standard deviation about 4.94', 1]], d: 3, c: 'application', t: [2], time: 150 }), (Cx) => { Cx.assert(same(d.mean, 10) && same(tot, 122) && same(d.variance, '122/5') && d.variance.sqrtRound(2) === '4.94' && d.verify(10).eq(d.variance), 'variance 24.4, SD 4.94'); Cx.model([10, 122, 24.4, 4.94]); });
}
{
  const d = disc([12, 16, 20, 24], [14, 7, 14, 5]);
  const tot = d.sumF((x) => x.sub(d.mean).abs());
  Q('s302', mk.short({ marks: 3, stem: r`The number of imagined parcels handled per hour by a depot over $40$ hours is shown below.

${freqMd(d, { first: 'Parcels', second: 'Hours' })}

Find the mean deviation about the mean.`, model: r`$\sum fx = ${T(d.sumFx)}$, so $\bar{x} = \dfrac{${T(d.sumFx)}}{40} = ${T(d.mean)}$. The values $f|x - \bar{x}|$ are $${L(d.x.map((x, i) => d.f[i].mul(x.sub(d.mean).abs())))}$ with total $${T(tot)}$. Mean deviation $= \dfrac{${T(tot)}}{40} = ${T(d.mdMean)}$.`, sol: 'Mean first, then frequency-weighted absolute gaps.', scheme: [['Mean 17', 1], ['f|x - mean| values and total 154', 1], ['Mean deviation 3.85', 1]], d: 3, c: 'application', t: [1], time: 150 }), (Cx) => { Cx.assert(same(d.n, 40) && same(d.mean, 17) && same(tot, 154) && same(d.mdMean, '77/20'), 'MD 3.85'); Cx.model([680, 17, 154, 3.85]); });
}
{
  const d = disc([20, 25, 30, 35, 40], [11, 8, 5, 12, 14]);
  const su = d.sumF((x) => x.sub(30).div(5)), su2 = d.sumF((x) => x.sub(30).div(5).pow(2));
  Q('s303', mk.short({ marks: 3, stem: r`An imagined call centre logged the length of $50$ calls (to the nearest 5 minutes).

${freqMd(d, { first: 'Minutes', second: 'Calls' })}

Using $A = 30$ and $h = 5$, find the variance.`, model: r`With $u = \dfrac{x - 30}{5}$: $\sum fu = ${T(su)}$ and $\sum fu^2 = ${T(su2)}$. Variance $= h^2\left[\dfrac{\sum fu^2}{n} - \left(\dfrac{\sum fu}{n}\right)^2\right] = 25\left[\dfrac{${T(su2)}}{50} - \left(\dfrac{${T(su)}}{50}\right)^2\right] = ${T(d.variance)}$.`, sol: 'Step deviations make the sums small.', scheme: [['u values for each x', 1], ['sum fu = 10 and sum fu^2 = 120', 1], ['Variance 59', 1]], d: 3, c: 'application', t: [2], time: 150 }), (Cx) => { Cx.assert(d.verify(30, 5).eq(59) && same(su, 10) && same(su2, 120) && same(d.mean, 31), 'variance 59'); Cx.model([10, 120, 59]); });
}
{
  const d = grp(0, 10, [3, 9, 12, 6]);
  const su = d.sumF((x) => x.sub(25).div(10)), su2 = d.sumF((x) => x.sub(25).div(10).pow(2));
  Q('s304', mk.short({ marks: 3, stem: r`The ages of $30$ imagined visitors to a museum are grouped below.

${freqMd(d, { first: 'Age (years)', second: 'Visitors' })}

Taking $A = 25$ and $h = 10$, find the variance and the standard deviation.`, model: r`Class marks are $5, 15, 25, 35$, so $u = \dfrac{x - 25}{10}$ takes the values $-2, -1, 0, 1$. Then $\sum fu = ${T(su)}$ and $\sum fu^2 = ${T(su2)}$. Variance $= 100\left[\dfrac{${T(su2)}}{30} - \left(\dfrac{${T(su)}}{30}\right)^2\right] = ${T(d.variance)}$ and the standard deviation is $\sqrt{${T(d.variance)}} = ${T(d.variance.sqrt())}$ years.`, sol: 'Use class marks, then step deviations.', scheme: [['Class marks and u values', 1], ['sum fu = -9 and sum fu^2 = 27', 1], ['Variance 81, standard deviation 9', 1]], d: 3, c: 'application', t: [2], time: 150 }), (Cx) => { Cx.assert(d.verify(25, 10).eq(81) && same(su, -9) && same(su2, 27) && d.variance.sqrt().eq(9), 'variance 81'); Cx.model([-9, 27, 81, 9]); });
}
{
  const d = grp(10, 10, [3, 13, 10, 14]);
  const cf = d.cumF();
  const tot = d.sumF((x) => x.sub(d.median).abs());
  Q('s305', mk.short({ marks: 3, stem: r`The monthly electricity use (in units) of $40$ imagined flats is grouped below.

${freqMd(d, { first: 'Units', second: 'Flats' })}

Find the median and then the mean deviation about the median.`, model: r`Cumulative frequencies are $${L(cf)}$; $\dfrac{n}{2} = 20$ lies in the class $30$–$40$, so the median is $30 + \dfrac{20 - 16}{10} \times 10 = ${T(d.median)}$. The values $f|x - 34|$ are $${L(d.x.map((x, i) => d.f[i].mul(x.sub(d.median).abs())))}$ with total $${T(tot)}$, and the mean deviation is $\dfrac{${T(tot)}}{40} = ${T(d.mdMedian)}$.`, sol: 'Median class from the cumulative column.', scheme: [['Median class 30-40 and median 34', 1], ['f|x - 34| and total 338', 1], ['Mean deviation 8.45', 1]], d: 3, c: 'application', t: [1], time: 150 }), (Cx) => { Cx.assert(same(d.median, 34) && same(d.medianClass, 2) && same(tot, 338) && same(d.mdMedian, '169/20'), 'MD about median 8.45'); Cx.model([16, 34, 338, 8.45]); });
}
{
  const a = { m: 50, s: 6 }, b = { m: 32, s: '24/5' };
  const cvA = fr(a.s).div(a.m).mul(100), cvB = fr(b.s).div(b.m).mul(100);
  Q('s306', mk.short({ marks: 3, stem: r`Two imagined machines fill packets. Machine P has mean fill $50$ g and standard deviation $6$ g; machine R has mean fill $32$ g and standard deviation $4.8$ g. Which machine is more consistent?`, model: r`Coefficient of variation of P $= \dfrac{6}{50} \times 100 = ${T(cvA)}\%$. Coefficient of variation of R $= \dfrac{4.8}{32} \times 100 = ${T(cvB)}\%$. Since $${T(cvA)} < ${T(cvB)}$, machine P is more consistent, even though its standard deviation is larger.`, sol: 'Compare coefficients of variation, not standard deviations.', scheme: [['CV of P is 12 per cent', 1], ['CV of R is 15 per cent', 1], ['P is more consistent', 1]], d: 3, c: 'analysis', t: [2], time: 120 }), (Cx) => { Cx.assert(same(cvA, 12) && same(cvB, 15) && cvA.cmp(cvB) < 0, 'CV 12 < 15'); Cx.model([12, 15, 6, 4.8]); });
}
{
  const m = 56, s = 12, k = fr('5/4');
  const d = raw([32, 48, 56, 64, 80]), e = raw(d.x.map((x) => x.mul(k)));
  Q('s307', mk.short({ marks: 3, stem: r`An imagined entrance test is marked out of $80$, with mean $56$ and standard deviation $12$. The marks are rescaled to a total of $100$ by $y = \dfrac{5}{4}x$. Find the new mean, standard deviation and variance.`, model: r`New mean $= \dfrac{5}{4} \times 56 = ${T(k.mul(m))}$. New standard deviation $= \dfrac{5}{4} \times 12 = ${T(k.mul(s))}$. New variance $= ${T(k.mul(s))}^2 = ${T(k.mul(s).pow(2))}$.`, sol: 'Multiplying by k scales the mean by k and the SD by |k|.', scheme: [['New mean 70', 1], ['New standard deviation 15', 1], ['New variance 225', 1]], d: 3, c: 'application', t: [2], time: 105 }), (Cx) => { Cx.assert(e.mean.eq(d.mean.mul(k)) && e.variance.eq(d.variance.mul(k.pow(2))) && same(k.mul(m), 70) && same(k.mul(s), 15) && same(k.mul(s).pow(2), 225), 'mean 70, SD 15, variance 225'); Cx.model([70, 15, 225]); });
}
{
  const known = [3, 7, 10, 14], mean = 8;
  const fifth = fr(5 * mean).sub(sumOf(known));
  const d = raw([...known, fifth]);
  Q('s308', mk.short({ marks: 3, stem: r`Five imagined cyclists have a mean of $8$ rides per week. Four of them rode $3, 7, 10$ and $14$ times. Find the fifth cyclist's number of rides and the variance of the five numbers.`, model: r`The five numbers add to $5 \times 8 = 40$, so the fifth is $40 - 34 = ${T(fifth)}$. The deviations from $8$ are $-5, -1, 2, 6, -2$, with squares $25, 1, 4, 36, 4$ adding to $${T(sumOf(sqDev(d, 8)))}$. Variance $= \dfrac{70}{5} = ${T(d.variance)}$.`, sol: 'The total of all five is fixed by the mean.', scheme: [['Fifth value 6', 1], ['Squared deviations total 70', 1], ['Variance 14', 1]], d: 3, c: 'application', t: [2], time: 120 }), (Cx) => { Cx.assert(same(fifth, 6) && d.mean.eq(8) && same(sumOf(sqDev(d, 8)), 70) && same(d.variance, 14), 'fifth 6, variance 14'); Cx.model([40, 34, 6, 70, 14]); });
}
