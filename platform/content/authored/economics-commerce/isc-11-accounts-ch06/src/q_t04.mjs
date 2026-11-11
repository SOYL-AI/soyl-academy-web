// t04: journal proper (opening and closing entries, credit purchase or sale of assets, rectification, bad debts, goods
// withdrawn and similar entries that do not fit another book) and posting from the special subsidiary books to the ledger.
// Imagined firms; every journal entry balances and every ledger is generated and asserted. No GST.
import { mcq, ar, tf, fb, short, long } from './lib.mjs';
import { same, check, sum, inr, rs, mdTable, journal, dayBook, Ledger, route, postMd, T, E } from './books.mjs';
import { QQ, numQ } from './qq.mjs';

// ================================================================ multiple choice
QQ('m_jp_which', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Which of these transactions of Sonari Sports Goods, an imagined firm, is recorded in its journal proper?',
  opts: ['Goods worth ₹12,000 destroyed by fire', 'Goods sold to a dealer on credit', 'Goods bought on credit from a wholesaler', 'Goods returned by a customer who had bought on credit'],
  sol: 'A loss of goods by fire is not a purchase, sale or return, so no special book exists for it and it is entered in the journal proper. The other three have the sales book, the purchases book and the sales return book.',
}));
QQ('m_jp_drawings', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'The proprietor of Dhubri Dry Fruits, an imagined firm, takes goods costing ₹7,500 from the shop for his family. The journal proper entry is',
  opts: ['Drawings A/c Dr ₹7,500 to Purchases A/c ₹7,500', 'Purchases A/c Dr ₹7,500 to Drawings A/c ₹7,500', 'Drawings A/c Dr ₹7,500 to Sales A/c ₹7,500', 'Capital A/c Dr ₹7,500 to Cash A/c ₹7,500'],
  sol: 'Goods taken out are a withdrawal by the owner, so Drawings is debited and Purchases credited at cost. Reversing the entry would treat the owner\'s withdrawal as an addition to purchases, selling price is not used, and no cash moves.',
}));
QQ('m_jp_bad', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Anand Mills, an imagined firm, learns that a debtor, Sohan Lal, has been declared insolvent and nothing will be recovered from the ₹4,600 he owes. The journal proper entry is',
  opts: ['Bad Debts A/c Dr to Sohan Lal A/c', 'Sohan Lal A/c Dr to Bad Debts A/c', 'Bad Debts A/c Dr to Cash A/c', 'Sales Return A/c Dr to Sohan Lal A/c'],
  sol: 'The amount lost is an expense, so Bad Debts is debited and the debtor\'s account is credited to remove the amount due from him. The reverse entry would increase the debt, no cash is paid, and nothing has been returned.',
}));
QQ('m_rect_entry', mcq({
  t: 4, d: 4, c: 'analysis',
  stem: 'The accountant of Kanker Bamboo, an imagined firm, debited the purchase of a computer worth ₹40,000 bought on credit from Digi Zone to the Purchases A/c and entered it in the purchases book. To rectify the error the journal proper entry is',
  opts: ['Computer A/c Dr ₹40,000 to Purchases A/c ₹40,000', 'Purchases A/c Dr ₹40,000 to Computer A/c ₹40,000', 'Computer A/c Dr ₹40,000 to Digi Zone A/c ₹40,000', 'Digi Zone A/c Dr ₹40,000 to Purchases A/c ₹40,000'],
  sol: 'Digi Zone has rightly been credited, so only the debit needs moving from Purchases to the asset account, and the entry credits Purchases to cancel the wrong debit. Reversing it doubles the error, repeating the credit to Digi Zone counts the liability twice, and debiting the supplier would wipe out a debt that is genuinely owed.',
}));
QQ('m_chk_book', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Ranchi Cane Furniture, an imagined firm, sells an old almirah, an asset of the office, to a neighbour on credit. The transaction is first recorded in the',
  opts: ['journal proper', 'sales book', 'purchases book', 'cash book'],
  sol: 'The sale of an asset is not a sale of the goods the firm deals in, and it is on credit, so neither the sales book nor the cash book is right; the journal proper takes it. The purchases book deals with purchases.',
}));
QQ('m_post_folio', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'In the ledger account of a supplier of Bhadrak Spices, an imagined firm, an invoice posted from the purchases book carries the folio "PB 4". This means that the entry was posted from',
  opts: ['page 4 of the purchases book', 'the fourth supplier in the ledger', 'invoice number 4 of the supplier', 'page 4 of the cash book'],
  sol: 'The folio is a cross-reference to the book and page of the source, here the purchases book. It is not a supplier\'s serial number, an invoice number or a page of the cash book.',
}));
QQ('m_jp_insured', mcq({
  t: 4, d: 4, c: 'application',
  stem: 'Goods costing ₹18,000 of Pathar Sweets, an imagined firm, are destroyed by fire. The insurance company admits a claim of ₹12,000. The journal proper entry is',
  opts: ['Insurance Claim A/c Dr ₹12,000 and Loss by Fire A/c Dr ₹6,000 to Purchases A/c ₹18,000', 'Loss by Fire A/c Dr ₹18,000 to Purchases A/c ₹18,000', 'Insurance Claim A/c Dr ₹18,000 to Purchases A/c ₹18,000', 'Loss by Fire A/c Dr ₹12,000 to Insurance Claim A/c ₹12,000'],
  sol: 'The part the insurer will pay is a claim receivable and only the unrecovered ₹6,000 is a loss, and the credit to Purchases removes the whole cost. Charging all ₹18,000 to loss ignores the claim, claiming all ₹18,000 overstates what is due, and debiting Loss by Fire ₹12,000 to Insurance Claim does not remove the goods from the books.',
}));

// ================================================================ assertion-reason
QQ('ar_bad_debt', ar({
  t: 4, d: 3, c: 'analysis', verdict: 'A-true-R-false',
  a: 'When Gulbarga Gems, an imagined firm, writes off a debtor\'s balance as bad, it credits the account of the debtor.',
  r: 'The loss on a bad debt is transferred to the Sales Return A/c.',
  sol: 'The assertion is true, because the debt is removed from the customer\'s account by a credit. The reason is false: the loss is an expense, debited to Bad Debts A/c, and the Sales Return A/c holds goods taken back.',
}));

// ================================================================ true-false, fill-blank
QQ('tf_jp_goods', tf({
  t: 4, d: 3, c: 'understanding', ans: false,
  stem: 'Goods that the proprietor of Dindigul Locks, an imagined firm, takes for his own use are entered in the sales book at their selling price.',
  sol: 'These goods are a withdrawal and are entered in the journal proper, debiting Drawings and crediting Purchases at cost; no sale has taken place.',
}));
QQ('fb_chk_jp', fb({
  t: 4, d: 2, c: 'recall',
  stem: 'A credit sale of a fixed asset by Etawah Utensils, an imagined firm, is entered in the ______, and the account of the buyer is ______.',
  acc: [['journal proper', 'journal'], ['debited', 'debit']],
  sol: 'The journal proper records it, and the buyer is debited.',
}));
QQ('fb_closing', fb({
  t: 4, d: 2, c: 'recall',
  stem: 'An entry such as Trading A/c Dr to Purchases A/c, passed by Beed Batteries, an imagined firm, at the year end is a ______ entry made in the ______.',
  acc: [['closing', 'transfer'], ['journal proper', 'journal']],
  sol: 'The balance of a nominal account is moved by a closing (transfer) entry, passed in the journal proper.',
}));

// ================================================================ numerical
const OC = journal([{ date: '1', dr: [['Assets', 340000]], cr: [['Liabilities', 110000], ['Capital A/c', 230000]], note: 'x' }]);
same(OC.total, 340000, 'n_open_capital');
QQ('n_open_capital', numQ({
  t: 4, d: 3, c: 'application', value: 230000,
  stem: 'On 1 April 2028 Banka Jute Mart, an imagined firm, opens new books. Its assets are cash ₹30,000, stock ₹1,10,000, debtors ₹1,20,000 and furniture ₹80,000, and its liabilities are creditors ₹70,000 and a loan ₹40,000. The amount credited to Capital A/c in the opening entry is (in ₹)',
  sol: `Assets = ${inr(30000)} + ${inr(110000)} + ${inr(120000)} + ${inr(80000)} = ${inr(340000)}; capital = assets − liabilities = ${inr(340000)} − ${inr(110000)} = ${rs(230000)}.`,
}));
const PBAL = 240000 - 7200 - 18000 - 2400;
same(PBAL, 212400, 'n_purchases_balance');
QQ('n_purchases_balance', numQ({
  t: 4, d: 3, c: 'application', value: PBAL,
  stem: 'The Purchases A/c of Sawai Madhopur Cotton, an imagined firm, has a debit of ₹2,40,000, being the total posted from the purchases book. The journal proper later credits it with ₹7,200 for goods taken by the proprietor, ₹18,000 for goods destroyed by fire and ₹2,400 for goods given as free samples. The balance transferred to the Trading Account at the year end is (in ₹)',
  sol: `Credits = ${inr(7200)} + ${inr(18000)} + ${inr(2400)} = ${inr(27600)}; balance = ${inr(240000)} − ${inr(27600)} = ${rs(PBAL)}.`,
}));

// ================================================================ short answer, 2 marks
QQ('s2_jp_meaning', short({
  t: 4, d: 2, c: 'understanding', marks: 2,
  stem: 'What is the journal proper? Give two examples of entries recorded in it by an imagined trading firm.',
  model: 'The journal proper is the book of original entry in which are recorded the transactions that do not belong to any of the special books (cash book, purchases, sales and the returns books).\n\nExamples: the opening entry; credit purchase or credit sale of an asset; bad debts written off; goods taken by the proprietor; closing (transfer) entries; rectification entries.',
  sol: 'One mark for the meaning and one for two examples.',
  scheme: [['Meaning: records transactions for which no special book exists', 1], ['Two correct examples', 1]],
}));
QQ('s2_jp_drawings_samples', short({
  t: 4, d: 2, c: 'application', marks: 2,
  stem: 'Pass journal proper entries, with narrations, in the books of Hamirpur Pickles, an imagined firm, for (i) goods costing ₹3,200 taken by the proprietor for his own use; (ii) goods costing ₹1,500 distributed as free samples.',
  model: journal([E('', [['Drawings A/c', 3200]], [['Purchases A/c', 3200]], 'Being goods taken by the proprietor for his own use'), E('', [['Advertisement A/c', 1500]], [['Purchases A/c', 1500]], 'Being goods given away as free samples')], { dates: false }).md,
  sol: 'One mark for each entry.',
  scheme: [['Drawings A/c debited and Purchases A/c credited with ₹3,200', 1], ['Advertisement A/c debited and Purchases A/c credited with ₹1,500', 1]],
}));

// ================================================================ short answer, 3 marks
const J3 = [
  E('12 Oct 2028', [['Delivery Van A/c', 340000]], [['Auto Hub A/c', 340000]], 'Being a delivery van bought on credit from Auto Hub'),
  E('20 Oct 2028', [['Drawings A/c', 8500]], [['Purchases A/c', 8500]], 'Being goods taken by the proprietor for his own use'),
  E('29 Oct 2028', [['Bad Debts A/c', 11000]], [['Gopal Das A/c', 11000]], 'Being the amount due from Gopal Das, who is insolvent, written off'),
];
QQ('s3_jp_three_entries', short({
  t: 4, d: 3, c: 'application', marks: 3,
  stem: 'Pass journal proper entries, with narrations, in the books of Dhemaji Ceramics, an imagined firm: 12 Oct 2028, a delivery van bought on credit from Auto Hub for ₹3,40,000; 20 Oct, goods costing ₹8,500 taken by the proprietor for his own use; 29 Oct, ₹11,000 due from a customer, Gopal Das, who is insolvent, written off.',
  model: journal(J3).md,
  sol: 'One entry for each transaction, balanced, with narration.',
  scheme: [['Delivery Van A/c debited and Auto Hub A/c credited with ₹3,40,000', 1], ['Drawings A/c debited and Purchases A/c credited with ₹8,500', 1], ['Bad Debts A/c debited and Gopal Das A/c credited with ₹11,000', 1]],
}));
const OP = { date: '1 Apr 2028', dr: [['Cash A/c', 15000], ['Bank A/c', 42000], ['Stock A/c', 65000], ['Ram Prasad A/c', 18000], ['Furniture A/c', 30000]], cr: [['Sita Traders A/c', 25000], ['Capital A/c', 145000]], note: 'Being the assets, liabilities and capital brought into the new books' };
same(sum(OP.dr.map(([, a]) => a)) - 25000, 145000, 's3_open_close capital');
const CL = [E('31 Mar 2029', [['Trading A/c', 320000]], [['Purchases A/c', 320000]], 'Being Purchases A/c transferred to the Trading Account'), E('31 Mar 2029', [['Sales A/c', 450000]], [['Trading A/c', 450000]], 'Being Sales A/c transferred to the Trading Account')];
QQ('s3_open_close', short({
  t: 4, d: 3, c: 'application', marks: 3,
  stem: 'Mahoba Footwear, an imagined firm, begins new books on 1 April 2028 with cash ₹15,000, bank ₹42,000, stock ₹65,000, a debtor Ram Prasad ₹18,000, furniture ₹30,000 and a creditor Sita Traders ₹25,000. (a) Pass the opening entry [2]. (b) On 31 March 2029 its Purchases A/c shows a debit balance of ₹3,20,000 and its Sales A/c a credit balance of ₹4,50,000. Pass the closing entries transferring them to the Trading Account [1].',
  model: `**(a)**\n\n${journal([OP]).md}\n\nCapital = ${inr(170000)} − ${inr(25000)} = ${rs(145000)}.\n\n**(b)**\n\n${journal(CL).md}`,
  sol: 'Capital is the balancing figure; each closing entry clears the nominal account.',
  scheme: [['Assets debited and creditor credited correctly in the opening entry', 1], ['Capital A/c credited with the balancing figure ₹1,45,000, totals equal, with narration', 1], ['Closing entries for Purchases and Sales with the Trading Account', 1]],
}));
const RC = [E('', [['Office Equipment A/c', 12000]], [['Purchases A/c', 12000]], 'Being furniture bought for cash for the office wrongly debited to Purchases A/c, now rectified'), E('', [['Typewriter A/c', 8000]], [['Purchases A/c', 8000]], 'Being a typewriter bought on credit wrongly entered in the purchases book, now rectified')];
QQ('s3_rect_two', short({
  t: 4, d: 4, c: 'analysis', marks: 3,
  stem: 'The books of Bundi Bricks, an imagined firm, contain two errors: (i) office equipment bought for ₹12,000 in cash was debited to Purchases A/c; (ii) a typewriter bought on credit from Mehra Office Supplies for ₹8,000 was entered in the purchases book. Pass the rectifying entries and say why the account of Mehra Office Supplies needs no correction.',
  model: `${journal(RC, { dates: false }).md}\n\nMehra Office Supplies has already been credited with ₹8,000 through the purchases book, which is right because the firm does owe that amount; only the debit was wrongly placed in Purchases.`,
  sol: 'Move each wrong debit from Purchases to the asset account; the supplier stays credited.',
  scheme: [['Office Equipment A/c debited and Purchases A/c credited with ₹12,000', 1], ['Typewriter A/c debited and Purchases A/c credited with ₹8,000', 1], ['Explanation that the supplier is rightly credited', 1]],
}));

// ================================================================ long answer, 5 marks
const PA = route([
  { kind: 'purchase', date: '2 Feb', no: '31', party: 'Sukhi Traders', goods: 40000, td: 10, text: 'Bought goods on credit from Sukhi Traders, list price ₹40,000, trade discount 10%' },
  { kind: 'sale', date: '5 Feb', no: 'P9', party: 'Rohan Press', goods: 30000, td: 10, text: 'Sold goods on credit to Rohan Press, list price ₹30,000, trade discount 10%' },
  { kind: 'jp', date: '8 Feb', dr: [['Printing Machine A/c', 85000]], cr: [['Kalinga Machines A/c', 85000]], note: 'Being a printing machine bought on credit from Kalinga Machines', text: 'Bought a printing machine on credit from Kalinga Machines for ₹85,000' },
  { kind: 'preturn', date: '12 Feb', no: 'DN1', party: 'Sukhi Traders', goods: 5000, td: 10, text: 'Returned goods to Sukhi Traders, list price ₹5,000, trade discount 10%' },
  { kind: 'cash', date: '15 Feb', text: 'Sold goods for cash ₹18,000' },
  { kind: 'jp', date: '19 Feb', dr: [['Drawings A/c', 4000]], cr: [['Purchases A/c', 4000]], note: 'Being goods taken by the proprietor for personal use', text: 'The proprietor took goods costing ₹4,000 for his house' },
  { kind: 'sreturn', date: '22 Feb', no: 'CN1', party: 'Rohan Press', goods: 2000, td: 10, text: 'Goods were returned by Rohan Press, list price ₹2,000, trade discount 10%' },
  { kind: 'jp', date: '26 Feb', dr: [['Bad Debts A/c', 3200]], cr: [['Pinaki Dutta A/c', 3200]], note: 'Being the amount due from Pinaki Dutta written off as bad debt', text: 'Wrote off ₹3,200 due from a customer, Pinaki Dutta, as bad debt' },
]);
const PAL = new Ledger().fromBook(PA.books.purchases, '28 Feb').fromBook(PA.books.purchaseReturns, '28 Feb');
const PASUK = PAL.show('Sukhi Traders A/c', { close: '28 Feb', next: '1 Mar' });
same(PASUK.balance, -(36000 - 4500), 'l5_route_mixed Sukhi balance');
check(PA.jp.length === 3 && PA.cash.length === 1, 'l5_route_mixed counts');
QQ('l5_route_mixed', long({
  t: 4, d: 4, c: 'application', marks: 5,
  stem: `The transactions of Palakkad Paper Co., an imagined firm, in February 2029 were: ${PA.rows.map((r) => `${r[0]}, ${r[1].charAt(0).toLowerCase()}${r[1].slice(1)}`).join('; ')}. (a) Name the book in which each transaction is first recorded [2]. (b) Pass the journal proper entries, with narrations [2]. (c) Write up the account of Sukhi Traders in the ledger and balance it on 28 February (nothing was owed on 1 February) [1].`,
  model: `**(a)**\n\n${PA.md}\n\n**(b)**\n\n${journal(PA.jp, { dates: true }).md}\n\n**(c)**\n\n${PASUK.md}`,
  sol: 'Credit purchases and sales and the returns go to day books, cash to the cash book, and the rest to the journal proper.',
  scheme: [['Purchases, sales and the two returns assigned to their books', 1], ['Cash sale to the cash book and the other three transactions to the journal proper', 1], ['Machine and drawings entries correct', 1], ['Bad debts entry correct and the three entries balanced with narration', 1], ['Sukhi Traders: ₹36,000 on credit, ₹4,500 on debit, balance ₹31,500 carried down', 1]],
}));
const TH = {
  pb: dayBook({ kind: 'purchases', entries: [T('4 Oct', 'P61', 'Salem Locks', 50000, 10), T('12 Oct', 'P64', 'Madurai Hinges', 30000, 0), T('21 Oct', 'P69', 'Salem Locks', 24000, 5)] }),
  prb: dayBook({ kind: 'purchaseReturns', entries: [T('10 Oct', 'DN1', 'Salem Locks', 5000, 10), T('25 Oct', 'DN2', 'Madurai Hinges', 3500, 0), T('30 Oct', 'DN3', 'Salem Locks', 4000, 5)] }),
};
const THL = new Ledger().open('Salem Locks A/c', 'cr', 16000, '1 Oct').fromBook(TH.pb, '31 Oct').fromBook(TH.prb, '31 Oct');
const THS = THL.show('Salem Locks A/c', { close: '31 Oct', next: '1 Nov' });
same(THS.balance, -(16000 + 45000 + 22800 - 4500 - 3800), 'l5_post_books Salem balance');
const THP = THL.show('Purchases A/c', { balanced: false });
const THR = THL.show('Purchases Return A/c', { balanced: false });
same(THP.dr, 97800, 'Tumkur purchases');
same(THR.cr, 11800, 'Tumkur purchases return');
QQ('l5_post_books', long({
  t: 4, d: 4, c: 'application', marks: 5,
  stem: 'The purchases book of Tumkur Hardware, an imagined firm, for October 2028 shows (list price, trade discount): 4 Oct Salem Locks, invoice P61, ₹50,000, 10%; 12 Oct Madurai Hinges, invoice P64, ₹30,000, nil; 21 Oct Salem Locks, invoice P69, ₹24,000, 5%. Its purchases return book shows debit notes (list price, trade discount): 10 Oct Salem Locks, note DN1, ₹5,000, 10%; 25 Oct Madurai Hinges, note DN2, ₹3,500, nil; 30 Oct Salem Locks, note DN3, ₹4,000, 5%. Salem Locks was owed ₹16,000 on 1 October. (a) Write up and balance the account of Salem Locks [3]. (b) Show the Purchases A/c and the Purchases Return A/c after posting the two books, and find the net purchases for the month [2].',
  model: `**(a)**\n\n${THS.md}\n\n**(b)**\n\n${THP.md}\n\n${THR.md}\n\nNet purchases = ${inr(97800)} − ${inr(11800)} = **${rs(86000)}**.`,
  sol: 'Post each invoice and note to the supplier, post the two book totals, then net them.',
  scheme: [['Opening balance and the two invoices at net amounts on the credit side', 1], ['The two debit notes at net amounts on the debit side', 1], ['Balance ₹75,500 carried down and brought down with equal totals', 1], ['Purchases A/c debited and Purchases Return A/c credited with the book totals ₹97,800 and ₹11,800', 1], ['Net purchases ₹86,000', 1]],
}));
