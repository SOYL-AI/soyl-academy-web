// ISC 12 Accounts, ch04 Reconstitution of Partnership: Retirement and Death of a Partner — question bank.
// Every firm, person and figure is imagined by SOYL and labelled as such; no textbook illustration or
// exercise and no CISCE specimen or past-paper item is reused. Every amount, ratio and statement is
// computed with acc.mjs from the givens and checked (entries balance, accounts and balance sheets total,
// shares divide exactly, loans are repaid in full); the expected values pinned below (hand-checked) catch
// any drift in the figures.
import { Q, mcq, ar, tf, fb, match, num, short, long } from './lib.mjs';
import { fr, retire, rs, inr, check, sum, journal, tAccount, revaluation, splitShares, ratioStr, ratioNotes, timeBasis, turnoverBasis, average, loanAccount, balanceSheet, solveRetirement, retirementNotes, retirementAnswer } from './acc.mjs';

const C = (n) => `${n}'s Capital A/c`;
const DATE_OLD = '31 March 2026';
const eq = (a, b, what) => check(JSON.stringify(a) === JSON.stringify(b), `${what}: got ${JSON.stringify(a)}, expected ${JSON.stringify(b)}`);
const nl = (lines) => lines.map((l, i) => `${i + 1}. ${l}`).join('\n');
const list = (m) => Object.entries(m).map(([n, x]) => `${n} ${rs(x)}`).join(', ');
const gwJournal = (R, g, nar) => ({ dr: Object.entries(g.dr).map(([n, x]) => [C(n), x]), cr: Object.entries(g.cr).map(([n, x]) => [C(n), x]), nar });
const provLabel = (b, c) => `Debtors ${inr(b)} less provision ${inr(-c)}`;

// ================================================================ t01 New ratio and gaining ratio
Q('m_retire_consent', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Kumudini wants to leave Palash Salt Pans, an imagined firm at Ponneri. The deed says nothing about retirement and the firm is not a partnership at will. Under Section 32 of the Indian Partnership Act, 1932, she may retire',
  opts: ['with the consent of all the other partners', 'by giving notice only to the partner with the largest capital', 'only after the firm itself has been dissolved', 'by filing a notice with the Registrar of Firms, without asking her partners'],
  sol: 'Section 32 permits retirement with the consent of all the other partners, under an express agreement among them, or by written notice when the partnership is at will; only the first route is open to her.',
}));

Q('m_death_dissolve', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'The deed of Swarna Bell-Metal Works, an imagined firm at Paithan, is silent on what happens if a partner dies. Under the Indian Partnership Act, 1932, the death of one of its partners',
  opts: ['dissolves the firm, which is why most deeds provide that the surviving partners will carry on the business', "makes the deceased partner's heir a partner automatically, with the same share", 'converts the firm into a sole proprietorship of the eldest surviving partner', 'has no legal effect until the Registrar of Firms approves a new deed'],
  sol: 'Subject to a contract among the partners, a firm is dissolved by the death of a partner. Deeds therefore usually let the survivors continue, and the books are then reconstituted rather than closed.',
}));

const MDR = retire({ Ilavarasi: fr(4, 9), Janardan: fr(3, 9), Kshama: fr(2, 9) }, 'Kshama');
eq([MDR.newInts, MDR.gainInts], [[4, 3], [4, 3]], 'm_default_ratio');
Q('m_default_ratio', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Ilavarasi, Janardan and Kshama share the profits of Amaltas Brass Lamps, an imagined firm at Tiruchirappalli, 4 : 3 : 2. Kshama retires and the partners agree on nothing about future shares. The new profit-sharing ratio of Ilavarasi and Janardan is',
  opts: [ratioStr(MDR.newInts), '1 : 1', '2 : 1', '3 : 4'],
  sol: `When nothing is agreed, the continuing partners keep their old ratio: Ilavarasi ${MDR.newShares.Ilavarasi} and Janardan ${MDR.newShares.Janardan}, so their gaining ratio is also ${ratioStr(MDR.gainInts)}.`,
}));

const MTS = retire({ Lakshana: fr(1, 2), Murugan: fr(3, 10), Nitya: fr(1, 5) }, 'Nitya', { take: { Lakshana: fr(1, 10), Murugan: fr(1, 10) } });
eq([MTS.newInts, MTS.gainInts], [[3, 2], [1, 1]], 'm_take_share');
Q('m_take_share', mcq({
  t: 1, d: 3, c: 'application',
  stem: "In Harsingar Banana Fibre Works, an imagined firm at Pollachi, Lakshana, Murugan and Nitya share profits 5 : 3 : 2. Nitya retires; Lakshana acquires 1/10 of the firm's profit from her and Murugan acquires the other 1/10. The new ratio of Lakshana and Murugan is",
  opts: [ratioStr(MTS.newInts), '5 : 3', '1 : 1', '6 : 5'],
  sol: `Add each acquisition to the old share: Lakshana 5/10 + 1/10 = ${MTS.newShares.Lakshana} and Murugan 3/10 + 1/10 = ${MTS.newShares.Murugan}.`,
}));

const MGN = retire({ Orpita: fr(1, 2), Pranit: fr(1, 3), Sukhada: fr(1, 6) }, 'Pranit', { newRatio: [5, 3] });
eq([MGN.gain.Orpita.toString(), MGN.gain.Sukhada.toString(), MGN.gainInts], ['1/8', '5/24', [3, 5]], 'm_gain_newratio');
Q('m_gain_newratio', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Orpita, Pranit and Sukhada run Rajnigandha Brassware, an imagined firm at Pandharpur, sharing profits 3 : 2 : 1. When Pranit retires, Orpita and Sukhada agree to share future profits 5 : 3. Their gaining ratio is',
  opts: [ratioStr(MGN.gainInts), '3 : 1', '5 : 3', '1 : 1'],
  sol: `Gain = new share − old share: Orpita 5/8 − 1/2 = ${MGN.gain.Orpita} = 3/24 and Sukhada 3/8 − 1/6 = ${MGN.gain.Sukhada}, so the gaining ratio is 3 : 5, not the new ratio.`,
}));

const MSC = retire({ Tanushree: fr(2, 5), Udayan: fr(2, 5), Vaibhavi: fr(1, 5) }, 'Vaibhavi', { newRatio: [1, 3] }, { allowSacrifice: true });
const MSCg = MSC.goodwill(120000);
eq([MSC.gain.Tanushree.toString(), MSC.gain.Udayan.toString(), MSCg.dr, MSCg.cr], ['-3/20', '7/20', { Udayan: 42000 }, { Vaibhavi: 24000, Tanushree: 18000 }], 'm_sacrifice_cont');
Q('m_sacrifice_cont', mcq({
  t: [1, 2], d: 4, c: 'analysis',
  stem: `Tanushree, Udayan and Vaibhavi share the profits of Chameli Ghee Dairy, an imagined firm at Gokak, 2 : 2 : 1. On Vaibhavi's retirement, Tanushree and Udayan agree to share 1 : 3 in future. The firm's goodwill is valued at ${rs(MSCg.value)}. The adjustment entry for goodwill is`,
  opts: [
    `Udayan's Capital A/c Dr. ${rs(MSCg.dr.Udayan)} To Vaibhavi's Capital A/c ${rs(MSCg.cr.Vaibhavi)} and To Tanushree's Capital A/c ${rs(MSCg.cr.Tanushree)}`,
    `Tanushree's and Udayan's Capital A/cs Dr. ${rs(MSCg.cr.Vaibhavi / 2)} each To Vaibhavi's Capital A/c ${rs(MSCg.cr.Vaibhavi)}`,
    `Udayan's Capital A/c Dr. ${rs(MSCg.cr.Vaibhavi)} To Vaibhavi's Capital A/c ${rs(MSCg.cr.Vaibhavi)}`,
    `Goodwill A/c Dr. ${rs(MSCg.value)} To all three partners' Capital A/cs in 2 : 2 : 1`,
  ],
  sol: `Tanushree falls from 2/5 to 1/4, a sacrifice of 3/20, while Udayan rises from 2/5 to 3/4, a gain of 7/20. Udayan alone pays: 7/20 of ${inr(MSCg.value)} = ${inr(MSCg.dr.Udayan)}, of which Vaibhavi gets 1/5 of the goodwill (${inr(MSCg.cr.Vaibhavi)}) and Tanushree 3/20 (${inr(MSCg.cr.Tanushree)}).`,
}));

Q('m_gaining_meaning', mcq({
  t: 1, d: 1, c: 'recall',
  stem: "When a partner leaves Shukti Pearl Traders, an imagined firm at Thoothukudi, its accountant computes each continuing partner's gain. That gain is",
  opts: ["the continuing partner's new share minus his old share", "the continuing partner's old share minus his new share", "the outgoing partner's share divided equally among the continuing partners", "the continuing partner's new share divided by his old share"],
  sol: 'A continuing partner gains when his share rises, so the gain is measured as new share less old share; the ratio of these gains is the gaining ratio.',
}));

Q('tf_old_ratio_gain', tf({
  t: 1, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? If the deed of Neelkurinji Bamboo Craft, an imagined firm at Hojai, is silent about future shares when one partner retires, the continuing partners gain in the same proportion as their old profit-sharing ratio.',
  sol: 'With no agreement they carry on in their old ratio, so each one\'s gain is his old share scaled up, and the gains stand in that same old ratio.',
}));

Q('fb_gaining', fb({
  t: 1, d: 1, c: 'recall',
  stem: "When Wazir retires from Kasturi Desert Safaris, an imagined firm at Jaisalmer, the partners who stay on compensate him for goodwill in the proportion of their extra shares, called the ___ ratio.",
  acc: [['gaining', 'gain']],
  sol: "It is the gaining ratio, worked out as each continuing partner's new share minus his old share.",
}));

Q('ar_gain_sac', ar({
  t: 1, d: 3, c: 'understanding', key: 'b',
  a: "On the retirement of a partner from Bakul Ceramics, an imagined pottery firm, the retiring partner's share of goodwill is debited to the continuing partners in their gaining ratio.",
  r: 'On the admission of a new partner, the sacrificing ratio is the ratio in which the old partners give up their shares in his favour.',
  sol: 'A is a correct statement of the retirement entry and R correctly defines the sacrificing ratio, but R is about admission and does not explain why the gaining ratio is used on retirement.',
}));

const S2R = retire({ Yashodhara: fr(3, 8), Zoravar: fr(3, 8), Abhilasha: fr(2, 8) }, 'Abhilasha', { inRatio: [3, 1] });
eq([S2R.newInts, S2R.gainInts], [[9, 7], [3, 1]], 's2_ratio_take');
Q('s2_ratio_take', short({
  t: 1, d: 2, c: 'application', marks: 2,
  stem: "Yashodhara, Zoravar and Abhilasha share the profits of Saptaparni Eucalyptus Oil Distillers, an imagined firm at Coonoor, 3 : 3 : 2. Abhilasha retires, and her share is taken over by Yashodhara and Zoravar in the ratio 3 : 1. Calculate the new profit-sharing ratio and the gaining ratio.",
  model: nl(ratioNotes(S2R, { inRatio: [3, 1] })),
  sol: "Split the outgoing share in the agreed proportion and add each part to the old share; the gains are those parts, so their ratio is the agreed one.",
  scheme: [[`New ratio ${ratioStr(S2R.newInts)}`, 1], [`Gaining ratio ${ratioStr(S2R.gainInts)}`, 1]],
}));

Q('s2_sac_gain_diff', short({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'The partners of Kanchanar Stone Crushers, an imagined firm at Barmer, admitted a partner three years ago and now one of them is retiring. State two differences between the sacrificing ratio they used then and the gaining ratio they must use now.',
  model: '| Basis | Sacrificing ratio | Gaining ratio |\n|---|---|---|\n| When it is computed | On admission of a partner (or a change in ratio) | On retirement or death of a partner (or a change in ratio) |\n| Formula | Old share − new share | New share − old share |\n| Use | Shares the incoming partner\'s premium for goodwill among the partners who give up profit | Charges the outgoing partner\'s share of goodwill to the partners who acquire it |',
  sol: 'Contrast the two on when each arises and how it is measured (or what it is used for); any two bases earn the marks.',
  scheme: [['First difference (for example, when it is computed)', 1], ['Second difference (formula or use)', 1]],
}));

const S3S = retire({ Bhanumati: fr(4, 9), Chakrapani: fr(3, 9), Dhriti: fr(2, 9) }, 'Dhriti', { newRatio: [1, 2] }, { allowSacrifice: true });
const S3Sg = S3S.goodwill(90000);
eq([S3S.gain.Bhanumati.toString(), S3S.gain.Chakrapani.toString(), S3Sg.dr, S3Sg.cr], ['-1/9', '1/3', { Chakrapani: 30000 }, { Dhriti: 20000, Bhanumati: 10000 }], 's3_ratio_sacr');
const S3Sj = journal([gwJournal(S3S, S3Sg, "Dhriti's share of goodwill and Bhanumati's sacrifice charged to Chakrapani, the only gaining partner")]);
Q('s3_ratio_sacr', short({
  t: [1, 2], d: 4, c: 'analysis', marks: 3,
  stem: `Bhanumati, Chakrapani and Dhriti share the profits of Jacaranda Tea Chests, an imagined firm at Pasighat, 4 : 3 : 2. Dhriti retires and Bhanumati and Chakrapani agree to share future profits 1 : 2. Goodwill is valued at ${rs(S3Sg.value)}. Show the gain or sacrifice of each continuing partner and pass the journal entry for goodwill.`,
  model: `${nl(ratioNotes(S3S, { newRatio: [1, 2] }))}\n3. Bhanumati gives up 1/9 even though a partner is leaving, so she is compensated along with Dhriti: Dhriti ${inr(S3Sg.value)} × 2/9 = ${rs(S3Sg.cr.Dhriti)}, Bhanumati ${inr(S3Sg.value)} × 1/9 = ${rs(S3Sg.cr.Bhanumati)}; Chakrapani pays ${inr(S3Sg.value)} × 1/3 = ${rs(S3Sg.dr.Chakrapani)}.\n\n${S3Sj.md}`,
  sol: 'Compare old and new shares for every continuing partner; one who loses under the new ratio is credited with the outgoing partner.',
  scheme: [['Sacrifice of Bhanumati and gain of Chakrapani', 1], ['Goodwill amounts', 1], ['Journal entry', 1]],
}));

const NGA = retire({ Elango: fr(5, 12), Farida: fr(4, 12), Govardhan: fr(3, 12) }, 'Govardhan', { take: { Elango: fr(1, 12), Farida: fr(2, 12) } });
const NGAg = NGA.goodwill(96000);
eq([NGA.newInts, NGAg.dr], [[1, 1], { Elango: 8000, Farida: 16000 }], 'n_gain_amount');
Q('n_gain_amount', num({
  t: [1, 2], d: 3, c: 'application', value: NGAg.dr.Farida, unit: '₹',
  stem: `Elango, Farida and Govardhan share the profits of Semal Kinnow Growers, an imagined orchard firm at Ropar, 5 : 4 : 3. On Govardhan's retirement Elango takes 1/12 of the firm's profit from him and Farida takes the remaining 2/12. Goodwill is valued at ${rs(NGAg.value)}. With how much is Farida's capital account debited for goodwill (in ₹)?`,
  sol: `Farida's gain is the 2/12 she acquires, so she is debited ${inr(NGAg.value)} × 2/12 = ${inr(NGAg.dr.Farida)}, that is ${rs(NGAg.dr.Farida)}; Elango is debited ${inr(NGAg.dr.Elango)}.`,
}));

// ================================================================ t02 Goodwill (incl. hidden), revaluation, reserves
Q('m_gw_entry', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: "Haider retires from Tendu Cycle Works, an imagined firm at Pimpri, and no goodwill account is opened. His share of the firm's goodwill is recorded by debiting",
  opts: ["the gaining partners' capital accounts and crediting Haider's capital account", "Haider's capital account and crediting the gaining partners' capital accounts", "a goodwill account and crediting all the partners' capital accounts in the old ratio", "Haider's capital account and crediting a goodwill account"],
  sol: 'Accounting Standard 26 does not allow self-generated goodwill to be raised, so the partners who acquire Haider\'s share pay him through their capital accounts.',
}));

const MGA = { avg: 40000, years: 3 };
const MGAr = retire({ Jitendra: fr(2, 5), Kiranmala: fr(2, 5), Lalitendu: fr(1, 5) }, 'Kiranmala');
const MGAg = MGAr.goodwill(MGA.avg * MGA.years);
eq([MGAg.value, MGAg.cr.Kiranmala, MGAg.dr], [120000, 48000, { Jitendra: 32000, Lalitendu: 16000 }], 'm_gw_amount');
Q('m_gw_amount', mcq({
  t: 2, d: 2, c: 'application',
  stem: `Jitendra, Kiranmala and Lalitendu share the profits of Sheesham Rafting, an imagined adventure firm at Pachmarhi, 2 : 2 : 1. Kiranmala retires. Goodwill is valued at three years' purchase of the average profit of ${rs(MGA.avg)}. Kiranmala's capital account is credited for goodwill with`,
  opts: [rs(MGAg.cr.Kiranmala), rs(MGA.avg), rs(fr(2, 5).of(MGA.avg)), rs(MGAg.value)],
  sol: `Goodwill = ${inr(MGA.avg)} × ${MGA.years} = ${inr(MGAg.value)}; her share = ${inr(MGAg.value)} × 2/5 = ${inr(MGAg.cr.Kiranmala)}, debited to Jitendra and Lalitendu in 2 : 1.`,
}));

const MEX = { book: 30000, old: { Madhukar: fr(3, 6), Nirupama: fr(2, 6), Omvati: fr(1, 6) } };
const MEXs = splitShares(MEX.book, MEX.old);
eq(MEXs, { Madhukar: 15000, Nirupama: 10000, Omvati: 5000 }, 'm_existing_gw');
Q('m_existing_gw', mcq({
  t: 2, d: 2, c: 'application',
  stem: `The balance sheet of Arjuna Cotton Ginners, an imagined firm at Wani, shows goodwill of ${rs(MEX.book)} when Omvati, one of its three partners, retires. Madhukar, Nirupama and Omvati share profits 3 : 2 : 1. The book goodwill is written off by debiting`,
  opts: [`all three partners' capital accounts with ${rs(MEXs.Madhukar)}, ${rs(MEXs.Nirupama)} and ${rs(MEXs.Omvati)}`, "only Madhukar's and Nirupama's capital accounts, in 3 : 2", `Omvati's capital account with the whole ${rs(MEX.book)}`, "the continuing partners' capital accounts in their gaining ratio"],
  sol: `Goodwill already in the books belongs to the firm before the retirement, so every partner, Omvati included, bears it in the old ratio: ${inr(MEX.book)} × 3/6, 2/6 and 1/6.`,
}));

const MHG = { share: fr(1, 4), cap: 115000, settle: 140000 };
const MHGv = fr(MHG.settle - MHG.cap).div(MHG.share).of(1);
eq(MHGv, 100000, 'm_hidden');
Q('m_hidden', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Purnima holds a 1/4 share in Kachnar Spice Haulers, an imagined firm at Ranni. When she retires, her capital after all adjustments other than goodwill stands at ${rs(MHG.cap)}, and the other partners agree to pay her ${rs(MHG.settle)} in full settlement. The goodwill of the firm implied by this settlement is`,
  opts: [rs(MHGv), rs(MHG.settle - MHG.cap), rs(MHG.settle), rs(MHG.cap * 4)],
  sol: `Her share of hidden goodwill = ${inr(MHG.settle)} − ${inr(MHG.cap)} = ${inr(MHG.settle - MHG.cap)}; the firm's goodwill = ${inr(MHG.settle - MHG.cap)} ÷ 1/4 = ${inr(MHGv)}.`,
}));

const MRS = { loss: 18000, old: { Ranjana: fr(4, 9), Shrikant: fr(3, 9), Tithi: fr(2, 9) } };
const MRSs = splitShares(MRS.loss, MRS.old);
eq(MRSs, { Ranjana: 8000, Shrikant: 6000, Tithi: 4000 }, 'm_reval_share');
Q('m_reval_share', mcq({
  t: 2, d: 2, c: 'application',
  stem: `Ranjana, Shrikant and Tithi share the profits of Kaner Roof Tiles, an imagined firm at Ichalkaranji, 4 : 3 : 2. On Tithi's retirement the Revaluation Account shows a loss of ${rs(MRS.loss)}. Tithi's capital account is debited with`,
  opts: [rs(MRSs.Tithi), rs(MRS.loss / 3), 'nothing, because only the continuing partners bear the loss', rs(MRS.loss)],
  sol: `The loss arose while all three were partners, so it is shared 4 : 3 : 2 and Tithi bears ${inr(MRS.loss)} × 2/9 = ${inr(MRSs.Tithi)}.`,
}));

const MWC = { res: 20000, claim: 26000 };
Q('m_wcr', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: `When a partner retires from Akshay Fisheries, an imagined firm at Chhatrapur, its Workmen Compensation Reserve stands at ${rs(MWC.res)} but the claim now admitted is ${rs(MWC.claim)}. The correct treatment is that`,
  opts: [`the whole reserve goes towards the claim and the excess ${rs(MWC.claim - MWC.res)} is debited to the Revaluation Account`, `the reserve of ${rs(MWC.res)} is credited to all the partners and the claim is charged to the retiring partner alone`, `${rs(MWC.claim - MWC.res)} is credited to all the partners' capital accounts in the old ratio`, 'the claim is ignored, because a reserve already exists for it'],
  sol: 'The reserve is used up against the liability; the shortfall is a loss of the firm before the retirement, so it passes through the Revaluation Account to all the partners.',
}));

const MIF = { res: 12000, book: 80000, market: 74000 };
const MIFbal = MIF.res - (MIF.book - MIF.market);
eq(MIFbal, 6000, 'm_ifr');
Q('m_ifr', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Sugandh Rubber Traders, an imagined firm at Pathanamthitta, carries an Investment Fluctuation Reserve of ${rs(MIF.res)} against investments of ${rs(MIF.book)}, whose market value on a partner's retirement is ${rs(MIF.market)}. After meeting the fall, the reserve leaves`,
  opts: [`${rs(MIFbal)} to be credited to all the partners' capital accounts in the old ratio`, `${rs(MIF.res)} to be credited to all the partners, the fall being ignored`, `${rs(MIFbal)} to be debited to the Revaluation Account`, `${rs(MIFbal)} to be credited only to the continuing partners`],
  sol: `The fall of ${inr(MIF.book - MIF.market)} is met from the reserve; the balance ${inr(MIF.res)} − ${inr(MIF.book - MIF.market)} = ${inr(MIFbal)} is an accumulated profit of all the partners.`,
}));

Q('m_dre', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'At the time a partner retires from Swarnim Packaging, an imagined firm at Badlapur, its balance sheet shows an advertisement suspense account on the assets side. This balance is',
  opts: ["debited to all the partners' capital accounts, the retiring partner included, in the old ratio", "debited to the continuing partners' capital accounts in their gaining ratio", 'carried forward unchanged in the balance sheet of the new firm', 'credited to the Revaluation Account'],
  sol: 'Deferred revenue expenditure is a past loss of the old firm, so it is written off against every partner in the old ratio before the retiring partner is settled.',
}));

Q('m_why_reval', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Before settling with a retiring partner, the partners of Ratnakar Fish Meal, an imagined firm at Malvan, revalue the firm\'s assets and liabilities. The main purpose is',
  opts: ['to give the retiring partner his share of the gains or losses in value that arose while he was a partner', 'to raise a goodwill account in the books at its full value', 'to reduce the income tax payable by the continuing partners', 'to fix the new profit-sharing ratio of the continuing partners'],
  sol: 'Book values may be out of date; revaluing them makes sure the outgoing partner neither gains nor loses from changes in value up to the date he leaves.',
}));

Q('tf_reval_out', tf({
  t: 2, d: 1, c: 'understanding', ans: true,
  stem: 'True or false? When Vasanti retires from Nakshatra Cashew Exporters, an imagined firm at Ponda, the profit on revaluation is shared by all the partners, Vasanti included, in their old ratio.',
  sol: 'The rise in values took place while she was a partner, so she takes her old share of the profit before her account is settled.',
}));

Q('tf_hidden_gw', tf({
  t: 2, d: 2, c: 'understanding', ans: false,
  stem: "True or false? If the continuing partners of Dhruva Silk Reelers, an imagined firm, agree to pay a retiring partner more than the balance of his capital account after all adjustments, the excess is credited to the continuing partners' capital accounts.",
  sol: 'The excess is the retiring partner\'s share of hidden goodwill: it is credited to him and debited to the gaining partners in their gaining ratio.',
}));

const NHG = { share: fr(1, 5), cap: 86000, settle: 102000 };
const NHGv = fr(NHG.settle - NHG.cap).div(NHG.share).of(1);
eq(NHGv, 80000, 'n_hidden_gw');
Q('n_hidden_gw', num({
  t: 2, d: 3, c: 'application', value: NHGv, unit: '₹',
  stem: `Yeshwant, who has a 1/5 share in Shukra Jaggery Mill, an imagined firm at Ichalkaranji, retires. His capital after revaluation and reserves is ${rs(NHG.cap)}, and his partners settle with him for ${rs(NHG.settle)}. What is the goodwill of the firm implied by this settlement (in ₹)?`,
  sol: `His share of goodwill = ${inr(NHG.settle)} − ${inr(NHG.cap)} = ${inr(NHG.settle - NHG.cap)}; firm's goodwill = ${inr(NHG.settle - NHG.cap)} ÷ 1/5 = ${inr(NHGv)}, that is ${rs(NHGv)}.`,
}));

const NRO = { building: 30000, stock: 9000, prov: 3000, old: { Abhijit: fr(1, 3), Bratati: fr(1, 3), Zubeida: fr(1, 3) } };
const NROnet = NRO.building - NRO.stock - NRO.prov;
const NROs = splitShares(NROnet, NRO.old);
eq([NROnet, NROs.Zubeida], [18000, 6000], 'n_reval_out');
Q('n_reval_out', num({
  t: 2, d: 2, c: 'application', value: NROs.Zubeida, unit: '₹',
  stem: `Abhijit, Bratati and Zubeida are equal partners in Ashwini Jute Twine, an imagined firm at Serampore. On Zubeida's retirement the building is raised by ${rs(NRO.building)}, stock is reduced by ${rs(NRO.stock)} and a provision of ${rs(NRO.prov)} is made for doubtful debts. How much revaluation profit is credited to Zubeida (in ₹)?`,
  sol: `Revaluation profit = ${inr(NRO.building)} − ${inr(NRO.stock)} − ${inr(NRO.prov)} = ${inr(NROnet)}; Zubeida's one-third = ${inr(NROs.Zubeida)}, that is ${rs(NROs.Zubeida)}.`,
}));

Q('fb_reval', fb({
  t: 2, d: 1, c: 'recall',
  stem: "On Sumitra's retirement from Revati Coal Briquettes, an imagined firm, a fall in the value of machinery is ___ to the Revaluation Account, and the resulting profit or loss is shared by ___ the partners in their old ratio.",
  acc: [['debited', 'debit'], ['all']],
  sol: 'A fall in an asset is a loss, so it is debited; the result belongs to all the partners, Sumitra included, in the old ratio.',
}));

Q('ar_reserve', ar({
  t: 2, d: 2, c: 'understanding', key: 'a',
  a: "When Eshwari retires from Anuradha Hill Lodges, an imagined resort firm, the general reserve in its books is credited to all the partners' capital accounts, Eshwari's included, in their old ratio.",
  r: 'The reserve was built up out of profits earned while Eshwari was a partner.',
  sol: 'Both are true, and R is why A holds: profits kept back while she was a partner belong to her as much as to the others.',
}));

Q('ar_existing', ar({
  t: 2, d: 3, c: 'understanding', key: 'c',
  a: 'Goodwill standing in the books of Jyeshtha Grape Growers, an imagined firm, when a partner retires is written off among all the partners in their old ratio.',
  r: 'Accounting Standard 26 requires such goodwill to be brought up to its current value and kept in the books after the retirement.',
  sol: 'A is true. R is false: the standard does not allow self-generated goodwill to be carried, so the book figure is written off and the retiring partner\'s share is adjusted through the gaining partners instead.',
}));

Q('ar_hidden', ar({
  t: 2, d: 3, c: 'analysis', key: 'd',
  a: 'When Mrigashira Pulse Mills, an imagined firm, pays a retiring partner exactly the balance of his capital account after all adjustments, hidden goodwill arises.',
  r: "Hidden goodwill on retirement is the amount by which the agreed settlement exceeds the retiring partner's capital after all other adjustments.",
  sol: 'R is the correct meaning of hidden goodwill on retirement, and it shows why A is false: a settlement equal to his adjusted capital leaves no excess at all.',
}));

Q('match_reval', match({
  t: 2, d: 2, c: 'understanding', marks: 2,
  stem: "Match each item met on Faiyaz's retirement from Punarvasu Rice Mills, an imagined firm, with the way it is recorded.",
  pairs: [
    ['Fall in the value of the plant', 'Debit side of the Revaluation Account'],
    ['An investment never recorded, now brought into the books', 'Credit side of the Revaluation Account'],
    ['General reserve in the balance sheet', "Credited to all partners' capital accounts in the old ratio"],
    ["Faiyaz's share of goodwill", "Debited to the gaining partners' capital accounts"],
  ],
  sol: 'Changes in value pass through the Revaluation Account; reserves go straight to all partners; goodwill is paid for by the partners who acquire his share.',
}));

const SGE = retire({ Gitanjali: fr(1, 2), Harpreet: fr(1, 4), Ishani: fr(1, 4) }, 'Ishani', { newRatio: [3, 2] });
const SGEg = SGE.goodwill(100000);
eq([SGE.gainInts, SGEg.cr, SGEg.dr], [[2, 3], { Ishani: 25000 }, { Gitanjali: 10000, Harpreet: 15000 }], 's2_gw_entries');
const SGEj = journal([gwJournal(SGE, SGEg, "Ishani's share of goodwill adjusted through the gaining partners in 2 : 3")]);
Q('s2_gw_entries', short({
  t: [1, 2], d: 2, c: 'application', marks: 2,
  stem: `Gitanjali, Harpreet and Ishani share the profits of Hasta Incense Works, an imagined firm at Purola, 2 : 1 : 1. Ishani retires, and Gitanjali and Harpreet will share future profits 3 : 2. Goodwill is valued at ${rs(SGEg.value)}. Calculate the gaining ratio and pass the journal entry for goodwill.`,
  model: `${nl(ratioNotes(SGE, { newRatio: [3, 2] }))}\n3. Ishani's share = ${inr(SGEg.value)} × 1/4 = ${rs(SGEg.cr.Ishani)}, charged ${ratioStr(SGE.gainInts)}: ${list(SGEg.dr)}.\n\n${SGEj.md}`,
  sol: 'Work out the gains before the entry; the stated new ratio does not give the gaining ratio directly.',
  scheme: [[`Gaining ratio ${ratioStr(SGE.gainInts)}`, 1], ['Journal entry for goodwill', 1]],
}));

const SHD = retire({ Jogendra: fr(1, 3), Kanchan: fr(1, 3), Leelawati: fr(1, 3) }, 'Jogendra');
const SHDx = { cap: 130000, settle: 154000 };
const SHDv = fr(SHDx.settle - SHDx.cap).div(SHD.outShare).of(1);
const SHDg = SHD.goodwill(SHDv);
eq([SHDv, SHDg.cr.Jogendra, SHDg.dr], [72000, 24000, { Kanchan: 12000, Leelawati: 12000 }], 's2_hidden');
const SHDj = journal([gwJournal(SHD, SHDg, "Jogendra's share of hidden goodwill charged to Kanchan and Leelawati in 1 : 1")]);
Q('s2_hidden', short({
  t: 2, d: 3, c: 'application', marks: 2,
  stem: `Jogendra, Kanchan and Leelawati are equal partners in Magha Tea Packers, an imagined firm at Hojai. Jogendra retires; after all other adjustments his capital stands at ${rs(SHDx.cap)}, and Kanchan and Leelawati agree to pay him ${rs(SHDx.settle)} in full settlement. Find the firm's hidden goodwill and pass the entry for Jogendra's share of it.`,
  model: `1. Jogendra's share of goodwill = ${inr(SHDx.settle)} − ${inr(SHDx.cap)} = ${rs(SHDg.cr.Jogendra)}; firm's goodwill = ${inr(SHDg.cr.Jogendra)} ÷ 1/3 = **${rs(SHDv)}**.\n2. Kanchan and Leelawati continue in their old ratio 1 : 1, so each is charged ${rs(SHDg.dr.Kanchan)}.\n\n${SHDj.md}`,
  sol: 'The settlement exceeds his adjusted capital only because it includes his share of goodwill; scale that share up to the whole firm.',
  scheme: [['Hidden goodwill of the firm', 1], ['Journal entry', 1]],
}));

const SWI = { old: { Mukta: fr(1, 3), Nachiket: fr(1, 3), Omana: fr(1, 3) }, wcr: 24000, claim: 15000, ifr: 10000, fall: 4000 };
const SWIw = splitShares(SWI.wcr - SWI.claim, SWI.old);
const SWIi = splitShares(SWI.ifr - SWI.fall, SWI.old);
eq([SWIw, SWIi], [{ Mukta: 3000, Nachiket: 3000, Omana: 3000 }, { Mukta: 2000, Nachiket: 2000, Omana: 2000 }], 's2_wcr_ifr');
const SWIj = journal([
  { dr: [['Workmen Compensation Reserve A/c', SWI.wcr]], cr: [['Workmen Compensation Claim A/c', SWI.claim], ...Object.entries(SWIw).map(([n, x]) => [C(n), x])], nar: 'claim provided from the reserve and the balance shared equally' },
  { dr: [['Investment Fluctuation Reserve A/c', SWI.ifr]], cr: [['Investments A/c', SWI.fall], ...Object.entries(SWIi).map(([n, x]) => [C(n), x])], nar: 'fall in investments met from the reserve and the balance shared equally' },
]);
Q('s2_wcr_ifr', short({
  t: 2, d: 3, c: 'application', marks: 2,
  stem: `Mukta, Nachiket and Omana are equal partners in Shravan Areca Traders, an imagined firm at Ranni. On Mukta's retirement the books show a Workmen Compensation Reserve of ${rs(SWI.wcr)}, against which a claim of ${rs(SWI.claim)} is admitted, and an Investment Fluctuation Reserve of ${rs(SWI.ifr)}, while the investments have fallen by ${rs(SWI.fall)}. Journalise the treatment of the two reserves.`,
  model: SWIj.md,
  sol: 'Each special reserve first meets its own claim or fall; only what is left over belongs to the partners, all three of them.',
  scheme: [['Workmen Compensation Reserve entry', 1], ['Investment Fluctuation Reserve entry', 1]],
}));

const SGX = retire({ Rajkumari: fr(3, 6), Satyen: fr(2, 6), Tamanna: fr(1, 6) }, 'Satyen');
const SGXx = { book: 36000, value: 108000 };
const SGXwo = splitShares(SGXx.book, SGX.old);
const SGXg = SGX.goodwill(SGXx.value);
eq([SGX.gainInts, SGXwo, SGXg.cr, SGXg.dr], [[3, 1], { Rajkumari: 18000, Satyen: 12000, Tamanna: 6000 }, { Satyen: 36000 }, { Rajkumari: 27000, Tamanna: 9000 }], 's3_gw_existing');
const SGXj = journal([
  { dr: Object.entries(SGXwo).map(([n, x]) => [C(n), x]), cr: [['Goodwill A/c', SGXx.book]], nar: 'goodwill in the books written off among all the partners in 3 : 2 : 1' },
  gwJournal(SGX, SGXg, "Satyen's share of goodwill charged to Rajkumari and Tamanna in their gaining ratio 3 : 1"),
]);
Q('s3_gw_existing', short({
  t: 2, d: 3, c: 'application', marks: 3,
  stem: `Rajkumari, Satyen and Tamanna share the profits of Dhanishta Apple Packers, an imagined firm at Purola, 3 : 2 : 1, and their books show goodwill of ${rs(SGXx.book)}. Satyen retires; nothing is agreed about future shares. The firm's goodwill is now valued at ${rs(SGXx.value)}. Pass the journal entries for goodwill.`,
  model: `${nl([...ratioNotes(SGX), `Satyen's share = ${inr(SGXx.value)} × 2/6 = ${rs(SGXg.cr.Satyen)}: Rajkumari ${rs(SGXg.dr.Rajkumari)}, Tamanna ${rs(SGXg.dr.Tamanna)}.`])}\n\n${SGXj.md}`,
  sol: 'Clear the book goodwill against all three partners in the old ratio first; then deal with the retiring share at the new value.',
  scheme: [['Book goodwill written off 3 : 2 : 1', 1], ['Gaining ratio and amounts', 1], ['Entry for Satyen\'s share', 1]],
}));

const SRV = { old: { Udita: fr(2, 5), Vallabh: fr(2, 5), Wajida: fr(1, 5) }, land: 40000, printer: 4000, stock: 6000, debtors: 70000, wages: 2500 };
const SRVprov = fr(5, 100).of(SRV.debtors);
const SRVa = revaluation([['Land A/c (increase)', SRV.land], ['Printer A/c (unrecorded asset)', SRV.printer], ['Stock A/c (decrease)', -SRV.stock], ['Provision for Doubtful Debts A/c', -SRVprov], ['Outstanding Wages A/c', -SRV.wages]], SRV.old);
eq([SRVprov, SRVa.net, SRVa.parts], [3500, 32000, { Udita: 12800, Vallabh: 12800, Wajida: 6400 }], 's3_reval');
Q('s3_reval', short({
  t: 2, d: 3, c: 'application', marks: 3,
  stem: `Udita, Vallabh and Wajida share the profits of Mayur Agro Implements, an imagined firm at Gokak, 2 : 2 : 1. On Wajida's retirement it is agreed that: land is raised by ${rs(SRV.land)}; a printer worth ${rs(SRV.printer)}, never recorded, is brought into the books; stock is reduced by ${rs(SRV.stock)}; a 5% provision is made on debtors of ${rs(SRV.debtors)}; and outstanding wages of ${rs(SRV.wages)} are recorded. Prepare the Revaluation Account.`,
  model: `**Working note:** provision = 5% of ${inr(SRV.debtors)} = ${rs(SRVprov)}; profit = ${inr(SRV.land + SRV.printer)} − ${inr(SRV.stock + SRVprov + SRV.wages)} = ${rs(SRVa.net)}, shared 2 : 2 : 1.\n\n**Revaluation Account**\n\n${SRVa.md}`,
  sol: 'Gains on the credit side, losses on the debit side; the balance goes to all three partners, Wajida included.',
  scheme: [['Losses on the debit side', 1], ['Gains on the credit side', 1], ['Profit shared 2 : 2 : 1', 1]],
}));

const SRS = { old: { Arunima: fr(5, 10), Bhimanna: fr(3, 10), Chandrika: fr(2, 10) }, gr: 40000, pl: 15000, adv: 10000 };
const SRSg = splitShares(SRS.gr, SRS.old);
const SRSp = splitShares(SRS.pl, SRS.old);
const SRSa = splitShares(SRS.adv, SRS.old);
eq([SRSg, SRSp, SRSa], [{ Arunima: 20000, Bhimanna: 12000, Chandrika: 8000 }, { Arunima: 7500, Bhimanna: 4500, Chandrika: 3000 }, { Arunima: 5000, Bhimanna: 3000, Chandrika: 2000 }], 's3_reserves');
const SRSj = journal([
  { dr: [['General Reserve A/c', SRS.gr]], cr: Object.entries(SRSg).map(([n, x]) => [C(n), x]), nar: 'general reserve credited to all the partners in 5 : 3 : 2' },
  { dr: Object.entries(SRSp).map(([n, x]) => [C(n), x]), cr: [['Profit and Loss A/c', SRS.pl]], nar: 'debit balance of profit and loss written off in 5 : 3 : 2' },
  { dr: Object.entries(SRSa).map(([n, x]) => [C(n), x]), cr: [['Advertisement Suspense A/c', SRS.adv]], nar: 'deferred advertisement expenditure written off in 5 : 3 : 2' },
]);
Q('s3_reserves', short({
  t: 2, d: 3, c: 'application', marks: 3,
  stem: `Arunima, Bhimanna and Chandrika share profits 5 : 3 : 2 in Hansa Coir Rope Makers, an imagined firm at Karunagappally. When Chandrika retires, the balance sheet shows a general reserve of ${rs(SRS.gr)}, a debit balance of ${rs(SRS.pl)} in the profit and loss account and an advertisement suspense account of ${rs(SRS.adv)}. Pass the journal entries.`,
  model: SRSj.md,
  sol: 'Accumulated profits are credited and accumulated losses debited, each to all three partners in the old ratio.',
  scheme: [['General reserve', 1], ['Profit and loss debit balance', 1], ['Advertisement suspense', 1]],
}));

Q('s3_why', short({
  t: 2, d: 2, c: 'understanding', marks: 3,
  stem: 'A junior accountant at Tamra Copperware, an imagined firm at Tirupati, asks why three steps are taken when a partner retires. Explain briefly why (a) the assets and liabilities are revalued, (b) the general reserve is shared among all the partners, and (c) the continuing partners compensate the retiring partner for goodwill.',
  model: '**(a)** Book values may differ from current values. The gain or loss in value arose while the retiring partner was a member, so revaluation gives him his share and keeps the continuing partners from bearing or enjoying it later.\n\n**(b)** The reserve consists of profits kept back in earlier years while all the partners, including the retiring one, shared profits; it is therefore their common property in the old ratio.\n\n**(c)** The firm\'s reputation, built partly by the retiring partner, will earn future profits for the continuing partners alone. Those who gain his share pay for it in their gaining ratio; no goodwill account is raised under Accounting Standard 26.',
  sol: 'Each step protects the retiring partner\'s right to what the firm earned or built up while he was a partner.',
  scheme: [['(a) Reason for revaluation', 1], ['(b) Reason for sharing the reserve', 1], ['(c) Reason for goodwill compensation', 1]],
}));

const LGR = retire({ Debashis: fr(3, 6), Eshita: fr(2, 6), Firdaus: fr(1, 6) }, 'Debashis', { newRatio: [3, 2] });
const LGRg = LGR.goodwill(180000);
const LGRx = { building: 30000, cred: 5000, mach: 12000, prov: 2000 };
const LGRr = revaluation([['Building A/c (increase)', LGRx.building], ['Creditors A/c (not payable)', LGRx.cred], ['Machinery A/c (decrease)', -LGRx.mach], ['Provision for Doubtful Debts A/c', -LGRx.prov]], LGR.old);
eq([LGR.gainInts, LGRg.dr, LGRr.net, LGRr.parts], [[8, 7], { Eshita: 48000, Firdaus: 42000 }, 21000, { Debashis: 10500, Eshita: 7000, Firdaus: 3500 }], 'l5_gw_reval');
const LGRj = journal([gwJournal(LGR, LGRg, "Debashis's share of goodwill charged to Eshita and Firdaus in their gaining ratio 8 : 7")]);
Q('l5_gw_reval', long({
  t: [1, 2], d: 3, c: 'application', marks: 5,
  stem: `Debashis, Eshita and Firdaus share the profits of Saras Rice Flakes, an imagined firm at Sitamarhi, 3 : 2 : 1. Debashis retires, and Eshita and Firdaus agree to share future profits 3 : 2. Goodwill is valued at ${rs(LGRg.value)}. The building is to be raised by ${rs(LGRx.building)}, creditors of ${rs(LGRx.cred)} are found to be no longer payable, machinery is to be reduced by ${rs(LGRx.mach)}, and a provision of ${rs(LGRx.prov)} is to be made for doubtful debts.\n\n(a) Calculate the gaining ratio and pass the journal entry for goodwill. [2]\n\n(b) Prepare the Revaluation Account. [3]`,
  model: `**(a)**\n${nl(ratioNotes(LGR, { newRatio: [3, 2] }))}\n3. Debashis's share = ${inr(LGRg.value)} × 1/2 = ${rs(LGRg.cr.Debashis)}: Eshita ${rs(LGRg.dr.Eshita)}, Firdaus ${rs(LGRg.dr.Firdaus)}.\n\n${LGRj.md}\n\n**(b) Revaluation Account**\n\n${LGRr.md}`,
  sol: 'The gaining ratio comes from comparing new and old shares (8/30 and 7/30); the creditors written back are a gain like the rise in the building.',
  scheme: [['(a) Gaining ratio 8 : 7', 1], ['(a) Goodwill entry', 1], ['(b) Debit side', 1], ['(b) Credit side', 1], ['(b) Profit shared 3 : 2 : 1', 1]],
}));

// ================================================================ t03 Profit till the date of death
const MTB = timeBasis({ profit: 160000, months: 3, share: fr(1, 4) });
eq(MTB, { period: 40000, share: 10000 }, 'm_time_basis');
Q('m_time_basis', mcq({
  t: 3, d: 2, c: 'application',
  stem: `Gajanan, who had a 1/4 share in Chakor Fishnets, an imagined firm at Chhatrapur, dies on 30 June 2026. The firm's books close every 31 March and its profit for the last year was ${rs(160000)}. On the time basis, his share of profit up to the date of death is`,
  opts: [rs(MTB.share), rs(fr(1, 4).of(160000)), rs(MTB.share * 2), rs(MTB.share * 3)],
  sol: `1 April to 30 June is 3 months: ${inr(160000)} × 3/12 × 1/4 = ${inr(MTB.share)}.`,
}));

const MTO = turnoverBasis({ profit: 200000, sales: 2000000, salesTill: 500000, share: fr(2, 5) });
eq([MTO.pct, MTO.period, MTO.share], [10, 50000, 20000], 'm_turnover');
Q('m_turnover', mcq({
  t: 3, d: 3, c: 'application',
  stem: `Hanumanth had a 2/5 share in Bulbul Sugar Traders, an imagined firm at Gokak. Last year the firm earned ${rs(200000)} on sales of ${rs(2000000)}. He dies after sales of ${rs(500000)} have been made in the current year. On the turnover basis, his share of profit till death is`,
  opts: [rs(MTO.share), rs(MTO.period), rs(fr(2, 5).of(200000)), rs(30000)],
  sol: `Rate of profit = ${inr(200000)} ÷ ${inr(2000000)} = ${MTO.pct}% of sales; profit to death = ${MTO.pct}% of ${inr(500000)} = ${inr(MTO.period)}; his 2/5 = ${inr(MTO.share)}.`,
}));

Q('m_suspense', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: "Itishree, a partner in Maina Forest Produce, an imagined firm at Barmer, dies in the middle of the accounting year. Her share of profit till death is to be credited to her without disturbing the continuing partners' accounts. The entry is",
  opts: ["Profit and Loss Suspense A/c Dr. To Itishree's Capital A/c", "Itishree's Capital A/c Dr. To Profit and Loss Suspense A/c", "Profit and Loss A/c Dr. To continuing partners' Capital A/cs", "Itishree's Executor's A/c Dr. To Profit and Loss Suspense A/c"],
  sol: "The suspense account holds her share until the year's profit is known; it is closed when that profit is divided at the year end.",
}));

Q('tf_suspense', tf({
  t: [3, 6], d: 2, c: 'understanding', ans: false,
  stem: "True or false? If Sarus Hosiery, an imagined firm at Ropar, draws up a balance sheet on the date of a partner's death, the Profit and Loss Suspense Account debited with his share of profit appears on the liabilities side.",
  sol: 'The suspense account has a debit balance, the amount to be recovered from the year\'s profit, so it is shown on the assets side.',
}));

Q('ar_suspense', ar({
  t: 3, d: 3, c: 'understanding', key: 'c',
  a: 'When a partner of Pital Lamp Works, an imagined firm, dies in mid-year, his share of profit till death may be credited to his capital account through a Profit and Loss Suspense Account.',
  r: 'The Profit and Loss Suspense Account is a sum the continuing partners must pay at once from their private funds.',
  sol: 'A is true. R is false: the suspense account is closed out of the profit of the year when it is divided; the continuing partners pay nothing privately.',
}));

const NTA = { profits: [180000, 210000, 240000], months: 5, share: fr(1, 5) };
const NTAavg = average(NTA.profits);
const NTAt = timeBasis({ profit: NTAavg, months: NTA.months, share: NTA.share });
eq([NTAavg, NTAt], [210000, { period: 87500, share: 17500 }], 'n_time_avg');
Q('n_time_avg', num({
  t: 3, d: 3, c: 'application', value: NTAt.share, unit: '₹',
  stem: `Kamalnath, a partner with a 1/5 share in Papiha Cashew Processors, an imagined firm at Ponda, dies on 31 August 2026; the books close on 31 March. His deed fixes his share of profit till death on the average profit of the last three years, which were ${NTA.profits.map(rs).join(', ')}. What is his share (in ₹)?`,
  sol: `Average = (${NTA.profits.map(inr).join(' + ')}) ÷ 3 = ${inr(NTAavg)}; 1 April to 31 August is 5 months: ${inr(NTAavg)} × 5/12 = ${inr(NTAt.period)}; his 1/5 = ${inr(NTAt.share)}, that is ${rs(NTAt.share)}.`,
}));

const NTO = turnoverBasis({ profit: 180000, sales: 1200000, salesTill: 400000, share: fr(3, 10) });
eq([NTO.pct, NTO.period, NTO.share], [15, 60000, 18000], 'n_turnover');
Q('n_turnover', num({
  t: 3, d: 3, c: 'application', value: NTO.share, unit: '₹',
  stem: `Laxmidhar had a 3/10 share in Jugnu Salt Works, an imagined firm at Ponneri. Last year its sales were ${rs(1200000)} and its profit ${rs(180000)}. From 1 April to the date of his death the firm sold goods worth ${rs(400000)}. On the turnover basis, what is Laxmidhar's share of profit till death (in ₹)?`,
  sol: `Rate = ${inr(180000)} ÷ ${inr(1200000)} = ${NTO.pct}%; profit to death = ${NTO.pct}% of ${inr(400000)} = ${inr(NTO.period)}; his share = ${inr(NTO.period)} × 3/10 = ${inr(NTO.share)}, that is ${rs(NTO.share)}.`,
}));

const STM = timeBasis({ profit: 144000, months: 5, share: fr(1, 3) });
eq(STM, { period: 60000, share: 20000 }, 's2_time');
const STMj = journal([{ dr: [['Profit and Loss Suspense A/c', STM.share]], cr: [[C('Manikandan'), STM.share]], nar: "Manikandan's share of profit from 1 April to 31 August 2026 credited to him" }]);
Q('s2_time', short({
  t: 3, d: 2, c: 'application', marks: 2,
  stem: `Manikandan, a partner with a 1/3 share in Titli Pepper Growers, an imagined firm at Ranni, dies on 31 August 2026. The books close on 31 March, and last year's profit was ${rs(144000)}. Calculate his share of profit till death on the time basis and journalise it through the Profit and Loss Suspense Account.`,
  model: `1 April to 31 August = 5 months; profit for the period = ${inr(144000)} × 5/12 = ${rs(STM.period)}; Manikandan's share = ${inr(STM.period)} × 1/3 = **${rs(STM.share)}**.\n\n${STMj.md}`,
  sol: 'Count the months from the start of the year to the date of death, take that fraction of the base profit, then his share of it.',
  scheme: [['Share of profit till death', 1], ['Journal entry', 1]],
}));

const STG = retire({ Nayantara: fr(2, 5), Parikshit: fr(2, 5), Rudrani: fr(1, 5) }, 'Rudrani');
const STGt = turnoverBasis({ profit: 225000, sales: 1500000, salesTill: 1000000, share: STG.outShare });
const STGs = Object.fromEntries(STG.gainers.map((n, i) => [n, (STGt.share * STG.gainInts[i]) / sum(STG.gainInts)]));
eq([STGt.pct, STGt.period, STGt.share, STGs], [15, 150000, 30000, { Nayantara: 15000, Parikshit: 15000 }], 's3_turnover_gainers');
const STGj = journal([{ dr: Object.entries(STGs).map(([n, x]) => [C(n), x]), cr: [[C('Rudrani'), STGt.share]], nar: "Rudrani's share of profit till death charged to the continuing partners in their gaining ratio 1 : 1" }]);
Q('s3_turnover_gainers', short({
  t: 3, d: 4, c: 'application', marks: 3,
  stem: `Nayantara, Parikshit and Rudrani share the profits of Indradhanush Banana Ripening, an imagined firm at Wani, 2 : 2 : 1. Rudrani dies on 31 October 2026. Last year the firm's sales were ${rs(1500000)} and its profit ${rs(225000)}; sales from 1 April to 31 October 2026 were ${rs(1000000)}. Her share of profit till death is to be found on the turnover basis and charged to the continuing partners. Calculate it and pass the journal entry.`,
  model: `1. Rate of profit = ${inr(225000)} ÷ ${inr(1500000)} = ${STGt.pct}% of sales.\n2. Profit to the date of death = ${STGt.pct}% of ${inr(1000000)} = ${rs(STGt.period)}; Rudrani's 1/5 = **${rs(STGt.share)}**.\n3. Nayantara and Parikshit gain her share in their old ratio 1 : 1, so each is debited ${rs(STGs.Nayantara)}.\n\n${STGj.md}`,
  sol: 'Apply last year\'s rate of profit on sales to this year\'s sales up to death; charge the result to the gainers when no suspense account is used.',
  scheme: [['Rate of profit and profit to the date of death', 1], ["Rudrani's share", 1], ['Entry through the gaining partners', 1]],
}));

const LDP = retire({ Trilochan: fr(2, 4), Vishakha: fr(1, 4), Sahdev: fr(1, 4) }, 'Sahdev');
const LDPx = { profit: 180000, sales: 1800000, salesTill: 720000, months: 4, cap: 120000, gr: 48000, ioc: 6, drawings: 9000 };
const LDPt = timeBasis({ profit: LDPx.profit, months: LDPx.months, share: LDP.outShare });
const LDPo = turnoverBasis({ profit: LDPx.profit, sales: LDPx.sales, salesTill: LDPx.salesTill, share: LDP.outShare });
const LDPg = LDP.goodwill(120000);
const LDPgr = LDP.outShare.of(LDPx.gr);
const LDPi = fr(LDPx.ioc * LDPx.months, 1200).of(LDPx.cap);
const LDPa = tAccount(
  [['Drawings A/c', LDPx.drawings], ["Sahdev's Executor's A/c", LDPx.cap + LDPgr + LDPg.cr.Sahdev + LDPo.share + LDPi - LDPx.drawings]],
  [['Balance b/d', LDPx.cap], ['General Reserve A/c', LDPgr], ...Object.entries(LDPg.dr).map(([n, x]) => [C(n), x]), ['Profit and Loss Suspense A/c', LDPo.share], ['Interest on Capital A/c', LDPi]],
);
eq([LDPt.share, LDPo.share, LDPg.dr, LDPi, LDPa.total - LDPx.drawings], [15000, 18000, { Trilochan: 20000, Vishakha: 10000 }, 2400, 173400], 'l5_death_profit');
Q('l5_death_profit', long({
  t: [3, 5], d: 4, c: 'analysis', marks: 5,
  stem: `Trilochan, Vishakha and Sahdev share the profits of Kevda Mint Distillers, an imagined firm at Badaun, 2 : 1 : 1. Sahdev dies on 31 July 2026; the books close on 31 March. Last year the firm made a profit of ${rs(LDPx.profit)} on sales of ${rs(LDPx.sales)}, and sales from 1 April to 31 July 2026 were ${rs(LDPx.salesTill)}. Sahdev's capital on 1 April 2026 was ${rs(LDPx.cap)}; the general reserve is ${rs(LDPx.gr)}; goodwill is valued at ${rs(LDPg.value)}; interest on capital is allowed at ${LDPx.ioc}% per annum; his drawings to the date of death were ${rs(LDPx.drawings)}. The deed settles profit till death on the turnover basis, through Profit and Loss Suspense.\n\n(a) Calculate Sahdev's share of profit till death on the time basis and on the turnover basis. [2]\n\n(b) Prepare Sahdev's Capital Account. [3]`,
  model: `**(a)** Time basis: ${inr(LDPx.profit)} × 4/12 × 1/4 = ${rs(LDPt.share)}. Turnover basis: rate = ${inr(LDPx.profit)} ÷ ${inr(LDPx.sales)} = ${LDPo.pct}%; profit to death = ${LDPo.pct}% of ${inr(LDPx.salesTill)} = ${inr(LDPo.period)}; his 1/4 = **${rs(LDPo.share)}** (used, as the deed requires).\n\n**(b)** Working notes: general reserve ${inr(LDPx.gr)} × 1/4 = ${rs(LDPgr)}; goodwill ${inr(LDPg.value)} × 1/4 = ${rs(LDPg.cr.Sahdev)}, charged to Trilochan and Vishakha in their gaining ratio 2 : 1; interest on capital ${inr(LDPx.cap)} × ${LDPx.ioc}% × 4/12 = ${rs(LDPi)}.\n\n**Sahdev's Capital Account**\n\n${LDPa.md}`,
  sol: 'The two bases differ because the firm sold more in these four months than a time share of last year would suggest; the deed decides which one is credited.',
  scheme: [['(a) Time basis', 1], ['(a) Turnover basis', 1], ['(b) Credits: reserve, goodwill, profit, interest', 2], ["(b) Drawings and transfer to the executor's account", 1]],
}));

// ================================================================ t04 Adjustment of capitals of continuing partners
const MCT = retire({ Yugandhar: fr(3, 10), Zohra: fr(2, 10), Bansilal: fr(5, 10) }, 'Bansilal', { newRatio: [3, 2] });
const MCTx = { total: 250000, Yugandhar: 162000, Zohra: 95000 };
const MCTreq = Object.fromEntries(MCT.names.map((n) => [n, MCT.newShares[n].of(MCTx.total)]));
eq(MCTreq, { Yugandhar: 150000, Zohra: 100000 }, 'm_cap_total');
Q('m_cap_total', mcq({
  t: 4, d: 3, c: 'application',
  stem: `After Bansilal retires from Hiramani Willow Bats, an imagined firm at Akhnoor, Yugandhar and Zohra continue in the ratio 3 : 2 and fix the total capital of the firm at ${rs(MCTx.total)}, in that ratio. Their capitals after all adjustments are ${rs(MCTx.Yugandhar)} and ${rs(MCTx.Zohra)}. To bring his capital in line, Yugandhar`,
  opts: [`withdraws ${rs(MCTx.Yugandhar - MCTreq.Yugandhar)}`, `brings in ${rs(MCTx.Yugandhar - MCTreq.Yugandhar)}`, `brings in ${rs(MCTreq.Zohra - MCTx.Zohra)}`, `withdraws ${rs(MCTx.Yugandhar - 100000)}`],
  sol: `Required capital = ${inr(MCTx.total)} × 3/5 = ${inr(MCTreq.Yugandhar)}; he has ${inr(MCTx.Yugandhar)}, so the surplus ${inr(MCTx.Yugandhar - MCTreq.Yugandhar)} is paid out to him (Zohra brings ${inr(MCTreq.Zohra - MCTx.Zohra)}).`,
}));

const NCB = { due: 120000, bank: 40000, min: 20000, cur: { Dineshwar: 210000, Eshana: 130000 }, sh: { Dineshwar: fr(3, 5), Eshana: fr(2, 5) } };
const NCBneed = NCB.due + NCB.min - NCB.bank;
const NCBtotal = sum(Object.values(NCB.cur)) + NCBneed;
const NCBbring = Object.fromEntries(Object.keys(NCB.cur).map((n) => [n, NCB.sh[n].of(NCBtotal) - NCB.cur[n]]));
eq([NCBneed, NCBtotal, NCBbring], [100000, 440000, { Dineshwar: 54000, Eshana: 46000 }], 'n_cap_bring');
check(sum(Object.values(NCBbring)) === NCBneed, 'n_cap_bring adds up');
Q('n_cap_bring', num({
  t: 4, d: 3, c: 'application', value: NCBbring.Dineshwar, unit: '₹',
  stem: `On a partner's retirement from Pukhraj Rafting Gear, an imagined firm, ${rs(NCB.due)} is due to him and is to be paid at once. The bank holds ${rs(NCB.bank)} and must keep at least ${rs(NCB.min)}. The continuing partners, Dineshwar and Eshana (new ratio 3 : 2), bring in just enough cash, so that their capitals end up in the new ratio; their capitals after all adjustments are ${rs(NCB.cur.Dineshwar)} and ${rs(NCB.cur.Eshana)}. How much does Dineshwar bring in (in ₹)?`,
  sol: `Cash needed = ${inr(NCB.due)} + ${inr(NCB.min)} − ${inr(NCB.bank)} = ${inr(NCBneed)}; total capital = ${inr(sum(Object.values(NCB.cur)))} + ${inr(NCBneed)} = ${inr(NCBtotal)}; Dineshwar needs 3/5 = ${inr(NCB.sh.Dineshwar.of(NCBtotal))}, so he brings ${inr(NCBbring.Dineshwar)}, that is ${rs(NCBbring.Dineshwar)}.`,
}));

const SCA = { total: 300000, cur: { Gopinath: 164000, Hemangi: 122000 } };
const SCAreq = { Gopinath: fr(1, 2).of(SCA.total), Hemangi: fr(1, 2).of(SCA.total) };
const SCAd = { Gopinath: SCAreq.Gopinath - SCA.cur.Gopinath, Hemangi: SCAreq.Hemangi - SCA.cur.Hemangi };
eq(SCAd, { Gopinath: -14000, Hemangi: 28000 }, 's2_cap_adjust');
const SCAj = journal([
  { dr: [['Bank A/c', SCAd.Hemangi]], cr: [[C('Hemangi'), SCAd.Hemangi]], nar: 'cash brought in by Hemangi to make up her capital' },
  { dr: [[C('Gopinath'), -SCAd.Gopinath]], cr: [['Bank A/c', -SCAd.Gopinath]], nar: 'surplus capital withdrawn by Gopinath' },
]);
Q('s2_cap_adjust', short({
  t: 4, d: 2, c: 'application', marks: 2,
  stem: `After a partner's retirement from Nilmani Plywood, an imagined firm at Dandeli, Gopinath and Hemangi will share profits equally and keep a total capital of ${rs(SCA.total)} in their profit-sharing ratio, any surplus or shortfall being settled in cash. Their capitals after all adjustments are ${rs(SCA.cur.Gopinath)} and ${rs(SCA.cur.Hemangi)}. Calculate the cash to be brought in or withdrawn and journalise it.`,
  model: `Required capital of each = ${inr(SCA.total)} × 1/2 = ${rs(SCAreq.Gopinath)}. Gopinath has ${inr(SCA.cur.Gopinath)}: surplus **${rs(-SCAd.Gopinath)}** withdrawn. Hemangi has ${inr(SCA.cur.Hemangi)}: shortfall **${rs(SCAd.Hemangi)}** brought in.\n\n${SCAj.md}`,
  sol: 'Split the agreed total in the new ratio and compare each result with the adjusted capital.',
  scheme: [['Required capitals and differences', 1], ['Journal entries', 1]],
}));

const SCB = { due: 150000, bank: 40000, min: 50000, cur: { Indraneel: 185000, Jayashree: 105000 }, sh: { Indraneel: fr(2, 3), Jayashree: fr(1, 3) } };
const SCBneed = SCB.due + SCB.min - SCB.bank;
const SCBtotal = sum(Object.values(SCB.cur)) + SCBneed;
const SCBbring = Object.fromEntries(Object.keys(SCB.cur).map((n) => [n, SCB.sh[n].of(SCBtotal) - SCB.cur[n]]));
eq([SCBneed, SCBtotal, SCBbring], [160000, 450000, { Indraneel: 115000, Jayashree: 45000 }], 's3_cap_bring');
const SCBj = journal([
  { dr: [['Bank A/c', SCBneed]], cr: Object.entries(SCBbring).map(([n, x]) => [C(n), x]), nar: 'cash brought in by the continuing partners to pay Kartikeya and keep their capitals in 2 : 1' },
  { dr: [[C('Kartikeya'), SCB.due]], cr: [['Bank A/c', SCB.due]], nar: 'amount due to Kartikeya paid in full' },
]);
Q('s3_cap_bring', short({
  t: [4, 5], d: 4, c: 'analysis', marks: 3,
  stem: `Kartikeya retires from Panna Pashmina Traders, an imagined firm at Diskit, and ${rs(SCB.due)} is due to him. Indraneel and Jayashree, who will share profits 2 : 1, decide to pay him in full at once, to keep ${rs(SCB.min)} in the bank (which now holds ${rs(SCB.bank)}), and to bring in the necessary cash so that their capitals are in their new ratio. Their capitals after all adjustments are ${rs(SCB.cur.Indraneel)} and ${rs(SCB.cur.Jayashree)}. Calculate the cash each brings in and pass the journal entries.`,
  model: `1. Cash needed = ${inr(SCB.due)} (payment) + ${inr(SCB.min)} (balance to be kept) − ${inr(SCB.bank)} (in hand) = ${rs(SCBneed)}.\n2. Total capital of the new firm = ${inr(SCB.cur.Indraneel)} + ${inr(SCB.cur.Jayashree)} + ${inr(SCBneed)} = ${rs(SCBtotal)}.\n3. Indraneel: ${inr(SCBtotal)} × 2/3 = ${inr(SCB.sh.Indraneel.of(SCBtotal))} − ${inr(SCB.cur.Indraneel)} = **${rs(SCBbring.Indraneel)}**; Jayashree: ${inr(SCBtotal)} × 1/3 = ${inr(SCB.sh.Jayashree.of(SCBtotal))} − ${inr(SCB.cur.Jayashree)} = **${rs(SCBbring.Jayashree)}**. Check: ${inr(SCBbring.Indraneel)} + ${inr(SCBbring.Jayashree)} = ${inr(SCBneed)}.\n\n${SCBj.md}`,
  sol: 'First find how much cash the firm is short of; adding it to the existing capitals gives the new total, which is then split in the new ratio.',
  scheme: [['Cash needed and the new total capital', 1], ['Cash brought in by each partner', 1], ['Journal entries', 1]],
}));

const LCA = solveRetirement({
  old: { Malati: fr(2, 5), Neelkanth: fr(2, 5), Omisha: fr(1, 5) }, out: 'Omisha', how: { newRatio: [3, 2] },
  liabs: [['Creditors', 50000], ['General Reserve', 25000, { reserve: true }], ["Malati's Capital", 140000, { cap: 'Malati' }], ["Neelkanth's Capital", 120000, { cap: 'Neelkanth' }], ["Omisha's Capital", 70000, { cap: 'Omisha' }]],
  assets: [['Bank', 120000, { bank: true }], ['Debtors', 45000], ['Stock', 60000], ['Machinery', 80000], ['Land', 100000]],
  reval: [['Land A/c (increase)', 'A', 'Land', 10000]],
  goodwill: { value: 150000 }, pay: 'all', adjust: { total: 250000 },
});
eq([LCA.R.gainers, LCA.gw.dr, LCA.due, LCA.adj.diff, LCA.caps.closing, LCA.bank], [['Malati'], { Malati: 30000 }, 107000, { Malati: 26000, Neelkanth: -34000 }, { Malati: 150000, Neelkanth: 100000, Omisha: 0 }, 5000], 'l5_cap_adjust');
const LCAj = journal([gwJournal(LCA.R, LCA.gw, "Omisha's share of goodwill charged to Malati, the only gaining partner")]);
Q('l5_cap_adjust', long({
  t: [1, 2, 4], d: 4, c: 'analysis', marks: 5,
  stem: `Malati, Neelkanth and Omisha share the profits of Moonga Rice Mill, an imagined firm at Gondal, 2 : 2 : 1. Their capitals are ${rs(140000)}, ${rs(120000)} and ${rs(70000)}, and a general reserve of ${rs(25000)} stands in the books. Omisha retires on ${DATE_OLD}; Malati and Neelkanth will share 3 : 2. Land is revalued upwards by ${rs(10000)} and goodwill is valued at ${rs(150000)}. Omisha is paid in full by cheque, and the total capital of the new firm is fixed at ${rs(250000)} in the new ratio, surpluses and shortfalls being settled in cash.\n\n(a) Show the gain of each continuing partner and pass the entry for goodwill. [2]\n\n(b) Prepare the Partners' Capital Accounts. [3]`,
  model: `**(a)**\n${nl(ratioNotes(LCA.R, { newRatio: [3, 2] }))}\n3. Neelkanth's share does not change, so Malati alone pays for Omisha's 1/5 of goodwill: ${inr(150000)} × 1/5 = ${rs(LCA.gw.cr.Omisha)}.\n\n${LCAj.md}\n\n**(b) Working notes** (ratios as in (a))\n${retirementNotes(LCA, { skipRatio: true })}\n\n**Partners' Capital Accounts**\n\n${LCA.caps.md}`,
  sol: 'A partner whose share is the same before and after pays nothing for goodwill; capital adjustment comes only after the retiring partner is settled.',
  scheme: [['(a) Gains and the gaining partner', 1], ['(a) Goodwill entry', 1], ['(b) Credits: reserve, revaluation, goodwill', 1], ["(b) Omisha's payment", 1], ['(b) Cash brought in or withdrawn and closing capitals', 1]],
}));

// ================================================================ t05 Amount due, loan account, executor's account
Q('m_sec37', mcq({
  t: 5, d: 2, c: 'recall',
  stem: 'Nagesh retired from Gomed Rubber Smokehouse, an imagined firm, but the amount due to him has not yet been paid and the firm carries on with it. With no contract to the contrary, Section 37 of the Indian Partnership Act, 1932 lets him claim, at his option, either the share of profits earned by the use of his share of the property or',
  opts: ['interest at 6% per annum on the amount of his share in the property', 'interest at 12% per annum on his last capital balance', 'a monthly salary equal to his past average drawings', 'his share of the firm\'s goodwill a second time'],
  sol: 'Section 37 gives the outgoing partner, or his estate, the choice between a share of the profits attributable to his unpaid share and interest at six per cent per annum on it.',
}));

Q('m_loan_bs', mcq({
  t: [5, 6], d: 1, c: 'understanding',
  stem: 'The amount due to a retired partner of Manik Bamboo Blinds, an imagined firm, has been transferred to his loan account and will be paid over three years. In the firm\'s balance sheet in horizontal form, this loan appears',
  opts: ['on the liabilities side, as an amount the firm owes', 'on the assets side, as an amount receivable', "among the continuing partners' capitals", 'nowhere, because loans of partners are kept off the balance sheet'],
  sol: 'Once he leaves, the firm simply owes him the balance; it is a liability until the instalments clear it.',
}));

const MLI = loanAccount({ principal: 60000, rate: 12, start: { y: 2026, m: 9 }, n: 2, firstLabel: "Retired partner's Capital A/c" });
const MLIacc = MLI.years[0].cr.find((r) => r[1] === 'Interest A/c')[2];
eq(MLIacc, 3600, 'm_loan_interest');
Q('m_loan_interest', mcq({
  t: 5, d: 3, c: 'application',
  stem: `A partner retires from Heera Cotton Bales, an imagined firm at Wani, on 30 September 2026, and ${rs(60000)} due to him becomes a loan carrying interest at 12% per annum, payable with each yearly instalment from 30 September 2027. The firm closes its books on 31 March. The interest credited to his loan account on 31 March 2027 is`,
  opts: [rs(MLIacc), rs(MLIacc * 2), 'nil, because no interest is due until 30 September 2027', rs(MLIacc / 2)],
  sol: `Six months' interest has accrued by the year end, though it is not yet due: ${inr(60000)} × 12% × 6/12 = ${inr(MLIacc)}, credited to the loan account.`,
}));

Q('m_ioc_death', mcq({
  t: [3, 5], d: 2, c: 'understanding',
  stem: "The deed of Sphatik Leather Juttis, an imagined firm at Barmer, allows interest on capital. Prabhavati, one of its partners, dies in mid-year. Interest on her capital is credited to her",
  opts: ['for the period from the beginning of the year to the date of her death', 'for the whole year, as if she had lived to the year end', 'only if the continuing partners agree to pay it from their own funds', 'never, because interest on capital ends when the year begins'],
  sol: 'She was a partner until the date of death, so the deed applies up to that day and no further.',
}));

Q('m_bs_format', mcq({
  t: 6, d: 1, c: 'recall',
  stem: 'For the ISC examination, the balance sheet of Lajwanti Orange Squash, an imagined firm, after a partner\'s retirement is to be drawn up',
  opts: ['in horizontal form, with liabilities and capitals on the left and assets on the right', 'in the vertical form of Schedule III to the Companies Act, 2013', 'as a trial balance of the ledger accounts', "as a statement of the continuing partners' capitals only"],
  sol: 'Partnership balance sheets on reconstitution are prepared in horizontal form; Schedule III applies to companies.',
}));

Q('tf_loan_interest', tf({
  t: 5, d: 3, c: 'understanding', ans: false,
  stem: "True or false? At Firoza Tile Works, an imagined firm, interest on a retired partner's loan that has accrued by 31 March, but is payable only with the instalment due on 30 September, is ignored in that year's books.",
  sol: 'The interest belongs to the year in which it accrues, so it is credited to the loan account on 31 March as interest accrued but not due and paid with the next instalment.',
}));

Q('fb_executor', fb({
  t: 5, d: 1, c: 'recall',
  stem: "When Jagmohan, a partner of Chatak Trout Farms, an imagined firm, dies, the balance finally standing to his credit is transferred to an account opened in the name of his ___, the person entitled to receive it on behalf of his estate.",
  acc: [['executor', 'executors', 'legal representative', 'legal representatives']],
  sol: "It goes to his executor's account (his legal representative), which is then settled in cash or turned into a loan.",
}));

Q('match_modes', match({
  t: 5, d: 2, c: 'understanding', marks: 2,
  stem: 'Match each step in settling with outgoing partners of Rajat Silverware, an imagined firm, with the entry or account it uses.',
  pairs: [
    ['Amount due paid at once by cheque', "Outgoing partner's Capital A/c Dr. To Bank A/c"],
    ['Amount due left with the firm', "Transferred to the outgoing partner's Loan A/c"],
    ["Balance of a deceased partner's capital", "Transferred to his Executor's A/c"],
    ['Interest on the unpaid balance', "Interest A/c Dr. To Loan A/c"],
  ],
  sol: 'Payment reduces the bank; a balance kept in the business becomes a loan; a deceased partner is settled through his executor; interest is added to the loan before each instalment.',
}));

Q('ar_loan', ar({
  t: [5, 6], d: 2, c: 'understanding', key: 'a',
  a: 'The unpaid balance due to a retired partner of Kansa Bell Foundry, an imagined firm, is shown on the liabilities side of its balance sheet.',
  r: 'After he retires, the firm owes him that balance just as it would owe any outside lender.',
  sol: 'Both are true, and R explains A: the retired partner has become a creditor of the firm.',
}));

const S2D = { cap: 85000, gr: 9000, gw: 24000, reval: 3000, cur: 5000 };
const S2Ddue = S2D.cap + S2D.gr + S2D.gw + S2D.reval - S2D.cur;
eq(S2Ddue, 116000, 's2_amount_due');
Q('s2_amount_due', short({
  t: 5, d: 2, c: 'application', marks: 2,
  stem: `Sarojini retires from Lahsuniya Handlooms, an imagined firm at Pochampally, and keeps fixed capitals. Her capital account shows ${rs(S2D.cap)} and her current account a debit balance of ${rs(S2D.cur)}. Her share of the general reserve is ${rs(S2D.gr)}, of goodwill ${rs(S2D.gw)} and of the revaluation profit ${rs(S2D.reval)}. Calculate the amount due to her.`,
  model: `| Item | ₹ |\n|---|--:|\n| Capital | ${inr(S2D.cap)} |\n| Add: share of general reserve | ${inr(S2D.gr)} |\n| Add: share of goodwill | ${inr(S2D.gw)} |\n| Add: share of revaluation profit | ${inr(S2D.reval)} |\n| Less: debit balance of current account | (${inr(S2D.cur)}) |\n| **Amount due** | **${inr(S2Ddue)}** |`,
  sol: 'Add everything credited to her on retirement to the fixed capital and deduct what she owes the firm on her current account.',
  scheme: [['Additions', 1], ['Deduction and amount due', 1]],
}));

Q('s2_sec37', short({
  t: 5, d: 2, c: 'understanding', marks: 2,
  stem: 'The continuing partners of Pushpak Travels, an imagined firm, have used the unpaid balance of a retired partner in the business for nine months without any agreement on interest. State the two choices that Section 37 of the Indian Partnership Act, 1932 gives him for this period.',
  model: '1. A share of the profits made since he retired that is attributable to the use of his share of the firm\'s property; **or**\n2. Interest at **6% per annum** on the amount of his share in the property.\n\nThe choice is his (or his legal representative\'s), and it applies only when there is no contract to the contrary.',
  sol: 'Name both alternatives and note that the outgoing partner chooses between them.',
  scheme: [['Share of profits attributable to his share of the property', 1], ['Interest at six per cent per annum', 1]],
}));

const SLN = loanAccount({ principal: 150000, rate: 12, start: { y: 2026, m: 3 }, n: 3, firstLabel: "Govindan's Capital A/c" });
eq(SLN.payments.map((p) => p.pay), [68000, 62000, 56000], 's3_loan');
Q('s3_loan', short({
  t: 5, d: 3, c: 'application', marks: 3,
  stem: `Govindan retires from Marakata Granite, an imagined firm at Ongole, on ${DATE_OLD}, leaving ${rs(150000)} with the firm as a loan. It is repaid in three equal yearly instalments of principal on 31 March, starting in 2027, and each instalment is paid together with interest at 12% per annum on the balance outstanding during the year. Prepare Govindan's Loan Account.`,
  model: `Instalment of principal = ${inr(150000)} ÷ 3 = ${rs(SLN.inst)}; payments ${SLN.payments.map((p) => `${rs(p.inst)} + ${rs(p.interest)} = ${rs(p.pay)}`).join('; ')}.\n\n**Govindan's Loan Account**\n\n${SLN.md}`,
  sol: 'Interest each year is on the opening balance; the payment is the fixed principal plus that interest, so payments fall year by year.',
  scheme: [['Interest for each year', 1], ['Payments (principal plus interest)', 1], ['Balances carried down and account closed', 1]],
}));

const SLM = loanAccount({ principal: 60000, rate: 10, start: { y: 2026, m: 9 }, n: 2, firstLabel: "Vaidehi's Capital A/c" });
eq([SLM.years.map((y) => y.closing), SLM.payments.map((p) => p.pay)], [[63000, 31500, 0], [36000, 33000]], 's3_loan_mid');
Q('s3_loan_mid', short({
  t: 5, d: 4, c: 'application', marks: 3,
  stem: `Vaidehi retires from Navratna Lacquerware, an imagined firm at Channapatna, on 30 September 2026, and ${rs(60000)} due to her is treated as a loan. It is repaid in two equal yearly instalments on 30 September 2027 and 30 September 2028, each with interest at 10% per annum on the balance outstanding. The firm closes its books on 31 March each year. Prepare Vaidehi's Loan Account until it is closed.`,
  model: `Interest for each half-year on ${inr(60000)} = ${rs(fr(10 * 6, 1200).of(60000))}; on ${inr(30000)} = ${rs(fr(10 * 6, 1200).of(30000))}. On 31 March the half-year's interest is credited although it is not yet due (accrued but not due); on 30 September the next half-year's interest falls due and the instalment of ${rs(SLM.inst)} is paid with a full year's interest.\n\n**Vaidehi's Loan Account**\n\n${SLM.md}`,
  sol: 'Split each year of the loan at the accounting date: interest accrued but not due is credited on 31 March and paid on 30 September with the rest.',
  scheme: [['Interest accrued but not due on each 31 March', 1], ['Payments on 30 September', 1], ['Balances and totals of each year', 1]],
}));

const SEX = retire({ Tarachand: fr(2, 5), Urmila: fr(2, 5), Raghunandan: fr(1, 5) }, 'Raghunandan');
const SEXx = { cap: 100000, gr: 40000, profit: 6000, ioc: 2500, drawings: 4500, paid: 32000 };
const SEXg = SEX.goodwill(100000);
const SEXgr = SEX.outShare.of(SEXx.gr);
const SEXdue = SEXx.cap + SEXgr + SEXg.cr.Raghunandan + SEXx.profit + SEXx.ioc - SEXx.drawings;
const SEXcap = tAccount(
  [['Drawings A/c', SEXx.drawings], ["Raghunandan's Executor's A/c", SEXdue]],
  [['Balance b/d', SEXx.cap], ['General Reserve A/c', SEXgr], ...Object.entries(SEXg.dr).map(([n, x]) => [C(n), x]), ['Profit and Loss Suspense A/c', SEXx.profit], ['Interest on Capital A/c', SEXx.ioc]],
);
const SEXex = tAccount([['Bank A/c', SEXx.paid], ["Raghunandan's Executor's Loan A/c", SEXdue - SEXx.paid]], [["Raghunandan's Capital A/c", SEXdue]]);
eq([SEXgr, SEXg.dr, SEXdue], [8000, { Tarachand: 10000, Urmila: 10000 }, 132000], 's3_executor');
Q('s3_executor', short({
  t: [3, 5], d: 3, c: 'application', marks: 3,
  stem: `Tarachand, Urmila and Raghunandan share the profits of Kanak Kansa Utensils, an imagined firm at Paithan, 2 : 2 : 1. Raghunandan dies on 30 June 2026. His capital on 1 April was ${rs(SEXx.cap)}; the general reserve is ${rs(SEXx.gr)}; goodwill is valued at ${rs(SEXg.value)}; his share of profit till death is ${rs(SEXx.profit)} (through Profit and Loss Suspense); interest on his capital is ${rs(SEXx.ioc)}; his drawings were ${rs(SEXx.drawings)}. His executor is paid ${rs(SEXx.paid)} at once and the rest is kept as a loan. Prepare Raghunandan's Capital Account and his Executor's Account.`,
  model: `Working notes: reserve ${inr(SEXx.gr)} × 1/5 = ${rs(SEXgr)}; goodwill ${inr(SEXg.value)} × 1/5 = ${rs(SEXg.cr.Raghunandan)}, charged to Tarachand and Urmila 1 : 1.\n\n**Raghunandan's Capital Account**\n\n${SEXcap.md}\n\n**Raghunandan's Executor's Account**\n\n${SEXex.md}`,
  sol: "Close the deceased partner's capital account into the executor's account; the executor's account is then settled in cash and by a loan.",
  scheme: [["Credits to Raghunandan's capital", 1], ['Drawings and the transfer to the executor', 1], ["Executor's account", 1]],
}));

const LLN = { cap: 110000, gr: 18000, reval: 4000, gw: 36000, paid: 40000 };
const LLNdue = LLN.cap + LLN.gr - LLN.reval + LLN.gw;
const LLNl = loanAccount({ principal: LLNdue - LLN.paid, rate: 10, start: { y: 2026, m: 3 }, n: 3, firstLabel: "Rangaswamy's Capital A/c" });
eq([LLNdue, LLNl.payments.map((p) => p.pay)], [160000, [52000, 48000, 44000]], 'l5_loan');
Q('l5_loan', long({
  t: 5, d: 3, c: 'application', marks: 5,
  stem: `Rangaswamy retires from Zamurrad Sweet Mart, an imagined firm at Bikaner, on ${DATE_OLD}. His capital stands at ${rs(LLN.cap)}; his share of the general reserve is ${rs(LLN.gr)}, of the revaluation loss ${rs(LLN.reval)} and of goodwill ${rs(LLN.gw)}. He is paid ${rs(LLN.paid)} at once; the rest is a loan repayable in three equal yearly instalments of principal on 31 March, with interest at 10% per annum on the balance outstanding.\n\n(a) Calculate the amount due to Rangaswamy and the amount transferred to his loan account. [2]\n\n(b) Prepare Rangaswamy's Loan Account until it is repaid. [3]`,
  model: `**(a)** Amount due = ${inr(LLN.cap)} + ${inr(LLN.gr)} − ${inr(LLN.reval)} + ${inr(LLN.gw)} = **${rs(LLNdue)}**; paid ${rs(LLN.paid)}; loan = **${rs(LLNdue - LLN.paid)}**.\n\n**(b)** Instalment = ${inr(LLNdue - LLN.paid)} ÷ 3 = ${rs(LLNl.inst)}; payments ${LLNl.payments.map((p) => rs(p.pay)).join(', ')}.\n\n**Rangaswamy's Loan Account**\n\n${LLNl.md}`,
  sol: 'The revaluation loss reduces what is due; interest each year runs on the balance still unpaid.',
  scheme: [['(a) Amount due', 1], ['(a) Loan amount', 1], ['(b) Interest each year', 1], ['(b) Payments', 1], ['(b) Balances and closing', 1]],
}));

// ================================================================ t06 Balance Sheet after retirement or death
const LBS = solveRetirement({
  old: { Hemant: fr(1, 3), Jhanvi: fr(1, 3), Kunjan: fr(1, 3) }, out: 'Kunjan',
  liabs: [['Creditors', 30000], ['General Reserve', 15000, { reserve: true }], ["Hemant's Capital", 80000, { cap: 'Hemant' }], ["Jhanvi's Capital", 70000, { cap: 'Jhanvi' }], ["Kunjan's Capital", 60000, { cap: 'Kunjan' }]],
  assets: [['Bank', 50000, { bank: true }], ['Debtors', 40000], ['Stock', 45000], ['Furniture', 20000], ['Building', 100000]],
  reval: [['Building A/c (increase)', 'A', 'Building', 12000], ['Stock A/c (decrease)', 'A', 'Stock', -3000]],
  goodwill: { value: 90000 }, pay: 38000,
});
eq([LBS.reval.net, LBS.due, LBS.loan, LBS.caps.closing, LBS.newBS.total, LBS.bank], [9000, 98000, 60000, { Hemant: 73000, Jhanvi: 63000, Kunjan: 0 }, 226000, 12000], 'l5_retire_bs');
// Revised value of an asset line (book value + revaluation change), for the stem.
const bvL = (l) => LBS.s.assets.find((x) => x[0] === l)[1] + (LBS.s.reval.find((x) => x[2] === l)?.[3] ?? 0);
eq([bvL('Building'), bvL('Stock')], [112000, 42000], 'l5_retire_bs revised values');
Q('l5_retire_bs', long({
  t: [2, 5, 6], d: 3, c: 'application', marks: 5,
  stem: `Hemant, Jhanvi and Kunjan are equal partners in Vaidurya Glass Bangles, an imagined firm at Firozabad. Their Balance Sheet as at ${DATE_OLD} was:\n\n${LBS.oldBS.md}\n\nKunjan retires on that date. The building is valued at ${rs(bvL('Building'))} and stock at ${rs(bvL('Stock'))}; goodwill is valued at ${rs(90000)}. Kunjan is paid ${rs(38000)} by cheque and the balance is transferred to his loan account.\n\n(a) Prepare the Revaluation Account and the Partners' Capital Accounts. [3]\n\n(b) Prepare the Balance Sheet of the reconstituted firm in horizontal form. [2]`,
  model: `**(a)**\n\n**Working notes**\n${retirementNotes(LBS)}\n\n**Revaluation Account**\n\n${LBS.reval.md}\n\n**Partners' Capital Accounts**\n\n${LBS.caps.md}\n\n**(b) Balance Sheet of Vaidurya Glass Bangles as at ${DATE_OLD} (after Kunjan's retirement)**\n\n${LBS.newBS.md}`,
  sol: 'The reserve leaves the balance sheet once it is shared; the loan to Kunjan becomes a new liability and the bank falls by the cheque.',
  scheme: [['(a) Revaluation Account', 1], ['(a) Partners\' Capital Accounts', 2], ['(b) Liabilities side', 1], ['(b) Assets side and totals', 1]],
}));

const SBS = balanceSheet(
  [['Creditors', 42000], ['Outstanding Wages', 3000], ["Devraj's Executor's Loan", 75000], ["Bhupinder's Capital", 140000], ["Chhaya's Capital", 95000]],
  [['Bank', 18000], [provLabel(55000, -2750), 52250], ['Stock', 60000], ['Machinery', 72000], ['Building', 140000], ['Profit and Loss Suspense A/c', 12750]],
);
check(55000 - 2750 === 52250, 's3_bs provision');
eq(SBS.total, 355000, 's3_bs');
Q('s3_bs', short({
  t: [3, 6], d: 2, c: 'application', marks: 3,
  stem: `After all adjustments on the death of Devraj, a partner of Parijat Papad Works, an imagined firm at Nagaur, the firm's balances are: creditors ${rs(42000)}; outstanding wages ${rs(3000)}; Devraj's executor's loan ${rs(75000)}; capitals of Bhupinder ${rs(140000)} and Chhaya ${rs(95000)}; bank ${rs(18000)}; debtors ${rs(55000)} with a provision of ${rs(2750)}; stock ${rs(60000)}; machinery ${rs(72000)}; building ${rs(140000)}; and Profit and Loss Suspense ${rs(12750)} for Devraj's share of profit till death. Prepare the firm's Balance Sheet in horizontal form.`,
  model: `**Balance Sheet of Parijat Papad Works (after Devraj's death)**\n\n${SBS.md}`,
  sol: "The executor's loan is a liability; the suspense account, a debit balance awaiting the year's profit, sits with the assets; the provision is deducted from debtors.",
  scheme: [['Liabilities side with the executor\'s loan', 1], ['Assets side with debtors net and the suspense account', 1], ['Totals agree', 1]],
}));

// ================================================================ full practical problems (8 marks, practice only)
const dv = (s, bl) => Math.abs(s.reval.find((x) => x[2] === bl)[3]);
const bv = (s, l) => [...s.liabs, ...s.assets].find((x) => x[0] === l)[1];
const pct = (s, bl, p) => {
  check(fr(p, 100).of(bv(s, bl)) === dv(s, bl), `${bl}: ${p}% of ${bv(s, bl)} is not ${dv(s, bl)}`);
  return `${p}%`;
};
function full(key, o) {
  const terms = o.terms(o.s);
  const r = solveRetirement(o.s);
  for (const [k, v] of Object.entries(o.expect)) eq(k.split('.').reduce((a, p) => a?.[p], r), v, `${key} ${k}`);
  Q(key, long({
    t: o.t, d: o.d, c: o.c, marks: 8,
    stem: `${o.intro} Their Balance Sheet as at ${DATE_OLD} was:\n\n${r.oldBS.md}\n\n${terms}\n\n${o.ask}`,
    model: retirementAnswer(r, o.firm, o.date ?? DATE_OLD),
    sol: o.sol,
    scheme: o.scheme,
  }));
  return r;
}

const L8A = full('l8_ifr_loan', {
  t: [1, 2, 5, 6], d: 4, c: 'application', firm: 'Zamurrad Handloom House',
  intro: 'Shubhra, Tejasvi and Ugrasen are partners in Zamurrad Handloom House, an imagined firm at Pochampally, sharing profits 2 : 2 : 1.',
  s: {
    old: { Shubhra: fr(2, 5), Tejasvi: fr(2, 5), Ugrasen: fr(1, 5) }, out: 'Tejasvi', how: { newRatio: [3, 2] },
    liabs: [['Creditors', 48000], ['Bills Payable', 12000], ['Investment Fluctuation Reserve', 9000, { ifr: 15000, inv: 'Investments' }], ['General Reserve', 30000, { reserve: true }], ["Shubhra's Capital", 150000, { cap: 'Shubhra' }], ["Tejasvi's Capital", 120000, { cap: 'Tejasvi' }], ["Ugrasen's Capital", 80000, { cap: 'Ugrasen' }]],
    assets: [['Bank', 32000, { bank: true }], ['Investments', 60000], ['Debtors', 50000], ['Stock', 67000], ['Machinery', 90000], ['Building', 130000], ['Goodwill', 20000, { goodwill: true }]],
    reval: [['Building A/c (increase)', 'A', 'Building', 26000], ['Machinery A/c (depreciation)', 'A', 'Machinery', -9000], ['Provision for Doubtful Debts A/c', 'A', 'Debtors', -2500, provLabel]],
    goodwill: { value: 150000 }, pay: 27400,
  },
  terms: (s) => `Tejasvi retires on that date, and Shubhra and Ugrasen agree to share future profits 3 : 2. (a) Goodwill is valued at ${rs(s.goodwill.value)}. (b) The building is appreciated by ${pct(s, 'Building', 20)} and machinery depreciated by ${pct(s, 'Machinery', 10)}; a provision for doubtful debts is made at ${pct(s, 'Debtors', 5)} of debtors. (c) The investments are worth ${rs(bv(s, 'Investments') - s.liabs.find((x) => x[2]?.ifr !== undefined)[2].ifr)}. (d) Tejasvi is paid ${rs(s.pay)} by cheque and the balance is transferred to his loan account.`,
  ask: "Prepare the Revaluation Account, the Partners' Capital Accounts and the Balance Sheet of the reconstituted firm in horizontal form.",
  expect: { 'reval.net': 8500, 'gw.dr': { Shubhra: 30000, Ugrasen: 30000 }, due: 187400, loan: 160000, 'caps.closing': { Shubhra: 127400, Tejasvi: 0, Ugrasen: 53700 }, 'newBS.total': 401100, bank: 4600 },
  sol: 'The fall in investments beyond the reserve is a revaluation loss; book goodwill is written off before the retiring share is charged to the gainers in their gaining ratio.',
  scheme: [['Revaluation Account with the result in the old ratio', 2], ["Partners' Capital Accounts", 3], ['Balance Sheet of the reconstituted firm', 3]],
});

const L8B = full('l8_hidden_cash', {
  t: [2, 4, 5, 6], d: 5, c: 'analysis', firm: 'Firoza Blue Pottery',
  intro: 'Vishwas, Yojana and Akshita are partners in Firoza Blue Pottery, an imagined firm at Sanganer, sharing profits 3 : 2 : 1.',
  s: {
    old: { Vishwas: fr(1, 2), Yojana: fr(1, 3), Akshita: fr(1, 6) }, out: 'Yojana',
    liabs: [['Creditors', 40000], ['General Reserve', 12000, { reserve: true }], ['Profit and Loss A/c', 18000, { reserve: true }], ["Vishwas's Capital", 140000, { cap: 'Vishwas' }], ["Yojana's Capital", 90000, { cap: 'Yojana' }], ["Akshita's Capital", 50000, { cap: 'Akshita' }]],
    assets: [['Bank', 22000, { bank: true }], ['Debtors', 48000], ['Stock', 55000], ['Furniture', 25000], ['Plant', 100000], ['Land', 100000]],
    reval: [['Land A/c (increase)', 'A', 'Land', 18000], ['Plant A/c (depreciation)', 'A', 'Plant', -6000]],
    goodwill: { settle: 128000 }, pay: 'all', adjust: { payOut: 20000 },
  },
  terms: (s) => `Yojana retires on that date; Vishwas and Akshita continue in their old ratio. (a) Land is appreciated by ${pct(s, 'Land', 18)} and plant depreciated by ${pct(s, 'Plant', 6)}. (b) Yojana is to be paid ${rs(s.goodwill.settle)} in full settlement, at once; nothing else is said about goodwill. (c) Vishwas and Akshita bring in just enough cash to pay Yojana and leave ${rs(s.adjust.payOut)} in the bank, so that their capitals are in their profit-sharing ratio.`,
  ask: "Prepare the Revaluation Account, the Partners' Capital Accounts and the Balance Sheet of the reconstituted firm in horizontal form.",
  expect: { 'reval.net': 12000, before: 104000, 'hidden.value': 72000, 'gw.dr': { Vishwas: 18000, Akshita: 6000 }, 'adj.needed': 126000, 'adj.diff': { Vishwas: 97000, Akshita: 29000 }, 'caps.closing': { Vishwas: 240000, Yojana: 0, Akshita: 80000 }, 'newBS.total': 360000, bank: 20000 },
  sol: "Settle everything except goodwill first; the excess of the settlement over Yojana's capital then reveals goodwill, and only after that can the cash to be brought in be worked out.",
  scheme: [['Revaluation Account and reserves', 2], ["Hidden goodwill, cash brought in and Partners' Capital Accounts", 3], ['Balance Sheet of the reconstituted firm', 3]],
});

const L8C = full('l8_death', {
  t: [2, 3, 5, 6], d: 5, c: 'analysis', firm: 'Chandrakant Stone Inlay', date: '30 June 2026',
  intro: 'Bhavesh, Chitralekha and Dushyant share the profits of Chandrakant Stone Inlay, an imagined firm at Agra, 5 : 3 : 2.',
  s: {
    old: { Bhavesh: fr(1, 2), Chitralekha: fr(3, 10), Dushyant: fr(1, 5) }, out: 'Dushyant', death: true,
    liabs: [['Creditors', 55000], ['General Reserve', 40000, { reserve: true }], ["Bhavesh's Capital", 160000, { cap: 'Bhavesh' }], ["Chitralekha's Capital", 100000, { cap: 'Chitralekha' }], ["Dushyant's Capital", 70000, { cap: 'Dushyant' }]],
    assets: [['Bank', 45000, { bank: true }], ['Debtors', 60000], ['Stock', 70000], ['Machinery', 100000], ['Buildings', 150000]],
    reval: [['Buildings A/c (increase)', 'A', 'Buildings', 20000], ['Machinery A/c (depreciation)', 'A', 'Machinery', -10000], ['Stock A/c (decrease)', 'A', 'Stock', -4000]],
    goodwill: { value: 120000 }, pay: 31200,
    profit: { amount: 8000, note: `Profit till death on the average of the last three years: (${inr(140000)} + ${inr(160000)} + ${inr(180000)}) ÷ 3 = ${rs(160000)}; × 3/12 × 1/5 = ${rs(8000)}, credited to Dushyant through Profit and Loss Suspense A/c (shown among the assets).` },
  },
  terms: (s) => `Dushyant dies on 30 June 2026, and the deed provides that: (a) buildings are revalued at ${rs(bv(s, 'Buildings') + dv(s, 'Buildings'))}, machinery is depreciated by ${pct(s, 'Machinery', 10)} and stock is reduced by ${rs(dv(s, 'Stock'))}; (b) goodwill is valued at ${rs(s.goodwill.value)}; (c) his share of profit till death is calculated on the average profit of the last three years, which were ${rs(140000)}, ${rs(160000)} and ${rs(180000)}, and is credited through Profit and Loss Suspense; (d) his executor is paid ${rs(s.pay)} at once and the balance is kept as the executor's loan. Bhavesh and Chitralekha continue in their old ratio.`,
  ask: "Prepare the Revaluation Account, the Partners' Capital Accounts, Dushyant's Executor's Account and the Balance Sheet of the reconstituted firm as at 30 June 2026 in horizontal form (take the other balances as they stood on 31 March 2026).",
  expect: { 'reval.net': 6000, 'gw.dr': { Bhavesh: 15000, Chitralekha: 9000 }, due: 111200, loan: 80000, 'caps.closing': { Bhavesh: 168000, Chitralekha: 104800, Dushyant: 0 }, 'newBS.total': 407800, bank: 13800 },
  sol: "Credit the deceased partner with everything up to the date of death, close his capital account into the executor's account, and show both the executor's loan and the suspense balance in the new balance sheet.",
  scheme: [['Revaluation Account', 1], ["Partners' Capital Accounts with profit till death", 3], ["Executor's Account", 1], ['Balance Sheet of the reconstituted firm', 3]],
});
check(average([140000, 160000, 180000]) === 160000 && timeBasis({ profit: 160000, months: 3, share: fr(1, 5) }).share === L8C.profit.amount, 'l8_death profit till death');

export const FULL = { L8A, L8B, L8C };
