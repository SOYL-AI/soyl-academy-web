// t01: cash book (simple, two-column with contra, cheques, bank charges and overdraft) and the petty cash book on the
// imprest system. Every firm and person is imagined; every derived amount is computed with books.mjs and asserted.
import { mcq, ar, tf, fb, match, ord, short, long } from '../../cbse-11-accountancy-ch01/src/lib.mjs';
import { same, sum, inr, rs, mdTable, cashBook, pettyCash, R, P, DEP, WD, V } from './figures.mjs';
import { QQ, numQ, S2, S3, L5 } from './qq.mjs';

// ================================================================ multiple choice
QQ('m_why_books', mcq({
  t: 1, d: 1, c: 'understanding',
  stem: 'The accountant of an imagined trading firm proposes to keep separate books for cash, purchases, sales and returns instead of one journal for every transaction. The main reason is that separate books',
  opts: ['let the work be divided among several staff, make each clerk a specialist and allow quick reference to one kind of transaction', 'make the ledger unnecessary', 'remove the need for a trial balance', 'ensure that no clerical error can ever occur'],
  sol: 'Dividing the work among clerks, specialising each book and saving time are the gains. These books do not replace the ledger or the trial balance, and they cannot guarantee freedom from error.',
}));
QQ('m_cb_both', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which statement about the cash book of an imagined firm is correct?',
  opts: ['It is a book of original entry and also serves as the cash account of the ledger', 'It is a ledger account only and has no original entries', 'It records only credit transactions of the firm', 'It records only transactions in which no cash is involved'],
  sol: 'Cash transactions are first entered in the cash book, and the book is balanced like the cash account, so no separate cash account is posted. It is not only a ledger and it deals with cash, not credit, transactions.',
}));
QQ('m_cb_side', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'In a cash book, cash received from a customer for goods sold on the spot is entered on the',
  opts: ['debit side, because it is a receipt', 'credit side, because it is a receipt', 'debit side, because it is a payment', 'credit side, because it is a payment'],
  sol: 'Receipts are shown on the debit side and payments on the credit side. Cash received for goods is therefore a debit entry, and it is not a payment.',
}));
QQ('m_cash_bal', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'While balancing the cash column of Mohit Gadgets, an imagined shop, the clerk finds that payments exceed receipts including the opening balance. This indicates',
  opts: ['a mistake, because the cash in hand can never be a negative balance', 'a bank overdraft', 'a credit balance to be carried down in the cash column', 'a profit for the month'],
  sol: 'A firm cannot pay out more cash than it holds, so the cash column always has a debit balance or nil. Payments above receipts mean an entry is wrong or missing. An overdraft belongs to the bank column, and a cash shortfall is not profit.',
}));
QQ('m_contra_def', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'In a two-column cash book a contra entry is one in which',
  opts: ['both the cash column and the bank column are affected, so the entry appears on both sides of the same book', 'a debtor is credited and the bank column is debited', 'only the bank column is affected', 'a nominal account is debited and a personal account is credited'],
  sol: 'A contra entry moves money between cash and bank, so it needs a line on each side of the cash book and is marked C. The other descriptions involve accounts that appear in the ledger as well.',
}));
QQ('m_contra_which', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Which of the following transactions of Tanvi Boutique, an imagined shop, is a contra entry?',
  opts: [`Cash of ${rs(15000)} deposited into the bank`, `Rent of ${rs(6000)} paid by cheque`, `Cash sales of ${rs(9000)}`, `A cheque of ${rs(20000)} received from a customer and deposited`],
  sol: 'Only the deposit of cash into the bank is an exchange between the cash and bank columns. Rent and cash sales affect one column and a nominal account, and a customer cheque affects the bank column and a personal account.',
}));
QQ('m_od', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `At the end of November the bank column of Vikram Plastics, an imagined firm, shows a credit balance of ${rs(9500)}. This means`,
  opts: [`the firm has overdrawn its bank account by ${rs(9500)}`, `the bank owes the firm ${rs(9500)}`, `the firm holds ${rs(9500)} in cash`, `cheques of ${rs(9500)} are yet to be deposited`],
  sol: 'A credit balance in the bank column means the firm has paid out more than it deposited, so the bank has lent the difference as an overdraft. A favourable balance would be a debit balance.',
}));
QQ('m_cheque', mcq({
  t: 1, d: 2, c: 'application',
  stem: `On 14 March 2027 Nisha Footwear, an imagined shop, received a cheque for ${rs(18000)} from a customer, Ajay Rao, and deposited it in the bank the same day. In the two-column cash book the entry is`,
  opts: ['a debit in the bank column, To Ajay Rao', 'a debit in the cash column, To Ajay Rao', 'a credit in the bank column, By Ajay Rao', 'a credit in the cash column, By Ajay Rao'],
  sol: 'A cheque deposited at once increases the bank balance, so the bank column is debited and the customer is credited in the ledger. The cash column is not touched, and a receipt is never entered on the credit side.',
}));
QQ('m_bank_charges', mcq({
  t: 1, d: 2, c: 'application',
  stem: `The bank charged ${rs(450)} as service charges on the current account of Omkar Stores, an imagined shop, and the firm learnt of it from the bank statement. In the two-column cash book the entry is made`,
  opts: ['on the credit side, By Bank charges, in the bank column', 'on the debit side, To Bank charges, in the bank column', 'on the credit side, By Bank charges, in the cash column', 'on the debit side, To Bank charges, in the cash column'],
  sol: 'Bank charges reduce the bank balance, so they are a payment in the bank column. No cash moves, so the cash column is untouched.',
}));
QQ('m_imprest', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Under the imprest system of petty cash, the head cashier',
  opts: ['gives the petty cashier a fixed sum and later reimburses exactly the amount spent', 'gives the petty cashier a different sum every week', 'pays all small expenses directly and keeps no petty cash', 'takes back the whole balance each week and gives nothing in return'],
  sol: 'The imprest is a fixed float. At the end of the period the amount spent is reimbursed so that the float is restored. The other options do not describe a fixed advance that is topped up.',
}));
{
  const pc = pettyCash({ imprest: 4000, vouchers: [V('1', 'Stamps', { postage: 240 }), V('2', 'Files and ink', { stationery: 860 }), V('3', 'Taxi fares', { conveyance: 410 }), V('4', 'Cartage', { cartage: 780 }), V('5', 'Refreshments', { sundries: 390 })] });
  same(pc.reimburse, 2680, 'm_petty_reimb reimbursement');
  QQ('m_petty_reimb', mcq({
    t: 1, d: 2, c: 'application',
    stem: `The imprest of Sheetal Bookshop, an imagined shop, is ${rs(4000)}. In the week the petty cashier paid ${rs(pc.byHead.postage)} on postage, ${rs(pc.byHead.stationery)} on stationery, ${rs(pc.byHead.conveyance)} on conveyance, ${rs(pc.byHead.cartage)} on cartage and ${rs(pc.byHead.sundries)} on sundries. The amount to be reimbursed is`,
    opts: [rs(pc.reimburse), rs(pc.closing), rs(4000), rs(4000 + pc.reimburse)],
    sol: `The reimbursement equals the amount spent: ${inr(pc.byHead.postage)} + ${inr(pc.byHead.stationery)} + ${inr(pc.byHead.conveyance)} + ${inr(pc.byHead.cartage)} + ${inr(pc.byHead.sundries)} = ${rs(pc.reimburse)}. ${rs(pc.closing)} is the balance still in hand, ${rs(4000)} is the imprest itself, and the last option adds two unrelated figures.`,
  }));
}
QQ('m_analytical', mcq({
  t: 1, d: 1, c: 'understanding',
  stem: 'What distinguishes an analytical petty cash book from a plain one?',
  opts: ['Extra columns that classify each payment under heads such as postage and stationery', 'It is kept by the head cashier and not by the petty cashier', 'It records only receipts', 'It is never balanced'],
  sol: 'The analysis columns split each payment by head, so each head total can be posted once. It is kept by the petty cashier, records payments as well as receipts, and is balanced each period.',
}));
{
  const imprest = 3000, inHand = 750, give = imprest - inHand;
  same(give, 2250, 'm_petty_give');
  QQ('m_petty_give', mcq({
    t: 1, d: 2, c: 'application',
    stem: `The imprest of an imagined office is ${rs(imprest)}. At the start of a week the petty cashier already has ${rs(inHand)} in hand. To bring the float to the imprest, the head cashier gives`,
    opts: [rs(give), rs(inHand), rs(imprest), rs(imprest + inHand)],
    sol: `The float must equal the imprest, so the head cashier gives ${inr(imprest)} − ${inr(inHand)} = ${rs(give)}. ${rs(inHand)} is what is already there, ${rs(imprest)} would push the float above the fixed amount, and ${rs(imprest + inHand)} would exceed it even more.`,
  }));
}
QQ('m_cash_wd', mcq({
  t: 1, d: 2, c: 'application',
  stem: `Esha Tailors, an imagined shop, withdrew ${rs(7000)} from its bank for use in the office. In the two-column cash book this is entered`,
  opts: ['as a debit in the cash column and a credit in the bank column, marked C', 'as a debit in the bank column and a credit in the cash column, marked C', 'as a debit in the cash column only', 'as a credit in the bank column only'],
  sol: 'Cash comes in (debit in the cash column) and the bank balance falls (credit in the bank column); the two lines together are a contra entry. The second option is a deposit, and the last two leave out one of the two equal lines.',
}));

// ================================================================ assertion-reason
QQ('ar_cb_both', ar({
  t: 1, d: 3, c: 'understanding', verdict: 'both-true-not-explains',
  a: 'The cash book is a book of original entry.',
  r: 'The cash book is balanced at the end of the period in the same way as a ledger account.',
  sol: 'Both statements are true. But being balanced like a ledger account is why the cash book also serves as the cash account; it does not explain why it is a book of original entry, which is because transactions are first recorded in it.',
}));
QQ('ar_cash_nocredit', ar({
  t: 1, d: 2, c: 'understanding', verdict: 'both-true-explains',
  a: 'The cash column of a cash book can never show a credit balance.',
  r: 'A firm cannot pay out more cash than it has received or holds.',
  sol: 'Both are true, and R is the reason for A: payments are limited by the cash available, so the debit side, with the opening balance, is always at least as large as the credit side.',
}));
QQ('ar_contra', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'A-false-R-true',
  a: 'Cash deposited into the bank is entered only in the bank column of the cash book.',
  r: 'The cash column and the bank column are two parts of the same cash book.',
  sol: 'A is false: a deposit is entered twice, as a credit in the cash column and a debit in the bank column (a contra entry). R is true, since both columns belong to one book, and that is why one book can show both lines.',
}));

// ================================================================ true-false, fill in the blank
QQ('tf_overdraft', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'A bank overdraft is shown in the bank column of the cash book as a debit balance.',
  sol: 'An overdraft is a credit balance in the bank column: the firm has paid out more than it deposited. It is carried down on the debit side, and the next period begins with it on the credit side.',
}));
QQ('tf_reimb', tf({
  t: 1, d: 1, c: 'understanding', ans: true,
  stem: 'On the imprest system, the sum reimbursed at the end of a period equals the total payments made by the petty cashier in that period.',
  sol: 'Reimbursing exactly what was spent restores the float to the fixed amount, so the petty cashier starts the next period with the imprest again.',
}));
QQ('fb_cb', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'The cash column of the cash book always has a ___ balance or nil, but the bank column may show a ___ balance when the firm has an overdraft.',
  acc: [['debit'], ['credit']],
  sol: 'Cash can only be a debit balance or nil, since payments cannot exceed cash held; an overdraft is a credit balance in the bank column.',
}));
QQ('fb_imprest', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'Under the ___ system the petty cashier receives a fixed sum, and at the end of the period the amount ___ is paid to him by the head cashier.',
  acc: [['imprest'], ['spent', 'reimbursed', 'expended']],
  sol: 'The imprest system gives a fixed float; the amount spent is reimbursed so the float is restored.',
}));

// ================================================================ match, ordering
QQ('mt_cb_terms', match({
  t: 1, d: 1, c: 'recall',
  stem: 'Match each term of the cash book in column A with its meaning in column B.',
  pairs: [
    ['Contra entry', 'A transaction between the cash column and the bank column, entered on both sides'],
    ['Imprest', 'The fixed sum advanced to the petty cashier'],
    ['Overdraft', 'A credit balance in the bank column'],
    ['Analysis column', 'A column that classifies each petty payment under a head'],
  ],
  sol: 'A contra entry is shown on both sides of the cash book; the imprest is the fixed float; an overdraft is a credit bank balance; an analysis column groups payments by head.',
}));
QQ('ord_imprest', ord({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Arrange the steps of one cycle of the imprest system in the correct order.',
  items: ['The head cashier gives the petty cashier the imprest', 'The petty cashier pays small expenses against vouchers', 'At the end of the period the payments are totalled and the balance found', 'The head cashier reimburses the amount spent, restoring the imprest'],
  sol: 'The float is given first, spent against vouchers, totalled at the period end, and then made good by the reimbursement.',
}));
QQ('ord_balance', ord({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Arrange in order the steps of balancing the cash column of a cash book.',
  items: ['Total the debit side and the credit side separately in rough', 'Find the difference between the two totals', 'Write the difference as Balance c/d on the smaller side', 'Write the equal total on both sides and bring the balance down as Balance b/d on the other side'],
  sol: 'Rough totals come first; the difference is the balance, carried down on the smaller side so that both sides agree; the opening balance of the next period is brought down on the opposite side.',
}));

// ================================================================ numerical (all values computed)
{
  const cb = cashBook({
    open: { cash: 8000, bank: 35000 },
    items: [R('Aug 3', 'Sales A/c', 21000), R('Aug 6', 'Customer (cheque deposited)', 0, 15000), P('Aug 9', 'Wages A/c', 7500), DEP('Aug 12', 12000), WD('Aug 18', 5000), P('Aug 22', 'Electricity A/c', 0, 3200)],
  });
  same(cb.cash, 14500, 'n_cb_cash');
  QQ('n_cb_cash', numQ({
    t: 1, d: 2, c: 'application', value: cb.cash, unit: '₹',
    stem: `Isha Handicrafts, an imagined shop, had ${rs(8000)} cash in hand and ${rs(35000)} at the bank on 1 August 2026. During August it made cash sales of ${rs(21000)}, deposited a customer's cheque of ${rs(15000)} in the bank, paid wages of ${rs(7500)} in cash, deposited ${rs(12000)} of cash into the bank, withdrew ${rs(5000)} from the bank for office use and paid ${rs(3200)} for electricity by cheque. Find the closing cash balance (in ₹).`,
    sol: `Cash: ${inr(8000)} + ${inr(21000)} + ${inr(5000)} (withdrawn) − ${inr(7500)} − ${inr(12000)} (deposited) = ${rs(cb.cash)}. The cheque deposit and the electricity cheque are bank-column items.`,
  }));
}
{
  const cb = cashBook({
    open: { cash: 6000, bank: 28000 },
    items: [R('Sep 3', 'Sales A/c', 14000), R('Sep 7', 'Naveen Pillai (cheque deposited)', 0, 40000), P('Sep 11', 'Supplier (by cheque)', 0, 25000), DEP('Sep 15', 9000), P('Sep 20', 'Bank charges A/c', 0, 350), R('Sep 27', 'Interest credited by bank', 0, 1200)],
  });
  same(cb.bank, 52850, 'n_cb_bank');
  QQ('n_cb_bank', numQ({
    t: 1, d: 3, c: 'application', value: cb.bank, unit: '₹',
    stem: `Ritesh Auto Parts, an imagined shop, began September 2026 with ${rs(6000)} in cash and ${rs(28000)} at the bank. It made cash sales of ${rs(14000)}, received a cheque of ${rs(40000)} from Naveen Pillai and deposited it, paid a supplier ${rs(25000)} by cheque, deposited ${rs(9000)} of cash, was charged ${rs(350)} as bank charges and was credited ${rs(1200)} as interest by the bank. Find the bank balance at the end of September (in ₹).`,
    sol: `Bank column: debits ${inr(28000)} + ${inr(40000)} + ${inr(9000)} + ${inr(1200)} = ${inr(cb.dr.bank)}; credits ${inr(25000)} + ${inr(350)} = ${inr(cb.cr.bank)}; balance = ${rs(cb.bank)}. The cash sales and the cash column do not enter the bank balance.`,
  }));
}
{
  const cb = cashBook({
    open: { cash: 2000, bank: -15000 },
    items: [R('Oct 4', 'Sales A/c', 9000), R('Oct 8', 'Debtor (cheque deposited)', 0, 18000), DEP('Oct 12', 4000), P('Oct 16', 'Supplier (by cheque)', 0, 30000), P('Oct 24', 'Bank charges A/c', 0, 500), P('Oct 31', 'Interest on overdraft A/c', 0, 700)],
  });
  same(cb.bank, -24200, 'n_od');
  QQ('n_od', numQ({
    t: 1, d: 4, c: 'application', value: -cb.bank, unit: '₹',
    stem: `On 1 October 2026 Pallavi Books, an imagined shop, had ${rs(2000)} cash in hand and an overdraft of ${rs(15000)} at the bank. In October it made cash sales of ${rs(9000)}, deposited a debtor's cheque of ${rs(18000)}, deposited ${rs(4000)} of cash, paid a supplier ${rs(30000)} by cheque, and the bank charged ${rs(500)} as bank charges and ${rs(700)} as interest on the overdraft. Find the bank overdraft at the end of October (in ₹).`,
    sol: `Debits in the bank column: ${inr(18000)} + ${inr(4000)} = ${inr(18000 + 4000)}. Credits: ${inr(15000)} (opening overdraft) + ${inr(30000)} + ${inr(500)} + ${inr(700)} = ${inr(cb.cr.bank)}. Credits exceed debits by ${rs(-cb.bank)}, which is the closing overdraft.`,
  }));
}
{
  const pc = pettyCash({ imprest: 3000, vouchers: [V('Mar 1', 'Stamps', { postage: 120 }), V('Mar 1', 'Notebooks', { stationery: 275 }), V('Mar 2', 'Auto fare', { conveyance: 95 }), V('Mar 3', 'Cartage', { cartage: 180 }), V('Mar 4', 'Cleaning cloth', { sundries: 60 }), V('Mar 5', 'Courier', { postage: 140 }), V('Mar 6', 'Refreshments', { sundries: 110 })] });
  same(pc.spent, 980, 'n_petty_spent');
  QQ('n_petty_spent', numQ({
    t: 1, d: 2, c: 'application', value: pc.spent, unit: '₹',
    stem: `The petty cashier of Rupa Cloth House, an imagined shop, started the week of 1 March 2027 with the imprest of ${rs(3000)}. He paid ${rs(120)} for stamps, ${rs(275)} for notebooks, ${rs(95)} for an auto fare, ${rs(180)} for cartage, ${rs(60)} for a cleaning cloth, ${rs(140)} for a courier and ${rs(110)} for refreshments. Find the total petty cash spent in the week (in ₹).`,
    sol: `${inr(120)} + ${inr(275)} + ${inr(95)} + ${inr(180)} + ${inr(60)} + ${inr(140)} + ${inr(110)} = ${rs(pc.spent)}. By heads: postage ${inr(pc.byHead.postage)}, stationery ${inr(pc.byHead.stationery)}, conveyance ${inr(pc.byHead.conveyance)}, cartage ${inr(pc.byHead.cartage)}, sundries ${inr(pc.byHead.sundries)}.`,
  }));
}
{
  const pc = pettyCash({ imprest: 2500, open: 300, vouchers: [V('1', 'Postage', { postage: 180 }), V('2', 'Printer paper', { stationery: 640 }), V('3', 'Cartage', { cartage: 420 }), V('4', 'Bus fares', { conveyance: 210 }), V('5', 'Sundry items', { sundries: 350 })] });
  same(pc.received, 2200, 'n_petty_reimb received');
  same(pc.reimburse, 1800, 'n_petty_reimb');
  QQ('n_petty_reimb', numQ({
    t: 1, d: 3, c: 'application', value: pc.reimburse, unit: '₹',
    stem: `Hemant Dairy, an imagined business, keeps an imprest of ${rs(2500)}. At the start of the week ${rs(300)} was in hand and the head cashier gave ${rs(pc.received)}. During the week the petty cashier paid ${rs(180)} for postage, ${rs(640)} for stationery, ${rs(420)} for cartage, ${rs(210)} for conveyance and ${rs(350)} for sundries. How much will the head cashier reimburse at the end of the week (in ₹)?`,
    sol: `Spent = ${inr(180)} + ${inr(640)} + ${inr(420)} + ${inr(210)} + ${inr(350)} = ${rs(pc.spent)}. Balance in hand = ${inr(2500)} − ${inr(pc.spent)} = ${rs(pc.closing)}. Reimbursement = ${rs(pc.reimburse)}, which restores the imprest of ${rs(2500)}.`,
  }));
}

// ================================================================ short answer, 2 marks
QQ('s2_why_books', short({
  t: 1, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'Give any two advantages of keeping special purpose books instead of recording every transaction in one journal.',
  model: '1. **Division of work and specialisation:** different clerks handle the cash book, the purchases book and so on, and each becomes skilled in one kind of entry.\n2. **Saving of time and easy reference:** like transactions are together, so totals can be posted at once and a transaction is easy to find.',
  sol: 'Any two of division of work, specialisation, time saved and easy reference.',
  scheme: [['First advantage with a reason', 1], ['Second advantage with a reason', 1]],
}));
QQ('s2_cb_dual', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Why is the cash book called both a book of original entry and a ledger?',
  model: 'Cash receipts and payments are **first entered** in the cash book, so it is a book of original entry. It is **balanced** like an account, receipts on the debit side and payments on the credit side, so it serves as the cash account and none is kept in the ledger.',
  sol: 'First entry plus the form of the cash account.',
  scheme: [['Original entry: transactions are first recorded in it', 1], ['Ledger: balanced like the cash account, so no separate cash account', 1]],
}));
QQ('s2_contra', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is a contra entry? Give two examples from the cash book of an imagined firm.',
  model: 'A **contra entry** is a transaction in which both the cash and the bank columns are affected, so it appears on both sides of the cash book and is marked C. Examples: cash deposited into the bank; cash withdrawn from the bank for use in the office.',
  sol: 'Meaning with two examples.',
  scheme: [['Meaning: affects both columns, shown on both sides, marked C', 1], ['Two examples', 1]],
}));
QQ('s2_od', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is a bank overdraft, and how does the two-column cash book show it?',
  model: 'An **overdraft** is a facility in which the bank lets the firm pay out more than its balance, so the firm owes the bank. In the cash book it is a **credit balance** in the bank column, carried down on the debit side and brought down on the credit side.',
  sol: 'Meaning and the credit balance.',
  scheme: [['Meaning of overdraft', 1], ['Credit balance in the bank column, carried down on the debit side', 1]],
}));
QQ('s2_imprest', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: `Explain the imprest system of petty cash. Take an imagined imprest of ${rs(2000)} and ${rs(1350)} spent in a week.`,
  model: `Under the **imprest system** the head cashier gives the petty cashier a fixed sum, the imprest, and later reimburses the amount spent. With an imprest of ${rs(2000)} and ${rs(1350)} spent, the balance in hand is ${rs(2000 - 1350)}; the head cashier reimburses ${rs(1350)} and the float is again ${rs(2000)}.`,
  sol: 'Fixed float, reimbursement of the amount spent.',
  scheme: [['Meaning: fixed sum, amount spent reimbursed', 1], [`Illustration: balance ${rs(650)}, reimbursement ${rs(1350)}`, 1]],
}));
same(2000 - 1350, 650, 's2_imprest balance');

// ================================================================ short answer, 3 marks
{
  const cb = cashBook({
    open: { cash: 12000, bank: 0 },
    items: [R('May 2', 'Sales A/c', 16000), P('May 5', 'Purchases A/c', 9000), P('May 9', 'Rent A/c', 4000), R('May 15', 'Commission A/c', 2500), P('May 20', 'Salaries A/c', 6500), P('May 24', 'Stationery A/c', 700)],
    openDate: 'May 1', closeDate: 'May 31',
  });
  same(cb.cash, 12000 + 16000 + 2500 - 9000 - 4000 - 6500 - 700, 's3_simple_cb');
  same(cb.cash, 10300, 's3_simple_cb closing');
  // simple cash book: cash column only
  const rows = cb.rows.map((r) => [r[0], r[1], r[2], r[4], r[5], r[6]]);
  QQ('s3_simple_cb', short({
    t: 1, d: 3, c: 'application', marks: 3,
    stem: `Prepare a simple cash book (cash column only) of Gulab Gift Shop, an imagined shop, for May 2026 and balance it: opening cash ${rs(12000)}; May 2 cash sales ${rs(16000)}; May 5 goods bought for cash ${rs(9000)}; May 9 rent paid ${rs(4000)}; May 15 commission received ${rs(2500)}; May 20 salaries paid ${rs(6500)}; May 24 stationery bought ${rs(700)}.`,
    model: `${mdTable(['Date', 'Dr: Particulars', 'Cash (₹)', 'Date', 'Cr: Particulars', 'Cash (₹)'], rows)}\n\nThe cash balance is a debit balance of **${rs(cb.cash)}**, brought down on 1 June.`,
    sol: 'Debit side receipts with opening balance; credit side payments; balance carried down.',
    scheme: [['Receipts entered on the debit side with the opening balance', 1], ['Payments entered on the credit side', 1], [`Balanced: ${rs(cb.cash)} carried down and both totals equal`, 1]],
  }));
}
QQ('s3_classify', short({
  t: 1, d: 3, c: 'application', marks: 3,
  stem: `For each transaction of Dhara Pharma, an imagined chemist, name the column and the side of the two-column cash book on which it is entered: (a) cash ${rs(10000)} deposited into the bank; (b) ${rs(7500)} withdrawn from the bank for office use; (c) bank charges of ${rs(300)} shown in the bank statement.`,
  model: `${mdTable(['Transaction', 'Debit side', 'Credit side'], [
    ['(a) Cash deposited into the bank (contra, C)', `Bank column: To Cash A/c, ${inr(10000)}`, `Cash column: By Bank A/c, ${inr(10000)}`],
    ['(b) Withdrawn from the bank for office use (contra, C)', `Cash column: To Bank A/c, ${inr(7500)}`, `Bank column: By Cash A/c, ${inr(7500)}`],
    ['(c) Bank charges', '', `Bank column: By Bank charges A/c, ${inr(300)}`],
  ])}`,
  sol: 'Contra entries have a line on each side; bank charges have one line on the credit side.',
  scheme: [['(a) both lines with columns and sides', 1], ['(b) both lines with columns and sides', 1], ['(c) credit side, bank column', 1]],
}));
{
  const pc = pettyCash({
    imprest: 1500,
    vouchers: [V('Jan 4', 'Stamps', { postage: 90 }), V('Jan 4', 'Pencils', { stationery: 75 }), V('Jan 5', 'Rickshaw fare', { conveyance: 60 }), V('Jan 6', 'Cartage on parcels', { cartage: 210 }), V('Jan 7', 'Postal envelopes', { postage: 130 }), V('Jan 8', 'Tea for staff', { sundries: 85 })],
  });
  same(pc.byHead.postage, 220, 's3_petty postage');
  same(pc.spent, 650, 's3_petty total');
  same(pc.closing, 850, 's3_petty balance');
  QQ('s3_petty_analysis', short({
    t: 1, d: 3, c: 'application', marks: 3,
    stem: `The petty cashier of Mahesh Agencies, an imagined firm, had an imprest of ${rs(1500)} in January 2027 and paid: Jan 4 stamps ${rs(90)}; Jan 4 pencils ${rs(75)}; Jan 5 rickshaw fare ${rs(60)}; Jan 6 cartage on parcels ${rs(210)}; Jan 7 postal envelopes ${rs(130)}; Jan 8 tea for staff ${rs(85)}. Find the total under each of the heads postage, stationery, conveyance, cartage and sundries, the total spent, the balance in hand and the amount to be reimbursed.`,
    model: `${mdTable(['Head', 'Amount (₹)'], [['Postage (90 + 130)', inr(pc.byHead.postage)], ['Stationery', inr(pc.byHead.stationery)], ['Conveyance', inr(pc.byHead.conveyance)], ['Cartage', inr(pc.byHead.cartage)], ['Sundries', inr(pc.byHead.sundries)], ['**Total spent**', `**${inr(pc.spent)}**`]])}\n\nBalance in hand = ${inr(1500)} − ${inr(pc.spent)} = **${rs(pc.closing)}**; reimbursement = **${rs(pc.reimburse)}**.`,
    sol: 'Group the vouchers by head, total them, then balance and reimburse.',
    scheme: [['Vouchers classified under the five heads', 1], [`Total spent ${rs(pc.spent)}`, 1], [`Balance ${rs(pc.closing)} and reimbursement ${rs(pc.reimburse)}`, 1]],
  }));
}

// ================================================================ long answer, 5 marks
{
  const cb = cashBook({
    open: { cash: 18000, bank: 45000 }, openDate: 'May 1', closeDate: 'May 31',
    items: [
      R('May 2', 'Sales A/c', 22000), R('May 4', 'Kunal Mehra (cheque deposited)', 0, 30000), P('May 6', 'Rent A/c', 0, 9000),
      DEP('May 9', 15000), P('May 12', 'Purchases A/c', 11000), WD('May 15', 8000), P('May 20', 'Wages A/c', 7000),
      P('May 24', 'Lal and Sons (by cheque)', 0, 26000), P('May 28', 'Bank charges A/c', 0, 250),
    ],
  });
  same(cb.cash, 15000, 'l5_cb2 cash');
  same(cb.bank, 46750, 'l5_cb2 bank');
  QQ('l5_cb2', long({
    t: 1, d: 3, c: 'application', marks: 5,
    stem: `From the following transactions of Yamini Garments, an imagined firm, prepare a two-column cash book (cash and bank) for May 2026 and balance it. May 1: cash ${rs(18000)}, bank ${rs(45000)}. May 2: cash sales ${rs(22000)}. May 4: received a cheque of ${rs(30000)} from Kunal Mehra and deposited it. May 6: paid rent ${rs(9000)} by cheque. May 9: deposited ${rs(15000)} of cash into the bank. May 12: bought goods for cash ${rs(11000)}. May 15: withdrew ${rs(8000)} from the bank for office use. May 20: paid wages ${rs(7000)} in cash. May 24: paid Lal and Sons ${rs(26000)} by cheque. May 28: bank charges ${rs(250)} debited by the bank.`,
    model: `${cb.md}\n\nClosing balances: cash ${rs(cb.cash)} (debit), bank ${rs(cb.bank)} (debit). Contra entries are marked C and appear on both sides.`,
    sol: 'Receipts with opening balances on the debit side, payments on the credit side, contra entries on both sides, balanced column by column.',
    scheme: [['Debit side: opening balances and receipts in the correct columns', 1], ['Credit side: payments in the correct columns', 1], ['Both contra entries on both sides and marked C', 1], [`Cash balance ${rs(cb.cash)}`, 1], [`Bank balance ${rs(cb.bank)} and equal totals`, 1]],
  }));
}
{
  const cb = cashBook({
    open: { cash: 4000, bank: -20000 }, openDate: 'Aug 1', closeDate: 'Aug 31',
    items: [
      R('Aug 3', 'Sales A/c', 25000), R('Aug 5', 'Gopal Nair (cheque deposited)', 0, 35000), DEP('Aug 8', 18000),
      P('Aug 11', 'Supplier (by cheque)', 0, 40000), P('Aug 14', 'Salaries A/c', 6000), WD('Aug 18', 5000),
      P('Aug 22', 'Interest on overdraft A/c', 0, 900), P('Aug 26', 'Purchases A/c', 8000),
    ],
  });
  same(cb.cash, 2000, 'l5_cb_od cash');
  same(cb.bank, -12900, 'l5_cb_od bank');
  QQ('l5_cb_od', long({
    t: 1, d: 4, c: 'application', marks: 5,
    stem: `Prepare the two-column cash book of Bhavna Optics, an imagined shop, for August 2026 and find the closing balances. Aug 1: cash ${rs(4000)}; the bank account was overdrawn by ${rs(20000)}. Aug 3: cash sales ${rs(25000)}. Aug 5: received a cheque of ${rs(35000)} from Gopal Nair and deposited it. Aug 8: deposited ${rs(18000)} of cash into the bank. Aug 11: paid a supplier ${rs(40000)} by cheque. Aug 14: paid salaries ${rs(6000)} in cash. Aug 18: withdrew ${rs(5000)} from the bank for office use. Aug 22: the bank debited ${rs(900)} as interest on the overdraft. Aug 26: bought goods for cash ${rs(8000)}.`,
    model: `${cb.md}\n\nThe cash balance is ${rs(cb.cash)} (debit). The bank column has a **credit balance** of ${rs(-cb.bank)}: the account is still overdrawn, so it is carried down on the debit side as To Balance c/d.`,
    sol: 'The opening overdraft is a credit entry in the bank column; the closing overdraft is carried down on the debit side.',
    scheme: [['Opening cash on the debit side and the opening overdraft on the credit side of the bank column', 1], ['Receipts and payments in the correct columns and sides', 1], ['Two contra entries on both sides', 1], [`Cash balance ${rs(cb.cash)}`, 1], [`Bank overdraft ${rs(-cb.bank)} carried down on the debit side and equal totals`, 1]],
  }));
}
{
  const pc = pettyCash({
    imprest: 2500, startDate: 'Aug 3', closeDate: 'Aug 8', nextDate: 'Aug 10',
    vouchers: [
      V('Aug 3', 'Stamps', { postage: 180 }), V('Aug 3', 'Registers and pens', { stationery: 460 }), V('Aug 4', 'Taxi fare', { conveyance: 140 }),
      V('Aug 4', 'Cartage on cartons', { cartage: 310 }), V('Aug 5', 'Tea and snacks', { sundries: 95 }), V('Aug 6', 'Courier', { postage: 220 }),
      V('Aug 7', 'Cartage inward', { cartage: 270 }), V('Aug 8', 'Rickshaw fare', { conveyance: 120 }),
    ],
  });
  same(pc.spent, 1795, 'l5_petty spent');
  same(pc.closing, 705, 'l5_petty closing');
  QQ('l5_petty', long({
    t: 1, d: 3, c: 'application', marks: 5,
    stem: `Farida Pharmacy, an imagined chemist, keeps an analytical petty cash book on the imprest system. On 3 August 2026 the head cashier gave the petty cashier the imprest of ${rs(2500)}. Payments: Aug 3 stamps ${rs(180)}; Aug 3 registers and pens ${rs(460)}; Aug 4 taxi fare ${rs(140)}; Aug 4 cartage on cartons ${rs(310)}; Aug 5 tea and snacks ${rs(95)}; Aug 6 courier charges ${rs(220)}; Aug 7 cartage inward ${rs(270)}; Aug 8 rickshaw fare ${rs(120)}. The head cashier reimbursed the amount spent on 10 August. Prepare the petty cash book with columns for postage, stationery, conveyance, cartage and sundries.`,
    model: `${pc.md}\n\nTotal spent ${rs(pc.spent)}; balance c/d ${rs(pc.closing)}; the reimbursement of ${rs(pc.reimburse)} on 10 August restores the imprest to ${rs(2500)}.`,
    sol: 'Receipt of the imprest, vouchers analysed under heads, totals, balance and reimbursement.',
    scheme: [['Receipt of the imprest on the receipts side', 1], ['Each payment in the total column and under the right head', 1], [`Head totals and total payments ${rs(pc.spent)}`, 1], [`Balance c/d ${rs(pc.closing)} and equal totals`, 1], [`Reimbursement ${rs(pc.reimburse)} restoring the imprest`, 1]],
  }));
}
void sum; void WD; void DEP;
