// ISC 12 Economics, ch13 Money and Inflation — question bank. Every town, family, firm and figure is imagined by SOYL;
// no textbook example, exercise, specimen-paper or past-paper item is reused (D-036). Every number in a stem, key or
// worked solution is computed here and asserted, so they cannot drift apart.
// Scope (ISC 2027): meaning and kinds of money; functions of money (primary, secondary, contingent); money supply
// measures M0–M4 as MEANINGS ONLY (removed: anything beyond their meaning, so no aggregate calculations); inflation:
// meaning, demand-pull and cost-push (removed: their diagrams, so inflation is explained in words and tables only).
// Money-supply definitions are the classic RBI measures as taught for ISC: M1 = currency with the public + demand
// deposits of banks + other deposits with the RBI; M2 = M1 + savings deposits with post office savings banks;
// M3 = M1 + net time deposits of banks; M4 = M3 + total deposits with the post office savings organisation (excluding
// National Savings Certificates); M0 (reserve money) = currency in circulation + bankers' deposits with the RBI +
// other deposits with the RBI. No current statistics are stated.
import { Q, mcq, ar, tf, fb, match, ord, num, short, long, caseQ, child } from '../../isc-12-economics-ch01/src/lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const S4 = [70, 110];
const L5 = [100, 150];
const L8 = [150, 220];

const assert = (cond, msg) => { if (!cond) throw new Error(`questions.mjs: ${msg}`); };
export const r3 = (x) => Math.round(x * 1000) / 1000;
const inr = (n) => r3(n).toLocaleString('en-IN');
const md = (rows, head) => `| ${head.join(' | ')} |\n|${head.map(() => '---').join('|')}|\n${rows.map((r) => `| ${r.join(' | ')} |`).join('\n')}`;

// ---------------------------------------------------------------- price-index engine
/** Rate of inflation (per cent) between two values of a price index. */
export const inflation = (p0, p1) => r3(((p1 - p0) / p0) * 100);
/** Purchasing power of one rupee in base-year rupees at a given index (base = 100). */
export const purchasingPower = (index) => r3(100 / index);
/** Price index of a basket: current cost ÷ base-year cost × 100. */
export const basketIndex = (base, current) => r3((current / base) * 100);
/** Value of a money amount in base-year rupees at a given index. */
export const realValue = (amount, index) => r3((amount * 100) / index);

// ---------------------------------------------------------------- shared imagined data (all asserted)
// (1) Sonapur town consumer price index (imagined; base year = 100).
export const SONAPUR = [
  { year: 'Year 1', idx: 125 },
  { year: 'Year 2', idx: 135 },
  { year: 'Year 3', idx: 148.5 },
];
export const SON_INF2 = inflation(SONAPUR[0].idx, SONAPUR[1].idx);
export const SON_INF3 = inflation(SONAPUR[1].idx, SONAPUR[2].idx);
assert(SON_INF2 === 8 && SON_INF3 === 10, 'sonapur inflation');
export const SON_PP1 = purchasingPower(SONAPUR[0].idx);
assert(SON_PP1 === 0.8, 'sonapur purchasing power');
export const sonapurTable = () => md(SONAPUR.map((r) => [r.year, String(r.idx)]), ['Year (imagined)', 'Consumer price index (base year = 100)']);

// (2) Meghpur family basket (imagined): base-year cost 4,000; current cost 4,600.
export const BASKET = { base: 4000, current: 4600 };
export const BASKET_IDX = basketIndex(BASKET.base, BASKET.current);
export const BASKET_INF = inflation(100, BASKET_IDX);
assert(BASKET_IDX === 115 && BASKET_INF === 15, 'meghpur basket');
// Salary of 46,000 at index 115 is worth 40,000 base-year rupees.
export const SALARY = 46000;
export const SALARY_REAL = realValue(SALARY, BASKET_IDX);
assert(SALARY_REAL === 40000, 'real salary');

// (3) Other checks used in items.
export const INF_160_172 = inflation(160, 172);
assert(INF_160_172 === 7.5, '160 to 172');
export const PP_200 = purchasingPower(200);
assert(PP_200 === 0.5, 'purchasing power at 200');
export const INF_250_270 = inflation(250, 270);
assert(INF_250_270 === 8, '250 to 270');

// ================================================================ t01 Meaning and kinds of money
Q('m_double_coinc', mcq({
  t: 1, d: 1, c: 'application',
  stem: 'In an imagined hill village with no money, a potter wants rice but the only rice grower nearby wants a pair of sandals, not pots. Which difficulty of barter does this show?',
  opts: ['Lack of double coincidence of wants', 'Lack of a common measure of value', 'Difficulty in storing wealth', 'Indivisibility of goods'],
  sol: 'An exchange needs each party to want exactly what the other offers. Here the grower does not want pots, so the wants do not coincide. The other options are also barter problems, but not the one described.',
}));
Q('m_legal_tender', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'A shopkeeper in an imagined Kanpur market refuses a customer\'s cheque but cannot lawfully refuse a valid currency note in settlement of a debt. This is because the currency note is',
  opts: ['legal tender, while a cheque is optional (non-legal-tender) money', 'near money, while a cheque is legal tender', 'commodity money, while a cheque is fiat money', 'full-bodied money, while a cheque is token money'],
  sol: 'Currency notes issued under the authority of law must be accepted in payment of a debt; a cheque is credit money that the receiver may accept or refuse.',
}));
Q('m_token_coin', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'A ₹10 coin in an imagined coin exhibition at Hyderabad contains metal worth far less than ten rupees. Such a coin is called',
  opts: ['token money', 'full-bodied money', 'commodity money', 'near money'],
  sol: 'A token coin has a face value higher than the value of the metal in it. A full-bodied coin has metal worth its face value; commodity money is a good used as money; near money is not a medium of exchange at all.',
}));
Q('m_credit_money', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Ravi, a trader in an imagined Surat textile market, settles most bills by cheque drawn on his current account. The money he uses is best described as',
  opts: ['credit (bank) money', 'commodity money', 'metallic money', 'fiat money issued by the government'],
  sol: 'Demand deposits that are transferred by cheque are created and held by banks; they are credit or bank money. They are not a commodity, not coins and not government-issued notes.',
}));
Q('m_limited_tender', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'A customer at an imagined Pune bakery tries to pay a large bill entirely in small coins, and the baker refuses beyond a limit. The coins are an example of',
  opts: ['limited legal tender', 'unlimited legal tender', 'optional money', 'near money'],
  sol: 'Limited legal tender must be accepted only up to a limit fixed by law; beyond it the receiver may refuse. Currency notes are unlimited legal tender.',
}));
Q('m_near_money_eg', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Which of the following assets held by an imagined Chennai family is near money rather than money?',
  opts: ['A fixed (time) deposit in a bank', 'Currency notes in the household cash box', 'Coins kept for bus fares', 'Balance in a savings-cum-current account usable by cheque'],
  sol: 'A time deposit can be turned into money quickly with little loss, but it cannot itself be used to pay for goods. Currency, coins and chequable deposits are money.',
}));
Q('m_paper_money', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'A museum guide in an imagined Kolkata gallery says that modern currency notes are "inconvertible paper money". This means the notes',
  opts: ['cannot be exchanged for gold or silver on demand at the issuing authority', 'can be exchanged for gold of equal value on demand', 'are accepted only within one state', 'have metal content equal to their face value'],
  sol: 'Inconvertible paper money is not backed by a promise to pay gold or silver; it is accepted because the law makes it legal tender. Convertible paper money once promised such exchange.',
}));
Q('m_commodity_money', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'In an imagined island trading story, cowrie shells and salt bars were accepted in payment for all goods. Such money is called',
  opts: ['commodity money', 'fiat money', 'credit money', 'near money'],
  sol: 'When a useful good itself serves as the generally accepted means of payment, it is commodity money.',
}));
Q('ar_fiat_value', ar({
  t: 1, d: 3, c: 'analysis', key: 'a',
  a: 'A currency note of an imagined country is accepted in payment even though the paper itself is almost worthless.',
  r: 'Fiat money derives its value from the order of the government that makes it legal tender, not from the material it is made of.',
  sol: 'Both are true, and R explains A: people accept fiat money because the law makes it legal tender and others accept it, not because of the value of the paper.',
}));
Q('ar_barter_coinc', ar({
  t: 1, d: 2, c: 'analysis', key: 'b',
  a: 'Money removes the need for a double coincidence of wants.',
  r: 'Money is a durable asset that can be kept for future use.',
  sol: 'Both are true. But A is explained by money acting as a medium of exchange (sell to anyone for money, buy from anyone with money), not by its durability, so R is not the correct explanation.',
}));
Q('tf_cheque_legal', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? A seller in an imagined Indore wholesale market must, by law, accept a cheque offered in payment, because a cheque is legal tender.',
  sol: 'A cheque is not legal tender. It is an order to a bank to pay from a deposit, so the seller may refuse it; only legal tender must be accepted in settlement of a debt.',
}));
Q('mt_kinds', match({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Match each example from an imagined money museum in Nagpur with the kind of money it shows.',
  pairs: [
    ['Bars of salt used to buy cloth', 'Commodity money'],
    ['A coin whose metal is worth less than its face value', 'Token money'],
    ['A bank deposit transferred by cheque', 'Credit money'],
    ['A treasury bill held by a firm', 'Near money'],
  ],
  sol: 'Salt bars are a good used as money; the coin\'s face value exceeds its metal value; a chequable deposit is bank money; a treasury bill is a liquid asset that is not itself a medium of exchange.',
}));
Q('s_barter_two', short({
  t: 1, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two difficulties that an imagined weekly haat in rural Odisha would face if it ran on barter instead of money.',
  model: '1. **Double coincidence of wants**: a seller must find a buyer who has exactly what the seller wants in return.\n2. **No common measure of value**: the rate of a goat in terms of rice, cloth or pots has to be fixed afresh for every exchange.',
  sol: 'Any two barter problems, each explained briefly.',
  scheme: [['First difficulty explained', 1], ['Second difficulty explained', 1]],
}));
Q('s_near_money', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is near money? Give one example from the savings of an imagined Lucknow household.',
  model: '**Near money** is an asset that can be turned into money **quickly and with little loss**, but cannot itself be used to **pay for goods**. Example: the household\'s **fixed deposit** in a bank or its **treasury bills**.',
  sol: 'Meaning with the liquidity point; one example.',
  scheme: [['Meaning', 1], ['Valid example', 1]],
}));
Q('s_fiat_meaning', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Explain fiat money, and say why people in an imagined country accept fiat notes that have almost no material value.',
  model: '**Fiat money** is money issued **by order of the government**, whose value does not depend on the material it is made of. People accept it because the **law makes it legal tender** and they are confident that **others will accept it** in turn.',
  sol: 'Meaning and the basis of acceptance.',
  scheme: [['Meaning', 1], ['Reason for acceptance', 1]],
}));
Q('s_legal_two', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish between limited and unlimited legal tender with one example of each, as a cashier at an imagined Jaipur bank would explain it.',
  model: '**Unlimited legal tender** must be accepted in payment of **any amount**, for example **currency notes**. **Limited legal tender** must be accepted only **up to a limit fixed by law**, beyond which it may be refused, for example **small coins**.',
  sol: 'Both terms with an example each.',
  scheme: [['Unlimited legal tender with example', 1], ['Limited legal tender with example', 1]],
}));
Q('s3_barter_problems', short({
  t: 1, d: 2, c: 'application', marks: 3, wl: S3,
  stem: 'A group of fishermen in an imagined coastal village of Kerala want to buy rice, pay a carpenter next season and save for a boat. Explain three difficulties they would face under barter.',
  model: '1. **Double coincidence of wants**: the rice seller may not want fish, so the exchange fails.\n2. **No standard of deferred payment**: a promise to pay the carpenter "in fish next season" is risky, since fish vary in quality and value.\n3. **No store of value**: fish are **perishable**, so the fishermen cannot store their wealth in fish to buy a boat later.',
  sol: 'Three difficulties, each tied to a need in the stem.',
  scheme: [['Double coincidence', 1], ['Deferred payment', 1], ['Store of value', 1]],
}));
Q('s3_money_vs_near', short({
  t: 1, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'A firm in an imagined Ludhiana industrial area holds cash, a current-account deposit and a three-year bond. Classify each as money or near money, giving reasons.',
  model: '1. **Cash** is **money**: it is legal tender and can be spent at once.\n2. The **current-account deposit** is **money** (credit money): it can be **used to pay** by cheque or transfer.\n3. The **three-year bond** is **near money**: it can be **sold for cash** fairly quickly, but it **cannot itself be used to pay** for goods.',
  sol: 'Each asset classified with the reason (medium of exchange or not).',
  scheme: [['Cash', 1], ['Current-account deposit', 1], ['Bond', 1]],
}));
Q('l_kinds_money', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'An imagined school museum in Bhopal is labelling its money gallery.\n\n(a) Explain commodity money and metallic money, distinguishing full-bodied from token coins. [3]\n(b) Explain the difference between legal tender and fiat money on the one hand and credit money on the other. [2]',
  model: '(a) **Commodity money** is a useful good, such as grain, cattle or salt, that is generally accepted in payment. **Metallic money** is coins of metal. A **full-bodied coin** has metal worth its **face value**, so melting it loses nothing; a **token coin** has a face value **higher** than its metal value, as with modern coins.\n(b) **Legal tender** must be accepted in payment of debts by law, and **fiat money** is issued **by order of the government**, with value that does not depend on its material; modern notes are both. **Credit money**, such as a bank deposit transferred by **cheque**, is created by banks and is **optional**: a seller may refuse it.',
  sol: 'Commodity and metallic money, full-bodied versus token; legal tender and fiat versus credit money.',
  scheme: [['Commodity money', 1], ['Metallic money', 1], ['Full-bodied versus token', 1], ['Legal tender and fiat money', 1], ['Credit money is optional', 1]],
}));
Q('l_barter_to_money', long({
  t: [1, 2], d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'An imagined tribal cooperative in Chhattisgarh moves from swapping forest produce to selling it for money.\n\n(a) Explain three problems of barter that this change removes. [3]\n(b) Explain how money, as a measure of value, helps the cooperative keep accounts. [2]',
  model: '(a) 1. **Double coincidence of wants**: members can sell honey to anyone for money and buy rice from anyone else.\n2. **No common measure of value**: every swap needed a new rate (honey for rice, honey for cloth); money gives **one price** for each good.\n3. **Indivisibility**: a member with one bag of tamarind could not "split" it to buy small items; money comes in **small units**.\n(b) With money as a **unit of account**, sales, costs and members\' shares can be **added up in rupees**. The cooperative can compare income with expenses, calculate **profit** and pay each member a fair share.',
  sol: 'Three barter problems linked to the cooperative; accounts in a common unit.',
  scheme: [['Double coincidence removed', 1], ['Common measure of value', 1], ['Divisibility', 1], ['Unit of account', 1], ['Use in accounts and profit', 1]],
}));

// ================================================================ t02 Functions of money
Q('m_medium_exchange', mcq({
  t: 2, d: 1, c: 'application',
  stem: 'A weaver in an imagined Varanasi lane sells a saree for money and later uses the money to buy yarn from a different trader. Which function of money is at work?',
  opts: ['Medium of exchange', 'Store of value', 'Standard of deferred payments', 'Transfer of value'],
  sol: 'Money is accepted in the sale and passed on in a purchase: it splits one barter into two separate exchanges. That is its role as a medium of exchange.',
}));
Q('m_measure_value', mcq({
  t: 2, d: 1, c: 'application',
  stem: 'A dairy cooperative in an imagined Anand village records the value of milk, fodder and wages in rupees so that they can be added and compared. Which function of money does this show?',
  opts: ['Measure (unit) of value', 'Medium of exchange', 'Basis of credit', 'Guarantor of solvency'],
  sol: 'Expressing different goods in one unit, the rupee, so they can be compared and added is the measure-of-value (unit-of-account) function.',
}));
Q('m_deferred', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'A farmer in an imagined Vidarbha village borrows ₹20,000 for seeds and promises to repay in rupees after the harvest. Which function of money makes such a contract easy?',
  opts: ['Standard of deferred payments', 'Measure of value', 'Store of value', 'Medium of exchange'],
  sol: 'Future payments, such as loan repayments, are fixed in money; this is money acting as a standard of deferred payments.',
}));
Q('m_transfer_value', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'Meera sells her house in an imagined town in Bihar and buys a flat in Bengaluru with the money. Which function of money has she used?',
  opts: ['Transfer of value', 'Measure of value', 'Basis of credit', 'Standard of deferred payments'],
  sol: 'Money lets a person move purchasing power from one place (or person) to another, which is the transfer-of-value function.',
}));
Q('m_contingent', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'A bank in an imagined Mysuru branch can lend many times its cash reserves because people trust that deposits are claims to money. This shows money acting as',
  opts: ['the basis of the credit system, a contingent function', 'a medium of exchange, a primary function', 'a measure of value, a primary function', 'a store of value, a secondary function'],
  sol: 'Credit is built on money: deposits and loans are promises to pay money. Being the basis of credit is a contingent function.',
}));
Q('ar_store_inflation', ar({
  t: [2, 4], d: 3, c: 'analysis', key: 'a',
  a: 'Money is a poor store of value during a period of rapid inflation.',
  r: 'When the general price level rises, each unit of money buys fewer goods.',
  sol: 'Both are true, and R explains A: if prices rise fast, money kept idle loses purchasing power, so it stores value badly.',
}));
Q('fb_store', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'Keeping part of today\'s income in money to spend in future uses money as a ___ of value.',
  acc: [['store']],
  sol: 'Money is a store of value: purchasing power can be held for later use.',
}));
Q('fb_deferred', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'Loans repaid in money after a period show money acting as a standard of ___ payments.',
  acc: [['deferred']],
  sol: 'Standard of deferred payments: future payments are fixed in money.',
}));
Q('s_store_value', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Explain why a vegetable vendor in an imagined Guwahati market keeps her savings in money rather than in unsold tomatoes.',
  model: 'Money is a better **store of value**: tomatoes are **perishable** and lose value in days, while money keeps its value (when prices are stable), is easy to **keep and carry**, and can be spent on **anything** later.',
  sol: 'Store-of-value function contrasted with a perishable good.',
  scheme: [['Store of value named', 1], ['Reason contrasted with tomatoes', 1]],
}));
Q('s_primary_secondary', short({
  t: 2, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'Name the two primary functions and any two secondary functions of money, as a revision list for an imagined Patna commerce class.',
  model: '**Primary functions**: **medium of exchange** and **measure (unit) of value**.\n**Secondary functions**: any two of **standard of deferred payments**, **store of value** and **transfer of value**.',
  sol: 'Two primary and two secondary functions.',
  scheme: [['Two primary functions', 1], ['Two secondary functions', 1]],
}));
Q('s3_functions_three', short({
  t: 2, d: 2, c: 'application', marks: 3, wl: S3,
  stem: 'An imagined cycle-repair shop in Agra (i) prices repairs in rupees, (ii) is paid in cash by customers and (iii) sells spare parts on credit to be paid next month. Identify the function of money in each case and explain one.',
  model: '(i) Pricing repairs in rupees: **measure (unit) of value**.\n(ii) Being paid in cash: **medium of exchange**.\n(iii) Credit sales to be paid next month: **standard of deferred payments**.\nExplanation: the credit sale works because the debt is fixed **in rupees**, a unit both sides trust to have a known value when the payment falls due.',
  sol: 'Three functions identified; one explained.',
  scheme: [['(i) and (ii) identified', 1], ['(iii) identified', 1], ['One function explained', 1]],
}));
Q('s3_contingent', short({
  t: 2, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain any three contingent functions of money, using an imagined steel company in Jamshedpur as the example.',
  model: '1. **Basis of credit**: the company\'s bank lends against its deposits, because loans and deposits are claims to money.\n2. **Distribution of national income**: the value it produces is shared out as **wages, rent, interest and profit** in money.\n3. **Liquidity and solvency**: holding money lets it **pay debts at any time**; money is the most liquid asset and shows the firm can meet its obligations.',
  sol: 'Three contingent functions with the company as the example.',
  scheme: [['First contingent function', 1], ['Second contingent function', 1], ['Third contingent function', 1]],
}));
Q('l_functions_full', long({
  t: 2, d: 3, c: 'application', marks: 5, wl: L5,
  stem: 'An imagined Hubli handloom unit sells cloth, pays weavers, borrows for looms and keeps a reserve for bad years.\n\n(a) Explain the two primary functions of money in the unit\'s working. [2]\n(b) Explain three secondary or contingent functions shown in the stem. [3]',
  model: '(a) **Medium of exchange**: cloth is sold for rupees and the same rupees buy yarn and pay weavers, so no barter is needed. **Measure of value**: cloth, yarn and wages are all priced in **rupees**, so the unit can compare costs with sales.\n(b) 1. **Standard of deferred payments**: the loom loan is fixed in rupees and repaid in instalments later.\n2. **Store of value**: the reserve for bad years is kept as money, which can be used whenever needed.\n3. **Distribution of income** (contingent): the value produced is shared out as **wages** to weavers, **interest** to the lender and **profit** to the owner, all in money.',
  sol: 'Two primary functions; three further functions tied to the stem.',
  scheme: [['Medium of exchange', 1], ['Measure of value', 1], ['Deferred payments', 1], ['Store of value', 1], ['Distribution of income', 1]],
}));

// ================================================================ t03 Money supply: M0, M1, M2, M3, M4 (meanings only)
Q('m_m1_parts', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'A student of an imagined Shimla college lists the parts of narrow money (M1). Which list is correct?',
  opts: ['Currency with the public + demand deposits of banks + other deposits with the RBI', 'Currency with the public + time deposits of banks', 'Currency in circulation + bankers\' deposits with the RBI', 'Demand deposits + post office savings deposits'],
  sol: 'M1 = currency with the public + demand deposits + other deposits with the RBI. Option (c) describes reserve money (M0); time deposits enter M3; post office savings deposits enter M2.',
}));
Q('m_reserve_money', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'An economics teacher in an imagined Ranchi school calls M0 "high-powered money". M0 is made up of',
  opts: ['currency in circulation, bankers\' deposits with the RBI and other deposits with the RBI', 'currency with the public and demand deposits of banks', 'M1 plus savings deposits with post office savings banks', 'M1 plus net time deposits of banks'],
  sol: 'Reserve money (M0) is the monetary base: currency in circulation plus bankers\' deposits with the RBI plus other deposits with the RBI. The other options are M1, M2 and M3.',
}));
Q('m_m4_broad', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Which measure of money supply, as listed in an imagined Dehradun textbook club\'s notes, adds total post office savings deposits (excluding National Savings Certificates) to M3?',
  opts: ['M4', 'M2', 'M1', 'M0'],
  sol: 'M4 = M3 + total deposits with the post office savings organisation, excluding National Savings Certificates.',
}));
Q('m_liquidity_order', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'A banker in an imagined Coimbatore seminar ranks the four money-supply measures from most liquid to least liquid. Which ranking is correct?',
  opts: ['M1, M2, M3, M4', 'M4, M3, M2, M1', 'M3, M1, M4, M2', 'M2, M1, M4, M3'],
  sol: 'M1 holds only currency and demand deposits, the most liquid forms; M2, M3 and M4 add savings and time deposits that are less liquid. So liquidity falls from M1 to M4.',
}));
Q('m_money_held_public', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'In measuring money supply, the statisticians of an imagined country leave out the cash held in the government\'s own treasury and in banks\' vaults. Why?',
  opts: ['Money supply counts only money held by the public', 'Such cash is not legal tender', 'Such cash is counted as near money', 'Such cash is already included in time deposits'],
  sol: 'Money supply is the stock of money held by the public (households and firms) for spending; money held by the government and the banking system is not in circulation with the public.',
}));
Q('ar_m3_liquid', ar({
  t: 3, d: 3, c: 'analysis', key: 'c',
  a: 'M3 is called broad money.',
  r: 'M3 includes only currency with the public and demand deposits.',
  sol: 'A is true: M3 adds net time deposits to M1, so it is broad money. R is false: currency and demand deposits alone make up M1 (with other deposits with the RBI).',
}));
Q('ar_m1_postoffice', ar({
  t: 3, d: 3, c: 'analysis', key: 'd',
  a: 'Post office savings deposits are a part of M1.',
  r: 'M1 is the least liquid measure of money supply.',
  sol: 'Both are false. Post office savings deposits enter M2 (and M4), not M1; and M1 is the most liquid measure, not the least.',
}));
Q('tf_m1_narrow', tf({
  t: 3, d: 1, c: 'recall', ans: true,
  stem: 'True or false? In the classic RBI measures studied for ISC, M1 and M2 are called narrow money and M3 and M4 broad money.',
  sol: 'True. M1 and M2 are narrow money; M3 and M4, which include time deposits, are broad money.',
}));
Q('fb_m1_dd', fb({
  t: 3, d: 2, c: 'understanding',
  stem: 'M1 equals currency with the public plus ___ deposits of banks plus other deposits with the RBI.',
  acc: [['demand']],
  sol: 'M1 = currency with the public + demand deposits + other deposits with the RBI.',
}));
Q('ord_liquidity', ord({
  t: 3, d: 2, c: 'understanding', marks: 1,
  stem: 'Arrange these money-supply measures from the most liquid to the least liquid, as an imagined Raipur quiz team must.',
  items: ['M1', 'M2', 'M3', 'M4'],
  sol: 'Liquidity falls as less liquid savings and time deposits are added: M1, then M2, then M3, then M4.',
}));
Q('s_m0_meaning', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is reserve money (M0)? Why does an imagined central-bank exhibition in Mumbai call it high-powered money?',
  model: '**Reserve money (M0)** = **currency in circulation** + **bankers\' deposits with the RBI** + **other deposits with the RBI**. It is called **high-powered** because banks\' reserves are the base on which they **create a multiple** of deposits.',
  sol: 'Components and the reason for the name.',
  scheme: [['Components of M0', 1], ['Base of credit creation', 1]],
}));
Q('s3_m1_m3', short({
  t: 3, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain why M1 is called narrow money and M3 broad money, as a bank officer in an imagined Kochi branch would explain to trainees.',
  model: '**M1** counts only the **most liquid** forms: **currency with the public**, **demand deposits** and **other deposits with the RBI**, all usable at once for payments, so it is **narrow money**.\n**M3** adds **net time deposits** of banks to M1. Time deposits are held for a fixed period and are **less liquid**, so M3 is a **wider** measure, **broad money**.',
  sol: 'Components of each and the liquidity reason.',
  scheme: [['M1 components', 1], ['M3 = M1 + net time deposits', 1], ['Liquidity reason for the names', 1]],
}));
Q('s3_m1_m2_m3', short({
  t: 3, d: 2, c: 'recall', marks: 3, wl: S3,
  stem: 'State the meaning of M2, M3 and M4 in terms of M1, as a revision card for an imagined Shillong study group.',
  model: '**M2** = M1 + **savings deposits with post office savings banks**, which are fairly easy to withdraw.\n**M3** = M1 + **net time deposits of banks**; these fixed-period deposits make M3 a broad measure.\n**M4** = M3 + **total deposits with the post office savings organisation**, excluding **National Savings Certificates**. It is the broadest and least liquid of the four measures.',
  sol: 'Each measure defined from M1 (or M3 for M4).',
  scheme: [['M2', 1], ['M3', 1], ['M4', 1]],
}));
Q('l_money_supply', long({
  t: 3, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'An imagined finance club in Bhubaneswar is preparing a poster on money supply.\n\n(a) Explain what is meant by money supply and whose money holdings it counts. [2]\n(b) State the meaning of M1, M2, M3 and M4, and explain how their liquidity differs. [3]',
  model: '(a) **Money supply** is the **total stock of money** held by the **public** (households and firms) at a point of time. It leaves out money held by the **government** and by the **banking system**, because that money is not available to the public for spending.\n(b) **M1** = currency with the public + demand deposits + other deposits with the RBI. **M2** = M1 + savings deposits with post office savings banks. **M3** = M1 + net time deposits of banks. **M4** = M3 + total post office savings deposits (excluding National Savings Certificates). **M1** is the **most liquid**; as savings and time deposits are added, **liquidity falls**, so **M4 is the least liquid**.',
  sol: 'Meaning and coverage; the four measures and the liquidity order.',
  scheme: [['Money supply is a stock held by the public', 1], ['Government and bank holdings excluded', 1], ['M1 and M2', 1], ['M3 and M4', 1], ['Liquidity order', 1]],
}));

// ================================================================ t04 Inflation: meaning, demand-pull and cost-push
Q('m_inflation_meaning', mcq({
  t: 4, d: 1, c: 'recall',
  stem: 'A newspaper in an imagined district town reports "inflation". In economics this means',
  opts: ['a sustained rise in the general price level', 'a one-time rise in the price of onions', 'a rise in the money income of workers', 'a fall in the general price level'],
  sol: 'Inflation is a persistent rise in the general level of prices, which means a fall in the purchasing power of money. A single price rising once is not inflation.',
}));
Q('m_demandpull_cause', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'In an imagined country already at full employment, the government finances large new spending by borrowing from the central bank. What kind of inflation is most likely?',
  opts: ['Demand-pull inflation', 'Cost-push inflation', 'Deflation', 'Wage-push deflation'],
  sol: 'Extra spending financed by new money raises aggregate demand above full-employment output; prices are pulled up by demand.',
}));
Q('m_costpush_cause', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'The price of imported crude oil rises sharply, raising transport and production costs across an imagined economy, and firms raise their prices. This is an example of',
  opts: ['cost-push inflation', 'demand-pull inflation', 'a fall in the purchasing power of the rupee caused by more exports', 'deflation'],
  sol: 'A rise in the cost of an important input pushes firms to raise prices even though demand has not risen: cost-push inflation.',
}));
Q('m_wage_push', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'Strong unions in an imagined industrial belt win wage rises far above any rise in productivity, and factories raise prices to protect profits. This is',
  opts: ['wage-push inflation, a form of cost-push inflation', 'demand-pull inflation caused by exports', 'profit-push deflation', 'inflation caused by a fall in money supply'],
  sol: 'Wage rises above productivity raise costs per unit, and firms pass them on in higher prices: wage-push, a type of cost-push inflation.',
}));
Q('m_profit_push', mcq({
  t: 4, d: 3, c: 'analysis',
  stem: 'A few large firms that dominate an imagined cement market raise prices to widen their profit margins, though costs and demand are unchanged. The resulting rise in prices is called',
  opts: ['profit-push inflation', 'demand-pull inflation', 'wage-push inflation', 'imported inflation'],
  sol: 'Firms with market power raising margins without a rise in costs or demand push prices up: profit-push, a form of cost-push inflation.',
}));
Q('m_purch_power', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: `In an imagined town the consumer price index (base year = 100) is ${200}. In base-year terms, one rupee now buys goods worth`,
  opts: [`₹${PP_200}`, '₹2', '₹1', '₹0.2'],
  sol: `Purchasing power = 100 ÷ index = 100 ÷ 200 = ${PP_200}. Prices have doubled, so a rupee buys half as much as in the base year.`,
}));
Q('m_infl_rate_calc', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'The consumer price index of an imagined hill district rose from 250 to 270 in a year. What was the rate of inflation?',
  opts: [`${INF_250_270} per cent`, '20 per cent', '7.4 per cent', '2 per cent'],
  sol: `Rate of inflation = (270 − 250) ÷ 250 × 100 = ${INF_250_270} per cent. Twenty is the rise in index points, not the percentage.`,
}));
Q('m_basket_index', mcq({
  t: 4, d: 3, c: 'application',
  stem: `A family in the imagined town of Meghpur finds that a basket of goods that cost ₹${inr(BASKET.base)} in the base year now costs ₹${inr(BASKET.current)}. What is the price index for this basket?`,
  opts: [String(BASKET_IDX), '87', '600', '15'],
  sol: `Index = current cost ÷ base cost × 100 = ${inr(BASKET.current)} ÷ ${inr(BASKET.base)} × 100 = ${BASKET_IDX}. 15 is the percentage rise, not the index.`,
}));
Q('ar_dp_excess', ar({
  t: 4, d: 3, c: 'analysis', key: 'a',
  a: 'Demand-pull inflation is most likely when an economy is already at full employment.',
  r: 'At full employment output cannot rise, so extra aggregate demand raises prices instead of output.',
  sol: 'Both are true, and R explains A: with no spare capacity, higher demand pulls prices up.',
}));
Q('tf_costpush_supply', tf({
  t: 4, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? Cost-push inflation in an imagined economy can occur even when aggregate demand has not risen.',
  sol: 'True. It starts from the supply side: higher wages, input prices, profit margins or indirect taxes raise costs, and firms raise prices with no rise in demand.',
}));
Q('n_infl_sonapur', num({
  t: 4, d: 2, c: 'understanding', marks: 1, value: SON_INF2, unit: '%',
  stem: `The consumer price index of the imagined town of Sonapur rose from ${SONAPUR[0].idx} to ${SONAPUR[1].idx} in a year. Calculate the rate of inflation (per cent).`,
  sol: `Rate of inflation = (${SONAPUR[1].idx} − ${SONAPUR[0].idx}) ÷ ${SONAPUR[0].idx} × 100 = ${SON_INF2} per cent.`,
}));
Q('n_purch_power', num({
  t: 4, d: 2, c: 'understanding', marks: 1, value: SON_PP1, unit: '₹',
  stem: `In the imagined town of Sonapur the consumer price index is ${SONAPUR[0].idx} (base year = 100). How much does one rupee buy today, in base-year rupees?`,
  sol: `Purchasing power = 100 ÷ ${SONAPUR[0].idx} = ${SON_PP1}. One rupee buys what ₹${SON_PP1} bought in the base year.`,
}));
Q('n_basket_index', num({
  t: 4, d: 2, c: 'application', marks: 1, value: BASKET_INF, unit: '%',
  stem: `A school canteen in the imagined town of Meghpur spent ₹${inr(BASKET.base)} on a fixed list of supplies in the base year and now spends ₹${inr(BASKET.current)} on the same list. By what percentage have its prices risen?`,
  sol: `Rise = (${inr(BASKET.current)} − ${inr(BASKET.base)}) ÷ ${inr(BASKET.base)} × 100 = ${BASKET_INF} per cent.`,
}));
Q('n_real_salary', num({
  t: 4, d: 3, c: 'application', marks: 2, value: SALARY_REAL, unit: '₹',
  stem: `A clerk in the imagined town of Meghpur earns ₹${inr(SALARY)} a month when the price index is ${BASKET_IDX} (base year = 100). What is her salary worth in base-year rupees?`,
  sol: `Real value = money value × 100 ÷ index = ${inr(SALARY)} × 100 ÷ ${BASKET_IDX} = ${inr(SALARY_REAL)}. So ₹${inr(SALARY_REAL)} in base-year prices.`,
  scheme: [['Real value formula', 1], [`Answer ₹${inr(SALARY_REAL)}`, 1]],
}));
Q('n_infl_two', num({
  t: 4, d: 2, c: 'understanding', marks: 1, value: INF_160_172, unit: '%',
  stem: 'A wholesale price index for an imagined state moved from 160 to 172 over a year. Find the rate of inflation (per cent).',
  sol: `(172 − 160) ÷ 160 × 100 = ${INF_160_172} per cent.`,
}));
Q('s_infl_meaning', short({
  t: 4, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is meant by inflation? How does it affect a pensioner in an imagined Pune housing society whose pension is fixed in rupees?',
  model: '**Inflation** is a **sustained rise in the general price level**, so each rupee buys **fewer goods**. A pensioner with a **fixed money pension** can buy **less and less** each year: his **real income falls**.',
  sol: 'Meaning; effect on a fixed money income.',
  scheme: [['Meaning', 1], ['Real income of the pensioner falls', 1]],
}));
Q('s_cp_two', short({
  t: 4, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two causes of cost-push inflation, with an example of each from an imagined Indian manufacturing town.',
  model: '1. **Wage-push**: a big rise in wages in the town\'s **lock factories** without higher productivity raises cost per lock.\n2. **Rise in input prices**: dearer **imported fuel or steel** raises production costs, and firms raise prices.',
  sol: 'Two cost-side causes with examples.',
  scheme: [['First cause with example', 1], ['Second cause with example', 1]],
}));
Q('s3_demand_pull', short({
  t: 4, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Explain three causes of demand-pull inflation in an imagined economy that is already at full employment.',
  model: '1. **Rise in money supply**, for example through easy bank credit, raises spending.\n2. **Higher government spending**, especially when financed by **deficit financing** (new money), adds to aggregate demand.\n3. **Rise in disposable income**, from a **tax cut** or higher exports, makes households and firms spend more.\nAt full employment output cannot rise, so the extra demand **pulls prices up**.',
  sol: 'Three demand-side causes and the link to full employment.',
  scheme: [['First cause', 1], ['Second cause', 1], ['Third cause with the full-employment link', 1]],
}));
Q('s3_dp_vs_cp', short({
  t: 4, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Distinguish between demand-pull and cost-push inflation on three points, as an imagined Nagpur debate team would.',
  model: '1. **Source**: demand-pull starts from **excess demand**; cost-push starts from **rising costs** of production.\n2. **Causes**: demand-pull comes from more money supply, public spending or income; cost-push from higher wages, input prices, profit margins or indirect taxes.\n3. **Output**: demand-pull usually occurs **at full employment**, with output unable to rise; cost-push can occur with **idle capacity** and may even cut output.',
  sol: 'Three points of difference.',
  scheme: [['Source', 1], ['Causes', 1], ['Link with output and employment', 1]],
}));
Q('s3_index_inflation', short({
  t: 4, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `Study the consumer price index of the imagined town of Sonapur and answer.\n\n${sonapurTable()}\n\nCalculate the rate of inflation in Year 2 and in Year 3, and comment on the trend.`,
  model: `**Year 2**: (${SONAPUR[1].idx} − ${SONAPUR[0].idx}) ÷ ${SONAPUR[0].idx} × 100 = **${SON_INF2} per cent**.\n**Year 3**: (${SONAPUR[2].idx} − ${SONAPUR[1].idx}) ÷ ${SONAPUR[1].idx} × 100 = **${SON_INF3} per cent**.\n**Trend**: prices are rising and the **rate of inflation itself is increasing**, so the purchasing power of money is falling faster each year.`,
  sol: 'Two rates and a comment.',
  scheme: [['Year 2 rate', 1], ['Year 3 rate', 1], ['Comment on the trend', 1]],
}));
Q('l_infl_types', long({
  t: 4, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: 'In an imagined economy, (i) the government finances a large new road programme by borrowing from the central bank while factories already run at full capacity, and (ii) a few months later the price of imported fertiliser and diesel doubles.\n\n(a) Identify the type of inflation in each case and explain how prices rise. [3]\n(b) Explain why the second case can hurt output while the first does not raise it. [2]',
  model: '(a) Case (i) is **demand-pull inflation**: the road programme, paid for with **new money**, raises **aggregate demand**; since factories are at **full capacity**, output cannot rise, so buyers **bid up prices**. Case (ii) is **cost-push inflation**: dearer **fertiliser and diesel** raise the **cost of production** of food and transport, and producers **pass the higher costs on** in higher prices, even though demand has not risen.\n(b) In case (i) the economy is already at **full employment**, so extra demand can only raise prices, not output. In case (ii) higher costs make some production **unprofitable**, so firms may **cut output** and jobs while prices rise.',
  sol: 'Identify each type with its mechanism; contrast the effect on output.',
  scheme: [['Case (i) demand-pull identified', 1], ['Mechanism of case (i)', 1], ['Case (ii) cost-push with mechanism', 1], ['Case (i): no rise in output at full employment', 1], ['Case (ii): output may fall', 1]],
}));
Q('l_index_case', long({
  t: 4, d: 3, c: 'application', marks: 5, wl: L5,
  stem: `A family in the imagined town of Meghpur spent ₹${inr(BASKET.base)} a month on a fixed basket in the base year; the same basket now costs ₹${inr(BASKET.current)}. The family\'s monthly income is now ₹${inr(SALARY)}.\n\n(a) Calculate the price index for the basket and the percentage rise in its prices. [2]\n(b) Find the family\'s income in base-year rupees, and explain what this shows about inflation and real income. [3]`,
  model: `(a) **Index** = ${inr(BASKET.current)} ÷ ${inr(BASKET.base)} × 100 = **${BASKET_IDX}**. **Rise in prices** = (${BASKET_IDX} − 100) ÷ 100 × 100 = **${BASKET_INF} per cent**.\n(b) **Real income** = ${inr(SALARY)} × 100 ÷ ${BASKET_IDX} = **₹${inr(SALARY_REAL)}** in base-year rupees. Although the family\'s **money income** is ₹${inr(SALARY)}, rising prices mean it can buy only what ₹${inr(SALARY_REAL)} bought in the base year. Inflation **reduces the purchasing power of money**, so a rise in money income improves living standards only if it is **faster than the rise in prices**.`,
  sol: 'Index and inflation; real income and its meaning.',
  scheme: [['Index 115', 1], ['Rise of 15 per cent', 1], ['Real income ₹40,000', 1], ['Money versus real income explained', 1], ['Condition for living standards to improve', 1]],
}));

// ================================================================ ISC paper-style items (4-mark, 8-mark) for the bank
Q('q4_functions_kinds', short({
  t: [1, 2], d: 3, c: 'application', marks: 4, wl: S4,
  stem: 'Answer both parts about an imagined spice trader in Kochi. [2 + 2]\n\n(i) She keeps part of her earnings in a fixed deposit and part in currency notes. Classify each as money or near money, with a reason.\n(ii) She prices pepper in rupees and sells on three months\' credit. Name the functions of money involved and explain one.',
  model: '(i) The **currency notes** are **money**: they are legal tender and can be **spent at once**. The **fixed deposit** is **near money**: it can be **converted into cash** quickly with little loss, but it cannot itself be **used to pay** for goods.\n(ii) Pricing pepper in rupees uses money as a **measure of value**; selling on three months\' credit uses money as a **standard of deferred payments**. Explanation: the debt is **fixed in rupees**, a unit both sides accept, so the buyer knows exactly what to pay when the three months are over.',
  sol: 'Money versus near money; two functions with one explained.',
  scheme: [['(i) Notes are money, with reason', 1], ['(i) Fixed deposit is near money, with reason', 1], ['(ii) Both functions named', 1], ['(ii) One function explained', 1]],
}));
Q('q4_index_causes', short({
  t: 4, d: 3, c: 'application', marks: 4, wl: S4,
  stem: `Answer both parts. [2 + 2]\n\n(i) The consumer price index of an imagined coastal district rose from 160 to 172. Calculate the rate of inflation.\n(ii) Local reports blame a big rise in the price of imported diesel used by fishing boats. Identify the type of inflation and explain how it arises.`,
  model: `(i) **Rate of inflation** = (172 − 160) ÷ 160 × 100 = **${INF_160_172} per cent**: the general level of prices in the district has risen by that share in one year.\n(ii) It is **cost-push inflation**. Diesel is a major **input** for fishing boats and for transport, so its higher price raises the **cost of catching and moving fish**. Boat owners and traders **pass the higher cost on** to buyers, so prices rise even though **demand has not increased**.`,
  sol: 'Rate of inflation; cost-push with mechanism.',
  scheme: [['(i) Formula', 1], ['(i) 7.5 per cent', 1], ['(ii) Cost-push identified', 1], ['(ii) Mechanism through costs', 1]],
}));
Q('q4_supply_measures', short({
  t: 3, d: 2, c: 'understanding', marks: 4, wl: S4,
  stem: 'Answer both parts for an imagined school quiz on money supply. [2 + 2]\n\n(i) Explain the meaning of M0 and why it is also called reserve money.\n(ii) State the difference between M1 and M3, and say which is more liquid.',
  model: '(i) **M0** = **currency in circulation** + **bankers\' deposits with the RBI** + **other deposits with the RBI**. It is called **reserve money** (or high-powered money) because the cash and deposits of banks with the central bank form the **reserves** on which banks build their lending.\n(ii) **M1** = currency with the public + **demand deposits** + other deposits with the RBI, while **M3** = M1 + **net time deposits** of banks. **M1 is more liquid**, because time deposits cannot be used for payments until they mature.',
  sol: 'M0 and its name; M1 versus M3 and liquidity.',
  scheme: [['(i) Components of M0', 1], ['(i) Why reserve money', 1], ['(ii) M1 and M3 compared', 1], ['(ii) M1 more liquid, with reason', 1]],
}));
Q('l8_money_evolution', long({
  t: [1, 2], d: 4, c: 'analysis', marks: 8, wl: L8,
  stem: 'Answer both parts. [4 + 4]\n\n(i) Trace how an imagined trading community moved from barter to commodity money, metallic coins and finally paper and bank money, explaining what each stage solved.\n(ii) Explain the primary, secondary and contingent functions of money in such a community today, with one example of each kind.',
  model: '(i) Under **barter**, trade needed a **double coincidence of wants** and had **no common measure of value**. **Commodity money** (grain, cattle, salt) gave a good that everyone accepted, but it was bulky, perishable and hard to divide. **Metallic coins** were **durable, divisible and portable**, and full-bodied coins held their value; later **token coins** saved metal. **Paper money** made large payments easy to carry, and **bank (credit) money**, moved by cheque or transfer, let traders settle big bills without cash. Each stage made exchange **cheaper and safer**.\n(ii) **Primary**: money is a **medium of exchange** (a trader sells cloth for money and buys grain with it) and a **measure of value** (all goods priced in rupees). **Secondary**: a **store of value** (savings kept for the future), a **standard of deferred payments** (loans repaid later) and a **transfer of value** (selling land in one town to buy in another). **Contingent**: the **basis of credit** (banks lend against deposits), the **distribution of income** as wages, rent, interest and profit, and **liquidity**.',
  sol: 'Stages and what each solved; the three groups of functions with examples.',
  scheme: [['(i) Problems of barter', 1], ['(i) Commodity money and its limits', 1], ['(i) Metallic coins', 1], ['(i) Paper and bank money', 1], ['(ii) Primary functions with example', 1], ['(ii) Secondary functions with example', 1], ['(ii) Contingent functions with example', 1], ['(ii) Clear grouping of the three kinds', 1]],
}));
Q('l8_inflation_full', long({
  t: 4, d: 4, c: 'evaluation', marks: 8, wl: L8,
  stem: `Answer both parts. [4 + 4]\n\n(i) Use the price index of the imagined town of Sonapur (${SONAPUR.map((r) => `${r.year}: ${r.idx}`).join('; ')}) to calculate the inflation rate for Years 2 and 3 and the purchasing power of a rupee in Year 1. Explain what the figures show.\n(ii) A local committee says the price rise is "all due to greedy traders". Evaluate this claim by explaining demand-pull and cost-push causes that might also be at work.`,
  model: `(i) Inflation in **Year 2** = (${SONAPUR[1].idx} − ${SONAPUR[0].idx}) ÷ ${SONAPUR[0].idx} × 100 = **${SON_INF2} per cent**; in **Year 3** = (${SONAPUR[2].idx} − ${SONAPUR[1].idx}) ÷ ${SONAPUR[1].idx} × 100 = **${SON_INF3} per cent**. In Year 1 one rupee buys **100 ÷ ${SONAPUR[0].idx} = ₹${SON_PP1}** of base-year goods. Prices are rising **faster each year**, so the **purchasing power of money is falling**, hurting people on fixed incomes.\n(ii) Traders raising margins would be **profit-push** inflation, one form of cost-push, but it is unlikely to be the **only** cause. **Demand-pull** causes may be present: more **bank credit**, higher **public spending** or rising incomes can push spending above what the town produces. Other **cost-push** causes are possible too: higher **wages**, dearer **fuel and raw materials**, or higher **indirect taxes** raise costs. A fair view is that prices usually rise from **several causes together**, so the committee should study demand and costs before blaming traders alone.`,
  sol: 'Rates, purchasing power and interpretation; balanced evaluation of causes.',
  scheme: [['(i) Year 2 rate', 1], ['(i) Year 3 rate', 1], ['(i) Purchasing power 0.8', 1], ['(i) Interpretation', 1], ['(ii) Profit-push recognised', 1], ['(ii) Demand-pull causes', 1], ['(ii) Other cost-push causes', 1], ['(ii) Balanced judgement', 1]],
}));

// ================================================================ case-based
Q('cb_tea_barter', caseQ({
  t: [1, 2], d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the imagined account of a hill village and answer the questions that follow. *(Written by SOYL for practice; the village and people are imagined.)*',
  passage: '**From the diary of a schoolteacher in an imagined hill village of Arunachal Pradesh**\n\nUntil the new road came, families here swapped oranges for salt and cloth with traders who walked up twice a year. Old Tashi told me how hard it was: the salt trader wanted rice, not oranges, and nobody could agree how many oranges a blanket was worth. Oranges also rotted before the next trader came. Now the village co-operative sells oranges in town for rupees, keeps its accounts in rupees and has opened a bank account to save for a cold store.',
  parts: [
    child('a', short({ t: 1, d: 2, c: 'understanding', marks: 1, stem: 'Which difficulty of barter does the salt trader\'s preference show?', model: 'The lack of a **double coincidence of wants**.', sol: 'The trader wanted rice, not oranges.', scheme: [['Double coincidence of wants', 1]] })),
    child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Which function of money helps the co-operative keep its accounts?', model: 'Money as a **measure (unit) of value**: all sales and costs are recorded in rupees.', sol: 'Unit of account.', scheme: [['Measure of value', 1]] })),
    child('c', short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Explain how money solves the problem of rotting oranges for the co-operative.', model: 'Oranges are **perishable**, so they are a poor **store of value**. By **selling them for money** and keeping the money in a **bank account**, the co-operative stores the value safely and can **spend it later**, for example on the cold store.', sol: 'Store-of-value function.', scheme: [['Oranges a poor store of value', 1], ['Money and the bank account store value for later', 1]] }), [
      short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Explain why "nobody could agree how many oranges a blanket was worth" under barter, and how money changes this.', model: 'Barter has **no common measure of value**, so every pair of goods needs its own **exchange rate**, which is hard to agree. With money, every good has a **price in rupees**, so values are easy to **compare**.', sol: 'Lack of a common measure; prices in money.', scheme: [['No common measure under barter', 1], ['Money prices make comparison easy', 1]] }),
    ]),
  ],
}));
Q('cb_post_office', caseQ({
  t: 3, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the imagined conversation at a post office and answer the questions that follow. *(Written by SOYL for practice; the people are imagined.)*',
  passage: '**At an imagined post office in Madurai**\n\nAnbu keeps some cash at home, has a current account in a bank, a savings account in the post office and a one-year fixed deposit in a bank. His sister, an economics student, tells him that statisticians count these holdings in different measures of money supply, from the narrowest to the broadest, and that the cash lying in the bank\'s own vault is not counted at all.',
  parts: [
    child('a', short({ t: 3, d: 2, c: 'understanding', marks: 1, stem: 'Which two of Anbu\'s holdings are part of M1?', model: 'His **cash at home** (currency with the public) and his **current-account deposit** (a demand deposit).', sol: 'Currency with the public and demand deposits.', scheme: [['Both holdings named', 1]] })),
    child('b', short({ t: 3, d: 2, c: 'understanding', marks: 1, stem: 'In which measure does his one-year fixed deposit first appear?', model: '**M3**, which adds net **time deposits** of banks to M1.', sol: 'Time deposits enter M3.', scheme: [['M3', 1]] })),
    child('c', short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Explain why the cash in the bank\'s vault is not counted in money supply.', model: 'Money supply counts money **held by the public** for spending. Cash in the **bank\'s vault** belongs to the **banking system** and is not in circulation with the public, so counting it would **overstate** the money available for spending.', sol: 'Only the public\'s holdings count.', scheme: [['Money supply = money with the public', 1], ['Vault cash belongs to the banking system', 1]] }), [
      short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): In which measures does his post office savings account appear, and why is M1 more liquid than those measures?', model: 'Post office savings deposits enter **M2** (and M4). **M1** contains only **currency and demand deposits**, which can be used for payments **at once**, so it is more liquid.', sol: 'M2 and M4; liquidity of M1.', scheme: [['M2 (and M4)', 1], ['Reason M1 is more liquid', 1]] }),
    ]),
  ],
}));
Q('cb_sonapur_prices', caseQ({
  t: 4, d: 4, c: 'evaluation', origin: 'soyl-original',
  stem: 'Study the imagined report on prices in Sonapur and answer the questions that follow. *(Written by SOYL for practice; the town and figures are imagined.)*',
  passage: `**An imagined municipal report, Sonapur**\n\n${sonapurTable()}\n\nShopkeepers say wholesale suppliers have raised prices after costlier diesel and higher wages. A councillor argues that easy loans from new finance companies have also raised spending at a time when local workshops were already working at full capacity.`,
  parts: [
    child('a', num({ t: 4, d: 2, c: 'application', marks: 1, value: SON_INF3, unit: '%', stem: 'Calculate the rate of inflation in Year 3 (per cent).', sol: `(${SONAPUR[2].idx} − ${SONAPUR[1].idx}) ÷ ${SONAPUR[1].idx} × 100 = ${SON_INF3} per cent.` })),
    child('b', short({ t: 4, d: 2, c: 'understanding', marks: 1, stem: 'Name the type of inflation the shopkeepers describe.', model: '**Cost-push inflation** (from dearer diesel and higher wages).', sol: 'Costs pushing prices.', scheme: [['Cost-push', 1]] })),
    child('c', short({ t: 4, d: 4, c: 'evaluation', marks: 2, stem: '**Either** (i): Evaluate the councillor\'s argument: what type of inflation does it describe, and why does full capacity matter?', model: 'It describes **demand-pull inflation**: easy loans raise **spending**. Because workshops are at **full capacity**, output **cannot rise**, so the extra demand **pushes prices up**. The argument is reasonable, and both causes may be acting together.', sol: 'Demand-pull; full capacity means prices, not output, rise.', scheme: [['Demand-pull identified', 1], ['Role of full capacity explained', 1]] }), [
      short({ t: 4, d: 3, c: 'application', marks: 2, stem: '**Or** (ii): Find the purchasing power of a rupee in Year 1 (base year = 100) and explain what it means for a family with a fixed income.', model: `Purchasing power = 100 ÷ ${SONAPUR[0].idx} = **₹${SON_PP1}**: a rupee buys only what ${SON_PP1 * 100} paise bought in the base year. A family with a **fixed money income** can buy **less**, so its **real income falls**.`, sol: 'Purchasing power and its meaning.', scheme: [[`Purchasing power ₹${SON_PP1}`, 1], ['Real income of fixed-income family falls', 1]] }),
    ]),
  ],
}));
