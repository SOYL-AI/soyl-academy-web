// Build ISC 12 Accounts ch06 Issue and Forfeiture of Shares. Run from platform/:
//   npx tsx content/authored/economics-commerce/isc-12-accounts-ch06/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';
import { rs, inr, check, sum, rw, words, interest, journal, Books, issue, forfeit, reissue, vendorShares, businessPurchase, cashBookSplit, receiveArrears, payAdvanceInterest, shareNote, simpleNote, bsIII, ACC, INT } from './acc.mjs';

setUnit('isc-12-accounts-ch06', 'economics-commerce');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const E = 'Equity Share Capital A/c';
const PL = 'Statement of Profit and Loss';
const eq = (a, b, what) => check(JSON.stringify(a) === JSON.stringify(b), `deck figure ${what}: got ${JSON.stringify(a)}, expected ${JSON.stringify(b)}`);
const inst = (...xs) => xs.map(([name, cap, prem = 0]) => ({ name, cap, prem }));

// ---------------------------------------------------------------- deck figures (computed, never typed)
// WE1 Yaman Bicycle Rims Ltd, Phagwara (imagined): issue at par, journal and cash book.
const YB = new Books();
const YBi = issue(YB, { fv: 10, n: 60000, inst: inst(['Application', 3], ['Allotment', 4], ['First and Final Call', 3]) });
const YBj = YB.journal();
const YBcb = cashBookSplit(YB.entries);
eq([YB.bal(ACC.bank), -YB.bal(E), YBcb.receipts, YBcb.jp.entries.length], [600000, 600000, 600000, 3], 'YB');

// WE2 Bageshri Glass Bangles Ltd, Shikohabad (imagined): issue at ₹13, premium ₹3 with allotment.
const BG = new Books();
const BGi = issue(BG, { fv: 10, n: 45000, inst: inst(['Application', 3], ['Allotment', 3, 3], ['First and Final Call', 4]) });
const BGcap = BG.ledgerOf(E);
eq([-BG.bal(E), -BG.bal(ACC.sp), BG.bal(ACC.bank)], [450000, 135000, 585000], 'BG');

// WE3 Malkauns Cotton Quilts Ltd, Kaithun (imagined): over-subscription, rejection and pro-rata.
const MQ = new Books();
const MQi = issue(MQ, { fv: 10, n: 50000, inst: inst(['Application', 4], ['Allotment', 2, 2], ['First and Final Call', 4]), groups: [{ applied: 10000, allotted: 0 }, { applied: 75000, allotted: 50000 }], made: 2 });
const MQg = MQi.groups[1];
const MQcap = 50000 * 4;
const MQallotIn = 50000 * 4 - MQi.adjT;
eq([MQi.applied * 4, MQi.refT, MQi.adjT, MQcap, MQallotIn, MQ.bal(ACC.bank)], [340000, 40000, 100000, 200000, 100000, 400000], 'MQ');

// WE4 Darbari Leaf Plates Ltd (imagined) buys the business of Baldev Areca Crafts (imagined firm).
const DL = { assets: [['Machinery A/c', 280000], ['Stock A/c', 90000], ['Debtors A/c', 70000]], liabilities: [['Creditors A/c', 40000]], pc: 450000, cheque: 30000 };
const DLb = businessPurchase(DL);
const DLs = vendorShares(DL.pc - DL.cheque, 10, 12);
const DLv = 'Baldev Areca Crafts A/c';
const DLj = journal([
  { dr: [['Business Purchase A/c', DL.pc]], cr: [[DLv, DL.pc]], nar: 'business of Baldev Areca Crafts purchased' },
  { dr: [...DL.assets, ['Goodwill A/c', DLb.gw]], cr: [...DL.liabilities, ['Business Purchase A/c', DL.pc]], nar: 'assets and liabilities taken over; goodwill as the balancing figure' },
  { dr: [[DLv, DL.pc]], cr: [[ACC.bank, DL.cheque], [E, DLs.cap], [ACC.sp, DLs.prem]], nar: `vendor paid by cheque and by ${inr(DLs.n)} equity shares of ₹10 at ₹12` },
]);
eq([DLb.net, DLb.gw, DLs.n, DLs.cap, DLs.prem], [400000, 50000, 35000, 350000, 70000], 'DL');

// WE5 Bhupali Precision Tools Ltd (imagined): promoters and underwriters.
const BP = { prom: 4000, pub: 80000, price: 15, artRate: 4 };
const BPrate = Math.min(5, BP.artRate);
const BPc = (BP.pub * BP.price * BPrate) / 100;
const BPu = vendorShares(BPc, 10, BP.price);
const BPj = journal([
  { dr: [['Incorporation Costs A/c', BP.prom * 10]], cr: [[E, BP.prom * 10]], nar: `${inr(BP.prom)} fully paid shares allotted to the promoters for their services` },
  { dr: [['Underwriting Commission A/c', BPc]], cr: [["Umang and Co. (Underwriters') A/c", BPc]], nar: `commission at ${BPrate}% of the issue price due to the underwriters` },
  { dr: [["Umang and Co. (Underwriters') A/c", BPc]], cr: [[E, BPu.cap], [ACC.sp, BPu.prem]], nar: `${inr(BPu.n)} fully paid shares allotted to the underwriters at ₹${BP.price}` },
]);
eq([BPc, BPu.n, BPu.cap, BPu.prem], [48000, 3200, 32000, 16000], 'BP');

// WE6–WE10 Khamaj Solar Lanterns Ltd, Krishnagiri (imagined): the running company of Part 2.
const KS = new Books();
const KSi = issue(KS, {
  fv: 10, n: 50000, inst: inst(['Application', 3], ['Allotment', 3, 2], ['First and Final Call', 4]),
  groups: [{ applied: 4000, allotted: 0 }, { applied: 50000, allotted: 50000 }],
  defaults: [{ who: 'Rudra', shares: 600, from: 1 }, { who: 'Tushita', shares: 500, from: 2 }],
  advance: [{ who: 'Nandita', shares: 1000, at: 1, calls: [2] }],
  arrearsAccount: true, dates: { app: '20 April 2026', allot: '1 May 2026', calls: ['1 August 2026'] },
});
const KSissue = KS.journal();
const KSa = KS.entries.length;
const KSf = forfeit(KS, KSi, ['Rudra'], { date: '1 November 2026' });
const KSb = KS.entries.length;
const KSr = reissue(KS, { cap: E, shares: 400, price: 9, credited: 10, forfeitedOn: (KSf.sf * 400) / 600, date: '1 December 2026' });
const KSfj = KS.journal(KSa, KSb);
const KSrj = KS.journal(KSb);
const KSnote = shareNote({ B: KS, cap: E, fv: 10, authorised: 100000, issued: 50000, rows: [{ label: 'Subscribed and fully paid up', n: 49300, called: 10 }, { label: 'Subscribed but not fully paid up', n: 500, called: 10, arrears: KS.bal(ACC.cia) }], forfeited: -KS.bal(ACC.sf), arrearsBooks: KS.bal(ACC.cia), note: 1 });
const KSres = simpleNote('Reserves and Surplus', [['Securities Premium', -KS.bal(ACC.sp)], ['Capital Reserve', -KS.bal(ACC.cr)]], 2);
const KSbs = bsIII({ title: 'Balance Sheet of Khamaj Solar Lanterns Ltd as at 31 March 2027 (extract)', eq: [["Shareholders' Funds", [['Share Capital', 1, KSnote.total], ['Reserves and Surplus', 2, KSres.total]]]], assets: [['Current Assets', [['Cash and Cash Equivalents (cash at bank)', '', KS.bal(ACC.bank)]]]] });
const KSrudra = KSf.per.Rudra;
eq([KSi.refT, KS.bal(ACC.bank), KSf.sc, KSf.sp, KSf.sf, KSr.disc, KSr.toCR, KSr.sfLeft, KS.bal(ACC.cia), KSnote.total, KSres.total, KSbs.total], [12000, 596200, 6000, 1200, 1800, 400, 800, 600, 2000, 496600, 99600, 596200], 'KS');
const KSallotIn = 50000 * 5 - 600 * 5 + 1000 * 4;
const KScallIn = 50000 * 4 - 1000 * 4 - (600 + 500) * 4;
eq([KSallotIn, KScallIn], [251000, 191600], 'KS receipts');

// WE7 Tilang Water Purifiers Ltd (imagined): interest on calls in advance and in arrears.
const TW = new Books();
const TWi = issue(TW, {
  fv: 10, n: 30000, inst: inst(['Application', 3], ['Allotment', 3], ['First and Final Call', 4]),
  defaults: [{ who: 'Jaideep', shares: 2000, from: 2 }], advance: [{ who: 'Manorama', shares: 1500, at: 1, calls: [2] }],
  arrearsAccount: true, dates: { app: '15 May 2026', allot: '1 June 2026', calls: ['1 September 2026'] },
});
const TWa = TW.entries.length;
const TWadv = payAdvanceInterest(TW, { amount: 1500 * 4, months: 3, date: '1 September 2026' });
const TWarr = receiveArrears(TW, TWi, 'Jaideep', { date: '1 December 2026', months: 3 });
TW.post({ date: '31 March 2027', dr: [[INT.arrears, TWarr.int]], cr: [[PL, TWarr.int]], nar: 'interest on calls in arrears transferred to the Statement of Profit and Loss' });
TW.post({ date: '31 March 2027', dr: [[PL, TWadv.int]], cr: [[INT.advance, TWadv.int]], nar: 'interest on calls in advance transferred to the Statement of Profit and Loss' });
const TWj = TW.journal(TWa);
eq([TWadv.int, TWarr.amt, TWarr.int, TW.bal(INT.arrears), TW.bal(INT.advance), TW.bal(ACC.cia), TW.bal(ACC.adv)], [180, 8000, 200, 0, 0, 0, 0], 'TW');
check(TWadv.int === interest(6000, 12, 3) && TWarr.int === interest(8000, 10, 3), 'TW interest');

// ---------------------------------------------------------------- visuals: Part 1
const vRoute1 = flow('LR', ['Issue process and entries', 'Journal proper and cash book', 'Issue at a premium', 'Over- and under-subscription', 'Shares for consideration other than cash'], 'Route map of Part 1: the issue process and its entries, the journal proper and cash book, issue at a premium, over- and under-subscription, and shares issued for consideration other than cash', 'Part 1 at a glance');
const vSteps = flow('LR', ['Prospectus invites applications', 'Application money received (bank)', 'Allotment: application money becomes capital; allotment money due', 'Calls made and received', 'Shares fully paid'], 'Flow of a share issue: the prospectus invites applications, application money is banked, on allotment it becomes capital and allotment money falls due, calls are then made and received, and the shares become fully paid', 'How a company issues shares for cash');
const vParEntries = table(
  ['Event', 'Entry'],
  [
    ['Application money received', 'Bank A/c Dr. To Equity Share Application A/c'],
    ['Shares allotted', 'Equity Share Application A/c Dr. To Equity Share Capital A/c (and To Bank A/c for any refund)'],
    ['Allotment money due', 'Equity Share Allotment A/c Dr. To Equity Share Capital A/c'],
    ['Allotment money received', 'Bank A/c Dr. To Equity Share Allotment A/c'],
    ['Call made', 'Equity Share First Call A/c Dr. To Equity Share Capital A/c'],
    ['Call money received', 'Bank A/c Dr. To Equity Share First Call A/c'],
  ],
  'Table of entries for an issue at par: application money received is debited to bank; on allotment the application account is transferred to share capital; allotment and each call are first made due to share capital and then received into the bank',
);
const vYBj = table(YBj.headers, YBj.rows, `Journal of Yaman Bicycle Rims Ltd for ${inr(YBi.allotted)} shares of ten rupees at par: application, allotment and first and final call money each received and transferred to equity share capital, totalling ${inr(-YB.bal(E))}`);
const vJPvCB = table(
  ['Entry', 'Journal proper', 'Cash book (bank column)'],
  [
    ['Application money received', '—', 'Receipt: To Equity Share Application A/c'],
    ['Application money transferred to capital', 'Yes', '—'],
    ['Refund of application money', '—', 'Payment: By Equity Share Application A/c'],
    ['Allotment or call money due', 'Yes', '—'],
    ['Allotment or call money received', '—', 'Receipt: To Equity Share Allotment (or Call) A/c'],
  ],
  'Table showing where each share-issue entry goes when a cash book is kept: money received or refunded through the bank goes to the cash book; the transfer of application money and amounts falling due go to the journal proper',
);
const vYBcb = table(YBcb.cb.headers, YBcb.cb.rows, `Cash book, bank column, of Yaman Bicycle Rims Ltd: receipts from application, allotment and the call totalling ${inr(YBcb.receipts)}, closed by a balance carried down of ${inr(YBcb.balance)}`, 'The journal proper keeps only the three non-cash entries.');
const vSec52 = table(
  ['Securities premium (Section 52)', 'Rule'],
  [
    ['What it is', 'Amount received above face value on an issue of shares'],
    ['Account', 'Securities Premium A/c (credit), not share capital'],
    ['In the balance sheet', "Reserves and Surplus, under Shareholders' Funds"],
    ['May be used to', 'write off preliminary expenses; write off expenses, commission or discount on an issue; provide premium on redemption of preference shares or debentures; buy back own shares'],
    ['May not be used to', 'pay dividends (it is a capital receipt)'],
  ],
  'Table on securities premium under section fifty-two: it is the amount above face value, credited to the securities premium account and shown under reserves and surplus; it may be used for capital purposes such as writing off preliminary or issue expenses, premium on redemption and buy-back, but not for dividends',
);
const vBGcap = table(BGcap.headers, BGcap.rows, `Equity share capital account of Bageshri Glass Bangles Ltd: credited with ten rupees per share in three instalments, closing at ${inr(-BG.bal(E))}; the premium of ${inr(-BG.bal(ACC.sp))} goes to the securities premium account instead`);
const vPerShare = (() => {
  const s = new Svg(600, 280);
  const base = 220, unit = 26, colW = 90, x0 = 70, gap = 70;
  const cols = BGi.inst.map((i) => [i.name === 'First and Final Call' ? 'Call' : i.name, i.cap, i.prem]);
  check(sum(cols.map(([, c]) => c)) === 10 && sum(cols.map(([, , p]) => p)) === 3, 'per-share split adds to face value and premium');
  cols.forEach(([label, cap, prem], i) => {
    const x = x0 + i * (colW + gap);
    s.rect(x, base - cap * unit, colW, cap * unit, { fill: 'blue', color: 'accent', sw: 1.5, rx: 2 });
    s.text(x + colW / 2, base - (cap * unit) / 2, `₹${cap} capital`, { size: 12, bold: true });
    if (prem) {
      s.rect(x, base - (cap + prem) * unit, colW, prem * unit, { fill: 'yellow', color: 'accent', sw: 1.5, rx: 2 });
      s.text(x + colW / 2, base - cap * unit - (prem * unit) / 2, `₹${prem} premium`, { size: 12, bold: true });
    }
    s.text(x + colW / 2, base + 18, label, { size: 13 });
    s.text(x + colW / 2, base - (cap + prem) * unit - 12, `₹${cap + prem}`, { size: 12, muted: true });
  });
  s.line(x0 - 20, base, x0 + 3 * colW + 2 * gap + 20, base, { sw: 1.5 });
  s.text(300, 20, 'Issue price ₹13 per share: ₹10 to share capital, ₹3 to securities premium', { size: 13, bold: true });
  return s.visual('Column diagram for Bageshri Glass Bangles: application three rupees, all capital; allotment six rupees, three capital and three premium; call four rupees, all capital; capital parts add to the ten-rupee face value and the premium to three rupees', 'Column heights are drawn to scale from the instalments.');
})();
const vOverUnder = table(
  ['Situation', 'Treatment'],
  [
    ['Under-subscription, at least 90% applied for', 'Allot the shares applied for; record entries on that number'],
    ['Under-subscription, below 90%', 'No allotment; refund all application money'],
    ['Over-subscription: reject some applications', 'Refund their money in full'],
    ['Over-subscription: pro-rata allotment', 'Excess application money adjusted towards allotment (capital, then premium due); surplus refunded or, if the articles allow, held as calls in advance'],
  ],
  'Table of subscription cases: an under-subscribed issue with at least ninety per cent applied for is allotted on the shares applied for; below ninety per cent all money is refunded; over-subscription is handled by rejecting some applications with refunds, or by pro-rata allotment with the excess adjusted towards allotment and any surplus refunded or held as calls in advance',
);
const vMQwork = table(
  ['Malkauns Cotton Quilts (imagined)', 'Applied', 'Allotted', 'Paid on application (₹)', 'To capital (₹)', 'Adjusted to allotment (₹)', 'Refunded (₹)'],
  [
    ['Rejected', inr(MQi.groups[0].applied), '0', inr(MQi.groups[0].applied * 4), '0', '0', inr(MQi.groups[0].refund)],
    ['Pro rata (3 : 2)', inr(MQg.applied), inr(MQg.allotted), inr(MQg.applied * 4), inr(MQcap), inr(MQg.adj), inr(MQg.refund)],
    ['**Total**', `**${inr(MQi.applied)}**`, `**${inr(MQi.allotted)}**`, `**${inr(MQi.applied * 4)}**`, `**${inr(MQcap)}**`, `**${inr(MQi.adjT)}**`, `**${inr(MQi.refT)}**`],
  ],
  `Working table for Malkauns Cotton Quilts: ${inr(MQi.applied)} shares applied for; applications for ${inr(MQi.groups[0].applied)} rejected and refunded; the remaining ${inr(MQg.applied)} allotted ${inr(MQg.allotted)} shares pro rata, so their excess of ${inr(MQg.adj)} is adjusted towards allotment money of ${inr(50000 * 4)}`,
);
const vMQj = table(MQ.journal().headers, MQ.journal().rows, `Journal of Malkauns Cotton Quilts for application and allotment: application money of ${inr(MQi.applied * 4)} received; transferred to capital ${inr(MQcap)}, adjusted towards allotment ${inr(MQi.adjT)} and refunded ${inr(MQi.refT)}; allotment money due including premium, and ${inr(MQallotIn)} received`);
const vAppSplit = (() => {
  const total = MQi.applied * 4;
  const parts = [['To share capital', MQcap, 'blue'], ['Adjusted to allotment', MQi.adjT, 'green'], ['Refunded', MQi.refT, 'red']];
  check(sum(parts.map(([, v]) => v)) === total, 'application money split adds up');
  const s = new Svg(640, 200);
  const X0 = 40, W = 560;
  let x = X0;
  s.text(320, 24, `Application money received: ${rs(total)}`, { size: 14, bold: true });
  for (const [name, v, color] of parts) {
    const w = (W * v) / total;
    s.rect(x, 60, w, 60, { fill: color, color: 'accent', sw: 1.5, rx: 2 });
    s.text(x + w / 2, 82, name, { size: 12 });
    s.text(x + w / 2, 102, inr(v), { size: 12, bold: true });
    x += w;
  }
  check(Math.abs(x - X0 - W) < 1e-9, 'bar width');
  s.text(320, 150, 'The adjusted part is still the applicants\' money: it pays half of their allotment', { size: 12, muted: true });
  return s.visual(`Bar of the application money of Malkauns Cotton Quilts, ${inr(total)}, split to scale into ${inr(MQcap)} credited to share capital, ${inr(MQi.adjT)} adjusted towards allotment and ${inr(MQi.refT)} refunded on rejected applications`, 'Segment widths are computed from the working.');
})();
const vNonCash = table(
  ['Shares issued to', 'Entries'],
  [
    ['Promoters, for their services', 'Incorporation Costs A/c (or Goodwill A/c) Dr. To Equity Share Capital A/c'],
    ['Underwriters, for their commission', "Underwriting Commission A/c Dr. To Underwriters' A/c; Underwriters' A/c Dr. To Equity Share Capital A/c (and Securities Premium A/c)"],
    ['Vendor, for assets', "Sundry Assets A/c Dr. To Vendor's A/c; Vendor's A/c Dr. To Equity Share Capital A/c (and Securities Premium A/c)"],
    ['Vendor, for a business', "Business Purchase A/c Dr. To Vendor's A/c; Assets A/c Dr. (Goodwill Dr. or Capital Reserve Cr. as the balance) To Liabilities A/c, To Business Purchase A/c; Vendor's A/c Dr. To Share Capital (and Premium)"],
    ['Number of shares to a vendor', 'Amount payable in shares ÷ issue price per share'],
  ],
  'Table of entries for shares issued for consideration other than cash: to promoters through incorporation costs or goodwill; to underwriters through underwriting commission and the underwriters account; to a vendor through the vendor account, for assets or for a whole business with goodwill or capital reserve as the balancing figure; the number of shares is the amount payable divided by the issue price',
);
const vDLj = table(DLj.headers, DLj.rows, `Journal of Darbari Leaf Plates for the business of Baldev Areca Crafts: business purchase of ${inr(DL.pc)}; assets and creditors taken over with goodwill of ${inr(DLb.gw)}; vendor paid ${inr(DL.cheque)} by cheque and ${inr(DLs.n)} shares at twelve rupees, capital ${inr(DLs.cap)} and premium ${inr(DLs.prem)}`);
const vBPj = table(BPj.headers, BPj.rows, `Journal of Bhupali Precision Tools: ${inr(BP.prom)} shares to promoters debited to incorporation costs; underwriting commission of ${inr(BPc)} settled by ${inr(BPu.n)} shares at fifteen rupees, capital ${inr(BPu.cap)} and premium ${inr(BPu.prem)}`);
const vSummary1 = table(
  ['Idea', 'Rule'],
  [
    ['Share capital', 'Always credited at face value; premium to Securities Premium A/c'],
    ['Instalment accounts', 'Made due (Dr.) and received (Cr.); each closes at nil'],
    ['Cash book kept', 'Receipts and refunds in the cash book; transfers and amounts due in the journal proper'],
    ['Minimum subscription', '90% of the issue, or all money is refunded'],
    ['Pro rata', 'Excess application money adjusted towards allotment; surplus refunded'],
    ['Non-cash consideration', 'Debit what is received (services, commission, assets); credit capital and premium'],
  ],
  'Summary table of Part 1: share capital at face value with premium to securities premium; instalment accounts made due and received; cash book and journal proper; ninety per cent minimum subscription; pro-rata adjustment; and shares for consideration other than cash',
);

// ---------------------------------------------------------------- visuals: Part 2
const vRoute2 = flow('LR', ['Calls in arrears and in advance', 'Interest (Table F)', 'Forfeiture', 'Reissue and capital reserve', 'Schedule III disclosure'], 'Route map of Part 2: calls in arrears and in advance, interest on them under Table F, forfeiture of shares, reissue and capital reserve, and disclosure under Schedule Three', 'Part 2 at a glance');
const vArrears = table(
  ['Calls in arrears', 'Entry or rule'],
  [
    ['Call money not received on the due date', 'Calls in Arrears A/c Dr. (with Bank A/c Dr. for the rest) To Equity Share Call A/c'],
    ['Arrears received later', 'Bank A/c Dr. To Calls in Arrears A/c'],
    ['Nature', 'Debit balance: money called up but not received'],
    ['Balance sheet', 'Deducted from subscribed capital in the Note on Share Capital'],
  ],
  'Table on calls in arrears: unpaid call money is debited to a calls in arrears account; it is cleared when the money is received; the balance is money called up but not received and is deducted from subscribed capital in the note on share capital',
);
const vAdvance = table(
  ['Calls in advance', 'Entry or rule'],
  [
    ['Money received before a call is made', 'Bank A/c Dr. To Calls in Advance A/c'],
    ['Call made later', 'Calls in Advance A/c Dr. (with Bank A/c Dr. for the rest) To Equity Share Call A/c'],
    ['Nature', 'Credit balance: owed to shareholders until the call is made'],
    ['Balance sheet', 'Other Current Liabilities (with any interest accrued on it)'],
  ],
  'Table on calls in advance: money received before a call is credited to a calls in advance account and adjusted when the call is made; the balance is owed to shareholders and is shown under other current liabilities',
);
const vKSissue = table(KSissue.headers, KSissue.rows, `Journal of Khamaj Solar Lanterns from application to the call: application money on ${inr(KSi.applied)} shares, ${inr(KSi.refT)} refunded on rejected applications; allotment due with premium, received ${inr(KSallotIn)} after Rudra's default and Nandita's advance; call due, received ${inr(KScallIn)} with the advance adjusted and arrears of Rudra and Tushita debited to calls in arrears`);
const vInterest = table(
  ['Interest (Table F, unless the articles say otherwise)', 'Calls in arrears', 'Calls in advance'],
  [
    ['Rate', 'Up to 10% p.a. (the Board may waive or lower it)', 'Up to 12% p.a. (unless the general meeting directs otherwise)'],
    ['Period', 'From the due date to the date of payment', 'From the date of receipt to the date the call is due'],
    ['Entry when due', 'Sundry Shareholders A/c Dr. To Interest on Calls in Arrears A/c', 'Interest on Calls in Advance A/c Dr. To Sundry Shareholders A/c'],
    ['Settled', 'Bank A/c Dr. To Sundry Shareholders A/c', 'Sundry Shareholders A/c Dr. To Bank A/c'],
    ['At the year end', `Interest on Calls in Arrears A/c Dr. To ${PL}`, `${PL} Dr. To Interest on Calls in Advance A/c`],
  ],
  'Table on interest under Table F: on calls in arrears up to ten per cent a year from the due date to payment, an income charged to shareholders and closed to the statement of profit and loss; on calls in advance up to twelve per cent a year from receipt to the due date, an expense paid to shareholders and closed to the statement of profit and loss',
);
const vTWwork = table(
  ['Tilang Water Purifiers (imagined)', 'Amount (₹)', 'Period', 'Rate', 'Interest (₹)'],
  [
    [`Manorama: call paid in advance on ${inr(1500)} shares`, inr(6000), '1 June to 1 September: 3 months', '12% p.a.', inr(TWadv.int)],
    [`Jaideep: call in arrears on ${inr(2000)} shares`, inr(TWarr.amt), '1 September to 1 December: 3 months', '10% p.a.', inr(TWarr.int)],
  ],
  `Interest working for Tilang Water Purifiers: Manorama's advance of six thousand rupees for three months at twelve per cent gives ${inr(TWadv.int)}; Jaideep's arrears of ${inr(TWarr.amt)} for three months at ten per cent gives ${inr(TWarr.int)}`,
);
const vTimeline = (() => {
  const months = ['1 Jun', '1 Jul', '1 Aug', '1 Sep', '1 Oct', '1 Nov', '1 Dec'];
  const s = new Svg(640, 230);
  const X0 = 50, W = 540, y = 120;
  const X = (m) => X0 + (W * m) / (months.length - 1);
  const call = 3, paid = 6;
  check(call - 0 === 3 && paid - call === 3, 'timeline months agree with the interest periods');
  s.line(X0, y, X0 + W, y, { sw: 2 });
  months.forEach((m, i) => {
    s.line(X(i), y - 5, X(i), y + 5, { sw: 1.5 });
    s.text(X(i), y + 20, m, { size: 11, muted: true });
  });
  s.rect(X(0), y - 50, X(call) - X(0), 30, { fill: 'green', color: 'accent', sw: 1.5, rx: 3 });
  s.text((X(0) + X(call)) / 2, y - 35, `Advance: 3 months at 12% = ${rs(TWadv.int)}`, { size: 12, bold: true });
  s.rect(X(call), y + 35, X(paid) - X(call), 30, { fill: 'red', color: 'accent', sw: 1.5, rx: 3 });
  s.text((X(call) + X(paid)) / 2, y + 50, `Arrears: 3 months at 10% = ${rs(TWarr.int)}`, { size: 12, bold: true });
  s.text(X(0), y - 64, 'Allotment', { size: 12 });
  s.text(X(call), y - 64, 'Call due', { size: 12 });
  s.text(X(paid), y + 82, 'Jaideep pays', { size: 12 });
  s.text(320, 18, 'Tilang Water Purifiers: whose money, for how long?', { size: 13, bold: true });
  return s.visual(`Timeline from one June to one December for Tilang Water Purifiers: from allotment to the call date, three months, Manorama's advance earns interest at twelve per cent, ${inr(TWadv.int)} rupees; from the call date to one December, three months, Jaideep's arrears bear interest at ten per cent, ${inr(TWarr.int)} rupees`, 'Bar lengths are drawn to scale in months.');
})();
const vTWj = table(TWj.headers, TWj.rows, `Journal of Tilang Water Purifiers for interest: interest of ${inr(TWadv.int)} on calls in advance due and paid; interest of ${inr(TWarr.int)} charged to Jaideep and received with his arrears of ${inr(TWarr.amt)}; both interest accounts closed to the statement of profit and loss on thirty-one March`);
const vForfeit = table(
  ['In the forfeiture entry', 'Shares issued at par', 'Shares issued at a premium'],
  [
    ['Equity Share Capital A/c Dr.', 'Amount called up', 'Amount called up'],
    ['Securities Premium A/c Dr.', '—', 'Only if the premium has not been received'],
    ['To Calls in Arrears A/c (or the call accounts)', 'Amount unpaid', 'Amount unpaid, including any unpaid premium'],
    ['To Share Forfeiture A/c', 'Amount received', 'Amount received, excluding premium received'],
  ],
  'Table of the forfeiture entry: share capital is debited with the amount called up; securities premium is debited only if the premium was not received; the unpaid amount is credited to calls in arrears; the amount received, excluding any premium received, is credited to share forfeiture',
);
const vKSfj = table(KSfj.headers, KSfj.rows, `Journal of Khamaj Solar Lanterns for the forfeiture of Rudra's ${inr(600)} shares: share capital debited ${inr(KSf.sc)}, securities premium debited ${inr(KSf.sp)} because the premium was not received, calls in arrears credited ${inr(KSrudra.unpaidAll)} and share forfeiture credited ${inr(KSf.sf)}`);
const vReissue = table(
  ['Reissue of forfeited shares', 'Entry'],
  [
    ['At a discount', 'Bank A/c Dr., Share Forfeiture A/c Dr. (discount) To Equity Share Capital A/c'],
    ['At par', 'Bank A/c Dr. To Equity Share Capital A/c'],
    ['At a premium', 'Bank A/c Dr. To Equity Share Capital A/c, To Securities Premium A/c'],
    ['Limit', 'Discount ≤ amount forfeited on the shares reissued'],
    ['Gain', 'Forfeited on reissued shares − discount: Share Forfeiture A/c Dr. To Capital Reserve A/c'],
    ['Not yet reissued', 'Balance stays in Share Forfeiture A/c; added to share capital in the balance sheet'],
  ],
  'Table on reissue: at a discount the discount is debited to share forfeiture; at par or premium bank is debited and capital, with any premium, credited; the discount can never exceed the amount forfeited on those shares; the remaining gain on reissued shares goes to capital reserve, while the balance on shares not reissued stays in share forfeiture',
);
const vKSrj = table(KSrj.headers, KSrj.rows, `Journal of Khamaj Solar Lanterns for the reissue of ${inr(400)} forfeited shares at nine rupees as fully paid: bank ${inr(400 * 9)}, discount ${inr(KSr.disc)} debited to share forfeiture; then ${inr(KSr.toCR)} transferred from share forfeiture to capital reserve`);
const vWaterfall = (() => {
  const steps = [['Forfeited (600 shares)', KSf.sf, 'blue', 'start'], ['Discount on reissue', -KSr.disc, 'yellow', 'step'], ['To capital reserve', -KSr.toCR, 'green', 'step'], ['Left (200 shares)', KSr.sfLeft, 'fill', 'end']];
  check(KSf.sf - KSr.disc - KSr.toCR === KSr.sfLeft, 'waterfall adds up');
  const s = new Svg(620, 280);
  const base = 230, H = 180, colW = 100, gap = 40, x0 = 50;
  const h = (v) => (H * v) / KSf.sf;
  let level = 0;
  steps.forEach(([label, v, color, kind], i) => {
    const x = x0 + i * (colW + gap);
    let top, height;
    if (kind === 'start') { top = base - h(v); height = h(v); level = v; }
    else if (kind === 'step') { top = base - h(level); height = h(-v); level += v; }
    else { check(level === v, 'waterfall ends at the balance left'); top = base - h(v); height = h(v); }
    s.rect(x, top, colW, height, { fill: color, color: 'accent', sw: 1.5, rx: 2 });
    s.text(x + colW / 2, top + height / 2, inr(Math.abs(v)), { size: 12, bold: true });
    s.text(x + colW / 2, base + 18, label, { size: 11 });
    if (i < steps.length - 1) s.line(x + colW, base - h(level), x + colW + gap, base - h(level), { sw: 1, dash: true, color: 'muted' });
  });
  s.line(x0 - 10, base, x0 + 4 * colW + 3 * gap + 10, base, { sw: 1.5 });
  s.text(310, 22, 'Share Forfeiture Account of Khamaj Solar Lanterns', { size: 13, bold: true });
  return s.visual(`Waterfall of the share forfeiture account of Khamaj Solar Lanterns: ${inr(KSf.sf)} forfeited on six hundred shares; less a discount of ${inr(KSr.disc)} on the four hundred reissued shares; less ${inr(KSr.toCR)} transferred to capital reserve; leaving ${inr(KSr.sfLeft)} on the two hundred shares not reissued`, 'Column heights are computed from the account.');
})();
const vWhereBS = table(
  ['Balance', 'Schedule III Part I'],
  [
    ['Authorised and issued capital', 'Note on Share Capital, for information (not added)'],
    ['Subscribed and fully paid; subscribed but not fully paid', "Note on Share Capital → Share Capital under Shareholders' Funds"],
    ['Calls in arrears (calls unpaid)', 'Deducted from subscribed capital in the note'],
    ['Share Forfeiture A/c (shares not reissued)', 'Added in the note as forfeited shares'],
    ['Securities premium; capital reserve', "Reserves and Surplus under Shareholders' Funds"],
    ['Calls in advance (and interest accrued on it)', 'Other Current Liabilities'],
  ],
  'Table of disclosure under Schedule Three: authorised and issued capital are shown in the note for information; subscribed capital, less calls in arrears and plus forfeited shares, is the share capital; securities premium and capital reserve go to reserves and surplus; calls in advance go to other current liabilities',
);
const vKSnote = table(KSnote.headers, KSnote.rows, `Note on share capital of Khamaj Solar Lanterns: authorised one lakh shares and issued fifty thousand shares of ten rupees; subscribed and fully paid ${inr(49300)} shares; ${inr(500)} shares not fully paid less calls in arrears of ${inr(KS.bal(ACC.cia))}; add forfeited shares ${inr(KSr.sfLeft)}; total ${inr(KSnote.total)}`);
const vKSbs = table(KSbs.headers, KSbs.rows, `Balance sheet extract of Khamaj Solar Lanterns as at thirty-one March: share capital ${inr(KSnote.total)} and reserves and surplus ${inr(KSres.total)} on one side, cash at bank ${inr(KS.bal(ACC.bank))} on the other, both totalling ${inr(KSbs.total)}`, 'Note 2, Reserves and Surplus: securities premium and capital reserve.');
const vSummary2 = table(
  ['Idea', 'Rule'],
  [
    ['Calls in arrears', 'Debit balance; deducted from subscribed capital; interest up to 10% p.a.'],
    ['Calls in advance', 'Credit balance; Other Current Liabilities; interest up to 12% p.a.'],
    ['Forfeiture', 'Cancel what was called up (and unpaid premium); keep what was received'],
    ['Reissue', 'Discount ≤ amount forfeited on those shares'],
    ['Capital reserve', 'Gain on reissued shares only'],
    ['Disclosure', 'Subscribed − calls unpaid + forfeited shares = share capital'],
  ],
  'Summary table of Part 2: calls in arrears and in advance with their interest limits and disclosure; forfeiture cancels what was called up and keeps what was received; the reissue discount is limited; capital reserve arises only on reissued shares; share capital equals subscribed capital less calls unpaid plus forfeited shares',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Issue and Forfeiture of Shares — Part 1: Issuing Shares for Cash and Other Consideration',
  goals: [
    'Pass journal entries for an issue of shares at par and at a premium, in the journal proper and the cash book',
    'Prepare share capital and related ledger accounts',
    'Record under-subscription, over-subscription and pro-rata allotment',
    'Record shares issued to promoters, underwriters and vendors',
  ],
  slides: [
    sl('title', 'Issue and Forfeiture of Shares', {
      b: 'Part 1 — issuing shares for cash, at par and at a premium, the **journal proper and cash book**, **over- and under-subscription**, and shares for **consideration other than cash**. Every company, person and figure in this chapter is imagined.',
      v: vRoute1,
      n: 'A company raises its capital by issuing shares under the Companies Act. In this chapter we record that money, from the first application to the last call, and we learn what happens when a shareholder fails to pay. Part one covers issuing shares for cash at par and at a premium, the cash book, subscription problems and shares given for something other than cash.',
    }),
    sl('concept', 'How a company issues shares', {
      v: vSteps,
      bl: ['Each share has a **face value**; money is usually collected in instalments: **application**, **allotment** and one or more **calls**.', 'Every instalment has its own account, which is first made due and then received.'],
      n: 'The company publishes a prospectus and invites applications. Applicants send the application money, which the company banks. When shares are allotted, the application money becomes share capital and the allotment money falls due. Later the directors make calls for the rest. Each instalment has its own account, so we can see exactly what has been called and what has come in.',
    }),
    sl('concept', 'Entries for an issue at par', {
      v: vParEntries,
      n: 'For every instalment we use the same rhythm. When money is due, we debit the instalment account and credit share capital. When money comes in, we debit the bank and credit the instalment account. Application money is the exception: it arrives first, and is transferred to share capital only when the shares are allotted. If all goes well, every instalment account closes at zero.',
    }),
    sl('example', 'Worked example 1: Yaman Bicycle Rims Ltd', {
      b: `Yaman Bicycle Rims Ltd, Phagwara (imagined), issues ${inr(YBi.allotted)} equity shares of ₹10 each at par: ₹3 on application, ₹4 on allotment, ₹3 on the first and final call. All shares are applied for and every amount is received.`,
      v: vYBj,
      n: `Here is the full journal. Application money is received and transferred. Allotment money falls due and is received, and the same happens for the call. Share capital ends at ${rw(-YB.bal(E))}, and the bank holds exactly the same amount, because the shares were issued at par and every rupee was paid.`,
    }),
    sl('two-column', 'Journal proper and cash book', {
      cols: ['**Cash book (bank column)**\n\n- Application money received\n- Refunds of application money\n- Allotment and call money received', '**Journal proper**\n\n- Application money transferred to capital\n- Allotment money due\n- Call money due'],
      v: vJPvCB,
      n: 'Many companies keep a cash book. Then every receipt or payment through the bank is written in the cash book, not in the journal. The journal proper keeps only the entries that move no cash: the transfer of application money to capital, and the amounts that fall due on allotment and on each call. Together the two books record the issue completely.',
    }),
    sl('example', 'Worked example 1 (continued): the cash book', {
      b: 'Journal proper for Yaman: (i) Application A/c Dr. To Share Capital; (ii) Allotment A/c Dr. To Share Capital; (iii) First and Final Call A/c Dr. To Share Capital.',
      v: vYBcb,
      n: `With a cash book, Yaman's three receipts appear on the receipts side: application, allotment and the call, totalling ${rw(YBcb.receipts)}. The balance carried down is the same as the share capital. The journal proper now holds only three entries, the transfer and the two amounts due.`,
    }),
    sl('check', 'Quick check: face value', {
      b: 'What is the ₹10 on the certificate called?',
      chk: 'fb_face',
      n: 'Recall the name for the value stated in the memorandum and printed on each share.',
    }),
    sl('concept', 'Issue at a premium: Section 52', {
      v: vSec52,
      b: 'Premium is a **capital receipt**: credit **Securities Premium A/c**, never share capital or profit.',
      n: 'A company with a good record can issue shares above face value. The extra amount is called securities premium. Share capital is still credited only with the face value, and the premium goes to a separate account. Section fifty-two allows the premium to be used only for capital purposes, such as writing off issue expenses or buying back shares. It can never be paid out as a dividend.',
    }),
    sl('example', 'Worked example 2: Bageshri Glass Bangles Ltd', {
      b: `Bageshri Glass Bangles Ltd, Shikohabad (imagined), issues ${inr(BGi.allotted)} equity shares of ₹10 each at ₹13: ₹3 on application, ₹6 on allotment (including the ₹3 premium) and ₹4 on the call. All money is received. Securities Premium A/c is credited with ${rs(-BG.bal(ACC.sp))}.`,
      v: vBGcap,
      n: `The premium is due with allotment. When allotment falls due, the allotment account is debited with six rupees a share: three to share capital and three to securities premium. The share capital account therefore collects only ten rupees a share, ${rw(-BG.bal(E))} in all, while the premium of ${rw(-BG.bal(ACC.sp))} is kept apart.`,
    }),
    sl('diagram', 'Splitting the ₹13 per share', {
      v: vPerShare,
      b: 'Capital parts of the instalments add up to the face value.',
      n: 'This picture splits each instalment into its capital part and its premium part. Application and the call are all capital. Allotment carries the premium on top of its capital part. Add the blue parts and you get ten rupees, the face value. Add the yellow part and you get the premium of three rupees.',
    }),
    sl('check', 'Quick check: where does premium go?', {
      b: 'Revenue gain or capital receipt?',
      chk: 'tf_premium_pl',
      n: 'Decide whether securities premium can ever be treated as a profit of the year.',
    }),
    sl('concept', 'Over- and under-subscription', {
      v: vOverUnder,
      bl: ['**Minimum subscription:** at least 90% of a public issue must be applied for, or all money is refunded.', '**Pro rata:** excess application money is adjusted towards allotment (capital and premium due), and only any surplus is refunded.'],
      n: 'Applications rarely match the shares offered. If fewer shares are applied for, the company may still allot them, as long as at least ninety per cent of the issue is subscribed; otherwise all money goes back. If more are applied for, the directors can reject some applications, or allot pro rata. With pro rata, the extra money paid is kept towards allotment, and only any surplus is refunded.',
    }),
    sl('example', 'Worked example 3: Malkauns Cotton Quilts Ltd', {
      b: `Malkauns Cotton Quilts Ltd, Kaithun (imagined), offers ${inr(MQi.s.n)} shares of ₹10 at ₹12: ₹4 on application, ₹4 on allotment (including the ₹2 premium), ₹4 on the call. Applications: ${inr(MQi.applied)} shares. Applications for ${inr(MQi.groups[0].applied)} are rejected; the rest get shares pro rata.`,
      v: vMQwork,
      n: `Treat each group separately. The rejected group is refunded ${rw(MQi.refT)}. The pro rata group applied for ${words(MQg.applied)} shares but receives ${words(MQg.allotted)}, a ratio of three to two. Their extra application money, ${rw(MQg.adj)}, is exactly half of the allotment money due from them, so it is adjusted, not refunded.`,
    }),
    sl('example', 'Worked example 3 (continued): the entries', {
      b: 'One transfer entry does three jobs: capital, adjustment towards allotment, refund.',
      v: vMQj,
      n: `The application account is cleared in one entry. Four rupees a share on the shares allotted goes to share capital, ${rw(MQi.adjT)} is credited to the allotment account, and ${rw(MQi.refT)} is refunded through the bank. When allotment falls due, the allottees already have credit in the allotment account, so only ${rw(MQallotIn)} more is received.`,
    }),
    sl('diagram', 'Where the application money went', {
      v: vAppSplit,
      n: `Here is all the application money of Malkauns, ${rw(MQi.applied * 4)}, as one bar. The largest part becomes share capital. The next part stays with the company but is counted towards allotment. Only the smallest part, belonging to the rejected applicants, leaves the company as a refund.`,
    }),
    sl('check', 'Quick check: the refund', {
      b: 'Who gets money back?',
      chk: 'm_refund',
      n: 'Separate the rejected applicants from the pro rata allottees before you calculate.',
    }),
    sl('concept', 'Shares for consideration other than cash', {
      v: vNonCash,
      b: 'Debit what the company **received** (services, commission, an asset or a business); credit share capital and any premium.',
      n: 'Shares need not be paid for in cash. Promoters may receive shares for their work in forming the company. Underwriters may take shares for their commission, which the law limits to five per cent of the issue price, or the rate in the articles if lower. Vendors may receive shares for assets or a whole business. In each case, debit what was received and credit share capital and any premium.',
    }),
    sl('example', 'Worked example 4: buying a business with shares', {
      b: `Darbari Leaf Plates Ltd (imagined) buys the business of Baldev Areca Crafts (imagined) for ${rs(DL.pc)}: ${rs(DL.cheque)} by cheque, the rest in equity shares of ₹10 at ₹12.`,
      v: vDLj,
      n: `The net assets taken over are worth ${rw(DLb.net)}, but the price is ${rw(DL.pc)}, so the extra ${rw(DLb.gw)} is goodwill. After the cheque, ${rw(DL.pc - DL.cheque)} is paid in shares at twelve rupees each, which means ${words(DLs.n)} shares. Each share adds ten rupees to capital and two rupees to premium.`,
    }),
    sl('example', 'Worked example 5: promoters and underwriters', {
      b: `Bhupali Precision Tools Ltd (imagined) gives ${inr(BP.prom)} fully paid shares to its promoters, and pays underwriting commission on a public issue of ${inr(BP.pub)} shares at ₹${BP.price}, at the ${BP.artRate}% its articles allow, in fully paid shares at the issue price.`,
      v: vBPj,
      n: `The promoters' shares are debited to incorporation costs. The commission is four per cent of the issue price, within the legal limit of five per cent, so it comes to ${rw(BPc)}. It is first credited to the underwriters, then settled with ${words(BPu.n)} shares at fifteen rupees, each carrying five rupees of premium.`,
    }),
    sl('check', 'Quick check: match the allotments', {
      b: 'What did the company receive for each allotment?',
      chk: 'match_noncash',
      n: 'For each allotment of shares, find the account that is debited before share capital is credited.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up: share capital is always credited at face value, and any premium goes to securities premium. Each instalment is made due and then received. With a cash book, receipts and refunds go there and the rest stays in the journal proper. At least ninety per cent must be subscribed. Pro rata excess is adjusted towards allotment. Shares for other consideration debit what was received.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Write the **working** for pro-rata allotment first: shares applied, allotted, money paid, adjusted and refunded.',
        'Split every instalment into **capital** and **premium** before writing the entry.',
        'If the question says a **cash book** is kept, put receipts and refunds there, not in the journal.',
        'Number of shares to a vendor = amount payable in shares ÷ **issue price**, not face value.',
        'Underwriting commission: the **lower** of 5% of the issue price and the articles\' rate.',
      ],
      n: 'In the exam, write a working note for every pro rata question before the entries. Split each instalment into capital and premium. Watch for the words cash book, and move receipts and refunds there. Divide a vendor\'s amount by the issue price, not the face value. And remember that underwriting commission can never exceed five per cent of the issue price.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Issue and Forfeiture of Shares — Part 2: Calls, Interest, Forfeiture, Reissue and Disclosure',
  goals: [
    'Record calls in arrears and calls in advance in separate accounts',
    'Calculate and record interest on calls in arrears and in advance as the articles (or Table F) provide',
    'Pass entries for forfeiture of shares issued at par or at a premium, and for their reissue',
    'Show share capital, forfeited shares, calls in arrears and calls in advance under Schedule III Part I',
  ],
  slides: [
    sl('title', 'Calls, interest, forfeiture, reissue and disclosure', {
      b: 'Part 2 — **calls in arrears and in advance** with **interest**, **forfeiture** and **reissue** of shares, and the **Schedule III** balance sheet.',
      v: vRoute2,
      n: 'Not every shareholder pays on time. Some pay late, some pay early, and a few never pay at all. In this part we record arrears and advances, with the interest the articles allow, forfeit the shares of defaulters, reissue them, and finally show everything in the balance sheet. One imagined company, Khamaj Solar Lanterns, runs through the whole part.',
    }),
    sl('concept', 'Calls in arrears', {
      v: vArrears,
      n: 'When a call falls due and some shareholders do not pay, the unpaid amount is moved into a calls in arrears account. This keeps the call account clean and shows clearly how much is still owed. The balance is a debit: money called up but not received. In the balance sheet it is deducted from subscribed capital.',
    }),
    sl('concept', 'Calls in advance', {
      v: vAdvance,
      n: 'Sometimes a shareholder pays a call before the directors have made it. That money is not yet share capital, because nothing has been called. It is credited to a calls in advance account, which the company owes to the shareholder. When the call is finally made, the advance is used up against it. Until then it is a current liability.',
    }),
    sl('example', 'Worked example 6: Khamaj Solar Lanterns Ltd', {
      b: `Khamaj Solar Lanterns Ltd, Krishnagiri (imagined), issues ${inr(KSi.s.n)} shares of ₹10 at ₹12: ₹3 on application, ₹5 on allotment (incl. ₹2 premium), ₹4 on the call. Applications for ${inr(KSi.applied)}; ${inr(KSi.groups[0].applied)} rejected. Rudra (${inr(600)} shares) pays neither allotment nor call; Tushita (${inr(500)}) misses the call; Nandita (${inr(1000)}) pays the call with allotment. The Board waives interest.`,
      v: vKSissue,
      n: `On allotment, Rudra's share is debited to calls in arrears, and Nandita's early call money is credited to calls in advance, so the bank receives ${rw(KSallotIn)}. When the call falls due, Nandita's advance is used up, and the calls of Rudra and Tushita go to calls in arrears. The bank receives ${rw(KScallIn)}.`,
    }),
    sl('concept', 'Interest on calls: Table F', {
      v: vInterest,
      b: 'If the articles are silent, **Table F** applies: up to **10%** on arrears and up to **12%** on advances, per annum.',
      n: 'The articles decide whether interest is charged or paid. If they are silent, Table F of the Companies Act applies. A shareholder who pays late may be charged interest of up to ten per cent a year, from the due date to the date of payment. A shareholder who pays early may be paid up to twelve per cent a year, until the call is due. Both interests are closed to the statement of profit and loss.',
    }),
    sl('example', 'Worked example 7: Tilang Water Purifiers Ltd', {
      b: `Tilang Water Purifiers Ltd (imagined) allotted shares on 1 June 2026 and made its call of ₹4 on 1 September. Manorama (${inr(1500)} shares) paid the call with allotment; Jaideep (${inr(2000)} shares) paid it on 1 December. The articles adopt Table F at full rates.`,
      v: vTWwork,
      n: `Each interest has its own period. Manorama's advance of six thousand rupees was with the company for three months before the call, so at twelve per cent she earns ${rw(TWadv.int)}. Jaideep owed ${rw(TWarr.amt)} for three months after the due date, so at ten per cent he pays ${rw(TWarr.int)}.`,
    }),
    sl('diagram', 'Whose money, for how long?', {
      v: vTimeline,
      n: 'This timeline shows why the periods differ. The advance runs from allotment up to the call date, and stops there because the money then becomes share capital. The arrears start on the call date and run until the shareholder finally pays. Always find the two dates before you calculate.',
    }),
    sl('example', 'Worked example 7 (continued): the interest entries', {
      b: 'Interest is charged or paid through **Sundry Shareholders A/c**, then closed to the Statement of Profit and Loss.',
      v: vTWj,
      n: `Interest on the advance is an expense: it is debited to its own account, credited to the shareholders and paid. Interest on arrears is an income: Jaideep is debited with it and pays it along with his call. On thirty-one March, the expense of ${rw(TWadv.int)} and the income of ${rw(TWarr.int)} are both closed to the statement of profit and loss.`,
    }),
    sl('check', 'Quick check: interest on arrears', {
      b: 'Find the period first.',
      chk: 'n_interest_arrears',
      n: 'Work out the amount in arrears, the number of months, and apply the Table F rate.',
    }),
    sl('concept', 'Forfeiture of shares', {
      v: vForfeit,
      b: 'Forfeiture **cancels** the shares: reverse what was called up, clear what is unpaid, and keep what was received.',
      n: 'If a shareholder still does not pay after notice, the directors may forfeit the shares, as the articles allow. The shares are cancelled. We debit share capital with the amount called up on them, clear the unpaid amounts, and credit the money already received to share forfeiture. If the premium was never received, we also cancel it by debiting securities premium.',
    }),
    sl('example', 'Worked example 8: forfeiting Rudra\'s shares', {
      b: `On 1 November 2026, Khamaj forfeits Rudra's ${inr(600)} shares. He paid only ₹3 a share on application; the premium due with allotment was never received.`,
      v: vKSfj,
      n: `Rudra's shares were called up to ten rupees, so share capital is debited with ${rw(KSf.sc)}. The premium of ${rw(KSf.sp)} was never received, so it is cancelled. His unpaid allotment and call, ${rw(KSrudra.unpaidAll)}, are cleared from calls in arrears. What he did pay, ${rw(KSf.sf)}, is credited to share forfeiture.`,
    }),
    sl('check', 'Quick check: match the postings', {
      b: 'Debit or credit, and which account?',
      chk: 'match_forfeit',
      n: 'Match each amount in a forfeiture and reissue with the way it is posted.',
    }),
    sl('concept', 'Reissue of forfeited shares', {
      v: vReissue,
      bl: ['The **discount** on reissue may not exceed the amount **forfeited on those shares**.', 'The rest of that amount is a capital profit: **Share Forfeiture A/c Dr. To Capital Reserve A/c**.'],
      n: 'Forfeited shares may be reissued at par, at a premium or at a discount. Any discount is taken out of the share forfeiture account, so it can never be more than the amount forfeited on the shares being reissued. Whatever is left of that amount is a capital profit and goes to capital reserve. Amounts on shares not yet reissued stay in share forfeiture.',
    }),
    sl('example', 'Worked example 9: reissuing at a discount', {
      b: `On 1 December 2026, Khamaj reissues ${inr(400)} of Rudra's shares at ₹9 each as fully paid.`,
      v: vKSrj,
      n: `The four hundred shares carry ${rw((KSf.sf * 400) / 600)} of forfeited money, three rupees a share. The discount allowed is one rupee a share, ${rw(KSr.disc)}, well within the limit. The remaining ${rw(KSr.toCR)} is moved to capital reserve. The ${rw(KSr.sfLeft)} on the other two hundred shares stays in share forfeiture.`,
    }),
    sl('diagram', 'What happened to the forfeited money', {
      v: vWaterfall,
      n: 'Follow the share forfeiture account step by step. It starts with the money Rudra paid. The discount on reissue uses part of it. The gain on the reissued shares moves to capital reserve. What remains belongs to the shares that have not yet been reissued, and it will be shown with share capital.',
    }),
    sl('check', 'Quick check: the lowest reissue price', {
      b: 'How large can the discount be?',
      chk: 'm_max_discount',
      n: 'Compare the discount per share with the amount forfeited per share.',
    }),
    sl('concept', 'Disclosure under Schedule III Part I', {
      v: vWhereBS,
      n: 'The balance sheet follows Schedule Three of the Companies Act. Share capital appears under shareholders funds, with a note that shows authorised, issued and subscribed capital. Calls in arrears are deducted, and forfeited shares not yet reissued are added. Securities premium and capital reserve go to reserves and surplus, while calls in advance are a current liability.',
    }),
    sl('example', 'Worked example 10: the Note on Share Capital', {
      b: 'Khamaj at 31 March 2027: authorised capital 1,00,000 shares of ₹10; Tushita\'s call is still unpaid; 200 forfeited shares are not yet reissued.',
      v: vKSnote,
      n: `Subscribed capital is split in two. Most shares are fully paid. Tushita's five hundred shares are fully called but not fully paid, so her arrears of ${rw(KS.bal(ACC.cia))} are deducted. The ${rw(KSr.sfLeft)} on forfeited shares is added. Share capital comes to ${rw(KSnote.total)}.`,
    }),
    sl('example', 'Worked example 10 (continued): the balance sheet', {
      b: `Reserves and Surplus: securities premium ${rs(-KS.bal(ACC.sp))} (after cancelling Rudra's unpaid premium) and capital reserve ${rs(-KS.bal(ACC.cr))}.`,
      v: vKSbs,
      n: `Share capital and reserves together come to ${rw(KSbs.total)}. On the assets side, the bank account built up from every receipt, refund and reissue holds exactly the same amount. The two sides agree, which is the final check that every entry in the chapter was right.`,
    }),
    sl('check', 'Quick check: forfeited shares', {
      b: 'Where does the balance go?',
      chk: 'm_forfeited_shown',
      n: 'Decide where an amount forfeited on shares not yet reissued appears in the balance sheet.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up: calls in arrears are a debit, deducted from capital, and may carry interest up to ten per cent. Calls in advance are a liability and may earn interest up to twelve per cent. Forfeiture cancels the shares and keeps what was paid. A reissue discount cannot exceed the forfeited amount, and the gain on reissued shares becomes capital reserve.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'For forfeiture, write a **working per shareholder**: called up, premium unpaid, unpaid, forfeited.',
        'Debit Securities Premium on forfeiture **only** if the premium was not received.',
        'Capital reserve = forfeited on the **reissued** shares − discount; never the whole forfeiture balance.',
        'Interest periods: advance **until** the call date; arrears **from** the call date to payment.',
        'Check your balance sheet: share capital + reserves + liabilities = cash at bank (and other assets).',
      ],
      n: 'In the exam, set out a small working for each defaulter before the forfeiture entry. Cancel premium only when it was not received. Calculate capital reserve only on the shares actually reissued. Find the right period for interest. And finish with the balance sheet check: the funds raised should equal the cash in the bank and other assets.',
    }),
  ],
});

// Narration house rules on top of lib.mjs: no digits, no rupee sign, no slashes, ampersands or per-cent signs, no capitals runs.
for (const d of [part1, part2])
  for (const s of d.slides) {
    const m = /\d|₹|[\/&%]|\b[A-Z]{2,}\b/.exec(s.narration);
    check(!m, `narration of part ${d.part} ${s.id} has "${m?.[0]}"`);
  }

// ---------------------------------------------------------------- notes
const vNoteForm = table(
  ['Note on Share Capital (format)', '₹'],
  [['**Authorised capital:** … equity shares of ₹… each', '…'], ['**Issued capital:** … equity shares of ₹… each', '…'], ['**Subscribed capital**', ''], ['Subscribed and fully paid up: … shares of ₹… each', '…'], ['Subscribed but not fully paid up: … shares of ₹… each, ₹… called up', '…'], ['Less: Calls in arrears (calls unpaid)', '(…)'], ['Add: Forfeited shares (amount originally paid up)', '…'], ['**Total** (to the balance sheet)', '…']],
  'Format of the note on share capital: authorised and issued capital for information; subscribed capital split into fully paid and not fully paid, less calls in arrears, plus forfeited shares, giving the total carried to the balance sheet',
);
const N = notes({
  title: 'Issue and Forfeiture of Shares — Notes',
  sections: [
    {
      h: '1. Issue of shares at par and at a premium',
      t: 1,
      b: "A company issues shares under the **Companies Act, 2013**. Each share has a **face (nominal) value**; share capital is always credited at that value. The money is usually collected in instalments: **application**, **allotment** and **calls**.\n\n**Entries (issue at par)**\n- Bank A/c Dr. To Equity Share Application A/c (application money received)\n- Equity Share Application A/c Dr. To Equity Share Capital A/c (on allotment)\n- Equity Share Allotment A/c Dr. To Equity Share Capital A/c (allotment money due)\n- Bank A/c Dr. To Equity Share Allotment A/c (allotment money received)\n- Equity Share First Call A/c Dr. To Equity Share Capital A/c; Bank A/c Dr. To Equity Share First Call A/c\n\n**Issue at a premium:** the instalment that carries the premium is split: Equity Share Allotment A/c Dr. To Equity Share Capital A/c, To Securities Premium A/c. Under **Section 52**, securities premium may be used only for capital purposes (writing off preliminary expenses, writing off the expenses, commission or discount on an issue of securities, the premium payable on redemption of preference shares or debentures, buy-back of own securities); never for dividends.\n\n**Check:** capital parts of all instalments = face value; instalment accounts close at nil.\n\n*Not in the ISC 2027 syllabus for this chapter:* bonus shares, rights shares, private placement, sweat equity shares and employee stock option schemes; reservations for small individual participants and minimum tradable lots.",
      terms: [
        ['Face value', 'The nominal value of a share stated in the memorandum; share capital is credited at this amount.'],
        ['Securities premium', 'The amount received on an issue of shares above their face value; a capital receipt kept in the Securities Premium Account.'],
      ],
      v: vParEntries,
      vs: [vYBj, vSec52, vBGcap, vPerShare],
    },
    {
      h: '2. Journal proper, cash book and ledger accounts',
      t: 1,
      b: "When a company keeps a **cash book**, every receipt and payment through the bank is recorded in its bank column; the **journal proper** keeps only entries that move no cash.\n\n| In the cash book | In the journal proper |\n|---|---|\n| Application, allotment and call money received | Application money transferred to share capital |\n| Refund of application money | Allotment money due; call money due |\n| Arrears and calls in advance received | Forfeiture; transfer to capital reserve |\n\nA mixed entry (application money transferred with a refund) is split: the transfer stays in the journal proper and the refund is a payment in the cash book.\n\n**Ledger accounts:** Equity Share Capital A/c (credit balance = amount called up), instalment accounts (close at nil), Calls in Arrears A/c (debit), Calls in Advance A/c (credit), Securities Premium A/c (credit), Share Forfeiture A/c (credit).",
      terms: [
        ['Journal proper', 'The journal used for entries that do not pass through cash or bank when a cash book is kept.'],
        ['Cash book (bank column)', 'The book of original entry for receipts and payments through the bank; its balance is cash at bank.'],
      ],
      v: vJPvCB,
      vs: [vYBcb],
    },
    {
      h: '3. Shares for consideration other than cash',
      t: 2,
      b: "**To promoters** for their services: Incorporation Costs A/c (or Goodwill A/c) Dr. To Equity Share Capital A/c.\n\n**To underwriters** for their commission: Underwriting Commission A/c Dr. To Underwriters' A/c; Underwriters' A/c Dr. To Equity Share Capital A/c (and Securities Premium A/c). Commission on shares may not exceed **5% of the issue price** or the rate authorised by the articles, **whichever is less**.\n\n**To vendors** for assets: Sundry Assets A/c Dr. To Vendor's A/c; Vendor's A/c Dr. To Equity Share Capital A/c, To Securities Premium A/c (and To Bank A/c for any cash part).\n\n**For a business:** Business Purchase A/c Dr. To Vendor's A/c; Assets A/cs Dr., Goodwill A/c Dr. (consideration > net assets) To Liabilities A/cs, To Business Purchase A/c, To Capital Reserve A/c (consideration < net assets).\n\n**Number of shares** = amount payable in shares ÷ issue price per share (face value + premium).",
      terms: [
        ['Purchase consideration', 'The price agreed to be paid to a vendor for assets or a business, in cash, shares or both.'],
        ['Underwriting commission', 'Payment to underwriters for undertaking to take up shares the public does not subscribe; limited by law.'],
      ],
      v: vNonCash,
      vs: [vDLj, vBPj],
    },
    {
      h: '4. Calls in arrears and calls in advance, with interest',
      t: 3,
      b: "**Calls in arrears:** call money not paid by the due date. Calls in Arrears A/c Dr. To Equity Share Call A/c; on receipt, Bank A/c Dr. To Calls in Arrears A/c. Debit balance; deducted from subscribed capital in the Note on Share Capital.\n\n**Calls in advance:** money received for a call not yet made. Bank A/c Dr. To Calls in Advance A/c; when the call is made, Calls in Advance A/c Dr. To Equity Share Call A/c. Credit balance; **Other Current Liabilities**.\n\n**Interest (as per the articles; if they are silent, Table F of Schedule I):**\n- On calls in arrears, **up to 10% p.a.** from the due date to the date of payment (the Board may lower or waive it): Sundry Shareholders A/c Dr. To Interest on Calls in Arrears A/c; Bank A/c Dr. To Sundry Shareholders A/c; at the year end Interest on Calls in Arrears A/c Dr. To Statement of Profit and Loss.\n- On calls in advance, **up to 12% p.a.** from the date of receipt to the date the call is due (unless the general meeting directs otherwise): Interest on Calls in Advance A/c Dr. To Sundry Shareholders A/c; Sundry Shareholders A/c Dr. To Bank A/c; at the year end Statement of Profit and Loss Dr. To Interest on Calls in Advance A/c.\n\n**Formula:** interest = amount × rate/100 × months/12.",
      terms: [
        ['Calls in arrears', 'Amount called up on shares but not paid by the due date.'],
        ['Calls in advance', 'Amount received from a shareholder for a call that has not yet been made.'],
      ],
      v: vInterest,
      vs: [vArrears, vAdvance, vTWwork, vTimeline, vTWj],
    },
    {
      h: '5. Over-subscription, under-subscription and pro-rata allotment',
      t: 4,
      b: "**Minimum subscription:** a public issue may be allotted only if at least **90%** of it is subscribed; otherwise all application money is refunded.\n\n**Under-subscription** (at least 90%): record every entry on the number of shares actually applied for and allotted.\n\n**Over-subscription:**\n1. **Reject** some applications: refund their money.\n2. **Pro rata**: excess application money is adjusted towards the money due on allotment (first the capital part, then any premium due); any surplus is refunded, or, if the articles permit, credited to Calls in Advance.\n3. A **combination** of rejection, full allotment and pro rata.\n\n**Transfer entry:** Equity Share Application A/c Dr. To Equity Share Capital A/c (and Securities Premium A/c if premium is on application), To Equity Share Allotment A/c (excess adjusted), To Bank A/c (refund).\n\n**Working:** shares applied by an allottee = shares allotted × applied ÷ allotted in the group; excess = (applied − allotted) × application money per share.",
      terms: [
        ['Minimum subscription', 'The least amount that must be subscribed before a company may allot shares in a public issue: ninety per cent of the issue.'],
        ['Pro-rata allotment', 'Allotment of shares to applicants in proportion to the shares they applied for.'],
      ],
      v: vOverUnder,
      vs: [vMQwork, vMQj, vAppSplit],
    },
    {
      h: '6. Forfeiture of shares',
      t: 5,
      b: "The directors may **forfeit** the shares of a member who fails to pay a call after notice, as the articles allow. Forfeiture cancels the shares.\n\n**Shares issued at par:** Equity Share Capital A/c Dr. (amount called up) To Calls in Arrears A/c (amount unpaid), To Share Forfeiture A/c (amount received).\n\n**Shares issued at a premium:**\n- premium **received**: same entry; Securities Premium A/c is not touched;\n- premium **not received**: also Securities Premium A/c Dr. with the premium unpaid (it is cancelled).\n\n**Pro-rata allottees:** excess application money adjusted towards allotment counts as money received, so it is included in the amount forfeited.\n\n**Check:** amount forfeited = money received on those shares − premium received.",
      terms: [
        ['Forfeiture of shares', 'Cancellation of shares for non-payment of calls, with the money already paid kept by the company.'],
        ['Share Forfeiture Account', 'Account credited with the money received on forfeited shares (excluding premium received).'],
      ],
      v: vForfeit,
      vs: [vKSissue, vKSfj],
    },
    {
      h: '7. Reissue of forfeited shares and capital reserve',
      t: 5,
      b: "Forfeited shares may be reissued at par, at a premium or at a discount, as fully paid or partly paid.\n\n- Bank A/c Dr. (price), Share Forfeiture A/c Dr. (discount) To Equity Share Capital A/c (amount credited as paid up), To Securities Premium A/c (any excess over that amount).\n- **Limit:** discount per share ≤ amount forfeited per share.\n- **Capital reserve:** Share Forfeiture A/c Dr. To Capital Reserve A/c with (amount forfeited on the shares reissued − discount on them).\n- The amount forfeited on shares **not yet reissued** stays in the Share Forfeiture Account.\n\n**Working:** forfeited per share × shares reissued − discount = capital reserve.",
      terms: [
        ['Reissue', 'Sale of forfeited shares to a new holder, at par, premium or discount.'],
        ['Capital reserve', 'Reserve created from capital profits, such as the gain on reissue of forfeited shares; not available for dividends.'],
      ],
      v: vReissue,
      vs: [vKSrj, vWaterfall],
    },
    {
      h: '8. Disclosure of share capital (Schedule III Part I)',
      t: 6,
      b: "**Balance sheet (vertical form):** I. Equity and Liabilities → 1. Shareholders' Funds → (a) Share Capital (Note), (b) Reserves and Surplus (Note); Current Liabilities → Other Current Liabilities (calls in advance and interest accrued on them).\n\n**Note on Share Capital:** authorised capital and issued capital (for information); subscribed capital split into *subscribed and fully paid up* and *subscribed but not fully paid up*; **less** calls in arrears (calls unpaid); **add** forfeited shares (amount originally paid up).\n\n**Reserves and Surplus:** Securities Premium, Capital Reserve.\n\n**Check:** share capital = Share Capital A/c balance − calls in arrears + Share Forfeiture A/c balance.",
      terms: [
        ['Subscribed capital', 'The part of issued capital taken up by shareholders.'],
        ['Paid-up capital', 'Called-up capital less calls unpaid; the amount actually received on the shares.'],
      ],
      v: vWhereBS,
      vs: [vNoteForm, vKSnote, vKSbs],
    },
  ],
  tips: "**Common mistakes**\n- Crediting the premium to share capital, or treating it as profit.\n- Refunding the whole excess on pro-rata allotment instead of adjusting it towards allotment first.\n- Putting receipts in the journal when the question says a cash book is kept.\n- Dividing the vendor's amount by the face value instead of the issue price.\n- Paying underwriting commission above five per cent of the issue price.\n- Debiting Securities Premium on forfeiture when the premium was received.\n- Transferring the whole Share Forfeiture balance to Capital Reserve when only some shares are reissued.\n- Showing calls in advance as share capital; they are a current liability.\n- Taking the wrong period for interest on calls.\n\n**How marks are usually awarded (SOYL chapter tests on the ISC default pattern)**\n- 1 mark: objective items.\n- 2 marks: two or three entries (forfeiture and reissue, interest), or a Note on Share Capital.\n- 3 marks: a set of entries for an issue (pro rata, premium, vendor), a cash book with the journal proper, or a balance sheet extract.\n- 5 marks in parts, e.g. (a) 2 + (b) 3: working and entries, entries and a ledger account, or entries and a balance sheet.\n- Full practical (practice, 8 marks): working notes 1–2, journal 4–5, ledger account or balance sheet 2. The ISC 2027 weightage for Issue of Shares in Paper I is 11 marks.\n\n**Figures in SOYL practice** are imagined; your board paper will give its own.",
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['**Face value** of a share', 'The nominal value stated in the memorandum; share capital is always credited at this amount.', 'definition', 1],
  ['**Securities premium**', 'Amount received above face value; credited to Securities Premium A/c, a capital receipt.', 'definition', 1],
  ['Section 52 uses of securities premium (any two)', 'Writing off preliminary expenses; writing off issue expenses, commission or discount; premium on redemption; buy-back.', 'fact', 1],
  ['Can securities premium pay a dividend?', 'No: it is a capital receipt.', 'concept', 1],
  ['Allotment money due with premium', 'Equity Share Allotment A/c Dr. To Equity Share Capital A/c, To Securities Premium A/c.', 'fact', 1],
  ['Cash book kept: where does the application money received go?', 'Cash book (receipts side), not the journal proper.', 'exam-tip', 1],
  ['Journal proper (with a cash book)', 'Only non-cash entries: transfers and amounts falling due.', 'concept', 1],
  ['Shares to promoters', 'Incorporation Costs A/c (or Goodwill A/c) Dr. To Equity Share Capital A/c.', 'fact', 2],
  ['Maximum underwriting commission on shares', '5% of the issue price or the articles\' rate, whichever is less.', 'fact', 2],
  ['Shares to underwriters', "Underwriting Commission A/c Dr. To Underwriters' A/c; Underwriters' A/c Dr. To Share Capital (and Premium).", 'fact', 2],
  ['Number of shares to a vendor', 'Amount payable in shares ÷ issue price per share.', 'exam-tip', 2],
  ['Purchase consideration more than net assets', 'Difference debited to Goodwill A/c.', 'fact', 2],
  ['Purchase consideration less than net assets', 'Difference credited to Capital Reserve A/c.', 'fact', 2],
  ['**Calls in arrears**', 'Call money due but not received; debit balance deducted from subscribed capital.', 'definition', 3],
  ['**Calls in advance**', 'Money received for a call not yet made; credit balance under Other Current Liabilities.', 'definition', 3],
  ['Interest on calls in arrears (Table F)', 'Up to 10% p.a., from the due date to payment; an income.', 'fact', 3],
  ['Interest on calls in advance (Table F)', 'Up to 12% p.a., from receipt to the due date of the call; an expense.', 'fact', 3],
  ['Interest on calls: formula', 'Amount × rate/100 × months/12.', 'exam-tip', 3],
  ['**Minimum subscription**', '90% of a public issue; below it, all application money is refunded.', 'definition', 4],
  ['Pro-rata allotment: excess application money', 'Adjusted towards allotment first; only the surplus is refunded (or held as calls in advance).', 'concept', 4],
  ['Shares applied for by a pro-rata allottee', 'Shares allotted × applied ÷ allotted in the group.', 'exam-tip', 4],
  ['Under-subscription (at least 90%)', 'Entries are made on the shares actually applied for and allotted.', 'fact', 4],
  ['Forfeiture entry (issued at par)', 'Share Capital Dr. (called up) To Calls in Arrears (unpaid), To Share Forfeiture (received).', 'fact', 5],
  ['Securities Premium on forfeiture', 'Debited only if the premium was not received.', 'concept', 5],
  ['Amount forfeited', 'Money received on the shares less any premium received.', 'exam-tip', 5],
  ['Maximum discount on reissue', 'The amount forfeited on the shares reissued.', 'fact', 5],
  ['Capital reserve on reissue', 'Amount forfeited on the reissued shares − discount allowed on them.', 'exam-tip', 5],
  ['Share Forfeiture balance on shares not reissued', 'Added to subscribed capital in the Note on Share Capital.', 'fact', 6],
  ['Authorised capital in the balance sheet', 'Shown in the Note on Share Capital for information; not added.', 'fact', 6],
  ['Securities premium and capital reserve in the balance sheet', "Reserves and Surplus, under Shareholders' Funds.", 'fact', 6],
  ['Share capital in the balance sheet', 'Share Capital A/c − calls in arrears + Share Forfeiture A/c.', 'exam-tip', 6],
]);

// ---------------------------------------------------------------- tests (ISC class defaults, item for item)
const T_SHORT = test({
  kind: 'short',
  blueprint: 'isc-12-default-chapter-test-short',
  title: 'Chapter test (short) — Issue and Forfeiture of Shares',
  duration: 50,
  sections: [
    { id: 'A', title: 'Section A - Objective (5 marks)', instr: 'Answer all questions. Multiple-choice and assertion-reason items carry 1 mark each.', items: ['m_premium_credit', 'm_promoters', 'm_forfeit_par', 'm_cadv_nature', 'ar_oversub'] },
    { id: 'B', title: 'Section B - Short answer (4 marks)', instr: 'Answer both questions. Internal choice in the second question.', items: ['s2_par_entries', { attempt: 1, keys: ['s2_promoter_underwriter', 's2_interest_entries'] }] },
    { id: 'C', title: 'Section C - Short answer (6 marks)', instr: 'Answer both questions. Internal choice in the second question. Show your working.', items: ['s3_prorata_entries', { attempt: 1, keys: ['s3_forfeit_prem', 's3_vendor_business'] }] },
    { id: 'D', title: 'Section D - Long answer (5 marks)', instr: 'Answer the question. It is set in parts (2 + 2 + 1 marks); show your working.', items: ['l5_forfeit_reissue'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'isc-12-default-chapter-test-long',
  title: 'Chapter test (long) — Issue and Forfeiture of Shares',
  duration: 100,
  sections: [
    { id: 'A', title: 'Section A - Objective (12 marks)', instr: 'Answer all questions. Multiple-choice and assertion-reason items carry 1 mark each.', items: ['m_sec52', 'm_cash_book', 'm_allot_due_prem', 'm_underwriting_cap', 'm_capital_reserve_bp', 'm_cia_shown', 'm_min_sub', 'm_prorata_ratio', 'm_forfeit_prem_not_received', 'm_capital_reserve_all', 'ar_premium', 'ar_reissue'] },
    { id: 'B', title: 'Section B - Short answer (6 marks)', instr: 'Answer all three questions. Internal choice in the last question.', items: ['s2_oversub_options', 's2_note', { attempt: 1, keys: ['s2_forfeit_reissue', 's2_arrears_vs_advance'] }] },
    { id: 'C', title: 'Section C - Short answer (12 marks)', instr: 'Answer all four questions. Internal choice in the last question. Show your working.', items: ['s3_premium_journal', 's3_arrears_advance', 's3_reissue_cr', { attempt: 1, keys: ['s3_cashbook', 's3_bs_extract'] }] },
    { id: 'D', title: 'Section D - Long answer (10 marks)', instr: 'Answer both questions. Internal choice in the second question. Each is set in parts (3 + 2 or 2 + 3 marks).', items: ['l5_prorata_full', { attempt: 1, keys: ['l5_prorata_forfeit', 'l5_disclosure'] }] },
  ],
});

// Deck checks never appear in the tests.
const inTests = new Set([T_SHORT, T_LONG].flatMap((t) => t.sections.flatMap((s) => s.items.map((i) => i.question_id))));
for (const d of [part1, part2]) for (const s of d.slides) if (s.check_question_id) check(!inTests.has(s.check_question_id), `deck check ${s.check_question_id} is also in a test`);

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t06 of isc-12-accounts-ch06 only (issue at par and premium with the journal proper and cash book and ledger accounts; shares to promoters, underwriters and vendors; calls in arrears and in advance with interest per the articles or Table F; over- and under-subscription with pro-rata allotment; forfeiture of shares issued at par or premium and reissue with capital reserve; Schedule III Part I disclosure). Removed topics appear only as one note in notes section 1.',
    originality: 'every company, person and figure is imagined and labelled as such; no textbook illustration or exercise and no CISCE specimen or past-paper item is reused; companies, people and set-ups differ from the CBSE 12 Accountancy chapters and ISC ch01–ch05',
    data: 'every issue is posted to its own double-entry books by acc.mjs and asserted: entries balance, instalment accounts close, pro-rata allotments are whole shares, the 90% minimum subscription holds, forfeiture equals money received less premium received, reissue discounts stay within the amount forfeited, interest is whole rupees at the stated rate and period, notes agree with the ledger and balance sheets total with cash at bank from the Bank Account',
    accounting: 'ISC 2027 scope applied: journal proper and cash book; promoters through incorporation costs or goodwill; underwriting commission capped at five per cent of the issue price or the articles, whichever is less; separate Calls in Arrears and Calls in Advance accounts; interest at the articles\' rate or Table F (10% arrears, 12% advance); excess application money adjusted towards allotment before refund; Securities Premium debited on forfeiture only when unpaid; capital reserve only on reissued shares; Schedule III Part I notes',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
