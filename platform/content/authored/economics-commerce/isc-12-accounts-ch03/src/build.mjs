// Build ISC 12 Accounts ch03 Reconstitution of Partnership: Admission of a Partner. Run from platform/:
//   npx tsx content/authored/economics-commerce/isc-12-accounts-ch03/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';
import { fr, admit, change, rs, inr, check, journal, solveAdmission, splitRatio, ratioStr, ratioWords, words, rw, fw } from './acc.mjs';

setUnit('isc-12-accounts-ch03', 'economics-commerce');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const C = (n) => `${n}'s Capital A/c`;
const CU = (n) => `${n}'s Current A/c`;
const eq = (a, b, what) => check(JSON.stringify(a) === JSON.stringify(b), `deck figure ${what}: got ${JSON.stringify(a)}, expected ${JSON.stringify(b)}`);
const half = (old, x) => Object.fromEntries(Object.keys(old).map((n) => [n, old[n].of(x)]));

// ---------------------------------------------------------------- deck figures (computed, never typed)
// WE1 Pragati Pickles, Nizamabad (imagined): Sushant and Trupti 2 : 1; Udit joins for 1/3 in the old ratio.
const W1 = admit({ Sushant: fr(2, 3), Trupti: fr(1, 3) }, 'Udit', { proportion: fr(1, 3) });
eq([W1.newInts, W1.sacInts], [[4, 2, 3], [2, 1]], 'W1');
// WE2 + WE3 Zoji Woollens, Leh (imagined): Amrita and Bhuvan 3 : 2; new ratio with Cyrus 1 : 2 : 1 (Bhuvan gains).
const W2 = admit({ Amrita: fr(3, 5), Bhuvan: fr(2, 5) }, 'Cyrus', { newRatio: [1, 2, 1] }, { allowGain: true });
eq([W2.sac.Amrita.toString(), W2.sac.Bhuvan.toString(), W2.newShare.toString()], ['7/20', '-1/10', '1/4'], 'W2');
const W3 = { gw: 80000 };
const W3x = { amrita: W2.sac.Amrita.of(W3.gw), cyrus: W2.newShare.of(W3.gw), bhuvan: W2.sac.Bhuvan.abs().of(W3.gw) };
eq(W3x, { amrita: 28000, cyrus: 20000, bhuvan: 8000 }, 'W3');
const W3j = journal([
  { dr: [['Bank A/c', W3x.cyrus]], cr: [['Premium for Goodwill A/c', W3x.cyrus]], nar: 'premium brought in cash by Cyrus' },
  { dr: [['Premium for Goodwill A/c', W3x.cyrus], [C('Bhuvan'), W3x.bhuvan]], cr: [[C('Amrita'), W3x.amrita]], nar: 'Amrita compensated by Cyrus and by Bhuvan, who gains' },
]);
// WE4 Pragati Pickles, fixed capitals: goodwill 90,000; Udit (1/3) brings no premium.
const W4 = { gw: 90000 };
const W4p = W1.newShare.of(W4.gw);
const W4s = splitRatio(W4p, W1.names, W1.sacInts);
eq([W4p, W4s], [30000, { Sushant: 20000, Trupti: 10000 }], 'W4');
const W4j = journal([{ dr: [[CU('Udit'), W4p]], cr: [[CU('Sushant'), W4s.Sushant], [CU('Trupti'), W4s.Trupti]], nar: "Udit's share of goodwill adjusted through current accounts in the sacrificing ratio 2 : 1" }]);
// WE5 Yercaud Coffee Roasters (imagined): Kartik and Malini 3 : 1; Nimisha 1/5 with 75,000.
const W5r = admit({ Kartik: fr(3, 4), Malini: fr(1, 4) }, 'Nimisha', { proportion: fr(1, 5) });
const W5 = { Kartik: 130000, Malini: 70000, cap: 75000 };
const W5implied = fr(W5.cap).div(W5r.newShare).of(1);
const W5actual = W5.Kartik + W5.Malini + W5.cap;
const W5hg = W5implied - W5actual;
const W5share = W5r.newShare.of(W5hg);
const W5s = splitRatio(W5share, W5r.names, W5r.sacInts);
eq([W5implied, W5actual, W5hg, W5share, W5s], [375000, 275000, 100000, 20000, { Kartik: 15000, Malini: 5000 }], 'W5');
// WE6 + WE9 Konark Stone Carvers, Puri (imagined): Prabhat and Rohini 3 : 2; Sanjana joins for 1/4.
const KO = { building: 25000, mach: 8000, prov: 2500, elec: 1500, gw: 120000, cap: 110000, gr: 20000, debtors: 50000 };
check(fr(5, 100).of(KO.debtors) === KO.prov && fr(10, 100).of(80000) === KO.mach, 'KON percentages');
const KON = solveAdmission({
  old: { Prabhat: fr(3, 5), Rohini: fr(2, 5) }, newName: 'Sanjana', how: { proportion: fr(1, 4) },
  liabs: [['Creditors', 50000], ['General Reserve', KO.gr, { reserve: true }], ["Prabhat's Capital", 150000, { cap: 'Prabhat' }], ["Rohini's Capital", 100000, { cap: 'Rohini' }]],
  assets: [['Bank', 30000, { bank: true }], ['Debtors', KO.debtors], ['Stock', 60000], ['Machinery', 80000], ['Building', 100000]],
  reval: [['Building A/c (increase)', 'A', 'Building', KO.building], ['Machinery A/c (depreciation)', 'A', 'Machinery', -KO.mach], ['Provision for Doubtful Debts A/c', 'A', 'Debtors', -KO.prov, (b, c) => `Debtors ${inr(b)} less provision ${inr(-c)}`], ['Outstanding Electricity Bill A/c', 'L', 'Outstanding Electricity Bill', KO.elec]],
  goodwill: { value: KO.gw }, capital: KO.cap,
});
eq([KON.reval.net, KON.reval.parts, KON.premium, KON.caps.closing, KON.newBS.total, KON.bank], [13000, { Prabhat: 7800, Rohini: 5200 }, 30000, { Prabhat: 187800, Rohini: 125200, Sanjana: 110000 }, 474500, 170000], 'KON');
const KOgr = half(KON.s.old, KO.gr);
const KOprem = splitRatio(KON.premium, KON.R.names, KON.R.sacInts);
eq([KOgr, KOprem], [{ Prabhat: 12000, Rohini: 8000 }, { Prabhat: 18000, Rohini: 12000 }], 'KON split');
// WE7 Dhauli Agarbatti Works, Bhubaneswar (imagined): Tapan and Usha 2 : 1; Vikas 1/4 in the old ratio.
const W7r = admit({ Tapan: fr(2, 3), Usha: fr(1, 3) }, 'Vikas', { proportion: fr(1, 4) });
const W7 = { gr: 36000, loss: 6000 };
const w7 = (x) => half(W7r.old, x);
const W7net = W7.gr - W7.loss;
const W7v = W7r.newShare.of(W7net);
const W7s = splitRatio(W7v, W7r.names, W7r.sacInts);
eq([w7(W7.gr), w7(W7.loss), W7net, W7v, W7s], [{ Tapan: 24000, Usha: 12000 }, { Tapan: 4000, Usha: 2000 }, 30000, 7500, { Tapan: 5000, Usha: 2500 }], 'W7');
const W7j = journal([
  { dr: [['General Reserve A/c', W7.gr]], cr: [[C('Tapan'), w7(W7.gr).Tapan], [C('Usha'), w7(W7.gr).Usha]], nar: 'general reserve closed to the old partners in 2 : 1' },
  { dr: [[C('Tapan'), w7(W7.loss).Tapan], [C('Usha'), w7(W7.loss).Usha]], cr: [['Profit and Loss A/c', W7.loss]], nar: 'debit balance of profit and loss closed to the old partners in 2 : 1' },
]);
const W7k = journal([{ dr: [[C('Vikas'), W7v]], cr: [[C('Tapan'), W7s.Tapan], [C('Usha'), W7s.Usha]], nar: "Vikas's share of the net reserve kept in the books, credited in the sacrificing ratio" }]);
// WE8 Ooty Varkey Bakers (imagined): Ajit and Bharati equal; Chandni 1/3 with 80,000; current accounts.
const W8r = admit({ Ajit: fr(1, 2), Bharati: fr(1, 2) }, 'Chandni', { proportion: fr(1, 3) });
const W8 = { cap: 80000, Ajit: 95000, Bharati: 72000 };
const W8total = fr(W8.cap).div(W8r.newShare).of(1);
const W8req = Object.fromEntries(W8r.names.map((n) => [n, W8r.newShares[n].of(W8total)]));
const W8d = Object.fromEntries(W8r.names.map((n) => [n, W8req[n] - W8[n]]));
eq([W8r.newInts, W8total, W8req, W8d], [[1, 1, 1], 240000, { Ajit: 80000, Bharati: 80000 }, { Ajit: -15000, Bharati: 8000 }], 'W8');
// WE10 Sonamarg Trek Outfitters (imagined): Feroz and Gulnar 3 : 2 → 2 : 3.
const W10 = change(['Feroz', 'Gulnar'], [3, 2], [2, 3]);
const W10x = { gw: 50000, gr: 15000, reval: 5000 };
const W10g = W10.adjust(W10x.gw);
const W10r = W10.adjust(W10x.gr);
const W10rv = half(W10.old, W10x.reval);
eq([W10.diff.Feroz.toString(), W10g.value, W10r.value, W10rv], ['1/5', 10000, 3000, { Feroz: 3000, Gulnar: 2000 }], 'W10');
const W10j = journal([
  { dr: [[C('Gulnar'), W10g.value]], cr: [[C('Feroz'), W10g.value]], nar: 'goodwill adjusted: Gulnar, who gains 1/5, compensates Feroz' },
  { dr: [[C('Gulnar'), W10r.value]], cr: [[C('Feroz'), W10r.value]], nar: 'adjustment for the general reserve left in the books' },
  { dr: [['Revaluation A/c', W10x.reval]], cr: [[C('Feroz'), W10rv.Feroz], [C('Gulnar'), W10rv.Gulnar]], nar: 'revaluation profit shared in the old ratio 3 : 2' },
]);

// ---------------------------------------------------------------- visuals: Part 1
const vRoute1 = flow('LR', ['Reconstitution by admission', 'New, sacrificing and gaining ratios', 'Premium for goodwill', 'Goodwill not brought, fixed capitals', 'Old goodwill and hidden goodwill'], 'Route map of Part 1: reconstitution by admission, the new, sacrificing and gaining ratios, premium for goodwill, goodwill not brought with fixed capitals, and old and hidden goodwill', 'Part 1 at a glance');
const vAdjust = flow('LR', ['New profit-sharing ratio', 'Sacrificing (and any gaining) ratio', 'Goodwill', 'Revaluation Account', 'Reserves and accumulated profits or losses', 'Capitals and the new Balance Sheet'], 'Flow of what is settled when a partner is admitted: the new ratio, the sacrificing and any gaining ratio, goodwill, the revaluation account, reserves and accumulated profits or losses, and capitals with the new balance sheet', 'What is settled on admission');
const vCases = table(
  ['Terms of admission', 'Sacrifice of an old partner', 'New share of an old partner'],
  [
    ['Share taken in the old ratio', "Old share × newcomer's share", "Old share × (1 − newcomer's share)"],
    ['Each surrenders a fraction **of his own share**', 'Old share × that fraction', 'Old share − sacrifice'],
    ['Each gives a fraction **of the firm**', 'That fraction', 'Old share − that fraction'],
    ['New ratio stated', 'Old share − new share (may be negative: a **gain**)', 'Read from the stated ratio'],
  ],
  'Table of the terms on which a newcomer gets his share: in the old ratio, by surrender of a fraction of one\'s own share, by giving a fraction of the firm, or with the new ratio stated, when an old partner may even gain; for each it shows the sacrifice and the new share',
  'In every case: sacrifice = old share − new share.',
);
const vW1 = table(
  ['Partner (Pragati Pickles, imagined)', 'Old share', 'Working', 'New share'],
  [
    ['Sushant', `${W1.old.Sushant}`, `${W1.old.Sushant} × 2/3`, `${W1.newShares.Sushant}`],
    ['Trupti', `${W1.old.Trupti}`, `${W1.old.Trupti} × 2/3`, `${W1.newShares.Trupti}`],
    ['Udit', '—', 'given', `${W1.newShare} = 3/9`],
    ['**New ratio**', '', '', `**${ratioStr(W1.newInts)}**`],
  ],
  `Table of worked example 1: Sushant's two thirds becomes four ninths, Trupti's one third becomes two ninths, Udit gets three ninths; the new ratio is ${ratioStr(W1.newInts)} and the sacrificing ratio ${ratioStr(W1.sacInts)}`,
  `Sacrificing ratio = old ratio ${ratioStr(W1.sacInts)}.`,
);
const vShares = (() => {
  const s = new Svg(620, 230);
  const X0 = 120, W = 460;
  const bar = (y, label, parts) => {
    s.text(X0 - 12, y + 22, label, { anchor: 'end', size: 14, bold: true });
    let x = X0;
    for (const [name, f, color] of parts) {
      const w = W * f.value;
      s.rect(x, y, w, 44, { fill: color, color: 'accent', sw: 1.5, rx: 2 });
      s.text(x + w / 2, y + 15, name, { size: 13 });
      s.text(x + w / 2, y + 32, String(f), { size: 13 });
      x += w;
    }
  };
  bar(30, 'Before', [['Sushant', W1.old.Sushant, 'blue'], ['Trupti', W1.old.Trupti, 'green']]);
  bar(120, 'After', [['Sushant', W1.newShares.Sushant, 'blue'], ['Trupti', W1.newShares.Trupti, 'green'], ['Udit', W1.newShare, 'yellow']]);
  s.text(X0 + W / 2, 200, `Udit's ${W1.newShare} is cut ${ratioStr(W1.sacInts)} out of the two old shares`, { size: 12, muted: true });
  return s.visual(
    'Two bars of equal length, each the whole profit of Pragati Pickles: before admission Sushant has 2/3 and Trupti 1/3; after admission Sushant has 4/9, Trupti 2/9 and Udit 1/3, carved out of both old shares',
    'Shares before and after Udit joins (worked example 1).',
  );
})();
const vW2 = table(
  ['Partner (Zoji Woollens, imagined)', 'Old share', 'New share', 'Old − new', 'Result'],
  [
    ['Amrita', `${W2.old.Amrita} = 12/20`, `${W2.newShares.Amrita} = 5/20`, '7/20', 'Sacrifices'],
    ['Bhuvan', `${W2.old.Bhuvan} = 8/20`, `${W2.newShares.Bhuvan} = 10/20`, '−2/20', '**Gains** 1/10'],
    ['Cyrus', '—', `${W2.newShare} = 5/20`, '', 'New partner'],
  ],
  'Table of worked example 2: Amrita falls from twelve twentieths to five twentieths, a sacrifice of seven twentieths; Bhuvan rises from eight to ten twentieths, a gain of one tenth; Cyrus receives five twentieths',
  "Amrita's 7/20 = Cyrus's 5/20 + Bhuvan's gain 2/20.",
);
const vGwFlow = flow('LR', ['Old partners give up future profits', 'Newcomer (and any gaining partner) compensates them', 'Credited to the sacrificing partners in the sacrificing ratio', 'No goodwill account raised (Accounting Standard 26)'], 'Flow: old partners give up part of their future profits; the newcomer, and any old partner who gains, compensates them; the amount is credited to the sacrificing partners in the sacrificing ratio; no goodwill account is raised because Accounting Standard 26 allows only purchased goodwill', 'Why a premium for goodwill is paid');
const vGwCases = table(
  ['Situation', 'Entry in the firm\'s books'],
  [
    ['Premium brought in cash', 'Bank A/c Dr. To Premium for Goodwill A/c; Premium for Goodwill A/c Dr. To sacrificing partners\' Capital A/cs'],
    ['Premium retained in the business', 'No further entry: it stays in the sacrificing partners\' capitals'],
    ['Premium withdrawn by the old partners', 'Sacrificing partners\' Capital A/cs Dr. To Bank A/c'],
    ['Premium brought in kind', 'Asset A/c Dr. To Premium for Goodwill A/c and To newcomer\'s Capital A/c'],
    ['Premium not brought in cash', 'Newcomer\'s Current A/c (or Capital A/c) Dr. To sacrificing partners\' Current (or Capital) A/cs'],
    ['Premium paid privately', 'No entry'],
  ],
  'Table of goodwill entries on admission: premium in cash goes through the premium for goodwill account to the sacrificing partners; premium retained needs no further entry; premium withdrawn debits their capitals and credits bank; premium in kind debits the asset; premium not brought debits the newcomer\'s current or capital account; a private payment needs no entry',
);
const vW3 = table(W3j.headers, W3j.rows, `Journal of worked example 3: bank debited ${inr(W3x.cyrus)} rupees for Cyrus's premium; then premium for goodwill ${inr(W3x.cyrus)} and Bhuvan's capital ${inr(W3x.bhuvan)} debited, crediting Amrita's capital ${inr(W3x.amrita)} rupees`);
const vW4 = table(W4j.headers, W4j.rows, `Journal of worked example 4 under fixed capitals: Udit's current account debited ${inr(W4p)} rupees, crediting Sushant's current account ${inr(W4s.Sushant)} and Trupti's ${inr(W4s.Trupti)}`);
const vOldGw = table(
  ['Goodwill already in the books', 'Treatment', 'Entry'],
  [
    ['Any book balance of goodwill', 'Written off among the **old partners** in the **old ratio**', "Old partners' Capital A/cs Dr. To Goodwill A/c"],
    ['Then the newcomer\'s share', 'Premium or capital adjustment as usual', 'Sacrificing ratio'],
  ],
  'Table: goodwill already in the books is first written off by debiting the old partners in the old ratio; the newcomer\'s share of the current value of goodwill is then dealt with as a premium or capital adjustment in the sacrificing ratio',
);
const vHidden = flow('TB', ["Newcomer's capital ÷ his share = implied total capital", "minus (old partners' adjusted capitals + newcomer's capital) = hidden goodwill", "Hidden goodwill × newcomer's share = his share of goodwill", 'Debit his capital (or current) account; credit sacrificing partners'], "Flow for hidden goodwill: divide the newcomer's capital by his share for the implied total capital, subtract the capitals actually in the firm to get hidden goodwill, multiply by his share, and debit him crediting the sacrificing partners", 'Hidden goodwill in four steps');
const vW5 = table(
  ['Step (Yercaud Coffee Roasters, imagined)', 'Working', '₹'],
  [
    ['Implied total capital', `${inr(W5.cap)} ÷ ${W5r.newShare}`, inr(W5implied)],
    ['Actual capital', `${inr(W5.Kartik)} + ${inr(W5.Malini)} + ${inr(W5.cap)}`, inr(W5actual)],
    ['Hidden goodwill', `${inr(W5implied)} − ${inr(W5actual)}`, `**${inr(W5hg)}**`],
    ["Nimisha's share", `${inr(W5hg)} × ${W5r.newShare}`, `**${inr(W5share)}**`],
    ['Credited 3 : 1', `Kartik ${inr(W5s.Kartik)}, Malini ${inr(W5s.Malini)}`, inr(W5share)],
  ],
  `Table of worked example 5: implied capital ${inr(W5implied)}, actual capital ${inr(W5actual)}, hidden goodwill ${inr(W5hg)}, Nimisha's share ${inr(W5share)} credited to Kartik ${inr(W5s.Kartik)} and Malini ${inr(W5s.Malini)} rupees`,
  `Entry: Nimisha's Capital A/c Dr. ${rs(W5share)} To Kartik's Capital A/c ${rs(W5s.Kartik)} and Malini's Capital A/c ${rs(W5s.Malini)}.`,
);
const vSummary1 = table(
  ['Idea', 'Rule'],
  [
    ['Sacrifice', 'Old share − new share; a negative result is a gain'],
    ['Premium for goodwill', "Firm's goodwill × newcomer's share"],
    ['Who receives it', 'Sacrificing partners, in the sacrificing ratio'],
    ['Old partner who gains', 'Pays for his gain, like the newcomer'],
    ['Premium not brought', 'Debit newcomer\'s current account (fixed capitals) or capital account'],
    ['Goodwill already in books', 'Write off in the old ratio'],
    ['Hidden goodwill', 'Capital ÷ share − actual total capital'],
  ],
  'Summary table of Part 1: sacrifice is old share minus new share, negative meaning a gain; premium is goodwill times the newcomer\'s share and goes to sacrificing partners in the sacrificing ratio; a gaining old partner also pays; premium not brought is debited to the newcomer; old goodwill is written off in the old ratio; hidden goodwill comes from the capitals',
);

// ---------------------------------------------------------------- visuals: Part 2
const vRoute2 = flow('LR', ['Revaluation Account', 'Reserves and accumulated profits or losses', 'Capital accounts', 'New Balance Sheet (horizontal)', 'Adjusting capitals', 'Change in ratio among existing partners'], 'Route map of Part 2: revaluation account, reserves and accumulated profits or losses, capital accounts, the new balance sheet in horizontal form, adjusting capitals, and a change in ratio among existing partners', 'Part 2 at a glance');
const vWhyReval = flow('LR', ['Book values are out of date', 'Revalue assets, reassess liabilities', 'Gain or loss belongs to the old firm', 'Old partners, old ratio'], 'Flow: book values are out of date, so assets are revalued and liabilities reassessed; the gain or loss belongs to the old firm and goes to the old partners in the old ratio', 'Why revalue first');
const vRevalFormat = table(
  ['Debit side (losses)', 'Credit side (gains)'],
  [
    ['Fall in the value of an asset', 'Rise in the value of an asset'],
    ['Rise in a liability', 'Fall in a liability'],
    ['Unrecorded liability brought in', 'Unrecorded asset brought in'],
    ['New or higher provision', 'Provision no longer needed'],
    ['Balance: profit to old partners (old ratio)', 'Balance: loss to old partners (old ratio)'],
  ],
  'Table of the revaluation account: debit side for falls in assets, rises in liabilities, unrecorded liabilities and new provisions, with a profit balance to the old partners; credit side for rises in assets, falls in liabilities and unrecorded assets, with a loss balance to the old partners',
  'Also called the Profit and Loss Adjustment Account.',
);
const vKonOld = table(KON.oldBS.headers, KON.oldBS.rows, `Balance sheet of Konark Stone Carvers before admission, totalling ${inr(KON.oldBS.total)} rupees: creditors, general reserve and the capitals of Prabhat and Rohini; bank, debtors, stock, machinery and building`, `Balance Sheet as at 31 March 2026 (horizontal form).`);
const vKonReval = table(KON.reval.headers, KON.reval.rows, `Revaluation account of Konark Stone Carvers: debit side machinery ${inr(KO.mach)}, provision ${inr(KO.prov)} and outstanding electricity ${inr(KO.elec)}; credit side building ${inr(KO.building)}; profit ${inr(KON.reval.net)} rupees shared Prabhat ${inr(KON.reval.parts.Prabhat)} and Rohini ${inr(KON.reval.parts.Rohini)}`);
const vReserves = table(
  ['Item in the old balance sheet', 'If closed (old partners, old ratio)', 'If kept in the books'],
  [
    ['General reserve, credit balance of profit and loss', 'Credited to old partners\' capitals', "Single entry: newcomer's Capital A/c Dr. (his share of the net) To sacrificing partners"],
    ['Debit balance of profit and loss, deferred revenue expenditure', 'Debited to old partners\' capitals', 'Reduces the net figure in the same single entry'],
    ['Workmen compensation reserve', 'Claim first; balance credited (excess claim: revaluation loss)', '—'],
    ['Investment fluctuation reserve', 'Fall first; balance credited (excess fall: revaluation loss)', '—'],
  ],
  'Table of reserves on admission: reserves and credit balances are credited, and accumulated losses and deferred revenue expenditure debited, to the old partners in the old ratio; if they are kept in the books, one entry debits the newcomer with his share of the net and credits the sacrificing partners; special reserves first meet the claim or the fall',
);
const vW7 = table(
  ['Dhauli Agarbatti Works (imagined)', 'Particulars', 'Dr (₹)', 'Cr (₹)'],
  [
    ['(a) Closed', 'General Reserve A/c Dr.', inr(W7.gr), ''],
    ['', `To ${C('Tapan')} / ${C('Usha')}`, '', `${inr(w7(W7.gr).Tapan)} / ${inr(w7(W7.gr).Usha)}`],
    ['', `${C('Tapan')} / ${C('Usha')} Dr.`, `${inr(w7(W7.loss).Tapan)} / ${inr(w7(W7.loss).Usha)}`, ''],
    ['', 'To Profit and Loss A/c', '', inr(W7.loss)],
    ['(b) Kept', `${C('Vikas')} Dr.`, inr(W7v), ''],
    ['', `To ${C('Tapan')} / ${C('Usha')}`, '', `${inr(W7s.Tapan)} / ${inr(W7s.Usha)}`],
  ],
  `Table of worked example 7: if closed, the general reserve of ${inr(W7.gr)} is credited ${inr(w7(W7.gr).Tapan)} and ${inr(w7(W7.gr).Usha)} and the loss of ${inr(W7.loss)} debited ${inr(w7(W7.loss).Tapan)} and ${inr(w7(W7.loss).Usha)}; if kept, Vikas is debited ${inr(W7v)} rupees, one quarter of the net ${inr(W7net)}, credited ${inr(W7s.Tapan)} and ${inr(W7s.Usha)}`,
);
const vCapOrder = flow('TB', ['Balance b/d (old partners)', '+ revaluation profit, reserves, premium', '− revaluation loss, accumulated losses, old goodwill written off', "+ capital brought by the newcomer", '± surplus or shortfall if capitals are adjusted', 'Balance c/d → new Balance Sheet'], "Flow of entries in the partners' capital accounts: opening balances; plus revaluation profit, reserves and premium; minus losses and old goodwill; plus the newcomer's capital; plus or minus capital adjustments; closing balances to the new balance sheet", 'Order of entries in the capital accounts');
const vKonCaps = table(KON.caps.headers, KON.caps.rows, `Partners' capital accounts of Konark Stone Carvers: Prabhat and Rohini credited with revaluation profit, general reserve and premium; Sanjana credited ${inr(KON.K)}; closing balances Prabhat ${inr(KON.caps.closing.Prabhat)}, Rohini ${inr(KON.caps.closing.Rohini)} and Sanjana ${inr(KON.caps.closing.Sanjana)} rupees`);
const vKonBS = table(KON.newBS.headers, KON.newBS.rows, `Balance sheet of Konark Stone Carvers after Sanjana's admission, in horizontal form, totalling ${inr(KON.newBS.total)} rupees: creditors, the outstanding electricity bill and three capitals on the left; bank ${inr(KON.bank)}, debtors net of provision, stock, machinery and building at revised values on the right`, 'Reserve gone, revised values in, bank up by everything Sanjana brought.');
const vAdjFlow = flow('LR', ["Newcomer's capital ÷ his share = total capital", "Total × old partner's new share = required capital", 'Compare with his adjusted capital', 'Surplus: withdraw or credit current account; shortfall: bring cash or debit current account'], "Flow for adjusting the old partners' capitals: divide the newcomer's capital by his share for the total, multiply by each old partner's new share for the required capital, compare with his adjusted capital, and settle in cash or through current accounts", 'Capitals in the new ratio');
const vW8 = table(
  ['Ooty Varkey Bakers (imagined)', 'Ajit', 'Bharati'],
  [
    ['New share', `${W8r.newShares.Ajit}`, `${W8r.newShares.Bharati}`],
    [`Required (${inr(W8total)} × share)`, inr(W8req.Ajit), inr(W8req.Bharati)],
    ['Adjusted capital', inr(W8.Ajit), inr(W8.Bharati)],
    ['Current account', `Cr. ${inr(-W8d.Ajit)} (surplus)`, `Dr. ${inr(W8d.Bharati)} (shortfall)`],
  ],
  `Table of worked example 8: total capital ${inr(W8total)}; Ajit and Bharati each need ${inr(W8req.Ajit)}; Ajit's surplus of ${inr(-W8d.Ajit)} is credited to his current account and Bharati's shortfall of ${inr(W8d.Bharati)} debited to hers`,
  `Total capital = ${rs(W8.cap)} ÷ ${W8r.newShare} = ${rs(W8total)}.`,
);
const vChange = table(
  ['Item', 'On a change in ratio (no partner joins)'],
  [
    ['Sacrifice / gain', 'Old share − new share: positive = sacrifice, negative = gain'],
    ['Goodwill', "Gaining partner's Capital A/c Dr. To sacrificing partner's Capital A/c"],
    ['Revaluation', 'Profit or loss shared in the **old** ratio'],
    ['Reserves closed', 'Shared in the **old** ratio'],
    ['Reserves kept', 'Gainer Dr. To sacrificer, with (old − new) × net reserves'],
  ],
  'Table of a change in profit-sharing ratio among existing partners: sacrifice or gain is old minus new share; the gaining partner compensates the sacrificing partner for goodwill; revaluation and reserves closed go in the old ratio; reserves kept need one gainer to sacrificer entry',
);
const vW10 = table(W10j.headers, W10j.rows, `Journal of worked example 9: Gulnar's capital debited ${inr(W10g.value)} for goodwill and ${inr(W10r.value)} for the reserve kept, crediting Feroz; revaluation profit ${inr(W10x.reval)} credited Feroz ${inr(W10rv.Feroz)} and Gulnar ${inr(W10rv.Gulnar)} rupees`);
const vSummary2 = table(
  ['Step', 'Rule'],
  [
    ['Revaluation', 'Losses Dr., gains Cr.; balance to old partners in the old ratio'],
    ['Reserves closed', 'Credited (losses debited) to old partners in the old ratio'],
    ['Reserves kept', "Newcomer Dr. with his share of the net; sacrificing partners Cr."],
    ['Adjusting capitals', "Total = newcomer's capital ÷ his share; required = total × new share"],
    ["Newcomer's capital from old capitals", "Old adjusted capitals ÷ their combined share × his share"],
    ['New Balance Sheet', 'Horizontal form; revised values; closing capitals and any current accounts'],
    ['Change in ratio', 'Gainer pays sacrificer for goodwill; revaluation in the old ratio'],
  ],
  'Summary table of Part 2: revaluation and closed reserves go to the old partners in the old ratio; kept reserves need a single entry; capitals are adjusted from the newcomer\'s capital or his capital found from the old capitals; the new balance sheet is horizontal with revised values; on a change in ratio the gainer pays the sacrificer',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Admission of a Partner — Part 1: Ratios and Goodwill',
  goals: [
    'Calculate the new profit-sharing ratio, the sacrificing ratio and any gain by an old partner on admission',
    'Account for goodwill under Accounting Standard 26: premium in cash, retained, withdrawn, in kind, paid privately or not brought (current accounts under fixed capitals)',
    'Write off goodwill already in the books and calculate hidden goodwill',
  ],
  slides: [
    sl('title', 'Reconstitution: Admission of a Partner', {
      b: 'Part 1 — **ratios** and **goodwill** when a new partner joins. Every firm, person and figure in this chapter is imagined.',
      v: vRoute1,
      n: 'When a firm takes in a new partner, the old agreement ends and a new one begins, but the business carries on. This is called reconstitution. The newcomer buys a share in the assets and in the future profits. In this first part we work out the new ratios, see who gives up what, and learn how the old partners are paid for the goodwill they built.',
    }),
    sl('concept', 'Reconstitution and what must be settled', {
      bl: [
        'Under the **Indian Partnership Act, 1932**, a partner is admitted only with the consent of **all** existing partners (unless the deed says otherwise).',
        'The firm is **reconstituted**, not dissolved: the books are adjusted, not closed.',
        'Six matters are settled before the newcomer shares any profit (see the flow).',
      ],
      v: vAdjust,
      n: 'Under the Indian Partnership Act, every existing partner must agree before a newcomer joins. The firm is reconstituted, so we adjust the books instead of closing them. Six matters are settled: the new ratio, the sacrificing ratio and any gain, goodwill, revaluation, reserves and past profits or losses, and finally the capitals and the new balance sheet. This part covers the first three.',
    }),
    sl('concept', 'Where the new partner\'s share comes from', {
      v: vCases,
      n: 'The newcomer\'s share always comes out of the old shares, but the terms differ. The old partners may give in their old ratio, each may surrender a fraction of his own share, each may give a fraction of the whole firm, or the new ratio may simply be stated. In the last case one old partner may even gain. In every case, sacrifice equals old share minus new share.',
    }),
    sl('example', 'Worked example 1: share taken in the old ratio', {
      b: 'Pragati Pickles, Nizamabad (imagined): Sushant and Trupti share **2 : 1**. Udit joins for **1/3**, taken from both in their old ratio.',
      bl: ['Step 1: each old partner keeps 1 − 1/3 = 2/3 of his or her share.', 'Step 2: multiply, then write every share over one denominator.'],
      v: vW1,
      n: `Udit takes one third, so each old partner keeps two thirds of his or her own share. Sushant's two thirds times two thirds is ${fw(W1.newShares.Sushant)}. Trupti's one third times two thirds is ${fw(W1.newShares.Trupti)}. Udit's one third is three ninths. The new ratio is ${ratioWords(W1.newInts)}, and because both gave in the old ratio, the sacrificing ratio is still two to one.`,
    }),
    sl('diagram', 'Before and after, side by side', {
      v: vShares,
      b: "The newcomer's slice is carved out of the old slices.",
      n: 'Each bar is the whole profit of the firm. Before admission, Sushant has two thirds and Trupti one third. After admission, Udit\'s third is carved out of both, in the ratio two to one, so Sushant drops to four ninths and Trupti to two ninths. The two bars are the same length, because the shares always add up to one.',
    }),
    sl('check', 'Quick check: fractions of the firm', {
      b: 'Subtract a fraction of the firm directly.',
      chk: 'm_equal_give',
      n: 'Each old partner hands over a fraction of the whole profit. Subtract it straight from each old share.',
    }),
    sl('example', 'Worked example 2: an old partner who gains', {
      b: 'Zoji Woollens, Leh (imagined): Amrita and Bhuvan share **3 : 2**. Cyrus joins, and the new ratio of Amrita, Bhuvan and Cyrus is stated as **1 : 2 : 1**.',
      v: vW2,
      n: `Write every share in twentieths. Amrita falls from twelve to five twentieths, a sacrifice of ${fw(W2.sac.Amrita)}. Bhuvan rises from eight to ten twentieths, so he gains ${fw(W2.sac.Bhuvan.abs())}. Cyrus receives ${fw(W2.newShare)}. Amrita alone gives up enough to cover both Cyrus and Bhuvan, so both of them must pay her for goodwill.`,
    }),
    sl('check', 'Quick check: can an old partner gain?', {
      b: 'Think about a stated new ratio.',
      chk: 'tf_possible_gain',
      n: 'When the new ratio is simply stated, compare each old share with each new share. Can a difference be negative?',
    }),
    sl('concept', 'Goodwill on admission and Accounting Standard 26', {
      v: vGwFlow,
      bl: ["**Premium for goodwill** = firm's goodwill × newcomer's share.", 'Only **purchased goodwill** may be recorded, so no goodwill account is raised on admission.'],
      n: "The old partners built the firm's reputation, and now they give up part of the profits it will earn. So the newcomer, and any old partner who gains, pays them for goodwill. The premium equals the firm's goodwill times the newcomer's share. Accounting Standard twenty-six allows only purchased goodwill to be recorded, so no goodwill account is opened.",
    }),
    sl('concept', 'Goodwill entries in each situation', {
      v: vGwCases,
      n: 'Premium in cash passes through the premium for goodwill account to the sacrificing partners. If it is retained, nothing more is needed; if withdrawn, their capitals are debited and the bank credited. Premium in kind debits the asset brought. If the newcomer cannot pay, his current account is debited when capitals are fixed. A private payment needs no entry at all.',
    }),
    sl('example', 'Worked example 3: goodwill when an old partner gains', {
      b: `Zoji Woollens: goodwill is valued at ${rs(W3.gw)}. Cyrus brings his premium in cash; Bhuvan's gain is charged to his capital.`,
      v: vW3,
      n: `Amrita must receive seven twentieths of ${rw(W3.gw)}, that is ${rw(W3x.amrita)}. Cyrus pays one quarter, ${rw(W3x.cyrus)}, in cash. Bhuvan pays for his gain of one tenth, ${rw(W3x.bhuvan)}, through his capital account. The two payments together equal Amrita's compensation.`,
    }),
    sl('example', 'Worked example 4: premium not brought, fixed capitals', {
      b: `Pragati Pickles keeps **fixed capitals**. Goodwill is valued at ${rs(W4.gw)}; Udit (1/3) cannot bring his premium.`,
      v: vW4,
      n: `Udit's share of goodwill is one third of ${rw(W4.gw)}, that is ${rw(W4p)}. With fixed capitals, the capital accounts change only for capital introduced or withdrawn, so the adjustment goes through current accounts. Udit's current account is debited, and Sushant and Trupti's current accounts are credited in two to one: ${rw(W4s.Sushant)} and ${rw(W4s.Trupti)}.`,
    }),
    sl('check', 'Quick check: fixed capitals and goodwill', {
      b: 'Which accounts carry the adjustment?',
      chk: 'm_current_fixed',
      n: 'With fixed capitals, where do adjustments other than capital introduced go?',
    }),
    sl('concept', 'Goodwill already in the books', {
      v: vOldGw,
      bl: ['Old goodwill belongs to the old firm: write it off **first**, in the **old ratio**.', 'The newcomer\'s share of the current goodwill is then handled in the usual way.'],
      n: 'Sometimes the old balance sheet already shows goodwill. It belongs to the old firm, so it is written off among the old partners in their old ratio before anything else. After that, the newcomer\'s share of the goodwill valued now is handled as a premium or a capital adjustment in the sacrificing ratio.',
    }),
    sl('concept', 'Hidden goodwill', {
      v: vHidden,
      b: "When nothing is said about goodwill, the newcomer's **capital** can reveal it.",
      n: "Sometimes the terms say nothing about goodwill, but the newcomer agrees to bring a capital that is large for his share. Divide his capital by his share to get the capital the firm is worth to him. Subtract the capitals actually in the firm after his admission. The difference is hidden goodwill, and his share of it is charged to him and credited to the sacrificing partners.",
    }),
    sl('example', 'Worked example 5: hidden goodwill', {
      b: `Yercaud Coffee Roasters (imagined): Kartik and Malini share **3 : 1**; capitals after adjustments ${rs(W5.Kartik)} and ${rs(W5.Malini)}. Nimisha joins for **1/5** with ${rs(W5.cap)}, no premium.`,
      v: vW5,
      n: `Nimisha's ${rw(W5.cap)} for one fifth values the capital at ${rw(W5implied)}. The capitals actually in the firm add up to ${rw(W5actual)}. So hidden goodwill is ${rw(W5hg)}, and Nimisha's fifth, ${rw(W5share)}, is debited to her and credited to Kartik and Malini in three to one.`,
    }),
    sl('check', 'Quick check: hidden goodwill', {
      b: 'Implied capital, minus actual capital, times the new share.',
      chk: 'n_hidden_share',
      n: 'Follow the four steps of the flow and give your answer in rupees.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up: each sacrifice is old share minus new share, and a negative result is a gain. The premium for goodwill is the firm\'s goodwill times the newcomer\'s share and goes to the sacrificing partners. A gaining old partner pays as well. If the premium is not brought, the newcomer is charged. Old goodwill is written off in the old ratio, and hidden goodwill is read from the capitals.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Always **show the sacrificing ratio**; it often differs from the old ratio.',
        'Read the wording: a fraction **of his own share** is multiplied; a fraction **of the firm** is subtracted.',
        'If the new ratio is stated, check every partner: an old partner may **gain** and must pay for it.',
        'With **fixed capitals**, goodwill adjustments go through **current accounts**.',
        'Write a **narration** under every entry, and never open a goodwill account for the premium.',
      ],
      n: 'A few habits save marks. Show the sacrificing ratio every time. Read whether a partner gives a fraction of his own share or of the whole firm. When the new ratio is stated, check each partner, because one may gain. Remember that fixed capitals push goodwill adjustments into current accounts. And write a narration under every journal entry.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Admission of a Partner — Part 2: Revaluation, Reserves, Capitals and Change in Ratio',
  goals: [
    'Prepare the Revaluation Account and share its result among the old partners',
    'Close reserves and accumulated profits or losses, or keep them with a single adjustment entry',
    'Prepare the capital accounts and the new Balance Sheet in horizontal form, adjusting capitals where agreed',
    'Pass the adjustment entries when existing partners change their profit-sharing ratio',
  ],
  slides: [
    sl('title', 'Revaluation, reserves, capitals and change in ratio', {
      b: 'Part 2 — the **Revaluation Account**, **reserves**, the **capital accounts**, the **Balance Sheet** in horizontal form, adjusting **capitals**, and a **change in ratio** among existing partners.',
      v: vRoute2,
      n: 'In the first part we settled ratios and goodwill. Now we bring the books up to date before the newcomer steps in. We revalue assets and liabilities, deal with reserves and past profits or losses, prepare the capital accounts and the new balance sheet, adjust capitals, and finally see the same ideas at work when partners simply change their ratio.',
    }),
    sl('concept', 'Why revalue before admission?', {
      v: vWhyReval,
      bl: ['Book values may be **out of date**: buildings rise, machines wear out, bills go unrecorded.', 'Gains and losses up to admission belong to the **old partners**, in the **old ratio**.'],
      n: 'The books show historical figures, which may be far from real values on the day of admission. A building may have risen in value, a machine may be worth less, and a bill may be unrecorded. If we ignored these, the newcomer would share gains or losses that arose before he joined. So we revalue first and give the result to the old partners.',
    }),
    sl('two-column', 'The Revaluation Account', {
      cols: [
        '**Debit (losses)**\n\n- Fall in an asset\n- Rise in a liability\n- Unrecorded liability\n- New provision',
        '**Credit (gains)**\n\n- Rise in an asset\n- Fall in a liability\n- Unrecorded asset\n- Provision released',
      ],
      v: vRevalFormat,
      n: 'The revaluation account works like a small profit and loss account. Anything that lowers the worth of the old firm goes on the debit side: a fall in an asset, a rise in a liability, an unrecorded liability or a new provision. Anything that raises it goes on the credit side. The balance is a profit or a loss of the old partners in their old ratio.',
    }),
    sl('example', 'Worked example 6: the starting balance sheet', {
      b: `Konark Stone Carvers, Puri (imagined): Prabhat and Rohini share **3 : 2**. Sanjana joins on 1 April 2026 for **1/4**, taken in the old ratio. She brings ${rs(KO.cap)} as capital and her premium in cash (goodwill ${rs(KO.gw)}).`,
      v: vKonOld,
      n: `Here is the balance sheet of Konark Stone Carvers just before Sanjana joins, in horizontal form, with liabilities on the left and assets on the right. Note the general reserve of ${rw(KO.gr)}: it belongs to Prabhat and Rohini. Sanjana takes one quarter in the old ratio, so the sacrificing ratio is three to two.`,
    }),
    sl('example', 'Worked example 6 (continued): Revaluation Account', {
      b: `Building up by ${rs(KO.building)}; machinery down 10%; a 5% provision on debtors; an unrecorded electricity bill of ${rs(KO.elec)}.`,
      v: vKonReval,
      n: `Put the losses on the debit side: machinery ${words(KO.mach)}, the provision ${words(KO.prov)} and the electricity bill ${words(KO.elec)}. The gain on the building, ${words(KO.building)}, goes on the credit side. The credit side is larger by ${rw(KON.reval.net)}, a profit. Prabhat takes three fifths, ${rw(KON.reval.parts.Prabhat)}, and Rohini two fifths, ${rw(KON.reval.parts.Rohini)}.`,
    }),
    sl('check', 'Quick check: a gain on revaluation', {
      b: 'Which side does it go on?',
      chk: 'm_reval_cr',
      n: 'Ask yourself whether the item raises or lowers the worth of the old firm.',
    }),
    sl('concept', 'Reserves and accumulated profits or losses', {
      v: vReserves,
      n: 'Reserves and undistributed profits were earned by the old partners, so they are credited to them in the old ratio, and accumulated losses are debited the same way. If the partners prefer to keep these items in the books, one entry does the job: the newcomer is debited with his share of the net figure, and the sacrificing partners are credited. Special reserves first meet the claim or the fall.',
    }),
    sl('example', 'Worked example 7: closed or kept', {
      b: `Dhauli Agarbatti Works, Bhubaneswar (imagined): Tapan and Usha share **2 : 1**; Vikas joins for **1/4** (old ratio). General reserve ${rs(W7.gr)}; debit balance of profit and loss ${rs(W7.loss)}.`,
      v: vW7,
      n: `If the items are closed, the reserve of ${rw(W7.gr)} is credited two to one and the loss of ${rw(W7.loss)} debited two to one. If they are kept, the net is ${rw(W7net)}. Vikas's quarter of it, ${rw(W7v)}, is debited to him and credited to Tapan and Usha in their sacrificing ratio. Both methods leave the old partners equally well off.`,
    }),
    sl('check', 'Quick check: who owns the reserve?', {
      b: 'Think about when the reserve was earned.',
      chk: 'tf_reserve',
      n: 'Was the reserve built before or after the new partner joined?',
    }),
    sl('concept', "The partners' capital accounts", {
      v: vCapOrder,
      b: 'Prepare them in **columnar form**, one column per partner, newcomer included.',
      n: 'All the adjustments meet in the partners\' capital accounts, kept in columnar form. Start with the opening balances. Credit the old partners with revaluation profit, reserves and premium, and debit them with losses and any old goodwill. Credit the newcomer with his capital. Capital adjustments, if any, come last, and the closing balances go to the new balance sheet.',
    }),
    sl('example', 'Worked example 6 (continued): capital accounts', {
      b: 'Credits to the old partners: revaluation profit, general reserve (3 : 2) and premium (sacrificing ratio 3 : 2).',
      v: vKonCaps,
      n: `Prabhat and Rohini receive three credits each: the revaluation profit, the general reserve in three to two, and the premium of ${rw(KON.premium)} in their sacrificing ratio, also three to two. Sanjana is credited with her capital. The closing balances are ${rw(KON.caps.closing.Prabhat)} for Prabhat, ${rw(KON.caps.closing.Rohini)} for Rohini and ${rw(KON.caps.closing.Sanjana)} for Sanjana.`,
    }),
    sl('example', 'Worked example 6 (continued): the new Balance Sheet', {
      b: 'Horizontal form; revised values; reserve removed; bank increased by everything Sanjana brought.',
      v: vKonBS,
      n: `The new balance sheet shows creditors, the electricity bill as a new liability, and the three closing capitals. On the assets side, the bank now holds ${rw(KON.bank)}, debtors are shown net of the provision, and machinery and building appear at revised values. Both sides total ${rw(KON.newBS.total)}, which is our final check.`,
    }),
    sl('concept', "Adjusting old partners' capitals", {
      v: vAdjFlow,
      bl: ["**Total capital** = newcomer's capital ÷ his share.", '**Required capital** = total capital × his **new** share.', 'Settle the difference in **cash** or through **current accounts**.', "Or reverse it: newcomer's capital = old adjusted capitals ÷ their combined share × his share."],
      n: "Partners often agree that capitals should follow the new ratio. Divide the newcomer's capital by his share to get the total capital, then multiply by each old partner's new share. Compare that with his adjusted capital and settle the difference in cash or through current accounts. Sometimes it works the other way, and the old capitals fix the newcomer's capital.",
    }),
    sl('example', 'Worked example 8: capitals through current accounts', {
      b: `Ooty Varkey Bakers (imagined): Ajit and Bharati share equally. Chandni joins for **1/3** (old ratio) with ${rs(W8.cap)}. Adjusted capitals: Ajit ${rs(W8.Ajit)}, Bharati ${rs(W8.Bharati)}.`,
      v: vW8,
      n: `Chandni's ${rw(W8.cap)} for one third means a total capital of ${rw(W8total)}. The new ratio is one to one to one, so Ajit and Bharati each need ${rw(W8req.Ajit)}. Ajit's surplus of ${rw(-W8d.Ajit)} is credited to his current account, and Bharati's shortfall of ${rw(W8d.Bharati)} is debited to hers. No cash changes hands.`,
    }),
    sl('check', 'Quick check: current accounts', {
      b: 'Does any cash move?',
      chk: 'tf_cap_adj',
      n: 'When the difference is settled through current accounts, is the surplus paid out in cash?',
    }),
    sl('concept', 'Change in ratio among existing partners', {
      v: vChange,
      b: 'The firm is reconstituted even when **no partner joins or leaves**.',
      n: 'Partners sometimes change their ratio without anyone joining. The same logic applies. Old share minus new share shows who sacrifices and who gains. The gaining partner compensates the sacrificing partner for goodwill. Revaluation and closed reserves follow the old ratio, and reserves kept in the books need one entry from the gainer to the sacrificer.',
    }),
    sl('example', 'Worked example 9: a change in ratio', {
      b: `Sonamarg Trek Outfitters (imagined): Feroz and Gulnar change from **3 : 2** to **2 : 3**. Goodwill ${rs(W10x.gw)}; general reserve ${rs(W10x.gr)} kept in the books; revaluation profit ${rs(W10x.reval)}.`,
      v: vW10,
      n: `Feroz falls from three fifths to two fifths, a sacrifice of one fifth, and Gulnar gains the same. Gulnar pays Feroz one fifth of the goodwill, ${rw(W10g.value)}, and one fifth of the reserve kept in the books, ${rw(W10r.value)}. The revaluation profit of ${rw(W10x.reval)} is still shared in the old ratio of three to two.`,
    }),
    sl('check', 'Quick check: who gains?', {
      b: 'Compare each old share with the new one.',
      chk: 'm_gaining',
      n: 'Write both ratios as fractions over ten, then subtract new from old.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up: revaluation gains and losses and closed reserves belong to the old partners in the old ratio, while reserves kept in the books need a single entry. Everything flows into the capital accounts and then into the new balance sheet in horizontal form. Capitals can be adjusted to the new ratio. On a change in ratio, the gainer pays the sacrificer.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'In a full practical, marks go to the **Revaluation Account**, the **capital accounts** and the **Balance Sheet**: attempt all three.',
        'Show **working notes** for ratios, premium, provisions and capital adjustments.',
        'Reserves never pass through the Revaluation Account; they go **straight to capitals** (or into a single entry).',
        'Finish every adjustment to the old capitals **before** comparing them with required capitals.',
        'Draw the Balance Sheet in **horizontal form**; if it does not tally, check the **bank** first.',
      ],
      n: 'In a full admission problem, marks are spread over the revaluation account, the capital accounts and the balance sheet, so attempt all three. Show working notes. Keep reserves out of the revaluation account. Complete every adjustment before comparing capitals. Draw the balance sheet in horizontal form, and if it does not agree, check the bank figure first.',
    }),
  ],
});

// Narration house rules on top of lib.mjs: no digits, no rupee sign, no slashes, ampersands or per-cent signs, no capitals runs.
for (const d of [part1, part2])
  for (const s of d.slides) {
    const m = /\d|₹|[\/&%]|\b[A-Z]{2,}\b/.exec(s.narration);
    check(!m, `narration of part ${d.part} ${s.id} has "${m?.[0]}"`);
  }

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Reconstitution of Partnership: Admission of a Partner — Notes',
  sections: [
    {
      h: '1. Reconstitution and admission',
      t: 1,
      b: 'Any change in the agreement among partners **reconstitutes** the firm: the old agreement ends and a new one begins, but the firm continues and its books are adjusted, not closed. Admission of a partner, a change in the profit-sharing ratio among existing partners, and retirement or death are all reconstitutions.\n\nUnder the **Indian Partnership Act, 1932**, a new partner can be admitted only with the consent of all existing partners, unless the deed provides otherwise. The newcomer acquires a **share in the assets** and a **share in the future profits** of the firm.\n\n**Matters settled on admission:** new ratio; sacrificing (and any gaining) ratio; goodwill; revaluation; reserves and accumulated profits or losses; capitals and the new Balance Sheet.\n\n*Not in the ISC 2027 syllabus for this chapter:* memorandum revaluation account, joint life and individual life policies, and admission of a partner during an accounting year.',
      terms: [
        ['Reconstitution', 'A change in the agreement among partners while the firm itself continues.'],
        ['Admission of a partner', 'Entry of a new partner into an existing firm with the consent of all existing partners.'],
      ],
      v: vAdjust,
    },
    {
      h: '2. New, sacrificing and gaining ratios',
      t: 1,
      b: '**Sacrifice = old share − new share.** A positive result is a sacrifice; a negative result is a **gain**.\n\n| Terms of admission | How to compute |\n|---|---|\n| Share taken in the old ratio | New share = old share × (1 − newcomer\'s share); sacrificing ratio = old ratio |\n| Fraction **of his own share** surrendered | Sacrifice = old share × fraction |\n| Fraction **of the firm** given | Sacrifice = that fraction |\n| New ratio stated | Old share − new share for each partner (an old partner may gain) |\n\n**Checks:** new shares add up to 1; sacrifices minus any gains equal the newcomer\'s share.',
      terms: [
        ['Sacrificing ratio', 'Ratio in which the old partners give up their shares of profit.'],
        ['Gaining ratio', 'Ratio in which partners whose shares rise acquire their extra shares.'],
      ],
      v: vCases,
      vs: [vW1, vShares, vW2],
    },
    {
      h: '3. Goodwill on admission (Accounting Standard 26)',
      t: 2,
      b: "**Premium for goodwill = firm's goodwill × newcomer's share**, credited to the **sacrificing partners in the sacrificing ratio**. An old partner who gains pays for his gain in the same way. Accounting Standard 26 allows only purchased goodwill to be recorded, so **no goodwill account** is raised on admission.\n\n- **In cash:** Bank A/c Dr. To Premium for Goodwill A/c; Premium for Goodwill A/c Dr. To sacrificing partners' Capital A/cs.\n- **Retained:** no further entry.\n- **Withdrawn:** sacrificing partners' Capital A/cs Dr. To Bank A/c.\n- **In kind:** Asset A/c Dr. To Premium for Goodwill A/c and To newcomer's Capital A/c.\n- **Not brought (wholly or partly):** newcomer's Current A/c (fixed capitals) or Capital A/c (fluctuating) Dr. To sacrificing partners' Current or Capital A/cs.\n- **Paid privately:** no entry.",
      terms: [
        ['Premium for goodwill', "Amount the newcomer pays for his share of the firm's goodwill, to compensate the sacrificing partners."],
        ['Purchased goodwill', 'Goodwill acquired for a consideration; the only goodwill that may be recorded under Accounting Standard 26.'],
      ],
      v: vGwCases,
      vs: [vGwFlow, vW3, vW4],
    },
    {
      h: '4. Goodwill already in the books, and hidden goodwill',
      t: 3,
      b: "**Goodwill already in the books** belongs to the old firm: Old partners' Capital A/cs Dr. (old ratio) To Goodwill A/c.\n\n**Hidden goodwill**, when no premium is stated:\n1. Implied total capital = newcomer's capital ÷ his share.\n2. Actual capital = old partners' capitals **after all adjustments** + newcomer's capital.\n3. Hidden goodwill = implied − actual.\n4. Newcomer's share = hidden goodwill × his share: Newcomer's Capital (or Current) A/c Dr. To sacrificing partners.",
      terms: [
        ['Hidden goodwill', "Goodwill not stated in the terms but inferred from the capital brought by the new partner."],
        ['Write-off of goodwill', "Removing a book balance of goodwill by debiting the old partners in the old ratio."],
      ],
      v: vHidden,
      vs: [vW5, vOldGw],
    },
    {
      h: '5. The Revaluation Account',
      t: 4,
      b: "The **Revaluation Account** (Profit and Loss Adjustment Account) records changes in values on admission.\n\n- **Debit:** fall in assets, rise in liabilities, unrecorded liabilities, new provisions.\n- **Credit:** rise in assets, fall in liabilities, unrecorded assets, provisions released.\n- **Balance:** profit credited (or loss debited) to the **old partners** in the **old ratio**.\n\nTypical entries: Revaluation A/c Dr. To Machinery A/c (fall); Building A/c Dr. To Revaluation A/c (rise); Revaluation A/c Dr. To old partners' Capital A/cs (profit).",
      terms: [
        ['Revaluation Account', 'Nominal account recording gains and losses from revaluing assets and liabilities on reconstitution.'],
        ['Unrecorded asset or liability', 'An item missing from the books and brought in at the time of admission.'],
      ],
      v: vRevalFormat,
      vs: [vWhyReval, vKonReval],
    },
    {
      h: '6. Reserves and accumulated profits or losses',
      t: 5,
      b: "**If closed** (the usual case), in the **old ratio**:\n- General reserve, credit balance of profit and loss: Reserve A/c Dr. To old partners' Capital A/cs.\n- Debit balance of profit and loss, deferred revenue expenditure (e.g. advertisement suspense): old partners' Capital A/cs Dr. To the account.\n- Workmen compensation reserve: meets the claim first; the balance is credited; an excess claim is a revaluation loss.\n- Investment fluctuation reserve: meets the fall in investments first; the balance is credited; an excess fall is a revaluation loss.\n\n**If kept in the books** (single adjustment entry): net = reserves + credit balances − accumulated losses; Newcomer's Capital A/c Dr. (net × his share) To sacrificing partners' Capital A/cs (sacrificing ratio).",
      terms: [
        ['Accumulated profits', 'Profits earned before admission and kept in the business as reserves or credit balances.'],
        ['Deferred revenue expenditure', 'Revenue expenditure carried forward on the assets side, such as advertisement suspense; a past loss of the old partners.'],
        ['Single adjustment entry', "One entry charging the newcomer with his share of reserves kept in the books, in favour of the sacrificing partners."],
      ],
      v: vReserves,
      vs: [vW7],
    },
    {
      h: '7. Capitals and the new Balance Sheet (horizontal form)',
      t: 6,
      b: "**Capital accounts** are prepared in columnar form for all partners; closing balances go to the new Balance Sheet.\n\n**Old capitals on the basis of the newcomer's capital**\n- Total capital = newcomer's capital ÷ his share; required capital = total × each old partner's new share.\n- Surplus: withdrawn (Capital A/c Dr. To Bank A/c) or credited to the current account; shortfall: brought in (Bank A/c Dr. To Capital A/c) or debited to the current account.\n\n**Newcomer's capital on the basis of the old capitals**\n- Total = old partners' adjusted capitals ÷ their combined new share; newcomer's capital = total × his share.\n\n**New Balance Sheet:** horizontal form, liabilities and capitals on the left, assets on the right; revised values; reserves removed if closed; closing capitals and any current-account balances shown.",
      terms: [
        ['Current account', "A partner's account for adjustments other than fixed capital; used to settle surpluses and shortfalls without cash."],
        ['Proportionate capital', 'Capital in the same proportion as the profit-sharing ratio.'],
      ],
      v: vAdjFlow,
      vs: [vW8, vKonOld, vKonCaps, vKonBS],
    },
    {
      h: '8. Change in profit-sharing ratio among existing partners',
      t: 7,
      b: "No partner joins or leaves, but the firm is still reconstituted.\n\n- **Sacrifice or gain** = old share − new share; **gaining ratio** = ratio of the gains.\n- **Goodwill:** Gaining partner's Capital A/c Dr. To sacrificing partner's Capital A/c, with (old − new) × goodwill.\n- **Revaluation:** profit or loss shared in the **old ratio**.\n- **Reserves closed:** shared in the **old ratio**.\n- **Reserves kept:** Gaining partner Dr. To sacrificing partner, with (old − new) × net reserves.",
      terms: [
        ['Gaining partner', 'A partner whose share of profit increases on reconstitution; he compensates the sacrificing partner.'],
        ['Adjustment entry', 'An entry between partners\' capital accounts that settles goodwill or reserves without opening new accounts.'],
      ],
      v: vChange,
      vs: [vW10],
    },
  ],
  tips: "**Common mistakes**\n- Crediting the premium in the **old ratio** when the sacrificing ratio is different.\n- Ignoring an old partner who **gains** under a stated new ratio.\n- Multiplying when a partner gives a fraction **of the firm**, or subtracting when he surrenders a fraction **of his own share**.\n- Giving the newcomer a share of revaluation profit or of reserves earned before he joined.\n- Posting goodwill adjustments to fixed capital accounts instead of **current accounts**.\n- Comparing capitals before **all** adjustments (revaluation, reserves, premium) are made.\n- Drawing the Balance Sheet in vertical form; partnership reconstitution uses the **horizontal** form.\n\n**How marks are usually awarded (SOYL chapter tests on the ISC default pattern)**\n- 1 mark: objective items.\n- 2 marks: a ratio calculation, or two or three entries with narrations.\n- 3 marks: a Revaluation Account, a hidden-goodwill working with its entry, or a set of reserve entries.\n- 5 marks in parts, e.g. (a) 2 + (b) 3: ratios and goodwill entries, or a Revaluation Account with capital accounts.\n- Full practical (practice, 8 marks): Revaluation Account about 2, capital accounts about 3, Balance Sheet about 3; working notes earn step marks.\n\n**Figures in SOYL practice** are imagined; your board paper will give its own.",
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['**Reconstitution** of a firm', 'A change in the agreement among partners while the firm continues; the books are adjusted, not closed.', 'definition', 1],
  ['Consent needed to admit a partner', 'All existing partners (Indian Partnership Act, 1932), unless the deed says otherwise.', 'fact', 1],
  ['Two rights of a new partner', 'A share in the **assets** and a share in the **future profits**.', 'concept', 1],
  ['**Sacrifice** of an old partner', '**Old share − new share**; a negative result is a gain.', 'definition', 1],
  ['New share when the newcomer takes his share in the old ratio', "Old share × (1 − newcomer's share).", 'fact', 1],
  ['Fraction **of his own share** surrendered', 'Sacrifice = old share × the fraction.', 'exam-tip', 1],
  ['Fraction **of the firm** given', 'Sacrifice = that fraction; subtract it directly.', 'exam-tip', 1],
  ['Can an old partner gain on admission?', 'Yes, when the new ratio is stated; he then pays the sacrificing partner for his gain.', 'concept', 1],
  ['**Premium for goodwill**', "Firm's goodwill × newcomer's share.", 'definition', 2],
  ['Premium is credited to…', 'The **sacrificing partners**, in the **sacrificing ratio**.', 'fact', 2],
  ['Accounting Standard 26 and admission', 'Only purchased goodwill is recorded, so **no goodwill account** is raised.', 'concept', 2],
  ['Premium not brought, fixed capitals', "Newcomer's **Current** A/c Dr. To sacrificing partners' Current A/cs.", 'fact', 2],
  ['Premium withdrawn by the old partners', "Sacrificing partners' Capital A/cs Dr. To Bank A/c.", 'fact', 2],
  ['Premium brought in kind', "Asset A/c Dr. To Premium for Goodwill A/c and To newcomer's Capital A/c.", 'fact', 2],
  ['Premium paid privately', '**No entry** in the firm\'s books.', 'exam-tip', 2],
  ['Goodwill already in the books', 'Written off among the **old partners** in the **old ratio**.', 'fact', 3],
  ['**Hidden goodwill**', "Newcomer's capital ÷ his share − (old adjusted capitals + newcomer's capital).", 'definition', 3],
  ['Purpose of revaluation on admission', 'So the newcomer neither gains nor loses from value changes before he joined.', 'concept', 4],
  ['Revaluation Account: debit side', 'Fall in assets, rise in liabilities, unrecorded liabilities, new provisions.', 'fact', 4],
  ['Revaluation Account: credit side', 'Rise in assets, fall in liabilities, unrecorded assets, provisions released.', 'fact', 4],
  ['Revaluation profit or loss goes to…', 'The **old partners** in the **old ratio**.', 'fact', 4],
  ['General reserve on admission (closed)', "Credited to the old partners' capitals in the **old ratio**.", 'fact', 5],
  ['Deferred revenue expenditure on admission', "Debited to the old partners' capitals in the old ratio.", 'fact', 5],
  ['Reserves to be kept in the books', "Single entry: newcomer's Capital A/c Dr. (his share of the net) To sacrificing partners.", 'concept', 5],
  ['Workmen compensation reserve with a claim', 'Claim met first; balance to old partners; an excess claim is a revaluation loss.', 'concept', 5],
  ['Investment fluctuation reserve and a fall in investments', 'Fall met first; balance to old partners; an excess fall is a revaluation loss.', 'concept', 5],
  ["Total capital from the newcomer's capital", "Newcomer's capital ÷ his share.", 'fact', 6],
  ["Newcomer's capital from the old capitals", "Old adjusted capitals ÷ their combined new share × newcomer's share.", 'fact', 6],
  ['Format of the Balance Sheet after admission', '**Horizontal**: liabilities and capitals on the left, assets on the right.', 'exam-tip', 6],
  ['Goodwill on a change in ratio', "Gaining partner's Capital A/c Dr. To sacrificing partner's Capital A/c.", 'fact', 7],
  ['Revaluation on a change in ratio', 'Shared in the **old** ratio.', 'fact', 7],
]);

// ---------------------------------------------------------------- tests (ISC class defaults, item for item)
const T_SHORT = test({
  kind: 'short',
  blueprint: 'isc-12-default-chapter-test-short',
  title: 'Chapter test (short) — Reconstitution of Partnership: Admission of a Partner',
  duration: 50,
  sections: [
    { id: 'A', title: 'Section A - Objective (5 marks)', instr: 'Answer all questions. Multiple-choice and assertion-reason items carry 1 mark each.', items: ['m_newratio', 'm_premium_retained', 'm_reval_loss', 'm_dre', 'ar_reserve'] },
    { id: 'B', title: 'Section B - Short answer (4 marks)', instr: 'Answer both questions. Internal choice in the second question.', items: ['s2_newratio', { attempt: 1, keys: ['s2_withdraw', 's2_existing'] }] },
    { id: 'C', title: 'Section C - Short answer (6 marks)', instr: 'Answer both questions. Internal choice in the second question. Show your working.', items: ['s3_hidden', { attempt: 1, keys: ['s3_reval', 's3_cap_adj'] }] },
    { id: 'D', title: 'Section D - Long answer (5 marks)', instr: 'Answer the question. It is set in parts (2 + 3 marks); show working notes.', items: ['l5_reserves'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'isc-12-default-chapter-test-long',
  title: 'Chapter test (long) — Reconstitution of Partnership: Admission of a Partner',
  duration: 100,
  sections: [
    { id: 'A', title: 'Section A - Objective (12 marks)', instr: 'Answer all questions. Multiple-choice and assertion-reason items carry 1 mark each.', items: ['m_reconst', 'm_gain_ratio', 'm_premium_amt', 'm_private', 'm_kind', 'm_existing', 'm_hidden2', 'm_wcr', 'm_ifr', 'm_required', 'ar_existing', 'ar_gain'] },
    { id: 'B', title: 'Section B - Short answer (6 marks)', instr: 'Answer all three questions. Internal choice in the last question.', items: ['s2_three_old', 's2_undisturbed', { attempt: 1, keys: ['s2_gaining', 's2_newcap'] }] },
    { id: 'C', title: 'Section C - Short answer (12 marks)', instr: 'Answer all four questions. Internal choice in the last question. Show your working.', items: ['s3_gain_admission', 's3_current', 's3_reserves', { attempt: 1, keys: ['s3_kind_withdraw', 's3_change'] }] },
    { id: 'D', title: 'Section D - Long answer (10 marks)', instr: 'Answer both questions. Internal choice in the second question. Each is set in parts (2 + 3 or 3 + 2 marks).', items: ['l5_ratio_goodwill', { attempt: 1, keys: ['l5_reval_caps', 'l5_cap_current'] }] },
  ],
});

// Deck checks never appear in the tests.
const inTests = new Set([T_SHORT, T_LONG].flatMap((t) => t.sections.flatMap((s) => s.items.map((i) => i.question_id))));
for (const d of [part1, part2]) for (const s of d.slides) if (s.check_question_id) check(!inTests.has(s.check_question_id), `deck check ${s.check_question_id} is also in a test`);

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t07 of isc-12-accounts-ch03 only (new, sacrificing and gaining ratios; goodwill on admission under Accounting Standard 26; hidden and existing goodwill; Revaluation Account; reserves and accumulated profits or losses including the single adjustment entry; capitals and the horizontal Balance Sheet; change in ratio among existing partners). Removed topics appear only as one note in notes section 1.',
    originality: 'every firm, person and figure is imagined and labelled as such; no textbook illustration or exercise and no CISCE specimen or past-paper item is reused; firms and set-ups differ from the CBSE 12 Accountancy chapters',
    data: 'every ratio, share, premium, revaluation result, capital and balance sheet is computed by acc.mjs and asserted: journal entries balance, ledger accounts and balance sheets total, shares divide into whole rupees, bank never overdrawn',
    accounting: 'premium credited in the sacrificing ratio (gaining old partners also pay); revaluation, closed reserves and accumulated losses to old partners in the old ratio; kept reserves by a single adjustment entry; special reserves meet the claim or fall first; fixed capitals use current accounts; no goodwill account raised (Accounting Standard 26)',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
