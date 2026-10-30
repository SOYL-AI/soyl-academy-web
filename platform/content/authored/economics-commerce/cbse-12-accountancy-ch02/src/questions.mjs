// CBSE 12 Accountancy, ch02 Change in Profit-Sharing Ratio among Existing Partners — question bank.
// Every firm, partner and figure is imagined by SOYL; no NCERT illustration or exercise and no CBSE
// sample/past-paper item is reused. Every figure is computed with acc.mjs (exact fractions, entries that
// must balance, accounts that must agree) and pinned by expect() below, so a typo throws at build time.
import { Q, mcq, ar, tf, fb, match, num, short, long } from './lib.mjs';
import { assert, fr, changes, changeTable, split, adjust, je, journal, cap, cur, revaluation, capitalAccounts, balanceSheet, wcr, ifr, inr, amt, fmtRatio, sum } from './acc.mjs';

const expect = (got, want, what) => assert(JSON.stringify(got) === JSON.stringify(want), `${what}: got ${JSON.stringify(got)}, expected ${JSON.stringify(want)}`);
const names = (ch) => ch.names.join(', ');
const L4 = 480; // expected time, 4-mark long answer (s)
const L6 = 720; // 6-mark long answer

// ================================================================ t01 Sacrificing and gaining ratios
Q('m_sac_def', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'When existing partners change their profit-sharing ratio, the share sacrificed by a partner is calculated as',
  opts: ['old share minus new share', 'new share minus old share', 'old share divided by new share', 'new share multiplied by old share'],
  sol: 'A sacrifice is the part of the old share that a partner gives up, so it is old share − new share. New − old gives a gain.',
}));
Q('m_why_sac', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Why is the sacrificing ratio worked out when the partners of a firm agree to a new profit-sharing ratio?',
  opts: ['To find how much compensation each sacrificing partner should receive from the gaining partners', 'To fix the ratio in which the losses of earlier years will now be shared', 'To calculate interest on the partners\' capitals for the year', 'To decide how much capital a new partner must bring'],
  sol: 'The sacrificing partners give up future profits, so the gaining partners compensate them (mainly for goodwill). The sacrificing ratio tells how that compensation is shared. Past losses go in the old ratio, and no new partner is involved here.',
}));
const RS = changes(['Rhea', 'Sohan'], [3, 2], [1, 1]);
expect([`${RS.by.Rhea.diff}`, `${RS.by.Sohan.diff}`], ['1/10', '-1/10'], 'RS');
Q('m_ratio_two', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Rhea and Sohan run an imagined bakery in Indore and share profits 3 : 2. From 1 April they agree to share profits equally. Which statement is correct?',
  opts: [
    `Rhea sacrifices ${RS.by.Rhea.diff} and Sohan gains ${RS.by.Sohan.diff.abs()}`,
    `Sohan sacrifices ${RS.by.Rhea.diff} and Rhea gains ${RS.by.Rhea.diff}`,
    `Rhea sacrifices ${RS.by.Rhea.old.sub(RS.by.Sohan.old)} and Sohan gains ${RS.by.Rhea.old.sub(RS.by.Sohan.old)}`,
    'Neither partner sacrifices, because the number of partners is the same',
  ],
  sol: `Rhea: 3/5 − 1/2 = ${RS.by.Rhea.diff.over(10)} (sacrifice). Sohan: 2/5 − 1/2 = −${RS.by.Sohan.diff.abs().over(10)} (gain). What Rhea gives up, Sohan takes.`,
}));
const PQR = changes(['Pranav', 'Qadir', 'Ruchi'], [4, 3, 2], [2, 3, 4]);
expect([`${PQR.by.Pranav.diff}`, `${PQR.by.Qadir.diff}`, `${PQR.by.Ruchi.diff}`], ['2/9', '0', '-2/9'], 'PQR');
Q('m_ratio_nil', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Pranav, Qadir and Ruchi, partners in an imagined courier firm in Nagpur, share profits 4 : 3 : 2. They change the ratio to 2 : 3 : 4. Which statement is correct?',
  opts: [
    `Pranav sacrifices ${PQR.by.Pranav.diff}, Ruchi gains ${PQR.by.Ruchi.diff.abs()} and Qadir neither sacrifices nor gains`,
    `Pranav and Qadir sacrifice ${PQR.by.Pranav.diff} each and Ruchi gains ${PQR.by.Pranav.diff.mul(2)}`,
    `Pranav sacrifices ${PQR.by.Pranav.diff}, and Qadir and Ruchi gain ${PQR.by.Pranav.diff.mul(fr(1, 2))} each`,
    'All three partners gain, because Ruchi\'s share has doubled',
  ],
  sol: `Over 9: Pranav 4/9 − 2/9 = 2/9 sacrificed; Qadir 3/9 − 3/9 = 0; Ruchi 2/9 − 4/9 = −2/9, a gain. Qadir is not affected.`,
}));
const KLM = changes(['Kiran', 'Latika', 'Manav'], [5, 3, 2], [2, 5, 3]);
expect(KLM.gainRatio, [2, 1], 'KLM gaining ratio');
Q('m_gain_ratio', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Kiran, Latika and Manav share profits 5 : 3 : 2 in an imagined tailoring unit in Surat. Their new ratio is 2 : 5 : 3. The gaining ratio of Latika and Manav is',
  opts: [fmtRatio(KLM.gainRatio), fmtRatio([...KLM.gainRatio].reverse()), '5 : 3', '3 : 2'],
  sol: `Latika gains 5/10 − 3/10 = ${KLM.by.Latika.diff.abs().over(10)}; Manav gains 3/10 − 2/10 = ${KLM.by.Manav.diff.abs().over(10)}. Gaining ratio = 2 : 1 (Kiran sacrifices 3/10).`,
}));
const VW = { old: [3, 2], part: fr(1, 5) };
const VWnew = [fr(3, 5).mul(fr(1).sub(VW.part)), fr(2, 5).add(fr(3, 5).mul(VW.part))];
const VWch = changes(['Varun', 'Wasim'], [3, 2], VWnew);
expect(VWch.newInts, [12, 13], 'VW new ratio');
Q('m_surrender', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Varun and Wasim share profits 3 : 2 in an imagined travel agency in Shimla. Varun gives one-fifth of his share to Wasim. Their new profit-sharing ratio is',
  opts: [fmtRatio(VWch.newInts), '2 : 3', fmtRatio([...VWch.newInts].reverse()), '11 : 14'],
  sol: `Varun gives 1/5 × 3/5 = 3/25. Varun: 3/5 − 3/25 = ${VWnew[0]}; Wasim: 2/5 + 3/25 = ${VWnew[1]}. New ratio 12 : 13.`,
}));
const EF = changes(['Esha', 'Farah'], [1, 1], [fr(1, 2).sub(fr(1, 10)), fr(1, 2).add(fr(1, 10))]);
expect(EF.newInts, [2, 3], 'EF');
Q('m_new_given_sac', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Esha and Farah share profits equally. Esha agrees to give up 1/10 of the firm\'s profit in favour of Farah. Their new ratio will be',
  opts: [fmtRatio(EF.newInts), '3 : 2', '9 : 11', '1 : 1'],
  sol: 'Esha: 1/2 − 1/10 = 4/10; Farah: 1/2 + 1/10 = 6/10, so 2 : 3. (9 : 11 would be the answer if she gave 1/10 of her own share.)',
}));
Q('tf_sac_eq_gain', tf({
  t: 1, d: 1, c: 'understanding', ans: true,
  stem: 'True or false? When only the existing partners change their ratio, the total of the shares sacrificed equals the total of the shares gained.',
  sol: 'The whole profit is still shared among the same partners, so every fraction given up by one partner is taken up by another.',
}));
Q('tf_all_sac', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? On a change in the profit-sharing ratio, every partner of the firm must either make a sacrifice or make a gain.',
  sol: 'A partner whose new share equals the old share is not affected: no sacrifice and no gain. Such a partner takes no part in the goodwill adjustment.',
}));
Q('fb_gain', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'Gaining ratio = new ratio − ___ ratio.',
  acc: [['old']],
  sol: 'A gain is the increase in share: new ratio − old ratio.',
}));
Q('fb_nil', fb({
  t: 1, d: 1, c: 'understanding',
  stem: 'A partner whose new share is the same as the old share neither sacrifices nor ___.',
  acc: [['gains', 'gain']],
  sol: 'Old share − new share = 0, so the partner neither sacrifices nor gains.',
}));
Q('ar_ratio', ar({
  t: 1, d: 3, c: 'analysis', key: 'a',
  a: 'On a change in the profit-sharing ratio among existing partners, the sum of all sacrifices equals the sum of all gains.',
  r: 'The total profit is still divided among the same partners, so any share one partner gives up is taken by another partner.',
  sol: 'Both statements are true, and R gives the reason for A: with no outsider, a share given up can only go to another existing partner.',
}));
Q('ar_both_sac', ar({
  t: 1, d: 2, c: 'understanding', key: 'd',
  a: 'When two partners change their ratio from 1 : 1 to 3 : 2, both partners make a sacrifice.',
  r: 'A partner\'s sacrifice is measured as the old share minus the new share.',
  sol: 'A is false: the first partner gains 3/5 − 1/2 = 1/10 and the second sacrifices 1/10; both cannot sacrifice. R is a correct statement of the formula.',
}));
const NO = { ch: changes(['Neha', 'Om'], [3, 2], [2, 3]), profit: 180000 };
const NOgain = NO.ch.by.Om.diff.abs().of(NO.profit);
expect(NOgain, 36000, 'NO');
Q('num_profit_gain', num({
  t: 1, d: 2, c: 'application', marks: 1, value: NOgain, unit: '₹',
  stem: `Neha and Om, partners in an imagined printing press in Bhopal, change their ratio from 3 : 2 to 2 : 3. The firm earns a profit of ${inr(NO.profit)} in the first year after the change. By how much is Om's share of this profit higher than it would have been under the old ratio? (Answer in ₹.)`,
  sol: `Step 1: Om's gain = 3/5 − 2/5 = ${NO.ch.by.Om.diff.abs()}.\nStep 2: ${amt(NO.profit)} × ${NO.ch.by.Om.diff.abs()} = ${amt(NOgain)}. So ${inr(NOgain)}.`,
}));
const ABC = changes(['Arjun', 'Bela', 'Chirag'], [3, 2, 1], [2, 2, 1]);
expect([`${ABC.by.Arjun.diff}`, `${ABC.by.Bela.diff}`, `${ABC.by.Chirag.diff}`, ABC.gainRatio], ['1/10', '-1/15', '-1/30', [2, 1]], 'ABC');
Q('s3_ratio_diffden', short({
  t: 1, d: 3, c: 'application', marks: 3,
  stem: 'Arjun, Bela and Chirag run an imagined event-management firm in Lucknow, sharing profits 3 : 2 : 1. They decide to share future profits 2 : 2 : 1. Calculate each partner\'s sacrifice or gain, and the sacrificing and gaining ratios.',
  model: `Common denominator ${ABC.L}:\n\n${changeTable(ABC)}\n\n- **Arjun is the only sacrificing partner** (${ABC.by.Arjun.diff}).\n- Bela gains ${ABC.by.Bela.diff.abs()} (= ${ABC.by.Bela.diff.abs().over(ABC.L)}) and Chirag gains ${ABC.by.Chirag.diff.abs()}.\n- **Gaining ratio (Bela : Chirag) = ${fmtRatio(ABC.gainRatio)}**. Check: ${ABC.by.Bela.diff.abs().over(ABC.L)} + ${ABC.by.Chirag.diff.abs().over(ABC.L)} = ${ABC.by.Arjun.diff.over(ABC.L)}, equal to Arjun's sacrifice.`,
  sol: 'Bring old and new shares to one denominator (30), subtract, and read the signs.',
  scheme: [['Old and new shares over a common denominator', 1], ['Sacrifice of Arjun and gains of Bela and Chirag', 1], ['Gaining ratio 2 : 1 with the check', 1]],
}));
const DGH = { old: [2, 2, 1], part: fr(1, 4) };
const DGHo = [fr(2, 5), fr(2, 5), fr(1, 5)];
const DGHgive = DGHo[0].mul(DGH.part);
const DGHnew = [DGHo[0].sub(DGHgive), DGHo[1].add(DGHgive.mul(fr(1, 2))), DGHo[2].add(DGHgive.mul(fr(1, 2)))];
const DGHch = changes(['Dev', 'Gauri', 'Harsh'], DGH.old, DGHnew);
expect([DGHch.newInts, DGHch.gainRatio, `${DGHgive}`], [[6, 9, 5], [1, 1], '1/10'], 'DGH');
Q('s3_surrender', short({
  t: 1, d: 3, c: 'application', marks: 3,
  stem: 'Dev, Gauri and Harsh are partners in an imagined solar-panel installation firm in Pune sharing profits 2 : 2 : 1. Dev wants to spend more time on another venture and surrenders one-fourth of his share, which Gauri and Harsh take equally. Calculate the new profit-sharing ratio and the gaining ratio.',
  model: `1. Dev's share surrendered = 1/4 × 2/5 = **${DGHgive}**; Gauri and Harsh each take ${DGHgive.mul(fr(1, 2))}.\n2. New shares: Dev 2/5 − 1/10 = **${DGHnew[0]}**; Gauri 2/5 + 1/20 = **${DGHnew[1]}**; Harsh 1/5 + 1/20 = **${DGHnew[2]}**.\n3. Over 20: ${DGHnew.map((f) => f.over(20)).join(', ')} → **new ratio ${fmtRatio(DGHch.newInts)}**.\n4. Gains: Gauri ${DGHch.by.Gauri.diff.abs()}, Harsh ${DGHch.by.Harsh.diff.abs()} → **gaining ratio ${fmtRatio(DGHch.gainRatio)}**.`,
  sol: 'Find the fraction surrendered, split it equally, add to the takers\' old shares, then reduce.',
  scheme: [['Share surrendered and its split', 1], ['New shares of all three partners', 1], ['New ratio 6 : 9 : 5 and gaining ratio 1 : 1', 1]],
}));
Q('s3_sac_vs_gain', short({
  t: 1, d: 2, c: 'understanding', marks: 3,
  stem: 'Distinguish between the sacrificing ratio and the gaining ratio on three bases.',
  model: '| Basis | Sacrificing ratio | Gaining ratio |\n|---|---|---|\n| Meaning | Ratio in which partners **give up** part of their shares | Ratio in which partners **acquire** additional shares |\n| Formula | **Old ratio − new ratio** | **New ratio − old ratio** |\n| Use | Shows how the **compensation received** (for goodwill) is shared among sacrificing partners | Shows how the **compensation paid** is shared among gaining partners |',
  sol: 'Meaning, formula and purpose, each contrasted in a table.',
  scheme: [['Meaning', 1], ['Formula', 1], ['Purpose (who receives or pays compensation)', 1]],
}));
Q('mt_terms', match({
  t: [1, 2, 3], d: 2, c: 'understanding', marks: 2,
  stem: 'Match each term in column I with its correct description in column II.',
  pairs: [
    ['Sacrificing ratio', 'Old ratio minus new ratio'],
    ['Gaining ratio', 'New ratio minus old ratio'],
    ['Revaluation account', 'Records changes in the values of assets and liabilities'],
    ['Accounting Standard 26', 'Goodwill is recorded only when purchased for a consideration'],
  ],
  sol: 'The two ratios are mirror images; the revaluation account carries changes in book values; AS 26 forbids recording self-generated goodwill.',
}));
Q('m_reasons', mcq({
  t: 1, d: 1, c: 'understanding',
  stem: 'Which of the following is a likely reason for the existing partners of a firm to change their profit-sharing ratio?',
  opts: ['One partner will now give less time to the business because of other commitments', 'The firm has bought a new delivery van on credit', 'The bank has raised the interest rate on the firm\'s loan', 'A customer has paid an old debt that was overdue'],
  sol: 'A change in the partners\' roles, time, skill or capital is a reason to reshare profits. Buying an asset, a change in loan interest or the recovery of a debt are ordinary transactions.',
}));

// ================================================================ t02 Goodwill on change in ratio
Q('m_as26', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'According to Accounting Standard 26 (Intangible Assets), a firm may record goodwill in its books only when it is',
  opts: ['purchased for a consideration in money or money\'s worth', 'valued by the partners at the time of a change in ratio', 'built up by the firm\'s own reputation over many years', 'agreed upon by a majority of the partners'],
  sol: 'Only purchased goodwill is recorded. Self-generated goodwill, even if the partners value it, is not raised in the books; its value is used only to pass the adjustment entry.',
}));
Q('m_gw_entry', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'On a change in the profit-sharing ratio, the journal entry to adjust goodwill (no goodwill account in the books) is',
  opts: ['Gaining partners\' Capital A/cs Dr. To Sacrificing partners\' Capital A/cs', 'Sacrificing partners\' Capital A/cs Dr. To Gaining partners\' Capital A/cs', 'Goodwill A/c Dr. To All partners\' Capital A/cs (new ratio)', 'All partners\' Capital A/cs Dr. To Goodwill A/c (new ratio)'],
  sol: 'The gaining partners pay for the extra share they receive, so their capitals are debited; the sacrificing partners are compensated, so their capitals are credited. No goodwill account is opened.',
}));
Q('m_gw_existing', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Goodwill already appearing in the balance sheet at the time the partners change their ratio is',
  opts: ['written off among all the partners in their old ratio', 'written off among all the partners in their new ratio', 'kept in the books at its old value', 'credited to the gaining partners in their gaining ratio'],
  sol: 'Old goodwill belongs to the period of the old ratio, so it is written off in that ratio: Partners\' Capital A/cs Dr. To Goodwill A/c.',
}));
const OP = { ch: changes(['Ojas', 'Pia'], [2, 1], [1, 1]), gw: 90000 };
const OPadj = adjust(OP.ch, OP.gw);
expect(OPadj.value, 15000, 'OP');
Q('m_gw_amt', mcq({
  t: 2, d: 2, c: 'application',
  stem: `Ojas and Pia share profits 2 : 1 in an imagined pottery studio in Khurja and decide to share equally. The firm's goodwill is valued at ${inr(OP.gw)}. The goodwill adjustment entry is for`,
  opts: [`${inr(OPadj.value)}, debited to Pia and credited to Ojas`, `${inr(OPadj.value)}, debited to Ojas and credited to Pia`, `${inr(OPadj.value * 2)}, debited to Pia and credited to Ojas`, `${inr(OPadj.value * 3)}, debited to Pia and credited to Ojas`],
  sol: `Ojas sacrifices 2/3 − 1/2 = ${OP.ch.by.Ojas.diff}; Pia gains the same. ${amt(OP.gw)} × ${OP.ch.by.Ojas.diff} = ${amt(OPadj.value)}: Pia (gainer) is debited.`,
}));
const ABC2 = changes(['Asif', 'Bina', 'Chetan'], [3, 3, 2], [4, 2, 2]);
expect([`${ABC2.by.Asif.diff}`, `${ABC2.by.Bina.diff}`, `${ABC2.by.Chetan.diff}`], ['-1/8', '1/8', '0'], 'ABC2');
Q('m_gw_unaffected', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'Asif, Bina and Chetan share profits 3 : 3 : 2 and change to 4 : 2 : 2. Goodwill is to be adjusted without opening a goodwill account. Whose capital account is NOT affected by the goodwill adjustment entry?',
  opts: ['Chetan\'s', 'Asif\'s', 'Bina\'s', 'None: all three capital accounts are affected'],
  sol: 'Over 8: Asif 3 → 4 gains 1/8, Bina 3 → 2 sacrifices 1/8, Chetan 2 → 2 no change. Only Asif (debited) and Bina (credited) appear in the entry.',
}));
const RS2 = { ch: changes(['Ritu', 'Sahil'], [5, 3], [1, 1]), gw: 240000 };
const RS2adj = adjust(RS2.ch, RS2.gw);
expect(RS2adj.by, { Ritu: 30000, Sahil: -30000 }, 'RS2');
Q('num_gw_two', num({
  t: 2, d: 2, c: 'application', marks: 1, value: RS2adj.by.Ritu, unit: '₹',
  stem: `Ritu and Sahil, partners in an imagined coaching centre in Kota, share profits 5 : 3. They decide to share profits equally from 1 April. The goodwill of the firm is valued at ${inr(RS2.gw)}. By how much will Ritu's capital account be credited for goodwill? (Answer in ₹.)`,
  sol: `Step 1: Ritu's sacrifice = 5/8 − 4/8 = ${RS2.ch.by.Ritu.diff}.\nStep 2: ${amt(RS2.gw)} × ${RS2.ch.by.Ritu.diff} = ${amt(RS2adj.by.Ritu)}. So ${inr(RS2adj.by.Ritu)}.`,
}));
const IJK = { ch: changes(['Ishita', 'Jatin', 'Kunal'], [3, 2, 1], [1, 3, 2]), gw: 120000 };
const IJKadj = adjust(IJK.ch, IJK.gw);
expect(IJKadj.by, { Ishita: 40000, Jatin: -20000, Kunal: -20000 }, 'IJK');
Q('num_gw_three', num({
  t: 2, d: 3, c: 'application', marks: 1, value: IJKadj.by.Ishita, unit: '₹',
  stem: `Ishita, Jatin and Kunal own an imagined bicycle-repair chain in Chandigarh and share profits 3 : 2 : 1. They agree on a new ratio of 1 : 3 : 2 and value goodwill at ${inr(IJK.gw)}. What total amount will be credited to Ishita's capital account for goodwill? (Answer in ₹.)`,
  sol: `Step 1: Ishita's sacrifice = 3/6 − 1/6 = ${IJK.ch.by.Ishita.diff}; Jatin and Kunal gain 1/6 each.\nStep 2: ${amt(IJK.gw)} × ${IJK.ch.by.Ishita.diff} = ${amt(IJKadj.by.Ishita)}, paid ${amt(-IJKadj.by.Jatin)} each by Jatin and Kunal. So ${inr(IJKadj.by.Ishita)}.`,
}));
Q('tf_gw_raise', tf({
  t: 2, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? Under Accounting Standard 26, when partners change their ratio, a goodwill account is opened in the books at the full value of the firm\'s goodwill.',
  sol: 'Self-generated goodwill cannot be recorded. The valuation is used only for an adjustment entry between the gaining and sacrificing partners\' capital accounts.',
}));
Q('fb_gw_ratio', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'Goodwill already shown in the balance sheet is written off among all the partners in their ___ ratio when the profit-sharing ratio changes.',
  acc: [['old']],
  sol: 'It is written off in the old ratio, because it arose while the old ratio applied.',
}));
Q('ar_gw_b', ar({
  t: 2, d: 3, c: 'analysis', key: 'b',
  a: 'On a change in the profit-sharing ratio, the gaining partners compensate the sacrificing partners for their share of goodwill.',
  r: 'Goodwill is an intangible asset: it cannot be seen or touched.',
  sol: 'Both are true. But the compensation is paid because the gainers will enjoy a larger share of future profits that goodwill helps earn, not because goodwill is intangible, so R does not explain A.',
}));
Q('ar_gw_c', ar({
  t: 2, d: 2, c: 'understanding', key: 'c',
  a: 'When the partners\' capitals are fixed, the goodwill adjustment on a change in ratio is made through their current accounts.',
  r: 'Accounting Standard 26 allows a firm to record goodwill that it has generated itself.',
  sol: 'A is true: under fixed capitals all adjustments go through current accounts. R is false: AS 26 permits only purchased goodwill to be recorded.',
}));
const KLM2 = { ch: changes(['Kavya', 'Lalit', 'Mira'], [5, 3, 2], [2, 3, 5]), gw: 150000 };
const KLM2adj = adjust(KLM2.ch, KLM2.gw);
expect(KLM2adj.by, { Kavya: 45000, Lalit: 0, Mira: -45000 }, 'KLM2');
Q('s3_gw_three', short({
  t: 2, d: 3, c: 'application', marks: 3,
  stem: `Kavya, Lalit and Mira are partners in an imagined organic-farm business near Nashik, sharing profits 5 : 3 : 2. From 1 April 2026 they will share 2 : 3 : 5. The firm's goodwill is valued at ${inr(KLM2.gw)}. Pass the journal entry for goodwill, showing your working.`,
  model: `${changeTable(KLM2.ch)}\n\nMira's gain ${KLM2.ch.by.Mira.diff.abs()} × ${amt(KLM2.gw)} = **${inr(-KLM2adj.by.Mira)}**, paid to Kavya.\n\n${journal([je(KLM2adj.debit.map(([n, v]) => [cap(n), v]), KLM2adj.credit.map(([n, v]) => [cap(n), v]), "Mira's gain of 3/10 adjusted with Kavya on the change to 2 : 3 : 5")])}\n\nLalit's share is unchanged, so his capital is not affected.`,
  sol: 'Find each partner\'s change, multiply the gain by goodwill, and debit the gainer to credit the sacrificer.',
  scheme: [['Sacrifice and gain worked out (Lalit unaffected)', 1], ['Amount 45,000', 1], ['Correct journal entry with narration', 1]],
}));
const NO2 = { ch: changes(['Nikhil', 'Oorja'], [3, 1], [1, 1]), books: 40000, gw: 80000 };
const NO2off = split(NO2.books, NO2.ch.names, [3, 1]);
const NO2adj = adjust(NO2.ch, NO2.gw);
expect([NO2off, NO2adj.by], [{ Nikhil: 30000, Oorja: 10000 }, { Nikhil: 20000, Oorja: -20000 }], 'NO2');
Q('s3_gw_existing', short({
  t: 2, d: 3, c: 'application', marks: 3,
  stem: `Nikhil and Oorja run an imagined café in Kochi and share profits 3 : 1. Their balance sheet shows goodwill of ${inr(NO2.books)}. They now decide to share profits equally, and goodwill is valued at ${inr(NO2.gw)}. Pass the necessary journal entries.`,
  model: `Nikhil sacrifices 3/4 − 1/2 = ${NO2.ch.by.Nikhil.diff}; Oorja gains ${NO2.ch.by.Oorja.diff.abs()}.\n\n${journal([
    je(NO2.ch.names.map((n) => [cap(n), NO2off[n]]), [['Goodwill A/c', NO2.books]], 'goodwill in the books of Nikhil and Oorja written off in the old ratio 3 : 1'),
    je([[cap('Oorja'), -NO2adj.by.Oorja]], [[cap('Nikhil'), NO2adj.by.Nikhil]], `Oorja's gain of 1/4 of goodwill of ${amt(NO2.gw)} credited to Nikhil`),
  ])}`,
  sol: 'Write off the book goodwill in the old ratio first; then adjust the new valuation through the capital accounts.',
  scheme: [['Existing goodwill written off in old ratio', 1], ['Sacrifice and gain worked out', 1], ['Adjustment entry 20,000', 1]],
}));
const PQ = { ch: changes(['Pallavi', 'Qasim'], [1, 1], [3, 2]), gw: 210000 };
const PQadj = adjust(PQ.ch, PQ.gw);
expect(PQadj.by, { Pallavi: -21000, Qasim: 21000 }, 'PQ');
Q('s3_gw_fixed', short({
  t: 2, d: 3, c: 'application', marks: 3,
  stem: `Pallavi and Qasim are partners in an imagined software-testing firm in Hyderabad. Their capitals are fixed, and they share profits equally. They agree that from now on profits will be shared 3 : 2. The firm's goodwill is valued at ${inr(PQ.gw)}. Pass the journal entry and explain why the current accounts are used.`,
  model: `1. Pallavi: 1/2 − 3/5 = −${PQ.ch.by.Pallavi.diff.abs()} (gain); Qasim: 1/2 − 2/5 = ${PQ.ch.by.Qasim.diff} (sacrifice).\n2. Amount = ${amt(PQ.gw)} × 1/10 = **${inr(PQadj.value)}**.\n\n${journal([je([[cur('Pallavi'), PQadj.value]], [[cur('Qasim'), PQadj.value]], "Pallavi's 1/10 gain of goodwill compensated to Qasim")])}\n\n3. With **fixed capitals**, capital accounts show only the agreed capital; every adjustment (goodwill, reserves, revaluation) passes through the **current accounts**.`,
  sol: 'Gain × goodwill, gainer debited, sacrificer credited, using current accounts because capitals are fixed.',
  scheme: [['Gain and sacrifice', 1], ['Correct entry through current accounts for 21,000', 1], ['Reason: fixed capitals', 1]],
}));
const STU = { ch: changes(['Sanjay', 'Tanvi', 'Uma'], [2, 2, 1], [3, 1, 1]), profits: [60000, 80000, 100000], years: 2 };
const STUavg = sum(STU.profits) / STU.profits.length;
const STUgw = STUavg * STU.years;
const STUadj = adjust(STU.ch, STUgw);
expect([STUavg, STUgw, STUadj.by], [80000, 160000, { Sanjay: -32000, Tanvi: 32000, Uma: 0 }], 'STU');
Q('l4_gw_avg', long({
  t: 2, d: 3, c: 'application', marks: 4, time: L4,
  stem: `Sanjay, Tanvi and Uma share profits 2 : 2 : 1 in an imagined spice-export firm in Guntur. From 1 April 2026 they agree to share 3 : 1 : 1. Goodwill is to be valued at ${STU.years} years' purchase of the average profit of the last three years, which were ${STU.profits.map(inr).join(', ')}. Calculate the goodwill and pass the journal entry for its adjustment.`,
  model: `1. Average profit = (${STU.profits.map(amt).join(' + ')}) ÷ 3 = **${inr(STUavg)}**.\n2. Goodwill = ${amt(STUavg)} × ${STU.years} = **${inr(STUgw)}**.\n3. Changes over 5: Sanjay 2/5 → 3/5 gains ${STU.ch.by.Sanjay.diff.abs()}; Tanvi 2/5 → 1/5 sacrifices ${STU.ch.by.Tanvi.diff}; Uma 1/5 → 1/5 no change.\n4. Amount = ${amt(STUgw)} × 1/5 = **${inr(STUadj.value)}**.\n\n${journal([je([[cap('Sanjay'), STUadj.value]], [[cap('Tanvi'), STUadj.value]], "Sanjay's gain of 1/5 of goodwill compensated to Tanvi")])}`,
  sol: 'Average the three profits, multiply by the years of purchase, then apply the gain or sacrifice.',
  scheme: [['Average profit', 1], ['Goodwill 1,60,000', 1], ['Gain and sacrifice', 1], ['Journal entry 32,000', 1]],
}));
const VWY = { ch: changes(['Vikram', 'Wahida', 'Yash'], [3, 2, 1], [1, 1, 1]), capital: 500000, rate: 10, avg: 80000, years: 3 };
const VWYnormal = (VWY.capital * VWY.rate) / 100;
const VWYsuper = VWY.avg - VWYnormal;
const VWYgw = VWYsuper * VWY.years;
const VWYadj = adjust(VWY.ch, VWYgw);
expect([VWYnormal, VWYsuper, VWYgw, VWYadj.by], [50000, 30000, 90000, { Vikram: 15000, Wahida: 0, Yash: -15000 }], 'VWY');
Q('l4_gw_super', long({
  t: 2, d: 4, c: 'analysis', marks: 4, time: L4,
  stem: `Vikram, Wahida and Yash run an imagined handloom store in Varanasi and share profits 3 : 2 : 1. They decide to share profits equally in future. The firm's capital employed is ${inr(VWY.capital)}, the normal rate of return in this business is ${VWY.rate}% and the average profit is ${inr(VWY.avg)}. Goodwill is to be valued at ${VWY.years} years' purchase of super profit. Value the goodwill, identify the partners affected and pass the adjustment entry.`,
  model: `1. Normal profit = ${amt(VWY.capital)} × ${VWY.rate}% = **${inr(VWYnormal)}**; super profit = ${amt(VWY.avg)} − ${amt(VWYnormal)} = **${inr(VWYsuper)}**.\n2. Goodwill = ${amt(VWYsuper)} × ${VWY.years} = **${inr(VWYgw)}**.\n3. Over 6: Vikram 3/6 → 2/6 sacrifices ${VWY.ch.by.Vikram.diff}; Wahida 2/6 → 2/6 unaffected; Yash 1/6 → 2/6 gains ${VWY.ch.by.Yash.diff.abs()}.\n\n${journal([je([[cap('Yash'), -VWYadj.by.Yash]], [[cap('Vikram'), VWYadj.by.Vikram]], "Yash's 1/6 gain of goodwill credited to Vikram; Wahida unaffected")])}`,
  sol: 'Super profit = average − normal; multiply by years of purchase; only the partners whose shares change enter the entry.',
  scheme: [['Normal and super profit', 1], ['Goodwill 90,000', 1], ['Wahida identified as unaffected; Vikram and Yash shares', 1], ['Entry 15,000', 1]],
}));
const ZAB = { names: ['Zoya', 'Aman', 'Bhavna'], old: [5, 3, 2], take: fr(1, 10), gw: 200000, books: 25000 };
const ZABnew = [fr(5, 10).sub(ZAB.take), fr(3, 10), fr(2, 10).add(ZAB.take)];
const ZABch = changes(ZAB.names, ZAB.old, ZABnew);
const ZABoff = split(ZAB.books, ZAB.names, ZAB.old);
const ZABadj = adjust(ZABch, ZAB.gw);
expect([ZABch.newInts, ZABoff, ZABadj.by], [[4, 3, 3], { Zoya: 12500, Aman: 7500, Bhavna: 5000 }, { Zoya: 20000, Aman: 0, Bhavna: -20000 }], 'ZAB');
Q('l4_ratio_gw', long({
  t: [1, 2], d: 3, c: 'application', marks: 4, time: L4,
  stem: `Zoya, Aman and Bhavna share profits 5 : 3 : 2 in an imagined interior-design firm in Jaipur. Bhavna has taken charge of the firm's new branch, so it is agreed that she will take 1/10 of the firm's profit from Zoya's share. Goodwill of ${inr(ZAB.books)} appears in the books, and the firm's goodwill is now valued at ${inr(ZAB.gw)}. Calculate the new ratio and pass the journal entries.`,
  model: `1. New shares: Zoya 5/10 − 1/10 = ${ZABnew[0]}; Aman ${ZABnew[1]}; Bhavna 2/10 + 1/10 = ${ZABnew[2]} → **new ratio ${fmtRatio(ZABch.newInts)}**.\n2. Only Zoya sacrifices (1/10) and only Bhavna gains (1/10).\n\n${journal([
    je(ZAB.names.map((n) => [cap(n), ZABoff[n]]), [['Goodwill A/c', ZAB.books]], 'old goodwill of the Jaipur firm written off in 5 : 3 : 2'),
    je([[cap('Bhavna'), ZABadj.value]], [[cap('Zoya'), ZABadj.value]], `Bhavna's 1/10 gain of goodwill of ${amt(ZAB.gw)} credited to Zoya`),
  ])}`,
  sol: 'New ratio from the share taken; old goodwill written off in the old ratio; new goodwill adjusted for the 1/10 transfer.',
  scheme: [['New ratio 4 : 3 : 3', 1], ['Existing goodwill written off in old ratio', 1], ['Sacrifice and gain identified', 1], ['Adjustment entry 20,000', 1]],
}));
Q('m_gw_why', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Why must a gaining partner compensate a sacrificing partner for goodwill when their ratio changes?',
  opts: ['The gaining partner will now receive a larger share of future profits that the firm\'s established reputation helps to earn', 'The gaining partner has to buy the firm\'s physical assets from the sacrificing partner', 'Goodwill must be shown in the balance sheet at its full value after every change', 'The sacrificing partner is leaving the firm and must be paid off'],
  sol: 'Goodwill is the value of expected future super profits. A larger future share means the gainer acquires part of that value from the sacrificer, so compensation is due. No asset is sold and no partner leaves.',
}));

// ================================================================ t03 Revaluation, reserves and accumulated profits
Q('m_reval_nature', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'The revaluation account prepared on a change in the profit-sharing ratio is a',
  opts: ['nominal account', 'real account', 'personal account', 'memorandum statement that is never closed'],
  sol: 'It records gains and losses from revaluing assets and liabilities and is closed by transferring its balance to the partners, so it is a nominal account.',
}));
Q('m_reval_ratio', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'On a change in the profit-sharing ratio among existing partners, a profit on revaluation is shared among the partners in their',
  opts: ['old ratio', 'new ratio', 'sacrificing ratio', 'gaining ratio'],
  sol: 'The change in value took place while the old ratio applied, so the gain or loss belongs to the partners in the old ratio.',
}));
Q('m_reval_side', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Which of the following is **credited** to the revaluation account?',
  opts: ['An increase in the value of land', 'A decrease in the value of furniture', 'An unrecorded electricity bill now brought into the books', 'An increase in the provision for doubtful debts'],
  sol: 'Gains are credited: a rise in an asset\'s value. A fall in an asset, a new liability and a larger provision are losses, so they are debited.',
}));
Q('m_unrec_liab', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'While changing their ratio, the partners find an outstanding salary bill that was never recorded. In the revaluation account, this bill is',
  opts: ['debited, because a new liability reduces the firm\'s net worth', 'credited, because liabilities appear on the right side of the balance sheet', 'ignored, because outstanding expenses are paid within the year', 'credited to the partners\' capital accounts directly in the new ratio'],
  sol: 'Bringing in a liability is a loss to the owners, so it is debited to the revaluation account (Revaluation A/c Dr. To Outstanding Salary A/c).',
}));
const PDD = { debtors: 100000, existing: 3000, rate: 5 };
const PDDnew = (PDD.debtors * PDD.rate) / 100;
const PDDinc = PDDnew - PDD.existing;
expect([PDDnew, PDDinc], [5000, 2000], 'PDD');
Q('m_pdd', mcq({
  t: 3, d: 3, c: 'application',
  stem: `An imagined firm's debtors are ${inr(PDD.debtors)} and the existing provision for doubtful debts is ${inr(PDD.existing)}. On a change in ratio, the partners decide to keep the provision at ${PDD.rate}% of debtors. The effect on the revaluation account is`,
  opts: [`${inr(PDDinc)} debited`, `${inr(PDDnew)} debited`, `${inr(PDDinc)} credited`, `${inr(PDDnew + PDD.existing)} debited`],
  sol: `Required provision = ${PDD.rate}% of ${amt(PDD.debtors)} = ${amt(PDDnew)}; only the increase of ${amt(PDDnew)} − ${amt(PDD.existing)} = ${amt(PDDinc)} is a new loss, debited to revaluation.`,
}));
Q('m_gr', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Partners change their ratio and do not wish to keep the general reserve in the books. The general reserve is',
  opts: ['transferred to the partners\' capital accounts in the old ratio', 'transferred to the partners\' capital accounts in the new ratio', 'transferred to the revaluation account', 'kept in the books and shared in the gaining ratio'],
  sol: 'A reserve is profit set aside in earlier years, when the old ratio applied: General Reserve A/c Dr. To Partners\' Capital A/cs (old ratio).',
}));
const W1 = wcr(30000, 12000);
expect(W1.toPartners, 18000, 'W1');
Q('m_wcr_less', mcq({
  t: 3, d: 3, c: 'application',
  stem: `An imagined firm has a workmen compensation reserve of ${inr(W1.reserve)}. On a change in the partners' ratio, a claim of ${inr(W1.claim)} is expected. The amount to be shared among the partners in their old ratio is`,
  opts: [inr(W1.toPartners), inr(W1.reserve), inr(W1.claim), 'nil'],
  sol: `The claim of ${amt(W1.claim)} goes to a provision for the claim; the rest, ${amt(W1.reserve)} − ${amt(W1.claim)} = ${amt(W1.toPartners)}, belongs to the partners in the old ratio.`,
}));
const W2 = wcr(20000, 26000);
expect(W2.toReval, 6000, 'W2');
Q('m_wcr_more', mcq({
  t: 3, d: 3, c: 'application',
  stem: `The workmen compensation reserve of an imagined firm is ${inr(W2.reserve)}, and the claim on account of workmen compensation is ${inr(W2.claim)}. On a change in ratio, the revaluation account will be`,
  opts: [`debited by ${inr(W2.toReval)}`, `credited by ${inr(W2.toReval)}`, `debited by ${inr(W2.claim)}`, 'not affected'],
  sol: `The reserve covers ${amt(W2.reserve)} of the claim; the shortfall of ${amt(W2.claim)} − ${amt(W2.reserve)} = ${amt(W2.toReval)} is a loss, debited to revaluation.`,
}));
const I1 = ifr(15000, 100000, 92000);
expect([I1.fall, I1.toPartners], [8000, 7000], 'I1');
Q('m_ifr', mcq({
  t: 3, d: 3, c: 'application',
  stem: `An imagined firm holds investments with a book value of ${inr(I1.book)} and an investment fluctuation reserve of ${inr(I1.reserve)}. On a change in ratio, the market value of the investments is ${inr(I1.market)}. The amount credited to the partners' capital accounts out of this reserve is`,
  opts: [inr(I1.toPartners), inr(I1.reserve), inr(I1.fall), 'nil'],
  sol: `Fall in value = ${amt(I1.book)} − ${amt(I1.market)} = ${amt(I1.fall)}, met from the reserve; the balance ${amt(I1.reserve)} − ${amt(I1.fall)} = ${amt(I1.toPartners)} goes to the partners in the old ratio.`,
}));
Q('m_pl_debit', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'A debit balance of the profit and loss account appearing in the balance sheet at the time of a change in ratio is',
  opts: ['debited to all partners\' capital accounts in the old ratio', 'credited to all partners\' capital accounts in the old ratio', 'debited to all partners\' capital accounts in the new ratio', 'debited to the revaluation account'],
  sol: 'It is an accumulated loss of the old-ratio period, so the partners bear it in the old ratio: Partners\' Capital A/cs Dr. To Profit and Loss A/c.',
}));
Q('m_single', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Partners change their ratio but want the reserves and the book values of assets and liabilities to stay unchanged. They should',
  opts: ['pass one adjustment entry, debiting the gaining partners and crediting the sacrificing partners for their share of the net accumulated profits', 'distribute the reserves in the new ratio and prepare a revaluation account', 'prepare a revaluation account and keep the reserves in the books', 'pass no entry, because nothing has changed in the books'],
  sol: 'Without changing book figures, fairness is restored by one entry: net accumulated profits (or the would-be revaluation result) × each partner\'s sacrifice or gain.',
}));
const RV1d = { building: 30000, stock: 8000, pdd: 2500, inv: 4000, rent: 1500 };
const RV1 = revaluation(['Partner A', 'Partner B'], [1, 1], [['Stock', RV1d.stock], ['Provision for doubtful debts', RV1d.pdd], ['Outstanding rent', RV1d.rent]], [['Building', RV1d.building], ['Investment not recorded earlier', RV1d.inv]]);
const RV1g = RV1d.building + RV1d.inv;
const RV1l = RV1d.stock + RV1d.pdd + RV1d.rent;
expect([RV1g, RV1l, RV1.net], [34000, 12000, 22000], 'RV1');
Q('num_reval', num({
  t: 3, d: 3, c: 'application', marks: 2, value: RV1.net, unit: '₹',
  stem: `On a change in the profit-sharing ratio of an imagined hardware store in Rajkot: the building is revalued upwards by ${inr(RV1d.building)}; stock is reduced by ${inr(RV1d.stock)}; the provision for doubtful debts is raised by ${inr(RV1d.pdd)}; an investment of ${inr(RV1d.inv)} not recorded earlier is brought into the books; and outstanding rent of ${inr(RV1d.rent)} is recorded. Find the profit on revaluation (in ₹).`,
  sol: `Step 1: Gains (credit) = ${amt(RV1d.building)} + ${amt(RV1d.inv)} = ${amt(RV1g)}.\nStep 2: Losses (debit) = ${amt(RV1d.stock)} + ${amt(RV1d.pdd)} + ${amt(RV1d.rent)} = ${amt(RV1l)}.\nStep 3: Profit = ${amt(RV1g)} − ${amt(RV1l)} = ${amt(RV1.net)}. So ${inr(RV1.net)}.`,
  scheme: [['Gains and losses classified', 1], ['Profit 22,000', 1]],
}));
const RST = { names: ['Rajat', 'Seema', 'Tarun'], old: [2, 2, 1], mach: 12000, furn: 6000, land: 3000 };
const RV2 = revaluation(RST.names, RST.old, [['Machinery', RST.mach], ['Furniture', RST.furn]], [['Land', RST.land]]);
expect([RV2.net, RV2.split], [-15000, { Rajat: 6000, Seema: 6000, Tarun: 3000 }], 'RV2');
Q('num_reval_share', num({
  t: 3, d: 3, c: 'application', marks: 1, value: RV2.split.Tarun, unit: '₹',
  stem: `Rajat, Seema and Tarun run an imagined printing unit in Sivakasi and share profits 2 : 2 : 1. They decide to share equally. On revaluation, machinery falls by ${inr(RST.mach)}, furniture falls by ${inr(RST.furn)} and land rises by ${inr(RST.land)}. What amount of the revaluation result is debited to Tarun's capital account? (Answer in ₹.)`,
  sol: `Step 1: Net = ${amt(RST.land)} − (${amt(RST.mach)} + ${amt(RST.furn)}) = −${amt(-RV2.net)}, a loss.\nStep 2: Shared in the old ratio 2 : 2 : 1, Tarun bears 1/5 × ${amt(-RV2.net)} = ${amt(RV2.split.Tarun)}. So ${inr(RV2.split.Tarun)}.`,
}));
const UV = { names: ['Uday', 'Vani'], old: [3, 1] };
const W3 = wcr(40000, 16000);
const W3sp = split(W3.toPartners, UV.names, UV.old);
expect(W3sp, { Uday: 18000, Vani: 6000 }, 'W3');
Q('num_wcr', num({
  t: 3, d: 2, c: 'application', marks: 1, value: W3sp.Uday, unit: '₹',
  stem: `Uday and Vani share profits 3 : 1 in an imagined brick kiln near Meerut and are changing their ratio. The workmen compensation reserve is ${inr(W3.reserve)} and the expected claim is ${inr(W3.claim)}. How much will be credited to Uday's capital account from this reserve? (Answer in ₹.)`,
  sol: `Step 1: Excess of reserve = ${amt(W3.reserve)} − ${amt(W3.claim)} = ${amt(W3.toPartners)}.\nStep 2: Uday's 3/4 share = ${amt(W3sp.Uday)}. So ${inr(W3sp.Uday)}.`,
}));
const I2 = ifr(6000, 80000, 71000);
expect([I2.fall, I2.toReval], [9000, 3000], 'I2');
Q('num_ifr_excess', num({
  t: 3, d: 4, c: 'application', marks: 1, value: I2.toReval, unit: '₹',
  stem: `An imagined firm shows investments at ${inr(I2.book)} and an investment fluctuation reserve of ${inr(I2.reserve)}. When the partners change their ratio, the investments are worth only ${inr(I2.market)}. What amount will be debited to the revaluation account? (Answer in ₹.)`,
  sol: `Step 1: Fall = ${amt(I2.book)} − ${amt(I2.market)} = ${amt(I2.fall)}.\nStep 2: The reserve absorbs ${amt(I2.reserve)}; the rest, ${amt(I2.fall)} − ${amt(I2.reserve)} = ${amt(I2.toReval)}, is a revaluation loss. So ${inr(I2.toReval)}.`,
}));
const XY = { ch: changes(['Xavier', 'Yamini'], [3, 2], [2, 3]), gr: 60000, pl: 15000 };
const XYadj = adjust(XY.ch, XY.gr + XY.pl);
expect(XYadj.value, 15000, 'XY');
Q('num_single', num({
  t: 3, d: 4, c: 'application', marks: 1, value: XYadj.value, unit: '₹',
  stem: `Xavier and Yamini share profits 3 : 2 in an imagined dairy in Anand and change to 2 : 3. Their books show a general reserve of ${inr(XY.gr)} and a credit balance of ${inr(XY.pl)} in the profit and loss account, which they wish to keep in the books. For what amount will the single adjustment entry be passed? (Answer in ₹.)`,
  sol: `Step 1: Accumulated profits kept = ${amt(XY.gr)} + ${amt(XY.pl)} = ${amt(XY.gr + XY.pl)}.\nStep 2: Xavier sacrifices ${XY.ch.by.Xavier.diff}, so ${amt(XY.gr + XY.pl)} × ${XY.ch.by.Xavier.diff} = ${amt(XYadj.value)} (Yamini Dr., Xavier Cr.). So ${inr(XYadj.value)}.`,
}));
Q('tf_reval_new', tf({
  t: 3, d: 1, c: 'understanding', ans: false,
  stem: 'True or false? A profit on revaluation at the time of a change in ratio is shared in the new ratio, because the partners will share future profits in that ratio.',
  sol: 'The rise or fall in values happened before the change, while the old ratio applied, so it is shared in the old ratio.',
}));
Q('tf_wcr_excess', tf({
  t: 3, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? If the workmen compensation claim is more than the workmen compensation reserve, the excess of the claim is debited to the revaluation account.',
  sol: 'The reserve meets the claim as far as it goes; the uncovered part is a loss of the old-ratio period, so it is a revaluation debit.',
}));
Q('tf_ifr_rise', tf({
  t: 3, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? If the market value of investments is higher than their book value, the whole investment fluctuation reserve goes to the partners in the old ratio and the rise in value is credited to the revaluation account.',
  sol: 'No fall needs to be met, so the full reserve is free for the partners, and the increase in the asset is a revaluation gain.',
}));
Q('fb_ifr', fb({
  t: 3, d: 1, c: 'recall',
  stem: 'A fall in the market value of investments is first met out of the ___.',
  acc: [['investment fluctuation reserve', 'investment fluctuation reserve account', 'IFR']],
  sol: 'The investment fluctuation reserve absorbs the fall first; any excess fall is a revaluation loss.',
}));
Q('fb_reval_nominal', fb({
  t: 3, d: 1, c: 'recall',
  stem: 'The revaluation account is a ___ account, closed by transferring its balance to the partners.',
  acc: [['nominal']],
  sol: 'It records gains and losses, so it is a nominal account.',
}));
Q('fb_provision', fb({
  t: 3, d: 1, c: 'recall',
  stem: 'When a workmen compensation claim is expected, the amount of the claim is transferred from the workmen compensation reserve to a ___ for workmen compensation claim.',
  acc: [['provision']],
  sol: 'The claim becomes a liability: Workmen Compensation Reserve A/c Dr. To Provision for Workmen Compensation Claim A/c.',
}));
Q('ar_reserve_a', ar({
  t: 3, d: 3, c: 'analysis', key: 'a',
  a: 'A general reserve appearing in the balance sheet is credited to the partners in their old ratio when the profit-sharing ratio changes.',
  r: 'The reserve was built out of profits earned while the old ratio applied.',
  sol: 'Both are true, and R explains A: profits earned under the old ratio belong to the partners in that ratio.',
}));
Q('ar_reval_c', ar({
  t: 3, d: 2, c: 'understanding', key: 'c',
  a: 'A loss on revaluation at the time of a change in ratio is borne by the partners in their old ratio.',
  r: 'The revaluation account is a real account.',
  sol: 'A is true: the fall in values belongs to the old-ratio period. R is false: the revaluation account is a nominal account.',
}));
Q('mt_treat', match({
  t: 3, d: 2, c: 'understanding', marks: 2,
  stem: 'Match each item in column I with its treatment on a change in the profit-sharing ratio in column II.',
  pairs: [
    ['Increase in the value of land', 'Credited to the revaluation account'],
    ['Repair bill not recorded so far', 'Debited to the revaluation account'],
    ['Debit balance of the profit and loss account', 'Debited to partners\' capital accounts in the old ratio'],
    ['General reserve', 'Credited to partners\' capital accounts in the old ratio'],
  ],
  sol: 'Changes in values go through revaluation (gain credited, loss debited); accumulated profits and losses go straight to the partners in the old ratio.',
}));
const GH = { names: ['Gita', 'Hari'], old: [3, 2], land: 25000, plant: 12000, stock: 6000, repairs: 4000 };
const RV3 = revaluation(GH.names, GH.old, [['Plant', GH.plant], ['Outstanding repairs bill', GH.repairs]], [['Land', GH.land], ['Stock', GH.stock]]);
expect([RV3.net, RV3.split], [15000, { Gita: 9000, Hari: 6000 }], 'RV3');
Q('s3_reval_acc', short({
  t: 3, d: 3, c: 'application', marks: 3,
  stem: `Gita and Hari share profits 3 : 2 in an imagined furniture showroom in Mysuru and decide to share 2 : 3 from 1 April 2026. They agree that: land be appreciated by ${inr(GH.land)}; plant be reduced by ${inr(GH.plant)}; stock be increased by ${inr(GH.stock)}; and an outstanding bill for repairs of ${inr(GH.repairs)} be recorded. Prepare the revaluation account.`,
  model: `${RV3.md}\n\nGain ${inr(RV3.net)} shared in the **old ratio 3 : 2**: Gita ${inr(RV3.split.Gita)}, Hari ${inr(RV3.split.Hari)}.`,
  sol: 'Gains on the credit side, losses on the debit side; the balance is shared in the old ratio, not the new one.',
  scheme: [['Debit side: plant and repairs bill', 1], ['Credit side: land and stock', 1], ['Gain 15,000 shared 9,000 and 6,000 in old ratio', 1]],
}));
const IJK2 = { names: ['Isha', 'Jay', 'Kriti'], old: [3, 2, 1], gr: 36000, pld: 12000 };
const IJK2gr = split(IJK2.gr, IJK2.names, IJK2.old);
const IJK2pl = split(IJK2.pld, IJK2.names, IJK2.old);
expect([IJK2gr, IJK2pl], [{ Isha: 18000, Jay: 12000, Kriti: 6000 }, { Isha: 6000, Jay: 4000, Kriti: 2000 }], 'IJK2');
Q('s3_reserves', short({
  t: 3, d: 3, c: 'application', marks: 3,
  stem: `Isha, Jay and Kriti are partners in an imagined bakery chain in Dehradun sharing profits 3 : 2 : 1. They decide to share equally from 1 April 2026. Their balance sheet shows a general reserve of ${inr(IJK2.gr)} and a debit balance of ${inr(IJK2.pld)} in the profit and loss account. Pass journal entries, if the partners do not want to keep these items in the books.`,
  model: journal([
    je([['General Reserve A/c', IJK2.gr]], IJK2.names.map((n) => [cap(n), IJK2gr[n]]), 'general reserve of the Dehradun bakery credited to Isha, Jay and Kriti in 3 : 2 : 1'),
    je(IJK2.names.map((n) => [cap(n), IJK2pl[n]]), [['Profit and Loss A/c', IJK2.pld]], 'accumulated loss of the Dehradun bakery borne in 3 : 2 : 1'),
  ]) + '\n\nBoth items belong to the period of the **old ratio**, so they are shared 3 : 2 : 1, not equally.',
  sol: 'Reserve credited and accumulated loss debited to the capitals in the old ratio.',
  scheme: [['General reserve entry in old ratio', 1.5], ['Profit and loss debit balance entry in old ratio', 1.5]],
}));
const LM = { names: ['Lakshmi', 'Madhav'], old: [2, 1] };
const W4 = wcr(24000, 15000);
const W4sp = split(W4.toPartners, LM.names, LM.old);
const I3 = ifr(10000, 50000, 46000);
const I3sp = split(I3.toPartners, LM.names, LM.old);
expect([W4sp, I3sp], [{ Lakshmi: 6000, Madhav: 3000 }, { Lakshmi: 4000, Madhav: 2000 }], 'LM');
Q('s3_wcr_ifr', short({
  t: 3, d: 3, c: 'application', marks: 3,
  stem: `Lakshmi and Madhav share profits 2 : 1 in an imagined textile mill in Erode and are changing to an equal ratio. The books show a workmen compensation reserve of ${inr(W4.reserve)} (a claim of ${inr(W4.claim)} is expected) and an investment fluctuation reserve of ${inr(I3.reserve)}. Investments with a book value of ${inr(I3.book)} are now worth ${inr(I3.market)}. Pass the journal entries for the two reserves.`,
  model: journal([
    je([['Workmen Compensation Reserve A/c', W4.reserve]], [['Provision for Workmen Compensation Claim A/c', W4.claim], ...LM.names.map((n) => [cap(n), W4sp[n]])], 'claim provided for at the Erode mill and excess reserve shared 2 : 1'),
    je([['Investment Fluctuation Reserve A/c', I3.reserve]], [['Investments A/c', I3.fall], ...LM.names.map((n) => [cap(n), I3sp[n]])], 'fall in investments met and balance of the reserve shared 2 : 1'),
  ]),
  sol: 'Each reserve first meets its own claim or fall; only what is left goes to the partners in the old ratio.',
  scheme: [['Workmen compensation reserve entry', 1.5], ['Investment fluctuation reserve entry', 1.5]],
}));
const WO = { gr: 50000 };
WO.sp = split(WO.gr, ['first', 'second'], [3, 2]);
expect([WO.sp.first, WO.gr / 2], [30000, 25000], 'WO');
Q('s3_why_old', short({
  t: 3, d: 2, c: 'understanding', marks: 3,
  stem: 'Explain why reserves, accumulated profits and the gain or loss on revaluation are shared in the old ratio when partners change their profit-sharing ratio. Give one example.',
  model: `1. Reserves and accumulated profits were **earned before** the change, while the **old ratio** applied, so they belong to the partners in that ratio.\n2. A gain or loss on revaluation reflects changes in value that **took place before** the change; if it were left in the books it would later be shared in the **new ratio**, unfairly benefiting the gaining partners.\n3. **Example:** a firm of two partners sharing 3 : 2 has a general reserve of ${inr(WO.gr)} and changes to 1 : 1. In the old ratio the first partner should get ${inr(WO.sp.first)}; left undistributed and later shared equally, she would get only ${inr(WO.gr / 2)}.`,
  sol: 'Link each item to the period in which it arose, then show with a small example who would lose otherwise.',
  scheme: [['Reserves and profits belong to the old-ratio period', 1], ['Revaluation reflects pre-change values', 1], ['Correct numerical example', 1]],
}));
const NP = { ch: changes(['Naina', 'Parth'], [2, 1], [1, 2]), gr: 45000, pl: 15000, wcr: 9000 };
const NPnet = NP.gr + NP.pl + NP.wcr;
const NPadj = adjust(NP.ch, NPnet);
expect([NPnet, NPadj.value], [69000, 23000], 'NP');
Q('s3_single_res', short({
  t: 3, d: 4, c: 'application', marks: 3,
  stem: `Naina and Parth share profits 2 : 1 in an imagined pharmacy in Guwahati. From 1 April 2026 they will share 1 : 2. The balance sheet shows a general reserve of ${inr(NP.gr)}, a profit and loss account credit balance of ${inr(NP.pl)} and a workmen compensation reserve of ${inr(NP.wcr)} (no claim is expected). The partners want to keep all these in the books. Pass a single journal entry.`,
  model: `1. Accumulated profits kept = ${amt(NP.gr)} + ${amt(NP.pl)} + ${amt(NP.wcr)} = **${inr(NPnet)}**.\n2. Naina sacrifices 2/3 − 1/3 = ${NP.ch.by.Naina.diff}; Parth gains ${NP.ch.by.Parth.diff.abs()}.\n3. Amount = ${amt(NPnet)} × 1/3 = **${inr(NPadj.value)}**.\n\n${journal([je([[cap('Parth'), NPadj.value]], [[cap('Naina'), NPadj.value]], "Parth's 1/3 gain of the Guwahati pharmacy's reserves adjusted with Naina")])}`,
  sol: 'Total the accumulated profits, multiply by the sacrifice or gain, and debit the gainer.',
  scheme: [['Total accumulated profits 69,000', 1], ['Sacrifice and gain 1/3', 1], ['Single entry 23,000', 1]],
}));
const STU2 = { names: ['Sarita', 'Tejas', 'Usha'], old: [3, 2, 1], building: 300000, bPct: 15, machinery: 180000, mPct: 10, debtors: 90000, pdd: 1500, pddPct: 5, credNot: 6000 };
const STU2b = (STU2.building * STU2.bPct) / 100;
const STU2m = (STU2.machinery * STU2.mPct) / 100;
const STU2p = (STU2.debtors * STU2.pddPct) / 100 - STU2.pdd;
const RV4 = revaluation(STU2.names, STU2.old, [['Machinery', STU2m], ['Provision for doubtful debts', STU2p]], [['Building', STU2b], ['Creditors (amount not payable)', STU2.credNot]]);
expect([STU2b, STU2m, STU2p, RV4.net, RV4.split], [45000, 18000, 3000, 30000, { Sarita: 15000, Tejas: 10000, Usha: 5000 }], 'RV4');
Q('l4_reval_three', long({
  t: 3, d: 3, c: 'application', marks: 4, time: L4,
  stem: `Sarita, Tejas and Usha share profits 3 : 2 : 1 in an imagined pharmacy chain in Indore and decide to share equally. It is agreed that: building (book value ${inr(STU2.building)}) be appreciated by ${STU2.bPct}%; machinery (${inr(STU2.machinery)}) be depreciated by ${STU2.mPct}%; the provision for doubtful debts on debtors of ${inr(STU2.debtors)} be raised from ${inr(STU2.pdd)} to ${STU2.pddPct}%; and creditors include ${inr(STU2.credNot)} that will not be paid. Prepare the revaluation account.`,
  model: `Workings: building ${STU2.bPct}% of ${amt(STU2.building)} = ${amt(STU2b)}; machinery ${STU2.mPct}% of ${amt(STU2.machinery)} = ${amt(STU2m)}; provision ${STU2.pddPct}% of ${amt(STU2.debtors)} = ${amt(STU2p + STU2.pdd)}, less existing ${amt(STU2.pdd)} = ${amt(STU2p)}.\n\n${RV4.md}\n\nGain ${inr(RV4.net)} shared in the old ratio 3 : 2 : 1.`,
  sol: 'Compute each change, put gains (building, creditors written back) on the credit side and losses on the debit side, and share the balance in the old ratio.',
  scheme: [['Workings for building, machinery and provision', 1], ['Debit side', 1], ['Credit side including creditors', 1], ['Gain 30,000 shared 15,000 : 10,000 : 5,000', 1]],
}));
const VW2 = { ch: changes(['Varsha', 'Wamiq'], [3, 2], [2, 3]), land: 40000, plant: 15000, gr: 30000, pld: 5000 };
const VW2reval = VW2.land - VW2.plant;
const VW2net = VW2reval + VW2.gr - VW2.pld;
const VW2adj = adjust(VW2.ch, VW2net);
expect([VW2reval, VW2net, VW2adj.value], [25000, 50000, 10000], 'VW2');
Q('l4_single_combined', long({
  t: 3, d: 4, c: 'application', marks: 4, time: L4,
  stem: `Varsha and Wamiq are partners in an imagined tour company in Udaipur sharing profits 3 : 2. From 1 April 2026 they will share 2 : 3. Revaluation shows that land is worth ${inr(VW2.land)} more and plant ${inr(VW2.plant)} less than book value, but the partners do not want to change the book values. The books also show a general reserve of ${inr(VW2.gr)} and a debit balance of ${inr(VW2.pld)} in the profit and loss account, which they want to keep. Pass a single adjustment entry with working.`,
  model: `| Item | ₹ |\n|---|---:|\n| Net revaluation gain (${amt(VW2.land)} − ${amt(VW2.plant)}) | ${amt(VW2reval)} |\n| Add: general reserve | ${amt(VW2.gr)} |\n| Less: profit and loss debit balance | (${amt(VW2.pld)}) |\n| **Net amount to adjust** | **${amt(VW2net)}** |\n\nVarsha sacrifices 3/5 − 2/5 = ${VW2.ch.by.Varsha.diff}; Wamiq gains ${VW2.ch.by.Wamiq.diff.abs()}. Amount = ${amt(VW2net)} × 1/5 = **${inr(VW2adj.value)}**.\n\n${journal([je([[cap('Wamiq'), VW2adj.value]], [[cap('Varsha'), VW2adj.value]], "Wamiq's 1/5 gain of the net accumulated profits of the Udaipur firm adjusted with Varsha")])}`,
  sol: 'Net the would-be revaluation result with the reserve and the accumulated loss, then apply the sacrifice/gain fraction.',
  scheme: [['Net revaluation gain', 1], ['Net amount 50,000 (loss deducted)', 1], ['Sacrifice and gain', 1], ['Entry 10,000', 1]],
}));
const YZA = { names: ['Yogesh', 'Zainab', 'Abhay'], old: [2, 2, 1] };
const W5 = wcr(50000, 35000);
const W5sp = split(W5.toPartners, YZA.names, YZA.old);
const I4 = ifr(20000, 150000, 162000);
const I4sp = split(I4.toPartners, YZA.names, YZA.old);
const I4rv = split(I4.rise, YZA.names, YZA.old);
expect([W5sp, I4sp, I4.rise, I4rv], [{ Yogesh: 6000, Zainab: 6000, Abhay: 3000 }, { Yogesh: 8000, Zainab: 8000, Abhay: 4000 }, 12000, { Yogesh: 4800, Zainab: 4800, Abhay: 2400 }], 'YZA');
Q('l4_wcr_ifr', long({
  t: 3, d: 3, c: 'application', marks: 4, time: L4,
  stem: `Yogesh, Zainab and Abhay share profits 2 : 2 : 1 in an imagined auto-parts workshop in Faridabad and change to 1 : 2 : 2. Their balance sheet shows a workmen compensation reserve of ${inr(W5.reserve)} and an investment fluctuation reserve of ${inr(I4.reserve)}; investments are shown at ${inr(I4.book)}. The claim for workmen compensation is estimated at ${inr(W5.claim)}, and the market value of investments is ${inr(I4.market)}. Pass the journal entries (no other revaluation item).`,
  model: journal([
    je([['Workmen Compensation Reserve A/c', W5.reserve]], [['Provision for Workmen Compensation Claim A/c', W5.claim], ...YZA.names.map((n) => [cap(n), W5sp[n]])], 'workmen claim provided at the Faridabad workshop, excess shared 2 : 2 : 1'),
    je([['Investment Fluctuation Reserve A/c', I4.reserve]], YZA.names.map((n) => [cap(n), I4sp[n]]), 'whole investment fluctuation reserve shared 2 : 2 : 1 as investments have risen'),
    je([['Investments A/c', I4.rise]], [['Revaluation A/c', I4.rise]], 'rise in the market value of investments recorded'),
    je([['Revaluation A/c', I4.rise]], YZA.names.map((n) => [cap(n), I4rv[n]]), 'revaluation gain of the Faridabad workshop shared 2 : 2 : 1'),
  ]),
  sol: 'Claim provided, excess reserve shared; with a rise in investments the full IFR is free and the rise is a revaluation gain, all in the old ratio.',
  scheme: [['Workmen compensation entry', 1], ['IFR fully distributed', 1], ['Investments increased through revaluation', 1], ['Revaluation gain shared in old ratio', 1]],
}));

// ---------------------------------------------------------------- 6-mark comprehensive items
// l6_full_two: Bhavesh and Chitra 3 : 1 → 1 : 1
const BC = { names: ['Bhavesh', 'Chitra'], old: [3, 1], cap: { Bhavesh: 120000, Chitra: 80000 }, gr: 40000, gw: 80000, land: [150000, 180000], furniture: 40000, fPct: 10, debtors: 60000, pPct: 5, credNot: 2000 };
const BCch = changes(BC.names, BC.old, [1, 1]);
const BCf = (BC.furniture * BC.fPct) / 100;
const BCp = (BC.debtors * BC.pPct) / 100;
const BCrv = revaluation(BC.names, BC.old, [['Furniture', BCf], ['Provision for doubtful debts', BCp]], [['Land', BC.land[1] - BC.land[0]], ['Creditors (no longer payable)', BC.credNot]]);
const BCgr = split(BC.gr, BC.names, BC.old);
const BCgw = adjust(BCch, BC.gw);
const BCcap = capitalAccounts(BC.names,
  [['Balance b/d', BC.cap], ['Revaluation A/c (gain)', BCrv.split], ['General Reserve A/c', BCgr], [cap('Chitra') + ' (goodwill)', { Bhavesh: BCgw.by.Bhavesh }]],
  [[cap('Bhavesh') + ' (goodwill)', { Chitra: -BCgw.by.Chitra }]]);
expect([BCrv.net, BCrv.split, BCgr, BCgw.by, BCcap.closing], [25000, { Bhavesh: 18750, Chitra: 6250 }, { Bhavesh: 30000, Chitra: 10000 }, { Bhavesh: 20000, Chitra: -20000 }, { Bhavesh: 188750, Chitra: 76250 }], 'BC');
Q('l6_full_two', long({
  t: [2, 3], d: 4, c: 'application', marks: 6, time: L6,
  stem: `Bhavesh and Chitra are partners in an imagined stationery business in Patna, sharing profits 3 : 1, with capitals of ${inr(BC.cap.Bhavesh)} and ${inr(BC.cap.Chitra)}. The books show a general reserve of ${inr(BC.gr)}. From 1 April 2026 they agree to share profits equally, and:\n\n1. Goodwill of the firm is valued at ${inr(BC.gw)} (no goodwill account is to be raised).\n2. Land (book value ${inr(BC.land[0])}) is revalued at ${inr(BC.land[1])}.\n3. Furniture of ${inr(BC.furniture)} is depreciated by ${BC.fPct}%.\n4. A provision for doubtful debts of ${BC.pPct}% is created on debtors of ${inr(BC.debtors)}.\n5. Creditors include ${inr(BC.credNot)} that is no longer payable.\n6. The general reserve is not to be kept in the books.\n\nPrepare the revaluation account and the partners' capital accounts.`,
  model: `**Revaluation account**\n\n${BCrv.md}\n\n**Goodwill:** Bhavesh sacrifices 3/4 − 1/2 = ${BCch.by.Bhavesh.diff}; Chitra gains ${BCch.by.Chitra.diff.abs()}; ${amt(BC.gw)} × 1/4 = ${inr(BCgw.value)} (Chitra Dr., Bhavesh Cr.). General reserve in 3 : 1: ${inr(BCgr.Bhavesh)} and ${inr(BCgr.Chitra)}.\n\n${BCcap.md}`,
  sol: 'Revaluation in the old ratio, reserve in the old ratio, goodwill through the capitals in the sacrificing/gaining fraction, then balance each capital.',
  scheme: [['Revaluation account items', 1], ['Revaluation gain 25,000 shared 18,750 : 6,250', 1], ['Goodwill adjustment 20,000', 1], ['General reserve 30,000 : 10,000', 1], ['Capital accounts posted correctly', 1], ['Closing capitals 1,88,750 and 76,250', 1]],
}));
// l6_entries_three: Dinesh, Ekta, Faisal 4 : 3 : 2 → 1 : 1 : 1
const DEF = { names: ['Dinesh', 'Ekta', 'Faisal'], old: [4, 3, 2], gwBooks: 18000, gw: 270000, gr: 45000, wcr: 27000, claim: 9000, building: 36000, stock: 9000 };
const DEFch = changes(DEF.names, DEF.old, [1, 1, 1]);
const DEFoff = split(DEF.gwBooks, DEF.names, DEF.old);
const DEFgw = adjust(DEFch, DEF.gw);
const DEFgr = split(DEF.gr, DEF.names, DEF.old);
const DEFw = wcr(DEF.wcr, DEF.claim);
const DEFwsp = split(DEFw.toPartners, DEF.names, DEF.old);
const DEFrv = revaluation(DEF.names, DEF.old, [['Stock', DEF.stock]], [['Building', DEF.building]]);
expect([DEFoff, DEFgw.by, DEFgr, DEFwsp, DEFrv.split], [{ Dinesh: 8000, Ekta: 6000, Faisal: 4000 }, { Dinesh: 30000, Ekta: 0, Faisal: -30000 }, { Dinesh: 20000, Ekta: 15000, Faisal: 10000 }, { Dinesh: 8000, Ekta: 6000, Faisal: 4000 }, { Dinesh: 12000, Ekta: 9000, Faisal: 6000 }], 'DEF');
Q('l6_entries_three', long({
  t: [2, 3], d: 4, c: 'application', marks: 6, time: L6,
  stem: `Dinesh, Ekta and Faisal share profits 4 : 3 : 2 in an imagined garment-export unit in Tiruppur. From 1 April 2026 they decide to share equally. On that date: goodwill appears in the books at ${inr(DEF.gwBooks)}, and the firm's goodwill is valued at ${inr(DEF.gw)}; there is a general reserve of ${inr(DEF.gr)}; a workmen compensation reserve of ${inr(DEF.wcr)} stands against an expected claim of ${inr(DEF.claim)}; the building is to be appreciated by ${inr(DEF.building)} and stock reduced by ${inr(DEF.stock)}. Pass the journal entries.`,
  model: `Changes over 9: Dinesh 4/9 → 3/9 sacrifices ${DEFch.by.Dinesh.diff}; Ekta 3/9 → 3/9 unaffected; Faisal 2/9 → 3/9 gains ${DEFch.by.Faisal.diff.abs()}. Goodwill adjustment = ${amt(DEF.gw)} × 1/9 = ${inr(DEFgw.value)}.\n\n${journal([
    je(DEF.names.map((n) => [cap(n), DEFoff[n]]), [['Goodwill A/c', DEF.gwBooks]], 'goodwill in the Tiruppur books written off in 4 : 3 : 2'),
    je([[cap('Faisal'), DEFgw.value]], [[cap('Dinesh'), DEFgw.value]], "Faisal's 1/9 gain of goodwill credited to Dinesh"),
    je([['General Reserve A/c', DEF.gr]], DEF.names.map((n) => [cap(n), DEFgr[n]]), 'general reserve of the Tiruppur unit shared 4 : 3 : 2'),
    je([['Workmen Compensation Reserve A/c', DEF.wcr]], [['Provision for Workmen Compensation Claim A/c', DEF.claim], ...DEF.names.map((n) => [cap(n), DEFwsp[n]])], 'claim provided and excess workmen reserve shared 4 : 3 : 2'),
    je([['Building A/c', DEF.building]], [['Revaluation A/c', DEF.building]], 'building appreciated'),
    je([['Revaluation A/c', DEF.stock]], [['Stock A/c', DEF.stock]], 'stock reduced'),
    DEFrv.entry,
  ])}`,
  sol: 'Old goodwill out in the old ratio; new goodwill by gain × value; reserves and the revaluation gain in the old ratio, with the claim provided first.',
  scheme: [['Old goodwill written off', 1], ['Goodwill adjustment 30,000 (Ekta unaffected)', 1], ['General reserve', 1], ['Workmen compensation reserve with provision', 1], ['Revaluation entries for building and stock', 1], ['Revaluation gain 27,000 shared', 1]],
}));
// l6_single_all: Gaurav, Heena, Imran 2 : 2 : 1 → 3 : 2 : 5, nothing changed in the books
const GHI = { names: ['Gaurav', 'Heena', 'Imran'], old: [2, 2, 1], new: [3, 2, 5], gw: 100000, gr: 50000, pl: 20000, land: 30000, mach: 10000, wcr: 15000 };
const GHIch = changes(GHI.names, GHI.old, GHI.new);
const GHIreval = GHI.land - GHI.mach;
const GHIacc = GHI.gr + GHI.pl + GHIreval + GHI.wcr;
const GHItot = GHIacc + GHI.gw;
const GHIadj = adjust(GHIch, GHItot);
expect([GHIreval, GHIacc, GHItot, GHIadj.by], [20000, 105000, 205000, { Gaurav: 20500, Heena: 41000, Imran: -61500 }], 'GHI');
Q('l6_single_all', long({
  t: [2, 3], d: 4, c: 'analysis', marks: 6, time: L6,
  stem: `Gaurav, Heena and Imran share profits 2 : 2 : 1 in an imagined e-bike dealership in Ahmedabad. Imran will now run the business full time, so from 1 April 2026 the ratio becomes 3 : 2 : 5. The partners agree that the books should not be disturbed: no goodwill account, no change in book values and no transfer of reserves. Goodwill is valued at ${inr(GHI.gw)}; land is worth ${inr(GHI.land)} more and machinery ${inr(GHI.mach)} less than book value; the books show a general reserve of ${inr(GHI.gr)}, a profit and loss account credit balance of ${inr(GHI.pl)} and a workmen compensation reserve of ${inr(GHI.wcr)} (no claim). Calculate each partner's sacrifice or gain and pass a single journal entry.`,
  model: `**Net amount to adjust**\n\n| Item | ₹ |\n|---|---:|\n| Goodwill | ${amt(GHI.gw)} |\n| General reserve | ${amt(GHI.gr)} |\n| Profit and loss (credit) | ${amt(GHI.pl)} |\n| Net revaluation gain (${amt(GHI.land)} − ${amt(GHI.mach)}) | ${amt(GHIreval)} |\n| Workmen compensation reserve (no claim) | ${amt(GHI.wcr)} |\n| **Total** | **${amt(GHItot)}** |\n\n${changeTable(GHIch)}\n\n| Partner | Share of change × ${amt(GHItot)} | Effect |\n|---|---:|---|\n${GHI.names.map((n) => `| ${n} | ${amt(Math.abs(GHIadj.by[n]))} | ${GHIadj.by[n] > 0 ? 'Credit' : 'Debit'} |`).join('\n')}\n\n${journal([je(GHIadj.debit.map(([n, v]) => [cap(n), v]), GHIadj.credit.map(([n, v]) => [cap(n), v]), "Imran's 3/10 gain adjusted with Gaurav (1/10) and Heena (2/10) for goodwill, reserves and revaluation")])}`,
  sol: 'Add goodwill to all accumulated profits and the would-be revaluation gain; one entry of each partner\'s change × the total replaces all separate entries.',
  scheme: [['Total of goodwill, reserves and revaluation 2,05,000', 1.5], ['Sacrifices of Gaurav and Heena, gain of Imran', 1.5], ['Amounts 20,500, 41,000 and 61,500', 1.5], ['Single journal entry', 1.5]],
}));
// l6_bs: Jyoti and Karan 1 : 1 → 3 : 2, with balance sheet
const JK = { names: ['Jyoti', 'Karan'], old: [1, 1], new: [3, 2], cash: 20000, debtors: 60000, stock: 50000, inv: 40000, mach: 120000, cred: 50000, gr: 30000, ifr: 10000, cap: { Jyoti: 100000, Karan: 100000 }, mPct: 10, stockNew: 56000, pPct: 5, invMkt: 36000, gw: 120000 };
const JKch = changes(JK.names, JK.old, JK.new);
const JKold = balanceSheet('Balance sheet as at 31 March 2026 (before the change)', [['Creditors', JK.cred], ['General reserve', JK.gr], ['Investment fluctuation reserve', JK.ifr], ["Jyoti's capital", JK.cap.Jyoti], ["Karan's capital", JK.cap.Karan]], [['Cash at bank', JK.cash], ['Debtors', JK.debtors], ['Stock', JK.stock], ['Investments', JK.inv], ['Machinery', JK.mach]]);
const JKm = (JK.mach * JK.mPct) / 100;
const JKp = (JK.debtors * JK.pPct) / 100;
const JKi = ifr(JK.ifr, JK.inv, JK.invMkt);
const JKrv = revaluation(JK.names, JK.old, [['Machinery', JKm], ['Provision for doubtful debts', JKp]], [['Stock', JK.stockNew - JK.stock]]);
const JKgr = split(JK.gr, JK.names, JK.old);
const JKifr = split(JKi.toPartners, JK.names, JK.old);
const JKgw = adjust(JKch, JK.gw);
const JKcap = capitalAccounts(JK.names,
  [['Balance b/d', JK.cap], ['General Reserve A/c', JKgr], ['Investment Fluctuation Reserve A/c', JKifr], [cap('Jyoti') + ' (goodwill)', { Karan: JKgw.by.Karan }]],
  [['Revaluation A/c (loss)', JKrv.split], [cap('Karan') + ' (goodwill)', { Jyoti: -JKgw.by.Jyoti }]]);
const JKnew = balanceSheet('Balance sheet as at 1 April 2026 (after the change)', [['Creditors', JK.cred], ["Jyoti's capital", JKcap.closing.Jyoti], ["Karan's capital", JKcap.closing.Karan]], [['Cash at bank', JK.cash], [`Debtors ${amt(JK.debtors)} less provision ${amt(JKp)}`, JK.debtors - JKp], ['Stock', JK.stockNew], ['Investments', JK.invMkt], ['Machinery', JK.mach - JKm]]);
expect([JKold.total, JKrv.net, JKi.toPartners, JKgw.by, JKcap.closing, JKnew.total], [290000, -9000, 6000, { Jyoti: -12000, Karan: 12000 }, { Jyoti: 101500, Karan: 125500 }, 277000], 'JK');
Q('l6_bs', long({
  t: [2, 3], d: 4, c: 'application', marks: 6, time: L6,
  stem: `Jyoti and Karan run an imagined flour mill in Bathinda and share profits equally. Their balance sheet on 31 March 2026 is given below.\n\n${JKold.md}\n\nFrom 1 April 2026 they will share profits 3 : 2. It is agreed that: machinery be depreciated by ${JK.mPct}%; stock be revalued at ${inr(JK.stockNew)}; a provision for doubtful debts of ${JK.pPct}% be created; investments be taken at their market value of ${inr(JK.invMkt)}; goodwill be valued at ${inr(JK.gw)}; and the reserves not be kept in the books. Prepare the revaluation account, the partners' capital accounts and the balance sheet of the firm after the change.`,
  model: `${JKrv.md}\n\nFall in investments ${amt(JKi.fall)} is met from the investment fluctuation reserve; its balance ${inr(JKi.toPartners)} goes to the partners equally. Goodwill: Jyoti gains 3/5 − 1/2 = ${JKch.by.Jyoti.diff.abs()}, Karan sacrifices ${JKch.by.Karan.diff}; ${amt(JK.gw)} × 1/10 = ${inr(JKgw.value)}.\n\n${JKcap.md}\n\n${JKnew.md}`,
  sol: 'Revaluation loss and both reserves in the old (equal) ratio; IFR first absorbs the fall in investments; goodwill by the 1/10 change; then redraw the balance sheet with revised values.',
  scheme: [['Revaluation account: loss 9,000', 1.5], ['Goodwill 12,000 and reserves (including IFR balance 6,000)', 1], ['Capital accounts with closing balances 1,01,500 and 1,25,500', 2], ['New balance sheet totalling 2,77,000', 1.5]],
}));
// l6_ifr_wcr: Lokesh, Meenal, Nitin 5 : 3 : 2 → 2 : 3 : 5
const LMN = { names: ['Lokesh', 'Meenal', 'Nitin'], old: [5, 3, 2], wcr: 30000, claim: 40000, ifr: 12000, inv: 90000, mkt: 75000, building: 33000, pl: 25000 };
const LMNw = wcr(LMN.wcr, LMN.claim);
const LMNi = ifr(LMN.ifr, LMN.inv, LMN.mkt);
const LMNrv = revaluation(LMN.names, LMN.old, [['Provision for workmen compensation claim (excess over reserve)', LMNw.toReval], ['Investments (fall not covered by the reserve)', LMNi.toReval]], [['Building', LMN.building]]);
const LMNpl = split(LMN.pl, LMN.names, LMN.old);
expect([LMNw.toReval, LMNi.toReval, LMNrv.net, LMNrv.split, LMNpl], [10000, 3000, 20000, { Lokesh: 10000, Meenal: 6000, Nitin: 4000 }, { Lokesh: 12500, Meenal: 7500, Nitin: 5000 }], 'LMN');
Q('l6_ifr_wcr', long({
  t: 3, d: 4, c: 'application', marks: 6, time: L6,
  stem: `Lokesh, Meenal and Nitin share profits 5 : 3 : 2 in an imagined cold-storage business in Agra and change their ratio to 2 : 3 : 5. Their books show: a workmen compensation reserve of ${inr(LMN.wcr)}, an investment fluctuation reserve of ${inr(LMN.ifr)}, investments of ${inr(LMN.inv)} and a profit and loss account credit balance of ${inr(LMN.pl)}. On the date of change, the workmen compensation claim is estimated at ${inr(LMN.claim)}, investments are worth ${inr(LMN.mkt)} and the building is to be appreciated by ${inr(LMN.building)}. Pass journal entries for the two reserves and the profit and loss balance, and prepare the revaluation account.`,
  model: `${journal([
    je([['Workmen Compensation Reserve A/c', LMN.wcr], ['Revaluation A/c', LMNw.toReval]], [['Provision for Workmen Compensation Claim A/c', LMN.claim]], 'claim of the Agra cold storage provided; shortfall of the reserve charged to revaluation'),
    je([['Investment Fluctuation Reserve A/c', LMN.ifr], ['Revaluation A/c', LMNi.toReval]], [['Investments A/c', LMNi.fall]], 'fall in investments met from the reserve and the excess fall charged to revaluation'),
    je([['Profit and Loss A/c', LMN.pl]], LMN.names.map((n) => [cap(n), LMNpl[n]]), 'credit balance of profit and loss shared by Lokesh, Meenal and Nitin in 5 : 3 : 2'),
  ])}\n\n${LMNrv.md}`,
  sol: 'Where a reserve falls short of the claim or the fall in value, the shortfall is a revaluation loss; the profit and loss balance and the revaluation gain go to the partners in the old ratio.',
  scheme: [['Workmen compensation entry with shortfall 10,000 to revaluation', 1.5], ['Investment fluctuation entry with excess fall 3,000 to revaluation', 1.5], ['Profit and loss credit balance 12,500 : 7,500 : 5,000', 1], ['Revaluation account with gain 20,000 shared 10,000 : 6,000 : 4,000', 2]],
}));
// l6_surrender_full: Rohan, Sneha, Tanmay 3 : 2 : 1, Rohan surrenders 1/3 of his share equally
const RST2 = { names: ['Rohan', 'Sneha', 'Tanmay'], old: [3, 2, 1], part: fr(1, 3), gw: 144000, pld: 18000, gr: 24000 };
const RST2o = [fr(3, 6), fr(2, 6), fr(1, 6)];
const RST2give = RST2o[0].mul(RST2.part);
const RST2new = [RST2o[0].sub(RST2give), RST2o[1].add(RST2give.mul(fr(1, 2))), RST2o[2].add(RST2give.mul(fr(1, 2)))];
const RST2ch = changes(RST2.names, RST2.old, RST2new);
const RST2gw = adjust(RST2ch, RST2.gw);
const RST2pl = split(RST2.pld, RST2.names, RST2.old);
const RST2gr = split(RST2.gr, RST2.names, RST2.old);
expect([`${RST2give}`, RST2ch.newInts, RST2ch.gainRatio, RST2gw.by, RST2pl, RST2gr], ['1/6', [4, 5, 3], [1, 1], { Rohan: 24000, Sneha: -12000, Tanmay: -12000 }, { Rohan: 9000, Sneha: 6000, Tanmay: 3000 }, { Rohan: 12000, Sneha: 8000, Tanmay: 4000 }], 'RST2');
Q('l6_surrender_full', long({
  t: [1, 2, 3], d: 4, c: 'application', marks: 6, time: L6,
  stem: `Rohan, Sneha and Tanmay share profits 3 : 2 : 1 in an imagined fitness-studio chain in Bengaluru. Rohan is reducing his involvement and surrenders one-third of his share, which Sneha and Tanmay take equally. Goodwill is valued at ${inr(RST2.gw)}. The balance sheet shows a general reserve of ${inr(RST2.gr)} and a debit balance of ${inr(RST2.pld)} in the profit and loss account, neither to be kept in the books. Calculate the new and gaining ratios and pass the journal entries.`,
  model: `1. Rohan surrenders 1/3 × 3/6 = **${RST2give}**; Sneha and Tanmay take ${RST2give.mul(fr(1, 2))} each.\n2. New shares: Rohan 3/6 − 1/6 = ${RST2new[0]}; Sneha 2/6 + 1/12 = ${RST2new[1]}; Tanmay 1/6 + 1/12 = ${RST2new[2]} → **new ratio ${fmtRatio(RST2ch.newInts)}**; **gaining ratio ${fmtRatio(RST2ch.gainRatio)}**.\n3. Goodwill: ${amt(RST2.gw)} × 1/6 = ${inr(RST2gw.value)} to Rohan, paid ${amt(-RST2gw.by.Sneha)} each by Sneha and Tanmay.\n\n${journal([
    je(RST2gw.debit.map(([n, v]) => [cap(n), v]), RST2gw.credit.map(([n, v]) => [cap(n), v]), "Sneha's and Tanmay's gains of goodwill credited to Rohan"),
    je([['General Reserve A/c', RST2.gr]], RST2.names.map((n) => [cap(n), RST2gr[n]]), 'general reserve of the Bengaluru studios shared 3 : 2 : 1'),
    je(RST2.names.map((n) => [cap(n), RST2pl[n]]), [['Profit and Loss A/c', RST2.pld]], 'accumulated loss of the Bengaluru studios borne 3 : 2 : 1'),
  ])}`,
  sol: 'Surrendered share split equally gives the new ratio; goodwill in the gaining ratio to the sacrificer; reserve and accumulated loss in the old ratio.',
  scheme: [['New ratio 4 : 5 : 3', 1.5], ['Gaining ratio 1 : 1', 0.5], ['Goodwill entry 24,000', 1.5], ['General reserve entry', 1], ['Profit and loss debit balance entry', 1.5]],
}));
