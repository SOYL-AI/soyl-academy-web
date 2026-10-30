// CBSE 12 Accountancy, ch04 Retirement and Death of a Partner — question bank. Every firm, partner
// and figure is imagined by SOYL; no NCERT illustration or exercise and no CBSE sample/past-paper
// item is reused. Every amount is computed by acc.mjs from the givens and every statement is checked
// there (journal entries balance, accounts balance per partner, balance sheets total), so a figure
// in a key or model answer is never typed by hand.
import { Q, mcq, ar, tf, fb, match, num, short, long } from './lib.mjs';
import { F, pct, fig, rs, sum, shares, ratio, split, exitShares, goodwillAdj, avgGoodwill, md, journal, capitalAccounts, revaluation, balanceSheet, loanAccount, ledger, check } from './acc.mjs';

export const cap = (p) => `${p}'s Capital A/c`;
export const capRows = (m) => Object.entries(m).filter(([, v]) => v).map(([p, v]) => [cap(p), v]);
const fx = (c) => (c.sign < 0 ? `(−) ${c.mul(-1)} (sacrifice)` : c.sign === 0 ? 'nil' : `${c}`);
/** Partner | Old share | New share | Gain (new − old). */
export function ratioTable(old, ex, out) {
  const rows = Object.keys(old).map((p) => [p, `${old[p]}`, p === out ? '— (leaves)' : `${ex.nw[p]}`, p === out ? `(−) ${old[p]} (gives up)` : fx(ex.change[p])]);
  return md(['Partner', 'Old share', 'New share', 'Gain = new − old'], rows);
}
const list = (names) => (names.length === 2 ? names.join(' and ') : `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`);
const ratioOf = (sh) => ratio(Object.values(sh));

// ================================================================ t01 New ratio and gaining ratio
Q('m_gain_def', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'On the retirement of a partner, the gain of each continuing partner is calculated as',
  opts: ['his new share minus his old share', 'his old share minus his new share', "the retiring partner's share divided equally among the continuing partners", 'his new share divided by his old share'],
  sol: 'Gain = new share − old share. Old minus new is the sacrifice formula used on admission; an equal division is only a special case of agreement; a quotient of shares has no meaning here.',
}));

const R_REKHA = exitShares({ old: shares(['Rekha', 'Sunil', 'Tara'], [4, 3, 2]), out: 'Tara', mode: 'old' });
check(R_REKHA.gainRatio === '4:3' && R_REKHA.newRatio === '4:3', 'R_REKHA');
Q('m_default_ratio', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Rekha, Sunil and Tara run an imagined printing press in Sivakasi and share profits in the ratio 4:3:2. Tara retires, and nothing is agreed about the future ratio. The gaining ratio of Rekha and Sunil will be',
  opts: [R_REKHA.gainRatio, '1:1', '3:4', '2:1'],
  sol: `With no agreement, the continuing partners keep their old ratio between themselves, so the new ratio is ${R_REKHA.newRatio}. Rekha gains ${R_REKHA.change.Rekha} and Sunil gains ${R_REKHA.change.Sunil}, so the gaining ratio is ${R_REKHA.gainRatio}, the same as their old ratio.`,
}));

const R_OM = exitShares({ old: shares(['Om', 'Pallavi', 'Qadir'], [4, 3, 2]), out: 'Qadir', mode: 'portion', take: { Om: F(2, 3), Pallavi: F(1, 3) } });
check(R_OM.newRatio === '16:11', 'R_OM');
Q('m_new_ratio_take', mcq({
  t: 1, d: 3, c: 'application',
  stem: "Om, Pallavi and Qadir, partners in an imagined courier firm in Lucknow, share profits 4:3:2. Qadir retires and his share is taken over by Om and Pallavi in the ratio 2:1. The new profit-sharing ratio of Om and Pallavi is",
  opts: [R_OM.newRatio, '4:3', '2:1', '14:13'],
  sol: `Qadir's share is 2/9. Om takes 2/3 of it = ${R_OM.change.Om} and Pallavi 1/3 of it = ${R_OM.change.Pallavi}. New shares: Om 4/9 + ${R_OM.change.Om} = ${R_OM.nw.Om}; Pallavi 3/9 + ${R_OM.change.Pallavi} = ${R_OM.nw.Pallavi}. New ratio ${R_OM.newRatio}.`,
}));

const R_NIK = exitShares({ old: shares(['Nikhil', 'Mohan', 'Lata'], [3, 2, 1]), out: 'Lata', mode: 'given', newShares: shares(['Nikhil', 'Mohan'], [1, 1]) });
check(R_NIK.change.Nikhil.eq(0) && R_NIK.change.Mohan.eq(F(1, 6)) && R_NIK.gainers.join() === 'Mohan', 'R_NIK');
Q('m_gain_given', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'Nikhil, Mohan and Lata share the profits of an imagined dairy in Anand in the ratio 3:2:1. Lata retires, and Nikhil and Mohan agree to share future profits equally. Which statement about the gain is correct?',
  opts: [`Only Mohan gains; he takes over Lata's whole share of ${R_NIK.change.Mohan}`, 'Nikhil and Mohan gain in the ratio 3:2', 'Nikhil and Mohan gain in the ratio 1:1', 'Nikhil gains 1/6 and Mohan gives up 1/6'],
  sol: `Nikhil: new 1/2 − old 1/2 = nil. Mohan: new 1/2 − old 1/3 = ${R_NIK.change.Mohan}. So Mohan alone gains, and his gain equals Lata's share; only Mohan compensates Lata for goodwill.`,
}));

const R_HARSH = exitShares({ old: shares(['Harsh', 'Isha', 'Jai'], [2, 2, 1]), out: 'Jai', mode: 'take', take: { Isha: F(1, 5) } });
check(R_HARSH.newRatio === '2:3', 'R_HARSH');
Q('m_one_takes', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: "Harsh, Isha and Jai share profits 2:2:1 in an imagined photo studio in Nashik. Jai retires and Isha alone takes over Jai's share. The new ratio of Harsh and Isha is",
  opts: [R_HARSH.newRatio, '1:1', '3:2', '2:2:1'],
  sol: `Harsh keeps 2/5. Isha gets 2/5 + 1/5 = ${R_HARSH.nw.Isha}. New ratio ${R_HARSH.newRatio}; Isha alone is the gaining partner.`,
}));

Q('ar_gain', ar({
  t: [1, 2], d: 2, c: 'understanding', key: 'a',
  a: "On a partner's retirement, the continuing partners compensate him for his share of goodwill in their gaining ratio.",
  r: "The continuing partners acquire the retiring partner's share of future profits in the gaining ratio.",
  sol: 'Both are true. The continuing partners pay for goodwill because they take over his future profits, and they take them over in the gaining ratio; so R explains A.',
}));

Q('tf_gain_old', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? Even when the continuing partners agree on a new profit-sharing ratio, their gaining ratio is always equal to their old ratio.',
  sol: 'Gaining ratio equals the old ratio only when the continuing partners keep their old ratio between themselves. When a new ratio is agreed, each gain must be worked out as new share − old share, and it can differ from the old ratio.',
}));

Q('fb_gain', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'On retirement, gain of a continuing partner = new share − ___ share.',
  acc: [['old']],
  sol: 'Gain is the new share minus the old share.',
}));

Q('mt_terms', match({
  t: [1, 2, 4], d: 2, c: 'understanding', marks: 2,
  stem: 'Match each reconstitution term in column A (retirement or death of a partner) with what it means or records in column B.',
  pairs: [
    ['Gaining ratio', 'Ratio of the increases in the shares of the continuing partners'],
    ['Sacrificing ratio', 'Ratio in which old partners give up their shares, used mainly on admission'],
    ['Revaluation Account', 'Records the gains and losses on revaluing assets and liabilities'],
    ["Executor's Account", "Shows the amount due to a deceased partner's legal representative"],
  ],
  sol: 'Gaining ratio is about increases (retirement and death); sacrificing ratio about decreases (admission); revaluation profit or loss goes to all old partners; the executor receives the amount due to a deceased partner.',
}));

const R_KETAN = exitShares({ old: shares(['Ketan', 'Leena', 'Manav'], [5, 3, 2]), out: 'Manav', mode: 'take', take: { Ketan: F(1, 20), Leena: F(3, 20) } });
check(R_KETAN.newRatio === '11:9' && R_KETAN.gainRatio === '1:3', 'R_KETAN');
Q('s3_ratio_take', short({
  t: 1, d: 3, c: 'application', marks: 3,
  stem: "Ketan, Leena and Manav are partners in an imagined travel agency in Shillong sharing profits in the ratio 5:3:2. Manav retires. Ketan acquires 1/20 and Leena acquires 3/20 of the firm's profit from Manav's share. Calculate the new profit-sharing ratio of Ketan and Leena and their gaining ratio.",
  model: `**New share = old share + share acquired.**\n\n${md(['Partner', 'Old share', 'Acquired from Manav', 'New share'], [
    ['Ketan', `${F(5, 10)}`, '1/20', `${R_KETAN.nw.Ketan}`],
    ['Leena', `${F(3, 10)}`, '3/20', `${R_KETAN.nw.Leena}`],
  ])}\n\nCheck: ${R_KETAN.nw.Ketan} + ${R_KETAN.nw.Leena} = 1.\n\n**New ratio** of Ketan and Leena = **${R_KETAN.newRatio}**.\n\n**Gaining ratio** = 1/20 : 3/20 = **${R_KETAN.gainRatio}** (here the gain is what each one acquires).`,
  sol: 'Add each acquired fraction to the old share; the acquired fractions themselves give the gaining ratio.',
  scheme: [['New shares of Ketan and Leena', 1], [`New ratio ${R_KETAN.newRatio}`, 1], [`Gaining ratio ${R_KETAN.gainRatio}`, 1]],
}));

const R_GAURI = exitShares({ old: shares(['Gauri', 'Hari', 'Ishaan'], [5, 4, 3]), out: 'Ishaan', mode: 'portion', take: { Gauri: F(1, 3), Hari: F(2, 3) } });
check(R_GAURI.newRatio === '1:1' && R_GAURI.gainRatio === '1:2', 'R_GAURI');
Q('s3_ratio_portion', short({
  t: 1, d: 3, c: 'application', marks: 3,
  stem: "Gauri, Hari and Ishaan share the profits of an imagined pottery studio in Khurja in the ratio 5:4:3. Ishaan retires. Gauri takes one-third of Ishaan's share and Hari takes the remaining two-thirds. Find the new profit-sharing ratio and the gaining ratio of Gauri and Hari.",
  model: `Ishaan's share = 3/12 = ${F(3, 12)}.\n\n- Gauri acquires 1/3 × 1/4 = **${R_GAURI.change.Gauri}**; Hari acquires 2/3 × 1/4 = **${R_GAURI.change.Hari}**.\n- Gauri's new share = 5/12 + ${R_GAURI.change.Gauri} = **${R_GAURI.nw.Gauri}**.\n- Hari's new share = 4/12 + ${R_GAURI.change.Hari} = **${R_GAURI.nw.Hari}**.\n\n**New ratio = ${R_GAURI.newRatio}**; **gaining ratio = ${R_GAURI.change.Gauri} : ${R_GAURI.change.Hari} = ${R_GAURI.gainRatio}**.\n\nNote: the partners end up equal even though they gain unequally.`,
  sol: "Take the stated portion of the outgoing partner's share, add it to each old share, then compare.",
  scheme: [["Portions of Ishaan's share", 1], ['New ratio', 1], ['Gaining ratio', 1]],
}));

Q('s3_sac_gain', short({
  t: 1, d: 2, c: 'understanding', marks: 3,
  stem: 'Distinguish between sacrificing ratio and gaining ratio on any three bases.',
  model: md(['Basis', 'Sacrificing ratio', 'Gaining ratio'], [
    ['Meaning', 'Ratio in which old partners give up part of their shares', 'Ratio in which continuing partners take over the outgoing share'],
    ['Formula', 'Old share − new share', 'New share − old share'],
    ['When calculated', 'Mainly on the admission of a partner', 'Mainly on the retirement or death of a partner'],
    ['Goodwill', 'The new partner compensates the sacrificing partners', 'The gaining partners compensate the outgoing partner'],
  ]),
  sol: 'Any three bases with both sides stated correctly earn the marks.',
  scheme: [['First basis, both sides', 1], ['Second basis, both sides', 1], ['Third basis, both sides', 1]],
}));

// ================================================================ t02 Goodwill, revaluation and reserves
Q('m_gw_who', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: "Under Accounting Standard 26, the retiring partner's share of goodwill is adjusted by",
  opts: ["crediting his capital account and debiting the continuing partners' capital accounts in their gaining ratio", "debiting his capital account and crediting the continuing partners' capital accounts in their old ratio", "raising a Goodwill Account at its full value and crediting all the partners", "crediting the Revaluation Account with the retiring partner's share"],
  sol: 'Goodwill is not raised in the books. The gaining partners, who will enjoy the extra future profit, pay the retiring partner through their capital accounts in the gaining ratio.',
}));

const R_DEV = exitShares({ old: shares(['Devika', 'Esha', 'Farid'], [2, 2, 1]), out: 'Farid', mode: 'given', newShares: shares(['Devika', 'Esha'], [3, 2]) });
const GW_DEV = goodwillAdj(150000, R_DEV.change);
check(GW_DEV.dr.Devika === 30000 && !GW_DEV.dr.Esha && GW_DEV.cr.Farid === 30000, 'GW_DEV');
Q('m_gw_calc', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: `Devika, Esha and Farid share profits 2:2:1 in an imagined pharmacy in Pune. Farid retires; the firm's goodwill is valued at ${rs(150000)} and Devika and Esha will share future profits 3:2. The correct entry for goodwill is`,
  opts: [
    `Devika's Capital A/c Dr ${rs(GW_DEV.dr.Devika)}, To Farid's Capital A/c ${rs(GW_DEV.cr.Farid)}`,
    `Devika's Capital A/c Dr ${rs(15000)} and Esha's Capital A/c Dr ${rs(15000)}, To Farid's Capital A/c ${rs(30000)}`,
    `Goodwill A/c Dr ${rs(150000)}, To all partners' capital accounts in 2:2:1`,
    `Farid's Capital A/c Dr ${rs(30000)}, To Devika's Capital A/c ${rs(30000)}`,
  ],
  sol: `Gains: Devika 3/5 − 2/5 = ${R_DEV.change.Devika}; Esha 2/5 − 2/5 = nil. Farid's share = 1/5 × ${fig(150000)} = ${fig(GW_DEV.cr.Farid)}, borne wholly by Devika, the only gaining partner.`,
}));

Q('m_existing_gw', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Goodwill already appearing in the balance sheet when a partner retires is',
  opts: ['written off among all the partners, including the retiring partner, in their old ratio', 'written off among the continuing partners in their new ratio', 'carried forward to the balance sheet of the reconstituted firm', 'credited to the retiring partner alone'],
  sol: 'The old goodwill belongs to the old firm, so all old partners write it off in the old ratio before the retiring partner is compensated for goodwill at its current value.',
}));

Q('m_reval_share', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'A profit on revaluation at the time of retirement is shared by',
  opts: ['all the partners, including the retiring partner, in the old ratio', 'the continuing partners in their new ratio', 'the continuing partners in their gaining ratio', 'the retiring partner alone'],
  sol: 'The change in values arose while all of them were partners, so the profit or loss is shared by all partners in the old ratio.',
}));

Q('m_unrecorded', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'On the retirement of a partner, an asset that was never recorded in the books is brought in. It is',
  opts: ['credited to the Revaluation Account as a gain', 'debited to the Revaluation Account as a loss', "credited to the retiring partner's capital account only", 'ignored, because it was never recorded'],
  sol: 'Bringing in an unrecorded asset increases the value of the firm, a gain shared by all the old partners through the Revaluation Account.',
}));

const WCR = { reserve: 30000, claim: 36000 };
const WCRx = WCR.claim - WCR.reserve;
check(WCRx === 6000, 'WCR');
Q('m_wcr', mcq({
  t: 2, d: 3, c: 'application',
  stem: `The balance sheet of an imagined firm shows a Workmen Compensation Reserve of ${rs(WCR.reserve)}. On a partner's retirement, the workmen's claim is estimated at ${rs(WCR.claim)}. The excess claim of ${rs(WCRx)} will be`,
  opts: ['debited to the Revaluation Account', "credited to all the partners' capital accounts", "debited to the retiring partner's capital account only", 'ignored, because a reserve already exists'],
  sol: `The reserve covers ${fig(WCR.reserve)} of the claim; the extra ${fig(WCRx)} is a new liability, a loss debited to the Revaluation Account and shared by all partners in the old ratio.`,
}));

const IFR = { reserve: 20000, book: 100000, market: 88000 };
const IFRfall = IFR.book - IFR.market;
const IFRleft = IFR.reserve - IFRfall;
check(IFRfall === 12000 && IFRleft === 8000, 'IFR');
Q('m_ifr', mcq({
  t: 2, d: 3, c: 'application',
  stem: `An imagined firm has an Investment Fluctuation Reserve of ${rs(IFR.reserve)}. On a partner's retirement, investments shown at ${rs(IFR.book)} have a market value of ${rs(IFR.market)}. The treatment of the reserve is`,
  opts: [`${rs(IFRfall)} of it absorbs the fall and the remaining ${rs(IFRleft)} goes to all partners in the old ratio`, `the whole ${rs(IFR.reserve)} goes to all partners in the old ratio`, `${rs(IFRfall)} is debited to the Revaluation Account and the reserve is untouched`, `the remaining ${rs(IFRleft)} goes to the continuing partners in their new ratio`],
  sol: `The fall in value of ${fig(IFRfall)} is met from the reserve; only the balance ${fig(IFRleft)} is an accumulated profit, credited to all partners in the old ratio.`,
}));

Q('ar_as26', ar({
  t: 2, d: 2, c: 'understanding', key: 'a',
  a: "When a partner retires, no Goodwill Account is raised in the books at the firm's full goodwill.",
  r: 'Accounting Standard 26 allows goodwill to be recorded only when it is purchased for a consideration.',
  sol: 'Both are true. Self-generated goodwill cannot be recorded under AS 26, which is exactly why it is adjusted through the capital accounts instead; R explains A.',
}));

Q('ar_reserve', ar({
  t: 2, d: 3, c: 'analysis', key: 'd',
  a: 'On retirement, the general reserve is credited only to the continuing partners in their new ratio.',
  r: 'Reserves are past profits that belong to all the partners who were in the firm when they were set aside.',
  sol: 'A is false: the reserve goes to all partners, including the retiring one, in the old ratio. R is true and is the reason the retiring partner must get his share.',
}));

Q('tf_pl_debit', tf({
  t: 2, d: 2, c: 'understanding', ans: true,
  stem: "True or false? A debit balance of the Profit and Loss Account shown on the assets side at the time of retirement is debited to all the partners' capital accounts in their old ratio.",
  sol: 'An accumulated loss belongs to all old partners, so it is written off to every capital account, including the retiring partner, in the old ratio.',
}));

Q('fb_reval', fb({
  t: 2, d: 1, c: 'recall', marks: 2,
  stem: 'An increase in the value of an asset on revaluation is ___ to the Revaluation Account, and an unrecorded liability brought into the books is ___ to it.',
  acc: [['credited'], ['debited']],
  sol: 'A rise in an asset is a gain, so it is credited; a new liability is a loss, so it is debited.',
}));

const N_UMA = { names: ['Sara', 'Tanvir', 'Uma'], parts: [2, 1, 1], gw: 240000 };
const N_UMAsh = shares(N_UMA.names, N_UMA.parts).Uma.of(N_UMA.gw);
check(N_UMAsh === 60000, 'N_UMA');
Q('n_gw_share', num({
  t: 2, d: 2, c: 'understanding', marks: 2, value: N_UMAsh, unit: '₹',
  stem: `Sara, Tanvir and Uma share profits 2:1:1. Uma retires and the goodwill of the imagined firm is valued at ${rs(N_UMA.gw)}. How much will be credited to Uma's capital account for her share of goodwill (in ₹)?`,
  sol: `Uma's share = 1/4. Her share of goodwill = ${fig(N_UMA.gw)} × 1/4 = ${fig(N_UMAsh)}. So ₹${fig(N_UMAsh)} is credited to her capital account.`,
  scheme: [["Uma's share 1/4", 1], [`Amount ${rs(N_UMAsh)}`, 1]],
}));

const RV_CH = revaluation([['Building A/c', 30000], ['Machinery A/c', -12000], ['Provision for Doubtful Debts A/c', -4000], ['Investments A/c (unrecorded)', 6000]], shares(['Aarav', 'Bhoomi', 'Chetna'], [2, 1, 1]));
check(RV_CH.result === 20000 && RV_CH.part.Chetna === 5000, 'RV_CH');
Q('n_reval', num({
  t: 2, d: 3, c: 'application', marks: 2, value: RV_CH.part.Chetna, unit: '₹',
  stem: `Aarav, Bhoomi and Chetna share profits 2:1:1. On Chetna's retirement the building is revalued upwards by ${rs(30000)}, machinery is reduced by ${rs(12000)}, a provision for doubtful debts of ${rs(4000)} is created and an investment of ${rs(6000)} not yet recorded is brought into the books. Find Chetna's share of the revaluation result (in ₹).`,
  sol: `Revaluation profit = ${fig(30000)} + ${fig(6000)} − ${fig(12000)} − ${fig(4000)} = ${fig(RV_CH.result)}. Chetna's share = 1/4 × ${fig(RV_CH.result)} = ${fig(RV_CH.part.Chetna)} (a profit).`,
  scheme: [[`Revaluation profit ${rs(RV_CH.result)}`, 1], [`Chetna's share ${rs(RV_CH.part.Chetna)}`, 1]],
}));

const R_JY = exitShares({ old: shares(['Jyoti', 'Kiran', 'Lalit'], [5, 3, 2]), out: 'Lalit', mode: 'given', newShares: shares(['Jyoti', 'Kiran'], [2, 1]) });
const GW_JY = goodwillAdj(120000, R_JY.change);
const OLDGW_JY = split(30000, shares(['Jyoti', 'Kiran', 'Lalit'], [5, 3, 2]));
check(R_JY.gainRatio === '5:1' && GW_JY.dr.Jyoti === 20000 && GW_JY.dr.Kiran === 4000 && GW_JY.cr.Lalit === 24000, 'GW_JY');
const J_JY = journal([
  { dr: capRows(OLDGW_JY), cr: [['Goodwill A/c', 30000]], nar: 'existing goodwill written off in the old ratio 5:3:2' },
  { dr: capRows(GW_JY.dr), cr: capRows(GW_JY.cr), nar: "Lalit's share of goodwill adjusted in the gaining ratio 5:1" },
]);
Q('s3_gw_entries', short({
  t: 2, d: 3, c: 'application', marks: 3,
  stem: `Jyoti, Kiran and Lalit share profits 5:3:2 in an imagined tailoring business in Ludhiana. Lalit retires. Goodwill already appears in the books at ${rs(30000)}. The firm's goodwill is now valued at ${rs(120000)}, and Jyoti and Kiran will share future profits 2:1. Pass the journal entries for goodwill.`,
  model: `**Gaining ratio:** Jyoti 2/3 − 1/2 = ${R_JY.change.Jyoti}; Kiran 1/3 − 3/10 = ${R_JY.change.Kiran}; ratio **${R_JY.gainRatio}**.\n\nLalit's share of goodwill = ${fig(120000)} × 1/5 = ${fig(GW_JY.cr.Lalit)}.\n\n${J_JY.md}`,
  sol: 'Write off the book goodwill in the old ratio first, then charge the gaining partners for the outgoing share.',
  scheme: [[`Gaining ratio ${R_JY.gainRatio}`, 1], ['Entry writing off existing goodwill', 1], ['Goodwill adjustment entry', 1]],
}));

const R_MIRA = exitShares({ old: shares(['Mira', 'Neel', 'Ojas'], [3, 2, 1]), out: 'Ojas', mode: 'given', newShares: shares(['Mira', 'Neel'], [2, 3]) });
const GW_MIRA = goodwillAdj(180000, R_MIRA.change);
check(GW_MIRA.dr.Neel === 48000 && GW_MIRA.cr.Mira === 18000 && GW_MIRA.cr.Ojas === 30000, 'GW_MIRA');
Q('s3_gw_sacrifice', short({
  t: 2, d: 4, c: 'analysis', marks: 3,
  stem: `Mira, Neel and Ojas share the profits of an imagined furniture showroom in Jodhpur in the ratio 3:2:1. Ojas retires and Mira and Neel agree to share future profits 2:3. The firm's goodwill is valued at ${rs(180000)}. Calculate the gain or sacrifice of each partner and pass the journal entry for goodwill.`,
  model: `${ratioTable(shares(['Mira', 'Neel', 'Ojas'], [3, 2, 1]), R_MIRA, 'Ojas')}\n\nNeel gains ${R_MIRA.change.Neel}; Mira **sacrifices** ${R_MIRA.change.Mira.mul(-1)} and Ojas gives up ${F(1, 6)}. Neel must compensate both of them.\n\n${journal([{ dr: capRows(GW_MIRA.dr), cr: capRows(GW_MIRA.cr), nar: "goodwill adjusted: Neel compensates Mira and Ojas for the shares he takes over" }]).md}`,
  sol: 'A continuing partner whose share falls is treated like the outgoing partner: credited for the share he gives up.',
  scheme: [['Gain/sacrifice of each partner', 1], ['Amounts for Mira and Ojas', 1], ['Journal entry', 1]],
}));

const RS_P = shares(['Pooja', 'Rahul', 'Sana'], [2, 2, 1]);
const P_GR = split(45000, RS_P);
const P_PL = split(15000, RS_P);
const P_WCR = { reserve: 25000, claim: 10000 };
const P_WCRx = split(P_WCR.reserve - P_WCR.claim, RS_P);
const J_P = journal([
  { dr: [['General Reserve A/c', 45000]], cr: capRows(P_GR), nar: 'general reserve distributed in the old ratio' },
  { dr: capRows(P_PL), cr: [['Profit and Loss A/c', 15000]], nar: 'accumulated loss written off in the old ratio' },
  { dr: [['Workmen Compensation Reserve A/c', P_WCR.reserve]], cr: [['Workmen Compensation Claim A/c', P_WCR.claim], ...capRows(P_WCRx)], nar: 'claim provided and the surplus reserve distributed' },
]);
Q('s3_reserves', short({
  t: 2, d: 3, c: 'application', marks: 3,
  stem: `Pooja, Rahul and Sana share profits 2:2:1 in an imagined event-management firm in Bengaluru. On Sana's retirement the balance sheet shows a General Reserve of ${rs(45000)}, a debit balance of the Profit and Loss Account of ${rs(15000)} and a Workmen Compensation Reserve of ${rs(P_WCR.reserve)}, against which a claim of ${rs(P_WCR.claim)} is expected. Pass the necessary journal entries.`,
  model: J_P.md,
  sol: 'Reserves and accumulated profits go to all partners in the old ratio; the accumulated loss is debited the same way; only the surplus of the compensation reserve over the claim is distributed.',
  scheme: [['General reserve entry', 1], ['Profit and loss debit balance entry', 1], ['Workmen compensation reserve entry with claim', 1]],
}));

const RV_SAM = revaluation([
  ['Land and Building A/c', 50000], ['Machinery A/c', -12000], ['Provision for Doubtful Debts A/c', -3000], ['Stock A/c', -6000], ['Outstanding Salary A/c', -5000],
], shares(['Sameer', 'Tanvi', 'Uday'], [3, 2, 1]));
check(RV_SAM.result === 24000 && RV_SAM.part.Uday === 4000, 'RV_SAM');
Q('l4_reval', long({
  t: 2, d: 3, c: 'application', marks: 4,
  stem: `Sameer, Tanvi and Uday are partners in an imagined electrical-goods firm in Bhopal sharing profits 3:2:1. Uday retires on 31 March 2026. It is agreed that:\n\n1. Land and Building, shown at ${rs(250000)}, is appreciated by 20%.\n2. Machinery, shown at ${rs(120000)}, is depreciated by 10%.\n3. A provision for doubtful debts is kept at 5% on debtors of ${rs(80000)}; the existing provision is ${rs(1000)}.\n4. Stock is overvalued by ${rs(6000)}.\n5. Salary of ${rs(5000)} is outstanding but not recorded.\n\nPrepare the Revaluation Account.`,
  model: `Workings: building + 20% of ${fig(250000)} = ${fig(50000)}; machinery − 10% of ${fig(120000)} = ${fig(12000)}; provision needed 5% of ${fig(80000)} = ${fig(4000)}, less existing ${fig(1000)} = ${fig(3000)}.\n\n**Revaluation Account**\n\n${RV_SAM.md}\n\nProfit on revaluation ${rs(RV_SAM.result)} shared 3:2:1.`,
  sol: 'Gains on the credit side, losses on the debit side, and the balance shared by all partners in the old ratio.',
  scheme: [['Increase in building and the provision workings', 1], ['Losses on the debit side', 1], [`Profit of ${rs(RV_SAM.result)}`, 1], ['Shared 3:2:1', 1]],
}));

const RS_PR = shares(['Pranav', 'Ritu', 'Sohail'], [4, 3, 3]);
const R_PR = exitShares({ old: RS_PR, out: 'Sohail', mode: 'given', newShares: shares(['Pranav', 'Ritu'], [3, 2]) });
const GW_PR = goodwillAdj(150000, R_PR.change);
check(R_PR.gainRatio === '2:1' && GW_PR.dr.Pranav === 30000 && GW_PR.dr.Ritu === 15000 && GW_PR.cr.Sohail === 45000, 'GW_PR');
const J_PR = journal([
  { dr: capRows(split(20000, RS_PR)), cr: [['Goodwill A/c', 20000]], nar: 'existing goodwill written off in the old ratio' },
  { dr: [['General Reserve A/c', 40000]], cr: capRows(split(40000, RS_PR)), nar: 'general reserve distributed in the old ratio' },
  { dr: [['Workmen Compensation Reserve A/c', 18000]], cr: capRows(split(18000, RS_PR)), nar: 'workmen compensation reserve distributed, no claim being expected' },
  { dr: capRows(GW_PR.dr), cr: capRows(GW_PR.cr), nar: "Sohail's share of goodwill adjusted in the gaining ratio" },
]);
Q('l4_gw_full', long({
  t: 2, d: 3, c: 'analysis', marks: 4,
  stem: `Pranav, Ritu and Sohail share the profits of an imagined spice-export firm in Kochi in the ratio 4:3:3. Sohail retires. On that date the books show goodwill of ${rs(20000)}, a General Reserve of ${rs(40000)} and a Workmen Compensation Reserve of ${rs(18000)} (no claim is expected). The firm's goodwill is valued at ${rs(150000)}, and Pranav and Ritu will share future profits 3:2. Pass the journal entries.`,
  model: `Gaining ratio: Pranav 3/5 − 4/10 = ${R_PR.change.Pranav}; Ritu 2/5 − 3/10 = ${R_PR.change.Ritu}; ratio ${R_PR.gainRatio}. Sohail's share of goodwill = ${fig(150000)} × 3/10 = ${fig(GW_PR.total)}.\n\n${J_PR.md}`,
  sol: 'Clear the old goodwill and the reserves in the old ratio, then compensate the outgoing partner in the gaining ratio.',
  scheme: [['Existing goodwill written off', 1], ['General reserve', 0.5], ['Workmen compensation reserve', 0.5], ['Gaining ratio and goodwill entry', 2]],
}));

const RS_KR = shares(['Kriti', 'Lohit', 'Madhav'], [4, 3, 1]);
const R_KR = exitShares({ old: RS_KR, out: 'Madhav', mode: 'old' });
const GW_KR = goodwillAdj(112000, R_KR.change);
const RV_KR = revaluation([['Building A/c', 30000], ['Investments A/c (unrecorded)', 5000], ['Machinery A/c', -9000], ['Outstanding Rent A/c', -2000]], RS_KR);
const GR_KR = split(40000, RS_KR);
const DUE_KR = 70000 + RV_KR.part.Madhav + GR_KR.Madhav + GW_KR.cr.Madhav;
check(RV_KR.result === 24000 && GW_KR.cr.Madhav === 14000 && GW_KR.dr.Kriti === 8000 && DUE_KR === 92000, 'KR');
const J_KR = journal([
  { dr: [['Building A/c', 30000], ['Investments A/c', 5000]], cr: [['Revaluation A/c', 35000]], nar: 'increase in building and unrecorded investments brought into the books' },
  { dr: [['Revaluation A/c', 11000]], cr: [['Machinery A/c', 9000], ['Outstanding Rent A/c', 2000]], nar: 'decrease in machinery and outstanding rent recorded' },
  { dr: [['Revaluation A/c', RV_KR.result]], cr: capRows(RV_KR.part), nar: 'revaluation profit shared in the old ratio' },
  { dr: [['General Reserve A/c', 40000]], cr: capRows(GR_KR), nar: 'general reserve distributed in the old ratio' },
  { dr: capRows(GW_KR.dr), cr: capRows(GW_KR.cr), nar: "Madhav's share of goodwill adjusted in the gaining ratio 4:3" },
  { dr: [[cap('Madhav'), DUE_KR]], cr: [['Bank A/c', DUE_KR]], nar: 'amount due to Madhav paid by cheque' },
]);
Q('l6_retire_entries', long({
  t: [2, 3], d: 3, c: 'application', marks: 6,
  stem: `Kriti, Lohit and Madhav share the profits of an imagined handicraft emporium in Jaipur in the ratio 4:3:1. Madhav retires; his capital stands at ${rs(70000)} and the General Reserve at ${rs(40000)}. It is agreed that:\n\n1. The building is appreciated by ${rs(30000)} and machinery is reduced by ${rs(9000)}.\n2. Investments of ${rs(5000)}, not recorded so far, are brought into the books.\n3. Rent of ${rs(2000)} is outstanding.\n4. The firm's goodwill is valued at ${rs(112000)}; Kriti and Lohit continue in their old ratio.\n5. Madhav is paid in full by cheque.\n\nPass the journal entries.`,
  model: `Revaluation profit = ${fig(30000)} + ${fig(5000)} − ${fig(9000)} − ${fig(2000)} = ${fig(RV_KR.result)}. Madhav's share of goodwill = ${fig(112000)} × 1/8 = ${fig(GW_KR.total)}, borne by Kriti and Lohit in the gaining ratio 4:3. Amount due to Madhav = ${fig(70000)} + ${fig(RV_KR.part.Madhav)} + ${fig(GR_KR.Madhav)} + ${fig(GW_KR.total)} = ${fig(DUE_KR)}.\n\n${J_KR.md}`,
  sol: 'Revalue, distribute the reserve, adjust goodwill in the gaining ratio, then settle the outgoing partner in cash.',
  scheme: [['Revaluation entries (gains and losses)', 1.5], ['Revaluation profit shared', 1], ['General reserve', 1], ['Goodwill in gaining ratio', 1.5], ['Payment to Madhav', 1]],
}));

// ================================================================ t03 Settlement, loan, balance sheet, capital adjustment
Q('m_s37', mcq({
  t: 3, d: 2, c: 'recall',
  stem: 'If the amount due to a retiring partner is not paid at once and there is no agreement on interest, Section 37 of the Indian Partnership Act 1932 entitles him to',
  opts: ['interest at 6 per cent per annum or the share of profit earned with his money, whichever he chooses', 'interest at 12 per cent per annum in every case', 'nothing until the whole amount is paid', 'interest at 6 per cent per annum, payable only by the gaining partners personally'],
  sol: 'Section 37 gives the outgoing partner (or his estate) an option: interest at 6% per annum on the unpaid amount, or the share of profits attributable to the use of his money.',
}));

Q('m_loan_entry', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Zara retires and the whole amount due to her is to remain in the firm as a loan. The journal entry is',
  opts: ["Zara's Capital A/c Dr, To Zara's Loan A/c", "Zara's Loan A/c Dr, To Zara's Capital A/c", "Zara's Capital A/c Dr, To Bank A/c", "Bank A/c Dr, To Zara's Loan A/c"],
  sol: 'Her capital account is closed by a debit, and the firm now owes her the same amount as a loan, a liability credited to her loan account.',
}));

const LN_A = loanAccount({ principal: 180000, rate: 10, opens: ['1 Apr 2026', '1 Apr 2027', '1 Apr 2028'], ends: ['31 Mar 2027', '31 Mar 2028', '31 Mar 2029'], firstLabel: "Partner's Capital A/c" });
check(LN_A.sched[1].pay === 72000 && LN_A.sched[0].pay === 78000 && LN_A.sched[2].pay === 66000, 'LN_A');
Q('m_loan_int', mcq({
  t: 3, d: 3, c: 'application',
  stem: `A retiring partner's loan of ${rs(180000)} is repaid in three equal yearly instalments of principal, together with interest at 10% per annum on the amount outstanding. The total paid at the end of the second year is`,
  opts: [rs(LN_A.sched[1].pay), rs(LN_A.sched[0].pay), rs(LN_A.sched[2].pay), rs(LN_A.sched[1].inst)],
  sol: `Instalment = ${fig(180000)} ÷ 3 = ${fig(LN_A.sched[1].inst)}. In year 2 the outstanding loan is ${fig(LN_A.sched[1].opening)}, so interest = ${fig(LN_A.sched[1].interest)}; total ${fig(LN_A.sched[1].pay)}.`,
}));

Q('m_required_cap', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: "When the continuing partners agree to keep their capitals in their new profit-sharing ratio, each partner's required capital is found as",
  opts: ['the total capital of the new firm multiplied by his new share', 'his adjusted capital multiplied by his gain', 'the total capital of the new firm divided equally among the partners', "the retiring partner's capital multiplied by his old share"],
  sol: 'Required capital = total capital × new share; the difference from the adjusted capital is brought in or withdrawn (or taken to the current account).',
}));

const CB = { have: { Varun: 130000, Wahida: 70000 }, total: 240000, sh: shares(['Varun', 'Wahida'], [3, 1]) };
const CBneed = split(CB.total, CB.sh);
const CBdiff = { Varun: CBneed.Varun - CB.have.Varun, Wahida: CBneed.Wahida - CB.have.Wahida };
check(CBdiff.Varun === 50000 && CBdiff.Wahida === -10000, 'CB');
Q('m_cap_bring', mcq({
  t: 3, d: 3, c: 'application',
  stem: `After a partner retires, the adjusted capitals of Varun and Wahida are ${rs(CB.have.Varun)} and ${rs(CB.have.Wahida)}. The total capital of the reconstituted firm is to be ${rs(CB.total)} in their new ratio 3:1, any surplus or deficit being settled in cash. Which is correct?`,
  opts: [`Varun brings in ${rs(CBdiff.Varun)} and Wahida withdraws ${rs(-CBdiff.Wahida)}`, `Varun brings in ${rs(40000)} and Wahida brings in nothing`, `Each partner brings in ${rs(20000)}`, `Varun withdraws ${rs(50000)} and Wahida brings in ${rs(10000)}`],
  sol: `Required capitals: Varun 3/4 × ${fig(CB.total)} = ${fig(CBneed.Varun)}; Wahida 1/4 × ${fig(CB.total)} = ${fig(CBneed.Wahida)}. Varun is short by ${fig(CBdiff.Varun)}; Wahida has ${fig(-CBdiff.Wahida)} more than needed.`,
}));

Q('ar_loan', ar({
  t: 3, d: 3, c: 'analysis', key: 'b',
  a: 'An amount due to a retiring partner that is not paid at once is transferred to his loan account.',
  r: "Interest on a retiring partner's loan is a charge against the profits of the firm.",
  sol: 'Both statements are true, but R is about how the interest is treated later; it does not explain why the unpaid amount becomes a loan (he has ceased to be a partner and is now a creditor).',
}));

Q('tf_bs_loan', tf({
  t: 3, d: 1, c: 'understanding', ans: false,
  stem: "True or false? In the balance sheet of the reconstituted firm, the retiring partner's loan is shown on the assets side.",
  sol: 'The firm owes the money to the retiring partner, so his loan is a liability, shown on the liabilities side until it is repaid.',
}));

const N_ROHIT = { capital: 90000, reserve: 15000, reval: 6000, gw: 24000, drawings: 5000 };
const N_ROHITdue = N_ROHIT.capital + N_ROHIT.reserve + N_ROHIT.reval + N_ROHIT.gw - N_ROHIT.drawings;
check(N_ROHITdue === 130000, 'N_ROHIT');
Q('n_amount_due', num({
  t: 3, d: 2, c: 'understanding', marks: 2, value: N_ROHITdue, unit: '₹',
  stem: `Rohit retires from an imagined firm. His capital is ${rs(N_ROHIT.capital)}, his share of general reserve ${rs(N_ROHIT.reserve)}, his share of revaluation profit ${rs(N_ROHIT.reval)}, his share of goodwill ${rs(N_ROHIT.gw)} and his drawings ${rs(N_ROHIT.drawings)}. Find the amount due to Rohit (in ₹).`,
  sol: `Amount due = ${fig(N_ROHIT.capital)} + ${fig(N_ROHIT.reserve)} + ${fig(N_ROHIT.reval)} + ${fig(N_ROHIT.gw)} − ${fig(N_ROHIT.drawings)} = ${fig(N_ROHITdue)}. So ₹${fig(N_ROHITdue)}.`,
  scheme: [['Credits added and drawings subtracted', 1], [`Amount ${rs(N_ROHITdue)}`, 1]],
}));

export const LN_CHECK = loanAccount({ principal: 90000, rate: 8, opens: ['1 Apr 2026', '1 Apr 2027', '1 Apr 2028'], ends: ['31 Mar 2027', '31 Mar 2028', '31 Mar 2029'], firstLabel: "Partner's Capital A/c" });
check(LN_CHECK.sched[1].interest === 4800, 'LN_CHECK');
Q('n_loan_interest', num({
  t: 3, d: 2, c: 'understanding', marks: 1, value: LN_CHECK.sched[1].interest, unit: '₹',
  stem: `A retiring partner's loan of ${rs(90000)} is to be repaid in three equal yearly instalments of principal with interest at 8% per annum on the balance outstanding. Find the interest for the second year (in ₹).`,
  sol: `After the first instalment of ${fig(30000)}, the loan outstanding is ${fig(LN_CHECK.sched[1].opening)}. Interest = ${fig(LN_CHECK.sched[1].opening)} × 8/100 = ${fig(LN_CHECK.sched[1].interest)}. So ₹${fig(LN_CHECK.sched[1].interest)}.`,
}));

Q('mt_settle', match({
  t: 3, d: 2, c: 'understanding', marks: 2,
  stem: 'Match each event in column A with its journal entry in column B.',
  pairs: [
    ['Amount due paid to the retiring partner at once', "Retiring Partner's Capital A/c Dr, To Bank A/c"],
    ['Amount due left in the firm', "Retiring Partner's Capital A/c Dr, To Retiring Partner's Loan A/c"],
    ['Interest on the unpaid amount for the year', "Interest A/c Dr, To Retiring Partner's Loan A/c"],
    ['Payment of a yearly instalment', "Retiring Partner's Loan A/c Dr, To Bank A/c"],
  ],
  sol: 'Capital is closed either to bank or to loan; interest is credited to the loan; each payment reduces the loan.',
}));

const RS_V = shares(['Vani', 'Wasim', 'Yash'], [2, 2, 1]);
const R_V = exitShares({ old: RS_V, out: 'Yash', mode: 'old' });
const GW_V = goodwillAdj(200000, R_V.change);
const CA_Y = capitalAccounts(['Yash'], {
  dr: [['Revaluation A/c (loss)', { Yash: split(15000, RS_V).Yash }], ['Profit and Loss A/c', { Yash: split(10000, RS_V).Yash }]],
  cr: [['Balance b/d', { Yash: 160000 }], ['General Reserve A/c', { Yash: split(60000, RS_V).Yash }], ...Object.entries(GW_V.dr).map(([p, v]) => [cap(p), { Yash: v }])],
  close: [["Yash's Loan A/c", ['Yash']]],
});
check(CA_Y.balance.Yash === 207000 && GW_V.dr.Vani === 20000, 'CA_Y');
Q('s3_amount_due', short({
  t: 3, d: 3, c: 'application', marks: 3,
  stem: `Vani, Wasim and Yash share profits 2:2:1 in an imagined solar-panel dealership in Nagpur. Yash retires; his capital stands at ${rs(160000)}. The General Reserve is ${rs(60000)}, the Profit and Loss Account shows a debit balance of ${rs(10000)}, and revaluation shows a loss of ${rs(15000)}. The firm's goodwill is valued at ${rs(200000)}; Vani and Wasim continue in their old ratio. The amount due to Yash is transferred to his loan account. Prepare Yash's Capital Account.`,
  model: `Yash's share of goodwill = ${fig(200000)} × 1/5 = ${fig(GW_V.total)}, contributed by Vani and Wasim in the gaining ratio 1:1.\n\n**Yash's Capital Account**\n\n${CA_Y.md}`,
  sol: 'Credit his capital, reserve and goodwill; debit his share of losses; the balance is the loan.',
  scheme: [['Credits: capital, reserve, goodwill from both partners', 1], ['Debits: revaluation loss and accumulated loss', 1], [`Balance ${rs(CA_Y.balance.Yash)} to loan`, 1]],
}));

const LN_Z = loanAccount({ principal: 120000, rate: 10, opens: ['1 Apr 2026', '1 Apr 2027', '1 Apr 2028'], ends: ['31 Mar 2027', '31 Mar 2028', '31 Mar 2029'], firstLabel: "Zoya's Capital A/c" });
check(LN_Z.sched.map((s) => s.pay).join() === '52000,48000,44000', 'LN_Z');
Q('s3_loan', short({
  t: 3, d: 2, c: 'application', marks: 3,
  stem: `Zoya retires from an imagined boutique in Chandigarh on 31 March 2026. The ${rs(120000)} due to her is to be paid in three equal yearly instalments of principal, starting on 31 March 2027, with interest at 10% per annum on the unpaid balance. Calculate the amount paid to her at the end of each year.`,
  model: `Equal instalment = ${fig(120000)} ÷ 3 = ${fig(LN_Z.sched[0].inst)}.\n\n${md(['Year ending', 'Opening balance (₹)', 'Interest at 10% (₹)', 'Instalment (₹)', 'Total paid (₹)', 'Closing balance (₹)'], LN_Z.sched.map((s) => [s.end, fig(s.opening), fig(s.interest), fig(s.inst), `**${fig(s.pay)}**`, fig(s.close)]), [1, 2, 3, 4, 5])}`,
  sol: 'Interest falls each year because it is charged on the reduced balance.',
  scheme: LN_Z.sched.map((s) => [`Year ending ${s.end}: ${rs(s.pay)}`, 1]),
}));

const RS_IJ = shares(['Ira', 'Jai', 'Kunal'], [2, 2, 1]);
const R_IJ = exitShares({ old: RS_IJ, out: 'Kunal', mode: 'given', newShares: shares(['Ira', 'Jai'], [3, 2]) });
const GW_IJ = goodwillAdj(75000, R_IJ.change);
const CA_IJ = capitalAccounts(['Ira', 'Jai', 'Kunal'], {
  dr: [[cap('Kunal'), GW_IJ.dr]],
  cr: [['Balance b/d', { Ira: 140000, Jai: 120000, Kunal: 80000 }], ['Revaluation A/c', split(15000, RS_IJ)], ['General Reserve A/c', split(25000, RS_IJ)], [cap('Ira'), { Kunal: GW_IJ.dr.Ira }]],
  close: [['Bank A/c', { Kunal: 40000 }], ["Kunal's Loan A/c", ['Kunal']], ['Balance c/d', ['Ira', 'Jai']]],
});
check(GW_IJ.dr.Ira === 15000 && !GW_IJ.dr.Jai && CA_IJ.balance.Kunal === 103000 && CA_IJ.balance.Ira === 141000 && CA_IJ.balance.Jai === 136000, 'CA_IJ');
Q('l4_cap_accounts', long({
  t: 3, d: 3, c: 'application', marks: 4,
  stem: `Ira, Jai and Kunal share profits 2:2:1 in an imagined bakery chain in Indore. Kunal retires on 31 March 2026, when their capitals are ${rs(140000)}, ${rs(120000)} and ${rs(80000)}. Revaluation shows a profit of ${rs(15000)} and the General Reserve is ${rs(25000)}. The firm's goodwill is valued at ${rs(75000)}, and Ira and Jai will share future profits 3:2. Kunal is paid ${rs(40000)} by cheque and the balance is transferred to his loan account. Prepare the partners' capital accounts.`,
  model: `Gain: Ira 3/5 − 2/5 = ${R_IJ.change.Ira}; Jai 2/5 − 2/5 = nil. So Ira alone pays Kunal's share of goodwill, ${fig(75000)} × 1/5 = ${fig(GW_IJ.total)}.\n\n**Partners' Capital Accounts**\n\n${CA_IJ.md}`,
  sol: 'Only a partner whose share rises pays for goodwill; the retiring balance is split between cash and loan.',
  scheme: [['Gain and goodwill borne by Ira', 1], ['Revaluation profit and reserve credited 2:2:1', 1], ['Kunal settled: cheque and loan', 1], ['Closing balances of Ira and Jai', 1]],
}));

const CAD = { have: { Mahesh: 185000, Nisha: 115000 }, total: 400000, sh: shares(['Mahesh', 'Nisha'], [3, 2]), om: 100000 };
const CADneed = split(CAD.total, CAD.sh);
const CADin = { Mahesh: CADneed.Mahesh - CAD.have.Mahesh, Nisha: CADneed.Nisha - CAD.have.Nisha };
check(CADin.Mahesh === 55000 && CADin.Nisha === 45000, 'CAD');
const J_CAD = journal([
  { dr: [['Bank A/c', CADin.Mahesh + CADin.Nisha]], cr: capRows(CADin), nar: 'cash brought in to make capitals proportionate to the new ratio' },
  { dr: [[cap('Om'), CAD.om]], cr: [['Bank A/c', CAD.om]], nar: 'amount due to Om paid' },
]);
Q('l4_cap_adjust', long({
  t: 3, d: 3, c: 'application', marks: 4,
  stem: `After Om's retirement from an imagined printing firm in Kolkata, the capitals of Mahesh and Nisha, after all adjustments, are ${rs(CAD.have.Mahesh)} and ${rs(CAD.have.Nisha)}. The total capital of the new firm is fixed at ${rs(CAD.total)}, to be held in their new ratio 3:2; any deficiency is to be brought in cash. Om's balance of ${rs(CAD.om)} is paid at once. Calculate the cash each partner brings in and pass the journal entries.`,
  model: `${md(['', 'Mahesh (₹)', 'Nisha (₹)'], [
    ['Required capital (3:2 of ' + fig(CAD.total) + ')', fig(CADneed.Mahesh), fig(CADneed.Nisha)],
    ['Less: existing capital', fig(CAD.have.Mahesh), fig(CAD.have.Nisha)],
    ['**Cash to be brought in**', `**${fig(CADin.Mahesh)}**`, `**${fig(CADin.Nisha)}**`],
  ], [1, 2])}\n\n${J_CAD.md}`,
  sol: 'Required capital = total capital × new share; compare with the existing balance.',
  scheme: [['Required capitals', 1], ['Cash to be brought in', 1], ['Entry for cash brought in', 1], ['Entry for payment to Om', 1]],
}));

const LN_S = loanAccount({ principal: 150000, rate: 9, opens: ['31 Mar 2026', '1 Apr 2027', '1 Apr 2028'], ends: ['31 Mar 2027', '31 Mar 2028', '31 Mar 2029'], firstLabel: "Sahil's Capital A/c" });
check(LN_S.sched.map((s) => s.interest).join() === '13500,9000,4500', 'LN_S');
Q('l4_loan', long({
  t: 3, d: 3, c: 'application', marks: 4,
  stem: `Sahil retired from an imagined travel firm in Udaipur on 31 March 2026, and the ${rs(150000)} due to him was transferred to his loan account. It is to be repaid in three equal yearly instalments of principal on 31 March each year, starting in 2027, together with interest at 9% per annum on the unpaid balance. Prepare Sahil's Loan Account until it is fully repaid.`,
  model: `**Sahil's Loan Account**\n\n${LN_S.md}`,
  sol: 'Each year: credit interest on the opening balance, debit the payment of instalment plus interest, carry the balance down.',
  scheme: [
    [`First year (interest ${rs(LN_S.sched[0].interest)}; payment ${rs(LN_S.sched[0].pay)})`, 1.5],
    [`Second year (interest ${rs(LN_S.sched[1].interest)}; payment ${rs(LN_S.sched[1].pay)})`, 1.5],
    [`Third year (payment ${rs(LN_S.sched[2].pay)}) and loan closed`, 1],
  ],
}));

// l6: full retirement with balance sheet (Akash, Bhumika, Chandan)
const RS_A = shares(['Akash', 'Bhumika', 'Chandan'], [5, 3, 2]);
const A0 = { creditors: 48000, bills: 12000, gr: 30000, cap: { Akash: 150000, Bhumika: 100000, Chandan: 80000 }, bank: 34000, debtors: 50000, stock: 46000, furniture: 40000, buildings: 250000 };
const BS_A0 = balanceSheet(
  [['Creditors', A0.creditors], ['Bills Payable', A0.bills], ['General Reserve', A0.gr], ...Object.entries(A0.cap).map(([p, v]) => [`Capital: ${p}`, v])],
  [['Bank', A0.bank], ['Debtors', A0.debtors], ['Stock', A0.stock], ['Furniture', A0.furniture], ['Buildings', A0.buildings]],
);
const A_PDD = F(5, 100).of(A0.debtors);
const RV_A = revaluation([['Buildings A/c', F(10, 100).of(A0.buildings)], ['Stock A/c', 40000 - A0.stock], ['Provision for Doubtful Debts A/c', -A_PDD], ['Furniture A/c', -4000]], RS_A);
const R_A = exitShares({ old: RS_A, out: 'Chandan', mode: 'given', newShares: shares(['Akash', 'Bhumika'], [3, 2]) });
const GW_A = goodwillAdj(100000, R_A.change);
const CA_A = capitalAccounts(['Akash', 'Bhumika', 'Chandan'], {
  dr: [[cap('Chandan'), GW_A.dr]],
  cr: [['Balance b/d', A0.cap], ['Revaluation A/c', RV_A.part], ['General Reserve A/c', split(A0.gr, RS_A)], ['Akash\'s Capital A/c', { Chandan: GW_A.dr.Akash }], ["Bhumika's Capital A/c", { Chandan: GW_A.dr.Bhumika }]],
  close: [['Bank A/c', { Chandan: 30000 }], ["Chandan's Loan A/c", ['Chandan']], ['Balance c/d', ['Akash', 'Bhumika']]],
});
const BS_A1 = balanceSheet(
  [['Creditors', A0.creditors], ['Bills Payable', A0.bills], ["Chandan's Loan", CA_A.closed["Chandan's Loan A/c"].Chandan], ['Capital: Akash', CA_A.balance.Akash], ['Capital: Bhumika', CA_A.balance.Bhumika]],
  [['Bank', A0.bank - 30000], [`Debtors ${fig(A0.debtors)} less provision ${fig(A_PDD)}`, A0.debtors - A_PDD], ['Stock', 40000], ['Furniture', A0.furniture - 4000], ['Buildings', A0.buildings + F(10, 100).of(A0.buildings)]],
);
check(RV_A.result === 12500 && CA_A.balance.Chandan === 108500 && BS_A1.total === 402500 && BS_A0.total === 420000, 'A');
Q('l6_retire_full', long({
  t: [2, 3], d: 4, c: 'analysis', marks: 6,
  stem: `Akash, Bhumika and Chandan are partners in an imagined tea-trading firm in Guwahati sharing profits 5:3:2. Their balance sheet on 31 March 2026 was:\n\n${BS_A0.md}\n\nChandan retired on that date on these terms:\n\n1. Buildings are appreciated by 10% and stock is reduced to ${rs(40000)}.\n2. A provision for doubtful debts is created at 5% on debtors.\n3. Furniture is depreciated by ${rs(4000)}.\n4. The firm's goodwill is valued at ${rs(100000)}; Akash and Bhumika will share future profits 3:2.\n5. Chandan is paid ${rs(30000)} by cheque and the balance is transferred to his loan account.\n\nPrepare the Revaluation Account, the partners' capital accounts and the balance sheet of the reconstituted firm.`,
  model: `**Revaluation Account**\n\n${RV_A.md}\n\nGains: Akash 3/5 − 1/2 = ${R_A.change.Akash}; Bhumika 2/5 − 3/10 = ${R_A.change.Bhumika}; gaining ratio ${R_A.gainRatio}. Chandan's share of goodwill = ${fig(100000)} × 1/5 = ${fig(GW_A.total)}.\n\n**Partners' Capital Accounts**\n\n${CA_A.md}\n\n**Balance Sheet of Akash and Bhumika as at 31 March 2026**\n\n${BS_A1.md}`,
  sol: 'Revalue first, then close the outgoing capital through goodwill and reserves, and rebuild the balance sheet from the revised figures.',
  scheme: [[`Revaluation Account (profit ${rs(RV_A.result)})`, 2], [`Capital accounts with goodwill in gaining ratio ${R_A.gainRatio}`, 2], [`Balance sheet totalling ${rs(BS_A1.total)}`, 2]],
}));

// l6: retirement with loan account (Deepak, Elina, Firoz)
const RS_D = shares(['Deepak', 'Elina', 'Firoz'], [2, 1, 1]);
const R_D = exitShares({ old: RS_D, out: 'Firoz', mode: 'old' });
const GW_D = goodwillAdj(120000, R_D.change);
const CA_F = capitalAccounts(['Firoz'], {
  dr: [['Revaluation A/c (loss)', { Firoz: split(8000, RS_D).Firoz }]],
  cr: [['Balance b/d', { Firoz: 110000 }], ['General Reserve A/c', { Firoz: split(48000, RS_D).Firoz }], ...Object.entries(GW_D.dr).map(([p, v]) => [cap(p), { Firoz: v }])],
  close: [['Bank A/c', { Firoz: 30000 }], ["Firoz's Loan A/c", ['Firoz']]],
});
const LN_F = loanAccount({ principal: CA_F.closed["Firoz's Loan A/c"].Firoz, rate: 12, opens: ['31 Mar 2026', '1 Apr 2027'], ends: ['31 Mar 2027', '31 Mar 2028'], firstLabel: "Firoz's Capital A/c" });
check(CA_F.balance.Firoz === 150000 && GW_D.dr.Deepak === 20000 && LN_F.sched[0].pay === 74400 && LN_F.sched[1].pay === 67200, 'F');
Q('l6_retire_loan', long({
  t: 3, d: 3, c: 'application', marks: 6,
  stem: `Deepak, Elina and Firoz share profits 2:1:1 in an imagined furniture workshop in Saharanpur. Firoz retires on 31 March 2026 with a capital of ${rs(110000)}. On that date the General Reserve is ${rs(48000)} and the revaluation of assets shows a loss of ${rs(8000)}. The firm's goodwill is valued at ${rs(120000)}, and Deepak and Elina continue in their old ratio. Firoz is paid ${rs(30000)} at once; the balance is to be paid in two equal yearly instalments on 31 March 2027 and 2028 with interest at 12% per annum on the unpaid balance. Prepare Firoz's Capital Account and his Loan Account.`,
  model: `Firoz's share of goodwill = ${fig(120000)} × 1/4 = ${fig(GW_D.total)}, borne by Deepak and Elina in the gaining ratio ${R_D.gainRatio}.\n\n**Firoz's Capital Account**\n\n${CA_F.md}\n\n**Firoz's Loan Account**\n\n${LN_F.md}`,
  sol: 'Settle the capital account first; the loan starts with the unpaid balance and earns interest on the outstanding amount each year.',
  scheme: [['Capital account credits and debits', 1.5], [`Transfer of ${rs(CA_F.closed["Firoz's Loan A/c"].Firoz)} to loan`, 0.5], ['Loan account year 1', 2], ['Loan account year 2', 2]],
}));

// l6: capital adjustment (Gagan, Heena, Ishita)
const RS_G = shares(['Gagan', 'Heena', 'Ishita'], [5, 3, 2]);
const R_G = exitShares({ old: RS_G, out: 'Ishita', mode: 'old' });
const GW_G = goodwillAdj(200000, R_G.change);
const RV_G = revaluation([['Land A/c', 40000], ['Provision for Doubtful Debts A/c', -6000], ['Creditors A/c (unrecorded)', -4000]], RS_G);
const CA_G0 = capitalAccounts(['Gagan', 'Heena', 'Ishita'], {
  dr: [[cap('Ishita'), GW_G.dr]],
  cr: [['Balance b/d', { Gagan: 200000, Heena: 120000, Ishita: 100000 }], ['Revaluation A/c', RV_G.part], ['Profit and Loss A/c', split(20000, RS_G)], [cap('Gagan'), { Ishita: GW_G.dr.Gagan }], [cap('Heena'), { Ishita: GW_G.dr.Heena }]],
  close: [['Balance c/d', ['Gagan', 'Heena', 'Ishita']]],
});
const G_NEED = split(400000, R_G.nw);
const G_IN = { Gagan: G_NEED.Gagan - CA_G0.balance.Gagan, Heena: G_NEED.Heena - CA_G0.balance.Heena };
const CA_G = capitalAccounts(['Gagan', 'Heena', 'Ishita'], {
  dr: [[cap('Ishita'), GW_G.dr]],
  cr: [['Balance b/d', { Gagan: 200000, Heena: 120000, Ishita: 100000 }], ['Revaluation A/c', RV_G.part], ['Profit and Loss A/c', split(20000, RS_G)], [cap('Gagan'), { Ishita: GW_G.dr.Gagan }], [cap('Heena'), { Ishita: GW_G.dr.Heena }], ['Bank A/c (cash brought in)', G_IN]],
  close: [['Bank A/c', ['Ishita']], ['Balance c/d', ['Gagan', 'Heena']]],
});
check(RV_G.result === 30000 && CA_G0.balance.Ishita === 150000 && CA_G0.balance.Gagan === 200000 && CA_G0.balance.Heena === 120000 && G_IN.Gagan === 50000 && G_IN.Heena === 30000 && CA_G.balance.Gagan === G_NEED.Gagan, 'G');
Q('l6_retire_capadj', long({
  t: [2, 3], d: 4, c: 'analysis', marks: 6,
  stem: `Gagan, Heena and Ishita share the profits of an imagined organic-food store in Dehradun in the ratio 5:3:2; their capitals are ${rs(200000)}, ${rs(120000)} and ${rs(100000)}, and the Profit and Loss Account shows a credit balance of ${rs(20000)}. Ishita retires, and Gagan and Heena continue in their old ratio. Land is revalued upwards by ${rs(40000)}, a provision for doubtful debts of ${rs(6000)} is made and an unrecorded creditor of ${rs(4000)} is brought into the books. The firm's goodwill is valued at ${rs(200000)}. Ishita is paid in full. The total capital of the new firm is to be ${rs(400000)} in the new profit-sharing ratio, Gagan and Heena bringing in any deficiency in cash. Prepare the Revaluation Account and the partners' capital accounts.`,
  model: `**Revaluation Account**\n\n${RV_G.md}\n\nIshita's share of goodwill = ${fig(200000)} × 1/5 = ${fig(GW_G.total)}, borne by Gagan and Heena in the gaining ratio ${R_G.gainRatio}.\n\nAfter these adjustments Gagan has ${fig(CA_G0.balance.Gagan)} and Heena ${fig(CA_G0.balance.Heena)}. Required: Gagan 5/8 × ${fig(400000)} = ${fig(G_NEED.Gagan)}; Heena 3/8 × ${fig(400000)} = ${fig(G_NEED.Heena)}. Cash brought in: Gagan ${fig(G_IN.Gagan)}, Heena ${fig(G_IN.Heena)}.\n\n**Partners' Capital Accounts**\n\n${CA_G.md}`,
  sol: 'Complete every retirement adjustment before comparing the continuing capitals with the required capitals in the new ratio.',
  scheme: [[`Revaluation Account (profit ${rs(RV_G.result)})`, 1.5], [`Goodwill in gaining ratio ${R_G.gainRatio} and accumulated profit`, 1.5], [`Ishita paid ${rs(CA_G.balance.Ishita)}`, 1], ['Required capitals and cash brought in', 2]],
}));

// l6: fixed capitals (Tanya, Uday, Vikram)
const RS_T = shares(['Tanya', 'Uday', 'Vikram'], [2, 1, 1]);
const R_T = exitShares({ old: RS_T, out: 'Vikram', mode: 'old' });
const GW_T = goodwillAdj(120000, R_T.change);
const CUR_T = capitalAccounts(['Tanya', 'Uday', 'Vikram'], {
  dr: [['Balance b/d', { Vikram: 5000 }], ["Vikram's Current A/c", GW_T.dr]],
  cr: [['Balance b/d', { Tanya: 15000, Uday: 8000 }], ['Revaluation A/c', split(16000, RS_T)], ['General Reserve A/c', split(24000, RS_T)], ["Tanya's Current A/c", { Vikram: GW_T.dr.Tanya }], ["Uday's Current A/c", { Vikram: GW_T.dr.Uday }]],
  close: [[cap('Vikram'), ['Vikram']], ['Balance c/d', ['Tanya', 'Uday']]],
});
const CAP_V = ledger([["Vikram's Loan A/c", 100000 + CUR_T.balance.Vikram]], [['Balance b/d', 100000], ["Vikram's Current A/c", CUR_T.balance.Vikram]]);
check(GW_T.dr.Tanya === 20000 && CUR_T.balance.Vikram === 35000 && CUR_T.balance.Tanya === 15000 && CUR_T.balance.Uday === 8000 && CAP_V.total === 135000, 'T');
Q('l6_retire_fixed', long({
  t: 3, d: 4, c: 'analysis', marks: 6,
  stem: `Tanya, Uday and Vikram share profits 2:1:1 in an imagined coaching institute in Kota and keep fixed capitals of ${rs(200000)}, ${rs(100000)} and ${rs(100000)}. Their current accounts show Tanya ${rs(15000)} (credit), Uday ${rs(8000)} (credit) and Vikram ${rs(5000)} (debit). Vikram retires on 31 March 2026. Revaluation shows a profit of ${rs(16000)}, the General Reserve is ${rs(24000)} and the firm's goodwill is valued at ${rs(120000)}; Tanya and Uday continue in their old ratio. All adjustments are made through current accounts. Vikram's current account is closed by transfer to his capital account, and the total due to him is transferred to his loan account. Prepare the partners' current accounts and Vikram's capital account.`,
  model: `Vikram's share of goodwill = ${fig(120000)} × 1/4 = ${fig(GW_T.total)}, charged to Tanya and Uday in the gaining ratio ${R_T.gainRatio}.\n\n**Partners' Current Accounts**\n\n${CUR_T.md}\n\n**Vikram's Capital Account**\n\n${CAP_V.md}`,
  sol: 'Under fixed capitals every adjustment goes through the current accounts; only the final settlement touches the capital account.',
  scheme: [['Opening balances including the debit balance', 1], ['Revaluation profit and reserve credited 2:1:1', 1], ['Goodwill through current accounts', 1.5], ["Vikram's current balance transferred", 0.5], ["Vikram's capital account and loan", 2]],
}));

// ================================================================ t04 Death of a partner
const DT = { profit: 240000, months: 2, share: F(1, 4) };
const DTv = DT.share.of(F(DT.months, 12).of(DT.profit));
check(DTv === 10000, 'DT');
Q('m_death_time', mcq({
  t: 4, d: 3, c: 'application',
  stem: `A partner with a one-fourth share in an imagined firm dies on 31 May 2026; the firm closes its books on 31 March. Last year's profit was ${rs(DT.profit)}, and his share of profit till death is to be based on it. His share is`,
  opts: [rs(DTv), rs(20000), rs(60000), rs(5000)],
  sol: `Profit for 1 April to 31 May (2 months) = ${fig(DT.profit)} × 2/12 = ${fig(F(2, 12).of(DT.profit))}; his share = 1/4 of it = ${fig(DTv)}.`,
}));

const DS = { sales: 2000000, profit: 200000, salesTill: 600000, share: F(3, 10) };
const DSrate = F(DS.profit, DS.sales);
const DSv = DS.share.of(DSrate.of(DS.salesTill));
check(DSv === 18000, 'DS');
Q('m_death_turnover', mcq({
  t: 4, d: 3, c: 'application',
  stem: `In an imagined firm, last year's sales were ${rs(DS.sales)} and profit ${rs(DS.profit)}. A partner with a 3/10 share dies; sales from the start of the year to his death were ${rs(DS.salesTill)}. On the sales basis, his share of profit till death is`,
  opts: [rs(DSv), rs(60000), rs(20000), rs(6000)],
  sol: `Rate of profit = ${fig(DS.profit)} ÷ ${fig(DS.sales)} = ${pct(DSrate)} of sales. Profit till death = ${pct(DSrate)} of ${fig(DS.salesTill)} = ${fig(DSrate.of(DS.salesTill))}; his share = 3/10 of it = ${fig(DSv)}.`,
}));

Q('m_pl_susp', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: "A deceased partner's share of profit from the beginning of the year to the date of death is recorded by",
  opts: ["debiting Profit and Loss Suspense A/c and crediting the deceased partner's capital account", "debiting the deceased partner's capital account and crediting Profit and Loss Suspense A/c", "debiting the Revaluation Account and crediting the executor's account", "debiting the executor's account and crediting the Bank Account"],
  sol: 'The year is not over, so the profit is not yet known; the share is credited to his capital and the debit is parked in Profit and Loss Suspense until the year closes.',
}));

Q('m_executor', mcq({
  t: 4, d: 1, c: 'recall',
  stem: "After all adjustments, the balance of a deceased partner's capital account is transferred to",
  opts: ["his executor's account", 'the Revaluation Account', "the continuing partners' capital accounts", 'the Profit and Loss Suspense Account'],
  sol: "The amount is now owed to his legal representative, so it moves to the executor's account and is paid from there.",
}));

Q('ar_suspense', ar({
  t: 4, d: 3, c: 'analysis', key: 'c',
  a: "Profit and Loss Suspense Account is debited with a deceased partner's share of profit till the date of death.",
  r: 'If a balance sheet is prepared on the date of death, the Profit and Loss Suspense Account appears on its liabilities side.',
  sol: 'A is true. R is false: the suspense account has a debit balance, so it would be shown on the assets side until the profit for the year is known.',
}));

Q('ar_death_profit', ar({
  t: 4, d: 2, c: 'understanding', key: 'b',
  a: "A deceased partner's share of profit till the date of death may be calculated on the basis of sales.",
  r: "The amount due to a deceased partner's executor may be paid in a lump sum or in instalments with interest.",
  sol: 'Both are true, but R is about how the executor is paid, not about how the share of profit is calculated; so R does not explain A.',
}));

Q('tf_turnover', tf({
  t: 4, d: 2, c: 'understanding', ans: true,
  stem: "True or false? Under the turnover basis, a deceased partner's share of profit till death is found by applying last year's rate of profit on sales to the sales made up to the date of death.",
  sol: 'Rate of profit = last year profit ÷ last year sales; this rate is applied to the sales from the start of the year to the date of death, and the partner gets his share of that profit.',
}));

Q('fb_executor', fb({
  t: 4, d: 1, c: 'recall',
  stem: "The amount due to a deceased partner is transferred to his ___ Account.",
  acc: [["Executor's", 'Executors', 'Executor']],
  sol: "It is transferred to his Executor's Account (the account of his legal representative).",
}));

const NDT = { profits: [180000, 210000, 240000], months: 7, share: F(2, 5) };
const NDTavg = avgGoodwill(NDT.profits, 1).avg;
const NDTv = NDT.share.of(F(NDT.months, 12).of(NDTavg));
check(NDTavg === 210000 && NDTv === 49000, 'NDT');
Q('n_death_time', num({
  t: 4, d: 3, c: 'application', marks: 2, value: NDTv, unit: '₹',
  stem: `Leela, a partner with a 2/5 share in an imagined firm, dies on 31 October 2026; the books close on 31 March. Her share of profit till death is to be based on the average profit of the last three years: ${rs(NDT.profits[0])}, ${rs(NDT.profits[1])} and ${rs(NDT.profits[2])}. Calculate her share (in ₹).`,
  sol: `Average profit = (${NDT.profits.map(fig).join(' + ')}) ÷ 3 = ${fig(NDTavg)}. Profit for 7 months = ${fig(NDTavg)} × 7/12 = ${fig(F(7, 12).of(NDTavg))}. Leela's share = 2/5 × ${fig(F(7, 12).of(NDTavg))} = ${fig(NDTv)}. So ₹${fig(NDTv)}.`,
  scheme: [['Average profit and profit for 7 months', 1], [`Share ${rs(NDTv)}`, 1]],
}));

const NDS = { sales: 2500000, profit: 300000, salesTill: 900000, share: F(1, 3) };
const NDSv = NDS.share.of(F(NDS.profit, NDS.sales).of(NDS.salesTill));
check(NDSv === 36000, 'NDS');
Q('n_death_turnover', num({
  t: 4, d: 3, c: 'application', marks: 2, value: NDSv, unit: '₹',
  stem: `Mustafa has a one-third share in an imagined hardware store. He dies on 30 September 2026. Last year the store's sales were ${rs(NDS.sales)} and its profit ${rs(NDS.profit)}; sales from 1 April 2026 to his death were ${rs(NDS.salesTill)}. Find his share of profit till death on the sales basis (in ₹).`,
  sol: `Rate of profit = ${fig(NDS.profit)} ÷ ${fig(NDS.sales)} = ${pct(F(NDS.profit, NDS.sales))} of sales. Profit till death = ${pct(F(NDS.profit, NDS.sales))} of ${fig(NDS.salesTill)} = ${fig(F(NDS.profit, NDS.sales).of(NDS.salesTill))}. His share = 1/3 of it = ${fig(NDSv)}. So ₹${fig(NDSv)}.`,
  scheme: [['Rate of profit and profit till death', 1], [`Share ${rs(NDSv)}`, 1]],
}));

const SDB = { profits: [240000, 300000, 360000], months: 6, share: F(1, 6) };
const SDBavg = avgGoodwill(SDB.profits, 1).avg;
const SDBv = SDB.share.of(F(SDB.months, 12).of(SDBavg));
check(SDBv === 25000, 'SDB');
Q('s3_death_basis', short({
  t: 4, d: 2, c: 'application', marks: 3,
  stem: `Rajat, Sneha and Tarun share the profits of an imagined garment unit in Tiruppur in the ratio 3:2:1. Tarun dies on 30 September 2026; the books close on 31 March every year. His share of profit till death is to be calculated on the average profit of the last three years, which were ${SDB.profits.map(rs).join(', ')}. Calculate Tarun's share and pass the journal entry.`,
  model: `- Average profit = (${SDB.profits.map(fig).join(' + ')}) ÷ 3 = **${fig(SDBavg)}**.\n- Profit for 1 April to 30 September (6 months) = ${fig(SDBavg)} × 6/12 = ${fig(F(6, 12).of(SDBavg))}.\n- Tarun's share = 1/6 × ${fig(F(6, 12).of(SDBavg))} = **${fig(SDBv)}**.\n\n${journal([{ date: '30 Sep 2026', dr: [['Profit and Loss Suspense A/c', SDBv]], cr: [[cap('Tarun'), SDBv]], nar: "Tarun's share of profit till the date of death" }]).md}`,
  sol: 'Average, then time-proportion, then the partner share; the debit goes to the suspense account.',
  scheme: [['Average profit', 1], [`Share ${rs(SDBv)}`, 1], ['Journal entry', 1]],
}));

const EX_L = { due: 240000, paid: 100000, rate: 8, months: 9 };
const EX_Lint = F(EX_L.rate * EX_L.months, 100 * 12).of(EX_L.due - EX_L.paid);
const EX_LA = ledger(
  [['30 Jun 2026', 'Bank A/c', EX_L.paid], ['31 Mar 2027', 'Bank A/c', EX_L.due - EX_L.paid + EX_Lint]],
  [['30 Jun 2026', "Lakshmi's Capital A/c", EX_L.due], ['31 Mar 2027', 'Interest A/c', EX_Lint]],
  { dates: true },
);
check(EX_Lint === 8400 && EX_LA.total === 248400, 'EX_L');
Q('s3_executor', short({
  t: 4, d: 3, c: 'application', marks: 3,
  stem: `Lakshmi, a partner in an imagined jewellery firm in Thrissur, died on 30 June 2026. The ${rs(EX_L.due)} due to her was transferred to her Executor's Account on that day. The executor was paid ${rs(EX_L.paid)} at once, and the balance on 31 March 2027 together with interest at ${EX_L.rate}% per annum. Prepare Lakshmi's Executor's Account.`,
  model: `Interest on ${fig(EX_L.due - EX_L.paid)} for 9 months at ${EX_L.rate}% = ${fig(EX_L.due - EX_L.paid)} × ${EX_L.rate}/100 × 9/12 = ${fig(EX_Lint)}.\n\n**Lakshmi's Executor's Account**\n\n${EX_LA.md}`,
  sol: 'Interest runs only on the unpaid balance and only for the months it was outstanding.',
  scheme: [['Amount due credited', 1], [`Interest ${rs(EX_Lint)}`, 1], ['Payments and balancing', 1]],
}));

const DP = { sales: 3200000, profit: 480000, salesTill: 1200000, months: 4, share: F(1, 5) };
const DPa = DP.share.of(F(DP.months, 12).of(DP.profit));
const DPb = DP.share.of(F(DP.profit, DP.sales).of(DP.salesTill));
check(DPa === 32000 && DPb === 36000, 'DP');
Q('l4_death_profit', long({
  t: 4, d: 3, c: 'application', marks: 4,
  stem: `Tushar, Ujjwal and Varsha share profits 2:2:1 in an imagined stationery wholesaler in Patna. Varsha dies on 31 July 2026; the books close on 31 March. Last year the firm's sales were ${rs(DP.sales)} and its profit ${rs(DP.profit)}. Sales from 1 April 2026 to 31 July 2026 were ${rs(DP.salesTill)}. Calculate Varsha's share of profit till death (a) on the basis of last year's profit and (b) on the basis of sales, and pass the journal entry for (b).`,
  model: `**(a) Time basis:** ${fig(DP.profit)} × 4/12 = ${fig(F(4, 12).of(DP.profit))}; Varsha's share = 1/5 × ${fig(F(4, 12).of(DP.profit))} = **${fig(DPa)}**.\n\n**(b) Sales basis:** rate of profit = ${fig(DP.profit)} ÷ ${fig(DP.sales)} = ${pct(F(DP.profit, DP.sales))}. Profit till death = ${pct(F(DP.profit, DP.sales))} of ${fig(DP.salesTill)} = ${fig(F(DP.profit, DP.sales).of(DP.salesTill))}; Varsha's share = 1/5 × ${fig(F(DP.profit, DP.sales).of(DP.salesTill))} = **${fig(DPb)}**.\n\n${journal([{ date: '31 Jul 2026', dr: [['Profit and Loss Suspense A/c', DPb]], cr: [[cap('Varsha'), DPb]], nar: "Varsha's share of profit till death on the sales basis" }]).md}`,
  sol: 'Time basis spreads last year’s profit evenly over months; sales basis applies last year’s profit rate to this year’s sales.',
  scheme: [[`(a) ${rs(DPa)}`, 1.5], [`(b) ${rs(DPb)}`, 1.5], ['Journal entry', 1]],
}));

const DC = { sales: 4000000, profit: 600000, salesTill: 800000, months: 5, share: F(1, 4) };
const DCtime = DC.share.of(F(DC.months, 12).of(DC.profit));
const DCturn = DC.share.of(F(DC.profit, DC.sales).of(DC.salesTill));
check(DCtime === 62500 && DCturn === 30000, 'DC');
Q('l4_death_compare', long({
  t: 4, d: 4, c: 'evaluation', marks: 4,
  stem: `Ganesh, Hema, Irfan and Jaya share equally in an imagined fireworks wholesaler in Sivakasi, which makes most of its sales in October and November before Diwali. Jaya dies on 31 August 2026; the books close on 31 March. Last year the firm's sales were ${rs(DC.sales)} and profit ${rs(DC.profit)}; sales from 1 April to 31 August 2026 were only ${rs(DC.salesTill)}. Calculate Jaya's share of profit till death on the time basis (last year's profit) and on the sales basis, and evaluate which basis is fairer to the continuing partners.`,
  model: `- **Time basis:** ${fig(DC.profit)} × 5/12 × 1/4 = **${fig(DCtime)}**.\n- **Sales basis:** rate = ${fig(DC.profit)} ÷ ${fig(DC.sales)} = ${pct(F(DC.profit, DC.sales))}; ${pct(F(DC.profit, DC.sales))} of ${fig(DC.salesTill)} = ${fig(F(DC.profit, DC.sales).of(DC.salesTill))}; × 1/4 = **${fig(DCturn)}**.\n\n**Evaluation:** the time basis assumes profit is earned evenly through the year. Here sales are seasonal and most of the year's profit is still to come after her death, so the time basis would pay Jaya's estate ${fig(DCtime - DCturn)} more than the profit actually earned while she was a partner. The **sales basis** links her share to the business done up to her death, so it is fairer to the continuing partners (the partnership deed should say which basis applies).`,
  sol: 'Compute both, then judge which basis matches the pattern of earnings of a seasonal business.',
  scheme: [[`Time basis ${rs(DCtime)}`, 1], [`Sales basis ${rs(DCturn)}`, 1], ['Evaluation with reason (seasonality) and conclusion', 2]],
}));

// l6: deceased partner's capital and executor's accounts (Neha, Omkar, Parth)
const RS_N = shares(['Neha', 'Omkar', 'Parth'], [3, 2, 1]);
const R_N = exitShares({ old: RS_N, out: 'Parth', mode: 'old' });
const GW_N = goodwillAdj(240000, R_N.change);
const N_IOC = F(10 * 5, 100 * 12).of(150000);
const N_PTD = F(1, 6).of(F(5, 12).of(360000));
const CA_P = capitalAccounts(['Parth'], {
  dr: [['Drawings A/c', { Parth: 12000 }], ['Revaluation A/c (loss)', { Parth: split(18000, RS_N).Parth }]],
  cr: [['Balance b/d', { Parth: 150000 }], ['Interest on Capital A/c', { Parth: N_IOC }], ['Profit and Loss Suspense A/c', { Parth: N_PTD }], ['General Reserve A/c', { Parth: split(72000, RS_N).Parth }], ...Object.entries(GW_N.dr).map(([p, v]) => [cap(p), { Parth: v }])],
  close: [["Parth's Executor's A/c", ['Parth']]],
});
const EX_P = ledger([['Bank A/c', 68250], ["Parth's Executor's Loan A/c", CA_P.balance.Parth - 68250]], [["Parth's Capital A/c", CA_P.balance.Parth]]);
check(N_IOC === 6250 && N_PTD === 25000 && GW_N.dr.Neha === 24000 && CA_P.balance.Parth === 218250 && CA_P.balance.Parth - 68250 === 150000, 'P');
Q('l6_death_full', long({
  t: 4, d: 3, c: 'application', marks: 6,
  stem: `Neha, Omkar and Parth share the profits of an imagined mobile-repair chain in Hyderabad in the ratio 3:2:1. Parth dies on 31 August 2026; the books close on 31 March. On 1 April 2026 his capital was ${rs(150000)}, and he had drawn ${rs(12000)} up to his death. The deed provides for:\n\n1. Interest on capital at 10% per annum.\n2. His share of profit till death on the basis of last year's profit of ${rs(360000)}.\n3. His share of goodwill, the firm's goodwill being valued at ${rs(240000)}; Neha and Omkar continue in their old ratio.\n4. His share of the General Reserve of ${rs(72000)} and of a revaluation loss of ${rs(18000)}.\n\nHis executor is paid ${rs(68250)} at once and the balance is transferred to the executor's loan account. Prepare Parth's Capital Account and Parth's Executor's Account.`,
  model: `Workings: interest on capital = ${fig(150000)} × 10/100 × 5/12 = ${fig(N_IOC)}; profit till death = ${fig(360000)} × 5/12 × 1/6 = ${fig(N_PTD)}; goodwill = ${fig(240000)} × 1/6 = ${fig(GW_N.total)}, borne by Neha and Omkar ${R_N.gainRatio}.\n\n**Parth's Capital Account**\n\n${CA_P.md}\n\n**Parth's Executor's Account**\n\n${EX_P.md}`,
  sol: "Bring every credit and debit up to the date of death into the capital account; its balance opens the executor's account.",
  scheme: [['Interest on capital and profit till death', 1.5], ['Goodwill from Neha and Omkar', 1.5], ['Reserve, revaluation loss and drawings', 1], ["Executor's account", 2]],
}));

// l6: journal entries on death (Qasim, Radha, Sanjay)
const RS_Q = shares(['Qasim', 'Radha', 'Sanjay'], [2, 2, 1]);
const R_Q = exitShares({ old: RS_Q, out: 'Sanjay', mode: 'old' });
const GWV_Q = avgGoodwill([110000, 140000, 170000], 2);
const GW_Q = goodwillAdj(GWV_Q.value, R_Q.change);
const RV_Q = split(12000 - 7000, RS_Q);
const GR_Q = split(50000, RS_Q);
const PTD_Q = F(1, 5).of(F(3, 12).of(170000));
const DUE_Q = 100000 + GR_Q.Sanjay + RV_Q.Sanjay + GW_Q.total + PTD_Q - 6000;
check(GWV_Q.value === 280000 && GW_Q.total === 56000 && PTD_Q === 8500 && DUE_Q === 169500, 'Q');
const J_Q = journal([
  { dr: [['Plant A/c', 12000]], cr: [['Revaluation A/c', 12000]], nar: 'increase in the value of plant' },
  { dr: [['Revaluation A/c', 7000]], cr: [['Stock A/c', 7000]], nar: 'decrease in the value of stock' },
  { dr: [['Revaluation A/c', 5000]], cr: capRows(RV_Q), nar: 'revaluation profit shared in the old ratio' },
  { dr: [['General Reserve A/c', 50000]], cr: capRows(GR_Q), nar: 'general reserve distributed in the old ratio' },
  { dr: capRows(GW_Q.dr), cr: capRows(GW_Q.cr), nar: "Sanjay's share of goodwill adjusted in the gaining ratio 1:1" },
  { dr: [['Profit and Loss Suspense A/c', PTD_Q]], cr: [[cap('Sanjay'), PTD_Q]], nar: "Sanjay's share of profit till death" },
  { dr: [[cap('Sanjay'), 6000]], cr: [["Sanjay's Drawings A/c", 6000]], nar: 'drawings transferred to his capital account' },
  { dr: [[cap('Sanjay'), DUE_Q]], cr: [["Sanjay's Executor's A/c", DUE_Q]], nar: "amount due transferred to his executor's account" },
  { dr: [["Sanjay's Executor's A/c", DUE_Q]], cr: [['Bank A/c', DUE_Q - 100000], ["Sanjay's Executor's Loan A/c", 100000]], nar: 'part payment made and the balance transferred to a loan account' },
]);
Q('l6_death_entries', long({
  t: [2, 4], d: 4, c: 'analysis', marks: 6,
  stem: `Qasim, Radha and Sanjay share profits 2:2:1 in an imagined auto-parts firm in Faridabad. Sanjay dies on 30 June 2026; the books close on 31 March. His capital is ${rs(100000)}, the General Reserve is ${rs(50000)} and he had drawn ${rs(6000)} till his death. It is agreed that:\n\n1. Goodwill is valued at two years' purchase of the average profit of the last three years: ${rs(110000)}, ${rs(140000)} and ${rs(170000)}. Qasim and Radha continue in their old ratio.\n2. His share of profit till death is based on last year's profit.\n3. Plant is revalued upwards by ${rs(12000)} and stock reduced by ${rs(7000)}.\n4. His executor is paid ${rs(DUE_Q - 100000)} at once; the remaining ${rs(100000)} is transferred to the executor's loan account.\n\nPass the journal entries.`,
  model: `Workings: average profit ${fig(GWV_Q.avg)}; goodwill = 2 × ${fig(GWV_Q.avg)} = ${fig(GWV_Q.value)}; Sanjay's share = 1/5 = ${fig(GW_Q.total)}. Profit till death = ${fig(170000)} × 3/12 × 1/5 = ${fig(PTD_Q)}. Amount due = ${fig(100000)} + ${fig(GR_Q.Sanjay)} + ${fig(RV_Q.Sanjay)} + ${fig(GW_Q.total)} + ${fig(PTD_Q)} − ${fig(6000)} = ${fig(DUE_Q)}.\n\n${J_Q.md}`,
  sol: 'Value goodwill first, record every adjustment to the date of death, then move the balance to the executor and settle it.',
  scheme: [['Revaluation entries and profit shared', 1.5], ['General reserve', 0.5], ['Goodwill valued and adjusted', 1.5], ['Profit till death', 1], ['Drawings and transfer to executor', 0.5], ["Payment to executor and executor's loan", 1]],
}));

export const FACTS = [
  `Kriti/Lohit/Madhav due ${fig(DUE_KR)}`,
  `Akash/Bhumika balance sheet ${fig(BS_A1.total)}`,
  `Firoz loan payments ${LN_F.sched.map((s) => fig(s.pay)).join(', ')}`,
  `Gagan/Heena cash brought in ${fig(G_IN.Gagan)} and ${fig(G_IN.Heena)}`,
  `Parth due ${fig(CA_P.balance.Parth)}`,
  `Sanjay due ${fig(DUE_Q)}`,
];
export { sum };
