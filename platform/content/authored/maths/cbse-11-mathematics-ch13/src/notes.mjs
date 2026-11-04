// Notes and flashcards for CBSE 11 Mathematics ch13 Statistics. Visuals are generated from the verified data sets.
import { table, flow, r, topic } from './lib.mjs';
import { Dist, T } from './stat.mjs';
import * as Vz from './visuals.mjs';
import { TEMP, FERRY, SEED, BAKE, SPEND, KIOSK_X, KIOSK_Y } from './data.mjs';

const L = (xs) => xs.map((v) => T(v)).join(', ');
const P = Dist.raw([28, 29, 30, 31, 32]), Qd = Dist.raw([10, 20, 30, 40, 50]);

const stripsN = Vz.twoStrips(P, Qd, 'Set P', 'Set Q', 'Two rows of dots on one number line: set P at 28, 29, 30, 31 and 32, and set Q at 10, 20, 30, 40 and 50. A dashed vertical line marks the common mean, 30.', 'Same mean, different spread.');
const rangeN = Vz.rangeStrip(TEMP, 'minimum temperature (degrees Celsius)', 'Number line with seven dots at 4, 6, 8, 9, 10, 11 and 13 degrees; dashed lines mark the least value 4 and the greatest value 13, so the range is 9.', 'Range $= 13 - 4 = 9$.');
const rangeRules = table(['Data', 'How to find the range'], [
  ['A list of values', 'Greatest $-$ least'],
  ['A frequency table of values', 'Greatest value that has a frequency $-$ least such value'],
  ['Classes', 'Upper limit of the last class $-$ lower limit of the first class'],
], 'Table of how to find the range: for a list, greatest minus least; for a frequency table, greatest minus least listed value; for classes, the last upper limit minus the first lower limit.', 'Range for each form of data.');
const devN = table(['Delay $x$', '$x - 12$', '$|x - 12|$'], [
  ...FERRY.x.map((x) => [T(x), T(x.sub(12)), T(x.sub(12).abs())]),
  ['Total', '0', T(FERRY.sumF((x) => x.sub(12).abs()))],
], 'Table of ferry delays 5, 8, 11, 12 and 24 minutes with deviations from the mean 12 (minus 7, minus 4, minus 1, 0, 12, total 0) and absolute deviations (7, 4, 1, 0, 12, total 24).', 'Signed deviations about the mean add to $0$.');
const curveN = Vz.mdCurve(FERRY, [2, 26], [0, 15], 'minutes', 'Graph of the mean deviation of the ferry delays about a point a: V-shaped pieces, with the lowest marked point at the median, 11, value 4.6, and a point at the mean, 12, value 4.8.', 'Lowest at the median.');
const mdTabN = Vz.asTable(Vz.mdTable(SPEND, 33, r`\bar{x}`), 'Calculation table for the stall spending classes with marks 15 to 55: totals 50 customers, 1650 for fx and 616 for f times the absolute deviation from the mean 33.', 'Mean deviation $= \\dfrac{616}{50} = 12.32$ rupees.');
const seedN = table(['Growth $x$ (mm)', '$x - 10$', '$(x - 10)^2$'], [
  ...SEED.x.map((x) => [T(x), T(x.sub(10)), T(x.sub(10).pow(2))]),
  ['Total', '0', T(SEED.sumF((x) => x.sub(10).pow(2)))],
], 'Table of six seedling growths 4, 6, 7, 10, 15, 18 millimetres with deviations from 10 and squared deviations 36, 16, 9, 0, 25, 64 totalling 150, giving variance 25.', 'Variance $= \\dfrac{150}{6} = 25$.');
const sqN = Vz.sqCurve(SEED, [0, 20], [0, 130], 'Graph of the mean squared distance of the six seedling growths from a point a: a parabola whose lowest marked point is at the mean, 10, where the height is the variance, 25.', 'Lowest at the mean.');
const stepN = Vz.asTable(Vz.stepTable(BAKE, 55, 10), 'Step-deviation table for the bakery sales with class marks 35 to 75: u from minus 2 to 2, the sum of fu is minus 8 and the sum of f u squared is 80.', 'Variance $= 100\\left[\\dfrac{80}{40} - \\left(\\dfrac{-8}{40}\\right)^2\\right] = 196$.');
const flowN = flow('LR', [['a', 'Choose A and h'], ['b', 'u = (x minus A) over h'], ['c', 'Add fu and f u squared'], ['d', 'Use the h squared formula'], ['e', 'Square root for the SD']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow chart of the step-deviation method: choose an assumed mean and width, form u, add fu and f u squared, use the formula with h squared, and take the square root.', 'The step-deviation method.');
const shiftN = (() => {
  const a = SEED, b = Dist.raw(SEED.x.map((x) => x.add(5))), c = Dist.raw(SEED.x.map((x) => x.mul(3)));
  return table(['Data', 'Mean', 'Variance', 'SD'], [
    ['Original', T(a.mean), T(a.variance), T(a.variance.sqrt())],
    ['Add $5$ to every value', T(b.mean), T(b.variance), T(b.variance.sqrt())],
    ['Multiply every value by $3$', T(c.mean), T(c.variance), T(c.variance.sqrt())],
  ], 'Table for the seedling data showing the original mean 10, variance 25, SD 5; adding 5 gives mean 15, variance 25, SD 5; multiplying by 3 gives mean 30, variance 225, SD 15.', 'Shifting and scaling.');
})();
const cvN = table(['Kiosk', 'Mean', 'SD', 'C.V.'], [
  ['X', T(KIOSK_X.mean), T(KIOSK_X.variance.sqrt()), `$${T(KIOSK_X.variance.sqrt().div(KIOSK_X.mean).mul(100))}\\%$`],
  ['Y', T(KIOSK_Y.mean), T(KIOSK_Y.variance.sqrt()), `$${T(KIOSK_Y.variance.sqrt().div(KIOSK_Y.mean).mul(100))}\\%$`],
], 'Table comparing two kiosks: X has mean 80, SD 6 and C.V. 7.5 per cent; Y has mean 25, SD 4 and C.V. 16 per cent.', 'The smaller C.V. is more consistent.');
const strategy = table(['You are asked for', 'Do this first', 'Then'], [
  ['Range', 'Find the greatest and least values (or the class limits)', 'Subtract'],
  ['Mean deviation, raw data', 'Find the mean (or the median after ordering)', 'Average the absolute gaps'],
  ['Mean deviation, frequency or classes', 'Class marks, then the mean or the median formula', r`$\dfrac{\sum f|x - a|}{\sum f}$`],
  ['Variance or SD', 'Choose the definition, shortcut or step deviation', 'Take the square root for the SD'],
  ['Which set is more consistent', 'Find mean and SD of each', 'Compare the coefficients of variation'],
], 'Table of strategies: for the range find the extremes and subtract; for a mean deviation find the centre and average the absolute gaps; for variance choose a method and take the square root; for consistency compare coefficients of variation.', 'Decide the quantity, then the method.');

export const notesSections = [
  { heading: '1. Why measure the spread?', body_md: r`The mean, median and mode describe the **centre** of the data, but two data sets with the same mean can be very different. A **measure of dispersion** is a number that tells how widely the observations are scattered about a central value.

In this chapter we meet four of them: the **range**, the **mean deviation**, the **variance** and the **standard deviation**. A small value means the data are tightly bunched (consistent); a large value means they are widely scattered.

Think of two imagined classes that both average $30$ marks: if one has marks from $28$ to $32$ and the other from $10$ to $50$, the first class is far more alike in performance, even though the averages agree.`, key_terms: [{ term: 'Dispersion', definition_md: 'How widely the observations are scattered about a central value.' }, { term: 'Deviation', definition_md: r`The difference $x - a$ between an observation and a chosen centre $a$.` }], formulas: [], visual: stripsN, visuals: [], topic_ids: [topic(1)] },
  { heading: '2. The range', body_md: r`The **range** is the greatest observation minus the least observation. For a frequency table it is the greatest minus the least listed value, and for classes it is the **upper limit of the last class minus the lower limit of the first class**.

The range is quick to find but uses only the two extreme values, so a single unusual observation can change it a great deal. Always give the unit of the data with the answer.

For the imagined hill-village temperatures $6, 11, 4, 9, 13, 8, 10$ the range is $13 - 4 = 9$ degrees.`, key_terms: [{ term: 'Range', definition_md: 'Greatest observation minus least observation.' }], formulas: [{ latex: r`\text{Range} = \text{greatest} - \text{least}`, label: 'Range' }], visual: rangeN, visuals: [rangeRules], topic_ids: [topic(1)] },
  { heading: '3. Mean deviation of ungrouped data', body_md: r`The **mean deviation about a point $a$** is the average of the absolute deviations: $\text{M.D.}(a) = \dfrac{\sum |x_i - a|}{n}$. The usual centres are the mean $\bar{x}$ and the median $M$.

**Why absolute values?** The signed deviations from the mean always add to $0$ (the table shows the ferry delays), so only absolute values measure spread.

**Steps.** (1) Find the centre: the mean, or the median after arranging the data in order (the mean of the two middle values when $n$ is even). (2) Write $|x_i - a|$ for every value. (3) Add them. (4) Divide by $n$.

For the ferry delays $5, 8, 11, 12, 24$ minutes the mean is $12$ and the mean deviation about the mean is $\dfrac{24}{5} = 4.8$; about the median, $11$, it is $\dfrac{23}{5} = 4.6$. For ungrouped data the median always gives the smaller (or equal) value, because $\sum |x - a|$ is least at the median.`, key_terms: [{ term: 'Mean deviation', definition_md: r`The mean of the absolute deviations $|x - a|$ from a chosen centre $a$.` }, { term: 'Mean deviation about the median', definition_md: 'The smallest possible mean deviation for ungrouped data.' }], formulas: [{ latex: r`\text{M.D.}(a) = \dfrac{\sum |x_i - a|}{n}`, label: 'Ungrouped data' }], visual: devN, visuals: [curveN], topic_ids: [topic(1)] },
  { heading: '4. Mean deviation of frequency distributions and grouped data', body_md: r`With frequencies, weight each absolute deviation: $\text{M.D.}(a) = \dfrac{\sum f_i |x_i - a|}{\sum f_i}$. For **classes** use the **class mark** $x_i = \dfrac{\text{lower} + \text{upper}}{2}$.

If the centre is the mean, find $\bar{x} = \dfrac{\sum f_i x_i}{\sum f_i}$ first. If it is the median, use the formula $M = l + \dfrac{\frac{n}{2} - cf}{f} \times h$, where $l$ is the lower limit of the median class (the first class whose cumulative frequency reaches $\dfrac{n}{2}$), $cf$ the cumulative frequency before it, $f$ its frequency and $h$ the class width.

**Tabulate:** columns $x$, $f$, $fx$, $|x - a|$, $f|x - a|$; the totals give the answer. For the imagined stall spending (classes $10$–$20$ to $50$–$60$, frequencies $14, 7, 10, 13, 6$) the mean is $33$ and the mean deviation about it is $\dfrac{616}{50} = 12.32$ rupees.`, key_terms: [{ term: 'Class mark', definition_md: 'The midpoint of a class, used as the value of every observation in it.' }, { term: 'Median class', definition_md: r`The first class whose cumulative frequency is at least $\dfrac{n}{2}$.` }], formulas: [{ latex: r`\text{M.D.}(a) = \dfrac{\sum f_i |x_i - a|}{\sum f_i}`, label: 'Frequency or grouped data' }, { latex: r`M = l + \dfrac{\frac{n}{2} - cf}{f} \times h`, label: 'Median of grouped data' }], visual: mdTabN, visuals: [], topic_ids: [topic(1)] },
  { heading: '5. Variance and standard deviation', body_md: r`The **variance** is the mean of the squared deviations from the mean: $\sigma^2 = \dfrac{\sum (x_i - \bar{x})^2}{n}$. The **standard deviation** is its positive square root, $\sigma = \sqrt{\sigma^2}$, in the same unit as the data (the variance is in the **square** of that unit).

The mean of the squared distances from a point $a$ is smallest at $a = \bar{x}$, and the smallest value is the variance (the graph). Expanding the squares gives the **shortcut formula** $\sigma^2 = \dfrac{\sum x_i^2}{n} - \bar{x}^2$: the mean of the squares minus the square of the mean.

For the six growths $4, 6, 7, 10, 15, 18$ mm: mean $10$, squared deviations $36, 16, 9, 0, 25, 64$ add to $150$, so $\sigma^2 = 25$ and $\sigma = 5$ mm. The variance is $0$ only when all observations are equal, and it is never negative.`, key_terms: [{ term: 'Variance', definition_md: 'The mean of the squared deviations from the mean.' }, { term: 'Standard deviation', definition_md: 'The positive square root of the variance, in the unit of the data.' }], formulas: [{ latex: r`\sigma^2 = \dfrac{\sum (x_i - \bar{x})^2}{n} = \dfrac{\sum x_i^2}{n} - \bar{x}^2`, label: 'Variance, ungrouped' }, { latex: r`\sigma = \sqrt{\sigma^2}`, label: 'Standard deviation' }], visual: seedN, visuals: [sqN], topic_ids: [topic(2)] },
  { heading: '6. Variance of frequency and grouped data by step deviation', body_md: r`For a frequency table or classes, $\sigma^2 = \dfrac{\sum f_i (x_i - \bar{x})^2}{\sum f_i} = \dfrac{\sum f_i x_i^2}{\sum f_i} - \bar{x}^2$ with the class marks as $x_i$.

To keep the numbers small, choose an **assumed mean** $A$ (a value or class mark near the middle) and the class width $h$, and let $u_i = \dfrac{x_i - A}{h}$. Then $\sigma^2 = h^2\left[\dfrac{\sum f_i u_i^2}{n} - \left(\dfrac{\sum f_i u_i}{n}\right)^2\right]$ and the mean is $\bar{x} = A + h\dfrac{\sum f_i u_i}{n}$.

For the imagined bakery sales (classes $30$–$40$ to $70$–$80$, frequencies $9, 11, 5, 9, 6$) with $A = 55$, $h = 10$: $\sum fu = -8$, $\sum fu^2 = 80$, so $\sigma^2 = 100\left[\dfrac{80}{40} - \left(\dfrac{-8}{40}\right)^2\right] = 196$ and $\sigma = 14$ loaves. The direct method and the step-deviation method always agree.`, key_terms: [{ term: 'Assumed mean', definition_md: 'A convenient value $A$ near the middle of the data, used to form small deviations.' }, { term: 'Step deviation', definition_md: r`$u = \dfrac{x - A}{h}$, where $h$ is the class width.` }], formulas: [{ latex: r`\sigma^2 = h^2\left[\dfrac{\sum fu^2}{n} - \left(\dfrac{\sum fu}{n}\right)^2\right]`, label: 'Step-deviation formula' }], visual: stepN, visuals: [flowN], topic_ids: [topic(2)] },
  { heading: '7. Shifting, scaling and comparing consistency', body_md: r`If $y = kx + c$, the mean becomes $k\bar{x} + c$, the standard deviation becomes $|k|\sigma$ and the variance becomes $k^2\sigma^2$: the **shift** $c$ does not affect the spread, and the **factor** $k$ scales it. The mean deviation scales by $|k|$ in the same way.

To compare the **consistency** of two data sets, especially when their means or units differ, use the **coefficient of variation** $\text{C.V.} = \dfrac{\sigma}{\bar{x}} \times 100$. The **smaller** C.V. means the more consistent data. In the imagined kiosk example, X has the larger standard deviation ($6$ against $4$) but the smaller C.V. ($7.5\%$ against $16\%$), so X is more consistent.

Remember: the standard deviation alone compares spreads only when the means are comparable.`, key_terms: [{ term: 'Coefficient of variation', definition_md: r`$\dfrac{\sigma}{\bar{x}} \times 100$, spread as a percentage of the mean.` }, { term: 'Consistency', definition_md: 'Data with a smaller coefficient of variation are more consistent.' }], formulas: [{ latex: r`y = kx + c \Rightarrow \sigma_y = |k|\,\sigma_x`, label: 'Change of origin and scale' }, { latex: r`\text{C.V.} = \dfrac{\sigma}{\bar{x}} \times 100`, label: 'Coefficient of variation' }], visual: shiftN, visuals: [cvN, strategy], topic_ids: [topic(2)] },
];

export const examTips = r`**How marks are awarded**
- *Range (1–2 marks):* greatest minus least (or the class limits), with the unit.
- *Mean deviation (2–5 marks):* state the centre, show the column of absolute deviations, the total, and the division by $n$ or $\sum f$; for grouped data show the class marks, and the median by the formula if the centre is the median.
- *Variance and standard deviation (2–5 marks):* the formula, the deviations or the sums, the variance, then the square root.
- *Transformation (2–3 marks):* new mean by the rule, SD multiplied by $|k|$, variance by $k^2$.
- *Consistency (3–5 marks):* the means and standard deviations, both coefficients of variation, and the conclusion in words.

**Common mistakes**
- Dividing by the number of classes instead of $\sum f$.
- Using signed deviations about the mean (they add to $0$).
- Forgetting to arrange the data in order before finding the median.
- Subtracting the mean, not its **square**, in the shortcut formula.
- Forgetting the $h^2$ factor in the step-deviation formula.
- Comparing consistency by the standard deviation alone instead of the coefficient of variation.`;

const fcard = (id, front_md, back_md, tag, t) => ({ id, front_md, back_md, tag, topic_id: topic(t) });
export const cards = [
  fcard('f01', 'What does a measure of dispersion describe?', 'How widely the observations are scattered about a central value.', 'definition', 1),
  fcard('f02', 'Name four measures of dispersion in this chapter.', 'Range, mean deviation, variance and standard deviation.', 'fact', 1),
  fcard('f03', 'Why is the mean alone not enough to describe data?', 'Two data sets can have the same mean but very different spread; dispersion shows the difference.', 'concept', 1),
  fcard('f04', 'Define the range.', 'Greatest observation minus least observation.', 'definition', 1),
  fcard('f05', 'How do you find the range of grouped data?', 'Upper limit of the last class minus the lower limit of the first class.', 'formula', 1),
  fcard('f06', 'What is the main weakness of the range?', 'It uses only the two extreme values, so one unusual value changes it a lot.', 'concept', 1),
  fcard('f07', 'What is a deviation from a centre $a$?', r`The difference $x - a$ between an observation $x$ and the centre $a$.`, 'definition', 1),
  fcard('f08', 'What is the sum of the signed deviations from the mean?', r`Always $0$, which is why absolute values are used in the mean deviation.`, 'fact', 1),
  fcard('f09', 'Formula for the mean deviation of ungrouped data about $a$?', r`$\text{M.D.}(a) = \dfrac{\sum |x_i - a|}{n}$.`, 'formula', 1),
  fcard('f10', 'Formula for the mean deviation of a frequency distribution about $a$?', r`$\text{M.D.}(a) = \dfrac{\sum f_i |x_i - a|}{\sum f_i}$.`, 'formula', 1),
  fcard('f11', 'About which centre is the mean deviation of ungrouped data smallest?', r`The median: $\sum |x - a|$ is least when $a$ is the median.`, 'fact', 1),
  fcard('f12', 'How do you find the median of an even number of ungrouped values?', 'Arrange in order and take the mean of the two middle values.', 'exam-tip', 1),
  fcard('f13', 'What is the class mark of a class?', r`$\dfrac{\text{lower limit} + \text{upper limit}}{2}$, used as the value of every observation in the class.`, 'definition', 1),
  fcard('f14', 'Median of grouped data?', r`$M = l + \dfrac{\frac{n}{2} - cf}{f} \times h$ with $l$ the lower limit of the median class.`, 'formula', 1),
  fcard('f15', 'Which class is the median class?', r`The first class whose cumulative frequency is at least $\dfrac{n}{2}$.`, 'definition', 1),
  fcard('f16', 'Columns to tabulate for a grouped mean deviation?', r`Class, class mark $x$, $f$, $fx$, $|x - a|$ and $f|x - a|$, then the totals.`, 'exam-tip', 1),
  fcard('f17', 'Common mistake in a mean deviation of grouped data?', 'Dividing by the number of classes instead of the total frequency.', 'exam-tip', 1),
  fcard('f18', 'Define the variance.', r`The mean of the squared deviations from the mean: $\sigma^2 = \dfrac{\sum (x_i - \bar{x})^2}{n}$.`, 'definition', 2),
  fcard('f19', 'Define the standard deviation.', r`The positive square root of the variance: $\sigma = \sqrt{\sigma^2}$.`, 'definition', 2),
  fcard('f20', 'In what unit is the variance, if the data are in centimetres?', 'In square centimetres; the standard deviation is in centimetres.', 'fact', 2),
  fcard('f21', 'The shortcut formula for the variance?', r`$\sigma^2 = \dfrac{\sum x_i^2}{n} - \bar{x}^2$: mean of the squares minus the square of the mean.`, 'formula', 2),
  fcard('f22', 'Variance of a frequency distribution?', r`$\sigma^2 = \dfrac{\sum f_i (x_i - \bar{x})^2}{\sum f_i} = \dfrac{\sum f_i x_i^2}{\sum f_i} - \bar{x}^2$.`, 'formula', 2),
  fcard('f23', 'What is the step-deviation formula for the variance?', r`$\sigma^2 = h^2\left[\dfrac{\sum fu^2}{n} - \left(\dfrac{\sum fu}{n}\right)^2\right]$ with $u = \dfrac{x - A}{h}$.`, 'formula', 2),
  fcard('f24', 'How do you find the mean by step deviation?', r`$\bar{x} = A + h\dfrac{\sum fu}{n}$.`, 'formula', 2),
  fcard('f25', 'When is the variance zero?', 'Only when all the observations are equal. It is never negative.', 'fact', 2),
  fcard('f26', 'Effect of adding $c$ to every observation?', 'The mean changes by $c$; the variance and the standard deviation are unchanged.', 'concept', 2),
  fcard('f27', 'Effect of multiplying every observation by $k$?', r`The standard deviation is multiplied by $|k|$ and the variance by $k^2$.`, 'concept', 2),
  fcard('f28', 'What is the coefficient of variation?', r`$\dfrac{\sigma}{\bar{x}} \times 100$, the standard deviation as a percentage of the mean.`, 'formula', 2),
  fcard('f29', 'Which data set is more consistent, using C.V.?', 'The one with the smaller coefficient of variation.', 'exam-tip', 2),
  fcard('f30', 'Why not compare consistency by standard deviation alone?', 'The means may differ: a larger SD can still give a smaller coefficient of variation.', 'concept', 2),
];
