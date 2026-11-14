// Shared computed figures for ISC 11 Accounts ch08 (Bank Reconciliation Statement). Every statement, extract and
// balance in a slide, note or item comes from recon.mjs and acc.mjs and is asserted: starting from one book and
// applying the adjustments reaches the other book's balance exactly (in both directions), the two-column form
// reaches the same figure, and the amended cash book balance reconciles. Imagined firms only; no GST.
import { same, check, sum, inr, rs, mdTable, I, errCB, errBank, L, statement, twoColumn, amended, twoBooks, cbExtract, pbExtract, matching, ruleGrid, ruleTable, rule, CAUSES, ledger } from './recon.mjs';

export { same, check, sum, inr, rs, mdTable, I, errCB, errBank, L, statement, twoColumn, amended, twoBooks, cbExtract, pbExtract, matching, ruleGrid, ruleTable, rule, CAUSES, ledger };
export { words, rupees } from './acc.mjs';

/**
 * A scenario with one given balance (signed favourable; negative = overdraft). Give `cb` or `pb`; the other is
 * derived from the items. Both statements are built, so a mistake in either direction is caught.
 * fromCB: cash book to pass book. fromPB: pass book to cash book. am: amended cash book then the statement.
 */
export function scn({ firm, date, cb, pb, items }) {
  const gaps = sum(items.map((i) => i.gap));
  check((cb === undefined) !== (pb === undefined), 'give exactly one of cb / pb');
  const CB = cb ?? pb - gaps;
  const PB = pb ?? cb + gaps;
  same(PB - CB, gaps, 'scenario: pass book = cash book + gaps');
  const fromCB = statement({ from: 'cash book', bal: CB, items, expected: PB });
  const fromPB = statement({ from: 'pass book', bal: PB, items, expected: CB });
  same(fromCB.result, PB, 'fromCB reaches the pass book');
  same(fromPB.result, CB, 'fromPB reaches the cash book');
  const hasFix = items.some((i) => i.fix);
  let am = null;
  let amStmt = null;
  if (hasFix) {
    am = amended({ bal: CB, items });
    amStmt = statement({ from: 'cash book', bal: am.newBal, items: am.rest, expected: PB });
    same(amStmt.result, PB, 'after the amended cash book the statement reaches the pass book');
    const am2 = statement({ from: 'pass book', bal: PB, items: am.rest, expected: am.newBal });
    same(am2.result, am.newBal, 'the pass book start reaches the amended cash book balance');
  }
  return { firm, date, cb: CB, pb: PB, items, fromCB, fromPB, twoCB: twoColumn(fromCB), twoPB: twoColumn(fromPB), am, amStmt };
}

// ---------------------------------------------------------------- Part 1: worked examples
// Vasudha Pottery Works: cash book favourable, six items (both timing and bank items).
export const TAR = scn({
  firm: 'Vasudha Pottery Works', date: '31 March 2028', cb: 48600,
  items: [
    L(I('issued', 12500), 'Cheques issued but not yet presented for payment'),
    L(I('deposited', 7800), 'Cheques deposited but not yet credited by the bank'),
    L(I('charges', 450), 'Bank charges debited by the bank'),
    L(I('intallowed', 1260), 'Interest credited by the bank'),
    L(I('directdep', 6000), 'Direct deposit by a customer, Pranav Iyer'),
    L(I('dishonour', 3200), 'Cheque of Zubair Stores returned unpaid'),
  ],
});
same(TAR.pb, 56910, 'Tarini pass book balance');
// Jasmeet Dye House: pass book OVERDRAFT given; find the cash book.
export const KES = scn({
  firm: 'Jasmeet Dye House', date: '30 June 2028', pb: -26400,
  items: [
    L(I('issued', 9600), 'Cheques issued but not yet presented'),
    L(I('deposited', 14500), 'Cheques deposited but not yet credited'),
    L(I('odint', 1150), 'Interest on overdraft debited by the bank'),
    L(I('directpay', 2400), 'Insurance premium paid by the bank on standing instruction'),
  ],
});
same(KES.cb, -17950, 'Kesari cash book overdraft');
// Hemant Sports Goods: pass book favourable given; find the cash book.
export const HEM = scn({
  firm: 'Hemant Sports Goods', date: '31 January 2028', pb: 63850,
  items: [
    L(I('issued', 18200), 'Cheques issued but not yet presented'),
    L(I('deposited', 11700), 'Cheques deposited but not yet credited'),
    L(I('collected', 4500), 'Rent collected by the bank on behalf of the firm'),
    L(I('charges', 380), 'Bank charges'),
  ],
});
// Ravine Textiles: cash book OVERDRAFT given.
export const RAV = scn({
  firm: 'Ravine Textiles', date: '31 October 2027', cb: -12300,
  items: [
    L(I('deposited', 8000), 'Cheque deposited but not yet credited'),
    L(I('issued', 5500), 'Cheques issued but not yet presented'),
    L(I('charges', 600), 'Bank charges debited by the bank'),
    L(I('odint', 900), 'Interest on overdraft debited by the bank'),
    L(I('directdep', 4200), 'Direct deposit by a customer'),
  ],
});

// Amended cash book (topic 4): cash book favourable with corrections to make first.
export const GUL = scn({
  firm: 'Ketan Printers', date: '31 December 2027', cb: 37200,
  items: [
    L(I('intallowed', 640), 'Interest credited by the bank', 'Interest credited by the bank'),
    L(I('charges', 275), 'Bank charges', 'Bank charges'),
    L(I('directdep', 8000), 'Direct deposit by Shaikh Traders', 'Direct deposit by Shaikh Traders'),
    L(I('dishonour', 4100), 'Dishonoured cheque of Sethi & Sons', 'Dishonoured cheque of Sethi & Sons'),
    L(I('directpay', 1800), 'Instalment paid by the bank on standing instruction', 'Standing instruction paid'),
    errCB('A cheque of ₹2,700 issued to a supplier was entered in the cash book as ₹2,070', 630, true, 'Correction: cheque of ₹2,700 entered as ₹2,070'),
    L(I('issued', 9400), 'Cheques issued but not yet presented'),
    L(I('deposited', 5500), 'Cheques deposited but not yet credited'),
  ],
});
// Brightline Hardware: pass book start, overdraft, amended cash book.
export const SUN = scn({
  firm: 'Brightline Hardware', date: '31 May 2028', pb: -21800,
  items: [
    L(I('odint', 1320), 'Interest on overdraft', 'Interest on overdraft'),
    L(I('charges', 210), 'Bank charges', 'Bank charges'),
    L(I('collected', 3000), 'Dividend collected by the bank', 'Dividend collected by the bank'),
    L(I('issued', 6500), 'Cheques issued but not yet presented'),
    L(I('deposited', 9700), 'Cheques deposited but not yet credited'),
  ],
});

// ---------------------------------------------------------------- Part 2: extracts
// Lotus Bindery, March 2028: both books favourable, items of the previous month clearing, one cheque of the previous
// month still unpresented.
export const LOT = twoBooks({
  cbOpen: 24800, pbOpen: 27500, openDate: '1 Mar', closeDate: '31 Mar',
  openItems: [L(I('issued', 6200), 'Cheque no. 3305 issued in February, not yet presented', 'Cheque no. 3305'), L(I('deposited', 3500), 'Cheque deposited in February, not yet credited', 'Cheque of February')],
  tx: [
    { cbText: 'To Anand & Sons', cbDate: '2 Mar', cb: 14000, pbText: 'By Clearing', pbDate: '3 Mar', pb: 14000 },
    { cbText: 'By Ghosh Paper (cheque 3311)', cbDate: '4 Mar', cb: -9500, pbText: 'To Cheque 3311', pbDate: '8 Mar', pb: -9500 },
    { pbText: 'To Cheque 3305', pbDate: '6 Mar', pb: -6200, clears: 0 },
    { pbText: 'By Clearing (February deposit)', pbDate: '7 Mar', pb: 3500, clears: 1 },
    { cbText: 'By Rent (cheque 3312)', cbDate: '15 Mar', cb: -4000, pbText: 'To Cheque 3312', pbDate: '25 Mar', pb: -4000 },
    { pbText: 'By Transfer: Shobha Stores', pbDate: '15 Mar', pb: 5600, item: L(I('directdep', 5600), 'Direct deposit by Shobha Stores', 'Direct deposit by Shobha Stores') },
    { pbText: 'To Insurance (standing instruction)', pbDate: '20 Mar', pb: -2250, item: L(I('directpay', 2250), 'Insurance premium paid by the bank', 'Insurance premium paid by the bank') },
    { cbText: 'To Pillai Brothers (cheque, 29 Mar)', cbDate: '29 Mar', cb: 8700, item: L(I('deposited', 8700), 'Cheque of Pillai Brothers deposited on 29 March, credited in April', 'Cheque of Pillai Brothers') },
    { cbText: 'By Venkat Binders (cheque 3314)', cbDate: '18 Mar', cb: -7400, item: L(I('issued', 7400), 'Cheque 3314 issued on 18 March, not yet presented', 'Cheque 3314') },
    { pbText: 'To Bank charges', pbDate: '31 Mar', pb: -340, item: L(I('charges', 340), 'Bank charges', 'Bank charges') },
    { pbText: 'By Interest', pbDate: '31 Mar', pb: 720, item: L(I('intallowed', 720), 'Interest credited by the bank', 'Interest credited by the bank') },
  ],
});
// Mirage Auto Parts, June 2028: both books overdrawn.
export const MIR = twoBooks({
  cbOpen: -18000, pbOpen: -16200, openDate: '1 Jun', closeDate: '30 Jun',
  openItems: [L(I('issued', 1800), 'Cheque no. 2207 issued in May, not yet presented', 'Cheque no. 2207')],
  tx: [
    { cbText: 'To Bhasin Motors', cbDate: '2 Jun', cb: 11000, pbText: 'By Clearing', pbDate: '4 Jun', pb: 11000 },
    { pbText: 'To Cheque 2207', pbDate: '5 Jun', pb: -1800, clears: 0 },
    { cbText: 'By Salaries (cheque 2208)', cbDate: '8 Jun', cb: -9600, pbText: 'To Cheque 2208', pbDate: '9 Jun', pb: -9600 },
    { cbText: 'By Spares (cheque 2210)', cbDate: '12 Jun', cb: -6800, pbText: 'To Cheque 2210', pbDate: '14 Jun', pb: -6800 },
    { pbText: 'By Transfer: Nadkarni', pbDate: '18 Jun', pb: 3000, item: L(I('directdep', 3000), 'Direct deposit by Nadkarni', 'Direct deposit by Nadkarni') },
    { cbText: 'By Oberoi Tools (cheque 2214)', cbDate: '24 Jun', cb: -5300, item: L(I('issued', 5300), 'Cheque 2214 issued on 24 June, not yet presented', 'Cheque 2214') },
    { cbText: 'To Rane Garage (cheque)', cbDate: '28 Jun', cb: 4500, item: L(I('deposited', 4500), 'Cheque of Rane Garage deposited on 28 June, not yet credited', 'Cheque of Rane Garage') },
    { pbText: 'To Interest on overdraft', pbDate: '30 Jun', pb: -890, item: L(I('odint', 890), 'Interest on overdraft', 'Interest on overdraft') },
    { pbText: 'To Bank charges', pbDate: '30 Jun', pb: -260, item: L(I('charges', 260), 'Bank charges', 'Bank charges') },
  ],
});
same(LOT.cbClose, 24800 + 14000 - 9500 - 4000 + 8700 - 7400, 'Lotus cash book balance');
same(MIR.cbClose, -24200, 'Mirage cash book balance');
same(MIR.pbClose, -21550, 'Mirage pass book balance');

// Saffron Linens, July 2028: a cheque of the previous month is still unpresented at the month end.
export const SAF = twoBooks({
  cbOpen: 18000, pbOpen: 20300, openDate: '1 Jul', closeDate: '31 Jul',
  openItems: [L(I('issued', 2300), 'Cheque 6120 issued in June, still not presented', 'Cheque 6120')],
  tx: [
    { cbText: 'To Tandon Retail', cbDate: '6 Jul', cb: 9000, pbText: 'By Clearing', pbDate: '8 Jul', pb: 9000 },
    { cbText: 'By Dye house (cheque 6124)', cbDate: '14 Jul', cb: -5500, pbText: 'To Cheque 6124', pbDate: '17 Jul', pb: -5500 },
    { cbText: 'By Courier (cheque 6127)', cbDate: '29 Jul', cb: -1400, item: L(I('issued', 1400), 'Cheque 6127 issued on 29 July, not yet presented', 'Cheque 6127') },
    { pbText: 'To Bank charges', pbDate: '31 Jul', pb: -180, item: L(I('charges', 180), 'Bank charges', 'Bank charges') },
  ],
});
same(SAF.cbClose, 20100, 'Saffron cash book');
same(SAF.pbClose, 23620, 'Saffron pass book');
same(SAF.stillOpen.length, 1, 'Saffron: the cheque of June stays open');

/** The reconciliation of two extracts: both directions and the two-book totals. */
export function recon(bk) {
  const fromCB = statement({ from: 'cash book', bal: bk.cbClose, items: bk.items, expected: bk.pbClose });
  const fromPB = statement({ from: 'pass book', bal: bk.pbClose, items: bk.items, expected: bk.cbClose });
  const hasFix = bk.items.some((i) => i.fix);
  const am = hasFix ? amended({ bal: bk.cbClose, items: bk.items }) : null;
  const amSt = am ? statement({ from: 'cash book', bal: am.newBal, items: am.rest, expected: bk.pbClose }) : null;
  return { fromCB, fromPB, am, amSt, cbx: cbExtract(bk), pbx: pbExtract(bk), match: matching(bk) };
}
export const LOTR = recon(LOT);
export const MIRR = recon(MIR);
export const SAFR = recon(SAF);
