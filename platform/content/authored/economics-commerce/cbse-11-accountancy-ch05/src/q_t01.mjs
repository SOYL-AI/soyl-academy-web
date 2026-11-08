// t01: need for bank reconciliation and the causes of difference between the cash book and the pass book. Every firm,
// bank and person is imagined; every derived amount is computed with recon.mjs and asserted.
import { mcq, ar, tf, fb, match, ord, short, long } from '../../cbse-11-accountancy-ch01/src/lib.mjs';
import { same, sum, inr, rs, mdTable, I, errCB, errBank, statement, twoBooks, total, grouped, txTable } from './figures.mjs';
import { QQ, numQ, S2, S3, L5 } from './qq.mjs';

// ================================================================ multiple choice
QQ('m_pb_def', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Every month Sagar Bank sends Neel Traders, an imagined firm, a copy of the firm\'s current account as the bank has recorded it. This copy is called the',
  opts: ['pass book (bank statement)', 'cash book', 'bank reconciliation statement', 'trial balance'],
  sol: 'The bank keeps this copy, in which every deposit and withdrawal of the customer is recorded. The cash book is the record of the firm itself, the reconciliation statement is prepared by the firm to compare the two, and a trial balance lists ledger balances.',
}));
QQ('m_dr_cr', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Neel Traders has money at Sagar Bank on 30 September 2026. How does this favourable balance appear in the two books?',
  opts: ['A debit balance in the bank column of the cash book and a credit balance in the pass book', 'A credit balance in the bank column of the cash book and a debit balance in the pass book', 'A debit balance in both books', 'A credit balance in both books'],
  sol: 'The firm treats the bank as a receiver of its money, so a favourable balance is a debit in the cash book. The bank owes that money to the firm, so in the bank\'s own books, and therefore in the pass book, it is a credit. The two books are mirror images.',
}));
QQ('m_deposit_side', mcq({
  t: 1, d: 1, c: 'understanding',
  stem: 'On 12 May 2026 Neel Traders deposited a customer\'s cheque in its account. The firm entered it on the debit side of the bank column of the cash book. Sagar Bank will show the same deposit in the pass book on the',
  opts: ['credit side, because the bank now owes the money to the customer', 'debit side, because the bank has received money', 'debit side, as a contra entry', 'credit side, but only when the firm\'s cash book agrees'],
  sol: 'A deposit increases what the bank owes the customer, so the bank credits the customer\'s account. This is why the same transaction is a debit in the cash book and a credit in the pass book. It is not a contra entry, and the bank does not wait for the firm\'s books.',
}));
QQ('m_od_books', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Neel Traders has overdrawn its account with Sagar Bank. In which form will the overdraft appear in the cash book and in the pass book?',
  opts: ['A credit balance in the cash book and a debit balance in the pass book', 'A debit balance in the cash book and a credit balance in the pass book', 'A credit balance in both books', 'A debit balance in both books'],
  sol: 'An overdraft is the reverse of a favourable balance. In the firm\'s cash book it is a credit balance, and in the bank\'s record of the firm\'s account it is a debit balance, because the bank is owed the money.',
}));
QQ('m_brs_def', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'A bank reconciliation statement is best described as',
  opts: ['a statement prepared on a given date to show why the balances of the cash book and the pass book differ and to bring them into agreement', 'an account in the ledger in which the bank is debited and credited', 'a book of original entry for cheques', 'a statement issued by the bank every month'],
  sol: 'It is a statement prepared by the firm, not by the bank, and it is not an account, so it has no debit and credit sides in the ledger and does not form part of double entry. Its purpose is to explain the difference between the two balances on a date.',
}));
QQ('m_need', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which of the following is NOT a purpose of preparing a bank reconciliation statement?',
  opts: ['To increase the balance that the bank holds for the firm', 'To find the reasons for the difference between the two balances', 'To help detect errors and frauds in either book', 'To show which items must be entered in the cash book to bring it up to date'],
  sol: 'The statement only explains and reconciles balances; it cannot change the money at the bank. The other three are real uses: finding the reasons, detecting errors and frauds, and showing the entries the cash book still needs.',
}));
QQ('m_error_which', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'While comparing its books on 31 March 2027, Neel Traders finds that a receipt of ₹4,500 was entered in the bank column of the cash book as ₹5,400. This difference is',
  opts: ['an error in the cash book, and it is corrected by an entry in the cash book', 'a timing difference that will disappear when the bank credits the cheque', 'a bank item that is shown in the statement but needs no entry', 'a contra entry'],
  sol: 'The firm itself recorded the wrong figure, so this is an error, not a delay. It is put right by correcting the cash book. A timing difference disappears by itself when the other book records the item, and a bank item is something the bank has recorded first.',
}));
QQ('m_issued_effect', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Neel Traders issued a cheque of ₹6,800 to a supplier on 29 October 2026 and entered it in the cash book at once. The supplier presented it at Sagar Bank on 4 November. On 31 October the pass book balance is',
  opts: ['higher than the cash book balance by ₹6,800, because the bank has not yet paid the cheque', 'lower than the cash book balance by ₹6,800, because the bank has already paid the cheque', 'equal to the cash book balance', 'higher than the cash book balance by ₹6,800, because the bank has paid the cheque twice'],
  sol: 'The firm reduced its cash book balance on the day it issued the cheque, but the bank reduces the pass book balance only when the cheque is presented. Until then the pass book shows the larger figure.',
}));
QQ('m_deposited_effect', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Neel Traders deposited a cheque of ₹9,500 on 30 November 2026 and debited the bank column at once; Sagar Bank credited it on 3 December after collection. On 30 November, because of this cheque alone, the',
  opts: ['cash book balance is higher than the pass book balance by ₹9,500', 'cash book balance is lower than the pass book balance by ₹9,500', 'two balances are the same', 'pass book balance is an overdraft'],
  sol: 'The firm recorded the receipt on the day it deposited the cheque; the bank recorded it only after collection. The cash book therefore runs ahead by the cheque amount until the bank credits it.',
}));
QQ('m_charges_entry', mcq({
  t: 1, d: 1, c: 'understanding',
  stem: 'Sagar Bank debited bank charges of ₹320 to the account of Neel Traders on 31 December 2026. When the firm learns of it from the pass book, it will enter the charges in the cash book on the',
  opts: ['credit side of the bank column', 'debit side of the bank column', 'credit side of the cash column', 'debit side of the cash column'],
  sol: 'Bank charges reduce the money at the bank, so they are a payment and go on the credit side of the bank column. The cash column is not affected.',
}));
QQ('m_dishonour_effect', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Neel Traders deposited a cheque of ₹12,000 from Gopal Rao on 26 February 2027 and entered it in the cash book. On 28 February Sagar Bank returned it unpaid and debited the account. The firm has not yet heard of this. Compared with the cash book, the pass book balance is',
  opts: ['lower by ₹12,000, and the firm must credit the bank column and debit Gopal Rao', 'higher by ₹12,000, and the firm must debit the bank column', 'lower by ₹12,000, and no entry is needed in the cash book', 'the same, because the cheque was deposited in both books'],
  sol: 'The bank has reversed the deposit, so the pass book falls while the cash book still shows the receipt. The firm must then credit the bank column and debit the customer, whose debt revives. The second option has the direction wrong, the third wrongly says no entry is needed, and the fourth ignores the reversal.',
}));
QQ('m_direct_dep', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'On 20 January 2027 Sunita Agencies paid ₹7,200 directly into the account of Neel Traders at Sagar Bank, and the firm learnt of it only from the pass book. In the cash book the entry is made on the',
  opts: ['debit side of the bank column', 'credit side of the bank column', 'debit side of the cash column', 'credit side of the cash column'],
  sol: 'A direct deposit increases the money at the bank, so it is a receipt and a debit in the bank column. It is not a cash receipt, so the cash column is not used.',
}));
QQ('m_standing', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Under a standing instruction, Sagar Bank paid an insurance premium of ₹3,600 for Neel Traders on 15 February 2027. Before the firm records it in the cash book, the',
  opts: ['pass book balance is lower than the cash book balance by ₹3,600', 'pass book balance is higher than the cash book balance by ₹3,600', 'cash book balance is already lower by ₹3,600', 'two balances still agree'],
  sol: 'The bank has paid out money, so the pass book has fallen. Until the firm credits the bank column for the premium, its cash book balance is higher than the pass book balance by the premium.',
}));
QQ('m_collected', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Sagar Bank collected a dividend of ₹2,000 on shares held by Neel Traders and credited it to the firm\'s account. The pass book shows it, but the cash book does not yet. Which statement is correct?',
  opts: ['The firm should debit the bank column; until then the pass book balance is the higher one', 'The firm should credit the bank column; until then the cash book balance is the higher one', 'No entry is needed, because the bank is responsible for it', 'The item should be shown only in the bank\'s books'],
  sol: 'The bank has added money to the account, so the firm records a receipt in the bank column. Until it does, its cash book balance is the lower one. The bank\'s collection is a service for the firm and must be entered in the firm\'s own books.',
}));
QQ('m_timing_which', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Neel Traders\' accountant sorts the differences found on 30 June 2026 into timing differences and errors. Which one is a timing difference?',
  opts: ['A cheque issued on 29 June and presented by the supplier on 2 July', 'A payment of ₹8,300 written in the cash book as ₹3,800', 'A deposit of ₹5,000 credited by the bank to the wrong customer', 'The debit side of the bank column added short by ₹1,000'],
  sol: 'Only the cheque is a transaction that both books will record, one of them a little later. The other three are mistakes that will not correct themselves. The last is a mistake of the firm\'s clerk and the third is a mistake of the bank.',
}));

// ================================================================ assertion-reason
QQ('ar_not_account', ar({
  t: 1, d: 2, c: 'understanding', verdict: 'both-true-explains',
  a: 'A bank reconciliation statement is not an account in the ledger.',
  r: 'It is only a statement prepared on a date to reconcile two balances, and it has no debit and credit sides for double entry.',
  sol: 'Both are true, and R is the reason for A. The statement lists items to explain a difference; nothing is posted from it, so it is outside the double entry system.',
}));
QQ('ar_timing_noentry', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'Neel Traders makes no entry in its cash book for cheques issued but not yet presented at the bank.',
  r: 'Such cheques were entered in the cash book on the day they were issued.',
  sol: 'Both statements are true and R explains A. The firm has already recorded the cheque; only the bank has yet to record it, so nothing more is entered in the cash book.',
}));
QQ('ar_bank_first', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'A difference between the cash book and the pass book can arise even when no cheque is outstanding.',
  r: 'The cash book is written by the firm and the pass book is written by the bank.',
  sol: 'Both are true. Bank charges, direct deposits and interest are recorded by the bank first, which causes a difference without any outstanding cheque. R is also true, but who keeps each book does not by itself explain why a difference remains when no cheque is outstanding.',
}));
QQ('ar_issued_lower', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'A-false-R-true',
  a: 'Because of a cheque issued but not yet presented, the pass book balance is lower than the cash book balance.',
  r: 'The bank has not yet debited the cheque to the account of the firm.',
  sol: 'A is false: the bank has not yet reduced its figure, so the pass book balance is higher. R is true, and it is exactly why A fails.',
}));
QQ('ar_interest_allowed', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'A-true-R-false',
  a: 'When interest allowed by the bank is entered in the cash book, the balance of the cash book rises.',
  r: 'Interest allowed by the bank is entered on the credit side of the bank column of the cash book.',
  sol: 'A is true because the interest is a receipt. R is false: it is entered on the debit side of the bank column, which is the side that raises a favourable balance.',
}));

// ================================================================ true-false, fill in the blanks, match, order
QQ('tf_brs_ledger', tf({
  t: 1, d: 1, c: 'recall', ans: false,
  stem: 'A bank reconciliation statement is posted to the ledger as the bank account.',
  sol: 'It is a statement prepared for a given date, not an account. Nothing is posted from it. Only the items that need an entry in the cash book are entered there.',
}));
QQ('tf_od_pb', tf({
  t: 1, d: 2, c: 'understanding', ans: true,
  stem: 'An overdraft on the account of a firm appears as a debit balance in its pass book.',
  sol: 'The bank has lent the firm money and is owed it, so the bank debits the account. In the firm\'s cash book the same overdraft is a credit balance.',
}));
QQ('fb_books', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'A favourable balance is a ___ balance in the cash book and a ___ balance in the pass book.',
  acc: [['debit'], ['credit']],
  sol: 'The firm debits the bank column for deposits and the bank credits the customer\'s account for them, so a favourable balance is a debit in the cash book and a credit in the pass book.',
}));
QQ('fb_causes', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'Cheques ___ but not yet presented for payment make the pass book balance ___ than the cash book balance, when the balance is favourable.',
  acc: [['issued'], ['higher', 'greater', 'larger']],
  sol: 'The firm has already deducted the cheques that it issued, while the bank has not, so the bank\'s figure is higher.',
}));
QQ('mt_terms', match({
  t: 1, d: 1, c: 'recall',
  stem: 'Match each bank-reconciliation term in column A with what it means for the cash book or passbook in column B.',
  pairs: [
    ['Pass book', 'The bank\'s record of a customer\'s account'],
    ['Cash book', 'The firm\'s own record of receipts and payments including the bank column'],
    ['Overdraft', 'A credit balance in the cash book and a debit balance in the pass book'],
    ['Bank reconciliation statement', 'A statement that explains the difference between the two balances on a date'],
  ],
  sol: 'The pass book belongs to the bank, the cash book to the firm. An overdraft is the reverse of a favourable balance, and the reconciliation statement explains the gap.',
}));
QQ('mt_cause_effect', match({
  t: 1, d: 3, c: 'understanding',
  stem: 'Match each cause of difference in column A with its effect in column B, for a firm with a favourable balance.',
  pairs: [
    ['Cheque issued, not yet presented', 'Pass book balance is higher; no entry needed in the cash book'],
    ['Interest allowed by the bank', 'Pass book balance is higher; debit the bank column in the cash book'],
    ['Bank charges', 'Pass book balance is lower; credit the bank column in the cash book'],
    ['Cheque deposited, not yet collected', 'Pass book balance is lower; no entry needed in the cash book'],
  ],
  sol: 'Items recorded by the firm only (the two cheques) need no cash book entry, and the pass book is higher for the issued cheque and lower for the deposited one. Items recorded by the bank only need a cash book entry, and the interest raises the balance while the charges lower it.',
}));
QQ('ord_causes', ord({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Arrange in order the events that make a cheque issued by Neel Traders appear as an outstanding item on a reconciliation date.',
  items: ['The firm issues the cheque and credits the bank column of the cash book', 'The cheque reaches the supplier, who takes time to bring it to the bank', 'The reconciliation date arrives before the cheque has been presented', 'The bank pays the cheque later and debits the account in the pass book'],
  sol: 'The cheque is recorded by the firm first, travels to the payee, is still unpresented on the reconciliation date, and is recorded by the bank only afterwards.',
}));

// ================================================================ numerical (all values computed)
{
  const list = [
    ['4411', 'Anand Paper', 7400, true],
    ['4412', 'Bimal Oils', 5600, false],
    ['4413', 'Chandra Hardware', 3250, true],
    ['4414', 'Dilip Foods', 8150, false],
    ['4415', 'Esha Dyes', 2700, false],
  ];
  const np = sum(list.filter(([, , , p]) => !p).map(([, , a]) => a));
  same(np, 16450, 'n_np_total');
  QQ('n_np_total', numQ({
    t: 1, d: 2, c: 'application', value: np, unit: '₹',
    stem: `Neel Traders issued five cheques in June 2026: no. 4411 to Anand Paper for ${rs(7400)}, no. 4412 to Bimal Oils for ${rs(5600)}, no. 4413 to Chandra Hardware for ${rs(3250)}, no. 4414 to Dilip Foods for ${rs(8150)} and no. 4415 to Esha Dyes for ${rs(2700)}. Sagar Bank's pass book up to 30 June shows only nos. 4411 and 4413 as paid. Find the total of the cheques issued but not yet presented on 30 June (in ₹).`,
    sol: `The cheques not yet in the pass book are nos. 4412, 4414 and 4415: ${inr(5600)} + ${inr(8150)} + ${inr(2700)} = ${rs(np)}. Cheques already paid by the bank are not outstanding.`,
  }));
}
{
  const items = [I('issued', 8000), I('deposited', 3000), I('charges', 150)];
  const gap = sum(items.map((i) => i.gap));
  same(gap, 4850, 'n_gap');
  QQ('n_gap', numQ({
    t: 1, d: 3, c: 'application', value: gap, unit: '₹',
    stem: `On 31 July 2026 Neel Traders found three differences between its books: cheques of ${rs(8000)} issued but not yet presented, a cheque of ${rs(3000)} deposited but not yet collected, and bank charges of ${rs(150)} not yet entered in the cash book. By how many rupees is the pass book balance higher than the cash book balance (both balances are favourable)?`,
    sol: `Pass book − cash book = ${inr(8000)} (issued, not presented) − ${inr(3000)} (deposited, not collected) − ${inr(150)} (bank charges) = ${rs(gap)}.`,
  }));
}
{
  const tb = twoBooks({
    open: 24000,
    tx: [
      { label: 'Cheque from Amar Joshi deposited and collected', cb: 15000, pb: 15000 },
      { label: 'Cheque issued to Bhola Brothers, paid by the bank', cb: -11000, pb: -11000 },
      { label: 'Cheque issued to Chetan Dyes, not presented', cb: -4200, pb: 0, key: 'issued' },
      { label: 'Bank charges', cb: 0, pb: -175, key: 'charges' },
    ],
  });
  same(tb.cb, 23800, 'n_two_cb');
  same(tb.pb, 27825, 'n_two_pb');
  QQ('n_two_pb', numQ({
    t: 1, d: 3, c: 'application', value: tb.pb, unit: '₹',
    stem: `Neel Traders and Sagar Bank both showed ${rs(24000)} in favour of the firm on 1 September 2026. During September the firm deposited a cheque of ${rs(15000)} from Amar Joshi, which the bank collected; it issued a cheque of ${rs(11000)} to Bhola Brothers, which the bank paid; and it issued a cheque of ${rs(4200)} to Chetan Dyes, which was not presented before 30 September. The bank also debited charges of ${rs(175)} that the firm has not yet recorded. Find the balance shown by the pass book on 30 September (in ₹).`,
    sol: `Pass book: ${inr(24000)} + ${inr(15000)} − ${inr(11000)} − ${inr(175)} = ${rs(tb.pb)}. The cheque to Chetan Dyes is not yet in the pass book (the cash book balance is ${rs(tb.cb)}).`,
  }));
}

// ================================================================ short answer, 2 marks
QQ('s2_pb_def', short({
  t: 1, d: 1, c: 'recall', marks: 2,
  stem: 'Define the pass book and say how a deposit appears in it compared with the cash book.',
  model: 'The pass book (bank statement) is the bank\'s copy of a customer\'s account. A deposit is a debit in the bank column of the cash book but a credit in the pass book, because the bank owes the money to the customer.',
  wl: S2, sol: 'Definition and the mirror treatment of a deposit.',
  scheme: [['Pass book defined as the bank\'s copy of the customer\'s account', 1], ['Deposit: debit in the cash book, credit in the pass book', 1]],
}));
QQ('s2_need', short({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Why does Neel Traders, an imagined firm, prepare a bank reconciliation statement every month? Give two reasons.',
  model: 'It shows why the cash book and the pass book balances differ and what each difference is. It also helps to find errors or frauds in either book and shows the entries needed to update the cash book.',
  wl: S2, sol: 'Any two of: reasons for the difference, detection of errors and frauds, updating the cash book, checking the bank.',
  scheme: [['First valid reason', 1], ['Second valid reason', 1]],
}));
QQ('s2_not_account', short({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'A student says that the bank reconciliation statement of Neel Traders should be posted to the ledger. Explain why this is wrong.',
  model: 'The statement is not an account but a statement prepared on a date to explain the difference between two balances. It has no debit and credit sides and is not part of double entry, so nothing is posted from it. Only items needing a cash book entry are entered in the cash book.',
  wl: S2, sol: 'It is a statement, not an account.',
  scheme: [['Statement, not an account; no double entry', 1], ['Only items needing an entry are recorded in the cash book', 1]],
}));
QQ('s2_od_books', short({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'On 31 January 2027 Neel Traders has overdrawn its account with Sagar Bank. State how the overdraft appears in the cash book and in the pass book.',
  model: 'In the cash book the overdraft is a credit balance in the bank column. In the pass book it is a debit balance, because the bank has advanced money to the firm and is owed it.',
  wl: S2, sol: 'Reverse of a favourable balance in each book.',
  scheme: [['Credit balance in the cash book', 1], ['Debit balance in the pass book', 1]],
}));
QQ('s2_issued_why', short({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Cheques of ₹5,500 issued by Neel Traders on 28 June 2026 were presented only on 4 July. Explain how this causes a difference on 30 June and which book shows the higher balance.',
  model: 'The firm credited the bank column when it issued the cheques, but the bank debits the account only on presentation. On 30 June the cash book is therefore lower and the pass book is higher by ₹5,500, assuming favourable balances.',
  wl: S2, sol: 'Timing difference: recorded by the firm first.',
  scheme: [['Recorded by the firm on issue, by the bank on presentation', 1], ['Pass book higher by the amount', 1]],
}));
QQ('s2_dishonour_entry', short({
  t: 1, d: 3, c: 'application', marks: 2,
  stem: 'Sagar Bank returned unpaid, on 27 March 2027, a cheque of ₹6,500 that Neel Traders had received from Rekha Stores and deposited. State the entry the firm must make in its cash book once it learns of this.',
  model: 'Credit the bank column of the cash book with ₹6,500 and debit the account of Rekha Stores with ₹6,500, so that the debt of the customer is revived.',
  wl: S2, sol: 'The receipt is reversed.',
  scheme: [['Credit the bank column with ₹6,500', 1], ['Debit the customer, reviving the debt', 1]],
}));
QQ('s2_timing_error', short({
  t: 1, d: 3, c: 'analysis', marks: 2,
  stem: 'Distinguish a timing difference from an error, giving one example of each from the books of Neel Traders.',
  model: 'A timing difference arises because one book records a transaction later than the other, as with a cheque issued but not yet presented, and it corrects itself. An error is a mistake, such as adding the bank column wrongly, and must be corrected.',
  wl: S2, sol: 'Delay against mistake.',
  scheme: [['Timing difference with example', 1], ['Error with example', 1]],
}));
QQ('s2_interest', short({
  t: 1, d: 2, c: 'application', marks: 2,
  stem: 'Sagar Bank credited interest of ₹1,260 to the account of Neel Traders on 30 September 2026, but the firm has not entered it. State the effect on the two balances and the entry the firm must make.',
  model: 'The pass book balance is higher by ₹1,260. The firm must debit the bank column of the cash book with ₹1,260, interest being a receipt.',
  wl: S2, sol: 'Bank item: recorded by the bank first.',
  scheme: [['Pass book higher by ₹1,260', 1], ['Debit the bank column', 1]],
}));

// ================================================================ short answer, 3 marks
{
  const rows = [
    ['Bank charges of ₹210 debited by the bank', 'Entry needed in the cash book (credit the bank column)'],
    ['Cheque of ₹4,000 issued, not yet presented', 'No entry needed; already in the cash book'],
    ['Direct deposit of ₹2,500 by a customer', 'Entry needed in the cash book (debit the bank column)'],
    ['Cheque of ₹6,000 deposited, not yet collected', 'No entry needed; already in the cash book'],
    ['Dividend of ₹1,800 collected by the bank', 'Entry needed in the cash book (debit the bank column)'],
    ['Premium of ₹2,200 paid by the bank on standing instruction', 'Entry needed in the cash book (credit the bank column)'],
  ];
  QQ('s3_classify', short({
    t: 1, d: 3, c: 'application', marks: 3,
    stem: 'On 31 May 2027 the accountant of Neel Traders finds six differences between the books: (i) bank charges of ₹210 debited by the bank; (ii) a cheque of ₹4,000 issued but not yet presented; (iii) a direct deposit of ₹2,500 by a customer; (iv) a cheque of ₹6,000 deposited but not yet collected; (v) a dividend of ₹1,800 collected by the bank; (vi) a premium of ₹2,200 paid by the bank on standing instruction. Say for each whether the cash book needs an entry and, if so, on which side of the bank column.',
    model: mdTable(['Item', 'Treatment'], rows),
    sol: 'Items recorded by the firm first need no entry; items recorded by the bank first do.',
    scheme: [['Items (ii) and (iv): no entry, already in the cash book', 1], ['Items (iii) and (v): debit the bank column', 1], ['Items (i) and (vi): credit the bank column', 1]],
  }));
}
QQ('s3_causes_two', short({
  t: 1, d: 3, c: 'understanding', marks: 3,
  stem: 'Name three causes of difference between the cash book and the pass book of Neel Traders in which the bank records the item first, and say whether each raises or lowers the pass book balance relative to the cash book.',
  model: 'Interest allowed by the bank, a direct deposit by a customer and a dividend collected by the bank each raise the pass book balance relative to the cash book. Bank charges, a payment on standing instruction and a dishonoured cheque lower it. Any three with the effect.',
  wl: S3, sol: 'Bank-first items and their effects.',
  scheme: [['Three causes named', 1], ['Each shown as recorded by the bank first', 1], ['Effect of each stated correctly', 1]],
}));
QQ('s3_compare', short({
  t: 1, d: 3, c: 'analysis', marks: 3,
  stem: 'Compare the cash book and the pass book of Neel Traders on three points: who keeps it, how a deposit is entered and how an overdraft appears.',
  model: 'The firm keeps the cash book; the bank keeps the pass book. A deposit is a debit in the cash book but a credit in the pass book. An overdraft is a credit balance in the cash book but a debit balance in the pass book. The two books are mirror images.',
  wl: S3, sol: 'Three points of comparison.',
  scheme: [['Who keeps each book', 1], ['Treatment of a deposit', 1], ['Treatment of an overdraft', 1]],
}));
{
  const rows = [
    ['Cheque issued, not yet presented', 'Timing difference', 'Pass book higher'],
    ['Wrong addition of the debit side of the cash book by ₹900', 'Error in the cash book', 'Pass book higher by ₹900'],
    ['Bank wrongly credited ₹1,400 meant for another customer', 'Error by the bank', 'Pass book higher by ₹1,400'],
  ];
  QQ('s3_errors', short({
    t: 1, d: 4, c: 'analysis', marks: 3,
    stem: 'Neel Traders finds three differences on 30 April 2027: (i) a cheque issued and not yet presented; (ii) the debit side of its bank column added ₹900 short; (iii) Sagar Bank wrongly credited the firm with ₹1,400 meant for another customer. Classify each as a timing difference or an error, say who made it, and state whether the pass book balance is higher or lower than the cash book balance because of it. (Balances are favourable.)',
    model: mdTable(['Item', 'Class', 'Effect'], rows),
    sol: 'A cheque is a delay; a short addition understates the cash book, and a wrong credit overstates the pass book. Both errors make the pass book higher.',
    scheme: [['Item (i): timing difference, pass book higher', 1], ['Item (ii): error in the cash book, pass book higher by ₹900', 1], ['Item (iii): error by the bank, pass book higher by ₹1,400', 1]],
  }));
}

// ================================================================ long answer, 5 marks (theory)
QQ('l5_causes', long({
  t: 1, d: 2, c: 'understanding', marks: 5,
  stem: 'Explain any five causes of difference between the cash book balance and the pass book balance of a firm. For each say which book has recorded the item first.',
  model: 'Cheques issued but not yet presented are in the cash book only. Cheques deposited but not yet collected are in the cash book only. Bank charges and interest on overdraft are debited by the bank first. Interest allowed, a direct deposit by a customer and a dividend collected by the bank are credited by the bank first. A payment on standing instruction, and a deposited cheque that is dishonoured, are in the pass book first. Errors in either book are a further cause.',
  wl: L5, sol: 'Five causes with the book that records first.',
  scheme: [['Each cause correctly stated with the book that records it first (1 mark each)', 5]],
}));
QQ('l5_need', long({
  t: 1, d: 2, c: 'understanding', marks: 5,
  stem: 'Explain why a firm such as Neel Traders should prepare a bank reconciliation statement regularly. Mention the two groups into which the differences fall.',
  model: 'The statement shows the reasons for a difference between the two balances and so checks the work of both the firm and the bank. It helps detect errors and frauds in time and shows the entries needed to update the cash book. Differences are of two kinds: timing differences, where one book records a transaction later than the other, and errors, where a mistake has been made in either book.',
  wl: L5, sol: 'Needs and the two groups of differences.',
  scheme: [['Reasons for the difference', 1], ['Detection of errors and frauds', 1], ['Updating the cash book', 1], ['Checking the bank\'s work', 1], ['Two groups: timing differences and errors', 1]],
}));

// ================================================================ long answer: two books reconciled (t01 and t02)
{
  const tx = [
    { date: 'Aug 2', label: 'Cheque from Mehul Shah deposited', cb: 26000, pb: 26000 },
    { date: 'Aug 7', label: 'Cheque issued to Parth Mills', cb: -18500, pb: -18500 },
    { date: 'Aug 12', label: 'Cheque from Zeba Traders deposited', cb: 9800, pb: 9800 },
    { date: 'Aug 19', label: 'Interest allowed by Sagar Bank', cb: 0, pb: 520, key: 'intallowed' },
    { date: 'Aug 24', label: 'Cheque issued to Ravi Packers, presented on Sep 3', cb: -7300, pb: 0, key: 'issued' },
    { date: 'Aug 29', label: 'Cheque from Nila Stores deposited, credited on Sep 2', cb: 12400, pb: 0, key: 'deposited' },
    { date: 'Aug 31', label: 'Bank charges debited by Sagar Bank', cb: 0, pb: -240, key: 'charges' },
  ];
  const tb = twoBooks({ open: 40000, tx });
  same(tb.cb, 62400, 'l5_derive cash book');
  same(tb.pb, 57580, 'l5_derive pass book');
  const items = grouped(tb);
  const st = statement({ from: 'cash book', bal: tb.cb, items, expected: tb.pb });
  const t = txTable(tx);
  QQ('l5_derive', long({
    t: [1, 2], d: 4, c: 'analysis', marks: 5,
    stem: `Neel Traders and Sagar Bank agreed on 1 August 2026 that the firm had ${rs(40000)} in the account. The transactions of August are listed, with the effect each book has recorded by 31 August (a blank means the book has not recorded it).\n\n${mdTable(t.headers, t.rows)}\n\nFind the balance of each book on 31 August, name the cause of each difference, and prepare a bank reconciliation statement starting from the cash book balance.`,
    model: `Cash book: ${inr(40000)} + ${inr(26000)} − ${inr(18500)} + ${inr(9800)} − ${inr(7300)} + ${inr(12400)} = **${rs(tb.cb)}**. Pass book: ${inr(40000)} + ${inr(26000)} − ${inr(18500)} + ${inr(9800)} + ${inr(520)} − ${inr(240)} = **${rs(tb.pb)}**.\n\nCauses: cheque issued, not presented (${rs(7300)}); cheque deposited, not collected (${rs(12400)}); interest allowed (${rs(520)}) and bank charges (${rs(240)}) not yet in the cash book.\n\n**Bank reconciliation statement of Neel Traders as on 31 August 2026**\n\n${st.md}`,
    sol: 'Find each balance from its own transactions, name each difference, then reconcile.',
    scheme: [[`Cash book balance ${rs(tb.cb)}`, 1], [`Pass book balance ${rs(tb.pb)}`, 1], ['Causes of difference identified', 1], ['Items added and deducted correctly', 1], [`Result ${rs(tb.pb)} agrees with the pass book`, 1]],
  }));
}
