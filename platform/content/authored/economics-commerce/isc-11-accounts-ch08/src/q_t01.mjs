// t01: need for reconciliation; causes of difference between the cash book (bank column) and the pass book.
// Imagined firms only. Where an item needs a table, it is generated from the cause list in recon.mjs.
import { mcq, ar, tf, fb, short } from './lib.mjs';
import { mdTable, CAUSES, I, inr, rs } from './fig.mjs';
import { QQ, S2, S3 } from './qq.mjs';

// ================================================================ multiple choice
QQ('m_chk_need', mcq({
  t: 1, d: 1, c: 'understanding',
  stem: 'Neerav Spices, an imagined firm, finds that the balance in the bank column of its cash book is not the same as the balance in the statement sent by its bank. A bank reconciliation statement is prepared mainly to',
  opts: ['explain the difference between the two balances and show that both are correct', 'correct the entries of the bank in its own books', 'calculate the profit earned through the bank account', 'replace the cash book by the bank statement'],
  sol: 'The statement lists every item that makes the balances differ and shows that, once these items are allowed for, the two agree. It does not change either book, it is not a profit statement, and the cash book is still kept.',
}));
QQ('m_chk_causes', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'A firm issued a cheque for ₹4,000 on the last day of the month. The supplier pays it into his own bank only in the next month. In the firm\'s reconciliation at month end this is called',
  opts: ['a cheque issued but not yet presented for payment', 'a cheque deposited but not yet credited', 'a bank charge', 'an error in the cash book'],
  sol: 'The firm has already credited the bank column, but the bank has not yet paid the cheque, so it is issued but not yet presented. A deposited cheque not yet credited concerns a receipt, a bank charge is debited by the bank, and nothing here is an error.',
}));
QQ('m_pass_credit', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'The pass book of Bhumika Loom House, an imagined firm, shows a credit balance of ₹52,000. This means that',
  opts: ['the bank owes the firm ₹52,000 and the firm has a favourable balance', 'the firm owes the bank ₹52,000 on an overdraft', 'the bank has lent ₹52,000 to the firm', 'the firm has withdrawn ₹52,000 more than it deposited'],
  sol: 'The pass book is the bank\'s record of the firm as its customer, so a credit balance there is a liability of the bank to the firm. An overdraft or a loan would show a debit balance, which is the opposite of what is described.',
}));
QQ('m_timing_which', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which of the following differences between a cash book and a pass book is only a matter of timing and will correct itself without any entry in the cash book?',
  opts: ['a cheque deposited on the last day of the month, credited by the bank in the next month', 'bank charges debited by the bank at the end of the month', 'interest credited by the bank at the end of the half year', 'a customer\'s cheque returned unpaid by the bank'],
  sol: 'Both books record the deposit, only on different dates, so the difference disappears when the bank credits it. Bank charges, interest and the dishonour are first known from the pass book, so the cash book needs an entry for each.',
}));
QQ('m_first_in_pb', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'A customer of Chinmay Dairy, an imagined firm, transfers ₹9,600 directly into the firm\'s bank account on the last day of the month, and the firm learns about it only on receiving the pass book. The transfer is',
  opts: ['in the pass book but not yet in the cash book', 'in the cash book but not yet in the pass book', 'in neither book', 'in both books on different dates'],
  sol: 'The bank has credited its customer, the firm, but the firm has not yet written the cash book. It is the cash book that must be brought up to date; the pass book needs no change.',
}));
QQ('m_cb_error', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'Zainab Fabrics, an imagined firm, deposited a customer\'s cheque of ₹6,400 and, by mistake, wrote it on the payment side of the bank column of its cash book instead of the receipt side. The bank credited the cheque correctly. Compared with the pass book, the cash book balance is',
  opts: [rs(12800) + ' lower than it should be', rs(6400) + ' lower than it should be', rs(12800) + ' higher than it should be', rs(6400) + ' higher than it should be'],
  sol: 'The receipt should have raised the balance by ₹6,400, but a payment of the same amount lowered it, so the balance is out by twice the amount. Treating the error as a single amount gives ₹6,400, and a higher balance would need a payment entered as a receipt instead.',
}));
QQ('m_dishonour_who', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: 'Kalpana Seeds, an imagined firm, deposits a customer\'s cheque of ₹7,500 and records it in its cash book. The bank credits it, but before the month ends the cheque is returned unpaid and the bank debits the firm\'s account; the firm learns of this only from the pass book. At the end of the month, compared with its pass book, the cash book balance is',
  opts: ['higher by ₹7,500 because the cash book still shows the cheque as received', 'lower by ₹7,500 because the bank has debited the cheque', 'the same, because both books recorded the cheque', 'higher by ₹15,000 because the cheque is counted twice'],
  sol: 'The cash book was written at the time of deposit and has no entry for the return, while the bank has reversed the credit. So the cash book is higher and must be corrected by a credit entry for ₹7,500. The returned cheque is not a lower balance in the cash book, and it is not counted twice.',
}));
QQ('m_no_diff', mcq({
  t: 1, d: 4, c: 'analysis',
  stem: 'On 31 March 2028 the bank column of the cash book of Ojasvi Cycles, an imagined firm, shows ₹23,000 and its pass book also shows ₹23,000. A cheque of ₹3,000 issued by the firm has not been presented. Which conclusion is correct?',
  opts: ['another item raising the cash book relative to the pass book by ₹3,000 must exist, so a statement is still needed', 'there can be no other difference, because the balances are equal', 'the cheque issued must have been entered twice in the cash book', 'the cash book is correct and the pass book contains the errors'],
  sol: 'An unpresented cheque makes the pass book higher by ₹3,000. If the balances still agree, some other item must make it lower by ₹3,000, for example a deposit not yet credited or bank charges. Equal balances do not show that nothing needs reconciling.',
}));

// ================================================================ assertion-reason
QQ('ar_timing', ar({
  t: 1, d: 2, c: 'understanding', verdict: 'both-true-explains',
  a: 'A cheque that Dhruv Foods issues on 30 June may be missing from the June pass book even though the bank column of the cash book has already been credited.',
  r: 'The payee takes time to deposit the cheque and the bank takes time to pay it.',
  sol: 'Both are true. The gap between issue and payment is exactly the delay described, and it is the reason the cash book and the pass book differ at the month end.',
}));
QQ('ar_bankitem', ar({
  t: 1, d: 3, c: 'understanding', verdict: 'A-true-R-false',
  a: 'Interest credited by a bank on a savings balance makes the pass book balance higher than the cash book balance until the cash book is written.',
  r: 'The firm always records such interest in its cash book before the bank credits it.',
  sol: 'The assertion is true because the bank has the interest and the cash book does not. The reason is false: the firm learns of the interest from the pass book, so it is recorded afterwards.',
}));

// ================================================================ true-false, fill-blank
QQ('tf_pb_dr', tf({
  t: 1, d: 2, c: 'understanding', ans: true,
  stem: 'A debit balance shown in the pass book of Isha Printers, an imagined firm, means that the firm has overdrawn its account with the bank.',
  sol: 'The bank records the firm as its customer. A debit balance means the customer owes the bank, which is what an overdraft is.',
}));
QQ('fb_terms', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'A cheque issued but not yet presented is a ___ difference; bank charges debited by the bank are first recorded in the ___ book.',
  acc: [['timing'], ['pass', 'pass book']],
  sol: 'The first is a timing difference that disappears by itself. Bank charges are known first from the pass book, so the pass book has them before the cash book does.',
}));

// ================================================================ short answer, 2 marks
QQ('s2_need', short({
  t: 1, d: 1, c: 'understanding', marks: 2,
  stem: 'Why does a trader who keeps a current account have to prepare a bank reconciliation statement at regular intervals?',
  model: 'The cash book (bank column) and the pass book record the same account from two sides, and at a given date their balances usually differ. A reconciliation statement **finds and lists every item that causes the difference**, so that the trader can confirm that both books are right.\n\nIt also brings to light **errors, delays and bank items** the trader has not yet recorded, so that the cash book can be corrected in time.',
  sol: 'The two balances differ; the statement explains the difference and exposes unrecorded items or errors.',
  scheme: [['Two books record the same account and their balances differ', 1], ['The statement lists the causes and helps to detect errors or unrecorded items', 1]],
}));
QQ('s2_timing_error', short({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Distinguish a timing difference from an error as a cause of difference between the two books, giving one example of each.',
  model: '- A **timing difference** arises because the two books record the same transaction on different dates, so it corrects itself later. Example: a cheque issued on 28 February and paid by the bank on 3 March.\n- An **error** is a wrong entry in one of the books, which stays until it is corrected. Example: a deposit of ₹5,400 entered in the cash book as ₹4,500.',
  sol: 'Timing: same item, different dates. Error: wrong amount or side.',
  scheme: [['Timing difference explained, with one example', 1], ['Error explained, with one example', 1]],
}));
QQ('s2_bank_items', short({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Name two items that the bank records in the pass book of Vihaan Tiles, an imagined firm, and that are not yet in its cash book. Say why the firm does not know them earlier.',
  model: 'Any two of: **bank charges**, **interest credited** on the balance, **interest on overdraft**, a **direct deposit** by a customer, a **payment on standing instruction**, **dividend or rent collected** by the bank, and a **cheque returned unpaid**.\n\nThe bank acts on its own or on instruction without the firm taking part, so the firm learns of the item only when it receives the pass book.',
  sol: 'Two bank items and the reason: the bank acts without the firm writing at once.',
  scheme: [['Two bank items named', 1], ['Reason: the bank records them and the firm learns later from the pass book', 1]],
}));

// ================================================================ short answer, 3 marks
{
  const items = [
    ['(a) A cheque deposited on 29 September, credited by the bank on 2 October', 'Timing difference', 'Both books, on different dates'],
    ['(b) Interest of ₹180 credited by the bank on 30 September', 'Bank item', 'Pass book'],
    ['(c) A payment of ₹3,000 by cheque entered in the cash book as ₹300', 'Error', 'Cash book'],
    ['(d) A cheque issued on 27 September, paid by the bank on 5 October', 'Timing difference', 'Both books, on different dates'],
    ['(e) Bank charges of ₹90 debited on 30 September', 'Bank item', 'Pass book'],
    ['(f) A customer\'s cheque returned unpaid by the bank on 28 September', 'Bank item', 'Pass book'],
  ];
  QQ('s3_classify', short({
    t: 1, d: 3, c: 'application', marks: 3,
    stem: 'The following were found in reconciling the books of Madhavi Metals, an imagined firm, for September 2027. State for each whether it is a timing difference, a bank item or an error, and which book records it first: (a) a cheque deposited on 29 September and credited by the bank on 2 October; (b) interest of ₹180 credited by the bank on 30 September; (c) a payment of ₹3,000 by cheque entered in the cash book as ₹300; (d) a cheque issued on 27 September and paid by the bank on 5 October; (e) bank charges of ₹90 debited on 30 September; (f) a customer\'s cheque returned unpaid by the bank on 28 September.',
    model: mdTable(['Item', 'Kind', 'Recorded first in'], items.map((r) => [r[0].slice(0, 3), r[1], r[2]])),
    sol: 'Check each item against the book that has it first; two correct rows earn one mark.',
    scheme: [['(a) and (b) correct', 1], ['(c) and (d) correct', 1], ['(e) and (f) correct', 1]],
  }));
}
{
  const keys = ['issued', 'deposited', 'charges', 'intallowed', 'directpay', 'dishonour'];
  const rows = keys.map((k) => {
    const it = I(k, 100);
    return [CAUSES[k].short, it.gap > 0 ? 'Higher' : 'Lower'];
  });
  QQ('s3_effects', short({
    t: 1, d: 3, c: 'understanding', marks: 3,
    stem: 'Before any reconciliation, how does each of the following make the pass book balance compare with the cash book balance of a firm with a favourable balance: cheques issued but not yet presented; cheques deposited but not yet credited; bank charges; interest credited by the bank; payment by the bank on standing instruction; a customer\'s cheque returned unpaid? Answer as higher or lower.',
    model: mdTable(['Cause', 'Pass book balance is'], rows),
    sol: 'An item that only the cash book has recorded leaves the pass book lower if it raised the cash book and higher if it lowered it; an item that only the bank has recorded moves the pass book the way it moved it. Each pair of correct answers earns a mark.',
    scheme: [['First two causes correct', 1], ['Next two causes correct', 1], ['Last two causes correct', 1]],
  }));
}

// ================================================================ extra recall and understanding items
QQ('m_pass_name', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'The statement that a bank sends to its customer, showing the customer\'s account as the bank has recorded it, is called the',
  opts: ['pass book', 'cash book', 'ledger', 'journal proper'],
  sol: 'The bank\'s own record of the account is the pass book, or bank statement. The cash book is the firm\'s record, the ledger holds its accounts, and the journal proper takes entries that belong to no other book.',
}));
QQ('tf_timing_entry', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'A cheque issued by Kiran Brooms, an imagined firm, on the last day of a month and not presented until the next month must be entered again in its cash book when the next month starts.',
  sol: 'The cash book recorded the cheque on the day it was issued. Nothing more is entered: the difference simply clears when the bank pays the cheque.',
}));
