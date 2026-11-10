// ISC 11 Mathematics ch18 - assertion-reason items (options come from the lib: the ISC 2027 specimen wording).
import { Q, mk, r, T, fr, Dist, sdTex, checkCombine, combine } from './qh.mjs';

{
  const t = Dist.raw([21, 24, 29, 22, 35]);
  Q('ar1', mk.ar({ a: r`The range of the daily temperatures $21, 24, 29, 22, 35$ (in degrees Celsius) is $14^\circ\text{C}$.`, r: r`The range of a data set is the greatest observation minus the least observation, so it depends only on those two values.`, key: 'a', sol: r`The greatest value is $35$ and the least is $21$, so the range is $35 - 21 = 14$: A is true. R states the definition of the range, and that definition is exactly how the value $14$ was found, so R explains A.`, d: 2, c: 'understanding', t: [1] }), (C) => {
    C.assert(t.range.eq(14) && Dist.raw([21, 24, 29, 22, 35, 28]).range.eq(14) && Dist.raw([21, 24, 29, 22, 99]).range.eq(78), 'range 35 - 21 = 14; adding a middle value leaves it unchanged, changing the greatest value does not'); C.key('a');
  });
}
{
  const d = Dist.raw([6, 9, 15, 22]), e = Dist.raw(d.x.map((x) => x.add(12)));
  Q('ar2', mk.ar({ a: r`Adding $12$ to every observation of a data set leaves its standard deviation unchanged.`, r: r`The variance of a data set can never be negative.`, key: 'b', sol: r`Every deviation $x - \bar{x}$ is unchanged when the same number is added to all observations and to the mean, so $\sigma$ is unchanged: A is true. R is also true, since the variance is a mean of squares. But non-negativity of the variance says nothing about what a shift does, so R does not explain A.`, d: 2, c: 'understanding', t: [2] }), (C) => {
    C.assert(d.variance.eq(e.variance) && !d.mean.eq(e.mean) && d.variance.cmp(0) >= 0 && Dist.raw([5, 5, 5]).variance.eq(0), 'adding 12 leaves the variance of [6, 9, 15, 22] unchanged (the mean moves by 12); variances are non-negative'); C.key('b');
  });
}
{
  const d = Dist.raw([2, 4, 6, 10]), e = Dist.raw(d.x.map((x) => x.mul(3)));
  Q('ar3', mk.ar({ a: r`When every daily temperature in an imagined log is tripled, the standard deviation of the log becomes three times as large.`, r: r`Tripling every temperature in the log makes its variance three times as large.`, key: 'c', sol: r`Each deviation is multiplied by $3$, so $\sigma$ is multiplied by $3$: A is true. The variance is the mean of squared deviations, so it is multiplied by $3^2 = 9$, not by $3$: R is false.`, d: 3, c: 'analysis', t: [2] }), (C) => {
    C.assert(e.variance.eq(d.variance.mul(9)) && !e.variance.eq(d.variance.mul(3)), 'tripling [2, 4, 6, 10] multiplies the variance by 9, not 3, so the SD is multiplied by 3'); C.key('c');
  });
}
{
  const v1 = fr(6).div(40), v2 = fr(12).div(100);
  Q('ar4', mk.ar({ a: r`Of two data sets, the one with the smaller standard deviation is always the more consistent.`, r: r`The coefficient of variation, $\dfrac{\sigma}{\bar{x}} \times 100$, is used to compare the consistency of data sets whose means differ.`, key: 'd', sol: r`Counterexample: a set with mean $40$ and $\sigma = 6$ has C.V. $15\%$, while a set with mean $100$ and $\sigma = 12$ has C.V. $12\%$. The second has the larger standard deviation yet is more consistent, so A is false. R states the correct tool, so R is true.`, d: 3, c: 'analysis', t: [2] }), (C) => {
    C.assert(v1.mul(100).eq(15) && v2.mul(100).eq(12) && 6 < 12 && v2.cmp(v1) < 0, 'sigma 6 with mean 40 gives 15%, sigma 12 with mean 100 gives 12%: the larger sigma is the more consistent'); C.key('d');
  });
}
{
  const g1 = { n: 16, mean: 40, var: 36 }, g2 = { n: 16, mean: 40, var: 64 };
  const c = checkCombine(g1, g2);
  Q('ar5', mk.ar({ a: r`Two groups of $16$ observations each have the same mean $40$ and standard deviations $6$ and $8$. The standard deviation of the combined $32$ observations is $5\sqrt{2}$.`, r: r`When two groups have the same mean, $d_1 = d_2 = 0$, so the combined variance is $\dfrac{n_1\sigma_1^2 + n_2\sigma_2^2}{n_1 + n_2}$.`, key: 'a', sol: r`The combined mean is $40$, so $d_1 = d_2 = 0$ and $\sigma^2 = \dfrac{16(36) + 16(64)}{32} = 50$, giving $\sigma = 5\sqrt{2}$: A is true. R is the reason the $d^2$ terms vanish, which is how $50$ was obtained, so R explains A.`, d: 3, c: 'analysis', t: [3] }), (C) => {
    C.assert(c.mean.eq(40) && c.d1.eq(0) && c.d2.eq(0) && c.var.eq(50) && sdTex(50) === r`5\sqrt{2}` && fr(16 * 36 + 16 * 64).div(32).eq(50), 'combined variance 50 on merged data, sigma 5 sqrt 2'); C.key('a');
  });
}
{
  const g1 = { n: 10, mean: 40, var: 16 }, g2 = { n: 10, mean: 50, var: 9 };
  const c = checkCombine(g1, g2);
  Q('ar6', mk.ar({ a: r`The combined mean of two groups of equal size is the mean of their two means.`, r: r`The combined variance of two groups is never smaller than the weighted average of their two variances.`, key: 'b', sol: r`With $n_1 = n_2$, $\dfrac{n_1\bar{x}_1 + n_2\bar{x}_2}{n_1 + n_2} = \dfrac{\bar{x}_1 + \bar{x}_2}{2}$: A is true. The combined variance adds $n_1d_1^2 + n_2d_2^2 \ge 0$ to the weighted average, so R is true as well. But R is about variances and says nothing about how the means combine, so R does not explain A.`, d: 3, c: 'analysis', t: [3] }), (C) => {
    const avg = fr(10).mul(16).add(fr(10).mul(9)).div(20);
    C.assert(c.mean.eq(fr(40).add(50).div(2)) && c.var.cmp(avg) >= 0 && c.var.eq(fr('12.5').add(25)) && combine({ n: 10, mean: 45, var: 16 }, { n: 10, mean: 45, var: 9 }).var.eq(avg), 'equal sizes: combined mean 45 = (40 + 50)/2; combined variance 37.5 exceeds the average 12.5 (equal means give equality)'); C.key('b');
  });
}
