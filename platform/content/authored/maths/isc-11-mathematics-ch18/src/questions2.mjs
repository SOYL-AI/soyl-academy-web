// ISC 11 Mathematics ch18 - true-false, fill-blank, numerical and 2-mark short-answer items.
import { Q, mk, r, $, T, fr, Dist, ftab, sdTex, sdRound, cvRound, checkCombine, checkCorrect, combine, synth, mdWork, dirWork, shortWork, combWork, corrWork, sdSentence } from './qh.mjs';
import * as D from './data.mjs';

const lst = (xs) => xs.join(', ');
const rawStem = (xs) => xs.map((x) => T(fr(x))).join(', ');

// ============================================================ true-false
{
  const d = Dist.raw([14, 17, 26, 31]);
  Q('tf1', mk.tf({ stem: r`The signed deviations from the mean of the parcel masses $14, 17, 26, 31$ kg add up to zero.`, key: 't', sol: r`The mean is $\dfrac{88}{4} = 22$ and the deviations are $-8, -5, 4, 9$, which add to $0$. This always happens for the deviations from the mean, which is why the mean deviation uses absolute values.`, d: 1, c: 'understanding', t: [1], time: 45 }), (C) => {
    C.assert(d.mean.eq(22) && d.sumF((x) => x.sub(22)).eq(0) && d.x.map((x) => T(x.sub(22))).join() === '-8,-5,4,9', 'mean 22; deviations -8, -5, 4, 9 sum to 0'); C.key('t');
  });
}
{
  const a = Dist.raw([10, 20, 30, 40]), b = Dist.raw([10, 10, 40, 40]);
  Q('tf2', mk.tf({ stem: r`Two data sets with the same range must have the same mean deviation about the mean.`, key: 'f', sol: r`The sets $10, 20, 30, 40$ and $10, 10, 40, 40$ both have range $30$ and mean $25$, but their mean deviations are $\dfrac{15 + 5 + 5 + 15}{4} = 10$ and $\dfrac{15 \times 4}{4} = 15$. The range uses only the two extremes; the mean deviation uses every value.`, d: 3, c: 'analysis', t: [1], time: 70 }), (C) => {
    C.assert(a.range.eq(30) && b.range.eq(30) && a.mean.eq(25) && b.mean.eq(25) && a.mdMean.eq(10) && b.mdMean.eq(15), 'both ranges 30, both means 25, mean deviations 10 and 15'); C.key('f');
  });
}
{
  const consts = Dist.raw([9, 9, 9, 9, 9]), other = Dist.raw([9, 9, 9, 9, 10]);
  Q('tf3', mk.tf({ stem: r`A data set has variance $0$ only when all its observations are equal.`, key: 't', sol: r`The variance is a mean of squares $(x - \bar{x})^2 \ge 0$, so it is $0$ only if every deviation is $0$, that is, only if every observation equals the mean. Changing one value of $9, 9, 9, 9, 9$ to $10$ already gives variance $0.16$.`, d: 2, c: 'understanding', t: [2], time: 55 }), (C) => {
    C.assert(consts.variance.eq(0) && T(other.variance) === '0.16' && other.variance.cmp(0) > 0, 'equal values give variance 0; one changed value gives 0.16'); C.key('t');
  });
}
{
  const base = synth(10, 20, 4), y = Dist.raw(base.map((x) => fr(3).sub(fr(2).mul(x))));
  Q('tf4', mk.tf({ stem: r`Each observation $x$ of a data set with standard deviation $4$ is replaced by $3 - 2x$. The standard deviation of the new data is $-8$.`, key: 'f', sol: r`The standard deviation is multiplied by $\lvert -2\rvert = 2$, giving $8$. A standard deviation is a square root and is never negative; the variance becomes $(-2)^2 \times 16 = 64$.`, d: 3, c: 'analysis', t: [2], time: 60 }), (C) => {
    C.assert(Dist.raw(base).variance.eq(16) && y.variance.eq(64) && y.variance.sqrt().eq(8), 'a ten-value list with SD 4 maps to SD 8 (variance 64), not -8'); C.key('f');
  });
}
{
  const c = combine({ n: 10, mean: 20, var: 0 }, { n: 30, mean: 40, var: 0 });
  Q('tf5', mk.tf({ stem: r`A class of $10$ pupils has mean score $20$ and a class of $30$ pupils has mean score $40$. The combined mean score of the $40$ pupils is $30$.`, key: 'f', sol: r`The combined mean is weighted by the sizes: $\dfrac{10(20) + 30(40)}{40} = \dfrac{1400}{40} = 35$, not the plain average $30$.`, d: 2, c: 'understanding', t: [3], time: 50 }), (C) => {
    C.assert(c.mean.eq(35) && !fr(30).eq(c.mean), 'combined mean 1400/40 = 35'); C.key('f');
  });
}

// ============================================================ fill-blank
Q('fb1', mk.fill({ stem: r`The least and the greatest observations of an imagined data set are $12$ and $28$, so its coefficient of range is ____.`, acc: [['0.4', '2/5']], sol: r`$\dfrac{L - S}{L + S} = \dfrac{28 - 12}{28 + 12} = \dfrac{16}{40} = 0.4$.`, d: 1, c: 'understanding', t: [1], time: 40 }), (C) => {
  C.assert(fr(28 - 12).div(28 + 12).eq(fr('2/5')) && T(fr('2/5')) === '0.4', 'coefficient 16/40 = 0.4'); C.blank(0.4);
});
{
  Q('fb2', mk.fill({ stem: r`The readings of an imagined gauge have variance $2.25\ \text{units}^2$. Every reading is then multiplied by $4$. The standard deviation of the new readings is ____ units.`, acc: [['6']], sol: r`The original standard deviation is $\sqrt{2.25} = 1.5$, and multiplying every reading by $4$ multiplies it by $4$: $4 \times 1.5 = 6$.`, d: 2, c: 'understanding', t: [2], time: 55 }), (C) => {
    const v = fr('9/4');
    C.assert(v.sqrt().eq(fr('3/2')) && fr(16).mul(v).sqrt().eq(6) && Dist.raw(synth(8, 10, 2).map((x) => x.mul(4))).variance.eq(Dist.raw(synth(8, 10, 2)).variance.mul(16)), 'SD 1.5 becomes 6 (variance 36)'); C.blank(6);
  });
}
{
  const n = 20, sx = 240, sx2 = 3000, v = fr(sx2).div(n).sub(fr(sx).div(n).pow(2));
  Q('fb3', mk.fill({ stem: r`For $20$ imagined test readings, $\sum x = 240$ and $\sum x^2 = 3000$, so the variance is ____.`, acc: [['6']], sol: r`$\sigma^2 = \dfrac{3000}{20} - \left(\dfrac{240}{20}\right)^2 = 150 - 144 = 6$.`, d: 2, c: 'understanding', t: [2], time: 55 }), (C) => {
    C.assert(v.eq(6) && fr(sx).div(n).eq(12) && fr(sx2).div(n).eq(150), 'variance 150 - 144 = 6'); C.blank(6);
  });
}
Q('fb4', mk.fill({ stem: r`A batch of imagined resistors has mean resistance $80$ ohms and standard deviation $12$ ohms, so the coefficient of variation of the batch is ____ per cent.`, acc: [['15']], sol: r`$\text{C.V.} = \dfrac{12}{80} \times 100 = 15$ per cent.`, d: 1, c: 'recall', t: [2], time: 40 }), (C) => {
  C.assert(fr(12).div(80).mul(100).eq(15), 'C.V. 12/80 x 100 = 15'); C.blank(15);
});
{
  const c = combine({ n: 8, mean: 25, var: 0 }, { n: 12, mean: 35, var: 0 });
  Q('fb5', mk.fill({ stem: r`An imagined squad of $8$ juniors has mean height $25$ units and a squad of $12$ seniors has mean $35$ units. The combined mean of the $20$ players is ____ units.`, acc: [['31']], sol: r`$\dfrac{8(25) + 12(35)}{20} = \dfrac{200 + 420}{20} = \dfrac{620}{20} = 31$.`, d: 2, c: 'understanding', t: [3], time: 55 }), (C) => {
    C.assert(c.mean.eq(31) && fr(620).div(20).eq(31), 'combined mean 620/20 = 31'); C.blank(31);
  });
}

// ============================================================ numerical
{
  const d = Dist.raw([36, 53, 27, 14, 35, 57]), s = d.sumF((x) => x.sub(d.mean).abs());
  Q('n1', mk.num({ scheme: [['Correct value with working', 1]], stem: r`The numbers of visitors to an imagined fair on six days were $36, 53, 27, 14, 35, 57$. Find the mean deviation about the mean.`, value: 12, sol: r`$\bar{x} = \dfrac{222}{6} = 37$. The absolute deviations are $1, 16, 10, 23, 2, 20$ with sum $72$, so the mean deviation is $\dfrac{72}{6} = 12$.`, d: 2, c: 'application', t: [1], time: 90 }), (C) => {
    C.assert(d.mean.eq(37) && s.eq(72) && d.x.map((x) => T(x.sub(37).abs())).join() === '1,16,10,23,2,20', 'mean 37, absolute deviations 1, 16, 10, 23, 2, 20 sum 72'); C.val(d.mdMean.num());
  });
}
{
  const d = Dist.raw([12, 15, 19, 22, 27]), s = sumsText();
  function sumsText() { return d.sumF((x) => x.sub(20).pow(2)); }
  const sd = d.sumF((x) => x.sub(20));
  Q('n2', mk.num({ scheme: [['Correct value with working', 1]], stem: r`Five imagined weekly savings (in tens of rupees) are $12, 15, 19, 22, 27$. Taking the assumed mean $A = 20$, find the variance by the short-cut method.`, value: 27.6, sol: r`With $d = x - 20$: $-8, -5, -1, 2, 7$, so $\sum d = -5$ and $\sum d^2 = 143$. Then $\sigma^2 = \dfrac{143}{5} - \left(\dfrac{-5}{5}\right)^2 = 28.6 - 1 = 27.6$.`, d: 3, c: 'application', t: [2], time: 100 }), (C) => {
    C.assert(sd.eq(-5) && s.eq(143) && d.variance.eq(fr('27.6')) && d.variance.eq(d.varianceAssumed(20)) && d.mean.eq(19), 'sum d = -5, sum d^2 = 143, variance 27.6 (equals the direct definition)'); C.val(27.6);
  });
}
{
  const d = D.TEAS, v = d.variance;
  Q('n3', mk.num({ scheme: [['Correct value with working', 1]], stem: r`The number of parcels packed per hour by an imagined machine over $40$ hours is:` + `\n\n${ftab(d, 'Parcels per hour', 'Hours')}\n\n` + r`Find the standard deviation, correct to two decimal places.`, value: 2.87, tol: 0.005, sol: r`$\bar{x} = \dfrac{336}{40} = 8.4$ and $\sum fx^2 = 112 + 216 + 640 + 600 + 1584 = 3152$, so $\sigma^2 = \dfrac{\sum fx^2}{n} - \bar{x}^2 = 78.8 - 70.56 = 8.24$, so $\sigma = \sqrt{8.24} \approx 2.87$.`, d: 4, c: 'application', t: [2], time: 150 }), (C) => {
    C.assert(d.n.eq(40) && d.sumFx.eq(336) && d.mean.eq(fr('8.4')) && d.sumF((x) => x.pow(2)).div(40).eq(fr('78.8')) && v.eq(fr('8.24')) && d.varianceAssumed(8).eq(v) && d.varianceStep(8, 2).eq(v) && sdRound(v, 2) === '2.87', 'mean 8.4, variance 78.8 - 70.56 = 8.24 (three routes), SD 2.87'); C.val(2.87, 0.005);
  });
}
{
  const d = D.TEN;
  Q('n4', mk.num({ scheme: [['Correct value with working', 1]], stem: r`The days taken by ten imagined seeds to sprout were $42, 43, 44, 14, 10, 46, 45, 36, 23, 7$. Find the coefficient of variation, correct to one decimal place (in per cent).`, value: 48.4, tol: 0.05, sol: r`$\bar{x} = \dfrac{310}{10} = 31$ and $\sigma^2 = 225$, so $\sigma = 15$. Then $\text{C.V.} = \dfrac{15}{31} \times 100 = 48.387\ldots \approx 48.4$ per cent.`, d: 3, c: 'application', t: [2], time: 110 }), (C) => {
    C.assert(d.mean.eq(31) && d.variance.eq(225) && cvRound(225, 31, 1) === '48.4' && d.sumF((x) => x.sub(31).pow(2)).eq(2250), 'mean 31, variance 225, C.V. 48.4'); C.val(48.4, 0.05);
  });
}
{
  const rawRight = [58, 17, 16, 25, 34, 36, 15, 8, 39, 42];
  const { wrong, right, c } = checkCorrect(rawRight, 5, 16);
  Q('n5', mk.num({ scheme: [['Correct value with working', 1]], stem: r`Ten imagined readings were recorded with mean $27$ and variance $223$. Later the reading $36$ was found to have been copied as $16$. Find the correct variance.`, value: 215, sol: r`$\sum x = 270$ and $\sum x^2 = 10(223 + 729) = 9520$. Correcting: $\sum x = 270 - 16 + 36 = 290$ and $\sum x^2 = 9520 - 256 + 1296 = 10560$. So the mean is $29$ and $\sigma^2 = \dfrac{10560}{10} - 29^2 = 1056 - 841 = 215$.`, d: 4, c: 'application', t: [2], time: 130 }), (C) => {
    C.assert(wrong.mean.eq(27) && wrong.variance.eq(223) && c.sx.eq(270) && c.sx2.eq(9520) && c.nsx.eq(290) && c.nsx2.eq(10560) && c.mean.eq(29) && c.var.eq(215) && right.variance.eq(215), 'sums 270, 9520 become 290, 10560; variance 215 (matches the true list)'); C.val(215);
  });
}
{
  const g1 = { n: 20, mean: 60, var: 64 }, g2 = { n: 30, mean: 70, var: 25 };
  const c = checkCombine(g1, g2);
  Q('n6', mk.num({ scheme: [['Correct value with working', 1]], stem: r`In an imagined school, $20$ pupils of one section have mean $60$ and standard deviation $8$, and $30$ pupils of another have mean $70$ and standard deviation $5$. Find the standard deviation of all $50$ pupils, correct to two decimal places.`, value: 8.04, tol: 0.005, sol: r`The combined mean is $\dfrac{1200 + 2100}{50} = 66$, so $d_1 = -6$ and $d_2 = 4$. Then $\sigma^2 = \dfrac{20(64 + 36) + 30(25 + 16)}{50} = \dfrac{2000 + 1230}{50} = 64.6$ and $\sigma = \sqrt{64.6} \approx 8.04$.`, d: 4, c: 'application', t: [3], time: 150 }), (C) => {
    C.assert(c.mean.eq(66) && c.var.eq(fr('64.6')) && sdRound(c.var, 2) === '8.04' && fr(2000).add(1230).div(50).eq(c.var), 'combined mean 66, variance 3230/50 = 64.6, SD 8.04 (merged data)'); C.val(8.04, 0.005);
  });
}

// ============================================================ short, 2 marks
{
  const d = Dist.raw([142, 188, 165, 207, 131, 176]), co = fr(207 - 131).div(207 + 131);
  Q('s201', mk.short({ marks: 2, stem: r`The daily visitors to an imagined museum over six days were $142, 188, 165, 207, 131, 176$. Find the range and the coefficient of range.`, model: r`The greatest value is $207$ and the least is $131$, so the range is $207 - 131 = 76$. The coefficient of range is $\dfrac{207 - 131}{207 + 131} = \dfrac{76}{338} = \dfrac{38}{169} \approx 0.225$.`, sol: 'Use the two extreme values only.', scheme: [['Range $= 207 - 131 = 76$', 1], ['Coefficient $\\dfrac{76}{338} = \\dfrac{38}{169} \\approx 0.225$', 1]], d: 2, c: 'understanding', t: [1], time: 90 }), (C) => {
    C.assert(d.range.eq(76) && co.eq(fr('38/169')) && co.round(3) === '0.225', 'range 76; coefficient 38/169 = 0.225'); C.model([207, 131, 76, 338, 38, 169, 0.225]);
  });
}
{
  const d = Dist.raw([14, 40, 25, 38, 35, 39, 10, 7]), s = d.sumF((x) => x.sub(26).abs());
  Q('s202', mk.short({ marks: 2, stem: r`The lengths, in centimetres, of eight imagined ribbon offcuts are $14, 40, 25, 38, 35, 39, 10, 7$. Find the mean deviation about the mean.`, model: `${mdWork(d)}`, sol: 'Mean first, then the average of the absolute deviations.', scheme: [['Mean $= 26$', 1], ['Absolute deviations total $96$; mean deviation $= 12$', 1]], d: 2, c: 'application', t: [1], time: 120 }), (C) => {
    C.assert(d.mean.eq(26) && s.eq(96) && d.mdMean.eq(12), 'mean 26, sum of absolute deviations 96, mean deviation 12'); C.model([208, 8, 26, 96, 12]);
  });
}
{
  const d = Dist.discrete([2, 4, 6, 8, 10], [3, 5, 4, 6, 2]);
  Q('s203', mk.short({ marks: 2, stem: r`The number of goals scored by an imagined hockey team in $20$ matches is:` + `\n\n${ftab(d, 'Goals', 'Matches')}\n\n` + r`Find the mean deviation about the mean.`, model: `${mdWork(d)}`, sol: 'Use the frequency form of the mean deviation.', scheme: [['Mean $= 5.9$', 1], ['$\\sum f\\lvert x - \\bar{x}\\rvert = 42.4$; mean deviation $= 2.12$', 1]], d: 3, c: 'application', t: [1], time: 130 }), (C) => {
    C.assert(d.n.eq(20) && d.mean.eq(fr('5.9')) && d.sumF((x) => x.sub(fr('5.9')).abs()).eq(fr('42.4')) && T(d.mdMean) === '2.12', 'mean 5.9, sum 42.4, mean deviation 2.12'); C.model([118, 20, 5.9, 42.4, 2.12]);
  });
}
{
  const d = Dist.grouped(12, 6, [4, 9, 7, 5]), co = fr(42 - 12).div(42 + 12);
  Q('s204', mk.short({ marks: 2, stem: r`The waiting times of imagined callers are grouped into the classes $12$–$18$, $18$–$24$, $24$–$30$ and $30$–$36$ and $36$–$42$ minutes with frequencies $4, 9, 7, 5$ and $3$. Find the range of the grouped data and its coefficient of range.`, model: r`The range of grouped data is the upper limit of the last class minus the lower limit of the first class: $42 - 12 = 30$ minutes. The coefficient of range is $\dfrac{42 - 12}{42 + 12} = \dfrac{30}{54} = \dfrac{5}{9}$.`, sol: 'Take the extreme class limits.', scheme: [['Range $= 42 - 12 = 30$', 1], ['Coefficient $\\dfrac{30}{54} = \\dfrac{5}{9}$', 1]], d: 2, c: 'understanding', t: [1], time: 80 }), (C) => {
    const g = Dist.grouped(12, 6, [4, 9, 7, 5, 3]);
    C.assert(g.range.eq(30) && co.eq(fr('5/9')) && g.classes[4][1].eq(42), 'five classes of width 6 from 12 to 42: range 30, coefficient 5/9'); C.model([42, 12, 30, 54, 5, 9]);
  });
}
{
  const d = Dist.raw([3, 7, 8, 10]);
  Q('s205', mk.short({ marks: 2, stem: r`Four imagined trial times, in seconds, were $3, 7, 8, 10$. Find the variance and the standard deviation by the direct method.`, model: dirWork(d), sol: 'Square the deviations from the mean, average them, then take the root.', scheme: [['Mean $7$; squared deviations $16, 0, 1, 9$', 1], ['$\\sigma^2 = 6.5$, $\\sigma = \\dfrac{\\sqrt{26}}{2} \\approx 2.55$', 1]], d: 3, c: 'application', t: [2], time: 120 }), (C) => {
    C.assert(d.mean.eq(7) && d.variance.eq(fr('13/2')) && d.varianceShortcut.eq(d.variance) && sdTex(d.variance) === r`\dfrac{\sqrt{26}}{2}` && sdRound(d.variance, 2) === '2.55', 'mean 7, variance 26/4 = 6.5, SD sqrt26/2 = 2.55'); C.model([7, 16, 0, 1, 9, 26, 4, 6.5, 2.55]);
  });
}
{
  const n = 12, sx = 144, sx2 = 2016, v = fr(sx2).div(n).sub(fr(sx).div(n).pow(2));
  Q('s206', mk.short({ marks: 2, stem: r`For twelve imagined sensor readings, $\sum x = 144$ and $\sum x^2 = 2016$. Find the variance and the standard deviation.`, model: r`$\bar{x} = \dfrac{144}{12} = 12$. $\sigma^2 = \dfrac{\sum x^2}{n} - \bar{x}^2 = \dfrac{2016}{12} - 12^2 = 168 - 144 = 24$. The standard deviation is $\sqrt{24} = 2\sqrt{6} \approx 4.90$.`, sol: 'Variance is the mean of squares minus the square of the mean.', scheme: [['$\\sigma^2 = 168 - 144 = 24$', 1], ['$\\sigma = 2\\sqrt{6} \\approx 4.90$', 1]], d: 2, c: 'understanding', t: [2], time: 80 }), (C) => {
    C.assert(v.eq(24) && fr(sx2).div(n).eq(168) && sdTex(24) === r`2\sqrt{6}` && sdRound(24, 2) === '4.90', 'variance 168 - 144 = 24, SD 2 sqrt 6 = 4.90'); C.model([144, 12, 2016, 168, 24, 4.9]);
  });
}
{
  const x = synth(20, 24, 6), y = Dist.raw(x.map((v) => v.mul(5).sub(3)));
  Q('s207', mk.short({ marks: 2, stem: r`The scores $x$ of $20$ imagined pupils have mean $24$ and standard deviation $6$. They are rescaled by $y = 5x - 3$. Find the mean and the standard deviation of $y$.`, model: r`The mean is $5(24) - 3 = 117$. The constant $-3$ does not change the spread and the factor $5$ multiplies it, so the standard deviation is $5 \times 6 = 30$ (the variance is $25 \times 36 = 900$).`, sol: 'Mean follows the rule; the standard deviation uses the factor only.', scheme: [['Mean $= 117$', 1], ['Standard deviation $= 30$', 1]], d: 3, c: 'application', t: [2], time: 80 }), (C) => {
    C.assert(Dist.raw(x).mean.eq(24) && Dist.raw(x).variance.eq(36) && y.mean.eq(117) && y.variance.eq(900) && y.variance.sqrt().eq(30), 'a 20-value list with mean 24, SD 6 maps to mean 117, SD 30'); C.model([5, 24, 3, 117, 30, 900]);
  });
}
{
  const cvp = fr(9).div(45).mul(100), cvq = fr(12).div(64).mul(100);
  Q('s208', mk.short({ marks: 2, stem: r`Imagined school $P$ has mean score $45$ with standard deviation $9$; school $Q$ has mean score $64$ with standard deviation $12$. Which school's scores are more consistent?`, model: r`$\text{C.V.}(P) = \dfrac{9}{45} \times 100 = 20\%$ and $\text{C.V.}(Q) = \dfrac{12}{64} \times 100 = 18.75\%$. School $Q$ has the smaller coefficient of variation, so its scores are more consistent.`, sol: 'Compare coefficients of variation, not standard deviations.', scheme: [['Both coefficients: $20\\%$ and $18.75\\%$', 1], ['$Q$ is more consistent (smaller C.V.)', 1]], d: 3, c: 'analysis', t: [2], time: 90 }), (C) => {
    C.assert(cvp.eq(20) && T(cvq) === '18.75' && cvq.cmp(cvp) < 0, 'C.V. 20% and 18.75%'); C.model([9, 45, 20, 12, 64, 18.75]);
  });
}
{
  const c = combine({ n: 30, mean: 52, var: 0 }, { n: 20, mean: 67, var: 0 });
  Q('s209', mk.short({ marks: 2, stem: r`A batch of $30$ imagined bulbs has mean life $52$ hundred hours and a second batch of $20$ bulbs has mean life $67$. Find the mean life of the $50$ bulbs together.`, model: r`Combined mean $= \dfrac{30(52) + 20(67)}{30 + 20} = \dfrac{1560 + 1340}{50} = \dfrac{2900}{50} = 58$ hundred hours.`, sol: 'Weight each mean by its group size.', scheme: [['$30(52) + 20(67) = 2900$', 1], ['$\\dfrac{2900}{50} = 58$', 1]], d: 2, c: 'understanding', t: [3], time: 70 }), (C) => {
    C.assert(c.mean.eq(58) && fr(1560).add(1340).eq(2900), 'combined mean 2900/50 = 58'); C.model([30, 52, 20, 67, 1560, 1340, 2900, 50, 58]);
  });
}
{
  const m2 = fr(50 * 64 - 30 * 60).div(20), c = combine({ n: 30, mean: 60, var: 0 }, { n: 20, mean: m2, var: 0 });
  Q('s210', mk.short({ marks: 2, stem: r`Fifty imagined pupils have mean mark $64$. The $30$ pupils of one group have mean mark $60$. Find the mean mark of the other $20$ pupils.`, model: r`Total marks $= 50 \times 64 = 3200$. The first group scored $30 \times 60 = 1800$. The other $20$ pupils scored $3200 - 1800 = 1400$, so their mean is $\dfrac{1400}{20} = 70$.`, sol: 'Work with total marks.', scheme: [['Total $3200$ and first group $1800$', 1], ['Other mean $\\dfrac{1400}{20} = 70$', 1]], d: 3, c: 'application', t: [3], time: 90 }), (C) => {
    C.assert(m2.eq(70) && c.mean.eq(64), 'second mean 1400/20 = 70 reproduces the combined mean 64'); C.model([64, 50, 3200, 30, 60, 1800, 1400, 20, 70]);
  });
}
