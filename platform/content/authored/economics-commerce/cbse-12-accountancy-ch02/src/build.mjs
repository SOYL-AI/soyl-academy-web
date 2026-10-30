// Build CBSE 12 Accountancy ch02 Change in Profit-Sharing Ratio among Existing Partners. Run from platform/:
//   npx tsx content/authored/economics-commerce/cbse-12-accountancy-ch02/src/build.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';
import { assert, fr, changes, changeTable, changeRows, split, adjust, je, journal, cap, revaluation, wcr, ifr, inr, amt, fmtRatio } from './acc.mjs';
import { nearDuplicates } from '../../../../../content-pipeline/src/originality/ngrams.ts';
import { ORIGINALITY } from '../../../../../content-pipeline/config/pipeline.ts';

setUnit('cbse-12-accountancy-ch02', 'economics-commerce');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const expect = (got, want, what) => assert(JSON.stringify(got) === JSON.stringify(want), `deck figure ${what}: got ${JSON.stringify(got)}, expected ${JSON.stringify(want)}`);

// ---------------------------------------------------------------- deck figures (computed, never typed)
// WE1/WE3: Meera, Naveen and Omkar, an imagined tiffin service in Mumbai, 4 : 3 : 1 → 2 : 2 : 1.
const MNO = changes(['Meera', 'Naveen', 'Omkar'], [4, 3, 1], [2, 2, 1]);
expect([MNO.L, `${MNO.by.Meera.diff}`, `${MNO.by.Naveen.diff}`, `${MNO.by.Omkar.diff}`, MNO.gainRatio], [40, '1/10', '-1/40', '-3/40', [1, 3]], 'WE1');
const MNOgw = 160000;
const MNOadj = adjust(MNO, MNOgw);
expect(MNOadj.by, { Meera: 16000, Naveen: -4000, Omkar: -12000 }, 'WE3');
const WE3entry = je(MNOadj.debit.map(([n, v]) => [cap(n), v]), MNOadj.credit.map(([n, v]) => [cap(n), v]), 'Naveen and Omkar compensate Meera for goodwill in the gaining ratio 1 : 3');
// WE2/WE4: Tara and Uday, an imagined photo studio in Mangaluru, 3 : 2; Tara surrenders 1/3 of her share to Uday.
const TU = { names: ['Tara', 'Uday'], old: [3, 2], part: fr(1, 3), books: 30000, gw: 100000 };
const TUgive = fr(3, 5).mul(TU.part);
const TUch = changes(TU.names, TU.old, [fr(3, 5).sub(TUgive), fr(2, 5).add(TUgive)]);
const TUoff = split(TU.books, TU.names, TU.old);
const TUadj = adjust(TUch, TU.gw);
expect([`${TUgive}`, TUch.newInts, TUoff, TUadj.by], ['1/5', [2, 3], { Tara: 18000, Uday: 12000 }, { Tara: 20000, Uday: -20000 }], 'WE2/WE4');
const WE4entries = [
  je(TU.names.map((n) => [cap(n), TUoff[n]]), [['Goodwill A/c', TU.books]], 'goodwill of the Mangaluru studio written off by Tara and Uday in 3 : 2'),
  je([[cap('Uday'), TUadj.value]], [[cap('Tara'), TUadj.value]], "Uday's 1/5 gain of goodwill credited to Tara"),
];
// WE5–WE7: Lata and Mohan, an imagined hardware wholesaler in Ludhiana, 3 : 2 → 1 : 1.
const LM = { names: ['Lata', 'Mohan'], old: [3, 2], new: [1, 1], building: 200000, bPct: 20, machinery: 150000, mPct: 10, debtors: 80000, pPct: 5, pddOld: 1000, wages: 2000, gr: 50000, pl: 20000, wcr: 15000, claim: 6000, ifr: 10000, inv: 60000, mkt: 56000 };
const LMch = changes(LM.names, LM.old, LM.new);
const LMb = (LM.building * LM.bPct) / 100;
const LMm = (LM.machinery * LM.mPct) / 100;
const LMp = (LM.debtors * LM.pPct) / 100 - LM.pddOld;
const LMrv = revaluation(LM.names, LM.old, [['Machinery', LMm], ['Provision for doubtful debts', LMp], ['Outstanding wages', LM.wages]], [['Building', LMb]]);
const LMw = wcr(LM.wcr, LM.claim);
const LMi = ifr(LM.ifr, LM.inv, LM.mkt);
const LMgr = split(LM.gr, LM.names, LM.old);
const LMpl = split(LM.pl, LM.names, LM.old);
const LMws = split(LMw.toPartners, LM.names, LM.old);
const LMis = split(LMi.toPartners, LM.names, LM.old);
const LMacc = LMrv.net + LM.gr + LM.pl + LMw.toPartners + LMi.toPartners;
const LMadj = adjust(LMch, LMacc);
const LMold = split(LMacc, LM.names, LM.old);
const LMnew = split(LMacc, LM.names, LM.new);
expect([LMb, LMm, LMp, LMrv.net, LMrv.split, LMw.toPartners, LMi.toPartners, LMacc, LMadj.by, LMold, LMnew], [40000, 15000, 3000, 20000, { Lata: 12000, Mohan: 8000 }, 9000, 6000, 105000, { Lata: 10500, Mohan: -10500 }, { Lata: 63000, Mohan: 42000 }, { Lata: 52500, Mohan: 52500 }], 'WE5–WE7');
for (const n of LM.names) assert(LMnew[n] + LMadj.by[n] === LMold[n], `equivalence for ${n}`);
const WE6entries = [
  je([['General Reserve A/c', LM.gr], ['Profit and Loss A/c', LM.pl]], LM.names.map((n) => [cap(n), LMgr[n] + LMpl[n]]), 'reserve and profit balance of the Ludhiana firm credited to Lata and Mohan in 3 : 2'),
  je([['Workmen Compensation Reserve A/c', LM.wcr]], [['Provision for Workmen Compensation Claim A/c', LM.claim], ...LM.names.map((n) => [cap(n), LMws[n]])], 'claim of 6,000 provided and the rest of the reserve credited 3 : 2'),
  je([['Investment Fluctuation Reserve A/c', LM.ifr]], [['Investments A/c', LMi.fall], ...LM.names.map((n) => [cap(n), LMis[n]])], 'fall in investments met and the rest of the reserve credited 3 : 2'),
];
const WE7entry = je([[cap('Mohan'), LMadj.value]], [[cap('Lata'), LMadj.value]], "Mohan's 1/10 gain of the firm's net accumulated profits adjusted with Lata");

// ---------------------------------------------------------------- visuals, Part 1
const vRoute1 = flow('LR', ['Why ratios change', 'Sacrifice and gain', 'Special cases', 'Goodwill under AS 26', 'Existing goodwill'], 'Route map of Part 1: why partners change their ratio, sacrificing and gaining shares, special cases, the goodwill adjustment under Accounting Standard 26, and goodwill already in the books', 'Part 1 at a glance');
const vEffects = flow('LR', ['Partners agree a new ratio', 'Some sacrifice, some gain', 'Gainers compensate sacrificers for goodwill', 'Past values settled in the old ratio (revaluation, reserves)'], 'Flow: the partners agree a new ratio; some partners sacrifice and others gain; gainers compensate sacrificers for goodwill; and past values such as revaluation results and reserves are settled in the old ratio', 'What a change in ratio sets off');
const vFormula = table(
  ['Term', 'Formula', 'Who', 'Used for'],
  [
    ['Sacrificing share', 'Old share − new share (positive)', 'Partners whose share falls', 'Compensation received for goodwill'],
    ['Gaining share', 'New share − old share (positive)', 'Partners whose share rises', 'Compensation paid for goodwill'],
    ['No change', 'Old share = new share', 'Partner unaffected', 'Left out of the goodwill entry'],
  ],
  'Table of formulas: a sacrificing share is old share minus new share, a gaining share is new share minus old share, and a partner whose share is unchanged is left out of the goodwill entry',
  'Total sacrifice always equals total gain.',
);
const vBars = (() => {
  const s = new Svg(560, 310);
  const ch = s.chart({ x0: 0, x1: 3, y0: 0, y1: 0.6, left: 70, top: 30, width: 420, height: 220, xLabel: 'Partner', yLabel: 'Share of profit' });
  MNO.rows.forEach((r, i) => {
    const x = i + 0.5;
    for (const [dx, f, fill] of [[-0.17, r.old, 'fill'], [0.17, r.new, 'accent']]) {
      const v = f.n / f.d;
      const a = ch.X(x + dx - 0.15);
      const b = ch.X(x + dx + 0.15);
      s.rect(a, ch.Y(v), b - a, ch.Y(0) - ch.Y(v), { fill, color: 'accent', sw: 1.5, rx: 2 });
      s.text((a + b) / 2, ch.Y(v) - 10, `${f}`, { size: 12 });
    }
    ch.xTick(x, r.name);
  });
  for (const v of [0.2, 0.4, 0.6]) ch.yTick(v, String(v));
  s.rect(330, 34, 14, 14, { fill: 'fill', color: 'accent', sw: 1.5, rx: 2 });
  s.text(350, 41, 'Old share', { anchor: 'start', size: 13 });
  s.rect(330, 58, 14, 14, { fill: 'accent', color: 'accent', sw: 1, rx: 2 });
  s.text(350, 65, 'New share', { anchor: 'start', size: 13 });
  return s.visual(
    'Grouped bar chart for an imagined firm of Meera, Naveen and Omkar: Meera falls from one half to two fifths, Naveen rises from three eighths to two fifths, and Omkar rises from one eighth to one fifth',
    'Meera\'s bar falls (sacrifice); Naveen\'s and Omkar\'s rise (gains).',
  );
})();
const vWE1 = table(['Partner', 'Old', 'New', 'Old − new (over 40)', 'Result'], MNO.rows.map((r) => [r.name, `${r.old} = ${r.old.over(40)}`, `${r.new} = ${r.new.over(40)}`, `${r.diff.sign < 0 ? '−' : ''}${r.diff.abs().over(40)}`, r.diff.sign > 0 ? `Sacrifices ${r.diff}` : `Gains ${r.diff.abs()}`]),
  'Table of worked example 1: over a denominator of forty, Meera goes from twenty to sixteen and sacrifices four fortieths, one tenth; Naveen goes from fifteen to sixteen and gains one fortieth; Omkar goes from five to eight and gains three fortieths',
  `Gaining ratio Naveen : Omkar = ${fmtRatio(MNO.gainRatio)}`);
const vCases = table(
  ['What the question gives', 'How to work'],
  [
    ['Old and new ratios', 'Old − new for each partner, over a common denominator'],
    ['A partner gives a fraction **of the firm\'s profit** to another', 'Subtract that fraction from the giver, add it to the taker'],
    ['A partner gives a fraction **of his or her own share**', 'Fraction × own share = amount given; then adjust both'],
    ['Partners agree to share equally', 'New share of each = 1 ÷ number of partners'],
  ],
  'Table of special cases: given both ratios, subtract; given a fraction of the firm\'s profit, move it directly; given a fraction of a partner\'s own share, multiply first; for equal sharing, each new share is one over the number of partners',
);
const vWE2 = table(['Step', 'Working', 'Result'], [
  ['Share surrendered', `1/3 × 3/5`, `${TUgive}`],
  ['Tara\'s new share', `3/5 − ${TUgive}`, `${TUch.by.Tara.new}`],
  ['Uday\'s new share', `2/5 + ${TUgive}`, `${TUch.by.Uday.new}`],
  ['**New ratio**', '', `**${fmtRatio(TUch.newInts)}**`],
], 'Table of worked example 2: Tara surrenders one third of her three fifths, which is one fifth; her new share is two fifths and Uday\'s is three fifths, so the new ratio is two to three');
const vGwFlow = flow('LR', ['Value the firm\'s goodwill', 'Find each partner\'s gain or sacrifice', 'Gain × goodwill = amount', 'Debit gainers, credit sacrificers (no goodwill account)'], 'Flow of the goodwill adjustment: value the firm\'s goodwill, find each partner\'s gain or sacrifice, multiply the gain by goodwill, then debit the gaining partners and credit the sacrificing partners without opening a goodwill account', 'Accounting Standard 26: self-generated goodwill is never recorded');
const vEntryFormat = table(['Particulars', 'Dr', 'Cr'], [
  ["Gaining Partner's Capital A/c Dr.", 'gain × goodwill', ''],
  ["To Sacrificing Partner's Capital A/c", '', 'sacrifice × goodwill'],
  ['*(Being goodwill adjusted on change in ratio)*', '', ''],
], 'Format of the adjustment entry: the gaining partner\'s capital account is debited with gain times goodwill, and the sacrificing partner\'s capital account is credited with sacrifice times goodwill');
const vWE3 = table(['Particulars', 'Dr (₹)', 'Cr (₹)'], [
  ...WE3entry.dr.map(([a, v]) => [`${a} Dr.`, amt(v), '']),
  ...WE3entry.cr.map(([a, v]) => [`To ${a}`, '', amt(v)]),
  [`*(Being ${WE3entry.narr})*`, '', ''],
], 'Journal entry of worked example 3: Naveen\'s capital is debited four thousand rupees and Omkar\'s twelve thousand, and Meera\'s capital is credited sixteen thousand rupees', `Goodwill ${inr(MNOgw)}: Meera 1/10, Naveen 1/40, Omkar 3/40 of it`);
const vExisting = table(['Situation', 'Entry', 'Ratio'], [
  ['Goodwill already in the balance sheet', "All Partners' Capital A/cs Dr. To Goodwill A/c", 'Old ratio'],
  ['Goodwill valued now (not in books)', "Gaining Partners' Capital A/cs Dr. To Sacrificing Partners' Capital A/cs", 'Gain or sacrifice fraction'],
  ['Capitals fixed', 'Same entries through Current A/cs', 'Same'],
], 'Table: goodwill already in the books is written off against all partners in the old ratio; goodwill valued now is adjusted between gaining and sacrificing partners; with fixed capitals the same entries pass through current accounts');
const vWE4 = table(['Particulars', 'Dr (₹)', 'Cr (₹)'], WE4entries.flatMap((e, i) => [
  ...e.dr.map(([a, v], k) => [`${k === 0 ? `(${['i', 'ii'][i]}) ` : ''}${a} Dr.`, amt(v), '']),
  ...e.cr.map(([a, v]) => [`To ${a}`, '', amt(v)]),
  [`*(Being ${e.narr})*`, '', ''],
]), 'Journal entries of worked example 4: first Tara and Uday write off old goodwill of thirty thousand rupees, eighteen thousand and twelve thousand; then Uday\'s capital is debited and Tara\'s credited twenty thousand rupees');
const vSummary1 = table(['Idea', 'Rule'], [
  ['Sacrifice', 'Old share − new share'],
  ['Gain', 'New share − old share'],
  ['Check', 'Total sacrifice = total gain'],
  ['Goodwill (AS 26)', 'No goodwill account; gainers Dr., sacrificers Cr.'],
  ['Old goodwill in books', 'Written off in the old ratio'],
  ['Fixed capitals', 'Use current accounts'],
], 'Summary table of Part 1: sacrifice is old minus new, gain is new minus old, total sacrifice equals total gain, goodwill is adjusted by debiting gainers and crediting sacrificers, old goodwill is written off in the old ratio, and fixed capitals use current accounts');

// ---------------------------------------------------------------- visuals, Part 2
const vRoute2 = flow('LR', ['Why revalue', 'Revaluation account', 'Reserves and accumulated profits', 'Workmen and investment reserves', 'One adjustment entry'], 'Route map of Part 2: why assets and liabilities are revalued, the revaluation account, reserves and accumulated profits, the workmen compensation and investment fluctuation reserves, and the single adjustment entry', 'Part 2 at a glance');
const vWhy = flow('LR', ['Book values are out of date', 'Gain or loss arose under the old ratio', 'Settle it now in the old ratio', 'Future changes shared in the new ratio'], 'Flow: book values are out of date; the gain or loss arose under the old ratio; it is settled now in the old ratio; and future changes are shared in the new ratio', 'Fairness between the partners');
const vRules = table(['Change', 'Revaluation account'], [
  ['Increase in an asset', 'Credit (gain)'],
  ['Decrease in an asset', 'Debit (loss)'],
  ['Increase in a liability (or new provision)', 'Debit (loss)'],
  ['Decrease in a liability', 'Credit (gain)'],
  ['Unrecorded asset brought in', 'Credit (gain)'],
  ['Unrecorded liability brought in', 'Debit (loss)'],
  ['**Balance**', '**Shared in the old ratio**'],
], 'Table of revaluation rules: increases in assets, decreases in liabilities and unrecorded assets are credited; decreases in assets, increases in liabilities or provisions and unrecorded liabilities are debited; the balance is shared in the old ratio');
const vWE5 = { kind: 'table', spec: { headers: ['Dr. particulars', '₹', 'Cr. particulars', '₹'], rows: [
  ['To Machinery', amt(LMm), 'By Building', amt(LMb)],
  ['To Provision for doubtful debts', amt(LMp), '', ''],
  ['To Outstanding wages', amt(LM.wages), '', ''],
  ['To Lata\'s Capital A/c (gain)', amt(LMrv.split.Lata), '', ''],
  ['To Mohan\'s Capital A/c (gain)', amt(LMrv.split.Mohan), '', ''],
  ['**Total**', `**${amt(LMrv.total)}**`, '**Total**', `**${amt(LMrv.total)}**`],
] }, alt: 'Revaluation account of worked example 5: debit side machinery fifteen thousand, provision three thousand, outstanding wages two thousand, and the gain of twenty thousand rupees split twelve thousand to Lata and eight thousand to Mohan; credit side building forty thousand rupees', caption: `Gain ${inr(LMrv.net)} shared 3 : 2` };
const vRevalEntries = table(['Particulars', 'Dr (₹)', 'Cr (₹)'], [
  ['(i) Building A/c Dr.', amt(LMb), ''], ['To Revaluation A/c', '', amt(LMb)],
  ['(ii) Revaluation A/c Dr.', amt(LMm + LMp + LM.wages), ''], ['To Machinery A/c', '', amt(LMm)], ['To Provision for Doubtful Debts A/c', '', amt(LMp)], ['To Outstanding Wages A/c', '', amt(LM.wages)],
  ['(iii) Revaluation A/c Dr.', amt(LMrv.net), ''], ...LMrv.entry.cr.map(([a, v]) => [`To ${a}`, '', amt(v)]),
], 'Journal entries for worked example 5: building debited and revaluation credited forty thousand; revaluation debited twenty thousand for machinery, provision and outstanding wages; and revaluation debited twenty thousand with Lata credited twelve thousand and Mohan eight thousand');
const vReserves = table(['Item in the balance sheet', 'Treatment on change in ratio'], [
  ['General reserve, contingency reserve', 'Credited to partners in the **old ratio**'],
  ['Profit and loss account (credit balance)', 'Credited to partners in the **old ratio**'],
  ['Profit and loss account (debit balance)', 'Debited to partners in the **old ratio**'],
  ['Workmen compensation reserve', 'Claim provided first; excess to partners (old ratio)'],
  ['Investment fluctuation reserve', 'Fall in investments met first; excess to partners (old ratio)'],
], 'Table of treatments: general and contingency reserves and a credit balance of profit and loss are credited to partners in the old ratio; a debit balance of profit and loss is debited in the old ratio; the workmen compensation reserve first meets the claim and the investment fluctuation reserve first meets the fall in investments, with any excess to the partners in the old ratio');
const vWCR = table(['Case', 'Entry'], [
  ['No claim', 'WCR A/c Dr. To Partners\' Capital A/cs (old ratio)'],
  ['Claim less than reserve', 'WCR A/c Dr. To Provision for WC Claim A/c (claim), To Partners\' Capital A/cs (excess)'],
  ['Claim equal to reserve', 'WCR A/c Dr. To Provision for WC Claim A/c'],
  ['Claim more than reserve', 'WCR A/c Dr. (reserve) + Revaluation A/c Dr. (excess) To Provision for WC Claim A/c'],
], 'Table of workmen compensation reserve cases: no claim, the whole reserve goes to partners; claim less than reserve, the claim goes to a provision and the excess to partners; claim equal to reserve, all to the provision; claim more than reserve, the excess is debited to the revaluation account', 'WCR = workmen compensation reserve; WC = workmen compensation');
const vIFR = table(['Market value of investments', 'Treatment'], [
  ['Equal to book value', 'Whole IFR to partners (old ratio)'],
  ['Below book value, fall ≤ IFR', 'IFR A/c Dr. To Investments A/c (fall), To Partners\' Capital A/cs (rest)'],
  ['Below book value, fall > IFR', 'IFR A/c Dr. (all) + Revaluation A/c Dr. (excess fall) To Investments A/c'],
  ['Above book value', 'Investments A/c Dr. To Revaluation A/c (rise); whole IFR to partners'],
], 'Table of investment fluctuation reserve cases: at book value the whole reserve goes to partners; a fall up to the reserve is absorbed and the rest goes to partners; a fall larger than the reserve is absorbed up to the reserve and the excess is a revaluation loss; a rise is a revaluation gain and the whole reserve goes to partners', 'IFR = investment fluctuation reserve');
const vWE6 = table(['Particulars', 'Dr (₹)', 'Cr (₹)'], WE6entries.flatMap((e, i) => [
  ...e.dr.map(([a, v], k) => [`${k === 0 ? `(${['i', 'ii', 'iii'][i]}) ` : ''}${a} Dr.`, amt(v), '']),
  ...e.cr.map(([a, v]) => [`To ${a}`, '', amt(v)]),
]), 'Journal entries of worked example 6: general reserve fifty thousand and profit and loss twenty thousand credited to Lata forty-two thousand and Mohan twenty-eight thousand; workmen reserve fifteen thousand split into a six thousand provision and nine thousand to the partners; investment reserve ten thousand split into four thousand for the fall in investments and six thousand to the partners');
const vSingleFlow = flow('LR', ['Add reserves, accumulated profits and the net revaluation result', 'Total × each partner\'s sacrifice or gain', 'One entry: gainers Dr., sacrificers Cr.', 'Book values and reserves stay as they are'], 'Flow of the single adjustment entry: add the reserves, accumulated profits and the net revaluation result; multiply the total by each partner\'s sacrifice or gain; pass one entry debiting gainers and crediting sacrificers; book values and reserves stay unchanged', 'Used when partners do not want to alter the books');
const vWE7 = table(['Item (Lata and Mohan, imagined)', '₹'], [
  ['Net revaluation gain', amt(LMrv.net)],
  ['General reserve', amt(LM.gr)],
  ['Profit and loss (credit)', amt(LM.pl)],
  ['Workmen compensation reserve less claim', amt(LMw.toPartners)],
  ['Investment fluctuation reserve less fall', amt(LMi.toPartners)],
  ['**Total**', `**${amt(LMacc)}**`],
  ['× Lata\'s sacrifice (1/10)', `**${amt(LMadj.value)}**`],
], 'Table of worked example 7: net revaluation gain twenty thousand, general reserve fifty thousand, profit and loss twenty thousand, workmen reserve excess nine thousand and investment reserve excess six thousand make one lakh five thousand rupees; one tenth of it, ten thousand five hundred, is the single adjustment', `Mohan's Capital A/c Dr. ${amt(LMadj.value)} To Lata's Capital A/c ${amt(LMadj.value)}`);
const vEquiv = table(['', 'Lata (₹)', 'Mohan (₹)'], [
  [`Method 1: distribute ${amt(LMacc)} now in the old ratio 3 : 2`, amt(LMold.Lata), amt(LMold.Mohan)],
  [`Method 2: keep it; later shared in the new ratio 1 : 1`, amt(LMnew.Lata), amt(LMnew.Mohan)],
  ['Method 2: single adjustment entry', `+${amt(LMadj.by.Lata)}`, `−${amt(-LMadj.by.Mohan)}`],
  ['**Method 2 total**', `**${amt(LMnew.Lata + LMadj.by.Lata)}**`, `**${amt(LMnew.Mohan + LMadj.by.Mohan)}**`],
], 'Table showing both methods give the same result: distributing one lakh five thousand in three to two gives Lata sixty-three thousand and Mohan forty-two thousand; keeping it, sharing equally later and passing the single adjustment of ten thousand five hundred also gives sixty-three thousand and forty-two thousand', 'Both methods leave each partner equally well off.');
const vSummary2 = table(['Item', 'Ratio', 'Account'], [
  ['Revaluation gain or loss', 'Old', 'Revaluation A/c → capitals'],
  ['General reserve, profit and loss balance', 'Old', 'Direct to capitals'],
  ['Workmen compensation reserve', 'Old (after the claim)', 'Provision + capitals'],
  ['Investment fluctuation reserve', 'Old (after the fall)', 'Investments + capitals'],
  ['Books unchanged', 'Sacrifice or gain', 'One adjustment entry'],
], 'Summary table of Part 2: revaluation results, reserves and the profit and loss balance go to the partners in the old ratio, the workmen and investment reserves after meeting the claim or the fall; if the books are not changed, one adjustment entry uses each partner\'s sacrifice or gain');

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Change in Profit-Sharing Ratio — Part 1: Sacrificing and Gaining Ratios, Goodwill',
  goals: [
    'Explain why existing partners change their profit-sharing ratio and what it sets off',
    'Calculate each partner\'s sacrifice or gain and the sacrificing and gaining ratios, including surrender of a share',
    'Pass the goodwill adjustment entry under AS 26, writing off any goodwill already in the books',
  ],
  slides: [
    sl('title', 'Change in Profit-Sharing Ratio among Existing Partners', {
      b: 'Part 1 — **sacrificing and gaining ratios** and the **goodwill adjustment**.',
      v: vRoute1,
      n: 'Partners do not always share profits in the same ratio for ever. When one partner takes on more work or another steps back, they agree a new ratio. In this part we learn to measure exactly who gives up a share and who gains one, and how the gaining partners compensate the others for goodwill, following Accounting Standard twenty-six.',
    }),
    sl('concept', 'Why do partners change their ratio?', {
      bl: [
        'A partner takes on **more responsibility** or a new branch.',
        'A partner gives **less time** because of age, health or another venture.',
        'A change in **capital** or **skill** contributed.',
        'No partner joins or leaves: the **same partners** reshare profits.',
      ],
      v: vEffects,
      n: 'Ratios change for practical reasons. One partner may start running a new branch, while another may want to spend less time in the business. Whatever the reason, the same partners now reshare profits. This sets off a chain: some partners sacrifice, others gain, gainers pay for goodwill, and past gains and reserves are settled in the old ratio.',
    }),
    sl('concept', 'Sacrificing and gaining shares', {
      v: vFormula,
      bl: ['**Sacrificing ratio** = old ratio − new ratio.', '**Gaining ratio** = new ratio − old ratio.'],
      n: 'For each partner, subtract the new share from the old share. A positive answer is a sacrifice. A negative answer means the partner gains, and the gain is new share minus old share. If the answer is zero, the partner is unaffected. Because the same profit is shared among the same people, the total sacrificed always equals the total gained.',
    }),
    sl('diagram', 'Seeing the change', {
      v: vBars,
      n: 'This chart shows an imagined tiffin service run by Meera, Naveen and Omkar. The light bars are the old shares and the dark bars the new shares. Meera\'s bar falls, so she sacrifices. Naveen\'s and Omkar\'s bars rise, so both of them gain. The fall in one bar is exactly matched by the rises in the others.',
    }),
    sl('example', 'Worked example 1: three partners, different denominators', {
      b: `Meera, Naveen and Omkar (an imagined tiffin service in Mumbai) share ${fmtRatio([4, 3, 1])}. New ratio ${fmtRatio([2, 2, 1])}. Find each partner's sacrifice or gain and the gaining ratio.`,
      bl: ['Step 1 — Write every share over a common denominator (40).', 'Step 2 — Old − new for each partner.', 'Step 3 — Read the signs; form the gaining ratio.'],
      v: vWE1,
      n: 'The old shares are in eighths and the new ones in fifths, so we use forty as the common denominator. Meera falls from twenty fortieths to sixteen, a sacrifice of four fortieths, or one tenth. Naveen rises from fifteen to sixteen, a gain of one fortieth. Omkar rises from five to eight, a gain of three fortieths. So the gaining ratio is one to three.',
    }),
    sl('check', 'Quick check: is every partner affected?', {
      b: 'Think about a partner whose share does not change.',
      chk: 'tf_all_sac',
      n: 'Imagine a partner whose old share and new share are exactly the same. Does that partner sacrifice anything, or gain anything?',
    }),
    sl('concept', 'Special cases', {
      v: vCases,
      n: 'Questions describe the change in different ways. Sometimes both ratios are given; just subtract. Sometimes a partner gives a fraction of the firm\'s profit; move that fraction directly. Be careful when a partner gives a fraction of his or her own share: multiply it by that share first. And when partners agree to share equally, each new share is one over the number of partners.',
    }),
    sl('example', 'Worked example 2: surrender of part of a share', {
      b: `Tara and Uday (an imagined photo studio in Mangaluru) share ${fmtRatio(TU.old)}. Tara surrenders one-third of her share to Uday. Find the new ratio.`,
      v: vWE2,
      n: 'Tara gives up one third of her own share. Her share is three fifths, so she gives one third of three fifths, which is one fifth. Her new share is three fifths minus one fifth, two fifths. Uday gets two fifths plus one fifth, three fifths. The new ratio is two to three. Notice that one third of her share is not one third of the firm\'s profit.',
    }),
    sl('check', 'Quick check: new ratio from a sacrifice', {
      b: 'Is the fraction given out of the firm\'s profit or out of her own share?',
      chk: 'm_new_given_sac',
      n: 'Read the question slowly. The words of the firm\'s profit and of her share lead to different answers.',
    }),
    sl('concept', 'Goodwill on a change in ratio', {
      v: vGwFlow,
      bl: ['The **gaining** partner will get more of future profits that the firm\'s reputation earns, so must **compensate** the sacrificing partner.', '**AS 26:** only **purchased** goodwill is recorded; so **no goodwill account** is raised.'],
      n: 'Goodwill is the value of the firm\'s reputation, which helps it earn future profits. When a partner gains a larger share, he or she will enjoy more of those profits, so the sacrificing partner must be compensated. Under Accounting Standard twenty-six, goodwill built up by the firm itself is never recorded. So we pass an adjustment entry between the partners\' capital accounts instead.',
    }),
    sl('concept', 'The adjustment entry', {
      v: vEntryFormat,
      bl: ['Amount for each partner = **firm\'s goodwill × that partner\'s gain or sacrifice**.', 'Total debits = total credits, because total gain = total sacrifice.'],
      n: 'The entry is simple. Debit the capital account of each gaining partner with gain times goodwill. Credit the capital account of each sacrificing partner with sacrifice times goodwill. Because total gain equals total sacrifice, the entry always balances. A partner whose share has not changed does not appear in the entry at all.',
    }),
    sl('example', 'Worked example 3: goodwill adjustment for three partners', {
      b: `The tiffin service of Meera, Naveen and Omkar values its goodwill at ${inr(MNOgw)}. Pass the adjustment entry for the change to ${fmtRatio([2, 2, 1])}.`,
      v: vWE3,
      n: 'From worked example one, Meera sacrifices one tenth, Naveen gains one fortieth and Omkar gains three fortieths. One tenth of one lakh sixty thousand rupees is sixteen thousand, credited to Meera. Naveen pays one fortieth, four thousand rupees, and Omkar pays three fortieths, twelve thousand rupees. Debits of sixteen thousand equal the credit of sixteen thousand.',
    }),
    sl('check', 'Quick check: the goodwill entry', {
      b: 'Who pays, and who is paid?',
      chk: 'm_gw_entry',
      n: 'Remember: the partner who gets more of the future profit pays the partner who gives it up.',
    }),
    sl('concept', 'Goodwill already in the books', {
      v: vExisting,
      bl: ['First **write off** the existing goodwill in the **old ratio**.', 'Then pass the adjustment entry for the **current value** of goodwill.'],
      n: 'Sometimes the balance sheet already shows goodwill from an earlier purchase. This old figure is written off among all partners in the old ratio, because it belongs to the old arrangement. Then the goodwill valued today is adjusted between gainers and sacrificers in the usual way. If capitals are fixed, the same entries pass through the partners\' current accounts.',
    }),
    sl('example', 'Worked example 4: existing goodwill and a new valuation', {
      b: `The studio of Tara and Uday shows goodwill of ${inr(TU.books)}. On the change to ${fmtRatio(TUch.newInts)}, goodwill is valued at ${inr(TU.gw)}. Pass the entries.`,
      v: vWE4,
      n: 'First, write off the thirty thousand rupees of old goodwill in the old ratio of three to two: eighteen thousand to Tara and twelve thousand to Uday. Next, Tara sacrifices one fifth and Uday gains one fifth. One fifth of one lakh rupees is twenty thousand, so Uday\'s capital is debited and Tara\'s capital credited with twenty thousand rupees.',
    }),
    sl('concept', 'Fixed capitals and other details', {
      bl: [
        '**Fixed capitals:** all adjustments go through **current accounts**.',
        'Goodwill is often valued first by **average profit** or **super profit** (Chapter 1 methods); then the same entry applies.',
        'Never credit goodwill to **all** partners in the new ratio: that would raise a goodwill account.',
      ],
      n: 'Two details complete the picture. If the partnership deed fixes the capitals, every adjustment goes through current accounts instead. And the goodwill figure may first have to be worked out by the average profit or super profit method from chapter one. After that, the adjustment entry is passed in exactly the same way.',
    }),
    sl('check', 'Quick check: old goodwill', {
      b: 'In which ratio is goodwill already in the books written off?',
      chk: 'fb_gw_ratio',
      n: 'Think about when the old goodwill was acquired, and which ratio applied then.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up: a sacrifice is old share minus new share and a gain is new share minus old share, and the two totals are always equal. Watch the wording in special cases. Under Accounting Standard twenty-six no goodwill account is raised: gaining partners are debited and sacrificing partners credited. Goodwill already in the books is first written off in the old ratio.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Always show shares over a **common denominator** before subtracting.',
        'A fraction **of a partner\'s share** must be multiplied by that share first.',
        'Name the partner who is **not affected**: examiners look for it.',
        'Goodwill entry: **gainers Dr., sacrificers Cr.**, with a narration.',
        'Write off **existing goodwill** before adjusting the new value.',
      ],
      n: 'Some advice for the board exam. Show every share over a common denominator before you subtract. Watch for a fraction of a partner\'s own share. When one partner is unaffected, say so clearly. Write the goodwill entry with gainers debited, sacrificers credited, and a short narration. And if goodwill already appears in the books, write it off first, in the old ratio.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Change in Profit-Sharing Ratio — Part 2: Revaluation, Reserves and Accumulated Profits',
  goals: [
    'Prepare a revaluation account and share its gain or loss in the old ratio',
    'Distribute general reserve, profit and loss balances, workmen compensation reserve and investment fluctuation reserve',
    'Pass a single adjustment entry when partners keep book values and reserves unchanged',
  ],
  slides: [
    sl('title', 'Revaluation, reserves and accumulated profits', {
      b: 'Part 2 — settling the **past** in the **old ratio** before the new ratio begins.',
      v: vRoute2,
      n: 'In Part 1 we settled goodwill. But the balance sheet also carries assets at old values and reserves built from past profits. All of these belong to the period of the old ratio. In this part we revalue assets and liabilities, distribute reserves and accumulated profits or losses, deal with two special reserves, and learn a shortcut entry for when the books are not to be disturbed.',
    }),
    sl('concept', 'Why revalue on a change in ratio?', {
      v: vWhy,
      bl: ['Assets may be worth more or less than their **book values**; some liabilities may be **unrecorded**.', 'If not settled now, the gain or loss would later be shared in the **new ratio**, which is unfair.'],
      n: 'Book values drift away from real values. Land rises, machines fall, and some liabilities are never recorded. These gains and losses happened while the old ratio applied. If we left them in the books, they would later be shared in the new ratio, and the gaining partners would benefit unfairly. So we revalue now and share the result in the old ratio.',
    }),
    sl('concept', 'The revaluation account', {
      v: vRules,
      b: 'A **nominal account**: gains on the credit side, losses on the debit side; the balance goes to the partners\' capital accounts in the **old ratio**.',
      n: 'The revaluation account collects every change in value. An increase in an asset, a decrease in a liability or an unrecorded asset is a gain, so it is credited. A decrease in an asset, a new provision or an unrecorded liability is a loss, so it is debited. The balance, profit or loss, is transferred to the partners in the old ratio.',
    }),
    sl('check', 'Quick check: credit or debit?', {
      b: 'Gains are credited; losses are debited.',
      chk: 'm_reval_side',
      n: 'For each option, ask: does this make the owners richer or poorer? Richer means a credit to the revaluation account.',
    }),
    sl('example', 'Worked example 5: revaluation account', {
      b: `Lata and Mohan (an imagined hardware wholesaler in Ludhiana) share ${fmtRatio(LM.old)} and change to ${fmtRatio(LM.new)}. Building (${inr(LM.building)}) up ${LM.bPct}%; machinery (${inr(LM.machinery)}) down ${LM.mPct}%; provision on debtors of ${inr(LM.debtors)} raised from ${inr(LM.pddOld)} to ${LM.pPct}%; outstanding wages ${inr(LM.wages)} to be recorded.`,
      v: vWE5,
      n: 'The building rises by twenty per cent of two lakh rupees, forty thousand, a credit. Machinery falls by fifteen thousand, a debit. The new provision is four thousand, but one thousand already exists, so only three thousand is debited. The unrecorded wages of two thousand are debited too. The gain of twenty thousand rupees is shared three to two: twelve thousand to Lata and eight thousand to Mohan.',
    }),
    sl('concept', 'Journal entries for revaluation', {
      v: vRevalEntries,
      bl: ['Increase in asset: **Asset A/c Dr. To Revaluation A/c**.', 'Decrease in asset or new liability: **Revaluation A/c Dr. To Asset or Liability A/c**.', 'Gain: **Revaluation A/c Dr. To Partners\' Capital A/cs** (old ratio).'],
      n: 'The revaluation account is built from journal entries. Debit the building and credit revaluation for the rise. Debit revaluation and credit machinery, the provision and outstanding wages for the losses. Finally, close the account by transferring the gain to the partners\' capital accounts in the old ratio. A loss would be closed the other way round.',
    }),
    sl('concept', 'Reserves and accumulated profits or losses', {
      v: vReserves,
      n: 'Reserves and the balance of the profit and loss account were built from past profits, or show past losses. If the partners do not want them in the books, they are transferred to the capital accounts in the old ratio. A general reserve or a credit balance is credited to the partners. A debit balance, which is an accumulated loss, is debited to them.',
    }),
    sl('check', 'Quick check: general reserve', {
      b: 'Which ratio applies to profits of the past?',
      chk: 'm_gr',
      n: 'Ask yourself when the general reserve was built, and which ratio applied at that time.',
    }),
    sl('concept', 'Workmen compensation reserve', {
      v: vWCR,
      n: 'A workmen compensation reserve is kept for claims by workers. First provide for any expected claim. If the claim is smaller than the reserve, the claim goes to a provision and the rest goes to the partners in the old ratio. If the claim is larger than the reserve, the whole reserve is used and the extra amount is a loss, debited to the revaluation account.',
    }),
    sl('concept', 'Investment fluctuation reserve', {
      v: vIFR,
      n: 'An investment fluctuation reserve protects against a fall in the value of investments. If investments have fallen, the fall is met from this reserve first, and any balance goes to the partners. If the fall is bigger than the reserve, the excess is a revaluation loss. If investments have risen, the rise is a revaluation gain and the whole reserve goes to the partners.',
    }),
    sl('example', 'Worked example 6: reserves of Lata and Mohan', {
      b: `General reserve ${inr(LM.gr)}; profit and loss credit ${inr(LM.pl)}; workmen compensation reserve ${inr(LM.wcr)} with a claim of ${inr(LM.claim)}; investment fluctuation reserve ${inr(LM.ifr)} with investments of ${inr(LM.inv)} now worth ${inr(LM.mkt)}. Old ratio ${fmtRatio(LM.old)}.`,
      v: vWE6,
      n: 'The general reserve and the profit balance together make seventy thousand rupees, shared three to two. The workmen reserve of fifteen thousand first provides six thousand for the claim, and nine thousand goes to the partners. Investments have fallen by four thousand, so the investment reserve of ten thousand absorbs that fall and the remaining six thousand goes to the partners.',
    }),
    sl('check', 'Quick check: workmen compensation reserve', {
      b: 'The claim is met first.',
      chk: 'm_wcr_less',
      n: 'Subtract the expected claim from the reserve. Only what is left belongs to the partners.',
    }),
    sl('concept', 'Keeping the books unchanged: one adjustment entry', {
      v: vSingleFlow,
      bl: ['Used when partners want **book values** and **reserves** to stay as they are.', 'Amount for each partner = **net accumulated profits × sacrifice or gain**.'],
      n: 'Sometimes partners do not want to change book values or remove reserves. Then we add up everything that belongs to the old ratio: reserves, the profit balance and the net revaluation result. We multiply the total by each partner\'s sacrifice or gain, and pass one entry. Gaining partners are debited and sacrificing partners credited, just like the goodwill entry.',
    }),
    sl('example', 'Worked example 7: the single entry for Lata and Mohan', {
      b: 'Suppose Lata and Mohan keep every value and reserve in the books instead.',
      v: vWE7,
      n: 'Add the net revaluation gain of twenty thousand, the general reserve of fifty thousand, the profit balance of twenty thousand, the free workmen reserve of nine thousand and the free investment reserve of six thousand. That is one lakh five thousand rupees. Lata sacrifices one tenth, so Mohan\'s capital is debited and Lata\'s credited with ten thousand five hundred rupees.',
    }),
    sl('concept', 'Why the two methods agree', {
      v: vEquiv,
      n: 'Do the two methods really give the same result? If the one lakh five thousand rupees is distributed now in three to two, Lata gets sixty-three thousand and Mohan forty-two thousand. If it is kept and later shared equally, each gets fifty-two thousand five hundred, but the adjustment entry has already moved ten thousand five hundred from Mohan to Lata. The totals match exactly.',
    }),
    sl('check', 'Quick check: books unchanged', {
      b: 'What single entry replaces all the separate entries?',
      chk: 'm_single',
      n: 'Think about how the goodwill entry worked in Part 1. The same idea applies here.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up: revaluation gains and losses, reserves and the profit and loss balance all belong to the old ratio. The workmen compensation reserve first meets the claim and the investment fluctuation reserve first meets the fall in investments; any shortfall is a revaluation loss. If the books are to stay unchanged, one adjustment entry based on sacrifice and gain does the same job.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Share the revaluation result and every reserve in the **old ratio**, never the new one.',
        'For a provision for doubtful debts, debit only the **increase** over the existing provision.',
        'Show the **claim** and the **fall in investments** before sharing what is left.',
        'In a single adjustment entry, **net** losses (a profit and loss debit balance) against gains first.',
        'Head every account: **Dr. — Revaluation Account — Cr.** and total both sides.',
      ],
      n: 'A few tips for full marks. Use the old ratio for revaluation results and reserves. For a provision, debit only the increase over the existing provision. Show the claim and the fall in investments before sharing the rest. In a single adjustment entry, subtract any accumulated loss first. And always head your accounts properly and total both sides.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Change in Profit-Sharing Ratio among Existing Partners — Notes',
  sections: [
    {
      h: '1. Meaning and effects of a change in ratio',
      t: 1,
      b: 'Existing partners may agree a **new profit-sharing ratio** without anyone joining or leaving, for example when a partner takes on more work, gives less time, or contributes more capital or skill. The change is a **reconstitution** of the firm.\n\nIt sets off four adjustments:\n1. Some partners **sacrifice** and others **gain**.\n2. Gainers **compensate** sacrificers for **goodwill**.\n3. Assets and liabilities are **revalued**, and the gain or loss is shared in the **old ratio**.\n4. **Reserves** and **accumulated profits or losses** are distributed in the **old ratio** (or one adjustment entry is passed).',
      terms: [
        ['Reconstitution', 'A change in the agreement among partners, such as a new profit-sharing ratio.'],
        ['Profit-sharing ratio', 'The ratio in which partners share profits and losses.'],
      ],
      v: vEffects,
    },
    {
      h: '2. Sacrificing and gaining ratios',
      t: 1,
      b: '- **Sacrifice** of a partner = **old share − new share** (when positive).\n- **Gain** of a partner = **new share − old share** (when positive).\n- **Sacrificing ratio**: ratio of the sacrifices; **gaining ratio**: ratio of the gains.\n- A partner with old share = new share is **unaffected**.\n- **Check:** total sacrifice = total gain.\n\n**Special cases**\n- A fraction **of the firm\'s profit** is given: subtract it from the giver, add it to the taker.\n- A fraction **of a partner\'s own share** is given: multiply it by that share first.\n- **Equal sharing**: each new share = 1 ÷ number of partners.',
      terms: [
        ['Sacrificing ratio', 'The ratio in which partners give up their shares; old ratio − new ratio.'],
        ['Gaining ratio', 'The ratio in which partners acquire additional shares; new ratio − old ratio.'],
      ],
      v: vFormula,
      vs: [vWE1, vCases],
    },
    {
      h: '3. Goodwill under AS 26',
      t: 2,
      b: '**Accounting Standard 26 (Intangible Assets):** goodwill is recorded **only when purchased** for a consideration. Goodwill generated by the firm itself is **never** recorded, so no goodwill account is raised on a change in ratio.\n\n**Adjustment entry:**\n\n| Particulars | Dr | Cr |\n|---|---|---|\n| Gaining Partners\' Capital A/cs Dr. | gain × goodwill | |\n| To Sacrificing Partners\' Capital A/cs | | sacrifice × goodwill |\n\n- Goodwill may first be valued by the **average profit**, **super profit** or **capitalisation** method (Chapter 1).\n- A partner whose share is unchanged does **not** appear in the entry.',
      terms: [
        ['Goodwill', 'The value of a firm\'s reputation that enables it to earn more than normal profits.'],
        ['Adjustment entry', 'An entry between partners\' capital (or current) accounts that compensates sacrificing partners without opening a goodwill account.'],
      ],
      v: vGwFlow,
      vs: [vWE3],
    },
    {
      h: '4. Existing goodwill and fixed capitals',
      t: 2,
      b: '- **Goodwill already in the balance sheet** is written off among **all** partners in the **old ratio**: Partners\' Capital A/cs Dr. To Goodwill A/c.\n- Then the **current value** of goodwill is adjusted between gaining and sacrificing partners.\n- If capitals are **fixed**, every adjustment (goodwill, reserves, revaluation) passes through the partners\' **current accounts**.',
      terms: [
        ['Fixed capital method', 'Capital accounts show only the agreed capital; all other items go to current accounts.'],
      ],
      v: vExisting,
      vs: [vWE4],
    },
    {
      h: '5. Revaluation of assets and reassessment of liabilities',
      t: 3,
      b: 'Book values may differ from current values, and some assets or liabilities may be unrecorded. These changes arose under the **old ratio**, so they are settled before the new ratio begins.\n\n- **Revaluation account** (a **nominal** account): gains credited, losses debited.\n- Increase in an asset, decrease in a liability, unrecorded asset: **credit**.\n- Decrease in an asset, increase in a liability or provision, unrecorded liability: **debit**.\n- For a **provision for doubtful debts**, debit only the increase over the existing provision.\n- **Balance** (profit or loss) to partners\' capital accounts in the **old ratio**.',
      terms: [
        ['Revaluation account', 'A nominal account that records increases and decreases in the values of assets and liabilities on reconstitution.'],
        ['Unrecorded liability', 'A liability that exists but is not in the books; bringing it in is a revaluation loss.'],
      ],
      v: vRules,
      vs: [vWE5, vRevalEntries],
    },
    {
      h: '6. Reserves and accumulated profits or losses',
      t: 3,
      b: '- **General reserve**, **contingency reserve**, **profit and loss credit balance**: credited to partners in the **old ratio**.\n- **Profit and loss debit balance**: debited to partners in the **old ratio**.\n- **Workmen compensation reserve (WCR):** the expected claim is transferred to a **provision for workmen compensation claim**; any excess goes to partners; if the claim exceeds the reserve, the excess is **debited to revaluation**.\n- **Investment fluctuation reserve (IFR):** a fall in investments is met from it first; any balance goes to partners; a fall larger than the reserve is a **revaluation loss**; a rise in value is a **revaluation gain** and the whole IFR goes to partners.',
      terms: [
        ['Workmen compensation reserve', 'A reserve kept from profits to meet claims by workers for compensation.'],
        ['Investment fluctuation reserve', 'A reserve kept to meet a fall in the market value of investments.'],
        ['Accumulated loss', 'A debit balance of the profit and loss account carried in the balance sheet.'],
      ],
      v: vReserves,
      vs: [vWCR, vIFR, vWE6],
    },
    {
      h: '7. Single adjustment entry when the books are unchanged',
      t: 3,
      b: 'If partners want reserves and book values to stay unchanged:\n1. Add reserves and accumulated profits, subtract accumulated losses, and add the **net revaluation result** (gain +, loss −).\n2. Multiply the total by each partner\'s **sacrifice or gain**.\n3. Pass **one entry**: Gaining Partners\' Capital A/cs Dr. To Sacrificing Partners\' Capital A/cs.\n\nGoodwill can be included in the same total. Both methods leave each partner equally well off.',
      terms: [
        ['Single adjustment entry', 'One entry for the net effect of goodwill, reserves and revaluation, based on sacrifice and gain, without changing book figures.'],
      ],
      v: vSingleFlow,
      vs: [vWE7, vEquiv],
    },
  ],
  tips: '**Common mistakes**\n- Sharing the revaluation result or a reserve in the **new** ratio instead of the old one.\n- Treating a fraction **of a partner\'s share** as a fraction of the firm\'s profit.\n- Opening a **goodwill account** at full value: AS 26 does not allow it for self-generated goodwill.\n- Forgetting to write off **existing goodwill** in the old ratio before adjusting the new value.\n- Debiting the **whole** new provision for doubtful debts instead of only the increase.\n- Distributing the **whole** workmen compensation or investment fluctuation reserve when a claim or a fall must be met first.\n\n**How marks are usually split**\n- 1 mark: one correct option, ratio or amount.\n- 3 marks: working (1), amounts (1), entry or account (1).\n- 4 marks: valuation or revaluation working (1–2), ratio (1), entries (1–2).\n- 6 marks: revaluation account (about 2), goodwill and reserves (about 2), capital accounts or balance sheet (about 2); step marks are given even if one figure slips.\n\n**Figures in SOYL practice** are imagined; your board paper will give its own.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Change in profit-sharing ratio', 'The **same partners** agree a new ratio; nobody joins or leaves.', 'definition', 1],
  ['**Sacrifice** of a partner', '**Old share − new share** (positive).', 'fact', 1],
  ['**Gain** of a partner', '**New share − old share** (positive).', 'fact', 1],
  ['Total sacrifice vs total gain', 'Always **equal** among existing partners.', 'concept', 1],
  ['Old share = new share', 'Partner is **unaffected**: no sacrifice, no gain.', 'concept', 1],
  ['3 : 2 changed to equal: who sacrifices?', 'The first partner, **1/10**; the second gains 1/10.', 'example', 1],
  ['"1/4 of **his share**" vs "1/4 of **the profit**"', 'Multiply by his share first in the first case; use 1/4 directly in the second.', 'exam-tip', 1],
  ['Why find the sacrificing ratio?', 'To decide the **compensation** each sacrificing partner receives for goodwill.', 'concept', 1],
  ['**AS 26** and goodwill', 'Only **purchased** goodwill is recorded; no goodwill account on a change in ratio.', 'fact', 2],
  ['Goodwill adjustment entry', '**Gaining partners\' Capital Dr.** To **Sacrificing partners\' Capital**.', 'fact', 2],
  ['Amount of the goodwill entry', 'Firm\'s goodwill × partner\'s **gain** (or sacrifice).', 'fact', 2],
  ['Goodwill already in the books', 'Written off among all partners in the **old ratio**.', 'fact', 2],
  ['Fixed capitals: where do adjustments go?', 'To partners\' **current accounts**.', 'concept', 2],
  ['Why do gainers pay for goodwill?', 'They get a larger share of **future profits** that the firm\'s reputation earns.', 'concept', 2],
  ['**Revaluation account**', 'A **nominal** account for changes in values of assets and liabilities.', 'definition', 3],
  ['Revaluation profit on change in ratio', 'Shared in the **old ratio**.', 'fact', 3],
  ['Increase in an asset', '**Credit** the revaluation account.', 'fact', 3],
  ['Unrecorded liability brought in', '**Debit** the revaluation account.', 'fact', 3],
  ['Provision for doubtful debts raised', 'Debit only the **increase** over the existing provision.', 'exam-tip', 3],
  ['General reserve on change in ratio', 'Credited to partners in the **old ratio** (if not kept).', 'fact', 3],
  ['Profit and loss **debit** balance', '**Debited** to partners in the **old ratio**.', 'fact', 3],
  ['Workmen compensation reserve, claim less than reserve', 'Claim to **provision**; excess to partners (old ratio).', 'fact', 3],
  ['Workmen compensation claim more than reserve', 'Excess **debited to revaluation**.', 'fact', 3],
  ['Investment fluctuation reserve, small fall', 'Fall met from IFR; **rest to partners** (old ratio).', 'fact', 3],
  ['Fall in investments larger than IFR', 'Excess fall **debited to revaluation**.', 'fact', 3],
  ['Investments worth more than book value', 'Rise **credited to revaluation**; whole IFR to partners.', 'fact', 3],
  ['Books to stay unchanged', '**One adjustment entry**: net accumulated profits × sacrifice or gain.', 'concept', 3],
  ['In the single entry, a profit and loss debit balance is…', '**Subtracted** from the reserves and gains first.', 'exam-tip', 3],
  ['Do both methods give the same result?', '**Yes**: each partner ends up equally well off.', 'concept', 3],
  ['Why the old ratio for the past?', 'Values and profits arose **before** the change, under the old ratio.', 'concept', 3],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-12-accountancy-chapter-test-short',
  title: 'Chapter test (short) — Change in Profit-Sharing Ratio among Existing Partners',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_ratio_two', 'm_as26', 'm_pdd', 'ar_ratio'] },
    { id: 'B', title: 'Section B — Short answer (3 marks each)', instr: 'Show your working, entries and accounts.', items: ['s3_ratio_diffden', 's3_reval_acc'] },
    { id: 'C', title: 'Section C — Long answer (4 marks)', instr: 'Answer any ONE of the two questions.', items: [{ attempt: 1, keys: ['l4_gw_avg', 'l4_single_combined'] }] },
    { id: 'D', title: 'Section D — Long answer (6 marks)', instr: 'Answer any ONE of the two questions.', items: [{ attempt: 1, keys: ['l6_full_two', 'l6_entries_three'] }] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-12-accountancy-chapter-test-long',
  title: 'Chapter test (long) — Change in Profit-Sharing Ratio among Existing Partners',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–8 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_sac_def', 'm_gain_ratio', 'm_gw_amt', 'm_reval_ratio', 'm_wcr_more', 'm_ifr', 'ar_gw_b', 'ar_reserve_a'] },
    { id: 'B', title: 'Section B — Short answer (3 marks each)', instr: 'Answer all questions; question 12 has an internal choice. Show your working.', items: ['s3_surrender', 's3_gw_three', 's3_wcr_ifr', { attempt: 1, keys: ['s3_gw_existing', 's3_single_res'] }] },
    { id: 'C', title: 'Section C — Long answer (4 marks each)', instr: 'Answer question 13, and any ONE of questions 14 and 15.', items: ['l4_ratio_gw', { attempt: 1, keys: ['l4_reval_three', 'l4_wcr_ifr'] }] },
    { id: 'D', title: 'Section D — Long answer (6 marks each)', instr: 'Answer question 16, and any ONE of questions 17 and 18.', items: ['l6_bs', { attempt: 1, keys: ['l6_single_all', 'l6_surrender_full'] }] },
  ],
});
expect([T_SHORT.total_marks, T_LONG.total_marks], [20, 40], 'test totals');

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t03 of cbse-12-accountancy-ch02 only (sacrificing and gaining ratios; goodwill on change in ratio per AS 26; revaluation, reserves and accumulated profits/losses, WCR and IFR, single adjustment entry)',
    originality: 'every firm, partner, figure and question written for this chapter (imagined firms across India); no NCERT illustration or exercise and no CBSE sample/past-paper item reused',
    data: 'every figure computed with acc.mjs and asserted: exact fractions with sacrifices = gains, whole-rupee shares, every journal entry Dr = Cr, every revaluation and capital account balanced, both balance sheets agreeing (Jyoti and Karan 2,90,000 → 2,77,000), and deck examples pinned (Meera/Naveen/Omkar 1/10, 1/40, 3/40 and 16,000/4,000/12,000; Lata and Mohan gain 20,000, net 1,05,000, single entry 10,500 with the two methods shown equal)',
    accounting: 'goodwill per AS 26 (no goodwill account; gainers Dr., sacrificers Cr.; existing goodwill written off in old ratio); revaluation and reserves in the old ratio; WCR claim provided first, shortfall to revaluation; IFR absorbs the fall first, excess fall to revaluation, rise credited to revaluation',
    gate: 'schema, content lint (lintExemplar), deterministic verify checks and a bank near-duplicate scan (5-gram Jaccard < 0.7) run clean on this chapter',
  },
});

// ---------------------------------------------------------------- near-duplicate scan (stage 6 measure) and same-paper scan (stage 7)
{
  const file = ['release.json', 'release.wip.json'].map((f) => path.join(DIR, f)).find((f) => fs.existsSync(f));
  const rel = JSON.parse(fs.readFileSync(file, 'utf8'));
  const items = rel.questions.map((q) => ({ id: q.id, unit: rel.unit, text: `${q.passage_md ?? ''}\n${q.stem_md}` }));
  const dups = nearDuplicates(items, ORIGINALITY.duplicate);
  const byId = new Map(items.map((i) => [i.id, i]));
  const paperPairs = [];
  for (const t of [T_SHORT, T_LONG]) {
    const ids = t.sections.flatMap((s) => s.items.map((i) => i.question_id));
    for (const d of nearDuplicates(ids.map((id) => byId.get(id)), ORIGINALITY.samePaper)) paperPairs.push(`${t.id}: ${d.a.id} ~ ${d.b.id} (${Math.round(d.similarity * 100)}%)`);
  }
  if (dups.length || paperPairs.length) {
    console.log(`DUPLICATES (${dups.length + paperPairs.length}):\n  ` + [...dups.map((d) => `${d.a.id} ~ ${d.b.id} (${Math.round(d.similarity * 100)}%)`), ...paperPairs].join('\n  '));
    process.exitCode = 1;
    for (const f of ['release', 'tests']) if (fs.existsSync(path.join(DIR, `${f}.json`))) fs.renameSync(path.join(DIR, `${f}.json`), path.join(DIR, `${f}.wip.json`));
  } else console.log('NO NEAR-DUPLICATES');
}
