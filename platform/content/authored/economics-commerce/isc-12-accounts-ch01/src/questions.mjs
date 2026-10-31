// ISC 12 Accounts, ch01 Fundamentals of Partnership — question bank. Every firm, partner and figure is
// imagined by SOYL; no ISC/CBSE textbook illustration or exercise and no CISCE specimen or board item is
// reused. Every amount is computed with acc.mjs from the givens in the stem and asserted against the
// value the author worked out by hand, so a figure never drifts between stem, table and key.
import { Q, mcq, ar, tf, fb, match, num, short, long } from './lib.mjs';
import { check, same, sum, inr, rs, mo, interest, divide, iodEqual, iodProduct, iodSpan, avgMonths, commissionAfter, commissionBefore, journal, mdTable, partnerAccounts, plAdjust, appropriation, guarantee, pastAdjustment, neg } from './acc.mjs';

export const UNIT = 'isc-12-accounts-ch01';
/** Every registered item's key and stem, for the build's near-duplicate check. */
export const BANK = [];
/** Registers a question after checking that its marking scheme has whole-number steps adding up to its marks. */
function QQ(key, q) {
  for (const s of q.marking_scheme) check(Number.isInteger(s.marks) && s.marks > 0, `marking step of ${key} is not a whole number: ${s.marks}`);
  same(sum(q.marking_scheme.map((s) => s.marks)), q.marks, `marking scheme of ${key}`);
  BANK.push({ id: key, unit: UNIT, text: q.stem_md });
  return Q(key, q);
}
/** Numerical item with a rupee key and a marking step that shows the amount in Indian grouping. */
const numQ = (o) => num({ ...o, unit: '₹', scheme: [[`Correct answer: ${rs(o.value)}`, o.marks ?? 1]] });
const acct = (n, kind = 'Capital') => `${n}'s ${kind} A/c`;
const L5 = [100, 170];

// ================================================================ t01 Partnership and the Act
QQ('m_section4', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which one of the following is **not** an element of the definition of partnership in Section 4 of the Indian Partnership Act, 1932?',
  opts: ['Registration of the firm with the Registrar of Firms', 'An agreement between the persons concerned', 'A business whose profits are to be shared', 'The business carried on by all the partners or by any of them acting for all'],
  sol: 'Registration is optional; an unregistered firm only loses certain rights to sue. The other three are taken from the definition itself.',
}));
QQ('m_books', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Gulzar is a sleeping partner in an imagined spice-trading firm in Bikaner whose deed says nothing about the books. He asks to see the cash book and ledger, and the working partners refuse. Under Section 12 of the Indian Partnership Act, 1932, Gulzar',
  opts: ['may have access to, inspect and copy any of the books of the firm', 'may see the books only if he works in the business', 'may see the final accounts, but not the books', 'has no right to the books unless the deed gives him one'],
  sol: 'Unless the partners have agreed otherwise, Section 12(d) lets every partner, active or sleeping, have access to the firm\'s books and inspect and copy them.',
}));
QQ('m_agency', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Hemlata, a partner in an imagined pickle-making firm in Palakkad, buys raw mangoes on credit for the firm without asking her partners. The supplier now asks the firm to pay. The firm is bound to pay mainly because of',
  opts: ['mutual agency: Hemlata acted for the firm in its ordinary business', 'the unlimited liability of the partners', 'the profit-sharing ratio in the deed', 'the registration of the firm'],
  sol: 'An act of a partner in the ordinary course of the firm\'s business binds the firm and every partner. Unlimited liability decides whose property can meet a debt once the firm owes it; it does not create the debt.',
}));
QQ('tf_registration', tf({
  t: 1, d: 1, c: 'understanding', ans: false,
  stem: 'True or false? A partnership firm comes into existence only on the day it is registered with the Registrar of Firms under the Indian Partnership Act, 1932.',
  sol: 'The partnership arises from the agreement among the partners. Registration is optional, although an unregistered firm cannot sue an outsider to enforce a contract.',
}));
QQ('fb_principal', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'Because of mutual agency, each partner of a firm is an agent of the other partners and is also their ___ .',
  acc: [['principal']],
  sol: 'Each partner is both an agent (his acts bind the others) and a principal (he is bound by their acts).',
}));
QQ('ar_unlimited', ar({
  t: 1, d: 3, c: 'analysis', key: 'a',
  a: 'If the assets of a partnership firm cannot pay all its creditors, the creditors may recover the balance from the private property of any partner.',
  r: 'Every partner of a firm has unlimited liability and is liable, jointly with the others and also severally, for all acts of the firm.',
  sol: 'Both statements are true, and the unlimited, joint and several liability in R is exactly why a creditor can reach a partner\'s own property.',
}));
QQ('s2_partner_test', short({
  t: 1, d: 3, c: 'analysis', marks: 2,
  stem: `Mridula lends ${rs(300000)} to an imagined organic-jaggery business in Muzaffarnagar run by her friend Kamini. Instead of a fixed rate of interest, Kamini agrees to pay her 10% of each year's profit. Mridula takes no part in the business and cannot sign for it. Is Mridula a partner? Give two reasons.`,
  model: [
    '**No, Mridula is not a partner.**',
    '1. Receiving a share of profit is not conclusive proof of partnership: a lender may be paid out of profits, and her 10% is simply the reward for her loan.',
    '2. There is no agreement that the business is carried on by both of them or by Kamini acting for both, so there is no mutual agency: Kamini cannot bind Mridula, and Mridula cannot bind the business.',
  ].join('\n'),
  sol: 'Test the relationship against the definition, not against the profit share alone.',
  scheme: [['Profit share is not conclusive; she is a lender', 1], ['No agreement to carry on the business jointly and no mutual agency', 1]],
}));
QQ('s2_books_rights', short({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Unless partners agree otherwise, what do Sections 9 and 12 of the Indian Partnership Act, 1932 say about the firm\'s books and a partner\'s part in the business? State **two** provisions.',
  model: [
    'Any two of:',
    '1. Every partner has a right to have access to, inspect and copy any of the books of the firm (Section 12).',
    '2. Every partner has a right to take part in the conduct of the business (Section 12).',
    '3. Partners must render true accounts and full information of everything affecting the firm to any partner (Section 9).',
    '4. Ordinary matters are decided by a majority of partners, but the nature of the business cannot be changed without the consent of all (Section 12).',
  ].join('\n'),
  sol: 'One mark for each correct provision.',
  scheme: [['First provision', 1], ['Second provision', 1]],
}));
QQ('l5_features', long({
  t: 1, d: 2, c: 'understanding', marks: 5, wl: L5,
  stem: 'Anirban, Lavanya and Udit start an imagined drone-survey business in Hubballi as partners. With reference to their business, explain **five** essential features of a partnership.',
  model: [
    '1. **Two or more persons:** Anirban, Lavanya and Udit are three persons; a firm may have at least two and at most fifty partners.',
    '2. **Agreement:** they are partners because they agreed to be, orally or in a written deed; a partnership cannot arise from status or birth.',
    '3. **Lawful business:** the agreement is to carry on a business, here surveying land and buildings with drones for clients.',
    '4. **Sharing of profits:** they agree to share the profits, and losses, of the survey business in an agreed ratio (equally if nothing is agreed).',
    '5. **Mutual agency:** the business may be carried on by all three or by any one of them acting for all; a contract Udit signs with a client binds Anirban and Lavanya too.',
    '6. **Unlimited liability:** if the firm cannot pay for a drone bought on credit, the seller can recover from the private property of any partner.',
  ].join('\n'),
  sol: 'Each feature needs its meaning and a link to the drone-survey business; any five of the six.',
  scheme: [['Feature 1 with the example', 1], ['Feature 2 with the example', 1], ['Feature 3 with the example', 1], ['Feature 4 with the example', 1], ['Feature 5 with the example', 1]],
}));

// ================================================================ t02 The deed and the rules in its absence
QQ('m_silent_ioc', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Sanya and Trisha run an imagined translation bureau in Puducherry without any partnership deed. Sanya\'s capital is three times Trisha\'s. Under the Indian Partnership Act, 1932, interest on their capitals is',
  opts: ['not allowed to either partner', 'allowed at 6% per annum to both partners', 'allowed only to Sanya, as the larger contributor', 'allowed at 6% per annum, but only out of profits'],
  sol: 'The Act gives no interest on capital unless the partners agree to it, whatever the capitals. The 6% rate belongs to a partner\'s loan or advance, not to capital.',
}));
const CH = { loan: 150000, months: 8 };
const CHi = same(interest(CH.loan, 6, CH.months), 6000, 'm_loan_months');
QQ('m_loan_months', mcq({
  t: 2, d: 2, c: 'application',
  stem: `Chaitanya, a partner in an imagined sports-goods firm in Jalandhar, advanced ${rs(CH.loan)} to the firm on 1 August 2025, over and above his capital. There is no deed and no agreement on interest. For the year ended 31 March 2026, the firm's Profit and Loss Account should be debited with interest on this advance of`,
  opts: [rs(CHi), rs(interest(CH.loan, 6)), rs(interest(CH.loan, 10)), 'nil, because there is no deed'],
  sol: `The Act allows 6% a year on a partner's advance from the date it is made: ${rs(CH.loan)} × 6/100 × 8/12 = ${rs(CHi)}. A full year would wrongly give ${rs(interest(CH.loan, 6))}.`,
}));
QQ('mt_silent', match({
  t: 2, d: 2, c: 'application', marks: 2,
  stem: 'Four disputes arise in an imagined handloom firm in Bishnupur that has no partnership deed. Match each situation with the way the Indian Partnership Act, 1932 settles it.',
  pairs: [
    ['Damini works twelve hours a day; her partners rarely visit the looms', 'No salary or commission for her work'],
    ['Eklavya brought in twice as much capital as each of the others', 'Profit is still shared equally'],
    ['Falguni lent the firm cash beyond her capital', 'Interest at 6% a year, even in a loss year'],
    ['Girish withdrew cash every month for household use', 'No interest is charged on his drawings'],
  ],
  sol: 'With the deed silent: no remuneration, equal sharing, 6% a year on advances as a charge, and no interest on drawings.',
}));
QQ('tf_silent_6', tf({
  t: 2, d: 1, c: 'understanding', ans: false,
  stem: 'True or false? When a partnership deed says nothing about interest on capital, each partner is allowed interest on capital at 6% per annum under the Indian Partnership Act, 1932.',
  sol: 'The 6% rate applies only to loans or advances made by a partner. Interest on capital is not allowed at all unless the partners agree to it.',
}));
QQ('ar_deed', ar({
  t: 2, d: 2, c: 'understanding', key: 'c',
  a: 'Partners are well advised to set out the terms of their partnership in a written deed, signed by every partner and properly stamped.',
  r: 'A partnership cannot come into existence unless the agreement between the partners is in writing.',
  sol: 'A is true: a written deed prevents disputes and is good evidence of the terms. R is false: an oral agreement is enough to create a partnership.',
}));
QQ('s2_deed_why', short({
  t: 2, d: 1, c: 'understanding', marks: 2,
  stem: 'Two partners of an imagined dental clinic in Kannur have only an oral understanding. Give **two** reasons why they should draw up a written partnership deed.',
  model: [
    'Any two of:',
    '1. It records the terms (capital, profit-sharing ratio, interest, salaries, drawings) clearly, so disputes can be settled by referring to it.',
    '2. It is reliable evidence of the agreement before a court or arbitrator.',
    '3. It sets the rules for later events such as admission, retirement or death of a partner and dissolution.',
    '4. It is needed when the firm applies for registration, a bank loan or a tax registration.',
  ].join('\n'),
  sol: 'One mark for each well-explained reason.',
  scheme: [['First reason', 1], ['Second reason', 1]],
}));
const JR = { names: ['Jeevan', 'Ruksana'], cap: { Jeevan: 400000, Ruksana: 100000 }, loan: 80000, before: 126000 };
const JRint = same(interest(JR.loan, 6), 4800, 's3_dispute loan interest');
const JRnet = JR.before - JRint;
const JRsh = divide(JRnet, { Jeevan: 1, Ruksana: 1 }, 's3_dispute shares');
same(JRsh.Jeevan, 60600, 's3_dispute share');
QQ('s3_dispute', short({
  t: 2, d: 2, c: 'application', marks: 3,
  stem: `Jeevan and Ruksana run an imagined toy-making workshop in Kondapalli with no partnership deed. Their capitals are ${rs(JR.cap.Jeevan)} and ${rs(JR.cap.Ruksana)}, and Ruksana lent the workshop ${rs(JR.loan)} on 1 April 2025. The profit for 2025-26 before any interest is ${rs(JR.before)}. Jeevan wants interest on capital at 8% and profit shared in the capital ratio; Ruksana wants interest on her loan at 12%. Settle the claims and find each partner's share of profit.`,
  model: [
    '1. **Interest on capital:** not allowed, as there is no agreement to pay it.',
    `2. **Interest on Ruksana's loan:** 6% a year, not 12%: ${rs(JR.loan)} × 6/100 = ${rs(JRint)}, a charge against profit.`,
    `3. **Profit sharing:** equal, not in the capital ratio. Profit after the loan interest = ${rs(JR.before)} − ${rs(JRint)} = ${rs(JRnet)}; each partner gets **${rs(JRsh.Jeevan)}**.`,
  ].join('\n'),
  sol: 'Apply the Act\'s default rules: interest on the loan first, as a charge, and then equal division.',
  scheme: [['Interest on capital refused with reason', 1], [`Loan interest ${rs(JRint)} at 6% as a charge`, 1], ['Equal shares of the remaining profit', 1]],
}));
QQ('s3_deed_clauses', short({
  t: 2, d: 1, c: 'recall', marks: 3,
  stem: 'Bhaskar and his cousin Keya are drafting a partnership deed for an imagined cloud kitchen in Dharamshala. Suggest **six** clauses their deed should contain.',
  model: [
    '1. Name and address of the firm and of each partner, and the nature of the business.',
    '2. Date of commencement and duration of the partnership.',
    '3. Capital to be contributed by each partner.',
    '4. Profit-sharing ratio.',
    '5. Rates of interest on capital, on drawings and on partners\' loans.',
    '6. Salary or commission to working partners.',
    '7. Method of keeping accounts and preparing the final accounts each year.',
    '8. Rules for admission, retirement and death of a partner, valuation of goodwill, settlement of disputes and dissolution.',
  ].join('\n'),
  sol: 'Any six relevant clauses; one mark for every two.',
  scheme: [['Any two correct clauses', 1], ['Two more correct clauses', 1], ['Two more correct clauses', 1]],
}));
const RW = { names: ['Rehana', 'Sukhmani', 'Wangchuk'], cap: { Rehana: 600000, Sukhmani: 400000, Wangchuk: 200000 }, loan: 240000, loanMonths: 6, before: 279000 };
const RWint = same(interest(RW.loan, 6, RW.loanMonths), 7200, 'l5_silent loan interest');
const RWadj = plAdjust({ before: RW.before, charges: [[`To Interest on Rehana's Loan (6% for 6 months)`, RWint]] });
const RWsh = divide(RWadj.net, { Rehana: 1, Sukhmani: 1, Wangchuk: 1 }, 'l5_silent shares');
same(RWadj.net, 271800, 'l5_silent net'); same(RWsh.Rehana, 90600, 'l5_silent share');
QQ('l5_silent', long({
  t: 2, d: 3, c: 'application', marks: 5,
  stem: `Rehana, Sukhmani and Wangchuk run an imagined trekking-gear rental firm in Kullu. They have no partnership deed. Their capitals are ${RW.names.map((n) => rs(RW.cap[n])).join(', ')}. Rehana also lent the firm ${rs(RW.loan)} on 1 October 2025. The profit for the year ended 31 March 2026, before any of the items below, is ${rs(RW.before)}. At the year end: (i) Wangchuk, who works full time, claims a salary of ${rs(10000)} per month; (ii) Rehana claims interest on capital at 10% and interest on her loan at 12% per annum; (iii) Sukhmani wants the profit divided in the capital ratio. (a) Settle each claim, giving reasons. (b) Prepare the Profit and Loss Adjustment Account and show each partner's share of profit.`,
  model: [
    '**(a) Claims under the Indian Partnership Act, 1932**',
    '1. Salary to Wangchuk: **not allowed**; no partner is entitled to remuneration without an agreement.',
    '2. Interest on capital to Rehana: **not allowed** without an agreement.',
    `3. Interest on Rehana's loan: **6%** per annum, not 12%, from 1 October 2025: ${rs(RW.loan)} × 6/100 × 6/12 = ${rs(RWint)}. It is a charge against profit.`,
    '4. Division of profit: **equal**, whatever the capitals; Sukhmani\'s claim fails.',
    '**(b) Profit and Loss Adjustment Account** for the year ended 31 March 2026',
    RWadj.md,
    `Net profit ${rs(RWadj.net)} shared equally: Rehana, Sukhmani and Wangchuk **${rs(RWsh.Rehana)}** each.`,
  ].join('\n\n'),
  sol: 'Reject what the Act does not give, charge the loan interest from its date, then divide the rest equally.',
  scheme: [['Salary and interest on capital claims refused with reasons', 1], ['Capital-ratio claim refused; equal sharing', 1], [`Loan interest ${rs(RWint)} at 6% for 6 months`, 1], ['Profit and Loss Adjustment Account', 1], ['Equal shares of the net profit', 1]],
}));

// ================================================================ t03 Capital and current accounts
QQ('m_fixed_salary', mcq({
  t: 3, d: 1, c: 'understanding',
  stem: 'Partners of an imagined lock-making firm in Aligarh keep their capitals **fixed**. The salary allowed to a working partner for the year is credited to her',
  opts: ['current account', 'capital account', 'loan account', 'drawings account'],
  sol: 'With fixed capitals every routine item of the year, including salary, interest and share of profit, passes through the current account; the capital account changes only for capital brought in or permanently withdrawn.',
}));
QQ('m_fluct_accounts', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'When a firm follows the **fluctuating** capital method, each partner\'s capital is recorded in',
  opts: ['one capital account, which records every adjustment', 'a capital account and a current account', 'a capital account and a loan account', 'the Balance Sheet only, without a ledger account'],
  sol: 'Under the fluctuating method, interest, salary, profit and drawings are all recorded in the single capital account, so its balance changes every year.',
}));
const HR = { bal: 24000, rate: 5 };
const HRi = same(interest(HR.bal, HR.rate), 1200, 'm_int_current');
QQ('m_int_current', mcq({
  t: 3, d: 3, c: 'application',
  stem: `The deed of an imagined firm with fixed capitals allows interest at ${HR.rate}% per annum on the opening balances of partners' current accounts, whether credit or debit. On 1 April 2025 Harshita's current account showed a **debit** balance of ${rs(HR.bal)}. The interest of ${rs(HRi)} for 2025-26 is`,
  opts: ['debited to Harshita\'s current account and credited to the Profit and Loss Appropriation Account', 'credited to Harshita\'s current account and debited to the Profit and Loss Appropriation Account', 'debited to Harshita\'s capital account and credited to the Profit and Loss Account', 'ignored, because interest is never charged on a current account'],
  sol: `A debit balance means Harshita owes the firm, so the interest is charged to her, like interest on drawings: ${rs(HR.bal)} × 5/100 = ${rs(HRi)}, debited to her current account and credited to the appropriation account.`,
}));
QQ('tf_current_dr', tf({
  t: 3, d: 2, c: 'understanding', ans: true,
  stem: `True or false? Avinash's capital account in an imagined firm with fixed capitals shows a credit of ${rs(200000)}. After a year of heavy drawings and a small profit, his current account can show a debit balance while his capital account still shows that credit.`,
  sol: 'Drawings and interest on them go to the current account; if they exceed his interest, salary and share of profit, the current account goes into debit. The capital account is untouched.',
}));
QQ('fb_current', fb({
  t: 3, d: 1, c: 'recall',
  stem: 'In a firm whose capitals are fixed, a partner\'s drawings and the interest charged on them are debited to his ___ account.',
  acc: [['current']],
  sol: 'They go to the current account; only permanent changes in capital pass through the capital account.',
}));
QQ('ar_fluct', ar({
  t: 3, d: 2, c: 'understanding', key: 'd',
  a: 'Under the fluctuating capital method, a partner\'s capital account can never show a debit balance.',
  r: 'Under the fluctuating capital method, drawings, interest, salary and the share of profit or loss are all recorded in the partner\'s capital account.',
  sol: 'A is false: heavy drawings or a share of loss recorded in the single capital account can push it into debit. R is true, and is the reason the balance fluctuates.',
}));
const DL = { open: 250000, rate: 10, salaryPm: 1500, profit: 42000, drawings: 30000, iod: 900 };
const DLclose = same(DL.open + interest(DL.open, DL.rate) + DL.salaryPm * 12 + DL.profit - DL.drawings - DL.iod, 304100, 'n_closing_cap');
QQ('n_closing_cap', numQ({
  t: 3, d: 2, c: 'application', value: DLclose,
  stem: `Dolma is a partner in an imagined carpet-weaving firm in Mirzapur that keeps **fluctuating** capitals. Her capital on 1 April 2025 was ${rs(DL.open)}. For 2025-26 she is allowed interest on capital at ${DL.rate}% and a salary of ${rs(DL.salaryPm)} per month, and her share of profit is ${rs(DL.profit)}. She withdrew ${rs(DL.drawings)} and is charged interest on drawings of ${rs(DL.iod)}. Find her capital on 31 March 2026 (in ₹).`,
  sol: `${inr(DL.open)} + ${inr(interest(DL.open, DL.rate))} (interest) + ${inr(DL.salaryPm * 12)} (salary) + ${inr(DL.profit)} (profit) − ${inr(DL.drawings)} (drawings) − ${inr(DL.iod)} (interest on drawings) = ${rs(DLclose)}.`,
}));
QQ('s2_fixed_fluct', short({
  t: 3, d: 1, c: 'understanding', marks: 2,
  stem: 'An imagined firm in Darbhanga must choose between keeping its partners\' capitals fixed or fluctuating. Distinguish between the two methods on any **two** bases.',
  model: mdTable(['Basis', 'Fixed capital method', 'Fluctuating capital method'], [
    ['Number of accounts', 'Two for each partner: capital and current', 'One for each partner: capital'],
    ['Routine items (interest, salary, profit, drawings)', 'Recorded in the current account', 'Recorded in the capital account'],
    ['Change in balance', 'Capital changes only when capital is added or permanently withdrawn', 'Capital changes every year'],
    ['Debit balance', 'Capital account always in credit; current account may be in debit', 'Capital account may occasionally be in debit'],
  ]),
  sol: 'Any two bases, each contrasted for both methods.',
  scheme: [['First basis, both methods', 1], ['Second basis, both methods', 1]],
}));
const AD = { names: ['Aparna', 'Devesh'], close: { Aparna: 296000, Devesh: 202000 }, drawings: { Aparna: 40000, Devesh: 25000 }, profit: 120000, ratio: { Aparna: 3, Devesh: 2 }, rate: 5 };
const ADsh = divide(AD.profit, AD.ratio, 's3_opening shares');
const ADopen = Object.fromEntries(AD.names.map((n) => [n, AD.close[n] + AD.drawings[n] - ADsh[n]]));
const ADioc = Object.fromEntries(AD.names.map((n) => [n, interest(ADopen[n], AD.rate)]));
same(ADopen.Aparna, 264000, 'Aparna opening'); same(ADopen.Devesh, 179000, 'Devesh opening'); same(ADioc.Devesh, 8950, 'Devesh interest');
QQ('s3_opening', short({
  t: 3, d: 3, c: 'analysis', marks: 3,
  stem: `After the accounts of an imagined bamboo-craft firm in Silchar were closed, Aparna's and Devesh's capitals on 31 March 2026 were ${rs(AD.close.Aparna)} and ${rs(AD.close.Devesh)}. During 2025-26 their drawings were ${rs(AD.drawings.Aparna)} and ${rs(AD.drawings.Devesh)}, and the profit of ${rs(AD.profit)} was credited to them in the ratio 3:2. No other entry was made. Interest on capital at ${AD.rate}% per annum was to have been allowed. Find their capitals on 1 April 2025 and the interest due to each.`,
  model: [
    mdTable(['Particulars', 'Aparna (₹)', 'Devesh (₹)'], [
      ['Capital on 31 March 2026', inr(AD.close.Aparna), inr(AD.close.Devesh)],
      ['Add: Drawings', inr(AD.drawings.Aparna), inr(AD.drawings.Devesh)],
      ['Less: Share of profit (3:2)', inr(ADsh.Aparna), inr(ADsh.Devesh)],
      ['**Capital on 1 April 2025**', `**${inr(ADopen.Aparna)}**`, `**${inr(ADopen.Devesh)}**`],
      [`Interest on capital at ${AD.rate}%`, inr(ADioc.Aparna), inr(ADioc.Devesh)],
    ]),
  ].join('\n\n'),
  sol: 'Reverse the year\'s entries to reach the opening capitals; interest is always on the opening figure.',
  scheme: [[`Aparna's opening capital ${rs(ADopen.Aparna)}`, 1], [`Devesh's opening capital ${rs(ADopen.Devesh)}`, 1], ['Interest on capital for both', 1]],
}));
const HK = { names: ['Hina', 'Kirti'], cap: { Hina: 300000, Kirti: 200000 }, open: { Hina: 15000, Kirti: -8000 }, rate: 6, curRate: 10, commPct: 4, drawings: { Hina: 36000, Kirti: 24000 }, iod: { Hina: 1080, Kirti: 720 }, profit: 150000 };
const HKioc = Object.fromEntries(HK.names.map((n) => [n, interest(HK.cap[n], HK.rate)]));
const HKcurI = { Hina: interest(HK.open.Hina, HK.curRate), Kirti: interest(-HK.open.Kirti, HK.curRate) };
const HKcomm = { Kirti: commissionBefore(HK.profit, HK.commPct) };
const HKapp = appropriation({
  names: HK.names, ratio: { Hina: 1, Kirti: 1 }, profit: HK.profit, iod: HK.iod, ioc: HKioc, commission: HKcomm,
  extraCr: [['By Interest on Current A/c: Kirti (debit balance)', HKcurI.Kirti]],
  extraDr: [['To Interest on Current A/c: Hina (credit balance)', HKcurI.Hina]],
  shareLabel: (n) => `To ${acct(n, 'Current')} (share of profit)`,
});
const HKcur = partnerAccounts({
  names: HK.names,
  dr: [['To Balance b/d', { Kirti: -HK.open.Kirti }], ['To Drawings A/c', HK.drawings], ['To Interest on Drawings A/c', HK.iod], ['To Interest on Current A/c', { Kirti: HKcurI.Kirti }]],
  cr: [['By Balance b/d', { Hina: HK.open.Hina }], ['By Interest on Capital A/c', HKioc], ['By Interest on Current A/c', { Hina: HKcurI.Hina }], ['By Commission A/c', HKcomm], ['By P&L Appropriation A/c', HKapp.shares]],
});
same(HKapp.divisible, 115100, 'l5_current_int divisible'); same(HKcur.balances.Hina, 54970, 'Hina current'); same(HKcur.balances.Kirti, 42030, 'Kirti current');
QQ('l5_current_int', long({
  t: [3, 4], d: 4, c: 'application', marks: 5,
  stem: `Hina and Kirti share profits equally in an imagined stationery firm in Agartala. Their **fixed** capitals are ${rs(HK.cap.Hina)} and ${rs(HK.cap.Kirti)}. On 1 April 2025 Hina's current account showed ${rs(HK.open.Hina)} (credit) and Kirti's ${rs(-HK.open.Kirti)} (debit). The deed provides: interest on capital at ${HK.rate}%; interest at ${HK.curRate}% on opening current-account balances, allowed on credit balances and charged on debit balances; a commission to Kirti of ${HK.commPct}% of the net profit. Drawings were ${rs(HK.drawings.Hina)} and ${rs(HK.drawings.Kirti)}, and interest on drawings ${rs(HK.iod.Hina)} and ${rs(HK.iod.Kirti)}. The net profit for 2025-26 was ${rs(HK.profit)}. Prepare the Profit and Loss Appropriation Account and the partners' current accounts.`,
  model: [
    `Working: interest on current balances: Hina ${rs(HK.open.Hina)} × 10% = ${rs(HKcurI.Hina)} (allowed); Kirti ${rs(-HK.open.Kirti)} × 10% = ${rs(HKcurI.Kirti)} (charged). Commission ${rs(HK.profit)} × 4% = ${rs(HKcomm.Kirti)}.`,
    '**Profit and Loss Appropriation Account** for the year ended 31 March 2026',
    HKapp.md,
    '**Partners\' Current Accounts**',
    HKcur.md,
  ].join('\n\n'),
  sol: 'Treat interest on a credit current balance like interest on capital and on a debit balance like interest on drawings.',
  scheme: [['Interest on capital and on current balances on the correct sides', 2], [`Commission and divisible profit ${rs(HKapp.divisible)}`, 1], ['Current accounts with opening balances', 1], ['Closing balances', 1]],
}));
const EM = { names: ['Ela', 'Madhavi', 'Ranjit'], ratio: { Ela: 2, Madhavi: 2, Ranjit: 1 }, cap: { Ela: 500000, Madhavi: 400000, Ranjit: 200000 }, addl: 100000, out: 50000, rate: 8, salaryPm: 2500, profit: 312000, reservePct: 10 };
const EMd = { Ela: iodEqual({ amount: 5000, n: 12, when: 'begin', rate: 6 }), Madhavi: iodEqual({ amount: 12000, n: 4, when: 'end', rate: 6 }), Ranjit: { total: 20000, months: 6, interest: interest(20000, 6, 6) } };
const EMioc = { Ela: interest(EM.cap.Ela, EM.rate) + interest(EM.addl, EM.rate, 9), Madhavi: interest(EM.cap.Madhavi, EM.rate), Ranjit: interest(EM.cap.Ranjit, EM.rate) - interest(EM.out, EM.rate, 3) };
const EMiod = Object.fromEntries(EM.names.map((n) => [n, EMd[n].interest]));
const EMres = EM.profit * EM.reservePct / 100;
const EMapp = appropriation({ names: EM.names, ratio: EM.ratio, profit: EM.profit, iod: EMiod, ioc: EMioc, salary: { Ranjit: EM.salaryPm * 12 }, reserve: EMres });
const EMcap = partnerAccounts({
  names: EM.names,
  dr: [['To Bank A/c (capital withdrawn)', { Ranjit: EM.out }], ['To Drawings A/c', Object.fromEntries(EM.names.map((n) => [n, EMd[n].total]))], ['To Interest on Drawings A/c', EMiod]],
  cr: [['By Balance b/d', EM.cap], ['By Bank A/c (additional capital)', { Ela: EM.addl }], ['By Interest on Capital A/c', EMioc], ['By Salary A/c', { Ranjit: EM.salaryPm * 12 }], ['By P&L Appropriation A/c', EMapp.shares]],
});
same(EMioc.Ela, 46000, 'Ela ioc'); same(EMioc.Ranjit, 15000, 'Ranjit ioc'); same(EMiod.Ela, 1950, 'Ela iod'); same(EMiod.Madhavi, 1080, 'Madhavi iod');
same(EMapp.divisible, 161430, 'l6_fluct divisible'); same(EMcap.balances.Ela, 648622, 'Ela capital'); same(EMcap.balances.Madhavi, 447492, 'Madhavi capital'); same(EMcap.balances.Ranjit, 206686, 'Ranjit capital');
QQ('l6_fluct', long({
  t: [3, 4, 5], d: 4, c: 'application', marks: 6,
  stem: `Ela, Madhavi and Ranjit share profits 2:2:1 in an imagined ceramics studio in Khambhat with **fluctuating** capitals. Capitals on 1 April 2025: ${EM.names.map((n) => `${n} ${rs(EM.cap[n])}`).join(', ')}. Ela brought in ${rs(EM.addl)} more on 1 July 2025, and Ranjit permanently withdrew ${rs(EM.out)} of capital on 1 January 2026. The deed provides: interest on capital at ${EM.rate}% per annum; a salary to Ranjit of ${rs(EM.salaryPm)} per month; interest on drawings at 6% per annum; ${EM.reservePct}% of the net profit to general reserve. Ela drew ${rs(5000)} at the **beginning** of every month, Madhavi ${rs(12000)} at the **end** of every quarter, and Ranjit ${rs(20000)} in all on unknown dates. The net profit for 2025-26 was ${rs(EM.profit)}. Prepare the Profit and Loss Appropriation Account and the partners' capital accounts.`,
  model: [
    '**Working notes**',
    `1. Interest on capital: Ela ${rs(interest(EM.cap.Ela, EM.rate))} + ${rs(EM.addl)} × 8/100 × 9/12 = ${rs(EMioc.Ela)}; Madhavi ${rs(EMioc.Madhavi)}; Ranjit ${rs(interest(EM.cap.Ranjit, EM.rate))} − ${rs(EM.out)} × 8/100 × 3/12 = ${rs(EMioc.Ranjit)}.`,
    `2. Interest on drawings: Ela ${rs(EMd.Ela.total)} × 6/100 × ${mo(EMd.Ela.months)}/12 = ${rs(EMiod.Ela)}; Madhavi ${rs(EMd.Madhavi.total)} × 6/100 × ${mo(EMd.Madhavi.months)}/12 = ${rs(EMiod.Madhavi)}; Ranjit ${rs(EMd.Ranjit.total)} × 6/100 × 6/12 = ${rs(EMiod.Ranjit)}.`,
    `3. General reserve: ${rs(EM.profit)} × 10% = ${rs(EMres)}.`,
    '**Profit and Loss Appropriation Account** for the year ended 31 March 2026',
    EMapp.md,
    '**Partners\' Capital Accounts**',
    EMcap.md,
  ].join('\n\n'),
  sol: 'Additions earn interest from their date and withdrawals stop earning it from theirs; every item then goes through the fluctuating capital accounts.',
  scheme: [['Interest on capital with the addition and the withdrawal', 1], ['Interest on drawings by average periods', 1], ['Salary and reserve', 1], ['Divisible profit and its division', 1], ['Capital accounts posted', 1], ['Closing balances', 1]],
}));

// ================================================================ t04 Appropriation, interest on capital, salary, commission
QQ('m_not_approp', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'An imagined firm pays its manager a commission and also allows its partners interest, salary and commission. Which item is **not** debited to the firm\'s Profit and Loss Appropriation Account?',
  opts: ['Commission payable to the manager', 'Commission payable to a working partner', 'Interest on partners\' capitals', 'Transfer to general reserve'],
  sol: 'A manager is an employee, so the commission is an expense (a charge) debited to the Profit and Loss Account before net profit is found. The other items distribute that net profit.',
}));
const MG = { before: 330000, pct: 10 };
const MGc = same(commissionAfter(MG.before, MG.pct), 30000, 'm_manager');
QQ('m_manager', mcq({
  t: 4, d: 2, c: 'application',
  stem: `The manager of an imagined cold-chain firm in Sangli is entitled to a commission of ${MG.pct}% of the net profit **after** charging his commission. The profit before his commission is ${rs(MG.before)}. His commission is`,
  opts: [rs(MGc), rs(commissionBefore(MG.before, MG.pct)), rs(36300), rs(27000)],
  sol: `${rs(MG.before)} × 10/110 = ${rs(MGc)}, which is exactly 10% of the ${rs(MG.before - MGc)} left after it. ${rs(commissionBefore(MG.before, MG.pct))} would be 10% before charging it.`,
}));
const DB = { ioc: { Diya: 30000, Bipin: 20000 }, profit: 35000 };
const DBsh = divide(DB.profit, DB.ioc, 'm_insuff');
same(DBsh.Diya, 21000, 'm_insuff Diya');
QQ('m_insuff', mcq({
  t: 4, d: 3, c: 'application',
  stem: `The deed of an imagined firm treats interest on capital as an appropriation. Interest due for the year is Diya ${rs(DB.ioc.Diya)} and Bipin ${rs(DB.ioc.Bipin)}, but the net profit is only ${rs(DB.profit)}. Diya's account will be credited with`,
  opts: [rs(DBsh.Diya), rs(DB.ioc.Diya), rs(DB.profit / 2), rs(DB.profit - DB.ioc.Diya)],
  sol: `The whole profit is shared in the ratio of interest due, 3:2: ${rs(DB.profit)} × 3/5 = ${rs(DBsh.Diya)} for Diya and ${rs(DBsh.Bipin)} for Bipin.`,
}));
QQ('m_charge_loss', mcq({
  t: 4, d: 3, c: 'application',
  stem: `The deed of an imagined firm in Morbi says that interest on capital is a **charge** against profit. Before this interest the firm earned ${rs(10000)}; interest on capital comes to ${rs(25000)}. The partners will`,
  opts: [`be credited with full interest of ${rs(25000)} and share a loss of ${rs(15000)} in their profit-sharing ratio`, `share ${rs(10000)} in the ratio of interest due, with no loss`, 'receive no interest, because the profit is less than the interest', `receive interest of ${rs(10000)} only`],
  sol: 'A charge is allowed in full whatever the profit, so the interest turns the profit into a loss that is shared in the profit-sharing ratio.',
}));
QQ('m_reserve', mcq({
  t: 4, d: 1, c: 'recall',
  stem: 'Under its deed, an imagined firm in Panipat transfers 10% of each year\'s net profit to general reserve. The transfer is shown on the',
  opts: ['debit side of the Profit and Loss Appropriation Account', 'debit side of the Profit and Loss Account', 'credit side of the Profit and Loss Appropriation Account', 'debit side of the partners\' current accounts'],
  sol: 'A transfer to reserve sets aside part of the profit already earned, so it is an appropriation debited to the appropriation account.',
}));
QQ('ar_s13', ar({
  t: 4, d: 2, c: 'understanding', key: 'a',
  a: 'Where a deed allows interest on capital without calling it a charge, no interest on capital is credited to the partners in a year in which the firm suffers a loss.',
  r: 'Under Section 13 of the Indian Partnership Act, 1932, interest on capital to which a partner is entitled is payable only out of profits.',
  sol: 'Both are true, and R explains A: with a loss there are no profits out of which the interest could be paid.',
}));
QQ('ar_manager', ar({
  t: 4, d: 3, c: 'analysis', key: 'b',
  a: 'Commission payable to the manager of a partnership firm is debited to the Profit and Loss Account.',
  r: 'Commission payable to a partner of the firm is an appropriation of profit.',
  sol: 'Both are true, but R speaks of a partner\'s commission. A holds because a manager is an employee whose commission is an expense of earning the profit.',
}));
QQ('tf_partner_salary', tf({
  t: 4, d: 1, c: 'understanding', ans: false,
  stem: 'True or false? The monthly salary that a deed allows to a working partner is a charge against profit and is debited to the Profit and Loss Account.',
  sol: 'A partner is an owner, not an employee; the salary is an appropriation of profit, debited to the Profit and Loss Appropriation Account.',
}));
QQ('fb_divisible', fb({
  t: 4, d: 1, c: 'recall',
  stem: 'In the Profit and Loss Appropriation Account, net profit plus interest on drawings, less interest on capital, partners\' salary and commission and transfers to reserve, leaves the ___ profit that is shared in the profit-sharing ratio.',
  acc: [['divisible', 'distributable']],
  sol: 'This balance is the divisible profit, credited to the partners in their profit-sharing ratio.',
}));
QQ('mt_where', match({
  t: [4, 5], d: 2, c: 'understanding', marks: 2,
  stem: 'An imagined firm in Bhilwara keeps fixed capitals and has a partner\'s loan. Match each of its items for 2025-26 with the place where it is recorded.',
  pairs: [
    ['Interest on the partner\'s loan to the firm', 'Debit side of the Profit and Loss Account'],
    ['Interest charged on a partner\'s drawings', 'Credit side of the P&L Appropriation Account'],
    ['Commission allowed to a partner', 'Debit side of the P&L Appropriation Account'],
    ['Cash withdrawn by a partner for personal use', 'Debit side of the partner\'s current account'],
  ],
  sol: 'The loan interest is a charge; interest on drawings and a partner\'s commission are appropriation items; drawings go to the current account when capitals are fixed.',
}));
const PD = { cap: 400000, out: 80000, rate: 9 };
const PDi = same(interest(PD.cap, PD.rate) - interest(PD.out, PD.rate, 6), 32400, 'n_ioc_withdraw');
QQ('n_ioc_withdraw', numQ({
  t: 4, d: 2, c: 'application', value: PDi,
  stem: `Pradeep's capital in an imagined tile-trading firm in Kakinada was ${rs(PD.cap)} on 1 April 2025. On 1 October 2025 he permanently withdrew ${rs(PD.out)} of it. Interest on capital is allowed at ${PD.rate}% per annum. Find his interest on capital for the year ended 31 March 2026 (in ₹).`,
  sol: `${rs(PD.cap)} × 9/100 = ${rs(interest(PD.cap, PD.rate))} for the year, less ${rs(PD.out)} × 9/100 × 6/12 = ${rs(interest(PD.out, PD.rate, 6))} on the capital withdrawn: ${rs(PDi)}.`,
}));
const RD = { before: 528000, mgr: 10, partner: 5 };
const RDm = same(commissionAfter(RD.before, RD.mgr), 48000, 'n_partner_comm manager');
const RDp = same(commissionBefore(RD.before - RDm, RD.partner), 24000, 'n_partner_comm partner');
QQ('n_partner_comm', numQ({
  t: 4, d: 3, c: 'analysis', value: RDp,
  stem: `An imagined firm in Kurnool earned ${rs(RD.before)} before any commission. Its manager gets ${RD.mgr}% of the net profit after charging his own commission. Partner Radhika gets ${RD.partner}% of the net profit remaining after the manager's commission but before charging her own. Find Radhika's commission (in ₹).`,
  sol: `Manager: ${inr(RD.before)} × 10/110 = ${inr(RDm)}, a charge. Net profit = ${inr(RD.before - RDm)}. Radhika: ${inr(RD.before - RDm)} × 5/100 = ${rs(RDp)}.`,
}));
const CA = { before: 252000, pct: 5 };
const CAc = same(commissionAfter(CA.before, CA.pct), 12000, 'n_comm_after');
QQ('n_comm_after', numQ({
  t: 4, d: 2, c: 'application', value: CAc,
  stem: `Partner Sushant of an imagined travel firm in Udupi is allowed a commission of ${CA.pct}% of the net profit **after** charging such commission. The net profit before his commission is ${rs(CA.before)}. Find his commission (in ₹).`,
  sol: `Commission = ${inr(CA.before)} × 5/105 = ${rs(CAc)}. Check: 5% of ${inr(CA.before - CAc)} is ${inr(CAc)}.`,
}));
const PH = { profit: 240000, iod: 3000, ioc: 36000, salary: 30000, comm: 12000, reserve: 20000 };
const PHdiv = same(PH.profit + PH.iod - PH.ioc - PH.salary - PH.comm - PH.reserve, 145000, 'n_divisible');
QQ('n_divisible', numQ({
  t: 4, d: 2, c: 'application', value: PHdiv,
  stem: `Pavan and Hamid run an imagined spice-grinding unit in Warangal. For 2025-26 its net profit is ${rs(PH.profit)}; interest on drawings ${rs(PH.iod)}; interest on capital ${rs(PH.ioc)}; Hamid's salary ${rs(PH.salary)}; Pavan's commission ${rs(PH.comm)}; transfer to general reserve ${rs(PH.reserve)}. Find the divisible profit (in ₹).`,
  sol: `${inr(PH.profit)} + ${inr(PH.iod)} − ${inr(PH.ioc)} − ${inr(PH.salary)} − ${inr(PH.comm)} − ${inr(PH.reserve)} = ${rs(PHdiv)}.`,
}));
const VK = { before: 264000, pct: 10 };
const VKm = same(commissionAfter(VK.before, VK.pct), 24000, 's2_manager');
const VKsh = divide(VK.before - VKm, { Velu: 2, Kokila: 1 }, 's2_manager shares');
QQ('s2_manager', short({
  t: 4, d: 2, c: 'application', marks: 2,
  stem: `Velu and Kokila share profits 2:1 in an imagined coir-products firm in Kanyakumari. Their manager is entitled to ${VK.pct}% of the net profit after charging his commission. The profit before the manager's commission for 2025-26 is ${rs(VK.before)}. Calculate the manager's commission and each partner's share of profit.`,
  model: [
    `Manager's commission = ${rs(VK.before)} × 10/110 = **${rs(VKm)}** (a charge against profit).`,
    `Net profit = ${rs(VK.before)} − ${rs(VKm)} = ${rs(VK.before - VKm)}; Velu ${rs(VKsh.Velu)} and Kokila ${rs(VKsh.Kokila)} (2:1).`,
  ].join('\n\n'),
  sol: 'Charge the manager first, then share what is left.',
  scheme: [[`Manager's commission ${rs(VKm)}`, 1], ['Shares of the net profit', 1]],
}));
const PO = { ioc: { Ponni: 24000, Oishi: 12000 }, profit: 27000 };
const POsh = divide(PO.profit, PO.ioc, 's2_insuff');
same(POsh.Ponni, 18000, 's2_insuff Ponni');
QQ('s2_insuff', short({
  t: 4, d: 2, c: 'application', marks: 2,
  stem: `Ponni and Oishi run an imagined batik studio in Thoothukudi. Their deed allows interest on capital, not as a charge. For 2025-26 the interest due is Ponni ${rs(PO.ioc.Ponni)} and Oishi ${rs(PO.ioc.Oishi)}, but the net profit is ${rs(PO.profit)}. How much will each partner be credited with? Show the working.`,
  model: `Profit is less than the interest due (${rs(sum(Object.values(PO.ioc)))}), so the whole profit is shared in the ratio of interest due, 2:1.\n\nPonni ${rs(PO.profit)} × 2/3 = **${rs(POsh.Ponni)}**; Oishi ${rs(PO.profit)} × 1/3 = **${rs(POsh.Oishi)}**. Nothing is left to share in the profit-sharing ratio.`,
  sol: 'Interest as an appropriation can never exceed the profit available.',
  scheme: [['Recognising the shortfall and the ratio of interest due', 1], ['Amounts credited to each', 1]],
}));
const CD = { cap: { Charan: 300000, Deepika: 200000 }, addl: 60000, out: 60000, rate: 10, profit: 39000 };
const CDioc = { Charan: interest(CD.cap.Charan, CD.rate) + interest(CD.addl, CD.rate, 8), Deepika: interest(CD.cap.Deepika, CD.rate) - interest(CD.out, CD.rate, 4) };
const CDsh = divide(CD.profit, CDioc, 's3_ioc_moves shares');
same(CDioc.Charan, 34000, 'Charan ioc'); same(CDioc.Deepika, 18000, 'Deepika ioc'); same(CDsh.Charan, 25500, 'Charan share');
QQ('s3_ioc_moves', short({
  t: 4, d: 3, c: 'application', marks: 3,
  stem: `Charan and Deepika are partners in an imagined furniture workshop in Karaikudi. On 1 April 2025 their capitals were ${rs(CD.cap.Charan)} and ${rs(CD.cap.Deepika)}. Charan introduced ${rs(CD.addl)} more on 1 August 2025; Deepika permanently withdrew ${rs(CD.out)} on 1 December 2025. Interest on capital is allowed at ${CD.rate}% per annum as an appropriation. The net profit for 2025-26 is ${rs(CD.profit)}. Calculate the interest due to each partner and the amount actually credited to each.`,
  model: [
    `Charan: ${rs(CD.cap.Charan)} × 10/100 = ${rs(interest(CD.cap.Charan, CD.rate))}, plus ${rs(CD.addl)} × 10/100 × 8/12 = ${rs(interest(CD.addl, CD.rate, 8))}: **${rs(CDioc.Charan)}**.`,
    `Deepika: ${rs(CD.cap.Deepika)} × 10/100 = ${rs(interest(CD.cap.Deepika, CD.rate))}, less ${rs(CD.out)} × 10/100 × 4/12 = ${rs(interest(CD.out, CD.rate, 4))}: **${rs(CDioc.Deepika)}**.`,
    `Interest due ${rs(CDioc.Charan + CDioc.Deepika)} exceeds the profit of ${rs(CD.profit)}, so the profit is shared 17:9: Charan **${rs(CDsh.Charan)}**, Deepika **${rs(CDsh.Deepika)}**.`,
  ].join('\n\n'),
  sol: 'Interest runs on each capital only for the months it was with the firm; a short profit is then shared in the ratio of interest due.',
  scheme: [['Charan\'s interest with the addition', 1], ['Deepika\'s interest with the withdrawal', 1], ['Profit shared in the ratio of interest due', 1]],
}));
const GH = { ioc: { Geeta: 40000, Hrishikesh: 20000 }, before: 48000 };
const GHa = divide(GH.before, GH.ioc, 's3_charge_vs a');
const GHloss = sum(Object.values(GH.ioc)) - GH.before;
const GHb = divide(GHloss, { Geeta: 1, Hrishikesh: 1 }, 's3_charge_vs b');
const GHnet = { Geeta: GH.ioc.Geeta - GHb.Geeta, Hrishikesh: GH.ioc.Hrishikesh - GHb.Hrishikesh };
same(GHa.Geeta, 32000, 'Geeta a'); same(GHnet.Geeta, 34000, 'Geeta b'); same(GHnet.Hrishikesh, 14000, 'Hrishikesh b');
QQ('s3_charge_vs', short({
  t: 4, d: 3, c: 'analysis', marks: 3,
  stem: `Geeta and Hrishikesh share profits equally in an imagined bookbinding firm in Kumbakonam. Interest on capital for 2025-26 works out to Geeta ${rs(GH.ioc.Geeta)} and Hrishikesh ${rs(GH.ioc.Hrishikesh)}. The profit before this interest is ${rs(GH.before)}. Find the net amount credited to each partner if interest on capital is treated (a) as an appropriation, (b) as a charge. Which treatment favours Geeta?`,
  model: [
    `**(a) Appropriation:** the profit of ${rs(GH.before)} is less than the interest of ${rs(sum(Object.values(GH.ioc)))}, so it is shared 2:1: Geeta **${rs(GHa.Geeta)}**, Hrishikesh **${rs(GHa.Hrishikesh)}**.`,
    `**(b) Charge:** full interest is credited and the resulting loss of ${rs(GHloss)} is shared equally (${rs(GHb.Geeta)} each): Geeta ${rs(GH.ioc.Geeta)} − ${rs(GHb.Geeta)} = **${rs(GHnet.Geeta)}**; Hrishikesh ${rs(GH.ioc.Hrishikesh)} − ${rs(GHb.Hrishikesh)} = **${rs(GHnet.Hrishikesh)}**.`,
    'Treating interest as a **charge** favours Geeta, the partner with the larger capital, because the loss it creates is shared equally.',
  ].join('\n\n'),
  sol: 'An appropriation is capped by the profit; a charge is allowed in full and any loss follows the profit-sharing ratio.',
  scheme: [['Appropriation case', 1], ['Charge case with the loss shared', 1], ['Conclusion', 1]],
}));
const JK = { names: ['Juhi', 'Kalpana'], ratio: { Juhi: 3, Kalpana: 1 }, cap: { Juhi: 200000, Kalpana: 100000 }, profit: 180000, salary: { Kalpana: 24000 }, iod: { Juhi: 1200, Kalpana: 800 } };
const JKioc = Object.fromEntries(JK.names.map((n) => [n, interest(JK.cap[n], 5)]));
const JKapp = appropriation({ names: JK.names, ratio: JK.ratio, profit: JK.profit, iod: JK.iod, ioc: JKioc, salary: JK.salary });
same(JKapp.divisible, 143000, 's3_approp_small divisible'); same(JKapp.shares.Juhi, 107250, 'Juhi share');
QQ('s3_approp_small', short({
  t: 4, d: 2, c: 'application', marks: 3,
  stem: `Juhi and Kalpana share profits 3:1 in an imagined saree-printing unit in Bagru. Capitals: ${rs(JK.cap.Juhi)} and ${rs(JK.cap.Kalpana)}; interest on capital 5% per annum; Kalpana's salary ${rs(JK.salary.Kalpana)} a year; interest on drawings Juhi ${rs(JK.iod.Juhi)} and Kalpana ${rs(JK.iod.Kalpana)}. The net profit for 2025-26 is ${rs(JK.profit)}. Prepare the Profit and Loss Appropriation Account.`,
  model: ['**Profit and Loss Appropriation Account** for the year ended 31 March 2026', JKapp.md, `Divisible profit ${rs(JKapp.divisible)} shared 3:1.`].join('\n\n'),
  sol: 'Credit profit and interest on drawings, debit the appropriations, divide the balance.',
  scheme: [['Interest on capital and salary debited', 1], ['Interest on drawings credited', 1], ['Divisible profit and shares', 1]],
}));
const KL = { names: ['Kailash', 'Lopa', 'Mukesh'], ratio: { Kailash: 5, Lopa: 3, Mukesh: 2 }, cap: { Kailash: 300000, Lopa: 250000, Mukesh: 150000 }, before: 385000, mgr: 10, rate: 8, salaryPm: 3000, commPct: 4, reservePct: 5, iod: { Kailash: 1500, Lopa: 1000, Mukesh: 500 } };
const KLm = commissionAfter(KL.before, KL.mgr);
const KLadj = plAdjust({ before: KL.before, beforeLabel: 'By Profit and Loss A/c (profit before manager\'s commission)', charges: [['To Manager\'s Commission (10% after charging)', KLm]] });
const KLioc = Object.fromEntries(KL.names.map((n) => [n, interest(KL.cap[n], KL.rate)]));
const KLcomm = { Mukesh: commissionBefore(KLadj.net, KL.commPct) };
const KLres = KLadj.net * KL.reservePct / 100;
const KLapp = appropriation({ names: KL.names, ratio: KL.ratio, profit: KLadj.net, iod: KL.iod, ioc: KLioc, salary: { Lopa: KL.salaryPm * 12 }, commission: KLcomm, reserve: KLres });
same(KLm, 35000, 'l5_approp_full manager'); same(KLapp.divisible, 229500, 'l5_approp_full divisible'); same(KLapp.shares.Kailash, 114750, 'Kailash share');
QQ('l5_approp_full', long({
  t: 4, d: 3, c: 'application', marks: 5,
  stem: `Kailash, Lopa and Mukesh share profits 5:3:2 in an imagined dairy-equipment firm in Bhusawal. For 2025-26 the profit before the manager's commission is ${rs(KL.before)}. The manager is entitled to ${KL.mgr}% of the net profit after charging his commission. The deed provides: interest on capitals (${KL.names.map((n) => rs(KL.cap[n])).join(', ')}) at ${KL.rate}% per annum; a salary to Lopa of ${rs(KL.salaryPm)} per month; a commission to Mukesh of ${KL.commPct}% of the net profit (after the manager's commission); ${KL.reservePct}% of that net profit to general reserve. Interest on drawings: ${KL.names.map((n) => `${n} ${rs(KL.iod[n])}`).join(', ')}. Prepare the Profit and Loss Adjustment Account and the Profit and Loss Appropriation Account.`,
  model: [
    `Working: manager's commission = ${rs(KL.before)} × 10/110 = ${rs(KLm)}; net profit ${rs(KLadj.net)}; Mukesh's commission ${rs(KLadj.net)} × 4% = ${rs(KLcomm.Mukesh)}; reserve ${rs(KLadj.net)} × 5% = ${rs(KLres)}.`,
    '**Profit and Loss Adjustment Account** for the year ended 31 March 2026',
    KLadj.md,
    '**Profit and Loss Appropriation Account** for the year ended 31 March 2026',
    KLapp.md,
  ].join('\n\n'),
  sol: 'The manager is paid before net profit is found; the partners\' items come out of that net profit.',
  scheme: [[`Manager's commission ${rs(KLm)} as a charge`, 1], ['Interest on capital and salary', 1], ['Commission and reserve on the net profit', 1], [`Divisible profit ${rs(KLapp.divisible)}`, 1], ['Shares 5:3:2', 1]],
}));
const RS2 = { ioc: { Rohini: 40000, Sushila: 20000 }, ratio: { Rohini: 2, Sushila: 3 }, before: 45000, loss: 20000 };
const RSa = divide(RS2.before, RS2.ioc, 'l5_charge_loss a');
const RSbLoss = sum(Object.values(RS2.ioc)) - RS2.before;
const RSb = divide(RSbLoss, RS2.ratio, 'l5_charge_loss b');
const RSc = divide(RS2.loss, RS2.ratio, 'l5_charge_loss c');
same(RSa.Rohini, 30000, 'Rohini a'); same(RSb.Rohini, 6000, 'Rohini b loss'); same(RSc.Sushila, 12000, 'Sushila c');
QQ('l5_charge_loss', long({
  t: 4, d: 4, c: 'analysis', marks: 5,
  stem: `Rohini and Sushila share profits 2:3 in an imagined handmade-paper firm in Sanganer, with capitals of ${rs(400000)} and ${rs(200000)}. Their deed allows interest on capital at 10% per annum. Show the amounts credited or debited to each partner for the year in each case: (a) interest on capital is an appropriation and the profit before interest is ${rs(RS2.before)}; (b) interest on capital is a charge and the profit before interest is ${rs(RS2.before)}; (c) interest on capital is an appropriation and the firm made a loss of ${rs(RS2.loss)} before interest.`,
  model: [
    `Interest due: Rohini ${rs(RS2.ioc.Rohini)}, Sushila ${rs(RS2.ioc.Sushila)}; total ${rs(sum(Object.values(RS2.ioc)))}.`,
    `**(a)** Profit ${rs(RS2.before)} is short of the interest, so it is shared in the ratio of interest, 2:1: Rohini **${rs(RSa.Rohini)}**, Sushila **${rs(RSa.Sushila)}**; no further profit to divide.`,
    `**(b)** Full interest is credited (${rs(RS2.ioc.Rohini)} and ${rs(RS2.ioc.Sushila)}); the loss of ${rs(RSbLoss)} is shared 2:3, so Rohini is debited ${rs(RSb.Rohini)} and Sushila ${rs(RSb.Sushila)}. Net: Rohini **${rs(RS2.ioc.Rohini - RSb.Rohini)}**, Sushila **${rs(RS2.ioc.Sushila - RSb.Sushila)}**.`,
    `**(c)** No interest on capital in a loss year; the loss of ${rs(RS2.loss)} is shared 2:3: Rohini debited **${rs(RSc.Rohini)}**, Sushila debited **${rs(RSc.Sushila)}**.`,
  ].join('\n\n'),
  sol: 'Decide first whether the interest is an appropriation or a charge, then whether there is profit to pay it from.',
  scheme: [['Interest due', 1], ['Case (a)', 1], ['Case (b): interest credited and loss shared', 2], ['Case (c)', 1]],
}));

// ================================================================ t05 Interest on drawings; charges against profit
QQ('m_rent', mcq({
  t: 5, d: 2, c: 'understanding',
  stem: `An imagined fruit-canning firm in Hajipur uses a godown owned by its partner Trupti and pays her ${rs(6000)} a month as rent. In the firm's books this rent is`,
  opts: ['a charge, debited to the Profit and Loss Account', 'an appropriation, debited to the Profit and Loss Appropriation Account', 'credited to the Profit and Loss Appropriation Account', 'debited to Trupti\'s current account'],
  sol: 'The firm would pay rent to any landlord, so rent to a partner is an expense of earning profit, payable even in a loss year.',
}));
QQ('m_iod_qbegin', mcq({
  t: 5, d: 1, c: 'recall',
  stem: `Vaibhav, a partner in an imagined firm in Jamnagar, draws ${rs(9000)} on 1 April, 1 July, 1 October and 1 January. For interest on his drawings, the average period is`,
  opts: [`${mo(avgMonths(4, 'begin'))} months`, `${mo(avgMonths(4, 'end'))} months`, '6 months', `${mo(avgMonths(12, 'begin'))} months`],
  sol: 'The four drawings stay out for 12, 9, 6 and 3 months; their average is (12 + 3) ÷ 2 = 7½ months.',
}));
const UM = iodEqual({ amount: 30000, n: 2, when: 'end', rate: 10 });
same(UM.interest, 1500, 'm_iod_halfend');
QQ('m_iod_halfend', mcq({
  t: 5, d: 2, c: 'application',
  stem: `Umesh draws ${rs(30000)} on 30 September 2025 and again on 31 March 2026 from an imagined firm in Rohtak. Interest on drawings is 10% per annum. The interest charged to him for 2025-26 is`,
  opts: [rs(UM.interest), rs(interest(UM.total, 10, 9)), rs(interest(UM.total, 10, 6)), rs(interest(UM.total, 10))],
  sol: `The first drawing is out for 6 months and the second for none, an average of 3 months: ${rs(UM.total)} × 10/100 × 3/12 = ${rs(UM.interest)}.`,
}));
QQ('m_loan_loss', mcq({
  t: 5, d: 2, c: 'application',
  stem: `Zeenat lent ${rs(100000)} to an imagined firm in Kasaragod at an agreed 9% per annum. For 2025-26 the firm made a loss of ${rs(40000)} before this interest. The interest of ${rs(9000)} on her loan`,
  opts: [`is debited to the Profit and Loss Account, raising the loss to ${rs(49000)}`, 'is not payable, because the firm made a loss', 'is debited to the Profit and Loss Appropriation Account', 'is paid only when the firm next earns a profit'],
  sol: 'Interest on a partner\'s loan is a charge against profit, payable whatever the result of the year.',
}));
QQ('m_iod_nodate', mcq({
  t: 5, d: 1, c: 'recall',
  stem: 'The deed of an imagined firm in Solan charges interest on drawings, but only each partner\'s total drawings for the year are known, not their dates. Interest is charged for',
  opts: ['6 months on the total drawings', '12 months on the total drawings', '6½ months on the total drawings', 'no period: no interest can be charged without dates'],
  sol: 'When dates are unknown, drawings are assumed to be spread evenly over the year, so interest is charged for an average of six months.',
}));
QQ('ar_iod_income', ar({
  t: 5, d: 3, c: 'analysis', key: 'c',
  a: 'Interest on drawings is charged to the partners of a firm only if their partnership deed provides for it.',
  r: 'Interest on drawings is an income of the firm and is credited to its Profit and Loss Account.',
  sol: 'A is true. R is false: interest on drawings is recovered from partners and credited to the Profit and Loss Appropriation Account, adjusting their shares.',
}));
QQ('ar_rent', ar({
  t: 5, d: 2, c: 'understanding', key: 'a',
  a: 'Rent paid to a partner for premises used by the firm is debited to the Profit and Loss Account, not to the Profit and Loss Appropriation Account.',
  r: 'Rent paid to a partner is a charge against profit, payable whether or not the firm earns a profit.',
  sol: 'Both are true, and R explains A: being a charge, the rent is an expense found before net profit.',
}));
QQ('tf_iod_cr', tf({
  t: 5, d: 1, c: 'understanding', ans: true,
  stem: 'True or false? Interest charged on partners\' drawings under the deed is credited to the Profit and Loss Appropriation Account and debited to the partners.',
  sol: 'It increases the profit available for division and is recovered from each partner through the capital or current account.',
}));
QQ('fb_product', fb({
  t: 5, d: 1, c: 'recall',
  stem: 'When a partner withdraws different amounts on different dates, interest on her drawings is worked out by the ___ method.',
  acc: [['product']],
  sol: 'The product method multiplies each amount by the months it stays out and charges one month\'s interest on the total.',
}));
const SN = iodProduct(10, [[15000, 10], [10000, 5], [20000, 2]]);
same(SN.interest, 2000, 'n_iod_product');
QQ('n_iod_product', numQ({
  t: 5, d: 3, c: 'application', value: SN.interest,
  stem: `Snehal, a partner in an imagined firm in Nadiad, withdrew ${rs(15000)} on 1 June 2025, ${rs(10000)} on 1 November 2025 and ${rs(20000)} on 1 February 2026. Interest on drawings is 10% per annum and the year ends on 31 March 2026. Using the product method, find the interest (in ₹).`,
  sol: `Months to 31 March: 10, 5 and 2. Products ${SN.products.map(inr).join(' + ')} = ${inr(SN.total)}. Interest = ${inr(SN.total)} × 10/100 × 1/12 = ${rs(SN.interest)}.`,
}));
const SK = iodSpan({ amount: 5000, count: 6, first: 11, last: 6, rate: 12 });
same(SK.interest, 2550, 'n_iod_span');
QQ('n_iod_span', numQ({
  t: 5, d: 3, c: 'application', value: SK.interest,
  stem: `Shekhar, a partner in an imagined firm in Junagadh, withdrew ${rs(5000)} at the **end** of each month from April to September 2025. Interest on drawings is 12% per annum; the year ends on 31 March 2026. Find the interest on his drawings (in ₹).`,
  sol: `First drawing out 11 months, last 6; average = (11 + 6) ÷ 2 = ${mo(SK.months)} months. Interest = ${inr(SK.total)} × 12/100 × 8.5/12 = ${rs(SK.interest)}.`,
}));
QQ('s2_charge_appro', short({
  t: 5, d: 1, c: 'understanding', marks: 2,
  stem: 'The accountant of an imagined firm in Ballia is unsure whether rent paid to a partner and a partner\'s salary belong in the same account. Distinguish between a charge against profit and an appropriation of profit on two bases.',
  model: mdTable(['Basis', 'Charge against profit', 'Appropriation of profit'], [
    ['Account', 'Debited to the Profit and Loss Account', 'Debited to the Profit and Loss Appropriation Account'],
    ['Profit needed?', 'Allowed even if the firm makes a loss', 'Allowed only out of profit'],
    ['Examples', 'Rent to a partner, interest on a partner\'s loan, manager\'s commission', 'Partner\'s salary, interest on capital, transfer to reserve'],
  ]),
  sol: 'Any two bases; rent to a partner is a charge and a partner\'s salary is an appropriation.',
  scheme: [['First basis', 1], ['Second basis', 1]],
}));
const AL = iodEqual({ amount: 15000, n: 4, when: 'begin', rate: 8 });
same(AL.interest, 3000, 's2_iod_quarter');
QQ('s2_iod_quarter', short({
  t: 5, d: 2, c: 'application', marks: 2,
  stem: `Alok withdrew ${rs(15000)} at the **beginning** of every quarter of 2025-26 from an imagined printing firm in Gaya. Interest on drawings is 8% per annum. Calculate the interest on his drawings, showing the average period.`,
  model: `Total drawings = ${rs(15000)} × 4 = ${rs(AL.total)}. Drawings are out for 12, 9, 6 and 3 months; average period = (12 + 3) ÷ 2 = ${mo(AL.months)} months.\n\nInterest = ${rs(AL.total)} × 8/100 × 7.5/12 = **${rs(AL.interest)}**.`,
  sol: 'Average the months outstanding of the first and last drawing.',
  scheme: [[`Average period ${mo(AL.months)} months`, 1], [`Interest ${rs(AL.interest)}`, 1]],
}));
QQ('s2_why_65', short({
  t: 5, d: 3, c: 'analysis', marks: 2,
  stem: 'A partner draws an equal sum every month. Explain why interest on drawings is charged for an average period of 6½ months if he draws at the beginning of each month, but 5½ months if he draws at the end.',
  model: [
    '1. **Beginning of each month:** the first drawing (1 April) is out for 12 months and the last (1 March) for 1 month. Equal drawings at equal intervals average (12 + 1) ÷ 2 = 6½ months.',
    '2. **End of each month:** the first drawing (30 April) is out for 11 months and the last (31 March) for none, so the average is (11 + 0) ÷ 2 = 5½ months.',
  ].join('\n'),
  sol: 'Average period = (months outstanding for the first drawing + for the last) ÷ 2.',
  scheme: [['Beginning case explained', 1], ['End case explained', 1]],
}));
const BH = iodProduct(9, [[20000, 11], [12000, 8], [18000, 6], [10000, 2]]);
same(BH.interest, 3330, 's3_product');
const BHdates = ['1 May 2025', '31 July 2025', '1 October 2025', '31 January 2026'];
QQ('s3_product', short({
  t: 5, d: 3, c: 'application', marks: 3,
  stem: `Bharati, a partner in an imagined firm in Purnia, withdrew ${rs(20000)} on 1 May 2025, ${rs(12000)} on 31 July 2025, ${rs(18000)} on 1 October 2025 and ${rs(10000)} on 31 January 2026. Interest on drawings is 9% per annum, and the year ends on 31 March 2026. Calculate the interest by the product method.`,
  model: [
    mdTable(['Date', 'Amount (₹)', 'Months to 31 March', 'Product (₹)'], [
      ...BHdates.map((d, i) => [d, inr([20000, 12000, 18000, 10000][i]), String([11, 8, 6, 2][i]), inr(BH.products[i])]),
      ['**Total**', '', '', `**${inr(BH.total)}**`],
    ]),
    `Interest = ${rs(BH.total)} × 9/100 × 1/12 = **${rs(BH.interest)}**.`,
  ].join('\n\n'),
  sol: 'Months are counted from each withdrawal to the year end.',
  scheme: [['Months for each drawing', 1], ['Products and total', 1], [`Interest ${rs(BH.interest)}`, 1]],
}));
const PI = { before: 210000, loan: 100000, loanRate: 8, rentPm: 3000 };
const PIadj = plAdjust({ before: PI.before, charges: [[`To Interest on Ilyas's Loan (8%)`, interest(PI.loan, PI.loanRate)], ['To Rent: Pushpa', PI.rentPm * 12]] });
const PIsh = divide(PIadj.net, { Pushpa: 1, Ilyas: 1 }, 's3_pl_adjust shares');
same(PIadj.net, 166000, 's3_pl_adjust net');
QQ('s3_pl_adjust', short({
  t: 5, d: 2, c: 'application', marks: 3,
  stem: `Pushpa and Ilyas share profits equally in an imagined bakery-supplies firm in Gorakhpur. The profit for 2025-26 before the following items is ${rs(PI.before)}: (i) Ilyas's loan of ${rs(PI.loan)} to the firm carries interest at an agreed ${PI.loanRate}% per annum for the whole year; (ii) the firm uses Pushpa's shop and pays her rent of ${rs(PI.rentPm)} per month. Prepare the Profit and Loss Adjustment Account and find each partner's share of profit.`,
  model: ['**Profit and Loss Adjustment Account** for the year ended 31 March 2026', PIadj.md, `Net profit ${rs(PIadj.net)} shared equally: **${rs(PIsh.Pushpa)}** each.`].join('\n\n'),
  sol: 'Both items are charges, so they come off before the net profit is divided.',
  scheme: [['Loan interest as a charge', 1], ['Rent as a charge', 1], ['Net profit and shares', 1]],
}));
const UI = { names: ['Urvashi', 'Indrajit'], ratio: { Urvashi: 3, Indrajit: 2 }, before: 429000, loan: 300000, loanMonths: 9, rentPm: 4000, mgrPct: 5, cap: { Urvashi: 400000, Indrajit: 300000 }, salary: { Indrajit: 30000 } };
const UIloan = interest(UI.loan, 6, UI.loanMonths);
const UIrent = UI.rentPm * 12;
const UImgr = commissionAfter(UI.before - UIloan - UIrent, UI.mgrPct);
const UIadj = plAdjust({ before: UI.before, charges: [[`To Interest on Indrajit's Loan (6% for 9 months)`, UIloan], ['To Rent: Urvashi', UIrent], ['To Manager\'s Commission', UImgr]] });
const UIioc = Object.fromEntries(UI.names.map((n) => [n, interest(UI.cap[n], 5)]));
const UIapp = appropriation({ names: UI.names, ratio: UI.ratio, profit: UIadj.net, ioc: UIioc, salary: UI.salary });
same(UIloan, 13500, 'l5_charges loan'); same(UImgr, 17500, 'l5_charges manager'); same(UIadj.net, 350000, 'l5_charges net'); same(UIapp.shares.Urvashi, 171000, 'Urvashi share');
QQ('l5_charges', long({
  t: [5, 4], d: 3, c: 'application', marks: 5,
  stem: `Urvashi and Indrajit share profits 3:2 in an imagined electronics-repair firm in Itanagar. The profit for 2025-26 before the items below is ${rs(UI.before)}. (i) Indrajit lent the firm ${rs(UI.loan)} on 1 July 2025; no rate of interest was agreed. (ii) The firm uses Urvashi's building at a rent of ${rs(UI.rentPm)} per month. (iii) The manager gets ${UI.mgrPct}% of the profit left after items (i) and (ii), after charging his commission. (iv) The deed allows interest on capitals (${rs(UI.cap.Urvashi)} and ${rs(UI.cap.Indrajit)}) at 5% and a salary of ${rs(UI.salary.Indrajit)} a year to Indrajit. Prepare the Profit and Loss Adjustment Account and the Profit and Loss Appropriation Account.`,
  model: [
    `Working: loan interest at the Act's 6% for 9 months = ${rs(UIloan)}; rent ${rs(UIrent)}; profit left ${rs(UI.before - UIloan - UIrent)}; manager's commission = ${rs(UI.before - UIloan - UIrent)} × 5/105 = ${rs(UImgr)}.`,
    '**Profit and Loss Adjustment Account** for the year ended 31 March 2026',
    UIadj.md,
    '**Profit and Loss Appropriation Account** for the year ended 31 March 2026',
    UIapp.md,
  ].join('\n\n'),
  sol: 'Charges (loan interest, rent, manager) fix the net profit; appropriations then divide it.',
  scheme: [[`Loan interest at 6% for 9 months = ${rs(UIloan)}`, 1], ['Rent as a charge', 1], [`Manager's commission ${rs(UImgr)}`, 1], ['Interest on capital and salary', 1], ['Divisible profit and shares 3:2', 1]],
}));

// ================================================================ t06 Guarantee of profits
const NO = guarantee({ amount: 150000, ratio: { Nupur: 2, Omprakash: 2, Rituparna: 1 }, guaranteed: 'Rituparna', min: 40000, bearers: { Omprakash: 1 } });
same(NO.deficiency, 10000, 'm_guar_partner');
QQ('m_guar_partner', mcq({
  t: 6, d: 2, c: 'understanding',
  stem: `Nupur, Omprakash and Rituparna share profits 2:2:1 in an imagined pottery studio in Nizamabad. **Omprakash alone** has guaranteed Rituparna a minimum profit of ${rs(40000)}. The profit for the year is ${rs(150000)}. Rituparna's deficiency of ${rs(NO.deficiency)} is borne by`,
  opts: ['Omprakash alone', 'Nupur and Omprakash equally', 'all three partners in 2:2:1', 'Nupur alone'],
  sol: `Rituparna's share is ${rs(NO.normal.Rituparna)}, short of the minimum. Whoever gave the guarantee bears the whole deficiency, so Omprakash's share falls to ${rs(NO.final.Omprakash)}.`,
}));
const SS = guarantee({ amount: 120000, ratio: { Sarthak: 3, Shobha: 2, Tarini: 1 }, guaranteed: 'Tarini', min: 30000, bearers: { Sarthak: 3, Shobha: 2 } });
same(SS.final.Sarthak, 54000, 'm_guar_firm');
QQ('m_guar_firm', mcq({
  t: 6, d: 3, c: 'application',
  stem: `Sarthak, Shobha and Tarini share profits 3:2:1 in an imagined firm in Latur. **The firm** guarantees Tarini a minimum profit of ${rs(30000)}. The profit for 2025-26 is ${rs(120000)}. Sarthak's final share of profit is`,
  opts: [rs(SS.final.Sarthak), rs(SS.normal.Sarthak - SS.deficiency / 2), rs(SS.normal.Sarthak - SS.deficiency), rs(SS.normal.Sarthak)],
  sol: `Tarini's share is ${rs(SS.normal.Tarini)}, a deficiency of ${rs(SS.deficiency)}. A guarantee by the firm is borne by the other partners in their ratio, 3:2: Sarthak bears ${rs(SS.borne.Sarthak)}, so he gets ${rs(SS.normal.Sarthak)} − ${rs(SS.borne.Sarthak)} = ${rs(SS.final.Sarthak)}.`,
}));
const HG = guarantee({ amount: 240000, ratio: { Hamid: 2, Ishwari: 2, Gauhar: 1 }, guaranteed: 'Gauhar', min: 40000, bearers: { Hamid: 1, Ishwari: 1 } });
same(HG.deficiency, 0, 'm_guar_nodef');
QQ('m_guar_nodef', mcq({
  t: 6, d: 2, c: 'application',
  stem: `Hamid, Ishwari and Gauhar share profits 2:2:1 in an imagined perfume firm in Rampur. Gauhar is guaranteed a minimum profit of ${rs(40000)} by Hamid and Ishwari. The profit for the year is ${rs(240000)}. Gauhar will be credited with`,
  opts: [`${rs(HG.final.Gauhar)}, his normal share, as there is no deficiency`, `${rs(40000)}, the guaranteed minimum`, `${rs(HG.normal.Gauhar + 40000)}, his share plus the guarantee`, `${rs(HG.normal.Gauhar - 40000)}, the excess over the minimum`],
  sol: `His share is ${rs(240000)} × 1/5 = ${rs(HG.normal.Gauhar)}, more than the minimum, so the guarantee does not operate.`,
}));
QQ('ar_guar_total', ar({
  t: 6, d: 3, c: 'analysis', key: 'd',
  a: 'When a partner is guaranteed a minimum profit, the total profit of the firm increases by the amount of the deficiency.',
  r: 'The deficiency of a guaranteed partner is borne by the partner or partners who gave the guarantee, out of their own shares.',
  sol: 'A is false: the deficiency only moves from the guarantors\' shares to the guaranteed partner, so the firm\'s total profit is unchanged. R is true.',
}));
QQ('tf_guar_loss', tf({
  t: 6, d: 2, c: 'understanding', ans: true,
  stem: `True or false? Jayant has been guaranteed a minimum profit of ${rs(50000)} a year by his partners in an imagined firm in Kollam. If the firm suffers a loss, Jayant is still credited with ${rs(50000)}, and the guarantors bear his share of the loss as well.`,
  sol: 'An unconditional guarantee holds in a loss year too: the deficiency is the minimum plus his share of the loss, and it is borne by those who gave the guarantee.',
}));
const RM = guarantee({ amount: 180000, ratio: { Ritwik: 3, Manjiri: 2, Benazir: 1 }, guaranteed: 'Benazir', min: 40000, bearers: { Ritwik: 2, Manjiri: 3 } });
same(RM.final.Manjiri, 54000, 'n_guar_two');
QQ('n_guar_two', numQ({
  t: 6, d: 3, c: 'application', value: RM.final.Manjiri,
  stem: `Ritwik, Manjiri and Benazir share profits 3:2:1 in an imagined firm in Hazaribagh. Ritwik and Manjiri have guaranteed Benazir a minimum profit of ${rs(40000)}, any deficiency to be borne by them in the ratio 2:3. The profit for the year is ${rs(180000)}. Find Manjiri's final share of profit (in ₹).`,
  sol: `Benazir's share = ${rs(RM.normal.Benazir)}; deficiency ${rs(RM.deficiency)}, of which Manjiri bears 3/5 = ${rs(RM.borne.Manjiri)}. Manjiri: ${inr(RM.normal.Manjiri)} − ${inr(RM.borne.Manjiri)} = ${rs(RM.final.Manjiri)}.`,
}));
const GJ = guarantee({ amount: 150000, ratio: { Gurpreet: 5, Harleen: 3, Jaswinder: 2 }, guaranteed: 'Jaswinder', min: 40000, bearers: { Gurpreet: 1 } });
same(GJ.final.Gurpreet, 65000, 's2_guar_one');
QQ('s2_guar_one', short({
  t: 6, d: 2, c: 'application', marks: 2,
  stem: `Gurpreet, Harleen and Jaswinder share profits 5:3:2 in an imagined dairy firm in Sonipat. Gurpreet personally guaranteed Jaswinder a minimum profit of ${rs(40000)}. The profit for 2025-26 is ${rs(150000)}. Show the final division of profit.`,
  model: mdTable(['Particulars', 'Gurpreet (₹)', 'Harleen (₹)', 'Jaswinder (₹)'], [
    ['Share of profit 5:3:2', inr(GJ.normal.Gurpreet), inr(GJ.normal.Harleen), inr(GJ.normal.Jaswinder)],
    ['Deficiency borne by Gurpreet', `− ${inr(GJ.deficiency)}`, '—', `+ ${inr(GJ.deficiency)}`],
    ['**Final share**', `**${inr(GJ.final.Gurpreet)}**`, `**${inr(GJ.final.Harleen)}**`, `**${inr(GJ.final.Jaswinder)}**`],
  ]),
  sol: 'Only the guarantor\'s share changes.',
  scheme: [[`Deficiency ${rs(GJ.deficiency)}`, 1], ['Final shares', 1]],
}));
const TP = { names: ['Tsering', 'Phurba', 'Lhamo'], ratio: { Tsering: 2, Phurba: 2, Lhamo: 1 }, cap: { Tsering: 200000, Phurba: 200000, Lhamo: 100000 }, profit: 180000, min: 35000 };
const TPioc = Object.fromEntries(TP.names.map((n) => [n, interest(TP.cap[n], 10)]));
const TPdiv = TP.profit - sum(Object.values(TPioc));
const TPg = guarantee({ amount: TPdiv, ratio: TP.ratio, guaranteed: 'Lhamo', min: TP.min, bearers: { Tsering: 2, Phurba: 2 } });
const TPapp = appropriation({ names: TP.names, ratio: TP.ratio, profit: TP.profit, ioc: TPioc, shares: TPg.final, shareLabel: (n) => (TPg.borne[n] ? `To ${acct(n)} (${inr(TPg.normal[n])} − ${inr(TPg.borne[n])})` : n === 'Lhamo' ? `To ${acct(n)} (${inr(TPg.normal[n])} + ${inr(TPg.deficiency)})` : `To ${acct(n)}`) });
same(TPdiv, 130000, 's3_guar_approp divisible'); same(TPg.final.Tsering, 47500, 'Tsering final');
QQ('s3_guar_approp', short({
  t: [6, 4], d: 3, c: 'application', marks: 3,
  stem: `Tsering, Phurba and Lhamo share profits 2:2:1 in an imagined homestay business in Tawang, with capitals of ${TP.names.map((n) => rs(TP.cap[n])).join(', ')}. Interest on capital is allowed at 10% per annum. The **firm** guarantees Lhamo that her share of profit, after interest on capital, will not be less than ${rs(TP.min)}. The net profit for 2025-26 is ${rs(TP.profit)}. Prepare the Profit and Loss Appropriation Account.`,
  model: [
    `Working: divisible profit = ${rs(TP.profit)} − ${rs(sum(Object.values(TPioc)))} = ${rs(TPdiv)}; Lhamo's share ${rs(TPg.normal.Lhamo)}, deficiency ${rs(TPg.deficiency)} borne by Tsering and Phurba 2:2 (${rs(TPg.borne.Tsering)} each).`,
    '**Profit and Loss Appropriation Account** for the year ended 31 March 2026',
    TPapp.md,
  ].join('\n\n'),
  sol: 'The guarantee applies to the share of divisible profit, so interest on capital comes first.',
  scheme: [['Interest on capital and divisible profit', 1], ['Deficiency shared 2:2', 1], ['Appropriation account', 1]],
}));
const AB = { names: ['Anupama', 'Basavaraj', 'Chinmayi'], ratio: { Anupama: 5, Basavaraj: 3, Chinmayi: 2 }, cap: { Anupama: 300000, Basavaraj: 200000, Chinmayi: 100000 }, profit: 300000, salary: { Chinmayi: 24000 }, min: 60000 };
const ABioc = Object.fromEntries(AB.names.map((n) => [n, interest(AB.cap[n], 6)]));
const ABdiv = AB.profit - sum(Object.values(ABioc)) - AB.salary.Chinmayi;
const ABg = guarantee({ amount: ABdiv, ratio: AB.ratio, guaranteed: 'Chinmayi', min: AB.min, bearers: { Anupama: 3, Basavaraj: 1 } });
const ABapp = appropriation({ names: AB.names, ratio: AB.ratio, profit: AB.profit, ioc: ABioc, salary: AB.salary, shares: ABg.final, shareLabel: (n) => (ABg.borne[n] ? `To ${acct(n)} (${inr(ABg.normal[n])} − ${inr(ABg.borne[n])})` : `To ${acct(n)} (${inr(ABg.normal[n])} + ${inr(ABg.deficiency)})`) });
same(ABdiv, 240000, 'l5_guar_ioc divisible'); same(ABg.deficiency, 12000, 'l5_guar_ioc deficiency'); same(ABg.final.Anupama, 111000, 'Anupama final'); same(ABg.final.Basavaraj, 69000, 'Basavaraj final');
QQ('l5_guar_ioc', long({
  t: [6, 4], d: 4, c: 'application', marks: 5,
  stem: `Anupama, Basavaraj and Chinmayi share profits 5:3:2 in an imagined silk-reeling firm in Ramanagara. Capitals: ${AB.names.map((n) => rs(AB.cap[n])).join(', ')}. The deed allows interest on capital at 6% per annum and a salary of ${rs(AB.salary.Chinmayi)} a year to Chinmayi. Anupama and Basavaraj have guaranteed that Chinmayi's share of profit, after interest and salary, will be at least ${rs(AB.min)}; any deficiency is to be borne by them in the ratio 3:1. The net profit for 2025-26 is ${rs(AB.profit)}. Prepare the Profit and Loss Appropriation Account.`,
  model: [
    `Working: interest on capital ${AB.names.map((n) => rs(ABioc[n])).join(', ')}; divisible profit = ${rs(AB.profit)} − ${rs(sum(Object.values(ABioc)))} − ${rs(AB.salary.Chinmayi)} = ${rs(ABdiv)}.`,
    `Shares 5:3:2: ${AB.names.map((n) => rs(ABg.normal[n])).join(', ')}. Chinmayi's deficiency = ${rs(AB.min)} − ${rs(ABg.normal.Chinmayi)} = ${rs(ABg.deficiency)}: Anupama bears ${rs(ABg.borne.Anupama)} and Basavaraj ${rs(ABg.borne.Basavaraj)} (3:1).`,
    '**Profit and Loss Appropriation Account** for the year ended 31 March 2026',
    ABapp.md,
  ].join('\n\n'),
  sol: 'Find the divisible profit, divide it normally, then move the deficiency from the guarantors in their agreed ratio.',
  scheme: [['Interest on capital and salary', 1], [`Divisible profit ${rs(ABdiv)}`, 1], ['Normal shares 5:3:2', 1], ['Deficiency borne 3:1', 1], ['Appropriation account with final shares', 1]],
}));
const MNS = { ratio: { Mahua: 2, Nilanjana: 2, Sohini: 1 }, min: 50000, bearers: { Mahua: 3, Nilanjana: 2 } };
const MN1 = guarantee({ amount: 200000, guaranteed: 'Sohini', ...MNS });
const MN2 = guarantee({ amount: 300000, guaranteed: 'Sohini', ...MNS });
const MN3 = guarantee({ amount: -50000, guaranteed: 'Sohini', ...MNS });
same(MN1.final.Mahua, 74000, 'year 1 Mahua'); same(MN2.deficiency, 0, 'year 2 none'); same(MN3.deficiency, 60000, 'year 3 deficiency'); same(MN3.final.Mahua, -56000, 'year 3 Mahua');
const MNrow = (g) => ['Mahua', 'Nilanjana', 'Sohini'].map((n) => inr(g.final[n]));
QQ('l5_guar_years', long({
  t: 6, d: 4, c: 'analysis', marks: 5,
  stem: `Mahua, Nilanjana and Sohini share profits 2:2:1 in an imagined tea-tasting agency in Jorhat. Mahua and Nilanjana have guaranteed Sohini a minimum of ${rs(MNS.min)} a year, any deficiency to be borne by them in the ratio 3:2. Show how the result is shared in each of three years: (a) a profit of ${rs(200000)}; (b) a profit of ${rs(300000)}; (c) a loss of ${rs(50000)}.`,
  model: [
    `**(a)** Sohini's share ${rs(MN1.normal.Sohini)}; deficiency ${rs(MN1.deficiency)}, borne ${rs(MN1.borne.Mahua)} by Mahua and ${rs(MN1.borne.Nilanjana)} by Nilanjana.`,
    `**(b)** Sohini's share ${rs(MN2.normal.Sohini)} exceeds the minimum, so there is no deficiency.`,
    `**(c)** Sohini's share of the loss is ${rs(-MN3.normal.Sohini)}, yet she must receive ${rs(MNS.min)}: deficiency = ${rs(MNS.min)} + ${rs(-MN3.normal.Sohini)} = ${rs(MN3.deficiency)}, borne ${rs(MN3.borne.Mahua)} by Mahua and ${rs(MN3.borne.Nilanjana)} by Nilanjana.`,
    mdTable(['Year', 'Mahua (₹)', 'Nilanjana (₹)', 'Sohini (₹)', 'Firm (₹)'], [
      ['(a) Profit', ...MNrow(MN1), inr(200000)],
      ['(b) Profit', ...MNrow(MN2), inr(300000)],
      ['(c) Loss (negative = debit)', ...MNrow(MN3), inr(-50000)],
    ]),
  ].join('\n\n'),
  sol: 'The deficiency is always the minimum less the normal share, even when the normal share is a loss; the row totals never change.',
  scheme: [['Year (a) deficiency and its division', 2], ['Year (b) no deficiency', 1], ['Year (c) deficiency including the share of loss', 2]],
}));

// ================================================================ t07 Past adjustments
QQ('m_past_zero', mcq({
  t: 7, d: 1, c: 'understanding',
  stem: 'After correcting last year\'s omitted interest on capital in a past-adjustment table, the net effects of all the partners taken together always total',
  opts: ['zero', 'the amount of interest omitted', 'the net profit of the year', 'the total of the partners\' capitals'],
  sol: 'The firm\'s profit for the year is unchanged; the adjustment only moves amounts from some partners to others.',
}));
const TI = { names: ['Tapas', 'Ibrahim'], cap: { Tapas: 200000, Ibrahim: 100000 } };
const TIioc = Object.fromEntries(TI.names.map((n) => [n, interest(TI.cap[n], 10)]));
const TIadj = pastAdjustment({ names: TI.names, lines: [['Interest on capital omitted', TIioc], ['Taken back equally', neg(divide(sum(Object.values(TIioc)), { Tapas: 1, Ibrahim: 1 }))]] });
same(TIadj.net.Tapas, 5000, 'm_past_entry');
QQ('m_past_entry', mcq({
  t: 7, d: 3, c: 'application',
  stem: `Tapas and Ibrahim share profits equally in an imagined firm in Ghazipur, with capitals of ${rs(TI.cap.Tapas)} and ${rs(TI.cap.Ibrahim)}. After the 2025-26 accounts were closed, they found that interest on capital at 10% per annum had been omitted. The adjusting entry is`,
  opts: [`Ibrahim's Capital A/c Dr. ${rs(5000)}; To Tapas's Capital A/c ${rs(5000)}`, `Tapas's Capital A/c Dr. ${rs(5000)}; To Ibrahim's Capital A/c ${rs(5000)}`, `Profit and Loss Appropriation A/c Dr. ${rs(30000)}; To partners' capital accounts ${rs(30000)}`, `Ibrahim's Capital A/c Dr. ${rs(10000)}; To Tapas's Capital A/c ${rs(10000)}`],
  sol: `Tapas should get ${rs(TIioc.Tapas)} and Ibrahim ${rs(TIioc.Ibrahim)}; the ${rs(30000)} must come back from them equally (${rs(15000)} each). Net: Tapas gains ${rs(5000)}, Ibrahim loses ${rs(5000)}.`,
}));
QQ('ar_past', ar({
  t: 7, d: 2, c: 'understanding', key: 'b',
  a: 'When a firm keeps fluctuating capitals, a past adjustment is recorded through the partners\' capital accounts.',
  r: 'A past adjustment does not change the total of the partners\' capitals; it only transfers amounts between partners.',
  sol: 'Both are true, but R does not explain A. A follows from the fluctuating method, under which every adjustment is recorded in the capital account.',
}));
QQ('tf_past_reopen', tf({
  t: 7, d: 1, c: 'understanding', ans: false,
  stem: 'True or false? To correct the salary omitted for Manisha last year, her firm\'s accountant must reopen last year\'s Profit and Loss Appropriation Account and prepare it again.',
  sol: 'Closed accounts are not reopened; the net effect on each partner is put right by one adjustment entry between partners\' accounts.',
}));
QQ('fb_past', fb({
  t: 7, d: 1, c: 'recall',
  stem: 'Errors in the distribution of a profit already closed to partners\' accounts are corrected by passing a single ___ entry between the partners\' capital or current accounts.',
  acc: [['adjustment', 'adjusting', 'rectifying']],
  sol: 'A single adjustment entry debits the partners who gained and credits those who lost.',
}));
const RSS = { names: ['Revathi', 'Senthil', 'Selvi'], cap: { Revathi: 300000, Senthil: 150000, Selvi: 150000 } };
const RSSioc = Object.fromEntries(RSS.names.map((n) => [n, interest(RSS.cap[n], 8)]));
const RSSadj = pastAdjustment({ names: RSS.names, lines: [['Interest on capital omitted', RSSioc], ['Taken back equally', neg(divide(sum(Object.values(RSSioc)), { Revathi: 1, Senthil: 1, Selvi: 1 }))]] });
same(RSSadj.net.Revathi, 8000, 'n_past');
QQ('n_past', numQ({
  t: 7, d: 3, c: 'application', value: RSSadj.net.Revathi,
  stem: `Revathi, Senthil and Selvi share profits equally in an imagined textile firm in Tirunelveli, with capitals of ${RSS.names.map((n) => rs(RSS.cap[n])).join(', ')}. After the year's profit was distributed, they found that interest on capital at 8% per annum had been omitted. By how much must Revathi's capital account be credited in the adjustment entry (in ₹)?`,
  sol: `Interest: ${RSS.names.map((n) => inr(RSSioc[n])).join(', ')}; total ${inr(sum(Object.values(RSSioc)))} taken back equally, ${inr(sum(Object.values(RSSioc)) / 3)} each. Revathi: ${inr(RSSioc.Revathi)} − ${inr(sum(Object.values(RSSioc)) / 3)} = ${rs(RSSadj.net.Revathi)}.`,
}));
const ASN = { names: ['Afreen', 'Sabeena', 'Noor'], profit: 120000, ratio: { Afreen: 3, Sabeena: 2, Noor: 1 } };
const ASNadj = pastAdjustment({ names: ASN.names, lines: [['Profit that should have been credited (3:2:1)', divide(ASN.profit, ASN.ratio)], ['Less: profit actually credited (equally)', neg(divide(ASN.profit, { Afreen: 1, Sabeena: 1, Noor: 1 }))]], note: 'Being profit wrongly shared, now adjusted' });
same(ASNadj.net.Afreen, 20000, 's2_past_ratio');
QQ('s2_past_ratio', short({
  t: 7, d: 2, c: 'application', marks: 2,
  stem: `The profit of ${rs(ASN.profit)} of an imagined embroidery firm in Barabanki for 2025-26 was credited equally to Afreen, Sabeena and Noor, although their deed fixes the ratio at 3:2:1. Pass the single adjustment entry, showing your working.`,
  model: [ASNadj.md, ASNadj.entry.md].join('\n\n'),
  sol: 'Compare what each should have received with what each received.',
  scheme: [['Working table with net effects', 1], ['Adjustment entry', 1]],
}));
const KM = { names: ['Kashish', 'Mitali'], ratio: { Kashish: 3, Mitali: 2 }, cap: { Kashish: 500000, Mitali: 300000 }, salaryPm: 2000 };
const KMioc = Object.fromEntries(KM.names.map((n) => [n, interest(KM.cap[n], 6)]));
const KMtot = sum(Object.values(KMioc)) + KM.salaryPm * 12;
const KMadj = pastAdjustment({ names: KM.names, acct: 'Current', note: 'Being interest on capital and salary omitted, now adjusted', lines: [['Interest on capital at 6%', KMioc], ['Salary to Mitali', { Mitali: KM.salaryPm * 12 }], [`${inr(KMtot)} taken back 3:2`, neg(divide(KMtot, KM.ratio))]] });
same(KMadj.net.Mitali, 13200, 's3_past_sal_ioc');
QQ('s3_past_sal_ioc', short({
  t: 7, d: 3, c: 'application', marks: 3,
  stem: `Kashish and Mitali share profits 3:2 in an imagined bicycle-accessories firm in Bhiwandi with **fixed** capitals of ${rs(KM.cap.Kashish)} and ${rs(KM.cap.Mitali)}. After the 2025-26 accounts were closed, they found that interest on capital at 6% per annum and Mitali's salary of ${rs(KM.salaryPm)} per month had been left out. Pass the adjustment entry, showing a working table.`,
  model: [KMadj.md, KMadj.entry.md].join('\n\n'),
  sol: 'Fixed capitals, so the adjustment goes through the current accounts.',
  scheme: [['Amounts that should have been credited', 1], ['Total taken back 3:2 and net effects', 1], ['Entry through current accounts', 1]],
}));
const PS = { names: ['Pratibha', 'Saurabh'], cap: { Pratibha: 400000, Saurabh: 200000 }, drawings: { Pratibha: 50000, Saurabh: 30000 } };
const PSexcess = Object.fromEntries(PS.names.map((n) => [n, interest(PS.cap[n], 10) - interest(PS.cap[n], 8)]));
const PSiod = Object.fromEntries(PS.names.map((n) => [n, interest(PS.drawings[n], 6, 6)]));
const PSback = sum(Object.values(PSexcess)) + sum(Object.values(PSiod));
const PSadj = pastAdjustment({ names: PS.names, lines: [['Excess interest on capital (10% credited, 8% due)', neg(PSexcess)], ['Interest on drawings omitted (6% for 6 months)', neg(PSiod)], [`${inr(PSback)} credited back equally`, divide(PSback, { Pratibha: 1, Saurabh: 1 })]] });
same(PSadj.net.Pratibha, -2300, 's3_past_iod_rate');
QQ('s3_past_iod_rate', short({
  t: 7, d: 4, c: 'analysis', marks: 3,
  stem: `Pratibha and Saurabh share profits equally in an imagined spice-export firm in Idukki, with capitals of ${rs(PS.cap.Pratibha)} and ${rs(PS.cap.Saurabh)}. After the 2025-26 accounts were closed it was found that interest on capital had been credited at 10% instead of 8% per annum, and that interest on drawings at 6% per annum had not been charged (drawings ${rs(PS.drawings.Pratibha)} and ${rs(PS.drawings.Saurabh)}, dates not known). Pass the adjustment entry with a working table.`,
  model: [PSadj.md, PSadj.entry.md].join('\n\n'),
  sol: 'Both errors overstated the partners\' credits; the total is then given back in the profit-sharing ratio.',
  scheme: [['Excess interest on capital reversed', 1], ['Interest on drawings charged and the total credited back', 1], ['Net effects and entry', 1]],
}));
const SYZ = { names: ['Swati', 'Yuvraj', 'Zoravar'], cap: { Swati: 300000, Yuvraj: 200000, Zoravar: 100000 }, profit: 210000, wrong: { Swati: 3, Yuvraj: 2, Zoravar: 2 }, right: { Swati: 2, Yuvraj: 2, Zoravar: 1 }, salary: 18000, close: { Swati: 340000, Yuvraj: 230000, Zoravar: 150000 } };
const SYZioc = Object.fromEntries(SYZ.names.map((n) => [n, interest(SYZ.cap[n], 5)]));
const SYZdiv = SYZ.profit - sum(Object.values(SYZioc)) - SYZ.salary;
const SYZadj = pastAdjustment({ names: SYZ.names, lines: [
  ['Interest on capital at 5%', SYZioc],
  ['Salary to Zoravar', { Zoravar: SYZ.salary }],
  [`Divisible profit ${inr(SYZdiv)} in 2:2:1`, divide(SYZdiv, SYZ.right)],
  [`Less: ${inr(SYZ.profit)} actually credited 3:2:2`, neg(divide(SYZ.profit, SYZ.wrong))],
] });
const SYZcap = partnerAccounts({ names: SYZ.names, dr: [['To Yuvraj\'s Capital A/c (adjustment)', { Swati: -SYZadj.net.Swati, Zoravar: -SYZadj.net.Zoravar }]], cr: [['By Balance b/d', SYZ.close], ['By Swati\'s and Zoravar\'s Capital A/cs (adjustment)', { Yuvraj: SYZadj.net.Yuvraj }]] });
same(SYZdiv, 162000, 'l5_past_multi divisible'); same(SYZadj.net.Swati, -10200, 'Swati'); same(SYZadj.net.Yuvraj, 14800, 'Yuvraj'); same(SYZcap.balances.Zoravar, 145400, 'Zoravar adjusted');
QQ('l5_past_multi', long({
  t: 7, d: 4, c: 'analysis', marks: 5,
  stem: `Swati, Yuvraj and Zoravar run an imagined organic-fertiliser firm in Hisar with fluctuating capitals of ${SYZ.names.map((n) => rs(SYZ.cap[n])).join(', ')} on 1 April 2025. The profit of ${rs(SYZ.profit)} for 2025-26 was credited to them in the ratio 3:2:2. Later it was found that (i) interest on capital at 5% per annum, (ii) a salary of ${rs(SYZ.salary)} a year to Zoravar, and (iii) the agreed profit-sharing ratio of 2:2:1 had all been ignored. Their capitals after closing were ${SYZ.names.map((n) => rs(SYZ.close[n])).join(', ')}. (a) Pass the single adjustment entry with a working table. (b) Show the adjusted capitals.`,
  model: [
    '**(a) Working table**',
    SYZadj.md,
    SYZadj.entry.md,
    '**(b) Partners\' Capital Accounts (after the adjustment)**',
    SYZcap.md,
  ].join('\n\n'),
  sol: 'Rebuild the correct distribution from the whole profit, subtract what was credited, and post the difference once.',
  scheme: [['Interest on capital and salary', 1], [`Correct divisible profit ${rs(SYZdiv)} in 2:2:1`, 1], ['Profit actually credited and net effects', 1], ['Adjustment entry', 1], ['Adjusted capitals', 1]],
}));
const ABC = { names: ['Ameya', 'Bhargavi', 'Chinmay'], ratio: { Ameya: 2, Bhargavi: 2, Chinmay: 1 }, close: { Ameya: 372000, Bhargavi: 264000, Chinmay: 144000 }, drawings: { Ameya: 48000, Bhargavi: 36000, Chinmay: 24000 }, profit: 240000, salaryPm: 3000 };
const ABCsh = divide(ABC.profit, ABC.ratio, 'l6_past_capitals shares');
const ABCopen = Object.fromEntries(ABC.names.map((n) => [n, ABC.close[n] + ABC.drawings[n] - ABCsh[n]]));
const ABCioc = Object.fromEntries(ABC.names.map((n) => [n, interest(ABCopen[n], 10)]));
const ABCtot = sum(Object.values(ABCioc)) + ABC.salaryPm * 12;
const ABCadj = pastAdjustment({ names: ABC.names, lines: [['Interest on opening capital at 10%', ABCioc], ['Salary to Bhargavi', { Bhargavi: ABC.salaryPm * 12 }], [`${inr(ABCtot)} taken back 2:2:1`, neg(divide(ABCtot, ABC.ratio))]] });
const ABCcap = partnerAccounts({ names: ABC.names, dr: [['To Bhargavi\'s Capital A/c (adjustment)', { Ameya: -ABCadj.net.Ameya, Chinmay: -ABCadj.net.Chinmay }]], cr: [['By Balance b/d', ABC.close], ['By Ameya\'s and Chinmay\'s Capital A/cs (adjustment)', { Bhargavi: ABCadj.net.Bhargavi }]] });
same(ABCopen.Ameya, 324000, 'Ameya opening'); same(ABCopen.Bhargavi, 204000, 'Bhargavi opening'); same(ABCadj.net.Ameya, -7920, 'Ameya net'); same(ABCadj.net.Bhargavi, 16080, 'Bhargavi net'); same(ABCcap.balances.Chinmay, 135840, 'Chinmay adjusted');
QQ('l6_past_capitals', long({
  t: [7, 3], d: 5, c: 'analysis', marks: 6,
  stem: `After the 2025-26 accounts of an imagined solar-lantern firm in Dumka were closed, the capital accounts of Ameya, Bhargavi and Chinmay (fluctuating capitals, ratio 2:2:1) showed ${ABC.names.map((n) => rs(ABC.close[n])).join(', ')}. During the year their drawings were ${ABC.names.map((n) => rs(ABC.drawings[n])).join(', ')}, and the profit of ${rs(ABC.profit)} was credited in 2:2:1. No other entry was made. It was then found that interest on capital at 10% per annum on the opening capitals and a salary of ${rs(ABC.salaryPm)} per month to Bhargavi had been omitted. (a) Calculate the opening capitals. (b) Pass the adjustment entry with a working table. (c) Show the adjusted capitals.`,
  model: [
    '**(a) Opening capitals**',
    mdTable(['Particulars', ...ABC.names.map((n) => `${n} (₹)`)], [
      ['Capital after closing', ...ABC.names.map((n) => inr(ABC.close[n]))],
      ['Add: Drawings', ...ABC.names.map((n) => inr(ABC.drawings[n]))],
      ['Less: Profit credited 2:2:1', ...ABC.names.map((n) => inr(ABCsh[n]))],
      ['**Capital on 1 April 2025**', ...ABC.names.map((n) => `**${inr(ABCopen[n])}**`)],
    ]),
    '**(b) Working table and entry**',
    ABCadj.md,
    ABCadj.entry.md,
    '**(c) Partners\' Capital Accounts (after the adjustment)**',
    ABCcap.md,
  ].join('\n\n'),
  sol: 'Interest is on opening capitals, so work them back first; then the usual should-be less actual table.',
  scheme: [['Opening capitals', 2], ['Interest on capital and salary', 1], ['Net effects (total zero)', 1], ['Adjustment entry', 1], ['Adjusted capitals', 1]],
}));

export const CHECK_KEYS = ['m_silent_ioc', 'tf_current_dr', 'm_insuff', 'n_comm_after', 'm_rent', 'n_iod_span', 'm_guar_partner', 'n_past'];
