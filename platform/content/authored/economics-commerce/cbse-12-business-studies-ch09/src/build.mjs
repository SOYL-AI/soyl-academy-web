// Build CBSE 12 Business Studies ch09 Financial Management. Run from platform/:
//   npx tsx content/authored/economics-commerce/cbse-12-business-studies-ch09/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';

setUnit('cbse-12-business-studies-ch09', 'economics-commerce');
const { TOE, ROI_GOOD, ROI_BAD, inr } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const { good, bad } = TOE;

// ---------------------------------------------------------------- SVG figures
/** EPS under Plan A (all equity) and Plan B (half debt) in a good year and a bad year, from TOE. */
const vEpsBars = (() => {
  const s = new Svg(600, 310);
  const c = s.chart({ x1: 5, y1: 1.8, left: 70, top: 34, width: 470, height: 210, xLabel: 'Year and plan', yLabel: 'EPS (₹)' });
  const bar = (x, v, color) => {
    s.rect(c.X(x - 0.4), c.Y(v), c.X(x + 0.4) - c.X(x - 0.4), c.Y(0) - c.Y(v), { rx: 2, fill: color, color, sw: 1 });
    s.text(c.X(x), c.Y(v) - 12, `₹${v.toFixed(2)}`, { size: 13, bold: true });
  };
  bar(1, good.A.eps, 'muted');
  bar(2, good.B.eps, 'accent');
  bar(3.2, bad.A.eps, 'muted');
  bar(4.2, bad.B.eps, 'accent');
  c.xTick(1, 'Good: A').xTick(2, 'Good: B').xTick(3.2, 'Poor: A').xTick(4.2, 'Poor: B');
  [0, 0.5, 1, 1.5].forEach((v) => c.yTick(v, v.toFixed(1)));
  return s.visual(
    `Bar chart of EPS for the imagined Sahyadri Ceramics. In a good year (return ${ROI_GOOD} per cent) Plan A gives ${good.A.eps} rupees and Plan B ${good.B.eps}; in a poor year (return ${ROI_BAD} per cent) Plan A gives ${bad.A.eps} and Plan B ${bad.B.eps}`,
    'Imagined figures: debt lifts EPS only while ROI is above the 10% interest rate.',
  );
})();

/** Operating cycle: five boxes around a loop. */
const vCycle = (() => {
  const s = new Svg(620, 330);
  const cx = 310, cy = 165, rx = 225, ry = 115;
  const steps = ['Cash', 'Raw materials', 'Work-in-progress', 'Finished goods', 'Debtors (credit sales)'];
  const pts = steps.map((_, i) => {
    const a = -Math.PI / 2 + (2 * Math.PI * i) / steps.length;
    return [cx + rx * Math.cos(a), cy + ry * Math.sin(a)];
  });
  const W = 170, H = 40;
  for (let i = 0; i < steps.length; i++) {
    const [x1, y1] = pts[i];
    const [x2, y2] = pts[(i + 1) % steps.length];
    const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy);
    const k = 0.3;
    s.arrow(x1 + dx * k, y1 + dy * k, x1 + dx * (1 - k), y1 + dy * (1 - k), { sw: 1.8, color: 'accent' });
  }
  steps.forEach((t, i) => {
    const [x, y] = pts[i];
    s.rect(x - W / 2, y - H / 2, W, H, { fill: 'fill', color: i === 0 ? 'accent' : undefined, sw: 1.6 });
    s.text(x, y, t, { size: 14, bold: i === 0 });
  });
  s.text(cx, cy - 10, 'Operating cycle', { size: 14, bold: true });
  s.text(cx, cy + 12, 'longer cycle, more working capital', { size: 12, muted: true });
  return s.visual(
    'Loop diagram of the operating cycle: cash buys raw materials, which become work-in-progress, then finished goods, then debtors through credit sales, and finally cash again',
    'The longer this loop takes, the more working capital a business needs.',
  );
})();

/** Three decisions around one objective. */
const vDecisions = (() => {
  const s = new Svg(640, 300);
  const boxes = [
    [20, 30, 'Investment decision', 'Where to put the funds?'],
    [235, 30, 'Financing decision', 'Where to get the funds?'],
    [450, 30, 'Dividend decision', 'How much profit to pay out?'],
  ];
  const W = 170, H = 70;
  boxes.forEach(([x, y, a, b]) => {
    s.rect(x, y, W, H, { fill: 'fill', sw: 1.6 });
    s.text(x + W / 2, y + 24, a, { size: 14, bold: true });
    s.text(x + W / 2, y + 48, b, { size: 12 });
  });
  s.rect(170, 200, 300, 64, { fill: 'fill', color: 'accent', sw: 2 });
  s.text(320, 222, 'Objective: wealth maximisation', { size: 14, bold: true });
  s.text(320, 246, 'raise the market value of equity shares', { size: 12 });
  boxes.forEach(([x, y]) => s.arrow(x + W / 2, y + H + 4, 320 + (x + W / 2 - 320) * 0.35, 196, { sw: 1.6, color: 'accent' }));
  return s.visual(
    'Diagram of the three financial decisions, investment, financing and dividend, each pointing to one common objective: wealth maximisation, that is, raising the market value of the equity shares',
    'All three decisions are judged by one test: do they raise the share value?',
  );
})();

// ---------------------------------------------------------------- tables and flows
const vRoute1 = flow('LR', ['Business finance', 'Financial management and its objective', 'Investment decision', 'Financing decision', 'Dividend decision', 'Financial planning'], 'Route map of Part 1: business finance, financial management and its objective, the investment, financing and dividend decisions, and financial planning', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Capital structure', 'Trading on equity', 'Factors in choosing debt and equity', 'Fixed capital', 'Working capital'], 'Route map of Part 2: capital structure, trading on equity, factors in the choice of debt and equity, fixed capital and working capital', 'Part 2 at a glance');
const vNeed = table(
  ['Why a business needs funds', 'Imagined example'],
  [
    ['To set up: land, building, machinery', 'A Nashik winery buys tanks and a bottling line'],
    ['To run day to day: materials, wages, bills', 'It buys grapes and pays harvest workers'],
    ['To grow and modernise', 'It adds a cold store and a visitor centre'],
  ],
  'Table of three reasons a business needs funds, with an imagined Nashik winery: to set up with land and machinery, to run day to day with materials and wages, and to grow with a cold store and visitor centre',
  'Every stage of a business needs money: that money is business finance.',
);
const vRoleAreas = table(
  ['Balance-sheet item', 'Decision it reflects'],
  [
    ['Fixed assets (size and mix)', 'Long-term investment'],
    ['Current assets (cash, stock, debtors)', 'Working capital'],
    ['Debt vs equity', 'Financing (capital structure)'],
    ['Retained earnings', 'Dividend'],
  ],
  'Table linking balance-sheet items to financial decisions: fixed assets to long-term investment, current assets to working capital, debt versus equity to financing, retained earnings to dividend',
  'Almost every figure on the balance sheet reflects a financial decision.',
);
const vCapBudFactors = table(
  ['Factor', 'What the finance team asks'],
  [
    ['Cash flows of the project', 'How much cash will it bring in, year by year?'],
    ['Rate of return', 'Is the expected return attractive for its risk?'],
    ['Investment criteria', 'Which method ranks the projects (payback, return, and so on)?'],
  ],
  'Table of factors affecting capital budgeting decisions: cash flows of the project, rate of return, and investment criteria used to rank projects',
);
const vFinFactors = table(
  ['Factor', 'Effect on the choice of source'],
  [
    ['Cost', 'Cheapest suitable source preferred'],
    ['Risk', 'Debt is riskier than equity for the company'],
    ['Floatation cost', 'Costly share issues push towards loans'],
    ['Cash flow position', 'Strong, steady cash flows allow more debt'],
    ['Fixed operating cost', 'High fixed costs call for less debt'],
    ['Control', 'Fear of dilution favours debt'],
    ['State of capital market', 'Booming market eases share issues'],
  ],
  'Table of seven factors affecting the financing decision: cost, risk, floatation cost, cash flow position, fixed operating cost, control, and the state of the capital market',
);
const vDivFactors = table(
  ['Pushes dividend up', 'Pushes dividend down'],
  [
    ['High and stable earnings', 'Good growth opportunities'],
    ['Strong cash position', 'Loan conditions (contractual constraints)'],
    ['Shareholders want regular income', 'Legal limits and high tax on dividends'],
    ['Easy access to the capital market', 'Weak cash position'],
  ],
  'Two-column table of dividend factors: high stable earnings, strong cash, shareholder preference for income and easy market access push dividend up; growth opportunities, loan conditions, legal limits and taxes, and weak cash push it down',
  'Stability of dividends and stock market reaction also matter.',
);
const vFpFlow = flow('TB', ['Forecast the funds needed (long-term plan, about 3–5 years)', 'Break it into short-term budgets (about 1 year)', 'Decide sources and timing of funds', 'Compare actual with plan and revise'], 'Flow of financial planning: forecast the funds needed for three to five years, break the plan into one-year budgets, decide sources and timing, then compare actual results with the plan and revise', 'Financial planning: a blueprint, not a one-time act');
const vFpWorked = table(
  ['Month (imagined Alleppey coir unit)', 'Cash needed (₹ lakh)', 'Cash coming in (₹ lakh)', 'Gap to arrange (₹ lakh)'],
  [
    ['April', '12', '14', 'none'],
    ['May (fibre bought in bulk)', '30', '15', '15'],
    ['June', '14', '16', 'none'],
  ],
  'Table of a three-month cash plan for an imagined coir unit: April needs 12 lakh and receives 14; May needs 30 but receives 15, a gap of 15 lakh to arrange in advance; June needs 14 and receives 16',
  'A plan shows the May gap two months early, so funds can be arranged cheaply.',
);
const vDebtEquity = table(
  ['', 'Debt (borrowed funds)', 'Equity (owners\' funds)'],
  [
    ['Return to providers', 'Fixed interest, must be paid', 'Dividend, at the board\'s discretion'],
    ['Cost to company', 'Lower (interest is tax-deductible)', 'Higher (owners expect more)'],
    ['Risk to company', 'Higher: default can lead to legal action', 'Lower: no fixed obligation'],
    ['Control', 'No voting rights for lenders', 'New shares may dilute control'],
  ],
  'Comparison table of debt and equity: debt has fixed interest, lower cost because interest is tax-deductible, higher risk to the company and no voting rights; equity has discretionary dividend, higher cost, lower risk and may dilute control',
  'Capital structure = the mix of these two.',
);
const vToeWorked = table(
  ['Item (₹)', 'Plan A: all equity', 'Plan B: ₹20 lakh debt at 10%'],
  [
    ['EBIT', inr(good.A.ebit), inr(good.B.ebit)],
    ['Less interest', '0', inr(good.B.interest)],
    ['EBT', inr(good.A.ebt), inr(good.B.ebt)],
    ['Less tax at 30%', inr(good.A.taxAmt), inr(good.B.taxAmt)],
    ['EAT', inr(good.A.eat), inr(good.B.eat)],
    ['Number of ₹10 shares', inr(good.A.shares), inr(good.B.shares)],
    ['**EPS**', `**${good.A.eps.toFixed(2)}**`, `**${good.B.eps.toFixed(2)}**`],
  ],
  `Worked table for the imagined Sahyadri Ceramics with capital of 40 lakh rupees and EBIT of ${inr(good.A.ebit)}: Plan A all equity gives EAT ${inr(good.A.eat)} on ${inr(good.A.shares)} shares, EPS ${good.A.eps}; Plan B with 20 lakh debt at 10 per cent pays interest ${inr(good.B.interest)}, EAT ${inr(good.B.eat)} on ${inr(good.B.shares)} shares, EPS ${good.B.eps}`,
  `ROI = ${ROI_GOOD}% > 10% interest, so debt raises EPS.`,
);
const vToeBad = table(
  ['Item (₹)', 'Plan A: all equity', 'Plan B: ₹20 lakh debt at 10%'],
  [
    ['EBIT', inr(bad.A.ebit), inr(bad.B.ebit)],
    ['Less interest', '0', inr(bad.B.interest)],
    ['EBT', inr(bad.A.ebt), inr(bad.B.ebt)],
    ['Less tax at 30%', inr(bad.A.taxAmt), inr(bad.B.taxAmt)],
    ['EAT', inr(bad.A.eat), inr(bad.B.eat)],
    ['**EPS**', `**${bad.A.eps.toFixed(2)}**`, `**${bad.B.eps.toFixed(2)}**`],
  ],
  `Worked table for a poor year with EBIT of ${inr(bad.A.ebit)}: Plan A gives EAT ${inr(bad.A.eat)} and EPS ${bad.A.eps}; Plan B pays interest ${inr(bad.B.interest)}, leaving EAT ${inr(bad.B.eat)} and EPS ${bad.B.eps}`,
  `ROI = ${ROI_BAD}% < 10% interest, so debt lowers EPS.`,
);
const vCsFactors = table(
  ['Favour MORE debt', 'Favour LESS debt'],
  [
    ['Strong, steady cash flows', 'Uncertain or seasonal cash flows'],
    ['High interest coverage ratio and DSCR', 'Low coverage ratios'],
    ['ROI above cost of debt', 'ROI below cost of debt'],
    ['High tax rate (interest saves tax)', 'High business risk already'],
    ['Owners want to keep control', 'Need for flexibility to borrow later'],
    ['Costly share issue (high floatation cost)', 'Booming share market (easy equity)'],
  ],
  'Two-column table of capital structure factors: strong cash flows, high coverage ratios, return above cost of debt, high tax rate, desire for control and costly share issues favour more debt; uncertain cash flows, low coverage, low return, high risk, need for flexibility and a booming share market favour less debt',
  'Also: cost of equity, regulatory framework and the structure of similar companies.',
);
const vFixedFactors = table(
  ['Factor', 'Needs MORE fixed capital when…'],
  [
    ['Nature of business', 'it manufactures rather than trades'],
    ['Scale of operations', 'the plant is large'],
    ['Choice of technique', 'the method is capital-intensive'],
    ['Technology upgradation', 'machines become outdated quickly'],
    ['Growth prospects', 'capacity is built ahead of demand'],
    ['Diversification', 'new product lines are added'],
    ['Financing alternatives', 'leasing is not available'],
    ['Level of collaboration', 'facilities are not shared with other firms'],
  ],
  'Table of eight factors affecting fixed capital: nature of business, scale, choice of technique, technology upgradation, growth prospects, diversification, financing alternatives such as leasing, and collaboration with other firms',
);
const vWcFactors = table(
  ['Factor', 'Needs MORE working capital when…'],
  [
    ['Nature of business', 'it manufactures rather than trades'],
    ['Scale of operations', 'output and sales are large'],
    ['Business cycle', 'the economy is booming'],
    ['Seasonal factors', 'it is the peak season'],
    ['Production cycle', 'goods take long to make'],
    ['Credit allowed', 'customers get long credit'],
    ['Credit availed', 'suppliers give little credit'],
    ['Operating efficiency', 'stock and debtors move slowly'],
    ['Raw material availability', 'large safety stocks are needed'],
    ['Growth, competition, inflation', 'the firm is growing, competing hard, or prices are rising'],
  ],
  'Table of working capital factors: manufacturing, large scale, boom, peak season, long production cycle, long credit allowed, little credit availed, low efficiency, scarce raw materials, growth, competition and inflation all raise the requirement',
);
const vFcWc = table(
  ['Basis', 'Fixed capital', 'Working capital'],
  [
    ['Assets financed', 'Land, building, plant, machinery', 'Stock, debtors, cash'],
    ['Period', 'Many years', 'Within one operating cycle'],
    ['Usual sources', 'Long-term: shares, debentures, term loans', 'Short-term: trade credit, bank overdraft'],
  ],
  'Comparison table: fixed capital finances land, buildings and machinery for many years from long-term sources; working capital finances stock, debtors and cash within one operating cycle, mostly from short-term sources',
);
const vWcWorked = table(
  ['Imagined Ludhiana hosiery unit', 'Before the change', 'After the change'],
  [
    ['Days goods are in production', '30', '30'],
    ['Credit given to shops (days)', '30', '75'],
    ['Credit from yarn suppliers (days)', '45', '15'],
    ['Effect on working capital', '—', 'Rises sharply'],
  ],
  'Worked table for an imagined hosiery unit: production time stays 30 days, credit to shops rises from 30 to 75 days and credit from yarn suppliers falls from 45 to 15 days, so its working capital need rises sharply',
  'Longer credit given + shorter credit received = more money locked up.',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Financial Management — Part 1: Objective, Decisions and Financial Planning',
  goals: [
    'Explain business finance, the meaning and role of financial management, and its objective of wealth maximisation',
    'Explain the investment, financing and dividend decisions and the factors affecting each',
    'Explain the meaning, objectives and importance of financial planning',
  ],
  slides: [
    sl('title', 'Financial Management', {
      b: 'Part 1 — business finance, the **objective** of financial management, the **three financial decisions** and **financial planning**.',
      v: vRoute1,
      n: 'Every business runs on money. A new factory, a month of wages, a bigger warehouse: each needs funds at the right time and at a sensible cost. In this chapter we see how a business manages its money. Part 1 covers why funds are needed, what financial management aims at, the three big money decisions, and how financial planning keeps the business from running short.',
    }),
    sl('concept', 'Business finance', {
      b: '**Business finance** is the money a business needs for all its activities: to start, to run and to grow.',
      v: vNeed,
      n: 'Look at this imagined winery in Nashik. It needs money to set up its tanks and bottling line, money every month to buy grapes and pay workers, and money later to add a cold store. All these funds together are called business finance. Without them, even a good business idea cannot take off.',
    }),
    sl('concept', 'What is financial management?', {
      b: '**Financial management** is about raising funds at the **lowest cost** and putting them to the **best use**.',
      bl: ['Getting funds: from which sources, in what amounts, when.', 'Using funds: in which assets, fixed and current.', 'Managing risk and return together.'],
      n: 'Financial management has two sides. One is getting the money: deciding the sources, the amounts and the timing. The other is using it well: choosing the assets in which to invest. A finance manager keeps asking two questions. Is this money costing us more than it should? And is it earning as much as it could, for the risk we are taking?',
    }),
    sl('diagram', 'Its role: the balance sheet', {
      v: vRoleAreas,
      n: 'Here is why financial management matters so much. Almost every item on a balance sheet is the result of a financial decision. The fixed assets come from long-term investment decisions, the current assets from working capital decisions, the mix of loans and share capital from financing decisions, and the retained profit from the dividend decision. So these decisions shape the whole financial health of the business.',
    }),
    sl('check', 'Quick check: which part of the balance sheet?', {
      b: 'A finance manager decides how much cash, stock and money due from customers to hold. Which area is this?',
      chk: 'm_role_area',
      n: 'Cash, stock and money owed by customers all turn into cash within a year. What kind of assets are they?',
    }),
    sl('diagram', 'The objective: wealth maximisation', {
      v: vDecisions,
      b: 'The objective is to **maximise the market value of the equity shares**, which is the owners\' wealth.',
      n: 'What should all these decisions aim at? Not just this year\'s profit, because profit ignores risk and timing. The accepted objective is wealth maximisation: every decision should help raise the market price of the company\'s equity shares. The share price reflects investors\' view of both the returns and the risks of the company, so it is a good single test for all three decisions.',
    }),
    sl('concept', 'Investment decision', {
      b: 'Where should the funds be invested?',
      bl: ['**Long-term**: fixed assets such as a new plant, called **capital budgeting**.', '**Short-term**: current assets such as stock and debtors, called **working capital** decisions.', 'Capital budgeting matters because it decides **long-term growth**, involves **large sums**, carries **risk** and is hard to **reverse**.'],
      v: vCapBudFactors,
      n: 'The investment decision asks where to put the money. Long-term investment in assets like a new plant is called capital budgeting. Short-term investment in stock and debtors is the working capital decision. Capital budgeting is critical: it shapes the firm\'s earning power for years, it uses large amounts, it is risky, and once a plant is built it is very costly to undo. The team studies the project\'s cash flows, its return and the criteria for ranking projects.',
    }),
    sl('check', 'Quick check: name the decision', {
      b: 'Committing funds to a new plant is which kind of decision?',
      chk: 'm_capbud',
      n: 'A new plant will serve the business for many years. Which name do we give to long-term investment decisions?',
    }),
    sl('diagram', 'Financing decision', {
      b: 'From where should the funds come? Mainly **debt** (borrowed funds) and **equity** (shareholders\' funds).',
      v: vFinFactors,
      n: 'Once the business knows what to invest in, it must decide where the money will come from. The two broad sources are borrowed funds, or debt, and shareholders\' funds, or equity. Debt is usually cheaper but brings fixed payments and risk. Equity is safer for the company but costlier and may dilute control. The finance manager weighs cost, risk, floatation cost, cash flows, fixed operating costs, control and the mood of the capital market.',
    }),
    sl('diagram', 'Dividend decision', {
      b: 'How much of the profit should be paid to shareholders, and how much **retained**?',
      v: vDivFactors,
      n: 'The third decision is about profit. Should the company pay it out as dividend, or keep it to finance growth? Retained profit is a cheap source of funds, but shareholders also value regular income. Stable earnings, strong cash and shareholder preferences push the dividend up. Good growth projects, loan conditions, legal limits and a weak cash position push it down. Many firms also try to keep their dividend steady over the years.',
    }),
    sl('check', 'Quick check: a growing start-up', {
      b: 'A software start-up has many profitable expansion plans. What will it most likely do with its profits?',
      chk: 'm_growth_div',
      n: 'Think about where a fast-growing company finds the cheapest money for its new projects.',
    }),
    sl('example', 'Worked example 1: spotting the decisions in a case', {
      b: 'An imagined Mysuru silk company: (1) buys new power looms after estimating ten years of cash flows; (2) funds them with a bank loan because a share issue would cost too much in fees; (3) pays a smaller dividend this year.',
      bl: [
        'Step 1 — Ask what each line is about: **assets**, **sources** or **profit**?',
        'Step 2 — (1) assets → **investment (capital budgeting)**; factor: **cash flows of the project**.',
        'Step 3 — (2) sources → **financing**; factor: **floatation cost**.',
        'Step 4 — (3) profit → **dividend**; likely factor: funds needed for growth.',
        'Step 5 — In the exam, **quote the line**, name the decision, then name the factor.',
      ],
      v: flow('LR', ['Read each line', 'Assets, sources or profit?', 'Name the decision', 'Name the factor', 'Quote the line'], 'Flow for answering decision cases: read each line, ask whether it is about assets, sources or profit, name the decision, name the factor, and quote the line', 'A method for case questions'),
      n: 'Let us practise. An imagined silk company in Mysuru buys new looms after estimating ten years of cash flows. That is about assets, so it is the investment decision, and the factor is the project\'s cash flows. It pays for them with a loan because shares would cost too much in fees: that is the financing decision, and the factor is floatation cost. A smaller dividend is the dividend decision. Always quote the line before naming the concept.',
    }),
    sl('concept', 'Financial planning', {
      b: '**Financial planning** prepares a **financial blueprint** of the future: how much money will be needed, when, and from where.',
      bl: ['**Objective 1:** funds available **whenever required**.', '**Objective 2:** no **unnecessary** raising of funds (idle money has a cost).', 'Usually a 3–5 year plan, broken into yearly **budgets**.'],
      v: vFpFlow,
      n: 'Financial planning looks ahead. It works out how much money the business will need in the coming years, when it will need it, and where it will come from. It has two aims. First, money should be there when it is needed. Second, the firm should not collect more than it needs, because idle money costs interest or dividends without earning anything. Long-term plans are broken into yearly budgets.',
    }),
    sl('example', 'Worked example 2: a month-by-month cash plan', {
      b: 'An imagined coir unit in Alleppey buys coconut fibre in bulk in May.',
      bl: ['Step 1 — List the cash needed and cash coming in, month by month.', 'Step 2 — Find the gap: May needs ₹30 lakh but only ₹15 lakh comes in.', 'Step 3 — Arrange ₹15 lakh **in advance** (for example a cheap bank limit) instead of borrowing in a hurry.', 'Step 4 — Do not raise extra for April and June, which have a surplus.'],
      v: vFpWorked,
      n: 'Here is financial planning in action. The coir unit lists its cash needs and receipts for each month. April and June are comfortable. In May it buys fibre in bulk and needs thirty lakh rupees, but only fifteen lakh comes in. Because the plan shows this gap two months early, the unit can arrange a cheap bank limit in time, rather than paying a moneylender later. And it avoids raising money it does not need.',
    }),
    sl('concept', 'Why financial planning matters', {
      bl: ['Helps the business **face shocks** and surprises by preparing for different situations.', '**Coordinates** the plans of production, sales and other departments with the money available.', 'Cuts **waste and duplication** of funds.', '**Links** the present with the future, and investment with financing.', 'Gives **standards** to check actual performance.'],
      n: 'Why bother with all this planning? Because it prepares the business for surprises, like a bad harvest or a sudden rise in prices. It makes sure that every department\'s plans fit the money available. It avoids waste. It connects today\'s decisions with tomorrow\'s needs, and what we invest in with how we pay for it. And it gives targets against which actual results can be checked later.',
    }),
    sl('check', 'Quick check: too much money?', {
      b: 'A firm raised ₹50 lakh more than it needed, and the money lay idle for a year. Which objective of financial planning was ignored?',
      chk: 'm_fp_surplus',
      n: 'Money was certainly available. So which of the two objectives was missed?',
    }),
    sl('summary', 'Summary of Part 1', {
      bl: [
        '**Business finance** = funds to start, run and grow a business.',
        '**Financial management** = raising funds at least cost and using them best; objective **wealth maximisation** (market value of equity shares).',
        '**Investment** (capital budgeting and working capital), **financing** (debt vs equity) and **dividend** (pay out vs retain) decisions.',
        '**Financial planning** = blueprint of future funds; available when needed, never raised unnecessarily.',
      ],
      v: vDecisions,
      n: 'To sum up Part 1. Business finance is the money needed to start, run and grow. Financial management raises it cheaply and uses it well, with one objective: to raise the market value of the shares. It takes three decisions, about investment, financing and dividend. And financial planning makes sure money is there when needed, without collecting more than necessary.',
    }),
    sl('exam-tips', 'Exam tips for Part 1', {
      bl: [
        'Write the objective exactly: maximising the **market value of equity shares** (not just profit).',
        'In case questions, **quote the line**, then name the decision and the factor.',
        'Do not confuse **investment decision** (which asset) with **financing decision** (which source).',
        'Retained profit links the **dividend** and **financing** decisions.',
        'Financial planning has **two** objectives; learn both.',
      ],
      v: table(['Marks', 'What examiners look for'], [['1', 'Correct option or term'], ['3', 'Three points, each with one line of explanation'], ['5', 'Five named points explained, or a case answer with quoted lines'], ['Case 4', 'Quote, identify, explain; one part has a choice']], 'Table of how marks are usually awarded: one mark for the correct option, three marks for three explained points, five marks for five explained points, and case questions for quoted lines with the concept named and explained'),
      n: 'Some tips. Write the objective precisely: maximising the market value of equity shares. In case questions, examiners want the exact line quoted, then the decision named, then the factor. Keep investment and financing apart: one is about what to buy, the other about where the money comes from. And remember both objectives of financial planning.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Financial Management — Part 2: Capital Structure, Fixed and Working Capital',
  goals: [
    'Explain capital structure, financial risk and trading on equity with a worked EPS calculation',
    'Explain the factors affecting the choice of capital structure',
    'Explain fixed and working capital and the factors affecting each',
  ],
  slides: [
    sl('title', 'Capital structure and the need for capital', {
      b: 'Part 2 — the **mix of debt and equity**, **trading on equity**, and how much **fixed** and **working capital** a business needs.',
      v: vRoute2,
      n: 'In Part 2 we look closely at the financing decision. How much should a company borrow, and how much should come from its owners? We will calculate earnings per share under two plans, see when borrowing helps and when it hurts, and list the factors a finance manager weighs. Then we look at the two kinds of capital every business needs: fixed and working capital.',
    }),
    sl('two-column', 'Debt and equity', {
      b: '**Capital structure** is the proportion of **debt** and **equity** in the long-term funds of a business.',
      v: vDebtEquity,
      n: 'Capital structure is simply the mix of borrowed money and owners\' money. Compare them. Debt carries fixed interest that must be paid, but it is cheaper, partly because interest reduces tax, and lenders do not vote. Equity has no fixed payment, so it is safer for the company, but owners expect a higher return and new shares may dilute control.',
      cols: ['**Debt**: cheaper, fixed obligation, more financial risk, no dilution of control.', '**Equity**: costlier, no fixed obligation, less financial risk, may dilute control.'],
    }),
    sl('concept', 'Financial risk', {
      b: '**Financial risk** is the chance that a company cannot meet its fixed payments on debt.',
      bl: ['More debt → bigger fixed interest and repayments.', 'A bad year can lead to default, legal action, even closure.', 'So debt is cheaper **but** riskier for the company.'],
      n: 'Why not borrow everything, if debt is cheaper? Because of financial risk. Interest and repayments must be paid in good years and bad. The more a company borrows, the larger these fixed payments become, and the greater the chance that a poor year leaves it unable to pay. So the finance manager must balance the lower cost of debt against this risk.',
    }),
    sl('concept', 'Trading on equity', {
      b: '**Trading on equity**: using more **fixed-cost debt** to increase the return to equity shareholders.',
      bl: ['Works only when **ROI > rate of interest** on debt.', 'If ROI < interest rate, it **reduces** EPS.', 'EPS = earnings after tax ÷ number of equity shares.'],
      v: flow('LR', ['Borrow at a fixed rate', 'Invest in the business', 'Earn ROI on it', 'Surplus over interest goes to fewer shares', 'EPS rises (if ROI > interest)'], 'Flow of trading on equity: borrow at a fixed rate, invest it, earn a return, and the surplus over interest goes to fewer equity shares, so EPS rises when the return exceeds the interest rate', 'The logic of trading on equity'),
      n: 'Trading on equity means using borrowed money to boost the earnings of the owners. If the business earns more on the borrowed money than it pays in interest, the extra goes to the shareholders, and because fewer shares were issued, earnings per share go up. But it only works while the return on investment stays above the interest rate. If it falls below, borrowing pulls earnings per share down.',
    }),
    sl('example', 'Worked example 3: when debt lifts EPS', {
      b: `Imagined Sahyadri Ceramics Ltd needs ₹${inr(TOE.capital)}. EBIT ₹${inr(good.A.ebit)} (ROI ${ROI_GOOD}%), tax 30%, shares of ₹10.`,
      bl: [
        'Step 1 — Plan B interest = ₹20,00,000 × 10% = ₹2,00,000.',
        'Step 2 — Subtract interest, then tax, to get EAT for each plan.',
        'Step 3 — Divide EAT by the number of shares.',
        `Step 4 — EPS: Plan A ₹${good.A.eps.toFixed(2)}, Plan B ₹${good.B.eps.toFixed(2)}. Debt **raises** EPS because ${ROI_GOOD}% > 10%.`,
      ],
      v: vToeWorked,
      n: 'Let us work through it. The imagined Sahyadri Ceramics needs forty lakh rupees and expects operating profit of six lakh, a return of fifteen per cent. Plan A uses only shares. Plan B borrows twenty lakh at ten per cent. Plan B pays two lakh as interest, so it has less profit after tax, but it has only half as many shares. Its earnings per share come to one rupee forty, against one rupee five under Plan A.',
    }),
    sl('example', 'Worked example 4: when debt hurts', {
      b: `Same company, a poor year: EBIT falls to ₹${inr(bad.A.ebit)} (ROI ${ROI_BAD}%).`,
      bl: [
        'Step 1 — Interest under Plan B is still ₹2,00,000: it does not fall with profit.',
        `Step 2 — EAT: Plan A ₹${inr(bad.A.eat)}, Plan B ₹${inr(bad.B.eat)}.`,
        `Step 3 — EPS: Plan A ₹${bad.A.eps.toFixed(2)}, Plan B ₹${bad.B.eps.toFixed(2)}.`,
        `Step 4 — Now ${ROI_BAD}% < 10%, so debt **lowers** EPS: this is financial risk in numbers.`,
      ],
      v: vToeBad,
      n: 'Now suppose a poor year cuts operating profit to three lakh twenty thousand, a return of only eight per cent. The interest of two lakh must still be paid. Plan B is left with far less, and its earnings per share drop to forty-two paise, below Plan A\'s fifty-six paise. The same debt that helped in a good year now hurts. That is why the return must comfortably exceed the cost of debt.',
    }),
    sl('diagram', 'The two years side by side', {
      v: vEpsBars,
      n: 'This chart puts both years together. In the good year, the bar for Plan B stands above Plan A. In the poor year, the order flips. Debt magnifies results in both directions. A finance manager therefore asks not only whether the expected return beats the interest rate, but also how steady that return is likely to be.',
    }),
    sl('check', 'Quick check: a seasonal business', {
      b: 'A resort earns well in winter but almost nothing in the monsoon. Which factor should make it cautious about a large loan?',
      chk: 'm_cash_flow_cs',
      n: 'Debt needs regular payments. What happens to this business\'s ability to pay during the months when no guests come?',
    }),
    sl('diagram', 'Factors affecting capital structure', {
      v: vCsFactors,
      n: 'Here are the main factors, grouped by the way they push. Strong and steady cash flows, high coverage ratios, a return above the cost of debt, a high tax rate, the wish to keep control, and expensive share issues all favour more debt. Uncertain cash flows, low coverage, high business risk, the need to keep room to borrow later, and a booming share market favour less debt or more equity.',
    }),
    sl('concept', 'Coverage ratios and cost', {
      bl: [
        '**Interest coverage ratio** = EBIT ÷ interest: the higher it is, the safer more debt is.',
        '**Debt service coverage ratio**: cash available ÷ (interest + principal due): higher means debt can be serviced easily.',
        '**Tax rate**: interest is deductible, so a higher tax rate makes debt cheaper after tax.',
        '**Cost of equity**: too much debt raises shareholders\' risk, so they expect more, and the share price may fall.',
      ],
      v: table(['Imagined company', 'EBIT (₹)', 'Interest (₹)', 'Interest coverage'], [['Kanha Paper', '8,00,000', '1,00,000', '8 times'], ['Bastar Metals', '3,00,000', '2,00,000', '1.5 times']], 'Table comparing interest coverage of two imagined companies: Kanha Paper with EBIT of 8 lakh and interest of 1 lakh covers interest 8 times; Bastar Metals with EBIT of 3 lakh and interest of 2 lakh covers it only 1.5 times', 'Kanha Paper can safely borrow more; Bastar Metals cannot.'),
      n: 'Two ratios help judge how much debt is safe. The interest coverage ratio tells how many times operating profit covers interest. Kanha Paper covers its interest eight times, so it can borrow more. Bastar Metals covers it only one and a half times, which is risky. The debt service coverage ratio also counts the principal that must be repaid. A higher tax rate makes debt cheaper, while too much debt raises what shareholders expect.',
    }),
    sl('concept', 'Other factors', {
      bl: ['**Floatation costs**: a public issue costs more to arrange than a loan.', '**Risk**: a firm already facing high business risk should borrow less.', '**Flexibility**: keep some borrowing power in reserve.', '**Control**: debt does not dilute voting control.', '**Regulatory framework**: laws and rules on issues and borrowing.', '**Stock market conditions** and **other companies**\' capital structures.'],
      v: table(['Situation (imagined)', 'Factor'], [['Family wants to keep its 60% holding', 'Control'], ['Share market depressed for months', 'Stock market conditions'], ['Issue would cost 7% in fees', 'Floatation cost']], 'Table of three imagined situations and the factor they show: a family keeping its 60 per cent holding shows control, a depressed share market shows stock market conditions, and issue fees of 7 per cent show floatation cost'),
      n: 'A few more factors complete the list. Floatation costs make public issues expensive. A firm that already faces high business risk should be careful with debt. Wise firms keep some borrowing power in reserve for emergencies. Owners who fear losing control prefer debt. Laws set limits on issues and borrowing. And the state of the share market, and what similar companies do, also guide the choice.',
    }),
    sl('check', 'Quick check: when borrowing hurts', {
      b: 'A firm earns 8% on its capital and borrows at 11%. Will more debt reduce its EPS?',
      chk: 'tf_toe_loss',
      n: 'Compare the return on investment with the interest rate. Which one is higher here?',
    }),
    sl('two-column', 'Fixed capital and working capital', {
      b: 'Every business needs two kinds of capital.',
      v: vFcWc,
      cols: ['**Fixed capital**: invested in long-term assets; recovered over many years; financed from long-term sources.', '**Working capital**: invested in current assets; turns back into cash within a year; net working capital = current assets − current liabilities.'],
      n: 'Now we turn from where money comes from to how much is needed. Fixed capital is tied up in land, buildings and machinery for many years, so it should come from long-term sources. Working capital is the money in stock, debtors and cash, which keeps turning over within a year. Net working capital is current assets minus current liabilities.',
    }),
    sl('diagram', 'Factors affecting fixed capital', {
      b: 'Fixed capital decisions matter: they shape **long-term growth**, involve **large sums**, carry **risk** and are **hard to reverse**.',
      v: vFixedFactors,
      n: 'How much fixed capital does a business need? A manufacturer needs much more than a trader. A large plant needs more than a small one. Capital-intensive methods need more than labour-intensive ones. Industries where machines go out of date quickly, firms that are growing or diversifying, and firms that cannot lease or share facilities all need more fixed capital.',
    }),
    sl('diagram', 'The operating cycle', {
      v: vCycle,
      n: 'Working capital depends on the operating cycle. Cash buys raw materials, which become work in progress, then finished goods, then sales on credit, and finally cash again. The longer this loop takes, the longer money stays locked up, and the more working capital the business needs. A grocery shop goes round the loop quickly; a maker of heavy machinery goes round it slowly.',
    }),
    sl('diagram', 'Factors affecting working capital', {
      v: vWcFactors,
      n: 'Many factors raise the need for working capital. Manufacturing, a large scale of output, a boom, the peak season and a long production cycle all lock up more money. So do generous credit to customers and little credit from suppliers. Slow-moving stock, scarce raw materials that must be stocked in advance, growth, tough competition and rising prices push the requirement up too.',
    }),
    sl('example', 'Worked example 5: reading a working capital case', {
      b: 'An imagined hosiery unit in Ludhiana changes its credit terms.',
      bl: ['Step 1 — Production time is unchanged: no effect from the production cycle.', 'Step 2 — Credit **allowed** to shops rises from 30 to 75 days: more funds stuck in debtors.', 'Step 3 — Credit **availed** from suppliers falls from 45 to 15 days: suppliers finance less.', 'Step 4 — Conclusion: working capital need **rises sharply**; name both factors and quote the figures.'],
      v: vWcWorked,
      n: 'Let us read a case. The hosiery unit makes goods in thirty days, before and after. But it now gives shops seventy-five days to pay, instead of thirty, so more money waits in debtors. And its yarn suppliers now want payment in fifteen days, not forty-five, so they finance less of its stock. Both changes push the working capital requirement up. In an answer, name each factor and support it with the figures.',
    }),
    sl('check', 'Quick check: a seasonal garment maker', {
      b: 'A woollen-garment maker needs far more working capital from July to November. Which factor explains this?',
      chk: 'm_wc_season',
      n: 'Think about when people buy woollen clothes, and when the maker must produce them.',
    }),
    sl('summary', 'Summary of Part 2', {
      bl: [
        '**Capital structure** = mix of debt and equity; debt is cheaper but adds **financial risk**.',
        '**Trading on equity** raises EPS only while **ROI > cost of debt**; otherwise it lowers EPS.',
        'Capital structure factors: cash flows, coverage ratios, ROI, costs, tax, floatation, risk, flexibility, control, regulation, markets, other firms.',
        '**Fixed capital** (long-term assets) and **working capital** (current assets), each with its own factors.',
      ],
      v: vEpsBars,
      n: 'To sum up Part 2. Capital structure is the mix of debt and equity. Debt is cheaper but brings financial risk. Trading on equity lifts earnings per share only while the return beats the interest rate. Many factors guide the mix, from cash flows and coverage ratios to control and market conditions. Finally, fixed capital funds long-term assets, and working capital funds the operating cycle.',
    }),
    sl('exam-tips', 'Exam tips for Part 2', {
      bl: [
        'In EPS questions show every step: interest → EBT → tax → EAT → number of shares → EPS.',
        'State the **condition** for trading on equity (ROI > rate of interest) in every answer on it.',
        'For capital structure factors, say **which way** each factor pushes (more debt or less debt).',
        'Do not mix up **fixed capital** factors (technique, diversification, leasing) with **working capital** factors (credit, season, operating cycle).',
        'Common mistake: calling debt "riskier for lenders"; it is riskier for the **company**.',
      ],
      v: table(['Common slip', 'Correct idea'], [['More debt always raises EPS', 'Only when ROI > interest rate'], ['Equity is riskier for the company', 'Debt is: it has fixed obligations'], ['Seasonal factor affects fixed capital', 'It affects working capital']], 'Table of three common slips and corrections: more debt raises EPS only when the return exceeds the interest rate; debt, not equity, is riskier for the company; the seasonal factor affects working capital, not fixed capital'),
      n: 'Some tips for Part 2. In numericals, show every step from interest to earnings per share; method marks are given for each. Whenever you write about trading on equity, state its condition. For each capital structure factor, say whether it favours more or less debt. And keep the factors of fixed capital and working capital in separate lists.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Financial Management — notes',
  sections: [
    {
      h: '1. Business finance and financial management',
      t: 1,
      b: '**Business finance**: the funds a business requires to set up, operate and expand.\n\n**Financial management**: procurement of funds at minimum cost and their effective utilisation, keeping risk in view. It affects the **size and mix of fixed and current assets**, the **mix of long-term and short-term funds**, the **debt-equity** proportion and the **profit retained**, so it decides the financial health of the firm.\n\n**Objective — wealth maximisation:** every decision should increase the **market price of equity shares**. A decision is good if the benefit it brings is more than its cost, after allowing for risk.',
      terms: [
        ['Business finance', 'Funds needed by a business for all its activities.'],
        ['Wealth maximisation', 'The objective of increasing the market value of the company\'s equity shares.'],
      ],
      v: vRoleAreas,
      vs: [vNeed],
    },
    {
      h: '2. Investment decision',
      t: 2,
      b: '**Long-term (capital budgeting):** investing in fixed assets or projects. Important because it affects **long-term growth and earning capacity**, involves **large amounts**, carries **risk**, and is **irreversible** except at a heavy cost.\n\n**Short-term (working capital):** levels of cash, stock and receivables.\n\n**Factors:** cash flows of the project; rate of return (with risk); investment criteria used to compare projects.',
      terms: [['Capital budgeting', 'Decision to invest funds in long-term assets or projects.']],
      v: vCapBudFactors,
    },
    {
      h: '3. Financing and dividend decisions',
      t: 2,
      b: '**Financing decision:** the quantum of funds from long-term sources — **shareholders\' funds** (equity, retained earnings) and **borrowed funds** (debentures, loans). Debt has a lower cost but higher risk; equity is safer but costlier.\n\nFactors: cost; risk; floatation costs; cash flow position; fixed operating cost; control considerations; state of the capital market.\n\n**Dividend decision:** how much profit is distributed and how much retained.\n\nFactors: amount of earnings; stability of earnings; stability of dividends; growth opportunities; cash flow position; shareholders\' preference; taxation policy; stock market reaction; access to the capital market; legal constraints; contractual constraints (loan conditions).',
      terms: [['Retained earnings', 'Profit kept in the business instead of being paid as dividend; an internal source of finance.']],
      v: vFinFactors,
      vs: [vDivFactors, vDecisions],
    },
    {
      h: '4. Financial planning',
      t: 3,
      b: 'A **financial blueprint** of the firm\'s future operations: estimates of funds needed, their timing and their sources. Prepared for three to five years and split into one-year budgets.\n\n**Objectives:** (1) funds should be available when needed; (2) the firm should avoid raising more than it requires.\n\n**Importance:** prepares the firm for different future situations and shocks; coordinates the various business functions; reduces waste and duplication; links present with future and investment with financing; sets standards for evaluating performance.',
      terms: [['Financial plan', 'An estimate of the amount, timing and sources of funds a business will need.']],
      v: vFpFlow,
      vs: [vFpWorked],
    },
    {
      h: '5. Capital structure and trading on equity',
      t: 4,
      b: '**Capital structure**: the mix of **debt** and **equity** (owners\' funds) in long-term finance. Debt is cheaper (interest is **tax-deductible**, lenders bear less risk) but raises **financial risk** because interest and repayment are **fixed obligations**.\n\n**Trading on equity**: raising the proportion of debt to increase **earnings per share (EPS = EAT ÷ number of equity shares)**. Favourable when **ROI > rate of interest**; unfavourable when ROI is lower.\n\n**Factors:** cash flow position; interest coverage ratio (EBIT ÷ interest); debt service coverage ratio; return on investment; cost of debt; tax rate; cost of equity; floatation costs; risk; flexibility; control; regulatory framework; stock market conditions; capital structure of other companies.',
      terms: [
        ['Financial risk', 'The chance that a firm cannot meet its fixed payments on debt.'],
        ['Trading on equity', 'Using more fixed-cost debt to increase earnings per share.'],
        ['Interest coverage ratio', 'EBIT divided by interest; how many times interest is covered.'],
      ],
      v: vToeWorked,
      vs: [vToeBad, vEpsBars, vCsFactors],
    },
    {
      h: '6. Fixed capital and working capital',
      t: 5,
      b: '**Fixed capital**: funds in long-term assets. Its management matters because of long-term growth, large amounts, risk and irreversibility. **Factors:** nature of business; scale of operations; choice of technique; technology upgradation; growth prospects; diversification; financing alternatives (leasing); level of collaboration.\n\n**Working capital**: funds in current assets. **Gross** = total current assets; **net** = current assets − current liabilities. **Factors:** nature of business; scale; business cycle; seasonal factors; production cycle; credit allowed; credit availed; operating efficiency; availability of raw material; growth prospects; level of competition; inflation.',
      terms: [
        ['Fixed capital', 'Funds invested in long-term assets such as land, buildings and machinery.'],
        ['Working capital', 'Funds invested in current assets such as stock, debtors and cash.'],
        ['Operating cycle', 'Time taken to convert cash into materials, goods, debtors and back into cash.'],
      ],
      v: vFcWc,
      vs: [vFixedFactors, vWcFactors, vCycle],
    },
  ],
  tips: '**Common mistakes**\n- Writing "profit maximisation" as the objective: write **wealth maximisation** (market value of equity shares).\n- Forgetting the **condition** for trading on equity: ROI must exceed the rate of interest.\n- Skipping steps in EPS sums: show interest, EBT, tax, EAT, number of shares and EPS.\n- Mixing fixed-capital factors with working-capital factors.\n- Treating debt as riskier for the **lender**: in this chapter, debt is riskier for the **company**.\n\n**How marks are usually awarded**\n- 1 mark: correct option or term.\n- 3 marks: three points, each with a line of explanation.\n- 5 marks: five explained points, or a full EPS working with a conclusion.\n- Case questions: quote the line, name the decision or factor, explain it.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['**Business finance**', 'Funds needed to set up, run and expand a business.', 'definition', 1],
  ['**Financial management**', 'Getting funds at least cost and using them most effectively, with risk in view.', 'definition', 1],
  ['Objective of financial management', '**Wealth maximisation**: maximise the market value of equity shares.', 'fact', 1],
  ['Why not profit maximisation?', 'Profit ignores **risk** and **timing**; the share price reflects both.', 'concept', 1],
  ['The three financial decisions', '**Investment**, **financing** and **dividend**.', 'fact', 2],
  ['**Capital budgeting**', 'Long-term investment decision: committing funds to fixed assets or projects.', 'definition', 2],
  ['Why capital budgeting is important', 'Long-term growth, large amounts, risk, irreversibility.', 'concept', 2],
  ['Factors of capital budgeting', 'Cash flows of the project, rate of return, investment criteria.', 'concept', 2],
  ['Factors of the financing decision', 'Cost, risk, floatation cost, cash flows, fixed operating cost, control, capital market.', 'concept', 2],
  ['**Floatation cost**', 'Expenses of raising funds, e.g. fees, printing and advertising for a share issue.', 'definition', 2],
  ['Growth opportunities and dividend', 'More good projects → **retain** more → **lower** dividend.', 'concept', 2],
  ['**Contractual constraints** on dividend', 'Loan agreements may restrict dividend payments.', 'definition', 2],
  ['Stock market reaction to a dividend rise', 'Usually **positive**: the share price tends to rise.', 'fact', 2],
  ['**Financial planning**', 'Financial blueprint of future operations: amount, timing and sources of funds.', 'definition', 3],
  ['Two objectives of financial planning', 'Funds **available when required**; **no unnecessary** raising of funds.', 'fact', 3],
  ['Time span of a financial plan', 'Long-term plan of about **3–5 years**, broken into **yearly budgets**.', 'fact', 3],
  ['**Capital structure**', 'Mix of **debt** and **equity** in long-term finance.', 'definition', 4],
  ['Debt vs equity: cost and risk (for the company)', 'Debt: **cheaper, riskier**. Equity: **costlier, safer**.', 'concept', 4],
  ['**Financial risk**', 'Chance of failing to meet fixed debt payments.', 'definition', 4],
  ['**Trading on equity**', 'More debt to raise EPS; works only when **ROI > interest rate**.', 'definition', 4],
  ['EPS formula', 'EPS = **EAT ÷ number of equity shares**.', 'formula', 4],
  [`Sahyadri Ceramics (good year): EPS A vs B`, `Plan A ₹${good.A.eps.toFixed(2)}; Plan B ₹${good.B.eps.toFixed(2)} (ROI ${ROI_GOOD}% > 10%).`, 'example', 4],
  ['**Interest coverage ratio**', 'EBIT ÷ interest; higher → safer to borrow more.', 'formula', 4],
  ['**Debt service coverage ratio**', 'Cash available ÷ (interest + principal due); higher → more debt possible.', 'formula', 4],
  ['Why a higher tax rate favours debt', 'Interest is **tax-deductible**, so the after-tax cost of debt falls.', 'concept', 4],
  ['Control factor', 'Owners afraid of **dilution** prefer debt (lenders do not vote).', 'concept', 4],
  ['**Fixed capital**', 'Funds in long-term assets; from long-term sources.', 'definition', 5],
  ['**Net working capital**', 'Current assets − current liabilities.', 'formula', 5],
  ['Leasing and fixed capital', 'If assets can be leased, **less** fixed capital is needed.', 'concept', 5],
  ['**Operating cycle**', 'Cash → materials → goods → debtors → cash; longer cycle → more working capital.', 'definition', 5],
  ['Credit allowed vs credit availed', 'More credit **allowed** → more WC; more credit **availed** → less WC.', 'exam-tip', 5],
  ['Seasonal factor belongs to…', '**Working capital** (not fixed capital).', 'exam-tip', 5],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-12-default-chapter-test-short',
  title: 'Chapter test (short) — Financial Management',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_wealth_max', 'm_fin_decision', 'm_wc_meaning', 'ar_toe'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and the 3-mark question in about 50–80 words.', items: ['s_toe_meaning', 's_fc_wc', 's3_cs_factors'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80–120 words.', items: [{ attempt: 1, keys: ['l_cs_factors', 'l_fc_factors'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks)', instr: 'Read the case and answer all parts. Part (c) has an internal choice.', items: ['cb_saurashtra'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-12-default-chapter-test-long',
  title: 'Chapter test (long) — Financial Management',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_fm_meaning', 'm_div_factor', 'm_fp_objective', 'm_toe_condition', 'm_control_cs', 'm_tax_debt', 'm_nature_fixed', 'm_credit_allowed', 'ar_contract', 'ar_fixed_long'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and 3-mark questions in about 50–80 words. Questions 13 and 15 have an internal choice.', items: ['s_fm_role', 's_fin_factors', { attempt: 1, keys: ['s_wealth_obj', 's_financial_risk'] }, 's_three_decisions', { attempt: 1, keys: ['s_fp_imp', 's3_wc_factors'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80–120 words each.', items: ['l_toe_work', { attempt: 1, keys: ['l_div_factors', 'l_wc_factors'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks each)', instr: 'Read each case and answer all parts. Part (c) of each has an internal choice.', items: ['cb_vindhya', 'cb_brahmaputra'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t05 of cbse-12-business-studies-ch09 only (concept, role and objective; financial decisions; financial planning; capital structure; fixed and working capital)',
    originality: 'every firm, person, case and figure written for this chapter (imagined, labelled); no NCERT text, exercise or board/sample-paper item reused',
    data: `EPS and ratio figures computed and asserted by the build (Sahyadri Ceramics: EPS ${good.A.eps} vs ${good.B.eps} at ROI ${ROI_GOOD}%, ${bad.A.eps} vs ${bad.B.eps} at ROI ${ROI_BAD}%; Kaveri Pumps, Tapti Motors, Vindhya Agro Foods EPS; interest coverage, debt-equity, ROI and net working capital items)`,
    gate: 'npm test -w @soyl/content-templates, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
