// Shared computed figures for ISC 11 Accounts ch05 (Cash Book). Every cash book, ledger account and balance in a slide,
// note or item comes from cb.mjs (columns, balances, discount totals, postings asserted) and acc.mjs. Imagined firms
// only. No GST transactions (syllabus note).
import { same, check, sum, inr, rs, mdTable, ledger } from './acc.mjs';
import { cashBook, R, P, DEP, WD, ledgerFromBook, discountPosting, settle, keepBalance } from './cb.mjs';

export { same, check, sum, inr, rs, mdTable, ledger, cashBook, R, P, DEP, WD, ledgerFromBook, discountPosting, settle, keepBalance };

// ---------------------------------------------------------------- Part 1: Kundan Hardware, simple cash book, June 2027
export const SC = {
  open: { cash: 18000, bank: 0 },
  openDate: '1 Jun 2027',
  closeDate: '30 Jun',
  next: '1 Jul',
  items: [
    R('3 Jun', 'Sales A/c', { cash: 12400 }),
    P('5 Jun', 'Rent A/c', { cash: 3500 }),
    R('8 Jun', 'Anil Rao', { cash: 6200 }),
    P('11 Jun', 'Purchases A/c', { cash: 9800 }),
    P('14 Jun', 'Salaries A/c', { cash: 7000 }),
    R('19 Jun', 'Interest Received A/c', { cash: 450 }),
    P('22 Jun', 'Mehta Suppliers', { cash: 4200 }),
    P('26 Jun', 'Drawings A/c', { cash: 2000 }),
    P('28 Jun', 'Carriage A/c', { cash: 350 }),
  ],
  folio: { 'Sales A/c': 14, 'Rent A/c': 21, 'Anil Rao A/c': 6, 'Purchases A/c': 15, 'Salaries A/c': 22, 'Interest Received A/c': 19, 'Mehta Suppliers A/c': 9, 'Drawings A/c': 4, 'Carriage A/c': 23 },
};
export const SCB = cashBook({ kind: 'simple', ...SC });
same(SCB.cash, 10200, 'Kundan Hardware closing cash');
same(SCB.dr.cash, 37050 + 0 + 0, 'Kundan Hardware total of the debit side');
same(SCB.cr.cash, 37050, 'Kundan Hardware total of the credit side');
export const SCB_LF = cashBook({ kind: 'simple', ...SC, lf: SC.folio });
export const SC_ANIL = ledgerFromBook(SCB, 'Anil Rao', { opening: { side: 'dr', amount: 10000 }, before: [{ side: 'dr', text: '2 Jun To Sales A/c (credit sale, Sales Book)', amount: 4800 }] });
same(SC_ANIL.balance, 10000 + 4800 - 6200, 'Anil Rao balance');
export const SC_MEHTA = ledgerFromBook(SCB, 'Mehta Suppliers', { opening: { side: 'cr', amount: 9000 } });
same(SC_MEHTA.balance, -(9000 - 4200), 'Mehta Suppliers balance');

// ---------------------------------------------------------------- Part 2: Bhavna Electricals, triple column cash book, November 2027
export const TC = {
  open: { cash: 25000, bank: 60000 },
  openDate: '1 Nov 2027',
  closeDate: '30 Nov',
  next: '1 Dec',
  items: [
    R('2 Nov', 'Sales A/c', { cash: 15000 }),
    R('3 Nov', 'Rohit Jain', { bank: 9600, disc: 400 }),
    P('5 Nov', 'Sumit Traders', { bank: 18800, disc: 1200 }),
    R('8 Nov', 'Karan Mehra', { cash: 12000 }),
    P('10 Nov', 'Rent A/c', { cash: 4500 }),
    DEP('12 Nov', 12000),
    WD('15 Nov', 8000),
    P('18 Nov', 'Purchases A/c', { bank: 14500 }),
    P('21 Nov', 'Karan Mehra', { bank: 12000 }),
    P('24 Nov', 'Salaries A/c', { cash: 9000 }),
    R('26 Nov', 'Naina Shah', { cash: 7350, disc: 150 }),
    P('28 Nov', 'Bank Charges A/c', { bank: 320 }),
    R('29 Nov', 'Interest Received A/c', { bank: 1100 }),
    P('30 Nov', 'Wages A/c', { cash: 3000 }),
  ],
};
export const TCB = cashBook({ kind: 'triple', ...TC });
same(TCB.cash, 38850, 'Bhavna Electricals closing cash');
same(TCB.bank, 29080, 'Bhavna Electricals closing bank');
same(TCB.discAllowed, 550, 'Bhavna Electricals discount allowed');
same(TCB.discReceived, 1200, 'Bhavna Electricals discount received');
export const TC_ROHIT = ledgerFromBook(TCB, 'Rohit Jain', { opening: { side: 'dr', amount: 10000 } });
same(TC_ROHIT.balance, 0, 'Rohit Jain settled in full');
export const TC_KARAN = ledgerFromBook(TCB, 'Karan Mehra', { opening: { side: 'dr', amount: 12000 } });
same(TC_KARAN.balance, 12000, 'Karan Mehra owes again after the dishonour');
export const TC_SUMIT = ledgerFromBook(TCB, 'Sumit Traders', { opening: { side: 'cr', amount: 20000 } });
same(TC_SUMIT.balance, 0, 'Sumit Traders settled in full');
export const TC_DISC = discountPosting(TCB);
// the first three transactions (receipt with discount, payment with discount) for a worked example
export const TC_FIRST = cashBook({ kind: 'triple', open: TC.open, openDate: TC.openDate, closeDate: '5 Nov', items: TC.items.slice(0, 3) });
// the cheque that is not deposited the same day: received 8 Nov (cash column), deposited 12 Nov (contra), dishonoured 21 Nov
export const TC_CHEQUE = cashBook({ kind: 'triple', open: { cash: 0, bank: 0 }, items: [TC.items[3], TC.items[5], TC.items[8]] });

// ---------------------------------------------------------------- bank overdraft: Wazir Cycle Mart, December 2027
export const OD = {
  open: { cash: 6000, bank: -14000 },
  openDate: '1 Dec 2027',
  closeDate: '31 Dec',
  next: '1 Jan',
  items: [
    R('3 Dec', 'Sales A/c', { cash: 21000 }),
    R('5 Dec', 'Dinesh Pillai', { bank: 8000, disc: 200 }),
    P('8 Dec', 'Rahul Brothers', { bank: 26500, disc: 1500 }),
    P('11 Dec', 'Wages A/c', { cash: 5500 }),
    DEP('14 Dec', 10000),
    P('18 Dec', 'Electricity A/c', { bank: 3200 }),
    P('22 Dec', 'Insurance A/c', { cash: 2400 }),
    P('27 Dec', 'Bank Charges A/c', { bank: 450 }),
    P('28 Dec', 'Interest on Overdraft A/c', { bank: 700 }),
    R('29 Dec', 'Sunil Das', { cash: 5000, disc: 100 }),
  ],
};
export const ODB = cashBook({ kind: 'triple', ...OD });
same(ODB.cash, 14100, 'Wazir Cycle Mart closing cash');
same(ODB.bank, -26850, 'Wazir Cycle Mart closing bank (overdraft)');
same(ODB.discAllowed, 300, 'Wazir discount allowed');
same(ODB.discReceived, 1500, 'Wazir discount received');

// ---------------------------------------------------------------- definite cash balance: Pranav Bicycles, 10 and 11 January 2028
export const FX = { target: 10000, open: { cash: 10000, bank: 4000 } };
const day1 = [R('10 Jan', 'Sales A/c', { cash: 26000 }), P('10 Jan', 'Wages A/c', { cash: 6500 }), P('10 Jan', 'Carriage A/c', { cash: 1500 })];
export const FX1 = settle(FX.open, day1, FX.target, '10 Jan');
same(FX1.cashBefore, 28000, 'Pranav day 1 cash before the contra');
same(FX1.item.amt, 18000, 'Pranav day 1 deposit');
export const FX_ITEMS1 = [...day1, FX1.item];
const day2 = [R('11 Jan', 'Sales A/c', { cash: 2000 }), P('11 Jan', 'Cartage A/c', { cash: 4000 }), P('11 Jan', 'Salaries A/c', { cash: 7000 }), P('11 Jan', 'Hari Traders', { bank: 21000 })];
export const FX2 = settle(FX.open, [...FX_ITEMS1, ...day2], FX.target, '11 Jan');
same(FX2.cashBefore, 1000, 'Pranav day 2 cash before the contra');
same(FX2.item.amt, 9000, 'Pranav day 2 withdrawal');
same(FX2.bankBefore, 1000, 'Pranav day 2 bank before the contra');
same(FX2.bankAfter, -8000, 'Pranav day 2 overdraft after the withdrawal');
export const FX_ITEMS = [...FX_ITEMS1, ...day2, FX2.item];
export const FXB = cashBook({ kind: 'triple', open: FX.open, openDate: '10 Jan 2028', closeDate: '11 Jan', next: '12 Jan', items: FX_ITEMS });
same(FXB.cash, 10000, 'Pranav closing cash');
same(FXB.bank, -8000, 'Pranav closing bank');
check(FXB.minCash >= 0, 'cash never negative');
