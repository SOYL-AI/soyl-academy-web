// Build CBSE 10 Mathematics ch13 Statistics. Run from platform/:
//   npx tsx content/authored/maths/cbse-10-mathematics-ch13/src/build.mjs
// Worked-example tables are generated from the data arrays (stat.mjs); the values quoted in slides are
// asserted against the computed statistics before the build writes anything.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, topic, deck, sl, table, flow, build, chapterTests, r } from '../../cbse-10-mathematics-ch10/src/lib.mjs';
import { G, mean, median, medianWalk, mode, sumFx, sumFd, sumFu, workTable, hist, label } from './stat.mjs';

setUnit('cbse-10-mathematics-ch13');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- data of the worked examples (asserted)
const runs = G(0, 20, [6, 10, 12, 8, 4]);
const elec = G(0, 10, [5, 8, 8, 12, 7]);
const wage = G(200, 50, [8, 12, 20, 8, 2]);
const time = G(0, 10, [8, 14, 20, 12, 6]);
const missM = G(0, 10, [5, 9, 12, 10, 4]);
const ages = G(11, 10, [6, 10, 16, 6, 2], { inclusive: true });
const must = (cond, msg) => { if (!cond) throw new Error(`worked example check failed: ${msg}`); };
const near = (u, v) => Math.abs(u - v) < 1e-9;
must(sumFx(runs) === 1880 && near(mean(runs), 47) && sumFd(runs, 50) === -120 && sumFu(runs, 50) === -6, 'runs mean 47');
must(near(mean(elec), 27), 'elec p = 8 gives 27');
must(near(mode(wage), 320) && near(mean(wage), 309) && near(median(wage), 312.5), 'wage');
must(near(median(time), 24) && near(medianWalk(time), 24) && time.cf.join() === '8,22,42,54,60', 'time median 24');
must(near(median(missM), 25) && missM.n === 40, 'missing x = 9, y = 10');
must(near(median(ages), 33) && ages.cf.join() === '6,16,32,38,40', 'ages median 33');

const tRuns = (m, a) => workTable(runs, m, a, `Working table for the runs of 40 batters by the ${m === 'direct' ? 'direct' : m === 'assumed' ? 'assumed-mean' : 'step-deviation'} method, with class marks 10, 30, 50, 70 and 90 and frequencies 6, 10, 12, 8 and 4.`, m === 'direct' ? '$\\sum f_ix_i = 1880$, $\\sum f_i = 40$.' : m === 'assumed' ? '$a = 50$: $\\sum f_id_i = -120$.' : '$a = 50$, $h = 20$: $\\sum f_iu_i = -6$.');
const histRuns = hist(runs, 'runs', 'number of batters', 'Histogram of runs scored by 40 batters: bars of height 6, 10, 12, 8 and 4 over the classes 0 to 20, 20 to 40, 40 to 60, 60 to 80 and 80 to 100.', 'Runs scored by 40 batters in a district tournament.');
const histWage = hist(wage, 'daily wage (₹)', 'number of workers', 'Histogram of daily wages of 50 workers: bars of height 8, 12, 20, 8 and 2 over the classes 200 to 250 up to 400 to 450 rupees; the tallest bar, 300 to 350, is the modal class.', 'The tallest bar is the modal class, $300$–$350$.');
const classMarks = table(['Class', 'Lower limit', 'Upper limit', 'Class mark $x_i$'], runs.cls.map(([a, b], i) => [label(runs, i), `$${a}$`, `$${b}$`, `$${runs.x[i]}$`]), 'Table of the five classes from 0 to 20 up to 80 to 100, with their lower and upper limits and class marks 10, 30, 50, 70 and 90.', 'Class mark $=$ (lower $+$ upper) $\\div 2$.');
const methodFlow = flow('TB', [['q', 'Are the class marks small and easy?'], ['d', 'Direct: $\\bar x = \\dfrac{\\sum f_ix_i}{\\sum f_i}$'], ['a', 'Assumed mean: $\\bar x = a + \\dfrac{\\sum f_id_i}{\\sum f_i}$'], ['h', 'Do all $d_i$ share a factor $h$?'], ['s', 'Step deviation: $\\bar x = a + h\\dfrac{\\sum f_iu_i}{\\sum f_i}$']], [['q', 'd', 'yes'], ['q', 'h', 'no'], ['h', 's', 'yes'], ['h', 'a', 'no']], 'Decision chart: if the class marks are small, use the direct method; otherwise, if all deviations share the class width as a factor, use step deviation, else the assumed-mean method.', 'All three give the same mean; choose the one with the easiest arithmetic.');
const elecTable = table(['Units', '$f_i$', '$x_i$', '$f_ix_i$'], [['0–10', '$5$', '$5$', '$25$'], ['10–20', '$8$', '$15$', '$120$'], ['20–30', '$p$', '$25$', '$25p$'], ['30–40', '$12$', '$35$', '$420$'], ['40–50', '$7$', '$45$', '$315$'], ['Total', '$32 + p$', '', '$880 + 25p$']], 'Working table with a missing frequency p in the class 20 to 30: the totals are 32 plus p for the frequencies and 880 plus 25 p for the products.', 'Set $\\dfrac{880 + 25p}{32 + p} = 27$.');
const modeTable = table(['Class', 'Frequency', 'Role'], wage.cls.map((_, i) => [label(wage, i), `$${wage.f[i]}$`, i === 1 ? '$f_0$ (before)' : i === 2 ? '$f_1$ (modal class)' : i === 3 ? '$f_2$ (after)' : '']), 'Table of the wage distribution marking 250 to 300 as the class before the modal class with frequency 12, 300 to 350 as the modal class with frequency 20, and 350 to 400 as the class after it with frequency 8.', 'Read $f_0$, $f_1$, $f_2$ from three consecutive rows.');
const cfTime = workTable(time, 'cf', 0, 'Cumulative frequency table for the travel times of 60 students: frequencies 8, 14, 20, 12 and 6 give cumulative frequencies 8, 22, 42, 54 and 60.', 'The $30$th student is in $20$–$30$, the first class with cf $\\ge 30$.');
const missTable = table(['Class', 'Frequency', 'cf'], [['0–10', '$5$', '$5$'], ['10–20', '$x$', '$5 + x$'], ['20–30', '$12$', '$17 + x$'], ['30–40', '$y$', '$17 + x + y$'], ['40–50', '$4$', '$40$']], 'Table with two missing frequencies x and y; the cumulative frequency before the class 20 to 30 is 5 plus x, and the total is 40.', 'The median $25$ is in $20$–$30$, so $cf = 5 + x$.');
const agesTable = table(['Given class', 'Continuous class', 'f', 'cf'], ages.cls.map((c, i) => [label(ages, i), `$${c[0] - 0.5}$–$${c[1] - 0.5}$`, `$${ages.f[i]}$`, `$${ages.cf[i]}$`]), 'Table converting the inclusive classes 11 to 20 up to 51 to 60 into continuous classes 10.5 to 20.5 up to 50.5 to 60.5, with frequencies 6, 10, 16, 6 and 2 and cumulative frequencies 6, 16, 32, 38 and 40.', 'Subtract $0.5$ from lower limits and add $0.5$ to upper limits.');
const compareTable = table(['Measure', 'Wages example', 'Formula used'], [['Mean', '₹$309$', '$\\dfrac{\\sum f_ix_i}{\\sum f_i}$'], ['Median', '₹$312.5$', '$l + \\dfrac{\\frac n2 - cf}{f}h$'], ['Mode', '₹$320$', '$l + \\dfrac{f_1 - f_0}{2f_1 - f_0 - f_2}h$'], ['Check', '$3(312.5) - 2(309) = 319.5$', '3 Median $\\approx$ Mode $+$ 2 Mean']], 'Comparison table for the wage data, with mean 309 rupees, median 312.5 rupees, mode 320 rupees, and the empirical check 3 times the median minus 2 times the mean equals 319.5, close to the mode.', 'For moderately skewed data, 3 Median $\\approx$ Mode $+$ 2 Mean.');
const chooseTable = table(['Use', 'When', 'Example'], [['Mean', 'all values matter; no extreme values', 'average marks of a class'], ['Median', 'a few extreme values', 'household incomes in a city'], ['Mode', 'the most common value matters', 'the most sold shoe size']], 'Table on choosing a measure: the mean when all values matter and there are no extremes, the median when a few extreme values are present, and the mode when the most common value matters.', 'Choose the measure that answers the question.');
const sum1 = table(['Method', 'Formula'], [['Direct', '$\\bar x = \\dfrac{\\sum f_ix_i}{\\sum f_i}$'], ['Assumed mean', '$\\bar x = a + \\dfrac{\\sum f_id_i}{\\sum f_i}$, $d_i = x_i - a$'], ['Step deviation', '$\\bar x = a + h \\times \\dfrac{\\sum f_iu_i}{\\sum f_i}$, $u_i = \\dfrac{x_i - a}{h}$']], 'Summary of the three methods for the mean of grouped data, namely direct, assumed mean with deviations from a, and step deviation with deviations divided by the class width.', 'All three give the same mean.');
const sum2 = table(['Measure', 'Formula', 'Remember'], [['Mode', '$l + \\dfrac{f_1 - f_0}{2f_1 - f_0 - f_2} \\times h$', 'modal class $=$ highest frequency'], ['Median', '$l + \\dfrac{\\frac n2 - cf}{f} \\times h$', '$cf$ of the class **before**'], ['Relation', '3 Median $\\approx$ Mode $+$ 2 Mean', 'moderately skewed data']], 'Summary table: the mode formula with the modal class of highest frequency, the median formula with the cumulative frequency of the class before the median class, and the empirical relation.', 'Mode and median formulas.');

const d1 = deck({
  part: 1,
  title: 'Statistics — Part 1: Mean of grouped data',
  goals: ['Find class marks and explain why they represent a class', 'Find the mean of grouped data by the direct method', 'Use the assumed-mean and step-deviation methods to simplify', 'Find a missing frequency when the mean is known'],
  slides: [
    sl('title', 'Statistics, Part 1: Mean of grouped data', { b: 'Forty batters, five classes of runs: what is the average score?', v: histRuns, n: 'Welcome to Statistics. A district cricket tournament records the runs of forty batters, but only in groups: zero to twenty runs, twenty to forty, and so on. We no longer know each score. Can we still find the average? Yes. In this part we find the mean of grouped data in three ways, all giving the same answer.' }),
    sl('concept', 'What you will be able to do', { ul: ['Find **class marks**', 'Find the mean by the **direct method**', 'Use the **assumed-mean** method', 'Use the **step-deviation** method', 'Find a **missing frequency** from the mean'], n: 'These are your goals for part one. The board usually asks for the mean by a named method, so learn all three. They are really one idea: the later two only make the arithmetic smaller. At the end, we turn the question around and find a missing frequency.' }),
    sl('diagram', 'Class marks', { b: 'In grouped data we do not know the individual values. We assume every value in a class sits at its **mid-point**, the **class mark**:', m: ['x_i = \\frac{\\text{lower limit} + \\text{upper limit}}{2}'], v: classMarks, n: 'Inside the class twenty to forty, the scores could be anything from twenty to just under forty. We do not know them, so we make a sensible assumption: each one is at the middle of the class, thirty. This middle value is the class mark. All three methods for the mean are built on class marks.' }),
    sl('example', 'Worked example 1: the direct method', { b: 'Find the mean score of the $40$ batters: classes $0$–$20$, …, $80$–$100$ with frequencies $6, 10, 12, 8, 4$.', ul: ['**Step 1 —** Class marks: $10, 30, 50, 70, 90$.', '**Step 2 —** Products $f_ix_i$: $60, 300, 600, 560, 360$; total $1880$.', '**Step 3 —** $\\bar x = \\dfrac{\\sum f_ix_i}{\\sum f_i} = \\dfrac{1880}{40} = 47$.', '**Answer —** The mean score is $47$ runs.'], v: tRuns('direct'), n: 'Write the class marks in a column, multiply each by its frequency, and add the products. That total, one thousand eight hundred and eighty, is like the total of all the runs. Divide by the number of batters, forty, to get the mean: forty seven runs. Always show the table; it carries most of the marks.' }),
    sl('check', 'Quick check: mean from totals', { b: 'Divide the total of $f_ix_i$ by the total frequency.', chk: 'm03', n: 'You already have both totals. Which one goes on top?' }),
    sl('concept', 'The assumed-mean method', { b: 'Choose a convenient class mark $a$ (near the middle) and use deviations $d_i = x_i - a$. The products become small numbers.', m: ['\\bar x = a + \\frac{\\sum f_id_i}{\\sum f_i}'], v: tRuns('assumed', 50), n: 'When class marks are large, the products become large too. So pick an assumed mean a, usually a class mark near the middle, and subtract it from every class mark. These deviations are small, some negative and some positive. Find their weighted average, and add it back to a. The choice of a never changes the final answer.' }),
    sl('example', 'Worked example 2: assumed mean', { b: 'Find the mean of the same runs data with $a = 50$.', ul: ['**Step 1 —** $d_i = x_i - 50$: $-40, -20, 0, 20, 40$.', '**Step 2 —** $f_id_i$: $-240, -200, 0, 160, 160$; total $-120$.', '**Step 3 —** $\\bar x = 50 + \\dfrac{-120}{40} = 50 - 3 = 47$.', '**Check —** Same as the direct method ✓.'], v: tRuns('assumed', 50), n: 'Subtract fifty from each class mark. Multiply by the frequencies and add, taking care with the minus signs: the total is minus one hundred and twenty. Divide by forty to get minus three, and add it to fifty. The mean is forty seven again. If your two methods disagree, look for a sign slip.' }),
    sl('concept', 'The step-deviation method', { b: 'When every $d_i$ is a multiple of the class width $h$, divide by $h$: $u_i = \\dfrac{x_i - a}{h}$ is a small whole number.', m: ['\\bar x = a + h \\times \\frac{\\sum f_iu_i}{\\sum f_i}'], v: tRuns('step', 50), n: 'Look at the deviations: minus forty, minus twenty, zero, twenty, forty. They are all multiples of the class width, twenty. Divide them by twenty and you get minus two, minus one, zero, one, two. The arithmetic is now tiny. Just remember to multiply back by h at the end.' }),
    sl('example', 'Worked example 3: step deviation', { b: 'Find the mean of the runs data with $a = 50$, $h = 20$.', ul: ['**Step 1 —** $u_i$: $-2, -1, 0, 1, 2$.', '**Step 2 —** $f_iu_i$: $-12, -10, 0, 8, 8$; total $-6$.', '**Step 3 —** $\\bar x = 50 + 20 \\times \\dfrac{-6}{40} = 50 - 3 = 47$.', '**Note —** Forgetting "$\\times\\, h$" gives $49.85$, a common error.'], v: tRuns('step', 50), n: 'With u values from minus two to two, the products are small: minus twelve, minus ten, zero, eight, eight, adding to minus six. Divide by forty, multiply by twenty, and add to fifty: forty seven once more. Three methods, one answer. The most common mistake here is to forget to multiply by the class width.' }),
    sl('check', 'Quick check: step deviation', { b: 'Multiply by $h$ before adding to $a$.', chk: 'm05', n: 'Find the sum of f u divided by the total frequency. Then multiply by h and add to a.' }),
    sl('diagram', 'Which method should I use?', { b: 'All three give the same mean. Choose the one with the easiest arithmetic — unless the question names a method.', v: methodFlow, n: 'If the class marks are small numbers, the direct method is quickest. If they are large, use deviations. If the deviations share the class width as a factor, step deviation makes the numbers smallest. But if the question says use the assumed-mean method, you must use it, or you may lose marks.' }),
    sl('example', 'Worked example 4: a missing frequency', { b: 'The monthly electricity use (units) of $32 + p$ homes is grouped as $0$–$10$, …, $40$–$50$ with frequencies $5, 8, p, 12, 7$. The mean is $27$. Find $p$.', ul: ['**Step 1 —** $\\sum f_ix_i = 25 + 120 + 25p + 420 + 315 = 880 + 25p$.', '**Step 2 —** $\\sum f_i = 32 + p$.', '**Step 3 —** $\\dfrac{880 + 25p}{32 + p} = 27 \\Rightarrow 880 + 25p = 864 + 27p \\Rightarrow p = 8$.', '**Check —** $\\dfrac{1080}{40} = 27$ ✓.'], v: elecTable, n: 'Treat p like any frequency. The products and the total frequency both contain p. Set their ratio equal to the given mean and solve the linear equation: p is eight. Always check by putting p back: one thousand and eighty divided by forty is twenty seven. Questions with two missing frequencies also give the total, which supplies a second equation.' }),
    sl('check', 'Quick check: assumed mean', { b: 'Watch the sign of the sum of deviations.', chk: 'm04', n: 'Is the sum of the deviations positive or negative? Should the mean be above or below the assumed mean?' }),
    sl('summary', 'Summary', { ul: ['Class mark $=$ mid-point of the class', 'Direct: $\\dfrac{\\sum f_ix_i}{\\sum f_i}$', 'Assumed mean: $a + \\dfrac{\\sum f_id_i}{\\sum f_i}$', 'Step deviation: $a + h\\dfrac{\\sum f_iu_i}{\\sum f_i}$', 'Missing frequency: form an equation from the mean'], v: sum1, n: 'To sum up part one. Grouped data uses class marks. The direct method divides the sum of f x by the sum of f. The assumed-mean and step-deviation methods shrink the numbers but give exactly the same answer. And when a frequency is missing, the mean gives you an equation to find it.' }),
    sl('exam-tips', 'Exam tips: how marks are awarded', { ul: ['**Mean (3 marks):** table with class marks and products 1 + correct totals 1 + mean with formula 1', '**Missing frequency (3–4 marks):** totals in terms of $p$ 1 + equation 1 + solving 1', '**Mistake:** using upper or lower limits instead of class marks', '**Mistake:** forgetting to multiply by $h$ in step deviation', '**Mistake:** sign errors in negative deviations', '**Mistake:** using a different method from the one named'], n: 'Show your table neatly, with column headings and totals; it earns marks even if the final division slips. Write the formula you are using before substituting. In step deviation, the final multiplication by h is the most common loss. And if the question names a method, use that method.' }),
  ],
});

const d2 = deck({
  part: 2,
  title: 'Statistics — Part 2: Mode and median of grouped data',
  goals: ['Find the modal class and the mode of grouped data', 'Make a cumulative frequency table and find the median class', 'Find the median of grouped data, including inclusive classes', 'Find a missing frequency from the median', 'Compare mean, median and mode'],
  slides: [
    sl('title', 'Statistics, Part 2: Mode and median of grouped data', { b: 'The most common wage, and the middle wage.', v: histWage, n: 'Welcome to part two. The mean is not the only kind of average. The mode tells us the most common value, and the median tells us the middle value when the data are in order. For grouped data, both are found with formulas. Look at the wage histogram: the tallest bar is where the mode lives.' }),
    sl('concept', 'What you will be able to do', { ul: ['Find the **modal class** and the **mode**', 'Build a **cumulative frequency** table', 'Find the **median class** and the **median**', 'Handle **inclusive** classes like $11$–$20$', 'Use 3 Median $\\approx$ Mode $+$ 2 Mean'], n: 'These are your goals for part two. Note that the graphs of cumulative frequency, called ogives, are not in the syllabus this year. We use cumulative frequency only in tables, to find the median.' }),
    sl('diagram', 'The mode of grouped data', { b: 'The **modal class** has the highest frequency. Inside it, the mode is pulled towards the bigger neighbour:', m: ['\\text{Mode} = l + \\frac{f_1 - f_0}{2f_1 - f_0 - f_2} \\times h'], v: histWage, n: 'First find the modal class, the one with the highest frequency. The mode lies inside it, but not necessarily at the middle. If the class before has more values than the class after, the mode moves left; if the class after has more, it moves right. The formula does exactly that, using f nought, f one and f two.' }),
    sl('example', 'Worked example 1: modal wage', { b: 'Daily wages (₹) of $50$ workers in a Nashik vineyard: $200$–$250$, …, $400$–$450$ with frequencies $8, 12, 20, 8, 2$. Find the mode.', ul: ['**Step 1 —** Modal class $300$–$350$: $l = 300$, $f_1 = 20$, $f_0 = 12$, $f_2 = 8$, $h = 50$.', '**Step 2 —** Mode $= 300 + \\dfrac{20 - 12}{40 - 12 - 8} \\times 50$.', '**Step 3 —** $= 300 + \\dfrac{8}{20} \\times 50 = 300 + 20 = 320$.', '**Answer —** The modal wage is ₹$320$.'], v: modeTable, n: 'Write the five values on one line before substituting: l, f one, f nought, f two and h. Here f nought, twelve, is bigger than f two, eight, so the mode is pulled to the left of the class mark, three hundred and twenty five. The formula gives three hundred and twenty rupees.' }),
    sl('check', 'Quick check: mode formula', { b: 'Substitute carefully: the denominator is $2f_1 - f_0 - f_2$.', chk: 'm10', n: 'Write l, f one, f nought, f two and h first. Then compute the fraction and multiply by h.' }),
    sl('concept', 'Care with the mode', { ul: ['If the modal class is the **first** class, take $f_0 = 0$; if it is the **last**, take $f_2 = 0$', 'If two classes tie for the highest frequency, the data are **bimodal**: the formula is not used', 'The mode equals the class mark only when $f_0 = f_2$', 'Always name the modal class before using the formula'], v: table(['Situation', 'What to do'], [['Modal class first', '$f_0 = 0$'], ['Modal class last', '$f_2 = 0$'], ['Two highest classes tie', 'bimodal: no single mode by this formula'], ['$f_0 = f_2$', 'mode $=$ class mark']], 'Table of special cases for the mode: modal class first means f nought is zero; modal class last means f two is zero; a tie means the data are bimodal; equal neighbours put the mode at the class mark.', 'Special cases.'), n: 'A few special cases. If the modal class is at the edge of the table, the missing neighbour has frequency zero. If two classes tie for the top frequency, there is no single modal class, so do not use the formula. And notice that the mode is exactly the class mark only when the two neighbours are equal.' }),
    sl('diagram', 'Cumulative frequency and the median class', { b: 'The median is the value of the $\\dfrac n2$-th observation. Add up the frequencies; the **median class** is the first class whose cumulative frequency (cf) reaches $\\dfrac n2$.', v: cfTime, n: 'For the median, we need to find the middle student. Make a running total of the frequencies: this is the cumulative frequency. With sixty students, the middle is the thirtieth. The running total passes thirty in the class twenty to thirty, so that is the median class. Note: we are using a table, not an ogive graph.' }),
    sl('example', 'Worked example 2: median travel time', { b: 'Times (min) taken by $60$ students of a Surat school to reach school: $0$–$10$, …, $40$–$50$ with frequencies $8, 14, 20, 12, 6$. Find the median.', ul: ['**Step 1 —** cf: $8, 22, 42, 54, 60$; $\\dfrac n2 = 30$, so the median class is $20$–$30$.', '**Step 2 —** $l = 20$, $cf = 22$ (class before), $f = 20$, $h = 10$.', '**Step 3 —** Median $= 20 + \\dfrac{30 - 22}{20} \\times 10 = 20 + 4 = 24$ minutes.'], m: ['\\text{Median} = l + \\frac{\\frac n2 - cf}{f} \\times h'], v: cfTime, n: 'Twenty two students are already counted before the median class, so we need eight more of the twenty in that class. Eight out of twenty is two fifths of the way through the class, and two fifths of ten minutes is four. So the median is twenty four minutes. The cf in the formula always belongs to the class before.' }),
    sl('check', 'Quick check: median formula', { b: 'Use the cf of the class before the median class.', chk: 'm11', n: 'What is n over two? How many observations come before the median class? How far into the class is the middle?' }),
    sl('example', 'Worked example 3: missing frequencies from the median', { b: 'A distribution of $40$ values has classes $0$–$10$, …, $40$–$50$ with frequencies $5, x, 12, y, 4$ and median $25$. Find $x$ and $y$.', ul: ['**Step 1 —** Total: $5 + x + 12 + y + 4 = 40$, so $x + y = 19$.', '**Step 2 —** Median $25$ is in $20$–$30$: $cf = 5 + x$, $f = 12$.', '**Step 3 —** $25 = 20 + \\dfrac{20 - 5 - x}{12} \\times 10 \\Rightarrow 15 - x = 6 \\Rightarrow x = 9$.', '**Step 4 —** $y = 19 - 9 = 10$. Check: cf $5, 14, 26$ — the $20$th value is in $20$–$30$ ✓.'], v: missTable, n: 'Two unknowns need two equations. The total frequency gives the first. The median formula gives the second: the median twenty five lies in the class twenty to thirty, so the cumulative frequency before it is five plus x. Solve to get x equals nine, then y equals ten. Always check that the median really lies in the class you assumed.' }),
    sl('example', 'Worked example 4: inclusive classes', { b: 'Ages of $40$ patients at a Thane clinic: $11$–$20$, $21$–$30$, $31$–$40$, $41$–$50$, $51$–$60$ with frequencies $6, 10, 16, 6, 2$. Find the median age.', ul: ['**Step 1 —** Make the classes continuous: $10.5$–$20.5$, $20.5$–$30.5$, $30.5$–$40.5$, …', '**Step 2 —** cf: $6, 16, 32, \\ldots$; $\\dfrac n2 = 20$: median class $30.5$–$40.5$.', '**Step 3 —** Median $= 30.5 + \\dfrac{20 - 16}{16} \\times 10 = 30.5 + 2.5 = 33$ years.'], v: agesTable, n: 'Classes like eleven to twenty and twenty one to thirty have a gap between them. Before using the median or mode formula, close the gap: subtract half from each lower limit and add half to each upper limit. Then the median class starts at thirty point five, not thirty one. Forgetting this shifts the answer by half a unit.' }),
    sl('diagram', 'Mean, median and mode together', { b: 'For the wage data, mean ₹$309$, median ₹$312.5$, mode ₹$320$. For moderately skewed data,', m: ['3\\,\\text{Median} \\approx \\text{Mode} + 2\\,\\text{Mean}'], v: compareTable, n: 'Here are all three averages for the wage data, three hundred and nine, three hundred and twelve point five, and three hundred and twenty. They are close but not equal. There is a useful empirical relation: three times the median is roughly the mode plus twice the mean. It lets you estimate one measure from the other two.' }),
    sl('check', 'Quick check: the empirical relation', { b: 'Rearrange 3 Median $=$ Mode $+$ 2 Mean.', chk: 'm13', n: 'Multiply the median by three and subtract twice the mean.' }),
    sl('diagram', 'Choosing the right average', { b: 'Each measure answers a different question.', v: chooseTable, n: 'Which average should you report? The mean uses every value, so it suits marks in a class. The median is not pulled by a few extreme values, so it suits incomes, where a few very rich families would distort the mean. The mode suits questions about the most common value, like the shoe size a shop should stock most.' }),
    sl('summary', 'Summary', { ul: ['Modal class: highest frequency; Mode $= l + \\dfrac{f_1 - f_0}{2f_1 - f_0 - f_2}h$', 'Median class: first cf $\\ge \\dfrac n2$', 'Median $= l + \\dfrac{\\frac n2 - cf}{f}h$, $cf$ of the class before', 'Inclusive classes: make continuous first', '3 Median $\\approx$ Mode $+$ 2 Mean'], v: sum2, n: 'To sum up part two. The mode lies in the modal class, adjusted towards the bigger neighbour. The median lies in the class where the cumulative frequency reaches n over two. Convert inclusive classes to continuous ones first. And use the empirical relation to estimate one average from the other two.' }),
    sl('exam-tips', 'Exam tips: how marks are awarded', { ul: ['**Mode (3 marks):** modal class 1 + values of $l, f_0, f_1, f_2, h$ 1 + answer 1', '**Median (3 marks):** cf table 1 + median class and values 1 + answer 1', '**Mistake:** $cf$ of the median class instead of the class before', '**Mistake:** $f_0$ and $f_2$ swapped', '**Mistake:** inclusive classes used without $\\pm 0.5$', '**Mistake:** drawing an ogive — not in the 2026–27 syllabus'], n: 'Always write the values of the letters on one line before substituting; that line usually earns a mark by itself. Show the cumulative frequency column for any median question. Remember that cf in the formula is the one before the median class. Ogives are not required this year, so spend your time on the formulas.' }),
  ],
});

const notes = {
  unit: 'cbse-10-mathematics-ch13', version: 1, title: 'Statistics — chapter notes', language: 'en',
  sections: [
    { heading: '1. Grouped data and class marks', body_md: r`In grouped data each class is represented by its **class mark** (mid-point):

$$x_i = \frac{\text{lower limit} + \text{upper limit}}{2}.$$

For equal classes, consecutive class marks differ by the class width $h$. Inclusive classes such as $11$–$20$, $21$–$30$ are made continuous ($10.5$–$20.5$, $20.5$–$30.5$) before using the median or mode formula; their class marks are unchanged ($15.5$, $25.5$).`, key_terms: [{ term: 'Class mark', definition_md: 'The mid-point of a class.' }, { term: 'Class width', definition_md: 'Upper limit minus lower limit of a class.' }], formulas: [{ latex: 'x_i = \\frac{\\text{lower} + \\text{upper}}{2}', label: 'Class mark' }], visual: classMarks, topic_ids: [topic(1)] },
    { heading: '2. Mean: three methods', body_md: r`- **Direct:** $\bar x = \dfrac{\sum f_ix_i}{\sum f_i}$.
- **Assumed mean** ($a$ a convenient class mark, $d_i = x_i - a$): $\bar x = a + \dfrac{\sum f_id_i}{\sum f_i}$.
- **Step deviation** ($u_i = \dfrac{x_i - a}{h}$): $\bar x = a + h \times \dfrac{\sum f_iu_i}{\sum f_i}$.

All three give the same mean; the choice of $a$ does not affect the result. *Example:* runs data (frequencies $6, 10, 12, 8, 4$ on $0$–$100$ in steps of $20$): $\sum f_ix_i = 1880$, $\sum f_id_i = -120$ ($a = 50$), $\sum f_iu_i = -6$; mean $47$ every time.`, key_terms: [{ term: 'Assumed mean', definition_md: 'A convenient value $a$ subtracted from every class mark to simplify the arithmetic.' }], formulas: [{ latex: '\\bar x = \\frac{\\sum f_ix_i}{\\sum f_i}', label: 'Direct method' }, { latex: '\\bar x = a + \\frac{\\sum f_id_i}{\\sum f_i}', label: 'Assumed-mean method' }, { latex: '\\bar x = a + h\\,\\frac{\\sum f_iu_i}{\\sum f_i}', label: 'Step-deviation method' }], visual: tRuns('step', 50), visuals: [methodFlow], topic_ids: [topic(1)] },
    { heading: '3. Missing frequencies', body_md: r`Write $\sum f_i$ and $\sum f_ix_i$ (or $\sum f_iu_i$) in terms of the unknown, and use the given mean:

*Example:* frequencies $5, 8, p, 12, 7$ on $0$–$50$, mean $27$: $\dfrac{880 + 25p}{32 + p} = 27$ gives $p = 8$.

With **two** unknowns, the total frequency gives a second equation. With the **median** given, use the median formula, after checking which class contains the median.`, key_terms: [], formulas: [], visual: elecTable, visuals: [missTable], topic_ids: [topic(1), topic(3)] },
    { heading: '4. Mode', body_md: r`The **modal class** is the class with the highest frequency. With $l$ its lower limit, $f_1$ its frequency, $f_0$ and $f_2$ the frequencies of the classes before and after, and $h$ the class width:

$$\text{Mode} = l + \frac{f_1 - f_0}{2f_1 - f_0 - f_2} \times h.$$

- First class modal: $f_0 = 0$; last class modal: $f_2 = 0$.
- Two classes tied for the highest frequency: bimodal — the formula is not used.
- The mode equals the class mark only when $f_0 = f_2$.

*Example:* wages $8, 12, 20, 8, 2$ on $200$–$450$: mode $= 300 + \dfrac{8}{20} \times 50 = 320$.`, key_terms: [{ term: 'Modal class', definition_md: 'The class with the highest frequency.' }], formulas: [{ latex: '\\text{Mode} = l + \\frac{f_1 - f_0}{2f_1 - f_0 - f_2} \\times h', label: 'Mode of grouped data' }], visual: histWage, visuals: [modeTable], topic_ids: [topic(2)] },
    { heading: '5. Median', body_md: r`1. Find the cumulative frequencies (cf) and $\dfrac n2$.
2. The **median class** is the first class whose cf is $\ge \dfrac n2$.
3. With $l$ its lower limit, $cf$ the cumulative frequency of the class **before** it, $f$ its frequency and $h$ the width:

$$\text{Median} = l + \frac{\frac n2 - cf}{f} \times h.$$

*Example:* travel times $8, 14, 20, 12, 6$ on $0$–$50$: cf $8, 22, 42, 54, 60$; median $= 20 + \dfrac{30 - 22}{20} \times 10 = 24$.

*Not in the 2026–27 syllabus:* the graphical representation of cumulative frequency (ogives). Cumulative frequency **tables** are used.`, key_terms: [{ term: 'Cumulative frequency', definition_md: 'The running total of frequencies up to and including a class.' }, { term: 'Median class', definition_md: 'The first class whose cumulative frequency reaches $\\dfrac n2$.' }], formulas: [{ latex: '\\text{Median} = l + \\frac{\\frac n2 - cf}{f} \\times h', label: 'Median of grouped data' }], visual: cfTime, visuals: [agesTable], topic_ids: [topic(3)] },
    { heading: '6. Comparing the three measures', body_md: r`- **Mean:** uses every value; affected by extreme values.
- **Median:** the middle value; not affected much by a few extremes (use for incomes).
- **Mode:** the most common value (use for sizes, preferences).

**Empirical relation** (moderately skewed data): $3\,\text{Median} \approx \text{Mode} + 2\,\text{Mean}$. *Example:* wages mean $309$, median $312.5$ give mode $\approx 319.5$ (actual $320$).`, key_terms: [{ term: 'Measures of central tendency', definition_md: 'Mean, median and mode: single values that represent the centre of the data.' }], formulas: [{ latex: '3\\,\\text{Median} \\approx \\text{Mode} + 2\\,\\text{Mean}', label: 'Empirical relation' }], visual: compareTable, visuals: [chooseTable], topic_ids: [topic(2), topic(3)] },
  ],
  exam_tips_md: r`**How marks are awarded**
- *Mean (3 marks):* table with $x_i$ and products 1; totals 1; mean 1.
- *Mode / median (3 marks):* modal or median class (with cf table) 1; values of the letters 1; answer 1.
- *Missing frequencies (3–5 marks):* equation(s) 1–2; solving 1; check 1.

**Common mistakes**
1. Upper or lower limits used instead of class marks.
2. Forgetting $\times h$ in step deviation; sign slips in $d_i$ or $u_i$.
3. $f_0$ and $f_2$ swapped in the mode formula.
4. $cf$ of the median class instead of the class before it.
5. Inclusive classes used without making them continuous.
6. Drawing ogives — not required in 2026–27.`,
  status: 'draft', provenance: d1.provenance,
};

const fc = (id, front_md, back_md, tag, t) => ({ id, front_md, back_md, tag, topic_id: topic(t) });
const flashcards = {
  unit: 'cbse-10-mathematics-ch13', version: 1, language: 'en',
  cards: [
    fc('f01', 'Class mark of a class?', '$\\dfrac{\\text{lower limit} + \\text{upper limit}}{2}$', 'formula', 1),
    fc('f02', 'Mean by the direct method?', '$\\bar x = \\dfrac{\\sum f_ix_i}{\\sum f_i}$', 'formula', 1),
    fc('f03', 'Mean by the assumed-mean method?', '$\\bar x = a + \\dfrac{\\sum f_id_i}{\\sum f_i}$, $d_i = x_i - a$', 'formula', 1),
    fc('f04', 'Mean by the step-deviation method?', '$\\bar x = a + h \\times \\dfrac{\\sum f_iu_i}{\\sum f_i}$, $u_i = \\dfrac{x_i - a}{h}$', 'formula', 1),
    fc('f05', 'Does the choice of assumed mean change the answer?', 'No — every choice of $a$ gives the same mean.', 'fact', 1),
    fc('f06', 'Why do we use class marks?', 'Individual values are unknown; each value is assumed to be at the mid-point of its class.', 'concept', 1),
    fc('f07', 'Most common slip in step deviation?', 'Forgetting to multiply by $h$.', 'exam-tip', 1),
    fc('f08', 'Runs $0$–$100$ (width $20$), frequencies $6, 10, 12, 8, 4$: mean?', '$47$', 'example', 1),
    fc('f09', 'Every observation increases by $5$. The mean…', 'increases by $5$.', 'concept', 1),
    fc('f10', 'Every frequency is doubled. The mean…', 'stays the same.', 'concept', 1),
    fc('f11', 'One missing frequency and the mean are given. Method?', 'Write $\\sum f_ix_i$ and $\\sum f_i$ in terms of $p$; set their ratio equal to the mean.', 'exam-tip', 1),
    fc('f12', 'What is the **modal class**?', 'The class with the highest frequency.', 'definition', 2),
    fc('f13', 'Mode of grouped data?', '$l + \\dfrac{f_1 - f_0}{2f_1 - f_0 - f_2} \\times h$', 'formula', 2),
    fc('f14', 'In the mode formula, $f_0$ and $f_2$ are…', 'Frequencies of the classes before and after the modal class.', 'definition', 2),
    fc('f15', 'Modal class is the first class. $f_0 = $?', '$0$', 'fact', 2),
    fc('f16', 'When is the mode equal to the class mark of the modal class?', 'When $f_0 = f_2$.', 'concept', 2),
    fc('f17', 'Two classes tie for the highest frequency. Mode formula?', 'Not used — the data are bimodal.', 'exam-tip', 2),
    fc('f18', 'Picture: histogram. Where is the modal class?', 'Under the tallest bar.', 'diagram', 2),
    fc('f19', 'What is **cumulative frequency**?', 'The running total of frequencies up to and including a class.', 'definition', 3),
    fc('f20', 'How do you find the median class?', 'The first class whose cumulative frequency is at least $\\dfrac n2$.', 'concept', 3),
    fc('f21', 'Median of grouped data?', '$l + \\dfrac{\\frac n2 - cf}{f} \\times h$', 'formula', 3),
    fc('f22', 'In the median formula, $cf$ is…', 'The cumulative frequency of the class **before** the median class.', 'exam-tip', 3),
    fc('f23', 'Inclusive classes $11$–$20$, $21$–$30$: continuous form?', '$10.5$–$20.5$, $20.5$–$30.5$', 'example', 3),
    fc('f24', 'Last cumulative frequency equals…', '$n$, the total frequency.', 'fact', 3),
    fc('f25', 'Are ogives in the 2026–27 syllabus?', 'No — only cumulative frequency tables are used.', 'exam-tip', 3),
    fc('f26', 'Times $8, 14, 20, 12, 6$ on $0$–$50$: median?', '$24$', 'example', 3),
    fc('f27', 'Empirical relation between mean, median and mode?', '$3\\,\\text{Median} \\approx \\text{Mode} + 2\\,\\text{Mean}$', 'formula', 3),
    fc('f28', 'Mean $30$, median $32$: estimate the mode.', '$3 \\times 32 - 2 \\times 30 = 36$', 'example', 2),
    fc('f29', 'Which average suits household incomes?', 'The median — it is not distorted by a few very high incomes.', 'concept', 3),
    fc('f30', 'Which measure is NOT a measure of central tendency: mean, median, mode, range?', 'Range (it measures spread).', 'fact', 1),
  ],
  status: 'draft', provenance: d1.provenance,
};

const release = {
  unit: 'cbse-10-mathematics-ch13', version: 1, academic_year: '2026-27', created_at: '2026-10-27T00:00:00+05:30',
  decks: [d1, d2], notes, flashcards, questions: [],
  build: { run_id: null, checks: { syllabus: 'topics t01–t03 only (mean by three methods; mode by the modal-class formula, bimodal cases avoided; median and missing frequencies); removed topic absent: no ogive is drawn or asked anywhere (cumulative frequency appears only in tables). Statistics re-solved from the data arrays: three mean methods agree for every distribution, median by formula and by cumulative walk, mode with a unique modal class.' } },
};
const tests = chapterTests('Statistics', {
  A: ['m01', 'm09', 'ar5', 'tf5'],
  B: ['s201', 's205', 's303'],
  C: ['l01', 'l02'],
  D: ['c02'],
}, {
  A: ['m03', 'm04', 'm05', 'm06', 'm08', 'm10', 'm11', 'm17', 'ar3', 'ar4'],
  B: ['s202', 's208', ['s204', 's206'], 's301', ['s302', 's304']],
  C: ['l04', ['l03', 'l06']],
  D: ['c01', 'c05'],
});
build({ dir: DIR, release, testsSpec: tests });
