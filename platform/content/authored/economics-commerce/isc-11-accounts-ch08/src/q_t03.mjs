// t03: a BRS from extracts of the cash book and the pass book: matching, the unmatched items, and items of the
// previous period. Every extract is generated from a list of transactions by recon.mjs (twoBooks, cbExtract,
// pbExtract); both balances are found independently and the statement is asserted against the other book.
import { mcq, ar, tf, fb, short, long } from './lib.mjs';
import { same, mdTable, rs, I, L, twoBooks, recon } from './fig.mjs';
import { numQ, QQ } from './qq.mjs';
import { cbExtract, pbExtract, matching } from './recon.mjs';

const R = (n) => rs(n);
const both = (bk) => `**Cash book (bank column)**\n\n${cbExtract(bk).md}\n\n**Pass book**\n\n${pbExtract(bk).md}`;

// ---------------------------------------------------------------- the extracts used by this file
// Fabiola Bakery, December 2027: books agree at the start; four unmatched entries.
const FAB = twoBooks({
  cbOpen: 15000, pbOpen: 15000, openDate: '1 Dec', closeDate: '31 Dec',
  tx: [
    { cbText: 'To Karnik & Co.', cbDate: '4 Dec', cb: 7000, pbText: 'By Clearing', pbDate: '5 Dec', pb: 7000 },
    { cbText: 'By Mehra Flour (cheque 5101)', cbDate: '10 Dec', cb: -3000, pbText: 'To Cheque 5101', pbDate: '12 Dec', pb: -3000 },
    { cbText: 'By Packaging (cheque 5103)', cbDate: '20 Dec', cb: -2000, item: L(I('issued', 2000), 'Cheque 5103 issued on 20 December, not yet presented', 'Cheque 5103') },
    { cbText: 'To Bhatt Caterers', cbDate: '28 Dec', cb: 4500, item: L(I('deposited', 4500), 'Cheque of Bhatt Caterers deposited on 28 December, not yet credited', 'Cheque of Bhatt Caterers') },
    { pbText: 'To Bank charges', pbDate: '31 Dec', pb: -120, item: L(I('charges', 120), 'Bank charges', 'Bank charges') },
    { pbText: 'By Interest', pbDate: '31 Dec', pb: 300, item: L(I('intallowed', 300), 'Interest credited by the bank', 'Interest credited by the bank') },
  ],
});
same(FAB.cbClose, 21500, 'Fabiola cash book');
same(FAB.pbClose, 19180, 'Fabiola pass book');
// Orchid Looms, March 2028: a cheque of the previous month clears in this month.
const ORC = twoBooks({
  cbOpen: 9500, pbOpen: 10700, openDate: '1 Mar', closeDate: '31 Mar',
  openItems: [L(I('issued', 1200), 'Cheque 7710 issued in February, not yet presented', 'Cheque 7710')],
  tx: [
    { cbText: 'To Salve Traders', cbDate: '5 Mar', cb: 6000, pbText: 'By Clearing', pbDate: '7 Mar', pb: 6000 },
    { pbText: 'To Cheque 7710', pbDate: '9 Mar', pb: -1200, clears: 0 },
    { cbText: 'By Dye supplies (cheque 7714)', cbDate: '15 Mar', cb: -4000, pbText: 'To Cheque 7714', pbDate: '18 Mar', pb: -4000 },
    { cbText: 'By Carriage (cheque 7716)', cbDate: '26 Mar', cb: -2800, item: L(I('issued', 2800), 'Cheque 7716 issued on 26 March, not yet presented', 'Cheque 7716') },
    { pbText: 'By Interest', pbDate: '31 Mar', pb: 260, item: L(I('intallowed', 260), 'Interest credited by the bank', 'Interest credited by the bank') },
    { pbText: 'To Bank charges', pbDate: '31 Mar', pb: -90, item: L(I('charges', 90), 'Bank charges', 'Bank charges') },
  ],
});
same(ORC.cbClose, 8700, 'Orchid cash book');
same(ORC.pbClose, 11670, 'Orchid pass book');
// Naveen Cement Dealers, October 2028: favourable, two cheques of the previous month (one clears, one stays open).
const NAV = twoBooks({
  cbOpen: 32000, pbOpen: 38500, openDate: '1 Oct', closeDate: '31 Oct',
  openItems: [L(I('issued', 4600), 'Cheque 0471 issued in September, not yet presented', 'Cheque 0471'), L(I('issued', 1900), 'Cheque 0469 issued in September, not yet presented', 'Cheque 0469')],
  tx: [
    { cbText: 'To Jain Builders', cbDate: '3 Oct', cb: 18000, pbText: 'By Clearing', pbDate: '5 Oct', pb: 18000 },
    { cbText: 'By Kamal Cement (cheque 0472)', cbDate: '6 Oct', cb: -12500, pbText: 'To Cheque 0472', pbDate: '11 Oct', pb: -12500 },
    { pbText: 'To Cheque 0471', pbDate: '9 Oct', pb: -4600, clears: 0 },
    { cbText: 'By Wages (cheque 0473)', cbDate: '14 Oct', cb: -6000, pbText: 'To Cheque 0473', pbDate: '16 Oct', pb: -6000 },
    { cbText: 'To Sodhi Constructions', cbDate: '30 Oct', cb: 9200, item: L(I('deposited', 9200), 'Cheque of Sodhi Constructions deposited on 30 October, not yet credited', 'Cheque of Sodhi Constructions') },
    { cbText: 'By Freight (cheque 0476)', cbDate: '27 Oct', cb: -3300, item: L(I('issued', 3300), 'Cheque 0476 issued on 27 October, not yet presented', 'Cheque 0476') },
    { pbText: 'By Rent collected', pbDate: '12 Oct', pb: 7000, item: L(I('collected', 7000), 'Rent collected by the bank', 'Rent collected by the bank') },
    { pbText: 'To Loan instalment (standing instruction)', pbDate: '22 Oct', pb: -5000, item: L(I('directpay', 5000), 'Loan instalment paid by the bank on standing instruction', 'Loan instalment paid by the bank') },
    { pbText: 'To Bank charges', pbDate: '31 Oct', pb: -550, item: L(I('charges', 550), 'Bank charges', 'Bank charges') },
  ],
});
same(NAV.cbClose, 37400, 'Naveen cash book');
same(NAV.pbClose, 34850, 'Naveen pass book');
// Quartz Tiles, November 2028: both books overdrawn.
const QUA = twoBooks({
  cbOpen: -24000, pbOpen: -21500, openDate: '1 Nov', closeDate: '30 Nov',
  openItems: [L(I('issued', 2500), 'Cheque 3912 issued in October, not yet presented', 'Cheque 3912')],
  tx: [
    { cbText: 'To Mahendra Homes', cbDate: '3 Nov', cb: 15000, pbText: 'By Clearing', pbDate: '6 Nov', pb: 15000 },
    { pbText: 'To Cheque 3912', pbDate: '8 Nov', pb: -2500, clears: 0 },
    { cbText: 'By Salaries (cheque 3915)', cbDate: '10 Nov', cb: -8400, pbText: 'To Cheque 3915', pbDate: '12 Nov', pb: -8400 },
    { cbText: 'By Purchases (cheque 3918)', cbDate: '17 Nov', cb: -11000, pbText: 'To Cheque 3918', pbDate: '21 Nov', pb: -11000 },
    { cbText: 'To Anita Stores', cbDate: '24 Nov', cb: 6800, item: L(I('deposited', 6800), 'Cheque of Anita Stores deposited on 24 November, not yet credited', 'Cheque of Anita Stores') },
    { cbText: 'By Carriage (cheque 3921)', cbDate: '28 Nov', cb: -2200, item: L(I('issued', 2200), 'Cheque 3921 issued on 28 November, not yet presented', 'Cheque 3921') },
    { pbText: 'By Transfer: Rizvi', pbDate: '25 Nov', pb: 4000, item: L(I('directdep', 4000), 'Direct deposit by Rizvi', 'Direct deposit by Rizvi') },
    { pbText: 'To Interest on overdraft', pbDate: '30 Nov', pb: -1750, item: L(I('odint', 1750), 'Interest on overdraft', 'Interest on overdraft') },
    { pbText: 'To Cheque returned: Burman', pbDate: '29 Nov', pb: -3500, item: L(I('dishonour', 3500), 'Cheque of Burman returned unpaid', 'Cheque of Burman returned unpaid') },
  ],
});
same(QUA.cbClose, -23800, 'Quartz cash book');
same(QUA.pbClose, -29650, 'Quartz pass book');
export { FAB, ORC, NAV, QUA };

// ================================================================ multiple choice
QQ('m_chk_match', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'While comparing the two extracts of an imagined firm, a clerk finds a payment by cheque on the credit side of the bank column of the cash book with no matching withdrawal in the pass book. It is',
  opts: ['a cheque issued but not yet presented for payment', 'a cheque deposited but not yet credited', 'a direct payment by the bank', 'an item that needs no entry anywhere'],
  sol: 'The firm has written the payment, but the bank has not yet paid the cheque. A deposit not yet credited would be on the debit side, and a direct payment would appear in the pass book only.',
}));
QQ('m_prev_period', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'In the reconciliation of February, a cheque of ₹3,000 issued by Parmar Gifts, an imagined firm, was listed as not yet presented. The bank paid it on 4 March, so it is in the March pass book but not in the March cash book, because the firm wrote it in February. In the March reconciliation this cheque is',
  opts: ['not a reconciling item, because it is now in the pass book as well as in the earlier cash book', 'added to the cash book balance again', 'deducted from the pass book balance', 'treated as a bank error to be corrected by the bank'],
  sol: 'The earlier statement allowed for the cheque; once the bank pays it, the two books agree about it, so it falls out of the list. Adding or deducting it again would count it twice, and the bank has made no error.',
}));
QQ('m_unmatched_pb', mcq({
  t: 3, d: 3, c: 'understanding',
  stem: 'The pass book extract of an imagined firm has an entry "By Transfer: Rizvi, ₹4,000" for which the cash book extract has no matching entry. To bring the cash book up to date, the firm must',
  opts: ['enter a receipt of ₹4,000 on the debit side of the bank column', 'enter a payment of ₹4,000 on the credit side of the bank column', 'ask the bank to remove the entry', 'make no entry, because it is a timing difference'],
  sol: 'A direct deposit raised the bank balance, and the cash book has not yet recorded it, so a receipt is entered. It is not a timing difference, since the firm has made no entry at all.',
}));
{
  QQ('m_pick_items', mcq({
    t: 3, d: 3, c: 'application',
    stem: `While matching the December 2027 extracts of Fabiola Bakery, an imagined firm, a clerk is left with four unmatched entries: a payment of ${R(2000)} on 20 December and a receipt of ${R(4500)} on 28 December, both in the cash book only; and bank charges of ${R(120)} and interest of ${R(300)} on 31 December, both in the pass book only. Which two of these entries each make the cash book balance higher than the pass book balance?`,
    opts: ['the receipt of 28 December and the bank charges', 'the payment of 20 December and the interest', 'the receipt of 28 December and the interest', 'the payment of 20 December and the bank charges'],
    sol: `The receipt of ${R(4500)} has raised the cash book but not yet the pass book, and the charges of ${R(120)} have lowered the pass book but not yet the cash book: both leave the cash book higher. The unpresented payment of ${R(2000)} and the interest of ${R(300)} each leave the pass book higher, so any pair containing either of them is wrong.`,
  }));
}

// ================================================================ numerical
{
  // Anvil Cycles, September 2028: one cheque of the previous month is still unpresented.
  const ANV = twoBooks({
    cbOpen: 10000, pbOpen: 12600, openDate: '1 Sep', closeDate: '30 Sep',
    openItems: [L(I('issued', 2600), 'Cheque 8801 issued in August, not yet presented', 'Cheque 8801')],
    tx: [
      { cbText: 'To Gill Motors', cbDate: '3 Sep', cb: 6000, pbText: 'By Clearing', pbDate: '5 Sep', pb: 6000 },
      { cbText: 'By Alloy supplies (cheque 8804)', cbDate: '12 Sep', cb: -3500, pbText: 'To Cheque 8804', pbDate: '15 Sep', pb: -3500 },
      { cbText: 'By Paint (cheque 8806)', cbDate: '20 Sep', cb: -1800, item: L(I('issued', 1800), 'Cheque 8806', 'Cheque 8806') },
      { cbText: 'By Tyres (cheque 8809)', cbDate: '25 Sep', cb: -900, item: L(I('issued', 900), 'Cheque 8809', 'Cheque 8809') },
      { pbText: 'To Bank charges', pbDate: '30 Sep', pb: -140, item: L(I('charges', 140), 'Bank charges', 'Bank charges') },
    ],
  });
  const total = [...ANV.stillOpen, ...ANV.fresh].filter((i) => i.key === 'issued').reduce((x, i) => x + i.amount, 0);
  same(total, 5300, 'n_unpresented');
  QQ('n_unpresented', numQ({
    t: 3, d: 4, c: 'application', marks: 1, value: total,
    stem: `Study the extracts of Anvil Cycles, an imagined firm, for September 2028. On 1 September its reconciliation showed one cheque, no. 8801 for ${R(2600)}, issued in August and not yet presented.

${both(ANV)}

The total of the cheques issued but not yet presented on 30 September is (in ₹)`,
    sol: `Cheque 8801 of the earlier month has still not reached the pass book, so it stays, and cheques 8806 and 8809 are new: ${R(2600)} + ${R(1800)} + ${R(900)} = ${R(5300)}.`,
  }));
}
{
  const diff = ORC.pbClose - ORC.cbClose;
  same(diff, 2970, 'n_pb_over_cb');
  QQ('n_pb_over_cb', numQ({
    t: 3, d: 3, c: 'application', marks: 1, value: diff,
    stem: `Study the extracts of Orchid Looms, an imagined firm, for March 2028. The February statement showed cheque 7710 for ${R(1200)} issued and not yet presented.\n\n${both(ORC)}\n\nBy how much does the pass book balance exceed the cash book balance on 31 March 2028 (in ₹)?`,
    sol: `The balances are read off the two extracts: ${R(ORC.pbClose)} − ${R(ORC.cbClose)} = ${R(diff)}.`,
  }));
}

// ================================================================ assertion-reason, true-false, fill-blank
QQ('ar_match', ar({
  t: 3, d: 3, c: 'understanding', verdict: 'both-true-not-explains',
  a: 'Two entries of the same amount, one in the cash book on 2 March and one in the pass book on 4 March, are treated as matching.',
  r: 'A reconciliation statement lists only the items that are found in one book alone.',
  sol: 'Both are true. The assertion holds because the dates differ but the amounts agree. The reason is also true, but it describes what goes into the statement rather than why entries with different dates still match.',
}));
QQ('tf_dates', tf({
  t: 3, d: 2, c: 'understanding', ans: false,
  stem: 'Two entries of the same amount in the cash book and the pass book of an imagined firm match only if they carry the same date in both books.',
  sol: 'A cheque is usually credited or paid by the bank on a later date than the date of the cash book entry. Entries match on amount and nature, and the dates may differ.',
}));
QQ('fb_unmatched', fb({
  t: 3, d: 2, c: 'understanding',
  stem: 'An entry that is found in the pass book extract but has no counterpart in the cash book extract needs an entry in the ___ book.',
  acc: [['cash', 'cash book']],
  sol: 'The cash book has not recorded the item, so it is the cash book that must be brought up to date; the pass book is the bank\'s record and is left as it is.',
}));

// ================================================================ short answer, 2 marks
QQ('s2_match_steps', short({
  t: 3, d: 2, c: 'understanding', marks: 2,
  stem: 'State the steps in preparing a bank reconciliation statement from the extracts of the cash book and the pass book of a firm.',
  model: '1. Find the **balance as per each book**: the closing balance of the bank column and the last balance of the pass book.\n2. **Match** each entry of the cash book with the pass book by amount and nature, and tick the matched pairs.\n3. List the entries **left unticked** in either book, together with any items of the previous period that are still open.\n4. Start from one balance, **add and deduct** the listed items by their effect, and check that the result is the other balance.',
  sol: 'Balances, matching, unmatched list, statement and check.',
  scheme: [['Balances of both books found and entries matched', 1], ['Unmatched items listed and applied to one balance to reach the other, with a check', 1]],
}));
QQ('s2_prev_item', short({
  t: 3, d: 3, c: 'analysis', marks: 2,
  stem: 'The February statement of an imagined firm showed a cheque of ₹1,200 issued and not yet presented. In March a withdrawal of ₹1,200 appears in the pass book, but there is no entry for it in the March cash book. Explain how this entry is treated in the March reconciliation.',
  model: 'The cash book recorded the cheque in **February**, so it has no March entry. The withdrawal in the March pass book is the bank **paying** the cheque, so it settles the item that was listed as not yet presented.\n\nIt is therefore **not** a new reconciling item: it does not appear in the March statement, and no entry is made in the cash book.',
  sol: 'The item of the previous period is now matched, so it drops out of the statement.',
  scheme: [['Recognises the withdrawal as the payment of the February cheque', 1], ['States that it is not a March reconciling item and needs no cash book entry', 1]],
}));

// ================================================================ short answer, 3 marks
{
  const r = recon(FAB);
  QQ('s3_ext_small', short({
    t: 3, d: 3, c: 'application', marks: 3,
    stem: `From the following extracts of Fabiola Bakery, an imagined firm, prepare a bank reconciliation statement as on 31 December 2027.\n\n${both(FAB)}`,
    model: `${r.fromCB.md}\n\nBalance as per the pass book agrees with the closing balance of the pass book extract, ${R(FAB.pbClose)}.`,
    sol: 'Match the entries first; the four unmatched entries are the items of the statement.',
    scheme: [['Matching done and the four unmatched items identified', 1], ['Statement started from the cash book balance with items added and deducted correctly', 1], ['Balance as per pass book agrees with the extract', 1]],
  }));
  const r2 = recon(ORC);
  QQ('s3_ext_prev', short({
    t: 3, d: 4, c: 'application', marks: 3,
    stem: `On 1 March 2028 the reconciliation of Orchid Looms, an imagined firm, showed cheque 7710 for ${R(1200)} issued and not yet presented. Prepare a bank reconciliation statement as on 31 March 2028 from the extracts below.\n\n${both(ORC)}`,
    model: `${r2.fromCB.md}\n\nCheque 7710 was paid on 9 March, so it is not in the statement.`,
    sol: 'The opening item is cleared by the 9 March withdrawal, so only the new items are listed.',
    scheme: [['Opening item recognised as cleared and left out', 1], ['Statement started from the cash book balance, items added and deducted correctly', 1], ['Balance as per pass book found', 1]],
  }));
  const m = matching(FAB);
  QQ('s3_match_table', short({
    t: 3, d: 3, c: 'application', marks: 3,
    stem: `Compare the two extracts of Fabiola Bakery, an imagined firm, for December 2027. State which entries are in both books, which are in the cash book only and which are in the pass book only. (A statement is not required.)\n\n${both(FAB)}`,
    model: m.md,
    sol: 'Match by amount and nature, not by date.',
    scheme: [['Entries found in both books identified', 1], ['Entries in the cash book only identified', 1], ['Entries in the pass book only identified', 1]],
  }));
}

// ================================================================ long answer, 5 marks
{
  const r = recon(NAV);
  QQ('l5_ext_fav', long({
    t: 3, d: 4, c: 'application', marks: 5,
    stem: `On 1 October 2028 the reconciliation of Naveen Cement Dealers, an imagined firm, showed two cheques issued in September and not yet presented: no. 0469 for ${R(1900)} and no. 0471 for ${R(4600)}. From the extracts below, prepare a bank reconciliation statement as on 31 October 2028.\n\n${both(NAV)}`,
    model: `${r.fromCB.md}\n\nCheque 0471 was paid on 9 October, so only cheque 0469 of the earlier month is still unpresented, and the statement lists it with the new cheque 0476. The pass book balance agrees with the extract, ${R(NAV.pbClose)}.`,
    sol: 'Match the entries, remove the cleared cheque of the earlier month, and list the rest.',
    scheme: [['Entries matched and the cleared cheque 0471 left out', 1], ['Statement started from the cash book balance, with the items to be added correctly listed (both cheques not presented, rent collected)', 1], ['Items to be deducted correctly listed (deposit not credited, instalment, charges)', 1], ['Subtotals correct', 1], ['Balance as per pass book found and agreed with the extract', 1]],
  }));
  const q = recon(QUA);
  QQ('l5_ext_od', long({
    t: 3, d: 5, c: 'analysis', marks: 5,
    stem: `On 1 November 2028 the reconciliation of Quartz Tiles, an imagined firm, showed cheque 3912 for ${R(2500)} issued in October and not yet presented. Both books show overdrafts. From the extracts below, prepare a bank reconciliation statement as on 30 November 2028, starting from the pass book balance.\n\n${both(QUA)}`,
    model: `${q.fromPB.md}\n\nThe cash book overdraft agrees with the extract, ${R(-QUA.cbClose)}. Cheque 3912 was paid on 8 November and is not in the statement.`,
    sol: 'Start with the pass book overdraft. Items that leave the cash book overdraft the larger (the cheque not presented, the direct deposit) are added; items that made the bank overdraft the larger (the deposit not credited, the interest, the returned cheque) are deducted.',
    scheme: [['Entries matched and the cleared cheque 3912 left out', 1], ['Statement started with the overdraft as per the pass book', 1], ['Items that deepen and lessen the overdraft grouped correctly', 1], ['Subtotals correct', 1], ['Overdraft as per cash book found and agreed with the extract', 1]],
  }));
}

// ================================================================ extra understanding item
QQ('tf_pb_only', tf({
  t: 3, d: 2, c: 'understanding', ans: false,
  stem: 'Every entry that appears in the pass book of an imagined firm but has no counterpart in its cash book is an error made by the bank.',
  sol: 'Most such entries are genuine bank items, for example charges, interest or a direct deposit, which the firm has not yet written; only an entry the bank should not have made is a bank error.',
}));
