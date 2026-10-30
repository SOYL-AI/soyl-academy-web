// CBSE 12 Accountancy, ch09 Analysis of Financial Statements — question bank. Every company and figure
// is imagined by SOYL; no NCERT illustration or exercise and no CBSE sample/past-paper item is reused.
// Every statement in a stem or model answer is built by acc.mjs from the givens (plStatement /
// bsStatement), and every change and percentage is computed and asserted there (comparative /
// commonSize), so a figure in a key or model answer is never typed by hand. Key results are also pinned
// below to values worked out independently by hand.
import { Q, mcq, ar, tf, fb, match, num, short, long } from './lib.mjs';
import { fig, rs, md, check, hundredths, pc, pcs, pcv, pctOf, plStatement, bsStatement, comparative, commonSize, headShare, twoCol, PL_HEADS } from './acc.mjs';

const Y = ['2024-25', '2025-26'];
const D = ['31 March 2025', '31 March 2026'];
/** Two-year givens as a table for a stem: rows [[label, previous, current]]. */
const given2 = (rows, cols = Y) => md(['Particulars', `${cols[0]} (₹)`, `${cols[1]} (₹)`], rows.map(([l, a, b]) => [l, fig(a), fig(b)]), [1, 2]);
const RULE = 'Percentages are rounded to two decimal places.';
const FACTS = [];

// ================================================================ t01 Meaning, significance, objectives, limitations, tools
Q('m_meaning', mcq({
  t: 1, d: 1, c: 'understanding',
  stem: 'Nisha, a commerce student, has the balance sheets and statements of profit and loss of an imagined company for two years. Which activity of hers is the analysis of financial statements?',
  opts: [
    'Relating the figures to each other and across the years to judge the profitability and financial strength of the company',
    'Recording the transactions of the year in the journal and posting them to the ledger',
    'Checking the vouchers behind every entry, as an auditor does',
    'Preparing the trial balance from the ledger balances',
  ],
  sol: 'Analysis begins where the accounts end: it takes the finished statements, sets items against each other and against earlier years, and draws conclusions. Recording, posting, vouching and the trial balance all come before the statements exist.',
}));

Q('m_lender', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'A bank is considering a seven-year term loan to an imagined company, Lohit Tea Estates Ltd, Dibrugarh. Through financial analysis, the bank is chiefly trying to judge',
  opts: [
    "the company's long-term solvency: whether it can pay interest regularly and repay the loan when due",
    "the market price of the company's shares next month",
    'how many workers the company employs on each tea estate',
    'whether the directors are related to each other',
  ],
  sol: 'A long-term lender is repaid over several years, so it studies the capital structure, the profit available to cover interest and the stability of earnings.',
}));

Q('m_interfirm', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'An analyst places the financial statements of two imagined cement makers, Arpa Cement Ltd and Sankh Cement Ltd, side by side for the same year to see which uses its resources better. This is an example of',
  opts: ['inter-firm comparison', 'intra-firm comparison', 'a cash flow analysis', 'an audit of the two companies'],
  sol: 'Comparing different firms for the same period is inter-firm comparison; comparing one firm with itself over several periods is intra-firm (time series) comparison.',
}));

Q('m_vertical', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Analysing the statements of a single year by expressing each item as a percentage of a common base is known as',
  opts: ['vertical analysis', 'horizontal analysis', 'trend forecasting', 'internal audit'],
  sol: 'Vertical (static) analysis studies the relationship of items within one period; common-size statements are its usual form.',
}));

Q('m_horizontal', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Comparative statements are said to be a form of horizontal analysis because',
  opts: [
    'they compare the same item across two or more accounting periods',
    'they express every item as a percentage of a single base figure of one year',
    'they are always prepared in the horizontal (T-shaped) form of the balance sheet',
    'they are prepared only by analysts outside the company',
  ],
  sol: 'The reader moves across the columns, from one year to the next, for each item; that movement over time is what "horizontal" refers to, not the shape of the statement.',
}));

Q('m_limit_policy', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Two imagined footwear makers, Palar Leather Ltd and Ponnaiyar Shoes Ltd, value their closing inventory by different acceptable methods and charge depreciation at different rates. An analyst comparing their profit margins should remember that',
  opts: [
    'differences in accounting policies can make an inter-firm comparison misleading',
    'the comparison is impossible, because only firms of the same size can be compared',
    'analysis automatically removes the effect of different accounting policies',
    'inventory and depreciation never affect the profit of a company',
  ],
  sol: 'The same transactions can produce different profits under different policies, so part of the gap between the two margins may come from the methods, not from performance.',
}));

Q('m_limit_qual', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'The comparative statements of an imagined software company, Kopai Digital Ltd, show rising revenue and profit. Shortly afterwards, its entire product design team resigns, which hurts the company badly. The analysis failed to warn of this because',
  opts: [
    'financial analysis ignores qualitative factors that cannot be expressed in money',
    'comparative statements cannot be prepared for software companies',
    'the analyst should have used a common-size balance sheet instead',
    'revenue and profit are never relevant to a software company',
  ],
  sol: 'The skill and loyalty of a team carry no rupee value in the books, so no tool built on the financial statements can pick them up.',
}));

Q('m_not_tool', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which one of the following is NOT a tool of analysis of financial statements?',
  opts: ['Bank reconciliation statement', 'Common-size statements', 'Ratio analysis', 'Cash flow statement'],
  sol: 'A bank reconciliation explains the gap between the cash book and the pass book; it is a bookkeeping check, not a method of analysing the published statements.',
}));

Q('ar_judgement', ar({
  t: 1, d: 2, c: 'understanding', key: 'a',
  a: 'The results of financial analysis must be interpreted with care before a decision is taken.',
  r: 'Analysis only points out symptoms, such as a falling margin; finding the cause needs further enquiry and judgement.',
  sol: 'Both are true. A changed figure tells the analyst where to look, not why it changed, and that is exactly why interpretation needs care; R explains A.',
}));

Q('ar_policy', ar({
  t: 1, d: 3, c: 'analysis', key: 'c',
  a: 'Inter-firm comparison through financial analysis may be misleading when the firms follow different accounting policies.',
  r: 'Every company is required by law to use the same method of depreciation and of valuing inventory.',
  sol: 'A is true. R is false: companies may choose among accepted methods for depreciation and inventory, and that freedom is the very reason comparisons between firms can mislead.',
}));

Q('tf_inflation', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? Because it compares figures of several years, financial analysis automatically corrects for changes in the price level.',
  sol: 'Figures of different years are compared at their book amounts. A rise in rupees may only reflect inflation, which the analyst has to allow for separately.',
}));

Q('tf_internal', tf({
  t: 1, d: 1, c: 'recall', ans: true,
  stem: 'True or false? Analysis of financial statements is useful to the management of a company as well as to outsiders such as lenders and investors.',
  sol: 'Management uses it for planning and control, while lenders, investors, suppliers and the government use it for their own decisions.',
}));

Q('fb_horizontal', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'Studying how each item of the financial statements has moved from one year to the next is called ___ analysis.',
  acc: [['horizontal', 'dynamic']],
  sol: 'Horizontal (dynamic) analysis follows each item over time; comparative statements are its usual tool.',
}));

const MT_TOOLS = [
  ['Comparative statements', 'Show each item for two or more years with its absolute and percentage change'],
  ['Common-size statements', 'Show each item as a percentage of a common base of the same year'],
  ['Ratio analysis', 'Relates one item to another, such as current assets to current liabilities'],
  ['Cash flow statement', 'Explains the inflows and outflows of cash and cash equivalents during a period'],
];
Q('mt_tools', match({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Match each tool of financial analysis in column A with what it does in column B.',
  pairs: MT_TOOLS,
  sol: 'Change over years, share of a base, the relation between two items, and the movement of cash are the four ideas behind the four tools.',
}));

Q('mt_purpose', match({
  t: 1, d: 3, c: 'application', marks: 2,
  stem: 'Four people are studying the statements of an imagined company, Shivnath Rice Mills Ltd. Match the question each one is asking (column A) with the purpose of analysis it serves (column B).',
  pairs: [
    ['A paddy supplier: "Will my bills be paid within sixty days?"', 'Judging short-term solvency'],
    ['A debenture holder: "Will interest keep coming for the next eight years?"', 'Judging long-term solvency'],
    ['A shareholder: "Is the company earning more on every rupee of sales than before?"', 'Judging profitability and earning capacity'],
    ['The managing director: "Are we doing better or worse than other rice mills?"', 'Inter-firm comparison of performance'],
  ],
  sol: 'Each question names a period or a comparison: weeks point to liquidity, years to solvency, margins to profitability, and other mills to comparison between firms.',
}));

Q('s3_objectives', short({
  t: 1, d: 2, c: 'understanding', marks: 3,
  stem: 'State any three objectives of analysing the financial statements of a company.',
  model: "1. **To judge profitability and earning capacity:** whether the company earns an adequate profit on its revenue and on the funds employed, and whether that profit is likely to continue.\n2. **To assess solvency:** short-term (can current liabilities be met from current assets?) and long-term (can interest be paid and loans repaid?).\n3. **To make comparisons:** with the company's own earlier years (intra-firm) and with other firms in the industry (inter-firm), so that strengths and weak spots stand out.\n4. *(Also accepted)* To find the reasons for changes in profit or financial position; to judge how efficiently management has used the resources; to help forecast future results and plan.",
  sol: 'Any three distinct objectives, each with a line on what the analyst learns.',
  scheme: [['First objective explained', 1], ['Second objective explained', 1], ['Third objective explained', 1]],
}));

Q('s3_limits_case', short({
  t: 1, d: 3, c: 'application', marks: 3,
  stem: 'Ritu, a junior analyst, has prepared comparative and common-size statements of an imagined company, Pranhita Pulses Ltd, and tells her manager, "The numbers say it all; we need nothing else to recommend the shares." State three limitations of financial analysis that her manager should point out to her.',
  model: "- **It works on past figures.** The statements she analysed describe last year; an investment decision depends on future results, which have to be judged separately.\n- **Price changes are ignored.** Rupee figures of different years are compared as they stand, so part of any growth may be inflation, and assets bought long ago appear at old costs.\n- **Non-money factors are left out.** The quality of management, labour relations or a new competitor do not appear in the statements, though they can change the outlook of a pulse processor completely.\n- *(Also accepted)* The figures depend on accounting policies and estimates, and may be window-dressed; analysis shows symptoms, not causes, and still needs the analyst's judgement.",
  sol: 'Three limitations, each tied to why the numbers cannot be the whole basis for the recommendation.',
  scheme: [['First limitation explained', 1], ['Second limitation explained', 1], ['Third limitation explained', 1]],
}));

Q('s3_users_case', short({
  t: 1, d: 3, c: 'application', marks: 3,
  stem: 'An imagined company, Hasdeo Paper Board Ltd, Korba, is studied by (i) its finance manager, (ii) a trade union negotiating wages, and (iii) a supplier of wood pulp who gives ninety days of credit. Explain how financial analysis is significant to each of them.',
  model: "- **(i) Finance manager:** uses the analysis to see which costs are rising faster than revenue, whether the capital structure is sound and where funds are tied up, and so plans borrowing, cost control and investment.\n- **(ii) Trade union:** studies the trend of profit and of employee benefits expense as a share of revenue to argue what wage rise or bonus the company can afford, and judges how secure the jobs are.\n- **(iii) Wood pulp supplier:** looks at short-term solvency, current assets against current liabilities and the cash position, to decide whether the ninety days of credit is safe and how much to supply.",
  sol: 'For each party, name the decision first and then the part of the analysis that serves it.',
  scheme: [['Finance manager', 1], ['Trade union', 1], ['Supplier (short-term creditor)', 1]],
}));

Q('s3_hv', short({
  t: 1, d: 2, c: 'understanding', marks: 3,
  stem: 'Distinguish between horizontal analysis and vertical analysis of financial statements on any three bases.',
  model: md(['Basis', 'Horizontal analysis', 'Vertical analysis'], [
    ['Period covered', 'Two or more years of the same firm', 'One year (or one statement) at a time'],
    ['What is compared', 'The same item across years: absolute and percentage change', 'Each item with a base of the same year, such as revenue from operations or the balance sheet total'],
    ['Usual tool', 'Comparative statements', 'Common-size statements'],
    ['Also called', 'Dynamic analysis', 'Static analysis'],
  ]),
  sol: 'Three bases, each stated for both kinds of analysis.',
  scheme: [['First basis, both sides', 1], ['Second basis, both sides', 1], ['Third basis, both sides', 1]],
}));

Q('l4_tools', long({
  t: 1, d: 2, c: 'understanding', marks: 4,
  stem: 'Name and briefly explain the four tools commonly used to analyse the financial statements of a company.',
  model: "1. **Comparative statements:** the statement of profit and loss or the balance sheet of two or more years placed side by side, with the absolute change in each item and the change as a percentage of the earlier year. They show the direction and size of change (horizontal analysis).\n2. **Common-size statements:** every item of a statement expressed as a percentage of a common base, revenue from operations for the statement of profit and loss and the balance sheet total for the balance sheet. They show the make-up of a statement and let firms of different sizes be compared (vertical analysis).\n3. **Ratio analysis:** relationships between two related figures, such as current assets to current liabilities or profit to revenue, used to judge liquidity, solvency, activity and profitability.\n4. **Cash flow statement:** a statement of the inflows and outflows of cash and cash equivalents from operating, investing and financing activities, showing where cash came from and how it was used.",
  sol: 'Four tools, each with what it shows; a definition without its purpose earns half the mark.',
  scheme: [['Comparative statements', 1], ['Common-size statements', 1], ['Ratio analysis', 1], ['Cash flow statement', 1]],
}));

Q('l6_theory', long({
  t: 1, d: 2, c: 'understanding', marks: 6,
  stem: '(a) What is meant by analysis of financial statements? (b) Explain any three objectives of such analysis. (c) State any two of its limitations.',
  model: "**(a) Meaning.** Analysis of financial statements is the systematic study of the balance sheet and the statement of profit and loss of an enterprise, in which related items are grouped, compared over time or with other firms, and set against each other, so as to judge its profitability, solvency and efficiency and to support decisions.\n\n**(b) Objectives (any three).**\n1. To assess the earning capacity: how much profit is earned on revenue and on capital, and how it is changing.\n2. To judge solvency: the ability to meet short-term obligations and to service and repay long-term debt.\n3. To compare performance with earlier years and with similar firms, to locate strengths and weaknesses.\n4. *(Also accepted)* To understand why profit or the financial position changed; to forecast and plan; to judge the efficiency of management.\n\n**(c) Limitations (any two).**\n- Analysis rests on historical, unadjusted figures, so changes in the price level distort comparisons between years.\n- Qualitative factors are ignored, and different accounting policies or window dressing can make the figures, and so the analysis, misleading.",
  sol: 'Give the meaning in one or two sentences, three objectives with explanation and two limitations.',
  scheme: [['Meaning', 1], ['Three objectives, 1 mark each', 3], ['Two limitations, 1 mark each', 2]],
}));

// ================================================================ t02 Comparative statements
Q('m_pct_base', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'In a comparative statement, the percentage change in an item is calculated on',
  opts: ["the amount of the earlier (base) year", "the amount of the current year", 'the total of the balance sheet', 'revenue from operations of the current year'],
  sol: 'Percentage change = absolute change ÷ earlier-year amount × 100, so the earlier year is the base.',
}));

const TR = { py: 240000, cy: 300000 };
const TRh = hundredths(TR.cy - TR.py, TR.py);
check(TRh === 2500, 'TR');
Q('m_pct_calc', mcq({
  t: 2, d: 2, c: 'application',
  stem: `Trade receivables of an imagined company, Mula Seeds Ltd, were ${rs(TR.py)} on 31 March 2025 and ${rs(TR.cy)} on 31 March 2026. In its comparative balance sheet, the percentage change in trade receivables is`,
  opts: [pcs(TRh), pcs(hundredths(TR.cy - TR.py, TR.cy)), pcs(hundredths(TR.cy, TR.py)), pcs(hundredths(TR.py, TR.cy))],
  sol: `Change = ${fig(TR.cy)} − ${fig(TR.py)} = ${fig(TR.cy - TR.py)}; ${fig(TR.cy - TR.py)} ÷ ${fig(TR.py)} × 100 = ${pcs(TRh)}. Dividing by the later figure is the usual slip.`,
}));

const OI = { py: 160000, cy: 120000 };
const OIh = hundredths(OI.cy - OI.py, OI.py);
check(OIh === -2500, 'OI');
Q('m_pct_decrease', mcq({
  t: 2, d: 2, c: 'application',
  stem: `Other income of an imagined company, Koyna Plastics Ltd, was ${rs(OI.py)} in ${Y[0]} and ${rs(OI.cy)} in ${Y[1]}. In the comparative statement of profit and loss, the absolute and percentage change are shown as`,
  opts: [
    `${fig(OI.cy - OI.py)} and (${pc(-OIh)}), a decrease`,
    `${fig(OI.py - OI.cy)} and ${pc(-OIh)}, an increase`,
    `${fig(OI.cy - OI.py)} and (${pc(-hundredths(OI.cy - OI.py, OI.cy))}), a decrease`,
    `${fig(OI.py - OI.cy)} and ${pc(-hundredths(OI.cy - OI.py, OI.cy))}, an increase`,
  ],
  sol: `Change = ${fig(OI.cy)} − ${fig(OI.py)} = −${fig(OI.py - OI.cy)}, and −${fig(OI.py - OI.cy)} ÷ ${fig(OI.py)} × 100 = ${pcs(OIh)}. A fall is shown in brackets (or with a minus sign), and the base is still the earlier year.`,
}));

Q('m_pbt_growth', mcq({
  t: 2, d: 4, c: 'analysis',
  stem: "The comparative statement of profit and loss of an imagined company shows that revenue from operations rose by 20% while total expenses rose by 28%. The company has no other income and earned a profit in both years. Its profit before tax has therefore",
  opts: [
    'grown by less than 20%, and may even have fallen',
    'grown by exactly 20%',
    'grown by more than 28%',
    'grown by 8%, the difference between the two rates',
  ],
  sol: 'Profit is what is left of revenue after expenses. When expenses grow faster than revenue, the leftover grows more slowly than revenue, and if the expense base is large it can shrink; subtracting one growth rate from the other is not a valid shortcut.',
}));

Q('m_cbs_total', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'In a comparative balance sheet, the absolute change in total equity and liabilities between the two dates is always equal to',
  opts: ['the absolute change in total assets', 'the absolute change in share capital', 'the profit after tax of the later year', 'the absolute change in current assets'],
  sol: 'Both parts total the same on each date, so the difference between the two dates must also be the same for both parts.',
}));

Q('ar_horizontal', ar({
  t: 2, d: 2, c: 'understanding', key: 'a',
  a: 'Comparative statements are a tool of horizontal analysis.',
  r: 'A comparative statement places the figures of the same item for different periods side by side and works out the change.',
  sol: 'Both are true; following one item across periods is what makes the analysis horizontal, so R explains A.',
}));

Q('ar_pct_base', ar({
  t: 2, d: 3, c: 'analysis', key: 'd',
  a: 'A 50% increase in an item in a comparative statement always means a large increase in rupees.',
  r: 'The percentage change in a comparative statement is worked out on the amount of the earlier year.',
  sol: 'A is false: on a small earlier figure, a big percentage can be only a few thousand rupees, so the absolute change must be read too. R is true.',
}));

Q('tf_bracket', tf({
  t: 2, d: 1, c: 'understanding', ans: true,
  stem: 'True or false? In a comparative statement, when an item falls from one year to the next, both its absolute change and its percentage change are negative.',
  sol: 'A fall gives a negative change in rupees, and a negative amount divided by a positive earlier figure is a negative percentage; both are shown in brackets or with a minus sign.',
}));

Q('fb_base', fb({
  t: 2, d: 2, c: 'understanding',
  stem: 'Percentage change in a comparative statement = absolute change ÷ amount of the ___ year × 100.',
  acc: [['previous', 'earlier', 'base', 'preceding']],
  sol: 'The change is divided by the previous (base) year figure.',
}));

const NREV = { py: 4800000, cy: 5760000 };
const NREVh = hundredths(NREV.cy - NREV.py, NREV.py);
check(NREVh === 2000, 'NREV');
Q('n_rev_pct', num({
  t: 2, d: 2, c: 'application', marks: 2, value: pcv(NREVh), unit: '%',
  stem: `Revenue from operations of an imagined company, Ib Valley Minerals Ltd, was ${rs(NREV.py)} in ${Y[0]} and ${rs(NREV.cy)} in ${Y[1]}. Find the percentage change to be shown in its comparative statement of profit and loss.`,
  sol: `Absolute change = ${fig(NREV.cy)} − ${fig(NREV.py)} = ${fig(NREV.cy - NREV.py)}; percentage change = ${fig(NREV.cy - NREV.py)} ÷ ${fig(NREV.py)} × 100 = ${pc(NREVh)}%.`,
  scheme: [['Absolute change', 1], [`Percentage change ${pcs(NREVh)}`, 1]],
}));

const NPAT = plStatement({ cols: Y, taxRate: 30, v: { rev: [3000000, 3600000], oth: [1800000, 2100000] } });
const NPATc = comparative(NPAT);
check(NPAT.val('pbt')[0] === 1200000 && NPAT.val('pbt')[1] === 1500000 && NPAT.val('pat')[0] === 840000 && NPAT.val('pat')[1] === 1050000 && NPATc.ch.pat.abs === 210000, 'NPAT');
Q('n_pat_change', num({
  t: 2, d: 3, c: 'application', marks: 2, value: NPATc.ch.pat.abs, unit: '₹',
  stem: `An imagined company, Dhansiri Bamboo Works Ltd, had profit before tax of ${rs(NPAT.val('pbt')[0])} in ${Y[0]} and ${rs(NPAT.val('pbt')[1])} in ${Y[1]}. Tax is 30% of profit before tax in both years. Find the absolute change in profit after tax that its comparative statement of profit and loss will show (in ₹).`,
  sol: `Profit after tax: ${fig(NPAT.val('pbt')[0])} − ${fig(NPAT.val('tax')[0])} = ${fig(NPAT.val('pat')[0])} and ${fig(NPAT.val('pbt')[1])} − ${fig(NPAT.val('tax')[1])} = ${fig(NPAT.val('pat')[1])}; change = ${fig(NPAT.val('pat')[1])} − ${fig(NPAT.val('pat')[0])} = ${fig(NPATc.ch.pat.abs)}, that is ₹${fig(NPATc.ch.pat.abs)}.`,
  scheme: [['Profit after tax of both years', 1], [`Change ${rs(NPATc.ch.pat.abs)}`, 1]],
}));

const NINV = { py: 360000, cy: 420000 };
const NINVh = hundredths(NINV.cy - NINV.py, NINV.py);
check(NINVh === 1667, 'NINV');
Q('n_inv_round', num({
  t: 2, d: 3, c: 'application', marks: 2, value: pcv(NINVh), unit: '%', tol: 0.01,
  stem: `Inventories of an imagined company, Sharda Cables Ltd, rose from ${rs(NINV.py)} on 31 March 2025 to ${rs(NINV.cy)} on 31 March 2026. Find the percentage change for its comparative balance sheet, rounded to two decimal places.`,
  sol: `Change = ${fig(NINV.cy - NINV.py)}; ${fig(NINV.cy - NINV.py)} ÷ ${fig(NINV.py)} × 100 = 16.666…, which rounds to ${pc(NINVh)}%.`,
  scheme: [['Change divided by the earlier year', 1], [`${pcs(NINVh)} (two decimals)`, 1]],
}));

const NBACK = { cy: 630000, rate: 26 };
const NBACKpy = (NBACK.cy * 100) / (100 + NBACK.rate);
check(NBACKpy === 500000 && hundredths(NBACK.cy - NBACKpy, NBACKpy) === NBACK.rate * 100, 'NBACK');
Q('n_back_py', num({
  t: 2, d: 4, c: 'analysis', marks: 2, value: NBACKpy, unit: '₹',
  stem: `The comparative statement of profit and loss of an imagined company, Nagavali Cashew Ltd, shows employee benefits expense of ${rs(NBACK.cy)} for ${Y[1]} and a percentage change of ${NBACK.rate}.00 over ${Y[0]}. What was the employee benefits expense in ${Y[0]} (in ₹)?`,
  sol: `The ${Y[1]} figure is ${100 + NBACK.rate}% of the ${Y[0]} figure, so ${Y[0]} expense = ${fig(NBACK.cy)} × 100 ÷ ${100 + NBACK.rate} = ${fig(NBACKpy)}, that is ₹${fig(NBACKpy)}. Check: ${fig(NBACK.cy - NBACKpy)} ÷ ${fig(NBACKpy)} × 100 = ${NBACK.rate}%.`,
  scheme: [[`Current year = ${100 + NBACK.rate}% of the earlier year`, 1], [`Earlier year ${rs(NBACKpy)}`, 1]],
}));

// ---------------------------------------------------------------- comparative statements (short and long)
// Kalindi Pickles: expenses given as percentages of revenue.
const KP_REV = [3000000, 4000000];
const KP_COM = [55, 60];
const KP_OTH = [10, 11];
const KP = plStatement({ cols: Y, taxRate: 30, v: { rev: KP_REV, oi: [100000, 120000], com: KP_REV.map((r, i) => pctOf(KP_COM[i], r)), oth: KP_REV.map((r, i) => pctOf(KP_OTH[i], r)) } });
const KPc = comparative(KP);
check(KP.val('pat')[0] === 805000 && KP.val('pat')[1] === 896000 && KPc.ch.rev.h === 3333 && KPc.ch.te.h === 4564 && KPc.ch.pat.h === 1130, 'Kalindi');
Q('s3_cpl_kalindi', short({
  t: 2, d: 3, c: 'application', marks: 3,
  stem: `Kalindi Pickles Ltd, an imagined company in Mathura, earned revenue from operations of ${rs(KP_REV[0])} in ${Y[0]} and ${rs(KP_REV[1])} in ${Y[1]}, and other income of ${rs(KP.val('oi')[0])} and ${rs(KP.val('oi')[1])}. Cost of materials consumed was ${KP_COM[0]}% of revenue from operations in the first year and ${KP_COM[1]}% in the second; other expenses were ${KP_OTH[0]}% and ${KP_OTH[1]}%. Tax is 30% of profit before tax. Prepare a Comparative Statement of Profit and Loss.`,
  model: `**Comparative Statement of Profit and Loss of Kalindi Pickles Ltd for the years ended 31 March 2025 and 31 March 2026**\n\n${KPc.md}\n\nWorking: materials ${KP_COM[0]}% of ${fig(KP_REV[0])} = ${fig(KP.val('com')[0])} and ${KP_COM[1]}% of ${fig(KP_REV[1])} = ${fig(KP.val('com')[1])}; other expenses ${fig(KP.val('oth')[0])} and ${fig(KP.val('oth')[1])}. Percentage change = absolute change ÷ ${Y[0]} amount × 100. ${RULE}`,
  sol: 'Turn the percentages into rupees first, finish both columns, then work out each change on the first-year figure.',
  scheme: [['Expenses converted to rupees and both columns completed', 1], ['Absolute changes', 1], [`Percentage changes (profit after tax ${pcs(KPc.ch.pat.h)})`, 1]],
}));

// Tons Fruit Products: small comparative balance sheet.
const TF = bsStatement({ cols: D, v: { sc: [1000000, 1200000], ltb: [400000, 600000], tp: [200000, 240000], ppe: [1000000, 1300000], inv: [400000, 500000], cce: [200000, 240000] } });
const TFc = comparative(TF);
check(TF.part.el[0] === 1600000 && TF.part.el[1] === 2040000 && TFc.ch.elT.h === 2750 && TFc.ch.ltb.h === 5000, 'Tons');
Q('s3_cbs_tons', short({
  t: 2, d: 3, c: 'application', marks: 3,
  stem: `Tons Fruit Products Ltd, an imagined company in Dehradun, presents its balance sheets as at ${D[0]} and ${D[1]} below. Prepare a Comparative Balance Sheet.\n\n${twoCol(TF)}`,
  model: `**Comparative Balance Sheet of Tons Fruit Products Ltd as at ${D[0]} and ${D[1]}**\n\n${TFc.md}\n\nPercentage change = absolute change ÷ amount on ${D[0]} × 100. Both totals rise by ${rs(TFc.ch.elT.abs)} (${pcs(TFc.ch.elT.h)}).`,
  sol: 'Keep the Schedule III order, then add the two change columns line by line; the two totals must change by the same amount.',
  scheme: [['Format with both years', 1], ['Absolute changes', 1], ['Percentage changes', 1]],
}));

// Girna Plastics: the comparative statement is given; interpret it.
const GP = plStatement({ cols: Y, taxRate: 25, v: { rev: [4000000, 4600000], com: [2200000, 2750000], emp: [600000, 660000], fin: [80000, 160000], oth: [320000, 352000] } });
const GPc = comparative(GP);
check(GPc.ch.rev.h === 1500 && GPc.ch.com.h === 2500 && GPc.ch.fin.h === 10000 && GPc.ch.pbt.h === -1525 && GPc.ch.pat.abs === -91500 && GPc.ch.te.h === 2256 && GPc.ch.emp.h === GPc.ch.oth.h, 'Girna');
Q('s3_interpret_girna', short({
  t: 2, d: 4, c: 'analysis', marks: 3,
  stem: `The comparative statement of profit and loss of Girna Plastics Ltd, an imagined company in Jalgaon, is given below. Comment on any three significant changes and on what they mean for the company.\n\n${md(['Item', ...GPc.headers.slice(1)], GPc.rows, [1, 2, 3, 4])}`,
  model: `- **Sales grew, but materials grew faster.** Revenue from operations rose by ${pcs(GPc.ch.rev.h)} while cost of materials consumed rose by ${pcs(GPc.ch.com.h)}; each rupee of sales now carries more material cost, which suggests higher raw-material prices or more wastage.\n- **Finance costs doubled.** They rose by ${pcs(GPc.ch.fin.h)} (${rs(GPc.ch.fin.abs)}), which points to more borrowing or a higher interest rate; the borrowed funds have not yet produced matching revenue.\n- **Profit fell despite higher sales.** Total expenses rose by ${pcs(GPc.ch.te.h)}, faster than revenue, so profit before tax fell by ${pc(-GPc.ch.pbt.h)}% and profit after tax by ${rs(-GPc.ch.pat.abs)}.\n- *(Also accepted)* Employee benefits and other expenses each grew by ${pcs(GPc.ch.emp.h)}, slower than revenue, which shows some control over those costs.\n\nOverall, the company should control material costs and review its borrowing.`,
  sol: 'Pick changes that explain the fall in profit, and say what each one suggests.',
  scheme: [['First change interpreted', 1], ['Second change interpreted', 1], ['Third change interpreted', 1]],
}));

// Hemavati Silk Mills: full comparative statement of profit and loss (4 marks).
const HS = plStatement({ cols: Y, taxRate: 40, v: { rev: [6000000, 7200000], oi: [300000, 240000], com: [3000000, 3960000], emp: [900000, 1080000], fin: [150000, 120000], dep: [300000, 360000], oth: [450000, 540000] } });
const HSc = comparative(HS);
check(HS.val('pbt')[0] === 1500000 && HS.val('pbt')[1] === 1380000 && HS.val('pat')[1] === 828000 && HSc.ch.pat.h === -800 && HSc.ch.te.h === 2625 && HSc.ch.ti.h === 1810, 'Hemavati');
const HS_ROWS = [['Revenue from operations', ...HS.val('rev')], ['Other income', ...HS.val('oi')], ['Cost of materials consumed', ...HS.val('com')], ['Employee benefits expense', ...HS.val('emp')], ['Finance costs', ...HS.val('fin')], ['Depreciation and amortisation expense', ...HS.val('dep')], ['Other expenses', ...HS.val('oth')]];
Q('l4_cpl_hemavati', long({
  t: 2, d: 3, c: 'application', marks: 4,
  stem: `From the following information of Hemavati Silk Mills Ltd, an imagined company in Hassan, prepare a Comparative Statement of Profit and Loss for the years ${Y[0]} and ${Y[1]}. Income tax is charged at 40% of profit before tax.\n\n${given2(HS_ROWS)}`,
  model: `**Comparative Statement of Profit and Loss of Hemavati Silk Mills Ltd for the years ended 31 March 2025 and 31 March 2026**\n\n${HSc.md}\n\n${RULE} Revenue from operations rose by ${pcs(HSc.ch.rev.h)}, but total expenses rose by ${pcs(HSc.ch.te.h)}, so profit after tax fell by ${pc(-HSc.ch.pat.h)}%.`,
  sol: 'Complete both years first (total income, total expenses, profit before tax, tax, profit after tax), then the change columns.',
  scheme: [['Total income and total expenses of both years', 1], ['Profit before tax, tax and profit after tax', 1], ['Absolute changes', 1], ['Percentage changes', 1]],
}));

// Purna Pulses: complete the statement from the earlier year and the percentage changes.
const PU_PY = { rev: 8000000, oi: 200000, com: 4800000, emp: 800000, fin: 200000, dep: 400000, oth: 600000 };
const PU_PCT = { rev: 25, oi: -50, com: 30, emp: 10, fin: 0, dep: 25, oth: 20 };
const PU = plStatement({ cols: Y, taxRate: 25, v: Object.fromEntries(Object.entries(PU_PY).map(([k, a]) => [k, [a, a + pctOf(PU_PCT[k], a)]])) });
const PUc = comparative(PU);
for (const k of Object.keys(PU_PCT)) check(PUc.ch[k].h === PU_PCT[k] * 100, `Purna ${k}`);
check(PU.val('pat')[0] === 1050000 && PU.val('pat')[1] === 1170000 && PUc.ch.pat.h === 1143, 'Purna');
const PU_LAB = { rev: 'Revenue from operations', oi: 'Other income', com: 'Cost of materials consumed', emp: 'Employee benefits expense', fin: 'Finance costs', dep: 'Depreciation and amortisation expense', oth: 'Other expenses' };
Q('l4_cpl_purna', long({
  t: 2, d: 4, c: 'analysis', marks: 4,
  stem: `For Purna Pulses Ltd, an imagined company in Akola, the ${Y[0]} figures and the percentage change in each item in ${Y[1]} are given below. Tax is 25% of profit before tax in both years. Prepare the Comparative Statement of Profit and Loss, working out the ${Y[1]} figures yourself.\n\n${md(['Particulars', `${Y[0]} (₹)`, `Change in ${Y[1]} (%)`], Object.keys(PU_PY).map((k) => [PU_LAB[k], fig(PU_PY[k]), PU_PCT[k] > 0 ? `+${PU_PCT[k]}` : PU_PCT[k] < 0 ? `−${-PU_PCT[k]}` : 'no change']), [1, 2])}`,
  model: `${Y[1]} figure = ${Y[0]} figure + the stated percentage of it; for example revenue ${fig(PU_PY.rev)} + 25% = ${fig(PU.val('rev')[1])}, other income ${fig(PU_PY.oi)} − 50% = ${fig(PU.val('oi')[1])}.\n\n**Comparative Statement of Profit and Loss of Purna Pulses Ltd for the years ended 31 March 2025 and 31 March 2026**\n\n${PUc.md}\n\nProfit after tax rises by only ${pcs(PUc.ch.pat.h)} although revenue rises by ${pcs(PUc.ch.rev.h)}, because materials rise by ${pcs(PUc.ch.com.h)} and other income halves. ${RULE}`,
  sol: 'Rebuild the second year item by item from the percentages, then derive the totals; the changes of the derived lines must be calculated, not assumed.',
  scheme: [[`${Y[1]} items rebuilt from the percentages`, 1], ['Totals, profit before tax, tax and profit after tax for both years', 1], ['Absolute changes', 1], [`Percentage changes of the derived lines (profit after tax ${pcs(PUc.ch.pat.h)})`, 1]],
}));

// Betwa Cement: comparative balance sheet (4 marks).
const BC = bsStatement({ cols: D, v: { sc: [3000000, 3600000], rs: [600000, 450000], ltb: [1200000, 1800000], tp: [600000, 750000], ppe: [3600000, 4500000], inv: [900000, 1080000], tr: [600000, 660000], cce: [300000, 360000] } });
const BCc = comparative(BC);
check(BC.part.as[1] === 6600000 && BCc.ch.elT.h === 2222 && BCc.ch.rs.h === -2500 && BCc.ch.tr.h === 1000, 'Betwa');
Q('l4_cbs_betwa', long({
  t: 2, d: 3, c: 'application', marks: 4,
  stem: `Prepare a Comparative Balance Sheet of Betwa Cement Ltd, an imagined company in Jhansi, from its balance sheets given below.\n\n${twoCol(BC)}`,
  model: `**Comparative Balance Sheet of Betwa Cement Ltd as at ${D[0]} and ${D[1]}**\n\n${BCc.md}\n\n${RULE} The total rises by ${rs(BCc.ch.elT.abs)}, that is ${pcs(BCc.ch.elT.h)}; the fall in reserves and surplus (${pcs(BCc.ch.rs.h)}) is shown in brackets.`,
  sol: 'Copy both years in Schedule III order, compute each change on the first date, and confirm the two totals change by the same amount.',
  scheme: [['Equity and liabilities part with changes', 1.5], ['Assets part with changes', 1.5], ['Totals and their changes', 1]],
}));

// Teesta Packaging: comparative balance sheet with interpretation (6 marks).
const TP = bsStatement({ cols: D, v: { sc: [4000000, 5000000], rs: [800000, 1200000], ltb: [1600000, 1200000], ltp: [200000, 250000], tp: [600000, 750000], ocl: [100000, 150000], stp: [300000, 360000], ppe: [4400000, 5500000], intang: [400000, 300000], nci: [600000, 600000], inv: [1000000, 1200000], tr: [800000, 900000], cce: [400000, 410000] } });
const TPc = comparative(TP);
check(TP.part.el[0] === 7600000 && TP.part.el[1] === 8910000 && TPc.ch.elT.h === 1724 && TPc.ch.ltb.h === -2500 && TPc.ch.cce.h === 250 && TPc.ch.nci.h === 0, 'Teesta');
const TP_SF = TP.head.sf;
const TP_SFh = hundredths(TP_SF[1] - TP_SF[0], TP_SF[0]);
check(TP_SF[0] === 4800000 && TP_SF[1] === 6200000 && TP_SFh === 2917, 'Teesta shareholders funds');
Q('l6_cbs_teesta', long({
  t: 2, d: 4, c: 'application', marks: 6,
  stem: `The balance sheets of Teesta Packaging Ltd, an imagined company in Jalpaiguri, are given below.\n\n${twoCol(TP)}\n\n(a) Prepare a Comparative Balance Sheet.\n(b) Give two observations on how the company financed its growth during the year.`,
  model: `**(a) Comparative Balance Sheet of Teesta Packaging Ltd as at ${D[0]} and ${D[1]}**\n\n${TPc.md}\n\n${RULE}\n\n**(b) Observations**\n- The company grew by ${pcs(TPc.ch.elT.h)}. Owners provided the money: share capital rose by ${rs(TPc.ch.sc.abs)} and reserves by ${rs(TPc.ch.rs.abs)}, so shareholders' funds rose from ${rs(TP_SF[0])} to ${rs(TP_SF[1])} (${pcs(TP_SFh)}), while long-term borrowings were cut by ${rs(-TPc.ch.ltb.abs)} (${pcs(TPc.ch.ltb.h)}). The company now depends less on debt.\n- The fresh long-term funds went mainly into property, plant and equipment (up ${rs(TPc.ch.ppe.abs)}, ${pcs(TPc.ch.ppe.h)}). Current assets rose by ${rs(TPc.ch.inv.abs + TPc.ch.tr.abs + TPc.ch.cce.abs)} against a rise of ${rs(TPc.ch.tp.abs + TPc.ch.ocl.abs + TPc.ch.stp.abs)} in current liabilities, but cash grew only ${pcs(TPc.ch.cce.h)}, so liquidity should be watched.`,
  sol: 'After the statement, read the sources (equity, borrowings) against the uses (fixed and current assets).',
  scheme: [['Equity and liabilities part with both change columns', 2], ['Assets part with both change columns', 2], ['Two observations on financing, 1 mark each', 2]],
}));

// Subarnarekha Steel Wires: comparative statement of profit and loss with interpretation (6 marks).
const SW = plStatement({ cols: Y, taxRate: 30, v: { rev: [12000000, 15000000], oi: [400000, 500000], com: [6600000, 8100000], emp: [1440000, 1620000], fin: [300000, 450000], dep: [600000, 720000], oth: [960000, 1080000] } });
const SWc = comparative(SW);
check(SW.val('pbt')[0] === 2500000 && SW.val('pbt')[1] === 3530000 && SW.val('pat')[1] === 2471000 && SWc.ch.pat.h === 4120 && SWc.ch.te.h === 2091 && SWc.ch.com.h === 2273 && SWc.ch.emp.h === SWc.ch.oth.h && SWc.ch.pbt.h === SWc.ch.pat.h, 'Subarnarekha');
const SW_ROWS = [['Revenue from operations', ...SW.val('rev')], ['Other income', ...SW.val('oi')], ['Cost of materials consumed', ...SW.val('com')], ['Employee benefits expense', ...SW.val('emp')], ['Finance costs', ...SW.val('fin')], ['Depreciation and amortisation expense', ...SW.val('dep')], ['Other expenses', ...SW.val('oth')]];
Q('l6_cpl_subarnarekha', long({
  t: 2, d: 4, c: 'analysis', marks: 6,
  stem: `Subarnarekha Steel Wires Ltd is an imagined company in Jamshedpur; tax is 30% of profit before tax.\n\n${given2(SW_ROWS)}\n\n(a) Prepare a Comparative Statement of Profit and Loss for the two years.\n(b) Explain why profit after tax has grown much faster than revenue from operations.`,
  model: `**(a) Comparative Statement of Profit and Loss of Subarnarekha Steel Wires Ltd for the years ended 31 March 2025 and 31 March 2026**\n\n${SWc.md}\n\n${RULE}\n\n**(b)** Revenue from operations grew by ${pcs(SWc.ch.rev.h)}, but total expenses grew by only ${pcs(SWc.ch.te.h)}: materials by ${pcs(SWc.ch.com.h)}, employee benefits and other expenses by ${pcs(SWc.ch.emp.h)} each and depreciation by ${pcs(SWc.ch.dep.h)}. Several costs are partly fixed, so they did not rise in step with sales. The extra revenue of ${rs(SWc.ch.rev.abs)} therefore added much more to profit than to costs, and profit before tax and profit after tax rose by ${pcs(SWc.ch.pat.h)}. The only fast-growing cost is finance costs (${pcs(SWc.ch.fin.h)}), which is small in rupees.`,
  sol: 'Compare the growth of revenue with the growth of each cost; costs that grow more slowly than revenue widen the profit.',
  scheme: [['Both years completed (totals, profit before tax, tax, profit after tax)', 1.5], ['Absolute changes', 1], ['Percentage changes', 1.5], ['Explanation: expenses grew more slowly than revenue', 2]],
}));

// ================================================================ t03 Common-size statements
Q('m_cs_base_pl', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'In a common-size statement of profit and loss, every item is expressed as a percentage of',
  opts: ['revenue from operations', 'total income', 'profit before tax', 'total expenses'],
  sol: 'Revenue from operations is taken as 100; other income is then shown as a percentage of it too, which is why total income can exceed 100.',
}));

Q('m_cs_base_bs', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'While preparing a common-size balance sheet of an imagined company, Kumaradhara Coffee Curing Ltd, the accountant has to choose the base figure that is taken as 100. It is',
  opts: ['the total of the balance sheet (total assets, equal to total equity and liabilities)', 'share capital', 'revenue from operations of the year', 'total current assets'],
  sol: 'Each item on either side is divided by the balance sheet total, so each side adds up to 100.',
}));

const CS = { rev: 4200000, emp: 630000 };
const CSh = hundredths(CS.emp, CS.rev);
check(CSh === 1500, 'CS');
Q('m_cs_calc', mcq({
  t: 3, d: 2, c: 'application',
  stem: `An imagined bakery chain, Pambar Breads Ltd, has revenue from operations of ${rs(CS.rev)} and employee benefits expense of ${rs(CS.emp)}. In its common-size statement of profit and loss, employee benefits expense appears as`,
  opts: [`${pc(CSh)}%`, `${pc(hundredths(CS.rev, CS.emp * 10))}%`, `${pc(CSh * 2)}%`, `${pc(hundredths(CS.emp, CS.rev + CS.emp))}%`],
  sol: `${fig(CS.emp)} ÷ ${fig(CS.rev)} × 100 = ${pc(CSh)}%.`,
}));

Q('m_cs_interpret', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'In the common-size statements of profit and loss of an imagined company, cost of materials consumed is 52.00% of revenue from operations in one year and 58.00% in the next, and every other expense is the same percentage in both years. This means that',
  opts: [
    'a larger share of every rupee of revenue went on materials, so profit as a percentage of revenue fell',
    'the company bought exactly six per cent more materials in rupees',
    'revenue from operations must have fallen',
    'the profit after tax in rupees must have fallen',
  ],
  sol: 'A common-size figure is a share of revenue, not a rupee amount. Materials took six more paise of each rupee earned, so the margin narrowed; whether rupee profit fell depends on how much revenue grew.',
}));

Q('m_cs_total_income', mcq({
  t: 3, d: 3, c: 'understanding',
  stem: 'In the common-size statement of profit and loss of an imagined company, total income is shown as 103.00. The most likely reason is that',
  opts: [
    'other income of 3.00% of revenue from operations is added to revenue, which is the base of 100',
    'the accountant has made an arithmetical mistake, because no line can exceed 100',
    'expenses are deducted before total income is computed',
    'revenue from operations grew by 3% over the previous year',
  ],
  sol: 'Only revenue from operations is the base. Other income is expressed on the same base and added to it, so total income goes above 100 whenever there is other income.',
}));

Q('m_cs_interfirm', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Two imagined dairies, one with revenue of ₹40 lakh and the other with revenue of ₹1.6 crore, want to compare their cost structures. Common-size statements suit this purpose because they',
  opts: [
    'express items as percentages, which removes the effect of the difference in size',
    'show the change in each item from the previous year',
    'adjust every figure for inflation',
    'use the cash flows of both firms as the base',
  ],
  sol: 'Rupee figures of a small and a large firm are not comparable directly, but shares of revenue or of the balance sheet total are.',
}));

Q('ar_size', ar({
  t: 3, d: 2, c: 'understanding', key: 'c',
  a: 'Common-size statements make it easier to compare firms of different sizes.',
  r: 'Common-size statements show the absolute change in each item from one year to the next.',
  sol: 'A is true, because percentages of a base remove the effect of size. R is false: changes from year to year are the business of comparative statements.',
}));

Q('ar_vertical', ar({
  t: 3, d: 3, c: 'understanding', key: 'b',
  a: 'Common-size statements are a tool of vertical analysis.',
  r: 'In a common-size statement of profit and loss, other income is also expressed as a percentage of revenue from operations.',
  sol: 'Both statements are true. R describes how one line is treated; it does not explain why the method is called vertical, which is because items are related to a base within the same period.',
}));

Q('ar_share_fall', ar({
  t: 3, d: 4, c: 'analysis', key: 'd',
  a: 'If the common-size percentage of an expense falls from one year to the next, the rupee amount of that expense must also have fallen.',
  r: 'A common-size percentage depends both on the item and on the base it is divided by.',
  sol: 'A is false: if revenue grows faster than the expense, the expense can rise in rupees while its share falls. R is true, and it is the reason A fails.',
}));

Q('tf_cs_pat', tf({
  t: 3, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? In a common-size statement of profit and loss, profit after tax is expressed as a percentage of total income.',
  sol: 'Every line, profit after tax included, is a percentage of revenue from operations, not of total income.',
}));

Q('tf_cs_total', tf({
  t: 3, d: 1, c: 'understanding', ans: true,
  stem: 'True or false? In a common-size balance sheet, the equity and liabilities part and the assets part each add up to 100.',
  sol: 'Both parts are divided by the same balance sheet total, so each sums to 100.00 (after any rounding adjustment).',
}));

Q('fb_cs_bs', fb({
  t: 3, d: 2, c: 'understanding',
  stem: 'In a common-size balance sheet, each item is expressed as a percentage of the ___.',
  acc: [['balance sheet total', 'total of the balance sheet', 'total assets', 'total equity and liabilities']],
  sol: 'The base is the balance sheet total, that is total assets, which equals total equity and liabilities.',
}));

Q('fb_vertical', fb({
  t: 3, d: 1, c: 'recall',
  stem: 'Because they relate every item to a base of the same period, common-size statements are said to be a tool of ___ analysis.',
  acc: [['vertical', 'static']],
  sol: 'They are a tool of vertical (static) analysis.',
}));

Q('mt_base', match({
  t: [2, 3], d: 2, c: 'understanding', marks: 2,
  stem: 'Match each figure in column A with the amount it is calculated from or divided by in column B.',
  pairs: [
    ['Percentage change in a comparative statement', 'The amount of the earlier year'],
    ['Common-size percentage in a statement of profit and loss', 'Revenue from operations of the same year'],
    ['Common-size percentage in a balance sheet', 'The balance sheet total of the same date'],
    ['Absolute change in a comparative statement', 'Current-year amount minus earlier-year amount'],
  ],
  sol: 'Comparative statements work across years with the earlier year as base; common-size statements work within a year with revenue or the balance sheet total as base.',
}));

const NOTH = { rev: 1800000, oth: 315000 };
const NOTHh = hundredths(NOTH.oth, NOTH.rev);
check(NOTHh === 1750, 'NOTH');
Q('n_cs_pl', num({
  t: 3, d: 2, c: 'application', marks: 2, value: pcv(NOTHh), unit: '%',
  stem: `An imagined company, Kolab Ceramics Ltd, has revenue from operations of ${rs(NOTH.rev)} and other expenses of ${rs(NOTH.oth)} for ${Y[1]}. What percentage will other expenses show in its common-size statement of profit and loss?`,
  sol: `${fig(NOTH.oth)} ÷ ${fig(NOTH.rev)} × 100 = ${pc(NOTHh)}%.`,
  scheme: [['Divided by revenue from operations', 1], [`${pcs(NOTHh)}`, 1]],
}));

const NTR = { tot: 4800000, tr: 720000 };
const NTRh = hundredths(NTR.tr, NTR.tot);
check(NTRh === 1500, 'NTR');
Q('n_cs_bs', num({
  t: 3, d: 2, c: 'application', marks: 2, value: pcv(NTRh), unit: '%',
  stem: `On 31 March 2026 an imagined company, Sileru Castings Ltd, has a balance sheet total of ${rs(NTR.tot)}, and its trade receivables are ${rs(NTR.tr)}. Find the percentage for trade receivables in its common-size balance sheet.`,
  sol: `${fig(NTR.tr)} ÷ ${fig(NTR.tot)} × 100 = ${pc(NTRh)}%.`,
  scheme: [['Divided by the balance sheet total', 1], [`${pcs(NTRh)}`, 1]],
}));

const NM = { rev: 10000, oi: 200, exp: 7000, tax: 25 }; // in hundredths of revenue
const NMpbt = NM.rev + NM.oi - NM.exp;
const NMtax = (NMpbt * NM.tax) / 100;
const NMpat = NMpbt - NMtax;
check(NMpbt === 3200 && NMtax === 800 && NMpat === 2400, 'NM');
Q('n_cs_pat', num({
  t: 3, d: 4, c: 'analysis', marks: 2, value: pcv(NMpat), unit: '%',
  stem: `In the common-size statement of profit and loss of an imagined company, Musi Granite Ltd, other income is ${pc(NM.oi)}% and total expenses are ${pc(NM.exp)}% of revenue from operations. Tax is ${NM.tax}% of profit before tax. What percentage will profit after tax show in the statement?`,
  sol: `Profit before tax = 100 + ${pc(NM.oi)} − ${pc(NM.exp)} = ${pc(NMpbt)}; tax = ${NM.tax}% of ${pc(NMpbt)} = ${pc(NMtax)}; profit after tax = ${pc(NMpbt)} − ${pc(NMtax)} = ${pc(NMpat)}%.`,
  scheme: [[`Profit before tax ${pcs(NMpbt)}`, 1], [`Profit after tax ${pcs(NMpat)}`, 1]],
}));

const NTOT = { cash: 300000, h: 625 };
const NTOTv = (NTOT.cash * 10000) / NTOT.h;
check(NTOTv === 4800000 && hundredths(NTOT.cash, NTOTv) === NTOT.h, 'NTOT');
Q('n_cs_total', num({
  t: 3, d: 4, c: 'analysis', marks: 2, value: NTOTv, unit: '₹',
  stem: `In the common-size balance sheet of an imagined company, Lidder Cold Storage Ltd, cash and cash equivalents of ${rs(NTOT.cash)} appear as ${pc(NTOT.h)}%. What is the total of its balance sheet (in ₹)?`,
  sol: `Total = ${fig(NTOT.cash)} × 100 ÷ ${pc(NTOT.h)} = ${fig(NTOTv)}, that is ₹${fig(NTOTv)}.`,
  scheme: [['Amount ÷ percentage × 100', 1], [`Total ${rs(NTOTv)}`, 1]],
}));

// ---------------------------------------------------------------- common-size statements (short and long)
// Rihand Power Cables: short common-size statement of profit and loss.
const RP = plStatement({ cols: Y, taxRate: 50, v: { rev: [2000000, 2500000], com: [1200000, 1600000], oth: [200000, 200000] } });
const RPc = commonSize(RP);
check(RPc.p.pat[0] === 1500 && RPc.p.pat[1] === 1400 && RPc.p.com[1] === 6400 && RPc.rounded === 0, 'Rihand');
Q('s3_cspl_rihand', short({
  t: 3, d: 2, c: 'application', marks: 3,
  stem: `Rihand Power Cables Ltd, an imagined company in Sonbhadra, reports the following. Tax is 50% of profit before tax. Prepare a Common-size Statement of Profit and Loss for both years.\n\n${given2([['Revenue from operations', ...RP.val('rev')], ['Cost of materials consumed', ...RP.val('com')], ['Other expenses', ...RP.val('oth')]])}`,
  model: `**Common-size Statement of Profit and Loss of Rihand Power Cables Ltd for the years ended 31 March 2025 and 31 March 2026**\n\n${RPc.md}\n\nEach item is divided by revenue from operations of its own year and multiplied by 100.`,
  sol: 'Complete profit before tax, tax and profit after tax in rupees, then divide each line by the same year’s revenue.',
  scheme: [['Both years completed in rupees', 1], [`Percentages for ${Y[0]}`, 1], [`Percentages for ${Y[1]}`, 1]],
}));

// Manjira Seeds: short common-size balance sheet.
const MS = bsStatement({ cols: D, v: { sc: [1200000, 1500000], ltb: [500000, 500000], tp: [300000, 500000], ppe: [1400000, 1750000], inv: [400000, 500000], cce: [200000, 250000] } });
const MSc = commonSize(MS);
check(MSc.p.ltb[1] === 2000 && MSc.p.tp[1] === 2000 && MSc.p.ppe[0] === 7000 && MSc.adjusted.length === 0, 'Manjira');
Q('s3_csbs_manjira', short({
  t: 3, d: 2, c: 'application', marks: 3,
  stem: `Prepare a Common-size Balance Sheet of Manjira Seeds Ltd, an imagined company in Medak, from the following.\n\n${twoCol(MS)}`,
  model: `**Common-size Balance Sheet of Manjira Seeds Ltd as at ${D[0]} and ${D[1]}**\n\n${MSc.md}\n\nEach item is shown as a percentage of the balance sheet total of the same date (${rs(MS.part.el[0])} and ${rs(MS.part.el[1])}).`,
  sol: 'Divide every line by the total of its own date; each part of each column must come to 100.',
  scheme: [['Format with both years', 1], ['Equity and liabilities percentages', 1], ['Assets percentages', 1]],
}));

Q('s3_cmp_vs_cs', short({
  t: [2, 3], d: 2, c: 'understanding', marks: 3,
  stem: 'Differentiate between a comparative statement and a common-size statement on any three bases.',
  model: md(['Basis', 'Comparative statement', 'Common-size statement'], [
    ['Type of analysis', 'Horizontal (dynamic): across years', 'Vertical (static): within a year'],
    ['Figures shown', 'Amounts of two or more years, absolute change and percentage change', 'Amounts and each item as a percentage of a common base'],
    ['Base for percentages', 'The amount of the same item in the earlier year', 'Revenue from operations, or the balance sheet total'],
    ['Main use', 'Shows the direction and rate of change of each item', 'Shows the make-up of a statement; allows comparison of firms of different sizes'],
  ]),
  sol: 'Three bases, each contrasted for both statements.',
  scheme: [['First basis', 1], ['Second basis', 1], ['Third basis', 1]],
}));

// Alaknanda Herbal: common-size statement given; interpret it.
const AH = plStatement({ cols: Y, taxRate: 30, v: { rev: [2500000, 3000000], com: [1000000, 1350000], emp: [500000, 630000], dep: [125000, 150000], oth: [375000, 420000] } });
const AHc = commonSize(AH);
check(AHc.p.pat[0] === 1400 && AHc.p.pat[1] === 1050 && AHc.p.com[1] === 4500 && AHc.p.te[1] === 8500, 'Alaknanda');
const AHrev = hundredths(AH.val('rev')[1] - AH.val('rev')[0], AH.val('rev')[0]);
const AHpat = hundredths(AH.val('pat')[1] - AH.val('pat')[0], AH.val('pat')[0]);
check(AHrev === 2000 && AHpat === -1000, 'Alaknanda growth');
Q('s3_interpret_alaknanda', short({
  t: 3, d: 4, c: 'analysis', marks: 3,
  stem: `The common-size statement of profit and loss of Alaknanda Herbal Products Ltd, an imagined company in Srinagar (Garhwal), is given below. Revenue grew, yet profit after tax as a percentage of revenue fell. Identify the reasons and suggest one step the company could take.\n\n${md(['Item', ...AHc.headers.slice(1)], AHc.rows, [1, 2, 3, 4])}`,
  model: `- **Materials took a larger share.** Cost of materials consumed rose from ${pcs(AHc.p.com[0])} to ${pcs(AHc.p.com[1])} of revenue, the main cause: either material prices rose or the company could not pass them on in its selling prices.\n- **Employee costs also rose slightly,** from ${pcs(AHc.p.emp[0])} to ${pcs(AHc.p.emp[1])}; other expenses fell a little (${pcs(AHc.p.oth[0])} to ${pcs(AHc.p.oth[1])}) and depreciation stayed at ${pcs(AHc.p.dep[1])}.\n- **Result:** total expenses rose from ${pcs(AHc.p.te[0])} to ${pcs(AHc.p.te[1])} of revenue, so profit before tax fell from ${pcs(AHc.p.pbt[0])} to ${pcs(AHc.p.pbt[1])} and profit after tax from ${pcs(AHc.p.pat[0])} to ${pcs(AHc.p.pat[1])}. In rupees, revenue grew by ${pcs(AHrev)} but profit after tax fell by ${pc(-AHpat)}%.\n\n**Suggested step:** negotiate long-term contracts or find cheaper sources for herbs, or revise selling prices to recover the higher material cost.`,
  sol: 'Find the lines whose share of revenue moved, and link them to the fall in the profit share.',
  scheme: [['Main reason: materials share up', 1], ['Other changes and the effect on profit', 1], ['A sensible suggestion', 1]],
}));

// Ghaghara Rice Mills: common-size statement of profit and loss (4 marks).
const GR = plStatement({ cols: Y, taxRate: 20, v: { rev: [5000000, 6400000], oi: [100000, 128000], com: [3000000, 4096000], emp: [500000, 576000], dep: [250000, 288000], oth: [400000, 480000] } });
const GRc = commonSize(GR);
check(GRc.p.te[0] === 8300 && GRc.p.te[1] === 8500 && GRc.p.pat[0] === 1520 && GRc.p.pat[1] === 1360 && GRc.rounded === 0, 'Ghaghara');
Q('l4_cspl_ghaghara', long({
  t: 3, d: 3, c: 'application', marks: 4,
  stem: `Ghaghara Rice Mills Ltd, an imagined company in Bahraich, provides the following information. Tax is 20% of profit before tax. Prepare a Common-size Statement of Profit and Loss for ${Y[0]} and ${Y[1]}.\n\n${given2([['Revenue from operations', ...GR.val('rev')], ['Other income', ...GR.val('oi')], ['Cost of materials consumed', ...GR.val('com')], ['Employee benefits expense', ...GR.val('emp')], ['Depreciation and amortisation expense', ...GR.val('dep')], ['Other expenses', ...GR.val('oth')]])}`,
  model: `**Common-size Statement of Profit and Loss of Ghaghara Rice Mills Ltd for the years ended 31 March 2025 and 31 March 2026**\n\n${GRc.md}\n\nBase: revenue from operations of each year = 100. Profit after tax fell from ${pcs(GRc.p.pat[0])} to ${pcs(GRc.p.pat[1])} of revenue, mainly because materials rose from ${pcs(GRc.p.com[0])} to ${pcs(GRc.p.com[1])}.`,
  sol: 'Finish both columns in rupees, then express every line, totals included, on that year’s revenue.',
  scheme: [['Both years completed in rupees', 1], ['Income and expense percentages', 2], ['Profit before tax, tax and profit after tax percentages', 1]],
}));

// Penna Granite: common-size balance sheet with a rounding adjustment (4 marks).
const PG = bsStatement({ cols: D, v: { sc: [1500000, 1800000], rs: [450000, 600000], ltb: [600000, 720000], tp: [300000, 330000], stp: [150000, 150000], ppe: [1800000, 2160000], inv: [450000, 540000], tr: [450000, 510000], cce: [300000, 390000] } });
const PGc = commonSize(PG);
check(PGc.adjusted.length === 1 && PGc.adjusted[0].key === 'rs' && PGc.p.rs[1] === 1666 && PGc.p.tp[1] === 917 && PGc.p.tr[1] === 1417 && PGc.p.cce[1] === 1083, 'Penna');
Q('l4_csbs_penna', long({
  t: 3, d: 4, c: 'application', marks: 4,
  stem: `Prepare a Common-size Balance Sheet of Penna Granite Ltd, an imagined company in Nellore, from the balance sheets below. Round percentages to two decimal places, and make sure each part of each column totals 100.00.\n\n${twoCol(PG)}`,
  model: `**Common-size Balance Sheet of Penna Granite Ltd as at ${D[0]} and ${D[1]}**\n\n${PGc.md}\n\n${PGc.adjNote} Here reserves and surplus (exactly 16.666…%) is shown as ${pc(PGc.p.rs[1])}.`,
  sol: 'Divide each line by its own date’s total; when rounding makes a part add to 100.01 or 99.99, move the line with the largest rounding error by 0.01 and say so.',
  scheme: [['Format and the 2025 column', 1], ['2026 equity and liabilities percentages', 1], ['2026 assets percentages', 1], ['Rounding adjusted so each part totals 100.00', 1]],
}));

// Bhadra Steel Castings: evaluate a claim about rising profit.
const BH = { rev: [6000000, 9000000], pat: [900000, 1080000] };
const BHrev = hundredths(BH.rev[1] - BH.rev[0], BH.rev[0]);
const BHpat = hundredths(BH.pat[1] - BH.pat[0], BH.pat[0]);
const BHm = BH.rev.map((r, i) => hundredths(BH.pat[i], r));
check(BHrev === 5000 && BHpat === 2000 && BHm[0] === 1500 && BHm[1] === 1200 && 2 * BHpat < BHrev, 'Bhadra'); // "less than half the rate of sales"
Q('l4_evaluate_bhadra', long({
  t: [1, 2, 3], d: 4, c: 'evaluation', marks: 4,
  stem: `A director of Bhadra Steel Castings Ltd, an imagined company, tells shareholders: "Our profit after tax went up from ${rs(BH.pat[0])} to ${rs(BH.pat[1])}, so our performance has clearly improved." Revenue from operations rose from ${rs(BH.rev[0])} to ${rs(BH.rev[1])} over the same two years. Using comparative and common-size figures, evaluate the director's claim.`,
  model: `${md(['Item', `${Y[0]}`, `${Y[1]}`, 'Change'], [['Revenue from operations (₹)', fig(BH.rev[0]), fig(BH.rev[1]), pcs(BHrev)], ['Profit after tax (₹)', fig(BH.pat[0]), fig(BH.pat[1]), pcs(BHpat)], ['Profit after tax as % of revenue', pcs(BHm[0]), pcs(BHm[1]), `down ${pc(BHm[0] - BHm[1])} points`]])}\n\n- **Comparative view:** profit after tax did rise by ${rs(BH.pat[1] - BH.pat[0])} (${pcs(BHpat)}), so in rupees the claim is correct.\n- **But revenue rose much faster** (${pcs(BHrev)}). Profit grew at less than half the rate of sales.\n- **Common-size view:** profit after tax fell from ${pcs(BHm[0])} to ${pcs(BHm[1])} of revenue: each rupee of sales now earns less, so costs grew faster than sales or prices were cut to win volume.\n\n**Conclusion:** the claim is only partly true. The company is bigger and earns more in total, but its efficiency (margin) has worsened; the shareholders should ask which costs rose and whether the larger sales are worth the thinner margin.`,
  sol: 'Test the claim twice, once in rupees and once as a share of revenue, and then reach a balanced verdict.',
  scheme: [['Comparative changes in revenue and profit', 1], ['Profit as a percentage of revenue for both years', 1], ['Interpretation of the falling margin', 1], ['Balanced conclusion', 1]],
}));

// Gandak Sugar: common-size balance sheet with interpretation (6 marks).
const GS = bsStatement({ cols: D, v: { sc: [2000000, 2000000], rs: [400000, 750000], ltb: [1000000, 1500000], tp: [400000, 500000], stp: [200000, 250000], ppe: [2400000, 3250000], nci: [200000, 250000], inv: [800000, 750000], tr: [400000, 500000], cce: [200000, 250000] } });
const GSc = commonSize(GS);
const GS_SF = headShare(GSc, 'sf');
const GS_NCA = headShare(GSc, 'nca');
check(GS_SF[0] === 6000 && GS_SF[1] === 5500 && GSc.p.ltb[1] === 3000 && GS_NCA[1] === 7000 && GSc.p.inv[1] === 1500 && GSc.adjusted.length === 0, 'Gandak');
Q('l6_csbs_gandak', long({
  t: 3, d: 4, c: 'analysis', marks: 6,
  stem: `Gandak Sugar Ltd is an imagined company in Bettiah. Its balance sheets are given below.\n\n${twoCol(GS)}\n\n(a) Prepare a Common-size Balance Sheet.\n(b) Comment on the changes in the way the company is financed and in the way its funds are used.`,
  model: `**(a) Common-size Balance Sheet of Gandak Sugar Ltd as at ${D[0]} and ${D[1]}**\n\n${GSc.md}\n\n**(b) Comments**\n- **Financing:** shareholders' funds fell from ${pcs(GS_SF[0])} to ${pcs(GS_SF[1])} of the total, while long-term borrowings rose from ${pcs(GSc.p.ltb[0])} to ${pcs(GSc.p.ltb[1])}. No new shares were issued; growth was financed partly by retained profit (reserves ${pcs(GSc.p.rs[0])} to ${pcs(GSc.p.rs[1])}) and mostly by borrowing, so the company is now more dependent on debt and its interest burden will rise.\n- **Use of funds:** non-current assets rose from ${pcs(GS_NCA[0])} to ${pcs(GS_NCA[1])}, mainly property, plant and equipment (${pcs(GSc.p.ppe[0])} to ${pcs(GSc.p.ppe[1])}); the share of inventories fell from ${pcs(GSc.p.inv[0])} to ${pcs(GSc.p.inv[1])}. The long-term borrowings have been used for long-term assets, which is sound, but current assets now form a smaller share, so liquidity needs watching.`,
  sol: 'Read the top half for sources of funds and the bottom half for their uses, comparing each share across the two dates.',
  scheme: [['Equity and liabilities percentages, both years', 1.5], ['Assets percentages, both years', 1.5], ['Comment on financing', 1.5], ['Comment on use of funds', 1.5]],
}));

// Hasdeo Paper Board: common-size statement of profit and loss with interpretation (6 marks).
const HP = plStatement({ cols: Y, taxRate: 30, v: { rev: [10000000, 12000000], oi: [200000, 180000], com: [5500000, 6360000], emp: [1200000, 1320000], fin: [300000, 480000], dep: [600000, 720000], oth: [800000, 900000] } });
const HPc = commonSize(HP);
check(HPc.p.pat[0] === 1260 && HPc.p.pat[1] === 1400 && HPc.p.fin[1] === 400 && HPc.p.te[1] === 8150 && HPc.rounded === 0, 'Hasdeo');
Q('l6_cspl_hasdeo', long({
  t: 3, d: 4, c: 'analysis', marks: 6,
  stem: `From the following information of Kharun Paper Mills Ltd, an imagined company in Raipur (tax 30% of profit before tax):\n\n${given2([['Revenue from operations', ...HP.val('rev')], ['Other income', ...HP.val('oi')], ['Cost of materials consumed', ...HP.val('com')], ['Employee benefits expense', ...HP.val('emp')], ['Finance costs', ...HP.val('fin')], ['Depreciation and amortisation expense', ...HP.val('dep')], ['Other expenses', ...HP.val('oth')]])}\n\n(a) prepare a Common-size Statement of Profit and Loss for both years;\n(b) explain what it reveals about the company's costs and profitability.`,
  model: `**(a) Common-size Statement of Profit and Loss of Kharun Paper Mills Ltd for the years ended 31 March 2025 and 31 March 2026**\n\n${HPc.md}\n\n**(b) What it reveals**\n- **Profitability improved:** profit after tax rose from ${pcs(HPc.p.pat[0])} to ${pcs(HPc.p.pat[1])} of revenue, and profit before tax from ${pcs(HPc.p.pbt[0])} to ${pcs(HPc.p.pbt[1])}.\n- **Main reason:** materials fell from ${pcs(HPc.p.com[0])} to ${pcs(HPc.p.com[1])} of revenue, and employee benefits from ${pcs(HPc.p.emp[0])} to ${pcs(HPc.p.emp[1])}, showing better buying or better use of labour; other expenses also fell from ${pcs(HPc.p.oth[0])} to ${pcs(HPc.p.oth[1])}.\n- **A warning sign:** finance costs rose from ${pcs(HPc.p.fin[0])} to ${pcs(HPc.p.fin[1])}, so the company has borrowed more; and other income slipped from ${pcs(HPc.p.oi[0])} to ${pcs(HPc.p.oi[1])}.\n- Overall, total expenses fell from ${pcs(HPc.p.te[0])} to ${pcs(HPc.p.te[1])} of revenue: operations have become more efficient.`,
  sol: 'Complete the rupee columns first; then compare the share of each cost in the two years and connect the moves to the profit share.',
  scheme: [['Rupee columns completed', 1], ['Percentages for both years', 2], ['Interpretation: improvement and its causes', 2], ['Interpretation: finance costs or other income', 1]],
}));

// Manair and Vamsadhara Tiles: inter-firm common-size comparison (6 marks).
const MV = plStatement({ cols: ['Manair Tiles', 'Vamsadhara Tiles'], taxRate: 25, v: { rev: [3000000, 9000000], oi: [60000, 90000], com: [1650000, 5400000], emp: [360000, 810000], fin: [60000, 360000], dep: [150000, 360000], oth: [240000, 720000] } });
const MVc = commonSize(MV);
check(MVc.p.pat[0] === 1500 && MVc.p.pat[1] === 1200 && MVc.p.com[1] === 6000 && MVc.p.te[0] === 8200 && MVc.p.te[1] === 8500 && MV.val('pat')[1] === 1080000 && MV.val('pat')[0] === 450000, 'Manair Vamsadhara');
Q('l6_interfirm_tiles', long({
  t: 3, d: 4, c: 'analysis', marks: 6,
  stem: `Two imagined tile makers, Manair Tiles Ltd of Karimnagar and Vamsadhara Tiles Ltd of Srikakulam, report the following for the year ended 31 March 2026. Tax is 25% of profit before tax for both.\n\n${given2([['Revenue from operations', ...MV.val('rev')], ['Other income', ...MV.val('oi')], ['Cost of materials consumed', ...MV.val('com')], ['Employee benefits expense', ...MV.val('emp')], ['Finance costs', ...MV.val('fin')], ['Depreciation and amortisation expense', ...MV.val('dep')], ['Other expenses', ...MV.val('oth')]], MV.cols)}\n\n(a) Prepare a common-size statement of profit and loss for the two companies.\n(b) Which company is more profitable? Give reasons.`,
  model: `**(a) Common-size Statement of Profit and Loss of Manair Tiles Ltd and Vamsadhara Tiles Ltd for the year ended 31 March 2026**\n\n${MVc.md}\n\n**(b)** Vamsadhara earns the larger profit in rupees (${rs(MV.val('pat')[1])} against ${rs(MV.val('pat')[0])}) only because it is three times the size. Relative to revenue, **Manair is more profitable**: profit after tax is ${pcs(MVc.p.pat[0])} of revenue against ${pcs(MVc.p.pat[1])}. Reasons: Manair spends ${pcs(MVc.p.com[0])} of revenue on materials against ${pcs(MVc.p.com[1])}, and its finance costs are ${pcs(MVc.p.fin[0])} against ${pcs(MVc.p.fin[1])}, so its total expenses are ${pcs(MVc.p.te[0])} of revenue against ${pcs(MVc.p.te[1])}. Vamsadhara does spend a smaller share on employees (${pcs(MVc.p.emp[1])} against ${pcs(MVc.p.emp[0])}) and on depreciation, but not enough to make up the gap.`,
  sol: 'Size hides efficiency: compare the shares of revenue, not the rupee totals.',
  scheme: [['Rupee columns completed for both companies', 1], ['Percentages for both companies', 2], ['Conclusion on profitability', 1], ['Reasons from the cost shares', 2]],
}));

FACTS.push(
  `Kalindi profit after tax ${fig(KP.val('pat')[0])} to ${fig(KP.val('pat')[1])} (${pcs(KPc.ch.pat.h)})`,
  `Hemavati ${pcs(HSc.ch.pat.h)}`,
  `Purna ${pcs(PUc.ch.pat.h)}`,
  `Subarnarekha ${pcs(SWc.ch.pat.h)}`,
  `Girna ${pcs(GPc.ch.pbt.h)}`,
  `Tons total ${fig(TF.part.el[1])}`,
  `Betwa total ${fig(BC.part.el[1])}`,
  `Teesta total ${fig(TP.part.el[1])}`,
  `Penna (one † adjustment)`,
  `Gandak, Manjira common-size balance sheets 100.00 in every part`,
  `Ghaghara, Hasdeo, Rihand, Alaknanda, Manair and Vamsadhara common-size statements re-add`,
);
export { FACTS, PL_HEADS };
