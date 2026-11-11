// Visuals for ISC 11 Mathematics ch18, summary/tips of Part 1 and everything for Part 2 (short-cut, step deviation, effect of a
// constant, coefficient of variation, correcting an observation, combined statistics). Every number is computed from exact
// data and asserted against an independent route before it is printed.
import { table, flow, r } from './lib.mjs';
import { T, fr, Dist, asTable, shortTable, stepTable, sums, sdTex, sdRound, cvRound, checkCombine, checkCorrect, surdOk } from './stat2.mjs';
import * as D from './data.mjs';
import { V, must, strips, hist, bars } from './vis.mjs';

const M = (t) => `$${t}$`;

// summary and tips (deck 1)
V.sum1 = table(['Measure', 'Rule', 'Example'], [
  ['Range', M(r`L - S`), M(`${T(D.SCORE.range)}`)],
  ['Coefficient of range', M(r`\dfrac{L - S}{L + S}`), M(r`\dfrac{21}{46}`)],
  ['Mean deviation', M(r`\dfrac{\sum f\lvert x - \bar{x}\rvert}{n}`), M(T(D.MARKS.mdMean))],
  ['Variance', M(r`\dfrac{\sum f(x - \bar{x})^2}{n}`), M(T(D.MINS.variance))],
  ['Standard deviation', M(r`\sqrt{\text{variance}}`), M(T(D.MINS.variance.sqrt()))],
], 'Summary table of Part 1: the range 42 and the coefficient of range 21 over 46 of the six scores, the mean deviation 11.6 of the grouped marks, and the variance 169 and standard deviation 13 of the practice minutes.', 'One example of each measure from this part.');
V.tips1 = table(['Do', 'Avoid'], [
  ['Find the mean first and write it down', 'Dividing by the number of classes instead of $n = \\sum f$'],
  ['Use absolute values for the mean deviation', 'Adding signed deviations: they total $0$'],
  ['Use class marks for grouped data', 'Using class limits as the observations'],
  ['Take the square root at the end for $\\sigma$', 'Stopping at the variance when $\\sigma$ is asked'],
], 'Table of exam habits for Part 1: find and write the mean first, use absolute values for the mean deviation, use class marks for grouped data and take the square root at the end, and the matching slips to avoid.', 'Marks are lost on these four slips.');

// ================================================================ deck 2
V.route2 = flow('LR', [['a', 'Short-cut method'], ['b', 'Step-deviation method'], ['c', 'Effect of a constant; coefficient of variation'], ['d', 'Correcting an observation'], ['e', 'Combined mean and standard deviation']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Route map of Part 2: the short-cut method, the step-deviation method, the effect of adding or multiplying by a constant with the coefficient of variation, correcting a wrongly copied observation, and the combined mean and standard deviation of two groups.', 'Part 2 at a glance.');
V.goals2 = table(['You will be able to', 'Using', 'Key result'], [
  ['Avoid awkward means', 'assumed mean $A$', M(r`\sigma^2 = \dfrac{\sum fd^2}{n} - \left(\dfrac{\sum fd}{n}\right)^2`)],
  ['Shrink large numbers', 'step deviation $u$', M(r`\sigma^2 = h^2\left[\dfrac{\sum fu^2}{n} - \left(\dfrac{\sum fu}{n}\right)^2\right]`)],
  ['Compare consistency', 'coefficient of variation', M(r`\dfrac{\sigma}{\bar{x}} \times 100`)],
  ['Repair a copying slip', 'sums $\\sum x$ and $\\sum x^2$', 'subtract the wrong value, add the right one'],
  ['Merge two groups', 'sizes, means and SDs', M(r`\sigma^2 = \dfrac{n_1(\sigma_1^2 + d_1^2) + n_2(\sigma_2^2 + d_2^2)}{n_1 + n_2}`)],
], 'Table of goals for Part 2: the short-cut formula with an assumed mean, the step-deviation formula, the coefficient of variation, correcting a copying slip from the sums, and the combined variance of two groups.', 'What Part 2 covers.');

// short-cut
V.shortForms = table(['Quantity', 'Formula'], [
  ['Deviation from the assumed mean $A$', M(r`d = x - A`)],
  ['Mean', M(r`\bar{x} = A + \dfrac{\sum fd}{n}`)],
  ['Variance', M(r`\sigma^2 = \dfrac{\sum fd^2}{n} - \left(\dfrac{\sum fd}{n}\right)^2`)],
  ['Check', 'The variance does not depend on the choice of $A$'],
], 'Table of the short-cut method: the deviation d equals x minus A, the mean is A plus the sum of f d over n, and the variance is the mean of f d squared minus the square of the mean of f d.', 'Choose $A$ near the middle of the data.');
{
  const d = D.CUP, A = 25, s = sums(d, A);
  must(s.sd.eq(-14) && s.sd2.eq(224) && d.mean.eq(23) && s.sd2.div(7).sub(s.sd.div(7).pow(2)).eq(28) && [20, 23, 27, 22, 30].every((a) => d.varianceAssumed(a).eq(28)), 'CUP short-cut and independence of A');
  V.short1 = asTable(shortTable(d, A), 'Working table with assumed mean 25 for the cups of tea sold on seven days: the deviations are minus 2, minus 1, minus 3, 8, minus 9, 1 and minus 8, they add to minus 14, and their squares add to 224, so the variance is 28.', 'With $A = 25$: $\\sum d = -14$, $\\sum d^2 = 224$.');
}
// step deviation
V.stepForms = table(['Quantity', 'Formula'], [
  ['Step deviation', M(r`u = \dfrac{x - A}{h}`)],
  ['Mean', M(r`\bar{x} = A + h\,\dfrac{\sum fu}{n}`)],
  ['Variance', M(r`\sigma^2 = h^2\left[\dfrac{\sum fu^2}{n} - \left(\dfrac{\sum fu}{n}\right)^2\right]`)],
  ['Standard deviation', M(r`\sigma = h\sqrt{\dfrac{\sum fu^2}{n} - \left(\dfrac{\sum fu}{n}\right)^2}`)],
], 'Table of the step-deviation method: u is x minus A over h, the mean is A plus h times the mean of f u, and the variance is h squared times the mean of f u squared minus the square of the mean of f u.', '$h$ is the common class width.');
{
  const d = D.WORK, s = sums(d, 25, 10);
  must(d.n.eq(50) && s.su.eq(-10) && s.su2.eq(100) && fr(25).add(fr(10).mul(s.su.div(50))).eq(23) && fr(100).mul(s.su2.div(50).sub(s.su.div(50).pow(2))).eq(196) && d.variance.eq(196), 'WORK step');
  V.step1 = asTable(stepTable(d, 25, 10), 'Working table for the times of 50 workers with A equal to 25 and h equal to 10: u runs from minus 2 to 2, the sum of f u is minus 10 and the sum of f u squared is 100, so the mean is 23 and the variance is 196.', '$\\sum fu = -10$, $\\sum fu^2 = 100$ give $\\bar{x} = 23$, $\\sigma^2 = 196$.');
  const sh = sums(d, 25), m = d.mean;
  const dirSS = d.sumF((x) => x.sub(m).pow(2));
  const v1 = dirSS.div(50), v2 = sh.sd2.div(50).sub(sh.sd.div(50).pow(2)), v3 = fr(100).mul(s.su2.div(50).sub(s.su.div(50).pow(2)));
  must(v1.eq(196) && v2.eq(196) && v3.eq(196) && dirSS.eq(9800) && sh.sd.eq(-100) && sh.sd2.eq(10000), 'three methods WORK');
  V.three = table(['Method', 'Sums', 'Variance'], [
    ['Direct, $\\bar{x} = 23$', M(`\\sum f(x - \\bar{x})^2 = ${T(dirSS)}`), M(`\\dfrac{${T(dirSS)}}{50} = ${T(v1)}`)],
    ['Short-cut, $A = 25$', M(`\\sum fd = ${T(sh.sd)}, \\; \\sum fd^2 = ${T(sh.sd2)}`), M(`\\dfrac{${T(sh.sd2)}}{50} - \\left(\\dfrac{${T(sh.sd)}}{50}\\right)^2 = ${T(v2)}`)],
    ['Step deviation, $A = 25$, $h = 10$', M(`\\sum fu = ${T(s.su)}, \\; \\sum fu^2 = ${T(s.su2)}`), M(`100\\left[\\dfrac{${T(s.su2)}}{50} - \\left(\\dfrac{${T(s.su)}}{50}\\right)^2\\right] = ${T(v3)}`)],
  ], 'Table of the three methods for the 50 workers: the direct method gives 9800 over 50, the short-cut method gives 10000 over 50 minus the square of minus 100 over 50, and the step-deviation method gives 100 times 2 minus 0.04; all give the variance 196.', 'Three routes, one variance: $196$.');
}
{
  const d = D.SIXC, s = sums(d, 55, 10);
  must(d.n.eq(50) && d.mean.eq(50) && d.variance.eq(225) && fr(100).mul(s.su2.div(50).sub(s.su.div(50).pow(2))).eq(225) && d.variance.sqrt().eq(15), 'SIXC step');
  V.step2 = asTable(stepTable(d, 55, 10), 'Working table for 50 items in six classes from 20 to 80 with A equal to 55 and h equal to 10: u runs from minus 3 to 2, giving the mean 50 and the variance 225, so the standard deviation is 15.', 'Six classes; $\\sigma^2 = 225$, $\\sigma = 15$.');
}
{
  const d = D.WIDE, s = sums(d, 50, 20), v = fr(400).mul(s.su2.div(40).sub(s.su.div(40).pow(2)));
  must(d.n.eq(40) && s.su.eq(0) && s.su2.eq(76) && v.eq(760) && d.variance.eq(760) && sdTex(760) === r`2\sqrt{190}` && sdRound(760, 2) === '27.57' && surdOk(760), 'WIDE');
  V.wide = asTable(stepTable(d, 50, 20), 'Working table for 40 items in five classes of width 20 with A equal to 50 and h equal to 20: the sum of f u is 0 and the sum of f u squared is 76, so the variance is 400 times 76 over 40, which is 760, and the standard deviation is about 27.57.', '$\\sigma^2 = 760$, $\\sigma = 2\\sqrt{190} \\approx 27.57$.');
}
// effect of a constant
{
  const base = Dist.raw([4, 6, 10, 12, 18]);
  const tr = (a, b) => Dist.raw(base.x.map((x) => x.mul(a).add(b)));
  const t1 = tr(1, 7), t2 = tr(3, 0), t3 = tr(3, 7);
  must(base.mean.eq(10) && base.variance.eq(24) && t1.mean.eq(17) && t1.variance.eq(24) && t2.mean.eq(30) && t2.variance.eq(216) && t3.mean.eq(37) && t3.variance.eq(216) && sdTex(24) === r`2\sqrt{6}` && sdTex(216) === r`6\sqrt{6}`, 'effect numbers');
  const row = (name, d, rule) => [name, d.x.map((x) => T(x)).join(', '), M(T(d.mean)), M(`\\sigma^2 = ${T(d.variance)}`), M(`\\sigma = ${sdTex(d.variance)}`), rule];
  V.effTable = table(['Data', 'Values', 'Mean', 'Variance', 'SD', 'Rule'], [
    row('$x$', base, '-'),
    row('$x + 7$', t1, 'mean $+ 7$; spread unchanged'),
    row('$3x$', t2, 'mean $\\times 3$; SD $\\times 3$; variance $\\times 9$'),
    row('$3x + 7$', t3, 'mean $\\times 3 + 7$; SD $\\times 3$'),
  ], 'Table for the data 4, 6, 10, 12 and 18 under four changes: adding 7 moves the mean from 10 to 17 and leaves the variance 24; multiplying by 3 gives mean 30 and variance 216; 3 x plus 7 gives mean 37 and variance 216.', 'Adding shifts the data; multiplying stretches it.');
  V.effStrips = strips([{ name: '3x', d: t2 }, { name: 'x + 7', d: t1 }, { name: 'x', d: base }], 'Dot plot of three data sets on one scale: the original 4, 6, 10, 12, 18; the same values plus 7, which sit further right with the same spread; and the original values multiplied by 3, which are spread three times as widely.', 'Shifting keeps the spread; multiplying scales it.');
}
{
  // Celsius to Fahrenheit: brute-force check on a real list with mean 30, sd 4 (ten readings)
  const raw = Dist.raw([...Array(5).fill(34), ...Array(5).fill(26)]);
  const f = Dist.raw(raw.x.map((x) => x.mul(fr('9/5')).add(32)));
  must(raw.mean.eq(30) && raw.variance.eq(16) && f.mean.eq(86) && f.variance.eq(fr(16).mul(fr('81/25'))) && f.variance.sqrt().eq(fr('36/5')) && T(f.variance) === '51.84', 'Celsius to Fahrenheit');
  V.effEx = table(['Step', 'Work'], [
    ['Rule', M(r`y = \dfrac{9}{5}x + 32`)],
    ['New mean', M(`\\dfrac{9}{5}(30) + 32 = ${T(f.mean)}`)],
    ['New SD', M(`\\dfrac{9}{5} \\times 4 = ${T(f.variance.sqrt())}`)],
    ['New variance', M(`\\left(\\dfrac{9}{5}\\right)^2 \\times 16 = ${T(f.variance)}`)],
  ], 'Worked example table: temperatures with mean 30 and standard deviation 4 degrees Celsius are converted by y equal to 9 over 5 x plus 32; the new mean is 86, the new standard deviation is 7.2 and the new variance is 51.84.', 'The $+32$ moves the mean, not the spread.');
}
// coefficient of variation
V.cvForms = table(['Quantity', 'Formula', 'Use'], [
  ['Coefficient of variation', M(r`\text{C.V.} = \dfrac{\sigma}{\bar{x}} \times 100\%`), 'compare variability when means or units differ'],
  ['More consistent', 'the data set with the smaller C.V.', 'smaller C.V. means less variability'],
  ['Same mean', 'compare the standard deviations directly', 'the larger $\\sigma$ is more variable'],
], 'Table of the coefficient of variation, sigma over the mean times 100 per cent, with the rule that the smaller value means the more consistent data set, and the shortcut when the means are equal.', 'C.V. is a pure percentage.');
{
  const cvA = cvRound(81, 60, 1), cvB = cvRound(64, 45, 1);
  const da = Dist.raw([...Array(5).fill(69), ...Array(5).fill(51)]), db = Dist.raw([...Array(4).fill(53), ...Array(4).fill(37)]);
  must(da.mean.eq(60) && da.variance.eq(81) && db.mean.eq(45) && db.variance.eq(64) && cvA === '15.0' && cvB === '17.8' && fr(cvA).cmp(cvB) < 0, 'CV example');
  V.cvEx = table(['', 'Canteen A', 'Canteen B'], [
    ['Mean daily sales', M('60'), M('45')],
    ['Standard deviation', M('9'), M('8')],
    ['C.V.', M(r`\dfrac{9}{60} \times 100 = 15.0\%`), M(r`\dfrac{8}{45} \times 100 \approx 17.8\%`)],
    ['More consistent', 'A, the smaller C.V.', ''],
  ], 'Table comparing two imagined canteens: A has mean 60 and standard deviation 9, so its coefficient of variation is 15 per cent; B has mean 45 and standard deviation 8, so its coefficient is about 17.8 per cent; A is more consistent although its standard deviation is larger.', 'The larger $\\sigma$ belongs to the more consistent canteen.');
}
// correcting a wrongly copied observation
{
  const { wrong, right, c } = checkCorrect(D.SIX.x.map((x) => x.num()), 5, 31);
  must(wrong.n.eq(6) && wrong.mean.eq(21) && wrong.variance.eq(40) && c.sx.eq(126) && c.sx2.eq(2886) && c.nsx.eq(108) && c.nsx2.eq(2094) && c.mean.eq(18) && c.var.eq(25) && right.variance.eq(25), 'SIX correction');
  V.wrongTbl = table(['Step', 'Work'], [
    ['Recover the sums', M(`\\sum x = 6 \\times 21 = ${T(c.sx)}, \\; \\sum x^2 = 6(40 + 21^2) = ${T(c.sx2)}`)],
    ['Remove the wrong value, add the right one', M(`\\sum x = ${T(c.sx)} - 31 + 13 = ${T(c.nsx)}, \\; \\sum x^2 = ${T(c.sx2)} - 31^2 + 13^2 = ${T(c.nsx2)}`)],
    ['Corrected mean', M(`\\dfrac{${T(c.nsx)}}{6} = ${T(c.mean)}`)],
    ['Corrected variance', M(`\\dfrac{${T(c.nsx2)}}{6} - ${T(c.mean)}^2 = ${T(c.var)}`)],
  ], 'Table for six marks whose recorded mean is 21 and variance 40 because 13 was copied as 31: the sums 126 and 2886 become 108 and 2094, so the correct mean is 18 and the correct variance is 25.', 'Work with $\\sum x$ and $\\sum x^2$, not with the mean.');
}
{
  const raw = [35, 32, 26, 42, 37, 34, 29, 21];
  const { wrong, right, c } = checkCorrect(raw, 7, 45);
  must(wrong.mean.eq(35) && wrong.variance.eq(35) && right.mean.eq(32) && right.variance.eq(38) && c.mean.eq(32) && c.var.eq(38) && c.nsx.eq(256) && c.nsx2.eq(8 * (38 + 32 * 32)), 'eight readings correction');
  V.wrongEx2 = table(['Step', 'Work'], [
    ['Recover the sums', M(`\\sum x = 8 \\times 35 = ${T(c.sx)}, \\; \\sum x^2 = 8(35 + 35^2) = ${T(c.sx2)}`)],
    ['Correct them', M(`\\sum x = ${T(c.sx)} - 45 + 21 = ${T(c.nsx)}, \\; \\sum x^2 = ${T(c.sx2)} - 45^2 + 21^2 = ${T(c.nsx2)}`)],
    ['Corrected mean and variance', M(`\\dfrac{${T(c.nsx)}}{8} = ${T(c.mean)}, \\quad \\dfrac{${T(c.nsx2)}}{8} - ${T(c.mean)}^2 = ${T(c.var)}`)],
  ], 'Table for eight readings with recorded mean 35 and variance 35 where 21 was copied as 45: the corrected sums are 256 and 8496 giving the mean 32 and the variance 38.', 'Corrected mean $32$, variance $38$.');
}
// combined statistics
V.combFlow = flow('LR', [['a', 'Group 1: size, mean, SD'], ['b', 'Group 2: size, mean, SD'], ['c', 'Combined mean'], ['d', 'd1 and d2: group mean minus combined mean'], ['e', 'Combined variance, then SD']], [['a', 'c'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow chart for combining two groups: the sizes, means and standard deviations give the combined mean; the differences d1 and d2 of the group means from the combined mean then give the combined variance and standard deviation.', 'The route to the combined standard deviation.');
{
  const g1 = { n: 30, mean: 72, var: 36 }, g2 = { n: 20, mean: 62, var: 16 };
  const c = checkCombine(g1, g2);
  must(c.n.eq(50) && c.mean.eq(68) && c.d1.eq(4) && c.d2.eq(-6) && c.var.eq(52) && sdTex(52) === r`2\sqrt{13}` && sdRound(52, 2) === '7.21', 'combined example 1');
  V.combEx = table(['', 'Group 1', 'Group 2', 'Combined'], [
    ['Size $n$', M('30'), M('20'), M(T(c.n))],
    ['Mean', M('72'), M('62'), M(`\\dfrac{30(72) + 20(62)}{50} = ${T(c.mean)}`)],
    ['SD $\\sigma$', M('6'), M('4'), M(`\\sqrt{${T(c.var)}} = ${sdTex(c.var)} \\approx 7.21`)],
    ['$d$ = mean $-$ combined mean', M(T(c.d1)), M(T(c.d2)), ''],
    ['$n(\\sigma^2 + d^2)$', M(`30(36 + 16) = ${T(fr(30).mul(52))}`), M(`20(16 + 36) = ${T(fr(20).mul(52))}`), M(`\\dfrac{${T(fr(30).mul(52).add(fr(20).mul(52)))}}{50} = ${T(c.var)}`)],
  ], 'Table combining two groups: 30 pupils with mean 72 and standard deviation 6, and 20 pupils with mean 62 and standard deviation 4. The combined mean is 68, d1 is 4 and d2 is minus 6, and the combined variance is 2600 over 50, which is 52, so the combined standard deviation is 2 root 13, about 7.21.', 'Combined mean $68$; combined variance $52$.');
  must(fr(30).mul(52).add(fr(20).mul(52)).eq(2600) && fr(30).mul(fr(36).add(16)).eq(fr(30).mul(52)) && fr(20).mul(fr(16).add(36)).eq(fr(20).mul(52)), 'combEx numbers');
}
{
  const g1 = { n: 20, mean: 55, var: 36 }, g2 = { n: 30, mean: 65, var: 36 };
  const c = checkCombine(g1, g2);
  must(c.mean.eq(61) && c.d1.eq(-6) && c.d2.eq(4) && c.var.eq(60) && sdTex(60) === r`2\sqrt{15}` && sdRound(60, 2) === '7.75', 'combined example 2');
  const v2 = fr(50).mul(60).sub(fr(20).mul(72)).div(30).sub(16);
  must(v2.eq(36) && fr(20).mul(72).eq(1440) && fr(30).mul(16).eq(480) && fr(3000).sub(1440).sub(480).div(30).eq(36), 'unknown group variance 36');
  V.combEx2 = table(['Step', 'Work'], [
    ['Combined mean', M(`\\dfrac{20(55) + 30(65)}{50} = ${T(c.mean)}`)],
    ['$d_1$ and $d_2$', M(`d_1 = ${T(c.d1)}, \\; d_2 = ${T(c.d2)}`)],
    ['Use the combined variance $60$', M(`50 \\times 60 = 20(36 + 36) + 30(\\sigma_2^2 + 16)`)],
    ['Solve', M(`3000 = 1440 + 30\\sigma_2^2 + 480 \\Rightarrow \\sigma_2^2 = ${T(v2)}, \\; \\sigma_2 = 6`)],
  ], 'Table that finds an unknown standard deviation: for groups of 20 with mean 55 and standard deviation 6 and 30 with mean 65, a combined standard deviation of root 60 gives 3000 equal to 1440 plus 30 sigma squared plus 480, so the second standard deviation squared is 36 and the second standard deviation is 6.', 'Rearrange the combined-variance formula for the unknown.');
}
V.sum2 = table(['Topic', 'Rule'], [
  ['Short-cut', M(r`\sigma^2 = \dfrac{\sum fd^2}{n} - \left(\dfrac{\sum fd}{n}\right)^2, \; d = x - A`)],
  ['Step deviation', M(r`\sigma^2 = h^2\left[\dfrac{\sum fu^2}{n} - \left(\dfrac{\sum fu}{n}\right)^2\right]`)],
  ['Change of origin and scale', M(r`y = ax + b \Rightarrow \sigma_y = \lvert a\rvert\,\sigma_x`)],
  ['Coefficient of variation', M(r`\dfrac{\sigma}{\bar{x}} \times 100`)],
  ['Combined variance', M(r`\dfrac{n_1(\sigma_1^2 + d_1^2) + n_2(\sigma_2^2 + d_2^2)}{n_1 + n_2}`)],
], 'Summary table of Part 2: the short-cut and step-deviation formulas, the effect of y equal to a x plus b on the standard deviation, the coefficient of variation and the combined variance of two groups.', 'The five rules of Part 2.');
V.tips2 = table(['Do', 'Avoid'], [
  ['Set out a table with $d$ or $u$, $fd$ or $fu$ and $fd^2$ or $fu^2$', 'Mixing the sums of two different methods'],
  ['Multiply by $h^2$ for the variance and by $h$ for the standard deviation', 'Forgetting $h$ after using $u$'],
  ['Give $\\sigma$ as a surd or to the decimals asked', 'Rounding the variance early'],
  ['Use the sums $\\sum x$, $\\sum x^2$ to correct a copying slip', 'Correcting the mean and the variance separately'],
  ['Find the combined mean first, then $d_1$, $d_2$', 'Averaging the two standard deviations'],
], 'Table of exam habits for Part 2: set out the working table, multiply by h squared for the variance, give the standard deviation as a surd or as asked, correct a slip using the sums, and find the combined mean before d1 and d2.', 'Five habits that protect the marks.');
// notes-only visuals
V.noteBars = bars(D.BOOKS, 'pages read per night', 'Bar chart of the pages read per night by 40 pupils: 14 pupils read 10 pages, 4 read 20, 10 read 30, 8 read 40 and 4 read 50.', 'A discrete frequency distribution.');
must(D.BOOKS.f.map((f) => T(f)).join() === '14,4,10,8,4', 'BOOKS freq');
export { V };
