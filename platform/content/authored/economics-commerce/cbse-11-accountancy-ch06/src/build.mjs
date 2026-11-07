// Build CBSE 11 Accountancy ch06 Trial Balance and Rectification of Errors. Run from platform/:
//   npx tsx content/authored/economics-commerce/cbse-11-accountancy-ch06/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from '../../cbse-11-accountancy-ch01/src/lib.mjs';
import { nearDuplicates } from '../../../../../content-pipeline/src/originality/ngrams.ts';

setUnit('cbse-11-accountancy-ch06', 'economics-commerce');
const { BANK } = await import('./questions.mjs');
const F = await import('./figures.mjs');
const { same, check, sum, inr, rs, rupees, analyse, KB, NS, TF, RG, RG_PS, RG_ET, RG_NP, TF_ERR, RG_ERR } = F;
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const T = (headers, rows, alt) => table(headers, rows, alt);

// ================================================================ figures (SVG)
/** Box with centred text lines; throws if a line is too wide for the box (text width about 0.56 of the font size per character). */
const box = (s, cx, cy, w, h, text, o = {}) => {
  s.rect(cx - w / 2, cy - h / 2, w, h, { fill: o.fill ?? 'fill', color: o.color ?? 'accent', sw: 1.5, rx: 6 });
  const lines = Array.isArray(text) ? text : [text];
  const gap = o.gap ?? 17;
  const size = o.size ?? 13;
  check(lines.length * gap <= h + 2, `svg box too short for its lines: "${lines[0]}"`);
  lines.forEach((t, i) => {
    check(t.length * size * 0.56 <= w - 8, `svg label too wide for its box: "${t}"`);
    s.text(cx, cy + (i - (lines.length - 1) / 2) * gap, t, { size, bold: o.bold && i === 0 });
  });
};

const vTree = (() => {
  const s = new Svg(760, 335);
  box(s, 380, 28, 250, 36, 'Errors in the books', { fill: 'accent', bold: true, size: 14 });
  s.line(380, 46, 380, 70, { sw: 1.5 });
  s.line(95, 70, 665, 70, { sw: 1.5 });
  const xs = [95, 285, 475, 665];
  const heads = ['Errors of commission', 'Errors of omission', 'Errors of principle', 'Compensating errors'];
  const bodies = [
    ['Wrong amount, side', 'or account in posting;', 'wrong total, balance', 'or carry forward'],
    ['Complete: a whole', 'transaction left out;', 'partial: one side', 'left out'],
    ['Capital item treated', 'as revenue, or the', 'reverse; the entries', 'still balance'],
    ['Two or more errors', 'whose effects on the', 'two sides cancel', 'each other'],
  ];
  const tags = [['One-sided or', 'two-sided'], ['Complete: two-sided', 'Partial: one-sided'], ['Two-sided'], ['Two-sided in total']];
  xs.forEach((x, i) => {
    s.line(x, 70, x, 96, { sw: 1.5 });
    box(s, x, 116, 164, 40, heads[i], { bold: true, size: 13 });
    s.line(x, 136, x, 156, { sw: 1.2, color: 'muted' });
    box(s, x, 200, 170, 88, bodies[i], { size: 12, gap: 19 });
    s.line(x, 244, x, 268, { sw: 1.2, color: 'muted' });
    box(s, x, 292, 170, 48, tags[i], { size: 12, gap: 18, fill: 'none', color: 'muted' });
  });
  return s.visual('Tree of the types of errors in the books: errors of commission (wrong amount, side or account in posting; wrong total, balance or carry forward; one-sided or two-sided); errors of omission (complete, a whole transaction left out, which is two-sided; partial, one side left out, which is one-sided); errors of principle (a capital item treated as revenue or the reverse, two-sided); and compensating errors (errors whose effects cancel, two-sided in total)', 'Four types of errors, and which of them disturb the trial balance.');
})();

const vAffect = (() => {
  const s = new Svg(760, 300);
  box(s, 380, 34, 460, 44, 'Does the error put unequal amounts on the two sides?', { fill: 'accent', bold: true, size: 13 });
  s.line(380, 56, 380, 78, { sw: 1.5 });
  s.line(190, 78, 570, 78, { sw: 1.5 });
  s.arrow(190, 78, 190, 104, { sw: 1.5 });
  s.arrow(570, 78, 570, 104, { sw: 1.5 });
  s.text(176, 92, 'Yes', { size: 13, anchor: 'end', bold: true });
  s.text(584, 92, 'No', { size: 13, anchor: 'start', bold: true });
  box(s, 190, 150, 330, 76, ['One-sided error', 'The trial balance disagrees', 'The difference goes to the Suspense A/c'], { bold: true, size: 13, gap: 20 });
  box(s, 570, 150, 330, 76, ['Two-sided error', 'The trial balance still agrees', 'Found only by checking the books'], { bold: true, size: 13, gap: 20 });
  s.line(190, 188, 190, 214, { sw: 1.2, color: 'muted' });
  s.line(570, 188, 570, 214, { sw: 1.2, color: 'muted' });
  box(s, 190, 252, 330, 70, ['Wrong amount in one account;', 'a book overcast or undercast;', 'a partial omission'], { size: 12, gap: 19, fill: 'none', color: 'muted' });
  box(s, 570, 252, 330, 70, ['Complete omission; error of', 'principle; wrong account;', 'compensating errors'], { size: 12, gap: 19, fill: 'none', color: 'muted' });
  return s.visual('Flow chart asking whether an error puts unequal amounts on the two sides. If yes, it is a one-sided error: the trial balance disagrees and the difference goes to the Suspense A/c, as with a wrong amount in one account, a book overcast or undercast, or a partial omission. If no, it is a two-sided error: the trial balance still agrees and the error is found only by checking the books, as with a complete omission, an error of principle, a wrong account or compensating errors', 'Only one-sided errors disturb the trial balance.');
})();

const vTiming = (() => {
  const s = new Svg(760, 380);
  box(s, 380, 28, 220, 36, 'An error is found', { fill: 'accent', bold: true, size: 14 });
  s.line(380, 46, 380, 66, { sw: 1.5 });
  s.line(190, 66, 570, 66, { sw: 1.5 });
  s.arrow(190, 66, 190, 90, { sw: 1.5 });
  s.arrow(570, 66, 570, 90, { sw: 1.5 });
  box(s, 190, 112, 320, 44, ['Before the trial balance', 'is prepared'], { bold: true, size: 14, gap: 19 });
  box(s, 570, 112, 320, 44, ['After the trial balance', 'is prepared'], { bold: true, size: 14, gap: 19 });
  s.arrow(190, 134, 190, 164, { sw: 1.5 });
  box(s, 190, 190, 320, 52, ['One-sided error:', 'explanatory entry in the account'], { size: 13, gap: 19 });
  box(s, 190, 262, 320, 52, ['Two-sided error:', 'journal entry'], { size: 13, gap: 19 });
  s.text(190, 318, 'chosen by the kind of error', { size: 12, muted: true });
  s.arrow(570, 134, 570, 164, { sw: 1.5 });
  box(s, 570, 190, 320, 52, ['Difference placed in the Suspense', 'A/c so the columns agree'], { size: 13, gap: 19 });
  s.arrow(570, 216, 570, 236, { sw: 1.5 });
  box(s, 570, 266, 320, 56, ['Each error corrected by a journal', 'entry; one-sided ones use', 'the Suspense A/c'], { size: 13, gap: 17 });
  s.arrow(570, 294, 570, 314, { sw: 1.5 });
  box(s, 570, 340, 320, 44, ['Suspense A/c closes', 'with a nil balance'], { size: 13, gap: 19 });
  return s.visual('Flow chart of when an error is rectified. Before the trial balance is prepared, a one-sided error is corrected by an explanatory entry in the account and a two-sided error by a journal entry. After the trial balance is prepared, the difference is placed in the Suspense A/c so that the columns agree, each error is corrected by a journal entry (one-sided errors use the Suspense A/c), and the Suspense A/c closes with a nil balance', 'Rectification before and after the trial balance.');
})();

const vSuspT = (() => {
  const L = RG.R.susp.ledger;
  const sdr = RG.R.susp.dr;
  const scr = RG.R.susp.cr;
  same(sdr.length, 2, 'suspense debit entries');
  same(scr.length, 2, 'suspense credit entries');
  const s = new Svg(700, 300);
  s.text(350, 20, 'Suspense Account of Ritu Garments', { size: 14, bold: true });
  s.rect(20, 36, 660, 214, { rx: 4, color: 'accent', sw: 1.8 });
  s.line(350, 36, 350, 250, { sw: 1.5, color: 'accent' });
  s.line(20, 62, 680, 62, { sw: 1.2, color: 'muted' });
  s.line(20, 206, 680, 206, { sw: 1.2, color: 'muted' });
  s.text(30, 49, 'Dr', { size: 14, bold: true, anchor: 'start' });
  s.text(340, 49, 'Debit side (₹)', { size: 12, anchor: 'end' });
  s.text(360, 49, 'Cr', { size: 14, bold: true, anchor: 'start' });
  s.text(670, 49, 'Credit side (₹)', { size: 12, anchor: 'end' });
  const put = (x0, xr, rows) => rows.forEach(([name, amt], i) => {
    const y = 88 + i * 30;
    check(name.length * 13 * 0.56 < xr - x0 - 60, `suspense label too long: ${name}`);
    s.text(x0, y, name, { size: 13, anchor: 'start' });
    s.text(xr, y, inr(amt), { size: 13, anchor: 'end' });
  });
  put(30, 340, sdr);
  put(360, 670, scr);
  s.text(340, 230, inr(L.total), { size: 14, anchor: 'end', bold: true });
  s.text(670, 230, inr(L.total), { size: 14, anchor: 'end', bold: true });
  s.text(350, 276, 'The difference is carried in; each rectification clears part of it; the account closes', { size: 12 });
  return s.visual(`T-account of the Suspense A/c of Ritu Garments: the debit side shows ${sdr.map(([n, a]) => `${n.replace(/^To /, '')} ${inr(a)}`).join(' and ')}; the credit side shows ${scr.map(([n, a]) => `${n.replace(/^By /, '')} ${inr(a)}`).join(' and ')}; both sides total ${inr(L.total)} rupees, so the account closes with no balance`, 'The Suspense A/c opens with the difference and closes at nil.');
})();

// ================================================================ tables for slides
const vMeaning = T(['Feature', 'Meaning'], [
  ['What it is', 'A statement of the debit balances and the credit balances of the ledger accounts'],
  ['When it is drawn up', 'On a given date, usually the last day of the accounting period'],
  ['What it is built from', 'The balances of the ledger accounts after posting and balancing'],
  ['What it tests', 'Whether the debit total equals the credit total, that is, arithmetical accuracy'],
], 'Table on the meaning of a trial balance: what it is, when it is drawn up, what it is built from and what it tests');
const vObj = T(['Objective', 'How it helps'], [
  ['Check arithmetical accuracy', 'Equal column totals show that posting and balancing are arithmetically sound'],
  ['Help to locate errors', 'A difference warns that an error exists and narrows the search'],
  ['Summarise the ledger', 'All the balances appear in one statement'],
  ['Help to prepare the financial statements', 'Its figures feed the trading and profit and loss account and the balance sheet'],
], 'Table of the four objectives of a trial balance and how each helps');
const vSides = T(['Debit column', 'Credit column'], [
  ['Assets such as cash, bank, furniture and machinery', 'Liabilities such as creditors and loans'],
  ['Expenses and losses such as purchases, wages and rent', 'Revenues and gains such as sales and commission received'],
  ['Drawings', 'Capital'],
  ['Debtors', 'Creditors'],
  ['Opening stock', 'Provisions, for example for doubtful debts'],
], 'Table of what appears in the debit column and the credit column of a trial balance: assets, expenses, drawings, debtors and opening stock on the debit side; liabilities, revenues, capital, creditors and provisions on the credit side');
const vMethods = T(['Method', 'What is listed', 'Check'], [
  ['Balances method', 'Only the closing balance of each account, in the debit or credit column', 'The two columns of balances agree'],
  ['Totals method', 'The total of each side of every account', 'The two columns of totals agree'],
  ['Totals and balances method', 'Both the totals and the balances', 'Both pairs of columns agree'],
], 'Table of the three methods of preparing a trial balance: balances method, totals method, and totals and balances method');
const vNS = T(NS.headers, NS.rows, `Totals and balances of the six accounts of Naina Stores: total debits and total credits each ${inr(NS.td)} rupees, debit balances and credit balances each ${inr(NS.bd)} rupees`);
const vSteps = T(['Step', 'What to do'], [
  ['1', 'Post all the journal entries and balance every ledger account'],
  ['2', 'Write the heading with the name of the firm and the date'],
  ['3', 'List each account with its balance in the debit column or the credit column according to its nature'],
  ['4', 'Total the two columns'],
  ['5', 'Compare the totals; if they differ, look for the error before going further'],
], 'Table of the five steps of preparing a trial balance by the balances method');
const vKB = T(KB.tb.headers, KB.tb.rows, `Trial balance of Kabir Traders on 31 March 2028: sixteen accounts, debit column and credit column each totalling ${inr(KB.tb.dr)} rupees`);
const NAT = { 'Cash in hand': 'Asset', 'Cash at bank': 'Asset', Debtors: 'Asset', 'Opening stock': 'Stock', Furniture: 'Asset', 'Plant and machinery': 'Asset', Purchases: 'Expense', Wages: 'Expense', Rent: 'Expense', 'Carriage inwards': 'Expense', Drawings: 'Withdrawal by the owner', Capital: 'Owner\'s claim', Creditors: 'Liability', Sales: 'Revenue', 'Discount received': 'Income', 'Bank loan': 'Liability' };
const colOf = (a) => { const x = KB.signed.find(([n]) => n === a)[1]; return x > 0 ? 'Debit' : 'Credit'; };
const vCols = T(['Account of Kabir Traders', 'Nature', 'Column'], ['Carriage inwards', 'Discount received', 'Bank loan', 'Plant and machinery', 'Debtors', 'Capital', 'Creditors', 'Opening stock'].map((a) => [a, NAT[a], colOf(a)]),
  'Table giving the nature and the trial balance column of eight accounts of Kabir Traders: carriage inwards debit, discount received credit, bank loan credit, plant and machinery debit, debtors debit, capital credit, creditors credit and opening stock debit');
const vClues = T(['Clue', 'What it may mean'], [
  ['The difference equals the balance of one account', 'That balance may have been left out of the trial balance, or listed only once'],
  ['The difference is divisible by nine', 'Two digits of an amount may have been transposed, for example 63 written as 36'],
  ['The difference is twice an amount', 'A balance may have been written in the wrong column'],
  ['The difference is a round figure', 'A total or a balance may have been wrongly added or carried forward'],
], 'Table of clues when the columns of a trial balance do not agree: a difference equal to one balance, divisible by nine, twice an amount, or a round figure, with what each may mean');
const vTara = T(['Tara Footwear: trial balance before the errors are found', '₹'], [
  ['Total of the debit column', inr(TF.booksTb.dr)],
  ['Total of the credit column', inr(TF.booksTb.cr)],
  ['Difference (debit column higher)', inr(TF.net)],
  ['Suspense A/c to make the columns agree', `Credit side, ${inr(TF.net)}`],
], `Trial balance totals of Tara Footwear: debit column ${inr(TF.booksTb.dr)} rupees and credit column ${inr(TF.booksTb.cr)} rupees; the difference of ${inr(TF.net)} rupees is carried to the credit side of a Suspense A/c`);
same(TF.net % 9, 0, 'Tara difference divisible by nine');
const vLimits = T(['Error that can remain', 'Why the columns still agree', 'Imagined example'], [
  ['Complete omission', 'Both debit and credit are missing', TF_ERR[1].text],
  ['Error of principle', 'The same amount is debited and credited, to the wrong kind of account', TF_ERR[2].text],
  ['Wrong account of the same kind', 'The amount is on the right side of a wrong account', TF_ERR[3].text],
  ['Compensating errors', 'One error cancels another', RG_ERR[5].text],
], 'Table of errors that can remain in the books although the trial balance agrees: complete omission, error of principle, wrong account of the same kind, and compensating errors, each with why the columns agree and an imagined example');
const vTo = T(['Balances in the trial balance', 'Where they are used'], [
  ['Opening stock, purchases, carriage inwards, sales and wages', 'Trading account, to find the gross profit'],
  ['Rent and discount received', 'Profit and loss account, to find the net profit'],
  ['Capital, drawings, bank loan, creditors, debtors, furniture, machinery, cash and bank', 'Balance sheet'],
], 'Table showing where the balances of the Kabir Traders trial balance are used: trading account, profit and loss account and balance sheet');
const vSum1 = T(['Topic', 'Key points'], [
  ['Meaning', 'Debit and credit balances of ledger accounts on a date, to test arithmetical accuracy'],
  ['Objectives', 'Check accuracy, locate errors, summarise the ledger, help prepare financial statements'],
  ['Sides', 'Assets, expenses, drawings and debtors on the debit side; liabilities, capital, revenues, creditors and provisions on the credit side'],
  ['Methods', 'Balances, totals, and totals and balances'],
  ['Limit', 'An agreed trial balance does not prove the books are free from errors'],
], 'Summary table of the trial balance: meaning, objectives, sides, methods and the limit');
const vTips1 = T(['Do', 'Why'], [
  ['Write the heading with the name of the firm and the date', 'It is part of the standard format'],
  ['Place every balance by its nature, not by its size', 'Assets and expenses are debits, liabilities and incomes are credits'],
  ['Total both columns and state whether they agree', 'The total is the check'],
  ['Do not write that an agreed trial balance proves accuracy', 'Several errors do not affect it'],
], 'Exam tips table for the trial balance');

const vGroups = T(['Kind of error', 'What goes wrong', 'Trial balance'], [
  ['One-sided', 'Only one side of an entry is affected, so the two sides carry unequal amounts', 'Disagrees'],
  ['Two-sided', 'Both sides are affected equally, or the whole transaction is left out', 'Agrees'],
], 'Table of one-sided errors, which make the trial balance disagree, and two-sided errors, which leave it in agreement');
/** Trial balance effect of an error from what should have been posted and what was: computed, then compared with the stated effect. */
const nets = (should, did) => sum(did.map(([, s, x]) => (s === 'dr' ? x : -x))) - sum(should.map(([, s, x]) => (s === 'dr' ? x : -x)));
const tbEffect = (should, did, expected) => {
  const got = nets(should, did) === 0 ? 'Agrees' : 'Disagrees';
  check(got === expected, `commission table row: computed ${got}, stated ${expected}`);
  return got;
};
const commRows = [
  ['Wrong amount', `Rent of ${rs(4500)} paid in cash posted to Rent A/c as ${rs(5400)}`, tbEffect([['Rent', 'dr', 4500], ['Cash', 'cr', 4500]], [['Rent', 'dr', 5400], ['Cash', 'cr', 4500]], 'Disagrees')],
  ['Wrong side', `A receipt of ${rs(2000)} from a debtor posted to the debit side of his account instead of the credit side`, tbEffect([['Cash', 'dr', 2000], ['Debtors', 'cr', 2000]], [['Cash', 'dr', 2000], ['Debtors', 'dr', 2000]], 'Disagrees')],
  ['Wrong account', `Cash of ${rs(2000)} received from Rohit Sen credited to the account of Devika Nair`, tbEffect([['Cash', 'dr', 2000], ['Rohit Sen', 'cr', 2000]], [['Cash', 'dr', 2000], ['Devika Nair', 'cr', 2000]], 'Agrees')],
  ['Wrong totalling', RG_ERR[0].text, RG.A[0].net ? 'Disagrees' : 'Agrees'],
  ['Wrong balancing', `Purchases A/c balanced as ${rs(124000)} instead of ${rs(142000)}`, tbEffect([['Purchases', 'dr', 142000], ['Creditors', 'cr', 142000]], [['Purchases', 'dr', 124000], ['Creditors', 'cr', 142000]], 'Disagrees')],
  ['Wrong carrying forward', `A page total of ${rs(8400)} carried to the next page as ${rs(4800)}`, tbEffect([['Purchases', 'dr', 8400], ['Creditors', 'cr', 8400]], [['Purchases', 'dr', 4800], ['Creditors', 'cr', 8400]], 'Disagrees')],
];
const vComm = T(['Error of commission', 'Imagined example', 'Trial balance'], commRows, 'Table of errors of commission: wrong amount, wrong side, wrong account, wrong totalling, wrong balancing and wrong carrying forward, each with an imagined example and whether the trial balance agrees');
const vOmit = T(['Error of omission', 'Imagined example', 'Trial balance'], [
  ['Complete: the whole transaction is left out', TF_ERR[1].text, TF.A[1].net ? 'Disagrees' : 'Agrees'],
  ['Partial: only one side is posted', RG_ERR[1].text, RG.A[1].net ? 'Disagrees' : 'Agrees'],
], 'Table of errors of omission: complete omission, which leaves the trial balance in agreement, and partial omission, which makes it disagree, each with an imagined example');
const vPrin = T(['Type', 'Meaning', 'Imagined example', 'Trial balance'], [
  ['Error of principle', 'A capital item treated as a revenue item, or the reverse; the entry balances', RG_ERR[4].text, RG.A[4].net ? 'Disagrees' : 'Agrees'],
  ['Compensating errors', 'Errors whose effects on the two sides cancel', RG_ERR[5].text, RG.A[5].net ? 'Disagrees' : 'Agrees'],
], 'Table of errors of principle and compensating errors, each with meaning, an imagined example and the effect on the trial balance');
const vRET = T(RG_ET.headers, RG_ET.rows, `Classification of the six errors of Ritu Garments by type, effect on the trial balance and effect on net profit: errors 1 to 3 are one-sided and make the trial balance disagree; errors 4 to 6 are two-sided and leave it in agreement`);
const vBefore = T(['Kind of error', 'How it is rectified before the trial balance', 'Imagined example'], [
  ['One-sided', 'An explanatory entry on the proper side of the affected account', TF_ERR[0].text],
  ['Two-sided', 'A journal entry debiting and crediting the accounts concerned', TF_ERR[2].text],
], 'Table of rectification before the trial balance: explanatory entry in the account for a one-sided error and a journal entry for a two-sided error');
const vTFj = T(TF.R.journal.headers, TF.R.journal.rows, `Rectifying journal entries of Tara Footwear for the three two-sided errors: Anand Pillai Dr ${inr(9000)} to Sales; Computer Dr ${inr(25000)} to Purchases; Rent Dr ${inr(5400)} to Commission Received; total ${inr(TF.R.journal.total)} rupees`);
const vTFf = T(TF.R.fixTable.headers, TF.R.fixTable.rows, `Explanatory corrections in the accounts of Tara Footwear for the two one-sided errors: Sales A/c credit side ${inr(4500)} and Purchases A/c debit side ${inr(900)} rupees`);
const vAfter = T(['Step', 'What to do'], [
  ['1', 'Total the two columns of the trial balance and find the difference'],
  ['2', 'Place the difference in the Suspense A/c, on the side with the lower total'],
  ['3', 'For each one-sided error found, pass a journal entry with the Suspense A/c as one of its accounts'],
  ['4', 'Correct each two-sided error by a journal entry without the Suspense A/c'],
  ['5', 'Post to the Suspense A/c; when every error is found its balance is nil'],
], 'Table of the five steps of rectification after the trial balance with a Suspense A/c');
const vRGtb = T(['Ritu Garments: trial balance on 31 March 2028', '₹'], [
  ['Total of the debit column', inr(RG.booksTb.dr)],
  ['Total of the credit column', inr(RG.booksTb.cr)],
  ['Difference (credit column higher)', inr(-RG.net)],
  ['Suspense A/c to make the columns agree', `Debit side, ${inr(-RG.net)}`],
  ['Both columns after the Suspense A/c', inr(RG.withSusp.dr)],
], `Trial balance totals of Ritu Garments: debit column ${inr(RG.booksTb.dr)} rupees, credit column ${inr(RG.booksTb.cr)} rupees; the difference of ${inr(-RG.net)} rupees is carried to the debit side of a Suspense A/c, after which both columns total ${inr(RG.withSusp.dr)} rupees`);
const vRGj = T(RG.R.journal.headers, RG.R.journal.rows, `Six rectifying journal entries of Ritu Garments: three use the Suspense A/c (Sales Dr ${inr(4000)}, Purchases Dr ${inr(6000)}, Suspense Dr ${inr(900)} to Rent) and three do not (Kiran Rao, Furniture and Salaries); total ${inr(RG.R.journal.total)} rupees`);
const vProfit = T(['Wrong treatment', 'Effect on net profit'], [
  ['Expense overstated: a capital item debited to an expense, or an expense charged twice', 'Profit understated'],
  ['Expense understated: a revenue item debited to a capital account, or an expense left out', 'Profit overstated'],
  ['Income understated: a sale or an income left out', 'Profit understated'],
  ['Income overstated: a sale or an income recorded twice or too high', 'Profit overstated'],
  ['Equal amounts moved between two expenses, or between two incomes', 'No effect'],
  ['Only assets, liabilities, capital or drawings are wrongly posted', 'No effect'],
], 'Table of the effect on net profit of wrongly treated items: expense overstated understates profit, expense understated overstates profit, income left out understates profit, income overstated overstates profit, equal amounts moved between expenses or incomes have no effect, and errors in balance sheet accounts alone have no effect');
const vRGp = T(RG_PS.headers, RG_PS.rows, `Statement of corrected net profit of Ritu Garments: reported profit ${inr(RG_NP)} rupees, less ${inr(4000)} and ${inr(6000)}, add ${inr(900)}, ${inr(8000)} and ${inr(15000)}, giving corrected net profit ${inr(RG_PS.corrected)} rupees`);
const vSum2 = T(['Topic', 'Key points'], [
  ['Types', 'Commission, omission, principle and compensating errors'],
  ['Effect on the trial balance', 'One-sided errors make it disagree; two-sided errors do not'],
  ['Before the trial balance', 'Explanatory entry for a one-sided error; journal entry for a two-sided error'],
  ['After the trial balance', 'Suspense A/c for the difference; one-sided errors corrected through it until it closes'],
  ['Effect on profit', 'Increase, decrease or no effect, found from the accounts wrongly debited or credited'],
], 'Summary table of the types of errors, their effect on the trial balance, rectification before and after the trial balance and the effect on profit');
const vTips2 = T(['Do', 'Why'], [
  ['Name the type of each error and say whether it is one-sided or two-sided', 'It shows whether the trial balance is affected'],
  ['Pass journal entries with the accounts debited first and a narration', 'It is the standard format'],
  ['Use the Suspense A/c only for one-sided errors found after the trial balance', 'Two-sided errors do not change the columns'],
  ['Show the Suspense A/c and its nil balance', 'It proves that every error was found'],
  ['Show the effect on profit as overstated, understated or no effect', 'Marks are given for the direction and the amount'],
], 'Exam tips table for the types of errors, the Suspense A/c and the effect on profit');

const vProcess = flow('LR', ['Journal entries are posted', 'Ledger accounts are balanced', 'Trial balance is prepared', 'Financial statements follow'], 'Flow: journal entries are posted, ledger accounts are balanced, the trial balance is prepared, and the financial statements follow', 'Where the trial balance sits in the accounting process.');

// ================================================================ decks
const part1 = deck({
  part: 1,
  title: 'Trial Balance and Rectification of Errors — Part 1: Preparing the Trial Balance',
  goals: [
    'State the meaning and the objectives of a trial balance and the side on which each kind of account is shown',
    'Prepare a trial balance by the balances method and describe the totals method and the totals and balances method',
    'Explain why an agreed trial balance does not prove that the books are free from errors',
  ],
  slides: [
    sl('title', 'The trial balance: checking the ledger', {
      b: 'Part 1: the **trial balance**: meaning, objectives, preparation and limitations.',
      v: vProcess,
      n: 'After transactions are journalised, posted and balanced, a business lists the balances of all its ledger accounts in a statement called the trial balance. In this part we learn what it is, what it is for, how to prepare it by the balances method, and why an agreed trial balance still cannot prove that the books are free from errors. We work with imagined firms, Kabir Traders and Naina Stores.',
    }),
    sl('concept', 'What is a trial balance?', {
      v: vMeaning,
      n: 'A trial balance is a statement of the debit balances and the credit balances of the ledger accounts on a given date. It is drawn up after posting and balancing, usually at the end of the accounting period. If every posting was arithmetically correct, the two columns total the same. If they differ, an error exists somewhere in the books.',
    }),
    sl('concept', 'Objectives of a trial balance', {
      v: vObj,
      n: 'There are four objectives. First, it checks the arithmetical accuracy of the ledger. Second, a difference between the columns warns that an error exists and helps to locate it. Third, it summarises all the ledger balances in one statement. Fourth, it supplies the figures from which the trading and profit and loss account and the balance sheet are prepared.',
    }),
    sl('concept', 'Which side does each account take?', {
      v: vSides,
      n: 'Look at the table. Assets, expenses and losses, drawings, debtors and opening stock carry debit balances, so they go in the debit column. Liabilities, capital, revenues and gains, creditors and provisions carry credit balances, so they go in the credit column. The column depends on the nature of the balance, never on its size.',
    }),
    sl('check', 'Quick check: which column?', {
      b: 'Decide the column in which the drawings balance of an imagined firm is shown.',
      chk: 'm_side_chk',
      n: 'Drawings are what the proprietor withdraws from the business. Decide whether the balance of the drawings account is a debit or a credit, and remember that the column depends on the nature of the balance.',
    }),
    sl('concept', 'Three methods of preparing a trial balance', {
      b: 'The **balances method** is the one used in practice and in examinations. The other two methods are described here.',
      v: vMethods,
      n: 'There are three methods. In the balances method only the closing balance of each account is listed. In the totals method the total of each side of every account is listed. In the totals and balances method both are shown. In each case the two columns must agree. The balances method is the one we use to prepare a trial balance.',
    }),
    sl('example', 'Worked example 1: totals and balances of Naina Stores', {
      b: `Six transactions of **Naina Stores**, an imagined shop, are posted. Totals: each column **${rs(NS.td)}**; balances: each column **${rs(NS.bd)}**.`,
      bl: ['The totals method uses the first two columns of figures.', 'The balances method uses the last two columns of figures.', 'Verma Traders: debit total less than credit total, so a credit balance.'],
      v: vNS,
      n: `Naina Stores, an imagined shop, posts six transactions. By the totals method, the debit totals and the credit totals each come to ${rupees(NS.td)}. By the balances method, the debit balances of cash, purchases and wages, and the credit balances of capital, sales and the supplier, each come to ${rupees(NS.bd)}. Both methods agree, but only the balances method is needed for the trial balance.`,
    }),
    sl('concept', 'Steps in preparing a trial balance', {
      v: vSteps,
      n: 'First, post the journal entries and balance every ledger account. Then write the heading with the name of the firm and the date. List each account with its balance in the debit column or the credit column according to its nature. Total the two columns and compare them. If the totals differ, look for the error before going further.',
    }),
    sl('example', 'Worked example 2: trial balance of Kabir Traders', {
      b: `**Kabir Traders**, an imagined firm, lists sixteen balances on 31 March 2028. Each column totals **${rs(KB.tb.dr)}**.`,
      bl: ['Assets, expenses and drawings are in the debit column.', 'Capital, liabilities and incomes are in the credit column.'],
      v: vKB,
      n: `Kabir Traders, an imagined firm, lists sixteen balances on the last day of March. The debit column holds cash, debtors, stock, furniture, machinery, purchases, wages, rent, carriage inwards and drawings. The credit column holds capital, creditors, sales, discount received and the bank loan. Each column totals ${rupees(KB.tb.dr)}, so the trial balance agrees.`,
    }),
    sl('check', 'Quick check: the missing balance', {
      b: 'Find the capital that makes the columns of an imagined trial balance agree.',
      chk: 'n_tb_missing',
      n: 'Add the debit balances. Then add the credit balances that are known. The missing credit balance is the amount that makes the credit column equal the debit column.',
    }),
    sl('example', 'Worked example 3: choosing the column', {
      b: 'Decide the nature of each balance, and then the column, for eight accounts of Kabir Traders.',
      v: vCols,
      n: 'Name the nature of the account first. Carriage inwards is an expense, so it is a debit. Discount received is an income, so it is a credit. The bank loan is a liability, a credit. Machinery, debtors and stock are assets, debits. Capital is the owner\'s claim, a credit, and creditors are a liability, a credit.',
    }),
    sl('concept', 'When the columns do not agree', {
      v: vClues,
      n: 'If the columns differ, do not force them to agree. Look at the difference. If it equals one balance, that balance may have been left out. If it divides by nine, two digits may have been transposed. If it is twice an amount, a balance may be in the wrong column. A round difference suggests a wrong total or a wrong carry forward.',
    }),
    sl('example', 'Worked example 4: Tara Footwear\'s columns', {
      b: `Before its errors are found, the trial balance of **Tara Footwear**, an imagined firm, shows columns that differ by **${rs(TF.net)}**.`,
      bl: ['The debit column is higher, so the credit side needs the difference.', 'The difference divides by nine, a clue to transposed digits.'],
      v: vTara,
      n: `Tara Footwear, an imagined firm, totals its trial balance. The debit column is ${rupees(TF.booksTb.dr)} and the credit column is ${rupees(TF.booksTb.cr)}. The debit column is higher by ${rupees(TF.net)}, so the difference is carried to the credit side of a suspense account, which we meet in the next part. The difference divides by nine, which is one clue to the error.`,
    }),
    sl('concept', 'What an agreed trial balance does not show', {
      v: vLimits,
      n: 'Agreement of the columns shows only that debits equal credits in total. A complete omission leaves both sides out. An error of principle puts the same amount on both sides, but in the wrong kind of account. A wrong account of the same kind keeps the totals. Compensating errors cancel each other. So an agreed trial balance does not prove that the books are free from errors.',
    }),
    sl('check', 'Quick check: does agreement prove accuracy?', {
      b: 'True or false: an agreed trial balance proves that the ledger is free from errors.',
      chk: 'tf_agree_chk',
      n: 'Think about the errors that put the same amount on both sides, or leave out both sides of a transaction. Would the columns still agree in those cases?',
    }),
    sl('concept', 'From trial balance to final accounts', {
      v: vTo,
      n: 'The trial balance is the starting point of the financial statements. Opening stock, purchases, carriage inwards, sales and wages go to the trading account. Rent and discount received go to the profit and loss account. Capital, drawings, the loan, creditors, debtors and the other assets go to the balance sheet. Preparing these statements is the subject of a later chapter.',
    }),
    sl('check', 'Quick check: order of the steps', {
      b: 'Arrange the steps of preparing a trial balance by the balances method.',
      chk: 'ord_tb_steps',
      n: 'Think about what must be finished before the balances can be listed, and what is done last, after both columns are written.',
    }),
    sl('summary', 'Summary of Part 1', {
      bl: ['A trial balance lists debit and credit balances on a date to test arithmetical accuracy.', 'Assets, expenses, drawings and debtors are debits; liabilities, capital, revenues, creditors and provisions are credits.', 'An agreed trial balance does not prove that the books are free from errors.'],
      v: vSum1,
      n: 'To sum up. A trial balance lists the debit and credit balances of the ledger on a date, to test arithmetical accuracy. Its objectives are to check accuracy, to help locate errors, to summarise the ledger and to supply figures for the financial statements. Assets, expenses, drawings and debtors are debits. Liabilities, capital, revenues, creditors and provisions are credits. An agreed trial balance does not prove the books are free from errors.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Heading with the name and the date; two columns.', 'Place each balance by its nature and total both columns.', 'Never say that an agreed trial balance proves accuracy.'],
      v: vTips1,
      n: 'In the examination, write the heading with the name of the firm and the date, and use two columns. Place every balance by its nature, assets and expenses on the debit side, liabilities and incomes on the credit side. Total both columns and say whether they agree. Never write that an agreed trial balance proves that the books are accurate, because several errors do not affect it.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Trial Balance and Rectification of Errors — Part 2: Errors and Their Rectification',
  goals: [
    'Classify errors as commission, omission, principle or compensating, and as one-sided or two-sided',
    'Rectify errors found before the trial balance by an explanatory entry or a journal entry',
    'Rectify errors found after the trial balance through a suspense account that closes, and find the effect of each error on net profit',
  ],
  slides: [
    sl('title', 'Errors and their rectification', {
      b: 'Part 2: **types of errors**, **rectification** before and after the trial balance, and the **suspense account**.',
      v: vTree,
      n: 'Even a careful accountant makes mistakes. In this part we sort errors into four types, find out which of them disturb the trial balance, and learn how to correct them, before the trial balance is prepared and after it. We use a suspense account for the difference and see it close. Finally, we find the effect of each error on net profit. We work with imagined firms, Ritu Garments and Tara Footwear.',
    }),
    sl('concept', 'One-sided and two-sided errors', {
      b: 'An error is **one-sided** when the two sides of the entries carry unequal amounts, and **two-sided** when both sides are affected equally.',
      v: vGroups,
      n: 'Errors can be grouped by their effect on the trial balance. A one-sided error affects only one side of an entry, so the debits and credits become unequal and the trial balance disagrees. A two-sided error affects both sides equally, or leaves out the whole transaction, so the trial balance still agrees. This is the grouping that decides how the error is found and corrected.',
    }),
    sl('concept', 'Errors of commission', {
      v: vComm,
      n: 'An error of commission is a wrong posting or a wrong calculation. The amount, the side or the account may be wrong. A book may be wrongly totalled, an account wrongly balanced, or a total wrongly carried forward. A wrong amount, a wrong side and a wrong total put unequal amounts on the two sides, so the trial balance disagrees. Posting to a wrong account does not.',
    }),
    sl('concept', 'Errors of omission', {
      v: vOmit,
      n: 'An error of omission means that a transaction is left out. In a complete omission, the whole transaction is missing from the books, so debits and credits stay equal and the trial balance agrees. In a partial omission, only one side is posted, so the trial balance disagrees.',
    }),
    sl('concept', 'Errors of principle and compensating errors', {
      v: vPrin,
      n: 'An error of principle treats a capital item as a revenue item, or the reverse. Furniture debited to purchases is an example. The entry balances, so the trial balance agrees. Compensating errors are two or more errors whose effects cancel. Wages overcast by two thousand and salaries undercast by two thousand are an example. The trial balance agrees, though both accounts are wrong.',
    }),
    sl('check', 'Quick check: name the error', {
      b: 'Classify an imagined firm\'s error in which the cost of installing a machine was charged to wages.',
      chk: 'm_class_chk',
      n: 'Decide whether the cost of installing a machine is a capital item or a revenue item. Then decide what kind of error arises when it is debited to an expense account.',
    }),
    sl('concept', 'Does the error affect the trial balance?', {
      v: vAffect,
      n: 'Ask one question. Does the error put unequal amounts on the two sides? If yes, it is a one-sided error and the trial balance disagrees. If no, it is a two-sided error and the trial balance still agrees, so the error is found only by checking the books. The question decides whether a difference appears in the trial balance at all.',
    }),
    sl('example', 'Worked example 1: classify the errors of Ritu Garments', {
      b: '**Ritu Garments**, an imagined firm in the imagined town of Ranipur, finds six errors after its trial balance. Each is classified.',
      bl: ['Errors 1, 2 and 3 are one-sided.', 'Errors 4, 5 and 6 are two-sided.'],
      v: vRET,
      n: 'Ritu Garments, an imagined firm, finds six errors. The sales book total, the missing debit to purchases, and the rent posted too high are one-sided, so the trial balance disagrees. The omitted credit sale, the furniture debited to purchases, and the wages and salaries errors are two-sided, so the trial balance still agrees. The last column shows the effect on net profit, which we use later.',
    }),
    sl('concept', 'When is an error rectified?', {
      v: vTiming,
      n: 'Look at the flow. If an error is found before the trial balance is prepared, a one-sided error is corrected by an explanatory entry in the account, and a two-sided error by a journal entry. If it is found after the trial balance, the difference is placed in a suspense account so that the columns agree, and each error is then corrected by a journal entry until the suspense account closes.',
    }),
    sl('concept', 'Rectification before the trial balance', {
      v: vBefore,
      n: 'Before the trial balance is prepared, no difference exists, so no suspense account is needed. A one-sided error is corrected in the affected account itself, with an explanatory entry on the proper side. A two-sided error is corrected by a journal entry that debits and credits the accounts concerned, so that the right accounts carry the right amounts.',
    }),
    sl('example', 'Worked example 2: Tara Footwear, journal entries', {
      b: '**Tara Footwear**, an imagined firm, finds five errors before its trial balance. Three are two-sided and are corrected by journal entries.',
      bl: [TF_ERR[1].text, TF_ERR[2].text, TF_ERR[3].text],
      v: vTFj,
      n: `Tara Footwear, an imagined firm, finds five errors before its trial balance. Three are two-sided. The credit sale to Anand Pillai is recorded by debiting him and crediting sales. The computer is moved from purchases to a computer account. The commission is moved from rent to commission received. The three entries total ${rupees(TF.R.journal.total)}.`,
    }),
    sl('example', 'Worked example 3: one-sided corrections and the trial balance', {
      b: `The other two errors are one-sided and are corrected in the accounts. The corrected trial balance of Tara Footwear totals **${rs(TF.corrected.dr)}** on each side.`,
      v: vTFf,
      n: `Two errors of Tara Footwear are one-sided. The sale was credited ${rupees(4500)} too little, so ${rupees(4500)} is written on the credit side of the sales account. The purchases total was debited ${rupees(900)} too little, so ${rupees(900)} is written on the debit side of the purchases account. The trial balance prepared after these corrections totals ${rupees(TF.corrected.dr)} on each side.`,
    }),
    sl('concept', 'The suspense account', {
      b: 'A **suspense account** is a temporary account that holds the difference between the two columns of a trial balance until the errors are found.',
      v: vSuspT,
      n: `A suspense account is a temporary account for the difference between the columns of a trial balance. If the credit column is higher, the account is debited, and the other way round. Each time a one-sided error is found, the suspense account is debited or credited to correct it. Here the account of Ritu Garments opens with ${rupees(9100)} and closes with nothing, because both sides total ${rupees(10000)}.`,
    }),
    sl('concept', 'Rectification after the trial balance', {
      v: vAfter,
      n: 'After the trial balance is prepared, first find the difference and place it in the suspense account on the side with the lower total. For each one-sided error found, pass a journal entry in which the suspense account is one of the accounts. A two-sided error is corrected without the suspense account. When every error has been found, the suspense account has a nil balance.',
    }),
    sl('example', 'Worked example 4: Ritu Garments opens a suspense account', {
      b: `The columns of Ritu Garments differ by **${rs(-RG.net)}**, and the credit column is higher. The Suspense A/c is debited with **${rs(-RG.net)}**.`,
      v: vRGtb,
      n: `The debit column of Ritu Garments is ${rupees(RG.booksTb.dr)} and the credit column is ${rupees(RG.booksTb.cr)}. The credit column is higher by ${rupees(-RG.net)}, so the suspense account is debited with ${rupees(-RG.net)}. With this balance, both columns total ${rupees(RG.withSusp.dr)} and the trial balance agrees, while the search for the errors begins.`,
    }),
    sl('example', 'Worked example 5: rectifying entries of Ritu Garments', {
      b: 'Errors 1, 2 and 3 pass through the Suspense A/c; errors 4, 5 and 6 are two-sided and do not.',
      v: vRGj,
      n: `The sales book overcast is corrected by debiting sales and crediting suspense. The purchase not debited is corrected by debiting purchases and crediting suspense. The excess rent is corrected by debiting suspense and crediting rent. The omitted credit sale, the furniture and the wages and salaries errors are corrected by plain journal entries. Together the entries total ${rupees(RG.R.journal.total)}.`,
    }),
    sl('check', 'Quick check: the suspense amount', {
      b: 'Find the amount carried to the suspense account for an imagined firm with two one-sided errors.',
      chk: 'n_susp_chk',
      n: 'For each one-sided error decide whether it makes the debit side or the credit side higher. Combine the two effects. The net difference is the amount of the suspense account.',
    }),
    sl('concept', 'Effect of errors on net profit', {
      v: vProfit,
      n: 'An error changes net profit only if it affects an expense or an income account by an unequal amount. If an expense is overstated, profit is understated. If an expense is understated, profit is overstated. A sale left out understates profit. Equal amounts moved between two expenses, or between two incomes, have no effect. Errors in assets, liabilities, capital or drawings alone do not change profit.',
    }),
    sl('example', 'Worked example 6: corrected profit of Ritu Garments', {
      b: `Ritu Garments reported a net profit of **${rs(RG_NP)}**. After the errors are corrected it is **${rs(RG_PS.corrected)}**.`,
      v: vRGp,
      n: `Ritu Garments reported a net profit of ${rupees(RG_NP)}. The overcast sales book and the missing purchase had overstated it, so ${rupees(4000)} and ${rupees(6000)} are deducted. The excess rent, the omitted sale and the furniture had understated it, so ${rupees(900)}, ${rupees(8000)} and ${rupees(15000)} are added. The wages and salaries errors cancel. The corrected net profit is ${rupees(RG_PS.corrected)}.`,
    }),
    sl('check', 'Quick check: suspense account', {
      b: 'Complete the sentence about the suspense account and its balance when all errors are rectified.',
      chk: 'fb_susp',
      n: 'Recall the name of the account that holds the difference between the columns of a trial balance, and think about what its balance must be once every error has been found and corrected.',
    }),
    sl('summary', 'Summary of Part 2', {
      bl: ['Errors are of commission, omission or principle, or compensating; they are one-sided or two-sided.', 'Before the trial balance: explanatory entry or journal entry.', 'After it: a suspense account for the difference, closed by the rectifications.'],
      v: vSum2,
      n: 'To sum up. Errors are of commission, omission or principle, or are compensating. One-sided errors make the trial balance disagree, and two-sided errors do not. Before the trial balance, a one-sided error needs an explanatory entry and a two-sided error needs a journal entry. After the trial balance, the difference goes to a suspense account, which closes when every error is corrected. Each error may increase, decrease or leave unchanged the net profit.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Name the type of error and whether it is one-sided or two-sided.', 'Journal entry: accounts, amounts and a narration.', 'Show the Suspense A/c and its nil balance; state the effect on profit.'],
      v: vTips2,
      n: 'In the examination, name the type of each error and say whether it is one-sided or two-sided. Pass journal entries with the accounts, the amounts and a narration. Use the suspense account only for one-sided errors found after the trial balance, and show that it closes. State the effect of each error on net profit as overstated, understated, or no effect, with the amount.',
    }),
  ],
});

// ================================================================ notes
const N = notes({
  title: 'Trial Balance and Rectification of Errors — Notes',
  sections: [
    {
      h: '1. Meaning and objectives of a trial balance',
      t: 1,
      b: 'A **trial balance** is a statement of the debit balances and the credit balances of all ledger accounts on a given date, prepared to check the arithmetical accuracy of posting and balancing. It is drawn up after the ledger accounts are balanced, usually on the last day of the accounting period.\n\n**Objectives:** (1) to check arithmetical accuracy; (2) to help locate errors, since a difference shows that an error exists; (3) to summarise the ledger accounts in one statement; (4) to provide the figures from which the financial statements are prepared.',
      terms: [
        ['Trial balance', 'A statement of the debit and credit balances of ledger accounts on a given date, prepared to check the arithmetical accuracy of the books.'],
        ['Debit balance', 'The balance of an account whose debit side is larger; it arises for assets, expenses, drawings and debtors.'],
        ['Credit balance', 'The balance of an account whose credit side is larger; it arises for liabilities, capital, revenues, creditors and provisions.'],
      ],
      v: vProcess,
      vs: [vMeaning, vObj],
    },
    {
      h: '2. Which side each account takes',
      t: 1,
      b: 'In the trial balance, **assets, expenses and losses, drawings and debtors** (and opening stock) are shown on the **debit** side. **Liabilities, capital, revenues and gains, creditors and provisions** are shown on the **credit** side. The side is fixed by the nature of the balance, not by its size.',
      terms: [
        ['Asset', 'A resource owned by the business, from which future benefit is expected.'],
        ['Liability', 'An amount that the business owes to an outsider.'],
        ['Capital', 'The amount that the proprietor has invested in the business; it is what the business owes to the proprietor.'],
        ['Drawings', 'Cash or goods withdrawn from the business by the proprietor for personal use; they reduce capital.'],
        ['Debtor', 'A person who owes money to the business for goods or services supplied on credit.'],
        ['Creditor', 'A person to whom the business owes money for goods or services bought on credit.'],
        ['Provision', 'An amount set aside out of profit for a known liability or an expected loss whose amount cannot be stated exactly, for example for doubtful debts.'],
        ['Revenue', 'The amount earned from the sale of goods or services and other income, which increases capital.'],
        ['Expense', 'A cost incurred in earning revenue, which reduces capital.'],
      ],
      v: vSides,
      vs: [vCols],
    },
    {
      h: '3. Preparing a trial balance',
      t: 1,
      b: 'There are three methods. In the **balances method** only the closing balance of each ledger account is listed in the debit or credit column; this is the usual method. In the **totals method** the total of the debit side and of the credit side of each account is listed. In the **totals and balances method** both are shown.\n\n**Steps (balances method):** post the journal and balance every account; write the heading with the name and date; list each balance in its column; total both columns; compare the totals.',
      terms: [
        ['Balances method', 'A method of preparing a trial balance by listing only the closing balance of each ledger account.'],
        ['Totals method', 'A method of preparing a trial balance by listing the total of each side of every ledger account.'],
        ['Totals and balances method', 'A method of preparing a trial balance that shows both the totals and the balances of the ledger accounts.'],
      ],
      v: vKB,
      vs: [vSteps, vNS],
    },
    {
      h: '4. When the columns differ, and limitations',
      t: 1,
      b: 'If the two columns differ, an error exists. Useful clues: a difference equal to one balance (a balance omitted or listed once); a difference divisible by nine (transposed digits); a difference equal to twice an amount (a balance written in the wrong column).\n\n**Limitations.** An agreed trial balance proves only arithmetical accuracy. The books may still contain a **complete omission**, an **error of principle**, a posting to a **wrong account of the same kind**, and **compensating errors**, none of which changes either column. It is therefore not conclusive proof of accuracy.',
      terms: [
        ['Arithmetical accuracy', 'The agreement of the debit total with the credit total of the books, which shows that posting and balancing were free of arithmetical mistakes.'],
      ],
      v: vTara,
      vs: [vClues, vLimits],
    },
    {
      h: '5. Types of errors',
      t: 2,
      b: '**Errors of commission:** a wrong posting (wrong amount, side or account) or a wrong calculation (wrong totalling, balancing or carrying forward). **Errors of omission:** a transaction left out completely (complete omission) or only one side posted (partial omission). **Errors of principle:** a capital item treated as a revenue item, or the reverse. **Compensating errors:** two or more errors whose effects cancel.\n\nAn error is **one-sided** if it puts unequal amounts on the two sides (the trial balance disagrees) and **two-sided** if it does not (the trial balance agrees). A wrong amount, a wrong side, a wrong total and a partial omission are one-sided; a complete omission, an error of principle, a wrong account and compensating errors are two-sided.',
      terms: [
        ['Error of commission', 'A mistake in posting or calculation in which a transaction is recorded but with a wrong amount, side or account, or a book is wrongly totalled, balanced or carried forward.'],
        ['Error of omission', 'A mistake in which a transaction is left out of the books completely, or only one side of it is posted.'],
        ['Error of principle', 'A mistake in which a capital item is treated as a revenue item, or the reverse, against accounting principles.'],
        ['Compensating errors', 'Two or more errors whose effects on the debit and credit sides cancel each other.'],
        ['Capital expenditure', 'Spending that gives a benefit lasting more than one accounting period, such as the purchase of furniture or machinery.'],
        ['Revenue expenditure', 'Spending whose benefit is used up within the accounting period, such as wages, rent and repairs.'],
      ],
      v: vTree,
      vs: [vAffect, vGroups, vComm, vOmit, vPrin],
    },
    {
      h: '6. Rectification before the trial balance',
      t: 2,
      b: 'Errors found **before** the trial balance is prepared are corrected directly. A **one-sided** error is corrected by an **explanatory entry** on the proper side of the affected account. A **two-sided** error is corrected by a **journal entry** that debits and credits the accounts concerned, with a narration. No suspense account is needed, because no difference has yet appeared.',
      terms: [
        ['Rectification', 'Correcting an error found in the books so that the accounts show the true position.'],
        ['Explanatory entry', 'A correction written on the proper side of a ledger account, with a brief explanation, to put right a one-sided error.'],
      ],
      v: vTiming,
      vs: [vBefore, vTFj, vTFf],
    },
    {
      h: '7. Suspense account, rectification after the trial balance, and effect on profit',
      t: 2,
      b: 'If the trial balance is prepared and does not agree, the difference is placed in a **suspense account**: on the debit side if the credit column is higher, on the credit side if the debit column is higher. Each **one-sided** error found later is corrected by a journal entry in which the Suspense A/c is one of the accounts; each **two-sided** error is corrected by a journal entry without it. When every error is found, the Suspense A/c closes with a nil balance.\n\n**Effect on net profit:** an error changes profit only if an expense or an income account carries an unequal amount. Expense overstated or income understated: profit understated. Expense understated or income overstated: profit overstated. Equal amounts moved between two expenses or two incomes, or errors in balance sheet accounts alone: no effect. Corrected net profit = reported profit minus the amount by which profit was overstated plus the amount by which it was understated.',
      terms: [
        ['Suspense account', 'A temporary account opened to hold the difference between the two columns of a trial balance until the errors causing it are found and rectified.'],
        ['One-sided error', 'An error that puts unequal amounts on the two sides of the books, so the trial balance disagrees.'],
        ['Two-sided error', 'An error that affects both sides equally, or leaves out a whole transaction, so the trial balance still agrees.'],
        ['Net profit', 'The excess of revenues over expenses for an accounting period, which increases the capital of the proprietor.'],
      ],
      v: vSuspT,
      vs: [vAfter, vRGtb, vRGj, vProfit, vRGp],
    },
  ],
  tips: '- Trial balance: heading with name and date; each balance in its column by its nature; totals; say whether the columns agree.\n- Never write that an agreed trial balance proves accuracy: name two kinds of error that it cannot show.\n- Classify every error: type, and one-sided or two-sided.\n- Before the trial balance: explanatory entry in the account (one-sided) or a journal entry (two-sided).\n- After the trial balance: Suspense A/c for the difference, entries through it for one-sided errors, nil balance at the end.\n- Profit: say overstated, understated or no effect, with the amount, and correct the reported profit.',
});

// ================================================================ flashcards
const FC = cards([
  ['**Trial balance**', 'A statement of the debit and credit balances of ledger accounts on a given date, to check arithmetical accuracy.', 'definition', 1],
  ['Four objectives of a trial balance', 'Check arithmetical accuracy; help locate errors; summarise the ledger; help prepare the financial statements.', 'fact', 1],
  ['Accounts shown on the debit side of a trial balance', 'Assets, expenses and losses, drawings, debtors (and opening stock).', 'concept', 1],
  ['Accounts shown on the credit side of a trial balance', 'Liabilities, capital, revenues and gains, creditors and provisions.', 'concept', 1],
  ['**Balances method**', 'Lists only the closing balance of each ledger account in the debit or credit column; the usual method.', 'definition', 1],
  ['**Totals method**', 'Lists the total of each side of every ledger account; the two columns of totals must agree.', 'definition', 1],
  ['**Totals and balances method**', 'Shows both the totals and the balances of the ledger accounts.', 'definition', 1],
  ['Steps in preparing a trial balance', 'Post and balance; heading with name and date; list balances in columns; total; compare.', 'concept', 1],
  ['**Debit balance**', 'The debit side of the account is larger: assets, expenses, drawings, debtors.', 'definition', 1],
  ['**Credit balance**', 'The credit side of the account is larger: liabilities, capital, revenues, creditors, provisions.', 'definition', 1],
  ['**Provision**', 'An amount set aside out of profit for a known liability or an expected loss, for example for doubtful debts; a credit balance.', 'definition', 1],
  ['Difference divisible by nine', 'May point to transposed digits, for example 63 written as 36.', 'fact', 1],
  ['Difference equal to twice an amount', 'A balance may have been written in the wrong column.', 'fact', 1],
  ['Limitation of the trial balance', 'Agreement proves only arithmetical accuracy; complete omission, errors of principle, wrong accounts of the same kind and compensating errors do not affect it.', 'concept', 1],
  ['**Error of commission**', 'Wrong posting (amount, side or account) or wrong totalling, balancing or carrying forward.', 'definition', 2],
  ['**Error of omission**', 'A transaction left out completely, or only one side posted.', 'definition', 2],
  ['**Error of principle**', 'A capital item treated as a revenue item, or the reverse; the entry balances.', 'definition', 2],
  ['**Compensating errors**', 'Two or more errors whose effects on the two sides cancel each other.', 'definition', 2],
  ['**One-sided error**', 'Puts unequal amounts on the two sides; the trial balance disagrees.', 'definition', 2],
  ['**Two-sided error**', 'Affects both sides equally or omits the whole transaction; the trial balance agrees.', 'definition', 2],
  ['Complete omission and the trial balance', 'Both debit and credit are missing, so the trial balance still agrees.', 'fact', 2],
  ['Partial omission and the trial balance', 'One side only is posted, so the trial balance disagrees.', 'fact', 2],
  ['**Capital expenditure** and **revenue expenditure**', 'Capital: benefit beyond one year, such as machinery. Revenue: used up within the year, such as wages and repairs.', 'definition', 2],
  ['Rectifying a one-sided error before the trial balance', 'An explanatory entry on the proper side of the affected account.', 'concept', 2],
  ['Rectifying a two-sided error before the trial balance', 'A journal entry debiting and crediting the accounts concerned, with a narration.', 'concept', 2],
  ['**Suspense account**', 'A temporary account that holds the difference between the columns of a trial balance until the errors are found.', 'definition', 2],
  ['Side of the suspense account', 'Debit if the credit column is higher; credit if the debit column is higher.', 'concept', 2],
  ['Rectification after the trial balance', 'One-sided errors: journal entry with the Suspense A/c. Two-sided errors: journal entry without it.', 'concept', 2],
  ['A suspense account that has closed', 'Every error has been found; its balance is nil.', 'fact', 2],
  ['Expense overstated or income understated', 'Net profit understated.', 'fact', 2],
  ['Expense understated or income overstated', 'Net profit overstated.', 'fact', 2],
  ['Equal amounts moved between two expenses or two incomes', 'No effect on net profit.', 'fact', 2],
  ['Corrected net profit', 'Reported profit, less overstatements, plus understatements.', 'formula', 2],
]);

// ================================================================ tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-11-default-chapter-test-short',
  title: 'Chapter test (short) — Trial Balance and Rectification of Errors',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_tb_object', 'm_rect_entry', 'm_profit_under', 'ar_tb_agree'] },
    { id: 'B', title: 'Section B — Short answer', instr: 'Answer all three questions. Show your working.', items: ['s2_objectives', 's2_susp_meaning', 's3_classify'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions.', items: [{ attempt: 1, keys: ['l5_tb_prepare', 'l5_after'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks)', instr: 'Read the passage and answer the questions that follow.', items: ['cb_tb'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-11-default-chapter-test-long',
  title: 'Chapter test (long) — Trial Balance and Rectification of Errors',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_tb_meaning', 'm_side_class', 'm_tb_diff', 'm_err_commission', 'm_err_comp', 'm_two_sided', 'm_susp_close', 'm_rect_two', 'ar_susp', 'ar_principle'] },
    { id: 'B', title: 'Section B — Short answer', instr: 'Answer questions 11 and 12, any ONE of questions 13 and 14, question 15, and any ONE of questions 16 and 17.', items: ['s2_methods', 's2_comm_omis', { attempt: 1, keys: ['s2_principle', 's2_before_after'] }, 's3_susp_entries', { attempt: 1, keys: ['s3_profit_effect', 's3_diff_clues'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks each)', instr: 'Answer question 18, and any ONE of questions 19 and 20.', items: ['l5_before', { attempt: 1, keys: ['l5_profit', 'l5_limits'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks each)', instr: 'Read each passage and answer the questions that follow.', items: ['cb_before', 'cb_profit'] },
  ],
});

// ================================================================ extra gates for this chapter
// 1. TTS-safe narration: words only.
for (const d of [part1, part2]) for (const s of d.slides) {
  const m = /[0-9₹%/&()"“”|*#+=<>]|\b[A-Z]{2,}\b|\b(?:Dr|Cr|Rs|A\/c|viz|etc|ie|eg)\b/.exec(s.narration);
  if (m) throw new Error(`narration of deck ${d.part} ${s.id} is not TTS-safe: "${m[0]}" in "${s.narration.slice(Math.max(0, m.index - 30), m.index + 30)}"`);
}
// 2. Near-duplicate stems inside the bank.
const dups = nearDuplicates(BANK, { n: 5, threshold: 0.5, minWords: 5 });
for (const d of dups) {
  if (d.similarity >= 0.7) throw new Error(`near-duplicate stems ${d.a.id} / ${d.b.id} (${Math.round(d.similarity * 100)}%)`);
  console.log(`note: stems ${d.a.id} / ${d.b.id} are ${Math.round(d.similarity * 100)}% similar (never together in one test)`);
}
// 3. Tests: disjoint, and no deck-check item in either.
const checksUsed = new Set(['m_side_chk', 'n_tb_missing', 'tf_agree_chk', 'ord_tb_steps', 'm_class_chk', 'n_susp_chk', 'fb_susp']);
const inTest = (t) => t.sections.flatMap((s) => s.items.map((i) => i.question_id));
const shortIds = new Set(inTest(T_SHORT));
check(inTest(T_LONG).every((id) => !shortIds.has(id)), 'the two chapter tests share a question');
const deckChecks = new Set([part1, part2].flatMap((d) => d.slides.map((s) => s.check_question_id).filter(Boolean)));
check(deckChecks.size === checksUsed.size, `deck check list out of date: ${deckChecks.size} vs ${checksUsed.size}`);
check([...shortIds, ...inTest(T_LONG)].every((id) => !deckChecks.has(id)), 'a deck-check question is used in a test');
check(T_SHORT.total_marks === 20 && T_LONG.total_marks === 40, `test marks ${T_SHORT.total_marks} / ${T_LONG.total_marks}`);
void same; void TF; void RG;

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: FC,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01 and t02 of cbse-11-accountancy-ch06 (preparation of the trial balance by the balances method, with the totals and totals-and-balances methods; types of errors and their rectification before and after the trial balance, with the suspense account and the effect on net profit)',
    originality: 'every firm, person, scenario and figure written for this chapter and labelled imagined; no NCERT text, illustration or exercise and no board or sample-paper item reused',
    data: 'every amount computed with the shared acc.mjs and the chapter helpers in extra.mjs and asserted: the correct balances of every firm agree (trialBalance), the books differ from the correct ones by exactly the sum of the one-sided errors, the suspense account closes after all rectifications (ledger), the corrected balances equal the correct balances, the stated effect of each error on net profit equals the computed effect, and the corrected profit equals the reported profit adjusted by the effects; tables in decks and model answers are generated from the computed objects',
    facts: 'trial balance meaning, objectives, sides of accounts, balances method with a one-line mention of the totals and totals-and-balances methods; limitations of an agreed trial balance; errors of commission, omission, principle and compensating errors; one-sided and two-sided errors; rectification before the trial balance (explanatory entry in the account, journal entry) and after it (suspense account that closes); effect of each error on net profit',
    gate: 'schema, content lint, deterministic verify checks, answer-leak scan, TTS-safe narration, near-duplicate stems and test disjointness run clean on this chapter',
  },
});
