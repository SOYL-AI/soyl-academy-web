// t01: sub-division of the journal: purpose and advantages of subsidiary books; the books named (Chapter 6 teaches the
// others). Imagined firms only.
import { mcq, ar, tf, fb, short } from './lib.mjs';
import { mdTable } from './fig.mjs';
import { QQ, S2, S3 } from './qq.mjs';

// ================================================================ multiple choice
QQ('m_why_sub', mcq({
  t: 1, d: 1, c: 'understanding',
  stem: 'Ojas Paints, an imagined wholesaler, finds that its single journal has grown too long for one clerk to write and check. It therefore splits the journal into separate books for cash, purchases, sales and returns. This sub-division mainly helps the firm to',
  opts: ['share the recording among several clerks and total each book before posting', 'avoid preparing a ledger altogether', 'replace the trial balance by a summary of the books', 'make every kind of error impossible'],
  sol: 'Each book handles one class of transactions, so different clerks can write them side by side and the totals of a book can be posted together. The ledger is still needed, the trial balance is still prepared, and clerical errors can still occur.',
}));
QQ('m_chk_books', mcq({
  t: 1, d: 1, c: 'understanding',
  stem: 'Lakshya Stationers, an imagined shop, receives ₹8,000 in cash from a customer on the spot. Among its subsidiary books, this transaction is first recorded in the',
  opts: ['cash book', 'sales book', 'journal proper', 'purchases book'],
  sol: 'Every receipt and payment of cash starts in the cash book. The sales book is for sales of goods on credit, the purchases book for goods bought on credit, and the journal proper for transactions that fit no other book.',
}));
QQ('m_which_book', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Zoya Fabrics, an imagined firm, sends back defective cloth worth ₹6,000 that it had bought on credit from a supplier. The return is first entered in the',
  opts: ['purchases returns book', 'purchases book', 'sales returns book', 'cash book'],
  sol: 'Goods sent back to a supplier are purchases returns. The purchases book holds the original credit purchases, the sales returns book holds goods sent back by customers, and no cash passes in this transaction.',
}));

// ================================================================ assertion-reason, true-false, fill-blank
QQ('ar_sub', ar({
  t: 1, d: 2, c: 'understanding', verdict: 'both-true-explains',
  a: 'In a firm that keeps subsidiary books, one clerk can write the cash book while another writes the sales book on the same day.',
  r: 'Each subsidiary book records only one class of transactions.',
  sol: 'Both are true. Because the books are separated by class, the work divides cleanly, which is exactly what lets two clerks write different books at once.',
}));
QQ('tf_sub', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'Once Navkar Sports, an imagined firm, starts keeping a purchases book and a sales book, it no longer needs to keep a ledger.',
  sol: 'Subsidiary books only record transactions in their first stage, class by class. Totals and items from them are still posted to the ledger accounts, so the ledger remains the principal book.',
}));
QQ('fb_sub', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'The cash book, the purchases book and the sales book are called ___ books because each is a part cut out of the ___.',
  acc: [['subsidiary', 'special purpose', 'special journal'], ['journal']],
  sol: 'These are subsidiary books, formed by dividing up the journal so that each records one class of transactions.',
}));

// ================================================================ short answer, 2 marks
QQ('s2_sub_purpose', short({
  t: 1, d: 1, c: 'understanding', marks: 2,
  stem: 'What is meant by the sub-division of the journal? State the main reason for doing it.',
  model: 'It means splitting the single journal into several books, called **subsidiary books** or special journals, each meant for one class of transactions such as cash, credit purchases or credit sales.\n\nThe main reason is that in a growing business one journal cannot handle the large number of similar transactions, so the work is divided among books and clerks.',
  sol: 'Meaning, then the reason of growth in volume.',
  scheme: [['Meaning: separate books for separate classes of transactions', 1], ['Reason: volume of similar transactions, work divided among books and clerks', 1]],
}));
QQ('s2_sub_adv', short({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'The owner of a growing trading firm is thinking of dividing the journal into subsidiary books. List two advantages she can expect, with a reason for each.',
  model: '1. **Saving of time and labour:** a book contains like transactions, so only the total of a period need be posted to an account, instead of every item.\n2. **Easy location of errors and information:** a clerk looks at one book to find a particular kind of transaction, and each clerk is answerable for his own book.',
  sol: 'Any two of time saved, specialisation, easy reference, errors located, fraud checked.',
  scheme: [['First advantage with its reason', 1], ['Second advantage with its reason', 1]],
}));

// ================================================================ short answer, 3 marks
{
  const rows = [
    ['(a) Sold pens on credit to Gita Traders for ₹14,000', 'Sales book'],
    ['(b) Paid salaries of ₹3,000 in cash', 'Cash book'],
    ['(c) Bought goods on credit from Rao Papers for ₹9,500', 'Purchases book'],
    ['(d) Sent back goods worth ₹1,200 to Rao Papers', 'Purchases returns book'],
    ['(e) Gita Traders returned goods worth ₹2,000', 'Sales returns book'],
    ['(f) Charged depreciation of ₹4,000 on furniture', 'Journal proper'],
  ];
  QQ('s3_sub_classify', short({
    t: 1, d: 3, c: 'application', marks: 3,
    stem: 'Name the subsidiary book in which each of the following transactions of Udaya Pens, an imagined firm, is first recorded: (a) sold pens on credit to Gita Traders for ₹14,000; (b) paid salaries of ₹3,000 in cash; (c) bought goods on credit from Rao Papers for ₹9,500; (d) sent back goods worth ₹1,200 to Rao Papers; (e) Gita Traders returned goods worth ₹2,000; (f) charged depreciation of ₹4,000 on furniture.',
    model: mdTable(['Transaction', 'First recorded in'], rows),
    sol: 'Match the nature of each transaction to its book; two correct answers earn one mark.',
    scheme: [['(a) and (b) correct', 1], ['(c) and (d) correct', 1], ['(e) and (f) correct', 1]],
  }));
}
