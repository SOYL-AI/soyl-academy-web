// Shared computed figures for CBSE 11 Accountancy ch06 (Trial Balance and Rectification of Errors): the worked cases of
// the decks (Kabir Traders, Naina Stores, Tara Footwear, Ritu Garments). Every amount comes from here or is computed
// beside the item with extra.mjs and asserted. Imagined firms only.
import * as X from './extra.mjs';
export * from './extra.mjs';
const { same, check, sum, inr, rs, scenario, correct, analyse, rectify, profitStatement, errorTable, totalsAndBalances, trialFromSigned } = X;

// ---------------------------------------------------------------- Kabir Traders: preparing a trial balance
export const KB_BAL = [
  ['Cash in hand', 12500], ['Cash at bank', 87500], ['Debtors', 64000], ['Opening stock', 70000], ['Furniture', 45000], ['Plant and machinery', 180000],
  ['Purchases', 320000], ['Wages', 36000], ['Rent', 24000], ['Carriage inwards', 8000], ['Drawings', 25000],
  ['Capital', 198000], ['Creditors', 78000], ['Sales', 490000], ['Discount received', 6000], ['Bank loan', 100000],
];
export const KB = correct(KB_BAL);
same(KB.tb.dr, 872000, 'Kabir Traders trial balance total');
export const KB_DR = KB.signed.filter(([, x]) => x > 0);
export const KB_CR = KB.signed.filter(([, x]) => x < 0);

// ---------------------------------------------------------------- Naina Stores: totals, balances, both
export const NS_ENTRIES = [
  { dr: [['Cash', 100000]], cr: [['Capital', 100000]], note: 'capital' },
  { dr: [['Purchases', 60000]], cr: [['Cash', 60000]], note: 'cash purchases' },
  { dr: [['Cash', 80000]], cr: [['Sales', 80000]], note: 'cash sales' },
  { dr: [['Purchases', 30000]], cr: [['Verma Traders', 30000]], note: 'credit purchases' },
  { dr: [['Verma Traders', 20000]], cr: [['Cash', 20000]], note: 'payment' },
  { dr: [['Wages', 10000]], cr: [['Cash', 10000]], note: 'wages' },
];
export const NS = totalsAndBalances(NS_ENTRIES);
same(NS.td, 300000, 'Naina Stores totals method');
same(NS.bd, 190000, 'Naina Stores balances method');

// ---------------------------------------------------------------- Tara Footwear: errors found before the trial balance
export const TF_BAL = [
  ['Cash', 21000], ['Cash at bank', 136000], ['Anand Pillai', 51000], ['Opening stock', 64000], ['Furniture', 40000], ['Computer', 25000], ['Machinery', 120000],
  ['Purchases', 380000], ['Salaries', 60000], ['Rent', 30000], ['Drawings', 24000],
  ['Capital', 258000], ['Joshi Leather', 72000], ['Sales', 540000], ['Commission received', 21000], ['Bank loan', 60000],
];
export const TF_ERR = [
  { text: `A cash sale of ${rs(7200)} was entered correctly in the cash book but posted to Sales A/c as ${rs(2700)}.`, type: 'commission', sub: 'wrong amount', label: 'Commission: wrong amount', short: 'sale posted short',
    should: [['Cash', 'dr', 7200], ['Sales', 'cr', 7200]], did: [['Cash', 'dr', 7200], ['Sales', 'cr', 2700]], tb: 'one', profit: -4500, note: `Being sales credited ${rs(4500)} short, now corrected` },
  { text: `Goods of ${rs(9000)} sold on credit to Anand Pillai were not entered in any book.`, type: 'omission', sub: 'complete', label: 'Omission: complete', short: 'credit sale omitted',
    should: [['Anand Pillai', 'dr', 9000], ['Sales', 'cr', 9000]], did: [], tb: 'two', profit: -9000, note: `Being credit sale of ${rs(9000)} to Anand Pillai omitted, now recorded` },
  { text: `A computer bought for ${rs(25000)} by cheque was debited to Purchases A/c.`, type: 'principle', label: 'Principle: capital as revenue', short: 'computer in purchases',
    should: [['Computer', 'dr', 25000], ['Cash at bank', 'cr', 25000]], did: [['Purchases', 'dr', 25000], ['Cash at bank', 'cr', 25000]], tb: 'two', profit: -25000, note: `Being computer wrongly debited to Purchases A/c, now corrected` },
  { text: `Commission of ${rs(5400)} received by cheque was credited to Rent A/c.`, type: 'commission', sub: 'wrong account', label: 'Commission: wrong account', short: 'commission in rent',
    should: [['Cash at bank', 'dr', 5400], ['Commission received', 'cr', 5400]], did: [['Cash at bank', 'dr', 5400], ['Rent', 'cr', 5400]], tb: 'two', profit: 0, note: `Being commission received credited to Rent A/c, now corrected` },
  { text: `The purchases book total of ${rs(64300)} for March was carried to Purchases A/c as ${rs(63400)}.`, type: 'commission', sub: 'wrong carrying forward', label: 'Commission: wrong amount carried', short: 'purchases carried short',
    should: [['Purchases', 'dr', 64300], ['Joshi Leather', 'cr', 64300]], did: [['Purchases', 'dr', 63400], ['Joshi Leather', 'cr', 64300]], tb: 'one', profit: 900, note: `Being purchases debited ${rs(900)} short, now corrected` },
];
export const TF = scenario({ balances: TF_BAL, errors: TF_ERR, mode: 'before' });
same(TF.ok.dr, 951000, 'Tara Footwear correct total');
same(TF.net, 3600, 'Tara Footwear books differ by');
same(TF.booksTb.dr, 935700, 'Tara Footwear books debit total');
same(TF.booksTb.cr, 932100, 'Tara Footwear books credit total');
same(TF.profit, -37600, 'Tara Footwear profit effect');

// ---------------------------------------------------------------- Ritu Garments: errors found after the trial balance
export const RG_BAL = [
  ['Cash', 18000], ['Cash at bank', 142000], ['Kiran Rao', 54000], ['Sonal Dutt', 42000], ['Opening stock', 84000], ['Furniture', 60000], ['Machinery', 240000],
  ['Purchases', 420000], ['Wages', 48000], ['Rent', 36000], ['Salaries', 72000], ['Drawings', 30000],
  ['Capital', 374000], ['Mehta Cloth House', 66000], ['Bose Fabrics', 44000], ['Sales', 650000], ['Commission received', 12000], ['Bank loan', 100000],
];
export const RG_ERR = [
  { text: `The August sales book total of ${rs(60000)} was posted to Sales A/c as ${rs(64000)}; the debtors' accounts were posted correctly.`, type: 'commission', sub: 'wrong totalling', label: 'Commission: wrong totalling', short: 'sales book overcast',
    should: [['Sales', 'cr', 60000], ['Kiran Rao', 'dr', 60000]], did: [['Sales', 'cr', 64000], ['Kiran Rao', 'dr', 60000]], tb: 'one', profit: 4000, note: `Being sales book overcast by ${rs(4000)}, now corrected` },
  { text: `A credit purchase of ${rs(6000)} from Mehta Cloth House was credited to Mehta Cloth House but not debited to Purchases A/c.`, type: 'omission', sub: 'partial', label: 'Omission: partial', short: 'purchase not debited',
    should: [['Purchases', 'dr', 6000], ['Mehta Cloth House', 'cr', 6000]], did: [['Mehta Cloth House', 'cr', 6000]], tb: 'one', profit: 6000, note: `Being credit purchase not debited to Purchases A/c, now corrected` },
  { text: `Rent of ${rs(4500)} paid in cash was posted to Rent A/c as ${rs(5400)}.`, type: 'commission', sub: 'wrong amount', label: 'Commission: wrong amount', short: 'rent posted in excess',
    should: [['Rent', 'dr', 4500], ['Cash', 'cr', 4500]], did: [['Rent', 'dr', 5400], ['Cash', 'cr', 4500]], tb: 'one', profit: -900, note: `Being rent debited ${rs(900)} in excess, now corrected` },
  { text: `A credit sale of ${rs(8000)} to Kiran Rao was not recorded in any book.`, type: 'omission', sub: 'complete', label: 'Omission: complete', short: 'credit sale omitted',
    should: [['Kiran Rao', 'dr', 8000], ['Sales', 'cr', 8000]], did: [], tb: 'two', profit: -8000, note: `Being credit sale to Kiran Rao omitted, now recorded` },
  { text: `Furniture bought for ${rs(15000)} by cheque was debited to Purchases A/c.`, type: 'principle', label: 'Principle: capital as revenue', short: 'furniture in purchases',
    should: [['Furniture', 'dr', 15000], ['Cash at bank', 'cr', 15000]], did: [['Purchases', 'dr', 15000], ['Cash at bank', 'cr', 15000]], tb: 'two', profit: -15000, note: `Being furniture wrongly debited to Purchases A/c, now corrected` },
  { text: `Wages A/c was overcast by ${rs(2000)} and Salaries A/c was undercast by ${rs(2000)}.`, type: 'compensating', label: 'Compensating errors', short: 'wages and salaries',
    should: [], did: [['Wages', 'dr', 2000], ['Salaries', 'cr', 2000]], tb: 'two', profit: 0, note: `Being wages overcast and salaries undercast, now corrected` },
];
export const RG = scenario({ balances: RG_BAL, errors: RG_ERR, mode: 'after' });
same(RG.ok.dr, 1246000, 'Ritu Garments correct total');
same(RG.net, -9100, 'Ritu Garments books differ by');
same(RG.booksTb.dr, 1232900, 'Ritu books debit total');
same(RG.booksTb.cr, 1242000, 'Ritu books credit total');
same(RG.R.susp.ledger.total, 10000, 'Ritu suspense ledger total');
same(RG.profit, -13900, 'Ritu profit effect');
export const RG_NP = 112400;
export const RG_PS = profitStatement(RG.A, RG_NP);
same(RG_PS.corrected, 126300, 'Ritu corrected net profit');
export const RG_ET = errorTable(RG.A);

export { check, sum, inr, rs, scenario, correct, analyse, rectify, profitStatement, errorTable, trialFromSigned };
