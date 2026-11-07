// t02: preparation of the bank reconciliation statement: starting from either book, with a favourable balance or an
// overdraft, with and without an amended cash book. Every firm, bank and person is imagined; every derived amount is
// computed with recon.mjs and asserted.
import { mcq, ord, short, long } from '../../cbse-11-accountancy-ch01/src/lib.mjs';
import { same, inr, rs, I, errCB, errBank, statement, amended, total } from './figures.mjs';
import { QQ, numQ, S2, S3 } from './qq.mjs';

// ================================================================ multiple choice
QQ('m_cb_issued', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Neel Traders prepares a statement from a favourable balance in its cash book. Cheques issued but not yet presented for payment are',
  opts: ['added, because the cash book has already deducted them and the bank has not', 'deducted, because they have not been paid by the bank', 'ignored, because they are timing differences', 'deducted, because the cash book has already deducted them'],
  sol: 'The cash book is lower than the pass book by these cheques, so they are added to reach the pass book balance. Deducting them would count the same payment twice, and a timing difference still has to be shown.',
}));
QQ('m_pb_dep', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Starting from a favourable balance in the pass book, Neel Traders treats cheques deposited but not yet collected by the bank as',
  opts: ['an addition, because the cash book has already counted them and the bank has not', 'a deduction, because the bank has not yet credited them', 'an addition, because they are credits in the pass book', 'not to be shown, because the bank will credit them later'],
  sol: 'The cash book already includes these cheques and is therefore higher than the pass book. From the pass book the amount is added to reach the cash book balance.',
}));
QQ('m_od_issued', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'On 30 June 2027 the pass book of Neel Traders shows an overdraft. Starting from this overdraft, a cheque issued but not yet presented is',
  opts: ['added, because the cash book overdraft is larger by the amount of the cheque', 'deducted, because the cheque is a payment', 'added, because every payment is added to a balance', 'ignored, because an overdraft cannot be reconciled'],
  sol: 'The cash book has already recorded the payment, so its overdraft is larger than the bank\'s by that amount; the cheque therefore raises the overdraft and is added. The rule of adding or deducting is reversed when the start is an overdraft.',
}));
QQ('m_amended', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Before preparing a statement, the accountant of Neel Traders first prepares an amended cash book. Its purpose is to',
  opts: ['record in the cash book the items the bank has already recorded but the firm has not, so that only the remaining timing differences are left for the statement', 'record cheques issued but not presented, so that the pass book can be corrected', 'correct the pass book using the cash book', 'remove all differences so that no statement is needed'],
  sol: 'The amended cash book brings the firm\'s record up to date for bank charges, interest, direct deposits and similar items. The statement is still needed, because cheques issued and deposited but not yet cleared remain as timing differences.',
}));
QQ('m_after', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'After the cash book of Neel Traders has been amended, the items that normally remain in the reconciliation statement are',
  opts: ['cheques issued but not yet presented and cheques deposited but not yet collected', 'bank charges and interest on overdraft', 'direct deposits and dividends collected by the bank', 'every difference found at the start'],
  sol: 'Items the bank recorded first have now been entered in the cash book. Only items recorded by the firm first, the unpresented and uncollected cheques, still separate the balances. A bank error would also remain.',
}));
{
  const items = [I('issued', 4000), I('deposited', 7000), I('charges', 150)];
  const st = statement({ from: 'cash book', bal: 18000, items, expected: 14850 });
  same(st.result, 14850, 'm_cb_amount');
  const wrongSigns = 18000 - 4000 + 7000 - 150;
  const noCharges = 18000 + 4000 - 7000;
  const allAdded = 18000 + 4000 + 7000 + 150;
  QQ('m_cb_amount', mcq({
    t: 2, d: 3, c: 'application',
    stem: `On 30 April 2027 the cash book of Neel Traders shows a favourable balance of ${rs(18000)}. Cheques of ${rs(4000)} were issued but not presented, a cheque of ${rs(7000)} was deposited but not yet collected, and Sagar Bank charged ${rs(150)} that the firm has not entered. The balance as per the pass book is`,
    opts: [rs(st.result), rs(wrongSigns), rs(noCharges), rs(allAdded)],
    sol: `Add the cheques not presented, deduct the cheque not collected and the charges: ${inr(18000)} + ${inr(4000)} − ${inr(7000)} − ${inr(150)} = ${rs(st.result)}. ${rs(wrongSigns)} reverses the first two signs, ${rs(noCharges)} leaves out the bank charges, and ${rs(allAdded)} adds everything.`,
  }));
}
{
  const st = statement({ from: 'cash book', bal: 6000, items: [I('issued', 1500), I('directpay', 9500)], expected: -2000 });
  same(st.endAbs, 2000, 'm_od_calc');
  QQ('m_od_calc', mcq({
    t: 2, d: 3, c: 'application',
    stem: `The cash book of Neel Traders shows a favourable balance of ${rs(6000)} on 31 May 2027. Cheques of ${rs(1500)} were issued but not presented, and Sagar Bank paid an insurance premium of ${rs(9500)} on standing instruction that the firm has not entered. The pass book balance is`,
    opts: [`an overdraft of ${rs(st.endAbs)}`, `a favourable balance of ${rs(st.endAbs)}`, `a favourable balance of ${rs(6000 + 1500 + 9500)}`, `an overdraft of ${rs(6000 - 1500 + 9500)}`],
    sol: `${inr(6000)} + ${inr(1500)} − ${inr(9500)} = −${inr(st.endAbs)}. A negative result is not a favourable balance: it is an overdraft of ${rs(st.endAbs)}. The other options ignore the sign or add every item.`,
  }));
}
QQ('m_bank_err', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'On 31 March 2027 Neel Traders finds that Sagar Bank debited its account with a cheque of ₹3,000 that was drawn by another customer. In the statement and the books of the firm this item',
  opts: ['remains in the reconciliation statement as a bank error until the bank corrects it, and the firm makes no cash book entry', 'is entered in the amended cash book by crediting the bank column', 'is entered in the cash book by debiting the bank column', 'is ignored, because the bank can never make a mistake'],
  sol: 'The mistake is the bank\'s, so the firm\'s cash book is right and is not changed. The item stays in the statement as a reconciling item until the bank puts it right.',
}));
QQ('m_dishonour_pb', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'Neel Traders starts from a favourable balance in its pass book. A customer\'s cheque deposited earlier was dishonoured and debited by the bank, but the cash book still shows it as a receipt. In the statement this cheque is',
  opts: ['added, because the cash book balance is higher by the cheque', 'deducted, because the bank has debited it', 'ignored, because the cheque was deposited', 'added to the pass book and entered in the cash book as a receipt'],
  sol: 'The cash book still counts a receipt that the bank has reversed, so it is higher than the pass book by the cheque. Starting from the pass book, the amount is added to reach the cash book figure.',
}));
QQ('m_start_choice', mcq({
  t: 2, d: 3, c: 'evaluation',
  stem: 'Two assistants of Neel Traders prepare statements for 30 September 2026 from the same books, one starting from the cash book and the other from the pass book. Which judgement is correct?',
  opts: ['Both are right: each ends at the other book\'s balance, and every item that is added in one statement is deducted in the other', 'Only the statement starting from the pass book can be right', 'Both are right, and each item is added in both statements', 'The two statements may end at different figures'],
  sol: 'The same differences are used. Reversing the starting book reverses the direction in which each is applied, so both statements reach the opposite book\'s balance. Adding an item in both statements would make them disagree.',
}));
QQ('m_amend_which', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'Which of the following is entered in the amended cash book of Neel Traders?',
  opts: ['Interest of ₹640 allowed by Sagar Bank and shown in the pass book', 'A cheque of ₹6,500 issued and not yet presented', 'A cheque of ₹9,000 deposited and not yet collected', 'A mistaken credit of ₹2,000 made by the bank'],
  sol: 'An amended cash book takes in what the bank has recorded and the firm has not, such as interest. The two cheques are already in the cash book, and the mistaken credit is the bank\'s own error, which the bank must correct.',
}));

QQ('ord_steps', ord({
  t: 2, d: 2, c: 'understanding', marks: 2,
  stem: 'Arrange in order the steps of preparing a bank reconciliation statement.',
  items: ['Note the balance of the book chosen as the starting point and whether it is favourable or an overdraft', 'Compare the cash book with the pass book entry by entry and list every difference', 'Decide for each difference whether it is added or deducted, from the starting book and balance', 'Add and deduct the items to reach the balance of the other book', 'Check the result against the balance actually shown by the other book'],
  sol: 'Begin with the starting balance, find the differences, decide the sign of each, work out the result and finally check it.',
}));

// ================================================================ numerical (all values computed)
{
  const items = [I('issued', 9600), I('deposited', 14400), I('intallowed', 580), I('charges', 340)];
  const st = statement({ from: 'cash book', bal: 45200, items, expected: 40640 });
  QQ('n_brs_cb', numQ({
    t: 2, d: 3, c: 'application', value: st.result, unit: '₹',
    stem: `The cash book of Neel Traders shows a favourable balance of ${rs(45200)} on 30 November 2026. Cheques of ${rs(9600)} issued have not been presented; cheques of ${rs(14400)} deposited have not been collected; Sagar Bank credited interest of ${rs(580)} and debited charges of ${rs(340)}, neither yet entered in the cash book. Find the balance as per the pass book (in ₹).`,
    sol: `${inr(45200)} + ${inr(9600)} − ${inr(14400)} + ${inr(580)} − ${inr(340)} = ${rs(st.result)}.`,
  }));
}
{
  const items = [I('issued', 7800), I('deposited', 11000), I('directdep', 5000), I('directpay', 2400)];
  const st = statement({ from: 'pass book', bal: 56300, items, expected: 56900 });
  QQ('n_brs_pb', numQ({
    t: 2, d: 3, c: 'application', value: st.result, unit: '₹',
    stem: `The pass book of Neel Traders shows a favourable balance of ${rs(56300)} on 31 December 2026. Cheques of ${rs(7800)} issued are not yet presented, cheques of ${rs(11000)} deposited are not yet collected, a customer paid ${rs(5000)} directly into the bank and the bank paid ${rs(2400)} on standing instruction, the last two not yet in the cash book. Find the balance as per the cash book (in ₹).`,
    sol: `From the pass book: ${inr(56300)} − ${inr(7800)} + ${inr(11000)} − ${inr(5000)} + ${inr(2400)} = ${rs(st.result)}. The unpresented cheques and the direct deposit are deducted, the other two items are added.`,
  }));
}
{
  const items = [I('issued', 6000), I('deposited', 4500), I('odint', 640)];
  const st = statement({ from: 'cash book', bal: -13500, items, expected: -12640 });
  QQ('n_od_cb', numQ({
    t: 2, d: 4, c: 'application', value: st.endAbs, unit: '₹',
    stem: `On 31 January 2027 the cash book of Neel Traders shows an overdraft of ${rs(13500)}. Cheques of ${rs(6000)} issued have not been presented, a cheque of ${rs(4500)} deposited has not been collected, and the bank has debited interest on overdraft of ${rs(640)} that is not in the cash book. Find the overdraft as per the pass book (in ₹).`,
    sol: `Start from the overdraft of ${inr(13500)}. The unpresented cheques lower the cash book overdraft relative to the bank's, so they are deducted; the uncollected cheque and the interest debited only by the bank raise the pass book overdraft, so they are added: ${inr(13500)} − ${inr(6000)} + ${inr(4500)} + ${inr(640)} = ${rs(st.endAbs)}.`,
  }));
}
{
  const items = [I('intallowed', 450), I('collected', 3000), I('charges', 180), I('directpay', 2600)];
  const am = amended({ bal: 33750, items });
  same(am.newBal, 34420, 'n_amended');
  QQ('n_amended', numQ({
    t: 2, d: 3, c: 'application', value: am.newBal, unit: '₹',
    stem: `On 28 February 2027 the cash book of Neel Traders shows a favourable balance of ${rs(33750)}. Sagar Bank has allowed interest of ${rs(450)}, collected a dividend of ${rs(3000)}, debited charges of ${rs(180)} and paid ${rs(2600)} on standing instruction, none of which the firm has entered. Find the favourable balance of the amended cash book (in ₹).`,
    sol: `${inr(33750)} + ${inr(450)} + ${inr(3000)} − ${inr(180)} − ${inr(2600)} = ${rs(am.newBal)}. Interest and the dividend are receipts; charges and the premium are payments.`,
  }));
}
{
  const items = [I('dishonour', 4600), I('charges', 150)];
  const am = amended({ bal: 27800, items });
  same(am.newBal, 23050, 'n_dishonour');
  QQ('n_dishonour', numQ({
    t: 2, d: 3, c: 'application', value: am.newBal, unit: '₹',
    stem: `The cash book of Neel Traders shows a favourable balance of ${rs(27800)} on 31 March 2027. On that day Sagar Bank returned a cheque of ${rs(4600)} from Tarun Mehra that had been deposited and debited the firm's account, and it also debited charges of ${rs(150)}. The firm learns of both from the pass book. Find the balance of the cash book after these two entries (in ₹).`,
    sol: `${inr(27800)} − ${inr(4600)} (dishonoured cheque, credit to the bank column) − ${inr(150)} (charges) = ${rs(am.newBal)}.`,
  }));
}
{
  const items = [errCB('Debit side of the bank column added short', 2000, false), I('charges', 300)];
  const am = amended({ bal: 31500, items });
  same(am.newBal, 33200, 'n_err');
  QQ('n_err', numQ({
    t: 2, d: 4, c: 'application', value: am.newBal, unit: '₹',
    stem: `Neel Traders' cash book shows a favourable balance of ${rs(31500)} on 30 June 2027. The accountant finds that the debit side of the bank column was added ${rs(2000)} short, and the pass book shows bank charges of ${rs(300)} that have not been entered. Find the correct balance of the cash book after correcting the error and entering the charges (in ₹).`,
    sol: `A debit side added short understates the balance, so ${rs(2000)} is added; charges are deducted: ${inr(31500)} + ${inr(2000)} − ${inr(300)} = ${rs(am.newBal)}.`,
  }));
}
{
  const items = [I('issued', 3500), I('deposited', 6000), I('charges', 120)];
  const st = statement({ from: 'pass book', bal: -8200, items, expected: -5580 });
  same(st.endAbs, 5580, 'n_od_pb');
  QQ('n_od_pb', numQ({
    t: 2, d: 4, c: 'application', value: st.endAbs, unit: '₹',
    stem: `The pass book shows that Neel Traders has overdrawn its account at Sagar Bank by ${rs(8200)} on 31 August 2026. Cheques of ${rs(3500)} issued have not been presented; a cheque of ${rs(6000)} deposited has not been collected; bank charges of ${rs(120)} have not been entered in the cash book. Find the overdraft as per the cash book (in ₹).`,
    sol: `Start from the overdraft of ${inr(8200)}. Unpresented cheques add ${inr(3500)}, the uncollected cheque reduces it by ${inr(6000)} and the bank charges, which the cash book has not yet counted, reduce it by ${inr(120)}: ${inr(8200)} + ${inr(3500)} − ${inr(6000)} − ${inr(120)} = ${rs(st.endAbs)}.`,
  }));
}
{
  const items = [I('charges', 260), I('intallowed', 760), I('collected', 1500), I('issued', 5200), I('deposited', 8400)];
  const am = amended({ bal: 41000, items });
  same(am.newBal, 43000, 'n_after_amend amended balance');
  const st = statement({ from: 'cash book', bal: am.newBal, items: am.rest, expected: 39800 });
  QQ('n_after_amend', numQ({
    t: 2, d: 4, c: 'application', value: st.result, unit: '₹',
    stem: `The cash book of Neel Traders shows ${rs(41000)} in favour on 30 April 2027. It has not yet entered bank charges of ${rs(260)}, interest allowed of ${rs(760)} and a dividend collected by the bank of ${rs(1500)}. Cheques of ${rs(5200)} issued are not presented and cheques of ${rs(8400)} deposited are not collected. After amending the cash book, find the balance as per the pass book from the amended balance (in ₹).`,
    sol: `Amended cash book: ${inr(41000)} − ${inr(260)} + ${inr(760)} + ${inr(1500)} = ${inr(am.newBal)}. Then ${inr(am.newBal)} + ${inr(5200)} − ${inr(8400)} = ${rs(st.result)}.`,
  }));
}

// ================================================================ short answer, 2 marks
QQ('s2_amend_why', short({
  t: 2, d: 2, c: 'understanding', marks: 2,
  stem: 'Why does the accountant of Neel Traders sometimes amend the cash book before preparing the reconciliation statement, and which differences remain in the statement afterwards?',
  model: 'Items that the bank has recorded first, such as charges, interest and direct deposits, are entered in the cash book so that it is up to date. Afterwards only the timing differences from cheques issued and deposited but not yet cleared remain in the statement.',
  wl: S2, sol: 'Updating the book leaves only the cheque timing differences.',
  scheme: [['Bank-first items entered to update the cash book', 1], ['Only unpresented and uncollected cheques remain', 1]],
}));
{
  const st = statement({ from: 'cash book', bal: 5000, items: [I('directpay', 7500)], expected: -2500 });
  same(st.result, -2500, 's2_negative');
  QQ('s2_negative', short({
    t: 2, d: 3, c: 'application', marks: 2,
    stem: `Starting from a favourable cash book balance of ${rs(5000)} on 31 July 2027, Neel Traders deducts a payment of ${rs(7500)} made by Sagar Bank on standing instruction and not yet entered in the cash book. How should the result be reported?`,
    model: `${inr(5000)} − ${inr(7500)} = −${inr(st.endAbs)}. The negative result is reported as an **overdraft of ${rs(st.endAbs)}** as per the pass book, not as a favourable balance.`,
    sol: 'A negative result is an overdraft.',
    scheme: [[`Result worked out as −${rs(st.endAbs)}`, 1], [`Reported as an overdraft of ${rs(st.endAbs)}`, 1]],
  }));
}

// ================================================================ short answer, 3 marks
{
  const items = [I('intallowed', 400), I('charges', 150), I('directdep', 2500), I('directpay', 1800)];
  const am = amended({ bal: 30000, items });
  same(am.newBal, 30950, 's3_amend_entries');
  QQ('s3_amend_entries', short({
    t: 2, d: 3, c: 'application', marks: 3,
    stem: `The bank column of the cash book of Neel Traders showed a favourable balance of ${rs(30000)} on 31 March 2027. The pass book shows interest allowed ${rs(400)}, bank charges ${rs(150)}, a direct deposit by a customer ${rs(2500)} and an insurance premium paid by the bank ${rs(1800)}. Prepare the amended cash book (bank column) and find its balance.`,
    model: `${am.md}\n\nThe amended balance is **${rs(am.newBal)}** (debit).`,
    sol: 'Receipts on the debit side, payments on the credit side, then balance.',
    scheme: [['Interest and direct deposit on the debit side', 1], ['Charges and premium on the credit side', 1], [`Balance ${rs(am.newBal)}`, 1]],
  }));
}
{
  const items = [I('issued', 5000), I('deposited', 2500), I('charges', 120)];
  const st = statement({ from: 'cash book', bal: 18000, items, expected: 20380 });
  QQ('s3_brs_small', short({
    t: 2, d: 3, c: 'application', marks: 3,
    stem: `Prepare a bank reconciliation statement of Neel Traders as on 31 October 2026. The cash book shows a favourable balance of ${rs(18000)}; cheques of ${rs(5000)} issued have not been presented, a cheque of ${rs(2500)} deposited has not been collected, and charges of ${rs(120)} debited by Sagar Bank are not entered in the cash book.`,
    model: `${st.md}`,
    sol: 'Add the unpresented cheques; deduct the uncollected cheque and the charges.',
    scheme: [['Heading and correct starting balance', 1], ['Items added and deducted correctly', 1], [`Balance as per pass book ${rs(st.result)}`, 1]],
  }));
}
{
  const items = [I('issued', 4000), I('directdep', 1500), I('odint', 300)];
  const st = statement({ from: 'pass book', bal: -9000, items, expected: -(9000 + 4000 + 1500 - 300) });
  same(st.endAbs, 14200, 's3_od_small');
  QQ('s3_od_small', short({
    t: 2, d: 4, c: 'application', marks: 3,
    stem: `On 30 November 2026 the pass book shows that Neel Traders is overdrawn by ${rs(9000)}. Cheques of ${rs(4000)} issued have not been presented; a customer deposited ${rs(1500)} directly into the bank; the bank debited interest on overdraft of ${rs(300)}. The last two items are not in the cash book. Prepare the statement, starting from the pass book overdraft, and find the overdraft as per the cash book.`,
    model: `${st.md}`,
    sol: 'From an overdraft, items that increase the cash book overdraft are added and those that reduce it are deducted.',
    scheme: [['Overdraft as per the pass book as the starting balance', 1], ['Cheques and direct deposit added; interest deducted', 1], [`Overdraft as per cash book ${rs(st.endAbs)}`, 1]],
  }));
}

// ================================================================ long answer, 5 marks (computation)
{
  const items = [I('issued', 12300), I('deposited', 9500), I('charges', 275), I('intallowed', 910), I('directdep', 6000)];
  const st = statement({ from: 'cash book', bal: 38400, items, expected: 47835 });
  QQ('l5_brs_cb', long({
    t: 2, d: 3, c: 'application', marks: 5,
    stem: `Prepare the bank reconciliation statement of Neel Traders as on 31 December 2026 from the following. The cash book shows a favourable balance of ${rs(38400)}. Cheques of ${rs(12300)} issued have not been presented. Cheques of ${rs(9500)} deposited have not been collected. Sagar Bank has debited charges of ${rs(275)}, credited interest of ${rs(910)} and credited a direct deposit of ${rs(6000)} from a customer; the firm has entered none of these three.`,
    model: `**Bank reconciliation statement of Neel Traders as on 31 December 2026**\n\n${st.md}`,
    sol: 'Start from the cash book; add what the cash book has deducted and the bank has not, and the bank credits; deduct the rest.',
    scheme: [['Heading, date and starting balance', 1], ['Cheques issued not presented added', 1], ['Cheques deposited not collected and charges deducted', 1], ['Interest and direct deposit added', 1], [`Balance as per pass book ${rs(st.result)}`, 1]],
  }));
}
{
  const items = [I('issued', 8900), I('deposited', 7200), I('odint', 960), I('charges', 340), I('directdep', 4000), I('dishonour', 3500)];
  const st = statement({ from: 'pass book', bal: -21600, items, expected: -(21600 + 8900 + 4000 - 7200 - 960 - 340 - 3500) });
  same(st.endAbs, 22500, 'l5_brs_pbod');
  QQ('l5_brs_pbod', long({
    t: 2, d: 4, c: 'application', marks: 5,
    stem: `The pass book of Neel Traders shows an overdraft of ${rs(21600)} on 31 January 2027. Cheques of ${rs(8900)} issued have not been presented, and cheques of ${rs(7200)} deposited have not been collected. Sagar Bank debited interest on overdraft ${rs(960)} and charges ${rs(340)}, credited a direct deposit of ${rs(4000)} by a customer, and returned a cheque of ${rs(3500)} that the firm had deposited, debiting the account. The firm has entered none of the last four items. Prepare the statement starting from the pass book overdraft and find the overdraft as per the cash book.`,
    model: `**Bank reconciliation statement of Neel Traders as on 31 January 2027**\n\n${st.md}\n\nThe cash book therefore shows an overdraft of **${rs(st.endAbs)}**.`,
    sol: 'The start is an overdraft, so items that raise the cash book overdraft are added and those that lower it are deducted.',
    scheme: [['Overdraft as per the pass book as the starting balance', 1], ['Unpresented cheques and direct deposit added', 1], ['Uncollected cheques deducted', 1], ['Interest, charges and dishonoured cheque deducted', 1], [`Overdraft as per cash book ${rs(st.endAbs)}`, 1]],
  }));
}
{
  const items = [I('issued', 14600), I('deposited', 18400), I('intallowed', 1150), I('collected', 3250), I('directpay', 4500), I('charges', 420)];
  const am = amended({ bal: 52300, items });
  same(am.newBal, 51780, 'l5_amend amended balance');
  const st = statement({ from: 'cash book', bal: am.newBal, items: am.rest, expected: 47980 });
  QQ('l5_amend', long({
    t: 2, d: 4, c: 'application', marks: 5,
    stem: `On 31 March 2027 the cash book of Neel Traders shows a favourable bank balance of ${rs(52300)}. Cheques of ${rs(14600)} issued have not been presented and cheques of ${rs(18400)} deposited have not been collected. The pass book shows that Sagar Bank allowed interest ${rs(1150)}, collected a dividend of ${rs(3250)}, paid ${rs(4500)} on standing instruction and charged ${rs(420)}; the firm has entered none of these. Prepare (i) the amended cash book (bank column) and (ii) the bank reconciliation statement starting from its balance.`,
    model: `**(i) Amended cash book (bank column)**\n\n${am.md}\n\n**(ii) Bank reconciliation statement as on 31 March 2027**\n\n${st.md}`,
    sol: 'First enter the bank-first items to amend the cash book; then only the two cheque timing differences remain.',
    scheme: [['Interest and dividend on the debit side of the amended cash book', 1], ['Payment on standing instruction and charges on the credit side', 1], [`Amended balance ${rs(am.newBal)}`, 1], ['Unpresented cheques added and uncollected cheques deducted', 1], [`Balance as per pass book ${rs(st.result)}`, 1]],
  }));
}
{
  const items = [I('issued', 11000), I('deposited', 6500), errCB('Credit side of the bank column added short', 1200, true), I('odint', 830), I('directdep', 5000)];
  const st = statement({ from: 'cash book', bal: -17400, items, expected: -9930 });
  same(st.endAbs, 9930, 'l5_cbod');
  QQ('l5_cbod', long({
    t: 2, d: 4, c: 'analysis', marks: 5,
    stem: `On 30 September 2026 the cash book of Neel Traders shows an overdraft of ${rs(17400)}. The accountant discovers that: cheques of ${rs(11000)} issued have not been presented; a cheque of ${rs(6500)} deposited has not been collected; the credit side of the bank column was added ${rs(1200)} short; Sagar Bank debited interest on overdraft of ${rs(830)}, not yet in the cash book; and a customer paid ${rs(5000)} directly into the bank, not yet in the cash book. Prepare the statement starting from the cash book overdraft and show the overdraft as per the pass book.`,
    model: `A credit side added short makes the overdraft too small, so the item is added to the cash book overdraft.\n\n**Bank reconciliation statement as on 30 September 2026**\n\n${st.md}`,
    sol: 'Start from the overdraft: items that increase the pass book overdraft are added, those that reduce it are deducted; the short addition understates the cash book overdraft.',
    scheme: [['Overdraft as per the cash book as the starting balance', 1], ['Uncollected cheque, interest and the short addition added', 1], ['Unpresented cheques deducted', 1], ['Direct deposit deducted', 1], [`Overdraft as per pass book ${rs(st.endAbs)}`, 1]],
  }));
}
{
  const items = [I('issued', 6400), I('deposited', 8000), I('directdep', 3900), I('charges', 260), I('dishonour', 5500), errBank('Debit of another customer\'s cheque by the bank', 1000, false)];
  const st = statement({ from: 'pass book', bal: 29700, items, expected: 34160 });
  QQ('l5_pb_fav', long({
    t: 2, d: 4, c: 'application', marks: 5,
    stem: `The pass book of Neel Traders shows a favourable balance of ${rs(29700)} on 31 October 2026. Cheques of ${rs(6400)} issued are not yet presented; cheques of ${rs(8000)} deposited are not yet collected; a customer paid ${rs(3900)} directly into the bank; the bank debited charges of ${rs(260)}; a deposited cheque of ${rs(5500)} was returned unpaid and debited; and the bank wrongly debited the firm with a cheque of ${rs(1000)} drawn by another customer. The firm has not entered the direct deposit, the charges or the returned cheque. Prepare the statement starting from the pass book balance and find the cash book balance.`,
    model: `**Bank reconciliation statement of Neel Traders as on 31 October 2026**\n\n${st.md}`,
    sol: 'From the pass book, items that the cash book has added or the bank has wrongly deducted are added; items the cash book has deducted or the bank has added are deducted.',
    scheme: [['Starting balance as per the pass book', 1], ['Cheques issued and direct deposit deducted', 1], ['Cheques deposited, charges and returned cheque added', 1], ['Bank error added', 1], [`Balance as per cash book ${rs(st.result)}`, 1]],
  }));
}
void total;
