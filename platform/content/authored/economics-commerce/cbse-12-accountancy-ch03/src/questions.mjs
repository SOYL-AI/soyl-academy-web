// CBSE 12 Accountancy, ch03 Admission of a Partner — question bank. Every firm, person and figure is
// imagined by SOYL and labelled as such; no NCERT exercise, illustration or board/sample-paper item is
// reused. Every amount, ratio and statement is computed with acc.mjs from the givens and checked
// (entries balance, accounts and balance sheets total, shares divide exactly); the expected values
// asserted below catch any drift in the figures.
import { Q, mcq, ar, tf, fb, match, num, short, long } from './lib.mjs';
import { fr, admit, rs, inr, check, journal, revaluation, capitalAccounts, solveAdmission, admissionAnswer, ratioNotes, ratioStr, splitRatio, sumF, balanceSheet } from './acc.mjs';

const C = (n) => `${n}'s Capital A/c`;
const DATE_OLD = '31 March 2026';
const DATE_NEW = '1 April 2026';
const eq = (a, b, what) => check(JSON.stringify(a) === JSON.stringify(b), `${what}: got ${JSON.stringify(a)}, expected ${JSON.stringify(b)}`);
const ratioOf = (names, ints) => `${names.join(' : ')} = ${ratioStr(ints)}`;

// ================================================================ t01 New ratio and sacrificing ratio
Q('m_rights', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'When a person is admitted into an existing firm as a new partner, he or she normally acquires two rights. These are the right to',
  opts: ['a share in the assets and a share in the future profits of the firm', 'a fixed salary and interest on capital', 'manage the firm alone and sign all its contracts', 'withdraw the reserves built up by the old partners'],
  sol: 'A new partner buys into the property of the firm and into its future profits. Salary and interest depend on the deed, and sole management or a claim on old reserves is not a right of admission.',
}));

const MNR = admit({ Hema: fr(4, 7), Iqbal: fr(3, 7) }, 'Jatin', { proportion: fr(1, 7) });
eq(MNR.newInts, [24, 18, 7], 'm_newratio_prop');
Q('m_newratio_prop', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Hema and Iqbal run an imagined furniture showroom in Bareilly and share profits 4 : 3. They admit Jatin for 1/7 share, which he takes from them in their old ratio. The new profit-sharing ratio of Hema, Iqbal and Jatin is',
  opts: [ratioStr(MNR.newInts), '4 : 3 : 1', '4 : 3 : 7', '3 : 3 : 1'],
  sol: `Each old partner keeps 6/7 of his or her share: Hema ${MNR.old.Hema} × 6/7 = ${MNR.newShares.Hema}, Iqbal ${MNR.old.Iqbal} × 6/7 = ${MNR.newShares.Iqbal}, and Jatin ${MNR.newShare} = 7/49.`,
}));

Q('m_sac_def', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'The share sacrificed by an old partner on the admission of a new partner is found as',
  opts: ['old share − new share', 'new share − old share', 'old share ÷ new share', 'old share × new share'],
  sol: 'A sacrifice is what the partner gives up, so it is the old share minus the new share; new minus old would be a gain.',
}));

Q('m_sac_equal', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'A new partner takes his share of profit from the old partners in their old profit-sharing ratio. In this case the sacrificing ratio of the old partners is',
  opts: ['the same as their old ratio', 'always equal among the old partners', 'the same as their new ratio', 'the same as their capital ratio'],
  sol: 'Each old partner gives up the same fraction of his own share, so the sacrifices stand in the old ratio.',
}));

const MOP = admit({ Kavya: fr(3, 5), Laxmi: fr(2, 5) }, 'Manav', { give: { Kavya: fr(1, 5) } });
eq(MOP.newInts, [2, 2, 1], 'm_one_partner');
Q('m_one_partner', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Kavya and Laxmi share profits 3 : 2 in an imagined handicrafts firm in Jaipur. Manav is admitted for 1/5 share, which he gets entirely from Kavya. The new ratio of Kavya, Laxmi and Manav is',
  opts: [ratioStr(MOP.newInts), '12 : 8 : 5', '3 : 2 : 1', '3 : 1 : 1'],
  sol: `Only Kavya sacrifices: her new share is ${MOP.old.Kavya} − 1/5 = ${MOP.newShares.Kavya}; Laxmi keeps ${MOP.newShares.Laxmi} and Manav gets ${MOP.newShare}. 12 : 8 : 5 would be right only if both partners gave up shares in the old ratio.`,
}));

const MGN = admit({ Nikhil: fr(5, 8), Ojas: fr(3, 8) }, 'Prisha', { newRatio: [4, 2, 2] });
eq(MGN.sacInts, [1, 1], 'm_given_new');
Q('m_given_new', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Nikhil and Ojas share profits 5 : 3 in an imagined courier firm. Prisha is admitted, and the new profit-sharing ratio of Nikhil, Ojas and Prisha is agreed as 4 : 2 : 2. Their sacrificing ratio is',
  opts: [ratioStr(MGN.sacInts), '5 : 3', '2 : 1', '4 : 2'],
  sol: `Nikhil gives up ${MGN.old.Nikhil} − ${MGN.newShares.Nikhil} = ${MGN.sac.Nikhil} and Ojas gives up ${MGN.old.Ojas} − ${MGN.newShares.Ojas} = ${MGN.sac.Ojas}, so the sacrifices are equal even though the old ratio is 5 : 3.`,
}));

const NPS = admit({ Raghav: fr(3, 5), Sana: fr(2, 5) }, 'Tanvi', { proportion: fr(1, 4) });
const NPSprofit = 160000;
const NPSv = NPS.newShares.Raghav.of(NPSprofit);
eq(NPSv, 72000, 'n_profit_share');
Q('n_profit_share', num({
  t: 1, d: 3, c: 'application', value: NPSv, unit: '₹',
  stem: `Raghav and Sana share profits 3 : 2 in an imagined printing press in Bhopal. Tanvi is admitted for 1/4 share, which she takes from them in their old ratio. In the first year after her admission the firm earns a profit of ${rs(NPSprofit)}. How much of it is Raghav's share (in ₹)?`,
  sol: `Raghav's new share = 3/5 × 3/4 = ${NPS.newShares.Raghav}. His profit = ${inr(NPSprofit)} × ${NPS.newShares.Raghav} = ${inr(NPSv)}, that is ${rs(NPSv)}.`,
}));

Q('tf_sac_gain', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? On every admission, the old partners sacrifice in their old profit-sharing ratio.',
  sol: 'That happens only when the new partner takes his share from them in that ratio. When one partner alone gives the share, or partners give agreed fractions, the sacrifices must be worked out as old share minus new share.',
}));

Q('fb_sac', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'Sacrificing ratio = old ratio − ___ ratio.',
  acc: [['new']],
  sol: 'Each old partner sacrifices his old share minus his new share, so the blank is new.',
}));

Q('match_terms', match({
  t: [1, 2, 3], d: 1, c: 'recall', marks: 2,
  stem: 'Match each term used on the admission of a partner with its meaning.',
  pairs: [
    ['Sacrificing ratio', 'Ratio in which the old partners give up their shares of profit'],
    ['Premium for goodwill', "Amount the new partner pays for a share of the firm's goodwill"],
    ['Revaluation account', 'Account recording changes in the values of assets and liabilities'],
    ['Hidden goodwill', "Goodwill inferred from the new partner's capital contribution"],
  ],
  sol: 'Each term names one adjustment: who gives up profit, what the newcomer pays for it, how values are restated, and goodwill read from the capitals.',
}));

Q('ar_sac', ar({
  t: 1, d: 3, c: 'analysis', key: 'a',
  a: 'If a new partner takes his share from the old partners in their old ratio, the sacrificing ratio equals the old ratio.',
  r: 'In that case each old partner gives up the same fraction of his own share, so the sacrifices are proportional to the old shares.',
  sol: 'Both statements are true. Giving up the same fraction of each share is exactly why the sacrifices keep the old proportion, so R explains A.',
}));

const S3NR = admit({ Kiran: fr(3, 5), Lata: fr(2, 5) }, 'Mohit', { surrender: { Kiran: fr(1, 3), Lata: fr(1, 4) } });
eq([S3NR.newInts, S3NR.sacInts], [[4, 3, 3], [2, 1]], 's3_newratio');
Q('s3_newratio', short({
  t: 1, d: 3, c: 'application', marks: 3,
  stem: 'Kiran and Lata are partners in an imagined pottery unit at Khurja, sharing profits 3 : 2. They admit Mohit. Kiran surrenders 1/3 of her share and Lata surrenders 1/4 of her share in Mohit\'s favour. Calculate the new profit-sharing ratio and the sacrificing ratio.',
  model: ratioNotes(S3NR, { surrender: { Kiran: fr(1, 3), Lata: fr(1, 4) } }).map((l, i) => `${i + 1}. ${l}`).join('\n'),
  sol: 'A fraction of one\'s own share is multiplied by that share; add the sacrifices for the newcomer and subtract each from the old share.',
  scheme: [['Sacrifice of each old partner', 1], ['New shares and new ratio', 1], ['Sacrificing ratio', 1]],
}));

const S3G = admit({ Ojasvi: fr(1, 2), Pranav: fr(3, 10), Qadir: fr(1, 5) }, 'Ritu', { give: { Ojasvi: fr(1, 10), Pranav: fr(1, 20), Qadir: fr(1, 20) } });
eq([S3G.newInts, S3G.sacInts], [[8, 5, 3, 4], [2, 1, 1]], 's3_newratio2');
Q('s3_newratio2', short({
  t: 1, d: 3, c: 'application', marks: 3,
  stem: 'Ojasvi, Pranav and Qadir run an imagined travel agency in Shillong and share profits 5 : 3 : 2. Ritu joins them for 1/5 share. Ojasvi gives her 1/10 of the firm\'s profit, while Pranav and Qadir give 1/20 each. Work out the new profit-sharing ratio of the four partners and the sacrificing ratio.',
  model: ratioNotes(S3G, { give: { Ojasvi: fr(1, 10), Pranav: fr(1, 20), Qadir: fr(1, 20) } }).map((l, i) => `${i + 1}. ${l}`).join('\n') + `\n3. Check: ${S3G.newInts.join(' + ')} = ${S3G.newInts.reduce((a, b) => a + b, 0)} parts, and Ritu's ${S3G.newInts.at(-1)} parts out of ${S3G.newInts.reduce((a, b) => a + b, 0)} = ${S3G.newShare}.`,
  sol: 'Here the fractions are parts of the whole profit, so they are subtracted directly from each old share without multiplying.',
  scheme: [['New share of each old partner', 1], ['New ratio 8 : 5 : 3 : 4', 1], ['Sacrificing ratio', 1]],
}));

Q('s3_matters', short({
  t: [1, 3], d: 2, c: 'understanding', marks: 3,
  stem: 'An imagined bakery in Lucknow, run by two partners, is about to admit a third partner. List any six matters that must be settled or adjusted in the books at the time of the admission.',
  model: '1. The **new profit-sharing ratio** of all the partners.\n2. The **sacrificing ratio** of the old partners.\n3. **Goodwill**: valuation and the premium for goodwill (or its adjustment through capital accounts).\n4. **Revaluation** of assets and reassessment of liabilities, with the profit or loss going to the old partners.\n5. **Reserves and accumulated profits or losses** in the books, shared by the old partners in the old ratio.\n6. **Capitals**: the new partner\'s capital and, if agreed, adjustment of the old partners\' capitals to the new ratio.',
  sol: 'Think of what changes on entry: ratio, compensation for goodwill, values of assets, past profits and the capital base.',
  scheme: [['Any six correct matters, ½ mark each', 3]],
}));

// ================================================================ t02 Goodwill on admission
const MPC = { gw: 240000, share: fr(1, 6) };
const MPCv = MPC.share.of(MPC.gw);
eq(MPCv, 40000, 'm_premium_calc');
Q('m_premium_calc', mcq({
  t: 2, d: 2, c: 'application',
  stem: `The goodwill of an imagined bakery chain in Pune is valued at ${rs(MPC.gw)} when Sameer is admitted for 1/6 share. The premium for goodwill Sameer should bring is`,
  opts: [rs(MPCv), rs(MPC.gw / 5), rs(MPC.gw - MPCv), rs(MPC.gw / 12)],
  sol: `Premium = firm's goodwill × new partner's share = ${inr(MPC.gw)} × 1/6 = ${inr(MPCv)}.`,
}));

Q('m_premium_ratio', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Premium for goodwill brought in cash by a new partner is credited to the old partners in their',
  opts: ['sacrificing ratio', 'new profit-sharing ratio', 'capital ratio', 'gaining ratio'],
  sol: 'The premium compensates the partners who gave up a part of their profit, in proportion to what each gave up.',
}));

Q('m_as26', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Under Accounting Standard 26 (Intangible Assets), which goodwill may be shown in the books of a partnership firm?',
  opts: ['Only purchased goodwill, for which the firm has paid consideration', 'Goodwill generated by the firm itself and valued by the partners', 'Goodwill raised at its full value whenever a partner is admitted', 'Any goodwill amount the partners agree on in the deed'],
  sol: 'Self-generated goodwill cannot be recognised because it has no reliably measured cost; that is why goodwill is not raised on admission but adjusted through capital accounts.',
}));

Q('m_not_brought', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'A new partner cannot bring his share of goodwill in cash. The entry to adjust goodwill is',
  opts: ["New partner's Capital (or Current) A/c Dr. To sacrificing partners' Capital A/cs", "Goodwill A/c Dr. To all partners' Capital A/cs", "Sacrificing partners' Capital A/cs Dr. To new partner's Capital A/c", 'Premium for Goodwill A/c Dr. To Bank A/c'],
  sol: 'The newcomer still owes the compensation, so his own capital or current account is charged and the sacrificing partners are credited; no goodwill account is opened.',
}));

Q('m_existing_gw', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'At the time of a partner\'s admission, goodwill of ₹30,000 already appears in the balance sheet of an imagined firm. It is',
  opts: ["written off by debiting the old partners' capital accounts in their old ratio", 'credited to all the partners in the new ratio', "debited to the new partner's capital account", 'carried forward unchanged to the new balance sheet'],
  sol: 'The old goodwill belongs to the old firm, so the old partners bear its write-off in the ratio in which they shared profits.',
}));

const MK = { asset: 70000, gw: 80000, share: fr(1, 4) };
const MKp = MK.share.of(MK.gw);
const MKcap = MK.asset - MKp;
eq([MKp, MKcap], [20000, 50000], 'm_kind');
Q('m_kind', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Gauri is admitted for 1/4 share in an imagined engineering works. The firm's goodwill is valued at ${rs(MK.gw)}. She brings machinery valued at ${rs(MK.asset)}, which covers her premium for goodwill, and the rest is her capital. The entry for the machinery is`,
  opts: [`Machinery A/c Dr. ${rs(MK.asset)} To Premium for Goodwill A/c ${rs(MKp)} and To Gauri's Capital A/c ${rs(MKcap)}`, `Machinery A/c Dr. ${rs(MK.asset)} To Gauri's Capital A/c ${rs(MK.asset)}`, `Gauri's Capital A/c Dr. ${rs(MKp)} To Premium for Goodwill A/c ${rs(MKp)}`, `Machinery A/c Dr. ${rs(MKcap)} To Gauri's Capital A/c ${rs(MKcap)}`],
  sol: `Her premium is ${inr(MK.gw)} × 1/4 = ${inr(MKp)}; the asset is recorded at full value and split between the premium and her capital (${inr(MK.asset)} − ${inr(MKp)} = ${inr(MKcap)}).`,
}));

const MH = { oldCaps: 130000, cap: 50000, share: fr(1, 4) };
const MHv = fr(MH.cap).div(MH.share).of(1) - (MH.oldCaps + MH.cap);
eq(MHv, 20000, 'm_hidden');
Q('m_hidden', mcq({
  t: 2, d: 3, c: 'application',
  stem: `In an imagined firm the old partners' capitals, after all adjustments, total ${rs(MH.oldCaps)}. Hari is admitted for 1/4 share and brings ${rs(MH.cap)} as capital but nothing for goodwill. The hidden goodwill of the firm is`,
  opts: [rs(MHv), rs(fr(MH.cap).div(MH.share).of(1) - MH.oldCaps), rs(MH.share.of(MHv)), rs(MH.cap)],
  sol: `Capital implied by Hari's contribution = ${inr(MH.cap)} × 4 = ${inr(MH.cap * 4)}; actual capital = ${inr(MH.oldCaps)} + ${inr(MH.cap)} = ${inr(MH.oldCaps + MH.cap)}; hidden goodwill = ${inr(MHv)}. Hari's own share of it would be ${inr(MH.share.of(MHv))}.`,
}));

Q('m_withdraw_premium', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: 'The old partners of an imagined firm decide to withdraw in cash the whole premium for goodwill credited to them on a new partner\'s admission. The entry is',
  opts: ["Old partners' Capital A/cs Dr. To Bank A/c", "Bank A/c Dr. To old partners' Capital A/cs", 'Premium for Goodwill A/c Dr. To Bank A/c', "New partner's Capital A/c Dr. To Bank A/c"],
  sol: 'Withdrawal reduces what the firm owes the old partners, so their capital accounts are debited and the bank is credited.',
}));

const NH = admit({ Lalit: fr(3, 5), Meera: fr(2, 5) }, 'Nandini', { proportion: fr(1, 4) });
const NHc = { Lalit: 110000, Meera: 70000, cap: 80000 };
const NHimplied = fr(NHc.cap).div(NH.newShare).of(1);
const NHvalue = NHimplied - (NHc.Lalit + NHc.Meera + NHc.cap);
const NHv = NH.newShare.of(NHvalue);
eq([NHimplied, NHvalue, NHv], [320000, 60000, 15000], 'n_hidden');
Q('n_hidden', num({
  t: 2, d: 3, c: 'application', value: NHv, unit: '₹',
  stem: `Lalit and Meera run an imagined coaching centre in Kota and share profits 3 : 2. After revaluation and the transfer of reserves their capitals are Lalit ${rs(NHc.Lalit)} and Meera ${rs(NHc.Meera)}. Nandini is admitted for 1/4 share and brings ${rs(NHc.cap)} as capital, but no premium for goodwill. Calculate Nandini's share of the hidden goodwill (in ₹).`,
  sol: `Implied total capital = ${inr(NHc.cap)} ÷ 1/4 = ${inr(NHimplied)}. Actual = ${inr(NHc.Lalit)} + ${inr(NHc.Meera)} + ${inr(NHc.cap)} = ${inr(NHimplied - NHvalue)}. Hidden goodwill = ${inr(NHvalue)}; Nandini's share = ${inr(NHvalue)} × 1/4 = ${inr(NHv)}.`,
}));

const NPP = admit({ Pooja: fr(3, 5), Rafiq: fr(2, 5) }, 'Sonia', { give: { Pooja: fr(3, 20), Rafiq: fr(1, 20) } });
const NPPgw = 100000;
const NPPprem = NPP.newShare.of(NPPgw);
const NPPv = splitRatio(NPPprem, NPP.names, NPP.sacInts).Pooja;
eq([NPP.sacInts, NPPprem, NPPv], [[3, 1], 20000, 15000], 'n_premium_partner');
Q('n_premium_partner', num({
  t: 2, d: 4, c: 'application', value: NPPv, unit: '₹',
  stem: `Pooja and Rafiq share profits 3 : 2 in an imagined pharmacy in Nagpur. Sonia is admitted for 1/5 share: she gets 3/20 from Pooja and 1/20 from Rafiq. The firm's goodwill is valued at ${rs(NPPgw)} and Sonia brings her premium in cash. How much of the premium is credited to Pooja (in ₹)?`,
  sol: `Premium = ${inr(NPPgw)} × 1/5 = ${inr(NPPprem)}. The sacrificing ratio is 3/20 : 1/20 = 3 : 1, not the old ratio, so Pooja gets ${inr(NPPprem)} × 3/4 = ${inr(NPPv)}.`,
}));

Q('m_premium_private', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'A new partner pays the premium for goodwill privately to the old partners, outside the business. In the books of the firm',
  opts: ['no entry is made for the premium', "the premium is credited to the old partners' capital accounts", "the new partner's capital account is debited with the premium", 'a goodwill account is opened for the premium'],
  sol: 'The money never passes through the firm, so its books record nothing; only the capital brought into the business is entered.',
}));

Q('tf_hidden_account', tf({
  t: 2, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? Hidden goodwill is recorded by opening a goodwill account in the books of the firm.',
  sol: 'No goodwill account is raised (Accounting Standard 26 allows only purchased goodwill); the new partner is charged with his share and the sacrificing partners are credited.',
}));

Q('s3_why_goodwill', short({
  t: 2, d: 2, c: 'understanding', marks: 3,
  stem: 'Explain why a new partner is asked to bring a premium for goodwill, and state how it is dealt with in the books when (i) it is brought in cash and (ii) it is not brought at all.',
  model: '**Why:** the old partners built the reputation and customer base of the firm and give up part of their future profits to the newcomer, who will share in profits that this goodwill helps to earn. The premium compensates them for that sacrifice.\n\n**(i) Brought in cash:** Bank A/c is debited and Premium for Goodwill A/c credited; the premium account is then closed by crediting the sacrificing partners\' capital accounts in the sacrificing ratio.\n\n**(ii) Not brought:** the new partner\'s capital (or current) account is debited with his share of goodwill and the sacrificing partners\' capital accounts are credited. No goodwill account is opened, as Accounting Standard 26 recognises only purchased goodwill.',
  sol: 'Link the premium to the sacrifice of future profit; in both cases the credit goes to the sacrificing partners, only the debit changes.',
  scheme: [['Reason for the premium', 1], ['Treatment when brought in cash', 1], ['Treatment when not brought', 1]],
}));

Q('tf_premium_new', tf({
  t: 2, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? Premium for goodwill brought in cash by a new partner is credited to the new partner\'s own capital account.',
  sol: 'The premium is compensation for the sacrifice of the old partners, so it is credited to the sacrificing partners in the sacrificing ratio; only the newcomer\'s capital contribution goes to his capital account.',
}));

Q('tf_gw_written', tf({
  t: 2, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? If goodwill already appears in the books when a partner is admitted, it is written off among the old partners in their old ratio.',
  sol: 'The goodwill on the books was built up by the old firm; writing it off in the old ratio keeps the newcomer out of a loss that is not his.',
}));

Q('match_entries', match({
  t: 2, d: 3, c: 'application', marks: 2,
  stem: 'Match each situation on the admission of a partner with the journal entry it needs.',
  pairs: [
    ['Premium brought in cash and kept in the business', "Premium for Goodwill A/c Dr. To sacrificing partners' Capital A/cs"],
    ['Premium not brought by the new partner', "New partner's Capital A/c Dr. To sacrificing partners' Capital A/cs"],
    ['Goodwill already appearing in the books', "Old partners' Capital A/cs Dr. (old ratio) To Goodwill A/c"],
    ['Premium withdrawn by the old partners', "Old partners' Capital A/cs Dr. To Bank A/c"],
  ],
  sol: 'Premium kept or not brought is credited to the sacrificing partners; old goodwill is written off in the old ratio; a withdrawal reduces capitals against the bank.',
}));

Q('fb_premium', fb({
  t: 2, d: 2, c: 'recall',
  stem: 'Premium for goodwill brought by a new partner is shared by the old partners in their ___ ratio.',
  acc: [['sacrificing', 'sacrifice']],
  sol: 'The premium goes to the old partners in the sacrificing ratio, because it pays them for the share of profit they gave up.',
}));

Q('ar_premium_sac', ar({
  t: 2, d: 3, c: 'understanding', key: 'a',
  a: 'Premium for goodwill brought by a new partner is credited to the old partners in their sacrificing ratio.',
  r: 'The old partners give up part of their future profits to the new partner, and the premium compensates them for exactly that sacrifice.',
  sol: 'Both are true, and the compensation logic in R is the very reason for using the sacrificing ratio, so R explains A.',
}));

Q('ar_selfgen', ar({
  t: 2, d: 3, c: 'analysis', key: 'd',
  a: 'On the admission of a partner, the goodwill of the firm is raised in the books at its full value.',
  r: 'Accounting Standard 26 permits only purchased goodwill to be recorded in the books.',
  sol: 'A is false: goodwill is not raised on admission; the newcomer\'s share is brought as premium or adjusted through capitals. R is true and is the reason goodwill cannot be raised.',
}));

Q('ar_hidden', ar({
  t: 2, d: 4, c: 'analysis', key: 'c',
  a: 'Hidden goodwill arises when the capital brought by a new partner, read as his share of the firm, values the firm\'s total capital above the capitals actually in the new firm.',
  r: 'Hidden goodwill is recorded by opening a goodwill account and crediting it to all the partners in the new ratio.',
  sol: 'A correctly describes hidden goodwill. R is false: no goodwill account is opened; the new partner\'s capital or current account is debited with his share and the sacrificing partners are credited.',
}));

Q('ar_gw_written', ar({
  t: 2, d: 3, c: 'understanding', key: 'b',
  a: 'Goodwill already appearing in the balance sheet at the time of admission is written off among the old partners in their old ratio.',
  r: 'Premium for goodwill brought by the new partner is shared by the old partners in their sacrificing ratio.',
  sol: 'Both statements are true, but they describe two separate adjustments: the write-off of old goodwill follows the old ratio for its own reason, and the premium rule does not explain it.',
}));

// Short answers on goodwill.
const SPC = admit({ Asha: fr(3, 5), Bhavin: fr(2, 5) }, 'Chirag', { newRatio: [2, 1, 1] });
const SPCx = { cap: 120000, prem: 40000 };
const SPCsplit = splitRatio(SPCx.prem, SPC.names, SPC.sacInts);
const SPCw = { Asha: SPCsplit.Asha / 2, Bhavin: SPCsplit.Bhavin / 2 };
eq([SPC.sacInts, SPCsplit], [[2, 3], { Asha: 16000, Bhavin: 24000 }], 's3_premium_cash');
const SPCj = journal([
  { dr: [['Bank A/c', SPCx.cap + SPCx.prem]], cr: [[C('Chirag'), SPCx.cap], ['Premium for Goodwill A/c', SPCx.prem]], nar: 'Capital and premium for goodwill brought in cash by Chirag' },
  { dr: [['Premium for Goodwill A/c', SPCx.prem]], cr: [[C('Asha'), SPCsplit.Asha], [C('Bhavin'), SPCsplit.Bhavin]], nar: 'Premium credited to the sacrificing partners in 2 : 3' },
  { dr: [[C('Asha'), SPCw.Asha], [C('Bhavin'), SPCw.Bhavin]], cr: [['Bank A/c', SPCw.Asha + SPCw.Bhavin]], nar: 'Half of the premium withdrawn by the old partners' },
]);
Q('s3_premium_cash', short({
  t: 2, d: 3, c: 'application', marks: 3,
  stem: `Asha and Bhavin share profits 3 : 2 in an imagined dyeing unit at Vadodara. On ${DATE_NEW} they admit Chirag, and the new ratio of Asha, Bhavin and Chirag is fixed at 2 : 1 : 1. Chirag brings ${rs(SPCx.cap)} as capital and ${rs(SPCx.prem)} as premium for goodwill in cash. The old partners withdraw half of the premium credited to them. Pass the journal entries.`,
  model: `**Working note:** ${ratioNotes(SPC, { newRatio: [2, 1, 1] }).join(' ')} Bhavin sacrifices more than Asha.\n\n${SPCj.md}`,
  sol: 'Find each sacrifice from the given new ratio first; the premium follows the sacrificing ratio, not the old 3 : 2.',
  scheme: [['Sacrificing ratio 2 : 3', 1], ['Entries for cash brought and premium credited', 1], ['Entry for withdrawal of half the premium', 1]],
}));

const SPP = admit({ Deepak: fr(2, 3), Esha: fr(1, 3) }, 'Farah', { proportion: fr(1, 3) });
const SPPx = { gw: 90000, cash: 12000, cap: 75000 };
const SPPprem = SPP.newShare.of(SPPx.gw);
const SPPall = splitRatio(SPPprem, SPP.names, SPP.sacInts);
const SPPj = journal([
  { dr: [['Bank A/c', SPPx.cap + SPPx.cash]], cr: [[C('Farah'), SPPx.cap], ['Premium for Goodwill A/c', SPPx.cash]], nar: 'Capital and part of the premium brought in cash by Farah' },
  { dr: [['Premium for Goodwill A/c', SPPx.cash], [C('Farah'), SPPprem - SPPx.cash]], cr: [[C('Deepak'), SPPall.Deepak], [C('Esha'), SPPall.Esha]], nar: 'Goodwill credited to the sacrificing partners in 2 : 1; the part not brought charged to Farah' },
]);
eq([SPPprem, SPPall], [30000, { Deepak: 20000, Esha: 10000 }], 's3_premium_part');
Q('s3_premium_part', short({
  t: 2, d: 3, c: 'application', marks: 3,
  stem: `Deepak and Esha run an imagined restaurant in Indore and share profits 2 : 1. Farah is admitted for 1/3 share, taken from them in their old ratio. The firm's goodwill is valued at ${rs(SPPx.gw)}. Farah brings ${rs(SPPx.cap)} as capital, but she can bring only ${rs(SPPx.cash)} of her premium in cash. Pass the journal entries.`,
  model: `**Working note:** premium = ${inr(SPPx.gw)} × 1/3 = ${inr(SPPprem)}; brought ${inr(SPPx.cash)}, not brought ${inr(SPPprem - SPPx.cash)}. The sacrificing ratio equals the old ratio 2 : 1 (Deepak ${inr(SPPall.Deepak)}, Esha ${inr(SPPall.Esha)}).\n\n${SPPj.md}`,
  sol: 'Credit the whole premium to the sacrificing partners; the part not paid is charged to the newcomer\'s capital in the same entry.',
  scheme: [['Premium and sacrificing ratio', 1], ['Entry for cash brought', 1], ['Goodwill adjustment entry', 1]],
}));

const SH = admit({ Gopal: fr(5, 8), Heena: fr(3, 8) }, 'Ishita', { proportion: fr(1, 5) });
const SHc = { Gopal: 100000, Heena: 60000, cap: 50000 };
const SHimplied = fr(SHc.cap).div(SH.newShare).of(1);
const SHvalue = SHimplied - (SHc.Gopal + SHc.Heena + SHc.cap);
const SHshare = SH.newShare.of(SHvalue);
const SHsplit = splitRatio(SHshare, SH.names, SH.sacInts);
eq([SHvalue, SHshare, SHsplit], [40000, 8000, { Gopal: 5000, Heena: 3000 }], 's3_hidden');
const SHj = journal([{ dr: [[C('Ishita'), SHshare]], cr: [[C('Gopal'), SHsplit.Gopal], [C('Heena'), SHsplit.Heena]], nar: "Ishita's share of hidden goodwill credited to the sacrificing partners in 5 : 3" }]);
Q('s3_hidden', short({
  t: 2, d: 4, c: 'analysis', marks: 3,
  stem: `Gopal and Heena run an imagined interior-design studio in Chandigarh and share profits 5 : 3. Their capitals, after all adjustments, are Gopal ${rs(SHc.Gopal)} and Heena ${rs(SHc.Heena)}. Ishita is admitted for 1/5 share, taken from them in their old ratio. She brings ${rs(SHc.cap)} as capital and nothing for goodwill. Calculate the hidden goodwill and pass the entry for Ishita's share of it.`,
  model: `1. Capital implied by Ishita's contribution = ${inr(SHc.cap)} ÷ 1/5 = ${rs(SHimplied)}.\n2. Actual capital = ${inr(SHc.Gopal)} + ${inr(SHc.Heena)} + ${inr(SHc.cap)} = ${rs(SHimplied - SHvalue)}.\n3. Hidden goodwill = ${inr(SHimplied)} − ${inr(SHimplied - SHvalue)} = **${rs(SHvalue)}**; Ishita's share = ${inr(SHvalue)} × 1/5 = **${rs(SHshare)}**.\n\n${SHj.md}`,
  sol: 'Read the newcomer\'s capital as his share of the whole; the shortfall of the actual capitals is goodwill the firm already has.',
  scheme: [['Implied and actual capital', 1], ["Hidden goodwill and Ishita's share", 1], ['Journal entry', 1]],
}));

const SK = admit({ Jai: fr(3, 5), Kriti: fr(2, 5) }, 'Leela', { proportion: fr(1, 5) });
const SKx = { van: 150000, stock: 30000, gw: 150000 };
const SKprem = SK.newShare.of(SKx.gw);
const SKcap = SKx.van + SKx.stock - SKprem;
const SKsplit = splitRatio(SKprem, SK.names, SK.sacInts);
eq([SKprem, SKcap, SKsplit], [30000, 150000, { Jai: 18000, Kriti: 12000 }], 's3_kind');
const SKj = journal([
  { dr: [['Delivery Van A/c', SKx.van], ['Stock A/c', SKx.stock]], cr: [[C('Leela'), SKcap], ['Premium for Goodwill A/c', SKprem]], nar: 'Assets brought in by Leela for her capital and premium' },
  { dr: [['Premium for Goodwill A/c', SKprem]], cr: [[C('Jai'), SKsplit.Jai], [C('Kriti'), SKsplit.Kriti]], nar: 'Premium credited to the sacrificing partners in 3 : 2' },
]);
Q('s3_kind', short({
  t: 2, d: 3, c: 'application', marks: 3,
  stem: `Jai and Kriti share profits 3 : 2 in an imagined dairy business at Dehradun. Leela is admitted for 1/5 share, which she takes from them in their old ratio. The firm's goodwill is valued at ${rs(SKx.gw)}. Instead of cash, Leela brings a delivery van valued at ${rs(SKx.van)} and stock valued at ${rs(SKx.stock)}; these cover her premium for goodwill and the balance is her capital. Pass the journal entries.`,
  model: `**Working note:** premium = ${inr(SKx.gw)} × 1/5 = ${inr(SKprem)}; capital = ${inr(SKx.van)} + ${inr(SKx.stock)} − ${inr(SKprem)} = ${inr(SKcap)}.\n\n${SKj.md}`,
  sol: 'Assets brought in are debited at their agreed values; the credit is split between the premium and the newcomer\'s capital.',
  scheme: [['Premium for goodwill', 1], ['Entry for the assets brought in', 1], ['Premium credited in the sacrificing ratio', 1]],
}));

// Long answers on ratios and goodwill (4 marks).
const LRP = admit({ Bimal: fr(7, 10), Chhavi: fr(3, 10) }, 'Dhruv', { surrender: { Bimal: fr(2, 7), Chhavi: fr(1, 3) } });
const LRPgw = 150000;
const LRPprem = LRP.newShare.of(LRPgw);
const LRPsplit = splitRatio(LRPprem, LRP.names, LRP.sacInts);
eq([LRP.newInts, LRP.sacInts, LRPprem, LRPsplit], [[5, 2, 3], [2, 1], 45000, { Bimal: 30000, Chhavi: 15000 }], 'l4_ratio_premium');
const LRPj = journal([
  { dr: [['Bank A/c', LRPprem]], cr: [['Premium for Goodwill A/c', LRPprem]], nar: 'Premium for goodwill brought in cash by Dhruv' },
  { dr: [['Premium for Goodwill A/c', LRPprem]], cr: [[C('Bimal'), LRPsplit.Bimal], [C('Chhavi'), LRPsplit.Chhavi]], nar: 'Premium credited to the sacrificing partners in 2 : 1' },
]);
Q('l4_ratio_premium', long({
  t: [1, 2], d: 3, c: 'application', marks: 4,
  stem: `Bimal and Chhavi are partners in an imagined solar-panel dealership at Jodhpur, sharing profits 7 : 3. They admit Dhruv for 3/10 share. Bimal surrenders 2/7 of his share and Chhavi 1/3 of hers. The goodwill of the firm is valued at ${rs(LRPgw)}, and Dhruv brings his premium in cash. Calculate the new profit-sharing ratio and the sacrificing ratio, and pass the journal entries for goodwill.`,
  model: `${ratioNotes(LRP, { surrender: { Bimal: fr(2, 7), Chhavi: fr(1, 3) } }).map((l, i) => `${i + 1}. ${l}`).join('\n')}\n3. Premium = ${inr(LRPgw)} × 3/10 = ${rs(LRPprem)}.\n\n${LRPj.md}`,
  sol: 'Sacrifices come from multiplying each surrendered fraction by that partner\'s own share; check they add to the newcomer\'s share.',
  scheme: [['Sacrifices and new ratio', 1], ['Sacrificing ratio', 1], ['Entry for premium brought', 1], ['Entry crediting the premium', 1]],
}));

const LGC = admit({ Manoj: fr(3, 5), Nisha: fr(2, 5) }, 'Om', { proportion: fr(1, 5) });
const LGCx = { gw: 125000, cap: 100000 };
const LGCprem = LGC.newShare.of(LGCx.gw);
const LGCsplit = splitRatio(LGCprem, LGC.names, LGC.sacInts);
eq([LGCprem, LGCsplit], [25000, { Manoj: 15000, Nisha: 10000 }], 'l4_gw_cases');
const LGCa = journal([
  { dr: [['Bank A/c', LGCx.cap + LGCprem]], cr: [[C('Om'), LGCx.cap], ['Premium for Goodwill A/c', LGCprem]], nar: 'Capital and premium brought in cash by Om' },
  { dr: [['Premium for Goodwill A/c', LGCprem]], cr: [[C('Manoj'), LGCsplit.Manoj], [C('Nisha'), LGCsplit.Nisha]], nar: 'Premium credited to the sacrificing partners in 3 : 2' },
]);
const LGCb = journal([
  { dr: [['Bank A/c', LGCx.cap]], cr: [[C('Om'), LGCx.cap]], nar: 'Capital brought in cash by Om' },
  { dr: [[C('Om'), LGCprem]], cr: [[C('Manoj'), LGCsplit.Manoj], [C('Nisha'), LGCsplit.Nisha]], nar: "Om's share of goodwill adjusted through capital accounts" },
]);
Q('l4_gw_cases', long({
  t: 2, d: 3, c: 'application', marks: 4,
  stem: `Manoj and Nisha share profits 3 : 2 in an imagined garden nursery at Bengaluru. Om is admitted for 1/5 share, which he takes from them in their old ratio, and brings ${rs(LGCx.cap)} as capital. The firm's goodwill is valued at ${rs(LGCx.gw)}. Pass the journal entries in each case: (a) Om brings his premium for goodwill in cash; (b) Om does not bring any premium.`,
  model: `**Working note:** Om's premium = ${inr(LGCx.gw)} × 1/5 = ${inr(LGCprem)}; sacrificing ratio = old ratio 3 : 2 (Manoj ${inr(LGCsplit.Manoj)}, Nisha ${inr(LGCsplit.Nisha)}).\n\n**(a) Premium brought in cash**\n\n${LGCa.md}\n\n**(b) Premium not brought**\n\n${LGCb.md}`,
  sol: 'The old partners receive the same amounts in both cases; only the source changes, from cash to a charge on the newcomer\'s capital.',
  scheme: [['Case (a): entry for cash brought', 1], ['Case (a): premium credited', 1], ['Case (b): capital entry', 1], ["Case (b): Om's capital debited for goodwill", 1]],
}));

const LGE = admit({ Prem: fr(2, 5), Quasim: fr(2, 5), Ruchi: fr(1, 5) }, 'Sunil', { newRatio: [3, 3, 2, 2] });
const LGEx = { book: 25000, gw: 150000 };
const LGEprem = LGE.newShare.of(LGEx.gw);
const LGEsplit = splitRatio(LGEprem, LGE.names, LGE.sacInts);
const LGEwo = Object.fromEntries(LGE.names.map((n) => [n, LGE.old[n].of(LGEx.book)]));
eq([LGE.sacInts, LGEprem, LGEsplit, LGEwo], [[1, 1, 0], 30000, { Prem: 15000, Quasim: 15000, Ruchi: 0 }, { Prem: 10000, Quasim: 10000, Ruchi: 5000 }], 'l4_gw_existing');
const LGEj = journal([
  { dr: LGE.names.map((n) => [C(n), LGEwo[n]]), cr: [['Goodwill A/c', LGEx.book]], nar: 'Existing goodwill written off in the old ratio 2 : 2 : 1' },
  { dr: [['Bank A/c', LGEprem]], cr: [['Premium for Goodwill A/c', LGEprem]], nar: 'Premium for goodwill brought in cash by Sunil' },
  { dr: [['Premium for Goodwill A/c', LGEprem]], cr: LGE.names.map((n) => [C(n), LGEsplit[n]]), nar: 'Premium credited to Prem and Quasim, the only sacrificing partners' },
]);
Q('l4_gw_existing', long({
  t: [1, 2], d: 4, c: 'application', marks: 4,
  stem: `Prem, Quasim and Ruchi run an imagined boat-building yard at Alappuzha and share profits 2 : 2 : 1. Their balance sheet shows goodwill of ${rs(LGEx.book)}. They admit Sunil, and the new ratio of Prem, Quasim, Ruchi and Sunil is 3 : 3 : 2 : 2. The firm's goodwill is now valued at ${rs(LGEx.gw)}, and Sunil brings his premium in cash. Pass the journal entries for goodwill, showing your working.`,
  model: `**Working notes**\n${ratioNotes(LGE, { newRatio: [3, 3, 2, 2] }).map((l, i) => `${i + 1}. ${l}`).join('\n')} Ruchi's share is unchanged, so she gets no part of the premium.\n3. Sunil's premium = ${inr(LGEx.gw)} × ${LGE.newShare} = ${inr(LGEprem)}.\n\n${LGEj.md}`,
  sol: 'Old goodwill is written off in the old ratio before the premium is shared; a partner whose share does not fall gets none of the premium.',
  scheme: [['Sacrificing ratio (Ruchi sacrifices nothing)', 1], ['Existing goodwill written off', 1], ['Premium brought in cash', 1], ['Premium credited to Prem and Quasim', 1]],
}));

const LHF = admit({ Ehsaan: fr(3, 5), Fiza: fr(2, 5) }, 'Gagan', { proportion: fr(1, 5) });
const LHFx = { Ehsaan: 90000, Fiza: 60000, reserve: 20000, cap: 70000 };
const LHFres = Object.fromEntries(LHF.names.map((n) => [n, LHF.old[n].of(LHFx.reserve)]));
const LHFadj = LHFx.Ehsaan + LHFx.Fiza + LHFx.reserve;
const LHFimplied = fr(LHFx.cap).div(LHF.newShare).of(1);
const LHFvalue = LHFimplied - (LHFadj + LHFx.cap);
const LHFshare = LHF.newShare.of(LHFvalue);
const LHFsplit = splitRatio(LHFshare, LHF.names, LHF.sacInts);
eq([LHFimplied, LHFvalue, LHFshare, LHFsplit], [350000, 110000, 22000, { Ehsaan: 13200, Fiza: 8800 }], 'l4_hidden_full');
const LHFj = journal([
  { dr: [['General Reserve A/c', LHFx.reserve]], cr: LHF.names.map((n) => [C(n), LHFres[n]]), nar: 'General reserve transferred to the old partners in 3 : 2' },
  { dr: [['Bank A/c', LHFx.cap]], cr: [[C('Gagan'), LHFx.cap]], nar: 'Capital brought in by Gagan' },
  { dr: [[C('Gagan'), LHFshare]], cr: LHF.names.map((n) => [C(n), LHFsplit[n]]), nar: "Gagan's share of hidden goodwill credited to the sacrificing partners" },
]);
Q('l4_hidden_full', long({
  t: [2, 3], d: 4, c: 'analysis', marks: 4,
  stem: `Ehsaan and Fiza share profits 3 : 2 in an imagined pottery export firm at Khurja. Their capitals are Ehsaan ${rs(LHFx.Ehsaan)} and Fiza ${rs(LHFx.Fiza)}, and the books show a general reserve of ${rs(LHFx.reserve)}. Gagan is admitted for 1/5 share, taken from them in their old ratio, and brings ${rs(LHFx.cap)} as capital; he brings nothing for goodwill. Calculate the hidden goodwill and pass the journal entries.`,
  model: `**Working notes**\n1. Old partners' capitals after the reserve = ${inr(LHFx.Ehsaan)} + ${inr(LHFx.Fiza)} + ${inr(LHFx.reserve)} = ${rs(LHFadj)}.\n2. Implied total capital = ${inr(LHFx.cap)} ÷ 1/5 = ${rs(LHFimplied)}; actual capital = ${inr(LHFadj)} + ${inr(LHFx.cap)} = ${rs(LHFadj + LHFx.cap)}.\n3. Hidden goodwill = **${rs(LHFvalue)}**; Gagan's share = ${inr(LHFvalue)} × 1/5 = **${rs(LHFshare)}**, credited 3 : 2.\n\n${LHFj.md}`,
  sol: 'Distribute the reserve first, because the adjusted capitals are what the newcomer\'s contribution is compared with.',
  scheme: [['Reserve distributed', 1], ['Hidden goodwill', 1], ["Gagan's share and sacrificing ratio", 1], ['Journal entries', 1]],
}));

// ================================================================ t03 Revaluation and reserves
Q('m_reval_purpose', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'Assets and liabilities of a firm are revalued at the time of admitting a partner so that',
  opts: ['the new partner neither gains nor loses from changes in value that took place before he joined', 'the new partner bears a share of all past losses', 'the firm can pay less income tax in the year of admission', 'the old partners can withdraw their capitals'],
  sol: 'Changes in value belong to the period of the old firm; recording them before admission keeps the newcomer out of past gains and losses.',
}));

Q('fb_reval', fb({
  t: 3, d: 1, c: 'recall',
  stem: 'The account opened on admission to record increases and decreases in the values of assets and liabilities is called the ___ account.',
  acc: [['revaluation', 'profit and loss adjustment']],
  sol: 'It is the revaluation account (also called the profit and loss adjustment account).',
}));

Q('m_reval_dr', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Which of the following is debited to the revaluation account on the admission of a partner?',
  opts: ['An unrecorded liability now brought into the books', 'An increase in the value of land', 'A decrease in the amount payable to creditors', 'An unrecorded investment now brought into the books'],
  sol: 'A newly recorded liability reduces the firm\'s worth, which is a loss on revaluation. Rises in assets, falls in liabilities and newly found assets are gains, credited to the account.',
}));

Q('m_reval_ratio', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'Profit or loss on revaluation at the time of a partner\'s admission is shared by',
  opts: ['the old partners in their old ratio', 'all the partners, including the new one, in the new ratio', 'the old partners in their sacrificing ratio', 'the new partner alone'],
  sol: 'The change in values took place before the newcomer joined, so it belongs to the old partners in the ratio in which they shared profits then.',
}));

const MW = { reserve: 20000, claim: 26000 };
Q('m_wcr', mcq({
  t: 3, d: 3, c: 'application',
  stem: `An imagined firm's balance sheet shows a workmen compensation reserve of ${rs(MW.reserve)}. On a partner's admission, a claim for workmen compensation of ${rs(MW.claim)} is established. The correct treatment is`,
  opts: [`the reserve is used up and the excess claim of ${rs(MW.claim - MW.reserve)} is debited to the revaluation account`, `the whole reserve of ${rs(MW.reserve)} is credited to the old partners in the old ratio`, `${rs(MW.claim - MW.reserve)} is credited to the revaluation account`, 'the claim is ignored because a reserve already exists'],
  sol: `The reserve covers ${inr(MW.reserve)} of the claim; the remaining ${inr(MW.claim - MW.reserve)} is an extra liability, a loss for the old partners through revaluation.`,
}));

const MI = { reserve: 12000, book: 80000, market: 74000 };
const MIbal = MI.reserve - (MI.book - MI.market);
eq(MIbal, 6000, 'm_ifr');
Q('m_ifr', mcq({
  t: 3, d: 3, c: 'application',
  stem: `An imagined firm has an investment fluctuation reserve of ${rs(MI.reserve)}. Its investments, shown at ${rs(MI.book)}, have a market value of ${rs(MI.market)} when a new partner is admitted. The treatment of the reserve is`,
  opts: [`${rs(MIbal)} is credited to the old partners' capital accounts in the old ratio`, `${rs(MI.reserve)} is credited to the old partners in the old ratio`, `${rs(MIbal)} is debited to the revaluation account`, `${rs(MI.reserve)} is debited to the revaluation account`],
  sol: `The fall of ${inr(MI.book - MI.market)} is met from the reserve; the balance ${inr(MI.reserve)} − ${inr(MI.book - MI.market)} = ${inr(MIbal)} is a past profit of the old partners.`,
}));

Q('m_accum_loss', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'At the time of admission, the balance sheet of an imagined firm shows a debit balance in the profit and loss account. This balance is',
  opts: ["debited to the old partners' capital accounts in the old ratio", "credited to the old partners' capital accounts in the old ratio", 'debited to all the partners in the new ratio', 'carried forward to the balance sheet of the new firm'],
  sol: 'A debit balance is a loss of the period before admission, so the old partners bear it in their old ratio.',
}));

const NR = { land: 45000, mach: 8000, debtors: 60000, pct: 5, elec: 2000, cred: 1500 };
const NRprov = fr(NR.pct, 100).of(NR.debtors);
const NRgain = NR.land + NR.cred;
const NRloss = NR.mach + NRprov + NR.elec;
const NRVv = revaluation([['Land (increase)', NR.land], ['Machinery (decrease)', -NR.mach], ['Provision for doubtful debts', -NRprov], ['Outstanding electricity bill', -NR.elec], ['Creditors written back', NR.cred]], { A: fr(1, 2), B: fr(1, 2) }).net;
eq([NRgain - NRloss, NRVv], [33500, 33500], 'n_reval_profit');
Q('n_reval_profit', num({
  t: 3, d: 3, c: 'application', value: NRVv, unit: '₹',
  stem: `On the admission of a partner into an imagined flour mill at Ujjain, land is revalued up by ${rs(NR.land)} and machinery down by ${rs(NR.mach)}; a provision for doubtful debts of ${NR.pct}% is created on debtors of ${rs(NR.debtors)}; an electricity bill of ${rs(NR.elec)} is outstanding but unrecorded; and creditors of ${rs(NR.cred)} will not be claimed. Calculate the profit on revaluation (in ₹).`,
  sol: `Gains: ${inr(NR.land)} + ${inr(NR.cred)} = ${inr(NRgain)}. Losses: ${inr(NR.mach)} + ${inr(NRprov)} (${NR.pct}% of ${inr(NR.debtors)}) + ${inr(NR.elec)} = ${inr(NRloss)}. Profit = ${inr(NRgain)} − ${inr(NRloss)} = ${inr(NRVv)}.`,
}));

Q('tf_reval_new', tf({
  t: 3, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? A newly admitted partner shares the profit or loss on revaluation in the new profit-sharing ratio.',
  sol: 'Revaluation records changes in value that happened while the old partners ran the firm, so only they share it, in the old ratio.',
}));

Q('fb_reserve', fb({
  t: 3, d: 2, c: 'recall', marks: 1,
  stem: 'A general reserve in the books at the time of admission is transferred to the capital accounts of the ___ partners in their ___ ratio.',
  acc: [['old'], ['old']],
  sol: 'The reserve is a past profit, so it goes to the old partners in the old ratio.',
}));

Q('match_reval', match({
  t: 3, d: 2, c: 'understanding', marks: 2,
  stem: 'Match each item found on a partner\'s admission with its treatment.',
  pairs: [
    ['Increase in the value of a building', 'Credited to the revaluation account'],
    ['Outstanding salary not yet recorded', 'Debited to the revaluation account'],
    ['General reserve in the balance sheet', "Credited to the old partners' capital accounts in the old ratio"],
    ['Debit balance of the profit and loss account', "Debited to the old partners' capital accounts in the old ratio"],
  ],
  sol: 'Gains and losses on values go through the revaluation account; past profits and losses lying in the books go straight to the old partners.',
}));

Q('ar_reval_old', ar({
  t: 3, d: 2, c: 'understanding', key: 'a',
  a: 'Profit on revaluation at the time of admission is credited to the old partners in their old ratio.',
  r: 'The rise in the values of assets took place while the old partners were running the firm.',
  sol: 'Both are true, and R gives the reason: the gain was earned before admission, so it belongs to the old partners.',
}));

Q('ar_reserve_new', ar({
  t: 3, d: 3, c: 'understanding', key: 'c',
  a: 'A general reserve appearing in the books at the time of admission is credited to the old partners in their old ratio.',
  r: 'A new partner is entitled to a share of the profits earned by the firm before his admission.',
  sol: 'A is true. R is false: the newcomer shares only the profits earned after he joins, which is precisely why the reserve goes to the old partners.',
}));

const SR = { building: 24000, stock: 4000, pct: 4, debtors: 50000, salary: 2000, comm: 1000 };
const SRprov = fr(SR.pct, 100).of(SR.debtors);
const SRV = revaluation([['Building (increase)', SR.building], ['Stock (decrease)', -SR.stock], ['Provision for doubtful debts', -SRprov], ['Outstanding salary', -SR.salary], ['Accrued commission', SR.comm]], { Varsha: fr(3, 4), Wahid: fr(1, 4) });
eq([SRV.net, SRV.parts], [17000, { Varsha: 12750, Wahid: 4250 }], 's3_reval');
Q('s3_reval', short({
  t: 3, d: 3, c: 'application', marks: 3,
  stem: `Varsha and Wahid share profits 3 : 1 in an imagined tile factory at Ahmedabad. On admitting a new partner they agree that: the building be increased by ${rs(SR.building)}; stock be reduced by ${rs(SR.stock)}; a provision for doubtful debts be made at ${SR.pct}% on debtors of ${rs(SR.debtors)}; outstanding salary of ${rs(SR.salary)} and accrued commission of ${rs(SR.comm)}, both unrecorded, be brought into the books. Prepare the revaluation account.`,
  model: `**Revaluation Account**\n\n${SRV.md}`,
  sol: 'Losses and new liabilities on the debit side, gains and new assets on the credit side; the balancing figure goes to the old partners 3 : 1.',
  scheme: [['Debit side items', 1], ['Credit side items', 1], ['Profit shared 3 : 1', 1]],
}));

const SRS = { names: ['Yamini', 'Zubin'], old: { Yamini: fr(2, 3), Zubin: fr(1, 3) }, reserve: 36000, pl: 9000, adv: 6000 };
const sp = (x) => Object.fromEntries(SRS.names.map((n) => [n, SRS.old[n].of(x)]));
const SRSj = journal([
  { dr: [['General Reserve A/c', SRS.reserve]], cr: SRS.names.map((n) => [C(n), sp(SRS.reserve)[n]]), nar: 'General reserve transferred to the old partners in 2 : 1' },
  { dr: [['Profit and Loss A/c', SRS.pl]], cr: SRS.names.map((n) => [C(n), sp(SRS.pl)[n]]), nar: 'Credit balance of profit and loss transferred to the old partners' },
  { dr: SRS.names.map((n) => [C(n), sp(SRS.adv)[n]]), cr: [['Advertisement Suspense A/c', SRS.adv]], nar: 'Advertisement suspense written off among the old partners' },
]);
eq([sp(SRS.reserve), sp(SRS.pl), sp(SRS.adv)], [{ Yamini: 24000, Zubin: 12000 }, { Yamini: 6000, Zubin: 3000 }, { Yamini: 4000, Zubin: 2000 }], 's3_reserves');
Q('s3_reserves', short({
  t: 3, d: 3, c: 'application', marks: 3,
  stem: `Yamini and Zubin run an imagined bakery at Thane and share profits 2 : 1. When they admit Aarav, their balance sheet shows a general reserve of ${rs(SRS.reserve)}, a credit balance of ${rs(SRS.pl)} in the profit and loss account, and an advertisement suspense (deferred revenue expenditure) of ${rs(SRS.adv)} on the assets side. Pass the journal entries.`,
  model: SRSj.md,
  sol: 'Accumulated profits are credited and accumulated losses debited to the old partners, always in the old ratio, before the newcomer shares anything.',
  scheme: [['General reserve entry', 1], ['Profit and loss credit balance entry', 1], ['Advertisement suspense written off', 1]],
}));

const SWI = { names: ['Abhay', 'Bina'], old: { Abhay: fr(1, 2), Bina: fr(1, 2) }, wcr: 18000, claim: 10000, ifr: 9000, book: 60000, market: 54000 };
const SWIfall = SWI.book - SWI.market;
const half = (x) => Object.fromEntries(SWI.names.map((n) => [n, SWI.old[n].of(x)]));
const SWIj = journal([
  { dr: [['Workmen Compensation Reserve A/c', SWI.wcr]], cr: [['Workmen Compensation Claim A/c', SWI.claim], ...SWI.names.map((n) => [C(n), half(SWI.wcr - SWI.claim)[n]])], nar: 'Claim provided out of the reserve; balance to the old partners' },
  { dr: [['Investment Fluctuation Reserve A/c', SWI.ifr]], cr: [['Investments A/c', SWIfall], ...SWI.names.map((n) => [C(n), half(SWI.ifr - SWIfall)[n]])], nar: 'Fall in investments met from the reserve; balance to the old partners' },
]);
eq([SWI.wcr - SWI.claim, SWIfall, SWI.ifr - SWIfall], [8000, 6000, 3000], 's3_wcr_ifr');
Q('s3_wcr_ifr', short({
  t: 3, d: 4, c: 'application', marks: 3,
  stem: `Abhay and Bina share profits equally in an imagined mining-equipment firm at Ranchi. On the admission of Charvi, the books show a workmen compensation reserve of ${rs(SWI.wcr)} and an investment fluctuation reserve of ${rs(SWI.ifr)}. A workmen compensation claim of ${rs(SWI.claim)} is established, and investments shown at ${rs(SWI.book)} are worth ${rs(SWI.market)}. Pass the journal entries.`,
  model: `**Working note:** the claim of ${inr(SWI.claim)} is met from the reserve of ${inr(SWI.wcr)}, leaving ${inr(SWI.wcr - SWI.claim)}; the fall in investments is ${inr(SWI.book)} − ${inr(SWI.market)} = ${inr(SWIfall)}, leaving ${inr(SWI.ifr - SWIfall)} of that reserve. Both balances go to Abhay and Bina equally.\n\n${SWIj.md}`,
  sol: 'Each special reserve first meets its own purpose; only what is left over is a past profit of the old partners.',
  scheme: [['Workmen compensation reserve entry', 1.5], ['Investment fluctuation reserve entry', 1.5]],
}));

const LRV = { names: ['Chetan', 'Divya', 'Ekta'], old: { Chetan: fr(3, 5), Divya: fr(2, 5) }, caps: { Chetan: 80000, Divya: 60000 }, cap: 50000, mach: 15000, building: 5000, pct: 5, debtors: 50000, rent: 4000, inv: 1500 };
const LRVprov = fr(LRV.pct, 100).of(LRV.debtors);
const LRVr = revaluation([['Machinery (decrease)', -LRV.mach], ['Building (increase)', LRV.building], ['Provision for doubtful debts', -LRVprov], ['Outstanding rent', -LRV.rent], ['Unrecorded investment', LRV.inv]], LRV.old);
eq([LRVr.net, LRVr.parts], [-15000, { Chetan: 9000, Divya: 6000 }], 'l4_reval');
const LRVc = capitalAccounts(LRV.names, [['Revaluation A/c (loss)', LRVr.parts]], [['Balance b/d', LRV.caps], ['Bank A/c', { Ekta: LRV.cap }]]);
eq(LRVc.closing, { Chetan: 71000, Divya: 54000, Ekta: 50000 }, 'l4_reval capitals');
Q('l4_reval', long({
  t: 3, d: 3, c: 'application', marks: 4,
  stem: `Chetan and Divya run an imagined handloom unit at Maheshwar and share profits 3 : 2, with capitals of ${rs(LRV.caps.Chetan)} and ${rs(LRV.caps.Divya)}. They admit Ekta, who brings ${rs(LRV.cap)} as capital. It is agreed that machinery be reduced by ${rs(LRV.mach)} and the building raised by ${rs(LRV.building)}; a provision of ${LRV.pct}% be made on debtors of ${rs(LRV.debtors)}; rent of ${rs(LRV.rent)} is outstanding; and an investment of ${rs(LRV.inv)} not in the books be recorded. Prepare the revaluation account and the partners' capital accounts.`,
  model: `**Revaluation Account**\n\n${LRVr.md}\n\n**Partners' Capital Accounts**\n\n${LRVc.md}`,
  sol: 'Here the losses outweigh the gains, so the balancing figure sits on the credit side and reduces the old partners\' capitals.',
  scheme: [['Revaluation account items', 1], ['Loss shared 3 : 2', 1], ["Old partners' capital accounts", 1], ["Ekta's capital and closing balances", 1]],
}));

const LRR = { names: ['Faisal', 'Gita'], old: { Faisal: fr(3, 5), Gita: fr(2, 5) }, wcr: 15000, claim: 21000, ifr: 10000, fall: 4000, gr: 25000, land: 16000 };
const lrr = (x) => Object.fromEntries(LRR.names.map((n) => [n, LRR.old[n].of(x)]));
const LRRrev = LRR.land - (LRR.claim - LRR.wcr);
const LRRj = journal([
  { dr: [['Workmen Compensation Reserve A/c', LRR.wcr], ['Revaluation A/c', LRR.claim - LRR.wcr]], cr: [['Workmen Compensation Claim A/c', LRR.claim]], nar: 'Claim provided: the reserve is used up and the excess charged to revaluation' },
  { dr: [['Investment Fluctuation Reserve A/c', LRR.ifr]], cr: [['Investments A/c', LRR.fall], ...LRR.names.map((n) => [C(n), lrr(LRR.ifr - LRR.fall)[n]])], nar: 'Fall in investments met from the reserve; balance to the old partners in 3 : 2' },
  { dr: [['General Reserve A/c', LRR.gr]], cr: LRR.names.map((n) => [C(n), lrr(LRR.gr)[n]]), nar: 'General reserve transferred to the old partners in 3 : 2' },
  { dr: [['Land A/c', LRR.land]], cr: [['Revaluation A/c', LRR.land]], nar: 'Increase in the value of land' },
  { dr: [['Revaluation A/c', LRRrev]], cr: LRR.names.map((n) => [C(n), lrr(LRRrev)[n]]), nar: 'Net profit on revaluation transferred to the old partners in 3 : 2' },
]);
eq([LRRrev, lrr(LRRrev)], [10000, { Faisal: 6000, Gita: 4000 }], 'l4_reserves_reval');
Q('l4_reserves_reval', long({
  t: 3, d: 4, c: 'analysis', marks: 4,
  stem: `Faisal and Gita share profits 3 : 2 in an imagined brassware firm at Moradabad. When Harsh is admitted, the books show a workmen compensation reserve of ${rs(LRR.wcr)}, an investment fluctuation reserve of ${rs(LRR.ifr)} and a general reserve of ${rs(LRR.gr)}. A workmen compensation claim of ${rs(LRR.claim)} is accepted, the investments have fallen in value by ${rs(LRR.fall)}, and land is to be increased by ${rs(LRR.land)}. Pass the journal entries.`,
  model: `**Working note:** the claim exceeds its reserve by ${inr(LRR.claim)} − ${inr(LRR.wcr)} = ${inr(LRR.claim - LRR.wcr)}, a revaluation loss; revaluation profit = ${inr(LRR.land)} − ${inr(LRR.claim - LRR.wcr)} = ${inr(LRRrev)}.\n\n${LRRj.md}`,
  sol: 'A claim larger than its reserve uses the reserve fully and the excess becomes a revaluation loss; net the revaluation before sharing it.',
  scheme: [['Workmen compensation entry with the excess claim', 1], ['Investment fluctuation reserve entry', 1], ['General reserve entry', 1], ['Land and revaluation profit entries', 1]],
}));

// ================================================================ t04 Capitals and the new balance sheet
const MTC = { cap: 75000, share: fr(1, 4) };
const MTCv = fr(MTC.cap).div(MTC.share).of(1);
Q('m_total_cap', mcq({
  t: 4, d: 2, c: 'application',
  stem: `Hemant is admitted into an imagined tailoring firm for 1/4 share and brings ${rs(MTC.cap)} as capital. The partners' capitals are to be in the new profit-sharing ratio. The total capital of the new firm will be`,
  opts: [rs(MTCv), rs(MTCv - MTC.cap), rs(MTCv + MTC.cap), rs(MTC.cap * 2)],
  sol: `Total capital = new partner's capital ÷ his share = ${inr(MTC.cap)} ÷ 1/4 = ${inr(MTCv)}.`,
}));

Q('m_surplus', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'After all adjustments on admission, an old partner\'s capital is ₹15,000 more than the capital required in the new ratio. The partners agree to settle the difference in cash. The entry is',
  opts: ["Partner's Capital A/c Dr. To Bank A/c", "Bank A/c Dr. To Partner's Capital A/c", "Partner's Current A/c Dr. To Partner's Capital A/c", 'Bank A/c Dr. To Premium for Goodwill A/c'],
  sol: 'A surplus is paid out, which lowers the partner\'s capital and the bank balance together.',
}));

Q('m_cur_acc', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Capitals are being adjusted through current accounts after an admission. An old partner\'s capital falls short of the capital required in the new ratio. The shortage is',
  opts: ['debited to his current account and credited to his capital account', 'credited to his current account and debited to his capital account', 'brought in by him in cash', 'debited to the new partner\'s capital account'],
  sol: 'No cash moves: the capital is raised to the required figure and the same amount becomes a debit in his current account.',
}));

const MNC = { old: 270000, share: fr(1, 4) };
const MNCv = MNC.share.mul(MNC.old).div(fr(1).sub(MNC.share)).of(1);
eq(MNCv, 90000, 'm_newcap_from_old');
Q('m_newcap_from_old', mcq({
  t: 4, d: 3, c: 'application',
  stem: `The old partners' capitals of an imagined firm, after all adjustments, total ${rs(MNC.old)}. A new partner is admitted for 1/4 share and must bring capital in proportion to his share. His capital will be`,
  opts: [rs(MNCv), rs(MNC.share.of(MNC.old)), rs(MNC.old), rs(MNC.old / 2)],
  sol: `The old partners hold 3/4 of the new firm, so total capital = ${inr(MNC.old)} ÷ 3/4 = ${inr(MNC.old * 4 / 3)}, and 1/4 of it is ${inr(MNCv)}.`,
}));
check(MNC.old * 4 / 3 === 360000, 'm_newcap_from_old total');

const NRC = admit({ Isha: fr(3, 5), Kunal: fr(2, 5) }, 'Lakshya', { proportion: fr(1, 5) });
const NRCx = { cap: 60000 };
const NRCtotal = fr(NRCx.cap).div(NRC.newShare).of(1);
const NRCv = NRC.newShares.Isha.of(NRCtotal);
eq([NRCtotal, NRCv], [300000, 144000], 'n_required_cap');
Q('n_required_cap', num({
  t: 4, d: 3, c: 'application', value: NRCv, unit: '₹',
  stem: `Isha and Kunal share profits 3 : 2 in an imagined music school at Pune. Lakshya is admitted for 1/5 share, which he takes from them in their old ratio, and brings ${rs(NRCx.cap)} as capital. The old partners' capitals are to be adjusted on the basis of Lakshya's capital. Calculate the capital Isha should have in the new firm (in ₹).`,
  sol: `Total capital = ${inr(NRCx.cap)} ÷ 1/5 = ${inr(NRCtotal)}. Isha's new share = 3/5 × 4/5 = ${NRC.newShares.Isha}, so her capital = ${inr(NRCtotal)} × ${NRC.newShares.Isha} = ${inr(NRCv)}.`,
}));

const NCB = admit({ Mira: fr(1, 2), Nakul: fr(1, 2) }, 'Ojas', { proportion: fr(1, 3) });
const NCBx = { cap: 90000, Mira: 105000, Nakul: 72000 };
const NCBtotal = fr(NCBx.cap).div(NCB.newShare).of(1);
const NCBreq = NCB.newShares.Nakul.of(NCBtotal);
const NCBv = NCBreq - NCBx.Nakul;
eq([NCB.newInts, NCBtotal, NCBreq, NCBv], [[1, 1, 1], 270000, 90000, 18000], 'n_cash_to_bring');
Q('n_cash_to_bring', num({
  t: 4, d: 4, c: 'application', value: NCBv, unit: '₹',
  stem: `Mira and Nakul share profits equally in an imagined bicycle store at Mysuru. Ojas is admitted for 1/3 share, taken equally from them, and brings ${rs(NCBx.cap)} as capital. After all adjustments the capitals of Mira and Nakul are ${rs(NCBx.Mira)} and ${rs(NCBx.Nakul)}. Their capitals are to be made proportionate to the new ratio on the basis of Ojas's capital, any shortage to be brought in cash. How much cash must Nakul bring (in ₹)?`,
  sol: `New ratio 1 : 1 : 1. Total capital = ${inr(NCBx.cap)} ÷ 1/3 = ${inr(NCBtotal)}, so each partner needs ${inr(NCBreq)}. Nakul has ${inr(NCBx.Nakul)}, so he brings ${inr(NCBreq)} − ${inr(NCBx.Nakul)} = ${inr(NCBv)} (Mira will withdraw ${inr(NCBx.Mira - NCBreq)}).`,
}));

const NNO = admit({ Parth: fr(1, 2), Rhea: fr(1, 2) }, 'Sahana', { newRatio: [3, 3, 2] });
const NNOx = { old: 240000 };
const NNOoc = sumF(NNO.names.map((n) => NNO.newShares[n]));
const NNOv = NNO.newShare.mul(NNOx.old).div(NNOoc).of(1);
eq([NNOoc.toString(), NNOv], ['3/4', 80000], 'n_newcap_old');
Q('n_newcap_old', num({
  t: 4, d: 3, c: 'application', value: NNOv, unit: '₹',
  stem: `Parth and Rhea run an imagined bookshop at Kolkata, sharing profits equally. They admit Sahana, and the new ratio of Parth, Rhea and Sahana is 3 : 3 : 2. After all adjustments Parth and Rhea have combined capitals of ${rs(NNOx.old)}. Sahana is to bring capital proportionate to her share, based on the old partners' combined capital. Calculate Sahana's capital (in ₹).`,
  sol: `Parth and Rhea together hold 6/8 = ${NNOoc} of the new firm, so total capital = ${inr(NNOx.old)} ÷ ${NNOoc} = ${inr(NNOx.old * 4 / 3)}. Sahana's 2/8 = ${inr(NNOv)}.`,
}));

Q('tf_bs_reval', tf({
  t: 4, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? In the balance sheet of the new firm prepared after admission, assets and liabilities are shown at the values agreed on revaluation.',
  sol: 'Revaluation entries are made in the asset and liability accounts themselves, so the new balance sheet carries the revised figures.',
}));

const SCA = admit({ Sneha: fr(3, 5), Tarun: fr(2, 5) }, 'Uma', { proportion: fr(1, 4) });
const SCAx = { cap: 100000, Sneha: 195000, Tarun: 112000 };
const SCAtotal = fr(SCAx.cap).div(SCA.newShare).of(1);
const SCAreq = Object.fromEntries(SCA.names.map((n) => [n, SCA.newShares[n].of(SCAtotal)]));
const SCAd = Object.fromEntries(SCA.names.map((n) => [n, SCAreq[n] - SCAx[n]]));
eq([SCAtotal, SCAreq, SCAd], [400000, { Sneha: 180000, Tarun: 120000 }, { Sneha: -15000, Tarun: 8000 }], 's3_cap_adj');
const SCAj = journal([
  { dr: [[C('Sneha'), -SCAd.Sneha]], cr: [['Bank A/c', -SCAd.Sneha]], nar: 'Surplus capital withdrawn by Sneha' },
  { dr: [['Bank A/c', SCAd.Tarun]], cr: [[C('Tarun'), SCAd.Tarun]], nar: 'Deficit in capital brought in by Tarun' },
]);
Q('s3_cap_adj', short({
  t: 4, d: 3, c: 'application', marks: 3,
  stem: `Sneha and Tarun share profits 3 : 2 in an imagined toy factory at Channapatna. Uma is admitted for 1/4 share, which she takes from them in their old ratio, and brings ${rs(SCAx.cap)} as capital. After all adjustments the capitals of Sneha and Tarun are ${rs(SCAx.Sneha)} and ${rs(SCAx.Tarun)}. Their capitals are to be adjusted on the basis of Uma's capital, any surplus to be withdrawn and any deficit brought in cash. Calculate the adjustments and pass the journal entries.`,
  model: `1. New shares: Sneha 3/5 × 3/4 = ${SCA.newShares.Sneha}, Tarun 2/5 × 3/4 = ${SCA.newShares.Tarun}, Uma ${SCA.newShare}.\n2. Total capital = ${inr(SCAx.cap)} ÷ 1/4 = ${rs(SCAtotal)}; required: Sneha ${rs(SCAreq.Sneha)}, Tarun ${rs(SCAreq.Tarun)}.\n3. Sneha has a surplus of ${rs(-SCAd.Sneha)}; Tarun has a deficit of ${rs(SCAd.Tarun)}.\n\n${SCAj.md}`,
  sol: 'Grow the newcomer\'s capital into the whole, take each old partner\'s new share of it and compare with what he has.',
  scheme: [['Total capital and new shares', 1], ['Required capitals, surplus and deficit', 1], ['Journal entries', 1]],
}));

const SNO = admit({ Vikram: fr(3, 5), Wamiqa: fr(2, 5) }, 'Xavier', { proportion: fr(3, 10) });
const SNOx = { Vikram: 126000, Wamiqa: 84000 };
const SNOoc = sumF(SNO.names.map((n) => SNO.newShares[n]));
const SNOtotal = fr(SNOx.Vikram + SNOx.Wamiqa).div(SNOoc).of(1);
const SNOv = SNO.newShare.of(SNOtotal);
eq([SNOoc.toString(), SNOtotal, SNOv], ['7/10', 300000, 90000], 's3_newcap_old');
Q('s3_newcap_old', short({
  t: 4, d: 3, c: 'application', marks: 3,
  stem: `Vikram and Wamiqa run an imagined saffron trading firm at Srinagar and share profits 3 : 2. Their capitals after all adjustments are ${rs(SNOx.Vikram)} and ${rs(SNOx.Wamiqa)}. They admit Xavier for 3/10 share, taken from them in their old ratio. Xavier is to bring capital equal to his share of the total capital, based on the old partners' adjusted capitals. Calculate Xavier's capital and pass the entry for it.`,
  model: `1. Old partners' combined share in the new firm = 1 − 3/10 = ${SNOoc}.\n2. Total capital = (${inr(SNOx.Vikram)} + ${inr(SNOx.Wamiqa)}) ÷ ${SNOoc} = ${rs(SNOtotal)}.\n3. Xavier's capital = ${inr(SNOtotal)} × 3/10 = **${rs(SNOv)}**.\n\n${journal([{ dr: [['Bank A/c', SNOv]], cr: [[C('Xavier'), SNOv]], nar: 'Capital brought in by Xavier' }]).md}`,
  sol: 'The old partners\' adjusted capitals stand for their combined share; scale up to the whole, then take the newcomer\'s fraction.',
  scheme: [["Old partners' combined share", 1], ['Total capital of the new firm', 1], ["Xavier's capital and entry", 1]],
}));

const LCA = admit({ Yogesh: fr(2, 3), Zara: fr(1, 3) }, 'Aditi', { give: { Yogesh: fr(1, 8), Zara: fr(1, 8) } });
const LCAx = { cap: 72000, Yogesh: 140000, Zara: 75000 };
const LCAtotal = fr(LCAx.cap).div(LCA.newShare).of(1);
const LCAreq = Object.fromEntries(LCA.names.map((n) => [n, LCA.newShares[n].of(LCAtotal)]));
const LCAd = Object.fromEntries(LCA.names.map((n) => [n, LCAreq[n] - LCAx[n]]));
eq([LCA.newInts, LCAtotal, LCAreq, LCAd], [[13, 5, 6], 288000, { Yogesh: 156000, Zara: 60000 }, { Yogesh: 16000, Zara: -15000 }], 'l4_cap_adj');
const LCAj = journal([
  { dr: [["Yogesh's Current A/c", LCAd.Yogesh]], cr: [[C('Yogesh'), LCAd.Yogesh]], nar: "Deficit in Yogesh's capital made good from his current account" },
  { dr: [[C('Zara'), -LCAd.Zara]], cr: [["Zara's Current A/c", -LCAd.Zara]], nar: "Surplus in Zara's capital transferred to her current account" },
]);
Q('l4_cap_adj', long({
  t: [1, 4], d: 4, c: 'application', marks: 4,
  stem: `Yogesh and Zara share profits 2 : 1 in an imagined spice-grinding unit at Guntur. They admit Aditi for 1/4 share, which she takes as 1/8 from each of them, and she brings ${rs(LCAx.cap)} as capital. After all adjustments the capitals of Yogesh and Zara stand at ${rs(LCAx.Yogesh)} and ${rs(LCAx.Zara)}. Their capitals are to be made proportionate to the new ratio on the basis of Aditi's capital, by opening current accounts. Calculate the new ratio and the adjustments, and pass the journal entries.`,
  model: `${ratioNotes(LCA, { give: { Yogesh: fr(1, 8), Zara: fr(1, 8) } }).map((l, i) => `${i + 1}. ${l}`).join('\n')}\n3. Total capital = ${inr(LCAx.cap)} ÷ 1/4 = ${rs(LCAtotal)}; required: Yogesh ${rs(LCAtotal)} × ${LCA.newShares.Yogesh} = ${rs(LCAreq.Yogesh)}, Zara ${rs(LCAtotal)} × ${LCA.newShares.Zara} = ${rs(LCAreq.Zara)}.\n4. Yogesh is short by ${rs(LCAd.Yogesh)}; Zara has ${rs(-LCAd.Zara)} more than required.\n\n${LCAj.md}`,
  sol: 'When capitals are settled through current accounts no cash moves: a shortage is debited and a surplus credited to the partner\'s current account.',
  scheme: [['New ratio 13 : 5 : 6', 1], ['Total and required capitals', 1], ['Surplus and deficit', 1], ['Entries through current accounts', 1]],
}));

// ================================================================ comprehensive problems (6 marks)
const BS6 = (r) => r.oldBS.md;
// Terms are written from the scenario itself, so a figure in the question is the figure the solver used.
const dv = (s, bl) => Math.abs(s.reval.find((x) => x[2] === bl)[3]);
const bv = (s, l) => [...s.liabs, ...s.assets].find((x) => x[0] === l)[1];
const pct = (s, bl, p) => {
  check(fr(p, 100).of(bv(s, bl)) === dv(s, bl), `${bl}: ${p}% of ${bv(s, bl)} is not ${dv(s, bl)}`);
  return `${p}%`;
};
function full(key, o) {
  o = { ...o, terms: typeof o.terms === 'function' ? o.terms(o.s) : o.terms };
  const r = solveAdmission(o.s);
  for (const [k, v] of Object.entries(o.expect)) {
    const got = k.split('.').reduce((a, p) => a?.[p], r);
    eq(got, v, `${key} ${k}`);
  }
  Q(key, long({
    t: o.t, d: o.d, c: o.c, marks: 6,
    stem: `${o.intro} Their balance sheet as at ${DATE_OLD} was:\n\n${BS6(r)}\n\n${o.terms}\n\nPrepare the revaluation account, the partners' capital accounts and the balance sheet of the new firm.`,
    model: admissionAnswer(r, o.firm),
    sol: o.sol,
    scheme: o.scheme ?? [['Revaluation account with the result shared in the old ratio', 2], ["Partners' capital accounts", 2], ['Balance sheet of the new firm', 2]],
  }));
  return r;
}

const L6A = full('l6_cash_reval', {
  t: [2, 3, 4], d: 4, c: 'application', firm: 'Godavari Agro',
  intro: 'Harish and Indu are partners in Godavari Agro, an imagined seed-processing firm at Rajahmundry, sharing profits 3 : 2.',
  s: {
    old: { Harish: fr(3, 5), Indu: fr(2, 5) }, newName: 'Jasmine', how: { proportion: fr(1, 5) },
    liabs: [['Creditors', 56000], ['Bills Payable', 14000], ['General Reserve', 25000, { reserve: true }], ["Harish's Capital", 150000, { cap: 'Harish' }], ["Indu's Capital", 100000, { cap: 'Indu' }]],
    assets: [['Bank', 30000, { bank: true }], ['Debtors', 60000], ['Stock', 75000], ['Machinery', 90000], ['Land', 90000]],
    reval: [['Land (increase)', 'A', 'Land', 18000], ['Machinery (depreciation)', 'A', 'Machinery', -9000], ['Provision for doubtful debts', 'A', 'Debtors', -3000, (b, c) => `Debtors ${inr(b)} less provision ${inr(-c)}`], ['Stock (decrease)', 'A', 'Stock', -3000]],
    goodwill: { value: 100000 }, capital: 100000,
  },
  terms: (s) => `On ${DATE_NEW} they admit Jasmine for 1/5 share, which she takes from them in their old ratio, on these terms: (a) Jasmine brings ${rs(s.capital)} as capital and her share of goodwill in cash; the firm's goodwill is valued at ${rs(s.goodwill.value)}. (b) Land is to be increased by ${pct(s, 'Land', 20)} and machinery depreciated by ${pct(s, 'Machinery', 10)}. (c) A provision for doubtful debts is to be made at ${pct(s, 'Debtors', 5)} on debtors. (d) Stock is to be valued at ${rs(bv(s, 'Stock') - dv(s, 'Stock'))}.`,
  expect: { 'reval.net': 3000, premium: 20000, 'caps.closing': { Harish: 178800, Indu: 119200, Jasmine: 100000 }, 'newBS.total': 468000, bank: 150000 },
  sol: 'Revalue first, then move the reserve and the premium into the old partners\' capitals; the bank grows by everything Jasmine brings.',
});

const L6B = full('l6_not_brought', {
  t: [2, 3, 4], d: 4, c: 'application', firm: 'Mahanadi Packaging',
  intro: 'Kamal and Leena run Mahanadi Packaging, an imagined carton-making firm at Cuttack, and share profits equally.',
  s: {
    old: { Kamal: fr(1, 2), Leena: fr(1, 2) }, newName: 'Madhav', how: { proportion: fr(1, 3) },
    liabs: [['Creditors', 40000], ["Kamal's Capital", 100000, { cap: 'Kamal' }], ["Leena's Capital", 80000, { cap: 'Leena' }]],
    assets: [['Bank', 18000, { bank: true }], ['Debtors', 42000], ['Stock', 50000], ['Furniture', 30000], ['Plant', 72000], ['Profit and Loss A/c (debit balance)', 8000, { loss: true }]],
    reval: [['Furniture (decrease)', 'A', 'Furniture', -6000], ['Provision for doubtful debts', 'A', 'Debtors', -2000, (b, c) => `Debtors ${inr(b)} less provision ${inr(-c)}`], ['Outstanding wages', 'L', 'Outstanding Wages', 4000], ['Prepaid insurance', 'A', 'Prepaid Insurance', 2000]],
    goodwill: { value: 120000, cash: 0 }, capital: 150000,
  },
  terms: (s) => `On ${DATE_NEW} Madhav is admitted for 1/3 share, taken from them equally. (a) Madhav brings ${rs(s.capital)} as capital but cannot bring any premium for goodwill; the firm's goodwill is valued at ${rs(s.goodwill.value)}. (b) Furniture is to be reduced by ${pct(s, 'Furniture', 20)}. (c) A provision for doubtful debts of ${rs(dv(s, 'Debtors'))} is to be created. (d) Wages of ${rs(dv(s, 'Outstanding Wages'))} are outstanding and insurance of ${rs(dv(s, 'Prepaid Insurance'))} is prepaid; neither is in the books.`,
  expect: { 'reval.net': -10000, premium: 40000, 'caps.closing': { Kamal: 111000, Leena: 91000, Madhav: 110000 }, 'newBS.total': 356000, bank: 168000 },
  sol: 'The accumulated loss and the revaluation loss reduce the old capitals; the unpaid premium is charged to Madhav\'s capital and credited to the others.',
});

const L6C = full('l6_hidden', {
  t: [2, 3, 4], d: 4, c: 'analysis', firm: 'Periyar Rubber',
  intro: 'Naveen and Oviya are partners in Periyar Rubber, an imagined rubber-goods firm at Kottayam, sharing profits 2 : 1.',
  s: {
    old: { Naveen: fr(2, 3), Oviya: fr(1, 3) }, newName: 'Pranjal', how: { proportion: fr(1, 4) },
    liabs: [['Creditors', 35000], ['General Reserve', 15000, { reserve: true }], ["Naveen's Capital", 140000, { cap: 'Naveen' }], ["Oviya's Capital", 100000, { cap: 'Oviya' }]],
    assets: [['Bank', 25000, { bank: true }], ['Debtors', 45000], ['Stock', 40000], ['Building', 130000], ['Machinery', 50000]],
    reval: [['Building (increase)', 'A', 'Building', 12000], ['Stock (decrease)', 'A', 'Stock', -3000]],
    goodwill: { hidden: true }, capital: 120000,
  },
  terms: (s) => `On ${DATE_NEW} they admit Pranjal for 1/4 share, taken from them in their old ratio. Pranjal brings ${rs(s.capital)} as capital and nothing for goodwill. The building is to be increased by ${rs(dv(s, 'Building'))} and stock reduced by ${rs(dv(s, 'Stock'))}.`,
  expect: { 'reval.net': 9000, 'hidden.value': 96000, premium: 24000, 'caps.closing': { Naveen: 172000, Oviya: 116000, Pranjal: 96000 }, 'newBS.total': 419000 },
  sol: 'Find the old partners\' capitals after revaluation and the reserve, then compare the capital implied by Pranjal\'s contribution with the actual total.',
  scheme: [['Revaluation account', 1], ['Hidden goodwill and its adjustment', 1], ["Partners' capital accounts", 2], ['Balance sheet of the new firm', 2]],
});

const L6D = full('l6_existing_partly', {
  t: [1, 2, 3, 4], d: 5, c: 'analysis', firm: 'Sutlej Cycles',
  intro: 'Qamar and Reema run Sutlej Cycles, an imagined cycle-parts firm at Ludhiana, sharing profits 3 : 2.',
  s: {
    old: { Qamar: fr(3, 5), Reema: fr(2, 5) }, newName: 'Sahil', how: { newRatio: [2, 1, 1] },
    liabs: [['Creditors', 30000], ['Bills Payable', 10000], ["Qamar's Capital", 100000, { cap: 'Qamar' }], ["Reema's Capital", 80000, { cap: 'Reema' }]],
    assets: [['Bank', 20000, { bank: true }], ['Debtors', 30000], ['Stock', 40000], ['Machinery', 110000], ['Goodwill', 20000, { goodwill: true }]],
    reval: [['Machinery (increase)', 'A', 'Machinery', 10000], ['Provision for doubtful debts', 'A', 'Debtors', -1500, (b, c) => `Debtors ${inr(b)} less provision ${inr(-c)}`]],
    goodwill: { value: 80000, cash: 8000 }, capital: 90000,
  },
  terms: (s) => `On ${DATE_NEW} they admit Sahil; the new ratio of Qamar, Reema and Sahil is ${ratioStr(s.how.newRatio)}. (a) Sahil brings ${rs(s.capital)} as capital. The firm's goodwill is valued at ${rs(s.goodwill.value)}, but Sahil brings only ${rs(s.goodwill.cash)} of his premium in cash. (b) Machinery is to be increased by ${rs(dv(s, 'Machinery'))}. (c) A provision for doubtful debts is to be made at ${pct(s, 'Debtors', 5)} on debtors.`,
  expect: { 'R.sacInts': [2, 3], 'reval.net': 8500, premium: 20000, 'caps.closing': { Qamar: 101100, Reema: 87400, Sahil: 78000 }, 'newBS.total': 306500, bank: 118000 },
  sol: 'Work out the sacrificing ratio from the given new ratio before sharing the premium; the old goodwill is written off in the old ratio.',
});

const L6E = full('l6_proportionate', {
  t: [2, 3, 4], d: 4, c: 'application', firm: 'Kaveri Silk',
  intro: 'Tushar and Uzma share profits 3 : 1 in Kaveri Silk, an imagined silk-weaving firm at Mysuru.',
  s: {
    old: { Tushar: fr(3, 4), Uzma: fr(1, 4) }, newName: 'Vidya', how: { proportion: fr(1, 4) },
    liabs: [['Creditors', 44000], ['Workmen Compensation Reserve', 20000, { wcr: 12000 }], ["Tushar's Capital", 150000, { cap: 'Tushar' }], ["Uzma's Capital", 70000, { cap: 'Uzma' }]],
    assets: [['Bank', 34000, { bank: true }], ['Debtors', 50000], ['Stock', 60000], ['Office Equipment', 40000], ['Building', 100000]],
    reval: [['Stock (increase)', 'A', 'Stock', 4000], ['Office equipment (decrease)', 'A', 'Office Equipment', -2000]],
    goodwill: { value: 160000 }, capital: 'proportionate',
  },
  terms: (s) => `On ${DATE_NEW} Vidya is admitted for 1/4 share, taken from the old partners in their old ratio. (a) The firm's goodwill is valued at ${rs(s.goodwill.value)}; Vidya brings her share of it in cash. (b) Stock is to be increased by ${rs(dv(s, 'Stock'))} and office equipment reduced by ${rs(dv(s, 'Office Equipment'))}. (c) A workmen compensation claim of ${rs(s.liabs.find((x) => x[2]?.wcr !== undefined)[2].wcr)} is to be provided for. (d) Vidya is to bring capital equal to 1/4 of the total capital, based on the capitals of Tushar and Uzma after all adjustments.`,
  expect: { 'reval.net': 2000, premium: 40000, K: 90000, 'caps.closing': { Tushar: 187500, Uzma: 82500, Vidya: 90000 }, 'newBS.total': 416000, bank: 164000 },
  sol: 'Finish every adjustment to the old capitals, premium included, before scaling them up to find Vidya\'s capital.',
});

const L6F = full('l6_adjust_cash', {
  t: [2, 3, 4], d: 5, c: 'analysis', firm: 'Teesta Tours',
  intro: 'Akash and Bhumi run Teesta Tours, an imagined travel company at Siliguri, sharing profits 3 : 2.',
  s: {
    old: { Akash: fr(3, 5), Bhumi: fr(2, 5) }, newName: 'Chitra', how: { proportion: fr(1, 5) },
    liabs: [['Creditors', 50000], ['Investment Fluctuation Reserve', 10000, { ifr: 4000, inv: 'Investments' }], ["Akash's Capital", 230000, { cap: 'Akash' }], ["Bhumi's Capital", 130000, { cap: 'Bhumi' }]],
    assets: [['Bank', 40000, { bank: true }], ['Investments', 60000], ['Debtors', 70000], ['Vehicles', 50000], ['Land', 200000]],
    reval: [['Vehicles (decrease)', 'A', 'Vehicles', -5000], ['Land (increase)', 'A', 'Land', 15000]],
    goodwill: { value: 125000 }, capital: 100000, adjust: 'cash',
  },
  terms: (s) => `On ${DATE_NEW} they admit Chitra for 1/5 share, taken from them in their old ratio. (a) Chitra brings ${rs(s.capital)} as capital and her share of goodwill in cash; goodwill is valued at ${rs(s.goodwill.value)}. (b) The market value of investments is ${rs(bv(s, 'Investments') - s.liabs.find((x) => x[2]?.ifr !== undefined)[2].ifr)}. (c) Vehicles are to be reduced by ${rs(dv(s, 'Vehicles'))} and land increased by ${rs(dv(s, 'Land'))}. (d) The capitals of Akash and Bhumi are to be adjusted on the basis of Chitra's capital, any surplus to be withdrawn and any deficit brought in cash.`,
  expect: { 'reval.net': 10000, premium: 25000, 'adj.diff': { Akash: -14600, Bhumi: 13600 }, 'caps.closing': { Akash: 240000, Bhumi: 160000, Chitra: 100000 }, 'newBS.total': 550000, bank: 164000 },
  sol: 'Take the old capitals through revaluation, the reserve and the premium first; only then compare them with the capitals implied by Chitra\'s contribution.',
});

const L6G = full('l6_three_current', {
  t: [1, 2, 3, 4], d: 5, c: 'analysis', firm: 'Damodar Steel Traders',
  intro: 'Dinesh, Elina and Faraz are partners in Damodar Steel Traders, an imagined steel stockist at Dhanbad, sharing profits 2 : 2 : 1.',
  s: {
    old: { Dinesh: fr(2, 5), Elina: fr(2, 5), Faraz: fr(1, 5) }, newName: 'Garima', how: { give: { Dinesh: fr(1, 10), Faraz: fr(1, 10) } },
    liabs: [['Creditors', 60000], ['General Reserve', 30000, { reserve: true }], ["Dinesh's Capital", 100000, { cap: 'Dinesh' }], ["Elina's Capital", 140000, { cap: 'Elina' }], ["Faraz's Capital", 30000, { cap: 'Faraz' }]],
    assets: [['Bank', 35000, { bank: true }], ['Debtors', 65000], ['Stock', 70000], ['Patents', 10000], ['Plant', 180000]],
    reval: [['Patents written off', 'A', 'Patents', -10000], ['Stock (increase)', 'A', 'Stock', 5000]],
    goodwill: { value: 150000 }, capital: 80000, adjust: 'current',
  },
  terms: (s) => `On ${DATE_NEW} they admit Garima for ${sumF(Object.values(s.how.give))} share: she gets ${s.how.give.Dinesh} of the firm's profit from Dinesh and ${s.how.give.Faraz} from Faraz, while Elina's share does not change. (a) Garima brings ${rs(s.capital)} as capital and her share of goodwill in cash; goodwill is valued at ${rs(s.goodwill.value)}. (b) Patents are worthless and stock is to be increased by ${rs(dv(s, 'Stock'))}. (c) The old partners' capitals are to be made proportionate to the new ratio on the basis of Garima's capital, by opening current accounts.`,
  expect: { 'R.newInts': [3, 4, 1, 2], 'R.sacInts': [1, 0, 1], 'reval.net': -5000, premium: 30000, 'adj.diff': { Dinesh: -5000, Elina: 10000, Faraz: -10000 }, 'caps.closing': { Dinesh: 120000, Elina: 160000, Faraz: 40000, Garima: 80000 }, 'newBS.total': 475000, bank: 145000 },
  sol: 'Only Dinesh and Faraz sacrifice, so only they receive the premium; current accounts absorb every difference, so no cash moves for the adjustment.',
  scheme: [['New ratio, sacrificing ratio and revaluation account', 2], ["Partners' capital accounts with current-account adjustments", 2], ['Balance sheet including current accounts', 2]],
});

export const FULL = { L6A, L6B, L6C, L6D, L6E, L6F, L6G };
export { balanceSheet };
