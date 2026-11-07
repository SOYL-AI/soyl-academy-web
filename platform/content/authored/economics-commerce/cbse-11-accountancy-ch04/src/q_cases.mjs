// Case-based items (4 marks: 1 + 1 + 2, part (c) with an either/or), all on imagined businesses.
import { mcq, short, caseQ, child } from '../../cbse-11-accountancy-ch01/src/lib.mjs';
import { same, inr, rs, mdTable, journal, gst, cashBook, pettyCash, tradeBook, R, P, DEP, V, T } from './figures.mjs';
import { QQ } from './qq.mjs';

// ---------------------------------------------------------------- Radha Fabrics: two-column cash book
const RF = cashBook({
  open: { cash: 10000, bank: 40000 },
  items: [R('Mar 5', 'Sales A/c', 12000), DEP('Mar 8', 8000), R('Mar 12', 'Customer (cheque deposited)', 0, 22000), P('Mar 20', 'Wages A/c', 6000), P('Mar 25', 'Bank charges A/c', 0, 150)],
});
same(RF.cash, 8000, 'Radha closing cash');
same(RF.bank, 69850, 'Radha closing bank');
const RFwrong = cashBook({
  open: { cash: 10000, bank: 40000 },
  items: [R('Mar 5', 'Sales A/c', 12000), DEP('Mar 8', 8000), R('Mar 12', 'Customer (cheque deposited)', 0, 22000), P('Mar 20', 'Wages A/c', 6000), P('Mar 25', 'Bank charges A/c', 150, 0)],
});
same(RFwrong.cash, 7850, 'Radha cash if bank charges are put in the cash column');
same(RFwrong.bank, 70000, 'Radha bank if bank charges are put in the cash column');
QQ('cb_radha', caseQ({
  t: [1], d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the passage and answer the questions that follow. *(An imagined cloth shop, written for practice.)*',
  passage: `**Radha Fabrics (imagined)**\n\nRadha Fabrics, an imagined cloth shop in the imagined town of Seemapur, keeps a two-column cash book. On 1 March 2027 it had ${rs(10000)} in cash and ${rs(40000)} at the bank. In March it made cash sales of ${rs(12000)} on 5 March, deposited ${rs(8000)} of cash into the bank on 8 March, deposited a customer's cheque of ${rs(22000)} on 12 March, paid wages of ${rs(6000)} in cash on 20 March, and on 25 March found from the bank statement that the bank had charged ${rs(150)}.`,
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'understanding', stem: 'The deposit of cash into the bank on 8 March is entered in the cash book as', opts: ['a contra entry, a credit in the cash column and a debit in the bank column', 'a debit in the cash column and a credit in the bank column', 'an entry in the cash column only', 'an entry in the bank column only'], sol: 'Cash goes out of the cash column (credit) and into the bank column (debit), and both lines are in the same book, so it is a contra entry. The second option is a withdrawal, and the last two omit one of the two lines.' })),
    child('b', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Find the closing cash balance of 31 March 2027.', model: `${inr(10000)} + ${inr(12000)} − ${inr(8000)} − ${inr(6000)} = **${rs(RF.cash)}** (debit).`, sol: 'Cash column only.', scheme: [[`${rs(RF.cash)}`, 1]] })),
    child('c', short({ t: 1, d: 3, c: 'application', marks: 2, stem: '**Either** (i): Find the closing bank balance and say on which side it is carried down.', model: `Bank debits: ${inr(40000)} + ${inr(8000)} + ${inr(22000)} = ${inr(RF.dr.bank)}; credit: bank charges ${inr(150)}. Balance = **${rs(RF.bank)}**, a debit balance, written as By Balance c/d on the credit side and brought down as To Balance b/d on the debit side.`, sol: 'Total, difference and side.', scheme: [[`Bank balance ${rs(RF.bank)}`, 1], ['Carried down on the credit side as a debit balance', 1]] }), [
      short({ t: 1, d: 4, c: 'analysis', marks: 2, stem: `**Or** (ii): The clerk wrongly wrote the bank charges in the cash column instead of the bank column. State the effect on the closing cash and bank balances.`, model: `Cash would be shown as ${rs(RFwrong.cash)}, understated by ${rs(150)}; the bank would be shown as ${rs(RFwrong.bank)}, overstated by ${rs(150)}. The total of cash and bank is unchanged, but each balance is wrong.`, sol: 'Cash understated, bank overstated.', scheme: [[`Cash ${rs(RFwrong.cash)} (understated)`, 1], [`Bank ${rs(RFwrong.bank)} (overstated)`, 1]] }),
    ]),
  ],
}));

// ---------------------------------------------------------------- Vandana Printers: petty cash
const VP = pettyCash({
  imprest: 1800,
  vouchers: [V('Dec 2', 'Stamps', { postage: 160 }), V('Dec 3', 'File covers', { stationery: 340 }), V('Dec 4', 'Auto fare', { conveyance: 120 }), V('Dec 5', 'Cartage', { cartage: 260 }), V('Dec 6', 'Tea for visitors', { sundries: 100 })],
});
same(VP.spent, 980, 'Vandana spent');
same(VP.closing, 820, 'Vandana closing');
QQ('cb_vandana', caseQ({
  t: [1], d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the passage and answer the questions that follow. *(An imagined printing press, written for practice.)*',
  passage: `**Vandana Printers (imagined)**\n\nVandana Printers, an imagined press in the imagined town of Devpur, keeps its petty cash on the imprest system with an imprest of ${rs(1800)}. On 1 December 2026 the head cashier gave the petty cashier ${rs(1800)}. In the week the petty cashier paid ${rs(160)} for stamps on 2 December, ${rs(340)} for file covers on 3 December, ${rs(120)} as an auto fare on 4 December, ${rs(260)} for cartage on 5 December and ${rs(100)} for tea for visitors on 6 December.`,
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'understanding', stem: 'A petty cash book with separate columns for postage, stationery, conveyance, cartage and sundries is called', opts: ['an analytical petty cash book', 'a simple cash book', 'a purchases book', 'a journal proper'], sol: 'The columns analyse each payment under a head, which is the mark of an analytical petty cash book. The other books do not record petty payments by head.' })),
    child('b', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Find the total petty cash spent in the week.', model: `${inr(160)} + ${inr(340)} + ${inr(120)} + ${inr(260)} + ${inr(100)} = **${rs(VP.spent)}**.`, sol: 'Add the five vouchers.', scheme: [[`${rs(VP.spent)}`, 1]] })),
    child('c', short({ t: 1, d: 3, c: 'application', marks: 2, stem: '**Either** (i): Find the balance in hand at the end of the week and the amount the head cashier reimburses to restore the imprest.', model: `Balance in hand = ${inr(1800)} − ${inr(VP.spent)} = **${rs(VP.closing)}**. Reimbursement = **${rs(VP.reimburse)}**, which makes the float ${inr(VP.closing)} + ${inr(VP.reimburse)} = ${rs(1800)} again.`, sol: 'Balance, then reimbursement.', scheme: [[`Balance ${rs(VP.closing)}`, 1], [`Reimbursement ${rs(VP.reimburse)}`, 1]] }), [
      short({ t: 1, d: 4, c: 'analysis', marks: 2, stem: `**Or** (ii): The head cashier proposes to give the petty cashier a fresh ${rs(1800)} for the next week. Comment, with figures.`, model: `The petty cashier already holds ${rs(VP.closing)}, so a fresh ${rs(1800)} would make the float ${rs(VP.closing + 1800)}, which is ${rs(VP.closing)} above the imprest. Under the imprest system only the amount spent, ${rs(VP.reimburse)}, should be given.`, sol: 'The float would exceed the imprest.', scheme: [[`Float would become ${rs(VP.closing + 1800)}, above the imprest`, 1], [`Correct reimbursement ${rs(VP.reimburse)}`, 1]] }),
    ]),
  ],
}));

// ---------------------------------------------------------------- Wazir Bicycles: purchase, return and debit note
const WB = tradeBook({ kind: 'purchases', rate: 12, entries: [T('Feb 3', 'P-5', 'Yash Tubes', 20000, 10)] });
const WR = tradeBook({ kind: 'purchaseReturns', rate: 12, entries: [T('Feb 12', 'DN-2', 'Yash Tubes', 5000, 10)] });
same(WB.totals.net, 18000, 'Wazir purchase net');
same(WB.totals.total, 20160, 'Wazir invoice total');
same(WR.totals.total, 5040, 'Wazir debit note');
same(WR.totals.cgst, 270, 'Wazir debit note CGST');
const WBAL = WB.totals.total - WR.totals.total;
same(WBAL, 15120, 'Wazir balance payable');
QQ('cb_wazir', caseQ({
  t: [2], d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the passage and answer the questions that follow. *(An imagined cycle firm and an imagined tax rate, written for practice.)*',
  passage: `**Wazir Bicycles (imagined)**\n\nOn 3 February 2027 Wazir Bicycles, an imagined firm, bought goods on credit from Yash Tubes, a supplier in the same state, at a list price of ${rs(20000)} less trade discount of 10%. Goods and services tax at an imagined rate of 12% is charged on the price after trade discount. On 12 February Wazir Bicycles returned goods of list price ${rs(5000)} (same discount) and sent Yash Tubes a note about it.`,
  parts: [
    child('a', mcq({ t: 2, d: 1, c: 'understanding', stem: 'The note sent to Yash Tubes on 12 February is a', opts: ['debit note, recorded in the purchases return book', 'credit note, recorded in the purchases return book', 'debit note, recorded in the sales return book', 'credit note, recorded in the sales return book'], sol: 'The buyer returning goods debits the supplier on a debit note, and the return goes into the purchases return book. A credit note is raised by a seller for goods received back.' })),
    child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Find the net amount entered in the goods column of the purchases book for the invoice of 3 February.', model: `${inr(20000)} − ${inr(WB.totals.td)} = **${rs(WB.totals.net)}**.`, sol: 'List price less trade discount.', scheme: [[`${rs(WB.totals.net)}`, 1]] })),
    child('c', short({ t: 2, d: 3, c: 'application', marks: 2, stem: '**Either** (i): Find the total amount of the debit note and the CGST included in it.', model: `Net value of goods returned = ${inr(5000)} − ${inr(WR.totals.td)} = ${inr(WR.totals.net)}. Tax at 12% = ${inr(WR.totals.tax)}, of which CGST is **${rs(WR.totals.cgst)}**. Debit note = ${inr(WR.totals.net)} + ${inr(WR.totals.tax)} = **${rs(WR.totals.total)}**.`, sol: 'Net value, tax at the same rate, total.', scheme: [[`Debit note ${rs(WR.totals.total)}`, 1], [`CGST ${rs(WR.totals.cgst)}`, 1]] }), [
      short({ t: 2, d: 3, c: 'application', marks: 2, stem: '**Or** (ii): Find the amount still payable to Yash Tubes after the return and name the book in which the return is first recorded.', model: `Invoice total = ${inr(WB.totals.total)}; debit note = ${inr(WR.totals.total)}. Payable = ${inr(WB.totals.total)} − ${inr(WR.totals.total)} = **${rs(WBAL)}**. The return is first recorded in the purchases return book.`, sol: 'Invoice less debit note; purchases return book.', scheme: [[`Balance payable ${rs(WBAL)}`, 1], ['Purchases return book', 1]] }),
    ]),
  ],
}));

// ---------------------------------------------------------------- Jayant Medicals: journal proper
const JM = { furn: 24000, rate: 18, drawn: 3000, sample: 1500 };
JM.gst = gst(JM.furn, JM.rate);
JM.total = same(JM.furn + JM.gst.tax, 28320, 'Jayant furniture invoice');
same(JM.gst.cgst, 2160, 'Jayant CGST');
const JMj = journal([
  { dr: [['Drawings A/c', JM.drawn]], cr: [['Purchases A/c', JM.drawn]], note: 'Being medicines taken by the owner for his family' },
  { dr: [['Advertisement A/c', JM.sample]], cr: [['Purchases A/c', JM.sample]], note: 'Being goods distributed as free samples' },
]);
same(JMj.total, 4500, 'Jayant journal total');
QQ('cb_jayant', caseQ({
  t: [2], d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the passage and answer the questions that follow. *(An imagined chemist and an imagined tax rate, written for practice.)*',
  passage: `**Jayant Medicals (imagined)**\n\nJayant Medicals, an imagined chemist, did the following in July 2026. It bought office furniture on credit from Kapil Furniture, a supplier in the same state, for ${rs(JM.furn)} plus goods and services tax at an imagined rate of ${JM.rate}%. The owner took medicines costing ${rs(JM.drawn)} for his family. The shop distributed goods costing ${rs(JM.sample)} as free samples at a health camp.`,
  parts: [
    child('a', mcq({ t: 2, d: 1, c: 'application', stem: 'The credit purchase of furniture is first recorded in the', opts: ['journal proper', 'purchases book', 'cash book', 'sales return book'], sol: 'Furniture is an asset, not goods for resale, so it is not entered in the purchases book. It is not a cash transaction or a sales return, so it is recorded in the journal proper.' })),
    child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Find the amount credited to Kapil Furniture.', model: `Tax = ${inr(JM.furn)} × ${JM.rate}/100 = ${inr(JM.gst.tax)}; credit = ${inr(JM.furn)} + ${inr(JM.gst.tax)} = **${rs(JM.total)}**.`, sol: 'Price plus tax.', scheme: [[`${rs(JM.total)}`, 1]] })),
    child('c', short({ t: 2, d: 3, c: 'application', marks: 2, stem: '**Either** (i): Pass the journal proper entries for the goods taken by the owner and the free samples.', model: `${JMj.md}`, sol: 'Drawings and Advertisement debited; Purchases credited.', scheme: [[`Drawings ${rs(JM.drawn)}`, 1], [`Advertisement ${rs(JM.sample)}`, 1]] }), [
      short({ t: 2, d: 4, c: 'analysis', marks: 2, stem: '**Or** (ii): Explain why the free samples are neither debited to Drawings nor entered in the sales book.', model: `The samples were given for the shop's own promotion, so they are a business expense (advertisement), not a withdrawal by the owner for personal use. They were not sold, so they are not entered in the sales book, which records only credit sales of goods.`, sol: 'Business purpose; no sale.', scheme: [['Business expense, not personal use', 1], ['No sale was made, so no entry in the sales book', 1]] }),
    ]),
  ],
}));
void mdTable;
