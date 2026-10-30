// Build CBSE 12 Accountancy ch06 Accounting for Share Capital. Run from platform/:
//   npx tsx content/authored/economics-commerce/cbse-12-accountancy-ch06/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';

setUnit('cbse-12-accountancy-ch06', 'economics-commerce');
const { fig, rs, rupees, words, sum, check, Books, ACC, issue, forfeit, reissue, vendorShares, shareNote, simpleNote, bsIII, ratio } = await import('./acc.mjs');
const { terms, FACTS } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const T = (t) => table(t.headers, t.rows, t.alt, t.caption);
const J = (B, from, to, alt, caption) => T({ ...B.journal(from, to), alt, caption });

// ---------------------------------------------------------------- example 1: Pragati Pumps (imagined, Coimbatore)
const PR = { authorisedN: 200000, issuedN: 110000, subN: 100000, called: 8, defN: 2000, defCall: 2 };
const PRv = { authorised: PR.authorisedN * 10, issued: PR.issuedN * 10, subscribed: PR.subN * 10, calledUp: PR.subN * PR.called, uncalled: PR.subN * (10 - PR.called), arrears: PR.defN * PR.defCall };
PRv.paidUp = PRv.calledUp - PRv.arrears;
check(10 * PR.subN >= 9 * PR.issuedN && PRv.paidUp === 796000, 'Pragati');

// ---------------------------------------------------------------- example 2: Godavari Agro (imagined, Nashik), at par
const GB = new Books();
const GI = issue(GB, { fv: 10, n: 40000, inst: [{ name: 'Application', cap: 2 }, { name: 'Allotment', cap: 3 }, { name: 'First and Final Call', cap: 5 }] });
check(GB.bal(ACC.bank) === 400000 && -GB.bal(GI.A.cap) === 400000, 'Godavari');

// ---------------------------------------------------------------- examples 3–5: Narmada Textiles (imagined, Surat), at a premium
const NAR_INST = [{ name: 'Application', cap: 3 }, { name: 'Allotment', cap: 3, prem: 2 }, { name: 'First and Final Call', cap: 4 }];
const NB = new Books();
const NI = issue(NB, { fv: 10, n: 50000, inst: NAR_INST });
check(-NB.bal(ACC.sp) === 100000 && NB.bal(ACC.bank) === 600000, 'Narmada full');
const OB = new Books();
const OI = issue(OB, { fv: 10, n: 50000, inst: NAR_INST, groups: [{ applied: 15000, allotted: 0 }, { applied: 60000, allotted: 50000 }], made: 2 });
const O_due = OI.allotted * OI.rate[1];
const O_capApp = OI.allotted * NAR_INST[0].cap;
check(OI.applied * 3 === 225000 && O_capApp === 150000 && OI.adjT === 30000 && OI.refT === 45000 && O_due - OI.adjT === 220000, 'Narmada pro-rata');
check(O_capApp + OI.adjT + OI.refT === OI.applied * OI.rate[0], 'application money fully accounted for');
const UND = { offered: 50000, a: 46000, b: 44000 };
const undPct = (x) => (100 * x) / UND.offered;
check(undPct(UND.a) === 92 && undPct(UND.b) === 88, 'under-subscription');

// ---------------------------------------------------------------- examples 6–12: Shivalik Foods (imagined, Dehradun)
const SB = new Books();
const SI = issue(SB, {
  fv: 10, n: 30000, arrearsAccount: true,
  inst: [{ name: 'Application', cap: 3 }, { name: 'Allotment', cap: 3 }, { name: 'First Call', cap: 2 }, { name: 'Second and Final Call', cap: 2 }],
  defaults: [{ who: 'Ravi', shares: 600, from: 1 }, { who: 'Sunita', shares: 400, from: 2 }],
  advance: [{ who: 'Kunal', shares: 1000, at: 1, calls: [2, 3] }],
});
const S_allotRecv = SB.entries[SI.ents.calls[0][1]];
const S_call1Recv = SB.entries[SI.ents.calls[1][1]];
const S_bankOf = (e) => e.dr.find(([a]) => a === ACC.bank)[1];
const S_ciaAfterCalls = SB.bal(ACC.cia);
check(S_bankOf(S_allotRecv) === 92200 && S_bankOf(S_call1Recv) === 56000 && S_ciaAfterCalls === 5800 && SB.bal(ACC.adv) === 0, 'Shivalik calls');
const SF = forfeit(SB, SI, ['Ravi', 'Sunita']);
check(SF.sc === 10000 && SF.sf === 4200 && SF.crs[0][1] === 5800, 'Shivalik forfeiture');
const S_on = SF.per.Sunita.forfeited + (SF.per.Ravi.forfeited / 600) * 400;
const SR = reissue(SB, { cap: SI.A.cap, shares: 800, price: 8, credited: 10, forfeitedOn: S_on });
check(S_on === 3600 && SR.disc === 1600 && SR.toCR === 2000 && -SB.bal(ACC.sf) === 600, 'Shivalik re-issue');
const SN = shareNote({ B: SB, cap: SI.A.cap, fv: 10, authorised: 50000, issued: 30000, forfeited: -SB.bal(ACC.sf), arrearsBooks: SB.bal(ACC.cia), rows: [{ label: 'Subscribed and fully paid', n: 29800, called: 10 }] });
const SRS = simpleNote('Reserves and Surplus', [['Capital Reserve', -SB.bal(ACC.cr)]], 2);
const SBS = bsIII({ eq: [["Shareholders' Funds", [['Share Capital', 1, SN.total], ['Reserves and Surplus', 2, SRS.total]]]], assets: [['Current Assets', [['Cash and Cash Equivalents', 3, SB.bal(ACC.bank)]]]] });
check(SN.total === 298600 && SBS.total === 300600, 'Shivalik balance sheet');

// ---------------------------------------------------------------- example 8: Ujjain Spinning (imagined), shares to a vendor
const UB = new Books();
const U = { buildings: 300000, machinery: 120000, pc: 400000 };
const UV = vendorShares(U.pc, 10, 16);
const U_cr = U.buildings + U.machinery - U.pc;
UB.post({ dr: [['Buildings A/c', U.buildings], ['Machinery A/c', U.machinery]], cr: [['Malwa Builders A/c', U.pc], [ACC.cr, U_cr]], nar: 'assets bought from Malwa Builders for less than their value' });
UB.post({ dr: [['Malwa Builders A/c', U.pc]], cr: [['Equity Share Capital A/c', UV.cap], [ACC.sp, UV.prem]], nar: `${fig(UV.n)} equity shares of ₹10 each issued at ₹16 to the vendor` });
check(UV.n === 25000 && U_cr === 20000 && UB.bal('Malwa Builders A/c') === 0, 'Ujjain');

// ---------------------------------------------------------------- example 10: Lohit Tea (imagined, Dibrugarh), premium not received / received
const LB = new Books();
const LI = issue(LB, { fv: 10, n: 20000, inst: [{ name: 'Application', cap: 2 }, { name: 'Allotment', cap: 3, prem: 3 }, { name: 'First and Final Call', cap: 5 }], defaults: [{ who: 'Asif', shares: 200, from: 1 }, { who: 'Bimla', shares: 100, from: 2 }] });
const LF1 = forfeit(LB, LI, ['Asif'], { nar: `Asif's ${fig(200)} shares forfeited; premium on them not received` });
const LF2 = forfeit(LB, LI, ['Bimla'], { nar: `Bimla's ${fig(100)} shares forfeited; premium on them already received` });
check(LF1.sp === 600 && LF1.sf === 400 && LF2.sp === 0 && LF2.sf === 500, 'Lohit');

// ---------------------------------------------------------------- visuals: deck 1
const vRoute1 = flow('LR', ['Company and share capital', 'Kinds of shares', 'Issue at par or premium', 'Over- and under-subscription', 'Other ways to issue shares'], 'Route map of Part 1: the company and its share capital, kinds of shares, issue at par or at a premium, over- and under-subscription, and other ways of issuing shares', 'Part 1 at a glance');
const vFeatures = table(
  ['Feature', 'What it means'],
  [
    ['Artificial person, created by law', 'Comes into existence on incorporation under the Companies Act 2013'],
    ['Separate legal entity', 'Owns property, contracts, sues and is sued in its own name'],
    ['Limited liability', "A member's liability is limited to the amount unpaid on his shares"],
    ['Perpetual succession', 'Continues to exist whatever happens to its members'],
    ['Transferability of shares', 'Shares of a public company can be transferred freely'],
    ['Separation of ownership and management', 'Shareholders own it; an elected board of directors manages it'],
  ],
  'Table of the features of a company: an artificial person created by law, a separate legal entity, limited liability, perpetual succession, transferable shares and separation of ownership from management',
);
const vKinds = table(
  ['Basis', 'Kinds of company'],
  [
    ['Liability of members', 'Limited by shares · limited by guarantee · unlimited'],
    ['Number of members', 'One person company (1) · private company (2 to 200) · public company (7 or more)'],
    ['Control', 'Holding company · subsidiary company'],
    ['Ownership', 'Government company (government holds at least 51% of paid-up capital) · non-government company'],
    ['Listing', 'Listed company (securities on a recognised stock exchange) · unlisted company'],
  ],
  'Table of kinds of companies by liability, number of members, control, ownership and listing: limited by shares or guarantee or unlimited; one person, private with two to two hundred members, or public with seven or more; holding and subsidiary; government and non-government; listed and unlisted',
);
const PR_CATS = [['Authorised', PRv.authorised], ['Issued', PRv.issued], ['Subscribed', PRv.subscribed], ['Called-up', PRv.calledUp], ['Paid-up', PRv.paidUp]];
const vCapSvg = (() => {
  const s = new Svg(560, 250);
  const X0 = 120;
  const W = 300;
  let prev = Infinity;
  PR_CATS.forEach(([label, v], i) => {
    check(v <= prev, 'each layer of capital fits inside the one above');
    prev = v;
    const y = 18 + i * 44;
    const w = (W * v) / PRv.authorised;
    s.rect(X0, y, w, 30, { fill: i === PR_CATS.length - 1 ? 'accent' : 'fill', color: 'accent', sw: 1.5, rx: 2 });
    s.text(X0 - 10, y + 15, label, { anchor: 'end', size: 13 });
    s.text(X0 + w + 8, y + 15, rs(v), { anchor: 'start', size: 12 });
  });
  s.text(280, 238, 'Pragati Pumps Ltd (imagined): bar lengths drawn to scale', { size: 12, muted: true });
  return s.visual(
    `Five bars drawn to scale for an imagined company: authorised capital ${fig(PRv.authorised)}, issued ${fig(PRv.issued)}, subscribed ${fig(PRv.subscribed)}, called-up ${fig(PRv.calledUp)} and paid-up ${fig(PRv.paidUp)}; each bar is no longer than the one above it`,
    'Each category of capital lies within the one above it.',
  );
})();
const vCats = table(
  ['Category', 'Working', '₹'],
  [
    ['Authorised capital', `${fig(PR.authorisedN)} × ₹10`, fig(PRv.authorised)],
    ['Issued capital', `${fig(PR.issuedN)} × ₹10`, fig(PRv.issued)],
    ['Subscribed capital', `${fig(PR.subN)} × ₹10`, fig(PRv.subscribed)],
    ['Called-up capital', `${fig(PR.subN)} × ₹${PR.called}`, fig(PRv.calledUp)],
    ['Uncalled capital', `${fig(PR.subN)} × ₹${10 - PR.called}`, fig(PRv.uncalled)],
    ['Paid-up capital', `${fig(PRv.calledUp)} − calls in arrears ${fig(PRv.arrears)}`, `**${fig(PRv.paidUp)}**`],
  ],
  `Table of worked example 1: authorised ${fig(PRv.authorised)}, issued ${fig(PRv.issued)}, subscribed ${fig(PRv.subscribed)}, called-up ${fig(PRv.calledUp)}, uncalled ${fig(PRv.uncalled)} and paid-up ${fig(PRv.paidUp)}`,
  `Calls in arrears: ${fig(PR.defN)} shares × ₹${PR.defCall} = ${rs(PRv.arrears)}.`,
);
const vEqPref = table(
  ['Basis', 'Preference shares', 'Equity shares'],
  [
    ['Dividend', 'Fixed rate, paid first', 'Varies; paid after preference dividend'],
    ['Capital on winding up', 'Repaid before equity', 'Repaid last'],
    ['Voting', 'Only on matters affecting their rights', 'On all matters'],
    ['Risk and control', 'Lower risk, little control', 'Higher risk, control of the company'],
  ],
  'Table comparing preference shares, with a fixed dividend paid first, prior repayment of capital and limited voting, and equity shares, with a varying dividend paid after preference dividend, repayment last, full voting rights, more risk and control',
);
const vIssueFlow = flow('TB', ['Prospectus invites the public', 'Applications with application money', 'Allotment: allotment money due', 'Calls: first, second and final', 'Shares fully paid'], 'Flow of an issue of shares: a prospectus invites the public, applications arrive with application money, shares are allotted and allotment money becomes due, calls are made, and the shares become fully paid', 'Each instalment: an entry when due, an entry when received');
const vSec52 = table(
  ['Securities premium may be used for (Section 52)', 'Not allowed'],
  [
    ['Issuing fully paid bonus shares to members', 'Paying dividend'],
    ['Writing off preliminary expenses of the company', 'Writing off revenue losses'],
    ['Writing off expenses of, commission paid or discount allowed on, any issue of shares or debentures', '—'],
    ['Premium payable on redemption of preference shares or debentures', '—'],
    ['Buy-back of its own shares (Section 68)', '—'],
  ],
  'Table of the uses of securities premium under section fifty-two: bonus shares, writing off preliminary expenses, writing off expenses, commission or discount on issues, premium on redemption, and buy-back; it may not be used to pay dividend or write off revenue losses',
  'Only the uses are listed; bonus issue, redemption and buy-back are not accounted for in this chapter.',
);
const vGod = J(GB, 0, undefined, `Journal of an imagined company issuing ${fig(GI.allotted)} shares at par: application money of ${fig(GI.allotted * 2)} received and transferred, allotment money of ${fig(GI.allotted * 3)} and the call of ${fig(GI.allotted * 5)} each debited when due and credited when received`);
const vNarFull = J(NB, 0, undefined, `Journal of an imagined company issuing ${fig(NI.allotted)} shares at a premium of two rupees payable with allotment; the allotment entry credits share capital ${fig(NI.allotted * 3)} and securities premium ${fig(NI.allotted * 2)}`);
const vOver = table(
  ['Way of dealing with it', 'Accounting effect'],
  [
    ['Reject some applications outright', 'Their application money is refunded'],
    ['Allot in full to some, reject the rest', 'Rejected applicants are refunded'],
    ['Allot pro-rata (fewer shares than applied for)', 'Excess application money is adjusted towards allotment (and calls, if the terms say so); any surplus is refunded'],
  ],
  'Table of ways of dealing with over-subscription: reject some applications and refund their money; allot in full to some and refund the rest; or allot pro-rata, adjusting excess application money towards allotment and refunding any surplus',
);
const vWE4 = table(
  ['Category', 'Shares applied', 'Shares allotted', 'Application money (₹)', 'Treatment'],
  [
    ['Rejected', fig(OI.groups[0].applied), '—', fig(OI.groups[0].applied * 3), `Refunded ${fig(OI.refT)}`],
    [`Pro-rata (${ratio(OI.groups[1].applied, OI.groups[1].allotted)})`, fig(OI.groups[1].applied), fig(OI.groups[1].allotted), fig(OI.groups[1].applied * 3), `Capital ${fig(O_capApp)}; to allotment ${fig(OI.adjT)}`],
    ['**Total**', `**${fig(OI.applied)}**`, `**${fig(OI.allotted)}**`, `**${fig(OI.applied * 3)}**`, ''],
  ],
  `Table of worked example 4: applications for ${fig(OI.applied)} shares; ${fig(OI.groups[0].applied)} rejected and refunded ${fig(OI.refT)}; ${fig(OI.groups[1].applied)} applicants allotted ${fig(OI.allotted)} shares, five for six, with ${fig(OI.adjT)} adjusted towards allotment`,
  `Allotment due ${rs(O_due)} − adjusted ${rs(OI.adjT)} = cash on allotment ${rs(O_due - OI.adjT)}.`,
);
const vWE5 = J(OB, 0, undefined, `Journal of the pro-rata allotment: application money of ${fig(OI.applied * 3)} received; transferred ${fig(O_capApp)} to share capital, ${fig(OI.adjT)} to allotment and ${fig(OI.refT)} refunded; allotment due ${fig(O_due)} and ${fig(O_due - OI.adjT)} received`);
const vAppSvg = (() => {
  const s = new Svg(560, 170);
  const X0 = 20;
  const W = 520;
  const total = OI.applied * OI.rate[0];
  const parts = [['Share capital', O_capApp, 'fill'], ['To allotment', OI.adjT, 'accent'], ['Refunded', OI.refT, 'muted']];
  check(sum(parts.map(([, v]) => v)) === total, 'segments add to the application money');
  let x = X0;
  parts.forEach(([label, v, fill]) => {
    const w = (W * v) / total;
    s.rect(x, 40, w, 46, { fill, color: 'accent', sw: 1.5, rx: 2 });
    s.text(x + w / 2, 104, label, { size: 11 });
    s.text(x + w / 2, 122, rs(v), { size: 11 });
    x += w;
  });
  check(Math.abs(x - X0 - W) < 1e-9, 'bar adds to the whole');
  s.text(X0 + W / 2, 22, `Application money received: ${rs(total)}`, { size: 13 });
  s.text(X0 + W / 2, 152, 'Segment widths drawn to scale', { size: 11, muted: true });
  return s.visual(
    `One bar for all the application money received, ${fig(total)}, split to scale: ${fig(O_capApp)} to share capital, ${fig(OI.adjT)} carried to allotment and ${fig(OI.refT)} refunded`,
    'Every rupee of application money ends in one of three places.',
  );
})();
const vUnder = table(
  ['Case (offer of 50,000 shares)', 'Applications', 'Share of issue', 'Result'],
  [
    ['A', fig(UND.a), `${undPct(UND.a)}%`, `At least 90%: allot ${fig(UND.a)} shares`],
    ['B', fig(UND.b), `${undPct(UND.b)}%`, 'Below 90%: no allotment; refund all application money'],
  ],
  `Table of minimum subscription: with ${fig(UND.a)} applications, ${undPct(UND.a)} per cent, the company allots; with ${fig(UND.b)}, ${undPct(UND.b)} per cent, it must refund`,
  'Minimum subscription: 90% of the issue (SEBI rules), within the stipulated time.',
);
const vModes = table(
  ['Mode', 'Offered to', 'Key point'],
  [
    ['Private placement (Section 42)', 'A select group of persons, not the public', 'Made through a private placement offer letter'],
    ['Employee Stock Option Plan (ESOP)', 'Employees and whole-time directors', 'Option to buy shares later at a price fixed now; minimum vesting period one year'],
    ['Sweat equity shares (Section 54)', 'Employees or directors', 'For know-how or value additions; at a discount or for consideration other than cash'],
  ],
  'Table of other modes: private placement to a select group through an offer letter; employee stock option plan giving employees an option to buy shares later at a price fixed now; sweat equity shares to employees or directors for know-how, at a discount or for non-cash consideration',
);
const vSummary1 = table(
  ['Event', 'Entry'],
  [
    ['Application money received', 'Bank A/c Dr, To Share Application A/c'],
    ['Transfer on allotment', 'Share Application A/c Dr, To Share Capital A/c (and Securities Premium, Share Allotment, Bank for refunds)'],
    ['Allotment due', 'Share Allotment A/c Dr, To Share Capital A/c, To Securities Premium A/c (if premium)'],
    ['Call due', 'Share Call A/c Dr, To Share Capital A/c'],
    ['Money received', 'Bank A/c Dr, To Share Allotment / Share Call A/c'],
  ],
  'Summary table of entries: application money received; transferred on allotment to share capital, premium, allotment or refunded; allotment and calls debited when due and credited when received',
);

// ---------------------------------------------------------------- visuals: deck 2
const vRoute2 = flow('LR', ['Calls in arrears', 'Calls in advance', 'Shares for assets', 'Forfeiture', 'Re-issue', 'Balance sheet'], 'Route map of Part 2: calls in arrears and in advance, shares issued for assets, forfeiture, re-issue and disclosure in the balance sheet', 'Part 2 at a glance');
const vArrears = table(
  ['', 'With a Calls in Arrears Account', 'Without one'],
  [
    ['Entry for cash received', 'Bank A/c Dr, Calls in Arrears A/c Dr, To Share Call A/c', 'Bank A/c Dr, To Share Call A/c (cash only)'],
    ['Where the unpaid amount sits', 'Debit balance of Calls in Arrears', 'Debit balance of the call account'],
    ['In the balance sheet', 'Deducted from called-up capital', 'Deducted from called-up capital'],
  ],
  'Table of the two ways of recording calls in arrears: with a calls in arrears account the unpaid amount is debited to it; without one it stays as a debit balance of the call account; either way it is deducted from called-up capital',
  'No interest on calls in arrears or in advance is computed in this chapter.',
);
const vShivAllot = J(SB, 0, SI.ents.calls[0][1] + 1, `Journal of the imagined Shivalik Foods up to allotment: allotment received with ${fig(SI.unpaid(SI.defs[0], 1))} debited to calls in arrears and ${fig(4000)} credited to calls in advance`);
const vAdvance = table(
  ['When', 'Entry'],
  [
    ['Money received before the call', 'Bank A/c Dr, To Calls in Advance A/c'],
    ['When the call is made', 'Calls in Advance A/c Dr, To Share Call A/c'],
    ['In the balance sheet (until then)', 'Current Liabilities → Other Current Liabilities'],
  ],
  'Table of calls in advance: credited to a calls in advance account when received, transferred to the call account when the call is made, and shown under other current liabilities until then',
);
const vShivCalls = J(SB, SI.ents.calls[1][0], SI.ents.calls[2][1] + 1, `Journal of the two calls of the imagined Shivalik Foods: each call of ${fig(60000)} due; ${fig(2000)} of calls in advance adjusted, ${fig(2000)} debited to calls in arrears and ${fig(56000)} received`);
const vVendorFlow = flow('LR', ['Assets Dr, To Vendor', 'Shares = amount ÷ issue price', 'Vendor Dr, To Share Capital, To Securities Premium'], 'Flow for shares issued to a vendor: debit the assets and credit the vendor; find the number of shares by dividing the amount by the issue price; then debit the vendor and credit share capital and securities premium', 'Promoters for services: Incorporation Costs A/c Dr, To Share Capital A/c');
const vUjjain = J(UB, 0, undefined, `Journal of an imagined company buying assets of ${fig(U.buildings + U.machinery)} for ${fig(U.pc)}: capital reserve ${fig(U_cr)}; ${fig(UV.n)} shares issued at sixteen rupees`);
const vForfFormat = table(
  ['Case', 'Forfeiture entry'],
  [
    ['Issued at par', 'Share Capital A/c Dr (called-up), To Calls in Arrears / Share Call A/c (unpaid), To Share Forfeiture A/c (received)'],
    ['At a premium, premium received', 'As at par: premium stays in Securities Premium'],
    ['At a premium, premium NOT received', 'Also Securities Premium A/c Dr (premium on those shares)'],
    ['Pro-rata allottee', 'Share Forfeiture includes the excess application money adjusted on allotment'],
  ],
  'Table of forfeiture entries: share capital debited with the called-up amount, unpaid calls credited and money received credited to share forfeiture; securities premium is also debited only if the premium was not received; for a pro-rata allottee the forfeited amount includes his excess application money',
);
const vShivForf = J(SB, SF.idx, SF.idx + 1, `Forfeiture entry of the imagined Shivalik Foods: share capital debited ${fig(SF.sc)}, calls in arrears credited ${fig(SF.crs[0][1])} and share forfeiture credited ${fig(SF.sf)}`, `Ravi paid ₹3 × ${fig(600)} = ${rs(SF.per.Ravi.forfeited)}; Sunita paid ₹6 × ${fig(400)} = ${rs(SF.per.Sunita.forfeited)}.`);
const vLohit = J(LB, LF1.idx, LF2.idx + 1, `Two forfeiture entries for an imagined company: one debits securities premium ${fig(LF1.sp)} because the premium was not received and forfeits ${fig(LF1.sf)}; the other forfeits ${fig(LF2.sf)} with no premium debit`);
const vReFlow = flow('LR', ['Bank Dr (price) + Share Forfeiture Dr (discount)', 'To Share Capital (paid-up value)', 'Discount ≤ amount forfeited on those shares', 'Balance on re-issued shares → Capital Reserve'], 'Flow of re-issue: debit bank with the price and share forfeiture with any discount, credit share capital with the paid-up value; the discount may not exceed the forfeited amount on those shares; the remaining gain on re-issued shares goes to capital reserve', 'Re-issue above the paid-up value: credit the excess to Securities Premium');
const vShivRe = J(SB, SR.e1, SR.e2 + 1, `Re-issue entries of the imagined Shivalik Foods: ${fig(800)} shares at eight rupees, discount ${fig(SR.disc)} from share forfeiture, and ${fig(SR.toCR)} transferred to capital reserve`);
const vReSvg = (() => {
  const s = new Svg(560, 180);
  const X0 = 20;
  const W = 520;
  const kept = -SB.bal(ACC.sf);
  const parts = [['Discount on re-issue', SR.disc, 'muted', 104], ['To Capital Reserve', SR.toCR, 'accent', 104], ['Kept: shares not re-issued', kept, 'fill', 140]];
  check(sum(parts.map(([, v]) => v)) === SF.sf, 'forfeited amount fully accounted for');
  let x = X0;
  parts.forEach(([label, v, fill, ly]) => {
    const w = (W * v) / SF.sf;
    s.rect(x, 40, w, 46, { fill, color: 'accent', sw: 1.5, rx: 2 });
    s.text(Math.min(x + w / 2, 470), ly, `${label}: ${rs(v)}`, { size: 11 });
    x += w;
  });
  s.text(X0 + W / 2, 22, `Amount forfeited: ${rs(SF.sf)}`, { size: 13 });
  s.text(X0 + W / 2, 168, 'Segment widths drawn to scale', { size: 11, muted: true });
  return s.visual(
    `A bar for the whole forfeited amount of ${fig(SF.sf)}, split to scale: ${fig(SR.disc)} used for the discount on re-issue, ${fig(SR.toCR)} transferred to capital reserve, and ${fig(kept)} kept for shares not yet re-issued`,
    'Only the gain on shares actually re-issued goes to Capital Reserve.',
  );
})();
const vDiscl = table(
  ['Item', 'Where it appears (Schedule III)'],
  [
    ['Share capital', "Shareholders' Funds → Share Capital (note: authorised, issued, subscribed)"],
    ['Calls in arrears', 'Deducted from subscribed but not fully paid capital in the note'],
    ['Share Forfeiture (shares not re-issued)', 'Added to subscribed capital in the note'],
    ['Securities Premium; Capital Reserve', "Shareholders' Funds → Reserves and Surplus"],
    ['Calls in advance', 'Current Liabilities → Other Current Liabilities'],
  ],
  'Table of disclosure under Schedule Three: share capital under shareholders funds with a note; calls in arrears deducted and share forfeiture added in the note; securities premium and capital reserve under reserves and surplus; calls in advance under other current liabilities',
);
const vShivNote = T({ ...SN, alt: `Note on share capital of the imagined Shivalik Foods: authorised ${fig(500000)}, issued ${fig(300000)}, subscribed and fully paid ${fig(298000)}, add share forfeiture ${fig(-SB.bal(ACC.sf))}, total ${fig(SN.total)}`, caption: `Balance sheet total ${rs(SBS.total)} = cash at bank; Reserves and Surplus: Capital Reserve ${rs(SRS.total)}.` });
const vSummary2 = table(
  ['Event', 'Entry or rule'],
  [
    ['Call not paid', 'Calls in Arrears A/c Dr (or leave the debit in the call account)'],
    ['Call paid early', 'Bank A/c Dr, To Calls in Advance A/c (a liability)'],
    ['Shares to a vendor', 'Vendor A/c Dr, To Share Capital A/c, To Securities Premium A/c'],
    ['Forfeiture', 'Share Capital Dr (called-up) [+ Securities Premium Dr if unpaid], To unpaid calls, To Share Forfeiture'],
    ['Re-issue', 'Bank Dr, Share Forfeiture Dr (discount ≤ forfeited), To Share Capital'],
    ['Gain on re-issued shares', 'Share Forfeiture A/c Dr, To Capital Reserve A/c'],
  ],
  'Summary table of Part 2: calls in arrears and in advance, shares to a vendor, forfeiture, re-issue within the forfeited amount, and the transfer of the gain on re-issued shares to capital reserve',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Accounting for Share Capital — Part 1: Company, Share Capital and Issue of Shares',
  goals: [
    'Explain the features and kinds of companies, the categories of share capital and the kinds of shares',
    'Pass journal entries for an issue of shares at par and at a premium',
    'Record over-subscription with rejection and pro-rata allotment, and under-subscription',
    'Explain private placement, employee stock option plans and sweat equity',
  ],
  slides: [
    sl('title', 'Accounting for Share Capital', {
      b: 'Part 1 — the **company**, its **share capital**, and the **issue of shares** at par and at a premium.',
      v: vRoute1,
      n: 'A company raises most of its capital by issuing shares to the public. In this part we learn what a company is, the kinds of share capital and shares, and how to record an issue of shares at par or at a premium. We also see what happens when the public applies for more shares, or fewer shares, than the company offers, and three other ways of issuing shares.',
    }),
    sl('concept', 'What is a company?', {
      v: vFeatures,
      n: 'A company is an artificial person created by law. It is a separate legal entity, so it can own property, sue and be sued in its own name. Its members have limited liability, it continues to exist even when its members change, and the shares of a public company can be transferred freely. Ownership rests with the shareholders, while management rests with the board of directors.',
    }),
    sl('concept', 'Kinds of companies', {
      v: vKinds,
      n: 'Companies can be classified in several ways. By liability, a company may be limited by shares, limited by guarantee, or unlimited. By number of members, it may be a one person company, a private company with up to two hundred members, or a public company with at least seven. A government company is one in which the government holds at least fifty-one per cent of the paid-up capital.',
    }),
    sl('diagram', 'Categories of share capital', {
      v: vCapSvg,
      n: 'Share capital is described in layers. Authorised capital is the ceiling fixed in the memorandum. Issued capital is the part offered to the public. Subscribed capital is the part actually taken up. Called-up capital is the part the company has asked for, and paid-up capital is what it has actually received. Each layer sits inside the one above it, as the bars show.',
    }),
    sl('example', 'Worked example 1: the capital of Pragati Pumps', {
      b: `An imagined company in Coimbatore, **Pragati Pumps Ltd**, is registered for ${fig(PR.authorisedN)} equity shares of ₹10 each. It offered ${fig(PR.issuedN)} shares; ${fig(PR.subN)} were applied for and allotted. ₹${PR.called} per share has been called; a holder of ${fig(PR.defN)} shares has not paid the last call of ₹${PR.defCall}.`,
      v: vCats,
      bl: ['**Uncalled capital** = subscribed − called-up. **Reserve capital** is uncalled capital kept for winding up.'],
      n: `Pragati Pumps is registered for ${words(PR.authorisedN)} shares of ten rupees, so its authorised capital is ${rupees(PRv.authorised)}. It offered ${words(PR.issuedN)} shares, and ${words(PR.subN)} were taken up. Eight rupees a share has been called, giving called-up capital of ${rupees(PRv.calledUp)}. One holder has not paid a call of ${rupees(PRv.arrears)}, so the paid-up capital is ${rupees(PRv.paidUp)}.`,
    }),
    sl('check', 'Quick check: called-up capital', {
      b: 'Use the figures in the question, not those of Pragati Pumps.',
      chk: 'm_categories',
      n: 'Multiply the shares subscribed by the amount called per share. Do unpaid calls change this figure?',
    }),
    sl('two-column', 'Equity shares and preference shares', {
      cols: ['**Preference shares**\n\n- Fixed dividend, paid **first**.\n- Capital repaid **before** equity on winding up.', '**Equity shares**\n\n- Dividend varies with profit.\n- Full **voting rights**; bear the most risk.'],
      v: vEqPref,
      bl: ['Under the Companies Act 2013, preference shares must be redeemable; irredeemable preference shares cannot be issued.'],
      n: 'There are two kinds of shares. Preference shares carry two preferences: a dividend at a fixed rate, paid before any equity dividend, and repayment of capital before equity shareholders when the company is wound up. Equity shares carry no such preference, but their holders control the company through their voting rights and enjoy all the profits that remain.',
    }),
    sl('check', 'Quick check: voting rights', {
      b: 'Decide whether the statement is true.',
      chk: 'tf_pref',
      n: 'Think about which shareholders control the company, and on what matters preference shareholders can vote.',
    }),
    sl('concept', 'How shares are issued', {
      v: vIssueFlow,
      bl: ['At **par**: at face value. At a **premium**: above face value.', 'At a **discount**: barred by **Section 53** (sweat equity shares are the only exception).'],
      n: 'A public company invites the public to buy shares through a prospectus. Investors send applications with application money. The company then allots shares and collects allotment money, and later asks for the rest through one or more calls. Shares may be issued at par, that is at face value, or at a premium. Under section fifty-three of the Companies Act, they cannot be issued at a discount, except sweat equity shares.',
    }),
    sl('concept', 'Issue at a premium: Securities Premium', {
      v: vSec52,
      n: 'When shares are issued above face value, the excess is securities premium. It is credited to the Securities Premium Account, whichever instalment it is collected with, and shown under reserves and surplus. Section fifty-two allows it only for capital purposes, such as issuing fully paid bonus shares or writing off preliminary expenses and issue expenses. It can never be paid out as dividend.',
    }),
    sl('example', 'Worked example 2: issue at par', {
      b: `An imagined company in Nashik, **Godavari Agro Ltd**, issues ${fig(GI.allotted)} equity shares of ₹10 each at par, payable ${terms(GI.inst)}. All shares are applied for and all money is received.`,
      v: vGod,
      n: `Godavari Agro issues ${words(GI.allotted)} shares at par. For each instalment, we pass one entry when the money becomes due and one when it is received. Application money of ${rupees(GI.allotted * 2)} is received and transferred to share capital. Allotment money of ${rupees(GI.allotted * 3)}, and the call of ${rupees(GI.allotted * 5)}, are each debited when due and credited when the cash comes in.`,
    }),
    sl('example', 'Worked example 3: issue at a premium', {
      b: `An imagined company in Surat, **Narmada Textiles Ltd**, issues ${fig(NI.allotted)} equity shares of ₹10 each at a premium of ₹2, payable ${terms(NI.inst)}. The issue is fully subscribed and paid.`,
      v: vNarFull,
      n: `Narmada Textiles issues ${words(NI.allotted)} shares of ten rupees at a premium of two rupees, payable with allotment. The allotment money due is five rupees a share, ${rupees(NI.allotted * 5)}. Of this, three rupees a share goes to share capital and two rupees a share, ${rupees(-NB.bal(ACC.sp))}, goes to securities premium. The premium never enters the Share Capital Account.`,
    }),
    sl('check', 'Quick check: the allotment entry', {
      b: 'Premium is payable with allotment.',
      chk: 'm_premium_entry',
      n: 'Split the allotment money into its face-value part and its premium part.',
    }),
    sl('concept', 'Over-subscription: three ways to allot', {
      v: vOver,
      n: 'Over-subscription means the public applies for more shares than are offered. The directors may reject some applications and refund their money, allot in full to some applicants and reject the rest, or allot on a pro-rata basis. Often they combine these. Excess application money of pro-rata allottees is usually adjusted towards their allotment money, and any surplus beyond that is refunded.',
    }),
    sl('example', 'Worked example 4: pro-rata allotment at Narmada Textiles', {
      b: `Same terms as worked example 3, but applications arrive for **${fig(OI.applied)}** shares. Applications for ${fig(OI.groups[0].applied)} shares are rejected; the other applicants get **${ratio(OI.groups[1].allotted, OI.groups[1].applied).replace(':', ' shares for every ')} applied for**.`,
      v: vWE4,
      n: `Suppose Narmada Textiles receives applications for ${words(OI.applied)} shares. Applications for ${words(OI.groups[0].applied)} shares are rejected, and the applicants for the other ${words(OI.groups[1].applied)} are allotted ${words(OI.allotted)} shares, five for every six. Their excess application money, ${rupees(OI.adjT)}, is adjusted towards allotment, so the company collects ${rupees(O_due - OI.adjT)} on allotment.`,
    }),
    sl('example', 'Worked example 5: entries for pro-rata allotment', {
      b: 'Journal entries up to the receipt of allotment money.',
      v: vWE5,
      n: `All the application money, ${rupees(OI.applied * 3)}, is received first. On allotment, the Application Account is closed in three parts: ${rupees(O_capApp)} to share capital, ${rupees(OI.adjT)} to the Allotment Account, and ${rupees(OI.refT)} refunded to the rejected applicants. Then the allotment money is debited when due and credited as it is received.`,
    }),
    sl('diagram', 'Where the application money goes', {
      v: vAppSvg,
      n: 'The bar shows all the application money received. The largest part becomes share capital, at three rupees a share on the shares allotted. A smaller part is carried forward to reduce the allotment money of pro-rata applicants, and the rest is returned to the applicants who received nothing. Every rupee of application money must end up in one of these three places.',
    }),
    sl('check', 'Quick check: allotment money of a pro-rata allottee', {
      b: 'Excess application money is adjusted towards allotment.',
      chk: 'n_prorata_allot',
      n: 'First find the excess application money, then subtract it from the allotment money due.',
    }),
    sl('concept', 'Under-subscription and minimum subscription', {
      v: vUnder,
      n: `Under-subscription means applications are received for fewer shares than offered. The company may allot the shares applied for, but only if it has received the minimum subscription, which is ninety per cent of the issue. A company offering ${words(UND.offered)} shares could allot ${words(UND.a)}, which is ${words(undPct(UND.a))} per cent, but with only ${words(UND.b)} applications, ${words(undPct(UND.b))} per cent, it must refund all the money.`,
    }),
    sl('concept', 'Private placement, ESOP and sweat equity', {
      v: vModes,
      n: 'Besides a public issue, a company can issue shares in other ways. A private placement offers shares to a small, select group of investors rather than to the public. An employee stock option plan gives employees the right to buy shares later at a price fixed today. Sweat equity shares are given to employees or directors for their know-how or value additions, and may even be issued at a discount.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up: share capital moves from authorised to issued, subscribed, called-up and paid-up. Each instalment is debited when due and credited when received. Premium goes to securities premium and is never used for dividend. On over-subscription, refunds and pro-rata adjustments clear the Application Account; on under-subscription, the minimum subscription decides whether shares can be allotted.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Name the class of share in every account: **Equity Share Capital A/c**, **Equity Share Allotment A/c**.',
        'Show **Securities Premium** separately in the entry where the premium falls due.',
        'In pro-rata questions, write the **working for excess application money** before the entries.',
        'Check that the Application Account closes: capital + premium + adjusted + refunded = money received.',
        'Shares can **never** be issued at a discount (Section 53), except sweat equity shares.',
      ],
      n: 'For the board exam, always write share capital accounts with the class of share, such as equity share capital. Show the premium separately in every entry where it falls due. In pro-rata questions, write out the working for excess application money before the entries, and check that the Application Account closes. And remember that shares can never be issued at a discount, except sweat equity shares.',
    }),
  ],
});

const S_cr = SB.bal(ACC.cr);
const part2 = deck({
  part: 2,
  title: 'Accounting for Share Capital — Part 2: Calls, Shares for Assets, Forfeiture, Re-issue and Disclosure',
  goals: [
    'Record calls in arrears and calls in advance',
    'Record shares issued to vendors and promoters for consideration other than cash',
    'Pass entries for forfeiture and re-issue of shares and transfer the gain to Capital Reserve',
    'Present share capital in the balance sheet and notes to accounts under Schedule III',
  ],
  slides: [
    sl('title', 'After allotment: calls, forfeiture and disclosure', {
      b: 'Part 2 — **calls in arrears** and **in advance**, shares for **assets**, **forfeiture**, **re-issue** and the **balance sheet**.',
      v: vRoute2,
      n: 'In this part we deal with what happens after allotment. Some shareholders fail to pay calls, and some pay before the calls are made. Shares may be issued for assets instead of cash. If calls remain unpaid, the company may forfeit the shares and later re-issue them. Finally we learn how share capital is shown in the balance sheet under Schedule Three of the Companies Act.',
    }),
    sl('concept', 'Calls in arrears', {
      v: vArrears,
      n: 'Calls in arrears are amounts called up but not paid by the due date. A company may open a Calls in Arrears Account, debiting it with the unpaid amount when the cash is recorded. Or it may simply leave the unpaid amount as a debit balance in the allotment or call account. Either way, calls in arrears are deducted from called-up capital in the balance sheet. In this chapter we charge no interest on them.',
    }),
    sl('example', 'Worked example 6: allotment at Shivalik Foods', {
      b: `An imagined company in Dehradun, **Shivalik Foods Ltd**, issues ${fig(SI.allotted)} equity shares of ₹10 each at par, payable ${terms(SI.inst)}; all are applied for. **Ravi** (${fig(600)} shares) pays nothing after application; **Sunita** (${fig(400)} shares) pays neither call; **Kunal** (${fig(1000)} shares) pays both calls with his allotment money.`,
      v: vShivAllot,
      n: `Shivalik Foods, an imagined company, allots ${words(SI.allotted)} shares. Ravi, holding six hundred shares, does not pay his allotment money, so ${rupees(SI.unpaid(SI.defs[0], 1))} is debited to Calls in Arrears. Kunal, holding one thousand shares, pays both calls with his allotment, so ${rupees(4000)} is credited to Calls in Advance. The bank receives ${rupees(S_bankOf(S_allotRecv))}.`,
    }),
    sl('concept', 'Calls in advance', {
      v: vAdvance,
      n: 'Calls in advance is money received before a call is made. It is credited to a Calls in Advance Account and treated as a liability, because the company owes it to the shareholder until the call falls due. When the call is made, the advance is transferred to the call account. In the balance sheet, it is shown under other current liabilities, not as share capital.',
    }),
    sl('example', 'Worked example 7: the two calls at Shivalik Foods', {
      b: 'First call and second and final call, ₹2 each.',
      v: vShivCalls,
      n: `On each call of two rupees, the call account is debited with ${rupees(60000)}. Kunal's advance of ${rupees(2000)} is adjusted, Ravi and Sunita fail to pay ${rupees(2000)} between them, and the bank receives ${rupees(S_bankOf(S_call1Recv))}. The same happens on the final call. After both calls, the calls in arrears stand at ${rupees(S_ciaAfterCalls)}.`,
    }),
    sl('check', 'Quick check: calls in advance', {
      b: 'Where does it go in the balance sheet?',
      chk: 'm_advance_shown',
      n: 'Who does the company owe this money to, and is it share capital yet?',
    }),
    sl('concept', 'Shares for consideration other than cash', {
      v: vVendorFlow,
      n: 'A company may pay for assets by issuing shares instead of cash. First the assets are debited and the vendor credited. Then the vendor is debited and share capital, along with any premium, credited. The number of shares is the amount payable divided by the issue price. Shares may also be issued to promoters for their services in forming the company.',
    }),
    sl('example', 'Worked example 8: shares to a vendor', {
      b: `An imagined company, **Ujjain Spinning Ltd**, buys buildings (${rs(U.buildings)}) and machinery (${rs(U.machinery)}) from Malwa Builders for **${rs(U.pc)}**, paid by equity shares of ₹10 each issued at ₹16.`,
      v: vUjjain,
      bl: [`Shares = ${fig(U.pc)} ÷ ₹16 = **${fig(UV.n)}**. Assets worth more than the price: the difference of ${rs(U_cr)} is a **capital reserve** (a higher price would be **goodwill**).`],
      n: `Ujjain Spinning, an imagined company, takes over buildings and machinery worth ${rupees(U.buildings + U.machinery)} from Malwa Builders for ${rupees(U.pc)}. As it pays less than the value of the assets, the difference of ${rupees(U_cr)} is a capital reserve. The price is paid in shares of ten rupees issued at sixteen rupees, that is ${words(UV.n)} shares.`,
    }),
    sl('check', 'Quick check: number of shares to a vendor', {
      b: 'Part is paid by cheque, the rest in shares at a premium.',
      chk: 'n_vendor_shares',
      n: 'Subtract the cash paid, then divide what is left by the issue price, including the premium.',
    }),
    sl('concept', 'Forfeiture of shares', {
      v: vForfFormat,
      n: 'If a shareholder fails to pay a call, the directors may forfeit his shares, if the articles allow. The shares are cancelled and the money he has paid is kept by the company. Share capital is debited with the called-up amount, the unpaid calls are credited, and the money received is credited to the Share Forfeiture Account. If the premium due on those shares was not received, Securities Premium is also debited.',
    }),
    sl('example', 'Worked example 9: forfeiture at Shivalik Foods', {
      b: 'After the final call, the shares of Ravi and Sunita are forfeited.',
      v: vShivForf,
      n: `After the final call, Shivalik Foods forfeits the shares of Ravi and Sunita. Their one thousand shares are fully called, so share capital is debited with ${rupees(SF.sc)}. Their unpaid calls, ${rupees(SF.crs[0][1])}, are credited to Calls in Arrears, and the ${rupees(SF.sf)} they had paid is credited to Share Forfeiture.`,
    }),
    sl('example', 'Worked example 10: shares issued at a premium', {
      b: `An imagined company, **Lohit Tea Ltd**, issued shares of ₹10 at a premium of ₹3, payable ${terms(LI.inst)}. **Asif** (${fig(200)} shares) paid only on application; **Bimla** (${fig(100)} shares) did not pay the call.`,
      v: vLohit,
      n: `Lohit Tea, an imagined company, issued shares at a premium of three rupees payable with allotment. Asif never paid his allotment money, so the premium on his shares was not received, and Securities Premium is debited with ${rupees(LF1.sp)}. Bimla paid her allotment, so her premium was received and stays in the Securities Premium Account. Only money received towards capital is forfeited.`,
    }),
    sl('check', 'Quick check: the forfeiture entry', {
      b: 'Fill in the blank.',
      chk: 'fb_forfeit',
      n: 'Which amount was credited to share capital on these shares so far?',
    }),
    sl('concept', 'Re-issue of forfeited shares', {
      v: vReFlow,
      n: 'Forfeited shares may be re-issued at par, at a premium or at a discount. The discount is debited to the Share Forfeiture Account, but it can never be more than the amount forfeited on those shares. Once the shares are re-issued, whatever is left of the forfeited amount on them is a capital profit, and it is transferred to the Capital Reserve.',
    }),
    sl('example', 'Worked example 11: re-issue at Shivalik Foods', {
      b: `${fig(800)} of the forfeited shares (all of Sunita's ${fig(400)} and ${fig(400)} of Ravi's) are re-issued as fully paid at **₹8** per share.`,
      v: vShivRe,
      bl: [`Forfeited on these shares = ${fig(SF.per.Sunita.forfeited)} + ${fig(400)} × ₹3 = ${rs(S_on)}; discount ${rs(SR.disc)}; Capital Reserve **${rs(SR.toCR)}**.`],
      n: `Shivalik Foods re-issues eight hundred of the forfeited shares, all of Sunita's and four hundred of Ravi's, at eight rupees as fully paid. The discount is ${rupees(SR.disc)}. The amount forfeited on these shares is ${rupees(S_on)}, so ${rupees(SR.toCR)} goes to capital reserve. ${rupees(-SB.bal(ACC.sf)).replace(/^r/, 'R')} stays in Share Forfeiture for Ravi's other two hundred shares.`,
    }),
    sl('diagram', 'Splitting the forfeited amount', {
      v: vReSvg,
      n: `This bar is the whole amount forfeited, ${rupees(SF.sf)}. The first part pays for the discount on re-issue. The second part, the gain on the re-issued shares, is moved to capital reserve. The last part belongs to shares not yet re-issued, so it stays in the Share Forfeiture Account until they are.`,
    }),
    sl('concept', 'Disclosure in the balance sheet (Schedule III)', {
      v: vDiscl,
      n: 'Under Schedule Three, share capital appears under shareholders funds, with a note to accounts. The note shows authorised, issued and subscribed capital. Subscribed capital is split into fully paid shares and shares not fully paid less calls in arrears, and the forfeited amount on unissued shares is added. Securities premium and capital reserve go to reserves and surplus, and calls in advance to other current liabilities.',
    }),
    sl('example', 'Worked example 12: notes to accounts at Shivalik Foods', {
      b: `After the re-issue: authorised capital ${fig(50000)} equity shares of ₹10 each.`,
      v: vShivNote,
      bl: [`Balance sheet: Share Capital ${rs(SN.total)} + Reserves and Surplus ${rs(SRS.total)} = Cash and Cash Equivalents **${rs(SBS.total)}**.`],
      n: `After the re-issue, Shivalik Foods has ${words(29800)} fully paid shares, worth ${rupees(29800 * 10)}. Adding the forfeited amount of ${rupees(-SB.bal(ACC.sf))} gives share capital of ${rupees(SN.total)}. The capital reserve of ${rupees(-S_cr)} goes to reserves and surplus. Together they equal the cash at bank, ${rupees(SBS.total)}.`,
    }),
    sl('check', 'Quick check: calls in arrears in the note', {
      b: 'How are they shown?',
      chk: 'm_arrears_note',
      n: 'Calls in arrears are amounts called but not received. Do they increase or reduce the capital shown?',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up: unpaid calls go to calls in arrears, and early payments to calls in advance, which is a liability. Shares may be issued to vendors and promoters for value other than cash. On forfeiture, share capital is debited with the called-up amount and the money received is forfeited. On re-issue, the discount comes out of the forfeited amount, and the rest goes to capital reserve.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Forfeiture check: called-up capital (+ unpaid premium) = unpaid calls + amount forfeited.',
        'Debit **Securities Premium** on forfeiture **only** if that premium was **not received**.',
        'Discount on re-issue **≤ amount forfeited** on those shares.',
        'Transfer to Capital Reserve only the gain on shares **actually re-issued**.',
        'In the note: **deduct** calls in arrears, **add** the forfeiture balance; calls in advance are a **liability**.',
      ],
      n: 'Some final advice. In forfeiture entries, check that the debits equal the credits: called-up capital, plus any unpaid premium, equals the unpaid calls plus the amount forfeited. Never let the discount on re-issue exceed the amount forfeited. Transfer to capital reserve only the gain on shares actually re-issued. And in the notes, deduct calls in arrears and add the forfeiture balance.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Accounting for Share Capital — Notes',
  sections: [
    {
      h: '1. The company and its kinds',
      t: 1,
      b: 'A **company** is an artificial person created by law, with a separate legal entity, limited liability of members, perpetual succession, transferable shares (public company) and separation of ownership from management.\n\n**Kinds:** by liability (limited by shares, by guarantee, unlimited); by members (one person company; private: 2 to 200 members; public: 7 or more); by control (holding, subsidiary); by ownership (government company: at least 51% of paid-up capital held by government); listed and unlisted.',
      terms: [
        ['Company', 'An artificial person created by law, having a separate legal entity and perpetual succession.'],
        ['Limited liability', "A member's liability for the company's debts is limited to the amount unpaid on his shares."],
        ['Perpetual succession', 'The company continues to exist whatever happens to its individual members.'],
      ],
      v: vFeatures,
      vs: [vKinds],
    },
    {
      h: '2. Share capital and kinds of shares',
      t: 1,
      b: '**Categories of share capital**\n- **Authorised** (registered, nominal): maximum capital per the memorandum.\n- **Issued:** part offered to the public. **Unissued:** the rest.\n- **Subscribed:** part applied for and allotted (fully paid, or not fully paid).\n- **Called-up:** part of subscribed capital asked for. **Uncalled:** the rest; **reserve capital** is uncalled capital to be called only on winding up (special resolution).\n- **Paid-up** = called-up − calls in arrears.\n\n**Kinds of shares:** **preference shares** (fixed dividend paid first; capital repaid first on winding up; limited voting; must be redeemable under the Companies Act 2013) and **equity shares** (all other shares; varying dividend; full voting rights).',
      terms: [
        ['Subscribed capital', 'The part of issued capital applied for by the public and allotted by the company.'],
        ['Paid-up capital', 'Called-up capital less calls in arrears.'],
        ['Preference share', 'A share with preference as to a fixed dividend and as to repayment of capital on winding up.'],
      ],
      v: vCats,
      vs: [vCapSvg, vEqPref],
    },
    {
      h: '3. Issue of shares at par and at a premium',
      t: 2,
      b: '**Entries** (each instalment: one entry when due, one when received)\n1. Bank A/c Dr, To Share Application A/c.\n2. Share Application A/c Dr, To Share Capital A/c (and To Securities Premium A/c if premium is with application).\n3. Share Allotment A/c Dr, To Share Capital A/c, To Securities Premium A/c (premium with allotment).\n4. Bank A/c Dr, To Share Allotment A/c.\n5. Share First Call A/c Dr, To Share Capital A/c; Bank A/c Dr, To Share First Call A/c.\n\n**Securities premium** is a capital receipt shown under Reserves and Surplus; **Section 52** lists its uses (bonus shares, writing off preliminary expenses and issue expenses, premium on redemption, buy-back) and dividend is not one of them. **Section 53:** no issue at a discount, except sweat equity shares (Section 54).',
      terms: [
        ['Issue at par', 'Issue of shares at their face value.'],
        ['Securities premium', 'The excess of the issue price of a share over its face value; a capital receipt.'],
        ['Call', 'A demand by the company for part of the unpaid amount on shares.'],
      ],
      v: vIssueFlow,
      vs: [vSec52, vNarFull],
    },
    {
      h: '4. Over-subscription and under-subscription',
      t: 2,
      b: '**Over-subscription:** applications for more shares than offered. The directors may (i) reject some applications and refund the money, (ii) allot in full to some and reject the rest, or (iii) allot **pro-rata**.\n\n**Pro-rata allotment:** shares allotted = shares applied × allotted ÷ applied in that category. **Excess application money** = (shares applied − shares allotted) × application money per share; it is adjusted towards allotment (and calls, if the terms allow), and any surplus refunded.\n\n**Transfer entry:** Share Application A/c Dr, To Share Capital A/c, To Securities Premium A/c (if any), To Share Allotment A/c (adjusted), To Calls in Advance A/c (surplus kept), To Bank A/c (refunds).\n\n**Under-subscription:** applications for fewer shares than offered; shares applied for may be allotted only if the **minimum subscription (90% of the issue)** is received; otherwise all application money is refunded.',
      terms: [
        ['Pro-rata allotment', 'Allotment of shares to applicants in proportion to the shares they applied for.'],
        ['Excess application money', 'Application money received on shares applied for but not allotted.'],
        ['Minimum subscription', 'The minimum amount (90% of the issue) that must be subscribed before shares can be allotted.'],
      ],
      v: vOver,
      vs: [vWE4, vAppSvg, vUnder],
    },
    {
      h: '5. Calls in arrears and calls in advance',
      t: 3,
      b: '**Calls in arrears:** amount called but unpaid. With a Calls in Arrears Account: Bank A/c Dr, Calls in Arrears A/c Dr, To Share Call A/c. Without one, the unpaid amount stays as a debit balance of the allotment or call account. Shown as a deduction from called-up capital in the note on share capital.\n\n**Calls in advance:** money received before a call is made. Bank A/c Dr, To Calls in Advance A/c; when the call is made, Calls in Advance A/c Dr, To Share Call A/c. Shown under **Other Current Liabilities**.\n\nInterest on calls in arrears and in advance is not computed in this chapter.',
      terms: [
        ['Calls in arrears', 'Amount called up on shares but not paid by the shareholders by the due date.'],
        ['Calls in advance', 'Amount received from shareholders before the company has called it; a liability.'],
      ],
      v: vArrears,
      vs: [vAdvance, vShivCalls],
    },
    {
      h: '6. Shares for consideration other than cash; other modes of issue',
      t: [3, 4],
      b: '**Shares to vendors:** Assets A/c Dr, To Vendor A/c (liabilities taken over are credited; goodwill debited if the price exceeds net assets, capital reserve credited if it is less). Then Vendor A/c Dr, To Share Capital A/c, To Securities Premium A/c. **Number of shares = amount payable ÷ issue price.**\n\n**Shares to promoters** for their services: Incorporation Costs A/c Dr, To Share Capital A/c.\n\n**Private placement (Section 42):** offer to a select group of persons through a private placement offer letter. **Employee Stock Option Plan:** option to employees and whole-time directors to buy shares at a future date at a predetermined price (minimum vesting period one year). **Sweat equity shares (Section 54):** issued to employees or directors at a discount or for consideration other than cash, for know-how or value additions.',
      terms: [
        ['Vendor', 'The person from whom a company buys assets or a business.'],
        ['Private placement', 'An offer of shares to a select group of persons, not the public.'],
        ['Sweat equity shares', 'Shares issued to employees or directors for know-how or value additions, at a discount or for non-cash consideration.'],
      ],
      v: vVendorFlow,
      vs: [vUjjain, vModes],
    },
    {
      h: '7. Forfeiture and re-issue of shares',
      t: 5,
      b: '**Forfeiture** (if the articles allow): Share Capital A/c Dr (called-up amount), Securities Premium A/c Dr (premium due but not received), To Share Allotment / Calls / Calls in Arrears A/c (unpaid), To Share Forfeiture A/c (amount received, excluding premium received). For a pro-rata allottee, the amount received includes the excess application money adjusted.\n\n**Re-issue:** Bank A/c Dr (price), Share Forfeiture A/c Dr (discount), To Share Capital A/c (paid-up value credited), To Securities Premium A/c (price above the paid-up value). **Discount on re-issue ≤ amount forfeited on those shares.**\n\n**Capital Reserve:** Share Forfeiture A/c Dr, To Capital Reserve A/c, with the forfeited amount on re-issued shares less the discount. The balance on shares not re-issued stays in Share Forfeiture.',
      terms: [
        ['Forfeiture of shares', 'Cancellation of shares for non-payment of calls; the money paid is kept by the company.'],
        ['Re-issue', 'Sale of forfeited shares, at par, a premium or a discount within the forfeited amount.'],
        ['Capital Reserve', 'A reserve of capital profits, here the gain on re-issue of forfeited shares.'],
      ],
      v: vForfFormat,
      vs: [vShivForf, vShivRe, vReSvg],
    },
    {
      h: '8. Disclosure of share capital (Schedule III)',
      t: 6,
      b: "**Balance sheet:** Equity and Liabilities → 1. Shareholders' Funds → (a) Share Capital, (b) Reserves and Surplus; Current Liabilities → Other Current Liabilities (calls in advance).\n\n**Note on Share Capital:** Authorised capital; Issued capital; Subscribed capital split into (i) subscribed and fully paid and (ii) subscribed but not fully paid, less calls in arrears; add Share Forfeiture (shares not re-issued).\n\n**Reserves and Surplus:** Securities Premium; Capital Reserve.\n\nCheck: note total = Share Capital balance − calls in arrears + Share Forfeiture balance.",
      terms: [
        ['Notes to accounts', 'Details supporting the figures in the balance sheet, such as the categories of share capital.'],
        ["Shareholders' funds", 'Share capital plus reserves and surplus.'],
      ],
      v: vDiscl,
      vs: [vShivNote],
    },
  ],
  tips: '**Common mistakes**\n- Crediting premium to Share Capital, or debiting Securities Premium on forfeiture when the premium **was** received.\n- Forgetting the refund and the adjustment when closing the Application Account on over-subscription.\n- Crediting Share Forfeiture with the **called-up** amount instead of the amount **received**.\n- Allowing a discount on re-issue larger than the amount forfeited, or transferring the forfeiture on shares **not yet re-issued** to Capital Reserve.\n- Showing calls in advance as share capital, or adding calls in arrears instead of deducting them.\n\n**How marks are usually awarded**\n- 1 mark: correct option, or a single concept (Section 52, minimum subscription, disclosure).\n- 3 marks: categories of capital, a set of entries for one stage, a forfeiture entry, a re-issue with Capital Reserve, or a note on share capital.\n- 4 marks: a full issue at a premium, pro-rata entries, a vendor purchase, or forfeiture with re-issue.\n- 6 marks: a complete issue with pro-rata allotment, arrears or advance, forfeiture and re-issue, or a balance sheet with notes.\n\n**Figures in SOYL practice** are imagined; your board paper will give its own.',
});

// ---------------------------------------------------------------- flashcards
const FC = cards([
  ['**Company**', 'An artificial person created by law, with a separate legal entity and perpetual succession.', 'definition', 1],
  ['Limited liability', "A member's liability is limited to the amount **unpaid on his shares**.", 'concept', 1],
  ['Private and public company: members', 'Private: **2 to 200**; public: **7 or more**; one person company: **1**.', 'fact', 1],
  ['**Authorised capital**', 'Maximum capital a company may raise, as stated in its **memorandum**.', 'definition', 1],
  ['Called-up vs paid-up capital', 'Paid-up = **called-up − calls in arrears**.', 'fact', 1],
  ['**Reserve capital**', 'Uncalled capital to be called **only on winding up** (special resolution).', 'definition', 1],
  ['Two preferences of preference shares', '**Fixed dividend** paid first; **capital repaid first** on winding up.', 'concept', 1],
  ['Who controls a company?', '**Equity shareholders**, through their voting rights.', 'concept', 1],
  ['Entry: premium due with allotment', 'Share Allotment A/c Dr, To Share Capital A/c, To **Securities Premium A/c**.', 'fact', 2],
  ['**Section 52**', 'Lists the uses of securities premium; **dividend is not one of them**.', 'fact', 2],
  ['**Section 53**', 'No issue of shares at a **discount** (except sweat equity shares).', 'fact', 2],
  ['Where is securities premium shown?', "Shareholders' Funds → **Reserves and Surplus**.", 'exam-tip', 2],
  ['Three ways to handle over-subscription', 'Reject and refund; full allotment to some; **pro-rata** allotment.', 'concept', 2],
  ['**Excess application money** (pro-rata)', '(Shares applied − shares allotted) × application money per share.', 'fact', 2],
  ['Excess beyond allotment money', 'Refunded, or kept as **calls in advance** if the terms say so.', 'concept', 2],
  ['**Minimum subscription**', '**90%** of the issue; below it, all application money is refunded.', 'fact', 2],
  ['Closing the Application Account', 'Capital + premium + adjusted + refunded = money received.', 'exam-tip', 2],
  ['**Calls in arrears**', 'Called but unpaid; **deducted** from called-up capital in the note.', 'definition', 3],
  ['**Calls in advance**', 'Received before the call; a **liability** (Other Current Liabilities).', 'definition', 3],
  ['Shares to a vendor: number', '**Amount payable ÷ issue price** (face value + premium).', 'fact', 3],
  ['Price paid below net assets taken over', 'Difference credited to **Capital Reserve**.', 'concept', 3],
  ['**Private placement**', 'Offer of shares to a **select group** of persons, not the public.', 'definition', 4],
  ['**Employee Stock Option Plan**', 'Option to employees to buy shares **later** at a **predetermined price**.', 'definition', 4],
  ['**Sweat equity shares**', 'To employees or directors for **know-how or value additions**; may be at a discount.', 'definition', 4],
  ['Forfeiture: Share Capital is debited with', 'The **called-up** amount on the forfeited shares.', 'fact', 5],
  ['Forfeiture: Share Forfeiture is credited with', 'The amount **received** on those shares (excluding premium received).', 'fact', 5],
  ['When is Securities Premium debited on forfeiture?', 'Only when the premium on those shares was **not received**.', 'exam-tip', 5],
  ['Maximum discount on re-issue', 'The **amount forfeited** on the shares re-issued.', 'fact', 5],
  ['Gain on re-issue', 'Share Forfeiture A/c Dr, To **Capital Reserve** A/c (re-issued shares only).', 'fact', 5],
  ['Share Forfeiture balance on unissued shares', '**Added** to subscribed capital in the note on Share Capital.', 'exam-tip', 6],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-12-accountancy-chapter-test-short',
  title: 'Chapter test (short) — Accounting for Share Capital',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_pref_rights', 'm_undersub', 'm_forfeit_par', 'ar_premium'] },
    { id: 'B', title: 'Section B — Short answer (3 marks each)', instr: 'Show all working.', items: ['s3_par_entries', 's3_forfeit_entry'] },
    { id: 'C', title: 'Section C — Long answer (4 marks)', instr: 'Answer any ONE of the two questions. Show all working.', items: [{ attempt: 1, keys: ['l4_premium_issue', 'l4_forfeit_reissue'] }] },
    { id: 'D', title: 'Section D — Long answer (6 marks)', instr: 'Answer any ONE of the two questions. Show all working.', items: [{ attempt: 1, keys: ['l6_prorata_full', 'l6_forfeit_partial'] }] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-12-accountancy-chapter-test-long',
  title: 'Chapter test (long) — Accounting for Share Capital',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–8 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_reserve_cap', 'm_s53', 'm_prorata_excess', 'm_vendor_shares', 'm_cap_reserve', 'm_forfeit_shown', 'ar_oversub', 'ar_forfeit'] },
    { id: 'B', title: 'Section B — Short answer (3 marks each)', instr: 'Answer all questions; question 12 has an internal choice. Show all working.', items: ['s3_capital_cats', 's3_prorata_calc', 's3_arrears_advance', { attempt: 1, keys: ['s3_reissue', 's3_disclosure'] }] },
    { id: 'C', title: 'Section C — Long answer (4 marks each)', instr: 'Answer question 13, and any ONE of questions 14 and 15.', items: ['l4_oversub_reject', { attempt: 1, keys: ['l4_vendor_business', 'l4_prorata_default'] }] },
    { id: 'D', title: 'Section D — Long answer (6 marks each)', instr: 'Answer question 16, and any ONE of questions 17 and 18.', items: ['l6_full_forfeit', { attempt: 1, keys: ['l6_forfeit_prem', 'l6_issue_disclosure'] }] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: FC,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t06 of cbse-12-accountancy-ch06 only (company, share capital and kinds of shares; issue at par and at a premium with over- and under-subscription; calls in arrears and in advance without interest and shares for consideration other than cash; private placement, ESOP and sweat equity as concepts; forfeiture and re-issue with Capital Reserve; disclosure under Schedule III); issue at a discount appears only as the Section 53 rule; no bonus issue, buy-back or redemption entries',
    originality: 'every company, person, scenario and figure written for this chapter (imagined companies in Indian towns); no NCERT illustration or exercise and no CBSE sample or past-paper item reused',
    accounts: `every figure computed by acc.mjs and asserted: each share issue posted to its own books (journal entries balance, application/allotment/call accounts close, pro-rata allotments give whole shares, forfeiture = money received less premium received, discount on re-issue within the forfeited amount, forfeiture left only on unissued shares), notes agree with the ledger and balance sheets total (Shivalik Foods ${fig(SBS.total)}; ${FACTS.join('; ')})`,
    facts: 'Section 52 (uses of securities premium), Section 53 (no issue at a discount except sweat equity, Section 54), Section 42 (private placement), minimum subscription 90 per cent, Schedule III presentation; no interest on calls in arrears or in advance',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
