// CBSE 12 Accountancy, ch11 Cash Flow Statement — question bank. Every company and figure is imagined by
// SOYL; no NCERT illustration or exercise and no CBSE sample/past-paper item is reused.
// Every figure is computed in acc.mjs from the givens: full statements run through cashFlow() (both balance
// sheets balance, every working account balances, every balance sheet line is consumed, and A + B + C must
// equal closing minus opening cash and cash equivalents); partial items use the same fixedAsset(),
// investAccount(), taxAccount(), operating() and section() builders. Keys and model answers are built from
// the computed values; hand-checked pins catch a wrong datum.
import { Q, mcq, ar, tf, fb, match, num, short, long } from './lib.mjs';
import { fig, rs, sum, md, bold, check, pctOf, given, fixedAsset, investAccount, taxAccount, operating, section, stmtTable, cashFlow } from './acc.mjs';

const FACTS = [];
const pinv = (v, want, what) => { check(v === want, `${what}: computed ${v}, expected ${want}`); return v; };
/** "a + b − c = d" from signed terms, asserted. */
const chain = (terms, total, what) => {
  check(sum(terms) === total, `${what}: chain`);
  return `${terms.map((v, i) => (i === 0 ? fig(v) : v < 0 ? `− ${fig(-v)}` : `+ ${fig(v)}`)).join(' ')} = ${fig(total)}`;
};
const bullets = (xs) => xs.map((x) => `- ${x}`).join('\n');

// ================================================================ t01 Meaning, objectives, cash and cash equivalents
Q('m_objective', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'The board of an imagined company, Siang Tea Estates Ltd, asks its accountant why a cash flow statement is prepared in addition to the Statement of Profit and Loss. The main purpose of the cash flow statement is to show',
  opts: ['where cash and cash equivalents came from and how they were used during the period, activity by activity', 'how much profit the company earned during the year after tax', 'the financial position of the company on the last day of the year', 'how the profit for the year has been divided between dividend and reserves'],
  sol: 'Profit is measured on the accrual basis; the cash flow statement explains the movement in cash and cash equivalents by operating, investing and financing activities. The other options describe the Statement of Profit and Loss, the balance sheet and the appropriation of profit.',
}));

const TB = [
  ['A 91-day treasury bill bought on the day it was issued', true],
  ['Equity shares of a listed company bought to be sold next month', false],
  ['A bank fixed deposit that had five months to run when it was made', false],
  ['Trade receivables falling due within thirty days', false],
];
Q('m_cce_tbill', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Kosi Cables Ltd, an imagined company in Purnia, holds the following at the year end. Which one is a cash equivalent under Accounting Standard 3?',
  opts: TB.filter((x) => x[1]).concat(TB.filter((x) => !x[1])).map((x) => x[0]),
  sol: 'A cash equivalent is a short-term, highly liquid investment, readily convertible into a known amount of cash and subject to an insignificant risk of change in value, usually with a maturity of three months or less from the date of acquisition. Shares carry price risk, a five-month deposit is too long, and receivables are not investments.',
}));

Q('m_not_flow', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'During March, an imagined company, Teesta Valley Packaging Ltd, carried out four transactions through its bank account. Which one will NOT appear as a cash flow in its cash flow statement?',
  opts: ['Buying 60-day commercial paper with surplus money in its current account', 'Paying its suppliers for packaging film bought on credit', 'Buying a new printing machine for its factory', 'Paying the final dividend for the previous year'],
  sol: 'Moving money from cash into a cash equivalent changes only the make-up of cash and cash equivalents, not their total, so AS 3 does not treat it as a cash flow. The other three are operating, investing and financing outflows.',
}));

Q('m_noncash', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Sharavati Power Tools Ltd, an imagined company in Shivamogga, took over a warehouse worth ₹6,00,000 from its owner and paid him entirely in fully paid equity shares. In the cash flow statement this transaction is',
  opts: ['left out of all three activities, because no cash or cash equivalent changed hands', 'shown as an investing outflow and a financing inflow of ₹6,00,000 each', 'shown only as an investing outflow of ₹6,00,000', 'shown only as a financing inflow of ₹6,00,000'],
  sol: 'Investing and financing transactions that do not use cash or cash equivalents are excluded from the statement; they are disclosed elsewhere in the financial statements.',
}));

Q('tf_profit_cash', tf({
  t: 1, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? An imagined trading company, Rupnarayan Jute Traders Ltd, can report a healthy net profit for a year and still end the year with less cash and cash equivalents than it started with.',
  sol: 'Profit is earned on the accrual basis; cash can still fall if customers have not paid, stock has piled up, assets were bought or loans were repaid. That gap is exactly what the cash flow statement explains.',
}));

Q('tf_shares_ce', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? Listed equity shares that an imagined company, Dhansiri Rubber Products Ltd, can sell on the stock exchange within a day are cash equivalents, because they are readily marketable.',
  sol: 'Being easy to sell is not enough. Equity shares can change in value significantly and have no maturity date, so they fail the "insignificant risk of change in value" test of a cash equivalent.',
}));

Q('fb_three_months', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'An investment is normally treated as a cash equivalent only if it has a short maturity, of ___ months or less from the date of acquisition.',
  acc: [['three', '3']],
  sol: 'Accounting Standard 3 takes three months or less from the date of acquisition as the usual test of a short maturity.',
}));

Q('fb_as3', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'In India, the cash flow statement of a company is prepared according to Accounting Standard ___ (Cash Flow Statements).',
  acc: [['3', 'three', 'AS 3']],
  sol: 'Accounting Standard 3, Cash Flow Statements, issued by the Institute of Chartered Accountants of India, sets out how the statement is prepared and classified.',
}));

Q('ar_ce_risk', ar({
  t: 1, d: 3, c: 'understanding', key: 'a',
  a: 'Equity shares held by a company are not treated as cash equivalents even if they can be sold quickly.',
  r: 'A cash equivalent must be subject to an insignificant risk of change in value.',
  sol: 'Both are true, and R explains A: share prices move, so the amount of cash the shares will fetch is not known in advance.',
}));

Q('ar_noncash', ar({
  t: 1, d: 2, c: 'understanding', key: 'a',
  a: 'An issue of fully paid bonus shares out of the general reserve does not appear in the cash flow statement.',
  r: 'Transactions that do not require the use of cash or cash equivalents are excluded from the cash flow statement.',
  sol: 'Both are true and R is the reason for A: a bonus issue only moves an amount from reserves to share capital, with no cash received or paid.',
}));

// Netravati: cash and cash equivalents from a list.
const NC = [
  ['Cash in hand', 25000, true],
  ['Balance in current account with a bank', 135000, true],
  ['91-day treasury bills bought on their issue date', 60000, true],
  ['Fixed deposit with a bank, maturity one year', 200000, false],
  ['Commercial paper with 80 days to maturity when acquired', 40000, true],
  ['Equity shares of a listed company', 75000, false],
];
const NC_cce = pinv(sum(NC.filter((x) => x[2]).map((x) => x[1])), 260000, 'Netravati cce');
Q('n_cce', num({
  t: 1, d: 2, c: 'application', marks: 2, value: NC_cce, unit: '₹',
  stem: `Netravati Cashew Exports Ltd, an imagined company in Mangaluru, holds the following on 31 March 2026. How much of it is cash and cash equivalents (in ₹)?\n\n${given(NC.map((x) => [x[0], x[1]]))}`,
  sol: `Cash and cash equivalents = ${NC.filter((x) => x[2]).map((x) => fig(x[1])).join(' + ')} = ${fig(NC_cce)}, that is ₹${fig(NC_cce)}. The one-year deposit is too long and the shares carry price risk, so both are left out.`,
  scheme: [['Four qualifying items picked out', 1], [`Total ${rs(NC_cce)}`, 1]],
}));

const SS = [
  ['Petty cash', 6000, 'cash'],
  ['Balance with a bank in current account', 94000, 'cash'],
  ['Bank deposit for 30 days', 50000, 'equivalent: short maturity, fixed amount'],
  ['Bank deposit for six months', 120000, 'not included: maturity longer than three months'],
  ['Units of an overnight money-market fund', 30000, 'equivalent: highly liquid, insignificant risk of change in value'],
  ['Trade receivables', 80000, 'not included: an operating asset, not an investment'],
  ['Equity shares held as a short-term investment', 45000, 'not included: risk of change in value'],
];
const SS_cce = pinv(sum(SS.filter((x) => !x[2].startsWith('not')).map((x) => x[1])), 180000, 'Shetrunji cce');
Q('s3_cce_identify', short({
  t: 1, d: 3, c: 'application', marks: 3,
  stem: `The cashier of Shetrunji Salt Works Ltd, an imagined company in Bhavnagar, has listed what the company holds on 31 March 2026. Identify, with a reason for each, which items form part of cash and cash equivalents, and find their total.\n\n${given(SS.map((x) => [x[0], x[1]]))}`,
  model: `${md(['Item', '₹', 'Treatment'], SS.map(([l, v, w]) => [l, fig(v), w.startsWith('not') ? w.replace('not included', '**Not included**') : `**Included** (${w})`]), [1])}\n\n**Cash and cash equivalents** = ${SS.filter((x) => !x[2].startsWith('not')).map((x) => fig(x[1])).join(' + ')} = **${rs(SS_cce)}**.`,
  sol: 'Test each item against the three conditions: short maturity (three months or less), readily convertible into a known amount, insignificant risk of change in value.',
  scheme: [['Included items identified with reasons', 1], ['Excluded items identified with reasons', 1], [`Total ${rs(SS_cce)}`, 1]],
}));

Q('s3_objectives', short({
  t: 1, d: 2, c: 'understanding', marks: 3,
  stem: 'The owner-directors of an imagined family company, Kapila Silk Weavers Ltd, say: "We already prepare a Statement of Profit and Loss; a cash flow statement adds nothing." State any three objectives or uses of a cash flow statement that answer them.',
  model: '1. **Explains the change in cash:** it shows, activity by activity, how cash and cash equivalents were generated and spent, which the accrual-based profit figure cannot show.\n2. **Judges the ability to generate cash:** cash from operating activities shows whether the business can pay suppliers, staff, interest, tax and dividends from its own trading, without borrowing or selling assets.\n3. **Helps planning and decisions:** past flows help to forecast future cash needs, to plan repayment of loans and to decide on new investment and dividend policy.\n4. *(Also accepted)* It allows comparison of cash performance between years and firms, since cash figures are not affected by different accounting policies; it helps lenders and investors judge liquidity.',
  sol: 'Give three distinct objectives, each with a line on why the profit statement alone does not meet it.',
  scheme: [['First objective explained', 1], ['Second objective explained', 1], ['Third objective explained', 1]],
}));

Q('s3_noncash', short({
  t: [1, 2], d: 3, c: 'analysis', marks: 3,
  stem: `An imagined company, Mahananda Agro Exports Ltd, Siliguri, had these three transactions in 2025-26. Its trainee accountant has shown each of them in the cash flow statement. Explain why none of them should appear there as a cash flow.\n\n(i) Issued equity shares of ${rs(500000)} to the seller of a cold-storage building as the purchase price.\n(ii) Issued bonus shares of ${rs(200000)} out of the general reserve.\n(iii) Bought 60-day treasury bills for ${rs(100000)} by cheque from its current account.`,
  model: '**(i) Shares issued for a building:** an investing transaction (buying an asset) and a financing transaction (issuing shares), but no cash moves. It is a **non-cash transaction**, excluded from the statement and disclosed in the notes.\n\n**(ii) Bonus shares from reserve:** an amount is only transferred from the general reserve to share capital; nothing is received or paid. It is also a **non-cash** item.\n\n**(iii) Treasury bills bought by cheque:** treasury bills of 60 days are themselves a **cash equivalent**. Money has moved from cash at bank into a cash equivalent; the total of cash and cash equivalents is unchanged, so it is **not a cash flow**.',
  sol: 'For each item ask two questions: did cash or a cash equivalent leave or enter the business, and did the total of cash and cash equivalents change?',
  scheme: [['(i) Non-cash investing and financing transaction', 1], ['(ii) Bonus issue is a book transfer', 1], ['(iii) Movement within cash and cash equivalents', 1]],
}));

Q('l4_meaning', long({
  t: 1, d: 2, c: 'understanding', marks: 4,
  stem: 'A Class 12 student preparing a project on an imagined company, Pench Furnishings Ltd, has to explain four terms in her introduction. Explain the meaning of (a) a cash flow statement, (b) cash, (c) cash equivalents and (d) cash flows, giving an example of each where you can.',
  model: '**(a) Cash flow statement:** a statement, prepared under Accounting Standard 3, that shows the inflows and outflows of cash and cash equivalents of an enterprise during a period, classified into operating, investing and financing activities, and reconciles the opening and closing balances. Example: Pench Furnishings reports that its cash rose by a stated amount because its trading brought in more than it spent on new machines.\n\n**(b) Cash:** cash on hand and demand deposits with banks. Example: notes in the cash box and the current-account balance.\n\n**(c) Cash equivalents:** short-term, highly liquid investments that are readily convertible into known amounts of cash and are subject to an insignificant risk of change in value, generally maturing within three months of acquisition. Example: a 91-day treasury bill bought on issue.\n\n**(d) Cash flows:** inflows and outflows of cash and cash equivalents. Example: money received from a customer is an inflow; wages paid are an outflow. A movement between cash and a cash equivalent (buying a treasury bill with cash) is not a cash flow.',
  sol: 'Define each term in the words of the standard and add a concrete example; note that switching between cash and cash equivalents is not a cash flow.',
  scheme: [['(a) Meaning of a cash flow statement', 1], ['(b) Cash, with example', 1], ['(c) Cash equivalents with the three-month test', 1], ['(d) Cash flows, with example', 1]],
}));

// ================================================================ t02 Classification of activities
Q('m_int_paid', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Damanganga Polymers Ltd, an imagined plastics manufacturer in Vapi, paid interest on its 9% debentures during the year. In its cash flow statement the interest paid is shown under',
  opts: ['financing activities', 'operating activities', 'investing activities', 'none of the activities, being a non-cash charge'],
  sol: 'For an enterprise that is not a financial enterprise, interest paid is a cost of obtaining finance, so it is a financing outflow; in the indirect method it is first added back to net profit before tax.',
}));

Q('m_div_recv', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Hiran Marble Works Ltd, an imagined company in Jabalpur, received a dividend on the shares of another company that it holds as a long-term investment. For Hiran, this dividend received is',
  opts: ['an investing inflow', 'an operating inflow', 'a financing inflow', 'a reduction of financing outflows'],
  sol: 'For a non-financial company, interest and dividend received are returns on its investments and are classified as investing activities.',
}));

Q('m_tax_paid', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Purna Dairy Products Ltd, an imagined company in Parbhani, paid its income tax for the year in instalments. Unless the tax can be specifically identified with another activity, the tax paid is shown as',
  opts: ['an outflow under operating activities', 'an outflow under financing activities', 'an outflow under investing activities', 'an appropriation, not shown in the cash flow statement'],
  sol: 'Taxes on income arise from the operations that earn the profit, and it is usually impracticable to split them among activities, so AS 3 classifies them as operating unless specifically identified with investing or financing.',
}));

Q('m_fin_co', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'Kali Sindh Finance Ltd, an imagined company in Jhalawar, is a finance company whose main business is lending money to farmers. Interest received by it on these loans is classified as',
  opts: ['an operating activity', 'an investing activity', 'a financing activity', 'an operating activity only if received in cash on the due date'],
  sol: 'For a financial enterprise, lending and earning interest is its principal revenue-producing activity, so interest received (and interest paid, and dividend received) are operating; dividend paid is still financing.',
}));

Q('m_advance', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'Wainganga Paper Ltd, an imagined paper manufacturer, lent ₹3,00,000 for two years to Kanher Pulp Ltd, an imagined supplier, to help it modernise. In the cash flow statement of Wainganga Paper (not a financial enterprise), the loan given is',
  opts: ['an outflow under investing activities', 'an outflow under operating activities', 'an outflow under financing activities', 'not shown, because it will be repaid'],
  sol: 'Cash advances and loans made to other parties by an enterprise that is not a financial enterprise are investing activities; their repayment later is an investing inflow.',
}));

Q('m_van_sale', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Subansiri Couriers Ltd, an imagined courier company in North Lakhimpur, sold one of its old delivery vans for cash. The sale proceeds are shown in its cash flow statement under',
  opts: ['investing activities', 'operating activities, since vans are used in daily deliveries', 'financing activities', 'operating activities as a non-cash adjustment'],
  sol: 'Acquiring and disposing of long-term assets such as vehicles are investing activities, even when the asset is used in daily operations; any profit or loss on the sale is adjusted in the operating section.',
}));

Q('mt_activities', match({
  t: 2, d: 2, c: 'understanding', marks: 2,
  stem: 'A student is classifying four cash transactions of an imagined manufacturer, Sarju Steel Furniture Ltd. Match each transaction in column A with its class in column B.',
  pairs: [
    ['Cash paid to suppliers of steel sheets', 'Operating activity'],
    ['Cash paid for a new welding machine', 'Investing activity'],
    ['Cash received from an issue of debentures', 'Financing activity'],
    ['Purchase of 45-day treasury bills with cash', 'Not a cash flow (movement within cash equivalents)'],
  ],
  sol: 'Day-to-day trading is operating; long-term assets are investing; changes in owners’ capital and borrowings are financing; a switch between cash and cash equivalents is not a flow at all.',
}));

Q('tf_sale_inv', tf({
  t: 2, d: 1, c: 'recall', ans: true,
  stem: 'True or false? Cash received by an imagined cement company, Bhima Cements Ltd, from selling shares of another company that it had held as a long-term investment is an investing inflow.',
  sol: 'Acquisition and disposal of investments other than cash equivalents (and other than trading stock) are investing activities.',
}));

Q('ar_div_paid', ar({
  t: 2, d: 3, c: 'analysis', key: 'b',
  a: 'Dividend paid by a bank to its shareholders is shown under financing activities.',
  r: 'For a financial enterprise such as a bank, interest received and dividend received are operating activities.',
  sol: 'Both are true, but R does not explain A. A is true because dividend paid is a return to providers of capital for every kind of enterprise; R is about receipts, which for a financial enterprise come from its main business.',
}));

Q('ar_tax', ar({
  t: 2, d: 3, c: 'analysis', key: 'b',
  a: 'Income tax paid by a manufacturing company is generally classified as an operating activity.',
  r: 'Income tax is calculated on the profit before tax shown in the Statement of Profit and Loss.',
  sol: 'Both are true, but R is not the reason for A. The tax is classed as operating because it arises from the operations that earn the profit and is usually impracticable to identify with investing or financing activities.',
}));

const PF = [
  ['Purchase of goodwill of a small rival business', 'Investing'],
  ['Cash paid to suppliers of timber', 'Operating'],
  ['Issue of 10% debentures for cash', 'Financing'],
  ['Royalty received for a furniture design licensed to another maker', 'Operating'],
  ['Interim dividend paid to shareholders', 'Financing'],
  ['Loan given to another company (the company is not a financial enterprise)', 'Investing'],
];
Q('s3_classify6', short({
  t: 2, d: 2, c: 'application', marks: 3,
  stem: `Classify the following cash transactions of Pench Furnishings Ltd, an imagined furniture maker in Chhindwara, into operating, investing and financing activities:\n\n${PF.map((x, i) => `(${i + 1}) ${x[0]}.`).join('\n')}`,
  model: md(['Transaction', 'Activity'], PF.map(([l, a]) => [l, bold(a)])),
  sol: 'Ask whether each item is part of trading (operating), relates to long-term assets or investments (investing), or changes the owners’ capital or borrowings (financing). Royalties and fees are trading receipts.',
  scheme: PF.map((x, i) => [`(${i + 1}) ${x[1]}`, 0.5]),
}));

Q('s3_fin_vs_nonfin', short({
  t: 2, d: 3, c: 'understanding', marks: 3,
  stem: 'Two imagined companies share a building in Pune: Mula Gears Ltd, which makes gearboxes, and Mutha Housing Finance Ltd, which lends to home buyers. Show how each company would classify (i) interest received, (ii) dividend received, (iii) interest paid and (iv) dividend paid, and give the reason for the difference.',
  model: `${md(['Item', 'Mula Gears Ltd (not a financial enterprise)', 'Mutha Housing Finance Ltd (financial enterprise)'], [
    ['(i) Interest received', 'Investing', 'Operating'],
    ['(ii) Dividend received', 'Investing', 'Operating'],
    ['(iii) Interest paid', 'Financing', 'Operating'],
    ['(iv) Dividend paid', 'Financing', 'Financing'],
  ])}\n\n**Reason:** for a lender, borrowing, lending and earning interest are its principal revenue-producing activities, so these flows are operating. For a manufacturer they are returns on investments or costs of finance. Dividend paid is a return to shareholders in both cases.`,
  sol: 'Fill the grid one enterprise at a time, then explain why the principal business of a lender changes the class of interest and dividend receipts and of interest paid.',
  scheme: [['Manufacturer: all four correct', 1], ['Finance company: all four correct', 1], ['Reason for the difference', 1]],
}));

// Sharavati list: net cash used in investing.
const SH_L = [
  ['Purchase of machinery', -320000, 'B'],
  ['Sale of old machinery (book value ₹50,000)', 45000, 'B'],
  ['Purchase of patents', -60000, 'B'],
  ['Sale of non-current investments', 110000, 'B'],
  ['Interest received on debentures held as investment', 18000, 'B'],
  ['Dividend received on shares held as investment', 7000, 'B'],
  ['Dividend paid to shareholders', -50000, 'C'],
  ['Income tax paid', -40000, 'A'],
];
const SH_B = sum(SH_L.filter((x) => x[2] === 'B').map((x) => x[1]));
pinv(SH_B, -200000, 'Sharavati investing');
Q('n_investing_list', num({
  t: 2, d: 3, c: 'application', marks: 2, value: -SH_B, unit: '₹',
  stem: `Sharavati Tools and Dies Ltd, an imagined engineering company, had these cash flows in 2025-26. Find its net cash used in investing activities (write the amount without a minus sign).\n\n${md(['Cash flow', '₹'], SH_L.map(([l, v]) => [l, fig(Math.abs(v))]), [1])}`,
  sol: `Investing items only: ${chain(SH_L.filter((x) => x[2] === 'B').map((x) => x[1]), SH_B, 'Sharavati')}; net cash used in investing activities = ₹${fig(-SH_B)}. Dividend paid is financing and tax paid is operating; the book value of the machine sold is not a cash flow.`,
  scheme: [['Investing items selected with correct signs', 1], [`Net outflow ${rs(-SH_B)}`, 1]],
}));

const KS_L = [
  ['Issue of equity shares at a premium of ₹40,000 (face value ₹4,00,000)', 440000, 'C'],
  ['Repayment of a long-term bank loan', -150000, 'C'],
  ['Interest paid on the long-term loan', -27000, 'C'],
  ['Final dividend paid', -80000, 'C'],
  ['Short-term bank loan raised', 50000, 'C'],
  ['Interest received on fixed deposits held as investment', 12000, 'B'],
  ['Purchase of looms', -210000, 'B'],
];
const KS_C = pinv(sum(KS_L.filter((x) => x[2] === 'C').map((x) => x[1])), 233000, 'Kapila financing');
Q('n_financing_list', num({
  t: 2, d: 3, c: 'application', marks: 2, value: KS_C, unit: '₹',
  stem: `Kapila Silk Mills Ltd, an imagined company in Nanjangud, gives the following cash transactions for 2025-26. Calculate its net cash from financing activities.\n\n${md(['Transaction', '₹'], KS_L.map(([l, v]) => [l, fig(Math.abs(v))]), [1])}`,
  sol: `Financing items: ${chain(KS_L.filter((x) => x[2] === 'C').map((x) => x[1]), KS_C, 'Kapila')}, that is ₹${fig(KS_C)}. Interest received is investing for a non-financial company, and the looms are an investing outflow.`,
  scheme: [['Financing items selected with correct signs', 1], [`Net inflow ${rs(KS_C)}`, 1]],
}));

const SJ = [
  ['(i) Bought a delivery van', -350000, 'Investing'],
  ['(ii) Issued equity shares for cash', 500000, 'Financing'],
  ['(iii) Received interest on investments', 20000, 'Investing'],
  ['(iv) Paid the final dividend', -90000, 'Financing'],
  ['(v) Sold old machinery', 60000, 'Investing'],
  ['(vi) Paid wages to factory workers', -110000, 'Operating'],
  ['(vii) Repaid part of a long-term bank loan', -100000, 'Financing'],
  ['(viii) Paid income tax', -45000, 'Operating'],
];
const SJ_B = pinv(sum(SJ.filter((x) => x[2] === 'Investing').map((x) => x[1])), -270000, 'Sarju B');
const SJ_C = pinv(sum(SJ.filter((x) => x[2] === 'Financing').map((x) => x[1])), 310000, 'Sarju C');
Q('l4_classify8', long({
  t: 2, d: 3, c: 'application', marks: 4,
  stem: `Sarju Steel Almirahs Ltd, an imagined manufacturer in Ayodhya, recorded the following cash transactions in 2025-26. Classify each into operating, investing or financing activities, and compute the net cash flow from investing activities and from financing activities.\n\n${md(['Transaction', '₹'], SJ.map(([l, v]) => [l, fig(Math.abs(v))]), [1])}`,
  model: `${md(['Transaction', 'Activity', 'Inflow / (outflow) ₹'], SJ.map(([l, v, a]) => [l, bold(a), fig(v)]), [2])}\n\n- **Net cash used in investing activities** = ${chain(SJ.filter((x) => x[2] === 'Investing').map((x) => x[1]), SJ_B, 'Sarju B')}, an outflow of **${rs(-SJ_B)}**.\n- **Net cash from financing activities** = ${chain(SJ.filter((x) => x[2] === 'Financing').map((x) => x[1]), SJ_C, 'Sarju C')}, an inflow of **${rs(SJ_C)}**.`,
  sol: 'Classify first, attach the sign (inflow or outflow), then add within each class; wages and tax stay in operating activities.',
  scheme: [['Eight classifications (¼ mark each)', 2], [`Investing ${rs(SJ_B)}`, 1], [`Financing ${rs(SJ_C)}`, 1]],
}));

Q('l6_theory', long({
  t: [1, 2], d: 2, c: 'understanding', marks: 6,
  stem: 'Explain to the new finance team of an imagined company, Sabarmati Denim Ltd, Ahmedabad, the three activities into which cash flows are classified under Accounting Standard 3. For each activity give its meaning and two examples of inflows and two of outflows, and state how Sabarmati, a manufacturer, should classify interest and dividends received and paid.',
  model: '**1. Operating activities** — the main activities through which Sabarmati earns its revenue, together with any activity that is neither investing nor financing.\n- Inflows: cash received from customers for denim sold; royalties or commission received.\n- Outflows: cash paid to suppliers of cotton yarn; wages and salaries paid; income tax paid (unless identified with another activity).\n\n**2. Investing activities** — acquisition and disposal of long-term assets and of investments not included in cash equivalents.\n- Inflows: sale proceeds of an old dyeing machine; proceeds from the sale of long-term investments.\n- Outflows: purchase of new looms or land; purchase of shares or debentures of other companies; loans given to other parties.\n\n**3. Financing activities** — transactions that alter the amount and the mix of the capital put in by the owners and of the money borrowed.\n- Inflows: proceeds from issue of equity shares or debentures; long-term loans raised.\n- Outflows: repayment of loans; dividends paid; interest paid.\n\n**Interest and dividends at Sabarmati (not a financial enterprise):** interest and dividend received are **investing** inflows; interest and dividend paid are **financing** outflows.',
  sol: 'Give the standard’s meaning of each activity, then two inflows and two outflows from a denim manufacturer’s own business, and finish with the four interest and dividend items.',
  scheme: [['Operating: meaning and examples', 1.5], ['Investing: meaning and examples', 1.5], ['Financing: meaning and examples', 1.5], ['Interest and dividends received and paid classified', 1.5]],
}));

// ================================================================ t03 Preparation by the indirect method
Q('m_direct', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'The accountant of an imagined company, Shetrunji Ceramics Ltd, prepares the operating section of its cash flow statement by the indirect method, as the CBSE syllabus requires. Her starting figure is',
  opts: ['net profit before tax, which is then adjusted for non-cash items, non-operating items and working-capital changes', 'total cash received from customers, from which cash paid to suppliers and employees is deducted', 'the closing balance of cash and cash equivalents', 'net profit after tax and after transfer to reserves'],
  sol: 'The indirect method works back from net profit before tax to cash generated from operations. Listing gross receipts and payments (the second option) describes the direct method, which is not in the syllabus.',
}));

Q('m_wc_tp', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Between the two balance sheets of an imagined company, Mandakini Herbal Remedies Ltd, trade payables rose by ₹25,000. In computing cash from operating activities by the indirect method, this change is',
  opts: ['added to operating profit, because suppliers have financed part of the purchases and less cash was paid out', 'deducted from operating profit, because liabilities have grown', 'shown under financing activities as borrowing from suppliers', 'ignored, because trade payables are not cash'],
  sol: 'An increase in a current liability means expenses or purchases were charged in the profit figure but not yet paid in cash, so it is added; a decrease would be deducted.',
}));

Q('m_prepaid', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Prepaid expenses of Ken Valley Granites Ltd, an imagined company, fell from ₹18,000 to ₹10,000 during the year. In the operating section of its cash flow statement (indirect method) the change of ₹8,000 is',
  opts: ['added, because part of this year’s expense was paid for in cash last year', 'deducted, because a current asset has fallen', 'added under investing activities', 'deducted from net profit before tax as a non-operating item'],
  sol: 'A decrease in a current asset releases cash or, as here, means an expense charged this year needed no cash this year; so it is added back. An increase in a current asset is deducted.',
}));

Q('m_loss_sale', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Tawa Organics Ltd, an imagined fertiliser company, sold an old tractor with a book value of ₹80,000 for ₹65,000. How is this shown in its cash flow statement (indirect method)?',
  opts: ['Loss of ₹15,000 added back in operating activities; ₹65,000 shown as an investing inflow', 'Loss of ₹15,000 deducted in operating activities; ₹80,000 shown as an investing inflow', '₹65,000 shown as an operating inflow; nothing in investing activities', 'Loss of ₹15,000 added back in operating activities; ₹80,000 shown as an investing inflow'],
  sol: 'The loss was charged in arriving at net profit but is not an operating cash outflow, so it is added back; the cash actually received, the sale price, is the investing inflow.',
}));

const ST = { open: 150000, close: 230000, gr: 40000, div: 60000, tax: 70000 };
const ST_npbt = pinv(ST.close - ST.open + ST.gr + ST.div + ST.tax, 250000, 'Siang NPBT');
Q('m_npbt', mcq({
  t: 3, d: 3, c: 'application',
  stem: `Surplus in the Statement of Profit and Loss of Siang Bamboo Products Ltd, an imagined company, rose from ${rs(ST.open)} to ${rs(ST.close)}. During the year it transferred ${rs(ST.gr)} to general reserve, paid a final dividend of ${rs(ST.div)} and made a provision for tax of ${rs(ST.tax)}. Its net profit before tax is`,
  opts: [rs(ST_npbt), rs(ST_npbt - ST.tax), rs(ST.close - ST.open + ST.tax), rs(ST.close + ST.tax)],
  sol: `Net profit before tax = increase in surplus ${fig(ST.close - ST.open)} + transfer to reserve ${fig(ST.gr)} + dividend ${fig(ST.div)} + provision for tax ${fig(ST.tax)} = ${fig(ST_npbt)}. Leaving out the tax gives profit after tax; leaving out the appropriations understates profit.`,
}));

const RJ = taxAccount({ a: 45000, b: 60000, provided: 75000 });
pinv(RJ.paid, 60000, 'Rupnarayan tax');
Q('m_tax_paid_calc', mcq({
  t: 3, d: 3, c: 'application',
  stem: `The provision for tax of Rupnarayan Jute Mills Ltd, an imagined mill in Howrah, stood at ${rs(RJ.a)} on 1 April 2025 and at ${rs(RJ.b)} on 31 March 2026. The provision made for the year 2025-26 was ${rs(RJ.provided)}. The income tax paid during the year was`,
  opts: [rs(RJ.paid), rs(RJ.provided), rs(RJ.b - RJ.a), rs(RJ.b + RJ.provided)],
  sol: `Provision for tax account: ${fig(RJ.a)} + ${fig(RJ.provided)} − closing ${fig(RJ.b)} = ${fig(RJ.paid)} paid. This tax paid, not the provision, is deducted in the operating section.`,
}));

const DR = fixedAsset({ name: 'machinery', a: 600000, b: 750000, acc: [150000, 190000], sold: { cost: 90000, accDep: 40000, price: 45000 } });
pinv(DR.purchase, 240000, 'Dhansiri purchase');
Q('m_purchase_calc', mcq({
  t: 3, d: 3, c: 'application',
  stem: `Dhansiri Rubber Moulders Ltd, an imagined company in Dimapur, shows machinery at cost of ${rs(DR.a)} on 31 March 2025 and ${rs(DR.b)} on 31 March 2026. During the year a machine that had cost ${rs(DR.sold.cost)} was sold. How much machinery was bought during the year?`,
  opts: [rs(DR.purchase), rs(DR.b - DR.a), rs(DR.b - DR.a - DR.sold.cost), rs(DR.purchase + DR.sold.cost)],
  sol: `In the machinery account at cost: opening ${fig(DR.a)} + purchases − cost of the machine sold ${fig(DR.sold.cost)} = closing ${fig(DR.b)}, so purchases = ${fig(DR.b)} + ${fig(DR.sold.cost)} − ${fig(DR.a)} = ${fig(DR.purchase)}.`,
}));

const SB = operating({ npbt: 300000, adds: [['Depreciation', 50000], ['Interest on debentures (finance cost)', 24000]], less: [['Profit on sale of a vehicle', 12000], ['Interest received', 8000]] });
pinv(SB.opbwc, 354000, 'Subansiri OPBWC');
Q('m_opbwc', mcq({
  t: 3, d: 3, c: 'application',
  stem: `Subansiri Bamboo Crafts Ltd, an imagined company, earned a net profit before tax of ${rs(SB.npbt)} after charging depreciation of ${rs(50000)} and interest on debentures of ${rs(24000)}, and after crediting a profit of ${rs(12000)} on the sale of a vehicle and interest received of ${rs(8000)}. Its operating profit before working capital changes is`,
  opts: [rs(SB.opbwc), rs(SB.npbt + 50000), rs(SB.npbt + 50000 + 24000 + 12000 + 8000), rs(SB.npbt + 50000 - 12000 - 8000)],
  sol: `${chain([SB.npbt, 50000, 24000, -12000, -8000], SB.opbwc, 'Subansiri')}: add back the non-cash charge and the finance cost, take out the non-operating gains.`,
}));

Q('fb_indirect', fb({
  t: 3, d: 1, c: 'recall',
  stem: 'When the operating section starts from net profit before tax and adjusts it for non-cash items, non-operating items and changes in working capital, the statement is prepared by the ___ method.',
  acc: [['indirect']],
  sol: 'This is the indirect method, the one prescribed in the CBSE syllabus; the direct method lists gross cash receipts and payments instead.',
}));

Q('fb_cash_generated', fb({
  t: 3, d: 2, c: 'understanding',
  stem: 'Cash generated from operations, less income tax paid, gives the net cash flow from ___ activities.',
  acc: [['operating']],
  sol: 'Income tax paid is the last deduction in the operating section; what remains is the net cash flow from operating activities.',
}));

Q('tf_goodwill', tf({
  t: 3, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? Goodwill of ₹20,000 written off by an imagined company, Kanhar Minerals Ltd, during the year is added back to its net profit before tax in the operating section.',
  sol: 'Writing off goodwill is a non-cash charge, like depreciation and amortisation; it reduced profit without any cash leaving, so it is added back.',
}));

Q('tf_interest_recv', tf({
  t: 3, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? An imagined manufacturer, Ghatprabha Sugars Ltd, should add the interest received on its investments to net profit before tax in the operating section of its cash flow statement.',
  sol: 'Interest received is already inside net profit, and for a non-financial company it belongs to investing activities, so it is deducted in the operating section and shown as an investing inflow.',
}));

Q('mt_treatment', match({
  t: 3, d: 3, c: 'understanding', marks: 2,
  stem: 'Match each item from the records of an imagined company, Ib Valley Bricks Ltd, with its treatment in a cash flow statement prepared by the indirect method.',
  pairs: [
    ['Depreciation on kilns', 'Added back to net profit before tax as a non-cash charge'],
    ['Profit on sale of a dumper truck', 'Deducted from net profit; the sale price shown under investing'],
    ['Increase in trade receivables', 'Deducted while adjusting for working-capital changes'],
    ['Interest paid on a term loan', 'Added back to net profit; the payment shown under financing'],
  ],
  sol: 'Each adjustment undoes the effect of an item on profit that is either not a cash flow or belongs to another activity.',
}));

Q('ar_dep_cash', ar({
  t: 3, d: 3, c: 'analysis', key: 'c',
  a: 'Depreciation is added back to net profit before tax in the indirect method.',
  r: 'Depreciation is a source of cash for the business.',
  sol: 'A is true: depreciation was deducted in arriving at profit but involves no cash outflow, so it is added back. R is false: depreciation does not bring in any cash; the cash came from revenue.',
}));

Q('ar_wc', ar({
  t: 3, d: 3, c: 'analysis', key: 'd',
  a: 'An increase in trade receivables during the year is added to operating profit before working capital changes.',
  r: 'An increase in trade receivables means that part of the revenue included in profit has not yet been collected in cash.',
  sol: 'A is false: the increase is deducted. R is true, and it is exactly why the increase must be deducted, since revenue in the profit figure was not received in cash.',
}));

const MH = taxAccount({ a: 52000, b: 68000, provided: 90000 });
pinv(MH.paid, 74000, 'Mandakini tax');
Q('n_tax_paid', num({
  t: 3, d: 2, c: 'application', marks: 2, value: MH.paid, unit: '₹',
  stem: `Mandakini Organics Ltd, an imagined company in Rudraprayag, had a provision for tax of ${rs(MH.a)} on 1 April 2025 and ${rs(MH.b)} on 31 March 2026. The provision charged to the Statement of Profit and Loss for 2025-26 was ${rs(MH.provided)}. Find the income tax paid during the year (in ₹).`,
  sol: `Tax paid = opening provision + provision for the year − closing provision = ${fig(MH.a)} + ${fig(MH.provided)} − ${fig(MH.b)} = ${fig(MH.paid)}, that is ₹${fig(MH.paid)}.`,
  scheme: [['Provision for tax account set up', 1], [`Tax paid ${rs(MH.paid)}`, 1]],
}));

const TV = { open: 240000, close: 310000, grA: 100000, grB: 160000, interim: 50000, tax: 80000 };
const TV_npbt = pinv(TV.close - TV.open + (TV.grB - TV.grA) + TV.interim + TV.tax, 260000, 'Teesta NPBT');
Q('n_npbt', num({
  t: 3, d: 3, c: 'application', marks: 2, value: TV_npbt, unit: '₹',
  stem: `Teesta Valley Tea Ltd, an imagined company in Jalpaiguri, shows: surplus in the Statement of Profit and Loss ${rs(TV.open)} (31 March 2025) and ${rs(TV.close)} (31 March 2026); general reserve ${rs(TV.grA)} and ${rs(TV.grB)}. During 2025-26 it paid an interim dividend of ${rs(TV.interim)} and provided ${rs(TV.tax)} for tax. Compute its net profit before tax (in ₹).`,
  sol: `Increase in surplus ${fig(TV.close - TV.open)} + transfer to general reserve ${fig(TV.grB - TV.grA)} + interim dividend ${fig(TV.interim)} = profit after tax ${fig(TV_npbt - TV.tax)}; adding the tax provision ${fig(TV.tax)} gives ${fig(TV_npbt)}, that is ₹${fig(TV_npbt)}.`,
  scheme: [[`Profit after tax ${rs(TV_npbt - TV.tax)}`, 1], [`Net profit before tax ${rs(TV_npbt)}`, 1]],
}));

const PD = operating({ npbt: 420000, wc: [['inventories', 180000, 210000, 'A'], ['trade receivables', 140000, 115000, 'A'], ['trade payables', 95000, 80000, 'L'], ['outstanding expenses', 10000, 15000, 'L']], taxPaid: 70000 });
pinv(PD.A, 335000, 'Purna CFO');
Q('n_cfo', num({
  t: 3, d: 3, c: 'application', marks: 2, value: PD.A, unit: '₹',
  stem: `Purna Dairy Foods Ltd, an imagined company, has an operating profit before working capital changes of ${rs(PD.opbwc)} for 2025-26. Over the year inventories rose from ${rs(180000)} to ${rs(210000)}, trade receivables fell from ${rs(140000)} to ${rs(115000)}, trade payables fell from ${rs(95000)} to ${rs(80000)} and outstanding expenses rose from ${rs(10000)} to ${rs(15000)}. Income tax paid was ${rs(PD.taxPaid)}. Find its net cash from operating activities (in ₹).`,
  sol: `${chain([PD.opbwc, ...PD.wcRows.map((x) => x[1]), -PD.taxPaid], PD.A, 'Purna')}, that is ₹${fig(PD.A)}: deduct increases in current assets and decreases in current liabilities, add the opposite, then deduct tax paid.`,
  scheme: [[`Cash generated from operations ${rs(PD.cashGen)}`, 1], [`Net cash from operating activities ${rs(PD.A)}`, 1]],
}));

const WP = fixedAsset({ name: 'plant', a: 1000000, b: 1240000, acc: [300000, 350000], sold: { cost: 120000, accDep: 80000, price: 30000 } });
pinv(WP.purchase, 360000, 'Wainganga purchase');
Q('n_purchase', num({
  t: 3, d: 3, c: 'application', marks: 2, value: WP.purchase, unit: '₹',
  stem: `Wainganga Board Mills Ltd, an imagined company in Ballarpur, shows plant at cost of ${rs(WP.a)} on 31 March 2025 and ${rs(WP.b)} on 31 March 2026; accumulated depreciation was ${rs(WP.acc[0])} and ${rs(WP.acc[1])}. During the year plant costing ${rs(WP.sold.cost)} (accumulated depreciation ${rs(WP.sold.accDep)}) was sold for ${rs(WP.sold.price)}. Find the cost of plant bought during the year (in ₹).`,
  sol: `Plant account at cost: purchases = closing ${fig(WP.b)} + cost of plant sold ${fig(WP.sold.cost)} − opening ${fig(WP.a)} = ${fig(WP.purchase)}, that is ₹${fig(WP.purchase)}. The accumulated depreciation figures are not needed for the purchase; they give the year's depreciation.`,
  scheme: [['Plant account at cost set up', 1], [`Purchases ${rs(WP.purchase)}`, 1]],
}));

const HM = fixedAsset({ name: 'machinery', a: 700000, b: 760000, acc: [210000, 260000], sold: { cost: 100000, accDep: 45000, price: 52000 } });
pinv(HM.dep, 95000, 'Hiran dep');
Q('n_dep', num({
  t: 3, d: 3, c: 'application', marks: 2, value: HM.dep, unit: '₹',
  stem: `Hiran Stone Crushers Ltd, an imagined company, shows accumulated depreciation on machinery of ${rs(HM.acc[0])} on 31 March 2025 and ${rs(HM.acc[1])} on 31 March 2026. A machine sold during the year had accumulated depreciation of ${rs(HM.sold.accDep)}. Find the depreciation charged for 2025-26 (in ₹).`,
  sol: `Accumulated depreciation account: depreciation for the year = closing ${fig(HM.acc[1])} + depreciation on the machine sold ${fig(HM.sold.accDep)} − opening ${fig(HM.acc[0])} = ${fig(HM.dep)}, that is ₹${fig(HM.dep)}. It is added back in the operating section.`,
  scheme: [['Accumulated depreciation account set up', 1], [`Depreciation ${rs(HM.dep)}`, 1]],
}));

const DP = { open: 80000, close: 190000, grA: 200000, grB: 250000, fin: 90000, interim: 30000 };
const DP_T = taxAccount({ a: 60000, b: 75000, paid: 55000 });
const DP_npbt = pinv(DP.close - DP.open + (DP.grB - DP.grA) + DP.fin + DP.interim + DP_T.provided, 350000, 'Damanganga NPBT');
Q('s3_npbt', short({
  t: 3, d: 3, c: 'application', marks: 3,
  stem: `Daman Ganga Plastics Ltd, an imagined company in Vapi, gives: surplus in the Statement of Profit and Loss ${rs(DP.open)} on 31 March 2025 and ${rs(DP.close)} on 31 March 2026; general reserve ${rs(DP.grA)} and ${rs(DP.grB)}; provision for tax ${rs(DP_T.a)} and ${rs(DP_T.b)}. During 2025-26 the company paid the final dividend for 2024-25 of ${rs(DP.fin)}, an interim dividend of ${rs(DP.interim)} and income tax of ${rs(DP_T.paid)}. Prepare the provision for tax account and compute net profit before tax.`,
  model: `${DP_T.ledger.md}\n\n${md(['Net profit before tax', '₹'], [
    ['Increase in surplus', fig(DP.close - DP.open)],
    ['Add: Transfer to general reserve', fig(DP.grB - DP.grA)],
    ['Add: Final dividend for 2024-25 paid', fig(DP.fin)],
    ['Add: Interim dividend paid', fig(DP.interim)],
    [bold('Net profit after tax'), bold(fig(DP_npbt - DP_T.provided))],
    ['Add: Provision for tax for the year', fig(DP_T.provided)],
    [bold('Net profit before tax'), bold(fig(DP_npbt))],
  ], [1])}`,
  sol: 'The provision for tax account gives the tax charged this year as its balancing figure; then add every appropriation and that charge back to the increase in surplus.',
  scheme: [[`Provision for the year ${rs(DP_T.provided)}`, 1], [`Net profit after tax ${rs(DP_npbt - DP_T.provided)}`, 1], [`Net profit before tax ${rs(DP_npbt)}`, 1]],
}));

const KA = operating({ npbt: 180000, adds: [['Depreciation', 30000], ['Loss on sale of furniture', 5000]], less: [['Interest received on investments', 6000]], wc: [['inventories', 70000, 55000, 'A'], ['trade receivables', 60000, 85000, 'A'], ['prepaid expenses', 4000, 6000, 'A'], ['trade payables', 50000, 62000, 'L']], taxPaid: 40000 });
pinv(KA.A, 169000, 'Kali Sindh CFO');
Q('s3_cfo_small', short({
  t: 3, d: 3, c: 'application', marks: 3,
  stem: `Kali Sindh Agro Ltd, an imagined seed company, earned a net profit before tax of ${rs(KA.npbt)} in 2025-26 after charging depreciation of ${rs(30000)} and a loss of ${rs(5000)} on sale of furniture, and after crediting interest of ${rs(6000)} on investments. Its current assets and liabilities moved as follows: inventories ${rs(70000)} to ${rs(55000)}; trade receivables ${rs(60000)} to ${rs(85000)}; prepaid expenses ${rs(4000)} to ${rs(6000)}; trade payables ${rs(50000)} to ${rs(62000)}. Income tax paid was ${rs(KA.taxPaid)}. Compute the net cash flow from operating activities.`,
  model: stmtTable(KA.rows).md,
  sol: 'Adjust profit for the two non-cash or non-operating charges and the investment income, then for each working-capital change, then deduct tax paid.',
  scheme: [[`Operating profit before working capital changes ${rs(KA.opbwc)}`, 1], [`Working-capital changes; cash generated ${rs(KA.cashGen)}`, 1], [`Net cash from operating activities ${rs(KA.A)}`, 1]],
}));

const SD = fixedAsset({ name: 'machinery', a: 450000, b: 510000, dep: 60000, sold: { bv: 40000, price: 30000 } });
pinv(SD.purchase, 160000, 'Sabarmati purchase');
Q('s3_fa_working', short({
  t: 3, d: 4, c: 'application', marks: 3,
  stem: `Sabarmati Looms Ltd, an imagined company, shows machinery (at written-down value) of ${rs(SD.a)} on 31 March 2025 and ${rs(SD.b)} on 31 March 2026. During the year depreciation of ${rs(SD.dep)} was charged, and a machine with a book value of ${rs(SD.bv)} was sold at a loss of ${rs(SD.loss)}. Prepare the machinery account and state how each figure appears in the cash flow statement.`,
  model: `${SD.ledger.md}\n\n**In the cash flow statement:**\n- Operating activities: depreciation ${rs(SD.dep)} and loss on sale ${rs(SD.loss)} are **added back** to net profit before tax.\n- Investing activities: purchase of machinery **${rs(-SD.purchase)}** (outflow) and sale proceeds **${rs(SD.price)}** (inflow; ${fig(SD.bv)} − ${fig(SD.loss)}).`,
  sol: 'The sale price is the book value less the loss; the purchase is the balancing figure of the account at written-down value.',
  scheme: [[`Machinery account with purchases ${rs(SD.purchase)}`, 1.5], ['Operating adjustments', 0.5], ['Investing outflow and inflow', 1]],
}));

const BL = fixedAsset({ name: 'land', a: 600000, b: 700000, dep: 0 });
const BI = investAccount({ name: 'non-current investments', a: 250000, b: 180000, sold: { cost: 100000, price: 115000 } });
const BS_sec = section('B', 'investing', [['Purchase of land', -BL.purchase], ['Purchase of non-current investments', -BI.purchase], ['Proceeds from sale of non-current investments', BI.price], ['Interest received on investments', 9000]]);
pinv(BS_sec.total, -6000, 'Bhima investing');
Q('s3_investing', short({
  t: 3, d: 3, c: 'application', marks: 3,
  stem: `Bhima Sugar Mills Ltd, an imagined company in Solapur, shows land (no depreciation) of ${rs(BL.a)} and ${rs(BL.b)}, and non-current investments of ${rs(BI.a)} and ${rs(BI.b)}, on 31 March 2025 and 2026. During the year investments costing ${rs(BI.cost)} were sold at a profit of ${rs(BI.profit)}, and interest of ${rs(9000)} was received on investments. No land was sold. Compute the net cash flow from investing activities, showing the investments account.`,
  model: `${BI.ledger.md}\n\n${stmtTable(BS_sec.rows).md}\n\nThe profit of ${rs(BI.profit)} is deducted in the operating section; the full sale price is the investing inflow.`,
  sol: 'Land bought is the plain increase, since none was sold; the investments account gives the purchase as its balancing figure after the sale at cost and the profit.',
  scheme: [[`Investments account: purchase ${rs(BI.purchase)}`, 1], [`Land ${rs(BL.purchase)}, sale proceeds ${rs(BI.price)} and interest`, 1], [`Net cash used in investing ${rs(-BS_sec.total)}`, 1]],
}));

const RS = { scA: 600000, scB: 900000, spA: 30000, spB: 60000, loanA: 400000, loanB: 250000, rate: 12, div: 75000 };
const RS_int = pctOf(RS.rate, RS.loanA) / 2 + pctOf(RS.rate, RS.loanB) / 2;
check(Number.isInteger(RS_int) && RS_int === 39000, 'Rushikulya interest');
const RS_sec = section('C', 'financing', [['Proceeds from issue of equity shares (including premium)', RS.scB - RS.scA + RS.spB - RS.spA], ['Repayment of long-term loan', RS.loanB - RS.loanA], ['Interest paid on long-term loan', -RS_int], ['Dividend paid', -RS.div]]);
pinv(RS_sec.total, 66000, 'Rushikulya financing');
Q('s3_financing', short({
  t: 3, d: 3, c: 'application', marks: 3,
  stem: `Rushikulya Marine Products Ltd, an imagined company in Ganjam, shows: equity share capital ${rs(RS.scA)} (2025) and ${rs(RS.scB)} (2026); securities premium ${rs(RS.spA)} and ${rs(RS.spB)}; ${RS.rate}% long-term loan ${rs(RS.loanA)} and ${rs(RS.loanB)}. The loan was partly repaid on 30 September 2025, and interest was paid up to 31 March 2026. A dividend of ${rs(RS.div)} was paid during the year. Calculate the net cash flow from financing activities.`,
  model: `Interest on the loan = ${RS.rate}% of ${fig(RS.loanA)} for six months (${fig(pctOf(RS.rate, RS.loanA) / 2)}) + ${RS.rate}% of ${fig(RS.loanB)} for six months (${fig(pctOf(RS.rate, RS.loanB) / 2)}) = ${fig(RS_int)}.\n\n${stmtTable(RS_sec.rows).md}`,
  sol: 'Share capital and premium together give the issue proceeds; the fall in the loan is the repayment; interest is worked for each half-year on the balance then outstanding.',
  scheme: [[`Share proceeds ${rs(RS.scB - RS.scA + RS.spB - RS.spA)} and repayment ${rs(RS.loanA - RS.loanB)}`, 1], [`Interest ${rs(RS_int)}`, 1], [`Net cash from financing ${rs(RS_sec.total)}`, 1]],
}));

// ---------------------------------------------------------------- long 4
const TW = operating({
  npbt: 240000,
  adds: [['Depreciation', 36000], ['Goodwill written off', 12000], ['Loss on sale of furniture', 4000], ['Interest on debentures (finance cost)', 18000]],
  less: [['Dividend received', 8000], ['Profit on sale of investments', 6000]],
  wc: [['inventories', 120000, 150000, 'A'], ['trade receivables', 90000, 70000, 'A'], ['bills receivable', 20000, 30000, 'A'], ['trade payables', 80000, 105000, 'L'], ['outstanding expenses', 12000, 8000, 'L']],
  taxPaid: 55000,
});
pinv(TW.opbwc, 296000, 'Tawa OPBWC'); pinv(TW.A, 242000, 'Tawa CFO');
Q('l4_cfo', long({
  t: 3, d: 4, c: 'application', marks: 4,
  stem: `Tawa Bio-Fertilisers Ltd, an imagined company in Narmadapuram, reports a net profit before tax of ${rs(TW.npbt)} for 2025-26. This is after charging depreciation ${rs(36000)}, goodwill written off ${rs(12000)}, loss on sale of furniture ${rs(4000)} and interest on debentures ${rs(18000)}, and after crediting dividend received ${rs(8000)} and profit on sale of investments ${rs(6000)}. Income tax paid during the year was ${rs(TW.taxPaid)}. Extracts from its balance sheets:\n\n${md(['Item', '31 March 2026 (₹)', '31 March 2025 (₹)'], [['Inventories', fig(150000), fig(120000)], ['Trade receivables', fig(70000), fig(90000)], ['Bills receivable', fig(30000), fig(20000)], ['Trade payables', fig(105000), fig(80000)], ['Outstanding expenses', fig(8000), fig(12000)]], [1, 2])}\n\nPrepare the cash flows from operating activities section.`,
  model: stmtTable(TW.rows).md,
  sol: 'Undo every non-cash and non-operating item in the profit, then adjust each current item by the direction of its change, then take out tax paid.',
  scheme: [[`Adjustments; operating profit before working capital changes ${rs(TW.opbwc)}`, 1.5], [`Working-capital changes; cash generated ${rs(TW.cashGen)}`, 1.5], [`Net cash from operating activities ${rs(TW.A)}`, 1]],
}));

const IR = fixedAsset({ name: 'machinery', a: 800000, b: 960000, acc: [200000, 240000], sold: { cost: 100000, accDep: 60000, price: 35000 } });
const IR_inv = investAccount({ name: 'non-current investments', a: 150000, b: 210000 });
const IR_sec = section('B', 'investing', [['Purchase of machinery', -IR.purchase], ['Proceeds from sale of machinery', IR.price], ['Purchase of non-current investments', -IR_inv.purchase], ['Interest received on investments', 12000]]);
pinv(IR.dep, 100000, 'Indravati dep'); pinv(IR.purchase, 260000, 'Indravati purchase'); pinv(IR.loss, 5000, 'Indravati loss'); pinv(IR_sec.total, -273000, 'Indravati investing');
Q('l4_investing_accounts', long({
  t: 3, d: 4, c: 'application', marks: 4,
  stem: `Indravati Rice Mills Ltd, an imagined company in Jagdalpur, shows machinery at cost ${rs(IR.a)} and ${rs(IR.b)}, accumulated depreciation on machinery ${rs(IR.acc[0])} and ${rs(IR.acc[1])}, and non-current investments ${rs(IR_inv.a)} and ${rs(IR_inv.b)}, on 31 March 2025 and 2026. During 2025-26 a hulling machine costing ${rs(IR.sold.cost)}, on which depreciation of ${rs(IR.sold.accDep)} had accumulated, was sold for ${rs(IR.price)}; no investment was sold; interest of ${rs(12000)} was received on investments. Prepare the machinery account and the accumulated depreciation account, and compute the net cash flow from investing activities.`,
  model: `${IR.ledger.md}\n\n${IR.accLedger.md}\n\n${stmtTable(IR_sec.rows).md}\n\nDepreciation ${rs(IR.dep)} and the loss on sale ${rs(IR.loss)} are added back in the operating section.`,
  sol: 'The asset account at cost gives the purchase; the accumulated depreciation account gives the year’s depreciation; the loss is book value less sale price.',
  scheme: [[`Machinery account: loss ${rs(IR.loss)}, purchase ${rs(IR.purchase)}`, 1.5], [`Accumulated depreciation account: depreciation ${rs(IR.dep)}`, 1], [`Net cash used in investing ${rs(-IR_sec.total)}`, 1.5]],
}));

const KC = { scA: 1000000, scB: 1400000, spA: 50000, spB: 90000, loanA: 600000, loanB: 400000, ccA: 100000, ccB: 60000, deb: 200000, div: 120000 };
const KC_loanInt = pctOf(10, KC.loanA) / 2 + pctOf(10, KC.loanB) / 2;
const KC_debInt = pctOf(9, KC.deb);
check(KC_loanInt === 50000 && KC_debInt === 18000, 'Kosi interest');
const KC_sec = section('C', 'financing', [
  ['Proceeds from issue of equity shares (including premium)', KC.scB - KC.scA + KC.spB - KC.spA],
  ['Proceeds from issue of 9% debentures', KC.deb],
  ['Repayment of 10% long-term loan', KC.loanB - KC.loanA],
  ['Decrease in short-term borrowings (cash credit)', KC.ccB - KC.ccA],
  ['Interest paid on long-term loan', -KC_loanInt],
  ['Interest paid on debentures', -KC_debInt],
  ['Dividend paid', -KC.div],
]);
pinv(KC_sec.total, 212000, 'Kosi financing');
Q('l4_financing', long({
  t: 3, d: 3, c: 'application', marks: 4,
  stem: `Kosi Electricals Ltd, an imagined company in Purnia, gives the following:\n\n${md(['Item', '31 March 2026 (₹)', '31 March 2025 (₹)'], [['Equity share capital', fig(KC.scB), fig(KC.scA)], ['Securities premium', fig(KC.spB), fig(KC.spA)], ['9% Debentures', fig(KC.deb), '—'], ['10% Long-term loan', fig(KC.loanB), fig(KC.loanA)], ['Short-term borrowings (cash credit)', fig(KC.ccB), fig(KC.ccA)]], [1, 2])}\n\nThe debentures were issued on 1 April 2025. ${rs(KC.loanA - KC.loanB)} of the loan was repaid on 1 October 2025. Interest on both was paid when due, up to 31 March 2026. A dividend of ${rs(KC.div)} was paid. Prepare the cash flows from financing activities section.`,
  model: `**Interest:** loan ${fig(pctOf(10, KC.loanA) / 2)} (10% on ${fig(KC.loanA)} for six months) + ${fig(pctOf(10, KC.loanB) / 2)} (10% on ${fig(KC.loanB)} for six months) = ${fig(KC_loanInt)}; debentures 9% of ${fig(KC.deb)} for a full year = ${fig(KC_debInt)}.\n\n${stmtTable(KC_sec.rows).md}`,
  sol: 'Read each liability’s change as an issue or a repayment, work interest period by period on the balance outstanding, then add the dividend.',
  scheme: [['Share and debenture proceeds', 1], ['Loan repayment and cash credit decrease', 1], [`Interest ${rs(KC_loanInt + KC_debInt)} and dividend`, 1], [`Net cash from financing ${rs(KC_sec.total)}`, 1]],
}));

const DW = { open: 110000, close: 160000, grA: 50000, grB: 90000, fin: 70000, interim: 35000 };
const DW_T = taxAccount({ a: 40000, b: 55000, paid: 48000 });
const DW_npbt = pinv(DW.close - DW.open + (DW.grB - DW.grA) + DW.fin + DW.interim + DW_T.provided, 258000, 'Dhauliganga NPBT');
Q('l4_tax_npbt', long({
  t: 3, d: 4, c: 'analysis', marks: 4,
  stem: `Dhauliganga Woollens Ltd, an imagined company in Joshimath, shows: surplus in the Statement of Profit and Loss ${rs(DW.open)} and ${rs(DW.close)}; general reserve ${rs(DW.grA)} and ${rs(DW.grB)}; provision for tax ${rs(DW_T.a)} and ${rs(DW_T.b)} (31 March 2025 and 2026). During 2025-26 it paid tax of ${rs(DW_T.paid)}, the final dividend for 2024-25 of ${rs(DW.fin)} and an interim dividend of ${rs(DW.interim)}. (a) Prepare the provision for tax account. (b) Compute net profit before tax. (c) State where the tax paid and the dividends appear in the cash flow statement.`,
  model: `**(a)**\n\n${DW_T.ledger.md}\n\n**(b)** ${chain([DW.close - DW.open, DW.grB - DW.grA, DW.fin, DW.interim], DW_npbt - DW_T.provided, 'Dhauliganga PAT')} (net profit after tax: rise in surplus, transfer to reserve, both dividends); add provision for the year ${fig(DW_T.provided)}: **net profit before tax ${rs(DW_npbt)}**.\n\n**(c)** Tax paid ${rs(DW_T.paid)} is deducted as the last item of **operating activities** (not the provision of ${rs(DW_T.provided)}, which is added back through net profit before tax). Both dividends, ${rs(DW.fin + DW.interim)} in all, are **financing** outflows.`,
  sol: 'Tax paid is given, so the provision for the year is the balancing figure; every appropriation and the provision are added to the rise in surplus.',
  scheme: [[`Provision for tax account (provision ${rs(DW_T.provided)})`, 1], [`Net profit before tax ${rs(DW_npbt)}`, 2], ['Treatment of tax paid and dividends', 1]],
}));

// ---------------------------------------------------------------- long 6: full statements (cashFlow engine)
/** Model answer of a full statement: working notes then the statement and the cash check. */
const fullModel = (X, notesMd = '') =>
  `**Working notes**\n\n**W1. Net profit before tax**\n\n${X.npbtTable.md}\n\n${X.ledgers.map((l, i) => `**W${i + 2}. ${l.title}**\n\n${md(l.headers, l.rows, [1, 3])}`).join('\n\n')}${notesMd ? `\n\n${notesMd}` : ''}\n\n**Cash Flow Statement of ${X.name} for the year ended 31 March 2026**\n\n${X.stmt.md}\n\n**Check:** ${fig(X.open)} ${X.D >= 0 ? '+' : '−'} ${fig(Math.abs(X.D))} = ${fig(X.close)}, the closing cash and cash equivalents in the balance sheet.`;
const fullScheme = (X) => [
  [`Net profit before tax ${rs(X.npbt)}`, 1],
  ['Working accounts (asset, depreciation, investments, tax)', 1],
  [`Net cash ${X.A.A >= 0 ? 'from' : 'used in'} operating activities ${rs(Math.abs(X.A.A))}`, 1.5],
  [`Net cash ${X.B.total >= 0 ? 'from' : 'used in'} investing activities ${rs(Math.abs(X.B.total))}`, 1],
  [`Net cash ${X.C.total >= 0 ? 'from' : 'used in'} financing activities ${rs(Math.abs(X.C.total))}`, 1],
  ['Net change reconciled with opening and closing cash', 0.5],
];

// A: Gandaki Ceramics — gross basis machinery, investments bought, debentures issued at the year end.
const GA = cashFlow({
  name: 'Gandaki Ceramics Ltd',
  lines: [
    ['sc', 'Equity share capital', 'sc', 800000, 1000000],
    ['sp', 'Securities premium', 'sp', 40000, 60000],
    ['gr', 'General reserve', 'gr', 60000, 100000],
    ['sur', 'Surplus in the Statement of Profit and Loss', 'surplus', 120000, 190000],
    ['deb', '9% Debentures', 'ltb', 300000, 400000, { name: '9% debentures' }],
    ['tp', 'Trade payables', 'wcL', 140000, 170000],
    ['pt', 'Short-term provisions: provision for tax', 'tax', 50000, 70000],
    ['m', 'Machinery (at cost)', 'ppe', 900000, 1150000, { name: 'machinery' }],
    ['ad', 'Less: Accumulated depreciation on machinery', 'accdep', 200000, 250000, { of: 'm' }],
    ['inv', 'Non-current investments', 'inv', 100000, 160000],
    ['stock', 'Inventories', 'wcA', 210000, 260000],
    ['tr', 'Trade receivables', 'wcA', 170000, 150000],
    ['cash', 'Cash and cash equivalents', 'cce', 330000, 520000],
  ],
  info: {
    fa: { m: { sold: { cost: 80000, accDep: 50000, price: 22000 } } },
    tax: { pt: { provided: 80000 } },
    interestPaid: [['Interest on 9% debentures', pctOf(9, 300000)]],
    interestReceived: [['Interest received on investments', 9000]],
    dividendPaid: [['Final dividend for 2024-25', 80000]],
  },
  pins: { npbt: 270000, A: 336000, B: -359000, C: 213000 },
});
Q('l6_full_A', long({
  t: 3, d: 4, c: 'application', marks: 6,
  stem: `From the comparative balance sheets of Gandaki Ceramics Ltd, an imagined tile maker in Morbi, and the additional information, prepare its cash flow statement for the year ended 31 March 2026 by the indirect method.\n\n${GA.bs.md}\n\n**Additional information**\n\n${bullets([
    `A machine costing ${rs(80000)}, on which depreciation of ${rs(50000)} had accumulated, was sold for ${rs(22000)}.`,
    `Provision for tax made during the year: ${rs(80000)}.`,
    `The additional debentures were issued on 31 March 2026; interest on the debentures outstanding during the year was paid.`,
    `Interest received on investments: ${rs(9000)}. Final dividend for 2024-25 paid: ${rs(80000)}.`,
    'Equity shares were issued for cash at a premium.',
  ])}`,
  model: fullModel(GA, `**W${GA.ledgers.length + 2}.** Interest on debentures = 9% of ${fig(300000)} = ${fig(pctOf(9, 300000))} (the new debentures earned no interest in the year).`),
  sol: 'Fix net profit before tax from the surplus, find the purchase and the depreciation from the two machinery accounts and tax paid from the provision, then build the three sections and check them against the change in cash.',
  scheme: fullScheme(GA),
}));

// B: Chambal Agro Implements — net basis, goodwill written off, loan repaid mid-year, tax without a provision.
const CH_int = pctOf(10, 200000) / 2 + pctOf(10, 100000) / 2;
const CH = cashFlow({
  name: 'Chambal Agro Implements Ltd',
  lines: [
    ['sc', 'Equity share capital', 'sc', 600000, 800000],
    ['gr', 'General reserve', 'gr', 50000, 50000],
    ['sur', 'Balance in the Statement of Profit and Loss', 'surplus', 80000, 140000],
    ['loan', '10% Long-term loan from a bank', 'ltb', 200000, 100000, { name: 'long-term bank loan' }],
    ['tp', 'Trade payables', 'wcL', 90000, 110000],
    ['ow', 'Outstanding wages', 'wcL', 15000, 10000],
    ['gw', 'Goodwill', 'intang', 60000, 40000],
    ['lb', 'Land and building (net)', 'ppe', 400000, 520000, { name: 'land and building' }],
    ['pm', 'Plant and machinery (net)', 'ppe', 280000, 320000, { name: 'plant and machinery' }],
    ['stock', 'Inventories', 'wcA', 130000, 120000],
    ['tr', 'Trade receivables', 'wcA', 100000, 140000],
    ['cash', 'Cash and bank balances', 'cce', 65000, 70000],
  ],
  info: {
    fa: { lb: { dep: 20000 }, pm: { dep: 40000, sold: { bv: 30000, price: 36000 } } },
    taxPaidNoProvision: [['Income tax paid', 30000]],
    interestPaid: [['Interest on long-term bank loan', CH_int]],
    dividendPaid: [['Dividend', 50000]],
  },
  pins: { npbt: 140000, A: 184000, B: -214000, C: 35000 },
});
Q('l6_full_B', long({
  t: 3, d: 4, c: 'application', marks: 6,
  stem: `Chambal Agro Implements Ltd, an imagined company in Kota, makes ploughs and seed drills. Its summarised balance sheets are given below. Using the notes that follow, prepare a cash flow statement as per Accounting Standard 3 (indirect method) for 2025-26.\n\n${CH.bs.md}\n\n**Notes**\n\n${bullets([
    `Depreciation charged: land and building ${rs(20000)}; plant and machinery ${rs(40000)}.`,
    `A seed-drill press with a book value of ${rs(30000)} was sold for ${rs(36000)}.`,
    `${rs(100000)} of the 10% loan was repaid on 1 October 2025; interest was paid when due.`,
    `Income tax of ${rs(30000)} was paid and charged to the Statement of Profit and Loss; no provision is kept.`,
    `A dividend of ${rs(50000)} was paid. Goodwill was written off to the extent of the fall in its balance.`,
  ])}`,
  model: fullModel(CH, `**W${CH.ledgers.length + 2}.** Interest on the loan = 10% of ${fig(200000)} for six months (${fig(pctOf(10, 200000) / 2)}) + 10% of ${fig(100000)} for six months (${fig(pctOf(10, 100000) / 2)}) = ${fig(CH_int)}.\n\n**W${CH.ledgers.length + 3}.** Net profit before tax includes the tax of ${fig(30000)} paid this year, since no provision is maintained.`),
  sol: 'With assets at written-down value, each asset account gives the purchase as the balancing figure after depreciation and the sale; tax paid here equals the tax charged.',
  scheme: fullScheme(CH),
}));

// C: Pennar Paper Mills — shares to a vendor for land (non-cash), loss on current investments, net decrease in cash.
const PE = cashFlow({
  name: 'Pennar Paper Mills Ltd',
  lines: [
    ['sc', 'Equity share capital', 'sc', 1000000, 1300000],
    ['gr', 'General reserve', 'gr', 100000, 120000],
    ['sur', 'Surplus in the Statement of Profit and Loss', 'surplus', 200000, 180000],
    ['deb', '8% Debentures', 'ltb', 400000, 400000, { name: '8% debentures' }],
    ['tp', 'Trade payables', 'wcL', 220000, 190000],
    ['pt', 'Provision for tax', 'tax', 70000, 60000],
    ['land', 'Land (at cost)', 'ppe', 500000, 750000, { name: 'land' }],
    ['m', 'Machinery (at cost)', 'ppe', 800000, 900000, { name: 'machinery' }],
    ['ad', 'Less: Accumulated depreciation', 'accdep', 240000, 300000, { of: 'm' }],
    ['ci', 'Current investments (listed shares)', 'inv', 120000, 60000, { name: 'current investments', current: true }],
    ['stock', 'Inventories', 'wcA', 300000, 340000],
    ['tr', 'Trade receivables', 'wcA', 260000, 290000],
    ['cash', 'Cash and cash equivalents', 'cce', 250000, 210000],
  ],
  info: {
    fa: { land: { dep: 0, vendor: 150000 } },
    invest: { ci: { sold: { cost: 60000, price: 55000 } } },
    tax: { pt: { paid: 90000 } },
    interestPaid: [['Interest on 8% debentures', pctOf(8, 400000)]],
    dividendReceived: [['Dividend received on current investments', 6000]],
    dividendPaid: [['Final dividend', 100000]],
  },
  pins: { npbt: 180000, A: 81000, B: -139000, C: 18000, D: -40000 },
});
check(PE.L.find((l) => l.k === 'land').fa.purchase === 100000, 'Pennar land bought for cash');
Q('l6_full_C', long({
  t: [1, 3], d: 5, c: 'analysis', marks: 6,
  stem: `Pennar Paper Mills Ltd, an imagined company in Nellore, ended 2025-26 with less cash than it began with, although it made a profit. Prepare its cash flow statement for the year ended 31 March 2026 from the balance sheets and information below, and show where the cash went.\n\n${PE.bs.md}\n\n**Information**\n\n${bullets([
    `Land costing ${rs(150000)} was acquired by issuing equity shares to its owner; the rest of the increase in land and in share capital was for cash.`,
    'No machinery was sold during the year.',
    `Listed shares held as current investments, costing ${rs(60000)}, were sold for ${rs(55000)}; a dividend of ${rs(6000)} was received on them.`,
    `Income tax paid during the year: ${rs(90000)}. Interest on the debentures was paid for the full year.`,
    `A final dividend of ${rs(100000)} was paid.`,
  ])}`,
  model: fullModel(PE, `**W${PE.ledgers.length + 2}.** The land of ${fig(150000)} received for shares is a **non-cash transaction**: it is left out of both investing and financing activities. Land bought for cash = ${fig(750000)} − ${fig(500000)} − ${fig(150000)} = ${fig(100000)}; shares issued for cash = ${fig(1300000)} − ${fig(1000000)} − ${fig(150000)} = ${fig(150000)}.`),
  sol: 'Separate the non-cash share issue first; with tax paid given, the provision for the year is the balancing figure; the listed shares are not cash equivalents, so their sale is investing.',
  scheme: fullScheme(PE),
}));

// D: Sutlej Bicycles — bonus issue from reserve, patents bought and written off, loan raised mid-year, two dividends.
const SU_int = pctOf(12, 300000) / 2;
const SU = cashFlow({
  name: 'Sutlej Bicycles Ltd',
  lines: [
    ['sc', 'Equity share capital', 'sc', 1200000, 1500000],
    ['sp', 'Securities premium', 'sp', 0, 20000],
    ['gr', 'General reserve', 'gr', 300000, 150000],
    ['sur', 'Surplus in the Statement of Profit and Loss', 'surplus', 150000, 210000],
    ['loan', '12% Long-term loan from a financial institution', 'ltb', 0, 300000, { name: 'long-term loan' }],
    ['tp', 'Trade payables', 'wcL', 200000, 260000],
    ['oe', 'Outstanding expenses', 'wcL', 30000, 20000],
    ['pt', 'Provision for tax', 'tax', 80000, 100000],
    ['pat', 'Patents', 'intang', 50000, 70000],
    ['pl', 'Plant (at cost)', 'ppe', 1400000, 1800000, { name: 'plant' }],
    ['ad', 'Less: Accumulated depreciation on plant', 'accdep', 350000, 420000, { of: 'pl' }],
    ['inv', 'Non-current investments', 'inv', 200000, 120000],
    ['stock', 'Inventories', 'wcA', 340000, 410000],
    ['tr', 'Trade receivables', 'wcA', 260000, 240000],
    ['pre', 'Prepaid expenses', 'wcA', 10000, 6000],
    ['cash', 'Cash and cash equivalents', 'cce', 50000, 334000],
  ],
  info: {
    fa: { pl: { sold: { cost: 120000, accDep: 70000, price: 45000 } } },
    intang: { pat: { writtenOff: 20000, purchase: 40000 } },
    invest: { inv: { sold: { cost: 80000, price: 72000 } } },
    tax: { pt: { provided: 120000 } },
    bonus: { amount: 200000, from: 'gr' },
    interestPaid: [['Interest on 12% long-term loan', SU_int]],
    interestReceived: [['Interest received on investments', 12000]],
    dividendPaid: [['Final dividend for 2024-25', 120000], ['Interim dividend for 2025-26', 60000]],
  },
  pins: { npbt: 410000, A: 493000, B: -431000, C: 222000 },
});
Q('l6_full_D', long({
  t: 3, d: 5, c: 'analysis', marks: 6,
  stem: `Sutlej Bicycles Ltd, an imagined company in Ludhiana, gives its balance sheets as at 31 March 2025 and 2026 and the information below. Prepare its cash flow statement for 2025-26.\n\n${SU.bs.md}\n\n**Information**\n\n${bullets([
    `Bonus shares of ${rs(200000)} were issued out of the general reserve on 1 April 2025; later in the year equity shares were issued for cash at a premium of 20%.`,
    `Plant costing ${rs(120000)} (accumulated depreciation ${rs(70000)}) was sold for ${rs(45000)}.`,
    `Patents of ${rs(40000)} were bought during the year, and part of the patents was written off.`,
    `Investments costing ${rs(80000)} were sold for ${rs(72000)}; interest of ${rs(12000)} was received on investments.`,
    `The loan was taken on 1 October 2025; interest was paid when due. Provision for tax made: ${rs(120000)}.`,
    `Dividends paid: final for 2024-25 ${rs(120000)}; interim for 2025-26 ${rs(60000)}.`,
  ])}`,
  model: fullModel(SU, `**W${SU.ledgers.length + 2}.** General reserve: ${fig(300000)} + transfer from surplus − bonus ${fig(200000)} = ${fig(150000)}, so the transfer = ${fig(SU.transfer)}. The bonus issue is non-cash: shares issued for cash = increase in share capital ${fig(300000)} − bonus ${fig(200000)} = ${fig(100000)}, plus premium ${fig(20000)} = ${fig(120000)}.\n\n**W${SU.ledgers.length + 3}.** Patents written off = ${fig(50000)} + ${fig(40000)} − ${fig(70000)} = ${fig(20000)}. Interest on the loan = 12% of ${fig(300000)} for six months = ${fig(SU_int)}.`),
  sol: 'Untangle the general reserve first (transfer in, bonus out) and keep the bonus out of the statement; the patents account gives the write-off; everything else follows the usual working accounts.',
  scheme: fullScheme(SU),
}));

// E: Vaigai Handlooms — two cash-equivalent lines, a six-month deposit (investing), short-term bank loan, net decrease.
const VA = cashFlow({
  name: 'Vaigai Handlooms Ltd',
  lines: [
    ['sc', 'Equity share capital', 'sc', 500000, 500000],
    ['gr', 'General reserve', 'gr', 40000, 70000],
    ['sur', 'Surplus (Statement of Profit and Loss)', 'surplus', 60000, 100000],
    ['stb', 'Short-term borrowings: bank loan', 'stb', 0, 130000, { name: 'short-term bank loan' }],
    ['tp', 'Trade payables', 'wcL', 110000, 130000],
    ['pt', 'Short-term provisions (tax)', 'tax', 30000, 40000],
    ['fu', 'Furniture (written-down value)', 'ppe', 120000, 150000, { name: 'furniture' }],
    ['lo', 'Looms (written-down value)', 'ppe', 300000, 420000, { name: 'looms' }],
    ['fd', 'Bank deposit, six-month maturity', 'inv', 0, 50000, { name: 'six-month bank deposit', current: true }],
    ['stock', 'Inventories', 'wcA', 140000, 200000],
    ['tr', 'Trade receivables', 'wcA', 90000, 120000],
    ['cb', 'Cash and bank balances', 'cce', 50000, 20000],
    ['sd', 'Short-term deposits (maturity within three months)', 'cce', 40000, 10000],
  ],
  info: {
    fa: { fu: { dep: 15000, sold: { bv: 10000, price: 14000 } }, lo: { dep: 30000 } },
    tax: { pt: { provided: 50000 } },
    interestPaid: [['Interest on short-term bank loan', 6000]],
    dividendPaid: [['Dividend', 50000]],
  },
  pins: { npbt: 170000, A: 107000, B: -241000, C: 74000, D: -60000 },
});
Q('l6_full_E', long({
  t: [1, 3], d: 4, c: 'application', marks: 6,
  stem: `Vaigai Handlooms Ltd, an imagined weaving company in Madurai, presents the following balance sheets. Prepare its cash flow statement for the year ended 31 March 2026, taking care over what counts as cash and cash equivalents.\n\n${VA.bs.md}\n\n**Further details**\n\n${bullets([
    `Depreciation for the year: furniture ${rs(15000)}; looms ${rs(30000)}.`,
    `Old furniture with a written-down value of ${rs(10000)} was sold for ${rs(14000)}.`,
    `Tax provided for the year: ${rs(50000)}. Interest of ${rs(6000)} was paid on the bank loan.`,
    `A dividend of ${rs(50000)} was paid during the year.`,
  ])}`,
  model: fullModel(VA, `**W${VA.ledgers.length + 2}.** Cash and cash equivalents = cash and bank balances + short-term deposits maturing within three months: ${fig(90000)} at the start and ${fig(30000)} at the end. The six-month deposit fails the three-month test, so placing it is an investing outflow.`),
  sol: 'Fix the boundary of cash and cash equivalents first (two lines in, the six-month deposit out); then the asset accounts at written-down value, the tax account and the three sections; short-term bank borrowing is a financing inflow.',
  scheme: fullScheme(VA),
}));

FACTS.push(
  `Gandaki net profit before tax ${fig(GA.npbt)}, net increase ${fig(GA.D)}`,
  `Chambal operating ${fig(CH.A.A)}, net increase ${fig(CH.D)}`,
  `Pennar net decrease ${fig(-PE.D)} with land for shares kept out`,
  `Sutlej bonus issue kept out, net increase ${fig(SU.D)}`,
  `Vaigai net decrease ${fig(-VA.D)} over two cash-equivalent lines`,
  `Tawa operating ${fig(TW.A)}; Indravati investing ${fig(IR_sec.total)}; Kosi financing ${fig(KC_sec.total)}`,
);
export { FACTS };
