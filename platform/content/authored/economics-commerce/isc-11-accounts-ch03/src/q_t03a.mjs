// t03 (objective items): the journal, journal entries and the opening entry. Imagined firms only; amounts computed.
import { mcq, ar, tf, fb } from './lib.mjs';
import { same, inr, rs } from './fig.mjs';
import { QQ, numQ } from './qq.mjs';

// ================================================================ multiple choice
QQ('m_j_meaning', mcq({
  t: 3, d: 1, c: 'understanding',
  stem: 'The accountant of Raipur Drum Works, an imagined firm, calls the journal the book of original entry. The reason is that',
  opts: ['each transaction is first recorded in it, in date order, before it is posted to any ledger account', 'it records only the cash transactions of the firm', 'it shows the final balance of every account at the end of the year', 'it is written only once, at the end of the year, from the ledger'],
  sol: 'Every transaction goes into the journal first, with its date, debit, credit and narration, and only later to the ledger. The journal is not limited to cash, it does not hold balances, and it is written day by day.',
}));
QQ('m_disc_check', mcq({
  t: 3, d: 2, c: 'application',
  stem: `Hyderabad Cutlery Mart, an imagined firm, receives ${rs(9400)} in cash from a debtor in full settlement of his account of ${rs(10000)}. Besides debiting Cash A/c and crediting the debtor, the entry debits`,
  opts: [`Discount Allowed A/c with ${rs(600)}`, `Discount Received A/c with ${rs(600)}`, `Bad Debts A/c with ${rs(600)}`, `Sales A/c with ${rs(600)}`],
  sol: `The debtor's account is cleared by ${inr(10000)}, of which ${inr(9400)} is cash, so ${inr(10000)} − ${inr(9400)} = ${inr(600)} is given up by the firm: a loss, called discount allowed. Discount received belongs to payments made to suppliers, the debtor has not defaulted, and no sale is made.`,
}));
QQ('m_purch_return', mcq({
  t: 3, d: 2, c: 'application',
  stem: `Jabalpur Tarpaulins, an imagined firm, returns defective goods worth ${rs(7500)} to its supplier Hari Prasad, to whom the price is still unpaid. The journal entry is`,
  opts: [`Hari Prasad A/c Dr ${inr(7500)}; To Purchases Return A/c ${inr(7500)}`, `Purchases Return A/c Dr ${inr(7500)}; To Hari Prasad A/c ${inr(7500)}`, `Hari Prasad A/c Dr ${inr(7500)}; To Sales Return A/c ${inr(7500)}`, `Sales Return A/c Dr ${inr(7500)}; To Hari Prasad A/c ${inr(7500)}`],
  sol: 'The firm owes the supplier less, so the supplier is debited, and the return of purchases is credited to the Purchases Return account. The second entry has the sides reversed, and the Sales Return account is used for goods coming back from customers.',
}));
QQ('m_drawings_goods', mcq({
  t: 3, d: 2, c: 'application',
  stem: `The proprietor of Nashik Grape Traders, an imagined firm, takes goods costing ${rs(4800)} from the shop for his own use. The journal entry is`,
  opts: ['Drawings A/c Dr; To Purchases A/c', 'Drawings A/c Dr; To Sales A/c', 'Purchases A/c Dr; To Drawings A/c', 'Cash A/c Dr; To Drawings A/c'],
  sol: 'Drawings are debited and the goods that leave the stock are credited at cost, in the Purchases account. The goods are not sold, so the Sales account is not used, and no cash comes in.',
}));
QQ('m_bad_debt', mcq({
  t: 3, d: 2, c: 'application',
  stem: `A debtor of Jalna Utensils, an imagined firm, who owed ${rs(6500)}, is declared insolvent and nothing can be recovered. The journal entry is`,
  opts: [`Bad Debts A/c Dr ${inr(6500)}; To the debtor's account ${inr(6500)}`, `The debtor's account Dr ${inr(6500)}; To Bad Debts A/c ${inr(6500)}`, `Bad Debts A/c Dr ${inr(6500)}; To Cash A/c ${inr(6500)}`, `Discount Allowed A/c Dr ${inr(6500)}; To the debtor's account ${inr(6500)}`],
  sol: 'The debtor\'s balance is an asset that is lost, so the debtor is credited and the loss is debited to Bad Debts. The reverse pair raises the debtor, no cash moves, and the debt was not settled at a concession, so discount allowed does not apply.',
}));
{
  const assets = 30000 + 90000 + 180000;
  const liab = 70000;
  const cap = same(assets - liab, 230000, 'Tumkur capital');
  QQ('m_open_cap', mcq({
    t: 3, d: 3, c: 'application',
    stem: `At the start of a year the assets of Tumkur Coir Works, an imagined firm, were cash ${rs(30000)}, stock ${rs(90000)} and machinery ${rs(180000)}, and it owed ${rs(liab)} to creditors. In the opening entry the Capital account is`,
    opts: [`credited with ${rs(cap)}`, `debited with ${rs(cap)}`, `credited with ${rs(assets + liab)}`, `credited with ${rs(assets)}`],
    sol: `Capital is the balancing figure: ${inr(assets)} − ${inr(liab)} = ${inr(cap)}, and as an owner's claim it is credited. The same amount on the debit side would reverse the entry, ${rs(assets + liab)} adds the liabilities and ${rs(assets)} ignores them.`,
  }));
}
QQ('m_compound', mcq({
  t: 3, d: 3, c: 'application',
  stem: `Bhadrak Lock Works, an imagined firm, sells goods for ${rs(80000)}, receiving ${rs(30000)} in cash and the balance from the customer Tanuja Rao on credit. The journal entry is`,
  opts: [`Cash A/c Dr ${inr(30000)}; Tanuja Rao A/c Dr ${inr(50000)}; To Sales A/c ${inr(80000)}`, `Cash A/c Dr ${inr(80000)}; To Sales A/c ${inr(30000)}; To Tanuja Rao A/c ${inr(50000)}`, `Tanuja Rao A/c Dr ${inr(80000)}; To Sales A/c ${inr(80000)}`, `Cash A/c Dr ${inr(50000)}; Tanuja Rao A/c Dr ${inr(30000)}; To Sales A/c ${inr(80000)}`],
  sol: 'Cash received and the amount due from the customer are both assets and are debited, and their total is credited to Sales. The second entry debits one account and credits two for a sale, the third leaves out the cash, and the fourth swaps the two amounts.',
}));
QQ('m_wrong_entry', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: `The accountant of Satna Spice Mill, an imagined firm, passed this entry for goods costing ${rs(3000)} given away as charity: Charity A/c Dr ${inr(3000)}, To Sales A/c ${inr(3000)}. The correct entry credits, instead of Sales A/c,`,
  opts: ['Purchases A/c, because the goods leave the stock bought for sale', 'Cash A/c, because the gift is a payment', 'Drawings A/c, because the owner is the giver', 'Sales Return A/c, because the goods go back'],
  sol: 'The goods given away are not sold, so no sale is earned; they leave the stock at cost and are credited to Purchases. The firm, not the owner, makes the gift, and no cash is paid or goods returned.',
}));

// ================================================================ assertion-reason
QQ('ar_charity', ar({
  t: 3, d: 3, c: 'analysis', verdict: 'both-false',
  a: 'Goods given away as charity by an imagined firm are debited to the Purchases account.',
  r: 'Charity is a gain of the firm, so it is credited.',
  sol: 'The goods leave the stock, so Purchases is credited and the Charity account, an expense, is debited. Charity is a loss to the firm, not a gain, so both statements are wrong.',
}));
QQ('ar_drawings_goods', ar({
  t: 3, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'When the proprietor of an imagined shop takes goods for personal use, the Purchases account is credited.',
  r: 'The goods leave the stock bought for sale, and the proprietor\'s drawings rise by their cost.',
  sol: 'The credit to Purchases records the goods going out, and the matching debit to Drawings records the rise in withdrawals, which is why the credit is to Purchases.',
}));

// ================================================================ true-false, fill in the blanks
QQ('tf_journal_check', tf({
  t: 3, d: 2, c: 'understanding', ans: true,
  stem: `In the entry that Sirsa Hardware, an imagined firm, passes for goods sold partly for cash and partly on credit, the total of the amounts debited equals the total of the amounts credited.`,
  sol: 'Every journal entry, simple or compound, balances: the debits and credits are of equal value.',
}));
QQ('tf_trade_discount', tf({
  t: 3, d: 3, c: 'understanding', ans: false,
  stem: `Palghar Tiles, an imagined wholesaler, allows a trade discount of ${rs(2000)} on a bill of ${rs(20000)}. In its journal this discount is recorded as discount allowed.`,
  sol: `Trade discount is a reduction in the price and is not recorded in the books; the sale is entered at the net ${rs(18000)}. Discount allowed is a cash discount given for prompt payment.`,
}));
QQ('fb_open_check', fb({
  t: 3, d: 2, c: 'understanding',
  stem: 'To open the books of Chandrapur Tools, an imagined firm, for a new year, the opening entry debits all ___, credits all ___ and credits the balancing figure to the ___ account.',
  acc: [['assets'], ['liabilities'], ['capital']],
  sol: 'The opening entry brings forward the assets as debits and the liabilities as credits, and the difference is the capital.',
}));
QQ('fb_bad', fb({
  t: 3, d: 2, c: 'understanding',
  stem: 'When the account of a customer of Mahe Textiles, an imagined firm, is written off as bad, ___ A/c is debited and the ___ account is credited.',
  acc: [['bad debts'], ['debtor', 'debtor\'s', 'customer', 'customer\'s']],
  sol: 'The loss is debited to Bad Debts and the customer, who was a debtor, is credited to remove the balance.',
}));

// ================================================================ numerical
{
  const A = [42000, 110000, 54000, 36000];
  const L = [48000, 60000];
  const cap = same(A.reduce((a, b) => a + b, 0) - L.reduce((a, b) => a + b, 0), 134000, 'Ujjain capital');
  QQ('n_open_cap', numQ({
    t: 3, d: 3, c: 'application', value: cap,
    stem: `The balances of Ujjain Mustard Mill, an imagined firm, at the start of the year are: cash ${rs(42000)}, stock ${rs(110000)}, debtors ${rs(54000)}, furniture ${rs(36000)}, creditors ${rs(48000)} and a bank loan ${rs(60000)}. Find the amount to be credited to the Capital account in the opening entry (in ₹).`,
    sol: `Assets = ${inr(42000)} + ${inr(110000)} + ${inr(54000)} + ${inr(36000)} = ${inr(242000)}; liabilities = ${inr(48000)} + ${inr(60000)} = ${inr(108000)}; capital = ${inr(242000)} − ${inr(108000)} = ${rs(cap)}.`,
  }));
}
{
  const owed = 32000;
  const disc = same((owed * 2) / 100, 640, 'Sagar discount');
  const paid = owed - disc;
  QQ('n_disc_cash', numQ({
    t: 3, d: 3, c: 'application', value: paid,
    stem: `Sagar Candle House, an imagined firm, owed ${rs(owed)} to a supplier and settled the account in cash on a discount of 2 per cent. Find the cash paid (in ₹).`,
    sol: `Discount received = 2% of ${inr(owed)} = ${inr(disc)}; cash paid = ${inr(owed)} − ${inr(disc)} = ${rs(paid)}.`,
  }));
}
{
  const dep = same((160000 * 15) / 100, 24000, 'Erode depreciation');
  QQ('n_dep', numQ({
    t: 3, d: 2, c: 'application', value: dep,
    stem: `Machinery of Erode Loom Works, an imagined firm, cost ${rs(160000)}. For the year, depreciation of 15 per cent on cost is charged. Find the amount debited to the Depreciation account (in ₹).`,
    sol: `Depreciation = 15% of ${inr(160000)} = ${rs(dep)}.`,
  }));
}
{
  const tot = same(18000 + 7500 + 2500, 28000, 'Cuttack drawings');
  QQ('n_drawings_total', numQ({
    t: 3, d: 3, c: 'application', value: tot,
    stem: `During a year the proprietor of Cuttack Sweets, an imagined firm, withdrew ${rs(18000)} in cash, took goods costing ${rs(7500)} for the home, and had the firm pay his child's school fee of ${rs(2500)} in cash. Find the total debited to the Drawings account (in ₹).`,
    sol: `Drawings = ${inr(18000)} + ${inr(7500)} + ${inr(2500)} = ${rs(tot)}; each item is a withdrawal for personal use.`,
  }));
}
