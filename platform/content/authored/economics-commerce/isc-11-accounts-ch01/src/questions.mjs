// ISC 11 Accounts, ch01 Introduction to Accounting: question bank. Every firm, owner, customer and figure is imagined
// by SOYL; no textbook or CISCE specimen/past-paper item is reused (D-036). Amounts used in several places come from
// figs.mjs; amounts used once are computed and pinned here with same(). No GST anywhere.
import { Q, mcq, ar, tf, fb, match, ord, num, short, long } from './lib.mjs';
import { sum, same, rs, inr, mdTable } from './acc.mjs';
import { SH, CYCLE, tot } from './figs.mjs';

/** Registers a question after checking that its marking scheme adds up to its marks. */
function QQ(key, q) {
  same(sum(q.marking_scheme.map((s) => s.marks)), q.marks, `marking scheme of ${key}`);
  return Q(key, q);
}
const S2 = [20, 60];
const S3 = [40, 90];
const L5 = [70, 160];
const numQ = (o) => num({ ...o, scheme: [[`Correct answer: ${rs(o.value)}`, o.marks ?? 1]] });

// ================================================================ t01 History; book-keeping, accounting, accountancy; the cycle
QQ('m_double_entry', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which statement about the history of accounting is correct?',
  opts: [
    'Merchants of the Italian trading cities developed double entry, and a printed account of it appeared in the late fifteenth century',
    'Double entry was first used only after computers came into business',
    'Written records were kept only by joint-stock companies, never by ancient rulers or traders',
    'Cost accounting is older than any form of record keeping',
  ],
  sol: 'Early records of stores, taxes and trade were kept long before double entry. Double entry grew out of expanding trade in medieval Italy, which is why a computer-era origin or an origin in companies alone is wrong, and cost accounting came much later with factories.',
}));
QQ('m_acctcy', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'A commerce student writes: "The principles, concepts and conventions that guide how the books are kept form a body of knowledge." Which term does this describe?',
  opts: ['Accountancy', 'Book-keeping', 'Auditing', 'Costing'],
  sol: 'Accountancy is the theory behind the practice. Book-keeping only records and sorts, auditing is an independent check of the books, and costing deals with the cost of products.',
}));
QQ('m_cycle_stage', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Mohan runs an imagined pickle business in Kullu. At the end of the month he prepares a trial balance and a statement of profit from the ledger balances. Which stage of the accounting cycle is this?',
  opts: ['Summarising', 'Classifying', 'Recording', 'Communicating'],
  sol: 'Bringing the ledger balances together into a trial balance and statements is summarising. Sorting entries under account heads is classifying, writing the first entry is recording, and sending the statements to a user is communicating.',
}));
QQ('ar_bk_base', ar({
  t: 1, d: 3, c: 'understanding', verdict: 'both-true-explains',
  a: 'Book-keeping is often called the base on which accounting rests.',
  r: 'The records that a book-keeper prepares are the starting material that accounting summarises, analyses and interprets.',
  sol: 'Both statements are true. Accounting cannot summarise or interpret anything that has not first been recorded and sorted, so the reason explains the assertion.',
}));
QQ('tf_accountancy', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'Accountancy means the actual work of entering each day\'s transactions in the books.',
  sol: 'That work is book-keeping. Accountancy is the body of principles and techniques, the knowledge, on which accounting practice is based.',
}));
QQ('fb_classify', fb({
  t: 1, d: 2, c: 'recall',
  stem: 'The stage of the accounting cycle in which entries of the same kind are grouped under heads such as Sales, Rent and a customer\'s name is called ___.',
  acc: [['classifying', 'classification']],
  sol: 'Grouping entries under account heads is the stage of classifying, which is done in the ledger.',
}));
QQ('ord_cycle', ord({
  t: 1, d: 2, c: 'recall', marks: 2,
  stem: 'Arrange the stages of the accounting cycle in the correct order, from the first to the last.',
  items: CYCLE,
  sol: 'A transaction is first identified and measured in money, then recorded, then classified, then summarised, then analysed and interpreted, and finally communicated to the users.',
}));
QQ('s2_bk_acc', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State **two** points of difference between book-keeping and accounting.',
  model: [
    '1. **Scope:** book-keeping stops at recording and classifying transactions; accounting goes on to summarise, analyse, interpret and communicate them.',
    '2. **Skill and purpose:** book-keeping needs care and accuracy in routine work and gives clean records; accounting needs knowledge and judgement and gives information for decisions.',
  ].join('\n'),
  sol: 'Any two valid differences, each stated for both terms, earn a mark each.',
  scheme: [['First point of difference stated for both terms', 1], ['Second point of difference stated for both terms', 1]],
}));
QQ('s2_history', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Give **two** developments that made accounting more important and more detailed over time.',
  model: [
    '1. **Growth of trade and credit:** when merchants bought and sold on credit across towns, they needed lasting records of what was owed and by whom, which led to double entry.',
    '2. **Factories and companies:** large factories and companies with many shareholders needed cost records, regular statements and checks by outsiders, and later computers made the work faster.',
  ].join('\n'),
  sol: 'One mark for each development with its effect; no dates are needed.',
  scheme: [['First development with its effect on accounting', 1], ['Second development with its effect on accounting', 1]],
}));
QQ('s2_cycle_two', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Explain the stages of **classifying** and **summarising** in the accounting cycle.',
  model: [
    '1. **Classifying:** the recorded entries are sorted and grouped under account heads, such as one account for Sales and one for each customer, usually in the ledger.',
    '2. **Summarising:** the balances of the accounts are brought together into a trial balance and then into the final statements showing profit or loss and the financial position.',
  ].join('\n'),
  sol: 'A mark for each stage explained with the place or product of the work.',
  scheme: [['Classifying explained', 1], ['Summarising explained', 1]],
}));
QQ('s3_three_terms', short({
  t: 1, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Distinguish **book-keeping**, **accounting** and **accountancy** in one or two lines each.',
  model: [
    '1. **Book-keeping** is the work of recording transactions in the books and classifying them under heads.',
    '2. **Accounting** is the wider process that starts from these records and summarises, analyses, interprets and communicates the results to users.',
    '3. **Accountancy** is the body of principles, concepts and techniques, the theory, which guides how accounting is practised.',
  ].join('\n'),
  sol: 'One mark for each term, correctly separated from the other two.',
  scheme: [['Book-keeping', 1], ['Accounting', 1], ['Accountancy', 1]],
}));
{
  const pick = [SH.rows[1], SH.rows[3], SH.rows[5]];
  QQ('s3_cycle_map', short({
    t: 1, d: 3, c: 'application', marks: 3, wl: [20, 60],
    stem: `Sirsa Handloom Stores (imagined) does the following three things. Name the stage of the accounting cycle that each one belongs to.\n\n${mdTable(['Activity', 'Stage'], pick.map((r, i) => [`(${['a', 'b', 'c'][i]}) ${r[0]}`, '?']))}`,
    model: mdTable(['Activity', 'Stage'], pick.map((r, i) => [`(${['a', 'b', 'c'][i]})`, r[1]])),
    sol: 'Ask what the work produces: an entry, a group of entries, a statement or a delivery to a user.',
    scheme: [['(a) correct stage', 1], ['(b) correct stage', 1], ['(c) correct stage', 1]],
  }));
}
QQ('l5_cycle', long({
  t: 1, d: 3, c: 'application', marks: 5, wl: L5,
  stem: 'Kullu Pickle Pantry (imagined) sells pickles worth ₹7,200 on credit to a hotel.\n\n(a) Name the six stages of the accounting cycle in order. [2]\n\n(b) For this sale, say what is done at the stages of recording, classifying and summarising. [3]',
  model: [
    '**(a)** The stages are: identifying and measuring; recording; classifying; summarising; analysing and interpreting; communicating.',
    '**(b)** The sale of ₹7,200 is identified as a credit sale and measured in rupees.',
    '- **Recording:** a bill is raised and the sale is entered in the book of original entry in date order.',
    '- **Classifying:** the entry is posted to the Sales account and to the hotel\'s personal account, so that all sales and all dues from the hotel can be seen together.',
    '- **Summarising:** at the month end the balances, including the hotel\'s dues, are brought into a trial balance and then into the statements.',
  ].join('\n'),
  sol: 'Marks go to the correct order, and then one mark for each of the three stages applied to the sale.',
  scheme: [['Stages named in the right order (two marks if all six are right, one if at most one is misplaced)', 2], ['Recording applied to the sale', 1], ['Classifying applied to the sale', 1], ['Summarising applied to the sale', 1]],
}));

// ================================================================ t02 Basic terms
QQ('m_chk_trans', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Which of the following is a business transaction of Lohit Kites (an imagined shop)?',
  opts: [
    'It sells kites worth ₹6,000 and receives the money at once',
    'A customer asks whether a discount will be given on a bulk order next season',
    'The owner thinks of opening a second shop in the town',
    'A school writes to say it may place an order after the holidays',
  ],
  sol: 'A transaction needs an exchange of value that can be measured in money. A request about a discount, a plan to open a shop and a possible order are events: nothing has been exchanged yet.',
}));
QQ('m_voucher', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'A cash memo, a receipt or a supplier\'s bill that is kept as proof of an entry in the books is called a',
  opts: ['voucher', 'ledger', 'trial balance', 'journal'],
  sol: 'A voucher is the documentary evidence of a transaction. A journal and a ledger are books, and a trial balance is a list of balances.',
}));
QQ('m_credit_trans', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Shruti Sweets (imagined) buys sugar worth ₹18,000 and agrees to pay for it after twenty days. What kind of transaction is this?',
  opts: ['A credit transaction', 'A cash transaction', 'An event that is not a transaction', 'Drawings by the owner'],
  sol: 'Value has been received but the payment is postponed, so it is a credit transaction. It is not a cash transaction because no money changes hands now, and it is a transaction, not a mere event, because it is measurable in money.',
}));
{
  const g = 4500;
  QQ('m_drawings_eff', mcq({
    t: 2, d: 3, c: 'application',
    stem: `Ritwik, who owns an imagined hardware shop, takes goods that cost ${rs(g)} to use at his home. What is the effect on the business?`,
    opts: [
      `The owner's capital falls by ${rs(g)}, because these are drawings`,
      `Expenses rise by ${rs(g)}, so profit falls by the same amount`,
      `Sales rise by ${rs(g)}, because the goods have left the shop`,
      'There is no effect, because the goods stayed in the owner\'s own family',
    ],
    sol: `Goods taken for personal use are drawings. They reduce capital and are not an expense, so profit is not reduced. They are not a sale because no customer paid, and the claim that nothing changes ignores the separate existence of the business from its owner.`,
  }));
}
QQ('m_loss', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'Which one of these is a loss of a business and not an expense?',
  opts: [
    'Goods worth ₹5,000 stolen from the godown and not insured',
    'Wages paid to the shop assistant for the month',
    'Rent paid for the shop premises',
    'Advertising charges paid to a local newspaper',
  ],
  sol: 'Theft reduces capital without any benefit coming back to the firm, and it is not incurred to earn revenue, so it is a loss. Wages, rent and advertising are costs incurred in earning revenue, so they are expenses.',
}));
QQ('m_income_not_rev', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: 'For a firm that trades in goods, which item is income but is not revenue from its main activity?',
  opts: [
    'Interest received on a fixed deposit with a bank',
    'Cash sales of goods in the shop',
    'Credit sales of goods to a dealer',
    'Sales made through the firm\'s website',
  ],
  sol: 'Revenue arises from selling goods in the main activity, whether for cash, on credit or online. Interest on a deposit is an earning from outside that activity, so it is income without being revenue.',
}));
{
  const bv = 52000, sp = 58500, gain = sp - bv;
  same(gain, 6500, 'van gain');
  QQ('m_gain', mcq({
    t: 2, d: 3, c: 'application',
    stem: `Bhadra Courier Services (imagined) sells an old delivery van whose book value is ${rs(bv)} for ${rs(sp)}. How should the difference be described?`,
    opts: [`A gain of ${rs(gain)}, arising from an incidental event`, `A profit of ${rs(sp)}, the full sale price`, `A loss of ${rs(gain)}`, `An expense of ${rs(bv)}`],
    sol: `The van is not what the firm sells, so the excess over book value is incidental. It equals ${rs(sp)} − ${rs(bv)} = ${rs(gain)}. Treating the whole price as profit ignores book value, a loss would need a price below book value, and a sale is not an expense.`,
  }));
}
QQ('ar_drawings', ar({
  t: 2, d: 3, c: 'understanding', verdict: 'both-true-not-explains',
  a: 'Drawings reduce the capital of a sole proprietor.',
  r: 'Capital is the amount which the owner has invested in the business, together with profits left in it.',
  sol: 'Both statements are true, but the reason only defines capital. It does not say why drawings reduce it: drawings reduce capital because the owner takes value out of the business.',
}));
QQ('ar_loss', ar({
  t: 2, d: 4, c: 'analysis', verdict: 'A-true-R-false',
  a: 'Goods destroyed in a flood are a loss to the business and not an expense.',
  r: 'A loss always brings the firm some benefit in return for the amount lost.',
  sol: 'The assertion is true: the flood reduces capital without any purpose of earning revenue. The reason is false, because a loss is exactly the fall in capital for which nothing is received.',
}));
QQ('tf_drawings', tf({
  t: 2, d: 2, c: 'understanding', ans: false,
  stem: 'Cash which the owner of a shop withdraws for household use is an expense of the shop, because the money leaves the business.',
  sol: 'It is drawings, which reduce capital. An expense is incurred to earn revenue, and a household withdrawal earns none.',
}));
QQ('tf_gain', tf({
  t: 2, d: 3, c: 'understanding', ans: true,
  stem: 'A trader who sells an old almirah for more than its book value has made a gain, which does not form part of the revenue from selling the goods the trader deals in.',
  sol: 'The excess arises from an incidental event, not from the regular trading activity, so it is a gain and not part of revenue.',
}));
QQ('fb_capital', fb({
  t: 2, d: 2, c: 'recall',
  stem: 'The capital of a sole proprietor equals total assets minus ___ liabilities.',
  acc: [['external', 'outside', 'outsiders', 'total external', 'all external']],
  sol: 'Capital is the owner\'s claim, so it is found after deducting external liabilities, those owed to outsiders.',
}));
{
  const sales = 420000, ret = 15000, comm = 9000, cogs = 270000, wages = 48000, rent = 24000, intp = 6000;
  const income = sales - ret + comm, exp = cogs + wages + rent + intp, profit = income - exp;
  same(income, 414000, 'candle income');
  same(exp, 348000, 'candle expenses');
  same(profit, 66000, 'candle profit');
  QQ('num_profit', numQ({
    t: 2, d: 2, c: 'application', value: profit, unit: '₹',
    stem: `Chandra Candle Works (imagined) had sales of ${rs(sales)} with sales returns of ${rs(ret)} and earned commission of ${rs(comm)} during the year. Its cost of goods sold was ${rs(cogs)}, wages ${rs(wages)}, rent ${rs(rent)} and interest paid ${rs(intp)}. Find its profit for the year.`,
    sol: `Income = ${inr(sales)} − ${inr(ret)} + ${inr(comm)} = ${rs(income)}; expenses = ${inr(cogs)} + ${inr(wages)} + ${inr(rent)} + ${inr(intp)} = ${rs(exp)}; profit = ${inr(income)} − ${inr(exp)} = ${rs(profit)}.`,
  }));
}
{
  const open = 360000, intro = 25000, p = 84000, dr = 45000, close = open + intro + p - dr;
  same(close, 424000, 'tyre capital');
  QQ('num_capital_close', numQ({
    t: 2, d: 3, c: 'application', value: close, unit: '₹',
    stem: `Gurpreet owns an imagined tyre shop. His capital at the start of the year was ${rs(open)}. During the year he put in a further ${rs(intro)}, the shop earned a profit of ${rs(p)} and he withdrew ${rs(dr)} for personal use. Find the capital at the end of the year.`,
    sol: `Closing capital = ${inr(open)} + ${inr(intro)} + ${inr(p)} − ${inr(dr)} = ${rs(close)}.`,
  }));
}
{
  const wages = 36000, rent = 18000, flood = 12000, adv = 6500, house = 9000, theft = 4000;
  const exp = wages + rent + adv;
  same(exp, 60500, 'mats expenses');
  QQ('num_expenses', numQ({
    t: 2, d: 3, c: 'application', value: exp, unit: '₹',
    stem: `Barpeta Bamboo Mats (imagined) paid wages of ${rs(wages)}, rent of ${rs(rent)} and advertising of ${rs(adv)}. It lost goods worth ${rs(flood)} in a flood and ${rs(theft)} by theft, and the owner took ${rs(house)} for household use. Find the total expenses of the business.`,
    sol: `Only costs incurred to earn revenue are expenses; the two losses and the household withdrawal are left out. Expenses = ${inr(wages)} + ${inr(rent)} + ${inr(adv)} = ${rs(exp)}.`,
  }));
}
{
  const close = 510000, open = 420000, dr = 30000, p = close - open + dr;
  same(p, 120000, 'profit back');
  QQ('num_profit_back', numQ({
    t: 2, d: 4, c: 'application', value: p, unit: '₹',
    stem: `Sonal runs an imagined bakery school. Her capital was ${rs(open)} at the start of the year and ${rs(close)} at the end. She put in no new capital and withdrew ${rs(dr)} for personal use. Find the profit of the year.`,
    sol: `Closing capital = opening capital + profit − drawings, so profit = ${inr(close)} − ${inr(open)} + ${inr(dr)} = ${rs(p)}.`,
  }));
}
QQ('s2_exp_loss', short({
  t: 2, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish an **expense** from a **loss**, giving one example of each.',
  model: [
    '1. An **expense** is a cost incurred in the ordinary course of earning revenue, and the firm gets a benefit for it; for example, shop rent.',
    '2. A **loss** is a fall in capital that arises from an unusual or accidental event and brings no benefit in return; for example, goods stolen from the godown.',
  ].join('\n'),
  sol: 'A mark for the difference in the benefit received, and a mark for the correct examples.',
  scheme: [['Expense: meaning and example', 1], ['Loss: meaning and example', 1]],
}));
QQ('s2_rev_inc', short({
  t: 2, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'Explain the difference between **revenue** and **income**, with one example of each.',
  model: [
    '1. **Revenue** is the amount earned from the main activity of the business, such as the sale of goods or fees for services.',
    '2. **Income** is the wider term: it includes revenue and also other earnings, such as interest and commission received and gains.',
  ].join('\n'),
  sol: 'Revenue is the narrower term. Credit the example of each.',
  scheme: [['Revenue explained with example', 1], ['Income explained with example', 1]],
}));
QQ('s3_profit_gain', short({
  t: 2, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Explain the difference between **profit** and **gain**. A trader sells an old computer, book value ₹14,000, for ₹16,500: find the gain.',
  model: [
    '1. **Profit** is the excess of income over expenses from the normal activity of the business in a period.',
    '2. **Gain** is an increase in capital from an incidental or occasional event, outside the regular activity of the business.',
    '3. Gain on the computer = ₹16,500 − ₹14,000 = ₹2,500.',
  ].join('\n'),
  sol: 'Two marks for the distinction and one for the computed gain.',
  scheme: [['Profit explained', 1], ['Gain explained as incidental or occasional', 1], ['Gain of ₹2,500 computed', 1]],
}));
{
  const open = 280000, intro = 40000, dr = 36000, p = 62000, close = open + intro + p - dr;
  same(close, 346000, 'cap roll');
  QQ('s3_cap_draw', short({
    t: 2, d: 3, c: 'application', marks: 3, wl: S3,
    stem: `Define **drawings**. Then find the closing capital of Yamini, who owns an imagined sewing school, from these facts: opening capital ${rs(open)}, capital introduced ${rs(intro)}, profit for the year ${rs(p)} and cash drawn for household use ${rs(dr)}.`,
    model: [
      '**Drawings** are cash or goods taken out of the business by the owner for personal use; they reduce capital and are not an expense.',
      mdTable(['Capital account', '₹'], [['Opening capital', inr(open)], ['Add: capital introduced', inr(intro)], ['Add: profit', inr(p)], ['Less: drawings', inr(dr)], ['Closing capital', inr(close)]]),
    ].join('\n\n'),
    sol: 'A mark for the definition, one for the additions and one for the closing figure.',
    scheme: [['Drawings defined', 1], ['Additions to capital correct', 1], ['Closing capital of ₹3,46,000 after drawings', 1]],
  }));
}
QQ('l5_terms', long({
  t: 2, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Distinguish between the following pairs, with one example of each term: [5]\n\n(a) expense and loss [2]\n\n(b) revenue and income [1]\n\n(c) profit and gain [2]',
  model: [
    '**(a)** An expense is incurred to earn revenue and returns a benefit, for example wages. A loss lowers capital by accident or through an unusual event and returns nothing, for example goods lost in a fire.',
    '**(b)** Revenue comes from the main activity, for example sale of goods. Income includes revenue and other earnings, for example interest received.',
    '**(c)** Profit is the surplus of income over expenses of a period from the regular activity. A gain comes from an incidental event, for example selling an old machine above its book value.',
  ].join('\n\n'),
  sol: 'One mark for each side of (a) and (c), and one mark in (b) for both terms with an example.',
  scheme: [['(a) expense with example', 1], ['(a) loss with example', 1], ['(b) revenue and income distinguished with an example', 1], ['(c) profit with example', 1], ['(c) gain with example', 1]],
}));
{
  const sales = 540000, ret = 20000, rev = sales - ret;
  const oi = [['Rent received from a sub-tenant', 18000], ['Interest on a fixed deposit', 7000]];
  const ex = [['Cost of goods sold', 340000], ['Salaries', 64000], ['Shop rent', 30000], ['Electricity', 11000]];
  const income = rev + tot(oi), exp = tot(ex), profit = income - exp;
  const gain = 9000, loss = 5500, net = profit + gain - loss;
  const open = 400000, dr = 55000, close = open + net - dr;
  same(income, 545000, 'dhaba income');
  same(exp, 445000, 'dhaba expenses');
  same(profit, 100000, 'dhaba profit');
  same(net, 103500, 'dhaba net');
  same(close, 448500, 'dhaba closing capital');
  QQ('l5_profit', long({
    t: 2, d: 4, c: 'application', marks: 5, wl: [50, 160],
    stem: `Mehboob owns Dhanera Provision Store (imagined). For the year, sales were ${rs(sales)} and sales returns ${rs(ret)}. He received rent of ${rs(18000)} from a sub-tenant and interest of ${rs(7000)} on a fixed deposit. Cost of goods sold was ${rs(340000)}, salaries ${rs(64000)}, shop rent ${rs(30000)} and electricity ${rs(11000)}. He also made a gain of ${rs(gain)} on selling an old refrigerator and suffered a loss of ${rs(loss)} when goods were damaged in transit. His capital at the start was ${rs(open)} and he drew ${rs(dr)}.\n\nFind: (a) total income [1]; (b) total expenses [1]; (c) profit from the regular activity [1]; (d) net profit after the gain and the loss [1]; (e) closing capital [1].`,
    model: [
      mdTable(['Item', '₹'], [
        ['Revenue: sales less returns (5,40,000 − 20,000)', inr(rev)],
        ['Add: rent received and interest', inr(tot(oi))],
        ['**(a) Total income**', inr(income)],
        ['**(b) Total expenses**', inr(exp)],
        ['**(c) Profit from the regular activity**', inr(profit)],
        ['Add: gain on the refrigerator', inr(gain)],
        ['Less: loss in transit', inr(loss)],
        ['**(d) Net profit**', inr(net)],
        ['Opening capital', inr(open)],
        ['Add: net profit', inr(net)],
        ['Less: drawings', inr(dr)],
        ['**(e) Closing capital**', inr(close)],
      ]),
    ].join('\n'),
    sol: 'Keep expenses and the incidental gain and loss apart: the gain and the loss are added and deducted only after the regular profit is found.',
    scheme: [['(a) Total income', 1], ['(b) Total expenses', 1], ['(c) Profit', 1], ['(d) Net profit after gain and loss', 1], ['(e) Closing capital after drawings', 1]],
  }));
}

// ================================================================ t03 Assets and liabilities
QQ('m_chk_class', mcq({
  t: 3, d: 2, c: 'recall',
  stem: 'Which of the following is an intangible fixed asset of a firm?',
  opts: ['The copyright of a training manual which the firm has published', 'A delivery van', 'Goods kept for sale', 'Cash at the bank'],
  sol: 'A copyright has value to the firm but no physical form, and it is used over many years. The van is a tangible fixed asset, and the goods and the bank balance are current assets.',
}));
QQ('m_wasting', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Pench Stone Quarries (imagined) leases a hillside from which it cuts stone for sale. The value of the leased quarry falls as the stone is removed. This is an example of a',
  opts: ['wasting asset', 'fictitious asset', 'liquid asset', 'contingent asset'],
  sol: 'A wasting asset is gradually used up as it is exploited, like a quarry or a mine. A fictitious asset is an unwritten-off expense, and a liquid asset is cash or something that turns into cash almost at once.',
}));
QQ('m_fictitious', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Which item is shown as a fictitious asset until it is written off?',
  opts: ['Cost of forming the business that has not yet been written off', 'Goodwill bought from a former owner', 'A registered patent', 'Furniture bought for the office'],
  sol: 'Preliminary expenses represent money spent which has no resale value and are written off over a few years, so they are not real assets. Goodwill and a patent are intangible but real, and furniture is tangible.',
}));
{
  const wages = 7000, flour = 38000, rent = 5000, loan = 200000, capital = 300000, claim = 20000;
  const cl = wages + flour + rent;
  same(cl, 50000, 'bakery current liabilities');
  QQ('m_cur_liab', mcq({
    t: 3, d: 3, c: 'application',
    stem: `At the year end an imagined bakery owes wages of ${rs(wages)}, flour suppliers ${rs(flour)} and rent of ${rs(rent)}. It also has a bank loan of ${rs(loan)} repayable in six years, owner's capital of ${rs(capital)} and a customer's claim of ${rs(claim)} still undecided in court. What is the total of its current liabilities?`,
    opts: [rs(cl), rs(cl + loan), rs(cl + claim), rs(cl + capital)],
    sol: `Only wages, suppliers and rent fall due within the year: ${inr(wages)} + ${inr(flour)} + ${inr(rent)} = ${rs(cl)}. The option of ${rs(cl + loan)} adds the long-term loan, ${rs(cl + claim)} adds the undecided claim, which is only contingent, and ${rs(cl + capital)} adds the owner's capital, which is an internal liability.`,
  }));
}
QQ('m_contingent', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'Falgun Fabrics (imagined) has guaranteed a bank loan of ₹80,000 taken by a supplier. The firm will have to pay only if the supplier fails to repay. How should the guarantee be treated in the books of Falgun Fabrics?',
  opts: [
    'Not recorded as an actual liability; it is mentioned as a contingent liability',
    'Recorded as a current liability of ₹80,000 at once',
    'Recorded as a long-term liability of ₹80,000',
    'Added to the owner\'s capital',
  ],
  sol: 'The duty to pay arises only if an uncertain future event happens, so it is not an actual liability today and is only disclosed. Showing it as a current or long-term liability treats it as certain, and capital is unrelated to it.',
}));
QQ('ar_contingent', ar({
  t: 3, d: 3, c: 'understanding', verdict: 'both-true-explains',
  a: 'A contingent liability is not recorded as an actual liability in the books.',
  r: 'It depends on a future event that may or may not happen.',
  sol: 'Both statements are true. Because the payment depends on an uncertain event, there is no present obligation to record, so the reason explains the assertion.',
}));
QQ('tf_wasting', tf({
  t: 3, d: 2, c: 'recall', ans: true,
  stem: 'A coal mine owned by a firm is an example of a wasting asset.',
  sol: 'The mine is exhausted as coal is taken out of it, which is the mark of a wasting asset.',
}));
QQ('fb_fict', fb({
  t: 3, d: 2, c: 'recall',
  stem: 'Preliminary expenses which have not yet been written off are shown in the balance sheet as a ___ asset.',
  acc: [['fictitious']],
  sol: 'They have no resale value and are only a cost awaiting write-off, so they are called a fictitious asset.',
}));
{
  const a = [['Roasting machine', 210000], ['Land', 350000], ['Stock of coffee beans', 64000], ['Debtors', 38000], ['Cash in hand', 22000], ['Bank balance', 71000], ['Preliminary expenses', 10000]];
  const l = [['Bank loan repayable in five years', 200000], ['Creditors', 46000], ['Wages due', 8000]];
  const ta = tot(a), tl = tot(l), cap = ta - tl;
  same(ta, 765000, 'coffee assets');
  same(tl, 254000, 'coffee liabilities');
  same(cap, 511000, 'coffee capital');
  QQ('num_capital', numQ({
    t: 3, d: 3, c: 'application', value: cap, unit: '₹',
    stem: `Koraput Coffee Roasters (imagined) has these balances: ${a.map(([n, v]) => `${n.toLowerCase()} ${rs(v)}`).join(', ')}. It owes a bank loan repayable in five years of ${rs(200000)}, creditors ${rs(46000)} and wages ${rs(8000)}. A customer has also claimed ${rs(30000)} in a case that is pending. Find the owner's capital.`,
    sol: `The pending claim is only a contingent liability, so it is left out. Capital = assets − external liabilities = ${inr(ta)} − ${inr(tl)} = ${rs(cap)}.`,
  }));
}
{
  const cash = 14000, bank = 86000, sec = 30000, debt = 45000, stock = 60000, furn = 25000;
  const liquid = cash + bank + sec;
  same(liquid, 130000, 'liquid');
  QQ('num_liquid', numQ({
    t: 3, d: 3, c: 'application', value: liquid, unit: '₹',
    stem: `Dharwad Dhaba Supplies (imagined) has cash in hand ${rs(cash)}, a bank balance of ${rs(bank)}, marketable securities of ${rs(sec)}, debtors of ${rs(debt)}, stock of ${rs(stock)} and furniture of ${rs(furn)}. Take liquid assets to be cash, bank balances and marketable securities. Find its liquid assets.`,
    sol: `Debtors, stock and furniture are left out. Liquid assets = ${inr(cash)} + ${inr(bank)} + ${inr(sec)} = ${rs(liquid)}.`,
  }));
}
{
  const a0 = 540000, l0 = 210000, a1 = 620000, l1 = 245000;
  const c0 = a0 - l0, c1 = a1 - l1, rise = c1 - c0;
  same(rise, 45000, 'capital rise');
  QQ('num_capital_change', numQ({
    t: 3, d: 4, c: 'application', value: rise, unit: '₹',
    stem: `Total assets of Gadag Gunny Bags (imagined) were ${rs(a0)} and its external liabilities ${rs(l0)} at the start of the year. At the end, assets were ${rs(a1)} and external liabilities ${rs(l1)}. By how much did the owner's capital change during the year?`,
    sol: `Capital at the start = ${inr(a0)} − ${inr(l0)} = ${inr(c0)} and at the end = ${inr(a1)} − ${inr(l1)} = ${inr(c1)}, so the change = ${inr(c1)} − ${inr(c0)} = ${rs(rise)}.`,
  }));
}
QQ('s2_contingent', short({
  t: 3, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'Why is a contingent liability not shown as an actual liability? Give one example.',
  model: [
    '1. A contingent liability becomes payable only if an uncertain future event happens, so the firm has no present obligation to record, and it is only disclosed by a note.',
    '2. Example: a pending court claim for damages against the firm, or a guarantee given for the loan of another person.',
  ].join('\n'),
  sol: 'One mark for the reason and one for a correct example.',
  scheme: [['Reason: depends on an uncertain future event', 1], ['Example', 1]],
}));
QQ('s2_wasting_fict', short({
  t: 3, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish a **wasting asset** from a **fictitious asset**, with one example of each.',
  model: [
    '1. A **wasting asset** is a real asset that is used up as it is worked, for example a quarry or an oil well.',
    '2. A **fictitious asset** is not a real asset: it is an expense that has not yet been written off, for example preliminary expenses.',
  ].join('\n'),
  sol: 'A mark for each term with its example.',
  scheme: [['Wasting asset with example', 1], ['Fictitious asset with example', 1]],
}));
{
  const items = [
    ['A trademark registered by the firm', 'Fixed asset, intangible'],
    ['Cash in the till', 'Current asset (liquid)'],
    ['A loan from a bank, due in seven years', 'Long-term liability'],
    ['Goods lying unsold in the shop', 'Current asset'],
    ['Rent due to the landlord', 'Current liability'],
    ['Advertising cost not yet written off', 'Fictitious asset'],
  ];
  QQ('s3_classify', short({
    t: 3, d: 3, c: 'application', marks: 3, wl: S3,
    stem: `Classify each of these items of Jhunjhunu Toy Mart (imagined) as a fixed tangible asset, fixed intangible asset, current asset, fictitious asset, current liability or long-term liability. Choose the most exact class.\n\n${items.map((x, i) => `(${i + 1}) ${x[0]}`).join('\n')}`,
    model: mdTable(['Item', 'Class'], items.map((x, i) => [`(${i + 1})`, x[1]])),
    sol: 'Half a mark for each correct class, rounded up to a whole mark at the end; read the time of payment or the form of the asset first.',
    scheme: [['Items (1) and (2)', 1], ['Items (3) and (4)', 1], ['Items (5) and (6)', 1]],
  }));
}
QQ('s3_liab_types', short({
  t: 3, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain **internal**, **external** and **contingent** liabilities, with one example of each.',
  model: [
    '1. **Internal liability:** owed to the owner of the business, for example capital.',
    '2. **External liability:** owed to outsiders, either current (due within a year, for example creditors) or long-term (due later, for example a bank loan repayable in six years).',
    '3. **Contingent liability:** arises only if an uncertain event happens and is not recorded as a liability; for example, a pending case for damages.',
  ].join('\n'),
  sol: 'One mark for each kind, with its example.',
  scheme: [['Internal liability with example', 1], ['External liability with example', 1], ['Contingent liability with example', 1]],
}));
{
  const ta = 760000, tl = 295000, cap = ta - tl;
  same(cap, 465000, 'needle capital');
  QQ('s3_capital', short({
    t: 3, d: 3, c: 'application', marks: 3, wl: S3,
    stem: `Nakhatrana Needle Works (imagined) shows assets of ${rs(ta)} and liabilities to outsiders of ${rs(tl)}. A customer's claim of ${rs(40000)} is pending in court. Find the owner's capital and state why the claim is not deducted.`,
    model: [
      `Capital = total assets − external liabilities = ${rs(ta)} − ${rs(tl)} = ${rs(cap)}.`,
      'The claim is a contingent liability: it depends on the decision of the court, so it is not an actual liability and is not deducted.',
    ].join('\n'),
    sol: 'Method note: the contingent item stays outside the equation.',
    scheme: [['Capital equation stated', 1], ['Capital of ₹4,65,000 computed', 1], ['Reason for leaving out the claim', 1]],
  }));
}
{
  const a = [
    ['Factory building', 'Fixed, tangible', 640000], ['Goodwill', 'Fixed, intangible', 90000], ['Stock of cotton', 'Current', 120000],
    ['Debtors', 'Current', 74000], ['Cash in hand', 'Current, liquid', 11000], ['Bank balance', 'Current, liquid', 63000],
    ['Deferred advertising expenditure', 'Fictitious', 20000], ['Limestone pit', 'Wasting', 150000],
  ];
  const l = [['Loan from a finance company, due in nine years', 'Long-term', 300000], ['Creditors', 'Current', 85000], ['Salaries due', 'Current', 12000]];
  const ta = sum(a.map((x) => x[2])), tl = sum(l.map((x) => x[2])), cap = ta - tl;
  same(ta, 1168000, 'pit assets');
  same(tl, 397000, 'pit liabilities');
  same(cap, 771000, 'pit capital');
  QQ('l5_classify', long({
    t: 3, d: 4, c: 'application', marks: 5, wl: [40, 170],
    stem: `Ambala Cotton Mills (imagined) has the following balances: ${a.map(([n, , v]) => `${n.toLowerCase()} ${rs(v)}`).join('; ')}. It owes a loan from a finance company, due in nine years, of ${rs(300000)}, creditors of ${rs(85000)} and salaries due of ${rs(12000)}.\n\n(a) Name the class (fixed tangible, fixed intangible, current, liquid current, fictitious or wasting) of each of the eight assets. [4]\n\n(b) Find the owner's capital. [1]`,
    model: [
      mdTable(['Asset', 'Class', '₹'], a.map(([n, k, v]) => [n, k, inr(v)])),
      `**(b)** Total assets ${rs(ta)} less external liabilities (loan, creditors, salaries due) ${rs(tl)} gives capital ${rs(cap)}.`,
    ].join('\n\n'),
    sol: 'Two classes earn one mark in part (a); part (b) needs both totals.',
    scheme: [['(a) first two assets classified', 1], ['(a) next two assets classified', 1], ['(a) next two assets classified', 1], ['(a) last two assets classified', 1], ['(b) capital of ₹7,71,000', 1]],
  }));
}

// ================================================================ t04 Trade terms and stock
{
  const s1 = 40000, cashSale = 22000, s2 = 15000, paid = 25000, drill = 9000;
  const dr = s1 + s2 - paid;
  same(dr, 30000, 'valve debtors');
  QQ('m_trade_debtor', mcq({
    t: 4, d: 3, c: 'application',
    stem: `In a month, Hosur Valve Works (imagined) sold valves worth ${rs(s1)} on credit to Aman Dealers, ${rs(cashSale)} for cash and ${rs(s2)} on credit to Sethi Pumps. Aman Dealers paid ${rs(paid)}. The firm also bought a drill on credit for ${rs(drill)}. What is the total owed to the firm by its trade debtors at the end of the month?`,
    opts: [rs(dr), rs(dr + cashSale), rs(s1 + s2), rs(dr - drill)],
    sol: `Trade debtors owe for credit sales less what has been received: ${inr(s1)} + ${inr(s2)} − ${inr(paid)} = ${rs(dr)}. The option of ${rs(dr + cashSale)} includes the cash sale, which creates no debtor, ${rs(s1 + s2)} ignores the receipt, and ${rs(dr - drill)} wrongly sets off the drill, which is owed to its seller and has nothing to do with debtors.`,
  }));
}
QQ('m_wip', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'At a manufacturing firm, cloth that has been cut and partly stitched into shirts, but is not yet ready for sale, is counted as',
  opts: ['work in progress', 'raw material', 'finished goods', 'opening stock of the next year'],
  sol: 'Partly completed goods are work in progress. The cloth before cutting would be raw material, and finished goods are complete and packed for sale.',
}));
QQ('m_closing', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Goods worth ₹68,000 remain unsold in a shop on the last day of the year. In the next year\'s books this amount will be the',
  opts: ['opening stock', 'closing stock', 'purchases', 'work in progress'],
  sol: 'Unsold goods at the end of the year are the closing stock of that year, and the same amount is carried forward as the opening stock of the next year. They are not new purchases and not unfinished goods.',
}));
QQ('m_trade_creditor', mcq({
  t: 4, d: 4, c: 'analysis',
  stem: 'Karimnagar Steel Furniture (imagined) owes money to four parties. Which one is NOT a trade creditor?',
  opts: [
    'A machinery dealer from whom a lathe was bought on credit',
    'A steel supplier from whom sheets for resale were bought on credit',
    'A hardware merchant who supplied bolts for manufacture on credit',
    'A paint wholesaler from whom paint for the furniture was bought on credit',
  ],
  sol: 'Trade creditors supply the goods in which the firm deals or the materials it uses in making them. A lathe is a fixed asset, so its supplier is a creditor for an asset and not a trade creditor.',
}));
QQ('ar_wip', ar({
  t: 4, d: 4, c: 'analysis', verdict: 'both-false',
  a: 'Work in progress is a kind of finished goods.',
  r: 'Work in progress consists of goods which are complete and ready to be sold.',
  sol: 'Both are false. Work in progress is partly made goods that are not yet ready for sale, which is the very opposite of finished goods.',
}));
QQ('tf_creditor', tf({
  t: 4, d: 3, c: 'analysis', ans: false,
  stem: 'A supplier who delivers a delivery van to a trader on credit is a trade creditor of the trader.',
  sol: 'The van is a fixed asset and not goods for trading, so the supplier is a creditor for an asset and not a trade creditor.',
}));
QQ('fb_stock', fb({
  t: 4, d: 2, c: 'recall',
  stem: 'The unsold stock on the last day of one year becomes the ___ stock of the following year.',
  acc: [['opening']],
  sol: 'The closing stock of one period is carried forward as the opening stock of the next.',
}));
{
  const open = 52000, pur = 348000, pr = 18000, cogs = 325000, close = open + pur - pr - cogs;
  same(close, 57000, 'closing stock flow');
  QQ('num_closing_flow', numQ({
    t: 4, d: 3, c: 'application', value: close, unit: '₹',
    stem: `Hampi Stone Craft (imagined) began the year with stock of ${rs(open)}. It bought goods worth ${rs(pur)} and sent back goods worth ${rs(pr)} to its suppliers. The cost of the goods it sold was ${rs(cogs)}. Find the closing stock.`,
    sol: `Closing stock = opening stock + purchases − purchases return − cost of goods sold = ${inr(open)} + ${inr(pur)} − ${inr(pr)} − ${inr(cogs)} = ${rs(close)}.`,
  }));
}
{
  const o = 340, b = 1900, s = 2060, c = o + b - s, rate = 250, v = c * rate;
  same(c, 180, 'tins');
  same(v, 45000, 'tin value');
  QQ('num_closing_units', numQ({
    t: 4, d: 3, c: 'application', value: v, unit: '₹',
    stem: `Kollur Coconut Oil (imagined) had ${o} tins in stock at the beginning of the month, bought ${inr(b)} tins and sold ${inr(s)} tins. Each tin costs ${rs(rate)}. Find the value of the closing stock at cost.`,
    sol: `Closing stock in tins = ${o} + ${inr(b)} − ${inr(s)} = ${c}; value = ${c} × ${rate} = ${rs(v)}.`,
  }));
}
{
  const sold = 95000, ret = 5000, rec = 60000, bal = sold - ret - rec;
  same(bal, 30000, 'debtor');
  QQ('num_debtor', numQ({
    t: 4, d: 2, c: 'application', value: bal, unit: '₹',
    stem: `Leh Woollens (imagined) sold goods worth ${rs(sold)} on credit to Lalit Traders. Goods of ${rs(ret)} were returned by Lalit Traders, who then paid ${rs(rec)}. How much does Lalit Traders still owe?`,
    sol: `Balance due = ${inr(sold)} − ${inr(ret)} − ${inr(rec)} = ${rs(bal)}.`,
  }));
}
{
  const cash = 125000, credit = 205000, ret = 14500, net = cash + credit - ret;
  same(net, 315500, 'net purchases');
  QQ('num_net_purchases', numQ({
    t: 4, d: 2, c: 'application', value: net, unit: '₹',
    stem: `Mandla Mat Mills (imagined) bought goods for cash worth ${rs(cash)} and on credit worth ${rs(credit)} during the year, and sent goods worth ${rs(ret)} back to its suppliers. Find its net purchases.`,
    sol: `Purchases include both cash and credit buying; the returns are deducted. Net purchases = ${inr(cash)} + ${inr(credit)} − ${inr(ret)} = ${rs(net)}.`,
  }));
}
{
  const cash = 210000, credit = 340000, ret = 18000, net = cash + credit - ret;
  same(net, 532000, 'net sales');
  QQ('num_net_sales', numQ({
    t: 4, d: 2, c: 'application', value: net, unit: '₹',
    stem: `Ladakh Apricot Traders (imagined) sold dried apricots for cash worth ${rs(cash)} and on credit worth ${rs(credit)}. Customers returned goods worth ${rs(ret)}. Find the net sales for the year.`,
    sol: `Both kinds of sale count, and the returns are deducted. Net sales = ${inr(cash)} + ${inr(credit)} − ${inr(ret)} = ${rs(net)}.`,
  }));
}
QQ('s2_dc', short({
  t: 4, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish a **trade debtor** from a **trade creditor**.',
  model: [
    '1. A **trade debtor** is a person who owes money to the firm for goods bought from it on credit; to the firm it is an asset.',
    '2. A **trade creditor** is a person to whom the firm owes money for goods bought from him on credit; to the firm it is a liability.',
  ].join('\n'),
  sol: 'A mark for each term with the direction of the debt.',
  scheme: [['Trade debtor', 1], ['Trade creditor', 1]],
}));
QQ('s3_stock_kinds', short({
  t: 4, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Dhule Spice Mill (imagined) grinds whole spices and sells packets. Name the kind of stock, with a reason, for (a) whole chillies in the godown, (b) chillies partly ground and not yet packed, (c) sealed packets waiting for the van.',
  model: [
    '**(a)** Raw material, because the chillies are yet to enter production.',
    '**(b)** Work in progress, because processing has begun but the goods are not complete.',
    '**(c)** Finished goods, because they are complete and ready for sale.',
  ].join('\n'),
  sol: 'One mark each for the kind and reason.',
  scheme: [['(a) raw material with reason', 1], ['(b) work in progress with reason', 1], ['(c) finished goods with reason', 1]],
}));
{
  QQ('s3_trade_cases', short({
    t: 4, d: 3, c: 'application', marks: 3, wl: S3,
    stem: `Tinsukia Tea Packers (imagined) sold tea worth ${rs(90000)} on credit to Naresh Stores and bought a packing machine worth ${rs(24000)} on credit from Orient Machines. It also bought tea worth ${rs(150000)} on credit from Sonari Estates. Naresh Stores has paid ${rs(35000)}; ${rs(100000)} has been paid to Sonari Estates. Name the trade debtor and the trade creditor, and the balance of each.`,
    model: [
      `**Trade debtor:** Naresh Stores owes ${rs(90000)} − ${rs(35000)} = ${rs(90000 - 35000)}.`,
      `**Trade creditor:** Sonari Estates is owed ${rs(150000)} − ${rs(100000)} = ${rs(150000 - 100000)}.`,
      'Orient Machines is owed for a machine, which is an asset, so it is not a trade creditor.',
    ].join('\n'),
    sol: 'The machine is a fixed asset and stays out of the trade accounts.',
    scheme: [['Trade debtor and balance', 1], ['Trade creditor and balance', 1], ['Orient Machines identified as not a trade creditor', 1]],
  }));
  same(90000 - 35000, 55000, 'debtor');
  same(150000 - 100000, 50000, 'creditor');
}
{
  const rows = [['Raw material', 160000, 175000], ['Work in progress', 24000, 31000], ['Finished goods', 96000, 82000]];
  const o = tot(rows.map((r) => [r[0], r[1]])), c = tot(rows.map((r) => [r[0], r[2]]));
  same(o, 280000, 'bike opening');
  same(c, 288000, 'bike closing');
  QQ('l5_trade', long({
    t: 4, d: 4, c: 'application', marks: 5, wl: [40, 170],
    stem: `Rudrapur Cycle Works (imagined) shows these stocks: ${rows.map(([n, a, b]) => `${n.toLowerCase()} ${rs(a)} at the start and ${rs(b)} at the end`).join('; ')}. It sold goods on credit to Gopal Cycles for ${rs(70000)}, which Gopal paid in part: ${rs(45000)}.\n\n(a) Find the total opening stock and the total closing stock. [2]\n\n(b) State what the closing stock becomes in the next year. [1]\n\n(c) Find the balance of Gopal Cycles and name the account it is called. [2]`,
    model: [
      mdTable(['Stock', 'Start (₹)', 'End (₹)'], [...rows.map(([n, a, b]) => [n, inr(a), inr(b)]), ['Total', inr(o), inr(c)]]),
      '**(a)** Opening stock is ' + rs(o) + ' and closing stock is ' + rs(c) + '.',
      '**(b)** The closing stock is carried forward as the opening stock of the next year.',
      `**(c)** Gopal Cycles owes ${rs(70000)} − ${rs(45000)} = ${rs(25000)}, so it is a trade debtor.`,
    ].join('\n\n'),
    sol: 'Add the three kinds of stock separately for each date.',
    scheme: [['(a) total opening stock', 1], ['(a) total closing stock', 1], ['(b) becomes opening stock of the next year', 1], ['(c) balance of ₹25,000', 1], ['(c) named a trade debtor', 1]],
  }));
  same(70000 - 45000, 25000, 'gopal');
}

// ================================================================ t05 Stakeholders and branches
QQ('m_internal_user', mcq({
  t: 5, d: 1, c: 'recall',
  stem: 'Which one of these users of accounting information is an internal user?',
  opts: ['The manager of the firm', 'A bank that has given the firm a loan', 'The income-tax department', 'A supplier who sells to the firm on credit'],
  sol: 'Owners, managers and employees work inside the business. The bank, the tax department and the supplier are outsiders.',
}));
QQ('m_user_need', mcq({
  t: 5, d: 2, c: 'understanding',
  stem: 'A flour mill (imagined) is asked by a new customer for goods on sixty days of credit. Before agreeing, the mill studies the customer\'s accounts. What is the mill mainly trying to learn?',
  opts: ['Whether the customer can pay its dues on time', 'How much tax the customer should pay', 'What bonus the customer\'s staff should receive', 'Whether the customer\'s prices are fair for consumers'],
  sol: 'A supplier giving credit wants to be sure of payment. Tax, bonus and fair prices are the concerns of the tax authority, employees and consumers.',
}));
QQ('m_branch_cost', mcq({
  t: 5, d: 2, c: 'understanding',
  stem: 'Siliguri Bamboo Furniture (imagined) wants to find the exact cost of making one chair of each design in order to fix selling prices. Which branch of accounting helps?',
  opts: ['Cost accounting', 'Financial accounting', 'Book-keeping', 'Auditing'],
  sol: 'Cost accounting finds and analyses the cost of products and services. Financial accounting reports on the whole business, book-keeping only records, and auditing is an independent examination.',
}));
QQ('m_fin_vs_cost', mcq({
  t: 5, d: 4, c: 'analysis',
  stem: 'Which statement correctly separates financial accounting from management accounting?',
  opts: [
    'Financial accounting reports on the whole business, mainly to outsiders, in a standard form; management accounting serves managers and has no fixed form',
    'Financial accounting is meant only for managers, and management accounting only for tax officers',
    'Management accounting is compulsory by law, but financial accounting is not',
    'Financial accounting deals only with the future, and management accounting only with the past',
  ],
  sol: 'Financial accounting reports past results of the whole firm to owners and outsiders in an accepted form, whereas management accounting is designed for managers and may look to the future. The other statements swap the users, the legal position or the time reference.',
}));
QQ('match_users', match({
  t: 5, d: 2, c: 'understanding', marks: 2,
  stem: 'Match each user of the accounts of a milk cooperative (imagined) with what the user mainly wants to learn.',
  pairs: [
    ['A bank considering a loan', 'Whether interest and the loan can be repaid'],
    ['The tax department', 'The profit on which tax is payable'],
    ['The staff of the dairy', 'Whether wages and bonus can be paid and jobs are safe'],
    ['A researcher', 'Facts and trends of the dairy trade for a study'],
  ],
  sol: 'Each user asks the question that fits its own decision.',
}));
QQ('ar_users', ar({
  t: 5, d: 3, c: 'understanding', verdict: 'both-true-not-explains',
  a: 'The income-tax authorities are external users of the accounts of a firm.',
  r: 'Government departments want the profit figure of a firm in order to assess the tax due.',
  sol: 'Both statements are true. The reason describes what tax authorities need, but they are external because they stand outside the business, which the reason does not explain.',
}));
QQ('fb_mgmt', fb({
  t: 5, d: 2, c: 'recall',
  stem: 'The branch of accounting that gives managers information for planning, control and decision making is called ___ accounting.',
  acc: [['management']],
  sol: 'Management accounting is meant for the managers inside the firm.',
}));
QQ('s2_users_ie', short({
  t: 5, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish **internal users** from **external users** of accounting information, with two examples of each.',
  model: [
    '1. **Internal users** own, manage or work in the business, for example the owners and the managers.',
    '2. **External users** are outside the business and deal with it, for example banks and tax authorities.',
  ].join('\n'),
  sol: 'One mark for each group with two correct examples.',
  scheme: [['Internal users with two examples', 1], ['External users with two examples', 1]],
}));
QQ('s2_cost_mgmt', short({
  t: 5, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'State **two** differences between cost accounting and management accounting.',
  model: [
    '1. **Scope:** cost accounting is concerned with the cost of products, jobs and services; management accounting uses cost and other facts across the whole business.',
    '2. **Purpose:** cost accounting helps to control and reduce costs; management accounting helps managers to plan, control and take decisions.',
  ].join('\n'),
  sol: 'Any two correct differences earn a mark each.',
  scheme: [['First difference', 1], ['Second difference', 1]],
}));
QQ('s3_user_needs', short({
  t: 5, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Arunachal Orange Growers (imagined) is applying for a bank loan to build a juice plant, offers a bonus to its staff and files a tax return. Name the user in each situation and say what that user wants from the accounts.',
  model: [
    '1. **The bank** (external): the ability of the firm to pay interest and repay the loan.',
    '2. **The staff** (internal): whether the firm can pay the bonus and keep them in employment.',
    '3. **The tax authority** (external): the profit of the year, on which the tax is assessed.',
  ].join('\n'),
  sol: 'Each user and its need earns one mark.',
  scheme: [['Bank and its need', 1], ['Employees and their need', 1], ['Tax authority and its need', 1]],
}));
QQ('s3_branches', short({
  t: 5, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Compare financial, cost and management accounting by their main purpose.',
  model: [
    '1. **Financial accounting:** records transactions of the whole business and reports profit or loss and financial position, chiefly for owners and outsiders.',
    '2. **Cost accounting:** finds and analyses the cost of products, jobs or services so that costs can be controlled.',
    '3. **Management accounting:** presents information, in any useful form, to managers for planning, control and decisions.',
  ].join('\n'),
  sol: 'One mark for the purpose of each branch.',
  scheme: [['Financial accounting', 1], ['Cost accounting', 1], ['Management accounting', 1]],
}));
QQ('l5_users', long({
  t: 5, d: 3, c: 'application', marks: 5, wl: L5,
  stem: 'Tawang Yak Wool Weavers (imagined) is owned by Dorjee and run by a manager, with twelve employees. It buys wool on credit from herders, has a bank loan and sells to a retail chain.\n\nName **five** users of its accounts and state, in one line each, what each user wants to know from them.',
  model: [
    '1. **Owner (Dorjee), internal:** the profit earned and whether his capital is safe.',
    '2. **Manager, internal:** detailed figures about costs and sales to plan and control the work.',
    '3. **Employees, internal:** whether wages and bonus can be paid and their jobs are secure.',
    '4. **Bank, external:** whether interest can be paid and the loan repaid on time.',
    '5. **Wool suppliers on credit, external:** whether the firm can pay for the wool it has bought.',
    '6. **Tax authority, external:** the profit, so that tax can be fixed.',
  ].join('\n'),
  sol: 'Any five users, each linked to a distinct need, one mark each; naming a user without its need earns nothing.',
  scheme: [['First user with its need', 1], ['Second user with its need', 1], ['Third user with its need', 1], ['Fourth user with its need', 1], ['Fifth user with its need', 1]],
}));
QQ('l5_branches', long({
  t: 5, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: 'Cuttack Cycle Components (imagined) makes bicycle parts. Its owner wants its yearly profit and position reported to the bank, the foreman wants to know why the cost of a hub rose, and the director wants help in deciding whether to add a second shift.\n\n(a) Name the branch of accounting that serves each of the three needs. [3]\n\n(b) Distinguish financial accounting from cost accounting on two points. [2]',
  model: [
    '**(a)** The report to the bank is financial accounting; the rise in the cost of a hub is cost accounting; the decision on the second shift is management accounting.',
    '**(b)** 1. Financial accounting reports on the whole business for outsiders and owners; cost accounting concentrates on the cost of products and services.',
    '2. Financial accounting follows accepted principles and gives results of a period; cost accounting gives detailed information to managers during the work, for control.',
  ].join('\n'),
  sol: 'Match each need to the work done before comparing the branches.',
  scheme: [['(a) bank report: financial accounting', 1], ['(a) cost of a hub: cost accounting', 1], ['(a) second shift: management accounting', 1], ['(b) first point of difference', 1], ['(b) second point of difference', 1]],
}));
