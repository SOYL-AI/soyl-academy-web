// ISC 11 Mathematics ch18 Statistics: Measures of Dispersion - multiple-choice and assertion-reason items.
// Every key is recomputed from the data with exact rationals; every distractor comes from its own wrong method and is asserted distinct.
import { Q, mk, MQ, r, $, T, fr, Dist, ftab, sdTex, sdRound, cvRound, checkCombine, checkCorrect, correct, combine } from './qh.mjs';
import * as D from './data.mjs';

const tx = (t) => ({ tex: t });
const R = (xs) => xs.map((v) => `${v}`).join(', ');

// ============================================================ MCQ
MQ('m01', {
  stem: r`For a data set with least observation $S$ and greatest observation $L$, the coefficient of range is`,
  vals: [[tx(r`\dfrac{L - S}{L + S}`)], [tx(r`\dfrac{L - S}{L}`), 'divides the range by the greatest value alone'], [tx(r`\dfrac{L + S}{L - S}`), 'turns the ratio upside down'], [tx(r`\dfrac{L - S}{2}`), 'halves the range, which is the semi-range and has the unit of the data']],
  sol: r`The coefficient of range compares the range $L - S$ with the sum of the extremes, $\dfrac{L - S}{L + S}$, so it is a pure number.`,
  d: 1, c: 'recall', t: [1], time: 40,
  ok: fr(30 - 10).div(30 + 10).eq(fr('1/2')) && !fr(30 - 10).div(30).eq(fr('1/2')) && !fr(30 + 10).div(20).eq(fr('1/2')) && !fr(20).div(2).eq(fr('1/2')), msg: 'with S = 10 and L = 30 the formula gives 1/2; the three distractors give 2/3, 2 and 10',
});
{
  const d = Dist.raw([38, 52, 47, 61, 44, 29, 55]);
  MQ('m02', {
    stem: r`The heights, in centimetres, of seven imagined saplings in a nursery bed are $38, 52, 47, 61, 44, 29, 55$. The range of the heights is`,
    vals: [[d.range], [fr(55 - 38), 'is the last reading minus the first, not the greatest minus the least'], [fr(61 + 29), 'adds the extremes instead of subtracting'], [d.range.div(2), 'is half the range']],
    sol: r`The greatest height is $61$ and the least is $29$, so the range is $61 - 29 = 32$ cm.`,
    d: 1, c: 'understanding', t: [1], time: 45,
    ok: d.range.eq(32) && Math.max(...d.x.map((x) => x.num())) === 61 && Math.min(...d.x.map((x) => x.num())) === 29, msg: 'range 61 - 29 = 32',
  });
}
{
  const lo = 15, hi = 65, key = fr(hi - lo).div(hi + lo);
  MQ('m03', {
    stem: r`The lengths of the leaves of an imagined climbing plant are grouped into the classes $15$–$25$, $25$–$35$, $35$–$45$, $45$–$55$ and $55$–$65$ millimetres. Taking the range as the difference of the extreme class limits, the coefficient of range is`,
    vals: [[key], [fr(60 - 20).div(60 + 20), 'uses the first and last class marks, $20$ and $60$, instead of the limits'], [fr(55 - 15).div(55 + 15), 'uses the lower limits of the first and last classes'], [fr(hi - lo), 'is the range itself, not the coefficient']],
    sol: r`The extreme limits are $15$ and $65$, so $R = 65 - 15 = 50$ and the coefficient is $\dfrac{65 - 15}{65 + 15} = \dfrac{50}{80} = \dfrac{5}{8}$.`,
    d: 2, c: 'understanding', t: [1], time: 70,
    ok: key.eq(fr('5/8')) && fr(60 - 20).div(80).eq(fr('1/2')) && fr(40).div(70).eq(fr('4/7')) && key.num() === 0.625, msg: 'coefficient (65 - 15)/(65 + 15) = 5/8; the distractors are 1/2, 4/7, 50',
  });
}
{
  const d = D.EIGHT, s = d.sumF((x) => x.sub(d.mean).abs());
  MQ('m04', {
    stem: r`An imagined cycling club logged $12, 23, 14, 11, 7, 18, 29, 30$ trips over eight months. The mean deviation of the number of trips about the mean is`,
    vals: [[d.mdMean], [s, 'is the sum of the absolute deviations, not yet divided by $8$'], [s.div(7), 'divides the sum by $n - 1 = 7$ instead of $n$'], [d.variance, 'is the variance, which squares the deviations']],
    sol: r`The mean is $\dfrac{144}{8} = 18$. The absolute deviations are $6, 5, 4, 7, 11, 0, 11, 12$ with sum $56$, so the mean deviation is $\dfrac{56}{8} = 7$.`,
    d: 2, c: 'application', t: [1], time: 90,
    ok: d.mean.eq(18) && s.eq(56) && d.mdMean.eq(7) && d.x.map((x) => T(x.sub(18).abs())).join() === '6,5,4,7,11,0,11,12' && d.variance.eq(64) && s.div(7).eq(8), msg: 'mean 18, sum of absolute deviations 56, mean deviation 7',
  });
}
{
  const d = D.FIVE, s = d.sumF((x) => x.sub(d.mean).abs()), unweighted = Dist.raw(d.x).sumF((x) => x.sub(d.mean).abs()).div(5);
  MQ('m05', {
    stem: r`The number of customers entering an imagined stall in each of $25$ hours was recorded:` + `\n\n${ftab(d, 'Customers per hour', 'Hours')}\n\n` + r`The mean deviation about the mean is`,
    vals: [[d.mdMean], [s, r`is $\sum f\lvert x - \bar{x}\rvert$ before dividing by $n$`], [unweighted, 'averages the five absolute deviations without using the frequencies'], [s.div(5), r`divides by the number of rows, $5$, instead of $\sum f = 25$`]],
    sol: r`$n = 25$ and $\bar{x} = \dfrac{125}{25} = 5$. The sum $\sum f\lvert x - \bar{x}\rvert = 6(2) + 4(1) + 6(0) + 2(1) + 7(2) = 32$, so the mean deviation is $\dfrac{32}{25} = 1.28$.`,
    d: 3, c: 'application', t: [1], time: 110,
    ok: d.n.eq(25) && d.sumFx.eq(125) && d.mean.eq(5) && s.eq(32) && T(d.mdMean) === '1.28' && T(unweighted) === '1.2' && T(s.div(5)) === '6.4', msg: 'n = 25, mean 5, sum 32, mean deviation 1.28; distractors 32, 1.2, 6.4',
  });
}
{
  const d = D.FOURW, s = d.sumF((x) => x.sub(d.mean).abs());
  MQ('m06', {
    stem: r`The lengths of $50$ imagined seeds, in millimetres, are grouped as follows:` + `\n\n${ftab(d, 'Length (mm)', 'Seeds')}\n\n` + r`The mean deviation about the mean is`,
    vals: [[d.mdMean], [s, r`is $\sum f\lvert x - \bar{x}\rvert$ with no division by $n = 50$`], [Dist.raw(d.x).sumF((x) => x.sub(d.mean).abs()).div(6), 'averages the six class-mark deviations without their frequencies'], [d.variance, 'is the variance of the lengths']],
    sol: r`The class marks are $10, 14, 18, 22, 26, 30$ and $\bar{x} = \dfrac{1000}{50} = 20$. Then $\sum f\lvert x - \bar{x}\rvert = 11(10) + 6(6) + 7(2) + 8(2) + 9(6) + 9(10) = 320$, so the mean deviation is $\dfrac{320}{50} = 6.4$ mm.`,
    d: 3, c: 'application', t: [1], time: 130,
    ok: d.mean.eq(20) && d.sumFx.eq(1000) && s.eq(320) && T(d.mdMean) === '6.4' && T(Dist.raw(d.x).sumF((x) => x.sub(20).abs()).div(6)) === '6' && d.variance.eq(52), msg: 'class marks 10..30, mean 20, sum 320, mean deviation 6.4; distractors 320, 6, 52',
  });
}
{
  const R1 = Dist.raw([30, 38, 45, 52, 60]), R2 = Dist.raw([41, 43, 45, 47, 49]);
  const vals = [
    [r`Class $R_1$ is more spread out than class $R_2$, because its mean deviation, $8.8$, is larger than $2.4$`],
    [r`Class $R_2$ is more spread out than class $R_1$, because its mean deviation, $2.4$, is smaller`, 'reads the smaller mean deviation as the greater spread'],
    [r`The two classes are equally spread out, because both have mean $45$`, 'forgets that equal means say nothing about the spread'],
    [r`Class $R_2$ is more spread out, because its marks are closer to the mean`, 'confuses closeness to the mean with spread'],
  ];
  MQ('m07', {
  stmt: true,
    stem: r`The marks of five pupils in each of two imagined classes are $R_1$: $30, 38, 45, 52, 60$ and $R_2$: $41, 43, 45, 47, 49$. Which conclusion about their spread is correct?`,
    vals: vals.map(([t, w]) => [t, w]),
    sol: r`Both classes have mean $\dfrac{225}{5} = 45$. For $R_1$ the mean deviation is $\dfrac{15 + 7 + 0 + 7 + 15}{5} = 8.8$; for $R_2$ it is $\dfrac{4 + 2 + 0 + 2 + 4}{5} = 2.4$. With equal means the larger mean deviation shows the greater spread, so $R_1$ is more spread out. The statement that R2 is more spread because its mean deviation 2.4 is smaller reads the smaller mean deviation as the greater spread; the statement that the classes are equally spread forgets that equal means say nothing about spread; and the statement that R2 is more spread because its marks are closer to the mean confuses closeness to the mean with spread.`,
    d: 3, c: 'analysis', t: [1], time: 100,
    ok: R1.mean.eq(45) && R2.mean.eq(45) && T(R1.mdMean) === '8.8' && T(R2.mdMean) === '2.4' && R1.mdMean.cmp(R2.mdMean) > 0, msg: 'both means 45; mean deviations 8.8 and 2.4',
  });
}
{
  const d = D.SIXB, ss = d.sumF((x) => x.sub(d.mean).pow(2));
  MQ('m08', {
    stem: r`Six imagined market stalls sold $52, 16, 56, 28, 20, 8$ units of fruit in a day. The variance of the units sold is`,
    vals: [[d.variance], [d.variance.sqrt(), 'is the standard deviation, the square root of the variance'], [ss, r`is $\sum(x - \bar{x})^2$ before dividing by $n$`], [ss.div(5), 'divides by $n - 1 = 5$ instead of $n = 6$']],
    sol: r`The mean is $\dfrac{180}{6} = 30$. The deviations are $22, -14, 26, -2, -10, -22$, whose squares $484, 196, 676, 4, 100, 484$ add to $1944$, so $\sigma^2 = \dfrac{1944}{6} = 324$.`,
    d: 2, c: 'application', t: [2], time: 100,
    ok: d.mean.eq(30) && ss.eq(1944) && d.variance.eq(324) && d.varianceShortcut.eq(324) && d.variance.sqrt().eq(18) && T(ss.div(5)) === '388.8', msg: 'mean 30, sum of squares 1944, variance 324 (also by the shortcut formula)',
  });
}
{
  const n = 8, sx = 104, sx2 = 1480, m = fr(sx).div(n), v = fr(sx2).div(n).sub(m.pow(2));
  MQ('m09', {
    stem: r`For eight imagined sensor readings, $\sum x = 104$ and $\sum x^2 = 1480$. The standard deviation of the readings is`,
    vals: [[tx('4')], [tx('16'), 'is the variance'], [tx(r`\sqrt{185}`), r`is the square root of the mean of the squares, $\sqrt{\dfrac{\sum x^2}{n}}$, without subtracting the square of the mean`], [tx('13'), 'is the mean of the readings']],
    sol: r`$\bar{x} = \dfrac{104}{8} = 13$ and $\sigma^2 = \dfrac{1480}{8} - 13^2 = 185 - 169 = 16$, so $\sigma = \sqrt{16} = 4$.`,
    d: 2, c: 'understanding', t: [2], time: 60,
    ok: m.eq(13) && v.eq(16) && v.sqrt().eq(4) && fr(sx2).div(n).eq(185) && !fr(185).sqrt(), msg: 'mean 13, variance 185 - 169 = 16, SD 4',
  });
}
{
  const d = D.SQ40, wrong = Dist.raw(d.x);
  MQ('m10', {
    stem: r`The minutes taken by $40$ imagined pupils to finish a puzzle are:` + `\n\n${ftab(d, 'Minutes', 'Pupils')}\n\n` + r`The standard deviation of the times is`,
    vals: [[d.variance.sqrt()], [d.variance, 'is the variance, not its square root'], [tx(r`10\sqrt{2}`), 'is the standard deviation of the five values $20, 30, 40, 50, 60$ taken once each, ignoring the frequencies'], [d.mean, 'is the mean time']],
    sol: r`$\bar{x} = \dfrac{1680}{40} = 42$. Then $\sum f(x - \bar{x})^2 = 8(484) + 3(144) + 11(4) + 9(64) + 9(324) = 7840$, so $\sigma^2 = \dfrac{7840}{40} = 196$ and $\sigma = 14$.`,
    d: 3, c: 'application', t: [2], time: 130,
    ok: d.n.eq(40) && d.sumFx.eq(1680) && d.mean.eq(42) && d.sumF((x) => x.sub(42).pow(2)).eq(7840) && d.variance.eq(196) && wrong.variance.eq(200) && sdTex(200) === r`10\sqrt{2}`, msg: 'mean 42, sum of squares 7840, variance 196, SD 14; unweighted variance 200',
  });
}
{
  const n = 25, A = 30, sd = 50, sd2 = 800, key = fr(sd2).div(n).sub(fr(sd).div(n).pow(2));
  MQ('m11', {
    stem: r`A stationer notes the sales on $25$ imagined days. Taking an assumed mean $A = 30$ and $d = x - A$, she finds $\sum d = 50$ and $\sum d^2 = 800$. The variance of the sales is`,
    vals: [[key], [fr(sd2).div(n), r`is $\dfrac{\sum d^2}{n}$ with no correction for the mean of the deviations`], [fr(sd2).div(n).add(fr(sd).div(n).pow(2)), r`adds the square of $\dfrac{\sum d}{n}$ instead of subtracting it`], [fr(sd2).div(n).sub(fr(sd).div(n)), r`subtracts $\dfrac{\sum d}{n}$ instead of its square`]],
    sol: r`$\sigma^2 = \dfrac{\sum d^2}{n} - \left(\dfrac{\sum d}{n}\right)^2 = \dfrac{800}{25} - \left(\dfrac{50}{25}\right)^2 = 32 - 4 = 28$.`,
    d: 3, c: 'understanding', t: [2], time: 80,
    ok: key.eq(28) && fr(sd2).div(n).eq(32) && fr(sd).div(n).eq(2) && fr(A).add(fr(sd).div(n)).eq(32), msg: 'variance 32 - 2^2 = 28 (mean 32)',
  });
}
{
  const n = 50, A = 45, h = 10, su = 10, su2 = 130;
  const v = fr(h).pow(2).mul(fr(su2).div(n).sub(fr(su).div(n).pow(2)));
  MQ('m12', {
    stem: r`For $50$ imagined observations in classes of width $10$, the step deviation $u = \dfrac{x - 45}{10}$ gives $\sum fu = 10$ and $\sum fu^2 = 130$. The standard deviation of the observations is`,
    vals: [[v.sqrt()], [v, 'is the variance, with $h^2$ applied but no square root'], [fr(su2).div(n).sub(fr(su).div(n).pow(2)).sqrt(), 'is the standard deviation of $u$, which still needs the factor $h = 10$'], [tx(r`10\sqrt{2.6}`), r`forgets to subtract the square of $\dfrac{\sum fu}{n}$`]],
    sol: r`$\sigma^2 = h^2\left[\dfrac{\sum fu^2}{n} - \left(\dfrac{\sum fu}{n}\right)^2\right] = 100\left[\dfrac{130}{50} - \left(\dfrac{10}{50}\right)^2\right] = 100(2.6 - 0.04) = 256$, so $\sigma = 16$.`,
    d: 3, c: 'understanding', t: [2], time: 90,
    ok: v.eq(256) && v.sqrt().eq(16) && T(fr(su2).div(n).sub(fr(su).div(n).pow(2))) === '2.56' && fr(su2).div(n).eq(fr('2.6')) && Math.abs(10 * Math.sqrt(2.6) - 16) > 0.1, msg: 'variance 100(2.6 - 0.04) = 256, SD 16',
  });
}
{
  const base = Dist.raw([310, 450, 520, 660]), shifted = Dist.raw(base.x.map((x) => x.add(50)));
  MQ('m13', {
    stem: r`The daily sales of an imagined bakery have a standard deviation of $340$ rupees. The owner adds a fixed bonus of $50$ rupees to every day's figure. The standard deviation of the new figures is`,
    vals: [[tx('340')], [tx('390'), 'adds the bonus to the standard deviation, but a shift of every value changes the mean only'], [tx('50'), 'is the bonus itself'], [tx('115600'), 'is the square of $340$, the variance']],
    sol: r`Adding the same number $50$ to every observation moves the mean by $50$ and every deviation $x - \bar{x}$ is unchanged, so the standard deviation stays $340$ rupees.`,
    d: 1, c: 'understanding', t: [2], time: 45,
    ok: shifted.variance.eq(base.variance) && !shifted.mean.eq(base.mean) && shifted.mean.sub(base.mean).eq(50) && 340 * 340 === 115600, msg: 'a shift by 50 leaves the variance unchanged (checked on a four-value list) and 340^2 = 115600',
  });
}
{
  const xs = Dist.raw([4, 7, 12, 17]), ys = Dist.raw(xs.x.map((x) => fr(5).sub(x.mul(2))));
  const v = 9, key = 4 * v;
  MQ('m14', {
    stem: r`The readings $x$ of an imagined instrument have variance $9$. They are converted by $y = 5 - 2x$. The variance of $y$ is`,
    vals: [[tx(String(key))], [tx('18'), 'multiplies the variance by $2$ instead of by $(-2)^2 = 4$'], [tx('81'), 'multiplies by $(5 - 2)^2 = 9$, mixing the constant into the scale'], [tx('9'), 'treats the change of scale as a change of origin only']],
    sol: r`For $y = ax + b$ the variance is multiplied by $a^2$ and $b$ has no effect. Here $a = -2$, so $\sigma_y^2 = (-2)^2 \times 9 = 36$.`,
    d: 3, c: 'application', t: [2], time: 70,
    ok: ys.variance.eq(xs.variance.mul(4)) && fr(key).eq(4 * 9) && !fr(18).eq(key) && !fr(81).eq(key), msg: 'for y = 5 - 2x the variance is multiplied by 4 (checked on a four-value list); 36',
  });
}
{
  const cv = fr(8).div(50).mul(100);
  MQ('m15', {
    stem: r`The weekly rainfall at an imagined station has mean $50$ mm and standard deviation $8$ mm. Its coefficient of variation is`,
    vals: [[tx(r`16\%`)], [tx(r`0.16\%`), r`is $\dfrac{\sigma}{\bar{x}}$ with the factor $100$ left out`], [tx(r`625\%`), 'divides the mean by the standard deviation'], [tx(r`128\%`), 'divides the variance by the mean']],
    sol: r`$\text{C.V.} = \dfrac{\sigma}{\bar{x}} \times 100 = \dfrac{8}{50} \times 100 = 16\%$.`,
    d: 2, c: 'understanding', t: [2], time: 50,
    ok: cv.eq(16) && fr(50).div(8).mul(100).eq(625) && fr(64).div(50).mul(100).eq(128) && cvRound(64, 50, 1) === '16.0', msg: 'C.V. = 8/50 x 100 = 16%',
  });
}
{
  const c1 = fr(6).div(40).mul(100), c2 = fr(9).div(75).mul(100);
  MQ('m16', {
    stmt: true,
    stem: r`Machine $M_1$ fills packets with mean mass $40$ g and standard deviation $6$ g; machine $M_2$ fills packets with mean mass $75$ g and standard deviation $9$ g. Which statement is correct?`,
    vals: [[r`$M_2$ is more consistent, because its coefficient of variation, $12\%$, is smaller than the $15\%$ of $M_1$`], [r`$M_1$ is more consistent, because its standard deviation, $6$ g, is smaller than $9$ g`, 'compares the standard deviations although the means differ'], [r`$M_2$ is less consistent, because its standard deviation, $9$ g, is larger`, 'makes the same mistake in the other direction'], [r`The two machines cannot be compared, because their means are different`, 'overlooks that the coefficient of variation removes the effect of the mean']],
    sol: r`$\text{C.V.}(M_1) = \dfrac{6}{40} \times 100 = 15\%$ and $\text{C.V.}(M_2) = \dfrac{9}{75} \times 100 = 12\%$. The smaller coefficient of variation means the more consistent machine, so $M_2$ is more consistent. The statement that $M_1$ is more consistent because $6$ g is smaller than $9$ g compares standard deviations although the means differ; the statement that $M_2$ is less consistent because $9$ g is larger makes the same mistake in the other direction; and the statement that the machines cannot be compared overlooks that the coefficient of variation removes the effect of the mean.`,
    d: 3, c: 'analysis', t: [2], time: 100,
    ok: c1.eq(15) && c2.eq(12) && c2.cmp(c1) < 0, msg: 'C.V. 15% and 12%',
  });
}
{
  const right = Dist.raw([14, 27, 25, 13, 21]), wr = Dist.raw([14, 27, 10, 13, 21]);
  const { c } = checkCorrect([14, 27, 25, 13, 21], 2, 10);
  MQ('m17', {
    stem: r`A teacher records the marks of five imagined pupils and finds mean $17$ and variance $38$. She then notices that one mark, $25$, was copied as $10$. The correct mean mark is`,
    vals: [[c.mean], [wr.mean, 'is the recorded mean, left uncorrected'], [wr.mean.add(15), 'adds the correction $15$ to the mean without dividing by $n = 5$'], [wr.mean.add(fr(15).div(4)), 'divides the correction by $n - 1 = 4$']],
    sol: r`$\sum x = 5 \times 17 = 85$. Replacing $10$ by $25$ gives $85 - 10 + 25 = 100$, so the correct mean is $\dfrac{100}{5} = 20$.`,
    d: 3, c: 'application', t: [2], time: 80,
    ok: wr.mean.eq(17) && wr.variance.eq(38) && c.mean.eq(20) && right.mean.eq(20) && T(wr.mean.add(fr(15).div(4))) === '20.75', msg: 'recorded mean 17 and variance 38; corrected sum 100, mean 20 (matches the true list)',
  });
}
{
  const rawRight = [36, 32, 26, 36, 46, 50, 39, 57, 19, 49];
  const { wrong, right, c } = checkCorrect(rawRight, 2, 66);
  MQ('m18', {
    stem: r`Ten imagined readings were recorded with mean $43$ and variance $163$. Later it was found that the reading $26$ had been copied as $66$. The correct variance is`,
    vals: [[c.var], [wrong.variance, 'is the recorded variance, left uncorrected'], [wrong.variance.sub(fr(43).sub(39)), r`subtracts the change in the mean instead of recomputing $\dfrac{\sum x^2}{n} - \bar{x}^2$`], [tx(r`\sqrt{123}`), 'is the corrected standard deviation, not the variance']],
    sol: r`$\sum x = 430$ and $\sum x^2 = 10(163 + 43^2) = 20120$. Correcting: $\sum x = 430 - 66 + 26 = 390$ and $\sum x^2 = 20120 - 66^2 + 26^2 = 16440$. The mean is $39$ and $\sigma^2 = \dfrac{16440}{10} - 39^2 = 1644 - 1521 = 123$.`,
    d: 4, c: 'application', t: [2], time: 140,
    ok: wrong.mean.eq(43) && wrong.variance.eq(163) && c.sx.eq(430) && c.sx2.eq(20120) && c.nsx.eq(390) && c.nsx2.eq(16440) && c.var.eq(123) && right.variance.eq(123) && T(fr(163).sub(4)) === '159', msg: 'sums 430 and 20120 become 390 and 16440; mean 39, variance 123 (matches the true list)',
  });
}
{
  const g1 = { n: 25, mean: 48, var: 0 }, g2 = { n: 15, mean: 56, var: 0 };
  const mean = fr(25 * 48 + 15 * 56).div(40);
  MQ('m19', {
    stem: r`A music school has $25$ beginners with mean monthly fee $48$ (in hundreds of rupees) and $15$ seniors with mean fee $56$. The combined mean fee of the $40$ students is`,
    vals: [[mean], [fr(48 + 56).div(2), 'averages the two means without weighting by the group sizes'], [fr(25 * 56 + 15 * 48).div(40), 'attaches the sizes to the wrong means'], [fr(48 + 56), 'adds the two means']],
    sol: r`Combined mean $= \dfrac{n_1\bar{x}_1 + n_2\bar{x}_2}{n_1 + n_2} = \dfrac{25(48) + 15(56)}{40} = \dfrac{2040}{40} = 51$.`,
    d: 2, c: 'understanding', t: [3], time: 60,
    ok: mean.eq(51) && combine(g1, g2).mean.eq(51) && T(fr(25 * 56 + 15 * 48).div(40)) === '53', msg: 'combined mean 2040/40 = 51; distractors 52, 53, 104',
  });
}
{
  const g1 = { n: 12, mean: 40, var: 25 }, g2 = { n: 18, mean: 50, var: 25 };
  const c = checkCombine(g1, g2);
  MQ('m20', {
    stem: r`Two imagined batches of seedlings have $12$ and $18$ plants, mean heights $40$ cm and $50$ cm, and the same standard deviation $5$ cm. The standard deviation of the heights of all $30$ plants is`,
    vals: [[c.var.sqrt()], [c.var, 'is the combined variance'], [tx('5'), 'ignores $d_1$ and $d_2$, the gaps between each group mean and the combined mean'], [tx('25'), 'is the weighted average of the two variances, again without the $d^2$ terms']],
    sol: r`The combined mean is $\dfrac{12(40) + 18(50)}{30} = 46$, so $d_1 = -6$ and $d_2 = 4$. Then $\sigma^2 = \dfrac{12(25 + 36) + 18(25 + 16)}{30} = \dfrac{732 + 738}{30} = 49$ and $\sigma = 7$.`,
    d: 4, c: 'application', t: [3], time: 130,
    ok: c.mean.eq(46) && c.d1.eq(-6) && c.d2.eq(4) && c.var.eq(49) && fr(12).mul(61).eq(732) && fr(18).mul(41).eq(738), msg: 'combined mean 46, variance 1470/30 = 49, SD 7 (checked on merged data)',
  });
}

