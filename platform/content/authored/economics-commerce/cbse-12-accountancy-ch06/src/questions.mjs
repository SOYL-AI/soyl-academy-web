// CBSE 12 Accountancy, ch06 Accounting for Share Capital — question bank. Every company, person and
// figure is imagined by SOYL; no NCERT illustration or exercise and no CBSE sample/past-paper item is
// reused. Every amount is computed by acc.mjs from the givens: issues are posted to a small set of
// books (journal entries balance, instalment accounts close, forfeiture equals money received less
// premium received, discount on re-issue within the forfeited amount, notes agree with the ledger,
// balance sheets total), so a figure in a key or model answer is never typed by hand.
import { Q, mcq, ar, tf, fb, match, num, short, long } from './lib.mjs';
import { F, fig, rs, sum, md, check, Books, ACC, issue, forfeit, reissue, vendorShares, shareNote, simpleNote, bsIII } from './acc.mjs';

const list = (xs) => (xs.length === 1 ? xs[0] : `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}`);
/** "₹3 on application, ₹5 on allotment (including premium of ₹2) and ₹4 on first and final call". */
export const terms = (inst) => list(inst.map((i) => `₹${i.cap + (i.prem ?? 0)} on ${i.name.toLowerCase()}${i.prem ? ` (including premium of ₹${i.prem})` : ''}`));
const sh = (n) => `${fig(n)} shares`;
/** A book with one forfeiture already recorded (shares fully called at `called`, `paid` per share received). */
function forfeitedBook(shares, called, paid) {
  const B = new Books();
  B.post({ dr: [['Share Capital A/c', shares * called]], cr: [[ACC.cia, shares * (called - paid)], [ACC.sf, shares * paid]], nar: 'shares forfeited' });
  return B;
}

// ================================================================ t01 Company, shares and share capital
Q('m_company_feature', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which of the following is NOT a feature of a company limited by shares?',
  opts: ["Unlimited personal liability of its members for the company's debts", 'It is a separate legal entity, distinct from its members', 'Perpetual succession: it continues even when its members change', 'The shares of a public company are freely transferable'],
  sol: "A member's liability is limited to the amount, if any, unpaid on his shares. The other three statements describe a company correctly.",
}));

const TP = { authorised: 500000, issued: 300000, subscribed: 280000, fv: 10, called: 7, arrears: 15000 };
const TPcalled = TP.subscribed * TP.called;
check(TPcalled === 1960000 && 10 * TP.subscribed >= 9 * TP.issued, 'TP');
Q('m_categories', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Tunga Paper Ltd, an imagined company, is registered with ${fig(TP.authorised)} equity shares of ₹10 each. It offered ${sh(TP.issued)} to the public, received applications for ${sh(TP.subscribed)} and allotted them all. So far ₹${TP.called} per share has been called up, and calls of ${rs(TP.arrears)} remain unpaid. Its called-up capital is`,
  opts: [rs(TPcalled), rs(TP.issued * TP.called), rs(TPcalled - TP.arrears), rs(TP.subscribed * TP.fv)],
  sol: `Called-up capital = subscribed shares × amount called per share = ${fig(TP.subscribed)} × ₹${TP.called} = ${fig(TPcalled)}. Unpaid calls reduce the paid-up capital (${fig(TPcalled - TP.arrears)}), not the called-up capital.`,
}));

Q('m_reserve_cap', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'Reserve capital of a company is',
  opts: ['the part of its uncalled capital that it has resolved, by a special resolution, to call only on its winding up', 'the part of its authorised capital that has not yet been offered to the public', 'the amount of profit set aside every year as a general reserve', 'the amount collected as premium on the issue of shares'],
  sol: 'Reserve capital is uncalled capital kept back for winding up; it cannot be called while the company is a going concern. It has nothing to do with profits set aside (a revenue reserve) or with premium.',
}));

Q('m_pref_rights', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Preference shares carry a preferential right over equity shares with respect to',
  opts: ['payment of dividend at a fixed rate, and repayment of capital on winding up', 'voting on every resolution placed before the shareholders', 'appointment of the directors of the company', 'sharing all the profits left after paying the creditors'],
  sol: 'The two preferences are a fixed dividend paid before any equity dividend and return of capital before equity shareholders on winding up. Voting control and the residual profit belong to equity shareholders.',
}));

Q('tf_pref', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? Preference shareholders ordinarily have the same right as equity shareholders to vote on every resolution of the company.',
  sol: 'Preference shareholders ordinarily vote only on resolutions that directly affect their own rights (and in a few special cases); equity shareholders vote on all matters.',
}));

Q('ar_subscribed', ar({
  t: 1, d: 2, c: 'understanding', key: 'a',
  a: 'The subscribed capital of a company can never be more than its issued capital.',
  r: 'Subscribed capital is the part of the issued capital that the public has applied for and the company has allotted.',
  sol: 'Both are true. Shares can be allotted only out of those offered, so subscribed capital is at most the issued capital; R explains A.',
}));

Q('mt_capital', match({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Match each category of share capital in column A with its meaning in column B.',
  pairs: [
    ['Authorised capital', 'The maximum capital a company may raise, as stated in its memorandum'],
    ['Issued capital', 'The part of authorised capital offered to the public for subscription'],
    ['Called-up capital', 'The part of subscribed capital that shareholders have been asked to pay'],
    ['Reserve capital', 'The part of uncalled capital to be called only on winding up'],
  ],
  sol: 'The categories nest inside one another: authorised, then issued, then subscribed, then called-up, then paid-up; reserve capital is a part of the uncalled amount.',
}));

Q('fb_authorised', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'The maximum amount of share capital that a company may raise, as stated in its memorandum of association, is called its ___ capital.',
  acc: [['authorised', 'authorized', 'nominal', 'registered']],
  sol: 'It is the authorised (also called nominal or registered) capital.',
}));

const SC = { shares: 500000, offered: 240000, applied: 225000, inst: [2, 3, 3, 2], called: 8, def: 4000 };
const SCv = {
  authorised: SC.shares * 10,
  issued: SC.offered * 10,
  subscribed: SC.applied * 10,
  calledUp: SC.applied * SC.called,
  uncalled: SC.applied * (10 - SC.called),
  arrears: SC.def * SC.inst[2],
};
SCv.paidUp = SCv.calledUp - SCv.arrears;
check(SCv.paidUp === 1788000 && 10 * SC.applied >= 9 * SC.offered && sum(SC.inst.slice(0, 3)) === SC.called, 'SC');
Q('s3_capital_cats', short({
  t: 1, d: 3, c: 'application', marks: 3,
  stem: `Sabari Ceramics Ltd, an imagined company, is registered with a capital of ${rs(SCv.authorised)} in equity shares of ₹10 each. It offered ${sh(SC.offered)} to the public, payable ₹${SC.inst[0]} on application, ₹${SC.inst[1]} on allotment, ₹${SC.inst[2]} on first call and ₹${SC.inst[3]} on final call. Applications were received for ${sh(SC.applied)}, and all were allotted. The final call has not yet been made. A shareholder holding ${sh(SC.def)} did not pay the first call. Calculate the authorised, issued, subscribed, called-up, uncalled and paid-up capital.`,
  model: md(['Category', 'Working', '₹'], [
    ['Authorised capital', `${fig(SC.shares)} × ₹10`, fig(SCv.authorised)],
    ['Issued capital', `${fig(SC.offered)} × ₹10`, fig(SCv.issued)],
    ['Subscribed capital', `${fig(SC.applied)} × ₹10`, fig(SCv.subscribed)],
    ['Called-up capital', `${fig(SC.applied)} × ₹${SC.called} (₹${SC.inst[0]} + ₹${SC.inst[1]} + ₹${SC.inst[2]})`, fig(SCv.calledUp)],
    ['Uncalled capital', `${fig(SC.applied)} × ₹${10 - SC.called} (final call)`, fig(SCv.uncalled)],
    ['Paid-up capital', `${fig(SCv.calledUp)} − calls in arrears ${fig(SCv.arrears)} (${fig(SC.def)} × ₹${SC.inst[2]})`, `**${fig(SCv.paidUp)}**`],
  ], [2]),
  sol: 'Each category is a number of shares times an amount per share; only paid-up capital deducts the unpaid calls.',
  scheme: [['Authorised, issued and subscribed capital', 1], ['Called-up and uncalled capital', 1], ['Paid-up capital after calls in arrears', 1]],
}));

Q('s3_eq_pref', short({
  t: 1, d: 2, c: 'understanding', marks: 3,
  stem: 'Distinguish between equity shares and preference shares on any three bases.',
  model: md(['Basis', 'Equity shares', 'Preference shares'], [
    ['Rate of dividend', 'Varies with profits; decided each year', 'Fixed rate'],
    ['Priority in dividend', 'Paid only after the preference dividend', 'Paid before any equity dividend'],
    ['Return of capital on winding up', 'Repaid last, after preference capital', 'Repaid before equity capital'],
    ['Voting rights', 'Vote on all matters', 'Ordinarily vote only on matters affecting their rights'],
  ]),
  sol: 'Any three bases, each with both columns correct, earn the marks.',
  scheme: [['First basis, both columns', 1], ['Second basis, both columns', 1], ['Third basis, both columns', 1]],
}));

// ================================================================ t02 Issue at par and at premium; over- and under-subscription
Q('m_premium_entry', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Shares are issued at a premium and the premium is payable with the allotment money. The entry for the allotment money becoming due is',
  opts: ['Share Allotment A/c Dr, To Share Capital A/c and To Securities Premium A/c', 'Share Allotment A/c Dr, To Share Capital A/c only', 'Securities Premium A/c Dr, To Share Allotment A/c', 'Bank A/c Dr, To Securities Premium A/c'],
  sol: 'The amount due on allotment is debited to Share Allotment; the face-value part is credited to Share Capital and the premium part to Securities Premium. Cash is recorded only when it is received.',
}));

Q('m_sec52', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'Under Section 52 of the Companies Act 2013, the balance of the Securities Premium Account can NOT be used for',
  opts: ['paying a dividend to the shareholders', 'writing off the preliminary expenses of the company', 'writing off the expenses of, or commission paid on, an issue of shares or debentures', 'issuing fully paid bonus shares to the members'],
  sol: 'Securities premium is a capital receipt, so the Act lists only capital uses for it; it may never be distributed as dividend.',
}));

Q('m_s53', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Under Section 53 of the Companies Act 2013, an issue of shares at a discount (other than sweat equity shares) is',
  opts: ['not permitted; any shares so issued are void', 'permitted if the discount does not exceed 10 per cent of the face value', 'permitted with the approval of the board of directors alone', 'permitted if the discount is credited to the Securities Premium Account'],
  sol: 'Section 53 bars a company from issuing shares at a discount, the only exception being sweat equity shares issued under Section 54.',
}));

const MS = { offered: 100000, applied: 85000 };
const MSpc = (100 * MS.applied) / MS.offered;
check(MSpc === 85, 'MS');
Q('m_min_sub', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: `An imagined company offers ${sh(MS.offered)} to the public and, by the closing date, receives applications for only ${sh(MS.applied)}. Applying the minimum subscription rule of 90 per cent of the issue, the company must`,
  opts: ['refund the application money; no shares can be allotted', `allot ${sh(MS.applied)} and treat the issue as under-subscribed`, `allot ${sh(MS.offered)} and ask the directors to pay for the shortfall`, `allot ${sh(MS.applied)} and offer the rest at a discount`],
  sol: `Applications cover only ${MSpc}% of the issue, which is below the minimum subscription of 90%. So no allotment can be made and the money received must be refunded.`,
}));

Q('tf_undersub', tf({
  t: 2, d: 1, c: 'recall', ans: true,
  stem: 'True or false? An issue is said to be under-subscribed when the company receives applications for fewer shares than it has offered.',
  sol: 'That is the meaning of under-subscription; the company may still allot the shares applied for, provided the minimum subscription has been received.',
}));

const KP = { offered: 60000, applied: 56000, app: 4 };
const KPcap = KP.applied * KP.app;
check(KPcap === 224000 && 10 * KP.applied >= 9 * KP.offered, 'KP');
Q('m_undersub', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Kosi Polymers Ltd, an imagined company, offered ${sh(KP.offered)} of ₹10 each, ₹${KP.app} payable on application. Applications were received for ${sh(KP.applied)}, and all of them were allotted. The amount credited to Share Capital on transfer of the application money is`,
  opts: [rs(KPcap), rs(KP.offered * KP.app), rs(KP.applied * 10), rs(((9 * KP.offered) / 10) * KP.app)],
  sol: `Only the shares actually allotted count: ${fig(KP.applied)} × ₹${KP.app} = ${fig(KPcap)}. The issue is under-subscribed but above the 90% minimum, so the allotment is valid.`,
}));

const AP = { applied: 1800, allotted: 1200, app: 4, allot: 3 };
const APadj = Math.min((AP.applied - AP.allotted) * AP.app, AP.allotted * AP.allot);
check(APadj === 2400, 'AP');
Q('m_prorata_excess', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Arpita applied for ${sh(AP.applied)} in an imagined company and was allotted ${sh(AP.allotted)} on a pro-rata basis. Application money was ₹${AP.app} and allotment money ₹${AP.allot} per share, and her excess application money was to be adjusted towards allotment. The amount adjusted towards allotment is`,
  opts: [rs(APadj), rs(AP.allotted * AP.app), rs(AP.applied * AP.app), rs(AP.allotted * AP.allot)],
  sol: `Excess = (${fig(AP.applied)} − ${fig(AP.allotted)}) × ₹${AP.app} = ${fig(APadj)}. Allotment due from her is ${fig(AP.allotted * AP.allot)}, which is more than the excess, so the whole ${fig(APadj)} is adjusted.`,
}));

const VM = { offered: 40000, applied: 52000, rejected: 12000, app: 3 };
const VMref = VM.rejected * VM.app;
check(VM.applied - VM.rejected === VM.offered && VMref === 36000, 'VM');
Q('m_refund', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Varuna Marine Ltd, an imagined company, offered ${sh(VM.offered)}, with ₹${VM.app} per share payable on application. Applications for ${sh(VM.applied)} were received; applications for ${sh(VM.rejected)} were rejected and the remaining applicants were allotted shares in full. The application money refunded is`,
  opts: [rs(VMref), rs(VM.applied * VM.app), rs(VM.offered * VM.app), rs(VM.rejected)],
  sol: `Only the rejected applicants get their money back: ${fig(VM.rejected)} × ₹${VM.app} = ${fig(VMref)}. The rest is transferred to share capital.`,
}));

const BV = { applied: 900, allotted: 600, app: 3, allot: 4 };
const BVex = (BV.applied - BV.allotted) * BV.app;
const BVdue = BV.allotted * BV.allot;
const BVpay = BVdue - BVex;
check(BVpay === 1500, 'BV');
Q('n_prorata_allot', num({
  t: 2, d: 3, c: 'application', marks: 2, value: BVpay, unit: '₹',
  stem: `An imagined company issued shares of ₹10 each: ₹${BV.app} on application, ₹${BV.allot} on allotment and ₹3 on first and final call. Bhavna applied for ${sh(BV.applied)} and was allotted ${sh(BV.allotted)} on a pro-rata basis; her excess application money is adjusted towards allotment. How much must she pay on allotment (in ₹)?`,
  sol: `Excess application money = (${fig(BV.applied)} − ${fig(BV.allotted)}) × ₹${BV.app} = ${fig(BVex)}. Allotment due = ${fig(BV.allotted)} × ₹${BV.allot} = ${fig(BVdue)}. Amount payable = ${fig(BVdue)} − ${fig(BVex)} = ${fig(BVpay)}. So ₹${fig(BVpay)}.`,
  scheme: [['Excess application money', 1], [`Amount payable ${rs(BVpay)}`, 1]],
}));

const PT = { n: 25000, prem: 3 };
const PTv = PT.n * PT.prem;
check(PTv === 75000, 'PT');
Q('n_premium_total', num({
  t: 2, d: 2, c: 'understanding', marks: 1, value: PTv, unit: '₹',
  stem: `An imagined company issued ${sh(PT.n)} of ₹10 each at a premium of ₹${PT.prem} per share. The issue was fully subscribed and all the money was received. What is the balance of its Securities Premium Account (in ₹)?`,
  sol: `Securities premium = ${fig(PT.n)} × ₹${PT.prem} = ${fig(PTv)}. So ₹${fig(PTv)}.`,
}));

Q('fb_premium', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'The premium received on the issue of shares is credited to the ___ Account.',
  acc: [['Securities Premium', 'Securities Premium Reserve']],
  sol: 'It is credited to the Securities Premium Account, which appears under Reserves and Surplus.',
}));

Q('ar_premium', ar({
  t: 2, d: 2, c: 'understanding', key: 'c',
  a: "Securities premium is shown under 'Reserves and Surplus' in the balance sheet of a company.",
  r: 'Securities premium may be used to pay dividend to the shareholders.',
  sol: 'A is true. R is false: Section 52 allows only capital uses of securities premium, and dividend is not one of them.',
}));

Q('ar_oversub', ar({
  t: 2, d: 3, c: 'analysis', key: 'a',
  a: 'When shares are allotted on a pro-rata basis, the excess application money of an allottee may be adjusted towards the allotment money due from him.',
  r: 'An allottee who receives fewer shares than he applied for has paid more application money than is due on the shares allotted to him.',
  sol: 'Both are true, and R explains A: it is precisely because he has overpaid on application that the company can use the excess against his allotment.',
}));

{
  const B = new Books();
  const I = issue(B, { kind: 'Equity Share', fv: 10, n: 30000, inst: [{ name: 'Application', cap: 4 }, { name: 'Allotment', cap: 6 }] });
  check(B.bal(ACC.bank) === 300000 && -B.bal(I.A.cap) === 300000, 'Ken Leather');
  Q('s3_par_entries', short({
    t: 2, d: 3, c: 'application', marks: 3,
    stem: `Ken Leather Ltd, an imagined company in Kanpur, issued ${sh(I.allotted)} of ₹10 each at par, payable ${terms(I.inst)}. The public applied for all the shares, and all the money was duly received. Pass the journal entries in the books of the company.`,
    model: B.journal().md,
    sol: 'Two pairs of entries: money due is debited to the instalment account, and money received is credited to it.',
    scheme: [['Application money received and transferred to share capital', 1.5], ['Allotment money due and received', 1.5]],
  }));
}

{
  const B = new Books();
  const I = issue(B, { kind: 'Equity Share', fv: 10, n: 40000, inst: [{ name: 'Application', cap: 3 }, { name: 'Allotment', cap: 4 }, { name: 'First and Final Call', cap: 3 }], groups: [{ applied: 16000, allotted: 0 }, { applied: 48000, allotted: 40000 }], made: 2 });
  const due = I.allotted * I.rate[1];
  check(I.refT === 48000 && I.adjT === 24000 && due - I.adjT === 136000, 'Sarayu');
  Q('s3_prorata_calc', short({
    t: 2, d: 3, c: 'application', marks: 3,
    stem: `Sarayu Fabrics Ltd, an imagined company, offered ${sh(I.s.n)} of ₹10 each, payable ${terms(I.inst)}. Applications were received for ${sh(I.applied)}. Applications for ${sh(I.groups[0].applied)} were rejected, and the remaining applicants were allotted shares in the ratio of 5 shares for every 6 applied for; excess application money was adjusted towards allotment. Calculate (i) the money refunded, (ii) the excess adjusted towards allotment and (iii) the cash received on allotment, assuming every allottee paid.`,
    model: md(['Item', 'Working', '₹'], [
      ['(i) Refunded', `${fig(I.groups[0].applied)} rejected × ₹${I.rate[0]}`, `**${fig(I.refT)}**`],
      ['(ii) Adjusted towards allotment', `(${fig(I.groups[1].applied)} − ${fig(I.groups[1].allotted)}) × ₹${I.rate[0]}`, `**${fig(I.adjT)}**`],
      ['Allotment money due', `${fig(I.allotted)} × ₹${I.rate[1]}`, fig(due)],
      ['(iii) Cash received on allotment', `${fig(due)} − ${fig(I.adjT)}`, `**${fig(due - I.adjT)}**`],
    ], [2]),
    sol: 'Rejected applicants are refunded; pro-rata applicants carry their overpayment into allotment.',
    scheme: [['Refund', 1], ['Excess adjusted', 1], ['Cash received on allotment', 1]],
  }));
}

{
  const B = new Books();
  const I = issue(B, { kind: 'Equity Share', fv: 10, n: 20000, inst: [{ name: 'Application', cap: 3 }, { name: 'Allotment', cap: 2, prem: 4 }, { name: 'First and Final Call', cap: 5 }] });
  check(-B.bal(ACC.sp) === 80000 && B.bal(ACC.bank) === 280000, 'Tapti');
  Q('l4_premium_issue', long({
    t: 2, d: 3, c: 'application', marks: 4,
    stem: `Tapti Paints Ltd, an imagined company in Surat, issued ${sh(I.allotted)} of ₹10 each at a premium of ₹4 per share, payable ${terms(I.inst)}. All the shares were applied for and allotted, and all the money was received. Pass the journal entries.`,
    model: `${B.journal().md}\n\nSecurities premium collected = ${fig(I.allotted)} × ₹4 = ${fig(-B.bal(ACC.sp))}; cash received in all = ${fig(B.bal(ACC.bank))}.`,
    sol: 'Premium is credited in the entry where it becomes due, here with allotment.',
    scheme: [['Application entries', 1], ['Allotment due, with premium credited', 1.5], ['Allotment received; call due and received', 1.5]],
  }));
}

{
  const B = new Books();
  const I = issue(B, { kind: 'Equity Share', fv: 10, n: 40000, inst: [{ name: 'Application', cap: 2, prem: 2 }, { name: 'Allotment', cap: 5 }, { name: 'First and Final Call', cap: 3 }], groups: [{ applied: 20000, allotted: 0 }, { applied: 80000, allotted: 40000 }], made: 2 });
  check(I.adjT === 160000 && I.refT === 80000 && B.bal(ACC.bank) === 400000 - 80000 + 40000, 'Bhima');
  Q('l4_oversub_reject', long({
    t: 2, d: 3, c: 'application', marks: 4,
    stem: `Bhima Steel Ltd, an imagined company, invited applications for ${sh(I.s.n)} of ₹10 each at a premium of ₹2, payable ${terms(I.inst)}. Applications were received for ${sh(I.applied)}. Applications for ${sh(I.groups[0].applied)} were rejected and their money refunded; the other applicants were allotted one share for every two applied for, and their excess application money was adjusted towards allotment. All allotment money was received. Pass the journal entries up to the receipt of allotment money.`,
    model: `Excess on pro-rata applications = (${fig(I.groups[1].applied)} − ${fig(I.groups[1].allotted)}) × ₹${I.rate[0]} = ${fig(I.adjT)}; allotment due = ${fig(I.allotted)} × ₹${I.rate[1]} = ${fig(I.allotted * I.rate[1])}; cash still to come on allotment = ${fig(I.allotted * I.rate[1] - I.adjT)}.\n\n${B.journal().md}`,
    sol: 'The premium here is part of the application money, so it is credited when the application money is transferred.',
    scheme: [['Application money received', 0.5], ['Transfer: capital, premium, adjustment and refund', 1.5], ['Allotment due', 1], ['Allotment money received', 1]],
  }));
}

export const CHAMBAL = (() => {
  const B = new Books();
  const I = issue(B, { kind: 'Equity Share', fv: 10, n: 60000, inst: [{ name: 'Application', cap: 3 }, { name: 'Allotment', cap: 3, prem: 2 }, { name: 'First and Final Call', cap: 4 }], groups: [{ applied: 15000, allotted: 0 }, { applied: 20000, allotted: 20000 }, { applied: 70000, allotted: 40000 }] });
  check(I.adjT === 90000 && I.refT === 45000 && B.bal(ACC.bank) === 315000 - 45000 + 210000 + 240000, 'Chambal');
  return { B, I };
})();
Q('l6_prorata_full', long({
  t: 2, d: 4, c: 'analysis', marks: 6,
  stem: `Chambal Cables Ltd, an imagined company in Kota, offered ${sh(CHAMBAL.I.s.n)} of ₹10 each at a premium of ₹2, payable ${terms(CHAMBAL.I.inst)}. Applications were received for ${sh(CHAMBAL.I.applied)} and the directors decided:\n\n1. Applicants for ${sh(15000)}: rejected, money refunded.\n2. Applicants for ${sh(20000)}: allotted in full.\n3. Applicants for ${sh(70000)}: allotted ${sh(40000)}, excess application money adjusted towards allotment.\n\nAll the money due on allotment and on the call was received. Pass the journal entries.`,
  model: `Excess of category 3 = (${fig(70000)} − ${fig(40000)}) × ₹3 = ${fig(CHAMBAL.I.adjT)}; it is less than the allotment due from that category (${fig(40000 * 5)}), so all of it is adjusted.\n\n${CHAMBAL.B.journal().md}`,
  sol: 'Treat each category separately on application; from allotment on, all allottees are treated alike.',
  scheme: [['Application money received', 1], ['Transfer: capital, adjustment, refund to category 1', 2], ['Allotment due with premium, and received', 1.5], ['Call due and received', 1.5]],
}));

export const SUTLEJ = (() => {
  const B = new Books();
  const I = issue(B, {
    kind: 'Equity Share', fv: 10, n: 50000, applied: 46000, arrearsAccount: true,
    inst: [{ name: 'Application', cap: 2 }, { name: 'Allotment', cap: 3 }, { name: 'First Call', cap: 2 }, { name: 'Second and Final Call', cap: 3 }],
    defaults: [{ who: 'Mohan', shares: 1000, from: 3 }],
    advance: [{ who: 'Seema', shares: 600, at: 1, calls: [2, 3] }],
  });
  check(B.bal(ACC.bank) === 457000 && B.bal(ACC.cia) === 3000 && B.bal(ACC.adv) === 0, 'Sutlej');
  return { B, I };
})();
Q('l6_undersub_bank', long({
  t: [2, 3], d: 3, c: 'application', marks: 6,
  stem: `Sutlej Agro Ltd, an imagined company, offered ${sh(SUTLEJ.I.s.n)} of ₹10 each at par, payable ${terms(SUTLEJ.I.inst)}. Applications were received for ${sh(SUTLEJ.I.applied)}, and all were allotted (the minimum subscription was received). Seema, who was allotted ${sh(600)}, paid both calls along with her allotment money. Mohan, holding ${sh(1000)}, did not pay the second and final call. All other money was received. The company keeps Calls in Arrears and Calls in Advance accounts. Pass the journal entries and prepare the Bank Account.`,
  model: `Subscription = ${fig(SUTLEJ.I.applied)} ÷ ${fig(SUTLEJ.I.s.n)} = ${(100 * SUTLEJ.I.applied) / SUTLEJ.I.s.n}%, above 90%, so all ${sh(SUTLEJ.I.applied)} are allotted. Seema's advance = ${fig(600)} × (₹2 + ₹3) = ${fig(3000)}.\n\n**Journal**\n\n${SUTLEJ.B.journal().md}\n\n**Bank Account**\n\n${SUTLEJ.B.ledgerOf(ACC.bank).md}`,
  sol: 'Advance money is credited when received and debited back as each call falls due; arrears are debited when the call is not paid.',
  scheme: [['Application and allotment entries (with the advance)', 2], ['First call entries (advance adjusted)', 1], ['Final call entries (advance adjusted, arrears)', 1], ['Bank Account', 2]],
}));

// ================================================================ t03 Calls in arrears and in advance; consideration other than cash
Q('m_advance_shown', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'In the balance sheet of a company, calls in advance are shown',
  opts: ["under Current Liabilities, as part of 'Other Current Liabilities'", 'under Shareholders’ Funds, added to the paid-up share capital', "under 'Reserves and Surplus'", "under Current Assets, as 'Other Current Assets'"],
  sol: 'Calls in advance are money received before it is due; until the call is made the company owes it to the shareholder, so it is a liability and not share capital.',
}));

const NJ = { shares: 500, inst: [2, 3, 2, 3] };
const NJv = NJ.shares * (NJ.inst[2] + NJ.inst[3]);
check(NJv === 2500, 'NJ');
Q('m_arrears_amt', mcq({
  t: 3, d: 3, c: 'application',
  stem: `An imagined company's shares of ₹10 each are payable ₹${NJ.inst[0]} on application, ₹${NJ.inst[1]} on allotment, ₹${NJ.inst[2]} on first call and ₹${NJ.inst[3]} on final call. Neeraj, holding ${sh(NJ.shares)}, paid the application and allotment money but neither call. After the final call, the calls in arrears on his shares amount to`,
  opts: [rs(NJv), rs(NJ.shares * NJ.inst[2]), rs(NJ.shares * NJ.inst[3]), rs(NJ.shares * 10)],
  sol: `He owes both calls: ${fig(NJ.shares)} × (₹${NJ.inst[2]} + ₹${NJ.inst[3]}) = ${fig(NJv)}.`,
}));

const VS = vendorShares(480000, 10, 12);
check(VS.n === 40000, 'VS');
Q('m_vendor_shares', mcq({
  t: 3, d: 3, c: 'application',
  stem: `An imagined company buys machinery for ${rs(480000)} and pays the vendor by issuing equity shares of ₹10 each at a premium of ₹2 per share. The number of shares issued to the vendor is`,
  opts: [sh(VS.n), sh(480000 / 10), sh(480000 / 8), sh(480000 / 2)],
  sol: `Each share is issued at ₹10 + ₹2 = ₹12, so the number of shares = ${fig(480000)} ÷ 12 = ${fig(VS.n)}.`,
}));

const MM = { cost: 630000, cheque: 30000, fv: 100, premPct: 20 };
const MMs = vendorShares(MM.cost - MM.cheque, MM.fv, MM.fv + (MM.fv * MM.premPct) / 100);
check(MMs.n === 5000, 'MM');
Q('n_vendor_shares', num({
  t: 3, d: 3, c: 'application', marks: 2, value: MMs.n, unit: 'shares',
  stem: `Mahi Motors Ltd, an imagined company, bought a building for ${rs(MM.cost)}. It paid ${rs(MM.cheque)} by cheque and the balance by issuing equity shares of ₹${MM.fv} each at a premium of ${MM.premPct} per cent. How many shares did it issue to the vendor?`,
  sol: `Balance payable in shares = ${fig(MM.cost)} − ${fig(MM.cheque)} = ${fig(MM.cost - MM.cheque)}. Issue price = ₹${MM.fv} + ₹${(MM.fv * MM.premPct) / 100} = ₹${MM.fv + (MM.fv * MM.premPct) / 100}. Number of shares = ${fig(MM.cost - MM.cheque)} ÷ ${MM.fv + (MM.fv * MM.premPct) / 100} = ${fig(MMs.n)}.`,
  scheme: [['Balance payable and issue price', 1], [`${fig(MMs.n)} shares`, 1]],
}));

{
  const B = new Books();
  const I = issue(B, { kind: 'Equity Share', fv: 10, n: 30000, arrearsAccount: true, inst: [{ name: 'Application', cap: 3 }, { name: 'Allotment', cap: 3 }, { name: 'First and Final Call', cap: 4 }], defaults: [{ who: 'Ajit', shares: 800, from: 1 }] });
  const callRecv = B.entries[I.ents.calls[1][1]].dr.find(([a]) => a === ACC.bank)[1];
  check(callRecv === (30000 - 800) * 4 && callRecv === 116800, 'n_arrears');
  Q('n_arrears', num({
    t: 3, d: 2, c: 'understanding', marks: 1, value: callRecv, unit: '₹',
    stem: `An imagined company allotted ${sh(I.allotted)} of ₹10 each, payable ${terms(I.inst)}. Ajit, holding ${sh(800)}, paid neither the allotment money nor the call; every other shareholder paid in full. How much cash did the company receive on the first and final call (in ₹)?`,
    sol: `Shares on which the call was paid = ${fig(I.allotted)} − ${fig(800)} = ${fig(I.allotted - 800)}. Cash received = ${fig(I.allotted - 800)} × ₹4 = ${fig(callRecv)}. So ₹${fig(callRecv)}.`,
  }));
}

Q('ar_advance', ar({
  t: 3, d: 2, c: 'understanding', key: 'c',
  a: 'Calls in advance is a liability of the company until the call to which it relates is made.',
  r: 'Calls in advance is added to the paid-up share capital in the notes to accounts.',
  sol: 'A is true. R is false: calls in advance is not share capital; it is shown under Other Current Liabilities until it is adjusted against the call.',
}));

Q('tf_vendor', tf({
  t: 3, d: 1, c: 'understanding', ans: true,
  stem: "True or false? When a company issues shares to a vendor in payment for assets bought from him, the vendor's account is debited and the Share Capital Account is credited.",
  sol: 'The vendor was credited when the assets were bought; issuing him shares discharges that debt, so his account is debited and Share Capital (and Securities Premium, if any) credited.',
}));

{
  const B = new Books();
  const V = vendorShares(450000, 10, 15);
  B.post({ dr: [['Land A/c', 300000], ['Machinery A/c', 200000]], cr: [['Vinay Traders A/c', 500000]], nar: 'land and machinery bought from Vinay Traders' });
  B.post({ dr: [['Vinay Traders A/c', 50000]], cr: [[ACC.bank, 50000]], nar: 'part payment made by cheque' });
  B.post({ dr: [['Vinay Traders A/c', 450000]], cr: [['Equity Share Capital A/c', V.cap], [ACC.sp, V.prem]], nar: `${fig(V.n)} equity shares of ₹10 each issued at ₹15 in full settlement` });
  check(B.bal('Vinay Traders A/c') === 0 && V.n === 30000, 'Pench');
  Q('s3_vendor', short({
    t: 3, d: 3, c: 'application', marks: 3,
    stem: `Pench Foods Ltd, an imagined company, bought land for ${rs(300000)} and machinery for ${rs(200000)} from Vinay Traders. It paid ${rs(50000)} by cheque and the balance by issuing equity shares of ₹10 each at a premium of ₹5 per share. Pass the journal entries.`,
    model: `Shares issued = (${fig(500000)} − ${fig(50000)}) ÷ ₹15 = ${fig(V.n)}.\n\n${B.journal().md}`,
    sol: 'First record the purchase with the vendor as creditor, then discharge him by cheque and by shares.',
    scheme: [['Purchase of assets', 1], ['Payment by cheque', 0.5], [`Issue of ${fig(V.n)} shares at a premium`, 1.5]],
  }));
}

{
  const B = new Books();
  const I = issue(B, {
    kind: 'Equity Share', fv: 10, n: 50000, arrearsAccount: true,
    inst: [{ name: 'Application', cap: 3 }, { name: 'Allotment', cap: 2 }, { name: 'First Call', cap: 3 }, { name: 'Second and Final Call', cap: 2 }],
    defaults: [{ who: 'Rohit', shares: 1500, from: 2 }],
    advance: [{ who: 'Leela', shares: 1000, at: 2, calls: [3] }],
  });
  const from = I.ents.calls[1][0];
  check(B.entries[from + 1].dr[0][1] === 147500 && B.entries[from + 3].dr[0][1] === 95000 && B.bal(ACC.cia) === 7500, 'Damodar');
  Q('s3_arrears_advance', short({
    t: 3, d: 3, c: 'application', marks: 3,
    stem: `Damodar Glass Ltd, an imagined company, has allotted ${sh(I.allotted)} of ₹10 each, payable ${terms(I.inst)}; the application and allotment money has been fully received. On the first call, Rohit, holding ${sh(1500)}, did not pay, while Leela, holding ${sh(1000)}, paid the final call as well. On the final call, Rohit again failed to pay. The company keeps Calls in Arrears and Calls in Advance accounts. Pass the journal entries for the two calls.`,
    model: B.journal(from).md,
    sol: 'Each call: one entry for the amount due, one for the cash with arrears and advance shown separately.',
    scheme: [['First call due', 0.5], ['First call received: arrears and advance', 1], ['Final call due', 0.5], ['Final call received: advance adjusted, arrears', 1]],
  }));
}

{
  const B = new Books();
  const assets = [['Buildings A/c', 450000], ['Machinery A/c', 200000], ['Stock A/c', 150000]];
  const creditors = 150000;
  const pc = 720000;
  const net = sum(assets.map(([, v]) => v)) - creditors;
  const gw = pc - net;
  const V = vendorShares(600000, 100, 125);
  B.post({ dr: [...assets, ['Goodwill A/c', gw]], cr: [['Creditors A/c', creditors], ['Sinha Brothers A/c', pc]], nar: 'business of Sinha Brothers taken over' });
  B.post({ dr: [['Sinha Brothers A/c', pc - 600000]], cr: [[ACC.bank, pc - 600000]], nar: 'part of the purchase consideration paid by cheque' });
  B.post({ dr: [['Sinha Brothers A/c', 600000]], cr: [['Equity Share Capital A/c', V.cap], [ACC.sp, V.prem]], nar: `${fig(V.n)} equity shares of ₹100 each issued at a premium of 25 per cent` });
  check(gw === 70000 && V.n === 4800 && B.bal('Sinha Brothers A/c') === 0, 'Tawa');
  Q('l4_vendor_business', long({
    t: 3, d: 4, c: 'analysis', marks: 4,
    stem: `Tawa Electricals Ltd, an imagined company, took over the business of Sinha Brothers: buildings ${rs(450000)}, machinery ${rs(200000)}, stock ${rs(150000)} and creditors ${rs(creditors)}, for a purchase consideration of ${rs(pc)}. It paid ${rs(pc - 600000)} by cheque and the rest by issuing equity shares of ₹100 each at a premium of 25 per cent. Pass the journal entries.`,
    model: `Net assets taken over = ${fig(sum(assets.map(([, v]) => v)))} − ${fig(creditors)} = ${fig(net)}. The consideration exceeds the net assets by ${fig(gw)}, which is goodwill. Shares issued = ${fig(600000)} ÷ ₹125 = ${fig(V.n)}.\n\n${B.journal().md}`,
    sol: 'Compare the consideration with net assets: an excess is goodwill, a shortfall would be capital reserve.',
    scheme: [[`Goodwill ${rs(gw)} worked out`, 1], ['Entry for the business taken over', 1.5], ['Payment by cheque', 0.5], ['Issue of shares at a premium', 1]],
  }));
}

{
  const B = new Books();
  const I = issue(B, {
    kind: 'Equity Share', fv: 10, n: 40000, arrearsAccount: false,
    inst: [{ name: 'Application', cap: 3 }, { name: 'Allotment', cap: 4 }, { name: 'First and Final Call', cap: 3 }],
    defaults: [{ who: 'Asha', shares: 300, from: 1 }, { who: 'Pooja', shares: 500, from: 2 }],
  });
  check(B.bal(I.A.inst[1]) === 1200 && B.bal(I.A.inst[2]) === 2400, 'Gomti');
  Q('l4_arrears_noaccount', long({
    t: 3, d: 3, c: 'application', marks: 4,
    stem: `Gomti Rubber Ltd, an imagined company, issued ${sh(I.allotted)} of ₹10 each at par, payable ${terms(I.inst)}. All the shares were applied for and allotted. Asha, holding ${sh(300)}, paid neither allotment nor call; Pooja, holding ${sh(500)}, did not pay the call. The company does not keep a Calls in Arrears Account. Pass the journal entries and state the balances left in the allotment and call accounts.`,
    model: `${B.journal().md}\n\nBalances left (debit): Equity Share Allotment A/c ${fig(B.bal(I.A.inst[1]))} (Asha ${fig(300)} × ₹4); Equity Share First and Final Call A/c ${fig(B.bal(I.A.inst[2]))} (Asha ${fig(300 * 3)} + Pooja ${fig(500 * 3)}).`,
    sol: 'Without an arrears account, the unpaid amounts simply remain as debit balances of the instalment accounts.',
    scheme: [['Application entries', 1], ['Allotment due and received', 1], ['Call due and received', 1], ['Balances left in the two accounts', 1]],
  }));
}

export const KOEL = (() => {
  const B = new Books();
  B.post({ dr: [['Incorporation Costs A/c', 100000]], cr: [['Equity Share Capital A/c', 100000]], nar: `${fig(10000)} fully paid equity shares issued to the promoters for their services` });
  const V = vendorShares(360000, 10, 12);
  B.post({ dr: [['Plant and Machinery A/c', 360000]], cr: [['Rawat Engineering A/c', 360000]], nar: 'plant bought from Rawat Engineering' });
  B.post({ dr: [['Rawat Engineering A/c', 360000]], cr: [['Equity Share Capital A/c', V.cap], [ACC.sp, V.prem]], nar: `${fig(V.n)} equity shares issued at a premium of ₹2 to the vendor` });
  const I = issue(B, { kind: 'Equity Share', fv: 10, n: 100000, arrearsAccount: true, inst: [{ name: 'Application', cap: 4 }, { name: 'Allotment', cap: 6 }], defaults: [{ who: 'Karan', shares: 2000, from: 1 }] });
  const N = shareNote({
    B, cap: I.A.cap, fv: 10, authorised: 200000, issued: 140000, arrearsBooks: B.bal(ACC.cia),
    rows: [{ label: `Subscribed and fully paid (including ${fig(40000)} shares allotted for consideration other than cash)`, n: 138000, called: 10 }, { label: 'Subscribed but not fully paid', n: 2000, called: 10, arrears: 12000 }],
  });
  const R = simpleNote('Reserves and Surplus', [['Securities Premium', -B.bal(ACC.sp)]], 2);
  check(V.n === 30000 && N.total === 1388000 && R.total === 60000, 'Koel');
  return { B, I, N, R };
})();
Q('l6_vendor_public', long({
  t: [3, 6], d: 3, c: 'application', marks: 6,
  stem: `Koel Pharma Ltd, an imagined company, was registered with an authorised capital of ${fig(200000)} equity shares of ₹10 each. In its first year it:\n\n1. issued ${sh(10000)} as fully paid to its promoters for their services in forming the company;\n2. bought plant for ${rs(360000)} from Rawat Engineering and paid by issuing equity shares at a premium of ₹2 per share;\n3. offered ${sh(100000)} to the public at par, payable ₹4 on application and ₹6 on allotment. All the shares were applied for and allotted; Karan, holding ${sh(2000)}, did not pay the allotment money. The company keeps a Calls in Arrears Account.\n\nPass the journal entries and prepare the notes to accounts on Share Capital and on Reserves and Surplus.`,
  model: `**Journal**\n\n${KOEL.B.journal().md}\n\n${KOEL.N.md}\n\n${KOEL.R.md}`,
  sol: 'Shares issued for services or assets are part of issued and subscribed capital just like the public issue.',
  scheme: [['Shares to promoters', 1], ['Plant bought and vendor paid in shares', 1.5], ['Public issue with calls in arrears', 2], ['Notes on share capital and reserves', 1.5]],
}));

// ================================================================ t04 Private placement, ESOP and sweat equity
Q('m_private_place', mcq({
  t: 4, d: 1, c: 'recall',
  stem: 'Private placement of shares means',
  opts: ['offering shares to a select group of persons, and not to the public at large, through a private placement offer letter', 'offering shares to the existing shareholders in proportion to their holdings', 'offering shares to the general public through a prospectus', 'issuing fully paid shares free of cost to the members out of reserves'],
  sol: 'A private placement is made to a chosen group of investors; a rights issue goes to existing members, a public issue goes through a prospectus, and free shares out of reserves are bonus shares.',
}));

Q('m_sweat', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Sweat equity shares are issued by a company to',
  opts: ['its employees or directors, at a discount or for consideration other than cash, for providing know-how or adding value', 'the general public at a premium through a prospectus', 'a vendor in payment for assets bought from him', 'its debenture holders on conversion of their debentures'],
  sol: 'Sweat equity rewards the know-how, intellectual property rights or value additions that employees or directors bring; it is the one case where a discount is allowed.',
}));

Q('m_esop', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'An Employee Stock Option Plan gives the employees of a company',
  opts: ["the right, but not the obligation, to buy the company's shares at a future date at a predetermined price", 'shares free of cost every year', 'an obligation to buy shares at the market price on a fixed date', 'a fixed rate of interest on part of their salary'],
  sol: 'It is an option: employees may buy shares after the vesting period at a price fixed in advance, usually below the market price, and are not bound to do so.',
}));

Q('ar_sweat', ar({
  t: 4, d: 3, c: 'analysis', key: 'd',
  a: 'Sweat equity shares can never be issued at a discount.',
  r: 'Sweat equity shares are issued to employees or directors for providing know-how, making available rights in the nature of intellectual property, or value additions.',
  sol: 'A is false: sweat equity shares (Section 54) may be issued at a discount or for consideration other than cash. R is true and describes their purpose.',
}));

Q('mt_modes', match({
  t: 4, d: 2, c: 'understanding', marks: 2,
  stem: 'Match each way of issuing shares in column A with its description in column B.',
  pairs: [
    ['Public issue', 'Offer to the public at large through a prospectus'],
    ['Private placement', 'Offer to a select group of persons through an offer letter'],
    ['Employee stock option', 'Option to employees to buy shares later at a price fixed now'],
    ['Sweat equity', 'Shares for know-how or value additions, at a discount or for non-cash consideration'],
  ],
  sol: 'Who is invited, and what they give in return, separates the four modes.',
}));

Q('s3_t04', short({
  t: 4, d: 2, c: 'understanding', marks: 3,
  stem: 'Explain the meaning of (i) private placement of shares, (ii) Employee Stock Option Plan and (iii) sweat equity shares.',
  model: '1. **Private placement:** an offer of shares by a company to a select group of persons (such as institutions or chosen investors), not to the public at large, through a private placement offer letter (Section 42 of the Companies Act 2013).\n2. **Employee Stock Option Plan:** an option given to the employees and whole-time directors of a company to buy its shares at a future date at a predetermined price, usually lower than the market price; employees may or may not exercise it after the vesting period.\n3. **Sweat equity shares:** shares issued by a company to its employees or directors at a discount or for consideration other than cash, for providing know-how, intellectual property rights or value additions (Section 54).',
  sol: 'One mark for each correct meaning.',
  scheme: [['Private placement', 1], ['Employee Stock Option Plan', 1], ['Sweat equity shares', 1]],
}));

// ================================================================ t05 Forfeiture and re-issue
Q('fb_forfeit', fb({
  t: 5, d: 1, c: 'recall',
  stem: 'On forfeiture of shares, the Share Capital Account is debited with the ___ amount of the forfeited shares.',
  acc: [['called-up', 'called up', 'called']],
  sol: 'Share Capital is debited with the called-up amount on those shares, because that is what had been credited to it.',
}));

const FP = { shares: 400, inst: [2, 3, 3], paid: 5 };
const FPv = FP.shares * FP.paid;
check(FPv === 2000 && FP.inst[0] + FP.inst[1] === FP.paid, 'FP');
Q('m_forfeit_par', mcq({
  t: 5, d: 3, c: 'application',
  stem: `An imagined company forfeited ${sh(FP.shares)} of ₹10 each, issued at par, on which ₹${sum(FP.inst)} per share had been called up. The holder had paid ₹${FP.inst[0]} on application and ₹${FP.inst[1]} on allotment but not the first call of ₹${FP.inst[2]}. The amount credited to Share Forfeiture Account is`,
  opts: [rs(FPv), rs(FP.shares * sum(FP.inst)), rs(FP.shares * FP.inst[2]), rs(FP.shares * 10)],
  sol: `Share Forfeiture is credited with the money actually received on the shares: ${fig(FP.shares)} × ₹${FP.paid} = ${fig(FPv)}.`,
}));

{
  const B = new Books();
  const I = issue(B, { kind: 'Share', fv: 10, n: 10000, made: 2, inst: [{ name: 'Application', cap: 3 }, { name: 'Allotment', cap: 3, prem: 2 }, { name: 'First and Final Call', cap: 4 }], defaults: [{ who: 'Hemant', shares: 300, from: 1 }] });
  const R = forfeit(B, I, ['Hemant']);
  check(R.sc === 1800 && R.sp === 600 && R.sf === 900 && R.crs[0][1] === 1500, 'm_forfeit_prem');
  Q('m_forfeit_prem', mcq({
    t: 5, d: 3, c: 'analysis',
    stem: `An imagined company issued shares of ₹10 each at a premium of ₹2, payable ${terms(I.inst)}. Hemant, holding ${sh(300)}, paid the application money but not the allotment money, and his shares were forfeited after allotment (before the call). The forfeiture entry is`,
    opts: [
      `Share Capital A/c Dr ${rs(R.sc)} and Securities Premium A/c Dr ${rs(R.sp)}; To Share Allotment A/c ${rs(R.crs[0][1])} and To Share Forfeiture A/c ${rs(R.sf)}`,
      `Share Capital A/c Dr ${rs(R.sc + R.sp)}; To Share Allotment A/c ${rs(R.crs[0][1])} and To Share Forfeiture A/c ${rs(R.sf)}`,
      `Share Capital A/c Dr ${rs(R.sc)}; To Share Allotment A/c ${rs(R.sf)} and To Share Forfeiture A/c ${rs(R.sf)}`,
      `Share Capital A/c Dr ${rs(300 * 10)}; To Share Allotment A/c ${rs(R.crs[0][1])} and To Share Forfeiture A/c ${rs(300 * 10 - R.crs[0][1])}`,
    ],
    sol: `Called-up capital = ${fig(300)} × ₹6 = ${fig(R.sc)}. The premium of ${fig(R.sp)} was due with allotment and not received, so Securities Premium is debited too. Unpaid allotment = ${fig(300)} × ₹5 = ${fig(R.crs[0][1])}; Share Forfeiture gets the ${fig(R.sf)} actually received.`,
  }));
}

{
  const B = forfeitedBook(500, 10, 4);
  const maxDisc = -B.bal(ACC.sf);
  check(maxDisc === 2000, 'max disc');
  Q('m_reissue_max_disc', mcq({
    t: 5, d: 3, c: 'application',
    stem: `An imagined company forfeited ${sh(500)} of ₹10 each, fully called up, on which only ₹4 per share had been received. The maximum total discount at which these shares can be re-issued as fully paid is`,
    opts: [rs(maxDisc), rs(500 * 6), rs(500 * 10), rs(500 * 2)],
    sol: `The discount on re-issue cannot exceed the amount forfeited on those shares: ${fig(500)} × ₹4 = ${fig(maxDisc)}, that is ₹4 per share.`,
  }));
}

{
  const B = forfeitedBook(600, 10, 7);
  const R = reissue(B, { cap: 'Share Capital A/c', shares: 600, price: 8, credited: 10, forfeitedOn: 4200 });
  check(R.toCR === 3000, 'm_cap_reserve');
  Q('m_cap_reserve', mcq({
    t: 5, d: 3, c: 'application',
    stem: `${sh(600)} of ₹10 each of an imagined company were forfeited for non-payment of the final call of ₹3 per share; everything else had been paid. All these shares were re-issued as fully paid at ₹8 per share. The amount transferred to Capital Reserve is`,
    opts: [rs(R.toCR), rs(4200), rs(R.disc), rs(600 * 8)],
    sol: `Amount forfeited = ${fig(600)} × ₹7 = ${fig(4200)}. Discount on re-issue = ${fig(600)} × ₹2 = ${fig(R.disc)}. Capital Reserve = ${fig(4200)} − ${fig(R.disc)} = ${fig(R.toCR)}.`,
  }));
}

{
  const B = forfeitedBook(1000, 10, 6);
  const R = reissue(B, { cap: 'Share Capital A/c', shares: 700, price: 8, credited: 10, forfeitedOn: 700 * 6 });
  check(R.toCR === 2800 && -B.bal(ACC.sf) === 1800, 'm_reissue_part');
  Q('m_reissue_part', mcq({
    t: 5, d: 4, c: 'analysis',
    stem: `An imagined company forfeited ${sh(1000)} of ₹10 each on which ₹6 per share had been received. Of these, ${sh(700)} were re-issued as fully paid at ₹8 per share. The amount to be transferred to Capital Reserve now is`,
    opts: [rs(R.toCR), rs(6000 - R.disc), rs(700 * 6), rs(-B.bal(ACC.sf))],
    sol: `Only the re-issued shares count: forfeited on ${fig(700)} shares = ${fig(700 * 6)}, less discount ${fig(R.disc)} = ${fig(R.toCR)}. The ${fig(-B.bal(ACC.sf))} on the other 300 shares stays in Share Forfeiture until they are re-issued.`,
  }));
}

{
  const B = new Books();
  const I = issue(B, { kind: 'Equity Share', fv: 10, n: 5000, inst: [{ name: 'Application', cap: 3 }, { name: 'Allotment', cap: 3, prem: 2 }, { name: 'First and Final Call', cap: 4 }], defaults: [{ who: 'Yamini', shares: 200, from: 2 }] });
  const Fo = forfeit(B, I, ['Yamini']);
  const R = reissue(B, { cap: I.A.cap, shares: 200, price: 9, credited: 10, forfeitedOn: Fo.sf });
  check(Fo.sp === 0 && Fo.sf === 1200 && R.toCR === 1000, 'n_capreserve');
  Q('n_capreserve', num({
    t: 5, d: 3, c: 'application', marks: 2, value: R.toCR, unit: '₹',
    stem: `An imagined company issued equity shares of ₹10 each at a premium of ₹2, payable ${terms(I.inst)}. Yamini, holding ${sh(200)}, paid the application and allotment money but not the call, and her shares were forfeited. They were later re-issued as fully paid at ₹9 per share. Find the amount transferred to Capital Reserve (in ₹).`,
    sol: `Money received towards capital = ₹3 + ₹3 = ₹6 per share (the premium was received and stays in Securities Premium), so forfeited amount = ${fig(200)} × 6 = ${fig(Fo.sf)}. Discount on re-issue = ${fig(200)} × 1 = ${fig(R.disc)}. Capital Reserve = ${fig(Fo.sf)} − ${fig(R.disc)} = ${fig(R.toCR)}. So ₹${fig(R.toCR)}.`,
    scheme: [[`Forfeited amount ${rs(Fo.sf)}`, 1], [`Capital Reserve ${rs(R.toCR)}`, 1]],
  }));
}

Q('ar_forfeit', ar({
  t: [5, 6], d: 3, c: 'analysis', key: 'b',
  a: 'When forfeited shares are re-issued at a discount, the discount is debited to the Share Forfeiture Account.',
  r: 'The balance of the Share Forfeiture Account on shares not yet re-issued is added to subscribed capital in the note on share capital.',
  sol: 'Both are true, but R is about how an unused forfeiture balance is shown; it does not explain why the discount on re-issue is charged to that account (the forfeited money absorbs it).',
}));

Q('tf_reissue', tf({
  t: 5, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? Forfeited shares may be re-issued at a discount larger than the amount forfeited on them, provided the board of directors approves.',
  sol: 'The discount on re-issue can never exceed the amount forfeited on those shares, whatever the board decides; otherwise the shares would in effect be issued at a discount.',
}));

{
  const B = new Books();
  const I = issue(B, {
    kind: 'Equity Share', fv: 10, n: 25000, arrearsAccount: true,
    inst: [{ name: 'Application', cap: 2 }, { name: 'Allotment', cap: 3 }, { name: 'First Call', cap: 2 }, { name: 'Second and Final Call', cap: 3 }],
    defaults: [{ who: 'Anil', shares: 250, from: 1 }, { who: 'Bina', shares: 150, from: 2 }],
  });
  const Fo = forfeit(B, I, ['Anil', 'Bina']);
  check(Fo.sc === 4000 && Fo.sf === 1250 && Fo.crs[0][1] === 2750, 'Dhauli');
  const p = Fo.per;
  Q('s3_forfeit_entry', short({
    t: 5, d: 3, c: 'application', marks: 3,
    stem: `Dhauli Granites Ltd, an imagined company, issued equity shares of ₹10 each at par, payable ${terms(I.inst)}. Anil, holding ${sh(250)}, paid only the application money; Bina, holding ${sh(150)}, paid the application and allotment money but neither call. After the final call, the shares of both were forfeited. The company keeps a Calls in Arrears Account. Pass the journal entry for forfeiture.`,
    model: `${md(['Shareholder', 'Called up (₹)', 'Unpaid: calls in arrears (₹)', 'Received: forfeited (₹)'], [
      ['Anil', fig(p.Anil.capCalled), fig(p.Anil.unpaidAll), fig(p.Anil.forfeited)],
      ['Bina', fig(p.Bina.capCalled), fig(p.Bina.unpaidAll), fig(p.Bina.forfeited)],
      ['**Total**', `**${fig(Fo.sc)}**`, `**${fig(Fo.crs[0][1])}**`, `**${fig(Fo.sf)}**`],
    ], [1, 2, 3])}\n\n${B.journal(Fo.idx).md}`,
    sol: 'Called-up amount debited; what was not paid and what was paid are credited separately.',
    scheme: [['Share Capital debited with the called-up amount', 1], ['Calls in Arrears credited', 1], ['Share Forfeiture credited', 1]],
  }));
}

{
  const B = forfeitedBook(800, 10, 6);
  const R = reissue(B, { cap: 'Share Capital A/c', shares: 500, price: 7, credited: 10, forfeitedOn: 500 * 6 });
  check(R.disc === 1500 && R.toCR === 1500 && -B.bal(ACC.sf) === 1800, 'Sharda');
  Q('s3_reissue', short({
    t: 5, d: 3, c: 'application', marks: 3,
    stem: `Sharda Marble Ltd, an imagined company, had forfeited ${sh(800)} of ₹10 each, fully called up, on which ₹6 per share had been received. It re-issued ${sh(500)} of them as fully paid at ₹7 per share. Pass the journal entries for the re-issue and the transfer to Capital Reserve, and find the balance left in Share Forfeiture Account.`,
    model: `Forfeited on the ${sh(500)} re-issued = ${fig(500)} × ₹6 = ${fig(3000)}; discount = ${fig(500)} × ₹3 = ${fig(R.disc)}; to Capital Reserve = ${fig(R.toCR)}.\n\n${B.journal(R.e1).md}\n\nBalance left in Share Forfeiture A/c = ${fig(4800)} − ${fig(R.disc)} − ${fig(R.toCR)} = **${fig(-B.bal(ACC.sf))}** (${fig(300)} shares × ₹6, not yet re-issued).`,
    sol: 'Work per re-issued share; the unissued shares keep their forfeited amount in the account.',
    scheme: [['Re-issue entry', 1], ['Transfer to Capital Reserve', 1], ['Balance in Share Forfeiture', 1]],
  }));
}

{
  const B = new Books();
  const I = issue(B, { kind: 'Equity Share', fv: 10, n: 15000, arrearsAccount: false, inst: [{ name: 'Application', cap: 3 }, { name: 'Allotment', cap: 2, prem: 3 }, { name: 'First and Final Call', cap: 5 }], defaults: [{ who: 'Pallavi', shares: 600, from: 2 }] });
  const Fo = forfeit(B, I, ['Pallavi']);
  const R = reissue(B, { cap: I.A.cap, shares: 600, price: 8, credited: 10, forfeitedOn: Fo.sf });
  check(Fo.sf === 3000 && Fo.sp === 0 && R.toCR === 1800, 'Barak');
  Q('l4_forfeit_reissue', long({
    t: 5, d: 3, c: 'application', marks: 4,
    stem: `Barak Bamboo Ltd, an imagined company, issued equity shares of ₹10 each at a premium of ₹3, payable ${terms(I.inst)}. Pallavi, holding ${sh(600)}, paid the application and allotment money but failed to pay the call, and her shares were forfeited. They were then re-issued as fully paid at ₹8 per share. The company does not keep a Calls in Arrears Account. Pass the journal entries for forfeiture and re-issue.`,
    model: `Pallavi paid ₹3 + ₹5 = ₹8 per share, of which ₹3 was premium; money received towards capital = ₹5 per share, so ${fig(Fo.sf)} is forfeited. The premium was received, so Securities Premium is not debited.\n\n${B.journal(Fo.idx).md}`,
    sol: 'Forfeit at the called-up value, re-issue at the agreed price, then clear the gain to Capital Reserve.',
    scheme: [['Forfeiture entry (premium not debited)', 1.5], ['Re-issue at a discount', 1.5], [`Capital Reserve ${rs(R.toCR)}`, 1]],
  }));
}

{
  const B = new Books();
  const I = issue(B, { kind: 'Equity Share', fv: 10, n: 80000, arrearsAccount: false, inst: [{ name: 'Application', cap: 3 }, { name: 'Allotment', cap: 4 }, { name: 'First and Final Call', cap: 3 }], groups: [{ applied: 120000, allotted: 80000 }], defaults: [{ who: 'Nitin', shares: 1000, from: 1 }] });
  const Fo = forfeit(B, I, ['Nitin']);
  const R = reissue(B, { cap: I.A.cap, shares: 1000, price: 7, credited: 10, forfeitedOn: Fo.sf });
  const n = Fo.per.Nitin;
  check(n.applied === 1500 && I.unpaid(n, 1) === 2500 && Fo.sf === 4500 && R.toCR === 1500, 'Luni');
  Q('l4_prorata_default', long({
    t: [2, 5], d: 4, c: 'analysis', marks: 4,
    stem: `Luni Salt Ltd, an imagined company, offered ${sh(I.s.n)} of ₹10 each at par, payable ${terms(I.inst)}. Applications were received for ${sh(I.applied)}, and shares were allotted pro-rata to all applicants; excess application money was adjusted towards allotment. Nitin, who had applied for ${sh(n.applied)}, paid neither allotment nor call money, and his shares were forfeited after the call. The forfeited shares were re-issued as fully paid at ₹7 per share. The company does not keep a Calls in Arrears Account. Calculate Nitin's unpaid allotment money and pass the entries for forfeiture and re-issue.`,
    model: `Shares allotted to Nitin = ${fig(n.applied)} × ${fig(I.allotted)}/${fig(I.applied)} = ${fig(n.shares)}. Excess application money = (${fig(n.applied)} − ${fig(n.shares)}) × ₹3 = ${fig(n.adj)}. Allotment due = ${fig(n.shares)} × ₹4 = ${fig(n.shares * 4)}; **unpaid = ${fig(I.unpaid(n, 1))}**. Money received = ${fig(n.applied)} × ₹3 = ${fig(Fo.sf)}, all forfeited.\n\n${B.journal(Fo.idx).md}`,
    sol: 'The excess application money is part of what a pro-rata defaulter has paid, so it is forfeited with the rest.',
    scheme: [['Shares allotted and unpaid allotment', 1], ['Forfeiture entry', 1.5], ['Re-issue and Capital Reserve', 1.5]],
  }));
}

export const TEESTA = (() => {
  const B = new Books();
  const I = issue(B, {
    kind: 'Equity Share', fv: 10, n: 50000, arrearsAccount: true,
    inst: [{ name: 'Application', cap: 3 }, { name: 'Allotment', cap: 3, prem: 4 }, { name: 'First and Final Call', cap: 4 }],
    defaults: [{ who: 'Raju', shares: 500, from: 1 }, { who: 'Meena', shares: 300, from: 2 }],
  });
  const Fo = forfeit(B, I, ['Raju', 'Meena']);
  const on = Fo.per.Raju.forfeited + F(Fo.per.Meena.forfeited, 300).mul(100).of(1);
  const R = reissue(B, { cap: I.A.cap, shares: 600, price: 11, credited: 10, forfeitedOn: on });
  check(Fo.sp === 2000 && Fo.sf === 3300 && R.prem === 600 && R.toCR === 2100 && -B.bal(ACC.sf) === 1200, 'Teesta');
  return { B, I, Fo, R, on };
})();
Q('l6_forfeit_prem', long({
  t: 5, d: 4, c: 'analysis', marks: 6,
  stem: `Teesta Spices Ltd, an imagined company, issued ${sh(TEESTA.I.allotted)} of ₹10 each at a premium of ₹4, payable ${terms(TEESTA.I.inst)}. All the shares were applied for and allotted. Raju, holding ${sh(500)}, did not pay the allotment money or the call; Meena, holding ${sh(300)}, did not pay the call. Their shares were forfeited after the call. Later, ${sh(600)} of the forfeited shares (all of Raju's and ${fig(100)} of Meena's) were re-issued as fully paid at ₹11 per share. The company keeps a Calls in Arrears Account. Pass the journal entries.`,
  model: `**Forfeiture:** Raju paid only ₹3 per share and the premium on his shares was not received, so Securities Premium is debited with ${fig(500)} × ₹4 = ${fig(TEESTA.Fo.sp)}; forfeited ${fig(TEESTA.Fo.per.Raju.forfeited)}. Meena paid ₹3 + ₹3 towards capital: forfeited ${fig(TEESTA.Fo.per.Meena.forfeited)}.\n\n**Re-issue:** at ₹11 for a ₹10 share there is a premium of ${fig(TEESTA.R.prem)}, no discount. Forfeited on the re-issued shares = ${fig(TEESTA.Fo.per.Raju.forfeited)} + ${fig(100)} × ₹6 = ${fig(TEESTA.on)}, all transferred to Capital Reserve; ${fig(-TEESTA.B.bal(ACC.sf))} stays for Meena's other ${fig(200)} shares.\n\n${TEESTA.B.journal().md}`,
  sol: 'Debit premium on forfeiture only where it was never received; credit premium on re-issue only where the price exceeds the amount credited.',
  scheme: [['Application, allotment and call entries with arrears', 2], ['Forfeiture entry including Securities Premium', 1.5], ['Re-issue at a premium', 1], ['Transfer to Capital Reserve', 1.5]],
}));

export const BHAVANI = (() => {
  const B = new Books();
  const I = issue(B, {
    kind: 'Equity Share', fv: 10, n: 30000, arrearsAccount: false,
    inst: [{ name: 'Application', cap: 2, prem: 2 }, { name: 'Allotment', cap: 3 }, { name: 'First and Final Call', cap: 5 }],
    groups: [{ applied: 45000, allotted: 30000 }],
    defaults: [{ who: 'Deepa', shares: 600, from: 1 }],
  });
  const Fo = forfeit(B, I, ['Deepa']);
  const R = reissue(B, { cap: I.A.cap, shares: 600, price: 8, credited: 10, forfeitedOn: Fo.sf });
  check(I.unpaid(Fo.per.Deepa, 1) === 600 && Fo.sf === 2400 && R.toCR === 1200, 'Bhavani');
  return { B, I, Fo, R };
})();
Q('l6_full_forfeit', long({
  t: [2, 5], d: 4, c: 'analysis', marks: 6,
  stem: `Bhavani Looms Ltd, an imagined company in Erode, offered ${sh(BHAVANI.I.s.n)} of ₹10 each at a premium of ₹2, payable ${terms(BHAVANI.I.inst)}. Applications were received for ${sh(BHAVANI.I.applied)}; shares were allotted pro-rata, and excess application money was adjusted towards allotment. Deepa, who had been allotted ${sh(600)}, failed to pay the allotment money and the call, and her shares were forfeited. They were re-issued as fully paid at ₹8 per share. The company does not keep a Calls in Arrears Account. Pass the journal entries.`,
  model: `Deepa applied for ${fig(BHAVANI.Fo.per.Deepa.applied)} shares; her excess = ${fig(300)} × ₹4 = ${fig(BHAVANI.Fo.per.Deepa.adj)}, so she owed ${fig(600 * 3)} − ${fig(BHAVANI.Fo.per.Deepa.adj)} = ${fig(600)} on allotment. On forfeiture, Share Forfeiture gets what she paid towards capital: ${fig(BHAVANI.Fo.per.Deepa.paid)} received less ${fig(600 * 2)} premium = ${fig(BHAVANI.Fo.sf)}.\n\n${BHAVANI.B.journal().md}`,
  sol: 'Premium was collected with application, so it was received even from the defaulter and is not reversed.',
  scheme: [['Application entries with premium and adjustment', 1.5], ['Allotment due and received', 1], ['Call due and received', 1], ['Forfeiture', 1.5], ['Re-issue and Capital Reserve', 1]],
}));

export const KOYNA = (() => {
  const B = new Books();
  const I = issue(B, {
    kind: 'Equity Share', fv: 10, n: 20000, arrearsAccount: false, made: 3,
    inst: [{ name: 'Application', cap: 2 }, { name: 'Allotment', cap: 3 }, { name: 'First Call', cap: 3 }, { name: 'Second and Final Call', cap: 2 }],
    defaults: [{ who: 'Hari', shares: 400, from: 1 }, { who: 'Gita', shares: 200, from: 2 }],
  });
  const Fo = forfeit(B, I, ['Hari', 'Gita']);
  const on = Fo.per.Hari.forfeited + F(Fo.per.Gita.forfeited, 200).mul(100).of(1);
  const R = reissue(B, { cap: I.A.cap, shares: 500, price: 6, credited: 8, forfeitedOn: on });
  check(Fo.sf === 1800 && on === 1300 && R.disc === 1000 && R.toCR === 300 && -B.bal(ACC.sf) === 500, 'Koyna');
  return { B, I, Fo, R, on };
})();
Q('l6_forfeit_partial', long({
  t: 5, d: 3, c: 'application', marks: 6,
  stem: `Koyna Valves Ltd, an imagined company, issued ${sh(KOYNA.I.allotted)} of ₹10 each at par, payable ${terms(KOYNA.I.inst)}. The final call has not yet been made. Hari, holding ${sh(400)}, did not pay the allotment money or the first call; Gita, holding ${sh(200)}, did not pay the first call. After the first call their shares were forfeited. Of these, ${sh(500)} (all of Hari's and ${fig(100)} of Gita's) were re-issued as ₹8 paid up for ₹6 per share. The company does not keep a Calls in Arrears Account. Pass the journal entries for forfeiture and re-issue and prepare the Share Forfeiture Account.`,
  model: `Called up so far = ₹8 per share. Forfeited: Hari ${fig(400)} × ₹2 = ${fig(KOYNA.Fo.per.Hari.forfeited)}; Gita ${fig(200)} × ₹5 = ${fig(KOYNA.Fo.per.Gita.forfeited)}. On re-issue, ₹8 per share is credited to capital and the discount is ${fig(500)} × ₹2 = ${fig(KOYNA.R.disc)}. Forfeited on the re-issued shares = ${fig(KOYNA.Fo.per.Hari.forfeited)} + ${fig(100)} × ₹5 = ${fig(KOYNA.on)}; Capital Reserve = ${fig(KOYNA.on)} − ${fig(KOYNA.R.disc)} = ${fig(KOYNA.R.toCR)}.\n\n${KOYNA.B.journal(KOYNA.Fo.idx).md}\n\n**Share Forfeiture Account**\n\n${KOYNA.B.ledgerOf(ACC.sf).md}`,
  sol: 'Shares forfeited when partly called are re-issued at the same paid-up value; the account keeps the amount on unissued shares.',
  scheme: [['Forfeiture entry at ₹8 called up', 2], ['Re-issue entry with discount', 1.5], ['Transfer to Capital Reserve', 1], ['Share Forfeiture Account with balance', 1.5]],
}));

// ================================================================ t06 Disclosure in the balance sheet
Q('m_arrears_note', mcq({
  t: 6, d: 2, c: 'understanding',
  stem: 'In the note to accounts on Share Capital, calls in arrears are',
  opts: ['deducted from the subscribed capital that is not fully paid', 'added to the subscribed capital', "shown under 'Other Current Liabilities'", "shown under 'Reserves and Surplus'"],
  sol: 'Calls in arrears are amounts called up but not received, so they are deducted from the called-up figure of the shares that are not fully paid.',
}));

Q('m_forfeit_shown', mcq({
  t: 6, d: 2, c: 'understanding',
  stem: 'The balance of Share Forfeiture Account relating to shares not yet re-issued is shown in the balance sheet',
  opts: ['in the note on Share Capital, added to the subscribed capital', "under 'Reserves and Surplus' as Capital Reserve", "under 'Other Current Liabilities'", 'as a deduction from Securities Premium'],
  sol: 'Until those shares are re-issued the forfeited money is capital in nature and linked to them, so it is added to subscribed capital in the share capital note; only the gain on re-issued shares becomes Capital Reserve.',
}));

const PU = { n: 80000, called: 7, arrears: 6000 };
const PUv = PU.n * PU.called - PU.arrears;
check(PUv === 554000, 'PU');
Q('n_paidup', num({
  t: 6, d: 3, c: 'application', marks: 1, value: PUv, unit: '₹',
  stem: `An imagined company has ${fig(PU.n)} equity shares of ₹10 each subscribed, on which ₹${PU.called} per share has been called up; calls in arrears are ${rs(PU.arrears)}. What amount is shown as subscribed but not fully paid capital, net of calls in arrears, in the note on Share Capital (in ₹)?`,
  sol: `Called up = ${fig(PU.n)} × ₹${PU.called} = ${fig(PU.n * PU.called)}. Less calls in arrears ${fig(PU.arrears)}: ${fig(PU.n * PU.called)} − ${fig(PU.arrears)} = ${fig(PUv)}. So ₹${fig(PUv)}.`,
}));

{
  const B = new Books();
  const I = issue(B, {
    kind: 'Equity Share', fv: 10, n: 70000, applied: 64000, arrearsAccount: true,
    inst: [{ name: 'Application', cap: 2 }, { name: 'Allotment', cap: 3 }, { name: 'First Call', cap: 2 }, { name: 'Second and Final Call', cap: 3 }],
    defaults: [{ who: 'Tarun', shares: 500, from: 2 }, { who: 'Usha', shares: 1000, from: 3 }],
  });
  const Fo = forfeit(B, I, ['Tarun']);
  const N = shareNote({ B, cap: I.A.cap, fv: 10, authorised: 100000, issued: 70000, forfeited: Fo.sf, arrearsBooks: B.bal(ACC.cia), rows: [{ label: 'Subscribed and fully paid', n: 62500, called: 10 }, { label: 'Subscribed but not fully paid', n: 1000, called: 10, arrears: 3000 }] });
  const BS = bsIII({ eq: [["Shareholders' Funds", [['Share Capital', 1, N.total]]]], assets: [['Current Assets', [['Cash and Cash Equivalents', 2, B.bal(ACC.bank)]]]] });
  check(N.total === 634500 && Fo.sf === 2500, 'Kalindi');
  Q('s3_disclosure', short({
    t: 6, d: 3, c: 'application', marks: 3,
    stem: `Kalindi Fans Ltd, an imagined company, has an authorised capital of ${fig(100000)} equity shares of ₹10 each. It offered ${sh(70000)} to the public, received applications for ${sh(64000)} and allotted them all; all the calls have since been made. Usha, holding ${sh(1000)}, has not paid the final call of ₹3 per share. Tarun's ${sh(500)}, on which ₹5 per share had been received, were forfeited and have not been re-issued. Show the share capital in the balance sheet of the company and prepare the note on Share Capital.`,
    model: `**Balance Sheet (extract)**\n\n${BS.md}\n\n${N.md}`,
    sol: 'Separate fully paid from not fully paid shares, deduct the arrears, and add the forfeited money on unissued shares.',
    scheme: [['Authorised, issued and fully paid capital', 1], ['Not fully paid shares less calls in arrears', 1], ['Forfeited shares added; balance sheet figure', 1]],
  }));
}

export const KABINI = (() => {
  const B = new Books();
  const I = issue(B, {
    kind: 'Equity Share', fv: 10, n: 100000, arrearsAccount: true, made: 3,
    inst: [{ name: 'Application', cap: 3 }, { name: 'Allotment', cap: 3, prem: 2 }, { name: 'First Call', cap: 2 }, { name: 'Second and Final Call', cap: 2 }],
    defaults: [{ who: 'Suresh', shares: 2000, from: 2 }],
    advance: [{ who: 'Kiran', shares: 1000, at: 2, calls: [3] }],
  });
  const N = shareNote({ B, cap: I.A.cap, fv: 10, authorised: 200000, issued: 100000, arrearsBooks: B.bal(ACC.cia), rows: [{ label: 'Subscribed but not fully paid', n: 100000, called: 8, arrears: 4000 }] });
  const R = simpleNote('Reserves and Surplus', [['Securities Premium', -B.bal(ACC.sp)]], 2);
  const L = simpleNote('Other Current Liabilities', [['Calls in Advance', -B.bal(ACC.adv)]], 3);
  const BS = bsIII({
    eq: [["Shareholders' Funds", [['Share Capital', 1, N.total], ['Reserves and Surplus', 2, R.total]]], ['Current Liabilities', [['Other Current Liabilities', 3, L.total]]]],
    assets: [['Current Assets', [['Cash and Cash Equivalents', 4, B.bal(ACC.bank)]]]],
  });
  check(N.total === 796000 && R.total === 200000 && L.total === 2000 && BS.total === 998000, 'Kabini');
  return { B, I, N, R, L, BS };
})();
Q('l4_disclosure', long({
  t: [3, 6], d: 3, c: 'application', marks: 4,
  stem: `Kabini Tiles Ltd, an imagined company with an authorised capital of ${fig(200000)} equity shares of ₹10 each, issued ${sh(100000)} at a premium of ₹2, payable ${terms(KABINI.I.inst)}. All the shares were applied for and allotted. The first call has been made but not the final call. Suresh, holding ${sh(2000)}, did not pay the first call, and Kiran, holding ${sh(1000)}, paid the final call along with the first call. All other money was received. Prepare the balance sheet of the company (it has no other transactions) with the notes to accounts.`,
  model: `Called up = ₹3 + ₹3 + ₹2 = ₹8 per share. Cash = ${fig(KABINI.I.allotted * 3)} + ${fig(KABINI.I.allotted * 5)} + ${fig(KABINI.I.allotted * 2)} − ${fig(4000)} (arrears) + ${fig(2000)} (advance) = ${fig(KABINI.B.bal(ACC.bank))}.\n\n**Balance Sheet of Kabini Tiles Ltd**\n\n${KABINI.BS.md}\n\n${KABINI.N.md}\n\n${KABINI.R.md}\n\n${KABINI.L.md}\n\nNote 4: Cash and Cash Equivalents — Cash at bank ${fig(KABINI.B.bal(ACC.bank))}.`,
  sol: 'Arrears reduce share capital; advance money is a liability; premium sits in reserves; cash balances the two sides.',
  scheme: [['Share capital note with calls in arrears', 1.5], ['Reserves and Surplus (securities premium)', 0.5], ['Calls in advance as other current liability', 1], ['Cash and totals of the balance sheet', 1]],
}));

export const SARASVATI = (() => {
  const B = new Books();
  const I = issue(B, { kind: 'Equity Share', fv: 10, n: 60000, arrearsAccount: true, inst: [{ name: 'Application', cap: 3 }, { name: 'Allotment', cap: 3 }, { name: 'First and Final Call', cap: 4 }], defaults: [{ who: 'Vikas', shares: 1000, from: 1 }] });
  const Fo = forfeit(B, I, ['Vikas']);
  const R = reissue(B, { cap: I.A.cap, shares: 600, price: 9, credited: 10, forfeitedOn: 600 * 3 });
  const N = shareNote({ B, cap: I.A.cap, fv: 10, authorised: 100000, issued: 60000, forfeited: -B.bal(ACC.sf), arrearsBooks: B.bal(ACC.cia), rows: [{ label: 'Subscribed and fully paid', n: 59600, called: 10 }] });
  const RS = simpleNote('Reserves and Surplus', [['Capital Reserve', -B.bal(ACC.cr)]], 2);
  const BS = bsIII({ eq: [["Shareholders' Funds", [['Share Capital', 1, N.total], ['Reserves and Surplus', 2, RS.total]]]], assets: [['Current Assets', [['Cash and Cash Equivalents', 3, B.bal(ACC.bank)]]]] });
  check(Fo.sf === 3000 && R.toCR === 1200 && N.total === 597200 && BS.total === 598400, 'Sarasvati');
  return { B, I, Fo, R, N, RS, BS };
})();
Q('l6_issue_disclosure', long({
  t: [5, 6], d: 3, c: 'application', marks: 6,
  stem: `Sarasvati Bearings Ltd, an imagined company with an authorised capital of ${fig(100000)} equity shares of ₹10 each, issued ${sh(60000)} at par, payable ${terms(SARASVATI.I.inst)}. All the shares were applied for and allotted. Vikas, holding ${sh(1000)}, paid only the application money; after the call his shares were forfeited. Of these, ${sh(600)} were later re-issued as fully paid at ₹9 per share. All other money was received, and the company keeps a Calls in Arrears Account. Pass the journal entries for forfeiture and re-issue, and prepare the balance sheet (the company has no other transactions) with notes on Share Capital and Reserves and Surplus.`,
  model: `**Journal (forfeiture and re-issue)**\n\n${SARASVATI.B.journal(SARASVATI.Fo.idx).md}\n\nShares now held: ${fig(60000)} − ${fig(1000)} + ${fig(600)} = ${fig(59600)}, all fully paid. Share Forfeiture left on ${fig(400)} unissued shares = ${fig(400)} × ₹3 = ${fig(-SARASVATI.B.bal(ACC.sf))}.\n\n**Balance Sheet of Sarasvati Bearings Ltd**\n\n${SARASVATI.BS.md}\n\n${SARASVATI.N.md}\n\n${SARASVATI.RS.md}\n\nNote 3: Cash and Cash Equivalents — Cash at bank ${fig(SARASVATI.B.bal(ACC.bank))}.`,
  sol: 'After a partial re-issue, the forfeiture balance on unissued shares goes into the share capital note and the gain on re-issued shares into reserves.',
  scheme: [['Forfeiture entry', 1.5], ['Re-issue and transfer to Capital Reserve', 1.5], ['Note on Share Capital', 1.5], ['Reserves and Surplus and balance sheet totals', 1.5]],
}));

export const FACTS = [
  `Chambal Cables refund ${fig(CHAMBAL.I.refT)} and adjustment ${fig(CHAMBAL.I.adjT)}`,
  `Sutlej Agro bank ${fig(SUTLEJ.B.bal(ACC.bank))}`,
  `Koel Pharma share capital ${fig(KOEL.N.total)}`,
  `Teesta Spices capital reserve ${fig(TEESTA.R.toCR)}`,
  `Bhavani Looms forfeiture ${fig(BHAVANI.Fo.sf)}`,
  `Koyna Valves capital reserve ${fig(KOYNA.R.toCR)}`,
  `Kabini Tiles balance sheet ${fig(KABINI.BS.total)}`,
  `Sarasvati Bearings balance sheet ${fig(SARASVATI.BS.total)}`,
];
export { sum };
