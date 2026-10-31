// Build ISC 12 Accounts ch01 Fundamentals of Partnership. Run from platform/:
//   npx tsx content/authored/economics-commerce/isc-12-accounts-ch01/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';
import { nearDuplicates } from '../../../../../content-pipeline/src/originality/ngrams.ts';

setUnit('isc-12-accounts-ch01', 'economics-commerce');
const { BANK, CHECK_KEYS } = await import('./questions.mjs');
const { check, same, sum, inr, rs, rupees, words, mo, interest, divide, avgMonths, iodProduct, iodSpan, commissionAfter, commissionBefore, journal, partnerAccounts, plAdjust, appropriation, guarantee, pastAdjustment, neg } = await import('./acc.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const cap = (n) => `${n}'s Capital A/c`;

// ================================================================ deck figures (computed, never typed)
// WE1 Kannauj Attar House: no deed; claims settled under the Act.
const W1 = { names: ['Darshan', 'Gargi', 'Himmat'], cap: { Darshan: 500000, Gargi: 300000, Himmat: 200000 }, loan: 120000, loanMonths: 9, before: 245400, salaryPm: 8000 };
const W1int = interest(W1.loan, 6, W1.loanMonths);
const W1net = W1.before - W1int;
const W1sh = divide(W1net, { Darshan: 1, Gargi: 1, Himmat: 1 }, 'WE1 shares');
same(W1int, 5400, 'WE1 loan interest'); same(W1sh.Darshan, 80000, 'WE1 share');

// WE2 Bhagalpur Silk House: fixed capitals, current accounts with interest on opening current balances.
const W2 = { names: ['Eshwar', 'Jasleen'], ratio: { Eshwar: 3, Jasleen: 2 }, cap: { Eshwar: 400000, Jasleen: 250000 }, open: { Eshwar: 30000, Jasleen: -10000 }, rate: 8, curRate: 6, salaryPm: 3000, drawings: { Eshwar: 45000, Jasleen: 30000 }, iod: { Eshwar: 1350, Jasleen: 900 }, profit: 195000 };
const W2ioc = Object.fromEntries(W2.names.map((n) => [n, interest(W2.cap[n], W2.rate)]));
const W2ci = { Eshwar: interest(W2.open.Eshwar, W2.curRate), Jasleen: interest(-W2.open.Jasleen, W2.curRate) };
const W2sal = { Jasleen: W2.salaryPm * 12 };
const W2app = appropriation({
  names: W2.names, ratio: W2.ratio, profit: W2.profit, iod: W2.iod, ioc: W2ioc, salary: W2sal,
  extraCr: [['By Interest on Current A/c: Jasleen', W2ci.Jasleen]],
  extraDr: [['To Interest on Current A/c: Eshwar', W2ci.Eshwar]],
  shareLabel: (n) => `To ${n}'s Current A/c (share of profit)`,
});
const W2cur = partnerAccounts({
  names: W2.names,
  dr: [['To Balance b/d', { Jasleen: -W2.open.Jasleen }], ['To Drawings A/c', W2.drawings], ['To Interest on Drawings A/c', W2.iod], ['To Interest on Current A/c', { Jasleen: W2ci.Jasleen }]],
  cr: [['By Balance b/d', { Eshwar: W2.open.Eshwar }], ['By Interest on Capital A/c', W2ioc], ['By Interest on Current A/c', { Eshwar: W2ci.Eshwar }], ['By Salary A/c', W2sal], ['By P&L Appropriation A/c', W2app.shares]],
});
same(W2ci.Eshwar, 1800, 'WE2 interest on credit balance'); same(W2app.divisible, 108050, 'WE2 divisible'); same(W2app.shares.Eshwar, 64830, 'WE2 Eshwar share');
same(W2cur.balances.Eshwar, 82280, 'WE2 Eshwar current'); same(W2cur.balances.Jasleen, 57720, 'WE2 Jasleen current');

// WE3 Majuli Mask Studio: interest on capital with an addition and a withdrawal; profit insufficient.
const W3 = { names: ['Ketaki', 'Bhupen'], ratio: { Ketaki: 3, Bhupen: 2 }, cap: { Ketaki: 300000, Bhupen: 240000 }, addl: 60000, out: 40000, rate: 10, profit: 44800 };
const W3ioc = { Ketaki: interest(W3.cap.Ketaki, W3.rate) + interest(W3.addl, W3.rate, 6), Bhupen: interest(W3.cap.Bhupen, W3.rate) - interest(W3.out, W3.rate, 3) };
const W3tot = sum(Object.values(W3ioc));
check(W3tot > W3.profit, 'WE3 profit must be insufficient');
const W3a = divide(W3.profit, W3ioc, 'WE3 appropriation');
const W3loss = W3tot - W3.profit;
const W3b = divide(W3loss, W3.ratio, 'WE3 charge loss');
same(W3ioc.Ketaki, 33000, 'WE3 Ketaki interest'); same(W3ioc.Bhupen, 23000, 'WE3 Bhupen interest'); same(W3a.Ketaki, 26400, 'WE3 Ketaki share'); same(W3b.Ketaki, 6720, 'WE3 Ketaki loss');

// WE4 Kollam Cashew Works: manager's commission (charge) then a full appropriation account.
const W4 = { names: ['Rukmini', 'Sudhir', 'Vinod'], ratio: { Rukmini: 2, Sudhir: 2, Vinod: 1 }, cap: { Rukmini: 500000, Sudhir: 400000, Vinod: 300000 }, before: 462000, mgr: 10, rate: 6, salaryPm: 4000, commPct: 5, reserve: 30000, iod: { Rukmini: 2400, Sudhir: 1800, Vinod: 1200 } };
const W4m = commissionAfter(W4.before, W4.mgr);
const W4adj = plAdjust({ before: W4.before, beforeLabel: 'By Profit and Loss A/c (profit before manager\'s commission)', charges: [['To Manager\'s Commission (10% after charging)', W4m]] });
const W4ioc = Object.fromEntries(W4.names.map((n) => [n, interest(W4.cap[n], W4.rate)]));
const W4comm = { Sudhir: commissionBefore(W4adj.net, W4.commPct) };
const W4app = appropriation({ names: W4.names, ratio: W4.ratio, profit: W4adj.net, iod: W4.iod, ioc: W4ioc, salary: { Vinod: W4.salaryPm * 12 }, commission: W4comm, reserve: W4.reserve });
same(W4m, 42000, 'WE4 manager'); same(W4adj.net, 420000, 'WE4 net'); same(W4comm.Sudhir, 21000, 'WE4 Sudhir commission'); same(W4app.divisible, 254400, 'WE4 divisible'); same(W4app.shares.Vinod, 50880, 'WE4 Vinod');

// WE5 Firozabad Glassworks: charges (loan interest, rent) then appropriation.
const W5 = { names: ['Mohini', 'Navneet'], ratio: { Mohini: 3, Navneet: 2 }, before: 310000, loan: 200000, loanMonths: 6, rentPm: 5000, cap: { Mohini: 600000, Navneet: 400000 }, salary: { Mohini: 24000 } };
const W5int = interest(W5.loan, 6, W5.loanMonths);
const W5adj = plAdjust({ before: W5.before, charges: [['To Interest on Navneet\'s Loan (6% for 6 months)', W5int], ['To Rent: Mohini (12 months)', W5.rentPm * 12]] });
const W5ioc = Object.fromEntries(W5.names.map((n) => [n, interest(W5.cap[n], 5)]));
const W5app = appropriation({ names: W5.names, ratio: W5.ratio, profit: W5adj.net, ioc: W5ioc, salary: W5.salary });
same(W5int, 6000, 'WE5 loan interest'); same(W5adj.net, 244000, 'WE5 net'); same(W5app.divisible, 170000, 'WE5 divisible'); same(W5app.shares.Mohini, 102000, 'WE5 Mohini');

// WE6 / WE7 Bhadohi Carpet House: product method; part-year equal drawings by both methods.
const W6items = [['1 May 2025', 12000, 11], ['31 August 2025', 9000, 7], ['1 December 2025', 15000, 4], ['28 February 2026', 6000, 1]];
const W6 = iodProduct(8, W6items.map(([, a, m]) => [a, m]));
same(W6.total, 261000, 'WE6 products'); same(W6.interest, 1740, 'WE6 interest');
const W7 = iodSpan({ amount: 4000, count: 6, first: 6, last: 1, rate: 10 });
same(W7.months, 3.5, 'WE7 average period'); same(W7.interest, 700, 'WE7 interest');
const W7months = ['October', 'November', 'December', 'January', 'February', 'March'];

// WE8 Makrana Marble Craft: guarantee by two partners in an agreed ratio, compared with the firm.
const W8 = { ratio: { Akshara: 5, Balwant: 3, Chandni: 2 }, profit: 360000, min: 90000 };
const W8two = guarantee({ amount: W8.profit, ratio: W8.ratio, guaranteed: 'Chandni', min: W8.min, bearers: { Akshara: 3, Balwant: 1 } });
const W8firm = guarantee({ amount: W8.profit, ratio: W8.ratio, guaranteed: 'Chandni', min: W8.min, bearers: { Akshara: 5, Balwant: 3 } });
same(W8two.deficiency, 18000, 'WE8 deficiency'); same(W8two.final.Akshara, 166500, 'WE8 Akshara'); same(W8two.final.Balwant, 103500, 'WE8 Balwant'); same(W8firm.borne.Akshara, 11250, 'WE8 firm Akshara');
const W8names = ['Akshara', 'Balwant', 'Chandni'];

// WE9 Kalimpong Orchid Nursery: guarantee after interest on capital, given by one partner.
const W9 = { names: ['Mrinal', 'Oindrila', 'Joydeep'], ratio: { Mrinal: 3, Oindrila: 2, Joydeep: 1 }, cap: { Mrinal: 400000, Oindrila: 300000, Joydeep: 100000 }, profit: 224000, min: 50000 };
const W9ioc = Object.fromEntries(W9.names.map((n) => [n, interest(W9.cap[n], 10)]));
const W9div = W9.profit - sum(Object.values(W9ioc));
const W9g = guarantee({ amount: W9div, ratio: W9.ratio, guaranteed: 'Joydeep', min: W9.min, bearers: { Mrinal: 1 } });
const W9app = appropriation({ names: W9.names, ratio: W9.ratio, profit: W9.profit, ioc: W9ioc, shares: W9g.final, shareLabel: (n) => (n === 'Mrinal' ? `To ${cap(n)} (${inr(W9g.normal[n])} − ${inr(W9g.deficiency)})` : n === 'Joydeep' ? `To ${cap(n)} (${inr(W9g.normal[n])} + ${inr(W9g.deficiency)})` : `To ${cap(n)}`) });
const W9je = journal([{ dr: [[cap('Mrinal'), W9g.deficiency]], cr: [[cap('Joydeep'), W9g.deficiency]], note: 'Being Joydeep\'s deficiency borne by Mrinal' }]);
same(W9div, 144000, 'WE9 divisible'); same(W9g.deficiency, 26000, 'WE9 deficiency'); same(W9g.final.Mrinal, 46000, 'WE9 Mrinal');

// WE10 Tezpur Tea Brokers: omitted interest on capital and salary; fluctuating capitals.
const W10 = { names: ['Neelam', 'Mehul', 'Suhail'], ratio: { Neelam: 2, Mehul: 1, Suhail: 1 }, cap: { Neelam: 300000, Mehul: 200000, Suhail: 100000 }, salaryPm: 2000, close: { Neelam: 340000, Mehul: 210000, Suhail: 125000 } };
const W10ioc = Object.fromEntries(W10.names.map((n) => [n, interest(W10.cap[n], 8)]));
const W10tot = sum(Object.values(W10ioc)) + W10.salaryPm * 12;
const W10adj = pastAdjustment({
  names: W10.names, note: 'Being interest on capital and salary omitted, now adjusted',
  lines: [['Interest on capital at 8% (credit)', W10ioc], ['Salary to Suhail (credit)', { Suhail: W10.salaryPm * 12 }], [`${inr(W10tot)} taken back in 2:1:1 (debit)`, neg(divide(W10tot, W10.ratio))]],
});
const W10cap = partnerAccounts({ names: W10.names, dr: [['To Suhail\'s Capital A/c (adjustment)', { Neelam: -W10adj.net.Neelam, Mehul: -W10adj.net.Mehul }]], cr: [['By Balance b/d', W10.close], ['By Neelam\'s and Mehul\'s Capital A/cs', { Suhail: W10adj.net.Suhail }]] });
same(W10tot, 72000, 'WE10 total'); same(W10adj.net.Neelam, -12000, 'WE10 Neelam'); same(W10adj.net.Mehul, -2000, 'WE10 Mehul'); same(W10adj.net.Suhail, 14000, 'WE10 Suhail'); same(W10cap.balances.Suhail, 139000, 'WE10 Suhail adjusted');

// WE11 Aizawl Bamboo Crafts: profit shared equally instead of 3:2:1.
const W11 = { names: ['Lalremruati', 'Tejal', 'Vedant'], ratio: { Lalremruati: 3, Tejal: 2, Vedant: 1 }, profit: 180000 };
const W11adj = pastAdjustment({ names: W11.names, note: 'Being profit wrongly shared equally, now adjusted', lines: [['Profit that should have been credited (3:2:1)', divide(W11.profit, W11.ratio)], ['Less: profit actually credited (equally)', neg(divide(W11.profit, { Lalremruati: 1, Tejal: 1, Vedant: 1 }))]] });
same(W11adj.net.Lalremruati, 30000, 'WE11 Lalremruati'); same(W11adj.net.Tejal, 0, 'WE11 Tejal');

// ================================================================ visuals: Part 1
const vRoute1 = flow('LR', ['Partnership and the Act', 'The deed and its absence', 'Capital and current accounts', 'Appropriation of profit'], 'Route map of Part 1: partnership and the Indian Partnership Act, the deed and the rules when there is none, capital and current accounts, and the appropriation of profit', 'Part 1 at a glance');
const vFeatures = table(
  ['Feature', 'What it means', 'In an imagined bamboo-furniture firm in Kohima'],
  [
    ['Two or more persons', 'At least 2 and at most 50 partners', 'Neiphiu and Koushik run the workshop together'],
    ['Agreement', 'Oral or written; the written form is the deed', 'They sign a deed before the first order'],
    ['Business', 'A lawful business carried on for profit', 'Making and selling bamboo chairs and shelves'],
    ['Sharing of profits', 'Profit and loss shared in an agreed ratio', 'They agree to share 3:2'],
    ['Mutual agency', 'Run by all, or by any of them acting for all', 'Koushik\'s order for cane binds Neiphiu too'],
    ['Unlimited liability', 'Partners\' own property can meet the firm\'s debts', 'A supplier can claim from Neiphiu\'s savings'],
  ],
  'Table of six features of partnership with an imagined bamboo-furniture firm in Kohima as the example: two or more persons, an agreement, a business, sharing of profits, mutual agency and unlimited liability',
);
const vRights = table(
  ['Provision of the Act (unless partners agree otherwise)', 'What it means'],
  [
    ['Section 9: true accounts', 'Partners must be just and faithful and give true accounts and full information to each other'],
    ['Section 12(a): conduct of business', 'Every partner may take part in running the business'],
    ['Section 12(c): decisions', 'Ordinary matters by majority; the nature of the business changes only with every partner\'s consent'],
    ['Section 12(d): books of account', 'Every partner may have access to, inspect and copy any of the firm\'s books'],
    ['Section 13: money matters', 'Profit sharing, remuneration and interest (next slides)'],
  ],
  'Table of provisions of the Indian Partnership Act on accounts and partners\' rights: true accounts under section nine, the right to take part in the business, decisions by majority, the right to inspect and copy the books, and the money rules of section thirteen',
);
const vDeed = table(
  ['Clause in the deed', 'Why the accountant needs it'],
  [
    ['Names of the firm and partners; nature and duration of business', 'Who the partners are and what the firm does'],
    ['Capital of each partner; fixed or fluctuating capitals', 'Basis for interest on capital and the type of accounts'],
    ['Profit-sharing ratio', 'Division of the divisible profit or loss'],
    ['Interest on capital, drawings, current balances and loans', 'Rates to apply and whether interest is a charge'],
    ['Salary, commission, guarantee of profit', 'Rewards and promises to particular partners'],
    ['Admission, retirement, death, goodwill, disputes, dissolution', 'Rules for later changes'],
  ],
  'Table of the usual clauses of a partnership deed and why each matters to the accountant: names and business, capitals, profit-sharing ratio, interest rates, salary, commission and guarantees, and rules for later changes',
);
const vAct = table(
  ['Matter', 'Rule when the deed is silent (Section 13)'],
  [
    ['Sharing of profits and losses', 'Equally'],
    ['Salary or commission to a partner', 'Not allowed'],
    ['Interest on capital', 'Not allowed; where agreed, payable only out of profits'],
    ['Interest on drawings', 'Not charged'],
    ['Interest on a partner\'s loan or advance', `6% per annum, a charge (a loan of ${rs(W1.loan)} for 9 months earns ${rs(W1int)})`],
  ],
  `Table of the rules of section thirteen of the Indian Partnership Act when the deed is silent: equal sharing, no remuneration, no interest on capital, no interest on drawings, and six per cent a year on a partner's loan, so ${words(W1.loan)} rupees for nine months earns ${words(W1int)} rupees`,
);
const vWE1 = table(
  ['Claim', 'Ruling under the Act', 'Effect (₹)'],
  [
    ['Darshan: interest on capital at 10%', 'Not allowed: no agreement', 'nil'],
    [`Himmat: salary of ${rs(W1.salaryPm)} a month`, 'Not allowed: no agreement', 'nil'],
    ['Gargi: interest on her loan at 10%', '6% a year from 1 July 2025, a charge', `${inr(W1.loan)} × 6% × 9/12 = ${inr(W1int)}`],
    ['Darshan: profit in the capital ratio 5:3:2', 'Equal sharing', `(${inr(W1.before)} − ${inr(W1int)}) ÷ 3 = ${inr(W1sh.Darshan)} each`],
  ],
  `Table of worked example one: claims for interest on capital and a salary are refused; Gargi's loan earns six per cent for nine months, ${words(W1int)} rupees; the remaining profit of ${words(W1net)} rupees is shared equally, ${words(W1sh.Darshan)} rupees each`,
);
const vFixFluct = table(
  ['Basis', 'Fixed capital method', 'Fluctuating capital method'],
  [
    ['Accounts per partner', 'Two: capital and current', 'One: capital'],
    ['Capital balance', 'Changes only when capital is added or permanently withdrawn', 'Changes every year'],
    ['Interest, salary, commission, profit, drawings', 'Current account', 'Capital account'],
    ['Debit balance', 'Possible in the current account', 'Possible, though rare, in the capital account'],
  ],
  'Table comparing the fixed capital method, with separate capital and current accounts, and the fluctuating capital method, with one capital account recording every adjustment',
);
const vWhere = table(
  ['Item', 'Side', 'Fixed capitals', 'Fluctuating capitals'],
  [
    ['Opening and additional capital', 'Credit', 'Capital account', 'Capital account'],
    ['Capital permanently withdrawn', 'Debit', 'Capital account', 'Capital account'],
    ['Interest on capital and on a credit current balance, salary, commission, share of profit', 'Credit', 'Current account', 'Capital account'],
    ['Drawings, interest on drawings and on a debit current balance, share of loss', 'Debit', 'Current account', 'Capital account'],
  ],
  'Table showing where each item goes: capital brought in or withdrawn goes to the capital account under both methods; earnings are credited and drawings, interest on drawings and losses are debited to the current account under fixed capitals or to the capital account under fluctuating capitals',
);
const vCurInt = table(
  ['Opening current balance', 'Meaning', 'Interest (only if the deed provides)'],
  [
    ['Credit', 'The firm owes the partner', 'Allowed: debit P&L Appropriation A/c, credit partner\'s current account (like interest on capital)'],
    ['Debit', 'The partner owes the firm', 'Charged: debit partner\'s current account, credit P&L Appropriation A/c (like interest on drawings)'],
  ],
  'Table of interest on current account balances: on a credit balance the firm allows interest like interest on capital; on a debit balance it charges interest like interest on drawings, in each case only if the deed provides',
);
const vWE2app = table(W2app.headers, W2app.rows,
  `Profit and loss appropriation account of Bhagalpur Silk House: net profit, interest on drawings and interest on Jasleen's debit current balance on the credit side; interest on capital, interest on Eshwar's credit current balance, Jasleen's salary and shares of ${words(W2app.shares.Eshwar)} and ${words(W2app.shares.Jasleen)} rupees on the debit side`,
  `Divisible profit ${rs(W2app.divisible)} shared 3:2.`);
const vWE2cur = table(W2cur.headers, W2cur.rows,
  `Current accounts of Eshwar and Jasleen: Eshwar opens with a credit and Jasleen with a debit balance; interest, salary and profit are credited and drawings and interest on drawings debited; closing credit balances ${words(W2cur.balances.Eshwar)} and ${words(W2cur.balances.Jasleen)} rupees`,
  `Capitals stay at ${rs(W2.cap.Eshwar)} and ${rs(W2.cap.Jasleen)}.`);
const vFormat = table(
  ['Dr: Particulars', 'Cr: Particulars'],
  [
    ['To Interest on Capital (each partner)', 'By Profit and Loss A/c (net profit, after charges)'],
    ['To Interest on credit current balances', 'By Interest on Drawings (each partner)'],
    ['To Salary and Commission (partners)', 'By Interest on debit current balances'],
    ['To General Reserve', ''],
    ['To Partners\' Capital or Current A/cs (divisible profit in the ratio)', ''],
  ],
  'Format of the profit and loss appropriation account: debit interest on capital and on credit current balances, partners\' salary and commission, transfer to reserve and the shares of divisible profit; credit the net profit, interest on drawings and interest on debit current balances',
  'Divisible profit = net profit + interest on drawings − interest on capital − salary − commission − reserve',
);
const vIocRules = table(
  ['Situation', 'Treatment of interest on capital'],
  [
    ['Deed silent', 'No interest'],
    ['Deed allows interest; profit is enough', 'Full interest, as an appropriation'],
    ['Same, but profit is less than the interest due', 'Whole profit shared in the ratio of interest due'],
    ['Same, but the firm made a loss', 'No interest (Section 13: only out of profits)'],
    ['Deed treats interest as a charge', 'Full interest debited to the Profit and Loss Account, even if this causes a loss'],
  ],
  'Table of the treatment of interest on capital: none if the deed is silent; full interest out of enough profit; the profit shared in the interest ratio when it is short; none in a loss year; full interest as a charge when the deed says so',
);
const vWE3 = table(
  ['Particulars', 'Ketaki (₹)', 'Bhupen (₹)', 'Total (₹)'],
  [
    ['Interest due at 10%', `${inr(interest(W3.cap.Ketaki, W3.rate))} + ${inr(interest(W3.addl, W3.rate, 6))} = ${inr(W3ioc.Ketaki)}`, `${inr(interest(W3.cap.Bhupen, W3.rate))} − ${inr(interest(W3.out, W3.rate, 3))} = ${inr(W3ioc.Bhupen)}`, inr(W3tot)],
    [`(a) Appropriation: profit shared ${W3ioc.Ketaki / 1000}:${W3ioc.Bhupen / 1000}`, inr(W3a.Ketaki), inr(W3a.Bhupen), inr(W3.profit)],
    ['(b) Loss year, interest an appropriation', 'nil', 'nil', 'nil'],
    [`(c) Charge: full interest, loss of ${inr(W3loss)} shared 3:2`, `${inr(W3ioc.Ketaki)} − ${inr(W3b.Ketaki)}`, `${inr(W3ioc.Bhupen)} − ${inr(W3b.Bhupen)}`, `${inr(W3tot)} − ${inr(W3loss)}`],
  ],
  `Table of worked example three: interest due is ${words(W3ioc.Ketaki)} for Ketaki and ${words(W3ioc.Bhupen)} for Bhupen; as an appropriation the profit of ${words(W3.profit)} is shared ${words(W3a.Ketaki)} and ${words(W3a.Bhupen)}; in a loss year nothing is allowed; as a charge full interest is credited and a loss of ${words(W3loss)} rupees is shared three to two`,
);
const vComm = flow('LR', [`Profit before commissions ${rs(W4.before)}`, `Manager: × 10 ÷ 110 = ${rs(W4m)} (charge)`, `Net profit ${rs(W4adj.net)}`, `Partner Sudhir: 5% = ${rs(W4comm.Sudhir)} (appropriation)`],
  `Flow for commissions: from a profit of ${words(W4.before)} rupees the manager's commission after charging, ten over one hundred and ten, is ${words(W4m)} rupees, a charge; the net profit of ${words(W4adj.net)} rupees then carries the partner's commission of ${words(W4comm.Sudhir)} rupees as an appropriation`,
  'After charging: profit × rate ÷ (100 + rate). Before charging: profit × rate ÷ 100.');
const vWE4a = table(W4adj.headers, W4adj.rows,
  `Profit and loss adjustment account of Kollam Cashew Works: the manager's commission of ${words(W4m)} rupees is debited and the net profit of ${words(W4adj.net)} rupees transferred to the appropriation account`);
const vWE4b = table(W4app.headers, W4app.rows,
  `Profit and loss appropriation account of Kollam Cashew Works: net profit and interest on drawings credited; interest on capital, Vinod's salary, Sudhir's commission, the reserve and shares of ${words(W4app.shares.Rukmini)}, ${words(W4app.shares.Sudhir)} and ${words(W4app.shares.Vinod)} rupees debited`,
  `Divisible profit ${rs(W4app.divisible)} shared 2:2:1.`);
const vSummary1 = table(
  ['Topic', 'Key rule'],
  [
    ['Partnership (Section 4)', 'Agreement to share the profits of a business carried on by all or any of them acting for all; 2 to 50 partners'],
    ['Books (Sections 9, 12)', 'True accounts; every partner may inspect and copy the books'],
    ['Deed silent (Section 13)', 'Equal profits; no remuneration; no interest on capital or drawings; 6% on partners\' advances'],
    ['Capital methods', 'Fixed: capital and current accounts. Fluctuating: one capital account'],
    ['Interest on current balances', 'Credit balance: allowed. Debit balance: charged. Only if the deed says so'],
    ['Interest on capital', 'Appropriation: out of profit only, in the interest ratio if short. Charge: always'],
    ['Commission', 'Manager: a charge. Partner: an appropriation. After charging: × rate ÷ (100 + rate)'],
  ],
  'Summary table of Part 1: the definition of partnership, the Act on books, the rules when the deed is silent, the two capital methods, interest on current balances, interest on capital and the treatment of commission',
);

// ================================================================ visuals: Part 2
const vRoute2 = flow('LR', ['Charges against profit', 'Interest on drawings', 'Guarantee of profits', 'Past adjustments'], 'Route map of Part 2: charges against profit, interest on drawings, guarantee of profits to a partner, and past adjustments', 'Part 2 at a glance');
const vChargeAppro = table(
  ['Charge against profit (Profit and Loss Account)', 'Appropriation of profit (Appropriation Account)'],
  [
    ['Interest on a partner\'s loan', 'Interest on capital (unless the deed calls it a charge)'],
    ['Rent paid to a partner for the firm\'s premises', 'Salary or commission to a partner'],
    ['Manager\'s commission and employees\' salaries', 'Transfer to general reserve'],
    ['Allowed even in a year of loss', 'Allowed only out of profit'],
  ],
  'Two-column table: charges such as interest on a partner\'s loan, rent paid to a partner and a manager\'s commission go to the profit and loss account even in a loss year; appropriations such as interest on capital, partners\' salary or commission and reserves come out of profit only',
);
const vWE5adj = table(W5adj.headers, W5adj.rows,
  `Profit and loss adjustment account of Firozabad Glassworks: interest on Navneet's loan of ${words(W5int)} rupees and rent to Mohini of ${words(W5.rentPm * 12)} rupees are debited, leaving a net profit of ${words(W5adj.net)} rupees`);
const vWE5app = table(W5app.headers, W5app.rows,
  `Profit and loss appropriation account of Firozabad Glassworks: from the net profit of ${words(W5adj.net)} rupees, interest on capital and Mohini's salary are debited and the divisible profit of ${words(W5app.divisible)} rupees is shared three to two`);
const vAvgPeriod = table(
  ['Equal drawings made', 'At the beginning', 'In the middle', 'At the end'],
  [[12, 'Every month (12 times)'], [4, 'Every quarter (4 times)'], [2, 'Every half-year (2 times)']].map(([n, label]) => [label, ...['begin', 'mid', 'end'].map((w) => `${mo(avgMonths(n, w))} months`)]),
  'Table of average periods: monthly drawings give six and a half, six or five and a half months; quarterly drawings seven and a half, six or four and a half; half-yearly nine, six or three months, for drawings at the beginning, middle or end of each period',
  'Average period = (months left after the first drawing + months left after the last) ÷ 2. No dates given: 6 months.',
);
const vWhy = (() => {
  const s = new Svg(600, 300);
  const ch = s.chart({ x0: 0, x1: 12, y0: 0, y1: 13, left: 56, top: 36, width: 500, height: 210, yLabel: 'Months outstanding' });
  const mons = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
  const outs = mons.map((_, i) => 12 - i);
  same(sum(outs) / outs.length, avgMonths(12, 'begin'), 'bars average to the 6½-month period');
  outs.forEach((m, i) => {
    const a = ch.X(i + 0.18);
    const b = ch.X(i + 0.82);
    s.rect(a, ch.Y(m), b - a, ch.Y(0) - ch.Y(m), { fill: 'fill', color: 'accent', sw: 1.2, rx: 2 });
    s.text((a + b) / 2, ch.Y(m) - 9, String(m), { size: 11 });
    ch.xTick(i + 0.5, mons[i]);
  });
  for (const v of [3, 6, 9, 12]) ch.yTick(v, String(v));
  s.line(ch.X(0), ch.Y(6.5), ch.X(12), ch.Y(6.5), { dash: true, color: 'accent', sw: 1.6 });
  s.text(ch.X(12) - 4, ch.Y(6.5) - 10, 'Average 6½ months', { anchor: 'end', size: 12, color: 'accent' });
  return s.visual(
    'Bar chart of twelve equal drawings made on the first day of each month from April to March: the April drawing is out for twelve months, May for eleven, down to March for one month; a dashed line marks their average of six and a half months',
    'First drawing 12 months, last 1 month: (12 + 1) ÷ 2 = 6½.',
  );
})();
const vWE6 = table(
  ['Date of drawing', 'Amount (₹)', 'Months to 31 March 2026', 'Product (₹)'],
  [...W6items.map(([d, a, m], i) => [d, inr(a), String(m), inr(W6.products[i])]), ['**Total**', `**${inr(sum(W6items.map(([, a]) => a)))}**`, '', `**${inr(W6.total)}**`]],
  `Product method table for Waheeda's four drawings: products total ${words(W6.total)}; interest at eight per cent for one month on this total is ${words(W6.interest)} rupees`,
  `Interest = ${inr(W6.total)} × 8/100 × 1/12 = ${rs(W6.interest)}`,
);
const vWE7 = table(
  ['Drawing of ₹4,000 on the first day of', 'Months to 31 March', 'Product (₹)'],
  [...W7.items.map(([a, m], i) => [W7months[i], String(m), inr(a * m)]), ['**Total**', '', `**${inr(W7.product.total)}**`]],
  `Table of worked example: six drawings of four thousand rupees from October to March are out for six down to one months; products total ${words(W7.product.total)}; interest is ${words(W7.interest)} rupees by both the product method and the average period of three and a half months`,
  `Product method: ${inr(W7.product.total)} × 10/100 × 1/12 = ${rs(W7.interest)}. Average period (6 + 1) ÷ 2 = 3½ months: ${inr(W7.total)} × 10/100 × 3.5/12 = ${rs(W7.interest)}.`,
);
const vGuarFlow = flow('LR', ['Divide the profit in the normal ratio', 'Compare the guaranteed partner\'s share with the minimum', 'Shortfall = deficiency', 'Deficiency borne by the guarantors in their agreed ratio'],
  'Flow for a guarantee of minimum profit: divide the profit normally, compare the guaranteed partner\'s share with the minimum, find the deficiency, and charge it to whoever gave the guarantee in the ratio they agreed', 'The firm\'s total profit never changes.');
const vWE8 = table(
  ['Particulars', 'Akshara (₹)', 'Balwant (₹)', 'Chandni (₹)'],
  [
    ['Share of profit 5:3:2', ...W8names.map((n) => inr(W8two.normal[n]))],
    ['Deficiency borne by Akshara and Balwant 3:1', `− ${inr(W8two.borne.Akshara)}`, `− ${inr(W8two.borne.Balwant)}`, `+ ${inr(W8two.deficiency)}`],
    ['**Final share**', ...W8names.map((n) => `**${inr(W8two.final[n])}**`)],
    ['If the firm had guaranteed (5:3)', inr(W8firm.final.Akshara), inr(W8firm.final.Balwant), inr(W8firm.final.Chandni)],
  ],
  `Table of the guarantee at Makrana Marble Craft: normal shares ${W8names.map((n) => words(W8two.normal[n])).join(', ')}; Chandni's deficiency of ${words(W8two.deficiency)} is borne three to one by Akshara and Balwant, giving ${W8names.map((n) => words(W8two.final[n])).join(', ')} rupees`,
);
const vGuarChart = (() => {
  const s = new Svg(600, 320);
  const ch = s.chart({ x0: 0, x1: 3, y0: 0, y1: 200, left: 64, top: 40, width: 480, height: 220, yLabel: '₹ thousand' });
  const series = [['Normal share', 'fill', W8two.normal], ['Guarantee by the firm', 'muted', W8firm.final], ['By Akshara and Balwant 3:1', 'accent', W8two.final]];
  W8names.forEach((n, i) => {
    series.forEach(([, fill, v], k) => {
      const x = i + 0.5 + (k - 1) * 0.26;
      const a = ch.X(x - 0.11);
      const b = ch.X(x + 0.11);
      const val = v[n] / 1000;
      s.rect(a, ch.Y(val), b - a, ch.Y(0) - ch.Y(val), { fill, color: 'accent', sw: 1.2, rx: 2 });
      s.text((a + b) / 2, ch.Y(val) - 9, String(val), { size: 10 });
    });
    ch.xTick(i + 0.5, n);
  });
  for (const v of [50, 100, 150, 200]) ch.yTick(v, String(v));
  series.forEach(([label, fill], k) => {
    s.rect(70 + k * 180, 8, 14, 14, { fill, color: 'accent', sw: 1.2, rx: 2 });
    s.text(90 + k * 180, 15, label, { anchor: 'start', size: 11 });
  });
  return s.visual(
    `Bar chart in thousand rupees for Akshara, Balwant and Chandni: normal shares ${W8names.map((n) => W8two.normal[n] / 1000).join(', ')}; with a guarantee by the firm ${W8names.map((n) => W8firm.final[n] / 1000).join(', ')}; with the guarantee by Akshara and Balwant in three to one ${W8names.map((n) => W8two.final[n] / 1000).join(', ')}`,
    'Chandni reaches the minimum either way; the agreed ratio decides who pays.',
  );
})();
const vWE9 = table(W9app.headers, W9app.rows,
  `Profit and loss appropriation account of Kalimpong Orchid Nursery: interest on capital of ${words(sum(Object.values(W9ioc)))} rupees debited first; of the divisible profit, Mrinal gets ${words(W9g.final.Mrinal)} after bearing Joydeep's deficiency of ${words(W9g.deficiency)}, Oindrila ${words(W9g.final.Oindrila)} and Joydeep his minimum of ${words(W9g.final.Joydeep)} rupees`);
const vPastFlow = flow('LR', ['Error found after the accounts are closed', 'What each partner should have been credited or debited', 'Less what was actually credited or debited', 'Net effect per partner (total nil)', 'One adjustment entry'],
  'Flow for a past adjustment: after the accounts are closed, list what each partner should have received, subtract what was actually recorded, find each net effect, which total nil, and pass one adjustment entry', 'Closed accounts are never reopened.');
const vWE10 = table(W10adj.headers, W10adj.rows,
  `Past adjustment table for Neelam, Mehul and Suhail: interest on capital and Suhail's salary credited, the total of ${words(W10tot)} taken back two to one to one; net effect Neelam debit ${words(-W10adj.net.Neelam)}, Mehul debit ${words(-W10adj.net.Mehul)}, Suhail credit ${words(W10adj.net.Suhail)} rupees, totalling nil`);
const vWE10cap = table(W10cap.headers, W10cap.rows,
  `Capital accounts after the adjustment: Neelam's and Mehul's capitals are debited and Suhail's credited, giving adjusted capitals of ${W10.names.map((n) => words(W10cap.balances[n])).join(', ')} rupees`);
const vWE11 = table(W11adj.headers, W11adj.rows,
  `Table for a profit of ${words(W11.profit)} rupees shared equally instead of three to two to one: Lalremruati should gain ${words(W11adj.net.Lalremruati)}, Tejal is unaffected and Vedant should lose ${words(-W11adj.net.Vedant)} rupees`);
const vSummary2 = table(
  ['Topic', 'Key rule'],
  [
    ['Charges', 'Interest on a partner\'s loan, rent to a partner, manager\'s commission: Profit and Loss (Adjustment) Account, even in a loss'],
    ['Interest on drawings', 'Only if the deed provides; product method, or average period = (first + last) ÷ 2'],
    ['Guarantee by the firm', 'Deficiency borne by the other partners in their mutual ratio'],
    ['Guarantee by one or more partners', 'Deficiency borne by the guarantors alone, in their agreed ratio'],
    ['Guarantee in a loss year', 'Deficiency = minimum + the partner\'s share of loss'],
    ['Past adjustment', 'Should-be less actual for each partner; net effects total nil; one entry'],
  ],
  'Summary table of Part 2: charges against profit, interest on drawings, who bears a deficiency under each kind of guarantee including a loss year, and the rule for past adjustments',
);

// ================================================================ decks
const part1 = deck({
  part: 1,
  title: 'Fundamentals of Partnership — Part 1: The Firm, the Deed, Capital Accounts and Appropriation of Profit',
  goals: [
    'State the features of partnership and the provisions of the Indian Partnership Act, 1932 on books of account and on money matters when the deed is silent',
    'Prepare partners\' capital and current accounts, including interest on current-account balances',
    'Prepare the Profit and Loss Appropriation Account with interest on capital, salary, a partner\'s or manager\'s commission and reserve',
  ],
  slides: [
    sl('title', 'Fundamentals of Partnership', {
      b: 'Part 1 — what a **partnership** is, what the **Act** and the **deed** say, **capital and current accounts**, and the **Profit and Loss Appropriation Account**.',
      v: vRoute1,
      n: 'Welcome to the first chapter of Class twelve Accounts. A large share of Indian businesses, from workshops to clinics, are run by partners who pool money and skill and share the profit. In this part we see what makes a partnership, what the Indian Partnership Act says when partners have not agreed, how capitals are recorded, and how the year\'s profit is divided.',
    }),
    sl('concept', 'What is a partnership?', {
      bl: [
        'Section 4 of the **Indian Partnership Act, 1932**: partnership is a relation between persons who have agreed to share the profits of a business carried on by all of them or by any of them acting for all.',
        'Persons who enter into it are **partners**; together they are a **firm**; the business runs under the **firm name**.',
      ],
      v: vFeatures,
      n: 'Section four of the Indian Partnership Act describes partnership as a relation between persons who agree to share the profits of a business carried on by all of them, or by any of them acting for all. Six features follow from it. The table shows each one at work in an imagined bamboo furniture workshop run by two friends in Kohima.',
    }),
    sl('concept', 'The Act on books of account and partners\' rights', {
      b: 'Unless the partners agree otherwise, the Act gives every partner these rights and duties.',
      v: vRights,
      n: 'The Act also says how partners deal with each other. Each must be just and faithful and give true accounts and full information. Every partner may take part in the business, ordinary matters go by majority, and every partner, even a sleeping one, may see, inspect and copy the firm\'s books. Section thirteen then sets the money rules, which we meet next.',
    }),
    sl('concept', 'The partnership deed', {
      b: 'The written agreement between partners is the **partnership deed**. It is signed by all partners and stamped as the law requires.',
      v: vDeed,
      n: 'Partners usually write their agreement down in a partnership deed. For the accountant it is the rule book: it gives the capitals, the profit-sharing ratio, the rates of interest and whether interest is a charge, the salaries, commissions and any guarantee of profit, and the rules for later changes. A clear deed prevents quarrels at the year end.',
    }),
    sl('concept', 'When the deed is silent', {
      v: vAct,
      n: `If there is no deed, or it says nothing on a point, section thirteen of the Act decides. Profits and losses are shared equally. No partner gets salary or commission. No interest is allowed on capital, and where it is agreed it is paid only out of profits. No interest is charged on drawings. But a partner who lends money gets six per cent a year, as a charge.`,
    }),
    sl('check', 'Quick check: the deed is silent', {
      b: 'Capitals are unequal. Does that change the rule?',
      chk: 'm_silent_ioc',
      n: 'Recall which money matter earns six per cent under the Act, and which earns nothing at all.',
    }),
    sl('example', 'Worked example 1: settling claims without a deed', {
      b: `**Kannauj Attar House**, an imagined perfume distillery in Kannauj. Darshan, Gargi and Himmat have no deed. Capitals ${W1.names.map((n) => rs(W1.cap[n])).join(', ')}. Gargi lent the firm ${rs(W1.loan)} on 1 July 2025. Profit for 2025-26 before any interest: ${rs(W1.before)}. Four claims are made at the year end.`,
      v: vWE1,
      n: `Settle each claim by the Act. Interest on capital and a salary need an agreement, so both are refused. Gargi's loan earns six per cent, not ten, and only for nine months: ${rupees(W1int)}, charged before profit is shared. The profit left, ${rupees(W1net)}, is shared equally, not in the capital ratio: ${rupees(W1sh.Darshan)} each.`,
    }),
    sl('two-column', 'Fixed and fluctuating capitals', {
      cols: [
        '**Fixed capital method**\n\n- Two accounts per partner: **capital** and **current**.\n- Capital changes only when capital is added or permanently withdrawn.\n- The current account may show a **debit** balance.',
        '**Fluctuating capital method**\n\n- One **capital** account per partner.\n- Every adjustment is recorded in it, so its balance moves every year.\n- Used when a question does not name a method.',
      ],
      v: vFixFluct,
      n: 'Partners\' capitals are kept in one of two ways. Under the fixed capital method, each partner has a capital account that changes only when capital is added or permanently withdrawn, plus a current account for everything else. Under the fluctuating capital method a single capital account records everything. If a question names no method, take capitals as fluctuating.',
    }),
    sl('diagram', 'Where each item goes', {
      v: vWhere,
      n: 'This map saves marks. Capital brought in or permanently withdrawn always goes to the capital account. Whatever a partner earns from the firm, such as interest, salary, commission and share of profit, is credited. Whatever she takes or is charged, such as drawings, interest on drawings and a share of loss, is debited: to the current account if capitals are fixed, to the capital account if they fluctuate.',
    }),
    sl('concept', 'Interest on current account balances', {
      v: vCurInt,
      bl: ['Worked on the **opening** current balance unless the deed says otherwise.', 'A credit balance earns interest; a debit balance is charged interest.'],
      n: 'With fixed capitals, some deeds also allow interest on current account balances. A credit balance means the firm owes the partner, so interest is allowed, just like interest on capital. A debit balance means the partner owes the firm, so interest is charged, just like interest on drawings. Both pass through the appropriation account and the partner\'s current account.',
    }),
    sl('example', 'Worked example 2: current accounts with interest on current balances', {
      b: `**Bhagalpur Silk House**, an imagined firm in Bhagalpur. Eshwar and Jasleen share 3:2; fixed capitals ${rs(W2.cap.Eshwar)} and ${rs(W2.cap.Jasleen)}; opening current balances Eshwar ${rs(W2.open.Eshwar)} (Cr), Jasleen ${rs(-W2.open.Jasleen)} (Dr). Interest on capital ${W2.rate}%, on current balances ${W2.curRate}%; Jasleen's salary ${rs(W2.salaryPm)} a month; drawings ${rs(W2.drawings.Eshwar)} and ${rs(W2.drawings.Jasleen)}; interest on drawings ${rs(W2.iod.Eshwar)} and ${rs(W2.iod.Jasleen)}; net profit ${rs(W2.profit)}.`,
      bl: [`Interest on current balances: Eshwar allowed ${rs(W2ci.Eshwar)}, Jasleen charged ${rs(W2ci.Jasleen)}.`, `Divisible profit ${rs(W2app.divisible)}: Eshwar ${rs(W2app.shares.Eshwar)}, Jasleen ${rs(W2app.shares.Jasleen)}.`],
      v: vWE2cur,
      n: `Eshwar's credit balance earns six per cent, ${rupees(W2ci.Eshwar)}; Jasleen's debit balance is charged ${rupees(W2ci.Jasleen)}. After interest on capital and Jasleen's salary, the divisible profit is ${rupees(W2app.divisible)}, shared three to two. Post everything to the current accounts: Jasleen's opening debit sits on the debit side. Eshwar closes at ${rupees(W2cur.balances.Eshwar)} and Jasleen at ${rupees(W2cur.balances.Jasleen)}.`,
    }),
    sl('check', 'Quick check: a current account in debit', {
      b: 'Think of a partner who takes out more than the firm credits to him.',
      chk: 'tf_current_dr',
      n: 'Ask which account receives drawings when capitals are fixed, and what happens when they exceed the year\'s credits.',
    }),
    sl('diagram', 'The Profit and Loss Appropriation Account', {
      v: vFormat,
      bl: ['It starts from the **net profit** after all charges.', 'Its two sides must total the same.'],
      n: 'The appropriation account divides the net profit found after all charges. On the credit side go the net profit, interest on drawings and interest on any debit current balances. On the debit side go interest on capital and on credit current balances, partners\' salaries and commission, and transfers to reserve. The rest is the divisible profit, shared in the profit-sharing ratio.',
    }),
    sl('concept', 'Interest on capital', {
      v: vIocRules,
      bl: ['On the **opening** capital for the year; on additions from their date; reduced for capital withdrawn from its date.'],
      n: 'Interest on capital runs on the opening capital for the year, on additions from the date they come in, and stops on capital withdrawn from that date. As an appropriation it is paid only out of profit, as section thirteen says: when profit falls short, the whole profit is shared in the ratio of interest due, and in a loss year nothing is allowed. As a charge it is allowed in full.',
    }),
    sl('example', 'Worked example 3: when profit falls short', {
      b: `**Majuli Mask Studio**, an imagined firm on Majuli. Ketaki and Bhupen share 3:2. Capitals on 1 April 2025: ${rs(W3.cap.Ketaki)} and ${rs(W3.cap.Bhupen)}; Ketaki added ${rs(W3.addl)} on 1 October 2025; Bhupen withdrew ${rs(W3.out)} of capital on 1 January 2026. Interest on capital ${W3.rate}% a year. Net profit ${rs(W3.profit)}. Show (a) interest as an appropriation, (b) the same in a loss year, (c) interest as a charge.`,
      v: vWE3,
      n: `Ketaki's interest is ten per cent on her opening capital plus six months on the addition: ${rupees(W3ioc.Ketaki)}. Bhupen's is a full year on his opening capital less three months on the amount withdrawn: ${rupees(W3ioc.Bhupen)}. As an appropriation, the profit is shared in the ratio of interest due. In a loss year, no interest. As a charge, full interest is allowed and the loss of ${rupees(W3loss)} is shared three to two.`,
    }),
    sl('check', 'Quick check: profit short of interest', {
      b: 'Here interest on capital is an appropriation.',
      chk: 'm_insuff',
      n: 'Remember how the mask studio shared its profit when it could not cover the interest due.',
    }),
    sl('concept', 'Salary and commission: partner or manager?', {
      v: vComm,
      bl: ['A partner gets salary or commission **only if the deed provides**: an **appropriation**.', 'A **manager** is an employee: his commission is a **charge**, found before net profit.', 'Read whether commission is on profit **before** or **after** charging it.'],
      n: 'A partner gets salary or commission only if the deed provides, and it is an appropriation. A manager is an employee, so his commission is a charge, taken before the net profit is found. If commission is on profit after charging that commission, divide by one hundred plus the rate. Always read whose profit the commission is calculated on.',
    }),
    sl('example', 'Worked example 4: the manager comes first', {
      b: `**Kollam Cashew Works**, an imagined firm in Kollam. Rukmini, Sudhir and Vinod share 2:2:1. Profit before the manager's commission ${rs(W4.before)}; the manager gets ${W4.mgr}% of net profit **after** charging his commission.`,
      v: vWE4a,
      n: `The manager is paid before the partners. Ten per cent after charging means ${rupees(W4.before)} times ten, divided by one hundred and ten: ${rupees(W4m)}. That is exactly ten per cent of what remains. It is debited in the profit and loss adjustment account, and the net profit of ${rupees(W4adj.net)} goes to the appropriation account.`,
    }),
    sl('example', 'Worked example 4 (contd): the appropriation account', {
      b: `Capitals ${W4.names.map((n) => rs(W4.cap[n])).join(', ')} at ${W4.rate}%; Vinod's salary ${rs(W4.salaryPm)} a month; Sudhir's commission ${W4.commPct}% of the net profit; reserve ${rs(W4.reserve)}; interest on drawings ${W4.names.map((n) => rs(W4.iod[n])).join(', ')}.`,
      v: vWE4b,
      n: `Start from the net profit of ${rupees(W4adj.net)} and add interest on drawings. Debit interest on capital at six per cent, Vinod's salary, Sudhir's commission of ${rupees(W4comm.Sudhir)}, and the reserve. The divisible profit of ${rupees(W4app.divisible)} is shared two to two to one: ${rupees(W4app.shares.Rukmini)} each to Rukmini and Sudhir and ${rupees(W4app.shares.Vinod)} to Vinod.`,
    }),
    sl('check', 'Quick check: commission after charging', {
      b: 'Use the after-charging formula.',
      chk: 'n_comm_after',
      n: 'Divide by one hundred plus the rate, then check that your answer is the rate on what is left.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up. A partnership rests on an agreement, best written as a deed; where the deed is silent, section thirteen of the Act applies. Capitals are fixed, with current accounts, or fluctuating. The appropriation account divides the net profit after charges, allowing interest, salary, commission and reserve before the divisible profit is shared.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Read the deed first: is interest on capital an **appropriation** or a **charge**?',
        'A **manager\'s** commission is a charge; a **partner\'s** is an appropriation.',
        'Interest on additions runs from their date; on withdrawals it stops from theirs: write the months.',
        'Interest on a **debit** current balance is credited to the appropriation account.',
        'Total both sides of every account before moving on.',
      ],
      n: 'Examiners award step marks, so show working notes for interest, commission and the divisible profit. Common slips are putting a manager\'s commission in the appropriation account, charging interest on additional capital for the whole year, allowing interest on capital in a loss year when it is not a charge, and putting interest on a debit current balance on the wrong side.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Fundamentals of Partnership — Part 2: Charges, Interest on Drawings, Guarantee and Past Adjustments',
  goals: [
    'Distinguish charges against profit (interest on a partner\'s loan, rent to a partner) from appropriations and record them through the Profit and Loss Adjustment Account',
    'Calculate interest on drawings by the product method and the average-period method',
    'Record a guaranteed minimum profit borne by one or more partners, and correct past omissions with one adjustment entry',
  ],
  slides: [
    sl('title', 'Charges, drawings, guarantees and past adjustments', {
      b: 'Part 2 — **charges** against profit, **interest on drawings**, **guarantee** of profits and **past adjustments**.',
      v: vRoute2,
      n: 'In Part two we first separate the firm\'s expenses that involve partners from the division of profit. Then we charge interest on what partners withdraw. Next we see what happens when a partner is promised a minimum profit. Finally we correct mistakes that are found only after the accounts have been closed.',
    }),
    sl('concept', 'Charge or appropriation?', {
      v: vChargeAppro,
      n: 'A charge is an expense the firm would bear whoever the other party was. Interest on a partner\'s loan, rent for a partner\'s building and a manager\'s commission are charges, debited before the net profit is found, even in a loss year. Interest on capital, partners\' salary and commission and transfers to reserve are appropriations: they share out a profit that already exists.',
    }),
    sl('example', 'Worked example 5: charges first', {
      b: `**Firozabad Glassworks**, an imagined bangle maker in Firozabad. Mohini and Navneet share 3:2. Profit for 2025-26 before the items below: ${rs(W5.before)}. Navneet lent ${rs(W5.loan)} on 1 October 2025, with no rate agreed. The firm uses Mohini's warehouse at ${rs(W5.rentPm)} a month.`,
      v: vWE5adj,
      n: `With no rate agreed, Navneet's loan earns the Act's six per cent, and only for six months: ${rupees(W5int)}. Rent to Mohini for the year is ${rupees(W5.rentPm * 12)}. Both are charges, so they go to the profit and loss adjustment account, leaving a net profit of ${rupees(W5adj.net)} for the appropriation account.`,
    }),
    sl('example', 'Worked example 5 (contd): then appropriations', {
      b: `Capitals ${rs(W5.cap.Mohini)} and ${rs(W5.cap.Navneet)} earn interest at 5%; Mohini's salary is ${rs(W5.salary.Mohini)} a year.`,
      v: vWE5app,
      n: `Now divide the net profit. Interest on capital at five per cent and Mohini's salary are debited. The divisible profit of ${rupees(W5app.divisible)} is shared three to two: ${rupees(W5app.shares.Mohini)} to Mohini and ${rupees(W5app.shares.Navneet)} to Navneet. Notice that Mohini receives rent and salary in two different accounts.`,
    }),
    sl('check', 'Quick check: rent to a partner', {
      b: 'Would the firm pay this to any landlord?',
      chk: 'm_rent',
      n: 'Decide whether the rent is an expense of running the firm or a way of dividing its profit.',
    }),
    sl('concept', 'Interest on drawings: when and how', {
      v: vAvgPeriod,
      bl: ['Charged only if the **deed provides**; credited to the appropriation account.', 'Different amounts or dates: **product method**. Equal amounts at equal gaps: **average period**.'],
      n: 'Interest on drawings is charged only if the deed says so. When amounts or dates differ, use the product method. When equal amounts are drawn at equal gaps, use an average period: the months left after the first drawing plus the months left after the last, divided by two. If no dates are given, charge interest for six months.',
    }),
    sl('diagram', 'Why six and a half months?', {
      v: vWhy,
      n: 'Here is why monthly drawings at the beginning of each month use six and a half months. The April drawing stays out for twelve months, May for eleven, and so on down to March, for just one month. The average of twelve and one is six and a half. Drawings at the end of each month run from eleven months down to none, so the average is five and a half.',
    }),
    sl('example', 'Worked example 6: the product method', {
      b: `**Bhadohi Carpet House**, an imagined firm in Bhadohi. Partner Waheeda's drawings in 2025-26 were: ${W6items.map(([d, a]) => `${rs(a)} on ${d}`).join('; ')}. Interest on drawings is 8% a year; the year ends on 31 March 2026.`,
      v: vWE6,
      n: `Count the months from each drawing to the year end: eleven, seven, four and one. Multiply each amount by its months and add the products, giving ${rupees(W6.total)}. That total is like one month's borrowing, so interest is eight per cent for one month on it: ${rupees(W6.interest)}.`,
    }),
    sl('example', 'Worked example 7: two methods, one answer', {
      b: `Same firm. Partner Inder drew ${rs(4000)} on the first day of each month from October 2025 to March 2026. Interest on drawings 10% a year.`,
      v: vWE7,
      n: `Six drawings of four thousand rupees stay out for six, five, four, three, two and one months. The products give interest of ${rupees(W7.interest)}. By the average period, the first drawing is out six months and the last one month, so the average is three and a half months on the total of ${rupees(W7.total)}, which gives the same ${rupees(W7.interest)}.`,
    }),
    sl('check', 'Quick check: drawings for part of the year', {
      b: 'Months after the first drawing, months after the last, then average.',
      chk: 'n_iod_span',
      n: 'Count carefully: a drawing made at the end of a month starts counting from the next month.',
    }),
    sl('concept', 'Guarantee of profits to a partner', {
      v: vGuarFlow,
      bl: ['Guarantee by the **firm**: the other partners bear the deficiency in their mutual ratio.', 'Guarantee by **one partner**: that partner bears all of it.', 'Guarantee by **some partners**: they bear it in the ratio they agreed.'],
      n: 'A partner may be promised that her share will not fall below a fixed amount. Divide the profit normally first. If her share is below the minimum, the gap is the deficiency. Whoever gave the guarantee fills it: the other partners in their own ratio if the firm guaranteed, one partner alone if he did, or two partners in whatever ratio they agreed.',
    }),
    sl('example', 'Worked example 8: two guarantors in an agreed ratio', {
      b: `**Makrana Marble Craft**, an imagined firm in Makrana. Akshara, Balwant and Chandni share 5:3:2. Akshara and Balwant guarantee Chandni a minimum of ${rs(W8.min)}, any deficiency to be borne by them **3:1**. Profit for 2025-26: ${rs(W8.profit)}.`,
      v: vWE8,
      n: `Chandni's normal share is two tenths of ${rupees(W8.profit)}, that is ${rupees(W8two.normal.Chandni)}, so the deficiency is ${rupees(W8two.deficiency)}. The guarantors agreed to bear it three to one, not in their profit ratio: Akshara ${rupees(W8two.borne.Akshara)} and Balwant ${rupees(W8two.borne.Balwant)}. The last row shows how different it would be if the firm had given the guarantee.`,
    }),
    sl('diagram', 'Who pays changes the shares', {
      v: vGuarChart,
      n: 'The chart puts the three cases side by side in thousands of rupees. Chandni always reaches her minimum once a guarantee operates. What changes is who pays for it: with a guarantee by the firm, Akshara and Balwant share the cost five to three; under their own agreement, three to one. The firm\'s total profit is the same in every case.',
    }),
    sl('example', 'Worked example 9: guarantee after interest on capital', {
      b: `**Kalimpong Orchid Nursery**, an imagined firm in Kalimpong. Mrinal, Oindrila and Joydeep share 3:2:1; capitals ${W9.names.map((n) => rs(W9.cap[n])).join(', ')}; interest on capital 10%. **Mrinal alone** guarantees that Joydeep's share, after interest, will be at least ${rs(W9.min)}. Net profit ${rs(W9.profit)}.`,
      bl: [`Divisible profit ${rs(W9div)}; Joydeep's share ${rs(W9g.normal.Joydeep)}; deficiency ${rs(W9g.deficiency)} borne by Mrinal.`, `Or by entry: ${cap('Mrinal')} Dr. ${rs(W9g.deficiency)}; To ${cap('Joydeep')} ${rs(W9g.deficiency)}.`],
      v: vWE9,
      n: `Interest on capital comes first, leaving ${rupees(W9div)} to share three to two to one. Joydeep's share is ${rupees(W9g.normal.Joydeep)}, short of his minimum by ${rupees(W9g.deficiency)}. Mrinal alone gave the guarantee, so his share drops to ${rupees(W9g.final.Mrinal)} and Oindrila keeps her full share. The account shows the reduced and increased shares directly.`,
    }),
    sl('check', 'Quick check: who bears the deficiency?', {
      b: 'Who gave the guarantee?',
      chk: 'm_guar_partner',
      n: 'Find the guaranteed partner\'s normal share first, then decide who has to fill the gap.',
    }),
    sl('concept', 'Past adjustments', {
      v: vPastFlow,
      bl: ['Typical errors: interest on capital or drawings omitted or at a wrong rate, salary omitted, profit shared in the wrong ratio.', 'Fixed capitals: **current** accounts. Fluctuating capitals: **capital** accounts.'],
      n: 'Sometimes, after the books are closed, the partners find that interest or a salary was left out, or the profit was shared in the wrong ratio. The accounts are not reopened. Instead a table shows, for each partner, what should have been credited less what was credited. The net effects always total nil, and one entry puts them right.',
    }),
    sl('example', 'Worked example 10: interest and salary omitted', {
      b: `**Tezpur Tea Brokers**, an imagined firm in Tezpur. Neelam, Mehul and Suhail share 2:1:1 with fluctuating capitals of ${W10.names.map((n) => rs(W10.cap[n])).join(', ')} on 1 April 2025. After the 2025-26 profit was distributed, they found that interest on capital at 8% a year and Suhail's salary of ${rs(W10.salaryPm)} a month had been omitted.`,
      v: vWE10,
      n: `Credit each partner with the omitted interest, and Suhail with his salary. Together these are ${rupees(W10tot)} that should have come out of the profit before it was shared, so take that sum back in two to one to one. Adding each column, Neelam loses ${rupees(-W10adj.net.Neelam)}, Mehul loses ${rupees(-W10adj.net.Mehul)} and Suhail gains ${rupees(W10adj.net.Suhail)}.`,
    }),
    sl('example', 'Worked example 10 (contd): entry and adjusted capitals', {
      b: `Entry: ${cap('Neelam')} Dr. ${rs(-W10adj.net.Neelam)} and ${cap('Mehul')} Dr. ${rs(-W10adj.net.Mehul)}; To ${cap('Suhail')} ${rs(W10adj.net.Suhail)}. Capitals after closing were ${W10.names.map((n) => rs(W10.close[n])).join(', ')}.`,
      v: vWE10cap,
      n: `The table becomes one journal entry: Neelam's and Mehul's capital accounts are debited and Suhail's is credited. Because the capitals fluctuate, the entry goes through the capital accounts. Posting it gives adjusted capitals of ${rupees(W10cap.balances.Neelam)}, ${rupees(W10cap.balances.Mehul)} and ${rupees(W10cap.balances.Suhail)}.`,
    }),
    sl('example', 'Worked example 11: the wrong ratio', {
      b: `**Aizawl Bamboo Crafts**, an imagined firm in Aizawl. The profit of ${rs(W11.profit)} was credited equally to Lalremruati, Tejal and Vedant, but the deed says 3:2:1.`,
      bl: [`Entry: ${cap('Vedant')} Dr. ${rs(-W11adj.net.Vedant)}; To ${cap('Lalremruati')} ${rs(W11adj.net.Lalremruati)}. Tejal's account is untouched.`],
      v: vWE11,
      n: `Compare what each partner should have received with what each did receive. Lalremruati should have had half the profit, Tejal a third and Vedant a sixth. Tejal received the right amount, so only Lalremruati and Vedant are adjusted: Vedant's account is debited and Lalremruati's credited with ${rupees(W11adj.net.Lalremruati)}.`,
    }),
    sl('check', 'Quick check: a past adjustment', {
      b: 'Interest omitted, less the same total taken back in the profit ratio.',
      chk: 'n_past',
      n: 'Work out each partner\'s interest, take the total back equally, and compare the two for the partner asked about.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up. Charges such as interest on a partner\'s loan, rent to a partner and a manager\'s commission are met before net profit. Interest on drawings uses the product method or an average period. A guarantee moves a deficiency to the guarantors without changing the firm\'s profit. Past errors are corrected with one entry built from a table whose net effects total nil.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Prepare a **Profit and Loss Adjustment Account** whenever charges are given after the profit figure.',
        'Count months for drawings to the **year end**; with no dates, use **6 months**.',
        'In guarantee questions, write **who** guaranteed and in **what ratio** before dividing.',
        'A guarantee holds in a **loss** year too: deficiency = minimum + share of loss.',
        'Total the net-effect row of a past adjustment: it **must be nil**.',
      ],
      n: 'In the exam, read the guarantee clause twice: the guarantors and their agreed ratio decide everything. Show a profit and loss adjustment account when charges are listed after the profit. For drawings, count months to the year end. In past adjustments, if the net effects do not total nil, recheck the table before writing the entry.',
    }),
  ],
});

// ================================================================ notes
const N = notes({
  title: 'Fundamentals of Partnership — Notes',
  sections: [
    {
      h: '1. Partnership and the Indian Partnership Act, 1932',
      t: 1,
      b: '**Partnership** (Section 4): the relation between persons who have agreed to share the profits of a business carried on by all of them or by any of them acting for all.\n\n**Features:** two or more persons (at most 50, under the Companies Act, 2013 and its rules); an agreement, oral or written; a lawful business; sharing of profits; mutual agency; unlimited liability. Registration is optional, but an unregistered firm cannot sue outsiders to enforce a contract.\n\n**Provisions on accounts and rights** (unless partners agree otherwise):\n- partners must be just and faithful to each other and render true accounts and full information (Section 9);\n- every partner may take part in the conduct of the business (Section 12);\n- ordinary matters are decided by majority; the nature of the business changes only with the consent of all (Section 12);\n- every partner may have access to, inspect and copy any of the books of the firm (Section 12).',
      terms: [
        ['Firm', 'The partners collectively; the business is carried on under the firm name.'],
        ['Mutual agency', 'Each partner is an agent of the others for the firm\'s business, and also a principal bound by their acts.'],
        ['Unlimited liability', 'Partners\' private property can be used to pay the firm\'s debts.'],
        ['Sleeping partner', 'A partner who contributes capital and shares profit but takes no active part; he still has the right to inspect the books.'],
      ],
      v: vFeatures,
      vs: [vRights],
    },
    {
      h: '2. The partnership deed and the rules in its absence',
      t: 2,
      b: '**Partnership deed:** the written agreement among partners, signed and stamped. It usually covers names and business, duration, capitals (fixed or fluctuating), profit-sharing ratio, interest on capital, drawings, current balances and loans, salaries and commission, any guarantee of profit, accounting rules, and rules for admission, retirement, death, goodwill, disputes and dissolution.\n\n**When the deed is silent (Section 13):**\n- profits and losses shared **equally**;\n- **no** salary or commission to any partner;\n- **no** interest on capital; where interest is agreed, it is payable **only out of profits**;\n- **no** interest on drawings;\n- interest on a partner\'s **loan or advance** at **6% per annum**, a charge against profit, from the date of the advance.',
      terms: [
        ['Partnership deed', 'The written agreement setting out the terms of the partnership.'],
        ['Advance by a partner', 'Money lent by a partner beyond capital; it earns 6% a year if nothing is agreed.'],
      ],
      v: vAct,
      vs: [vDeed, vWE1],
    },
    {
      h: '3. Capital and current accounts',
      t: 3,
      b: '**Fixed capital method:** two accounts per partner.\n- **Capital account:** opening capital, additional capital (credit), capital permanently withdrawn (debit). Always a credit balance.\n- **Current account:** interest on capital, salary, commission, share of profit, interest on a credit current balance (credit); drawings, interest on drawings, share of loss, interest on a debit current balance (debit). May have a debit balance.\n\n**Fluctuating capital method:** one capital account per partner records every item; its balance changes every year. Use it when a question names no method.\n\n**Interest on current balances** (only if the deed provides): allowed on a credit balance like interest on capital; charged on a debit balance like interest on drawings; both through the appropriation account.\n\n**Opening capital from closing capital:** closing capital + drawings + interest on drawings + share of loss − share of profit − interest on capital − salary − commission − additional capital = opening capital.',
      terms: [
        ['Current account', 'The account that records a partner\'s routine credits and debits when capitals are fixed.'],
        ['Fluctuating capital', 'A capital account that records every adjustment, so its balance changes each year.'],
        ['Interest on current balance', 'Interest allowed on a credit current balance or charged on a debit one, under the deed.'],
      ],
      v: vFixFluct,
      vs: [vWhere, vCurInt, vWE2app, vWE2cur],
    },
    {
      h: '4. The Profit and Loss Appropriation Account',
      t: 4,
      b: '**Format:** credit net profit (after all charges), interest on drawings and interest on debit current balances; debit interest on capital and on credit current balances, partners\' salary and commission, transfer to reserve; the balance (**divisible profit**) is credited to partners in the profit-sharing ratio.\n\n**Interest on capital:** on opening capital for the year; on additions from their date; reduced for withdrawals from their date.\n- deed silent: none;\n- appropriation, enough profit: full interest;\n- appropriation, profit short: the whole profit shared in the **ratio of interest due**;\n- appropriation, loss: none (Section 13: payable only out of profits);\n- charge: full interest debited to the Profit and Loss Account, even if it causes a loss.\n\n**Commission:**\n- a **manager\'s** commission is a charge (Profit and Loss or Profit and Loss Adjustment Account);\n- a **partner\'s** commission is an appropriation;\n- on profit before charging it: profit × rate ÷ 100; after charging it: profit × rate ÷ (100 + rate).',
      terms: [
        ['Divisible profit', 'Profit left for sharing in the profit-sharing ratio after all appropriations.'],
        ['Appropriation of profit', 'A distribution of the net profit among partners or to reserve.'],
        ['Commission after charging', 'Commission worked out on the profit that remains after deducting that commission.'],
      ],
      v: vFormat,
      vs: [vIocRules, vWE3, vComm, vWE4b],
    },
    {
      h: '5. Charges against profit and interest on drawings',
      t: 5,
      b: '**Charges** are met before net profit, even in a loss year: interest on a partner\'s loan (6% if no rate is agreed), rent paid to a partner, a manager\'s commission. When the profit is given before such items, prepare a **Profit and Loss Adjustment Account**: credit the profit, debit the charges, and transfer the net profit to the appropriation account.\n\n**Interest on drawings** is charged only if the deed provides; it is debited to the partner and credited to the appropriation account.\n- **Product method:** multiply each drawing by the months left to the year end; interest = total of products × rate ÷ 100 × 1/12.\n- **Average period** for equal drawings at equal gaps = (months left after the first drawing + months left after the last) ÷ 2. Whole year: monthly 6½ / 6 / 5½ (beginning / middle / end); quarterly 7½ / 6 / 4½; half-yearly 9 / 6 / 3.\n- Dates not given: 6 months.',
      terms: [
        ['Charge against profit', 'An expense debited before net profit is found, payable whatever the result.'],
        ['Product method', 'Interest on drawings from the sum of each amount multiplied by the months it was outstanding.'],
        ['Average period', 'The average number of months for which equal drawings stay with the partner.'],
      ],
      v: vChargeAppro,
      vs: [vWE5adj, vAvgPeriod, vWhy, vWE6, vWE7],
    },
    {
      h: '6. Guarantee of profits',
      t: 6,
      b: 'A partner is promised a minimum share of profit. Divide the profit (after interest, salary and other appropriations, unless the guarantee says otherwise) in the normal ratio; if the share is below the minimum, the **deficiency** is borne by:\n- the **firm**: the other partners in their mutual profit-sharing ratio;\n- **one partner**: that partner alone;\n- **two or more partners**: in the ratio they agreed (their profit ratio if none is stated).\n\nShow the guarantors\' reduced shares and the guaranteed partner\'s minimum in the appropriation account, or pass an entry: guarantor\'s capital (or current) A/c Dr., to guaranteed partner\'s capital (or current) A/c.\n\nIn a **loss** year the guarantee still holds: deficiency = minimum + the guaranteed partner\'s share of loss. The firm\'s total profit or loss never changes.',
      terms: [
        ['Guaranteed partner', 'A partner promised a minimum share of profit.'],
        ['Deficiency', 'The amount by which a guaranteed partner\'s share falls short of the minimum.'],
        ['Guarantor', 'The partner or partners who promise the minimum and bear the deficiency.'],
      ],
      v: vWE8,
      vs: [vGuarFlow, vGuarChart, vWE9],
    },
    {
      h: '7. Past adjustments',
      t: 7,
      b: 'Errors or omissions found **after** the accounts are closed (interest on capital or drawings omitted or at a wrong rate, salary or commission omitted, a wrong profit-sharing ratio) are corrected without reopening the accounts.\n\n**Method:**\n1. For each partner, list what should have been credited (+) or debited (−).\n2. Deduct what was actually credited: when appropriations were omitted, take their total back in the profit-sharing ratio; for a wrong ratio, compare the right and wrong shares.\n3. Find the **net effect** for each partner; the net effects total **nil**.\n4. Pass one entry: debit the partners who lose, credit those who gain (current accounts if capitals are fixed, capital accounts if fluctuating), and post it to give the adjusted capitals.\n\nWhen interest on capital is omitted and opening capitals are not given, work them back from the closing capitals first.\n\nAdmission of a manager as a partner is not in the ISC 2027 syllabus for guarantee or past-adjustment problems.',
      terms: [
        ['Adjustment entry', 'A single entry between partners\' accounts that corrects the net effect of past errors.'],
        ['Net effect', 'For each partner, what should have been credited less what was credited.'],
      ],
      v: vWE10,
      vs: [vPastFlow, vWE10cap, vWE11],
    },
  ],
  tips: '**How marks are usually split (ISC Accounts, Section A)**\n- 1 mark: one correct option, a term or a short reason.\n- 2 marks: one computation with its working, such as interest on drawings, a commission or a single adjustment entry.\n- 3 marks: a short account or working table, such as a small appropriation account, a past-adjustment table with its entry or interest with additions and withdrawals.\n- 5 marks: a full Profit and Loss Adjustment and Appropriation Account, current accounts, or a guarantee or past-adjustment problem with adjusted capitals.\n\n**Common mistakes**\n- Putting interest on a partner\'s loan, rent to a partner or a manager\'s commission in the appropriation account (they are charges).\n- Charging the Act\'s 6% on a loan for the full year when it was given during the year.\n- Allowing interest on capital in a loss year when the deed does not call it a charge.\n- Charging interest on an addition to capital for the whole year, or ignoring a withdrawal.\n- Treating interest on a debit current balance as an expense of the firm.\n- Counting drawing months to the wrong date, or forgetting 6 months when dates are not given.\n- Letting the guaranteed partner bear part of his own deficiency, or using the profit ratio when the guarantors agreed another ratio.\n- A past-adjustment table whose net effects do not total nil.\n\nAll firms and figures in SOYL practice are imagined; the board paper will give its own.',
});

// ================================================================ flashcards
const F = cards([
  ['**Partnership** (Section 4, Indian Partnership Act, 1932)', 'A relation between persons who agree to share the profits of a business carried on by all or any of them acting for all.', 'definition', 1],
  ['Minimum and maximum number of partners', 'At least **2**; at most **50** (Companies Act, 2013 and its rules).', 'fact', 1],
  ['**Mutual agency**', 'Each partner is an agent of the others for the firm\'s business, and also a principal.', 'definition', 1],
  ['Is registration of a firm compulsory?', '**No.** But an unregistered firm cannot sue outsiders to enforce a contract.', 'fact', 1],
  ['A partner\'s right to the books (Section 12)', 'Every partner, even a sleeping one, may have access to, **inspect and copy** the books.', 'fact', 1],
  ['Section 9 duty on accounts', 'Partners must be just and faithful and give **true accounts** and full information to each other.', 'fact', 1],
  ['Deed silent: sharing of profit', '**Equally**, whatever the capitals.', 'fact', 2],
  ['Deed silent: salary, interest on capital, interest on drawings', '**None** of them.', 'fact', 2],
  ['Deed silent: interest on a partner\'s loan', '**6% per annum** from the date of the advance, a charge.', 'exam-tip', 2],
  ['Section 13 on agreed interest on capital', 'Payable **only out of profits**.', 'fact', 2],
  ['**Fixed capital method**', 'Capital account (permanent changes only) + current account (all routine items).', 'concept', 3],
  ['**Fluctuating capital method**', 'One capital account records everything; balance changes yearly. The default.', 'concept', 3],
  ['Interest on a **credit** current balance', 'Allowed: Dr. P&L Appropriation, Cr. partner\'s current account.', 'concept', 3],
  ['Interest on a **debit** current balance', 'Charged: Dr. partner\'s current account, Cr. P&L Appropriation.', 'concept', 3],
  ['**Divisible profit**', 'Net profit + interest on drawings − interest on capital − salary − commission − reserve.', 'fact', 4],
  ['Profit less than interest on capital (appropriation)', 'Whole profit shared in the **ratio of interest due**.', 'concept', 4],
  ['Loss year, interest on capital not a charge', '**No interest** on capital.', 'concept', 4],
  ['Interest on capital withdrawn during the year', 'Stops from the **date of withdrawal**.', 'exam-tip', 4],
  ['Manager\'s commission: charge or appropriation?', '**Charge**: Profit and Loss (Adjustment) Account.', 'exam-tip', 4],
  ['Commission after charging such commission', 'Profit × rate ÷ **(100 + rate)**.', 'fact', 4],
  ['Rent paid to a partner', '**Charge** against profit, even in a loss year.', 'exam-tip', 5],
  ['**Profit and Loss Adjustment Account**', 'Credits the profit given; debits charges found later; transfers the net profit to appropriation.', 'definition', 5],
  ['Average period for equal drawings', '(Months left after the first drawing + after the last) ÷ **2**.', 'fact', 5],
  ['Average period: monthly drawings (beginning / middle / end)', '**6½ / 6 / 5½** months.', 'fact', 5],
  ['Average period: quarterly drawings (beginning / middle / end)', '**7½ / 6 / 4½** months.', 'fact', 5],
  ['Interest on drawings when dates are not given', 'For **6 months** on the total.', 'fact', 5],
  ['Guarantee by the firm: who bears the deficiency?', 'The **other partners** in their mutual ratio.', 'concept', 6],
  ['Guarantee by two partners in an agreed ratio', 'They bear the deficiency in **that agreed ratio**.', 'concept', 6],
  ['Deficiency in a loss year', 'Minimum **+** the guaranteed partner\'s share of loss.', 'exam-tip', 6],
  ['Past adjustment: net effect of all partners', 'Always **nil**; one entry debits losers and credits gainers.', 'exam-tip', 7],
  ['Past adjustment with fixed capitals', 'Pass it through the **current** accounts.', 'fact', 7],
]);

// ================================================================ tests (ISC class defaults, item for item)
const T_SHORT = test({
  kind: 'short',
  blueprint: 'isc-12-default-chapter-test-short',
  title: 'Chapter test (short) — Fundamentals of Partnership',
  duration: 50,
  sections: [
    { id: 'A', title: 'Section A - Objective (5 marks)', instr: 'Answer all questions. Multiple-choice and assertion-reason items carry 1 mark each.', items: ['m_section4', 'm_fixed_salary', 'm_manager', 'm_guar_firm', 'ar_rent'] },
    { id: 'B', title: 'Section B - Short answer (4 marks)', instr: 'Answer both questions. Internal choice in the second question. Show your working.', items: ['s2_insuff', { attempt: 1, keys: ['s2_iod_quarter', 's2_guar_one'] }] },
    { id: 'C', title: 'Section C - Short answer (6 marks)', instr: 'Answer both questions. Internal choice in the second question. Show accounts and tables in proper form.', items: ['s3_dispute', { attempt: 1, keys: ['s3_approp_small', 's3_past_sal_ioc'] }] },
    { id: 'D', title: 'Section D - Long answer (5 marks)', instr: 'Answer the question. Prepare the accounts in proper form with working notes.', items: ['l5_approp_full'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'isc-12-default-chapter-test-long',
  title: 'Chapter test (long) — Fundamentals of Partnership',
  duration: 100,
  sections: [
    { id: 'A', title: 'Section A - Objective (12 marks)', instr: 'Answer all questions. Multiple-choice and assertion-reason items carry 1 mark each.', items: ['m_books', 'm_agency', 'm_loan_months', 'm_int_current', 'm_not_approp', 'm_charge_loss', 'm_iod_halfend', 'm_loan_loss', 'm_guar_nodef', 'm_past_entry', 'ar_s13', 'ar_guar_total'] },
    { id: 'B', title: 'Section B - Short answer (6 marks)', instr: 'Answer all three questions. Internal choice in the last question.', items: ['s2_partner_test', 's2_manager', { attempt: 1, keys: ['s2_why_65', 's2_past_ratio'] }] },
    { id: 'C', title: 'Section C - Short answer (12 marks)', instr: 'Answer all four questions. Internal choice in the last question. Show working notes.', items: ['s3_opening', 's3_ioc_moves', 's3_pl_adjust', { attempt: 1, keys: ['s3_guar_approp', 's3_past_iod_rate'] }] },
    { id: 'D', title: 'Section D - Long answer (10 marks)', instr: 'Answer both questions. Internal choice in the second question. Prepare accounts and tables in proper form.', items: ['l5_charges', { attempt: 1, keys: ['l5_guar_ioc', 'l5_past_multi'] }] },
  ],
});

// ================================================================ extra gates for this chapter
// 1. TTS-safe narration: words only — no digits, symbols, rupee sign, abbreviations or ALL-CAPS.
for (const d of [part1, part2]) for (const s of d.slides) {
  const m = /[0-9₹%/&()"“”|*#+=<>]|\b[A-Z]{2,}\b|\b(?:Dr|Cr|Rs|A\/c|viz|etc|ie|eg)\b/.exec(s.narration);
  if (m) throw new Error(`narration of deck ${d.part} ${s.id} is not TTS-safe: "${m[0]}" in "${s.narration.slice(Math.max(0, m.index - 30), m.index + 30)}"`);
}
// 2. Near-duplicate stems inside the bank (stage 6 measure: Jaccard of word 5-grams ≥ 0.7 is an error).
const dups = nearDuplicates(BANK, { n: 5, threshold: 0.5, minWords: 5 });
for (const d of dups) {
  if (d.similarity >= 0.7) throw new Error(`near-duplicate stems ${d.a.id} / ${d.b.id} (${Math.round(d.similarity * 100)}%)`);
  console.log(`note: stems ${d.a.id} / ${d.b.id} are ${Math.round(d.similarity * 100)}% similar (never together in one test)`);
}
// 3. Tests: disjoint, blueprint shape, and no deck-check item in either.
const inTest = (t) => t.sections.flatMap((s) => s.items.map((i) => i.question_id));
const shortIds = new Set(inTest(T_SHORT));
check(inTest(T_LONG).every((id) => !shortIds.has(id)), 'the two chapter tests share a question');
const deckChecks = new Set([part1, part2].flatMap((d) => d.slides.map((s) => s.check_question_id).filter(Boolean)));
check(deckChecks.size === CHECK_KEYS.length, 'deck check list out of date');
check([...shortIds, ...inTest(T_LONG)].every((id) => !deckChecks.has(id)), 'a deck-check question is used in a test');
check(T_SHORT.total_marks === 20 && T_LONG.total_marks === 40, `test marks ${T_SHORT.total_marks} / ${T_LONG.total_marks}`);

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t07 of isc-12-accounts-ch01 (partnership and the Act on books of account; the deed and the rules in its absence; fixed and fluctuating capitals and current accounts with interest on current balances; Profit and Loss Appropriation Account with interest on capital, salary, partner\'s and manager\'s commission and reserve; interest on drawings and charges against profit; guarantee of profits; past adjustments); goodwill is ch02; the removed topic (admission of a manager as a partner) appears only as one note',
    originality: 'every firm, partner, scenario and figure written for this chapter and labelled imagined; no ISC or CBSE textbook illustration or exercise and no CISCE specimen or board item reused; firms, people and places differ from the CBSE 12 Accountancy chapters',
    data: 'every amount computed by src/acc.mjs and asserted: journal entries balance, every adjustment, appropriation, capital and current account closes, shares add up to the amount divided, product and average-period methods agree, guarantees keep the total profit unchanged, past-adjustment net effects total nil; tables in decks and model answers are generated from the computed values',
    facts: 'Indian Partnership Act 1932: Section 4 definition, Section 9 true accounts, Section 12 rights including access to and copying of books, Section 13 defaults (equal sharing, no remuneration, interest on capital only out of profits, 6% on advances); 50-partner limit (Companies Act 2013 with Rule 10 of the Companies (Miscellaneous) Rules 2014)',
    gate: 'schema, content lint (lintExemplar), deterministic verify checks, answer-leak scan, TTS-safe narration, near-duplicate stems, whole-number step marks and test disjointness run clean on this chapter',
  },
});
