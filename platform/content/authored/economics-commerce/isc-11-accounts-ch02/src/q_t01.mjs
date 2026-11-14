// t01: GAAP I (going concern, entity, money measurement, period, historical cost, dual aspect, accrual). Every firm
// and person is imagined; every derived amount is computed with acc.mjs through fig.mjs and asserted.
import { mcq, ar, tf, fb, short, long } from './lib.mjs';
import { same, sum, inr, rs, mdTable, equation, HC, EQ, EQF, EQ_ASSETS } from './fig.mjs';
import { QQ, numQ } from './qq.mjs';

// ================================================================ multiple choice
QQ('m_gaap', mcq({
  t: 1, d: 1, c: 'understanding',
  stem: 'A flour mill and a paper shop, both imagined, prepare their accounts under the same generally accepted accounting principles. A lender who reads both sets of statements benefits mainly because',
  opts: ['the statements follow uniform rules and can be compared and relied on', 'both firms are made to report the same profit', 'neither firm has to maintain books of account any longer', 'repayment of the lender\'s loan becomes certain'],
  sol: 'The principles exist to bring uniformity to recording and reporting. They do not equalise profits, replace books of account or guarantee that a loan is repaid.',
}));
QQ('m_entity', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Rukmini Das owns Das Weaving Centre, an imagined unit. On 12 August 2026 she bought a wristwatch of ₹7,500 for herself and paid for it from the centre\'s bank account. By the business entity concept this payment is',
  opts: ['her drawings, reducing the capital and the bank balance of the centre', 'an expense of the centre for the month', 'an asset of the centre like its looms', 'ignored because the amount is small'],
  sol: 'The centre and its owner are separate, so a payment for the owner\'s own use is drawings: bank and capital both fall. The watch serves no business purpose, so it is neither an expense nor an asset, and the entity concept does not depend on the size of the amount.',
}));
QQ('m_money', mcq({
  t: 1, d: 1, c: 'understanding',
  stem: 'Ghatsila Clay Studio, an imagined pottery unit, lists several happenings of the year. Under the money measurement concept, which one is recorded in its books?',
  opts: ['Purchase of a kiln for ₹68,000', 'The fame of its master potter for glazed ware', 'The creativity of its design team', 'The cheerful mood of the packing staff'],
  sol: 'Only an event that can be stated in money is recorded, and the kiln purchase has a price. The potter\'s fame, the designers\' creativity and the staff mood have no money value in the books.',
}));
QQ('m_going', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Churu Tiffin Service, an imagined firm, owns an oven bought for ₹1,20,000 with an expected life of eight years. Its accountant writes the oven off gradually and does not show it at the price a hurried sale would fetch. The concept followed is',
  opts: ['going concern', 'accounting period', 'verifiable objectivity', 'full disclosure'],
  sol: 'The firm is assumed to carry on, so the oven is used up over its life and written off by depreciation rather than valued at a forced-sale price. The other concepts concern the length of the reporting interval, proof for entries and the reporting of material facts.',
}));
QQ('m_hcost', mcq({
  t: 1, d: 2, c: 'application',
  stem: `Kalahandi Millet Mart, an imagined firm, bought a godown for ${rs(HC.cost)} some years ago. A broker now says that the godown would sell for ${rs(HC.market)}. Under the historical cost concept the balance sheet shows the godown at`,
  opts: [rs(HC.cost), rs(HC.market), rs((HC.cost + HC.market) / 2), rs(HC.gap)],
  sol: `The price actually paid, ${rs(HC.cost)}, is the recorded value. The broker's figure of ${rs(HC.market)} is an opinion that changes, ${rs((HC.cost + HC.market) / 2)} is a made-up average, and ${rs(HC.gap)} is merely the unrecorded rise.`,
}));
QQ('m_dual', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'On 3 May 2026 an imagined trading firm collects ₹12,000 in cash from a customer who owed it that amount. By the dual aspect concept, the effect on the accounting equation is',
  opts: ['one asset rises and another asset falls by ₹12,000, so total assets are unchanged', 'assets and liabilities both rise by ₹12,000', 'assets rise by ₹12,000 and capital rises by ₹12,000', 'a liability falls by ₹12,000 and an asset falls by ₹12,000'],
  sol: 'Cash (an asset) increases and the debtor balance (another asset) decreases by the same amount. Liabilities and capital are not touched, which rules out the options that bring in a liability or capital.',
}));
QQ('m_accrual', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Mokokchung Cane Furniture, an imagined firm, receives the electricity bill for March 2027 on 8 April 2027 and pays it on 20 April 2027. Under the accrual concept the expense belongs to',
  opts: ['March 2027, the month in which the electricity was used', 'April 2027, the month in which the bill was received', 'April 2027, the month in which the bill was paid', 'neither month, until the next balance sheet date'],
  sol: 'On the accrual concept an expense is recorded when it is incurred, not when the bill arrives or cash goes out, so the month of use carries it. The date of the bill and the date of payment do not decide the period.',
}));

// ================================================================ assertion-reason
QQ('ar_dual', ar({
  t: 1, d: 2, c: 'understanding', verdict: 'both-true-explains',
  a: 'After every transaction of an imagined firm, the total of its assets equals the total of its liabilities and capital.',
  r: 'Every transaction has two aspects of equal value, so each change on one side of the equation is matched by an equal change on the other.',
  sol: 'Both are true. The two equal aspects of a transaction are exactly why the equation stays in balance, so the reason explains the assertion.',
}));

// ================================================================ true-false, fill-blank
QQ('tf_going', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'Ashoka Pens, an imagined firm, has resolved to close down at the end of the month. It should still value its machinery as if it will be used for many more years under the going concern concept.',
  sol: 'The going concern concept holds only while continuity is assumed. Once closure is decided, the assumption fails and machinery is valued at what it will fetch on disposal.',
}));
QQ('tf_cost', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'Vanshika Traders, an imagined firm, bought land for ₹5,00,000 in 2019. Because the same land now sells for ₹9,00,000, the historical cost concept requires the land to be raised in the books to ₹9,00,000.',
  sol: 'An asset stays at the price actually paid. A rise in market value is not recorded until a transaction takes place.',
}));
QQ('fb_entity', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'The concept that treats a business as a unit separate from its owner is the ______ concept, and cash taken by the owner for personal use is called ______.',
  acc: [['business entity', 'accounting entity', 'entity', 'separate entity'], ['drawings']],
  sol: 'The business entity concept separates the business from the owner, and personal withdrawals are drawings.',
}));

// ================================================================ numerical
const NE = { cash: 110000, stock: 90000, debtors: 70000, furn: 60000, cred: 45000, loan: 55000 };
NE.assets = sum([NE.cash, NE.stock, NE.debtors, NE.furn]);
NE.out = NE.cred + NE.loan;
NE.cap = same(NE.assets - NE.out, 230000, 'n_capital');
QQ('n_capital', numQ({
  t: 1, d: 2, c: 'application', value: NE.cap,
  stem: `At the year end an imagined firm, Pathar Cutlery, has cash ${rs(NE.cash)}, stock ${rs(NE.stock)}, debtors ${rs(NE.debtors)} and furniture ${rs(NE.furn)}. It owes creditors ${rs(NE.cred)} and a bank loan of ${rs(NE.loan)}. Using the accounting equation, find the owner's capital (in ₹).`,
  sol: `Assets = ${inr(NE.cash)} + ${inr(NE.stock)} + ${inr(NE.debtors)} + ${inr(NE.furn)} = ${inr(NE.assets)}. Capital = assets − outside liabilities = ${inr(NE.assets)} − ${inr(NE.out)} = ${rs(NE.cap)}.`,
}));
const NS = { cost: 34000, price: 46500 };
NS.gain = same(NS.price - NS.cost, 12500, 'n_sale_gain');
QQ('n_sale_gain', numQ({
  t: 1, d: 3, c: 'application', value: NS.gain,
  stem: `Nabarang Tools, an imagined firm, sells on credit goods that cost ${rs(NS.cost)} for ${rs(NS.price)}. Treating the sale through the accounting equation, by how much does the owner's capital increase (in ₹)?`,
  sol: `Debtors rise by ${inr(NS.price)} and stock falls by ${inr(NS.cost)}. The two sides must stay equal, so capital rises by ${inr(NS.price)} − ${inr(NS.cost)} = ${rs(NS.gain)}.`,
}));

// ================================================================ short answer, 2 marks
QQ('s2_gaap_meaning', short({
  t: 1, d: 1, c: 'recall', marks: 2,
  stem: 'What is meant by GAAP? Why are the accounts of different firms prepared according to them?',
  model: '**GAAP** (generally accepted accounting principles) are the rules, concepts and conventions that accountants follow when they record transactions and prepare financial statements.\n\nThey are followed so that accounts are uniform and the statements of different firms and years can be compared and relied on.',
  sol: 'Meaning, then the purpose of uniformity.',
  scheme: [['Meaning of GAAP', 1], ['Purpose: uniformity and comparability', 1]],
}));
QQ('s2_entity_fee', short({
  t: 1, d: 2, c: 'application', marks: 2,
  stem: 'Ramesh Verma pays his son\'s school fee of ₹6,000 from the cash box of Verma Carpets, an imagined firm. How does the business entity concept treat the payment? State its effect on cash and on capital.',
  model: 'The firm and its owner are separate. The fee is a personal payment, so it is **drawings**, not an expense of the firm.\n\nCash falls by ₹6,000 and capital falls by ₹6,000.',
  sol: 'Drawings, with both effects.',
  scheme: [['Treated as drawings, not as a business expense', 1], ['Cash and capital each reduced by ₹6,000', 1]],
}));
QQ('s2_going', short({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Explain the going concern concept with one effect it has on the way a firm shows its machinery.',
  model: 'The **going concern** concept assumes that the firm will carry on its activities for the foreseeable future and will not be closed or sharply reduced.\n\nAs a result machinery is shown at cost less depreciation and is written off over its useful life, not valued at the price a forced sale would bring.',
  sol: 'The assumption and one effect.',
  scheme: [['Assumption of continuity', 1], ['Effect on machinery: cost less depreciation over its life', 1]],
}));

// ================================================================ short answer, 3 marks
QQ('s3_dual', short({
  t: 1, d: 3, c: 'application', marks: 3,
  stem: 'Explain the dual aspect concept. Show how it affects the assets, liabilities and capital of an imagined firm when it (i) buys a typewriter on credit for ₹14,000, and (ii) repays ₹5,000 of a bank loan in cash.',
  model: 'The **dual aspect** concept: every transaction has two aspects of equal value, so Assets = Liabilities + Capital after every transaction.\n\n(i) Typewriter on credit: an asset (typewriter) rises by ₹14,000 and a liability (creditors) rises by ₹14,000.\n\n(ii) Loan repaid in cash: an asset (cash) falls by ₹5,000 and a liability (bank loan) falls by ₹5,000.',
  sol: 'The concept, then one equal pair of effects for each transaction.',
  scheme: [['Concept with the equation', 1], ['Credit purchase: asset and liability both up by ₹14,000', 1], ['Loan repayment: asset and liability both down by ₹5,000', 1]],
}));
QQ('s3_hcost', short({
  t: 1, d: 2, c: 'understanding', marks: 3,
  stem: 'State the historical cost concept. Give one advantage and one limitation of recording assets at cost.',
  model: 'Under the **historical cost** concept an asset is recorded at the price actually paid to acquire it, and later changes in its market value are not recorded.\n\n**Advantage:** the figure can be verified from the bill and the payment, so it is objective and free from personal opinion.\n\n**Limitation:** in times of rising prices the balance sheet shows values below current worth, so the position of the firm may look weaker than it is.',
  sol: 'Statement, one advantage, one limitation.',
  scheme: [['Statement of the concept', 1], ['One advantage (objective and verifiable)', 1], ['One limitation (current worth not shown)', 1]],
}));
QQ('s3_accrual', short({
  t: 1, d: 3, c: 'application', marks: 3,
  stem: 'State the accrual concept. For an imagined firm with the year ending on 31 March 2027, say in which year each is recorded: (i) goods sold on credit on 27 March 2027, cash received on 14 April 2027; (ii) rent for March 2027 paid on 5 April 2027.',
  model: 'The **accrual** concept: revenues are recorded when they are earned and expenses when they are incurred, whether or not cash is received or paid at that time.\n\n(i) The sale is made on 27 March 2027, so the revenue belongs to the year ending 31 March 2027. The amount is a debtor at the year end.\n\n(ii) The rent is for March 2027, so it is an expense of the year ending 31 March 2027, and the unpaid amount is outstanding rent.',
  sol: 'Statement, then year of recording for each case.',
  scheme: [['Statement of the accrual concept', 1], ['Sale recorded in the year ended 31 March 2027', 1], ['Rent of March recorded in the same year as outstanding', 1]],
}));

// ================================================================ long answer, 5 marks
const LE = EQ;
QQ('l5_equation', long({
  t: 1, d: 4, c: 'application', marks: 5,
  stem: `Lunglei Bamboo Works, an imagined firm, began with cash of ${rs(200000)} brought in by the owner. It then (a) bought machinery for cash ${rs(60000)}, (b) bought goods on credit ${rs(45000)}, (c) took a bank loan in cash ${rs(30000)}, (d) paid ${rs(15000)} to a creditor, (e) the owner withdrew ${rs(8000)} cash for personal use, and (f) goods costing ${rs(20000)} were sold for cash ${rs(26000)}. Show the effect of each transaction on the accounting equation in tabular form and state the total of assets and the capital at the end.`,
  model: `${mdTable(LE.headers, LE.rows)}\n\nAfter every transaction, assets equal outside liabilities plus capital.\n\nTotal assets = ${inr(EQF.assets.Cash)} + ${inr(EQF.assets.Machinery)} + ${inr(EQF.assets.Stock)} = **${rs(EQ_ASSETS)}**.\n\nOutside liabilities = ${inr(EQF.liabilities.Creditors)} + ${inr(EQF.liabilities['Bank loan'])} = ${inr(sum(Object.values(EQF.liabilities)))}; capital = **${rs(EQF.capital)}**, and ${inr(sum(Object.values(EQF.liabilities)))} + ${inr(EQF.capital)} = ${inr(EQ_ASSETS)}.`,
  sol: 'Run the equation transaction by transaction, check the balance each time, then state the totals.',
  scheme: [['Opening cash and capital; purchase of machinery and goods on credit', 1], ['Loan and payment to the creditor', 1], ['Drawings reducing cash and capital', 1], ['Sale: cash up, stock down, capital up by the gain', 1], ['Closing total of assets and capital, equation agreeing', 1]],
}));
void equation;
