// Build ISC 12 Accounts ch07 Issue of Debentures. Run from platform/:
//   npx tsx content/authored/economics-commerce/isc-12-accounts-ch07/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';
import { rs, inr, check, sum, journal, tAccount, note, bsExtract, mdTable, lot, lotEntry, lumpSum, instalments, vendorLot, purchase, writeOff, interestTDS, interestFor, terms, rw, pw, words, SP, PRD, LOSS, DISC, CR, PL } from './acc.mjs';

setUnit('isc-12-accounts-ch07', 'economics-commerce');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const eq = (a, b, what) => check(JSON.stringify(a) === JSON.stringify(b), `deck figure ${what}: got ${JSON.stringify(a)}, expected ${JSON.stringify(b)}`);
const AA = 'Debenture Application and Allotment A/c';
const jt = (entries, alt, caption) => {
  const j = journal(entries);
  return table(j.headers, j.rows, alt, caption);
};

// ---------------------------------------------------------------- deck figures (computed, never typed)
// Part 1 running company: Doddabetta Tea Machinery Ltd, Ketti (imagined), year 2025-26.
const DW1 = lot({ n: 6000, rate: 9 });
const DW1i = lumpSum(DW1, { applied: 7500 });
eq([DW1i.got, DW1i.refund, DW1.received], [750000, 150000, 600000], 'WE1');
const DW2 = lot({ n: 10000, rate: 10, iss: 6 });
const DW2i = instalments(DW2, { per: { app: 30, allot: 46, call: 30 }, dates: { app: '1 Jun 2025', allot: '1 Jul 2025', call: '1 Oct 2025' } });
eq([DW2i.appCash, DW2i.allotDue, DW2i.allotDebCredit, DW2.premium, DW2i.callDue, DW2i.cash], [300000, 460000, 400000, 60000, 300000, 1060000], 'WE2');
// WE3 Kodanad Tea Boxes Ltd (imagined): debentures of ₹500 at a discount.
const KT = lot({ n: 3000, face: 500, rate: 8, iss: -3 });
const KTi = lumpSum(KT);
eq([KT.price, KT.received, KT.discount], [485, 1455000, 45000], 'WE3');
// WE4 the six combinations on 2,000 debentures of ₹100.
const SIX = [[0, 0], [-5, 0], [8, 0], [0, 10], [-5, 10], [8, 10]].map(([iss, red]) => lot({ n: 2000, rate: 9, iss, red }));
eq(SIX.map((L) => [L.received, L.loss]), [[200000, 0], [190000, 10000], [216000, 0], [200000, 20000], [190000, 30000], [216000, 20000]], 'WE4');
for (const L of SIX) check(L.received + L.loss === L.nominal + L.premium + L.redPremium, 'six-case identity');
// WE5 and WE6 Doddabetta: discount and premium on redemption; write-off from WE2's premium first.
const DW5 = lot({ n: 5000, rate: 11, iss: -6, red: 9 });
const DW5i = lumpSum(DW5, { date: '1 Dec 2025' });
const DW6 = writeOff(DW5.loss, { sp: DW2.premium, date: '31 Mar 2026' });
eq([DW5.received, DW5.discount, DW5.redPremium, DW5.loss, DW6.fromSP, DW6.fromPL, DW6.fromCR], [470000, 30000, 45000, 75000, 60000, 15000, 0], 'WE5-6');
const DW6ledger = tAccount([['1 Dec 2025', '11% Debentures A/c (discount)', DW5.discount], ['1 Dec 2025', PRD, DW5.redPremium]], [['31 Mar 2026', SP, DW6.fromSP], ['31 Mar 2026', PL, DW6.fromPL]], { dates: true });

// Part 2 running company: Kalsubai Hydraulic Jacks Ltd, Akole (imagined).
const KV = vendorLot({ amount: 477000, rate: 9, iss: 6 });
eq([KV.n, KV.premium], [4500, 27000], 'WE7');
const KB = vendorLot({ amount: 658000, rate: 11, iss: -6, red: 5 });
const KBp = purchase({ assets: [['Building', 340000], ['Plant', 260000], ['Stock', 130000], ['Debtors', 70000]], liabs: [['Creditors', 80000]], pc: KB.received, vendor: 'Ghoti Forgings A/c', date: '1 Oct 2025' });
const KBw = writeOff(KB.loss, { sp: KV.premium, date: '31 Mar 2026' });
eq([KB.n, KB.discount, KB.redPremium, KB.loss, KBp.net, KBp.capRes, KBw.fromSP, KBw.fromPL], [7000, 42000, 35000, 77000, 720000, 62000, 27000, 50000], 'WE8');
const HG = { promo: lot({ n: 800, rate: 10 }), under: lot({ n: 250, rate: 10 }) };
eq([HG.promo.nominal, HG.under.nominal], [80000, 25000], 'WE9');
const KC = { loan: 500000, n: 6000 };
const KCl = lot({ n: KC.n, rate: 9 });
const KCa = lot({ n: 8000, rate: 10 });
const KCai = instalments(KCa, { per: { app: 25, allot: 35, call: 40 }, advance: 300, arrears: { call: 200 }, dates: { app: '1 May 2024', allot: '1 Jun 2024', call: '1 Sep 2024' } });
const KCarrInt = interestFor(KCai.callArrears, 10, 3);
const KCadvInt = interestFor(KCai.advanceCash, 12, 3);
eq([KCai.allotCash, KCai.advanceCash, KCai.callCash, KCai.callArrears, KCarrInt, KCadvInt], [292000, 12000, 300000, 8000, 200, 360], 'WE11');
const KI = { h1: interestTDS({ nominal: 800000, rate: 10, months: 6, date: '30 Sep 2025', deposit: '7 Oct 2025' }), h2: interestTDS({ nominal: 800000, rate: 10, months: 6, date: '31 Mar 2026' }) };
const KIt = KI.h1.gross + KI.h2.gross;
eq([KI.h1.gross, KI.h1.tax, KI.h1.net, KIt], [40000, 4000, 36000, 80000], 'WE12');
// WE13 disclosure as at 31 March 2026 (the tax deducted from the March interest is still payable).
const KD = { cur: 150000 };
const KDlt = note('Note 2: Long-term borrowings', [
  ['10% Debentures (8,000 of ₹100 each)', KCa.nominal],
  ['11% Debentures (7,000 of ₹100 each, issued to a vendor, redeemable at a premium of 5%)', KB.nominal],
  ['9% Debentures (3,000 of ₹100 each, issued to a vendor)', KV.nominal - KD.cur],
  ['Bank loan (secured by the issue of 6,000 9% debentures as collateral security)', KC.loan],
  ['9% Debentures (6,000 of ₹100 each, issued as collateral security)', [['9% Debentures', KCl.nominal], ['Debenture Suspense', -KCl.nominal]]],
], 2300000);
const KDrs = note('Note 1: Reserves and Surplus', [['Capital Reserve', KBp.capRes], ['Securities Premium', [['Received on issue to the vendor of the press', KV.premium], ['Loss on issue of debentures written off', -KBw.fromSP]]]], 62000);
const KDbs = bsExtract('Balance Sheet of Kalsubai Hydraulic Jacks Ltd (imagined) as at 31 March 2026 (extract)', [
  ["Shareholders' funds", [['Reserves and Surplus', '1', KDrs.total]]],
  ['Non-current liabilities', [['Long-term borrowings', '2', KDlt.total], ['Other long-term liabilities', '3', KB.redPremium]]],
  ['Current liabilities', [['Short-term borrowings', '4', KD.cur], ['Other current liabilities (TDS payable on the March interest)', '5', KI.h2.tax]]],
]);

// ---------------------------------------------------------------- visuals: Part 1
const vRoute1 = flow('LR', ['Debentures and the Companies Act, 2013', 'Issue for cash: lump sum or instalments', 'Par, premium or discount', 'Six issue-redemption terms', 'Writing off capital losses'], 'Route map of Part 1: debentures under the Companies Act two thousand thirteen, issue for cash in a lump sum or instalments, issue at par, premium or discount, the six combinations of issue and redemption terms, and writing off capital losses', 'Part 1 at a glance');
const vLaw = table(
  ['Point', 'Companies Act, 2013'],
  [
    ['What a debenture is', 'Section 2(30): an instrument of debt, secured or not; the holder is a **creditor**'],
    ['Voting', 'Section 71: debentures cannot carry voting rights'],
    ['Issue at a discount', 'Allowed for debentures; barred for shares by Section 53 (sweat equity apart)'],
    ['Premium received', 'Credited to Securities Premium; Section 52 lists its uses, incl. writing off discount on debentures'],
    ['Return to the holder', 'Interest at the coupon rate on face value: a charge against profit'],
  ],
  'Table of points from the Companies Act two thousand thirteen: a debenture is an instrument of debt and its holder a creditor; debentures carry no voting rights; debentures may be issued at a discount though shares may not; premium is credited to securities premium whose uses include writing off discount on debentures; interest is a charge against profit',
);
const vWays = flow('TB', ['Lump sum: whole price with the application', 'Instalments: application → allotment → call(s)', 'Over-subscription: excess money refunded', 'Debentures Account always credited at face value'], 'Flow of ways to issue debentures for cash: in a lump sum with the application, or in instalments on application, allotment and calls; excess application money is refunded; the debentures account is always credited at face value', 'Issue for cash');
const vWE1 = jt(DW1i.entries, `Journal of worked example one for Doddabetta Tea Machinery: application money of ${inr(DW1i.got)} received on seven thousand five hundred applications, ${inr(DW1.n)} debentures allotted for ${inr(DW1.received)}, and ${inr(DW1i.refund)} refunded`, 'Doddabetta Tea Machinery Ltd (imagined): 6,000 9% debentures of ₹100 at par, payable in full.');
const vStages = table(
  ['Stage', 'When it falls due', 'When it is received'],
  [
    ['Application', 'Debenture Application A/c Dr. To Debentures A/c', 'Bank A/c Dr. To Debenture Application A/c'],
    ['Allotment', 'Debenture Allotment A/c Dr. (+ Discount or Loss on Issue Dr.) To Debentures A/c, Securities Premium A/c, Premium on Redemption A/c', 'Bank A/c Dr. To Debenture Allotment A/c'],
    ['First and final call', 'Debenture First and Final Call A/c Dr. To Debentures A/c', 'Bank A/c Dr. To Debenture First and Final Call A/c'],
    ['Excess applications', '—', 'Debenture Application A/c Dr. To Bank A/c (refund)'],
  ],
  'Table of the accounts used at each stage of an issue in instalments: application, allotment with any premium, discount or loss, the first and final call, and the refund of excess application money',
);
const vWE2 = jt(DW2i.entries, `Journal of worked example two: application money ${inr(DW2i.appCash)}, allotment ${inr(DW2i.allotDue)} of which ${inr(DW2.premium)} is securities premium, and call ${inr(DW2i.callDue)}, each made due and received`, 'Doddabetta Tea Machinery Ltd (imagined): 10,000 10% debentures of ₹100 at a premium of 6%.');
const vWE3 = jt(KTi.entries, `Journal of worked example three: Kodanad Tea Boxes receives ${inr(KT.received)} for ${inr(KT.n)} debentures of five hundred rupees issued at a discount of three per cent; the debentures account is credited with ${inr(KT.nominal)} and discount on issue debited with ${inr(KT.discount)}`, 'Kodanad Tea Boxes Ltd (imagined): 3,000 8% debentures of ₹500 at ₹485.');
const vSixRules = table(
  ['Issued at', 'Redeemable at', 'Extra accounts at allotment'],
  [
    ['Par', 'Par', 'None'],
    ['Discount', 'Par', 'Discount on Issue of Debentures Dr.'],
    ['Premium', 'Par', 'Securities Premium Cr.'],
    ['Par', 'Premium', 'Loss on Issue Dr.; Premium on Redemption Cr.'],
    ['Discount', 'Premium', 'Loss on Issue Dr. (discount + redemption premium); Premium on Redemption Cr.'],
    ['Premium', 'Premium', 'Securities Premium Cr.; Loss on Issue Dr.; Premium on Redemption Cr.'],
  ],
  'Table of the six combinations of issue and redemption terms and the extra accounts in the allotment entry: none for par and par; discount on issue for a discount; securities premium for a premium; loss on issue and premium on redemption whenever the debentures are redeemable at a premium',
);
const sixLabel = (L) => `${L.iss > 0 ? `Premium ${L.iss}%` : L.iss < 0 ? `Discount ${-L.iss}%` : 'Par'} / ${L.red ? `premium ${L.red}%` : 'par'}`;
const vWE4 = table(
  ['Issue / redemption', 'Cash (₹)', 'Debentures Cr. (₹)', 'Sec. Premium Cr. (₹)', 'Prem. on Red. Cr. (₹)', 'Discount or Loss Dr. (₹)'],
  SIX.map((L) => [sixLabel(L), inr(L.received), inr(L.nominal), L.premium ? inr(L.premium) : '—', L.redPremium ? inr(L.redPremium) : '—', L.loss ? inr(L.loss) : '—']),
  `Table of worked example four for two thousand debentures of one hundred rupees: cash received, debentures credited at ${inr(SIX[0].nominal)} in every case, securities premium, premium on redemption, and discount or loss on issue, which is ${SIX.map((L) => inr(L.loss)).join(', ')} in the six cases`,
  'Every row satisfies: cash + discount or loss = face value + securities premium + premium on redemption.',
);
const vLine = (() => {
  const s = new Svg(640, 230);
  const lo = 88, hi = 112, x0 = 50, W = 540, y = 120;
  const X = (v) => x0 + ((v - lo) / (hi - lo)) * W;
  const issue = DW5.price, face = DW5.face, redeem = face + DW5.redPer;
  eq([issue, face, redeem, face - issue + (redeem - face)], [94, 100, 109, 15], 'number line');
  check(DW5.n * (redeem - issue) === DW5.loss, 'number line gap × debentures = loss on issue');
  s.arrow(x0 - 10, y, x0 + W + 20, y, { sw: 1.6 });
  for (let v = 90; v <= 110; v += 5) { s.line(X(v), y - 5, X(v), y + 5, { sw: 1.2 }); s.text(X(v), y + 20, `₹${v}`, { size: 12, muted: true }); }
  s.rect(X(issue), y - 34, X(face) - X(issue), 22, { fill: 'red', color: 'accent', sw: 1.2, rx: 2 });
  s.text((X(issue) + X(face)) / 2, y - 23, `discount ₹${face - issue}`, { size: 12, bold: true });
  s.rect(X(face), y - 34, X(redeem) - X(face), 22, { fill: 'yellow', color: 'accent', sw: 1.2, rx: 2 });
  s.text((X(face) + X(redeem)) / 2, y - 23, `premium on redemption ₹${redeem - face}`, { size: 12, bold: true });
  for (const [v, label] of [[issue, `received ₹${issue}`], [face, `face ₹${face}`], [redeem, `repaid ₹${redeem}`]]) { s.dot(X(v), y, 5, 'blue'); s.text(X(v), y + 44, label, { size: 13, bold: true }); }
  s.text(320, 26, `One debenture of Doddabetta: loss on issue ₹${redeem - issue} = ₹${face - issue} + ₹${redeem - face}`, { size: 14, bold: true });
  s.text(320, 205, `× ${inr(DW5.n)} debentures = ${rs(DW5.loss)} debited to Loss on Issue of Debentures`, { size: 13, muted: true });
  return s.visual(
    `Number line for one debenture of Doddabetta Tea Machinery: the company receives ninety-four rupees, the face value is one hundred rupees and it will repay one hundred and nine rupees. The gap of six rupees is the discount and the gap of nine rupees is the premium on redemption; together fifteen rupees per debenture, or ${rw(DW5.loss)} on ${words(DW5.n)} debentures, is the loss on issue`,
    'Positions are computed from the issue and redemption terms.',
  );
})();
const vWE5 = jt(DW5i.entries, `Journal of worked example five: ${inr(DW5.received)} received for ${inr(DW5.n)} debentures issued at ninety-four rupees; at allotment the debentures are credited ${inr(DW5.nominal)}, premium on redemption ${inr(DW5.redPremium)}, and loss on issue ${inr(DW5.loss)} is debited`, 'Doddabetta Tea Machinery Ltd (imagined): 5,000 11% debentures at a discount of 6%, redeemable at a premium of 9%.');
const vOrder = flow('LR', ['Capital loss of the year (discount, loss on issue)', '1. Securities Premium', '2. Statement of Profit and Loss', '3. Capital Reserve'], 'Flow of the ISC order for writing off a capital loss in the year it arises: first securities premium, then the statement of profit and loss, and lastly capital reserve', 'ISC 2027 note: written off in the year of the loss, in this order');
const vWE6 = table(DW6ledger.headers, DW6ledger.rows, `Loss on issue of debentures account of Doddabetta: debited with the discount ${inr(DW5.discount)} and the premium on redemption ${inr(DW5.redPremium)}; credited with ${inr(DW6.fromSP)} from securities premium and ${inr(DW6.fromPL)} from the statement of profit and loss, closing at nil`, 'Loss on Issue of Debentures Account, 2025-26');
const vBar = (() => {
  const s = new Svg(640, 200);
  const X0 = 40, W = 560, total = DW5.loss;
  const parts = [['Securities Premium', DW6.fromSP, 'blue'], ['Statement of Profit and Loss', DW6.fromPL, 'yellow']];
  check(sum(parts.map(([, v]) => v)) === total && DW6.fromCR === 0, 'write-off bar adds to the loss');
  s.text(320, 26, `Loss on issue ${rs(total)}: sources used in the ISC order`, { size: 14, bold: true });
  let x = X0;
  for (const [name, v, color] of parts) {
    const w = (W * v) / total;
    s.rect(x, 60, w, 56, { fill: color, color: 'accent', sw: 1.5, rx: 2 });
    s.text(x + w / 2, 80, `${name.length > 20 && w < 200 ? 'Profit and Loss' : name}`, { size: 12, bold: true });
    s.text(x + w / 2, 100, rs(v), { size: 12 });
    x += w;
  }
  check(Math.abs(x - X0 - W) < 1e-9, 'bar width');
  s.text(320, 150, `Securities premium available: ${rs(DW2.premium)} (all used). Capital Reserve: not needed.`, { size: 12, muted: true });
  return s.visual(`Bar of the loss on issue of ${rw(total)} split by source: securities premium ${rw(DW6.fromSP)} first, then the statement of profit and loss ${rw(DW6.fromPL)}; capital reserve is not needed`, 'Segment widths are computed from the write-off.');
})();
const vSummary1 = table(
  ['Idea', 'Rule'],
  [
    ['Debentures Account', 'Always credited at **face value**'],
    ['Premium on issue', 'Securities Premium A/c (capital receipt)'],
    ['Discount on issue (redeemable at par)', 'Discount on Issue of Debentures A/c'],
    ['Redeemable at a premium', 'Loss on Issue Dr. (discount + redemption premium); Premium on Redemption Cr.'],
    ['Over-subscription', 'Excess application money refunded'],
    ['Capital losses', 'Written off in the year: Securities Premium → Statement of P&L → Capital Reserve'],
  ],
  'Summary table of Part 1: debentures at face value, premium to securities premium, discount on issue, loss on issue with premium on redemption, refunds on over-subscription, and the ISC order for writing off capital losses',
);

// ---------------------------------------------------------------- visuals: Part 2
const vRoute2 = flow('LR', ['Promoters, underwriters, vendors', 'Collateral security', 'Calls in arrears and in advance', 'Interest with TDS', 'Balance Sheet disclosure'], 'Route map of Part 2: debentures to promoters, underwriters and vendors, debentures as collateral security, calls in arrears and in advance, interest with tax deducted at source, and disclosure in the balance sheet', 'Part 2 at a glance');
const vOther = table(
  ['Debentures issued to', 'Entries'],
  [
    ['Promoters (for forming the company)', 'Incorporation Costs A/c (or Goodwill A/c) Dr. To Debentures A/c'],
    ['Underwriters (for commission)', 'Underwriting Commission A/c Dr. To Underwriters A/c; Underwriters A/c Dr. To Debentures A/c'],
    ['Vendor of assets', "Asset A/c Dr. To Vendor's A/c; Vendor's A/c Dr. (+ Discount/Loss Dr.) To Debentures A/c (+ Securities Premium A/c)"],
    ['Vendor of a business', "Business Purchase A/c Dr. To Vendor; Assets Dr. (+ Goodwill) To Liabilities, Business Purchase (+ Capital Reserve); then allotment"],
    ['Number to a vendor', 'Amount payable ÷ issue price per debenture'],
  ],
  'Table of entries for debentures issued for consideration other than cash: to promoters through incorporation costs or goodwill; to underwriters through underwriting commission; to vendors of assets or a business through the vendor account, with goodwill or capital reserve; the number of debentures is the amount payable divided by the issue price',
);
const vWE7 = jt([{ dr: [['Machinery A/c', KV.received]], cr: [['Trimbak Press Makers A/c', KV.received]], nar: 'hydraulic forging press bought from Trimbak Press Makers' }, lotEntry(KV, 'Trimbak Press Makers A/c', `${inr(KV.n)} 9% debentures issued to the vendor at a premium of 6%`)], `Journal of worked example seven: machinery of ${inr(KV.received)} bought from Trimbak Press Makers, paid by ${inr(KV.n)} debentures at one hundred and six rupees, crediting debentures ${inr(KV.nominal)} and securities premium ${inr(KV.premium)}`, 'Kalsubai Hydraulic Jacks Ltd (imagined): 4,77,000 ÷ 106 = 4,500 debentures.');
const vWE8 = jt([...KBp.entries, lotEntry(KB, 'Ghoti Forgings A/c', `${inr(KB.n)} 11% debentures issued to the vendor, ${terms(KB)}`)], `Journal of worked example eight: business of Ghoti Forgings bought for ${inr(KBp.pc)}; net assets ${inr(KBp.net)} give a capital reserve of ${inr(KBp.capRes)}; ${inr(KB.n)} debentures at ninety-four rupees, redeemable at a premium, with loss on issue ${inr(KB.loss)}`, `Purchase consideration ${rs(KB.received)} ÷ ₹94 = ${inr(KB.n)} debentures.`);
const vWE8b = jt([KBw.entry], `Journal of the write-off: loss on issue of ${inr(KB.loss)} written off, ${inr(KBw.fromSP)} from securities premium and ${inr(KBw.fromPL)} from the statement of profit and loss`, 'Securities premium from the press deal is used first.');
const vWE9 = jt([
  { dr: [['Incorporation Costs A/c', HG.promo.nominal]], cr: [['10% Debentures A/c', HG.promo.nominal]], nar: `${inr(HG.promo.n)} debentures allotted to promoters for their services` },
  { dr: [['Underwriting Commission A/c', HG.under.nominal]], cr: [['Underwriters A/c', HG.under.nominal]], nar: 'underwriting commission due' },
  { dr: [['Underwriters A/c', HG.under.nominal]], cr: [['10% Debentures A/c', HG.under.nominal]], nar: `${inr(HG.under.n)} debentures allotted to underwriters in settlement` },
], `Journal of worked example nine: Harishchandragad Glass Jars debits incorporation costs ${inr(HG.promo.nominal)} for debentures to its promoters, and records underwriting commission of ${inr(HG.under.nominal)} settled in debentures`, 'Harishchandragad Glass Jars Ltd (imagined), a newly formed company.');
const vCollat = table(
  ['', 'First method', 'Second method'],
  [
    ['Entry on issue', 'None', 'Debenture Suspense A/c Dr. To Debentures A/c'],
    ['Note on long-term borrowings', 'Loan shown with a note: secured by debentures issued as collateral', 'Loan shown; debentures shown less Debenture Suspense (= nil)'],
    ['Interest', 'Only on the loan', 'Only on the loan'],
    ['Loan repaid', 'No entry for the debentures', 'Reverse entry: Debentures A/c Dr. To Debenture Suspense A/c'],
  ],
  'Table comparing the two methods for debentures issued as collateral security: the first passes no entry and only notes the debentures under the loan; the second debits debenture suspense and shows the debentures net of it; interest is paid only on the loan in both; the second method reverses its entry when the loan is repaid',
);
const KCnote = note('Long-term borrowings (second method)', [['Bank loan (secured by the issue of 6,000 9% debentures as collateral security)', KC.loan], ['9% Debentures (6,000 of ₹100 each, issued as collateral security)', [['9% Debentures', KCl.nominal], ['Debenture Suspense', -KCl.nominal]]]], KC.loan);
const vWE10 = table(KCnote.headers, KCnote.rows, `Note on long-term borrowings for worked example ten under the second method: bank loan ${inr(KC.loan)}; nine per cent debentures ${inr(KCl.nominal)} less debenture suspense ${inr(KCl.nominal)}, nil; total ${inr(KCnote.total)}`, `Entry: Debenture Suspense A/c Dr. To 9% Debentures A/c ${rs(KCl.nominal)}. First method: no entry, only the note under the loan.`);
const vCalls = table(
  ['Event', 'Entry'],
  [
    ['Instalment not paid (calls in arrears)', 'Bank A/c Dr., Calls in Arrears A/c Dr. To Allotment/Call A/c'],
    ['Arrears received later with interest', 'Bank A/c Dr. To Calls in Arrears A/c, Interest on Calls in Arrears A/c'],
    ['Call money paid before the call (calls in advance)', 'Bank A/c Dr. To Allotment A/c, Calls in Advance A/c'],
    ['Call made: advance adjusted', 'Calls in Advance A/c Dr. (with Bank A/c Dr.) To Call A/c'],
    ['Interest paid on calls in advance', 'Interest on Calls in Advance A/c Dr. To Bank A/c'],
  ],
  'Table of entries for calls in arrears and calls in advance on debentures: unpaid amounts are debited to calls in arrears and later received with interest; money paid early is credited to calls in advance, adjusted when the call is made, and interest on it is paid by the company',
);
const vWE11 = jt([...KCai.entries.slice(2), { date: '1 Sep 2024', dr: [['Interest on Calls in Advance A/c', KCadvInt]], cr: [['Bank A/c', KCadvInt]], nar: 'interest paid on calls in advance for 3 months at 12% a year' }, { date: '1 Dec 2024', dr: [['Bank A/c', KCai.callArrears + KCarrInt]], cr: [['Calls in Arrears A/c', KCai.callArrears], ['Interest on Calls in Arrears A/c', KCarrInt]], nar: 'calls in arrears received with interest for 3 months at 10% a year' }], `Journal of worked example eleven from the allotment onwards: ${inr(KCai.advanceCash)} received in advance with the allotment, the call with ${inr(KCai.callArrears)} in arrears, arrears received three months later with interest of ${inr(KCarrInt)}, and interest of ${inr(KCadvInt)} paid on the advance`, 'Kalsubai Hydraulic Jacks Ltd (imagined), 2024: 8,000 10% debentures of ₹100 at par (₹25, ₹35, ₹40).');
const vTDSflow = flow('LR', ['Interest due on face value (gross)', 'Debentureholders: net interest', 'TDS Payable: tax deducted', 'Bank: holders paid, tax deposited', 'Statement of Profit and Loss: gross interest for the year'], 'Flow of interest on debentures with tax deducted at source: the gross interest falls due; the holders are credited with the net amount and tax deducted goes to TDS payable; the bank pays the holders and deposits the tax; the year gross interest is transferred to the statement of profit and loss', 'Interest on debentures with TDS');
const vWE12 = jt([...KI.h1.entries, ...KI.h2.entries, { date: '31 Mar 2026', dr: [[PL, KIt]], cr: [['Debenture Interest A/c', KIt]], nar: 'debenture interest for the year transferred' }], `Journal of worked example twelve: each half-year interest of ${inr(KI.h1.gross)} on Kalsubai's ten per cent debentures splits into ${inr(KI.h1.net)} for the holders and ${inr(KI.h1.tax)} tax deducted; the September tax is deposited in October; ${inr(KIt)} is transferred to the statement of profit and loss`, 'The September tax is deposited on 7 October; the March tax is still payable on 31 March.');
const vSplit = (() => {
  const s = new Svg(640, 210);
  const X0 = 40, W = 560, g = KI.h1.gross;
  const parts = [['Paid to debentureholders', KI.h1.net, 'green'], ['TDS', KI.h1.tax, 'red']];
  check(sum(parts.map(([, v]) => v)) === g, 'TDS split adds to the gross interest');
  s.text(320, 24, `Half-year interest on ${rs(800000)} at 10%: ${rs(g)}`, { size: 14, bold: true });
  s.rect(X0, 50, W, 40, { fill: 'fill', color: 'accent', sw: 1.5, rx: 2 });
  s.text(X0 + W / 2, 70, `Debenture Interest A/c Dr. ${rs(g)} (gross)`, { size: 13, bold: true });
  let x = X0;
  for (const [name, v, color] of parts) {
    const w = (W * v) / g;
    s.rect(x, 110, w, 40, { fill: color, color: 'accent', sw: 1.5, rx: 2 });
    s.text(x + w / 2, 130, w > 100 ? `${name} ${rs(v)}` : rs(v), { size: 12, bold: true });
    x += w;
  }
  check(Math.abs(x - X0 - W) < 1e-9, 'split width');
  s.text(X0 + W - 4, 172, 'TDS Payable A/c Cr., later deposited', { size: 12, anchor: 'end', muted: true });
  return s.visual(`Two bars of equal length: the gross half-year interest of ${rw(g)} on top, and below it the same amount split into ${rw(KI.h1.net)} paid to the debentureholders and ${rw(KI.h1.tax)} of tax deducted at source credited to TDS payable`, 'Segment widths are computed from the interest.');
})();
const vWhere = table(
  ['Item', 'Balance Sheet (Schedule III Part I)'],
  [
    ['Debentures (repayable after 12 months)', 'Non-current liabilities → Long-term borrowings'],
    ['Debentures due within 12 months', 'Current liabilities → Short-term borrowings (current maturities of long-term borrowings)'],
    ['Premium on Redemption of Debentures', 'Non-current liabilities → Other long-term liabilities'],
    ['Collateral debentures (second method)', 'Long-term borrowings, less Debenture Suspense'],
    ['Calls in arrears', 'Deducted from the debentures in the note'],
    ['Calls in advance, TDS payable, interest accrued', 'Current liabilities → Other current liabilities'],
    ['Securities premium', "Shareholders' funds → Reserves and Surplus"],
  ],
  'Table of where debenture items appear in the balance sheet: debentures under long-term borrowings, those due within twelve months as current maturities under short-term borrowings, premium on redemption under other long-term liabilities, collateral debentures less suspense, calls in arrears deducted, calls in advance, tax payable and interest accrued under other current liabilities, and securities premium under reserves and surplus',
);
const vWE13 = table(KDbs.headers, KDbs.rows, `Balance sheet extract of Kalsubai Hydraulic Jacks at the end of March twenty twenty-six: reserves and surplus ${inr(KDrs.total)}, long-term borrowings ${inr(KDlt.total)}, other long-term liabilities ${inr(KB.redPremium)}, short-term borrowings ${inr(KD.cur)} for debentures due within twelve months, and other current liabilities ${inr(KI.h2.tax)} for tax deducted but not yet deposited`, 'Notes 1 and 2 are in the chapter notes, section 8.');
const vSummary2 = table(
  ['Idea', 'Rule'],
  [
    ['Promoters / underwriters', 'Incorporation Costs (or Goodwill) / Underwriting Commission debited'],
    ['Vendors', 'Number = amount payable ÷ issue price; goodwill or capital reserve balances a business purchase'],
    ['Collateral security', 'No entry (note) or Debenture Suspense; interest only on the loan'],
    ['Calls in arrears / advance', 'Arrears deducted in the note; advance a current liability; interest on both'],
    ['Interest with TDS', 'Gross to Debenture Interest; net to holders; tax to TDS Payable; deposit it'],
    ['Disclosure', 'Long-term borrowings; current maturities; premium on redemption as other long-term liability'],
  ],
  'Summary table of Part 2: debentures to promoters, underwriters and vendors, collateral security, calls in arrears and in advance, interest with tax deducted at source, and disclosure in the balance sheet',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Issue of Debentures — Part 1: Issue for Cash, Terms of Redemption and Capital Losses',
  goals: [
    'State the Companies Act, 2013 rules that shape an issue of debentures',
    'Pass entries for debentures issued at par, at a premium or at a discount, in a lump sum or in instalments, with refunds',
    'Record the six combinations of issue and redemption terms, with Discount or Loss on Issue of Debentures',
    'Write off capital losses in the year they arise, in the ISC order',
  ],
  slides: [
    sl('title', 'Issue of Debentures', {
      b: 'Part 1 — the **law**, issue **for cash**, the six **issue-redemption terms** and writing off **capital losses**. Every company, person and figure in this chapter is imagined.',
      v: vRoute1,
      n: 'A company that needs long-term money without adding new owners can borrow it from the public by issuing debentures. In this part we look at the rules of the Companies Act, record debentures issued for cash at par, at a premium or at a discount, add the terms on which they will be repaid, and learn how the syllabus wants capital losses written off.',
    }),
    sl('concept', 'What the Companies Act, 2013 says', {
      v: vLaw,
      bl: ['A debentureholder is a **creditor**, never a member.', 'Debentures may be issued at a **discount**; shares may not.'],
      n: 'Under the Companies Act, a debenture is an instrument of debt, so its holder is a creditor of the company. Debentures cannot carry voting rights. Unlike shares, they may be issued below face value. Any premium received goes to securities premium, which the Act allows to be used for writing off a discount on debentures. Interest is paid at a fixed rate on the face value.',
    }),
    sl('concept', 'Issuing debentures for cash', {
      v: vWays,
      b: 'However the money is collected, the **Debentures Account is credited with face value**.',
      n: 'Debentures may be paid for in one lump sum with the application, or in instalments on application, allotment and one or more calls. If more debentures are applied for than are offered, the extra application money is refunded. Whatever the price and however it is collected, the debentures account always shows the face value, the amount the company owes.',
    }),
    sl('example', 'Worked example 1: a lump-sum issue at par', {
      b: `Doddabetta Tea Machinery Ltd, Ketti (imagined), offers ${inr(DW1.n)} 9% debentures of ₹100 each at par, payable in full on application. Applications arrive for 7,500 debentures.`,
      v: vWE1,
      n: `All the applicants send the full price, so the bank receives ${rw(DW1i.got)}. Six thousand debentures are allotted, transferring ${rw(DW1.received)} to the debentures account. The money on the extra one thousand five hundred applications, ${rw(DW1i.refund)}, is returned through the same application and allotment account.`,
    }),
    sl('check', 'Quick check: the Debentures Account', {
      b: 'Face value or issue price?',
      chk: 'tf_face',
      n: 'Decide what the debentures account records when the issue price is above face value.',
    }),
    sl('concept', 'Issue in instalments: the accounts', {
      v: vStages,
      n: 'In an issue by instalments, every stage is made due first and then received. Application money is transferred to the debentures account once allotment is made, and any excess is refunded. Allotment carries any premium, and any discount or loss on issue is recorded there too. The final call completes the face value.',
    }),
    sl('example', 'Worked example 2: instalments at a premium', {
      b: `Doddabetta issues ${inr(DW2.n)} 10% debentures of ₹100 each at a premium of 6%: ₹30 on application, ₹46 on allotment (including the premium) and ₹30 on the first and final call. All money is received.`,
      v: vWE2,
      n: `Application brings in ${rw(DW2i.appCash)}. On allotment ${rw(DW2i.allotDue)} falls due: ${rw(DW2i.allotDebCredit)} for the debentures and ${rw(DW2.premium)} for securities premium. The call adds ${rw(DW2i.callDue)}. The debentures account ends at its face value of ${rw(DW2.nominal)}, while the company has collected ${rw(DW2i.cash)} in all.`,
    }),
    sl('example', 'Worked example 3: an issue at a discount', {
      b: `Kodanad Tea Boxes Ltd (imagined) issues ${inr(KT.n)} 8% debentures of ₹500 each at a discount of 3%, redeemable at par, payable in full on application.`,
      v: vWE3,
      n: `Each debenture brings in four hundred and eighty-five rupees, so ${rw(KT.received)} is received. The debentures account is still credited with the face value of ${rw(KT.nominal)}, and the shortfall of ${rw(KT.discount)} is debited to discount on issue of debentures, a capital loss.`,
    }),
    sl('check', 'Quick check: cash kept from an issue', {
      b: 'Collect, refund, then collect again.',
      chk: 'n_received',
      n: 'Add the application and allotment money and take away the refund.',
    }),
    sl('concept', 'Terms of redemption: six combinations', {
      v: vSixRules,
      b: 'A **premium on redemption** is promised now, so it is a loss now and a liability until repaid.',
      n: 'When debentures are issued, the company also fixes how it will repay them, at par or at a premium. That gives six combinations. A premium on issue is credited to securities premium. A discount alone is debited to discount on issue. Whenever repayment is at a premium, the promised premium is credited to a liability account and, together with any discount, debited to loss on issue.',
    }),
    sl('example', 'Worked example 4: the six combinations side by side', {
      b: '2,000 9% debentures of ₹100 each under each set of terms (allotment entry amounts).',
      v: vWE4,
      n: 'Here are the six combinations for two thousand debentures. The debentures account is credited with the same face value every time. What changes is the cash, the premium credited, the redemption premium promised and the loss debited. In every row, cash plus loss equals face value plus both premiums, a handy check.',
    }),
    sl('diagram', 'Seeing the loss on one debenture', {
      v: vLine,
      b: 'Loss on issue = discount + premium on redemption.',
      n: 'Follow one Doddabetta debenture on a number line. The company receives ninety-four rupees, the face value is one hundred and it has promised to repay one hundred and nine. The six-rupee discount and the nine-rupee redemption premium together make a loss of fifteen rupees on each debenture.',
    }),
    sl('example', 'Worked example 5: discount and premium on redemption', {
      b: `On 1 December 2025 Doddabetta issues ${inr(DW5.n)} 11% debentures of ₹100 each at a discount of 6%, redeemable at a premium of 9%, payable in full on application.`,
      v: vWE5,
      n: `The company receives ${rw(DW5.received)}. At allotment it credits the debentures with ${rw(DW5.nominal)} and premium on redemption with ${rw(DW5.redPremium)}, and debits loss on issue with ${rw(DW5.loss)}, the discount and the redemption premium together.`,
    }),
    sl('check', 'Quick check: the loss account', {
      b: 'Name the account.',
      chk: 'fb_loss_ac',
      n: 'Recall which account collects the discount and the premium payable on redemption together.',
    }),
    sl('concept', 'Writing off capital losses: the ISC rule', {
      v: vOrder,
      bl: ['Write off **in the year** the loss arises.', 'Order: **Securities Premium** → **Statement of Profit and Loss** → **Capital Reserve**.'],
      n: 'Discount and loss on issue are capital losses. The syllabus says every capital loss must be written off in the year in which it occurs, not spread over the life of the debentures. Use securities premium first, then the statement of profit and loss, and capital reserve only as the last resort.',
    }),
    sl('example', 'Worked example 6: writing off Doddabetta’s loss', {
      b: `At 31 March 2026 the loss of ${rs(DW5.loss)} is written off. The only securities premium is the ${rs(DW2.premium)} from worked example 2.`,
      v: vWE6,
      n: `Doddabetta uses all of its securities premium, ${rw(DW6.fromSP)}, first. The remaining ${rw(DW6.fromPL)} is charged to the statement of profit and loss. Capital reserve is not needed, and the loss on issue account closes at nil in the year of issue.`,
    }),
    sl('diagram', 'Where the loss went', {
      v: vBar,
      b: 'Each source is used up before the next one is touched.',
      n: 'This bar shows the whole loss and the sources that absorbed it, in order. Securities premium takes the first and larger part because it was available. The statement of profit and loss takes the rest. Had both been short, capital reserve would have been the last stop.',
    }),
    sl('check', 'Quick check: when to write off', {
      b: 'In which year?',
      chk: 'm_writeoff_when',
      n: 'Apply the syllabus note on capital losses to a five-year debenture.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up: debentures are always credited at face value. A premium on issue goes to securities premium, a discount to discount on issue, and any premium on redemption creates a loss on issue and a liability. Extra application money is refunded. Capital losses are written off in the year they arise, from securities premium, then profit and loss, then capital reserve.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Credit the Debentures Account with **face value** in every entry; premium and discount go to their own accounts.',
        'If redemption is at a **premium**, debit **Loss on Issue** (not Discount on Issue) and credit **Premium on Redemption**.',
        'Check each allotment entry: **cash + loss = face value + premiums**.',
        'Write off the loss in the **same year**, and show the **order** (Securities Premium first) in your working.',
        'Name the stage in each narration (application, allotment, call, refund): it earns the step mark.',
      ],
      n: 'A few habits save marks. Always credit the debentures account at face value and send premium and discount to their own accounts. When repayment is at a premium, use loss on issue and credit premium on redemption. Check every allotment entry with the identity. Write off the loss in the same year and show the order. And label each entry with its stage.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Issue of Debentures — Part 2: Other than Cash, Collateral, Calls, Interest and Disclosure',
  goals: [
    'Record debentures issued to promoters, underwriters and vendors of assets or a business',
    'Show debentures issued as collateral security by both methods',
    'Record calls in arrears and calls in advance with interest, and interest on debentures with tax deducted at source',
    'Present debentures and related items in the Balance Sheet under Schedule III Part I',
  ],
  slides: [
    sl('title', 'Debentures other than for cash, interest and disclosure', {
      b: 'Part 2 — **promoters, underwriters and vendors**, **collateral security**, **calls in arrears and in advance**, **interest with TDS** and the **Balance Sheet**.',
      v: vRoute2,
      n: 'Not every debenture is sold for cash. Companies pay promoters, underwriters and sellers of assets with debentures, and pledge debentures to banks as security. Instalments may be paid late or early. Interest must be paid with tax deducted at source. Finally, all of it must be shown correctly in the balance sheet. Our running company is Kalsubai Hydraulic Jacks of Akole.',
    }),
    sl('concept', 'Debentures for consideration other than cash', {
      v: vOther,
      b: 'The vendor is first **credited** with the price; the debentures then **settle** that credit.',
      n: 'When debentures settle a claim instead of bringing in cash, debit what the company received. Promoters are paid for forming the company, so incorporation costs, or goodwill, is debited. Underwriters earn a commission. A vendor is first credited with the price of the asset or business, and the debentures then settle that amount. Divide the amount payable by the issue price to find how many debentures to issue.',
    }),
    sl('example', 'Worked example 7: a press bought for debentures', {
      b: `Kalsubai buys a hydraulic forging press for ${rs(KV.received)} from Trimbak Press Makers (imagined) and pays with 9% debentures of ₹100 each at a premium of 6%.`,
      v: vWE7,
      n: `Each debenture is issued at one hundred and six rupees, so ${rw(KV.received)} divided by one hundred and six gives ${words(KV.n)} debentures. The machinery is debited and the vendor credited. When the debentures are allotted, the vendor is debited and the debentures and securities premium of ${rw(KV.premium)} are credited.`,
    }),
    sl('example', 'Worked example 8: a business bought for debentures', {
      b: `On 1 October 2025 Kalsubai takes over Ghoti Forgings (imagined) for ${rs(KB.received)}, paid in 11% debentures of ₹100 each at a discount of 6%, redeemable at a premium of 5%.`,
      v: vWE8,
      n: `The assets total ${rw(KBp.A)} and the creditors ${rw(KBp.L)}, so net assets are ${rw(KBp.net)}. The price is lower, giving a capital reserve of ${rw(KBp.capRes)}. At ninety-four rupees each, ${words(KB.n)} debentures settle the price, with a loss on issue of ${rw(KB.loss)}.`,
    }),
    sl('example', 'Worked example 8 (continued): writing off the loss', {
      b: 'The loss arose this year, so it is written off at the year end in the ISC order.',
      v: vWE8b,
      n: `Kalsubai's only securities premium is the ${rw(KV.premium)} from the press deal, so that is used first. The remaining ${rw(KBw.fromPL)} goes to the statement of profit and loss. Notice that the capital reserve is not touched, because the profit and loss statement can absorb the rest.`,
    }),
    sl('example', 'Worked example 9: promoters and underwriters', {
      b: `Harishchandragad Glass Jars Ltd (imagined), newly formed, allots ${inr(HG.promo.n)} 10% debentures at par to its promoters and settles an underwriting commission of ${rs(HG.under.nominal)} with ${inr(HG.under.n)} debentures at par.`,
      v: vWE9,
      n: `The promoters' services are a cost of forming the company, so incorporation costs are debited with ${rw(HG.promo.nominal)}. For the underwriters, the commission is first made due to them, and then their account is debited when they accept debentures instead of cash.`,
    }),
    sl('check', 'Quick check: who gets debentures, and why?', {
      b: 'Match each allotment with its debit.',
      chk: 'match_consideration',
      n: 'For each allotment, ask what the company received in return for its debentures.',
    }),
    sl('concept', 'Debentures as collateral security', {
      v: vCollat,
      b: 'Collateral debentures are a **pledge**: no money is raised by them and no interest is paid on them.',
      n: 'A lender may ask for debentures as extra security for a loan. They become enforceable only if the company fails to repay. Under the first method no entry is passed and the loan simply carries a note. Under the second, debenture suspense is debited and the debentures credited, and in the balance sheet one cancels the other. Interest is paid only on the loan.',
    }),
    sl('example', 'Worked example 10: a bank loan secured by debentures', {
      b: `Kalsubai borrows ${rs(KC.loan)} from Ratangad Co-operative Bank (imagined) and issues ${inr(KC.n)} 9% debentures of ₹100 each to the bank as collateral security.`,
      v: vWE10,
      n: `Under the second method, debenture suspense is debited and the debentures credited with ${rw(KCl.nominal)}. In the note, the bank loan of ${rw(KC.loan)} is the real debt, and the debentures less the suspense come to nil, so the total borrowing shown is just the loan.`,
    }),
    sl('check', 'Quick check: the first method', {
      b: 'Is any entry passed?',
      chk: 'tf_collateral_entry',
      n: 'Recall how the first method records debentures given as collateral.',
    }),
    sl('concept', 'Calls in arrears and calls in advance', {
      v: vCalls,
      n: 'Sometimes a holder pays an instalment late. The unpaid amount goes to calls in arrears, and the terms of issue may charge interest on it. Sometimes a holder pays a call before it is made. That money is credited to calls in advance, a liability, and the company may pay interest on it. When the call is made, the advance is adjusted.',
    }),
    sl('example', 'Worked example 11: late and early payers', {
      b: `In 2024 Kalsubai issued ${inr(KCa.n)} 10% debentures of ₹100 at par: ₹25, ₹35 and ₹40. One holder of 300 debentures paid the call with the allotment; one holder of 200 paid the call three months late with interest at 10% a year. Interest on the advance was paid at 12% a year.`,
      v: vWE11,
      n: `With the allotment, ${rw(KCai.advanceCash)} arrived early and was credited to calls in advance. When the call was made it was adjusted, while ${rw(KCai.callArrears)} remained in arrears. That holder paid three months later with ${rw(KCarrInt)} interest, and Kalsubai paid ${rw(KCadvInt)} interest on the advance.`,
    }),
    sl('concept', 'Interest on debentures with TDS', {
      v: vTDSflow,
      b: 'Interest is a **charge** against profit, calculated on **face value**, and payable even in a loss year.',
      n: 'Interest is calculated on the face value at the coupon rate. The company must deduct tax at source before paying the holders. So the gross interest is debited to debenture interest, the holders are credited with the net amount and the tax goes to a tax payable account. The holders are paid, the tax is deposited with the government, and the year gross interest is transferred to the statement of profit and loss.',
    }),
    sl('example', 'Worked example 12: a year of interest at Kalsubai', {
      b: `Kalsubai's 10% debentures of ${rs(KCa.nominal)} pay interest on 30 September and 31 March, after deducting tax at source at 10%.`,
      v: vWE12,
      n: `Each half-year the interest is ${rw(KI.h1.gross)}. The holders receive ${rw(KI.h1.net)} and ${rw(KI.h1.tax)} is held as tax payable until it is deposited. At the year end the full ${rw(KIt)} is transferred to the statement of profit and loss.`,
    }),
    sl('diagram', 'One half-year of interest, split', {
      v: vSplit,
      b: 'The company bears the whole gross interest; the tax is simply paid to the government on the holders’ behalf.',
      n: 'This picture shows one half-year. The full interest is the company cost. It is split into the part paid to the holders and the part deducted as tax. The tax is not an extra expense. It is the holders tax, which the company collects and passes on to the government.',
    }),
    sl('check', 'Quick check: tax on one half-year', {
      b: 'Interest first, then the tax.',
      chk: 'n_tds',
      n: 'Work out the half-year interest on face value, then take the tax rate on it.',
    }),
    sl('check', 'Quick check: where the tax waits', {
      b: 'Name the account.',
      chk: 'fb_tds',
      n: 'Recall the account that holds tax deducted until it is deposited.',
    }),
    sl('concept', 'Disclosure in the Balance Sheet', {
      v: vWhere,
      n: 'Schedule three places each item precisely. Debentures go under long-term borrowings, except the part repayable within twelve months, which goes to short-term borrowings as current maturities. Premium on redemption is another long-term liability. Collateral debentures are shown less suspense. Calls in arrears are deducted in the note, and calls in advance, tax payable and accrued interest are other current liabilities.',
    }),
    sl('example', 'Worked example 13: Kalsubai’s Balance Sheet extract', {
      b: '1,500 of the 9% debentures issued for the press are due for redemption on 30 April 2026.',
      v: vWE13,
      n: `Here is Kalsubai's balance sheet extract at the end of the year. Reserves show the capital reserve, with the securities premium used up. Long-term borrowings total ${rw(KDlt.total)}, the redemption premium of ${rw(KB.redPremium)} is another long-term liability, and the debentures due in April appear under short-term borrowings.`,
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up: promoters, underwriters and vendors can be paid in debentures, and a business purchase may give goodwill or capital reserve. Collateral debentures raise no money and earn no interest. Arrears and advances are tracked in their own accounts, with interest. Interest is charged gross with tax deducted at source. Every item has its own place in the balance sheet.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Find the number of debentures for a vendor by dividing by the **issue price**, not the face value.',
        'For collateral debentures, say which **method** you follow; interest is never paid on them.',
        'Calls in advance are a **liability**; calls in arrears are **deducted** from debentures in the note.',
        'Debit **gross** interest; credit the holders with the **net** and TDS Payable with the tax.',
        'Move debentures due within 12 months to **short-term borrowings** as current maturities.',
      ],
      n: 'In the exam, divide by the issue price to find a vendor\'s debentures. State which method you use for collateral debentures and remember no interest is paid on them. Treat calls in advance as a liability and deduct calls in arrears in the note. Debit gross interest and split the credit. And move debentures due within twelve months to short-term borrowings.',
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
const N = notes({
  title: 'Issue of Debentures — Notes',
  sections: [
    {
      h: '1. Debentures, the Companies Act, 2013 and issue for cash',
      t: 1,
      b: "A **debenture** is an instrument of debt issued by a company under its common seal or otherwise (Section 2(30) of the **Companies Act, 2013**); the holder is a **creditor** who earns interest at a fixed (coupon) rate on the face value. Debentures carry **no voting rights** (Section 71). Unlike shares (Section 53), debentures **may be issued at a discount**.\n\n**Issue for cash**\n- **Lump sum:** Bank A/c Dr. To Debenture Application and Allotment A/c (all applications); on allotment that account is debited and the Debentures A/c credited.\n- **Instalments:** application, allotment and one or more calls; each is first made due and then received.\n- **Over-subscription:** the excess application money is refunded (Debenture Application A/c Dr. To Bank A/c).\n\nRedemption of debentures (Debenture Redemption Reserve, investment, methods) is chapter 8; here redemption appears only as a **term of issue**.",
      terms: [
        ['Debenture', 'An instrument acknowledging a debt of the company, carrying interest at a fixed rate on its face value; the holder is a creditor.'],
        ['Coupon rate', 'The rate of interest written on the debenture, applied to its face value.'],
        ['Over-subscription', 'Applications for more debentures than are offered; the extra application money is refunded.'],
      ],
      v: vLaw,
      vs: [vWays, vWE1],
    },
    {
      h: '2. Issue at par, at a premium and at a discount',
      t: 1,
      b: "| Stage | Due | Received |\n|---|---|---|\n| Application | Debenture Application A/c Dr. To Debentures A/c | Bank A/c Dr. To Debenture Application A/c |\n| Allotment | Debenture Allotment A/c Dr. (+ Discount on Issue A/c Dr.) To Debentures A/c (+ Securities Premium A/c) | Bank A/c Dr. To Debenture Allotment A/c |\n| Call | Debenture First and Final Call A/c Dr. To Debentures A/c | Bank A/c Dr. To Call A/c |\n\n- **At par:** price = face value.\n- **At a premium:** the premium (usually with allotment) is credited to **Securities Premium A/c**, shown under Reserves and Surplus.\n- **At a discount:** the discount (allowed at allotment) is debited to **Discount on Issue of Debentures A/c**, a capital loss.\n- **Check:** the Debentures A/c is always credited with the **face value** in total.",
      terms: [
        ['Issue at a premium', 'Issue at a price above face value; the excess is a capital receipt in Securities Premium.'],
        ['Issue at a discount', 'Issue at a price below face value; the shortfall is a capital loss.'],
      ],
      v: vStages,
      vs: [vWE2, vWE3],
    },
    {
      h: '3. Terms of redemption: the six combinations and the loss on issue',
      t: 2,
      b: "At issue the company also fixes whether it will repay at **par** or at a **premium**.\n\n- Redeemable at par: only the issue terms matter (par, premium, discount).\n- Redeemable at a premium: **Loss on Issue of Debentures A/c Dr.** with (discount, if any + premium on redemption); **Premium on Redemption of Debentures A/c Cr.** with the premium payable.\n\n**Identity (every allotment entry):** amount receivable + discount or loss = face value + securities premium + premium on redemption.\n\n**Premium on Redemption of Debentures** is a **liability** until redemption, shown under other long-term liabilities.",
      terms: [
        ['Premium on redemption', 'The extra amount, above face value, that the company promises to pay when it repays the debentures.'],
        ['Loss on issue of debentures', 'The discount on issue plus any premium payable on redemption, recognised at the time of issue.'],
      ],
      v: vSixRules,
      vs: [vWE4, vLine, vWE5],
    },
    {
      h: '4. Writing off capital losses (ISC 2027 note)',
      t: 2,
      b: "All capital losses (discount or loss on issue of debentures) are written off **in the year in which they occur**. The sequence is:\n1. **Securities Premium** (permitted by Section 52 of the Companies Act, 2013; premium received on any issue, including one in the same year);\n2. **Statement of Profit and Loss**;\n3. lastly **Capital Reserve**.\n\nEntry: Securities Premium A/c Dr., Statement of Profit and Loss Dr., Capital Reserve A/c Dr. To Discount (or Loss) on Issue of Debentures A/c.",
      terms: [
        ['Capital loss', 'A loss arising from raising capital or long-term funds, such as discount or loss on issue of debentures; not a trading loss.'],
        ['Securities premium', 'Amount received above face value on an issue of securities; Section 52 lists its permitted uses.'],
      ],
      v: vOrder,
      vs: [vWE6, vBar],
    },
    {
      h: '5. Debentures for consideration other than cash',
      t: 3,
      b: "- **Promoters** (for services in forming the company): Incorporation Costs A/c (or Goodwill A/c) Dr. To Debentures A/c.\n- **Underwriters** (commission): Underwriting Commission A/c Dr. To Underwriters A/c; Underwriters A/c Dr. To Debentures A/c.\n- **Vendor of assets:** Asset A/c Dr. To Vendor's A/c; then Vendor's A/c Dr. (+ Discount/Loss on Issue Dr.) To Debentures A/c (+ Securities Premium A/c, Premium on Redemption A/c).\n- **Vendor of a business:** Business Purchase A/c Dr. To Vendor's A/c; Assets A/cs Dr. (+ Goodwill A/c) To Liabilities A/cs, Business Purchase A/c (+ Capital Reserve A/c); then the allotment.\n\n**Number of debentures** = amount payable ÷ issue price. **Goodwill** = price − net assets; **capital reserve** = net assets − price.",
      terms: [
        ['Purchase consideration', 'The price agreed with a vendor for the assets or business taken over.'],
        ['Capital reserve (on purchase)', 'The excess of net assets taken over above the purchase consideration; a capital profit.'],
      ],
      v: vOther,
      vs: [vWE7, vWE8, vWE8b, vWE9],
    },
    {
      h: '6. Debentures issued as collateral security',
      t: 3,
      b: "**Collateral security** is a secondary security given in addition to the primary security for a loan. The lender can enforce the debentures only if the company fails to repay the loan; on repayment they are returned.\n\n- **First method:** no entry. Below the loan in the note: *(secured by the issue of … debentures as collateral security)*.\n- **Second method:** Debenture Suspense A/c Dr. To Debentures A/c (face value). In the note on long-term borrowings, the debentures are shown **less Debenture Suspense**, so they add nothing to the total. On repayment of the loan the entry is reversed.\n- **No interest** is paid on collateral debentures; interest is paid on the loan.",
      terms: [
        ['Collateral security', 'An additional security pledged with a lender, enforceable only if the borrower defaults.'],
        ['Debenture Suspense Account', 'The account debited when collateral debentures are recorded by the second method; deducted from those debentures in the Balance Sheet.'],
      ],
      v: vCollat,
      vs: [vWE10],
    },
    {
      h: '7. Calls in arrears, calls in advance and interest on debentures with TDS',
      t: 4,
      b: "**Calls in arrears:** an instalment due but unpaid is debited to **Calls in Arrears A/c**. When received: Bank A/c Dr. To Calls in Arrears A/c; interest charged under the terms of issue is credited to Interest on Calls in Arrears A/c.\n\n**Calls in advance:** money received before a call is made is credited to **Calls in Advance A/c** (a current liability) and adjusted when the call is made. Interest paid on it is a finance cost.\n\n**Interest on debentures** = face value × rate × months/12, payable even in a loss year (a **charge** against profit).\n- Interest due: Debenture Interest A/c Dr. (gross) To Debentureholders' A/c (net), To TDS Payable A/c (tax).\n- Paid: Debentureholders' A/c Dr. To Bank A/c.\n- Tax deposited: TDS Payable A/c Dr. To Bank A/c.\n- Year end: Statement of Profit and Loss Dr. To Debenture Interest A/c.",
      terms: [
        ['Tax deducted at source (TDS)', "Income tax the company deducts from the holders' interest and pays to the government on their behalf."],
        ['Calls in advance', 'Call money received before the call is made; a liability until it is adjusted.'],
        ['Calls in arrears', 'Allotment or call money that has fallen due but has not been paid.'],
      ],
      v: vCalls,
      vs: [vWE11, vTDSflow, vWE12, vSplit],
    },
    {
      h: '8. Disclosure of debentures in the Balance Sheet (Schedule III Part I)',
      t: 5,
      b: `- **Long-term borrowings** (non-current liabilities): debentures repayable after 12 months; secured debentures and the nature of security stated; collateral debentures less Debenture Suspense; calls in arrears deducted.\n- **Short-term borrowings** (current liabilities): **current maturities of long-term borrowings**, the debentures repayable within 12 months of the Balance Sheet date.\n- **Other long-term liabilities:** Premium on Redemption of Debentures.\n- **Other current liabilities:** calls in advance, interest accrued, TDS payable.\n- **Reserves and Surplus:** Securities Premium (after any write-off), Capital Reserve.\n\n**Kalsubai Hydraulic Jacks Ltd (imagined), notes as at 31 March 2026**\n\n${KDrs.md}\n\n${KDlt.md}`,
      terms: [
        ['Current maturities of long-term borrowings', 'The part of a long-term borrowing repayable within twelve months of the Balance Sheet date, shown under short-term borrowings.'],
        ['Long-term borrowings', 'Borrowings repayable after twelve months, such as debentures and term loans, shown under non-current liabilities.'],
      ],
      v: vWhere,
      vs: [vWE13],
    },
  ],
  tips: "**Common mistakes**\n- Crediting the Debentures Account with the issue price instead of the face value.\n- Debiting Discount on Issue when redemption is at a premium (use **Loss on Issue**), or forgetting the **Premium on Redemption** liability.\n- Spreading the loss on issue over several years; the ISC note requires it to be written off in the **year of issue**, Securities Premium first.\n- Dividing by the face value instead of the **issue price** to find debentures for a vendor.\n- Paying or charging interest on **collateral debentures**.\n- Debiting Debenture Interest with the net amount; it carries the **gross** interest.\n- Leaving debentures due within twelve months under long-term borrowings.\n\n**How marks are usually awarded (SOYL chapter tests on the ISC default pattern)**\n- 1 mark: objective items.\n- 2 marks: two or three journal entries, a distinction or a short disclosure.\n- 3 marks: a set of entries for one issue (application to call), a write-off with its working, or a note to accounts.\n- 5 marks in parts, e.g. (a) 3 + (b) 2: entries for an issue and a write-off or a note.\n- Full practical (practice, 8 marks): journal for the issue about 4, write-off about 2, Balance Sheet notes about 2. The ISC 2027 weightage for Issue and Redemption of Debentures in Paper I is 8 marks.\n\n**Figures in SOYL practice** are imagined; your board paper will give its own.",
});

// ---------------------------------------------------------------- flashcards
const FC = cards([
  ['**Debenture**', 'An instrument of debt issued by a company; the holder is a creditor earning interest at a fixed rate.', 'definition', 1],
  ['Voting rights on debentures (Companies Act, 2013)', 'None: Section 71 forbids debentures with voting rights.', 'fact', 1],
  ['Can debentures be issued at a discount?', 'Yes. Shares cannot (Section 53, sweat equity apart).', 'fact', 1],
  ['The Debentures Account is credited with…', 'The **face value**, whatever the issue price.', 'exam-tip', 1],
  ['Excess application money on debentures', 'Refunded: Debenture Application A/c Dr. To Bank A/c.', 'fact', 1],
  ['Premium on issue of debentures', 'Credited to **Securities Premium A/c** (Reserves and Surplus).', 'fact', 1],
  ['Discount on issue (redeemable at par)', 'Debited to **Discount on Issue of Debentures A/c**, a capital loss.', 'fact', 1],
  ['**Premium on Redemption of Debentures**', 'The extra amount promised on repayment; a liability under other long-term liabilities.', 'definition', 2],
  ['**Loss on Issue of Debentures**', 'Discount on issue + premium on redemption, recorded at the time of issue.', 'definition', 2],
  ['Check for any allotment entry', 'Amount receivable + discount or loss = face value + securities premium + premium on redemption.', 'exam-tip', 2],
  ['Issued at par, redeemable at a premium', 'Loss on Issue Dr.; Premium on Redemption Cr. (no discount).', 'concept', 2],
  ['When are capital losses written off (ISC)?', 'In full, in the year in which they occur.', 'fact', 2],
  ['ISC order for writing off capital losses', 'Securities Premium → Statement of Profit and Loss → Capital Reserve.', 'fact', 2],
  ['Section 52, Companies Act, 2013', 'Lists the uses of securities premium, incl. writing off discount on an issue of debentures.', 'fact', 2],
  ['Debentures to promoters', 'Incorporation Costs A/c (or Goodwill A/c) Dr. To Debentures A/c.', 'fact', 3],
  ['Debentures to underwriters', 'Underwriting Commission Dr. To Underwriters; Underwriters Dr. To Debentures.', 'fact', 3],
  ['Number of debentures to a vendor', 'Amount payable ÷ **issue price** per debenture.', 'exam-tip', 3],
  ['Goodwill or capital reserve on buying a business', 'Price above net assets = goodwill; net assets above price = capital reserve.', 'concept', 3],
  ['**Collateral security**', 'A secondary security pledged with a lender, enforceable only if the loan is not repaid.', 'definition', 3],
  ['Collateral debentures: first method', 'No entry; a note below the loan.', 'fact', 3],
  ['Collateral debentures: second method', 'Debenture Suspense A/c Dr. To Debentures A/c; shown less suspense (nil).', 'fact', 3],
  ['Interest on collateral debentures', 'None; interest is paid on the loan only.', 'concept', 3],
  ['**Calls in arrears** on debentures', 'Instalments due but unpaid; deducted from debentures in the note.', 'definition', 4],
  ['**Calls in advance** on debentures', 'Call money received early; a liability, adjusted when the call is made.', 'definition', 4],
  ['Interest on debentures is calculated on…', 'The **face value**, at the coupon rate, for the months outstanding.', 'fact', 4],
  ['Interest due with TDS: the entry', "Debenture Interest Dr. (gross) To Debentureholders (net), To TDS Payable (tax).", 'fact', 4],
  ['TDS deposited with the government', 'TDS Payable A/c Dr. To Bank A/c.', 'fact', 4],
  ['Debenture interest: charge or appropriation?', 'A charge against profit; payable even in a loss year.', 'concept', 4],
  ['Debentures due within 12 months (Schedule III)', 'Short-term borrowings: current maturities of long-term borrowings.', 'fact', 5],
  ['Debentures due after 12 months (Schedule III)', 'Non-current liabilities → long-term borrowings.', 'fact', 5],
  ['TDS payable and calls in advance at the year end', 'Current liabilities → other current liabilities.', 'fact', 5],
]);

// ---------------------------------------------------------------- tests (ISC class defaults, item for item)
const T_SHORT = test({
  kind: 'short',
  blueprint: 'isc-12-default-chapter-test-short',
  title: 'Chapter test (short) — Issue of Debentures',
  duration: 50,
  sections: [
    { id: 'A', title: 'Section A - Objective (5 marks)', instr: 'Answer all questions. Multiple-choice and assertion-reason items carry 1 mark each.', items: ['m_received_discount', 'm_loss_compute', 'm_collateral_meaning', 'm_tds_net', 'ar_prd'] },
    { id: 'B', title: 'Section B - Short answer (4 marks)', instr: 'Answer both questions. Internal choice in the second question.', items: ['s2_lumpsum', { attempt: 1, keys: ['s2_collateral_methods', 's2_tds_entries'] }] },
    { id: 'C', title: 'Section C - Short answer (6 marks)', instr: 'Answer both questions. Internal choice in the second question. Show your working.', items: ['s3_staged_premium', { attempt: 1, keys: ['s3_writeoff', 's3_vendor_asset'] }] },
    { id: 'D', title: 'Section D - Long answer (5 marks)', instr: 'Answer the question. It is set in parts (3 + 2 marks); show your working.', items: ['l5_lot_writeoff'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'isc-12-default-chapter-test-long',
  title: 'Chapter test (long) — Issue of Debentures',
  duration: 100,
  sections: [
    { id: 'A', title: 'Section A - Objective (12 marks)', instr: 'Answer all questions. Multiple-choice and assertion-reason items carry 1 mark each.', items: ['m_s71', 'm_discount_allowed', 'm_refund', 'm_allot_premium', 'm_writeoff_order', 'm_vendor_number', 'm_capital_reserve', 'm_calls_advance', 'm_calls_arrears_bs', 'm_current_maturities', 'ar_writeoff', 'ar_tds'] },
    { id: 'B', title: 'Section B - Short answer (6 marks)', instr: 'Answer all three questions. Internal choice in the last question.', items: ['s2_six_entries', 's2_writeoff_rule', { attempt: 1, keys: ['s2_promoters_underwriters', 's2_disclosure'] }] },
    { id: 'C', title: 'Section C - Short answer (12 marks)', instr: 'Answer all four questions. Internal choice in the last question. Show your working.', items: ['s3_staged_discount', 's3_six_cases', 's3_business', { attempt: 1, keys: ['s3_interest_year', 's3_bs'] }] },
    { id: 'D', title: 'Section D - Long answer (10 marks)', instr: 'Answer both questions. Internal choice in the second question. Each is set in parts (3 + 2 marks).', items: ['l5_disclosure', { attempt: 1, keys: ['l5_business_goodwill', 'l5_calls_interest'] }] },
  ],
});

// Deck checks never appear in the tests.
const inTests = new Set([T_SHORT, T_LONG].flatMap((t) => t.sections.flatMap((s) => s.items.map((i) => i.question_id))));
for (const d of [part1, part2]) for (const s of d.slides) if (s.check_question_id) check(!inTests.has(s.check_question_id), `deck check ${s.check_question_id} is also in a test`);

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: FC,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t05 of isc-12-accounts-ch07 only (issue at par, premium and discount in a lump sum or instalments; the six issue-redemption terms, loss on issue and writing off capital losses in the ISC order; collateral security and debentures to promoters, underwriters and vendors; calls in arrears and in advance with interest, interest on debentures with TDS; Schedule III disclosure). Redemption itself (DRR, DRI, methods) is left to chapter 8.',
    originality: 'every company, vendor and figure is imagined and labelled as such; no textbook illustration or exercise and no CISCE specimen or past-paper item is reused; companies and set-ups differ from the CBSE 12 Accountancy chapters and ISC ch01–ch05',
    data: 'every issue, refund, call, write-off, purchase, interest and note figure is computed by acc.mjs and asserted: entries balance, debentures credited equal face value, received + loss = face value + premiums, cash reconciles with instalments less arrears, write-offs exhaust the loss in the ISC order, ledgers and notes total, every amount whole rupees and every vendor lot a whole number of debentures',
    accounting: 'ISC 2027 notes applied: capital losses written off in the year they occur, first from Securities Premium, then the Statement of Profit and Loss, lastly Capital Reserve; interest on debentures with TDS; calls in arrears and in advance with interest; amended Schedule III (current maturities of long-term borrowings under short-term borrowings)',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
