// Build ISC 12 Economics ch16 Fiscal Policy. Run from platform/:
//   npx tsx content/authored/economics-commerce/isc-12-economics-ch16/src/build.mjs
// Uses the shared ISC 12 Economics lib in isc-12-economics-ch01/src/lib.mjs (not copied, not edited).
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from '../../isc-12-economics-ch01/src/lib.mjs';

setUnit('isc-12-economics-ch16', 'economics-commerce');
const {
  inr, pct, slabTax, avgRate, TARA, INCOMES, PROG, PROG_AVG, PROPT, FLAT, REG_AVG, Y8, T8, T8_AVG, Y45, T45,
  SINK, SINK_ANNUAL, CONV, CONV_OLD, CONV_NEW, CONV_SAVE, ANN, ANN_YEAR, SAH, SAH_TOTAL, SAH_SOCIAL, slabText,
} = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const assert = (cond, msg) => { if (!cond) throw new Error(`build.mjs: ${msg}`); };

// ---------------------------------------------------------------- computed data for the figures
const PROP_AVG = INCOMES.map((y, i) => avgRate(PROPT[i], y));
assert(PROP_AVG.join() === '10,10,10', 'proportional average rates');
assert(PROG.join() === INCOMES.map((y) => slabTax(y, TARA)).join(), 'progressive taxes recomputed');
const short = (y) => `${y / 100000} lakh`;

// ---------------------------------------------------------------- SVG figures
// (1) Average rate of tax at three incomes under the three kinds of tax (grouped bars).
const vRates = (() => {
  const s = new Svg(560, 420);
  const c = s.chart({ x1: 4, y1: 14, left: 70, top: 50, width: 400, height: 280, xLabel: 'Annual income (₹)', yLabel: 'Tax as per cent of income' });
  const kinds = [
    { name: 'Progressive', vals: PROG_AVG, color: 'accent', fill: 'fill' },
    { name: 'Proportional', vals: PROP_AVG, color: 'blue', fill: 'blue' },
    { name: 'Regressive', vals: REG_AVG, color: 'red', fill: 'red' },
  ];
  INCOMES.forEach((y, i) => {
    const x = i + 1;
    kinds.forEach((k, j) => {
      const xa = x - 0.33 + j * 0.22;
      const x0 = c.X(xa), x1 = c.X(xa + 0.2);
      const v = k.vals[i];
      if (v > 0) s.rect(x0, c.Y(v), x1 - x0, c.Y(0) - c.Y(v), { fill: k.fill, fillOpacity: 0.55, color: k.color, sw: 1.4, rx: 1 });
      s.text((x0 + x1) / 2, c.Y(v) - 9, String(v), { size: 10 });
    });
    c.xTick(x, short(y));
  });
  c.yTick(5, '5').yTick(10, '10');
  kinds.forEach((k, j) => {
    s.rect(400, 44 + j * 18, 14, 10, { fill: k.fill, fillOpacity: 0.55, color: k.color, sw: 1.2, rx: 1 });
    s.text(420, 49 + j * 18, k.name, { anchor: 'start', size: 11 });
  });
  return s.visual(
    `Grouped bar chart of tax as a per cent of income at incomes of 2, 5 and 10 lakh rupees under three imagined taxes: a progressive slab tax takes ${PROG_AVG.join(', ')} per cent, rising with income; a proportional tax takes 10 per cent at every income; a flat levy of ${inr(FLAT)} rupees takes ${REG_AVG.join(', ')} per cent, falling as income rises`,
    'Imagined schedules: Taranagar slabs; a flat 10 per cent; a flat ₹6,000 levy.',
  );
})();

// (2) Public expenditure of the imagined state of Sahyagiri (bars, ₹ crore).
const SAH_ROWS = [['Education', SAH.education], ['Health', SAH.health], ['Roads', SAH.roads], ['Pensions', SAH.pensions], ['Interest', SAH.interest]];
const vSah = (() => {
  const s = new Svg(560, 400);
  const c = s.chart({ x1: 6, y1: 200, left: 70, top: 40, width: 420, height: 280, xLabel: 'Item', yLabel: 'Spending (₹ crore)' });
  SAH_ROWS.forEach(([name, v], i) => {
    const x = i + 1;
    const x0 = c.X(x - 0.3), x1 = c.X(x + 0.3);
    const social = name === 'Education' || name === 'Health';
    s.rect(x0, c.Y(v), x1 - x0, c.Y(0) - c.Y(v), { fill: social ? 'fill' : 'muted', fillOpacity: social ? undefined : 0.45, color: social ? 'accent' : 'muted', sw: 1.5, rx: 2 });
    c.label([x, v], String(v), { dy: -10, size: 11 });
    c.xTick(x, name);
  });
  c.yTick(100, '100');
  return s.visual(
    `Bar chart of the imagined state of Sahyagiri's spending in crore rupees: education ${SAH.education}, health ${SAH.health}, roads ${SAH.roads}, pensions ${SAH.pensions} and interest ${SAH.interest}, a total of ${SAH_TOTAL}; education and health together are ${SAH_SOCIAL}, half of the total`,
    `Imagined figures: education and health ${pct(SAH_SOCIAL / SAH_TOTAL)} per cent of ₹${SAH_TOTAL} crore.`,
  );
})();

// (3) Sinking fund: the balance in the fund at the end of selected years (no interest), reaching the debt at maturity.
const FUND_YEARS = [2, 4, 6, 8, 10, 12];
const vSink = (() => {
  const s = new Svg(560, 400);
  const c = s.chart({ x1: 13, y1: 700, left: 70, top: 40, width: 420, height: 280, xLabel: 'Year', yLabel: 'Money in the fund (₹ crore)' });
  FUND_YEARS.forEach((yr) => {
    const v = SINK_ANNUAL * yr;
    const x0 = c.X(yr - 0.7), x1 = c.X(yr + 0.7);
    s.rect(x0, c.Y(v), x1 - x0, c.Y(0) - c.Y(v), { fill: yr === SINK.years ? 'fill' : 'muted', fillOpacity: yr === SINK.years ? undefined : 0.45, color: yr === SINK.years ? 'accent' : 'muted', sw: 1.4, rx: 2 });
    c.label([yr, v], String(v), { dy: -10, size: 11 });
    c.xTick(yr, String(yr));
  });
  c.seg([0, SINK.debt], [13, SINK.debt], { dash: true, color: 'red', sw: 1.4 });
  s.text(c.X(0.4), c.Y(SINK.debt) - 12, `Loan to repay: ${SINK.debt}`, { anchor: 'start', size: 11, color: 'red' });
  assert(SINK_ANNUAL * SINK.years === SINK.debt, 'fund reaches the debt');
  return s.visual(
    `Bar chart of an imagined sinking fund: ${SINK_ANNUAL} crore rupees is set aside every year, so the fund holds ${FUND_YEARS.map((y) => SINK_ANNUAL * y).join(', ')} crore at the end of years ${FUND_YEARS.join(', ')}; at year ${SINK.years} it equals the loan of ${SINK.debt} crore, shown by a dashed line`,
    `Imagined loan: ₹${SINK.debt} crore ÷ ${SINK.years} years = ₹${SINK_ANNUAL} crore a year (interest on the fund ignored).`,
  );
})();

// ---------------------------------------------------------------- tables and flows
const vInstruments = flow('TB', ['Fiscal policy', 'Taxation', 'Public expenditure', 'Public borrowing'], 'Flow of the three instruments of fiscal policy: taxation, public expenditure and public borrowing', 'Three instruments', [
  { from: 'n1', to: 'n2' }, { from: 'n1', to: 'n3' }, { from: 'n1', to: 'n4' },
]);
const vTwoGaps = table(
  ['Situation', 'Taxes', 'Public expenditure', 'Borrowing'],
  [
    ['Excess demand, rising prices', 'Raise', 'Cut non-essential spending', 'Borrow from the public to absorb spending power'],
    ['Deficient demand, unemployment', 'Cut', 'Raise, especially on public works', 'Borrow idle savings and spend them'],
  ],
  'Table of fiscal policy in two situations: against excess demand raise taxes, cut non-essential spending and borrow from the public; against deficient demand cut taxes, raise spending on public works and borrow idle savings to spend',
);
const vFpMp = table(
  ['', 'Fiscal policy', 'Monetary policy'],
  [['Run by', 'Government', 'Central bank'], ['Tools', 'Taxes, spending, borrowing', 'Repo rate, reserve ratios, open market operations'], ['Works through', 'Incomes and public demand', 'Cost and availability of credit']],
  'Table comparing fiscal and monetary policy: who runs each, their tools, and how each works',
);
const vSlumpFlow = flow('LR', ['Public works started', 'Wages paid', 'Workers spend', 'Shops and firms sell more', 'More jobs and income'], 'Flow of expansionary fiscal policy: public works are started, wages are paid, workers spend, shops and firms sell more, and more jobs and income follow', 'Spending in a slump');
const vDirInd = table(
  ['', 'Direct tax', 'Indirect tax'],
  [['Impact and incidence', 'Same person', 'Different persons'], ['Can it be shifted?', 'No', 'Yes, through prices'], ['Examples', 'Income tax, corporation tax', 'GST, customs duty'], ['Can be progressive?', 'Yes', 'Mostly not; regressive in effect']],
  'Table comparing direct and indirect taxes: impact and incidence, whether the tax can be shifted, examples, and whether it can be progressive',
);
const vShift = flow('LR', ['Government levies tax on a trader', 'Trader pays it (impact)', 'Trader adds it to the price', 'Buyer bears it (incidence)'], 'Flow of shifting an indirect tax: the government levies the tax on a trader, who pays it, adds it to the price, and the buyer finally bears it', 'Impact and incidence');
const vTaraTable = table(
  ['Income (₹)', 'Tax (₹)', 'Average rate (per cent)'],
  INCOMES.map((y, i) => [inr(y), inr(PROG[i]), String(PROG_AVG[i])]).concat([[inr(Y8), inr(T8), String(T8_AVG)]]),
  `Table of the imagined Taranagar income tax: incomes of ${INCOMES.map(inr).join(', ')} and ${inr(Y8)} rupees pay ${PROG.map(inr).join(', ')} and ${inr(T8)} rupees, average rates of ${PROG_AVG.join(', ')} and ${T8_AVG} per cent`,
  `Slabs: ${slabText}.`,
);
const vSlabs = table(
  ['Slab of income', 'Rate'],
  [['Up to ₹2,50,000', 'Nil'], ['₹2,50,001 to ₹6,00,000', '10 per cent'], ['Above ₹6,00,000', '20 per cent']],
  'Table of the imagined Taranagar income-tax slabs: nil up to 2,50,000 rupees, 10 per cent from 2,50,001 to 6,00,000, and 20 per cent above 6,00,000',
  'Imagined slabs, not current Indian rates.',
);
const vTaxKinds = table(
  ['Kind', 'Rate as income rises', 'Imagined example'],
  [['Progressive', 'Rises', 'Taranagar slabs: 0, 10, 20 per cent'], ['Proportional', 'Stays the same', 'Flat 10 per cent of all income'], ['Regressive', 'Falls', `A flat ₹${inr(FLAT)} levy per family`]],
  'Table of progressive, proportional and regressive taxes: the rate rises, stays the same or falls as income rises, with imagined examples',
);
const vTaxFee = table(
  ['', 'Tax', 'Fee'],
  [['Compulsory?', 'Yes', 'Only for those who take the service'], ['Service in return?', 'No direct return', 'A specific service'], ['Example', 'Income tax', 'Driving-licence fee']],
  'Table comparing a tax and a fee: whether it is compulsory, whether a specific service is given in return, and an example of each',
);
const vPeKinds = table(
  ['Kind of spending', 'Imagined example', 'Effect'],
  [['Developmental', 'Check dams, schools, roads', 'Raises productive capacity'], ['Non-developmental', 'Interest on old loans, administration', 'Keeps the state running'], ['Transfer payment', 'Old-age pensions, scholarships', 'Moves income; nothing produced in return']],
  'Table of kinds of public expenditure: developmental spending such as check dams and schools raises capacity, non-developmental spending such as interest keeps the state running, and transfer payments such as pensions move income without production',
);
const vPeRoles = flow('TB', ['Public expenditure', 'Infrastructure for growth', 'Human capital: schools and health', 'Employment in slumps', 'Less inequality: subsidies and pensions'], 'Flow of the roles of public expenditure: infrastructure for growth, human capital through schools and health, employment in slumps, and less inequality through subsidies and pensions', 'Why public spending matters', [
  { from: 'n1', to: 'n2' }, { from: 'n1', to: 'n3' }, { from: 'n1', to: 'n4' }, { from: 'n1', to: 'n5' },
]);
const vSahTable = table(
  ['Item', '₹ crore', 'Share (per cent)'],
  SAH_ROWS.map(([n, v]) => [n, String(v), String(pct(v / SAH_TOTAL))]).concat([['Total', String(SAH_TOTAL), '100']]),
  `Table of the imagined state of Sahyagiri's spending: ${SAH_ROWS.map(([n, v]) => `${n.toLowerCase()} ${v}`).join(', ')}, total ${SAH_TOTAL} crore rupees, with shares of ${SAH_ROWS.map(([, v]) => pct(v / SAH_TOTAL)).join(', ')} per cent`,
);
const vDebtKinds = table(
  ['', 'Internal debt', 'External debt'],
  [['Borrowed from', 'Citizens, banks, institutions at home', 'Foreign governments, banks, institutions'], ['Repayment', 'Money moves within the country', 'Resources go abroad, often in foreign currency'], ['Burden', 'Lighter', 'Heavier']],
  'Table comparing internal and external public debt: who lends, what repayment involves, and the relative burden',
);
const vRedeem = table(
  ['Method', 'How it works', 'Reduces debt?'],
  [
    ['Sinking fund', 'Set aside a fixed sum every year; repay at maturity', 'Yes'],
    ['Conversion', 'Replace high-interest loans with low-interest ones', 'Cuts interest burden'],
    ['Surplus budget', 'Use revenue above expenditure to repay', 'Yes'],
    ['Terminal annuity', 'Repay in equal yearly instalments', 'Yes'],
    ['Capital levy', 'One-time tax on wealth used to repay', 'Yes'],
    ['Refunding', 'Raise new loans to repay maturing ones', 'No, only postpones'],
  ],
  'Table of methods of redeeming public debt: sinking fund, conversion, surplus budget, terminal annuity and capital levy reduce the debt or its burden, while refunding only postpones it',
);
const vConv = table(
  ['', 'Old bonds', 'New bonds'],
  [['Amount (₹ crore)', String(CONV.amount), String(CONV.amount)], ['Interest rate', `${pct(CONV.oldRate)} per cent`, `${pct(CONV.newRate)} per cent`], ['Yearly interest (₹ crore)', String(CONV_OLD), String(CONV_NEW)]],
  `Table of an imagined conversion: ${CONV.amount} crore rupees of bonds at ${pct(CONV.oldRate)} per cent cost ${CONV_OLD} crore a year; at ${pct(CONV.newRate)} per cent they cost ${CONV_NEW} crore, saving ${CONV_SAVE} crore a year`,
);
const vDeficitFin = flow('LR', ['Budget gap', 'Government borrows from the central bank', 'New money is created', 'Spending rises', 'Prices may rise if output lags'], 'Flow of deficit financing: a budget gap is met by borrowing from the central bank, new money is created, spending rises, and prices may rise if output does not keep pace', 'Deficit financing');

// ---------------------------------------------------------------- deck 1
const part1 = deck({
  part: 1,
  title: 'Fiscal Policy — Part 1: Fiscal Policy and Taxes',
  goals: [
    'Explain the meaning and instruments of fiscal policy and how they affect aggregate demand',
    'Distinguish direct and indirect taxes, and a tax from a fee',
    'Classify and calculate progressive, proportional and regressive taxes',
  ],
  slides: [
    sl('title', 'Fiscal Policy and Taxes', {
      b: 'Part 1 — what **fiscal policy** is, its **instruments**, and the **taxes** that fund the government.',
      v: flow('LR', ['Meaning of fiscal policy', 'Instruments', 'Using it in booms and slumps', 'Direct and indirect taxes', 'Progressive, proportional, regressive'], 'Route map of Part 1: meaning of fiscal policy, its instruments, using it in booms and slumps, direct and indirect taxes, and progressive, proportional and regressive taxes', 'Part 1 at a glance'),
      n: 'Every government collects money and spends it. How much it taxes, what it spends on and how much it borrows can push an economy faster or slow it down. That is fiscal policy. In this part we meet its tools, see how they are used in good and bad times, and look closely at the taxes that pay for it all.',
    }),
    sl('concept', 'What is fiscal policy?', {
      b: '**Fiscal policy** is the government\'s use of **taxation, public expenditure and public borrowing** to influence demand, output, employment and prices.',
      v: vInstruments,
      n: 'Fiscal policy is the government using its own budget as a lever. It can change taxes, change what it spends, and change how much it borrows. Each of these alters how much money households and firms have to spend, and so it changes aggregate demand in the economy.',
    }),
    sl('two-column', 'Fiscal policy and monetary policy', {
      cols: ['**Fiscal policy**\n\n- Run by the **government**\n- Tools: taxes, spending, borrowing\n- Works through incomes and public demand', '**Monetary policy**\n\n- Run by the **central bank**\n- Tools: repo rate, reserve ratios, open market operations\n- Works through the cost and supply of credit'],
      v: vFpMp,
      n: 'Do not mix up the two policies. Fiscal policy belongs to the government and uses the budget. Monetary policy belongs to the central bank and works through credit, for example the repo rate. Both aim at stable prices and steady growth, but they use different levers.',
    }),
    sl('check', 'Quick check: fighting rising prices', {
      b: 'Prices are rising because total spending exceeds what the economy can produce. Which fiscal response suits?',
      chk: 'm_fp_inflation',
      n: 'Ask yourself whether the economy needs more spending or less, then pick the option that moves demand in that direction.',
    }),
    sl('diagram', 'Fiscal policy in booms and slumps', {
      b: 'Against **excess demand**: contract. Against **deficient demand**: expand.',
      v: vTwoGaps,
      n: 'When demand runs ahead of output and prices climb, the government should raise taxes, trim non-essential spending and borrow from the public to soak up spending power. When demand is weak and people lose jobs, it does the opposite: cut taxes, spend more on public works and put idle savings to use.',
    }),
    sl('example', 'Worked example 1: a slump in imagined Godavaripur', {
      b: 'Sales are falling and joblessness is rising. Plan three fiscal measures.',
      bl: ['**Raise public spending** on roads and irrigation: jobs and incomes rise directly.', '**Cut taxes** on households: disposable income and consumption rise.', '**Borrow idle savings** and spend them: money returns to the income stream.', 'Each measure **raises aggregate demand**; spending also works through the multiplier.'],
      v: vSlumpFlow,
      n: 'Here is a slump in an imagined state. First, start public works, which hire people straight away. Second, cut taxes so families have more to spend. Third, borrow savings that are lying idle and spend them on projects. Each step lifts demand, and the wages paid are spent again and again, so income rises by more than the first outlay.',
    }),
    sl('check', 'Quick check: who runs fiscal policy?', {
      b: 'True or false: fiscal policy is framed and run by the central bank.',
      chk: 'tf_fp_cb',
      n: 'Think about which body sets taxes and decides public spending.',
    }),
    sl('concept', 'Public revenue and taxes', {
      b: 'A **tax** is a **compulsory** payment to the government with **no direct return** of a service. A **fee** is paid for a **specific service**.',
      v: vTaxFee,
      n: 'The government\'s income is called public revenue. The biggest part comes from taxes, which everyone liable must pay, without getting a particular service in return. A fee is different: you pay it only when you take a service, like a driving licence. Other non-tax revenue includes fines, interest and dividends from public companies.',
    }),
    sl('diagram', 'Direct and indirect taxes', {
      b: 'The test is **shifting**: can the burden be passed on?',
      v: vDirInd,
      n: 'A direct tax, such as income tax, is borne by the very person it is imposed on. An indirect tax, such as the goods and services tax that India introduced on the first of July twenty seventeen, is paid by a seller but passed on to buyers through prices. So the person who pays and the person who bears it are different.',
    }),
    sl('diagram', 'Impact and incidence', {
      b: '**Impact**: on the person who pays the government. **Incidence**: on the person who finally bears the money burden.',
      v: vShift,
      n: 'Follow a tax on shoes. The trader pays it to the government, so the impact is on him. But he adds it to the price, so the buyer finally bears it. That final resting place is called the incidence. For a direct tax, impact and incidence fall on the same person.',
    }),
    sl('check', 'Quick check: the third instrument', {
      b: 'Fill in the blank: the three main instruments of fiscal policy are taxation, public expenditure and public ___.',
      chk: 'fb_fp_tools',
      n: 'Besides taxing and spending, how else can a government raise money for its plans?',
    }),
    sl('concept', 'Progressive, proportional and regressive', {
      b: 'Classify a tax by what happens to the **rate** (share of income) as income rises.',
      v: vTaxKinds,
      n: 'Look at the share of income taken, not the rupees. If the share rises as income rises, the tax is progressive. If it stays the same, it is proportional. If it falls, it is regressive. A flat charge per family is regressive, because the same rupees are a bigger share of a small income.',
    }),
    sl('diagram', 'Three taxes compared', {
      b: 'Average rates at incomes of ₹2, 5 and 10 lakh.',
      v: vRates,
      n: 'This chart shows the three kinds side by side for three imagined families. Under the progressive slab tax the share climbs from nothing to eleven and a half per cent. Under a flat ten per cent tax it never changes. Under a flat levy of six thousand rupees the share falls from three per cent to less than one per cent.',
    }),
    sl('check', 'Quick check: what kind of tax?', {
      b: 'Under the imagined Taranagar income tax, what happens to the share of income paid as tax as income rises?',
      chk: 'm_progressive_meaning',
      n: 'Work out the share for two incomes, or use the chart, and compare.',
    }),
    sl('example', 'Worked example 2: tax on ₹8,00,000 in Taranagar', {
      b: `Slabs: ${slabText}.`,
      bl: ['Step 1 — First ₹2,50,000: **nil**.', 'Step 2 — Next ₹3,50,000 at 10 per cent: **₹35,000**.', 'Step 3 — Remaining ₹2,00,000 at 20 per cent: **₹40,000**.', `Step 4 — Total **₹${inr(T8)}**; average rate ${inr(T8)} ÷ ${inr(Y8)} × 100 = **${T8_AVG} per cent**; marginal rate **20 per cent**.`],
      v: vSlabs,
      n: 'Each rate applies only to the income inside its own slab. The first two and a half lakh pays nothing. The next three and a half lakh pays ten per cent, which is thirty five thousand. The last two lakh pays twenty per cent, which is forty thousand. So the total is seventy five thousand, a little over nine per cent of income.',
    }),
    sl('diagram', 'Taranagar at four incomes', {
      b: 'The average rate rises steadily: the tax is **progressive**.',
      v: vTaraTable,
      n: 'Using the same slabs for four incomes shows the pattern clearly. As income rises, both the tax and the share of income rise. That is why progressive taxes are said to follow the ability to pay, and why they help to reduce the gap between rich and poor.',
    }),
    sl('summary', 'Summary', {
      bl: ['Fiscal policy uses **taxes, spending and borrowing** to influence demand.', 'Contract against **excess demand**; expand against **deficient demand**.', 'Direct taxes **cannot be shifted**; indirect taxes **can**.', 'Progressive, proportional, regressive: the **rate** rises, stays or falls with income.'],
      v: vDirInd,
      n: 'Let us sum up. Fiscal policy is the government using its budget to steer the economy. It tightens when prices race ahead and loosens when jobs are scarce. Taxes can be direct or indirect depending on whether they can be passed on, and progressive, proportional or regressive depending on how the rate changes with income.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Never call the repo rate or reserve ratios fiscal tools: they are **monetary**.', 'A tax is progressive only if the **rate** rises, not just the rupees.', 'In slab sums, apply each rate **only to its slab**.', 'State **impact and incidence** when classifying a tax as direct or indirect.'],
      n: 'Four traps cost marks here. Do not list central bank tools under fiscal policy. Do not call a tax progressive just because the rich pay more rupees. In slab calculations, never apply the top rate to the whole income. And when you classify a tax, use impact and incidence to justify your answer.',
    }),
  ],
});

// ---------------------------------------------------------------- deck 2
const part2 = deck({
  part: 2,
  title: 'Fiscal Policy — Part 2: Public Expenditure and Public Debt',
  goals: [
    'Explain the meaning and importance of public expenditure, and kinds of public spending',
    'Explain public debt, internal and external, and the methods of redeeming it',
    'Explain the meaning of deficit financing and its main risk',
  ],
  slides: [
    sl('title', 'Public Expenditure and Public Debt', {
      b: 'Part 2 — how the government **spends**, why it **borrows**, and how it **repays**.',
      v: flow('LR', ['Public expenditure', 'Why it matters', 'Public debt', 'Methods of redemption', 'Deficit financing'], 'Route map of Part 2: public expenditure, why it matters, public debt, methods of redemption, and deficit financing', 'Part 2 at a glance'),
      n: 'Taxes are only half the story. The government also spends on roads, schools, hospitals and pensions, and when its income falls short, it borrows. In this part we see why public spending matters so much, what public debt is, and the ways a government can repay what it owes.',
    }),
    sl('concept', 'Public expenditure', {
      b: '**Public expenditure** is the spending of central, state and local governments on **goods, services, salaries, transfers and assets**.',
      v: vPeKinds,
      n: 'Public expenditure covers everything governments spend. Some of it builds capacity, like check dams and schools; that is developmental spending. Some keeps the state running, like administration and interest on past loans. And some simply moves income to people, like pensions and scholarships; these are transfer payments, because nothing is produced in return.',
    }),
    sl('diagram', 'Why public expenditure matters', {
      b: 'Growth, human capital, jobs and fairness.',
      v: vPeRoles,
      n: 'Public spending matters for four big reasons. It builds infrastructure that private firms need but will not provide. It builds human capital through schools and hospitals. It creates jobs when private demand is weak. And it reduces inequality through subsidies, pensions and free services for poorer families.',
    }),
    sl('example', 'Worked example 3: reading Sahyagiri\'s spending', {
      b: 'Find the share of education and health, and comment.',
      bl: [`Step 1 — Total = ${SAH_ROWS.map(([, v]) => v).join(' + ')} = **₹${SAH_TOTAL} crore**.`, `Step 2 — Education + health = **₹${SAH_SOCIAL} crore**.`, `Step 3 — Share = ${SAH_SOCIAL} ÷ ${SAH_TOTAL} × 100 = **${pct(SAH_SOCIAL / SAH_TOTAL)} per cent**.`, 'Step 4 — Comment: half of all spending builds **human capital**; interest is small.'],
      v: vSah,
      n: 'Here is an imagined state\'s spending. Add the items to get six hundred crore. Education and health together are three hundred crore, exactly half. A state that spends half its money on schools and hospitals is investing in its people. Interest takes only a tenth, so old debt is not crowding out development.',
    }),
    sl('check', 'Quick check: a share of spending', {
      b: 'What share of Sahyagiri\'s total spending goes to roads?',
      chk: 'm_pe_share',
      n: 'Divide the road spending by the total and multiply by a hundred.',
    }),
    sl('diagram', 'Sahyagiri\'s spending in a table', {
      b: 'Shares of each item in the total.',
      v: vSahTable,
      n: 'The same figures as shares make comparison easy. Education leads at thirty per cent, roads take a quarter, health twenty per cent, pensions fifteen and interest ten. When you answer a data question, quote such shares and then say what they reveal about the government\'s priorities.',
    }),
    sl('concept', 'Public debt', {
      b: '**Public debt**: loans raised by the government, which must be **repaid with interest**. **Internal** debt is borrowed at home; **external** debt abroad.',
      v: vDebtKinds,
      n: 'When revenue falls short of spending, the government borrows. These loans are its public debt. Borrowing from its own citizens and banks is internal debt; repaying it only moves money within the country. Borrowing from abroad is external debt; repaying it sends resources out of the country, so it is usually a heavier burden.',
    }),
    sl('diagram', 'Methods of redeeming public debt', {
      b: 'Five methods reduce the debt or its cost; refunding only postpones it.',
      v: vRedeem,
      n: 'Governments have several ways to clear their debts. A sinking fund saves a fixed sum every year. Conversion swaps costly loans for cheaper ones. A surplus budget uses spare revenue. A terminal annuity repays in equal yearly instalments. A capital levy taxes wealth once to repay. Refunding is different: it borrows afresh to repay, so the debt does not shrink.',
    }),
    sl('check', 'Quick check: new loans for old', {
      b: 'A government issues fresh bonds and uses the money to pay off bonds that have fallen due. What is this method called?',
      chk: 'm_refunding',
      n: 'Ask whether the debt actually gets smaller, or whether repayment is simply pushed into the future.',
    }),
    sl('example', 'Worked example 4: a sinking fund for imagined Malabar Pradesh', {
      b: `A loan of ₹${SINK.debt} crore falls due in ${SINK.years} years.`,
      bl: [`Step 1 — Yearly sum = ${SINK.debt} ÷ ${SINK.years} = **₹${SINK_ANNUAL} crore** (interest on the fund ignored).`, 'Step 2 — Place it in a **separate fund** every year.', `Step 3 — After ${SINK.years} years the fund holds **₹${SINK.debt} crore**.`, 'Step 4 — Repay the loan **in full** from the fund at maturity.'],
      v: vSink,
      n: 'Suppose a state must repay six hundred crore after twelve years. Dividing the loan by the years gives fifty crore a year. The state puts this into a separate fund every year, and the fund grows steadily until, in the twelfth year, it equals the whole loan, which is then repaid in one go.',
    }),
    sl('diagram', 'Conversion lowers the interest bill', {
      b: 'Swap costly bonds for cheaper ones when interest rates fall.',
      v: vConv,
      n: 'Conversion works when market interest rates fall. An imagined state replaces four hundred crore of bonds paying nine per cent with new bonds paying six and a half per cent. Its yearly interest falls from thirty six crore to twenty six crore, a saving of ten crore every year, although the debt itself is unchanged.',
    }),
    sl('check', 'Quick check: interest saved', {
      b: `By how much does the yearly interest bill fall when ₹${CONV.amount} crore of bonds move from ${pct(CONV.oldRate)} to ${pct(CONV.newRate)} per cent?`,
      chk: 'n_conversion_saving',
      n: 'Work out the interest at each rate, then subtract.',
    }),
    sl('concept', 'Terminal annuity and capital levy', {
      b: `**Terminal annuity**: equal yearly instalments, e.g. ₹${ANN.debt} crore over ${ANN.years} years = **₹${ANN_YEAR} crore** a year. **Capital levy**: a one-time tax on wealth to repay debt.`,
      v: vRedeem,
      n: 'Under a terminal annuity, the government pays lenders a fixed part every year, so the debt shrinks steadily and ends on a known date. A capital levy is a one-time tax on the wealth of the richest, used to clear debt quickly, for example after a war. It is rare, because it can discourage saving and investment.',
    }),
    sl('diagram', 'Deficit financing', {
      b: 'Covering a budget gap by **borrowing from the central bank**, which **creates new money**.',
      v: vDeficitFin,
      n: 'In India, deficit financing means meeting the budget gap by borrowing from the central bank, which in effect creates new money. It is quick and can help in a slump when resources are idle. But if new money grows faster than output, more money chases the same goods and prices rise. So it must be used with care.',
    }),
    sl('check', 'Quick check: repaying from a surplus', {
      b: 'True or false: a government that collects more revenue than it spends can use the surplus to repay part of its debt.',
      chk: 'tf_surplus_repay',
      n: 'Think about what a government can do with money left over after meeting its expenses.',
    }),
    sl('summary', 'Summary', {
      bl: ['Public expenditure builds **infrastructure and human capital**, creates **jobs** and reduces **inequality**.', 'Public debt must be **repaid with interest**; external debt is the heavier burden.', 'Redemption: sinking fund, conversion, surplus budget, terminal annuity, capital levy; **refunding only postpones**.', 'Deficit financing **creates new money** and risks **inflation**.'],
      v: vRedeem,
      n: 'To sum up. Public spending is a powerful tool for growth and fairness. When the government borrows, it must repay with interest, and it has several methods to do so, though refunding only delays the day. Deficit financing is the quickest source of money, but it can push up prices if it is overused.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Say **why** refunding does not reduce debt: new loans replace old ones.', 'For a sinking fund, show the **yearly sum** and that the fund is **separate**.', 'Deficit financing in the Indian sense means **borrowing from the central bank**.', 'Budget heads and deficit measures belong to the **next chapter**.'],
      n: 'Some reminders for the exam. Explain clearly why refunding leaves the debt unchanged. In a sinking-fund answer, show the yearly amount and stress that it goes into a separate fund. Define deficit financing as borrowing from the central bank and name the inflation risk. And keep budget heads and deficit measures for the next chapter.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Fiscal Policy — Notes',
  sections: [
    {
      h: '1. Fiscal policy: meaning and instruments',
      t: 1,
      b: '- **Meaning**: the government\'s deliberate use of its **revenue, expenditure and borrowing** to influence aggregate demand, output, employment and prices.\n- **Instruments**: (1) **taxation**; (2) **public expenditure**; (3) **public borrowing (public debt)**.\n- **Objectives**: price stability, full employment, growth, a fairer distribution of income, and better allocation of resources.\n- **Use**: against **excess demand**, raise taxes, cut non-essential spending, borrow from the public (contractionary); against **deficient demand**, cut taxes, raise public works spending, put idle savings to use (expansionary).\n- **Not fiscal**: the repo rate, reserve ratios and open market operations are **monetary** tools of the central bank.',
      terms: [['Fiscal policy', 'Policy on government taxes, spending and borrowing used to influence the economy.'], ['Expansionary fiscal policy', 'Lower taxes or higher public spending to raise aggregate demand.'], ['Contractionary fiscal policy', 'Higher taxes or lower public spending to reduce aggregate demand.']],
      v: vInstruments,
      vs: [vTwoGaps, vFpMp],
    },
    {
      h: '2. Public revenue; tax and fee',
      t: 2,
      b: '- **Public revenue**: the income of the government from **taxes** and **non-tax sources** (fees, fines, interest, dividends and profits of public enterprises, grants).\n- **Tax**: a compulsory payment; there is **no quid pro quo** (no specific service in return).\n- **Fee**: a payment for a **specific service** (registration, licence); only users pay.\n- **Impact**: on the person who pays the tax to the government. **Incidence**: on the person who finally bears its money burden.',
      terms: [['Tax', 'A compulsory payment to the government with no direct return of a service.'], ['Fee', 'A payment for a specific service provided by the government.'], ['Incidence of a tax', 'The final resting place of the money burden of a tax.']],
      v: vTaxFee,
      vs: [vShift],
    },
    {
      h: '3. Direct and indirect taxes',
      t: 2,
      b: '- **Direct tax**: impact and incidence on the **same person**; cannot be shifted. Examples: income tax, corporation tax.\n- **Indirect tax**: imposed on one person, **passed on** to another through prices. Examples: the **Goods and Services Tax** (in force since **1 July 2017**), customs duties.\n- **Merits of direct taxes**: can be **progressive** (equity), **certain** for taxpayer and government, and taxpayers are aware of them. **Demerits**: open to **evasion**, inconvenient lump-sum payments.\n- **Merits of indirect taxes**: **wide coverage**, convenient small payments, hard to evade at sale, can **discourage harmful goods**. **Demerits**: **regressive** in effect, raise prices, uncertain yield.',
      terms: [['Direct tax', 'A tax whose burden falls on the person on whom it is imposed.'], ['Indirect tax', 'A tax whose burden can be shifted to others, usually through prices.']],
      v: vDirInd,
    },
    {
      h: '4. Progressive, proportional and regressive taxes',
      t: 2,
      b: `- Classify by the **average rate** (tax ÷ income × 100) as income rises: **progressive** if it rises, **proportional** if constant, **regressive** if it falls.\n- **Slab calculation**: each rate applies **only to the income inside its slab**. Imagined Taranagar (${slabText}): ₹${inr(INCOMES[1])} pays ₹${inr(PROG[1])} (${PROG_AVG[1]} per cent); ₹${inr(INCOMES[2])} pays ₹${inr(PROG[2])} (${PROG_AVG[2]} per cent).\n- **Marginal rate**: the rate on the **last rupee** of income (the slab it falls in).\n- A flat **per-family levy** is regressive: ₹${inr(FLAT)} is ${REG_AVG[0]} per cent of ₹${inr(INCOMES[0])} but ${REG_AVG[2]} per cent of ₹${inr(INCOMES[2])}.`,
      terms: [['Progressive tax', 'A tax whose rate rises as income rises.'], ['Proportional tax', 'A tax charged at the same rate on every income.'], ['Regressive tax', 'A tax whose burden falls as a share of income as income rises.']],
      v: vRates,
      vs: [vTaraTable, vTaxKinds],
    },
    {
      h: '5. Public expenditure',
      t: 3,
      b: `- **Meaning**: spending by central, state and local governments on goods and services, salaries, **transfers** (pensions, scholarships, subsidies) and **assets**.\n- **Kinds**: developmental (raises productive capacity) and non-developmental (administration, interest).\n- **Importance**: (1) **infrastructure** private firms will not provide; (2) **human capital**: education and health; (3) **employment** and **stability** in slumps, through the multiplier; (4) **reducing inequality** through transfers and free services; (5) defence and law and order.\n- Imagined Sahyagiri: total ₹${SAH_TOTAL} crore; education and health ₹${SAH_SOCIAL} crore (${pct(SAH_SOCIAL / SAH_TOTAL)} per cent).`,
      terms: [['Public expenditure', 'Spending by central, state and local governments.'], ['Transfer payment', 'A payment made without any good or service in return, such as a pension.']],
      v: vPeRoles,
      vs: [vPeKinds, vSah],
    },
    {
      h: '6. Public debt, its redemption, and deficit financing',
      t: 4,
      b: `- **Public debt**: government borrowing that must be **repaid with interest**. **Internal** (from citizens, banks, institutions at home) and **external** (from abroad; heavier burden, needs foreign exchange).\n- **Methods of redemption**: **sinking fund** (a fixed sum yearly into a separate fund; ₹${SINK.debt} crore over ${SINK.years} years = ₹${SINK_ANNUAL} crore a year); **conversion** (high-interest into low-interest loans; ₹${CONV.amount} crore from ${pct(CONV.oldRate)} to ${pct(CONV.newRate)} per cent saves ₹${CONV_SAVE} crore a year); **surplus budget**; **terminal annuity** (equal yearly instalments; ₹${ANN.debt} crore over ${ANN.years} years = ₹${ANN_YEAR} crore); **capital levy** (one-time tax on wealth); **refunding** (new loans repay old ones; only **postpones** repayment).\n- **Deficit financing**: in the Indian sense, meeting a budget gap by **borrowing from the central bank**, which creates **new money**; overuse leads to **inflation**.`,
      terms: [['Public debt', 'Loans raised by the government that must be repaid with interest.'], ['Sinking fund', 'A fund built by setting aside a fixed sum every year to repay a loan at maturity.'], ['Deficit financing', 'Meeting a budget gap by borrowing from the central bank, creating new money.']],
      v: vRedeem,
      vs: [vDebtKinds, vSink, vConv, vDeficitFin],
    },
  ],
  tips: '**Common mistakes**\n- Listing the repo rate or CRR as fiscal tools (they are monetary).\n- Calling a tax progressive because the rich pay more rupees: compare **rates**.\n- Applying the top slab rate to the whole income.\n- Saying refunding reduces debt: it only **postpones** it.\n- Defining deficit financing as "any deficit": it is meeting the gap by **borrowing from the central bank**.\n\n**How marks are usually awarded**\n- 1 mark: a correct option or a one-line answer.\n- 2 marks: two points, or a point with an example.\n- 3 marks: three distinct points, or a calculation with a conclusion.\n- 5 marks (and ISC 4- and 8-mark questions): parts answered separately, with working and a reasoned judgement.\n\nBudget components and the revenue, fiscal and primary deficits are in the next chapter.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['**Fiscal policy**', 'Government use of **taxes, spending and borrowing** to influence the economy.', 'definition', 1],
  ['Three fiscal instruments', 'Taxation; public expenditure; public borrowing.', 'fact', 1],
  ['Fiscal policy against **excess demand**', 'Raise taxes, cut non-essential spending, borrow from the public.', 'concept', 1],
  ['Fiscal policy against **deficient demand**', 'Cut taxes, raise public works spending, spend idle savings.', 'concept', 1],
  ['Who runs fiscal policy? Monetary policy?', 'Fiscal: the **government**. Monetary: the **central bank**.', 'exam-tip', 1],
  ['**Tax**', 'A compulsory payment with **no direct return** of a service.', 'definition', 2],
  ['Tax versus **fee**', 'A fee is paid for a **specific service**; a tax is not.', 'concept', 2],
  ['**Impact** of a tax', 'On the person who pays it to the government.', 'definition', 2],
  ['**Incidence** of a tax', 'On the person who finally bears its money burden.', 'definition', 2],
  ['**Direct tax**', 'Impact and incidence on the **same person**; e.g. income tax.', 'definition', 2],
  ['**Indirect tax**', 'Shifted to buyers through prices; e.g. GST, customs duty.', 'definition', 2],
  ['When did GST come into force in India?', '**1 July 2017**; it is an indirect tax.', 'fact', 2],
  ['**Progressive tax**', 'The **rate rises** as income rises.', 'definition', 2],
  ['**Proportional tax**', 'The **same rate** at every income.', 'definition', 2],
  ['**Regressive tax**', 'The **rate falls** as income rises; e.g. a flat levy per family.', 'definition', 2],
  ['Average rate of tax', 'Tax ÷ income × 100.', 'formula', 2],
  ['**Marginal rate** of tax', 'The rate on the last rupee of income (its slab).', 'definition', 2],
  ['Taranagar (imagined): tax on ₹8,00,000', `₹${inr(T8)}; average ${T8_AVG} per cent; marginal 20 per cent.`, 'example', 2],
  ['Why are indirect taxes called regressive in effect?', 'Poorer families spend a **larger share** of income on taxed goods.', 'concept', 2],
  ['**Public expenditure**', 'Spending by central, state and local governments.', 'definition', 3],
  ['**Transfer payment**', 'A payment with nothing produced in return: pensions, scholarships.', 'definition', 3],
  ['Four roles of public expenditure', 'Infrastructure; human capital; jobs and stability; less inequality.', 'concept', 3],
  ['Developmental versus non-developmental spending', 'Raises productive capacity (dams, schools) versus keeps the state running (interest, administration).', 'concept', 3],
  ['**Public debt**', 'Government loans that must be **repaid with interest**.', 'definition', 4],
  ['Internal versus external debt', 'Borrowed at home versus abroad; external is the heavier burden.', 'concept', 4],
  ['**Sinking fund**', 'A fixed sum set aside yearly in a separate fund to repay at maturity.', 'definition', 4],
  ['Sinking fund: ₹600 crore over 12 years', `₹${SINK_ANNUAL} crore a year (interest ignored).`, 'example', 4],
  ['**Conversion** of debt', 'Replacing high-interest loans with low-interest ones.', 'definition', 4],
  ['Methods that reduce debt versus one that only postpones it', 'Sinking fund, surplus budget, terminal annuity, capital levy versus **refunding**.', 'exam-tip', 4],
  ['**Deficit financing** (Indian sense)', 'Meeting a budget gap by **borrowing from the central bank**; risk: **inflation**.', 'definition', 4],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'isc-12-default-chapter-test-short',
  title: 'Chapter test (short) — Fiscal Policy',
  duration: 50,
  sections: [
    { id: 'A', title: 'Section A — Objective (5 marks)', instr: 'Answer all questions. Each carries 1 mark. Choose the correct option.', items: ['m_fp_meaning', 'm_direct_tax', 'm_pe_meaning', 'm_sinking_fund', 'ar_fp_ad'] },
    { id: 'B', title: 'Section B — Short answer (4 marks)', instr: 'Answer both questions in about 30–50 words each. Question 7 has an internal choice.', items: ['s_direct_indirect', { attempt: 1, keys: ['s_redeem_two', 's_fp_vs_mp'] }] },
    { id: 'C', title: 'Section C — Short answer (6 marks)', instr: 'Answer both questions in about 50–80 words each. Question 9 has an internal choice.', items: ['s3_fp_instruments', { attempt: 1, keys: ['s3_tara_compare', 's3_pe_importance'] }] },
    { id: 'D', title: 'Section D — Long answer (5 marks)', instr: 'Answer the question in parts, showing your working.', items: ['l_taxes_full'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'isc-12-default-chapter-test-long',
  title: 'Chapter test (long) — Fiscal Policy',
  duration: 100,
  sections: [
    { id: 'A', title: 'Section A — Objective (12 marks)', instr: 'Answer all questions. Each carries 1 mark. Choose the correct option.', items: ['m_fp_instrument', 'm_fp_recession', 'm_indirect_shift', 'm_gst_type', 'm_proportional', 'm_pe_growth', 'm_pe_transfer', 'm_conversion', 'm_capital_levy', 'm_deficit_financing', 'ar_indirect_regressive', 'ar_deficit_inflation'] },
    { id: 'B', title: 'Section B — Short answer (6 marks)', instr: 'Answer all three questions in about 30–50 words each. Question 15 has an internal choice.', items: ['s_prog_prop', 's_pe_two_roles', { attempt: 1, keys: ['s_internal_external', 's_deficit_fin_meaning'] }] },
    { id: 'C', title: 'Section C — Short answer (12 marks)', instr: 'Answer all four questions in about 50–80 words each. Question 19 has an internal choice.', items: ['s3_fp_slump', 's3_regressive_case', 's3_redeem_three', { attempt: 1, keys: ['s3_pe_choose', 's3_debt_numbers'] }] },
    { id: 'D', title: 'Section D — Long answer (10 marks)', instr: 'Answer question 20, and either question 21 or question 22, in parts with working.', items: ['l_fp_two_situations', { attempt: 1, keys: ['l_debt_full', 'l_pe_full'] }] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t04 of isc-12-economics-ch16 only (fiscal policy and its instruments; public revenue and taxes; public expenditure; public debt, redemption and deficit financing); budget components and deficit measures left to ch17',
    style: 'ISC 2027 Economics specimen pattern (sources/cisce.md isc-2027-specimen-856-economics): 1-mark MCQs, assertion-reason with option (d) both false, 4-mark (2 + 2) and 8-mark (4 + 4) bank items; chapter tests on the isc-12-default blueprints',
    originality: 'every government, state, person, schedule and case written for this chapter (imagined); no textbook, specimen or past-paper item reused; set-ups differ from SOYL CBSE 12 Economics ch04',
    data: `figures computed in questions.mjs and asserted: Taranagar slabs give ${PROG.map(inr).join(', ')} on ${INCOMES.map(inr).join(', ')} (${PROG_AVG.join(', ')} per cent), ${inr(T8)} on ${inr(Y8)} (${T8_AVG} per cent), ${inr(T45)} on ${inr(Y45)}; flat levy ${inr(FLAT)} = ${REG_AVG.join(', ')} per cent; sinking fund ${SINK.debt} ÷ ${SINK.years} = ${SINK_ANNUAL}; conversion ${CONV_OLD} − ${CONV_NEW} = ${CONV_SAVE}; annuity ${ANN.debt} ÷ ${ANN.years} = ${ANN_YEAR}; Sahyagiri ${SAH_SOCIAL} of ${SAH_TOTAL}`,
    facts: 'GST in force from 1 July 2017 (an indirect tax); deficit financing defined in the Indian sense (borrowing from the central bank); all tax rates and slabs imagined, no current Indian rates',
    gate: 'schema, pipeline lint (lintExemplar), deterministic verify checks, the answer-leak scan and the exact-stem originality pre-check run clean on this chapter',
  },
});
