// ISC 12 Accounts, ch07 Issue of Debentures — question bank.
// Every company, vendor and figure is imagined by SOYL and labelled as such; no textbook illustration or
// exercise and no CISCE specimen or past-paper item is reused. Every amount is computed with acc.mjs from
// the givens and checked there (entries balance, debentures credited = face value, the issue identity,
// refunds and calls reconcile with the cash, write-offs exhaust the loss in the ISC order, notes total);
// the expected values pinned below (hand-checked) catch any drift. ISC 2027 notes applied: capital losses
// written off in the year they arise, first from Securities Premium, then from the Statement of Profit
// and Loss and lastly from Capital Reserve; interest on debentures with tax deducted at source; calls in
// arrears and in advance with interest; Schedule III Part I disclosure. Redemption itself is chapter 8.
import { Q, mcq, ar, tf, fb, match, num, short, long } from './lib.mjs';
import { rs, inr, check, sum, journal, tAccount, note, bsExtract, mdTable, lot, lotEntry, lumpSum, instalments, vendorLot, purchase, writeOff, interestTDS, interestFor, terms, SP, PRD, LOSS, DISC, CR, PL } from './acc.mjs';

const eq = (a, b, what) => check(JSON.stringify(a) === JSON.stringify(b), `${what}: got ${JSON.stringify(a)}, expected ${JSON.stringify(b)}`);
const J = (entries) => journal(entries).md;
const AA = 'Debenture Application and Allotment A/c';

// ================================================================ t01 Issue at par, premium and discount
Q('m_s71', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Hampta Pass Battery Works Ltd, an imagined company at Naggar, has issued 9% debentures to the public. Under Section 71 of the Companies Act, 2013, the holders of these debentures',
  opts: ['cannot be given any voting rights at the general meetings of the company', 'vote at general meetings in proportion to the face value of debentures they hold', 'become members of the company as soon as the debentures are allotted', 'share in the profits of the company along with its equity shareholders'],
  sol: 'Section 71 forbids a company to issue debentures that carry voting rights. A debentureholder has lent money to the company: he is its creditor, not a member.',
}));

Q('m_discount_allowed', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'The directors of Sela Pass Wind Turbines Ltd, an imagined company at Dirang, wish to raise long-term funds by issuing securities below their face value. Under the Companies Act, 2013, they may issue at a discount',
  opts: ['debentures, but not equity shares (sweat equity shares apart)', 'equity shares, but not debentures', 'both equity shares and debentures, once the debentureholders consent', 'neither equity shares nor debentures'],
  sol: 'Section 53 bars the issue of shares at a discount, sweat equity apart. No such bar applies to debentures; the discount is a capital loss to be written off.',
}));

const MRD = lot({ n: 2400, face: 500, rate: 8, iss: -5 });
eq([MRD.price, MRD.received, MRD.discount], [475, 1140000, 60000], 'm_received_discount');
Q('m_received_discount', mcq({
  t: 1, d: 2, c: 'application',
  stem: `Saramati Plum Wines Ltd, an imagined company at Kiphire, issues ${inr(MRD.n)} 8% debentures of ${rs(MRD.face)} each at a discount of 5%, the whole amount payable on application. The issue is fully subscribed. The cash the company receives is`,
  opts: [rs(MRD.received), rs(MRD.nominal), rs(MRD.nominal + MRD.discount), rs(MRD.discount)],
  sol: `Each debenture is issued at ${rs(MRD.face)} − 5% = ${rs(MRD.price)}, so ${inr(MRD.n)} × ${inr(MRD.price)} = ${rs(MRD.received)} is received. The 8% Debentures Account is still credited with ${rs(MRD.nominal)}, the discount of ${rs(MRD.discount)} being debited to Discount on Issue of Debentures.`,
}));

const MRF = lot({ n: 3000, rate: 10 });
const MRFi = lumpSum(MRF, { applied: 3800 });
eq([MRFi.got, MRFi.refund], [380000, 80000], 'm_refund');
Q('m_refund', mcq({
  t: 1, d: 2, c: 'application',
  stem: `Japfu Organic Foods Ltd, an imagined company at Jakhama, offers ${inr(MRF.n)} 10% debentures of ₹100 each at par, the full amount payable on application. Applications are received for 3,800 debentures, and the excess money is returned. The entry for the money returned is`,
  opts: [`${AA} Dr. To Bank A/c ${rs(MRFi.refund)}`, `Bank A/c Dr. To ${AA} ${rs(MRFi.refund)}`, `10% Debentures A/c Dr. To Bank A/c ${rs(MRFi.refund)}`, `${AA} Dr. To 10% Debentures A/c ${rs(MRFi.got)}`],
  sol: `Applications for 800 debentures more than were offered brought in 800 × ₹100 = ${rs(MRFi.refund)} too much; the application and allotment account is debited and the bank credited when it is returned.`,
}));

const MAP = lot({ n: 5000, rate: 9, iss: 8 });
const MAPi = instalments(MAP, { per: { app: 30, allot: 48, call: 30 } });
eq([MAPi.allotDebCredit, MAP.premium, MAPi.callDue], [200000, 40000, 150000], 'm_allot_premium');
Q('m_allot_premium', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Kedarkantha Woollens Ltd, an imagined company at Mori, issues ${inr(MAP.n)} 9% debentures of ₹100 each at a premium of 8%: ₹30 on application, ₹48 on allotment (including the premium) and the balance on the first and final call. The amount credited to the 9% Debentures Account when the allotment money falls due is`,
  opts: [rs(MAPi.allotDebCredit), rs(MAPi.allotDue), rs(MAP.premium), rs(MAPi.callDue)],
  sol: `Of the ₹48 due on allotment, ₹8 is premium, so the debentures are credited with ₹40 each: ${inr(MAP.n)} × 40 = ${rs(MAPi.allotDebCredit)}; Securities Premium gets ${rs(MAP.premium)}.`,
}));

const NRC = lot({ n: 4000, rate: 11, iss: 5 });
const NRCi = instalments(NRC, { per: { app: 40, allot: 65 }, applied: 5000 });
eq([NRCi.appCash, NRCi.refund, NRCi.allotDue, NRCi.cash], [200000, 40000, 260000, 420000], 'n_received');
Q('n_received', num({
  t: 1, d: 2, c: 'application', value: NRCi.cash, unit: '₹',
  stem: `Hatu Peak Cherries Ltd, an imagined company at Narkanda, invites applications for ${inr(NRC.n)} 11% debentures of ₹100 each at a premium of 5%: ₹40 on application and ₹65 on allotment. Applications arrive for 5,000 debentures; the money on the excess applications is refunded and all allotment money is received. How much cash does the company keep from the issue (in ₹)?`,
  sol: `Application money ${inr(NRCi.appCash)} − refund ${inr(NRCi.refund)} + allotment ${inr(NRCi.allotDue)} = ${rs(NRCi.cash)}, which equals ${inr(NRC.n)} × ₹105.`,
}));

Q('tf_face', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? When Churdhar Walnut Ltd, an imagined company, issues its 8% debentures of ₹100 each at ₹106, its 8% Debentures Account is credited with ₹106 for every debenture issued.',
  sol: 'The Debentures Account always carries the face value, ₹100 a debenture; the extra ₹6 is credited to Securities Premium.',
}));

Q('ar_shares_discount', ar({
  t: 1, d: 3, c: 'analysis', key: 'a',
  a: 'Bandarpunch Ice Axes Ltd, an imagined company, may allot its new 10% debentures at a discount, although it cannot allot its equity shares in that way.',
  r: 'Section 53 of the Companies Act, 2013 prohibits the issue of shares at a discount (sweat equity shares apart) but places no such restriction on debentures.',
  sol: 'Both are true, and the legal rule in R is exactly why the company may discount the debentures but not the shares.',
}));

const S2L = lot({ n: 2500, rate: 11, iss: 4 });
const S2Li = lumpSum(S2L, { applied: 3100 });
eq([S2Li.got, S2L.received, S2Li.refund, S2L.premium], [322400, 260000, 62400, 10000], 's2_lumpsum');
Q('s2_lumpsum', short({
  t: 1, d: 2, c: 'application', marks: 2,
  stem: `Kamet Thermal Wear Ltd, an imagined company at Malari, offers ${inr(S2L.n)} 11% debentures of ₹100 each at a premium of 4%, the whole amount payable with the application. Applications are received for 3,100 debentures; the debentures are allotted and the excess money is returned. Pass the journal entries.`,
  model: J(S2Li.entries),
  sol: 'Receive the full price on all applications, allot at face value plus premium, and return the rest.',
  scheme: [['Application money received on all applications', 1], ['Allotment (debentures and premium) and refund', 1]],
}));

const SSP = lot({ n: 6000, rate: 10, iss: 5 });
const SSPi = instalments(SSP, { per: { app: 35, allot: 45, call: 25 } });
eq([SSPi.appCash, SSPi.allotDue, SSPi.allotDebCredit, SSP.premium, SSPi.callDue], [210000, 270000, 240000, 30000, 150000], 's3_staged_premium');
Q('s3_staged_premium', short({
  t: 1, d: 3, c: 'application', marks: 3,
  stem: `Tungnath Herb Teas Ltd, an imagined company at Chopta, issues ${inr(SSP.n)} 10% debentures of ₹100 each at a premium of 5%, payable ₹35 on application, ₹45 on allotment (including the premium) and ₹25 on the first and final call. All the debentures are applied for and every instalment is received. Pass the journal entries in the company's books.`,
  model: J(SSPi.entries),
  sol: 'Each instalment is first made due and then received; only the allotment carries the premium.',
  scheme: [['Application money received and transferred', 1], ['Allotment due (debentures and premium) and received', 1], ['Call due and received', 1]],
}));

const SSD = lot({ n: 5000, rate: 9, iss: -6 });
const SSDi = instalments(SSD, { per: { app: 40, allot: 54 }, applied: 6500 });
eq([SSDi.appCash, SSDi.refund, SSDi.allotDue, SSD.discount, SSDi.allotDebCredit], [260000, 60000, 270000, 30000, 300000], 's3_staged_discount');
Q('s3_staged_discount', short({
  t: 1, d: 3, c: 'application', marks: 3,
  stem: `Mukurthi Lemongrass Oils Ltd, an imagined company in the Nilgiris, issues ${inr(SSD.n)} 9% debentures of ₹100 each at a discount of 6%, redeemable at par: ₹40 on application and ₹54 on allotment. Applications are received for 6,500 debentures; the surplus application money is refunded and the allotment money is received in full. Pass the journal entries.`,
  model: J(SSDi.entries),
  sol: 'The discount is allowed at allotment: the debentures are still credited at face value and the discount debited.',
  scheme: [['Application money received, transferred and the excess refunded', 1], ['Allotment due with the discount debited', 1], ['Allotment money received', 1]],
}));

const LIC = lot({ n: 8000, rate: 9, iss: 10 });
const LICi = instalments(LIC, { per: { app: 40, allot: 50, call: 20 }, applied: 9200 });
eq([LICi.appCash, LICi.refund, LICi.allotDue, LIC.premium, LICi.callDue, LICi.cash], [368000, 48000, 400000, 80000, 160000, 880000], 'l5_issue_cases');
Q('l5_issue_cases', long({
  t: 1, d: 3, c: 'application', marks: 5,
  stem: `Trikuta Wool Ltd, an imagined company at Katra, issues ${inr(LIC.n)} 9% debentures of ₹100 each at a premium of 10%, payable ₹40 on application, ₹50 on allotment (including the premium) and ₹20 on the first and final call. Applications are received for 9,200 debentures; the money on the extra applications is refunded and all later instalments are received.\n\n(a) Pass the journal entries for the issue. [3]\n\n(b) Calculate the total cash the company keeps from the issue, and explain why the 9% Debentures Account shows less than this amount. [2]`,
  model: `**(a)**\n\n${J(LICi.entries)}\n\n**(b)** Cash kept = ${inr(LICi.appCash)} − ${inr(LICi.refund)} + ${inr(LICi.allotDue)} + ${inr(LICi.callDue)} = **${rs(LICi.cash)}** (that is ${inr(LIC.n)} × ₹110).\n\nThe 9% Debentures Account shows only the face value, ${rs(LIC.nominal)}, because that is the amount the company owes and will repay. The extra ${rs(LIC.premium)} is a capital receipt credited to Securities Premium and shown under Reserves and Surplus.`,
  sol: 'Part (a) records each instalment due and received; part (b) separates the face value from the premium.',
  scheme: [['(a) Application, transfer and refund', 1], ['(a) Allotment due with premium, and received', 1], ['(a) Call due and received', 1], ['(b) Cash kept', 1], ['(b) Face value vs premium explained', 1]],
}));

// ================================================================ t02 Terms of redemption, loss on issue, writing off
const MLC = lot({ n: 3000, rate: 10, iss: -4, red: 6 });
eq([MLC.discount, MLC.redPremium, MLC.loss], [12000, 18000, 30000], 'm_loss_compute');
Q('m_loss_compute', mcq({
  t: 2, d: 2, c: 'application',
  stem: `Girnar Agate Beads Ltd, an imagined company at Bhavnath, issues ${inr(MLC.n)} 10% debentures of ₹100 each at a discount of 4%, redeemable after five years at a premium of 6%. The amount debited to Loss on Issue of Debentures Account at the time of issue is`,
  opts: [rs(MLC.loss), rs(MLC.discount), rs(MLC.redPremium), rs(MLC.redPremium - MLC.discount)],
  sol: `The loss is the discount now plus the premium to be paid on redemption: ${inr(MLC.discount)} + ${inr(MLC.redPremium)} = ${rs(MLC.loss)}.`,
}));

Q('m_prd_nature', mcq({
  t: [2, 5], d: 2, c: 'understanding',
  stem: 'Pavagadh Clay Diyas Ltd, an imagined company, has issued debentures redeemable at a premium. Until the debentures are redeemed, the balance of its Premium on Redemption of Debentures Account is',
  opts: ['a liability, shown under other long-term liabilities in the Balance Sheet', 'a capital receipt, shown under Reserves and Surplus with securities premium', 'an asset, shown under other non-current assets', 'an income, credited to the Statement of Profit and Loss'],
  sol: 'It is an amount the company has promised to pay the holders on redemption, so it remains a liability until then; Schedule III places it under other long-term liabilities.',
}));

Q('m_writeoff_order', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'Parasnath Lac Ltd, an imagined company at Giridih, must write off the discount on the debentures it issued this year. Following the note in the ISC 2027 syllabus, the sources are used in the order',
  opts: ['Securities Premium, then the Statement of Profit and Loss, lastly Capital Reserve', 'Capital Reserve, then Securities Premium, lastly the Statement of Profit and Loss', 'the Statement of Profit and Loss, then Capital Reserve, lastly Securities Premium', 'General Reserve, then Securities Premium, lastly Capital Reserve'],
  sol: 'The syllabus note fixes the sequence for all capital losses: Securities Premium first, then the Statement of Profit and Loss, and Capital Reserve last.',
}));

Q('m_writeoff_when', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Deomali Coffee Ltd, an imagined company at Pottangi, issues five-year debentures at a discount and redeemable at a premium. Under the ISC 2027 syllabus, its loss on issue of debentures is written off',
  opts: ['in full, in the year in which the debentures are issued', 'equally over the five years until redemption', 'only in the year in which the debentures are redeemed', 'never: it remains in the Balance Sheet as an asset'],
  sol: 'The syllabus note requires every capital loss to be written off in the year in which it occurs.',
}));

Q('ar_prd', ar({
  t: 2, d: 2, c: 'understanding', key: 'c',
  a: 'When Malayagiri Sal Seeds Ltd, an imagined company, issues 9% debentures at par but redeemable at a premium of 5%, a loss on issue arises at the time of issue.',
  r: 'Premium on Redemption of Debentures is a gain of the company and is credited to its Statement of Profit and Loss.',
  sol: 'A is true: the company receives the face value but will repay more, so the premium payable is a loss recognised at issue. R is false: that premium is a liability (other long-term liabilities), not a gain.',
}));

Q('ar_writeoff', ar({
  t: 2, d: 3, c: 'analysis', key: 'b',
  a: 'Dhupgarh Tendu Products Ltd, an imagined company, uses its securities premium to write off the discount on the debentures it issued during the year.',
  r: 'Securities premium cannot be paid out to the shareholders as a cash dividend.',
  sol: 'Both statements are true. But the reason the premium may absorb the discount is that Section 52 of the Companies Act, 2013 permits it and the ISC note places it first; the bar on paying it as dividend does not explain A.',
}));

Q('tf_par_prem', tf({
  t: 2, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? When Nokrek Citrus Ltd, an imagined company at Tura, issues 10% debentures at par, redeemable at a premium of 5%, no loss on issue arises because the company receives the full face value.',
  sol: 'The premium it must pay on redemption is a loss fixed at the time of issue: Loss on Issue of Debentures is debited and Premium on Redemption of Debentures credited.',
}));

Q('fb_loss_ac', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'Shipki La Chilgoza Nuts Ltd, an imagined company in Kinnaur, issues debentures at a discount and redeemable at a premium. The discount and the premium on redemption together are debited to ___ Account.',
  acc: [['Loss on Issue of Debentures', 'Loss on issue of debentures', 'Loss on Issue']],
  sol: 'Whenever a premium on redemption is involved, the whole capital loss is collected in the Loss on Issue of Debentures Account.',
}));

Q('fb_sec52', fb({
  t: 2, d: 2, c: 'recall',
  stem: 'The securities premium of Zojila Cold Logistics Ltd, an imagined company at Sankoo, may be used to write off the discount allowed on its debentures because Section ___ of the Companies Act, 2013 lists this among the permitted uses of securities premium.',
  acc: [['52', 'fifty-two']],
  sol: 'Section 52 lists the permitted uses of securities premium, including writing off the discount allowed on an issue of debentures.',
}));

Q('match_six', match({
  t: 2, d: 2, c: 'understanding', marks: 2,
  stem: 'Match each set of terms for the 10% debentures of Bomdila Carpet Weavers Ltd, an imagined company, with the extra account that appears in its allotment entry besides the application-and-allotment account and the 10% Debentures Account.',
  pairs: [
    ['Issued at par, redeemable at par', 'No other account'],
    ['Issued at a discount, redeemable at par', 'Discount on Issue of Debentures A/c debited'],
    ['Issued at a premium, redeemable at par', 'Securities Premium A/c credited'],
    ['Issued at par, redeemable at a premium', 'Loss on Issue of Debentures A/c debited and Premium on Redemption of Debentures A/c credited'],
  ],
  sol: 'Premium on issue is a capital receipt (credit); discount is a capital loss (debit); a premium on redemption adds both a loss and a liability.',
}));

const NLS = lot({ n: 6500, rate: 9, iss: -7, red: 8 });
eq(NLS.loss, 97500, 'n_loss');
Q('n_loss', num({
  t: 2, d: 3, c: 'application', value: NLS.loss, unit: '₹',
  stem: `Tadiandamol Cardamom Ltd, an imagined company at Kodagu, issues ${inr(NLS.n)} 9% debentures of ₹100 each at a discount of 7%, redeemable at a premium of 8%. Find the amount debited to Loss on Issue of Debentures Account (in ₹).`,
  sol: `Discount ${inr(NLS.discount)} + premium on redemption ${inr(NLS.redPremium)} = ${rs(NLS.loss)}, that is ${inr(NLS.n)} × ₹15.`,
}));

const NWP = lot({ n: 6000, rate: 10, iss: -4, red: 10 });
const NWPw = writeOff(NWP.loss, { sp: 36000 });
eq([NWP.loss, NWPw.fromSP, NWPw.fromPL], [84000, 36000, 48000], 'n_writeoff_pl');
Q('n_writeoff_pl', num({
  t: 2, d: 3, c: 'application', value: NWPw.fromPL, unit: '₹',
  stem: `Agasthyamalai Herbals Ltd, an imagined company at Bonacaud, issues ${inr(NWP.n)} 10% debentures of ₹100 each at a discount of 4%, redeemable at a premium of 10%. Its Securities Premium Account has a balance of ₹36,000. Following the ISC rule, how much of the loss on issue is written off to the Statement of Profit and Loss in the year of issue (in ₹)?`,
  sol: `Loss = ${inr(NWP.n)} × ₹14 = ${inr(NWP.loss)}. Securities premium absorbs ${inr(NWPw.fromSP)} first; the balance ${inr(NWP.loss)} − ${inr(NWPw.fromSP)} = ${rs(NWPw.fromPL)} goes to the Statement of Profit and Loss.`,
}));

const S6a = lot({ n: 1500, rate: 9, iss: 6, red: 5 });
const S6b = lot({ n: 2000, rate: 10, red: 10 });
eq([S6a.received, S6a.premium, S6a.loss, S6b.loss], [159000, 9000, 7500, 20000], 's2_six_entries');
Q('s2_six_entries', short({
  t: 2, d: 2, c: 'application', marks: 2,
  stem: `Kumara Parvatha Coffee Ltd, an imagined company at Somwarpet, has received the full application money for two issues of debentures of ₹100 each, payable in one sum. Pass the allotment entries for: (i) ${inr(S6a.n)} 9% debentures issued at a premium of 6% and redeemable at a premium of 5%; (ii) ${inr(S6b.n)} 10% debentures issued at par and redeemable at a premium of 10%.`,
  model: J([lotEntry(S6a, AA, `allotment of ${inr(S6a.n)} 9% debentures, ${terms(S6a)}`), lotEntry(S6b, AA, `allotment of ${inr(S6b.n)} 10% debentures, ${terms(S6b)}`)]),
  sol: 'Credit face value, any premium on issue and any premium on redemption; debit the money received and the loss.',
  scheme: [['Entry (i) with premium on issue and loss on issue', 1], ['Entry (ii) with loss on issue and premium on redemption', 1]],
}));

Q('s2_writeoff_rule', short({
  t: 2, d: 2, c: 'understanding', marks: 2,
  stem: 'The accountant of Mullayanagiri Silk Ltd, an imagined company at Chikkamagaluru, asks when and from which sources the loss on issue of its new debentures should be written off. Answer according to the ISC 2027 syllabus, giving a reason.',
  model: '**When:** in full in the year in which the debentures are issued, because the syllabus requires every capital loss to be written off in the year it occurs; it is not carried forward as an asset.\n\n**Sources, in order:** first the Securities Premium Account (Section 52 of the Companies Act, 2013 allows it), then the Statement of Profit and Loss, and lastly the Capital Reserve.',
  sol: 'State the timing rule, then the three sources in the order fixed by the syllabus note.',
  scheme: [['Written off in the year of issue, with reason', 1], ['Order: securities premium, Statement of Profit and Loss, capital reserve', 1]],
}));

const S6c = [lot({ n: 1000, rate: 8, iss: -5 }), lot({ n: 1000, rate: 9, iss: 8, red: 5 }), lot({ n: 1000, rate: 10, iss: -4, red: 6 })];
eq(S6c.map((L) => [L.received, L.loss]), [[95000, 5000], [108000, 5000], [96000, 10000]], 's3_six_cases');
Q('s3_six_cases', short({
  t: 2, d: 3, c: 'application', marks: 3,
  stem: `Mount Harriet Spice Mills Ltd, an imagined company at Port Blair, receives in full the application money on three issues of 1,000 debentures of ₹100 each, payable in one sum. Pass the allotment entries for:\n\n(a) 8% debentures issued at a discount of 5% and redeemable at par;\n(b) 9% debentures issued at a premium of 8% and redeemable at a premium of 5%;\n(c) 10% debentures issued at a discount of 4% and redeemable at a premium of 6%.`,
  model: J(S6c.map((L) => lotEntry(L, AA, `allotment of ${inr(L.n)} ${L.rate}% debentures, ${terms(L)}`))),
  sol: 'A discount alone is a Discount on Issue debit; once a redemption premium is involved, the loss goes to Loss on Issue.',
  scheme: [['(a) discount on issue', 1], ['(b) premium on issue with loss on issue', 1], ['(c) discount and redemption premium as loss on issue', 1]],
}));

const SWO = lot({ n: 4000, rate: 9, iss: -5, red: 10 });
const SWOi = lumpSum(SWO);
const SWOw = writeOff(SWO.loss, { sp: 25000, date: '31 Mar 2026' });
eq([SWO.received, SWO.loss, SWOw.fromSP, SWOw.fromPL], [380000, 60000, 25000, 35000], 's3_writeoff');
Q('s3_writeoff', short({
  t: 2, d: 3, c: 'application', marks: 3,
  stem: `On 1 April 2025, Saddle Peak Shell Crafts Ltd, an imagined company at Diglipur, issues ${inr(SWO.n)} 9% debentures of ₹100 each at a discount of 5%, redeemable at a premium of 10%, the whole amount payable on application. The issue is fully subscribed. The company has a balance of ₹25,000 in its Securities Premium Account. Pass the journal entries for the issue and for writing off the loss on issue on 31 March 2026.`,
  model: J([...SWOi.entries.map((e) => ({ ...e, date: '1 Apr 2025' })), SWOw.entry]),
  sol: 'Loss on issue = discount + redemption premium; write it off in the same year, premium first.',
  scheme: [['Application money received and allotment', 1], ['Loss on issue calculated and debited', 1], ['Write-off from securities premium, then Statement of Profit and Loss', 1]],
}));

const SCR = lot({ n: 10000, rate: 8, iss: -6 });
const SCRw = writeOff(SCR.discount, { sp: 18000, pl: 30000, cr: 40000, ac: DISC });
eq([SCR.discount, SCRw.fromSP, SCRw.fromPL, SCRw.fromCR], [60000, 18000, 30000, 12000], 's3_writeoff_cr');
Q('s3_writeoff_cr', short({
  t: 2, d: 4, c: 'analysis', marks: 3,
  stem: `During 2025-26 Tiyi Peak Tea Ltd, an imagined company at Wokha, issued ${inr(SCR.n)} 8% debentures of ₹100 each at a discount of 6%, redeemable at par. At the year end its Securities Premium Account shows ₹18,000, the balance available in its Statement of Profit and Loss for the purpose is ₹30,000, and it has a Capital Reserve of ₹40,000. Work out how the discount is written off under the ISC rule and pass the journal entry.`,
  model: `Discount on issue = ${inr(SCR.n)} × ₹6 = **${rs(SCR.discount)}**, written off in the year of issue in the ISC order:\n\n${mdTable(['Source (in order)', 'Available (₹)', 'Used (₹)'], [['1. Securities Premium', '18,000', inr(SCRw.fromSP)], ['2. Statement of Profit and Loss', '30,000', inr(SCRw.fromPL)], ['3. Capital Reserve', '40,000', inr(SCRw.fromCR)], ['**Total**', '', `**${inr(SCR.discount)}**`]], [1, 2])}\n\n${J([SCRw.entry])}`,
  sol: 'Use each source fully before moving to the next; capital reserve takes only what is left.',
  scheme: [['Discount calculated', 1], ['Split in the ISC order', 1], ['Journal entry', 1]],
}));

const LLW = lot({ n: 7000, rate: 10, iss: -5, red: 5 });
const LLWi = instalments(LLW, { per: { app: 30, allot: 65 } });
const LLWw = writeOff(LLW.loss, { sp: 20000 });
eq([LLWi.appCash, LLWi.allotDue, LLWi.allotDebCredit, LLW.loss, LLW.redPremium, LLWw.fromPL], [210000, 455000, 490000, 70000, 35000, 50000], 'l5_lot_writeoff');
const LLWledger = tAccount([['10% Debentures A/c (discount)', LLW.discount], [PRD, LLW.redPremium]], [[SP, LLWw.fromSP], [PL, LLWw.fromPL]]);
Q('l5_lot_writeoff', long({
  t: 2, d: 3, c: 'application', marks: 5,
  stem: `Dzukou Lily Perfumes Ltd, an imagined company at Viswema, issues ${inr(LLW.n)} 10% debentures of ₹100 each at a discount of 5%, redeemable at a premium of 5%, payable ₹30 on application and ₹65 on allotment. The issue is fully subscribed and all money is received.\n\n(a) Pass the journal entries for the issue. [3]\n\n(b) The company has a balance of ₹20,000 in its Securities Premium Account. Prepare the Loss on Issue of Debentures Account, writing off the loss at the year end according to the ISC rule. [2]`,
  model: `**(a)**\n\n${J(LLWi.entries)}\n\n**(b) Loss on Issue of Debentures Account**\n\n${LLWledger.md}\n\nLoss = discount ${inr(LLW.discount)} + premium on redemption ${inr(LLW.redPremium)} = ${rs(LLW.loss)}; securities premium absorbs ${inr(LLWw.fromSP)} and the Statement of Profit and Loss the remaining ${inr(LLWw.fromPL)}.`,
  sol: 'Allot at face value with the discount and redemption premium as one loss; close that loss in the same year in the ISC order.',
  scheme: [['(a) Application received and transferred', 1], ['(a) Allotment due with loss on issue and premium on redemption', 1], ['(a) Allotment received', 1], ['(b) Loss account debits', 1], ['(b) Written off: securities premium, then Statement of Profit and Loss', 1]],
}));

const LTa = lot({ n: 3000, rate: 9, iss: 10 });
const LTb = lot({ n: 5000, rate: 10, iss: -5, red: 8 });
const LTw = writeOff(LTb.loss, { sp: LTa.premium });
eq([LTa.premium, LTb.received, LTb.loss, LTw.fromSP, LTw.fromPL], [30000, 475000, 65000, 30000, 35000], 'l5_two_lots');
Q('l5_two_lots', long({
  t: 2, d: 4, c: 'analysis', marks: 5,
  stem: `During 2025-26 Mawphlang Pineapple Ltd, an imagined company at Umiam, made two issues of debentures of ₹100 each, each payable in full on application and fully subscribed: (i) ${inr(LTa.n)} 9% debentures at a premium of 10%, redeemable at par; (ii) ${inr(LTb.n)} 10% debentures at a discount of 5%, redeemable at a premium of 8%. It had no securities premium before these issues.\n\n(a) Pass the allotment entries for both issues. [2]\n\n(b) Calculate the capital loss to be written off at the year end, pass the entry writing it off, and explain why the premium received on issue (i) may be used for it. [3]`,
  model: `**(a)**\n\n${J([lotEntry(LTa, AA, `allotment of ${inr(LTa.n)} 9% debentures, ${terms(LTa)}`), lotEntry(LTb, AA, `allotment of ${inr(LTb.n)} 10% debentures, ${terms(LTb)}`)])}\n\n**(b)** Loss on issue (ii) = discount ${inr(LTb.discount)} + premium on redemption ${inr(LTb.redPremium)} = **${rs(LTb.loss)}**.\n\n${J([LTw.entry])}\n\nThe premium of ${rs(LTa.premium)} on issue (i) is a capital receipt in the Securities Premium Account; Section 52 of the Companies Act, 2013 allows securities premium to be used for writing off the discount on an issue of debentures, and the ISC note puts it first. The remaining ${rs(LTw.fromPL)} goes to the Statement of Profit and Loss in the same year.`,
  sol: 'A premium on one issue can absorb the loss on another issue of the same year before profits are touched.',
  scheme: [['(a) Issue (i) with premium', 1], ['(a) Issue (ii) with loss and premium on redemption', 1], ['(b) Loss calculated', 1], ['(b) Write-off entry in the ISC order', 1], ['(b) Reason for using securities premium', 1]],
}));

// ================================================================ t03 Collateral security; consideration other than cash
Q('m_collateral_meaning', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Sandakphu Trekking Gear Ltd, an imagined company at Maneybhanjang, hands 2,000 of its debentures to its bank as collateral security for a term loan. This means that the bank',
  opts: ['may enforce the debentures only if the company fails to repay the loan, and returns them when the loan is repaid', 'becomes a debentureholder at once and receives interest on the debentures as well as on the loan', 'must sell the debentures in the market and keep the proceeds as repayment', 'pays the company the face value of the debentures in addition to the loan'],
  sol: 'Collateral debentures are a secondary security: they bind the company only if the primary obligation, the loan, is not met.',
}));

Q('m_collateral_interest', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Banihal Saffron Ltd, an imagined company, has borrowed from a bank against a deposit of its 9% debentures as collateral security. While the loan is being repaid on time, interest is paid',
  opts: ['on the loan only; no interest is paid on the collateral debentures', 'on the collateral debentures only, at 9%', 'on both the loan and the collateral debentures', 'on neither, until the loan falls due'],
  sol: 'The company owes only the loan; the debentures are a pledge, so interest runs only on the loan.',
}));

Q('m_collateral_bs', mcq({
  t: [3, 5], d: 3, c: 'understanding',
  stem: 'Nathula Yak Cheese Ltd, an imagined company at Sherathang, records the debentures it issued as collateral security by debiting Debenture Suspense Account. In the note on long-term borrowings in its Balance Sheet, these debentures appear',
  opts: ['at face value with the Debenture Suspense deducted, so that they add nothing to the total', 'at face value, added to the bank loan they secure', 'under other current liabilities', 'only in the notes on contingent liabilities, with no amount'],
  sol: 'Under the second method, the debentures and the suspense balance are shown together and net to nil, because the only real debt is the loan.',
}));

const MVN = vendorLot({ amount: 324000, rate: 10, iss: 8 });
eq(MVN.n, 3000, 'm_vendor_number');
Q('m_vendor_number', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'Gurushikhar Marble Exports Ltd, an imagined company at Abu Road, buys a gang-saw from an imagined supplier for ₹3,24,000 and pays for it by issuing 10% debentures of ₹100 each at a premium of 8%. The number of debentures issued to the supplier is',
  opts: [inr(MVN.n), '3,240', '3,522', '3,500'],
  sol: `Each debenture is issued at ₹108, so 3,24,000 ÷ 108 = ${inr(MVN.n)} debentures.`,
}));

Q('m_promoters', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Sinhagad Groundnut Oil Ltd, an imagined company at Khadakwasla, allots debentures at par to its promoters for their services in forming the company. In the allotment entry, the account debited is',
  opts: ['Incorporation Costs A/c (or, as some prefer, Goodwill A/c)', "Promoters' Capital A/c", 'Securities Premium A/c', 'Debenture Suspense A/c'],
  sol: 'The services are a cost of bringing the company into being, so Incorporation Costs (or Goodwill) is debited and the debentures credited.',
}));

Q('m_underwriters', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Lohagad Steel Trunks Ltd, an imagined company at Lonavala, owes its underwriters a commission of ₹18,000 and settles it by allotting them 180 9% debentures of ₹100 each at par. After Underwriting Commission A/c Dr. To Underwriters A/c, the entry for the allotment is',
  opts: ['Underwriters A/c Dr. To 9% Debentures A/c ₹18,000', '9% Debentures A/c Dr. To Underwriters A/c ₹18,000', 'Underwriting Commission A/c Dr. To Bank A/c ₹18,000', 'Underwriters A/c Dr. To Securities Premium A/c ₹18,000'],
  sol: 'The underwriters, credited with the commission, are debited when they receive debentures instead of cash; the debentures are credited at face value.',
}));

const MCR = purchase({ assets: [['Land', 380000], ['Plant', 420000], ['Stock', 120000]], liabs: [['Creditors', 140000]], pc: 740000, vendor: 'Vendor A/c' });
eq([MCR.net, MCR.capRes, MCR.goodwill], [780000, 40000, 0], 'm_capital_reserve');
Q('m_capital_reserve', mcq({
  t: 3, d: 3, c: 'application',
  stem: `Purandar Jaggery Ltd, an imagined company, takes over assets of ${rs(MCR.A)} and liabilities of ${rs(MCR.L)} of an imagined sugar-cane crushing unit for a purchase consideration of ${rs(MCR.pc)}, payable in its debentures. In the entry recording the assets and liabilities taken over,`,
  opts: [`Capital Reserve A/c is credited with ${rs(MCR.capRes)}`, `Goodwill A/c is debited with ${rs(MCR.capRes)}`, `Capital Reserve A/c is credited with ${rs(MCR.A - MCR.pc)}`, 'neither goodwill nor capital reserve arises, as debentures are issued'],
  sol: `Net assets ${inr(MCR.A)} − ${inr(MCR.L)} = ${inr(MCR.net)} exceed the price ${inr(MCR.pc)} by ${rs(MCR.capRes)}, a capital profit credited to Capital Reserve.`,
}));

Q('tf_collateral_entry', tf({
  t: 3, d: 1, c: 'recall', ans: true,
  stem: 'True or false? If Anjaneri Bamboo Brushes Ltd, an imagined company near Trimbakeshwar, issues debentures as collateral security and follows the first method, it passes no journal entry for them and only adds a note below the loan they secure.',
  sol: 'Under the first method the debentures are not entered in the books at all; the note under the secured loan discloses them.',
}));

Q('ar_collateral', ar({
  t: 3, d: 2, c: 'understanding', key: 'd',
  a: 'Debentures issued by Brahmatal Ski Lifts Ltd, an imagined company, as collateral security for a bank loan earn interest for the bank from the date they are issued.',
  r: 'Collateral debentures can be enforced by the lender only if the company fails to repay the loan.',
  sol: 'A is false: no interest is paid on collateral debentures; the bank earns interest on its loan only. R is true.',
}));

const NVD = vendorLot({ amount: 480000, rate: 10, iss: -4 });
eq([NVD.n, NVD.discount], [5000, 20000], 'n_vendor_debs');
Q('n_vendor_debs', num({
  t: 3, d: 2, c: 'application', value: NVD.n, unit: 'debentures',
  stem: 'Mahendragiri Cashew Ltd, an imagined company at Paralakhemundi, buys shelling machinery for ₹5,80,000. It pays ₹1,00,000 by cheque and the balance by issuing 10% debentures of ₹100 each at a discount of 4%. How many debentures does it issue to the seller?',
  sol: `Balance ₹4,80,000 ÷ issue price ₹96 = ${inr(NVD.n)} debentures (discount ${rs(NVD.discount)}).`,
}));

const NGW = purchase({ assets: [['Land', 300000], ['Plant', 360000], ['Stock', 180000]], liabs: [['Creditors', 120000]], pc: lot({ n: 7000, rate: 9, iss: 10 }).received, vendor: 'Vendor A/c' });
eq([NGW.pc, NGW.net, NGW.goodwill], [770000, 720000, 50000], 'n_goodwill');
Q('n_goodwill', num({
  t: 3, d: 3, c: 'application', value: NGW.goodwill, unit: '₹',
  stem: 'Kudremukh Iron Grills Ltd, an imagined company, takes over a fabrication unit with land ₹3,00,000, plant ₹3,60,000 and stock ₹1,80,000, and its creditors of ₹1,20,000. It pays the vendor by issuing 7,000 9% debentures of ₹100 each at a premium of 10%. Find the goodwill (in ₹).',
  sol: `Purchase consideration = 7,000 × ₹110 = ${inr(NGW.pc)}; net assets = ${inr(NGW.A)} − ${inr(NGW.L)} = ${inr(NGW.net)}; goodwill = ${inr(NGW.pc)} − ${inr(NGW.net)} = ${rs(NGW.goodwill)}.`,
}));

Q('match_consideration', match({
  t: 3, d: 2, c: 'understanding', marks: 2,
  stem: 'Rajmachi Trail Shoes Ltd, an imagined company at Lonavala, allots debentures in four situations. Match each situation with the account debited when the debentures are credited.',
  pairs: [
    ['Debentures allotted to promoters for forming the company', 'Incorporation Costs A/c (or Goodwill A/c)'],
    ['Debentures allotted to underwriters for their commission', 'Underwriters A/c, after Underwriting Commission A/c is debited'],
    ['Debentures allotted to the seller of a machine', "Vendor's A/c, after Machinery A/c is debited"],
    ['Debentures given to a bank as collateral (second method)', 'Debenture Suspense A/c'],
  ],
  sol: 'Each allotment settles a different claim: services, commission, a purchase, or a pledge with no claim at all.',
}));

Q('s2_collateral_methods', short({
  t: [3, 5], d: 2, c: 'understanding', marks: 2,
  stem: 'Dainkund Pine Resins Ltd, an imagined company at Dalhousie, takes a loan of ₹4,00,000 from an imagined co-operative bank and issues 5,000 9% debentures of ₹100 each to the bank as collateral security. Show how the company records and discloses these debentures under each of the two methods.',
  model: `**First method:** no journal entry. In the note on long-term borrowings: *Bank loan ₹4,00,000 (secured by the issue of 5,000 9% debentures of ₹100 each as collateral security)*.\n\n**Second method:**\n\n${J([{ dr: [['Debenture Suspense A/c', 500000]], cr: [['9% Debentures A/c', 500000]], nar: 'issue of 5,000 9% debentures as collateral security for a bank loan' }])}\n\nIn the note: Bank loan ₹4,00,000; 9% Debentures ₹5,00,000 less Debenture Suspense ₹5,00,000 = Nil.`,
  sol: 'First method: a note only. Second method: an entry through Debenture Suspense that nets to nil in the note.',
  scheme: [['First method: no entry, note under the loan', 1], ['Second method: Debenture Suspense entry and net presentation', 1]],
}));

const SPU = { promo: lot({ n: 700, rate: 10 }), under: lot({ n: 300, rate: 10 }) };
eq([SPU.promo.nominal, SPU.under.nominal], [70000, 30000], 's2_promoters_underwriters');
Q('s2_promoters_underwriters', short({
  t: 3, d: 2, c: 'application', marks: 2,
  stem: 'Kalavantin Umbrella Frames Ltd, an imagined company at Panvel, allots 700 10% debentures of ₹100 each at par to its promoters for their services in forming the company, and 300 such debentures at par to its underwriters in full settlement of a commission of ₹30,000. Pass the journal entries.',
  model: J([
    { dr: [['Incorporation Costs A/c', SPU.promo.nominal]], cr: [['10% Debentures A/c', SPU.promo.nominal]], nar: `${inr(SPU.promo.n)} debentures allotted to promoters for their services` },
    { dr: [['Underwriting Commission A/c', SPU.under.nominal]], cr: [['Underwriters A/c', SPU.under.nominal]], nar: 'underwriting commission due' },
    { dr: [['Underwriters A/c', SPU.under.nominal]], cr: [['10% Debentures A/c', SPU.under.nominal]], nar: `${inr(SPU.under.n)} debentures allotted to underwriters for their commission` },
  ]),
  sol: 'Promoters: debit the cost of formation. Underwriters: commission due first, then settled in debentures.',
  scheme: [['Promoters entry', 1], ['Underwriting commission and allotment entries', 1]],
}));

const SVA = vendorLot({ amount: 630000, rate: 9, iss: 5 });
eq([SVA.n, SVA.premium], [6000, 30000], 's3_vendor_asset');
Q('s3_vendor_asset', short({
  t: 3, d: 3, c: 'application', marks: 3,
  stem: 'Chopta Cold Press Oils Ltd, an imagined company, buys an oil-expeller plant for ₹6,30,000 from Mandal Valley Engineers, an imagined firm, and pays the price by issuing 9% debentures of ₹100 each at a premium of 5%. Calculate the number of debentures issued and pass the journal entries.',
  model: `Number of debentures = 6,30,000 ÷ 105 = **${inr(SVA.n)}**.\n\n${J([{ dr: [['Plant A/c', SVA.received]], cr: [['Mandal Valley Engineers A/c', SVA.received]], nar: 'plant bought from Mandal Valley Engineers' }, lotEntry(SVA, 'Mandal Valley Engineers A/c', `${inr(SVA.n)} 9% debentures issued to the vendor at a premium of 5%`)])}`,
  sol: 'Divide the price by the issue price, then record the purchase and the allotment to the vendor.',
  scheme: [['Number of debentures', 1], ['Purchase entry', 1], ['Allotment with securities premium', 1]],
}));

const SBP = vendorLot({ amount: 672000, rate: 9, iss: -4 });
const SBPp = purchase({ assets: [['Building', 400000], ['Machinery', 250000], ['Stock', 120000], ['Debtors', 80000]], liabs: [['Creditors', 100000]], pc: SBP.received, vendor: 'Solang Woodcrafts A/c' });
eq([SBP.n, SBP.discount, SBPp.net, SBPp.capRes], [7000, 28000, 750000, 78000], 's3_business');
Q('s3_business', short({
  t: 3, d: 3, c: 'application', marks: 3,
  stem: 'Bhrigu Lake Wool Ltd, an imagined company at Manali, takes over the business of Solang Woodcrafts, an imagined firm: building ₹4,00,000, machinery ₹2,50,000, stock ₹1,20,000, debtors ₹80,000 and creditors ₹1,00,000. The purchase consideration of ₹6,72,000 is paid by issuing 9% debentures of ₹100 each at a discount of 4%. Pass the journal entries.',
  model: `${J([...SBPp.entries, lotEntry(SBP, 'Solang Woodcrafts A/c', `${inr(SBP.n)} 9% debentures issued to the vendor at a discount of 4%`)])}\n\nWorking: net assets ${inr(SBPp.A)} − ${inr(SBPp.L)} = ${inr(SBPp.net)}; capital reserve = ${inr(SBPp.net)} − ${inr(SBPp.pc)} = ${inr(SBPp.capRes)}; debentures = 6,72,000 ÷ 96 = ${inr(SBP.n)}.`,
  sol: 'Record the price payable, the assets and liabilities taken over (capital reserve as the balance), then the allotment at a discount.',
  scheme: [['Business purchase entry', 1], ['Assets and liabilities with capital reserve', 1], ['Allotment to vendor with discount', 1]],
}));

const SCN = note('Long-term borrowings', [['10% Debentures (3,000 of ₹100 each)', 300000], ['Bank loan (secured by the issue of 10,000 9% debentures as collateral security)', 800000], ['9% Debentures (10,000 of ₹100 each, issued as collateral security)', [['9% Debentures', 1000000], ['Debenture Suspense', -1000000]]]], 1100000);
Q('s3_collateral', short({
  t: [3, 5], d: 3, c: 'application', marks: 3,
  stem: 'Kodachadri Jackfruit Chips Ltd, an imagined company at Hosanagara, already has 3,000 10% debentures of ₹100 each outstanding. On 1 October 2025 it takes a loan of ₹8,00,000 from an imagined bank and issues 10,000 9% debentures of ₹100 each to the bank as collateral security, recording them by the second method. Pass the entry for the collateral debentures and prepare the note on long-term borrowings as at 31 March 2026.',
  model: `${J([{ date: '1 Oct 2025', dr: [['Debenture Suspense A/c', 1000000]], cr: [['9% Debentures A/c', 1000000]], nar: '10,000 9% debentures issued as collateral security for the bank loan' }])}\n\n${SCN.md}`,
  sol: 'Debit Debenture Suspense for the collateral issue; in the note deduct it from those debentures so only the real debts count.',
  scheme: [['Collateral entry (second method)', 1], ['Debentures and bank loan in the note', 1], ['Collateral debentures less suspense, correct total', 1]],
}));

const LBG = vendorLot({ amount: 832000, rate: 10, iss: 4 });
const LBGp = purchase({ assets: [['Land', 500000], ['Machinery', 320000], ['Stock', 140000], ['Debtors', 60000]], liabs: [['Creditors', 120000], ['Bills Payable', 40000]], pc: 932000, vendor: 'Kalasa Fabricators A/c' });
eq([LBG.n, LBG.premium, LBGp.net, LBGp.goodwill], [8000, 32000, 860000, 72000], 'l5_business_goodwill');
const LBGn = note('Long-term borrowings', [[`10% Debentures (${inr(LBG.n)} of ₹100 each, issued to a vendor for consideration other than cash)`, LBG.nominal]], 800000);
Q('l5_business_goodwill', long({
  t: [3, 5], d: 4, c: 'application', marks: 5,
  stem: 'Hulikal Fruit Pulp Ltd, an imagined company at Sagar, takes over the business of Kalasa Fabricators, an imagined firm, with land ₹5,00,000, machinery ₹3,20,000, stock ₹1,40,000, debtors ₹60,000, creditors ₹1,20,000 and bills payable ₹40,000, for ₹9,32,000. It pays ₹1,00,000 by cheque and the balance by issuing 10% debentures of ₹100 each at a premium of 4%.\n\n(a) Pass the journal entries. [3]\n\n(b) Calculate the number of debentures issued and show the debentures and the securities premium as they would appear in the notes to the Balance Sheet. [2]',
  model: `**(a)**\n\n${J([...LBGp.entries, { dr: [['Kalasa Fabricators A/c', 100000]], cr: [['Bank A/c', 100000]], nar: 'part of the purchase consideration paid by cheque' }, lotEntry(LBG, 'Kalasa Fabricators A/c', `${inr(LBG.n)} 10% debentures issued to the vendor at a premium of 4%`)])}\n\n**(b)** Balance payable = 9,32,000 − 1,00,000 = 8,32,000; number of debentures = 8,32,000 ÷ 104 = **${inr(LBG.n)}**.\n\n${LBGn.md}\n\n${note('Reserves and Surplus', [['Securities Premium', LBG.premium]], LBG.premium).md}`,
  sol: 'Goodwill is the price above net assets; the cheque reduces what the debentures must cover; the premium sits in reserves.',
  scheme: [['(a) Business purchase and assets-liabilities entry with goodwill', 1], ['(a) Payment by cheque', 1], ['(a) Allotment to vendor with premium', 1], ['(b) Number of debentures', 1], ['(b) Notes: long-term borrowings and securities premium', 1]],
}));

// ================================================================ t04 Calls in arrears and in advance; interest with TDS
const MTN = interestTDS({ nominal: 600000, rate: 9, months: 6 });
eq([MTN.gross, MTN.tax, MTN.net], [27000, 2700, 24300], 'm_tds_net');
Q('m_tds_net', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'Dhanaulti Potato Chips Ltd, an imagined company, has ₹6,00,000 of 9% debentures. Interest is paid every six months and tax is deducted at source at 10%. The amount paid to the debentureholders for each half-year is',
  opts: [rs(MTN.net), rs(MTN.gross), rs(MTN.gross * 2), rs(MTN.net * 2)],
  sol: `Half-year interest = 6,00,000 × 9% × 6/12 = ${inr(MTN.gross)}; TDS ${inr(MTN.tax)}; holders receive ${inr(MTN.gross)} − ${inr(MTN.tax)} = ${rs(MTN.net)}.`,
}));

Q('m_tds_payable', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Lansdowne Bakery Ltd, an imagined company, deducts tax at source from the interest it pays on its debentures. Which entry records the deposit of this tax with the government?',
  opts: ['TDS Payable A/c Dr. To Bank A/c', 'Debenture Interest A/c Dr. To Bank A/c', "Debentureholders' A/c Dr. To TDS Payable A/c", 'Statement of Profit and Loss Dr. To TDS Payable A/c'],
  sol: 'The tax deducted was credited to TDS Payable as a liability to the government; paying it clears that liability.',
}));

Q('m_calls_arrears_bs', mcq({
  t: [4, 5], d: 3, c: 'understanding',
  stem: 'At the year end, the first and final call on some of the 10% debentures of Chakrata Timber Ltd, an imagined company, is still unpaid. In the Balance Sheet, these calls in arrears are',
  opts: ['deducted from the debentures in the note on long-term borrowings', 'shown as a trade receivable under current assets', 'added to the debentures as a long-term provision', 'ignored, since the debentures are shown at face value'],
  sol: 'Only the amount actually called and paid is owed to the holders, so the arrears are deducted from the called-up debentures in the note.',
}));

Q('m_calls_advance', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Along with her allotment money, a holder of debentures of Munsiyari Rajma Ltd, an imagined company, also pays the first and final call that has not yet been made. The company credits this money to',
  opts: ['Calls in Advance A/c, a liability until the call is made', 'the Debentures Account at once', 'Securities Premium A/c', 'the Statement of Profit and Loss as other income'],
  sol: 'Money received before a call is made is held in Calls in Advance; when the call falls due it is transferred to the call account.',
}));

Q('m_interest_face', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Abbott Mount Beeswax Candles Ltd, an imagined company, issued its 10% debentures of ₹100 each at ₹95. The yearly interest it pays (before tax deduction) on each debenture is',
  opts: ['₹10', '₹9.50', '₹10.50', '₹5'],
  sol: 'The coupon rate applies to the face value, whatever the issue price: 10% of ₹100 = ₹10.',
}));

const NIA = interestFor(600 * 40, 10, 4);
eq(NIA, 800, 'n_int_arrears');
Q('n_int_arrears', num({
  t: 4, d: 3, c: 'application', value: NIA, unit: '₹',
  stem: 'Binsar Orchards Ltd, an imagined company at Dhaulchina, made a first and final call of ₹40 on its 9% debentures. A holder of 600 debentures paid the call four months late. The terms of issue charge interest at 10% a year on calls in arrears. How much interest does the company collect from him (in ₹)?',
  sol: `Calls in arrears = 600 × 40 = 24,000; interest = 24,000 × 10% × 4/12 = ${rs(NIA)}.`,
}));

const NTD = interestTDS({ nominal: 500000, rate: 12, months: 6 });
eq([NTD.gross, NTD.tax], [30000, 3000], 'n_tds');
Q('n_tds', num({
  t: 4, d: 2, c: 'application', value: NTD.tax, unit: '₹',
  stem: 'Mukteshwar Apricot Jams Ltd, an imagined company, has ₹5,00,000 of 12% debentures on which interest is paid half-yearly. Tax is deducted at source at 10%. How much tax does it deduct from one half-year’s interest (in ₹)?',
  sol: `Half-year interest = 5,00,000 × 12% × 6/12 = ${inr(NTD.gross)}; TDS at 10% = ${rs(NTD.tax)}.`,
}));

Q('ar_interest_charge', ar({
  t: 4, d: 2, c: 'understanding', key: 'a',
  a: 'Kausani Shawls Ltd, an imagined company, must pay the interest on its 9% debentures even in a year in which it makes a loss.',
  r: 'Interest on debentures is a charge against profit, not an appropriation of profit.',
  sol: 'Both are true. Because interest is a charge (a cost owed under the contract) and not a share of profit, it is payable whether or not there is a profit, so R explains A.',
}));

Q('ar_tds', ar({
  t: 4, d: 3, c: 'analysis', key: 'c',
  a: 'Ranikhet Buransh Squash Ltd, an imagined company, debits its Debenture Interest Account with the gross interest, although it pays the holders only the net amount.',
  r: 'Tax deducted at source is an extra expense of the company on top of the interest.',
  sol: 'A is true: the whole interest is the company\'s cost; part is paid to the holders and part to the government on their behalf. R is false: the tax is the holders\' tax, deducted from their interest, not an extra cost.',
}));

Q('tf_interest_advance', tf({
  t: 4, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? Interest paid by Jageshwar Copper Ware Ltd, an imagined company, on calls received in advance on its debentures is an expense of the company and is transferred to the Statement of Profit and Loss.',
  sol: 'The company uses the holder\'s money before the call is due and pays for it, so the interest is a finance cost.',
}));

Q('fb_tds', fb({
  t: 4, d: 1, c: 'recall',
  stem: 'When Chaukori Tea Ltd, an imagined company, makes interest due to its debentureholders, the tax it deducts at source is credited to ___ Account until it is deposited with the government.',
  acc: [['TDS Payable', 'Tax Deducted at Source Payable', 'TDS payable']],
  sol: 'The deduction is a liability to the government, held in TDS Payable until paid.',
}));

const S2T = interestTDS({ nominal: 400000, rate: 10, months: 6, date: '30 Sep 2025' });
eq([S2T.gross, S2T.tax, S2T.net], [20000, 2000, 18000], 's2_tds_entries');
Q('s2_tds_entries', short({
  t: 4, d: 2, c: 'application', marks: 2,
  stem: 'Jalori Pass Apiaries Ltd, an imagined company, has ₹4,00,000 of 10% debentures. Pass the journal entries for the interest for the half-year ended 30 September 2025, which falls due and is paid on that date after deducting tax at source at 10%.',
  model: J(S2T.entries),
  sol: 'Debit the gross interest, split the credit between holders and TDS Payable, then pay the holders.',
  scheme: [['Interest due with TDS', 1], ['Interest paid', 1]],
}));

const S2A = lot({ n: 5000, rate: 9 });
const S2Ai = instalments(S2A, { per: { app: 30, allot: 40, call: 30 }, advance: 200, arrears: { call: 150 } });
eq([S2Ai.callDue, S2Ai.advanceCash, S2Ai.callArrears, S2Ai.callCash], [150000, 6000, 4500, 139500], 's2_arrears_advance');
Q('s2_arrears_advance', short({
  t: 4, d: 3, c: 'application', marks: 2,
  stem: 'Prashar Lake Dairy Ltd, an imagined company at Mandi, has allotted 5,000 9% debentures of ₹100 each. The first and final call of ₹30 is now made. A holder of 200 debentures had already paid this call with his allotment money; a holder of 150 debentures fails to pay it. Pass the journal entries for the call.',
  model: J(S2Ai.entries.slice(-2)),
  sol: 'Make the whole call due; on receipt, use the advance already held and send the unpaid part to Calls in Arrears.',
  scheme: [['Call due', 1], ['Call received with arrears and advance adjusted', 1]],
}));

const S3Y = { h1: interestTDS({ nominal: 1000000, rate: 9, months: 6, date: '30 Sep 2025', deposit: '30 Sep 2025' }), h2: interestTDS({ nominal: 1000000, rate: 9, months: 6, date: '31 Mar 2026', deposit: '31 Mar 2026' }) };
const S3Yt = S3Y.h1.gross + S3Y.h2.gross;
eq([S3Y.h1.gross, S3Y.h1.tax, S3Y.h1.net, S3Yt], [45000, 4500, 40500, 90000], 's3_interest_year');
const S3Yl = tAccount(
  [['30 Sep 2025', "Debentureholders' A/c", S3Y.h1.net], ['30 Sep 2025', 'TDS Payable A/c', S3Y.h1.tax], ['31 Mar 2026', "Debentureholders' A/c", S3Y.h2.net], ['31 Mar 2026', 'TDS Payable A/c', S3Y.h2.tax]],
  [['31 Mar 2026', PL, S3Yt]],
  { dates: true },
);
Q('s3_interest_year', short({
  t: 4, d: 3, c: 'application', marks: 3,
  stem: 'Rakchham Apples Ltd, an imagined company in Kinnaur, has ₹10,00,000 of 9% debentures. Interest falls due and is paid on 30 September and 31 March, after deducting tax at source at 10%, and the tax is deposited with the government on the same days. Pass the journal entries for 2025-26 (including the transfer at the year end) and prepare the Debenture Interest Account.',
  model: `${J([...S3Y.h1.entries, ...S3Y.h2.entries, { date: '31 Mar 2026', dr: [[PL, S3Yt]], cr: [['Debenture Interest A/c', S3Yt]], nar: 'debenture interest for the year transferred' }])}\n\n**Debenture Interest Account**\n\n${S3Yl.md}`,
  sol: 'Two half-years, each with interest due, holders paid and tax deposited; the year\'s gross interest then closes to the Statement of Profit and Loss.',
  scheme: [['First half-year entries', 1], ['Second half-year entries', 1], ['Transfer and Debenture Interest Account', 1]],
}));

const S3C = lot({ n: 4000, rate: 10 });
const S3Ci = instalments(S3C, { per: { app: 30, allot: 40, call: 30 }, advance: 100, arrears: { call: 120 }, dates: { allot: '1 Jun 2025', call: '1 Sep 2025' } });
const S3Cint = interestFor(S3Ci.callArrears, 10, 2);
eq([S3Ci.allotCash, S3Ci.callCash, S3Ci.callArrears, S3Cint], [163000, 113400, 3600, 60], 's3_calls');
Q('s3_calls', short({
  t: 4, d: 3, c: 'application', marks: 3,
  stem: 'Sangla Valley Ciders Ltd, an imagined company, issued 4,000 10% debentures of ₹100 each at par: ₹30 on application (received in full), ₹40 on allotment on 1 June 2025 and ₹30 on the first and final call on 1 September 2025. With the allotment money, a holder of 100 debentures also paid the call. A holder of 120 debentures did not pay the call until 1 November 2025, when he paid it with interest at 10% a year as the terms required. Pass the journal entries from the allotment onwards.',
  model: J([...S3Ci.entries.slice(2), { date: '1 Nov 2025', dr: [['Bank A/c', S3Ci.callArrears + S3Cint]], cr: [['Calls in Arrears A/c', S3Ci.callArrears], ['Interest on Calls in Arrears A/c', S3Cint]], nar: `calls in arrears received with interest for 2 months at 10% a year` }]),
  sol: 'The advance is credited at allotment and used at the call; the arrears are collected later with interest for the delay.',
  scheme: [['Allotment due and received with calls in advance', 1], ['Call due and received with arrears and advance', 1], ['Arrears received with interest', 1]],
}));

const LCI = lot({ n: 6000, rate: 9, iss: 5 });
const LCIi = instalments(LCI, { per: { app: 30, allot: 45, call: 30 }, applied: 7000, advance: 250, arrears: { call: 100 } });
const LCIint = interestFor(LCIi.advanceCash, 12, 3);
eq([LCIi.appCash, LCIi.refund, LCIi.allotCash, LCIi.callCash, LCIi.callArrears, LCIint], [210000, 30000, 277500, 169500, 3000, 225], 'l5_calls_interest');
const LCIn = note('Long-term borrowings', [['9% Debentures', [['6,000 9% debentures of ₹100 each, called up', LCI.nominal], ['Calls in arrears', -LCIi.callArrears]]]], LCI.nominal - LCIi.callArrears);
Q('l5_calls_interest', long({
  t: [4, 5], d: 4, c: 'application', marks: 5,
  stem: 'Nako Lake Solar Dryers Ltd, an imagined company, issued 6,000 9% debentures of ₹100 each at a premium of 5%: ₹30 on application, ₹45 on allotment (including the premium) and ₹30 on the first and final call made three months after allotment. Applications were received for 7,000 debentures and the excess money was refunded. A holder of 250 debentures paid the call money with the allotment; a holder of 100 debentures had still not paid the call at the year end.\n\n(a) Pass the journal entries for the issue. [3]\n\n(b) Interest at 12% a year is paid on calls in advance under the terms of issue. Pass the entry for this interest when the call is made, and show the debentures in the note on long-term borrowings at the year end. [2]',
  model: `**(a)**\n\n${J(LCIi.entries)}\n\n**(b)** Interest on calls in advance = ${inr(LCIi.advanceCash)} × 12% × 3/12 = ${rs(LCIint)}.\n\n${J([{ dr: [['Interest on Calls in Advance A/c', LCIint]], cr: [['Bank A/c', LCIint]], nar: 'interest paid on calls in advance for 3 months at 12% a year' }])}\n\n${LCIn.md}`,
  sol: 'The excess applications are refunded, the advance is held until the call, and the unpaid call is deducted in the note.',
  scheme: [['(a) Application, transfer and refund', 1], ['(a) Allotment with premium and calls in advance', 1], ['(a) Call with arrears and advance adjusted', 1], ['(b) Interest on calls in advance', 1], ['(b) Note with calls in arrears deducted', 1]],
}));

// ================================================================ t05 Disclosure
Q('m_current_maturities', mcq({
  t: 5, d: 2, c: 'understanding',
  stem: 'Of the 9% debentures of Auli Ski Wax Ltd, an imagined company, ₹2,00,000 are due for redemption within twelve months of the Balance Sheet date. Under the amended Schedule III, this ₹2,00,000 is shown',
  opts: ['under short-term borrowings, as current maturities of long-term borrowings', 'under long-term borrowings, with the rest of the debentures', 'under trade payables', 'under long-term provisions'],
  sol: 'The amended Schedule III shows the part of a long-term borrowing repayable within twelve months as current maturities under short-term borrowings.',
}));

const S2D = { total: 600000, current: 100000 };
const S2Dbs = bsExtract('Balance Sheet of Rumtek Prayer Flags Ltd (imagined) as at 31 March 2026 (extract)', [['Non-current liabilities', [['Long-term borrowings', '1', S2D.total - S2D.current]]], ['Current liabilities', [['Short-term borrowings', '2', S2D.current]]]]);
Q('s2_disclosure', short({
  t: 5, d: 3, c: 'application', marks: 2,
  stem: 'Rumtek Prayer Flags Ltd, an imagined company in East Sikkim, has 6,000 10% debentures of ₹100 each, issued at par and redeemable at par. Of these, 1,000 debentures are due for redemption on 30 June 2026. Show the debentures in the company’s Balance Sheet as at 31 March 2026, with the notes.',
  model: `${S2Dbs.md}\n\n${note('Note 1: Long-term borrowings', [['10% Debentures (5,000 of ₹100 each)', S2D.total - S2D.current]], 500000).md}\n\n${note('Note 2: Short-term borrowings', [['Current maturities of long-term borrowings (1,000 10% debentures due on 30 June 2026)', S2D.current]], 100000).md}`,
  sol: 'Split the debentures by when they fall due: within twelve months is current.',
  scheme: [['Long-term borrowings with note', 1], ['Current maturities under short-term borrowings with note', 1]],
}));

const S3B = lot({ n: 5000, rate: 9, iss: 6, red: 5 });
const S3Bw = writeOff(S3B.loss, { sp: S3B.premium });
const S3Bsp = S3B.premium - S3Bw.fromSP;
eq([S3B.received, S3B.premium, S3B.redPremium, S3Bw.fromSP, S3Bsp], [530000, 30000, 25000, 25000, 5000], 's3_bs');
const S3Bn = note('Note 2: Long-term borrowings', [['9% Debentures (5,000 of ₹100 each)', S3B.nominal], ['Bank loan (secured by the issue of 4,000 9% debentures as collateral security)', 300000], ['9% Debentures (4,000 of ₹100 each, issued as collateral security)', [['9% Debentures', 400000], ['Debenture Suspense', -400000]]]], 800000);
const S3Bbs = bsExtract('Balance Sheet of Yumthang Rhubarb Ltd (imagined) as at 31 March 2026 (extract)', [["Shareholders' funds", [['Reserves and Surplus', '1', S3Bsp]]], ['Non-current liabilities', [['Long-term borrowings', '2', S3Bn.total], ['Other long-term liabilities', '3', S3B.redPremium]]]]);
Q('s3_bs', short({
  t: [2, 3, 5], d: 3, c: 'application', marks: 3,
  stem: 'During 2025-26 Yumthang Rhubarb Ltd, an imagined company in North Sikkim, issued 5,000 9% debentures of ₹100 each at a premium of 6%, redeemable at a premium of 5%, and wrote off the loss on issue from the securities premium. It also took a bank loan of ₹3,00,000, secured by 4,000 9% debentures of ₹100 each issued as collateral security and recorded by the second method. It had no securities premium before. Prepare the relevant extract of its Balance Sheet as at 31 March 2026, with notes.',
  model: `${S3Bbs.md}\n\n${note('Note 1: Reserves and Surplus', [['Securities Premium', [['Received on issue of debentures', S3B.premium], ['Loss on issue of debentures written off', -S3Bw.fromSP]]]], S3Bsp).md}\n\n${S3Bn.md}\n\n${note('Note 3: Other long-term liabilities', [['Premium on Redemption of Debentures', S3B.redPremium]], 25000).md}`,
  sol: 'Securities premium is net of the write-off; the collateral debentures net to nil; the redemption premium is a long-term liability.',
  scheme: [['Reserves and Surplus note', 1], ['Long-term borrowings note with collateral', 1], ['Premium on redemption under other long-term liabilities', 1]],
}));

const LDC = { d11: 800000, arrears: 200 * 30, d9: 500000, d9cur: 200000, tds: 4400 };
const LDCn1 = note('Note 1: Long-term borrowings', [['11% Debentures', [['8,000 11% debentures of ₹100 each, called up', LDC.d11], ['Calls in arrears (200 debentures at ₹30)', -LDC.arrears]]], ['9% Debentures (3,000 of ₹100 each)', LDC.d9 - LDC.d9cur]], 1094000);
const LDCbs = bsExtract('Balance Sheet of Pelling Cardamom Ltd (imagined) as at 31 March 2026 (extract)', [['Non-current liabilities', [['Long-term borrowings', '1', LDCn1.total]]], ['Current liabilities', [['Short-term borrowings', '2', LDC.d9cur], ['Other current liabilities', '3', LDC.tds]]]]);
eq([LDCn1.total, LDC.arrears], [1094000, 6000], 'l5_disclosure');
Q('l5_disclosure', long({
  t: [4, 5], d: 4, c: 'analysis', marks: 5,
  stem: 'Pelling Cardamom Ltd, an imagined company, gives the following on 31 March 2026: 8,000 11% debentures of ₹100 each, fully called up, on which the final call of ₹30 on 200 debentures is unpaid; 5,000 9% debentures of ₹100 each issued in an earlier year, of which 2,000 are due for redemption on 31 December 2026; and tax of ₹4,400 deducted from the March interest, not yet deposited.\n\n(a) Prepare the relevant extract of the Balance Sheet with notes. [3]\n\n(b) Explain the treatment of (i) the 2,000 9% debentures and (ii) the unpaid call. [2]',
  model: `**(a)**\n\n${LDCbs.md}\n\n${LDCn1.md}\n\n${note('Note 2: Short-term borrowings', [['Current maturities of long-term borrowings (2,000 9% debentures due on 31 December 2026)', LDC.d9cur]], 200000).md}\n\n${note('Note 3: Other current liabilities', [['TDS payable', LDC.tds]], 4400).md}\n\n**(b)** (i) They fall due within twelve months of the Balance Sheet date, so the amended Schedule III moves them out of long-term borrowings and shows them as current maturities of long-term borrowings under short-term borrowings. (ii) The company owes the holders only what they have paid, so the calls in arrears of ${rs(LDC.arrears)} are deducted from the called-up 11% debentures in the note.`,
  sol: 'Sort each item by when it is payable, net the unpaid call against the debentures, and treat tax withheld as owed to the government.',
  scheme: [['(a) Long-term borrowings note with arrears deducted', 1], ['(a) Current maturities under short-term borrowings', 1], ['(a) TDS payable under other current liabilities', 1], ['(b)(i) Current maturities explained', 1], ['(b)(ii) Calls in arrears explained', 1]],
}));

// ================================================================ practice: full ISC-style problems (8 marks, not in the tests)
const P1 = lot({ n: 10000, rate: 10, iss: -5, red: 10 });
const P1i = instalments(P1, { per: { app: 25, allot: 40, call: 30 }, applied: 12000, arrears: { call: 300 }, dates: { app: '1 Apr 2025', allot: '1 May 2025', call: '1 Aug 2025' } });
const P1w = writeOff(P1.loss, { sp: 40000, date: '31 Mar 2026' });
eq([P1i.appCash, P1i.refund, P1i.allotDue, P1.loss, P1i.callArrears, P1w.fromPL], [300000, 50000, 400000, 150000, 9000, 110000], 'l8_full_issue');
const P1n = note('Note 1: Long-term borrowings', [['10% Debentures', [['10,000 10% debentures of ₹100 each, called up', P1.nominal], ['Calls in arrears (300 debentures at ₹30)', -P1i.callArrears]]]], 991000);
Q('l8_full_issue', long({
  t: [1, 2, 4, 5], d: 5, c: 'analysis', marks: 8,
  stem: 'Nag Tibba Tents Ltd, an imagined company at Pantwari, issued 10,000 10% debentures of ₹100 each at a discount of 5%, redeemable after six years at a premium of 10%. They were payable ₹25 on application (1 April 2025), ₹40 on allotment (1 May 2025) and ₹30 on the first and final call (1 August 2025). Applications were received for 12,000 debentures; the excess money was refunded. All money was received except the call on 300 debentures. The company had ₹40,000 in its Securities Premium Account.\n\n(a) Pass the journal entries for the issue. [4]\n\n(b) Pass the entry writing off the loss on issue on 31 March 2026 according to the ISC rule. [2]\n\n(c) Show the notes on long-term borrowings and other long-term liabilities as at 31 March 2026. [2]',
  model: `**(a)**\n\n${J(P1i.entries)}\n\n**(b)** Loss on issue = discount ${inr(P1.discount)} + premium on redemption ${inr(P1.redPremium)} = ${rs(P1.loss)}.\n\n${J([P1w.entry])}\n\n**(c)**\n\n${P1n.md}\n\n${note('Note 2: Other long-term liabilities', [['Premium on Redemption of Debentures', P1.redPremium]], 100000).md}`,
  sol: 'Instalments with the discount at allotment and the redemption premium as a liability; the loss closes in the same year; unpaid calls are deducted in the note.',
  scheme: [['(a) Application, transfer and refund', 1], ['(a) Allotment due with loss on issue and premium on redemption', 1], ['(a) Allotment received', 1], ['(a) Call due and received with arrears', 1], ['(b) Loss calculated', 1], ['(b) Write-off in the ISC order', 1], ['(c) Long-term borrowings note', 1], ['(c) Other long-term liabilities note', 1]],
}));

const P2v = vendorLot({ amount: 880000, rate: 9, iss: 10 });
const P2p = purchase({ assets: [['Hatchery Buildings', 600000], ['Pond Equipment', 240000], ['Stock of Feed', 60000], ['Debtors', 50000]], liabs: [['Creditors', 90000]], pc: P2v.received, vendor: 'Sankri Fish Seed A/c' });
const P2promo = lot({ n: 500, rate: 9 });
eq([P2v.n, P2v.premium, P2p.net, P2p.goodwill], [8000, 80000, 860000, 20000], 'l8_vendor_collateral');
const P2n = note('Note 2: Long-term borrowings', [[`9% Debentures (${inr(P2v.n + P2promo.n)} of ₹100 each, issued for consideration other than cash)`, P2v.nominal + P2promo.nominal], ['Bank loan (secured by the issue of 7,000 9% debentures as collateral security)', 600000], ['9% Debentures (7,000 of ₹100 each, issued as collateral security)', [['9% Debentures', 700000], ['Debenture Suspense', -700000]]]], 1450000);
Q('l8_vendor_collateral', long({
  t: [3, 5], d: 4, c: 'application', marks: 8,
  stem: 'Dodital Fish Hatcheries Ltd, an imagined company at Sangamchatti, completed three transactions in 2025-26:\n\n(i) It took over the business of Sankri Fish Seed, an imagined firm: hatchery buildings ₹6,00,000, pond equipment ₹2,40,000, stock of feed ₹60,000, debtors ₹50,000 and creditors ₹90,000, for ₹8,80,000 paid by issuing 9% debentures of ₹100 each at a premium of 10%.\n(ii) It allotted 500 9% debentures of ₹100 each at par to its promoters for their services in forming the company.\n(iii) It took a bank loan of ₹6,00,000 and issued 7,000 9% debentures of ₹100 each to the bank as collateral security (second method).\n\n(a) Pass the journal entries. [5]\n\n(b) Prepare the notes on reserves and surplus and long-term borrowings as at 31 March 2026. [3]',
  model: `**(a)**\n\n${J([...P2p.entries, lotEntry(P2v, 'Sankri Fish Seed A/c', `${inr(P2v.n)} 9% debentures issued to the vendor at a premium of 10%`), { dr: [['Incorporation Costs A/c', P2promo.nominal]], cr: [['9% Debentures A/c', P2promo.nominal]], nar: '500 debentures allotted to promoters for their services' }, { dr: [['Bank A/c', 600000]], cr: [['Bank Loan A/c', 600000]], nar: 'loan taken from the bank' }, { dr: [['Debenture Suspense A/c', 700000]], cr: [['9% Debentures A/c', 700000]], nar: '7,000 9% debentures issued as collateral security for the bank loan' }])}\n\nWorking: net assets ${inr(P2p.A)} − ${inr(P2p.L)} = ${inr(P2p.net)}; goodwill = ${inr(P2p.pc)} − ${inr(P2p.net)} = ${inr(P2p.goodwill)}; debentures to the vendor = 8,80,000 ÷ 110 = ${inr(P2v.n)}.\n\n**(b)**\n\n${note('Note 1: Reserves and Surplus', [['Securities Premium', P2v.premium]], 80000).md}\n\n${P2n.md}`,
  sol: 'Goodwill balances the purchase; promoters\' debentures are a formation cost; the collateral debentures net to nil against suspense.',
  scheme: [['(a) Business purchase entry', 1], ['(a) Assets and liabilities with goodwill', 1], ['(a) Allotment to vendor with premium', 1], ['(a) Promoters entry', 1], ['(a) Bank loan and collateral entries', 1], ['(b) Securities premium note', 1], ['(b) Debentures and bank loan in the borrowings note', 1], ['(b) Collateral less suspense and correct total', 1]],
}));
