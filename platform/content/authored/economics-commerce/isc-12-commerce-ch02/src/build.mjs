// Build ISC 12 Commerce ch02 Business Finance, Financial Planning and Capital. Run from platform/:
//   npx tsx content/authored/economics-commerce/isc-12-commerce-ch02/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';

setUnit('isc-12-commerce-ch02', 'economics-commerce');
const { GG, UU, inr } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- visuals
const vRoute1 = flow('LR', ['Why business needs finance', 'Sources by form of business', 'Financial planning'], 'Route map of Part 1: why business needs finance, sources for each form of business, and financial planning', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Capital structure', 'Trading on equity', 'Fixed capital', 'Working capital'], 'Route map of Part 2: capital structure, trading on equity, fixed capital and working capital', 'Part 2 at a glance');

const vNeeds = flow('LR', ['Start: buy land, plant, licences', 'Run: materials, wages, bills', 'Grow: expand, modernise', 'Meet shocks: reserves'], 'Flow showing four stages at which a business needs finance: to start, to run day to day, to grow or modernise, and to meet sudden shocks', 'Finance is needed at every stage, not only at the start.');

const vSources = table(
  ['Form of business', 'Owners\' funds', 'Borrowed funds'],
  [
    ['Sole proprietorship', 'Owner\'s savings; ploughed-back profit', 'Loans from relatives or a bank on personal credit; trade credit'],
    ['Partnership', 'Partners\' capital; admitting a new partner', 'Partners\' loans; bank loans; trade credit'],
    ['Joint stock company', 'Equity and preference shares; retained earnings', 'Debentures; public deposits; loans from banks and institutions; trade credit'],
  ],
  'Table comparing owners\' funds and borrowed funds available to a sole proprietorship, a partnership and a joint stock company',
);
const vSourceEx = table(
  ['Imagined need', 'Form', 'Sensible source', 'Why'],
  [
    ['Second oven for Bhimtal Bakery', 'Sole trader', 'Owner\'s savings plus a small bank loan', 'Keeps full control; modest sum'],
    ['Two buses for Teesta Travels', 'Partnership', 'Admit a new partner', 'Fresh capital, no interest'],
    ['New lens plant for Lonar Lenses Ltd', 'Company', 'Equity shares and debentures', 'Very large, long-term sum'],
  ],
  'Worked table matching three imagined needs to a form of business, a sensible source and the reason',
  'Ask: who owns the firm, how much is needed, and for how long?',
);
// Funds pyramid: a sole trader's narrow base versus a company's wide base.
const vReach = (() => {
  const s = new Svg(560, 260);
  const bar = (y, w, label, note, color) => {
    s.rect(280 - w / 2, y, w, 52, { fill: color, fillOpacity: 0.16, color, sw: 1.5, rx: 8 });
    s.text(280, y + 20, label, { bold: true, size: 14 }).text(280, y + 39, note, { size: 12 });
  };
  bar(20, 220, 'Sole trader', 'one owner\'s savings and credit', 'red');
  bar(90, 360, 'Partnership', 'several partners, up to the legal limit', 'yellow');
  bar(160, 520, 'Joint stock company', 'shares and debentures sold to thousands of investors', 'green');
  s.text(280, 240, 'Wider ownership base, larger funds', { size: 12, muted: true });
  return s.visual('Three stacked bars of growing width: sole trader at the top, with one owner\'s savings and credit; partnership in the middle, with several partners; joint stock company at the bottom and widest, with shares and debentures sold to thousands of investors. A wider ownership base means larger funds', 'The wider the ownership base, the larger the funds a business can raise.');
})();

const vFpFeatures = table(
  ['Feature of a sound plan', 'What it asks'],
  [
    ['Simplicity', 'Can managers understand and follow it?'],
    ['Foresight', 'Does it look ahead to future needs?'],
    ['Flexibility', 'Can it be adjusted when costs or sales change?'],
    ['Optimum use of funds', 'Is every rupee put to productive use?'],
    ['Liquidity', 'Is there enough cash for current payments?'],
    ['Economy', 'Are funds raised at the lowest suitable cost?'],
  ],
  'Table of six features of a sound financial plan with the question each feature asks',
);
const vFpImportance = table(
  ['Benefit of financial planning', 'Imagined illustration'],
  [
    ['Funds available when needed', 'A cashew unit arranges a loan before the harvest'],
    ['No unnecessary funds', 'A software firm borrows only what its project costs'],
    ['Links investment and financing', 'A new machine is matched with a suitable loan'],
    ['Prepares for surprises', 'A houseboat firm keeps a standby limit'],
    ['Basis for control', 'Actual spending is compared with monthly targets'],
    ['Less waste and duplication', 'Departments plan spending together'],
  ],
  'Table of six benefits of financial planning, each with an imagined illustration',
);
const vFpEx = table(
  ['Month (imagined)', 'Cash in (₹ lakh)', 'Cash out (₹ lakh)', 'Plan'],
  [
    ['September', '8', '6', 'Build a small cushion'],
    ['October', '9', '17', 'Draw ₹8 lakh from a seasonal loan'],
    ['November', '24', '14', 'Repay part of the loan'],
    ['December', '22', '12', 'Clear the loan; review next year'],
  ],
  'Worked month-by-month cash plan of an imagined sweater maker: in October cash out exceeds cash in by eight lakh rupees, met by a seasonal loan that is repaid in November and December',
  'Imagined cash plan of Nilgiri Knitwear, Ooty.',
);

// Capital structure balance: debt on one pan, equity on the other.
const vBalance = (() => {
  const s = new Svg(560, 300);
  s.line(280, 60, 280, 250, { sw: 3 });
  s.polygon([[250, 260], [310, 260], [280, 235]], { fill: 'muted', fillOpacity: 0.4, color: 'muted', sw: 1.5 });
  s.line(90, 80, 470, 80, { sw: 3 });
  s.line(110, 80, 110, 120, { sw: 1.5 }).line(450, 80, 450, 120, { sw: 1.5 });
  s.rect(30, 120, 160, 120, { fill: 'blue', fillOpacity: 0.12, color: 'blue', sw: 1.5 });
  s.rect(370, 120, 160, 120, { fill: 'green', fillOpacity: 0.12, color: 'green', sw: 1.5 });
  s.text(110, 140, 'Debt', { bold: true }).text(110, 165, 'cheaper (tax saving)', { size: 12 }).text(110, 185, 'no loss of control', { size: 12 }).text(110, 205, 'but fixed interest', { size: 12 }).text(110, 225, 'and higher risk', { size: 12 });
  s.text(450, 140, 'Equity', { bold: true }).text(450, 165, 'no fixed charge', { size: 12 }).text(450, 185, 'low risk to the firm', { size: 12 }).text(450, 205, 'but costlier', { size: 12 }).text(450, 225, 'and dilutes control', { size: 12 });
  s.text(280, 30, 'Capital structure: finding the balance', { bold: true });
  return s.visual('A balance with debt on the left pan (cheaper because of the tax saving, no loss of control, but fixed interest and higher risk) and equity on the right pan (no fixed charge and low risk to the firm, but costlier and dilutes control)', 'Capital structure balances the cost and control benefits of debt against its risk.');
})();
const vCsFactors = table(
  ['Factor', 'Points towards more debt when…'],
  [
    ['Cost of debt and tax', 'Interest is low and the tax rate is high'],
    ['Return on investment', 'Return exceeds the interest rate (trading on equity)'],
    ['Cash flow position', 'Cash inflows are steady and strong'],
    ['Risk', 'Business risk is low'],
    ['Control', 'Owners do not want new voting shareholders'],
    ['Flexibility', 'Unused borrowing capacity will remain'],
    ['Market conditions', 'Share prices are depressed'],
  ],
  'Table of seven factors affecting capital structure and the condition under which each favours more debt',
);
const vToe = table(
  ['Item (₹)', 'Plan A: all equity', 'Plan B: half debt'],
  [
    ['EBIT', inr(GG.A.ebit), inr(GG.B.ebit)],
    ['Interest at 10 per cent', '0', inr(GG.B.interest)],
    ['Profit before tax', inr(GG.A.ebt), inr(GG.B.ebt)],
    ['Tax at 25 per cent', inr(GG.A.taxAmt), inr(GG.B.taxAmt)],
    ['Profit after tax', inr(GG.A.eat), inr(GG.B.eat)],
    ['Number of equity shares', inr(GG.A.shares), inr(GG.B.shares)],
    ['EPS', `₹${GG.A.eps}`, `₹${GG.B.eps}`],
  ],
  'Worked table for an imagined glass company raising forty lakh rupees: with EBIT of eight lakh, Plan A (all equity) gives EPS of one rupee fifty, Plan B (half debt at ten per cent) gives EPS of two rupees twenty-five',
  'Imagined: Godavari Glassworks Ltd. Return on capital 20 per cent > interest 10 per cent, so debt lifts EPS.',
);
const vToeBad = table(
  ['EBIT (₹)', 'Return on ₹40 lakh', 'EPS Plan A', 'EPS Plan B', 'Better plan'],
  [
    [inr(800000), '20 per cent', `₹${GG.A.eps}`, `₹${GG.B.eps}`, 'B (debt)'],
    [inr(400000), '10 per cent', '₹0.75', '₹0.75', 'Equal'],
    [inr(300000), '7.5 per cent', `₹${GG.A2.eps}`, `₹${GG.B2.eps}`, 'A (equity)'],
  ],
  'Table of EPS under two plans at three levels of EBIT: at a twenty per cent return the debt plan wins, at ten per cent the plans are equal, at seven and a half per cent the equity plan wins',
  'Trading on equity cuts both ways: it helps only while return exceeds the interest rate.',
);

const vFcFactors = table(
  ['Factor', 'More fixed capital when…', 'Imagined example'],
  [
    ['Nature of business', 'Heavy assets are needed before earning', 'A hill cable-car line'],
    ['Scale of operations', 'Output is large', 'A large steel-tube maker'],
    ['Choice of technique', 'The process is capital-intensive', 'An automatic soap plant'],
    ['Technology upgradation', 'Machines go out of date fast', 'Rolling mills replaced often'],
    ['Growth prospects', 'Demand is expected to rise', 'A lens maker adds capacity'],
    ['Diversification', 'New product lines are added', 'Lenses plus sunglasses'],
    ['Financing alternatives', 'Assets are bought, not leased', 'Leasing a scanner reduces need'],
    ['Level of collaboration', 'Facilities are not shared', 'Shared chilling plant reduces need'],
  ],
  'Table of eight factors affecting fixed capital, when each raises the requirement, and an imagined example',
);
const vFcEx = table(
  ['Choice by Lonar Lenses Ltd (imagined)', 'Factor', 'Fixed capital'],
  [
    ['Adds sunglasses and contact lenses', 'Diversification', 'Rises'],
    ['Leases delivery vans', 'Financing alternatives', 'Falls'],
    ['Buys a robotic polishing line', 'Choice of technique', 'Rises'],
  ],
  'Worked table of three choices by an imagined lens company, the factor each shows and whether fixed capital rises or falls',
  'Name the factor first, then state the direction of the effect.',
);

// Working capital over the year: permanent floor and seasonal peaks.
const vWcChart = (() => {
  const s = new Svg(560, 300);
  const c = s.chart({ x0: 0, x1: 12, y0: 0, y1: 12, left: 60, top: 30, width: 440, height: 210, xLabel: 'Months', yLabel: '₹ lakh' });
  const pts = [[0, 6], [1, 6], [2, 6], [3, 6.5], [4, 6], [5, 6], [6, 6], [7, 6], [8, 7], [9, 8.5], [10, 10], [11, 10], [11.6, 7], [12, 6]];
  c.fn(() => 6, 0, 12, { color: 'blue', sw: 2, dash: true });
  s.polyline(pts.map(([x, y]) => [c.X(x), c.Y(y)]), { color: 'accent', sw: 2.5 });
  c.yTick(6, '6').yTick(10, '10');
  c.label([2.5, 6], 'Permanent working capital', { dy: 16, size: 12, color: 'blue' });
  c.label([10.3, 10], 'Temporary (festival peak)', { dy: -14, size: 12 });
  c.xTick(4, 'Apr').xTick(8, 'Aug').xTick(12, 'Dec');
  return s.visual('Line chart of working capital over twelve months: a dashed flat line at 6 lakh rupees marks the permanent level; the actual line rises above it to 10 lakh rupees in the festival months and falls back to 6 lakh, showing temporary working capital', 'Imagined: Gomti Garments. The floor is permanent; the hump above it is temporary.');
})();
const vWcFactors = table(
  ['Factor', 'More working capital when…'],
  [
    ['Nature of business', 'The firm is a manufacturer or trader, not a pure service'],
    ['Scale of operations', 'Output and sales are large'],
    ['Business cycle', 'There is a boom'],
    ['Seasonal factors', 'It is the peak season'],
    ['Production cycle', 'The cycle is long'],
    ['Credit allowed', 'Customers get long credit'],
    ['Credit availed', 'Suppliers give little credit'],
    ['Operating efficiency', 'Stock and cash are used inefficiently'],
    ['Availability of raw material', 'Material is seasonal or scarce'],
    ['Growth, competition, inflation', 'Sales grow, rivals offer more, or prices rise'],
  ],
  'Table of factors affecting working capital and the condition under which each raises the requirement',
);
const vWcEx = table(
  ['Item (imagined: Ujjain Utensils)', '₹'],
  [
    ['Stock + debtors + cash', `${inr(UU.stock)} + ${inr(UU.debtors)} + ${inr(UU.cash)}`],
    ['Gross working capital (total current assets)', inr(UU.ca)],
    ['Less: creditors + wages due', `${inr(UU.creditors)} + ${inr(UU.wages)}`],
    ['Total current liabilities', inr(UU.cl)],
    ['Net working capital', inr(UU.net)],
  ],
  'Worked table for an imagined utensil wholesaler: current assets of nine lakh forty thousand rupees less current liabilities of five lakh sixty thousand rupees give net working capital of three lakh eighty thousand rupees',
  'Gross = total current assets; net = gross less current liabilities.',
);
const vFcVsWc = table(
  ['Basis', 'Fixed capital', 'Working capital'],
  [
    ['Purpose', 'Long-term assets', 'Day-to-day operations'],
    ['Period', 'Many years', 'Turns over within a year'],
    ['Sources', 'Long-term: shares, debentures, term loans', 'Mainly short-term: trade credit, bank overdraft'],
    ['Liquidity', 'Low', 'High'],
    ['Decision', 'Hard to reverse', 'Adjusted often'],
  ],
  'Table distinguishing fixed capital and working capital on purpose, period, sources, liquidity and reversibility of decisions',
);
const vSummary1 = table(
  ['Idea', 'Key point'],
  [['Finance', 'Needed to start, run, grow and meet shocks'], ['Sole trader', 'Owner\'s savings and personal credit'], ['Partnership', 'Partners\' capital, new partners, loans'], ['Company', 'Shares, debentures, retained earnings, deposits, loans'], ['Financial planning', 'Blueprint: how much, when, from where']],
  'Summary table of Part 1: finance, sources for each form of business and financial planning',
);
const vSummary2 = table(
  ['Idea', 'Key point'],
  [['Capital structure', 'Mix of debt and equity'], ['Trading on equity', 'Helps only when return exceeds interest'], ['Fixed capital', 'Long-term assets; nature, scale, technique and more'], ['Working capital', 'Gross, net, permanent, temporary; cycle, credit, season'], ['Fixed vs working', 'Purpose, period, sources']],
  'Summary table of Part 2: capital structure, trading on equity, fixed capital and working capital',
);
const vCaseSteps = flow('LR', ['Quote the fact', 'Name the factor', 'State its effect'], 'Three steps for case questions: quote the fact, name the factor, and state its effect');

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Business Finance — Part 1: Need for Finance, Sources and Financial Planning',
  goals: [
    'Explain why a business needs finance at every stage',
    'Compare the sources of finance open to a sole trader, a partnership and a company',
    'Explain the meaning, features and importance of financial planning',
  ],
  slides: [
    sl('title', 'Business Finance, Financial Planning and Capital', {
      b: 'Part 1: why business needs **finance**, the **sources** open to each form of business, and **financial planning**.',
      v: vRoute1,
      n: 'Every business, from a roadside bakery to a giant solar company, runs on money. In this part we see why finance is needed, where each type of business can find it, and how a financial plan makes sure the money is there at the right time.',
    }),
    sl('diagram', 'Why business needs finance', {
      b: 'Finance is the **lifeblood** of business: it is needed to **start**, to **run**, to **grow** and to **meet shocks**.',
      v: vNeeds,
      n: 'A business needs money before it earns any, to buy land, machines and licences. It needs money every day to buy materials and pay wages and bills. It needs fresh money to expand or modernise. And it needs a reserve to survive sudden shocks such as a flood or a lost customer.',
    }),
    sl('check', 'Quick check: only at the start?', {
      b: 'True or false: a business needs finance only when it is started.',
      chk: 'tf_fin_start',
      n: 'Think of the four stages on the last slide.',
    }),
    sl('concept', 'Sources by form of business', {
      v: vSources,
      n: 'Who owns the business decides where it can find money. A sole trader relies on personal savings and personal credit. A partnership can add partners\' capital, admit new partners and borrow. A company can sell shares and debentures to the public, retain profits and take large loans. Trade credit is open to all.',
    }),
    sl('diagram', 'The wider the base, the larger the funds', {
      v: vReach,
      n: 'Picture three bars. A sole trader has the narrowest base: one person\'s savings and credit. A partnership is wider, with several partners. A company is widest, because it can sell shares and debentures to thousands of investors. That is why big projects are usually run by companies.',
    }),
    sl('example', 'Worked example 1: matching need and source', {
      b: 'Three imagined firms, three needs.',
      bl: ['Step 1: identify the **form** of business.', 'Step 2: judge the **size** and **period** of the need.', 'Step 3: pick a source open to that form and explain why.'],
      v: vSourceEx,
      n: 'A bakery owner wanting a second oven can use her savings and a small bank loan, keeping full control. A travel partnership wanting buses can admit a new partner, bringing capital with no interest. A lens company building a plant needs a very large, long-term sum, so it can issue shares and debentures.',
    }),
    sl('check', 'Quick check: a sole trader\'s options', {
      b: 'Which source is **not** open to a sole trader?',
      chk: 'm_sole_source',
      n: 'Which source belongs only to companies?',
    }),
    sl('concept', 'What is financial planning?', {
      b: '**Financial planning** prepares a **blueprint** of future money needs: **how much**, **when**, and **from where**. Its twin aims: funds **when needed**, and **no idle surplus**.',
      v: flow('LR', ['Estimate needs', 'Time them', 'Choose sources', 'Review and revise'], 'Flow of financial planning: estimate needs, time them, choose sources, and review and revise', 'A plan is reviewed as conditions change.'),
      n: 'Financial planning looks ahead. It estimates how much money the business will need, when it will need it, and where it will come from. It has two aims. Money must be ready when it is needed, and the firm must not raise more than it needs, because idle money still costs interest.',
    }),
    sl('concept', 'Features of a sound financial plan', {
      v: vFpFeatures,
      n: 'A good plan is simple, so that managers can follow it. It shows foresight, looking well ahead. It is flexible, so that it can change with costs and sales. It puts funds to their best use, keeps enough cash for current bills, and raises money at the lowest suitable cost.',
    }),
    sl('check', 'Quick check: a standby limit', {
      b: 'A houseboat firm\'s plan includes a standby bank limit for sudden repair costs. Which feature is this?',
      chk: 'm_fp_flex',
      n: 'Can the plan bend when costs change?',
    }),
    sl('concept', 'Why financial planning matters', {
      v: vFpImportance,
      n: 'Financial planning brings six benefits. Funds arrive when needed. No unnecessary money is raised. Investment and financing decisions are linked. The firm is ready for surprises. Managers can compare actual spending with the plan. And waste and duplication between departments fall.',
    }),
    sl('example', 'Worked example 2: a seasonal cash plan', {
      b: 'An imagined sweater maker in Ooty sells mostly from October to January.',
      bl: ['Step 1: list expected **cash in** and **cash out** each month.', 'Step 2: find the **gap** (October: 17 − 9 = ₹8 lakh short).', 'Step 3: plan a **source** for the gap and a **repayment** date.'],
      v: vFpEx,
      n: 'Here the firm spends heavily in October on wool and wages, before festival sales come in. The plan shows an eight lakh rupee gap, so it arranges a seasonal loan in advance. As sales pour in during November and December, it repays the loan instead of letting surplus cash lie idle.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up. Finance is needed to start, run, grow and survive shocks. A sole trader relies on personal savings and credit, a partnership on its partners, and a company can tap the public. Financial planning is a blueprint of how much money is needed, when and from where.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Always check the **form of business** before naming a source.', 'Learn the two **objectives** of financial planning: funds when needed; no idle surplus.', 'For features, use the case words: **simple, look ahead, flexible, liquid, economical**.', 'Link each point to the **firm in the question**.'],
      v: vCaseSteps,
      n: 'Some tips. Before naming a source, check whether the firm is a sole trader, a partnership or a company. Remember the two objectives of financial planning. When a case describes a plan, look for the clue words that reveal each feature, and always tie your answer to the firm.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Business Finance — Part 2: Capital Structure, Fixed Capital and Working Capital',
  goals: [
    'Discuss the factors that decide the mix of debt and equity, including trading on equity',
    'Explain the factors affecting fixed capital requirements',
    'Distinguish types of working capital, explain its factors and compare it with fixed capital',
  ],
  slides: [
    sl('title', 'Capital Structure, Fixed and Working Capital', {
      b: 'Part 2: the **mix** of debt and equity, **trading on equity**, and how much **fixed** and **working** capital a firm needs.',
      v: vRoute2,
      n: 'In this part we ask two questions. How should a company mix borrowed money and owners\' money? And how much does it need for long-term assets and for day-to-day running? The answers depend on factors you can spot in any case.',
    }),
    sl('diagram', 'Capital structure: debt or equity?', {
      b: '**Capital structure** is the proportion of **debt** (borrowed funds) and **equity** (owners\' funds) in long-term finance.',
      v: vBalance,
      n: 'Think of a balance. Debt is cheaper, because interest saves tax, and lenders get no vote. But interest is a fixed charge, so more debt means more risk. Equity has no fixed charge, but it costs more and brings in new voting owners. The right mix balances these.',
    }),
    sl('concept', 'Factors affecting capital structure', {
      v: vCsFactors,
      n: 'Seven factors guide the choice. The cost of debt and the tax rate. Whether the return on investment beats the interest rate. How steady the cash flow is. The level of business risk. Whether owners want to keep control. The need to keep some borrowing power in reserve. And the state of the share market.',
    }),
    sl('example', 'Worked example 1: trading on equity', {
      b: `An imagined glass company needs ₹${inr(GG.need)}. EBIT ₹${inr(GG.A.ebit)}; tax 25 per cent.`,
      bl: ['Step 1: deduct **interest** to get profit before tax.', 'Step 2: deduct **tax** to get profit after tax.', 'Step 3: divide by the **number of equity shares**.'],
      v: vToe,
      n: 'Plan A uses only equity. Plan B borrows half at ten per cent. Under Plan B the interest is two lakh rupees, but there are only half as many shares. Because the company earns twenty per cent on its capital, double the interest rate, earnings per share rise from one rupee fifty to two rupees twenty five.',
    }),
    sl('example', 'Worked example 2: when debt hurts', {
      b: 'Same two plans, three levels of EBIT.',
      bl: ['Step 1: work out the **return** on ₹40 lakh.', 'Step 2: compare it with the **10 per cent** interest.', 'Step 3: conclude which plan gives higher EPS.'],
      v: vToeBad,
      n: 'Now let earnings vary. At a twenty per cent return the debt plan wins. At exactly ten per cent, equal to the interest rate, both plans give the same earnings per share. At seven and a half per cent, the debt plan loses. Trading on equity is a double edged sword.',
    }),
    sl('check', 'Quick check: trading on equity', {
      b: 'Trading on equity raises EPS only when…',
      chk: 'm_toe',
      n: 'Compare what borrowed money earns with what it costs.',
    }),
    sl('concept', 'Fixed capital and its factors', {
      b: '**Fixed capital** is invested in **long-term assets**: land, buildings, machinery, vehicles.',
      v: vFcFactors,
      n: 'Fixed capital buys assets that serve the firm for many years. How much is needed depends on the nature and scale of the business, the technique chosen, how fast technology changes, growth plans, diversification, whether assets can be leased, and whether facilities can be shared with other firms.',
    }),
    sl('example', 'Worked example 3: reading choices', {
      b: 'Three choices by an imagined lens company.',
      bl: ['Step 1: name the **factor**.', 'Step 2: state whether fixed capital **rises or falls**.'],
      v: vFcEx,
      n: 'Adding sunglasses and contact lenses is diversification, so more fixed capital is needed. Leasing vans is a financing alternative, so less is needed. Buying a robotic line is a capital intensive technique, so more is needed. Always give the factor and the direction.',
    }),
    sl('check', 'Quick check: leasing', {
      b: 'A lab leases a scanner instead of buying it. What happens to its fixed capital requirement?',
      chk: 'm_fc_lease',
      n: 'Does the lab still have to pay for the whole machine at once?',
    }),
    sl('diagram', 'Working capital: permanent and temporary', {
      b: '**Gross** = total current assets. **Net** = current assets − current liabilities. **Permanent** = year-round minimum. **Temporary** = seasonal extra.',
      v: vWcChart,
      n: 'Working capital pays for stock, debtors and cash. Gross working capital is the total of current assets; net deducts current liabilities. In the chart, the flat floor is permanent working capital, needed all year. The hump in the festival months is temporary working capital, needed only for that season.',
    }),
    sl('example', 'Worked example 4: net working capital', {
      b: 'An imagined utensil wholesaler\'s current items.',
      bl: ['Step 1: add the **current assets**.', 'Step 2: add the **current liabilities**.', 'Step 3: subtract to get **net working capital**.'],
      v: vWcEx,
      n: 'Add stock, debtors and cash to get gross working capital of nine lakh forty thousand rupees. Add creditors and wages due to get current liabilities of five lakh sixty thousand. The difference, three lakh eighty thousand rupees, is net working capital.',
    }),
    sl('concept', 'Factors affecting working capital', {
      v: vWcFactors,
      n: 'Many factors change working capital. Traders and manufacturers need more than service firms. Larger scale, booms and peak seasons need more. A long production cycle, long credit to customers and short credit from suppliers all need more. Inefficiency, scarce raw materials, growth, competition and inflation raise it too.',
    }),
    sl('check', 'Quick check: the festival stock', {
      b: 'A garment maker raises stock by ₹4 lakh before festivals and lowers it afterwards. This extra amount is…',
      chk: 'm_wc_temp',
      n: 'Is it needed all year or only for a season?',
    }),
    sl('two-column', 'Fixed capital versus working capital', {
      cols: ['**Fixed capital**\n\nLong-term assets; many years; long-term sources; low liquidity.', '**Working capital**\n\nDay-to-day operations; within a year; mainly short-term sources; high liquidity.'],
      v: vFcVsWc,
      n: 'Fixed capital is locked in long-term assets for many years and should come from long-term sources. Working capital keeps the daily cycle running, turns over within a year, and is mostly financed from short-term sources. Decisions on fixed capital are hard to reverse; working capital is adjusted often.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up. Capital structure is the mix of debt and equity, decided by cost, return, cash flow, risk, control, flexibility and market conditions. Trading on equity helps only when return beats interest. Fixed capital depends on nature, scale and technique; working capital on cycles, credit and seasons.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['In EPS sums, show **interest, tax, profit after tax and shares** line by line.', 'Always compare **return on investment** with the **interest rate**.', 'For fixed or working capital factors, give the **direction**: rises or falls.', 'Do not mix up **gross** and **net** working capital.'],
      v: vCaseSteps,
      n: 'Final tips. Lay out EPS working line by line, so method marks are safe. Compare return with interest before praising debt. For each factor, say whether the requirement rises or falls. And remember: gross working capital is total current assets, while net deducts current liabilities.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Business Finance, Financial Planning and Capital — notes',
  sections: [
    {
      h: '1. Importance of finance and sources for each form of business',
      t: 1,
      b: '**Business finance** is the money a business needs for its activities. It is called the **lifeblood** of business because it is needed:\n- to **start** (land, buildings, plant, licences);\n- to **run** day-to-day operations (materials, wages, rent, power);\n- to **expand, diversify or modernise**;\n- to **meet contingencies** and use sudden opportunities.\n\n**Sources by form of business:**\n- **Sole proprietorship:** owner\'s savings, ploughed-back profit, loans from friends and relatives, bank loans on personal security, trade credit.\n- **Partnership:** partners\' capital, admitting a new partner, loans from partners, bank loans, trade credit.\n- **Joint stock company:** equity and preference shares, retained earnings, debentures, public deposits, loans from commercial banks and financial institutions, trade credit and other short-term sources.\n\nThe wider the ownership base, the larger the funds that can be raised.',
      terms: [['Business finance', 'Funds required to start, run and grow a business.'], ['Owners\' funds', 'Capital contributed or retained by the owners.'], ['Borrowed funds', 'Funds raised as loans, which carry interest and must be repaid.']],
      v: vNeeds,
      vs: [vSources, vReach],
    },
    {
      h: '2. Financial planning',
      t: 2,
      b: '**Financial planning** is the preparation of a **financial blueprint** of an organisation\'s future operations: an estimate of the funds required, their timing and their sources.\n\n**Objectives:** (i) ensure funds are **available when required**; (ii) see that the firm does **not raise resources unnecessarily**.\n\n**Features of a sound plan:** simplicity; foresight (long-term view); flexibility; optimum use of funds; liquidity; economy (low cost of raising funds); provision for contingencies.\n\n**Importance:** avoids shortage and surplus of funds; links investment and financing decisions; prepares the firm for surprises; reduces waste and duplication; coordinates departments; provides standards for **financial control**.',
      terms: [['Financial planning', 'Preparing a blueprint of future funds: how much, when and from where.'], ['Flexibility (of a plan)', 'Capacity of the plan to be adjusted to changing conditions.']],
      v: vFpFeatures,
      vs: [vFpImportance, vFpEx],
    },
    {
      h: '3. Capital structure',
      t: 3,
      b: '**Capital structure** is the mix of **owners\' funds (equity)** and **borrowed funds (debt)** used to finance a business.\n\n**Debt** is usually cheaper (interest is tax-deductible) and does not dilute control, but it carries a **fixed charge** and raises **financial risk**. **Equity** has no fixed charge but is costlier and dilutes control.\n\n**Factors:** cost of debt; cost of equity; tax rate; return on investment (**trading on equity**); cash flow position; business and financial risk; control; flexibility; floatation costs; stock-market conditions; regulatory framework.\n\n**Trading on equity:** using fixed-cost debt to raise EPS. It works only when **return on investment > rate of interest**; otherwise EPS falls.\n\nEPS = (EBIT − interest − tax) ÷ number of equity shares.',
      terms: [['Capital structure', 'The proportion of debt and equity in long-term finance.'], ['Trading on equity', 'Using debt to increase the return to equity shareholders.'], ['EPS', 'Profit after tax divided by the number of equity shares.']],
      v: vBalance,
      vs: [vCsFactors, vToe, vToeBad],
    },
    {
      h: '4. Fixed capital',
      t: 4,
      b: '**Fixed capital** is the investment in **long-term assets** such as land, buildings, plant, machinery and vehicles. Such decisions involve large sums, last many years and are difficult to reverse.\n\n**Factors affecting fixed capital requirements:**\n- **Nature of business** (manufacturing and utilities need more than trading or service firms).\n- **Scale of operations.**\n- **Choice of technique** (capital-intensive versus labour-intensive).\n- **Technology upgradation** (fast-changing machines need frequent replacement).\n- **Growth prospects.**\n- **Diversification.**\n- **Financing alternatives** (leasing reduces the need).\n- **Level of collaboration** (sharing facilities reduces the need).',
      terms: [['Fixed capital', 'Funds invested in long-term assets.'], ['Leasing', 'Using an asset owned by another in return for periodic rent.']],
      v: vFcFactors,
      vs: [vFcEx],
    },
    {
      h: '5. Working capital',
      t: 5,
      b: '**Working capital** is the investment in **current assets** — stock, debtors, bills receivable, cash — used for day-to-day operations.\n- **Gross working capital** = total current assets.\n- **Net working capital** = current assets − current liabilities.\n- **Permanent (fixed) working capital:** the minimum level needed throughout the year.\n- **Temporary (variable or seasonal) working capital:** the extra needed at peak times.\n\n**Factors:** nature of business; scale; business cycle; seasonal factors; production cycle; credit allowed; credit availed; operating efficiency; availability of raw material; growth prospects; level of competition; inflation.\n\n**Fixed versus working capital:** purpose (long-term assets vs daily operations); period (many years vs within a year); sources (long-term vs mainly short-term); liquidity (low vs high).',
      terms: [['Gross working capital', 'Total current assets.'], ['Net working capital', 'Current assets less current liabilities.'], ['Permanent working capital', 'Minimum current assets needed all year.'], ['Temporary working capital', 'Extra current assets needed for a season or peak.']],
      v: vWcChart,
      vs: [vWcFactors, vWcEx, vFcVsWc],
    },
  ],
  tips: '**Common mistakes**\n- Naming shares or debentures as a source for a sole trader or partnership.\n- Saying trading on equity always raises EPS.\n- Forgetting tax in EPS calculations.\n- Calling net working capital "total current assets".\n- Saying long credit **from suppliers** raises working capital (it reduces it).\n\n**How marks are usually awarded**\n- 1 mark: correct option, term or figure.\n- 2–3 marks: each factor named and linked to the case, with the direction of its effect.\n- 5 marks: parts answered separately; calculations laid out line by line; a recommendation backed by facts from the case.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Why is finance the **lifeblood** of business?', 'Every activity — starting, running, growing, meeting shocks — needs funds.', 'concept', 1],
  ['Sources for a **sole trader**', 'Own savings, ploughed-back profit, loans from relatives or banks, trade credit.', 'fact', 1],
  ['Sources for a **partnership**', 'Partners\' capital, a new partner, partners\' loans, bank loans, trade credit.', 'fact', 1],
  ['Sources only a **company** can use', 'Shares (equity, preference), debentures, public deposits.', 'exam-tip', 1],
  ['Source open to every form of business', 'Trade credit.', 'fact', 1],
  ['**Financial planning**', 'A blueprint of future funds: how much, when, from where.', 'definition', 2],
  ['Two objectives of financial planning', 'Funds available when needed; no unnecessary funds raised.', 'exam-tip', 2],
  ['Six features of a sound plan', 'Simplicity, foresight, flexibility, optimum use, liquidity, economy.', 'fact', 2],
  ['How does a financial plan help **control**?', 'It gives targets to compare actual results with.', 'concept', 2],
  ['A standby bank limit in the plan shows…', 'Flexibility.', 'exam-tip', 2],
  ['**Capital structure**', 'The mix of debt and equity in long-term finance.', 'definition', 3],
  ['Why is debt cheaper than equity?', 'Interest is tax-deductible; lenders take less risk.', 'concept', 3],
  ['**Trading on equity**', 'Using fixed-cost debt to raise EPS; works only if ROI > interest rate.', 'definition', 3],
  ['EPS formula', '(EBIT − interest − tax) ÷ number of equity shares.', 'formula', 3],
  ['Owners want to keep control → prefer…', 'Debt (no voting rights).', 'exam-tip', 3],
  ['Uneven cash flows → prefer…', 'Less debt (fixed interest is risky).', 'exam-tip', 3],
  ['Depressed share market → prefer…', 'Debt for now.', 'exam-tip', 3],
  ['**Flexibility** in capital structure', 'Keeping some borrowing capacity unused for the future.', 'definition', 3],
  ['**Fixed capital**', 'Funds in long-term assets: land, buildings, machinery, vehicles.', 'definition', 4],
  ['Eight factors of fixed capital', 'Nature, scale, technique, technology, growth, diversification, financing alternatives, collaboration.', 'fact', 4],
  ['Leasing an asset → fixed capital…', 'Falls.', 'exam-tip', 4],
  ['Sharing a facility with other firms → fixed capital…', 'Falls (level of collaboration).', 'exam-tip', 4],
  ['**Gross working capital**', 'Total current assets.', 'definition', 5],
  ['**Net working capital**', 'Current assets − current liabilities.', 'formula', 5],
  ['**Permanent** vs **temporary** working capital', 'Year-round minimum vs seasonal extra.', 'concept', 5],
  ['Long production cycle → working capital…', 'Rises.', 'exam-tip', 5],
  ['Long credit **to customers** → working capital…', 'Rises.', 'exam-tip', 5],
  ['Long credit **from suppliers** → working capital…', 'Falls.', 'exam-tip', 5],
  ['Boom period → working capital…', 'Rises (more output and sales).', 'exam-tip', 5],
  ['Fixed vs working capital: three bases', 'Purpose, period, sources.', 'fact', 5],
]);

// ---------------------------------------------------------------- tests (ISC class defaults, item for item)
const T_SHORT = test({
  kind: 'short',
  blueprint: 'isc-12-default-chapter-test-short',
  title: 'Chapter test (short) — Business Finance, Financial Planning and Capital',
  duration: 50,
  sections: [
    { id: 'A', title: 'Section A - Objective (5 marks)', instr: 'Answer all questions. Multiple-choice and assertion-reason items carry 1 mark each.', items: ['m_fin_purpose', 'm_fp_shortage', 'm_cs_control', 'm_wc_credit', 'ar_toe'] },
    { id: 'B', title: 'Section B - Short answer (4 marks)', instr: 'Answer both questions. Internal choice in the second question.', items: ['s_fin_importance', { attempt: 1, keys: ['s_fp_features', 's_wc_types'] }] },
    { id: 'C', title: 'Section C - Short answer (6 marks)', instr: 'Answer both questions. Internal choice in the second question.', items: ['s3_fp_importance', { attempt: 1, keys: ['s3_cs_factors', 's3_wc_factors'] }] },
    { id: 'D', title: 'Section D - Long answer (5 marks)', instr: 'Answer the question. It is set in parts.', items: ['l_cs'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'isc-12-default-chapter-test-long',
  title: 'Chapter test (long) — Business Finance, Financial Planning and Capital',
  duration: 100,
  sections: [
    { id: 'A', title: 'Section A - Objective (12 marks)', instr: 'Answer all questions. Multiple-choice and assertion-reason items carry 1 mark each.', items: ['m_fin_life', 'm_partner_source', 'm_company_only', 'm_fp_meaning', 'm_fp_surplus', 'm_cs_cashflow', 'm_cs_tax', 'm_fc_nature', 'm_wc_gross', 'm_wc_cycle', 'ar_sole_limited', 'ar_wc_boom'] },
    { id: 'B', title: 'Section B - Short answer (6 marks)', instr: 'Answer all three questions. Internal choice in the last question.', items: ['s_sources_sole', 's_cs_two', { attempt: 1, keys: ['s_toe_meaning', 's_fc_two'] }] },
    { id: 'C', title: 'Section C - Short answer (12 marks)', instr: 'Answer all four questions. Internal choice in the last question.', items: ['s3_sources_compare', 's3_fp_case', 's3_toe_calc', { attempt: 1, keys: ['s3_fc_three', 's3_fc_vs_wc'] }] },
    { id: 'D', title: 'Section D - Long answer (10 marks)', instr: 'Answer both questions. Internal choice in the second question. Each is set in parts.', items: ['l_finance', { attempt: 1, keys: ['l_wc', 'l_fc_wc'] }] },
  ],
});
if (T_SHORT.total_marks !== 20 || T_LONG.total_marks !== 40) throw new Error(`test marks ${T_SHORT.total_marks} / ${T_LONG.total_marks}`);

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t05 of isc-12-commerce-ch02 (importance of finance and sources by form of business; financial planning; capital structure; fixed capital; working capital and fixed versus working capital)',
    originality: 'every firm, person, figure and case is imagined and written by SOYL and labelled; no ISC or CBSE textbook text, illustration or exercise and no CISCE specimen or board item reused (D-036); firms, places and figures differ from the CBSE 12 Business Studies chapter on financial management',
    data: 'EPS and working-capital figures are computed in the build and asserted (Plan A ₹1.5, Plan B ₹2.25; at EBIT ₹3 lakh ₹0.5625 and ₹0.375; net working capital ₹3,80,000)',
    facts: 'stable textbook concepts only; no dated rates or limits',
    gate: 'schema, pipeline lint, deterministic verify, word limits, narration and answer-leak checks run clean in this build',
  },
});
