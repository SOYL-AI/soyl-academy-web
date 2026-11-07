// Case-based items (4 marks: 1 + 1 + 2, part (c) with an either/or), all on imagined businesses.
import { mcq, short, caseQ, child } from '../../cbse-11-accountancy-ch01/src/lib.mjs';
import { same, check, sum, inr, rs, mdTable, analyse, rectify, profitStatement } from './figures.mjs';
import { QQ } from './qq.mjs';

const line = (e) => `${e.dr.map(([a, x]) => `${a} Dr. ${rs(x)}`).join('; ')} To ${e.cr.map(([a, x]) => `${a}${e.cr.length > 1 ? ` ${rs(x)}` : ''}`).join(' and ')}`;

// ---------------------------------------------------------------- Noor Bakery: a trial balance that does not agree
const NB = { dr: 392400, cr: 395800 };
NB.diff = same(NB.cr - NB.dr, 3400, 'Noor Bakery difference');
QQ('cb_tb', caseQ({
  t: [1, 2], d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the passage on Noor Bakery and its trial balance and answer the questions that follow.',
  passage: `**Noor Bakery (imagined)**\n\nNoor Bakery, an imagined bakery in the imagined town of Chandpur, listed the balances of its ledger accounts on 31 March 2028 by the balances method. The debit column totalled ${rs(NB.dr)} and the credit column totalled ${rs(NB.cr)}. The accountant carried the difference to a Suspense A/c so that the two columns agreed, and began to look for the errors.`,
  parts: [
    child('a', mcq({ t: 1, d: 2, c: 'application', stem: 'In the trial balance of Noor Bakery the Suspense A/c is shown in the', opts: [`debit column with ${rs(NB.diff)}`, `credit column with ${rs(NB.diff)}`, `debit column with ${rs(NB.diff / 2)}`, `credit column with ${rs(NB.diff / 2)}`], sol: `The credit column is larger by ${rs(NB.diff)}, so the debit column needs ${rs(NB.diff)} more. Placing the suspense balance on the credit side would widen the gap, and half the difference has no basis.` })),
    child('b', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Find the difference between the two columns of the trial balance of Noor Bakery.', model: `Difference = ${inr(NB.cr)} − ${inr(NB.dr)} = **${rs(NB.diff)}**.`, sol: 'Larger total less smaller total.', scheme: [[`${rs(NB.diff)}`, 1]] })),
    child('c', short({ t: 2, d: 3, c: 'understanding', marks: 2, stem: '**Either** (i): Name two kinds of errors that would not have changed either column of the trial balance of Noor Bakery.', model: 'A **complete omission** of a transaction, and an **error of principle** (or a compensating error, or a posting to a wrong account of the same kind), put equal amounts on both sides and leave the two columns unchanged.', sol: 'Two kinds of errors that affect both sides equally.', scheme: [['First kind of error', 1], ['Second kind of error', 1]] }), [
      short({ t: [1, 2], d: 4, c: 'evaluation', marks: 2, stem: '**Or** (ii): The accountant says that the books must be correct because the trial balance agreed after the Suspense A/c was opened. Do you agree? Give two reasons.', model: 'No. The columns agree only because the Suspense A/c was made the balancing figure, so errors are still to be found. Even after it closes, errors that do not affect the columns, such as a complete omission or an error of principle, may remain.', sol: 'Not agreeing, with the suspense balancing figure and the errors that do not show up.', scheme: [['Disagreement: the agreement is created by the suspense balance', 1], ['Errors that do not affect the columns may remain', 1]] }),
    ]),
  ],
}));

// ---------------------------------------------------------------- Sunil Sports: errors found before the trial balance
const SS = analyse([
  { text: 'x', type: 'omission', sub: 'complete', should: [['Purchases', 'dr', 4800], ['Rao Hardware', 'cr', 4800]], did: [], tb: 'two', profit: 4800, note: `Being credit purchase from Rao Hardware omitted, now recorded` },
  { text: 'x', type: 'commission', sub: 'wrong amount', should: [['Cash', 'dr', 7600], ['Sales', 'cr', 7600]], did: [['Cash', 'dr', 7600], ['Sales', 'cr', 6700]], tb: 'one', profit: -900, note: 'x' },
]);
const SSr = rectify(SS, { mode: 'before' });
check(SSr.entries.length === 1 && SSr.fixes.length === 1, 'Sunil Sports rectification shape');
same(SSr.fixes[0].amount, 900, 'Sunil Sports correction amount');
QQ('cb_before', caseQ({
  t: 2, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the passage on Sunil Sports and its ledger and answer the questions that follow.',
  passage: `**Sunil Sports (imagined)**\n\nSunil Sports, an imagined shop in the imagined town of Devgaon, checked its ledger on 28 March 2028, before preparing its trial balance, and found two errors. First, goods of ${rs(4800)} bought on credit from Rao Hardware were not entered in any book. Second, a cash sale of ${rs(7600)} was entered correctly in the cash book but posted to Sales A/c as ${rs(6700)}.`,
  parts: [
    child('a', mcq({ t: 2, d: 1, c: 'understanding', stem: 'The first error found at Sunil Sports is an error of', opts: ['complete omission', 'commission', 'principle', 'compensation'], sol: 'A transaction left out of every book is a complete omission. Nothing was posted wrongly, no capital or revenue treatment was judged wrongly, and no second error cancels it.' })),
    child('b', short({ t: 2, d: 2, c: 'understanding', marks: 1, stem: 'State whether the second error at Sunil Sports is one-sided or two-sided.', model: '**One-sided:** only the Sales A/c carries the wrong amount, and the cash book is correct.', sol: 'Only one account is wrong.', scheme: [['One-sided', 1]] })),
    child('c', short({ t: 2, d: 3, c: 'application', marks: 2, stem: '**Either** (i): Pass the journal entry that rectifies the first error.', model: `${line(SSr.entries[0])} (${SSr.entries[0].note.replace(/^Being /, 'being ')}).`, sol: 'Debit the account that should have been debited; credit the creditor.', scheme: [['Accounts and sides correct', 1], ['Amount and narration', 1]] }), [
      short({ t: 2, d: 3, c: 'application', marks: 2, stem: '**Or** (ii): Explain how the second error is corrected, and why no Suspense A/c is needed.', model: `Sales A/c is short by ${rs(SSr.fixes[0].amount)} on its ${SSr.fixes[0].side} side, so an explanatory entry for ${rs(SSr.fixes[0].amount)} is written on the ${SSr.fixes[0].side} side of Sales A/c. No suspense account is needed because the trial balance has not been prepared and so shows no difference yet.`, sol: 'An explanatory correction in the account; no difference exists before the trial balance.', scheme: [['Correction on the credit side of Sales A/c for the short amount', 1], ['No difference exists before the trial balance is prepared', 1]] }),
    ]),
  ],
}));

// ---------------------------------------------------------------- Yash Hardware: a Suspense A/c after the trial balance
const YH = { dr: 586200, cr: 581400 };
const YE = analyse([
  { text: 'x', type: 'commission', sub: 'wrong totalling', should: [['Purchases', 'dr', 50000], ['Rao Hardware', 'cr', 50000]], did: [['Purchases', 'dr', 56200], ['Rao Hardware', 'cr', 50000]], tb: 'one', profit: -6200, note: `Being purchases book overcast by ${rs(6200)}, now corrected` },
  { text: 'x', type: 'omission', sub: 'partial', should: [['Saha Textiles', 'dr', 1400], ['Cash', 'cr', 1400]], did: [['Cash', 'cr', 1400]], tb: 'one', profit: 0, note: `Being payment to Saha Textiles not posted to his account, now corrected` },
]);
YH.diff = same(YH.dr - YH.cr, sum(YE.map((e) => e.net)), 'Yash Hardware difference');
same(YH.diff, 4800, 'Yash Hardware difference value');
const YR = rectify(YE, { mode: 'after' });
same(YR.susp.ledger.balance, 0, 'Yash Hardware suspense closes');
QQ('cb_suspense', caseQ({
  t: 2, d: 4, c: 'application', origin: 'soyl-original',
  stem: 'Read the passage on Yash Hardware and its Suspense A/c and answer the questions that follow.',
  passage: `**Yash Hardware (imagined)**\n\nYash Hardware, an imagined shop in the imagined town of Lalpur, prepared its trial balance on 31 March 2028. The debit column totalled ${rs(YH.dr)} and the credit column totalled ${rs(YH.cr)}, and the difference was carried to a Suspense A/c. In April two errors were traced. First, the purchases book had been overcast by ${rs(6200)}, with the creditors posted correctly. Second, a payment of ${rs(1400)} to Saha Textiles was credited to the cash book but not debited to his account.`,
  parts: [
    child('a', mcq({ t: 2, d: 2, c: 'application', stem: 'The Suspense A/c of Yash Hardware was opened on the', opts: [`credit side with ${rs(YH.diff)}`, `debit side with ${rs(YH.diff)}`, `credit side with ${rs(YH.diff / 2)}`, `debit side with ${rs(YH.diff / 2)}`], sol: `The debit column was larger by ${rs(YH.diff)}, so the credit side needed ${rs(YH.diff)} more and the Suspense A/c was credited. A debit balance would widen the gap, and half the difference has no basis.` })),
    child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Find the balance with which the Suspense A/c was opened.', model: `${inr(YH.dr)} − ${inr(YH.cr)} = **${rs(YH.diff)}** (credit).`, sol: 'The difference between the two columns.', scheme: [[`${rs(YH.diff)}`, 1]] })),
    child('c', short({ t: 2, d: 4, c: 'application', marks: 2, stem: '**Either** (i): Pass the journal entries that rectify the two errors.', model: `${YR.journal.md}`, sol: 'Each one-sided error is corrected with the Suspense A/c as the other account.', scheme: [['Entry for the purchases book error', 1], ['Entry for the payment to Saha Textiles', 1]] }), [
      short({ t: 2, d: 4, c: 'application', marks: 2, stem: '**Or** (ii): Prepare the Suspense A/c after the two errors are rectified and show that it closes.', model: `${YR.susp.ledger.md}\n\nThe credit of ${inr(YH.diff)} and the debit of ${inr(6200)}, less the credit of ${inr(1400)}, leave nothing: both sides total ${inr(YR.susp.ledger.total)}.`, sol: 'Opening credit, then the two rectification entries, then totals.', scheme: [['Opening balance and the two entries on the correct sides', 1], ['Equal totals showing that the account closes', 1]] }),
    ]),
  ],
}));

// ---------------------------------------------------------------- Mala Sports: corrected profit
const MS = analyse([
  { text: 'x', type: 'omission', sub: 'complete', should: [['Devika Nair', 'dr', 10000], ['Sales', 'cr', 10000]], did: [], tb: 'two', profit: -10000, short: 'credit sale omitted', note: 'x' },
  { text: 'x', type: 'principle', should: [['Machinery', 'dr', 32000], ['Cash at bank', 'cr', 32000]], did: [['Repairs', 'dr', 32000], ['Cash at bank', 'cr', 32000]], tb: 'two', profit: -32000, short: 'photocopier in repairs', note: 'x' },
  { text: 'x', type: 'commission', sub: 'wrong account', should: [['Cash at bank', 'dr', 2400], ['Interest received', 'cr', 2400]], did: [['Cash at bank', 'dr', 2400], ['Commission received', 'cr', 2400]], tb: 'two', profit: 0, short: 'interest in commission', note: 'x' },
]);
const MSp = profitStatement(MS, 96000);
const MSu = same(-sum(MS.map((e) => e.effect)), 42000, 'Mala Sports understated');
same(MSp.corrected, 138000, 'Mala Sports corrected profit');
QQ('cb_profit', caseQ({
  t: 2, d: 4, c: 'application', origin: 'soyl-original',
  stem: 'Read the passage on Mala Sports and its year-end review and answer the questions that follow.',
  passage: `**Mala Sports (imagined)**\n\nMala Sports, an imagined shop in the imagined town of Rampur, reported a net profit of ${rs(96000)} for the year ended 31 March 2028. A review then found three errors. First, a credit sale of ${rs(10000)} to Devika Nair was omitted from all books. Second, a photocopier bought for ${rs(32000)} by cheque was debited to Repairs A/c. Third, interest received of ${rs(2400)} by cheque was credited to Commission Received A/c.`,
  parts: [
    child('a', mcq({ t: 2, d: 2, c: 'application', stem: 'Which error at Mala Sports has no effect on net profit?', opts: ['Interest received credited to Commission Received A/c', 'The credit sale omitted from all books', 'The photocopier debited to Repairs A/c', 'All three errors affect net profit'], sol: 'Interest and commission are both incomes, so an equal amount moves between them and profit is unchanged. The omitted sale understates income, and the photocopier overstates an expense, so both change profit.' })),
    child('b', short({ t: 2, d: 3, c: 'application', marks: 1, stem: 'Find the total amount by which the net profit of Mala Sports was understated.', model: `${inr(10000)} + ${inr(32000)} = **${rs(MSu)}**.`, sol: 'Add the effects of the two errors that lowered profit.', scheme: [[`${rs(MSu)}`, 1]] })),
    child('c', short({ t: 2, d: 3, c: 'application', marks: 2, stem: '**Either** (i): Find the correct net profit of Mala Sports.', model: `${MSp.md}\n\nCorrected net profit = ${inr(96000)} + ${inr(MSu)} = **${rs(MSp.corrected)}**.`, sol: 'Add back the understatement to the reported profit.', scheme: [['Both understatements added', 1], [`Corrected profit ${rs(MSp.corrected)}`, 1]] }), [
      short({ t: 2, d: 4, c: 'analysis', marks: 2, stem: '**Or** (ii): Explain why the trial balance of Mala Sports agrees although its profit was misstated.', model: 'Each error puts an equal amount on both sides: the omitted sale is missing from both the debtor and the sales account, and the other two errors move an amount between two accounts on the same side. The columns therefore agree, but profit depends on which accounts are affected.', sol: 'The errors are two-sided, so the columns agree, while profit depends on the accounts involved.', scheme: [['All three errors are two-sided, so the columns agree', 1], ['Profit depends on which accounts are affected', 1]] }),
    ]),
  ],
}));
void mdTable;
