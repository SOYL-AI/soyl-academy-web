// ISC 12 Accounts, ch11 Cash Flow Statement — question bank. Every company, person and figure is imagined
// by SOYL (companies named after Indian mountain passes and ghat roads); no textbook illustration or
// exercise and no CISCE specimen or past-paper item is reused.
// Every figure is computed in acc.mjs from the givens: full statements run through cashFlow() (both balance
// sheets balance, every working account balances, every balance sheet line is consumed, and A + B + C must
// equal closing minus opening cash and cash equivalents); partial items use the same fixedAsset(),
// investAccount(), taxAccount(), premiumAccount(), operating() and section() builders. Keys and model
// answers are built from the computed values; pinv() pins each key result to a hand-checked value.
import { Q, mcq, ar, tf, fb, match, num, short, long } from './lib.mjs';
import { fig, rs, sum, md, bold, check, pctOf, interest, given, extract, chain, fixedAsset, investAccount, taxAccount, premiumAccount, operating, section, stmtTable, cashFlow } from './acc.mjs';

const FACTS = [];
const pinv = (v, want, what) => { check(v === want, `${what}: computed ${v}, expected ${want}`); FACTS.push(`${what} ${fig(want)}`); return v; };
const bullets = (xs) => xs.map((x) => `- ${x}`).join('\n');
const pick = (rows, cls) => rows.filter((x) => x[2] === cls).map((x) => x[1]);

// ================================================================ t01 Meaning, importance, cash equivalents, classification
Q('m_purpose', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'The finance director of Lipulekh Herbs Ltd, an imagined company at Dharchula, tells the board that the cash flow statement answers a question which the Statement of Profit and Loss cannot. Which question?',
  opts: ['Where did the cash and cash equivalents of the year come from, and on what were they spent?', 'How much profit did the company earn after tax?', 'What were the assets and liabilities on the last day of the year?', 'How was the profit for the year divided between reserves and dividend?'],
  sol: 'Profit is measured on the accrual basis. The cash flow statement reports the inflows and outflows of cash and cash equivalents, grouped into operating, investing and financing activities; the other options describe the profit statement, the balance sheet and the appropriation of profit.',
}));

Q('m_cce_pick', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Malshej Agro Ltd, an imagined farm-tourism company at Junnar, holds four investments on 31 March 2026. Which one is a cash equivalent under AS 3 (revised)?',
  opts: ['Treasury bills bought on 1 March 2026 that mature on 30 April 2026', 'Debentures of another company, bought two years ago, that mature on 31 May 2026', 'A bank deposit placed for six months on 1 January 2026', 'Listed equity shares that can be sold on any trading day'],
  sol: 'The three-month test is counted from the date of acquisition, not from the balance sheet date: the treasury bills had about two months to run when bought. The debentures had two years to run when bought, the deposit six months, and shares carry a risk of change in value.',
}));

Q('m_not_flow', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'Tamhini Rice Mills Ltd, an imagined mill at Mulshi, made four payments of ₹2,00,000 each from its current account in March 2026. Which payment will NOT appear as a cash flow in its cash flow statement?',
  opts: ['Placing the money in a 45-day deposit with its bank', 'Paying farmers for paddy bought on credit', 'Paying for a new rice-polishing machine', 'Redeeming debentures at par'],
  sol: 'A 45-day deposit is itself a cash equivalent, so the money only moves from one component of cash and cash equivalents to another and the total does not change. The other three are operating, investing and financing outflows.',
}));

Q('m_noncash', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Khambatki Strawberry Ltd, an imagined company at Wai, bought a cold store for ₹5,00,000 and paid the seller by allotting him its 10% debentures of the same amount. In its cash flow statement this purchase is',
  opts: ['left out, being a non-cash investing and financing transaction', 'an investing outflow and a financing inflow of ₹5,00,000 each', 'an investing outflow of ₹5,00,000 only', 'a financing inflow of ₹5,00,000 only'],
  sol: 'No cash or cash equivalent changed hands. AS 3 excludes such transactions from the statement and requires them to be disclosed elsewhere in the financial statements.',
}));

Q('m_int_paid', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Naneghat Basalt Ltd, an imagined quarrying company at Ghatghar, pays half-yearly interest on its 10% debentures. For this company, which is not a financial enterprise, the interest paid is',
  opts: ['a financing outflow', 'an operating outflow', 'an investing outflow', 'not a cash flow, being a charge against profit'],
  sol: 'For a non-financial enterprise interest paid is a cost of obtaining finance, so it is shown under financing activities; in the indirect method it is first added back to net profit before tax.',
}));

Q('m_div_recv_fin', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: 'Shiradi Investments Ltd, an imagined company at Sakleshpur whose main business is investing in shares and lending money, received dividends on the shares it holds. In its cash flow statement the dividend received is',
  opts: ['an operating inflow', 'an investing inflow', 'a financing inflow', 'deducted in the operating section and shown under investing'],
  sol: 'For a financial enterprise, investing and lending are its principal revenue-producing activities, so interest and dividends received are operating; for a manufacturer they would be investing.',
}));

Q('m_loan_given', mcq({
  t: [1, 3], d: 2, c: 'understanding',
  stem: 'Sampaje Spice Ltd, an imagined pepper processor at Sullia, lent ₹1,50,000 for three years to a growers’ co-operative that supplies it. Sampaje is not a financial enterprise. In its cash flow statement the loan is',
  opts: ['an investing outflow', 'an operating outflow, because the co-operative is a supplier', 'a financing outflow', 'not shown, because the money will be repaid'],
  sol: 'Loans and advances made to other parties by an enterprise that is not a financial enterprise are investing activities; their recovery later is an investing inflow, and interest earned on them is an investing inflow too.',
}));

Q('m_tax_class', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Aryankavu Cashew Ltd, an imagined processor at Thenmala, paid its advance income tax in four instalments. Unless the tax can be specifically identified with investing or financing activities, it is shown as',
  opts: ['an operating outflow', 'a financing outflow', 'an investing outflow', 'an appropriation of profit, left out of the statement'],
  sol: 'Tax on income arises from the operations that earn the profit and is usually impracticable to split among the activities, so AS 3 places it under operating activities unless it is clearly linked to another activity.',
}));

Q('ar_shares_ce', ar({
  t: 1, d: 3, c: 'understanding', key: 'a',
  pre: 'Kambam Grapes Ltd, an imagined winery near Uthamapalayam, parks its surplus money in listed equity shares.\n\n',
  a: 'Kambam’s listed shares are not part of its cash and cash equivalents, however quickly they can be sold.',
  r: 'An investment is a cash equivalent only if the amount of cash it will fetch is known and subject to an insignificant risk of change in value.',
  sol: 'Both statements are true and R is the reason for A: share prices move, so the cash the shares will fetch is not known in advance.',
}));

Q('ar_div_paid_bank', ar({
  t: 1, d: 3, c: 'analysis', key: 'b',
  pre: 'Thenmala Rural Bank Ltd is an imagined bank that takes deposits and lends to cashew growers.\n\n',
  a: 'The dividend paid by Thenmala Rural Bank to its shareholders is shown under financing activities.',
  r: 'For a bank, interest paid on customers’ deposits is shown under operating activities.',
  sol: 'Both are true, but R does not explain A. Dividend paid is a return to the providers of capital for every kind of enterprise; R is about interest, which for a bank arises from its main business of borrowing and lending.',
}));

Q('tf_profit_cash', tf({
  t: 1, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? Marsimik Pashmina Ltd, an imagined shawl maker, can report a healthy profit for 2025-26 and still close the year with less cash and cash equivalents than it began with.',
  sol: 'Profit follows the accrual basis. Cash can still fall when customers have not paid, stock has been built up, assets have been bought or loans and dividends have been paid; explaining that gap is the job of the cash flow statement.',
}));

Q('fb_three_months', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'Hatkhamba Foods Ltd, an imagined company, treats a short-term investment as a cash equivalent only when it matures within ___ months of the date on which Hatkhamba acquired it.',
  acc: [['three', '3']],
  sol: 'AS 3 (revised) normally treats an investment as having a short maturity when it is three months or less from the date of acquisition.',
}));

Q('fb_as3', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'The ISC Accounts syllabus follows the revised Accounting Standard ___, which tells an imagined exporter such as Thal Ghat Pumps Ltd how to classify its cash flows into three activities.',
  acc: [['3', 'three', 'AS 3', 'AS-3']],
  sol: 'Accounting Standard 3 (revised), Cash Flow Statements, issued by the Institute of Chartered Accountants of India, governs the statement and its classification.',
}));

// Rupin: cash and cash equivalents from a list (deck check).
const KA = [
  ['Cash in hand', 8000, true],
  ['Balance in current account with a bank', 92000, true],
  ['Commercial paper bought with 75 days to maturity', 50000, true],
  ['Bank deposit placed for six months', 100000, false],
  ['Equity shares of a listed company', 40000, false],
  ['Bank deposit placed for 30 days', 30000, true],
];
const KA_cce = pinv(sum(KA.filter((x) => x[2]).map((x) => x[1])), 180000, 'Rupin cash and cash equivalents');
Q('n_cce', num({
  t: 1, d: 2, c: 'application', marks: 1, value: KA_cce, unit: '₹',
  stem: `Rupin Rafting Ltd, an imagined adventure-sports company at Naitwar, lists what it holds on 31 March 2026. How much is its cash and cash equivalents (in ₹)?\n\n${given(KA.map((x) => [x[0], x[1]]))}`,
  sol: `Count cash, the current account, the 75-day commercial paper and the 30-day deposit: ${KA.filter((x) => x[2]).map((x) => fig(x[1])).join(' + ')} = ${fig(KA_cce)}, that is ₹${fig(KA_cce)}. The six-month deposit is too long and the shares carry price risk.`,
}));

const TH = [
  ['Cash in hand', 15000, 'Included: cash'],
  ['Balance in current account with a bank', 135000, 'Included: demand deposit'],
  ['Treasury bills bought on issue, maturing in 60 days', 60000, 'Included: maturity within three months of acquisition'],
  ['Bank deposit placed for one year', 150000, 'Not included: maturity longer than three months'],
  ['Shares of a listed tea company', 45000, 'Not included: risk of change in value'],
];
const TH_cce = pinv(sum(TH.filter((x) => x[2].startsWith('Included')).map((x) => x[1])), 210000, 'Thenmala Resorts cash and cash equivalents');
Q('s2_cce', short({
  t: 1, d: 2, c: 'application', marks: 2,
  stem: `Thenmala Eco Resorts Ltd, an imagined company, holds the following on 31 March 2026. Which items are its cash and cash equivalents? Give a reason for each and find the total.\n\n${given(TH.map((x) => [x[0], x[1]]))}`,
  model: `${md(['Item', '₹', 'Treatment'], TH.map(([l, v, w]) => [l, fig(v), w.startsWith('Included') ? `**Included** (${w.slice(10)})` : `**Not included** (${w.slice(14)})`]), [1])}\n\n**Cash and cash equivalents** = ${TH.filter((x) => x[2].startsWith('Included')).map((x) => fig(x[1])).join(' + ')} = **${rs(TH_cce)}**.`,
  sol: 'Apply the tests to each holding: short maturity from the date of acquisition, readily convertible into a known amount, insignificant risk of change in value.',
  scheme: [['Each item placed with a reason', 1], [`Total ${rs(TH_cce)}`, 1]],
}));

const BH = [
  ['Petty cash', 6000, 'Included: cash'],
  ['Balance in current account', 124000, 'Included: demand deposit with a bank'],
  ['Bank deposit placed for 60 days', 80000, 'Included: short maturity, fixed amount'],
  ['Units of an overnight liquid fund', 40000, 'Included: highly liquid, insignificant risk of change in value'],
  ['Bank deposit placed for nine months', 200000, 'Not included: maturity longer than three months when placed'],
  ['Debentures of a power company bought last year, maturing in 50 days', 70000, 'Not included: maturity counted from the date of acquisition was more than three months'],
  ['Trade receivables due within 30 days', 95000, 'Not included: an operating asset, not an investment'],
];
const BH_cce = pinv(sum(BH.filter((x) => x[2].startsWith('Included')).map((x) => x[1])), 250000, 'Bhor Ghat cash and cash equivalents');
Q('s3_cce_list', short({
  t: 1, d: 3, c: 'application', marks: 3,
  stem: `The cashier of Bhor Ghat Rail Parts Ltd, an imagined engineering company at Khopoli, has listed what the company holds on 31 March 2026. Identify, with a reason for each, the items that form part of cash and cash equivalents, and find their total.\n\n${given(BH.map((x) => [x[0], x[1]]))}`,
  model: `${md(['Item', '₹', 'Treatment'], BH.map(([l, v, w]) => [l, fig(v), w.startsWith('Included') ? `**Included** (${w.slice(10)})` : `**Not included** (${w.slice(14)})`]), [1])}\n\n**Cash and cash equivalents** = ${BH.filter((x) => x[2].startsWith('Included')).map((x) => fig(x[1])).join(' + ')} = **${rs(BH_cce)}**.`,
  sol: 'The debentures are the trap: the three-month test runs from the day they were bought, not from the balance sheet date.',
  scheme: [['Four included items with reasons', 1], ['Three excluded items with reasons', 1], [`Total ${rs(BH_cce)}`, 1]],
}));

Q('s2_importance', short({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'A bank is considering a working-capital loan to Bodimettu Cardamom Ltd, an imagined spice company. State two ways in which Bodimettu’s cash flow statement will help the bank’s credit officer.',
  model: '1. **Repaying power from operations:** the net cash from operating activities shows whether Bodimettu’s own trading produces enough cash to pay interest and instalments, without borrowing again or selling assets.\n2. **Where the money went:** the investing and financing sections show whether past cash was sunk in long-term assets, used to repay other lenders or paid out as dividends, which tells the officer how the new loan is likely to be used and how tight liquidity will be.\n\n*(Also accepted: it explains why profit and cash differ; it helps forecast future cash needs; it allows comparison with other borrowers, since cash figures depend little on accounting policies.)*',
  sol: 'Link each use to a section of the statement and to the lender’s worry: will the loan be serviced, and how is cash being spent?',
  scheme: [['First use explained', 1], ['Second use explained', 1]],
}));

Q('s3_objectives', short({
  t: 1, d: 2, c: 'understanding', marks: 3,
  stem: 'The directors of an imagined family company, Changla Dairy Ltd, Durbuk, say: "Our Statement of Profit and Loss shows a profit every year, so a cash flow statement is unnecessary." Give three reasons why the statement is still important for them.',
  model: '1. **Profit is not cash.** Profit is on the accrual basis; credit sales, unpaid expenses, stock build-up, asset purchases and loan repayments make cash differ from profit. The statement explains that gap, item by item.\n2. **Liquidity and solvency.** Net cash from operating activities shows whether the dairy can pay suppliers, staff, tax, interest and dividends from its own trading, or is living on borrowings and asset sales.\n3. **Planning and decisions.** Past inflows and outflows by activity help the directors forecast cash needs, time capital spending, plan repayments and set a dividend policy the company can afford.\n\n*(Also accepted: easier comparison between years and firms because cash figures depend little on accounting policies; it is required by AS 3 (revised) for companies.)*',
  sol: 'Answer the directors directly: three distinct reasons, each showing what the profit statement alone cannot tell them.',
  scheme: [['First reason explained', 1], ['Second reason explained', 1], ['Third reason explained', 1]],
}));

Q('s2_noncash', short({
  t: 1, d: 3, c: 'understanding', marks: 2,
  stem: `The trainee accountant of Fotula Apricot Ltd, an imagined company at Lamayuru, has shown two transactions of 2025-26 in the cash flow statement. Explain why neither belongs there.\n\n(i) Bonus shares of ${rs(150000)} were issued out of the general reserve.\n(ii) ${rs(80000)} was moved from the current account into 60-day treasury bills.`,
  model: '**(i) Bonus issue:** an amount is only transferred from the general reserve to share capital; nothing is received or paid, so it is a **non-cash** transaction and stays out of the statement.\n\n**(ii) Treasury bills:** 60-day treasury bills are themselves a **cash equivalent**. The money has moved from one component of cash and cash equivalents to another; the total is unchanged, so this is **not a cash flow**.',
  sol: 'For each, ask whether cash left or entered the business, and whether the total of cash and cash equivalents changed.',
  scheme: [['(i) Bonus issue is a non-cash book transfer', 1], ['(ii) Movement within cash and cash equivalents', 1]],
}));

Q('s3_noncash', short({
  t: 1, d: 3, c: 'analysis', marks: 3,
  stem: `Taglang Wool Ltd, an imagined spinning mill at Rumtse, had these three transactions in 2025-26. Its draft cash flow statement shows each of them. State, with reasons, how each should be treated.\n\n(i) Equity shares of ${rs(400000)} were allotted to the seller of a warehouse as its price.\n(ii) 9% debentures of ${rs(200000)} were converted into equity shares.\n(iii) A 75-day deposit of ${rs(100000)} matured and the money was credited to the current account.`,
  model: '**(i) Shares for a warehouse:** an investing transaction (acquiring an asset) and a financing transaction (issuing shares) with no cash at all. It is a **non-cash transaction**: excluded from the statement and disclosed in a note.\n\n**(ii) Conversion of debentures:** one form of finance is replaced by another; no cash moves. Also a **non-cash** financing transaction, excluded and disclosed.\n\n**(iii) Deposit maturing:** a 75-day deposit is a **cash equivalent**, so its maturity is a movement within cash and cash equivalents; the total does not change and it is **not a cash flow**.',
  sol: 'Two of the three are non-cash investing or financing transactions; the third is a switch inside cash and cash equivalents.',
  scheme: [['(i) treated with reason', 1], ['(ii) treated with reason', 1], ['(iii) treated with reason', 1]],
}));

const GM = [
  ['Received from customers for bottled water', 'Operating', 'inflow'],
  ['Bought a bottling line', 'Investing', 'outflow'],
  ['Paid interest on a term loan', 'Financing', 'outflow'],
  ['Received interest on a loan given to a dealer', 'Investing', 'inflow'],
];
Q('s2_classify4', short({
  t: 1, d: 2, c: 'application', marks: 2,
  stem: `Classify the following cash transactions of Gaimukh Ghat Bottling Ltd, an imagined mineral-water company that is not a financial enterprise, as operating, investing or financing activities, and say whether each is an inflow or an outflow.\n\n${GM.map((x, i) => `(${i + 1}) ${x[0]}.`).join('\n')}`,
  model: md(['Transaction', 'Activity', 'Inflow or outflow'], GM.map(([l, a, f]) => [l, bold(a), f])),
  sol: 'Trading receipts are operating; long-term assets and loans given are investing; interest paid is a cost of finance for a non-financial company.',
  scheme: [['Any two correct', 1], ['All four correct', 1]],
}));

const PF = [
  ['Purchase of a patent for a new dye', 'Investing'],
  ['Wages paid to weavers', 'Operating'],
  ['Redemption of preference shares at a premium', 'Financing'],
  ['Commission received for selling another mill’s rugs', 'Operating'],
  ['Proposed dividend of the previous year paid', 'Financing'],
  ['Sale of shares held as a long-term investment', 'Investing'],
];
Q('s3_classify6', short({
  t: 1, d: 2, c: 'application', marks: 3,
  stem: `Sach Pass Rugs Ltd, an imagined carpet maker at Killar, had the following cash transactions in 2025-26. Classify each as an operating, investing or financing activity.\n\n${PF.map((x, i) => `(${i + 1}) ${x[0]}.`).join('\n')}`,
  model: md(['Transaction', 'Activity'], PF.map(([l, a]) => [l, bold(a)])),
  sol: 'Ask whether each item is trading, a long-term asset or investment, or a change in owners’ capital and borrowings; commission is a trading receipt.',
  scheme: [['Items 1 and 2', 1], ['Items 3 and 4', 1], ['Items 5 and 6', 1]],
}));

Q('mt_activities', match({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Match each cash transaction of an imagined spinning mill, Rumtse Yarns Ltd, in column A with its place in the cash flow statement in column B.',
  pairs: [
    ['Payment to wool suppliers', 'Operating activity'],
    ['Purchase of a carding machine', 'Investing activity'],
    ['Redemption of debentures', 'Financing activity'],
    ['Purchase of 60-day treasury bills with cash', 'Not a cash flow (switch within cash equivalents)'],
  ],
  sol: 'Trading is operating, long-term assets are investing, capital and borrowings are financing; a switch between cash and cash equivalents is not a flow.',
}));

Q('l5_theory', long({
  t: 1, d: 2, c: 'understanding', marks: 5,
  stem: 'A new accounts assistant at Kasara Ghat Engineering Ltd, an imagined pump maker at Igatpuri, has to brief the directors.\n\n(a) Explain the meaning of a cash flow statement and of cash equivalents, with one example of a cash equivalent. (2 marks)\n\n(b) Explain the three activities into which AS 3 (revised) classifies cash flows, giving one inflow and one outflow of Kasara Ghat for each. (3 marks)',
  model: '**(a)** A **cash flow statement** shows the inflows and outflows of cash and cash equivalents of an enterprise during a period, classified into operating, investing and financing activities, and reconciles the opening and closing balances. **Cash equivalents** are short-term, highly liquid investments, readily convertible into known amounts of cash and subject to an insignificant risk of change in value, normally maturing within three months of acquisition; for example, a 90-day treasury bill bought on issue.\n\n**(b)**\n- **Operating activities:** the principal revenue-producing activities of the company and others that are not investing or financing. Inflow: cash received from customers for pumps. Outflow: payment to suppliers of castings, wages, income tax.\n- **Investing activities:** acquisition and disposal of long-term assets and of investments that are not cash equivalents. Inflow: sale proceeds of an old lathe; interest received on investments. Outflow: purchase of a testing rig or of shares of another company; a loan given.\n- **Financing activities:** activities that change the size and composition of owners’ capital and borrowings. Inflow: issue of shares or debentures; a term loan raised. Outflow: redemption of debentures; interest and dividends paid.',
  sol: 'Part (a) needs both definitions and an example; part (b) needs, for each activity, its meaning plus a pump maker’s own inflow and outflow.',
  scheme: [['(a) Meaning of the statement', 1], ['(a) Cash equivalents with example', 1], ['(b) Operating', 1], ['(b) Investing', 1], ['(b) Financing', 1]],
}));

// ================================================================ t02 Operating activities by the indirect method
const BO = { open: 180000, close: 260000, gr: 50000, prev: 70000, interim: 30000, tax: 90000, next: 100000 };
const BO_npbt = pinv(BO.close - BO.open + BO.gr + BO.prev + BO.interim + BO.tax, 320000, 'Bodimettu net profit before tax');
Q('m_npbt', mcq({
  t: 2, d: 3, c: 'application',
  stem: `The balance in the Statement of Profit and Loss of Bodimettu Spices Ltd, an imagined company, rose from ${rs(BO.open)} to ${rs(BO.close)} in 2025-26. During the year it transferred ${rs(BO.gr)} to general reserve, paid the dividend of ${rs(BO.prev)} proposed for 2024-25 and an interim dividend of ${rs(BO.interim)}, and made a provision for tax of ${rs(BO.tax)}. In May 2026 the directors proposed a dividend of ${rs(BO.next)} for 2025-26. Its net profit before tax is`,
  opts: [rs(BO_npbt), rs(BO_npbt + BO.next), rs(BO_npbt - BO.tax), rs(BO_npbt - BO.interim)],
  sol: `${chain([BO.close - BO.open, BO.gr, BO.prev, BO.interim, BO.tax], BO_npbt, 'Bodimettu')}. The dividend proposed for 2025-26 has not been appropriated yet (a contingent liability), so it is not added.`,
}));

const KG = operating({ npbt: 360000, adds: [['Depreciation', 70000], ['Goodwill written off', 15000], ['Interest on debentures (finance cost)', 27000]], less: [['Profit on sale of machinery', 9000], ['Dividend received', 6000]] });
pinv(KG.opbwc, 457000, 'Kasara operating profit before working capital changes');
Q('m_opbwc', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Kasara Ghat Pumps Ltd, an imagined company, earned a net profit before tax of ${rs(KG.npbt)} for 2025-26 after charging depreciation ${rs(70000)}, goodwill written off ${rs(15000)} and interest on debentures ${rs(27000)}, and after crediting a profit of ${rs(9000)} on sale of machinery and a dividend received of ${rs(6000)}. Its operating profit before working capital changes is`,
  opts: [rs(KG.opbwc), rs(KG.npbt + 70000 + 15000), rs(KG.npbt + 70000 + 15000 + 27000 + 9000 + 6000), rs(KG.npbt + 70000 + 15000 + 27000)],
  sol: `${chain([KG.npbt, 70000, 15000, 27000, -9000, -6000], KG.opbwc, 'Kasara')}: add back the non-cash charges and the finance cost, take out the non-operating gains.`,
}));

Q('m_wc_receivables', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Trade receivables of Thal Ghat Valves Ltd, an imagined company at Vaitarna, rose from ₹2,10,000 to ₹2,55,000 during 2025-26. In the operating section by the indirect method the change is',
  opts: ['deducted, because ₹45,000 of the year’s sales is still uncollected', 'added, because the company is owed more', 'shown under investing activities as credit given', 'ignored, because receivables are not cash'],
  sol: 'An increase in a current asset ties up cash: revenue counted in profit has not been received, so the increase is deducted. A decrease would be added.',
}));

const FO = operating({ npbt: 0, adds: [['x', 240000]], wc: [['inventories', 120000, 100000, 'A'], ['trade receivables', 90000, 125000, 'A'], ['trade payables', 75000, 60000, 'L'], ['outstanding expenses', 8000, 14000, 'L']] });
pinv(FO.cashGen, 216000, 'Fotula cash generated');
Q('m_wc_sum', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Fotula Dry Fruits Ltd, an imagined company, has an operating profit before working capital changes of ${rs(FO.opbwc)}. During the year inventories fell by ${rs(20000)}, trade receivables rose by ${rs(35000)}, trade payables fell by ${rs(15000)} and outstanding expenses rose by ${rs(6000)}. Cash generated from operations is`,
  opts: [rs(FO.cashGen), rs(FO.opbwc - 20000 + 35000 + 15000 - 6000), rs(FO.opbwc + 20000 - 35000 + 15000 + 6000), rs(FO.opbwc - 35000 - 15000)],
  sol: `${chain([FO.opbwc, ...FO.wcRows.map((x) => x[1])], FO.cashGen, 'Fotula')}: a fall in a current asset and a rise in a current liability add; the opposite changes deduct.`,
}));

Q('ar_dep_source', ar({
  t: 2, d: 3, c: 'understanding', key: 'c',
  a: 'Depreciation on the looms of an imagined weaving company, Pensi La Handlooms Ltd, is added back to net profit before tax in its operating section.',
  r: 'Depreciation brings cash into the business, like any other source of funds.',
  sol: 'A is true: depreciation was deducted in arriving at profit but no cash went out for it, so it is added back. R is false: depreciation brings in no cash; the cash came from the revenue that the profit figure already contains.',
}));

Q('ar_wc_payables', ar({
  t: 2, d: 2, c: 'understanding', key: 'a',
  a: 'An increase in the trade payables of an imagined bakery, Diva Ghat Breads Ltd, is added when its cash generated from operations is worked out.',
  r: 'Part of the purchases charged in arriving at profit was still unpaid at the year end, so less cash went out than the expense shows.',
  sol: 'Both are true and R explains A: the unpaid part of the purchases is an expense without a cash outflow this year, so the increase in payables is added.',
}));

Q('fb_opbwc', fb({
  t: 2, d: 2, c: 'understanding',
  stem: 'In the operating section of Anmod Timber Ltd, an imagined saw mill, net profit before tax adjusted for depreciation, amortisation, finance costs and non-operating gains is called operating profit before ___ capital changes.',
  acc: [['working']],
  sol: 'The subtotal is operating profit before working capital changes; inventories, receivables and payables are adjusted after it.',
}));

const SP_n = { open: 110000, close: 170000, gr: 40000, interim: 35000, prev: 50000, tax: 80000 };
const SP_npbt = pinv(SP_n.close - SP_n.open + SP_n.gr + SP_n.interim + SP_n.prev + SP_n.tax, 265000, 'Shencottah net profit before tax');
Q('n_npbt', num({
  t: [2, 5], d: 3, c: 'application', marks: 1, value: SP_npbt, unit: '₹',
  stem: `Shencottah Timber Ltd, an imagined company at Puliyara, shows a balance in the Statement of Profit and Loss of ${rs(SP_n.open)} on 31 March 2025 and ${rs(SP_n.close)} on 31 March 2026. During 2025-26 it transferred ${rs(SP_n.gr)} to general reserve, paid an interim dividend of ${rs(SP_n.interim)} and the dividend of ${rs(SP_n.prev)} proposed for 2024-25, and provided ${rs(SP_n.tax)} for tax. Find its net profit before tax (in ₹).`,
  sol: `Increase in surplus plus every appropriation made during the year plus the tax provision: ${chain([SP_n.close - SP_n.open, SP_n.gr, SP_n.interim, SP_n.prev, SP_n.tax], SP_npbt, 'Shencottah')}, that is ₹${fig(SP_npbt)}.`,
}));

const CD = { open: 95000, close: 140000, grA: 60000, grB: 85000, prev: 40000, interim: 20000, tax: 55000 };
const CD_npbt = pinv(CD.close - CD.open + (CD.grB - CD.grA) + CD.prev + CD.interim + CD.tax, 185000, 'Charmadi Estates net profit before tax');
Q('s2_npbt', short({
  t: 2, d: 3, c: 'application', marks: 2,
  stem: `From the following information of Charmadi Estates Ltd, an imagined coffee company at Mudigere, compute its net profit before tax for 2025-26.\n\n${extract([['Balance in the Statement of Profit and Loss', CD.open, CD.close], ['General reserve', CD.grA, CD.grB]])}\n\nDuring 2025-26: dividend proposed for 2024-25 paid ${rs(CD.prev)}; interim dividend paid ${rs(CD.interim)}; provision for tax made ${rs(CD.tax)}. The directors have proposed a dividend of ${rs(57000)} for 2025-26.`,
  model: `${md(['Net profit before tax', '₹'], [
    ['Increase in surplus', fig(CD.close - CD.open)],
    ['Add: Transfer to general reserve', fig(CD.grB - CD.grA)],
    ['Add: Proposed dividend for 2024-25 paid', fig(CD.prev)],
    ['Add: Interim dividend for 2025-26', fig(CD.interim)],
    [bold('Net profit after tax'), bold(fig(CD_npbt - CD.tax))],
    ['Add: Provision for tax', fig(CD.tax)],
    [bold('Net profit before tax'), bold(fig(CD_npbt))],
  ], [1])}\n\nThe dividend of ${rs(57000)} proposed for 2025-26 is a contingent liability; it was not appropriated out of this year’s profit, so it is not added.`,
  sol: 'Rebuild profit from the retained part: add back each appropriation actually made in the year, then the tax charge.',
  scheme: [[`Net profit after tax ${rs(CD_npbt - CD.tax)}`, 1], [`Net profit before tax ${rs(CD_npbt)} (proposed dividend for 2025-26 ignored)`, 1]],
}));

const AW = operating({ npbt: 0, adds: [['x', 310000]], wc: [['inventories', 145000, 170000, 'A'], ['trade receivables', 130000, 118000, 'A'], ['prepaid expenses', 7000, 4000, 'A'], ['trade payables', 96000, 108000, 'L'], ['outstanding wages', 18000, 12000, 'L']] });
pinv(AW.cashGen, 306000, 'Amba Ghat cash generated');
Q('s2_wc', short({
  t: 2, d: 3, c: 'application', marks: 2,
  stem: `Amba Ghat Jaggery Ltd, an imagined company at Sakharpa, has an operating profit before working capital changes of ${rs(AW.opbwc)} for 2025-26. Compute its cash generated from operations.\n\n${extract([['Inventories', 145000, 170000], ['Trade receivables', 130000, 118000], ['Prepaid expenses', 7000, 4000], ['Trade payables', 96000, 108000], ['Outstanding wages', 18000, 12000]])}`,
  model: stmtTable([['Operating profit before working capital changes', AW.opbwc, null], ...AW.wcRows.map(([l, v]) => [l, v, null]), [bold('Cash generated from operations'), null, AW.cashGen]]).md,
  sol: 'Take each current item’s change in turn: assets up deduct, assets down add; liabilities up add, liabilities down deduct.',
  scheme: [['Five changes with correct signs', 1], [`Cash generated ${rs(AW.cashGen)}`, 1]],
}));

const KS = operating({ npbt: 240000, adds: [['Depreciation on plant', 45000], ['Loss on sale of furniture', 6000], ['Interest on long-term loan (finance cost)', 21000]], less: [['Interest received on investments', 8000]], wc: [['inventories', 90000, 115000, 'A'], ['trade receivables', 80000, 66000, 'A'], ['trade payables', 70000, 62000, 'L'], ['outstanding expenses', 9000, 13000, 'L']], taxPaid: 42000 });
pinv(KS.A, 247000, 'Kashedi net cash from operating activities');
Q('s3_cfo_small', short({
  t: 2, d: 3, c: 'application', marks: 3,
  stem: `Kashedi Fisheries Ltd, an imagined seafood company, earned a net profit before tax of ${rs(KS.npbt)} in 2025-26 after charging depreciation on plant ${rs(45000)}, a loss of ${rs(6000)} on sale of furniture and interest on a long-term loan ${rs(21000)}, and after crediting interest of ${rs(8000)} received on investments. Income tax paid was ${rs(KS.taxPaid)}. Compute the net cash flow from operating activities.\n\n${extract([['Inventories', 90000, 115000], ['Trade receivables', 80000, 66000], ['Trade payables', 70000, 62000], ['Outstanding expenses', 9000, 13000]])}`,
  model: stmtTable(KS.rows).md,
  sol: 'Undo the non-cash and non-operating items, adjust each current item by the direction of its change, then deduct tax paid.',
  scheme: [[`Operating profit before working capital changes ${rs(KS.opbwc)}`, 1], [`Cash generated from operations ${rs(KS.cashGen)}`, 1], [`Net cash from operating activities ${rs(KS.A)}`, 1]],
}));

const PH = operating({
  npbt: 420000,
  adds: [['Depreciation', 64000], ['Patents written off (amortisation)', 12000], ['Loss on sale of a vehicle', 7000], ['Increase in provision for doubtful debts', 3000], ['Interest on 10% debentures (finance cost)', 30000]],
  less: [['Profit on sale of investments', 15000], ['Dividend received', 10000]],
  wc: [['inventories', 160000, 205000, 'A'], ['trade receivables', 140000, 150000, 'A'], ['trade payables', 120000, 141000, 'L'], ['outstanding expenses', 16000, 11000, 'L']],
  taxPaid: 88000,
});
pinv(PH.opbwc, 511000, 'Phonda operating profit before working capital changes');
pinv(PH.A, 384000, 'Phonda net cash from operating activities');
Q('l5_cfo', long({
  t: [2, 5], d: 4, c: 'application', marks: 5,
  stem: `Phonda Ghat Mangoes Ltd, an imagined company at Kankavli, reports a net profit before tax of ${rs(PH.npbt)} for 2025-26. It was arrived at after charging depreciation ${rs(64000)}, patents written off ${rs(12000)}, loss on sale of a vehicle ${rs(7000)}, an increase of ${rs(3000)} in the provision for doubtful debts and interest on 10% debentures ${rs(30000)}, and after crediting profit on sale of investments ${rs(15000)} and dividend received ${rs(10000)}. Income tax paid was ${rs(PH.taxPaid)}.\n\n${extract([['Inventories', 160000, 205000], ['Trade receivables (gross)', 140000, 150000], ['Trade payables', 120000, 141000], ['Outstanding expenses', 16000, 11000]])}\n\n(a) Compute the operating profit before working capital changes. (2 marks)\n\n(b) Prepare the cash flows from operating activities section. (3 marks)`,
  model: `**(a)** ${chain([PH.npbt, 64000, 12000, 7000, 3000, 30000, -15000, -10000], PH.opbwc, 'Phonda a')}, that is **${rs(PH.opbwc)}**: non-cash charges, the loss and the finance cost added; the profit on investments and the dividend (investing) deducted.\n\n**(b)**\n\n${stmtTable(PH.rows).md}\n\nThe receivables are shown gross, so the increase in the provision is added back as a non-cash charge; using net receivables instead gives the same cash figure.`,
  sol: 'Part (a) reverses every non-cash and non-operating item in profit; part (b) continues with the working-capital changes and the tax actually paid.',
  scheme: [['(a) Adjustments with correct signs', 1], [`(a) ${rs(PH.opbwc)}`, 1], ['(b) Working-capital changes', 1], [`(b) Cash generated ${rs(PH.cashGen)}`, 1], [`(b) Net cash from operating activities ${rs(PH.A)}`, 1]],
}));

// ================================================================ t03 Investing activities
const TG = fixedAsset({ name: 'carding machines', a: 800000, b: 950000, acc: [200000, 240000], sold: { cost: 110000, accDep: 60000, price: 45000 } });
pinv(TG.purchase, 260000, 'Taglang purchase');
Q('m_purchase', mcq({
  t: 3, d: 3, c: 'application',
  stem: `Taglang Spinners Ltd, an imagined company, shows carding machines at cost of ${rs(TG.a)} on 31 March 2025 and ${rs(TG.b)} on 31 March 2026. During the year a machine that had cost ${rs(TG.sold.cost)} was sold. The cost of machines bought in the year is`,
  opts: [rs(TG.purchase), rs(TG.b - TG.a), rs(TG.b - TG.a - TG.sold.cost), rs(TG.purchase + TG.sold.cost)],
  sol: `At cost: opening + purchases − cost of the machine sold = closing, so purchases = ${chain([TG.b, TG.sold.cost, -TG.a], TG.purchase, 'Taglang')}.`,
}));

Q('m_sale_proceeds', mcq({
  t: 3, d: 3, c: 'understanding',
  stem: 'Pangsau Bamboo Ltd, an imagined company at Nampong, sold a splitting machine with a written-down value of ₹64,000 at a profit of ₹11,000. How does the sale appear in its cash flow statement (indirect method)?',
  opts: ['₹11,000 deducted in operating activities; ₹75,000 shown as an investing inflow', '₹11,000 added in operating activities; ₹64,000 shown as an investing inflow', '₹75,000 shown as an operating inflow only', '₹11,000 deducted in operating activities; ₹64,000 shown as an investing inflow'],
  sol: 'The cash received is the written-down value plus the profit, ₹75,000, and that full amount is the investing inflow. The profit is already inside net profit but is not operating cash, so it is deducted in the operating section.',
}));

const CL = [
  ['Purchase of a milk-chilling plant', -320000, 'B'],
  ['Sale of an old chilling plant', 40000, 'B'],
  ['Purchase of non-current investments', -60000, 'B'],
  ['Sale of non-current investments (cost ₹70,000)', 85000, 'B'],
  ['Interest received on investments', 9000, 'B'],
  ['Dividend paid', -50000, 'C'],
];
const CL_B = pinv(sum(pick(CL, 'B')), -246000, 'Chang La investing');
Q('m_invest_net', mcq({
  t: 3, d: 3, c: 'application',
  stem: `Chang La Creamery Ltd, an imagined dairy, had the following cash flows in 2025-26:\n\n${md(['Cash flow', '₹'], CL.map(([l, v]) => [l, fig(Math.abs(v))]), [1])}\n\nIts net cash used in investing activities is`,
  opts: [rs(-CL_B), rs(-CL_B + 50000), rs(-CL_B + 15000), rs(-CL_B - 9000)],
  sol: `${chain(pick(CL, 'B'), CL_B, 'Chang La')}. The dividend paid is financing; the full sale price of the investments, not the profit, is the inflow.`,
}));

Q('tf_loss_sale', tf({
  t: 3, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? When Sengottai Saw Mills Ltd, an imagined company, sells an old saw with a book value of ₹50,000 for ₹38,000, its investing section shows ₹50,000 as the inflow.',
  sol: 'The investing inflow is the cash actually received, ₹38,000. The loss of ₹12,000 is added back in the operating section, because it reduced profit without any cash going out.',
}));

const KH_d = fixedAsset({ name: 'ropeway equipment', a: 900000, b: 990000, acc: [320000, 370000], sold: { cost: 90000, accDep: 55000, price: 30000 } });
pinv(KH_d.dep, 105000, 'Parshuram depreciation');
Q('n_dep', num({
  t: 3, d: 3, c: 'application', marks: 1, value: KH_d.dep, unit: '₹',
  stem: `Parshuram Ghat Ropeways Ltd, an imagined company at Khed, shows accumulated depreciation on ropeway equipment of ${rs(KH_d.acc[0])} on 31 March 2025 and ${rs(KH_d.acc[1])} on 31 March 2026. Equipment sold during the year carried accumulated depreciation of ${rs(KH_d.sold.accDep)}. Find the depreciation charged for 2025-26 (in ₹).`,
  sol: `In the accumulated depreciation account the year’s charge balances the account: ${chain([KH_d.acc[1], KH_d.sold.accDep, -KH_d.acc[0]], KH_d.dep, 'Parshuram')}, that is ₹${fig(KH_d.dep)}.`,
}));

const KT = fixedAsset({ name: 'kilns', a: 600000, b: 650000, dep: 60000, sold: { bv: 40000, price: 32000 } });
pinv(KT.purchase, 150000, 'Karul Ghat purchase');
Q('n_purchase_wdv', num({
  t: 3, d: 4, c: 'application', marks: 1, value: KT.purchase, unit: '₹',
  stem: `Karul Ghat Tiles Ltd, an imagined company at Vaibhavwadi, shows kilns at written-down value of ${rs(KT.a)} on 31 March 2025 and ${rs(KT.b)} on 31 March 2026. Depreciation of ${rs(KT.dep)} was charged for the year, and a kiln with a written-down value of ${rs(KT.bv)} was sold at a loss of ${rs(KT.loss)}. Find the cost of kilns bought during the year (in ₹).`,
  sol: `At written-down value: closing + written-down value of the kiln sold + depreciation − opening = ${chain([KT.b, KT.bv, KT.dep, -KT.a], KT.purchase, 'Karul')}, that is ₹${fig(KT.purchase)}. The loss does not change the purchase.`,
}));

const HW = fixedAsset({ name: 'machinery', a: 500000, b: 620000, acc: [140000, 165000], sold: { cost: 70000, accDep: 38000, price: 29000 } });
pinv(HW.dep, 63000, 'Hatlang depreciation');
Q('s2_dep_acc', short({
  t: 3, d: 3, c: 'application', marks: 2,
  stem: `Hatlang Tea Machinery Ltd, an imagined company, shows accumulated depreciation on machinery of ${rs(HW.acc[0])} on 31 March 2025 and ${rs(HW.acc[1])} on 31 March 2026. A machine costing ${rs(HW.sold.cost)}, on which ${rs(HW.sold.accDep)} of depreciation had accumulated, was sold during the year. Prepare the accumulated depreciation account and state where the depreciation for the year appears in the cash flow statement.`,
  model: `${HW.accLedger.md}\n\nDepreciation for 2025-26, **${rs(HW.dep)}**, is a non-cash charge: it is **added back** to net profit before tax in the operating section.`,
  sol: 'The depreciation transferred out on the asset sold is the debit that students often forget; the year’s charge is then the balancing figure.',
  scheme: [[`Account with depreciation ${rs(HW.dep)}`, 1], ['Added back in operating activities', 1]],
}));

const SM = fixedAsset({ name: 'roasting machinery', a: 1100000, b: 1340000, acc: [280000, 330000], sold: { cost: 160000, accDep: 95000, price: 52000 } });
pinv(SM.purchase, 400000, 'Sampaje purchase'); pinv(SM.dep, 145000, 'Sampaje depreciation'); pinv(SM.loss, 13000, 'Sampaje loss');
Q('s3_machinery', short({
  t: 3, d: 4, c: 'application', marks: 3,
  stem: `Sampaje Coffee Roasters Ltd, an imagined company at Sullia, shows roasting machinery at cost of ${rs(SM.a)} and ${rs(SM.b)}, and accumulated depreciation of ${rs(SM.acc[0])} and ${rs(SM.acc[1])}, on 31 March 2025 and 2026. During 2025-26 a roaster costing ${rs(SM.sold.cost)} (accumulated depreciation ${rs(SM.sold.accDep)}) was sold for ${rs(SM.price)}. Prepare the machinery account and the accumulated depreciation account, and state how the figures found appear in the cash flow statement.`,
  model: `${SM.ledger.md}\n\n${SM.accLedger.md}\n\n**In the statement:** depreciation ${rs(SM.dep)} and loss on sale ${rs(SM.loss)} are added back in operating activities; purchase of machinery **${rs(-SM.purchase)}** and sale proceeds **${rs(SM.price)}** are shown under investing activities.`,
  sol: 'The asset account at cost gives the purchase and the loss; the accumulated depreciation account gives the year’s charge.',
  scheme: [[`Machinery account: loss ${rs(SM.loss)}, purchase ${rs(SM.purchase)}`, 1], [`Accumulated depreciation account: ${rs(SM.dep)}`, 1], ['Treatment in operating and investing', 1]],
}));

const KW_l = fixedAsset({ name: 'land', a: 700000, b: 820000, dep: 0 });
const KW_i = investAccount({ name: 'non-current investments', a: 260000, b: 210000, sold: { cost: 120000, price: 108000 } });
const KW_sec = section('B', 'investing', [['Purchase of land', -KW_l.purchase], ['Purchase of non-current investments', -KW_i.purchase], ['Proceeds from sale of non-current investments', KW_i.price], ['Loan given to a dealer', -50000], ['Interest received on investments', 14000]]);
pinv(KW_sec.total, -118000, 'Kumbharli Fruit investing');
Q('s3_investing', short({
  t: 3, d: 3, c: 'application', marks: 3,
  stem: `Kumbharli Fruit Products Ltd, an imagined company, shows land (not depreciated) of ${rs(KW_l.a)} and ${rs(KW_l.b)}, and non-current investments of ${rs(KW_i.a)} and ${rs(KW_i.b)}, on 31 March 2025 and 2026. During 2025-26 investments costing ${rs(KW_i.cost)} were sold at a loss of ${rs(KW_i.loss)}; a loan of ${rs(50000)} was given to a dealer; interest of ${rs(14000)} was received on investments. No land was sold. Prepare the investments account and compute the net cash flow from investing activities.`,
  model: `${KW_i.ledger.md}\n\n${stmtTable(KW_sec.rows).md}\n\nThe loss of ${rs(KW_i.loss)} is added back in the operating section and the interest received is deducted there.`,
  sol: 'Land bought equals the increase, since none was sold; the investments account gives the purchase after the sale at cost and the loss.',
  scheme: [[`Investments account: purchase ${rs(KW_i.purchase)}`, 1], ['Land, sale proceeds, loan and interest placed', 1], [`Net cash used in investing ${rs(-KW_sec.total)}`, 1]],
}));

const KK = fixedAsset({ name: 'plant', a: 1500000, b: 1720000, acc: [400000, 455000], sold: { cost: 180000, accDep: 120000, price: 75000 } });
const KK_i = investAccount({ name: 'non-current investments', a: 300000, b: 340000, sold: { cost: 90000, price: 84000 } });
const KK_sec = section('B', 'investing', [['Purchase of plant', -KK.purchase], ['Proceeds from sale of plant', KK.price], ['Purchase of non-current investments', -KK_i.purchase], ['Proceeds from sale of non-current investments', KK_i.price], ['Dividend received on investments', 16000]]);
pinv(KK.purchase, 400000, 'Shingo La purchase'); pinv(KK.dep, 175000, 'Shingo La depreciation'); pinv(KK.profit, 15000, 'Shingo La profit on plant'); pinv(KK_sec.total, -355000, 'Shingo La investing');
Q('l5_investing', long({
  t: 3, d: 4, c: 'application', marks: 5,
  stem: `Shingo La Glass Ltd, an imagined company at Darcha, gives the following extracts.\n\n${extract([['Plant (at cost)', KK.a, KK.b], ['Accumulated depreciation on plant', KK.acc[0], KK.acc[1]], ['Non-current investments', KK_i.a, KK_i.b]])}\n\nDuring 2025-26 plant costing ${rs(KK.sold.cost)} (accumulated depreciation ${rs(KK.sold.accDep)}) was sold for ${rs(KK.price)}; investments costing ${rs(KK_i.cost)} were sold for ${rs(KK_i.price)}; a dividend of ${rs(16000)} was received.\n\n(a) Prepare the plant account and the accumulated depreciation account. (3 marks)\n\n(b) Prepare the cash flows from investing activities section. (2 marks)`,
  model: `**(a)**\n\n${KK.ledger.md}\n\n${KK.accLedger.md}\n\n**(b)** Investments bought: ${chain([KK_i.b, KK_i.cost, -KK_i.a], KK_i.purchase, 'Shingo La inv')} (loss on sale ${rs(KK_i.loss)}).\n\n${stmtTable(KK_sec.rows).md}\n\nIn the operating section: depreciation ${rs(KK.dep)} and the loss on investments ${rs(KK_i.loss)} are added back; the profit on plant ${rs(KK.profit)} and the dividend are deducted.`,
  sol: 'Build the two plant accounts first (purchase and depreciation are their balancing figures), then the investments working, then list every investing flow at its cash amount.',
  scheme: [[`(a) Plant account: profit ${rs(KK.profit)}, purchase ${rs(KK.purchase)}`, 2], [`(a) Accumulated depreciation: ${rs(KK.dep)}`, 1], [`(b) Investments purchase ${rs(KK_i.purchase)} and all flows placed`, 1], [`(b) Net cash used ${rs(-KK_sec.total)}`, 1]],
}));

// ================================================================ t04 Financing activities
Q('m_issue_exp', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Dive Ghat Steel Ltd, an imagined company at Saswad, issued equity shares for ₹6,00,000 and paid ₹12,000 as underwriting commission and other issue expenses, which it wrote off against securities premium. In its cash flow statement',
  opts: ['₹6,00,000 is a financing inflow and ₹12,000 a financing outflow', '₹5,88,000 is shown as an investing inflow', '₹12,000 is added back to net profit in the operating section', '₹12,000 is not shown, because it was written off against securities premium'],
  sol: 'The issue brings in the full amount from shareholders; the issue expenses are a cash payment made to raise that capital, so both belong to financing activities. Writing them off against the premium does not change the cash paid.',
}));

const CG = { face: 300000, rate: 5 };
const CG_out = pinv(CG.face + pctOf(CG.rate, CG.face), 315000, 'Chorla Ghat redemption outflow');
Q('m_redemption', mcq({
  t: 4, d: 3, c: 'application',
  stem: `Chorla Ghat Cashews Ltd, an imagined company at Keri, redeemed ${rs(CG.face)} of its 8% debentures at a premium of ${CG.rate}%, the premium being written off against securities premium. The financing outflow on redemption is`,
  opts: [rs(CG_out), rs(CG.face), rs(pctOf(CG.rate, CG.face)), rs(CG.face - pctOf(CG.rate, CG.face))],
  sol: `Debenture-holders were paid the face value plus the premium: ${fig(CG.face)} + ${fig(pctOf(CG.rate, CG.face))} = ${fig(CG_out)}. The source used to write off the premium is a book entry and does not alter the cash paid.`,
}));

const AN = [
  ['Equity shares issued at a premium of 10% (face value ₹4,00,000)', 440000, 'C'],
  ['Share issue expenses paid', -8000, 'C'],
  ['Long-term loan repaid', -150000, 'C'],
  ['Interest paid on the long-term loan', -18000, 'C'],
  ['Dividend proposed for 2024-25 paid', -60000, 'C'],
  ['Interest received on investments', 7000, 'B'],
];
const AN_C = pinv(sum(pick(AN, 'C')), 204000, 'Anmod financing');
Q('m_fin_total', mcq({
  t: 4, d: 3, c: 'application',
  stem: `Anmod Plywood Ltd, an imagined company at Londa, had these cash transactions in 2025-26:\n\n${md(['Transaction', '₹'], AN.map(([l, v]) => [l, fig(Math.abs(v))]), [1])}\n\nIts net cash from financing activities is`,
  opts: [rs(AN_C), rs(AN_C + 7000), rs(AN_C - 40000), rs(AN_C + 8000)],
  sol: `${chain(pick(AN, 'C'), AN_C, 'Anmod')}. Interest received is investing for a non-financial company; the premium is part of the issue proceeds.`,
}));

Q('ar_issue_exp', ar({
  t: 4, d: 3, c: 'understanding', key: 'b',
  a: 'Share issue expenses paid by an imagined company, Kuari Treks Ltd, are shown as an outflow under financing activities.',
  r: 'Share issue expenses may be written off against the balance in the securities premium account.',
  sol: 'Both are true, but R is not the reason for A. The expenses are financing because they are a cost of raising share capital; how they are written off in the books does not decide the classification.',
}));

const BU = { prefRed: 200000, prefPrem: 10, eq: 300000, eqPrem: 10, exp: 5000, div: 30000 };
const BU_sec = section('C', 'financing', [['Proceeds from issue of equity shares (including premium)', BU.eq + pctOf(BU.eqPrem, BU.eq)], ['Share issue expenses paid', -BU.exp], ['Redemption of preference shares (including premium)', -(BU.prefRed + pctOf(BU.prefPrem, BU.prefRed))], ['Dividend paid', -BU.div]]);
pinv(BU_sec.total, 75000, 'Bumla financing');
Q('n_fin', num({
  t: 4, d: 3, c: 'application', marks: 1, value: BU_sec.total, unit: '₹',
  stem: `Bumla Yak Products Ltd, an imagined company at Zemithang, redeemed ${rs(BU.prefRed)} of preference shares at a premium of ${BU.prefPrem}%, issued equity shares of ${rs(BU.eq)} at a premium of ${BU.eqPrem}%, paid issue expenses of ${rs(BU.exp)} and paid a dividend of ${rs(BU.div)}. Find its net cash from financing activities (in ₹).`,
  sol: `${chain(BU_sec.items.map((x) => x[1]), BU_sec.total, 'Bumla')}, that is ₹${fig(BU_sec.total)}: both premiums are cash, received on the issue and paid on the redemption.`,
}));

const IE = premiumAccount({ a: 60000, b: 95000, debits: [['Bank A/c (share issue expenses written off)', 9000]] });
pinv(IE.received, 44000, 'Kambam premium received');
const IE_cash = pinv(220000 + IE.received, 264000, 'Kambam share proceeds');
Q('s2_issue_exp', short({
  t: 4, d: 3, c: 'application', marks: 2,
  stem: `Kambam Vineyards Ltd, an imagined company, shows equity share capital of ${rs(880000)} and ${rs(1100000)}, and securities premium of ${rs(IE.a)} and ${rs(IE.b)}, on 31 March 2025 and 2026. Share issue expenses of ${rs(9000)} paid during the year were written off against securities premium. Find the cash raised by the issue and show the financing items.`,
  model: `${IE.ledger.md}\n\nProceeds from issue of equity shares = ${fig(220000)} + premium ${fig(IE.received)} = **${rs(IE_cash)}** (financing inflow); share issue expenses paid **${rs(-9000)}** (financing outflow).`,
  sol: 'The premium received is hidden by the write-off: rebuild it from the securities premium account before adding it to the face value issued.',
  scheme: [[`Premium received ${rs(IE.received)}`, 1], [`Inflow ${rs(IE_cash)} and outflow ${rs(9000)}`, 1]],
}));

const BG = { scA: 1000000, scB: 1300000, spA: 50000, spB: 60000, debA: 600000, debB: 400000, prem: 10, exp: 0, div: 90000 };
const BG_red = BG.debA - BG.debB;
const BG_int = interest(9, BG.debA, 6) + interest(9, BG.debB, 6);
const BG_sp = premiumAccount({ a: BG.spA, b: BG.spB, debits: [['Premium on redemption of debentures', pctOf(BG.prem, BG_red)]] });
const BG_sec = section('C', 'financing', [['Proceeds from issue of equity shares (including premium)', BG.scB - BG.scA + BG_sp.received], ['Redemption of 9% debentures (including premium)', -(BG_red + pctOf(BG.prem, BG_red))], ['Interest on 9% debentures paid', -BG_int], ['Proposed dividend for 2024-25 paid', -BG.div]]);
pinv(BG_int, 45000, 'Bhuibawda interest'); pinv(BG_sec.total, -25000, 'Bhuibawda financing');
Q('s3_financing', short({
  t: 4, d: 3, c: 'application', marks: 3,
  stem: `Bhuibawda Paper Ltd, an imagined company at Gaganbawda, shows the following.\n\n${extract([['Equity share capital', BG.scA, BG.scB], ['Securities premium', BG.spA, BG.spB], ['9% Debentures', BG.debA, BG.debB]])}\n\nDebentures of ${rs(BG_red)} were redeemed on 1 October 2025 at a premium of ${BG.prem}%, written off against securities premium; interest was paid half-yearly. Equity shares were issued for cash at a premium. The dividend of ${rs(BG.div)} proposed for 2024-25 was paid. Prepare the cash flows from financing activities section.`,
  model: `**Securities premium:** ${chain([BG.spB, pctOf(BG.prem, BG_red), -BG.spA], BG_sp.received, 'Bhuibawda sp')} received on the new shares.\n\n**Interest:** 9% on ${fig(BG.debA)} for six months (${fig(interest(9, BG.debA, 6))}) + 9% on ${fig(BG.debB)} for six months (${fig(interest(9, BG.debB, 6))}) = ${fig(BG_int)}.\n\n${stmtTable(BG_sec.rows).md}`,
  sol: 'Untangle the premium account first, then work interest period by period on the debentures outstanding.',
  scheme: [[`Share proceeds ${rs(BG.scB - BG.scA + BG_sp.received)} and redemption ${rs(BG_red + pctOf(BG.prem, BG_red))}`, 1], [`Interest ${rs(BG_int)} and dividend`, 1], [`Net cash used in financing ${rs(-BG_sec.total)}`, 1]],
}));

const KR = { prefA: 300000, prefB: 0, prem: 5, eqA: 1200000, eqB: 1400000, spA: 40000, eqPrem: 20, crrB: 100000 };
const KR_sp = premiumAccount({ a: KR.spA, b: KR.spA + pctOf(KR.eqPrem, KR.eqB - KR.eqA) - pctOf(KR.prem, KR.prefA), debits: [['Premium on redemption of preference shares', pctOf(KR.prem, KR.prefA)]] });
const KR_sec = section('C', 'financing', [['Proceeds from issue of equity shares (including premium)', KR.eqB - KR.eqA + KR_sp.received], ['Redemption of 9% preference shares (including premium)', -(KR.prefA + pctOf(KR.prem, KR.prefA))]]);
check(KR.prefA - (KR.eqB - KR.eqA) === KR.crrB, 'Losar Herbals capital redemption reserve = face redeemed − fresh issue');
pinv(KR_sec.total, -75000, 'Losar Herbals financing');
Q('s3_pref_redeem', short({
  t: 4, d: 4, c: 'application', marks: 3,
  stem: `Losar Herbals Ltd, an imagined company, redeemed all its 9% preference shares of ${rs(KR.prefA)} at a premium of ${KR.prem}% on 1 April 2025. To part-finance the redemption it issued equity shares of ${rs(KR.eqB - KR.eqA)} at a premium of ${KR.eqPrem}%, and it transferred ${rs(KR.crrB)} from the balance in the Statement of Profit and Loss to a capital redemption reserve. The redemption premium was written off against securities premium (opening balance ${rs(KR.spA)}). Show the financing items in the cash flow statement and state how the capital redemption reserve is treated.`,
  model: `${KR_sp.ledger.md}\n\n${stmtTable(KR_sec.rows).md}\n\n**Capital redemption reserve:** creating it only transfers ${rs(KR.crrB)} from the surplus to a reserve; no cash moves, so it is **not a cash flow**. When rebuilding net profit before tax, the transfer is **added back** to the change in surplus like a transfer to general reserve.`,
  sol: 'Cash moves twice, on the issue and on the redemption, each including its premium; the reserve is only a book transfer.',
  scheme: [[`Issue proceeds ${rs(KR.eqB - KR.eqA + KR_sp.received)}`, 1], [`Redemption ${rs(KR.prefA + pctOf(KR.prem, KR.prefA))}; net ${rs(KR_sec.total)}`, 1], ['Capital redemption reserve: no cash flow, added back in the profit working', 1]],
}));

Q('mt_isc_items', match({
  t: 4, d: 3, c: 'understanding', marks: 2,
  stem: 'Match each share or debenture transaction of an imagined company, Thakurwadi Rail Fittings Ltd, in column A with its treatment in the cash flow statement in column B.',
  pairs: [
    ['Equity shares issued for cash at a premium', 'Financing inflow including the premium'],
    ['Underwriting commission on that issue', 'Financing outflow'],
    ['Bonus shares issued out of general reserve', 'No cash flow'],
    ['Debentures redeemed at a premium', 'Financing outflow including the premium'],
  ],
  sol: 'Every amount actually received from or paid to the providers of capital is financing; book transfers such as a bonus issue are left out.',
}));

const KQ = { debA: 500000, debB: 350000, raisedLoan: 200000, loanDate: 9, spA: 80000, spB: 88000, scA: 900000, scB: 1000000, exp: 6000, interim: 50000, prev: 90000 };
const KQ_debInt = interest(10, KQ.debA, 3) + interest(10, KQ.debB, 9);
const KQ_loanInt = interest(12, KQ.raisedLoan, KQ.loanDate);
const KQ_sp = premiumAccount({ a: KQ.spA, b: KQ.spB, debits: [['Bank A/c (share issue expenses written off)', KQ.exp], ['Premium on redemption of debentures', pctOf(4, KQ.debA - KQ.debB)]] });
const KQ_sec = section('C', 'financing', [
  ['Proceeds from issue of equity shares (including premium)', KQ.scB - KQ.scA + KQ_sp.received],
  ['Share issue expenses paid', -KQ.exp],
  ['Redemption of 10% debentures (including premium)', -(KQ.debA - KQ.debB + pctOf(4, KQ.debA - KQ.debB))],
  ['Proceeds from 12% long-term loan', KQ.raisedLoan],
  ['Interest on 10% debentures paid', -KQ_debInt],
  ['Interest on 12% long-term loan paid', -KQ_loanInt],
  ['Proposed dividend for 2024-25 paid', -KQ.prev],
  ['Interim dividend for 2025-26 paid', -KQ.interim],
]);
pinv(KQ_sp.received, 20000, 'Khed premium received'); pinv(KQ_debInt, 38750, 'Khed debenture interest'); pinv(KQ_loanInt, 18000, 'Khed loan interest'); pinv(KQ_sec.total, -38750, 'Khed financing');
Q('l5_financing', long({
  t: 4, d: 4, c: 'application', marks: 5,
  stem: `Khed Ghat Polymers Ltd, an imagined company, gives the following.\n\n${extract([['Equity share capital', KQ.scA, KQ.scB], ['Securities premium', KQ.spA, KQ.spB], ['10% Debentures', KQ.debA, KQ.debB], ['12% Long-term loan', null, KQ.raisedLoan]])}\n\nAdditional information for 2025-26:\n\n${bullets([
    `Debentures of ${rs(KQ.debA - KQ.debB)} were redeemed on 30 June 2025 at a premium of 4%; equity shares were issued for cash at a premium; share issue expenses of ${rs(KQ.exp)} were paid. Both the redemption premium and the issue expenses were written off against securities premium.`,
    'The loan was taken on 1 July 2025. Interest on the debentures and the loan was paid up to 31 March 2026.',
    `The dividend proposed for 2024-25, ${rs(KQ.prev)}, and an interim dividend of ${rs(KQ.interim)} were paid. The directors have proposed a dividend of ${rs(120000)} for 2025-26.`,
  ])}\n\n(a) Prepare the securities premium account and compute the interest paid. (2 marks)\n\n(b) Prepare the cash flows from financing activities section. (3 marks)`,
  model: `**(a)**\n\n${KQ_sp.ledger.md}\n\nInterest on debentures = 10% on ${fig(KQ.debA)} for three months (${fig(interest(10, KQ.debA, 3))}) + 10% on ${fig(KQ.debB)} for nine months (${fig(interest(10, KQ.debB, 9))}) = ${fig(KQ_debInt)}. Interest on the loan = 12% on ${fig(KQ.raisedLoan)} for nine months = ${fig(KQ_loanInt)}.\n\n**(b)**\n\n${stmtTable(KQ_sec.rows).md}\n\nThe dividend of ${rs(120000)} proposed for 2025-26 has **no effect** on this year’s statement.`,
  sol: 'The premium received is the balancing figure once both write-offs are debited; interest is time-apportioned on what was outstanding in each part of the year.',
  scheme: [[`(a) Premium received ${rs(KQ_sp.received)}`, 1], [`(a) Interest ${rs(KQ_debInt)} and ${rs(KQ_loanInt)}`, 1], ['(b) Share and debenture items', 1], ['(b) Loan, interest and dividends (proposed 2025-26 ignored)', 1], [`(b) Net cash used ${rs(-KQ_sec.total)}`, 1]],
}));

// ================================================================ t05 Adjustments: tax, dividends, depreciation, amortisation, provision for doubtful debts
Q('m_prop_div', mcq({
  t: 5, d: 3, c: 'understanding',
  stem: 'The dividend of ₹1,00,000 proposed by the directors of Vaitarna Valves Ltd, an imagined company, for 2024-25 was approved and paid in August 2025. In May 2026 the directors proposed ₹1,20,000 for 2025-26. In the cash flow statement for 2025-26',
  opts: ['₹1,00,000 is a financing outflow; the ₹1,20,000 proposed has no effect', '₹1,20,000 is a financing outflow; the ₹1,00,000 was dealt with last year', '₹2,20,000 is shown as a financing outflow', 'neither amount appears, since proposed dividends are appropriations'],
  sol: 'Cash went out in 2025-26 only for the 2024-25 dividend, after the shareholders approved it. The dividend proposed for 2025-26 is only a contingent liability at the year end: no provision, no cash, no effect.',
}));

const KE = taxAccount({ a: 60000, b: 75000, provided: 95000 });
pinv(KE.paid, 80000, 'Kasheli tax paid');
Q('m_tax_paid', mcq({
  t: 5, d: 3, c: 'application',
  stem: `The provision for tax of Kasheli Ghat Prawns Ltd, an imagined company, was ${rs(KE.a)} on 31 March 2025 and ${rs(KE.b)} on 31 March 2026; the provision made for 2025-26 was ${rs(KE.provided)}. The income tax paid during 2025-26, deducted in the operating section, is`,
  opts: [rs(KE.paid), rs(KE.provided), rs(KE.b - KE.a), rs(KE.provided + KE.b - KE.a)],
  sol: `Provision for tax account: ${chain([KE.a, KE.provided, -KE.b], KE.paid, 'Kasheli')}. The provision itself was added back through net profit before tax.`,
}));

const BJ = { trA: 200000, trB: 240000, pA: 10000, pB: 14000 };
const BJ_eff = pinv((BJ.pB - BJ.pA) - (BJ.trB - BJ.trA), -36000, 'Bhuibawda Jaggery receivables effect');
check(BJ_eff === -((BJ.trB - BJ.pB) - (BJ.trA - BJ.pA)), 'gross and net receivables give the same cash');
Q('m_pdd', mcq({
  t: 5, d: 3, c: 'application',
  stem: `Bhuibawda Jaggery Ltd, an imagined company, shows trade receivables (gross) of ${rs(BJ.trA)} and ${rs(BJ.trB)}, and a provision for doubtful debts of ${rs(BJ.pA)} and ${rs(BJ.pB)}, on 31 March 2025 and 2026. Treating the increase in the provision as a non-cash charge, the two adjustments together reduce its cash from operating activities by`,
  opts: [rs(-BJ_eff), rs(BJ.trB - BJ.trA), rs(BJ.trB - BJ.trA + BJ.pB - BJ.pA), rs(BJ.pB - BJ.pA)],
  sol: `Add back the increase in the provision ${fig(BJ.pB - BJ.pA)}, deduct the increase in gross receivables ${fig(BJ.trB - BJ.trA)}: a net reduction of ${fig(-BJ_eff)}, the same as the rise in net receivables.`,
}));

Q('m_amort', mcq({
  t: 5, d: 2, c: 'understanding',
  stem: 'Gaganbawda Bottling Ltd, an imagined company, wrote off ₹30,000 of goodwill and ₹10,000 of patents during 2025-26. In the operating section by the indirect method the ₹40,000 is',
  opts: ['added back to net profit before tax, being amortisation that used no cash', 'deducted from net profit before tax', 'shown under investing activities as an outflow', 'shown under financing activities as an outflow'],
  sol: 'Writing off intangible assets is amortisation: it reduces profit but no cash leaves in that year (the cash went out when the goodwill or patents were bought, as an investing outflow).',
}));

Q('ar_prop_div', ar({
  t: 5, d: 3, c: 'understanding', key: 'd',
  a: 'The dividend proposed by the directors of an imagined company, Namika La Apricots Ltd, for 2025-26 is shown as a financing outflow in its cash flow statement for 2025-26.',
  r: 'A proposed dividend is disclosed as a contingent liability in the notes and is not provided for until the shareholders approve it.',
  sol: 'A is false: nothing is paid in 2025-26 and nothing is provided for, so the proposal has no effect on that year’s statement; it becomes an outflow in the year it is paid. R is true.',
}));

Q('ar_tax_paid', ar({
  t: 5, d: 3, c: 'understanding', key: 'b',
  a: 'In the operating section of an imagined company, Nampong Canes Ltd, the tax deducted is the tax paid, found from the provision for tax account, and not the provision made for the year.',
  r: 'The provision for tax is shown under current liabilities in the balance sheet.',
  sol: 'Both are true, but R does not explain A. A holds because the provision was added back through net profit before tax and only the amount actually paid is a cash outflow.',
}));

Q('tf_prev_prop', tf({
  t: 5, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? In the 2025-26 cash flow statement of Kasheli Pearl Farms Ltd, an imagined company, the dividend proposed for 2024-25 and paid in September 2025 is a financing outflow and is also added back when net profit before tax is rebuilt.',
  sol: 'It was paid out of the 2025-26 balance in the Statement of Profit and Loss, so it is added back to the change in surplus, and the cash paid is a financing outflow.',
}));

Q('tf_pdd', tf({
  t: 5, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? An increase in the provision for doubtful debts of Saswad Forgings Ltd, an imagined company, during the year is added back to net profit before tax when receivables are taken at their gross amount.',
  sol: 'The increase reduced profit, but no cash went out for it. Adding it back while deducting the rise in gross receivables gives the same answer as working with net receivables.',
}));

Q('mt_treatment', match({
  t: [2, 5], d: 3, c: 'understanding', marks: 2,
  stem: 'Match each item from the records of an imagined company, Aralvaimozhi Wind Power Ltd, with its treatment in the cash flow statement for 2025-26 (indirect method).',
  pairs: [
    ['Increase in provision for doubtful debts', 'Added back before working-capital changes'],
    ['Dividend proposed for 2025-26', 'No effect on the statement'],
    ['Premium paid on redemption of debentures', 'Financing outflow with the redemption'],
    ['Interest received on a loan given', 'Deducted in operating, shown under investing'],
  ],
  sol: 'Each adjustment either removes a non-cash item from profit or moves a flow to the activity it belongs to; a proposal not yet approved has no effect.',
}));

const KU = taxAccount({ a: 45000, b: 52000, provided: 88000 });
pinv(KU.paid, 81000, 'Kuari tax paid');
Q('n_tax_paid', num({
  t: 5, d: 2, c: 'application', marks: 1, value: KU.paid, unit: '₹',
  stem: `Kuari Pass Lodges Ltd, an imagined company at Tapovan, had a provision for tax of ${rs(KU.a)} on 31 March 2025 and ${rs(KU.b)} on 31 March 2026. The provision charged for 2025-26 was ${rs(KU.provided)}. Find the income tax paid during the year (in ₹).`,
  sol: `Tax paid = opening provision + provision for the year − closing provision = ${chain([KU.a, KU.provided, -KU.b], KU.paid, 'Kuari')}, that is ₹${fig(KU.paid)}.`,
}));

const LT = taxAccount({ a: 70000, b: 85000, provided: 120000 });
pinv(LT.paid, 105000, 'Lamayuru tax paid');
Q('s2_tax', short({
  t: 5, d: 2, c: 'application', marks: 2,
  stem: `Lamayuru Organics Ltd, an imagined company, shows a provision for tax of ${rs(LT.a)} on 31 March 2025 and ${rs(LT.b)} on 31 March 2026. Tax of ${rs(LT.provided)} was provided for 2025-26. Prepare the provision for tax account and state how the two amounts found are treated in the cash flow statement.`,
  model: `${LT.ledger.md}\n\nThe provision of ${rs(LT.provided)} is **added** to net profit after tax to reach net profit before tax; the tax paid, **${rs(LT.paid)}**, is **deducted** as the last item of operating activities.`,
  sol: 'Tax paid is the balancing figure of the account; the provision goes into the profit working, the payment into the operating section.',
  scheme: [[`Account with tax paid ${rs(LT.paid)}`, 1], ['Treatment of provision and payment', 1]],
}));

const DV = { prev: 80000, interim: 40000, next: 110000 };
Q('s2_prop_div', short({
  t: 5, d: 3, c: 'application', marks: 2,
  stem: `For 2025-26, Panamik Carpets Ltd, an imagined company, gives: dividend proposed for 2024-25 and paid in August 2025, ${rs(DV.prev)}; interim dividend paid in December 2025, ${rs(DV.interim)}; dividend proposed by the directors for 2025-26 in May 2026, ${rs(DV.next)}. How is each treated in (i) the working of net profit before tax and (ii) the cash flow statement?`,
  model: md(['Dividend', '(i) Net profit before tax working', '(ii) Cash flow statement'], [
    [`Proposed for 2024-25, paid ${rs(DV.prev)}`, 'Added back (appropriated from this year’s surplus)', 'Financing outflow'],
    [`Interim for 2025-26, ${rs(DV.interim)}`, 'Added back', 'Financing outflow'],
    [`Proposed for 2025-26, ${rs(DV.next)}`, 'Not added (contingent liability, not provided for)', 'No effect'],
  ]) + `\n\nTotal financing outflow for dividends = ${chain([DV.prev, DV.interim], DV.prev + DV.interim, 'Diskit')}.`,
  sol: 'Follow the cash: a dividend matters in the year it is paid; a proposal not yet approved is neither provided for nor paid.',
  scheme: [['Two paid dividends: added back and financing outflows', 1], ['Current year’s proposal: no effect', 1]],
}));

const LD = { open: 150000, close: 200000, grA: 100000, grB: 140000, prev: 75000, interim: 45000 };
const LD_T = taxAccount({ a: 50000, b: 62000, paid: 68000 });
const LD_npbt = pinv(LD.close - LD.open + (LD.grB - LD.grA) + LD.prev + LD.interim + LD_T.provided, 290000, 'Lipulekh Orchards net profit before tax');
Q('s3_npbt_tax', short({
  t: [2, 5], d: 3, c: 'application', marks: 3,
  stem: `Lipulekh Orchards Ltd, an imagined company, gives the following.\n\n${extract([['Balance in the Statement of Profit and Loss', LD.open, LD.close], ['General reserve', LD.grA, LD.grB], ['Provision for tax', LD_T.a, LD_T.b]])}\n\nDuring 2025-26 it paid income tax of ${rs(LD_T.paid)}, the dividend of ${rs(LD.prev)} proposed for 2024-25 and an interim dividend of ${rs(LD.interim)}. Prepare the provision for tax account and compute net profit before tax.`,
  model: `${LD_T.ledger.md}\n\n${md(['Net profit before tax', '₹'], [
    ['Increase in surplus', fig(LD.close - LD.open)],
    ['Add: Transfer to general reserve', fig(LD.grB - LD.grA)],
    ['Add: Proposed dividend for 2024-25 paid', fig(LD.prev)],
    ['Add: Interim dividend', fig(LD.interim)],
    [bold('Net profit after tax'), bold(fig(LD_npbt - LD_T.provided))],
    ['Add: Provision for tax for the year', fig(LD_T.provided)],
    [bold('Net profit before tax'), bold(fig(LD_npbt))],
  ], [1])}`,
  sol: 'Tax paid is given, so the provision for the year is the balancing figure of the account; then add every appropriation and that provision to the rise in surplus.',
  scheme: [[`Provision for the year ${rs(LD_T.provided)}`, 1], [`Net profit after tax ${rs(LD_npbt - LD_T.provided)}`, 1], [`Net profit before tax ${rs(LD_npbt)}`, 1]],
}));

const DH = { gw: [90000, 60000], pat: [40000, 55000], patBought: 25000, trA: 180000, trB: 160000, pA: 9000, pB: 6000 };
const DH_patOff = pinv(DH.pat[0] + DH.patBought - DH.pat[1], 10000, 'Dharchula patents written off');
const DH_gwOff = DH.gw[0] - DH.gw[1];
Q('s3_pdd_amort', short({
  t: 5, d: 4, c: 'analysis', marks: 3,
  stem: `Dharchula Wool Ltd, an imagined company, gives these extracts.\n\n${extract([['Goodwill', DH.gw[0], DH.gw[1]], ['Patents', DH.pat[0], DH.pat[1]], ['Trade receivables (gross)', DH.trA, DH.trB], ['Provision for doubtful debts', DH.pA, DH.pB]])}\n\nPatents of ${rs(DH.patBought)} were bought during the year. State, with amounts, how each of the four items is treated in the cash flow statement for 2025-26.`,
  model: md(['Item', 'Working', 'Treatment'], [
    ['Goodwill', `${fig(DH.gw[0])} − ${fig(DH.gw[1])} = ${fig(DH_gwOff)} written off`, `Add back ${rs(DH_gwOff)} in operating (amortisation)`],
    ['Patents', `${fig(DH.pat[0])} + ${fig(DH.patBought)} − ${fig(DH.pat[1])} = ${fig(DH_patOff)} written off`, `Add back ${rs(DH_patOff)} in operating; purchase ${rs(-DH.patBought)} under investing`],
    ['Trade receivables', `Fell by ${fig(DH.trA - DH.trB)}`, `Add ${rs(DH.trA - DH.trB)} in working-capital changes`],
    ['Provision for doubtful debts', `Fell by ${fig(DH.pA - DH.pB)}`, `Deduct ${rs(DH.pA - DH.pB)} before working-capital changes (a non-cash credit)`],
  ]) + `\n\nCheck on receivables: net receivables fell from ${fig(DH.trA - DH.pA)} to ${fig(DH.trB - DH.pB)}, by ${fig(DH.trA - DH.pA - (DH.trB - DH.pB))}, which equals ${fig(DH.trA - DH.trB)} − ${fig(DH.pA - DH.pB)}.`,
  sol: 'The patents account hides the write-off behind a purchase; the fall in the provision is a non-cash credit that has to be taken out.',
  scheme: [['Goodwill and patents written off added back', 1], ['Patent purchase under investing', 1], ['Receivables and provision adjusted', 1]],
}));

const LS = { open: 210000, close: 255000, grA: 150000, grB: 200000, prev: 100000, interim: 60000, next: 130000 };
const LS_T = taxAccount({ a: 80000, b: 95000, provided: 140000 });
const LS_npbt = pinv(LS.close - LS.open + (LS.grB - LS.grA) + LS.prev + LS.interim + LS_T.provided, 395000, 'Lamayuru Sea Buckthorn net profit before tax');
Q('l5_tax_div', long({
  t: [2, 5], d: 4, c: 'analysis', marks: 5,
  stem: `Lamayuru Sea Buckthorn Ltd, an imagined company, gives the following.\n\n${extract([['Balance in the Statement of Profit and Loss', LS.open, LS.close], ['General reserve', LS.grA, LS.grB], ['Provision for tax', LS_T.a, LS_T.b]])}\n\nDuring 2025-26: provision for tax made ${rs(LS_T.provided)}; dividend proposed for 2024-25 paid ${rs(LS.prev)}; interim dividend paid ${rs(LS.interim)}. On 20 May 2026 the directors proposed a dividend of ${rs(LS.next)} for 2025-26.\n\n(a) Prepare the provision for tax account. (2 marks)\n\n(b) Compute net profit before tax and state where each dividend and the tax appear in the cash flow statement. (3 marks)`,
  model: `**(a)**\n\n${LS_T.ledger.md}\n\n**(b)** Net profit after tax = ${chain([LS.close - LS.open, LS.grB - LS.grA, LS.prev, LS.interim], LS_npbt - LS_T.provided, 'Lamayuru pat')} (rise in surplus, transfer to reserve, both dividends paid); add the provision ${fig(LS_T.provided)}: **net profit before tax ${rs(LS_npbt)}**.\n\n- Tax paid ${rs(LS_T.paid)}: deducted at the end of **operating** activities.\n- Proposed dividend for 2024-25 ${rs(LS.prev)} and interim dividend ${rs(LS.interim)}: **financing** outflows.\n- Dividend of ${rs(LS.next)} proposed for 2025-26: **no effect**; it is a contingent liability at 31 March 2026 and will be an outflow of 2026-27 if approved.`,
  sol: 'The account gives the tax paid; the profit working adds back only what was appropriated and paid during the year, never a proposal made after the year end.',
  scheme: [[`(a) Tax paid ${rs(LS_T.paid)}`, 2], [`(b) Net profit before tax ${rs(LS_npbt)}`, 1], ['(b) Paid dividends and tax placed', 1], ['(b) Proposed dividend for 2025-26: no effect', 1]],
}));

// ---------------------------------------------------------------- full statements (cashFlow engine)
/** Model answer of a full statement: working notes, the statement and the cash check. */
const fullModel = (X, notesMd = '') =>
  `**Working notes**\n\n**W1. Net profit before tax**\n\n${X.npbtTable.md}\n\n${X.ledgers.map((l, i) => `**W${i + 2}. ${l.title}**\n\n${md(l.headers, l.rows, [1, 3])}`).join('\n\n')}${notesMd ? `\n\n${notesMd}` : ''}\n\n**Cash Flow Statement of ${X.name} for the year ended 31 March 2026**\n\n${X.stmt.md}\n\n**Check:** ${fig(X.open)} ${X.D >= 0 ? '+' : '−'} ${fig(Math.abs(X.D))} = ${fig(X.close)}, the closing cash and cash equivalents in the balance sheet.${X.proposed ? ` The dividend of ${rs(X.proposed.amount)} proposed for 2025-26 has no effect on the statement.` : ''}`;
const dir = (v) => (v >= 0 ? 'from' : 'used in');
const scheme8 = (X) => [
  [`Net profit before tax ${rs(X.npbt)}`, 1],
  ['Working accounts', 2],
  [`Net cash ${dir(X.A.A)} operating activities ${rs(Math.abs(X.A.A))}`, 2],
  [`Net cash ${dir(X.B.total)} investing activities ${rs(Math.abs(X.B.total))}`, 1],
  [`Net cash ${dir(X.C.total)} financing activities ${rs(Math.abs(X.C.total))}`, 1],
  ['Net change reconciled with opening and closing cash', 1],
];
const scheme5 = (X) => [
  [`(a) Net profit before tax ${rs(X.npbt)}`, 1],
  ['(a) Working account', 1],
  [`(b) Operating ${rs(X.A.A)}`, 1],
  [`(b) Investing ${rs(X.B.total)} and financing ${rs(X.C.total)}`, 1],
  [`(b) Net ${X.D >= 0 ? 'increase' : 'decrease'} ${rs(Math.abs(X.D))} reconciled`, 1],
];

// Long 5 — A: Kumbharli Mango Pulp (small, net basis, previous year's proposed dividend paid).
const KM = cashFlow({
  name: 'Kumbharli Mango Pulp Ltd',
  lines: [
    ['sc', 'Equity share capital', 'sc', 500000, 600000],
    ['sur', 'Balance in the Statement of Profit and Loss', 'surplus', 60000, 110000],
    ['tp', 'Trade payables', 'wcL', 70000, 85000],
    ['pt', 'Short-term provisions: provision for tax', 'tax', 20000, 30000],
    ['pl', 'Pulping plant (written-down value)', 'ppe', 350000, 420000, { name: 'pulping plant' }],
    ['stock', 'Inventories', 'wcA', 140000, 160000],
    ['tr', 'Trade receivables', 'wcA', 110000, 105000],
    ['cash', 'Cash and cash equivalents', 'cce', 50000, 140000],
  ],
  info: {
    fa: { pl: { dep: 35000, showLedger: true } },
    tax: { pt: { provided: 40000 } },
    dividendPaid: [['Proposed dividend for 2024-25', 25000]],
    proposed: { label: 'Proposed dividend for 2025-26', amount: 36000 },
  },
  pins: { npbt: 115000, A: 120000, B: -105000, C: 75000, D: 90000 },
});
Q('l5_full_small_A', long({
  t: [2, 3, 4, 5], d: 4, c: 'application', marks: 5,
  stem: `Kumbharli Mango Pulp Ltd, an imagined company at Chiplun, gives its balance sheets below.\n\n${KM.bs.md}\n\n**Additional information for 2025-26**\n\n${bullets([
    `Depreciation on the pulping plant: ${rs(35000)}; no plant was sold.`,
    `Provision for tax made: ${rs(40000)}.`,
    `The dividend of ${rs(25000)} proposed for 2024-25 was paid; the directors have proposed ${rs(36000)} for 2025-26.`,
    'Equity shares were issued for cash at par.',
  ])}\n\n(a) Compute net profit before tax and prepare the provision for tax account and the plant account. (2 marks)\n\n(b) Prepare the cash flow statement for the year ended 31 March 2026. (3 marks)`,
  model: fullModel(KM),
  sol: 'Small statement, same routine: rebuild profit, find tax paid and plant bought, then the three sections and the cash check.',
  scheme: scheme5(KM),
}));

// Long 5 — B: Varandha Cashew Processors (net decrease, loan repaid at the start, provision for doubtful debts).
const VC = cashFlow({
  name: 'Varandha Cashew Processors Ltd',
  lines: [
    ['sc', 'Equity share capital', 'sc', 400000, 400000],
    ['gr', 'General reserve', 'gr', 50000, 70000],
    ['sur', 'Balance in the Statement of Profit and Loss', 'surplus', 80000, 95000],
    ['loan', '10% Long-term loan from a bank', 'ltb', 200000, 120000, { name: 'long-term bank loan' }],
    ['tp', 'Trade payables', 'wcL', 90000, 75000],
    ['pt', 'Short-term provisions: provision for tax', 'tax', 25000, 30000],
    ['m', 'Machinery (written-down value)', 'ppe', 360000, 340000, { name: 'machinery' }],
    ['inv', 'Non-current investments', 'inv', 0, 50000],
    ['stock', 'Inventories', 'wcA', 120000, 140000],
    ['tr', 'Trade receivables', 'wcA', 100000, 120000],
    ['pdd', 'Less: Provision for doubtful debts', 'pdd', 5000, 6000, { of: 'tr' }],
    ['cash', 'Cash and cash equivalents', 'cce', 270000, 146000],
  ],
  info: {
    fa: { m: { dep: 40000, showLedger: true } },
    tax: { pt: { provided: 35000 } },
    interestPaid: [['Interest on long-term bank loan', interest(10, 120000)]],
    dividendPaid: [['Interim dividend for 2025-26', 40000]],
    proposed: { label: 'Proposed dividend for 2025-26', amount: 20000 },
  },
  pins: { npbt: 110000, opbwc: 163000, A: 78000, B: -70000, C: -132000, D: -124000 },
});
Q('l5_full_small_B', long({
  t: [3, 4, 5], d: 5, c: 'analysis', marks: 5,
  stem: `Varandha Cashew Processors Ltd, an imagined company at Bhor, ended 2025-26 with much less cash than it began with. Its balance sheets are given below.\n\n${VC.bs.md}\n\n**Additional information for 2025-26**\n\n${bullets([
    `Depreciation on machinery: ${rs(40000)}; no machinery was sold.`,
    `${rs(80000)} of the loan was repaid on 1 April 2025; interest on the balance was paid for the year.`,
    `Provision for tax made: ${rs(35000)}. An interim dividend of ${rs(40000)} was paid; no dividend had been proposed for 2024-25. The directors have proposed ${rs(20000)} for 2025-26.`,
  ])}\n\n(a) Compute net profit before tax and the tax paid, and prepare the machinery account. (2 marks)\n\n(b) Prepare the cash flow statement and say in one line why cash fell. (3 marks)`,
  model: `${fullModel(VC, `**W${VC.ledgers.length + 2}.** Interest on the loan = 10% on ${fig(120000)} for the full year = ${fig(interest(10, 120000))}, because ${fig(80000)} was repaid on the first day.`)}\n\n**Why cash fell:** operations brought in ${rs(VC.A.A)}, but loan repayment, interest, dividend, new machinery and investments took out more.`,
  sol: 'Note the provision for doubtful debts and the date of repayment; the closing cash must come out exactly.',
  scheme: scheme5(VC),
}));

// Long 8 — A: Charmadi Coffee Curing (preference shares redeemed at a premium, capital redemption reserve,
// land at cost, plant at written-down value sold at a profit, goodwill written off, loan raised mid-year).
const CC = cashFlow({
  name: 'Charmadi Coffee Curing Ltd',
  lines: [
    ['sc', 'Equity share capital', 'sc', 1000000, 1150000],
    ['psc', '10% Redeemable preference share capital', 'psc', 200000, 0, { name: '10% preference shares' }],
    ['sp', 'Securities premium', 'sp', 40000, 50000],
    ['crr', 'Capital redemption reserve', 'gr', 0, 50000],
    ['gr', 'General reserve', 'gr', 150000, 200000],
    ['sur', 'Balance in the Statement of Profit and Loss', 'surplus', 120000, 185000],
    ['loan', '11% Long-term loan from a bank', 'ltb', 0, 300000, { name: 'long-term bank loan' }],
    ['tp', 'Trade payables', 'wcL', 140000, 125000],
    ['pt', 'Short-term provisions: provision for tax', 'tax', 50000, 65000],
    ['land', 'Land and building (at cost)', 'ppe', 600000, 900000, { name: 'land and building' }],
    ['pl', 'Curing plant (written-down value)', 'ppe', 520000, 610000, { name: 'curing plant' }],
    ['gw', 'Goodwill', 'intang', 60000, 40000],
    ['inv', '10% Government bonds (non-current investments)', 'inv', 100000, 100000, { name: 'government bonds' }],
    ['stock', 'Inventories', 'wcA', 210000, 260000],
    ['tr', 'Trade receivables', 'wcA', 180000, 170000],
    ['cash', 'Cash and cash equivalents', 'cce', 30000, 45000],
  ],
  info: {
    fa: { land: { dep: 0 }, pl: { dep: 60000, sold: { bv: 40000, price: 52000 } } },
    tax: { pt: { paid: 55000 } },
    psc: { psc: { premium: pctOf(10, 200000) } },
    interestPaid: [['Interest on long-term bank loan', interest(11, 300000, 9)]],
    interestReceived: [['Interest received on government bonds', pctOf(10, 100000)]],
    dividendPaid: [['Proposed dividend for 2024-25 on equity shares', pctOf(10, 1000000)], ['Dividend for 2024-25 on preference shares', pctOf(10, 200000)]],
    proposed: { label: 'Proposed dividend for 2025-26', amount: pctOf(12, 1150000) },
  },
  pins: { npbt: 355000, opbwc: 437750, A: 327750, B: -428000, C: 115250, D: 15000 },
});
check(CC.premium.received === pctOf(20, 150000), 'Charmadi premium on the equity issue is 20%');
check(200000 - 150000 === 50000, 'Charmadi capital redemption reserve = face redeemed − fresh issue');
Q('l8_full_A', long({
  t: [3, 4, 5], d: 5, c: 'application', marks: 8,
  stem: `Charmadi Coffee Curing Ltd, an imagined company at Mudigere, gives its balance sheets and further information. Prepare its cash flow statement for the year ended 31 March 2026 as per AS 3 (revised), indirect method.\n\n${CC.bs.md}\n\n**Further information for 2025-26**\n\n${bullets([
    `On 1 April 2025 the preference shares were redeemed at a premium of 10%, the premium being written off against securities premium. Equity shares of ${rs(150000)} were issued at a premium of 20% for the redemption, and the balance of the face value redeemed was transferred from the surplus to a capital redemption reserve.`,
    `Curing plant with a written-down value of ${rs(40000)} was sold for ${rs(52000)}; depreciation on plant for the year was ${rs(60000)}. Land and building is not depreciated.`,
    'Goodwill was written off to the extent of the fall in its balance.',
    `The bank loan was taken on 1 July 2025; interest was paid when due. Interest at 10% was received on the government bonds.`,
    `Income tax paid: ${rs(55000)}. Dividends for 2024-25 paid during the year: 10% on the equity shares then outstanding and the preference dividend for 2024-25. The directors have proposed a dividend of 12% on equity shares for 2025-26.`,
  ])}`,
  model: fullModel(CC, `**W${CC.ledgers.length + 2}.** Interest on the loan = 11% on ${fig(300000)} for nine months = ${fig(interest(11, 300000, 9))}. Equity proceeds = ${fig(150000)} + premium ${fig(CC.premium.received)} = ${fig(CC.sharesCash)}; redemption = ${fig(200000)} + premium ${fig(pctOf(10, 200000))} = ${fig(220000)}. The capital redemption reserve of ${fig(50000)} is a transfer out of the surplus (added back in W1), not a cash flow.`),
  sol: 'Separate the redemption package first: premium account, capital redemption reserve, fresh issue. Then the plant and tax accounts, and the usual three sections; check against the closing cash.',
  scheme: scheme8(CC),
}));

// Long 8 — B: Thamarassery Rubber (bonus from general reserve, machinery at cost sold at a loss, patents
// bought and written off, loan given, current investments sold, provision for doubtful debts down, two
// cash-equivalent lines).
const TR = cashFlow({
  name: 'Thamarassery Rubber Ltd',
  lines: [
    ['sc', 'Equity share capital', 'sc', 800000, 1100000],
    ['gr', 'General reserve', 'gr', 250000, 200000],
    ['sur', 'Balance in the Statement of Profit and Loss', 'surplus', 90000, 140000],
    ['deb', '10% Debentures', 'ltb', 0, 250000, { name: '10% debentures' }],
    ['tp', 'Trade payables', 'wcL', 120000, 145000],
    ['os', 'Outstanding salaries', 'wcL', 15000, 20000],
    ['pt', 'Short-term provisions: provision for tax', 'tax', 40000, 50000],
    ['m', 'Machinery (at cost)', 'ppe', 900000, 1250000, { name: 'machinery' }],
    ['ad', 'Less: Accumulated depreciation on machinery', 'accdep', 220000, 260000, { of: 'm' }],
    ['pat', 'Patents', 'intang', 30000, 45000],
    ['lta', 'Long-term loans and advances (loan to a supplier)', 'lta', 0, 60000, { name: 'loan to a latex supplier' }],
    ['ci', 'Current investments (listed shares)', 'inv', 80000, 0, { name: 'current investments', current: true }],
    ['stock', 'Inventories', 'wcA', 240000, 290000],
    ['tr', 'Trade receivables', 'wcA', 160000, 190000],
    ['pdd', 'Less: Provision for doubtful debts', 'pdd', 10000, 8000, { of: 'tr' }],
    ['cb', 'Cash and bank balances', 'cce', 85000, 158000],
    ['sd', 'Short-term deposits (maturity within three months)', 'cce', 50000, 180000],
  ],
  info: {
    fa: { m: { sold: { cost: 150000, accDep: 90000, price: 45000 } } },
    intang: { pat: { writtenOff: 10000, purchase: 25000 } },
    invest: { ci: { sold: { cost: 80000, price: 92000 } } },
    tax: { pt: { provided: 75000 } },
    bonus: { amount: 100000, from: 'gr' },
    interestPaid: [['Interest on 10% debentures', interest(10, 250000)]],
    interestReceived: [['Interest received on the loan to a supplier', 3000]],
    dividendPaid: [['Proposed dividend for 2024-25', pctOf(10, 800000)], ['Interim dividend for 2025-26', pctOf(5, 1100000)]],
    proposed: { label: 'Proposed dividend for 2025-26', amount: pctOf(10, 1100000) },
  },
  pins: { npbt: 310000, opbwc: 473000, A: 358000, B: -445000, C: 290000, D: 203000 },
});
Q('l8_full_B', long({
  t: [1, 3, 4, 5], d: 5, c: 'application', marks: 8,
  stem: `Thamarassery Rubber Ltd, an imagined company at Adivaram, gives the following balance sheets. From them and the information that follows, prepare its cash flow statement for the year ended 31 March 2026.\n\n${TR.bs.md}\n\n**Information for 2025-26**\n\n${bullets([
    `On 1 April 2025 bonus shares of ${rs(100000)} were issued out of the general reserve; later in the year equity shares were issued for cash at par. The debentures were issued on 1 April 2025 and interest was paid for the year.`,
    `A machine costing ${rs(150000)} (accumulated depreciation ${rs(90000)}) was sold for ${rs(45000)}.`,
    `Patents of ${rs(25000)} were bought; the rest of the change in patents was written off.`,
    `The listed shares held as current investments were sold for ${rs(92000)}. Interest of ${rs(3000)} was received on the loan to a supplier.`,
    `Provision for tax made: ${rs(75000)}. Dividends paid: the 10% dividend proposed for 2024-25 and an interim dividend of 5% for 2025-26; a final dividend of 10% has been proposed for 2025-26.`,
  ])}`,
  model: fullModel(TR, `**W${TR.ledgers.length + 2}.** General reserve: ${fig(250000)} + transfer from surplus − bonus ${fig(100000)} = ${fig(200000)}, so the transfer is ${fig(TR.transfer)}. Shares issued for cash = ${fig(300000)} − bonus ${fig(100000)} = ${fig(TR.sharesCash)}.\n\n**W${TR.ledgers.length + 3}.** Patents written off = ${chain([30000, 25000, -45000], 10000, 'Thamarassery patents')}. The listed shares are not cash equivalents, so their sale is investing; the short-term deposits maturing within three months are cash equivalents and are added to cash and bank balances: ${fig(135000)} at the start, ${fig(338000)} at the end.`),
  sol: 'Untangle the general reserve (transfer in, bonus out), keep the bonus out of the statement, use both machinery accounts and the patents working, and add the two cash-equivalent lines for the check.',
  scheme: scheme8(TR),
}));

// Long 8 — C: Aralvaimozhi Wind Power (building for shares: non-cash; turbines at cost; investments sold at a
// loss; debentures redeemed mid-year at par; short-term loan repaid; tax paid above provision; net decrease).
const AR_ = cashFlow({
  name: 'Aralvaimozhi Wind Power Ltd',
  lines: [
    ['sc', 'Equity share capital', 'sc', 1500000, 1800000],
    ['gr', 'General reserve', 'gr', 400000, 440000],
    ['sur', 'Balance in the Statement of Profit and Loss', 'surplus', 260000, 210000],
    ['deb', '12% Debentures', 'ltb', 500000, 300000, { name: '12% debentures' }],
    ['stb', 'Short-term borrowings: bank loan', 'stb', 100000, 40000, { name: 'short-term bank loan' }],
    ['tp', 'Trade payables', 'wcL', 230000, 190000],
    ['pt', 'Short-term provisions: provision for tax', 'tax', 90000, 70000],
    ['bld', 'Building (written-down value)', 'ppe', 1000000, 1260000, { name: 'building' }],
    ['wt', 'Wind turbines (at cost)', 'ppe', 1400000, 1550000, { name: 'wind turbines' }],
    ['ad', 'Less: Accumulated depreciation on wind turbines', 'accdep', 300000, 420000, { of: 'wt' }],
    ['inv', 'Non-current investments', 'inv', 250000, 100000],
    ['stock', 'Inventories (spares)', 'wcA', 120000, 110000, { name: 'inventories' }],
    ['tr', 'Trade receivables', 'wcA', 310000, 350000],
    ['pre', 'Prepaid insurance', 'wcA', 20000, 15000],
    ['cash', 'Cash and cash equivalents', 'cce', 280000, 85000],
  ],
  info: {
    fa: { bld: { dep: 40000, vendor: 300000 } },
    invest: { inv: { sold: { cost: 150000, price: 138000 } } },
    tax: { pt: { provided: 100000 } },
    interestPaid: [['Interest on 12% debentures', interest(12, 500000, 6) + interest(12, 300000, 6)], ['Interest on short-term bank loan', 8000]],
    dividendPaid: [['Proposed dividend for 2024-25', pctOf(10, 1500000)]],
    proposed: { label: 'Proposed dividend for 2025-26', amount: pctOf(9, 1800000) },
  },
  pins: { npbt: 240000, opbwc: 468000, A: 283000, B: -12000, C: -466000, D: -195000 },
});
check(AR_.L.find((l) => l.k === 'bld').fa.purchase === 0, 'Aralvaimozhi: all of the building increase came from the vendor');
Q('l8_full_C', long({
  t: [1, 3, 4, 5], d: 5, c: 'analysis', marks: 8,
  stem: `Aralvaimozhi Wind Power Ltd, an imagined company near Nagercoil, made a profit in 2025-26 but its cash fell sharply. Prepare its cash flow statement for the year ended 31 March 2026 from the balance sheets and information below.\n\n${AR_.bs.md}\n\n**Information for 2025-26**\n\n${bullets([
    `A building was acquired from its owner for ${rs(300000)}, paid entirely by allotting equity shares. Depreciation on buildings for the year: ${rs(40000)}. No wind turbine was sold.`,
    `Non-current investments costing ${rs(150000)} were sold for ${rs(138000)}.`,
    `Debentures of ${rs(200000)} were redeemed at par on 1 October 2025; interest was paid half-yearly. Interest of ${rs(8000)} was paid on the short-term bank loan.`,
    `Provision for tax made: ${rs(100000)}. The 10% dividend proposed for 2024-25 was paid; the directors have proposed 9% for 2025-26.`,
  ])}`,
  model: fullModel(AR_, `**W${AR_.ledgers.length + 2}.** The building of ${fig(300000)} received for shares is a **non-cash transaction**, left out of investing and financing: building bought for cash = ${chain([1260000, 40000, -1000000, -300000], 0, 'Aralvaimozhi building')}, and no shares were issued for cash.\n\n**W${AR_.ledgers.length + 3}.** Interest on debentures = 12% on ${fig(500000)} for six months (${fig(interest(12, 500000, 6))}) + 12% on ${fig(300000)} for six months (${fig(interest(12, 300000, 6))}) = ${fig(interest(12, 500000, 6) + interest(12, 300000, 6))}.`),
  sol: 'Keep the shares-for-building deal out of both sections; with no turbine sold, the two turbine accounts give purchase and depreciation directly; the redemption and repayment explain the fall in cash.',
  scheme: scheme8(AR_),
}));

FACTS.push(
  `Kumbharli net increase ${fig(KM.D)}`,
  `Varandha net decrease ${fig(-VC.D)}`,
  `Charmadi net profit before tax ${fig(CC.npbt)}, net increase ${fig(CC.D)}`,
  `Thamarassery operating ${fig(TR.A.A)}, net increase ${fig(TR.D)} over two cash-equivalent lines`,
  `Aralvaimozhi net decrease ${fig(-AR_.D)} with the building for shares kept out`,
);
export { FACTS };
