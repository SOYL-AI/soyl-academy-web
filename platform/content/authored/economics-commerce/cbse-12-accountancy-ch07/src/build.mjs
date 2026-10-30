// Build CBSE 12 Accountancy ch07 Issue of Debentures. Run from platform/:
//   npx tsx content/authored/economics-commerce/cbse-12-accountancy-ch07/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';

setUnit('cbse-12-accountancy-ch07', 'economics-commerce');
const { fig, rs, rupees, words, perCent, journal, note, lot, cashIssue, stagedIssue, allotEntry, vendorLot, purchase, interestYear, writeOff, check, DISC } = await import('./acc.mjs');
const { bsx, FACTS } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const T = (t) => table(t.headers, t.rows, t.alt, t.caption);

// ---------------------------------------------------------------- deck 1 running example: Narmada Agro Ltd (imagined, Jabalpur)
const NA1 = lot({ n: 5000, face: 100, rate: 10 });
const S_NA1 = stagedIssue(NA1, { app: 30 });
const J_NA1 = journal(S_NA1.entries);
const NA2 = lot({ n: 2000, face: 500, rate: 9, iss: 6 });
const J_NA2 = journal(cashIssue(NA2));
const NA3 = lot({ n: 6000, face: 100, rate: 8, iss: -4 });
const J_NA3 = journal(cashIssue(NA3));
const NA4 = lot({ n: 3000, face: 100, rate: 11, iss: -5, red: 10 });
const J_NA4 = journal(cashIssue(NA4));
const SIXT = [[0, 0], [-5, 0], [10, 0], [0, 5], [-5, 10], [10, 5]];
const SIX = SIXT.map(([iss, red]) => lot({ n: 1000, face: 100, rate: 9, iss, red }));
for (const [ok, what] of [
  [S_NA1.allot === 70 && NA1.nominal === 500000, 'WE1'],
  [NA2.price === 530 && NA2.received === 1060000 && NA2.premium === 60000, 'WE2'],
  [NA3.received === 576000 && NA3.discount === 24000, 'WE3'],
  [NA4.received === 285000 && NA4.loss === 45000 && NA4.redPremium === 30000, 'WE4'],
  [SIX.map((L) => L.loss).join() === '0,5000,0,5000,15000,5000' && SIX.map((L) => L.received).join() === '100000,95000,110000,100000,95000,110000', 'six cases'],
]) check(ok, `Narmada Agro: ${what}`);

// ---------------------------------------------------------------- deck 2 running example: Konkan Cold Chain Ltd (imagined, Ratnagiri)
const KV = "Sahyadri Machines' A/c";
const KC5 = vendorLot({ amount: 440000, face: 100, rate: 9, iss: 10 });
const J_KC5 = journal([
  { date: '1 Apr 2026', dr: [['Machinery A/c', KC5.received]], cr: [[KV, KC5.received]], nar: 'machinery bought from Sahyadri Machines' },
  allotEntry(KC5, KV, `${fig(KC5.n)} 9% debentures of ₹100 each allotted to the vendor at a premium of 10%`, { date: '1 Apr 2026' }),
]);
const BV = "Ratnagiri Fisheries' A/c";
const KC6 = purchase({ assets: [['Land and Building A/c', 600000], ['Plant A/c', 320000], ['Stock A/c', 140000], ['Debtors A/c', 60000]], liabs: [['Creditors A/c', 100000]], pc: 950000, vendor: BV });
const KC6L = vendorLot({ amount: KC6.pc, face: 100, rate: 10, iss: -5 });
const J_KC6 = journal([
  { ...KC6.entry, date: '1 Apr 2026' },
  allotEntry(KC6L, BV, `${fig(KC6L.n)} 10% debentures of ₹100 each allotted to the vendor at a discount of 5%`, { date: '1 Apr 2026' }),
]);
const KC7 = { loan: 800000, n: 11000, rate: 11 };
const KC7sec = `Loan from bank (secured by the issue of ${fig(KC7.n)} ${KC7.rate}% debentures of ₹100 each as collateral security)`;
const N_KC7a = note('Note 1: Long-term borrowings', [[KC7sec, KC7.loan]], KC7.loan);
const N_KC7b = note('Note 1: Long-term borrowings', [[KC7sec, KC7.loan], [`${KC7.rate}% Debentures (issued as collateral security)`, [[`${fig(KC7.n)} debentures of ₹100 each`, KC7.n * 100], ['Debentures Suspense', -KC7.n * 100]]]], KC7.loan);
const BS_KC7 = bsx([['Non-current liabilities', [['(a) Long-term borrowings', '1', KC7.loan]]]]);
const KC9 = interestYear({ nominal: KC6L.nominal, rate: 10, periods: [['30 Sep 2026', 6], ['31 Mar 2027', 6]], transferDate: '31 Mar 2027' });
const KC10 = writeOff(KC6L.discount, KC5.premium, { ac: DISC, date: '31 Mar 2027' });
const J_KC10 = journal([KC10.entry]);
for (const [ok, what] of [
  [KC5.n === 4000 && KC5.premium === 40000, 'WE5'],
  [KC6.net === 1020000 && KC6.capRes === 70000 && KC6L.n === 10000 && KC6L.discount === 50000, 'WE6'],
  [N_KC7a.total === KC7.loan && N_KC7b.total === KC7.loan, 'WE7/WE8'],
  [KC9.amts.join() === '50000,50000' && KC9.total === 100000, 'WE9'],
  [KC10.fromSP === 40000 && KC10.fromPL === 10000, 'WE10'],
]) check(ok, `Konkan Cold Chain: ${what}`);

// ---------------------------------------------------------------- visuals: deck 1
const vRoute1 = flow('LR', ['Meaning', 'Debentures and shares', 'Types', 'Issue for cash', 'Par, premium, discount', 'Terms of redemption'], 'Route map of Part 1: meaning of debentures, debentures compared with shares, types, issue for cash, issue at par, premium or discount, and issue with terms of redemption', 'Part 1 at a glance');
const vDebFlow = flow('LR', ['Company needs long-term funds', 'Issues debentures to lenders', 'Pays interest at a fixed rate', 'Repays on the agreed terms'], 'Flow of a debenture: the company needs long-term funds, issues debentures to lenders, pays them interest at a fixed rate and repays them on the agreed terms', 'A debenture is borrowed capital');
const vVsShares = table(
  ['Basis', 'Shares', 'Debentures'],
  [
    ['Holder is', 'An owner (member)', 'A creditor (lender)'],
    ['Return', 'Dividend: appropriation of profit, may vary', 'Interest at a fixed rate: a charge against profit'],
    ['In a year of loss', 'No dividend need be paid', 'Interest is still payable'],
    ['Voting rights', 'Yes (equity shares)', 'None (Section 71)'],
    ['Issue at a discount', 'Not allowed (Section 53), sweat equity apart', 'Allowed'],
    ['Security', 'Never secured', 'Usually secured by a charge on assets'],
    ['On winding up', 'Repaid last', 'Repaid before shareholders'],
  ],
  'Table comparing shares and debentures: shareholders are owners who receive a varying dividend, have voting rights and are repaid last; debentureholders are creditors who receive fixed interest even in a loss year, have no voting rights, are usually secured and are repaid first; shares cannot be issued at a discount but debentures can',
);
const vTypes = table(
  ['Basis', 'Kinds', 'What decides it'],
  [
    ['Security', 'Secured · Unsecured (naked)', 'A fixed or floating charge on assets, or none'],
    ['Tenure', 'Redeemable · Irredeemable (perpetual)', 'A repayment date, or repayment only on winding up'],
    ['Convertibility', 'Convertible (fully or partly) · Non-convertible', 'Option to exchange for equity shares'],
    ['Record', 'Registered · Bearer', 'Holders entered in a register, or transfer by delivery'],
    ['Coupon rate', 'Specific coupon rate · Zero coupon rate', 'A stated interest rate, or none (deep discount instead)'],
  ],
  'Table of the types of debentures on five bases: security gives secured and unsecured; tenure gives redeemable and irredeemable; convertibility gives convertible and non-convertible; record gives registered and bearer; coupon rate gives specific coupon rate and zero coupon rate',
);
const vTypesFlow = flow(
  'TB',
  ['Debentures', 'Security: secured / unsecured', 'Tenure: redeemable / irredeemable', 'Conversion: convertible / non-convertible', 'Record: registered / bearer', 'Coupon: specific rate / zero coupon'],
  'Classification tree: debentures branch into five bases, namely security, tenure, conversion, record and coupon rate, each with two kinds',
  'One debenture can be described on every basis at once',
  [2, 3, 4, 5, 6].map((i) => ({ from: 'n1', to: `n${i}` })),
);
const vIssueFlow = flow('LR', ['Application money received (Bank Dr)', 'Transferred to Debentures', 'Allotment money due (Allotment Dr)', 'Allotment money received (Bank Dr)'], 'Flow of an issue for cash in two instalments: application money received in the bank and transferred to the debentures account, then allotment money becomes due and is received', 'A lump sum uses one Debenture Application and Allotment Account');
const vPrice = table(
  ['Issued at', 'Issue price', 'The difference goes to'],
  [
    ['Par', 'Equal to face value', '—'],
    ['Premium', 'Above face value', 'Securities Premium A/c (credit)'],
    ['Discount', 'Below face value', 'Discount on Issue of Debentures A/c (debit)'],
  ],
  'Table of issue price: at par the price equals face value; at a premium the excess is credited to Securities Premium; at a discount the shortfall is debited to Discount on Issue of Debentures',
  'Debentures are always credited at face value.',
);
const vSix = table(
  ['Case', 'Issued at', 'Redeemable at', 'Received (₹)', 'Repayable (₹)', 'Debit (besides Bank)', 'Credits'],
  SIX.map((L, i) => [
    `${i + 1}`,
    L.iss > 0 ? `${L.iss}% premium` : L.iss < 0 ? `${-L.iss}% discount` : 'Par',
    L.red > 0 ? `${L.red}% premium` : 'Par',
    fig(L.received),
    fig(L.repayable),
    L.loss ? `${L.lossAc.replace(/ A\/c$/, '')} ${fig(L.loss)}` : '—',
    ['Debentures ' + fig(L.nominal), ...(L.premium ? [`Securities Premium ${fig(L.premium)}`] : []), ...(L.redPremium ? [`Premium on Redemption ${fig(L.redPremium)}`] : [])].join('; '),
  ]),
  'Table of the six combinations for one thousand debentures of one hundred rupees: at par redeemable at par; at a discount redeemable at par with a discount debit; at a premium redeemable at par with securities premium; at par redeemable at a premium with a loss on issue; at a discount redeemable at a premium with a larger loss; at a premium redeemable at a premium with both premiums and a loss',
  `Figures for ${fig(SIX[0].n)} debentures of ₹100 each (face value ${rs(SIX[0].nominal)}).`,
);
const vSixBars = (() => {
  const s = new Svg(600, 290);
  const left = 60;
  const top = 30;
  const H = 180;
  const max = 120000;
  const y = (v) => top + H - (H * v) / max;
  s.line(left, top + H, 580, top + H, { sw: 1.5 });
  s.line(left, top + H, left, top - 6, { sw: 1.5 });
  [0, 40000, 80000, 120000].forEach((v) => {
    s.line(left - 5, y(v), left, y(v), { sw: 1.2 });
    s.text(left - 8, y(v), `${v / 1000}`, { anchor: 'end', size: 11 });
  });
  s.text(left - 40, top - 16, '₹ thousand', { anchor: 'start', size: 11, muted: true });
  const gw = (580 - left) / 6;
  SIX.forEach((L, i) => {
    const x = left + i * gw + 14;
    s.rect(x, y(L.received), 26, (H * L.received) / max, { fill: 'fill', sw: 1.2, rx: 2 });
    s.rect(x + 30, y(L.repayable), 26, (H * L.repayable) / max, { fill: 'accent', color: 'accent', sw: 1.2, rx: 2 });
    s.text(x + 13, y(L.received) - 9, `${L.received / 1000}`, { size: 11 });
    s.text(x + 43, y(L.repayable) - 9, `${L.repayable / 1000}`, { size: 11 });
    s.text(x + 28, top + H + 16, `Case ${i + 1}`, { size: 12 });
    check(L.repayable - L.received === L.loss - L.premium, `case ${i + 1}: gap = loss − premium`);
  });
  s.rect(170, 262, 14, 14, { fill: 'fill', sw: 1.2, rx: 2 });
  s.text(190, 269, 'Received at issue', { anchor: 'start', size: 12 });
  s.rect(340, 262, 14, 14, { fill: 'accent', color: 'accent', sw: 1.2, rx: 2 });
  s.text(360, 269, 'Repayable at maturity', { anchor: 'start', size: 12 });
  return s.visual(
    'Paired bars for the six cases, in thousands of rupees: case one receives and repays one hundred; case two receives ninety-five and repays one hundred; case three receives one hundred and ten and repays one hundred; case four receives one hundred and repays one hundred and five; case five receives ninety-five and repays one hundred and ten; case six receives one hundred and ten and repays one hundred and five',
    'Whenever the repayable bar is taller because of a redemption premium, a Loss on Issue of Debentures is recorded at the time of issue.',
  );
})();
const vWhere = table(
  ['Account', 'Nature', 'Where it goes'],
  [
    ['Debentures', 'Borrowing', 'Non-current liabilities → Long-term borrowings'],
    ['Securities Premium', 'Capital receipt', "Shareholders' funds → Reserves and surplus"],
    ['Premium on Redemption of Debentures', 'Liability (owed at maturity)', 'Non-current liabilities → Other long-term liabilities'],
    ['Discount / Loss on Issue of Debentures', 'Capital loss', 'Written off in the year of issue (Part 2)'],
  ],
  'Table of where the accounts of an issue go: debentures under long-term borrowings; securities premium under reserves and surplus; premium on redemption under other long-term liabilities; discount or loss on issue is written off in the year of issue',
);
const vSummary1 = table(
  ['Situation', 'Entry for the allotment (lump sum)'],
  [
    ['At par, redeemable at par', 'Bank Dr; To Debentures'],
    ['At a discount, redeemable at par', 'Bank Dr, Discount on Issue Dr; To Debentures'],
    ['At a premium, redeemable at par', 'Bank Dr; To Debentures, To Securities Premium'],
    ['At par, redeemable at a premium', 'Bank Dr, Loss on Issue Dr; To Debentures, To Premium on Redemption'],
    ['At a discount, redeemable at a premium', 'Bank Dr, Loss on Issue Dr (discount + redemption premium); To Debentures, To Premium on Redemption'],
    ['At a premium, redeemable at a premium', 'Bank Dr, Loss on Issue Dr; To Debentures, To Securities Premium, To Premium on Redemption'],
  ],
  'Summary of the six entries: debentures are always credited at face value; a premium on issue is credited to securities premium; a discount alone is debited to discount on issue; any premium on redemption is credited to premium on redemption and debited, with any discount, to loss on issue',
);

// ---------------------------------------------------------------- visuals: deck 2
const vRoute2 = flow('LR', ['Consideration other than cash', 'Purchase of a business', 'Collateral security', 'Interest', 'Writing off discount and loss'], 'Route map of Part 2: debentures issued for consideration other than cash, purchase of a business, debentures as collateral security, interest on debentures, and writing off discount and loss on issue', 'Part 2 at a glance');
const vVendorFlow = flow('LR', ['Asset bought from a vendor', 'Asset A/c Dr, To Vendor A/c', 'Number = amount payable ÷ issue price', 'Vendor A/c Dr, To Debentures (premium or discount as agreed)'], 'Flow of an issue to a vendor: the asset is bought and the vendor credited, the number of debentures is the amount payable divided by the issue price, and the vendor is debited when the debentures are allotted', 'No cash changes hands for the debentures');
const vBP = table(
  ['Purchase consideration compared with net assets', 'Difference', 'In the purchase entry'],
  [
    ['Price higher than net assets', 'Goodwill', 'Goodwill A/c Dr'],
    ['Price lower than net assets', 'Capital reserve', 'Capital Reserve A/c Cr'],
    ['Price equal to net assets', 'None', '—'],
  ],
  'Table for the purchase of a business: if the price exceeds the net assets the difference is goodwill, debited; if the price is lower the difference is capital reserve, credited; if equal there is no difference',
  'Net assets = assets taken over − liabilities taken over.',
);
const vCollFlow = flow('LR', ['Company borrows from a lender', 'Hands over debentures as extra security', 'Loan repaid: debentures cancelled', 'Default: lender may enforce them'], 'Flow of collateral security: the company borrows, hands over debentures as additional security, gets them back and cancelled when the loan is repaid, and only on default may the lender enforce them', 'No cash is received for collateral debentures and no interest is paid on them');
const vInterest = table(
  ['Event', 'Journal entry'],
  [
    ['Interest falls due', "Debenture Interest A/c Dr, To Debentureholders' A/c"],
    ['Interest paid', "Debentureholders' A/c Dr, To Bank A/c"],
    ['End of the year', 'Statement of Profit and Loss Dr, To Debenture Interest A/c'],
  ],
  "Table of the three interest entries: when interest falls due, debit debenture interest and credit debentureholders; when it is paid, debit debentureholders and credit bank; at the year end, transfer debenture interest to the Statement of Profit and Loss",
  'Interest = face value × rate × months ÷ 12 (tax deducted at source is outside the syllabus).',
);
const vWriteFlow = flow('LR', ['Discount or loss on issue', 'First: Securities Premium (balance available)', 'Then: Statement of Profit and Loss', 'All in the year of issue'], 'Flow for writing off: the discount or loss on issue is set first against the securities premium available, and any balance is charged to the Statement of Profit and Loss, all in the year of issue', 'Section 52 allows securities premium to be used for this');
const vSplit = (() => {
  const s = new Svg(560, 170);
  const X0 = 40;
  const W = 480;
  const part = [[`Securities Premium ${rs(KC10.fromSP)}`, KC10.fromSP, 'fill'], [`P&L ${rs(KC10.fromPL)}`, KC10.fromPL, 'accent']];
  let x = X0;
  for (const [label, v, fill] of part) {
    const w = (W * v) / KC6L.discount;
    s.rect(x, 50, w, 50, { fill, color: fill === 'accent' ? 'accent' : undefined, sw: 1.5, rx: 2 });
    s.text(x + w / 2, 75, label, { size: 13 });
    x += w;
  }
  check(Math.abs(x - X0 - W) < 1e-9, 'write-off bar adds to the whole discount');
  s.text(X0 + W / 2, 30, `Discount on issue ${rs(KC6L.discount)}`, { size: 14, bold: true });
  s.text(X0 + W / 2, 130, 'Securities premium is used up first; only the balance reduces profit', { size: 12, muted: true });
  return s.visual(
    `One bar for the discount of ${words(KC6L.discount)} rupees, split into ${words(KC10.fromSP)} rupees written off from securities premium and ${words(KC10.fromPL)} rupees charged to the Statement of Profit and Loss`,
    'Konkan Cold Chain Ltd, 31 March 2027.',
  );
})();
const vBS = table(
  ['Item', 'Balance sheet head (Schedule III)'],
  [
    ['Debentures (issued for cash or to a vendor)', 'Non-current liabilities → Long-term borrowings'],
    ['Collateral debentures (second method)', 'Long-term borrowings, less Debentures Suspense (net nil)'],
    ['Loan secured by collateral debentures', 'Long-term borrowings, with the security described'],
    ['Premium on Redemption of Debentures', 'Non-current liabilities → Other long-term liabilities'],
    ['Securities Premium; Capital Reserve', "Shareholders' funds → Reserves and surplus"],
    ['Interest due but not paid at the year end', 'Current liabilities → Other current liabilities'],
  ],
  'Table of balance sheet heads: debentures and loans under long-term borrowings, collateral debentures shown less debentures suspense, premium on redemption under other long-term liabilities, securities premium and capital reserve under reserves and surplus, and unpaid interest under other current liabilities',
);
const vSummary2 = table(
  ['Situation', 'Key entry or rule'],
  [
    ['Asset bought for debentures', 'Asset Dr, To Vendor; Vendor Dr, To Debentures (and premium / discount)'],
    ['Business bought', 'Assets Dr (Goodwill Dr), To Liabilities, To Vendor (To Capital Reserve)'],
    ['Collateral, first method', 'No entry; note under the loan'],
    ['Collateral, second method', 'Debentures Suspense Dr, To Debentures; shown net nil'],
    ['Interest', 'On face value; due, paid, transferred to the Statement of Profit and Loss'],
    ['Discount or loss on issue', 'Securities Premium first, then the Statement of Profit and Loss, in the year of issue'],
  ],
  'Summary of Part 2: assets and businesses bought for debentures go through the vendor account, with goodwill or capital reserve for a business; collateral debentures are either noted or recorded against a suspense account; interest is on face value and charged to profit; discount or loss is written off from securities premium first, in the year of issue',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Issue of Debentures — Part 1: Meaning, Types and Issue for Cash',
  goals: [
    'Explain what a debenture is and distinguish debentures from shares',
    'Classify debentures on the basis of security, tenure, convertibility, record and coupon rate',
    'Pass journal entries for the issue of debentures at par, at a premium and at a discount, including the terms of redemption',
  ],
  slides: [
    sl('title', 'Issue of Debentures', {
      b: 'Part 1 — what debentures are, how they differ from shares, their **types**, and how to record their **issue for cash** at par, premium or discount and with **terms of redemption**.',
      v: vRoute1,
      n: 'A company that needs money for many years does not have to sell more ownership. It can borrow from the public by issuing debentures. In this part we learn what a debenture is, how it differs from a share, the different kinds of debentures, and how to record their issue for cash, including the terms on which they will be repaid. We follow one imagined company throughout.',
    }),
    sl('concept', 'What is a debenture?', {
      v: vDebFlow,
      bl: ['A **debenture** is a written acknowledgement of a **debt** by a company, with a fixed **rate of interest** and terms of repayment.', 'The Companies Act 2013 (Section 2(30)) includes debenture stock, bonds and similar instruments evidencing a debt.', 'Debentureholders are **creditors**, not owners.'],
      n: 'A debenture is a document in which the company admits that it owes money. It states the amount, the rate of interest and the terms of repayment. The people who hold debentures have lent money to the company, so they are its creditors. They receive interest whether the company earns a profit or not, and they are repaid as agreed.',
    }),
    sl('two-column', 'Debentures and shares', {
      cols: ['**Shares**\n\n- Owners' + "'" + ' capital.\n- Dividend from profits.\n- Voting rights.', '**Debentures**\n\n- Borrowed capital.\n- Fixed interest, even in a loss.\n- No voting rights.'],
      v: vVsShares,
      n: 'Shares and debentures both raise long-term money, but they are opposites in nature. A shareholder owns part of the company, votes at meetings and gets a dividend only when there are profits. A debentureholder is a lender who gets fixed interest, has no vote, and is repaid before shareholders if the company is wound up. Shares cannot be issued at a discount, but debentures can.',
    }),
    sl('check', 'Quick check: who is a debentureholder?', {
      b: 'Choose the best description.',
      chk: 'm_meaning',
      n: 'Think about whether the debentureholder has invested in ownership or has lent money.',
    }),
    sl('concept', 'Types of debentures', {
      v: vTypes,
      n: 'Debentures are classified on five bases. Security asks whether there is a charge on the assets. Tenure asks whether there is a repayment date. Convertibility asks whether they can become equity shares. Record asks whether holders are entered in a register or the debentures pass by delivery. Coupon rate asks whether interest is stated, or whether the debenture is a zero coupon one sold at a deep discount.',
    }),
    sl('diagram', 'One debenture, five descriptions', {
      v: vTypesFlow,
      bl: ['Example: **secured, redeemable, non-convertible, registered, specific coupon rate** debentures.'],
      n: 'These bases are not alternatives. A single debenture can be described on every one of them. For example, a company may issue secured, redeemable, non-convertible, registered debentures carrying a specific rate of interest. When a question asks you to classify, name the basis first and then the kind.',
    }),
    sl('check', 'Quick check: irredeemable debentures', {
      b: 'Decide whether the statement is true.',
      chk: 'tf_irredeemable',
      n: 'Irredeemable debentures have no repayment date while the company runs. What happens when it closes down?',
    }),
    sl('concept', 'Issue for cash: the entries', {
      v: vIssueFlow,
      bl: ['Money may be collected in **instalments** (application, allotment) or in a **lump sum** with the application.', 'Excess application money is **refunded**: Debenture Application A/c Dr, To Bank A/c.'],
      n: 'When debentures are issued for cash, the money may come in instalments, first with the application and then on allotment, or all at once. Each instalment is first received in the bank and then transferred to the debentures account. If more debentures are applied for than are offered, the extra application money is returned.',
    }),
    sl('example', 'Worked example 1: Narmada Agro Ltd', {
      b: `An imagined company in Jabalpur issues **${fig(NA1.n)} 10% debentures of ₹100 each at par**, payable ₹${S_NA1.app} on application and ₹${S_NA1.allot} on allotment. All money is received.`,
      v: T({ ...J_NA1, alt: `Journal of worked example one: application money of ${fig(NA1.n * S_NA1.app)} received and transferred to the debentures account; allotment money of ${fig(NA1.n * S_NA1.allot)} due and received` }),
      n: `Narmada Agro Limited receives thirty rupees a debenture with the applications, ${rupees(NA1.n * S_NA1.app)} in all, and transfers it to the debentures account. On allotment seventy rupees a debenture falls due, ${rupees(NA1.n * S_NA1.allot)}, and is received. The debentures account now shows the full face value of ${rupees(NA1.nominal)}.`,
    }),
    sl('concept', 'At par, at a premium, at a discount', {
      v: vPrice,
      bl: ['Premium on issue → **Securities Premium**, usable only for purposes in **Section 52**.', 'Discount on issue is a **capital loss**, written off in the year of issue (Part 2).'],
      n: 'Debentures can be issued at par, at a premium or at a discount. Whatever the price, the debentures account is always credited with the face value. Any premium is credited to securities premium. Any discount is debited to discount on issue of debentures, a capital loss that we write off later in the year.',
    }),
    sl('example', 'Worked example 2: issue at a premium', {
      b: `Narmada Agro Ltd issues **${fig(NA2.n)} 9% debentures of ₹500 each at a premium of 6%**, the whole amount payable with the application.`,
      v: T({ ...J_NA2, alt: `Journal of worked example two: ${fig(NA2.received)} received with applications; on allotment debentures credited ${fig(NA2.nominal)} and securities premium ${fig(NA2.premium)}` }),
      n: `The issue price is five hundred plus six per cent, that is five hundred and thirty rupees. The company collects ${rupees(NA2.received)}. On allotment the debentures account gets the face value of ${rupees(NA2.nominal)} and the extra ${rupees(NA2.premium)} goes to securities premium.`,
    }),
    sl('example', 'Worked example 3: issue at a discount', {
      b: `Narmada Agro Ltd issues **${fig(NA3.n)} 8% debentures of ₹100 each at a discount of 4%**, redeemable at par, payable in full with the application.`,
      v: T({ ...J_NA3, alt: `Journal of worked example three: ${fig(NA3.received)} received; on allotment the application account and discount on issue of ${fig(NA3.discount)} are debited and debentures credited ${fig(NA3.nominal)}` }),
      n: `Each debenture is sold for ninety-six rupees, so the company collects ${rupees(NA3.received)}. The debentures account is still credited with the full ${rupees(NA3.nominal)}. The shortfall of ${rupees(NA3.discount)} is debited to discount on issue of debentures.`,
    }),
    sl('check', 'Quick check: the premium', {
      b: 'Where does the premium collected on issue go?',
      chk: 'm_premium_credit',
      n: 'The premium is money received now, above face value. Which account keeps such capital receipts?',
    }),
    sl('concept', 'Terms of redemption: six combinations', {
      v: vSix,
      n: 'At the time of issue the company also fixes how much it will repay. The issue may be at par, premium or discount, and repayment may be at par or at a premium. That gives six combinations. Whenever repayment is at a premium, the premium promised is credited to premium on redemption of debentures, a liability, and debited to loss on issue of debentures.',
    }),
    sl('diagram', 'What comes in and what goes out', {
      v: vSixBars,
      n: 'Compare what the company receives at issue with what it must repay. In cases four, five and six the repayable bar includes a premium on redemption. That promised premium is a loss to the company, so it is recorded at the time of issue as a loss on issue of debentures, together with any discount.',
    }),
    sl('example', 'Worked example 4: discount and redemption premium', {
      b: `Narmada Agro Ltd issues **${fig(NA4.n)} 11% debentures of ₹100 each at a discount of 5%, redeemable at a premium of 10%**.`,
      v: T({ ...J_NA4, alt: `Journal of worked example four: ${fig(NA4.received)} received; on allotment loss on issue of ${fig(NA4.loss)} debited, debentures credited ${fig(NA4.nominal)} and premium on redemption ${fig(NA4.redPremium)}` }),
      n: `The company collects ninety-five rupees a debenture, ${rupees(NA4.received)}. It will repay one hundred and ten rupees each. The discount of ${rupees(NA4.discount)} and the redemption premium of ${rupees(NA4.redPremium)} together make a loss on issue of ${rupees(NA4.loss)}. Debentures get the face value and premium on redemption gets ${rupees(NA4.redPremium)}.`,
    }),
    sl('check', 'Quick check: the promised premium', {
      b: 'Fill in the blank.',
      chk: 'fb_prd',
      n: 'The extra amount payable at maturity is owed to debentureholders. Which liability account records it?',
    }),
    sl('concept', 'Where these accounts go', {
      v: vWhere,
      n: 'In the balance sheet, debentures appear under long-term borrowings. Securities premium is part of reserves and surplus. Premium on redemption of debentures is a liability, shown under other long-term liabilities. A discount or loss on issue is a capital loss which the syllabus asks us to write off in the year of issue, as we will see in part two.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up: a debenture acknowledges a debt, and its holder is a creditor with fixed interest and no vote. Debentures are classified by security, tenure, conversion, record and coupon rate. Debentures are always credited at face value. A premium on issue goes to securities premium; a discount, and any premium promised on redemption, go to discount or loss on issue.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Credit **Debentures A/c at face value** in every case; never at the issue price.',
        'If redeemable at a **premium**, always open **Loss on Issue** and **Premium on Redemption** at the time of issue.',
        'A discount **alone** (redeemable at par) may be debited to **Discount on Issue**; with a redemption premium, debit **Loss on Issue** with both.',
        'Write the **rate** in the account name: "9% Debentures A/c".',
        'For a classification question, name the **basis** and the **kind**.',
      ],
      n: 'Some advice for the board exam. Always credit debentures at face value. When debentures are redeemable at a premium, record the loss on issue and the premium on redemption at the time of issue itself. Write the rate of interest in the name of the account. And in classification questions, give the basis as well as the kind.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Issue of Debentures — Part 2: Other than Cash, Collateral, Interest and Write-off',
  goals: [
    'Record debentures issued to vendors for assets or a business, with goodwill or capital reserve',
    'Show debentures issued as collateral security by both methods',
    'Record interest on debentures and write off discount or loss on issue in the year of issue',
  ],
  slides: [
    sl('title', 'Debentures beyond cash', {
      b: 'Part 2 — debentures for **consideration other than cash**, as **collateral security**, **interest** on debentures, and **writing off** discount or loss on issue.',
      v: vRoute2,
      n: 'Debentures are not always sold for cash. A company may hand them to a seller in payment for assets, or give them to a bank as extra security for a loan. In this part we record both situations, then the interest on debentures, and finally how a discount or loss on issue is written off. Our imagined company is Konkan Cold Chain Limited, of Ratnagiri.',
    }),
    sl('concept', 'Issue for consideration other than cash', {
      v: vVendorFlow,
      bl: ['**Number of debentures = amount payable ÷ issue price** (not face value).'],
      n: 'When a company buys an asset and pays the seller in debentures, two entries are needed. First the asset is debited and the vendor credited, because the company now owes him. Then, when debentures are allotted to the vendor, his account is debited and the debentures account credited, with any premium or discount. Divide the amount payable by the issue price to find the number.',
    }),
    sl('example', 'Worked example 5: machinery for debentures', {
      b: `On 1 April 2026 Konkan Cold Chain Ltd buys machinery for **${rs(KC5.received)}** from Sahyadri Machines and pays in **9% debentures of ₹100 each at a premium of 10%**.`,
      v: T({ ...J_KC5, alt: `Journal of worked example five: machinery debited and the vendor credited ${fig(KC5.received)}; the vendor debited, debentures credited ${fig(KC5.nominal)} and securities premium ${fig(KC5.premium)}` }),
      n: `The issue price is one hundred and ten rupees. ${words(KC5.received).replace(/^./, (c) => c.toUpperCase())} rupees divided by one hundred and ten gives ${words(KC5.n)} debentures. Their face value of ${rupees(KC5.nominal)} is credited to debentures, and the premium of ${rupees(KC5.premium)} to securities premium.`,
    }),
    sl('concept', 'Purchase of a business', {
      v: vBP,
      bl: ['Debit assets, credit liabilities and the vendor at the **purchase consideration**.', 'The balancing figure is **goodwill** (debit) or **capital reserve** (credit).'],
      n: 'When a whole business is bought, the company takes over its assets and liabilities at agreed values. Assets less liabilities give the net assets. If the price paid is higher, the extra is goodwill. If the price is lower, the gain is a capital reserve. The vendor is credited with the price and later settled in debentures.',
    }),
    sl('example', 'Worked example 6: a business for debentures', {
      b: `Konkan Cold Chain Ltd takes over the business of Ratnagiri Fisheries (net assets ${rs(KC6.net)}) for **${rs(KC6.pc)}**, paid in **10% debentures of ₹100 each at a discount of 5%**.`,
      v: T({ ...J_KC6, alt: `Journal of worked example six: assets of ${fig(KC6.A)} debited, creditors ${fig(KC6.L)}, the vendor ${fig(KC6.pc)} and capital reserve ${fig(KC6.capRes)} credited; then the vendor and discount of ${fig(KC6L.discount)} debited and debentures of ${fig(KC6L.nominal)} credited` }),
      n: `Assets of ${rupees(KC6.A)} less creditors of ${rupees(KC6.L)} give net assets of ${rupees(KC6.net)}. The price is only ${rupees(KC6.pc)}, so a capital reserve of ${rupees(KC6.capRes)} arises. At ninety-five rupees each, ${words(KC6L.n)} debentures settle the price, with a discount of ${rupees(KC6L.discount)}.`,
    }),
    sl('check', 'Quick check: how many debentures?', {
      b: 'Divide by the issue price.',
      chk: 'n_vendor_n',
      n: 'First work out the issue price including the premium, then divide the amount payable by it.',
    }),
    sl('concept', 'Debentures as collateral security', {
      v: vCollFlow,
      bl: ['**Collateral security** = additional security for a loan, besides the main security.', 'No cash is received; **no interest** is paid on these debentures.'],
      n: 'Sometimes a lender asks for extra security. The company then issues its own debentures to the lender as collateral security. No money is received for them and no interest is paid on them. If the loan is repaid, the debentures come back and are cancelled. Only if the company defaults can the lender use them. There are two ways to show this.',
    }),
    sl('example', 'Worked example 7: collateral, first method', {
      b: `Konkan Cold Chain Ltd borrows **${rs(KC7.loan)}** from a bank and issues **${fig(KC7.n)} 11% debentures of ₹100 each** as collateral security. **First method:** no entry for the debentures.`,
      v: table(N_KC7a.headers, N_KC7a.rows, `Note on long-term borrowings, first method: the bank loan of ${fig(KC7.loan)} shown with the collateral debentures described beside it`, 'The balance sheet shows Long-term borrowings (Note 1) at the loan amount.'),
      bl: [`Balance sheet: Non-current liabilities → (a) Long-term borrowings, Note 1, ${rs(KC7.loan)}.`],
      n: `Under the first method no journal entry is passed for the debentures. The bank loan of ${rupees(KC7.loan)} is shown under long-term borrowings, and the note simply says that it is secured by the issue of the collateral debentures.`,
    }),
    sl('example', 'Worked example 8: collateral, second method', {
      b: `Same facts. **Second method:** Debentures Suspense A/c Dr ${rs(KC7.n * 100)}, To ${KC7.rate}% Debentures A/c ${rs(KC7.n * 100)}.`,
      v: table(N_KC7b.headers, N_KC7b.rows, `Note on long-term borrowings, second method: bank loan of ${fig(KC7.loan)}; collateral debentures of ${fig(KC7.n * 100)} less debentures suspense of the same amount, net nil; total ${fig(KC7.loan)}`, 'The suspense account cancels the debentures, so borrowings are not overstated.'),
      n: `Under the second method the debentures are recorded by debiting debentures suspense and crediting the debentures account with ${rupees(KC7.n * 100)}. In the note the suspense is deducted from those debentures, leaving nil, so total borrowings remain ${rupees(KC7.loan)}. When the loan is repaid, the entry is reversed.`,
    }),
    sl('check', 'Quick check: the second method', {
      b: 'Fill in the blank.',
      chk: 'fb_collateral',
      n: 'No cash comes in. Which account takes the debit and is later deducted in the note?',
    }),
    sl('concept', 'Interest on debentures', {
      v: vInterest,
      bl: ['Interest is a **charge against profit**: payable even in a year of loss.', 'Calculated on the **face value**, whatever the issue price.'],
      n: 'Interest on debentures is an expense, not a share of profit, so it must be paid even if the company makes a loss. It is always calculated on the face value at the stated rate, for the months the debentures were outstanding. When interest falls due, debenture interest is debited and the debentureholders credited. At the year end, the interest account is closed to the Statement of Profit and Loss.',
    }),
    sl('example', 'Worked example 9: interest for a year', {
      b: `Konkan Cold Chain Ltd's **${fig(KC6L.n)} 10% debentures of ₹100 each** (allotted on 1 April 2026) carry interest payable half-yearly on 30 September and 31 March.`,
      v: T({ ...journal(KC9.entries), alt: `Journal of worked example nine: interest of ${fig(KC9.amts[0])} due and paid on thirtieth September and again on thirty-first March; ${fig(KC9.total)} transferred to the Statement of Profit and Loss` }),
      n: `Interest for a half-year is ten per cent of ${rupees(KC6L.nominal)} for six months, ${rupees(KC9.amts[0])}. On each date it falls due and is paid. On thirty-first March the total of ${rupees(KC9.total)} is transferred to the Statement of Profit and Loss. Notice that the discount at which they were issued does not change the interest.`,
    }),
    sl('check', 'Quick check: interest falls due', {
      b: 'Choose the correct entry.',
      chk: 'm_interest_entry',
      n: 'Interest is an expense of the company and is now owed to the debentureholders.',
    }),
    sl('concept', 'Writing off discount and loss on issue', {
      v: vWriteFlow,
      bl: ['Entry: Securities Premium A/c Dr, Statement of Profit and Loss Dr, To Discount (or Loss) on Issue of Debentures A/c.'],
      n: 'A discount or loss on issue is a capital loss. The syllabus asks us to write it off in the year of issue. First use any balance in securities premium, which section fifty-two permits, including premium received in the same year. Only the part that securities premium cannot cover is charged to the Statement of Profit and Loss.',
    }),
    sl('example', 'Worked example 10: writing off the discount', {
      b: `On 31 March 2027 Konkan Cold Chain Ltd writes off the discount of **${rs(KC6L.discount)}** (worked example 6). Securities Premium has **${rs(KC5.premium)}** (worked example 5).`,
      v: T({ ...J_KC10, alt: `Journal of worked example ten: securities premium debited ${fig(KC10.fromSP)} and the Statement of Profit and Loss debited ${fig(KC10.fromPL)}; discount on issue of debentures credited ${fig(KC6L.discount)}` }),
      n: `The discount is ${rupees(KC6L.discount)}. Securities premium holds ${rupees(KC5.premium)}, which is used in full. The remaining ${rupees(KC10.fromPL)} is charged to the Statement of Profit and Loss. After this entry, the discount account is closed.`,
    }),
    sl('diagram', 'Picture the write-off', {
      v: vSplit,
      n: 'Here is the same write-off as a bar. The whole bar is the discount. The larger part is absorbed by securities premium, and only the small remaining part reduces the profit of the year. If the premium balance had been larger than the discount, nothing at all would have gone to the Statement of Profit and Loss.',
    }),
    sl('check', 'Quick check: the order of write-off', {
      b: 'Choose the correct order.',
      chk: 'm_writeoff_order',
      n: 'Which balance does the law allow you to use first for this purpose?',
    }),
    sl('concept', 'Debentures in the balance sheet', {
      v: vBS,
      n: 'Let us place every item in the balance sheet. Debentures and the secured loan are long-term borrowings. Collateral debentures recorded by the second method are shown less the suspense account. Premium on redemption is another long-term liability. Securities premium and capital reserve are reserves. Interest due but unpaid at the year end is a current liability.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up: for assets or a business bought for debentures, credit the vendor first and settle him with debentures, working out goodwill or capital reserve for a business. Collateral debentures are either noted under the loan or recorded against a suspense account. Interest is on face value and charged to profit. A discount or loss is written off in the year of issue, securities premium first.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Number of debentures to a vendor = **amount payable ÷ issue price**.',
        'For a business purchase, compute **net assets** before writing the entry.',
        'Collateral debentures: **no interest**, and under the second method **net nil** in the note.',
        'Interest: **face value × rate × months ÷ 12**; count the months from the date of allotment.',
        'Write-off: **Securities Premium first** (including premium on the same issue), then the Statement of Profit and Loss.',
      ],
      n: 'Final advice. Divide by the issue price, not the face value, when settling a vendor. Work out net assets before the purchase entry. Remember that collateral debentures earn no interest. Count the months of interest from the date of allotment. And when writing off a discount or loss, use securities premium first.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Issue of Debentures — Notes',
  sections: [
    {
      h: '1. Meaning of debentures; debentures and shares',
      t: 1,
      b: 'A **debenture** is a written instrument by which a company acknowledges a **debt**. It states the amount, the **rate of interest** and the **terms of repayment**. Under Section 2(30) of the Companies Act 2013, "debenture" includes debenture stock, bonds and other instruments evidencing a debt, whether or not they create a charge on assets.\n\n- Debentureholders are **creditors**; they get **interest** at a fixed rate, which is a charge against profit.\n- Section 71: debentures cannot carry **voting rights**.\n- Unlike shares (Section 53), debentures **may be issued at a discount**.\n- On winding up, debentureholders are paid **before** shareholders.',
      terms: [
        ['Debenture', 'A written acknowledgement of a debt by a company, with a fixed rate of interest and terms of repayment.'],
        ['Debentureholder', 'A person who has lent money to the company by subscribing to its debentures; a creditor.'],
        ['Face (nominal) value', 'The value printed on the debenture, on which interest is calculated.'],
      ],
      v: vVsShares,
      vs: [vDebFlow],
    },
    {
      h: '2. Types of debentures',
      t: 1,
      b: '- **Security:** *secured* debentures carry a fixed or floating charge on assets; *unsecured (naked)* debentures carry none.\n- **Tenure:** *redeemable* debentures are repaid on a fixed date or by instalments; *irredeemable (perpetual)* debentures are repaid only on winding up (or at the company’s option after a long period).\n- **Convertibility:** *convertible* debentures (fully or partly) may be exchanged for equity shares; *non-convertible* ones may not.\n- **Record:** *registered* debentures are recorded in a register of debentureholders and transferred by a transfer deed; *bearer* debentures pass by delivery, interest being paid on coupons.\n- **Coupon rate:** *specific coupon rate* debentures carry a stated rate; *zero coupon rate* debentures carry none and are issued at a deep discount, the difference being the holder’s return.',
      terms: [
        ['Charge', 'A right over the company’s assets given to secure a debt: fixed (on specific assets) or floating (on assets generally).'],
        ['Zero coupon rate debenture', 'A debenture with no interest, issued at a large discount and repaid at face value.'],
        ['Convertible debenture', 'A debenture that may be exchanged for equity shares on agreed terms.'],
      ],
      v: vTypes,
      vs: [vTypesFlow],
    },
    {
      h: '3. Issue for cash: at par, at a premium, at a discount',
      t: 2,
      b: '**In instalments:**\n1. Bank A/c Dr, To Debenture Application A/c (application money received).\n2. Debenture Application A/c Dr, To Debentures A/c (transfer); excess refunded: Debenture Application A/c Dr, To Bank A/c.\n3. Debenture Allotment A/c Dr, To Debentures A/c (allotment due), then Bank A/c Dr, To Debenture Allotment A/c.\n\n**In a lump sum:** one Debenture Application and Allotment Account.\n\n- **Premium:** credit **Securities Premium A/c** (Section 52 lists its uses).\n- **Discount:** debit **Discount on Issue of Debentures A/c** (a capital loss).\n- The **Debentures A/c is always credited at face value.**',
      terms: [
        ['Issue at a premium', 'Issue at a price above face value; the excess is credited to Securities Premium.'],
        ['Issue at a discount', 'Issue at a price below face value; the shortfall is debited to Discount on Issue of Debentures.'],
        ['Over-subscription', 'Applications for more debentures than are offered; the excess money is refunded.'],
      ],
      v: vPrice,
      vs: [T({ ...J_NA1, alt: 'Journal for an issue at par in two instalments' }), T({ ...J_NA3, alt: 'Journal for an issue at a discount, redeemable at par' })],
    },
    {
      h: '4. Issue with terms of redemption',
      t: 2,
      b: 'The terms of repayment are fixed at the time of issue, giving **six combinations** (issued at par, premium or discount × redeemable at par or premium).\n\n- When debentures are **redeemable at a premium**, the premium payable is credited at issue to **Premium on Redemption of Debentures A/c** (a liability: other long-term liabilities) and debited to **Loss on Issue of Debentures A/c**.\n- Loss on issue = **discount on issue + premium on redemption**.\n- A premium on issue is still credited to Securities Premium; it does not reduce the loss on issue in the entry.\n\nRedemption of debentures itself (its methods, the Debenture Redemption Reserve and the investment for redemption) is not in the 2026–27 syllabus; only the terms of redemption recorded at the time of issue are.',
      terms: [
        ['Premium on Redemption of Debentures', 'The extra amount promised to debentureholders at maturity; a liability.'],
        ['Loss on Issue of Debentures', 'Discount on issue plus premium payable on redemption, recorded at the time of issue.'],
      ],
      v: vSix,
      vs: [vSixBars, T({ ...J_NA4, alt: 'Journal for an issue at a discount, redeemable at a premium' })],
    },
    {
      h: '5. Issue for consideration other than cash',
      t: 3,
      b: '**Asset bought:** Asset A/c Dr, To Vendor’s A/c; then Vendor’s A/c Dr (and Discount on Issue Dr), To Debentures A/c (and To Securities Premium A/c).\n\n**Number of debentures = amount payable to the vendor ÷ issue price.**\n\n**Business bought:**\n- Net assets = assets taken over − liabilities taken over.\n- Sundry Assets Dr (and **Goodwill** Dr if price > net assets), To Sundry Liabilities, To Vendor’s A/c (price), To **Capital Reserve** (if price < net assets).\n- Any part paid in cash: Vendor’s A/c Dr, To Bank A/c.',
      terms: [
        ['Vendor', 'The seller of assets or a business to the company, paid here in debentures.'],
        ['Purchase consideration', 'The price agreed for the assets or business taken over.'],
        ['Capital reserve', 'The gain when the price paid is less than the net assets taken over.'],
      ],
      v: vBP,
      vs: [T({ ...J_KC5, alt: 'Journal for machinery bought for debentures at a premium' }), T({ ...J_KC6, alt: 'Journal for a business bought for debentures at a discount, with a capital reserve' })],
    },
    {
      h: '6. Debentures as collateral security',
      t: 3,
      b: '**Collateral security** is additional security given to a lender besides the main security. No cash is received and **no interest** is paid on collateral debentures.\n\n- **First method:** no entry; the loan is shown under long-term borrowings with a note that it is secured by the collateral debentures.\n- **Second method:** Debentures Suspense A/c Dr, To Debentures A/c. In the note on long-term borrowings, the debentures are shown **less Debentures Suspense**, net nil. The entry is reversed when the loan is repaid.',
      terms: [
        ['Collateral security', 'Additional security for a loan, enforceable only if the borrower defaults.'],
        ['Debentures Suspense Account', 'The account debited when collateral debentures are recorded; deducted from them in the note.'],
      ],
      v: table(N_KC7b.headers, N_KC7b.rows, 'Note on long-term borrowings under the second method: the loan, and the collateral debentures less debentures suspense, net nil'),
      vs: [table(BS_KC7.headers, BS_KC7.rows, 'Balance sheet extract: long-term borrowings shown under non-current liabilities with note one'), vCollFlow],
    },
    {
      h: '7. Interest on debentures; writing off discount and loss',
      t: 4,
      b: '**Interest** (tax deducted at source is outside the syllabus):\n- Interest = **face value × rate × months ÷ 12**, from the date of allotment.\n- Due: Debenture Interest A/c Dr, To Debentureholders’ A/c. Paid: Debentureholders’ A/c Dr, To Bank A/c.\n- Year end: Statement of Profit and Loss Dr, To Debenture Interest A/c (a finance cost).\n- Interest due but unpaid at the year end is shown under other current liabilities.\n\n**Writing off discount / loss on issue (in the year of issue):**\n- Securities Premium A/c Dr (to the extent of its balance, including premium received that year).\n- Statement of Profit and Loss Dr (the balance).\n- To Discount / Loss on Issue of Debentures A/c.',
      terms: [
        ['Debenture interest', 'A charge against profit at the coupon rate on face value, payable even in a year of loss.'],
        ['Writing off', 'Removing a capital loss from the books by charging it to securities premium and then to profit.'],
      ],
      v: vInterest,
      vs: [T({ ...journal(KC9.entries), alt: 'Journal of interest due, paid and transferred for one year' }), T({ ...J_KC10, alt: 'Journal writing off a discount from securities premium and profit' }), vSplit],
    },
  ],
  tips: '**Common mistakes**\n- Crediting Debentures at the **issue price** instead of the face value.\n- Forgetting **Premium on Redemption** and **Loss on Issue** at the time of issue when debentures are redeemable at a premium.\n- Dividing the vendor’s amount by the **face value** instead of the issue price.\n- Debiting **Bank** for collateral debentures, or charging **interest** on them.\n- Calculating interest on the **issue price**, or for the whole year when the debentures were allotted mid-year.\n- Writing off a loss straight to the Statement of Profit and Loss while a **Securities Premium** balance is available.\n\n**How marks are usually awarded**\n- 1 mark: correct option, account or amount.\n- 3 marks: about 1 mark per correct entry, or working (1) + entries (2).\n- 4 marks: a set of entries or an account with step marks (working, each entry, the balancing figure).\n- 6 marks: issue entries (about 2) + vendor, collateral or interest entries (about 2) + write-off or the borrowings note (about 2).\n\n**Figures in SOYL practice** are imagined; your board paper will give its own.',
});

// ---------------------------------------------------------------- flashcards
const FC = cards([
  ['**Debenture**', 'A written acknowledgement of a **debt** by a company, with fixed interest and terms of repayment.', 'definition', 1],
  ['Status of a debentureholder', 'A **creditor** of the company, not an owner.', 'fact', 1],
  ['Return on debentures vs shares', 'Debentures: fixed **interest**, a charge against profit. Shares: **dividend**, an appropriation of profit.', 'concept', 1],
  ['Voting rights of debentureholders', 'None: **Section 71** forbids debentures with voting rights.', 'fact', 1],
  ['Issue at a discount: shares or debentures?', 'Debentures **may**; shares may **not** (Section 53, sweat equity apart).', 'exam-tip', 1],
  ['Secured vs unsecured', 'Secured: a **charge** on assets. Unsecured (naked): no charge.', 'concept', 1],
  ['Irredeemable debentures', 'No repayment date; repaid on **winding up**.', 'definition', 1],
  ['Bearer debentures', 'Transferable by **mere delivery**; interest paid on coupons.', 'definition', 1],
  ['Zero coupon rate debentures', 'No interest; issued at a **deep discount**; the gap is the return.', 'definition', 1],
  ['Debentures A/c is credited at…', 'Always the **face value**.', 'exam-tip', 2],
  ['Premium on issue of debentures', 'Credited to **Securities Premium A/c**.', 'fact', 2],
  ['Discount on issue (redeemable at par)', 'Debited to **Discount on Issue of Debentures A/c**, a capital loss.', 'fact', 2],
  ['Redeemable at a premium: entry at issue', '**Loss on Issue Dr**; **Premium on Redemption Cr**.', 'fact', 2],
  ['**Loss on Issue of Debentures**', 'Discount on issue **+** premium payable on redemption.', 'definition', 2],
  ['Nature of Premium on Redemption', 'A **liability**: other long-term liabilities.', 'fact', 2],
  ['How many combinations of issue and redemption terms?', '**Six**: par, premium or discount × redeemable at par or premium.', 'concept', 2],
  ['Excess application money', 'Refunded: Debenture Application A/c Dr, To Bank A/c.', 'fact', 2],
  ['Debentures to a vendor: how many?', '**Amount payable ÷ issue price.**', 'exam-tip', 3],
  ['Asset bought for debentures: first entry', 'Asset A/c Dr, To **Vendor’s A/c**.', 'fact', 3],
  ['Business bought: price > net assets', 'The excess is **Goodwill** (debit).', 'concept', 3],
  ['Business bought: price < net assets', 'The gain is **Capital Reserve** (credit).', 'concept', 3],
  ['**Collateral security**', 'Additional security for a loan; enforceable only on default.', 'definition', 3],
  ['Collateral: first method', 'No entry; a **note** under the loan.', 'fact', 3],
  ['Collateral: second method', '**Debentures Suspense Dr**, To Debentures; shown net nil.', 'fact', 3],
  ['Interest on collateral debentures', '**None**; interest is paid on the loan.', 'exam-tip', 3],
  ['Interest is calculated on…', 'The **face value**, at the coupon rate, for the months outstanding.', 'fact', 4],
  ['Interest falls due: entry', 'Debenture Interest A/c Dr, To **Debentureholders’ A/c**.', 'fact', 4],
  ['Debenture interest at the year end', 'Transferred to the **Statement of Profit and Loss**.', 'fact', 4],
  ['Writing off discount or loss: order', '**Securities Premium first**, then the Statement of Profit and Loss.', 'exam-tip', 4],
  ['When is the loss written off (syllabus)?', 'In the **year of issue**.', 'fact', 4],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-12-accountancy-chapter-test-short',
  title: 'Chapter test (short) — Issue of Debentures',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_vs_shares', 'm_discount_amt', 'm_interest_calc', 'ar_creditor'] },
    { id: 'B', title: 'Section B — Short answer (3 marks each)', instr: 'Show all working.', items: ['s3_discount_par', 's3_interest'] },
    { id: 'C', title: 'Section C — Long answer (4 marks)', instr: 'Answer any ONE of the two questions. Show all working.', items: [{ attempt: 1, keys: ['l4_four_cases', 'l4_collateral'] }] },
    { id: 'D', title: 'Section D — Long answer (6 marks)', instr: 'Answer any ONE of the two questions. Show all working.', items: [{ attempt: 1, keys: ['l6_three_lots', 'l6_bp'] }] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-12-accountancy-chapter-test-long',
  title: 'Chapter test (long) — Issue of Debentures',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–8 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_convertible', 'm_loss_case', 'm_vendor_n', 'm_capres', 'm_suspense', 'm_writeoff_amt', 'ar_discount_shares', 'ar_sp_writeoff'] },
    { id: 'B', title: 'Section B — Short answer (3 marks each)', instr: 'Answer all questions; question 12 has an internal choice. Show all working.', items: ['s3_vs_shares', 's3_machinery', 's3_writeoff', { attempt: 1, keys: ['s3_bp', 's3_collateral'] }] },
    { id: 'C', title: 'Section C — Long answer (4 marks each)', instr: 'Answer question 13, and any ONE of questions 14 and 15.', items: ['l4_interest', { attempt: 1, keys: ['l4_app_allot', 'l4_writeoff'] }] },
    { id: 'D', title: 'Section D — Long answer (6 marks each)', instr: 'Answer question 16, and any ONE of questions 17 and 18.', items: ['l6_app_allot', { attempt: 1, keys: ['l6_collateral', 'l6_interest'] }] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: FC,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t04 of cbse-12-accountancy-ch07 only (meaning and types; issue at par, premium and discount, with terms of redemption; consideration other than cash and collateral security; interest, TDS excluded, and writing off discount or loss in the year of issue). Redemption of debentures (deleted for 2026–27) appears only as one note in notes section 4',
    originality: 'every company, vendor, scenario and figure written for this chapter (imagined companies in Indian towns); no NCERT illustration or exercise and no CBSE sample or past-paper item reused',
    accounts: `every figure computed by acc.mjs and asserted: journal entries balance, every ledger balances, debentures credited equal face value, received + loss = face value + securities premium + premium on redemption, write-offs exhaust the loss, borrowings notes total (${FACTS.join('; ')})`,
    facts: 'Companies Act 2013: Section 2(30) definition, Section 52 (uses of securities premium include discount on issue and premium on redemption of debentures), Section 53 (no shares at a discount), Section 71 (no voting rights on debentures); Schedule III heads for debentures, premium on redemption and collateral debentures',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
