// Build CBSE 12 Accountancy ch04 Retirement and Death of a Partner. Run from platform/:
//   npx tsx content/authored/economics-commerce/cbse-12-accountancy-ch04/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';

setUnit('cbse-12-accountancy-ch04', 'economics-commerce');
const { F, pct, fig, rs, rupees, ratioWords, shares, split, exitShares, goodwillAdj, journal, capitalAccounts, revaluation, balanceSheet, loanAccount, ledger, check } = await import('./acc.mjs');
const { cap, capRows, FACTS } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const T = (t) => table(t.headers, t.rows, t.alt, t.caption);

// ---------------------------------------------------------------- running example: Sitara Traders (imagined, Jaipur)
const NAMES = ['Arjun', 'Bela', 'Chirag'];
const OLD = shares(NAMES, [5, 3, 2]);
const ST = {
  creditors: 70000, wcr: 20000, claim: 12000, gr: 50000, cap: { Arjun: 200000, Bela: 150000, Chirag: 100000 },
  building: 240000, machinery: 100000, stock: 68000, debtors: 60000, bank: 92000, goodwillBooks: 30000,
  buildingUp: 40000, stockDown: 8000, pddRate: F(5, 100), repairs: 4000, goodwill: 180000, paidNow: 46600,
};
const BS0 = balanceSheet(
  [['Creditors', ST.creditors], ['Workmen Compensation Reserve', ST.wcr], ['General Reserve', ST.gr], ...NAMES.map((p) => [`Capital: ${p}`, ST.cap[p]])],
  [['Building', ST.building], ['Machinery', ST.machinery], ['Stock', ST.stock], ['Debtors', ST.debtors], ['Bank', ST.bank], ['Goodwill', ST.goodwillBooks]],
);
const EX_DEF = exitShares({ old: OLD, out: 'Chirag', mode: 'old' });
const EX = exitShares({ old: OLD, out: 'Chirag', mode: 'given', newShares: shares(['Arjun', 'Bela'], [3, 2]) });
const GW = goodwillAdj(ST.goodwill, EX.change);
const OLDGW = split(ST.goodwillBooks, OLD);
const PDD = ST.pddRate.of(ST.debtors);
const RV = revaluation([['Building A/c', ST.buildingUp], ['Stock A/c', -ST.stockDown], ['Provision for Doubtful Debts A/c', -PDD], ['Outstanding Repairs A/c', -ST.repairs]], OLD);
const GRs = split(ST.gr, OLD);
const WCRs = split(ST.wcr - ST.claim, OLD);
const CA = capitalAccounts(NAMES, {
  dr: [['Goodwill A/c (written off)', OLDGW], [cap('Chirag'), GW.dr]],
  cr: [['Balance b/d', ST.cap], ['Revaluation A/c', RV.part], ['General Reserve A/c', GRs], ['Workmen Compensation Reserve A/c', WCRs], [cap('Arjun'), { Chirag: GW.dr.Arjun }], [cap('Bela'), { Chirag: GW.dr.Bela }]],
  close: [['Bank A/c', { Chirag: ST.paidNow }], ["Chirag's Loan A/c", ['Chirag']], ['Balance c/d', ['Arjun', 'Bela']]],
});
const LOAN = CA.closed["Chirag's Loan A/c"].Chirag;
const LN = loanAccount({ principal: LOAN, rate: 10, opens: ['31 Mar 2026', '1 Apr 2027'], ends: ['31 Mar 2027', '31 Mar 2028'], firstLabel: "Chirag's Capital A/c" });
const BS1 = balanceSheet(
  [['Creditors', ST.creditors], ['Outstanding Repairs', ST.repairs], ['Workmen Compensation Claim', ST.claim], ["Chirag's Loan", LOAN], ['Capital: Arjun', CA.balance.Arjun], ['Capital: Bela', CA.balance.Bela]],
  [['Building', ST.building + ST.buildingUp], ['Machinery', ST.machinery], ['Stock', ST.stock - ST.stockDown], [`Debtors ${fig(ST.debtors)} less provision ${fig(PDD)}`, ST.debtors - PDD], ['Bank', ST.bank - ST.paidNow]],
);
const NEWCAP = 360000;
const NEED = split(NEWCAP, EX.nw);
const ADJ = { Arjun: NEED.Arjun - CA.balance.Arjun, Bela: NEED.Bela - CA.balance.Bela };
for (const [ok, what] of [
  [BS0.total === 590000, 'opening balance sheet'],
  [EX_DEF.gainRatio === '5:3' && EX.gainRatio === '1:1' && EX.change.Arjun.eq(F(1, 10)), 'ratios'],
  [GW.dr.Arjun === 18000 && GW.dr.Bela === 18000 && GW.cr.Chirag === 36000, 'goodwill'],
  [RV.result === 25000 && PDD === 3000, 'revaluation'],
  [CA.balance.Chirag === 146600 && LOAN === 100000 && CA.balance.Arjun === 208500 && CA.balance.Bela === 147900, 'capital accounts'],
  [LN.sched[0].pay === 60000 && LN.sched[1].pay === 55000, 'loan'],
  [BS1.total === 542400, 'balance sheet after retirement'],
  [ADJ.Arjun === 7500 && ADJ.Bela === -3900, 'capital adjustment'],
]) check(ok, `Sitara Traders: ${what}`);

// ---------------------------------------------------------------- second example: Riya, Sahil and Tenzin
const RST = exitShares({ old: shares(['Riya', 'Sahil', 'Tenzin'], [4, 3, 2]), out: 'Tenzin', mode: 'portion', take: { Riya: F(1, 2), Sahil: F(1, 2) } });
check(RST.newRatio === '5:4' && RST.gainRatio === '1:1', 'Riya/Sahil/Tenzin');

// ---------------------------------------------------------------- death example: Kaveri Handlooms (imagined, Mysuru)
const KN = ['Meera', 'Nakul', 'Kabir'];
const KOLD = shares(KN, [2, 2, 1]);
const KV = { lastProfit: 360000, profits: [270000, 330000, 450000], sales: 2400000, salesTill: 700000, months: 3, capital: 120000, gr: 40000, goodwill: 150000, drawings: 9000, paid: 70000 };
const K_avg = KV.profits.reduce((a, b) => a + b, 0) / KV.profits.length;
const K_rate = F(KV.lastProfit, KV.sales);
const K_time = F(1, 5).of(F(KV.months, 12).of(KV.lastProfit));
const K_avgS = F(1, 5).of(F(KV.months, 12).of(K_avg));
const K_turn = F(1, 5).of(K_rate.of(KV.salesTill));
const KEX = exitShares({ old: KOLD, out: 'Kabir', mode: 'old' });
const KGW = goodwillAdj(KV.goodwill, KEX.change);
const KCA = capitalAccounts(['Kabir'], {
  dr: [['Drawings A/c', { Kabir: KV.drawings }]],
  cr: [['Balance b/d', { Kabir: KV.capital }], ['General Reserve A/c', { Kabir: split(KV.gr, KOLD).Kabir }], ...Object.entries(KGW.dr).map(([p, v]) => [cap(p), { Kabir: v }]), ['Profit and Loss Suspense A/c', { Kabir: K_turn }]],
  close: [["Kabir's Executor's A/c", ['Kabir']]],
});
const KDUE = KCA.balance.Kabir;
const KEXA = ledger([['Bank A/c', KV.paid], ["Kabir's Executor's Loan A/c", KDUE - KV.paid]], [["Kabir's Capital A/c", KDUE]]);
check(K_avg === 350000 && K_time === 18000 && K_avgS === 17500 && K_turn === 21000 && KGW.dr.Meera === 15000 && KDUE === 170000, 'Kaveri Handlooms');

// ---------------------------------------------------------------- visuals: deck 1
const vRoute1 = flow('LR', ['New and gaining ratios', 'Goodwill (AS 26)', 'Revaluation', 'Reserves and accumulated profits'], 'Route map of Part 1: new and gaining ratios, goodwill under Accounting Standard 26, revaluation of assets and liabilities, and reserves and accumulated profits', 'Part 1 at a glance');
const vRetDeath = table(
  ['Basis', 'Retirement', 'Death'],
  [
    ['What happens', 'A partner leaves by choice, with notice or by agreement', 'A partner dies; the firm usually continues under the deed'],
    ['Date', 'Usually the end of the accounting year', 'Any day of the year'],
    ['Amount paid to', 'The retiring partner', "His executor (legal representative)"],
    ['Extra step', 'None', 'Share of profit from the start of the year to the date of death'],
    ['Common steps', 'New and gaining ratios, goodwill, revaluation, reserves, settlement', 'The same'],
  ],
  'Table comparing retirement and death: retirement is by choice and usually at the year end, with payment to the retiring partner; death can occur on any day, payment goes to the executor, and the share of profit till the date of death must be added; ratios, goodwill, revaluation, reserves and settlement are common to both',
);
const vSteps = flow('TB', ['1. New ratio and gaining ratio', '2. Goodwill: outgoing share credited, gaining partners debited', '3. Revaluation of assets and liabilities', '4. Reserves and accumulated profits or losses', '5. Amount due: paid, or kept as a loan', '6. Balance sheet of the reconstituted firm'], 'Flow of the six adjustments on retirement or death: ratios, goodwill, revaluation, reserves, amount due and settlement, and the new balance sheet', 'Do the adjustments in this order');
const vCases = table(
  ['Situation', 'New share of a continuing partner', 'Gaining ratio'],
  [
    ['Nothing agreed', 'Old ratio between the continuing partners', 'Same as their old ratio'],
    ['New ratio agreed', 'As agreed', 'New share − old share of each'],
    ['Outgoing share taken in a stated proportion', 'Old share + portion acquired', 'The proportion in which they acquire'],
  ],
  'Table of three cases for the new ratio: if nothing is agreed, the continuing partners keep their old ratio and gain in that ratio; if a new ratio is agreed, gain is new share minus old share; if the outgoing share is taken in a stated proportion, new share is old share plus the portion acquired',
);
const ratioRows = (old, ex, out) => Object.keys(old).map((p) => [p, `${old[p]}`, p === out ? '— (retires)' : `${ex.nw[p]}`, p === out ? `(−) ${old[p]}` : `${ex.change[p]}`]);
const vWE1 = table(
  ['Partner', 'Old share', 'New share (3:2 agreed)', 'Gain = new − old'],
  ratioRows(OLD, EX, 'Chirag'),
  `Table of worked example 1: Arjun old one half, new three fifths, gain one tenth; Bela old three tenths, new two fifths, gain one tenth; Chirag retires giving up one fifth; the gaining ratio is one to one`,
  `With no agreement the new ratio would be ${EX_DEF.newRatio} and the gaining ratio ${EX_DEF.gainRatio}; with 3:2 agreed it is ${EX.gainRatio}.`,
);
const vBars = (() => {
  const s = new Svg(560, 210);
  const X0 = 110;
  const W = 400;
  const bar = (y, label, parts) => {
    s.text(X0 - 10, y + 22, label, { anchor: 'end', size: 13 });
    let x = X0;
    parts.forEach(([name, f, fill]) => {
      const w = (W * f.n) / f.d;
      s.rect(x, y, w, 44, { fill, color: 'accent', sw: 1.5, rx: 2 });
      s.text(x + w / 2, y + 22, `${name} ${f}`, { size: 13 });
      x += w;
    });
    check(Math.abs(x - X0 - W) < 1e-9, 'share bar adds to the whole');
  };
  bar(30, 'Before', [['Arjun', OLD.Arjun, 'fill'], ['Bela', OLD.Bela, 'fill'], ['Chirag', OLD.Chirag, 'accent']]);
  bar(120, 'After', [['Arjun', EX.nw.Arjun, 'fill'], ['Bela', EX.nw.Bela, 'fill']]);
  s.text(X0 + W / 2, 195, "Chirag's 1/5 is shared: Arjun gains 1/10, Bela gains 1/10", { size: 12, muted: true });
  return s.visual(
    'Two bars of equal length showing the whole profit. Before: Arjun one half, Bela three tenths, Chirag one fifth. After Chirag retires: Arjun three fifths and Bela two fifths. Each continuing partner gains one tenth',
    'The whole profit is always 1: the outgoing share is spread over the continuing partners.',
  );
})();
const vSacGain = table(
  ['Basis', 'Sacrificing ratio', 'Gaining ratio'],
  [
    ['Formula', 'Old share − new share', 'New share − old share'],
    ['Mainly used on', 'Admission of a partner', 'Retirement or death of a partner'],
    ['Who pays for goodwill', 'The incoming partner', 'The gaining partners'],
  ],
  'Table comparing sacrificing ratio, old share minus new share, used on admission with the new partner paying for goodwill, and gaining ratio, new share minus old share, used on retirement or death with the gaining partners paying for goodwill',
);
const vWE2 = table(
  ['Partner', 'Old share', 'Acquired from Tenzin', 'New share'],
  [
    ['Riya', '4/9', `1/2 × 2/9 = ${RST.change.Riya}`, `${RST.nw.Riya}`],
    ['Sahil', '3/9', `1/2 × 2/9 = ${RST.change.Sahil}`, `${RST.nw.Sahil}`],
  ],
  'Table of worked example 2: Riya and Sahil each acquire half of Tenzin’s two ninths, that is one ninth each; Riya’s new share is five ninths and Sahil’s four ninths',
  `New ratio ${RST.newRatio}; gaining ratio ${RST.gainRatio}.`,
);
const vGwFlow = flow('LR', ["Value the firm's goodwill", "Outgoing partner's share = value × his old share", 'Debit gaining partners in the gaining ratio', "Credit the outgoing partner's capital"], 'Flow of the goodwill adjustment: value the firm’s goodwill, find the outgoing partner’s share, debit the gaining partners in their gaining ratio and credit the outgoing partner’s capital account', 'No Goodwill Account is raised (AS 26)');
const J_GW = journal([{ dr: capRows(GW.dr), cr: capRows(GW.cr), nar: "Chirag's share of goodwill adjusted in the gaining ratio 1:1" }]);
const J_OLDGW = journal([{ dr: capRows(OLDGW), cr: [['Goodwill A/c', ST.goodwillBooks]], nar: 'existing goodwill written off in the old ratio 5:3:2' }]);
const vRevFormat = table(
  ['Debit side (losses)', 'Credit side (gains)'],
  [
    ['Decrease in the value of an asset', 'Increase in the value of an asset'],
    ['Increase in a liability', 'Decrease in a liability'],
    ['Unrecorded liability brought in', 'Unrecorded asset brought in'],
    ['New or extra provision (doubtful debts)', 'Provision no longer needed'],
    ['Balance: profit to all partners (old ratio)', 'Balance: loss to all partners (old ratio)'],
  ],
  'Format of the Revaluation Account: losses on the debit side, such as a fall in an asset, a rise in a liability, an unrecorded liability or a new provision; gains on the credit side, such as a rise in an asset, a fall in a liability or an unrecorded asset; the balance is profit or loss shared by all partners in the old ratio',
);
const vReserves = table(
  ['Item in the balance sheet', 'Treatment on retirement or death'],
  [
    ['General Reserve; Profit and Loss (credit balance)', 'Credited to all partners in the old ratio'],
    ['Profit and Loss (debit balance)', 'Debited to all partners in the old ratio'],
    ['Workmen Compensation Reserve', 'Claim first; the surplus to all partners in the old ratio; an excess claim is a revaluation loss'],
    ['Investment Fluctuation Reserve', 'Fall in value first; the balance to all partners in the old ratio'],
  ],
  'Table of reserves and accumulated profits: general reserve and a credit balance of profit and loss are credited to all partners in the old ratio; a debit balance is debited to them; the workmen compensation reserve first meets the claim and the investment fluctuation reserve first meets the fall in value, with the balance distributed',
);
const J_RES = journal([
  { dr: [['General Reserve A/c', ST.gr]], cr: capRows(GRs), nar: 'general reserve distributed in the old ratio' },
  { dr: [['Workmen Compensation Reserve A/c', ST.wcr]], cr: [['Workmen Compensation Claim A/c', ST.claim], ...capRows(WCRs)], nar: 'claim provided; surplus reserve distributed in the old ratio' },
]);
const vSummary1 = table(
  ['Adjustment', 'Ratio used', 'Who is debited / credited'],
  [
    ['Gaining ratio', '—', 'New share − old share of each continuing partner'],
    ["Outgoing partner's goodwill", 'Gaining ratio', 'Gaining partners Dr; outgoing partner Cr'],
    ['Goodwill already in the books', 'Old ratio', 'All partners Dr; Goodwill A/c Cr'],
    ['Revaluation profit or loss', 'Old ratio', 'All partners, including the outgoing one'],
    ['Reserves and accumulated profits', 'Old ratio', 'All partners Cr (losses Dr)'],
  ],
  'Summary table: the outgoing partner’s goodwill is adjusted in the gaining ratio, debiting the gaining partners; existing goodwill, revaluation results, reserves and accumulated profits or losses are all shared in the old ratio by all partners, including the outgoing one',
);

// ---------------------------------------------------------------- visuals: deck 2
const vRoute2 = flow('LR', ['Amount due', 'Payment and loan', 'Balance sheet', 'Capital adjustment', 'Death: profit till death', "Executor's account"], 'Route map of Part 2: amount due, payment and loan account, balance sheet, capital adjustment, then the death of a partner with profit till death and the executor’s account', 'Part 2 at a glance');
const vDue = table(
  ["Credited to the outgoing partner's capital", "Debited to the outgoing partner's capital"],
  [
    ['Opening capital (and current account credit balance)', 'Drawings (and current account debit balance)'],
    ['Share of goodwill from the gaining partners', 'Share of goodwill written off, if it was in the books'],
    ['Share of revaluation profit', 'Share of revaluation loss'],
    ['Share of reserves and accumulated profits', 'Share of accumulated losses'],
    ['Interest on capital, salary, commission, profit till death (if any)', 'Interest on drawings (if any)'],
  ],
  "Table of what goes into the outgoing partner's capital account: credits are opening capital, goodwill from gaining partners, revaluation profit, reserves and any interest, salary or profit till death; debits are drawings, goodwill written off, revaluation loss, accumulated losses and interest on drawings",
  'Balance of the capital account = amount due.',
);
const vCA = table(CA.headers, CA.rows, `Partners' capital accounts of Sitara Traders: Chirag's account closes with ${fig(ST.paidNow)} paid by bank and ${fig(LOAN)} transferred to his loan; Arjun and Bela carry down ${fig(CA.balance.Arjun)} and ${fig(CA.balance.Bela)}`, `Amount due to Chirag ${rs(CA.balance.Chirag)}.`);
const vPay = table(
  ['Mode', 'Entry', 'Note'],
  [
    ['Paid at once', "Retiring Partner's Capital A/c Dr, To Bank A/c", 'Firm must have enough cash'],
    ['Left as a loan', "Retiring Partner's Capital A/c Dr, To Retiring Partner's Loan A/c", 'Shown as a liability'],
    ['Interest on the loan', "Interest A/c Dr, To Retiring Partner's Loan A/c", 'Rate as agreed; Section 37 if nothing is agreed'],
    ['Each instalment', "Retiring Partner's Loan A/c Dr, To Bank A/c", 'Instalment plus interest'],
  ],
  'Table of modes of payment: paying at once through the bank, leaving the amount as a loan shown as a liability, crediting interest to the loan, and paying instalments from the loan account',
);
const vLoan = table(LN.headers, LN.rows, `Chirag's loan account: ${fig(LOAN)} on 31 March 2026; interest ${fig(LN.sched[0].interest)} and payment ${fig(LN.sched[0].pay)} in the first year; interest ${fig(LN.sched[1].interest)} and payment ${fig(LN.sched[1].pay)} in the second year, when the loan is closed`, 'Interest is on the opening balance of each year.');
const vBS1 = table(BS1.headers, BS1.rows, `Balance sheet of Arjun and Bela after Chirag's retirement, totalling ${fig(BS1.total)} on each side, with Chirag's loan of ${fig(LOAN)} as a liability`, 'Revalued figures; the reserves have gone to the capitals.');
const vCapAdjFlow = flow('LR', ['Total capital of the new firm', '× new share = required capital', 'Compare with adjusted capital', 'Bring in the deficit or withdraw the surplus'], 'Flow of capital adjustment: total capital times new share gives each required capital; compare with the adjusted capital and bring in or withdraw the difference', 'Or transfer the difference to current accounts');
const vCapAdj = table(
  ['', 'Arjun (₹)', 'Bela (₹)'],
  [
    [`Required capital (3:2 of ${fig(NEWCAP)})`, fig(NEED.Arjun), fig(NEED.Bela)],
    ['Adjusted capital after retirement', fig(CA.balance.Arjun), fig(CA.balance.Bela)],
    ['**Bring in / (withdraw)**', `**${fig(ADJ.Arjun)}**`, `**(${fig(-ADJ.Bela)})**`],
  ],
  `Table of worked example 9: required capitals ${fig(NEED.Arjun)} and ${fig(NEED.Bela)} against adjusted capitals ${fig(CA.balance.Arjun)} and ${fig(CA.balance.Bela)}; Arjun brings in ${fig(ADJ.Arjun)} and Bela withdraws ${fig(-ADJ.Bela)}`,
);
const vDeathFlow = flow('LR', ['Date of death', 'Profit from the start of the year to death', 'All usual adjustments', 'Balance to the Executor’s Account', 'Payment or executor’s loan'], 'Flow on death: from the date of death, add the share of profit till death, make the usual adjustments, transfer the balance to the executor’s account, and pay it or keep it as a loan', 'Same steps as retirement, plus profit till death');
const vBases = table(
  ['Basis', 'Profit till death', `Kabir (1/5), Kaveri Handlooms`],
  [
    ["Time, last year's profit", 'Last year profit × months ÷ 12', `${fig(KV.lastProfit)} × 3/12 × 1/5 = ${fig(K_time)}`],
    ['Time, average profit', 'Average profit × months ÷ 12', `${fig(K_avg)} × 3/12 × 1/5 = ${fig(K_avgS)}`],
    ['Turnover (sales)', 'Sales till death × last year profit ÷ last year sales', `${fig(KV.salesTill)} × ${pct(K_rate)} × 1/5 = ${fig(K_turn)}`],
  ],
  `Table of the bases for profit till death for an imagined firm: time basis on last year's profit gives ${fig(K_time)}, time basis on average profit gives ${fig(K_avgS)}, and the sales basis gives ${fig(K_turn)}`,
  'The deed decides the basis; the time basis assumes profit accrues evenly.',
);
const J_SUSP = journal([{ date: '30 Jun 2026', dr: [['Profit and Loss Suspense A/c', K_turn]], cr: [[cap('Kabir'), K_turn]], nar: "Kabir's share of profit till death on the sales basis" }]);
const vKCA = table(KCA.headers, KCA.rows, `Kabir's capital account: credits of capital, reserve, goodwill from Meera and Nakul and profit till death; debit of drawings; balance of ${fig(KDUE)} transferred to his executor's account`, `Amount due to Kabir's executor ${rs(KDUE)}.`);
const vKEX = table(KEXA.headers, KEXA.rows, `Kabir's executor's account: credited with ${fig(KDUE)}; debited with ${fig(KV.paid)} paid by bank and ${fig(KDUE - KV.paid)} transferred to the executor's loan account`);
const vSummary2 = table(
  ['Step', 'Entry or rule'],
  [
    ['Amount due', 'Balance of the outgoing capital account after all adjustments'],
    ['Paid / kept', 'Capital A/c Dr → Bank A/c or Loan A/c'],
    ['Loan', 'Liability; interest on the opening balance; Section 37 if nothing agreed'],
    ['Capital adjustment', 'Total capital × new share; bring in or withdraw the difference'],
    ['Profit till death', 'Profit and Loss Suspense A/c Dr, To Deceased Partner’s Capital A/c'],
    ['Executor', 'Deceased Partner’s Capital A/c Dr, To Executor’s A/c'],
  ],
  'Summary table of Part 2: the amount due is the balance of the outgoing capital account, paid or kept as a loan with interest; continuing capitals can be adjusted to the new ratio; profit till death goes through Profit and Loss Suspense; the deceased partner’s balance goes to the executor’s account',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Retirement and Death of a Partner — Part 1: Ratios, Goodwill, Revaluation and Reserves',
  goals: [
    'Calculate the new ratio and the gaining ratio when a partner retires or dies',
    'Adjust the outgoing partner’s share of goodwill under Accounting Standard 26',
    'Prepare the Revaluation Account and distribute reserves and accumulated profits or losses',
  ],
  slides: [
    sl('title', 'Retirement and Death of a Partner', {
      b: 'Part 1 — **new and gaining ratios**, **goodwill**, **revaluation** and **reserves** when a partner leaves the firm.',
      v: vRoute1,
      n: 'When a partner retires or dies, the old partnership ends but the firm usually carries on. The partners who remain must work out their new shares, pay the outgoing partner for his share of goodwill, revalue the assets and liabilities, and share out past reserves. In this part we learn each of these adjustments, step by step, using one imagined firm.',
    }),
    sl('two-column', 'Retirement and death: one set of adjustments', {
      cols: [
        '**Retirement**\n\n- A partner leaves by notice or agreement.\n- Usually at the end of the year.\n- Paid to the **retiring partner**.',
        '**Death**\n\n- Can happen on any day.\n- Profit **till the date of death** is added.\n- Paid to his **executor**.',
      ],
      v: vRetDeath,
      n: 'Retirement and death look different, but the accounting is almost the same. In both, a partner leaves and the others continue. The only extra step on death is the share of profit from the start of the year to the date of death, and the money is paid to the executor, who is the legal representative of the partner who has died.',
    }),
    sl('concept', 'What has to be settled', {
      v: vSteps,
      n: 'Here is the order we will follow. First the new ratio and the gaining ratio. Then goodwill, because the continuing partners will enjoy the outgoing partner’s share of future profits. Then revaluation and reserves, which belong to all the old partners. Their total gives the amount due. Finally the outgoing partner is paid or his money is kept as a loan, and a new balance sheet is drawn up.',
    }),
    sl('concept', 'Finding the new ratio and the gaining ratio', {
      v: vCases,
      bl: ['**Gain = new share − old share.**', 'The gains of the continuing partners add up to the outgoing partner’s share.'],
      n: 'The gaining ratio is the ratio in which the continuing partners take over the outgoing share. For each partner, subtract the old share from the new share. If nothing is agreed, they keep their old ratio and gain in that same ratio. If a new ratio is agreed, or the outgoing share is bought in a stated proportion, work out each gain separately.',
    }),
    sl('example', 'Worked example 1: Sitara Traders', {
      b: 'An imagined firm in Jaipur: **Arjun, Bela and Chirag** share profits **5:3:2**. Chirag retires on 31 March 2026. Find the gaining ratio (a) if nothing is agreed, (b) if Arjun and Bela agree on **3:2**.',
      bl: [`(a) Old ratio continues: new ratio ${EX_DEF.newRatio}, gaining ratio **${EX_DEF.gainRatio}**.`, `(b) Arjun 3/5 − 1/2 = ${EX.change.Arjun}; Bela 2/5 − 3/10 = ${EX.change.Bela}; gaining ratio **${EX.gainRatio}**.`],
      v: vWE1,
      n: `In case a, nothing is agreed, so Arjun and Bela simply continue five to three, and they gain in that same ratio. In case b they agree on three to two. Arjun's new share of three fifths minus his old one half gives one tenth. Bela's two fifths minus three tenths also gives one tenth. So the gaining ratio is ${ratioWords(EX.gainRatio)}, not five to three.`,
    }),
    sl('diagram', 'Picture the shares', {
      v: vBars,
      n: 'Think of the whole profit as one bar. Before retirement, Arjun has half the bar, Bela three tenths and Chirag one fifth. After Chirag leaves, the same bar is divided only between Arjun and Bela. Chirag’s fifth has not vanished. It has been spread over the continuing partners, one tenth each in our example. That is exactly what the gaining ratio measures.',
    }),
    sl('check', 'Quick check: one partner takes over', {
      b: 'Only one continuing partner takes over the outgoing share.',
      chk: 'm_one_takes',
      n: 'Add the outgoing share to the partner who takes it over. The other partner’s share does not change.',
    }),
    sl('two-column', 'Sacrificing ratio and gaining ratio', {
      cols: ['**Sacrificing ratio**\n\n- Old share − new share.\n- Mainly on **admission**.', '**Gaining ratio**\n\n- New share − old share.\n- Mainly on **retirement and death**.'],
      v: vSacGain,
      n: 'You met the sacrificing ratio on admission, when old partners give up part of their shares to a new partner. The gaining ratio is its mirror image. On retirement or death, the continuing partners gain, and they pay for what they gain. Remember the formulas: sacrifice is old minus new, gain is new minus old.',
    }),
    sl('example', 'Worked example 2: a share bought in a stated proportion', {
      b: 'An imagined firm in Gangtok: **Riya, Sahil and Tenzin** share profits **4:3:2**. Tenzin retires; Riya and Sahil take over his share **equally**.',
      v: vWE2,
      n: `Tenzin's share is two ninths. Riya and Sahil each take half of it, which is one ninth each. Riya's new share is four ninths plus one ninth, five ninths. Sahil's is three ninths plus one ninth, four ninths. So the new ratio is ${ratioWords(RST.newRatio)}, while the gaining ratio is ${ratioWords(RST.gainRatio)}, because they acquired equal portions.`,
    }),
    sl('check', 'Quick check: is the gaining ratio always the old ratio?', {
      b: 'Think back to worked example 1, part (b).',
      chk: 'tf_gain_old',
      n: 'Compare the old ratio five to three with the gaining ratio when three to two was agreed.',
    }),
    sl('concept', 'Goodwill on retirement or death (AS 26)', {
      v: vGwFlow,
      bl: ['No Goodwill Account is raised: only **purchased goodwill** may be recorded.', 'Gaining partners **Dr**, outgoing partner **Cr**, in the **gaining ratio**.'],
      n: 'The outgoing partner helped build the firm’s reputation, and the continuing partners will now enjoy his share of future profits. So they must pay him for his share of goodwill. Under Accounting Standard twenty-six, self-generated goodwill cannot be shown in the books. Instead, the gaining partners’ capital accounts are debited and the outgoing partner’s capital account is credited.',
    }),
    sl('example', 'Worked example 3: goodwill at Sitara Traders', {
      b: `Goodwill of the firm is valued at **${rs(ST.goodwill)}**. Chirag's share = ${fig(ST.goodwill)} × 1/5 = **${rs(GW.total)}**. Arjun and Bela gain 1:1.`,
      v: T({ ...J_GW, alt: `Journal entry: Arjun's capital debited ${fig(GW.dr.Arjun)} and Bela's capital debited ${fig(GW.dr.Bela)}, Chirag's capital credited ${fig(GW.total)}` }),
      n: `The firm's goodwill is worth ${rupees(ST.goodwill)}. Chirag owned one fifth of it, which is ${rupees(GW.total)}. Arjun and Bela gain equally, so each is debited ${rupees(GW.dr.Arjun)}, and Chirag's capital account is credited with the full ${rupees(GW.total)}. Notice that no goodwill account appears anywhere in this entry.`,
    }),
    sl('concept', 'Goodwill already in the books', {
      v: T({ ...J_OLDGW, alt: `Journal entry writing off existing goodwill of ${fig(ST.goodwillBooks)}: Arjun ${fig(OLDGW.Arjun)}, Bela ${fig(OLDGW.Bela)} and Chirag ${fig(OLDGW.Chirag)} debited` }),
      bl: ['Write it off **first**, among **all** partners in the **old ratio**.', 'Then adjust the outgoing share at the **current** value.'],
      n: `Sitara Traders already shows goodwill of ${rupees(ST.goodwillBooks)} in its books. This old figure belongs to all three partners, so it is written off in the old ratio of five to three to two, including Chirag. Only after that do we make the fresh goodwill adjustment at today's value. Doing both steps avoids counting goodwill twice.`,
    }),
    sl('check', 'Quick check: old goodwill', {
      b: 'Who bears the write-off, and in which ratio?',
      chk: 'm_existing_gw',
      n: 'The old goodwill was built by the old firm. Which partners, and which ratio?',
    }),
    sl('concept', 'The Revaluation Account', {
      v: vRevFormat,
      n: 'Assets and liabilities are revalued so that the outgoing partner gets his fair share of any gain or bears his share of any loss. Losses go on the debit side and gains on the credit side of the Revaluation Account. The balance is a profit or loss that belongs to all the partners, including the outgoing one, in the old ratio.',
    }),
    sl('example', 'Worked example 4: revaluation at Sitara Traders', {
      b: `Building up ${rs(ST.buildingUp)}; stock down ${rs(ST.stockDown)}; provision for doubtful debts 5% on debtors of ${rs(ST.debtors)}; an unrecorded repair bill of ${rs(ST.repairs)}.`,
      v: T({ ...RV, alt: `Revaluation Account of Sitara Traders: losses of stock ${fig(ST.stockDown)}, provision ${fig(PDD)} and repair bill ${fig(ST.repairs)} on the debit side; building gain ${fig(ST.buildingUp)} on the credit side; profit ${fig(RV.result)} shared ${fig(RV.part.Arjun)}, ${fig(RV.part.Bela)} and ${fig(RV.part.Chirag)}`, caption: `Profit on revaluation ${rs(RV.result)}.` }),
      n: `The building gains ${rupees(ST.buildingUp)}, a credit. Stock falls by ${rupees(ST.stockDown)}, a five per cent provision on debtors costs ${rupees(PDD)}, and the unrecorded repair bill adds ${rupees(ST.repairs)}; all three are debits. The net profit is ${rupees(RV.result)}, shared five to three to two: ${rupees(RV.part.Arjun)}, ${rupees(RV.part.Bela)} and ${rupees(RV.part.Chirag)}.`,
    }),
    sl('check', 'Quick check: debit or credit?', {
      b: 'Fill in both blanks.',
      chk: 'fb_reval',
      n: 'Ask yourself whether each change is a gain or a loss for the old partners.',
    }),
    sl('concept', 'Reserves and accumulated profits', {
      v: vReserves,
      n: 'Reserves and undistributed profits were earned while the outgoing partner was a member, so they are shared by all the partners in the old ratio. An accumulated loss is shared the same way. Two reserves need care: the workmen compensation reserve must first cover the expected claim, and the investment fluctuation reserve must first absorb any fall in the value of investments.',
    }),
    sl('example', 'Worked example 5: reserves at Sitara Traders', {
      b: `General Reserve ${rs(ST.gr)}; Workmen Compensation Reserve ${rs(ST.wcr)} with an expected claim of ${rs(ST.claim)}.`,
      v: T({ ...J_RES, alt: `Journal entries: general reserve of ${fig(ST.gr)} credited to Arjun, Bela and Chirag in the old ratio; workmen compensation reserve of ${fig(ST.wcr)} debited, claim of ${fig(ST.claim)} provided and the surplus of ${fig(ST.wcr - ST.claim)} credited to the partners` }),
      n: `The general reserve of ${rupees(ST.gr)} is credited to all three partners, five to three to two. From the workmen compensation reserve of ${rupees(ST.wcr)}, the expected claim of ${rupees(ST.claim)} becomes a liability, and only the surplus of ${rupees(ST.wcr - ST.claim)} is shared among the partners.`,
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up: gain equals new share minus old share. The outgoing partner’s goodwill is paid for by the gaining partners in the gaining ratio, and no goodwill account is raised. Old goodwill, revaluation results, reserves and accumulated profits or losses all belong to the old firm, so they are shared by every partner, including the outgoing one, in the old ratio.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Always show the **gaining ratio working** (new − old) before the goodwill entry.',
        'If a continuing partner’s share **falls**, credit him too: he sacrifices.',
        'Write off **existing goodwill** in the **old ratio** before the fresh adjustment.',
        'Revaluation, reserves and accumulated losses: **all partners, old ratio**.',
        'Workmen compensation reserve: **claim first**, surplus to partners; an excess claim is a revaluation loss.',
      ],
      n: 'Some advice for the board exam. Show the gaining ratio working, because examiners give marks for it. Watch for a continuing partner whose share goes down; he must be credited for goodwill. Never use the new ratio for revaluation or reserves. And for the workmen compensation reserve, always deal with the claim first.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Retirement and Death of a Partner — Part 2: Settlement, Loan, Balance Sheet and Death',
  goals: [
    'Prepare the capital accounts and find the amount due to the outgoing partner',
    'Prepare the retiring partner’s loan account and the balance sheet of the reconstituted firm',
    'Adjust continuing partners’ capitals to the new ratio',
    'Calculate a deceased partner’s profit till death and prepare the executor’s account',
  ],
  slides: [
    sl('title', 'Settling the account of an outgoing partner', {
      b: 'Part 2 — the **amount due**, **payment and loan**, the **new balance sheet**, **capital adjustment**, and the **death** of a partner.',
      v: vRoute2,
      n: 'In part one we made every adjustment. Now we bring them together. We find how much the firm owes the outgoing partner, decide how he is paid, prepare his loan account and the new balance sheet, and adjust the capitals of the partners who remain. Finally we deal with the death of a partner, which adds one more calculation and an executor’s account.',
    }),
    sl('concept', 'The amount due to the outgoing partner', {
      v: vDue,
      n: 'Everything the firm owes the outgoing partner is collected in his capital account. On the credit side go his capital, his share of goodwill, revaluation profit and reserves. On the debit side go his drawings and his share of losses. The balance of the account, after all the adjustments, is the amount due to him.',
    }),
    sl('example', 'Worked example 6: capital accounts at Sitara Traders', {
      b: `Using worked examples 3 to 5: Chirag is paid **${rs(ST.paidNow)}** by bank and the rest is left as a **loan**.`,
      v: vCA,
      n: `Chirag's account starts with ${rupees(ST.cap.Chirag)}. Add revaluation profit, reserves and his goodwill of ${rupees(GW.total)} from Arjun and Bela, and subtract his share of the old goodwill written off. The amount due is ${rupees(CA.balance.Chirag)}. He takes ${rupees(ST.paidNow)} now, and ${rupees(LOAN)} is transferred to his loan account. Arjun and Bela carry down their new balances.`,
    }),
    sl('concept', 'How the outgoing partner is paid', {
      v: vPay,
      bl: ['If the firm and the partner agree nothing about interest, **Section 37** of the Indian Partnership Act 1932 gives him, at his option, **interest at 6% per annum** or the share of profit earned with his money.'],
      n: 'The firm may pay the whole amount at once, or keep it as a loan and repay it in instalments with interest. The loan is a liability of the firm. If nothing has been agreed, the Partnership Act lets the outgoing partner choose between interest at six per cent a year and the share of profit earned with his money.',
    }),
    sl('check', 'Quick check: match the entries', {
      b: 'Match each event with its journal entry.',
      chk: 'mt_settle',
      n: 'Look at which account is being closed, which is being reduced, and which one grows.',
    }),
    sl('example', 'Worked example 7: Chirag’s loan account', {
      b: `${rs(LOAN)} is repaid in **two equal yearly instalments** on 31 March 2027 and 2028, with interest at **10% per annum** on the unpaid balance.`,
      v: vLoan,
      n: `Each instalment of principal is ${rupees(LN.sched[0].inst)}. In the first year interest is ten per cent of ${rupees(LOAN)}, that is ${rupees(LN.sched[0].interest)}, so the firm pays ${rupees(LN.sched[0].pay)}. In the second year interest is only on the remaining ${rupees(LN.sched[1].opening)}, so the payment is ${rupees(LN.sched[1].pay)}, and the loan is closed.`,
    }),
    sl('example', 'Worked example 8: the new balance sheet', {
      b: 'Balance sheet of Arjun and Bela as at 31 March 2026, after Chirag’s retirement.',
      v: vBS1,
      bl: ['Assets at **revalued** figures; new liabilities (repair bill, claim) included.', "Reserves are gone (distributed); Chirag's loan appears as a **liability**."],
      n: `Now redraw the balance sheet. Assets appear at their revalued figures, and debtors are shown net of the new provision. The repair bill and the workmen's claim are new liabilities. The reserves have disappeared because they went into the capitals. Chirag's loan of ${rupees(LOAN)} is a liability. Both sides total ${rupees(BS1.total)}.`,
    }),
    sl('check', 'Quick check: interest on a loan', {
      b: 'Interest is on the balance **outstanding** in that year.',
      chk: 'n_loan_interest',
      n: 'First find how much of the loan is still unpaid at the start of the second year.',
    }),
    sl('concept', 'Adjusting the continuing partners’ capitals', {
      v: vCapAdjFlow,
      n: 'Sometimes the continuing partners agree to keep their capitals in their new profit-sharing ratio. Multiply the total capital of the new firm by each partner’s new share to get the required capital. A partner who has less brings in cash; a partner who has more withdraws it. Instead of cash, the difference can also go to current accounts.',
    }),
    sl('example', 'Worked example 9: capital adjustment at Sitara Traders', {
      b: `Arjun and Bela fix the total capital at **${rs(NEWCAP)}** in their new ratio **3:2**.`,
      v: T({ ...vCapAdj.spec, alt: vCapAdj.alt }),
      n: `Three fifths of ${rupees(NEWCAP)} is ${rupees(NEED.Arjun)}, and two fifths is ${rupees(NEED.Bela)}. Arjun has only ${rupees(CA.balance.Arjun)}, so he brings in ${rupees(ADJ.Arjun)}. Bela has ${rupees(CA.balance.Bela)}, which is ${rupees(-ADJ.Bela)} more than needed, so she withdraws it.`,
    }),
    sl('concept', 'Death of a partner: what is different', {
      v: vDeathFlow,
      n: 'When a partner dies, every adjustment you have learnt still applies. Two things change. Death can happen on any day, so his share of profit from the beginning of the year to the date of death must be calculated. And the amount due is paid not to him but to his executor, through an account called the executor’s account.',
    }),
    sl('concept', 'Profit till the date of death', {
      b: `An imagined firm in Mysuru, **Kaveri Handlooms**: Meera, Nakul and Kabir share 2:2:1; books close on 31 March. Kabir dies on **30 June 2026**. Last year: profit ${rs(KV.lastProfit)} on sales of ${rs(KV.sales)}; profits of the last three years ${KV.profits.map(rs).join(', ')}; sales from 1 April to 30 June ${rs(KV.salesTill)}.`,
      v: vBases,
      bl: ['**Time basis:** last year’s (or average) profit × months ÷ 12 × his share.', '**Turnover basis:** last year’s rate of profit on sales × sales till death × his share.'],
      n: `Kabir, of the imagined Kaveri Handlooms, dies on thirtieth June, three months into the year. On last year's profit his share is ${rupees(K_time)}. On the average profit of three years it is ${rupees(K_avgS)}. On the sales basis, applying last year's profit rate to sales up to his death, it is ${rupees(K_turn)}. The partnership deed says which basis to use.`,
    }),
    sl('example', 'Worked example 10: Profit and Loss Suspense', {
      b: 'The profit of the current year is not known yet, so the debit is **parked** in a suspense account.',
      v: T({ ...J_SUSP, alt: `Journal entry: Profit and Loss Suspense debited and Kabir's capital credited with ${fig(K_turn)}` }),
      bl: ['If a balance sheet is drawn up on the date of death, the suspense balance appears on the **assets** side.'],
      n: `Kabir's share of ${rupees(K_turn)} is credited to his capital account. The year's profit is not yet known, so the debit goes to Profit and Loss Suspense Account. When the year closes and profits are divided, this suspense balance is cleared. If a balance sheet is prepared on the date of death, it is shown on the assets side.`,
    }),
    sl('check', 'Quick check: the suspense entry', {
      b: 'Which account is debited, and which is credited?',
      chk: 'm_pl_susp',
      n: 'The deceased partner is owed the profit. Which account records that the profit is not yet known?',
    }),
    sl('example', 'Worked example 11: Kabir’s capital account', {
      b: `Kabir's capital ${rs(KV.capital)}; General Reserve ${rs(KV.gr)}; goodwill of the firm ${rs(KV.goodwill)} (Meera and Nakul continue 1:1); drawings ${rs(KV.drawings)}; profit till death on the sales basis.`,
      v: vKCA,
      n: `Add Kabir's capital, his fifth of the reserve, ${rupees(KGW.total)} for goodwill from Meera and Nakul, and ${rupees(K_turn)} of profit till death. Subtract his drawings of ${rupees(KV.drawings)}. The amount due is ${rupees(KDUE)}, and it is transferred to Kabir's executor's account.`,
    }),
    sl('concept', 'The executor’s account', {
      v: vKEX,
      bl: [`The executor is paid ${rs(KV.paid)} at once; ${rs(KDUE - KV.paid)} is transferred to the executor’s loan account.`],
      n: `The executor's account is credited with the amount due, ${rupees(KDUE)}. It is debited with every payment. Here the executor receives ${rupees(KV.paid)} at once, and the remaining ${rupees(KDUE - KV.paid)} becomes a loan, repaid later with interest, just like a retiring partner's loan.`,
    }),
    sl('check', 'Quick check: where does the balance go?', {
      b: 'Complete the sentence.',
      chk: 'fb_executor',
      n: 'Who receives the money owed to a partner who has died?',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up: the balance of the outgoing capital account is the amount due. It is paid at once or kept as a loan, which is a liability carrying interest. The new balance sheet shows revalued figures. Capitals can be brought into the new ratio. On death, profit till death goes through Profit and Loss Suspense, and the balance goes to the executor.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Prepare the **Revaluation Account first**; its result feeds the capital accounts.',
        'In loan accounts, interest is on the **opening balance** of each year; show the date of every entry.',
        'Check that your new balance sheet **totals on both sides**; a mismatch usually means a missed adjustment.',
        'For profit till death, count the **months** from the start of the year carefully.',
        'Close the deceased partner’s capital account to the **Executor’s Account**, not to Bank.',
      ],
      n: 'Some final advice. Always prepare the Revaluation Account before the capital accounts. In loan accounts, charge interest on the balance at the start of each year and write the dates. If your balance sheet does not tally, look for a missed adjustment. And when a partner dies, count the months to the date of death carefully.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Retirement and Death of a Partner — Notes',
  sections: [
    {
      h: '1. Retirement and death: what changes',
      t: 1,
      b: 'A partner may **retire** (by notice, by agreement or under the deed) or **die**. The old partnership ends but the firm continues with the remaining partners. Because the outgoing partner was entitled to a share of profits, goodwill, revaluation results and reserves, the accounts must settle his claim.\n\n**Adjustments, in order:**\n1. New profit-sharing ratio and gaining ratio.\n2. Goodwill (AS 26).\n3. Revaluation of assets and reassessment of liabilities.\n4. Reserves and accumulated profits or losses.\n5. Amount due, and its payment (cash, loan, instalments).\n6. Balance sheet of the reconstituted firm; capital adjustment if agreed.\n\nOn **death**, add the share of profit **till the date of death** and pay the amount to the **executor**.',
      terms: [
        ['Retiring partner', 'A partner who leaves the firm while the others continue the business.'],
        ['Reconstitution', 'A change in the agreement among partners, such as on retirement or death, while the firm continues.'],
        ['Executor', "The legal representative who receives the amount due to a deceased partner."],
      ],
      v: vSteps,
      vs: [vRetDeath],
    },
    {
      h: '2. New ratio and gaining ratio',
      t: 1,
      b: '**Gain of a continuing partner = new share − old share.** The gains add up to the outgoing partner’s share.\n\n- **Nothing agreed:** continuing partners keep their old ratio between themselves; gaining ratio = their old ratio.\n- **New ratio agreed:** compute each gain separately; it may differ from the old ratio, and one partner may even **sacrifice**.\n- **Outgoing share acquired in a stated proportion:** new share = old share + portion acquired; gaining ratio = the proportion of acquisition.\n\nThe gaining ratio is used for **goodwill** only. Revaluation and reserves always use the **old ratio**.',
      terms: [
        ['Gaining ratio', 'The ratio in which continuing partners acquire the outgoing partner’s share: new share minus old share.'],
        ['New profit-sharing ratio', 'The ratio in which the continuing partners will share future profits.'],
      ],
      v: vWE1,
      vs: [vCases, vBars],
    },
    {
      h: '3. Goodwill on retirement or death (AS 26)',
      t: 2,
      b: 'Accounting Standard 26 allows only **purchased goodwill** to be recorded, so no Goodwill Account is raised at its full value. Instead:\n\n- Outgoing partner’s share of goodwill = value of the firm’s goodwill × his old share.\n- **Gaining partners’ Capital A/cs Dr** (in the gaining ratio), **To Outgoing Partner’s Capital A/c**.\n- A continuing partner whose share **falls** is also credited for his sacrifice.\n- **Existing goodwill** in the books is first **written off** among all partners in the **old ratio**: All Partners’ Capital A/cs Dr, To Goodwill A/c.\n\nThe goodwill may itself have to be valued first (average profit, super profit or capitalisation method, from Chapter 1).',
      terms: [
        ['AS 26', 'Accounting Standard on intangible assets: goodwill is recorded only when purchased for consideration.'],
        ['Goodwill adjustment', 'Debit to the gaining partners and credit to the outgoing partner for his share of goodwill.'],
      ],
      v: vGwFlow,
      vs: [T({ ...J_GW, alt: 'Journal entry for goodwill of Sitara Traders: Arjun and Bela debited, Chirag credited' }), T({ ...J_OLDGW, alt: 'Journal entry writing off existing goodwill in the old ratio' })],
    },
    {
      h: '4. Revaluation, reserves and accumulated profits',
      t: 2,
      b: '**Revaluation Account:** debit decreases in assets, increases in liabilities, unrecorded liabilities and new provisions; credit increases in assets, decreases in liabilities and unrecorded assets. The balance is a profit (or loss) transferred to **all partners in the old ratio**.\n\n**Reserves and accumulated profits** (General Reserve, credit balance of Profit and Loss, Contingency Reserve) are credited to all partners in the old ratio; an **accumulated loss** is debited the same way.\n\n- **Workmen Compensation Reserve:** the claim is met first; the surplus goes to partners; an excess claim is debited to the Revaluation Account.\n- **Investment Fluctuation Reserve:** the fall in the market value of investments is met first; the balance goes to partners.',
      terms: [
        ['Revaluation Account', 'Nominal account recording gains and losses on revaluing assets and liabilities on reconstitution.'],
        ['Accumulated profits', 'Past profits kept in the business, such as reserves and a credit balance of profit and loss.'],
      ],
      v: vRevFormat,
      vs: [vReserves, T({ ...RV, alt: 'Revaluation Account of Sitara Traders with a profit shared 5:3:2' })],
    },
    {
      h: '5. Settling the outgoing partner: capital and loan accounts',
      t: 3,
      b: '**Amount due** = balance of his capital account after all adjustments (capital, goodwill, revaluation, reserves, interest or salary due, profit till death; less drawings and losses).\n\n**Settlement:**\n- Paid at once: Capital A/c Dr, To Bank A/c.\n- Kept in the firm: Capital A/c Dr, To **Loan A/c** (a liability).\n- Interest each year: Interest A/c Dr, To Loan A/c.\n- Each instalment: Loan A/c Dr, To Bank A/c.\n\nWithout an agreement, **Section 37** of the Indian Partnership Act 1932 lets him choose interest at **6% per annum** or the share of profit earned with his money.',
      terms: [
        ['Amount due', 'The credit balance of the outgoing partner’s capital account after all adjustments.'],
        ["Retiring partner's loan", 'The unpaid amount due, shown as a liability and repaid with interest.'],
      ],
      v: vCA,
      vs: [vPay, vLoan],
    },
    {
      h: '6. The new balance sheet and capital adjustment',
      t: 3,
      b: '**Balance sheet of the reconstituted firm:** assets and liabilities at revalued figures; unrecorded items brought in; reserves removed (distributed); the outgoing partner’s loan (if any) on the liabilities side; the continuing partners’ adjusted capitals.\n\n**Capital adjustment (if agreed):**\n1. Required capital = total capital of the new firm × new share.\n2. Compare with the adjusted capital.\n3. Deficit: Bank A/c Dr, To Partner’s Capital A/c. Surplus: Partner’s Capital A/c Dr, To Bank A/c (or to his Current A/c).\n\nThe total capital may be stated, or taken as the combined adjusted capitals of the continuing partners.',
      terms: [
        ['Reconstituted firm', 'The firm as it continues after the change in partners.'],
        ['Capital adjustment', 'Making continuing partners’ capitals proportionate to their new profit-sharing ratio.'],
      ],
      v: vBS1,
      vs: [T({ ...vCapAdj.spec, alt: vCapAdj.alt }), vCapAdjFlow],
    },
    {
      h: '7. Death: profit till the date of death and the executor’s account',
      t: 4,
      b: '**Share of profit till the date of death**\n- **Time basis:** last year’s profit (or the average of some years) × months from the start of the year to death ÷ 12 × his share.\n- **Turnover (sales) basis:** rate of profit = last year’s profit ÷ last year’s sales; profit till death = rate × sales up to death; × his share.\n\n**Entry:** Profit and Loss Suspense A/c Dr, To Deceased Partner’s Capital A/c. (If a balance sheet is prepared on the date of death, the suspense balance is shown on the assets side.)\n\n**Executor’s Account:** Deceased Partner’s Capital A/c Dr, To Executor’s A/c (amount due). The executor is paid at once or the balance is transferred to the Executor’s Loan A/c and paid with interest.',
      terms: [
        ['Profit and Loss Suspense Account', 'Account debited with a deceased partner’s share of profit till death until the year’s profit is known.'],
        ["Executor's Account", 'Account showing the amount due to a deceased partner’s legal representative and its payment.'],
      ],
      v: vBases,
      vs: [vKCA, vKEX],
    },
  ],
  tips: '**Common mistakes**\n- Using the **old ratio** for goodwill when a new ratio is agreed: always compute **new − old**.\n- Forgetting to credit a continuing partner whose share **falls**.\n- Using the **new ratio** for revaluation, reserves or old goodwill (always the **old ratio**).\n- Distributing the whole Workmen Compensation Reserve without providing for the **claim**.\n- Charging loan interest on the original amount instead of the **opening balance** of each year.\n- Crediting profit till death to the executor directly instead of to the **capital account**.\n\n**How marks are usually awarded**\n- 1 mark: correct option, ratio or entry.\n- 3 marks: ratio working (1) + entries or account (2), or a profit-till-death calculation with its entry.\n- 4 marks: a Revaluation Account, a loan account over the years, or a set of entries, with step marks.\n- 6 marks: Revaluation Account + capital accounts + balance sheet (about 2 marks each), or capital and executor’s accounts.\n\n**Figures in SOYL practice** are imagined; your board paper will give its own.',
});

// ---------------------------------------------------------------- flashcards
const FC = cards([
  ['**Gain** of a continuing partner', '**New share − old share.**', 'fact', 1],
  ['Gaining ratio when nothing is agreed', 'The continuing partners’ **old ratio**.', 'concept', 1],
  ['Gains of all continuing partners add up to…', 'The **outgoing partner’s share**.', 'fact', 1],
  ['Sacrificing vs gaining ratio', 'Sacrifice = old − new (admission); gain = new − old (retirement, death).', 'concept', 1],
  ['Outgoing share bought in a stated proportion', 'New share = old share + portion acquired; gaining ratio = that proportion.', 'concept', 1],
  ['Where is the gaining ratio used?', 'Only for adjusting the outgoing partner’s **goodwill**.', 'exam-tip', 1],
  ['Goodwill entry on retirement', '**Gaining partners’ Capital A/cs Dr**, To **Retiring Partner’s Capital A/c**.', 'fact', 2],
  ['Why no Goodwill Account?', '**AS 26**: only purchased goodwill may be recorded.', 'concept', 2],
  ['Continuing partner whose share falls', 'He is **credited** for goodwill, like the outgoing partner.', 'exam-tip', 2],
  ['Goodwill already in the books', 'Written off among **all partners** in the **old ratio**.', 'fact', 2],
  ['Revaluation profit on retirement', 'Shared by **all partners**, including the outgoing one, in the **old ratio**.', 'fact', 2],
  ['Unrecorded liability on revaluation', '**Debited** to the Revaluation Account (a loss).', 'fact', 2],
  ['General Reserve on retirement', 'Credited to **all partners** in the **old ratio**.', 'fact', 2],
  ['Debit balance of Profit and Loss', 'Debited to **all partners** in the **old ratio**.', 'fact', 2],
  ['Workmen Compensation Reserve with a claim', 'Claim first; **surplus** to partners; **excess claim** debited to Revaluation.', 'concept', 2],
  ['Investment Fluctuation Reserve', 'Meets the **fall in value** of investments first; the rest to partners.', 'concept', 2],
  ['**Amount due** to an outgoing partner', 'Balance of his capital account after **all adjustments**.', 'definition', 3],
  ['Amount due left in the firm', 'Capital A/c Dr, To **Loan A/c**; shown as a **liability**.', 'fact', 3],
  ['Section 37 (no agreement on interest)', 'Interest at **6% per annum** or the share of profit earned with his money, at his option.', 'fact', 3],
  ['Interest on the retiring partner’s loan', 'On the **opening balance** of each year.', 'exam-tip', 3],
  ['Required capital on capital adjustment', '**Total capital × new share**.', 'fact', 3],
  ['Adjusted capital less than required', 'The partner **brings in** the deficit: Bank A/c Dr, To Capital A/c.', 'concept', 3],
  ['New balance sheet: reserves', 'Not shown: they were **distributed** to capitals.', 'exam-tip', 3],
  ['Extra step on **death**', 'Share of **profit till the date of death**.', 'concept', 4],
  ['Time basis', 'Last year’s (or average) profit × months ÷ 12 × share.', 'fact', 4],
  ['Turnover basis', 'Sales till death × (last year profit ÷ last year sales) × share.', 'fact', 4],
  ['Entry for profit till death', '**Profit and Loss Suspense A/c Dr**, To Deceased Partner’s Capital A/c.', 'fact', 4],
  ['**Executor**', 'Legal representative who receives the amount due to a deceased partner.', 'definition', 4],
  ['Closing a deceased partner’s capital', 'Capital A/c Dr, To **Executor’s A/c**.', 'fact', 4],
  ['Seasonal business: which basis is fairer?', 'Usually the **turnover (sales) basis**, since profit is not earned evenly.', 'concept', 4],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-12-accountancy-chapter-test-short',
  title: 'Chapter test (short) — Retirement and Death of a Partner',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_default_ratio', 'm_reval_share', 'm_death_time', 'ar_as26'] },
    { id: 'B', title: 'Section B — Short answer (3 marks each)', instr: 'Show all working.', items: ['s3_ratio_take', 's3_death_basis'] },
    { id: 'C', title: 'Section C — Long answer (4 marks)', instr: 'Answer any ONE of the two questions. Show all working.', items: [{ attempt: 1, keys: ['l4_reval', 'l4_loan'] }] },
    { id: 'D', title: 'Section D — Long answer (6 marks)', instr: 'Answer any ONE of the two questions. Show all working.', items: [{ attempt: 1, keys: ['l6_retire_full', 'l6_death_full'] }] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-12-accountancy-chapter-test-long',
  title: 'Chapter test (long) — Retirement and Death of a Partner',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–8 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_new_ratio_take', 'm_gw_calc', 'm_wcr', 'm_loan_int', 'm_cap_bring', 'm_death_turnover', 'ar_reserve', 'ar_suspense'] },
    { id: 'B', title: 'Section B — Short answer (3 marks each)', instr: 'Answer all questions; question 12 has an internal choice. Show all working.', items: ['s3_ratio_portion', 's3_gw_entries', 's3_amount_due', { attempt: 1, keys: ['s3_reserves', 's3_executor'] }] },
    { id: 'C', title: 'Section C — Long answer (4 marks each)', instr: 'Answer question 13, and any ONE of questions 14 and 15.', items: ['l4_cap_adjust', { attempt: 1, keys: ['l4_death_profit', 'l4_gw_full'] }] },
    { id: 'D', title: 'Section D — Long answer (6 marks each)', instr: 'Answer question 16, and any ONE of questions 17 and 18.', items: ['l6_retire_capadj', { attempt: 1, keys: ['l6_retire_loan', 'l6_death_entries'] }] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: FC,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t04 of cbse-12-accountancy-ch04 only (new and gaining ratios; goodwill under AS 26, revaluation and reserves; settlement, loan account, balance sheet and capital adjustment; profit till death and the executor’s account)',
    originality: 'every firm, partner, scenario and figure written for this chapter (imagined firms in Indian towns); no NCERT illustration or exercise and no CBSE sample or past-paper item reused',
    accounts: `every figure computed by acc.mjs and asserted: journal entries balance, every capital, current, revaluation, loan and executor's account balances per partner, balance sheets total (Sitara Traders ${fig(BS0.total)} before and ${fig(BS1.total)} after; ${FACTS.join('; ')})`,
    facts: 'AS 26 (only purchased goodwill recorded); Section 37 of the Indian Partnership Act 1932 (6% per annum or share of profit, at the outgoing partner’s option); Profit and Loss Suspense for profit till death',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
