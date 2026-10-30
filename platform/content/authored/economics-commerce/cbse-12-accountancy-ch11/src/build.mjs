// Build CBSE 12 Accountancy ch11 Cash Flow Statement. Run from platform/:
//   npx tsx content/authored/economics-commerce/cbse-12-accountancy-ch11/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';

setUnit('cbse-12-accountancy-ch11', 'economics-commerce');
const { fig, rs, rupees, words, sum, check, cashFlow } = await import('./acc.mjs');
const { FACTS } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- the case company: Sabari Spices Ltd (imagined, Kumily)
const SA = cashFlow({
  name: 'Sabari Spices Ltd',
  lines: [
    ['sc', 'Equity share capital', 'sc', 1000000, 1200000],
    ['sp', 'Securities premium', 'sp', 0, 20000],
    ['gr', 'General reserve', 'gr', 100000, 150000],
    ['sur', 'Surplus in the Statement of Profit and Loss', 'surplus', 160000, 240000],
    ['loan', '10% Long-term loan from a bank', 'ltb', 400000, 300000, { name: 'long-term bank loan' }],
    ['tp', 'Trade payables', 'wcL', 180000, 150000],
    ['oe', 'Outstanding expenses', 'wcL', 20000, 30000],
    ['pt', 'Provision for tax', 'tax', 60000, 80000],
    ['pm', 'Plant and machinery (at cost)', 'ppe', 1200000, 1500000, { name: 'machinery' }],
    ['ad', 'Less: Accumulated depreciation', 'accdep', 300000, 360000, { of: 'pm' }],
    ['inv', 'Non-current investments', 'inv', 380000, 330000],
    ['stock', 'Inventories', 'wcA', 240000, 300000],
    ['tr', 'Trade receivables', 'wcA', 200000, 180000],
    ['pre', 'Prepaid expenses', 'wcA', 10000, 15000],
    ['cash', 'Cash and cash equivalents', 'cce', 190000, 205000],
  ],
  info: {
    fa: { pm: { sold: { cost: 100000, accDep: 40000, price: 50000 } } },
    invest: { inv: { sold: { cost: 50000, price: 60000 } } },
    tax: { pt: { provided: 90000 } },
    interestPaid: [['Interest on long-term bank loan', 30000]],
    dividendReceived: [['Dividend received on investments', 14000]],
    dividendPaid: [['Final dividend for 2024-25', 60000], ['Interim dividend for 2025-26', 40000]],
  },
  pins: { npbt: 320000, A: 301000, B: -276000, C: -10000, D: 15000 },
});
const M = SA.L.find((l) => l.k === 'pm').fa;
const IV = SA.L.find((l) => l.k === 'inv').invest;
const TX = SA.L.find((l) => l.k === 'pt').taxAcc;
check(M.purchase === 400000 && M.dep === 100000 && M.loss === 10000 && TX.paid === 70000 && IV.profit === 10000, 'Sabari working accounts');
check(SA.A.opbwc === 436000 && SA.A.cashGen === 371000 && SA.totals[0] === 2170000 && SA.totals[1] === 1920000, 'Sabari statement');
// Interest on the loan: 10% on the balance outstanding for the year (repaid 1 April 2025).
check((300000 * 10) / 100 === 30000, 'Sabari interest');

// ---------------------------------------------------------------- deck 1 data
// Profit is not cash: Moyar Garments Ltd (imagined, Tiruppur).
const MO = [['Net profit for the year', 300000], ['Add: Depreciation (no cash paid)', 60000], ['Less: Increase in trade receivables (not yet collected)', -180000], ['Less: Increase in inventories (cash tied up in stock)', -70000], ['Less: New stitching machines bought', -120000], ['Less: Part of a bank loan repaid', -40000]];
const MO_change = sum(MO.map((x) => x[1]));
check(MO_change === -50000, 'Moyar change in cash');
// Worked example 1: Tapti Tiles Ltd (imagined, Surat).
const TT = [
  ['Cash in hand', 18000, true, 'cash'],
  ['Balance in current account', 142000, true, 'cash (demand deposit)'],
  ['Treasury bills bought with 60 days to maturity', 50000, true, 'cash equivalent'],
  ['Fixed deposit maturing in five months', 100000, false, 'more than three months'],
  ['Listed shares held for sale', 40000, false, 'risk of change in value'],
  ['Commercial paper with 75 days to maturity when bought', 30000, true, 'cash equivalent'],
];
const TT_cce = sum(TT.filter((x) => x[2]).map((x) => x[1]));
check(TT_cce === 240000, 'Tapti cash and cash equivalents');
// Worked example 2: Mahanadi Motors Ltd (imagined, Cuttack).
const MM = [
  ['Cash received from customers', 1840000, 'Operating'],
  ['Cash paid to suppliers and employees', -1460000, 'Operating'],
  ['Income tax paid', -90000, 'Operating'],
  ['Bought machinery', -520000, 'Investing'],
  ['Sold an old machine', 60000, 'Investing'],
  ['Interest received on investments', 25000, 'Investing'],
  ['Issued equity shares', 400000, 'Financing'],
  ['Interest paid on a loan', -48000, 'Financing'],
  ['Dividend paid', -120000, 'Financing'],
];
const MMt = (a) => sum(MM.filter((x) => x[2] === a).map((x) => x[1]));
const MM_A = MMt('Operating');
const MM_B = MMt('Investing');
const MM_C = MMt('Financing');
check(MM_A === 290000 && MM_B === -435000 && MM_C === 232000 && MM_A + MM_B + MM_C === 87000, 'Mahanadi totals');

// ---------------------------------------------------------------- visuals: deck 1
const vRoute1 = flow('LR', ['Why cash is not profit', 'Meaning and objectives', 'Cash and cash equivalents', 'What is not a cash flow', 'Three activities', 'Classifying transactions'], 'Route map of Part 1: why cash is not profit, meaning and objectives, cash and cash equivalents, what is not a cash flow, the three activities and classifying transactions', 'Part 1 at a glance');
const vProfitCash = table(
  ['Moyar Garments Ltd (imagined), 2025-26', '₹'],
  [...MO.map(([l, v]) => [l, fig(v)]), ['**Net decrease in cash**', `**${fig(MO_change)}**`]],
  `Table showing that an imagined company earned a profit of ${fig(300000)} yet its cash fell by ${fig(-MO_change)}, because customers had not paid, stock was built up, machines were bought and a loan was repaid`,
  'Profit is earned on the accrual basis; cash moves only when money is received or paid.',
);
const vMeaning = table(
  ['Section of the statement', 'Shows cash flows from…'],
  [
    ['A. Operating activities', 'the main revenue-earning business: customers, suppliers, employees, tax'],
    ['B. Investing activities', 'buying and selling long-term assets and investments'],
    ['C. Financing activities', 'raising and repaying owners’ capital and borrowings, interest and dividends paid'],
    ['D. Net change (A + B + C)', 'the increase or decrease in cash and cash equivalents'],
    ['E, F. Opening and closing cash', 'the reconciliation with the two balance sheets'],
  ],
  'Table of the sections of a cash flow statement: operating, investing and financing activities, the net change, and the opening and closing cash and cash equivalents',
  'Accounting Standard 3, Cash Flow Statements.',
);
const vObjectives = table(
  ['Objective', 'Who gains'],
  [
    ['Show the sources and uses of cash, activity by activity', 'Management, investors'],
    ['Show whether operations generate enough cash', 'Lenders, creditors, shareholders'],
    ['Explain the gap between profit and cash', 'Shareholders, analysts'],
    ['Help plan future cash needs and repayments', 'Management, bankers'],
    ['Compare cash performance across years and firms', 'Investors, analysts'],
  ],
  'Table of objectives of the cash flow statement: sources and uses of cash, cash-generating ability of operations, the gap between profit and cash, planning, and comparison',
);
const vCCE = table(
  ['Included in cash and cash equivalents', 'Not included'],
  [
    ['Cash in hand; balances in current and savings accounts', 'Fixed deposits with more than three months to maturity when made'],
    ['Treasury bills and commercial paper with three months or less to maturity when acquired', 'Equity shares, even if listed (value can change)'],
    ['Short-term deposits maturing within three months', 'Trade receivables and inventories (operating assets)'],
  ],
  'Table of what is and is not included in cash and cash equivalents: cash and bank balances and short-term investments maturing within three months are included; longer deposits, equity shares, receivables and inventories are not',
  'Test: short-term, highly liquid, known amount of cash, insignificant risk of change in value.',
);
const vWE1 = table(
  ['Holding of Tapti Tiles Ltd (imagined)', '₹', 'Included?'],
  [...TT.map(([l, v, ok, why]) => [l, fig(v), ok ? `Yes (${why})` : `No (${why})`]), ['**Cash and cash equivalents**', `**${fig(TT_cce)}**`, '']],
  `Worked example table: of six holdings of an imagined tile company, cash in hand, the current account, sixty-day treasury bills and seventy-five-day commercial paper qualify, giving cash and cash equivalents of ${fig(TT_cce)}`,
);
const vNotFlows = table(
  ['Situation', 'Example', 'In the statement?'],
  [
    ['Movement within cash and cash equivalents', 'Buying 60-day treasury bills from the bank balance', 'No: the total is unchanged'],
    ['Non-cash investing or financing', 'Shares issued to the seller of a building', 'No: shown in a note'],
    ['Book transfer', 'Bonus shares out of the general reserve', 'No: no cash involved'],
    ['Non-cash charge', 'Depreciation, goodwill written off', 'Only as an add-back to profit'],
  ],
  'Table of items that are not cash flows: movements within cash and cash equivalents, non-cash investing and financing transactions, book transfers such as bonus shares, and non-cash charges such as depreciation',
);
const vActivities = flow('TB', ['Operating activities', 'Investing activities', 'Financing activities', 'Net change in cash and cash equivalents', 'Opening plus net change equals closing cash'], 'Flow diagram: cash flows from operating, investing and financing activities add up to the net change in cash and cash equivalents, which reconciles opening and closing cash', 'Three activities, one net change', [{ from: 'n1', to: 'n4' }, { from: 'n2', to: 'n4' }, { from: 'n3', to: 'n4' }, { from: 'n4', to: 'n5' }]);
const vOperating = table(
  ['Operating inflows', 'Operating outflows'],
  [
    ['Cash sales; cash collected from customers', 'Payments to suppliers for goods and services'],
    ['Royalties, fees, commission received', 'Wages, salaries and other employee costs'],
    ['Refund of income tax', 'Income tax paid (unless linked to investing or financing)'],
  ],
  'Table of operating activities: inflows from customers, royalties and fees, outflows to suppliers and employees and for income tax',
  'Principal revenue-producing activities of the enterprise.',
);
const vInvesting = table(
  ['Investing inflows', 'Investing outflows'],
  [
    ['Sale of land, buildings, machinery, vehicles, patents', 'Purchase of fixed assets and intangible assets'],
    ['Sale of shares or debentures of other companies (not cash equivalents)', 'Purchase of such investments'],
    ['Interest and dividend received (non-financial company)', 'Loans and advances given to other parties'],
  ],
  'Table of investing activities: inflows from sale of fixed assets and investments and from interest and dividend received; outflows for assets, investments and loans given',
);
const vFinancing = table(
  ['Financing inflows', 'Financing outflows'],
  [
    ['Issue of equity or preference shares (with any premium)', 'Repayment of long-term and short-term loans'],
    ['Issue of debentures; long-term loans raised', 'Interest paid (non-financial company)'],
    ['Short-term bank borrowings raised', 'Dividends paid, final and interim'],
  ],
  'Table of financing activities: inflows from shares, debentures and loans; outflows for repayment of loans, interest and dividends',
);
const vIntDiv = table(
  ['Item', 'Non-financial company', 'Financial company (bank, lender)'],
  [
    ['Interest received', 'Investing', 'Operating'],
    ['Dividend received', 'Investing', 'Operating'],
    ['Interest paid', 'Financing', 'Operating'],
    ['Dividend paid', 'Financing', 'Financing'],
    ['Income tax paid', 'Operating (usually)', 'Operating (usually)'],
  ],
  'Table of how interest, dividends and income tax are classified: for a non-financial company interest and dividend received are investing and interest and dividend paid are financing; for a financial company all except dividend paid are operating; income tax is usually operating',
);
const vWE2 = table(
  ['Cash transaction of Mahanadi Motors Ltd (imagined)', 'Activity', '₹'],
  [...MM.map(([l, v, a]) => [l, a, fig(v)]), ['**Net cash from operating activities**', '', `**${fig(MM_A)}**`], ['**Net cash used in investing activities**', '', `**${fig(MM_B)}**`], ['**Net cash from financing activities**', '', `**${fig(MM_C)}**`], ['**Net increase in cash and cash equivalents**', '', `**${fig(MM_A + MM_B + MM_C)}**`]],
  `Worked example table: nine cash transactions of an imagined company classified into the three activities, giving operating ${fig(MM_A)}, investing ${fig(MM_B)}, financing ${fig(MM_C)} and a net increase of ${fig(MM_A + MM_B + MM_C)}`,
);
const vSummary1 = table(
  ['Idea', 'Remember'],
  [
    ['Cash flow statement', 'Inflows and outflows of cash and cash equivalents, Accounting Standard 3'],
    ['Cash equivalent', 'Short-term, highly liquid, maturity three months or less, insignificant risk'],
    ['Not a cash flow', 'Switching between cash and cash equivalents; non-cash transactions'],
    ['Operating', 'Main business, including income tax paid'],
    ['Investing', 'Long-term assets, investments, interest and dividend received'],
    ['Financing', 'Shares, debentures, loans, interest and dividends paid'],
  ],
  'Summary table of Part 1: the cash flow statement, cash equivalents, what is not a cash flow, and the three activities',
);

// ---------------------------------------------------------------- visuals: deck 2
const vRoute2 = flow('LR', ['Net profit before tax', 'Adjust non-cash and non-operating items', 'Adjust working capital', 'Deduct tax paid', 'Investing and financing', 'Check against cash'], 'Route map of Part 2: start from net profit before tax, adjust non-cash and non-operating items and working capital, deduct tax paid, add investing and financing flows, and check against the change in cash', 'The indirect method, step by step');
const vMethods = table(
  ['', 'Direct method (mention only)', 'Indirect method (in the syllabus)'],
  [
    ['Operating section starts from', 'Gross cash received from customers', 'Net profit before tax'],
    ['Then', 'Deducts gross cash paid to suppliers, employees and for tax', 'Adjusts for non-cash items, non-operating items and working capital'],
    ['Investing and financing sections', 'The same in both methods', 'The same in both methods'],
  ],
  'Table comparing the direct and the indirect method: they differ only in how operating cash flow is worked out; investing and financing are the same',
  'Accounting Standard 3 allows both; the CBSE syllabus uses the indirect method only.',
);
const vSkeleton = table(
  ['Cash flow statement (indirect method)', '₹', '₹'],
  [
    ['**A. Cash flows from operating activities**', '', ''],
    ['Net profit before tax', 'xxx', ''],
    ['Add: non-cash and non-operating charges; Less: non-operating income', 'xxx', ''],
    ['**Operating profit before working capital changes**', 'xxx', ''],
    ['Add / Less: changes in current assets and current liabilities', 'xxx', ''],
    ['**Cash generated from operations**; Less: income tax paid', 'xxx', ''],
    ['**Net cash from operating activities**', '', 'xxx'],
    ['**B. Cash flows from investing activities**', '', 'xxx'],
    ['**C. Cash flows from financing activities**', '', 'xxx'],
    ['**D. Net increase or decrease (A + B + C)**; add opening cash and cash equivalents', '', 'xxx'],
    ['**Closing cash and cash equivalents**', '', 'xxx'],
  ],
  'Skeleton format of a cash flow statement by the indirect method: operating section from net profit before tax to net cash from operating activities, then investing and financing sections, the net change, and opening and closing cash',
);
const vSabariBS = table(SA.bs.headers, SA.bs.rows, `Comparative balance sheet of the imagined Sabari Spices Ltd at the end of 2026 and 2025: totals ${fig(SA.totals[0])} and ${fig(SA.totals[1])}; cash and cash equivalents rose from ${fig(SA.open)} to ${fig(SA.close)}`, 'An imagined company; current year first, as in Schedule III.');
const vNpbt = table(SA.npbtTable.headers, SA.npbtTable.rows, `Working of net profit before tax of Sabari Spices: increase in surplus ${fig(SA.dSurplus)}, plus transfer to reserve, dividends paid and provision for tax, gives ${fig(SA.npbt)}`);
const vAdjust = table(
  ['Add back (reduced profit, no operating cash out)', 'Deduct (raised profit, not operating cash in)'],
  [
    ['Depreciation and amortisation', 'Profit on sale of fixed assets'],
    ['Goodwill, patents or preliminary expenses written off', 'Profit on sale of investments'],
    ['Loss on sale of fixed assets or investments', 'Interest received (non-financial company)'],
    ['Interest and other finance costs', 'Dividend received (non-financial company)'],
  ],
  'Table of adjustments to net profit before tax: add back depreciation, amortisation, write-offs, losses on sale and finance costs; deduct profits on sale and interest and dividend received',
);
const vWCRule = table(
  ['Change during the year', 'Current asset (inventories, receivables, prepaid)', 'Current liability (payables, outstanding expenses)'],
  [
    ['Increase', 'Deduct: cash tied up', 'Add: cash not yet paid'],
    ['Decrease', 'Add: cash released', 'Deduct: cash paid off'],
  ],
  'Table of the working-capital rule: an increase in a current asset is deducted and a decrease added; an increase in a current liability is added and a decrease deducted',
  'Cash and cash equivalents, provision for tax and short-term borrowings are dealt with separately.',
);
const vWE_A = table(SA.part('A').headers, SA.part('A').rows, `Operating section of Sabari Spices: net profit before tax ${fig(SA.npbt)}, operating profit before working capital changes ${fig(SA.A.opbwc)}, cash generated ${fig(SA.A.cashGen)}, tax paid ${fig(SA.A.taxPaid)}, net cash from operating activities ${fig(SA.A.A)}`);
const vMach = table(M.ledger.headers, M.ledger.rows, `Machinery account of Sabari Spices at cost: opening ${fig(M.a)}, closing ${fig(M.b)}; the machine sold leaves at cost against its accumulated depreciation, sale price and loss; purchases are the balancing figure, ${fig(M.purchase)}`, 'Working account at cost.');
const vAccDep = table(M.accLedger.headers, M.accLedger.rows, `Accumulated depreciation account of Sabari Spices: opening ${fig(M.acc[0])}, transfer on sale ${fig(M.sold.accDep)}, closing ${fig(M.acc[1])}; depreciation for the year is the balancing figure, ${fig(M.dep)}`);
const vTax = table(TX.ledger.headers, TX.ledger.rows, `Provision for tax account of Sabari Spices: opening ${fig(TX.a)} plus provision for the year ${fig(TX.provided)} less closing ${fig(TX.b)} gives tax paid of ${fig(TX.paid)}`);
const vInv = table(IV.ledger.headers, IV.ledger.rows, `Investments account of Sabari Spices: investments costing ${fig(IV.cost)} sold for ${fig(IV.price)}, a profit of ${fig(IV.profit)}`);
const vWE_B = table(SA.part('B').headers, SA.part('B').rows, `Investing section of Sabari Spices: machinery bought ${fig(M.purchase)}, machinery sold ${fig(M.price)}, investments sold ${fig(IV.price)}, dividend received; net cash used ${fig(-SA.B.total)}`);
const vWE_C = table(SA.part('C').headers, SA.part('C').rows, `Financing section of Sabari Spices: shares issued with premium, loan repaid, interest and two dividends paid; net cash used ${fig(-SA.C.total)}`);
const vFull = table(SA.stmt.headers, SA.stmt.rows, `Complete cash flow statement of Sabari Spices: operating ${fig(SA.A.A)}, investing ${fig(SA.B.total)}, financing ${fig(SA.C.total)}, net increase ${fig(SA.D)}, opening cash ${fig(SA.open)}, closing cash ${fig(SA.close)}`, 'The net increase equals closing minus opening cash: the cash check.');
const vWaterfall = (() => {
  const s = new Svg(600, 280);
  const steps = [['Opening cash', SA.open, 'base'], ['Operating', SA.A.A, 'flow'], ['Investing', SA.B.total, 'flow'], ['Financing', SA.C.total, 'flow'], ['Closing cash', SA.close, 'base']];
  const top = Math.max(SA.open, SA.open + SA.A.A, SA.open + SA.A.A + SA.B.total, SA.close);
  const H = 180;
  const Y0 = 220;
  const y = (v) => Y0 - (H * v) / top;
  const W = 80;
  const GAP = 30;
  let level = 0;
  steps.forEach(([label, v, kind], i) => {
    const x = 45 + i * (W + GAP);
    const from = kind === 'base' ? 0 : level;
    const to = kind === 'base' ? v : level + v;
    const c = kind === 'base' ? 'blue' : v >= 0 ? 'green' : 'red';
    s.rect(x, y(Math.max(from, to)), W, Math.abs(y(from) - y(to)), { fill: c, color: c, sw: 1, rx: 2, fillOpacity: 0.35 });
    s.text(x + W / 2, y(Math.max(from, to)) - 12, `${kind === 'flow' && v >= 0 ? '+' : ''}${fig(v)}`, { size: 13, bold: true });
    s.text(x + W / 2, Y0 + 18, label, { size: 12 });
    if (kind === 'flow') s.line(x - GAP, y(from), x, y(from), { sw: 1, dash: true, color: 'muted' });
    level = to;
  });
  check(level === SA.close, 'waterfall ends at closing cash');
  s.line(30, Y0, 580, Y0, { sw: 1.2 });
  s.text(300, 266, `${fig(SA.open)} + ${fig(SA.A.A)} − ${fig(-SA.B.total)} − ${fig(-SA.C.total)} = ${fig(SA.close)} (₹)`, { size: 13, bold: true });
  return s.visual(
    `Waterfall chart of Sabari Spices: opening cash ${words(SA.open)} rupees, plus ${words(SA.A.A)} from operating activities, less ${words(-SA.B.total)} on investing and ${words(-SA.C.total)} on financing, ends at closing cash of ${words(SA.close)} rupees`,
    'Bar heights are computed from the statement.',
  );
})();
const vSummary2 = table(
  ['Step', 'What to do'],
  [
    ['1. Net profit before tax', 'Increase in surplus + transfers to reserves + dividends paid + provision for tax'],
    ['2. Adjustments', 'Add back depreciation, write-offs, losses on sale, finance costs; deduct profits on sale, interest and dividend received'],
    ['3. Working capital', 'Current asset up: deduct; current liability up: add (and the reverse)'],
    ['4. Tax', 'Deduct tax paid (from the provision for tax account)'],
    ['5. Investing and financing', 'Use working accounts for assets and investments; interest and dividends paid under financing'],
    ['6. Cash check', 'A + B + C = closing − opening cash and cash equivalents'],
  ],
  'Summary table of Part 2: the six steps of the indirect method from net profit before tax to the cash check',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Cash Flow Statement — Part 1: Meaning, Cash Equivalents and Classification of Activities',
  goals: [
    'Explain what a cash flow statement is, why it is prepared and how profit differs from cash',
    'Identify cash and cash equivalents and recognise what is not a cash flow',
    'Classify cash flows into operating, investing and financing activities',
    'Classify interest, dividends and income tax correctly for financial and non-financial companies',
  ],
  slides: [
    sl('title', 'Cash Flow Statement', {
      b: 'Part 1 — what the statement shows, what counts as **cash and cash equivalents**, and how every cash flow is classified into **operating**, **investing** and **financing** activities.',
      v: vRoute1,
      n: 'A company can be profitable and still run short of cash. The cash flow statement tells us where cash came from and where it went during the year. In this part we learn what the statement is, what counts as cash and cash equivalents, and how every cash flow is sorted into one of three activities: operating, investing and financing.',
    }),
    sl('concept', 'Profit is not cash', {
      v: vProfitCash,
      n: `Meet Moyar Garments, an imagined company in Tiruppur. It earned a profit of ${rupees(300000)}, yet its cash fell by ${rupees(-MO_change)}. Customers had not yet paid, stock had piled up, new machines were bought and part of a loan was repaid. Profit follows the accrual basis; cash moves only when money actually comes in or goes out. The cash flow statement bridges the two.`,
    }),
    sl('concept', 'What is a cash flow statement?', {
      v: vMeaning,
      bl: ['Prepared under **Accounting Standard 3** (Cash Flow Statements).', 'Covers a period: inflows and outflows of **cash and cash equivalents**.'],
      n: 'A cash flow statement shows the inflows and outflows of cash and cash equivalents during a period. Accounting Standard three requires the flows to be grouped into operating, investing and financing activities. Their total is the net change in cash, which must reconcile the opening balance with the closing balance in the two balance sheets.',
    }),
    sl('concept', 'Objectives of the statement', {
      v: vObjectives,
      n: 'Why prepare it? It shows the sources and uses of cash activity by activity. It tells lenders and shareholders whether the main business produces enough cash to pay its way. It explains why profit and cash differ. It helps management plan future cash needs and repayments. And because cash figures do not depend on accounting policies, it makes comparison between years and firms easier.',
    }),
    sl('check', 'Quick check: the purpose', {
      b: 'Choose the main purpose of the statement.',
      chk: 'm_objective',
      n: 'Which statement explains the movement in cash, rather than profit or position?',
    }),
    sl('concept', 'Cash and cash equivalents', {
      v: vCCE,
      bl: ['**Cash**: cash in hand and demand deposits with banks.', '**Cash equivalents**: short-term, highly liquid investments, readily convertible into known amounts of cash, with an insignificant risk of change in value.'],
      n: 'Cash means cash in hand and money in current or savings accounts. Cash equivalents are short-term, highly liquid investments that can be turned into a known amount of cash with little risk of a change in value. As a rule, they mature within three months of the date they are acquired: treasury bills, commercial paper and short deposits. Equity shares never qualify.',
    }),
    sl('check', 'Quick check: the maturity test', {
      b: 'Fill in the blank.',
      chk: 'fb_three_months',
      n: 'How short must the maturity be, counted from the date the investment is acquired?',
    }),
    sl('example', 'Worked example 1: cash and cash equivalents of Tapti Tiles', {
      b: 'Tapti Tiles Ltd (imagined, Surat) lists six holdings at the year end. Which of them are cash and cash equivalents?',
      v: vWE1,
      n: `Tapti Tiles, an imagined company in Surat, lists six holdings. Cash in hand and the current account are cash. Sixty-day treasury bills and commercial paper with seventy-five days to run are cash equivalents. The five-month fixed deposit is too long, and the listed shares can change in value. So cash and cash equivalents total ${rupees(TT_cce)}.`,
    }),
    sl('check', 'Quick check: shares that sell in a day', {
      b: 'True or false?',
      chk: 'tf_shares_ce',
      n: 'Is being easy to sell enough to make an investment a cash equivalent?',
    }),
    sl('concept', 'What is not a cash flow', {
      v: vNotFlows,
      n: 'Some items never appear as flows. Moving money from the bank into a sixty-day treasury bill changes only the make-up of cash and cash equivalents, not their total. Issuing shares to the seller of a building, or issuing bonus shares, involves no cash at all; such non-cash transactions are disclosed in the notes instead. Depreciation is a non-cash charge: it appears only as an add-back to profit.',
    }),
    sl('concept', 'Three activities, one net change', {
      v: vActivities,
      n: 'Every cash flow belongs to one of three activities. Operating activities are the main revenue-earning business. Investing activities are the purchase and sale of long-term assets and investments. Financing activities change the owners’ capital and the borrowings. The three totals add up to the net change in cash and cash equivalents, which reconciles the opening and closing balances.',
    }),
    sl('concept', 'Operating activities', {
      v: vOperating,
      n: 'Operating activities are the principal revenue-producing activities of the business. Inflows include cash from customers and royalties or fees earned. Outflows include payments to suppliers and to employees. Income tax paid is also operating, because tax arises from the profit of the business and is hard to split among activities, unless it is clearly linked to an investing or financing transaction.',
    }),
    sl('concept', 'Investing activities', {
      v: vInvesting,
      n: 'Investing activities concern long-term assets and investments that are not cash equivalents. Buying land, machinery, vehicles or patents is an outflow; selling them is an inflow. Buying shares or debentures of other companies, or lending money to another company, is an outflow too. For a company that is not a financial enterprise, interest and dividend received are investing inflows.',
    }),
    sl('concept', 'Financing activities', {
      v: vFinancing,
      n: 'Financing activities change the size and make-up of owners’ capital and borrowings. Issuing shares, with any premium, and issuing debentures or raising loans bring cash in. Repaying loans, and paying interest and dividends, take cash out. For a company that is not a financial enterprise, interest paid is treated as a cost of finance, so it sits here, beside dividends paid.',
    }),
    sl('concept', 'Interest, dividends and tax: whose business is it?', {
      v: vIntDiv,
      n: 'For an ordinary trading or manufacturing company, interest and dividend received are investing, and interest and dividend paid are financing. For a bank or a lending company, lending is its main business, so interest received, dividend received and interest paid are operating. Dividend paid is financing for everyone. Income tax paid is usually operating.',
    }),
    sl('check', 'Quick check: classify four transactions', {
      b: 'Match each transaction with its class.',
      chk: 'mt_activities',
      n: 'For each transaction, ask: is it trading, a long-term asset, a change in capital or borrowing, or no flow at all?',
    }),
    sl('example', 'Worked example 2: classifying the cash flows of Mahanadi Motors', {
      b: 'Mahanadi Motors Ltd (imagined, Cuttack) had nine cash transactions in the year. Classify them and find the total for each activity.',
      v: vWE2,
      n: `Mahanadi Motors, an imagined company in Cuttack, had nine cash transactions. Receipts from customers, payments to suppliers and staff, and tax paid are operating, a net inflow of ${rupees(MM_A)}. Machinery bought and sold and interest received are investing, a net outflow of ${rupees(-MM_B)}. Shares issued, interest paid and dividend paid are financing, an inflow of ${rupees(MM_C)}. Cash rose by ${rupees(MM_A + MM_B + MM_C)}.`,
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up: the cash flow statement explains the change in cash and cash equivalents during a year. Cash equivalents are short-term, highly liquid investments maturing within three months. Switching between cash and cash equivalents and non-cash transactions are not flows. Every flow is operating, investing or financing, and interest and dividends are classified according to the kind of business.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Apply the **three-month** test from the date of **acquisition**; shares are never cash equivalents.',
        'For a **non-financial** company: interest and dividend **received** are investing; **paid** are financing.',
        'Income tax paid is **operating** unless clearly linked to another activity.',
        '**Non-cash** transactions are left out of all three activities.',
        'In a classification answer, write the **activity** and whether it is an **inflow** or **outflow**.',
      ],
      n: 'In the exam, apply the three-month test from the date of acquisition, and remember that shares are never cash equivalents. For an ordinary company, interest and dividend received are investing, and paid are financing. Income tax paid is operating. Leave non-cash transactions out completely. When you classify, name the activity and say whether the item is an inflow or an outflow.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Cash Flow Statement — Part 2: Preparation by the Indirect Method',
  goals: [
    'Work out net profit before tax from the changes in surplus, reserves, dividends and the provision for tax',
    'Adjust profit for non-cash items, non-operating items and working-capital changes to find cash from operating activities',
    'Use working accounts for fixed assets, accumulated depreciation, investments and provision for tax',
    'Prepare investing and financing sections and check the statement against the change in cash',
  ],
  slides: [
    sl('title', 'Preparing the statement: the indirect method', {
      b: 'Part 2 — from two balance sheets and additional information to a complete **cash flow statement**, with the **cash check** at the end.',
      v: vRoute2,
      n: 'Now we prepare the statement. We are given two balance sheets and some additional information. We find the net profit before tax, adjust it to reach the cash from operating activities, use working accounts to find the investing and financing flows, and finish with a check: the net change must equal the change in cash between the two balance sheets.',
    }),
    sl('concept', 'Direct and indirect methods', {
      v: vMethods,
      n: 'Accounting Standard three allows two ways of working out cash from operating activities. The direct method lists gross cash received from customers and gross cash paid out. The indirect method starts from net profit before tax and adjusts it. The CBSE syllabus uses the indirect method only, so the direct method is just for awareness. Investing and financing sections are the same either way.',
    }),
    sl('concept', 'The format at a glance', {
      v: vSkeleton,
      n: 'Here is the shape of the statement. The operating section begins with net profit before tax, adds back and deducts the adjustments, reaches operating profit before working capital changes, adjusts for working capital, and deducts tax paid. Then come the investing and financing sections. The three totals give the net change, which, added to the opening cash, must give the closing cash.',
    }),
    sl('concept', 'Our case company: Sabari Spices Ltd', {
      v: vSabariBS,
      n: `Meet Sabari Spices, an imagined company in Kumily. Its balance sheet total grew from ${rupees(SA.totals[1])} to ${rupees(SA.totals[0])}, and its cash and cash equivalents rose from ${rupees(SA.open)} to ${rupees(SA.close)}. We also know that a machine was sold at a loss, some investments were sold at a profit, part of the bank loan was repaid and two dividends were paid.`,
    }),
    sl('example', 'Worked example 3: net profit before tax', {
      b: `Sabari (imagined): surplus rose from ${rs(SA.L.find((l) => l.k === 'sur').a)} to ${rs(SA.L.find((l) => l.k === 'sur').b)}; ${rs(SA.transfer)} transferred to general reserve; dividends paid ${rs(SA.divPaid)}; provision for tax made ${rs(SA.taxProvided)}.`,
      v: vNpbt,
      n: `The balance sheet shows only the profit kept back. To rebuild net profit before tax, start with the increase in surplus, ${rupees(SA.dSurplus)}. Add back what was taken out of profit: the transfer to general reserve and both dividends paid. That gives profit after tax of ${rupees(SA.npbt - SA.taxProvided)}. Add the provision for tax made this year, and net profit before tax is ${rupees(SA.npbt)}.`,
    }),
    sl('concept', 'Adjusting for non-cash and non-operating items', {
      v: vAdjust,
      n: 'Next, undo the items in profit that are not operating cash. Add back depreciation and amortisation, write-offs, losses on selling assets or investments, and finance costs, because no operating cash left the business for them. Deduct profits on sale, interest received and dividend received, because they are either not cash from operations or belong to investing activities. The result is operating profit before working capital changes.',
    }),
    sl('concept', 'Working-capital changes', {
      v: vWCRule,
      bl: ['Compare each current item in the two balance sheets.', 'Provision for tax and short-term borrowings are **not** working-capital items here.'],
      n: 'Then adjust for changes in current assets and current liabilities. If inventories or receivables rise, cash is tied up, so deduct the increase. If they fall, cash is released, so add. Current liabilities work the other way: a rise in trade payables means bills not yet paid, so add it; a fall means they were paid off, so deduct it.',
    }),
    sl('check', 'Quick check: payables rise', {
      b: 'Choose the correct treatment.',
      chk: 'm_wc_tp',
      n: 'If suppliers are owed more at the end of the year, has more or less cash been paid out?',
    }),
    sl('example', 'Worked example 4: operating activities of Sabari', {
      b: 'Net profit before tax, the adjustments, the working-capital changes and tax paid, from the balance sheets and the working accounts.',
      v: vWE_A,
      n: `For Sabari, net profit before tax of ${rupees(SA.npbt)}, with depreciation, the loss on the machine and the loan interest added back, and the investment profit and dividend taken out, gives ${rupees(SA.A.opbwc)}. After the working-capital changes, cash generated from operations is ${rupees(SA.A.cashGen)}. Deducting tax paid of ${rupees(SA.A.taxPaid)} leaves net cash from operating activities of ${rupees(SA.A.A)}.`,
    }),
    sl('concept', 'Working account: machinery at cost', {
      v: vMach,
      n: `Where did the depreciation, the loss and the purchase come from? Working accounts. Machinery is shown at cost. The machine sold, costing ${rupees(M.sold.cost)}, leaves the account against its accumulated depreciation of ${rupees(M.sold.accDep)}, the sale price of ${rupees(M.price)} and a loss of ${rupees(M.loss)}. The figure needed to reach the closing balance, ${rupees(M.purchase)}, is the machinery bought.`,
    }),
    sl('concept', 'Working account: accumulated depreciation', {
      v: vAccDep,
      n: `The accumulated depreciation account starts at ${rupees(M.acc[0])}. The depreciation on the machine sold, ${rupees(M.sold.accDep)}, is transferred out. To reach the closing balance of ${rupees(M.acc[1])}, the depreciation charged this year must be ${rupees(M.dep)}. That is the figure added back in the operating section.`,
    }),
    sl('concept', 'Working account: provision for tax', {
      v: vTax,
      n: `Tax works the same way. The provision for tax starts at ${rupees(TX.a)}, and ${rupees(TX.provided)} is provided this year. The closing balance is ${rupees(TX.b)}, so the tax actually paid is ${rupees(TX.paid)}. The provision was added back through net profit before tax; the tax paid is deducted at the end of the operating section.`,
    }),
    sl('check', 'Quick check: tax paid', {
      b: 'Work out the tax paid from the provision for tax.',
      chk: 'n_tax_paid',
      n: 'Opening provision plus this year’s provision, less the closing provision, gives the tax paid.',
    }),
    sl('example', 'Worked example 5: investing activities of Sabari', {
      b: `Machinery bought (from the working account), machinery and investments sold (investments costing ${rs(IV.cost)} sold for ${rs(IV.price)}), dividend received ${rs(14000)}.`,
      v: vWE_B,
      n: `Sabari bought machinery for ${rupees(M.purchase)}, an outflow. It received ${rupees(M.price)} for the old machine and ${rupees(IV.price)} for investments that had cost ${rupees(IV.cost)}. The dividend received on investments is an investing inflow too. Net cash used in investing activities is ${rupees(-SA.B.total)}. Notice that the full sale prices appear here, while the loss and the profit were adjusted in the operating section.`,
    }),
    sl('example', 'Worked example 6: financing activities of Sabari', {
      b: 'Shares issued at a premium; part of the 10% bank loan repaid on 1 April 2025; interest on the balance; final and interim dividends paid.',
      v: vWE_C,
      n: `Sabari issued shares with a premium, bringing in ${rupees(220000)}. It repaid ${rupees(100000)} of its bank loan at the start of the year, and paid interest of ${rupees(30000)} on the rest. It also paid a final dividend and an interim dividend, ${rupees(SA.divPaid)} in all. Net cash used in financing activities is ${rupees(-SA.C.total)}.`,
    }),
    sl('check', 'Quick check: match the treatment', {
      b: 'Match each item with its treatment in the statement.',
      chk: 'mt_treatment',
      n: 'For each item, ask what it did to profit and whether its cash belongs to another activity.',
    }),
    sl('concept', 'The complete statement and the cash check', {
      v: vFull,
      n: `Put the three sections together. Operating activities brought in ${rupees(SA.A.A)}; investing used ${rupees(-SA.B.total)}; financing used ${rupees(-SA.C.total)}. The net increase is ${rupees(SA.D)}. Added to the opening cash of ${rupees(SA.open)}, it gives ${rupees(SA.close)}, exactly the closing cash in the balance sheet. If your statement does not agree, a figure is missing or misplaced.`,
    }),
    sl('concept', 'Seeing the flows', {
      v: vWaterfall,
      n: `This chart tells the year’s cash story. Sabari began with ${rupees(SA.open)}. Its operations added ${rupees(SA.A.A)}. Most of that was spent on investing, mainly new machinery, and a little more went on financing, as the loan repayment and dividends outweighed the share issue. It ended with ${rupees(SA.close)}.`,
    }),
    sl('check', 'Quick check: goodwill written off', {
      b: 'True or false?',
      chk: 'tf_goodwill',
      n: 'Did any cash leave the business when goodwill was written off?',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up: rebuild net profit before tax from the surplus, reserves, dividends and tax provision. Adjust for non-cash and non-operating items, then for working capital, then deduct tax paid. Use working accounts to find purchases, depreciation, profits or losses on sale and tax paid. Interest and dividends paid are financing. Finally, check that the net change equals the change in cash.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Show **working notes**: net profit before tax, asset and depreciation accounts, provision for tax.',
        'Show the **sale price** under investing; adjust only the **profit or loss** in operating.',
        'Interest on debentures: **add back** in operating, **pay** under financing; check the period outstanding.',
        'Deduct **tax paid**, not the provision.',
        'Finish with the **cash check**: opening + net change = closing.',
      ],
      n: 'In the exam, show your working notes: net profit before tax, the asset and depreciation accounts and the provision for tax. Put the full sale price under investing and adjust only the profit or loss in operating. Add back interest and show it again as paid under financing. Deduct tax paid, not the provision. And always finish with the cash check.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Cash Flow Statement — Notes',
  sections: [
    {
      h: '1. Meaning, objectives and Accounting Standard 3',
      t: 1,
      b: 'A **cash flow statement** reports the cash inflows and outflows of an enterprise for a period, grouped as **operating**, **investing** and **financing** activities, and ends by reconciling opening and closing **cash and cash equivalents**. It is governed by **Accounting Standard 3 (Cash Flow Statements)**. Under the Companies Act, 2013 it forms part of the financial statements of a company (a one person company, a small company and a dormant company may omit it).\n\n**Why profit and cash differ:** profit is measured on the accrual basis (credit sales, unpaid expenses, depreciation), whereas cash changes only when money is received or paid; buying assets and repaying loans use cash without touching profit.\n\n**Objectives:**\n- to report where cash came from and where it went, by activity;\n- to judge whether the main business generates enough cash to pay its way, and to judge liquidity;\n- to explain the difference between profit and the change in cash;\n- to help plan future cash requirements, repayments and dividends;\n- to compare years and enterprises on a basis little affected by accounting policies.',
      terms: [
        ['Cash flow statement', 'A statement of inflows and outflows of cash and cash equivalents of a period, classified by activity (AS 3).'],
        ['Accrual basis', 'Income and expenses are recorded when earned or incurred, not when cash moves.'],
      ],
      v: vMeaning,
      vs: [vObjectives, vProfitCash],
    },
    {
      h: '2. Cash, cash equivalents and cash flows',
      t: 1,
      b: '- **Cash:** cash on hand and demand deposits with banks.\n- **Cash equivalents:** short-term, highly liquid investments that are readily convertible into known amounts of cash and subject to an insignificant risk of change in value. An investment normally qualifies only when it has a short maturity of **three months or less from the date of acquisition** (for example, treasury bills, commercial paper, short bank deposits, overnight money-market funds). **Equity shares are excluded**; preference shares bought shortly before a fixed redemption date may qualify.\n- **Cash flows:** inflows and outflows of cash and cash equivalents.\n\n**Not cash flows:**\n- movements **between** items of cash and cash equivalents (buying a 60-day treasury bill from the bank balance), because the total does not change;\n- **non-cash** investing and financing transactions (assets acquired by issuing shares, bonus shares, conversion of one security into another); they are excluded from the statement and disclosed elsewhere.',
      terms: [
        ['Cash equivalents', 'Short-term, highly liquid investments, maturing within three months of acquisition, with insignificant risk of change in value.'],
        ['Non-cash transaction', 'An investing or financing transaction that uses no cash or cash equivalent, such as shares issued for an asset.'],
      ],
      v: vCCE,
      vs: [vWE1, vNotFlows],
    },
    {
      h: '3. Classification into three activities',
      t: 2,
      b: '**Operating activities** — the principal revenue-producing activities of the enterprise and other activities that are not investing or financing. Examples: cash from sale of goods and services, royalties, fees and commission; payments to suppliers and employees; income tax paid (unless specifically identified with investing or financing).\n\n**Investing activities** — the acquisition and disposal of long-term assets and of investments not included in cash equivalents. Examples: purchase and sale of land, buildings, machinery, vehicles, patents and goodwill; purchase and sale of shares and debentures of other enterprises; loans and advances made to others (by a non-financial enterprise) and their recovery.\n\n**Financing activities** — activities that change the size and composition of owners’ capital and borrowings. Examples: issue of shares and debentures; raising and repaying loans; payment of dividends and of interest (non-financial enterprise).',
      terms: [
        ['Operating activities', 'Principal revenue-producing activities and other activities not investing or financing.'],
        ['Investing activities', 'Acquisition and disposal of long-term assets and of investments other than cash equivalents.'],
        ['Financing activities', 'Activities that change owners’ capital and borrowings.'],
      ],
      v: vActivities,
      vs: [vOperating, vInvesting, vFinancing],
    },
    {
      h: '4. Interest, dividends, tax and special cases',
      t: 2,
      b: '**Interest and dividends** are classified according to the nature of the enterprise:\n- **Non-financial enterprise** (manufacturer, trader): interest and dividend received → **investing**; interest and dividend paid → **financing**.\n- **Financial enterprise** (bank, lending company): interest paid, interest received and dividend received → **operating**, since lending is its principal business; dividend paid → **financing**.\n\n**Income tax paid** is operating unless it can be specifically identified with an investing or financing activity.\n\n**Short-term borrowings** (bank loan, cash credit) are treated in this chapter as financing activities.\n\nA **classification answer** should name the activity and show whether the item is an inflow or an outflow; totals are then worked activity by activity (worked example 2).',
      terms: [
        ['Financial enterprise', 'An enterprise whose main business is lending, borrowing or investing money, such as a bank.'],
        ['Finance cost', 'Interest and other costs of borrowing; financing for a non-financial enterprise.'],
      ],
      v: vIntDiv,
      vs: [vWE2],
    },
    {
      h: '5. The format and the indirect method',
      t: 3,
      b: 'Accounting Standard 3 permits the **direct method** (gross receipts and payments) and the **indirect method** for operating activities; the CBSE syllabus uses only the **indirect method**. Investing and financing sections are prepared in the same way under both.\n\n**Step 1 — net profit before tax.** The balance sheet shows only the retained part of profit, so rebuild it:\n\nNet profit before tax = (closing − opening surplus) + transfers to reserves + dividends paid during the year (final for the previous year and interim) + provision for tax made during the year.\n\nIf tax is paid and charged without a provision, add the tax charged instead. Extraordinary items are not in the 2026-27 syllabus, so the first line is simply "net profit before tax".',
      terms: [
        ['Indirect method', 'Operating cash flow found by adjusting net profit before tax for non-cash items, non-operating items and working-capital changes.'],
        ['Direct method', 'Operating cash flow shown as gross cash receipts less gross cash payments (awareness only).'],
      ],
      v: vSkeleton,
      vs: [vMethods, vSabariBS, vNpbt],
    },
    {
      h: '6. Operating activities: adjustments, working capital and tax',
      t: 3,
      b: '**Step 2 — non-cash and non-operating items.**\n- **Add:** depreciation and amortisation; goodwill, patents and other intangibles written off; loss on sale of fixed assets or investments; interest and other finance costs.\n- **Deduct:** profit on sale of fixed assets or investments; interest received and dividend received (non-financial enterprise).\n- The result is **operating profit before working capital changes**.\n\n**Step 3 — working capital.** For each current asset (inventories, trade receivables including bills receivable, prepaid expenses): **increase → deduct, decrease → add**. For each current liability (trade payables including bills payable, outstanding expenses): **increase → add, decrease → deduct**. The result is **cash generated from operations**. Cash and cash equivalents, provision for tax and short-term borrowings are not part of this step.\n\n**Step 4 — tax.** Deduct **income tax paid**, found from the provision for tax account (opening + provision for the year − closing). The result is **net cash from operating activities**.',
      terms: [
        ['Operating profit before working capital changes', 'Net profit before tax after adding back non-cash and finance charges and removing non-operating income.'],
        ['Cash generated from operations', 'Operating profit before working capital changes adjusted for changes in current assets and current liabilities.'],
      ],
      v: vWE_A,
      vs: [vAdjust, vWCRule, vTax],
    },
    {
      h: '7. Investing and financing activities, working accounts and the cash check',
      t: 3,
      b: '**Working accounts** find the figures the balance sheets hide:\n- **Asset account at cost** (with a separate accumulated depreciation account): the asset sold leaves at cost against its accumulated depreciation, the sale price and the profit or loss; **purchases** are the balancing figure.\n- **Accumulated depreciation account:** opening + depreciation for the year − depreciation on the asset sold = closing; the **depreciation for the year** is usually the balancing figure.\n- **Asset at written-down value:** opening + purchases + profit on sale = sale price + loss on sale + depreciation + closing.\n- **Investments account:** opening + purchases + profit on sale = sale price + loss on sale + closing.\n\n**Investing:** purchases (outflows) and full sale prices (inflows) of fixed assets, intangibles and investments; interest and dividend received.\n\n**Financing:** proceeds of shares (including premium; excluding shares issued to vendors or as bonus) and of debentures and loans; repayments; interest paid (work it on the balance and period outstanding); dividends paid.\n\n**The cash check:** net increase or decrease (A + B + C) + opening cash and cash equivalents = closing cash and cash equivalents. Each balance sheet line must be explained by exactly one entry.',
      terms: [
        ['Working account', 'A ledger account prepared from opening and closing balances and additional information to find a missing figure.'],
        ['Balancing figure', 'The amount needed to make the two sides of a working account equal.'],
      ],
      v: vFull,
      vs: [vMach, vAccDep, vInv, vWE_B, vWE_C, vWaterfall],
    },
  ],
  tips: '**Common mistakes**\n- Starting from net profit **after** tax, or forgetting to add back the **dividends** and **transfer to reserve** when rebuilding profit.\n- Deducting the **provision** for tax instead of the **tax paid**.\n- Showing the **book value** instead of the **sale price** under investing, or forgetting to adjust the profit or loss on sale in operating.\n- Treating interest or dividend **received** as operating, or interest **paid** as operating, for a non-financial company.\n- Reversing the working-capital rule (an increase in receivables is **deducted**).\n- Including **non-cash** transactions (shares to a vendor, bonus shares) or counting a switch into **cash equivalents** as a flow.\n- Taking a full year’s interest on a loan raised or repaid during the year.\n\n**How marks are usually awarded**\n- 1 mark: classifying one item, or one treatment (MCQ, assertion-reason).\n- 3 marks: cash and cash equivalents; one section (operating, investing or financing); net profit before tax with the tax account.\n- 4 marks: one section with working accounts, or classification with totals.\n- 6 marks: a complete statement — net profit before tax 1, working notes 1, operating 1½, investing 1, financing 1, net change and check ½.\n\n**Figures in SOYL practice** are imagined; your board paper will give its own.',
});

// ---------------------------------------------------------------- flashcards
const FC = cards([
  ['Cash flow statement', 'Inflows and outflows of cash and cash equivalents for a period, by operating, investing and financing activities.', 'definition', 1],
  ['Standard governing it', '**Accounting Standard 3** (Cash Flow Statements).', 'fact', 1],
  ['Cash', 'Cash on hand and demand deposits with banks.', 'definition', 1],
  ['Cash equivalents', 'Short-term, highly liquid investments, readily convertible into known cash, insignificant risk of change in value.', 'definition', 1],
  ['Maturity test for a cash equivalent', '**Three months or less** from the date of acquisition.', 'exam-tip', 1],
  ['Are equity shares cash equivalents?', '**No**: their value can change significantly.', 'exam-tip', 1],
  ['Buying treasury bills from the bank balance', '**Not a cash flow**: movement within cash and cash equivalents.', 'exam-tip', 1],
  ['Non-cash transactions', 'Excluded (e.g. shares issued for an asset, bonus shares); disclosed elsewhere.', 'concept', 1],
  ['Why profit differs from cash', 'Profit is on the accrual basis; cash moves only on receipt or payment.', 'concept', 1],
  ['Operating activities', 'Principal revenue-producing activities and others not investing or financing.', 'definition', 2],
  ['Investing activities', 'Acquisition and disposal of long-term assets and investments (not cash equivalents).', 'definition', 2],
  ['Financing activities', 'Changes in owners’ capital and borrowings.', 'definition', 2],
  ['Interest and dividend received (manufacturer)', '**Investing** inflows.', 'exam-tip', 2],
  ['Interest and dividend paid (manufacturer)', '**Financing** outflows.', 'exam-tip', 2],
  ['Interest received and paid (bank)', '**Operating**; dividend paid stays **financing**.', 'exam-tip', 2],
  ['Income tax paid', '**Operating**, unless specifically identified with investing or financing.', 'fact', 2],
  ['Loan given by a manufacturer to another company', '**Investing** outflow.', 'fact', 2],
  ['Methods for operating cash flow', 'Direct (gross receipts and payments) and **indirect** (from net profit before tax); CBSE uses indirect.', 'fact', 3],
  ['Net profit before tax from the balance sheet', 'Increase in surplus + transfer to reserves + dividends paid + provision for tax for the year.', 'exam-tip', 3],
  ['Items added back to net profit before tax', 'Depreciation, write-offs, loss on sale, finance costs.', 'fact', 3],
  ['Items deducted from net profit before tax', 'Profit on sale of assets or investments, interest and dividend received.', 'fact', 3],
  ['Operating profit before working capital changes', 'Net profit before tax after the non-cash and non-operating adjustments.', 'definition', 3],
  ['Increase in a current asset', '**Deduct** (cash tied up).', 'exam-tip', 3],
  ['Increase in a current liability', '**Add** (cash not yet paid).', 'exam-tip', 3],
  ['Tax paid', 'Opening provision + provision for the year − closing provision.', 'exam-tip', 3],
  ['Purchase of an asset (at cost)', 'Closing + cost of asset sold − opening (− any acquired for shares).', 'exam-tip', 3],
  ['Depreciation for the year', 'Closing accumulated depreciation + depreciation on asset sold − opening.', 'exam-tip', 3],
  ['Sale of an asset at a loss', 'Loss added back in operating; **sale price** shown under investing.', 'exam-tip', 3],
  ['The cash check', 'Opening cash and cash equivalents + (A + B + C) = closing cash and cash equivalents.', 'concept', 3],
  ['Extraordinary items', 'Not in the 2026-27 syllabus; start from net profit before tax.', 'fact', 3],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-12-accountancy-chapter-test-short',
  title: 'Chapter test (short) — Cash Flow Statement',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_noncash', 'm_npbt', 'm_van_sale', 'ar_dep_cash'] },
    { id: 'B', title: 'Section B — Short answer (3 marks each)', instr: 'Answer both questions.', items: ['s3_cce_identify', 's3_cfo_small'] },
    { id: 'C', title: 'Section C — Long answer (4 marks)', instr: 'Answer any ONE of the two questions.', items: [{ attempt: 1, keys: ['l4_financing', 'l4_classify8'] }] },
    { id: 'D', title: 'Section D — Long answer (6 marks)', instr: 'Answer any ONE of the two questions. Show your working notes.', items: [{ attempt: 1, keys: ['l6_full_A', 'l6_full_C'] }] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-12-accountancy-chapter-test-long',
  title: 'Chapter test (long) — Cash Flow Statement',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–8 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_not_flow', 'm_tax_paid', 'm_advance', 'm_purchase_calc', 'm_loss_sale', 'm_opbwc', 'ar_ce_risk', 'ar_wc'] },
    { id: 'B', title: 'Section B — Short answer (3 marks each)', instr: 'Answer all questions; question 12 has an internal choice.', items: ['s3_npbt', 's3_classify6', 's3_investing', { attempt: 1, keys: ['s3_financing', 's3_objectives'] }] },
    { id: 'C', title: 'Section C — Long answer (4 marks each)', instr: 'Answer question 13, and any ONE of questions 14 and 15.', items: ['l4_cfo', { attempt: 1, keys: ['l4_investing_accounts', 'l4_tax_npbt'] }] },
    { id: 'D', title: 'Section D — Long answer (6 marks each)', instr: 'Answer question 16, and any ONE of questions 17 and 18. Show your working notes.', items: ['l6_full_B', { attempt: 1, keys: ['l6_full_D', 'l6_full_E'] }] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: FC,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t03 of cbse-12-accountancy-ch11 only (meaning, objectives, cash and cash equivalents; classification into operating, investing and financing activities; preparation by the indirect method under AS 3). The direct method is mentioned only; extraordinary items (removed for 2026-27) appear only as one "not in the syllabus" line in the notes and a flashcard',
    originality: 'every company, scenario and figure written for this chapter (imagined companies in Indian towns); no NCERT illustration or exercise and no CBSE sample or past-paper item reused',
    accounts: `cashFlow() engine (acc.mjs): both balance sheets balance; every working account (asset at cost or written-down value, accumulated depreciation, investments, provision for tax) balances with a non-negative balancing figure; every balance sheet line is consumed exactly once; net increase (A + B + C) asserted equal to closing minus opening cash and cash equivalents; hand-checked pins (Sabari net profit before tax ${fig(SA.npbt)}, operating ${fig(SA.A.A)}, net increase ${fig(SA.D)}; ${FACTS.join('; ')})`,
    facts: 'cash equivalents mature within three months of acquisition and exclude equity shares; non-financial company: interest and dividend received investing, paid financing; financial company: interest and dividend received and interest paid operating; income tax paid operating; tax paid, not the provision, is deducted',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
