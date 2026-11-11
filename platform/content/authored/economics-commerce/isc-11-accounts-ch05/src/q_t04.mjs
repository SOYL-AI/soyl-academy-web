// t04: keeping a definite cash balance at the end of each day or period, or availing an overdraft. The contra entry
// that restores the balance is computed by settle()/keepBalance() of cb.mjs, and every balance is asserted.
import { mcq, ar, tf, fb, short, long } from './lib.mjs';
import { same, check, inr, rs, cashBook, R, P, settle, keepBalance, discountPosting } from './fig.mjs';
import { QQ, numQ } from './qq.mjs';

// ================================================================ multiple choice
QQ('m_fixed_why', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Bakul Cycles, an imagined shop, decides to keep a fixed sum of cash in the till at the close of every working day and to bank the rest. The main purpose of this practice is to',
  opts: ['limit the cash exposed to theft on the premises while the rest stays safely at the bank', 'avoid writing the cash column of the cash book', 'earn discount from the debtors of the firm', 'make the bank column show an overdraft'],
  sol: 'Holding only a fixed float limits the risk of loss or theft, and a bank balance is safer. The cash column is still written, discount depends on the settlement terms, and an overdraft is not an aim of the practice.',
}));
{
  const open = { cash: 9000, bank: 20000 };
  const items = [R('20 Jan', 'Sales A/c', { cash: 41000 }), P('20 Jan', 'Wages A/c', { cash: 12600 })];
  const s = settle(open, items, 10000, '20 Jan');
  same(s.cashBefore, 37400, 'm_fixed_excess cash before');
  same(s.item.amt, 27400, 'm_fixed_excess deposit');
  check(s.item.k === 'DEP', 'excess is deposited');
  QQ('m_fixed_excess', mcq({
    t: 4, d: 2, c: 'application',
    stem: `Bakul Cycles, an imagined shop, keeps ${rs(10000)} in hand at the close of each day. On 20 January the cash column shows ${rs(s.cashBefore)} after the day's transactions. The contra entry that restores the fixed balance is`,
    opts: [`a deposit of ${rs(s.item.amt)} into the bank: bank column debited, cash column credited`, `a deposit of ${rs(s.cashBefore)} into the bank`, `a deposit of ${rs(10000)} into the bank`, `a withdrawal of ${rs(s.item.amt)} from the bank: cash column debited, bank column credited`],
    sol: `Excess cash = ${inr(s.cashBefore)} − ${inr(10000)} = ${rs(s.item.amt)}, and it goes to the bank. Depositing ${rs(s.cashBefore)} would leave nothing in hand, depositing ${rs(10000)} would bank the float itself, and the withdrawal would add to the cash that is already too high.`,
  }));
}
{
  const open = { cash: 8000, bank: 2000 };
  const items = [P('9 Feb', 'Wages A/c', { cash: 4500 })];
  const s = settle(open, items, 8000, '9 Feb');
  same(s.cashBefore, 3500, 'm_fixed_short cash before');
  same(s.item.amt, 4500, 'm_fixed_short withdrawal');
  same(s.bankAfter, -2500, 'm_fixed_short bank after');
  QQ('m_fixed_short', mcq({
    t: 4, d: 3, c: 'application',
    stem: `Kasturi Bikes, an imagined firm, keeps ${rs(8000)} in hand at the close of each day. On 9 February its cash column stands at ${rs(s.cashBefore)} and its bank balance is ${rs(2000)}. After the firm withdraws the shortfall from the bank, the bank column shows`,
    opts: [`an overdraft of ${rs(-s.bankAfter)}`, `an overdraft of ${rs(s.item.amt)}`, `a favourable balance of ${rs(-s.bankAfter)}`, `a favourable balance of ${rs(2000 + s.item.amt)}`],
    sol: `Shortfall = ${inr(8000)} − ${inr(s.cashBefore)} = ${inr(s.item.amt)}. Bank balance = ${inr(2000)} − ${inr(s.item.amt)} = −${inr(-s.bankAfter)}, a credit balance, so the firm is overdrawn by ${rs(-s.bankAfter)}. ${rs(s.item.amt)} ignores the balance already at the bank, and the two favourable balances get the sign or the direction of the withdrawal wrong.`,
  }));
}

// ================================================================ assertion-reason, true-false, fill-blank
QQ('ar_fixed', ar({
  t: 4, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'A firm that keeps a fixed cash balance at the end of each day withdraws the shortfall from its bank when the cash column falls below the fixed amount.',
  r: 'If the bank balance is smaller than the shortfall, the withdrawal can be made only against an overdraft arrangement.',
  sol: 'Both are true, but R does not explain A: the withdrawal is made to restore the fixed balance, and R only states a condition under which the bank column goes into an overdraft.',
}));
QQ('tf_chk_fixed', tf({
  t: 4, d: 2, c: 'understanding', ans: true,
  stem: 'An imagined firm that keeps a definite cash balance at the close of each day deposits any excess cash into the bank, and the deposit is a contra entry in the cash book.',
  sol: 'The excess leaves the cash column and enters the bank column, and since both columns belong to the same book it is shown on both sides as a contra entry.',
}));
QQ('fb_fixed', fb({
  t: 4, d: 2, c: 'recall',
  stem: 'To keep a definite cash balance, the ___ over the fixed amount is deposited into the bank, and a ___ is made good by withdrawing from the bank.',
  acc: [['excess', 'surplus'], ['shortfall', 'deficiency', 'shortage']],
  sol: 'The excess cash is banked and a shortfall is withdrawn from the bank, both by contra entries.',
}));

// ================================================================ numerical
{
  const s = settle({ cash: 15000, bank: 32000 }, [R('12 May', 'Sales A/c', { cash: 49500 }), P('12 May', 'Salaries A/c', { cash: 17600 })], 15000, '12 May');
  same(s.cashBefore, 46900, 'n_deposit cash before');
  same(s.item.amt, 31900, 'n_deposit');
  QQ('n_deposit', numQ({
    t: 4, d: 3, c: 'application', value: s.item.amt,
    stem: `Bhoomi Bakers, an imagined firm, keeps ${rs(15000)} in hand at the close of each day. On 12 May it had ${rs(15000)} in cash at the start, made cash sales of ${rs(49500)} and paid ${rs(17600)} in cash for salaries. How much must it deposit into the bank at the close of the day (in ₹)?`,
    sol: `Cash before the deposit = ${inr(15000)} + ${inr(49500)} − ${inr(17600)} = ${inr(s.cashBefore)}. Deposit = ${inr(s.cashBefore)} − ${inr(15000)} = ${rs(s.item.amt)}.`,
  }));
}

// ================================================================ short answer, 2 marks
QQ('s2_fixed_meaning', short({
  t: 4, d: 2, c: 'understanding', marks: 2,
  stem: 'What is meant by maintaining a definite cash balance at the end of each day? State the entries by which the balance is restored.',
  model: 'The firm decides on a **fixed amount of cash** to hold at the close of each day. If the cash column shows more, the **excess is deposited** into the bank (cash column credited, bank column debited). If it shows less, the **shortfall is withdrawn** from the bank (cash column debited, bank column credited). Both are contra entries.',
  sol: 'Fixed float; deposit of excess, withdrawal of shortfall.',
  scheme: [['Meaning: a fixed cash balance held at the close of each day', 1], ['Excess deposited and shortfall withdrawn, each by a contra entry', 1]],
}));
QQ('s2_od_avail', short({
  t: 4, d: 3, c: 'understanding', marks: 2,
  stem: 'When a firm withdraws cash from the bank to make up its fixed cash balance but the bank balance is too small, what happens to the bank column? Explain with an example of your own.',
  model: 'The withdrawal is allowed only if the bank has agreed to an **overdraft**, and the bank column then shows a **credit balance**. For example, with ₹2,000 at the bank and a shortfall of ₹4,500, the withdrawal of ₹4,500 leaves a credit balance of ₹2,500: an overdraft carried down on the debit side of the bank column.',
  sol: 'Overdraft as a credit balance, with the example.',
  scheme: [['Overdraft arrangement needed; the bank column shows a credit balance', 1], ['Example: ₹2,000 less ₹4,500 gives an overdraft of ₹2,500', 1]],
}));
same(4500 - 2000, 2500, 's2_od_avail example');

// ================================================================ short answer, 3 marks
{
  const open = { cash: 6000, bank: 15000 };
  const items = [R('18 Nov', 'Sales A/c', { cash: 14500 }), P('18 Nov', 'Wages A/c', { cash: 3200 }), P('18 Nov', 'Carriage A/c', { cash: 800 })];
  const s = settle(open, items, 5000, '18 Nov');
  const cb = cashBook({ open, openDate: '18 Nov', closeDate: '18 Nov', next: '19 Nov', items: [...items, s.item] });
  same(s.cashBefore, 16500, 's3_fixed_day cash before');
  same(s.item.amt, 11500, 's3_fixed_day deposit');
  same(cb.bank, 26500, 's3_fixed_day bank');
  same(cb.cash, 5000, 's3_fixed_day cash');
  QQ('s3_fixed_day', short({
    t: 4, d: 3, c: 'application', marks: 3,
    stem: `Hira Hardware, an imagined shop, keeps ${rs(5000)} in hand at the close of each day. On 18 November 2027 it had ${rs(6000)} in cash and ${rs(15000)} at the bank in the morning, made cash sales of ${rs(14500)}, and paid ${rs(3200)} for wages and ${rs(800)} for carriage in cash. Find the cash in hand before banking, pass the contra entry that restores the fixed balance and show the closing balances.`,
    model: `Cash before banking = ${inr(6000)} + ${inr(14500)} − ${inr(3200)} − ${inr(800)} = ${rs(s.cashBefore)}. Excess = ${inr(s.cashBefore)} − ${inr(5000)} = ${rs(s.item.amt)}, deposited.\n\n${cb.md}\n\nClosing cash ${rs(cb.cash)}; closing bank ${rs(cb.bank)}.`,
    sol: 'Total the day, find the excess, deposit it by a contra entry.',
    scheme: [[`Cash before banking ${rs(s.cashBefore)}`, 1], [`Contra entry: deposit of ${rs(s.item.amt)}, bank column debited and cash column credited`, 1], [`Closing balances: cash ${rs(cb.cash)}, bank ${rs(cb.bank)}`, 1]],
  }));
}
{
  const open = { cash: 8000, bank: 3000 };
  const plan = keepBalance(open, 8000, [
    { date: '15 Feb', items: [R('15 Feb', 'Sales A/c', { cash: 5000 }), P('15 Feb', 'Wages A/c', { cash: 12500 })] },
    { date: '16 Feb', items: [R('16 Feb', 'Sales A/c', { cash: 20000 }), P('16 Feb', 'Salaries A/c', { cash: 6000 })] },
  ]);
  const [d1, d2] = plan.steps;
  same(d1.cashBefore, 500, 's3_fixed_two_days day 1 cash');
  same(d1.item.amt, 7500, 's3_fixed_two_days day 1 withdrawal');
  same(d1.bankAfter, -4500, 's3_fixed_two_days day 1 bank');
  same(d2.cashBefore, 22000, 's3_fixed_two_days day 2 cash');
  same(d2.item.amt, 14000, 's3_fixed_two_days day 2 deposit');
  same(d2.bankAfter, 9500, 's3_fixed_two_days day 2 bank');
  const cb = cashBook({ open, openDate: '15 Feb 2028', closeDate: '16 Feb', next: '17 Feb', items: plan.items });
  QQ('s3_fixed_two_days', short({
    t: 4, d: 4, c: 'application', marks: 3,
    stem: `Kasturi Bikes, an imagined firm, keeps ${rs(8000)} in hand at the close of each day. On 15 February 2028 it had ${rs(8000)} in cash and ${rs(3000)} at the bank. On 15 February it made cash sales of ${rs(5000)} and paid wages of ${rs(12500)}; on 16 February it made cash sales of ${rs(20000)} and paid salaries of ${rs(6000)}, all in cash. Find the contra entry needed at the close of each day and the bank balance after it.`,
    model: `**15 February:** cash before banking = ${inr(8000)} + ${inr(5000)} − ${inr(12500)} = ${inr(d1.cashBefore)}; shortfall ${rs(d1.item.amt)} withdrawn; bank = ${inr(3000)} − ${inr(d1.item.amt)} = −${inr(-d1.bankAfter)}, an overdraft of ${rs(-d1.bankAfter)}.\n\n**16 February:** cash before banking = ${inr(8000)} + ${inr(20000)} − ${inr(6000)} = ${inr(d2.cashBefore)}; excess ${rs(d2.item.amt)} deposited; bank = −${inr(-d1.bankAfter)} + ${inr(d2.item.amt)} = ${rs(d2.bankAfter)}, so the overdraft is cleared.\n\n${cb.md}`,
    sol: 'Day by day: cash before banking, then the contra entry, then the new bank balance.',
    scheme: [[`15 February: withdrawal of ${rs(d1.item.amt)} and an overdraft of ${rs(-d1.bankAfter)}`, 1], [`16 February: deposit of ${rs(d2.item.amt)}`, 1], [`Bank balance after 16 February ${rs(d2.bankAfter)} favourable`, 1]],
  }));
}

// ================================================================ long answer, 5 marks
{
  const open = { cash: 12000, bank: 20000 };
  const plan = keepBalance(open, 12000, [
    { date: '3 Mar', items: [R('3 Mar', 'Sales A/c', { cash: 31000 }), R('3 Mar', 'Sudha Rao', { bank: 8000, disc: 200 }), P('3 Mar', 'Salaries A/c', { cash: 14600 }), P('3 Mar', 'Carriage A/c', { cash: 800 })] },
    { date: '4 Mar', items: [R('4 Mar', 'Anil Das', { cash: 6300, disc: 200 }), P('4 Mar', 'Rent A/c', { cash: 9000 }), P('4 Mar', 'Hari Chemicals', { bank: 49000, disc: 1000 })] },
  ]);
  const [d1, d2] = plan.steps;
  same(d1.item.amt, 15600, 'l5_fixed_days day 1 deposit');
  same(d1.bankAfter, 43600, 'l5_fixed_days day 1 bank');
  same(d2.item.amt, 2700, 'l5_fixed_days day 2 withdrawal');
  same(d2.bankAfter, -8100, 'l5_fixed_days day 2 bank');
  const cb = cashBook({ open, openDate: '3 Mar 2028', closeDate: '4 Mar', next: '5 Mar', items: plan.items });
  same(cb.cash, 12000, 'l5_fixed_days cash');
  QQ('l5_fixed_days', long({
    t: 4, d: 4, c: 'application', marks: 5,
    stem: `Mitra Medicals, an imagined firm, keeps ${rs(12000)} in hand at the close of each day, depositing any excess in the bank and withdrawing any shortfall. On 3 March 2028 it had ${rs(12000)} in cash and ${rs(20000)} at the bank. 3 Mar: cash sales ${rs(31000)}; received and deposited a cheque of ${rs(8000)} from Sudha Rao, after allowing discount of ${rs(200)}; paid salaries ${rs(14600)} and carriage ${rs(800)} in cash. 4 Mar: received ${rs(6300)} in cash from Anil Das, after allowing discount of ${rs(200)}; paid rent ${rs(9000)} in cash; paid Hari Chemicals ${rs(49000)} by cheque, after discount of ${rs(1000)}. Prepare the triple column cash book for the two days, including the contra entry at the close of each day, and balance it.`,
    model: `Day 1: cash before banking ${rs(d1.cashBefore)}, deposit ${rs(d1.item.amt)}. Day 2: cash before banking ${rs(d2.cashBefore)}, withdrawal ${rs(d2.item.amt)}, because the bank balance of ${rs(d1.bankAfter)} less the cheque for ${rs(49000)} was already an overdraft before the withdrawal.\n\n${cb.md}\n\nClosing cash ${rs(cb.cash)}; the bank column shows an overdraft of ${rs(-cb.bank)}.`,
    sol: 'Close each day with a contra entry before moving to the next; the second day ends in an overdraft.',
    scheme: [['Day 1 receipts and payments with discount allowed in the correct columns', 1], [`Day 1 contra entry: deposit of ${rs(d1.item.amt)}`, 1], ['Day 2 receipts, payments and discount columns', 1], [`Day 2 contra entry: withdrawal of ${rs(d2.item.amt)}`, 1], [`Closing balances: cash ${rs(cb.cash)}, overdraft ${rs(-cb.bank)} on the debit side, equal totals`, 1]],
  }));
}
{
  const open = { cash: 15000, bank: 6000 };
  const plan = keepBalance(open, 15000, [
    { date: '6 Apr', items: [R('6 Apr', 'Sales A/c', { cash: 18000 }), P('6 Apr', 'Wages A/c', { cash: 4500 }), P('6 Apr', 'Tyre Mart', { bank: 9500, disc: 500 })] },
    { date: '7 Apr', items: [R('7 Apr', 'Sales A/c', { cash: 6500 }), P('7 Apr', 'Repairs A/c', { cash: 19000 }), R('7 Apr', 'Gopi Naik', { bank: 12000, disc: 300 })] },
    { date: '8 Apr', items: [R('8 Apr', 'Sales A/c', { cash: 4000 }), P('8 Apr', 'Rao Motors', { bank: 30000, disc: 1000 })] },
  ]);
  const [d1, d2, d3] = plan.steps;
  same(d1.item.amt, 13500, 'l5_fixed_od day 1 deposit');
  same(d2.item.amt, 12500, 'l5_fixed_od day 2 withdrawal');
  same(d3.cashBefore, 19000, 'l5_fixed_od day 3 cash before');
  same(d3.item.amt, 4000, 'l5_fixed_od day 3 deposit');
  const cb = cashBook({ open, openDate: '6 Apr 2028', closeDate: '8 Apr', next: '9 Apr', items: plan.items });
  same(cb.bank, -16500, 'l5_fixed_od bank');
  same(cb.discAllowed, 300, 'l5_fixed_od discount allowed');
  same(cb.discReceived, 1500, 'l5_fixed_od discount received');
  const dp = discountPosting(cb);
  QQ('l5_fixed_od', long({
    t: 4, d: 5, c: 'application', marks: 5,
    stem: `Vihaan Vehicles, an imagined firm, keeps ${rs(15000)} in hand at the close of each day and banks the excess or withdraws the shortfall, using its overdraft facility when needed. On 6 April 2028 it had ${rs(15000)} in cash and ${rs(6000)} at the bank. 6 Apr: cash sales ${rs(18000)}; wages paid ${rs(4500)} in cash; paid Tyre Mart ${rs(9500)} by cheque, after discount of ${rs(500)}. 7 Apr: cash sales ${rs(6500)}; repairs paid ${rs(19000)} in cash; received and deposited a cheque of ${rs(12000)} from Gopi Naik, after allowing discount of ${rs(300)}. 8 Apr: cash sales ${rs(4000)}; paid Rao Motors ${rs(30000)} by cheque, after discount of ${rs(1000)}. Prepare the triple column cash book for the three days with the daily contra entries, balance it, and show the posting of the discount columns.`,
    model: `Contra entries: 6 Apr deposit ${rs(d1.item.amt)}; 7 Apr withdrawal ${rs(d2.item.amt)}; 8 Apr deposit ${rs(d3.item.amt)}.\n\n${cb.md}\n\nThe bank column ends with an overdraft of ${rs(-cb.bank)}, carried down on the debit side.\n\n${dp.md}`,
    sol: 'Three daily settlements; the cheque to Rao Motors on the last day takes the bank column into an overdraft; the discount columns are only totalled.',
    scheme: [['Entries of the three days in the correct columns and sides', 1], [`Three contra entries: ${rs(d1.item.amt)} deposited, ${rs(d2.item.amt)} withdrawn, ${rs(d3.item.amt)} deposited`, 1], [`Closing cash ${rs(cb.cash)} and overdraft ${rs(-cb.bank)} carried down on the debit side`, 1], ['Equal totals in the cash and bank columns, discount columns totalled', 1], [`Discount Allowed A/c debited ${rs(cb.discAllowed)}, Discount Received A/c credited ${rs(cb.discReceived)}`, 1]],
  }));
}
