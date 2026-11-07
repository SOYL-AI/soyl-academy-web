// Case-based items (4 marks: 1 + 1 + 2, part (c) with an either/or), all on imagined businesses and an imagined bank.
import { mcq, short, caseQ, child } from '../../cbse-11-accountancy-ch01/src/lib.mjs';
import { same, inr, rs, I, statement, amended, total } from './figures.mjs';
import { QQ } from './qq.mjs';

// ---------------------------------------------------------------- statement from the cash book, favourable balance
{
  const items = [I('issued', 7300), I('deposited', 10200), I('charges', 180), I('intallowed', 420)];
  const st = statement({ from: 'cash book', bal: 24600, items, expected: 21940 });
  const added = total(st.adds);
  same(added, 7720, 'cb_may added total');
  const rev = statement({ from: 'pass book', bal: 21940, items, expected: 24600 });
  same(total(rev.adds), 10380, 'cb_may reversed adds');
  same(total(rev.lesses), 7720, 'cb_may reversed deductions');
  QQ('cb_may', caseQ({
    t: [2], d: 3, c: 'application', origin: 'soyl-original',
    stem: 'Read the passage and answer the questions that follow. *(An imagined hardware wholesaler reconciling its books in May, written for practice.)*',
    passage: `**Neel Traders and Sagar Bank (imagined)**\n\nOn 31 May 2027 the cash book of Neel Traders, an imagined hardware wholesaler, shows a favourable bank balance of ${rs(24600)}. The accountant compares it with the pass book of Sagar Bank, an imagined bank, and finds: (1) cheques of ${rs(7300)} issued in the last week of May have not been presented; (2) a cheque of ${rs(10200)} deposited on 29 May was credited by the bank on 3 June; (3) the bank debited charges of ${rs(180)} on 31 May; (4) the bank credited interest of ${rs(420)} on 31 May. Items (3) and (4) are not in the cash book.`,
    parts: [
      child('a', mcq({ t: 2, d: 2, c: 'understanding', stem: 'When the statement is prepared starting from the cash book balance, the cheque deposited on 29 May and credited on 3 June is', opts: ['deducted, because the cash book has counted it and the bank has not', 'added, because it is a deposit', 'ignored, because it was credited in June', 'deducted, because the bank credited it late by mistake'], sol: 'The cash book is higher than the pass book by this cheque, so it is deducted to reach the pass book balance. A deposit is added only when the bank has counted it and the cash book has not. The bank has made no mistake.' })),
      child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Find the total of the amounts added in the statement starting from the cash book.', model: `${inr(7300)} + ${inr(420)} = **${rs(added)}**.`, sol: 'The unpresented cheques and the interest are added.', scheme: [[`${rs(added)}`, 1]] })),
      child('c', short({ t: 2, d: 3, c: 'application', marks: 2, stem: '**Either** (i): Prepare the reconciliation statement as on 31 May 2027 and give the balance as per the pass book.', model: `${st.md}\n\nThe pass book balance is **${rs(st.result)}**.`, sol: 'Add two items; deduct two.', scheme: [['Starting balance and items added', 1], [`Balance as per pass book ${rs(st.result)}`, 1]] }), [
        short({ t: 2, d: 4, c: 'analysis', marks: 2, stem: `**Or** (ii): Starting instead from the pass book balance of ${rs(21940)}, state which of the four items would be added and which deducted, and give the cash book balance reached.`, model: `From the pass book the cheques deposited (${rs(10200)}) and the charges (${rs(180)}) are added, and the cheques not presented (${rs(7300)}) and the interest (${rs(420)}) are deducted: ${inr(21940)} + ${inr(10380)} − ${inr(7720)} = **${rs(rev.result)}**.`, sol: 'Each item is treated in the direction opposite to the first statement.', scheme: [['Items (2) and (3) added; items (1) and (4) deducted', 1], [`Cash book balance ${rs(rev.result)}`, 1]] }),
      ]),
    ],
  }));
}

// ---------------------------------------------------------------- pass book overdraft
{
  const items = [I('issued', 5800), I('deposited', 3200), I('odint', 540), I('directdep', 2000)];
  const st = statement({ from: 'pass book', bal: -12400, items, expected: -(12400 + 5800 + 2000 - 3200 - 540) });
  same(st.endAbs, 16460, 'cb_aug overdraft');
  QQ('cb_aug', caseQ({
    t: [2], d: 4, c: 'application', origin: 'soyl-original',
    stem: 'Read the passage and answer the questions that follow. *(An imagined firm with an overdrawn account in August, written for practice.)*',
    passage: `**Neel Traders and Sagar Bank (imagined)**\n\nOn 31 August 2027 the pass book of Sagar Bank shows that Neel Traders, an imagined hardware wholesaler, has overdrawn its account by ${rs(12400)}. The accountant finds: (1) cheques of ${rs(5800)} issued have not been presented; (2) a cheque of ${rs(3200)} deposited on 30 August has not been collected; (3) the bank debited interest on overdraft of ${rs(540)}; (4) a customer, Hema Stores, paid ${rs(2000)} directly into the bank. Items (3) and (4) are not in the cash book.`,
    parts: [
      child('a', mcq({ t: 2, d: 1, c: 'recall', stem: 'The overdraft of the firm appears in the pass book as', opts: ['a debit balance', 'a credit balance', 'a contra entry', 'a favourable balance'], sol: 'The bank has lent money to the firm, so the bank debits the account. The cash book shows the same overdraft as a credit balance.' })),
      child('b', short({ t: 2, d: 2, c: 'understanding', marks: 1, stem: 'State the entry the firm should make in its cash book for item (3).', model: 'Credit the bank column with interest on overdraft, because it is a payment to the bank.', sol: 'A payment, so a credit in the bank column.', scheme: [['Credit the bank column', 1]] })),
      child('c', short({ t: 2, d: 4, c: 'application', marks: 2, stem: '**Either** (i): Starting from the overdraft per the pass book, find the overdraft per the cash book.', model: `${st.md}\n\nThe cash book overdraft is **${rs(st.endAbs)}**.`, sol: 'Items that raise the cash book overdraft are added; items that lower it are deducted.', scheme: [['Overdraft per the pass book as the starting balance; items 1 and 4 added, items 2 and 3 deducted', 1], [`Overdraft per cash book ${rs(st.endAbs)}`, 1]] }), [
        short({ t: 2, d: 4, c: 'analysis', marks: 2, stem: '**Or** (ii): The accountant added the unpresented cheques to the overdraft. A trainee asks why a payment is added and not deducted. Explain.', model: 'The firm has already deducted the cheques in its cash book, so its overdraft is larger than the bank figure by that amount. To reach the cash book overdraft from the pass book overdraft the amount must therefore be added.', wl: [30, 50], sol: 'Overdraft logic: a bigger payment means a bigger overdraft.', scheme: [['The cash book has already recorded the payment', 1], ['So the cash book overdraft is larger and the cheques are added', 1]] }),
      ]),
    ],
  }));
}

// ---------------------------------------------------------------- amended cash book
{
  const items = [I('intallowed', 600), I('charges', 250), I('directpay', 3400), I('issued', 9000), I('deposited', 4500)];
  const am = amended({ bal: 36000, items });
  same(am.newBal, 32950, 'cb_oct amended balance');
  const st = statement({ from: 'cash book', bal: am.newBal, items: am.rest, expected: 37450 });
  QQ('cb_oct', caseQ({
    t: [2], d: 4, c: 'application', origin: 'soyl-original',
    stem: 'Read the passage and answer the questions that follow. *(An imagined firm that amends its cash book in October, written for practice.)*',
    passage: `**Neel Traders and Sagar Bank (imagined)**\n\nOn 31 October 2027 the cash book of Neel Traders, an imagined hardware wholesaler, shows a favourable bank balance of ${rs(36000)}. Comparing it with the pass book, the accountant finds: interest allowed by the bank ${rs(600)}; bank charges ${rs(250)}; rent of ${rs(3400)} paid by the bank on standing instruction (these three are not yet in the cash book); cheques of ${rs(9000)} issued but not presented; and a cheque of ${rs(4500)} deposited but not yet collected. The accountant decides to amend the cash book first.`,
    parts: [
      child('a', mcq({ t: 2, d: 2, c: 'understanding', stem: 'Which of the following will be entered in the amended cash book?', opts: ['The rent paid by the bank on standing instruction', 'The cheques issued but not presented', 'The cheque deposited but not yet collected', 'None of the five items'], sol: 'The items already recorded by the bank and not by the firm, namely interest, charges and the rent, are entered. The cheques are already in the cash book.' })),
      child('b', short({ t: 2, d: 3, c: 'application', marks: 1, stem: 'Find the balance of the amended cash book.', model: `${inr(36000)} + ${inr(600)} − ${inr(250)} − ${inr(3400)} = **${rs(am.newBal)}**.`, sol: 'Interest is a receipt; charges and rent are payments.', scheme: [[`${rs(am.newBal)}`, 1]] })),
      child('c', short({ t: 2, d: 4, c: 'application', marks: 2, stem: '**Either** (i): Starting from the amended balance, prepare the statement and find the pass book balance.', model: `${st.md}\n\nThe pass book balance is **${rs(st.result)}**.`, sol: 'Only the two cheques remain.', scheme: [['Amended balance as the start; unpresented cheques added and uncollected cheque deducted', 1], [`Balance as per pass book ${rs(st.result)}`, 1]] }), [
        short({ t: 2, d: 4, c: 'understanding', marks: 2, stem: '**Or** (ii): Explain why the cheques issued and the cheque deposited are not entered in the amended cash book.', model: 'Both were recorded in the cash book when they were issued and deposited. It is the bank that has not yet recorded them, so they remain as timing differences in the statement and need no cash book entry.', wl: [30, 50], sol: 'Recorded by the firm first.', scheme: [['Already recorded in the cash book', 1], ['The bank has not yet recorded them, so they stay in the statement', 1]] }),
      ]),
    ],
  }));
}

// ---------------------------------------------------------------- evaluating a statement
{
  const items = [I('issued', 6000), I('deposited', 4000), I('charges', 250)];
  const st = statement({ from: 'cash book', bal: 20000, items, expected: 21750 });
  const wrong = 20000 - 6000 + 4000 - 250;
  same(wrong, 17750, 'cb_dec assistant result');
  same(st.result - wrong, 4000, 'cb_dec difference');
  QQ('cb_dec', caseQ({
    t: [2], d: 4, c: 'evaluation', origin: 'soyl-original',
    stem: 'Read the passage and answer the questions that follow. *(An imagined December statement prepared by a new assistant, to be judged, written for practice.)*',
    passage: `**Neel Traders and Sagar Bank (imagined)**\n\nOn 31 December 2027 the cash book of Neel Traders, an imagined hardware wholesaler, shows a favourable bank balance of ${rs(20000)}. The pass book of Sagar Bank shows ${rs(21750)}. A new assistant prepares a statement starting from the cash book: he deducts cheques issued but not presented (${rs(6000)}), adds a cheque deposited but not collected (${rs(4000)}) and deducts bank charges not yet entered (${rs(250)}). He gets ${rs(wrong)}, concludes that the bank has made a mistake of ${rs(st.result - wrong)}, and writes to the bank.`,
    parts: [
      child('a', mcq({ t: 2, d: 2, c: 'analysis', stem: 'The assistant\'s statement does not agree with the pass book mainly because he', opts: ['treated the unpresented cheques and the uncollected cheque in the wrong direction', 'added the bank charges', 'started from the cash book', 'ignored the bank charges'], sol: 'Starting from a favourable cash book balance, unpresented cheques are added and uncollected cheques are deducted; he did the reverse. The charges were correctly deducted, and starting from the cash book is allowed.' })),
      child('b', short({ t: 2, d: 3, c: 'application', marks: 1, stem: 'Find the correct pass book balance from the cash book.', model: `${inr(20000)} + ${inr(6000)} − ${inr(4000)} − ${inr(250)} = **${rs(st.result)}**.`, sol: 'Correct the two signs.', scheme: [[`${rs(st.result)}`, 1]] })),
      child('c', short({ t: 2, d: 5, c: 'evaluation', marks: 2, stem: '**Either** (i): Judge whether the bank made a mistake, giving a reason in figures.', model: `No. With the correct treatment the statement reaches ${rs(st.result)}, the pass book figure. The gap of ${rs(st.result - wrong)} came from the assistant treating ${rs(6000)} and ${rs(4000)} the wrong way round, so the letter to the bank should be withdrawn.`, sol: 'The assistant, not the bank, erred.', scheme: [['The corrected statement agrees with the pass book', 1], ['The gap is explained by the two wrong signs; the letter should be withdrawn', 1]] }), [
        short({ t: 2, d: 4, c: 'analysis', marks: 2, stem: '**Or** (ii): State the rule the assistant should follow for cheques when starting from a favourable cash book balance, and explain why it works.', model: 'Cheques issued but not presented are added and cheques deposited but not collected are deducted. The cash book has already deducted the first and added the second, but the bank has not recorded either.', wl: [30, 50], sol: 'Reverse what the cash book has done.', scheme: [['The rule stated correctly for both kinds of cheque', 1], ['Reason: the cash book has recorded them and the bank has not', 1]] }),
      ]),
    ],
  }));
}
