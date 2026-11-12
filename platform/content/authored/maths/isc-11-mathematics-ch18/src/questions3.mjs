// ISC 11 Mathematics ch18 - 3-mark short-answer and 5-mark long-answer items.
import { Q, mk, r, $, T, fr, Dist, ftab, sdTex, sdRound, cvRound, checkCombine, checkCorrect, combine, synth, sums, mdWork, dirWork, shortWork, stepWork, combWork, corrWork, sdSentence, md, mdn, dirTable } from './qh.mjs';

import * as D from './data.mjs';
const sd = (v, dp = 2) => (fr(v).sqrt() ? T(fr(v).sqrt()) : sdRound(v, dp));

// ============================================================ short, 3 marks
{
  const d = Dist.discrete([5, 10, 15, 20, 25], [3, 6, 8, 2, 1]);
  Q('s301', mk.short({ marks: 3, stem: r`The number of emails answered per hour by an imagined help desk over $20$ hours is:` + `\n\n${ftab(d, 'Emails', 'Hours')}\n\n` + r`Find the mean deviation about the mean.`, model: mdWork(d), sol: 'Find the mean, then the frequency-weighted absolute deviations.', scheme: [['$\\bar{x} = \\dfrac{260}{20} = 13$', 1], ['$\\sum f\\lvert x - \\bar{x}\\rvert = 24 + 18 + 16 + 14 + 12 = 84$', 1], ['Mean deviation $= \\dfrac{84}{20} = 4.2$', 1]], d: 3, c: 'application', t: [1], time: 150 }), (C) => {
    C.assert(d.n.eq(20) && d.sumFx.eq(260) && d.mean.eq(13) && d.sumF((x) => x.sub(13).abs()).eq(84) && T(d.mdMean) === '4.2', 'mean 13, sum 84, mean deviation 4.2'); C.model([260, 20, 13, 84, 4.2]);
  });
}
{
  const d = D.FIVEW;
  Q('s302', mk.short({ marks: 3, stem: r`The time, in minutes, that $30$ imagined pupils spent on a puzzle is grouped as follows:` + `\n\n${ftab(d, 'Time (min)', 'Pupils')}\n\n` + r`Find the mean deviation about the mean.`, model: mdWork(d), sol: 'Use class marks as the observations.', scheme: [['Class marks $2.5, 7.5, 12.5, 17.5, 22.5$ and mean $14.5$', 1], ['$\\sum f\\lvert x - \\bar{x}\\rvert = 150$', 1], ['Mean deviation $= \\dfrac{150}{30} = 5$', 1]], d: 3, c: 'application', t: [1], time: 160 }), (C) => {
    C.assert(d.x.map((x) => T(x)).join() === '2.5,7.5,12.5,17.5,22.5' && d.n.eq(30) && d.mean.eq(fr('14.5')) && d.sumF((x) => x.sub(fr('14.5')).abs()).eq(150) && d.mdMean.eq(5), 'class marks 2.5..22.5, mean 14.5, sum 150, mean deviation 5'); C.model([2.5, 7.5, 12.5, 17.5, 22.5, 30, 14.5, 150, 5]);
  });
}
{
  const d = Dist.raw([48, 52, 55, 61, 44, 50, 58, 40]);
  Q('s303', mk.short({ marks: 3, stem: r`The marks of eight imagined pupils are $48, 52, 55, 61, 44, 50, 58, 40$. Using the assumed mean $A = 50$, find the variance and the standard deviation (two decimal places).`, model: shortWork(d, 50), sol: 'Deviations from the assumed mean, then the short-cut formula.', scheme: [['$d = x - 50$: $-2, 2, 5, 11, -6, 0, 8, -10$', 1], ['$\\sum d = 8$, $\\sum d^2 = 354$', 1], ['$\\sigma^2 = 43.25$, $\\sigma \\approx 6.58$', 1]], d: 3, c: 'application', t: [2], time: 170 }), (C) => {
    const s = sums(d, 50);
    C.assert(s.sd.eq(8) && s.sd2.eq(354) && d.variance.eq(fr('43.25')) && d.varianceAssumed(50).eq(d.variance) && d.varianceAssumed(51).eq(d.variance) && sdRound(d.variance, 2) === '6.58', 'sum d 8, sum d^2 354, variance 43.25 (same for A = 50 and A = 51), SD 6.58'); C.model([50, 8, 354, 43.25, 6.58]);
  });
}
{
  const d = Dist.discrete([10, 20, 30, 40, 50], [6, 9, 15, 6, 4]);
  Q('s304', mk.short({ marks: 3, stem: r`The number of pages read in an evening by $40$ imagined club members is:` + `\n\n${ftab(d, 'Pages', 'Members')}\n\n` + r`Using $A = 30$ and $h = 10$ in the step-deviation method, find the variance and the standard deviation (two decimal places).`, model: stepWork(d, 30, 10), sol: 'Step deviations $u = \\dfrac{x - 30}{10}$; remember the factor $h^2$.', scheme: [['$u = -2, -1, 0, 1, 2$ and $\\sum fu = -7$', 1], ['$\\sum fu^2 = 55$', 1], ['$\\sigma^2 = 134.4375$, $\\sigma \\approx 11.59$', 1]], d: 4, c: 'application', t: [2], time: 180 }), (C) => {
    const s = sums(d, 30, 10);
    C.assert(s.su.eq(-7) && s.su2.eq(55) && d.variance.eq(fr('134.4375')) && d.varianceStep(30, 10).eq(d.variance) && d.varianceAssumed(30).eq(d.variance) && sdRound(d.variance, 2) === '11.59', 'sum fu -7, sum fu^2 55, variance 134.4375 (three routes), SD 11.59'); C.model([30, 10, 7, 55, 134.4375, 11.59]);
  });
}
{
  const d = D.FOURW;
  Q('s305', mk.short({ marks: 3, stem: r`The lengths of $50$ imagined seedlings, in millimetres, are grouped as follows:` + `\n\n${ftab(d, 'Length (mm)', 'Seedlings')}\n\n` + r`Taking $A = 20$ and $h = 4$, find the standard deviation, correct to two decimal places.`, model: stepWork(d, 20, 4), sol: 'Use class marks, $u = \\dfrac{x - 20}{4}$, and multiply by $h^2$.', scheme: [['Class marks $10, 14, \\dots, 30$ and $u = \\dfrac{x - 20}{4}$: $-2.5, -1.5, -0.5, 0.5, 1.5, 2.5$', 1], ['$\\sum fu$ and $\\sum fu^2$ from the table', 1], ['$\\sigma^2 = 52$, $\\sigma = 2\\sqrt{13} \\approx 7.21$', 1]], d: 4, c: 'application', t: [2], time: 190 }), (C) => {
    C.assert(d.variance.eq(52) && d.varianceStep(20, 4).eq(52) && d.varianceAssumed(20).eq(52) && sdTex(52) === r`2\sqrt{13}` && sdRound(52, 2) === '7.21', 'variance 52 by direct, assumed-mean and step routes; SD 7.21'); C.model([20, 4, 52, 7.21]);
  });
}
{
  const P = Dist.raw([24, 30, 36, 42, 48]), Qd = Dist.raw([10, 14, 18, 22, 26]);
  const cp = cvRound(P.variance, P.mean, 1), cq = cvRound(Qd.variance, Qd.mean, 1);
  Q('s306', mk.short({ marks: 3, stem: r`The daily takings (in hundreds of rupees) of two imagined stalls over five days are $P$: $24, 30, 36, 42, 48$ and $Q$: $10, 14, 18, 22, 26$. Which stall's takings are more consistent?`, model: `For $P$: mean $= 36$, deviations $-12, -6, 0, 6, 12$, so $\\sigma^2 = \\dfrac{144 + 36 + 0 + 36 + 144}{5} = 72$, $\\sigma = 6\\sqrt{2} \\approx 8.49$ and C.V. $= \\dfrac{8.49}{36} \\times 100 \\approx ${cp}\\%$.\n\nFor $Q$: mean $= 18$, deviations $-8, -4, 0, 4, 8$, so $\\sigma^2 = \\dfrac{64 + 16 + 0 + 16 + 64}{5} = 32$, $\\sigma = 4\\sqrt{2} \\approx 5.66$ and C.V. $\\approx ${cq}\\%$.\n\nStall $P$ has the smaller coefficient of variation, so its takings are more consistent.`, sol: 'Compare coefficients of variation because the means differ.', scheme: [['Means $36$ and $18$; variances $72$ and $32$', 1], ['C.V. of $P$ and $Q$', 1], ['$P$ is more consistent', 1]], d: 4, c: 'analysis', t: [2], time: 180 }), (C) => {
    C.assert(P.mean.eq(36) && Qd.mean.eq(18) && P.variance.eq(72) && Qd.variance.eq(32) && cp === '23.6' && cq === '31.4' && fr(cp).cmp(cq) < 0, 'means 36, 18; variances 72, 32; C.V. 23.6% and 31.4%'); C.model([36, 18, 72, 32, 23.6, 31.4]);
  });
}
{
  const rawRight = [38, 55, 46, 19, 17];
  const { wrong, right, c } = checkCorrect(rawRight, 1, 80);
  Q('s307', mk.short({ marks: 3, stem: r`For five imagined readings the recorded mean is $40$ and the recorded variance is $522$. It is then found that the reading $55$ was copied as $80$. Find the correct mean and the correct variance.`, model: corrWork(5, 40, 522, 80, 55), sol: 'Correct the sums $\\sum x$ and $\\sum x^2$, then recompute.', scheme: [['$\\sum x = 200$ and $\\sum x^2 = 5(522 + 1600) = 10610$', 1], ['Corrected sums $175$ and $7235$, mean $35$', 1], ['Variance $\\dfrac{7235}{5} - 35^2 = 222$', 1]], d: 4, c: 'application', t: [2], time: 170 }), (C) => {
    C.assert(wrong.mean.eq(40) && wrong.variance.eq(522) && c.sx.eq(200) && c.sx2.eq(10610) && c.nsx.eq(175) && c.nsx2.eq(7235) && c.mean.eq(35) && c.var.eq(222) && right.variance.eq(222), 'sums 200, 10610 become 175, 7235; mean 35, variance 222 (matches the true list)'); C.model([40, 522, 200, 10610, 175, 7235, 35, 222]);
  });
}
{
  const g1 = { n: 18, mean: 44, var: 16 }, g2 = { n: 12, mean: 54, var: 9 };
  const c = checkCombine(g1, g2);
  Q('s308', mk.short({ marks: 3, stem: r`A group of $18$ imagined players has mean score $44$ and standard deviation $4$; another group of $12$ players has mean score $54$ and standard deviation $3$. Find the mean and the standard deviation of all $30$ players (two decimal places).`, model: combWork(g1, g2), sol: 'Combined mean first, then $d_1$, $d_2$ and the combined variance.', scheme: [['Combined mean $48$', 1], ['$d_1 = -4$, $d_2 = 6$ and $\\sigma^2 = \\dfrac{576 + 540}{30} = 37.2$', 1], ['$\\sigma \\approx 6.10$', 1]], d: 4, c: 'application', t: [3], time: 180 }), (C) => {
    C.assert(c.mean.eq(48) && c.d1.eq(-4) && c.d2.eq(6) && c.var.eq(fr('37.2')) && fr(576).add(540).div(30).eq(c.var) && sdRound(c.var, 2) === '6.10', 'combined mean 48, variance 1116/30 = 37.2, SD 6.10 (merged data)'); C.model([44, 18, 54, 12, 48, 576, 540, 37.2, 6.1]);
  });
}
{
  const n = fr(30 * 52 - 0).sub(0), nB = fr(180).div(4);
  const c = combine({ n: 30, mean: 52, var: 0 }, { n: nB, mean: 62, var: 0 });
  Q('s309', mk.short({ marks: 3, stem: r`An imagined group $A$ of $30$ students has mean score $52$. It is joined by a group $B$ of unknown size with mean score $62$, and the mean of the combined group is $58$. Find the size of group $B$.`, model: r`Let group $B$ have $m$ students. The combined mean gives $\dfrac{30(52) + m(62)}{30 + m} = 58$, so $1560 + 62m = 58(30 + m) = 1740 + 58m$. Then $4m = 180$ and $m = 45$.`, sol: 'Set the weighted mean equal to $58$ and solve for the size.', scheme: [['$\\dfrac{30(52) + 62m}{30 + m} = 58$', 1], ['$1560 + 62m = 1740 + 58m$', 1], ['$m = 45$', 1]], d: 3, c: 'application', t: [3], time: 130 }), (C) => {
    C.assert(nB.eq(45) && c.mean.eq(58) && fr(1560).eq(30 * 52) && fr(58).mul(30).eq(1740), 'size 45 reproduces the combined mean 58'); C.model([30, 52, 62, 58, 1560, 1740, 180, 4, 45]);
  });
}
{
  const X = Dist.raw([22, 26, 30, 34, 38]), Y = Dist.raw([18, 28, 30, 32, 42]);
  Q('s310', mk.short({ marks: 3, stem: r`Two imagined shops record their daily customers over five days: shop $X$ had $22, 26, 30, 34, 38$ and shop $Y$ had $18, 28, 30, 32, 42$. Find the mean deviation about the mean for each shop and say which shop's numbers are more spread out.`, model: `Both means are $\\dfrac{150}{5} = 30$.\n\nShop $X$: $\\dfrac{8 + 4 + 0 + 4 + 8}{5} = \\dfrac{24}{5} = 4.8$.\n\nShop $Y$: $\\dfrac{12 + 2 + 0 + 2 + 12}{5} = \\dfrac{28}{5} = 5.6$.\n\nThe means are equal and shop $Y$ has the larger mean deviation, so shop $Y$ is more spread out.`, sol: 'With equal means, compare the mean deviations.', scheme: [['Both means $30$', 1], ['Mean deviations $4.8$ and $5.6$', 1], ['$Y$ is more spread out', 1]], d: 3, c: 'analysis', t: [1], time: 130 }), (C) => {
    C.assert(X.mean.eq(30) && Y.mean.eq(30) && T(X.mdMean) === '4.8' && T(Y.mdMean) === '5.6' && Y.mdMean.cmp(X.mdMean) > 0, 'means 30; mean deviations 4.8 and 5.6'); C.model([150, 5, 30, 24, 4.8, 28, 5.6]);
  });
}
{
  const d = Dist.raw([4, 9, 11, 12, 14]);
  Q('s311', mk.short({ marks: 3, stem: r`For the five imagined readings $4, 9, 11, 12, 14$, find the variance by the definition $\dfrac{\sum(x - \bar{x})^2}{n}$ and verify it using $\dfrac{\sum x^2}{n} - \bar{x}^2$.`, model: `${dirWork(d)}\n\nCheck: $\\sum x^2 = 16 + 81 + 121 + 144 + 196 = 558$, so $\\dfrac{558}{5} - 10^2 = 111.6 - 100 = 11.6$, the same value.`, sol: 'Two routes must give the same variance.', scheme: [['Mean $10$ and squared deviations $36, 1, 1, 4, 16$', 1], ['$\\sigma^2 = \\dfrac{58}{5} = 11.6$', 1], ['Check $111.6 - 100 = 11.6$', 1]], d: 3, c: 'application', t: [2], time: 140 }), (C) => {
    C.assert(d.mean.eq(10) && d.sumF((x) => x.sub(10).pow(2)).eq(58) && d.variance.eq(fr('11.6')) && d.sumF((x) => x.pow(2)).eq(558) && d.varianceShortcut.eq(d.variance), 'mean 10, sum of squares 58, variance 11.6; sum x^2 = 558 gives the same'); C.model([10, 36, 1, 4, 16, 58, 11.6, 558, 111.6, 100]);
  });
}

// ============================================================ long, 5 marks
{
  const d = Dist.discrete([10, 20, 30, 40, 50], [5, 9, 12, 9, 5]);
  Q('l01', mk.long({ stem: r`The typing speeds, in words per minute, of $40$ imagined trainees are:` + `\n\n${ftab(d, 'Speed', 'Trainees')}\n\n` + r`Find

(a) the mean speed, [1]

(b) the mean deviation about the mean, [2]

(c) the variance and the standard deviation, correct to two decimal places. [2]`, model: `(a) $\\bar{x} = \\dfrac{\\sum fx}{n} = \\dfrac{${T(d.sumFx)}}{40} = ${T(d.mean)}$.\n\n(b) ${mdWork(d)}\n\n(c) ${dirWork(d)}`, sol: 'The mean is needed in both later parts.', scheme: [['(a) Mean $= 30$', 1], ['(b) $\\sum f\\lvert x - \\bar{x}\\rvert = 380$', 1], ['(b) Mean deviation $= 9.5$', 1], ['(c) $\\sum f(x - \\bar{x})^2 = 5800$ and $\\sigma^2 = 145$', 1], ['(c) $\\sigma \\approx 12.04$', 1]], d: 3, c: 'application', t: [1, 2], time: 360 }), (C) => {
    C.assert(d.sumFx.eq(1200) && d.mean.eq(30) && d.sumF((x) => x.sub(30).abs()).eq(380) && d.mdMean.eq(fr('9.5')) && d.sumF((x) => x.sub(30).pow(2)).eq(5800) && d.variance.eq(145) && d.varianceAssumed(25).eq(145) && sdRound(145, 2) === '12.04', 'mean 30, sum 380, mean deviation 9.5, variance 145, SD 12.04'); C.model([1200, 30, 380, 9.5, 5800, 145, 12.04]);
  });
}
{
  const d = D.FORTY;
  Q('l02', mk.long({ stem: r`The monthly savings, in hundreds of rupees, of $40$ imagined households are grouped as follows:` + `\n\n${ftab(d, 'Savings', 'Households')}\n\n` + r`Find

(a) the mean savings, [1]

(b) the mean deviation about the mean, [2]

(c) the standard deviation by the step-deviation method with $A = 35$ and $h = 10$. [2]`, model: `(a) The class marks are $15, 25, 35, 45, 55$ and $\\bar{x} = \\dfrac{${T(d.sumFx)}}{40} = ${T(d.mean)}$.\n\n(b) ${mdWork(d)}\n\n(c) ${stepWork(d, 35, 10)}`, sol: 'Class marks first; the same mean serves parts (a) and (b).', scheme: [['(a) Mean $= 37$', 1], ['(b) $\\sum f\\lvert x - \\bar{x}\\rvert = 468$', 1], ['(b) Mean deviation $= 11.7$', 1], ['(c) $\\sum fu$ and $\\sum fu^2$ with $A = 35$, $h = 10$', 1], ['(c) $\\sigma^2 = 196$, $\\sigma = 14$', 1]], d: 4, c: 'application', t: [1, 2], time: 400 }), (C) => {
    const s = sums(d, 35, 10);
    C.assert(d.sumFx.eq(1480) && d.mean.eq(37) && d.sumF((x) => x.sub(37).abs()).eq(468) && T(d.mdMean) === '11.7' && d.variance.eq(196) && d.varianceStep(35, 10).eq(196) && s.su.eq(fr(1480).sub(35 * 40).div(10)) && d.variance.sqrt().eq(14), 'mean 37, sum 468, mean deviation 11.7, variance 196 by step deviation, SD 14'); C.model([1480, 37, 468, 11.7, 196, 14]);
  });
}
{
  const P = Dist.raw([16, 20, 24, 28, 32]), Qd = Dist.raw([30, 36, 42, 48, 54]);
  const cp = cvRound(P.variance, P.mean, 1), cq = cvRound(Qd.variance, Qd.mean, 1);
  Q('l03', mk.long({ stem: r`The marks of five pupils in each of two imagined sections are $P$: $16, 20, 24, 28, 32$ and $Q$: $30, 36, 42, 48, 54$.

(a) Find the mean and the variance of each section. [2]

(b) Find the standard deviation of each section as a surd. [1]

(c) Find the coefficient of variation of each section, correct to one decimal place. [1]

(d) State, with a reason, which section's marks are more consistent. [1]`, model: `(a) $P$: mean $= \\dfrac{120}{5} = 24$, deviations $-8, -4, 0, 4, 8$, squares $64, 16, 0, 16, 64$ with sum $160$, so $\\sigma^2 = \\dfrac{160}{5} = 32$. $Q$: mean $= \\dfrac{210}{5} = 42$, deviations $-12, -6, 0, 6, 12$, squares $144, 36, 0, 36, 144$ with sum $360$, so $\\sigma^2 = \\dfrac{360}{5} = 72$.\n\n(b) $\\sigma_P = \\sqrt{32} = 4\\sqrt{2}$ and $\\sigma_Q = \\sqrt{72} = 6\\sqrt{2}$.\n\n(c) C.V.$(P) = \\dfrac{4\\sqrt{2}}{24} \\times 100 \\approx ${cp}\\%$ and C.V.$(Q) = \\dfrac{6\\sqrt{2}}{42} \\times 100 \\approx ${cq}\\%$.\n\n(d) Section $Q$ has the smaller coefficient of variation, so its marks are more consistent, although its standard deviation is larger.`, sol: 'Equal-looking spreads are compared by the coefficient of variation.', scheme: [['(a) Means $24$ and $42$', 1], ['(a) Variances $32$ and $72$', 1], ['(b) $4\\sqrt{2}$ and $6\\sqrt{2}$', 1], ['(c) C.V. $\\approx 23.6\\%$ and $20.2\\%$', 1], ['(d) $Q$ is more consistent (smaller C.V.)', 1]], d: 4, c: 'analysis', t: [2], time: 380 }), (C) => {
    C.assert(P.mean.eq(24) && Qd.mean.eq(42) && P.variance.eq(32) && Qd.variance.eq(72) && sdTex(32) === r`4\sqrt{2}` && sdTex(72) === r`6\sqrt{2}` && cp === '23.6' && cq === '20.2' && fr(cq).cmp(cp) < 0, 'means 24, 42; variances 32, 72; C.V. 23.6% and 20.2%'); C.model([120, 24, 160, 32, 210, 42, 360, 72, 23.6, 20.2]);
  });
}
{
  const rawRight = [42, 18, 52, 19, 60, 13, 49, 26, 25, 56, 22, 26];
  const { wrong, right, c } = checkCorrect(rawRight, 8, 73);
  Q('l04', mk.long({ stem: r`Twelve imagined readings were recorded with mean $38$ and variance $358$. Later it was found that the reading $25$ had been copied wrongly as $73$.

(a) Find the correct values of $\sum x$ and $\sum x^2$. [2]

(b) Find the correct mean. [1]

(c) Find the correct variance and the correct standard deviation, correct to two decimal places. [2]`, model: `(a) $\\sum x = 12 \\times 38 = 456$ and $\\sum x^2 = 12(358 + 38^2) = 21624$. Removing $73$ and adding $25$: $\\sum x = 456 - 73 + 25 = 408$ and $\\sum x^2 = 21624 - 73^2 + 25^2 = 16920$.\n\n(b) The corrected mean is $\\dfrac{408}{12} = 34$.\n\n(c) $\\sigma^2 = \\dfrac{16920}{12} - 34^2 = 1410 - 1156 = 254$ and $\\sigma = \\sqrt{254} \\approx 15.94$.`, sol: 'Rebuild the sums from the recorded statistics, then swap the wrong value for the right one.', scheme: [['(a) Recorded $\\sum x = 456$ and $\\sum x^2 = 12(358 + 1444) = 21624$', 1], ['(a) Corrected sums $408$ and $16920$', 1], ['(b) Corrected mean $34$', 1], ['(c) $\\sigma^2 = 254$', 1], ['(c) $\\sigma \\approx 15.94$', 1]], d: 4, c: 'application', t: [2], time: 360 }), (C) => {
    C.assert(wrong.mean.eq(38) && wrong.variance.eq(358) && c.sx.eq(456) && c.sx2.eq(21624) && c.nsx.eq(408) && c.nsx2.eq(16920) && c.mean.eq(34) && c.var.eq(254) && right.variance.eq(254) && sdRound(254, 2) === '15.94', 'recorded sums 456, 21624; corrected mean 34, variance 254, SD 15.94 (matches the true list)'); C.model([456, 21624, 408, 34, 254, 16920, 1410, 1156, 15.94]);
  });
}
{
  const g1 = { n: 20, mean: 48, var: 25 }, g2 = { n: 30, mean: 58, var: 9 };
  const c = checkCombine(g1, g2);
  Q('l05', mk.long({ stem: r`Two imagined groups of pupils sat the same test. The $20$ pupils of group $A$ had mean score $48$ and standard deviation $5$; the $30$ pupils of group $B$ had mean score $58$ and standard deviation $3$.

(a) Find the mean score of all $50$ pupils. [1]

(b) Find $d_1$ and $d_2$, the differences of the group means from the combined mean. [1]

(c) Find the variance of all $50$ scores. [2]

(d) Find their standard deviation, correct to two decimal places. [1]`, model: `(a) Combined mean $= \\dfrac{20(48) + 30(58)}{50} = \\dfrac{960 + 1740}{50} = 54$.\n\n(b) $d_1 = 48 - 54 = -6$ and $d_2 = 58 - 54 = 4$.\n\n(c) $\\sigma^2 = \\dfrac{20(25 + 36) + 30(9 + 16)}{50} = \\dfrac{1220 + 750}{50} = \\dfrac{1970}{50} = 39.4$.\n\n(d) $\\sigma = \\sqrt{39.4} \\approx 6.28$.`, sol: 'Combined mean first, then the $d$ values, then the combined variance.', scheme: [['(a) Combined mean $54$', 1], ['(b) $d_1 = -6$ and $d_2 = 4$', 1], ['(c) $20(25 + 36) + 30(9 + 16) = 1970$', 1], ['(c) $\\sigma^2 = \\dfrac{1970}{50} = 39.4$', 1], ['(d) $\\sigma \\approx 6.28$', 1]], d: 4, c: 'application', t: [3], time: 360 }), (C) => {
    C.assert(c.mean.eq(54) && c.d1.eq(-6) && c.d2.eq(4) && fr(20).mul(61).add(fr(30).mul(25)).eq(1970) && c.var.eq(fr('39.4')) && sdRound(c.var, 2) === '6.28', 'combined mean 54, d = -6 and 4, variance 1970/50 = 39.4, SD 6.28 (merged data)'); C.model([20, 48, 30, 58, 54, 1220, 750, 1970, 39.4, 6.28]);
  });
}
{
  const d = Dist.raw([27, 18, 54, 36, 24, 57]), y = Dist.raw(d.x.map((x) => x.div(2).add(4)));
  Q('l06', mk.long({ stem: r`The numbers of units sold by six imagined shops in a week are $27, 18, 54, 36, 24, 57$.

(a) Using the assumed mean $A = 35$, find the variance of the sales by the short-cut method. [3]

(b) Each shop's figure $x$ is converted into a score $y = \dfrac{x}{2} + 4$. Find the mean and the standard deviation of $y$ (two decimal places). [2]`, model: `(a) ${shortWork(d, 35)}\n\n(b) The mean of $x$ is $${T(d.mean)}$, so the mean of $y$ is $\\dfrac{${T(d.mean)}}{2} + 4 = ${T(y.mean)}$. The variance of $y$ is $\\left(\\dfrac{1}{2}\\right)^2 \\times ${T(d.variance)} = ${T(y.variance)}$, so $\\sigma_y = \\sqrt{${T(y.variance)}} \\approx ${sdRound(y.variance, 2)}$.`, sol: 'Part (b) uses the change-of-scale rule; the added $4$ does not change the spread.', scheme: [['(a) $d = x - 35$ and $\\sum d = 6$', 1], ['(a) $\\sum d^2 = 1320$', 1], ['(a) $\\sigma^2 = 220 - 1 = 219$', 1], ['(b) Mean of $y = 22$', 1], ['(b) $\\sigma_y^2 = 54.75$, $\\sigma_y \\approx 7.40$', 1]], d: 4, c: 'application', t: [2], time: 380 }), (C) => {
    const s = sums(d, 35);
    C.assert(d.mean.eq(36) && s.sd.eq(6) && s.sd2.eq(1320) && d.variance.eq(219) && d.varianceAssumed(36).eq(219) && y.mean.eq(22) && y.variance.eq(fr('54.75')) && sdRound(y.variance, 2) === '7.40', 'sum d 6, sum d^2 1320, variance 219; y has mean 22, variance 54.75, SD 7.40 (true list)'); C.model([35, 6, 1320, 219, 36, 22, 54.75, 7.4]);
  });
}
{
  const d = Dist.grouped(0, 10, [4, 12, 10, 8, 6]);
  const f1 = 12, f2 = 8;
  const found = [];
  for (let a = 0; a <= 20; a++) { const b = 20 - a; const t = Dist.grouped(0, 10, [4, a, 10, b, 6]); if (t.n.eq(40) && t.mean.eq(25)) found.push([a, b]); }
  Q('l07', mk.long({ stem: r`The ages of $40$ imagined members of a club are grouped into the classes $0$–$10$, $10$–$20$, $20$–$30$, $30$–$40$ and $40$–$50$ years with frequencies $4$, $f_1$, $10$, $f_2$ and $6$. The mean age is $25$ years.

(a) Find $f_1$ and $f_2$. [2]

(b) Find the mean deviation about the mean. [1]

(c) Find the variance and the standard deviation, correct to two decimal places. [2]`, model: `(a) The total is $4 + f_1 + 10 + f_2 + 6 = 40$, so $f_1 + f_2 = 20$. With class marks $5, 15, 25, 35, 45$: $\\sum fx = 20 + 15f_1 + 250 + 35f_2 + 270 = 40 \\times 25 = 1000$, so $15f_1 + 35f_2 = 460$. Substituting $f_1 = 20 - f_2$ gives $300 + 20f_2 = 460$, so $f_2 = 8$ and $f_1 = 12$.\n\n(b) ${mdWork(d)}\n\n(c) ${dirWork(d)}`, sol: 'Two linear equations in the unknown frequencies come from $n$ and from the mean.', scheme: [['(a) $f_1 + f_2 = 20$', 1], ['(a) $15f_1 + 35f_2 = 460$, so $f_1 = 12$, $f_2 = 8$', 1], ['(b) Mean deviation $= \\dfrac{400}{40} = 10$', 1], ['(c) $\\sum f(x - \\bar{x})^2 = 6000$ and $\\sigma^2 = 150$', 1], ['(c) $\\sigma = 5\\sqrt{6} \\approx 12.25$', 1]], d: 4, c: 'application', t: [1, 2], time: 400 }), (C) => {
    C.assert(found.length === 1 && found[0].join() === '12,8' && d.n.eq(40) && d.mean.eq(25) && d.sumF((x) => x.sub(25).abs()).eq(400) && d.mdMean.eq(10) && d.sumF((x) => x.sub(25).pow(2)).eq(6000) && d.variance.eq(150) && sdTex(150) === r`5\sqrt{6}` && sdRound(150, 2) === '12.25', 'search over f1 + f2 = 20 gives only (12, 8); mean deviation 10, variance 150, SD 12.25'); C.model([40, 20, 15, 460, 300, 8, 12, 400, 10, 6000, 150, 12.25]);
  });
}
