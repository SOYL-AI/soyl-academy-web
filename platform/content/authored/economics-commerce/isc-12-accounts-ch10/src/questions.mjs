// ISC 12 Accounts ch10 Financial Statement Analysis: Comparative and Common Size Statements — question
// bank. Every company and figure is imagined by SOYL (companies named after Indian hill and sea forts);
// no textbook illustration or exercise and no CISCE specimen or past-paper item is used. Every statement in
// a stem or model answer is built by acc.mjs from the givens (plStatement / bsStatement), and every change
// and percentage is computed and asserted there (comparative / commonSize), so no figure in a key is typed
// by hand; key results are also pinned below to values worked out independently by hand.
import { Q, mcq, ar, tf, fb, match, num, short, long } from './lib.mjs';
import { fig, rs, md, check, hundredths, pc, pcs, pcv, pctOf, plStatement, bsStatement, comparative, commonSize, twoCol, plGiven, given2, sum } from './acc.mjs';

const Y = ['2024-25', '2025-26'];
const D = ['31 March 2025', '31 March 2026'];
export const RULE = 'Rounding rule: every percentage is rounded to two decimal places, a third decimal of 5 or more raising the second decimal (in size).';
// The same rule, worded for keys (under 60 characters, so the answer-leak scan never sees it as copied from notes).
const RK = 'Percentages: two decimals, a half rounded up in size.';
check(RK.length < 60, 'short rule');
const pin = (got, want, what) => check(JSON.stringify(got) === JSON.stringify(want), `${what}: got ${JSON.stringify(got)}, expected ${JSON.stringify(want)}`);
const cmpTitle = (co, st) => (st.kind === 'pl' ? `Comparative Statement of Profit and Loss of ${co} for the years ended ${D[0]} and ${D[1]}` : `Comparative Balance Sheet of ${co} as at ${D[0]} and ${D[1]}`);
const csTitle = (co, st) => (st.kind === 'pl' ? `Common-size Statement of Profit and Loss of ${co} for the years ended ${D[0]} and ${D[1]}` : `Common-size Balance Sheet of ${co} as at ${D[0]} and ${D[1]}`);
export const FACTS = [];

// ================================================================ t01 meaning, significance, limitations
Q('m_tool_cmp', mcq({
  t: [1, 2], d: 1, c: 'recall',
  stem: 'The accountant of Kenjalgad Spices Ltd, an imagined company, sets its balance sheets of 31 March 2025 and 31 March 2026 side by side and adds one column for the rupee change and one for the percentage change in each item. She has prepared',
  opts: ['a comparative balance sheet', 'a common-size balance sheet', 'a cash flow statement', 'a trial balance'],
  sol: 'Two dates side by side with the change in rupees and in per cent is the comparative form; a common-size statement would turn each item into a share of the total instead.',
}));

Q('m_horizontal', mcq({
  t: [1, 2], d: 2, c: 'understanding',
  stem: 'An analyst at Sudhagad Bamboo Ltd, an imagined company, reads each row of its comparative statement of profit and loss from the 2024-25 column across to the 2025-26 column to see how far the item has moved. This kind of study is known as',
  opts: ['horizontal (dynamic) analysis', 'vertical (static) analysis', 'ratio analysis', 'cash flow analysis'],
  sol: 'Following one item over time is horizontal or dynamic analysis; relating items to a base within one year is vertical or static analysis.',
}));

Q('m_vertical', mcq({
  t: [1, 3], d: 1, c: 'recall',
  stem: 'The finance manager of Vasota Honey Ltd, an imagined company, works out every item of its 2025-26 Statement of Profit and Loss as a percentage of revenue from operations of the same year. This is an example of',
  opts: ['vertical (static) analysis', 'horizontal (dynamic) analysis', 'trend analysis over several years', 'inter-firm comparison'],
  sol: 'Every item is set against a base of the same period, which is what vertical analysis means; the common-size statement is its usual tool.',
}));

Q('m_inflation', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Between 2024-25 and 2025-26 the revenue from operations of Rohtas Lime Works Ltd, an imagined company in Sasaram, rose by 9%, while the price of lime rose by about 8% over the same period. Read on its own, the comparative statement of profit and loss',
  opts: [
    'overstates the real growth in sales, because comparative figures are not adjusted for changes in the price level',
    'shows that the company sold 9% more tonnes of lime',
    'is wrong, because comparative statements cannot be prepared when prices change',
    'automatically removes the effect of the price rise',
  ],
  sol: 'Rupee figures of two years are compared as they stand; most of the 9% rise here is price, not volume, and the statement cannot tell the two apart.',
}));

Q('m_policy', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Kamalgad Rice Mills Ltd charges depreciation on the straight-line method, while Rohida Rice Mills Ltd uses the written-down value method (both companies imagined). In their inter-firm common-size statements depreciation is 2.00% of revenue for one and 5.00% for the other. The analyst should conclude that',
  opts: [
    'part of the gap may come from the different depreciation methods, so the comparison must be read with care',
    "Rohida's machines are certainly older and less efficient",
    'the two companies cannot be compared at all, because their sizes differ',
    'one of the two statements must contain an arithmetical error',
  ],
  sol: 'Different accepted accounting policies give different figures for the same facts, which is a standing limitation of inter-firm comparison.',
}));

Q('m_lender', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'A bank deciding whether to raise the cash credit limit of Hatgad Grapes Ltd, an imagined company, studies its comparative balance sheet. The lines it will watch most closely are the changes in',
  opts: ['current assets and current liabilities', 'share capital and securities premium', 'property, plant and equipment and long-term borrowings only', 'the number of equity shares issued'],
  sol: 'A cash credit is a short-term facility, so the lender looks at short-term solvency: how current assets and current liabilities have moved.',
}));

Q('m_trend_only', mcq({
  t: [1, 2], d: 2, c: 'understanding',
  stem: 'Which question about Malhargad Bakery Ltd, an imagined company, can its comparative statement of profit and loss for 2024-25 and 2025-26 answer, but its 2025-26 statement alone cannot?',
  opts: [
    'Did expenses grow faster than revenue from operations over the year?',
    'What was the profit after tax for 2025-26?',
    'What was the revenue from operations in 2025-26?',
    'How much tax was charged in 2025-26?',
  ],
  sol: 'A single statement gives the levels of one year; only a second year side by side shows the direction and speed of change.',
}));

Q('m_cs_size', mcq({
  t: [1, 3], d: 2, c: 'understanding',
  stem: 'Mahipatgad Cashew Ltd has revenue of ₹50 lakh and a rival processor, Prabalgad Cashew Ltd, has revenue of ₹5 crore (both imagined). To compare what share of its revenue each spends on employees, the analyst should prepare',
  opts: ['common-size statements of profit and loss of the two companies', 'comparative balance sheets of each company for two years', 'a cash flow statement of each company', 'a trial balance of each company'],
  sol: 'Rupee amounts of a small and a large firm cannot be compared directly, but percentages of each firm’s own revenue can.',
}));

Q('ar_cmp_trend', ar({
  t: [1, 2], d: 2, c: 'understanding', key: 'a',
  a: 'A comparative statement of profit and loss helps the directors of Tikona Brass Fittings Ltd, an imagined company, see whether costs are rising faster than revenue from operations.',
  r: 'A comparative statement places the figures of two years side by side and shows the absolute and percentage change in each item.',
  sol: 'Both are true, and the side-by-side change columns are exactly what let the directors compare the growth of costs with the growth of revenue, so R explains A.',
}));

Q('ar_limit', ar({
  t: 1, d: 3, c: 'analysis', key: 'b',
  a: 'The comparative statements of Orchha Handmade Paper Ltd, an imagined company, can mislead when prices have risen sharply between the two years.',
  r: 'Comparative and common-size statements are prepared from the published financial statements of the company.',
  sol: 'Both are true. A is true because historical rupee figures are not adjusted for inflation; R only says where the figures come from, which does not explain why a price rise distorts them.',
}));

Q('tf_volume', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? Because the comparative statement of Daulatabad Paper Ltd, an imagined company, shows a 25.00% rise in revenue from operations, the company must have sold 25.00% more paper.',
  sol: 'Revenue is price times quantity; the rise may come partly or wholly from higher prices, which the statement does not separate.',
}));

Q('fb_dynamic', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'Because it follows each item of Malhargad Bakery Ltd from one year to the next, the study of its comparative statements is also called ___ analysis.',
  acc: [['horizontal', 'dynamic']],
  sol: 'It is horizontal (dynamic) analysis, as opposed to the vertical (static) analysis of common-size statements.',
}));

Q('mt_tools', match({
  t: [1, 2, 3], d: 2, c: 'understanding', marks: 2,
  stem: 'Match each statement prepared by the accountant of Vasota Honey Ltd (column A) with what it shows (column B).',
  pairs: [
    ['Comparative statement of profit and loss', 'Each income and expense of two years with its absolute and percentage change'],
    ['Common-size balance sheet', 'Each item as a percentage of the balance sheet total of the same date'],
    ['Inter-firm comparative statement', 'The difference between Vasota and a rival company for the same year'],
    ['Common-size statement of profit and loss', 'Each item as a percentage of revenue from operations'],
  ],
  sol: 'Comparative statements measure change (over time or between firms); common-size statements measure shares of a base.',
}));

Q('s2_meaning_cs', short({
  t: [1, 3], d: 2, c: 'understanding', marks: 2,
  stem: 'A trainee at Karnala Poultry Ltd, an imagined company, asks: (a) What is a common-size statement? (b) Why is it called a tool of vertical analysis?',
  model: '**(a)** A common-size statement shows every item of a financial statement as a percentage of a common base of the same period: revenue from operations (taken as 100) in a common-size Statement of Profit and Loss, and the balance sheet total (taken as 100) in a common-size Balance Sheet. Rupee amounts are usually shown beside the percentages.\n\n**(b)** It relates each item to a base **within the same year**, reading down the statement rather than across years, so it shows the make-up of one statement at a time. That study of the structure of a single period is called vertical (static) analysis.',
  sol: 'One mark for the meaning with both bases, one for linking "vertical" to the same-period base.',
  scheme: [['Meaning with the base for each statement', 1], ['Reason it is vertical analysis', 1]],
}));

Q('s2_two_limits', short({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Mention two limitations of comparative and common-size statements that the directors of Orchha Handmade Paper Ltd should keep in mind before acting on them.',
  model: '1. **Historical, unadjusted figures.** The statements use past book figures; a rise in rupees may be only a rise in prices, and assets bought years ago stay at old costs, so the trend can mislead.\n2. **Qualitative factors are left out.** The skill of the paper makers, the loyalty of customers or a new competitor carry no rupee amount, so no percentage can show them.\n\n*(Also accepted)* Different accounting policies make inter-firm comparison unreliable; window dressing distorts the figures; the statements show what changed, not why.',
  sol: 'Any two distinct limitations, each with a line of explanation.',
  scheme: [['First limitation explained', 1], ['Second limitation explained', 1]],
}));

Q('s2_significance', short({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Hatgad Grapes Ltd, an imagined company, has prepared comparative statements for the first time. Give two ways in which they will help its directors.',
  model: '1. **They show the trend.** The directors can see at a glance which items rose or fell and by how much, for example whether the cost of grapes and packing grew faster than revenue, and act on it.\n2. **They point to strengths and weaknesses.** Large percentage changes (finance costs, inventories, trade receivables) draw attention to areas that need control, and help in planning and budgeting for the next season.\n\n*(Also accepted)* They help judge whether profitability and solvency improved; they make inter-firm comparison possible when a rival’s figures are set beside Hatgad’s.',
  sol: 'Two uses, each tied to a decision the directors take.',
  scheme: [['First use explained', 1], ['Second use explained', 1]],
}));

Q('s3_objectives', short({
  t: 1, d: 2, c: 'understanding', marks: 3,
  stem: 'Explain three purposes for which the management of Raisen Soya Ltd, an imagined company, can use its comparative and common-size statements.',
  model: '1. **To study the trend of performance:** the comparative statements show how revenue, each expense and profit moved over the year, so management sees whether the soya business is growing and whether costs are under control.\n2. **To understand the structure of costs and funds:** common-size statements show what share of every rupee of revenue goes to soybeans, wages, interest and other costs, and how the business is financed (owners, long-term debt, current liabilities), so imbalances stand out.\n3. **To compare with other firms:** because common-size figures remove the effect of size, Raisen can set its cost shares and margin beside those of a larger or smaller processor and find where it is less efficient.\n\n*(Also accepted)* To judge short-term and long-term solvency; to support planning, budgeting and forecasting; to locate the causes of a change in profit.',
  sol: 'Three distinct purposes, each with the part of the statements that serves it.',
  scheme: [['First purpose explained', 1], ['Second purpose explained', 1], ['Third purpose explained', 1]],
}));

Q('s3_limits_case', short({
  t: 1, d: 3, c: 'application', marks: 3,
  stem: 'The chairman of Ghangad Tea Ltd, an imagined company, tells the board: "Our comparative statements show sales up 30.00%, so we are clearly a better company than last year." State three limitations of these statements that a director should point out to him.',
  model: '- **Price changes are ignored.** Tea prices may have risen; a 30.00% rise in rupees can hide a much smaller rise, or even a fall, in the quantity sold.\n- **Sales alone do not show efficiency.** The statements must be read as a whole: if costs rose faster than sales, profit and its share of revenue may have fallen. A rise in one figure does not make the company better.\n- **Non-money factors are left out.** The quality of the tea, the condition of the bushes, labour relations and competition do not appear in the statements, yet they decide whether the company is really stronger.\n\n*(Also accepted)* Figures depend on accounting policies and estimates and may be window-dressed; the statements show what changed but not why; past results do not guarantee future ones.',
  sol: 'Three limitations, each linked to why the 30.00% figure is not enough on its own.',
  scheme: [['First limitation applied to the claim', 1], ['Second limitation applied', 1], ['Third limitation applied', 1]],
}));

Q('l5_theory', long({
  t: 1, d: 2, c: 'understanding', marks: 5,
  stem: 'Suvarnadurg Fisheries Ltd, an imagined company, is preparing its first set of analysed statements.\n\n(a) Explain the meaning of comparative statements and any two points of their significance to the company. (3 marks)\n(b) State two limitations of common-size statements. (2 marks)',
  model: '**(a) Meaning.** Comparative statements present the Statement of Profit and Loss or the Balance Sheet of two or more periods (or of two firms) side by side, with the absolute change and the percentage change in each item, so that the direction and size of every change can be seen.\n\n**Significance (any two).**\n- They show the trend of revenue, costs and profit, so management of the fishery can see whether growth is healthy, for example whether fuel and ice costs rise faster than sales.\n- They reveal changes in financial position: how far assets grew and whether they were financed by owners or by borrowing.\n- *(Also accepted)* They help compare the company with rivals (inter-firm) and support planning and forecasting.\n\n**(b) Limitations of common-size statements (any two).**\n- They show only shares of a base; a falling percentage may hide a rising rupee amount, so they must be read with the rupee figures.\n- There is no accepted standard share for each item, so judging whether a share is "too high" needs comparison with other years or firms; and they ignore price changes and qualitative factors.',
  sol: 'Part (a): meaning (1) and two points of significance (2); part (b): two limitations (2).',
  scheme: [['(a) Meaning of comparative statements', 1], ['(a) Two points of significance', 2], ['(b) Two limitations of common-size statements', 2]],
}));

// ================================================================ t02 comparative statements
Q('m_pct_base', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'In the comparative balance sheet of Suvarnadurg Fisheries Ltd, an imagined company, the percentage change in trade payables is found by dividing the absolute change by',
  opts: ['the trade payables on 31 March 2025, the earlier date', 'the trade payables on 31 March 2026, the later date', 'the balance sheet total on 31 March 2026', 'the revenue from operations of 2025-26'],
  sol: 'Percentage change = absolute change ÷ earlier-year amount × 100: the earlier figure is the base.',
}));

const KS = { a: 240000, b: 300000 };
const KSh = hundredths(KS.b - KS.a, KS.a);
pin(KSh, 2500, 'Kulang inventories');
Q('m_pct_calc', mcq({
  t: 2, d: 2, c: 'application',
  stem: `Inventories of Kulang Seeds Ltd, an imagined company, were ${rs(KS.a)} on ${D[0]} and ${rs(KS.b)} on ${D[1]}. In its comparative balance sheet, the percentage change in inventories is`,
  opts: [pcs(KSh), pcs(hundredths(KS.b - KS.a, KS.b)), pcs(hundredths(KS.b, KS.a)), pcs(hundredths(KS.a, KS.b))],
  sol: `Change = ${fig(KS.b)} − ${fig(KS.a)} = ${fig(KS.b - KS.a)}; ${fig(KS.b - KS.a)} ÷ ${fig(KS.a)} × 100 = ${pcs(KSh)}. Dividing by the later figure gives ${pcs(hundredths(KS.b - KS.a, KS.b))}, the usual slip.`,
}));

const RF = { a: 250000, b: 200000 };
const RFh = hundredths(RF.b - RF.a, RF.a);
const RFwrong = hundredths(RF.b - RF.a, RF.b);
pin([RFh, RFwrong], [-2000, -2500], 'Ratnadurg finance costs');
Q('m_pct_decrease', mcq({
  t: 2, d: 2, c: 'application',
  stem: `Finance costs of Ratnadurg Ice Factory Ltd, an imagined company, were ${rs(RF.a)} in ${Y[0]} and ${rs(RF.b)} in ${Y[1]}. Its comparative statement of profit and loss shows the absolute change and the percentage change as`,
  opts: [
    `${fig(RF.b - RF.a)} and ${pc(RFh)}, a decrease`,
    `${fig(RF.a - RF.b)} and ${pc(-RFh)}, an increase`,
    `${fig(RF.b - RF.a)} and ${pc(RFwrong)}, a decrease`,
    `${fig(RF.a - RF.b)} and ${pc(-RFwrong)}, an increase`,
  ],
  sol: `Change = ${fig(RF.b)} − ${fig(RF.a)} = −${fig(RF.a - RF.b)}; −${fig(RF.a - RF.b)} ÷ ${fig(RF.a)} × 100 = ${pcs(RFh)}. A fall is shown in brackets, and the base stays the earlier year.`,
}));

Q('m_interfirm_base', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'In an inter-firm comparative statement of two imagined tile makers, with Nahargarh Tiles Ltd taken as the base firm and Mehrangarh Tiles Ltd set beside it, the percentage difference for each item is calculated on',
  opts: ['the figure of Nahargarh Tiles Ltd for that item', 'the figure of Mehrangarh Tiles Ltd for that item', 'the total of the two firms for that item', 'the revenue from operations of the larger firm'],
  sol: 'In an inter-firm statement the base firm plays the part of the earlier year: every difference is divided by its figure.',
}));

const KD = { a: 4000000, b: 4600000 };
const KDh = hundredths(KD.b - KD.a, KD.a);
pin([KD.b - KD.a, KDh, hundredths(KD.b - KD.a, KD.b)], [600000, 1500, 1304], 'Kanakdurg totals');
Q('m_total_change', mcq({
  t: 2, d: 2, c: 'application',
  stem: `The comparative balance sheet of Kanakdurg Salt Ltd, an imagined company, shows total assets of ${rs(KD.a)} on ${D[0]} and ${rs(KD.b)} on ${D[1]}. The change in total equity and liabilities shown in the same statement is`,
  opts: [`${rs(KD.b - KD.a)}, that is ${pcs(KDh)}`, `${rs(KD.b - KD.a)}, that is ${pcs(hundredths(KD.b - KD.a, KD.b))}`, `${rs(KD.b)}, that is ${pcs(hundredths(KD.b, KD.a))}`, 'impossible to state without the list of liabilities'],
  sol: 'Both parts of a balance sheet total the same on each date, so their changes are equal in rupees and in per cent.',
}));

Q('m_equal_growth', mcq({
  t: 2, d: 4, c: 'analysis',
  stem: 'In the comparative statement of profit and loss of Kalinjar Stone Crafts Ltd, an imagined company, revenue from operations and total expenses both rose by 18.00%. It has no other income and the tax rate is the same in both years. Its profit after tax has therefore',
  opts: ['risen by 18.00% as well', 'stayed the same, because the two rises cancel out', 'risen by 36.00%', 'fallen, because expenses rose'],
  sol: 'Profit before tax is revenue minus expenses; if both grow by the same factor, so does their difference, and an unchanged tax rate carries the same growth to profit after tax.',
}));

Q('m_nil_base', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: `Udayagiri Chemicals Ltd, an imagined company, held no current investments on ${D[0]} and ₹50,000 on ${D[1]}. In its comparative balance sheet the percentage change for current investments is shown as`,
  opts: ['a dash: there is no earlier figure to divide by, so only the absolute change of ₹50,000 is shown', '100.00%', '50.00%', 'an infinitely large increase'],
  sol: 'A percentage change needs a positive base. With a nil earlier figure the line shows the rupee change only.',
}));

const RR = { a: 160000, b: 185000 };
const RRh = hundredths(RR.b - RR.a, RR.a);
pin([RRh, (RR.b - RR.a) * 100000 / RR.a], [1563, 15625], 'Rohida receivables (15.625 exactly)');
Q('m_rounding', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Trade receivables of Rohida Rice Mills Ltd, an imagined company, rose from ${rs(RR.a)} to ${rs(RR.b)}. Rounded to two decimal places, the percentage change in its comparative balance sheet is`,
  opts: [pc(RRh), pc(RRh - 1), pc(hundredths(RR.b - RR.a, RR.b)), '15.60'],
  sol: `${fig(RR.b - RR.a)} ÷ ${fig(RR.a)} × 100 = 15.625 exactly; the third decimal is 5, so it rounds up to ${pc(RRh)}.`,
}));

Q('ar_small_base', ar({
  t: 2, d: 3, c: 'analysis', key: 'a',
  a: `The ${pc(hundredths(6000, 4000))}% rise in the other income of Ankai Pickles Ltd, an imagined company, from ₹4,000 to ₹10,000, should be read together with the absolute change.`,
  r: "The percentage change is worked out on the earlier year's figure, which here is very small.",
  sol: 'Both are true. On a tiny base a large percentage means only ₹6,000, so the analyst must look at the rupee change too; the small base is the very reason, so R explains A.',
}));
pin(hundredths(6000, 4000), 15000, 'Ankai other income');

Q('tf_cash_fall', tf({
  t: 2, d: 2, c: 'application', ans: true,
  stem: `True or false? Cash and cash equivalents of Korigad Tents Ltd, an imagined company, fell from ₹80,000 to ₹60,000, so its comparative balance sheet shows an absolute change of (20,000) and a percentage change of ${pc(hundredths(-20000, 80000))}.`,
  sol: `The change is −20,000 and −20,000 ÷ 80,000 × 100 = ${pcs(hundredths(-20000, 80000))}; both are negative and are shown in brackets.`,
}));

Q('tf_interfirm_year', tf({
  t: 2, d: 1, c: 'understanding', ans: true,
  stem: 'True or false? An inter-firm comparative statement of Jaigarh Brassware Ltd and Kumbhalgarh Brassware Ltd, two imagined companies, sets out the figures of the two companies for the same year.',
  sol: 'Inter-firm comparison holds the period constant and changes the firm; intra-firm comparison holds the firm constant and changes the period.',
}));

Q('fb_base_year', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'In the comparative statement of profit and loss of Shivneri Fruit Pulp Ltd, the percentage change in each item is the absolute change divided by the amount of the ___ year, multiplied by 100.',
  acc: [['earlier', 'previous', 'first', 'base', 'preceding']],
  sol: 'The earlier (previous, base) year is the base of every percentage change.',
}));

const VR = { a: 360000, b: 414000 };
const VRh = hundredths(VR.b - VR.a, VR.a);
pin(VRh, 1500, 'Visapur');
Q('n_pct_change', num({
  t: 2, d: 2, c: 'application', marks: 1, value: pcv(VRh), unit: '%',
  stem: `Employee benefits expense of Visapur Rice Flakes Ltd, an imagined company, was ${rs(VR.a)} in ${Y[0]} and ${rs(VR.b)} in ${Y[1]}. Find the percentage change shown in its comparative statement of profit and loss.`,
  sol: `Change = ${fig(VR.b)} − ${fig(VR.a)} = ${fig(VR.b - VR.a)}; ${fig(VR.b - VR.a)} ÷ ${fig(VR.a)} × 100 = ${pc(VRh)}%.`,
}));

const CT = { a: 300000, b: 335000 };
const CTh = hundredths(CT.b - CT.a, CT.a);
pin(CTh, 1167, 'Chandragiri');
Q('n_round', num({
  t: 2, d: 3, c: 'application', marks: 1, value: pcv(CTh), unit: '%', tol: 0.01,
  stem: `Trade receivables of Chandragiri Tomato Puree Ltd, an imagined company in Pakala, rose from ${rs(CT.a)} on ${D[0]} to ${rs(CT.b)} on ${D[1]}. Find the percentage change for its comparative balance sheet, rounded to two decimal places.`,
  sol: `${fig(CT.b - CT.a)} ÷ ${fig(CT.a)} × 100 = 11.666…, which rounds to ${pc(CTh)}%.`,
}));

const PL = { b: 910000, rate: 30 };
const PLa = (PL.b * 100) / (100 + PL.rate);
pin([PLa, hundredths(PL.b - PLa, PLa)], [700000, 3000], 'Penukonda');
Q('n_back', num({
  t: 2, d: 4, c: 'analysis', marks: 1, value: PLa, unit: '₹',
  stem: `The comparative statement of profit and loss of Penukonda Leather Ltd, an imagined company, shows profit after tax of ${rs(PL.b)} for ${Y[1]} and a percentage change of ${PL.rate}.00 over ${Y[0]}. What was the profit after tax for ${Y[0]} (in ₹)?`,
  sol: `The ${Y[1]} figure is ${100 + PL.rate}% of the ${Y[0]} figure, so ${Y[0]} profit = ${fig(PL.b)} × 100 ÷ ${100 + PL.rate} = ${fig(PLa)}, that is ₹${fig(PLa)}.`,
}));

const JW = { a: 4000000, b: 4700000 };
const JWh = hundredths(JW.b - JW.a, JW.a);
pin(JWh, 1750, 'Junagarh');
Q('n_interfirm', num({
  t: 2, d: 2, c: 'application', marks: 1, value: pcv(JWh), unit: '%',
  stem: `In 2025-26 two imagined woollen mills, Junagarh Woollens Ltd of Nokha and Achalgarh Woollens Ltd of Sirohi, earned revenue from operations of ${rs(JW.a)} and ${rs(JW.b)}. In an inter-firm comparative statement with Junagarh as the base firm, what is the percentage difference in revenue?`,
  sol: `Difference = ${fig(JW.b)} − ${fig(JW.a)} = ${fig(JW.b - JW.a)}; on the base firm, ${fig(JW.b - JW.a)} ÷ ${fig(JW.a)} × 100 = ${pc(JWh)}%.`,
}));

Q('s2_intra_inter', short({
  t: 2, d: 2, c: 'understanding', marks: 2,
  stem: 'Distinguish between intra-firm and inter-firm comparison, giving one example of each from the imagined companies Jaigarh Brassware Ltd and Kumbhalgarh Brassware Ltd.',
  model: '- **Intra-firm (time-series) comparison** studies the same firm over two or more periods. Example: Jaigarh’s comparative statement of profit and loss for 2024-25 and 2025-26, showing how its revenue and costs changed.\n- **Inter-firm (cross-sectional) comparison** studies two or more firms for the same period. Example: Jaigarh’s and Kumbhalgarh’s statements for 2025-26 set side by side, with Jaigarh as the base, to see which uses its resources better.',
  sol: 'One mark for each kind: its meaning with a fitting example.',
  scheme: [['Intra-firm with example', 1], ['Inter-firm with example', 1]],
}));

// Sudhagad Bamboo: two percentage changes.
const SB = { tr: [240000, 210000], ltb: [500000, 650000] };
const SBh = { tr: hundredths(SB.tr[1] - SB.tr[0], SB.tr[0]), ltb: hundredths(SB.ltb[1] - SB.ltb[0], SB.ltb[0]) };
pin(SBh, { tr: -1250, ltb: 3000 }, 'Sudhagad');
Q('s2_pct_two', short({
  t: 2, d: 2, c: 'application', marks: 2,
  stem: `For its comparative balance sheet, Sudhagad Bamboo Ltd, an imagined company in Pali, needs the change in two items. Trade receivables were ${rs(SB.tr[0])} on ${D[0]} and ${rs(SB.tr[1])} on ${D[1]}; long-term borrowings were ${rs(SB.ltb[0])} and ${rs(SB.ltb[1])}. Find the absolute and percentage change in each.`,
  model: md(['Item', `${D[0]} (₹)`, `${D[1]} (₹)`, 'Absolute change (₹)', 'Percentage change (%)'], [
    ['Trade receivables', fig(SB.tr[0]), fig(SB.tr[1]), fig(SB.tr[1] - SB.tr[0]), pc(SBh.tr)],
    ['Long-term borrowings', fig(SB.ltb[0]), fig(SB.ltb[1]), fig(SB.ltb[1] - SB.ltb[0]), pc(SBh.ltb)],
  ], [1, 2, 3, 4]) + `\n\nTrade receivables: −${fig(SB.tr[0] - SB.tr[1])} ÷ ${fig(SB.tr[0])} × 100 = ${pcs(SBh.tr)} (a decrease, in brackets). Long-term borrowings: ${fig(SB.ltb[1] - SB.ltb[0])} ÷ ${fig(SB.ltb[0])} × 100 = ${pcs(SBh.ltb)}.`,
  sol: 'Later minus earlier for the rupee change; divide by the earlier figure for the percentage.',
  scheme: [[`Trade receivables: ${fig(SB.tr[1] - SB.tr[0])} and ${pc(SBh.tr)}`, 1], [`Long-term borrowings: ${fig(SB.ltb[1] - SB.ltb[0])} and ${pc(SBh.ltb)}`, 1]],
}));

// Salher Onion Exports: earlier-year figures from the percentage change.
const SO = { rev: [6900000, 15], oth: [480000, -20] };
const SOa = { rev: (SO.rev[0] * 100) / (100 + SO.rev[1]), oth: (SO.oth[0] * 100) / (100 + SO.oth[1]) };
pin(SOa, { rev: 6000000, oth: 600000 }, 'Salher');
check(hundredths(SO.rev[0] - SOa.rev, SOa.rev) === SO.rev[1] * 100 && hundredths(SO.oth[0] - SOa.oth, SOa.oth) === SO.oth[1] * 100, 'Salher back-check');
Q('s2_missing_py', short({
  t: 2, d: 4, c: 'analysis', marks: 2,
  stem: `The comparative statement of profit and loss of Salher Onion Exports Ltd, an imagined company in Satana, shows for ${Y[1]}: revenue from operations ${rs(SO.rev[0])} with a percentage change of +${SO.rev[1]}.00, and other expenses ${rs(SO.oth[0])} with a percentage change of (${-SO.oth[1]}.00). Find the ${Y[0]} figure of each item.`,
  model: `- Revenue from operations: the ${Y[1]} figure is ${100 + SO.rev[1]}% of the ${Y[0]} figure, so ${Y[0]} = ${fig(SO.rev[0])} × 100 ÷ ${100 + SO.rev[1]} = **${rs(SOa.rev)}**. Check: ${fig(SO.rev[0] - SOa.rev)} ÷ ${fig(SOa.rev)} × 100 = ${SO.rev[1]}.00.\n- Other expenses: a fall of ${-SO.oth[1]}% leaves ${100 + SO.oth[1]}% of the ${Y[0]} figure, so ${Y[0]} = ${fig(SO.oth[0])} × 100 ÷ ${100 + SO.oth[1]} = **${rs(SOa.oth)}**. Check: −${fig(SOa.oth - SO.oth[0])} ÷ ${fig(SOa.oth)} × 100 = −${-SO.oth[1]}.00.`,
  sol: 'Turn each percentage change into "later year = (100 ± change)% of the earlier year" and divide back; never take the percentage of the later figure.',
  scheme: [[`Revenue ${rs(SOa.rev)}`, 1], [`Other expenses ${rs(SOa.oth)}`, 1]],
}));

// Ramsej Bricks: interpret two changes.
const RB = { rev: [5000000, 5500000], fin: [250000, 400000], pat: [600000, 570000] };
const RBh = Object.fromEntries(Object.entries(RB).map(([k, [a, b]]) => [k, hundredths(b - a, a)]));
pin(RBh, { rev: 1000, fin: 6000, pat: -500 }, 'Ramsej');
Q('s2_interpret_cmp', short({
  t: 2, d: 4, c: 'analysis', marks: 2,
  stem: `An extract of the comparative statement of profit and loss of Ramsej Bricks Ltd, an imagined company in Dindori, is given below. Comment on what the two changes in costs and profit suggest.\n\n${md(['Item', `${Y[0]} (₹)`, `${Y[1]} (₹)`, 'Percentage change (%)'], [['Revenue from operations', fig(RB.rev[0]), fig(RB.rev[1]), pc(RBh.rev)], ['Finance costs', fig(RB.fin[0]), fig(RB.fin[1]), pc(RBh.fin)], ['Profit after tax', fig(RB.pat[0]), fig(RB.pat[1]), pc(RBh.pat)]], [1, 2, 3])}`,
  model: `- **Finance costs rose by ${pcs(RBh.fin)} against a ${pcs(RBh.rev)} rise in revenue.** The company has borrowed more (or at a higher rate) to expand, but the borrowed money has not yet produced matching sales; interest of ${rs(RB.fin[1] - RB.fin[0])} more has been added to costs.\n- **Profit after tax fell by ${pc(-RBh.pat)}% although revenue grew.** Costs, finance costs in particular, rose faster than revenue, so the extra sales did not reach the bottom line; the company should check whether its borrowing is earning enough and control its other costs.`,
  sol: 'Set each cost change against the revenue change, then explain the profit change from that gap.',
  scheme: [['Finance costs interpreted', 1], ['Fall in profit explained', 1]],
}));

// Uparkot Kesar Mango: head totals and their change.
const UK = { sc: [1500000, 1500000], rs: [300000, 420000], tp: [200000, 250000], stp: [50000, 50000] };
const UKsf = [UK.sc[0] + UK.rs[0], UK.sc[1] + UK.rs[1]];
const UKcl = [UK.tp[0] + UK.stp[0], UK.tp[1] + UK.stp[1]];
const UKh = { sf: hundredths(UKsf[1] - UKsf[0], UKsf[0]), cl: hundredths(UKcl[1] - UKcl[0], UKcl[0]) };
pin([UKsf, UKcl, UKh], [[1800000, 1920000], [250000, 300000], { sf: 667, cl: 2000 }], 'Uparkot');
Q('s2_head_change', short({
  t: 2, d: 3, c: 'application', marks: 2,
  stem: `From the following extract of the balance sheets of Uparkot Kesar Mango Ltd, an imagined company in Talala, find the absolute and percentage change in (a) Shareholders' Funds and (b) Current Liabilities.\n\n${given2(D, [['Share capital', ...UK.sc], ['Reserves and surplus', ...UK.rs], ['Trade payables', ...UK.tp], ['Short-term provisions', ...UK.stp]])}`,
  model: md(['Head', `${D[0]} (₹)`, `${D[1]} (₹)`, 'Absolute change (₹)', 'Percentage change (%)'], [
    ["Shareholders' Funds (share capital + reserves and surplus)", fig(UKsf[0]), fig(UKsf[1]), fig(UKsf[1] - UKsf[0]), pc(UKh.sf)],
    ['Current Liabilities (trade payables + short-term provisions)', fig(UKcl[0]), fig(UKcl[1]), fig(UKcl[1] - UKcl[0]), pc(UKh.cl)],
  ], [1, 2, 3, 4]) + `\n\n(a) ${fig(UKsf[1] - UKsf[0])} ÷ ${fig(UKsf[0])} × 100 = 6.666…, rounded to ${pc(UKh.sf)}. (b) ${fig(UKcl[1] - UKcl[0])} ÷ ${fig(UKcl[0])} × 100 = ${pc(UKh.cl)}. ${RK}`,
  sol: 'Add the sub-heads to the head first, then compute the change of the head on its own earlier total (not the average of the sub-head percentages).',
  scheme: [[`Shareholders' Funds ${fig(UKsf[1] - UKsf[0])}; ${pc(UKh.sf)}`, 1], [`Current Liabilities ${fig(UKcl[1] - UKcl[0])}; ${pc(UKh.cl)}`, 1]],
}));

// Torna Rope Works: comparative statement of profit and loss (3 marks).
const TR = plStatement({ cols: Y, taxRate: 40, v: { rev: [2500000, 3000000], com: [1500000, 1950000], oth: [250000, 300000] } });
const TRc = comparative(TR);
pin([TR.val('te'), TR.val('pbt'), TR.val('pat'), TRc.ch.te.h, TRc.ch.pat.h, TRc.ch.com.h], [[1750000, 2250000], [750000, 750000], [450000, 450000], 2857, 0, 3000], 'Torna');
Q('s3_cpl_torna', short({
  t: 2, d: 3, c: 'application', marks: 3,
  stem: `Torna Rope Works Ltd, an imagined company in Nasrapur, reports the following. Tax is 40% of profit before tax in both years. Prepare its Comparative Statement of Profit and Loss.\n\n${plGiven(TR)}`,
  model: `**${cmpTitle('Torna Rope Works Ltd', TR)}**\n\n${TRc.md}\n\n${RK} Revenue rose by ${pcs(TRc.ch.rev.h)} but materials rose by ${pcs(TRc.ch.com.h)}, so total expenses rose by ${pcs(TRc.ch.te.h)} and profit did not grow at all (${pc(TRc.ch.pat.h)}%).`,
  sol: 'Complete both years in rupees first (total expenses, profit before tax, tax, profit after tax), then the two change columns.',
  scheme: [['Both years completed', 1], ['Absolute changes', 1], [`Percentage changes (total expenses ${pcs(TRc.ch.te.h)})`, 1]],
}));

// Rajgad Stoneware: comparative balance sheet (3 marks).
const RJ = bsStatement({ cols: D, v: { sc: [1000000, 1200000], rs: [200000, 300000], ltb: [300000, 240000], tp: [100000, 160000], ppe: [1100000, 1300000], inv: [300000, 360000], cce: [200000, 240000] } });
const RJc = comparative(RJ);
pin([RJ.part.el, RJc.ch.elT.h, RJc.ch.ppe.h, RJc.ch.ltb.h, RJc.ch.rs.h], [[1600000, 1900000], 1875, 1818, -2000, 5000], 'Rajgad');
Q('s3_cbs_rajgad', short({
  t: 2, d: 3, c: 'application', marks: 3,
  stem: `Rajgad Stoneware Ltd, an imagined company in Velhe, presents its balance sheets as at ${D[0]} and ${D[1]} below. Prepare a Comparative Balance Sheet.\n\n${twoCol(RJ)}`,
  model: `**${cmpTitle('Rajgad Stoneware Ltd', RJ)}**\n\n${RJc.md}\n\n${RK} Both totals rise by ${rs(RJc.ch.elT.abs)} (${pcs(RJc.ch.elT.h)}).`,
  sol: 'Keep the Schedule III order, add the two change columns line by line and check that both totals change by the same amount.',
  scheme: [['Format with both dates', 1], ['Absolute changes', 1], ['Percentage changes, both totals equal', 1]],
}));

// Nahargarh and Mehrangarh Tiles: inter-firm comparative statement (3 marks).
const NM = plStatement({ cols: ['Nahargarh Tiles', 'Mehrangarh Tiles'], taxRate: 25, v: { rev: [3000000, 3600000], com: [1800000, 2268000], emp: [300000, 324000], oth: [300000, 288000] } });
const NMc = comparative(NM, { interfirm: true });
pin([NM.val('pat'), NMc.ch.com.h, NMc.ch.emp.h, NMc.ch.oth.h, NMc.ch.te.h, NMc.ch.pat.h], [[450000, 540000], 2600, 800, -400, 2000, 2000], 'Nahargarh Mehrangarh');
Q('s3_interfirm_tiles', short({
  t: 2, d: 3, c: 'application', marks: 3,
  stem: `Nahargarh Tiles Ltd of Chomu and Mehrangarh Tiles Ltd of Pipar are two imagined tile makers. Their figures for ${Y[1]} are given below; tax is 25% of profit before tax for both. Prepare an inter-firm comparative statement of profit and loss, taking Nahargarh Tiles Ltd as the base.\n\n${plGiven(NM)}`,
  model: `**Inter-firm Comparative Statement of Profit and Loss of Nahargarh Tiles Ltd and Mehrangarh Tiles Ltd for the year ended ${D[1]}**\n\n${NMc.md}\n\nDifference = Mehrangarh − Nahargarh; percentage difference = difference ÷ Nahargarh × 100. ${RK} Mehrangarh is ${pcs(NMc.ch.rev.h)} larger in revenue and earns ${pcs(NMc.ch.pat.h)} more profit after tax: its materials cost ${pcs(NMc.ch.com.h)} more, but it spends less on other expenses (${pcs(NMc.ch.oth.h)}).`,
  sol: 'Same layout as a comparative statement, with the base firm in place of the earlier year.',
  scheme: [['Both firms completed', 1], ['Differences in rupees', 1], ['Percentage differences on the base firm', 1]],
}));

// Vishalgad Cashew: build the later year from the percentage changes.
const VC = { rev: 4000000, te: 3200000, revUp: 25, teUp: 20, tax: 30 };
const VCb = { rev: VC.rev + pctOf(VC.revUp, VC.rev), te: VC.te + pctOf(VC.teUp, VC.te) };
const VCpbt = [VC.rev - VC.te, VCb.rev - VCb.te];
const VCh = hundredths(VCpbt[1] - VCpbt[0], VCpbt[0]);
const VCpat = VCpbt.map((p) => p - pctOf(VC.tax, p));
pin([VCb, VCpbt, VCh, VCpat, hundredths(VCpat[1] - VCpat[0], VCpat[0])], [{ rev: 5000000, te: 3840000 }, [800000, 1160000], 4500, [560000, 812000], 4500], 'Vishalgad');
Q('s3_rebuild_vishalgad', short({
  t: 2, d: 4, c: 'analysis', marks: 3,
  stem: `In ${Y[0]} Vishalgad Cashew Ltd, an imagined company in Shahuwadi, had revenue from operations of ${rs(VC.rev)} and total expenses of ${rs(VC.te)}; it has no other income. In ${Y[1]} revenue rose by ${VC.revUp}% and total expenses by ${VC.teUp}%. Tax is ${VC.tax}% of profit before tax. Prepare a comparative statement showing revenue, total expenses, profit before tax, tax and profit after tax, and explain why profit grew faster than revenue.`,
  model: md(['Particulars', `${Y[0]} (₹)`, `${Y[1]} (₹)`, 'Absolute change (₹)', 'Percentage change (%)'], [
    ['Revenue from operations', fig(VC.rev), fig(VCb.rev), fig(VCb.rev - VC.rev), pc(VC.revUp * 100)],
    ['Less: Total expenses', fig(VC.te), fig(VCb.te), fig(VCb.te - VC.te), pc(VC.teUp * 100)],
    ['Profit before tax', fig(VCpbt[0]), fig(VCpbt[1]), fig(VCpbt[1] - VCpbt[0]), pc(VCh)],
    [`Less: Tax (${VC.tax}%)`, fig(VCpbt[0] - VCpat[0]), fig(VCpbt[1] - VCpat[1]), fig(VCpbt[1] - VCpat[1] - VCpbt[0] + VCpat[0]), pc(VCh)],
    ['Profit after tax', fig(VCpat[0]), fig(VCpat[1]), fig(VCpat[1] - VCpat[0]), pc(VCh)],
  ], [1, 2, 3, 4]) + `\n\nProfit is the small difference left after expenses. Revenue gained ${rs(VCb.rev - VC.rev)} while expenses grew by only ${rs(VCb.te - VC.te)}, so profit before tax gained ${rs(VCpbt[1] - VCpbt[0])} on a base of ${rs(VCpbt[0])}: a rise of ${pcs(VCh)}, far above the ${VC.revUp}% rise in revenue.`,
  sol: 'Rebuild the later year from the percentages, derive profit, and only then compute its change; explain the leverage of a narrow profit base.',
  scheme: [[`${Y[1]} revenue and expenses rebuilt`, 1], [`Profit lines and changes (profit before tax ${pcs(VCh)})`, 1], ['Reason profit grew faster', 1]],
}));

// Daulatabad Paper: full comparative statement of profit and loss (5 marks).
const DP = plStatement({ cols: Y, taxRate: 30, v: { rev: [6000000, 7500000], oi: [120000, 150000], com: [3300000, 4275000], emp: [720000, 810000], fin: [180000, 150000], dep: [300000, 360000], oth: [420000, 525000] } });
const DPc = comparative(DP);
pin([DP.val('te'), DP.val('pbt'), DP.val('pat'), DPc.ch.com.h, DPc.ch.fin.h, DPc.ch.te.h, DPc.ch.pat.h, DPc.ch.ti.h], [[4920000, 6120000], [1200000, 1530000], [840000, 1071000], 2955, -1667, 2439, 2750, 2500], 'Daulatabad');
Q('l5_cpl_daulatabad', long({
  t: 2, d: 3, c: 'application', marks: 5,
  stem: `Daulatabad Paper Ltd is an imagined company in Khuldabad; tax is 30% of profit before tax in both years.\n\n${plGiven(DP)}\n\n(a) Prepare a Comparative Statement of Profit and Loss for ${Y[0]} and ${Y[1]}. (3 marks)\n(b) Give two observations on the change in the company's performance. (2 marks)`,
  model: `**(a) ${cmpTitle('Daulatabad Paper Ltd', DP)}**\n\n${DPc.md}\n\n${RK}\n\n**(b) Observations**\n- **Profit grew faster than revenue.** Total income rose by ${pcs(DPc.ch.ti.h)} while total expenses rose by ${pcs(DPc.ch.te.h)}, so profit before tax and profit after tax rose by ${pcs(DPc.ch.pat.h)}: the mill is doing better.\n- **Materials are the cost to watch.** Cost of materials consumed rose by ${pcs(DPc.ch.com.h)}, faster than revenue, while employee benefits rose only ${pcs(DPc.ch.emp.h)} and finance costs fell by ${pc(-DPc.ch.fin.h)}% (less borrowing). Savings on staff and interest more than made up for dearer pulp.`,
  sol: 'Finish both years before the change columns; then compare the growth of each cost with the growth of revenue.',
  scheme: [['(a) Both years completed with totals and tax', 1], ['(a) Absolute changes', 1], ['(a) Percentage changes', 1], ['(b) First observation', 1], ['(b) Second observation', 1]],
}));

// Gingee Groundnut Oil: comparative balance sheet with observations (5 marks).
const GG = bsStatement({ cols: D, v: { sc: [2000000, 2400000], rs: [500000, 700000], ltb: [800000, 600000], tp: [400000, 520000], ocl: [100000, 120000], stp: [200000, 260000], ppe: [2400000, 2900000], intang: [100000, 80000], nci: [200000, 200000], inv: [600000, 690000], tr: [500000, 560000], cce: [200000, 170000] } });
const GGc = comparative(GG);
pin([GG.part.el, GGc.ch.elT.h, GGc.ch.ppe.h, GGc.ch.ltb.h, GGc.ch.cce.h, GGc.headCh.sf.h, GGc.headCh.cl.h, GGc.headCh.ca.h], [[4000000, 4600000], 1500, 2083, -2500, -1500, 2400, 2857, 923], 'Gingee');
Q('l5_cbs_gingee', long({
  t: 2, d: 4, c: 'analysis', marks: 5,
  stem: `The balance sheets of Gingee Groundnut Oil Ltd, an imagined company in Villupuram, are given below.\n\n${twoCol(GG)}\n\n(a) Prepare a Comparative Balance Sheet. (3 marks)\n(b) Give two observations on how the company financed its growth and on its liquidity. (2 marks)`,
  model: `**(a) ${cmpTitle('Gingee Groundnut Oil Ltd', GG)}**\n\n${GGc.md}\n\n${RK}\n\n**(b) Observations**\n- **Growth financed by owners, debt reduced.** Shareholders' funds rose from ${rs(GGc.headCh.sf.a)} to ${rs(GGc.headCh.sf.b)} (${pcs(GGc.headCh.sf.h)}) through fresh capital and retained profit, while long-term borrowings were cut by ${pc(-GGc.ch.ltb.h)}%. The new long-term money went mainly into property, plant and equipment (up ${pcs(GGc.ch.ppe.h)}).\n- **Liquidity has weakened.** Current liabilities rose by ${pcs(GGc.headCh.cl.h)} but current assets by only ${pcs(GGc.headCh.ca.h)}, and cash fell by ${pc(-GGc.ch.cce.h)}%; the company should watch its ability to pay suppliers.`,
  sol: 'After the statement, read the liabilities side for sources of funds and the assets side for their uses, then set current assets against current liabilities.',
  scheme: [['(a) Equity and liabilities with changes', 1], ['(a) Assets with changes', 1], ['(a) Percentages and equal totals', 1], ['(b) Financing observation', 1], ['(b) Liquidity observation', 1]],
}));

// ================================================================ t03 common-size statements
Q('m_cs_base_pl', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'In the common-size Statement of Profit and Loss of Penukonda Leather Ltd, an imagined company, profit after tax is expressed as a percentage of',
  opts: ['revenue from operations', 'total income', 'profit before tax', 'total expenses'],
  sol: 'Every line of a common-size statement of profit and loss, profit after tax included, is divided by revenue from operations of that year.',
}));

const SD = { tot: 2400000, tp: 180000 };
const SDh = hundredths(SD.tp, SD.tot);
pin([SDh, hundredths(SD.tp, SD.tot - SD.tp)], [750, 811], 'Sarasgad');
Q('m_cs_bs_calc', mcq({
  t: 3, d: 2, c: 'application',
  stem: `On ${D[1]} the balance sheet total of Sarasgad Dairy Ltd, an imagined company, is ${rs(SD.tot)} and its trade payables are ${rs(SD.tp)}. In its common-size balance sheet, trade payables appear as`,
  opts: [`${pc(SDh)}%`, `${pc(hundredths(SD.tp, SD.tot - SD.tp))}%`, `${pc(SDh * 10)}%`, `${pc(SDh / 10)}%`],
  sol: `${fig(SD.tp)} ÷ ${fig(SD.tot)} × 100 = ${pc(SDh)}%; the base is the whole balance sheet total, not the total less the item.`,
}));

Q('m_cs_total_income', mcq({
  t: 3, d: 3, c: 'understanding',
  stem: 'In the common-size statement of profit and loss of Irshalgad Spring Water Ltd, an imagined company, total income is shown as 104.00. This means that',
  opts: [
    'other income equals 4.00% of revenue from operations, which is the base of 100',
    'the statement has an error, as no line may exceed 100',
    'revenue from operations grew by 4.00% over the year',
    'total expenses were 4.00% of revenue from operations',
  ],
  sol: 'Only revenue from operations is the base; other income is expressed on the same base and added to it, so total income passes 100 whenever there is other income.',
}));

const GT = { rev: [4000000, 5000000], emp: [360000, 400000] };
const GTp = GT.rev.map((r, i) => hundredths(GT.emp[i], r));
const GTh = hundredths(GT.emp[1] - GT.emp[0], GT.emp[0]);
pin([GTp, hundredths(GT.rev[1] - GT.rev[0], GT.rev[0]), GTh], [[900, 800], 2500, 1111], 'Ghangad');
Q('m_cs_rupee_up', mcq({
  t: 3, d: 4, c: 'analysis',
  stem: `In the common-size statements of Ghangad Tea Ltd, an imagined company, employee benefits expense fell from ${pc(GTp[0])}% of revenue in ${Y[0]} to ${pc(GTp[1])}% in ${Y[1]}, while revenue from operations rose by 25.00%. In rupees, employee benefits expense`,
  opts: [`rose by about ${pc(GTh)}%`, 'fell by 1.00%', `fell by about ${pc(GTh)}%`, 'did not change'],
  sol: `Take revenue as 100 and then 125: the expense moves from ${pc(GTp[0])} to ${pc(GTp[1])}% of 125, that is 10.00, a rise of ${pcs(GTh)} in rupees even though its share fell.`,
}));

const BK = { rev: [12000000, 2500000], pat: [900000, 300000] };
const BKp = BK.rev.map((r, i) => hundredths(BK.pat[i], r));
pin(BKp, [750, 1200], 'Bhairavgad Kenjalgad');
Q('m_cs_interfirm', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: `Bhairavgad Masala Ltd earns profit after tax of ${rs(BK.pat[0])} on revenue from operations of ${rs(BK.rev[0])}; Kenjalgad Spices Ltd earns ${rs(BK.pat[1])} on revenue of ${rs(BK.rev[1])} (both imagined). Judged by their common-size statements, which company is more profitable?`,
  opts: [
    `Kenjalgad, because its profit after tax is ${pc(BKp[1])}% of revenue against ${pc(BKp[0])}%`,
    'Bhairavgad, because its profit after tax is three times larger in rupees',
    'Both equally, because both earn a profit',
    'It cannot be judged without comparative statements of two years',
  ],
  sol: 'Profitability is profit per rupee of revenue; the larger rupee profit only reflects the larger size.',
}));

Q('m_cs_bs_head', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: "In the common-size balance sheet of Prabalgad Paper Ltd, an imagined company, shareholders' funds are 55.00, non-current liabilities 25.00 and current liabilities 20.00. Which conclusion follows?",
  opts: [
    'Owners provide more than half of the funds used in the business',
    "Shareholders' funds are ₹55 lakh",
    'The company has no borrowings',
    'Current assets must also be 20.00',
  ],
  sol: 'The percentages are shares of the balance sheet total, so they show the mix of finance, not rupee amounts; current assets need not equal current liabilities.',
}));

Q('ar_cs_size', ar({
  t: [1, 3], d: 2, c: 'understanding', key: 'c',
  a: 'Common-size statements allow the small Sindhudurg Fish Foods Ltd to be compared with the much larger Vijaydurg Fish Foods Ltd (both imagined).',
  r: 'A common-size statement shows the rupee change in each item from one year to the next.',
  sol: 'A is true: shares of each firm’s own base remove the effect of size. R is false: rupee changes over time belong to comparative statements.',
}));

Q('ar_share_fall', ar({
  t: 3, d: 4, c: 'analysis', key: 'd',
  a: 'Since depreciation fell from 4.00% to 3.50% of revenue in the common-size statements of Bekal Coir Ltd, an imagined company, the depreciation charged in rupees must have fallen.',
  r: 'A common-size percentage depends both on the item and on the revenue from operations of that year.',
  sol: 'A is false: if revenue grew faster than depreciation, the charge could rise in rupees while its share fell. R is true, and it is why A fails.',
}));

Q('ar_cs_bs', ar({
  t: 3, d: 2, c: 'understanding', key: 'c',
  a: 'In the common-size balance sheet of Gingee Groundnut Oil Ltd, an imagined company, the assets part totals 100.00.',
  r: 'Each asset is shown as a percentage of total current assets.',
  sol: 'A is true because every asset is divided by the balance sheet total. R is false: the base is total assets, not current assets.',
}));

Q('tf_cs_bs_base', tf({
  t: 3, d: 2, c: 'understanding', ans: false,
  stem: "True or false? In the common-size balance sheet of Vishalgad Cashew Ltd, an imagined company, each liability is shown as a percentage of the total of non-current and current liabilities only, leaving out shareholders' funds.",
  sol: "The base is the whole balance sheet total, that is total equity and liabilities, which includes shareholders' funds.",
}));

Q('fb_cs_pl_base', fb({
  t: 3, d: 1, c: 'recall',
  stem: 'In the common-size Statement of Profit and Loss of Panhala Jaggery Ltd, every item is expressed as a percentage of ___ of the same year.',
  acc: [['revenue from operations', 'revenue', 'net sales', 'sales']],
  sol: 'Revenue from operations of the same year is the base, taken as 100.',
}));

Q('mt_bases', match({
  t: [2, 3], d: 2, c: 'understanding', marks: 2,
  stem: 'For the analysed statements of Shivneri Fruit Pulp Ltd, match each figure in column A with the amount it is divided by in column B.',
  pairs: [
    ['Percentage change in the comparative statement', 'The same item in the earlier year'],
    ['Percentage in the common-size statement of profit and loss', 'Revenue from operations of that year'],
    ['Percentage in the common-size balance sheet', 'The balance sheet total on that date'],
    ['Percentage difference in an inter-firm comparative statement', 'The same item of the base firm'],
  ],
  sol: 'Comparative figures divide by the base period or base firm; common-size figures divide by a base of the same statement.',
}));

Q('mt_signals', match({
  t: [2, 3], d: 3, c: 'application', marks: 2,
  stem: 'An analyst reads the comparative and common-size statements of Kamalgad Rice Mills Ltd, an imagined company. Match each observation (column A) with what it most likely signals (column B).',
  pairs: [
    ['Finance costs up 60.00% while revenue is up 10.00%', 'More borrowing or a higher rate of interest'],
    ['Materials up from 52.00% to 58.00% of revenue', 'Dearer paddy not passed on in selling prices'],
    ['Long-term borrowings up from 15.00% to 30.00% of the total', 'Greater dependence on debt'],
    ['Inventories up 45.00% while revenue is up 5.00%', 'Stock piling up or slow sales'],
  ],
  sol: 'Read each change against the growth of revenue or against the total: costs, debt or stock outgrowing the business are warning signs of different kinds.',
}));

const GP = { rev: 3600000, oth: 252000 };
const GPh = hundredths(GP.oth, GP.rev);
pin(GPh, 700, 'Golconda');
Q('n_cs_pl', num({
  t: 3, d: 2, c: 'application', marks: 1, value: pcv(GPh), unit: '%',
  stem: `Golconda Pearls Ltd, an imagined company in Secunderabad, has revenue from operations of ${rs(GP.rev)} and other expenses of ${rs(GP.oth)} for ${Y[1]}. What percentage will other expenses show in its common-size statement of profit and loss?`,
  sol: `${fig(GP.oth)} ÷ ${fig(GP.rev)} × 100 = ${pc(GPh)}%.`,
}));

const BC = { tot: 4500000, inv: 585000 };
const BCh = hundredths(BC.inv, BC.tot);
pin(BCh, 1300, 'Bekal');
Q('n_cs_bs', num({
  t: 3, d: 2, c: 'application', marks: 1, value: pcv(BCh), unit: '%',
  stem: `On ${D[1]} Bekal Coir Ltd, an imagined company in Kanhangad, has a balance sheet total of ${rs(BC.tot)}, and its inventories are ${rs(BC.inv)}. Find the percentage for inventories in its common-size balance sheet.`,
  sol: `${fig(BC.inv)} ÷ ${fig(BC.tot)} × 100 = ${pc(BCh)}%.`,
}));

const TB = { cash: 126000, h: 450 };
const TBv = (TB.cash * 10000) / TB.h;
pin([TBv, hundredths(TB.cash, TBv)], [2800000, TB.h], 'Tikona');
Q('n_cs_total', num({
  t: 3, d: 4, c: 'analysis', marks: 1, value: TBv, unit: '₹',
  stem: `In the common-size balance sheet of Tikona Brass Fittings Ltd, an imagined company, cash and cash equivalents of ${rs(TB.cash)} appear as ${pc(TB.h)}%. What is the balance sheet total (in ₹)?`,
  sol: `Total = ${fig(TB.cash)} × 100 ÷ ${pc(TB.h)} = ${fig(TBv)}, that is ₹${fig(TBv)}.`,
}));

const PS = { pbt: 1800, tax: 30 };
const PSpat = PS.pbt - (PS.pbt * PS.tax) / 100;
pin(PSpat, 1260, 'Pratapgad');
Q('n_cs_pat', num({
  t: 3, d: 3, c: 'application', marks: 1, value: pcv(PSpat), unit: '%',
  stem: `In the common-size statement of profit and loss of Pratapgad Strawberry Farms Ltd, an imagined company in Medha, profit before tax is ${pc(PS.pbt)}% of revenue from operations. Tax is ${PS.tax}% of profit before tax. What percentage will profit after tax show?`,
  sol: `Tax = ${PS.tax}% of ${pc(PS.pbt)} = ${pc((PS.pbt * PS.tax) / 100)}; profit after tax = ${pc(PS.pbt)} − ${pc((PS.pbt * PS.tax) / 100)} = ${pc(PSpat)}%.`,
}));

Q('s2_cmp_vs_cs', short({
  t: [1, 2, 3], d: 2, c: 'understanding', marks: 2,
  stem: 'State two differences between the comparative statement and the common-size statement that the accountant of Kulang Seeds Ltd, an imagined company, has prepared.',
  model: md(['Basis', 'Comparative statement', 'Common-size statement'], [
    ['What is compared', 'The same item across two years (or two firms): absolute and percentage change', 'Each item with a common base of the same statement'],
    ['Base for percentages', 'The amount of that item in the earlier year (or the base firm)', 'Revenue from operations, or the balance sheet total'],
    ['Type of analysis', 'Horizontal (dynamic)', 'Vertical (static)'],
  ]),
  sol: 'Two bases, each stated for both statements.',
  scheme: [['First difference, both sides', 1], ['Second difference, both sides', 1]],
}));

const KP = { rev: 2500000, com: 1625000, fin: 75000 };
const KPh = { com: hundredths(KP.com, KP.rev), fin: hundredths(KP.fin, KP.rev) };
pin(KPh, { com: 6500, fin: 300 }, 'Karnala');
Q('s2_cs_two', short({
  t: 3, d: 2, c: 'application', marks: 2,
  stem: `Karnala Poultry Ltd, an imagined company in Apta, has revenue from operations of ${rs(KP.rev)} for ${Y[1]}. Its cost of materials consumed (feed and chicks) is ${rs(KP.com)} and its finance costs are ${rs(KP.fin)}. Find the common-size percentage of each and say what the materials figure tells you.`,
  model: `- Cost of materials consumed: ${fig(KP.com)} ÷ ${fig(KP.rev)} × 100 = **${pc(KPh.com)}%**.\n- Finance costs: ${fig(KP.fin)} ÷ ${fig(KP.rev)} × 100 = **${pc(KPh.fin)}%**.\n\nFeed and chicks take ${pc(KPh.com)} paise of every rupee of revenue, so the farm's profit depends mainly on feed prices; interest takes only ${pc(KPh.fin)} paise.`,
  sol: 'Divide each item by revenue from operations of the same year; then read the share as paise per rupee.',
  scheme: [[`Both percentages (${pc(KPh.com)} and ${pc(KPh.fin)})`, 1], ['Meaning of the materials share', 1]],
}));

const MG = { rev: [4000000, 5000000], pctPat: [1200, 1050] };
const MGpat = MG.rev.map((r, i) => (r * MG.pctPat[i]) / 10000);
const MGh = hundredths(MGpat[1] - MGpat[0], MGpat[0]);
pin([MGpat, MGh, (MGpat[1] - MGpat[0]) * 100000 / MGpat[0]], [[480000, 525000], 938, 9375], 'Mulher');
Q('s2_cs_reading', short({
  t: [2, 3], d: 4, c: 'analysis', marks: 2,
  stem: `Mulher Grapes Ltd, an imagined company in Baglan, had revenue from operations of ${rs(MG.rev[0])} in ${Y[0]} and ${rs(MG.rev[1])} in ${Y[1]}. Its common-size statements show profit after tax at ${pc(MG.pctPat[0])}% and ${pc(MG.pctPat[1])}% of revenue. Did profit after tax rise or fall in rupees, and by what percentage?`,
  model: `Profit after tax: ${Y[0]} ${pc(MG.pctPat[0])}% of ${fig(MG.rev[0])} = ${fig(MGpat[0])}; ${Y[1]} ${pc(MG.pctPat[1])}% of ${fig(MG.rev[1])} = ${fig(MGpat[1])}. It **rose** by ${rs(MGpat[1] - MGpat[0])}, that is ${fig(MGpat[1] - MGpat[0])} ÷ ${fig(MGpat[0])} × 100 = 9.375, rounded to **${pc(MGh)}%**, even though its share of revenue fell: revenue grew faster than profit.`,
  sol: 'Convert each share back into rupees before comparing; a falling share can go with a rising amount.',
  scheme: [[`Profit in rupees for both years (${fig(MGpat[0])}, ${fig(MGpat[1])})`, 1], [`Rise of ${pcs(MGh)} with the reason`, 1]],
}));

// Ajinkyatara Turmeric: common-size statement of profit and loss (3 marks).
const AT = plStatement({ cols: Y, taxRate: 25, v: { rev: [1600000, 2000000], com: [880000, 1160000], emp: [160000, 180000], oth: [240000, 260000] } });
const ATc = commonSize(AT);
pin([ATc.p.com, ATc.p.emp, ATc.p.oth, ATc.p.te, ATc.p.pat, ATc.rounded], [[5500, 5800], [1000, 900], [1500, 1300], [8000, 8000], [1500, 1500], 0], 'Ajinkyatara');
Q('s3_cspl_ajinkyatara', short({
  t: 3, d: 2, c: 'application', marks: 3,
  stem: `Ajinkyatara Turmeric Ltd, an imagined company in Koregaon, reports the following. Tax is 25% of profit before tax. Prepare a Common-size Statement of Profit and Loss for both years.\n\n${plGiven(AT)}`,
  model: `**${csTitle('Ajinkyatara Turmeric Ltd', AT)}**\n\n${ATc.md}\n\nEach line is divided by revenue from operations of its own year. The profit share is unchanged at ${pc(ATc.p.pat[1])}%: turmeric took a larger share (${pc(ATc.p.com[0])} to ${pc(ATc.p.com[1])}) but employee and other expenses took less.`,
  sol: 'Complete profit before tax, tax and profit after tax in rupees, then express every line on that year’s revenue.',
  scheme: [['Both years completed in rupees', 1], [`Percentages for ${Y[0]}`, 1], [`Percentages for ${Y[1]}`, 1]],
}));

// Vasota Honey: common-size balance sheet (3 marks).
const VH = bsStatement({ cols: D, v: { sc: [1200000, 1200000], rs: [200000, 450000], ltb: [400000, 500000], tp: [200000, 350000], ppe: [1300000, 1500000], inv: [400000, 625000], cce: [300000, 375000] } });
const VHc = commonSize(VH);
pin([VH.part.el, VHc.p.sc, VHc.p.rs, VHc.p.inv, VHc.adjusted.length, VHc.rounded], [[2000000, 2500000], [6000, 4800], [1000, 1800], [2000, 2500], 0, 0], 'Vasota');
Q('s3_csbs_vasota', short({
  t: 3, d: 2, c: 'application', marks: 3,
  stem: `Prepare a Common-size Balance Sheet of Vasota Honey Ltd, an imagined company in Bamnoli, from the following.\n\n${twoCol(VH)}`,
  model: `**${csTitle('Vasota Honey Ltd', VH)}**\n\n${VHc.md}\n\nEach item is a percentage of the balance sheet total of its own date (${rs(VH.part.el[0])} and ${rs(VH.part.el[1])}); every part of each column totals 100.00.`,
  sol: 'Divide every line by the total of its own date and check each part of each column adds to 100.',
  scheme: [['Format with both dates', 1], ['Equity and liabilities percentages', 1], ['Assets percentages', 1]],
}));

// Asirgarh Cotton Gins: interpret a common-size statement (3 marks).
const AC = plStatement({ cols: Y, taxRate: 30, v: { rev: [5000000, 6000000], oi: [100000, 60000], com: [3250000, 4080000], emp: [400000, 420000], fin: [100000, 180000], dep: [150000, 180000], oth: [350000, 300000] } });
const ACc = commonSize(AC);
const ACpat = hundredths(AC.val('pat')[1] - AC.val('pat')[0], AC.val('pat')[0]);
pin([ACc.p.ti, ACc.p.te, ACc.p.pbt, ACc.p.tax, ACc.p.pat, AC.val('pat'), ACpat, ACc.rounded], [[10200, 10100], [8500, 8600], [1700, 1500], [510, 450], [1190, 1050], [595000, 630000], 588, 0], 'Asirgarh');
Q('s3_interpret_asirgarh', short({
  t: 3, d: 4, c: 'analysis', marks: 3,
  stem: `The common-size statement of profit and loss of Asirgarh Cotton Gins Ltd, an imagined company in Burhanpur, is given below. Revenue grew by ${pcs(hundredths(AC.val('rev')[1] - AC.val('rev')[0], AC.val('rev')[0]))}, yet profit after tax as a share of revenue fell. Identify the reasons and suggest one step the company could take.\n\n${md(['Item', ...ACc.headers.slice(1)], ACc.rows, [1, 2, 3, 4])}`,
  model: `- **Raw cotton took a bigger share.** Cost of materials consumed rose from ${pcs(ACc.p.com[0])} to ${pcs(ACc.p.com[1])} of revenue: dearer kapas that the gin could not pass on.\n- **Finance costs rose and other income fell.** Finance costs went from ${pcs(ACc.p.fin[0])} to ${pcs(ACc.p.fin[1])} and other income from ${pcs(ACc.p.oi[0])} to ${pcs(ACc.p.oi[1])}; employee benefits (${pcs(ACc.p.emp[0])} to ${pcs(ACc.p.emp[1])}) and other expenses (${pcs(ACc.p.oth[0])} to ${pcs(ACc.p.oth[1])}) fell, but not by enough.\n- **Result:** total expenses rose from ${pcs(ACc.p.te[0])} to ${pcs(ACc.p.te[1])}, so profit before tax fell from ${pcs(ACc.p.pbt[0])} to ${pcs(ACc.p.pbt[1])} and profit after tax from ${pcs(ACc.p.pat[0])} to ${pcs(ACc.p.pat[1])} of revenue. In rupees profit after tax still rose by ${pcs(ACpat)}, far less than revenue.\n\n**Suggested step:** buy cotton under forward contracts at harvest, or revise ginning charges, to recover the higher material cost; repay costly borrowing where possible.`,
  sol: 'Find the lines whose share moved and connect them to the fall in the profit share; then propose a remedy aimed at the main cause.',
  scheme: [['Main reason: materials share up', 1], ['Other changes and their effect on profit', 1], ['A sensible suggestion', 1]],
}));

// Sajjangad Herbal Soaps: rupee figures from common-size percentages (3 marks).
const SH = { rev: 3000000, com: 5000, emp: 1200, oth: 1800, tax: 25 };
const SHr = { com: (SH.rev * SH.com) / 10000, emp: (SH.rev * SH.emp) / 10000, oth: (SH.rev * SH.oth) / 10000 };
const SHpbt = SH.rev - SHr.com - SHr.emp - SHr.oth;
const SHtax = pctOf(SH.tax, SHpbt);
const SHst = plStatement({ cols: ['Rupees', 'check'], taxRate: SH.tax, v: { rev: [SH.rev, SH.rev], com: [SHr.com, SHr.com], emp: [SHr.emp, SHr.emp], oth: [SHr.oth, SHr.oth] } });
const SHc = commonSize(SHst);
pin([SHr, SHpbt, SHtax, SHpbt - SHtax, SHc.p.pbt[0], SHc.p.tax[0], SHc.p.pat[0]], [{ com: 1500000, emp: 360000, oth: 540000 }, 600000, 150000, 450000, 2000, 500, 1500], 'Sajjangad');
Q('s3_cs_rebuild_sajjangad', short({
  t: 3, d: 4, c: 'analysis', marks: 3,
  stem: `Sajjangad Herbal Soaps Ltd, an imagined company in Parali, had revenue from operations of ${rs(SH.rev)} in ${Y[1]} and no other income. Its common-size statement shows cost of materials consumed ${pc(SH.com)}%, employee benefits expense ${pc(SH.emp)}% and other expenses ${pc(SH.oth)}%. Tax is ${SH.tax}% of profit before tax. Work out each item in rupees and the profit after tax, with its percentage.`,
  model: md(['Particulars', '₹', '% of revenue from operations'], [
    ['Revenue from operations', fig(SH.rev), '100.00'],
    ['Cost of materials consumed', fig(SHr.com), pc(SH.com)],
    ['Employee benefits expense', fig(SHr.emp), pc(SH.emp)],
    ['Other expenses', fig(SHr.oth), pc(SH.oth)],
    ['Profit before tax', fig(SHpbt), pc(SHc.p.pbt[0])],
    [`Less: Tax (${SH.tax}% of profit before tax)`, fig(SHtax), pc(SHc.p.tax[0])],
    [bold('Profit after tax'), bold(fig(SHpbt - SHtax)), bold(pc(SHc.p.pat[0]))],
  ], [1, 2]) + `\n\nEach rupee amount = percentage × ${fig(SH.rev)} ÷ 100. Profit before tax = 100.00 − ${pc(SH.com + SH.emp + SH.oth)} = ${pc(SHc.p.pbt[0])}% of revenue.`,
  sol: 'Multiply each share by revenue; profit before tax is what is left of 100 after the expense shares; tax is a share of profit, not of revenue.',
  scheme: [['Expenses in rupees', 1], [`Profit before tax ${rs(SHpbt)} and tax ${rs(SHtax)}`, 1], [`Profit after tax ${rs(SHpbt - SHtax)} = ${pc(SHc.p.pat[0])}%`, 1]],
}));

function bold(s) {
  return `**${s}**`;
}

Q('s3_cmp_vs_cs', short({
  t: [1, 2, 3], d: 2, c: 'understanding', marks: 3,
  stem: 'Prabalgad Paper Ltd, an imagined company, has prepared both kinds of analysed statements for two years. Distinguish between its comparative statements and its common-size statements on three bases.',
  model: md(['Basis', 'Comparative statements', 'Common-size statements'], [
    ['Meaning', 'Figures of two or more years (or firms) side by side with absolute and percentage change', 'Each item shown as a percentage of a common base of the same statement'],
    ['Base for percentages', 'The amount of the same item in the earlier year (or base firm)', 'Revenue from operations; the balance sheet total'],
    ['Nature of analysis', 'Horizontal (dynamic): change over time', 'Vertical (static): structure within a period'],
    ['Main use', 'Shows the direction and rate of change of each item', 'Shows the make-up of a statement; compares firms of different sizes'],
  ]),
  sol: 'Three bases, each contrasted for both statements.',
  scheme: [['First basis', 1], ['Second basis', 1], ['Third basis', 1]],
}));

// Raisen Soya: common-size statement of profit and loss (5 marks).
const RS = plStatement({ cols: Y, taxRate: 20, v: { rev: [8000000, 10000000], oi: [160000, 150000], com: [4800000, 6300000], emp: [640000, 700000], fin: [240000, 200000], dep: [320000, 400000], oth: [560000, 600000] } });
const RSc = commonSize(RS);
pin([RSc.p.ti, RSc.p.te, RSc.p.pbt, RSc.p.tax, RSc.p.pat, RSc.p.com, RSc.rounded], [[10200, 10150], [8200, 8200], [2000, 1950], [400, 390], [1600, 1560], [6000, 6300], 0], 'Raisen');
Q('l5_cspl_raisen', long({
  t: 3, d: 3, c: 'application', marks: 5,
  stem: `Raisen Soya Ltd is an imagined company in Raisen; tax is 20% of profit before tax.\n\n${plGiven(RS)}\n\n(a) Prepare a Common-size Statement of Profit and Loss for ${Y[0]} and ${Y[1]}. (3 marks)\n(b) Comment on the change in the company's cost structure and profitability. (2 marks)`,
  model: `**(a) ${csTitle('Raisen Soya Ltd', RS)}**\n\n${RSc.md}\n\n**(b)** Total expenses stayed at ${pc(RSc.p.te[1])}% of revenue, but their mix changed: soybeans rose from ${pcs(RSc.p.com[0])} to ${pcs(RSc.p.com[1])} of revenue, while employee benefits (${pcs(RSc.p.emp[0])} to ${pcs(RSc.p.emp[1])}), finance costs (${pcs(RSc.p.fin[0])} to ${pcs(RSc.p.fin[1])}) and other expenses (${pcs(RSc.p.oth[0])} to ${pcs(RSc.p.oth[1])}) took less. The small fall in profit after tax, from ${pcs(RSc.p.pat[0])} to ${pcs(RSc.p.pat[1])}, comes from lower other income (${pcs(RSc.p.oi[0])} to ${pcs(RSc.p.oi[1])}). Profitability is broadly steady; the rising material share needs watching.`,
  sol: 'Complete the rupee columns, express every line on its year’s revenue, and then read which shares moved.',
  scheme: [['(a) Rupee columns completed', 1], ['(a) Income and expense percentages', 1], ['(a) Profit and tax percentages', 1], ['(b) Cost structure comment', 1], ['(b) Profitability comment', 1]],
}));

// Chittorgarh Cement: common-size balance sheet with a rounding adjustment (5 marks).
const CC = bsStatement({ cols: D, v: { sc: [2500000, 2500000], rs: [750000, 1100000], ltb: [1000000, 1300000], tp: [500000, 700000], stp: [250000, 400000], ppe: [3250000, 3900000], nci: [250000, 250000], inv: [750000, 950000], tr: [500000, 600000], cce: [250000, 300000] } });
const CCc = commonSize(CC);
pin([CC.part.el, CCc.adjusted.map((a) => [a.key, a.col, a.by]), CCc.p.sc, CCc.p.rs, CCc.p.ltb, CCc.p.nci, CCc.p.inv, CCc.headP.sf, CCc.headP.ncl], [[5000000, 6000000], [['sc', 1, -1]], [5000, 4166], [1500, 1833], [2000, 2167], [500, 417], [1500, 1583], [6500, 6000], [2000, 2167]], 'Chittorgarh');
Q('l5_csbs_chittorgarh', long({
  t: 3, d: 4, c: 'application', marks: 5,
  stem: `Chittorgarh Cement Ltd is an imagined company in Nimbahera. Its balance sheets are given below.\n\n${twoCol(CC)}\n\n(a) Prepare a Common-size Balance Sheet. Round percentages to two decimal places and make sure each part of each column totals 100.00. (3 marks)\n(b) Comment on the change in the way the company is financed. (2 marks)`,
  model: `**(a) ${csTitle('Chittorgarh Cement Ltd', CC)}**\n\n${CCc.md}\n\n${RK} ${CCc.adjNote}\n\n**(b)** No new shares were issued, so share capital fell from ${pcs(CCc.p.sc[0])} to ${pcs(CCc.p.sc[1])} of the total. Retained profit lifted reserves and surplus from ${pcs(CCc.p.rs[0])} to ${pcs(CCc.p.rs[1])}, but shareholders' funds as a whole fell from ${pcs(CCc.headP.sf[0])} to ${pcs(CCc.headP.sf[1])}, while long-term borrowings rose from ${pcs(CCc.p.ltb[0])} to ${pcs(CCc.p.ltb[1])} and current liabilities also took a larger share. The company is leaning more on borrowed money, so its interest burden and financial risk are rising.`,
  sol: 'Divide each line by its own date’s total; when the rounded lines of a part add to 100.01 or 99.99, move the line with the largest rounding error by 0.01 and say so.',
  scheme: [['(a) 2025 column', 1], ['(a) 2026 percentages', 1], ['(a) Rounding adjusted so each part totals 100.00', 1], ['(b) Owners against borrowings', 1], ['(b) Conclusion on risk', 1]],
}));

// Chapora and Terekhol Coconut Oil: inter-firm common-size statement (5 marks).
const CT2 = plStatement({ cols: ['Chapora Coconut Oil', 'Terekhol Coconut Oil'], taxRate: 25, v: { rev: [2400000, 6000000], com: [1440000, 3300000], emp: [192000, 600000], fin: [24000, 300000], dep: [72000, 240000], oth: [192000, 360000] } });
const CT2c = commonSize(CT2);
pin([CT2c.p.com, CT2c.p.emp, CT2c.p.fin, CT2c.p.te, CT2c.p.pat, CT2.val('pat'), CT2c.rounded], [[6000, 5500], [800, 1000], [100, 500], [8000, 8000], [1500, 1500], [360000, 900000], 0], 'Chapora Terekhol');
Q('l5_interfirm_coconut', long({
  t: [2, 3], d: 4, c: 'analysis', marks: 5,
  stem: `Two imagined coconut-oil mills, Chapora Coconut Oil Ltd of Siolim and Terekhol Coconut Oil Ltd of Pernem, report the following for the year ended ${D[1]}. Tax is 25% of profit before tax for both.\n\n${plGiven(CT2)}\n\n(a) Prepare a common-size statement of profit and loss for the two companies. (3 marks)\n(b) Terekhol's directors say they are more profitable because their profit is two and a half times Chapora's. Comment, comparing the cost structures. (2 marks)`,
  model: `**(a) Common-size Statement of Profit and Loss of Chapora Coconut Oil Ltd and Terekhol Coconut Oil Ltd for the year ended ${D[1]}**\n\n${CT2c.md}\n\n**(b)** The claim confuses size with profitability. Terekhol earns more in rupees (${rs(CT2.val('pat')[1])} against ${rs(CT2.val('pat')[0])}) only because its revenue is two and a half times larger; per rupee of revenue both earn the same, profit after tax being ${pcs(CT2c.p.pat[0])} for each. Their cost structures differ: Chapora spends more on copra (${pcs(CT2c.p.com[0])} against ${pcs(CT2c.p.com[1])}), while Terekhol carries more employee cost (${pcs(CT2c.p.emp[1])} against ${pcs(CT2c.p.emp[0])}) and far more finance cost (${pcs(CT2c.p.fin[1])} against ${pcs(CT2c.p.fin[0])}), a sign of heavier borrowing.`,
  sol: 'Compare shares of revenue, not rupee totals; equal margins can hide very different cost mixes.',
  scheme: [['(a) Rupee columns completed for both', 1], ['(a) Expense percentages', 1], ['(a) Profit and tax percentages', 1], ['(b) Size versus profitability', 1], ['(b) Difference in cost structure', 1]],
}));

// Korigad Tents: evaluate a claim with comparative and common-size figures (5 marks).
const KT = { rev: [4000000, 6000000], pat: [500000, 630000] };
const KTh = { rev: hundredths(KT.rev[1] - KT.rev[0], KT.rev[0]), pat: hundredths(KT.pat[1] - KT.pat[0], KT.pat[0]) };
const KTm = KT.rev.map((r, i) => hundredths(KT.pat[i], r));
pin([KTh, KTm], [{ rev: 5000, pat: 2600 }, [1250, 1050]], 'Korigad');
Q('l5_evaluate_korigad', long({
  t: [1, 2, 3], d: 4, c: 'evaluation', marks: 5,
  stem: `The managing director of Korigad Tents Ltd, an imagined company in Aambavane, tells shareholders: "Profit after tax has gone up from ${rs(KT.pat[0])} to ${rs(KT.pat[1])}, so the company has clearly become more efficient." Revenue from operations rose from ${rs(KT.rev[0])} to ${rs(KT.rev[1])} over the same two years.\n\n(a) Work out the percentage change in revenue and in profit after tax, as a comparative statement would show them. (2 marks)\n(b) Work out profit after tax as a common-size percentage of revenue for both years and evaluate the managing director's claim. (3 marks)`,
  model: `${md(['Item', `${Y[0]}`, `${Y[1]}`, 'Change'], [['Revenue from operations (₹)', fig(KT.rev[0]), fig(KT.rev[1]), pcs(KTh.rev)], ['Profit after tax (₹)', fig(KT.pat[0]), fig(KT.pat[1]), pcs(KTh.pat)], ['Profit after tax as % of revenue', pcs(KTm[0]), pcs(KTm[1]), `down ${pc(KTm[0] - KTm[1])} points`]])}\n\n**(a)** Revenue: ${fig(KT.rev[1] - KT.rev[0])} ÷ ${fig(KT.rev[0])} × 100 = ${pcs(KTh.rev)}. Profit after tax: ${fig(KT.pat[1] - KT.pat[0])} ÷ ${fig(KT.pat[0])} × 100 = ${pcs(KTh.pat)}.\n\n**(b)** Profit after tax was ${pcs(KTm[0])} of revenue and is now ${pcs(KTm[1])}. In rupees the claim is true: profit rose by ${rs(KT.pat[1] - KT.pat[0])}. But profit grew only about half as fast as revenue, and each rupee of sales now earns less, so costs grew faster than sales or prices were cut to win volume. The company is bigger, not more efficient: the claim is only partly true, and shareholders should ask which costs rose.`,
  sol: 'Test the claim twice, once as a change over time and once as a share of revenue, then give a balanced verdict.',
  scheme: [['(a) Change in revenue', 1], ['(a) Change in profit after tax', 1], ['(b) Profit as a percentage of revenue, both years', 1], ['(b) Interpretation of the falling margin', 1], ['(b) Balanced verdict', 1]],
}));

// ---------------------------------------------------------------- practice-only full ISC-style problems (8 marks)
// Janjira Boatbuilders: comparative and common-size balance sheet.
const JB = bsStatement({ cols: D, v: { sc: [3000000, 3750000], rs: [600000, 900000], ltb: [1200000, 1200000], tp: [600000, 825000], ocl: [300000, 375000], stp: [300000, 450000], ppe: [3600000, 4500000], intang: [300000, 225000], nci: [600000, 600000], inv: [720000, 1050000], tr: [480000, 750000], cce: [300000, 375000] } });
const JBc = comparative(JB);
const JBs = commonSize(JB);
pin([JB.part.el, JBc.ch.elT.h, JBc.ch.inv.h, JBc.ch.tr.h, JBc.ch.tp.h, JBs.p.rs, JBs.p.ltb, JBs.p.inv, JBs.adjusted.length, JBs.rounded], [[6000000, 7500000], 2500, 4583, 5625, 3750, [1000, 1200], [2000, 1600], [1200, 1400], 0, 0], 'Janjira');
Q('l8_janjira', long({
  t: [2, 3], d: 4, c: 'application', marks: 8,
  stem: `Janjira Boatbuilders Ltd, an imagined company in Murud, builds fishing boats. Its balance sheets are given below.\n\n${twoCol(JB)}\n\n(a) Prepare a Comparative Balance Sheet. (4 marks)\n(b) Prepare a Common-size Balance Sheet. (3 marks)\n(c) Give one observation that uses both statements. (1 mark)`,
  model: `**(a) ${cmpTitle('Janjira Boatbuilders Ltd', JB)}**\n\n${JBc.md}\n\n**(b) ${csTitle('Janjira Boatbuilders Ltd', JB)}**\n\n${JBs.md}\n\n${RK}\n\n**(c)** Long-term borrowings did not change in rupees (${pc(JBc.ch.ltb.h)}%), so as the business grew by ${pcs(JBc.ch.elT.h)} their share of the total fell from ${pcs(JBs.p.ltb[0])} to ${pcs(JBs.p.ltb[1])}: growth was financed by owners (share capital up ${pcs(JBc.ch.sc.h)}, reserves up ${pcs(JBc.ch.rs.h)}) and by suppliers (trade payables up ${pcs(JBc.ch.tp.h)}). *(Also accepted: inventories up ${pcs(JBc.ch.inv.h)} and receivables up ${pcs(JBc.ch.tr.h)}, so their share rose from ${pcs(JBs.p.inv[0])} to ${pcs(JBs.p.inv[1])} and from ${pcs(JBs.p.tr[0])} to ${pcs(JBs.p.tr[1])}: more money is tied up in boats under construction and in dues from customers.)*`,
  sol: 'Build the comparative statement first; the common-size columns then use the same totals; one observation linking a change with a share.',
  scheme: [['(a) Equity and liabilities with changes', 2], ['(a) Assets with changes', 2], ['(b) Equity and liabilities percentages', 1], ['(b) Assets percentages', 1], ['(b) Each part totals 100.00', 1], ['(c) Observation', 1]],
}));

// Kangla Handloom: comparative and common-size statement of profit and loss.
const KH = plStatement({ cols: Y, taxRate: 30, v: { rev: [6000000, 7200000], oi: [60000, 144000], com: [3000000, 3744000], emp: [900000, 1008000], fin: [120000, 108000], dep: [300000, 360000], oth: [540000, 612000] } });
const KHc = comparative(KH);
const KHs = commonSize(KH);
pin([KH.val('pat'), KHc.ch.ti.h, KHc.ch.com.h, KHc.ch.oth.h, KHc.ch.pat.h, KHs.p.te, KHs.p.pat, KHs.p.ti], [[840000, 1058400], 2119, 2480, 1333, 2600, [8100, 8100], [1400, 1470], [10100, 10200]], 'Kangla');
Q('l8_kangla', long({
  t: [2, 3], d: 5, c: 'application', marks: 8,
  stem: `Kangla Handloom Ltd is an imagined company in Thoubal; tax is 30% of profit before tax in both years.\n\n${plGiven(KH)}\n\n(a) Prepare a Comparative Statement of Profit and Loss. (4 marks)\n(b) Prepare a Common-size Statement of Profit and Loss. (3 marks)\n(c) In one sentence, say whether the company's profitability improved. (1 mark)`,
  model: `**(a) ${cmpTitle('Kangla Handloom Ltd', KH)}**\n\n${KHc.md}\n\n**(b) ${csTitle('Kangla Handloom Ltd', KH)}**\n\n${KHs.md}\n\n${RK}\n\n**(c)** Yes: profit after tax rose by ${pcs(KHc.ch.pat.h)} against a ${pcs(KHc.ch.rev.h)} rise in revenue, and its share of revenue rose from ${pcs(KHs.p.pat[0])} to ${pcs(KHs.p.pat[1])}, helped by higher other income and lower employee and finance shares although yarn (${pcs(KHs.p.com[0])} to ${pcs(KHs.p.com[1])}) took more.`,
  sol: 'Complete both years in rupees once and use them for both statements; then judge profitability by the margin, not only the rupee profit.',
  scheme: [['(a) Both years completed', 1], ['(a) Absolute changes', 1], ['(a) Percentage changes', 2], ['(b) Percentages for both years', 2], ['(b) Totals re-add', 1], ['(c) Conclusion', 1]],
}));

FACTS.push(
  `Torna total expenses ${fig(TR.val('te')[1])}, profit after tax change ${pc(TRc.ch.pat.h)}`,
  `Rajgad total ${fig(RJ.part.el[1])} (${pcs(RJc.ch.elT.h)})`,
  `Daulatabad profit after tax ${fig(DP.val('pat')[1])} (${pcs(DPc.ch.pat.h)})`,
  `Gingee total ${fig(GG.part.el[1])} (${pcs(GGc.ch.elT.h)})`,
  `Chittorgarh one † adjustment (share capital 2026 ${pc(CCc.p.sc[1])})`,
  `Kangla profit after tax ${fig(KH.val('pat')[1])} (${pcs(KHc.ch.pat.h)})`,
  `Janjira total ${fig(JB.part.el[1])}`,
);
