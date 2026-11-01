// Build ICSE 10 Mathematics ch02 Banking: Recurring Deposit Accounts. Run from platform/:
//   npx tsx content/authored/maths/icse-10-mathematics-ch02/src/build.mjs
// Every figure on the slides, in the notes and in the tables is computed with fin.mjs (exact paise arithmetic)
// and the values quoted in text are asserted against it before anything is written.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, topic, deck, sl, table, flow, plot, build, chapterTests, r } from './lib.mjs';
import { rd, tri, schedule, instalmentFromMV, rateFromMV, monthsFromMV, monthsFromI } from './fin.mjs';
import { Iline, MVline, Sline, findP, findR, findN, findNfromI, rs, tm } from './work.mjs';

setUnit('icse-10-mathematics-ch02');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const must = (cond, msg) => { if (!cond) throw new Error(`worked example check failed: ${msg}`); };

// ---------------------------------------------------------------- worked-example figures (asserted)
const e1 = rd(500, 6, 8);
must(e1.S === 10500 && e1.I === 70 && e1.MV === 3070, 'e1: 500 × 6 at 8% → S 10500, I 70');
const e2 = rd(800, 18, 7);
must(e2.S === 136800 && e2.I === 798 && e2.MV === 15198, 'e2: 800 × 18 at 7% → I 798');
const e3 = rd(1250, 24, 6.5);
must(e3.I === 2031.25 && e3.MV === 32031.25, 'e3: 1250 × 24 at 6.5% → I 2031.25');
const e4a = rd(600, 24, 8), e4b = rd(1200, 12, 8);
must(e4a.deposit === 14400 && e4b.deposit === 14400 && e4a.I === 1200 && e4b.I === 624, 'e4: same deposits, interest 1200 vs 624');
const f1 = rd(1500, 36, 7.5);
must(f1.I === 6243.75 && f1.MV === 60243.75 && f1.deposit === 54000, 'f1: 1500 × 36 at 7.5%');
const f2 = findP(31500, 24, 9);
must(f2.P === 1200 && f2.k === 2.25 && instalmentFromMV(31500, 24, 9).P === 1200, 'f2: P = 1200');
const f3 = findR(2000, 15, 31600 - 30000, 31600);
must(f3.r === 8 && f3.k === 200 && rateFromMV(2000, 15, 31600).r === 8, 'f3: r = 8');
const f4 = findN(1200, 8, 18960);
must(f4.n === 15 && f4.b === 301 && f4.c === -4740 && f4.k === 4 && monthsFromMV(1200, 8, 18960).roots[0] === -316, 'f4: n = 15');
const f5 = findNfromI(500, 10, 1150);
must(f5.n === 23 && f5.K === 552 && monthsFromI(500, 10, 1150).n === 23, 'f5: n = 23');
// plots: P = 1000, r = 6
const g = (n) => rd(1000, n, 6);
must(g(12).I === 390 && g(24).I === 1500 && g(36).I === 3330 && g(12).MV === 12390 && g(24).MV === 25500 && g(36).MV === 39330, 'plot values');
for (const n of [12, 24, 36]) must(Math.abs(2.5 * n * (n + 1) - g(n).I) < 1e-9 && Math.abs(1000 * n + 2.5 * n * (n + 1) - g(n).MV) < 1e-9, `plot expression at ${n}`);
must(32.5 * 24 === 780, 'proportional line at 24');

// ---------------------------------------------------------------- visuals
const rdFlow = flow('LR', [['p', 'Pay ₹$P$ every month'], ['b', 'The balance grows by $P$ each month'], ['i', 'Each instalment earns simple interest for its own months'], ['m', 'Maturity: ₹$P \\times n + I$']], [['p', 'b'], ['b', 'i'], ['i', 'm']], 'Flow chart of a recurring deposit: pay a fixed sum every month, the balance grows by one instalment each month, each instalment earns simple interest for the months it stays, and at maturity the bank pays the instalments plus the interest.', 'How a recurring deposit works.');
const termsTable = table(['Term', 'Meaning', 'Letter'], [['Monthly instalment', 'the fixed sum paid every month', '$P$'], ['Period', 'number of months (instalments)', '$n$'], ['Rate of interest', 'per cent per annum', '$r$'], ['Interest', 'simple interest earned on all the instalments', '$I$'], ['Maturity value', 'amount paid back at the end', 'MV']], 'Table of recurring-deposit terms: monthly instalment P, period n in months, rate r per cent per annum, interest I and maturity value MV.', 'The language of recurring deposits.');
const earn6 = schedule(500, 6);
const earnTable = table(['Instalment', 'Paid in month', 'Months it earns interest', 'Interest at 8% (₹)'], earn6.map((x) => [`${x.month}`, `$${x.month}$`, `$${x.earns}$`, `$${tm((500 * x.earns * 8) / 1200)}$`]).concat([['Total', '', `$${earn6.reduce((s, x) => s + x.earns, 0)}$`, `$${tm(earn6.reduce((s, x) => s + (500 * x.earns * 8) / 1200, 0))}$`]]), 'Table for an instalment of 500 rupees for 6 months at 8 per cent: the first instalment earns interest for 6 months, the second for 5, down to 1 month for the sixth; the interests add up to 70 rupees.', 'The first instalment earns for $6$ months, the last for only $1$.');
must(earn6.reduce((s, x) => s + (500 * x.earns * 8) / 1200, 0) === e1.I, 'earn table total = e1 interest');
const balTable = (P, n, x) => {
  const s = schedule(P, n);
  const rows = s.map((y) => [`$${y.month}$`, `$${tm(y.balance)}$`]);
  rows.push(['Sum of balances', `$${tm(rd(P, n, x).S)}$`]);
  return rows;
};
const bal6 = table(['End of month', 'Balance (₹)'], balTable(500, 6, 8), 'Table of monthly balances for 500 rupees a month: 500, 1000, 1500, 2000, 2500 and 3000 rupees; their sum, 10500 rupees, is the principal for one month.', 'Sum of balances $= 500 \\times 21 = 10500$.');
must(schedule(500, 6).reduce((s, x) => s + x.balance, 0) === 10500, 'bal6 sum');
const formulaFlow = flow('LR', [['s', 'Sum of balances $P \\times \\dfrac{n(n+1)}{2}$'], ['t', 'for one month: $\\times \\dfrac{1}{12}$'], ['q', 'at $r\\%$: $\\times \\dfrac{r}{100}$'], ['i', '$I = P \\times \\dfrac{n(n+1)}{2 \\times 12} \\times \\dfrac{r}{100}$']], [['s', 't'], ['t', 'q'], ['q', 'i']], 'Flow showing how the interest formula is built: the sum of the monthly balances, P times n times n plus 1 over 2, earns interest for one month, one twelfth of a year, at r per cent.', 'Simple interest on the principal for one month.');
const ex1Table = table(['Quantity', 'Value'], [['$P$, $n$, $r$', '$500$, $6$, $8$'], ['$\\dfrac{n(n+1)}{2}$', `$${tri(6)}$`], ['Principal for one month', `$${tm(e1.S)}$`], ['Interest', `$${tm(e1.I)}$`]], 'Working table for 500 rupees a month for 6 months at 8 per cent: n times n plus 1 over 2 is 21, the principal for one month is 10500 rupees and the interest is 70 rupees.', 'Interest ₹$70$.');
const triRows = [[6, '6 months'], [12, '1 year'], [18, '1.5 years'], [24, '2 years'], [30, '2.5 years'], [36, '3 years']];
const triTable = table(['Period', '$n$', '$\\dfrac{n(n+1)}{2}$'], triRows.map(([n, p]) => [p, `$${n}$`, `$${tri(n)}$`]), 'Table of periods and their values of n and n times n plus 1 over 2: 6 months gives 21, one year 78, one and a half years 171, two years 300, two and a half years 465 and three years 666.', 'Change years to months first.');
must(triRows.map(([n]) => tri(n)).join() === '21,78,171,300,465,666', 'tri table');
const ex2Table = table(['Quantity', 'Value'], [['$P$, $n$, $r$', '$800$, $18$, $7$'], ['$\\dfrac{n(n+1)}{2}$', `$${tri(18)}$`], ['Principal for one month', `$${tm(e2.S)}$`], ['Interest', `$${tm(e2.I)}$`]], 'Working table for 800 rupees a month for 18 months at 7 per cent: n times n plus 1 over 2 is 171, the principal for one month is 136800 rupees and the interest is 798 rupees.', 'Interest ₹$798$.');
const ex3Table = table(['Quantity', 'Value'], [['$P$, $n$, $r$', '$1250$, $24$, $6.5$'], ['$\\dfrac{n(n+1)}{2 \\times 12}$', `$${tri(24) / 12}$`], ['Interest', `$${tm(e3.I)}$`]], 'Working table for 1250 rupees a month for 24 months at 6.5 per cent: n times n plus 1 over 24 is 25, and the interest is 2031.25 rupees.', 'Paise matter: ₹2,031.25.');
const intPlot = plot({ x: [0, 36], y: [0, 3500], xl: 'months n', yl: 'interest (₹)', fns: [{ expr: '2.5*x*(x+1)', label: 'recurring deposit' }, { expr: '32.5*x', label: 'if interest were proportional to n' }], pts: [[12, 390, '(12, 390)'], [24, 1500, '(24, 1500)'], [36, 3330, '(36, 3330)'], [24, 780, '(24, 780)']] }, 'Graph of the interest on a recurring deposit of 1000 rupees a month at 6 per cent against the number of months: a curve rising faster and faster through 390 at 12 months, 1500 at 24 months and 3330 at 36 months, above a straight line that would give only 780 at 24 months.', 'Doubling the period from $12$ to $24$ months multiplies the interest by almost $4$.');
const ex4Table = table(['', 'Ritu', 'Kabir'], [['Instalment', '₹$600$', '₹$1200$'], ['Months', '$24$', '$12$'], ['Total deposited', '₹14,400', '₹14,400'], ['$\\dfrac{n(n+1)}{2}$', '$300$', '$78$'], ['Interest at 8%', `₹$${tm(e4a.I)}$`, `₹$${tm(e4b.I)}$`]], 'Comparison table: Ritu pays 600 rupees for 24 months and Kabir 1200 rupees for 12 months, both depositing 14400 rupees at 8 per cent; Ritu earns 1200 rupees of interest and Kabir 624 rupees.', 'Same deposits, very different interest.');
const sum1 = table(['Idea', 'Formula or fact'], [['Principal for one month', '$P \\times \\dfrac{n(n+1)}{2}$'], ['Interest', '$I = P \\times \\dfrac{n(n+1)}{2 \\times 12} \\times \\dfrac{r}{100}$'], ['Period', '$n$ in months; $r$ per annum'], ['Growth', 'interest grows like $n(n+1)$, not like $n$']], 'Summary table: the principal for one month is P times n times n plus 1 over 2; the interest formula; n is in months and r per annum; interest grows like n times n plus 1.', 'Part 1 in four lines.');

const mvPlot = plot({ x: [0, 36], y: [0, 40000], xl: 'months n', yl: 'amount (₹)', fns: [{ expr: '1000*x + 2.5*x*(x+1)', label: 'maturity value' }, { expr: '1000*x', label: 'total deposited' }], pts: [[12, 12390, '(12, 12390)'], [24, 25500, '(24, 25500)'], [36, 39330, '(36, 39330)'], [36, 36000, '(36, 36000)']] }, 'Graph of the maturity value of a recurring deposit of 1000 rupees a month at 6 per cent against the number of months: 12390 rupees at 12 months, 25500 at 24 and 39330 at 36, above the straight line of the total deposited, 36000 at 36 months; the gap is the interest.', 'The gap between the curve and the line is the interest.');
const mvFlow = flow('LR', [['d', 'Total deposited $P \\times n$'], ['i', 'Interest $I$'], ['m', 'Maturity value $P \\times n + I$']], [['d', 'm', 'add'], ['i', 'm', 'add']], 'Flow showing the maturity value as the total deposited, P times n, plus the interest I.', 'What the bank pays at the end.');
const f1Table = table(['Quantity', 'Value'], [['$n$', '$36$'], ['Total deposited', `$${tm(f1.deposit)}$`], ['Interest', `$${tm(f1.I)}$`], ['Maturity value', `$${tm(f1.MV)}$`]], 'Working table for 1500 rupees a month for 3 years at 7.5 per cent: n is 36, the deposits are 54000 rupees, the interest is 6243.75 rupees and the maturity value is 60243.75 rupees.', 'Maturity value ₹60,243.75.');
const growRows = [6, 12, 18, 24, 30, 36].map((n) => [`$${n}$`, `$${tm(g(n).deposit)}$`, `$${tm(g(n).I)}$`, `$${tm(g(n).MV)}$`]);
const growTable = table(['Months', 'Deposited (₹)', 'Interest (₹)', 'Maturity value (₹)'], growRows, 'Table for 1000 rupees a month at 6 per cent: after 6, 12, 18, 24, 30 and 36 months the interest is 105, 390, 855, 1500, 2325 and 3330 rupees, added to the deposits to give the maturity value.', 'Deposits grow evenly; interest grows faster.');
must([6, 12, 18, 24, 30, 36].map((n) => g(n).I).join() === '105,390,855,1500,2325,3330', 'grow table');
const invFlow = flow('TB', [['q', 'Which quantity is unknown?'], ['p', 'Instalment $P$: linear equation'], ['r', 'Rate $r$: linear equation'], ['n', 'Months $n$: quadratic equation'], ['c', 'Check by working forwards']], [['q', 'p', 'P'], ['q', 'r', 'r'], ['q', 'n', 'n'], ['p', 'c'], ['r', 'c'], ['n', 'c']], 'Decision chart for inverse problems: if the instalment or the rate is unknown, the equation is linear; if the number of months is unknown, the equation is quadratic; always check by working forwards.', 'Three kinds of inverse problem.');
const f2Table = table(['Step', 'Result'], [['Interest in terms of $P$', `$${f2.k}P$`], ['Maturity value in terms of $P$', `$${24 + f2.k}P$`], ['Equation', `$${24 + f2.k}P = 31500$`], ['Instalment', '$P = 1200$']], 'Steps for finding the instalment: interest 2.25 P, maturity value 26.25 P, equation 26.25 P equals 31500, so P is 1200 rupees.', 'Everything is a multiple of $P$.');
const f3Table = table(['Step', 'Result'], [['Total deposited', '$30000$'], ['Interest', '$31600 - 30000 = 1600$'], ['Interest in terms of $r$', `$${f3.k}r$`], ['Rate', '$r = 8$']], 'Steps for finding the rate: deposits 30000 rupees, interest 1600 rupees, interest in terms of r is 200 r, so r is 8 per cent.', 'Find the interest first.');
const f4Table = table(['Step', 'Equation'], [['Maturity value', `$18960 = 1200n + ${f4.k}n(n+1)$`], ['Standard form', '$4n^2 + 1204n - 18960 = 0$'], ['Divide by 4', `$n^2 + ${f4.b}n - ${-f4.c} = 0$`], ['Factorise', `$(n - ${f4.n})(n + ${-f4.roots[0]}) = 0$`], ['Answer', `$n = ${f4.n}$ (reject $${f4.roots[0]}$)`]], 'Steps for finding the number of months: 18960 equals 1200 n plus 4 n times n plus 1; in standard form n squared plus 301 n minus 4740 equals zero; factorising gives n equals 15 or minus 316, and the negative root is rejected.', 'Reject the negative root.');
const f5Table = table(['Step', 'Result'], [['$n(n+1)$', `$\\dfrac{1150 \\times 2400}{500 \\times 10} = ${f5.K}$`], ['Equation', `$n^2 + n - ${f5.K} = 0$`], ['Factorise', `$(n - ${f5.n})(n + ${f5.n + 1}) = 0$`], ['Answer', `$n = ${f5.n}$`]], 'Steps for finding the months from the interest: n times n plus 1 equals 552, so n squared plus n minus 552 equals zero, which factorises to give n equals 23.', 'Two consecutive numbers whose product is $552$: $23 \\times 24$.');
const verifyTable = table(['Problem', 'Answer found', 'Forward check'], [['Instalment', '$P = 1200$', `MV $= ${tm(rd(1200, 24, 9).MV)}$ ✓`], ['Rate', '$r = 8$', `MV $= ${tm(rd(2000, 15, 8).MV)}$ ✓`], ['Months from MV', '$n = 15$', `MV $= ${tm(rd(1200, 15, 8).MV)}$ ✓`], ['Months from interest', '$n = 23$', `$I = ${tm(rd(500, 23, 10).I)}$ ✓`]], 'Table checking each inverse answer by working forwards: instalment 1200 gives maturity value 31500, rate 8 gives 31600, 15 months gives 18960, and 23 months gives interest 1150 rupees.', 'Put your answer back into the formula.');
must(rd(1200, 24, 9).MV === 31500 && rd(2000, 15, 8).MV === 31600 && rd(1200, 15, 8).MV === 18960 && rd(500, 23, 10).I === 1150, 'verify table');
const sum2 = table(['Unknown', 'Method'], [['Maturity value', '$\\text{MV} = P \\times n + I$'], ['Instalment $P$', 'write MV (or $I$) as a multiple of $P$; divide'], ['Rate $r$', '$I = \\text{MV} - Pn$; write $I$ as a multiple of $r$'], ['Months $n$', 'quadratic in $n$; keep the positive whole-number root']], 'Summary table: the maturity value is P times n plus I; for the instalment write the maturity value as a multiple of P; for the rate find I and write it as a multiple of r; for the months solve a quadratic and keep the positive whole-number root.', 'Part 2 in four lines.');

// ---------------------------------------------------------------- decks
const FORMULA = r`I = P \times \frac{n(n+1)}{2 \times 12} \times \frac{r}{100}`;
const d1 = deck({
  part: 1,
  title: 'Recurring deposits — Part 1: How the interest is earned',
  goals: ['Explain how a recurring deposit account works', 'Find the principal for one month from the monthly balances', 'Calculate the interest with the formula, with the period in months', 'Explain why the interest grows faster than the period'],
  slides: [
    sl('title', 'Banking: Recurring Deposit Accounts, Part 1', { b: 'Save a fixed sum every month; the bank adds interest. How much interest?', v: rdFlow, n: 'Welcome to recurring deposits. Many families save by paying a fixed amount into the bank every month, for a year, two years or more. At the end, the bank returns all the instalments with interest. In this part we find out exactly how that interest is worked out, and why it is less than you might first think.' }),
    sl('concept', 'What you will be able to do', { ul: ['Describe a **recurring deposit** account', 'Find the **principal for one month** from the monthly balances', 'Use the interest formula with $n$ in **months**', 'Compare deposits of different lengths'], n: 'These are your goals for part one. We start with how the account works, then build the interest formula from a simple table of monthly balances. Once you understand where the formula comes from, you will not forget it, and you will avoid the most common mistakes.' }),
    sl('concept', 'What is a recurring deposit?', { b: 'A **recurring deposit** account collects a fixed **monthly instalment** $P$ for $n$ months. The bank pays simple interest at $r\\%$ per annum and returns everything at **maturity**.', v: termsTable, n: 'In a recurring deposit, you choose a monthly instalment and a period, say twelve or twenty four months. You pay the same amount every month. The bank quotes a rate of interest per year. At the end of the period, called maturity, you get back all your instalments plus the interest. Learn the letters: P, n, r and I.' }),
    sl('diagram', 'Each instalment stays a different time', { b: 'For ₹$500$ a month for $6$ months, the first instalment is in the bank for all $6$ months, the last for only $1$.', v: earnTable, n: 'Here is the key idea. The first instalment is paid in month one and stays for all six months. The second stays five months, and so on, down to the last, which stays just one month. So the money is not all in the bank for the whole period. Each instalment earns simple interest only for its own time.' }),
    sl('concept', 'Monthly balances: the principal for one month', { b: 'Add the balance at the end of every month. This sum earns interest for **one month**:', m: [r`P + 2P + \cdots + nP = P \times \frac{n(n+1)}{2}`], v: bal6, n: 'Another way to see it: look at the balance at the end of each month. It grows by one instalment every month. If we add up all these balances, we get a single sum that earns interest for just one month. For five hundred rupees over six months, the balances add up to ten thousand five hundred rupees.' }),
    sl('diagram', 'The interest formula', { b: 'Simple interest on the principal for one month, for $\\dfrac{1}{12}$ of a year, at $r\\%$:', m: [FORMULA], v: formulaFlow, n: 'Now we build the formula. The principal for one month is P times n times n plus one, over two. One month is one twelfth of a year. So we multiply by one twelfth, and by r over one hundred. That gives the interest formula used by the board. Remember that n is the number of months and r is the rate per year.' }),
    sl('example', 'Worked example 1: a six-month deposit', { b: 'Find the interest on ₹$500$ a month for $6$ months at $8\\%$ per annum.', ul: ['**Step 1 —** $P = 500$, $n = 6$, $r = 8$.', r`**Step 2 —** Principal for one month $= 500 \times \dfrac{6 \times 7}{2} = 10500$.`, r`**Step 3 —** $I = 10500 \times \dfrac{1}{12} \times \dfrac{8}{100} = 70$.`, `**Check —** $${Iline(500, 6, 8)}$ ✓. Interest ₹$70$.`], v: ex1Table, n: 'Write P, n and r first. The principal for one month is five hundred times twenty one, which is ten thousand five hundred rupees. One twelfth of a year at eight per cent gives seventy rupees. The full formula gives the same answer in one line. Notice how small the interest is compared with the three thousand rupees deposited.' }),
    sl('check', 'Quick check: the principal for one month', { b: 'Add the balances, or use $P \\times \\dfrac{n(n+1)}{2}$.', chk: 'm03', n: 'Find n times n plus one, halve it, and multiply by the monthly instalment.' }),
    sl('diagram', 'Changing the period into months', { b: 'The rate is per **annum** but $n$ is always in **months**. Useful values:', v: triTable, n: 'Before using the formula, always change the period into months. One and a half years is eighteen months, two years is twenty four, three years is thirty six. This table gives the value of n times n plus one over two for common periods. You will meet seventy eight, three hundred and six hundred and sixty six again and again.' }),
    sl('example', 'Worked example 2: one and a half years', { b: 'Ira pays ₹$800$ a month for $1.5$ years at $7\\%$ per annum. Find the interest.', ul: ['**Step 1 —** $n = 1.5 \\times 12 = 18$.', `**Step 2 —** Principal for one month $= ${Sline(800, 18)}$.`, `**Step 3 —** $${Iline(800, 18, 7)}$.`, '**Answer —** Ira earns ₹$798$ as interest.'], v: ex2Table, n: 'First, one and a half years becomes eighteen months. Then eighteen times nineteen over two is one hundred and seventy one. Multiply by eight hundred rupees for the principal for one month. Finally, take one twelfth of a year at seven per cent. Ira earns seven hundred and ninety eight rupees.' }),
    sl('check', 'Quick check: a two-year value', { b: 'Change the period into months first.', chk: 'fb1', n: 'Two years is how many months? Multiply that by the next whole number, then halve.' }),
    sl('example', 'Worked example 3: a rate with a decimal', { b: 'Find the interest on ₹$1250$ a month for $2$ years at $6.5\\%$ per annum.', ul: ['**Step 1 —** $n = 24$, so $\\dfrac{n(n+1)}{2 \\times 12} = \\dfrac{600}{24} = 25$.', `**Step 2 —** $${Iline(1250, 24, 6.5)}$.`, '**Answer —** The interest is ₹2,031.25.', '**Tip —** Keep the paise; do not round until the last step.'], v: ex3Table, n: 'Two years is twenty four months. A neat shortcut: twenty four times twenty five over twenty four is just twenty five. So the interest is twelve hundred and fifty, times twenty five, times six point five over one hundred. The answer has paise: two thousand and thirty one rupees and twenty five paise. Keep them.' }),
    sl('diagram', 'Interest grows faster than the period', { b: 'For ₹$1000$ a month at $6\\%$: $12$ months give ₹$390$, but $24$ months give ₹$1500$, almost four times as much.', v: intPlot, n: 'Look at the graph. If interest grew in proportion to the months, it would follow the straight line, and doubling the period would double the interest. But the curve bends upwards. With a longer deposit, there are more instalments, and the early ones stay longer. Twelve months earn three hundred and ninety rupees; twenty four months earn fifteen hundred.' }),
    sl('check', 'Quick check: doubling the period', { b: 'Does the interest double when the period doubles?', chk: 'tf2', n: 'Think about the graph. Compare n times n plus one for twelve and for twenty four months.' }),
    sl('example', 'Worked example 4: same deposits, different interest', { b: 'At $8\\%$ per annum, Ritu pays ₹$600$ a month for $24$ months and Kabir ₹$1200$ a month for $12$ months. Both deposit ₹14,400. Who earns more interest?', ul: [`**Ritu —** $${Iline(600, 24, 8)}$.`, `**Kabir —** $${Iline(1200, 12, 8)}$.`, '**Answer —** Ritu earns ₹$576$ more, because her money stays in the bank longer on average.'], v: ex4Table, n: 'Both friends deposit fourteen thousand four hundred rupees. Ritu spreads it over twenty four months and earns twelve hundred rupees. Kabir pays it in twelve months and earns only six hundred and twenty four. The difference is five hundred and seventy six rupees. The longer deposit wins, because its early instalments stay much longer.' }),
    sl('check', 'Quick check: ratio of interests', { b: 'Compare $n(n+1)$ for the two periods.', chk: 'm12', n: 'With the same instalment and rate, the interest depends only on n times n plus one. Work out both values and simplify the ratio.' }),
    sl('summary', 'Summary', { ul: ['A recurring deposit: fixed instalment $P$ every month for $n$ months', 'Principal for one month $= P \\times \\dfrac{n(n+1)}{2}$', `$${FORMULA}$`, '$n$ in months, $r$ per annum', 'Interest grows like $n(n+1)$'], v: sum1, n: 'To sum up part one. A recurring deposit collects equal monthly instalments. Each instalment earns simple interest only for the months it stays. Adding the monthly balances gives the principal for one month, and this leads to the interest formula. Always use n in months and r per year.' }),
    sl('exam-tips', 'Exam tips: how marks are awarded', { ul: ['**Interest (3 marks):** $n$ in months 1 + substitution in the formula 1 + answer 1', '**Show the formula** before substituting', '**Mistake:** putting $n = 2$ for two years', '**Mistake:** forgetting to halve $n(n+1)$', '**Mistake:** simple interest on the whole deposit for the whole period', '**Mistake:** rounding paise too early'], n: 'In the exam, write the formula first, then substitute with n in months. That line earns a mark even if the arithmetic slips. Watch out for three traps: using years for n, forgetting the two in the denominator, and charging interest on all the money for the whole period. Keep paise until the end.' }),
  ],
});
must(e4a.I - e4b.I === 576, 'e4 difference 576');

const d2 = deck({
  part: 2,
  title: 'Recurring deposits — Part 2: Maturity value and inverse problems',
  goals: ['Calculate the maturity value of a recurring deposit', 'Find the monthly instalment from the maturity value or the interest', 'Find the rate of interest', 'Find the number of months by solving a quadratic equation'],
  slides: [
    sl('title', 'Banking: Recurring Deposit Accounts, Part 2', { b: 'What do you get back, and how do you plan for a target amount?', v: mvPlot, n: 'Welcome to part two. At maturity the bank returns your instalments plus the interest. That total is the maturity value. We will calculate it, and then turn the question around: if you know what you want at the end, what instalment, rate or period do you need? These are the inverse problems the board loves to ask.' }),
    sl('concept', 'What you will be able to do', { ul: ['Find the **maturity value**', 'Find the **monthly instalment**', 'Find the **rate** of interest', 'Find the **number of months** from a quadratic', 'Check every answer by working forwards'], n: 'These are your goals for part two. The first is direct. The next three are inverse problems. Finding the instalment or the rate needs only a linear equation. Finding the number of months needs a quadratic equation, and you must choose the right root.' }),
    sl('concept', 'Maturity value', { b: 'At maturity the bank pays back every instalment and the interest:', m: [r`\text{MV} = P \times n + I`], v: mvFlow, n: 'The maturity value is simply the total you deposited, P times n, plus the interest I. So always find the interest first, using the formula from part one, and then add the deposits. Read the question carefully: sometimes it asks only for the interest, sometimes for the amount received at maturity.' }),
    sl('example', 'Worked example 1: a three-year deposit', { b: 'Find the maturity value of ₹$1500$ a month for $3$ years at $7.5\\%$ per annum.', ul: ['**Step 1 —** $n = 36$; deposits $= 1500 \\times 36 = 54000$.', `**Step 2 —** $${Iline(1500, 36, 7.5)}$.`, `**Step 3 —** $${MVline(1500, 36, 7.5)}$.`, '**Answer —** ₹60,243.75.'], v: f1Table, n: 'Three years is thirty six months, so the deposits total fifty four thousand rupees. The interest formula gives six thousand two hundred and forty three rupees and seventy five paise. Add the two to get the maturity value, sixty thousand two hundred and forty three rupees and seventy five paise.' }),
    sl('diagram', 'Deposits and maturity value side by side', { b: 'For ₹$1000$ a month at $6\\%$, the deposits grow evenly but the interest grows faster.', v: growTable, n: 'This table follows one deposit of a thousand rupees a month. Every six months, the deposits rise by six thousand rupees. The interest, though, rises faster each time: one hundred and five, then three hundred and ninety, then eight hundred and fifty five, and so on. Their sum is the maturity value.' }),
    sl('check', 'Quick check: a maturity value', { b: 'Interest first, then add the deposits.', chk: 'n07', n: 'Write n, find the interest with the formula, then add P times n.' }),
    sl('concept', 'Inverse problems: what is unknown?', { b: 'The same two formulas can be read backwards. Decide which quantity is unknown:', v: invFlow, n: 'In an inverse problem, the maturity value or the interest is given and something else is unknown. If the instalment or the rate is unknown, it appears only once, so the equation is linear. If the number of months is unknown, it appears as n and as n times n plus one, so the equation is quadratic.' }),
    sl('example', 'Worked example 2: finding the instalment', { b: 'A $2$-year deposit at $9\\%$ per annum matures to ₹31,500. Find the monthly instalment.', ul: f2.lines.map((x, i) => `**Step ${i + 1} —** ${x}`).concat(['**Answer —** ₹$1200$ a month.']), v: f2Table, n: 'Let the instalment be P. The interest is P times three hundred over twelve times nine over one hundred, which is two point two five P. The deposits are twenty four P. So the maturity value is twenty six point two five P. Divide thirty one thousand five hundred by twenty six point two five: the instalment is twelve hundred rupees.' }),
    sl('example', 'Worked example 3: finding the rate', { b: 'Zoya pays ₹$2000$ a month for $15$ months and receives ₹31,600. Find the rate.', ul: f3.lines.map((x, i) => `**Step ${i + 1} —** ${x}`).concat(['**Answer —** $8\\%$ per annum.']), v: f3Table, n: 'First take away the deposits: thirty thousand rupees. The interest is sixteen hundred rupees. Now write the interest formula with r unknown. Fifteen times sixteen over twenty four is ten, so the interest is two hundred r. Two hundred r equals sixteen hundred, so the rate is eight per cent per year.' }),
    sl('check', 'Quick check: find the rate', { b: 'Write the interest as a multiple of $r$.', chk: 'm08', n: 'Work out the interest on the deposit for a rate of one per cent. How many of those make the given interest?' }),
    sl('concept', 'Finding the number of months', { b: 'With $n$ unknown, the maturity value gives a **quadratic** in $n$:', m: [r`\text{MV} = Pn + P \times \frac{n(n+1)}{24} \times \frac{r}{100}`], v: f4Table, n: 'When the period is unknown, n appears twice: in the deposits, P times n, and in the interest, through n times n plus one. Expanding gives a quadratic equation. Make the coefficient of n squared equal to one, then factorise or use the quadratic formula. One root is always negative, and we reject it.' }),
    sl('example', 'Worked example 4: months from the maturity value', { b: 'A deposit of ₹$1200$ a month at $8\\%$ per annum matures to ₹18,960. For how many months?', ul: f4.lines.map((x, i) => `**Step ${i + 1} —** ${x}`), v: f4Table, n: 'Here P times r over twenty four hundred is four, so the interest is four n times n plus one. The equation becomes four n squared plus twelve hundred and four n minus eighteen thousand nine hundred and sixty equals zero. Divide by four and factorise. The roots are fifteen and minus three hundred and sixteen, so the deposit ran for fifteen months.' }),
    sl('check', 'Quick check: choose the root', { b: 'Factorise, then keep the sensible root.', chk: 'm11', n: 'Find two numbers that multiply to minus four hundred and twenty and add to one. Which root can be a number of months?' }),
    sl('example', 'Worked example 5: months from the interest', { b: 'A deposit of ₹$500$ a month at $10\\%$ per annum earns ₹$1150$ as interest. Find the number of months.', ul: f5.lines.map((x, i) => `**Step ${i + 1} —** ${x}`).concat(['**Answer —** $23$ months.']), v: f5Table, n: 'When only the interest is given, the deposits do not appear, so the equation is simpler. Make n times n plus one the subject: it equals five hundred and fifty two. Look for two consecutive whole numbers with that product: twenty three and twenty four. So the deposit ran for twenty three months.' }),
    sl('check', 'Quick check: both roots?', { b: 'Can a negative root be a period?', chk: 'tf5', n: 'Think about what n means in this chapter before deciding.' }),
    sl('diagram', 'Always check by working forwards', { b: 'Put each answer back into the formulas.', v: verifyTable, n: 'Inverse problems are easy to check. Put your answer back into the interest formula and the maturity value formula, and see whether you get the given amount. Each answer on this slide passes the check. In an exam, one line of checking can save you from losing marks for a slip in the algebra.' }),
    sl('summary', 'Summary', { ul: ['$\\text{MV} = P \\times n + I$', 'Instalment: write MV or $I$ as a multiple of $P$', 'Rate: $I = \\text{MV} - Pn$, then a multiple of $r$', 'Months: a quadratic in $n$; keep the positive whole-number root', 'Check by working forwards'], v: sum2, n: 'To sum up part two. The maturity value is the deposits plus the interest. To find the instalment or the rate, write everything as a multiple of the unknown and divide. To find the number of months, solve a quadratic and keep the positive whole-number root. Then check your answer by working forwards.' }),
    sl('exam-tips', 'Exam tips: how marks are awarded', { ul: ['**Maturity value (3 marks):** interest 2 + adding the deposits 1', '**Instalment or rate (3–4 marks):** equation 1–2 + solving 1 + answer 1', '**Months (4 marks):** equation in $n$ 1 + standard form 1 + factorising 1 + answer with the negative root rejected 1', '**Mistake:** forgetting to subtract the deposits before finding the rate', '**Mistake:** giving the interest when the maturity value is asked'], n: 'For a maturity value, most marks are for the interest, so show the formula. For the instalment or rate, write the equation clearly. For the number of months, the steps are: the equation, the standard form, the factorisation and the answer, with a word on why the negative root is rejected. Read whether the question wants the interest or the maturity value.' }),
  ],
});

// ---------------------------------------------------------------- notes
const notes = {
  unit: 'icse-10-mathematics-ch02', version: 1, title: 'Banking: Recurring Deposit Accounts — chapter notes', language: 'en',
  sections: [
    { heading: '1. How a recurring deposit works', body_md: r`In a **recurring deposit** (RD) account a depositor pays a fixed **monthly instalment** $P$ for a fixed number of months $n$. The bank pays **simple interest** at $r\%$ **per annum** on each instalment for the time it stays in the account, and returns the instalments with the interest at **maturity**.

- The 1st instalment earns interest for $n$ months, the 2nd for $n - 1$ months, …, the last for $1$ month.
- A recurring deposit suits people who can save a little every month rather than a lump sum.`, key_terms: [{ term: 'Recurring deposit', definition_md: 'A bank account into which a fixed sum is paid every month for a fixed number of months.' }, { term: 'Monthly instalment', definition_md: 'The fixed sum $P$ paid every month.' }, { term: 'Maturity', definition_md: 'The end of the period, when the bank pays back the instalments with the interest.' }], formulas: [], visual: rdFlow, visuals: [termsTable], topic_ids: [topic(1)] },
    { heading: '2. Monthly balances and the principal for one month', body_md: r`At the end of month $k$ the balance is $kP$. The sum of the balances,

$$P + 2P + \cdots + nP = P \times \frac{n(n+1)}{2},$$

earns simple interest for **one month**. It is called the principal for one month. *Example:* ₹$500$ a month for $6$ months: $500 \times 21 = 10500$.`, key_terms: [{ term: 'Principal for one month', definition_md: 'The sum of the monthly balances, $P \\times \\dfrac{n(n+1)}{2}$, which earns interest for one month.' }], formulas: [{ latex: 'P \\times \\frac{n(n+1)}{2}', label: 'Principal for one month' }], visual: bal6, visuals: [earnTable], topic_ids: [topic(1)] },
    { heading: '3. The interest formula', body_md: r`Simple interest on the principal for one month, for $\dfrac{1}{12}$ of a year at $r\%$:

$$I = P \times \frac{n(n+1)}{2 \times 12} \times \frac{r}{100}.$$

- $n$ is in **months** (1.5 years $= 18$, 2 years $= 24$, 3 years $= 36$); $r$ is per **annum**.
- *Example:* ₹$800$ a month for $18$ months at $7\%$: $I = 800 \times \dfrac{18 \times 19}{24} \times \dfrac{7}{100} = 798$.
- Keep paise: ₹$1250$ for $24$ months at $6.5\%$ gives ₹2,031.25.`, key_terms: [{ term: 'Rate per annum', definition_md: 'The yearly rate of interest $r\\%$; the formula converts one month to $\\dfrac{1}{12}$ of a year.' }], formulas: [{ latex: FORMULA, label: 'Interest on a recurring deposit' }], visual: formulaFlow, visuals: [triTable], topic_ids: [topic(1)] },
    { heading: '4. How the interest grows', body_md: r`With $P$ and $r$ fixed, the interest is proportional to $n(n+1)$, **not** to $n$. Doubling the period from $12$ to $24$ months multiplies $n(n+1)$ from $156$ to $600$: almost four times.

For the same total deposited, a longer deposit with smaller instalments earns more: ₹$600$ for $24$ months earns ₹$1200$ at $8\%$, ₹$1200$ for $12$ months only ₹$624$.`, key_terms: [], formulas: [{ latex: 'I \\propto n(n+1)', label: 'Growth with the period (P and r fixed)' }], visual: intPlot, visuals: [ex4Table], topic_ids: [topic(1)] },
    { heading: '5. Maturity value', body_md: r`The maturity value is the total deposited plus the interest:

$$\text{MV} = P \times n + I.$$

*Example:* ₹$1500$ a month for $3$ years at $7.5\%$: deposits $54000$, interest $6243.75$, maturity value ₹60,243.75. If the instalment is doubled (same $n$ and $r$), the maturity value doubles.`, key_terms: [{ term: 'Maturity value', definition_md: 'The amount paid at maturity: total of the instalments plus the interest.' }], formulas: [{ latex: '\\text{MV} = P \\times n + I', label: 'Maturity value' }], visual: mvPlot, visuals: [growTable], topic_ids: [topic(2)] },
    { heading: '6. Finding the instalment or the rate', body_md: r`- **Instalment:** write the interest as a multiple of $P$ (e.g. $n = 24$, $r = 9$: $I = 2.25P$), so $\text{MV} = 26.25P$; divide.
- **Rate:** first $I = \text{MV} - Pn$; then write $I$ as a multiple of $r$ (e.g. $P = 2000$, $n = 15$: $I = 200r$); divide.
- Answers often have paise or decimals (a rate of $6.5\%$); give them exactly.
- If an instalment must reach **at least** a target, round **up** to the next rupee.`, key_terms: [{ term: 'Inverse problem', definition_md: 'A problem in which the maturity value or interest is given and the instalment, rate or period is found.' }], formulas: [{ latex: 'P = \\frac{\\text{MV}}{n + \\frac{n(n+1)}{2 \\times 12} \\times \\frac{r}{100}}', label: 'Instalment from the maturity value' }, { latex: 'r = \\frac{I \\times 2400}{P \\times n(n+1)}', label: 'Rate from the interest' }], visual: invFlow, visuals: [f2Table, f3Table], topic_ids: [topic(3)] },
    { heading: '7. Finding the number of months', body_md: r`With $n$ unknown:

- **Interest given:** $n(n+1) = \dfrac{2400I}{Pr}$; find two consecutive whole numbers with this product.
- **Maturity value given:** $\text{MV} = Pn + \dfrac{Pr}{2400}\,n(n+1)$, a quadratic in $n$. Divide by the coefficient of $n^2$, factorise (or use the quadratic formula) and **reject the negative root**.

*Example:* ₹$1200$ a month at $8\%$ maturing to ₹18,960: $n^2 + 301n - 4740 = 0$, $(n - 15)(n + 316) = 0$, so $n = 15$.

Always check by working forwards.`, key_terms: [], formulas: [{ latex: 'n(n+1) = \\frac{2400\\,I}{P\\,r}', label: 'Months from the interest' }], visual: f4Table, visuals: [f5Table, verifyTable], topic_ids: [topic(3)] },
  ],
  exam_tips_md: r`**How marks are awarded**
- *Interest or maturity value (3 marks):* $n$ in months and the formula 1; substitution and interest 1; maturity value 1.
- *Instalment or rate (3–4 marks):* equation in $P$ or $r$ 1–2; solving 1; answer with units 1.
- *Number of months (4 marks):* equation 1; standard form 1; factorising 1; answer with the negative root rejected 1.
- *10-mark structured question:* parts (a), (b), (c) usually 3 + 3 + 4; show all working.

**Common mistakes**
1. Using years for $n$ (writing $n = 2$ for two years).
2. Forgetting to halve $n(n+1)$, or the $12$ in the denominator.
3. Simple interest on the whole deposit for the whole period.
4. Giving the interest when the maturity value is asked (or the reverse).
5. Finding the rate from the maturity value without first subtracting the deposits.
6. Keeping the negative root, or rounding an instalment down when a target must be reached.`,
  status: 'draft', provenance: d1.provenance,
};

// ---------------------------------------------------------------- flashcards
const fc = (id, front_md, back_md, tag, t) => ({ id, front_md, back_md, tag, topic_id: topic(t) });
const flashcards = {
  unit: 'icse-10-mathematics-ch02', version: 1, language: 'en',
  cards: [
    fc('f01', 'What is a **recurring deposit**?', 'An account in which a fixed sum is paid every month for a fixed number of months; the bank returns it with interest at maturity.', 'definition', 1),
    fc('f02', 'Interest on a recurring deposit?', `$${FORMULA}$`, 'formula', 1),
    fc('f03', 'In the formula, $n$ is…', 'the number of months (monthly instalments).', 'definition', 1),
    fc('f04', 'In the formula, $r$ is…', 'the rate of interest per cent **per annum**.', 'definition', 1),
    fc('f05', 'Principal for one month?', r`$P \times \dfrac{n(n+1)}{2}$: the sum of the monthly balances.`, 'formula', 1),
    fc('f06', 'Why does the formula have $\\dfrac{1}{12}$?', 'The principal for one month earns interest for one month, which is one twelfth of a year.', 'concept', 1),
    fc('f07', 'In a $10$-month deposit, for how long does the 1st instalment earn interest? The last?', '$10$ months; $1$ month.', 'fact', 1),
    fc('f08', 'Simple or compound interest on a recurring deposit?', 'Simple interest, on each instalment for its own months.', 'fact', 1),
    fc('f09', '$\\dfrac{n(n+1)}{2}$ for $1$ year, $2$ years, $3$ years?', '$78$, $300$, $666$', 'fact', 1),
    fc('f10', '$n$ for $1.5$ years? $2.5$ years?', '$18$; $30$', 'fact', 1),
    fc('f11', '₹$500$ a month, $6$ months, $8\\%$: interest?', '₹$70$ (principal for one month ₹10,500).', 'example', 1),
    fc('f12', 'Period doubled ($12 \\to 24$ months), same $P$ and $r$: interest?', 'Multiplied by $\\dfrac{600}{156} \\approx 3.85$, not $2$.', 'concept', 1),
    fc('f13', 'Same total deposited: longer period with smaller instalments, or shorter with larger?', 'The longer period earns more interest.', 'concept', 1),
    fc('f14', 'Most common mistake with the period?', 'Using years for $n$; change to months first.', 'exam-tip', 1),
    fc('f15', 'Picture: graph of interest against months. Shape?', 'A curve bending upwards, above the straight line through the 12-month value.', 'diagram', 1),
    fc('f16', 'Maturity value?', '$\\text{MV} = P \\times n + I$', 'formula', 2),
    fc('f17', 'What is the **maturity value**?', 'The total of the instalments plus the interest, paid at the end of the period.', 'definition', 2),
    fc('f18', 'Instalment doubled, same $n$ and $r$: maturity value?', 'Doubles.', 'concept', 2),
    fc('f19', '₹$1500$ a month, $3$ years, $7.5\\%$: maturity value?', '₹60,243.75', 'example', 2),
    fc('f20', 'Question asks for the "amount received". Interest or MV?', 'Maturity value: deposits plus interest.', 'exam-tip', 2),
    fc('f21', 'Instalment unknown: method?', 'Write MV (or $I$) as a multiple of $P$, then divide.', 'concept', 3),
    fc('f22', 'Rate unknown, MV given: first step?', 'Find the interest: $I = \\text{MV} - Pn$.', 'exam-tip', 3),
    fc('f23', 'Rate from the interest?', '$r = \\dfrac{2400\\,I}{P\\,n(n+1)}$', 'formula', 3),
    fc('f24', 'Months unknown, interest given: equation?', '$n(n+1) = \\dfrac{2400\\,I}{P\\,r}$', 'formula', 3),
    fc('f25', 'Months unknown, MV given: what kind of equation?', 'A quadratic in $n$; keep the positive whole-number root.', 'concept', 3),
    fc('f26', '$n^2 + n - 552 = 0$: number of months?', '$23$ (the root $-24$ is rejected).', 'example', 3),
    fc('f27', 'Why reject the negative root?', 'A number of monthly instalments must be a positive whole number.', 'exam-tip', 3),
    fc('f28', 'Need **at least** a target amount: round the instalment how?', 'Up, to the next whole rupee, and check.', 'exam-tip', 3),
    fc('f29', 'How do you check an inverse answer?', 'Work forwards: put it back into the interest and MV formulas.', 'exam-tip', 3),
    fc('f30', '₹$2000$ a month for $15$ months returns ₹31,600: rate?', '$8\\%$ per annum (interest ₹$1600 = 200r$).', 'example', 3),
  ],
  status: 'draft', provenance: d1.provenance,
};

// ---------------------------------------------------------------- release + tests
const release = {
  unit: 'icse-10-mathematics-ch02', version: 1, academic_year: '2026-27', created_at: '2026-11-01T00:00:00+05:30',
  decks: [d1, d2], notes, flashcards, questions: [],
  build: { run_id: null, checks: { syllabus: 'topics t01–t03 only (how a recurring deposit works and its interest by I = P × n(n + 1)/(2 × 12) × r/100; maturity value MV = P × n + I; inverse problems for the instalment, the rate and the number of months); the chapter lists no removed topics. All figures computed in src/fin.mjs with exact paise arithmetic (BigInt): interest by the formula and by summing the monthly balances term by term, maturity value, and every inverse answer re-checked forwards; each quadratic in n has a perfect-square discriminant and exactly one positive integer root.' } },
};
const tests = chapterTests('Banking: Recurring Deposit Accounts', {
  A: ['m04', 'm06', 'm09', 'ar3', 's302', 's303'],
  B: ['l01', 'l02'],
}, {
  A: ['m05', 'm07', 'm10', 'm14', 'm15', 'm17', 'ar4', 'ar5', 's401', 's403', 's405'],
  B: ['l03', 'l04', 'l05'],
});
build({ dir: DIR, release, testsSpec: tests });
