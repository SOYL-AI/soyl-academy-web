// CBSE 12 Economics, ch02 Money and Banking — question bank. Every scenario, table and passage is
// written by SOYL (imagined people, banks, places and figures); no NCERT exercise or board/sample-paper
// item is reused. Real-world facts are limited to stable ones (definitions, RBI functions, the direction
// in which each instrument works). No current policy-rate values are stated anywhere.
// Every deposit-creation figure is computed here from the reserve ratio, never typed by hand.
import { Q, mcq, ar, tf, fb, match, ord, num, short, long, caseQ, child } from './lib.mjs';

export const inr = (n) => Number(n).toLocaleString('en-IN');
/** Deposit creation with legal reserve ratio r (a fraction) on an initial deposit d. */
export function creation(d, r) {
  const m = 1 / r;
  const total = Math.round(d * m);
  return { m, total, credit: total - d, reserves: Math.round(total * r) };
}
/** First n rounds of deposit creation: [round, deposit, reserve, loan]. */
export function rounds(d, r, n) {
  const out = [];
  let dep = d;
  for (let i = 1; i <= n; i++) {
    const res = Math.round(dep * r * 100) / 100;
    const loan = Math.round((dep - res) * 100) / 100;
    out.push([i, dep, res, loan]);
    dep = loan;
  }
  return out;
}

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];

// Figures (all imagined) used in questions; checked by assertions below.
const C1 = creation(20000, 0.1); // m_total_dep
const C2 = creation(50000, 0.2); // num_credit
const C3 = { total: 600000, r: 0.125 }; // num_initial
const C3init = C3.total * C3.r;
const C4 = { d: 25000, total: 125000 }; // num_lrr
const C4r = C4.d / C4.total;
const CH = { d: 1000, r1: 0.1, r2: 0.2 }; // s3_numeric_change (₹ crore)
const CH1 = creation(CH.d, CH.r1), CH2 = creation(CH.d, CH.r2);
const CB = { d: 40000, r: 0.25 }; // case cb_bank
const CBc = creation(CB.d, CB.r);
const CBr = rounds(CB.d, CB.r, 3);
const M1 = { cur: 4250, dd: 5130, od: 20 }; // num_m1 (₹ crore, imagined economy)
const LEND = { dep: 500, crr: 0.04, slr: 0.18 }; // num_crr_lend
const lendable = Math.round(LEND.dep * (1 - LEND.crr - LEND.slr));
const MARGIN = { value: 2000000, margin: 0.3 }; // num_margin
const loanM = MARGIN.value * (1 - MARGIN.margin);
for (const [ok, what] of [
  [C1.total === 200000, 'C1'], [C2.credit === 200000, 'C2'], [C3init === 75000, 'C3'], [C4r === 0.2, 'C4'],
  [CH1.total === 10000 && CH2.total === 5000, 'CH'], [CBc.total === 160000 && CBc.credit === 120000, 'CB'],
  [lendable === 390, 'LEND'], [loanM === 1400000, 'MARGIN'],
]) if (!ok) throw new Error(`figure check failed: ${what}`);

// ================================================================ t01 Money: meaning, functions, supply
Q('m_barter_dcw', mcq({
  t: 1, d: 1, c: 'understanding',
  stem: 'A potter wants rice, but the rice farmer he meets wants cloth, not pots. Which drawback of the barter system does this show?',
  opts: ['Lack of double coincidence of wants', 'Lack of a store of value', 'Indivisibility of goods', 'Absence of a standard of deferred payment'],
  sol: 'An exchange under barter needs each party to want exactly what the other offers. Here the wants do not match, so no trade happens. The other options are real drawbacks of barter but are not what this situation shows.',
}));
Q('m_medium', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'A weaver in Varanasi sells a saree for rupees and later uses those rupees to buy wheat and medicines. Which function of money is mainly at work?',
  opts: ['Medium of exchange', 'Unit of account', 'Standard of deferred payment', 'Store of value'],
  sol: 'Money is accepted in one sale and used in a later purchase, so it splits barter into two separate acts of buying and selling. That is its role as a medium of exchange.',
}));
Q('m_store', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Rehana, a fruit seller, keeps part of each day\'s earnings in her savings account to pay her daughter\'s college fees two years later. Which function of money does this show?',
  opts: ['Store of value', 'Medium of exchange', 'Unit of account', 'Transfer of value'],
  sol: 'Fruit would rot in two years, but money keeps its purchasing power far better, so it lets her carry value from today into the future. That is money as a store of value.',
}));
Q('m_deferred', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'A dairy farmer buys a milking machine and agrees to pay the dealer ₹4,000 a month for the next 18 months. Which function of money makes such an agreement possible?',
  opts: ['Standard of deferred payment', 'Medium of exchange', 'Store of value', 'Unit of account'],
  sol: 'The payments are made in the future, and money states them in a form both sides accept today. That is money as a standard of deferred payment.',
}));
Q('m_m1_comp', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'The narrow measure of money supply (M1) in India consists of',
  opts: [
    'currency held by the public, net demand deposits of commercial banks and other deposits with the RBI',
    'currency held by the public and the cash reserves of commercial banks',
    'currency held by the public and the time deposits of commercial banks',
    'currency held by the government and net demand deposits of commercial banks',
  ],
  sol: 'M1 is currency with the public plus net demand deposits held by commercial banks, plus the small item of other deposits with the RBI. Bank reserves and government cash are held by the money-issuing system itself, and time deposits enter only broader measures.',
}));
Q('m_not_money_supply', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Which of the following is **NOT** counted in the money supply of an economy?',
  opts: [
    'Cash kept in the vault of a commercial bank',
    'Currency notes in the wallet of a college student',
    'The balance in a shopkeeper\'s current account',
    'Coins kept by a family in a piggy bank',
  ],
  sol: 'Money supply is the stock of money held by the public. Cash held by banks themselves is a reserve of the money-creating system, not money held by the public, so it is left out. The other three are currency with the public or demand deposits.',
}));
Q('m_legal_tender', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Currency notes issued by the RBI are called **legal tender** because',
  opts: [
    'no one can refuse them in settlement of a payment within the country',
    'they are backed by an equal value of gold kept with the RBI',
    'they earn interest for the person who holds them',
    'they can be used only for paying taxes to the government',
  ],
  sol: 'Legal tender is money that the law says must be accepted for payments. The value of today\'s notes does not come from gold backing, notes do not earn interest, and they are used for all payments, not just taxes.',
}));
Q('m_fiat', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Modern currency notes are called **fiat money** because',
  opts: [
    'their value comes from the order of the government, not from the paper they are printed on',
    'they are made of a metal whose market value equals the face value',
    'they are issued by commercial banks against deposits',
    'they can be exchanged only for foreign currency',
  ],
  sol: 'A note is worth its face value because the government declares it money and people trust that order; the paper itself is almost worthless. Fiat money is not full-bodied metal money and is not issued by commercial banks.',
}));
Q('ar_dd_legal', ar({
  t: 1, d: 3, c: 'analysis', key: 'c',
  a: 'Net demand deposits of commercial banks are a part of the money supply.',
  r: 'Demand deposits are legal tender, so no one can refuse a cheque drawn on them.',
  sol: 'A is true: demand deposits can be withdrawn on demand and used for payments by cheque or digital transfer, so they are part of M1. R is false: a cheque can be refused; demand deposits are not legal tender, they are accepted because people trust banks.',
}));
Q('ar_stock', ar({
  t: 1, d: 2, c: 'analysis', key: 'a',
  a: 'Money supply is a stock concept.',
  r: 'Money supply is measured as the amount of money held by the public at a particular point of time.',
  sol: 'Both are true, and R explains A: a stock is measured at a point of time (for example, on 31 March), and that is exactly how the money held by the public is measured.',
}));
Q('tf_coins', tf({
  t: 1, d: 2, c: 'recall', ans: true,
  stem: 'True or false? In India, one-rupee notes and coins are issued by the Government of India, while other currency notes are issued by the RBI.',
  sol: 'The RBI has the sole right to issue currency notes except one-rupee notes; one-rupee notes and coins are issued by the Government of India and put into circulation through the RBI.',
}));
Q('fb_dcw', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'Barter can take place only when there is a ___ coincidence of wants between the two parties.',
  acc: [['double']],
  sol: 'Barter needs a double coincidence of wants: each party must want what the other offers.',
}));
Q('mt_functions', match({
  t: 1, d: 2, c: 'application',
  stem: 'Match each situation (all imagined) with the function of money it shows.',
  pairs: [
    ['A shopkeeper prices a pen at ₹20 and a notebook at ₹60', 'Unit of account'],
    ['A farmer sells cotton for cash and buys seeds with it', 'Medium of exchange'],
    ['A nurse keeps money aside for her retirement', 'Store of value'],
    ['A student loan is to be repaid over five years', 'Standard of deferred payment'],
  ],
  sol: 'Stating prices in rupees makes values comparable (unit of account); selling for cash and buying with it uses money to exchange (medium of exchange); saving carries value into the future (store of value); repayment over years uses money for future payments (deferred payment).',
}));
Q('num_m1', num({
  t: 1, d: 2, c: 'application', value: M1.cur + M1.dd + M1.od, unit: '₹ crore',
  stem: `In an imagined small economy, currency held by the public is ₹${inr(M1.cur)} crore, net demand deposits of commercial banks are ₹${inr(M1.dd)} crore and other deposits with the central bank are ₹${inr(M1.od)} crore. Calculate the money supply (M1) in ₹ crore.`,
  sol: `Step 1: M1 = currency held by the public + net demand deposits + other deposits with the central bank.\nStep 2: M1 = ${inr(M1.cur)} + ${inr(M1.dd)} + ${inr(M1.od)} = ${inr(M1.cur + M1.dd + M1.od)}. So M1 is ₹${inr(M1.cur + M1.dd + M1.od)} crore.`,
}));
Q('s_barter', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State any two difficulties of the barter system, with an example of each.',
  model: '1. **Lack of double coincidence of wants:** a carpenter who wants milk must find a milkman who wants a chair at the same time.\n2. **No common measure of value:** it is hard to decide how many kilograms of rice equal one goat, so every exchange needs bargaining over a new ratio.',
  sol: 'Any two of: double coincidence, common measure of value, indivisibility, storing value, deferred payments; each with an example.',
  scheme: [['First difficulty with an example', 1], ['Second difficulty with an example', 1]],
}));
Q('s_store', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Explain how money serves as a store of value. Why is it better than goods for this purpose?',
  model: 'Money lets a person **save purchasing power** today and spend it later, because it is accepted at any time. It is better than goods since it **does not rot or need storage space**, is easy to carry, and can be turned into any good when needed, unlike stocks of grain or cattle.',
  sol: 'Define the function (carrying value to the future) and give one or two advantages over storing goods.',
  scheme: [['Meaning: value saved for future use', 1], ['Advantage over goods (perishability, storage, liquidity)', 1]],
}));
Q('s3_m1', short({
  t: 1, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain the components of the narrow money supply (M1). Why are the cash reserves of commercial banks not included in it?',
  model: '1. **Currency held by the public:** notes and coins in the hands of households and firms.\n2. **Net demand deposits of commercial banks:** balances withdrawable on demand, leaving out deposits that banks hold with one another.\n3. **Other deposits with the RBI:** a small item, such as deposits of some public bodies.\nBank cash reserves are left out because M1 measures money **held by the public**, while banks belong to the **money-producing system**.',
  sol: 'Three components, then the reason: money supply is money with the public, and banks are suppliers of money.',
  scheme: [['Currency and demand deposits explained', 1], ['Other deposits with the RBI', 1], ['Reason for excluding bank reserves', 1]],
}));
Q('s3_functions_barter', short({
  t: 1, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Show how three functions of money solve three different problems of the barter system.',
  model: '1. As a **medium of exchange**, money splits each exchange into a sale and a purchase, so a seller need not find a buyer who also has the good he wants: the **double coincidence** problem goes.\n2. As a **unit of account**, every good gets a price in rupees, so there is no need to remember countless exchange ratios.\n3. As a **store of value** and a **standard of deferred payment**, money can be saved and loans can be repaid later, which was hard with perishable goods.',
  sol: 'Pair each function with the barter problem it removes: three correct pairs.',
  scheme: [['Medium of exchange removes the need for double coincidence', 1], ['Unit of account removes the lack of a common measure', 1], ['Store of value or deferred payment removes storage or future-payment problems', 1]],
}));
Q('l_functions', long({
  t: 1, d: 2, c: 'understanding', marks: 5, wl: L5,
  stem: 'What is money? Explain its four functions with an example of each.',
  model: 'Money is anything that is **generally accepted** as a means of payment and a measure of value.\n1. **Medium of exchange:** a tailor sells shirts for rupees and buys cloth with them, so the double coincidence of wants is not needed.\n2. **Unit of account (measure of value):** a bus ticket at ₹30 and a meal at ₹90 can be compared directly; firms keep accounts in rupees.\n3. **Store of value:** a family saves for a wedding next year, because money keeps its value better than grain.\n4. **Standard of deferred payment:** a home loan is repaid in fixed monthly instalments over twenty years.\nThe first two are often called the primary functions and the last two the secondary functions.',
  sol: 'Definition, then four functions, each explained with its own example.',
  scheme: [['Meaning of money', 1], ['Medium of exchange with example', 1], ['Unit of account with example', 1], ['Store of value with example', 1], ['Standard of deferred payment with example', 1]],
}));
Q('cb_money', caseQ({
  t: [1], d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the passage and answer the questions that follow. *(Imagined island and figures, written by SOYL for practice.)*',
  passage: '**From cowries to cards: the imagined island of Tamarind Bay**\n\nFor centuries, families on Tamarind Bay traded fish for coconuts and boat repairs for rice. Traders often waited days to find a partner who wanted exactly what they offered, and nobody agreed on how many fish a canoe was worth. Then the island council began printing paper notes and declared that everyone must accept them for payments. A bank opened soon after. Today, at the end of the financial year, islanders hold notes and coins of 3,400 tamarinds (the island\'s currency) and have 5,600 tamarinds in savings and current accounts, while the bank keeps 900 tamarinds of cash in its own vault.',
  parts: [
    child('a', short({ t: 1, d: 1, c: 'recall', marks: 1, stem: 'Name the drawback of barter shown by traders who "waited days to find a partner".', model: 'Lack of **double coincidence of wants**.', sol: 'Each trader needed a partner who wanted exactly his good: the double coincidence problem.', scheme: [['Double coincidence of wants', 1]] })),
    child('b', short({ t: 1, d: 2, c: 'understanding', marks: 1, stem: 'The council declared that everyone must accept the notes. What kind of money does this make them?', model: '**Legal tender** (fiat money): its acceptance is backed by the order of the authority.', sol: 'Money that must be accepted by law is legal tender; its value rests on the order, so it is fiat money.', scheme: [['Legal tender or fiat money', 1]] })),
    child('c', num({ t: 1, d: 3, c: 'application', marks: 2, value: 9000, unit: 'tamarinds', stem: '**Either** (i): Calculate the money supply (M1) of the island at the end of the year, assuming there are no other deposits with the council.', sol: 'Step 1: M1 = currency held by the public + demand deposits with the bank. The bank\'s vault cash is not held by the public, so it is left out.\nStep 2: M1 = 3,400 + 5,600 = 9,000 tamarinds.', scheme: [['Correct components chosen, vault cash excluded', 1], ['M1 = 9,000 tamarinds', 1]] }), [
      short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): A council member says the bank\'s 900 tamarinds of vault cash should be added to the money supply. Do you agree? Give a reason.', model: '**No.** Money supply counts only money **held by the public**. The bank is part of the system that creates money; its vault cash is a reserve that backs deposits already counted, so adding it would overstate the money available for spending.', sol: 'Disagree, with the reason that money supply is money held by the public and bank reserves are not.', scheme: [['Disagrees', 1], ['Reason: only money with the public is counted', 1]] }),
    ]),
  ],
}));

// ================================================================ t02 Money creation by commercial banks
Q('m_bank_function', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'The two primary functions of a commercial bank are',
  opts: ['accepting deposits and advancing loans', 'issuing currency and managing foreign exchange', 'collecting taxes and paying salaries of government employees', 'fixing the repo rate and the CRR'],
  sol: 'A commercial bank accepts deposits from the public and lends a large part of them. Issuing currency, managing foreign exchange and fixing policy rates are central-bank functions; collecting taxes belongs to the government.',
}));
Q('m_lrr_def', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'The **legal reserve ratio** is the',
  opts: [
    'minimum fraction of deposits that commercial banks must keep as reserves, as fixed by the central bank',
    'rate of interest that banks pay on savings deposits',
    'fraction of its profit that a bank must pay as tax',
    'maximum amount a bank can lend to one borrower',
  ],
  sol: 'The central bank fixes the minimum share of deposits that banks must hold as reserves (in India, through the CRR and SLR). It is not an interest rate, a tax or a single-borrower limit.',
}));
Q('m_multiplier', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'If the legal reserve ratio is 25 per cent, the money multiplier is',
  opts: ['4', '0.25', '25', '75'],
  sol: 'Money multiplier = 1 ÷ LRR = 1 ÷ 0.25 = 4.',
}));
Q('m_total_dep', mcq({
  t: 2, d: 2, c: 'application',
  stem: `A bank receives a fresh deposit of ₹${inr(20000)}. If the legal reserve ratio is 10 per cent and all money stays in the banking system, total deposits created will be`,
  opts: [`₹${inr(C1.total)}`, `₹${inr(C1.credit)}`, `₹${inr(2000)}`, `₹${inr(22000)}`],
  sol: `Total deposits = initial deposit × 1 ÷ LRR = ${inr(20000)} × 10 = ₹${inr(C1.total)}. ₹${inr(C1.credit)} is only the credit created (total minus the initial deposit).`,
}));
Q('m_lrr_rise', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'If the central bank raises the legal reserve ratio, the credit-creating power of commercial banks will',
  opts: ['fall, because the money multiplier becomes smaller', 'rise, because banks hold more reserves', 'stay the same, because deposits do not change', 'rise, because the money multiplier becomes larger'],
  sol: 'The multiplier is 1 ÷ LRR, so a higher LRR means a smaller multiplier. Each deposit supports fewer loans, and credit creation falls.',
}));
Q('m_assume', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'The simple deposit-creation formula (total deposits = initial deposit × 1 ÷ LRR) assumes that',
  opts: [
    'all loans come back to the banking system as deposits and people hold no extra cash',
    'banks keep all their deposits as reserves',
    'the central bank prints new notes in every round',
    'borrowers repay their loans immediately',
  ],
  sol: 'The formula works only if every loan is spent and redeposited in some bank (no cash drain) and banks lend out everything above the required reserve. Keeping all deposits as reserves would mean no lending at all.',
}));
Q('ar_credit', ar({
  t: 2, d: 3, c: 'analysis', key: 'a',
  a: 'Commercial banks can create deposits several times larger than the fresh deposits they receive.',
  r: 'A loan given by one bank is spent and returns to the banking system as a new deposit, part of which is lent again.',
  sol: 'Both are true, and R explains A: because each loan is redeposited and partly lent again, deposits multiply over many rounds until total reserves equal the required share of total deposits.',
}));
Q('ar_cash_drain', ar({
  t: 2, d: 3, c: 'analysis', key: 'b',
  a: 'If borrowers keep part of their loans as cash, actual deposit creation is smaller than the simple formula predicts.',
  r: 'The money multiplier equals the reciprocal of the legal reserve ratio.',
  sol: 'A is true: cash held outside banks leaks out of each round, so less is redeposited. R is also true as the simple formula, but it does not explain A; the explanation is the cash leakage, not the definition of the multiplier.',
}));
Q('tf_lrr_inverse', tf({
  t: 2, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? The money multiplier rises when the legal reserve ratio rises.',
  sol: 'The multiplier is 1 ÷ LRR, so they move in opposite directions: a higher reserve ratio gives a smaller multiplier.',
}));
Q('fb_multiplier', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'Money multiplier = 1 ÷ ___ .',
  acc: [['legal reserve ratio', 'LRR', 'reserve ratio']],
  sol: 'The money multiplier is the reciprocal of the legal reserve ratio (LRR).',
}));
Q('ord_creation', ord({
  t: 2, d: 2, c: 'understanding', marks: 1,
  stem: 'Arrange the steps of one round of deposit creation in the correct order.',
  items: [
    'A customer deposits cash in Bank A',
    'Bank A keeps the required reserve with itself and the central bank',
    'Bank A lends the rest to a borrower',
    'The borrower pays a supplier, who deposits the money in Bank B',
  ],
  sol: 'A deposit comes first; the bank sets aside the required reserve; it lends the excess; the loan is spent and returns to a bank as a new deposit, which starts the next round.',
}));
Q('num_credit', num({
  t: 2, d: 2, c: 'application', value: C2.credit, unit: '₹',
  stem: `An imagined bank receives a fresh deposit of ₹${inr(50000)}. The legal reserve ratio is 20 per cent. Calculate the credit (loans) created by the banking system.`,
  sol: `Step 1: Money multiplier = 1 ÷ 0.2 = ${C2.m}.\nStep 2: Total deposits = ${inr(50000)} × ${C2.m} = ₹${inr(C2.total)}.\nStep 3: Credit created = total deposits − initial deposit = ${inr(C2.total)} − ${inr(50000)} = ₹${inr(C2.credit)}.`,
}));
Q('num_initial', num({
  t: 2, d: 3, c: 'application', value: C3init, unit: '₹',
  stem: `Total deposits created in an imagined banking system are ₹${inr(C3.total)}. The legal reserve ratio is 12.5 per cent. Find the initial deposit.`,
  sol: `Step 1: Money multiplier = 1 ÷ 0.125 = ${1 / C3.r}.\nStep 2: Initial deposit = total deposits ÷ multiplier = ${inr(C3.total)} ÷ ${1 / C3.r} = ₹${inr(C3init)}.`,
}));
Q('num_lrr', num({
  t: 2, d: 3, c: 'application', value: C4r * 100, unit: '%',
  stem: `An initial deposit of ₹${inr(C4.d)} leads to total deposits of ₹${inr(C4.total)} in an imagined banking system. Calculate the legal reserve ratio (in per cent).`,
  sol: `Step 1: Money multiplier = total deposits ÷ initial deposit = ${inr(C4.total)} ÷ ${inr(C4.d)} = ${C4.total / C4.d}.\nStep 2: LRR = 1 ÷ multiplier = 1 ÷ ${C4.total / C4.d} = ${C4r}, that is ${C4r * 100}%.`,
}));
Q('s_multiplier', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is the money multiplier? How is it related to the legal reserve ratio?',
  model: 'The **money multiplier** is the number of times total deposits can grow from a fresh deposit: total deposits = initial deposit × multiplier. It equals **1 ÷ LRR**, so it is **inversely related** to the reserve ratio: a 10 per cent LRR gives 10, a 20 per cent LRR gives only 5.',
  sol: 'Meaning, then the formula with the inverse relation (an example helps).',
  scheme: [['Meaning of money multiplier', 1], ['Formula 1 ÷ LRR and inverse relation', 1]],
}));
Q('s_two_assume', short({
  t: 2, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'State two assumptions on which the process of money creation by commercial banks is based.',
  model: '1. **All transactions pass through banks:** every loan is spent and the whole amount comes back to some bank as a deposit; nobody holds extra cash.\n2. Banks keep **only the required reserves** and lend out everything else, because there are always willing borrowers.',
  sol: 'Any two: no cash drain, banks hold only the legal reserves, enough borrowers, one LRR for all banks.',
  scheme: [['First assumption', 1], ['Second assumption', 1]],
}));
Q('s3_numeric_change', short({
  t: 2, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `In an imagined economy, fresh deposits of ₹${inr(CH.d)} crore enter the banks. Calculate total deposits when the legal reserve ratio is (i) 10 per cent and (ii) 20 per cent. What does the change show?`,
  model: `(i) Multiplier = 1 ÷ 0.1 = ${CH1.m}; total deposits = ${inr(CH.d)} × ${CH1.m} = **₹${inr(CH1.total)} crore**.\n(ii) Multiplier = 1 ÷ 0.2 = ${CH2.m}; total deposits = ${inr(CH.d)} × ${CH2.m} = **₹${inr(CH2.total)} crore**.\nDoubling the reserve ratio **halves** deposit creation (a fall of ₹${inr(CH1.total - CH2.total)} crore). So the central bank can **reduce credit** in the economy by raising the reserve ratio, and expand it by lowering the ratio.`,
  sol: 'Two multiplier calculations, then the conclusion about the inverse relation and its use as a policy tool.',
  scheme: [['Total deposits at 10 per cent', 1], ['Total deposits at 20 per cent', 1], ['Interpretation: higher LRR reduces credit', 1]],
}));
Q('l_creation', long({
  t: 2, d: 3, c: 'application', marks: 5, wl: L5,
  stem: 'Explain the process of money creation by commercial banks with the help of a numerical example (take an initial deposit of ₹10,000 and a legal reserve ratio of 20 per cent).',
  model: `1. Kamal deposits **₹10,000** in Bank A. Bank A must keep 20 per cent, **₹2,000**, as reserve and lends **₹8,000**.\n2. The borrower spends ₹8,000; the seller deposits it in Bank B, which keeps ₹1,600 and lends **₹6,400**.\n3. This goes on in rounds (₹5,120 lent next), each round smaller than the last.\n4. It stops when total reserves equal 20 per cent of total deposits: **total deposits = 10,000 × 1 ÷ 0.2 = ₹${inr(creation(10000, 0.2).total)}**, and **credit created = ₹${inr(creation(10000, 0.2).credit)}**.\n5. This assumes every loan is redeposited and banks keep only the required reserve.`,
  sol: 'Rounds with reserve and loan, the multiplier result, and the assumptions.',
  scheme: [['First round: reserve and loan', 1], ['Second round shows redeposit and relending', 1], ['Rounds continue, shrinking', 1], ['Total deposits and credit by the multiplier', 1], ['Assumptions stated', 1]],
}));
Q('l_limits', long({
  t: 2, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: '"In practice, banks create much less money than the simple formula 1 ÷ LRR suggests." Evaluate this statement.',
  model: '1. **Cash drain:** people keep part of their income and loans as **cash**, which leaks out of each round, so less is redeposited.\n2. **Excess reserves:** banks often keep **more than the required** reserves to meet withdrawals safely.\n3. **Demand for loans:** in a slowdown, firms may **not want to borrow**, so banks cannot lend all their excess reserves.\n4. **Creditworthy borrowers:** banks lend only against good security and repayment capacity.\n5. **Judgement:** the statement is largely **valid**; the formula gives the **maximum** possible creation, and actual creation depends on these leakages, though the direction of the effect of the LRR still holds.',
  sol: 'Four limiting factors and a reasoned judgement that the formula is an upper limit.',
  scheme: [['Cash drain', 1], ['Excess reserves', 1], ['Weak demand for loans', 1], ['Need for creditworthy borrowers or security', 1], ['Balanced judgement', 1]],
}));
Q('cb_bank', caseQ({
  t: 2, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Study the table and answer the questions that follow. *(Imagined bank and figures, written by SOYL for practice.)*',
  passage: `**Deposit creation starting at Sahyadri Bank (imagined), legal reserve ratio 25 per cent**\n\n| Round | Deposit received (₹) | Reserve kept (₹) | Loan given (₹) |\n|---|---|---|---|\n${CBr.map(([i, d, r, l]) => (i < 3 ? `| ${i} | ${inr(d)} | ${inr(r)} | ${inr(l)} |` : `| ${i} | ${inr(d)} | ? | ? |`)).join('\n')}\n| … | … | … | … |`,
  parts: [
    child('a', num({ t: 2, d: 2, c: 'application', marks: 1, value: CBr[2][3], unit: '₹', stem: 'Find the loan given in round 3.', sol: `Step 1: Reserve in round 3 = 25 per cent of ${inr(CBr[2][1])} = ${inr(CBr[2][2])}.\nStep 2: Loan = ${inr(CBr[2][1])} − ${inr(CBr[2][2])} = ${inr(CBr[2][3])}. So ₹${inr(CBr[2][3])}.` })),
    child('b', num({ t: 2, d: 2, c: 'application', marks: 1, value: CBc.total, unit: '₹', stem: 'Calculate the total deposits created when the process is complete.', sol: `Step 1: Multiplier = 1 ÷ 0.25 = ${CBc.m}.\nStep 2: Total deposits = ${inr(CB.d)} × ${CBc.m} = ${inr(CBc.total)}. So ₹${inr(CBc.total)}.` })),
    child('c', short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Calculate the total credit created and show that total reserves equal 25 per cent of total deposits at the end.', model: `Credit created = ${inr(CBc.total)} − ${inr(CB.d)} = **₹${inr(CBc.credit)}**. Total reserves = 0.25 × ${inr(CBc.total)} = **₹${inr(CBc.reserves)}**, which equals the initial deposit of ₹${inr(CB.d)}: the whole fresh deposit has become reserves, so no excess is left to lend and the process stops.`, sol: 'Subtract the initial deposit from total deposits, then compare total reserves with the initial deposit.', scheme: [['Credit created', 1], ['Reserves equal 25 per cent of total deposits, explained', 1]] }), [
      short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): If customers kept part of every loan as cash, would the total in part (b) be reached? Explain.', model: '**No.** Cash kept outside banks is **not redeposited**, so each later round starts smaller and the chain ends sooner. Total deposits would be **less than** the figure given by the multiplier, which assumes no cash drain.', sol: 'Answer no, with the reason: cash leakage shrinks every round.', scheme: [['Says no', 1], ['Reason: cash drain reduces redeposits', 1]] }),
    ]),
  ],
}));

// ================================================================ t03 Central bank (RBI) and its functions
Q('m_rbi_issue', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'Which institution has the sole right to issue currency notes in India (other than one-rupee notes)?',
  opts: ['The Reserve Bank of India', 'The State Bank of India', 'The Ministry of Finance', 'The Securities and Exchange Board of India'],
  sol: 'As the bank of issue, the RBI alone issues currency notes except one-rupee notes. The State Bank of India is a commercial bank; the finance ministry issues coins and one-rupee notes; SEBI regulates securities markets.',
}));
Q('m_lender_last', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'The RBI is called the **lender of last resort** because it',
  opts: [
    'gives funds to commercial banks in difficulty when they cannot get them anywhere else',
    'lends to the public only after banks refuse them',
    'lends to foreign governments in a crisis',
    'is the last bank to fix its interest rates',
  ],
  sol: 'When a sound commercial bank faces a sudden shortage of funds and no other source helps, the central bank provides funds, which protects depositors and the banking system. It does not lend directly to the public in the ordinary course.',
}));
Q('m_govt_bank', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'The RBI keeps the accounts of the central government, receives and makes payments for it and manages its borrowing. In this role it acts as',
  opts: ['banker to the government', 'bankers\' bank', 'custodian of foreign exchange reserves', 'controller of credit'],
  sol: 'Keeping government accounts, making payments and managing public debt are the tasks of a banker, agent and adviser to the government.',
}));
Q('m_repo_def', mcq({
  t: 3, d: 2, c: 'recall',
  stem: 'The **repo rate** is the rate at which',
  opts: [
    'the RBI lends short-term funds to commercial banks against government securities',
    'commercial banks lend to their best customers',
    'the RBI borrows from commercial banks',
    'the government borrows from the public',
  ],
  sol: 'Under a repurchase agreement, banks get short-term funds from the RBI by selling securities with a promise to buy them back; the interest charged is the repo rate. The RBI borrowing from banks describes the reverse repo rate.',
}));
Q('m_reverse_repo', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'If the RBI raises the **reverse repo rate**, commercial banks are likely to',
  opts: [
    'park more surplus funds with the RBI and lend less to the public',
    'borrow more from the RBI and lend more to the public',
    'reduce the cash reserves they keep with the RBI',
    'pay lower interest to their depositors',
  ],
  sol: 'The reverse repo rate is what the RBI pays banks on funds they park with it. A higher rate makes parking funds more attractive than lending, so credit to the public tends to fall.',
}));
Q('m_inflation_tool', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'Prices in an economy are rising fast because of excess demand. Which step by the central bank would help to control it?',
  opts: ['Raising the repo rate', 'Lowering the cash reserve ratio', 'Buying government securities in the open market', 'Lowering the margin requirement on loans'],
  sol: 'A higher repo rate makes borrowing from the central bank costlier, so banks raise their lending rates and credit and spending fall. The other three steps add to bank lending and would feed demand further.',
}));
Q('m_omo_sell', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'When the RBI **sells** government securities in the open market,',
  opts: [
    'money flows from banks and the public to the RBI, so banks have less to lend',
    'banks receive more cash and can lend more',
    'the government gets new money to spend',
    'the cash reserve ratio rises automatically',
  ],
  sol: 'Buyers pay the RBI for the securities, which drains reserves from the banking system and reduces lending. Buying securities has the opposite effect; the CRR changes only when the RBI changes it.',
}));
Q('m_margin_mcq', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'If the RBI raises the **margin requirement** on loans against a type of security, a borrower offering that security will',
  opts: ['get a smaller loan for the same value of security', 'get a larger loan for the same value of security', 'pay a lower rate of interest', 'not need to offer any security'],
  sol: 'The margin is the part of the security\'s value that the bank does not lend. A higher margin means a smaller loan against the same security, which reduces credit for that purpose.',
}));
Q('m_slr', mcq({
  t: 3, d: 2, c: 'recall',
  stem: 'Under the **statutory liquidity ratio** (SLR), commercial banks must keep a fixed share of their deposits',
  opts: [
    'with themselves in liquid assets such as cash, gold and approved government securities',
    'as cash balances with the RBI',
    'as loans to priority sectors',
    'in foreign currency with the RBI',
  ],
  sol: 'SLR assets are held by the bank itself in liquid form. Cash kept with the RBI is the cash reserve ratio (CRR).',
}));
Q('m_qualitative', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Which of the following is a **qualitative** (selective) instrument of credit control?',
  opts: ['Margin requirement', 'Cash reserve ratio', 'Repo rate', 'Open market operations'],
  sol: 'Margin requirements change credit for particular purposes or securities, so they are selective. CRR, repo rate and open market operations change the overall volume of credit, so they are quantitative.',
}));
Q('m_deflation', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'An economy faces deficient demand: output is falling and unemployment is rising. Which combination of central-bank steps fits this situation?',
  opts: [
    'Lower the repo rate and buy government securities',
    'Raise the cash reserve ratio and sell government securities',
    'Raise the bank rate and the margin requirement',
    'Raise the reverse repo rate and the statutory liquidity ratio',
  ],
  sol: 'To raise demand the central bank must make credit cheaper and more plentiful: a lower repo rate cuts borrowing costs, and buying securities puts money into banks. Every other combination tightens credit.',
}));
Q('ar_crr', ar({
  t: 3, d: 3, c: 'analysis', key: 'c',
  a: 'A cut in the cash reserve ratio increases the lending capacity of commercial banks.',
  r: 'A cut in the cash reserve ratio reduces the money multiplier.',
  sol: 'A is true: banks need to keep less cash with the RBI, so more of each deposit can be lent. R is false: a lower reserve ratio **raises** the money multiplier (1 ÷ LRR becomes larger).',
}));
Q('ar_repo', ar({
  t: 3, d: 3, c: 'analysis', key: 'a',
  a: 'A rise in the repo rate tends to make home and car loans costlier.',
  r: 'When banks have to pay more for funds borrowed from the RBI, they pass on the higher cost to their borrowers.',
  sol: 'Both are true, and R explains A: the repo rate is the cost of short-term funds for banks, so a higher repo rate raises their lending rates.',
}));
Q('ar_custodian', ar({
  t: 3, d: 2, c: 'understanding', key: 'c',
  a: 'The RBI is the custodian of India\'s foreign exchange reserves.',
  r: 'The RBI is a commercial bank whose main aim is to earn profit.',
  sol: 'A is true: the RBI holds and manages the country\'s foreign exchange reserves. R is false: a central bank works in the public interest, for monetary and financial stability, not for profit.',
}));
Q('tf_bank_rate', tf({
  t: 3, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? A rise in the bank rate generally discourages borrowing by businesses and households.',
  sol: 'When the central bank lends to banks at a higher bank rate, banks raise their own lending rates, so borrowing becomes costlier and falls.',
}));
Q('mt_instruments', match({
  t: 3, d: 2, c: 'understanding',
  stem: 'Match each instrument of the central bank with its description.',
  pairs: [
    ['Cash reserve ratio', 'Share of deposits banks must keep as cash with the central bank'],
    ['Reverse repo rate', 'Rate at which the central bank pays banks on funds they park with it'],
    ['Open market operations', 'Buying and selling of government securities by the central bank'],
    ['Margin requirement', 'Part of a security\'s value that a bank may not lend against'],
  ],
  sol: 'CRR is the cash share kept with the central bank; reverse repo is the rate the central bank pays on banks\' surplus funds; open market operations are trades in government securities; the margin is the unlent part of a security\'s value.',
}));
Q('num_crr_lend', num({
  t: 3, d: 3, c: 'application', value: lendable, unit: '₹ crore',
  stem: `An imagined bank has deposits of ₹${inr(LEND.dep)} crore. The cash reserve ratio is 4 per cent and the statutory liquidity ratio is 18 per cent. Treating both as shares of these deposits (a simplification), how much is left for the bank to lend (in ₹ crore)?`,
  sol: `Step 1: CRR = 4 per cent of ${LEND.dep} = ${LEND.dep * LEND.crr}; SLR = 18 per cent of ${LEND.dep} = ${LEND.dep * LEND.slr}.\nStep 2: Available for loans = ${LEND.dep} − ${LEND.dep * LEND.crr} − ${LEND.dep * LEND.slr} = ${lendable}. So ₹${lendable} crore.`,
}));
Q('num_margin', num({
  t: 3, d: 3, c: 'application', value: loanM, unit: '₹',
  stem: `A trader offers shares worth ₹${inr(MARGIN.value)} as security for a loan. The margin requirement on such loans is 30 per cent. What is the maximum loan the bank can give?`,
  sol: `Step 1: Margin = 30 per cent of ${inr(MARGIN.value)} = ${inr(MARGIN.value * MARGIN.margin)}, which the bank may not lend.\nStep 2: Maximum loan = ${inr(MARGIN.value)} − ${inr(MARGIN.value * MARGIN.margin)} = ${inr(loanM)}. So ₹${inr(loanM)}.`,
}));
Q('s_lender_last', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Explain the role of the RBI as the lender of last resort.',
  model: 'When a commercial bank faces a sudden **shortage of funds**, for example heavy withdrawals, and cannot borrow anywhere else, the RBI **lends to it** against eligible securities. This prevents the bank from failing, **protects depositors** and stops panic from spreading to other banks.',
  sol: 'Who is helped, when, and why it matters for depositors and the system.',
  scheme: [['RBI lends to banks in difficulty when other sources fail', 1], ['Purpose: protect depositors and banking stability', 1]],
}));
Q('s_bankers_bank', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Why is the central bank called the bankers\' bank? Give two reasons.',
  model: '1. Commercial banks keep part of their **reserves (CRR)** with the central bank, just as people keep deposits with banks.\n2. The central bank **lends to banks**, provides clearing of payments between them, and **supervises and regulates** them.',
  sol: 'Two links: banks deposit reserves with it; it lends to, clears for and supervises banks.',
  scheme: [['Banks keep reserves with it', 1], ['It lends to, clears for or supervises banks', 1]],
}));
Q('s_repo_reverse', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish between the repo rate and the reverse repo rate.',
  model: '1. The **repo rate** is the rate at which the **RBI lends** short-term funds to commercial banks against government securities.\n2. The **reverse repo rate** is the rate at which the **RBI borrows** from banks, that is, what it pays on surplus funds banks park with it. Raising either rate tightens credit.',
  sol: 'State who lends to whom in each case.',
  scheme: [['Repo rate: RBI lends to banks', 1], ['Reverse repo: RBI borrows from banks', 1]],
}));
Q('s3_inflation', short({
  t: 3, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Suggest three steps the central bank can take to control inflation caused by excess demand, and explain how each works.',
  model: '1. **Raise the repo rate** (and the bank rate): banks pay more for funds, raise their lending rates, and borrowing for spending falls.\n2. **Sell government securities** (open market operations): money moves from banks to the central bank, so banks have less to lend.\n3. **Raise the cash reserve ratio**: banks must keep more cash with the central bank, which lowers the money multiplier and credit.\nLess credit means lower aggregate demand and less pressure on prices.',
  sol: 'Three instruments, each with the right direction and the link to credit and demand.',
  scheme: [['First measure with how it works', 1], ['Second measure with how it works', 1], ['Third measure with how it works', 1]],
}));
Q('s3_omo', short({
  t: 3, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'What are open market operations? Explain their effect on the money supply when the central bank buys and when it sells government securities.',
  model: '**Open market operations** are purchases and sales of government securities by the central bank in the open market.\n1. **Buying:** the central bank pays banks and the public for the securities, so **bank reserves rise**, banks can lend more and the **money supply increases**.\n2. **Selling:** buyers pay the central bank, so **reserves fall**, lending capacity shrinks and the **money supply decreases**.\nSo OMOs are used to inject or absorb liquidity.',
  sol: 'Definition, then both directions with the effect on reserves and money supply.',
  scheme: [['Meaning of open market operations', 1], ['Effect of buying', 1], ['Effect of selling', 1]],
}));
Q('l_functions_rbi', long({
  t: 3, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain any five functions of the Reserve Bank of India.',
  model: '1. **Bank of issue:** it alone issues currency notes (except one-rupee notes), which keeps the currency uniform and trusted.\n2. **Banker to the government:** it keeps government accounts, makes payments for it, manages its borrowing and advises it.\n3. **Bankers\' bank and supervisor:** banks keep reserves with it; it clears their payments, licenses and regulates them.\n4. **Lender of last resort:** it lends to banks in temporary difficulty, protecting depositors.\n5. **Controller of credit:** through the repo rate, CRR, SLR, open market operations and margins it regulates credit to keep prices stable. (It is also the custodian of foreign exchange reserves.)',
  sol: 'Any five functions, each named and explained in a line.',
  scheme: [['First function explained', 1], ['Second function explained', 1], ['Third function explained', 1], ['Fourth function explained', 1], ['Fifth function explained', 1]],
}));
Q('l_quantitative', long({
  t: 3, d: 4, c: 'application', marks: 5, wl: L5,
  stem: 'An imagined economy is facing inflation because aggregate demand exceeds the full-employment level of output. Explain how the central bank can use five instruments of monetary policy to correct it.',
  model: '1. **Repo rate up:** banks\' cost of funds rises, lending rates rise, borrowing falls.\n2. **Bank rate up:** longer-term borrowing from the central bank becomes costlier, with the same effect.\n3. **CRR (or SLR) up:** banks must hold more reserves, the money multiplier falls, less credit is created.\n4. **Sell securities (OMO):** reserves move to the central bank, lending capacity falls.\n5. **Margin requirement up:** smaller loans against the same security, especially for speculative uses.\nTogether these reduce **credit, investment and consumption spending**, so aggregate demand falls towards the full-employment level and price pressure eases.',
  sol: 'Five instruments in the contractionary direction, each with its link to credit, then the effect on aggregate demand.',
  scheme: [['Repo or bank rate raised, with effect', 1], ['Second rate instrument or reverse repo, with effect', 1], ['CRR or SLR raised, with effect', 1], ['Securities sold, with effect', 1], ['Margin raised and overall effect on aggregate demand', 1]],
}));
Q('l_deficient', long({
  t: 3, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'During a slowdown, the central bank cuts the repo rate and the CRR, but bank lending rises only a little. Explain how these steps are meant to work and evaluate why their effect may be limited.',
  model: '1. **Intended effect:** a lower repo rate makes funds cheaper for banks, so they cut lending rates; a lower CRR frees reserves and raises the money multiplier, so banks can lend more.\n2. More credit should raise **investment and consumption**, and so aggregate demand and output.\n3. **Limits:** firms with idle capacity and poor sales may **not want to borrow** even at lower rates.\n4. Banks may **not pass on** cuts fully, or may hold back lending to avoid bad loans.\n5. **Judgement:** monetary easing makes credit cheaper but cannot force borrowing; it works best alongside steps that revive demand, such as government spending.',
  sol: 'How each cut works, then at least two reasons for a weak effect and a reasoned conclusion.',
  scheme: [['How the repo cut works', 1], ['How the CRR cut works', 1], ['Weak demand for loans', 1], ['Banks\' caution or incomplete pass-through', 1], ['Balanced conclusion', 1]],
}));
Q('cb_rbi', caseQ({
  t: 3, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the passage and answer the questions that follow. *(An imagined central bank and economy, written by SOYL for practice; not a report of any real decision.)*',
  passage: '**Monetary policy statement of the imagined Reserve Bank of Suvarnadesh**\n\nPrices of food, fuel and rent have risen steadily for six months, and bank loans for cars and houses are growing quickly. The Monetary Policy Committee has decided to raise the policy repo rate by half a percentage point. The bank will also sell government securities from its own holdings over the next month. The Governor said that the bank remains ready to lend to any sound bank that faces a sudden shortage of funds, so that depositors need not worry.',
  parts: [
    child('a', short({ t: 3, d: 2, c: 'understanding', marks: 1, stem: 'Is the central bank trying to expand or to reduce credit? Give one piece of evidence.', model: '**Reduce credit**: it is **raising the repo rate** (or selling securities) because prices are rising.', sol: 'Both steps are contractionary; either one is evidence.', scheme: [['Reduce, with one piece of evidence', 1]] })),
    child('b', short({ t: 3, d: 2, c: 'understanding', marks: 1, stem: 'Which function of a central bank does the Governor\'s last sentence describe?', model: '**Lender of last resort.**', sol: 'Lending to sound banks facing a sudden shortage is the lender-of-last-resort role.', scheme: [['Lender of last resort', 1]] })),
    child('c', short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Explain how selling government securities will help to control the price rise.', model: 'Banks and the public **pay the central bank** for the securities, so **bank reserves fall**. Banks can lend less, so loans for cars and houses grow more slowly; lower spending reduces **aggregate demand** and eases the pressure on prices.', sol: 'Chain: sale → reserves fall → less credit → less demand → lower inflation.', scheme: [['Reserves and lending capacity fall', 1], ['Lower spending eases prices', 1]] }), [
      short({ t: 3, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): Food and fuel prices may rise because of poor harvests or costly imports. Comment on how far a higher repo rate can control such price rises.', model: 'A higher repo rate works by **reducing demand** through costlier credit. If prices rise because **supply is short** (a poor harvest, costly fuel), curbing credit does little to raise supply, so its effect is **limited** and may also slow growth; supply-side steps are needed alongside it.', sol: 'Recognise that monetary policy acts on demand, so supply-driven inflation responds weakly.', scheme: [['Repo rate acts on demand', 1], ['Limited effect on supply-driven prices, with reason', 1]] }),
    ]),
  ],
}));
