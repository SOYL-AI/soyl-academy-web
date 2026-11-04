// CBSE 11 Mathematics ch13 Statistics — case-based questions c03-c05 (1 + 1 + 2 with an either/or part (c)).
import { Q, mk, caseQ, child, r } from './lib.mjs';
import { Dist, fr, T, sumOf, freqMd } from './stat.mjs';

export { r };
const N = (x) => fr(x).num();
const disc = (v, f) => Dist.discrete(v, f);
const same = (a, b) => fr(a).eq(b);
const L = (xs) => xs.map((v) => T(v)).join(', ');
const distinct = (vals) => new Set(vals.map((v) => fr(v).toString())).size === vals.length;
const V = (x) => `$${T(x)}$`;

{
  const d = disc([10, 20, 30, 40, 50], [7, 14, 12, 2, 5]);
  const sx2 = d.sumF((x) => x.pow(2));
  const sd = d.variance.sqrt(), cv = sd.div(d.mean).mul(100);
  const tot = d.sumF((x) => x.sub(d.mean).abs());
  const vals = [N(d.mean), N(d.median), 30, N(d.sumFx)];
  caseQ('c03', {
    passage: r`An imagined study app logged the length of $40$ study sessions, to the nearest $10$ minutes.

${freqMd(d, { first: 'Minutes', second: 'Sessions' })}

The analyst found $\sum fx = 1040$ and $\sum fx^2 = 32800$.`,
    d: 3, c: 'application',
    model: r`(a) Option (a). (b) $${T(d.variance)}$. (c) (i) $\sigma = \sqrt{${T(d.variance)}} = ${T(sd)}$ and the coefficient of variation is $\dfrac{12}{26} \times 100 \approx ${cv.round(2)}\%$. Or (ii) $\sum f|x - 26| = ${T(tot)}$, so the mean deviation is $\dfrac{${T(tot)}}{40} = ${T(d.mdMean)}$ minutes.`,
    sol: r`(a) Mean $= \dfrac{1040}{40} = 26$. (b) $\sigma^2 = \dfrac{32800}{40} - 26^2 = 820 - 676 = 144$. (c) The standard deviation is $12$ with coefficient about $46.15\%$, or the mean deviation is $9.8$.`,
    children: [
      child('a', mk.mcq({ stem: 'The mean session length is', opts: vals.map((x) => `$${T(x)}$ minutes`), key: 'a', sol: r`The mean is $\dfrac{\sum fx}{\sum f} = \dfrac{1040}{40} = ${T(d.mean)}$ minutes. The value $20$ is the median, $30$ is the middle value of the list of lengths, and $1040$ is the total, not the mean.`, d: 2, c: 'application', t: [2], time: 60 })),
      child('b', mk.num({ stem: 'Using the two sums given, find the variance of the session lengths.', value: 144, sol: r`$\sigma^2 = \dfrac{\sum fx^2}{n} - \bar{x}^2 = \dfrac{32800}{40} - 26^2 = 820 - 676 = ${T(d.variance)}$.`, scheme: [['820 - 676 = 144', 1]], d: 3, c: 'application', t: [2], time: 90 })),
      child('c', mk.short({ marks: 2, stem: r`**(i)** Find the standard deviation and the coefficient of variation (to two decimal places) of the session lengths.`, model: r`Standard deviation $= \sqrt{144} = ${T(sd)}$ minutes. Coefficient of variation $= \dfrac{12}{26} \times 100 \approx ${cv.round(2)}\%$.`, sol: 'Square root of the variance, then divide by the mean.', scheme: [['Standard deviation 12', 1], ['Coefficient of variation about 46.15 per cent', 1]], d: 3, c: 'application', t: [2], time: 90 }), [
        mk.short({ marks: 2, stem: r`**(ii)** Find the mean deviation of the session lengths about the mean.`, model: r`$\sum f|x - 26| = 7(16) + 14(6) + 12(4) + 2(14) + 5(24) = ${T(tot)}$, so the mean deviation is $\dfrac{${T(tot)}}{40} = ${T(d.mdMean)}$ minutes.`, sol: 'Weight each absolute gap by its frequency.', scheme: [['Sum of f|x - 26| = 392', 1], ['Mean deviation 9.8', 1]], d: 3, c: 'application', t: [1], time: 90 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which(vals, 26);
    Cx.child('b').val(N(d.variance));
    Cx.assert(same(d.n, 40) && same(d.sumFx, 1040) && same(sx2, 32800) && same(d.median, 20), 'given sums are right');
    Cx.child('c').assert(same(sd, 12) && cv.round(2) === '46.15', 'SD 12, CV 46.15');
    Cx.child('c').model([12, 46.15]);
    Cx.child('cii').assert(same(tot, 392) && same(d.mdMean, '49/5'), 'MD 9.8');
    Cx.child('cii').model([392, 9.8]);
  });
}
{
  const mA = 50, sA = 4, mB = 20, sB = 3;
  const cvA = fr(sA).div(mA).mul(100), cvB = fr(sB).div(mB).mul(100), cvB2 = fr(sB).div(mB + 10).mul(100);
  const vals = [N(cvA), 32, 12.5, 1250];
  caseQ('c04', {
    passage: r`Two imagined workshops, A and B, make steel rods. The lengths of A's rods have mean $50$ mm and standard deviation $4$ mm; the lengths of B's rods have mean $20$ mm and standard deviation $3$ mm.`,
    d: 4, c: 'analysis',
    model: r`(a) Option (a). (b) $${T(cvB)}$. (c) (i) Workshop A is more consistent: its coefficient of variation $${T(cvA)}\%$ is smaller than $${T(cvB)}\%$. Or (ii) The new mean is $30$ and the standard deviation stays $3$, so the coefficient of variation is $\dfrac{3}{30} \times 100 = ${T(cvB2)}\%$. Since $${T(cvB2)} > ${T(cvA)}$, A is still more consistent.`,
    sol: r`(a) $\dfrac{4}{50} \times 100 = 8$. (b) $\dfrac{3}{20} \times 100 = 15$. (c) Compare coefficients of variation: $8\%$ against $15\%$, or $8\%$ against $10\%$ after the change.`,
    children: [
      child('a', mk.mcq({ stem: 'The coefficient of variation of the rod lengths from workshop A is', opts: ['$8\\%$', '$32\\%$', '$12.5\\%$', '$1250\\%$'], key: 'a', sol: r`$\dfrac{\text{standard deviation}}{\text{mean}} \times 100 = \dfrac{4}{50} \times 100 = 8\%$. The value $32\%$ uses the variance $16$ in place of the standard deviation, $12.5\%$ inverts the ratio, and $1250\%$ inverts and multiplies by $100$.`, d: 2, c: 'application', t: [2], time: 60 })),
      child('b', mk.num({ stem: 'Find the coefficient of variation, in per cent, of the rod lengths from workshop B.', value: 15, unit: '%', sol: r`$\dfrac{3}{20} \times 100 = ${T(cvB)}$ per cent.`, scheme: [['3/20 x 100 = 15', 1]], d: 2, c: 'application', t: [2], time: 60 })),
      child('c', mk.short({ marks: 2, stem: r`**(i)** Which workshop's rods are more consistent in length? Justify with the coefficients of variation.`, model: r`Workshop A has coefficient of variation $${T(cvA)}\%$ and workshop B has $${T(cvB)}\%$. The smaller value means less variation relative to the mean, so workshop A is more consistent, although its standard deviation is larger.`, sol: 'Compare the two coefficients of variation.', scheme: [['CV of A is 8 per cent and of B is 15 per cent', 1], ['A is more consistent, with the reason', 1]], d: 4, c: 'analysis', t: [2], time: 90 }), [
        mk.short({ marks: 2, stem: r`**(ii)** Workshop B lengthens every rod by $10$ mm. Find B's new coefficient of variation and say whether A is still the more consistent workshop.`, model: r`Adding $10$ mm gives mean $30$ mm and the standard deviation stays $3$ mm. The new coefficient of variation is $\dfrac{3}{30} \times 100 = ${T(cvB2)}\%$, which is still more than $${T(cvA)}\%$, so A is still the more consistent workshop.`, sol: 'A shift changes the mean but not the standard deviation.', scheme: [['New mean 30, SD 3, CV 10 per cent', 1], ['10 > 8, so A is still more consistent', 1]], d: 4, c: 'analysis', t: [2], time: 105 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which(vals, 8);
    Cx.child('b').val(N(cvB));
    Cx.child('c').assert(same(cvA, 8) && same(cvB, 15) && cvA.cmp(cvB) < 0, 'A more consistent');
    Cx.child('c').model([8, 15]);
    Cx.child('cii').assert(same(cvB2, 10) && cvB2.cmp(cvA) > 0, 'CV 10 > 8');
    Cx.child('cii').model([10, 30, 3, 8]);
  });
}
{
  const meanC = 20, sdC = 4, a = fr('9/5'), b = 32;
  const meanF = a.mul(meanC).add(b), sdF = a.mul(sdC), varF = sdF.pow(2);
  const cvC = fr(sdC).div(meanC).mul(100), cvF = sdF.div(meanF).mul(100);
  const vals = [N(sdF), N(a.mul(sdC).add(b)), 4, N(a.pow(2).mul(sdC))];
  const dC = Dist.raw([14, 18, 20, 22, 26]), dF = Dist.raw(dC.x.map((x) => x.mul(a).add(b)));
  caseQ('c05', {
    passage: r`An imagined weather station records the noon temperature in degrees Celsius over a season, with mean $20^\circ$C and standard deviation $4^\circ$C. A visitor's display converts each reading to Fahrenheit by $F = 1.8C + 32$.`,
    d: 4, c: 'analysis',
    model: r`(a) Option (a). (b) $${T(meanF)}$. (c) (i) The variance in Fahrenheit is $(${T(sdF)})^2 = ${T(varF)}$. Or (ii) The coefficient of variation in Celsius is $\dfrac{4}{20} \times 100 = ${T(cvC)}\%$ and in Fahrenheit it is $\dfrac{7.2}{68} \times 100 \approx ${cvF.round(2)}\%$. They are not equal, because the $+32$ shifts the mean but not the standard deviation.`,
    sol: r`(a) $1.8 \times 4 = 7.2$. (b) $1.8 \times 20 + 32 = 68$. (c) The variance is $51.84$, or the two coefficients of variation are $20\%$ and about $10.59\%$.`,
    children: [
      child('a', mk.mcq({ stem: 'The standard deviation of the converted Fahrenheit readings is', opts: vals.map((x) => `$${T(x)}^\\circ$F`), key: 'a', sol: r`The standard deviation is multiplied by $1.8$ and the $+32$ is ignored: $1.8 \times 4 = ${T(sdF)}$. The value $39.2$ adds $32$ as well, $4$ is the old value, and $12.96$ multiplies by $1.8^2$ instead.`, d: 3, c: 'application', t: [2], time: 75 })),
      child('b', mk.num({ stem: 'Find the mean of the converted readings, in degrees Fahrenheit.', value: 68, unit: '°F', sol: r`The mean follows the same rule as each reading: $1.8 \times 20 + 32 = ${T(meanF)}$.`, scheme: [['1.8 x 20 + 32 = 68', 1]], d: 2, c: 'application', t: [2], time: 60 })),
      child('c', mk.short({ marks: 2, stem: r`**(i)** Find the variance of the Fahrenheit readings.`, model: r`The standard deviation is $1.8 \times 4 = ${T(sdF)}$, so the variance is $${T(sdF)}^2 = ${T(varF)}$ square degrees Fahrenheit.`, sol: 'Variance is the square of the SD; the scale factor appears squared.', scheme: [['Standard deviation 7.2', 1], ['Variance 51.84', 1]], d: 3, c: 'application', t: [2], time: 75 }), [
        mk.short({ marks: 2, stem: r`**(ii)** Find the coefficient of variation of the readings in Celsius and in Fahrenheit (two decimal places) and comment.`, model: r`Celsius: $\dfrac{4}{20} \times 100 = ${T(cvC)}\%$. Fahrenheit: $\dfrac{7.2}{68} \times 100 \approx ${cvF.round(2)}\%$. They differ, because adding $32$ changes the mean but not the spread, so the coefficient of variation is not unchanged by a shift.`, sol: 'Compute both ratios and compare.', scheme: [['20 per cent and about 10.59 per cent', 1], ['Comment: the shift changes the mean only', 1]], d: 4, c: 'analysis', t: [2], time: 105 }),
      ]),
    ],
  }, (Cx) => {
    Cx.assert(dF.variance.eq(dC.variance.mul(a.pow(2))) && dF.mean.eq(dC.mean.mul(a).add(b)), 'transformation rules hold on a test set');
    Cx.child('a').which(vals, 7.2);
    Cx.child('b').val(N(meanF));
    Cx.child('c').assert(same(sdF, '36/5') && same(varF, '1296/25') && same(varF, 51.84), 'variance 51.84');
    Cx.child('c').model([7.2, 51.84]);
    Cx.child('cii').assert(same(cvC, 20) && cvF.round(2) === '10.59', 'CV 20 and 10.59');
    Cx.child('cii').model([20, 10.59, 7.2, 68]);
  });
}
