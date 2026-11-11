// Build ISC 11 Accounts ch05 Cash Book. Run from platform/:
//   npx tsx content/authored/economics-commerce/isc-11-accounts-ch05/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build } from './lib.mjs';
import { nearDuplicates } from '../../../../../content-pipeline/src/originality/ngrams.ts';
import { words, rupees } from './acc.mjs';
import { check, same, inr, rs, SC, SCB, SCB_LF, SC_ANIL, SC_MEHTA, TC, TCB, TC_FIRST, TC_CHEQUE, TC_ROHIT, TC_DISC, OD, ODB, FX, FXB, FX1, FX2 } from './fig.mjs';

setUnit('isc-11-accounts-ch05', 'economics-commerce');
const { BANK } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const tbl = (cb, alt, caption) => table(cb.headers, cb.rows, alt, caption);
const led = (l, alt, caption) => table(l.headers, l.rows, alt, caption);

// ================================================================ computed figures (never typed twice)
same(SCB.cash, 10200, 'simple cash book closing cash');
same(TCB.cash, 38850, 'triple cash book closing cash');
same(TCB.bank, 29080, 'triple cash book closing bank');
same(TCB.discAllowed, 550, 'discount allowed');
same(TCB.discReceived, 1200, 'discount received');
same(ODB.bank, -26850, 'overdraft');
const SCR = SC.items.filter((i) => i.k === 'R');
const SCP = SC.items.filter((i) => i.k === 'P');
const rcptTotal = SC.open.cash + SCR.reduce((a, i) => a + i.cash, 0);
const payTotal = SCP.reduce((a, i) => a + i.cash, 0);
same(rcptTotal - payTotal, SCB.cash, 'receipts less payments equal the cash balance');
same(rcptTotal, SCB.totalCash, 'debit side total');
const contraIn = TC.items.find((i) => i.k === 'DEP').amt;
const contraOut = TC.items.find((i) => i.k === 'WD').amt;
const chq = TC.items.find((i) => i.k === 'R' && i.who === 'Karan Mehra');
same(chq.cash, contraIn, 'the cheque not deposited the same day is the deposit of 12 November');

// ================================================================ visuals: deck 1
const vRoute1 = flow('LR', ['Transaction', 'Subsidiary book', 'Ledger account', 'Trial balance'], 'Route map of Part 1: a transaction is first recorded in a subsidiary book such as the cash book, then posted to the ledger accounts, which feed the trial balance', 'Part 1 at a glance');
const vOne = table(
  ['Basis', 'One journal for everything', 'Subsidiary books'],
  [
    ['Who writes', 'One clerk, one book', 'Several clerks, each with a book'],
    ['Posting', 'Every item is posted separately', 'Totals of a period are posted together'],
    ['Looking for a transaction', 'Search the whole journal', 'Open the book of its class'],
    ['Finding an error', 'Check every page', 'Check the book of that class'],
  ],
  'Table comparing one journal for everything with subsidiary books on who writes, posting, looking for a transaction and finding an error',
);
const vAdv = table(
  ['Advantage', 'How it helps'],
  [
    ['Division of work', 'Different clerks write different books at the same time'],
    ['Specialisation', 'A clerk who writes one kind of entry becomes quick and accurate'],
    ['Saving of time and labour', 'Totals are posted instead of every item'],
    ['Easy reference', 'All transactions of one class are together'],
    ['Errors located quickly', 'A mistake is searched for in one book only'],
    ['Internal check', 'Each clerk is answerable for his own book'],
  ],
  'Table of six advantages of subsidiary books: division of work, specialisation, saving of time and labour, easy reference, errors located quickly and internal check',
);
const vBooks = table(
  ['Book', 'Records', 'Where taught'],
  [
    ['Cash book', 'All receipts and payments of cash and through the bank', 'This chapter'],
    ['Purchases book', 'Goods bought on credit', 'Chapter 6'],
    ['Sales book', 'Goods sold on credit', 'Chapter 6'],
    ['Purchases returns book', 'Goods sent back to suppliers', 'Chapter 6'],
    ['Sales returns book', 'Goods sent back by customers', 'Chapter 6'],
    ['Petty cash book', 'Small cash payments on the imprest system', 'Chapter 6'],
    ['Bills receivable and bills payable books', 'Bills of exchange received and accepted', 'Named only'],
    ['Journal proper', 'Entries that belong to no other book', 'Chapter 6'],
  ],
  'Table of the subsidiary books: cash book, purchases book, sales book, purchases returns book, sales returns book, petty cash book, bills books and journal proper, with what each records and where it is taught',
  'The subsidiary books at a glance',
);
const BOOK_OF = { credit_sale: 'Sales book', credit_purchase: 'Purchases book', cash_payment: 'Cash book', purchase_return: 'Purchases returns book', sales_return: 'Sales returns book', depreciation: 'Journal proper' };
const T1 = [
  ['Sold goods on credit to Gita Traders for ₹14,000', 'credit_sale'],
  ['Paid salaries of ₹3,000 in cash', 'cash_payment'],
  ['Bought goods on credit from Rao Papers for ₹9,500', 'credit_purchase'],
  ['Sent back goods worth ₹1,200 to Rao Papers', 'purchase_return'],
  ['Gita Traders returned goods worth ₹2,000', 'sales_return'],
  ['Charged depreciation of ₹4,000 on furniture', 'depreciation'],
];
const vClassify = table(['Transaction of an imagined firm', 'First recorded in'], T1.map(([t, k]) => [t, BOOK_OF[k]]), 'Table assigning six transactions to their subsidiary books: credit sale to the sales book, cash payment to the cash book, credit purchase to the purchases book, purchase return to the purchases returns book, sales return to the sales returns book and depreciation to the journal proper', 'Each transaction goes to one book');
const vRoles = table(
  ['Role', 'What it means', 'Result'],
  [
    ['Book of original entry', 'Every receipt and payment of cash is written in it first, in date order', 'No cash entry is made in the journal'],
    ['Ledger account', 'It is balanced like an account: receipts on the debit side, payments on the credit side', 'No separate Cash A/c is kept in the ledger'],
  ],
  'Table of the two roles of the cash book: a book of original entry for cash transactions and, because it is balanced like an account, the Cash A/c itself',
);
const vFormat = table(
  ['Date', 'Dr: Particulars', 'L.F.', 'Amount (₹)', 'Date', 'Cr: Particulars', 'L.F.', 'Amount (₹)'],
  [
    [SC.openDate, 'To Balance b/d', '', inr(SC.open.cash), SCP[0].date, `By ${SCP[0].who}`, String(SC.folio[SCP[0].who]), inr(SCP[0].cash)],
    [SCR[0].date, `To ${SCR[0].who}`, String(SC.folio[SCR[0].who]), inr(SCR[0].cash), SCP[1].date, `By ${SCP[1].who}`, String(SC.folio[SCP[1].who]), inr(SCP[1].cash)],
  ],
  'Format of a simple cash book of Kundan Hardware, an imagined shop: the debit side for receipts and the credit side for payments, each with date, particulars, ledger folio and an amount column, the opening balance first on the debit side',
  'Single column cash book: first lines of June 2027',
);
const vRules = table(
  ['Transaction', 'Side of the cash book', 'Particulars written', 'Posted to the ledger account'],
  [
    ['Cash sales, cash from a debtor, any receipt', 'Debit (receipts)', 'To the other account', 'Credit side of that account'],
    ['Purchases for cash, expenses, drawings, payment to a creditor', 'Credit (payments)', 'By the other account', 'Debit side of that account'],
    ['Opening cash in hand', 'Debit, first line', 'To Balance b/d', 'Not posted: it is the Cash A/c itself'],
  ],
  'Table of the rules of the simple cash book: receipts on the debit side with To and the other account, payments on the credit side with By and the other account, opening cash as To Balance b/d',
);
const vSteps1 = flow('LR', ['Total both sides in rough', 'Find the difference', 'Write it as Balance c/d on the credit side', 'Write the equal total on both sides', 'Bring it down below as Balance b/d'], 'Five steps of balancing a simple cash book: total each side in rough, find the difference, write it as balance carried down on the credit side, write the equal total on both sides and bring the balance down on the debit side', 'Balancing the cash book');
const vSCB = tbl(SCB_LF, `Simple cash book of Kundan Hardware for June 2027 after balancing: receipts of ${words(SCB.totalCash)} rupees on the debit side including the opening cash, payments and the balance carried down of ${words(SCB.cash)} rupees on the credit side, with ledger folios and both totals equal`, 'Kundan Hardware, June 2027: simple cash book');
const vNoCredit = table(
  ['If the credit side is larger', 'What it means', 'What to do'],
  [
    ['A credit balance of cash', 'Impossible: payments cannot exceed cash held', 'Recheck every entry'],
    ['Receipt left out or on the wrong side', 'Cash received was not counted', 'Enter or correct it'],
    ['Payment entered twice or overstated', 'Cash paid was counted too much', 'Remove or correct it'],
    ['Opening balance forgotten', 'Part of the cash in hand was ignored', 'Bring it in as To Balance b/d'],
  ],
  'Table of what a credit balance of cash in a cash book would mean: it is impossible, so the clerk checks for an omitted receipt, a payment entered twice or a forgotten opening balance',
);
const vPost = table(
  ['Date', 'Cash book line', 'Ledger account', 'Side', 'Particulars in the ledger', 'Amount (₹)'],
  SC.items.map((i) => [i.date, i.k === 'R' ? 'Receipt' : 'Payment', /A\/c$/.test(i.who) ? i.who : `${i.who} A/c`, i.k === 'R' ? 'Credit' : 'Debit', i.k === 'R' ? 'By Cash A/c' : 'To Cash A/c', inr(i.cash)]),
  'Table showing how each line of the simple cash book of Kundan Hardware is posted: every receipt is credited to the other account as By Cash A/c and every payment is debited to the other account as To Cash A/c',
  'Posting the cash book to the ledger',
);
const vAnil = led(SC_ANIL, `Account of Anil Rao in the ledger of Kundan Hardware: a debit balance of ten thousand rupees brought down, a credit sale of four thousand eight hundred rupees on the debit side, and the receipt of ${words(6200)} rupees on the credit side as By Cash, leaving a debit balance of ${words(SC_ANIL.balance)} rupees`, 'Debtor: Anil Rao A/c');
const vMehta = led(SC_MEHTA, `Account of Mehta Suppliers in the ledger of Kundan Hardware: a credit balance of nine thousand rupees brought down and a payment of ${words(4200)} rupees on the debit side as To Cash, leaving a credit balance of ${words(-SC_MEHTA.balance)} rupees`, 'Creditor: Mehta Suppliers A/c');
const vSlips1 = table(
  ['Slip', 'Why it is wrong', 'Correct practice'],
  [
    ['A receipt entered on the credit side', 'Receipts are debits to cash', 'Receipts on the debit side with To'],
    ['The balance c/d written on the debit side', 'The credit side is the smaller side', 'Balance c/d on the credit side, b/d on the debit side'],
    ['Keeping a separate Cash A/c as well', 'The cash book is the cash account', 'Post only the other accounts'],
    ['Naming Cash in the cash book particulars', 'The other account must be named', 'To Sales A/c, By Rent A/c and so on'],
    ['Posting a payment to the credit of the expense', 'The expense is a debit', 'Debit the expense, name Cash'],
  ],
  'Table of five common slips in a simple cash book, why each is wrong and the correct practice',
);
const vSum1 = table(
  ['Topic', 'Remember'],
  [
    ['Subsidiary books', 'The journal is divided by class of transaction; the totals are posted to the ledger'],
    ['Cash book', 'Book of original entry and the Cash A/c in one'],
    ['Recording', 'Receipts on the debit side with To; payments on the credit side with By; name the other account'],
    ['Balancing', 'Cash is never a credit balance; c/d on the credit side, b/d on the debit side'],
    ['Posting', 'Receipt: credit the other account, By Cash A/c. Payment: debit it, To Cash A/c'],
  ],
  'Summary table of Part 1: subsidiary books, the cash book, recording, balancing and posting',
);

// ================================================================ visuals: deck 2
const vRoute2 = flow('LR', ['Receipts and payments', 'Discount, cash and bank columns', 'Contra entries and cheques', 'Balancing', 'Posting'], 'Route map of Part 2: the triple column cash book takes receipts and payments into discount, cash and bank columns, with contra entries and cheques, is balanced and then posted', 'Part 2 at a glance');
const tcOf = (i) => (i.k === 'R' || i.k === 'P' ? [i.date, `${i.k === 'R' ? 'To' : 'By'} ${i.who}`, i.disc ? inr(i.disc) : '', i.cash ? inr(i.cash) : '', i.bank ? inr(i.bank) : ''] : null);
const f1 = tcOf(TC.items[1]);
const f2 = tcOf(TC.items[2]);
const vFormat2 = table(
  ['Date', 'Dr: Particulars', 'L.F.', 'Discount allowed (₹)', 'Cash (₹)', 'Bank (₹)', 'Date', 'Cr: Particulars', 'L.F.', 'Discount received (₹)', 'Cash (₹)', 'Bank (₹)'],
  [
    [TC.openDate, 'To Balance b/d', '', '', inr(TC.open.cash), inr(TC.open.bank), f2[0], f2[1], '', f2[2], '', f2[4]],
    [f1[0], f1[1], '', f1[2], '', f1[4], '', '', '', '', '', ''],
  ],
  'Format of the triple column cash book of Bhavna Electricals, an imagined firm: each side has date, particulars, ledger folio, a discount column, a cash column and a bank column; discount allowed is on the debit side and discount received on the credit side',
  'Three money columns on each side',
);
const vDisc = table(
  ['', 'Discount allowed', 'Discount received'],
  [
    ['Given to or by', 'Allowed to a debtor who pays early', 'Received from a creditor who is paid early'],
    ['Column in the cash book', 'Debit side', 'Credit side'],
    ['Nature', 'Loss (expense)', 'Gain (income)'],
    ['At the end of the month', 'Column totalled; debit Discount Allowed A/c', 'Column totalled; credit Discount Received A/c'],
    ['In the personal account', 'Credited: By Discount Allowed A/c', 'Debited: To Discount Received A/c'],
  ],
  'Table comparing discount allowed and discount received on whom it is given to or received from, the column of the cash book, its nature, the posting of the column total and the entry in the personal account',
);
const vContra = table(
  ['Contra entry', 'Debit side', 'Credit side'],
  [
    [`Cash deposited into the bank (${rs(contraIn)} on ${TC.items.find((i) => i.k === 'DEP').date})`, `Bank column: To Cash A/c, ${inr(contraIn)}`, `Cash column: By Bank A/c, ${inr(contraIn)}`],
    [`Cash withdrawn for office use (${rs(contraOut)} on ${TC.items.find((i) => i.k === 'WD').date})`, `Cash column: To Bank A/c, ${inr(contraOut)}`, `Bank column: By Cash A/c, ${inr(contraOut)}`],
  ],
  'Table of the two contra entries: a deposit of cash debits the bank column and credits the cash column; a withdrawal for office use debits the cash column and credits the bank column; both are marked C and are not posted',
  'Contra entries appear on both sides',
);
const f0 = TC_FIRST;
const vFirst = tbl(f0, `Opening balances of cash and bank, then a receipt from Rohit Jain by cheque with discount allowed of ${words(400)} rupees, then a payment to Sumit Traders by cheque with discount received of ${words(1200)} rupees, balanced on the fifth of November`, 'Bhavna Electricals: the first three entries');
const vCheques = table(
  ['Case', 'Entry on receipt', 'Later entry'],
  [
    ['Cheque received and deposited the same day', 'Debit side, bank column, against the customer', 'None'],
    ['Cheque received and not deposited the same day', 'Debit side, cash column, against the customer', 'Contra entry on the day it is deposited'],
    ['A deposited cheque is dishonoured', 'Already in the bank column', 'Credit side, bank column, against the customer'],
  ],
  'Table of three cheque cases: a cheque deposited the same day goes to the bank column; one kept and deposited later goes first to the cash column and then by a contra entry to the bank column; a dishonoured cheque is credited in the bank column',
);
const vNotDep = tbl(TC_CHEQUE, `The cheque of ${words(chq.cash)} rupees from Karan Mehra: received on the eighth of November and entered in the cash column, paid into the bank on the twelfth by a contra entry, and returned unpaid on the twenty first and credited in the bank column`, 'Karan Mehra\'s cheque: received, deposited, dishonoured');
const vDish = table(
  ['Where', 'Entry', 'Effect'],
  [
    ['Cash book', 'Credit side, bank column: By Karan Mehra', 'The bank balance falls by the cheque'],
    ['Ledger', 'Karan Mehra A/c: To Bank A/c on the debit side', 'He owes the firm again'],
  ],
  'Table of the two entries for a dishonoured cheque: a credit in the bank column of the cash book and a debit in the ledger account of the customer, so that he owes the amount again',
);
const vSteps2 = flow('LR', ['Total each money column on both sides', 'Balance cash and bank separately', 'Cash c/d on the credit side; bank c/d on the credit side if favourable, on the debit side if overdrawn', 'Equal totals in cash and bank columns', 'Only total the discount columns'], 'Five steps of balancing the triple column cash book: total, balance cash and bank separately, carry each down on the proper side, show equal totals in the cash and bank columns and only total the discount columns', 'Balancing the triple column cash book');
const vTCB = tbl(TCB, `Triple column cash book of Bhavna Electricals for November 2027 after balancing: cash balance of ${words(TCB.cash)} rupees and bank balance of ${words(TCB.bank)} rupees carried down on the credit side, discount allowed of ${words(TCB.discAllowed)} rupees and discount received of ${words(TCB.discReceived)} rupees totalled and not balanced`, 'Bhavna Electricals, November 2027');
const vDiscPost = table(TC_DISC.headers, TC_DISC.rows, `Posting of the two discount totals of Bhavna Electricals: Discount Allowed A/c debited with ${words(TCB.discAllowed)} rupees and Discount Received A/c credited with ${words(TCB.discReceived)} rupees, both as Sundries as per Cash Book`, 'Discount totals are posted, not balanced');
const vRohit = led(TC_ROHIT, `Account of Rohit Jain in the ledger of Bhavna Electricals: debit balance of ten thousand rupees brought down, credited by the bank for ${words(9600)} rupees and by Discount Allowed for ${words(400)} rupees so that the account closes with no balance`, 'Debtor settled with discount: Rohit Jain A/c');
const vOD = table(
  ['', 'Favourable bank balance', 'Overdraft'],
  [
    ['Nature of the bank column balance', 'Debit balance', 'Credit balance'],
    ['Balance c/d is written', 'On the credit side', 'On the debit side'],
    ['Balance b/d is brought down', 'On the debit side', 'On the credit side'],
    ['Opening balance (if any)', 'To Balance b/d', 'By Balance b/d'],
    ['Meaning', 'The bank owes the firm', 'The firm owes the bank'],
  ],
  'Table comparing a favourable bank balance with an overdraft on the nature of the balance, the side of balance c/d, the side of balance b/d, the opening balance and the meaning',
);
const vODB = tbl(ODB, `Triple column cash book of Wazir Cycle Mart for December 2027: an opening overdraft of ${words(-OD.open.bank)} rupees on the credit side, a closing overdraft of ${words(-ODB.bank)} rupees carried down on the debit side and cash of ${words(ODB.cash)} rupees carried down on the credit side`, 'Wazir Cycle Mart, December 2027: overdraft');
const vFixed = table(
  ['At the close of the day', 'Contra entry', 'Bank column afterwards'],
  [
    ['Cash column above the fixed amount', 'Deposit the excess: bank column debited, cash column credited', 'Rises by the excess'],
    ['Cash column below the fixed amount', 'Withdraw the shortfall: cash column debited, bank column credited', 'Falls by the shortfall; an overdraft if it goes below nil'],
    ['Cash column equal to the fixed amount', 'None', 'Unchanged'],
  ],
  'Table of the two ways of keeping a fixed cash balance: deposit the excess into the bank or withdraw the shortfall from the bank, each by a contra entry',
);
const vFXB = tbl(FXB, `Triple column cash book of Pranav Bicycles for ten and eleven January 2028 with a fixed cash balance of ${words(FX.target)} rupees: a deposit of ${words(FX1.item.amt)} rupees on the first day and a withdrawal of ${words(FX2.item.amt)} rupees on the second, ending with an overdraft of ${words(-FXB.bank)} rupees`, `Pranav Bicycles: a fixed cash balance of ${rs(FX.target)} at the close of each day`);
const vSlips2 = table(
  ['Slip', 'Why it is wrong', 'Correct practice'],
  [
    ['A deposit of cash entered on one side only', 'A contra entry needs both lines', 'Debit the bank column and credit the cash column'],
    ['An undeposited cheque entered in the bank column', 'The bank does not yet hold it', 'Cash column first, contra on deposit'],
    ['Balancing the discount columns', 'They are not accounts of the cash book', 'Total them and post the totals'],
    ['An overdraft carried down on the credit side', 'It is a credit balance, so c/d goes on the debit side', 'To Balance c/d on the debit side'],
    ['A dishonoured cheque left in the bank column', 'The deposit was never paid', 'Credit the bank column against the customer'],
  ],
  'Table of five common slips in the triple column cash book, why each is wrong and the correct practice',
);
const vSum2 = table(
  ['Topic', 'Remember'],
  [
    ['Three columns', 'Discount, cash and bank on both sides'],
    ['Contra entries', 'On both sides, marked C, never posted: deposit and withdrawal'],
    ['Cheques', 'Deposited at once: bank column. Kept: cash column, then a contra entry. Dishonoured: credit in the bank column'],
    ['Discount columns', 'Totalled and posted to the two discount accounts, never balanced'],
    ['Overdraft', 'A credit balance of the bank column: c/d on the debit side'],
    ['Fixed cash balance', 'Deposit the excess; withdraw the shortfall, even into an overdraft'],
  ],
  'Summary table of Part 2: the three columns, contra entries, cheques, discount columns, overdraft and a fixed cash balance',
);

// ================================================================ decks
const deck1 = deck({
  part: 1,
  title: 'Cash Book — Part 1: Subsidiary Books and the Simple Cash Book',
  goals: [
    'Explain why the journal is divided into subsidiary books, state their advantages and name the books',
    'Prepare a simple (single column) cash book, balance it and explain why its balance can never be a credit balance',
    'Post the lines of a cash book to the ledger accounts using To and By and the correct side',
  ],
  slides: [
    sl('title', 'The cash book: subsidiary books and the simple cash book', {
      b: 'Part 1 — why the **journal is divided**, the **subsidiary books**, and the **simple cash book**: recording, balancing and posting.',
      v: vRoute1,
      n: 'Welcome to the chapter on the cash book. A busy firm cannot write every transaction in one journal, so the journal is divided into subsidiary books, and the cash book is the most important of them. In this part we see why the journal is divided, then build a simple cash book for an imagined hardware shop, balance it and post it to the ledger.',
    }),
    sl('concept', 'Why the journal is divided', {
      b: 'As a firm grows, hundreds of similar transactions arrive every day. One journal cannot hold them without delay and confusion, so it is **sub-divided** into **subsidiary books**, each for one class of transactions.',
      v: vOne,
      n: 'In a small firm one journal is enough. As business grows, the same kinds of transactions repeat all day, cash received, goods bought, goods sold. Writing all of them in a single journal is slow and confusing. So the journal is divided into subsidiary books, and each book takes one class of transaction. This is called the sub division of the journal.',
    }),
    sl('concept', 'Advantages of subsidiary books', {
      b: 'Dividing the journal by class of transaction gives these gains.',
      v: vAdv,
      n: 'There are six main advantages. Work is divided among several clerks. Each clerk becomes a specialist in one kind of entry. Time and labour are saved because totals are posted instead of every item. Information is easy to find. Errors are traced to one book. And each clerk answers for his own book, which is an internal check on fraud.',
    }),
    sl('concept', 'The subsidiary books at a glance', {
      b: 'The **cash book** is taught in this chapter. The other books are only **named** here; Chapter 6 teaches them.',
      v: vBooks,
      n: 'Here are the subsidiary books. The cash book records every receipt and payment of cash and through the bank. Then come the purchases book, the sales book, and the purchases returns and sales returns books. The petty cash book holds small payments. Bills books are named for completeness. The journal proper takes entries that fit no other book. Chapter six teaches the books other than the cash book.',
    }),
    sl('example', 'Worked example 1: which book first records it?', {
      b: 'Udaya Pens, an imagined firm, has six transactions. Decide the **subsidiary book** in which each is **first recorded**.',
      bl: ['Cash received or paid always starts in the **cash book**.', 'Credit purchases and credit sales go to the **purchases** and **sales** books.', 'Returns have their own books; depreciation goes to the **journal proper**.'],
      v: vClassify,
      n: 'Look at the nature of each transaction. A credit sale goes to the sales book. Salaries paid in cash go to the cash book. Goods bought on credit go to the purchases book. Goods sent back to the supplier go to the purchases returns book, and goods sent back by a customer to the sales returns book. Depreciation is an adjustment, so it goes to the journal proper.',
    }),
    sl('check', 'Quick check: the first book', {
      b: 'Decide whether cash is involved.',
      chk: 'm_chk_books',
      n: 'Ask whether any cash passes in the transaction. If it does, the first record is in the cash book. If not, think of credit purchases, credit sales or returns.',
    }),
    sl('concept', 'The cash book: two roles in one book', {
      b: 'The **cash book** records every receipt and payment of cash, and with the triple column form, bank items as well. It plays two roles at once.',
      v: vRoles,
      n: 'The cash book does two jobs. First, it is a book of original entry for cash. Every receipt and payment is written in it first, in date order, and not in the journal. Second, it is balanced like a ledger account, with receipts on the debit side and payments on the credit side. So it is also the cash account, and the ledger does not keep another one.',
    }),
    sl('concept', 'Format of the simple cash book', {
      b: 'A **simple cash book** has one money column on each side. The **debit side** holds the receipts and the **credit side** the payments. Each side has date, particulars, ledger folio and amount.',
      v: vFormat,
      n: 'The simple cash book is drawn with two sides. The left side is the debit side for receipts. The right side is the credit side for payments. Each side has a date, a particulars column, a ledger folio column and one amount column. The first line on the debit side is the cash in hand at the start, written as To Balance brought down.',
    }),
    sl('concept', 'Rules for recording', {
      b: 'Every line names the **other account** of the transaction. The ledger folio is filled in after the line is **posted**.',
      v: vRules,
      n: 'Follow three rules. Receipts go on the debit side, and the particulars begin with the word To followed by the other account, for example To Sales or To a debtor. Payments go on the credit side with the word By and the other account. Cash already in hand at the start is the first debit line, To Balance brought down.',
    }),
    sl('example', 'Worked example 2: recording and balancing', {
      b: `**Kundan Hardware**, an imagined shop, had cash of ${rs(SC.open.cash)} on 1 June 2027. Its cash transactions for June are entered and balanced here. The closing cash is ${rs(SCB.cash)}.`,
      bl: [`Debit side: opening cash and the receipts add up to ${rs(rcptTotal)}.`, `Credit side: payments of ${rs(payTotal)} and the balance c/d of ${rs(SCB.cash)}.`],
      v: vSCB,
      n: `Kundan Hardware starts June with ${rupees(SC.open.cash)} in hand. The receipts, with the opening cash, come to ${rupees(rcptTotal)}. The payments come to ${rupees(payTotal)}. The difference of ${rupees(SCB.cash)} is written on the credit side as balance carried down, so both sides total ${rupees(SCB.totalCash)}. It is brought down on the debit side on the first of July.`,
    }),
    sl('concept', 'Balancing the cash book', {
      b: 'The cash book is balanced at the end of each period, as a ledger account is. The balance is **always a debit balance** or nil.',
      v: vSteps1,
      n: 'To balance the cash book, total each side in rough. Find the difference. Write it on the credit side as balance carried down, so the two sides become equal. Write the same total on both sides on the same line. Then bring the balance down on the debit side below the totals. That is the cash in hand at the start of the next period.',
    }),
    sl('check', 'Quick check: where does the balance go?', {
      b: 'Recall the side of balance c/d and of balance b/d.',
      chk: 'fb_chk_cashbal',
      n: 'The cash in hand is a debit balance, so the carried down line is on the smaller side, which is the credit side, and the brought down line is on the debit side.',
    }),
    sl('concept', 'Cash can never be a credit balance', {
      b: 'A shop cannot pay out more cash than it holds. If the credit side is larger than the debit side, there is **a mistake in the entries**.',
      v: vNoCredit,
      n: 'Cash paid out can never be more than the cash held plus the cash received. So the debit side of the cash book is never smaller than the credit side. If it seems so, a receipt has been left out or put on the wrong side, a payment has been entered twice or too high, or the opening cash was forgotten. Recheck the entries.',
    }),
    sl('concept', 'Posting the cash book to the ledger', {
      b: 'The cash book is itself the Cash A/c, so **only the other accounts** are posted. A **receipt** is **credited** to the other account as **By Cash A/c**; a **payment** is **debited** to it as **To Cash A/c**.',
      v: vPost,
      n: 'Every line of the cash book is posted to the ledger account named in its particulars. A receipt was a debit in the cash book, so the other account is credited, and the entry reads By Cash. A payment was a credit in the cash book, so the other account is debited, and the entry reads To Cash. No account is opened for cash itself.',
    }),
    sl('example', 'Worked example 3: posting a debtor\'s account', {
      b: `Anil Rao owed Kundan Hardware ${rs(10000)} on 1 June 2027, and bought goods worth ${rs(4800)} on credit on 2 June (entered in the sales book). He paid ${rs(6200)} in cash on 8 June. Post his account and balance it.`,
      bl: ['Opening balance and the credit sale go on the **debit** side.', 'The cash received goes on the **credit** side, **By Cash A/c**.', `The balance is a debit balance of ${rs(SC_ANIL.balance)}.`],
      v: vAnil,
      n: `Anil Rao is a debtor, so his account opens with a debit balance of ten thousand rupees. The credit sale of ${rupees(4800)} is a further debit. The cash book shows that he paid ${rupees(6200)}, so his account is credited, and the entry reads By Cash. The credit side is smaller, so a balance of ${rupees(SC_ANIL.balance)} is carried down on it, and he still owes that amount.`,
    }),
    sl('example', 'Worked example 4: posting a creditor\'s account', {
      b: `Kundan Hardware owed Mehta Suppliers ${rs(9000)} on 1 June 2027 and paid ${rs(4200)} in cash on 22 June. Post the account and balance it.`,
      bl: ['The opening balance of a creditor is on the **credit** side.', 'A payment in the cash book is posted on the **debit** side, **To Cash A/c**.'],
      v: vMehta,
      n: `Mehta Suppliers is a creditor, so the account opens on the credit side with nine thousand rupees. The cash book shows a payment of ${rupees(4200)} to the supplier. A payment is a credit in the cash book, so it is a debit here, and the entry reads To Cash. The credit side is larger, so the balance of ${rupees(-SC_MEHTA.balance)} is carried down on the debit side. The firm still owes it.`,
    }),
    sl('check', 'Quick check: posting a payment', {
      b: 'Work out the side of the other account.',
      chk: 'm_chk_posting',
      n: 'A payment is on the credit side of the cash book. Then ask which side of the other account must be written, and which word begins the particulars.',
    }),
    sl('diagram', 'Slips to avoid', {
      v: vSlips1,
      n: 'Five slips cost marks. Do not put a receipt on the credit side. Do not write the balance carried down on the debit side. Do not keep a separate cash account as well as the cash book. Do not forget to name the other account in the particulars. And do not post a payment to the credit of an expense, because an expense is always debited.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSum1,
      n: 'To sum up. The journal is divided into subsidiary books so that work is shared and totals are posted. The cash book is a book of original entry and the cash account in one. Receipts are debits with To and payments are credits with By. The balance is never a credit. In posting, a receipt credits the other account and a payment debits it.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Write the **opening cash** as the first debit line, **To Balance b/d**.',
        'Name the **other account** with **To** or **By** on every line.',
        'Balance c/d goes on the **credit** side; show **equal totals** and **b/d** below.',
        'To post, **receipt = credit** the other account, **payment = debit** it.',
        'If your cash balance is a credit, recheck the entries before moving on.',
      ],
      n: 'Examiners give marks for entering the opening balance, the receipts, the payments, the balance carried down, the equal totals and the postings. Common slips are putting a receipt on the credit side, forgetting the balance brought down, and naming the wrong account. If cash comes out negative, go back and find the mistake.',
    }),
  ],
});

const deck2 = deck({
  part: 2,
  title: 'Cash Book — Part 2: Triple Column Cash Book, Contra Entries and a Fixed Cash Balance',
  goals: [
    'Prepare a triple column cash book with discount, cash and bank columns, using contra entries and treating cheques correctly',
    'Total the discount columns and post them; post individual lines to personal accounts; show a bank overdraft as a credit balance',
    'Maintain a definite cash balance at the end of each day by depositing the excess or withdrawing the shortfall',
  ],
  slides: [
    sl('title', 'The triple column cash book', {
      b: 'Part 2 — **discount, cash and bank columns**, **contra entries**, **cheques**, **overdraft** and keeping a **definite cash balance**.',
      v: vRoute2,
      n: 'In part two the firm has a bank account, and gives and receives discount. The cash book grows a discount column and a bank column on each side, and a new kind of entry appears, the contra entry. We deal with cheques, balancing, the posting of discount, an overdraft at the bank, and keeping a fixed balance of cash, all with imagined firms.',
    }),
    sl('concept', 'The three money columns', {
      b: 'The **triple column cash book** has a **discount**, a **cash** and a **bank** column on each side. Discount **allowed** is on the debit side and discount **received** on the credit side.',
      v: vFormat2,
      n: 'Each side of the triple column cash book has three money columns. They are discount, cash and bank. On the debit side the discount column holds discount allowed, and on the credit side it holds discount received. The first line shows the opening cash and the opening bank balance. A payment by cheque goes to the bank column, and a payment in notes to the cash column.',
    }),
    sl('concept', 'Discount allowed and discount received', {
      b: 'A **debtor** who pays early may be **allowed** a discount, a loss for the firm. A **creditor** who is paid early may **allow** the firm a discount, a gain.',
      v: vDisc,
      n: 'Discount allowed is given to a debtor who pays early. It is a loss, and it stands on the debit side of the cash book. Discount received comes from a creditor whom the firm pays early. It is a gain, and it stands on the credit side. In the personal account of the debtor the discount is a credit, and in that of the creditor it is a debit.',
    }),
    sl('concept', 'Contra entries', {
      b: 'A **contra entry** is a transaction that affects both the **cash** and the **bank** column, so it appears on **both sides**. It is marked **C** in the folio column and is **not posted**.',
      v: vContra,
      n: 'A contra entry moves money between cash and bank inside the same book. When cash is deposited, the bank column is debited and the cash column is credited. When cash is withdrawn for use in the office, the cash column is debited and the bank column is credited. Both lines are marked with the letter C, and neither is posted to a ledger account.',
    }),
    sl('example', 'Worked example 1: the first three entries', {
      b: `**Bhavna Electricals**, an imagined firm, has ${rs(TC.open.cash)} in cash and ${rs(TC.open.bank)} at the bank on 1 November 2027. It receives a cheque for ${rs(TC.items[1].bank)} from Rohit Jain, after allowing him ${rs(TC.items[1].disc)} discount, and deposits it. It pays Sumit Traders ${rs(TC.items[2].bank)} by cheque, after discount of ${rs(TC.items[2].disc)}.`,
      bl: ['Receipt: **To Rohit Jain** with discount allowed and the cheque in the **bank** column.', 'Payment: **By Sumit Traders** with discount received and the cheque in the **bank** column.'],
      v: vFirst,
      n: `The cheque from Rohit Jain was deposited at once, so it goes in the bank column on the debit side, with the discount of ${rupees(TC.items[1].disc)} in the discount column beside it. The payment to Sumit Traders is by cheque, so it goes in the bank column on the credit side, with discount received of ${rupees(TC.items[2].disc)}. The cash column is not touched by either.`,
    }),
    sl('check', 'Quick check: a cheque kept for three days', {
      b: 'Think about where the cheque is until it is paid in.',
      chk: 'm_chk_contra',
      n: 'The cheque was first entered in one column. When it is paid in, it moves to another. Decide which two columns are affected and on which sides.',
    }),
    sl('concept', 'Cheques: three cases', {
      b: 'The column depends on whether the firm **holds the cheque** or the **bank holds it**.',
      v: vCheques,
      n: 'There are three cases. A cheque deposited on the day it is received goes straight to the bank column on the debit side. A cheque kept in the drawer is treated like cash in hand, so it goes first to the cash column, and a contra entry moves it to the bank column on the day it is deposited. A cheque that is later dishonoured is taken out of the bank column.',
    }),
    sl('example', 'Worked example 2: a cheque not deposited the same day', {
      b: `On 8 November Bhavna Electricals receives a cheque for ${rs(chq.cash)} from Karan Mehra and keeps it. It is paid into the bank on 12 November and returned unpaid on 21 November.`,
      bl: ['8 Nov: **To Karan Mehra** in the **cash** column.', '12 Nov: **contra entry**; bank column debited, cash column credited.', '21 Nov: **By Karan Mehra** in the **bank** column.'],
      v: vNotDep,
      n: `On the eighth of November the cheque of ${rupees(chq.cash)} is entered in the cash column on the debit side. On the twelfth it is paid in, so a contra entry credits the cash column and debits the bank column. On the twenty first the bank returns the cheque, so the bank column is credited against Karan Mehra. The cash and bank columns for this cheque are now both nil.`,
    }),
    sl('concept', 'A dishonoured cheque', {
      b: 'When the bank returns a deposited cheque **unpaid**, the receipt is **cancelled**: the bank column is **credited** and the customer is **debited** again in the ledger.',
      v: vDish,
      n: 'A dishonoured cheque is as if the money had never arrived. In the cash book the amount is entered on the credit side in the bank column, with the customer named. In the ledger the customer is debited again, so that he is once more a debtor for the cheque. Any further charge by the bank is entered separately as bank charges.',
    }),
    sl('concept', 'Balancing the triple column cash book', {
      b: 'Cash and bank are **balanced separately**. The **discount columns** are **only totalled**: the two totals are not equal and nothing is carried down.',
      v: vSteps2,
      n: 'Total the cash column and the bank column on each side. Find the balance of each. The cash balance is always carried down on the credit side. The bank balance is carried down on the credit side if it is favourable, and on the debit side if it is an overdraft. The cash and bank totals then agree. The discount columns are only totalled, and not balanced.',
    }),
    sl('example', 'Worked example 3: a month of the triple column cash book', {
      b: `Bhavna Electricals, November 2027: the complete cash book. Closing cash is ${rs(TCB.cash)} and closing bank is ${rs(TCB.bank)}. Discount allowed totals ${rs(TCB.discAllowed)} and discount received ${rs(TCB.discReceived)}.`,
      bl: [`Cash column total ${rs(TCB.totalCash)} and bank column total ${rs(TCB.totalBank)} on each side.`, 'The deposit of the cheque and the withdrawal for the office are contra entries.'],
      v: vTCB,
      n: `For the month, the cash column on each side totals ${rupees(TCB.totalCash)} and the bank column ${rupees(TCB.totalBank)}. Cash of ${rupees(TCB.cash)} and bank balance of ${rupees(TCB.bank)} are carried down on the credit side. The discount columns are not equal. Discount allowed is ${rupees(TCB.discAllowed)} and discount received is ${rupees(TCB.discReceived)}. They are totalled and posted.`,
    }),
    sl('check', 'Quick check: the bank balance', {
      b: 'Include the contra entry in the bank column only once.',
      chk: 'n_chk_bank',
      n: 'The bank column takes the opening balance, the cheque deposited, the cash deposited, and less the cheque paid. Cash sales do not enter the bank column.',
    }),
    sl('concept', 'Posting the discount columns', {
      b: 'At the month end the two discount columns are **totalled**. The debit total is posted to the **debit** of **Discount Allowed A/c** and the credit total to the **credit** of **Discount Received A/c**, both as **Sundries as per Cash Book**.',
      v: vDiscPost,
      n: `The total of the debit discount column, ${rupees(TCB.discAllowed)}, is posted to the debit of the Discount Allowed account, as to Sundries as per the cash book. The total of the credit discount column, ${rupees(TCB.discReceived)}, is posted to the credit of the Discount Received account. Each is posted once. The individual discounts are posted to the personal accounts.`,
    }),
    sl('concept', 'Posting personal accounts: a debtor with discount', {
      b: `Rohit Jain owed ${rs(10000)}. The cash book shows ${rs(9600)} by cheque and ${rs(400)} discount, so his account is credited with **both**, By Bank A/c and By Discount Allowed A/c, and closes.`,
      v: vRohit,
      n: `Rohit Jain owed ten thousand rupees. He paid ${rupees(TC_ROHIT.balance + 9600)} by cheque, and the firm allowed discount of ${rupees(400)}. His account is credited twice. First by Bank, then by Discount Allowed. The credit side then equals the debit side, so the debtor is settled in full and the account shows no balance.`,
    }),
    sl('concept', 'The bank overdraft', {
      b: 'An **overdraft** is a facility by which the bank lets the firm pay out more than it has deposited. In the cash book it is a **credit balance** of the bank column.',
      v: vOD,
      n: 'An overdraft means the firm has paid out more through the bank than it paid in, and the bank has lent the difference. So the bank column has a credit balance. If an overdraft exists at the start, it is written on the credit side as By Balance brought down. At the end it is carried down on the debit side, and brought down on the credit side.',
    }),
    sl('example', 'Worked example 4: a month ending in an overdraft', {
      b: `**Wazir Cycle Mart**, an imagined firm, had ${rs(OD.open.cash)} in cash and a bank overdraft of ${rs(-OD.open.bank)} on 1 December 2027. By 31 December the overdraft has grown to ${rs(-ODB.bank)}.`,
      bl: [`Opening overdraft: **By Balance b/d** ${inr(-OD.open.bank)} on the credit side.`, `Closing overdraft: **To Balance c/d** ${inr(-ODB.bank)} on the debit side.`, `Cash c/d is ${rs(ODB.cash)}.`],
      v: vODB,
      n: `The month begins with an overdraft of ${rupees(-OD.open.bank)}, written on the credit side. The cheques paid and the bank charges push it up. The debit side of the bank column is smaller than the credit side, so the balance of ${rupees(-ODB.bank)} is carried down on the debit side, and brought down on the credit side. Cash in hand is ${rupees(ODB.cash)}.`,
    }),
    sl('concept', 'Keeping a definite cash balance', {
      b: 'Some firms hold a **fixed amount of cash** at the close of each day and bank the rest. Each day a **contra entry** restores the balance. With an **overdraft facility** the withdrawal can exceed the bank balance.',
      v: vFixed,
      n: 'A firm may decide to keep a fixed amount of cash at the close of every day, to limit the cash on the premises. If the cash column is above the fixed amount, the excess is deposited in the bank. If it is below, the shortfall is withdrawn from the bank. If the bank has too little, the withdrawal creates an overdraft, which the bank column shows as a credit balance.',
    }),
    sl('example', 'Worked example 5: two days with a fixed balance', {
      b: `**Pranav Bicycles**, an imagined firm, keeps ${rs(FX.target)} in hand at the close of each day. On 10 January the cash is ${rs(FX1.cashBefore)} before banking, so ${rs(FX1.item.amt)} is deposited. On 11 January it is ${rs(FX2.cashBefore)}, so ${rs(FX2.item.amt)} is withdrawn and the bank column falls to an overdraft of ${rs(-FX2.bankAfter)}.`,
      v: vFXB,
      n: `On the first day the cash column stands at ${rupees(FX1.cashBefore)}, so ${rupees(FX1.item.amt)} is deposited and ${rupees(FX.target)} remains. On the second day the cash column stands at only ${rupees(FX2.cashBefore)}. The shortfall of ${rupees(FX2.item.amt)} is withdrawn from the bank, which has only ${rupees(FX2.bankBefore)}, so the bank column shows an overdraft of ${rupees(-FX2.bankAfter)}.`,
    }),
    sl('check', 'Quick check: fixed cash balance', {
      b: 'Decide what happens to cash above the fixed amount.',
      chk: 'tf_chk_fixed',
      n: 'The excess cash leaves the cash column and enters the bank column. Think of which kind of entry has a line on both sides.',
    }),
    sl('diagram', 'Slips to avoid', {
      v: vSlips2,
      n: 'Five slips are common. A deposit entered on one side only. A cheque not yet deposited put in the bank column. The discount columns balanced and carried down. An overdraft carried down on the credit side, when it belongs on the debit side. And a dishonoured cheque left in the bank column, when it should be credited against the customer.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSum2,
      n: 'To sum up. The triple column cash book has discount, cash and bank columns. Contra entries appear on both sides and are not posted. A cheque kept in the office goes first to the cash column, and a dishonoured cheque is credited in the bank column. The discount columns are totalled and posted. An overdraft is a credit balance. A fixed cash balance is kept by contra entries.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Show **opening cash and bank**; an **overdraft** opens on the **credit** side.',
        'Enter a kept cheque in the **cash** column, then a **contra** entry.',
        'Mark every contra entry **C**; it appears on **both** sides.',
        'Balance **cash and bank separately**; only **total** the discount columns.',
        'Overdraft: **To Balance c/d** on the **debit** side.',
      ],
      n: 'Marks usually go for the opening balances, the receipts and payments in the correct columns, the contra entries, the discount columns, the balances carried down and the equal totals. Common slips are a missing second line of a contra entry, balancing the discount columns and putting an overdraft on the wrong side. Check cash never falls below nil.',
    }),
  ],
});

// ================================================================ notes
const N = notes({
  title: 'Cash Book — Notes',
  sections: [
    {
      h: '1. Sub-division of the journal: purpose and advantages',
      t: 1,
      b: 'In a business with many transactions one journal becomes too slow and too crowded. The journal is therefore **sub-divided** into **subsidiary books** (special journals), each recording one class of transactions in its own ruling. Totals of a period are then posted to the ledger.\n\n**Advantages**\n- **Division of work:** several clerks write different books together.\n- **Specialisation:** each clerk becomes skilled in one class of entry.\n- **Saving of time and labour:** totals are posted instead of every item.\n- **Easy reference:** all transactions of a class are together.\n- **Errors and fraud:** an error is searched for in one book; each clerk is answerable for his own book (internal check).\n\nThe subsidiary books are a first stage only. The ledger is still the principal book and the trial balance is still prepared from it.',
      terms: [
        ['Subsidiary books', 'Books formed by dividing the journal so that each records one class of transactions.'],
        ['Sub-division of the journal', 'Splitting the single journal into several subsidiary books.'],
        ['Internal check', 'A control by which one clerk\'s work is answerable and checked through the division of the books.'],
      ],
      v: vOne,
      vs: [vAdv],
    },
    {
      h: '2. The subsidiary books',
      t: 1,
      b: 'The books are: **cash book** (all receipts and payments, in cash and through the bank), **purchases book** (goods bought on credit), **sales book** (goods sold on credit), **purchases returns book**, **sales returns book**, **petty cash book** (small payments, imprest system), **bills receivable and bills payable books** (named only) and the **journal proper** (entries that belong to no other book: opening entries, adjustments, rectifications, closing entries).\n\nThis chapter works out the cash book. Chapter 6 teaches the petty cash book, the day books, the returns books and the journal proper.',
      terms: [
        ['Cash book', 'The subsidiary book for all cash and bank receipts and payments; it is also the Cash A/c.'],
        ['Journal proper', 'The book for entries that do not belong to any other subsidiary book.'],
      ],
      v: vBooks,
      vs: [vClassify],
    },
    {
      h: '3. The simple cash book: format and recording',
      t: 2,
      b: 'The **cash book** is both a book of original entry for cash and the Cash A/c of the ledger. No separate cash account is kept.\n\n**Format (simple, one column):** a two-sided ruling. The **debit side** holds receipts and the **credit side** payments; each side has date, particulars, ledger folio (L.F.) and an amount.\n\n**Recording:** the opening cash is the first debit line, **To Balance b/d**. Every receipt is entered on the debit side with **To** and the other account; every payment on the credit side with **By** and the other account. The L.F. is filled in after posting.',
      terms: [
        ['Simple cash book', 'A cash book with one amount column on each side, for cash only.'],
        ['Receipts', 'Cash received; entered on the debit side.'],
        ['Payments', 'Cash paid out; entered on the credit side.'],
      ],
      v: vFormat,
      vs: [vRoles, vRules, vSCB],
    },
    {
      h: '4. Balancing the simple cash book and posting it',
      t: 2,
      b: '**Balancing:** total each side in rough; the debit side (with opening cash) is the larger. Write the difference on the credit side as **By Balance c/d**; write the equal total on both sides; bring the balance down on the debit side as **To Balance b/d**.\n\n**Cash can never be a credit balance.** A firm cannot pay out more cash than it holds, so a credit balance signals a mistake: a receipt omitted, a payment overstated or entered twice, or the opening cash forgotten.\n\n**Posting:** the cash book is itself the Cash A/c, so only the other accounts are posted. A **receipt** is a debit in the cash book, so the other account is **credited** (**By Cash A/c**). A **payment** is a credit in the cash book, so the other account is **debited** (**To Cash A/c**). Expenses and incomes are posted in the same way. Personal accounts are then balanced.',
      terms: [
        ['Balance c/d', 'The balance carried down at the end of the period; for cash it is written on the credit side.'],
        ['Balance b/d', 'The same balance brought down as the opening balance of the next period.'],
      ],
      v: vNoCredit,
      vs: [vSteps1, vPost, vAnil, vMehta],
    },
    {
      h: '5. The triple column cash book and contra entries',
      t: 3,
      b: 'The **triple column cash book** has three money columns on each side: **discount**, **cash** and **bank**. **Discount allowed** (to debtors, a loss) is in the debit side discount column; **discount received** (from creditors, a gain) is in the credit side discount column.\n\nA **contra entry** is a transaction between the cash and bank columns, so it is entered on **both sides** of the same book and marked **C** in the L.F. column; it is **not posted**.\n- **Cash deposited into the bank:** bank column debited (To Cash A/c), cash column credited (By Bank A/c).\n- **Cash withdrawn from the bank for office use:** cash column debited (To Bank A/c), bank column credited (By Cash A/c).\n\nPayments and receipts by cheque go to the bank column; bank charges and interest on the bank statement are entered in the bank column on the side they affect.',
      terms: [
        ['Triple column cash book', 'A cash book with discount, cash and bank columns on each side.'],
        ['Contra entry', 'An entry that has both its lines in the cash book, one in the cash column and one in the bank column; marked C and not posted.'],
        ['Discount allowed', 'Discount given to a debtor for early payment; a loss, shown on the debit side.'],
        ['Discount received', 'Discount obtained from a creditor for early payment; a gain, shown on the credit side.'],
      ],
      v: vFormat2,
      vs: [vDisc, vContra, vFirst],
    },
    {
      h: '6. Cheques, balancing the discount columns and posting',
      t: 3,
      b: '**Cheques**\n- **Received and deposited the same day:** debit side, bank column, against the customer.\n- **Received and not deposited the same day:** debit side, **cash** column, against the customer; when it is deposited, a **contra entry** (bank column debited, cash column credited).\n- **Dishonoured** after deposit: **credit** side, **bank** column, against the customer, who is debited again in the ledger.\n\n**Balancing:** cash and bank are balanced separately and their totals agree on both sides; the cash balance c/d is on the credit side. The **discount columns are only totalled** (the two totals differ).\n\n**Posting:** the debit total goes to the **debit of Discount Allowed A/c** and the credit total to the **credit of Discount Received A/c**, as Sundries as per Cash Book. Individual lines go to the personal accounts: a debtor is credited with cash or bank received and with the discount allowed (**By Discount Allowed A/c**); a creditor is debited with the payment and the discount received (**To Discount Received A/c**).',
      terms: [
        ['Dishonoured cheque', 'A cheque returned unpaid by the bank; the receipt is cancelled by a credit in the bank column.'],
        ['Sundries as per Cash Book', 'The particulars used when a discount column total is posted to its discount account.'],
      ],
      v: vCheques,
      vs: [vNotDep, vDish, vSteps2, vTCB, vDiscPost, vRohit],
    },
    {
      h: '7. Overdraft and a definite cash balance',
      t: [3, 4],
      b: '**Bank overdraft:** a credit balance of the bank column; the firm has paid out more through the bank than it deposited. An opening overdraft is **By Balance b/d** (credit side, bank column); a closing overdraft is **To Balance c/d** on the **debit** side and brought down on the credit side. A favourable bank balance is the reverse.\n\n**Definite cash balance:** a firm may hold a fixed amount of cash at the close of each day, to limit cash on the premises, or at the end of a period. If cash is above the fixed amount, the **excess is deposited** in the bank (contra entry: bank column debited, cash column credited). If it is below, the **shortfall is withdrawn** from the bank (cash column debited, bank column credited). When the bank balance is smaller than the shortfall, the firm **avails an overdraft**, and the bank column then shows a credit balance.',
      terms: [
        ['Overdraft', 'A facility by which the bank allows the firm to pay out more than its balance; shown as a credit balance of the bank column.'],
        ['Definite cash balance', 'A fixed amount of cash kept in hand at the close of each day or period; the rest is banked.'],
      ],
      v: vOD,
      vs: [vODB, vFixed, vFXB],
    },
  ],
  tips: '**How marks are usually split (ISC Accounts)**\n- 1 mark: one correct option, a term, or the side and column of one entry.\n- 2 marks: a short explanation (why subsidiary books, what a contra entry is), or two entries such as a cheque kept and then deposited.\n- 3 marks: a short cash book to balance (simple or triple column), the posting of one or two ledger accounts, or the treatment of cheques and discount.\n- 5 marks: a full triple column cash book of about ten transactions, balanced, sometimes with the posting of the discount totals or of personal accounts.\n\n**Step marks** usually go for the opening balances on the correct sides, the receipts and the payments in the correct columns, each contra entry on both sides, the discount columns, the balances carried down (cash, bank or overdraft) and the equal totals.\n\n**Common mistakes**\n- A receipt on the credit side, or By on the debit side.\n- A deposit or withdrawal entered on one side only, or left unmarked.\n- A kept cheque entered in the bank column, or a dishonoured cheque left in it.\n- Balancing the discount columns, or posting the debit total to Discount Received A/c.\n- Carrying an overdraft down on the credit side.\n- A credit balance of cash left standing without rechecking the entries.\n\nGST is not examined in the cash book. All firms and figures in SOYL practice are imagined; the board paper will give its own.',
});

// ================================================================ flashcards
const F = cards([
  ['**Subsidiary books**', 'Books formed by dividing the journal so that each records one class of transactions.', 'definition', 1],
  ['Why is the journal sub-divided?', 'One journal cannot cope with the many similar transactions of a growing business; separate books share the work.', 'concept', 1],
  ['Name two advantages of subsidiary books', 'Division of work and saving of time (totals are posted); also specialisation, easy reference and an internal check.', 'concept', 1],
  ['Which subsidiary book records cash received from a customer?', 'The **cash book**.', 'fact', 1],
  ['Which book records goods sent back to a supplier?', 'The **purchases returns book**.', 'fact', 1],
  ['Where does depreciation first get recorded?', 'In the **journal proper**, which takes entries that fit no other book.', 'fact', 1],
  ['**Cash book**', 'The subsidiary book for all cash receipts and payments; it is also the Cash A/c, so no separate cash account is kept.', 'definition', 2],
  ['Two roles of the cash book', 'A **book of original entry** and the **Cash A/c** of the ledger.', 'concept', 2],
  ['Which side takes receipts in the cash book?', 'The **debit** side, with **To** and the other account.', 'fact', 2],
  ['Which side takes payments in the cash book?', 'The **credit** side, with **By** and the other account.', 'fact', 2],
  ['Where does the opening cash balance go?', 'First line on the debit side: **To Balance b/d**.', 'exam-tip', 2],
  ['Can cash in hand be a credit balance?', '**No.** A firm cannot pay out more cash than it holds; a credit balance signals a mistake.', 'concept', 2],
  ['Balance c/d of the cash book: which side?', 'The **credit** side, the smaller side; the b/d is then brought down on the debit side.', 'exam-tip', 2],
  ['Posting a receipt from a debtor', 'Credit the debtor: **By Cash A/c** on the credit side of his account.', 'exam-tip', 2],
  ['Posting a payment to a creditor or an expense', 'Debit the account: **To Cash A/c** on its debit side.', 'exam-tip', 2],
  ['Is a separate Cash A/c opened in the ledger?', '**No.** The cash book is itself the cash account.', 'fact', 2],
  ['**Triple column cash book**', 'A cash book with **discount**, **cash** and **bank** columns on each side.', 'definition', 3],
  ['**Discount allowed**', 'Discount given to a debtor; a loss; shown on the **debit** side.', 'definition', 3],
  ['**Discount received**', 'Discount obtained from a creditor; a gain; shown on the **credit** side.', 'definition', 3],
  ['**Contra entry**', 'An entry between the cash and bank columns, shown on **both sides**, marked **C**, not posted.', 'definition', 3],
  ['Cash deposited into the bank: entry', 'Bank column **debited** (To Cash A/c); cash column **credited** (By Bank A/c); marked C.', 'exam-tip', 3],
  ['Cash withdrawn for office use: entry', 'Cash column **debited** (To Bank A/c); bank column **credited** (By Cash A/c); marked C.', 'exam-tip', 3],
  ['Cheque received and deposited the same day', 'Debit side, **bank** column, against the customer.', 'fact', 3],
  ['Cheque received and not deposited the same day', 'Debit side, **cash** column; later a **contra entry** when it is deposited.', 'exam-tip', 3],
  ['A deposited cheque is dishonoured', '**Credit** side, **bank** column, against the customer; he is debited again in the ledger.', 'exam-tip', 3],
  ['Are the discount columns balanced?', '**No**, only totalled. The two totals differ and each is posted.', 'concept', 3],
  ['Posting the debit discount column total', '**Debit Discount Allowed A/c**, To Sundries as per Cash Book.', 'exam-tip', 3],
  ['Posting the credit discount column total', '**Credit Discount Received A/c**, By Sundries as per Cash Book.', 'exam-tip', 3],
  ['Bank overdraft in the cash book', 'A **credit balance** of the bank column: **To Balance c/d** on the **debit** side.', 'concept', 3],
  ['Opening overdraft: where is it written?', '**By Balance b/d** on the credit side, in the bank column.', 'exam-tip', 3],
  ['A definite cash balance: meaning', 'A fixed amount of cash is held at the close of each day or period and the rest is banked.', 'definition', 4],
  ['Cash above the fixed balance', 'Deposit the **excess** in the bank by a contra entry.', 'concept', 4],
  ['Cash below the fixed balance', 'Withdraw the **shortfall** from the bank by a contra entry; an overdraft arises if the bank balance is too small.', 'concept', 4],
]);
check(F.cards.length >= 28 && F.cards.length <= 35, `flashcard count ${F.cards.length}`);

// ================================================================ tests (ISC class defaults, item for item)
const T_SHORT = test({
  kind: 'short',
  blueprint: 'isc-11-default-chapter-test-short',
  title: 'Chapter test (short) — Cash Book',
  duration: 50,
  sections: [
    { id: 'A', title: 'Section A - Objective (5 marks)', instr: 'Answer all questions. Multiple-choice and assertion-reason items carry 1 mark each.', items: ['m_which_book', 'm_balance_simple', 'm_dishonour', 'm_fixed_excess', 'ar_od'] },
    { id: 'B', title: 'Section B - Short answer (4 marks)', instr: 'Answer both questions. Internal choice in the second question.', items: ['s2_cb_roles', { attempt: 1, keys: ['s2_disc_cols', 's2_fixed_meaning'] }] },
    { id: 'C', title: 'Section C - Short answer (6 marks)', instr: 'Answer both questions. Internal choice in the second question. Show the cash book in proper form.', items: ['s3_simple_cb', { attempt: 1, keys: ['s3_triple_prep', 's3_fixed_day'] }] },
    { id: 'D', title: 'Section D - Long answer (5 marks)', instr: 'Answer the question. Prepare the cash book in proper form.', items: ['l5_triple_basic'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'isc-11-default-chapter-test-long',
  title: 'Chapter test (long) — Cash Book',
  duration: 100,
  sections: [
    { id: 'A', title: 'Section A - Objective (12 marks)', instr: 'Answer all questions. Multiple-choice and assertion-reason items carry 1 mark each.', items: ['m_why_sub', 'm_cash_nocredit', 'm_post_debtor', 'm_triple_cols', 'm_contra_which', 'm_disc_post', 'm_od_meaning', 'm_notdep_why', 'm_fixed_why', 'm_fixed_short', 'ar_disc', 'ar_fixed'] },
    { id: 'B', title: 'Section B - Short answer (6 marks)', instr: 'Answer all three questions. Internal choice in the last question.', items: ['s2_sub_purpose', 's2_contra', { attempt: 1, keys: ['s2_dishonour', 's2_od_avail'] }] },
    { id: 'C', title: 'Section C - Short answer (12 marks)', instr: 'Answer all four questions. Internal choice in the last question. Show accounts and cash books in proper form.', items: ['s3_sub_classify', 's3_post_two', 's3_cheque_entries', { attempt: 1, keys: ['s3_od_book', 's3_fixed_two_days'] }] },
    { id: 'D', title: 'Section D - Long answer (10 marks)', instr: 'Answer both questions. Internal choice in the second question. Prepare the cash book in proper form.', items: ['l5_triple_od', { attempt: 1, keys: ['l5_simple_cb', 'l5_fixed_days'] }] },
  ],
});

// ================================================================ extra gates for this chapter
// 1. TTS-safe narration: words only.
for (const d of [deck1, deck2]) for (const s of d.slides) {
  const m = /[0-9₹%/&()"“”|*#+=<>]|\b[A-Z]{2,}\b|\b(?:Dr|Cr|Rs|A\/c|viz|etc|ie|eg)\b/.exec(s.narration);
  if (m) throw new Error(`narration of deck ${d.part} ${s.id} is not TTS-safe: "${m[0]}" in "${s.narration.slice(Math.max(0, m.index - 30), m.index + 30)}"`);
}
// 2. Near-duplicate stems inside the bank.
for (const d of nearDuplicates(BANK, { n: 5, threshold: 0.5, minWords: 5 })) {
  if (d.similarity >= 0.7) throw new Error(`near-duplicate stems ${d.a.id} / ${d.b.id} (${Math.round(d.similarity * 100)}%)`);
  console.log(`note: stems ${d.a.id} / ${d.b.id} are ${Math.round(d.similarity * 100)}% similar (never together in one test)`);
}
// 3. Tests: disjoint, no deck-check item, marks.
const inTest = (t) => t.sections.flatMap((s) => s.items.map((i) => i.question_id));
const shortIds = new Set(inTest(T_SHORT));
check(inTest(T_LONG).every((id) => !shortIds.has(id)), 'the two chapter tests share a question');
const deckChecks = new Set([deck1, deck2].flatMap((d) => d.slides.map((s) => s.check_question_id).filter(Boolean)));
check(deckChecks.size === 6, `deck check count ${deckChecks.size}`);
check([...shortIds, ...inTest(T_LONG)].every((id) => !deckChecks.has(id)), 'a deck-check question is used in a test');
check(T_SHORT.total_marks === 20 && T_LONG.total_marks === 40, `test marks ${T_SHORT.total_marks} / ${T_LONG.total_marks}`);
// 4. No more than two consecutive slides without a visual.
for (const d of [deck1, deck2]) {
  let run = 0;
  for (const s of d.slides) {
    run = s.visual ? 0 : run + 1;
    check(run <= 2, `deck ${d.part}: more than two slides in a row without a visual at ${s.id}`);
  }
  check(d.slides.length >= 18 && d.slides.length <= 22, `deck ${d.part} has ${d.slides.length} slides`);
}

build({
  dir: DIR,
  decks: [deck1, deck2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01-t04 of isc-11-accounts-ch05 (sub-division of the journal: purpose, advantages and the subsidiary books named; simple cash book: format, recording, balancing, posting; triple column cash book with discount, cash and bank columns, contra entries, cheques deposited the same day, not deposited the same day and dishonoured, discount columns totalled and posted, bank overdraft as a credit balance; a definite cash balance or an overdraft at the end of the day or period); no GST transactions (removed topic); petty cash book and the other subsidiary books are Chapter 6',
    originality: 'every firm, person and figure written for this chapter and labelled imagined; no ISC or CBSE textbook illustration or exercise and no CISCE specimen or board item reused; firms, figures and dates differ from the CBSE 11 Accountancy cash book chapter and from the earlier ISC 11 chapters',
    data: 'every cash book generated by cb.mjs: running cash asserted never negative, cash and bank columns equal on both sides after balancing, contra amounts equal on both sides, discount columns totalled and not balanced, bank overdraft carried down on the debit side, postings from the cash book satisfy double entry, and the fixed-balance contra entries restore the target exactly; ledger accounts from ledgerFromBook() balanced with c/d and b/d',
    facts: 'ISC Accountancy (858) Class XI Unit 3: subsidiary books, simple and triple column cash book, contra entries, discount columns, overdraft, definite cash balance; GST transactions are not examined',
    gate: 'schema, content lint (lintExemplar), deterministic verify checks, answer-leak scan, TTS-safe narration, near-duplicate stems, whole-number step marks and test disjointness run clean on this chapter',
  },
});
