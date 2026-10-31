// ISC 12 Accounts, ch03 Reconstitution of Partnership: Admission of a Partner — question bank.
// Every firm, person and figure is imagined by SOYL and labelled as such; no textbook illustration or
// exercise and no CISCE specimen or past-paper item is reused. Every amount, ratio and statement is
// computed with acc.mjs from the givens and checked (entries balance, accounts and balance sheets total,
// shares divide exactly); the expected values pinned below (hand-checked) catch any drift in the figures.
import { Q, mcq, ar, tf, fb, match, num, short, long } from './lib.mjs';
import { fr, admit, change, rs, inr, check, journal, revaluation, capitalAccounts, solveAdmission, admissionAnswer, ratioNotes, ratioStr, splitRatio, sumF, balanceSheet, mdTable } from './acc.mjs';

const C = (n) => `${n}'s Capital A/c`;
const CU = (n) => `${n}'s Current A/c`;
const DATE_OLD = '31 March 2026';
const DATE_NEW = '1 April 2026';
const eq = (a, b, what) => check(JSON.stringify(a) === JSON.stringify(b), `${what}: got ${JSON.stringify(a)}, expected ${JSON.stringify(b)}`);
const nl = (lines) => lines.map((l, i) => `${i + 1}. ${l}`).join('\n');
const oldSplit = (old, x) => Object.fromEntries(Object.keys(old).map((n) => [n, old[n].of(x)]));

// ================================================================ t01 New, sacrificing and gaining ratios
Q('m_reconst', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'The partners of an imagined pottery firm at Khurda agree to take in a third partner while the business carries on as before. In partnership accounts this event is',
  opts: ['a reconstitution of the firm: the old agreement ends and a new one begins, but the firm is not dissolved', 'a dissolution of the firm, which closes its books and settles every account', 'a conversion of the firm into a company under the Companies Act, 2013', 'a change of name only, which needs no adjustment in the books'],
  sol: 'Any change in the relationship among the partners, such as an admission, reconstitutes the firm. The business continues, so its books are adjusted for the new agreement rather than closed.',
}));

Q('m_consent', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Under the Indian Partnership Act, 1932, the partners of an imagined spice firm can admit a new partner, unless their deed provides otherwise, only with',
  opts: ['the consent of all the existing partners', 'the consent of the partner with the largest capital', 'a majority vote of the existing partners', 'the permission of the Registrar of Firms'],
  sol: 'Section 31 of the Act makes the consent of every existing partner necessary, because the newcomer becomes an agent of each of them.',
}));

const MNR = admit({ Anirudh: fr(5, 8), Bhavya: fr(3, 8) }, 'Chandan', { proportion: fr(1, 4) });
eq(MNR.newInts, [15, 9, 8], 'm_newratio');
Q('m_newratio', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'In Malabar Spice House, an imagined export firm at Kozhikode, Anirudh and Bhavya divide profits 5 : 3. Chandan joins with a 1/4 share, which he acquires from the two of them in the ratio in which they already share. After his admission the profit-sharing ratio of Anirudh, Bhavya and Chandan is',
  opts: [ratioStr(MNR.newInts), '5 : 3 : 1', '5 : 3 : 2', '15 : 9 : 4'],
  sol: `Each old partner keeps 3/4 of his or her own share: Anirudh ${MNR.old.Anirudh} × 3/4 = ${MNR.newShares.Anirudh} and Bhavya ${MNR.old.Bhavya} × 3/4 = ${MNR.newShares.Bhavya}, while Chandan's ${MNR.newShare} is 8/32.`,
}));

const MEG = admit({ Damini: fr(2, 3), Eshwar: fr(1, 3) }, 'Falguni', { give: { Damini: fr(1, 12), Eshwar: fr(1, 12) } });
eq([MEG.newInts, MEG.sacInts], [[7, 3, 2], [1, 1]], 'm_equal_give');
Q('m_equal_give', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Damini and Eshwar run Belgaum Courier Point, an imagined franchise at Belagavi, sharing profits 2 : 1. Falguni is taken in for a 1/6 share, and each old partner hands her 1/12 of the firm\'s profit. The new ratio of Damini, Eshwar and Falguni is',
  opts: [ratioStr(MEG.newInts), '4 : 2 : 1', '2 : 1 : 1', '8 : 4 : 3'],
  sol: `A fraction of the firm's profit is subtracted directly: Damini ${MEG.old.Damini} − 1/12 = ${MEG.newShares.Damini}, Eshwar ${MEG.old.Eshwar} − 1/12 = ${MEG.newShares.Eshwar} and Falguni ${MEG.newShare}; over twelve these are 7, 3 and 2.`,
}));

const MGR = admit({ Vedika: fr(1, 2), Yatin: fr(1, 2) }, 'Zubair', { newRatio: [3, 1, 1] }, { allowGain: true });
eq([MGR.sac.Yatin.toString(), MGR.sac.Vedika.toString()], ['3/10', '-1/10'], 'm_gain_ratio');
Q('m_gain_ratio', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Vedika and Yatin own an imagined boat-repair yard at Kakinada in equal shares. On admitting Zubair they fix the profit-sharing ratio of Vedika, Yatin and Zubair at 3 : 1 : 1. The share of profit given up by Yatin is',
  opts: [`${MGR.sac.Yatin}`, '1/5', '1/10', '1/2'],
  sol: `Yatin falls from 1/2 to ${MGR.newShares.Yatin}, a sacrifice of ${MGR.sac.Yatin}. Vedika rises from 1/2 to ${MGR.newShares.Vedika} and gains ${MGR.sac.Vedika.abs()}, so Yatin's sacrifice covers Zubair's ${MGR.newShare} and Vedika's gain.`,
}));

Q('tf_possible_gain', tf({
  t: 1, d: 3, c: 'understanding', ans: true,
  stem: 'True or false? When the admission agreement of an imagined firm states the new profit-sharing ratio directly, one old partner may end up with a larger share than before while another old partner gives up more than the newcomer receives.',
  sol: 'Old share minus new share can be negative for one partner. The sacrificing partner then gives up enough to cover both the newcomer\'s share and the other old partner\'s gain, and both of them compensate him for goodwill.',
}));

const NSS = admit({ Jyoti: fr(4, 5), Keshav: fr(1, 5) }, 'Lavanya', { surrender: { Jyoti: fr(1, 4), Keshav: fr(1, 2) } });
const NSSprofit = 240000;
const NSSv = NSS.newShares.Keshav.of(NSSprofit);
eq([NSS.newInts, NSSv], [[6, 1, 3], 24000], 'n_sac_share');
Q('n_sac_share', num({
  t: 1, d: 3, c: 'application', value: NSSv, unit: '₹',
  stem: `Jyoti and Keshav run Kittur Offset, an imagined printing shop at Hubballi, and split profits 4 : 1. To admit Lavanya, Jyoti hands over 1/4 of her own share and Keshav hands over 1/2 of his own share. In the first year of the new firm the profit is ${rs(NSSprofit)}. What is Keshav's share of this profit (in ₹)?`,
  sol: `Keshav keeps 1/5 − 1/10 = ${NSS.newShares.Keshav} of the profit (he gives up half of 1/5), so his share = ${inr(NSSprofit)} × ${NSS.newShares.Keshav} = ${inr(NSSv)}, that is ${rs(NSSv)}.`,
}));

Q('fb_gain', fb({
  t: 7, d: 1, c: 'recall',
  stem: 'When the partners of an existing firm only change their profit-sharing ratio, the ratio in which the partners whose shares rise acquire their extra shares is called the ___ ratio.',
  acc: [['gaining', 'gain']],
  sol: 'It is the gaining ratio: new share minus old share for each partner whose share rises.',
}));

Q('ar_sac', ar({
  t: 1, d: 3, c: 'understanding', key: 'a',
  a: 'When the admission agreement of an imagined firm states the new profit-sharing ratio directly, the sacrificing ratio has to be worked out and may differ from the old ratio.',
  r: 'Each old partner\'s sacrifice is his old share minus his new share, and these differences need not stand in the proportion of the old shares.',
  sol: 'Both are true, and R is why A holds: the sacrifices follow from comparing the two ratios, not from the old ratio alone.',
}));

const S2N = admit({ Mrinal: fr(2, 3), Nayana: fr(1, 3) }, 'Omprakash', { give: { Mrinal: fr(1, 12), Nayana: fr(1, 6) } });
eq([S2N.newInts, S2N.sacInts], [[7, 2, 3], [1, 2]], 's2_newratio');
Q('s2_newratio', short({
  t: 1, d: 2, c: 'application', marks: 2,
  stem: 'Mrinal and Nayana share the profits of Karnal Highway Dhabas, an imagined restaurant chain, 2 : 1. They admit Omprakash for 1/4 share: Mrinal gives him 1/12 of the firm\'s profit and Nayana gives him 1/6 of the firm\'s profit. Calculate the new profit-sharing ratio and the sacrificing ratio.',
  model: nl(ratioNotes(S2N, { give: { Mrinal: fr(1, 12), Nayana: fr(1, 6) } })),
  sol: 'Fractions of the firm are subtracted directly from each old share; the sacrificing ratio is the ratio of the fractions given.',
  scheme: [[`New shares and new ratio ${ratioStr(S2N.newInts)}`, 1], [`Sacrificing ratio ${ratioStr(S2N.sacInts)}`, 1]],
}));

const S2T = admit({ Pallav: fr(1, 2), Rukmini: fr(1, 3), Shivam: fr(1, 6) }, 'Tejas', { give: { Pallav: fr(1, 8), Rukmini: fr(1, 8) } });
eq([S2T.newInts, S2T.sacInts], [[9, 5, 4, 6], [1, 1, 0]], 's2_three_old');
Q('s2_three_old', short({
  t: 1, d: 3, c: 'application', marks: 2,
  stem: 'Pallav, Rukmini and Shivam share the profits of Saptagiri Silks, an imagined saree showroom at Tirupati, 3 : 2 : 1. Tejas is admitted for 1/4 share: Pallav and Rukmini each give him 1/8 of the firm\'s profit and Shivam keeps his share unchanged. Calculate the new profit-sharing ratio and the sacrificing ratio.',
  model: `${nl(ratioNotes(S2T, { give: { Pallav: fr(1, 8), Rukmini: fr(1, 8) } }))}\n3. Shivam gives up nothing, so he has no part in the sacrificing ratio. Check: ${S2T.newInts.join(' + ')} = 24 parts.`,
  sol: 'Bring every share to the common denominator 24 before writing the ratio; a partner who gives nothing drops out of the sacrificing ratio.',
  scheme: [[`New ratio ${ratioStr(S2T.newInts)}`, 1], ['Sacrificing ratio 1 : 1 (Shivam nil)', 1]],
}));

const SGA = admit({ Girish: fr(1, 2), Hamsa: fr(1, 2) }, 'Indrajit', { newRatio: [3, 1, 1] }, { allowGain: true });
const SGAgw = 60000;
const SGAx = { ind: SGA.newShare.of(SGAgw), gir: SGA.sac.Girish.abs().of(SGAgw), ham: SGA.sac.Hamsa.of(SGAgw) };
eq(SGAx, { ind: 12000, gir: 6000, ham: 18000 }, 's3_gain_admission');
check(SGAx.ind + SGAx.gir === SGAx.ham, 's3_gain_admission compensation');
const SGAj = journal([
  { dr: [['Bank A/c', SGAx.ind]], cr: [['Premium for Goodwill A/c', SGAx.ind]], nar: 'premium for goodwill brought in cash by Indrajit' },
  { dr: [['Premium for Goodwill A/c', SGAx.ind], [C('Girish'), SGAx.gir]], cr: [[C('Hamsa'), SGAx.ham]], nar: 'Hamsa compensated for her sacrifice by Indrajit and by Girish, who gains 1/10' },
]);
Q('s3_gain_admission', short({
  t: [1, 2], d: 4, c: 'analysis', marks: 3,
  stem: `Girish and Hamsa are equal partners in Kakinada Marine Works, an imagined ship-chandling firm. They admit Indrajit, and the new ratio of Girish, Hamsa and Indrajit is agreed at 3 : 1 : 1. The firm's goodwill is valued at ${rs(SGAgw)}. Indrajit brings his share of goodwill in cash and it is retained in the business. Pass the journal entries for goodwill, showing the gain or sacrifice of each old partner.`,
  model: `**Working notes**\n${nl(ratioNotes(SGA, { newRatio: [3, 1, 1] }))}\n3. Hamsa must receive ${inr(SGAgw)} × ${SGA.sac.Hamsa} = ${rs(SGAx.ham)}: Indrajit pays ${inr(SGAgw)} × ${SGA.newShare} = ${rs(SGAx.ind)} and Girish, a gaining partner, pays ${inr(SGAgw)} × ${SGA.sac.Girish.abs()} = ${rs(SGAx.gir)}.\n\n${SGAj.md}`,
  sol: 'Compare old and new shares first; an old partner who gains pays for his gain exactly as the newcomer does.',
  scheme: [['Sacrifice of Hamsa and gain of Girish', 1], ['Goodwill shares of Indrajit and Girish', 1], ['Journal entries', 1]],
}));

Q('match_terms', match({
  t: [1, 2, 3], d: 2, c: 'recall', marks: 2,
  stem: 'Match each term used when Kolhapur Jaggery Traders, an imagined firm, admits a new partner with what it means in that admission.',
  pairs: [
    ['Sacrificing ratio', 'Proportion in which the old partners give up their shares to the newcomer'],
    ['Gaining ratio', 'Proportion in which partners whose shares rise acquire their extra shares'],
    ['Premium for goodwill', "Payment by the newcomer for his share of the firm's goodwill"],
    ['Hidden goodwill', 'Goodwill read from the capital the newcomer agrees to bring'],
  ],
  sol: 'Two ratios measure what is given up and what is gained; the premium and hidden goodwill are two ways of arriving at the newcomer\'s share of goodwill.',
}));

// ================================================================ t02 Goodwill on admission (Accounting Standard 26)
const MPA = { avg: 45000, years: 2, share: fr(1, 5) };
const MPAgw = MPA.avg * MPA.years;
const MPAv = MPA.share.of(MPAgw);
eq([MPAgw, MPAv], [90000, 18000], 'm_premium_amt');
Q('m_premium_amt', mcq({
  t: 2, d: 2, c: 'application',
  stem: `The goodwill of Rann Salt Works, an imagined firm at Gandhidham, is to be valued at two years' purchase of its average profit of ${rs(MPA.avg)}. Urvashi is admitted for a 1/5 share and will bring her share of goodwill in cash. The premium she brings is`,
  opts: [rs(MPAv), rs(MPA.share.of(MPA.avg)), rs(MPAgw), rs(fr(1, 4).of(MPAgw))],
  sol: `Goodwill = ${inr(MPA.avg)} × ${MPA.years} = ${inr(MPAgw)}; Urvashi's premium = ${inr(MPAgw)} × 1/5 = ${inr(MPAv)}.`,
}));

Q('m_premium_retained', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'On admission to Nilachal Handlooms, an imagined weaving firm at Sambalpur, the new partner brings a premium for goodwill in cash and the old partners leave it in the business. The premium finally appears in',
  opts: ["the old partners' capital accounts, credited in their sacrificing ratio", 'a goodwill account shown among the assets of the new firm', "the new partner's capital account, as part of his capital", 'the profit and loss appropriation account of the year'],
  sol: 'The premium account is closed by crediting the sacrificing partners; keeping the cash in the firm simply means that no withdrawal entry follows.',
}));

Q('m_private', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Vinay, joining an imagined interior-design studio at Puducherry, pays his share of goodwill directly to the two old partners from his personal savings, outside the studio. In the books of the studio this payment is',
  opts: ['not recorded at all; only the capital he brings into the studio is entered', "credited to the old partners' capital accounts in their sacrificing ratio", "debited to Vinay's capital account and credited to a goodwill account", 'recorded through a premium for goodwill account and then closed'],
  sol: 'The money never enters the studio\'s cash or bank, so the firm has nothing to record for it.',
}));

Q('m_current_fixed', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: 'The partners of Tawi Dry Fruits, an imagined firm at Jammu, keep fixed capitals. A new partner cannot bring his share of goodwill in cash. To adjust it, the firm',
  opts: ["debits the new partner's current account and credits the sacrificing partners' current accounts", "debits the new partner's fixed capital account and credits a goodwill account", "debits a goodwill account and credits all partners' capital accounts in the new ratio", "debits the sacrificing partners' current accounts and credits the new partner's current account"],
  sol: 'With fixed capitals, every adjustment other than capital introduced or withdrawn passes through current accounts: the newcomer\'s current account bears the charge and the sacrificing partners\' current accounts receive it.',
}));

Q('m_kind', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Instead of cash, a new partner in Chilika Prawn Farms, an imagined aquaculture firm in Odisha, brings an aerator system whose agreed value covers both his capital and his premium for goodwill. The aerator system is',
  opts: ['debited at its agreed value, with the credit split between Premium for Goodwill A/c and his capital account', 'credited to his capital account at its full value, with no premium recorded', 'debited to a goodwill account and credited to the old partners', 'recorded at the amount of his capital only, leaving the premium out of the books'],
  sol: 'An asset brought in is recorded at the value agreed; the credit side shows what it pays for, namely his premium and his capital.',
}));

const NPO = admit({ Dev: fr(3, 4), Gargi: fr(1, 4) }, 'Hiten', { newRatio: [5, 2, 3] });
const NPOgw = 120000;
const NPOprem = NPO.newShare.of(NPOgw);
const NPOsplit = splitRatio(NPOprem, NPO.names, NPO.sacInts);
eq([NPO.sacInts, NPOprem, NPOsplit], [[5, 1], 36000, { Dev: 30000, Gargi: 6000 }], 'n_premium_one');
Q('n_premium_one', num({
  t: [1, 2], d: 4, c: 'application', value: NPOsplit.Gargi, unit: '₹',
  stem: `Dev and Gargi share profits 3 : 1 in Kumaon Bakers' Supply, an imagined firm at Haldwani. They admit Hiten and agree that Dev, Gargi and Hiten will share 5 : 2 : 3. Goodwill is valued at ${rs(NPOgw)} and Hiten brings his premium in cash. How much of the premium is credited to Gargi (in ₹)?`,
  sol: `Sacrifices: Dev 3/4 − 1/2 = ${NPO.sac.Dev}, Gargi 1/4 − 1/5 = ${NPO.sac.Gargi}, a ratio of ${ratioStr(NPO.sacInts)}. Premium = ${inr(NPOgw)} × 3/10 = ${inr(NPOprem)}; Gargi's part = ${inr(NPOprem)} × 1/6 = ${inr(NPOsplit.Gargi)}.`,
}));

const S2W = admit({ Ketan: fr(3, 5), Lopa: fr(2, 5) }, 'Mohan', { proportion: fr(1, 5) });
const S2Wx = { cap: 70000, prem: 25000 };
const S2Ws = splitRatio(S2Wx.prem, S2W.names, S2W.sacInts);
eq(S2Ws, { Ketan: 15000, Lopa: 10000 }, 's2_withdraw');
const S2Wj = journal([
  { dr: [['Bank A/c', S2Wx.cap + S2Wx.prem]], cr: [[C('Mohan'), S2Wx.cap], ['Premium for Goodwill A/c', S2Wx.prem]], nar: 'capital and premium for goodwill brought in cash by Mohan' },
  { dr: [['Premium for Goodwill A/c', S2Wx.prem]], cr: [[C('Ketan'), S2Ws.Ketan], [C('Lopa'), S2Ws.Lopa]], nar: 'premium credited to the sacrificing partners in 3 : 2' },
  { dr: [[C('Ketan'), S2Ws.Ketan], [C('Lopa'), S2Ws.Lopa]], cr: [['Bank A/c', S2Wx.prem]], nar: 'whole premium withdrawn by Ketan and Lopa' },
]);
Q('s2_withdraw', short({
  t: 2, d: 2, c: 'application', marks: 2,
  stem: `Ketan and Lopa, partners in Lonar Agro Tools (an imagined firm at Buldhana) sharing 3 : 2, admit Mohan for 1/5 share, which he takes from them in their old ratio. Mohan brings ${rs(S2Wx.cap)} as capital and ${rs(S2Wx.prem)} as premium for goodwill in cash. Ketan and Lopa take out the whole premium credited to them. Journalise these transactions.`,
  model: `Sacrificing ratio = old ratio 3 : 2 (Ketan ${rs(S2Ws.Ketan)}, Lopa ${rs(S2Ws.Lopa)}).\n\n${S2Wj.md}`,
  sol: 'Credit the premium to the sacrificing partners first; the withdrawal is a separate entry against their capitals.',
  scheme: [['Cash brought and premium credited 3 : 2', 1], ['Withdrawal of the premium', 1]],
}));

const SCF = admit({ Nirmal: fr(2, 3), Ojal: fr(1, 3) }, 'Parvati', { proportion: fr(1, 4) });
const SCFx = { cap: 100000, gw: 120000, cash: 12000 };
const SCFprem = SCF.newShare.of(SCFx.gw);
const SCFs = splitRatio(SCFprem, SCF.names, SCF.sacInts);
eq([SCFprem, SCFs], [30000, { Nirmal: 20000, Ojal: 10000 }], 's3_current');
const SCFj = journal([
  { dr: [['Bank A/c', SCFx.cap + SCFx.cash]], cr: [[C('Parvati'), SCFx.cap], ['Premium for Goodwill A/c', SCFx.cash]], nar: 'capital and part of the premium brought in cash by Parvati' },
  { dr: [['Premium for Goodwill A/c', SCFx.cash], [CU('Parvati'), SCFprem - SCFx.cash]], cr: [[CU('Nirmal'), SCFs.Nirmal], [CU('Ojal'), SCFs.Ojal]], nar: "Parvati's share of goodwill credited to the sacrificing partners' current accounts in 2 : 1; the unpaid part charged to her current account" },
]);
Q('s3_current', short({
  t: 2, d: 3, c: 'application', marks: 3,
  stem: `Nirmal and Ojal keep fixed capitals in Brahmagiri Coffee Curers, an imagined firm at Madikeri, and share profits 2 : 1. Parvati is admitted for 1/4 share, taken from them in their old ratio. She brings ${rs(SCFx.cap)} as capital but only ${rs(SCFx.cash)} towards her share of goodwill; the firm's goodwill is valued at ${rs(SCFx.gw)}. Pass the journal entries, keeping the capitals fixed.`,
  model: `**Working note:** Parvati's share of goodwill = ${inr(SCFx.gw)} × 1/4 = ${rs(SCFprem)}; brought ${rs(SCFx.cash)}, unpaid ${rs(SCFprem - SCFx.cash)}. Sacrificing ratio = old ratio 2 : 1 (Nirmal ${rs(SCFs.Nirmal)}, Ojal ${rs(SCFs.Ojal)}). Because the capitals are fixed, Parvati's charge and the old partners' credits are posted to current accounts.\n\n${SCFj.md}`,
  sol: 'Fixed capitals change only for capital introduced; everything about goodwill is posted to current accounts.',
  scheme: [["Parvati's share of goodwill and the sacrificing ratio", 1], ['Entry for cash brought', 1], ['Goodwill adjustment through current accounts', 1]],
}));

const SKW = admit({ Sudhir: fr(1, 2), Tanuja: fr(1, 2) }, 'Rasika', { proportion: fr(1, 6) });
const SKWx = { equip: 150000, cash: 20000, gw: 120000 };
check(SKW.newShare.of(SKWx.gw) === SKWx.cash, 's3_kind_withdraw premium equals cash brought');
const SKWs = splitRatio(SKWx.cash, SKW.names, SKW.sacInts);
const SKWh = { Sudhir: SKWs.Sudhir / 2, Tanuja: SKWs.Tanuja / 2 };
eq([SKWs, SKWh], [{ Sudhir: 10000, Tanuja: 10000 }, { Sudhir: 5000, Tanuja: 5000 }], 's3_kind_withdraw');
const SKWj = journal([
  { dr: [['Dental Equipment A/c', SKWx.equip], ['Bank A/c', SKWx.cash]], cr: [[C('Rasika'), SKWx.equip], ['Premium for Goodwill A/c', SKWx.cash]], nar: 'equipment brought as capital and premium brought in cash by Rasika' },
  { dr: [['Premium for Goodwill A/c', SKWx.cash]], cr: [[C('Sudhir'), SKWs.Sudhir], [C('Tanuja'), SKWs.Tanuja]], nar: 'premium credited to the sacrificing partners equally' },
  { dr: [[C('Sudhir'), SKWh.Sudhir], [C('Tanuja'), SKWh.Tanuja]], cr: [['Bank A/c', SKWh.Sudhir + SKWh.Tanuja]], nar: 'half of the premium withdrawn by the old partners' },
]);
Q('s3_kind_withdraw', short({
  t: 2, d: 3, c: 'application', marks: 3,
  stem: `Sudhir and Tanuja are equal partners in Smile Arc, an imagined dental clinic at Vellore. Rasika joins for 1/6 share, taken equally from them. She brings dental equipment valued at ${rs(SKWx.equip)} as her capital and ${rs(SKWx.cash)} in cash as her share of goodwill, the clinic's goodwill being valued at ${rs(SKWx.gw)}. Sudhir and Tanuja withdraw half of the premium credited to them. Pass the journal entries.`,
  model: `**Working note:** Rasika's premium = ${inr(SKWx.gw)} × 1/6 = ${rs(SKWx.cash)}, credited 1 : 1; half of it, ${rs(SKWh.Sudhir + SKWh.Tanuja)}, is withdrawn.\n\n${SKWj.md}`,
  sol: 'Record the asset at its agreed value against her capital, pass the premium to the sacrificing partners, then the withdrawal.',
  scheme: [['Equipment and premium brought', 1], ['Premium credited 1 : 1', 1], ['Half the premium withdrawn', 1]],
}));

Q('s2_as26', short({
  t: 2, d: 2, c: 'understanding', marks: 2,
  stem: 'A partner of an imagined travel agency at Darjeeling suggests raising goodwill in the books at its full value when a new partner joins. State how goodwill is treated on admission under Accounting Standard 26 (Intangible Assets), and give one reason why his suggestion cannot be followed.',
  model: '**Treatment:** no goodwill account is raised. The new partner\'s share of goodwill is brought as a premium and credited to the sacrificing partners in the sacrificing ratio; if he cannot bring it, his capital (or current) account is debited and the sacrificing partners are credited.\n\n**Reason:** the standard allows only **purchased goodwill** to be recognised. Goodwill the firm has built up itself has no cost that can be measured reliably, so it cannot be shown as an asset.',
  sol: 'Answer in two steps: what is done instead of raising goodwill, then the standard\'s rule on self-generated goodwill.',
  scheme: [['Treatment of goodwill on admission', 1], ['Reason based on Accounting Standard 26', 1]],
}));

Q('ar_private', ar({
  t: 2, d: 2, c: 'understanding', key: 'c',
  a: 'When an incoming partner of an imagined law firm pays his premium for goodwill privately to the old partners, no entry for it is passed in the firm\'s books.',
  r: 'A premium paid privately is first deposited in the firm\'s bank account and then withdrawn by the old partners.',
  sol: 'A is true. R is false: a private payment never passes through the firm\'s bank, which is exactly why nothing is recorded.',
}));

Q('tf_premium_newratio', tf({
  t: 2, d: 1, c: 'understanding', ans: false,
  stem: 'True or false? In the books of an imagined firm admitting a partner, premium for goodwill brought in cash is shared by all the partners, including the newcomer, in the new profit-sharing ratio.',
  sol: 'Only the old partners who give up part of their share receive it, in the sacrificing ratio; the newcomer is the one paying.',
}));

const LRG = admit({ Bhaskar: fr(4, 7), Charulata: fr(3, 7) }, 'Devika', { surrender: { Bhaskar: fr(1, 4), Charulata: fr(1, 3) } });
const LRGx = { gw: 140000, cap: 100000, cash: 30000 };
const LRGprem = LRG.newShare.of(LRGx.gw);
const LRGs = splitRatio(LRGprem, LRG.names, LRG.sacInts);
eq([LRG.newInts, LRG.sacInts, LRGprem, LRGs], [[3, 2, 2], [1, 1], 40000, { Bhaskar: 20000, Charulata: 20000 }], 'l5_ratio_goodwill');
const LRGj = journal([
  { dr: [['Bank A/c', LRGx.cap + LRGx.cash]], cr: [[C('Devika'), LRGx.cap], ['Premium for Goodwill A/c', LRGx.cash]], nar: 'capital and part of the premium brought in cash by Devika' },
  { dr: [['Premium for Goodwill A/c', LRGx.cash], [C('Devika'), LRGprem - LRGx.cash]], cr: [[C('Bhaskar'), LRGs.Bhaskar], [C('Charulata'), LRGs.Charulata]], nar: 'goodwill credited to the sacrificing partners in 1 : 1; the unpaid part charged to Devika' },
]);
Q('l5_ratio_goodwill', long({
  t: [1, 2], d: 3, c: 'application', marks: 5,
  stem: `Bhaskar and Charulata own Ganjam Cashew Processors, an imagined firm at Berhampur, sharing profits 4 : 3. They admit Devika: Bhaskar gives up 1/4 of his share and Charulata gives up 1/3 of hers in Devika's favour. The firm's goodwill is valued at ${rs(LRGx.gw)}. Devika brings ${rs(LRGx.cap)} as capital, but she can pay only ${rs(LRGx.cash)} of her premium for goodwill in cash.\n\n(a) Calculate the new profit-sharing ratio and the sacrificing ratio. [2]\n\n(b) Pass the journal entries for Devika's capital and goodwill. [3]`,
  model: `**(a)**\n${nl(ratioNotes(LRG, { surrender: { Bhaskar: fr(1, 4), Charulata: fr(1, 3) } }))}\n\n**(b)** Premium = ${inr(LRGx.gw)} × ${LRG.newShare} = ${rs(LRGprem)}; brought ${rs(LRGx.cash)}, so ${rs(LRGprem - LRGx.cash)} is charged to Devika's capital. Each old partner receives ${rs(LRGs.Bhaskar)} (sacrificing ratio 1 : 1).\n\n${LRGj.md}`,
  sol: 'Equal sacrifices can come from unequal old shares; the premium follows the sacrifices, and the unpaid part is a charge on the newcomer.',
  scheme: [['(a) Sacrifices and new ratio 3 : 2 : 2', 1], ['(a) Sacrificing ratio 1 : 1', 1], ['(b) Premium and its split', 1], ['(b) Entry for cash brought', 1], ['(b) Goodwill adjustment entry', 1]],
}));

// ================================================================ t03 Hidden goodwill and goodwill already in the books
const MEX = { gw: 48000, old: { Prateek: fr(5, 8), Shalini: fr(3, 8) } };
const MEXs = oldSplit(MEX.old, MEX.gw);
eq(MEXs, { Prateek: 30000, Shalini: 18000 }, 'm_existing');
Q('m_existing', mcq({
  t: 3, d: 2, c: 'application',
  stem: `The balance sheet of Kanha Eco Lodges, an imagined resort firm at Mandla, shows goodwill of ${rs(MEX.gw)} when a third partner is admitted. The old partners, Prateek and Shalini, share profits 5 : 3. The goodwill is written off by debiting`,
  opts: [`Prateek's and Shalini's capital accounts with ${rs(MEXs.Prateek)} and ${rs(MEXs.Shalini)}`, "all three partners' capital accounts in the new ratio", `the new partner's capital account with ${rs(MEX.gw)}`, `Prateek's and Shalini's capital accounts with ${rs(MEX.gw / 2)} each`],
  sol: `Goodwill already in the books belongs to the old firm: ${inr(MEX.gw)} × 5/8 = ${inr(MEXs.Prateek)} and ${inr(MEX.gw)} × 3/8 = ${inr(MEXs.Shalini)}.`,
}));

const MH2 = { old: 210000, cap: 90000, share: fr(1, 4) };
const MH2implied = fr(MH2.cap).div(MH2.share).of(1);
const MH2v = MH2implied - (MH2.old + MH2.cap);
eq([MH2implied, MH2v], [360000, 60000], 'm_hidden2');
Q('m_hidden2', mcq({
  t: 3, d: 3, c: 'application',
  stem: `After all adjustments, the two old partners of Sundarban Honey Collective, an imagined firm, have capitals totalling ${rs(MH2.old)}. Rupali is admitted for 1/4 share with a capital of ${rs(MH2.cap)} and brings nothing for goodwill. The hidden goodwill of the firm is`,
  opts: [rs(MH2v), rs(MH2implied - MH2.old), rs(MH2.share.of(MH2v)), rs(MH2.cap)],
  sol: `Implied capital = ${inr(MH2.cap)} ÷ 1/4 = ${inr(MH2implied)}; actual = ${inr(MH2.old)} + ${inr(MH2.cap)} = ${inr(MH2.old + MH2.cap)}; hidden goodwill = ${inr(MH2v)}.`,
}));

Q('tf_hidden_new', tf({
  t: 3, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? To find the hidden goodwill of an imagined firm when a partner is admitted, the old partners\' capitals are taken after reserves and revaluation profit have been credited to them.',
  sol: 'Hidden goodwill compares the capital implied by the newcomer\'s contribution with the capitals actually in the firm, so every adjustment must first be made to the old capitals.',
}));

const NHS = { Uttam: 125000, Vimla: 75000, cap: 60000, share: fr(1, 5) };
const NHSimplied = fr(NHS.cap).div(NHS.share).of(1);
const NHSactual = NHS.Uttam + NHS.Vimla + NHS.cap;
const NHSv = NHS.share.of(NHSimplied - NHSactual);
eq([NHSimplied, NHSactual, NHSv], [300000, 260000, 8000], 'n_hidden_share');
Q('n_hidden_share', num({
  t: 3, d: 3, c: 'application', value: NHSv, unit: '₹',
  stem: `In Narmada Ferro Castings, an imagined foundry at Jabalpur, the capitals of Uttam and Vimla after all adjustments are ${rs(NHS.Uttam)} and ${rs(NHS.Vimla)}. Waman is admitted for 1/5 share, brings ${rs(NHS.cap)} as capital, and nothing is said about goodwill. By how much will Waman's capital account be debited for his share of goodwill (in ₹)?`,
  sol: `Implied total capital = ${inr(NHS.cap)} ÷ 1/5 = ${inr(NHSimplied)}; actual = ${inr(NHS.Uttam)} + ${inr(NHS.Vimla)} + ${inr(NHS.cap)} = ${inr(NHSactual)}; hidden goodwill = ${inr(NHSimplied - NHSactual)}, and Waman's share = ${inr(NHSimplied - NHSactual)} × 1/5 = ${inr(NHSv)}.`,
}));

const SHG = admit({ Abhinav: fr(3, 5), Chaitali: fr(2, 5) }, 'Dakshesh', { proportion: fr(1, 6) });
const SHGx = { Abhinav: 150000, Chaitali: 110000, cap: 70000 };
const SHGimplied = fr(SHGx.cap).div(SHG.newShare).of(1);
const SHGactual = SHGx.Abhinav + SHGx.Chaitali + SHGx.cap;
const SHGshare = SHG.newShare.of(SHGimplied - SHGactual);
const SHGs = splitRatio(SHGshare, SHG.names, SHG.sacInts);
eq([SHGimplied, SHGactual, SHGshare, SHGs], [420000, 330000, 15000, { Abhinav: 9000, Chaitali: 6000 }], 's3_hidden');
const SHGj = journal([{ dr: [[C('Dakshesh'), SHGshare]], cr: [[C('Abhinav'), SHGs.Abhinav], [C('Chaitali'), SHGs.Chaitali]], nar: "Dakshesh's share of hidden goodwill credited to the sacrificing partners in 3 : 2" }]);
Q('s3_hidden', short({
  t: 3, d: 3, c: 'application', marks: 3,
  stem: `Abhinav and Chaitali share the profits of Barak Valley Tea Brokers, an imagined firm at Silchar, 3 : 2. After all adjustments their capitals are ${rs(SHGx.Abhinav)} and ${rs(SHGx.Chaitali)}. Dakshesh enters for 1/6 share, taken from them in their old ratio, and introduces ${rs(SHGx.cap)} as capital without any premium. Compute the hidden goodwill and journalise Dakshesh's share of it.`,
  model: `1. Capital implied by Dakshesh's contribution = ${inr(SHGx.cap)} ÷ 1/6 = ${rs(SHGimplied)}.\n2. Actual capital = ${inr(SHGx.Abhinav)} + ${inr(SHGx.Chaitali)} + ${inr(SHGx.cap)} = ${rs(SHGactual)}.\n3. Hidden goodwill = ${inr(SHGimplied)} − ${inr(SHGactual)} = **${rs(SHGimplied - SHGactual)}**; Dakshesh's share = ${inr(SHGimplied - SHGactual)} × 1/6 = **${rs(SHGshare)}**, credited 3 : 2.\n\n${SHGj.md}`,
  sol: 'Scale the newcomer\'s capital up to the whole firm, compare with the capitals actually there, then charge him his fraction of the difference.',
  scheme: [['Implied and actual capital', 1], ["Hidden goodwill and Dakshesh's share", 1], ['Journal entry', 1]],
}));

const S2E = admit({ Raunak: fr(2, 3), Smita: fr(1, 3) }, 'Tushar', { proportion: fr(1, 4) });
const S2Ex = { book: 36000, gw: 96000 };
const S2Ewo = oldSplit(S2E.old, S2Ex.book);
const S2Eprem = S2E.newShare.of(S2Ex.gw);
const S2Es = splitRatio(S2Eprem, S2E.names, S2E.sacInts);
eq([S2Ewo, S2Eprem, S2Es], [{ Raunak: 24000, Smita: 12000 }, 24000, { Raunak: 16000, Smita: 8000 }], 's2_existing');
const S2Ej = journal([
  { dr: [[C('Raunak'), S2Ewo.Raunak], [C('Smita'), S2Ewo.Smita]], cr: [['Goodwill A/c', S2Ex.book]], nar: 'existing goodwill written off in the old ratio 2 : 1' },
  { dr: [['Bank A/c', S2Eprem]], cr: [['Premium for Goodwill A/c', S2Eprem]], nar: 'premium for goodwill brought in cash by Tushar' },
  { dr: [['Premium for Goodwill A/c', S2Eprem]], cr: [[C('Raunak'), S2Es.Raunak], [C('Smita'), S2Es.Smita]], nar: 'premium credited to the sacrificing partners in 2 : 1' },
]);
Q('s2_existing', short({
  t: [2, 3], d: 3, c: 'application', marks: 2,
  stem: `Raunak and Smita share 2 : 1 in Pench Timber Mart, an imagined firm at Seoni, whose books carry goodwill of ${rs(S2Ex.book)}. Tushar is admitted for 1/4 share, taken from them in their old ratio. The firm's goodwill is now valued at ${rs(S2Ex.gw)} and Tushar brings his share of it in cash. Pass the journal entries for goodwill.`,
  model: `**Working note:** Tushar's premium = ${inr(S2Ex.gw)} × 1/4 = ${rs(S2Eprem)}; sacrificing ratio = old ratio 2 : 1.\n\n${S2Ej.md}`,
  sol: 'Clear the old goodwill from the books in the old ratio before dealing with the newcomer\'s premium.',
  scheme: [['Existing goodwill written off 2 : 1', 1], ['Premium brought and credited 2 : 1', 1]],
}));

Q('ar_existing', ar({
  t: 3, d: 3, c: 'understanding', key: 'd',
  a: 'Goodwill already appearing in the books of an imagined firm at the time of admission is written off among all the partners, including the new one, in the new ratio.',
  r: 'Accounting Standard 26 permits a firm to carry only purchased goodwill in its books.',
  sol: 'A is false: the old goodwill belongs to the old firm and is written off among the old partners in their old ratio. R is a true statement of the standard.',
}));

Q('ar_hidden', ar({
  t: 3, d: 3, c: 'analysis', key: 'c',
  a: 'In the books of an imagined firm, hidden goodwill is the excess of the total capital implied by the new partner\'s contribution over the capitals actually in the firm after his admission.',
  r: 'Hidden goodwill is credited to all the partners, including the newcomer, in the new profit-sharing ratio.',
  sol: 'A defines hidden goodwill correctly. R is false: only the newcomer\'s share of it is adjusted, by debiting him and crediting the sacrificing partners.',
}));

const LHE = admit({ Eklavya: fr(3, 5), Fatima: fr(2, 5) }, 'Gaurav', { proportion: fr(1, 4) });
const LHEx = { Eklavya: 140000, Fatima: 100000, gwBook: 20000, gr: 30000, cap: 120000 };
const LHEgr = oldSplit(LHE.old, LHEx.gr);
const LHEwo = oldSplit(LHE.old, LHEx.gwBook);
const LHEadj = Object.fromEntries(LHE.names.map((n) => [n, LHEx[n] + LHEgr[n] - LHEwo[n]]));
const LHEadjT = LHEadj.Eklavya + LHEadj.Fatima;
const LHEimplied = fr(LHEx.cap).div(LHE.newShare).of(1);
const LHEhg = LHEimplied - (LHEadjT + LHEx.cap);
const LHEshare = LHE.newShare.of(LHEhg);
const LHEs = splitRatio(LHEshare, LHE.names, LHE.sacInts);
eq([LHEadj, LHEimplied, LHEhg, LHEshare, LHEs], [{ Eklavya: 146000, Fatima: 104000 }, 480000, 110000, 27500, { Eklavya: 16500, Fatima: 11000 }], 'l5_hidden_existing');
const LHEj = journal([
  { dr: [[C('Eklavya'), LHEwo.Eklavya], [C('Fatima'), LHEwo.Fatima]], cr: [['Goodwill A/c', LHEx.gwBook]], nar: 'existing goodwill written off in the old ratio 3 : 2' },
  { dr: [['General Reserve A/c', LHEx.gr]], cr: [[C('Eklavya'), LHEgr.Eklavya], [C('Fatima'), LHEgr.Fatima]], nar: 'general reserve transferred to the old partners in 3 : 2' },
  { dr: [['Bank A/c', LHEx.cap]], cr: [[C('Gaurav'), LHEx.cap]], nar: 'capital brought in by Gaurav' },
  { dr: [[C('Gaurav'), LHEshare]], cr: [[C('Eklavya'), LHEs.Eklavya], [C('Fatima'), LHEs.Fatima]], nar: "Gaurav's share of hidden goodwill credited to the sacrificing partners in 3 : 2" },
]);
Q('l5_hidden_existing', long({
  t: [3, 5], d: 4, c: 'analysis', marks: 5,
  stem: `Eklavya and Fatima share profits 3 : 2 in Sahyadri Seeds, an imagined seed company at Satara. Their capitals are ${rs(LHEx.Eklavya)} and ${rs(LHEx.Fatima)}; the balance sheet also shows goodwill of ${rs(LHEx.gwBook)} and a general reserve of ${rs(LHEx.gr)}. Gaurav is admitted for 1/4 share, taken from them in their old ratio. He brings ${rs(LHEx.cap)} as capital and nothing for goodwill.\n\n(a) Calculate the hidden goodwill of the firm and Gaurav's share of it. [2]\n\n(b) Pass the journal entries on Gaurav's admission. [3]`,
  model: `**(a)**\n1. Old partners' capitals after writing off goodwill and crediting the reserve: Eklavya ${inr(LHEx.Eklavya)} + ${inr(LHEgr.Eklavya)} − ${inr(LHEwo.Eklavya)} = ${rs(LHEadj.Eklavya)}; Fatima ${inr(LHEx.Fatima)} + ${inr(LHEgr.Fatima)} − ${inr(LHEwo.Fatima)} = ${rs(LHEadj.Fatima)}; total ${rs(LHEadjT)}.\n2. Implied total capital = ${inr(LHEx.cap)} ÷ 1/4 = ${rs(LHEimplied)}; actual = ${inr(LHEadjT)} + ${inr(LHEx.cap)} = ${rs(LHEadjT + LHEx.cap)}.\n3. Hidden goodwill = **${rs(LHEhg)}**; Gaurav's share = ${inr(LHEhg)} × 1/4 = **${rs(LHEshare)}**.\n\n**(b)**\n\n${LHEj.md}`,
  sol: 'Old goodwill and the reserve change the old capitals, so settle them before reading goodwill from Gaurav\'s capital.',
  scheme: [['(a) Adjusted capitals of the old partners', 1], ["(a) Hidden goodwill and Gaurav's share", 1], ['(b) Goodwill written off and reserve transferred', 1], ['(b) Capital brought by Gaurav', 1], ['(b) Hidden goodwill adjusted', 1]],
}));

// ================================================================ t04 Revaluation Account
Q('m_reval_cr', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'While the books of Mandovi Marine Stores, an imagined chandlery at Panaji, are adjusted for a new partner, which of these items is entered on the credit side of the Revaluation Account?',
  opts: ["An increase in the value of the firm's investments", 'A provision for doubtful debts created for the first time', 'An outstanding salary brought into the books', 'A decrease in the value of stock'],
  sol: 'A rise in an asset adds to the worth of the old firm, so it is a gain; the other three reduce that worth and are debited.',
}));

Q('m_reval_name', mcq({
  t: 4, d: 1, c: 'recall',
  stem: 'The account in which the partners of an imagined firm record changes in the values of assets and liabilities on reconstitution is the Revaluation Account, also known as the',
  opts: ['Profit and Loss Adjustment Account', 'Profit and Loss Appropriation Account', 'Realisation Account', 'Capital Adjustment Account'],
  sol: 'Both names describe one nominal account whose balance is the profit or loss on revaluation; the appropriation account divides profits and the realisation account belongs to dissolution.',
}));

const MRL = revaluation([['Building A/c (increase)', 20000], ['Stock A/c (decrease)', -8000], ['Provision for Doubtful Debts A/c', -fr(5, 100).of(60000)], ['Outstanding Wages A/c', -4000]], { A: fr(1, 2), B: fr(1, 2) });
eq(MRL.net, 5000, 'm_reval_loss');
Q('m_reval_loss', mcq({
  t: 4, d: 2, c: 'application',
  stem: `On admitting a partner, Bastar Forest Produce, an imagined firm at Jagdalpur, agrees that the building be raised by ₹20,000, stock be reduced by ₹8,000, a 5% provision be made on debtors of ₹60,000 and outstanding wages of ₹4,000 be recorded. The result of revaluation is`,
  opts: [`a profit of ${rs(MRL.net)}`, `a loss of ${rs(MRL.net)}`, `a profit of ${rs(20000 - 8000 - 4000)}`, `a profit of ${rs(20000 + 8000 + 3000 + 4000)}`],
  sol: `Gains ${inr(20000)}; losses ${inr(8000)} + ${inr(fr(5, 100).of(60000))} + ${inr(4000)} = ${inr(15000)}; profit = ${inr(20000)} − ${inr(15000)} = ${inr(MRL.net)}.`,
}));

const NRV = { mach: 80000, machPct: 10, comp: 6000, cred: 3000, debtors: 40000, provPct: 5, audit: 5000 };
const NRVr = revaluation([['Machinery A/c', -fr(NRV.machPct, 100).of(NRV.mach)], ['Computer A/c (unrecorded)', NRV.comp], ['Creditors A/c', NRV.cred], ['Provision for Doubtful Debts A/c', -fr(NRV.provPct, 100).of(NRV.debtors)], ['Outstanding Audit Fee A/c', -NRV.audit]], { Yogita: fr(5, 8), Zeeshan: fr(3, 8) });
eq([NRVr.net, NRVr.parts.Yogita], [-6000, 3750], 'n_reval');
Q('n_reval', num({
  t: 4, d: 3, c: 'application', value: NRVr.parts.Yogita, unit: '₹',
  stem: `Yogita and Zeeshan share 5 : 3 in Malwa Agro Equipment, an imagined dealership at Dewas. On a new partner's admission: machinery of ${rs(NRV.mach)} is reduced by ${NRV.machPct}%; a computer worth ${rs(NRV.comp)}, not in the books, is taken over; ${rs(NRV.cred)} of creditors will not be claimed; a ${NRV.provPct}% provision is made on debtors of ${rs(NRV.debtors)}; and an audit fee of ${rs(NRV.audit)} is outstanding. Calculate Yogita's share of the revaluation loss (in ₹).`,
  sol: `Gains ${inr(NRV.comp)} + ${inr(NRV.cred)} = ${inr(NRV.comp + NRV.cred)}; losses ${inr(8000)} + ${inr(2000)} + ${inr(NRV.audit)} = ${inr(15000)}; loss = ${inr(-NRVr.net)}, of which Yogita bears 5/8 = ${inr(NRVr.parts.Yogita)}.`,
}));
check(fr(10, 100).of(80000) === 8000 && fr(5, 100).of(40000) === 2000, 'n_reval working figures');

Q('fb_reval', fb({
  t: 4, d: 1, c: 'recall',
  stem: 'On the admission of a partner into an imagined firm, the profit or loss on revaluation is shared only by the old partners, in their ___ profit-sharing ratio.',
  acc: [['old']],
  sol: 'It is shared in the old ratio, because the changes in value arose while the old partners ran the firm.',
}));

Q('tf_reval_bs', tf({
  t: [4, 6], d: 2, c: 'understanding', ans: false,
  stem: 'True or false? After the Revaluation Account of an imagined firm is prepared on admission, the revalued assets continue to appear at their old book figures in the balance sheet of the reconstituted firm.',
  sol: 'The revaluation entries are posted to the asset and liability accounts themselves, so the new balance sheet carries the revised figures.',
}));

Q('ar_reval', ar({
  t: 4, d: 3, c: 'understanding', key: 'b',
  a: 'An unrecorded liability for repairs, discovered when an imagined garage firm admits a partner, is debited to the Revaluation Account.',
  r: 'The profit or loss on revaluation is shared by the old partners in their old profit-sharing ratio.',
  sol: 'Both statements are true, but R is about how the final balance is shared, not about why a new liability is a debit (it reduces the old firm\'s worth).',
}));

const SRV = { plant: 150000, plantPct: 5, inv: 4000, debtors: 75000, provPct: 2, repair: 2000, ins: 1500 };
const SRVr = revaluation([['Plant A/c (depreciation)', -fr(SRV.plantPct, 100).of(SRV.plant)], ['Investments A/c (increase)', SRV.inv], ['Provision for Doubtful Debts A/c', -fr(SRV.provPct, 100).of(SRV.debtors)], ['Outstanding Repair Bill A/c', -SRV.repair], ['Prepaid Insurance A/c', SRV.ins]], { Ekansh: fr(3, 5), Falak: fr(2, 5) });
eq([SRVr.net, SRVr.parts], [-5500, { Ekansh: 3300, Falak: 2200 }], 's3_reval');
Q('s3_reval', short({
  t: 4, d: 3, c: 'application', marks: 3,
  stem: `Ekansh and Falak, partners in Konkan Cold Storage (an imagined firm at Ratnagiri) sharing 3 : 2, admit Gayatri. They agree that plant of ${rs(SRV.plant)} be depreciated by ${SRV.plantPct}%; investments be raised by ${rs(SRV.inv)}; a provision of ${SRV.provPct}% be made on debtors of ${rs(SRV.debtors)}; and an unpaid repair bill of ${rs(SRV.repair)} and prepaid insurance of ${rs(SRV.ins)}, neither yet in the books, be recorded. Prepare the Revaluation Account.`,
  model: `**Revaluation Account**\n\n${SRVr.md}\n\nLoss ${rs(-SRVr.net)}, borne by Ekansh ${rs(SRVr.parts.Ekansh)} and Falak ${rs(SRVr.parts.Falak)} in 3 : 2.`,
  sol: 'Losses and new liabilities on the debit side, gains and new assets on the credit side; here the debit side is heavier, so the balancing loss sits on the credit side.',
  scheme: [['Debit side items', 1], ['Credit side items', 1], ['Loss shared 3 : 2', 1]],
}));

Q('s3_why_reval', short({
  t: 4, d: 2, c: 'understanding', marks: 3,
  stem: 'The partners of Laitlum Orchards, an imagined fruit firm at Shillong, are about to admit a new partner and ask why their assets and liabilities must be revalued first. Explain the purpose of revaluation on admission, state who shares its result and in what ratio, and give the journal entry for a revaluation profit.',
  model: '**Purpose:** the books show historical figures, which may be out of date on the day of admission: the orchard land may have risen in value, stock may have spoiled, or a liability may be missing. Revaluing first keeps gains and losses that arose before the admission away from the incoming partner.\n\n**Who shares the result:** only the old partners, in their **old profit-sharing ratio**, because the changes in value happened while they ran the firm.\n\n**Entry for a profit:** Revaluation A/c Dr. To old partners\' Capital A/cs (in the old ratio).',
  sol: 'Tie every point to timing: the change in value belongs to the period before the newcomer joined.',
  scheme: [['Purpose of revaluation', 1], ['Result shared by old partners in the old ratio', 1], ['Journal entry for a revaluation profit', 1]],
}));

const LRC = { old: { Haridas: fr(2, 3), Indumati: fr(1, 3) }, caps: { Haridas: 90000, Indumati: 60000 }, cap: 60000, stock: 5000, building: 17000, debtors: 50000, provPct: 3, salary: 2500, interest: 1000 };
const LRCr = revaluation([['Stock A/c (decrease)', -LRC.stock], ['Building A/c (increase)', LRC.building], ['Provision for Doubtful Debts A/c', -fr(LRC.provPct, 100).of(LRC.debtors)], ['Outstanding Salary A/c', -LRC.salary], ['Accrued Interest A/c', LRC.interest]], LRC.old);
const LRCc = capitalAccounts(['Haridas', 'Indumati', 'Jagdish'], [], [['Balance b/d', LRC.caps], ['Revaluation A/c (profit)', LRCr.parts], ['Bank A/c', { Jagdish: LRC.cap }]]);
eq([LRCr.net, LRCr.parts, LRCc.closing], [9000, { Haridas: 6000, Indumati: 3000 }, { Haridas: 96000, Indumati: 63000, Jagdish: 60000 }], 'l5_reval_caps');
Q('l5_reval_caps', long({
  t: [4, 6], d: 3, c: 'application', marks: 5,
  stem: `Haridas and Indumati share profits 2 : 1 in Hampi Stone Crafts, an imagined firm at Hosapete, with capitals of ${rs(LRC.caps.Haridas)} and ${rs(LRC.caps.Indumati)}. They admit Jagdish, who brings ${rs(LRC.cap)} as capital. It is agreed that stock be reduced by ${rs(LRC.stock)}; the building be raised by ${rs(LRC.building)}; a provision of ${LRC.provPct}% be made on debtors of ${rs(LRC.debtors)}; and salary of ${rs(LRC.salary)} outstanding and interest of ${rs(LRC.interest)} accrued, neither in the books, be recorded.\n\n(a) Prepare the Revaluation Account. [3]\n\n(b) Prepare the Partners' Capital Accounts. [2]`,
  model: `**(a) Revaluation Account**\n\n${LRCr.md}\n\n**(b) Partners' Capital Accounts**\n\n${LRCc.md}`,
  sol: 'Net the gains against the losses, give the balance to the old partners 2 : 1, then carry it into their columns of the capital accounts.',
  scheme: [['(a) Debit side items', 1], ['(a) Credit side items', 1], ['(a) Profit shared 2 : 1', 1], ["(b) Old partners' capital accounts", 1], ["(b) Jagdish's capital and closing balances", 1]],
}));

// ================================================================ t05 Reserves, accumulated profits and losses
Q('m_dre', mcq({
  t: 5, d: 2, c: 'understanding',
  stem: 'The balance sheet of Lohit Bamboo Works, an imagined firm at Tezu, shows deferred advertisement expenditure of ₹12,000 on the assets side when a new partner joins. Unless the partners decide otherwise, this balance is',
  opts: ["debited to the old partners' capital accounts in their old ratio", "credited to the old partners' capital accounts in their old ratio", 'carried to the new balance sheet as an asset of all the partners', "debited to the new partner's capital account"],
  sol: 'Deferred revenue expenditure is a past loss not yet written off, so the old partners bear it in the ratio in which they shared profits before the admission.',
}));

const MWC = { wcr: 30000, claim: 18000 };
Q('m_wcr', mcq({
  t: 5, d: 3, c: 'application',
  stem: `Kolar Granite Quarries, an imagined firm, carries a workmen compensation reserve of ${rs(MWC.wcr)}. When a partner is admitted, an actual claim of ${rs(MWC.claim)} for an injured worker is accepted. The treatment is`,
  opts: [`${rs(MWC.claim)} is shown as a liability and the remaining ${rs(MWC.wcr - MWC.claim)} is credited to the old partners in their old ratio`, `the whole ${rs(MWC.wcr)} is credited to the old partners in their old ratio`, `${rs(MWC.wcr - MWC.claim)} is debited to the Revaluation Account`, `${rs(MWC.claim)} is credited to the old partners and ${rs(MWC.wcr - MWC.claim)} is kept as a reserve`],
  sol: `The reserve first meets the claim; ${inr(MWC.wcr)} − ${inr(MWC.claim)} = ${inr(MWC.wcr - MWC.claim)} is a past profit of the old partners.`,
}));

const MIF = { ifr: 15000, book: 100000, market: 108000 };
Q('m_ifr', mcq({
  t: [4, 5], d: 4, c: 'analysis',
  stem: `Majuli Tea Estates, an imagined firm, shows an investment fluctuation reserve of ${rs(MIF.ifr)} and investments of ${rs(MIF.book)} when a partner is admitted. The investments now have a market value of ${rs(MIF.market)} and are to be shown at that value. The correct treatment is`,
  opts: [`the whole reserve of ${rs(MIF.ifr)} goes to the old partners in the old ratio, and the rise of ${rs(MIF.market - MIF.book)} is credited to the Revaluation Account`, `${rs(MIF.ifr - (MIF.market - MIF.book))} of the reserve goes to the old partners and ${rs(MIF.market - MIF.book)} is set off against the rise`, `the reserve of ${rs(MIF.ifr)} is debited to the Revaluation Account`, `the reserve is carried forward unchanged and the investments stay at ${rs(MIF.book)}`],
  sol: 'No fall has to be met, so the reserve is entirely a past profit of the old partners; the rise in value is a revaluation gain, also theirs.',
}));

Q('m_undisturbed', mcq({
  t: 5, d: 3, c: 'understanding',
  stem: 'The partners of Kalimpong Orchid Nursery, an imagined firm, decide that the general reserve shall stay in the books at its present figure after a new partner joins. The single adjustment entry that protects the old partners is',
  opts: ["New partner's Capital A/c Dr. To sacrificing partners' Capital A/cs, with the new partner's share of the reserve", "General Reserve A/c Dr. To all partners' Capital A/cs in the new ratio", "Sacrificing partners' Capital A/cs Dr. To new partner's Capital A/c", 'General Reserve A/c Dr. To Revaluation A/c'],
  sol: 'Leaving the reserve in the books gives the newcomer a share of a past profit; charging him with that share and crediting the partners who sacrificed undoes it.',
}));

const NUD = { gr: 60000, pl: 15000, dre: 9000, share: fr(1, 4) };
const NUDnet = NUD.gr + NUD.pl - NUD.dre;
const NUDv = NUD.share.of(NUDnet);
eq([NUDnet, NUDv], [66000, 16500], 'n_undisturbed');
Q('n_undisturbed', num({
  t: 5, d: 4, c: 'application', value: NUDv, unit: '₹',
  stem: `The partners of Tadoba Safari Lodges, an imagined firm at Chandrapur, share 3 : 2 and admit Harshita for 1/4 share, taken in their old ratio. The books show a general reserve of ${rs(NUD.gr)}, a credit balance of ${rs(NUD.pl)} in the profit and loss account and an advertisement suspense (deferred revenue expenditure) of ${rs(NUD.dre)}. All three are to stay in the books unchanged. By what amount is Harshita's capital account debited in the single adjustment entry (in ₹)?`,
  sol: `Net accumulated profit = ${inr(NUD.gr)} + ${inr(NUD.pl)} − ${inr(NUD.dre)} = ${inr(NUDnet)}; Harshita's share = ${inr(NUDnet)} × 1/4 = ${inr(NUDv)}.`,
}));

Q('tf_reserve', tf({
  t: 5, d: 1, c: 'understanding', ans: false,
  stem: 'True or false? A general reserve lying in the books of an imagined firm when a partner is admitted is shared by all the partners, including the newcomer, because it stays in the business.',
  sol: 'The reserve was built from profits earned before admission, so it belongs to the old partners in the old ratio; if it is kept in the books, the newcomer is charged with his share of it.',
}));

Q('tf_dre', tf({
  t: 5, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? Deferred revenue expenditure shown on the assets side of an imagined firm\'s balance sheet is always carried unchanged into the balance sheet prepared after a partner\'s admission.',
  sol: 'It is normally written off to the old partners\' capital accounts in the old ratio; only if the partners agree to leave it in the books is a single adjustment entry passed instead.',
}));

const SRS = { old: { Gurpreet: fr(1, 2), Harleen: fr(1, 2) }, gr: 30000, loss: 12000, wcr: 20000, claim: 8000 };
const srs = (x) => oldSplit(SRS.old, x);
const SRSj = journal([
  { dr: [['General Reserve A/c', SRS.gr]], cr: [[C('Gurpreet'), srs(SRS.gr).Gurpreet], [C('Harleen'), srs(SRS.gr).Harleen]], nar: 'general reserve transferred to the old partners equally' },
  { dr: [[C('Gurpreet'), srs(SRS.loss).Gurpreet], [C('Harleen'), srs(SRS.loss).Harleen]], cr: [['Profit and Loss A/c', SRS.loss]], nar: 'debit balance of profit and loss written off equally' },
  { dr: [['Workmen Compensation Reserve A/c', SRS.wcr]], cr: [['Workmen Compensation Claim A/c', SRS.claim], [C('Gurpreet'), srs(SRS.wcr - SRS.claim).Gurpreet], [C('Harleen'), srs(SRS.wcr - SRS.claim).Harleen]], nar: 'claim provided out of the reserve and the balance shared equally' },
]);
eq([srs(SRS.gr), srs(SRS.loss), srs(SRS.wcr - SRS.claim)], [{ Gurpreet: 15000, Harleen: 15000 }, { Gurpreet: 6000, Harleen: 6000 }, { Gurpreet: 6000, Harleen: 6000 }], 's3_reserves');
Q('s3_reserves', short({
  t: 5, d: 3, c: 'application', marks: 3,
  stem: `Gurpreet and Harleen are equal partners in Phulkari House, an imagined textile firm at Patiala. When Inayat is admitted, their balance sheet shows a general reserve of ${rs(SRS.gr)}, a debit balance of ${rs(SRS.loss)} in the profit and loss account and a workmen compensation reserve of ${rs(SRS.wcr)}, against which a claim of ${rs(SRS.claim)} is now accepted. Pass the journal entries for these items.`,
  model: SRSj.md,
  sol: 'Past profits are credited and past losses debited to the old partners in their old ratio; a special reserve first meets its own purpose.',
  scheme: [['General reserve entry', 1], ['Profit and loss debit balance entry', 1], ['Workmen compensation reserve entry', 1]],
}));

const S2U = admit({ Umesh: fr(5, 8), Varun: fr(3, 8) }, 'Ritwik', { proportion: fr(1, 4) });
const S2Ux = { gr: 32000, pl: 8000 };
const S2Uv = S2U.newShare.of(S2Ux.gr + S2Ux.pl);
const S2Us = splitRatio(S2Uv, S2U.names, S2U.sacInts);
eq([S2Uv, S2Us], [10000, { Umesh: 6250, Varun: 3750 }], 's2_undisturbed');
const S2Uj = journal([{ dr: [[C('Ritwik'), S2Uv]], cr: [[C('Umesh'), S2Us.Umesh], [C('Varun'), S2Us.Varun]], nar: "Ritwik's share of the reserve and profit kept in the books credited to the sacrificing partners in 5 : 3" }]);
Q('s2_undisturbed', short({
  t: 5, d: 3, c: 'application', marks: 2,
  stem: `Umesh and Varun share 5 : 3 in Gwalior Leather Crafts, an imagined firm. They admit Ritwik for 1/4 share, taken in their old ratio. The general reserve of ${rs(S2Ux.gr)} and the profit and loss credit balance of ${rs(S2Ux.pl)} are to remain in the books. Pass a single journal entry to adjust them.`,
  model: `**Working note:** accumulated profits = ${inr(S2Ux.gr)} + ${inr(S2Ux.pl)} = ${rs(S2Ux.gr + S2Ux.pl)}; Ritwik's share = ${inr(S2Ux.gr + S2Ux.pl)} × 1/4 = ${rs(S2Uv)}, credited 5 : 3.\n\n${S2Uj.md}`,
  sol: 'Charge the newcomer with his fraction of the profits left in the books and give it to the sacrificing partners.',
  scheme: [["Ritwik's share of accumulated profits", 1], ['Single adjustment entry in 5 : 3', 1]],
}));

const S2X = { old: { Eshan: fr(1, 2), Gunjan: fr(1, 2) }, wcr: 24000, claim: 30000 };
const S2Xex = S2X.claim - S2X.wcr;
const S2Xs = oldSplit(S2X.old, S2Xex);
eq([S2Xex, S2Xs], [6000, { Eshan: 3000, Gunjan: 3000 }], 's2_wcr_excess');
const S2Xj = journal([
  { dr: [['Workmen Compensation Reserve A/c', S2X.wcr], ['Revaluation A/c', S2Xex]], cr: [['Workmen Compensation Claim A/c', S2X.claim]], nar: 'claim recorded; the reserve is used up and the excess charged to revaluation' },
  { dr: [[C('Eshan'), S2Xs.Eshan], [C('Gunjan'), S2Xs.Gunjan]], cr: [['Revaluation A/c', S2Xex]], nar: 'revaluation loss borne equally by the old partners' },
]);
Q('s2_wcr_excess', short({
  t: [4, 5], d: 3, c: 'application', marks: 2,
  stem: `In Sivakasi Match Works, an imagined firm, Eshan and Gunjan share equally and keep a workmen compensation reserve of ${rs(S2X.wcr)}. On admitting Jayant, a workmen compensation claim of ${rs(S2X.claim)} is accepted. There are no other changes in value. Pass the journal entries.`,
  model: `**Working note:** the claim exceeds the reserve by ${inr(S2X.claim)} − ${inr(S2X.wcr)} = ${rs(S2Xex)}, a revaluation loss of the old partners.\n\n${S2Xj.md}`,
  sol: 'A claim larger than its reserve uses the reserve fully; the excess is a loss of the old firm, routed through revaluation.',
  scheme: [['Claim recorded and the excess debited to revaluation', 1], ['Revaluation loss borne equally', 1]],
}));

Q('ar_reserve', ar({
  t: 5, d: 3, c: 'understanding', key: 'a',
  a: 'When the partners of an imagined firm keep the general reserve in the books after admitting a partner, the new partner\'s capital account is debited with his share of the reserve.',
  r: 'An incoming partner has no claim on profits that the firm earned before his admission.',
  sol: 'Both are true and R explains A: the debit takes back the share of past profit that the newcomer would otherwise receive.',
}));

const LRS = admit({ Kalyani: fr(3, 4), Lokesh: fr(1, 4) }, 'Madhuri', { proportion: fr(1, 5) });
const LRSx = { gr: 40000, pl: 16000, dre: 8000 };
const lrs = (x) => oldSplit(LRS.old, x);
const LRSnet = LRSx.gr + LRSx.pl - LRSx.dre;
const LRSv = LRS.newShare.of(LRSnet);
const LRSs = splitRatio(LRSv, LRS.names, LRS.sacInts);
eq([lrs(LRSx.gr), lrs(LRSx.pl), lrs(LRSx.dre), LRSnet, LRSv, LRSs], [{ Kalyani: 30000, Lokesh: 10000 }, { Kalyani: 12000, Lokesh: 4000 }, { Kalyani: 6000, Lokesh: 2000 }, 48000, 9600, { Kalyani: 7200, Lokesh: 2400 }], 'l5_reserves');
const LRSa = journal([
  { dr: [['General Reserve A/c', LRSx.gr], ['Profit and Loss A/c', LRSx.pl]], cr: [[C('Kalyani'), lrs(LRSx.gr + LRSx.pl).Kalyani], [C('Lokesh'), lrs(LRSx.gr + LRSx.pl).Lokesh]], nar: 'general reserve and profit and loss credit balance transferred to the old partners in 3 : 1' },
  { dr: [[C('Kalyani'), lrs(LRSx.dre).Kalyani], [C('Lokesh'), lrs(LRSx.dre).Lokesh]], cr: [['Deferred Advertisement Expenditure A/c', LRSx.dre]], nar: 'deferred advertisement expenditure written off in 3 : 1' },
]);
const LRSb = journal([{ dr: [[C('Madhuri'), LRSv]], cr: [[C('Kalyani'), LRSs.Kalyani], [C('Lokesh'), LRSs.Lokesh]], nar: "Madhuri's share of the net accumulated profits left in the books credited to the sacrificing partners in 3 : 1" }]);
Q('l5_reserves', long({
  t: 5, d: 3, c: 'application', marks: 5,
  stem: `Kalyani and Lokesh share profits 3 : 1 in Chamundi Incense Works, an imagined firm at Nanjangud. When they admit Madhuri for 1/5 share, taken in their old ratio, the books show a general reserve of ${rs(LRSx.gr)}, a credit balance of ${rs(LRSx.pl)} in the profit and loss account and deferred advertisement expenditure of ${rs(LRSx.dre)}.\n\n(a) Pass the journal entries if these items are to be closed. [2]\n\n(b) Pass a single journal entry instead, if all three items are to remain in the books at their present figures. Show your working. [3]`,
  model: `**(a)**\n\n${LRSa.md}\n\n**(b)** Net accumulated profit = ${inr(LRSx.gr)} + ${inr(LRSx.pl)} − ${inr(LRSx.dre)} = ${rs(LRSnet)}. Madhuri's share = ${inr(LRSnet)} × 1/5 = ${rs(LRSv)}, credited to Kalyani and Lokesh in their sacrificing ratio 3 : 1 (${rs(LRSs.Kalyani)} and ${rs(LRSs.Lokesh)}).\n\n${LRSb.md}`,
  sol: 'Closing the items distributes them in the old ratio; keeping them needs one entry for the newcomer\'s share of their net balance.',
  scheme: [['(a) General reserve and profit and loss entry', 1], ['(a) Deferred advertisement expenditure written off', 1], ['(b) Net accumulated profit', 1], ["(b) Madhuri's share", 1], ['(b) Single adjustment entry in 3 : 1', 1]],
}));

// ================================================================ t06 Capitals and the new balance sheet
const MRQ = { cap: 120000, share: fr(1, 5), oldShare: fr(7, 20) };
const MRQtotal = fr(MRQ.cap).div(MRQ.share).of(1);
const MRQv = MRQ.oldShare.of(MRQtotal);
eq([MRQtotal, MRQv], [600000, 210000], 'm_required');
Q('m_required', mcq({
  t: 6, d: 3, c: 'application',
  stem: `Vasudha is admitted into Pushkar Camel Safaris, an imagined firm, for 1/5 share and brings ${rs(MRQ.cap)} as capital. The old partners' capitals are to be in proportion to the new ratio on the basis of her capital. An old partner whose new share is 7/20 should have a capital of`,
  opts: [rs(MRQv), rs(MRQ.oldShare.of(MRQ.cap)), rs(MRQtotal), rs(MRQ.oldShare.of(MRQtotal - MRQ.cap))],
  sol: `Total capital = ${inr(MRQ.cap)} ÷ 1/5 = ${inr(MRQtotal)}; required capital = ${inr(MRQtotal)} × 7/20 = ${inr(MRQv)}.`,
}));

Q('m_deficit_cur', mcq({
  t: 6, d: 2, c: 'understanding',
  stem: 'In Nilambur Teak Traders, an imagined firm, capitals are made proportionate after an admission through current accounts. One old partner\'s capital is ₹12,000 short of the required amount. The entry is',
  opts: ["Partner's Current A/c Dr. To Partner's Capital A/c ₹12,000", "Partner's Capital A/c Dr. To Partner's Current A/c ₹12,000", "Bank A/c Dr. To Partner's Capital A/c ₹12,000", "Partner's Capital A/c Dr. To Bank A/c ₹12,000"],
  sol: 'No cash moves: the capital is raised to the required figure and the same amount becomes a debit in his current account.',
}));

Q('tf_cap_adj', tf({
  t: 6, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? When the capitals of an imagined firm are adjusted through current accounts after an admission, an old partner with surplus capital is paid that surplus in cash.',
  sol: 'Through current accounts the surplus is credited to his current account; cash moves only when the partners agree to settle the difference in cash.',
}));

Q('fb_hor', fb({
  t: 6, d: 1, c: 'recall',
  stem: 'For the Accounts paper, the balance sheet of a partnership firm after the admission of a partner is drawn up in the ___ format, with liabilities and capitals on the left and assets on the right.',
  acc: [['horizontal', 'horizontal (T-shaped)']],
  sol: 'The horizontal format is used for partnership balance sheets on reconstitution, with liabilities and capitals on the left and assets on the right.',
}));

Q('match_bs', match({
  t: [4, 5, 6], d: 2, c: 'understanding', marks: 2,
  stem: 'Match each item in the books of Bhimtal Boathouse, an imagined firm, after a partner\'s admission with the way it appears in the new balance sheet.',
  pairs: [
    ['Building revalued upwards', 'Shown at the revised, higher figure on the assets side'],
    ['General reserve distributed to the old partners', "Not shown; it has moved into the old partners' capitals"],
    ['New provision for doubtful debts', 'Deducted from debtors on the assets side'],
    ["Credit balance of an old partner's current account", 'Shown on the liabilities side'],
  ],
  sol: 'Revised values replace book values, distributed reserves disappear into capitals, a provision reduces the asset it covers, and a balance owed to a partner is a liability.',
}));

const SCA = admit({ Jaswant: fr(2, 3), Kamini: fr(1, 3) }, 'Lakhan', { give: { Jaswant: fr(1, 4) } });
const SCAx = { cap: 75000, Jaswant: 140000, Kamini: 92000 };
const SCAtotal = fr(SCAx.cap).div(SCA.newShare).of(1);
const SCAreq = Object.fromEntries(SCA.names.map((n) => [n, SCA.newShares[n].of(SCAtotal)]));
const SCAd = Object.fromEntries(SCA.names.map((n) => [n, SCAreq[n] - SCAx[n]]));
eq([SCA.newInts, SCAtotal, SCAreq, SCAd], [[5, 4, 3], 300000, { Jaswant: 125000, Kamini: 100000 }, { Jaswant: -15000, Kamini: 8000 }], 's3_cap_adj');
const SCAj = journal([
  { dr: [[C('Jaswant'), -SCAd.Jaswant]], cr: [['Bank A/c', -SCAd.Jaswant]], nar: 'surplus capital withdrawn by Jaswant' },
  { dr: [['Bank A/c', SCAd.Kamini]], cr: [[C('Kamini'), SCAd.Kamini]], nar: 'shortfall in capital brought in by Kamini' },
]);
Q('s3_cap_adj', short({
  t: [1, 6], d: 4, c: 'application', marks: 3,
  stem: `Jaswant and Kamini share 2 : 1 in Rohtang Woollens, an imagined firm at Kullu. Lakhan joins for 1/4 share, all of which comes from Jaswant, and brings ${rs(SCAx.cap)} as capital. After every adjustment the capitals of Jaswant and Kamini stand at ${rs(SCAx.Jaswant)} and ${rs(SCAx.Kamini)}. They agree to make their capitals proportionate to the new ratio on the basis of Lakhan's capital, settling any difference in cash. Calculate the adjustments and pass the journal entries.`,
  model: `1. New shares: Jaswant 2/3 − 1/4 = ${SCA.newShares.Jaswant}, Kamini ${SCA.newShares.Kamini}, Lakhan ${SCA.newShare}; new ratio ${ratioStr(SCA.newInts)}.\n2. Total capital = ${inr(SCAx.cap)} ÷ 1/4 = ${rs(SCAtotal)}; required: Jaswant ${inr(SCAtotal)} × ${SCA.newShares.Jaswant} = ${rs(SCAreq.Jaswant)}, Kamini ${inr(SCAtotal)} × ${SCA.newShares.Kamini} = ${rs(SCAreq.Kamini)}.\n3. Jaswant has ${rs(-SCAd.Jaswant)} more than required and withdraws it; Kamini is ${rs(SCAd.Kamini)} short and brings it in.\n\n${SCAj.md}`,
  sol: 'Work out the new ratio first, because the required capitals follow the new shares, not the old ones.',
  scheme: [['New ratio and total capital', 1], ['Required capitals and differences', 1], ['Journal entries', 1]],
}));

const S2C = admit({ Yuvraj: fr(3, 5), Zainab: fr(2, 5) }, 'Aalok', { proportion: fr(1, 5) });
const S2Cx = { Yuvraj: 150000, Zainab: 90000 };
const S2Coc = sumF(S2C.names.map((n) => S2C.newShares[n]));
const S2Ctotal = fr(S2Cx.Yuvraj + S2Cx.Zainab).div(S2Coc).of(1);
const S2Cv = S2C.newShare.of(S2Ctotal);
eq([S2Coc.toString(), S2Ctotal, S2Cv], ['4/5', 300000, 60000], 's2_newcap');
Q('s2_newcap', short({
  t: 6, d: 3, c: 'application', marks: 2,
  stem: `In Sambhar Salt Traders, an imagined firm at Phulera, Yuvraj and Zainab (3 : 2) have capitals of ${rs(S2Cx.Yuvraj)} and ${rs(S2Cx.Zainab)} after all adjustments. They take in Aalok for 1/5 share, which he takes from them in their old ratio, on condition that his capital bears the same proportion to the total capital as his share of profit. Find Aalok's capital and journalise it.`,
  model: `1. Yuvraj and Zainab together hold 1 − 1/5 = ${S2Coc} of the new firm, so total capital = ${inr(S2Cx.Yuvraj + S2Cx.Zainab)} ÷ ${S2Coc} = ${rs(S2Ctotal)}.\n2. Aalok's capital = ${inr(S2Ctotal)} × 1/5 = **${rs(S2Cv)}**.\n\n${journal([{ dr: [['Bank A/c', S2Cv]], cr: [[C('Aalok'), S2Cv]], nar: 'capital brought in by Aalok' }]).md}`,
  sol: 'The old partners\' capitals stand for their combined share; scale up to the whole, then take the newcomer\'s fraction.',
  scheme: [["Total capital from the old partners' capitals", 1], ["Aalok's capital and entry", 1]],
}));

const LCC = admit({ Narayan: fr(3, 5), Padma: fr(2, 5) }, 'Qutub', { proportion: fr(1, 4) });
const LCCx = { cap: 90000, Narayan: 190000, Padma: 100000 };
const LCCtotal = fr(LCCx.cap).div(LCC.newShare).of(1);
const LCCreq = Object.fromEntries(LCC.names.map((n) => [n, LCC.newShares[n].of(LCCtotal)]));
const LCCd = Object.fromEntries(LCC.names.map((n) => [n, LCCreq[n] - LCCx[n]]));
eq([LCCtotal, LCCreq, LCCd], [360000, { Narayan: 162000, Padma: 108000 }, { Narayan: -28000, Padma: 8000 }], 'l5_cap_current');
const LCCj = journal([
  { dr: [[C('Narayan'), -LCCd.Narayan]], cr: [[CU('Narayan'), -LCCd.Narayan]], nar: "surplus in Narayan's capital transferred to his current account" },
  { dr: [[CU('Padma'), LCCd.Padma]], cr: [[C('Padma'), LCCd.Padma]], nar: "shortfall in Padma's capital made good from her current account" },
]);
Q('l5_cap_current', long({
  t: 6, d: 3, c: 'application', marks: 5,
  stem: `Narayan and Padma share 3 : 2 in Kollam Coir Mats, an imagined firm. They admit Qutub for 1/4 share, taken from them in their old ratio, and he brings ${rs(LCCx.cap)} as capital. After all adjustments the capitals of Narayan and Padma are ${rs(LCCx.Narayan)} and ${rs(LCCx.Padma)}. The old partners' capitals are to be made proportionate to the new ratio on the basis of Qutub's capital by opening current accounts.\n\n(a) Calculate the total capital of the new firm and the capital each old partner should have. [2]\n\n(b) Pass the journal entries and state the balances of the current accounts. [3]`,
  model: `**(a)** Total capital = ${inr(LCCx.cap)} ÷ 1/4 = ${rs(LCCtotal)}. New shares: Narayan 3/5 × 3/4 = ${LCC.newShares.Narayan}, Padma 2/5 × 3/4 = ${LCC.newShares.Padma}. Required: Narayan ${inr(LCCtotal)} × ${LCC.newShares.Narayan} = ${rs(LCCreq.Narayan)}; Padma ${inr(LCCtotal)} × ${LCC.newShares.Padma} = ${rs(LCCreq.Padma)}.\n\n**(b)** Narayan has a surplus of ${rs(-LCCd.Narayan)}; Padma is short by ${rs(LCCd.Padma)}.\n\n${LCCj.md}\n\nNarayan's current account shows a credit balance of ${rs(-LCCd.Narayan)} (a liability of the firm) and Padma's a debit balance of ${rs(LCCd.Padma)} (an asset); the capitals become ${rs(LCCreq.Narayan)}, ${rs(LCCreq.Padma)} and ${rs(LCCx.cap)}, in the ratio ${ratioStr(LCC.newInts)}.`,
  sol: 'Through current accounts no cash moves: surpluses are credited and shortages debited to the partners\' current accounts.',
  scheme: [['(a) Total capital', 1], ['(a) Required capitals', 1], ['(b) Surplus and shortfall', 1], ["(b) Entry for Narayan's surplus", 1], ["(b) Entry for Padma's shortfall and current-account balances", 1]],
}));

const LNB = admit({ Vasant: fr(1, 2), Waheeda: fr(1, 2) }, 'Yashodhara', { proportion: fr(1, 4) });
const LNBx = { Vasant: 120000, Waheeda: 90000, creditors: 35000, outExp: 5000, bank: 15000, debtors: 45000, stock: 60000, mach: 130000 };
const LNBbefore = balanceSheet([['Creditors', LNBx.creditors], ['Outstanding Expenses', LNBx.outExp], ["Vasant's Capital", LNBx.Vasant], ["Waheeda's Capital", LNBx.Waheeda]], [['Bank', LNBx.bank], ['Debtors', LNBx.debtors], ['Stock', LNBx.stock], ['Machinery', LNBx.mach]]);
const LNBoc = sumF(LNB.names.map((n) => LNB.newShares[n]));
const LNBtotal = fr(LNBx.Vasant + LNBx.Waheeda).div(LNBoc).of(1);
const LNBcap = LNB.newShare.of(LNBtotal);
const LNBafter = balanceSheet([['Creditors', LNBx.creditors], ['Outstanding Expenses', LNBx.outExp], ["Vasant's Capital", LNBx.Vasant], ["Waheeda's Capital", LNBx.Waheeda], ["Yashodhara's Capital", LNBcap]], [['Bank', LNBx.bank + LNBcap], ['Debtors', LNBx.debtors], ['Stock', LNBx.stock], ['Machinery', LNBx.mach]]);
eq([LNBbefore.total, LNBtotal, LNBcap, LNBafter.total], [250000, 280000, 70000, 320000], 'l5_newcap_bs');
Q('l5_newcap_bs', long({
  t: 6, d: 3, c: 'application', marks: 5,
  stem: `Vasant and Waheeda are equal partners in Mahabaleshwar Strawberry Farms, an imagined firm. They admit Yashodhara for 1/4 share, taken from them equally. Their balance sheet on ${DATE_NEW}, after revaluation, the premium for goodwill and every other adjustment but before Yashodhara's capital, is:\n\n${LNBbefore.md}\n\nYashodhara is to bring in cash a capital proportionate to her share, based on the capitals of Vasant and Waheeda.\n\n(a) Calculate Yashodhara's capital. [2]\n\n(b) Prepare the Balance Sheet of the reconstituted firm in horizontal form. [3]`,
  model: `**(a)** Vasant and Waheeda together hold 1 − 1/4 = ${LNBoc} of the new firm. Total capital = (${inr(LNBx.Vasant)} + ${inr(LNBx.Waheeda)}) ÷ ${LNBoc} = ${rs(LNBtotal)}; Yashodhara's capital = ${inr(LNBtotal)} × 1/4 = **${rs(LNBcap)}**.\n\n**(b) Balance Sheet of Mahabaleshwar Strawberry Farms as at ${DATE_NEW} (after Yashodhara's admission)**\n\n${LNBafter.md}\n\nBank = ${inr(LNBx.bank)} + ${inr(LNBcap)} = ${rs(LNBx.bank + LNBcap)}.`,
  sol: 'Find the capital from the old partners\' combined share, then add it both as a third capital and to the bank.',
  scheme: [["(a) Old partners' combined share and total capital", 1], ["(a) Yashodhara's capital", 1], ['(b) Liabilities side with three capitals', 1], ['(b) Assets side with the revised bank balance', 1], ['(b) Totals agree', 1]],
}));

// ================================================================ t07 Change in profit-sharing ratio among existing partners
const MGA = change(['Kshitij', 'Lalima'], [3, 2], [1, 1]);
eq([MGA.diff.Kshitij.toString(), MGA.diff.Lalima.toString()], ['1/10', '-1/10'], 'm_gaining');
Q('m_gaining', mcq({
  t: 7, d: 2, c: 'application',
  stem: 'Kshitij and Lalima, partners in an imagined bookshop at Dharwad sharing 3 : 2, decide to share profits equally from 1 April 2026. Which statement describes the change?',
  opts: [`Kshitij sacrifices ${MGA.diff.Kshitij} and Lalima gains ${MGA.diff.Lalima.abs()}`, `Lalima sacrifices ${MGA.diff.Kshitij} and Kshitij gains ${MGA.diff.Lalima.abs()}`, `Each partner sacrifices ${MGA.diff.Kshitij}`, 'Neither partner gains, because no partner joins or leaves'],
  sol: `Kshitij: 3/5 − 1/2 = ${MGA.diff.Kshitij}, a sacrifice; Lalima: 2/5 − 1/2, a gain of ${MGA.diff.Lalima.abs()}. A change in ratio always has a sacrificer and a gainer.`,
}));

const MGC = change(['Neelima', 'Mukul'], [5, 3], [1, 1]);
const MGCgw = 80000;
const MGCa = MGC.adjust(MGCgw);
eq([MGCa.cr, MGCa.dr], [[['Neelima', 10000]], [['Mukul', 10000]]], 'm_goodwill_change');
Q('m_goodwill_change', mcq({
  t: 7, d: 3, c: 'application',
  stem: `Neelima and Mukul share the profits of an imagined pharmacy at Nanded 5 : 3 and agree to share equally in future. Goodwill is valued at ${rs(MGCgw)} and is not to appear in the books. The adjustment entry is`,
  opts: [`Mukul's Capital A/c Dr. ${rs(MGCa.value)} To Neelima's Capital A/c ${rs(MGCa.value)}`, `Neelima's Capital A/c Dr. ${rs(MGCa.value)} To Mukul's Capital A/c ${rs(MGCa.value)}`, `Goodwill A/c Dr. ${rs(MGCgw)} To Neelima's and Mukul's Capital A/cs`, `Mukul's Capital A/c Dr. ${rs(MGCgw / 2)} To Neelima's Capital A/c ${rs(MGCgw / 2)}`],
  sol: `Neelima gives up 5/8 − 1/2 = ${MGC.diff.Neelima}; ${inr(MGCgw)} × ${MGC.diff.Neelima} = ${inr(MGCa.value)} is paid by the gaining partner to the sacrificing partner.`,
}));

Q('tf_change_reval', tf({
  t: 7, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? When the partners of an imagined firm change their profit-sharing ratio, the profit on revaluation of assets is shared among them in the new ratio.',
  sol: 'The change in value arose under the old agreement, so it is shared in the old ratio, just as on an admission.',
}));

const NCH = change(['Prakash', 'Qudsia', 'Rakesh'], [3, 2, 1], [1, 1, 1]);
const NCHpl = 36000;
const NCHa = NCH.adjust(NCHpl);
eq([NCHa.by, NCH.diff.Qudsia.zero], [{ Prakash: 6000, Qudsia: 0, Rakesh: -6000 }, true], 'n_change');
Q('n_change', num({
  t: 7, d: 3, c: 'application', value: -NCHa.by.Rakesh, unit: '₹',
  stem: `Prakash, Qudsia and Rakesh share 3 : 2 : 1 in an imagined transport firm at Raipur and decide to share equally from now on. The profit and loss account shows a credit balance of ${rs(NCHpl)}, which is to remain in the books. By what amount is Rakesh's capital account debited in the adjustment entry (in ₹)?`,
  sol: `Rakesh moves from 1/6 to 1/3 and gains 1/6, so he is debited ${inr(NCHpl)} × 1/6 = ${inr(-NCHa.by.Rakesh)}; Prakash sacrifices 1/6 and is credited the same amount, while Qudsia is unaffected.`,
}));

const S2G = change(['Bindu', 'Chetna', 'Dilip'], [4, 3, 2], [1, 1, 1]);
const S2Ggw = 72000;
const S2Ga = S2G.adjust(S2Ggw);
eq([S2G.diff.Bindu.toString(), S2G.diff.Chetna.toString(), S2G.diff.Dilip.toString(), S2Ga.value], ['1/9', '0', '-1/9', 8000], 's2_gaining');
const S2Gj = journal([{ dr: [[C('Dilip'), S2Ga.value]], cr: [[C('Bindu'), S2Ga.value]], nar: 'goodwill adjusted: Dilip, the gaining partner, compensates Bindu, the sacrificing partner' }]);
Q('s2_gaining', short({
  t: 7, d: 3, c: 'application', marks: 2,
  stem: `Bindu, Chetna and Dilip share 4 : 3 : 2 in Hooghly Jute Bags, an imagined firm at Howrah, and agree to share equally in future. Goodwill is valued at ${rs(S2Ggw)}. Calculate each partner's sacrifice or gain and pass the entry for goodwill.`,
  model: `${mdTable(['Partner', 'Old share', 'New share', 'Old − new', 'Result'], S2G.names.map((n) => [n, `${S2G.old[n]}`, `${S2G.new[n]}`, S2G.diff[n].sign < 0 ? `−${S2G.diff[n].abs()}` : `${S2G.diff[n]}`, S2G.diff[n].sign > 0 ? 'Sacrifices' : S2G.diff[n].sign < 0 ? 'Gains' : 'No change']))}\n\nGoodwill adjustment = ${inr(S2Ggw)} × 1/9 = ${rs(S2Ga.value)}.\n\n${S2Gj.md}`,
  sol: 'Write every share over nine; only the partners whose shares move take part in the goodwill entry.',
  scheme: [['Sacrifice of Bindu, gain of Dilip, no change for Chetna', 1], ['Goodwill adjustment entry', 1]],
}));

const SCH = change(['Manisha', 'Navin', 'Ojaswi'], [2, 2, 1], [1, 2, 2]);
const SCHx = { gw: 90000, gr: 25000 };
const SCHa = SCH.adjust(SCHx.gw);
const SCHgr = oldSplit(SCH.old, SCHx.gr);
eq([SCHa.by, SCHgr], [{ Manisha: 18000, Navin: 0, Ojaswi: -18000 }, { Manisha: 10000, Navin: 10000, Ojaswi: 5000 }], 's3_change');
const SCHj = journal([
  { dr: [[C('Ojaswi'), SCHa.value]], cr: [[C('Manisha'), SCHa.value]], nar: 'goodwill adjusted on the change in ratio: Ojaswi compensates Manisha' },
  { dr: [['General Reserve A/c', SCHx.gr]], cr: SCH.names.map((n) => [C(n), SCHgr[n]]), nar: 'general reserve distributed in the old ratio 2 : 2 : 1' },
]);
Q('s3_change', short({
  t: 7, d: 3, c: 'application', marks: 3,
  stem: `Manisha, Navin and Ojaswi, partners in Vembanad Houseboats (an imagined firm at Kumarakom), share 2 : 2 : 1. From ${DATE_NEW} they will share 1 : 2 : 2. Goodwill is valued at ${rs(SCHx.gw)}, and the general reserve of ${rs(SCHx.gr)} is to be distributed. Pass the journal entries.`,
  model: `**Working note:** Manisha 2/5 − 1/5 = ${SCH.diff.Manisha} (sacrifice); Navin 2/5 − 2/5 = 0; Ojaswi 1/5 − 2/5, a gain of ${SCH.diff.Ojaswi.abs()}. Goodwill adjustment = ${inr(SCHx.gw)} × 1/5 = ${rs(SCHa.value)}. The reserve goes in the old ratio 2 : 2 : 1.\n\n${SCHj.md}`,
  sol: 'Goodwill moves from the gainer to the sacrificer; the reserve is a past profit, so it follows the old ratio.',
  scheme: [['Sacrifice of Manisha and gain of Ojaswi', 1], ['Goodwill adjustment entry', 1], ['General reserve in the old ratio', 1]],
}));

Q('ar_gain', ar({
  t: 7, d: 3, c: 'analysis', key: 'd',
  a: 'When the partners of an imagined firm change their profit-sharing ratio, goodwill is adjusted by debiting the partner who sacrifices and crediting the partner who gains.',
  r: 'A partner who gains acquires a larger share of the future profits that the firm\'s goodwill helps to earn.',
  sol: 'A reverses the entry: the gaining partner is debited and the sacrificing partner credited. R is true, and it is the reason the gainer pays.',
}));

const LCH = change(['Rajni', 'Sohan', 'Trilok'], [5, 3, 2], [2, 2, 1]);
const LCHx = { gw: 150000, gr: 50000, loss: 10000, building: 20000, stock: 8000 };
const LCHg = LCH.adjust(LCHx.gw);
const LCHres = LCH.adjust(LCHx.gr - LCHx.loss);
const LCHrv = LCHx.building - LCHx.stock;
const LCHrvp = oldSplit(LCH.old, LCHrv);
eq([LCHg.by, LCHres.by, LCHrvp], [{ Rajni: 15000, Sohan: -15000, Trilok: 0 }, { Rajni: 4000, Sohan: -4000, Trilok: 0 }, { Rajni: 6000, Sohan: 3600, Trilok: 2400 }], 'l5_change');
const LCHa = journal([{ dr: [[C('Sohan'), LCHg.value]], cr: [[C('Rajni'), LCHg.value]], nar: 'goodwill adjusted: Sohan compensates Rajni for her sacrifice of 1/10' }]);
const LCHb = journal([
  { dr: [['Building A/c', LCHx.building]], cr: [['Revaluation A/c', LCHx.building]], nar: 'increase in the value of the building' },
  { dr: [['Revaluation A/c', LCHx.stock]], cr: [['Stock A/c', LCHx.stock]], nar: 'decrease in the value of stock' },
  { dr: [['Revaluation A/c', LCHrv]], cr: LCH.names.map((n) => [C(n), LCHrvp[n]]), nar: 'revaluation profit shared in the old ratio 5 : 3 : 2' },
  { dr: [[C('Sohan'), LCHres.value]], cr: [[C('Rajni'), LCHres.value]], nar: 'adjustment for the general reserve and the debit balance of profit and loss kept in the books' },
]);
Q('l5_change', long({
  t: [4, 5, 7], d: 4, c: 'analysis', marks: 5,
  stem: `Rajni, Sohan and Trilok share profits 5 : 3 : 2 in Ratlam Namkeen Works, an imagined firm. From ${DATE_NEW} they agree to share 2 : 2 : 1. Goodwill is valued at ${rs(LCHx.gw)}. The building is to be raised by ${rs(LCHx.building)} and stock reduced by ${rs(LCHx.stock)}. The general reserve of ${rs(LCHx.gr)} and the debit balance of ${rs(LCHx.loss)} in the profit and loss account are to remain in the books.\n\n(a) Show each partner's sacrifice or gain and pass the entry for goodwill. [2]\n\n(b) Pass the journal entries for revaluation and a single entry for the reserve and the profit and loss balance. [3]`,
  model: `**(a)** Rajni 5/10 − 4/10 = ${LCH.diff.Rajni} (sacrifice); Sohan 3/10 − 4/10, a gain of ${LCH.diff.Sohan.abs()}; Trilok 2/10 − 2/10 = 0. Goodwill adjustment = ${inr(LCHx.gw)} × 1/10 = ${rs(LCHg.value)}.\n\n${LCHa.md}\n\n**(b)** Revaluation profit = ${inr(LCHx.building)} − ${inr(LCHx.stock)} = ${rs(LCHrv)}, shared 5 : 3 : 2. Net accumulated profit kept in the books = ${inr(LCHx.gr)} − ${inr(LCHx.loss)} = ${rs(LCHx.gr - LCHx.loss)}; Sohan's gain of 1/10 of it = ${rs(LCHres.value)}.\n\n${LCHb.md}`,
  sol: 'Sacrifice and gain decide who pays for goodwill and for the reserves left in the books; revaluation still follows the old ratio.',
  scheme: [['(a) Sacrifice of Rajni and gain of Sohan', 1], ['(a) Goodwill adjustment entry', 1], ['(b) Entries for building and stock', 1], ['(b) Revaluation profit in the old ratio 5 : 3 : 2', 1], ['(b) Single adjustment entry for the reserves', 1]],
}));

// ================================================================ full practical problems (8 marks, practice only)
const dv = (s, bl) => Math.abs(s.reval.find((x) => x[2] === bl)[3]);
const bv = (s, l) => [...s.liabs, ...s.assets].find((x) => x[0] === l)[1];
const pct = (s, bl, p) => {
  check(fr(p, 100).of(bv(s, bl)) === dv(s, bl), `${bl}: ${p}% of ${bv(s, bl)} is not ${dv(s, bl)}`);
  return `${p}%`;
};
const provLabel = (b, c) => `Debtors ${inr(b)} less provision ${inr(-c)}`;
function full(key, o) {
  const terms = o.terms(o.s);
  const r = solveAdmission(o.s);
  for (const [k, v] of Object.entries(o.expect)) eq(k.split('.').reduce((a, p) => a?.[p], r), v, `${key} ${k}`);
  Q(key, long({
    t: o.t, d: o.d, c: o.c, marks: 8,
    stem: `${o.intro} Their Balance Sheet as at ${DATE_OLD} was:\n\n${r.oldBS.md}\n\n${terms}\n\nPrepare the Revaluation Account, the Partners' Capital Accounts and the Balance Sheet of the reconstituted firm in horizontal form.`,
    model: admissionAnswer(r, o.firm),
    sol: o.sol,
    scheme: o.scheme ?? [['Revaluation Account with the result in the old ratio', 2], ["Partners' Capital Accounts", 3], ['Balance Sheet of the reconstituted firm', 3]],
  }));
  return r;
}

const L8A = full('l8_premium_existing', {
  t: [2, 3, 4, 5, 6], d: 4, c: 'application', firm: 'Rhododendron Handicrafts',
  intro: 'Sharmila and Tenzin are partners in Rhododendron Handicrafts, an imagined crafts firm at Gangtok, sharing profits 5 : 3.',
  s: {
    old: { Sharmila: fr(5, 8), Tenzin: fr(3, 8) }, newName: 'Ujjwal', how: { proportion: fr(1, 4) },
    liabs: [['Creditors', 64000], ['General Reserve', 24000, { reserve: true }], ["Sharmila's Capital", 160000, { cap: 'Sharmila' }], ["Tenzin's Capital", 120000, { cap: 'Tenzin' }]],
    assets: [['Bank', 26000, { bank: true }], ['Debtors', 70000], ['Stock', 58000], ['Furniture', 30000], ['Building', 160000], ['Goodwill', 24000, { goodwill: true }]],
    reval: [['Building A/c (increase)', 'A', 'Building', 16000], ['Furniture A/c (depreciation)', 'A', 'Furniture', -3000], ['Provision for Doubtful Debts A/c', 'A', 'Debtors', -3500, provLabel], ['Stock A/c (decrease)', 'A', 'Stock', -1500]],
    goodwill: { value: 160000 }, capital: 120000,
  },
  terms: (s) => `On ${DATE_NEW} they admit Ujjwal for 1/4 share, which he takes from them in their old ratio, on these terms: (a) Ujjwal brings ${rs(s.capital)} as capital and his share of goodwill in cash; the firm's goodwill is valued at ${rs(s.goodwill.value)} and the premium is retained in the business. (b) The building is appreciated by ${pct(s, 'Building', 10)} and furniture depreciated by ${pct(s, 'Furniture', 10)}. (c) A provision for doubtful debts is created at ${pct(s, 'Debtors', 5)} of debtors. (d) Stock is revalued at ${rs(bv(s, 'Stock') - dv(s, 'Stock'))}.`,
  expect: { 'reval.net': 8000, premium: 40000, 'caps.closing': { Sharmila: 190000, Tenzin: 138000, Ujjwal: 120000 }, 'newBS.total': 512000, bank: 186000 },
  sol: 'Write off the old goodwill and distribute the reserve in the old ratio, credit the premium in the sacrificing ratio, and add everything Ujjwal brings to the bank.',
});

const L8B = full('l8_hidden_wcr', {
  t: [3, 4, 5, 6], d: 5, c: 'analysis', firm: 'Hundru Agro Foods',
  intro: 'Gulshan and Hemlata run Hundru Agro Foods, an imagined food-processing firm at Ranchi, and share profits 2 : 1.',
  s: {
    old: { Gulshan: fr(2, 3), Hemlata: fr(1, 3) }, newName: 'Ishwar', how: { proportion: fr(1, 4) },
    liabs: [['Creditors', 45000], ['Workmen Compensation Reserve', 18000, { wcr: 6000 }], ["Gulshan's Capital", 150000, { cap: 'Gulshan' }], ["Hemlata's Capital", 90000, { cap: 'Hemlata' }]],
    assets: [['Bank', 21000, { bank: true }], ['Debtors', 54000], ['Stock', 48000], ['Plant', 120000], ['Land', 60000]],
    reval: [['Land A/c (increase)', 'A', 'Land', 15000], ['Plant A/c (depreciation)', 'A', 'Plant', -6000], ['Stock A/c (decrease)', 'A', 'Stock', -3000]],
    goodwill: { hidden: true }, capital: 100000,
  },
  terms: (s) => `On ${DATE_NEW} Ishwar is admitted for 1/4 share, taken from them in their old ratio. He brings ${rs(s.capital)} as capital; nothing is said about goodwill. Land is to be increased by ${pct(s, 'Land', 25)}, plant depreciated by ${pct(s, 'Plant', 5)} and stock reduced by ${rs(dv(s, 'Stock'))}. A workmen compensation claim of ${rs(s.liabs.find((x) => x[2]?.wcr !== undefined)[2].wcr)} is to be recorded.`,
  expect: { 'reval.net': 6000, 'hidden.value': 42000, premium: 10500, 'caps.closing': { Gulshan: 169000, Hemlata: 99500, Ishwar: 89500 }, 'newBS.total': 409000, bank: 121000 },
  sol: 'Bring the old capitals up to date (revaluation and the balance of the reserve) before comparing them with the capital implied by Ishwar\'s contribution.',
  scheme: [['Revaluation Account and the reserve balance', 2], ["Hidden goodwill and Partners' Capital Accounts", 3], ['Balance Sheet of the reconstituted firm', 3]],
});

const L8C = full('l8_proportionate_ifr', {
  t: [2, 4, 5, 6], d: 5, c: 'analysis', firm: 'Ponmudi Cardamom Traders',
  intro: 'Lalitha and Mukund are partners in Ponmudi Cardamom Traders, an imagined spice firm at Kumily, sharing profits 3 : 1.',
  s: {
    old: { Lalitha: fr(3, 4), Mukund: fr(1, 4) }, newName: 'Nalini', how: { proportion: fr(1, 5) },
    liabs: [['Creditors', 40000], ['Bills Payable', 12000], ['Investment Fluctuation Reserve', 6000, { ifr: 10000, inv: 'Investments' }], ["Lalitha's Capital", 120000, { cap: 'Lalitha' }], ["Mukund's Capital", 60000, { cap: 'Mukund' }]],
    assets: [['Bank', 18000, { bank: true }], ['Investments', 50000], ['Debtors', 40000], ['Stock', 50000], ['Machinery', 80000]],
    reval: [['Machinery A/c (increase)', 'A', 'Machinery', 12000], ['Provision for Doubtful Debts A/c', 'A', 'Debtors', -2000, provLabel]],
    goodwill: { value: 100000 }, capital: 'proportionate', withdraw: true,
  },
  terms: (s) => `On ${DATE_NEW} they admit Nalini for 1/5 share, taken from them in their old ratio. (a) The firm's goodwill is valued at ${rs(s.goodwill.value)}; Nalini brings her share of it in cash and the old partners withdraw the whole premium. (b) The market value of the investments is ${rs(bv(s, 'Investments') - s.liabs.find((x) => x[2]?.ifr !== undefined)[2].ifr)}. (c) Machinery is appreciated by ${pct(s, 'Machinery', 15)} and a provision for doubtful debts is made at ${pct(s, 'Debtors', 5)}. (d) Nalini brings capital equal to 1/5 of the total capital, based on the capitals of Lalitha and Mukund after all adjustments.`,
  expect: { 'reval.net': 6000, premium: 20000, K: 46500, 'caps.closing': { Lalitha: 124500, Mukund: 61500, Nalini: 46500 }, 'newBS.total': 284500, bank: 64500 },
  sol: 'The fall in investments beyond the reserve is a revaluation loss; finish every adjustment, including the withdrawal, before scaling up the old capitals.',
});

export const FULL = { L8A, L8B, L8C };
