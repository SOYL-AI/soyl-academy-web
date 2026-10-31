// Build ISC 12 Accounts ch02 Goodwill: Nature and Valuation. Run from platform/:
//   npx tsx content/authored/economics-commerce/isc-12-accounts-ch02/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';
import { nearDuplicates } from '../../../../../content-pipeline/src/originality/ngrams.ts';

setUnit('isc-12-accounts-ch02', 'economics-commerce');
const { BANK } = await import('./questions.mjs');
const { check, same, sum, inr, rs, rupees, words, numWords, average, normalise, stockError, weightedTable, capitalEmployed, balanceSheet, goodwillAll } = await import('./acc.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ================================================================ deck figures (computed, never typed)
// Part 1 opener: two imagined cycle-repair shops on one street, same capital, different profits.
const SHOPS = { capital: 400000, nrr: 15, a: 92000, b: 60000 };
const SHOPSnormal = same((SHOPS.capital * SHOPS.nrr) / 100, 60000, 'shops normal profit');
same(SHOPS.a - SHOPSnormal, 32000, 'shop A extra profit');

// WE2/WE3 Phulkari Looms (Patiala): normalised profits, simple and weighted average.
const PL = { years: ['2022-23', '2023-24', '2024-25', '2025-26'], profits: [186000, 168000, 264000, 258000], theft: 36000, vat: 30000, div: 18000, buy: 3 };
const PLn = normalise({
  years: PL.years,
  profits: PL.profits,
  adj: [
    { y: 1, label: 'abnormal loss added back', amount: PL.theft },
    { y: 2, label: 'gain on sale of dyeing vat deducted', amount: -PL.vat },
    { y: 3, label: 'dividend on non-trade investments deducted', amount: -PL.div },
  ],
});
same(PLn.total, 864000, 'PL normal total');
const PLavg = same(average(PLn.normal), 216000, 'PL average');
const PLgw = same(PLavg * PL.buy, 648000, 'PL goodwill simple');
const PLw = weightedTable(PL.years, PLn.normal, [1, 2, 3, 4]);
same(PLw.value, 225600, 'PL weighted average');
const PLgwW = same(PLw.value * PL.buy, 676800, 'PL goodwill weighted');

// Stock-error illustration: closing stock overvalued at the end of the first year.
const ST = { years: ['Year 1', 'Year 2'], profits: [150000, 140000], amount: 12000 };
const STn = normalise({ years: ST.years, profits: ST.profits, adj: stockError({ y: 0, amount: ST.amount, kind: 'over', last: 1 }) });
same(STn.normal[0], 138000, 'ST year 1'); same(STn.normal[1], 152000, 'ST year 2'); same(STn.total, sum(ST.profits), 'ST two-year total unchanged');

// Part 2: Sahyadri Cold Chain (Satara): balance sheet, capital employed, every method.
const SC = {
  liabilities: [["Kedar's Capital", 400000, 'capital'], ["Rutuja's Capital", 300000, 'capital'], ['General Reserve', 60000, 'reserve'], ['Creditors', 140000, 'outside'], ['Bank Loan', 200000, 'outside'], ['Outstanding Wages', 20000, 'outside']],
  assets: [['Goodwill', 50000, 'goodwill'], ['Cold-storage Plant', 520000], ['Building', 240000], ['Non-trade Investments', 80000, 'nti'], ['Stock', 90000], ['Debtors', 100000], ['Cash at Bank', 10000], ['Profit and Loss Account (debit balance)', 30000, 'fictitious']],
  years: ['2023-24', '2024-25', '2025-26'], profits: [110000, 122000, 134000], nti: 8000, nrr: 12, buy: 3,
};
const SCbs = balanceSheet(SC);
const SCce = capitalEmployed(SC);
same(SCbs.total, 1120000, 'SC balance sheet total');
same(SCce.ce, 600000, 'SC capital employed');
const SCn = normalise({ years: SC.years, profits: SC.profits, adj: [0, 1, 2].map((y) => ({ y, label: 'income from non-trade investments', amount: -SC.nti })) });
const SCavg = same(average(SCn.normal), 114000, 'SC average');
const SCg = goodwillAll({ avg: SCavg, capitalEmployed: SCce.ce, nrr: SC.nrr, years: SC.buy });
same(SCg.normal, 72000, 'SC normal'); same(SCg.superProfit, 42000, 'SC super'); same(SCg.bySuper, 126000, 'SC super goodwill');
same(SCg.capValue, 950000, 'SC capitalised'); same(SCg.byCapAvg, 350000, 'SC cap avg'); same(SCg.byCapSuper, 350000, 'SC cap super'); same(SCg.byAverage, 342000, 'SC average goodwill');

// No super profit: an imagined firm earning below normal.
const NS = { ce: 500000, nrr: 12, avg: 54000 };
const NSg = goodwillAll({ avg: NS.avg, capitalEmployed: NS.ce, nrr: NS.nrr });
check(NSg.superProfit < 0, 'NS must be below normal');
same(NSg.normal, 60000, 'NS normal');

// ================================================================ visuals: Part 1
const vRoute1 = flow('LR', ['Meaning and nature', 'Factors', 'When it is valued', 'Average profit', 'Weighted average'], 'Route map of Part 1: the meaning and nature of goodwill, the factors affecting it, when a firm values it, and the simple and weighted average profit methods', 'Part 1 at a glance');
const vShops = table(
  ['Particulars', 'Shop A (₹)', 'Shop B (₹)'],
  [
    ['Capital invested', inr(SHOPS.capital), inr(SHOPS.capital)],
    [`Normal profit at ${SHOPS.nrr}%`, inr(SHOPSnormal), inr(SHOPSnormal)],
    ['Actual yearly profit', inr(SHOPS.a), inr(SHOPS.b)],
    ['**Profit above normal**', `**${inr(SHOPS.a - SHOPSnormal)}**`, '**nil**'],
  ],
  `Table comparing two imagined cycle-repair shops with the same capital of ${inr(SHOPS.capital)} rupees: both would earn a normal profit of ${inr(SHOPSnormal)}, but Shop A actually earns ${inr(SHOPS.a)} and Shop B ${inr(SHOPS.b)}, so only Shop A earns ${inr(SHOPS.a - SHOPSnormal)} above normal`,
  'The extra earning power of Shop A is what a buyer pays for as goodwill.',
);
const vFeatures = table(
  ['Feature', 'What it means'],
  [
    ['Intangible', 'Valuable, but cannot be seen or touched'],
    ['Not fictitious', 'Has a real value that a buyer will pay'],
    ['Inseparable', 'Realised only when the whole business is sold'],
    ['Rests on future profit', 'Its value is the earning power expected ahead'],
    ['Changeable', 'Can rise or fall quickly with conditions'],
    ['Hard to value exactly', 'Different methods give different values'],
  ],
  'Table of six features of goodwill: intangible, not fictitious, inseparable from the business, based on expected future profit, changeable, and hard to value exactly',
);
const vKinds = table(
  ['Basis', 'Purchased goodwill', 'Self-generated goodwill'],
  [
    ['Arises when', 'A business is bought for more than its net assets', 'A firm builds its own reputation over time'],
    ['Price paid?', 'Yes, in money or money\'s worth', 'No'],
    ['Accounting Standard 26', 'Recorded as an intangible asset', 'Never recorded'],
  ],
  'Table contrasting purchased goodwill, which arises when a business is bought for more than its net assets, involves a price and is recorded, with self-generated goodwill, which is built by the firm itself, involves no price and is never recorded under Accounting Standard 26',
);
const vFactors = table(
  ['Factor', 'Goodwill is higher when…'],
  [
    ['Nature of business', 'its products enjoy steady demand'],
    ['Location', 'it sits where customers pass and stop'],
    ['Efficiency of management', 'costs are controlled and service is reliable'],
    ['Market situation', 'competition is weak or absent'],
    ['Special advantages', 'it holds patents, licences, trademarks or long contracts'],
    ['Age and reputation', 'it is old, known and trusted'],
    ['Key people', 'skilled partners and staff stay with the firm'],
  ],
  'Table of factors affecting goodwill: nature of business, location, efficiency of management, market situation, special advantages such as patents and licences, age and reputation, and key people',
);
const vWE1 = table(
  ['News item at Phulkari Looms', 'Effect on goodwill', 'Factor'],
  [
    ['A government emporium chain places a standing order for five years', 'Rises', 'Special advantages'],
    ['The master embroiderer, known to every buyer, plans to leave', 'Falls', 'Key people'],
    ['A cheaper machine-embroidery unit opens in the same bazaar', 'Falls', 'Market situation'],
  ],
  'Table for worked example one: a five-year standing order raises goodwill through special advantages; the planned exit of the master embroiderer lowers it through key people; a cheaper rival in the same bazaar lowers it through the market situation',
);
const vOccasions = flow('LR', ['Change in profit-sharing ratio', 'Admission of a partner', 'Retirement of a partner', 'Death of a partner', 'Amalgamation or sale of the firm'], 'Flow of the occasions on which a partnership values its goodwill: a change in the profit-sharing ratio, admission, retirement or death of a partner, and amalgamation or sale of the firm', 'How the value is then recorded is taught in Chapters 3 and 4.');
const vMethods = flow('TB', ['Average profit × years\' purchase', 'Weighted average profit × years\' purchase', 'Super profit × years\' purchase', 'Capitalisation of average profit − capital employed', 'Capitalisation of super profit'], 'Flow of the five valuation methods in the ISC syllabus: average profit, weighted average profit, super profit, capitalisation of average profit less capital employed, and capitalisation of super profit', 'Part 1 covers the first two; Part 2 the rest.');
const vAvgSteps = table(
  ['Step', 'What to do'],
  [
    ['1', 'List the profits (or losses) of the agreed past years'],
    ['2', 'Normalise each year: remove items that will not recur'],
    ['3', 'Average profit = total of normal profits ÷ number of years'],
    ['4', 'Deduct expected future costs (fair partner salary, new expenses)'],
    ['5', 'Goodwill = average profit × number of years\' purchase'],
  ],
  'Table of the five steps of the average profit method: list past profits, normalise each year, average them, deduct expected future costs, and multiply by the years of purchase',
);
const vNormalise = table(
  ['Item found in a past year', 'Treatment'],
  [
    ['Abnormal loss (uninsured theft, fire, flood)', 'Add back to that year'],
    ['Non-recurring gain (profit on sale of a fixed asset, old insurance claim)', 'Deduct from that year'],
    ['Income from non-trade investments', 'Deduct from each year'],
    ['Capital expenditure charged to revenue', 'Add back; deduct depreciation each year after'],
    ['Closing stock overvalued (undervalued)', 'Deduct from (add to) that year; reverse next year'],
    ['Partner works without salary; new expense ahead', 'Deduct the fair cost from average profit'],
  ],
  'Table of normalising adjustments: add back abnormal losses, deduct non-recurring gains and income from non-trade investments, add back capital expenditure charged to revenue less depreciation, correct stock errors in two years, and deduct fair partner salary and expected new expenses',
);
const vWE2 = table(PLn.headers, PLn.rows,
  `Table of worked example two: reported profits ${PL.profits.map(inr).join(', ')} rupees; the abnormal loss of ${inr(PL.theft)} is added back, the gain of ${inr(PL.vat)} and the dividend of ${inr(PL.div)} are deducted, giving normal profits ${PLn.normal.map(inr).join(', ')} totalling ${inr(PLn.total)}`,
  `Average ${rs(PLavg)} × ${PL.buy} years' purchase = goodwill ${rs(PLgw)}.`,
);
const vStock = table(STn.headers, STn.rows,
  `Table of a stock error: closing stock of year one overvalued by ${inr(ST.amount)} rupees, so year one's profit of ${inr(ST.profits[0])} falls to ${inr(STn.normal[0])} and year two's profit of ${inr(ST.profits[1])} rises to ${inr(STn.normal[1])}; the two-year total is unchanged`,
  'The two-year total does not change; only its split between the years does.',
);
const vWeightedSteps = flow('LR', ['Normal profit of each year', '× its weight (1, 2, 3 …)', 'Add the products', '÷ sum of the weights', '× years\' purchase'], 'Flow of the weighted average method: multiply each normal profit by its weight, add the products, divide by the sum of the weights, and multiply by the years of purchase', 'Later years get larger weights.');
const vWE3 = table(PLw.headers, PLw.rows,
  `Table of worked example three: normal profits ${PLn.normal.map(inr).join(', ')} rupees with weights one to four give products totalling ${inr(PLw.total)}; divided by ${PLw.weights} the weighted average is ${inr(PLw.value)}`,
  `Weighted average ${rs(PLw.value)} × ${PL.buy} = goodwill ${rs(PLgwW)}.`,
);
const vPlot = {
  kind: 'plot',
  spec: {
    x: { min: 0.4, max: 4.6, label: 'Year (1 = 2022-23 … 4 = 2025-26)' },
    y: { min: 0, max: 260, label: '₹ thousand' },
    functions: [],
    points: [],
    hlines: [{ y: PLavg / 1000, label: `Simple average ${PLavg / 1000}`, dashed: true }, { y: PLw.value / 1000, label: `Weighted average ${PLw.value / 1000}` }],
    series: [{ label: 'Normal profit', points: PLn.normal.map((p, i) => [i + 1, p / 1000]), kind: 'bar' }],
    grid: true,
  },
  alt: `Bar chart of Phulkari Looms' normal profits of ${PLn.normal.map((p) => p / 1000).join(', ')} thousand rupees over four years, with a dashed line at the simple average of ${PLavg / 1000} thousand and a solid line at the weighted average of ${PLw.value / 1000} thousand`,
  caption: 'Profits trend upward, so the weighted average sits above the simple average.',
};
const vSummary1 = table(
  ['Topic', 'Key rule'],
  [
    ['Goodwill', 'Value of earning power above normal; intangible, not fictitious'],
    ['Accounting Standard 26', 'Only purchased goodwill is recorded'],
    ['Factors', 'Anything that changes expected future profits'],
    ['Occasions', 'Any change in partners\' rights to future profits'],
    ['Normalising', 'Abnormal losses back, one-time gains out, stock errors in two years, future costs charged'],
    ['Average profit', 'Normal average profit × years\' purchase'],
    ['Weighted average', 'Σ (profit × weight) ÷ Σ weights; × years\' purchase'],
  ],
  'Summary table of Part 1: the meaning of goodwill, the rule of Accounting Standard 26, factors, occasions for valuation, normalising past profits, and the simple and weighted average profit formulas',
);

// ================================================================ visuals: Part 2
const vRoute2 = flow('LR', ['Normal profit', 'Capital employed', 'Super profit', 'Capitalisation', 'Comparing methods'], 'Route map of Part 2: normal profit, capital employed, the super profit method, the two capitalisation methods, and a comparison of all methods', 'Part 2 at a glance');
const vNormal = table(
  ['Term', 'Meaning', 'Formula'],
  [
    ['Normal rate of return', 'Rate that similar firms in the same trade usually earn on capital', 'Given in the question'],
    ['Capital employed', 'Net assets used in the business', 'Assets used − outside liabilities'],
    ['Normal profit', 'Profit an ordinary firm would earn on the same capital', 'Capital employed × normal rate ÷ 100'],
    ['Super profit', 'Profit above the normal profit', 'Average profit − normal profit'],
  ],
  'Table of four terms: the normal rate of return earned by similar firms, capital employed as net assets used in the business, normal profit as capital employed times the normal rate, and super profit as average profit minus normal profit',
);
const vCEitems = table(
  ['Leave out of assets', 'Why'],
  [
    ['Goodwill already in the books', 'It is the very thing being valued'],
    ['Non-trade investments', 'Not used in the business (their income is also removed from profit)'],
    ['Fictitious assets (debit balance of Profit and Loss, deferred revenue expenditure)', 'No realisable value'],
    ['**Then deduct** outside liabilities', 'Creditors, bills payable, loans, outstanding expenses'],
  ],
  'Table of what to leave out when computing capital employed: existing goodwill, non-trade investments and fictitious assets are excluded from assets, and outside liabilities such as creditors, bills payable, loans and outstanding expenses are deducted',
);
const vBS = table(SCbs.headers, SCbs.rows,
  `Horizontal balance sheet of Sahyadri Cold Chain totalling ${inr(SCbs.total)} rupees: capitals of Kedar and Rutuja, general reserve, creditors, bank loan and outstanding wages on the liabilities side; goodwill, plant, building, non-trade investments, stock, debtors, cash and a debit balance of profit and loss on the assets side`,
  'Balance Sheet as at 31 March 2026 (horizontal format)',
);
const vCE = table(
  ['Route', 'Working', 'Amount (₹)'],
  [
    ['Assets side', `Assets used ${inr(SCce.usedTotal)} − outside liabilities ${inr(SCce.outsideTotal)}`, `**${inr(SCce.ce)}**`],
    ['Capital side', `Capitals and reserve ${inr(SCce.ownTotal)} − goodwill, investments and loss ${inr(SCce.excludedTotal)}`, `**${inr(SCce.ce)}**`],
  ],
  `Table of capital employed worked two ways: assets used of ${inr(SCce.usedTotal)} less outside liabilities of ${inr(SCce.outsideTotal)}, and capitals and reserve of ${inr(SCce.ownTotal)} less excluded items of ${inr(SCce.excludedTotal)}; both give ${inr(SCce.ce)} rupees`,
  'Both routes must give the same answer.',
);
const vSuperFlow = flow('LR', ['Average (normal) profit', '− Normal profit', '= Super profit', '× Years\' purchase', '= Goodwill'], 'Flow of the super profit method: average profit minus normal profit gives super profit, which is multiplied by the years of purchase to give goodwill', 'No super profit means no goodwill.');
const vWE2b = table(
  ['Step', 'Working', 'Amount (₹)'],
  [
    ['Normal profits', `${SC.profits.map(inr).join(', ')} less ${inr(SC.nti)} investment income each`, SCn.normal.map(inr).join(', ')],
    ['Average profit', `${inr(SCn.total)} ÷ 3`, inr(SCavg)],
    ['Normal profit', `${inr(SCce.ce)} × ${SC.nrr} ÷ 100`, inr(SCg.normal)],
    ['Super profit', `${inr(SCavg)} − ${inr(SCg.normal)}`, inr(SCg.superProfit)],
    ['Goodwill at 3 years\' purchase', `${inr(SCg.superProfit)} × 3`, `**${inr(SCg.bySuper)}**`],
  ],
  `Table of worked example two: normal profits ${SCn.normal.map(inr).join(', ')} rupees average ${inr(SCavg)}; normal profit ${inr(SCg.normal)}; super profit ${inr(SCg.superProfit)}; goodwill ${inr(SCg.bySuper)} rupees`,
);
const vSplit = (() => {
  const s = new Svg(620, 250);
  const left = 150;
  const width = 420;
  const rows = [
    { y: 50, label: 'Profit', parts: [['Normal profit', SCg.normal, 'fill'], ['Super profit', SCg.superProfit, 'accent']], max: SCavg },
    { y: 160, label: 'Capital', parts: [['Capital employed', SCce.ce, 'fill'], ['Goodwill', SCg.byCapAvg, 'accent']], max: SCg.capValue },
  ];
  for (const r of rows) {
    s.text(left - 12, r.y + 22, r.label, { anchor: 'end', size: 14, bold: true });
    let x = left;
    for (const [name, v, fill] of r.parts) {
      const w = (v / r.max) * width;
      s.rect(x, r.y, w, 44, { fill, color: 'accent', sw: 1.4, rx: 3 });
      s.text(x + w / 2, r.y + 22, `${name} ${inr(v)}`, { size: 12 });
      x += w;
    }
    same(x - left, width, 'stacked bar fills its width');
  }
  s.text(left + width, 112, `Average profit ${inr(SCavg)}`, { anchor: 'end', size: 12, muted: true });
  s.text(left + width, 222, `Capitalised value ${inr(SCg.capValue)} (at ${SC.nrr}%)`, { anchor: 'end', size: 12, muted: true });
  return s.visual(
    `Two stacked bars for Sahyadri Cold Chain. Profit bar: normal profit ${inr(SCg.normal)} plus super profit ${inr(SCg.superProfit)} makes the average profit of ${inr(SCavg)} rupees. Capital bar: capital employed ${inr(SCce.ce)} plus goodwill ${inr(SCg.byCapAvg)} makes the capitalised value of ${inr(SCg.capValue)} rupees`,
    'Each bar is drawn to its own scale; the shaded part is what goodwill pays for.',
  );
})();
const vCapAvgFlow = flow('LR', ['Average profit', '× 100 ÷ normal rate', '= Capitalised value', '− Capital employed', '= Goodwill'], 'Flow of capitalisation of average profit: average profit times one hundred divided by the normal rate gives the capitalised value, from which capital employed is deducted to give goodwill', 'Capitalised value: the capital a normal firm would need to earn this profit.');
const vWE3b = table(
  ['Step', 'Working', 'Amount (₹)'],
  [
    ['Capitalised value', `${inr(SCavg)} × 100 ÷ ${SC.nrr}`, inr(SCg.capValue)],
    ['Less: capital employed', 'from worked example 1', inr(SCce.ce)],
    ['Goodwill', `${inr(SCg.capValue)} − ${inr(SCce.ce)}`, `**${inr(SCg.byCapAvg)}**`],
  ],
  `Table of worked example three: capitalised value of ${inr(SCg.capValue)} rupees less capital employed of ${inr(SCce.ce)} gives goodwill of ${inr(SCg.byCapAvg)}`,
);
const vCapSuperAlg = table(
  ['Line', 'Expression'],
  [
    ['Capitalised super profit', 'Super profit × 100 ÷ rate'],
    ['Substitute super profit', '(Average profit − capital employed × rate ÷ 100) × 100 ÷ rate'],
    ['Simplify', 'Average profit × 100 ÷ rate − capital employed'],
    ['Result', 'Same as capitalising average profit'],
  ],
  'Table showing that capitalising super profit equals average profit times one hundred over the rate minus capital employed, which is the capitalisation of average profit',
);
const vWE4b = table(
  ['Method', 'Working', 'Goodwill (₹)'],
  [
    ['Capitalisation of super profit', `${inr(SCg.superProfit)} × 100 ÷ ${SC.nrr}`, `**${inr(SCg.byCapSuper)}**`],
    ['Capitalisation of average profit', `${inr(SCg.capValue)} − ${inr(SCce.ce)}`, `**${inr(SCg.byCapAvg)}**`],
  ],
  `Table of worked example four: capitalising the super profit of ${inr(SCg.superProfit)} at ${SC.nrr} per cent gives ${inr(SCg.byCapSuper)} rupees, the same as capitalising the average profit`,
  'Same figures, same rate, same goodwill.',
);
const vNoSuper = table(
  ['Step', 'Amount (₹)'],
  [
    ['Capital employed', inr(NS.ce)],
    [`Normal profit at ${NS.nrr}%`, inr(NSg.normal)],
    ['Average profit', inr(NS.avg)],
    ['Super profit', `${inr(NS.avg - NSg.normal)}: none`],
    ['Goodwill', '**Nil**'],
  ],
  `Table of a firm with capital employed of ${inr(NS.ce)} rupees, normal profit of ${inr(NSg.normal)} and average profit of only ${inr(NS.avg)}: there is no super profit, so goodwill is nil`,
);
const vCompare = table(
  ['Method (Sahyadri Cold Chain)', 'Goodwill (₹)', 'What the buyer pays for'],
  [
    ['Average profit, 3 years\' purchase', inr(SCg.byAverage), 'All profit for three years'],
    ['Super profit, 3 years\' purchase', inr(SCg.bySuper), 'Excess profit for three years'],
    ['Capitalisation of average profit', inr(SCg.byCapAvg), 'Excess earning power, without limit of time'],
    ['Capitalisation of super profit', inr(SCg.byCapSuper), 'The same, by the other formula'],
  ],
  `Comparison table for Sahyadri Cold Chain: average profit method ${inr(SCg.byAverage)} rupees, super profit method ${inr(SCg.bySuper)}, and both capitalisation methods ${inr(SCg.byCapAvg)}`,
  'Methods differ because they pay for different things; the partners agree the method in advance.',
);
const vSummary2 = table(
  ['Topic', 'Key rule'],
  [
    ['Normal profit', 'Capital employed × normal rate ÷ 100'],
    ['Capital employed', 'Assets used (no goodwill, non-trade investments or fictitious assets) − outside liabilities'],
    ['Super profit', 'Average profit − normal profit; nil or negative means no goodwill'],
    ['Super profit method', 'Super profit × years\' purchase'],
    ['Capitalisation of average profit', 'Average profit × 100 ÷ rate − capital employed'],
    ['Capitalisation of super profit', 'Super profit × 100 ÷ rate (same answer)'],
  ],
  'Summary table of Part 2: formulas for normal profit, capital employed, super profit, the super profit method and the two capitalisation methods',
);

// ================================================================ decks
const part1 = deck({
  part: 1,
  title: 'Goodwill: Nature and Valuation — Part 1: Meaning, Factors and the Average Profit Methods',
  goals: [
    'Explain goodwill as an intangible asset, its features, and the rule of Accounting Standard 26',
    'Analyse how the factors affecting goodwill raise or lower its value, and say when a firm must value it',
    'Value goodwill by the simple and weighted average profit methods after normalising past profits',
  ],
  slides: [
    sl('title', 'Goodwill: Nature and Valuation', {
      b: 'Part 1 — what **goodwill** is, what makes it rise or fall, when a partnership values it, and the **average profit** methods.',
      v: vRoute1,
      n: 'Welcome to the second chapter of ISC Accounts. Imagine two shops on one street with the same capital, yet one earns far more. Customers prefer it, trust it and return to it. That extra earning power has a value, and accountants call it goodwill. In this part we learn what goodwill is, what affects it, when partners must value it, and two methods based on average profit.'.replace('ISC', 'Indian School Certificate'),
    }),
    sl('concept', 'What is goodwill?', {
      bl: ['**Goodwill** is the value of a business\'s reputation and connections that lets it earn **more than a normal profit**.', 'A buyer pays for goodwill because he expects that extra profit to continue.'],
      v: vShops,
      n: `Here are two imagined cycle repair shops with the same capital. An ordinary shop would earn ${rupees(SHOPSnormal)} a year on that capital. Shop B earns just that. Shop A, with loyal customers and a trusted mechanic, earns ${rupees(SHOPS.a)}. The extra ${rupees(SHOPS.a - SHOPSnormal)} a year comes from its reputation. Anyone buying Shop A would pay something for that extra earning power. That something is goodwill.`,
    }),
    sl('concept', 'Features of goodwill', {
      v: vFeatures,
      n: 'Goodwill has six features worth remembering. It is intangible: valuable but invisible. It is not fictitious, because a buyer pays real money for it. It cannot be sold apart from the business. Its value rests on profits expected in future, so it changes as conditions change. And because the future is uncertain, different methods give different values.',
    }),
    sl('check', 'Quick check: what kind of asset?', {
      b: 'Intangible, fictitious or current?',
      chk: 'm_intangible',
      n: 'Ask yourself two questions. Does goodwill have a physical form? And would a buyer pay real money for it?',
    }),
    sl('two-column', 'Purchased and self-generated goodwill', {
      cols: [
        '**Purchased goodwill**\n\n- Paid for when a business is bought for more than its net assets.\n- Recorded in the books as an intangible asset.',
        '**Self-generated goodwill**\n\n- Built up by the firm itself over the years.\n- Never recorded: no price was paid, so its cost cannot be measured reliably.',
      ],
      v: vKinds,
      n: 'Goodwill comes in two kinds. Purchased goodwill arises when one business buys another and pays more than its net assets are worth; that extra payment is recorded. Self generated goodwill is the reputation a firm builds for itself. Accounting Standard twenty six does not allow it to be recorded, however valuable the partners believe it to be, because no price has been paid.',
    }),
    sl('concept', 'Factors affecting goodwill', {
      v: vFactors,
      n: 'What makes goodwill high or low? Anything that changes the profits a business can expect. Steady demand, a busy location, efficient management, weak competition and special advantages such as patents, licences or long contracts all raise it. So do an old, trusted name and skilled people who stay. Lose any of these, and goodwill falls.',
    }),
    sl('example', 'Worked example 1: reading the factors', {
      b: '**Phulkari Looms**, an imagined embroidery firm in Patiala, hears three pieces of news in one month. How does each affect its goodwill?',
      v: vWE1,
      n: 'Take each piece of news and ask what it does to future profits. A five year standing order from an emporium chain assures sales, a special advantage, so goodwill rises. The master embroiderer whom every buyer knows plans to leave, so the key people factor pulls goodwill down. A cheaper rival opening in the same bazaar increases competition, and goodwill falls again.',
    }),
    sl('check', 'Quick check: what lowers goodwill?', {
      b: 'Think about the profits the shop can expect.',
      chk: 'm_factor_lower',
      n: 'Which change would send customers, and their money, somewhere else?',
    }),
    sl('concept', 'When must a firm value goodwill?', {
      v: vOccasions,
      bl: ['Whenever partners\' rights in **future profits** change, someone gains and someone sacrifices.', 'Recording the value on admission, retirement and death is the subject of **Chapters 3 and 4**.'],
      n: 'A partnership must put a value on its goodwill whenever partners\' rights in future profits change. That happens when the profit sharing ratio changes, when a partner is admitted, retires or dies, and when the firm is merged or sold. The partner who gains a share must pay the one who sacrifices it. How that payment is recorded comes in chapters three and four.',
    }),
    sl('concept', 'Methods in your syllabus', {
      v: vMethods,
      n: 'The syllabus lists five methods. Two are based on average profit: the simple average and the weighted average. One uses super profit, the profit above normal. Two capitalise a profit: either the average profit, from which capital employed is then deducted, or the super profit itself. We take the average profit methods now and the rest in part two.',
    }),
    sl('concept', 'The average profit method', {
      v: vAvgSteps,
      bl: ['**Goodwill = average profit × number of years\' purchase.**', 'Years\' purchase is a multiplier agreed by the partners, not the number of years averaged.'],
      n: 'In the average profit method, goodwill equals the average profit multiplied by a number of years of purchase. First list the past profits, then clean each year of unusual items, then average them. Deduct any cost a buyer will bear in future, such as a fair salary for a partner who works unpaid. Finally multiply by the years of purchase that the partners agree.',
    }),
    sl('diagram', 'Normalising past profits', {
      v: vNormalise,
      n: 'Goodwill is a price for future profits, so past profits must be made normal. Add back abnormal losses such as an uninsured theft. Take out one time gains and income from investments not used in the business. If a machine was wrongly charged as an expense, add it back and charge depreciation instead. Correct stock errors, and charge any fair cost the business will bear in future.',
    }),
    sl('example', 'Worked example 2: Phulkari Looms, average profit', {
      b: `Profits: ${PL.years.map((y, i) => `${y} ${rs(PL.profits[i])}`).join('; ')}. The 2023-24 profit is after an uninsured theft of yarn of ${rs(PL.theft)}; 2024-25 includes ${rs(PL.vat)} profit on selling an old dyeing vat; 2025-26 includes ${rs(PL.div)} dividend on non-trade investments. Goodwill at **${PL.buy} years' purchase** of average profit.`,
      v: vWE2,
      n: `First make each year normal. Add back the theft of ${rupees(PL.theft)}, which will not recur. Remove the gain of ${rupees(PL.vat)} on the old vat, and the dividend of ${rupees(PL.div)}, which comes from investments outside the business. The four normal profits total ${rupees(PLn.total)}, an average of ${rupees(PLavg)}. Three years of purchase gives goodwill of ${rupees(PLgw)}.`,
    }),
    sl('concept', 'Stock errors touch two years', {
      v: vStock,
      bl: ['Closing stock of one year is the **opening stock** of the next.', 'Overvalued closing stock: deduct from that year, **add** to the next. Undervalued: the reverse.'],
      n: `A wrong stock figure affects two years. Suppose the closing stock of year one was overvalued by ${rupees(ST.amount)}. Year one's profit was overstated, so we deduct that amount. But the same stock opened year two, raising its cost of goods sold, so year two's profit was understated and we add the amount back. Over the two years the total profit does not change.`,
    }),
    sl('check', 'Quick check: average profit goodwill', {
      b: 'Average first, then multiply.',
      chk: 'n_avg',
      n: 'Add the profits, divide by the number of years, and then multiply by the years of purchase.',
    }),
    sl('concept', 'The weighted average profit method', {
      v: vWeightedSteps,
      bl: ['Used when profits show a clear **trend**; recent years get the largest weights.', '**Weighted average = Σ (profit × weight) ÷ Σ weights.**'],
      n: 'When profits rise or fall steadily, the latest years are the best guide to the future. So we give each year a weight, usually one for the oldest and the largest number for the latest. Multiply each normal profit by its weight, add the products, and divide by the total of the weights. Then multiply by the years of purchase, as before.',
    }),
    sl('example', 'Worked example 3: Phulkari Looms, weighted average', {
      b: `Same normal profits, now with weights 1, 2, 3 and 4 for ${PL.years[0]} to ${PL.years[3]}. Goodwill at **${PL.buy} years' purchase** of the weighted average profit.`,
      v: vWE3,
      n: `Multiply each normal profit by its weight. The products add up to ${rupees(PLw.total)}. The weights add up to ten, so the weighted average profit is ${rupees(PLw.value)}. At three years of purchase, goodwill is ${rupees(PLgwW)}, higher than the ${rupees(PLgw)} we found with the simple average, because the profits have been rising.`,
    }),
    sl('diagram', 'Simple and weighted average compared', {
      v: vPlot,
      n: 'The bars show the four normal profits of Phulkari Looms. The dashed line is the simple average; the solid line is the weighted average. Because the later, larger profits carry more weight, the weighted line sits higher. If profits had been falling, the weighted average would sit below the simple one.',
    }),
    sl('check', 'Quick check: when to weight', {
      b: 'What would make recent years matter more?',
      chk: 'm_weighted_when',
      n: 'Think about when the simple and weighted averages would give nearly the same answer, and when they would not.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up. Goodwill is the value of earning power above normal. It is intangible but not fictitious, and only purchased goodwill is recorded. Factors that change expected profits change goodwill, and partners value it whenever their rights in future profits change. Normalise past profits, then multiply the simple or weighted average by the years of purchase.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Show a **normal profit table**: year, reported profit, adjustment, normal profit.',
        'A trading **loss** stays in the average: deduct it and still divide by all the years.',
        'Stock errors: correct **two** years, in opposite directions.',
        'Deduct a fair partner salary or a new expense from the **average**, not from one year.',
        'Write the years\' purchase in your final line.',
      ],
      n: 'Examiners give marks for each step, so set out a normal profit table before you average. Keep an ordinary trading loss in the average and divide by every year. Correct a stock error in both years it touches. Take a fair salary for an unpaid partner from the average profit. And always show the years of purchase in the final line of your answer.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Goodwill: Nature and Valuation — Part 2: Capital Employed, Super Profit and Capitalisation',
  goals: [
    'Compute capital employed from a balance sheet, leaving out goodwill, non-trade investments and fictitious assets',
    'Value goodwill as a number of years\' purchase of super profit',
    'Value goodwill by capitalising average profit and by capitalising super profit, and explain why the two agree',
  ],
  slides: [
    sl('title', 'Capital employed, super profit and capitalisation', {
      b: 'Part 2 — **normal profit**, **capital employed**, the **super profit** method and the two **capitalisation** methods.',
      v: vRoute2,
      n: 'In part one we valued goodwill from average profit alone. But a buyer also asks what his capital could earn elsewhere. In this part we measure the capital employed in a business, work out the normal profit it should earn, and value goodwill from the profit above that, either by a number of years of purchase or by capitalisation.',
    }),
    sl('concept', 'Normal rate of return and normal profit', {
      v: vNormal,
      n: 'The normal rate of return is what similar firms in the same trade usually earn on their capital. Multiply the capital employed by this rate to get normal profit: what an ordinary business of the same size would earn. Anything a firm earns above that is super profit, and super profit is what a buyer really pays for when he pays for goodwill.',
    }),
    sl('concept', 'Capital employed (net assets)', {
      v: vCEitems,
      bl: ['**Capital employed = assets used in the business − outside liabilities.**'],
      n: 'Capital employed means the net assets used in the business. Start with the assets, but leave out three things: goodwill already in the books, because that is what we are valuing; non trade investments, which are not used in the business; and fictitious assets, which have no realisable value. Then deduct outside liabilities such as creditors, loans and outstanding expenses.',
    }),
    sl('example', 'Worked example 1: Sahyadri Cold Chain', {
      b: '**Sahyadri Cold Chain**, an imagined cold-storage firm in Satara owned by Kedar and Rutuja. Find its capital employed for valuing goodwill.',
      v: vBS,
      n: `Here is the balance sheet in the horizontal format used in ISC answers, liabilities on the left and assets on the right, each side totalling ${rupees(SCbs.total)}. Before reading on, find the three assets that must be left out: the goodwill already recorded, the non trade investments, and the debit balance of the profit and loss account.`.replace('ISC', 'Indian School Certificate'),
    }),
    sl('example', 'Worked example 1 (contd): capital employed two ways', {
      cols: [
        `**Assets side**\n\nAssets used: plant, building, stock, debtors, cash = ${rs(SCce.usedTotal)}\n\nLess outside liabilities ${rs(SCce.outsideTotal)}`,
        `**Capital side**\n\nCapitals and reserve = ${rs(SCce.ownTotal)}\n\nLess goodwill, investments and loss ${rs(SCce.excludedTotal)}`,
      ],
      v: vCE,
      n: `From the assets side, the assets actually used total ${rupees(SCce.usedTotal)}. Deduct outside liabilities of ${rupees(SCce.outsideTotal)} and capital employed is ${rupees(SCce.ce)}. From the capital side, the partners' capitals and reserve total ${rupees(SCce.ownTotal)}; take away the three excluded items and you reach the same ${rupees(SCce.ce)}. Use the second route as your check.`,
    }),
    sl('check', 'Quick check: what counts as capital employed?', {
      b: 'Used in the business, or not?',
      chk: 'm_ce_exclude',
      n: 'Only assets that help the business earn its own profit belong in capital employed.',
    }),
    sl('concept', 'The super profit method', {
      v: vSuperFlow,
      bl: ['**Super profit = average profit − normal profit.**', '**Goodwill = super profit × number of years\' purchase.**'],
      n: 'The super profit method values only the profit above normal. Find the average profit, normalised as before. Subtract the normal profit on the capital employed. What remains is super profit. Multiply it by the number of years for which the buyer expects the extra profit to last. If there is no super profit, there is no goodwill.',
    }),
    sl('example', 'Worked example 2: super profit at Sahyadri Cold Chain', {
      b: `Profits: ${SC.years.map((y, i) => `${y} ${rs(SC.profits[i])}`).join('; ')}, each including ${rs(SC.nti)} income from the non-trade investments. Normal rate of return ${SC.nrr}%. Goodwill at **${SC.buy} years' purchase of super profit**.`,
      v: vWE2b,
      n: `The investments were left out of capital employed, so their income of ${rupees(SC.nti)} a year comes out of profit too. The normal profits average ${rupees(SCavg)}. Twelve per cent on capital employed of ${rupees(SCce.ce)} is a normal profit of ${rupees(SCg.normal)}. The super profit is ${rupees(SCg.superProfit)}, and three years of purchase gives goodwill of ${rupees(SCg.bySuper)}.`,
    }),
    sl('diagram', 'Where super profit comes from', {
      v: vSplit,
      n: `The upper bar splits the average profit of ${rupees(SCavg)} into the normal profit any firm would earn and the super profit that only this firm earns. The lower bar shows the same idea for capital: the capitalised value of ${rupees(SCg.capValue)} is capital employed plus goodwill. The shaded parts are what goodwill pays for.`,
    }),
    sl('check', 'Quick check: super profit goodwill', {
      b: 'Normal profit, super profit, then years\' purchase.',
      chk: 'n_super',
      n: 'Follow the same three steps as the cold chain example, in the same order.',
    }),
    sl('concept', 'Capitalisation of average profit', {
      v: vCapAvgFlow,
      bl: ['**Capitalised value = average profit × 100 ÷ normal rate.**', '**Goodwill = capitalised value − capital employed.**'],
      n: 'Capitalisation asks a different question: how much capital would an ordinary firm need to earn this firm\'s average profit at the normal rate? That figure is the capitalised value. The firm actually uses less capital than that. The difference between the capitalised value and the capital employed is goodwill.',
    }),
    sl('example', 'Worked example 3: capitalising average profit', {
      b: `Sahyadri Cold Chain: average profit ${rs(SCavg)}, normal rate ${SC.nrr}%, capital employed ${rs(SCce.ce)}.`,
      v: vWE3b,
      n: `An ordinary cold store earning twelve per cent would need ${rupees(SCg.capValue)} of capital to make ${rupees(SCavg)} a year. Sahyadri does it with only ${rupees(SCce.ce)}. The difference, ${rupees(SCg.byCapAvg)}, is its goodwill by capitalising the average profit.`,
    }),
    sl('concept', 'Capitalisation of super profit', {
      v: vCapSuperAlg,
      bl: ['**Goodwill = super profit × 100 ÷ normal rate.**'],
      n: 'The second capitalisation method capitalises the super profit directly: multiply it by one hundred and divide by the normal rate. The table shows why this must agree with the first method. Replace super profit by average profit minus normal profit, simplify, and you are back to the capitalised value of average profit minus capital employed.',
    }),
    sl('example', 'Worked example 4: capitalising super profit', {
      b: `Sahyadri Cold Chain: super profit ${rs(SCg.superProfit)}, normal rate ${SC.nrr}%.`,
      v: vWE4b,
      n: `Capitalise the super profit of ${rupees(SCg.superProfit)} at twelve per cent: multiply by one hundred and divide by twelve. The answer is ${rupees(SCg.byCapSuper)}, exactly what the first method gave. When the two methods disagree in your working, check your normal profit or your capital employed.`,
    }),
    sl('check', 'Quick check: do the capitalisation methods agree?', {
      b: 'True or false?',
      chk: 'tf_capequal',
      n: 'Recall the algebra on the previous slides before you answer.',
    }),
    sl('concept', 'No super profit, no goodwill', {
      v: vNoSuper,
      n: `A firm can have plenty of profit and still no goodwill. This imagined firm employs ${rupees(NS.ce)}, so at twelve per cent it should earn ${rupees(NSg.normal)}. It earns only ${rupees(NS.avg)}. There is no profit above normal, so the super profit and capitalisation methods both give no goodwill. Never multiply a shortfall by the years of purchase.`,
    }),
    sl('diagram', 'One firm, every method', {
      v: vCompare,
      n: `Here is Sahyadri Cold Chain valued four ways. The average profit method pays for all profit for three years, ${rupees(SCg.byAverage)}. The super profit method pays only for the excess for three years, ${rupees(SCg.bySuper)}. The capitalisation methods treat the excess as lasting indefinitely, ${rupees(SCg.byCapAvg)}. That is why partners must agree the method in advance.`,
    }),
    sl('check', 'Quick check: average below normal', {
      b: 'Compare the average profit with the normal profit first.',
      chk: 'm_no_goodwill',
      n: 'Work out the normal profit before anything else, then decide whether there is anything to value.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up. Capital employed is the assets used in the business less outside liabilities, leaving out existing goodwill, non trade investments and fictitious assets. Normal profit is capital employed times the normal rate. Super profit is the excess of average profit over normal profit. Goodwill is super profit times the years of purchase, or super profit capitalised, which equals the capitalised average profit less capital employed.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Work capital employed from the assets side and **check** it from the capital side.',
        'If non-trade investments are excluded from capital employed, remove their **income** from profit too.',
        'Normal profit uses **capital employed**, never average profit.',
        'Super profit nil or negative: goodwill is **nil**.',
        'The two capitalisation methods must agree; if not, recheck your figures.',
        'Recording goodwill on admission, retirement or death: **Chapters 3 and 4**.',
      ],
      n: 'In the exam, show capital employed with a check from the capital side. Whatever you exclude from assets, remove its income from profits. Normal profit is always based on capital employed. If there is no super profit, say plainly that there is no goodwill. And remember that the two capitalisation methods must agree, which gives you a free check on your working.',
    }),
  ],
});

// ================================================================ notes
const N = notes({
  title: 'Goodwill: Nature and Valuation — Notes',
  sections: [
    {
      h: '1. Meaning and nature of goodwill',
      t: 1,
      b: '**Goodwill** is the value of the reputation, customer connections and other advantages that enable a business to earn **more than a normal profit**. A buyer pays for it because he expects that extra profit to continue.\n\n**Features:**\n- **Intangible**: valuable, but without physical existence.\n- **Not fictitious**: it has a real value that can be realised on a sale of the business.\n- **Inseparable**: it cannot be sold apart from the business.\n- **Based on expected future profits**, so it can change quickly.\n- **Subjective**: different methods give different values; partners agree the method.',
      terms: [
        ['Goodwill', 'The value of a business\'s ability to earn profit above the normal profit of similar businesses.'],
        ['Intangible asset', 'An asset with value but no physical form, such as goodwill, patents and trademarks.'],
        ['Fictitious asset', 'A loss or expense not yet written off, with no realisable value (for example a debit balance of Profit and Loss).'],
      ],
      v: vShops,
      vs: [vFeatures],
    },
    {
      h: '2. Purchased and self-generated goodwill; Accounting Standard 26',
      t: 1,
      b: '**Purchased goodwill** arises when a business is bought for more than the fair value of its net assets; the excess paid is goodwill.\n\n**Self-generated (internally generated) goodwill** is built by the firm itself.\n\n**Accounting Standard 26 (Intangible Assets):** only goodwill acquired for a consideration in money or money\'s worth is recorded. Self-generated goodwill is **not** recorded, because its cost cannot be measured reliably.\n\nIn a partnership, goodwill is usually **valued** (not recorded) on reconstitution; how the value is adjusted among partners is covered in Chapters 3 and 4.',
      terms: [
        ['Purchased goodwill', 'The excess of the price paid for a business over the value of its net assets.'],
        ['Self-generated goodwill', 'Reputation a business builds for itself; never recorded in its books.'],
      ],
      v: vKinds,
    },
    {
      h: '3. Factors affecting goodwill',
      t: 1,
      b: 'Goodwill rises or falls with the profits a business can expect. The main factors:\n- **Nature of business:** steady demand, stable products.\n- **Location:** a site customers reach easily.\n- **Efficiency of management:** low costs, reliable service.\n- **Market situation:** little or no competition.\n- **Special advantages:** patents, trademarks, licences, import quotas, long-term contracts, cheap power or raw material.\n- **Age and reputation:** an old, trusted name.\n- **Key people:** skilled owners or staff who stay.\n\n**Rule of thumb:** ask whether a change will raise or lower **future profits**.',
      terms: [
        ['Special advantages', 'Rights or contracts that protect a business\'s profits, such as patents or exclusive licences.'],
        ['Market situation', 'The degree of competition a business faces.'],
      ],
      v: vFactors,
      vs: [vWE1],
    },
    {
      h: '4. When a partnership values goodwill',
      t: 1,
      b: 'Goodwill is valued whenever partners\' rights in future profits change:\n1. change in the profit-sharing ratio of existing partners;\n2. admission of a new partner;\n3. retirement of a partner;\n4. death of a partner;\n5. amalgamation of firms, or sale of the business.\n\nOn each occasion a partner who gains a share of future profits compensates the partner who sacrifices it. The accounting treatment belongs to Chapters 3 (admission) and 4 (retirement and death).',
      terms: [
        ['Reconstitution', 'Any change in the agreement among partners, such as admission, retirement, death or a new ratio.'],
      ],
      v: vOccasions,
    },
    {
      h: '5. Average profit method and normalising profits',
      t: 2,
      b: '**Goodwill = average profit × number of years\' purchase.**\n\n**Normalising** (future maintainable profit):\n- abnormal losses (uninsured fire, theft, flood): **add back**;\n- non-recurring gains (profit on sale of a fixed asset, an old insurance claim): **deduct**;\n- income from non-trade investments: **deduct** each year;\n- capital expenditure charged to revenue: **add back** in that year; **deduct depreciation** for that and later years;\n- closing stock overvalued: **deduct** from that year, **add** to the next (undervalued: the reverse);\n- fair remuneration of a partner who works without salary, and known future expenses (e.g. a new insurance premium): **deduct** from the average.\n\nAn ordinary **trading loss** stays in the average: deduct it and divide by all the years.',
      terms: [
        ['Years\' purchase', 'The number of years of profit (or super profit) a buyer agrees to pay as the price of goodwill.'],
        ['Future maintainable profit', 'The profit a business can be expected to keep earning, after normalising past profits.'],
        ['Abnormal item', 'A gain or loss not expected to recur, removed before averaging.'],
      ],
      v: vNormalise,
      vs: [vWE2, vStock],
    },
    {
      h: '6. Weighted average profit method',
      t: 2,
      b: 'Used when profits show a **clear trend**. Recent years receive larger weights (usually 1, 2, 3 … from the oldest).\n\n**Weighted average profit = Σ (normal profit × weight) ÷ Σ weights**\n\n**Goodwill = weighted average profit × number of years\' purchase.**\n\nRising profits: weighted average > simple average. Falling profits: weighted average < simple average. Steady profits: nearly equal.',
      terms: [
        ['Weight', 'A number showing the relative importance given to a year\'s profit.'],
        ['Weighted average profit', 'The sum of each profit multiplied by its weight, divided by the sum of the weights.'],
      ],
      v: vWE3,
      vs: [vWeightedSteps, vPlot],
    },
    {
      h: '7. Capital employed and the super profit method',
      t: [3, 5],
      b: '**Capital employed (net assets)** = total assets − goodwill already in the books − non-trade investments − fictitious assets − outside liabilities.\n\nCheck from the capital side: partners\' capitals + reserves + credit balance of Profit and Loss − goodwill − non-trade investments − fictitious assets.\n\n**Normal profit** = capital employed × normal rate of return ÷ 100.\n\n**Super profit** = average profit − normal profit.\n\n**Goodwill = super profit × number of years\' purchase.** If super profit is nil or negative, there is **no goodwill**.\n\nWhen non-trade investments are left out of capital employed, their income is removed from profit as well.',
      terms: [
        ['Capital employed', 'Net assets used in the business: assets other than goodwill, non-trade investments and fictitious assets, less outside liabilities.'],
        ['Normal rate of return', 'The rate of profit that similar firms in the same industry usually earn on their capital.'],
        ['Normal profit', 'Capital employed multiplied by the normal rate of return.'],
        ['Super profit', 'The excess of average profit over normal profit.'],
      ],
      v: vCEitems,
      vs: [vBS, vCE, vWE2b, vNoSuper],
    },
    {
      h: '8. Capitalisation methods and comparison',
      t: 4,
      b: '**Capitalisation of average profit:**\n- capitalised value = average profit × 100 ÷ normal rate of return;\n- goodwill = capitalised value − capital employed.\n\n**Capitalisation of super profit:** goodwill = super profit × 100 ÷ normal rate of return.\n\nWith the same figures and rate the two always agree: super profit × 100 ÷ rate = average profit × 100 ÷ rate − capital employed.\n\n**Comparing methods:** the average profit method pays for all profit for a few years; the super profit method pays for the excess for a few years; the capitalisation methods value the excess earning power without a time limit. Partners agree the method in the deed or at the time of valuation.',
      terms: [
        ['Capitalised value', 'The capital a normal business would need to earn a given profit at the normal rate of return.'],
        ['Capitalisation', 'Converting a yearly profit into a capital sum by multiplying by 100 and dividing by the normal rate.'],
      ],
      v: vCompare,
      vs: [vCapAvgFlow, vCapSuperAlg, vSplit],
    },
  ],
  tips: '**How marks are usually split (ISC Accounts, Section A)**\n- 1 mark: one correct option, term or assertion-reason choice.\n- 2 marks: a feature or occasion with its reason, or a one-step valuation (normal profit and goodwill).\n- 3 marks: a valuation with one or two normalising adjustments, or capital employed from a short balance sheet.\n- 5 marks: capital employed from a horizontal balance sheet plus super profit or capitalisation goodwill; or five years\' profits with several adjustments.\n\n**Common mistakes**\n- Multiplying by the number of years averaged instead of the years\' purchase.\n- Leaving an abnormal loss in, or a one-time gain in, before averaging.\n- Correcting a stock error in only one year.\n- Including existing goodwill, non-trade investments or a debit balance of Profit and Loss in capital employed.\n- Removing non-trade investments from capital employed but leaving their income in profit.\n- Calculating normal profit on average profit instead of on capital employed.\n- Showing a negative goodwill instead of stating that there is no goodwill.\n- Forgetting to deduct capital employed when capitalising average profit.\n\nAll firms and figures in SOYL practice are imagined; the board paper gives its own.',
});

// ================================================================ flashcards
const F = cards([
  ['**Goodwill**', 'The value of a business\'s ability to earn more than a normal profit, because of its reputation and connections.', 'definition', 1],
  ['Is goodwill intangible or fictitious?', '**Intangible** (real value, no physical form); not fictitious.', 'concept', 1],
  ['Can goodwill be sold separately?', '**No.** It is realised only when the whole business is sold.', 'concept', 1],
  ['Accounting Standard 26 on goodwill', 'Only **purchased** goodwill is recorded; self-generated goodwill never is.', 'fact', 1],
  ['**Purchased goodwill**', 'Excess of the price paid for a business over its net assets.', 'definition', 1],
  ['Name four factors affecting goodwill', 'Nature of business, location, efficiency of management, market situation (also special advantages, age, key people).', 'fact', 1],
  ['A patent or exclusive licence affects goodwill how?', 'It is a **special advantage**: goodwill rises.', 'concept', 1],
  ['A key partner leaves to join a rival', 'Goodwill **falls**: expected profits go with him.', 'concept', 1],
  ['Occasions for valuing goodwill in a partnership', 'Change in ratio, admission, retirement, death, amalgamation or sale.', 'fact', 1],
  ['Goodwill by average profit method', 'Average profit × number of **years\' purchase**.', 'fact', 2],
  ['**Years\' purchase**', 'The multiplier: how many years of profit the buyer pays for goodwill.', 'definition', 2],
  ['Abnormal loss in a past year', '**Add back** to that year before averaging.', 'exam-tip', 2],
  ['Profit on sale of a fixed asset', '**Deduct** from that year: it will not recur.', 'exam-tip', 2],
  ['Income from non-trade investments', '**Deduct** from each year\'s profit.', 'exam-tip', 2],
  ['Closing stock overvalued at the end of a year', 'Deduct from that year; **add** to the next year.', 'concept', 2],
  ['Capital expenditure charged to revenue', 'Add back the cost; deduct depreciation for that and later years.', 'concept', 2],
  ['Partner works without salary', 'Deduct a **fair remuneration** from the average profit.', 'exam-tip', 2],
  ['An ordinary trading loss year', 'Keep it in: deduct the loss and divide by **all** the years.', 'exam-tip', 2],
  ['**Weighted average profit**', 'Σ (profit × weight) ÷ Σ weights.', 'fact', 2],
  ['When is the weighted average used?', 'When profits show a clear **rising or falling trend**.', 'concept', 2],
  ['Rising profits: weighted or simple average higher?', '**Weighted** average is higher.', 'concept', 2],
  ['**Normal rate of return**', 'Rate similar firms in the same trade usually earn on capital.', 'definition', 3],
  ['**Normal profit**', 'Capital employed × normal rate ÷ 100.', 'fact', 3],
  ['**Super profit**', 'Average profit − normal profit.', 'definition', 3],
  ['Goodwill by super profit method', 'Super profit × years\' purchase.', 'fact', 3],
  ['Average profit below normal profit', 'No super profit, so **no goodwill**.', 'exam-tip', 3],
  ['**Capitalised value of average profit**', 'Average profit × 100 ÷ normal rate.', 'definition', 4],
  ['Goodwill by capitalising average profit', 'Capitalised value − capital employed.', 'fact', 4],
  ['Goodwill by capitalising super profit', 'Super profit × 100 ÷ normal rate (same as the other capitalisation method).', 'fact', 4],
  ['**Capital employed**', 'Assets used in the business − outside liabilities.', 'definition', 5],
  ['Left out of assets for capital employed', 'Existing goodwill, non-trade investments, fictitious assets.', 'fact', 5],
  ['Capital employed from the capital side', 'Capitals + reserves − goodwill − non-trade investments − fictitious assets.', 'exam-tip', 5],
]);

// ================================================================ tests (ISC class defaults, item for item)
const T_SHORT = test({
  kind: 'short',
  blueprint: 'isc-12-default-chapter-test-short',
  title: 'Chapter test (short) — Goodwill: Nature and Valuation',
  duration: 50,
  sections: [
    { id: 'A', title: 'Section A - Objective (5 marks)', instr: 'Answer all questions. Multiple-choice and assertion-reason items carry 1 mark each.', items: ['m_as26_record', 'm_avg_calc', 'm_normal_profit', 'm_cap_super_calc', 'ar_selfgen'] },
    { id: 'B', title: 'Section B - Short answer (4 marks)', instr: 'Answer both questions. Internal choice in the second question.', items: ['s2_features', { attempt: 1, keys: ['s2_avg', 's2_cap_super'] }] },
    { id: 'C', title: 'Section C - Short answer (6 marks)', instr: 'Answer both questions. Internal choice in the second question. Show your working.', items: ['s3_normalise', { attempt: 1, keys: ['s3_super', 's3_nature'] }] },
    { id: 'D', title: 'Section D - Long answer (5 marks)', instr: 'Answer the question. It is set in parts; show all working notes.', items: ['l5_cap_both'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'isc-12-default-chapter-test-long',
  title: 'Chapter test (long) — Goodwill: Nature and Valuation',
  duration: 100,
  sections: [
    { id: 'A', title: 'Section A - Objective (12 marks)', instr: 'Answer all questions. Multiple-choice and assertion-reason items carry 1 mark each.', items: ['m_factor_raise', 'm_occasion', 'm_buyer_pays', 'm_inseparable', 'm_abnormal', 'm_stock_under', 'm_weighted_calc', 'm_super_calc', 'm_cap_avg_calc', 'm_ce_calc', 'ar_fictitious', 'ar_ce'] },
    { id: 'B', title: 'Section B - Short answer (6 marks)', instr: 'Answer all three questions. Internal choice in the last question.', items: ['s2_need', 's2_normal_super', { attempt: 1, keys: ['s2_ce_liab', 's2_remuneration'] }] },
    { id: 'C', title: 'Section C - Short answer (12 marks)', instr: 'Answer all four questions. Internal choice in the last question. Show your working.', items: ['s3_factors', 's3_weighted', 's3_cap_avg', { attempt: 1, keys: ['s3_ce_bs', 's3_stock'] }] },
    { id: 'D', title: 'Section D - Long answer (10 marks)', instr: 'Answer both questions. Internal choice in the second question. Each is set in parts; show all working notes.', items: ['l5_super_bs', { attempt: 1, keys: ['l5_avg_full', 'l5_theory'] }] },
  ],
});

// ================================================================ extra gates for this chapter
// 1. TTS-safe narration: words only — no digits, symbols, rupee sign, abbreviations or ALL-CAPS.
for (const d of [part1, part2]) for (const s of d.slides) {
  const m = /[0-9₹%/&()"“”|*#+=<>Σ]|\b[A-Z]{2,}\b|\b(?:Dr|Cr|Rs|A\/c|viz|etc|ie|eg)\b/.exec(s.narration);
  if (m) throw new Error(`narration of deck ${d.part} ${s.id} is not TTS-safe: "${m[0]}" in "${s.narration.slice(Math.max(0, m.index - 30), m.index + 30)}"`);
}
// 2. Near-duplicate stems inside the bank (stage 6 measure: Jaccard of word 5-grams ≥ 0.7 is an error).
const dups = nearDuplicates(BANK, { n: 5, threshold: 0.5, minWords: 5 });
for (const d of dups) {
  if (d.similarity >= 0.7) throw new Error(`near-duplicate stems ${d.a.id} / ${d.b.id} (${Math.round(d.similarity * 100)}%)`);
  console.log(`note: stems ${d.a.id} / ${d.b.id} are ${Math.round(d.similarity * 100)}% similar (never together in one test)`);
}
// 3. Tests: disjoint, no deck-check item, marks 20 and 40.
const checksUsed = new Set(['m_intangible', 'm_factor_lower', 'n_avg', 'm_weighted_when', 'm_ce_exclude', 'n_super', 'tf_capequal', 'm_no_goodwill']);
const inTest = (t) => t.sections.flatMap((s) => s.items.map((i) => i.question_id));
const shortIds = new Set(inTest(T_SHORT));
check(inTest(T_LONG).every((id) => !shortIds.has(id)), 'the two chapter tests share a question');
const deckChecks = new Set([part1, part2].flatMap((d) => d.slides.map((s) => s.check_question_id).filter(Boolean)));
check(deckChecks.size === checksUsed.size, 'deck check list out of date');
check([...shortIds, ...inTest(T_LONG)].every((id) => !deckChecks.has(id)), 'a deck-check question is used in a test');
check(T_SHORT.total_marks === 20 && T_LONG.total_marks === 40, `test marks ${T_SHORT.total_marks} / ${T_LONG.total_marks}`);
void words; void numWords; void sum;

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t05 of isc-12-accounts-ch02 (goodwill meaning, nature, features and factors; simple and weighted average profit; super profit; capitalisation of average and of super profit; capital employed); treatment of goodwill on reconstitution only pointed to (ch03, ch04)',
    originality: 'every firm, partner, scenario and figure written for this chapter and labelled imagined; no ISC textbook illustration or exercise and no CISCE specimen or past-paper item reused; firms and places differ from the CBSE 12 Accountancy chapters',
    data: 'every amount computed by src/acc.mjs and asserted: normalised profits reconcile, simple and weighted averages, capital employed from the assets side equals the capital side, balance sheets total, normal and super profit, capitalisation of average and super profit agree; tables in decks and model answers are generated from the computed values',
    facts: 'Accounting Standard 26 (only purchased goodwill recorded); capital employed excludes existing goodwill, non-trade investments and fictitious assets; horizontal balance sheets (ISC convention)',
    gate: 'schema, content lint (lintExemplar), deterministic verify checks, answer-leak scan, TTS-safe narration, near-duplicate stems, whole-number step marks and test disjointness run clean on this chapter',
  },
});
