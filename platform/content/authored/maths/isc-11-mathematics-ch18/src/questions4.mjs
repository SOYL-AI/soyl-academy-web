// ISC 11 Mathematics ch18 - extra recall and understanding items (definitions, class marks, units).
import { Q, mk, MQ, r, T, fr, Dist, combine } from './qh.mjs';

const tx = (t) => ({ tex: t });

{
  const d = Dist.raw([2, 4, 9]), m = d.mean; // mean 5
  const a = d.sumF((x) => x.sub(m).abs()).div(3), b = d.sumF((x) => x.sub(m)).div(3), c = d.sumF((x) => x.sub(m).pow(2)).div(3), e = d.sumF((x) => x.sub(m).abs()).div(2);
  MQ('m21', {
    stem: r`For $n$ observations $x_1, x_2, \dots, x_n$ with mean $\bar{x}$, the mean deviation about the mean is defined as`,
    vals: [[tx(r`\dfrac{\sum \lvert x_i - \bar{x}\rvert}{n}`)], [tx(r`\dfrac{\sum (x_i - \bar{x})}{n}`), 'averages the signed deviations, which always give $0$'], [tx(r`\dfrac{\sum (x_i - \bar{x})^2}{n}`), 'is the variance, not the mean deviation'], [tx(r`\dfrac{\sum \lvert x_i - \bar{x}\rvert}{n - 1}`), 'divides by $n - 1$, which is not part of this definition']],
    sol: r`The mean deviation averages the absolute distances from the mean, $\dfrac{\sum \lvert x_i - \bar{x}\rvert}{n}$, so that positive and negative deviations cannot cancel.`,
    d: 1, c: 'recall', t: [1], time: 40,
    ok: m.eq(5) && a.eq(fr('8/3')) && b.eq(0) && c.eq(fr('26/3')) && e.eq(4) && !a.eq(b) && !a.eq(c) && !a.eq(e), msg: 'on 2, 4, 9 (mean 5) the four formulas give 8/3, 0, 26/3 and 4',
  });
}
{
  const g = Dist.discrete([10, 20, 30], [2, 5, 3]), m = g.mean; // mean 21
  const key = g.sumF((x) => x.sub(m).pow(2)).div(g.n), noSq = g.sumF((x) => x.sub(m).abs()).div(g.n), noSub = g.sumF((x) => x.pow(2)).div(g.n), root = key.sqrt();
  MQ('m22', {
    stem: r`For grouped data with class marks $x_i$, frequencies $f_i$, $n = \sum f_i$ and mean $\bar{x}$, the variance is`,
    vals: [[tx(r`\dfrac{\sum f_i(x_i - \bar{x})^2}{n}`)], [tx(r`\dfrac{\sum f_i\lvert x_i - \bar{x}\rvert}{n}`), 'is the mean deviation, which uses absolute values instead of squares'], [tx(r`\dfrac{\sum f_ix_i^2}{n}`), 'is the mean of the squares, with the square of the mean not subtracted'], [tx(r`\sqrt{\dfrac{\sum f_i(x_i - \bar{x})^2}{n}}`), 'is the standard deviation, the square root of the variance']],
    sol: r`The variance is the frequency-weighted mean of the squared deviations, $\dfrac{\sum f_i(x_i - \bar{x})^2}{n}$.`,
    d: 1, c: 'recall', t: [2], time: 40,
    ok: m.eq(21) && key.eq(49) && noSq.eq(fr('27/5')) && noSub.eq(490) && root.eq(7) && new Set([key, noSq, noSub, root].map(String)).size === 4, msg: 'on classes 10, 20, 30 with frequencies 2, 5, 3 the four expressions give 49, 27/5, 490 and 7',
  });
}
{
  const lo = 24, hi = 32, key = fr(lo + hi).div(2);
  MQ('m23', {
    stem: r`The lengths of imagined shells are grouped into classes, one of which is $24$–$32$ mm. For this class the class mark used as the observation is`,
    vals: [[key], [fr(hi - lo), 'is the class width, not the midpoint'], [fr(lo + hi), 'is the sum of the limits; it must be halved'], [fr(lo), 'is the lower limit of the class']],
    sol: r`The class mark is the midpoint $\dfrac{24 + 32}{2} = 28$ mm.`,
    d: 1, c: 'understanding', t: [1], time: 35,
    ok: key.eq(28) && fr(hi - lo).eq(8) && fr(lo + hi).eq(56), msg: 'class mark (24 + 32)/2 = 28',
  });
}
{
  const v = fr('6.25'), key = v.sqrt();
  MQ('m24', {
    stem: r`The rainfall readings of an imagined gauge have variance $6.25\ \text{mm}^2$. Their standard deviation is`,
    vals: [[key], [v.mul(2), 'doubles the variance instead of taking its square root'], [v.div(2), 'halves the variance instead of taking its square root'], [v.mul(v), 'squares the variance again']],
    sol: r`$\sigma = \sqrt{6.25} = 2.5$ mm, the same unit as the readings.`,
    d: 1, c: 'recall', t: [2], time: 35,
    ok: T(key) === '2.5' && key.mul(key).eq(v) && new Set([key, v.mul(2), v.div(2), v.mul(v)].map(String)).size === 4, msg: 'sqrt(6.25) = 2.5',
  });
}
Q('tf6', mk.tf({ stem: r`The standard deviation of the weights of an imagined batch of parcels, recorded in kilograms, is also expressed in kilograms.`, key: 't', sol: r`The deviations $x - \bar{x}$ are in kilograms; the variance is in $\text{kg}^2$ and its square root, the standard deviation, returns to kilograms.`, d: 1, c: 'recall', t: [2], time: 35 }), (C) => {
  const d = Dist.raw([60, 64, 72]);
  const g = Dist.raw(d.x.map((x) => x.mul(1000)));
  C.assert(d.variance.cmp(0) > 0 && g.variance.eq(d.variance.mul(1000000)), 'converting kg to g multiplies the variance by 10^6, so the standard deviation scales like the data (same unit)'); C.key('t');
});
Q('tf7', mk.tf({ stem: r`For the imagined set of delivery times $18, 25, 31, 42$ minutes, the coefficient of range is a pure number with no unit.`, key: 't', sol: r`The coefficient is $\dfrac{42 - 18}{42 + 18} = \dfrac{24}{60} = 0.4$; minutes in the numerator and denominator cancel, so it has no unit.`, d: 1, c: 'understanding', t: [1], time: 40 }), (C) => {
  C.assert(fr(42 - 18).div(42 + 18).eq(fr('2/5')) && T(fr('2/5')) === '0.4', 'coefficient 24/60 = 0.4'); C.key('t');
});
Q('fb6', mk.fill({ stem: r`When two imagined data sets are compared, the one with the smaller coefficient of variation is the more ____.`, acc: [['consistent']], sol: r`A smaller $\dfrac{\sigma}{\bar{x}} \times 100$ means less variability relative to the mean, so the data set is more consistent.`, d: 1, c: 'recall', t: [2], time: 30 }), (C) => {
  C.assert(fr(6).div(40).cmp(fr(9).div(40)) < 0, 'a smaller sigma/mean ratio means less relative variability'); C.blank('consistent');
});
Q('fb7', mk.fill({ stem: r`When the heights of imagined plants are given in classes, each class is represented in the calculations by its ____.`, acc: [['class mark', 'midpoint']], sol: r`For grouped data every observation in a class is represented by the midpoint of the class, called the class mark.`, d: 1, c: 'recall', t: [1], time: 30 }), (C) => {
  C.assert(fr(24 + 32).div(2).eq(28), 'class mark of 24-32 is 28'); C.blank('class mark');
});
{
  const c = combine({ n: 12, mean: 40, var: 0 }, { n: 18, mean: 50, var: 0 });
  MQ('m25', {
    stem: r`Two imagined groups of $12$ and $18$ trainees have mean scores $40$ and $50$, and the combined mean of the $30$ trainees is $46$. The quantity $d_1$ used in the combined-variance formula is`,
    vals: [[c.d1], [c.d1.neg(), 'has the sign reversed; $d_1$ is the group mean minus the combined mean'], [c.d2, 'is $d_2$, the gap for the second group'], [fr(40).sub(45), 'measures the gap from the plain average $45$ of the two means instead of the combined mean']],
    sol: r`$d_1 = \bar{x}_1 - \bar{x} = 40 - 46 = -6$.`,
    d: 2, c: 'understanding', t: [3], time: 45,
    ok: c.mean.eq(46) && c.d1.eq(-6) && c.d2.eq(4), msg: 'combined mean 46, d1 = -6, d2 = 4',
  });
}
Q('tf8', mk.tf({ stem: r`The combined mean of an imagined group of $20$ pupils with mean $50$ and a group of $30$ pupils with mean $70$ lies between $50$ and $70$.`, key: 't', sol: r`The combined mean $\dfrac{20(50) + 30(70)}{50} = 62$ is a weighted average of the two means, so it always lies between them, and nearer the mean of the larger group.`, d: 1, c: 'recall', t: [3], time: 40 }), (C) => {
  const c = combine({ n: 20, mean: 50, var: 0 }, { n: 30, mean: 70, var: 0 });
  C.assert(c.mean.eq(62) && c.mean.cmp(50) > 0 && c.mean.cmp(70) < 0, 'combined mean 62 lies between 50 and 70'); C.key('t');
});
