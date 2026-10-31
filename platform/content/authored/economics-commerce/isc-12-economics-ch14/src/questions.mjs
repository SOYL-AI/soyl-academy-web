// ISC 12 Economics, ch14 Commercial Banks and the Central Bank — question bank. Every bank, town, person and figure is
// imagined by SOYL; no textbook example, exercise, specimen-paper or past-paper item is reused (D-036). Every number in a
// stem, key or worked solution is computed here and asserted, so stems, keys and solutions cannot drift apart.
// Credit creation (simple model): initial primary deposit D, legal reserve ratio r (as a fraction), no cash drain, banks
// fully loaned up: credit multiplier = 1 ÷ r; total deposits = D ÷ r; total credit (loans) created = D ÷ r − D; total
// reserves = D. RBI facts are limited to stable ones (set up in 1935, nationalised in 1949, sole issuer of currency notes
// other than the one-rupee note, banker to government, banker's bank, lender of last resort, custodian of foreign exchange
// reserves). No current repo, reverse repo, bank rate, CRR or SLR value is stated: any ratio in an item is labelled imagined.
import { Q, mcq, ar, tf, fb, match, ord, num, short, long, caseQ, child } from '../../isc-12-economics-ch01/src/lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const S4 = [70, 110];
const L5 = [100, 150];
const L8 = [150, 220];

const assert = (cond, msg) => { if (!cond) throw new Error(`questions.mjs: ${msg}`); };
export const r3 = (x) => Math.round(x * 1000) / 1000;
export const inr = (n) => r3(n).toLocaleString('en-IN');

// ---------------------------------------------------------------- credit-creation engine
export const mult = (r) => r3(1 / r);
export const totalDeposits = (D, r) => r3(D / r);
export const creditCreated = (D, r) => r3(D / r - D);
/** Rounds of deposit creation: each new deposit = previous loan; loan = deposit × (1 − r); reserve = deposit × r. */
export function rounds(D, r, n) {
  const out = [];
  let dep = D;
  for (let i = 0; i < n; i++) {
    const res = r3(dep * r);
    const loan = r3(dep - res);
    out.push({ round: i + 1, deposit: r3(dep), reserve: res, loan });
    dep = loan;
  }
  return out;
}

// ---------------------------------------------------------------- imagined data (all asserted)
// (1) Vasundhara Bank (imagined): a cooperative society deposits ₹50,000; legal reserve ratio 20 per cent.
export const V = { D: 50000, r: 0.2 };
export const V_K = mult(V.r);
export const V_TD = totalDeposits(V.D, V.r);
export const V_CC = creditCreated(V.D, V.r);
export const V_ROUNDS = rounds(V.D, V.r, 4);
assert(V_K === 5 && V_TD === 250000 && V_CC === 200000, 'vasundhara totals');
assert(V_ROUNDS.map((x) => x.deposit).join() === '50000,40000,32000,25600', 'vasundhara deposits');
assert(V_ROUNDS.map((x) => x.loan).join() === '40000,32000,25600,20480', 'vasundhara loans');
assert(V_ROUNDS.map((x) => x.reserve).join() === '10000,8000,6400,5120', 'vasundhara reserves');
export const V_FIRST4 = r3(V_ROUNDS.reduce((s, x) => s + x.deposit, 0));
assert(V_FIRST4 === 147600, 'first four rounds of deposits');

// (2) Swarnapur (imagined economy): primary deposits of ₹1,000 crore; the central bank raises the reserve ratio
// from 10 to 12.5 per cent.
export const SW = { D: 1000, r1: 0.1, r2: 0.125 };
export const SW_TD1 = totalDeposits(SW.D, SW.r1);
export const SW_TD2 = totalDeposits(SW.D, SW.r2);
export const SW_FALL = r3(SW_TD1 - SW_TD2);
assert(SW_TD1 === 10000 && SW_TD2 === 8000 && SW_FALL === 2000, 'swarnapur reserve-ratio change');
assert(mult(SW.r1) === 10 && mult(SW.r2) === 8, 'swarnapur multipliers');

// (3) Kosi Valley banks (imagined): a fresh deposit of ₹80 crore with a 25 per cent ratio.
export const KO = { D: 80, r: 0.25 };
export const KO_TD = totalDeposits(KO.D, KO.r);
export const KO_CC = creditCreated(KO.D, KO.r);
assert(KO_TD === 320 && KO_CC === 240 && mult(KO.r) === 4, 'kosi');

// (4) Initial deposit needed: target total deposits ₹4,00,000 with a 12.5 per cent ratio.
export const NEED = { target: 400000, r: 0.125 };
export const NEED_D = r3(NEED.target * NEED.r);
assert(NEED_D === 50000 && totalDeposits(NEED_D, NEED.r) === NEED.target, 'initial needed');

// (5) High-powered money of an imagined economy (₹ crore): currency held by the public 640, cash reserves of banks
// (vault cash plus deposits with the central bank) 160.
export const HP = { currency: 640, reserves: 160 };
export const HP_H = r3(HP.currency + HP.reserves);
assert(HP_H === 800, 'high-powered money');

// (6) Lendable funds of an imagined bank: deposits ₹600 crore, imagined CRR 5 per cent and SLR 20 per cent.
export const LF = { dep: 600, crr: 0.05, slr: 0.2 };
export const LF_CRR = r3(LF.dep * LF.crr);
export const LF_SLR = r3(LF.dep * LF.slr);
export const LF_LEND = r3(LF.dep - LF_CRR - LF_SLR);
assert(LF_CRR === 30 && LF_SLR === 120 && LF_LEND === 450, 'lendable funds');

const roundsTable = (rows) => `| Round | Deposit (₹) | Reserve kept (₹) | Loan given (₹) |\n|---|---|---|---|\n${rows.map((x) => `| ${x.round} | ${inr(x.deposit)} | ${inr(x.reserve)} | ${inr(x.loan)} |`).join('\n')}`;
export const V_TABLE_MD = roundsTable(V_ROUNDS.slice(0, 3));

// ================================================================ t01 Functions of commercial banks
Q('m_cb_primary', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'A banking manual for new clerks at an imagined Nashik bank lists its two primary functions. They are',
  opts: ['accepting deposits and advancing loans', 'issuing currency notes and keeping foreign exchange', 'renting lockers and selling traveller\'s cheques', 'collecting cheques and paying insurance premiums'],
  sol: 'Accepting deposits and advancing loans are the core (primary) functions of every commercial bank. Issuing notes is a central-bank function; lockers, cheque collection and premium payments are secondary (utility or agency) functions.',
}));
Q('m_fixed_deposit', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Meera, a retired teacher in an imagined Mysuru suburb, wants to place a lump sum with a bank for three years at the highest interest and does not need to withdraw it before then. Which deposit suits her?',
  opts: ['A fixed (time) deposit', 'A current account', 'A savings account', 'A locker'],
  sol: 'A fixed deposit is kept for a stated period and earns a higher rate because the bank can lend it for that period. A current account pays no interest, a savings account pays less, and a locker earns nothing.',
}));
Q('m_overdraft', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'A cloth merchant in an imagined Erode market writes cheques for more than the balance in his current account, up to a limit agreed with his bank, and pays interest only on the extra amount. This form of lending is',
  opts: ['an overdraft', 'a fixed deposit', 'a demand draft', 'a recurring deposit'],
  sol: 'An overdraft lets a current-account holder draw beyond the balance up to a limit, with interest charged only on the amount overdrawn. The other options are deposits or a payment instrument, not loans.',
}));
Q('m_discounting', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'A spice exporter in an imagined Kochi firm holds a buyer\'s bill payable in 90 days but needs cash today. The bank pays him the bill\'s value minus a small charge now. The bank is',
  opts: ['discounting a bill of exchange', 'collecting a cheque as an agent', 'giving a term loan for ten years', 'accepting a recurring deposit'],
  sol: 'Paying the present value of a bill before it is due, less a discount, is discounting a bill of exchange, a way of advancing short-term credit.',
}));
Q('m_agency_function', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'On a standing instruction from Arjun, an imagined Guwahati depositor, his bank pays his life-insurance premium and his electricity bill from his account every month. This is an example of',
  opts: ['an agency function of a commercial bank', 'a primary function of a commercial bank', 'a function of the central bank', 'credit creation'],
  sol: 'Making payments on a customer\'s behalf is an agency function: the bank acts as the customer\'s agent. It is not one of the two primary functions.',
}));
Q('ar_current_trader', ar({
  t: 1, d: 2, c: 'analysis', key: 'a',
  a: 'A wholesale trader who makes many payments every day is better served by a current account than by a savings account.',
  r: 'A current account allows any number of deposits and withdrawals in a day, although it usually pays no interest.',
  sol: 'Both are true, and R explains A: a trader needs unlimited transactions, which a current account allows; giving up interest is the price of that freedom.',
}));
Q('tf_savings_interest', tf({
  t: 1, d: 1, c: 'recall', ans: true,
  stem: 'True or false? A savings account at an imagined Ajmer bank earns some interest but may limit how often money is withdrawn.',
  sol: 'True. A savings account encourages saving: it pays a modest interest rate and may limit the number of withdrawals in a period.',
}));
Q('fb_demand_dep', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'Deposits that can be withdrawn by cheque or on demand at any time, such as current and savings deposits, are called ___ deposits.',
  acc: [['demand']],
  sol: 'Current and savings deposits are demand deposits, payable whenever the depositor asks; fixed deposits are time deposits.',
}));
Q('mt_bank_services', match({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Match each service that an imagined Bhubaneswar branch provides with the kind of bank function it belongs to.',
  pairs: [
    ['Giving a cash-credit limit to a rice mill', 'Primary function: advancing loans'],
    ['Opening a recurring deposit for a student', 'Primary function: accepting deposits'],
    ['Collecting a dividend warrant for a shareholder', 'Agency function'],
    ['Renting out a safe-deposit locker', 'General utility function'],
  ],
  sol: 'Cash credit is a loan and a recurring deposit is a deposit (both primary). Collecting dividends acts on the customer\'s behalf (agency). A locker is a general utility service.',
}));
Q('s_primary_two', short({
  t: 1, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'Explain the two primary functions of a commercial bank, giving one type under each, for a leaflet of an imagined rural bank in Bastar.',
  model: '1. **Accepting deposits**: the bank takes people\'s savings in **current, savings, recurring or fixed deposits**, for example a farmer\'s fixed deposit.\n2. **Advancing loans**: it lends these funds as **cash credit, overdrafts, term loans** or by discounting bills, for example a crop loan.',
  sol: 'Two primary functions, each with one type.',
  scheme: [['Accepting deposits with a type', 1], ['Advancing loans with a form', 1]],
}));
Q('s_agency_utility', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish between the agency functions and the general utility functions of an imagined Raipur commercial bank, with one example of each.',
  model: '**Agency functions**: the bank acts **on behalf of a customer**, for example **collecting cheques** or paying insurance premiums from the customer\'s account. **General utility functions**: services offered to the **public at large** whether or not the bank acts as agent, for example **lockers** or issuing letters of credit.',
  sol: 'Acting for the customer versus general services.',
  scheme: [['Agency function with example', 1], ['Utility function with example', 1]],
}));
Q('s3_loan_forms', short({
  t: 1, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain three forms in which a commercial bank in an imagined Jalandhar market advances loans to its customers.',
  model: '1. **Cash credit**: the borrower may draw up to a limit against goods or other security, paying interest only on the amount used.\n2. **Overdraft**: a current-account holder draws more than the balance, up to an agreed limit.\n3. **Discounting bills of exchange**: the bank pays a bill\'s value before it falls due, keeping a small discount (also **term loans** for buying machines).',
  sol: 'Any three forms: cash credit, overdraft, discounting, demand or term loans.',
  scheme: [['First form explained', 1], ['Second form explained', 1], ['Third form explained', 1]],
}));
Q('s3_three_customers', short({
  t: 1, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Recommend a suitable deposit account for each of three imagined customers of a Lucknow bank, with a reason: (a) a chemist who receives and pays money many times a day, (b) a college student saving a little from her stipend each month, (c) a farmer who has sold his crop and will need the money for a wedding in two years.',
  model: '(a) **Current account**: it allows **unlimited transactions**, which a busy chemist needs.\n(b) **Recurring deposit** (or savings account): she deposits **a fixed sum every month** and earns interest.\n(c) **Fixed deposit for two years**: the money is not needed before then, so it earns a **higher rate**.',
  sol: 'Match the account to how often money is needed.',
  scheme: [['Current account with reason', 1], ['Recurring or savings deposit with reason', 1], ['Fixed deposit with reason', 1]],
}));
Q('l_cb_functions', long({
  t: 1, d: 3, c: 'application', marks: 5, wl: L5,
  stem: 'A new branch of an imagined cooperative bank is opening in a town near Bhilwara.\n\n(a) Explain the two primary functions it will perform, naming the types of deposits and loans. [3]\n(b) Explain two secondary functions it could offer local traders. [2]',
  model: '(a) **Accepting deposits**: it will open **current accounts** for traders (unlimited transactions, no interest), **savings accounts** for households (some interest), and **fixed and recurring deposits** for longer-term savers (higher interest). **Advancing loans**: it will lend these funds as **cash credit** and **overdrafts** for working capital, **discount bills** of exchange, and give **term loans** for machines or shops. The difference between the interest it earns and pays is its main income.\n(b) **Agency**: **collecting cheques and bills** and making payments such as taxes or premiums for customers. **General utility**: **lockers**, **letters of credit** and drafts for traders who buy from distant suppliers.',
  sol: 'Deposits and loans with types; one agency and one utility function.',
  scheme: [['Deposits with three types', 1], ['Loans with forms', 1], ['Link: lends what it receives', 1], ['Agency function', 1], ['Utility function', 1]],
}));

// ================================================================ t02 Credit creation and high-powered money
Q('m_mult_value', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'The imagined banks of the Swarnapur economy must keep 12.5 per cent of their deposits as reserves. What is the credit multiplier?',
  opts: [`${mult(0.125)}`, '12.5', '0.125', '4'],
  sol: `Credit multiplier = 1 ÷ legal reserve ratio = 1 ÷ 0.125 = ${mult(0.125)}.`,
}));
Q('m_kosi_total', mcq({
  t: 2, d: 2, c: 'application',
  stem: `Banks in the imagined Kosi Valley receive a fresh deposit of ₹${KO.D} crore and must keep 25 per cent as reserves. If the process is completed with no cash leaking out, total deposits become`,
  opts: [`₹${KO_TD} crore`, `₹${KO_CC} crore`, `₹${KO.D * 2} crore`, `₹${KO.D / 4} crore`],
  sol: `Total deposits = ${KO.D} ÷ 0.25 = ${KO_TD}. ₹${KO_CC} crore is the credit (loans) created, total deposits minus the initial deposit.`,
}));
Q('m_hpm_parts', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'An imagined Reserve Bank training slide defines high-powered money. It consists of',
  opts: ['currency held by the public plus the cash reserves of banks', 'demand deposits plus time deposits of the public', 'gold held by the central bank only', 'loans given by commercial banks'],
  sol: 'High-powered (reserve) money is currency with the public plus banks\' cash reserves (in their vaults and with the central bank). Deposits and loans are created on top of it.',
}));
Q('m_cash_drain', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'Borrowers from imagined banks in a Bundelkhand district keep a large part of their loans as cash at home instead of depositing it. What happens to credit creation?',
  opts: ['It is smaller than the simple formula suggests, because the cash does not return to banks as new deposits', 'It is larger than the formula, because people hold more money', 'It is unchanged, because the reserve ratio is unchanged', 'It stops completely after the first loan'],
  sol: 'Each round of new deposits depends on loans coming back into banks. Cash kept at home is a leakage, so later rounds are smaller and total credit falls short of 1 ÷ LRR times the deposit.',
}));
Q('m_lrr_raised', mcq({
  t: 2, d: 2, c: 'application',
  stem: `The central bank of the imagined Swarnapur economy raises the reserve ratio from 10 to 12.5 per cent. With primary deposits of ₹${SW.D} crore, total deposits that banks can create`,
  opts: [`fall from ₹${inr(SW_TD1)} crore to ₹${inr(SW_TD2)} crore`, `rise from ₹${inr(SW_TD2)} crore to ₹${inr(SW_TD1)} crore`, 'stay the same', `fall to ₹${SW.D} crore`],
  sol: `Before: ${SW.D} ÷ 0.1 = ${inr(SW_TD1)}. After: ${SW.D} ÷ 0.125 = ${inr(SW_TD2)}. A higher reserve ratio lowers the multiplier from ${mult(SW.r1)} to ${mult(SW.r2)}.`,
}));
Q('ar_cash_leak', ar({
  t: 2, d: 3, c: 'analysis', key: 'a',
  a: 'When people withdraw part of their loans in cash and keep it, banks create less credit than the multiplier formula shows.',
  r: 'Cash held by the public does not come back to the banks as fresh deposits that can be lent again.',
  sol: 'Both are true, and R explains A: credit creation depends on every loan returning as a new deposit; cash kept outside the banks breaks the chain.',
}));
Q('ar_hpm_deposits', ar({
  t: 2, d: 3, c: 'analysis', key: 'c',
  a: 'High-powered money is so called because a given amount of it can support a much larger amount of bank deposits.',
  r: 'High-powered money is made up mainly of the demand deposits of the public with commercial banks.',
  sol: 'A is true: banks build deposits several times larger on the base of reserves. R is false: high-powered money is currency with the public plus bank reserves; the public\'s demand deposits are created on top of it.',
}));
Q('tf_unlimited_credit', tf({
  t: 2, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? An imagined bank in Shimla can create an unlimited amount of credit from a single deposit, because every loan returns to it as a new deposit.',
  sol: 'False. The legal reserve ratio means part of each deposit must be held back, so the rounds shrink; credit is limited to (1 ÷ LRR − 1) times the deposit, and cash leakages and a shortage of willing borrowers cut it further.',
}));
Q('fb_mult_lrr', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'In the simple model of credit creation, the credit multiplier of a banking system equals one divided by the legal ___ ratio.',
  acc: [['reserve']],
  sol: 'Credit multiplier = 1 ÷ legal reserve ratio (the share of deposits banks must keep as reserves).',
}));
Q('n_vas_total', num({
  t: 2, d: 2, c: 'understanding', marks: 1, value: V_TD, unit: '₹',
  stem: `An imagined weavers' cooperative deposits ₹${inr(V.D)} in Vasundhara Bank, and all banks must keep 20 per cent of deposits as reserves. Find the total deposits created when the process is complete (in ₹), assuming no cash leaves the banks.`,
  sol: `Total deposits = ${inr(V.D)} ÷ 0.2 = ${V_TD}, that is ₹${inr(V_TD)}.`,
}));
Q('n_vas_credit', num({
  t: 2, d: 2, c: 'application', marks: 1, value: V_CC, unit: '₹',
  stem: `With the same imagined deposit of ₹${inr(V.D)} at Vasundhara Bank and a 20 per cent reserve ratio, how much credit (total loans) does the banking system create (in ₹)?`,
  sol: `Total deposits ₹${inr(V_TD)} − initial deposit ₹${inr(V.D)} = ${V_CC}, that is ₹${inr(V_CC)}.`,
}));
Q('n_need_initial', num({
  t: 2, d: 3, c: 'application', marks: 1, value: NEED_D, unit: '₹',
  stem: `The imagined banks of a hill district want total deposits of ₹${inr(NEED.target)}, and the reserve ratio is 12.5 per cent. What initial deposit is needed (in ₹)?`,
  sol: `Multiplier = 1 ÷ 0.125 = ${mult(NEED.r)}; initial deposit = ${inr(NEED.target)} ÷ ${mult(NEED.r)} = ${NEED_D}, that is ₹${inr(NEED_D)}.`,
}));
Q('n_hpm_value', num({
  t: 2, d: 2, c: 'understanding', marks: 1, value: HP_H, unit: '₹ crore',
  stem: `In an imagined economy, currency held by the public is ₹${HP.currency} crore and the cash reserves of banks (in their vaults and with the central bank) are ₹${HP.reserves} crore. Find its high-powered money (in ₹ crore).`,
  sol: `High-powered money = currency with the public + bank reserves = ${HP.currency} + ${HP.reserves} = ${HP_H}.`,
}));
Q('ord_vas_chain', ord({
  t: 2, d: 2, c: 'understanding', marks: 1,
  stem: 'Arrange the steps by which a deposit made in the imagined Vasundhara Bank leads to a fresh deposit in another bank.',
  items: [
    'The cooperative deposits its money in Vasundhara Bank',
    'The bank keeps the required reserve and lends the rest',
    'The borrower pays a supplier with the loan',
    'The supplier deposits the money in his own bank, which can lend again',
  ],
  sol: 'Deposit, then reserve and loan, then spending of the loan, then a new deposit elsewhere: one round of credit creation.',
}));
Q('s_hpm_meaning', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is high-powered money? Explain why an imagined central bank economist calls it "high-powered".',
  model: '**High-powered money** (reserve money) is the **currency held by the public plus the cash reserves of banks**. It is "high-powered" because banks can build **deposits several times larger** on these reserves through credit creation, so a change in it changes the money supply **by a multiple**.',
  sol: 'Components and the multiple-expansion reason.',
  scheme: [['Meaning with components', 1], ['Reason for the name', 1]],
}));
Q('s_limits_two', short({
  t: 2, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'State two limitations on the power of the imagined banks of a tribal district in Jharkhand to create credit.',
  model: '1. **Cash drain**: borrowers there keep much of their money as **cash**, so it does not return as deposits.\n2. **Few willing borrowers or little security**: banks can lend only to people who **want loans** and can offer **acceptable security** (also the reserve ratio set by the central bank).',
  sol: 'Any two: reserve ratio, cash drain, borrowers, security, banking habit, central-bank policy.',
  scheme: [['First limitation', 1], ['Second limitation', 1]],
}));
Q('s3_vas_rounds', short({
  t: 2, d: 2, c: 'application', marks: 3, wl: S3,
  stem: `An imagined weavers' cooperative deposits ₹${inr(V.D)} in Vasundhara Bank; the reserve ratio is 20 per cent. Show the first three rounds of deposits, reserves and loans, and find the total deposits created.`,
  model: `**Round 1:** deposit ${inr(V_ROUNDS[0].deposit)}, reserve **${inr(V_ROUNDS[0].reserve)}**, loan **${inr(V_ROUNDS[0].loan)}**. **Round 2:** the loan returns as a deposit of ${inr(V_ROUNDS[1].deposit)}; reserve ${inr(V_ROUNDS[1].reserve)}, loan **${inr(V_ROUNDS[1].loan)}**. **Round 3:** deposit ${inr(V_ROUNDS[2].deposit)}; reserve ${inr(V_ROUNDS[2].reserve)}, loan **${inr(V_ROUNDS[2].loan)}**. When the rounds are complete, total deposits = ${inr(V.D)} × 1 ÷ 0.2 = **₹${inr(V_TD)}**.`,
  sol: 'Reserve 20 per cent, lend 80 per cent, repeat; total by the multiplier.',
  scheme: [['Round 1 correct', 1], ['Rounds 2 and 3 correct', 1], ['Total deposits 2,50,000', 1]],
}));
Q('s3_ratio_change', short({
  t: 2, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: `Primary deposits in the imagined Swarnapur economy are ₹${SW.D} crore. Its central bank raises the reserve ratio from 10 to 12.5 per cent. Calculate total deposits before and after, and explain the effect on credit.`,
  model: `**Before:** multiplier = 1 ÷ 0.1 = ${mult(SW.r1)}; total deposits = **₹${inr(SW_TD1)} crore**. **After:** multiplier = 1 ÷ 0.125 = ${mult(SW.r2)}; total deposits = **₹${inr(SW_TD2)} crore**. Deposits fall by **₹${inr(SW_FALL)} crore**: banks must hold back more of each deposit, so **less is lent** in every round and total credit **contracts**, which suits a time of excess demand.`,
  sol: 'Compute both totals; explain the smaller multiplier.',
  scheme: [['Before: 10,000', 1], ['After: 8,000', 1], ['Credit contracts: reason', 1]],
}));
Q('l_credit_process', long({
  t: 2, d: 3, c: 'application', marks: 5, wl: L5,
  stem: `Bank deposits in the imagined town of Rampur are all held in banks that keep 20 per cent as reserves.\n\n(a) A cooperative deposits ₹${inr(V.D)}. Explain the process of credit creation round by round and find the total deposits and credit created. [3]\n(b) State two assumptions of this process. [2]`,
  model: `(a) The bank keeps **₹${inr(V_ROUNDS[0].reserve)}** (20 per cent) and lends **₹${inr(V_ROUNDS[0].loan)}**. The borrower pays a supplier, who **deposits** it in a bank: a new deposit of ${inr(V_ROUNDS[1].deposit)}, of which ${inr(V_ROUNDS[1].loan)} is lent. Next, ${inr(V_ROUNDS[2].deposit)} is deposited and ${inr(V_ROUNDS[2].loan)} lent, and so on, each round smaller. Total deposits = ${inr(V.D)} × 1 ÷ 0.2 = **₹${inr(V_TD)}**; credit created = ${inr(V_TD)} − ${inr(V.D)} = **₹${inr(V_CC)}**.\n(b) 1. **All loans return** to the banks as deposits: no cash is kept outside. 2. Banks keep **only the required reserve** and lend all the rest, and there are enough **willing borrowers**.`,
  sol: 'Rounds; totals; two assumptions.',
  scheme: [['Round 1 reserve and loan', 1], ['Later rounds explained', 1], ['Totals 2,50,000 and 2,00,000', 1], ['First assumption', 1], ['Second assumption', 1]],
}));
Q('l_credit_limits', long({
  t: 2, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'A student in an imagined Jabalpur school says, "Banks can create as much money as they like, because every loan comes back as a deposit."\n\n(a) Explain what is correct in her statement. [2]\n(b) Evaluate it by explaining three limitations on credit creation. [3]',
  model: '(a) She is right that **loans create deposits**: money lent is spent and **redeposited**, so banks can lend again and total deposits become **a multiple** of the first deposit.\n(b) But the multiple is **limited**. 1. **Legal reserve ratio**: part of every deposit must be kept as reserves, so the rounds **shrink**, and the total is capped at 1 ÷ LRR times the deposit. 2. **Cash drain**: people keep some money as **cash**, which does not return, so actual credit is smaller still. 3. **Borrowers and security**: banks lend only to those who **want loans** and offer **sound security**; in a slump, demand for loans is weak. The central bank can also tighten the ratio. So banks cannot create credit **without limit**.',
  sol: 'What holds, then three limits and a verdict.',
  scheme: [['Loans create deposits', 1], ['Multiple expansion', 1], ['Reserve ratio limit', 1], ['Cash drain', 1], ['Borrowers or security, with verdict', 1]],
}));

// ================================================================ t03 Central bank (RBI): functions
Q('m_rbi_issue', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'A coin collector in an imagined Pune club notes who issues India\'s money. Currency notes of every denomination except the one-rupee note are issued by',
  opts: ['the Reserve Bank of India', 'the Ministry of Finance', 'the State Bank of India', 'every commercial bank'],
  sol: 'The RBI has the sole right to issue currency notes, except one-rupee notes, which (like coins) are issued by the Government of India.',
}));
Q('m_lolr_case', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'Depositors rush to withdraw cash from an imagined but sound commercial bank in Indore after a false rumour. The bank borrows from the RBI to meet the withdrawals. Which function of the RBI is at work?',
  opts: ['Lender of last resort', 'Custodian of foreign exchange reserves', 'Controller of credit through moral suasion', 'Bank of issue'],
  sol: 'When a bank cannot get funds anywhere else, the central bank lends to it, which prevents a panic from spreading. This is its role as lender of last resort.',
}));
Q('m_banker_govt', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'The RBI keeps the central government\'s accounts, makes its payments and arranges its borrowing by selling its bonds. Which role is this, according to an imagined Delhi civil-services handbook?',
  opts: ['Banker, agent and adviser to the government', 'Banker\'s bank', 'Lender of last resort', 'Clearing house for commercial banks'],
  sol: 'Holding the government\'s accounts, handling its payments and managing its borrowing are the functions of a banker and agent to the government.',
}));
Q('m_custodian', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'The RBI holds the country\'s reserves of foreign currencies and gold and uses them to steady the rupee when needed. In this role it acts as',
  opts: ['custodian of foreign exchange reserves', 'banker to the government', 'bank of issue', 'clearing house'],
  sol: 'Keeping and managing the country\'s foreign currency and gold reserves is the custodian role.',
}));
Q('m_rbi_history', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'A timeline in an imagined school exhibition on Indian banking marks two dates for the RBI. Which pair is correct?',
  opts: ['Set up in 1935; nationalised in 1949', 'Set up in 1947; nationalised in 1969', 'Set up in 1921; nationalised in 1955', 'Set up in 1949; nationalised in 1980'],
  sol: 'The RBI began work in 1935 under the RBI Act, 1934, and was nationalised in 1949. (Many commercial banks were nationalised in 1969 and 1980.)',
}));
Q('ar_rbi_profit', ar({
  t: 3, d: 2, c: 'analysis', key: 'a',
  a: 'Unlike a commercial bank, the RBI does not aim to maximise its profit.',
  r: 'As the central bank, the RBI acts in the public interest, for example to keep prices and the banking system stable.',
  sol: 'Both are true, and R explains A: a central bank\'s aims are monetary and financial stability, not profit for its owners.',
}));
Q('tf_rbi_public', tf({
  t: 3, d: 1, c: 'recall', ans: true,
  stem: 'True or false? A display at an imagined Chennai banking museum states that the Reserve Bank of India has been owned by the Government of India since its nationalisation in 1949.',
  sol: 'True. The RBI was nationalised in 1949 and has been fully government-owned since then.',
}));
Q('s_lolr_meaning', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Explain the role of the RBI as lender of last resort, using an imagined bank in Agra that faces a sudden rush of withdrawals.',
  model: 'When the Agra bank\'s **cash runs short** and **no one else will lend** to it, the RBI **lends to it** against eligible securities. Depositors are paid, **panic does not spread** to other banks, and the **banking system stays stable**.',
  sol: 'Last source of funds; prevents collapse and panic.',
  scheme: [['RBI lends when no other source exists', 1], ['Protects depositors and the system', 1]],
}));
Q('s_govt_banker', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two ways in which the RBI acts as banker to the government, as an imagined Finance Ministry trainee would describe them.',
  model: '1. It **keeps the government\'s accounts**, receiving its revenue and **making its payments**.\n2. It **manages public debt**: it sells government bonds and pays interest on them (and gives short-term advances to cover temporary gaps, besides advising on monetary matters).',
  sol: 'Accounts and payments; public debt or advances or advice.',
  scheme: [['Accounts and payments', 1], ['Debt management or advances', 1]],
}));
Q('s3_bankers_bank', short({
  t: 3, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain three ways in which the RBI acts as a "bankers\' bank" for the imagined commercial banks of a state like Karnataka.',
  model: '1. **Keeps their cash reserves**: banks must hold part of their deposits (the CRR) with the RBI.\n2. **Clearing**: banks settle what they owe one another through their **accounts with the RBI**.\n3. **Lends to them**, by rediscounting bills or giving loans against securities, and as **lender of last resort** in a crisis (it also supervises them).',
  sol: 'Reserves, clearing, lending or supervision.',
  scheme: [['Custody of reserves', 1], ['Clearing', 1], ['Lending or supervision', 1]],
}));
Q('s3_cb_vs_rbi', short({
  t: 3, d: 2, c: 'analysis', marks: 3, wl: S3,
  stem: 'Give three differences between an imagined commercial bank in Surat and the Reserve Bank of India.',
  model: '1. **Aim**: the commercial bank works for **profit**; the RBI works for **monetary and financial stability**.\n2. **Customers**: the commercial bank deals with the **public**; the RBI deals with **banks and the government**.\n3. **Powers**: the commercial bank **cannot issue notes** and must obey reserve rules; the RBI **issues currency** and **controls credit**.',
  sol: 'Aim, customers, powers.',
  scheme: [['Aim', 1], ['Customers', 1], ['Powers over currency and credit', 1]],
}));
Q('l_rbi_roles', long({
  t: 3, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'An imagined exhibition panel in a Kolkata museum is titled "What the Reserve Bank does".\n\n(a) Explain three of its functions as a bank of issue and a bank to banks. [3]\n(b) Explain two of its other functions. [2]',
  model: '(a) 1. **Bank of issue**: it has the **sole right to issue currency notes** (except one-rupee notes), which keeps the currency uniform and trusted. 2. **Bankers\' bank**: banks keep **reserves** with it and **settle claims** on one another through it. 3. **Lender of last resort**: it **lends to banks in trouble**, which prevents panics.\n(b) 1. **Banker to the government**: it keeps government accounts, makes payments and **manages public debt**. 2. **Custodian of foreign exchange reserves**: it holds foreign currencies and gold and uses them to **steady the rupee** (it is also the **controller of credit**).',
  sol: 'Issue, bankers\' bank, last resort; two other functions.',
  scheme: [['Bank of issue', 1], ['Bankers\' bank', 1], ['Lender of last resort', 1], ['Banker to government', 1], ['Custodian of reserves or credit control', 1]],
}));

// ================================================================ t04 Quantitative credit control
Q('m_repo_def', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'In the imagined Swarnapur economy, the repo rate is the rate at which',
  opts: ['the central bank lends short-term funds to commercial banks against government securities', 'commercial banks lend to farmers', 'commercial banks lend to one another overnight without security', 'the government borrows from the public'],
  sol: 'Repo is a repurchase agreement: the central bank lends short-term to banks against government securities, which the banks buy back. The reverse repo is the rate at which the central bank borrows from banks.',
}));
Q('m_reverse_up', mcq({
  t: 4, d: 3, c: 'analysis',
  stem: 'The imagined Swarnapur Central Bank raises its reverse repo rate while leaving other rates unchanged. The most likely effect is that commercial banks',
  opts: ['park more surplus funds with the central bank and lend less to the public', 'borrow more from the central bank', 'lend more to the public at lower rates', 'cut the interest they pay on fixed deposits'],
  sol: 'A higher reverse repo rate makes it more rewarding for banks to keep surplus funds with the central bank, so less is lent to the public: credit contracts.',
}));
Q('m_slr_where', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'A trainee at an imagined Chandigarh bank asks how the statutory liquidity ratio differs from the cash reserve ratio. Under the SLR, a bank must keep a share of its deposits',
  opts: ['with itself, in liquid assets such as cash, gold and approved government securities', 'as cash with the central bank only', 'as loans to small industries', 'with foreign banks'],
  sol: 'The SLR is kept by the bank itself in liquid assets (cash, gold, approved securities). The CRR is the share kept as cash with the central bank.',
}));
Q('m_crr_cut', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'Output is falling in an imagined economy and its central bank cuts the cash reserve ratio. Why should this help?',
  opts: ['Banks need to keep less cash with the central bank, so they can lend more', 'Banks must keep more cash idle, so they lend less', 'It raises taxes on bank deposits', 'It makes government bonds more expensive for banks to buy'],
  sol: 'A lower CRR frees part of banks\' deposits for lending; more credit raises spending and output.',
}));
Q('m_inflation_mix', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'Prices in the imagined Swarnapur economy are rising because of excess demand. Which combination of quantitative steps by its central bank suits the situation?',
  opts: ['Raise the repo rate, raise the CRR and sell government securities', 'Cut the repo rate, cut the CRR and buy government securities', 'Raise the repo rate but buy government securities', 'Cut the bank rate and raise the reverse repo rate'],
  sol: 'All three steps in the first option make credit dearer or scarcer, which reduces spending. The second option expands credit; the others mix opposite directions.',
}));
Q('m_bank_rate_meaning', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'An imagined Mumbai finance newsletter explains the bank rate. It is the rate at which the central bank',
  opts: ['lends to commercial banks for longer periods or rediscounts their bills, without a repurchase agreement', 'pays interest on savings accounts', 'buys foreign currency', 'lends overnight to the government only'],
  sol: 'The bank rate is the standard rate for the central bank\'s longer-term lending to banks (or rediscounting their bills); unlike the repo, there is no repurchase agreement.',
}));
Q('ar_crr_slr', ar({
  t: 4, d: 3, c: 'analysis', key: 'c',
  a: 'Raising either the CRR or the SLR reduces the funds that commercial banks can lend.',
  r: 'Under both the CRR and the SLR, banks must keep the required reserves as cash with the central bank.',
  sol: 'A is true: both lock up part of deposits. R is false: only CRR reserves are held with the central bank; SLR assets are kept by the banks themselves in cash, gold and approved securities.',
}));
Q('ar_omo_buy', ar({
  t: 4, d: 3, c: 'analysis', key: 'a',
  a: 'When the central bank buys government securities in the open market, the lending capacity of banks rises.',
  r: 'The central bank pays for the securities, so cash reserves flow into the banking system.',
  sol: 'Both are true, and R explains A: payment for the securities adds to banks\' reserves, which they can lend several times over.',
}));
Q('n_lendable', num({
  t: 4, d: 3, c: 'application', marks: 1, value: LF_LEND, unit: '₹ crore',
  stem: `An imagined bank in Vadodara has deposits of ₹${LF.dep} crore. Suppose (imagined ratios) it must keep 5 per cent as CRR with the central bank and 20 per cent in SLR assets. How much can it lend (in ₹ crore)?`,
  sol: `CRR: 0.05 × ${LF.dep} = ${LF_CRR}; SLR: 0.2 × ${LF.dep} = ${LF_SLR}; lendable = ${LF.dep} − ${LF_CRR} − ${LF_SLR} = ${LF_LEND}.`,
}));
Q('mt_swarnapur_steps', match({
  t: 4, d: 2, c: 'application', marks: 2,
  stem: 'Match each step taken by the imagined Swarnapur Central Bank with the instrument of credit control it uses.',
  pairs: [
    ['It sells treasury bonds to banks and the public', 'Open market operations'],
    ['It asks banks to keep a bigger share of deposits as cash with it', 'Cash reserve ratio'],
    ['It charges banks more for overnight funds against securities', 'Repo rate'],
    ['It raises the share of deposits banks must hold in approved securities', 'Statutory liquidity ratio'],
  ],
  sol: 'Selling bonds is an open market operation; cash with the central bank is the CRR; overnight funds against securities are repo; holding approved securities is the SLR.',
}));
Q('s_crr_slr', short({
  t: 4, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish between the cash reserve ratio and the statutory liquidity ratio, as an imagined bank\'s treasury officer in Hyderabad would explain them.',
  model: '**CRR**: the share of deposits a bank must keep **as cash with the central bank**; it earns nothing. **SLR**: the share of deposits a bank must keep **with itself in liquid assets** such as cash, gold and **approved government securities**, which may earn interest.',
  sol: 'Where and in what form the reserve is kept.',
  scheme: [['CRR: cash with the central bank', 1], ['SLR: liquid assets kept by the bank', 1]],
}));
Q('s_omo_slump', short({
  t: 4, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Demand is deficient in an imagined economy. Should its central bank buy or sell securities in the open market? Explain.',
  model: 'It should **buy securities**. It pays for them, so **cash reserves of banks rise**; banks can **lend more**, credit becomes easier, and **spending and output rise**.',
  sol: 'Buy: reserves up, credit up.',
  scheme: [['Buy securities', 1], ['Reserves and lending rise', 1]],
}));
Q('s3_three_tools_swarnapur', short({
  t: 4, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Prices in the imagined Swarnapur economy have risen for several months because spending exceeds what can be produced. Recommend three quantitative measures to its central bank, with the direction of each and how it works.',
  model: '1. **Raise the repo rate** (and bank rate): banks pay more for funds, so they **charge more on loans** and borrowing falls.\n2. **Raise the CRR** (or SLR): more of each deposit is locked up, so banks have **less to lend**.\n3. **Sell government securities** (open market operations): buyers pay with bank money, so **bank reserves fall** and credit contracts.',
  sol: 'Three contractionary quantitative tools with mechanism.',
  scheme: [['Repo or bank rate raised, with mechanism', 1], ['CRR or SLR raised, with mechanism', 1], ['Securities sold, with mechanism', 1]],
}));
Q('s3_bank_rate_chain', short({
  t: 4, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'The central bank of an imagined economy raises its bank rate. Trace the effect, step by step, on the loans of commercial banks, on spending and on prices.',
  model: '1. Banks now pay **more** when they borrow from or rediscount bills with the central bank, so they **raise their own lending rates**.\n2. Dearer loans make firms and households **borrow less**, so **investment and consumer spending fall**.\n3. With **lower aggregate demand**, the pressure on **prices eases**.',
  sol: 'Cost of funds, borrowing, demand, prices.',
  scheme: [['Banks raise lending rates', 1], ['Borrowing and spending fall', 1], ['Prices ease', 1]],
}));
Q('l_quant_tools', long({
  t: 4, d: 3, c: 'application', marks: 5, wl: L5,
  stem: 'Factories in an imagined economy are running below capacity and banks have plenty of deposits but lend little.\n\n(a) Explain four quantitative instruments the central bank could use, stating the direction of each. [4]\n(b) Why might these steps work only slowly? [1]',
  model: '(a) 1. **Cut the repo rate** and **bank rate**: banks get funds more cheaply and **lower loan rates**. 2. **Cut the CRR**: less cash must be kept with the central bank, so more can be **lent**. 3. **Cut the SLR**: fewer funds are tied up in approved securities. 4. **Buy government securities** in open market operations: **bank reserves rise** and credit becomes easier (a **lower reverse repo rate** also discourages parking funds with the central bank).\n(b) Cheaper credit helps only if **firms and households want to borrow**; when they expect **weak sales**, they may not, so the effect is **slow**.',
  sol: 'Four expansionary tools; limitation.',
  scheme: [['Repo or bank rate cut', 1], ['CRR cut', 1], ['SLR cut', 1], ['Buy securities', 1], ['Reason for slow effect', 1]],
}));

// ================================================================ t05 Qualitative (selective) credit control
Q('m_moral_suasion', mcq({
  t: 5, d: 2, c: 'application',
  stem: 'The governor of the imagined Swarnapur Central Bank meets the heads of banks and urges them, without any formal order, to go slow on loans for buying land. This method is',
  opts: ['moral suasion', 'direct action', 'open market operations', 'raising the cash reserve ratio'],
  sol: 'Persuading banks through advice, letters and meetings, without legal compulsion, is moral suasion.',
}));
Q('m_direct_action', mcq({
  t: 5, d: 2, c: 'application',
  stem: 'An imagined bank in Patna keeps lending for speculation despite repeated warnings. The central bank refuses it further rediscounting facilities and imposes a penalty. This is',
  opts: ['direct action', 'moral suasion', 'a cut in the repo rate', 'credit rationing for all banks'],
  sol: 'Punitive steps against a particular bank that ignores the central bank\'s directions are direct action.',
}));
Q('m_rationing', mcq({
  t: 5, d: 2, c: 'understanding',
  stem: 'The imagined Swarnapur Central Bank fixes a ceiling on the total loans that banks may give for buying luxury cars. This qualitative tool is',
  opts: ['credit rationing', 'the statutory liquidity ratio', 'the bank rate', 'a cash reserve ratio'],
  sol: 'Fixing ceilings or quotas on credit for particular purposes is credit rationing, a selective tool that controls the direction of credit.',
}));
Q('ar_moral_force', ar({
  t: 5, d: 2, c: 'analysis', key: 'b',
  a: 'Moral suasion has no legal force behind it.',
  r: 'Qualitative methods of credit control aim to influence the use or direction of credit rather than its total volume.',
  sol: 'Both are true, but R does not explain A: moral suasion lacks legal force because it is persuasion, not a rule; R describes qualitative methods in general.',
}));
Q('tf_margin_up', tf({
  t: 5, d: 2, c: 'application', ans: true,
  stem: 'True or false? If the imagined Swarnapur Central Bank raises the margin on loans against stocks of pulses from 30 to 50 per cent, a trader offering pulses worth ₹10 lakh as security can borrow less than before.',
  sol: 'True. The trader could borrow ₹7 lakh with a 30 per cent margin but only ₹5 lakh with a 50 per cent margin, so hoarding with borrowed money becomes harder.',
}));
assert(10 * (1 - 0.3) === 7 && 10 * (1 - 0.5) === 5, 'margin loan amounts');
Q('s_qual_quant', short({
  t: 5, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish between quantitative and qualitative methods of credit control, with one example of each, for an imagined banking-awareness quiz in Thrissur.',
  model: '**Quantitative** methods regulate the **total volume** of credit in the economy, for example the **CRR** or the **repo rate**. **Qualitative** (selective) methods regulate the **direction or use** of credit for particular purposes, for example **margin requirements** or credit rationing.',
  sol: 'Volume versus direction, each with an example.',
  scheme: [['Quantitative with example', 1], ['Qualitative with example', 1]],
}));
Q('s3_pulses_hoarding', short({
  t: 5, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Traders in the imagined Swarnapur economy are borrowing from banks to hoard pulses, and pulse prices are rising, although other prices are steady. Suggest three qualitative steps for its central bank and explain why such steps suit this problem better than a general rise in the CRR.',
  model: '1. **Raise the margin** on loans against stocks of pulses, so traders get **less credit** for hoarding.\n2. **Ration credit**: fix a **ceiling** on bank loans to pulse traders.\n3. **Moral suasion**, backed by **direct action** against banks that ignore it. These steps target **one use of credit**; a higher CRR would cut credit to **every** borrower, hurting farmers and firms whose prices are steady.',
  sol: 'Margin, rationing, moral suasion or direct action; targeted versus general.',
  scheme: [['Two qualitative steps', 1], ['Third step', 1], ['Why targeted beats a general CRR rise', 1]],
}));
Q('l_qual_tools', long({
  t: 5, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'An imagined central bank faces rapid price rises in gold and land, fuelled by bank loans, while prices of everyday goods are stable.\n\n(a) Explain four qualitative instruments it could use. [4]\n(b) Evaluate one limitation of these instruments. [1]',
  model: '(a) 1. **Margin requirements**: raise the margin on loans against **gold and land**, so less can be borrowed against them. 2. **Credit rationing**: fix **ceilings** on bank loans for buying gold or land. 3. **Moral suasion**: the governor **advises and persuades** banks, through letters and meetings, to curb such lending. 4. **Direct action**: **penalise** or deny facilities to banks that keep lending for speculation.\n(b) Borrowers may **divert** loans taken for other purposes, or use **non-bank lenders**, so selective controls can be **evaded**; moral suasion also has **no legal force**.',
  sol: 'Four qualitative tools and a limitation.',
  scheme: [['Margin requirements', 1], ['Credit rationing', 1], ['Moral suasion', 1], ['Direct action', 1], ['Limitation evaluated', 1]],
}));

// ================================================================ ISC paper-style items (4-mark, 8-mark) for the bank
Q('q4_vasundhara', short({
  t: 2, d: 3, c: 'application', marks: 4, wl: S4,
  stem: `Answer both parts about an imagined cooperative's deposit of ₹${inr(V.D)} in Vasundhara Bank, where the reserve ratio is 20 per cent. [2 + 2]\n\n(i) Calculate the total deposits and the credit created by the banking system.\n(ii) Explain why the actual amount may be smaller than your answer.`,
  model: `(i) Credit multiplier = 1 ÷ 0.2 = **${V_K}**. Total deposits = ${inr(V.D)} × ${V_K} = **₹${inr(V_TD)}**. Credit created = ${inr(V_TD)} − ${inr(V.D)} = **₹${inr(V_CC)}**.\n(ii) The calculation assumes every loan comes back as a deposit. In practice some borrowers **keep cash** (a cash drain), banks may hold **extra reserves**, and there may not be enough **willing, creditworthy borrowers**, so each round is smaller and the total falls short.`,
  sol: 'Multiplier arithmetic; leakages.',
  scheme: [['(i) Total deposits 2,50,000', 1], ['(i) Credit created 2,00,000', 1], ['(ii) Cash drain', 1], ['(ii) Extra reserves or few borrowers', 1]],
}));
Q('q4_rbi_two_roles', short({
  t: 3, d: 2, c: 'understanding', marks: 4, wl: S4,
  stem: 'Answer both parts. [2 + 2]\n\n(i) Explain how the RBI acts as a bankers\' bank for the imagined commercial banks of Gujarat.\n(ii) Explain how it acts as custodian of the country\'s foreign exchange reserves.',
  model: '(i) Commercial banks keep part of their **reserves with the RBI**, **settle their claims** on one another through their accounts with it, and can **borrow from it** when short of funds, so it does for banks what they do for the public.\n(ii) The RBI **holds the country\'s foreign currencies and gold**, manages them, and **buys or sells foreign currency** to smooth sharp swings in the **rupee\'s exchange rate** and to meet external payments.',
  sol: 'Bankers\' bank; custodian.',
  scheme: [['(i) Reserves and clearing', 1], ['(i) Lending to banks', 1], ['(ii) Holds reserves', 1], ['(ii) Uses them to steady the rupee', 1]],
}));
Q('l8_credit_control', long({
  t: [2, 4], d: 4, c: 'analysis', marks: 8, wl: L8,
  stem: `Answer both parts. [4 + 4]\n\n(i) Primary deposits in the imagined Swarnapur economy are ₹${SW.D} crore. Calculate the total deposits that banks can create with reserve ratios of 10 and 12.5 per cent, and explain the process behind the multiple.\n(ii) Explain how the repo rate and open market operations could be used to support the change in (i) if the aim is to curb inflation.`,
  model: `(i) With **10 per cent**, the multiplier is ${mult(SW.r1)} and total deposits are **₹${inr(SW_TD1)} crore**; with **12.5 per cent**, it is ${mult(SW.r2)} and deposits are **₹${inr(SW_TD2)} crore**, ₹${inr(SW_FALL)} crore less. **Process**: each bank keeps the required share of a deposit and **lends the rest**; the loan is spent and **redeposited** in another bank, which again keeps a reserve and lends; the rounds shrink, and their sum is the deposit divided by the reserve ratio. A higher ratio makes each round smaller.\n(ii) **Raise the repo rate**: banks pay more for short-term funds from the central bank, so they **raise loan rates** and borrowing falls. **Sell government securities**: buyers pay out of bank deposits, so **bank reserves fall** and banks can lend less. Together with the higher reserve ratio, these steps make credit **dearer and scarcer**, cutting spending and easing **inflation**.`,
  sol: 'Totals at two ratios and process; two supporting tools.',
  scheme: [['(i) 10,000 at 10 per cent', 1], ['(i) 8,000 at 12.5 per cent', 1], ['(i) Rounds of reserve and lending', 1], ['(i) Higher ratio, smaller rounds', 1], ['(ii) Repo rate raised: mechanism', 1], ['(ii) Securities sold: mechanism', 1], ['(ii) Combined effect on credit', 1], ['(ii) Link to inflation', 1]],
}));
Q('l8_rbi_tools', long({
  t: [3, 4, 5], d: 4, c: 'evaluation', marks: 8, wl: L8,
  stem: 'Answer both parts. [4 + 4]\n\n(i) Explain four functions of the Reserve Bank of India that make it the apex of the banking system.\n(ii) Compare quantitative and qualitative methods of credit control, and judge which suits a price rise confined to a few commodities.',
  model: '(i) 1. **Bank of issue**: sole issuer of currency notes (except one-rupee notes). 2. **Banker to the government**: keeps its accounts and **manages its debt**. 3. **Bankers\' bank and supervisor**: holds banks\' reserves, clears their claims and regulates them. 4. **Lender of last resort**: rescues sound banks in a crisis (it is also custodian of foreign exchange).\n(ii) **Quantitative** tools (repo and bank rate, CRR, SLR, open market operations) change the **total volume and cost** of credit for **everyone**. **Qualitative** tools (margins, credit rationing, moral suasion, direct action) steer the **direction** of credit for **particular uses**. When prices rise in only **a few commodities**, qualitative tools suit better: they curb **loans for hoarding those goods** without squeezing credit for the rest of the economy, though they can be **evaded** and are best backed by quantitative tightening if the rise spreads.',
  sol: 'Four functions; comparison and judgement.',
  scheme: [['(i) Bank of issue', 1], ['(i) Banker to government', 1], ['(i) Bankers\' bank', 1], ['(i) Lender of last resort', 1], ['(ii) Quantitative: volume for all', 1], ['(ii) Qualitative: direction', 1], ['(ii) Judgement for a few commodities', 1], ['(ii) Limitation or backing noted', 1]],
}));

// ================================================================ case-based
Q('cb_vasundhara_rounds', caseQ({
  t: 2, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Study the imagined record of deposit creation that starts at Vasundhara Bank and answer the questions that follow. *(Written by SOYL for practice; the bank and figures are imagined.)*',
  passage: `**Deposit creation after a weavers' cooperative deposits ₹${inr(V.D)} (imagined; reserve ratio 20 per cent)**\n\n${V_TABLE_MD}\n\nThe bank manager says the process will continue through many more banks until no more can be lent.`,
  parts: [
    child('a', num({ t: 2, d: 2, c: 'understanding', marks: 1, value: V_ROUNDS[3].deposit, unit: '₹', stem: 'What will the deposit be in round 4 (in ₹)?', sol: `Round 4 deposit = loan of round 3 = ${V_ROUNDS[3].deposit}, that is ₹${inr(V_ROUNDS[3].deposit)}.` })),
    child('b', num({ t: 2, d: 2, c: 'application', marks: 1, value: V_TD, unit: '₹', stem: 'Calculate the total deposits when the process is complete (in ₹).', sol: `Total deposits = ${inr(V.D)} ÷ 0.2 = ${V_TD}, that is ₹${inr(V_TD)}.` })),
    child('c', short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Show that, when the process is complete, total reserves equal the initial deposit, and explain why.', model: `Total reserves = 20 per cent of total deposits = 0.2 × ${inr(V_TD)} = **₹${inr(V.D)}**, exactly the **initial deposit**. Lending stops only when the whole of the new cash has been **absorbed as required reserves** across the banks.`, sol: 'Reserves = r × total deposits = D.', scheme: [['Reserves computed as 50,000', 1], ['Reason: process ends when cash is all held as reserves', 1]] }), [
      short({ t: 2, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): The manager expects the full total. Comment on whether this is realistic in a rural district where people prefer to hold cash.', model: 'It is **not fully realistic**. Where people **hold cash**, part of each loan **does not return** as a deposit, so later rounds shrink faster and total deposits stay **below ₹2,50,000**.', sol: 'Cash drain lowers the total.', scheme: [['Not realistic', 1], ['Cash drain explained', 1]] }),
    ]),
  ],
}));
assert(r3(0.2 * V_TD) === V.D, 'reserves equal initial deposit');
Q('cb_swarnapur_minutes', caseQ({
  t: [4, 5], d: 4, c: 'evaluation', origin: 'soyl-original',
  stem: 'Read the imagined minutes of a central bank meeting and answer the questions that follow. *(Written by SOYL for practice; the economy and figures are imagined.)*',
  passage: '**Minutes of the monetary committee, Swarnapur Central Bank (imagined)**\n\nPrices have risen steadily for six months, led by gold and urban land, where buyers rely on bank loans. The committee decided to raise the policy repo rate, to raise the cash reserve ratio by half a percentage point, and to sell government securities worth a large amount over the next month. It also raised the margin on loans against gold and asked bank chiefs, at a meeting, to slow lending for land purchases.',
  parts: [
    child('a', short({ t: 4, d: 2, c: 'understanding', marks: 1, stem: 'Is the central bank trying to expand or to contract credit? Give one piece of evidence.', model: 'To **contract** credit: it **raised the repo rate** (or the CRR, or sold securities).', sol: 'Every step is contractionary.', scheme: [['Contract, with evidence', 1]] })),
    child('b', short({ t: 5, d: 2, c: 'application', marks: 1, stem: 'Name the qualitative methods mentioned in the minutes.', model: '**Margin requirements** (on gold loans) and **moral suasion** (the meeting with bank chiefs).', sol: 'Margin and persuasion.', scheme: [['Both named', 1]] })),
    child('c', short({ t: [4, 5], d: 4, c: 'evaluation', marks: 2, stem: '**Either** (i): Explain how selling government securities will help to slow the price rise.', model: 'Buyers pay for the securities from their **bank deposits**, so **bank reserves fall**. Banks must **cut lending**, credit becomes scarcer, **spending falls**, and the pressure on prices **eases**.', sol: 'Reserves down, credit down, demand down.', scheme: [['Reserves fall', 1], ['Credit and spending fall', 1]] }), [
      short({ t: [4, 5], d: 4, c: 'evaluation', marks: 2, stem: '**Or** (ii): Evaluate why the committee combined general and selective tools.', model: 'General tools (repo, CRR, securities) cool **overall** demand, but by themselves they would squeeze **all borrowers**. Selective tools aim at **gold and land loans**, where the price rise is led. Together they curb the **source** of the rise while limiting harm to other sectors.', sol: 'Broad plus targeted.', scheme: [['Role of general tools', 1], ['Role of selective tools and judgement', 1]] }),
    ]),
  ],
}));
Q('cb_village_branch', caseQ({
  t: [1, 2], d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the imagined report on a new bank branch and answer the questions that follow. *(Written by SOYL for practice; the village and bank are imagined.)*',
  passage: '**A year of the new branch in Hirapur village (imagined)**\n\nBefore the branch opened, families kept their savings in tin boxes and borrowed from a moneylender at very high interest. In its first year the branch opened savings and recurring-deposit accounts for 800 families, gave crop loans and a cash-credit limit to the village dairy, collected cheques for traders and paid farmers\' insurance premiums on their instructions. Many families still withdraw loans in cash and keep it at home.',
  parts: [
    child('a', short({ t: 1, d: 1, c: 'understanding', marks: 1, stem: 'Identify one primary function performed by the branch.', model: '**Accepting deposits** (savings and recurring deposits), or **advancing loans** (crop loans, cash credit).', sol: 'Deposits or loans.', scheme: [['A primary function', 1]] })),
    child('b', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Which kind of function is paying farmers\' insurance premiums on their instructions?', model: 'An **agency function**: the bank acts as the farmers\' **agent**.', sol: 'Agency.', scheme: [['Agency function', 1]] })),
    child('c', short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Explain how the families\' habit of keeping loans in cash affects the branch\'s ability to create credit.', model: 'Cash kept at home **does not come back** as deposits, so the branch and other banks receive **smaller new deposits** in later rounds. This **cash drain** keeps credit creation **well below** the multiplier formula.', sol: 'Cash drain.', scheme: [['Cash does not return', 1], ['Smaller credit creation', 1]] }), [
      short({ t: 1, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): Comment on how the branch has helped the village compared with the moneylender.', model: 'Families now earn **interest on safe deposits** instead of keeping cash in boxes, and they borrow at **lower, regulated rates** for crops and the dairy, so **production can expand** without heavy debt to the moneylender.', sol: 'Safe savings and cheaper credit.', scheme: [['Safe, interest-earning savings', 1], ['Cheaper productive credit', 1]] }),
    ]),
  ],
}));
