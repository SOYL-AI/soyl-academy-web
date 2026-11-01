// Build ICSE 10 Mathematics ch03 Shares and Dividends. Run from platform/:
//   npx tsx content/authored/maths/icse-10-mathematics-ch03/src/build.mjs
// Every figure on the slides, in the notes and in the tables is computed with fin.mjs (exact rational arithmetic)
// and the values quoted in text are asserted against it before anything is written.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, topic, deck, sl, table, flow, plot, build, chapterTests, r } from './lib.mjs';
import { invest, marketValue, quote, dps, income, sharesFor, sharesForIncome, returnPct, mvForReturn, rateForReturn, sellReinvest, proceeds } from './fin.mjs';
import { Nline, INVline, DPSline, INCline, RETline, RETshare, PROCline, MVpctLine, buyLines, sellLines, incomeTargetLines, mvForReturnLines, rateForReturnLines, tm, rs } from './work.mjs';

setUnit('icse-10-mathematics-ch03');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const must = (cond, msg) => { if (!cond) throw new Error(`worked example check failed: ${msg}`); };

// ---------------------------------------------------------------- worked-example figures (asserted)
// Part 1
const q10 = [10, 14, 8].map((m) => quote(10, m));
must(q10[0].status === 'par' && q10[1].status === 'premium' && q10[1].amount === 4 && q10[1].pct === 40 && q10[2].status === 'discount' && q10[2].amount === 2 && q10[2].pct === 20, 'par/premium/discount table');
const e1 = [marketValue(100, { premiumPct: 15 }), marketValue(50, { discount: 6 }), marketValue(25, { discountPct: 20 })];
must(e1.join() === '115,44,20', 'e1 quotes 115, 44, 20');
const e2 = invest({ n: 450, FV: 10, MV: 10, rate: 18 });
must(e2.dps === 1.8 && e2.income === 810, 'e2: 450 x 1.80 = 810');
const e3 = buyLines({ investment: 15600, FV: 100, MV: marketValue(100, { premium: 30 }), rate: 9 });
must(e3.v.MV === 130 && e3.v.n === 120 && e3.v.income === 1080, 'e3: 120 shares, 1080');
const e4MV = marketValue(50, { discountPct: 10 });
const e4 = buyLines({ investment: 22500, FV: 50, MV: e4MV, rate: 7.5 });
must(e4MV === 45 && e4.v.n === 500 && e4.v.dps === 3.75 && e4.v.income === 1875, 'e4: 500 shares, 1875');
const e5 = incomeTargetLines(2400, 20, 15, 32);
must(e5.n === 800 && invest({ n: 800, FV: 20, MV: 32, rate: 15 }).investment === 25600, 'e5: 800 shares, 25600');
const incPts = [50, 120, 200].map((n) => [n, income(n, 100, 9)]);
must(incPts.map((p) => p[1]).join() === '450,1080,1800' && income(120, 100, 12) === 1440, 'income plot points');
// Part 2
const f1 = buyLines({ investment: 20000, FV: 100, MV: 125, rate: 10, ret: true });
must(f1.v.n === 160 && f1.v.income === 1600 && f1.v.ret === 8 && returnPct(100, 10, 125) === 8, 'f1: return 8% both ways');
const f2a = returnPct(10, 12, 16), f2b = returnPct(100, 13, 160);
must(f2a === 7.5 && f2b === 8.125 && f2b > f2a, 'f2: B better');
const retPts = [80, 100, 120, 150].map((m) => [m, returnPct(100, 12, m)]);
must(retPts.map((p) => p[1]).join() === '15,12,10,8', 'return plot points');
for (const [m, y] of retPts) must(Math.abs(1200 / m - y) < 1e-12, `plot expression at ${m}`);
const f3 = sellLines({ n: 400, FV1: 10, rate1: 15, sellAt: 18, FV2: 50, MV2: 40, rate2: 12 });
must(f3.s.before === 600 && f3.s.proceeds === 7200 && f3.s.n2 === 180 && f3.s.after === 1080 && f3.s.change === 480, 'f3: +480');
const f3g = sellReinvest({ n: 400, FV1: 10, rate1: 15, sellAt: 18, FV2: 50, MV2: 40, rate2: 12, boughtAt: 12 });
must(f3g.gain === 2400 && f3g.cost === 4800 && f3g.change === 480, 'f3 gain 2400');
const f4a = mvForReturnLines(100, 9, 7.2), f4b = rateForReturnLines(10, 15, 8);
must(f4a.MV === 125 && f4b.rate === 12 && mvForReturn(100, 9, 7.2) === 125 && rateForReturn(10, 15, 8) === 12, 'f4: MV 125, rate 12');

// ---------------------------------------------------------------- visuals
const marketFlow = flow('LR', [['c', 'A company divides its capital into shares'], ['f', 'Each share has a face value printed on it'], ['m', 'Shares are bought and sold at the market value'], ['d', 'The company pays a dividend on the face value']], [['c', 'f'], ['f', 'm'], ['m', 'd']], 'Flow chart: a company divides its capital into shares; each share has a face value; shares are traded at the market value; the company pays a dividend as a percentage of the face value.', 'Two values for every share: face value and market value.');
const termsTable = table(['Term', 'Meaning'], [['Face (nominal) value, FV', 'the value printed on the share; fixed'], ['Market value, MV', 'the price at which the share is bought or sold today'], ['Dividend', 'the part of the profit paid on each share, as a per cent of the FV'], ['Investment', 'money spent buying shares $=$ number of shares $\\times$ MV'], ['Annual income', 'total dividend received in a year']], 'Table of terms: face or nominal value printed on the share; market value, the price today; dividend, paid as a per cent of the face value; investment, number of shares times market value; annual income, the total dividend for a year.', 'The language of shares.');
const parTable = table(['Market value of a ₹10 share', 'Quoted', 'Amount', 'Per cent of FV'], q10.map((q, i) => [`₹$${[10, 14, 8][i]}$`, q.status === 'par' ? 'at par' : `at a ${q.status}`, q.status === 'par' ? '—' : `₹$${tm(q.amount)}$`, q.status === 'par' ? '—' : `$${q.pct}\\%$`]), 'Table for a ten rupee share: at a market value of 10 rupees it is at par; at 14 rupees it is at a premium of 4 rupees, 40 per cent; at 8 rupees it is at a discount of 2 rupees, 20 per cent.', 'Premium and discount per cent are taken on the face value.');
const e1Table = table(['Quote', 'Working', 'Market value'], [['₹100 share at a 15% premium', `$${MVpctLine(100, { premiumPct: 15 })}$`, '₹115'], ['₹50 share at ₹6 discount', '$\\text{MV} = 50 - 6 = 44$', '₹44'], ['₹25 share at a 20% discount', `$${MVpctLine(25, { discountPct: 20 })}$`, '₹20']], 'Working table: a 100 rupee share at a 15 per cent premium costs 115 rupees; a 50 rupee share at a 6 rupee discount costs 44 rupees; a 25 rupee share at a 20 per cent discount costs 20 rupees.', 'Read the quote carefully: rupees or per cent?');
const divFlow = flow('LR', [['f', 'Face value FV'], ['d', 'Dividend on one share $= \\text{FV} \\times \\dfrac{r}{100}$'], ['i', 'Annual income $=$ number of shares $\\times$ dividend on one share']], [['f', 'd', 'times r%'], ['d', 'i', 'times shares']], 'Flow: the face value times the rate of dividend gives the dividend on one share; times the number of shares gives the annual income.', 'The market value plays no part in the dividend.');
const e2Table = table(['Quantity', 'Value'], [['Shares held', '$450$'], ['Face value, rate', '₹$10$, $18\\%$'], ['Dividend on one share', `₹$${tm(e2.dps)}$`], ['Annual income', `₹$${tm(e2.income)}$`]], 'Working table: 450 shares of 10 rupees paying 18 per cent; the dividend on one share is 1 rupee 80 paise and the annual income is 810 rupees.', 'Income ₹810.');
const buyFlow = flow('LR', [['i', 'Investment (₹)'], ['n', 'Number of shares $= \\dfrac{\\text{investment}}{\\text{MV}}$'], ['a', 'Income $= n \\times \\text{FV} \\times \\dfrac{r}{100}$']], [['i', 'n', 'divide by MV'], ['n', 'a', 'dividend on FV']], 'Flow: divide the investment by the market value to get the number of shares, then find the income from the face value and the rate of dividend.', 'Buy at the market value; earn on the face value.');
const e3Table = table(['Quantity', 'Value'], [['Market value', '$100 + 30 = 130$'], ['Number of shares', `$\\dfrac{15600}{130} = ${e3.v.n}$`], ['Dividend on one share', `₹$${tm(e3.v.dps)}$`], ['Annual income', `₹$${tm(e3.v.income)}$`]], 'Working table: market value 130 rupees; 15600 divided by 130 gives 120 shares; each earns 9 rupees, so the income is 1080 rupees.', 'Income ₹1,080.');
const e4Table = table(['Quantity', 'Value'], [['Market value', `$${tm(e4MV)}$`], ['Number of shares', `$${e4.v.n}$`], ['Dividend on one share', `₹$${tm(e4.v.dps)}$`], ['Annual income', `₹$${tm(e4.v.income)}$`]], 'Working table: market value 45 rupees; 500 shares; each earns 3 rupees 75 paise, so the income is 1875 rupees.', 'Income ₹1,875.');
const incPlot = plot({ x: [0, 220], y: [0, 2700], xl: 'number of shares', yl: 'annual income (₹)', fns: [{ expr: '9*x', label: '₹100 shares paying 9%' }, { expr: '12*x', label: '₹100 shares paying 12%' }], pts: [...incPts.map(([n, y]) => [n, y, `(${n}, ${y})`]), [120, 1440, '(120, 1440)']] }, 'Graph of annual income against the number of 100 rupee shares held: a straight line for a 9 per cent dividend through 450 rupees at 50 shares, 1080 at 120 and 1800 at 200, and a steeper line for 12 per cent through 1440 rupees at 120 shares.', 'Income is proportional to the number of shares; the price paid does not change it.');
const e5Table = table(['Step', 'Result'], [['Dividend on one share', '$20 \\times \\dfrac{15}{100} = 3$'], ['Number of shares', `$\\dfrac{2400}{3} = ${e5.n}$`], ['Investment', `$${e5.n} \\times 32 = 25600$`]], 'Working table: each 20 rupee share earns 3 rupees; 2400 divided by 3 gives 800 shares; at 32 rupees each the investment is 25600 rupees.', 'Work backwards from the income.');
const sum1 = table(['Idea', 'Formula or fact'], [['Market value', 'FV $+$ premium, or FV $-$ discount'], ['Dividend on one share', '$\\text{FV} \\times \\dfrac{r}{100}$'], ['Number of shares', '$\\dfrac{\\text{investment}}{\\text{MV}}$ (a whole number)'], ['Annual income', '$n \\times \\text{FV} \\times \\dfrac{r}{100}$']], 'Summary table: market value is face value plus premium or minus discount; dividend on one share is face value times r over 100; number of shares is investment over market value; annual income is number of shares times face value times r over 100.', 'Part 1 in four lines.');

const pathFlow = flow('LR', [['b', 'Buy at the market value'], ['e', 'Earn dividend on the face value'], ['r', 'Return $= \\dfrac{\\text{income}}{\\text{investment}} \\times 100$'], ['s', 'Sell and reinvest?']], [['b', 'e'], ['e', 'r'], ['r', 's']], 'Flow: buy shares at the market value, earn dividend on the face value, measure the return as income over investment times 100, then decide whether to sell and reinvest.', 'From buying to reinvesting.');
const retFlow = flow('LR', [['d', 'Dividend on one share'], ['m', 'Market value of one share'], ['p', 'Return $= \\dfrac{\\text{dividend on one share}}{\\text{MV}} \\times 100$']], [['d', 'p', 'divide'], ['m', 'p', 'by']], 'Flow: the return per cent is the dividend on one share divided by the market value of one share, times 100; it equals the total income over the total investment times 100.', 'One share tells you the return on the whole investment.');
const f1Table = table(['Route', 'Working', 'Return'], [['Whole investment', `$${RETline(1600, 20000)}$`, '$8\\%$'], ['One share', `$${RETshare(100, 10, 125)}$`, '$8\\%$']], 'Table showing the return by two routes: 1600 rupees of income on 20000 rupees invested is 8 per cent; 10 rupees of dividend on a 125 rupee share is also 8 per cent.', 'Both routes give $8\\%$.');
const retPlot = plot({ x: [60, 200], y: [0, 22], xl: 'market value (₹)', yl: 'return (%)', fns: [{ expr: '1200/x', label: 'return on ₹100 shares paying 12%' }], pts: retPts.map(([m, y]) => [m, y, `(${m}, ${y})`]) }, 'Graph of the percentage return on a 100 rupee share paying 12 per cent against its market value: a falling curve through 15 per cent at 80 rupees, 12 per cent at par, 10 per cent at 120 rupees and 8 per cent at 150 rupees.', 'Above par the return is below $12\\%$; below par it is above.');
const f2Table = table(['', 'Company A', 'Company B'], [['Face value, price', '₹$10$, ₹$16$', '₹$100$, ₹$160$'], ['Rate of dividend', '$12\\%$', '$13\\%$'], ['Dividend on one share', '₹$1.20$', '₹$13$'], ['Return', `$${f2a}\\%$`, `$${f2b}\\%$`]], 'Comparison table: company A, 10 rupee shares at 16 rupees paying 12 per cent, returns 7.5 per cent; company B, 100 rupee shares at 160 rupees paying 13 per cent, returns 8.125 per cent.', 'B is the better investment.');
const invFlow = flow('TB', [['q', 'Return $= \\dfrac{\\text{FV} \\times r}{\\text{MV}}$'], ['m', 'Unknown MV: $\\text{MV} = \\dfrac{\\text{FV} \\times r}{\\text{return}}$'], ['r', 'Unknown rate: $r = \\dfrac{\\text{return} \\times \\text{MV}}{\\text{FV}}$'], ['c', 'Check by working forwards']], [['q', 'm'], ['q', 'r'], ['m', 'c'], ['r', 'c']], 'Decision chart: the return equals face value times rate over market value; rearrange for the market value or for the rate, then check by working forwards.', 'One formula, read three ways.');
const f4Table = table(['Problem', 'Working', 'Answer'], [['₹100 share, 9%, return 7.2%', '$\\text{MV} = \\dfrac{9 \\times 100}{7.2}$', '₹$125$'], ['₹10 share at ₹15, return 8%', '$r = \\dfrac{1.20 \\times 100}{10}$', '$12\\%$']], 'Table of two inverse problems: a 100 rupee share paying 9 per cent gives 7.2 per cent at a price of 125 rupees; a 10 rupee share at 15 rupees giving 8 per cent must pay a 12 per cent dividend.', 'Find the dividend on one share first.');
const sellFlow = flow('LR', [['o', 'Old shares $\\times$ selling price'], ['p', 'Sale proceeds'], ['n', 'New shares $= \\dfrac{\\text{proceeds}}{\\text{new MV}}$'], ['i', 'New income'], ['c', 'Change $=$ new income $-$ old income']], [['o', 'p'], ['p', 'n'], ['n', 'i'], ['i', 'c']], 'Flow: old shares times the selling price give the sale proceeds; divided by the new market value they give the new number of shares; their dividend is the new income; subtract the old income for the change.', 'Selling and reinvesting in five steps.');
const f3Table = table(['Step', 'Result'], [['Old income', `$400 \\times 1.50 = ${tm(f3.s.before)}$`], ['Sale proceeds', `$400 \\times 18 = ${tm(f3.s.proceeds)}$`], ['New shares', `$\\dfrac{7200}{40} = ${f3.s.n2}$`], ['New income', `$180 \\times 6 = ${tm(f3.s.after)}$`], ['Change', `$+${tm(f3.s.change)}$`]], 'Working table: old income 600 rupees; sale proceeds 7200 rupees; 180 new shares; new income 1080 rupees; an increase of 480 rupees.', 'Income rises by ₹480.');
const gainTable = table(['Question', 'Uses', 'Value'], [['Gain on the sale', 'selling price $-$ buying price, per share', `$400 \\times (18 - 12) = ${tm(f3g.gain)}$`], ['Change in yearly income', 'new dividend $-$ old dividend', `$1080 - 600 = ${tm(f3g.change)}$`]], 'Table contrasting two questions about the same sale: the gain on the sale uses the selling and buying prices, 400 times 6 is 2400 rupees; the change in yearly income uses dividends, 1080 minus 600 is 480 rupees.', 'Gain and change in income are different questions.');
const sum2 = table(['Idea', 'Formula or fact'], [['Return %', '$\\dfrac{\\text{income}}{\\text{investment}} \\times 100 = \\dfrac{\\text{FV} \\times r}{\\text{MV}}$'], ['Compare', 'the higher return is the better investment'], ['Inverse', 'rearrange the return formula for MV or $r$'], ['Reinvest', 'proceeds $\\div$ new MV; new income $-$ old income']], 'Summary table: return per cent is income over investment times 100, which equals face value times rate over market value; compare returns; rearrange for the market value or the rate; for reinvesting divide the proceeds by the new market value and subtract the incomes.', 'Part 2 in four lines.');

// ---------------------------------------------------------------- decks
const d1 = deck({
  part: 1,
  title: 'Shares and Dividends — Part 1: Shares, dividend and income',
  goals: ['Use the terms face value, market value, premium, discount and dividend', 'Find the market value of a share quoted at a premium or a discount', 'Find the number of shares bought for an investment', 'Calculate the dividend on one share and the annual income'],
  slides: [
    sl('title', 'Shares and Dividends, Part 1', { b: 'Own a small part of a company and share its profit.', v: marketFlow, n: 'Welcome to shares and dividends. When a company needs money, it divides its capital into many small parts called shares. People who buy shares own a little of the company, and each year the company may share its profit with them as a dividend. In this part we learn the language of shares and work out the income they bring.' }),
    sl('concept', 'What you will be able to do', { ul: ['Use **face value**, **market value**, **premium**, **discount** and **dividend**', 'Find the market value from a quote', 'Find the **number of shares** bought for a sum of money', 'Find the **dividend** on one share and the **annual income**'], n: 'These are your goals for part one. Every share has two values, and most mistakes in this chapter come from mixing them up. By the end you will know which value to use for the price and which to use for the dividend.' }),
    sl('concept', 'Two values for every share', { b: 'The **face value** (nominal value) is printed on the share and never changes. The **market value** is today\'s price.', v: termsTable, n: 'Every share has a face value, also called the nominal value. It is printed on the share certificate and stays fixed. The market value is the price at which the share is bought and sold today, and it changes with demand. The dividend is always a percentage of the face value. The investment is the money spent at the market value.' }),
    sl('diagram', 'At par, at a premium, at a discount', { b: 'Compare the market value with the face value:', ul: ['MV $=$ FV: **at par**', 'MV $>$ FV: **at a premium**', 'MV $<$ FV: **at a discount**'], v: parTable, n: 'If the market value equals the face value, the share is at par. If it is higher, the share is at a premium; if lower, at a discount. A ten rupee share selling at fourteen rupees is at a premium of four rupees, which is forty per cent of the face value. At eight rupees, it is at a discount of two rupees, or twenty per cent.' }),
    sl('example', 'Worked example 1: reading a quote', { b: 'Find the market value of: (a) a ₹100 share at a 15% premium (b) a ₹50 share at ₹6 discount (c) a ₹25 share at a 20% discount.', ul: [`**(a) —** $${MVpctLine(100, { premiumPct: 15 })}$`, '**(b) —** $\\text{MV} = 50 - 6 = 44$', `**(c) —** $${MVpctLine(25, { discountPct: 20 })}$`, '**Tip —** A per cent premium or discount is a per cent of the face value.'], v: e1Table, n: 'For part a, fifteen per cent of one hundred is fifteen, so the market value is one hundred and fifteen rupees. For part b, the discount is given in rupees, so simply subtract: forty four rupees. For part c, twenty per cent of twenty five is five, so the share sells for twenty rupees. Always check whether the quote is in rupees or as a per cent.' }),
    sl('check', 'Quick check: par, premium or discount?', { b: 'Compare the market value with the face value.', chk: 'm01', n: 'Is the market price above, equal to or below the printed value?' }),
    sl('concept', 'Dividend is paid on the face value', { b: 'A company declares a dividend of $r\\%$. Each share earns $r\\%$ of its **face value**, whatever its price:', m: [r`\text{Annual income} = n \times \text{FV} \times \frac{r}{100}`], v: divFlow, n: 'This is the most important rule in the chapter. The dividend is a percentage of the face value, never of the market value. So a ten rupee share paying twelve per cent earns one rupee twenty paise, whether you paid eight rupees or twenty for it. Multiply the dividend on one share by the number of shares to get the annual income.' }),
    sl('example', 'Worked example 2: dividend and income', { b: 'Meena holds 450 shares of ₹10 each in the imagined Sahyadri Textiles Ltd, which declares an 18% dividend. Find her annual income.', ul: [`**Step 1 —** $${DPSline(10, 18)}$.`, `**Step 2 —** $${INCline(450, 10, 18)}$.`, '**Answer —** Meena receives ₹810 a year.'], v: e2Table, n: 'First, the dividend on one share: eighteen per cent of ten rupees is one rupee eighty paise. Then multiply by four hundred and fifty shares. Meena receives eight hundred and ten rupees a year. Notice that we did not need the market value at all.' }),
    sl('check', 'Quick check: dividend on one share', { b: 'Use the face value, not the price.', chk: 'fb1', n: 'Take the rate of dividend as a percentage of the face value of one share.' }),
    sl('concept', 'Buying shares: how many?', { b: 'Shares are bought at the **market value**, and only whole shares can be bought:', m: [r`\text{Number of shares} = \frac{\text{investment}}{\text{MV}}, \qquad \text{investment} = n \times \text{MV}`], v: buyFlow, n: 'When you buy shares, you pay the market value for each one. So the number of shares is the money invested divided by the market value. Turn it around and the investment is the number of shares times the market value. In this chapter every problem gives a whole number of shares.' }),
    sl('example', 'Worked example 3: shares at a premium', { b: 'Arjun invests ₹15,600 in ₹100 shares of the imagined Coromandel Chemicals Ltd at a premium of ₹30. The dividend is 9%. Find his annual income.', ul: ['**Step 1 —** $\\text{MV} = 100 + 30 = 130$.', `**Step 2 —** ${e3.lines[0]}`, `**Step 3 —** ${e3.lines[1]}`, '**Answer —** ₹1,080 a year.'], v: e3Table, n: 'The premium is thirty rupees, so each share costs one hundred and thirty. Dividing fifteen thousand six hundred by one hundred and thirty gives one hundred and twenty shares. Each share earns nine per cent of one hundred, which is nine rupees. So Arjun receives one thousand and eighty rupees a year.' }),
    sl('check', 'Quick check: number of shares', { b: 'Divide by the price paid.', chk: 'm05', n: 'Which value do you divide the money by: the face value or the market value?' }),
    sl('example', 'Worked example 4: shares at a discount', { b: 'Sara invests ₹22,500 in ₹50 shares of the imagined Coromandel Chemicals Ltd at a 10% discount, paying 7.5%. Find her income.', ul: [`**Step 1 —** $${MVpctLine(50, { discountPct: 10 })}$.`, `**Step 2 —** ${e4.lines[0]}`, `**Step 3 —** ${e4.lines[1]}`, '**Answer —** ₹1,875 a year.'], v: e4Table, n: 'Ten per cent of fifty is five, so the shares cost forty five rupees each. Twenty two thousand five hundred divided by forty five is five hundred shares. Seven and a half per cent of fifty rupees is three rupees seventy five paise. Five hundred times that is one thousand eight hundred and seventy five rupees.' }),
    sl('diagram', 'Income grows with the number of shares', { b: 'For ₹100 shares paying 9%, every share adds ₹9 to the income, at any price.', v: incPlot, n: 'The graph shows annual income against the number of shares held. Each hundred rupee share paying nine per cent adds nine rupees, so the graph is a straight line through the origin. A higher rate of dividend gives a steeper line. The market value does not appear: it changes how much you pay, not what you earn.' }),
    sl('example', 'Worked example 5: working back from the income', { b: 'How many ₹20 shares of the imagined Coromandel Chemicals Ltd, paying 15%, give an income of ₹2,400? What do they cost at ₹32 each?', ul: e5.lines.map((x, i) => `**Step ${i + 1} —** ${x}`).concat(['**Answer —** 800 shares, costing ₹25,600.']), v: e5Table, n: 'Work backwards. Each twenty rupee share earns fifteen per cent, which is three rupees. To earn two thousand four hundred rupees you need two thousand four hundred divided by three, that is eight hundred shares. At thirty two rupees each, they cost twenty five thousand six hundred rupees.' }),
    sl('check', 'Quick check: true or false?', { b: 'Which value is the dividend worked out on?', chk: 'tf2', n: 'Decide whether the statement is true or false, and say why.' }),
    sl('summary', 'Summary', { ul: ['Face value is fixed; market value is today\'s price', 'Premium: MV above FV; discount: MV below FV', 'Number of shares $= \\dfrac{\\text{investment}}{\\text{MV}}$', 'Dividend on one share $= \\text{FV} \\times \\dfrac{r}{100}$', 'Income $=$ shares $\\times$ dividend on one share'], v: sum1, n: 'To sum up part one. Every share has a fixed face value and a changing market value. You buy at the market value, so divide the investment by it to count the shares. The dividend is a percentage of the face value, and the income is the number of shares times the dividend on one share.' }),
    sl('exam-tips', 'Exam tips: how marks are awarded', { ul: ['**Number of shares and income (3 marks):** MV 1 + number of shares 1 + income 1', '**State** which value you use: MV for buying, FV for dividend', '**Mistake:** dividend as a per cent of the market value', '**Mistake:** dividing the investment by the face value', '**Mistake:** a per cent premium taken on the market value'], n: 'In the exam, write the market value first, then the number of shares, then the income. Each line usually earns a mark. Watch for three traps: working out the dividend on the market value, dividing the investment by the face value, and taking a per cent premium on the wrong value.' }),
  ],
});

const d2 = deck({
  part: 2,
  title: 'Shares and Dividends — Part 2: Return, comparison and reinvesting',
  goals: ['Calculate the percentage return on an investment in shares', 'Compare two share investments by their returns', 'Find the price or the rate of dividend for a given return', 'Solve problems where shares are sold and the money reinvested'],
  slides: [
    sl('title', 'Shares and Dividends, Part 2', { b: 'Is a higher dividend always the better buy?', v: pathFlow, n: 'Welcome to part two. A high rate of dividend looks attractive, but if the share is expensive the money invested earns less. In this part we measure the return on the money invested, compare investments fairly, and follow an investor who sells one set of shares and buys another.' }),
    sl('concept', 'What you will be able to do', { ul: ['Find the **percentage return** on an investment', '**Compare** two investments', 'Find the **price** or the **rate** for a given return', 'Solve **selling and reinvesting** problems', 'Find the **change in income**'], n: 'These are your goals for part two. Everything rests on one idea: the return is the income as a percentage of the money invested. Once you can find it, comparing, working backwards and reinvesting all follow.' }),
    sl('concept', 'Rate of return', { b: 'The **return** is the yearly income as a per cent of the money invested. It can be found from one share:', m: [r`\text{Return} = \frac{\text{income}}{\text{investment}} \times 100 = \frac{\text{FV} \times r}{\text{MV}}\,\%`], v: retFlow, n: 'The rate of dividend is a percentage of the face value. The return, also called the yield, is a percentage of the money you actually paid. Divide the income by the investment and multiply by one hundred. Because every share is the same, you get the same answer from one share: its dividend divided by its market value, times one hundred.' }),
    sl('example', 'Worked example 1: return by two routes', { b: 'Kabir invests ₹20,000 in ₹100 shares of the imagined Coromandel Chemicals Ltd at ₹125, paying 10%. Find his percentage return.', ul: f1.lines.map((x, i) => `**Step ${i + 1} —** ${x}`).concat([`**Check —** $${RETshare(100, 10, 125)}$ ✓.`]), v: f1Table, n: 'Twenty thousand rupees buys one hundred and sixty shares at one hundred and twenty five. Each earns ten rupees, so the income is one thousand six hundred. As a percentage of twenty thousand, that is eight per cent. The quick check with one share agrees: ten rupees on one hundred and twenty five is eight per cent.' }),
    sl('diagram', 'Price and return', { b: 'For ₹100 shares paying 12%, a higher price means a lower return:', v: retPlot, n: 'This graph follows one share paying twelve per cent on a face value of one hundred. Bought at par, it returns exactly twelve per cent. Bought at a premium, say one hundred and fifty, it returns only eight. Bought at a discount, say eighty, it returns fifteen. So a premium lowers the return and a discount raises it.' }),
    sl('check', 'Quick check: percentage return', { b: 'Dividend on one share over its price.', chk: 'm08', n: 'Find the dividend on one share from the face value, then divide by the price paid.' }),
    sl('example', 'Worked example 2: which is better?', { b: 'Compare: A, ₹10 shares at ₹16 paying 12%; B, ₹100 shares at ₹160 paying 13% (both imagined companies).', ul: [`**A —** $${RETshare(10, 12, 16)}$.`, `**B —** $${RETshare(100, 13, 160)}$.`, '**Answer —** B is the better investment: it returns more on every rupee invested.'], v: f2Table, n: 'To compare, find the return on each. Company A earns one rupee twenty on a sixteen rupee share, which is seven and a half per cent. Company B earns thirteen rupees on one hundred and sixty, which is eight point one two five per cent. B gives more on every rupee invested, so B is better.' }),
    sl('check', 'Quick check: compare two shares', { b: 'Compare returns, not rates of dividend.', chk: 'm10', n: 'Work out the return on each share and choose the larger.' }),
    sl('concept', 'Working backwards', { b: 'The return formula can be read backwards for the price or the rate:', m: [r`\text{MV} = \frac{\text{FV} \times r}{\text{return}}, \qquad r = \frac{\text{return} \times \text{MV}}{\text{FV}}`], v: invFlow, n: 'Sometimes the return is given and something else is unknown. If the price is unknown, divide the dividend on one share by the return and multiply by one hundred. If the rate of dividend is unknown, find what each share must earn at the given price, then express that as a percentage of the face value.' }),
    sl('example', 'Worked example 3: price and rate for a return', { b: '(a) At what price do ₹100 shares paying 9% return 7.2%? (b) What rate must ₹10 shares at ₹15 pay to return 8%?', ul: [...part2('(a)', f4a.lines), ...part2('(b)', f4b.lines)], v: f4Table, n: 'For part a, each share earns nine rupees. Nine rupees must be seven point two per cent of the price, so the price is nine times one hundred, divided by seven point two, which is one hundred and twenty five. For part b, eight per cent of fifteen rupees is one rupee twenty, and that is twelve per cent of the face value.' }),
    sl('concept', 'Selling and reinvesting', { b: 'Sell at the **current** market value; buy the new shares at **their** market value; dividends are on face values.', v: sellFlow, n: 'An investor may sell shares and put the money into another company. Sell at the current price to get the proceeds. Divide the proceeds by the new market value to find the new number of shares. Their dividend is the new income. The change in income is the new income minus the old.' }),
    sl('example', 'Worked example 4: a change in income', { b: 'Riya holds 400 ₹10 shares of an imagined company paying 15%. She sells them at ₹18 and buys ₹50 shares of another imagined company at ₹40 paying 12%. Find the change in her income.', ul: f3.lines.map((x, i) => `**Step ${i + 1} —** ${x}`), v: f3Table, n: 'Before the sale, four hundred shares earn one rupee fifty each: six hundred rupees. Selling at eighteen gives seven thousand two hundred rupees. That buys one hundred and eighty shares at forty. Each earns twelve per cent of fifty, that is six rupees, so the new income is one thousand and eighty. Her income rises by four hundred and eighty rupees.' }),
    sl('check', 'Quick check: change in income', { b: 'Old income, proceeds, new shares, new income.', chk: 'n05', n: 'Follow the five steps: old income, sale proceeds, new shares, new income, and the difference.' }),
    sl('diagram', 'Gain on the sale or change in income?', { b: 'If Riya had bought her shares at ₹12, two different questions have two different answers:', v: gainTable, n: 'Read the question carefully. The gain on the sale compares the selling price with the buying price: four hundred shares times six rupees is two thousand four hundred. The change in income compares yearly dividends: one thousand and eighty minus six hundred is four hundred and eighty. Do not mix them up.' }),
    sl('check', 'Quick check: true or false?', { b: 'Does a higher rate of dividend guarantee more income?', chk: 'tf5', n: 'Think about the price of the new shares before you decide.' }),
    sl('summary', 'Summary', { ul: ['Return $= \\dfrac{\\text{income}}{\\text{investment}} \\times 100 = \\dfrac{\\text{FV} \\times r}{\\text{MV}}$', 'Premium lowers the return; discount raises it', 'The better investment has the higher return', 'Sell at the current price; buy at the new price', 'Change in income $=$ new income $-$ old income'], v: sum2, n: 'To sum up part two. The return is the income as a percentage of the money invested, and one share is enough to find it. Compare investments by their returns. The same formula, read backwards, gives the price or the rate. When reinvesting, follow the money from the sale to the new shares and compare the incomes.' }),
    sl('exam-tips', 'Exam tips: how marks are awarded', { ul: ['**Return (2–3 marks):** dividend on one share 1 + division by MV 1 + answer with per cent 1', '**Comparison (3–4 marks):** both returns 2 + conclusion with reason 1–2', '**Reinvesting (4 marks):** old income 1 + proceeds and new shares 1 + new income 1 + change 1', '**Mistake:** choosing the higher rate of dividend instead of the higher return', '**Mistake:** confusing the gain on a sale with the change in income'], n: 'For a return, show the dividend on one share and divide by the price. For a comparison, find both returns and state the better one with a reason. A reinvesting question usually has four step marks: old income, proceeds and new shares, new income, and the change. Two traps: picking the higher rate of dividend, and mixing up the gain with the change in income.' }),
  ],
});
function part2(label, lines) { return [`**${label} —** ${lines.join(' ')}`]; }

// ---------------------------------------------------------------- notes
const notes = {
  unit: 'icse-10-mathematics-ch03', version: 1, title: 'Shares and Dividends — chapter notes', language: 'en',
  sections: [
    { heading: '1. Shares and their two values', body_md: r`A company divides its capital into **shares**. A shareholder owns part of the company and may receive part of its profit as a **dividend**.

- **Face value (nominal value, FV):** printed on the share; it never changes.
- **Market value (MV):** the price at which the share is bought or sold today; it changes with demand.
- Brokerage and fractional shares are not in the ICSE 2027 syllabus: every problem here buys a whole number of shares and pays no brokerage.`, key_terms: [{ term: 'Share', definition_md: 'One of the equal parts into which a company divides its capital.' }, { term: 'Face value', definition_md: 'The value printed on a share (also called the nominal value); dividends are worked out on it.' }, { term: 'Market value', definition_md: 'The price of a share in the market on a given day.' }], formulas: [], visual: marketFlow, visuals: [termsTable], topic_ids: [topic(1)] },
    { heading: '2. At par, at a premium, at a discount', body_md: r`- MV $=$ FV: the share is **at par**.
- MV $>$ FV: **at a premium**; premium $=$ MV $-$ FV.
- MV $<$ FV: **at a discount**; discount $=$ FV $-$ MV.
- A premium or discount **per cent** is a per cent of the **face value**: a ₹50 share at a 16% premium costs $50 + 8 = 58$.`, key_terms: [{ term: 'Premium', definition_md: 'The amount by which the market value exceeds the face value.' }, { term: 'Discount', definition_md: 'The amount by which the market value falls short of the face value.' }, { term: 'At par', definition_md: 'Market value equal to the face value.' }], formulas: [{ latex: '\\text{MV} = \\text{FV} + \\text{premium} \\quad\\text{or}\\quad \\text{MV} = \\text{FV} - \\text{discount}', label: 'Market value from a quote' }], visual: parTable, visuals: [e1Table], topic_ids: [topic(1)] },
    { heading: '3. Dividend and annual income', body_md: r`The dividend is declared as a rate $r\%$ of the **face value**, whatever price the shareholder paid.

$$\text{Dividend on one share} = \text{FV} \times \frac{r}{100}, \qquad \text{Annual income} = n \times \text{FV} \times \frac{r}{100}.$$

*Example:* 450 shares of ₹10 at 18%: $450 \times 1.80 = 810$. Doubling the number of shares doubles the income; the market value does not affect it.`, key_terms: [{ term: 'Dividend', definition_md: 'The part of the profit a company pays on each share, as a per cent of its face value.' }, { term: 'Rate of dividend', definition_md: 'The per cent $r$ of the face value paid as dividend.' }], formulas: [{ latex: 'n \\times \\text{FV} \\times \\frac{r}{100}', label: 'Annual income' }], visual: divFlow, visuals: [e2Table, incPlot], topic_ids: [topic(2)] },
    { heading: '4. Investment and number of shares', body_md: r`Shares are bought at the **market value**:

$$\text{Number of shares} = \frac{\text{investment}}{\text{MV}}, \qquad \text{investment} = n \times \text{MV}.$$

- *Premium:* ₹15,600 in ₹100 shares at ₹130 buys 120 shares; at 9% the income is ₹1,080.
- *Discount:* ₹22,500 in ₹50 shares at ₹45 buys 500 shares; at 7.5% the income is ₹1,875.
- *Income given:* for ₹2,400 from ₹20 shares paying 15%, divide by the dividend on one share (₹3): 800 shares.`, key_terms: [{ term: 'Investment', definition_md: 'The money spent buying shares: number of shares $\\times$ market value.' }, { term: 'Annual income', definition_md: 'The total dividend received in a year.' }], formulas: [{ latex: '\\frac{\\text{investment}}{\\text{MV}}', label: 'Number of shares' }], visual: buyFlow, visuals: [e3Table, e4Table, e5Table], topic_ids: [topic(2)] },
    { heading: '5. Rate of return', body_md: r`The **return** (yield) is the income as a per cent of the money invested:

$$\text{Return} = \frac{\text{income}}{\text{investment}} \times 100 = \frac{\text{FV} \times r}{\text{MV}}\,\%.$$

- Bought **at par**: return $=$ rate of dividend.
- Bought **at a premium**: return $<$ rate of dividend.
- Bought **at a discount**: return $>$ rate of dividend.

*Example:* ₹100 shares at ₹125 paying 10% return $\dfrac{10}{125} \times 100 = 8\%$.`, key_terms: [{ term: 'Rate of return', definition_md: 'Annual income as a percentage of the sum invested; also called the yield.' }], formulas: [{ latex: '\\frac{\\text{income}}{\\text{investment}} \\times 100 = \\frac{\\text{FV} \\times r}{\\text{MV}}', label: 'Return per cent' }], visual: retPlot, visuals: [f1Table], topic_ids: [topic(3)] },
    { heading: '6. Comparing investments and working backwards', body_md: r`- The **better investment** is the one with the higher **return**, not the higher rate of dividend: ₹100 shares at ₹160 paying 13% (8.125%) beat ₹10 shares at ₹16 paying 12% (7.5%).
- With the same sum invested, the higher return gives the higher income.
- **Price for a return:** $\text{MV} = \dfrac{\text{FV} \times r}{\text{return}}$; e.g. 9% on ₹100 for 7.2% needs ₹125.
- **Rate for a return:** $r = \dfrac{\text{return} \times \text{MV}}{\text{FV}}$; e.g. ₹10 shares at ₹15 returning 8% pay 12%.`, key_terms: [{ term: 'Better investment', definition_md: 'Of two investments, the one with the higher percentage return.' }], formulas: [{ latex: '\\text{MV} = \\frac{\\text{FV} \\times r}{\\text{return}}', label: 'Price for a given return' }, { latex: 'r = \\frac{\\text{return} \\times \\text{MV}}{\\text{FV}}', label: 'Rate for a given return' }], visual: f2Table, visuals: [invFlow, f4Table], topic_ids: [topic(3)] },
    { heading: '7. Selling and reinvesting', body_md: r`1. Old income $=$ shares $\times$ dividend on one share.
2. Sale proceeds $=$ shares sold $\times$ **selling** price.
3. New shares $=$ proceeds $\div$ **new** market value.
4. New income from the new face value and rate.
5. Change in income $=$ new income $-$ old income.

The **gain or loss** on the sale (selling price $-$ buying price, per share) is a different question from the change in income. A higher rate of dividend does not guarantee a higher income: the new price matters.`, key_terms: [{ term: 'Sale proceeds', definition_md: 'The money received from selling shares: number sold $\\times$ selling price.' }, { term: 'Change in income', definition_md: 'New annual income minus old annual income after selling and reinvesting.' }], formulas: [{ latex: '\\text{new shares} = \\frac{\\text{proceeds}}{\\text{new MV}}', label: 'Reinvesting' }], visual: sellFlow, visuals: [f3Table, gainTable], topic_ids: [topic(4)] },
  ],
  exam_tips_md: r`**How marks are awarded**
- *Shares and income (3 marks):* market value 1; number of shares 1; income 1.
- *Return or comparison (3–4 marks):* dividend on one share 1; each return 1; conclusion with reason 1.
- *Selling and reinvesting (4 marks):* old income 1; proceeds and new shares 1; new income 1; change 1.
- *10-mark structured question:* parts (a), (b), (c) usually 3 + 3 + 4; show all working.

**Common mistakes**
1. Working out the dividend on the market value instead of the face value.
2. Dividing the investment by the face value instead of the market value.
3. Taking a per cent premium or discount on the market value.
4. Choosing the share with the higher rate of dividend instead of the higher return.
5. Selling at the old price, or buying the new shares at their face value.
6. Confusing the gain on a sale with the change in annual income.`,
  status: 'draft', provenance: d1.provenance,
};

// ---------------------------------------------------------------- flashcards
const fc = (id, front_md, back_md, tag, t) => ({ id, front_md, back_md, tag, topic_id: topic(t) });
const flashcards = {
  unit: 'icse-10-mathematics-ch03', version: 1, language: 'en',
  cards: [
    fc('f01', 'What is the **face value** of a share?', 'The value printed on the share (the nominal value); it does not change.', 'definition', 1),
    fc('f02', 'What is the **market value** of a share?', 'The price at which it is bought or sold today.', 'definition', 1),
    fc('f03', 'Share **at par**?', 'Market value equal to the face value.', 'definition', 1),
    fc('f04', 'Share **at a premium**?', 'Market value above the face value; premium $=$ MV $-$ FV.', 'definition', 1),
    fc('f05', 'Share **at a discount**?', 'Market value below the face value; discount $=$ FV $-$ MV.', 'definition', 1),
    fc('f06', 'A premium of 20% is 20% of which value?', 'The face value.', 'fact', 1),
    fc('f07', '₹50 share at a 16% premium: market value?', '₹58', 'example', 1),
    fc('f08', '₹10 share at ₹14: quoted how?', 'At a premium of ₹4, i.e. 40%.', 'example', 1),
    fc('f09', 'Picture: a ₹10 share at ₹8, ₹10, ₹14. Name each.', 'Discount; par; premium.', 'diagram', 1),
    fc('f10', 'Dividend is a per cent of…', 'the **face value**, never the market value.', 'fact', 2),
    fc('f11', 'Dividend on one share?', '$\\text{FV} \\times \\dfrac{r}{100}$', 'formula', 2),
    fc('f12', 'Annual income from $n$ shares?', '$n \\times \\text{FV} \\times \\dfrac{r}{100}$', 'formula', 2),
    fc('f13', 'Number of shares bought?', '$\\dfrac{\\text{investment}}{\\text{MV}}$', 'formula', 2),
    fc('f14', 'Investment for $n$ shares?', '$n \\times \\text{MV}$', 'formula', 2),
    fc('f15', '450 ₹10 shares at 18%: income?', '₹810', 'example', 2),
    fc('f16', 'Two people hold the same shares, bought at different prices. Incomes?', 'Equal: the income depends on the number of shares, the FV and the rate.', 'concept', 2),
    fc('f17', 'Income wanted, FV and rate known: number of shares?', 'Income wanted $\\div$ dividend on one share.', 'concept', 2),
    fc('f18', 'Most common mistake with the dividend?', 'Taking the rate on the market value.', 'exam-tip', 2),
    fc('f19', 'Rate of return?', '$\\dfrac{\\text{income}}{\\text{investment}} \\times 100 = \\dfrac{\\text{FV} \\times r}{\\text{MV}}$', 'formula', 3),
    fc('f20', 'Bought at a premium: return compared with the rate of dividend?', 'Less.', 'concept', 3),
    fc('f21', 'Bought at a discount: return compared with the rate of dividend?', 'More.', 'concept', 3),
    fc('f22', '₹100 shares at ₹125 paying 10%: return?', '8%', 'example', 3),
    fc('f23', 'Which of two shares is the better investment?', 'The one with the higher **return**, not the higher rate of dividend.', 'exam-tip', 3),
    fc('f24', 'Price for a given return?', '$\\text{MV} = \\dfrac{\\text{FV} \\times r}{\\text{return}}$', 'formula', 3),
    fc('f25', 'Picture: graph of return against market value. Shape?', 'A falling curve: the higher the price, the lower the return.', 'diagram', 3),
    fc('f26', 'Selling shares: proceeds?', 'Number sold $\\times$ selling price.', 'formula', 4),
    fc('f27', 'Reinvesting: new number of shares?', 'Proceeds $\\div$ market value of the new shares.', 'formula', 4),
    fc('f28', 'Change in income after reinvesting?', 'New annual income $-$ old annual income.', 'concept', 4),
    fc('f29', 'Gain on a sale vs change in income?', 'Gain uses buying and selling prices; change in income uses dividends.', 'exam-tip', 4),
    fc('f30', 'Does a higher rate of dividend always mean more income after reinvesting?', 'No: the new price may be high enough to give fewer, lower-earning shares.', 'concept', 4),
  ],
  status: 'draft', provenance: d1.provenance,
};

// ---------------------------------------------------------------- release + tests
const release = {
  unit: 'icse-10-mathematics-ch03', version: 1, academic_year: '2026-27', created_at: '2026-11-01T00:00:00+05:30',
  decks: [d1, d2], notes, flashcards, questions: [],
  build: { run_id: null, checks: { syllabus: 'topics t01–t04 only (face value, market value, par, premium, discount, dividend and rate of dividend; investment, number of shares and annual income = n × FV × r/100; rate of return = income/investment × 100 and comparing investments; selling and reinvesting and the change in income). Removed for ICSE 2027 (brokerage, fractional shares) appear only in one note; every problem buys a whole number of shares with no brokerage. All figures computed in src/fin.mjs with exact BigInt rational arithmetic: money must be a whole number of paise, shares a positive whole number; income and return are each found by two routes, and every inverse answer is re-checked forwards.' } },
};
const tests = chapterTests('Shares and Dividends', {
  A: ['m03', 'm06', 'm11', 'ar3', 's301', 's303'],
  B: ['l01', 'l02'],
}, {
  A: ['m04', 'm07', 'm12', 'm13', 'm16', 'm19', 'ar2', 'ar5', 's401', 's403', 's405'],
  B: ['l03', 'l04', 'l05'],
});
build({ dir: DIR, release, testsSpec: tests });
