// t04: the amended (adjusted) cash book followed by a BRS. Every amended cash book is built by recon.mjs amended()
// (bank column posted with the items that need an entry; balance asserted) and the statement after it is asserted to
// reach the pass book; the same items from the pass book are asserted to reach the amended cash book balance.
import { mcq, ar, tf, fb, short, long } from './lib.mjs';
import { same, mdTable, rs, I, L, errCB, scn } from './fig.mjs';
import { numQ, QQ } from './qq.mjs';

const R = (n) => rs(n);
const both = (s) => `${s.am.md}\n\n${s.amStmt.md}`;

// ================================================================ multiple choice
QQ('m_chk_amended', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'An imagined firm prepares an amended cash book before its reconciliation statement. Which pair of items is entered in the cash book at that stage?',
  opts: ['interest credited by the bank and bank charges debited by the bank', 'cheques issued but not presented and cheques deposited but not credited', 'cheques issued but not presented and bank charges', 'cheques deposited but not credited and interest credited by the bank'],
  sol: 'Interest and charges are known only from the pass book, so the firm writes them in the cash book. The two timing items are already in the cash book and stay in the statement; a pair that mixes a timing item with a bank item is wrong in one half.',
}));
{
  const s = scn({
    firm: 'Dinesh Optics', date: '31 July 2028', cb: 25000,
    items: [L(I('intallowed', 600), 'x'), L(I('charges', 150), 'x'), L(I('dishonour', 2000), 'x')],
  });
  same(s.am.newBal, 23450, 'm_amend_newbal');
  QQ('m_amend_newbal', mcq({
    t: 4, d: 3, c: 'application',
    stem: `The bank column of the cash book of Dinesh Optics, an imagined firm, shows ${R(25000)} on 31 July 2028. The pass book shows interest of ${R(600)} credited, charges of ${R(150)} debited and a customer\'s cheque of ${R(2000)} returned unpaid, none of which is in the cash book. The balance of the amended cash book is`,
    opts: [R(23450), R(27750), R(22250), R(27450)],
    sol: `The interest is a receipt and the charges and the returned cheque are payments: ${R(25000)} + ${R(600)} − ${R(150)} − ${R(2000)} = ${R(23450)}. Adding all three gives ${R(27750)}; deducting all three gives ${R(22250)}; adding the cheque and the interest and deducting the charges gives ${R(27450)}.`,
  }));
}
QQ('m_dishonour_side', mcq({
  t: 4, d: 3, c: 'understanding',
  stem: 'In the amended cash book of an imagined firm, a customer\'s cheque of ₹3,600 that was deposited and later returned unpaid by the bank is entered',
  opts: ['on the credit side of the bank column', 'on the debit side of the bank column', 'on the credit side of the cash column', 'only in the statement, not in the cash book'],
  sol: 'The deposit was entered as a receipt, and the return cancels it, so the bank column is credited. Writing it on the debit side would repeat the receipt; the cash column is unconnected with the bank; and the item is a bank item that does need an entry.',
}));
QQ('m_remaining', mcq({
  t: 4, d: 4, c: 'analysis',
  stem: 'A firm\'s pass book shows bank charges, a cheque of a customer returned unpaid, and two timing differences: a cheque issued but not presented, and a cheque deposited but not credited. After the cash book is amended, the statement from the amended cash book balance to the pass book balance contains',
  opts: ['the cheque issued but not presented and the cheque deposited but not credited only', 'all four items', 'the bank charges and the dishonoured cheque only', 'no item, because the books then agree'],
  sol: 'The charges and the returned cheque now stand in the amended cash book, so only the two timing differences are left. The books still differ by those, so the statement is not empty, and the entered items are not repeated in it.',
}));

// ================================================================ numerical
{
  const s = scn({
    firm: 'Ekta Lamps', date: '30 November 2028', cb: 33800,
    items: [L(I('directdep', 4500), 'x'), L(I('charges', 280), 'x'), L(I('directpay', 1600), 'x'), L(I('issued', 3900), 'x')],
  });
  QQ('n_amended_bal', numQ({
    t: 4, d: 3, c: 'application', marks: 1, value: s.am.newBal,
    stem: `The bank column of the cash book of Ekta Lamps, an imagined firm, shows ${R(33800)} on 30 November 2028. The pass book shows a direct deposit by a customer of ${R(4500)}, bank charges of ${R(280)} and a payment of ${R(1600)} on standing instruction, none yet in the cash book; cheques for ${R(3900)} issued have not been presented. The balance of the amended cash book is (in ₹)`,
    sol: `Only the three bank items are entered: ${R(33800)} + ${R(4500)} − ${R(280)} − ${R(1600)} = ${R(s.am.newBal)}; the unpresented cheques stay in the statement.`,
  }));
  same(s.am.newBal, 36420, 'n_amended_bal');
}
{
  const s = scn({
    firm: 'Faisal Rope Works', date: '28 February 2028', cb: 41200,
    items: [L(I('intallowed', 700), 'x'), L(I('charges', 200), 'x'), L(I('issued', 5800), 'x'), L(I('deposited', 3000), 'x')],
  });
  same(s.pb - s.am.newBal, 2800, 'n_after_amend');
  QQ('n_after_amend', numQ({
    t: 4, d: 4, c: 'application', marks: 1, value: s.pb - s.am.newBal,
    stem: `The bank column of the cash book of Faisal Rope Works, an imagined firm, shows ${R(41200)} on 28 February 2028. The pass book shows interest of ${R(700)} credited and charges of ${R(200)} debited, neither in the cash book; cheques for ${R(5800)} issued have not been presented and cheques for ${R(3000)} deposited have not been credited. After the cash book is amended, by how much does the pass book balance exceed the amended cash book balance (in ₹)?`,
    sol: `Only the timing items are left to bridge the amended balance to the pass book: ${R(5800)} − ${R(3000)} = ${R(2800)}.`,
  }));
}

// ================================================================ assertion-reason, true-false, fill-blank
QQ('ar_amend', ar({
  t: 4, d: 4, c: 'analysis', verdict: 'A-true-R-false',
  a: 'After a cash book has been amended for the bank items and its own errors, the remaining difference between it and the pass book is made up of timing differences and any errors made by the bank.',
  r: 'The amended cash book also contains the cheques issued but not yet presented, so these are not listed in the statement.',
  sol: 'The assertion is true: everything the firm itself failed to record has been entered. The reason is false, since the cheques issued but not presented are already in the cash book and are exactly the items that stay in the statement.',
}));
QQ('tf_chk_amend', tf({
  t: 4, d: 3, c: 'understanding', ans: false,
  stem: 'A cheque issued by an imagined firm and not yet presented for payment is entered in the amended cash book before the statement is prepared.',
  sol: 'The cheque is already in the cash book, because the firm wrote it when it issued the cheque. It is a timing difference and appears in the statement, not as a fresh entry.',
}));
QQ('tf_after_amend', tf({
  t: 4, d: 4, c: 'understanding', ans: true,
  stem: 'If the amended cash book of an imagined firm, corrected for the bank items and for its own errors, still differs from the pass book, the difference is explained by items that the firm has already entered in its cash book and by any errors in the bank\'s own records.',
  sol: 'Everything that only the bank knew of has been entered. What is left is timing differences, which are in the cash book already, and errors that the bank itself must correct.',
}));
QQ('fb_amend_side', fb({
  t: 4, d: 2, c: 'recall',
  stem: 'Interest credited by the bank is entered on the ___ side of the bank column of the amended cash book.',
  acc: [['debit', 'receipt', 'receipts']],
  sol: 'The bank credited the firm\'s account, so the firm\'s cash book records a receipt on the debit side.',
}));

// ================================================================ short answer, 2 marks
QQ('s2_amend_why', short({
  t: 4, d: 2, c: 'understanding', marks: 2,
  stem: 'Why is an amended (adjusted) cash book prepared before the bank reconciliation statement, and which items are entered in it?',
  model: 'The cash book must first record the items that the **firm itself has not yet entered** and that the bank has already acted on, so that its balance is correct and the statement contains only the true timing differences.\n\nItems entered are: **bank charges, interest, direct deposits, direct payments, dividends collected, cheques returned unpaid** and the **correction of errors** in the cash book itself.',
  sol: 'Bring the cash book up to date first; then list only what is still in the cash book and not in the pass book.',
  scheme: [['Purpose: cash book brought up to date so only timing differences remain', 1], ['Items entered: bank items and errors in the cash book', 1]],
}));
{
  const s = scn({
    firm: 'Nirmal Pens', date: '30 June 2028', cb: 12000,
    items: [L(I('intallowed', 340), 'Interest credited by the bank'), L(I('dishonour', 1500), 'Cheque of Shetty Stationers returned unpaid')],
  });
  QQ('s2_amend_entries', short({
    t: 4, d: 3, c: 'application', marks: 2,
    stem: `The bank column of the cash book of Nirmal Pens, an imagined firm, shows ${R(12000)} on 30 June 2028. The pass book shows interest of ${R(340)} credited by the bank and a cheque of ${R(1500)} received from Shetty Stationers and returned unpaid, neither being in the cash book. Prepare the amended cash book (bank column).`,
    model: s.am.md + `\n\nThe amended balance is ${R(s.am.newBal)}.`,
    sol: 'Interest is a receipt (debit); the returned cheque cancels a receipt (credit).',
    scheme: [['Opening balance and both entries on the correct sides', 1], ['Balance carried down and the totals equal', 1]],
  }));
  same(s.am.newBal, 10840, 's2_amend_entries');
}

// ================================================================ short answer, 3 marks
{
  const s = scn({
    firm: 'Rajhans Electricals', date: '31 May 2028', cb: 14600,
    items: [L(I('intallowed', 480), 'Interest credited by the bank'), L(I('charges', 190), 'Bank charges'), L(I('directdep', 3500), 'Direct deposit by a customer, Wadia')],
  });
  QQ('s3_amend_only', short({
    t: 4, d: 3, c: 'application', marks: 3,
    stem: `The bank column of the cash book of Rajhans Electricals, an imagined firm, shows ${R(14600)} on 31 May 2028. On checking it with the pass book the firm finds interest of ${R(480)} credited by the bank, charges of ${R(190)} debited by the bank, and a direct deposit by a customer, Wadia, of ${R(3500)}, none of which is in its cash book. Prepare the amended cash book.`,
    model: s.am.md + `\n\nThe balance of the amended cash book is ${R(s.am.newBal)}.`,
    sol: 'Receipts on the debit side, payment on the credit side; the carried down balance is the amended balance.',
    scheme: [['Opening balance and the two receipts on the debit side', 1], ['Charges on the credit side', 1], ['Balance carried down and the totals equal', 1]],
  }));
  same(s.am.newBal, 18390, 's3_amend_only');
}
{
  const s = scn({
    firm: 'Winsome Garments', date: '30 September 2028', cb: 18400,
    items: [L(I('intallowed', 360), 'Interest credited by the bank'), L(I('charges', 140), 'Bank charges'), L(I('directpay', 900), 'Insurance premium paid by the bank'), L(I('issued', 3000), 'Cheques issued but not yet presented'), L(I('deposited', 2000), 'Cheques deposited but not yet credited')],
  });
  QQ('s3_amend_brs', short({
    t: 4, d: 4, c: 'application', marks: 3,
    stem: `The bank column of the cash book of Winsome Garments, an imagined firm, shows ${R(18400)} on 30 September 2028. The pass book shows interest of ${R(360)} credited, charges of ${R(140)} debited and an insurance premium of ${R(900)} paid on standing instruction, none yet in the cash book. Cheques for ${R(3000)} issued have not been presented and cheques for ${R(2000)} deposited have not been credited. Prepare the amended cash book and the reconciliation statement.`,
    model: both(s) + `\n\nThe pass book balance is ${R(s.pb)}.`,
    sol: 'Amend the cash book for the three bank items, then reconcile its balance with the pass book.',
    scheme: [['Amended cash book with the three entries on the correct sides', 1], ['Amended balance found', 1], ['Statement from the amended balance to the pass book balance', 1]],
  }));
  same(s.pb, 18720, 's3_amend_brs');
}
{
  const s = scn({
    firm: 'Kavita Tailors', date: '31 December 2027', cb: 22000,
    items: [errCB('A customer\'s cheque of ₹4,300 was entered in the cash book as ₹3,400', 900, false, 'Correction: cheque of ₹4,300 entered as ₹3,400'), L(I('charges', 250), 'Bank charges'), L(I('issued', 5000), 'Cheques issued but not yet presented')],
  });
  QQ('s3_amend_error', short({
    t: 4, d: 4, c: 'analysis', marks: 3,
    stem: `The bank column of the cash book of Kavita Tailors, an imagined firm, shows ${R(22000)} on 31 December 2027. The pass book shows that a customer\'s cheque of ${R(4300)}, deposited by the firm, was credited in full, although the cash book has it as ${R(3400)}; the bank has debited charges of ${R(250)}, not yet entered. Cheques for ${R(5000)} issued have not been presented. Prepare the amended cash book and the reconciliation statement.`,
    model: both(s) + `\n\nThe pass book balance is ${R(s.pb)}.`,
    sol: 'The understated receipt is made good by a debit of the difference; then the charges are entered.',
    scheme: [['Correction of the understated receipt entered on the debit side', 1], ['Charges entered and the amended balance found', 1], ['Statement from the amended balance to the pass book balance', 1]],
  }));
  same(s.am.newBal, 22650, 's3_amend_error am');
  same(s.pb, 27650, 's3_amend_error pb');
}

// ================================================================ long answer, 5 marks
{
  const s = scn({
    firm: 'Brahma Stationers', date: '31 March 2028', cb: 52400,
    items: [
      L(I('intallowed', 1150), 'Interest credited by the bank'),
      L(I('charges', 330), 'Bank charges'),
      L(I('directdep', 6000), 'Direct deposit by a customer, Dastur'),
      L(I('dishonour', 2600), 'Cheque of Ibrahim & Co. returned unpaid', 'Cheque of Ibrahim & Co. returned unpaid'),
      errCB('A cheque of ₹1,800 issued to a supplier was entered in the cash book as ₹1,080', 720, true, 'Correction: cheque of ₹1,800 entered as ₹1,080'),
      L(I('issued', 9700), 'Cheques issued but not yet presented'),
      L(I('deposited', 7200), 'Cheques deposited but not yet credited'),
    ],
  });
  QQ('l5_amend_fav', long({
    t: 4, d: 4, c: 'application', marks: 5,
    stem: `The bank column of the cash book of Brahma Stationers, an imagined firm, shows a favourable balance of ${R(52400)} on 31 March 2028. The pass book and the cash book were compared and the following were found: (a) interest of ${R(1150)} was credited by the bank; (b) the bank debited charges of ${R(330)}; (c) a customer, Dastur, paid ${R(6000)} directly into the bank; (d) a cheque of ${R(2600)} from Ibrahim & Co., deposited earlier, was returned unpaid; (e) a cheque of ${R(1800)} issued to a supplier was entered in the cash book as ${R(1080)}; (f) cheques for ${R(9700)} issued have not been presented; (g) cheques for ${R(7200)} deposited have not been credited. Items (a) to (e) are not yet put right in the cash book. Prepare the amended cash book and a bank reconciliation statement as on 31 March 2028.`,
    model: both(s) + `\n\nThe pass book balance is ${R(s.pb)}.`,
    sol: 'Items (a) to (e) go into the amended cash book; only (f) and (g) remain in the statement.',
    scheme: [['Amended cash book with items (a), (c) on the debit side and (b), (d), (e) on the credit side', 1], ['Amended balance found and totals equal', 1], ['Statement started from the amended cash book balance', 1], ['Items (f) and (g) added and deducted correctly', 1], ['Balance as per pass book found', 1]],
  }));
}
{
  const s = scn({
    firm: 'Tamarind Pulp Exporters', date: '30 April 2028', cb: -27300,
    items: [
      L(I('odint', 1900), 'Interest on overdraft debited by the bank'),
      L(I('charges', 420), 'Bank charges'),
      L(I('directdep', 5500), 'Direct deposit by a customer'),
      L(I('directpay', 2000), 'Premium paid by the bank on standing instruction', 'Premium paid on standing instruction'),
      errCB('A cheque of ₹7,900 deposited was entered in the cash book as ₹9,700', 1800, true, 'Correction: deposit of ₹7,900 entered as ₹9,700'),
      L(I('issued', 6400), 'Cheques issued but not yet presented'),
      L(I('deposited', 8800), 'Cheques deposited but not yet credited'),
    ],
  });
  QQ('l5_amend_od', long({
    t: 4, d: 5, c: 'analysis', marks: 5,
    stem: `The bank column of the cash book of Tamarind Pulp Exporters, an imagined firm, shows an overdraft of ${R(27300)} on 30 April 2028. The following were found on comparing it with the pass book: (a) interest on overdraft of ${R(1900)} and bank charges of ${R(420)} debited by the bank; (b) a customer paid ${R(5500)} directly into the bank; (c) the bank paid a premium of ${R(2000)} on standing instruction; (d) a cheque of ${R(7900)} deposited was entered in the cash book as ${R(9700)}; (e) cheques for ${R(6400)} issued have not been presented; (f) cheques for ${R(8800)} deposited have not been credited. Items (a) to (d) are not yet put right in the cash book. Prepare the amended cash book and a bank reconciliation statement as on 30 April 2028.`,
    model: both(s) + `\n\nThe pass book shows an overdraft of ${R(-s.pb)}; the amended cash book overdraft is ${R(-s.am.newBal)}.`,
    sol: 'The amended cash book starts with an overdraft on the credit side; only items (e) and (f) remain in the statement.',
    scheme: [['Amended cash book with the overdraft as the opening balance on the credit side and items (b) on the debit side', 1], ['Items (a), (c) and (d) entered on the correct sides', 1], ['Amended balance (overdraft) found and the totals equal', 1], ['Statement started from the amended overdraft with items (e) and (f) in the correct groups', 1], ['Overdraft as per pass book found', 1]],
  }));
}

// ================================================================ extra recall item
QQ('m_amend_name', mcq({
  t: 4, d: 1, c: 'recall',
  stem: 'The cash book of a firm, once it has been brought up to date for the bank items found in the pass book, is called the',
  opts: ['amended cash book', 'petty cash book', 'purchases book', 'trial balance'],
  sol: 'An amended or adjusted cash book is the bank column corrected before the statement is prepared. The petty cash book records small payments, the purchases book credit purchases, and a trial balance is a list of balances.',
}));
