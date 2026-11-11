// Shared computed figures for ISC 11 Accounts ch06 (petty cash book and other special purpose books). Every amount a
// slide, note or item states for the worked cases comes from here, computed with books.mjs and asserted. Imagined firms
// only. No GST anywhere (syllabus note). The cash book is Chapter 5 and is only mentioned.
import { same, check, sum, inr, rs, mdTable, journal, pettyCash, dayBook, Ledger, acct, route, T, V, E } from './books.mjs';

export { same, check, sum, inr, rs, mdTable, journal, pettyCash, dayBook, Ledger, acct, route, T, V, E };

// ---------------------------------------------------------------- Tanjore Brass Emporium: weekly petty cash, 3 to 8 January 2028
export const PC1_HEADS = ['Postage', 'Stationery', 'Conveyance', 'Refreshments', 'Sundries'];
export const PC1 = pettyCash({
  imprest: 2000,
  open: 150,
  heads: PC1_HEADS,
  startDate: '3 Jan',
  closeDate: '8 Jan',
  nextDate: '9 Jan',
  vouchers: [
    V('3 Jan', '1', 'Stamps and envelopes', { Postage: 140 }),
    V('3 Jan', '2', 'Auto fare to the bank', { Conveyance: 85 }),
    V('4 Jan', '3', 'Tea for visitors', { Refreshments: 110 }),
    V('5 Jan', '4', 'Registers and pens', { Stationery: 460 }),
    V('5 Jan', '5', 'Courier of samples', { Postage: 210 }),
    V('6 Jan', '6', 'Fare and porter at the railway station', { Conveyance: 120, Sundries: 40 }),
    V('7 Jan', '7', 'Cleaning material', { Sundries: 165 }),
    V('8 Jan', '8', 'Tea for the auditors', { Refreshments: 135 }),
  ],
});
same(PC1.spent, 1465, 'Tanjore total payments');
same(PC1.closing, 535, 'Tanjore balance c/d');
same(PC1.received, 1850, 'Tanjore cash received');
same(PC1.byHead.Postage, 350, 'Tanjore postage');
same(PC1.byHead.Stationery, 460, 'Tanjore stationery');
same(PC1.byHead.Conveyance, 205, 'Tanjore conveyance');
same(PC1.byHead.Refreshments, 245, 'Tanjore refreshments');
same(PC1.byHead.Sundries, 205, 'Tanjore sundries');

// ---------------------------------------------------------------- Bargarh Handloom House: monthly petty cash, February 2028
export const PC2_HEADS = ['Postage', 'Printing', 'Travelling', 'Repairs', 'Sundries'];
export const PC2 = pettyCash({
  imprest: 5000,
  open: 380,
  heads: PC2_HEADS,
  startDate: '1 Feb',
  closeDate: '29 Feb',
  nextDate: '1 Mar',
  vouchers: [
    V('2 Feb', '11', 'Registered post to buyers', { Postage: 260 }),
    V('5 Feb', '12', 'Printing of price lists', { Printing: 750 }),
    V('9 Feb', '13', 'Bus and auto fares of the salesman', { Travelling: 640 }),
    V('12 Feb', '14', 'Repair of the weighing scale', { Repairs: 420 }),
    V('16 Feb', '15', 'Printing of bill books and stamps', { Printing: 480, Postage: 120 }),
    V('20 Feb', '16', 'Train fare to the exhibition', { Travelling: 910 }),
    V('24 Feb', '17', 'Repair of the shop door lock', { Repairs: 310 }),
    V('27 Feb', '18', 'Cleaning and drinking water', { Sundries: 195 }),
  ],
});
same(PC2.spent, 4085, 'Bargarh total payments');
same(PC2.closing, 915, 'Bargarh balance c/d');
same(PC2.received, 4620, 'Bargarh cash received');

// ---------------------------------------------------------------- Karaikudi Cycle Mart, March 2028: purchases and purchases return books
export const KC_PB = dayBook({
  kind: 'purchases',
  entries: [
    T('3 Mar', '312', 'Vinayak Cycle Co.', 48000, 10),
    T('9 Mar', '318', 'Gopal Tyres', 25000, 20),
    T('16 Mar', '325', 'Vinayak Cycle Co.', 36000, 5),
    T('22 Mar', '331', 'Kamal Bell Works', 6500, 0),
    T('28 Mar', '340', 'Gopal Tyres', 12000, 10),
  ],
});
same(KC_PB.totals.list, 127500, 'Karaikudi purchases list');
same(KC_PB.totals.td, 12800, 'Karaikudi trade discount');
same(KC_PB.totals.net, 114700, 'Karaikudi purchases net');
export const KC_PRB = dayBook({
  kind: 'purchaseReturns',
  entries: [
    T('12 Mar', '1', 'Vinayak Cycle Co.', 4000, 10),
    T('19 Mar', '2', 'Gopal Tyres', 2500, 20),
    T('27 Mar', '3', 'Vinayak Cycle Co.', 3000, 5),
  ],
});
same(KC_PRB.totals.net, 8450, 'Karaikudi purchases return net');
export const KC_L = new Ledger().open('Vinayak Cycle Co. A/c', 'cr', 12000, '1 Mar').fromBook(KC_PB, '31 Mar').fromBook(KC_PRB, '31 Mar');
export const KC_VIN = KC_L.show('Vinayak Cycle Co. A/c', { close: '31 Mar', next: '1 Apr' });
same(KC_VIN.balance, -82950, 'Vinayak Cycle Co. credit balance');
export const KC_GOP = KC_L.show('Gopal Tyres A/c', { close: '31 Mar', next: '1 Apr' });
same(KC_GOP.balance, -(20000 + 10800 - 2000), 'Gopal Tyres credit balance');
export const KC_PUR = KC_L.show('Purchases A/c', { balanced: false });
export const KC_PRET = KC_L.show('Purchases Return A/c', { balanced: false });
same(KC_PUR.balance, 114700, 'Purchases A/c posted total');
same(KC_PRET.balance, -8450, 'Purchases Return A/c posted total');
export const KC_NET_PURCHASES = KC_PB.totals.net - KC_PRB.totals.net;
same(KC_NET_PURCHASES, 106250, 'Karaikudi net purchases');

// the same firm after posting the purchases book only (before the returns)
export const KC_L1 = new Ledger().open('Vinayak Cycle Co. A/c', 'cr', 12000, '1 Mar').fromBook(KC_PB, '31 Mar');
export const KC_VIN1 = KC_L1.show('Vinayak Cycle Co. A/c', { balanced: false });
export const KC_PUR1 = KC_L1.show('Purchases A/c', { balanced: false });
same(KC_VIN1.cr, 12000 + 43200 + 34200, 'Vinayak credits before returns');

// ---------------------------------------------------------------- Haldia Fabric House, April 2028: columnar purchases book
export const HF_COLS = ['Cotton', 'Silk', 'Woollen'];
export const HF_PB = dayBook({
  kind: 'purchases',
  columns: HF_COLS,
  entries: [
    T('4 Apr', '1021', 'Ashoka Mills', { Cotton: 60000, Silk: 20000 }, 10),
    T('11 Apr', '1036', 'Rupsi Silks', { Silk: 50000, Woollen: 30000 }, 20),
    T('19 Apr', '1049', 'Ashoka Mills', { Cotton: 40000, Woollen: 10000 }, 5),
    T('26 Apr', '1058', 'Kanpur Woollens', { Woollen: 50000 }, 10),
  ],
});
same(HF_PB.totals.byCol[0], 92000, 'Haldia cotton');
same(HF_PB.totals.byCol[1], 58000, 'Haldia silk');
same(HF_PB.totals.byCol[2], 78500, 'Haldia woollen');
same(HF_PB.totals.net, 228500, 'Haldia purchases net');
export const HF_L = new Ledger().fromBook(HF_PB, '30 Apr');
export const HF_ASH = HF_L.show('Ashoka Mills A/c', { balanced: false });
same(HF_ASH.cr, 72000 + 47500, 'Ashoka Mills credits');
export const HF_COT = HF_L.show('Cotton Purchases A/c', { balanced: false });
same(HF_COT.dr, 92000, 'Cotton Purchases A/c debit');

// ---------------------------------------------------------------- Shillong Hardware Works, May 2028: sales and sales return books
export const SH_SB = dayBook({
  kind: 'sales',
  entries: [
    T('2 May', 'S71', 'Jorhat Builders', 30000, 10),
    T('8 May', 'S72', 'Mawlai Contractors', 18000, 0),
    T('15 May', 'S73', 'Jorhat Builders', 42000, 15),
    T('23 May', 'S74', 'Dhubri Fittings', 9500, 0),
    T('30 May', 'S75', 'Mawlai Contractors', 24000, 5),
  ],
});
same(SH_SB.totals.list, 123500, 'Shillong sales list');
same(SH_SB.totals.td, 10500, 'Shillong trade discount');
same(SH_SB.totals.net, 113000, 'Shillong sales net');
export const SH_SRB = dayBook({
  kind: 'salesReturns',
  entries: [
    T('11 May', '1', 'Jorhat Builders', 3000, 10),
    T('26 May', '2', 'Mawlai Contractors', 2000, 0),
    T('31 May', '3', 'Jorhat Builders', 4000, 15),
  ],
});
same(SH_SRB.totals.net, 8100, 'Shillong sales return net');
export const SH_L = new Ledger().open('Jorhat Builders A/c', 'dr', 15000, '1 May').fromBook(SH_SB, '31 May').fromBook(SH_SRB, '31 May');
export const SH_JOR = SH_L.show('Jorhat Builders A/c', { close: '31 May', next: '1 Jun' });
same(SH_JOR.balance, 15000 + 27000 + 35700 - 2700 - 3400, 'Jorhat Builders debit balance');
export const SH_SALES = SH_L.show('Sales A/c', { balanced: false });
export const SH_SRET = SH_L.show('Sales Return A/c', { balanced: false });
same(SH_SALES.cr, 113000, 'Sales A/c posted total');
same(SH_SRET.dr, 8100, 'Sales Return A/c posted total');
export const SH_NET_SALES = SH_SB.totals.net - SH_SRB.totals.net;
same(SH_NET_SALES, 104900, 'Shillong net sales');

// the same firm after posting the sales book only
export const SH_L1 = new Ledger().open('Jorhat Builders A/c', 'dr', 15000, '1 May').fromBook(SH_SB, '31 May');
export const SH_JOR1 = SH_L1.show('Jorhat Builders A/c', { balanced: false });
export const SH_SALES1 = SH_L1.show('Sales A/c', { balanced: false });
same(SH_JOR1.dr, 15000 + 27000 + 35700, 'Jorhat debits before returns');

// ---------------------------------------------------------------- Kurnool Spice Mills, June 2028: columnar sales book
export const KS_COLS = ['Chilli', 'Turmeric', 'Pepper'];
export const KS_SB = dayBook({
  kind: 'sales',
  columns: KS_COLS,
  entries: [
    T('3 Jun', '801', 'Anantapur Provision Store', { Chilli: 40000, Pepper: 25000 }, 10),
    T('10 Jun', '802', 'Nellore Traders', { Turmeric: 36000, Chilli: 20000 }, 5),
    T('18 Jun', '803', 'Anantapur Provision Store', { Turmeric: 30000 }, 0),
    T('27 Jun', '804', 'Ongole Wholesale', { Chilli: 15000, Turmeric: 12000, Pepper: 18000 }, 20),
  ],
});
same(KS_SB.totals.byCol[0], 36000 + 19000 + 12000, 'Kurnool chilli');
same(KS_SB.totals.byCol[1], 34200 + 30000 + 9600, 'Kurnool turmeric');
same(KS_SB.totals.byCol[2], 22500 + 14400, 'Kurnool pepper');
same(KS_SB.totals.net, 67000 + 73800 + 36900, 'Kurnool sales net');

// ---------------------------------------------------------------- Silchar Furnishings, January 2028: a month of mixed transactions
export const SF_TX = [
  { kind: 'purchase', date: '1 Jan', no: '14', party: 'Ravi Timbers', goods: 60000, td: 10, text: 'Bought goods on credit from Ravi Timbers, list price ₹60,000, trade discount 10%' },
  { kind: 'cash', date: '3 Jan', text: 'Sold goods for cash ₹20,000' },
  { kind: 'sale', date: '5 Jan', no: 'S1', party: 'Meena Interiors', goods: 40000, td: 5, text: 'Sold goods on credit to Meena Interiors, list price ₹40,000, trade discount 5%' },
  { kind: 'jp', date: '8 Jan', dr: [['Office Equipment A/c', 45000]], cr: [['Digital Mart A/c', 45000]], note: 'Being office computers bought on credit from Digital Mart', text: 'Bought office computers on credit from Digital Mart for ₹45,000' },
  { kind: 'preturn', date: '11 Jan', no: 'DN1', party: 'Ravi Timbers', goods: 5000, td: 10, text: 'Returned goods to Ravi Timbers, list price ₹5,000, trade discount 10%' },
  { kind: 'sreturn', date: '14 Jan', no: 'CN1', party: 'Meena Interiors', goods: 4000, td: 5, text: 'Meena Interiors returned goods, list price ₹4,000, trade discount 5%' },
  { kind: 'cash', date: '17 Jan', text: 'Bought goods for cash ₹15,000' },
  { kind: 'jp', date: '20 Jan', dr: [['Drawings A/c', 6000]], cr: [['Purchases A/c', 6000]], note: 'Being goods taken by the proprietor for personal use', text: 'Proprietor took goods of ₹6,000 for his house' },
  { kind: 'jp', date: '24 Jan', dr: [['Bad Debts A/c', 2500]], cr: [['Deepak Fabricators A/c', 2500]], note: 'Being the amount due from Deepak Fabricators written off as bad debt', text: 'Wrote off ₹2,500 due from Deepak Fabricators as a bad debt' },
  { kind: 'sale', date: '27 Jan', no: 'S2', party: 'Tarun Decor', goods: 25000, td: 0, text: 'Sold goods on credit to Tarun Decor for ₹25,000, no trade discount' },
  { kind: 'jp', date: '29 Jan', dr: [['Ravi Timbers A/c', 8000]], cr: [['Furniture A/c', 8000]], note: 'Being old furniture sold on credit to Ravi Timbers', text: 'Sold old furniture on credit to Ravi Timbers for ₹8,000' },
  { kind: 'purchase', date: '30 Jan', no: '21', party: 'Ravi Timbers', goods: 30000, td: 10, text: 'Bought goods on credit from Ravi Timbers, list price ₹30,000, trade discount 10%' },
];
export const SF = route(SF_TX);
same(SF.books.purchases.totals.net, 81000, 'Silchar purchases');
same(SF.books.sales.totals.net, 38000 - 0 + 25000 - 0, 'Silchar sales');
same(SF.books.purchaseReturns.totals.net, 4500, 'Silchar purchases return');
same(SF.books.salesReturns.totals.net, 3800, 'Silchar sales return');
check(SF.jp.length === 4 && SF.cash.length === 2, 'Silchar jp and cash counts');
export const SF_L = new Ledger()
  .fromBook(SF.books.purchases, '31 Jan')
  .fromBook(SF.books.sales, '31 Jan')
  .fromBook(SF.books.purchaseReturns, '31 Jan')
  .fromBook(SF.books.salesReturns, '31 Jan')
  .fromJournal(SF.jp);
export const SF_RAVI = SF_L.show('Ravi Timbers A/c', { close: '31 Jan', next: '1 Feb' });
same(SF_RAVI.balance, 8000 - 54000 + 4500 - 27000, 'Ravi Timbers balance');
export const SF_PUR = SF_L.show('Purchases A/c', { balanced: false });
same(SF_PUR.dr, 81000, 'Silchar Purchases A/c debit');
same(SF_PUR.cr, 6000, 'Silchar Purchases A/c credit (drawings)');

// ---------------------------------------------------------------- Tezpur Paper Mart: journal proper entries
export const TP_OPEN = {
  date: '1 Apr 2028',
  dr: [['Cash A/c', 22000], ['Bank A/c', 48000], ['Stock A/c', 90000], ['Mohan Sen A/c', 15000], ['Pradeep Stores A/c', 20000], ['Furniture A/c', 60000], ['Machinery A/c', 120000]],
  cr: [['Orient Engineers A/c', 40000], ['Bank Loan A/c', 70000], ['Capital A/c', 265000]],
  note: 'Being the assets, liabilities and capital of the firm brought into the new books',
};
same(sum(TP_OPEN.dr.map(([, a]) => a)) - 40000 - 70000, 265000, 'Tezpur capital');
export const TP_JP = {
  asset: E('6 Jun 2028', [['Machinery A/c', 90000]], [['Orient Engineers A/c', 90000]], 'Being machinery bought on credit from Orient Engineers'),
  sold: E('14 Jun 2028', [['Pradeep Stores A/c', 24000]], [['Furniture A/c', 24000]], 'Being old furniture sold on credit to Pradeep Stores at book value'),
  bad: E('20 Jun 2028', [['Bad Debts A/c', 6500]], [['Mohan Sen A/c', 6500]], 'Being the amount due from Mohan Sen written off as he is insolvent'),
  draw: E('24 Jun 2028', [['Drawings A/c', 7200]], [['Purchases A/c', 7200]], 'Being goods taken by the proprietor for personal use'),
  fire: E('27 Jun 2028', [['Loss by Fire A/c', 18000]], [['Purchases A/c', 18000]], 'Being goods destroyed by fire, no insurance claim'),
  sample: E('28 Jun 2028', [['Advertisement A/c', 2400]], [['Purchases A/c', 2400]], 'Being goods given away as free samples'),
  rect: E('30 Jun 2028', [['Furniture A/c', 12000]], [['Purchases A/c', 12000]], 'Being furniture bought for the office wrongly debited to Purchases A/c, now rectified'),
  close: E('31 Mar 2029', [['Trading A/c', 480000]], [['Purchases A/c', 480000]], 'Being Purchases A/c transferred to the Trading Account'),
  close2: E('31 Mar 2029', [['Sales A/c', 735000]], [['Trading A/c', 735000]], 'Being Sales A/c transferred to the Trading Account'),
};

