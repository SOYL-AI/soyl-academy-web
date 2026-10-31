// ISC 12 Accounts, ch06 Issue and Forfeiture of Shares — question bank.
// Every company, person and figure is imagined by SOYL and labelled as such; no textbook illustration
// or exercise and no CISCE specimen or past-paper item is reused. Every amount and statement is computed
// with acc.mjs from the givens and checked (entries balance, instalment accounts close, pro-rata
// allotments give whole shares, forfeiture equals money received less premium received, the discount on
// reissue stays within the amount forfeited, notes agree with the books, balance sheets total); the
// expected values pinned below (hand-checked) catch any drift in the figures. ISC 2027 scope: issue at par
// and premium with the journal proper and cash book; shares to promoters, underwriters and vendors;
// calls in arrears and in advance with interest (Table F: at most 10 % and 12 % p.a. unless the articles
// say otherwise); over- and under-subscription with pro-rata allotment; forfeiture and reissue;
// Schedule III disclosure. Removed topics (bonus, rights, private placement, sweat equity, ESOS) are not
// asked.
import { Q, mcq, ar, tf, fb, match, num, short, long } from './lib.mjs';
import { rs, inr, check, pct, interest, journal, Books, issue, forfeit, reissue, vendorShares, businessPurchase, shareNote, simpleNote, bsIII, cashBookSplit, receiveArrears, payAdvanceInterest, ACC, INT } from './acc.mjs';

const E = 'Equity Share Capital A/c';
const eq = (a, b, what) => check(JSON.stringify(a) === JSON.stringify(b), `${what}: got ${JSON.stringify(a)}, expected ${JSON.stringify(b)}`);
const PL = 'Statement of Profit and Loss';
const IC = 'Incorporation Costs A/c';
const fs3 = (o) => ({ name: o[0], cap: o[1], prem: o[2] ?? 0 });
const inst = (...xs) => xs.map(fs3);

// ================================================================ t01 Issue at par and at a premium; journal proper and cash book
Q('m_premium_credit', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Todi Steel Racks Ltd, an imagined company, issues equity shares of ₹10 each at ₹13. Under the Companies Act, 2013, the ₹3 per share it receives over and above the face value is credited to',
  opts: ['Securities Premium A/c', 'Equity Share Capital A/c', 'Capital Reserve A/c', 'Statement of Profit and Loss'],
  sol: 'Share capital is always credited at face value; the excess is a capital receipt that Section 52 requires to be kept in the Securities Premium Account.',
}));

Q('m_sec52', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Bihag Paper Cups Ltd, an imagined company, has a balance of ₹3,00,000 in its Securities Premium Account. For which of these purposes may it NOT use the balance under Section 52 of the Companies Act, 2013?',
  opts: ['Paying a dividend to its equity shareholders', 'Writing off its preliminary expenses', 'Writing off the commission paid on an issue of its shares', 'Providing for the premium payable on redemption of its debentures'],
  sol: 'Securities premium is capital, not profit. Section 52 lists capital uses only (preliminary expenses, issue expenses and commission, premium on redemption, buy-back); a dividend is never one of them.',
}));

Q('m_cash_book', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Marwa Cold Storage Ltd, an imagined company, keeps a cash book for its share issue. Which of these entries is written in the journal proper rather than in the cash book?',
  opts: ['Equity Share Allotment A/c Dr. To Equity Share Capital A/c (allotment money due)', 'Bank A/c Dr. To Equity Share Application A/c (application money received)', 'Bank A/c Dr. To Equity Share Allotment A/c (allotment money received)', 'Bank A/c Dr. To Equity Share First Call A/c (call money received)'],
  sol: 'With a cash book, every receipt or payment through the bank is posted there; only non-cash entries, such as money becoming due on allotment or a call and the transfer of application money, stay in the journal proper.',
}));

const PBB = { n: 20000, app: 4, allotCap: 3, allotPrem: 3, call: 3 };
check(PBB.app + PBB.allotCap + PBB.call === 10, 'm_allot_due_prem face value');
const PBBd = { cap: PBB.n * PBB.allotCap, prem: PBB.n * PBB.allotPrem };
eq([PBBd.cap, PBBd.prem], [60000, 60000], 'm_allot_due_prem');
Q('m_allot_due_prem', mcq({
  t: 1, d: 2, c: 'application',
  stem: `Puriya Bus Bodies Ltd, an imagined company, issues ${inr(PBB.n)} equity shares of ₹10 each at ₹13, payable ₹${PBB.app} on application, ₹${PBB.allotCap + PBB.allotPrem} on allotment (including the premium) and ₹${PBB.call} on the first and final call. The entry when the allotment money becomes due is`,
  opts: [
    `Equity Share Allotment A/c Dr. ${rs(PBBd.cap + PBBd.prem)} To Equity Share Capital A/c ${rs(PBBd.cap)} and To Securities Premium A/c ${rs(PBBd.prem)}`,
    `Equity Share Allotment A/c Dr. ${rs(PBBd.cap + PBBd.prem)} To Equity Share Capital A/c ${rs(PBBd.cap + PBBd.prem)}`,
    `Equity Share Allotment A/c Dr. ${rs(PBBd.cap)} To Equity Share Capital A/c ${rs(PBBd.cap)}`,
    `Bank A/c Dr. ${rs(PBBd.cap + PBBd.prem)} To Equity Share Allotment A/c ${rs(PBBd.cap + PBBd.prem)}`,
  ],
  sol: `Of the ₹${PBB.allotCap + PBB.allotPrem} due per share, ₹${PBB.allotPrem} is premium and ₹${PBB.allotCap} is capital (₹${PBB.app} + ₹${PBB.allotCap} + ₹${PBB.call} make up the ₹10 face value).`,
}));

Q('ar_premium', ar({
  t: 1, d: 2, c: 'understanding', key: 'a',
  a: 'When Asavari Kitchen Chimneys Ltd, an imagined company, issues shares of face value ₹10 at ₹15 each, its Equity Share Capital Account is credited with only ₹10 per share.',
  r: 'Share capital is recorded at face value, and the amount received above it is credited to the Securities Premium Account.',
  sol: 'Both are true, and the rule in R is exactly why only the face value of ₹10 reaches the share capital account.',
}));

Q('ar_cashbook', ar({
  t: 1, d: 3, c: 'understanding', key: 'c',
  a: 'Kanada Ply Boards Ltd, an imagined company that keeps a cash book, records the application money it receives in the cash book and not in the journal proper.',
  r: 'When a cash book is kept, the entries for allotment money becoming due are also made in the cash book.',
  sol: 'A is true: money received through the bank goes to the cash book. R is false: money becoming due involves no cash, so that entry stays in the journal proper.',
}));

Q('tf_premium_pl', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? The premium of ₹2 per share collected by Jaunpuri Cane Sugar Ltd, an imagined company, on its new equity shares is credited to its Statement of Profit and Loss as a gain of the year.',
  sol: 'Premium is a capital receipt. It is credited to the Securities Premium Account, shown under Reserves and Surplus, and may be used only for the purposes in Section 52.',
}));

Q('fb_face', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'The ₹10 per share stated in the memorandum of Basant Ceiling Fans Ltd, an imagined company, and printed on its share certificates, is the ___ value of each share.',
  acc: [['face', 'nominal', 'par']],
  sol: 'It is the face (nominal or par) value; share capital is always recorded at this amount, whatever the issue price.',
}));

const HCW = { n: 36000, onApp: 1, onAllot: 2 };
const HCWv = HCW.n * (HCW.onApp + HCW.onAllot);
eq(HCWv, 108000, 'n_premium_total');
Q('n_premium_total', num({
  t: 1, d: 2, c: 'application', value: HCWv, unit: '₹',
  stem: `Hindol Copper Wires Ltd, an imagined company, issues ${inr(HCW.n)} equity shares of ₹10 each at a premium of ₹${HCW.onApp + HCW.onAllot}, with ₹${HCW.onApp} of the premium payable on application and ₹${HCW.onAllot} on allotment. Every share is applied for and all the money is received. What total is credited to the Securities Premium Account (in ₹)?`,
  sol: `Premium per share ₹${HCW.onApp} + ₹${HCW.onAllot}; total ${inr(HCW.n)} × ₹${HCW.onApp + HCW.onAllot} = ${rs(HCWv)}.`,
}));

const MRM = new Books();
const MRMi = issue(MRM, { fv: 10, n: 25000, inst: inst(['Application', 2], ['Allotment', 5], ['First and Final Call', 3]), made: 2 });
eq([MRMi.applied, -MRM.bal(E), MRM.bal(ACC.bank)], [25000, 175000, 175000], 's2_par_entries');
Q('s2_par_entries', short({
  t: 1, d: 2, c: 'application', marks: 2,
  stem: `Megh Rubber Mats Ltd, an imagined company, offers ${inr(MRMi.s.n)} equity shares of ₹10 each at par, payable ₹2 on application, ₹5 on allotment and ₹3 on the first and final call. Applications are received for exactly ${inr(MRMi.s.n)} shares, the shares are allotted, and the allotment money is received in full; the call has not yet been made. Pass the journal entries for application and allotment (the company does not keep a separate cash book).`,
  model: MRM.journal().md,
  sol: 'Each instalment is first received (or made due) through its own account and then transferred to share capital.',
  scheme: [['Application money received and transferred to share capital', 1], ['Allotment money due and received', 1]],
}));

Q('s2_sec52', short({
  t: 1, d: 2, c: 'recall', marks: 2,
  stem: 'The directors of Shyam Kalyan Bearings Ltd, an imagined company, ask how the ₹4,50,000 standing in its Securities Premium Account may be used. State any four purposes permitted by Section 52 of the Companies Act, 2013.',
  model: 'Four permitted purposes:\n1. Writing off the preliminary expenses of the company.\n2. Writing off the expenses of, or the commission paid or discount allowed on, any issue of its securities (shares or debentures).\n3. Providing for the premium payable on the redemption of its redeemable preference shares or debentures.\n4. Purchase of its own shares or other securities (buy-back) under Section 68.\n\nIt may not be used to pay a dividend, as it is a capital receipt.',
  sol: 'List the capital uses allowed by the section; half a mark each.',
  scheme: [['Two permitted purposes', 1], ['Two more permitted purposes', 1]],
}));

const JWT = new Books();
const JWTi = issue(JWT, { fv: 10, n: 40000, inst: inst(['Application', 3], ['Allotment', 3, 2], ['First and Final Call', 4]) });
eq([-JWT.bal(E), -JWT.bal(ACC.sp), JWT.bal(ACC.bank)], [400000, 80000, 480000], 's3_premium_journal');
Q('s3_premium_journal', short({
  t: 1, d: 3, c: 'application', marks: 3,
  stem: `Jog Water Tanks Ltd, an imagined company, issues ${inr(JWTi.s.n)} equity shares of ₹10 each at ₹12, payable ₹3 on application, ₹5 on allotment (including the premium of ₹2) and ₹4 on the first and final call. All the shares are applied for and allotted, and every amount due is received. Pass the journal entries in the books of the company.`,
  model: `${JWT.journal().md}\n\nCheck: share capital ${rs(-JWT.bal(E))} + securities premium ${rs(-JWT.bal(ACC.sp))} = cash received ${rs(JWT.bal(ACC.bank))}.`,
  sol: 'Credit the capital part of each instalment to share capital and the ₹2 premium, due with allotment, to Securities Premium.',
  scheme: [['Application entries', 1], ['Allotment due (with premium) and received', 1], ['Call due and received', 1]],
}));

const GTS = new Books();
const GTSi = issue(GTS, { fv: 10, n: 30000, inst: inst(['Application', 3], ['Allotment', 4], ['First and Final Call', 3]), groups: [{ applied: 4000, allotted: 0 }, { applied: 30000, allotted: 30000 }] });
const GTScb = cashBookSplit(GTS.entries, { nars: { 1: `application money on ${inr(30000)} shares transferred to share capital; the refund on rejected applications is entered in the cash book` } });
eq([GTSi.refT, GTScb.receipts, GTScb.payments, GTScb.balance], [12000, 312000, 12000, 300000], 's3_cashbook');
Q('s3_cashbook', short({
  t: [1, 4], d: 3, c: 'application', marks: 3,
  stem: `Gorakh Tractor Seats Ltd, an imagined company, keeps a cash book. It invites applications for ${inr(GTSi.s.n)} equity shares of ₹10 each at par, payable ₹3 on application, ₹4 on allotment and ₹3 on the first and final call. Applications arrive for ${inr(GTSi.applied)} shares; those for ${inr(GTSi.groups[0].applied)} shares are rejected and their money refunded, and the rest are allotted in full. All money due is received. Pass the entries in the journal proper and prepare the cash book (bank column only).`,
  model: `**Journal proper**\n\n${GTScb.jp.md}\n\n**Cash Book (bank column only)**\n\n${GTScb.cb.md}`,
  sol: 'Receipts and the refund go to the cash book; the journal proper keeps only the transfer of application money and the amounts falling due.',
  scheme: [['Journal proper: transfer of application money and the two amounts due', 1], ['Cash book receipts: application, allotment and call', 1], ['Refund as a payment and balance c/d', 1]],
}));

const SDE = new Books();
const SDEi = issue(SDE, { fv: 10, n: 50000, inst: inst(['Application', 3], ['Allotment', 3], ['First Call', 2], ['Second and Final Call', 2]), defaults: [{ who: 'Mohsin', shares: 1000, from: 3 }], arrearsAccount: true });
const SDEcap = SDE.ledgerOf(E);
const SDEcia = SDE.ledgerOf(ACC.cia);
eq([SDEcap.balance, SDEcia.balance, SDE.bal(ACC.bank)], [-500000, 2000, 498000], 'l5_par_ledger');
Q('l5_par_ledger', long({
  t: [1, 3], d: 3, c: 'application', marks: 5,
  stem: `Shankara Dairy Equipment Ltd, an imagined company, issues ${inr(SDEi.s.n)} equity shares of ₹10 each at par, payable ₹3 on application, ₹3 on allotment, ₹2 on the first call and ₹2 on the second and final call. All the shares are applied for and allotted. All money is received except the second and final call on ${inr(1000)} shares held by Mohsin. The company keeps a Calls in Arrears Account.\n\n(a) Pass the journal entries. [3]\n\n(b) Prepare the Equity Share Capital Account and the Calls in Arrears Account. [2]`,
  model: `**(a)**\n\n${SDE.journal().md}\n\n**(b) Equity Share Capital Account**\n\n${SDEcap.md}\n\n**Calls in Arrears Account**\n\n${SDEcia.md}`,
  sol: 'Share capital is credited with every amount called up; the unpaid call sits in Calls in Arrears and is deducted only in the balance sheet.',
  scheme: [['(a) Application and allotment entries', 1], ['(a) First call entries', 1], ['(a) Final call with arrears debited to Calls in Arrears', 1], ['(b) Equity Share Capital Account', 1], ['(b) Calls in Arrears Account', 1]],
}));

// ================================================================ t02 Shares for consideration other than cash
Q('m_promoters', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Kalavati Herbal Soaps Ltd, an imagined company, allots 5,000 fully paid equity shares of ₹10 each to its promoters for their services in setting up the company. The entry is',
  opts: ['Incorporation Costs A/c (or Goodwill A/c) Dr. To Equity Share Capital A/c ₹50,000', 'Bank A/c Dr. To Equity Share Capital A/c ₹50,000', 'Equity Share Capital A/c Dr. To Promoters\' A/c ₹50,000', 'Statement of Profit and Loss Dr. To Equity Share Capital A/c ₹50,000'],
  sol: 'No cash comes in; the value of the promoters\' services is debited to Incorporation Costs (or Goodwill) and share capital is credited.',
}));

Q('m_underwriting_cap', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'Chandrakauns LED Panels Ltd, an imagined company, issues equity shares at ₹20 each, and its articles authorise underwriting commission at 6%. Under the Companies Act, 2013 and its rules, the most it may pay its underwriters per share is',
  opts: ['₹1, which is five per cent of the issue price, the lower of the legal limit and the articles', '₹1.20, the rate allowed by its articles', '₹0.50, two and a half per cent of the issue price', '₹2, ten per cent of the issue price'],
  sol: 'Commission on shares may not exceed five per cent of the issue price or the rate in the articles, whichever is less; five per cent of ₹20 is ₹1.',
}));

const MCT = vendorShares(420000, 10, 14);
eq([MCT.n, MCT.cap, MCT.prem], [30000, 300000, 120000], 'n_vendor_shares');
Q('n_vendor_shares', num({
  t: 2, d: 2, c: 'application', value: MCT.n, unit: 'shares',
  stem: `Multani Clay Tiles Ltd, an imagined company, buys a kiln and its machinery from Zehra Kiln Works, an imagined firm, for ${rs(420000)}, paid entirely by issuing fully paid equity shares of ₹10 each at a premium of ₹4. How many shares does it issue to Zehra Kiln Works?`,
  sol: `Issue price ₹10 + ₹4 = ₹14; shares = ${inr(420000)} ÷ 14 = ${inr(MCT.n)}.`,
}));

const ARM = businessPurchase({ assets: [['Sundry Assets', 900000]], liabilities: [['Sundry Liabilities', 140000]], pc: 720000 });
eq([ARM.net, ARM.gw, ARM.crv], [760000, 0, 40000], 'm_capital_reserve_bp');
Q('m_capital_reserve_bp', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Abhogi Rice Mills Ltd, an imagined company, takes over assets of ${rs(ARM.ta)} and liabilities of ${rs(ARM.tl)} from a partnership firm for a purchase consideration of ${rs(720000)}, payable in its equity shares. In the entry recording the purchase of the business, the company`,
  opts: [`credits Capital Reserve A/c with ${rs(ARM.crv)}`, `debits Goodwill A/c with ${rs(ARM.crv)}`, `credits Capital Reserve A/c with ${rs(ARM.ta - 720000)}`, `debits Goodwill A/c with ${rs(ARM.tl)}`],
  sol: `Net assets ${inr(ARM.ta)} − ${inr(ARM.tl)} = ${inr(ARM.net)} exceed the consideration of ${inr(720000)}; the gain of ${rs(ARM.crv)} is a capital profit credited to Capital Reserve.`,
}));

Q('tf_vendor', tf({
  t: 2, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? Equity shares that Patdeep Biscuits Ltd, an imagined company, allots to a vendor as payment for a fleet of delivery vans form part of its subscribed and paid-up capital, even though no cash is received for them.',
  sol: 'Shares issued for consideration other than cash are fully paid by the asset received; they are part of subscribed and paid-up capital like shares issued for cash.',
}));

Q('ar_underwriter', ar({
  t: 2, d: 3, c: 'understanding', key: 'b',
  a: 'Shivranjani Auto Horns Ltd, an imagined company, may settle the commission due to the underwriters of its issue by allotting them fully paid shares.',
  r: 'The Companies Act, 2013 limits underwriting commission on shares to five per cent of the issue price or the rate in the articles, whichever is less.',
  sol: 'Both are true. R states the ceiling on the amount of commission; it says nothing about paying it in shares, so it does not explain A.',
}));

Q('match_noncash', match({
  t: 2, d: 2, c: 'understanding', marks: 2,
  stem: 'Match each allotment of fully paid shares by Sarang Fibre Ropes Ltd, an imagined company, with the account debited when its share capital is credited.',
  pairs: [
    ['Shares to promoters for their services', 'Incorporation Costs A/c (or Goodwill A/c)'],
    ['Shares to underwriters for their commission', "Underwriters' A/c, after charging Underwriting Commission"],
    ['Shares to a vendor for machinery bought', "Vendor's A/c, after debiting Machinery A/c"],
    ['Shares to the public for cash', 'Application, allotment and call accounts (cash through Bank)'],
  ],
  sol: 'Ask what the company received for the shares: services, underwriting, an asset or cash. That account, or the personal account it was first credited to, is debited.',
}));

const DMP = { prom: 3000, pub: 60000, rate: 4 };
const DMPc = pct(DMP.rate, DMP.pub * 10);
const DMPs = vendorShares(DMPc, 10, 10);
eq([DMPc, DMPs.n], [24000, 2400], 's2_promoter_underwriter');
Q('s2_promoter_underwriter', short({
  t: 2, d: 2, c: 'application', marks: 2,
  stem: `Pass journal entries in the books of Deshkar Motor Parts Ltd, an imagined company: (a) it allots ${inr(DMP.prom)} fully paid equity shares of ₹10 each to its promoters for their services in forming the company; (b) its public issue of ${inr(DMP.pub)} equity shares of ₹10 each at par is underwritten by Jagriti Capital Services, whose commission of ${DMP.rate}% of the issue price, as authorised by the articles, is settled by allotting fully paid equity shares of ₹10 each at par.`,
  model: `Commission = ${DMP.rate}% of ${inr(DMP.pub)} × ₹10 = ${rs(DMPc)}, settled by ${inr(DMPs.n)} shares of ₹10.\n\n${journal([
    { dr: [[IC, DMP.prom * 10]], cr: [[E, DMP.prom * 10]], nar: `${inr(DMP.prom)} fully paid shares allotted to promoters for their services` },
    { dr: [['Underwriting Commission A/c', DMPc]], cr: [["Jagriti Capital Services (Underwriters') A/c", DMPc]], nar: 'underwriting commission due' },
    { dr: [["Jagriti Capital Services (Underwriters') A/c", DMPc]], cr: [[E, DMPs.cap]], nar: `${inr(DMPs.n)} fully paid shares allotted to the underwriters for their commission` },
  ]).md}`,
  sol: 'Debit what the company received (services, underwriting) and credit share capital; the commission first passes through the underwriters\' account.',
  scheme: [['(a) Promoters: Incorporation Costs (or Goodwill) Dr. To Share Capital', 1], ['(b) Commission computed, charged and settled in shares', 1]],
}));

const RFP = { assets: [['Land A/c', 300000], ['Plant and Machinery A/c', 240000], ['Stock A/c', 100000], ['Debtors A/c', 60000]], liabilities: [['Creditors A/c', 50000]], pc: 720000, cheque: 48000 };
const RFPb = businessPurchase(RFP);
const RFPs = vendorShares(RFP.pc - RFP.cheque, 10, 12);
eq([RFPb.net, RFPb.gw, RFPs.n, RFPs.cap, RFPs.prem], [650000, 70000, 56000, 560000, 112000], 's3_vendor_business');
const RFPv = 'Rajeshwari Fruit Traders A/c';
Q('s3_vendor_business', short({
  t: 2, d: 3, c: 'application', marks: 3,
  stem: `Rageshri Food Processors Ltd, an imagined company, buys the business of Rajeshwari Fruit Traders, an imagined firm, taking over land ${rs(300000)}, plant and machinery ${rs(240000)}, stock ${rs(100000)}, debtors ${rs(60000)} and creditors ${rs(50000)}, for a purchase consideration of ${rs(RFP.pc)}. It pays ${rs(RFP.cheque)} by cheque and the balance by issuing equity shares of ₹10 each at ₹12. Pass the journal entries.`,
  model: `Net assets = ${inr(RFPb.ta)} − ${inr(RFPb.tl)} = ${inr(RFPb.net)}; goodwill = ${inr(RFP.pc)} − ${inr(RFPb.net)} = ${rs(RFPb.gw)}. Shares = (${inr(RFP.pc)} − ${inr(RFP.cheque)}) ÷ 12 = ${inr(RFPs.n)}.\n\n${journal([
    { dr: [['Business Purchase A/c', RFP.pc]], cr: [[RFPv, RFP.pc]], nar: 'business of Rajeshwari Fruit Traders purchased' },
    { dr: [...RFP.assets, ['Goodwill A/c', RFPb.gw]], cr: [...RFP.liabilities, ['Business Purchase A/c', RFP.pc]], nar: 'assets and liabilities taken over; excess of consideration over net assets debited to goodwill' },
    { dr: [[RFPv, RFP.pc]], cr: [[ACC.bank, RFP.cheque], [E, RFPs.cap], [ACC.sp, RFPs.prem]], nar: `vendor paid by cheque and by ${inr(RFPs.n)} equity shares of ₹10 each at ₹12` },
  ]).md}`,
  sol: 'Record the purchase, bring in assets and liabilities with goodwill as the balancing figure, then discharge the vendor in cash and shares.',
  scheme: [['Business Purchase entry', 1], ['Assets, liabilities and goodwill', 1], ['Vendor discharged: cheque, capital and premium', 1]],
}));

const JSG = { mach: 225000, prom: 400, van: 150000, vanCash: 50000 };
const JSGm = vendorShares(JSG.mach, 100, 125);
const JSGv = vendorShares(JSG.van - JSG.vanCash, 100, 100);
eq([JSGm.n, JSGm.cap, JSGm.prem, JSGv.n], [1800, 180000, 45000, 1000], 's3_noncash_mix');
Q('s3_noncash_mix', short({
  t: 2, d: 3, c: 'application', marks: 3,
  stem: `Pass journal entries in the books of Jhinjhoti Spice Grinders Ltd, an imagined company: (a) it buys grinding machinery worth ${rs(JSG.mach)} from Hridaan Engineering, an imagined firm, paying by equity shares of ₹100 each at a premium of 25%; (b) it allots ${inr(JSG.prom)} fully paid equity shares of ₹100 each to its promoters, debiting goodwill; (c) it buys a delivery van for ${rs(JSG.van)} from Shaheen Motors, paying ${rs(JSG.vanCash)} by cheque and the rest in equity shares of ₹100 each at par.`,
  model: `(a) Shares = ${inr(JSG.mach)} ÷ 125 = ${inr(JSGm.n)}. (c) Shares = (${inr(JSG.van)} − ${inr(JSG.vanCash)}) ÷ 100 = ${inr(JSGv.n)}.\n\n${journal([
    { dr: [['Machinery A/c', JSG.mach]], cr: [['Hridaan Engineering A/c', JSG.mach]], nar: 'machinery bought from Hridaan Engineering' },
    { dr: [['Hridaan Engineering A/c', JSG.mach]], cr: [[E, JSGm.cap], [ACC.sp, JSGm.prem]], nar: `${inr(JSGm.n)} shares of ₹100 issued at ₹125 to the vendor` },
    { dr: [['Goodwill A/c', JSG.prom * 100]], cr: [[E, JSG.prom * 100]], nar: `${inr(JSG.prom)} fully paid shares allotted to promoters` },
    { dr: [['Delivery Van A/c', JSG.van]], cr: [['Shaheen Motors A/c', JSG.van]], nar: 'delivery van bought from Shaheen Motors' },
    { dr: [['Shaheen Motors A/c', JSG.van]], cr: [[ACC.bank, JSG.vanCash], [E, JSGv.cap]], nar: `vendor paid by cheque and ${inr(JSGv.n)} shares at par` },
  ]).md}`,
  sol: 'Each non-cash allotment debits what was received and credits share capital (and premium) through the supplier\'s personal account where there is one.',
  scheme: [['(a) Machinery and vendor discharged with premium', 1], ['(b) Shares to promoters through goodwill', 1], ['(c) Van paid partly by cheque, partly in shares', 1]],
}));

const MEK = { assets: [['Buildings A/c', 350000], ['Machinery A/c', 170000], ['Stock A/c', 80000]], liabilities: [['Creditors A/c', 80000]], pc: 480000, pub: 60000, price: 12, artRate: 6 };
const MEKb = businessPurchase(MEK);
const MEKs = vendorShares(MEK.pc, 10, MEK.price);
const MEKrate = Math.min(5, MEK.artRate);
const MEKc = pct(MEKrate, MEK.pub * MEK.price);
const MEKu = vendorShares(MEKc, 10, MEK.price);
eq([MEKb.net, MEKb.crv, MEKs.n, MEKc, MEKu.n, MEKu.prem], [520000, 40000, 40000, 36000, 3000, 6000], 'l5_vendor_public');
const MEKv = 'Dilnaz Appliances A/c';
Q('l5_vendor_public', long({
  t: 2, d: 4, c: 'analysis', marks: 5,
  stem: `Madhuvanti Electric Kettles Ltd, an imagined company:\n\n(a) acquires the business of Dilnaz Appliances, an imagined firm, taking over buildings ${rs(350000)}, machinery ${rs(170000)}, stock ${rs(80000)} and creditors ${rs(80000)}, for ${rs(MEK.pc)} paid in fully paid equity shares of ₹10 each issued at ₹${MEK.price}. Pass the journal entries. [3]\n\n(b) offers ${inr(MEK.pub)} equity shares of ₹10 each to the public at ₹${MEK.price}; the issue is fully underwritten and its articles authorise commission at ${MEK.artRate}%. The underwriters are paid the maximum commission permitted, in fully paid shares at the issue price. Calculate the commission and pass the entries. [2]`,
  model: `**(a)** Net assets = ${inr(MEKb.ta)} − ${inr(MEKb.tl)} = ${inr(MEKb.net)}; consideration ${inr(MEK.pc)}; capital reserve = ${rs(MEKb.crv)}. Shares = ${inr(MEK.pc)} ÷ ${MEK.price} = ${inr(MEKs.n)}.\n\n${journal([
    { dr: [['Business Purchase A/c', MEK.pc]], cr: [[MEKv, MEK.pc]], nar: 'business of Dilnaz Appliances purchased' },
    { dr: MEK.assets, cr: [...MEK.liabilities, ['Business Purchase A/c', MEK.pc], [ACC.cr, MEKb.crv]], nar: 'assets and liabilities taken over; excess of net assets over consideration credited to capital reserve' },
    { dr: [[MEKv, MEK.pc]], cr: [[E, MEKs.cap], [ACC.sp, MEKs.prem]], nar: `${inr(MEKs.n)} equity shares of ₹10 issued at ₹${MEK.price} to the vendor` },
  ]).md}\n\n**(b)** The limit is ${MEKrate}% of the issue price (lower than the ${MEK.artRate}% in the articles): ${MEKrate}% of ${inr(MEK.pub)} × ₹${MEK.price} = ${rs(MEKc)}, settled by ${inr(MEKc)} ÷ ${MEK.price} = ${inr(MEKu.n)} shares.\n\n${journal([
    { dr: [['Underwriting Commission A/c', MEKc]], cr: [["Underwriters' A/c", MEKc]], nar: 'underwriting commission due' },
    { dr: [["Underwriters' A/c", MEKc]], cr: [[E, MEKu.cap], [ACC.sp, MEKu.prem]], nar: `${inr(MEKu.n)} fully paid shares allotted to the underwriters at ₹${MEK.price}` },
  ]).md}`,
  sol: 'Compare the consideration with net assets for goodwill or capital reserve; the commission is capped at the lower of five per cent and the articles\' rate.',
  scheme: [['(a) Business Purchase and vendor entries', 1], ['(a) Assets and liabilities with capital reserve', 1], ['(a) Shares issued at a premium to the vendor', 1], ['(b) Commission at five per cent of the issue price', 1], ['(b) Commission entries and shares at a premium', 1]],
}));

// ================================================================ t03 Calls in arrears and calls in advance, with interest
Q('m_cia_shown', mcq({
  t: [3, 6], d: 2, c: 'understanding',
  stem: 'At the end of the year, the Calls in Arrears Account of Hamir Garden Tools Ltd, an imagined company, shows a debit balance of ₹6,000 on fully called shares. In the Schedule III balance sheet this amount is',
  opts: ['deducted from subscribed capital in the Note on Share Capital', 'shown under Other Current Liabilities', 'shown as a trade receivable under current assets', 'added to Reserves and Surplus'],
  sol: 'Calls in arrears are money called up but not received, so they reduce the paid-up figure: subscribed capital less calls unpaid, in the share-capital note.',
}));

Q('m_interest_arrears_rate', mcq({
  t: 3, d: 2, c: 'recall',
  stem: 'The articles of Kamod Pressure Cookers Ltd, an imagined company, are silent on interest on calls in arrears, so Table F of Schedule I to the Companies Act, 2013 applies. The highest rate at which it may charge interest on calls in arrears is',
  opts: ['10% per annum', '12% per annum', '6% per annum', '15% per annum'],
  sol: 'Table F allows interest from the day the call was due to the day it is paid at ten per cent per annum, or any lower rate the Board decides.',
}));

Q('fb_advance_rate', fb({
  t: 3, d: 2, c: 'recall',
  stem: 'When the articles of Bhimpalasi Steel Almirahs Ltd, an imagined company, follow Table F, the interest it may pay on calls in advance is at most ___ per cent per annum, unless its general meeting directs otherwise.',
  acc: [['12', 'twelve']],
  sol: 'Table F caps interest on calls in advance at 12 per cent per annum; on calls in arrears the cap is 10 per cent.',
}));

Q('m_cadv_nature', mcq({
  t: [3, 6], d: 2, c: 'understanding',
  stem: 'Money received by Charukesi Printing Inks Ltd, an imagined company, from a shareholder for a call that the directors have not yet made is credited to Calls in Advance A/c. Until the call is made, this balance is',
  opts: ['a liability, shown under Other Current Liabilities', 'part of the paid-up share capital', 'an income credited to the Statement of Profit and Loss', 'a deduction from called-up capital'],
  sol: 'The money is not yet share capital because the call has not been made; the company owes it to the shareholder until it is adjusted against the call.',
}));

Q('m_interest_advance_entry', mcq({
  t: 3, d: 3, c: 'understanding',
  stem: 'Bairagi Tarpaulins Ltd, an imagined company, owes its shareholders interest of ₹600 on money they paid as calls in advance. The entry when this interest becomes due is',
  opts: ['Interest on Calls in Advance A/c Dr. To Sundry Shareholders A/c ₹600', 'Sundry Shareholders A/c Dr. To Interest on Calls in Advance A/c ₹600', 'Calls in Advance A/c Dr. To Interest on Calls in Advance A/c ₹600', 'Interest on Calls in Advance A/c Dr. To Calls in Advance A/c ₹600'],
  sol: 'Interest on calls in advance is an expense of the company owed to the shareholders; it is later paid through the bank and closed to the Statement of Profit and Loss.',
}));

const CTC = { shares: 1500, call: 4, months: 3, rate: 10 };
const CTCi = interest(CTC.shares * CTC.call, CTC.rate, CTC.months);
eq(CTCi, 150, 'n_interest_arrears');
Q('n_interest_arrears', num({
  t: 3, d: 3, c: 'application', value: CTCi, unit: '₹',
  stem: `Chhayanat Tin Containers Ltd, an imagined company, made its first and final call of ₹${CTC.call} per share, due on 1 July 2026. Sanober, who holds ${inr(CTC.shares)} shares, paid the call only on 1 October 2026. The articles adopt Table F and the Board charges the full rate allowed. How much interest does Sanober pay (in ₹)?`,
  sol: `Arrears ${inr(CTC.shares)} × ₹${CTC.call} = ${rs(CTC.shares * CTC.call)}; interest at ${CTC.rate}% for ${CTC.months} months = ${inr(CTC.shares * CTC.call)} × ${CTC.rate}/100 × ${CTC.months}/12 = ${rs(CTCi)}.`,
}));

const GCU = { shares: 2000, call: 5, months: 6, rate: 9 };
const GCUi = interest(GCU.shares * GCU.call, GCU.rate, GCU.months);
eq(GCUi, 450, 'n_interest_advance');
Q('n_interest_advance', num({
  t: 3, d: 3, c: 'application', value: GCUi, unit: '₹',
  stem: `Gunkali Copper Utensils Ltd, an imagined company, allotted its shares on 1 May 2026. With his allotment money, Prakhar, who holds ${inr(GCU.shares)} shares, also paid the first and final call of ₹${GCU.call} per share, which the directors made only on 1 November 2026. Its articles provide interest on calls in advance at ${GCU.rate}% per annum. How much interest is payable to Prakhar (in ₹)?`,
  sol: `Advance ${inr(GCU.shares)} × ₹${GCU.call} = ${rs(GCU.shares * GCU.call)}, held from 1 May to 1 November (${GCU.months} months); interest = ${inr(GCU.shares * GCU.call)} × ${GCU.rate}/100 × ${GCU.months}/12 = ${rs(GCUi)}.`,
}));

Q('ar_advance', ar({
  t: [3, 6], d: 3, c: 'analysis', key: 'd',
  a: 'Calls in advance received by Ramkali Glass Wool Ltd, an imagined company, are added to its paid-up share capital in the Note on Share Capital.',
  r: 'Calls in advance are money received for calls not yet made, so the company owes them to the shareholders until the calls are made.',
  sol: 'A is false: until the call is made the money is not share capital; it is shown under Other Current Liabilities. R is true and gives the reason.',
}));

Q('tf_interest_arrears', tf({
  t: 3, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? The interest that Vibhas Pipe Fittings Ltd, an imagined company, collects from shareholders who paid their calls late is an income transferred to its Statement of Profit and Loss.',
  sol: 'Interest on calls in arrears is charged to the defaulting shareholders and is an income of the company; Interest on Calls in Arrears A/c is closed to the Statement of Profit and Loss.',
}));

const KSS = { shares: 2400, call: 3, months: 3, rate: 8 };
const KSSa = KSS.shares * KSS.call;
const KSSi = interest(KSSa, KSS.rate, KSS.months);
eq([KSSa, KSSi], [7200, 144], 's2_interest_entries');
Q('s2_interest_entries', short({
  t: 3, d: 3, c: 'application', marks: 2,
  stem: `Kafi Silk Sarees Ltd, an imagined company, made a call of ₹${KSS.call} per share due on 1 June 2026. Yuvika, holding ${inr(KSS.shares)} shares, did not pay it on time, and the unpaid amount was debited to the Calls in Arrears Account. She paid the call with interest on 1 September 2026; the articles fix interest on calls in arrears at ${KSS.rate}% per annum. Calculate the interest and pass the journal entries for it and for the money received from Yuvika.`,
  model: `Interest = ${inr(KSSa)} × ${KSS.rate}/100 × ${KSS.months}/12 = ${rs(KSSi)} (1 June to 1 September).\n\n${journal([
    { dr: [['Sundry Shareholders A/c', KSSi]], cr: [[INT.arrears, KSSi]], nar: `interest at ${KSS.rate}% per annum for ${KSS.months} months charged on calls in arrears` },
    { dr: [[ACC.bank, KSSa + KSSi]], cr: [[ACC.cia, KSSa], ['Sundry Shareholders A/c', KSSi]], nar: 'arrears and interest received from Yuvika' },
  ]).md}`,
  sol: 'Interest runs from the due date to the date of payment at the rate in the articles; it is charged to the shareholder and received with the arrears.',
  scheme: [['Interest calculated and charged', 1], ['Arrears and interest received', 1]],
}));

Q('s2_arrears_vs_advance', short({
  t: 3, d: 2, c: 'understanding', marks: 2,
  stem: 'Pilu Leather Wallets Ltd, an imagined company, has both a Calls in Arrears Account and a Calls in Advance Account in its books. Give two points of difference between calls in arrears and calls in advance.',
  model: '| Basis | Calls in arrears | Calls in advance |\n|---|---|---|\n| Meaning and nature | Amount called up but not yet received from shareholders; a debit balance | Amount received for calls not yet made; a credit balance owed to shareholders |\n| Interest (Table F) and disclosure | Shareholders pay the company interest at up to 10% p.a.; deducted from subscribed capital in the Note on Share Capital | The company may pay interest at up to 12% p.a.; shown under Other Current Liabilities |',
  sol: 'Compare what each balance means, who pays interest to whom, and where it appears in the balance sheet.',
  scheme: [['Meaning and nature of the balance', 1], ['Interest rates and disclosure', 1]],
}));

const JTP = new Books();
const JTPi = issue(JTP, {
  fv: 10, n: 20000, inst: inst(['Application', 3], ['Allotment', 4], ['First and Final Call', 3]),
  defaults: [{ who: 'Beena', shares: 600, from: 2 }], advance: [{ who: 'Aniket', shares: 1000, at: 1, calls: [2] }],
  arrearsAccount: true, dates: { app: '15 April 2026', allot: '1 May 2026', calls: ['1 August 2026'] },
});
const JTPint = payAdvanceInterest(JTP, { amount: 1000 * 3, months: 3, date: '1 August 2026' });
eq([JTPint.int, JTP.bal(ACC.cia), JTP.bal(ACC.adv), JTP.bal(ACC.bank)], [90, 1800, 0, 198110], 's3_arrears_advance');
Q('s3_arrears_advance', short({
  t: 3, d: 3, c: 'application', marks: 3,
  stem: `Jaijaivanti Tea Packers Ltd, an imagined company, allotted ${inr(JTPi.allotted)} equity shares of ₹10 each on 1 May 2026, payable ₹3 on application (received in full), ₹4 on allotment and ₹3 on the first and final call made on 1 August 2026. Aniket, holding ${inr(1000)} shares, paid the call money along with his allotment money. Beena, holding ${inr(600)} shares, did not pay the call. All other money was received. The company keeps Calls in Arrears and Calls in Advance accounts and, as its articles provide, pays interest on calls in advance at 12% per annum. Pass the journal entries from allotment onwards, including the interest on calls in advance.`,
  model: `Interest on calls in advance = ${inr(3000)} × 12/100 × 3/12 = ${rs(JTPint.int)} (1 May to 1 August).\n\n${JTP.journal(2).md}`,
  sol: 'The advance is credited to Calls in Advance on receipt and adjusted when the call falls due; the unpaid call is debited to Calls in Arrears.',
  scheme: [['Allotment due and received, with the advance credited', 1], ['Call due; receipt with the advance adjusted and arrears debited', 1], ['Interest on calls in advance calculated, charged and paid', 1]],
}));

const HBB = new Books();
const HBBi = issue(HBB, {
  fv: 10, n: 40000, inst: inst(['Application', 3], ['Allotment', 3], ['First and Final Call', 4]),
  defaults: [{ who: 'Ankur', shares: 900, from: 2 }], advance: [{ who: 'Himani', shares: 1200, at: 1, calls: [2] }],
  arrearsAccount: true, dates: { app: '10 May 2026', allot: '1 June 2026', calls: ['1 October 2026'] },
});
const HBBcall = HBB.entries.length - 2;
const HBBadv = payAdvanceInterest(HBB, { amount: 1200 * 4, months: 4, date: '1 October 2026' });
const HBBarr = receiveArrears(HBB, HBBi, 'Ankur', { date: '1 February 2027', months: 4 });
HBB.post({ date: '31 March 2027', dr: [[INT.arrears, HBBarr.int]], cr: [[PL, HBBarr.int]], nar: 'interest on calls in arrears transferred to the Statement of Profit and Loss' });
HBB.post({ date: '31 March 2027', dr: [[PL, HBBadv.int]], cr: [[INT.advance, HBBadv.int]], nar: 'interest on calls in advance transferred to the Statement of Profit and Loss' });
eq([HBBadv.int, HBBarr.int, HBB.bal(INT.arrears), HBB.bal(INT.advance), HBB.bal(ACC.cia), HBB.bal(ACC.adv)], [192, 120, 0, 0, 0, 0], 'l5_interest');
Q('l5_interest', long({
  t: 3, d: 4, c: 'application', marks: 5,
  stem: `Hamsanandi Bamboo Blinds Ltd, an imagined company, allotted ${inr(HBBi.allotted)} equity shares of ₹10 each on 1 June 2026, payable ₹3 on application, ₹3 on allotment and ₹4 on the first and final call, which was made on 1 October 2026. Himani, holding ${inr(1200)} shares, paid the call money with her allotment money on 1 June 2026. Ankur, holding ${inr(900)} shares, paid the call only on 1 February 2027. All other money was received when due. The articles are silent on interest, so Table F applies and the full rates are used. The company keeps Calls in Arrears and Calls in Advance accounts and closes its books on 31 March 2027.\n\n(a) Calculate the interest on calls in advance and on calls in arrears. [2]\n\n(b) Pass the journal entries for the call, the interest on calls in advance, the money received from Ankur and the closing transfers of both interest accounts. [3]`,
  model: `**(a)** Calls in advance: ${inr(1200)} × ₹4 = ${rs(4800)} held for 4 months (1 June to 1 October) at 12%: ${inr(4800)} × 12/100 × 4/12 = ${rs(HBBadv.int)}.\nCalls in arrears: ${inr(900)} × ₹4 = ${rs(3600)} overdue for 4 months (1 October to 1 February) at 10%: ${inr(3600)} × 10/100 × 4/12 = ${rs(HBBarr.int)}.\n\n**(b)**\n\n${HBB.journal(HBBcall).md}`,
  sol: 'Each interest runs only for its own period (advance until the call date; arrears from the call date to payment) at the Table F ceiling; both accounts close to the Statement of Profit and Loss.',
  scheme: [['(a) Interest on calls in advance', 1], ['(a) Interest on calls in arrears', 1], ['(b) Call due and received with advance adjusted and arrears debited', 1], ['(b) Interest on advance charged and paid; arrears received with interest', 1], ['(b) Both interest accounts closed to the Statement of Profit and Loss', 1]],
}));

// ================================================================ t04 Over- and under-subscription; pro-rata allotment
Q('m_min_sub', mcq({
  t: 4, d: 2, c: 'recall',
  stem: 'Jogiya Ceramic Insulators Ltd, an imagined company, makes a public issue of 1,00,000 equity shares. It may proceed to allot shares only if applications are received for at least',
  opts: ['90,000 shares, the minimum subscription of 90% of the issue', '50,000 shares, half of the issue', '75,000 shares, three-quarters of the issue', '1,00,000 shares, the whole issue'],
  sol: 'Allotment is allowed only after the minimum subscription stated in the prospectus is received, which for a public issue is 90% of the issue; otherwise all application money is refunded.',
}));

const BHP = new Books();
const BHPi = issue(BHP, { fv: 10, n: 50000, inst: inst(['Application', 3], ['Allotment', 4], ['First and Final Call', 3]), applied: 47000, made: 1 });
eq([BHPi.allotted, -BHP.bal(E)], [47000, 141000], 'm_undersub_entry');
Q('m_undersub_entry', mcq({
  t: 4, d: 2, c: 'application',
  stem: `Behag Hand Pumps Ltd, an imagined company, offers ${inr(50000)} equity shares of ₹10 each, payable ₹3 on application. It receives applications for ${inr(47000)} shares and allots all of them. The entry transferring the application money is`,
  opts: [`Equity Share Application A/c Dr. To Equity Share Capital A/c ${rs(141000)}`, `Equity Share Application A/c Dr. To Equity Share Capital A/c ${rs(150000)}`, `Bank A/c Dr. To Equity Share Application A/c ${rs(141000)}`, `Equity Share Application A/c Dr. ${rs(141000)} To Equity Share Capital A/c ${rs(132000)} and To Bank A/c ${rs(9000)}`],
  sol: `The issue is under-subscribed but above the 90% minimum, so all ${inr(47000)} applicants are allotted and their ₹3 per share becomes capital; nothing is refunded.`,
}));

const GLB = { offered: 50000, applied: 75000, holder: 1500 };
const GLBa = (GLB.holder * GLB.offered) / GLB.applied;
eq(GLBa, 1000, 'm_prorata_ratio');
Q('m_prorata_ratio', mcq({
  t: 4, d: 2, c: 'application',
  stem: `Gara Leather Belts Ltd, an imagined company, receives applications for ${inr(GLB.applied)} shares against ${inr(GLB.offered)} offered and allots on a pro-rata basis to every applicant. Shaheen applied for ${inr(GLB.holder)} shares. She is allotted`,
  opts: [`${inr(GLBa)} shares`, `${inr(GLB.holder)} shares`, `${inr(750)} shares`, `${inr(1250)} shares`],
  sol: `The pro-rata ratio is ${inr(GLB.applied)} : ${inr(GLB.offered)}, that is 3 : 2, so ${inr(GLB.holder)} × 2/3 = ${inr(GLBa)} shares.`,
}));

const NHS = { appR: 4, allotR: 5, applied: 100000, allotted: 80000, holder: 2000 };
const NHSap = (NHS.holder * NHS.applied) / NHS.allotted;
const NHSex = (NHSap - NHS.holder) * NHS.appR;
const NHSpay = NHS.holder * NHS.allotR - NHSex;
eq([NHSap, NHSex, NHSpay], [2500, 2000, 8000], 'n_prorata_allot');
Q('n_prorata_allot', num({
  t: 4, d: 3, c: 'application', value: NHSpay, unit: '₹',
  stem: `Neelambari Hosiery Ltd, an imagined company, issues ${inr(NHS.allotted)} equity shares of ₹10 each at ₹12, payable ₹${NHS.appR} on application, ₹${NHS.allotR} on allotment (including the premium of ₹2) and ₹3 on the first and final call. It receives applications for ${inr(120000)} shares, rejects those for ${inr(20000)} shares and allots the shares pro rata to the remaining applicants, adjusting excess application money towards allotment. Gautami is allotted ${inr(NHS.holder)} shares. How much does she pay on allotment (in ₹)?`,
  sol: `She applied for ${inr(NHS.holder)} × ${inr(NHS.applied)}/${inr(NHS.allotted)} = ${inr(NHSap)} shares; excess application money ${inr(NHSap - NHS.holder)} × ₹${NHS.appR} = ${inr(NHSex)}; allotment due ${inr(NHS.holder * NHS.allotR)}; she pays ${inr(NHS.holder * NHS.allotR)} − ${inr(NHSex)} = ${rs(NHSpay)}.`,
}));

const BCT = new Books();
const BCTi = issue(BCT, { fv: 10, n: 40000, inst: inst(['Application', 2], ['Allotment', 3], ['First and Final Call', 5]), groups: [{ applied: 40000, allotted: 0 }, { applied: 60000, allotted: 40000 }], made: 2 });
eq([BCTi.refT, BCTi.adjT], [80000, 40000], 'm_refund');
Q('m_refund', mcq({
  t: 4, d: 3, c: 'application',
  stem: `Begada Ceiling Tiles Ltd, an imagined company, offers ${inr(40000)} equity shares of ₹10 each, payable ₹2 on application and ₹3 on allotment. Applications arrive for ${inr(100000)} shares. Those for ${inr(40000)} shares are rejected; the other applicants, for ${inr(60000)} shares, are allotted all ${inr(40000)} shares pro rata, with excess money kept for allotment. How much application money is refunded?`,
  opts: [rs(BCTi.refT), rs(BCTi.refT + BCTi.adjT), rs(BCTi.adjT), 'Nil'],
  sol: `Only rejected applications are refunded (${inr(40000)} × ₹2); the pro-rata allottees' excess of ${inr(BCTi.adjT)} is within their allotment money of ${inr(40000 * 3)} and is adjusted, not refunded.`,
}));

Q('ar_oversub', ar({
  t: 4, d: 2, c: 'understanding', key: 'a',
  a: 'When Saveri Rubber Hoses Ltd, an imagined company, allots shares pro rata on an over-subscribed issue, the excess application money of the allottees is first adjusted towards the amount due on allotment.',
  r: 'Excess application money belongs to the allottees, so it is applied to what they owe the company next, and only a surplus is refunded or, if the articles allow, kept as calls in advance.',
  sol: 'Both are true, and R explains why the excess is set against allotment money instead of being refunded.',
}));

Q('tf_prorata_refund', tf({
  t: 4, d: 3, c: 'understanding', ans: false,
  stem: 'True or false? When Bilahari Brake Linings Ltd, an imagined company, allots shares pro rata, the whole of the excess application money of the pro-rata allottees must be refunded to them.',
  sol: 'The excess is first adjusted towards the allotment money (capital and premium) due from the same allottees; only what remains after that is refunded or kept as calls in advance.',
}));

Q('s2_oversub_options', short({
  t: 4, d: 2, c: 'understanding', marks: 2,
  stem: 'The public issue of Kapi Coir Mattresses Ltd, an imagined company, is over-subscribed. State the ways in which its directors may deal with the excess applications, and what happens to the application money in each case.',
  model: '1. **Reject some applications in full** and allot to the rest in full: the money on rejected applications is refunded.\n2. **Allot pro rata** to all or some applicants: their excess application money is adjusted towards the money due on allotment (and, if the articles allow, later calls); any surplus is refunded.\n3. **A combination:** reject some applications, allot some in full and allot the rest pro rata, with refunds and adjustments as above.',
  sol: 'Three routes: reject, pro rata, or both; say what happens to the money each time.',
  scheme: [['Rejection with refund, and full allotment', 1], ['Pro-rata allotment with excess adjusted (and combination)', 1]],
}));

const ASS = new Books();
const ASSi = issue(ASS, { fv: 10, n: 60000, inst: inst(['Application', 3], ['Allotment', 3, 2], ['First and Final Call', 4]), groups: [{ applied: 10000, allotted: 0 }, { applied: 80000, allotted: 60000 }], made: 2 });
eq([ASSi.applied, ASSi.refT, ASSi.adjT, ASS.bal(ACC.bank)], [90000, 30000, 60000, 480000], 's3_prorata_entries');
Q('s3_prorata_entries', short({
  t: 4, d: 3, c: 'application', marks: 3,
  stem: `Arabhi Sports Shoes Ltd, an imagined company, invites applications for ${inr(60000)} equity shares of ₹10 each at a premium of ₹2, payable ₹3 on application, ₹5 on allotment (including the premium) and ₹4 on the first and final call. Applications are received for ${inr(90000)} shares. Those for ${inr(10000)} shares are rejected and the rest are allotted ${inr(60000)} shares pro rata, the excess application money being adjusted towards allotment. All money due on allotment is received. Pass the journal entries for application and allotment.`,
  model: `Working: pro-rata applicants paid ${inr(80000)} × ₹3 = ${inr(240000)} for ${inr(60000)} shares needing ${inr(180000)}; excess ${rs(ASSi.adjT)} is adjusted towards allotment (due ${inr(300000)}), so ${rs(300000 - ASSi.adjT)} is received on allotment. Rejected: ${inr(10000)} × ₹3 = ${rs(ASSi.refT)} refunded.\n\n${ASS.journal().md}`,
  sol: 'Split the application money three ways: capital on allotted shares, adjusted towards allotment, refunded on rejected applications.',
  scheme: [['Application money received', 1], ['Transfer: capital, adjustment towards allotment and refund', 1], ['Allotment due (with premium) and the net amount received', 1]],
}));

const NCY = new Books();
const NCYi = issue(NCY, { fv: 10, n: 80000, inst: inst(['Application', 3], ['Allotment', 3, 1], ['First and Final Call', 4]), applied: 74000, made: 2 });
eq([NCYi.allotted, 0.9 * 80000, -NCY.bal(E), -NCY.bal(ACC.sp)], [74000, 72000, 444000, 74000], 's3_undersub');
Q('s3_undersub', short({
  t: 4, d: 3, c: 'application', marks: 3,
  stem: `Nayaki Cotton Yarn Ltd, an imagined company, offers ${inr(80000)} equity shares of ₹10 each to the public at ₹11, payable ₹3 on application, ₹4 on allotment (including the premium of ₹1) and ₹4 on the first and final call. Applications are received for ${inr(74000)} shares. (a) Explain whether the company can proceed to allotment. (b) If it can, pass the journal entries for application and allotment, assuming all allotment money is received.`,
  model: `**(a)** Minimum subscription is 90% of ${inr(80000)} = ${inr(72000)} shares. Applications for ${inr(74000)} shares exceed it, so the company may allot all ${inr(74000)} shares; the issue is under-subscribed but valid.\n\n**(b)**\n\n${NCY.journal().md}`,
  sol: 'Test the 90% rule first; then record the issue on the number of shares actually applied for.',
  scheme: [['(a) Minimum subscription tested', 1], ['(b) Application entries on the shares applied for', 1], ['(b) Allotment entries with premium', 1]],
}));

const VKP = new Books();
const VKPi = issue(VKP, { fv: 10, n: 100000, inst: inst(['Application', 3], ['Allotment', 3, 3], ['First and Final Call', 4]), groups: [{ applied: 20000, allotted: 0 }, { applied: 30000, allotted: 30000 }, { applied: 110000, allotted: 70000 }] });
const VKPcb = cashBookSplit(VKP.entries, { nars: { 1: `application money on ${inr(100000)} shares transferred to share capital and the excess adjusted towards allotment; the refund is entered in the cash book` } });
eq([VKPi.refT, VKPi.adjT, VKPcb.receipts, VKPcb.payments, VKPcb.balance], [60000, 120000, 1360000, 60000, 1300000], 'l5_prorata_full');
Q('l5_prorata_full', long({
  t: [4, 1], d: 4, c: 'application', marks: 5,
  stem: `Varali Kraft Paper Ltd, an imagined company that keeps a cash book, offers ${inr(100000)} equity shares of ₹10 each at ₹13, payable ₹3 on application, ₹6 on allotment (including the premium of ₹3) and ₹4 on the first and final call. Applications are received for ${inr(VKPi.applied)} shares and dealt with as follows: applicants for ${inr(20000)} shares are refused; applicants for ${inr(30000)} shares are allotted in full; applicants for ${inr(110000)} shares are allotted ${inr(70000)} shares pro rata, their excess application money being adjusted towards allotment. All money due is received.\n\n(a) Pass the entries in the journal proper. [3]\n\n(b) Prepare the cash book (bank column only). [2]`,
  model: `Working: the pro-rata group paid ${inr(110000)} × ₹3 = ${inr(330000)} for ${inr(70000)} shares needing ${inr(210000)}; excess ${rs(VKPi.adjT)} is adjusted towards their allotment money of ${inr(70000 * 6)}. Refused: ${inr(20000)} × ₹3 = ${rs(VKPi.refT)} refunded.\n\n**(a) Journal proper**\n\n${VKPcb.jp.md}\n\n**(b) Cash Book (bank column only)**\n\n${VKPcb.cb.md}`,
  sol: 'Treat each category separately; only cash movements go to the cash book, the transfer and amounts due go to the journal proper.',
  scheme: [['(a) Transfer of application money with adjustment towards allotment', 1], ['(a) Allotment due with premium', 1], ['(a) Call due', 1], ['(b) Receipts net of the adjustment', 1], ['(b) Refund and balance c/d', 1]],
}));

// ================================================================ t05 Forfeiture and reissue
const KWC = new Books();
const KWCi = issue(KWC, { fv: 10, n: 10000, inst: inst(['Application', 3], ['Allotment', 3], ['First and Final Call', 4]), defaults: [{ who: 'Sudeshna', shares: 500, from: 2 }], arrearsAccount: true });
const KWCf = forfeit(KWC, KWCi, ['Sudeshna']);
eq([KWCf.sc, KWCf.sf], [5000, 3000], 'm_forfeit_par');
Q('m_forfeit_par', mcq({
  t: 5, d: 2, c: 'application',
  stem: `Keeravani Wall Clocks Ltd, an imagined company, forfeits ${inr(500)} equity shares of ₹10 each, issued at par, on which Sudeshna paid ₹3 on application and ₹3 on allotment but failed to pay the first and final call of ₹4. The amount credited to the Share Forfeiture Account is`,
  opts: [rs(KWCf.sf), rs(KWCf.sc), rs(500 * 4), rs(500 * 3)],
  sol: `Share capital is debited with ${inr(KWCf.sc)} called up, Calls in Arrears credited with the unpaid ${inr(500 * 4)}, and the money received, ${inr(500)} × ₹6, is forfeited.`,
}));

const APL = new Books();
const APLi = issue(APL, { fv: 10, n: 20000, inst: inst(['Application', 3], ['Allotment', 3, 4], ['First and Final Call', 4]), defaults: [{ who: 'Jagriti', shares: 300, from: 1 }], arrearsAccount: true });
const APLf = forfeit(APL, APLi, ['Jagriti']);
eq([APLf.sc, APLf.sp, APLf.sf], [3000, 1200, 900], 'm_forfeit_prem_not_received');
Q('m_forfeit_prem_not_received', mcq({
  t: 5, d: 3, c: 'application',
  stem: `Amritavarshini Paints Ltd, an imagined company, issued equity shares of ₹10 each at ₹14, payable ₹3 on application, ₹7 on allotment (including the premium of ₹4) and ₹4 on the first and final call. Jagriti, holding ${inr(300)} shares, paid only the application money, and her shares are forfeited after the call. In the forfeiture entry the company debits`,
  opts: [`Equity Share Capital A/c ${rs(APLf.sc)} and Securities Premium A/c ${rs(APLf.sp)}`, `Equity Share Capital A/c ${rs(APLf.sc + APLf.sp)} only`, `Equity Share Capital A/c ${rs(APLf.sc)} only`, `Equity Share Capital A/c ${rs(APLf.sf)} and Securities Premium A/c ${rs(APLf.sp)}`],
  sol: `The premium due with allotment was never received, so it is cancelled by debiting Securities Premium; share capital is debited with the full ${inr(APLf.sc)} called up and ${rs(APLf.sf)} is forfeited.`,
}));

Q('m_forfeit_prem_received', mcq({
  t: 5, d: 3, c: 'understanding',
  stem: 'Mohanam Gas Stoves Ltd, an imagined company, forfeits shares issued at a premium after the holder had paid the allotment money, which included the premium, but not the final call. In the forfeiture entry the Securities Premium Account is',
  opts: ['not debited, because the premium has already been received', 'debited with the premium on the forfeited shares', 'credited with the premium on the forfeited shares', 'transferred to the Share Forfeiture Account'],
  sol: 'Premium actually received stays in the Securities Premium Account; it is debited on forfeiture only when the premium was not received.',
}));

Q('m_max_discount', mcq({
  t: 5, d: 3, c: 'application',
  stem: 'Kambhoji Steel Doors Ltd, an imagined company, forfeited 400 equity shares of ₹10 each, issued at par and called up to ₹8, on which the holder had paid ₹5 per share. It now reissues them as fully paid. The lowest price per share at which it may reissue them is',
  opts: ['₹5', '₹8', '₹2', '₹3'],
  sol: 'The discount on reissue cannot exceed the amount forfeited per share, ₹5; the shares are reissued as ₹10 paid up, so the price must be at least ₹10 − ₹5.',
}));

const SST = new Books();
const SSTi = issue(SST, { fv: 10, n: 30000, inst: inst(['Application', 3], ['Allotment', 4], ['First and Final Call', 3]), defaults: [{ who: 'holder', shares: 600, from: 2 }], arrearsAccount: true });
const SSTf = forfeit(SST, SSTi, ['holder']);
const SSTr = reissue(SST, { cap: E, shares: 600, price: 8, credited: 10, forfeitedOn: SSTf.sf });
eq([SSTf.sf, SSTr.disc, SSTr.toCR], [4200, 1200, 3000], 'm_capital_reserve_all');
Q('m_capital_reserve_all', mcq({
  t: 5, d: 3, c: 'application',
  stem: `Shanmukha Stainless Taps Ltd, an imagined company, forfeited ${inr(600)} equity shares of ₹10 each, fully called up, for non-payment of the first and final call of ₹3 per share. It later reissued all ${inr(600)} shares at ₹8 per share as fully paid. The amount transferred to Capital Reserve is`,
  opts: [rs(SSTr.toCR), rs(SSTf.sf), rs(SSTr.disc), rs(600 * 3)],
  sol: `Forfeited ${inr(600)} × ₹7 = ${inr(SSTf.sf)}; discount allowed ${inr(600)} × ₹2 = ${inr(SSTr.disc)}; the remaining ${rs(SSTr.toCR)} on the reissued shares is a capital profit.`,
}));

const VCI = new Books();
const VCIi = issue(VCI, { fv: 10, n: 20000, inst: inst(['Application', 3], ['Allotment', 3, 2], ['First and Final Call', 4]), defaults: [{ who: 'holder', shares: 900, from: 2 }], arrearsAccount: true });
const VCIf = forfeit(VCI, VCIi, ['holder']);
const VCIon = (VCIf.sf * 600) / 900;
const VCIr = reissue(VCI, { cap: E, shares: 600, price: 8, credited: 10, forfeitedOn: VCIon });
eq([VCIf.sf, VCIon, VCIr.disc, VCIr.toCR, VCIr.sfLeft], [5400, 3600, 1200, 2400, 1800], 'n_capital_reserve_part');
Q('n_capital_reserve_part', num({
  t: 5, d: 4, c: 'analysis', value: VCIr.toCR, unit: '₹',
  stem: `Vasanta Cast Iron Ltd, an imagined company, issued equity shares of ₹10 each at ₹12, payable ₹3 on application, ₹5 on allotment (including the premium of ₹2) and ₹4 on the first and final call. It forfeited ${inr(900)} shares whose holder had paid application and allotment money but not the call. It then reissued ${inr(600)} of these shares at ₹8 per share as fully paid. What amount is transferred to Capital Reserve (in ₹)?`,
  sol: `Forfeited per share = ₹3 + ₹3 (premium received is not forfeited) = ₹6; on ${inr(600)} reissued shares ${inr(600)} × 6 = ${inr(VCIon)}; discount ${inr(600)} × 2 = ${inr(VCIr.disc)}; capital reserve = ${inr(VCIon)} − ${inr(VCIr.disc)} = ${rs(VCIr.toCR)}.`,
}));

const PMN = new Books();
const PMNi = issue(PMN, { fv: 10, n: 100000, inst: inst(['Application', 2], ['Allotment', 3], ['First and Final Call', 5]), groups: [{ applied: 150000, allotted: 100000 }], defaults: [{ who: 'Leher', shares: 400, from: 1 }], arrearsAccount: true });
const PMNf = forfeit(PMN, PMNi, ['Leher']);
eq([PMNf.per.Leher.applied, PMNf.per.Leher.adj, PMNf.sf], [600, 400, 1200], 'n_forfeit_amount');
Q('n_forfeit_amount', num({
  t: [5, 4], d: 4, c: 'analysis', value: PMNf.sf, unit: '₹',
  stem: `Paraj Mosquito Nets Ltd, an imagined company, issued ${inr(100000)} equity shares of ₹10 each at par, payable ₹2 on application, ₹3 on allotment and ₹5 on the first and final call. Applications were received for ${inr(150000)} shares and every applicant was allotted shares pro rata, the excess application money being adjusted towards allotment. Leher, who was allotted ${inr(400)} shares, failed to pay the allotment and the call, and her shares were forfeited. What amount is credited to the Share Forfeiture Account (in ₹)?`,
  sol: `Leher applied for ${inr(400)} × 3/2 = ${inr(600)} shares and paid ${inr(600)} × ₹2 = ${inr(1200)}; of this ${inr(800)} went to capital on application and ${inr(PMNf.per.Leher.adj)} was adjusted towards allotment. All of it is money received, so ${rs(PMNf.sf)} is forfeited.`,
}));

Q('ar_reissue', ar({
  t: 5, d: 3, c: 'understanding', key: 'c',
  a: 'Dhanyasi Cycle Chains Ltd, an imagined company, may reissue its forfeited shares as fully paid at a price below their face value.',
  r: 'The discount allowed on reissue of forfeited shares may exceed the amount forfeited on those shares if the articles permit it.',
  sol: 'A is true: forfeited shares may be reissued at a discount. R is false: the discount may never exceed the amount forfeited on the shares reissued.',
}));

Q('tf_cr_unreissued', tf({
  t: 5, d: 3, c: 'understanding', ans: false,
  stem: 'True or false? When Ranjani Pressure Pumps Ltd, an imagined company, reissues only half of its forfeited shares, the whole balance of its Share Forfeiture Account is transferred to Capital Reserve.',
  sol: 'Only the gain on the shares actually reissued becomes capital reserve; the amount forfeited on shares not yet reissued stays in the Share Forfeiture Account and is added to share capital in the balance sheet.',
}));

Q('fb_capital_reserve', fb({
  t: 5, d: 1, c: 'recall',
  stem: 'After Mayamalava Cotton Mills Ltd, an imagined company, reissues forfeited shares, the amount forfeited on those shares less the discount allowed on reissue is transferred to the ___ Reserve Account.',
  acc: [['Capital']],
  sol: 'The gain is a capital profit, so it is transferred to the Capital Reserve Account, shown under Reserves and Surplus.',
}));

Q('match_forfeit', match({
  t: 5, d: 2, c: 'understanding', marks: 2,
  stem: 'Match each amount in the forfeiture and reissue of shares by Bihagda Cane Chairs Ltd, an imagined company, with how it is posted.',
  pairs: [
    ['Amount called up on the forfeited shares', 'Debited to Equity Share Capital A/c'],
    ['Premium due but never received on them', 'Debited to Securities Premium A/c'],
    ['Money already received on them, excluding premium', 'Credited to Share Forfeiture A/c'],
    ['Gain left on forfeited shares after their reissue', 'Credited to Capital Reserve A/c'],
  ],
  sol: 'Forfeiture cancels what was called up and any premium not received, and keeps what was paid; reissue moves the gain on those shares to capital reserve.',
}));

const APC = new Books();
const APCi = issue(APC, { fv: 10, n: 30000, inst: inst(['Application', 3], ['Allotment', 3], ['First Call', 2], ['Second and Final Call', 2]), defaults: [{ who: 'Anvesha', shares: 800, from: 3 }], arrearsAccount: true });
const APCstart = APC.entries.length;
const APCf = forfeit(APC, APCi, ['Anvesha']);
const APCr = reissue(APC, { cap: E, shares: 800, price: 9, credited: 10, forfeitedOn: APCf.sf });
eq([APCf.sf, APCr.disc, APCr.toCR], [6400, 800, 5600], 's2_forfeit_reissue');
Q('s2_forfeit_reissue', short({
  t: 5, d: 2, c: 'application', marks: 2,
  stem: `Adana Plastic Chairs Ltd, an imagined company, forfeited ${inr(800)} equity shares of ₹10 each, issued at par and fully called up, held by Anvesha, who had not paid the second and final call of ₹2 per share. The unpaid call stands in the Calls in Arrears Account. All ${inr(800)} shares were then reissued at ₹9 per share as fully paid. Pass the journal entries for the forfeiture and the reissue.`,
  model: APC.journal(APCstart).md,
  sol: 'Forfeit the money received (₹8 a share); allow the ₹1 discount out of it and move the rest to capital reserve.',
  scheme: [['Forfeiture entry', 1], ['Reissue at a discount and transfer to capital reserve', 1]],
}));

const MBL = new Books();
MBL.post({ dr: [[E, 5000]], cr: [[ACC.cia, 2000], [ACC.sf, 3000]], nar: '500 shares forfeited' });
const MBLstart = MBL.entries.length;
const MBLr = reissue(MBL, { cap: E, shares: 300, price: 12, credited: 10, forfeitedOn: 300 * 6 });
eq([MBLr.prem, MBLr.toCR, MBLr.sfLeft], [600, 1800, 1200], 's2_reissue_premium');
Q('s2_reissue_premium', short({
  t: 5, d: 3, c: 'application', marks: 2,
  stem: `The Share Forfeiture Account of Mand Brass Locks Ltd, an imagined company, shows ${rs(3000)}: the amount forfeited on ${inr(500)} equity shares of ₹10 each at ₹6 per share. The company reissues ${inr(300)} of these shares at ₹12 per share as fully paid. Pass the journal entries, and state the balance left in the Share Forfeiture Account.`,
  model: `${MBL.journal(MBLstart).md}\n\nBalance left in the Share Forfeiture Account: ${inr(200)} shares × ₹6 = ${rs(MBLr.sfLeft)}, added to share capital in the Note on Share Capital until those shares are reissued.`,
  sol: 'A reissue above face value creates fresh premium; the whole amount forfeited on the reissued shares is then a capital profit.',
  scheme: [['Reissue with premium credited', 1], ['Capital reserve transfer and balance left', 1]],
}));

const HRR = new Books();
const HRRi = issue(HRR, { fv: 10, n: 30000, inst: inst(['Application', 3], ['Allotment', 3, 5], ['First and Final Call', 4]), defaults: [{ who: 'Saloni', shares: 400, from: 1 }, { who: 'Daksh', shares: 600, from: 2 }], arrearsAccount: true });
const HRRstart = HRR.entries.length;
const HRRf = forfeit(HRR, HRRi, ['Saloni', 'Daksh'], { nar: `${inr(1000)} shares of Saloni and Daksh forfeited for non-payment of allotment and call money` });
const HRRsf = HRR.ledgerOf(ACC.sf);
eq([HRRf.sc, HRRf.sp, HRRf.sf, HRRf.per.Saloni.forfeited, HRRf.per.Daksh.forfeited], [10000, 2000, 4800, 1200, 3600], 's3_forfeit_prem');
Q('s3_forfeit_prem', short({
  t: 5, d: 3, c: 'application', marks: 3,
  stem: `Hindolam Rubber Rollers Ltd, an imagined company, issued ${inr(30000)} equity shares of ₹10 each at ₹15, payable ₹3 on application, ₹8 on allotment (including the premium of ₹5) and ₹4 on the first and final call. Saloni, holding ${inr(400)} shares, did not pay the allotment or the call; Daksh, holding ${inr(600)} shares, did not pay the call. The unpaid amounts are in the Calls in Arrears Account. All ${inr(1000)} shares are forfeited after the call. Pass the forfeiture entry and prepare the Share Forfeiture Account.`,
  model: `Working: Saloni: called up ${inr(4000)}, premium unpaid ${inr(HRRf.per.Saloni.premUnpaid)}, unpaid ${inr(HRRf.per.Saloni.unpaidAll)}, forfeited ${inr(HRRf.per.Saloni.forfeited)} (₹3 a share). Daksh: called up ${inr(6000)}, premium already received, unpaid ${inr(HRRf.per.Daksh.unpaidAll)}, forfeited ${inr(HRRf.per.Daksh.forfeited)} (₹6 a share).\n\n${HRR.journal(HRRstart).md}\n\n**Share Forfeiture Account**\n\n${HRRsf.md}`,
  sol: 'Debit Securities Premium only for the holder whose premium was never received; the premium Daksh paid stays where it is.',
  scheme: [["Saloni's shares: capital and unpaid premium debited", 1], ["Daksh's shares: capital debited, premium untouched", 1], ['Arrears credited and Share Forfeiture Account', 1]],
}));

const NFB = new Books();
NFB.post({ dr: [[E, 12000]], cr: [[ACC.cia, 4800], [ACC.sf, 7200]], nar: '1,200 shares forfeited' });
const NFBstart = NFB.entries.length;
const NFBon = (7200 * 700) / 1200;
const NFBr = reissue(NFB, { cap: E, shares: 700, price: 7, credited: 10, forfeitedOn: NFBon });
eq([NFBon, NFBr.disc, NFBr.toCR, NFBr.sfLeft], [4200, 2100, 2100, 3000], 's3_reissue_cr');
Q('s3_reissue_cr', short({
  t: [5, 6], d: 3, c: 'application', marks: 3,
  stem: `Nand Fire Bricks Ltd, an imagined company, has ${rs(7200)} in its Share Forfeiture Account, being ₹6 per share forfeited on ${inr(1200)} equity shares of ₹10 each. It reissues ${inr(700)} of these shares at ₹7 per share as fully paid. Pass the journal entries for the reissue and the transfer to capital reserve, and state how the balance left in the Share Forfeiture Account is shown in the balance sheet.`,
  model: `Forfeited on ${inr(700)} shares: ${inr(700)} × ₹6 = ${inr(NFBon)}; discount ${inr(700)} × ₹3 = ${inr(NFBr.disc)} (within ₹6 a share); capital reserve ${inr(NFBon)} − ${inr(NFBr.disc)} = ${rs(NFBr.toCR)}.\n\n${NFB.journal(NFBstart).md}\n\nThe ${rs(NFBr.sfLeft)} left (${inr(500)} shares × ₹6) is added to subscribed capital in the Note on Share Capital as forfeited shares.`,
  sol: 'Work per share: discount allowed against amount forfeited; only the reissued shares release a gain.',
  scheme: [['Reissue entry with discount', 1], ['Capital reserve on the reissued shares only', 1], ['Balance left shown as forfeited shares in the share-capital note', 1]],
}));

const SGC = new Books();
const SGCi = issue(SGC, { fv: 10, n: 50000, inst: inst(['Application', 2], ['Allotment', 3, 2], ['First Call', 3], ['Second and Final Call', 2]), defaults: [{ who: 'Harjeet', shares: 1000, from: 1 }], arrearsAccount: true, made: 3 });
const SGCstart = SGC.entries.length;
const SGCf = forfeit(SGC, SGCi, ['Harjeet']);
const SGCmid = SGC.entries.length;
const SGCr = reissue(SGC, { cap: E, shares: 600, price: 7, credited: 8, forfeitedOn: (SGCf.sf * 600) / 1000 });
eq([SGCf.sc, SGCf.sp, SGCf.sf, SGCr.disc, SGCr.toCR, SGCr.sfLeft], [8000, 2000, 2000, 600, 600, 800], 'l5_forfeit_reissue');
Q('l5_forfeit_reissue', long({
  t: 5, d: 4, c: 'application', marks: 5,
  stem: `Sughrai Ceramics Ltd, an imagined company, issued ${inr(50000)} equity shares of ₹10 each at ₹12, payable ₹2 on application, ₹5 on allotment (including the premium of ₹2), ₹3 on the first call and ₹2 on the second and final call. Harjeet, holding ${inr(1000)} shares, paid only the application money. After the first call, his shares were forfeited; the second call has not yet been made. The company keeps a Calls in Arrears Account.\n\n(a) Pass the journal entry for the forfeiture. [2]\n\n(b) ${inr(600)} of the forfeited shares are reissued at ₹7 per share as ₹8 paid up. Pass the entries for the reissue and the transfer to capital reserve. [2]\n\n(c) State the balance left in the Share Forfeiture Account and how it is shown. [1]`,
  model: `**(a)** Called up on ${inr(1000)} shares: ₹2 + ₹3 + ₹3 = ₹8 a share, ${inr(SGCf.sc)}; premium not received ${inr(SGCf.sp)}; unpaid (allotment ${inr(5000)} + first call ${inr(3000)}) ${inr(SGCf.per.Harjeet.unpaidAll)}; forfeited ${inr(SGCf.sf)}.\n\n${SGC.journal(SGCstart, SGCmid).md}\n\n**(b)** Forfeited on ${inr(600)} shares ${inr((SGCf.sf * 600) / 1000)}; discount ${inr(SGCr.disc)}; capital reserve ${rs(SGCr.toCR)}.\n\n${SGC.journal(SGCmid).md}\n\n**(c)** ${rs(SGCr.sfLeft)} on the ${inr(400)} shares not reissued stays in the Share Forfeiture Account and is added to subscribed capital in the Note on Share Capital.`,
  sol: 'Forfeit at the called-up amount (₹8), cancelling the unpaid premium; reissue as ₹8 paid up, never allowing more than ₹2 a share as discount.',
  scheme: [['(a) Capital and premium debited', 1], ['(a) Arrears and forfeiture credited', 1], ['(b) Reissue at a discount as ₹8 paid up', 1], ['(b) Capital reserve on the reissued shares', 1], ['(c) Balance and its disclosure', 1]],
}));

const SKA = new Books();
const SKAi = issue(SKA, { fv: 10, n: 40000, inst: inst(['Application', 3], ['Allotment', 4], ['First and Final Call', 3]), groups: [{ applied: 60000, allotted: 40000 }], defaults: [{ who: 'Bhargav', shares: 600, from: 1 }], arrearsAccount: true });
const SKAstart = SKA.entries.length;
const SKAf = forfeit(SKA, SKAi, ['Bhargav']);
const SKAb = SKAf.per.Bhargav;
const SKAon = (SKAf.sf * 400) / 600;
const SKAr = reissue(SKA, { cap: E, shares: 400, price: 8, credited: 10, forfeitedOn: SKAon });
eq([SKAb.applied, SKAb.adj, SKAi.unpaid(SKAb, 1), SKAf.sf, SKAr.toCR, SKAr.sfLeft], [900, 900, 1500, 2700, 1000, 900], 'l5_prorata_forfeit');
Q('l5_prorata_forfeit', long({
  t: [5, 4], d: 5, c: 'analysis', marks: 5,
  stem: `Shuddh Kalyan Air Coolers Ltd, an imagined company, issued ${inr(40000)} equity shares of ₹10 each at par, payable ₹3 on application, ₹4 on allotment and ₹3 on the first and final call. Applications were received for ${inr(60000)} shares and all applicants were allotted pro rata, the excess application money being adjusted towards allotment. Bhargav, who had applied for ${inr(900)} shares, failed to pay the allotment and the call, and his shares were forfeited. The company keeps a Calls in Arrears Account.\n\n(a) Calculate the shares allotted to Bhargav, the allotment money he failed to pay and the amount forfeited. [2]\n\n(b) Pass the journal entries for the forfeiture and for the reissue of ${inr(400)} of his shares at ₹8 per share as fully paid. [3]`,
  model: `**(a)** Pro-rata ratio ${inr(60000)} : ${inr(40000)} = 3 : 2, so Bhargav got ${inr(900)} × 2/3 = ${inr(SKAb.shares)} shares. He paid ${inr(900)} × ₹3 = ${inr(2700)}; ${inr(SKAb.shares * 3)} was needed on application and the excess ${inr(SKAb.adj)} was adjusted towards his allotment of ${inr(SKAb.shares * 4)}, leaving ${rs(SKAi.unpaid(SKAb, 1))} unpaid on allotment (call unpaid ${inr(SKAi.unpaid(SKAb, 2))}). Amount forfeited = money received = ${rs(SKAf.sf)}.\n\n**(b)** Forfeited on ${inr(400)} shares ${inr(SKAon)}; discount ${inr(SKAr.disc)}; capital reserve ${rs(SKAr.toCR)}; ${rs(SKAr.sfLeft)} stays for the other ${inr(200)} shares.\n\n${SKA.journal(SKAstart).md}`,
  sol: 'Work back from the pro-rata ratio to the shares applied for; the adjusted excess counts as money received, so it is forfeited too.',
  scheme: [['(a) Shares allotted and unpaid allotment', 1], ['(a) Amount forfeited', 1], ['(b) Forfeiture entry', 1], ['(b) Reissue at a discount', 1], ['(b) Capital reserve on the reissued shares', 1]],
}));

// ================================================================ t06 Disclosure in the balance sheet (Schedule III)
Q('m_forfeited_shown', mcq({
  t: 6, d: 2, c: 'understanding',
  stem: 'At the year end, the Share Forfeiture Account of Kaushi Rope Ladders Ltd, an imagined company, shows ₹4,500 on shares not yet reissued. In its Schedule III balance sheet this amount is',
  opts: ['added to subscribed capital in the Note on Share Capital as forfeited shares', 'shown under Reserves and Surplus as capital reserve', 'shown under Other Current Liabilities', 'deducted from subscribed capital as calls unpaid'],
  sol: 'Until the shares are reissued, the amount originally paid on them is part of the company\'s share capital and is added in the share-capital note.',
}));

Q('m_sp_shown', mcq({
  t: 6, d: 1, c: 'recall',
  stem: 'Hamsadhwani Cotton Buds Ltd, an imagined company, prepares its balance sheet under Schedule III of the Companies Act, 2013. Its securities premium is shown under',
  opts: ["Reserves and Surplus, within Shareholders' Funds", 'Share Capital, within Shareholders\' Funds', 'Other Current Liabilities', 'Other Income in the Statement of Profit and Loss'],
  sol: 'Securities premium and capital reserve are both reserves; the Reserves and Surplus note lists them under Shareholders\' Funds.',
}));

const KBM = { auth: 200000, issued: 150000, subs: 140000, called: 8, arrears: 6000 };
const KBMp = KBM.subs * KBM.called - KBM.arrears;
eq(KBMp, 1114000, 'm_categories');
Q('m_categories', mcq({
  t: 6, d: 3, c: 'application',
  stem: `Kalingada Bell Metal Ltd, an imagined company, has authorised capital of ${inr(KBM.auth)} equity shares of ₹10 each, of which ${inr(KBM.issued)} were issued and ${inr(KBM.subs)} subscribed. ₹${KBM.called} per share has been called up and calls in arrears amount to ${rs(KBM.arrears)}. Its paid-up capital is`,
  opts: [rs(KBMp), rs(KBM.subs * KBM.called), rs(KBM.subs * 10), rs(KBM.issued * KBM.called)],
  sol: `Paid-up capital = subscribed shares × amount called − calls unpaid: ${inr(KBM.subs)} × ₹${KBM.called} − ${inr(KBM.arrears)} = ${rs(KBMp)}.`,
}));

Q('tf_authorised', tf({
  t: 6, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? The authorised capital of Gurjari Toys Ltd, an imagined company, is stated in its Note on Share Capital but is not added in the share-capital total carried to the balance sheet.',
  sol: 'Authorised and issued capital are shown for information only; the figure carried to the balance sheet is the subscribed (paid-up) capital, after calls in arrears and plus forfeited shares.',
}));

Q('match_capital_categories', match({
  t: 6, d: 1, c: 'recall', marks: 2,
  stem: 'Match each category in the Note on Share Capital of Bhatiyar Paper Bags Ltd, an imagined company, with what it means.',
  pairs: [
    ['Authorised capital', 'The most share capital the company may raise, as stated in its memorandum'],
    ['Issued capital', 'The part of authorised capital offered for subscription or allotted'],
    ['Subscribed capital', 'The part of issued capital actually taken up by shareholders'],
    ['Paid-up capital', 'The part of called-up capital actually received'],
  ],
  sol: 'Each category is a slice of the one before: authorised, then issued, then subscribed, then called up, then paid up.',
}));

const DHT = { auth: 100000, issued: 80000, forfeited: 800, sfAmt: 2400, arrears: 3000, notPaidN: 1000 };
const DHTn = shareNote({ fv: 10, authorised: DHT.auth, issued: DHT.issued, rows: [{ label: 'Subscribed and fully paid up', n: DHT.issued - DHT.forfeited - DHT.notPaidN, called: 10 }, { label: 'Subscribed but not fully paid up', n: DHT.notPaidN, called: 10, arrears: DHT.arrears }], forfeited: DHT.sfAmt });
eq(DHTn.total, 791400, 's2_note');
Q('s2_note', short({
  t: 6, d: 2, c: 'application', marks: 2,
  stem: `Durga Hand Tools Ltd, an imagined company, has authorised capital of ${inr(DHT.auth)} equity shares of ₹10 each and has issued ${inr(DHT.issued)} shares, all fully called up. ${inr(DHT.forfeited)} shares were forfeited and have not been reissued; the Share Forfeiture Account shows ${rs(DHT.sfAmt)}. On ${inr(DHT.notPaidN)} shares the final call of ₹3, ${rs(DHT.arrears)} in all, is still unpaid. Prepare the Note on Share Capital.`,
  model: DHTn.md,
  sol: 'Show authorised and issued capital, then subscribed capital split into fully paid and not fully paid (less calls unpaid), and add forfeited shares.',
  scheme: [['Authorised, issued and subscribed capital', 1], ['Calls in arrears deducted and forfeited shares added', 1]],
}));

const SWM = new Books();
const SWMi = issue(SWM, { fv: 10, n: 60000, inst: inst(['Application', 3], ['Allotment', 3, 2], ['First Call', 2], ['Second and Final Call', 2]), made: 3, defaults: [{ who: 'Rahat', shares: 1000, from: 2 }], advance: [{ who: 'Yogini', shares: 1500, at: 2, calls: [3] }], arrearsAccount: true });
const SWMn = shareNote({ B: SWM, cap: E, fv: 10, authorised: 100000, issued: 60000, rows: [{ label: 'Subscribed but not fully paid up', n: 60000, called: 8, arrears: SWM.bal(ACC.cia) }], arrearsBooks: SWM.bal(ACC.cia), note: 1 });
const SWMr = simpleNote('Reserves and Surplus', [['Securities Premium', -SWM.bal(ACC.sp)]], 2);
const SWMo = simpleNote('Other Current Liabilities', [['Calls in advance', -SWM.bal(ACC.adv)]], 3);
const SWMbs = bsIII({ title: 'Balance Sheet of Shadja Water Meters Ltd (extract)', eq: [["Shareholders' Funds", [['Share Capital', 1, SWMn.total], ['Reserves and Surplus', 2, SWMr.total]]], ['Current Liabilities', [['Other Current Liabilities', 3, SWMo.total]]]], assets: [['Current Assets', [['Cash and Cash Equivalents (cash at bank)', '', SWM.bal(ACC.bank)]]]] });
eq([SWMn.total, SWMr.total, SWMo.total, SWMbs.total], [478000, 120000, 3000, 601000], 's3_bs_extract');
Q('s3_bs_extract', short({
  t: [6, 3], d: 3, c: 'application', marks: 3,
  stem: `Shadja Water Meters Ltd, an imagined company with authorised capital of ${inr(100000)} equity shares of ₹10 each, issued ${inr(60000)} shares at ₹12, payable ₹3 on application, ₹5 on allotment (including the premium of ₹2), ₹2 on the first call and ₹2 on the second and final call. The second call has not yet been made. Rahat, holding ${inr(1000)} shares, has not paid the first call; Yogini, holding ${inr(1500)} shares, has paid the second call in advance along with the first call. All other money has been received and banked. Prepare the balance sheet extract with the notes to accounts, as required by Schedule III Part I.`,
  model: `${SWMbs.md}\n\n${SWMn.md}\n\n${SWMr.md}\n\n${SWMo.md}`,
  sol: 'Share capital is shown at the amount called up less calls unpaid; premium goes to Reserves and Surplus and calls in advance to Other Current Liabilities.',
  scheme: [['Note on Share Capital with calls in arrears', 1], ['Reserves and Surplus and calls in advance under Other Current Liabilities', 1], ['Balance sheet totals agreeing with cash at bank', 1]],
}));

const KTF = new Books();
const KTFi = issue(KTF, { fv: 10, n: 30000, inst: inst(['Application', 4], ['Allotment', 3], ['First and Final Call', 3]), defaults: [{ who: 'Deepali', shares: 500, from: 2 }], arrearsAccount: true });
const KTFstart = KTF.entries.length;
const KTFf = forfeit(KTF, KTFi, ['Deepali']);
const KTFr = reissue(KTF, { cap: E, shares: 300, price: 9, credited: 10, forfeitedOn: (KTFf.sf * 300) / 500 });
const KTFn = shareNote({ B: KTF, cap: E, fv: 10, authorised: 50000, issued: 30000, rows: [{ label: 'Subscribed and fully paid up', n: 29800, called: 10 }], forfeited: -KTF.bal(ACC.sf), note: 1 });
const KTFrs = simpleNote('Reserves and Surplus', [['Capital Reserve', -KTF.bal(ACC.cr)]], 2);
const KTFbs = bsIII({ title: 'Balance Sheet of Kirwani Thermal Flasks Ltd (extract)', eq: [["Shareholders' Funds", [['Share Capital', 1, KTFn.total], ['Reserves and Surplus', 2, KTFrs.total]]]], assets: [['Current Assets', [['Cash and Cash Equivalents (cash at bank)', '', KTF.bal(ACC.bank)]]]] });
eq([KTFf.sf, KTFr.toCR, KTFr.sfLeft, KTFn.total, KTFbs.total], [3500, 1800, 1400, 299400, 301200], 'l5_disclosure');
Q('l5_disclosure', long({
  t: [6, 5], d: 4, c: 'application', marks: 5,
  stem: `Kirwani Thermal Flasks Ltd, an imagined company with authorised capital of ${inr(50000)} equity shares of ₹10 each, issued ${inr(30000)} shares at par, payable ₹4 on application, ₹3 on allotment and ₹3 on the first and final call. All money was received except the call on ${inr(500)} shares held by Deepali, which stood in the Calls in Arrears Account. Her shares were forfeited, and ${inr(300)} of them were reissued at ₹9 per share as fully paid.\n\n(a) Pass the journal entries for the forfeiture and the reissue. [2]\n\n(b) Prepare the balance sheet extract with the Note on Share Capital and the note on Reserves and Surplus, as required by Schedule III Part I. [3]`,
  model: `**(a)**\n\n${KTF.journal(KTFstart).md}\n\n**(b)**\n\n${KTFbs.md}\n\n${KTFn.md}\n\n${KTFrs.md}`,
  sol: 'After the reissue, 29,800 shares are fully paid; the forfeiture left on the other 200 shares is added to share capital, and the gain on the reissued shares is capital reserve.',
  scheme: [['(a) Forfeiture entry', 1], ['(a) Reissue and capital reserve transfer', 1], ['(b) Note on Share Capital with forfeited shares added', 1], ['(b) Capital reserve under Reserves and Surplus', 1], ['(b) Balance sheet totals agreeing with cash at bank', 1]],
}));

// ================================================================ practicals (practice only; not in the tests)
const PBT = new Books();
const PBTi = issue(PBT, {
  fv: 10, n: 80000, inst: inst(['Application', 3, 2], ['Allotment', 3], ['First Call', 2], ['Second and Final Call', 2]),
  groups: [{ applied: 10000, allotted: 0 }, { applied: 20000, allotted: 20000 }, { applied: 100000, allotted: 60000 }],
  defaults: [{ who: 'Rachna', shares: 600, group: 2, from: 2 }], arrearsAccount: true, made: 3,
});
const PBTf = forfeit(PBT, PBTi, ['Rachna']);
const PBTr = reissue(PBT, { cap: E, shares: 500, price: 6, credited: 8, forfeitedOn: (PBTf.sf * 500) / 600 });
const PBTsf = PBT.ledgerOf(ACC.sf);
eq([PBTi.refT, PBTi.adjT, PBTf.per.Rachna.surplus, PBTf.sf, PBTr.disc, PBTr.toCR, PBTr.sfLeft], [70000, 180000, 200, 3600, 1000, 2000, 600], 'l8_issue_cycle');
Q('l8_issue_cycle', long({
  t: [4, 3, 5], d: 5, c: 'analysis', marks: 8,
  stem: `Purvi Brass Taps Ltd, an imagined company, offers ${inr(80000)} equity shares of ₹10 each at ₹12, payable ₹5 on application (including the premium of ₹2), ₹3 on allotment, ₹2 on the first call and ₹2 on the second and final call. Applications are received for ${inr(PBTi.applied)} shares: applicants for ${inr(10000)} shares are refused; applicants for ${inr(20000)} shares are allotted in full; applicants for ${inr(100000)} shares are allotted ${inr(60000)} shares pro rata. Excess application money is adjusted towards allotment and any surplus refunded. Rachna, from the pro-rata group, is allotted ${inr(600)} shares and fails to pay the first call; her shares are forfeited after that call. The second and final call has not yet been made. ${inr(500)} of the forfeited shares are reissued at ₹6 per share as ₹8 paid up. The company keeps a Calls in Arrears Account.\n\n(a) Pass the journal entries. [6]\n\n(b) Prepare the Share Forfeiture Account. [2]`,
  model: `Working: pro-rata group paid ${inr(100000)} × ₹5 = ${inr(500000)}; needed on application ${inr(60000)} × ₹5 = ${inr(300000)}; excess ${inr(200000)}, of which ${inr(PBTi.adjT)} covers their allotment money (${inr(60000)} × ₹3) and ${inr(200000 - PBTi.adjT)} is refunded with the ${inr(10000 * 5)} of refused applicants (total refund ${rs(PBTi.refT)}). Rachna applied for ${inr(1000)} shares, paid ${inr(5000)}, had her allotment fully covered and got ${inr(PBTf.per.Rachna.surplus)} back; she owes the first call of ${inr(1200)}. Forfeited: called up ${inr(600 * 8)} less unpaid ${inr(1200)} = ${rs(PBTf.sf)} (premium received is not forfeited). Reissue: forfeited on ${inr(500)} shares ${inr(3000)}, discount ${inr(PBTr.disc)}, capital reserve ${rs(PBTr.toCR)}.\n\n**(a)**\n\n${PBT.journal().md}\n\n**(b) Share Forfeiture Account**\n\n${PBTsf.md}`,
  sol: 'Work category by category; the premium is on application, so the defaulter\'s premium was received and is not cancelled on forfeiture.',
  scheme: [['(a) Application received and its three-way transfer', 2], ['(a) Allotment due and received net of the adjustment', 1], ['(a) First call with arrears', 1], ['(a) Forfeiture', 1], ['(a) Reissue and capital reserve', 1], ['(b) Share Forfeiture Account with balance c/d', 2]],
}));

const DAS = new Books();
const DASv = vendorShares(72000, 10, 12);
DAS.post({ dr: [['Machinery A/c', 72000]], cr: [['Parineeta Engineering Works A/c', 72000]], nar: 'machinery bought from Parineeta Engineering Works' });
DAS.post({ dr: [['Parineeta Engineering Works A/c', 72000]], cr: [[E, DASv.cap], [ACC.sp, DASv.prem]], nar: `${inr(DASv.n)} equity shares of ₹10 issued at ₹12 to the vendor` });
const DASi = issue(DAS, { fv: 10, n: 50000, inst: inst(['Application', 3], ['Allotment', 3, 2], ['First and Final Call', 4]), defaults: [{ who: 'Heer', shares: 400, from: 2 }], advance: [{ who: 'Yasmin', shares: 1000, at: 1, calls: [2] }], arrearsAccount: true });
const DASf = forfeit(DAS, DASi, ['Heer']);
const DASr = reissue(DAS, { cap: E, shares: 400, price: 8, credited: 10, forfeitedOn: DASf.sf });
const DASn = shareNote({ B: DAS, cap: E, fv: 10, authorised: 100000, issued: 56000, rows: [{ label: 'Subscribed and fully paid up', n: 56000, called: 10 }], note: 1 });
const DASrs = simpleNote('Reserves and Surplus', [['Securities Premium', -DAS.bal(ACC.sp)], ['Capital Reserve', -DAS.bal(ACC.cr)]], 2);
const DASbs = bsIII({ title: 'Balance Sheet of Dhanashree Agro Sprayers Ltd (extract)', eq: [["Shareholders' Funds", [['Share Capital', 1, DASn.total], ['Reserves and Surplus', 2, DASrs.total]]]], assets: [['Non-current Assets', [['Property, Plant and Equipment (machinery)', '', DAS.bal('Machinery A/c')]]], ['Current Assets', [['Cash and Cash Equivalents (cash at bank)', '', DAS.bal(ACC.bank)]]]] });
eq([DASv.n, DASf.sf, DASr.toCR, DAS.bal(ACC.sf), DASn.total, DASrs.total, DAS.bal(ACC.bank), DASbs.total], [6000, 2400, 1600, 0, 560000, 113600, 601600, 673600], 'l8_disclosure');
Q('l8_disclosure', long({
  t: [2, 3, 5, 6], d: 4, c: 'application', marks: 8,
  stem: `Dhanashree Agro Sprayers Ltd, an imagined company, has authorised capital of ${inr(100000)} equity shares of ₹10 each. During the year it:\n\n1. bought machinery for ${rs(72000)} from Parineeta Engineering Works, an imagined firm, paying in fully paid equity shares issued at ₹12;\n2. offered ${inr(50000)} equity shares to the public at ₹12, payable ₹3 on application, ₹5 on allotment (including the premium of ₹2) and ₹4 on the first and final call; all were applied for and allotted;\n3. received all money due except the call on ${inr(400)} shares held by Heer; Yasmin, holding ${inr(1000)} shares, paid the call with her allotment money (ignore interest);\n4. forfeited Heer's shares and reissued all of them at ₹8 per share as fully paid.\n\nThe company keeps Calls in Arrears and Calls in Advance accounts.\n\n(a) Pass the journal entries. [5]\n\n(b) Prepare the balance sheet extract with the notes on Share Capital and Reserves and Surplus, as required by Schedule III Part I. [3]`,
  model: `Working: vendor shares ${inr(72000)} ÷ 12 = ${inr(DASv.n)}. Heer's forfeiture: ₹3 + ₹3 capital paid = ₹6 a share, ${inr(DASf.sf)}; reissue discount ${inr(400 * 2)}; capital reserve ${rs(DASr.toCR)}; nothing is left in the Share Forfeiture Account.\n\n**(a)**\n\n${DAS.journal().md}\n\n**(b)**\n\n${DASbs.md}\n\n${DASn.md}\n\n${DASrs.md}`,
  sol: 'Post the vendor issue, the public issue with the advance and the arrears, then forfeit and reissue; the notes must agree with the ledger balances and cash at bank.',
  scheme: [['(a) Vendor entries with premium', 1], ['(a) Application and allotment, with the advance', 1], ['(a) Call with the advance adjusted and arrears', 1], ['(a) Forfeiture (premium received not cancelled)', 1], ['(a) Reissue and capital reserve', 1], ['(b) Note on Share Capital', 1], ['(b) Reserves and Surplus: premium and capital reserve', 1], ['(b) Balance sheet totals', 1]],
}));

