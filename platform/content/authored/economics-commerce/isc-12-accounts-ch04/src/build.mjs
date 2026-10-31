// Build ISC 12 Accounts ch04 Reconstitution of Partnership: Retirement and Death of a Partner. Run from platform/:
//   npx tsx content/authored/economics-commerce/isc-12-accounts-ch04/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';
import { fr, retire, rs, inr, check, sum, journal, tAccount, splitShares, solveRetirement, loanAccount, timeBasis, turnoverBasis, ratioStr, ratioWords, words, rw, fw } from './acc.mjs';

setUnit('isc-12-accounts-ch04', 'economics-commerce');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const C = (n) => `${n}'s Capital A/c`;
const eq = (a, b, what) => check(JSON.stringify(a) === JSON.stringify(b), `deck figure ${what}: got ${JSON.stringify(a)}, expected ${JSON.stringify(b)}`);
const provLabel = (b, c) => `Debtors ${inr(b)} less provision ${inr(-c)}`;

// ---------------------------------------------------------------- deck figures (computed, never typed)
// Running example, Gulmohar Marble Polishers, Kishangarh (imagined): Anshuman, Bhairavi and Chiranjeev 3 : 2 : 1; Bhairavi retires on 31 March 2026.
const GUL = solveRetirement({
  old: { Anshuman: fr(1, 2), Bhairavi: fr(1, 3), Chiranjeev: fr(1, 6) }, out: 'Bhairavi',
  liabs: [['Creditors', 72000], ['General Reserve', 36000, { reserve: true }], ['Workmen Compensation Reserve', 15000, { wcr: 9000 }], ["Anshuman's Capital", 180000, { cap: 'Anshuman' }], ["Bhairavi's Capital", 120000, { cap: 'Bhairavi' }], ["Chiranjeev's Capital", 75000, { cap: 'Chiranjeev' }]],
  assets: [['Bank', 40000, { bank: true }], ['Debtors', 60000], ['Stock', 75000], ['Machinery', 110000], ['Premises', 180000], ['Furniture', 21000], ['Advertisement Suspense', 12000, { loss: true }]],
  reval: [['Premises A/c (increase)', 'A', 'Premises', 27000], ['Machinery A/c (depreciation)', 'A', 'Machinery', -11000], ['Provision for Doubtful Debts A/c', 'A', 'Debtors', -3000, provLabel], ['Outstanding Rent A/c', 'L', 'Outstanding Rent', 1000]],
  goodwill: { value: 120000 }, pay: 34000,
});
const GX = { premises: 27000, mach: 11000, prov: 3000, rent: 1000, gr: 36000, wcr: 15000, claim: 9000, adv: 12000 };
check(fr(15, 100).of(180000) === GX.premises && fr(10, 100).of(110000) === GX.mach && fr(5, 100).of(60000) === GX.prov, 'GUL percentages');
const W1 = GUL.R;
eq([W1.newInts, W1.gain.Anshuman.toString(), W1.gain.Chiranjeev.toString(), W1.gainInts], [[3, 1], '1/4', '1/12', [3, 1]], 'W1');
eq([GUL.reval.net, GUL.reval.parts, GUL.gw.dr, GUL.due, GUL.loan, GUL.caps.closing, GUL.newBS.total, GUL.bank], [12000, { Anshuman: 6000, Bhairavi: 4000, Chiranjeev: 2000 }, { Anshuman: 30000, Chiranjeev: 10000 }, 174000, 140000, { Anshuman: 171000, Bhairavi: 0, Chiranjeev: 72000 }, 465000, 6000], 'GUL');
const Ggr = splitShares(GX.gr, W1.old);
const Gwcr = splitShares(GX.wcr - GX.claim, W1.old);
const Gadv = splitShares(GX.adv, W1.old);
const GULres = journal([
  { dr: [['General Reserve A/c', GX.gr]], cr: Object.entries(Ggr).map(([n, x]) => [C(n), x]), nar: 'general reserve credited to all the partners in 3 : 2 : 1' },
  { dr: [['Workmen Compensation Reserve A/c', GX.wcr]], cr: [['Workmen Compensation Claim A/c', GX.claim], ...Object.entries(Gwcr).map(([n, x]) => [C(n), x])], nar: 'claim provided and the balance of the reserve credited in 3 : 2 : 1' },
  { dr: Object.entries(Gadv).map(([n, x]) => [C(n), x]), cr: [['Advertisement Suspense A/c', GX.adv]], nar: 'advertisement suspense written off in 3 : 2 : 1' },
]);
const GULgw = journal([{ dr: Object.entries(GUL.gw.dr).map(([n, x]) => [C(n), x]), cr: [[C('Bhairavi'), GUL.gw.cr.Bhairavi]], nar: "Bhairavi's share of goodwill charged to Anshuman and Chiranjeev in their gaining ratio 3 : 1" }]);
// WE2 Kesar Coir Mats, Karunagappally (imagined): Devyani, Edwin and Gajendra 2 : 2 : 1; Devyani retires; new ratio 1 : 1.
const W2 = retire({ Devyani: fr(2, 5), Edwin: fr(2, 5), Gajendra: fr(1, 5) }, 'Devyani', { newRatio: [1, 1] });
eq([W2.gain.Edwin.toString(), W2.gain.Gajendra.toString(), W2.gainInts], ['1/10', '3/10', [1, 3]], 'W2');
// WE3 Mogra Kite Makers, Badlapur (imagined): Hiranmayi, Jaiveer and Kaustubh 5 : 3 : 2; Kaustubh retires; new ratio 2 : 3.
const W3 = retire({ Hiranmayi: fr(5, 10), Jaiveer: fr(3, 10), Kaustubh: fr(2, 10) }, 'Kaustubh', { newRatio: [2, 3] }, { allowSacrifice: true });
const W3g = W3.goodwill(150000);
eq([W3.gain.Hiranmayi.toString(), W3.gain.Jaiveer.toString(), W3g.dr, W3g.cr], ['-1/10', '3/10', { Jaiveer: 45000 }, { Kaustubh: 30000, Hiranmayi: 15000 }], 'W3');
const W3j = journal([{ dr: [[C('Jaiveer'), W3g.dr.Jaiveer]], cr: [[C('Kaustubh'), W3g.cr.Kaustubh], [C('Hiranmayi'), W3g.cr.Hiranmayi]], nar: "Kaustubh's share of goodwill and Hiranmayi's sacrifice charged to Jaiveer, who gains 3/10" }]);
// WE4 Parijat Pickle House is used in the bank; here Taragarh Pickle House, Beawar (imagined): Mayank, Nivedita and Omesh 2 : 2 : 1; Omesh retires.
const W4 = retire({ Mayank: fr(2, 5), Nivedita: fr(2, 5), Omesh: fr(1, 5) }, 'Omesh');
const W4x = { cap: 74000, settle: 92000 };
const W4share = W4x.settle - W4x.cap;
const W4v = fr(W4share).div(W4.outShare).of(1);
const W4g = W4.goodwill(W4v);
eq([W4share, W4v, W4g.dr], [18000, 90000, { Mayank: 9000, Nivedita: 9000 }], 'W4');
// WE8 Bhairavi's loan: four equal yearly instalments of principal from 31 March 2027, interest 10% on the balance.
const W8 = loanAccount({ principal: GUL.loan, rate: 10, start: { y: 2026, m: 3 }, n: 4, firstLabel: "Bhairavi's Capital A/c" });
eq(W8.payments.map((p) => [p.interest, p.pay]), [[14000, 49000], [10500, 45500], [7000, 42000], [3500, 38500]], 'W8');
// WE9 Shefali Makhana Traders, Sitamarhi (imagined): Prasoon retires on 30 September 2026; loan of 90,000 in three instalments.
const W9 = loanAccount({ principal: 90000, rate: 10, start: { y: 2026, m: 9 }, n: 3, firstLabel: "Prasoon's Capital A/c" });
const W9first = W9.years[0].cr[1][2];
eq([W9first, W9.years.map((y) => y.closing), W9.payments.map((p) => p.pay)], [4500, [94500, 63000, 31500, 0], [39000, 36000, 33000]], 'W9');
// WE10 Kadamba Cane Furniture, Kendrapara (imagined): Tejpal retires; Rituraj and Sharvari continue 3 : 2.
const W10 = { sh: { Rituraj: fr(3, 5), Sharvari: fr(2, 5) }, cur: { Rituraj: 164000, Sharvari: 131000 }, total: 300000, due: 96000, bank: 26000, min: 20000 };
const W10a = Object.fromEntries(Object.keys(W10.sh).map((n) => [n, W10.sh[n].of(W10.total) - W10.cur[n]]));
const W10need = W10.due + W10.min - W10.bank;
const W10tot = sum(Object.values(W10.cur)) + W10need;
const W10b = Object.fromEntries(Object.keys(W10.sh).map((n) => [n, W10.sh[n].of(W10tot) - W10.cur[n]]));
eq([W10a, W10need, W10tot, W10b], [{ Rituraj: 16000, Sharvari: -11000 }, 90000, 385000, { Rituraj: 67000, Sharvari: 23000 }], 'W10');
// WE11 + WE12 Ambika Zari Works, Navsari (imagined): Yogendra, Zulekha and Vanraj 3 : 3 : 2; Vanraj dies on 31 July 2026.
const W11r = retire({ Yogendra: fr(3, 8), Zulekha: fr(3, 8), Vanraj: fr(1, 4) }, 'Vanraj');
const W11 = { profit: 240000, sales: 1600000, salesTill: 600000, months: 4 };
const W11t = timeBasis({ profit: W11.profit, months: W11.months, share: W11r.outShare });
const W11o = turnoverBasis({ profit: W11.profit, sales: W11.sales, salesTill: W11.salesTill, share: W11r.outShare });
eq([W11t, W11o.pct, W11o.period, W11o.share], [{ period: 80000, share: 20000 }, 15, 90000, 22500], 'W11');
const W12x = { cap: 150000, gr: 40000, ioc: 6, drawings: 12000, iod: 300, paid: 60700 };
const W12g = W11r.goodwill(160000);
const W12gr = W11r.outShare.of(W12x.gr);
const W12i = fr(W12x.ioc * W11.months, 1200).of(W12x.cap);
const W12due = W12x.cap + W12gr + W12g.cr.Vanraj + W11t.share + W12i - W12x.drawings - W12x.iod;
const W12cap = tAccount(
  [['Drawings A/c', W12x.drawings], ['Interest on Drawings A/c', W12x.iod], ["Vanraj's Executor's A/c", W12due]],
  [['Balance b/d', W12x.cap], ['General Reserve A/c', W12gr], ...Object.entries(W12g.dr).map(([n, x]) => [C(n), x]), ['Profit and Loss Suspense A/c', W11t.share], ['Interest on Capital A/c', W12i]],
);
const W12ex = tAccount([['Bank A/c', W12x.paid], ["Vanraj's Executor's Loan A/c", W12due - W12x.paid]], [["Vanraj's Capital A/c", W12due]]);
eq([W12gr, W12g.dr, W12i, W12due, W12due - W12x.paid], [10000, { Yogendra: 20000, Zulekha: 20000 }, 3000, 210700, 150000], 'W12');

// ---------------------------------------------------------------- visuals: Part 1
const vRoute1 = flow('LR', ['Retirement and death', 'New and gaining ratios', 'Goodwill, including hidden goodwill', 'Revaluation Account', 'Reserves and accumulated losses'], 'Route map of Part 1: retirement and death, the new and gaining ratios, goodwill including hidden goodwill, the revaluation account, and reserves and accumulated losses', 'Part 1 at a glance');
const vAct = table(
  ['Point', 'Retirement', 'Death'],
  [
    ['How it happens', 'With the consent of all other partners, under an express agreement, or by notice in a partnership at will (Section 32)', 'Dissolves the firm unless the deed provides that the others carry on (Section 42)'],
    ['When', 'Usually at the end of an accounting year', 'Any day of the year: profit till death must be worked out'],
    ['Who is paid', 'The retiring partner', "The deceased partner's executor (legal representative)"],
    ['Unpaid balance', "Retiring partner's Loan A/c", "Executor's Loan A/c"],
  ],
  'Table comparing retirement and death of a partner: how each happens under the Indian Partnership Act, when it usually happens, who is paid, and where the unpaid balance is carried',
  'Indian Partnership Act, 1932.',
);
const vSettle = flow('LR', ['New ratio and gaining ratio', 'Goodwill', 'Revaluation Account', 'Reserves and accumulated profits or losses', 'Profit till death (on death)', 'Amount due: paid, loan or executor', 'Capitals and the new Balance Sheet'], 'Flow of the matters settled when a partner retires or dies: the new and gaining ratios, goodwill, revaluation, reserves and accumulated profits or losses, profit till death on death, the amount due paid or carried as a loan, and capitals with the new balance sheet', 'What is settled when a partner leaves');
const vCases = table(
  ['Terms on which the outgoing share is taken', 'New share of a continuing partner', 'Gain'],
  [
    ['Nothing agreed', 'In the old ratio of the continuing partners', 'Gaining ratio = their old ratio'],
    ['A stated fraction **of the firm** is acquired', 'Old share + that fraction', 'The fraction acquired'],
    ['The outgoing share is taken in a given ratio', "Old share + outgoing share × his part of that ratio", 'Gaining ratio = the given ratio'],
    ['New ratio stated', 'Read from the stated ratio', 'New − old: may be **negative** (a sacrifice)'],
  ],
  "Table of the ways the outgoing partner's share is taken: with nothing agreed the continuing partners keep their old ratio; a fraction of the firm acquired is added to the old share; a share taken in a given ratio is split in that ratio; with a stated new ratio, gain is new minus old and may be negative",
  'In every case: gain = new share − old share.',
);
const vW1 = table(
  ['Partner (Gulmohar Marble Polishers, imagined)', 'Old share', 'New share', 'Gain (new − old)'],
  [
    ['Anshuman', `${W1.old.Anshuman} = 6/12`, `${W1.newShares.Anshuman} = 9/12`, `${W1.gain.Anshuman} = 3/12`],
    ['Chiranjeev', `${W1.old.Chiranjeev} = 2/12`, `${W1.newShares.Chiranjeev} = 3/12`, `${W1.gain.Chiranjeev} = 1/12`],
    ['Bhairavi (retires)', `${W1.old.Bhairavi} = 4/12`, '—', 'Gives up 4/12'],
    ['**Ratios**', '', `**New ${ratioStr(W1.newInts)}**`, `**Gaining ${ratioStr(W1.gainInts)}**`],
  ],
  `Table of worked example one: Anshuman rises from six twelfths to nine twelfths and Chiranjeev from two twelfths to three twelfths; Bhairavi's four twelfths is shared three to one; the new ratio and the gaining ratio are both ${ratioWords(W1.newInts)}`,
  'Nothing agreed: the continuing partners keep their old ratio.',
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
  bar(30, 'Before', [['Anshuman', W1.old.Anshuman, 'blue'], ['Bhairavi', W1.old.Bhairavi, 'yellow'], ['Chiranjeev', W1.old.Chiranjeev, 'green']]);
  bar(120, 'After', [['Anshuman', W1.newShares.Anshuman, 'blue'], ['Chiranjeev', W1.newShares.Chiranjeev, 'green']]);
  s.text(X0 + W / 2, 200, `Bhairavi's ${W1.outShare} is shared ${ratioStr(W1.gainInts)} by the two who stay`, { size: 12, muted: true });
  return s.visual(
    "Two bars of equal length, each the whole profit of Gulmohar Marble Polishers: before, Anshuman has 1/2, Bhairavi 1/3 and Chiranjeev 1/6; after Bhairavi retires, Anshuman has 3/4 and Chiranjeev 1/4, her third shared between them three to one",
    'Shares before and after Bhairavi retires (worked example 1).',
  );
})();
const vW2 = table(
  ['Partner (Kesar Coir Mats, imagined)', 'Old share', 'New share', 'Gain'],
  [
    ['Edwin', `${W2.old.Edwin} = 4/10`, `${W2.newShares.Edwin} = 5/10`, `${W2.gain.Edwin}`],
    ['Gajendra', `${W2.old.Gajendra} = 2/10`, `${W2.newShares.Gajendra} = 5/10`, `${W2.gain.Gajendra}`],
    ['**Gaining ratio**', '', '', `**${ratioStr(W2.gainInts)}**`],
  ],
  `Table of worked example two: Edwin rises from four tenths to five tenths, a gain of one tenth; Gajendra rises from two tenths to five tenths, a gain of three tenths; the gaining ratio is ${ratioWords(W2.gainInts)}, not their old ratio of two to one`,
  "Devyani's 4/10 = Edwin's 1/10 + Gajendra's 3/10.",
);
const vSacGain = table(
  ['Basis', 'Sacrificing ratio', 'Gaining ratio'],
  [
    ['Arises on', 'Admission (or a change in ratio)', 'Retirement or death (or a change in ratio)'],
    ['Formula', 'Old share − new share', 'New share − old share'],
    ['Used to', "Credit the newcomer's premium to those who give up profit", "Charge the outgoing partner's goodwill to those who gain"],
  ],
  'Table contrasting the sacrificing ratio, which arises on admission and is old share minus new share, with the gaining ratio, which arises on retirement or death and is new share minus old share',
);
const vGwFlow = flow('LR', ['Outgoing partner built part of the reputation', 'Continuing partners will enjoy his share of future profits', 'Gaining partners debited, outgoing partner credited', 'No goodwill account (Accounting Standard 26)'], "Flow: the outgoing partner built part of the firm's reputation; the continuing partners will enjoy his share of future profits; so the gaining partners are debited and he is credited; no goodwill account is raised under Accounting Standard 26", 'Why the gaining partners pay');
const vW3 = table(W3j.headers, W3j.rows, `Journal of worked example three: Jaiveer's capital debited ${inr(W3g.dr.Jaiveer)} rupees, crediting Kaustubh's capital ${inr(W3g.cr.Kaustubh)} and Hiranmayi's capital ${inr(W3g.cr.Hiranmayi)}, because Hiranmayi also gives up a tenth`);
const vHidden = flow('TB', ['Goodwill already in the books: write off among ALL partners, old ratio', 'Agreed settlement − his capital after all other adjustments = his share of hidden goodwill', 'His share ÷ his profit share = goodwill of the firm', 'Gaining partners debited, outgoing partner credited'], 'Flow for goodwill already in the books and hidden goodwill: book goodwill is written off among all the partners in the old ratio; the excess of the agreed settlement over the outgoing capital is his share of hidden goodwill; dividing by his share gives the firm\'s goodwill; the gaining partners are debited', 'Book goodwill and hidden goodwill');
const vW4 = table(
  ['Step (Taragarh Pickle House, imagined)', 'Working', '₹'],
  [
    ['Settlement agreed for Omesh', 'given', inr(W4x.settle)],
    ["Omesh's capital after all other adjustments", 'given', inr(W4x.cap)],
    ['His share of hidden goodwill', `${inr(W4x.settle)} − ${inr(W4x.cap)}`, `**${inr(W4share)}**`],
    ["Firm's goodwill", `${inr(W4share)} ÷ ${W4.outShare}`, `**${inr(W4v)}**`],
    ['Charged 1 : 1', `Mayank ${inr(W4g.dr.Mayank)}, Nivedita ${inr(W4g.dr.Nivedita)}`, inr(W4share)],
  ],
  `Table of worked example four: Omesh is paid ${inr(W4x.settle)} against a capital of ${inr(W4x.cap)}, so his share of hidden goodwill is ${inr(W4share)} and the firm's goodwill ${inr(W4v)}; Mayank and Nivedita are charged ${inr(W4g.dr.Mayank)} each`,
  `Entry: Mayank's and Nivedita's Capital A/cs Dr. ${rs(W4g.dr.Mayank)} each To Omesh's Capital A/c ${rs(W4share)}.`,
);
const vRevalFormat = table(
  ['Debit side (losses)', 'Credit side (gains)'],
  [
    ['Fall in the value of an asset', 'Rise in the value of an asset'],
    ['Rise in a liability; unrecorded liability', 'Fall in a liability; unrecorded asset'],
    ['New or higher provision', 'Provision no longer needed'],
    ['Balance: profit to **all** partners (old ratio)', 'Balance: loss to **all** partners (old ratio)'],
  ],
  'Table of the revaluation account on retirement: losses on the debit side, gains on the credit side, and the balance shared by all the partners, the outgoing one included, in the old ratio',
  'Also called the Profit and Loss Adjustment Account.',
);
const vGulOld = table(GUL.oldBS.headers, GUL.oldBS.rows, `Balance sheet of Gulmohar Marble Polishers before Bhairavi retires, totalling ${inr(GUL.oldBS.total)} rupees: creditors, general reserve, workmen compensation reserve and three capitals; bank, debtors, stock, machinery, premises, furniture and advertisement suspense`, 'Balance Sheet as at 31 March 2026 (horizontal form).');
const vGulReval = table(GUL.reval.headers, GUL.reval.rows, `Revaluation account of Gulmohar Marble Polishers: machinery ${inr(GX.mach)}, provision ${inr(GX.prov)} and outstanding rent ${inr(GX.rent)} on the debit side; premises ${inr(GX.premises)} on the credit side; profit ${inr(GUL.reval.net)} rupees shared three to two to one`);
const vReserves = table(
  ['Item in the balance sheet', 'Treatment on retirement or death'],
  [
    ['General reserve, credit balance of profit and loss', "Credited to **all** partners' capitals, old ratio"],
    ['Debit balance of profit and loss, advertisement suspense', "Debited to **all** partners' capitals, old ratio"],
    ['Workmen compensation reserve', 'Claim first; balance credited; excess claim a revaluation loss'],
    ['Investment fluctuation reserve', 'Fall in investments first; balance credited; excess fall a revaluation loss'],
  ],
  'Table of reserves on retirement or death: reserves and credit balances are credited, and accumulated losses and deferred revenue expenditure debited, to all the partners in the old ratio; special reserves first meet the claim or the fall',
);
const vGulRes = table(GULres.headers, GULres.rows, `Journal of worked example six: general reserve ${inr(GX.gr)} credited three to two to one; workmen compensation reserve ${inr(GX.wcr)} meets the claim of ${inr(GX.claim)} and the balance ${inr(GX.wcr - GX.claim)} is credited; advertisement suspense ${inr(GX.adv)} debited three to two to one`);
const vSummary1 = table(
  ['Idea', 'Rule'],
  [
    ['Gain', 'New share − old share; a negative result is a sacrifice'],
    ['Nothing agreed', 'Continuing partners keep their old ratio'],
    ['Goodwill', "Gaining partners Dr. (gaining ratio), outgoing partner Cr. (his share × goodwill)"],
    ['Hidden goodwill', 'Settlement − his adjusted capital = his share'],
    ['Book goodwill', 'Written off among all partners, old ratio'],
    ['Revaluation, reserves, losses', 'All partners, old ratio'],
  ],
  'Summary table of Part 1: gain is new minus old share; with nothing agreed the old ratio continues; the gaining partners pay the outgoing partner for goodwill; hidden goodwill is the excess of the settlement over his capital; book goodwill, revaluation, reserves and losses go to all partners in the old ratio',
);

// ---------------------------------------------------------------- visuals: Part 2
const vRoute2 = flow('LR', ['Amount due and capital accounts', 'Balance Sheet (horizontal)', 'Loan account', 'Adjusting capitals', 'Death: profit till death', "Executor's account"], "Route map of Part 2: the amount due and capital accounts, the new balance sheet in horizontal form, the loan account, adjusting capitals, profit till death, and the executor's account", 'Part 2 at a glance');
const vDue = table(
  ['Added to his capital (credit)', 'Deducted (debit)'],
  [
    ['Opening capital (and current account credit)', 'Current account debit balance; drawings'],
    ['Share of revaluation profit', 'Share of revaluation loss'],
    ['Share of reserves and undistributed profit', 'Share of accumulated losses, advertisement suspense, book goodwill'],
    ['Share of goodwill (from the gaining partners)', 'Interest on drawings'],
    ['Interest on capital; on death, profit till death', '**Balance: amount due**'],
  ],
  "Table of what makes up the amount due to an outgoing partner: credits for capital, revaluation profit, reserves, his share of goodwill, interest on capital and, on death, profit till death; debits for losses, drawings and interest on drawings",
);
const vGulCaps = table(GUL.caps.headers, GUL.caps.rows, `Partners' capital accounts of Gulmohar Marble Polishers: all three credited with revaluation profit and reserves and debited with advertisement suspense; Anshuman and Chiranjeev debited ${inr(GUL.gw.dr.Anshuman)} and ${inr(GUL.gw.dr.Chiranjeev)} for goodwill; Bhairavi's ${inr(GUL.due)} settled by bank ${inr(GUL.cash)} and loan ${inr(GUL.loan)} rupees`);
const vGulBS = table(GUL.newBS.headers, GUL.newBS.rows, `Balance sheet of Gulmohar Marble Polishers after Bhairavi's retirement, totalling ${inr(GUL.newBS.total)} rupees: creditors, the workmen compensation claim, outstanding rent, Bhairavi's loan and two capitals; bank ${inr(GUL.bank)}, debtors net of provision and assets at revised values`, 'Horizontal form: reserves gone, loan in, revised values.');
const vModes = table(
  ['How the amount due is settled', 'Entry'],
  [
    ['Paid at once', "Outgoing partner's Capital A/c Dr. To Bank A/c"],
    ['Left with the firm as a loan', "Outgoing partner's Capital A/c Dr. To his Loan A/c"],
    ['Partly paid, partly loan', 'Both entries'],
    ['Instalment with interest', 'Interest A/c Dr. To Loan A/c; Loan A/c Dr. To Bank A/c'],
    ['Unpaid with no agreement', 'Section 37: share of profit from his share of property, or 6% per annum interest, at his option'],
  ],
  "Table of the modes of settling the amount due: paid at once through the bank, transferred to a loan, partly each, instalments with interest, and the Section thirty-seven option of a share of profits or interest at six per cent when nothing is agreed",
);
const vW8 = table(W8.headers, W8.rows, `Bhairavi's loan account over four years: ${inr(GUL.loan)} rupees credited on retirement; each year interest at ten per cent on the balance is credited and an instalment of ${inr(W8.inst)} plus that interest is paid, so payments fall from ${inr(W8.payments[0].pay)} to ${inr(W8.payments[3].pay)}`);
const vW9 = table(W9.headers, W9.rows, `Prasoon's loan account: ${inr(90000)} rupees from thirtieth September; on each thirty-first March six months' interest is credited although not yet due; each thirtieth September an instalment of ${inr(W9.inst)} is paid with a full year's interest; payments ${W9.payments.map((p) => inr(p.pay)).join(', ')}`);
const vAdjFlow = flow('LR', ['Total capital of the new firm (agreed, or capitals + cash needed)', 'Total × new share = required capital', "Compare with each partner's adjusted capital", 'Shortfall brought in; surplus withdrawn (or current account)'], "Flow for adjusting the continuing partners' capitals: fix the total capital, either as agreed or as their capitals plus the cash needed to pay the outgoing partner; multiply by each new share; compare with the adjusted capital; bring in the shortfall or withdraw the surplus", 'Capitals in the new ratio');
const vW10 = table(
  ['Kadamba Cane Furniture (imagined)', 'Rituraj (3/5)', 'Sharvari (2/5)'],
  [
    ['Capital after all adjustments', inr(W10.cur.Rituraj), inr(W10.cur.Sharvari)],
    [`(a) Total fixed at ${inr(W10.total)}: required`, inr(W10.sh.Rituraj.of(W10.total)), inr(W10.sh.Sharvari.of(W10.total))],
    ['(a) Cash', `Brings ${inr(W10a.Rituraj)}`, `Withdraws ${inr(-W10a.Sharvari)}`],
    [`(b) Total = ${inr(sum(Object.values(W10.cur)))} + ${inr(W10need)} = ${inr(W10tot)}: required`, inr(W10.sh.Rituraj.of(W10tot)), inr(W10.sh.Sharvari.of(W10tot))],
    ['(b) Cash brought in', inr(W10b.Rituraj), inr(W10b.Sharvari)],
  ],
  `Table of worked example ten: with the total fixed at ${inr(W10.total)}, Rituraj brings ${inr(W10a.Rituraj)} and Sharvari withdraws ${inr(-W10a.Sharvari)}; if instead they bring in the ${inr(W10need)} needed to pay Tejpal and keep ${inr(W10.min)} in the bank, the total is ${inr(W10tot)} and they bring ${inr(W10b.Rituraj)} and ${inr(W10b.Sharvari)}`,
  `(b) Cash needed = ${inr(W10.due)} to Tejpal + ${inr(W10.min)} minimum − ${inr(W10.bank)} in the bank = ${inr(W10need)}.`,
);
const vDeath = table(
  ['On the death of a partner', 'How it is handled'],
  [
    ['Goodwill, revaluation, reserves', 'As on retirement, on the date of death'],
    ['Profit from the start of the year to death', 'Time or turnover basis (as the deed says)'],
    ['Interest on capital, drawings, interest on drawings', 'Up to the date of death'],
    ['Balance of his capital account', "Transferred to his Executor's A/c"],
    ['Executor paid or not paid', "Bank A/c, or Executor's Loan A/c with interest"],
  ],
  "Table of the death of a partner: goodwill, revaluation and reserves are dealt with as on retirement; profit till death on the time or turnover basis; interest and drawings up to the date of death; the balance goes to the executor's account and is paid or kept as the executor's loan",
);
const vBases = table(
  ['Basis', 'Working'],
  [
    ['Time (last year or an average)', 'Base profit × months to death ÷ 12 × his share'],
    ['Turnover (sales)', "Sales to death × (last year's profit ÷ last year's sales) × his share"],
  ],
  "Table of the two bases of profit till death: on the time basis, the base profit times the months to death over twelve times his share; on the turnover basis, sales to death times last year's rate of profit on sales times his share",
);
const vW11 = table(
  ['Ambika Zari Works (imagined)', 'Time basis', 'Turnover basis'],
  [
    ['Base', `Last year's profit ${inr(W11.profit)}`, `Rate = ${inr(W11.profit)} ÷ ${inr(W11.sales)} = ${W11o.pct}%`],
    ['Profit to 31 July 2026', `${inr(W11.profit)} × 4/12 = ${inr(W11t.period)}`, `${W11o.pct}% of ${inr(W11.salesTill)} = ${inr(W11o.period)}`],
    ["Vanraj's 1/4", `**${inr(W11t.share)}**`, `**${inr(W11o.share)}**`],
  ],
  `Table of worked example eleven: on the time basis Vanraj's quarter of four months' profit is ${inr(W11t.share)} rupees; on the turnover basis, at ${words(W11o.pct)} per cent of sales to death, it is ${inr(W11o.share)} rupees`,
  'The deed of Ambika Zari Works chooses the time basis.',
);
const vRecord = table(
  ['Method', 'Entry'],
  [
    ['Profit and Loss Suspense', "Profit and Loss Suspense A/c Dr. To deceased partner's Capital A/c (closed when the year's profit is divided; an asset if a balance sheet is drawn up on the date of death)"],
    ['Through the gaining partners', "Gaining partners' Capital A/cs Dr. (gaining ratio) To deceased partner's Capital A/c"],
  ],
  "Table of the two ways of recording profit till death: through the profit and loss suspense account, which is an asset until the year's profit is divided, or by debiting the gaining partners in their gaining ratio",
);
const vW12cap = table(W12cap.headers, W12cap.rows, `Vanraj's capital account: credited with his capital, reserve, goodwill from Yogendra and Zulekha, profit till death and interest on capital; debited with drawings and interest on drawings; balance ${inr(W12due)} rupees transferred to his executor's account`);
const vW12ex = table(W12ex.headers, W12ex.rows, `Vanraj's executor's account: credited with ${inr(W12due)} rupees from his capital account; debited with ${inr(W12x.paid)} paid by bank and ${inr(W12due - W12x.paid)} kept as the executor's loan`);
const vBSafter = table(
  ['Balance sheet after retirement or death (horizontal)', 'Shows'],
  [
    ['Liabilities', "Outside liabilities (with any claim or outstanding expense brought in), retiring partner's loan or executor's loan, continuing partners' capitals"],
    ['Assets', 'Assets at revised values (debtors net of provision); bank after payments and cash brought in; Profit and Loss Suspense if used on death'],
    ['Removed', 'Reserves, accumulated losses, advertisement suspense and book goodwill, once shared out'],
  ],
  "Table of the balance sheet after retirement or death in horizontal form: liabilities include the retiring partner's or executor's loan and the continuing capitals; assets are at revised values with the bank after payments and any profit and loss suspense; reserves, losses and book goodwill disappear",
);
const vSummary2 = table(
  ['Step', 'Rule'],
  [
    ['Amount due', 'Capital ± shares of revaluation, reserves, losses + goodwill (± profit and interest on death)'],
    ['Settlement', 'Bank, loan, or both; Section 37 if nothing is agreed'],
    ['Loan account', 'Interest on the balance, credited when it accrues; instalment + interest paid'],
    ['Capitals', 'Total × new share; bring in or withdraw the difference'],
    ['Profit till death', 'Time or turnover basis; suspense or gaining partners'],
    ['Death', "Capital balance → Executor's A/c → bank or executor's loan"],
    ['Balance Sheet', 'Horizontal; revised values; loan; reserves removed'],
  ],
  "Summary table of Part 2: the amount due, settlement through bank or loan, the loan account with interest, capital adjustment, profit till death on two bases and two methods, the executor's account, and the horizontal balance sheet",
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Retirement and Death of a Partner — Part 1: Ratios, Goodwill, Revaluation and Reserves',
  goals: [
    'Calculate the new ratio and the gaining ratio when a partner retires or dies, including a continuing partner who sacrifices',
    'Adjust the outgoing partner\'s share of goodwill (stated or hidden) through the gaining partners under Accounting Standard 26, and write off book goodwill',
    'Prepare the Revaluation Account and distribute reserves and accumulated losses among all the partners',
  ],
  slides: [
    sl('title', 'Reconstitution: Retirement and Death of a Partner', {
      b: 'Part 1 — **ratios**, **goodwill**, **revaluation** and **reserves** when a partner leaves. Every firm, person and figure in this chapter is imagined.',
      v: vRoute1,
      n: 'When a partner retires or dies, the old agreement ends, but the business usually carries on with the partners who remain. The books are reconstituted, not closed. Before the outgoing partner is paid, we must work out the new ratio and the gaining ratio, settle goodwill, revalue the assets and liabilities, and share out the reserves. That is this first part.',
    }),
    sl('concept', 'Retirement and death under the Act', {
      v: vAct,
      bl: ['A partner **retires** with the consent of all the others, under an express agreement, or by notice when the partnership is at will.', 'Unless the deed says otherwise, **death** dissolves the firm; most deeds let the survivors carry on.'],
      n: 'Under the Indian Partnership Act, a partner may retire with everyone else\'s consent, under an express agreement, or by notice when the partnership is at will. Death, unless the deed says otherwise, dissolves the firm, so most deeds let the others continue. Retirement usually happens at the year end, but death can come on any day, so we also work out profit up to the date of death.',
    }),
    sl('concept', 'What must be settled', {
      v: vSettle,
      b: 'The outgoing partner is entitled to his capital **plus** his share of everything the firm earned or built up while he was a partner.',
      n: 'Seven matters are settled in order. First the new ratio and the gaining ratio. Then goodwill, revaluation, and reserves or accumulated losses. On death, profit up to the date of death is added. Then the amount due is paid, or kept as a loan. Finally the continuing partners may adjust their capitals and a new balance sheet is drawn up.',
    }),
    sl('concept', 'New ratio and gaining ratio', {
      v: vCases,
      n: 'The outgoing share always passes to the partners who stay, but the terms differ. If nothing is agreed, they carry on in their old ratio. They may acquire stated fractions of the firm, or take the outgoing share in a given ratio, or simply state a new ratio. In every case, gain equals new share minus old share, and with a stated ratio a partner may even lose.',
    }),
    sl('example', 'Worked example 1: nothing agreed', {
      b: 'Gulmohar Marble Polishers, Kishangarh (imagined): Anshuman, Bhairavi and Chiranjeev share **3 : 2 : 1**. Bhairavi retires on 31 March 2026 and nothing is agreed about future shares.',
      v: vW1,
      n: `With nothing agreed, Anshuman and Chiranjeev keep their old ratio of three to one. Anshuman's share rises from one half to ${fw(W1.newShares.Anshuman)}, a gain of ${fw(W1.gain.Anshuman)}. Chiranjeev's rises from one sixth to ${fw(W1.newShares.Chiranjeev)}, a gain of ${fw(W1.gain.Chiranjeev)}. So the gaining ratio is also ${ratioWords(W1.gainInts)}.`,
    }),
    sl('diagram', 'Before and after, side by side', {
      v: vShares,
      b: "The outgoing slice is shared out among the partners who stay.",
      n: "Each bar is the whole profit of the firm. Before, Bhairavi holds one third. After she retires, her third is shared by Anshuman and Chiranjeev in the ratio three to one, so Anshuman grows to three quarters and Chiranjeev to one quarter. Both bars are the same length, because the shares always add up to one.",
    }),
    sl('check', 'Quick check: fractions acquired', {
      b: 'Add what each partner acquires to his old share.',
      chk: 'm_take_share',
      n: 'Each continuing partner acquires a stated fraction of the whole profit. Add it straight to his old share.',
    }),
    sl('example', 'Worked example 2: a stated new ratio', {
      b: 'Kesar Coir Mats, Karunagappally (imagined): Devyani, Edwin and Gajendra share **2 : 2 : 1**. Devyani retires; Edwin and Gajendra agree to share **equally**.',
      v: vW2,
      n: `Write the shares in tenths. Edwin moves from four tenths to five tenths, a gain of ${fw(W2.gain.Edwin)}. Gajendra moves from two tenths to five tenths, a gain of ${fw(W2.gain.Gajendra)}. The gaining ratio is ${ratioWords(W2.gainInts)}. It is neither the old ratio of two to one nor the new ratio of one to one, so it must always be worked out.`,
    }),
    sl('concept', 'Sacrificing ratio and gaining ratio', {
      v: vSacGain,
      n: 'The two ratios are mirror images. The sacrificing ratio arises when a partner joins: it is old share minus new share, and it shares out the premium he brings. The gaining ratio arises when a partner leaves: it is new share minus old share, and it shows who pays the outgoing partner for goodwill.',
    }),
    sl('concept', 'Goodwill on retirement or death', {
      v: vGwFlow,
      bl: ["Outgoing partner's share = firm's goodwill × his share, credited to him.", 'Debited to the **gaining partners** in the **gaining ratio**; no goodwill account is raised.'],
      n: "The outgoing partner helped build the firm's reputation, but the future profits it brings will go to those who stay. So the partners who gain his share pay him for it. His share equals the firm's goodwill times his profit share, and it is debited to the gaining partners in their gaining ratio. Accounting Standard twenty-six does not allow a goodwill account to be opened.",
    }),
    sl('example', 'Worked example 3: a continuing partner who sacrifices', {
      b: `Mogra Kite Makers, Badlapur (imagined): Hiranmayi, Jaiveer and Kaustubh share **5 : 3 : 2**. Kaustubh retires; Hiranmayi and Jaiveer agree on **2 : 3**. Goodwill is ${rs(W3g.value)}.`,
      v: vW3,
      n: `Hiranmayi falls from five tenths to four tenths, so she sacrifices one tenth even though a partner is leaving. Jaiveer rises from three tenths to six tenths, a gain of three tenths. Jaiveer alone pays: ${rw(W3g.dr.Jaiveer)}. Kaustubh receives two tenths of the goodwill, ${rw(W3g.cr.Kaustubh)}, and Hiranmayi receives one tenth, ${rw(W3g.cr.Hiranmayi)}.`,
    }),
    sl('concept', 'Book goodwill and hidden goodwill', {
      v: vHidden,
      bl: ['Goodwill already in the books is written off among **all** partners, old ratio.', 'If the outgoing partner is paid **more** than his adjusted capital, the excess is his share of **hidden goodwill**.'],
      n: "Goodwill already shown in the books is first written off among all the partners in the old ratio. Sometimes nothing is said about goodwill, but the others agree to pay the outgoing partner a lump sum. If that sum is more than his capital after all other adjustments, the excess is his share of hidden goodwill. Divide it by his profit share to value the firm's goodwill.",
    }),
    sl('check', 'Quick check: paying more than the capital', {
      b: 'Where does the excess go?',
      chk: 'tf_hidden_gw',
      n: 'Think about who is paying the excess and who is receiving it.',
    }),
    sl('example', 'Worked example 4: hidden goodwill', {
      b: `Taragarh Pickle House, Beawar (imagined): Mayank, Nivedita and Omesh share **2 : 2 : 1**. Omesh retires; his capital after all other adjustments is ${rs(W4x.cap)}, and he is to be paid ${rs(W4x.settle)} in full settlement.`,
      v: vW4,
      n: `Omesh will receive ${rw(W4x.settle)}, but his capital is only ${rw(W4x.cap)}. The difference, ${rw(W4share)}, is his share of hidden goodwill. His share is one fifth, so the firm's goodwill is ${rw(W4v)}. Mayank and Nivedita gain equally and are charged ${rw(W4g.dr.Mayank)} each.`,
    }),
    sl('check', 'Quick check: hidden goodwill', {
      b: 'Settlement minus adjusted capital, then divide by his share.',
      chk: 'n_hidden_gw',
      n: 'Find his share of goodwill first, then scale it up to the whole firm. Give your answer in rupees.',
    }),
    sl('concept', 'The Revaluation Account on retirement or death', {
      v: vRevalFormat,
      b: 'Same format as on admission, but the result is shared by **all** the partners, the outgoing one included.',
      n: 'The revaluation account works as it did on admission. Losses go on the debit side and gains on the credit side. The difference is that the outgoing partner was a member while those values changed, so the profit or loss is shared by all the partners, him included, in the old ratio.',
    }),
    sl('example', 'Worked example 5: the starting balance sheet', {
      b: 'Gulmohar Marble Polishers again. On Bhairavi\'s retirement: premises up 15%, machinery down 10%, a 5% provision on debtors, and an unrecorded rent bill.',
      v: vGulOld,
      n: `Here is the balance sheet of Gulmohar Marble Polishers on the day Bhairavi retires, in horizontal form. Look out for three items that will be shared among all three partners: the general reserve of ${rw(GX.gr)}, the workmen compensation reserve, and the advertisement suspense on the assets side.`,
    }),
    sl('example', 'Worked example 5 (continued): Revaluation Account', {
      b: `Premises up ${rs(GX.premises)}; machinery down ${rs(GX.mach)}; provision ${rs(GX.prov)}; outstanding rent ${rs(GX.rent)}.`,
      v: vGulReval,
      n: `The losses are machinery ${words(GX.mach)}, the provision ${words(GX.prov)} and the rent bill ${words(GX.rent)}. The gain is the premises, ${words(GX.premises)}. The profit is ${rw(GUL.reval.net)}, shared three to two to one: Anshuman ${rw(GUL.reval.parts.Anshuman)}, Bhairavi ${rw(GUL.reval.parts.Bhairavi)} and Chiranjeev ${rw(GUL.reval.parts.Chiranjeev)}.`,
    }),
    sl('concept', 'Reserves and accumulated profits or losses', {
      v: vReserves,
      n: 'Reserves and undistributed profits were earned while the outgoing partner was a member, so they are credited to all the partners in the old ratio. Accumulated losses and advertisement suspense are debited the same way. A workmen compensation reserve first meets the claim, and an investment fluctuation reserve first meets the fall in investments; only the balance is shared.',
    }),
    sl('example', 'Worked example 6: reserves of Gulmohar Marble Polishers', {
      b: `General reserve ${rs(GX.gr)}; workmen compensation reserve ${rs(GX.wcr)} against a claim of ${rs(GX.claim)}; advertisement suspense ${rs(GX.adv)}.`,
      v: vGulRes,
      n: `The general reserve of ${rw(GX.gr)} is credited three to two to one. The workmen compensation reserve first provides for the claim of ${rw(GX.claim)}, and the balance of ${rw(GX.wcr - GX.claim)} is credited. The advertisement suspense of ${rw(GX.adv)} is a past loss, so it is debited to all three partners.`,
    }),
    sl('check', 'Quick check: deferred revenue expenditure', {
      b: 'Who bears a past loss carried on the assets side?',
      chk: 'm_dre',
      n: 'Ask when the expense was incurred, and who was a partner then.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up: gain is new share minus old share, and with nothing agreed the old ratio continues. The gaining partners pay the outgoing partner his share of goodwill, and a partner who sacrifices is paid too. Hidden goodwill is the excess of the settlement over his adjusted capital. Book goodwill, revaluation, reserves and losses all go to every partner in the old ratio.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Always **show the gaining ratio**; with a stated new ratio it is rarely the old ratio.',
        'Check every continuing partner: one may **sacrifice** and must then be credited for goodwill.',
        'Share revaluation, reserves and losses among **all** partners, the outgoing one included.',
        'Never open a goodwill account; write off any **book goodwill** first.',
        'Write a **narration** under every journal entry.',
      ],
      n: 'A few habits save marks. Always show the gaining ratio, because a stated new ratio rarely gives the old ratio. Check every continuing partner, since one may sacrifice. Share revaluation, reserves and losses among all the partners, the outgoing one included. Never open a goodwill account, and write off any goodwill already in the books first.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Retirement and Death of a Partner — Part 2: Settlement, Loan, Capitals, Death and the Balance Sheet',
  goals: [
    'Prepare the capital accounts, find the amount due and draw up the Balance Sheet of the reconstituted firm in horizontal form',
    "Prepare the outgoing partner's loan account, with interest accrued and due or accrued but not due",
    'Readjust the continuing partners\' capitals, including bringing in cash to pay the outgoing partner',
    "Calculate profit till death on the time or turnover basis and prepare the deceased partner's capital and executor's accounts",
  ],
  slides: [
    sl('title', 'Settlement, loan, capitals, death and the balance sheet', {
      b: "Part 2 — the **amount due**, the **loan account**, adjusting **capitals**, **profit till death**, the **executor's account** and the **Balance Sheet** in horizontal form.",
      v: vRoute2,
      n: "In the first part we settled ratios, goodwill, revaluation and reserves. Now we bring them together. We find the amount due to the outgoing partner, decide how it is paid, keep his loan account, adjust the continuing partners' capitals, deal with the special points on death, and draw up the new balance sheet.",
    }),
    sl('concept', 'The amount due to an outgoing partner', {
      v: vDue,
      n: "The amount due is simply the closing balance of his capital account. It starts with his capital and any current account balance. Add his share of revaluation profit, reserves and goodwill, and on death his share of profit and interest on capital to that date. Deduct his share of losses, his drawings and interest on them. What remains is what the firm owes him.",
    }),
    sl('example', 'Worked example 7: capital accounts of Gulmohar Marble Polishers', {
      b: `Bhairavi's due is paid ${rs(GUL.cash)} by cheque; the balance becomes her **loan**.`,
      v: vGulCaps,
      n: `All three partners take their shares of the revaluation profit and the reserves, and bear the advertisement suspense. Anshuman and Chiranjeev are then debited ${rw(GUL.gw.dr.Anshuman)} and ${rw(GUL.gw.dr.Chiranjeev)} for goodwill, credited to Bhairavi. Her account closes at ${rw(GUL.due)}: ${rw(GUL.cash)} by cheque and ${rw(GUL.loan)} to her loan account.`,
    }),
    sl('example', 'Worked example 7 (continued): the new Balance Sheet', {
      b: 'Horizontal form; reserves gone; the claim, the rent bill and Bhairavi\'s loan appear as liabilities.',
      v: vGulBS,
      n: `The new balance sheet shows creditors, the compensation claim, the rent bill and Bhairavi's loan of ${rw(GUL.loan)}, followed by two capitals. On the other side the bank has fallen to ${rw(GUL.bank)}, debtors are shown net of the provision, and the premises and machinery appear at revised values. Both sides total ${rw(GUL.newBS.total)}.`,
    }),
    sl('concept', 'How the amount due is settled', {
      v: vModes,
      b: 'If nothing is agreed and the money stays in the business, **Section 37** applies.',
      n: "The amount due may be paid at once, left with the firm as a loan, or partly each. A loan is usually repaid in instalments with interest on the balance. If the money stays in the business and nothing is agreed, Section thirty-seven lets the outgoing partner choose between a share of the profits earned with his share of the property and interest at six per cent a year.",
    }),
    sl('example', "Worked example 8: Bhairavi's loan account", {
      b: `Her loan of ${rs(GUL.loan)} is repaid in four equal yearly instalments from 31 March 2027, each with interest at 10% on the balance.`,
      v: vW8,
      n: `Each instalment of principal is ${rw(W8.inst)}. In the first year interest is ten per cent of ${rw(GUL.loan)}, that is ${rw(W8.payments[0].interest)}, so she receives ${rw(W8.payments[0].pay)}. As the balance falls, so does the interest, and the last payment is ${rw(W8.payments[3].pay)}. Every year the account balances, and after four years it closes.`,
    }),
    sl('example', 'Worked example 9: interest accrued but not due', {
      b: `Shefali Makhana Traders, Sitamarhi (imagined): Prasoon retires on 30 September 2026; ${rs(90000)} is repaid in three yearly instalments each 30 September, with 10% interest. Books close on 31 March.`,
      v: vW9,
      n: `On thirty-first March the loan has run for six months, so ${rw(W9first)} of interest is credited even though it is not yet due. On thirtieth September the next six months' interest is credited and an instalment of ${rw(W9.inst)} is paid with a full year's interest, ${rw(W9.payments[0].pay)} in all. The pattern repeats until the loan is cleared.`,
    }),
    sl('check', 'Quick check: where does the loan go?', {
      b: 'Think about what the firm now owes.',
      chk: 'm_loan_bs',
      n: 'After retirement, is the outgoing partner a creditor or a debtor of the firm?',
    }),
    sl('concept', "Adjusting the continuing partners' capitals", {
      v: vAdjFlow,
      bl: ['**Total capital** is agreed, or equals their adjusted capitals **plus** the cash needed to pay the outgoing partner and keep a minimum bank balance.', '**Required capital** = total × new share; the difference is brought in or withdrawn.'],
      n: "After a partner leaves, the others often want capitals in their new ratio. Sometimes the total capital is agreed. Sometimes they bring in just enough cash to pay the outgoing partner and keep a minimum bank balance, and the total is then their adjusted capitals plus that cash. Multiply the total by each new share and settle the difference in cash.",
    }),
    sl('example', 'Worked example 10: two ways of adjusting capitals', {
      b: `Kadamba Cane Furniture, Kendrapara (imagined): Tejpal retires and ${rs(W10.due)} is due to him; Rituraj and Sharvari continue **3 : 2**. The bank holds ${rs(W10.bank)}.`,
      v: vW10,
      n: `If the total capital is fixed at ${rw(W10.total)}, Rituraj needs three fifths and brings ${rw(W10a.Rituraj)}, while Sharvari has ${rw(-W10a.Sharvari)} more than she needs and withdraws it. If instead they bring in the ${rw(W10need)} needed to pay Tejpal and keep ${rw(W10.min)} in the bank, the total becomes ${rw(W10tot)}, and they bring ${rw(W10b.Rituraj)} and ${rw(W10b.Sharvari)}.`,
    }),
    sl('check', 'Quick check: cash brought in', {
      b: 'Cash needed first, then the new total, then each share.',
      chk: 'n_cap_bring',
      n: 'Work out the cash the firm is short of, add it to the capitals, and split the total in the new ratio.',
    }),
    sl('concept', 'Death of a partner', {
      v: vDeath,
      n: "When a partner dies, goodwill, revaluation and reserves are handled exactly as on retirement, on the date of death. Because death can come mid-year, his share of profit, interest on capital and his drawings are taken up to that date. The balance of his capital account is transferred to his executor, who is paid at once or becomes a lender to the firm.",
    }),
    sl('concept', 'Profit till the date of death', {
      v: vBases,
      b: 'The deed decides the basis; if it is silent, the time basis on last year\'s profit is usual.',
      n: "There are two common bases. On the time basis, take last year's profit, or an average, multiply by the months up to death over twelve, and then by his share. On the turnover basis, find last year's rate of profit on sales, apply it to sales made up to death, and take his share. A seasonal business can give very different answers.",
    }),
    sl('example', 'Worked example 11: both bases', {
      b: `Ambika Zari Works, Navsari (imagined): Yogendra, Zulekha and Vanraj share **3 : 3 : 2**. Vanraj dies on 31 July 2026. Last year: profit ${rs(W11.profit)} on sales of ${rs(W11.sales)}; sales from 1 April to 31 July 2026 ${rs(W11.salesTill)}.`,
      v: vW11,
      n: `From the first of April to the thirty-first of July is four months. On the time basis, four twelfths of ${rw(W11.profit)} is ${rw(W11t.period)}, and Vanraj's quarter is ${rw(W11t.share)}. On the turnover basis, the rate is ${words(W11o.pct)} per cent of sales, so profit to death is ${rw(W11o.period)} and his quarter is ${rw(W11o.share)}.`,
    }),
    sl('concept', 'Recording profit till death', {
      v: vRecord,
      n: "There are two ways to record it. The usual one debits a profit and loss suspense account and credits the deceased partner's capital; the suspense account is cleared when the year's profit is divided, and is shown as an asset if a balance sheet is drawn up on the date of death. Alternatively, the gaining partners are debited in their gaining ratio.",
    }),
    sl('check', 'Quick check: the suspense account', {
      b: 'Debit or credit balance?',
      chk: 'tf_suspense',
      n: 'The suspense account is debited. Which side of a balance sheet carries a debit balance?',
    }),
    sl('example', "Worked example 12: Vanraj's capital account", {
      b: `Capital ${rs(W12x.cap)}; general reserve ${rs(W12x.gr)}; goodwill ${rs(W12g.value)}; profit till death on the time basis; interest on capital ${W12x.ioc}% per annum; drawings ${rs(W12x.drawings)} with interest ${rs(W12x.iod)}.`,
      v: vW12cap,
      n: `Vanraj is credited with his capital, a quarter of the reserve, ${rw(W12gr)}, his share of goodwill, ${rw(W12g.cr.Vanraj)}, charged equally to Yogendra and Zulekha, profit till death of ${rw(W11t.share)} and four months' interest on capital, ${rw(W12i)}. After his drawings and the interest on them, ${rw(W12due)} is transferred to his executor.`,
    }),
    sl('example', "Worked example 12 (continued): the executor's account", {
      b: `The executor is paid ${rs(W12x.paid)} at once; the rest is kept as the executor's loan.`,
      v: vW12ex,
      n: `The executor's account is credited with ${rw(W12due)} from Vanraj's capital account. The firm pays ${rw(W12x.paid)} at once, and the remaining ${rw(W12due - W12x.paid)} is transferred to the executor's loan account, which is then repaid like any other partner's loan, with interest.`,
    }),
    sl('check', "Quick check: the executor", {
      b: 'Who receives what a deceased partner was owed?',
      chk: 'fb_executor',
      n: 'Name the person who acts for a deceased partner\'s estate.',
    }),
    sl('concept', 'The Balance Sheet after retirement or death', {
      v: vBSafter,
      n: "The new balance sheet is drawn up in horizontal form. Liabilities include any claim or expense brought in, the outgoing partner's loan or the executor's loan, and the continuing capitals. Assets appear at revised values, with the bank after all payments and any cash brought in. Reserves, accumulated losses and book goodwill have disappeared because they were shared out.",
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: "To sum up: the amount due is the closing balance of the outgoing partner's capital account. It is paid, kept as a loan, or both, and the loan carries interest on the balance. Capitals can be brought into the new ratio. On death, profit till death is added on the time or turnover basis and the balance goes to the executor. The balance sheet is horizontal.",
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'In a full practical, marks go to the **Revaluation Account**, the **capital accounts** and the **Balance Sheet**: attempt all three.',
        'Show **working notes** for the gaining ratio, goodwill, profit till death and capital adjustment.',
        'In a loan account, credit interest when it **accrues**, even if it is paid later.',
        'Use the **basis the deed names** for profit till death, and count the months carefully.',
        'Draw the Balance Sheet in **horizontal form**; if it does not tally, check the **bank** first.',
      ],
      n: "In a full problem, marks are spread over the revaluation account, the capital accounts and the balance sheet, so attempt all three. Show working notes. In a loan account, credit interest when it accrues, even if it is paid later. Use the basis the deed names for profit till death and count the months carefully. If the balance sheet does not tally, check the bank first.",
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
  title: 'Reconstitution of Partnership: Retirement and Death of a Partner — Notes',
  sections: [
    {
      h: '1. Retirement and death of a partner',
      t: 1,
      b: "A partner who leaves **reconstitutes** the firm: the old agreement ends, the remaining partners carry on, and the books are adjusted rather than closed.\n\n- **Retirement (Section 32, Indian Partnership Act, 1932):** with the consent of all the other partners, under an express agreement, or by written notice in a partnership at will. A retired partner remains liable to third parties for acts of the firm until public notice of his retirement is given.\n- **Death:** subject to the deed, death dissolves the firm (Section 42); most deeds therefore provide that the surviving partners continue.\n- The outgoing partner (or his executor) is entitled to his capital and his share of everything the firm earned or built up while he was a partner.\n\n**Matters settled:** new and gaining ratios; goodwill; revaluation; reserves and accumulated profits or losses; profit till death (on death); amount due and its payment; capitals and the new Balance Sheet.\n\n*Not in the ISC 2027 syllabus for this chapter:* memorandum revaluation account, and joint life and individual life policies.",
      terms: [
        ['Retirement', 'Withdrawal of a partner from a firm whose business is carried on by the remaining partners.'],
        ['Executor', "The legal representative who receives a deceased partner's dues on behalf of his estate."],
      ],
      v: vAct,
      vs: [vSettle],
    },
    {
      h: '2. New ratio and gaining ratio',
      t: 1,
      b: "**Gain = new share − old share.** A negative result is a **sacrifice** by a continuing partner.\n\n| Terms | New share |\n|---|---|\n| Nothing agreed | In the old ratio of the continuing partners (gaining ratio = their old ratio) |\n| A fraction of the firm acquired | Old share + fraction acquired |\n| Outgoing share taken in a given ratio | Old share + outgoing share × his part of that ratio |\n| New ratio stated | As stated; compute every gain (one may be negative) |\n\n**Checks:** new shares add up to 1; gains minus any sacrifices equal the outgoing partner's share.",
      terms: [
        ['Gaining ratio', "Ratio in which the continuing partners acquire the outgoing partner's share."],
        ['Sacrificing ratio', 'Ratio in which partners give up shares; on retirement it matters only if a continuing partner loses.'],
      ],
      v: vCases,
      vs: [vW1, vShares, vW2, vSacGain],
    },
    {
      h: '3. Goodwill, book goodwill and hidden goodwill',
      t: 2,
      b: "**Accounting Standard 26:** no goodwill account is raised.\n\n- **Outgoing partner's share** = firm's goodwill × his share. Entry: Gaining partners' Capital A/cs Dr. (gaining ratio) To outgoing partner's Capital A/c.\n- **A continuing partner who sacrifices** is credited too, with sacrifice × goodwill; the gainers pay both.\n- **Book goodwill:** All partners' Capital A/cs Dr. (old ratio) To Goodwill A/c, before anything else.\n- **Hidden goodwill:** agreed settlement − his capital after all other adjustments = his share; firm's goodwill = his share ÷ his profit share.",
      terms: [
        ['Hidden goodwill', "Goodwill not stated in the terms but revealed by a settlement larger than the outgoing partner's adjusted capital."],
        ['Gaining partner', 'A continuing partner whose share rises; he compensates the outgoing partner for goodwill.'],
      ],
      v: vGwFlow,
      vs: [vW3, vHidden, vW4],
    },
    {
      h: '4. Revaluation, reserves and accumulated losses',
      t: 2,
      b: "**Revaluation Account:** losses (fall in assets, rise in or new liabilities, new provisions) on the debit side; gains on the credit side; the balance goes to **all** partners in the **old ratio**.\n\n**Reserves and accumulated profits or losses**, all partners, old ratio:\n- General reserve, credit balance of profit and loss: Reserve A/c Dr. To all partners' Capital A/cs.\n- Debit balance of profit and loss, advertisement suspense: all partners' Capital A/cs Dr. To the account.\n- Workmen compensation reserve: claim first (Workmen Compensation Claim A/c); balance credited; excess claim debited to Revaluation A/c.\n- Investment fluctuation reserve: fall in investments first; balance credited; excess fall debited to Revaluation A/c.",
      terms: [
        ['Revaluation Account', 'Nominal account recording gains and losses on revaluing assets and liabilities at reconstitution.'],
        ['Deferred revenue expenditure', 'Revenue expenditure carried on the assets side, such as advertisement suspense; a past loss shared in the old ratio.'],
      ],
      v: vRevalFormat,
      vs: [vGulOld, vGulReval, vReserves, vGulRes],
    },
    {
      h: '5. Deceased partner\'s share of profit till death',
      t: 3,
      b: "- **Time basis:** base profit (last year's, or an average of past years) × months to death ÷ 12 × his share.\n- **Turnover basis:** rate = last year's profit ÷ last year's sales; profit to death = sales to death × rate; × his share.\n\n**Recording**\n- Profit and Loss Suspense A/c Dr. To deceased partner's Capital A/c. The suspense account is closed when the year's profit is divided; if a balance sheet is drawn up on the date of death it appears among the **assets**.\n- Or: gaining partners' Capital A/cs Dr. (gaining ratio) To deceased partner's Capital A/c.\n\nInterest on capital, drawings and interest on drawings are also taken **up to the date of death**.",
      terms: [
        ['Profit and Loss Suspense Account', "Account debited with a deceased partner's share of profit till death until the year's profit is known."],
        ['Turnover basis', "Profit till death worked out from sales to death at last year's rate of profit on sales."],
      ],
      v: vBases,
      vs: [vW11, vRecord],
    },
    {
      h: "6. Adjustment of the continuing partners' capitals",
      t: 4,
      b: "1. Find the **total capital** of the new firm: as agreed, **or** their adjusted capitals + the cash needed (amount paid to the outgoing partner + minimum bank balance − bank available).\n2. **Required capital** = total × new share.\n3. Compare with each partner's capital after all adjustments: a **shortfall** is brought in (Bank A/c Dr. To Capital A/c); a **surplus** is withdrawn (Capital A/c Dr. To Bank A/c) or credited to a current account.\n\nWhen cash is brought in to pay the outgoing partner, the amounts brought in add up to the cash needed.",
      terms: [
        ['Required capital', "A continuing partner's share of the new firm's total capital, in the new ratio."],
        ['Minimum bank balance', 'The cash the partners agree to keep in the business after paying the outgoing partner.'],
      ],
      v: vAdjFlow,
      vs: [vW10],
    },
    {
      h: "7. Amount due, loan account and executor's account",
      t: 5,
      b: "**Amount due** = closing balance of the outgoing partner's capital account (see the table).\n\n**Settlement:** paid by bank; transferred to his **Loan A/c**; or both. If unpaid with no agreement, **Section 37** gives him, at his option, the share of profits attributable to the use of his share of the property, or interest at **6% per annum** on it.\n\n**Loan account (instalments with interest):** interest on the balance outstanding is credited to the loan account (Interest A/c Dr. To Loan A/c); each instalment plus interest is paid (Loan A/c Dr. To Bank A/c). Interest for months already run at the year end is credited even when payable later — **interest accrued but not due** — and is carried down in the balance; interest credited on the instalment date is **accrued and due**.\n\n**Death:** the balance of the deceased partner's capital account is transferred to his **Executor's A/c**, which is paid by bank and/or transferred to the **Executor's Loan A/c**.",
      terms: [
        ['Interest accrued but not due', 'Interest earned by the year end on an outstanding loan that is payable only with a later instalment.'],
        ["Executor's Loan Account", "The deceased partner's dues left in the firm, repaid to his executor with interest."],
      ],
      v: vDue,
      vs: [vModes, vGulCaps, vW8, vW9, vDeath, vW12cap, vW12ex],
    },
    {
      h: '8. Balance Sheet after retirement or death (horizontal form)',
      t: 6,
      b: "Prepared in **horizontal form**, liabilities and capitals on the left, assets on the right.\n\n- **Liabilities:** creditors and other outside liabilities, any claim or outstanding expense brought in, the **retiring partner's loan** or **executor's loan**, and the continuing partners' closing capitals.\n- **Assets:** revised values (debtors less provision), the **bank** after payments and any cash brought in, and **Profit and Loss Suspense** if used on death.\n- **Gone:** reserves, accumulated losses, advertisement suspense and book goodwill.\n\n**Check:** both sides total; if not, recompute the bank.",
      terms: [
        ['Reconstituted firm', 'The firm carried on by the continuing partners under their new agreement.'],
        ['Horizontal form', 'Balance sheet with liabilities and capitals on the left and assets on the right.'],
      ],
      v: vBSafter,
      vs: [vGulBS],
    },
  ],
  tips: "**Common mistakes**\n- Assuming the gaining ratio is the old ratio when a new ratio is stated.\n- Forgetting a continuing partner who **sacrifices** and must be credited for goodwill.\n- Sharing revaluation, reserves or losses only among the continuing partners; the outgoing partner shares them too.\n- Opening a goodwill account, or leaving book goodwill in the balance sheet.\n- Ignoring interest **accrued but not due** at the year end in a loan account.\n- Counting the months to death wrongly, or using the wrong basis for profit till death.\n- Showing Profit and Loss Suspense or the executor's loan on the wrong side; drawing the Balance Sheet in vertical form.\n\n**How marks are usually awarded (SOYL chapter tests on the ISC default pattern)**\n- 1 mark: objective items.\n- 2 marks: a ratio calculation, hidden goodwill, profit till death with its entry, or a capital adjustment.\n- 3 marks: a Revaluation Account, a set of reserve entries, a loan account, or capital and executor's accounts.\n- 5 marks in parts, e.g. (a) 2 + (b) 3: ratios and goodwill with a Revaluation Account, or the amount due with a loan account.\n- Full practical (practice, 8 marks): Revaluation Account about 2, capital accounts about 3, Balance Sheet about 3; working notes earn step marks.\n\n**Figures in SOYL practice** are imagined; your board paper will give its own.",
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Three ways a partner may retire (Section 32)', 'With the consent of all the other partners; under an express agreement; by written notice in a partnership at will.', 'fact', 1],
  ['Effect of death on a firm under the Act', 'Dissolves it unless the deed provides that the survivors continue (Section 42).', 'fact', 1],
  ['**Gain** of a continuing partner', '**New share − old share**; a negative result is a sacrifice.', 'definition', 1],
  ['New ratio when nothing is agreed', 'The old ratio of the continuing partners; the gaining ratio is the same.', 'fact', 1],
  ['Fraction **of the firm** acquired from the outgoing partner', 'Add it to the old share; the gain is that fraction.', 'exam-tip', 1],
  ['Sacrificing ratio vs gaining ratio', 'Sacrificing: old − new, on admission. Gaining: new − old, on retirement or death.', 'concept', 1],
  ["Outgoing partner's share of goodwill", "Firm's goodwill × his share, debited to the gaining partners in the gaining ratio.", 'definition', 2],
  ['Entry for goodwill on retirement', "Gaining partners' Capital A/cs Dr. To retiring partner's Capital A/c.", 'fact', 2],
  ['Continuing partner who sacrifices on retirement', 'He is credited for goodwill along with the outgoing partner.', 'concept', 2],
  ['Goodwill already in the books on retirement', "Written off among **all** partners in the old ratio.", 'fact', 2],
  ['**Hidden goodwill** on retirement', "Agreed settlement − outgoing partner's adjusted capital = his share; ÷ his share = firm's goodwill.", 'definition', 2],
  ['Revaluation profit or loss on retirement goes to…', '**All** the partners, the outgoing one included, in the **old ratio**.', 'fact', 2],
  ['General reserve on retirement', "Credited to all partners' capitals in the old ratio.", 'fact', 2],
  ['Advertisement suspense on retirement', "Debited to all partners' capitals in the old ratio.", 'fact', 2],
  ['Workmen compensation claim larger than the reserve', 'Reserve used up; the excess is debited to the Revaluation Account.', 'concept', 2],
  ['Investment fluctuation reserve on retirement', 'Meets the fall in investments first; the balance goes to all partners.', 'concept', 2],
  ['Profit till death — **time basis**', 'Base profit × months to death ÷ 12 × his share.', 'fact', 3],
  ['Profit till death — **turnover basis**', "Sales to death × (last year's profit ÷ last year's sales) × his share.", 'fact', 3],
  ['Entry through Profit and Loss Suspense', "Profit and Loss Suspense A/c Dr. To deceased partner's Capital A/c.", 'fact', 3],
  ['Profit and Loss Suspense in a balance sheet on the date of death', 'Assets side (a debit balance).', 'exam-tip', 3],
  ['Total capital when cash is brought in to pay the outgoing partner', 'Adjusted capitals + (payment + minimum bank balance − bank available).', 'fact', 4],
  ['Required capital of a continuing partner', 'Total capital × his new share; bring in a shortfall, withdraw a surplus.', 'fact', 4],
  ['Amount due to a retiring partner', 'Closing balance of his capital account after every adjustment.', 'definition', 5],
  ['**Section 37** option', 'Share of profits from the use of his share of property, or interest at 6% per annum, at his choice.', 'fact', 5],
  ['Interest **accrued but not due**', 'Credited to the loan account at the year end and paid with the next instalment.', 'concept', 5],
  ['Instalment payment on a partner\'s loan', 'Instalment of principal + interest on the balance outstanding.', 'fact', 5],
  ["Deceased partner's capital balance", "Transferred to his **Executor's A/c**.", 'fact', 5],
  ["Executor's account is closed by", "Bank A/c (paid) and/or Executor's Loan A/c (kept in the firm).", 'fact', 5],
  ["Retiring partner's loan in the balance sheet", 'Liabilities side.', 'exam-tip', 6],
  ['Format of the Balance Sheet after retirement or death', '**Horizontal**: liabilities and capitals left, assets right; revised values.', 'exam-tip', 6],
]);

// ---------------------------------------------------------------- tests (ISC class defaults, item for item)
const T_SHORT = test({
  kind: 'short',
  blueprint: 'isc-12-default-chapter-test-short',
  title: 'Chapter test (short) — Reconstitution of Partnership: Retirement and Death of a Partner',
  duration: 50,
  sections: [
    { id: 'A', title: 'Section A - Objective (5 marks)', instr: 'Answer all questions. Multiple-choice and assertion-reason items carry 1 mark each.', items: ['m_retire_consent', 'm_gw_amount', 'm_time_basis', 'm_cap_total', 'ar_reserve'] },
    { id: 'B', title: 'Section B - Short answer (4 marks)', instr: 'Answer both questions. Internal choice in the second question.', items: ['s2_gw_entries', { attempt: 1, keys: ['s2_time', 's2_amount_due'] }] },
    { id: 'C', title: 'Section C - Short answer (6 marks)', instr: 'Answer both questions. Internal choice in the second question. Show your working.', items: ['s3_reval', { attempt: 1, keys: ['s3_turnover_gainers', 's3_loan'] }] },
    { id: 'D', title: 'Section D - Long answer (5 marks)', instr: 'Answer the question. It is set in parts (2 + 3 marks); show working notes.', items: ['l5_loan'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'isc-12-default-chapter-test-long',
  title: 'Chapter test (long) — Reconstitution of Partnership: Retirement and Death of a Partner',
  duration: 100,
  sections: [
    { id: 'A', title: 'Section A - Objective (12 marks)', instr: 'Answer all questions. Multiple-choice and assertion-reason items carry 1 mark each.', items: ['m_default_ratio', 'm_gain_newratio', 'm_sacrifice_cont', 'm_gw_entry', 'm_existing_gw', 'm_hidden', 'm_reval_share', 'm_turnover', 'm_loan_interest', 'm_bs_format', 'ar_existing', 'ar_suspense'] },
    { id: 'B', title: 'Section B - Short answer (6 marks)', instr: 'Answer all three questions. Internal choice in the last question.', items: ['s2_ratio_take', 's2_hidden', { attempt: 1, keys: ['s2_wcr_ifr', 's2_cap_adjust'] }] },
    { id: 'C', title: 'Section C - Short answer (12 marks)', instr: 'Answer all four questions. Internal choice in the last question. Show your working.', items: ['s3_ratio_sacr', 's3_reserves', 's3_cap_bring', { attempt: 1, keys: ['s3_loan_mid', 's3_executor'] }] },
    { id: 'D', title: 'Section D - Long answer (10 marks)', instr: 'Answer both questions. Internal choice in the second question. Each is set in parts (2 + 3 or 3 + 2 marks).', items: ['l5_gw_reval', { attempt: 1, keys: ['l5_death_profit', 'l5_cap_adjust'] }] },
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
    syllabus: 'topics t01–t06 of isc-12-accounts-ch04 only (new and gaining ratios; goodwill including hidden goodwill, revaluation and accumulated profits or losses; profit till death on the time or turnover basis; adjustment of continuing partners\' capitals including cash brought in; amount due, loan account and executor\'s account; the horizontal Balance Sheet after retirement or death). Removed topics appear only as one note in notes section 1.',
    originality: 'every firm, person and figure is imagined and labelled as such; no textbook illustration or exercise and no CISCE specimen or past-paper item is reused; firms, people and set-ups differ from the CBSE 12 Accountancy chapters and ISC chapters 1 to 3',
    data: 'every ratio, gain, goodwill amount, revaluation result, profit till death, loan schedule, capital and balance sheet is computed by acc.mjs and asserted: journal entries balance, ledger accounts and balance sheets total, shares divide into whole rupees, loans are repaid in full, bank never overdrawn',
    accounting: 'goodwill charged to gaining partners in the gaining ratio (a sacrificing continuing partner is credited); book goodwill, revaluation, reserves and accumulated losses to all partners in the old ratio; special reserves meet the claim or fall first; hidden goodwill from the agreed settlement; profit till death via Profit and Loss Suspense or the gaining partners; interest accrued but not due credited to the loan account; no goodwill account raised (Accounting Standard 26)',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
