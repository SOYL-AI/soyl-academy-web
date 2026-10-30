// CBSE 12 Accountancy, ch07 Issue of Debentures — question bank. Every company, vendor and figure is
// imagined by SOYL; no NCERT illustration or exercise and no CBSE sample/past-paper item is reused.
// Every amount is computed by acc.mjs from the givens and every statement is checked there (journal
// entries balance, ledgers balance, issue identities hold, notes total), so a figure in a key or model
// answer is never typed by hand. Redemption of debentures is not in the 2026-27 syllabus: no item uses it.
import { Q, mcq, ar, tf, fb, match, num, short, long } from './lib.mjs';
import { fig, rs, md, journal, ledger, note, lot, allotEntry, cashIssue, stagedIssue, vendorLot, purchase, interest, interestYear, writeOff, check, LOSS, DISC, SP } from './acc.mjs';

/** Balance sheet extract: rows [label, noteNo, amount] under the given heads. */
export function bsx(heads) {
  const rows = [['**I. Equity and Liabilities**', '', '']];
  for (const [head, items] of heads) {
    rows.push([head, '', '']);
    for (const [label, n, v] of items) rows.push([label, n, fig(v)]);
  }
  const headers = ['Particulars', 'Note No.', '₹'];
  return { headers, rows, md: md(headers, rows, [2]) };
}

// ================================================================ t01 Meaning, debentures vs shares, types
Q('m_meaning', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'A person who holds debentures of a company is',
  opts: ['a creditor of the company', 'an owner of the company', 'a member with voting rights at general meetings', 'a partner in the company'],
  sol: 'A debenture acknowledges money lent to the company, so its holder is a creditor; members (shareholders) are the owners.',
}));

Q('m_vs_shares', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which of the following correctly distinguishes debentures from equity shares?',
  opts: [
    'Interest on debentures must be paid even in a year of loss, whereas dividend on equity shares depends on profits',
    'Debentureholders enjoy voting rights, whereas equity shareholders do not',
    'Debentures can never be converted into shares, whereas shares can be converted into debentures',
    'On winding up, equity shareholders are repaid before debentureholders',
  ],
  sol: 'Debenture interest is a charge against profit and is owed whatever the result of the year; dividend is an appropriation of profit. The other three statements reverse the true position.',
}));

Q('m_zero_coupon', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: "Debentures that carry no stated rate of interest and are issued at a large discount, the discount being the investor's return, are called",
  opts: ['zero coupon rate debentures', 'specific coupon rate debentures', 'irredeemable debentures', 'bearer debentures'],
  sol: 'No periodic interest is paid on them; the holder earns the gap between the low issue price and the amount received at maturity.',
}));

Q('m_secured', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Debentures that are backed by a charge on the assets of the company are known as',
  opts: ['secured debentures', 'unsecured (naked) debentures', 'bearer debentures', 'convertible debentures'],
  sol: 'A fixed or floating charge on assets is what makes a debenture secured; naked debentures carry no such charge.',
}));

Q('m_convertible', mcq({
  t: 1, d: 3, c: 'application',
  stem: "Tapti Textiles Ltd, an imagined company in Surat, issues debentures whose holders' names are entered in its register of debentureholders and which, at the end of four years, may be exchanged for equity shares at a stated price. These debentures are best described as",
  opts: ['registered convertible debentures', 'bearer non-convertible debentures', 'registered irredeemable debentures', 'bearer zero coupon rate debentures'],
  sol: 'Names entered in the register make them registered (transferable only by a transfer deed); the option to exchange them for equity shares makes them convertible.',
}));

Q('m_bearer', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'The debentures of an imagined company are transferable by mere delivery, and interest is paid to whoever presents the interest coupon. They are',
  opts: ['bearer debentures', 'registered debentures', 'secured debentures', 'convertible debentures'],
  sol: 'No register of holders is kept for them; the holder for the time being is entitled to interest and repayment, which is the mark of bearer debentures.',
}));

Q('ar_creditor', ar({
  t: 1, d: 2, c: 'understanding', key: 'a',
  a: 'Debentureholders have no right to vote at the general meetings of a company.',
  r: 'Debentureholders are creditors of the company, not its owners.',
  sol: 'Both are true. Voting belongs to members, who own the company; a debentureholder has only lent it money, so R explains A.',
}));

Q('ar_discount_shares', ar({
  t: [1, 2], d: 3, c: 'analysis', key: 'd',
  a: 'Like debentures, equity shares may be issued to the public at a discount.',
  r: 'A company may issue debentures at a discount, the discount being a capital loss.',
  sol: 'A is false: Section 53 of the Companies Act 2013 forbids issuing shares at a discount (sweat equity shares apart). R is true: debentures may be issued below face value.',
}));

Q('tf_irredeemable', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? Irredeemable debentures are never repaid by the company, not even when it is wound up.',
  sol: 'They have no repayment date during the life of the company, but they are repaid when the company is wound up.',
}));

Q('fb_debt', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'A debenture is a written instrument acknowledging a ___ taken by a company.',
  acc: [['debt', 'loan']],
  sol: 'It acknowledges a debt (a loan) that the company owes to the holder.',
}));

Q('mt_types', match({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Match each kind of debenture in column A with its feature in column B.',
  pairs: [
    ['Secured debentures', 'Carry a fixed or floating charge on the assets of the company'],
    ['Bearer debentures', 'Pass by mere delivery; interest is paid on presenting a coupon'],
    ['Convertible debentures', 'May be exchanged for equity shares on agreed terms'],
    ['Zero coupon rate debentures', 'Pay no interest; issued at a deep discount'],
  ],
  sol: 'The pairs use four different bases: security, record, convertibility and coupon rate.',
}));

Q('s3_vs_shares', short({
  t: 1, d: 2, c: 'understanding', marks: 3,
  stem: 'Distinguish between shares and debentures on any three bases.',
  model: md(['Basis', 'Shares', 'Debentures'], [
    ['Status of the holder', 'Owner (member) of the company', 'Creditor of the company'],
    ['Return', 'Dividend, an appropriation of profit; varies with profit', 'Interest at a fixed rate, a charge against profit; payable even in a loss'],
    ['Voting rights', 'Equity shareholders vote at general meetings', 'No voting rights (Section 71)'],
    ['Repayment', 'Not repaid during the life of the company (except buy-back and redeemable preference shares)', 'Repaid on the agreed terms; before shareholders on winding up'],
    ['Issue at a discount', 'Not allowed (Section 53), except sweat equity shares', 'Allowed'],
  ]),
  sol: 'Any three bases with both sides stated correctly earn the marks.',
  scheme: [['First basis, both sides', 1], ['Second basis, both sides', 1], ['Third basis, both sides', 1]],
}));

const ZC = { face: 1000, price: 600 };
Q('s3_classify', short({
  t: 1, d: 3, c: 'application', marks: 3,
  stem: `Classify each of the following imagined issues, naming the basis of classification and giving a reason.\n\n(a) Ganga Paper Mills Ltd issues debentures that carry no charge on any asset.\n(b) Kaveri Motors Ltd issues debentures that will be repaid only when the company is wound up.\n(c) Sindhu Solar Ltd issues debentures of ${rs(ZC.face)} each at ${rs(ZC.price)}, repayable at ${rs(ZC.face)} after five years, with no interest in between.`,
  model: md(['Issue', 'Kind of debenture', 'Basis', 'Reason'], [
    ['(a)', 'Unsecured (naked) debentures', 'Security', 'No charge is created on any asset'],
    ['(b)', 'Irredeemable (perpetual) debentures', 'Tenure (redemption)', 'No repayment date; repaid only on winding up'],
    ['(c)', 'Zero coupon rate debentures', 'Coupon rate', `No interest; the holder's return is ${fig(ZC.face)} − ${fig(ZC.price)} = ${fig(ZC.face - ZC.price)} per debenture`],
  ]),
  sol: 'Look for the feature that decides each basis: a charge on assets, a repayment date, and the presence or absence of interest.',
  scheme: [['(a) unsecured, with reason', 1], ['(b) irredeemable, with reason', 1], ['(c) zero coupon rate, with reason', 1]],
}));

// ================================================================ t02 Issue at par, premium, discount; terms of redemption
Q('m_premium_credit', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'The premium received on the issue of debentures is credited to',
  opts: ['Securities Premium Account', 'Premium on Redemption of Debentures Account', 'the Statement of Profit and Loss', 'the Debentures Account'],
  sol: 'An amount collected above face value is a capital receipt kept in Securities Premium; Premium on Redemption is the extra amount the company will pay later.',
}));

const L_YAM = lot({ n: 4000, face: 100, rate: 8, iss: -6 });
check(L_YAM.received === 376000 && L_YAM.discount === 24000, 'L_YAM');
Q('m_discount_amt', mcq({
  t: 2, d: 2, c: 'application',
  stem: `Yamuna Foods Ltd (imagined) issues ${fig(L_YAM.n)} 8% debentures of ₹100 each at a discount of 6%, redeemable at par, the whole amount being payable on application. The amount the company receives is`,
  opts: [rs(L_YAM.received), rs(L_YAM.nominal), rs(L_YAM.nominal + L_YAM.discount), rs(L_YAM.discount)],
  sol: `Issue price = 100 − 6 = ${L_YAM.price}; ${fig(L_YAM.n)} × ${L_YAM.price} = ${fig(L_YAM.received)}. The discount of ${fig(L_YAM.discount)} is debited to Discount on Issue of Debentures Account.`,
}));

const L_BHI = lot({ n: 2000, face: 100, rate: 9, iss: -5, red: 5 });
check(L_BHI.loss === 20000, 'L_BHI');
Q('m_loss_case', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Bhima Steel Ltd (imagined) issues ${fig(L_BHI.n)} 9% debentures of ₹100 each at a discount of 5%, redeemable at a premium of 5%. The amount debited to Loss on Issue of Debentures Account is`,
  opts: [rs(L_BHI.loss), rs(L_BHI.discount), rs(L_BHI.discount / 2), rs(L_BHI.nominal + L_BHI.redPremium)],
  sol: `Discount = 5% of ${fig(L_BHI.nominal)} = ${fig(L_BHI.discount)}; premium payable on redemption = 5% of ${fig(L_BHI.nominal)} = ${fig(L_BHI.redPremium)}. Loss on issue = ${fig(L_BHI.discount)} + ${fig(L_BHI.redPremium)} = ${fig(L_BHI.loss)}.`,
}));

Q('m_prd_nature', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Premium on Redemption of Debentures Account, credited at the time of issue, is',
  opts: ['a liability, shown under other long-term liabilities', 'an asset, shown under other non-current assets', 'a capital receipt, added to Securities Premium', 'an income, credited to the Statement of Profit and Loss'],
  sol: 'It is the extra sum the company has promised to pay the debentureholders at maturity, so it is owed: a liability (other long-term liabilities in Schedule III).',
}));

Q('m_both_prem', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'Debentures are issued at a premium of 10% and are redeemable at a premium of 5%. In the journal entry for their allotment, which accounts are credited?',
  opts: ['Debentures, Securities Premium and Premium on Redemption of Debentures', 'Debentures and Securities Premium only', 'Debentures and Premium on Redemption of Debentures only', 'Debentures, Securities Premium and Loss on Issue of Debentures'],
  sol: 'Face value goes to Debentures, the 10% collected to Securities Premium and the 5% promised to Premium on Redemption; Loss on Issue of Debentures is debited with that 5%, so it is never a credit here.',
}));

Q('m_oversub', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Applications are received for more debentures than are offered, and the excess application money is returned. The entry for the refund is',
  opts: ['Debenture Application A/c Dr, To Bank A/c', 'Bank A/c Dr, To Debenture Application A/c', 'Debentures A/c Dr, To Bank A/c', 'Debenture Application A/c Dr, To Debentures A/c'],
  sol: 'The excess was credited to Debenture Application when received; returning it reduces that account and the bank balance.',
}));

Q('ar_discount_capital', ar({
  t: [2, 4], d: 2, c: 'understanding', key: 'c',
  a: 'Discount on the issue of debentures is a capital loss.',
  r: 'Discount on the issue of debentures can be written off only from the Statement of Profit and Loss, never from Securities Premium.',
  sol: 'A is true: the company receives less than it must repay, a loss of a capital nature. R is false: the discount may be written off from Securities Premium first and only the rest from the Statement of Profit and Loss.',
}));

Q('tf_prem_par', tf({
  t: 2, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? When debentures are issued at a premium and are redeemable at par, a Loss on Issue of Debentures Account is debited at the time of issue.',
  sol: 'There is no loss: the company collects more than face value and repays only face value. The premium goes to Securities Premium and no loss account is opened.',
}));

Q('fb_prd', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'When debentures are redeemable at a premium, the premium payable at maturity is credited at the time of issue to the ___ Account.',
  acc: [['Premium on Redemption of Debentures', 'Premium on Redemption of Debenture']],
  sol: 'It goes to Premium on Redemption of Debentures Account (a liability), with the matching debit to Loss on Issue of Debentures Account.',
}));

const L_KRI = lot({ n: 6000, face: 50, rate: 10, iss: 8 });
check(L_KRI.received === 324000, 'L_KRI');
Q('n_received', num({
  t: 2, d: 2, c: 'application', marks: 2, value: L_KRI.received, unit: '₹',
  stem: `Krishna Polymers Ltd (imagined) issues ${fig(L_KRI.n)} 10% debentures of ₹50 each at a premium of 8%. Find the total amount received on the issue (in ₹).`,
  sol: `Issue price = 50 + 8% of 50 = ${L_KRI.price}. Amount received = ${fig(L_KRI.n)} × ${L_KRI.price} = ${fig(L_KRI.received)}. So ₹${fig(L_KRI.received)}.`,
  scheme: [[`Issue price ₹${L_KRI.price}`, 1], [`Amount ${rs(L_KRI.received)}`, 1]],
}));

const L_PEN = lot({ n: 1500, face: 1000, rate: 9, iss: -2, red: 6 });
check(L_PEN.loss === 120000, 'L_PEN');
Q('n_loss', num({
  t: 2, d: 3, c: 'application', marks: 2, value: L_PEN.loss, unit: '₹',
  stem: `Pench Power Ltd (imagined) issues ${fig(L_PEN.n)} 9% debentures of ₹1,000 each at a discount of 2%, redeemable at a premium of 6% after five years. Calculate the loss on issue of debentures (in ₹).`,
  sol: `Face value = ${fig(L_PEN.n)} × 1,000 = ${fig(L_PEN.nominal)}. Discount (2%) = ${fig(L_PEN.discount)}; premium on redemption (6%) = ${fig(L_PEN.redPremium)}. Loss on issue = ${fig(L_PEN.discount)} + ${fig(L_PEN.redPremium)} = ${fig(L_PEN.loss)}. So ₹${fig(L_PEN.loss)}.`,
  scheme: [['Discount and premium on redemption', 1], [`Loss ${rs(L_PEN.loss)}`, 1]],
}));

const L_CHA = lot({ n: 8000, face: 100, rate: 9 });
const S_CHA = stagedIssue(L_CHA, { app: 40 });
Q('s3_app_allot', short({
  t: 2, d: 2, c: 'application', marks: 3,
  stem: `Chambal Fertilisers Ltd (imagined) issued ${fig(L_CHA.n)} 9% debentures of ₹100 each at par, payable ₹${S_CHA.app} on application and ₹${S_CHA.allot} on allotment. The issue was fully subscribed and all money was received. Pass the journal entries.`,
  model: journal(S_CHA.entries).md,
  sol: 'Record each instalment as it is received and transfer it to the debentures account; the face value credited must total the full issue.',
  scheme: [['Application money received and transferred', 1], ['Allotment money due', 1], ['Allotment money received', 1]],
}));

const L_MAH = lot({ n: 5000, face: 100, rate: 11, iss: -4 });
const J_MAH = journal(cashIssue(L_MAH, { applied: 7000 }));
check(J_MAH.entries.length === 3 && J_MAH.entries[2].cr[0][1] === 192000, 'L_MAH');
Q('s3_discount_par', short({
  t: 2, d: 3, c: 'application', marks: 3,
  stem: `Mahanadi Cement Ltd (imagined) invited applications for ${fig(L_MAH.n)} 11% debentures of ₹100 each at a discount of 4%, redeemable at par, the whole amount being payable on application. Applications were received for 7,000 debentures. Debentures were allotted to applicants for ${fig(L_MAH.n)}, and the money of the other applicants was refunded. Pass the journal entries.`,
  model: `Issue price = 100 − 4 = ${L_MAH.price}.\n\n${J_MAH.md}`,
  sol: 'Collect the whole issue price from every applicant, allot at face value with the discount debited, and refund the money of those not allotted.',
  scheme: [['Application money received', 1], ['Allotment with discount', 1], ['Refund', 1]],
}));

const L_GOD = lot({ n: 3000, face: 100, rate: 8, iss: 10, red: 5 });
check(L_GOD.premium === 30000 && L_GOD.redPremium === 15000 && L_GOD.loss === 15000, 'L_GOD');
Q('s3_prem_prem', short({
  t: 2, d: 3, c: 'application', marks: 3,
  stem: `Godavari Ceramics Ltd (imagined) issued ${fig(L_GOD.n)} 8% debentures of ₹100 each at a premium of 10%, redeemable at a premium of 5% after six years. The whole amount was received with the applications. Pass the journal entries for the issue.`,
  model: `Amount received = ${fig(L_GOD.n)} × ${L_GOD.price} = ${fig(L_GOD.received)}; premium on issue ${fig(L_GOD.premium)}; premium payable on redemption ${fig(L_GOD.redPremium)}.\n\n${journal(cashIssue(L_GOD)).md}`,
  sol: 'Two premiums, two accounts: the one collected now is Securities Premium; the one promised later is a liability matched by a loss on issue.',
  scheme: [['Application money received', 1], ['Debentures and Securities Premium credited', 1], ['Premium on Redemption credited, Loss on Issue debited', 1]],
}));

const SAR = [
  lot({ n: 2000, face: 500, rate: 9, iss: -4 }),
  lot({ n: 2000, face: 500, rate: 9, red: 6 }),
  lot({ n: 2000, face: 500, rate: 9, iss: 5 }),
  lot({ n: 2000, face: 500, rate: 9, iss: -3, red: 5 }),
];
check(SAR[3].loss === 80000 && SAR[1].loss === 60000, 'SAR');
const SARlab = ['(a)', '(b)', '(c)', '(d)'];
Q('l4_four_cases', long({
  t: 2, d: 3, c: 'application', marks: 4,
  stem: `Saraswati Mills Ltd (imagined) issued ${fig(SAR[0].n)} 9% debentures of ₹500 each, the whole amount being received in cash. Pass the journal entry for the issue in each of the following cases (combine receipt and allotment in one entry):\n\n(a) issued at a discount of 4%, redeemable at par;\n(b) issued at par, redeemable at a premium of 6%;\n(c) issued at a premium of 5%, redeemable at par;\n(d) issued at a discount of 3%, redeemable at a premium of 5%.`,
  model: SAR.map((L, i) => `**${SARlab[i]}** Amount received ${fig(L.received)}${L.loss ? `; ${L.lossAc.replace(/ A\/c$/, '')} ${fig(L.loss)}` : ''}${L.premium ? `; securities premium ${fig(L.premium)}` : ''}.\n\n${journal([allotEntry(L, 'Bank A/c', `issue of ${fig(L.n)} 9% debentures of ₹500 each, case ${SARlab[i]}`)]).md}`).join('\n\n'),
  sol: 'A redemption premium always brings in a Loss on Issue debit; a discount alone is debited to Discount on Issue; a premium on issue is credited to Securities Premium.',
  scheme: SAR.map((_, i) => [`Case ${SARlab[i]}`, 1]),
}));

const BRA = [lot({ n: 2000, face: 100, rate: 10, red: 5 }), lot({ n: 1500, face: 100, rate: 9, iss: 10 }), lot({ n: 3000, face: 100, rate: 11, iss: -4, red: 6 })];
const BRAloss = BRA[0].loss + BRA[2].loss;
const BRAsp = BRA[1].premium;
const W_BRA = writeOff(BRAloss, BRAsp, { date: '31 Mar 2027' });
check(BRAloss === 40000 && W_BRA.fromSP === 15000 && W_BRA.fromPL === 25000, 'BRA');
const BRAterms = ['at par, redeemable at a premium of 5%', 'at a premium of 10%, redeemable at par', 'at a discount of 4%, redeemable at a premium of 6%'];
Q('l6_three_lots', long({
  t: [2, 4], d: 4, c: 'analysis', marks: 6,
  stem: `On 1 April 2026, Brahmaputra Tea Ltd (imagined, Dibrugarh) made three issues of debentures of ₹100 each, receiving the whole amount in cash:\n\n(i) ${fig(BRA[0].n)} 10% debentures ${BRAterms[0]};\n(ii) ${fig(BRA[1].n)} 9% debentures ${BRAterms[1]};\n(iii) ${fig(BRA[2].n)} 11% debentures ${BRAterms[2]}.\n\nThe company had no other balance in its Securities Premium Account. Pass the journal entries for the three issues and for writing off the loss on issue on 31 March 2027, using Securities Premium first.`,
  model: `Loss on issue: (i) ${fig(BRA[0].loss)}; (iii) discount ${fig(BRA[2].discount)} + premium on redemption ${fig(BRA[2].redPremium)} = ${fig(BRA[2].loss)}; total ${fig(BRAloss)}. Securities Premium available from (ii): ${fig(BRAsp)}.\n\n${journal([
    ...BRA.map((L, i) => allotEntry(L, 'Bank A/c', `issue of ${fig(L.n)} ${L.rate}% debentures ${BRAterms[i]}`, { date: '1 Apr 2026' })),
    W_BRA.entry,
  ]).md}`,
  sol: 'Find the loss of each lot, add them, then exhaust the premium collected before charging the Statement of Profit and Loss.',
  scheme: [['Issue (i) with Loss on Issue and Premium on Redemption', 1.5], ['Issue (ii) with Securities Premium', 1], ['Issue (iii) with combined loss', 1.5], [`Write-off: ${rs(W_BRA.fromSP)} from Securities Premium, ${rs(W_BRA.fromPL)} from the Statement of Profit and Loss`, 2]],
}));

const L_TUN = lot({ n: 10000, face: 100, rate: 9, iss: 5 });
const S_TUN = stagedIssue(L_TUN, { app: 40, applied: 12000 });
check(S_TUN.allot === 65 && S_TUN.refund === 80000, 'S_TUN');
Q('l4_app_allot', long({
  t: 2, d: 3, c: 'application', marks: 4,
  stem: `Tungabhadra Sugars Ltd (imagined) offered ${fig(L_TUN.n)} 9% debentures of ₹100 each at a premium of 5%, redeemable at par, payable ₹${S_TUN.app} on application and the balance (including the premium) on allotment. Applications were received for 12,000 debentures. The excess application money was refunded and the allotment money was received in full. Pass the journal entries.`,
  model: `Allotment money = ${L_TUN.price} − ${S_TUN.app} = ₹${S_TUN.allot} per debenture (₹${S_TUN.allot - L_TUN.premium / L_TUN.n} towards face value and ₹${L_TUN.premium / L_TUN.n} premium).\n\n${journal(S_TUN.entries).md}`,
  sol: 'The premium is called with allotment, so it is credited in the allotment entry; refund only the application money of the unsuccessful applicants.',
  scheme: [['Application money received and transferred', 1], ['Refund of excess application money', 1], ['Allotment due with premium', 1], ['Allotment received', 1]],
}));

const L_DAM = lot({ n: 8000, face: 100, rate: 10, iss: -4, red: 6 });
const S_DAM = stagedIssue(L_DAM, { app: 30, applied: 11000 });
const W_DAM = writeOff(L_DAM.loss, 35000, { date: '31 Mar 2027' });
check(L_DAM.loss === 80000 && S_DAM.refund === 90000 && W_DAM.fromPL === 45000, 'DAM');
Q('l6_app_allot', long({
  t: [2, 4], d: 4, c: 'analysis', marks: 6,
  stem: `On 1 April 2026, Damodar Valley Mills Ltd (imagined) offered ${fig(L_DAM.n)} 10% debentures of ₹100 each at a discount of 4%, redeemable at a premium of 6% after five years, payable ₹${S_DAM.app} on application and the balance on allotment. Applications were received for 11,000 debentures; the excess application money was refunded and the allotment money was received in full. The company's Securities Premium Account already had a balance of ${rs(35000)}. Pass the journal entries for the issue and for writing off the loss on issue on 31 March 2027.`,
  model: `Issue price = ${L_DAM.price}; allotment money = ${L_DAM.price} − ${S_DAM.app} = ₹${S_DAM.allot}. Loss on issue = discount ${fig(L_DAM.discount)} + premium on redemption ${fig(L_DAM.redPremium)} = ${fig(L_DAM.loss)}. Written off: ${fig(W_DAM.fromSP)} from Securities Premium and ${fig(W_DAM.fromPL)} from the Statement of Profit and Loss.\n\n${journal([...S_DAM.entries.map((e) => ({ ...e, date: '1 Apr 2026' })), W_DAM.entry]).md}`,
  sol: 'The discount reduces the allotment money; the loss account carries both the discount and the redemption premium and is cleared in the year of issue.',
  scheme: [['Application received, transferred and refund', 1.5], ['Allotment due with Loss on Issue and Premium on Redemption', 2], ['Allotment received', 0.5], ['Write-off from Securities Premium and the Statement of Profit and Loss', 2]],
}));

const EV = { need: 950000 };
const EV_X = lot({ n: 10000, face: 100, rate: 10, iss: -5 });
const EV_Y = lot({ n: 9500, face: 100, rate: 10, red: 10 });
check(EV_X.received === EV.need && EV_Y.received === EV.need, 'EV raises the same cash');
const EV_rows = [EV_X, EV_Y].map((L) => {
  const yr = interest(L.nominal, L.rate, 12);
  return { L, yr, five: 5 * yr, total: 5 * yr + L.loss, first: yr + L.loss };
});
check(EV_rows[0].total === 550000 && EV_rows[1].total === 570000 && EV_rows[0].first === 150000 && EV_rows[1].first === 190000, 'EV');
Q('l4_evaluate', long({
  t: [2, 4], d: 4, c: 'evaluation', marks: 4,
  stem: `Mandovi Shipping Ltd (imagined, Panaji) needs exactly ${rs(EV.need)} for five years and has no Securities Premium balance. It can either\n\n- **Option X:** issue ${fig(EV_X.n)} 10% debentures of ₹100 each at a discount of 5%, redeemable at par after five years; or\n- **Option Y:** issue ${fig(EV_Y.n)} 10% debentures of ₹100 each at par, redeemable at a premium of 10% after five years.\n\nFor each option, calculate the loss on issue and the total cost to the company over five years (interest plus loss on issue), and the charge to the Statement of Profit and Loss in the year of issue if the loss is written off in that year. Advise the company.`,
  model: `${md(['', 'Option X (₹)', 'Option Y (₹)'], [
    ['Cash raised', fig(EV_X.received), fig(EV_Y.received)],
    ['Face value', fig(EV_X.nominal), fig(EV_Y.nominal)],
    ['Loss on issue (discount / premium on redemption)', fig(EV_X.loss), fig(EV_Y.loss)],
    ['Interest per year (10% of face value)', fig(EV_rows[0].yr), fig(EV_rows[1].yr)],
    ['Interest for five years', fig(EV_rows[0].five), fig(EV_rows[1].five)],
    ['**Total cost over five years**', `**${fig(EV_rows[0].total)}**`, `**${fig(EV_rows[1].total)}**`],
    ['Charge in the year of issue (interest + loss)', fig(EV_rows[0].first), fig(EV_rows[1].first)],
  ], [1, 2])}\n\n**Advice:** Option X costs ${fig(EV_rows[1].total - EV_rows[0].total)} less over five years and charges ${fig(EV_rows[1].first - EV_rows[0].first)} less to the year of issue. Although X pays more interest each year (interest is on the larger face value), the much smaller loss on issue outweighs it. Option X is preferable, unless the company specially wants a smaller annual interest outgo.`,
  sol: 'Compare like with like: same cash raised, then add each option’s interest and its loss on issue; remember that interest is always on face value.',
  scheme: [['Loss on issue under each option', 1], ['Interest for five years under each option', 1], ['Total cost and first-year charge', 1], ['Advice with reason', 1]],
}));

// ================================================================ t03 Consideration other than cash; collateral security
const L_SUT = vendorLot({ amount: 270000, face: 100, rate: 9, iss: -10 });
check(L_SUT.n === 3000, 'L_SUT');
Q('m_vendor_n', mcq({
  t: 3, d: 2, c: 'application',
  stem: `Sutlej Engineering Ltd (imagined) buys machinery for ${rs(L_SUT.received)} and pays the vendor by issuing 9% debentures of ₹100 each at a discount of 10%. The number of debentures issued is`,
  opts: [fig(L_SUT.n), fig(L_SUT.received / 100), fig((L_SUT.n * 11) / 10), fig((L_SUT.received * 9) / 1000)],
  sol: `Issue price = 100 − 10 = ${L_SUT.price}; number = ${fig(L_SUT.received)} ÷ ${L_SUT.price} = ${fig(L_SUT.n)} debentures (face value ${fig(L_SUT.nominal)}, discount ${fig(L_SUT.discount)}).`,
}));

Q('m_vendor_entry', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'A company buys a building from Sharma Builders, an imagined vendor, and agrees to pay by issuing debentures. The entry on purchase of the building is',
  opts: ["Building A/c Dr, To Sharma Builders' A/c", "Sharma Builders' A/c Dr, To Building A/c", 'Building A/c Dr, To Bank A/c', 'Debentures A/c Dr, To Building A/c'],
  sol: "The vendor becomes a creditor for the price; when the debentures are allotted, the vendor's account is debited and the debentures account credited.",
}));

const P_LUN = purchase({ assets: [['Sundry Assets A/c', 640000]], liabs: [['Sundry Liabilities A/c', 140000]], pc: 450000, vendor: "Vendor's A/c" });
check(P_LUN.capRes === 50000, 'P_LUN');
Q('m_capres', mcq({
  t: 3, d: 3, c: 'application',
  stem: `Luni Traders Ltd (imagined) takes over assets of ${rs(P_LUN.A)} and liabilities of ${rs(P_LUN.L)} of a firm for a purchase consideration of ${rs(P_LUN.pc)}. The difference is recorded as`,
  opts: [`Capital Reserve of ${rs(P_LUN.capRes)}`, `Goodwill of ${rs(P_LUN.capRes)}`, `Capital Reserve of ${rs(P_LUN.L + P_LUN.capRes)}`, `Goodwill of ${rs(P_LUN.L + P_LUN.capRes)}`],
  sol: `Net assets = ${fig(P_LUN.A)} − ${fig(P_LUN.L)} = ${fig(P_LUN.net)}; the price paid is ${fig(P_LUN.net - P_LUN.pc)} less, a gain of a capital nature credited to Capital Reserve.`,
}));

Q('m_collateral_note', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'When debentures issued as collateral security are not recorded in the books (the first method), they are disclosed',
  opts: ['by a note under the loan in the notes to accounts', 'as a separate item of long-term borrowings at face value', 'under reserves and surplus', 'nowhere, because no entry is passed'],
  sol: 'No liability arises unless the lender has to enforce the security, so only the fact is disclosed: the loan is described as secured by the collateral debentures.',
}));

Q('m_suspense', mcq({
  t: 3, d: 3, c: 'understanding',
  stem: 'Under the second method of recording debentures issued as collateral security, Debentures Suspense Account is shown in the balance sheet',
  opts: ['as a deduction from those debentures under long-term borrowings', 'under other non-current assets', 'under reserves and surplus', 'as an addition to the bank loan'],
  sol: 'Deducting the suspense balance from the collateral debentures leaves a net figure of nil, so borrowings are not overstated.',
}));

Q('tf_goodwill_bp', tf({
  t: 3, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? When the purchase consideration for a business exceeds the net assets taken over, the excess is debited to Goodwill Account.',
  sol: 'Paying more than the value of the net assets means paying for goodwill, so the excess is a debit to Goodwill Account.',
}));

Q('fb_collateral', fb({
  t: 3, d: 2, c: 'understanding',
  stem: 'Under the second method, debentures issued as collateral security are recorded by debiting the ___ Account and crediting the Debentures Account.',
  acc: [['Debentures Suspense', 'Debenture Suspense']],
  sol: 'The debit is to Debentures Suspense Account, which is deducted from those debentures in the notes, so the net effect is nil.',
}));

Q('mt_entries', match({
  t: [2, 3, 4], d: 2, c: 'understanding', marks: 2,
  stem: 'Match each event in column A with the account it brings into the entry in column B.',
  pairs: [
    ['Debentures issued at a premium', 'Securities Premium A/c credited'],
    ['Debentures redeemable at a premium', 'Premium on Redemption of Debentures A/c credited'],
    ['Debentures issued as collateral security (second method)', 'Debentures Suspense A/c debited'],
    ['Interest falls due to debentureholders', 'Debenture Interest A/c debited'],
  ],
  sol: 'Premium collected is a capital receipt, premium promised is a liability, collateral needs a suspense debit, and interest due is an expense.',
}));

const L_TAW = vendorLot({ amount: 550000, face: 100, rate: 8, iss: 10 });
check(L_TAW.n === 5000, 'L_TAW');
Q('n_vendor_n', num({
  t: 3, d: 2, c: 'application', marks: 1, value: L_TAW.n, unit: 'debentures',
  stem: `Tawa Plastics Ltd (imagined) purchases a plant for ${rs(L_TAW.received)} and pays the vendor in 8% debentures of ₹100 each issued at a premium of 10%. How many debentures are issued?`,
  sol: `Issue price = 100 + 10 = ${L_TAW.price}. Number of debentures = ${fig(L_TAW.received)} ÷ ${L_TAW.price} = ${fig(L_TAW.n)}. So ${fig(L_TAW.n)} debentures.`,
}));

const P_GW = purchase({ assets: [['Building A/c', 400000], ['Machinery A/c', 250000], ['Stock A/c', 130000], ['Debtors A/c', 70000]], liabs: [['Creditors A/c', 90000], ['Bills Payable A/c', 60000]], pc: 760000, vendor: "Vendor's A/c" });
check(P_GW.goodwill === 60000 && P_GW.net === 700000, 'P_GW');
Q('n_goodwill', num({
  t: 3, d: 3, c: 'application', marks: 2, value: P_GW.goodwill, unit: '₹',
  stem: `Ken River Foods Ltd (imagined) takes over a business with buildings ${rs(400000)}, machinery ${rs(250000)}, stock ${rs(130000)} and debtors ${rs(70000)}, and creditors ${rs(90000)} and bills payable ${rs(60000)}, for a purchase consideration of ${rs(P_GW.pc)}. Calculate the goodwill (in ₹).`,
  sol: `Assets = ${fig(P_GW.A)}; liabilities = ${fig(P_GW.L)}; net assets = ${fig(P_GW.A)} − ${fig(P_GW.L)} = ${fig(P_GW.net)}. Goodwill = ${fig(P_GW.pc)} − ${fig(P_GW.net)} = ${fig(P_GW.goodwill)}. So ₹${fig(P_GW.goodwill)}.`,
  scheme: [[`Net assets ${rs(P_GW.net)}`, 1], [`Goodwill ${rs(P_GW.goodwill)}`, 1]],
}));

const L_KEN = vendorLot({ amount: 315000, face: 100, rate: 10, iss: 5 });
check(L_KEN.n === 3000 && L_KEN.premium === 15000, 'L_KEN');
const V_KEN = "Bhatt Machine Tools' A/c";
Q('s3_machinery', short({
  t: 3, d: 2, c: 'application', marks: 3,
  stem: `Ken Agro Equipment Ltd (imagined) purchased machinery worth ${rs(L_KEN.received)} from Bhatt Machine Tools, an imagined vendor. The vendor was paid by issuing 10% debentures of ₹100 each at a premium of 5%. Calculate the number of debentures issued and pass the journal entries.`,
  model: `Issue price = 100 + 5 = ${L_KEN.price}; number of debentures = ${fig(L_KEN.received)} ÷ ${L_KEN.price} = **${fig(L_KEN.n)}**.\n\n${journal([
    { dr: [['Machinery A/c', L_KEN.received]], cr: [[V_KEN, L_KEN.received]], nar: 'machinery purchased from Bhatt Machine Tools' },
    allotEntry(L_KEN, V_KEN, `${fig(L_KEN.n)} 10% debentures of ₹100 each allotted to the vendor at a premium of 5%`),
  ]).md}`,
  sol: 'Divide the price by the issue price, not the face value; then credit the vendor first and settle him with debentures.',
  scheme: [[`Number of debentures ${fig(L_KEN.n)}`, 1], ['Purchase entry', 1], ['Allotment to the vendor with premium', 1]],
}));

const P_SON = purchase({ assets: [['Land A/c', 500000], ['Plant A/c', 240000], ['Stock A/c', 120000], ['Debtors A/c', 80000]], liabs: [['Creditors A/c', 100000]], pc: 800000, vendor: "Son Valley Traders' A/c" });
const SONcash = 80000;
const L_SON = vendorLot({ amount: P_SON.pc - SONcash, face: 100, rate: 9, iss: -10 });
check(P_SON.capRes === 40000 && L_SON.n === 8000 && L_SON.discount === 80000, 'SON');
Q('s3_bp', short({
  t: 3, d: 3, c: 'application', marks: 3,
  stem: `Sone Packaging Ltd (imagined) took over the business of Son Valley Traders: land ${rs(500000)}, plant ${rs(240000)}, stock ${rs(120000)}, debtors ${rs(80000)} and creditors ${rs(100000)}, for ${rs(P_SON.pc)}. It paid ${rs(SONcash)} by cheque and the balance by issuing 9% debentures of ₹100 each at a discount of 10%. Pass the journal entries.`,
  model: `Net assets = ${fig(P_SON.A)} − ${fig(P_SON.L)} = ${fig(P_SON.net)}; purchase consideration ${fig(P_SON.pc)}; capital reserve ${fig(P_SON.capRes)}. Debentures = ${fig(P_SON.pc - SONcash)} ÷ ${L_SON.price} = ${fig(L_SON.n)}.\n\n${journal([
    P_SON.entry,
    { dr: [["Son Valley Traders' A/c", SONcash]], cr: [['Bank A/c', SONcash]], nar: 'part of the purchase consideration paid by cheque' },
    allotEntry(L_SON, "Son Valley Traders' A/c", `${fig(L_SON.n)} 9% debentures of ₹100 each allotted to the vendor at a discount of 10%`),
  ]).md}`,
  sol: 'Compare the price with the net assets first; the vendor is then settled partly in cash and partly in debentures.',
  scheme: [['Purchase entry with capital reserve', 1], ['Cheque to the vendor', 1], ['Debentures at a discount to the vendor', 1]],
}));

const C_PEN = { loan: 600000, n: 7000, rate: 9, face: 100 };
const C_PENnote = note('Note 1: Long-term borrowings', [
  [`Loan from bank (secured by the issue of ${fig(C_PEN.n)} ${C_PEN.rate}% debentures of ₹${C_PEN.face} each as collateral security)`, C_PEN.loan],
  [`${C_PEN.rate}% Debentures (issued as collateral security)`, [[`${fig(C_PEN.n)} debentures of ₹${C_PEN.face} each`, C_PEN.n * C_PEN.face], ['Debentures Suspense', -C_PEN.n * C_PEN.face]]],
], C_PEN.loan);
Q('s3_collateral', short({
  t: 3, d: 3, c: 'application', marks: 3,
  stem: `Penganga Paper Ltd (imagined) took a loan of ${rs(C_PEN.loan)} from a bank and issued ${fig(C_PEN.n)} 9% debentures of ₹100 each as collateral security. Pass the journal entry for the collateral debentures under the method in which they are recorded in the books, and show how the loan and the debentures appear in the notes to accounts.`,
  model: `${journal([{ dr: [['Debentures Suspense A/c', C_PEN.n * C_PEN.face]], cr: [['9% Debentures A/c', C_PEN.n * C_PEN.face]], nar: `issue of ${fig(C_PEN.n)} 9% debentures as collateral security for a bank loan` }]).md}\n\n${C_PENnote.md}`,
  sol: 'No cash comes in, so the debit goes to a suspense account that cancels the debentures in the note.',
  scheme: [['Journal entry with Debentures Suspense', 1], ['Loan shown with the security described', 1], ['Debentures less suspense, net nil', 1]],
}));

const P_RAO = purchase({ assets: [['Building A/c', 360000], ['Furniture A/c', 90000], ['Stock A/c', 110000], ['Debtors A/c', 100000]], liabs: [['Creditors A/c', 80000], ['Outstanding Expenses A/c', 20000]], pc: 600000, vendor: "Rao Brothers' A/c" });
const RAOcash = 120000;
const L_RAO = vendorLot({ amount: P_RAO.pc - RAOcash, face: 100, rate: 10, iss: -4 });
check(P_RAO.goodwill === 40000 && L_RAO.n === 5000 && L_RAO.discount === 20000, 'RAO');
Q('l4_bp', long({
  t: 3, d: 3, c: 'application', marks: 4,
  stem: `Pamba Hotels Ltd (imagined, Kottayam) purchased the business of Rao Brothers, taking over buildings ${rs(360000)}, furniture ${rs(90000)}, stock ${rs(110000)}, debtors ${rs(100000)}, creditors ${rs(80000)} and outstanding expenses ${rs(20000)}, for a purchase consideration of ${rs(P_RAO.pc)}. Rao Brothers were paid ${rs(RAOcash)} by cheque and the rest by issuing 10% debentures of ₹100 each at a discount of 4%, redeemable at par. Pass the journal entries in the books of Pamba Hotels Ltd.`,
  model: `Net assets = ${fig(P_RAO.A)} − ${fig(P_RAO.L)} = ${fig(P_RAO.net)}; goodwill = ${fig(P_RAO.pc)} − ${fig(P_RAO.net)} = ${fig(P_RAO.goodwill)}. Debentures = ${fig(P_RAO.pc - RAOcash)} ÷ ${L_RAO.price} = ${fig(L_RAO.n)}.\n\n${journal([
    P_RAO.entry,
    { dr: [["Rao Brothers' A/c", RAOcash]], cr: [['Bank A/c', RAOcash]], nar: 'cheque paid to Rao Brothers' },
    allotEntry(L_RAO, "Rao Brothers' A/c", `${fig(L_RAO.n)} 10% debentures of ₹100 each allotted to Rao Brothers at a discount of 4%`),
  ]).md}`,
  sol: 'When the price exceeds the net assets, goodwill is debited in the purchase entry; then settle the vendor in cash and debentures.',
  scheme: [['Net assets and goodwill', 1], ['Purchase entry', 1], ['Payment by cheque', 0.5], ['Number of debentures and allotment with discount', 1.5]],
}));

const C_VEN = { loan: 900000, n: 10000, rate: 10, face: 100 };
const C_VEN1 = note('Note 1: Long-term borrowings (first method)', [[`Loan from bank (secured by the issue of ${fig(C_VEN.n)} 10% debentures of ₹100 each as collateral security)`, C_VEN.loan]], C_VEN.loan);
const C_VEN2 = note('Note 1: Long-term borrowings (second method)', [
  [`Loan from bank (secured by the issue of ${fig(C_VEN.n)} 10% debentures of ₹100 each as collateral security)`, C_VEN.loan],
  ['10% Debentures (issued as collateral security)', [[`${fig(C_VEN.n)} debentures of ₹100 each`, C_VEN.n * C_VEN.face], ['Debentures Suspense', -C_VEN.n * C_VEN.face]]],
], C_VEN.loan);
Q('l4_collateral', long({
  t: 3, d: 3, c: 'analysis', marks: 4,
  stem: `Vennar Tractors Ltd (imagined, Thanjavur) obtained a loan of ${rs(C_VEN.loan)} from a bank on 1 April 2026 and, as additional security, issued ${fig(C_VEN.n)} 10% debentures of ₹100 each to the bank. Show the treatment (journal entries, if any, and the long-term borrowings note) under both methods of dealing with debentures issued as collateral security. Will the company pay interest on these debentures?`,
  model: `**First method (no entry for the debentures):**\n\n${journal([{ date: '1 Apr 2026', dr: [['Bank A/c', C_VEN.loan]], cr: [['Bank Loan A/c', C_VEN.loan]], nar: 'loan taken from the bank' }]).md}\n\n${C_VEN1.md}\n\n**Second method (debentures recorded):** the same loan entry, and\n\n${journal([{ date: '1 Apr 2026', dr: [['Debentures Suspense A/c', C_VEN.n * C_VEN.face]], cr: [['10% Debentures A/c', C_VEN.n * C_VEN.face]], nar: `${fig(C_VEN.n)} 10% debentures issued to the bank as collateral security` }]).md}\n\n${C_VEN2.md}\n\n**Interest:** no. Interest is paid on the bank loan; the collateral debentures carry no interest unless the bank has to enforce its security.`,
  sol: 'Either disclose the security beside the loan, or record the debentures against a suspense account that nets them to nil.',
  scheme: [['Loan entry and first-method note', 1], ['Second-method journal entry', 1], ['Second-method note with suspense deducted', 1], ['No interest on collateral debentures', 1]],
}));

const P_KOS = purchase({ assets: [['Land and Building A/c', 700000], ['Plant A/c', 350000], ['Stock A/c', 150000], ['Debtors A/c', 100000]], liabs: [['Creditors A/c', 200000]], pc: 1026000, vendor: "Mishra Industries' A/c" });
const L_KOS = vendorLot({ amount: P_KOS.pc, face: 100, rate: 10, iss: -5, red: 10 });
const W_KOS = writeOff(L_KOS.loss, 50000, { date: '31 Mar 2027' });
check(P_KOS.capRes === 74000 && L_KOS.n === 10800 && L_KOS.loss === 162000 && W_KOS.fromPL === 112000, 'KOS');
Q('l6_bp', long({
  t: [3, 4], d: 4, c: 'analysis', marks: 6,
  stem: `On 1 April 2026, Ghaghara Cables Ltd (imagined, Gorakhpur) took over the business of Mishra Industries: land and building ${rs(700000)}, plant ${rs(350000)}, stock ${rs(150000)}, debtors ${rs(100000)} and creditors ${rs(200000)}. The purchase consideration of ${rs(P_KOS.pc)} was paid entirely by issuing 10% debentures of ₹100 each at a discount of 5%, redeemable at a premium of 10% after five years. Securities Premium Account had a balance of ${rs(50000)}. Pass the journal entries, including the entry to write off the loss on issue on 31 March 2027.`,
  model: `Net assets = ${fig(P_KOS.A)} − ${fig(P_KOS.L)} = ${fig(P_KOS.net)}; the price is lower, so capital reserve = ${fig(P_KOS.net)} − ${fig(P_KOS.pc)} = ${fig(P_KOS.capRes)}.\n\nDebentures = ${fig(P_KOS.pc)} ÷ ${L_KOS.price} = ${fig(L_KOS.n)}; face value ${fig(L_KOS.nominal)}; discount ${fig(L_KOS.discount)}; premium on redemption ${fig(L_KOS.redPremium)}; loss on issue ${fig(L_KOS.loss)}.\n\n${journal([
    { ...P_KOS.entry, date: '1 Apr 2026' },
    allotEntry(L_KOS, "Mishra Industries' A/c", `${fig(L_KOS.n)} 10% debentures of ₹100 each allotted to the vendor at a discount of 5%, redeemable at a premium of 10%`, { date: '1 Apr 2026' }),
    W_KOS.entry,
  ]).md}`,
  sol: 'Three steps: value the net assets against the price, settle the vendor in debentures with the loss on issue, and clear that loss in the same year.',
  scheme: [[`Capital reserve ${rs(P_KOS.capRes)} and purchase entry`, 2], [`${fig(L_KOS.n)} debentures with Loss on Issue and Premium on Redemption`, 2], [`Write-off: ${rs(W_KOS.fromSP)} from Securities Premium, ${rs(W_KOS.fromPL)} from the Statement of Profit and Loss`, 2]],
}));

const L_VAI = lot({ n: 4000, face: 100, rate: 10, iss: 5 });
const VAIloan = 250000;
const VAIcoll = 300000;
const L_VAIv = vendorLot({ amount: 184000, face: 100, rate: 10, iss: -8 });
const W_VAI = writeOff(L_VAIv.discount, L_VAI.premium, { ac: DISC, date: '31 Mar 2027' });
const VAInote = note('Note 1: Long-term borrowings', [
  [`10% Debentures (${fig(L_VAI.n + L_VAIv.n)} of ₹100 each, issued for cash and to a vendor)`, L_VAI.nominal + L_VAIv.nominal],
  ['10% Debentures (issued as collateral security)', [['3,000 debentures of ₹100 each', VAIcoll], ['Debentures Suspense', -VAIcoll]]],
  ['Loan from bank (secured by the issue of 3,000 10% debentures of ₹100 each as collateral security)', VAIloan],
], 850000);
check(L_VAIv.n === 2000 && W_VAI.fromPL === 0 && W_VAI.fromSP === 16000, 'VAI');
Q('l6_collateral', long({
  t: [2, 3, 4], d: 4, c: 'analysis', marks: 6,
  stem: `On 1 April 2026, Vaigai Pumps Ltd (imagined, Madurai):\n\n1. issued ${fig(L_VAI.n)} 10% debentures of ₹100 each at a premium of 5% for cash, the whole amount being received with the applications;\n2. took a loan of ${rs(VAIloan)} from a bank and issued 3,000 10% debentures of ₹100 each to the bank as collateral security (the company records collateral debentures in its books);\n3. bought machinery for ${rs(L_VAIv.received)} and paid the vendor by issuing 10% debentures of ₹100 each at a discount of 8%.\n\nPass the journal entries, including writing off the discount on 31 March 2027, and prepare the note on long-term borrowings.`,
  model: `Debentures to the vendor = ${fig(L_VAIv.received)} ÷ ${L_VAIv.price} = ${fig(L_VAIv.n)}; discount ${fig(L_VAIv.discount)}, written off from the securities premium of ${fig(L_VAI.premium)} collected on the cash issue.\n\n${journal([
    ...cashIssue(L_VAI, { date: '1 Apr 2026' }),
    { date: '1 Apr 2026', dr: [['Bank A/c', VAIloan]], cr: [['Bank Loan A/c', VAIloan]], nar: 'loan taken from the bank' },
    { date: '1 Apr 2026', dr: [['Debentures Suspense A/c', VAIcoll]], cr: [['10% Debentures A/c', VAIcoll]], nar: '3,000 debentures issued to the bank as collateral security' },
    { date: '1 Apr 2026', dr: [['Machinery A/c', L_VAIv.received]], cr: [["Vendor's A/c", L_VAIv.received]], nar: 'machinery purchased' },
    allotEntry(L_VAIv, "Vendor's A/c", `${fig(L_VAIv.n)} debentures allotted to the vendor at a discount of 8%`, { date: '1 Apr 2026' }),
    W_VAI.entry,
  ]).md}\n\n${VAInote.md}`,
  sol: 'Treat each source of debentures by its own rule, then gather all of them, and the loan, in one borrowings note.',
  scheme: [['Cash issue at a premium', 1], ['Loan and collateral entries', 1], ['Machinery purchase and debentures to the vendor', 1.5], ['Discount written off from Securities Premium', 1], ['Long-term borrowings note', 1.5]],
}));

// ================================================================ t04 Interest; writing off discount and loss
const I_M = { nominal: 800000, rate: 9, months: 9 };
const I_Mv = interest(I_M.nominal, I_M.rate, I_M.months);
check(I_Mv === 54000, 'I_M');
Q('m_interest_calc', mcq({
  t: 4, d: 2, c: 'application',
  stem: `On 1 July 2026 an imagined company allotted 8,000 9% debentures of ₹100 each. Its accounting year ends on 31 March. Interest on these debentures for the year 2026–27 is`,
  opts: [rs(I_Mv), rs(interest(I_M.nominal, I_M.rate, 12)), rs(interest(I_M.nominal, I_M.rate, 3)), rs(interest(I_M.nominal, I_M.rate, 6))],
  sol: `Interest runs for 9 months, 1 July to 31 March: ${fig(I_M.nominal)} × 9/100 × 9/12 = ${fig(I_Mv)}.`,
}));

Q('m_interest_transfer', mcq({
  t: 4, d: 1, c: 'recall',
  stem: 'At the end of the year, the Debenture Interest Account is closed by transferring its balance to',
  opts: ['the Statement of Profit and Loss', 'Securities Premium Account', "Debentureholders' Account", 'Premium on Redemption of Debentures Account'],
  sol: 'Debenture interest is an expense (a finance cost), so it is charged to the Statement of Profit and Loss.',
}));

Q('m_writeoff_order', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'A company has a balance in its Securities Premium Account and must write off a loss on issue of debentures in the year of issue. The loss is written off',
  opts: ['first from Securities Premium, and any balance from the Statement of Profit and Loss', 'only from the Statement of Profit and Loss, keeping Securities Premium untouched', 'first from the Statement of Profit and Loss, and any balance from Securities Premium', 'only from Capital Reserve'],
  sol: 'Securities premium may be applied to this purpose under Section 52, so it is used up first; only what remains reduces the profit of the year.',
}));

const W_M = writeOff(60000, 25000);
check(W_M.fromPL === 35000, 'W_M');
Q('m_writeoff_amt', mcq({
  t: 4, d: 3, c: 'application',
  stem: `An imagined company's loss on issue of debentures is ${rs(60000)}, and its Securities Premium Account has a balance of ${rs(25000)}. In the year of issue, the amount written off to the Statement of Profit and Loss is`,
  opts: [rs(W_M.fromPL), rs(60000), rs(25000), rs(85000)],
  sol: `Use the premium first: ${fig(25000)} from Securities Premium; the balance ${fig(60000)} − ${fig(25000)} = ${fig(W_M.fromPL)} goes to the Statement of Profit and Loss.`,
}));

Q('m_interest_entry', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'When interest on debentures falls due (ignoring tax deducted at source), the journal entry is',
  opts: ["Debenture Interest A/c Dr, To Debentureholders' A/c", "Debentureholders' A/c Dr, To Debenture Interest A/c", "Statement of Profit and Loss Dr, To Debentureholders' A/c", 'Debenture Interest A/c Dr, To Debentures A/c'],
  sol: 'The expense is debited and the debentureholders, to whom it is now owed, are credited; payment then clears their account.',
}));

Q('ar_interest_loss', ar({
  t: [3, 4], d: 2, c: 'understanding', key: 'b',
  a: 'Interest on debentures must be paid even when the company has incurred a loss for the year.',
  r: 'Debentures may be issued as collateral security for a loan.',
  sol: 'Both are true, but R speaks of using debentures as security; A holds because interest is a charge owed to creditors, which R does not state.',
}));

Q('ar_sp_writeoff', ar({
  t: 4, d: 3, c: 'analysis', key: 'a',
  a: 'A company may use its Securities Premium balance to write off the loss on issue of debentures.',
  r: 'Section 52 of the Companies Act 2013 permits securities premium to be applied in writing off the discount allowed on an issue of debentures and the premium payable on their redemption.',
  sol: 'Both are true, and the uses allowed in R are exactly the two parts of a loss on issue, so R explains A.',
}));

Q('ar_collateral', ar({
  t: 3, d: 3, c: 'understanding', key: 'c',
  a: 'No interest is paid on debentures issued as collateral security as long as the loan is serviced.',
  r: 'Debentures issued as collateral security are recorded by debiting Bank Account with their face value.',
  sol: 'A is true: interest is paid on the loan itself. R is false: no cash is received; when recorded, the debit is to Debentures Suspense Account.',
}));

Q('tf_interest_nominal', tf({
  t: 4, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? Interest on debentures is calculated on their face (nominal) value, even when they were issued at a discount or a premium.',
  sol: 'The coupon rate applies to the face value written on the debenture; the issue price does not change the interest.',
}));

const I_N = interestYear({ nominal: 450000, rate: 12, periods: [['31 Mar 2027', 6]], transferDate: '31 Mar 2027' });
check(I_N.total === 27000, 'I_N');
Q('n_interest', num({
  t: 4, d: 3, c: 'application', marks: 2, value: I_N.total, unit: '₹',
  stem: `Debentures of ${rs(450000)} carrying interest at 12% per annum were allotted by an imagined company on 1 October 2026. Interest is payable on 31 March and 30 September each year. Find the debenture interest charged to the Statement of Profit and Loss for the year ended 31 March 2027 (in ₹).`,
  sol: `Only 6 months (1 October to 31 March) fall in the year: ${fig(450000)} × 12/100 × 6/12 = ${fig(I_N.total)}. So ₹${fig(I_N.total)}.`,
  scheme: [['Period of 6 months', 1], [`Interest ${rs(I_N.total)}`, 1]],
}));

const L_NPL = lot({ n: 5000, face: 100, rate: 9, iss: -6, red: 4 });
const W_NPL = writeOff(L_NPL.loss, 18000);
check(L_NPL.loss === 50000 && W_NPL.fromPL === 32000, 'NPL');
Q('n_pl', num({
  t: [2, 4], d: 3, c: 'application', marks: 2, value: W_NPL.fromPL, unit: '₹',
  stem: `An imagined company issued ${fig(L_NPL.n)} 9% debentures of ₹100 each at a discount of 6%, redeemable at a premium of 4%. Its Securities Premium Account shows ${rs(18000)}. Find the amount of the loss on issue written off to the Statement of Profit and Loss in the year of issue (in ₹).`,
  sol: `Loss on issue = ${fig(L_NPL.discount)} + ${fig(L_NPL.redPremium)} = ${fig(L_NPL.loss)}. From Securities Premium ${fig(18000)}; to the Statement of Profit and Loss ${fig(L_NPL.loss)} − ${fig(18000)} = ${fig(W_NPL.fromPL)}. So ₹${fig(W_NPL.fromPL)}.`,
  scheme: [[`Loss on issue ${rs(L_NPL.loss)}`, 1], [`Statement of Profit and Loss ${rs(W_NPL.fromPL)}`, 1]],
}));

const I_HOO = interestYear({ nominal: 600000, rate: 10, periods: [['30 Sep 2026', 6], ['31 Mar 2027', 6]], transferDate: '31 Mar 2027' });
check(I_HOO.total === 60000, 'I_HOO');
Q('s3_interest', short({
  t: 4, d: 3, c: 'application', marks: 3,
  stem: `Hooghly Jute Ltd (imagined) has 6,000 10% debentures of ₹100 each, allotted on 1 April 2026. Interest is payable half-yearly on 30 September and 31 March. Pass the journal entries for debenture interest for the year ended 31 March 2027 (ignore tax deducted at source).`,
  model: `Interest for each half-year = ${fig(600000)} × 10/100 × 6/12 = ${fig(I_HOO.amts[0])}.\n\n${journal(I_HOO.entries).md}`,
  sol: 'Each half-year: record the interest falling due, then its payment; at the year end, close the interest account to the Statement of Profit and Loss.',
  scheme: [['Interest due entries (both half-years)', 1], ['Payment entries', 1], [`Transfer of ${rs(I_HOO.total)}`, 1]],
}));

const L_RIH = lot({ n: 4000, face: 100, rate: 8, iss: -5, red: 5 });
const W_RIH = writeOff(L_RIH.loss, 15000, { date: '31 Mar 2027' });
check(L_RIH.loss === 40000 && W_RIH.fromPL === 25000, 'RIH');
Q('s3_writeoff', short({
  t: [2, 4], d: 3, c: 'application', marks: 3,
  stem: `On 1 April 2026, Rihand Chemicals Ltd (imagined) issued ${fig(L_RIH.n)} 8% debentures of ₹100 each at a discount of 5%, redeemable at a premium of 5%; the whole amount was received with the applications. Its Securities Premium Account had a balance of ${rs(15000)}. Pass the journal entries for the issue and for writing off the loss on issue on 31 March 2027.`,
  model: `Loss on issue = discount ${fig(L_RIH.discount)} + premium on redemption ${fig(L_RIH.redPremium)} = ${fig(L_RIH.loss)}.\n\n${journal([...cashIssue(L_RIH, { date: '1 Apr 2026' }), W_RIH.entry]).md}`,
  sol: 'Build the loss from both of its parts, then clear it from the premium balance first.',
  scheme: [['Application money received', 0.5], ['Allotment with Loss on Issue and Premium on Redemption', 1.5], ['Write-off entry', 1]],
}));

const I_SAB = interestYear({ nominal: 500000, rate: 9, periods: [['30 Sep 2026', 3], ['31 Mar 2027', 6]], transferDate: '31 Mar 2027' });
check(I_SAB.amts[0] === 11250 && I_SAB.total === 33750, 'I_SAB');
Q('l4_interest', long({
  t: 4, d: 3, c: 'application', marks: 4,
  stem: `Sabari Spices Ltd (imagined) allotted 5,000 9% debentures of ₹100 each on 1 July 2026. Interest is payable on 30 September and 31 March. Prepare the Debenture Interest Account and the Debentureholders' Account for the year ended 31 March 2027, ignoring tax deducted at source.`,
  model: `Interest to 30 September (3 months) = ${fig(500000)} × 9/100 × 3/12 = ${fig(I_SAB.amts[0])}; to 31 March (6 months) = ${fig(500000)} × 9/100 × 6/12 = ${fig(I_SAB.amts[1])}.\n\n**Debenture Interest Account**\n\n${I_SAB.intLedger.md}\n\n**Debentureholders' Account**\n\n${I_SAB.holdLedger.md}`,
  sol: 'The first instalment covers only the months since allotment; the interest account collects both instalments and is closed to the Statement of Profit and Loss.',
  scheme: [[`First instalment ${rs(I_SAB.amts[0])}`, 1], [`Second instalment ${rs(I_SAB.amts[1])}`, 1], ['Debenture Interest Account closed to the Statement of Profit and Loss', 1], ["Debentureholders' Account", 1]],
}));

const L_SIW = lot({ n: 6000, face: 100, rate: 11, iss: 2, red: 8 });
const W_SIW = writeOff(L_SIW.loss, L_SIW.premium + 10000, { date: '31 Mar 2027' });
const SIWledger = ledger([['1 Apr 2026', 'Premium on Redemption of Debentures A/c', L_SIW.loss]], [['31 Mar 2027', 'Securities Premium A/c', W_SIW.fromSP], ['31 Mar 2027', 'Statement of Profit and Loss', W_SIW.fromPL]], { dates: true });
check(L_SIW.premium === 12000 && L_SIW.loss === 48000 && W_SIW.fromSP === 22000 && W_SIW.fromPL === 26000, 'SIW');
Q('l4_writeoff', long({
  t: [2, 4], d: 3, c: 'application', marks: 4,
  stem: `On 1 April 2026, Siwan Leathers Ltd (imagined) issued ${fig(L_SIW.n)} 11% debentures of ₹100 each at a premium of 2%, redeemable at a premium of 8%, receiving the whole amount in cash. Before this issue its Securities Premium Account had a balance of ${rs(10000)}. Pass the journal entries for the issue and for writing off the loss on 31 March 2027, and prepare the Loss on Issue of Debentures Account.`,
  model: `Securities Premium available = ${fig(10000)} + ${fig(L_SIW.premium)} = ${fig(10000 + L_SIW.premium)}; loss on issue (premium on redemption) = ${fig(L_SIW.loss)}.\n\n${journal([allotEntry(L_SIW, 'Bank A/c', `issue of ${fig(L_SIW.n)} 11% debentures at a premium of 2%, redeemable at a premium of 8%`, { date: '1 Apr 2026' }), W_SIW.entry]).md}\n\n**Loss on Issue of Debentures Account**\n\n${SIWledger.md}`,
  sol: 'The premium collected on this issue joins the existing balance before the loss is set against it.',
  scheme: [['Issue entry with both premiums and the loss', 1.5], ['Write-off entry', 1.5], ['Loss on Issue of Debentures Account', 1]],
}));

const L_KOSI = lot({ n: 6000, face: 100, rate: 12, iss: -5, red: 5 });
const I_KOSI = interestYear({ nominal: L_KOSI.nominal, rate: 12, periods: [['30 Sep 2026', 3], ['31 Mar 2027', 6]], transferDate: '31 Mar 2027' });
const W_KOSI = writeOff(L_KOSI.loss, 20000, { date: '31 Mar 2027' });
check(L_KOSI.loss === 60000 && I_KOSI.total === 54000 && W_KOSI.fromPL === 40000, 'KOSI');
Q('l6_interest', long({
  t: [2, 4], d: 4, c: 'analysis', marks: 6,
  stem: `On 1 July 2026, Kosi Builders Ltd (imagined, Purnia) issued ${fig(L_KOSI.n)} 12% debentures of ₹100 each at a discount of 5%, redeemable at a premium of 5%; the whole amount was received with the applications. Interest is payable on 30 September and 31 March. The Securities Premium Account had a balance of ${rs(20000)}. Pass the journal entries for the year ended 31 March 2027 for the issue, the debenture interest (ignore tax deducted at source) and the writing off of the loss on issue.`,
  model: `Loss on issue = ${fig(L_KOSI.discount)} + ${fig(L_KOSI.redPremium)} = ${fig(L_KOSI.loss)}. Interest on the face value of ${fig(L_KOSI.nominal)}: 30 September (3 months) ${fig(I_KOSI.amts[0])}; 31 March (6 months) ${fig(I_KOSI.amts[1])}.\n\n${journal([...cashIssue(L_KOSI, { date: '1 Jul 2026' }), ...I_KOSI.entries, W_KOSI.entry]).md}`,
  sol: 'Interest is on face value and only for the months since allotment; the loss is cleared the same year, premium balance first.',
  scheme: [['Issue entries with Loss on Issue and Premium on Redemption', 1.5], ['Interest due and paid, both dates', 2], ['Interest transferred', 0.5], [`Write-off: ${rs(W_KOSI.fromSP)} and ${rs(W_KOSI.fromPL)}`, 2]],
}));

const WAR = { price: 462000, cash: 42000 };
const L_WAR = vendorLot({ amount: WAR.price - WAR.cash, face: 100, rate: 12, iss: 5 });
const I_WAR = interestYear({ nominal: L_WAR.nominal, rate: 12, periods: [['31 Mar 2027', 6]], transferDate: '31 Mar 2027' });
check(L_WAR.n === 4000 && L_WAR.premium === 20000 && I_WAR.total === 24000, 'WAR');
Q('l6_machinery_interest', long({
  t: [3, 4], d: 3, c: 'application', marks: 6,
  stem: `On 1 October 2026, Wardha Steel Tubes Ltd (imagined, Nagpur) purchased machinery for ${rs(WAR.price)} from Deshmukh Engineers, an imagined vendor. It paid ${rs(WAR.cash)} by cheque and the balance by issuing 12% debentures of ₹100 each at a premium of 5%. Interest on these debentures is payable on 31 March and 30 September. Pass the journal entries for the purchase, the payment to the vendor and the debenture interest for the year ended 31 March 2027 (ignore tax deducted at source).`,
  model: `Balance payable in debentures = ${fig(WAR.price)} − ${fig(WAR.cash)} = ${fig(WAR.price - WAR.cash)}; number = ${fig(WAR.price - WAR.cash)} ÷ ${L_WAR.price} = ${fig(L_WAR.n)}. Interest on ${fig(L_WAR.nominal)} for 6 months = ${fig(L_WAR.nominal)} × 12/100 × 6/12 = ${fig(I_WAR.total)}.\n\n${journal([
    { date: '1 Oct 2026', dr: [['Machinery A/c', WAR.price]], cr: [["Deshmukh Engineers' A/c", WAR.price]], nar: 'machinery purchased from Deshmukh Engineers' },
    { date: '1 Oct 2026', dr: [["Deshmukh Engineers' A/c", WAR.cash]], cr: [['Bank A/c', WAR.cash]], nar: 'part payment by cheque' },
    allotEntry(L_WAR, "Deshmukh Engineers' A/c", `${fig(L_WAR.n)} 12% debentures of ₹100 each allotted to the vendor at a premium of 5%`, { date: '1 Oct 2026' }),
    ...I_WAR.entries,
  ]).md}`,
  sol: 'Settle the vendor first, then charge interest on the face value of the debentures for the months they were outstanding.',
  scheme: [['Purchase and cheque', 1.5], [`${fig(L_WAR.n)} debentures with Securities Premium`, 1.5], [`Interest due and paid ${rs(I_WAR.total)}`, 2], ['Interest transferred', 1]],
}));

export const FACTS = [
  `Brahmaputra Tea loss ${fig(BRAloss)} written off ${fig(W_BRA.fromSP)} + ${fig(W_BRA.fromPL)}`,
  `Damodar Valley refund ${fig(S_DAM.refund)}, loss ${fig(L_DAM.loss)}`,
  `Mandovi Shipping X ${fig(EV_rows[0].total)} vs Y ${fig(EV_rows[1].total)}`,
  `Ghaghara Cables capital reserve ${fig(P_KOS.capRes)}, ${fig(L_KOS.n)} debentures, loss ${fig(L_KOS.loss)}`,
  `Vaigai Pumps borrowings ${fig(VAInote.total)}`,
  `Kosi Builders interest ${fig(I_KOSI.total)}`,
  `Wardha Steel Tubes ${fig(L_WAR.n)} debentures, interest ${fig(I_WAR.total)}`,
];
export { SP, LOSS };
