// Build ICSE 9 Mathematics ch02 Compound Interest. Run from platform/:
//   npx tsx content/authored/maths/icse-9-mathematics-ch02/src/build.mjs
// Every figure on the slides, in the notes and in the tables is computed with money.mjs (exact rational arithmetic)
// and the values quoted in text are asserted against it before anything is written.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, topic, deck, sl, table, flow, plot, build, chapterTests, r } from './lib.mjs';
import { amount, ciOf, siOf, amountRates, principalOf, rateOf, timeOf, diffCISI, depreciated, afterChanges, yearly, rupees, whole, factor, pow, decimal, dec, sub, mul, div } from './money.mjs';
import { Aline, CIline, Rline, SIline, Dline, Gline, tm } from './work.mjs';

setUnit('icse-9-mathematics-ch02', { author: 'claude-sonnet-5-5 (writer; reviewed by the subject-producer)' });
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const must = (cond, msg) => { if (!cond) throw new Error(`worked example check failed: ${msg}`); };
const A_ = (P, rate, n, m = 1) => rupees(amount(P, rate, n, m));
const CI_ = (P, rate, n, m = 1) => rupees(ciOf(P, rate, n, m));
const SI_ = (P, rate, t) => rupees(siOf(P, rate, t));
const D_ = (P, rate, n) => rupees(diffCISI(P, rate, n));
const V_ = (V0, rate, n) => rupees(depreciated(V0, rate, n));
const fct = (rate, k, m = 1) => decimal(pow(factor(rate, m), k));

// ---------------------------------------------------------------- worked-example figures (asserted)
const e1 = yearly(8000, [5, 5]);
must(e1[0].interest === 400 && e1[0].closing === 8400 && e1[1].interest === 420 && e1[1].closing === 8820 && CI_(8000, 5, 2) === 820 && SI_(8000, 5, 2) === 800, 'e1: 8000 at 5% for 2 years');
const e2 = yearly(12500, [8, 8, 8]);
must(e2[0].closing === 13500 && e2[1].closing === 14580 && e2[2].interest === 1166.4 && e2[2].closing === 15746.4 && CI_(12500, 8, 3) === 3246.4, 'e2: 12500 at 8% for 3 years');
must(A_(16000, 5, 3) === 18522 && CI_(16000, 5, 3) === 2522 && fct(5, 3) === '1.157625', 'e3: 16000 at 5% for 3 years');
must(A_(10000, 10, 1.5, 2) === 11576.25 && CI_(10000, 10, 1.5, 2) === 1576.25, 'e4: half-yearly');
const e5 = yearly(15000, [6, 8, 10]);
must(e5[0].closing === 15900 && e5[1].closing === 17172 && e5[2].closing === 18889.2 && rupees(amountRates(15000, [6, 8, 10])) === 18889.2, 'e5: successive rates');
must(rupees(principalOf(7938, 5, 2)) === 7200 && rateOf(25000, 28090, 2) === 6 && timeOf(5000, 8640, 20) === 3, 'inverse examples');
must(D_(20000, 5, 2) === 50 && CI_(20000, 5, 2) === 2050 && SI_(20000, 5, 2) === 2000, 'diff example 1');
must(rupees(div(180, mul(0.1, 0.1))) === 18000 && CI_(18000, 10, 2) === 3780 && SI_(18000, 10, 2) === 3600, 'diff example 2');
must(whole(amount(40000, 5, 3)) === 46305 && V_(50000, 10, 3) === 36450 && V_(50000, 10, 2) === 40500, 'growth and depreciation');
must(rupees(afterChanges(80000, [25, -20])) === 80000 && rupees(afterChanges(10000, [20, -20])) === 9600, 'rise and fall');
// plots: 10000 at 10%
const cmp = [1, 2, 3, 4, 5].map((t) => ({ t, ci: A_(10000, 10, t), si: 10000 + SI_(10000, 10, t) }));
must(cmp.map((x) => x.ci).join() === '11000,12100,13310,14641,16105.1' && cmp.map((x) => x.si).join() === '11000,12000,13000,14000,15000', 'plot values');
for (const x of cmp) must(Math.abs(10000 * 1.1 ** x.t - x.ci) < 1e-6 && x.si === 10000 + 1000 * x.t, `plot expression at ${x.t}`);
const pop = [1, 2, 3].map((t) => whole(amount(40000, 5, t)));
must(pop.join() === '42000,44100,46305' && 40000 + 2000 * 3 === 46000, 'population plot');
const dep = [1, 2, 3].map((t) => V_(50000, 10, t));
must(dep.join() === '45000,40500,36450' && 50000 - 5000 * 3 === 35000 && 50000 - 5000 * 2 === 40000, 'depreciation plot');

const rsn = (x) => `₹$${tm(x)}$`;
// ---------------------------------------------------------------- visuals
const yrTable = (P, rates, cap) => {
  const rows = yearly(P, rates);
  return table(['Year', 'Principal at start (₹)', 'Interest for the year (₹)', 'Amount at end (₹)'], rows.map((x) => [`$${x.year}$`, `$${tm(x.opening)}$`, `$${tm(x.interest)}$`, `$${tm(x.closing)}$`]), `Year-by-year table for a principal of ${P} rupees: ${rows.map((x) => `year ${x.year} principal ${x.opening}, interest ${x.interest}, amount ${x.closing}`).join('; ')} rupees.`, cap);
};
const ideaFlow = flow('LR', [['p', 'Principal $P$'], ['i', 'Interest for the year'], ['a', 'Interest is added: new principal'], ['n', 'Next year the larger principal earns interest']], [['p', 'i'], ['i', 'a'], ['a', 'n'], ['n', 'i']], 'Flow chart of compound interest: the principal earns interest for a year, the interest is added to the principal, and the larger principal earns interest in the next year, again and again.', 'Interest on interest.');
const siCiTable = table(['Year', 'Amount with simple interest (₹)', 'Amount with compound interest (₹)'], cmp.slice(0, 3).map((x) => [`$${x.t}$`, `$${tm(x.si)}$`, `$${tm(x.ci)}$`]), 'Table for 10000 rupees at 10 per cent a year: with simple interest the amounts are 11000, 12000 and 13000 rupees after 1, 2 and 3 years; with compound interest they are 11000, 12100 and 13310 rupees.', 'The two agree in year $1$, then compound interest pulls ahead.');
const ex1Table = yrTable(8000, [5, 5], 'Interest ₹$400$ then ₹$420$: compound interest ₹$820$.');
const ex2Table = yrTable(12500, [8, 8, 8], 'Paise appear: ₹$1166.40$ in the third year.');
const cmpPlot = plot({ x: [0, 5], y: [9000, 17000], xl: 'years', yl: 'amount (₹)', fns: [{ expr: '10000*1.1^x', label: 'compound interest' }, { expr: '10000+1000*x', label: 'simple interest' }], pts: [[3, 13310, '(3, 13310)'], [3, 13000, '(3, 13000)'], [5, 16105.1, '(5, 16105.1)'], [5, 15000, '(5, 15000)']] }, 'Graph of the amount on 10000 rupees at 10 per cent a year against the number of years: simple interest is a straight line through 13000 rupees at 3 years and 15000 at 5 years, while compound interest is a curve bending upwards through 13310 at 3 years and 16105.10 at 5 years.', 'The gap between the line and the curve widens every year.');
const derivFlow = flow('LR', [['a', '$P$'], ['b', 'After 1 year: $P\\left(1+\\dfrac{r}{100}\\right)$'], ['c', 'After 2 years: $P\\left(1+\\dfrac{r}{100}\\right)^{2}$'], ['d', 'After $n$ years: $P\\left(1+\\dfrac{r}{100}\\right)^{n}$']], [['a', 'b', '× factor'], ['b', 'c', '× factor'], ['c', 'd', '× factor']], 'Flow chart: each year multiplies the amount by the growth factor one plus r over one hundred, so after n years the amount is P times that factor to the power n.', 'One multiplication per year.');
const rates = [2, 4, 5, 6, 8, 10, 12, 15, 20];
const facTable = table(['$r\\%$', '$1 + \\dfrac{r}{100}$', 'Squared', 'Cubed'], rates.map((x) => [`$${x}$`, `$${fct(x, 1)}$`, `$${fct(x, 2)}$`, `$${fct(x, 3)}$`]), 'Table of growth factors: for rates 2, 4, 5, 6, 8, 10, 12, 15 and 20 per cent it lists one plus r over 100, its square and its cube, for example 1.05, 1.1025 and 1.157625 at 5 per cent.', 'Learn the factors at $5\\%$, $10\\%$ and $20\\%$.');
must(rates.map((x) => fct(x, 2)).join() === '1.0404,1.0816,1.1025,1.1236,1.1664,1.21,1.2544,1.3225,1.44' && fct(10, 3) === '1.331' && fct(20, 3) === '1.728', 'factor table');
const ex3Table = table(['Quantity', 'Value'], [['$P$, $r$, $n$', '$16000$, $5$, $3$'], ['Growth factor $(1.05)^{3}$', `$${fct(5, 3)}$`], ['Amount $A$', `$${tm(A_(16000, 5, 3))}$`], ['$\\text{CI} = A - P$', `$${tm(CI_(16000, 5, 3))}$`]], 'Working table for 16000 rupees at 5 per cent for 3 years: the growth factor is 1.157625, the amount is 18522 rupees and the compound interest is 2522 rupees.', 'Compound interest ₹$2522$.');
const halfFlow = flow('LR', [['y', 'Yearly rate $r\\%$ and $n$ years'], ['h', 'Rate per half-year: $\\dfrac{r}{2}\\%$'], ['k', 'Number of half-years: $2n$'], ['f', '$A = P\\left(1 + \\dfrac{r}{200}\\right)^{2n}$']], [['y', 'h', 'halve'], ['y', 'k', 'double'], ['h', 'f'], ['k', 'f']], 'Flow chart for half-yearly compounding: halve the yearly rate, double the number of years to get the number of half-years, then use the amount formula with these values.', 'Halve the rate, double the time.');
const ex4Table = table(['Quantity', 'Value'], [['Yearly rate, time', '$10\\%$, $1.5$ years'], ['Rate per half-year', '$5\\%$'], ['Number of half-years', '$3$'], ['Growth factor $(1.05)^{3}$', `$${fct(5, 3)}$`], ['Amount', `$${tm(A_(10000, 10, 1.5, 2))}$`], ['Compound interest', `$${tm(CI_(10000, 10, 1.5, 2))}$`]], 'Working table for 10000 rupees at 10 per cent a year for one and a half years compounded half-yearly: 5 per cent for each of 3 half-years, factor 1.157625, amount 11576.25 rupees and compound interest 1576.25 rupees.', 'Amount ₹$11576.25$.');
const ex5Rows = e5.map((x, i) => [`$${x.year}$`, `$${[6, 8, 10][i]}$`, `$${tm(x.opening)}$`, `$${tm(x.interest)}$`, `$${tm(x.closing)}$`]);
const ex5Table = table(['Year', 'Rate (%)', 'Principal at start (₹)', 'Interest (₹)', 'Amount at end (₹)'], ex5Rows, 'Table for 15000 rupees with rates 6, 8 and 10 per cent in successive years: the amounts are 15900, 17172 and 18889.20 rupees.', 'Each year uses its own rate.');
const sum1 = table(['Idea', 'Formula or fact'], [['Year by year', 'amount at the end of a year = principal for the next year'], ['Amount', '$A = P\\left(1 + \\dfrac{r}{100}\\right)^{n}$'], ['Compound interest', '$\\text{CI} = A - P$'], ['Half-yearly', 'rate $\\dfrac{r}{2}$, time $2n$'], ['Different rates', '$A = P\\left(1 + \\dfrac{r_1}{100}\\right)\\left(1 + \\dfrac{r_2}{100}\\right)\\cdots$']], 'Summary table: year by year the amount becomes the next principal; the amount formula; CI is A minus P; half-yearly halves the rate and doubles the time; different rates multiply their factors.', 'Part 1 in five lines.');

// part 2
const invFlow = flow('TB', [['q', 'Which quantity is unknown?'], ['p', 'Principal $P$: divide $A$ by the factor'], ['r', 'Rate $r$: write $\\dfrac{A}{P}$ as a perfect power'], ['n', 'Time $n$: compare $\\dfrac{A}{P}$ with powers of the factor'], ['c', 'Check by working forwards']], [['q', 'p', 'P'], ['q', 'r', 'r'], ['q', 'n', 'n'], ['p', 'c'], ['r', 'c'], ['n', 'c']], 'Decision chart for inverse problems: if the principal is unknown divide the amount by the growth factor; if the rate is unknown write the ratio of amount to principal as a perfect power; if the time is unknown compare the ratio with powers of the factor; always check by working forwards.', 'Three kinds of inverse problem.');
const f1Table = table(['Step', 'Result'], [['Growth factor $(1.05)^{2}$', `$${fct(5, 2)}$`], ['Equation', '$7200 \\times 1.1025 = 7938$ is the check'], ['$P = \\dfrac{A}{\\text{factor}}$', `$\\dfrac{7938}{${fct(5, 2)}} = ${tm(rupees(principalOf(7938, 5, 2)))}$`]], 'Steps for finding the principal when 7938 rupees is the amount after 2 years at 5 per cent: the factor is 1.1025 and the principal is 7938 divided by 1.1025, which is 7200 rupees.', 'Principal ₹$7200$.');
const f2Table = table(['Step', 'Result'], [['Ratio $\\dfrac{A}{P}$', '$\\dfrac{28090}{25000} = 1.1236$'], ['As a square', '$1.1236 = (1.06)^{2}$'], ['Factor', '$1 + \\dfrac{r}{100} = 1.06$'], ['Rate', '$r = 6$']], 'Steps for finding the rate: 28090 divided by 25000 is 1.1236, which is 1.06 squared, so the factor is 1.06 and the rate is 6 per cent.', 'Rate $6\\%$.');
const f3Rows = [1, 2, 3, 4].map((k) => [`$${k}$`, `$${fct(20, k)}$`, `$${tm(A_(5000, 20, k))}$`]);
const f3Table = table(['Years $n$', '$(1.2)^{n}$', 'Amount on ₹5000 (₹)'], f3Rows, 'Table of powers of 1.2 and the amount on 5000 rupees at 20 per cent: 1.2 gives 6000, 1.44 gives 7200, 1.728 gives 8640 and 2.0736 gives 10368 rupees after 1, 2, 3 and 4 years.', 'The amount $8640$ matches $n = 3$.');
must(f3Rows.map((x) => x[1]).join() === '$1.2$,$1.44$,$1.728$,$2.0736$' && A_(5000, 20, 3) === 8640 && A_(5000, 20, 4) === 10368, 'f3 table');
const f4Table = table(['Years', 'Difference between CI and SI'], [['$2$', '$P\\left(\\dfrac{r}{100}\\right)^{2}$'], ['$3$', '$P\\left(\\dfrac{r}{100}\\right)^{2}\\left(3 + \\dfrac{r}{100}\\right)$']], 'Table of the difference between compound interest and simple interest: for 2 years it is P times r over 100 squared; for 3 years it is P times r over 100 squared times the sum 3 plus r over 100.', 'Learn both; check by direct working.');
const dTable = table(['', 'Compound interest (₹)', 'Simple interest (₹)', 'Difference (₹)'], [[ '$20000$ at $5\\%$, $2$ years', `$${tm(CI_(20000, 5, 2))}$`, `$${tm(SI_(20000, 5, 2))}$`, `$${tm(D_(20000, 5, 2))}$`], ['$18000$ at $10\\%$, $2$ years', `$${tm(CI_(18000, 10, 2))}$`, `$${tm(SI_(18000, 10, 2))}$`, `$${tm(D_(18000, 10, 2))}$`]], 'Comparison table: 20000 rupees at 5 per cent for 2 years gives compound interest 2050 and simple interest 2000, a difference of 50; 18000 rupees at 10 per cent for 2 years gives 3780 and 3600, a difference of 180.', 'The difference is small but never zero after year $1$.');
const growPlot = plot({ x: [0, 3], y: [38000, 48000], xl: 'years', yl: 'population', fns: [{ expr: '40000*1.05^x', label: 'grows 5% a year' }, { expr: '40000+2000*x', label: 'grows by 2000 a year' }], pts: [[2, 44100, '(2, 44100)'], [3, 46305, '(3, 46305)'], [3, 46000, '(3, 46000)']] }, 'Graph of a population of 40000 growing 5 per cent a year compared with a straight line adding 2000 a year: after 3 years the compound growth reaches 46305 while the straight line reaches 46000.', 'Growth at a fixed rate is compounded.');
const popTable = table(['Year', 'Population at start', 'Increase', 'Population at end'], [1, 2, 3].map((k) => [`$${k}$`, `$${k === 1 ? 40000 : pop[k - 2]}$`, `$${pop[k - 1] - (k === 1 ? 40000 : pop[k - 2])}$`, `$${pop[k - 1]}$`]), 'Table for a population of 40000 growing 5 per cent a year: the increases are 2000, 2100 and 2205, and the populations at the end of each year are 42000, 44100 and 46305.', 'Population after $3$ years: $46305$.');
const depRows = yearly(50000, [-10, -10, -10]);
must(depRows.map((x) => -x.interest).join() === '5000,4500,4050' && depRows.map((x) => x.closing).join() === '45000,40500,36450', 'dep rows');
const depTable = table(['Year', 'Value at start (₹)', 'Fall in value (₹)', 'Value at end (₹)'], depRows.map((x) => [`$${x.year}$`, `$${tm(x.opening)}$`, `$${tm(-x.interest)}$`, `$${tm(x.closing)}$`]), 'Table for a machine of 50000 rupees losing 10 per cent a year: the falls are 5000, 4500 and 4050 rupees and the values at the end of each year are 45000, 40500 and 36450 rupees.', 'The fall shrinks as the value shrinks.');
const depPlot = plot({ x: [0, 3], y: [30000, 52000], xl: 'years', yl: 'value (₹)', fns: [{ expr: '50000*0.9^x', label: 'loses 10% of its value a year' }, { expr: '50000-5000*x', label: 'loses 5000 a year' }], pts: [[1, 45000, '(1, 45000)'], [2, 40500, '(2, 40500)'], [2, 40000, '(2, 40000)'], [3, 36450, '(3, 36450)'], [3, 35000, '(3, 35000)']] }, 'Graph of the value of a machine of 50000 rupees: losing 10 per cent a year gives a curve through 45000, 40500 and 36450 rupees; losing a fixed 5000 a year gives a straight line through 45000, 40000 and 35000 rupees. The curve falls more slowly.', 'Percentage depreciation falls more slowly than a fixed fall.');
const riseFall = table(['', 'Start (₹)', 'After the rise (₹)', 'After the fall (₹)'], [['Rise $25\\%$, fall $20\\%$', '$80000$', `$${tm(rupees(afterChanges(80000, [25])))}$`, `$${tm(rupees(afterChanges(80000, [25, -20])))}$`], ['Rise $20\\%$, fall $20\\%$', '$10000$', `$${tm(rupees(afterChanges(10000, [20])))}$`, `$${tm(rupees(afterChanges(10000, [20, -20])))}$`]], 'Table of a rise followed by a fall: 80000 rupees rising 25 per cent becomes 100000 and falling 20 per cent returns to 80000; 10000 rupees rising 20 per cent becomes 12000 and falling 20 per cent ends at 9600.', 'Each change works on the latest value.');
const sum2 = table(['Unknown', 'Method'], [['Principal', '$P = \\dfrac{A}{\\left(1 + \\frac{r}{100}\\right)^{n}}$'], ['Rate', 'write $\\dfrac{A}{P}$ as a perfect power; read off $1 + \\dfrac{r}{100}$'], ['Time', 'compare $\\dfrac{A}{P}$ with powers of the factor; check year by year'], ['CI − SI', '$P\\left(\\dfrac{r}{100}\\right)^{2}$ for 2 years'], ['Growth', '$N = N_0\\left(1 + \\dfrac{r}{100}\\right)^{n}$'], ['Depreciation', '$V = V_0\\left(1 - \\dfrac{r}{100}\\right)^{n}$']], 'Summary table of part 2: dividing for the principal, a perfect power for the rate, comparing powers for the time, the difference formula for two years, and the growth and depreciation formulas.', 'Part 2 in six lines.');

// ---------------------------------------------------------------- decks
const FORMULA = r`A = P\left(1 + \frac{r}{100}\right)^{n}`;
const d1 = deck({
  part: 1,
  title: 'Compound interest — Part 1: How the amount grows',
  goals: ['Explain how compound interest differs from simple interest', 'Find the amount and compound interest year by year for 2 or 3 years', 'Use the formula for the amount and for the compound interest', 'Handle half-yearly compounding and different rates in successive years'],
  slides: [
    sl('title', 'Compound Interest, Part 1', { b: 'Interest that earns interest of its own.', v: ideaFlow, n: 'Welcome to compound interest. When a bank adds your interest to your money at the end of each year, the next year it pays interest on the bigger sum. Interest earns interest. In this part we learn how to work out the amount, first year by year, then with a short formula.' }),
    sl('concept', 'What you will be able to do', { ul: ['Tell **compound** from **simple** interest', 'Work out the amount **year by year**', 'Use $A = P\\left(1 + \\dfrac{r}{100}\\right)^{n}$ and $\\text{CI} = A - P$', 'Use **half-yearly** compounding', 'Use **different rates** in successive years'], n: 'These are your goals for part one. We begin with the idea, build the answer one year at a time so that you can see exactly what is happening, and then replace the long working with one neat formula. Finally we change the compounding period and the rate.' }),
    sl('concept', 'Simple interest and compound interest', { b: 'With **simple interest** every year is charged on the **original** principal. With **compound interest** the interest is **added** to the principal each year, so the principal grows.', v: siCiTable, n: 'With simple interest the interest is the same every year, because it is always worked out on the original sum. With compound interest, the interest is added to the sum at the end of each year. So the principal grows, and the interest grows with it. Look at ten thousand rupees at ten per cent. After three years, simple interest gives thirteen thousand, compound gives thirteen thousand three hundred and ten.' }),
    sl('diagram', 'Picture of the difference', { b: 'Both start at ₹$10000$ at $10\\%$. The straight line is simple interest; the curve is compound interest.', v: cmpPlot, n: 'This graph shows both. Simple interest adds the same one thousand rupees every year, so it makes a straight line. Compound interest adds a little more each year, so it bends upwards. In the first year they are equal. After that the gap grows. After five years the difference is more than one thousand rupees.' }),
    sl('example', 'Worked example 1: two years, year by year', { b: 'Find the amount and the compound interest on ₹$8000$ for $2$ years at $5\\%$ per annum.', ul: ['**Year 1 —** interest $= \\dfrac{8000 \\times 5}{100} = 400$; amount $= 8400$.', '**Year 2 —** principal $= 8400$; interest $= \\dfrac{8400 \\times 5}{100} = 420$; amount $= 8820$.', '**Compound interest —** $8820 - 8000 = 820$.', '**Compare —** simple interest would be $800$.'], v: ex1Table, n: 'In the first year the interest is five per cent of eight thousand, which is four hundred rupees. The amount is eight thousand four hundred. That amount is the principal for the second year. Five per cent of eight thousand four hundred is four hundred and twenty. The final amount is eight thousand eight hundred and twenty rupees, so the compound interest is eight hundred and twenty.' }),
    sl('check', 'Quick check: the second year', { b: 'The second year starts with a bigger principal.', chk: 'm04', n: 'Find the amount at the end of the first year. That is the principal for the second year. Then take the interest on it.' }),
    sl('example', 'Worked example 2: three years, year by year', { b: 'Find the amount and the compound interest on ₹$12500$ for $3$ years at $8\\%$ per annum.', ul: ['**Year 1 —** interest $1000$; amount $13500$.', '**Year 2 —** interest $\\dfrac{13500 \\times 8}{100} = 1080$; amount $14580$.', '**Year 3 —** interest $\\dfrac{14580 \\times 8}{100} = 1166.40$; amount $15746.40$.', '**Compound interest —** $15746.40 - 12500 = 3246.40$.'], v: ex2Table, n: 'The same steps repeat. Year one gives a thousand rupees of interest and an amount of thirteen thousand five hundred. Year two gives one thousand and eighty, and an amount of fourteen thousand five hundred and eighty. Year three gives one thousand one hundred and sixty six rupees and forty paise. The compound interest is three thousand two hundred and forty six rupees and forty paise.' }),
    sl('concept', 'Why look for a formula?', { b: 'Each year the amount is multiplied by the same number, $1 + \\dfrac{r}{100}$, the **growth factor**.', m: [r`P \to P\left(1 + \frac{r}{100}\right) \to P\left(1 + \frac{r}{100}\right)^{2} \to \cdots`], v: derivFlow, n: 'Look at the working again. Each year we added a percentage of the principal, which is the same as multiplying by one plus r over one hundred. At five per cent, that factor is one point zero five. So after n years the principal has been multiplied n times by the same factor. That gives a short formula.' }),
    sl('concept', 'The formula for the amount', { b: 'For $n$ years at $r\\%$ per annum, compounded yearly:', m: [FORMULA, r`\text{CI} = A - P`], v: facTable, n: 'The amount is the principal times the factor, one plus r over one hundred, raised to the power n. The compound interest is the amount minus the principal. The time n must be in years and the rate r is per year. This table lists the factors for common rates, with their squares and cubes. Learn the ones for five, ten and twenty per cent.' }),
    sl('example', 'Worked example 3: using the formula', { b: 'Find the amount and the compound interest on ₹$16000$ for $3$ years at $5\\%$ per annum.', ul: [`**Amount —** $${Aline(16000, 5, 3)}$.`, `**Interest —** $${CIline(16000, 5, 3)}$.`, '**Check —** year by year: $16800$, $17640$, $18522$ ✓.'], v: ex3Table, n: 'Write the formula, substitute sixteen thousand, five and three, and work out one point zero five cubed, which is one point one five seven six two five. Multiply by sixteen thousand to get eighteen thousand five hundred and twenty two rupees. Subtract the principal for the compound interest, two thousand five hundred and twenty two rupees.' }),
    sl('check', 'Quick check: compound interest', { b: 'Amount first, then subtract the principal.', chk: 'fb3', n: 'Use the factor one point one zero two five for two years at five per cent. Find the amount, then take away the principal.' }),
    sl('concept', 'Half-yearly compounding', { b: 'If interest is **compounded half-yearly**, it is added every **six months**. **Halve the rate** and **double the time**.', m: [r`A = P\left(1 + \frac{r/2}{100}\right)^{2n}`], v: halfFlow, n: 'Sometimes interest is added every six months. Then the year has two interest periods. The rate for each period is half the yearly rate, and the number of periods is twice the number of years. For eight per cent a year over two and a half years, we use four per cent and five periods.' }),
    sl('example', 'Worked example 4: half-yearly', { b: 'Find the amount and the compound interest on ₹$10000$ for $1\\tfrac{1}{2}$ years at $10\\%$ per annum, compounded half-yearly.', ul: ['**Rate per half-year —** $10 \\div 2 = 5\\%$.', '**Number of half-years —** $1.5 \\times 2 = 3$.', `**Amount —** $${Aline(10000, 10, 1.5, 2)}$.`, `**Interest —** $${CIline(10000, 10, 1.5, 2)}$.`], v: ex4Table, n: 'The yearly rate is ten per cent, so each half-year earns five per cent. One and a half years is three half-years. The amount is ten thousand times one point zero five cubed, which is eleven thousand five hundred and seventy six rupees and twenty five paise. The compound interest is one thousand five hundred and seventy six rupees and twenty five paise.' }),
    sl('check', 'Quick check: rate and periods', { b: 'Halve the rate, double the time.', chk: 'm06', n: 'For two and a half years compounded half-yearly, how many periods are there, and what is the rate for each?' }),
    sl('concept', 'Different rates in different years', { b: 'If the rates are $r_1\\%$, $r_2\\%$, $r_3\\%$ in successive years, multiply the principal by **each year\'s** factor:', m: [r`A = P\left(1 + \frac{r_1}{100}\right)\left(1 + \frac{r_2}{100}\right)\left(1 + \frac{r_3}{100}\right)`], n: 'Sometimes a bank changes its rate from year to year. Then each year has its own growth factor. We multiply the principal by the factor for the first year, then the second, then the third. The powers are no longer used, because the factors are different. The order does not change the final amount.' }),
    sl('example', 'Worked example 5: three different rates', { b: 'Find the amount and the compound interest on ₹$15000$ for $3$ years if the rates are $6\\%$, $8\\%$ and $10\\%$ in the three years.', ul: [`**Amount —** $${Rline(15000, [6, 8, 10])}$.`, `**Interest —** $18889.20 - 15000 = 3889.20$.`, '**Check —** year by year: $15900$, $17172$, $18889.20$ ✓.'], v: ex5Table, n: 'Multiply fifteen thousand by one point zero six, then by one point zero eight, then by one point one. The factor altogether is one point two five nine two eight, and the amount is eighteen thousand eight hundred and eighty nine rupees and twenty paise. The compound interest is three thousand eight hundred and eighty nine rupees and twenty paise.' }),
    sl('check', 'Quick check: half-yearly rate', { b: 'Is the whole yearly rate added every six months?', chk: 'tf3', n: 'Think about what happens to the rate when the interest is added twice a year.' }),
    sl('summary', 'Summary', { ul: ['Year by year: the amount becomes the next principal', '$A = P\\left(1 + \\dfrac{r}{100}\\right)^{n}$, $\\text{CI} = A - P$', 'Half-yearly: rate $\\dfrac{r}{2}$, time $2n$', 'Different rates: multiply the factors', 'Compound interest is more than simple interest after year $1$'], v: sum1, n: 'To sum up part one. In compound interest, each year the amount becomes the principal for the next year. The amount is P times one plus r over one hundred, to the power n, and the compound interest is the amount minus the principal. For half-yearly interest halve the rate and double the time. For different rates multiply the factors.' }),
    sl('exam-tips', 'Exam tips: how marks are awarded', { ul: ['**Amount (2–3 marks):** formula 1 + substitution 1 + amount 1', '**Always** subtract $P$ when the question asks for the **interest**', '**Mistake:** using simple interest for the second year', '**Mistake:** not halving the rate for half-yearly interest', '**Mistake:** forgetting to double $n$', '**Mistake:** rounding the factor early; keep it exact'], n: 'In the exam, write the formula first, then substitute. That earns a mark even if the arithmetic slips. Three traps to avoid: using the same principal every year, which is simple interest; forgetting to halve the rate and double the time for half-yearly interest; and giving the amount when the question asks for the interest.' }),
  ],
});

const d2 = deck({
  part: 2,
  title: 'Compound interest — Part 2: Inverse problems, differences, growth and depreciation',
  goals: ['Find the principal, the rate or the time from the other quantities', 'Find the difference between compound and simple interest', 'Apply the formula to population growth and bacteria', 'Apply it to depreciation of machines and vehicles'],
  slides: [
    sl('title', 'Compound Interest, Part 2', { b: 'Work backwards, compare, then grow and shrink.', v: invFlow, n: 'Welcome to part two. First we run the formula backwards: if we know the amount, how do we find the principal, the rate or the time? Then we compare compound interest with simple interest. Finally we use the same idea for things that grow, like populations, and things that lose value, like machines.' }),
    sl('concept', 'What you will be able to do', { ul: ['Find the **principal**, **rate** or **time**', 'Find the **difference** between CI and SI', 'Use the formula for **growth**', 'Use the formula for **depreciation**'], n: 'These are your goals for part two. The first group needs a little algebra and a lot of care. The second is a handy shortcut. The third and fourth are applications that appear in many problems about towns, cultures and machines.' }),
    sl('concept', 'Finding the principal', { b: 'The amount is $P$ times a factor, so $P$ is the amount **divided** by the factor:', m: [r`P = \frac{A}{\left(1 + \frac{r}{100}\right)^{n}}`], n: 'The amount equals the principal times the growth factor. So to find the principal, divide the amount by the factor. For two years at five per cent, the factor is one point one zero two five. Do not divide by one point zero five only once, which is a common slip.' }),
    sl('example', 'Worked example 1: the principal', { b: 'A sum amounts to ₹$7938$ in $2$ years at $5\\%$ per annum, compounded yearly. Find the sum.', ul: ['**Factor —** $(1.05)^{2} = 1.1025$.', `**Principal —** $P = \\dfrac{7938}{1.1025} = 7200$.`, '**Check —** $7200 \\times 1.05 = 7560$; $7560 \\times 1.05 = 7938$ ✓.'], v: f1Table, n: 'The factor for two years at five per cent is one point one zero two five. Divide seven thousand nine hundred and thirty eight by that factor to get seven thousand two hundred rupees. We check by working forwards: seven thousand two hundred times one point zero five is seven thousand five hundred and sixty, and again gives seven thousand nine hundred and thirty eight.' }),
    sl('check', 'Quick check: find the principal', { b: 'Divide by the factor for the full two years.', chk: 'm08', n: 'The amount is given. Divide it by the factor for two years at five per cent, not by the factor for one year.' }),
    sl('example', 'Worked example 2: the rate', { b: '₹$25000$ amounts to ₹$28090$ in $2$ years, compounded yearly. Find the rate per cent.', ul: ['**Ratio —** $\\dfrac{A}{P} = \\dfrac{28090}{25000} = 1.1236$.', '**Perfect square —** $1.1236 = (1.06)^{2}$.', '**Factor —** $1 + \\dfrac{r}{100} = 1.06$, so $r = 6$.'], v: f2Table, n: 'Divide the amount by the principal to get one point one two three six. For two years, this is the factor squared. One point one two three six is one point zero six squared. So the factor is one point zero six and the rate is six per cent a year. Check: twenty five thousand times one point zero six squared gives twenty eight thousand and ninety.' }),
    sl('diagram', 'Finding the time', { b: 'Compare $\\dfrac{A}{P}$ with powers of the factor until they match.', v: f3Table, n: 'When the time is unknown, work out the ratio of the amount to the principal and compare it with powers of the factor. For five thousand rupees at twenty per cent, the amounts after one, two, three and four years are six thousand, seven thousand two hundred, eight thousand six hundred and forty, and ten thousand three hundred and sixty eight.' }),
    sl('example', 'Worked example 3: the time', { b: 'In how many years will ₹$5000$ amount to ₹$8640$ at $20\\%$ per annum, compounded yearly?', ul: ['**Ratio —** $\\dfrac{8640}{5000} = 1.728$.', '**Powers —** $(1.2)^{3} = 1.728$, so $n = 3$.', '**Check —** $5000 \\to 6000 \\to 7200 \\to 8640$ ✓.'], v: f3Table, n: 'The ratio of eight thousand six hundred and forty to five thousand is one point seven two eight. One point two cubed is exactly one point seven two eight, so the time is three years. The check by working forward is five thousand, six thousand, seven thousand two hundred, and eight thousand six hundred and forty.' }),
    sl('check', 'Quick check: find the time', { b: 'Compare the ratio of amount to principal with powers of the factor.', chk: 'n05', n: 'Divide the amount by the principal. Then compare the ratio with powers of one point zero four until one of them matches.' }),
    sl('concept', 'Compound interest minus simple interest', { b: 'For the same $P$, $r$ and time, the compound interest is the larger. The difference has a shortcut:', m: [r`n = 2: \quad \text{CI} - \text{SI} = P\left(\frac{r}{100}\right)^{2}`, r`n = 3: \quad \text{CI} - \text{SI} = P\left(\frac{r}{100}\right)^{2}\left(3 + \frac{r}{100}\right)`], v: f4Table, n: 'In the first year compound and simple interest are equal. For two years, the whole difference is the interest on the first year\'s interest, which comes to the principal times r over one hundred, squared. For three years there is a longer formula with the extra factor three plus r over one hundred. You can always find both interests and subtract.' }),
    sl('example', 'Worked example 4: the difference', { b: 'Find the difference between CI and SI on ₹$20000$ for $2$ years at $5\\%$ per annum.', ul: ['**Compound interest —** $20000 \\times 1.1025 - 20000 = 2050$.', '**Simple interest —** $\\dfrac{20000 \\times 5 \\times 2}{100} = 2000$.', '**Difference —** $2050 - 2000 = 50$.', '**Formula —** $20000 \\times \\left(\\dfrac{5}{100}\\right)^{2} = 50$ ✓.'], v: dTable, n: 'Compound interest is twenty thousand times one point one zero two five, minus twenty thousand, which is two thousand and fifty. Simple interest is two thousand. The difference is fifty rupees. The shortcut gives the same answer: twenty thousand times five over one hundred, squared, is fifty.' }),
    sl('check', 'Quick check: a three-year difference', { b: 'Use the three-year formula, or find CI and SI separately.', chk: 'm18', n: 'For three years, find the compound interest and the simple interest, then subtract. Or use the three year formula with the extra factor.' }),
    sl('example', 'Worked example 5: find the sum from the difference', { b: 'The difference between CI and SI on a sum for $2$ years at $10\\%$ per annum is ₹$180$. Find the sum.', ul: ['**Formula —** $180 = P \\times \\left(\\dfrac{10}{100}\\right)^{2} = 0.01P$.', '**Sum —** $P = \\dfrac{180}{0.01} = 18000$.', '**Check —** CI $= 3780$, SI $= 3600$; difference $180$ ✓.'], v: dTable, n: 'Use the two year shortcut. The difference of one hundred and eighty equals P times one hundredth, because ten per cent squared is one hundredth. So P is one hundred and eighty divided by one hundredth, which is eighteen thousand rupees. The check: compound interest three thousand seven hundred and eighty, simple interest three thousand six hundred.' }),
    sl('concept', 'Growth and depreciation', { b: '**Growth** at $r\\%$ a year multiplies by $1 + \\dfrac{r}{100}$. **Depreciation** at $r\\%$ a year multiplies by $1 - \\dfrac{r}{100}$.', m: [r`N = N_0\left(1 + \frac{r}{100}\right)^{n}`, r`V = V_0\left(1 - \frac{r}{100}\right)^{n}`], v: growPlot, n: 'The same idea works whenever something changes by a fixed percentage each year. A population growing at five per cent a year is multiplied by one point zero five each year. A machine losing ten per cent of its value each year is multiplied by zero point nine each year. Population answers should be whole numbers.' }),
    sl('example', 'Worked example 6: population', { b: 'The population of a town is $40000$ and grows at $5\\%$ per annum. Find the population after $3$ years.', ul: [`**Formula —** $${Gline(40000, 5, 3)}$.`, '**Year by year —** $42000$, $44100$, $46305$ ✓.', '**Increase —** $6305$ in 3 years.'], v: popTable, n: 'Multiply forty thousand by one point zero five cubed, which is one point one five seven six two five. The population after three years is forty six thousand three hundred and five. Year by year it is forty two thousand, forty four thousand one hundred, and forty six thousand three hundred and five. The increase gets bigger each year.' }),
    sl('example', 'Worked example 7: depreciation', { b: 'A machine costing ₹$50000$ depreciates at $10\\%$ per annum. Find its value after $3$ years.', ul: [`**Formula —** $${Dline(50000, 10, 3)}$.`, '**Year by year —** $45000$, $40500$, $36450$ ✓.', '**Fall in value —** $50000 - 36450 = 13550$.'], v: depTable, n: 'Multiply fifty thousand by zero point nine cubed, which is zero point seven two nine. The value after three years is thirty six thousand four hundred and fifty rupees. Notice the fall each year: five thousand, then four thousand five hundred, then four thousand and fifty. The fall shrinks because ten per cent is taken of a smaller value.' }),
    sl('check', 'Quick check: the same fall each year?', { b: 'Think about the table of falls: 5000, 4500, 4050.', chk: 'tf4', n: 'Look at the fall in value each year in the table. Is it the same number of rupees every year, or does it change?' }),
    sl('diagram', 'Percentage fall against fixed fall', { b: 'The curve is depreciation at $10\\%$ a year. The straight line is a fixed fall of ₹$5000$ a year.', v: depPlot, n: 'Compare two machines that both start at fifty thousand rupees. One loses a fixed five thousand rupees every year. The other loses ten per cent of its present value each year. After three years the first is worth thirty five thousand and the second is worth thirty six thousand four hundred and fifty. Percentage depreciation falls more slowly.' }),
    sl('example', 'Worked example 8: a rise and a fall', { b: 'A plot of land costing ₹$80000$ rises in value by $25\\%$ in one year and then falls by $20\\%$ in the next year. What is its value at the end?', ul: ['**After the rise —** $80000 \\times 1.25 = 100000$.', '**After the fall —** $100000 \\times 0.8 = 80000$.', '**Compare —** a rise and fall of the same per cent do **not** cancel.'], v: riseFall, n: 'After a twenty five per cent rise, eighty thousand rupees becomes one lakh. A twenty per cent fall of one lakh is twenty thousand, giving eighty thousand again. So here the plot returns exactly to its start. But a twenty per cent rise followed by a twenty per cent fall gives ninety six per cent of the start, because each change works on the latest value.' }),
    sl('summary', 'Summary', { ul: ['$P = \\dfrac{A}{\\left(1 + \\frac{r}{100}\\right)^{n}}$; the rate from a perfect power; the time by comparing powers', '$\\text{CI} - \\text{SI} = P\\left(\\dfrac{r}{100}\\right)^{2}$ for $2$ years', 'Growth: $N = N_0\\left(1 + \\dfrac{r}{100}\\right)^{n}$', 'Depreciation: $V = V_0\\left(1 - \\dfrac{r}{100}\\right)^{n}$', 'Check every answer by working forwards'], v: sum2, n: 'To sum up part two. Divide the amount by the factor to find the principal. Write the ratio as a perfect power to find the rate, and compare with powers to find the time. Memorise the two year difference shortcut. For growth use the factor one plus r over one hundred, and for depreciation use one minus r over one hundred.' }),
    sl('exam-tips', 'Exam tips: how marks are awarded', { ul: ['**Principal, rate or time (3–4 marks):** equation 1–2 + working 1 + answer 1', '**Difference (2–3 marks):** CI 1 + SI 1 + difference 1', '**Growth or depreciation (2–3 marks):** factor 1 + substitution 1 + answer 1', '**Mistake:** using $1 + \\dfrac{r}{100}$ for depreciation', '**Mistake:** giving a fractional population', '**Not in the syllabus:** repaying a loan in equal instalments'], n: 'For inverse problems show the equation clearly and check your answer by working forwards. For depreciation, make sure you subtract in the factor, one minus r over one hundred. Populations are whole numbers. One line: repaying a loan in equal instalments is not in the I C S E two thousand twenty eight Class nine syllabus, so you do not need it.' }),
  ],
});
must(rupees(afterChanges(80000, [25])) === 100000, 'rise 25%');

// ---------------------------------------------------------------- notes
const notes = {
  unit: 'icse-9-mathematics-ch02', version: 1, title: 'Compound Interest — chapter notes', language: 'en',
  sections: [
    { heading: '1. Simple interest and compound interest', body_md: r`With **simple interest** the interest is always worked out on the **original principal**, so it is the same every year. With **compound interest** the interest is **added to the principal** at the end of each period, and the next period's interest is worked out on the larger sum: interest earns interest.

- In the **first year** the two are equal.
- After that, compound interest is **more** than simple interest.
- The **amount** is $A = P + \text{interest}$ and the **compound interest** is $\text{CI} = A - P$.`, key_terms: [{ term: 'Compound interest', definition_md: 'Interest worked out on the principal plus the interest already added in earlier periods.' }, { term: 'Amount', definition_md: 'The principal together with the interest: $A = P + \\text{interest}$.' }, { term: 'Conversion period', definition_md: 'The time after which interest is added to the principal (a year, or six months).' }], formulas: [{ latex: '\\text{CI} = A - P', label: 'Compound interest' }], visual: ideaFlow, visuals: [siCiTable], topic_ids: [topic(1)] },
    { heading: '2. Year-by-year method (no formula)', body_md: r`For $2$ or $3$ years make a table: **principal at the start**, **interest for the year**, **amount at the end**. The amount at the end of a year is the principal for the next year.

*Example:* ₹$8000$ at $5\%$ for $2$ years: year 1 interest $400$, amount $8400$; year 2 interest $420$, amount $8820$; $\text{CI} = 820$ (simple interest would be $800$).

*Example:* ₹$12500$ at $8\%$ for $3$ years: amounts $13500$, $14580$, $15746.40$; $\text{CI} = 3246.40$.`, key_terms: [], formulas: [], visual: ex1Table, visuals: [ex2Table], topic_ids: [topic(1)] },
    { heading: '3. The formula for the amount', body_md: r`Each year multiplies the amount by the **growth factor** $1 + \dfrac{r}{100}$, so for $n$ years:

$$A = P\left(1 + \frac{r}{100}\right)^{n}, \qquad \text{CI} = A - P.$$

- $n$ is in **years** and $r$ is **per annum**.
- *Example:* ₹$16000$ at $5\%$ for $3$ years: $A = 16000 \times 1.157625 = 18522$; $\text{CI} = 2522$.
- Keep the factor exact until the final multiplication.`, key_terms: [{ term: 'Growth factor', definition_md: 'The number $1 + \\dfrac{r}{100}$ by which the amount is multiplied each year.' }], formulas: [{ latex: FORMULA, label: 'Amount (compounded yearly)' }], visual: derivFlow, visuals: [facTable, ex3Table], topic_ids: [topic(2)] },
    { heading: '4. Half-yearly compounding and different rates', body_md: r`**Half-yearly:** interest is added every six months. **Halve the rate and double the time:**

$$A = P\left(1 + \frac{r/2}{100}\right)^{2n}.$$

*Example:* ₹$10000$ at $10\%$ for $1.5$ years: $5\%$ for $3$ half-years, $A = 10000 \times 1.157625 = 11576.25$, $\text{CI} = 1576.25$.

**Different rates** in successive years: multiply by each year's factor, $A = P\left(1 + \dfrac{r_1}{100}\right)\left(1 + \dfrac{r_2}{100}\right)\cdots$. *Example:* ₹$15000$ at $6\%$, $8\%$, $10\%$: $A = 18889.20$.`, key_terms: [], formulas: [{ latex: 'A = P\\left(1 + \\frac{r/2}{100}\\right)^{2n}', label: 'Half-yearly compounding' }, { latex: 'A = P\\left(1 + \\frac{r_1}{100}\\right)\\left(1 + \\frac{r_2}{100}\\right)\\left(1 + \\frac{r_3}{100}\\right)', label: 'Different rates in successive years' }], visual: halfFlow, visuals: [ex4Table, ex5Table], topic_ids: [topic(2)] },
    { heading: '5. Finding the principal, the rate or the time', body_md: r`Run the formula backwards:

- **Principal:** $P = \dfrac{A}{\left(1 + \frac{r}{100}\right)^{n}}$. *Example:* $A = 7938$, $5\%$, $2$ years: $P = 7200$.
- **Rate:** write $\dfrac{A}{P}$ as a perfect power: $\dfrac{28090}{25000} = 1.1236 = (1.06)^{2}$, so $r = 6$.
- **Time:** compare $\dfrac{A}{P}$ with powers of the factor: $\dfrac{8640}{5000} = 1.728 = (1.2)^{3}$, so $n = 3$.
- Always **check** by working forwards, year by year.`, key_terms: [], formulas: [{ latex: 'P = \\frac{A}{\\left(1 + \\frac{r}{100}\\right)^{n}}', label: 'Principal' }], visual: invFlow, visuals: [f1Table, f2Table, f3Table], topic_ids: [topic(3)] },
    { heading: '6. Difference between compound and simple interest', body_md: r`For the same $P$, $r$ and time:

- $1$ year: the two are **equal**.
- $2$ years: $\text{CI} - \text{SI} = P\left(\dfrac{r}{100}\right)^{2}$.
- $3$ years: $\text{CI} - \text{SI} = P\left(\dfrac{r}{100}\right)^{2}\left(3 + \dfrac{r}{100}\right)$.

*Example:* ₹$20000$, $5\%$, $2$ years: $\text{CI} = 2050$, $\text{SI} = 2000$, difference $50$. If the **difference is given**, divide by $\left(\dfrac{r}{100}\right)^{2}$ to find $P$: $180 = 0.01P$ gives $P = 18000$.`, key_terms: [], formulas: [{ latex: '\\text{CI} - \\text{SI} = P\\left(\\frac{r}{100}\\right)^{2}', label: 'Difference for 2 years' }, { latex: '\\text{CI} - \\text{SI} = P\\left(\\frac{r}{100}\\right)^{2}\\left(3 + \\frac{r}{100}\\right)', label: 'Difference for 3 years' }], visual: f4Table, visuals: [dTable, cmpPlot], topic_ids: [topic(4)] },
    { heading: '7. Growth and depreciation', body_md: r`A quantity that changes by a fixed per cent each year follows the compound-interest formula.

- **Growth** (population, bacteria, savings): $N = N_0\left(1 + \dfrac{r}{100}\right)^{n}$. *Example:* $40000$ at $5\%$ for $3$ years gives $46305$.
- **Depreciation** (machines, vehicles): $V = V_0\left(1 - \dfrac{r}{100}\right)^{n}$. *Example:* ₹$50000$ at $10\%$ for $3$ years gives ₹$36450$.
- Different rates in different years: multiply the factors. A rise and a fall of the same per cent do **not** cancel: $1.2 \times 0.8 = 0.96$.
- Populations and numbers of bacteria are **whole numbers**.`, key_terms: [{ term: 'Depreciation', definition_md: 'The fall in the value of an article (a machine, a vehicle) with use and time.' }], formulas: [{ latex: 'N = N_0\\left(1 + \\frac{r}{100}\\right)^{n}', label: 'Growth' }, { latex: 'V = V_0\\left(1 - \\frac{r}{100}\\right)^{n}', label: 'Depreciation' }], visual: growPlot, visuals: [popTable, depTable, depPlot, riseFall], topic_ids: [topic(5)] },
  ],
  exam_tips_md: r`**How marks are awarded**
- *Amount or compound interest (2–3 marks):* formula 1; substitution 1; answer 1 (subtract $P$ for the interest).
- *Half-yearly (3 marks):* rate and periods 1; substitution 1; answer 1.
- *Principal, rate or time (3–4 marks):* equation 1–2; working 1; answer 1.
- *Difference between CI and SI (2–3 marks):* CI 1; SI 1; difference 1.
- *10-mark structured question:* parts (a), (b), (c) usually 3 + 3 + 4; show all working.

**Common mistakes**
1. Using the original principal every year (that is simple interest).
2. Not halving the rate, or not doubling the time, for half-yearly interest.
3. Giving the amount when the interest is asked (forgetting to subtract $P$).
4. Using $1 + \dfrac{r}{100}$ for depreciation, or $1 - \dfrac{r}{100}$ for growth.
5. Dividing by the factor only once to find the principal of a multi-year problem.
6. Giving a fractional population or number of bacteria.

*Scope:* repaying a loan in equal instalments is not in the ICSE 2028 Class IX syllabus.`,
  status: 'draft', provenance: d1.provenance,
};

// ---------------------------------------------------------------- flashcards
const fc = (id, front_md, back_md, tag, t) => ({ id, front_md, back_md, tag, topic_id: topic(t) });
const flashcards = {
  unit: 'icse-9-mathematics-ch02', version: 1, language: 'en',
  cards: [
    fc('f01', 'What is **compound interest**?', 'Interest worked out on the principal **plus the interest already added** in earlier periods.', 'definition', 1),
    fc('f02', 'What is the **amount**?', 'The principal together with the interest: $A = P + \\text{interest}$.', 'definition', 1),
    fc('f03', 'Principal for the second year, in year-by-year working?', 'The **amount at the end of the first year**.', 'concept', 1),
    fc('f04', 'Compound interest and simple interest in the first year?', 'They are **equal**.', 'fact', 1),
    fc('f05', '₹$8000$ at $5\\%$ for $2$ years, year by year: CI?', '₹$820$ (interest $400$, then $420$).', 'example', 1),
    fc('f06', 'Amount formula, compounded yearly?', `$${FORMULA}$`, 'formula', 2),
    fc('f07', 'Compound interest from the amount?', '$\\text{CI} = A - P$', 'formula', 2),
    fc('f08', 'What is the growth factor?', '$1 + \\dfrac{r}{100}$, the number the amount is multiplied by each year.', 'definition', 2),
    fc('f09', '$(1.05)^{2}$ and $(1.1)^{3}$?', '$1.1025$ and $1.331$', 'fact', 2),
    fc('f10', '₹$16000$ at $5\\%$ for $3$ years: amount and CI?', '₹$18522$ and ₹$2522$', 'example', 2),
    fc('f11', 'Half-yearly compounding: what changes?', '**Halve the rate, double the time.**', 'concept', 2),
    fc('f12', 'Half-yearly formula?', '$A = P\\left(1 + \\dfrac{r/2}{100}\\right)^{2n}$', 'formula', 2),
    fc('f13', 'Periods for $2.5$ years compounded half-yearly?', '$5$ (at half the yearly rate).', 'fact', 2),
    fc('f14', '₹$5000$ at $12\\%$ for $1$ year, half-yearly: amount?', '₹$5618$ ($6\\%$ for $2$ half-years).', 'example', 2),
    fc('f15', 'Different rates $r_1$, $r_2$ in successive years: amount?', '$A = P\\left(1 + \\dfrac{r_1}{100}\\right)\\left(1 + \\dfrac{r_2}{100}\\right)$', 'formula', 2),
    fc('f16', 'Question asks for the **interest**. Last step?', 'Subtract the principal from the amount.', 'exam-tip', 2),
    fc('f17', 'Principal from the amount?', '$P = \\dfrac{A}{\\left(1 + \\frac{r}{100}\\right)^{n}}$', 'formula', 3),
    fc('f18', 'Rate unknown: method?', 'Write $\\dfrac{A}{P}$ as a perfect power and read off $1 + \\dfrac{r}{100}$.', 'concept', 3),
    fc('f19', 'Time unknown: method?', 'Compare $\\dfrac{A}{P}$ with powers of the factor; check year by year.', 'concept', 3),
    fc('f20', '₹$2000$ becomes ₹$2662$ at $10\\%$: how many years?', '$3$ years, since $1.331 = (1.1)^{3}$.', 'example', 3),
    fc('f21', 'How to check an inverse answer?', 'Work forwards: put it back into the formula or go year by year.', 'exam-tip', 3),
    fc('f22', 'CI − SI for $2$ years?', '$P\\left(\\dfrac{r}{100}\\right)^{2}$', 'formula', 4),
    fc('f23', 'CI − SI for $3$ years?', '$P\\left(\\dfrac{r}{100}\\right)^{2}\\left(3 + \\dfrac{r}{100}\\right)$', 'formula', 4),
    fc('f24', '₹$12500$, $4\\%$, $2$ years: CI − SI?', '₹$20$', 'example', 4),
    fc('f25', 'Difference given, find $P$: how?', 'Divide the difference by $\\left(\\dfrac{r}{100}\\right)^{2}$ (for $2$ years).', 'exam-tip', 4),
    fc('f26', 'Graph of the amount: simple against compound?', 'A straight line against a curve bending upwards; they meet at year $1$.', 'diagram', 4),
    fc('f27', 'Growth formula?', '$N = N_0\\left(1 + \\dfrac{r}{100}\\right)^{n}$', 'formula', 5),
    fc('f28', 'Depreciation formula?', '$V = V_0\\left(1 - \\dfrac{r}{100}\\right)^{n}$', 'formula', 5),
    fc('f29', 'Does a machine losing $10\\%$ a year lose the same rupees each year?', 'No: each fall is $10\\%$ of a smaller value (₹$5000$, ₹$4500$, ₹$4050$ for ₹$50000$).', 'concept', 5),
    fc('f30', 'Repaying a loan in equal instalments?', 'Not in the ICSE 2028 Class IX syllabus.', 'fact', 5),
  ],
  status: 'draft', provenance: d1.provenance,
};

// ---------------------------------------------------------------- release + tests
const release = {
  unit: 'icse-9-mathematics-ch02', version: 1, academic_year: '2026-27', created_at: '2026-11-09T00:00:00+05:30',
  decks: [d1, d2], notes, flashcards, questions: [],
  build: { run_id: null, checks: { syllabus: 'topics t01-t05 (compound interest year by year for 2 or 3 years without the formula; A = P(1 + r/100)^n and CI = A - P, half-yearly compounding, different rates in successive years; finding P, r or n; the difference between CI and SI; growth and depreciation). The removed topic (repaying a loan in equal instalments) is mentioned once as out of syllabus. All figures computed in src/money.mjs with exact rational arithmetic (BigInt): amounts, interest, differences, principals, rates, times, populations and depreciated values; every amount is a whole number of paise and every count a whole number, and each inverse answer (principal, rate, time) is unique and re-checked forwards.' } },
};
const tests = chapterTests('Compound Interest', {
  A: ['m03', 'm09', 'm11', 'm16', 'ar2', 's202', 's301'],
  B: ['l01', 'l05'],
}, {
  A: ['m05', 'm07', 'm10', 'm13', 'm15', 'm17', 'm20', 'ar5', 's203', 's204', 's207', 's302', 's304'],
  B: ['l02', 'l03', 'l04'],
});
build({ dir: DIR, release, testsSpec: tests });
