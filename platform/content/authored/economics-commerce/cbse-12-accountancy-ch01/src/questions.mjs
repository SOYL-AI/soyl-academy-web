// CBSE 12 Accountancy, ch01 Accounting for Partnership: Basic Concepts — question bank. Every firm,
// partner and figure is imagined by SOYL; no NCERT illustration or exercise and no CBSE sample-paper or
// board item is reused. Every amount is computed with acc.mjs from the givens in the stem and asserted
// against the value the author worked out by hand, so a figure never drifts between stem, table and key.
import { Q, mcq, ar, tf, fb, match, num, short, long } from './lib.mjs';
import { check, same, sum, inr, rs, interest, divide, iodEqual, iodProduct, avgMonths, commissionAfter, commissionBefore, journal, mdTable, partnerAccounts, appropriation, pastAdjustment, average, weightedAverage, normalProfit, capitalise, goodwillAll } from './acc.mjs';

/** Every registered item's key and stem, for the build's near-duplicate check. */
export const BANK = [];
/** Registers a question after checking that its marking scheme adds up to its marks. */
function QQ(key, q) {
  same(sum(q.marking_scheme.map((s) => s.marks)), q.marks, `marking scheme of ${key}`);
  BANK.push({ id: key, unit: 'cbse-12-accountancy-ch01', text: q.stem_md });
  return Q(key, q);
}
/** Numerical item with a rupee key and a marking step that shows the amount in Indian grouping. */
const numQ = (o) => num({ ...o, scheme: [[`Correct answer: ${rs(o.value)}`, o.marks ?? 1]] });
const months = (m) => (m === 6.5 ? '6½' : m === 7.5 ? '7½' : m === 5.5 ? '5½' : m === 4.5 ? '4½' : String(m));
const S3 = [50, 80];
const L4 = [80, 120];
const acct = (n, kind = 'Capital') => `${n}'s ${kind} A/c`;

// ================================================================ t01 Nature of partnership and the deed
QQ('m_def', mcq({
  t: 1, d: 1, c: 'understanding',
  stem: 'The Indian Partnership Act, 1932 says that the business of a firm may be carried on by all the partners **or by any of them acting for all**. This part of the definition is the basis of which feature of partnership?',
  opts: ['Mutual agency', 'Unlimited liability', 'Sharing of profits', 'Voluntary registration'],
  sol: 'A partner who acts for all binds the others, so every partner is both an agent and a principal of the firm. Unlimited liability and profit sharing are separate features, and registration is not part of the definition.',
}));
QQ('m_maxpartners', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Under the Companies Act, 2013 read with the Companies (Miscellaneous) Rules, 2014, the **maximum** number of partners a partnership firm may have is',
  opts: ['50', '20', '10', '100'],
  sol: 'Rule 10 of the Companies (Miscellaneous) Rules, 2014 caps a firm at 50 partners; the minimum is two.',
}));
QQ('m_loan6', mcq({
  t: 1, d: 1, c: 'recall',
  stem: `There is no partnership deed. Partner Devika lends ${rs(100000)} to the firm, over and above her capital. Under the Indian Partnership Act, 1932 she is entitled to interest on this loan at`,
  opts: ['6% per annum, charged to the Profit and Loss Account', '6% per annum, paid only out of profits', '12% per annum, charged to the Profit and Loss Account', 'nothing, because there is no deed'],
  sol: 'When partners have not agreed otherwise, the Act allows 6% a year on a loan or advance by a partner. It is a charge, so it is paid even in a year of loss.',
}));
const silentFirm = { Farid: 600000, Gauri: 200000 };
const silentProfit = 160000;
const silentEq = divide(silentProfit, { Farid: 1, Gauri: 1 }, 'm_silent_profit');
const silentCap = divide(silentProfit, { Farid: 3, Gauri: 1 }, 'm_silent_profit capital ratio');
same(silentEq.Farid, 80000, 'm_silent_profit equal share');
QQ('m_silent_profit', mcq({
  t: 1, d: 2, c: 'application',
  stem: `Farid invested ${rs(silentFirm.Farid)} and Gauri ${rs(silentFirm.Gauri)} in an imagined travel agency in Kochi. They never agreed how profits would be shared. A profit of ${rs(silentProfit)} for the year will be shared as`,
  opts: [`${rs(silentEq.Farid)} to each partner`, `${rs(silentCap.Farid)} to Farid and ${rs(silentCap.Gauri)} to Gauri, in the capital ratio`, `${rs(silentProfit)} to Farid, as the larger investor`, 'whatever ratio the firm\'s auditor decides'],
  sol: 'Without an agreement the Act requires profits and losses to be shared equally, whatever the capitals contributed.',
}));
QQ('m_silent_salary', mcq({
  t: 1, d: 2, c: 'application',
  stem: `Kavya and Ruhi run an imagined design studio in Indore without a partnership deed. Kavya works full time; Ruhi comes in only at weekends. Kavya claims a salary of ${rs(20000)} per month. Under the Act, Kavya`,
  opts: ['gets no salary, because a partner is not entitled to remuneration without an agreement', `gets ${rs(20000)} per month, because she works full time`, 'gets a salary, but only out of profits', 'gets half the salary she claims, because Ruhi also works'],
  sol: 'The Act gives no salary or commission to a partner for taking part in the business unless the partners agree to pay it, however unequal their work.',
}));
QQ('ar_loan', ar({
  t: [1, 3], d: 3, c: 'analysis', key: 'a',
  a: 'In the absence of a partnership deed, a partner who has lent money to the firm receives interest at 6% per annum even in a year when the firm makes a loss.',
  r: 'Interest on a partner\'s loan is a charge against profits and is debited to the Profit and Loss Account.',
  sol: 'Both statements are true. Because the interest is a charge (an expense of the firm), it is payable whatever the result of the year, which is exactly why A holds.',
}));
QQ('tf_deed_written', tf({
  t: 1, d: 1, c: 'understanding', ans: false,
  stem: 'True or false? A partnership deed must be in writing; an oral agreement between partners is not valid.',
  sol: 'The agreement may be oral or written. A written and stamped deed is advisable because it settles disputes, but the Act does not make writing compulsory.',
}));
QQ('fb_mutual', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'Every partner is an agent of the firm and of the other partners, and also a principal. This feature of partnership is called ___ agency.',
  acc: [['mutual']],
  sol: 'It is mutual agency: an act of one partner in the course of business binds the firm and all partners.',
}));
QQ('mt_act', match({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'There is no partnership deed. Match each item with the rule of the Indian Partnership Act, 1932 that applies to it.',
  pairs: [
    ['Interest on partners\' capitals', 'Not allowed'],
    ['Interest on partners\' drawings', 'Not charged'],
    ['Interest on a loan given by a partner', 'Allowed at 6% per annum'],
    ['Sharing of profits and losses', 'Equal among the partners'],
  ],
  sol: 'When the deed is silent: no interest on capital, no interest on drawings, 6% a year on partners\' loans, and equal sharing of profits and losses.',
}));
const loanK = { amount: 80000, months: 6 };
const loanKint = same(interest(loanK.amount, 6, loanK.months), 2400, 's3_deed_silent loan interest');
QQ('s3_deed_silent', short({
  t: 1, d: 2, c: 'application', marks: 3,
  stem: `Hari, Jaya and Kiran run an imagined furniture firm in Jodhpur and have **no partnership deed**. Their capitals are ${rs(600000)}, ${rs(300000)} and ${rs(100000)}. Kiran also lent the firm ${rs(loanK.amount)} on 1 October 2025. At the year end (31 March 2026) three claims are made: (i) Hari wants profits shared in the capital ratio; (ii) Jaya, who works full time, wants a salary of ${rs(15000)} per month; (iii) Kiran wants interest at 12% per annum on her loan. Settle each claim, giving reasons.`,
  model: [
    `1. **Profit sharing:** Hari's claim is not valid. Without a deed, profits are shared **equally** among Hari, Jaya and Kiran, whatever their capitals.`,
    `2. **Salary:** Jaya's claim is not valid. The Act allows **no salary or commission** to a partner unless all partners agree to it.`,
    `3. **Interest on loan:** Kiran gets interest at **6% per annum**, not 12%: ${rs(loanK.amount)} × 6/100 × ${loanK.months}/12 = **${rs(loanKint)}** for 1 October 2025 to 31 March 2026. It is a **charge**, debited to the Profit and Loss Account and payable even if there is a loss.`,
  ].join('\n'),
  sol: 'Apply the three default rules of the Act; the loan earns interest only from the date it was given.',
  scheme: [['Equal sharing with reason', 1], ['No salary with reason', 1], [`Interest at 6% for 6 months = ${rs(loanKint)} as a charge`, 1]],
}));
QQ('s3_deed_contents', short({
  t: 1, d: 1, c: 'recall', marks: 3,
  stem: 'State any **six** matters that a partnership deed usually covers.',
  model: [
    '1. Name and address of the firm and of every partner, and the nature of the business.',
    '2. Date of commencement and duration of the partnership.',
    '3. Capital contributed by each partner.',
    '4. Profit-sharing ratio.',
    '5. Interest on capital and on drawings, and the rate of interest on partners\' loans.',
    '6. Salary or commission payable to partners.',
    '7. Rules for admission, retirement or death of a partner, valuation of goodwill, settlement of disputes and dissolution.',
  ].join('\n'),
  sol: 'Any six points from the list earn half a mark each.',
  scheme: [['Any six correct matters, ½ mark each', 3]],
}));
QQ('l4_features', long({
  t: 1, d: 2, c: 'understanding', marks: 4, wl: L4,
  stem: 'Sisters Ritika and Sonal start an imagined bakery in Shillong as partners. Using their business as the example, explain any **four** features of a partnership.',
  model: [
    '1. **Two or more persons:** Ritika and Sonal are two; a firm may have at most 50 partners.',
    '2. **Agreement:** they are partners because they agreed, orally or in writing, not because they are sisters.',
    '3. **Lawful business:** the agreement is to carry on a business, here baking and selling bread and cakes.',
    '4. **Sharing of profits:** they share the profits and losses of the bakery in an agreed ratio.',
    '5. **Mutual agency:** either sister may act for both; an order Sonal places for flour binds Ritika too.',
    '6. **Unlimited liability:** if the bakery cannot pay its debts, creditors can recover them from either sister\'s private assets.',
  ].join('\n'),
  sol: 'Each feature needs its meaning and a link to the bakery; any four of the six.',
  scheme: [['Feature 1 explained with the example', 1], ['Feature 2 explained with the example', 1], ['Feature 3 explained with the example', 1], ['Feature 4 explained with the example', 1]],
}));

// ================================================================ t02 Fixed and fluctuating capital
QQ('m_fixed_items', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Under the **fixed capital method**, which item is recorded in a partner\'s capital account rather than in the current account?',
  opts: ['Additional capital introduced by the partner', 'Interest on capital for the year', 'Share of profit for the year', 'Drawings made during the year'],
  sol: 'Only permanent changes in capital, such as fresh capital brought in or capital permanently withdrawn, pass through the capital account; the routine items of the year go to the current account.',
}));
QQ('m_fluct_default', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'If a question does not say which method to use, the partners\' capital accounts are prepared by the',
  opts: ['fluctuating capital method', 'fixed capital method', 'average capital method', 'net worth method'],
  sol: 'In the absence of an instruction, capitals are taken as fluctuating: every adjustment is recorded in the capital account itself.',
}));
QQ('tf_current_debit', tf({
  t: 2, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? Under the fixed capital method, a partner\'s **current account** can show a debit balance.',
  sol: 'If drawings, interest on drawings and a share of loss exceed the credits of the year, the current account goes into debit, while the capital account keeps its credit balance.',
}));
QQ('fb_fixed', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'Under the fixed capital method, a partner\'s capital account normally shows a ___ balance.',
  acc: [['credit']],
  sol: 'It always shows a credit balance, because only capital brought in or permanently withdrawn passes through it.',
}));
QQ('mt_where', match({
  t: 2, d: 2, c: 'understanding', marks: 2,
  stem: 'An imagined firm keeps its partners\' capitals **fixed**. Match each item with the place where it is recorded.',
  pairs: [
    ['Additional capital brought in', 'Credit side of the capital account'],
    ['Capital permanently withdrawn', 'Debit side of the capital account'],
    ['Salary allowed to a partner', 'Credit side of the current account'],
    ['Interest charged on drawings', 'Debit side of the current account'],
  ],
  sol: 'Permanent changes go to the capital account; salary (a credit to the partner) and interest on drawings (a debit) go to the current account.',
}));
QQ('ar_fixed', ar({
  t: 2, d: 2, c: 'understanding', key: 'd',
  a: 'Under the fixed capital method, interest on drawings is debited to the partner\'s capital account.',
  r: 'Under the fixed capital method, the routine items of the year, such as drawings, interest and share of profit, pass through the partners\' current accounts.',
  sol: 'A is false: interest on drawings is a routine item, so it is debited to the current account. R is true and states the rule correctly.',
}));
const OC = { closing: 462000, drawings: 48000, profit: 90000, addl: 50000, addlMonths: 6, rate: 8 };
const OCopen = same(OC.closing + OC.drawings - OC.profit - OC.addl, 370000, 's3_opening_capital opening');
const OCi1 = interest(OCopen, OC.rate);
const OCi2 = interest(OC.addl, OC.rate, OC.addlMonths);
const OCi = same(OCi1 + OCi2, 31600, 's3_opening_capital interest');
QQ('s3_opening_capital', short({
  t: 2, d: 3, c: 'analysis', marks: 3,
  stem: `Pooja is a partner in an imagined pottery firm in Khurja. Her capital account on 31 March 2026 showed ${rs(OC.closing)}, **before** interest on capital was credited. During 2025-26 she withdrew ${rs(OC.drawings)}, her share of profit of ${rs(OC.profit)} was credited, and she brought in additional capital of ${rs(OC.addl)} on 1 October 2025. Calculate her capital on 1 April 2025 and the interest on her capital at ${OC.rate}% per annum.`,
  model: [
    '**Opening capital (working back from the closing capital)**',
    mdTable(['Particulars', '₹'], [
      ['Capital on 31 March 2026', inr(OC.closing)],
      ['Add: Drawings during the year', inr(OC.drawings)],
      ['Less: Share of profit credited', inr(OC.profit)],
      ['Less: Additional capital brought in on 1 October 2025', inr(OC.addl)],
      ['**Capital on 1 April 2025**', `**${inr(OCopen)}**`],
    ]),
    '**Interest on capital at 8% per annum**',
    `- On ${rs(OCopen)} for 12 months: ${rs(OCopen)} × 8/100 = ${rs(OCi1)}`,
    `- On ${rs(OC.addl)} for 6 months (1 October to 31 March): ${rs(OC.addl)} × 8/100 × 6/12 = ${rs(OCi2)}`,
    `- **Total interest on capital = ${rs(OCi)}**`,
  ].join('\n\n'),
  sol: 'Reverse every change of the year to reach the opening figure, then charge interest on the opening capital for the full year and on the addition from its date.',
  scheme: [['Opening capital with drawings added back and profit and addition deducted', 1.5], ['Interest on opening capital for the year', 0.5], ['Interest on additional capital for 6 months and total', 1]],
}));

// l6 current accounts (fixed capitals)
const RS = { names: ['Rhea', 'Sameer'], ratio: { Rhea: 3, Sameer: 2 }, cap: { Rhea: 500000, Sameer: 300000 }, open: { Rhea: 20000, Sameer: -5000 }, profit: 280000, salaryPm: 4000, commPct: 5, drawings: { Rhea: 60000, Sameer: 36000 }, iod: { Rhea: 1800, Sameer: 1000 } };
const RSioc = { Rhea: interest(RS.cap.Rhea, 10), Sameer: interest(RS.cap.Sameer, 10) };
const RSsal = { Sameer: RS.salaryPm * 12 };
const RScomm = { Rhea: commissionBefore(RS.profit, RS.commPct) };
const RSapp = appropriation({ names: RS.names, ratio: RS.ratio, profit: RS.profit, iod: RS.iod, ioc: RSioc, salary: RSsal, commission: RScomm, shareLabel: (n) => `To ${acct(n, 'Current')} (share of profit)` });
const RScur = partnerAccounts({
  names: RS.names,
  dr: [['To Balance b/d', { Sameer: -RS.open.Sameer }], ['To Drawings A/c', RS.drawings], ['To Interest on Drawings A/c', RS.iod]],
  cr: [['By Balance b/d', { Rhea: RS.open.Rhea }], ['By Interest on Capital A/c', RSioc], ['By Salary A/c', RSsal], ['By Commission A/c', RScomm], ['By P&L Appropriation A/c', RSapp.shares]],
});
same(RSapp.divisible, 140800, 'l6_current_accounts divisible'); same(RSapp.shares.Rhea, 84480, 'Rhea share');
same(RScur.balances.Rhea, 106680, 'Rhea current balance'); same(RScur.balances.Sameer, 92320, 'Sameer current balance');
QQ('l6_current_accounts', long({
  t: [2, 3], d: 4, c: 'application', marks: 6,
  stem: `Rhea and Sameer are partners in an imagined honey-processing firm in Kolkata, sharing profits 3:2. Their **fixed** capitals are ${rs(RS.cap.Rhea)} and ${rs(RS.cap.Sameer)}. On 1 April 2025 their current accounts showed Rhea ${rs(RS.open.Rhea)} (credit) and Sameer ${rs(-RS.open.Sameer)} (debit). The deed provides: interest on capital at 10% per annum; a salary to Sameer of ${rs(RS.salaryPm)} per month; a commission to Rhea of ${RS.commPct}% of the net profit before any appropriation. Drawings for the year were Rhea ${rs(RS.drawings.Rhea)} and Sameer ${rs(RS.drawings.Sameer)}, and interest on drawings has been calculated as Rhea ${rs(RS.iod.Rhea)} and Sameer ${rs(RS.iod.Sameer)}. The net profit for 2025-26 was ${rs(RS.profit)}. Prepare the Profit and Loss Appropriation Account and the partners' current accounts.`,
  model: [
    '**Profit and Loss Appropriation Account** for the year ended 31 March 2026',
    RSapp.md,
    `Working: commission = ${rs(RS.profit)} × ${RS.commPct}/100 = ${rs(RScomm.Rhea)}; divisible profit ${rs(RSapp.divisible)} shared 3:2.`,
    '**Partners\' Current Accounts**',
    RScur.md,
  ].join('\n\n'),
  sol: 'Capitals stay fixed, so every item of the year, including the opening current balances, goes through the current accounts; a debit opening balance sits on the debit side.',
  scheme: [['Interest on capital, salary and commission debited', 1.5], ['Interest on drawings credited and divisible profit found', 1], ['Division of profit 3:2', 0.5], ['Current accounts with opening balances on the correct sides', 2], ['Closing balances', 1]],
}));

// l6 fluctuating capitals
const GM = { names: ['Gauri', 'Manav'], ratio: { Gauri: 2, Manav: 1 }, cap: { Gauri: 400000, Manav: 250000 }, addl: 50000, addlMonths: 9, rate: 9, salary: { Gauri: 30000 }, profit: 195000 };
const GMioc = { Gauri: interest(GM.cap.Gauri, GM.rate), Manav: interest(GM.cap.Manav, GM.rate) + interest(GM.addl, GM.rate, GM.addlMonths) };
const GMdG = iodEqual({ amount: 3000, n: 12, when: 'end', rate: 6 });
const GMdM = iodEqual({ amount: 8000, n: 4, when: 'begin', rate: 6 });
const GMiod = { Gauri: GMdG.interest, Manav: GMdM.interest };
const GMapp = appropriation({ names: GM.names, ratio: GM.ratio, profit: GM.profit, iod: GMiod, ioc: GMioc, salary: GM.salary });
const GMcap = partnerAccounts({
  names: GM.names,
  dr: [['To Drawings A/c', { Gauri: GMdG.total, Manav: GMdM.total }], ['To Interest on Drawings A/c', GMiod]],
  cr: [['By Balance b/d', GM.cap], ['By Bank A/c (additional capital)', { Manav: GM.addl }], ['By Interest on Capital A/c', GMioc], ['By Salary A/c', GM.salary], ['By P&L Appropriation A/c', GMapp.shares]],
});
same(GMioc.Manav, 25875, 'Manav interest on capital'); same(GMiod.Gauri, 990, 'Gauri IOD'); same(GMiod.Manav, 1200, 'Manav IOD');
same(GMapp.divisible, 105315, 'GM divisible'); same(GMcap.balances.Gauri, 499220, 'Gauri capital'); same(GMcap.balances.Manav, 327780, 'Manav capital');
QQ('l6_fluct_capital', long({
  t: [2, 3], d: 4, c: 'application', marks: 6,
  stem: `Gauri and Manav share profits 2:1 in an imagined solar-panel installation firm in Jaipur. On 1 April 2025 their capitals were ${rs(GM.cap.Gauri)} and ${rs(GM.cap.Manav)}; Manav brought in a further ${rs(GM.addl)} on 1 July 2025. The deed allows interest on capital at ${GM.rate}% per annum, a yearly salary of ${rs(GM.salary.Gauri)} to Gauri, and charges interest on drawings at 6% per annum. Gauri withdrew ${rs(3000)} at the **end** of every month and Manav ${rs(8000)} at the **beginning** of every quarter. The net profit for 2025-26 was ${rs(GM.profit)}. Capitals are **fluctuating**. Prepare the Profit and Loss Appropriation Account and the partners' capital accounts.`,
  model: [
    '**Working notes**',
    `1. Interest on capital: Gauri ${rs(GM.cap.Gauri)} × 9/100 = ${rs(GMioc.Gauri)}. Manav ${rs(GM.cap.Manav)} × 9/100 = ${rs(interest(GM.cap.Manav, GM.rate))}, plus ${rs(GM.addl)} × 9/100 × 9/12 = ${rs(interest(GM.addl, GM.rate, GM.addlMonths))}, total ${rs(GMioc.Manav)}.`,
    `2. Interest on drawings: Gauri ${rs(GMdG.total)} × 6/100 × ${months(GMdG.months)}/12 = ${rs(GMiod.Gauri)} (end of each month: ${months(GMdG.months)} months). Manav ${rs(GMdM.total)} × 6/100 × ${months(GMdM.months)}/12 = ${rs(GMiod.Manav)} (beginning of each quarter: ${months(GMdM.months)} months).`,
    '**Profit and Loss Appropriation Account** for the year ended 31 March 2026',
    GMapp.md,
    '**Partners\' Capital Accounts**',
    GMcap.md,
  ].join('\n\n'),
  sol: 'With fluctuating capitals every item goes to the capital account; the additional capital earns interest only from 1 July.',
  scheme: [['Interest on capital including the addition for 9 months', 1], ['Interest on drawings by average period', 1], ['Appropriation account and division 2:1', 2], ['Capital accounts with closing balances', 2]],
}));

// ================================================================ t03 Profit and Loss Appropriation Account
QQ('m_charge', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Which of the following is debited to the **Profit and Loss Account** of a firm, and not to the Profit and Loss Appropriation Account?',
  opts: ['Interest on a loan given to the firm by a partner', 'Interest on partners\' capitals', 'Salary allowed to a partner', 'Transfer to general reserve'],
  sol: 'A partner\'s loan is a debt of the firm, so its interest is an expense (a charge) found before net profit. The other three are appropriations of the profit already found.',
}));
QQ('m_insuff', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'A deed allows interest on capital but does not say it is a charge. The net profit of the year is **less** than the total interest on capital. The available profit is',
  opts: ['distributed among the partners in the ratio of their interest on capital', 'distributed in the profit-sharing ratio after allowing full interest', 'used to allow full interest, and the shortfall is carried forward', 'transferred to general reserve, with no interest allowed'],
  sol: 'Interest on capital that is an appropriation can be paid only out of profit, so the whole profit goes to the partners in proportion to the interest due to each.',
}));
QQ('m_loss_ioc', mcq({
  t: 3, d: 2, c: 'application',
  stem: `The deed of an imagined firm allows interest on capital at 10% per annum and is silent on whether it is a charge. This year the firm made a **loss** of ${rs(30000)}. Interest on capital allowed to the partners is`,
  opts: ['nil; the loss is shared in the profit-sharing ratio', '10% on capitals, debited to the Profit and Loss Account', '10% on capitals, to be credited when profits return', 'half the agreed interest, because the loss is small'],
  sol: 'An appropriation needs profit to appropriate. With a loss there is nothing to appropriate, so no interest is allowed.',
}));
QQ('m_avg_quarter_end', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'A partner withdraws an equal amount at the **end** of every quarter of the year. For interest on drawings, the average period is',
  opts: [`${months(avgMonths(4, 'end'))} months`, `${months(avgMonths(4, 'begin'))} months`, `${avgMonths(4, 'mid')} months`, `${months(avgMonths(12, 'end'))} months`],
  sol: 'The four drawings are outstanding for 9, 6, 3 and 0 months; their average is (9 + 0) ÷ 2 = 4½ months.',
}));
const CB = { profit: 420000, pct: 5 };
const CBbefore = same(commissionBefore(CB.profit, CB.pct), 21000, 'm_commission_before');
const CBafter = same(commissionAfter(CB.profit, CB.pct), 20000, 'm_commission_before distractor');
QQ('m_commission_before', mcq({
  t: 3, d: 2, c: 'application',
  stem: `The net profit of an imagined firm is ${rs(CB.profit)}. Partner Omkar is entitled to a commission of ${CB.pct}% of the net profit **before** charging such commission. His commission is`,
  opts: [rs(CBbefore), rs(CBafter), rs(CBbefore * 2), rs(CBbefore + CBafter)],
  sol: `Before charging: ${rs(CB.profit)} × 5/100 = ${rs(CBbefore)}. The figure ${rs(CBafter)} would be the commission after charging it (× 5/105).`,
}));
QQ('fb_avg_begin', fb({
  t: 3, d: 1, c: 'recall',
  stem: 'When a partner withdraws an equal amount at the **beginning** of every month for a year, interest on drawings is calculated for an average period of ___ months.',
  acc: [['6.5', '6½', 'six and a half']],
  sol: 'The average period is 6.5 months: the first drawing is outstanding for 12 months and the last for 1, so (12 + 1) ÷ 2.',
}));
const TJ = iodEqual({ amount: 4000, n: 12, when: 'mid', rate: 9 });
same(TJ.interest, 2160, 'n_iod_mid');
QQ('n_iod_mid', numQ({
  t: 3, d: 2, c: 'application', value: TJ.interest, unit: '₹',
  stem: `Tejas withdrew ${rs(4000)} in the **middle** of every month during 2025-26. The deed charges interest on drawings at 9% per annum. Calculate the interest on his drawings (in ₹).`,
  sol: `Total drawings = ${rs(4000)} × 12 = ${rs(TJ.total)}; average period = ${TJ.months} months. Interest = ${inr(TJ.total)} × 9/100 × 6/12 = ${rs(TJ.interest)}.`,
}));
const CA = { profit: 231000, pct: 10 };
const CAc = same(commissionAfter(CA.profit, CA.pct), 21000, 'n_commission_after');
QQ('n_commission_after', numQ({
  t: 3, d: 2, c: 'application', value: CAc, unit: '₹',
  stem: `The net profit of an imagined bookshop in Pune, before charging Leena's commission, is ${rs(CA.profit)}. Leena is entitled to a commission of ${CA.pct}% of the net profit **after** charging such commission. Find her commission (in ₹).`,
  sol: `Commission = profit before commission × 10/110 = ${inr(CA.profit)} × 10/110 = ${rs(CAc)}. Check: ${inr(CA.profit - CAc)} × 10% = ${inr(CAc)}.`,
}));
const NV = { cap: 600000, addl: 120000, addlMonths: 3, rate: 10 };
const NVi = same(interest(NV.cap, NV.rate) + interest(NV.addl, NV.rate, NV.addlMonths), 63000, 'n_ioc_addl');
QQ('n_ioc_addl', numQ({
  t: 3, d: 2, c: 'application', value: NVi, unit: '₹',
  stem: `On 1 April 2025 Naveen's capital was ${rs(NV.cap)}. He brought in a further ${rs(NV.addl)} on 1 January 2026. Interest on capital is allowed at ${NV.rate}% per annum. Calculate the interest on his capital for the year ended 31 March 2026 (in ₹).`,
  sol: `${rs(NV.cap)} × 10/100 = ${rs(interest(NV.cap, NV.rate))} for the full year, plus ${rs(NV.addl)} × 10/100 × 3/12 = ${rs(interest(NV.addl, NV.rate, NV.addlMonths))} for January to March. Total ${rs(NVi)}.`,
}));
const US = iodProduct(12, [[10000, 10], [15000, 6], [5000, 2]]);
same(US.interest, 2000, 'n_iod_product');
QQ('n_iod_product', numQ({
  t: 3, d: 3, c: 'application', value: US.interest, unit: '₹',
  stem: `Usha withdrew ${rs(10000)} on 1 June 2025, ${rs(15000)} on 1 October 2025 and ${rs(5000)} on 1 February 2026. Interest on drawings is charged at 12% per annum and the year ends on 31 March 2026. Using the **product method**, calculate the interest on her drawings (in ₹).`,
  sol: `Months to 31 March: 10, 6 and 2. Products: ${inr(US.products[0])} + ${inr(US.products[1])} + ${inr(US.products[2])} = ${inr(US.total)}. Interest = ${inr(US.total)} × 12/100 × 1/12 = ${rs(US.interest)}.`,
}));
QQ('ar_iod', ar({
  t: 3, d: 2, c: 'understanding', key: 'c',
  a: 'Interest on drawings is credited to the Profit and Loss Appropriation Account.',
  r: 'Interest on drawings is a charge against the profits of the firm.',
  sol: 'A is true. R is false: interest on drawings is recovered from partners and adjusts their shares, so it is an appropriation item, not a charge.',
}));
QQ('ar_ioc_charge', ar({
  t: 3, d: 3, c: 'analysis', key: 'a',
  a: 'If the deed says that interest on capital is a charge against profits, it is allowed even when the firm suffers a loss.',
  r: 'A charge is debited to the Profit and Loss Account before the net profit or loss is found.',
  sol: 'Both are true, and R explains A: being an expense, the interest is provided first, and it may itself create or increase the loss.',
}));
QQ('ar_salary', ar({
  t: 3, d: 3, c: 'analysis', key: 'b',
  a: 'A partner\'s salary is debited to the Profit and Loss Appropriation Account.',
  r: 'A partner is entitled to a salary only if the partnership deed provides for it.',
  sol: 'Both are true. A holds because a salary to an owner is a share of profit, an appropriation; R only says when a salary is payable, so it does not explain A.',
}));
QQ('tf_reserve', tf({
  t: 3, d: 1, c: 'understanding', ans: false,
  stem: 'True or false? An amount transferred to general reserve is shown on the **credit** side of the Profit and Loss Appropriation Account.',
  sol: 'A transfer to reserve is set aside out of profit, so it is an appropriation and is debited to the account.',
}));
const RT = { names: ['Ruchi', 'Sahil', 'Tara'], cap: { Ruchi: 300000, Sahil: 200000, Tara: 100000 }, addl: 100000, rate: 12, profit: 52000 };
const RTioc = { Ruchi: interest(RT.cap.Ruchi, RT.rate), Sahil: interest(RT.cap.Sahil, RT.rate) + interest(RT.addl, RT.rate, 6), Tara: interest(RT.cap.Tara, RT.rate) };
const RTtot = sum(Object.values(RTioc));
check(RTtot > RT.profit, 's3_ioc_insufficient: profit must be insufficient');
const RTsh = divide(RT.profit, RTioc, 's3_ioc_insufficient');
same(RTtot, 78000, 'RT total interest'); same(RTsh.Ruchi, 24000, 'Ruchi'); same(RTsh.Sahil, 20000, 'Sahil'); same(RTsh.Tara, 8000, 'Tara');
QQ('s3_ioc_insufficient', short({
  t: 3, d: 3, c: 'application', marks: 3,
  stem: `Ruchi, Sahil and Tara are partners in an imagined courier firm in Bhubaneswar. Their capitals on 1 April 2025 were ${rs(RT.cap.Ruchi)}, ${rs(RT.cap.Sahil)} and ${rs(RT.cap.Tara)}; Sahil brought in ${rs(RT.addl)} more on 1 October 2025. The deed allows interest on capital at ${RT.rate}% per annum but does not treat it as a charge. The net profit for 2025-26 was only ${rs(RT.profit)}. Show how the profit will be distributed.`,
  model: [
    `**Interest due on capital:** Ruchi ${rs(RTioc.Ruchi)}; Sahil ${rs(interest(RT.cap.Sahil, RT.rate))} + ${rs(interest(RT.addl, RT.rate, 6))} (on ${rs(RT.addl)} for 6 months) = ${rs(RTioc.Sahil)}; Tara ${rs(RTioc.Tara)}. Total ${rs(RTtot)}.`,
    `The profit of ${rs(RT.profit)} is **less** than the interest due, so interest is limited to the profit and the whole profit is shared in the ratio of interest due, ${inr(RTioc.Ruchi)} : ${inr(RTioc.Sahil)} : ${inr(RTioc.Tara)} = 6 : 5 : 2.`,
    mdTable(['Partner', 'Share of profit as interest on capital (₹)'], [...RT.names.map((n) => [n, inr(RTsh[n])]), ['**Total**', `**${inr(RT.profit)}**`]]),
    'Nothing is left to share in the profit-sharing ratio.',
  ].join('\n\n'),
  sol: 'Work out each partner\'s full interest first; when it exceeds the profit, the interest ratio decides the split.',
  scheme: [['Interest due including the additional capital', 1], ['Rule: profit shared in the ratio of interest', 1], ['Correct amounts', 1]],
}));
const SM = { amount: 9000, rate: 8 };
const SMb = iodEqual({ amount: SM.amount, n: 4, when: 'begin', rate: SM.rate });
const SMe = iodEqual({ amount: SM.amount, n: 4, when: 'end', rate: SM.rate });
same(SMb.interest, 1800, 'SM begin'); same(SMe.interest, 1080, 'SM end');
QQ('s3_iod_quarterly', short({
  t: 3, d: 2, c: 'application', marks: 3,
  stem: `Simran, a partner in an imagined dairy firm in Anand, withdrew ${rs(SM.amount)} at the **beginning** of every quarter of 2025-26. Interest on drawings is charged at ${SM.rate}% per annum. (a) Calculate the interest on her drawings. (b) What would it be if she had withdrawn the same amounts at the **end** of every quarter?`,
  model: [
    `Total drawings = ${rs(SM.amount)} × 4 = ${rs(SMb.total)}.`,
    `**(a) Beginning of each quarter:** the drawings are outstanding for 12, 9, 6 and 3 months, so the average period is (12 + 3) ÷ 2 = ${months(SMb.months)} months. Interest = ${rs(SMb.total)} × 8/100 × 7.5/12 = **${rs(SMb.interest)}**.`,
    `**(b) End of each quarter:** outstanding for 9, 6, 3 and 0 months, average (9 + 0) ÷ 2 = ${months(SMe.months)} months. Interest = ${rs(SMe.total)} × 8/100 × 4.5/12 = **${rs(SMe.interest)}**.`,
  ].join('\n\n'),
  sol: 'Find the total drawn, then the average number of months the money was with the partner.',
  scheme: [['Total drawings and average period for (a)', 1], [`Interest ${rs(SMb.interest)}`, 1], [`Average period and interest ${rs(SMe.interest)} for (b)`, 1]],
}));
QQ('s3_charge_vs_approp', short({
  t: 3, d: 2, c: 'understanding', marks: 3,
  stem: 'Distinguish between the Profit and Loss Account and the Profit and Loss Appropriation Account of a partnership firm on any three points.',
  model: mdTable(['Basis', 'Profit and Loss Account', 'Profit and Loss Appropriation Account'], [
    ['Purpose', 'Finds the net profit or loss of the year', 'Shows how the net profit is distributed among partners'],
    ['Items recorded', 'Expenses and incomes, including charges such as interest on a partner\'s loan and rent to a partner', 'Appropriations such as interest on capital and drawings, salary, commission, reserve and shares of profit'],
    ['Order', 'Prepared first', 'Prepared after it, starting from its net profit'],
    ['Loss year', 'Shows the loss', 'No interest on capital or salary out of a loss unless the deed treats it as a charge'],
  ]),
  sol: 'Contrast purpose, the kind of items and the order of preparation; any three points.',
  scheme: [['Any three correct points of difference, 1 mark each', 3]],
}));
const KL = { names: ['Kunal', 'Lata'], ratio: { Kunal: 2, Lata: 1 }, cap: { Kunal: 300000, Lata: 200000 }, profit: 151000, iod: { Kunal: 1200, Lata: 800 } };
const KLioc = { Kunal: interest(KL.cap.Kunal, 6), Lata: interest(KL.cap.Lata, 6) };
const KLapp = appropriation({ names: KL.names, ratio: KL.ratio, profit: KL.profit, iod: KL.iod, ioc: KLioc, salary: { Lata: 2500 * 12 } });
same(KLapp.divisible, 93000, 'l4_appropriation_basic divisible'); same(KLapp.shares.Kunal, 62000, 'Kunal share');
QQ('l4_appropriation_basic', long({
  t: 3, d: 3, c: 'application', marks: 4,
  stem: `Kunal and Lata are partners in an imagined printing press in Sivakasi, sharing profits 2:1. Their capitals are ${rs(KL.cap.Kunal)} and ${rs(KL.cap.Lata)}. The deed provides interest on capital at 6% per annum and a salary to Lata of ${rs(2500)} per month. Interest on drawings for the year is Kunal ${rs(KL.iod.Kunal)} and Lata ${rs(KL.iod.Lata)}. The net profit for 2025-26 before these adjustments was ${rs(KL.profit)}. Prepare the Profit and Loss Appropriation Account.`,
  model: ['**Profit and Loss Appropriation Account** for the year ended 31 March 2026', KLapp.md, `Divisible profit ${rs(KLapp.divisible)} is shared 2:1.`].join('\n\n'),
  sol: 'Credit profit and interest on drawings; debit interest on capital and salary; share the balance 2:1.',
  scheme: [['Interest on capital', 1], ['Salary for 12 months', 0.5], ['Interest on drawings credited', 0.5], ['Divisible profit', 1], ['Shares 2:1', 1]],
}));
const NP = { names: ['Neha', 'Parth'], ratio: { Neha: 1, Parth: 1 }, cap: { Neha: 400000, Parth: 200000 }, rate: 10, profit: 45000, loss: 20000 };
const NPioc = { Neha: interest(NP.cap.Neha, NP.rate), Parth: interest(NP.cap.Parth, NP.rate) };
const NPtot = sum(Object.values(NPioc));
const NP1 = divide(NP.profit, NPioc, 'l4_ioc_loss (i)');
const NP2 = divide(NP.loss, NP.ratio, 'l4_ioc_loss (ii)');
const NPloss3 = same(NPtot - NP.profit, 15000, 'l4_ioc_loss (iii) loss');
const NP3 = divide(NPloss3, NP.ratio, 'l4_ioc_loss (iii)');
same(NP1.Neha, 30000, 'NP1'); same(NP3.Neha, 7500, 'NP3');
QQ('l4_ioc_loss', long({
  t: 3, d: 4, c: 'analysis', marks: 4,
  stem: `Neha and Parth share profits equally in an imagined bicycle-repair business in Mysuru. Their capitals are ${rs(NP.cap.Neha)} and ${rs(NP.cap.Parth)}, and the deed allows interest on capital at ${NP.rate}% per annum. Show the amounts credited or debited to each partner when: (i) the deed is silent on whether interest is a charge and the profit is ${rs(NP.profit)}; (ii) the deed is silent and the firm makes a loss of ${rs(NP.loss)}; (iii) the deed treats interest on capital as a **charge** and the profit before interest is ${rs(NP.profit)}.`,
  model: [
    `Interest due: Neha ${rs(NPioc.Neha)}, Parth ${rs(NPioc.Parth)}, total ${rs(NPtot)}.`,
    `**(i)** Interest is an appropriation and the profit ${rs(NP.profit)} is less than ${rs(NPtot)}, so the profit is shared in the interest ratio 2:1: Neha **${rs(NP1.Neha)}**, Parth **${rs(NP1.Parth)}** (credited as interest on capital).`,
    `**(ii)** With a loss nothing is appropriated, so no interest is allowed; the loss is shared equally: Neha and Parth are each **debited ${rs(NP2.Neha)}**.`,
    `**(iii)** As a charge, the full interest of ${rs(NPtot)} is debited to the Profit and Loss Account, turning the profit of ${rs(NP.profit)} into a loss of ${rs(NPloss3)}. Each partner is credited with full interest and debited with half the loss: Neha ${rs(NPioc.Neha)} − ${rs(NP3.Neha)} = **${rs(NPioc.Neha - NP3.Neha)}** net credit; Parth ${rs(NPioc.Parth)} − ${rs(NP3.Parth)} = **${rs(NPioc.Parth - NP3.Parth)}** net credit.`,
  ].join('\n\n'),
  sol: 'Decide first whether interest is an appropriation or a charge; only a charge survives a loss.',
  scheme: [['Interest due', 0.5], ['(i) Profit shared in the interest ratio', 1], ['(ii) No interest; loss shared equally', 1], ['(iii) Full interest as a charge and the resulting loss shared', 1.5]],
}));
const AB = { names: ['Aditi', 'Bhavesh', 'Charu'], ratio: { Aditi: 5, Bhavesh: 3, Charu: 2 }, cap: { Aditi: 500000, Bhavesh: 400000, Charu: 200000 }, before: 468000, loan: 100000, salary: { Bhavesh: 60000 }, reserve: 30000 };
const ABloanInt = interest(AB.loan, 6);
const ABprofit = AB.before - ABloanInt;
const ABcomm = { Charu: commissionAfter(ABprofit, 10) };
const ABioc = Object.fromEntries(AB.names.map((n) => [n, interest(AB.cap[n], 8)]));
const ABdA = iodEqual({ amount: 6000, n: 12, when: 'begin', rate: 10 });
const ABdB = iodEqual({ amount: 15000, n: 4, when: 'end', rate: 10 });
const ABapp = appropriation({ names: AB.names, ratio: AB.ratio, profit: ABprofit, profitLabel: 'By Profit and Loss A/c (net profit after loan interest)', iod: { Aditi: ABdA.interest, Bhavesh: ABdB.interest }, ioc: ABioc, salary: AB.salary, commission: ABcomm, reserve: AB.reserve });
same(ABprofit, 462000, 'AB profit'); same(ABcomm.Charu, 42000, 'Charu commission'); same(ABdA.interest, 3900, 'Aditi IOD'); same(ABdB.interest, 2250, 'Bhavesh IOD');
same(ABapp.divisible, 248150, 'AB divisible'); same(ABapp.shares.Aditi, 124075, 'Aditi share');
QQ('l6_three_partner_approp', long({
  t: [1, 3], d: 5, c: 'analysis', marks: 6,
  stem: `Aditi, Bhavesh and Charu run an imagined event-management firm in Hyderabad, sharing profits 5:3:2. Capitals: ${rs(AB.cap.Aditi)}, ${rs(AB.cap.Bhavesh)} and ${rs(AB.cap.Charu)}. Bhavesh also lent the firm ${rs(AB.loan)} on 1 April 2025; the deed says nothing about interest on loans. The net profit for 2025-26, **before** any interest on this loan, was ${rs(AB.before)}. The deed provides: interest on capital at 8% per annum; interest on drawings at 10% per annum; a salary of ${rs(AB.salary.Bhavesh)} a year to Bhavesh; a commission to Charu of 10% of the net profit after charging such commission; and a transfer of ${rs(AB.reserve)} to general reserve. Aditi withdrew ${rs(6000)} at the beginning of every month and Bhavesh ${rs(15000)} at the end of every quarter. Prepare the Profit and Loss Appropriation Account.`,
  model: [
    '**Working notes**',
    `1. Interest on Bhavesh's loan at 6% (the Act's rate, as the deed is silent) = ${rs(ABloanInt)}, a charge: net profit = ${rs(AB.before)} − ${rs(ABloanInt)} = ${rs(ABprofit)}.`,
    `2. Charu's commission = ${rs(ABprofit)} × 10/110 = ${rs(ABcomm.Charu)}.`,
    `3. Interest on drawings: Aditi ${rs(ABdA.total)} × 10/100 × 6.5/12 = ${rs(ABdA.interest)}; Bhavesh ${rs(ABdB.total)} × 10/100 × 4.5/12 = ${rs(ABdB.interest)}.`,
    `4. Interest on capital at 8%: ${AB.names.map((n) => `${n} ${rs(ABioc[n])}`).join(', ')}.`,
    '**Profit and Loss Appropriation Account** for the year ended 31 March 2026',
    ABapp.md,
    `Divisible profit ${rs(ABapp.divisible)} shared 5:3:2.`,
  ].join('\n\n'),
  sol: 'Charge the loan interest first (it is not an appropriation), then work out the commission on the resulting profit, then the appropriations.',
  scheme: [['Loan interest at 6% charged before appropriation', 1], ['Commission after charging', 1], ['Interest on drawings by average period', 1], ['Interest on capital, salary and reserve', 1], ['Divisible profit', 1], ['Division 5:3:2', 1]],
}));

// ================================================================ t04 Guarantee of profit
const GF = { min: 50000, actual: 38000 };
QQ('m_guar_firm', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: `An imagined firm guarantees partner Isha a minimum profit of ${rs(GF.min)} a year. This year her share of profit works out to ${rs(GF.actual)}. The deficiency of ${rs(GF.min - GF.actual)} is borne by`,
  opts: ['the other partners in their mutual profit-sharing ratio', 'Isha herself, out of next year\'s profit', 'the other partners equally, whatever their ratio', 'the general reserve of the firm'],
  sol: 'A guarantee given by the firm is met by all the other partners, who share the deficiency in the ratio in which they share profits between themselves.',
}));
const AMB = { ratio: { Amol: 2, Bina: 2, Cyrus: 1 }, profit: 300000, min: 70000 };
const AMBsh = divide(AMB.profit, AMB.ratio, 'm_guar_partner');
const AMBdef = AMB.min - AMBsh.Cyrus;
const AMBamol = same(AMBsh.Amol - AMBdef, 110000, 'm_guar_partner Amol');
QQ('m_guar_partner', mcq({
  t: 4, d: 2, c: 'application',
  stem: `Amol, Bina and Cyrus share profits 2:2:1. Amol **alone** has guaranteed Cyrus a minimum profit of ${rs(AMB.min)}. The firm's profit for the year is ${rs(AMB.profit)}. Amol's final share of profit is`,
  opts: [rs(AMBamol), rs(AMBsh.Amol - AMBdef / 2), rs(AMBsh.Amol), rs(AMBsh.Amol - AMB.min)],
  sol: `Cyrus's share is ${rs(AMBsh.Cyrus)}, so the deficiency is ${rs(AMBdef)}; Amol bears all of it: ${rs(AMBsh.Amol)} − ${rs(AMBdef)}.`,
}));
const LMN = { ratio: { Lalit: 3, Mira: 2, Nikhil: 1 }, profit: 216000, min: 45000 };
const LMNsh = divide(LMN.profit, LMN.ratio, 'n_guar');
const LMNdef = LMN.min - LMNsh.Nikhil;
const LMNlal = divide(LMNdef, { Lalit: 3, Mira: 2 }, 'n_guar deficiency').Lalit;
same(LMNlal, 5400, 'n_guar');
QQ('n_guar', numQ({
  t: 4, d: 3, c: 'application', value: LMNlal, unit: '₹',
  stem: `Lalit, Mira and Nikhil share profits 3:2:1 in an imagined tea stall chain in Darjeeling. The **firm** has guaranteed Nikhil a minimum profit of ${rs(LMN.min)}. The profit for the year is ${rs(LMN.profit)}. How much of Nikhil's deficiency is borne by Lalit (in ₹)?`,
  sol: `Nikhil's share = ${inr(LMN.profit)} × 1/6 = ${inr(LMNsh.Nikhil)}; deficiency = ${inr(LMN.min)} − ${inr(LMNsh.Nikhil)} = ${inr(LMNdef)}. Lalit and Mira bear it 3:2, so Lalit bears ${inr(LMNdef)} × 3/5 = ${rs(LMNlal)}.`,
}));
QQ('ar_guar', ar({
  t: 4, d: 2, c: 'understanding', key: 'd',
  a: 'A guarantee of minimum profit to a partner increases the total profit of the firm.',
  r: 'A guarantee only changes the way the firm\'s profit is divided among the partners.',
  sol: 'A is false: the firm\'s profit stays the same. R is true: the guaranteed partner\'s shortfall is simply taken from the shares of the guarantors.',
}));
QQ('tf_guar_to_firm', tf({
  t: 4, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? When a partner guarantees that the **firm** will earn at least a stated profit, any shortfall in the firm\'s profit is made good by that partner alone.',
  sol: 'The partner who gives a guarantee to the firm brings in the shortfall; the made-up profit is then shared by all partners in the usual ratio.',
}));
const IJK = { names: ['Ira', 'Jai', 'Kabir'], ratio: { Ira: 3, Jai: 2, Kabir: 1 }, profit: 210000, min: 50000 };
const IJKsh = divide(IJK.profit, IJK.ratio, 's3_guar_ratio');
const IJKdef = IJK.min - IJKsh.Kabir;
const IJKbear = divide(IJKdef, { Ira: 1, Jai: 1 }, 's3_guar_ratio deficiency');
const IJKfinal = { Ira: IJKsh.Ira - IJKbear.Ira, Jai: IJKsh.Jai - IJKbear.Jai, Kabir: IJK.min };
same(sum(Object.values(IJKfinal)), IJK.profit, 's3_guar_ratio total'); same(IJKfinal.Ira, 97500, 'Ira final');
QQ('s3_guar_ratio', short({
  t: 4, d: 3, c: 'application', marks: 3,
  stem: `Ira, Jai and Kabir are partners in an imagined handloom firm in Chanderi, sharing profits 3:2:1. Kabir has been guaranteed a minimum profit of ${rs(IJK.min)}, the guarantee being given by Ira and Jai **equally**. The profit for 2025-26 is ${rs(IJK.profit)}. Show the distribution of profit.`,
  model: [
    mdTable(['Particulars', 'Ira (₹)', 'Jai (₹)', 'Kabir (₹)'], [
      ['Share of profit 3:2:1', inr(IJKsh.Ira), inr(IJKsh.Jai), inr(IJKsh.Kabir)],
      ['Deficiency of Kabir borne equally', `− ${inr(IJKbear.Ira)}`, `− ${inr(IJKbear.Jai)}`, `+ ${inr(IJKdef)}`],
      ['**Final share**', `**${inr(IJKfinal.Ira)}**`, `**${inr(IJKfinal.Jai)}**`, `**${inr(IJKfinal.Kabir)}**`],
    ]),
    `Kabir's share ${rs(IJKsh.Kabir)} falls short of ${rs(IJK.min)} by ${rs(IJKdef)}, which Ira and Jai bear equally (not 3:2, because the guarantee says equally). Total distributed ${rs(IJK.profit)}.`,
  ].join('\n\n'),
  sol: 'Share the profit in the normal ratio, then move the shortfall from the guarantors in the ratio stated in the guarantee.',
  scheme: [['Shares in 3:2:1', 1], ['Deficiency computed', 1], ['Deficiency borne equally and final shares', 1]],
}));
const MNP = { names: ['Mohan', 'Nalini', 'Prerna'], ratio: { Mohan: 3, Nalini: 2, Prerna: 1 }, cap: { Mohan: 300000, Nalini: 200000, Prerna: 100000 }, profit: 300000, min: 60000 };
const MNPioc = Object.fromEntries(MNP.names.map((n) => [n, interest(MNP.cap[n], 5)]));
const MNPdivisible = MNP.profit - sum(Object.values(MNPioc));
const MNPsh = divide(MNPdivisible, MNP.ratio, 'l4_guar_firm');
const MNPdef = MNP.min - MNPsh.Prerna;
const MNPbear = divide(MNPdef, { Mohan: 3, Nalini: 2 }, 'l4_guar_firm deficiency');
const MNPfinal = { Mohan: MNPsh.Mohan - MNPbear.Mohan, Nalini: MNPsh.Nalini - MNPbear.Nalini, Prerna: MNP.min };
const MNPapp = appropriation({
  names: MNP.names, ratio: MNP.ratio, profit: MNP.profit, ioc: MNPioc, shares: MNPfinal,
  shareLabel: (n) => (n === 'Prerna' ? `To Prerna's Capital A/c (${inr(MNPsh.Prerna)} + ${inr(MNPdef)})` : `To ${n}'s Capital A/c (${inr(MNPsh[n])} − ${inr(MNPbear[n])})`),
});
same(MNPdivisible, 270000, 'MNP divisible'); same(MNPfinal.Mohan, 126000, 'Mohan final'); same(MNPfinal.Nalini, 84000, 'Nalini final');
QQ('l4_guar_firm', long({
  t: 4, d: 3, c: 'application', marks: 4,
  stem: `Mohan, Nalini and Prerna share profits 3:2:1 in an imagined spice-export firm in Kochi. Their capitals are ${rs(MNP.cap.Mohan)}, ${rs(MNP.cap.Nalini)} and ${rs(MNP.cap.Prerna)}, and interest on capital is allowed at 5% per annum. The **firm** has guaranteed Prerna a minimum share of profit of ${rs(MNP.min)}, apart from interest on capital. The net profit for 2025-26 was ${rs(MNP.profit)}. Prepare the Profit and Loss Appropriation Account.`,
  model: [
    `Interest on capital: ${MNP.names.map((n) => `${n} ${rs(MNPioc[n])}`).join(', ')}. Divisible profit = ${rs(MNP.profit)} − ${rs(sum(Object.values(MNPioc)))} = ${rs(MNPdivisible)}.`,
    `Prerna's share ${rs(MNPdivisible)} × 1/6 = ${rs(MNPsh.Prerna)}, short of ${rs(MNP.min)} by ${rs(MNPdef)}. Mohan and Nalini bear it 3:2: ${rs(MNPbear.Mohan)} and ${rs(MNPbear.Nalini)}.`,
    '**Profit and Loss Appropriation Account** for the year ended 31 March 2026',
    MNPapp.md,
  ].join('\n\n'),
  sol: 'Allow interest first, divide the rest 3:2:1, then cover the shortfall from the other two partners in their own ratio.',
  scheme: [['Interest on capital and divisible profit', 1], ['Shares 3:2:1', 1], ['Deficiency borne 3:2', 1], ['Account completed with final shares', 1]],
}));
const ABC = { names: ['Arnav', 'Bhoomi', 'Chetan'], ratio: { Arnav: 5, Bhoomi: 3, Chetan: 2 }, actual: 260000, firmMin: 300000, min: 70000 };
const ABCshort = ABC.firmMin - ABC.actual;
const ABCdivisible = ABC.actual + ABCshort;
const ABCsh = divide(ABCdivisible, ABC.ratio, 'l6_guar_combo');
const ABCdef = ABC.min - ABCsh.Chetan;
check(ABCdef > 0, 'l6_guar_combo: Chetan must fall short');
const ABCfinal = { Arnav: ABCsh.Arnav - ABCdef, Bhoomi: ABCsh.Bhoomi, Chetan: ABC.min };
const ABCapp = appropriation({
  names: ABC.names, ratio: ABC.ratio, profit: ABC.actual, extraCr: [['By Bhoomi\'s Capital A/c (shortfall made good)', ABCshort]], shares: ABCfinal,
  shareLabel: (n) => (n === 'Arnav' ? `To Arnav's Capital A/c (${inr(ABCsh.Arnav)} − ${inr(ABCdef)})` : n === 'Chetan' ? `To Chetan's Capital A/c (${inr(ABCsh.Chetan)} + ${inr(ABCdef)})` : `To Bhoomi's Capital A/c`),
});
const ABCje = journal([
  { dr: [[acct('Bhoomi'), ABCshort]], cr: [['Profit and Loss Appropriation A/c', ABCshort]], note: 'Being shortfall in the firm\'s guaranteed profit brought in by Bhoomi' },
  { dr: [['Profit and Loss Appropriation A/c', ABCdivisible]], cr: ABC.names.map((n) => [acct(n), ABCfinal[n]]), note: 'Being profit distributed 5:3:2, with Chetan\'s deficiency borne by Arnav' },
]);
same(ABCshort, 40000, 'ABC shortfall'); same(ABCdef, 10000, 'Chetan deficiency'); same(ABCfinal.Arnav, 140000, 'Arnav final');
QQ('l6_guar_combo', long({
  t: 4, d: 4, c: 'analysis', marks: 6,
  stem: `Arnav, Bhoomi and Chetan share profits 5:3:2 in an imagined architecture practice in Chandigarh. Two guarantees exist: (1) Bhoomi, who brings in most of the clients, has guaranteed that the **firm** will earn a profit of at least ${rs(ABC.firmMin)} a year, any shortfall to be made good by her; (2) Arnav **alone** has guaranteed Chetan a minimum profit of ${rs(ABC.min)}. The actual profit for 2025-26 was ${rs(ABC.actual)}. Pass the journal entries and prepare the Profit and Loss Appropriation Account.`,
  model: [
    `Bhoomi makes good the firm's shortfall: ${rs(ABC.firmMin)} − ${rs(ABC.actual)} = ${rs(ABCshort)}, so profit available = ${rs(ABCdivisible)}. Shares 5:3:2: ${ABC.names.map((n) => `${n} ${rs(ABCsh[n])}`).join(', ')}. Chetan is short of ${rs(ABC.min)} by ${rs(ABCdef)}, which Arnav alone bears.`,
    '**Journal**',
    ABCje.md,
    '**Profit and Loss Appropriation Account** for the year ended 31 March 2026',
    ABCapp.md,
  ].join('\n\n'),
  sol: 'Treat the two guarantees in order: the firm\'s guarantee first changes the profit to be divided; the partner\'s guarantee then changes only the shares.',
  scheme: [['Shortfall of the firm brought in by Bhoomi (entry)', 1.5], [`Chetan's deficiency of ${rs(ABCdef)} borne by Arnav alone`, 1.5], ['Distribution entry with final shares', 1], ['Appropriation account with final shares', 2]],
}));

// ================================================================ t05 Past adjustments
QQ('m_past_entry', mcq({
  t: 5, d: 2, c: 'understanding',
  stem: 'After the final accounts of an imagined firm for 2025-26 were closed, it was found that interest on capital had been omitted. The usual way to correct this is to',
  opts: ['pass one adjustment entry through the partners\' capital or current accounts', 'reopen and redraw the Profit and Loss Appropriation Account for 2025-26', 'debit the omitted interest to the Profit and Loss Account of 2026-27', 'leave it uncorrected, because the year is closed'],
  sol: 'Closed accounts are not reopened; the net effect of the omission on each partner is put right by a single entry between the partners\' accounts.',
}));
const KM = { names: ['Kriti', 'Manish'], cap: { Kriti: 500000, Manish: 300000 }, rate: 6 };
const KMioc = { Kriti: interest(KM.cap.Kriti, KM.rate), Manish: interest(KM.cap.Manish, KM.rate) };
const KMrev = divide(sum(Object.values(KMioc)), { Kriti: 1, Manish: 1 }, 'n_past reversal');
const KMadj = pastAdjustment({ names: KM.names, lines: [['Interest on capital', KMioc], ['Profit reversed', { Kriti: -KMrev.Kriti, Manish: -KMrev.Manish }]] });
same(KMadj.net.Kriti, 6000, 'n_past');
QQ('n_past', numQ({
  t: 5, d: 2, c: 'application', value: KMadj.net.Kriti, unit: '₹',
  stem: `Kriti and Manish share profits equally. After the accounts were closed, they found that interest on capital at ${KM.rate}% per annum had been omitted. Their capitals were ${rs(KM.cap.Kriti)} and ${rs(KM.cap.Manish)}. By how much will Kriti's capital account be **credited** in the adjustment entry (in ₹)?`,
  sol: `Interest omitted: Kriti ${inr(KMioc.Kriti)}, Manish ${inr(KMioc.Manish)}, total ${inr(KMioc.Kriti + KMioc.Manish)}, which must come back out of the profit already shared equally (${inr(KMrev.Kriti)} each). Kriti gains ${inr(KMioc.Kriti)} − ${inr(KMrev.Kriti)} = ${rs(KMadj.net.Kriti)}.`,
}));
QQ('ar_past', ar({
  t: 5, d: 3, c: 'analysis', key: 'a',
  a: 'In a past adjustment entry, the total debited to some partners equals the total credited to the others.',
  r: 'Correcting an omission changes only how the firm\'s profit is shared among the partners, not the amount of the profit.',
  sol: 'Both are true and R explains A: the profit itself is unchanged, so what one partner gains another must lose, and the net effect is zero.',
}));
const DE = { names: ['Dhruv', 'Elina'], ratio: { Dhruv: 3, Elina: 2 }, profit: 150000, salary: 12000 };
const DEwrong = divide(DE.profit, { Dhruv: 1, Elina: 1 }, 's3_past_ratio wrong');
const DEright = divide(DE.profit - DE.salary, DE.ratio, 's3_past_ratio right');
const DEadj = pastAdjustment({
  names: DE.names, acct: 'Current', note: 'Being salary omitted and profit wrongly shared, now adjusted',
  lines: [['Salary to Elina, omitted (to be credited)', { Elina: DE.salary }], ['Correct share of profit 3:2 (to be credited)', DEright], ['Profit credited equally (to be reversed)', { Dhruv: -DEwrong.Dhruv, Elina: -DEwrong.Elina }]],
});
same(DEadj.net.Dhruv, 7800, 's3_past_ratio Dhruv');
QQ('s3_past_ratio', short({
  t: 5, d: 3, c: 'analysis', marks: 3,
  stem: `Dhruv and Elina run an imagined furniture showroom in Nagpur and share profits 3:2; their capitals are fixed. The profit of ${rs(DE.profit)} for 2025-26 was credited to them **equally**, and Elina's yearly salary of ${rs(DE.salary)} was not provided at all. Pass the adjustment entry, showing your working in a table.`,
  model: [
    `Correct division: salary ${rs(DE.salary)} to Elina, and the balance ${rs(DE.profit - DE.salary)} in 3:2 = ${rs(DEright.Dhruv)} and ${rs(DEright.Elina)}.`,
    DEadj.md,
    '**Adjustment entry**',
    DEadj.entry.md,
    'Elina loses even though her salary was omitted, because the equal split had given her more than her 3:2 share.',
  ].join('\n\n'),
  sol: 'Compare what each partner should have received with what was credited; one entry moves the difference.',
  scheme: [['Correct shares including salary', 1], ['Net effect table', 1], ['Adjustment entry', 1]],
}));
const RSh = { names: ['Raghav', 'Shalini'], ratio: { Raghav: 3, Shalini: 2 }, cap: { Raghav: 400000, Shalini: 200000 }, rate: 9 };
const RShioc = { Raghav: interest(RSh.cap.Raghav, RSh.rate), Shalini: interest(RSh.cap.Shalini, RSh.rate) };
const RShrev = divide(sum(Object.values(RShioc)), RSh.ratio, 'l4_past_ioc reversal');
const RShadj = pastAdjustment({
  names: RSh.names, note: 'Being interest on capital omitted, now adjusted',
  lines: [['Interest on capital at 9%, omitted (to be credited)', RShioc], [`Profit ${inr(sum(Object.values(RShioc)))} to be taken back in 3:2 (to be debited)`, { Raghav: -RShrev.Raghav, Shalini: -RShrev.Shalini }]],
});
same(RShadj.net.Raghav, 3600, 'l4_past_ioc Raghav');
QQ('l4_past_ioc', long({
  t: 5, d: 3, c: 'application', marks: 4,
  stem: `Raghav and Shalini share profits 3:2 in an imagined optical shop in Dehradun. Their capitals on 1 April 2025 were ${rs(RSh.cap.Raghav)} and ${rs(RSh.cap.Shalini)}. After the accounts for 2025-26 were closed, it was found that interest on capital at ${RSh.rate}% per annum had not been allowed. Pass the necessary adjustment entry, with a table showing its working.`,
  model: [
    `Interest omitted: Raghav ${rs(RShioc.Raghav)}, Shalini ${rs(RShioc.Shalini)}, total ${rs(sum(Object.values(RShioc)))}. Had it been allowed, the profit shared 3:2 would have been smaller by this amount.`,
    RShadj.md,
    '**Adjustment entry**',
    RShadj.entry.md,
  ].join('\n\n'),
  sol: 'Credit the interest that was due, debit the same total back in the profit-sharing ratio, and pass one entry for the net effect.',
  scheme: [['Interest on capital for each partner', 1], ['Reversal of profit in 3:2', 1], ['Net effect', 1], ['Adjustment entry', 1]],
}));
const ABCh = { names: ['Asha', 'Bilal', 'Chitra'], ratio: { Asha: 3, Bilal: 2, Chitra: 1 }, cap: { Asha: 500000, Bilal: 300000, Chitra: 200000 }, drawings: { Asha: 20000, Bilal: 12000, Chitra: 8000 }, profit: 240000, salaryPm: 2000 };
const AChioc = Object.fromEntries(ABCh.names.map((n) => [n, interest(ABCh.cap[n], 10)]));
const AChiod = Object.fromEntries(ABCh.names.map((n) => [n, interest(ABCh.drawings[n], 5, 6)]));
const AChsal = ABCh.salaryPm * 12;
const AChdiv = ABCh.profit - sum(Object.values(AChioc)) + sum(Object.values(AChiod)) - AChsal;
const AChright = divide(AChdiv, ABCh.ratio, 'l6_past_multi right');
const AChwrong = divide(ABCh.profit, { Asha: 1, Bilal: 1, Chitra: 1 }, 'l6_past_multi wrong');
const AChadj = pastAdjustment({
  names: ABCh.names, acct: 'Current', note: 'Being omissions and wrong distribution of profit for 2025-26 adjusted',
  lines: [
    ['Interest on capital at 10% (to be credited)', AChioc],
    ['Interest on drawings at 5% for 6 months (to be debited)', Object.fromEntries(ABCh.names.map((n) => [n, -AChiod[n]]))],
    ['Salary to Chitra (to be credited)', { Chitra: AChsal }],
    [`Correct share of profit ${inr(AChdiv)} in 3:2:1 (to be credited)`, AChright],
    ['Profit credited equally (to be reversed)', Object.fromEntries(ABCh.names.map((n) => [n, -AChwrong[n]]))],
  ],
});
same(AChdiv, 117000, 'l6_past_multi divisible'); same(AChadj.net.Asha, 28000, 'Asha net'); same(AChadj.net.Bilal, -11300, 'Bilal net'); same(AChadj.net.Chitra, -16700, 'Chitra net');
QQ('l6_past_multi', long({
  t: 5, d: 5, c: 'analysis', marks: 6,
  stem: `Asha, Bilal and Chitra are partners in an imagined pharmacy chain in Guwahati with **fixed** capitals of ${rs(ABCh.cap.Asha)}, ${rs(ABCh.cap.Bilal)} and ${rs(ABCh.cap.Chitra)}. Their deed provides: profits shared 3:2:1; interest on capital at 10% per annum; interest on drawings at 5% per annum; a salary of ${rs(ABCh.salaryPm)} per month to Chitra. The profit of ${rs(ABCh.profit)} for 2025-26 was credited to the partners **equally**, ignoring every term of the deed. Drawings during the year were ${rs(ABCh.drawings.Asha)}, ${rs(ABCh.drawings.Bilal)} and ${rs(ABCh.drawings.Chitra)} (dates not known). Pass a single adjustment entry, showing your working in a table.`,
  model: [
    `Working: interest on drawings for an average of 6 months (dates unknown): ${ABCh.names.map((n) => `${n} ${rs(AChiod[n])}`).join(', ')}. Correct divisible profit = ${rs(ABCh.profit)} − ${rs(sum(Object.values(AChioc)))} interest on capital + ${rs(sum(Object.values(AChiod)))} interest on drawings − ${rs(AChsal)} salary = ${rs(AChdiv)}.`,
    AChadj.md,
    '**Adjustment entry**',
    AChadj.entry.md,
  ].join('\n\n'),
  sol: 'Build a table of everything each partner should have been credited or debited, deduct what was credited, and pass one entry for the net amounts; the net column must total zero.',
  scheme: [['Interest on capital and on drawings', 1.5], ['Salary and correct divisible profit', 1], ['Correct shares 3:2:1 and reversal of equal shares', 1.5], ['Net effect (totals zero)', 1], ['Single adjustment entry', 1]],
}));

// ================================================================ t06 Goodwill
QQ('m_as26', mcq({
  t: 6, d: 1, c: 'recall',
  stem: 'As per Accounting Standard 26, goodwill is recorded in the books of a firm only when',
  opts: ['consideration in money or money\'s worth has been paid for it', 'all the partners agree on its value', 'the firm has earned profits for at least three years', 'a registered valuer certifies its value'],
  sol: 'Only purchased goodwill is recorded; goodwill generated inside the business is never brought into the books.',
}));
QQ('m_gw_factor', mcq({
  t: 6, d: 2, c: 'understanding',
  stem: 'Which of the following would most likely **reduce** the goodwill of an imagined sweet shop?',
  opts: ['Moving the shop from a busy market to a quiet back lane', 'A long-term contract to supply sweets to a large hotel', 'An experienced and well-liked head cook', 'A popular recipe that only this shop can make'],
  sol: 'Location affects how many customers come in; a move to a quiet lane cuts expected future profits. The other three would raise goodwill.',
}));
QQ('m_gw_nature', mcq({
  t: 6, d: 2, c: 'understanding',
  stem: 'The goodwill of a business is',
  opts: ['an intangible asset that can be sold only along with the business', 'a fictitious asset, like a debit balance of the Profit and Loss Account', 'a current asset that can be sold separately at any time', 'a liability of the firm towards its partners'],
  sol: 'Goodwill has real value (buyers pay for it) but no physical form, and it cannot be separated from the business.',
}));
const NPm = { ce: 750000, nrr: 12 };
const NPmv = same(normalProfit(NPm.ce, NPm.nrr), 90000, 'm_normal_profit');
QQ('m_normal_profit', mcq({
  t: 6, d: 2, c: 'application',
  stem: `An imagined firm employs capital of ${rs(NPm.ce)}. The normal rate of return in its industry is ${NPm.nrr}%. Its normal profit is`,
  opts: [rs(NPmv), rs(NPm.ce / 10), rs(NPm.ce / 12), rs(NPm.ce * 12)],
  sol: `Normal profit = capital employed × normal rate ÷ 100 = ${rs(NPm.ce)} × 12/100.`,
}));
const WA = weightedAverage([[120000, 1], [150000, 2], [180000, 3]]);
same(WA.value, 160000, 'm_weighted');
QQ('m_weighted', mcq({
  t: 6, d: 3, c: 'application',
  stem: `An imagined firm's profits were ${rs(120000)} in 2023-24, ${rs(150000)} in 2024-25 and ${rs(180000)} in 2025-26. Using weights 1, 2 and 3 respectively, the weighted average profit is`,
  opts: [rs(WA.value), rs(average([120000, 150000, 180000])), rs(180000), rs(WA.total)],
  sol: `Products: ${inr(WA.products[0])} + ${inr(WA.products[1])} + ${inr(WA.products[2])} = ${inr(WA.total)}; divided by the sum of weights 6.`,
}));
const GA = { profits: [100000, 130000, 160000], years: 2 };
const GAavg = average(GA.profits);
const GAgw = same(GAavg * GA.years, 260000, 'n_gw_avg');
QQ('n_gw_avg', numQ({
  t: 6, d: 2, c: 'application', value: GAgw, unit: '₹',
  stem: `An imagined bakery in Ooty earned profits of ${GA.profits.map(rs).join(', ')} in the last three years. Calculate its goodwill at **two years' purchase** of the average profit (in ₹).`,
  sol: `Average profit = ${GA.profits.map(inr).join(' + ')} ÷ 3 = ${inr(GAavg)}. Goodwill = ${inr(GAavg)} × 2 = ${rs(GAgw)}.`,
}));
const GS = { ce: 800000, nrr: 10, avg: 110000, years: 3 };
const GSnormal = normalProfit(GS.ce, GS.nrr);
const GSgw = same((GS.avg - GSnormal) * GS.years, 90000, 'n_gw_super');
QQ('n_gw_super', numQ({
  t: 6, d: 2, c: 'application', value: GSgw, unit: '₹',
  stem: `An imagined courier firm employs capital of ${rs(GS.ce)}; the normal rate of return is ${GS.nrr}%. Its average profit is ${rs(GS.avg)}. Find goodwill at **three years' purchase of super profit** (in ₹).`,
  sol: `Normal profit = ${inr(GS.ce)} × 10/100 = ${inr(GSnormal)}; super profit = ${inr(GS.avg)} − ${inr(GSnormal)} = ${inr(GS.avg - GSnormal)}; goodwill = ${inr(GS.avg - GSnormal)} × 3 = ${rs(GSgw)}.`,
}));
const GC = { sp: 24000, nrr: 12 };
const GCgw = same(capitalise(GC.sp, GC.nrr), 200000, 'n_gw_cap');
QQ('n_gw_cap', numQ({
  t: 6, d: 3, c: 'application', value: GCgw, unit: '₹',
  stem: `The super profit of an imagined software firm is ${rs(GC.sp)} a year and the normal rate of return is ${GC.nrr}%. Value its goodwill by **capitalising the super profit** (in ₹).`,
  sol: `Goodwill = super profit × 100 ÷ normal rate = ${inr(GC.sp)} × 100/12 = ${rs(GCgw)}.`,
}));
QQ('fb_capemp', fb({
  t: 6, d: 2, c: 'understanding',
  stem: 'For valuing goodwill, capital employed = total assets (excluding goodwill and fictitious assets) − ___.',
  acc: [['outside liabilities', 'external liabilities', 'outside liability']],
  sol: 'Capital employed is the total of real assets less outside liabilities such as creditors, bills payable and loans.',
}));
QQ('tf_cap_equal', tf({
  t: 6, d: 3, c: 'analysis', ans: true,
  stem: 'True or false? Given the same average profit, capital employed and normal rate of return, capitalising the average profit and capitalising the super profit give the **same** value of goodwill.',
  sol: 'Super profit × 100 ÷ rate = (average profit − capital employed × rate ÷ 100) × 100 ÷ rate = average profit × 100 ÷ rate − capital employed, which is exactly the other method\'s result.',
}));
QQ('mt_gw_methods', match({
  t: 6, d: 2, c: 'understanding', marks: 2,
  stem: 'Match each method of valuing goodwill with its formula.',
  pairs: [
    ['Average profit method', 'Average profit × number of years\' purchase'],
    ['Super profit method', '(Average profit − normal profit) × number of years\' purchase'],
    ['Capitalisation of average profit', 'Average profit × 100 ÷ normal rate − capital employed'],
    ['Capitalisation of super profit', 'Super profit × 100 ÷ normal rate of return'],
  ],
  sol: 'The first two multiply by years\' purchase; the capitalisation methods divide by the normal rate of return.',
}));
QQ('ar_gw', ar({
  t: 6, d: 2, c: 'understanding', key: 'c',
  a: 'Goodwill is an intangible asset.',
  r: 'Goodwill is a fictitious asset, like discount on the issue of debentures.',
  sol: 'A is true. R is false: a fictitious asset has no realisable value, whereas goodwill can be sold with the business and has a real value.',
}));
QQ('ar_abnormal', ar({
  t: 6, d: 3, c: 'analysis', key: 'b',
  a: 'Abnormal losses are added back to a year\'s profit before the average profit is calculated for valuing goodwill.',
  r: 'As per Accounting Standard 26, self-generated goodwill is not recorded in the books.',
  sol: 'Both are true. A is about using normal, repeatable profits; R is about recording goodwill in the books, so it does not explain A.',
}));
QQ('s3_factors', short({
  t: 6, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain any **three** factors that affect the value of a firm\'s goodwill, with one example each.',
  model: [
    '1. **Location:** a shop on a busy road draws more customers and earns more, so its goodwill is higher; a chemist next to a hospital is an example.',
    '2. **Efficiency of management:** able managers keep costs low and profits high, for example a well-run restaurant with little waste.',
    '3. **Special advantages:** a patent, a licence or a long supply contract, such as an exclusive contract with a railway canteen, raises expected profits.',
  ].join('\n'),
  sol: 'Any three factors that change expected future profits, each with an example.',
  scheme: [['Factor 1 with example', 1], ['Factor 2 with example', 1], ['Factor 3 with example', 1]],
}));
const GW4 = { profits: [90000, 110000, 120000, 150000], years: 2 };
const GW4w = weightedAverage(GW4.profits.map((p, i) => [p, i + 1]));
const GW4gw = same(GW4w.value * GW4.years, 254000, 's3_gw_weighted');
QQ('s3_gw_weighted', short({
  t: 6, d: 3, c: 'application', marks: 3,
  stem: `An imagined bicycle-parts firm in Ludhiana earned profits of ${GW4.profits.map(rs).join(', ')} in 2022-23, 2023-24, 2024-25 and 2025-26. Profits are rising steadily, so the partners agree to value goodwill at **two years' purchase of the weighted average profit**, using weights 1, 2, 3 and 4. Calculate the goodwill.`,
  model: [
    mdTable(['Year', 'Profit (₹)', 'Weight', 'Product (₹)'], [
      ...GW4.profits.map((p, i) => [`${2022 + i}-${23 + i}`, inr(p), String(i + 1), inr(GW4w.products[i])]),
      ['**Total**', '', `**${GW4w.weights}**`, `**${inr(GW4w.total)}**`],
    ]),
    `Weighted average profit = ${rs(GW4w.total)} ÷ ${GW4w.weights} = ${rs(GW4w.value)}.`,
    `Goodwill = ${rs(GW4w.value)} × 2 = **${rs(GW4gw)}**.`,
  ].join('\n\n'),
  sol: 'Weights give recent years more say when profits show a trend.',
  scheme: [['Products of profit and weight', 1], ['Weighted average profit', 1], ['Goodwill', 1]],
}));
const GAA = { profits: [120000, 150000, 90000, 160000, 170000], gain: 30000, loss: 40000, pay: 12000, years: 2.5 };
const GAAnorm = GAA.profits.map((p, i) => (i === 1 ? p - GAA.gain : i === 2 ? p + GAA.loss : p));
const GAAavg = average(GAAnorm);
const GAAadj = GAAavg - GAA.pay;
const GAAgw = same(GAAadj * GAA.years, 320000, 'l4_gw_avg_adjust');
QQ('l4_gw_avg_adjust', long({
  t: 6, d: 4, c: 'application', marks: 4,
  stem: `The partners of an imagined tailoring firm in Lucknow agree to value goodwill at **two and a half years' purchase** of the average profit of the last five years. Profits were: 2021-22 ${rs(GAA.profits[0])}; 2022-23 ${rs(GAA.profits[1])}, which included a one-time gain of ${rs(GAA.gain)} on selling an old delivery van; 2023-24 ${rs(GAA.profits[2])}, after a loss of ${rs(GAA.loss)} from a fire in the store; 2024-25 ${rs(GAA.profits[3])}; 2025-26 ${rs(GAA.profits[4])}. One partner manages the firm without a salary; a fair salary for this work would be ${rs(GAA.pay)} a year. Calculate the goodwill.`,
  model: [
    mdTable(['Year', 'Profit (₹)', 'Adjustment', 'Normal profit (₹)'], [
      ['2021-22', inr(GAA.profits[0]), '—', inr(GAAnorm[0])],
      ['2022-23', inr(GAA.profits[1]), `less one-time gain ${inr(GAA.gain)}`, inr(GAAnorm[1])],
      ['2023-24', inr(GAA.profits[2]), `add back fire loss ${inr(GAA.loss)}`, inr(GAAnorm[2])],
      ['2024-25', inr(GAA.profits[3]), '—', inr(GAAnorm[3])],
      ['2025-26', inr(GAA.profits[4]), '—', inr(GAAnorm[4])],
      ['**Total**', '', '', `**${inr(GAAnorm.reduce((a, x) => a + x, 0))}**`],
    ]),
    `Average profit = ${rs(GAAnorm.reduce((a, x) => a + x, 0))} ÷ 5 = ${rs(GAAavg)}. Less fair salary of the managing partner ${rs(GAA.pay)}: adjusted average profit = ${rs(GAAadj)}.`,
    `Goodwill = ${rs(GAAadj)} × 2.5 = **${rs(GAAgw)}**.`,
  ].join('\n\n'),
  sol: 'Goodwill rests on profits expected to recur, so remove one-time items and charge a fair reward for the partner\'s work before averaging.',
  scheme: [['Non-recurring gain deducted and abnormal loss added back', 1.5], ['Average profit', 1], ['Fair salary deducted', 0.5], ['Goodwill at 2.5 years\' purchase', 1]],
}));
const GSu = { assets: 940000, gw: 40000, creditors: 120000, loan: 180000, nrr: 12, profits: [95000, 102000, 109000], years: 3 };
const GSuCE = same(GSu.assets - GSu.gw - GSu.creditors - GSu.loan, 600000, 'l4_gw_super CE');
const GSuAvg = average(GSu.profits);
const GSuNormal = normalProfit(GSuCE, GSu.nrr);
const GSuGw = same((GSuAvg - GSuNormal) * GSu.years, 90000, 'l4_gw_super goodwill');
QQ('l4_gw_super', long({
  t: 6, d: 3, c: 'application', marks: 4,
  stem: `The balance sheet of an imagined coaching centre in Kota shows total assets of ${rs(GSu.assets)}, including goodwill of ${rs(GSu.gw)}, and outside liabilities of creditors ${rs(GSu.creditors)} and a bank loan of ${rs(GSu.loan)}. Its profits for the last three years were ${GSu.profits.map(rs).join(', ')}. The normal rate of return is ${GSu.nrr}%. Value its goodwill at **three years' purchase of super profit**.`,
  model: [
    `1. Capital employed = (${rs(GSu.assets)} − goodwill ${rs(GSu.gw)}) − (${rs(GSu.creditors)} + ${rs(GSu.loan)}) = **${rs(GSuCE)}**.`,
    `2. Normal profit = ${rs(GSuCE)} × 12/100 = ${rs(GSuNormal)}.`,
    `3. Average profit = (${GSu.profits.map(inr).join(' + ')}) ÷ 3 = ${rs(GSuAvg)}.`,
    `4. Super profit = ${rs(GSuAvg)} − ${rs(GSuNormal)} = ${rs(GSuAvg - GSuNormal)}.`,
    `5. Goodwill = ${rs(GSuAvg - GSuNormal)} × 3 = **${rs(GSuGw)}**.`,
  ].join('\n'),
  sol: 'Existing goodwill is left out of capital employed; super profit is the excess of average over normal profit.',
  scheme: [['Capital employed excluding goodwill', 1], ['Normal profit', 1], ['Average and super profit', 1], ['Goodwill', 1]],
}));
const GCp = { assets: { 'Land and building': 600000, Machinery: 350000, Stock: 140000, Debtors: 110000, Cash: 40000 }, gw: 50000, liab: { Creditors: 160000, 'Bills payable': 40000, 'Bank loan': 200000 }, profits: [130000, 142000, 151000], nrr: 15 };
const GCpAssets = sum(Object.values(GCp.assets));
const GCpLiab = sum(Object.values(GCp.liab));
const GCpCE = GCpAssets - GCpLiab;
const GCpAvg = average(GCp.profits);
const GCpAll = goodwillAll({ avg: GCpAvg, capitalEmployed: GCpCE, nrr: GCp.nrr, years: 1 });
same(GCpCE, 840000, 'l6_gw_cap CE'); same(GCpAvg, 141000, 'l6_gw_cap avg'); same(GCpAll.byCapAvg, 100000, 'l6_gw_cap goodwill');
QQ('l6_gw_cap', long({
  t: 6, d: 5, c: 'analysis', marks: 6,
  stem: `An imagined bus-body building firm in Belagavi has these assets: ${Object.entries(GCp.assets).map(([k, v]) => `${k.toLowerCase()} ${rs(v)}`).join(', ')}, and goodwill ${rs(GCp.gw)}. Its liabilities to outsiders are: ${Object.entries(GCp.liab).map(([k, v]) => `${k.toLowerCase()} ${rs(v)}`).join(', ')}. Profits of the last three years were ${GCp.profits.map(rs).join(', ')}, and the normal rate of return is ${GCp.nrr}%. (a) Calculate the capital employed. (b) Value goodwill by capitalising the average profit. (c) Value goodwill by capitalising the super profit. (d) Explain why (b) and (c) agree.`,
  model: [
    `**(a)** Capital employed = assets other than goodwill ${rs(GCpAssets)} − outside liabilities ${rs(GCpLiab)} = **${rs(GCpCE)}** (goodwill already in the books is left out).`,
    `**(b)** Average profit = (${GCp.profits.map(inr).join(' + ')}) ÷ 3 = ${rs(GCpAvg)}. Capitalised value = ${rs(GCpAvg)} × 100/15 = ${rs(GCpAll.capValue)}. Goodwill = ${rs(GCpAll.capValue)} − ${rs(GCpCE)} = **${rs(GCpAll.byCapAvg)}**.`,
    `**(c)** Normal profit = ${rs(GCpCE)} × 15/100 = ${rs(GCpAll.normal)}; super profit = ${rs(GCpAvg)} − ${rs(GCpAll.normal)} = ${rs(GCpAll.superProfit)}. Goodwill = ${rs(GCpAll.superProfit)} × 100/15 = **${rs(GCpAll.byCapSuper)}**.`,
    '**(d)** Capitalising the super profit gives (average profit − capital employed × rate ÷ 100) × 100 ÷ rate, which simplifies to average profit × 100 ÷ rate − capital employed: the formula of (b). With the same figures the two methods must give the same goodwill.',
  ].join('\n\n'),
  sol: 'Compute capital employed once and use it in both methods; the algebra of the two formulas shows why they agree.',
  scheme: [['Capital employed', 1.5], ['Capitalised value and goodwill in (b)', 1.5], ['Normal profit, super profit and goodwill in (c)', 2], ['Reason the methods agree', 1]],
}));
