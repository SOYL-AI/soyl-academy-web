// Build ISC 12 Accounts ch11 Cash Flow Statement. Run from platform/:
//   npx tsx content/authored/economics-commerce/isc-12-accounts-ch11/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';

setUnit('isc-12-accounts-ch11', 'economics-commerce');
const { fig, rs, rupees, words, sum, check, md, interest, pctOf, fixedAsset, cashFlow } = await import('./acc.mjs');
const { FACTS } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- Part 2 case company: Khardung Thermal Wear Ltd (imagined, Diskit)
const KH = cashFlow({
  name: 'Khardung Thermal Wear Ltd',
  lines: [
    ['sc', 'Equity share capital', 'sc', 1200000, 1500000],
    ['sp', 'Securities premium', 'sp', 50000, 67000],
    ['gr', 'General reserve', 'gr', 100000, 160000],
    ['sur', 'Balance in the Statement of Profit and Loss', 'surplus', 140000, 230000],
    ['deb', '9% Debentures', 'ltb', 400000, 300000, { name: '9% debentures' }],
    ['tp', 'Trade payables', 'wcL', 160000, 190000],
    ['oe', 'Outstanding expenses', 'wcL', 25000, 18000],
    ['pt', 'Short-term provisions: provision for tax', 'tax', 70000, 90000],
    ['m', 'Knitting machinery (at cost)', 'ppe', 1400000, 1700000, { name: 'machinery' }],
    ['ad', 'Less: Accumulated depreciation on machinery', 'accdep', 350000, 410000, { of: 'm' }],
    ['pat', 'Patents', 'intang', 80000, 60000],
    ['inv', 'Non-current investments', 'inv', 300000, 240000],
    ['stock', 'Inventories', 'wcA', 280000, 330000],
    ['tr', 'Trade receivables', 'wcA', 240000, 270000],
    ['pdd', 'Less: Provision for doubtful debts', 'pdd', 12000, 15000, { of: 'tr' }],
    ['pre', 'Prepaid expenses', 'wcA', 9000, 6000],
    ['cash', 'Cash and cash equivalents', 'cce', 198000, 374000],
  ],
  info: {
    fa: { m: { sold: { cost: 120000, accDep: 70000, price: 42000 } } },
    invest: { inv: { sold: { cost: 100000, price: 112000 } } },
    tax: { pt: { provided: 110000 } },
    issueExpenses: 8000,
    ltb: { deb: { premium: pctOf(5, 100000) } },
    interestPaid: [['Interest on 9% debentures', interest(9, 400000, 6) + interest(9, 300000, 6)]],
    dividendReceived: [['Dividend received on investments', 18000]],
    dividendPaid: [['Proposed dividend for 2024-25', pctOf(10, 1200000)], ['Interim dividend for 2025-26', pctOf(5, 1500000)]],
    proposed: { label: 'Proposed dividend for 2025-26', amount: pctOf(10, 1500000) },
  },
  // Hand-checked: profit after tax 90,000 + 60,000 + 1,20,000 + 75,000 = 3,45,000; + tax 1,10,000.
  pins: { npbt: 455000, opbwc: 617500, cashGen: 563500, taxPaid: 90000, A: 473500, B: -288000, C: -9500, D: 176000 },
});
const M = KH.L.find((l) => l.k === 'm').fa;
const IV = KH.L.find((l) => l.k === 'inv').invest;
const TX = KH.L.find((l) => l.k === 'pt').taxAcc;
const DEBINT = interest(9, 400000, 6) + interest(9, 300000, 6);
check(M.purchase === 420000 && M.dep === 130000 && M.loss === 8000 && IV.profit === 12000 && IV.purchase === 40000 && TX.paid === 90000, 'Khardung working accounts');
check(KH.premium.received === pctOf(10, 300000) && KH.sharesCash === 330000 && DEBINT === 31500, 'Khardung shares and interest');
check(KH.totals[0] === 2555000 && KH.totals[1] === 2145000 && KH.open === 198000 && KH.close === 374000, 'Khardung balance sheet');
const KH_PDD = 15000 - 12000;

// Worked example 8: Tenga Orchid Farms Ltd (imagined) — an asset at written-down value.
const BO = fixedAsset({ name: 'greenhouses', a: 450000, b: 520000, dep: 45000, sold: { bv: 30000, price: 36000 } });
check(BO.purchase === 145000 && BO.profit === 6000, 'Tenga greenhouses');

// ---------------------------------------------------------------- Part 1 data
// Profit is not cash: Kunzum Solar Ltd (imagined, Kaza).
const KU = [
  ['Net profit before tax', 400000],
  ['Add: Depreciation (no cash paid)', 80000],
  ['Less: Increase in trade receivables (sales not yet collected)', -230000],
  ['Less: Increase in inventories (cash tied up in panels and inverters)', -60000],
  ['Less: Income tax paid', -70000],
  ['Less: Solar panels bought for its own plant', -140000],
  ['Less: Dividend proposed last year, paid this year', -50000],
];
const KU_change = sum(KU.map((x) => x[1]));
check(KU_change === -70000, 'Kunzum change in cash');
// Worked example 1: Baralacha Trekking Gear Ltd (imagined, Keylong).
const BT = [
  ['Cash in hand', 12000, true, 'cash'],
  ['Balance in current account', 108000, true, 'demand deposit'],
  ['Treasury bills bought on issue, maturing in 90 days', 60000, true, 'three months or less from acquisition'],
  ['Bank deposit placed for four months', 75000, false, 'maturity more than three months'],
  ['Units of an overnight liquid fund', 25000, true, 'highly liquid, insignificant risk'],
  ['Listed shares of a hotel company', 50000, false, 'risk of change in value'],
  ['Debentures bought two years ago, now 40 days from maturity', 40000, false, 'test runs from the date of acquisition'],
];
const BT_cce = sum(BT.filter((x) => x[2]).map((x) => x[1]));
check(BT_cce === 205000, 'Baralacha cash and cash equivalents');
// Worked example 2: Kupup Tea Traders Ltd (imagined, Rangpo).
const NT = [
  ['Cash sales and collections from customers', 640000, 'Operating'],
  ['Paid tea gardens and other suppliers', -390000, 'Operating'],
  ['Wages and salaries paid', -110000, 'Operating'],
  ['Income tax paid', -35000, 'Operating'],
  ['Bought a delivery vehicle', -220000, 'Investing'],
  ['Interest received on a fixed deposit (six months)', 12000, 'Investing'],
  ['Issued 9% debentures on 1 October', 300000, 'Financing'],
  ['Interest paid on those debentures for six months', -interest(9, 300000, 6), 'Financing'],
  ['Interim dividend paid', -60000, 'Financing'],
];
const NTt = (a) => sum(NT.filter((x) => x[2] === a).map((x) => x[1]));
const NT_A = NTt('Operating');
const NT_B = NTt('Investing');
const NT_C = NTt('Financing');
check(NT_A === 105000 && NT_B === -208000 && NT_C === 226500 && NT_A + NT_B + NT_C === 123500, 'Kupup totals');
// Worked example 3: Jelepla Cardamom Ltd (imagined, Pedong) — the ISC special items.
const JC = [
  ['Dividend proposed for last year, approved and paid this year', -90000, 'Financing outflow'],
  ['Dividend proposed by the directors for this year', 110000, 'No effect (contingent liability)'],
  ['Share issue expenses paid', -6000, 'Financing outflow'],
  ['Premium paid on redemption of debentures', -4000, 'Financing outflow'],
  ['Loan given to a growers’ co-operative', -150000, 'Investing outflow'],
  ['Interest received on that loan', 9000, 'Investing inflow'],
  ['Bonus shares issued out of general reserve', 200000, 'No effect (non-cash)'],
];
const JCt = (s) => sum(JC.filter((x) => x[2].startsWith(s)).map((x) => x[1]));
check(JCt('Financing') === -100000 && JCt('Investing') === -141000, 'Jelepla totals');

// ---------------------------------------------------------------- visuals: Part 1
const vRoute1 = flow('LR', ['Profit is not cash', 'Meaning and importance', 'Cash and cash equivalents', 'What is not a cash flow', 'Three activities', 'Special ISC items'], 'Route map of Part 1: profit is not cash, meaning and importance, cash and cash equivalents, what is not a cash flow, the three activities and the special items in the syllabus', 'Part 1 at a glance');
const vProfitCash = table(
  ['Kunzum Solar Ltd (imagined), 2025-26', '₹'],
  [...KU.map(([l, v]) => [l, fig(v)]), ['**Net decrease in cash**', `**${fig(KU_change)}**`]],
  `Table showing that an imagined solar company earned a profit before tax of ${fig(400000)} yet its cash fell by ${fig(-KU_change)}, because customers had not paid, stock was built up, tax and a dividend were paid and panels were bought`,
  'Profit follows the accrual basis; cash moves only when money is received or paid.',
);
const vMeaning = table(
  ['Part of the statement', 'Shows…'],
  [
    ['A. Operating activities', 'cash from the main revenue-earning business, after tax paid'],
    ['B. Investing activities', 'cash spent on and received from long-term assets, investments and loans given'],
    ['C. Financing activities', 'cash raised from and returned to shareholders and lenders'],
    ['Net change (A + B + C)', 'the increase or decrease in cash and cash equivalents'],
    ['Opening and closing balances', 'the link with the two balance sheets'],
  ],
  'Table of the parts of a cash flow statement: operating, investing and financing activities, the net change, and the opening and closing cash and cash equivalents',
  'AS 3 (revised), Cash Flow Statements.',
);
const vImportance = table(
  ['Importance', 'Who gains'],
  [
    ['Explains why cash moved differently from profit', 'Shareholders, directors'],
    ['Shows whether operations generate enough cash', 'Lenders, suppliers'],
    ['Helps plan capital spending, repayments and dividends', 'Management'],
    ['Shows how assets were financed', 'Investors, analysts'],
    ['Allows comparison less affected by accounting policies', 'Analysts'],
  ],
  'Table of the importance of the cash flow statement: it explains the gap between profit and cash, shows the cash-generating power of operations, helps planning, shows how assets were financed and allows comparison',
);
const vCCE = table(
  ['Cash and cash equivalents include', 'They do not include'],
  [
    ['Cash in hand; demand deposits with banks', 'Deposits placed for more than three months'],
    ['Treasury bills, commercial paper and deposits maturing within three months of acquisition', 'An old bond close to maturity, bought long ago'],
    ['Units of overnight or liquid funds with negligible risk', 'Equity shares, however marketable'],
  ],
  'Table of what is and is not included in cash and cash equivalents: cash, demand deposits and investments maturing within three months of acquisition are in; longer deposits, old bonds near maturity and shares are out',
  'Test: short term, highly liquid, a known amount of cash, insignificant risk of change in value.',
);
const vWE1 = table(
  ['Holding of Baralacha Trekking Gear Ltd (imagined)', '₹', 'Included?'],
  [...BT.map(([l, v, ok, why]) => [l, fig(v), ok ? `Yes (${why})` : `No (${why})`]), ['**Cash and cash equivalents**', `**${fig(BT_cce)}**`, '']],
  `Worked example table: of seven holdings of an imagined trekking-gear company, cash, the current account, ninety-day treasury bills and an overnight fund qualify, giving cash and cash equivalents of ${fig(BT_cce)}`,
);
const vNotFlows = table(
  ['Situation', 'Example', 'Shown?'],
  [
    ['Movement within cash and cash equivalents', 'A 45-day deposit made from the current account', 'No: the total is unchanged'],
    ['Non-cash investing or financing', 'Debentures allotted to the seller of a machine', 'No: disclosed in a note'],
    ['Book transfer', 'Bonus shares; a transfer to a reserve', 'No: no cash moves'],
    ['Non-cash charge', 'Depreciation, patents written off', 'Only as an add-back to profit'],
    ['Proposal not yet approved', 'Dividend proposed for the current year', 'No effect at all'],
  ],
  'Table of items that are not cash flows: switches within cash and cash equivalents, non-cash investing and financing transactions, book transfers, non-cash charges and a dividend proposed for the current year',
);
const vActivities = flow('TB', ['Operating activities', 'Investing activities', 'Financing activities', 'Net change in cash and cash equivalents', 'Opening plus net change equals closing'], 'Flow diagram: cash flows from operating, investing and financing activities add up to the net change in cash and cash equivalents, which reconciles opening and closing balances', 'Three activities, one net change', [{ from: 'n1', to: 'n4' }, { from: 'n2', to: 'n4' }, { from: 'n3', to: 'n4' }, { from: 'n4', to: 'n5' }]);
const vOperating = table(
  ['Operating inflows', 'Operating outflows'],
  [
    ['Cash sales; collections from customers', 'Payments to suppliers of goods and services'],
    ['Royalties, fees, commission received', 'Wages, salaries and other employee costs'],
    ['Refund of income tax (rare)', 'Income tax paid, unless linked to another activity'],
  ],
  'Table of operating activities: inflows from customers, royalties and commission; outflows to suppliers and employees and for income tax',
  'The principal revenue-producing activities of the enterprise.',
);
const vInvesting = table(
  ['Investing inflows', 'Investing outflows'],
  [
    ['Sale proceeds of land, buildings, machinery, patents', 'Purchase of tangible and intangible fixed assets'],
    ['Sale of shares or debentures held as investments', 'Purchase of such investments'],
    ['Recovery of loans given; interest and dividend received', 'Loans and advances given to others'],
  ],
  'Table of investing activities: inflows from sales of fixed assets and investments, loans recovered, interest and dividend received; outflows for assets, investments and loans given',
  'For an enterprise that is not a financial enterprise.',
);
const vFinancing = table(
  ['Financing inflows', 'Financing outflows'],
  [
    ['Issue of equity or preference shares, with premium', 'Redemption of preference shares or debentures, with any premium'],
    ['Issue of debentures; long-term and short-term loans raised', 'Repayment of loans; share issue expenses'],
    ['', 'Interest paid; dividends paid (last year’s proposed, this year’s interim)'],
  ],
  'Table of financing activities: inflows from shares, debentures and loans; outflows for redemption with premium, loan repayment, issue expenses, interest and dividends paid',
);
const vIntDiv = table(
  ['Item', 'Non-financial enterprise', 'Financial enterprise'],
  [
    ['Interest received', 'Investing', 'Operating'],
    ['Dividend received', 'Investing', 'Operating'],
    ['Interest paid', 'Financing', 'Operating'],
    ['Dividend paid', 'Financing', 'Financing'],
    ['Income tax paid', 'Operating (usually)', 'Operating (usually)'],
  ],
  'Table of how interest, dividends and tax are classified: for a non-financial enterprise interest and dividend received are investing and paid are financing; for a financial enterprise all except dividend paid are operating; tax is usually operating',
);
const vWE2 = table(
  ['Cash transaction of Kupup Tea Traders Ltd (imagined)', 'Activity', '₹'],
  [...NT.map(([l, v, a]) => [l, a, fig(v)]), ['**Net cash from operating activities**', '', `**${fig(NT_A)}**`], ['**Net cash used in investing activities**', '', `**${fig(NT_B)}**`], ['**Net cash from financing activities**', '', `**${fig(NT_C)}**`], ['**Net increase in cash and cash equivalents**', '', `**${fig(NT_A + NT_B + NT_C)}**`]],
  `Worked example table: nine cash transactions of an imagined tea trader classified into the three activities, giving operating ${fig(NT_A)}, investing ${fig(NT_B)}, financing ${fig(NT_C)} and a net increase of ${fig(NT_A + NT_B + NT_C)}`,
);
const vWE3 = table(
  ['Item of Jelepla Cardamom Ltd (imagined)', '₹', 'Treatment'],
  [...JC.map(([l, v, c]) => [l, fig(Math.abs(v)), c]), ['**Financing outflows in all**', `**${fig(JCt('Financing'))}**`, ''], ['**Net investing flow**', `**${fig(JCt('Investing'))}**`, '']],
  `Worked example table: seven special items of an imagined cardamom company; last year's proposed dividend, issue expenses and redemption premium are financing outflows, ${fig(-JCt('Financing'))} in all; the loan and its interest are investing, net ${fig(JCt('Investing'))}; this year's proposed dividend and the bonus issue have no effect`,
);
const vSummary1 = table(
  ['Idea', 'Remember'],
  [
    ['Cash flow statement', 'Inflows and outflows of cash and cash equivalents, by activity (AS 3 revised)'],
    ['Cash equivalent', 'Maturity of three months or less from acquisition; insignificant risk; never shares'],
    ['Not a cash flow', 'Switches within cash equivalents; non-cash deals; this year’s proposed dividend'],
    ['Operating', 'Main business, including income tax paid'],
    ['Investing', 'Fixed assets, investments, loans given, interest and dividend received'],
    ['Financing', 'Shares, debentures, loans, issue expenses, redemption premium, interest and dividends paid'],
  ],
  'Summary table of Part 1: the statement, cash equivalents, what is not a cash flow, and the three activities',
);

// ---------------------------------------------------------------- visuals: Part 2
const vRoute2 = flow('LR', ['Net profit before tax', 'Non-cash and non-operating items', 'Working capital', 'Tax paid', 'Investing and financing', 'Cash check'], 'Route map of Part 2: rebuild net profit before tax, adjust non-cash and non-operating items and working capital, deduct tax paid, add investing and financing flows, and check against the change in cash', 'The indirect method, step by step');
const vSkeleton = table(
  ['Cash Flow Statement for the year ended …', '₹', '₹'],
  [
    ['**A. Cash flows from operating activities**', '', ''],
    ['Net profit before tax (working note)', 'xxx', ''],
    ['Add: non-cash charges and finance costs; Less: non-operating income', 'xxx', ''],
    ['**Operating profit before working capital changes**', 'xxx', ''],
    ['Add / Less: changes in current assets and current liabilities', 'xxx', ''],
    ['**Cash generated from operations**; Less: income tax paid', 'xxx', ''],
    ['**Net cash from (used in) operating activities**', '', 'xxx'],
    ['**B. Net cash from (used in) investing activities**', '', 'xxx'],
    ['**C. Net cash from (used in) financing activities**', '', 'xxx'],
    ['**Net increase or decrease (A + B + C)**; add opening cash and cash equivalents', '', 'xxx'],
    ['**Cash and cash equivalents at the end of the year**', '', 'xxx'],
  ],
  'Skeleton of a cash flow statement by the indirect method: operating section from net profit before tax to net cash from operating activities, then investing and financing, the net change and the closing balance',
);
const vKhBS = table(KH.bs.headers, KH.bs.rows, `Comparative balance sheet of the imagined Khardung Thermal Wear Ltd: totals ${fig(KH.totals[0])} and ${fig(KH.totals[1])}; cash and cash equivalents rose from ${fig(KH.open)} to ${fig(KH.close)}`, 'An imagined company; current year first, in the Schedule III order.');
const vNpbt = table(KH.npbtTable.headers, KH.npbtTable.rows, `Working of net profit before tax of Khardung: increase in surplus ${fig(KH.dSurplus)}, plus the transfer to reserve, last year's proposed dividend and this year's interim dividend, plus the provision for tax, gives ${fig(KH.npbt)}`, `The dividend of ${rs(KH.proposed.amount)} proposed for 2025-26 is not added.`);
const vDivRule = table(
  ['Dividend', 'Profit working (net profit before tax)', 'Cash flow statement'],
  [
    ['Proposed for the previous year, paid this year', 'Add back', 'Financing outflow'],
    ['Interim dividend for this year, paid', 'Add back', 'Financing outflow'],
    ['Proposed for this year (contingent liability)', 'Ignore', 'No effect'],
    ['Dividend received (non-financial company)', 'Deduct in operating', 'Investing inflow'],
  ],
  'Table of the treatment of dividends: last year’s proposed dividend and this year’s interim dividend are added back to profit and shown as financing outflows; this year’s proposed dividend has no effect; dividend received is deducted in operating and shown under investing',
  'As the ISC syllabus states: previous year’s proposed dividend is an outflow; the current year’s has no effect.',
);
const vAdjust = table(
  ['Add back (reduced profit, no operating cash out)', 'Deduct (raised profit, not operating cash in)'],
  [
    ['Depreciation; patents, goodwill or other intangibles written off', 'Profit on sale of fixed assets or investments'],
    ['Loss on sale of fixed assets or investments', 'Interest received (non-financial company)'],
    ['Increase in provision for doubtful debts', 'Dividend received (non-financial company)'],
    ['Interest on debentures and loans (finance costs)', 'Decrease in provision for doubtful debts'],
  ],
  'Table of adjustments to net profit before tax: add back depreciation, amortisation, losses on sale, an increase in provision for doubtful debts and finance costs; deduct profits on sale, interest and dividend received and a decrease in the provision',
);
const vPdd = table(
  ['Khardung (imagined), receivables', 'Gross method ₹', 'Net method ₹'],
  [
    ['Increase in provision for doubtful debts (non-cash charge)', fig(KH_PDD), '—'],
    ['Increase in trade receivables', fig(-(270000 - 240000)), fig(-((270000 - 15000) - (240000 - 12000)))],
    ['**Effect on operating cash**', `**${fig(KH_PDD - (270000 - 240000))}**`, `**${fig(-((270000 - 15000) - (240000 - 12000)))}**`],
  ],
  `Table comparing two ways of treating the provision for doubtful debts at Khardung: adding back the increase of ${fig(KH_PDD)} and deducting the rise in gross receivables gives the same cash effect as deducting the rise in net receivables`,
  'Either method gives the same cash figure; show one.',
);
check(KH_PDD - (270000 - 240000) === -((270000 - 15000) - (240000 - 12000)), 'gross and net receivables agree');
const vWCRule = table(
  ['Change in the year', 'Current asset (inventories, receivables, prepaid)', 'Current liability (payables, outstanding expenses)'],
  [
    ['Increase', 'Deduct: cash tied up', 'Add: cash not yet paid'],
    ['Decrease', 'Add: cash released', 'Deduct: cash paid off'],
  ],
  'Table of the working-capital rule: an increase in a current asset is deducted and a decrease added; an increase in a current liability is added and a decrease deducted',
  'Cash and cash equivalents, provision for tax and borrowings are dealt with elsewhere.',
);
const vWE_A = table(KH.part('A').headers, KH.part('A').rows, `Operating section of Khardung: net profit before tax ${fig(KH.npbt)}, operating profit before working capital changes ${fig(KH.A.opbwc)}, cash generated ${fig(KH.A.cashGen)}, tax paid ${fig(KH.A.taxPaid)}, net cash from operating activities ${fig(KH.A.A)}`);
const vMach = table(M.ledger.headers, M.ledger.rows, `Machinery account of Khardung at cost: the machine sold leaves at cost against its accumulated depreciation, sale price and loss; purchases are the balancing figure, ${fig(M.purchase)}`, 'Working account at cost.');
const vAccDep = table(M.accLedger.headers, M.accLedger.rows, `Accumulated depreciation account of Khardung: opening ${fig(M.acc[0])}, transfer on sale ${fig(M.sold.accDep)}, closing ${fig(M.acc[1])}; depreciation for the year is the balancing figure, ${fig(M.dep)}`);
const vTax = table(TX.ledger.headers, TX.ledger.rows, `Provision for tax account of Khardung: opening ${fig(TX.a)} plus provision ${fig(TX.provided)} less closing ${fig(TX.b)} gives tax paid of ${fig(TX.paid)}`);
const vInv = table(IV.ledger.headers, IV.ledger.rows, `Investments account of Khardung: investments costing ${fig(IV.cost)} sold for ${fig(IV.price)} at a profit of ${fig(IV.profit)}; purchases ${fig(IV.purchase)}`);
const vWE_B = table(KH.part('B').headers, KH.part('B').rows, `Investing section of Khardung: machinery bought ${fig(M.purchase)}, machinery sold ${fig(M.price)}, investments bought and sold, dividend received; net cash used ${fig(-KH.B.total)}`);
const SPL = KH.ledgers.find((l) => l.title === 'Securities Premium Account');
const vSP = table(SPL.headers, SPL.rows, `Securities premium account of Khardung: opening ${fig(50000)}, issue expenses ${fig(8000)} and redemption premium ${fig(5000)} written off, closing ${fig(67000)}; premium received on the new shares is the balancing figure, ${fig(KH.premium.received)}`);
const vWE_C = table(KH.part('C').headers, KH.part('C').rows, `Financing section of Khardung: shares issued with premium ${fig(KH.sharesCash)}, issue expenses, debentures redeemed at a premium, interest and two dividends paid; net cash used ${fig(-KH.C.total)}`);
const vFull = table(KH.stmt.headers, KH.stmt.rows, `Complete cash flow statement of Khardung: operating ${fig(KH.A.A)}, investing ${fig(KH.B.total)}, financing ${fig(KH.C.total)}, net increase ${fig(KH.D)}, opening ${fig(KH.open)}, closing ${fig(KH.close)}`, 'The net increase equals closing minus opening cash and cash equivalents: the cash check.');
const vWDV = table(BO.ledger.headers, BO.ledger.rows, `Greenhouses account of the imagined Tenga Orchid Farms at written-down value: opening ${fig(BO.a)}, a greenhouse with book value ${fig(BO.bv)} sold for ${fig(BO.price)} at a profit of ${fig(BO.profit)}, depreciation ${fig(BO.dep)}, closing ${fig(BO.b)}; purchases ${fig(BO.purchase)}`, 'Written-down value basis: depreciation is credited to the asset account itself.');
const vWaterfall = (() => {
  const s = new Svg(600, 290);
  const steps = [['Opening cash', KH.open, 'base'], ['Operating', KH.A.A, 'flow'], ['Investing', KH.B.total, 'flow'], ['Financing', KH.C.total, 'flow'], ['Closing cash', KH.close, 'base']];
  let lv = 0;
  const levels = steps.map(([, v, k]) => (lv = k === 'base' ? v : lv + v));
  const top = Math.max(...levels);
  const H = 180;
  const Y0 = 225;
  const y = (v) => Y0 - (H * v) / top;
  const W = 80;
  const GAP = 30;
  let level = 0;
  steps.forEach(([label, v, kind], i) => {
    const x = 45 + i * (W + GAP);
    const from = kind === 'base' ? 0 : level;
    const to = kind === 'base' ? v : level + v;
    const c = kind === 'base' ? 'blue' : v >= 0 ? 'green' : 'red';
    s.rect(x, y(Math.max(from, to)), W, Math.max(Math.abs(y(from) - y(to)), 2), { fill: c, color: c, sw: 1, rx: 2, fillOpacity: 0.35 });
    s.text(x + W / 2, y(Math.max(from, to)) - 12, `${kind === 'flow' && v >= 0 ? '+' : ''}${fig(v)}`, { size: 13, bold: true });
    s.text(x + W / 2, Y0 + 18, label, { size: 12 });
    if (kind === 'flow') s.line(x - GAP, y(from), x, y(from), { sw: 1, dash: true, color: 'muted' });
    level = to;
  });
  check(level === KH.close, 'waterfall ends at closing cash');
  s.line(30, Y0, 580, Y0, { sw: 1.2 });
  s.text(300, 272, `${fig(KH.open)} + ${fig(KH.A.A)} − ${fig(-KH.B.total)} − ${fig(-KH.C.total)} = ${fig(KH.close)} (₹)`, { size: 13, bold: true });
  return s.visual(
    `Waterfall chart of Khardung: opening cash ${words(KH.open)} rupees, plus ${words(KH.A.A)} from operating activities, less ${words(-KH.B.total)} on investing and ${words(-KH.C.total)} on financing, ends at closing cash of ${words(KH.close)} rupees`,
    'Bar heights are computed from the statement.',
  );
})();
const vSummary2 = table(
  ['Step', 'What to do'],
  [
    ['1. Net profit before tax', 'Change in surplus + transfers to reserves + dividends paid this year + provision for tax'],
    ['2. Adjustments', 'Add depreciation, amortisation, losses, increase in provision for doubtful debts, finance costs; deduct profits, interest and dividend received'],
    ['3. Working capital', 'Current asset up: deduct; current liability up: add (and the reverse)'],
    ['4. Tax', 'Deduct tax paid, from the provision for tax account'],
    ['5. Investing and financing', 'Working accounts for assets, investments and securities premium; premiums and issue expenses are financing'],
    ['6. Cash check', 'A + B + C = closing − opening cash and cash equivalents'],
  ],
  'Summary table of Part 2: the six steps of the indirect method from net profit before tax to the cash check',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Cash Flow Statement — Part 1: Meaning, Cash Equivalents and Classification',
  goals: [
    'Explain the meaning and importance of a cash flow statement under AS 3 (revised)',
    'Identify cash and cash equivalents and recognise what is not a cash flow',
    'Classify cash flows into operating, investing and financing activities',
    'Place the special items in the ISC syllabus: proposed and interim dividends, issue expenses, redemption premium, loans given',
  ],
  slides: [
    sl('title', 'Cash Flow Statement', {
      b: 'Part 1 — what the statement shows, what counts as **cash and cash equivalents**, and how every cash flow is classified as **operating**, **investing** or **financing**.',
      v: vRoute1,
      n: 'A company can make a profit and still run short of cash. The cash flow statement shows where the cash of a year came from and where it went. In this part we learn its meaning and importance, what counts as cash and cash equivalents, and how every flow is sorted into operating, investing or financing activities.',
    }),
    sl('concept', 'Profit is not cash', {
      v: vProfitCash,
      n: `Meet Kunzum Solar, an imagined company at Kaza. It earned a profit before tax of ${rupees(400000)}, yet its cash fell by ${rupees(-KU_change)}. Customers had not paid, stock had piled up, tax and last year's dividend were paid, and new panels were bought. Profit follows the accrual basis; cash moves only when money actually comes in or goes out.`,
    }),
    sl('concept', 'Meaning of a cash flow statement', {
      v: vMeaning,
      bl: ['Prepared under **AS 3 (revised)**, Cash Flow Statements.', 'Covers a period: inflows and outflows of **cash and cash equivalents**, grouped into three activities.'],
      n: 'A cash flow statement reports the inflows and outflows of cash and cash equivalents during a period. Accounting Standard three, as revised, groups them into operating, investing and financing activities. Their total is the net change in cash, which links the opening balance in one balance sheet with the closing balance in the next.',
    }),
    sl('concept', 'Importance of the statement', {
      v: vImportance,
      n: 'Why does it matter? It explains why cash moved differently from profit. It shows lenders and suppliers whether the main business generates enough cash to pay its way. It helps directors plan capital spending, repayments and dividends. It shows how new assets were financed. And because cash depends little on accounting policies, it makes comparison easier.',
    }),
    sl('check', 'Quick check: profit and cash', {
      b: 'True or false?',
      chk: 'tf_profit_cash',
      n: 'Think of the shawl maker’s customers, its stock and its spending on assets. Can cash fall while profit is earned?',
    }),
    sl('concept', 'Cash and cash equivalents', {
      v: vCCE,
      bl: ['**Cash**: cash in hand and demand deposits with banks.', '**Cash equivalents**: short-term, highly liquid investments, readily convertible into known amounts of cash, with an insignificant risk of change in value.'],
      n: 'Cash means cash in hand and money in current accounts. Cash equivalents are short-term, highly liquid investments that turn into a known amount of cash with little risk. As a rule they mature within three months of the day they were acquired, not three months from the balance sheet date. Shares never qualify, however easily they sell.',
    }),
    sl('example', 'Worked example 1: cash and cash equivalents of Baralacha Trekking Gear', {
      b: 'Baralacha Trekking Gear Ltd (imagined, Keylong) lists seven holdings at the year end. Which are cash and cash equivalents?',
      v: vWE1,
      n: `Baralacha, an imagined company at Keylong, lists seven holdings. Cash in hand and the current account are cash. Ninety-day treasury bills bought on issue and the overnight fund are cash equivalents. The four-month deposit is too long, the shares can change in value, and the old debentures fail because the test runs from the day they were bought. The total is ${rupees(BT_cce)}.`,
    }),
    sl('check', 'Quick check: the three-month test', {
      b: 'Fill in the blank.',
      chk: 'fb_three_months',
      n: 'Count the maturity from the date the investment was acquired. How many months at most?',
    }),
    sl('concept', 'What is not a cash flow', {
      v: vNotFlows,
      n: 'Some items never appear as flows. Moving money from the current account into a short deposit only changes the make-up of cash and cash equivalents. Debentures allotted to the seller of a machine, or bonus shares, involve no cash and are disclosed in a note. Depreciation appears only as an add-back. And a dividend proposed for the current year has no effect at all.',
    }),
    sl('concept', 'Three activities, one net change', {
      v: vActivities,
      n: 'Every cash flow belongs to one of three activities. Operating activities are the main revenue-earning business. Investing activities are the buying and selling of long-term assets and investments, and loans given. Financing activities change the owners’ capital and the borrowings. Together they make the net change in cash and cash equivalents.',
    }),
    sl('concept', 'Operating activities', {
      v: vOperating,
      n: 'Operating activities are the principal revenue-producing activities of the business. Cash comes in from customers and from royalties, fees or commission. Cash goes out to suppliers and employees. Income tax paid is also operating, because it arises from the profit of the business and cannot easily be split among the activities, unless it is clearly linked to an investing or financing transaction.',
    }),
    sl('concept', 'Investing activities', {
      v: vInvesting,
      n: 'Investing activities concern long-term assets and investments that are not cash equivalents. Buying land, machinery or patents is an outflow; selling them brings cash in. Buying shares or debentures of other companies, or lending to another party, is an outflow, and the recovery of such a loan is an inflow. For an ordinary company, interest and dividend received are investing inflows too.',
    }),
    sl('concept', 'Financing activities', {
      v: vFinancing,
      n: 'Financing activities change the owners’ capital and the borrowings. Issuing shares with any premium, issuing debentures and raising loans bring cash in. Redeeming preference shares or debentures, together with any premium paid, repaying loans, paying share issue expenses, interest and dividends take cash out. Notice that a premium paid on redemption is cash, even when it is written off against securities premium.',
    }),
    sl('concept', 'Interest, dividends and tax: it depends on the business', {
      v: vIntDiv,
      n: 'For an ordinary trading or manufacturing company, interest and dividend received are investing, and interest and dividend paid are financing. For a bank or an investment company, lending and investing are the main business, so interest received, dividend received and interest paid are operating. Dividend paid is financing for everyone. Income tax paid is usually operating.',
    }),
    sl('check', 'Quick check: classify four transactions', {
      b: 'Match each transaction with its place.',
      chk: 'mt_activities',
      n: 'For each one ask: is it trading, a long-term asset, a change in capital or borrowing, or no flow at all?',
    }),
    sl('example', 'Worked example 2: the cash flows of Nathula Tea Traders', {
      b: 'Kupup Tea Traders Ltd (imagined, Rangpo) had nine cash transactions in the year. Classify them and total each activity.',
      v: vWE2,
      n: `Kupup, an imagined tea trader at Rangpo, had nine cash transactions. Collections, payments to suppliers and staff, and tax are operating, a net inflow of ${rupees(NT_A)}. The vehicle and the interest received are investing, an outflow of ${rupees(-NT_B)}. The debentures, their interest for six months and the interim dividend are financing, an inflow of ${rupees(NT_C)}. Cash rose by ${rupees(NT_A + NT_B + NT_C)}.`,
    }),
    sl('example', 'Worked example 3: the special items of Jelepla Cardamom', {
      b: 'Jelepla Cardamom Ltd (imagined, Pedong) asks where seven items of the year belong.',
      v: vWE3,
      n: `Jelepla, an imagined cardamom company, has seven tricky items. Last year’s proposed dividend, paid this year, the share issue expenses and the redemption premium are financing outflows, ${rupees(-JCt('Financing'))} in all. The loan to the growers and its interest are investing. This year’s proposed dividend is only a contingent liability, and the bonus issue involves no cash, so neither appears.`,
    }),
    sl('check', 'Quick check: count the cash equivalents', {
      b: 'Work out the total.',
      chk: 'n_cce',
      n: 'Pick out cash, the current account and the short investments; leave out the long deposit and the shares.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up: the cash flow statement explains the change in cash and cash equivalents over a year. Cash equivalents mature within three months of acquisition and carry little risk. Switches within cash, non-cash deals and this year’s proposed dividend are not flows. Every flow is operating, investing or financing, and interest and dividends follow the nature of the business.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Apply the **three-month** test from the date of **acquisition**; shares are never cash equivalents.',
        'For a **non-financial** company: interest and dividend **received** are investing; **paid** are financing.',
        'Last year’s **proposed** dividend paid this year is a financing **outflow**; this year’s proposal has **no effect**.',
        'Share issue expenses and premium on redemption are **financing** outflows.',
        'In a classification answer, name the **activity** and say **inflow** or **outflow**.',
      ],
      n: 'In the exam, apply the three-month test from the date of acquisition, and remember that shares never qualify. For an ordinary company, interest and dividend received are investing; paid are financing. Last year’s proposed dividend paid this year is an outflow; this year’s proposal has no effect. Issue expenses and redemption premiums are financing. Always say inflow or outflow.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Cash Flow Statement — Part 2: Preparation by the Indirect Method, with Adjustments',
  goals: [
    'Work out net profit before tax, treating the previous year’s proposed dividend, the interim dividend and the current proposal correctly',
    'Adjust profit for depreciation, amortisation, sale of assets, provision for doubtful debts, finance costs and working capital',
    'Use working accounts for fixed assets, accumulated depreciation, investments, provision for tax and securities premium',
    'Prepare the investing and financing sections and check the statement against the change in cash',
  ],
  slides: [
    sl('title', 'Preparing the statement: the indirect method', {
      b: 'Part 2 — from two balance sheets and additional information to a complete **cash flow statement**, ending with the **cash check**.',
      v: vRoute2,
      n: 'Now we prepare the statement. We are given two balance sheets and some additional information. We rebuild net profit before tax, adjust it to reach cash from operating activities, use working accounts to find the investing and financing flows, and finish with a check: the net change must equal the change in cash between the two balance sheets.',
    }),
    sl('concept', 'The format at a glance', {
      v: vSkeleton,
      n: 'The operating section begins with net profit before tax, adds back and deducts the adjustments to reach operating profit before working capital changes, adjusts for working capital to reach cash generated from operations, and deducts tax paid. Then come investing and financing. The three totals give the net change, which, added to opening cash, must give closing cash.',
    }),
    sl('concept', 'Our case company: Khardung Thermal Wear Ltd', {
      v: vKhBS,
      n: `Meet Khardung Thermal Wear, an imagined company at Panamik. Its balance sheet total grew from ${rupees(KH.totals[1])} to ${rupees(KH.totals[0])}, and its cash and cash equivalents rose from ${rupees(KH.open)} to ${rupees(KH.close)}. We also know that it issued shares at a premium, redeemed some debentures at a premium, sold a machine and some investments, and paid two dividends.`,
    }),
    sl('example', 'Worked example 4: net profit before tax', {
      b: `Khardung (imagined): surplus up ${rs(KH.dSurplus)}; ${rs(KH.transfer)} transferred to general reserve; dividend proposed for 2024-25 paid ${rs(pctOf(10, 1200000))}; interim dividend ${rs(pctOf(5, 1500000))}; tax provided ${rs(KH.taxProvided)}; dividend proposed for 2025-26 ${rs(KH.proposed.amount)}.`,
      v: vNpbt,
      n: `The balance sheet shows only the profit kept back. Start with the increase in surplus, ${rupees(KH.dSurplus)}. Add back what was taken out of this year’s profit: the transfer to reserve, last year’s proposed dividend paid this year, and the interim dividend. That gives profit after tax of ${rupees(KH.npbt - KH.taxProvided)}. Add the tax provided, and net profit before tax is ${rupees(KH.npbt)}.`,
    }),
    sl('check', 'Quick check: rebuild the profit', {
      b: 'Work out net profit before tax.',
      chk: 'n_npbt',
      n: 'Start from the rise in surplus and add back every appropriation made during the year, then the tax.',
    }),
    sl('concept', 'Dividends: the ISC rule', {
      v: vDivRule,
      n: `Dividends need care. The dividend proposed for last year is approved and paid this year, so it is added back in the profit working and shown as a financing outflow. The interim dividend is treated the same way. The dividend proposed for this year is only a contingent liability: Khardung’s proposal of ${rupees(KH.proposed.amount)} is neither added back nor shown.`,
    }),
    sl('check', 'Quick check: last year’s proposal', {
      b: 'True or false?',
      chk: 'tf_prev_prop',
      n: 'Was last year’s dividend paid out of this year’s surplus, and did cash leave this year?',
    }),
    sl('concept', 'Adjusting for non-cash and non-operating items', {
      v: vAdjust,
      n: 'Next, undo the items in profit that are not operating cash. Add back depreciation, patents or goodwill written off, losses on selling assets, an increase in the provision for doubtful debts, and interest on debentures and loans. Deduct profits on sale and interest or dividend received, which belong to investing. The result is operating profit before working capital changes.',
    }),
    sl('concept', 'Provision for doubtful debts', {
      v: vPdd,
      n: `When receivables are shown gross with the provision deducted, add back an increase in the provision as a non-cash charge and deduct the rise in gross receivables. At Khardung the provision rose by ${rupees(KH_PDD)}. Working with net receivables instead gives exactly the same cash effect, so either method earns full marks. Use one, not both.`,
    }),
    sl('check', 'Quick check: the provision', {
      b: 'True or false?',
      chk: 'tf_pdd',
      n: 'Did any cash leave the business when the provision was increased?',
    }),
    sl('concept', 'Working-capital changes', {
      v: vWCRule,
      bl: ['Compare each current item in the two balance sheets.', 'Provision for tax and borrowings are **not** working-capital items here.'],
      n: 'Then adjust for current assets and current liabilities. If inventories or receivables rise, cash is tied up, so deduct the rise; if they fall, add. Current liabilities work the other way: a rise in trade payables means bills not yet paid, so add it; a fall means they were paid off, so deduct it.',
    }),
    sl('example', 'Worked example 5: operating activities of Khardung', {
      b: 'Net profit before tax, the adjustments, the working-capital changes and tax paid, from the balance sheets and the working accounts.',
      v: vWE_A,
      n: `For Khardung, net profit before tax of ${rupees(KH.npbt)}, with depreciation, the loss on the machine, the patents written off, the provision and the debenture interest added back, and the investment profit and dividend taken out, gives ${rupees(KH.A.opbwc)}. After working capital, cash generated is ${rupees(KH.A.cashGen)}. Less tax paid of ${rupees(KH.A.taxPaid)}, operating activities bring in ${rupees(KH.A.A)}.`,
    }),
    sl('concept', 'Working account: machinery at cost', {
      v: vMach,
      n: `The machinery account is kept at cost. The machine sold, costing ${rupees(M.sold.cost)}, leaves against its accumulated depreciation of ${rupees(M.sold.accDep)}, the sale price of ${rupees(M.price)} and a loss of ${rupees(M.loss)}. The amount needed to reach the closing balance, ${rupees(M.purchase)}, is the machinery bought during the year.`,
    }),
    sl('concept', 'Working account: accumulated depreciation', {
      v: vAccDep,
      n: `Accumulated depreciation starts at ${rupees(M.acc[0])}. The depreciation on the machine sold, ${rupees(M.sold.accDep)}, is transferred out. To reach the closing balance of ${rupees(M.acc[1])}, this year’s depreciation must be ${rupees(M.dep)}. That figure is added back in the operating section.`,
    }),
    sl('concept', 'Working account: provision for tax', {
      v: vTax,
      n: `The provision for tax starts at ${rupees(TX.a)}, and ${rupees(TX.provided)} is provided this year. The closing balance is ${rupees(TX.b)}, so the tax actually paid is ${rupees(TX.paid)}. The provision was added through net profit before tax; the tax paid is deducted at the end of the operating section.`,
    }),
    sl('example', 'Worked example 6: investing activities of Khardung', {
      b: `Machinery bought (working account); machinery sold for ${rs(M.price)}; investments costing ${rs(IV.cost)} sold for ${rs(IV.price)}; investments bought (balancing figure); dividend received ${rs(18000)}.`,
      v: vWE_B,
      n: `Khardung bought machinery for ${rupees(M.purchase)} and new investments for ${rupees(IV.purchase)}. It received ${rupees(M.price)} for the old machine, ${rupees(IV.price)} for investments and a dividend on its holdings. Net cash used in investing is ${rupees(-KH.B.total)}. The full sale prices appear here; the loss and profit were adjusted in operating.`,
    }),
    sl('concept', 'Working account: securities premium', {
      v: vSP,
      n: `Securities premium hides a figure. Khardung wrote off share issue expenses and the premium on redeeming debentures against it. Debiting both, the premium received on the new shares is the balancing figure, ${rupees(KH.premium.received)}. So the share issue brought in ${rupees(KH.sharesCash)}, even though the premium balance rose by only ${rupees(67000 - 50000)}.`,
    }),
    sl('example', 'Worked example 7: financing activities of Khardung', {
      b: 'Shares issued at a premium; issue expenses paid; debentures redeemed at a premium of five per cent on the first of October; interest paid half-yearly; two dividends paid.',
      v: vWE_C,
      n: `Khardung raised ${rupees(KH.sharesCash)} from shares and paid issue expenses. It redeemed debentures at a premium, paying ${rupees(105000)}, and paid interest of ${rupees(DEBINT)}, worked half-year by half-year on the debentures outstanding. With last year’s proposed dividend and the interim dividend, net cash used in financing is ${rupees(-KH.C.total)}.`,
    }),
    sl('check', 'Quick check: match the treatment', {
      b: 'Match each item with its treatment.',
      chk: 'mt_treatment',
      n: 'For each item, ask what it did to profit and which activity its cash belongs to.',
    }),
    sl('concept', 'The complete statement and the cash check', {
      v: vFull,
      n: `Put the three sections together. Operating activities brought in ${rupees(KH.A.A)}; investing used ${rupees(-KH.B.total)}; financing used ${rupees(-KH.C.total)}. The net increase is ${rupees(KH.D)}. Added to the opening cash of ${rupees(KH.open)}, it gives ${rupees(KH.close)}, exactly the closing balance. If your statement does not agree, a figure is missing or misplaced.`,
    }),
    sl('concept', 'Seeing the flows', {
      v: vWaterfall,
      n: `This chart tells the year’s cash story. Khardung began with ${rupees(KH.open)}. Its operations added ${rupees(KH.A.A)}. Most of that went on new machinery, and a little more on financing, as redemption, interest and dividends outweighed the share issue. It ended with ${rupees(KH.close)}.`,
    }),
    sl('example', 'Worked example 8: an asset at written-down value', {
      b: `Tenga Orchid Farms Ltd (imagined): greenhouses ${rs(BO.a)} and ${rs(BO.b)} at written-down value; depreciation ${rs(BO.dep)}; a greenhouse with a book value of ${rs(BO.bv)} sold for ${rs(BO.price)}.`,
      v: vWDV,
      n: `When an asset is shown at written-down value, depreciation is credited to the asset account itself. For the imagined Tenga Orchid Farms, the greenhouse sold left at its sale price, with the profit of ${rupees(BO.profit)} on the debit side. The balancing figure, ${rupees(BO.purchase)}, is the greenhouses bought.`,
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up: rebuild net profit before tax from the surplus, reserves, dividends paid and the tax provision. Adjust for non-cash and non-operating items, then for working capital, then deduct tax paid. Working accounts give purchases, depreciation, sale results, tax paid and premium received. Finally, check that the net change equals the change in cash.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Show **working notes**: net profit before tax, asset and depreciation accounts, provision for tax, securities premium.',
        'Add back **last year’s proposed** and **interim** dividends; ignore **this year’s** proposal.',
        'Show the **sale price** under investing; adjust only the **profit or loss** in operating.',
        'Work interest on the **balance and period** outstanding; add it back, then show it as paid.',
        'Finish with the **cash check**: opening + net change = closing.',
      ],
      n: 'In the exam, show your working notes. Add back last year’s proposed dividend and the interim dividend, but ignore this year’s proposal. Put the full sale price under investing and adjust only the profit or loss in operating. Work interest on the balance and the months outstanding. And always finish with the cash check.',
    }),
  ],
});

// Narration is spoken by text to speech: no digits, rupee sign, slash, ampersand, per-cent sign or capitals runs.
for (const d of [part1, part2]) for (const s of d.slides) {
  const m = /\d|₹|[\/&%]|\b[A-Z]{2,}\b/.exec(s.narration);
  check(!m, `narration of part ${d.part} ${s.id} has "${m?.[0]}"`);
}

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Cash Flow Statement — Notes',
  sections: [
    {
      h: '1. Meaning, importance and AS 3 (revised)',
      t: 1,
      b: 'A **cash flow statement** reports the inflows and outflows of **cash and cash equivalents** of an enterprise during a period, classified into **operating**, **investing** and **financing** activities, and reconciles the opening and closing balances. It is prepared under **AS 3 (revised), Cash Flow Statements**, and forms part of a company’s financial statements under the Companies Act, 2013.\n\n**Why profit and cash differ:** profit is measured on the accrual basis (credit sales, outstanding expenses, depreciation, provisions), while cash changes only on receipt or payment; buying assets, repaying loans and paying dividends use cash without touching profit.\n\n**Importance:**\n- explains the movement in cash, activity by activity, and the gap between profit and cash;\n- shows whether operations generate enough cash to pay suppliers, staff, tax, interest and dividends;\n- helps plan capital spending, repayments and dividend policy;\n- shows how new assets were financed (shares, debentures, loans or operations);\n- allows comparison across years and firms with little effect of accounting policies.',
      terms: [
        ['Cash flow statement', 'A statement of the inflows and outflows of cash and cash equivalents of a period, classified by activity (AS 3 revised).'],
        ['Accrual basis', 'Income and expenses recorded when earned or incurred, not when cash moves.'],
      ],
      v: vMeaning,
      vs: [vImportance, vProfitCash],
    },
    {
      h: '2. Cash, cash equivalents and what is not a cash flow',
      t: 1,
      b: '- **Cash:** cash on hand and demand deposits with banks.\n- **Cash equivalents:** short-term, highly liquid investments, readily convertible into known amounts of cash and subject to an insignificant risk of change in value. An investment qualifies normally only when it has a maturity of **three months or less from the date of acquisition** (treasury bills, commercial paper, short deposits, overnight funds). **Equity shares are excluded.** A bond bought years ago is not a cash equivalent merely because it now matures within three months.\n- **Cash flows:** inflows and outflows of cash and cash equivalents.\n\n**Not cash flows:**\n- movements **between** components of cash and cash equivalents (a 45-day deposit made from the current account);\n- **non-cash** investing and financing transactions: assets acquired for shares or debentures, bonus shares, conversion of debentures into shares (excluded and disclosed elsewhere);\n- book transfers to reserves (general reserve, capital redemption reserve);\n- the dividend **proposed for the current year**, a contingent liability not provided for.',
      terms: [
        ['Cash equivalents', 'Short-term, highly liquid investments maturing within three months of acquisition, with insignificant risk of change in value.'],
        ['Non-cash transaction', 'An investing or financing transaction that uses no cash or cash equivalent, such as shares issued for a building.'],
      ],
      v: vCCE,
      vs: [vWE1, vNotFlows],
    },
    {
      h: '3. Classification into three activities',
      t: 1,
      b: '**Operating activities** — the principal revenue-producing activities and other activities that are not investing or financing: receipts from customers, royalties, fees and commission; payments to suppliers and employees; income tax paid (unless specifically identified with investing or financing).\n\n**Investing activities** — acquisition and disposal of long-term assets and of investments not included in cash equivalents: purchase and sale of land, buildings, machinery, patents; purchase and sale of shares and debentures of other enterprises; loans and advances made to others and their recovery; interest and dividend received (non-financial enterprise).\n\n**Financing activities** — activities that change the size and composition of owners’ capital and borrowings: issue of equity and preference shares (with premium); issue of debentures and raising of loans; redemption of preference shares and debentures (with any premium); repayment of loans; share issue expenses; interest and dividends paid.\n\n**Interest and dividends:** for a **non-financial** enterprise, interest and dividend received are investing and interest and dividend paid are financing; for a **financial** enterprise, interest paid, interest received and dividend received are operating, and dividend paid is financing.',
      terms: [
        ['Operating activities', 'Principal revenue-producing activities and others that are not investing or financing.'],
        ['Investing activities', 'Acquisition and disposal of long-term assets and investments other than cash equivalents, and loans given.'],
        ['Financing activities', 'Activities that change the owners’ capital and the borrowings.'],
      ],
      v: vActivities,
      vs: [vOperating, vInvesting, vFinancing, vIntDiv, vWE2],
    },
    {
      h: '4. The format and net profit before tax',
      t: 2,
      b: 'The statement is prepared by the **indirect method**: the operating section starts from net profit before tax and adjusts it; investing and financing sections list gross receipts and payments.\n\n**Step 1 — net profit before tax** (working note). The balance sheet shows only the retained part of profit, so rebuild it:\n\nNet profit before tax = (closing − opening balance in the Statement of Profit and Loss) + transfers to reserves (general reserve, capital redemption reserve) + dividends paid during the year (previous year’s proposed dividend and this year’s interim dividend) + provision for tax made during the year.\n\nThe dividend **proposed for the current year** is not added: it is a contingent liability, not an appropriation of this year’s surplus.\n\n*Not in the ISC 2027 syllabus:* extraordinary items and refund of tax, transactions relating to capital reserve, the adjusted Profit and Loss Account method and the direct method of operating cash flow.',
      terms: [
        ['Indirect method', 'Operating cash flow found by adjusting net profit before tax for non-cash items, non-operating items and working-capital changes.'],
        ['Net profit before tax (working)', 'Change in surplus plus appropriations made during the year plus the provision for tax.'],
      ],
      v: vSkeleton,
      vs: [vKhBS, vNpbt],
    },
    {
      h: '5. Operating activities: adjustments and working capital',
      t: 2,
      b: '**Step 2 — non-cash and non-operating items.**\n- **Add:** depreciation; amortisation (goodwill, patents, trademarks written off); loss on sale of fixed assets or investments; increase in provision for doubtful debts (when receivables are taken gross); interest on debentures and loans (finance costs).\n- **Deduct:** profit on sale of fixed assets or investments; interest and dividend received (non-financial enterprise); decrease in provision for doubtful debts.\n- Result: **operating profit before working capital changes**.\n\n**Step 3 — working capital.** For each current asset (inventories, trade receivables, prepaid expenses): **increase → deduct, decrease → add**. For each current liability (trade payables, outstanding expenses): **increase → add, decrease → deduct**. Result: **cash generated from operations**. Cash and cash equivalents, provision for tax and borrowings are not part of this step.\n\n**Step 4 — tax.** Deduct **income tax paid** (from the provision for tax account): **net cash from operating activities**.',
      terms: [
        ['Operating profit before working capital changes', 'Net profit before tax after adding back non-cash charges and finance costs and removing non-operating income.'],
        ['Cash generated from operations', 'Operating profit before working capital changes adjusted for changes in current assets and current liabilities.'],
      ],
      v: vWE_A,
      vs: [vAdjust, vWCRule],
    },
    {
      h: '6. Investing activities and working accounts',
      t: 3,
      b: '**Working accounts** reveal the figures the balance sheets hide:\n- **Asset at cost** (with an accumulated depreciation account): the asset sold leaves at cost against its accumulated depreciation, the sale price and the profit or loss; **purchases** are the balancing figure.\n- **Accumulated depreciation:** opening + depreciation for the year − depreciation on the asset sold = closing; the **depreciation for the year** is usually the balancing figure.\n- **Asset at written-down value:** opening + purchases + profit on sale = sale price + loss on sale + depreciation + closing.\n- **Investments:** opening + purchases + profit on sale = sale price + loss on sale + closing.\n\n**Investing section:** purchases (outflows) and full **sale prices** (inflows) of fixed assets, intangibles and investments; loans given (outflow) and recovered (inflow); interest and dividend received. The profit or loss on sale is adjusted only in the operating section.',
      terms: [
        ['Working account', 'A ledger account built from opening and closing balances and additional information to find a missing figure.'],
        ['Balancing figure', 'The amount needed to make the two sides of a working account equal.'],
      ],
      v: vWE_B,
      vs: [vMach, vAccDep, vInv, vWDV],
    },
    {
      h: '7. Financing activities',
      t: 4,
      b: '- **Equity shares:** increase in share capital − shares issued to vendors − bonus shares, plus the **premium received** (from the securities premium account, which may also be debited with issue expenses and redemption premiums).\n- **Share issue expenses** paid: financing **outflow**, whatever they are written off against.\n- **Preference shares and debentures redeemed:** outflow of the face value **plus any premium** paid. A capital redemption reserve created out of profit is a transfer, not a cash flow; add it back in the profit working.\n- **Debentures issued and loans raised:** inflows; **repayments:** outflows. Short-term borrowings are financing too.\n- **Interest paid** on debentures and loans: work it for the period each balance was outstanding; it is added back in operating and paid under financing.\n- **Dividends paid:** previous year’s proposed dividend and this year’s interim dividend (and preference dividend paid) are outflows; this year’s proposed dividend has **no effect**.\n\n**Non-cash** issues (shares or debentures to vendors, bonus shares, conversion) are kept out.',
      terms: [
        ['Securities premium account (working)', 'Opening + premium received = issue expenses and redemption premium written off + closing.'],
        ['Premium on redemption', 'The amount paid above face value when debentures or preference shares are redeemed; a financing outflow.'],
      ],
      v: vWE_C,
      vs: [vSP, vWE3],
    },
    {
      h: '8. Adjustments together and the cash check',
      t: 5,
      b: '| Adjustment | Profit working | Operating | Investing | Financing |\n| --- | --- | --- | --- | --- |\n| Provision for tax | Add the provision for the year | Deduct **tax paid** | — | — |\n| Proposed dividend, previous year (paid) | Add | — | — | Outflow |\n| Interim dividend | Add | — | — | Outflow |\n| Proposed dividend, current year | — | — | — | No effect |\n| Depreciation | — | Add back | — | — |\n| Sale of an asset | — | Adjust profit or loss | Sale price | — |\n| Amortisation (goodwill, patents) | — | Add back | Purchase of the intangible | — |\n| Provision for doubtful debts | — | Add increase / deduct decrease | — | — |\n\n**The cash check:** net increase or decrease (A + B + C) + opening cash and cash equivalents = closing cash and cash equivalents. Every balance sheet line must be explained exactly once.',
      terms: [
        ['Tax paid', 'Opening provision for tax + provision for the year − closing provision.'],
        ['Cash check', 'Opening cash and cash equivalents plus the net change equals the closing balance.'],
      ],
      v: vFull,
      vs: [vTax, vDivRule, vPdd, vWaterfall],
    },
  ],
  tips: '**Common mistakes**\n- Starting from net profit **after** tax, or forgetting to add back the **transfer to reserve** and the **dividends paid** when rebuilding profit.\n- Adding back or showing the dividend **proposed for the current year** (no effect).\n- Deducting the **provision** for tax instead of the **tax paid**.\n- Showing the **book value** instead of the **sale price** under investing, or forgetting the profit or loss on sale in operating.\n- Taking the share proceeds as the rise in share capital and premium, without adding back the **issue expenses** and **redemption premium** written off against the premium.\n- Showing a debenture redemption at face value only, leaving out the **premium** paid.\n- Treating interest or dividend **received** as operating, or interest **paid** as operating, for a non-financial company.\n- Reversing the working-capital rule (an increase in receivables is **deducted**), or adjusting the provision for doubtful debts twice.\n- Including **non-cash** transactions or a switch into **cash equivalents** as a flow.\n\n**How marks are usually awarded**\n- 1 mark: one classification or treatment (MCQ, assertion-reason).\n- 2 marks: cash and cash equivalents; net profit before tax; one working account; four classifications.\n- 3 marks: one section with its working; a working account with its treatment; six classifications.\n- 5 marks (in parts): a section with two working accounts, or a small complete statement (working notes 2, statement 3).\n- 8 marks (board question on this unit): a complete statement — net profit before tax 1, working accounts 2, operating 2, investing 1, financing 1, net change and check 1.\n\n**Figures in SOYL practice** are imagined; your paper will give its own.',
});

// ---------------------------------------------------------------- flashcards
const FC = cards([
  ['Cash flow statement', 'Inflows and outflows of cash and cash equivalents of a period, by operating, investing and financing activities.', 'definition', 1],
  ['Standard governing it', '**AS 3 (revised)**, Cash Flow Statements.', 'fact', 1],
  ['Cash', 'Cash on hand and demand deposits with banks.', 'definition', 1],
  ['Cash equivalents', 'Short-term, highly liquid investments, readily convertible into known cash, insignificant risk of change in value.', 'definition', 1],
  ['Maturity test for a cash equivalent', '**Three months or less from the date of acquisition**, not from the balance sheet date.', 'exam-tip', 1],
  ['Equity shares as cash equivalents?', '**Never**: their value can change significantly.', 'exam-tip', 1],
  ['Deposit of 45 days made from the current account', '**Not a cash flow**: a switch within cash and cash equivalents.', 'exam-tip', 1],
  ['Non-cash transactions', 'Shares or debentures to a vendor, bonus shares, conversion: excluded and disclosed elsewhere.', 'concept', 1],
  ['Why profit differs from cash', 'Profit is on the accrual basis; cash moves only on receipt or payment.', 'concept', 1],
  ['Operating activities', 'Principal revenue-producing activities and others not investing or financing.', 'definition', 1],
  ['Investing activities', 'Acquisition and disposal of long-term assets and investments (not cash equivalents); loans given.', 'definition', 1],
  ['Financing activities', 'Changes in owners’ capital and borrowings.', 'definition', 1],
  ['Interest and dividend received (manufacturer)', '**Investing** inflows; deducted in the operating section.', 'exam-tip', 1],
  ['Interest and dividend paid (manufacturer)', '**Financing** outflows; interest is added back in operating first.', 'exam-tip', 1],
  ['Interest received and paid (bank or investment company)', '**Operating**; dividend paid stays **financing**.', 'exam-tip', 1],
  ['Income tax paid', '**Operating**, unless specifically identified with investing or financing.', 'fact', 1],
  ['Net profit before tax from the balance sheet', 'Change in surplus + transfers to reserves + dividends paid this year + provision for tax.', 'exam-tip', 2],
  ['Increase in a current asset', '**Deduct** (cash tied up).', 'exam-tip', 2],
  ['Increase in a current liability', '**Add** (cash not yet paid).', 'exam-tip', 2],
  ['Operating profit before working capital changes', 'Net profit before tax after the non-cash and non-operating adjustments.', 'definition', 2],
  ['Purchase of an asset kept at cost', 'Closing + cost of asset sold − opening (− any acquired for shares).', 'exam-tip', 3],
  ['Depreciation for the year (accumulated depreciation account)', 'Closing + depreciation on the asset sold − opening.', 'exam-tip', 3],
  ['Sale of an asset at a loss', 'Loss added back in operating; **sale price** under investing.', 'exam-tip', 3],
  ['Loan given by a manufacturer', '**Investing** outflow; its recovery and the interest on it are investing inflows.', 'fact', 3],
  ['Share issue expenses', '**Financing** outflow, even if written off against securities premium.', 'exam-tip', 4],
  ['Debentures redeemed at a premium', 'Financing outflow = face value **+ premium**.', 'exam-tip', 4],
  ['Premium received on a share issue', 'Closing securities premium + amounts written off against it − opening.', 'exam-tip', 4],
  ['Capital redemption reserve created from profit', 'Not a cash flow; added back in the profit working.', 'fact', 4],
  ['Previous year’s proposed dividend, paid this year', 'Added back in the profit working; **financing outflow**.', 'exam-tip', 5],
  ['Current year’s proposed dividend', '**No effect**: a contingent liability, neither provided nor paid.', 'exam-tip', 5],
  ['Tax paid', 'Opening provision + provision for the year − closing provision.', 'exam-tip', 5],
  ['Goodwill or patents written off', 'Amortisation: **added back** in operating.', 'fact', 5],
  ['Increase in provision for doubtful debts', 'Added back as a non-cash charge (gross receivables); same answer as using net receivables.', 'exam-tip', 5],
  ['The cash check', 'Opening cash and cash equivalents + (A + B + C) = closing cash and cash equivalents.', 'concept', 5],
]);

// ---------------------------------------------------------------- tests (blueprints isc-12-default-chapter-test-short / -long)
const T_SHORT = test({
  kind: 'short',
  blueprint: 'isc-12-default-chapter-test-short',
  title: 'Chapter test (short) — Cash Flow Statement',
  duration: 50,
  sections: [
    { id: 'A', title: 'Section A - Objective (5 marks)', instr: 'Answer all questions. Multiple-choice and assertion-reason items carry 1 mark each.', items: ['m_cce_pick', 'm_npbt', 'm_issue_exp', 'm_pdd', 'ar_prop_div'] },
    { id: 'B', title: 'Section B - Short answer (4 marks)', instr: 'Answer both questions. Internal choice in the second question.', items: ['s2_npbt', { attempt: 1, keys: ['s2_classify4', 's2_tax'] }] },
    { id: 'C', title: 'Section C - Short answer (6 marks)', instr: 'Answer both questions. Internal choice in the second question. Show your working.', items: ['s3_cfo_small', { attempt: 1, keys: ['s3_machinery', 's3_financing'] }] },
    { id: 'D', title: 'Section D - Long answer (5 marks)', instr: 'Answer the question. It is set in parts (2 + 3 marks); show your working notes.', items: ['l5_full_small_A'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'isc-12-default-chapter-test-long',
  title: 'Chapter test (long) — Cash Flow Statement',
  duration: 100,
  sections: [
    { id: 'A', title: 'Section A - Objective (12 marks)', instr: 'Answer all questions. Multiple-choice and assertion-reason items carry 1 mark each.', items: ['m_purpose', 'm_not_flow', 'm_noncash', 'm_int_paid', 'm_loan_given', 'm_opbwc', 'm_purchase', 'm_redemption', 'm_prop_div', 'm_tax_paid', 'ar_shares_ce', 'ar_dep_source'] },
    { id: 'B', title: 'Section B - Short answer (6 marks)', instr: 'Answer all three questions. Internal choice in the last question.', items: ['s2_cce', 's2_wc', { attempt: 1, keys: ['s2_dep_acc', 's2_prop_div'] }] },
    { id: 'C', title: 'Section C - Short answer (12 marks)', instr: 'Answer all four questions. Internal choice in the last question. Show your working.', items: ['s3_classify6', 's3_npbt_tax', 's3_investing', { attempt: 1, keys: ['s3_pref_redeem', 's3_pdd_amort'] }] },
    { id: 'D', title: 'Section D - Long answer (10 marks)', instr: 'Answer both questions. Internal choice in the second question. Each is set in parts; show your working.', items: ['l5_cfo', { attempt: 1, keys: ['l5_financing', 'l5_full_small_B'] }] },
  ],
});
check(T_SHORT.total_marks === 20 && T_LONG.total_marks === 40, 'test totals');
// Deck checks never appear in the tests.
const inTests = new Set([T_SHORT, T_LONG].flatMap((t) => t.sections.flatMap((s) => s.items.map((i) => i.question_id))));
for (const d of [part1, part2]) for (const s of d.slides) if (s.check_question_id) check(!inTests.has(s.check_question_id), `deck check ${s.check_question_id} is also in a test`);

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: FC,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t05 of isc-12-accounts-ch11 only (meaning, importance, cash and cash equivalents and classification under AS 3 revised; operating activities by the indirect method; investing activities; financing activities; adjustments for provision for tax, proposed and interim dividend, depreciation and sale of assets, amortisation and provision for doubtful debts). Removed for ISC 2027 (extraordinary items and refund of tax, capital reserve transactions, the adjusted Profit and Loss Account method, the direct method) appear only as one note in notes section 4',
    originality: 'every company, scenario and figure written for this chapter (imagined companies named after Indian mountain passes and ghat roads); no textbook illustration or exercise and no CISCE specimen or past-paper item reused; companies and stems differ from the CBSE 12 Accountancy chapters and ISC ch01–ch10',
    accounts: `cashFlow() engine (acc.mjs): both balance sheets balance; every working account (asset at cost or written-down value, accumulated depreciation, investments, provision for tax, securities premium) balances with a non-negative balancing figure; every balance sheet line is consumed exactly once; the current year's proposed dividend is refused as a dividend paid; net increase (A + B + C) asserted equal to closing minus opening cash and cash equivalents; hand-checked pins (Khardung net profit before tax ${fig(KH.npbt)}, operating ${fig(KH.A.A)}, investing ${fig(KH.B.total)}, financing ${fig(KH.C.total)}, net increase ${fig(KH.D)}; ${FACTS.join('; ')})`,
    facts: 'cash equivalents mature within three months of acquisition and exclude equity shares; non-financial company: interest and dividend received investing, paid financing; financial company: interest and dividend received and interest paid operating; tax paid, not the provision, is deducted; previous year’s proposed dividend is an outflow and the current year’s has no effect; issue expenses and redemption premium are financing outflows',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
