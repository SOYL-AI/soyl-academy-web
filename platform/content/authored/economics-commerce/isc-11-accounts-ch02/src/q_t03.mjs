// t03: cash basis and accrual basis of accounting. Imagined firms; every profit comes from basis() in fig.mjs.
import { mcq, ar, tf, fb, short, long } from './lib.mjs';
import { same, sum, inr, rs, mdTable, basis } from './fig.mjs';
import { QQ, numQ } from './qq.mjs';

// ================================================================ multiple choice
QQ('m_cash_basis', mcq({
  t: 3, d: 1, c: 'understanding',
  stem: 'Tonk Kites, an imagined firm that keeps its books on the cash basis, sells goods on credit on 26 March 2027 and receives the price on 9 April 2027. The revenue is recorded in',
  opts: ['April 2027, when the cash is received', 'March 2027, when the sale is made', 'both months, half in each', 'neither month, since the sale was on credit'],
  sol: 'The cash basis records revenue only on receipt of cash, so the credit sale appears when the money comes in. The date of the sale does not matter on this basis.',
}));
QQ('m_accrual_year', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'On 10 March 2027 Barmer Tailors, an imagined shop with the year ending on 31 March 2027, received ₹30,000 in advance for stitching to be done in April 2027. On the accrual basis the ₹30,000 is',
  opts: ['not revenue of the year ended 31 March 2027, and is carried forward as a liability', 'revenue of the year ended 31 March 2027', 'an expense of the year ended 31 March 2027', 'an asset of the year ended 31 March 2027'],
  sol: 'The work is not yet done, so nothing is earned and the firm owes the service, which is a liability. Counting it as revenue would apply the cash idea, and it is neither an expense nor an asset.',
}));
const AD = { paid: 32000, months: 8, used: 2 };
AD.exp = same((AD.paid / AD.months) * AD.used, 8000, 'm_prepaid expense');
AD.prepaid = same(AD.paid - AD.exp, 24000, 'm_prepaid prepaid');
QQ('m_prepaid', mcq({
  t: 3, d: 2, c: 'application',
  stem: `On 1 February 2027 Rewari Sound House, an imagined firm, paid ${rs(AD.paid)} for an advertising contract that runs for eight months. The year ends on 31 March 2027. On the accrual basis, the expense of the year and the prepaid amount carried forward are respectively`,
  opts: [`${rs(AD.exp)} and ${rs(AD.prepaid)}`, `${rs(AD.paid)} and ${rs(0)}`, `${rs(AD.prepaid)} and ${rs(AD.exp)}`, `${rs(AD.paid / AD.months)} and ${rs(AD.paid - AD.paid / AD.months)}`],
  sol: `Two of the eight months fall in the year, so the expense is ${inr(AD.paid)} ÷ 8 × 2 = ${rs(AD.exp)} and the rest, ${rs(AD.prepaid)}, is prepaid. The whole payment would be the cash view, the swapped figures reverse the two, and one month's cost counts a single month.`,
}));
QQ('m_same_both', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'A trading firm records the following items for one year. Which one has the same effect on the profit of the year on the cash basis and on the accrual basis?',
  opts: ['Stationery bought for cash and fully used within the year', 'Rent paid in the year for the first two months of the next year', 'Fees of the year received in the next year', 'Salary of the last month of the year paid in the next year'],
  sol: 'Only when payment and use fall in the same year do the two bases agree. The rent in advance, the fees received later and the salary paid later all cross the year end, so the bases differ for each.',
}));

// ================================================================ assertion-reason
QQ('ar_outstanding', ar({
  t: 3, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'On the accrual basis, salary of the last month of the year that is still unpaid is treated as a liability at the year end.',
  r: 'Salaries in most firms are paid at the end of each month.',
  sol: 'Both statements are true, but the usual date of payment does not explain the treatment. The salary is a liability because it was incurred in the year and not yet paid.',
}));

// ================================================================ true-false, fill-blank
QQ('tf_cash_credit', tf({
  t: 3, d: 2, c: 'understanding', ans: true,
  stem: 'A firm that follows the cash basis shows no revenue in a year for goods it sold on credit in that year if it receives no cash for them before the year ends.',
  sol: 'The cash basis records revenue only on receipt of cash, so unpaid credit sales do not appear.',
}));
QQ('fb_basis', fb({
  t: 3, d: 1, c: 'recall',
  stem: 'Under the ______ basis of accounting, revenue is recorded when it is earned and an expense is recorded when it is ______.',
  acc: [['accrual', 'mercantile'], ['incurred', 'due']],
  sol: 'The accrual basis matches revenue when earned and expenses when incurred.',
}));

// ================================================================ numerical
const NC = { recd: 315000, adv: 25000, paid: 240000, prepaid: 18000 };
NC.profit = same(NC.recd - NC.paid, 75000, 'n_cash_profit');
QQ('n_cash_profit', numQ({
  t: 3, d: 2, c: 'application', value: NC.profit,
  stem: `During a year Sambhal Mats, an imagined firm that keeps cash-basis accounts, received ${rs(NC.recd)}, which includes ${rs(NC.adv)} of advance for the next year. Its payments were ${rs(NC.paid)}, including ${rs(NC.prepaid)} paid in advance for the next year. Find its profit on the cash basis (in ₹).`,
  sol: `The cash basis ignores advances and prepayments. Profit = receipts − payments = ${inr(NC.recd)} − ${inr(NC.paid)} = ${rs(NC.profit)}.`,
}));
const NA = basis({
  revenue: { name: 'Fees', cash: 120000, less: [['advance for the next year', 10000]], add: [['fees earned but not yet received', 14000]] },
  expenses: [{ name: 'Expenses', paid: 78000, less: [['prepaid', 6000]], add: [['outstanding', 9000]] }],
});
same(NA.profit, 43000, 'n_accrual_profit');
QQ('n_accrual_profit', numQ({
  t: 3, d: 3, c: 'application', value: NA.profit,
  stem: `Aizawl Sketching Classes, an imagined centre, received ${rs(120000)} in fees during a year, including ${rs(10000)} advance for the next year; fees of ${rs(14000)} earned in the year are still to be received. It paid expenses of ${rs(78000)}, including ${rs(6000)} for the next year, and ${rs(9000)} of the year's expenses are unpaid. On the accrual basis, find the profit of the year (in ₹).`,
  sol: `Revenue = ${inr(120000)} − ${inr(10000)} + ${inr(14000)} = ${inr(NA.rev.acc)}. Expenses = ${inr(78000)} − ${inr(6000)} + ${inr(9000)} = ${inr(NA.accOut)}. Profit = ${inr(NA.rev.acc)} − ${inr(NA.accOut)} = ${rs(NA.profit)}.`,
}));
const NW = { paid: 126000, prev: 14000, due: 9000 };
NW.exp = same(NW.paid - NW.prev + NW.due, 121000, 'n_accrual_wages');
QQ('n_accrual_wages', numQ({
  t: 3, d: 3, c: 'application', value: NW.exp,
  stem: `During a year Dindigul Bakers, an imagined firm, paid wages of ${rs(NW.paid)}, which include ${rs(NW.prev)} that belongs to the last year. Wages of ${rs(NW.due)} for the last month of this year are still unpaid. Find the wages to be charged for the year on the accrual basis (in ₹).`,
  sol: `Wages = paid − last year's part + unpaid of this year = ${inr(NW.paid)} − ${inr(NW.prev)} + ${inr(NW.due)} = ${rs(NW.exp)}.`,
}));
const NR = { recd: 64000, adv: 6000, prev: 4000, due: 7500 };
NR.rev = same(NR.recd - NR.adv - NR.prev + NR.due, 61500, 'n_accrual_commission');
QQ('n_accrual_commission', numQ({
  t: 3, d: 3, c: 'application', value: NR.rev,
  stem: `Churachand Agencies, an imagined firm, received commission of ${rs(NR.recd)} in a year. Of this, ${rs(NR.adv)} is for work of the next year and ${rs(NR.prev)} is for work of the last year. Commission of ${rs(NR.due)} earned this year is still to be received. Find the commission income of the year on the accrual basis (in ₹).`,
  sol: `Income = received − next year's part − last year's part + earned but not received = ${inr(NR.recd)} − ${inr(NR.adv)} − ${inr(NR.prev)} + ${inr(NR.due)} = ${rs(NR.rev)}.`,
}));

// ================================================================ short answer, 2 marks
QQ('s2_cash_limit', short({
  t: 3, d: 2, c: 'understanding', marks: 2,
  stem: 'Explain the cash basis of accounting. State one limitation of it for a firm that sells most goods on credit.',
  model: 'Under the **cash basis**, revenue is recorded when cash is received and an expense when cash is paid, whatever the period to which it relates.\n\n**Limitation:** credit sales made in the year do not appear until the cash comes in, so the profit does not show what the firm actually earned in that year.',
  sol: 'The meaning, then one limitation.',
  scheme: [['Meaning: recorded on receipt and payment of cash', 1], ['One limitation for credit sales', 1]],
}));
QQ('s2_adv_arrears', short({
  t: 3, d: 2, c: 'understanding', marks: 2,
  stem: 'Distinguish between income received in advance and accrued income, with one example of each from an imagined tuition centre.',
  model: '**Income received in advance:** cash received in this year for a service to be given in a later year, for example fees taken in March for April; on the accrual basis it is not income of this year and is a liability.\n\n**Accrued income:** income earned in this year but not yet received in cash, for example fees of March still unpaid; it is income of this year and an asset (a receivable).',
  sol: 'Meaning with an example of each.',
  scheme: [['Income received in advance: meaning and example', 1], ['Accrued income: meaning and example', 1]],
}));
QQ('s2_rent_year', short({
  t: 3, d: 3, c: 'application', marks: 2,
  stem: 'Ladakh Trekking Gear, an imagined firm with the year ending on 31 March 2027, paid rent of ₹60,000 on 1 January 2027 for twelve months. Find the rent chargeable for the year on the accrual basis and the prepaid rent, showing the working.',
  model: 'Months in the year ended 31 March 2027: January, February and March = 3 months.\n\nRent of the year = 60,000 ÷ 12 × 3 = **₹15,000**.\n\nPrepaid rent = 60,000 − 15,000 = **₹45,000**, carried forward.',
  sol: 'Apportion the payment by months.',
  scheme: [['Rent of the year ₹15,000 with working', 1], ['Prepaid rent ₹45,000', 1]],
}));

// ================================================================ short answer, 3 marks
QQ('s3_diff_bases', short({
  t: 3, d: 2, c: 'understanding', marks: 3,
  stem: 'Distinguish between the cash basis and the accrual basis of accounting on any three points.',
  model: `${mdTable(['Point', 'Cash basis', 'Accrual basis'], [
    ['Revenue', 'Recorded when cash is received', 'Recorded when earned'],
    ['Expenses', 'Recorded when cash is paid', 'Recorded when incurred'],
    ['Outstanding and prepaid items', 'Not recognised', 'Recognised and adjusted'],
    ['Profit', 'Difference of receipts and payments', 'Revenue of the period less its expenses'],
  ])}\n\nAny three points, one mark each.`,
  sol: 'Three points of difference, one mark each.',
  scheme: [['First point of difference', 1], ['Second point of difference', 1], ['Third point of difference', 1]],
}));
const SQ = basis({
  revenue: { name: 'Fees', cash: 90000, add: [['fees due', 10000]] },
  expenses: [
    { name: 'Rent', paid: 48000, less: [['paid in advance', 8000]] },
    { name: 'Salary', paid: 30000, less: [['of the last year', 4000]], add: [['outstanding', 6000]] },
  ],
});
same(SQ.adjOf('Rent'), 40000, 's3 rent');
same(SQ.adjOf('Salary'), 32000, 's3 salary');
QQ('s3_accrual_expenses', short({
  t: 3, d: 3, c: 'application', marks: 3,
  stem: `Cuddalore Sports Club, an imagined club, paid rent of ${rs(48000)} in a year, which includes ${rs(8000)} for the next year. It paid salary of ${rs(30000)}, which includes ${rs(4000)} of the last year, and ${rs(6000)} of this year's salary is outstanding. Find the rent and salary to be charged on the accrual basis and the total of the two.`,
  model: `Rent of the year = ${inr(48000)} − ${inr(8000)} = **${rs(SQ.adjOf('Rent'))}**.\n\nSalary of the year = ${inr(30000)} − ${inr(4000)} + ${inr(6000)} = **${rs(SQ.adjOf('Salary'))}**.\n\nTotal = ${inr(SQ.adjOf('Rent'))} + ${inr(SQ.adjOf('Salary'))} = **${rs(SQ.adjOf('Rent') + SQ.adjOf('Salary'))}**.`,
  sol: 'Adjust each payment for prepaid, previous-year and outstanding amounts.',
  scheme: [['Rent after deducting the prepaid part', 1], ['Salary after deducting last year\'s part and adding the outstanding', 1], ['Total of the two', 1]],
}));
const SI = { fee: 84000, adv: 9000, arr: 5000, due: 11000 };
SI.rev = same(SI.fee - SI.adv - SI.arr + SI.due, 81000, 'SI revenue');
QQ('s3_accrual_income', short({
  t: 3, d: 3, c: 'application', marks: 3,
  stem: `Kasganj Dance Academy, an imagined academy, received ${rs(SI.fee)} as fees in a year. This includes ${rs(SI.adv)} received in advance for the next year and ${rs(SI.arr)} that relates to the last year. Fees of ${rs(SI.due)} for this year remain to be received. Find the fee income of the year on the accrual basis, and say how it differs from the cash received and why.`,
  model: `Fee income = ${inr(SI.fee)} − ${inr(SI.adv)} − ${inr(SI.arr)} + ${inr(SI.due)} = **${rs(SI.rev)}**.\n\nIt is ${rs(SI.fee - SI.rev)} less than the cash received (${inr(SI.fee)} − ${inr(SI.rev)}), because the cash includes income of other years, which is removed, while only ${inr(SI.due)} earned but not received is added.`,
  sol: 'Remove other years\' amounts, add what is earned but not received, then compare with the cash figure.',
  scheme: [['Advance and last year\'s amount deducted', 1], ['Accrued fees added to give the income', 1], ['Difference from the cash received explained', 1]],
}));

// ================================================================ long answer, 5 marks
const RC = basis({
  revenue: { name: 'Fees', cash: 480000, less: [['advance received for the next year', 30000], ['arrears of the last year received this year', 20000]], add: [['fees of this year still to be received', 45000]] },
  expenses: [
    { name: 'Rent', paid: 96000, less: [['rent paid for April of the next year', 16000]] },
    { name: 'Salary', paid: 180000, less: [['salary of the last year paid this year', 12000]], add: [['salary of this year unpaid', 15000]] },
    { name: 'Stationery', paid: 24000, add: [['stationery of this year unpaid', 3000]] },
  ],
});
same(RC.cashProfit, 180000, 'RC cash profit');
same(RC.rev.acc, 475000, 'RC revenue');
same(RC.accOut, 290000, 'RC expenses');
same(RC.profit, 185000, 'RC profit');
QQ('l5_cash_accrual', long({
  t: 3, d: 4, c: 'application', marks: 5,
  stem: `Rudrapur Coaching Point, an imagined centre, closes its year on 31 March 2027. It received fees of ${rs(480000)}, including ${rs(30000)} in advance for the next year and ${rs(20000)} of arrears of the last year; fees of ${rs(45000)} for this year are still to be received. It paid rent ${rs(96000)} (including ${rs(16000)} for April 2027), salary ${rs(180000)} (including ${rs(12000)} of the last year) and stationery ${rs(24000)}. Salary of ${rs(15000)} and stationery of ${rs(3000)} of this year are unpaid. (a) Find the profit on the cash basis. [1] (b) Prepare a statement showing the income, expenses and profit on the accrual basis. [3] (c) State the difference between the two profits. [1]`,
  model: `**(a)** Cash profit = ${inr(480000)} − (${inr(96000)} + ${inr(180000)} + ${inr(24000)}) = ${inr(480000)} − ${inr(RC.cashOut)} = **${rs(RC.cashProfit)}**.\n\n**(b)**\n\n${mdTable(['Particulars', 'Cash basis (₹)', 'Accrual basis (₹)'], RC.rows)}\n\nAdjustments: fees ${inr(480000)} − ${inr(30000)} − ${inr(20000)} + ${inr(45000)} = ${inr(RC.rev.acc)}; rent ${inr(96000)} − ${inr(16000)} = ${inr(RC.adjOf('Rent'))}; salary ${inr(180000)} − ${inr(12000)} + ${inr(15000)} = ${inr(RC.adjOf('Salary'))}; stationery ${inr(24000)} + ${inr(3000)} = ${inr(RC.adjOf('Stationery'))}.\n\n**(c)** The accrual profit ${inr(RC.profit)} is ${rs(RC.profit - RC.cashProfit)} more than the cash profit ${inr(RC.cashProfit)}: fees are ${inr(480000 - RC.rev.acc)} lower after the adjustments, but expenses are ${inr(RC.cashOut - RC.accOut)} lower.`,
  sol: 'Cash profit first, then adjust every revenue and expense item, then compare.',
  scheme: [['Cash basis profit', 1], ['Revenue of the year after the three adjustments', 1], ['Rent, salary and stationery after adjustments', 1], ['Accrual profit', 1], ['Difference of the two profits with reason', 1]],
}));
const SP = basis({
  revenue: { name: 'Studio fees', cash: 320000, less: [['advance received', 18000], ['arrears of the last year', 12000]], add: [['fees due at the year end', 22000]] },
  expenses: [
    { name: 'Wages', paid: 105000, less: [['wages of the last year', 7000]], add: [['wages unpaid', 9000]] },
    { name: 'Rent', paid: 60000, less: [['rent paid in advance', 10000]] },
    { name: 'Insurance', paid: 14400, less: [['premium paid in advance', 3600]] },
  ],
});
same(SP.cashProfit, 140600, 'SP cash profit');
same(SP.rev.acc, 312000, 'SP revenue');
same(SP.accOut, 167800, 'SP expenses');
same(SP.profit, 144200, 'SP profit');
const SPrev = SP.rev.acc - SP.rev.cash;
const SPexp = sum(SP.exps.map((e) => e.acc - e.paid));
same(SP.cashProfit + SPrev - SPexp, SP.profit, 'SP reconciliation');
QQ('l5_reconcile', long({
  t: 3, d: 5, c: 'evaluation', marks: 5,
  stem: `Sirmaur Photo Lab, an imagined studio, keeps cash-basis books and has found a cash profit of ${rs(140600)} for the year ended 31 March 2027 from receipts of ${rs(320000)} and payments of ${rs(179400)}. The receipts include ${rs(18000)} of advance fees and ${rs(12000)} of arrears of the last year, while ${rs(22000)} of fees of the year are still due. The payments include wages ${rs(105000)} (with ${rs(7000)} of the last year; ${rs(9000)} of this year unpaid), rent ${rs(60000)} (with ${rs(10000)} paid in advance) and an insurance premium ${rs(14400)} (with ${rs(3600)} paid in advance). (a) Prepare a statement of profit on the accrual basis. [3] (b) Reconcile the cash profit with the accrual profit. [1] (c) Which profit gives a truer picture of the year's working? Give a reason. [1]`,
  model: `**(a)**\n\n${mdTable(['Particulars', 'Cash basis (₹)', 'Accrual basis (₹)'], SP.rows)}\n\n**(b) Reconciliation**\n\n${mdTable(['Particulars', '₹'], [
    ['Cash profit', inr(SP.cashProfit)],
    [`Less: fees adjusted (${inr(SP.rev.cash)} − ${inr(SP.rev.acc)})`, `(${inr(-SPrev)})`],
    [`Add: expenses reduced (${inr(SP.cashOut)} − ${inr(SP.accOut)})`, inr(SP.cashOut - SP.accOut)],
    ['**Accrual profit**', `**${inr(SP.profit)}**`],
  ])}\n\n**(c)** The accrual profit gives the truer picture. It counts only the fees earned and the expenses incurred in this year, whereas the cash profit mixes in amounts of other years.`,
  sol: 'Adjust each line, reconcile through the net adjustments, then judge.',
  scheme: [['Revenue after adjustments', 1], ['Wages, rent and insurance after adjustments', 1], ['Accrual profit', 1], ['Reconciliation reaching the accrual profit', 1], ['Judgement with reason', 1]],
}));
