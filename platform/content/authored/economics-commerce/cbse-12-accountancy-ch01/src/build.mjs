// Build CBSE 12 Accountancy ch01 Accounting for Partnership: Basic Concepts. Run from platform/:
//   npx tsx content/authored/economics-commerce/cbse-12-accountancy-ch01/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';
import { nearDuplicates } from '../../../../../content-pipeline/src/originality/ngrams.ts';

setUnit('cbse-12-accountancy-ch01', 'economics-commerce');
const { BANK } = await import('./questions.mjs');
const { check, same, sum, inr, rs, rupees, interest, divide, iodEqual, avgMonths, commissionAfter, journal, partnerAccounts, appropriation, pastAdjustment, average, weightedAverage, goodwillAll } = await import('./acc.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const gcd = (a, b) => (b ? gcd(b, a % b) : a);
const ratioOf = (xs) => { const g = xs.reduce(gcd); return xs.map((x) => x / g).join(':'); };
const half = (m) => ({ 6.5: '6½', 7.5: '7½', 5.5: '5½', 4.5: '4½' })[m] ?? String(m);

// ================================================================ deck figures (computed, never typed)
// Loan from a partner, at the Act's rate.
const LOAN = { amount: 50000, int: interest(50000, 6) };
same(LOAN.int, 3000, 'loan interest');

// WE1 Tulsi Traders (Surat): fixed capitals, current accounts.
const W1 = { names: ['Ananya', 'Rohan'], ratio: { Ananya: 3, Rohan: 2 }, cap: { Ananya: 400000, Rohan: 300000 }, salary: { Rohan: 60000 }, drawings: { Ananya: 50000, Rohan: 40000 }, iod: { Ananya: 2000, Rohan: 1500 }, profit: 220000 };
const W1ioc = { Ananya: interest(W1.cap.Ananya, 10), Rohan: interest(W1.cap.Rohan, 10) };
const W1app = appropriation({ names: W1.names, ratio: W1.ratio, profit: W1.profit, iod: W1.iod, ioc: W1ioc, salary: W1.salary, shareLabel: (n) => `To ${n}'s Current A/c` });
const W1cur = partnerAccounts({
  names: W1.names,
  dr: [['To Drawings A/c', W1.drawings], ['To Interest on Drawings A/c', W1.iod]],
  cr: [['By Interest on Capital A/c', W1ioc], ['By Salary A/c', W1.salary], ['By P&L Appropriation A/c', W1app.shares]],
});
const W1fluct = Object.fromEntries(W1.names.map((n) => [n, W1.cap[n] + W1cur.balances[n]]));
const W1iodT = sum(Object.values(W1.iod));
const W1iocT = sum(Object.values(W1ioc));
same(W1app.divisible, 93500, 'W1 divisible'); same(W1cur.balances.Ananya, 44100, 'W1 Ananya'); same(W1cur.balances.Rohan, 85900, 'W1 Rohan'); same(W1fluct.Ananya, 444100, 'W1 fluct');

// WE2 Neelgiri Tea House (Ooty): interest on capital with an addition; profit insufficient; or a charge.
const W2 = { names: ['Ishaan', 'Farah'], ratio: { Ishaan: 3, Farah: 2 }, cap: { Ishaan: 300000, Farah: 200000 }, addl: 60000, rate: 8, profit: 31800 };
const W2ioc = { Ishaan: interest(W2.cap.Ishaan, W2.rate) + interest(W2.addl, W2.rate, 6), Farah: interest(W2.cap.Farah, W2.rate) };
const W2tot = sum(Object.values(W2ioc));
check(W2tot > W2.profit, 'W2 profit must be insufficient');
const W2a = divide(W2.profit, W2ioc, 'W2 appropriation');
const W2loss = W2tot - W2.profit;
const W2b = divide(W2loss, W2.ratio, 'W2 charge loss');
same(W2ioc.Ishaan, 26400, 'W2 Ishaan interest'); same(W2a.Ishaan, 19800, 'W2 Ishaan share'); same(W2b.Ishaan, 6360, 'W2 Ishaan loss');

// WE3 interest on drawings: five timings of the same ₹60,000 at 6%.
const W3 = [
  [`${rs(5000)} at the beginning of every month`, iodEqual({ amount: 5000, n: 12, when: 'begin', rate: 6 })],
  [`${rs(5000)} in the middle of every month`, iodEqual({ amount: 5000, n: 12, when: 'mid', rate: 6 })],
  [`${rs(5000)} at the end of every month`, iodEqual({ amount: 5000, n: 12, when: 'end', rate: 6 })],
  [`${rs(15000)} at the beginning of every quarter`, iodEqual({ amount: 15000, n: 4, when: 'begin', rate: 6 })],
  [`${rs(15000)} at the end of every quarter`, iodEqual({ amount: 15000, n: 4, when: 'end', rate: 6 })],
];
for (const [, r] of W3) same(r.total, 60000, 'W3 total drawings');
same(W3[0][1].interest, 1950, 'W3 begin'); same(W3[2][1].interest, 1650, 'W3 end'); same(W3[3][1].interest, 2250, 'W3 quarter begin');

// WE4 Saraswati Prints (Varanasi): a full appropriation account.
const W4 = { names: ['Vikram', 'Leela', 'Yusuf'], ratio: { Vikram: 3, Leela: 2, Yusuf: 2 }, cap: { Vikram: 500000, Leela: 300000, Yusuf: 200000 }, profit: 330000, salary: { Yusuf: 36000 }, reserve: 20000, iod: { Vikram: 3000, Leela: 2000 } };
const W4comm = { Leela: commissionAfter(W4.profit, 10) };
const W4ioc = Object.fromEntries(W4.names.map((n) => [n, interest(W4.cap[n], 6)]));
const W4app = appropriation({ names: W4.names, ratio: W4.ratio, profit: W4.profit, iod: W4.iod, ioc: W4ioc, salary: W4.salary, commission: W4comm, reserve: W4.reserve });
same(W4comm.Leela, 30000, 'W4 commission'); same(W4app.divisible, 189000, 'W4 divisible'); same(W4app.shares.Vikram, 81000, 'W4 Vikram');

// WE5/WE6 Konark Tiles (Puri): guarantee to Pranav by the firm, then by Dev alone; guarantee to the firm by Esha.
const G = { names: ['Dev', 'Esha', 'Pranav'], ratio: { Dev: 2, Esha: 2, Pranav: 1 }, profit: 240000, min: 60000 };
const Gsh = divide(G.profit, G.ratio, 'WE5 shares');
const Gdef = G.min - Gsh.Pranav;
const Gfirm = divide(Gdef, { Dev: 2, Esha: 2 }, 'WE5 deficiency');
const G5 = { Dev: Gsh.Dev - Gfirm.Dev, Esha: Gsh.Esha - Gfirm.Esha, Pranav: G.min };
const G6 = { Dev: Gsh.Dev - Gdef, Esha: Gsh.Esha, Pranav: G.min };
for (const g of [G5, G6]) same(sum(Object.values(g)), G.profit, 'guarantee keeps total profit');
same(Gdef, 12000, 'WE5 deficiency'); same(G5.Dev, 90000, 'WE5 Dev'); same(G6.Dev, 84000, 'WE6 Dev');
const GT = { min: 270000 };
const GTshort = GT.min - G.profit;
const GTsh = divide(GT.min, G.ratio, 'guarantee to firm');
same(GTshort, 30000, 'guarantee to firm shortfall'); same(GTsh.Esha - GTshort, 78000, 'Esha net');
// The entry quoted on the WE6 slide, checked to balance.
journal([{ dr: [["Dev's Capital A/c", Gdef]], cr: [["Pranav's Capital A/c", Gdef]], note: "Being Pranav's deficiency borne by Dev" }]);

// WE7 Godavari Traders (Nashik): past adjustment.
const W7 = { names: ['Nisha', 'Tarun', 'Zoya'], ratio: { Nisha: 2, Tarun: 2, Zoya: 1 }, cap: { Nisha: 300000, Tarun: 200000, Zoya: 100000 }, drawings: { Nisha: 40000, Tarun: 30000, Zoya: 20000 } };
const W7ioc = Object.fromEntries(W7.names.map((n) => [n, interest(W7.cap[n], 10)]));
const W7iod = Object.fromEntries(W7.names.map((n) => [n, interest(W7.drawings[n], 5, 6)]));
const W7net = sum(Object.values(W7ioc)) - sum(Object.values(W7iod));
const W7rev = divide(W7net, W7.ratio, 'WE7 reversal');
const W7adj = pastAdjustment({
  names: W7.names, acct: 'Current', note: 'Being interest on capital and on drawings omitted, now adjusted',
  lines: [
    ['Interest on capital at 10% (credit)', W7ioc],
    ['Interest on drawings at 5% for 6 months (debit)', Object.fromEntries(W7.names.map((n) => [n, -W7iod[n]]))],
    [`Net ${inr(W7net)} taken back from profit in 2:2:1 (debit)`, Object.fromEntries(W7.names.map((n) => [n, -W7rev[n]]))],
  ],
});
same(W7net, 57750, 'WE7 net omission'); same(W7adj.net.Nisha, 5900, 'WE7 Nisha'); same(W7adj.net.Tarun, -3850, 'WE7 Tarun'); same(W7adj.net.Zoya, -2050, 'WE7 Zoya');

// WE8–WE10 Malabar Boatworks (Kozhikode): goodwill by every method from one set of figures.
const W8 = { years: ['2022-23', '2023-24', '2024-25', '2025-26'], profits: [160000, 190000, 140000, 210000], abnormal: { index: 2, loss: 30000 }, buy: 3 };
const W8norm = W8.profits.map((p, i) => (i === W8.abnormal.index ? p + W8.abnormal.loss : p));
const W8avg = average(W8norm);
const W8w = weightedAverage(W8norm.map((p, i) => [p, i + 1]));
const W8gwAvg = W8avg * W8.buy;
const W8gwW = W8w.value * W8.buy;
same(W8avg, 182500, 'WE8 average'); same(W8w.value, 189000, 'WE8 weighted'); same(W8gwAvg, 547500, 'WE8 goodwill'); same(W8gwW, 567000, 'WE8 weighted goodwill');
const CE = { assets: 1350000, liabilities: 350000, nrr: 12.5 };
const CEv = CE.assets - CE.liabilities;
const GW = goodwillAll({ avg: W8avg, capitalEmployed: CEv, nrr: CE.nrr, years: W8.buy });
same(CEv, 1000000, 'WE9 capital employed'); same(GW.normal, 125000, 'WE9 normal'); same(GW.superProfit, 57500, 'WE9 super'); same(GW.bySuper, 172500, 'WE9 goodwill'); same(GW.capValue, 1460000, 'WE10 capitalised'); same(GW.byCapAvg, 460000, 'WE10 goodwill');

// ================================================================ visuals: Part 1
const vRoute1 = flow('LR', ['Nature of partnership', 'Deed and the Act', 'Capital accounts', 'Appropriation of profit'], 'Route map of Part 1: the nature of partnership, the deed and the rules of the Act, partners\' capital accounts, and the appropriation of profit', 'Part 1 at a glance');
const vFeatures = table(
  ['Feature', 'What it means', 'Example (imagined dairy in Karnal)'],
  [
    ['Two or more persons', 'At least 2 and at most 50 partners', 'Amrit and Baljit run the dairy together'],
    ['Agreement', 'Oral or written; the written form is the deed', 'They sign a deed on 1 April 2025'],
    ['Business', 'A lawful business carried on for profit', 'Collecting, chilling and selling milk'],
    ['Sharing of profit', 'Profit or loss shared in an agreed ratio', 'They agree to share 3:2'],
    ['Mutual agency', 'Each partner is an agent and a principal', 'Baljit\'s order for milk cans binds Amrit too'],
    ['Unlimited liability', 'Partners\' private assets can pay the firm\'s debts', 'A creditor can claim from Amrit\'s own savings'],
  ],
  'Table of the six features of partnership with an imagined dairy as the example: two or more persons, an agreement, a business, sharing of profit, mutual agency and unlimited liability',
);
const vDeed = table(
  ['Clause in the deed', 'Why it matters'],
  [
    ['Names of firm and partners, nature and duration of business', 'Who the partners are and what the firm does'],
    ['Capital contributed by each partner', 'Basis of interest on capital'],
    ['Profit-sharing ratio', 'How profit or loss is divided'],
    ['Interest on capital, on drawings and on partners\' loans', 'Rates the accountant must apply'],
    ['Salary or commission to partners', 'Reward for partners who work in the firm'],
    ['Admission, retirement, death, goodwill, disputes, dissolution', 'Rules for later changes'],
  ],
  'Table of the main clauses of a partnership deed and why each matters: names and business, capitals, profit-sharing ratio, interest rates, salaries and commission, and rules for later changes',
);
const vAct = table(
  ['Matter', 'Rule of the Act when the deed is silent'],
  [
    ['Sharing of profits and losses', 'Equally'],
    ['Interest on capital', 'Not allowed'],
    ['Interest on drawings', 'Not charged'],
    ['Salary or commission to a partner', 'Not allowed'],
    ['Interest on a partner\'s loan to the firm', `6% per annum, as a charge (a loan of ${rs(LOAN.amount)} earns ${rs(LOAN.int)} a year)`],
  ],
  `Table of the rules of the Indian Partnership Act 1932 when the deed is silent: equal sharing, no interest on capital, no interest on drawings, no salary or commission, and interest at 6 per cent a year on a partner's loan, so a loan of ${inr(LOAN.amount)} rupees earns ${inr(LOAN.int)} rupees`,
  'These rules apply only where the deed says nothing.',
);
const vFixFluct = table(
  ['Basis', 'Fixed capital method', 'Fluctuating capital method'],
  [
    ['Accounts per partner', 'Two: capital and current', 'One: capital'],
    ['Capital balance', 'Same unless capital is added or permanently withdrawn', 'Changes every year'],
    ['Interest, salary, commission, profit, drawings', 'Current account', 'Capital account'],
    ['Debit balance', 'Possible in the current account only', 'Possible in rare cases'],
  ],
  'Table comparing the fixed capital method, with separate capital and current accounts, and the fluctuating capital method, with one capital account that records every adjustment',
);
const vWhere = table(
  ['Item', 'Side', 'Fixed method', 'Fluctuating method'],
  [
    ['Opening and additional capital', 'Credit', 'Capital account', 'Capital account'],
    ['Interest on capital, salary, commission, share of profit', 'Credit', 'Current account', 'Capital account'],
    ['Drawings, interest on drawings, share of loss', 'Debit', 'Current account', 'Capital account'],
    ['Capital permanently withdrawn', 'Debit', 'Capital account', 'Capital account'],
  ],
  'Table showing where each item is recorded: capital brought in is credited to the capital account; earnings such as interest, salary, commission and profit are credited, and drawings, interest on drawings and losses are debited, to the current account under the fixed method or the capital account under the fluctuating method',
);
const vWE1 = table(W1cur.headers, W1cur.rows,
  `Current accounts of Ananya and Rohan: credits of interest on capital ${inr(W1ioc.Ananya)} and ${inr(W1ioc.Rohan)}, Rohan's salary ${inr(W1.salary.Rohan)} and shares of profit ${inr(W1app.shares.Ananya)} and ${inr(W1app.shares.Rohan)}; debits of drawings and interest on drawings; closing credit balances ${inr(W1cur.balances.Ananya)} and ${inr(W1cur.balances.Rohan)} rupees`,
  `Divisible profit ${rs(W1app.divisible)} shared 3:2; capitals stay at ${rs(W1.cap.Ananya)} and ${rs(W1.cap.Rohan)}.`);
const vChargeAppro = table(
  ['Charge against profit (Profit and Loss Account)', 'Appropriation of profit (Appropriation Account)'],
  [
    ['Interest on a partner\'s loan', 'Interest on capital (unless the deed calls it a charge)'],
    ['Rent paid to a partner for the firm\'s premises', 'Salary or commission to a partner'],
    ['Salaries and commission of employees', 'Transfer to general reserve'],
    ['Allowed even in a year of loss', 'Allowed only out of profit'],
  ],
  'Two-column table: charges such as interest on a partner\'s loan, rent paid to a partner and employees\' pay go to the profit and loss account even in a loss year; appropriations such as interest on capital, partners\' salary or commission and transfers to reserve come out of profit only',
);
const vFormat = table(
  ['Dr: Particulars', 'Cr: Particulars'],
  [
    ['To Interest on Capital (each partner)', 'By Profit and Loss A/c (net profit)'],
    ['To Salary and Commission (partners)', 'By Interest on Drawings (each partner)'],
    ['To General Reserve', ''],
    ['To Partners\' Capital or Current A/cs (divisible profit in the ratio)', ''],
  ],
  'Format of the profit and loss appropriation account: on the debit side interest on capital, partners\' salary and commission, transfer to general reserve and the shares of divisible profit; on the credit side the net profit and interest on drawings',
  'Divisible profit = net profit + interest on drawings − interest on capital − salary − commission − reserve',
);
const vIocRules = table(
  ['Situation', 'Treatment of interest on capital'],
  [
    ['Deed silent about interest', 'No interest'],
    ['Deed allows interest (not as a charge); profit is enough', 'Full interest, as an appropriation'],
    ['Same, but profit is less than the interest due', 'Whole profit shared in the ratio of interest due'],
    ['Same, but the firm made a loss', 'No interest'],
    ['Deed treats interest as a charge', 'Full interest debited to the Profit and Loss Account, even if this causes a loss'],
  ],
  'Table of the treatment of interest on capital: none if the deed is silent; full interest out of adequate profit; profit shared in the interest ratio when profit is short; none in a loss; and full interest as a charge when the deed says so',
);
const vWE2 = table(
  ['Particulars', 'Ishaan (₹)', 'Farah (₹)', 'Total (₹)'],
  [
    ['Interest due at 8%', `${inr(interest(W2.cap.Ishaan, W2.rate))} + ${inr(interest(W2.addl, W2.rate, 6))} = ${inr(W2ioc.Ishaan)}`, inr(W2ioc.Farah), inr(W2tot)],
    [`(a) Appropriation: profit shared in the interest ratio ${ratioOf([W2ioc.Ishaan, W2ioc.Farah])}`, inr(W2a.Ishaan), inr(W2a.Farah), inr(W2.profit)],
    ['(b) Charge: full interest credited', inr(W2ioc.Ishaan), inr(W2ioc.Farah), inr(W2tot)],
    [`(b) Resulting loss of ${inr(W2loss)} shared 3:2`, `− ${inr(W2b.Ishaan)}`, `− ${inr(W2b.Farah)}`, `− ${inr(W2loss)}`],
  ],
  `Table of worked example 2: interest due is ${inr(W2ioc.Ishaan)} for Ishaan and ${inr(W2ioc.Farah)} for Farah; as an appropriation the profit of ${inr(W2.profit)} is shared ${inr(W2a.Ishaan)} and ${inr(W2a.Farah)}; as a charge, full interest is credited and the loss of ${inr(W2loss)} is shared ${inr(W2b.Ishaan)} and ${inr(W2b.Farah)}`,
);
const vAvgPeriod = table(
  ['Equal drawings made', 'At the beginning', 'In the middle', 'At the end'],
  [[12, 'Every month (12 times)'], [4, 'Every quarter (4 times)'], [2, 'Every half-year (2 times)']].map(([n, label]) => [label, ...['begin', 'mid', 'end'].map((w) => `${half(avgMonths(n, w))} months`)]),
  'Table of average periods for interest on drawings: monthly drawings give six and a half, six or five and a half months; quarterly drawings give seven and a half, six or four and a half months; half-yearly drawings give nine, six or three months, for drawings at the beginning, middle or end of each period',
  'Interest = total drawings × rate ÷ 100 × average period ÷ 12. If dates are not given, use 6 months.',
);
const vWE3 = table(
  ['Timing of drawings (total ₹60,000 at 6%)', 'Average period', 'Interest (₹)'],
  W3.map(([label, r]) => [label, `${half(r.months)} months`, inr(r.interest)]),
  `Table of worked example 3: the same 60,000 rupees drawn at different times gives interest of ${W3.map(([, r]) => inr(r.interest)).join(', ')} rupees for monthly drawings at the beginning, middle and end and quarterly drawings at the beginning and end`,
);
const vCommission = flow('LR', [`Net profit before commission ${rs(W4.profit)}`, `× 10 ÷ 110`, `Commission ${rs(W4comm.Leela)}`, `Check: 10% of ${rs(W4.profit - W4comm.Leela)} = ${rs(W4comm.Leela)}`],
  `Flow for commission after charging: net profit before commission of ${inr(W4.profit)} rupees times 10 divided by 110 gives a commission of ${inr(W4comm.Leela)} rupees, which is 10 per cent of the ${inr(W4.profit - W4comm.Leela)} rupees left after it`,
  'Commission after charging = profit × rate ÷ (100 + rate)');
const vWE4 = table(W4app.headers, W4app.rows,
  `Profit and loss appropriation account of Saraswati Prints: net profit ${inr(W4.profit)} and interest on drawings on the credit side; interest on capital, Yusuf's salary, Leela's commission ${inr(W4comm.Leela)}, general reserve and shares of ${inr(W4app.shares.Vikram)}, ${inr(W4app.shares.Leela)} and ${inr(W4app.shares.Yusuf)} rupees on the debit side; both sides total ${inr(W4app.total)}`,
  `Divisible profit ${rs(W4app.divisible)} shared 3:2:2.`);
const vSummary1 = table(
  ['Topic', 'Key rule'],
  [
    ['Partnership', 'Agreement to share the profit of a business run by all or any acting for all; 2 to 50 partners'],
    ['Deed silent', 'Equal profits; no interest on capital or drawings; no salary; 6% a year on partners\' loans'],
    ['Capital methods', 'Fixed: capital and current accounts. Fluctuating: one capital account'],
    ['Appropriation account', 'Net profit + interest on drawings − interest on capital − salary − commission − reserve = divisible profit'],
    ['Interest on capital', 'Appropriation: only out of profit, in the interest ratio if short. Charge: always'],
    ['Interest on drawings', 'Average period: 6½, 6, 5½ months (monthly); 7½, 6, 4½ months (quarterly)'],
    ['Commission after charging', 'Profit × rate ÷ (100 + rate)'],
  ],
  'Summary table of Part 1: the meaning of partnership, the rules when the deed is silent, the two capital methods, the appropriation account, interest on capital and drawings, and the commission formula',
);

// ================================================================ visuals: Part 2
const vRoute2 = flow('LR', ['Guarantee of profit', 'Past adjustments', 'Goodwill: nature and factors', 'Valuation of goodwill'], 'Route map of Part 2: guarantee of profit, past adjustments, the nature of goodwill and the factors affecting it, and the methods of valuing goodwill', 'Part 2 at a glance');
const vGuarFlow = flow('LR', ['Divide profit in the normal ratio', 'Compare the guaranteed partner\'s share with the minimum', 'Shortfall = deficiency', 'Deficiency borne by whoever gave the guarantee'], 'Flow for a guarantee of minimum profit: divide the profit normally, compare the guaranteed partner\'s share with the minimum, find the deficiency, and charge it to whoever gave the guarantee', 'The firm\'s total profit never changes.');
const vWE5 = table(
  ['Particulars', 'Dev (₹)', 'Esha (₹)', 'Pranav (₹)'],
  [
    ['Share of profit 2:2:1', inr(Gsh.Dev), inr(Gsh.Esha), inr(Gsh.Pranav)],
    ['Deficiency borne by Dev and Esha 2:2', `− ${inr(Gfirm.Dev)}`, `− ${inr(Gfirm.Esha)}`, `+ ${inr(Gdef)}`],
    ['**Final share**', `**${inr(G5.Dev)}**`, `**${inr(G5.Esha)}**`, `**${inr(G5.Pranav)}**`],
  ],
  `Table of worked example 1: shares of ${inr(Gsh.Dev)}, ${inr(Gsh.Esha)} and ${inr(Gsh.Pranav)} rupees; Pranav's deficiency of ${inr(Gdef)} is borne equally by Dev and Esha, giving final shares of ${inr(G5.Dev)}, ${inr(G5.Esha)} and ${inr(G5.Pranav)} rupees`,
);
const vGuarChart = (() => {
  const s = new Svg(600, 320);
  const ch = s.chart({ x0: 0, x1: 3, y0: 0, y1: 120, left: 64, top: 40, width: 480, height: 220, yLabel: '₹ thousand' });
  const series = [['Normal share', 'fill', Gsh], ['Firm guarantees', 'accent', G5], ['Dev alone guarantees', 'muted', G6]];
  G.names.forEach((n, i) => {
    series.forEach(([, fill, v], k) => {
      const x = i + 0.5 + (k - 1) * 0.26;
      const a = ch.X(x - 0.11);
      const b = ch.X(x + 0.11);
      const val = v[n] / 1000;
      s.rect(a, ch.Y(val), b - a, ch.Y(0) - ch.Y(val), { fill, color: 'accent', sw: 1.2, rx: 2 });
      s.text((a + b) / 2, ch.Y(val) - 9, String(val), { size: 11 });
    });
    ch.xTick(i + 0.5, n);
  });
  for (const v of [30, 60, 90, 120]) ch.yTick(v, String(v));
  series.forEach(([label, fill], k) => {
    s.rect(80 + k * 170, 8, 14, 14, { fill, color: 'accent', sw: 1.2, rx: 2 });
    s.text(100 + k * 170, 15, label, { anchor: 'start', size: 12 });
  });
  return s.visual(
    `Bar chart of shares in thousand rupees for Dev, Esha and Pranav: normal shares ${Gsh.Dev / 1000}, ${Gsh.Esha / 1000} and ${Gsh.Pranav / 1000}; with the firm's guarantee ${G5.Dev / 1000}, ${G5.Esha / 1000} and ${G5.Pranav / 1000}; with Dev alone guaranteeing ${G6.Dev / 1000}, ${G6.Esha / 1000} and ${G6.Pranav / 1000}`,
    'Pranav reaches the minimum either way; who pays the deficiency changes.',
  );
})();
const vGuarToFirm = table(
  ['Step (Esha guarantees the firm a profit of ₹2,70,000)', 'Amount (₹)'],
  [
    ['Actual profit', inr(G.profit)],
    ['Shortfall brought in by Esha (debited to her capital)', inr(GTshort)],
    ['Profit to be divided 2:2:1', inr(GT.min)],
    ['Shares of Dev, Esha and Pranav', G.names.map((n) => inr(GTsh[n])).join(' / ')],
    ['Esha\'s net gain after making good the shortfall', inr(GTsh.Esha - GTshort)],
  ],
  `Table of a guarantee to the firm: actual profit ${inr(G.profit)}, shortfall ${inr(GTshort)} brought in by Esha, ${inr(GT.min)} divided as ${G.names.map((n) => inr(GTsh[n])).join(', ')} rupees, leaving Esha a net gain of ${inr(GTsh.Esha - GTshort)} rupees`,
);
const vPastFlow = flow('LR', ['Omission found after accounts are closed', 'Should have been credited or debited', 'Less: actually credited or debited', 'Net effect per partner (total zero)', 'One adjustment entry'], 'Flow for a past adjustment: after the accounts are closed, list what each partner should have been credited or debited, subtract what was actually recorded, find the net effect which totals zero, and pass one adjustment entry', 'Closed accounts are never reopened.');
const vWE7 = table(W7adj.headers, W7adj.rows,
  `Past adjustment table for Nisha, Tarun and Zoya: interest on capital credited, interest on drawings debited, the net omission of ${inr(W7net)} taken back in 2:2:1; net effect Nisha credit ${inr(W7adj.net.Nisha)}, Tarun debit ${inr(-W7adj.net.Tarun)}, Zoya debit ${inr(-W7adj.net.Zoya)} rupees, totalling zero`,
  'The net effects add up to zero.');
const vWE7je = table(W7adj.entry.headers, W7adj.entry.rows,
  `Journal entry: Tarun's current account debited ${inr(-W7adj.net.Tarun)} and Zoya's current account debited ${inr(-W7adj.net.Zoya)}, Nisha's current account credited ${inr(W7adj.net.Nisha)} rupees`);
const vGwNature = table(
  ['Point', 'Explanation'],
  [
    ['Meaning', 'Value of the reputation that lets a business earn more than a normal profit'],
    ['Nature', 'An intangible asset (not fictitious); cannot be sold apart from the business'],
    ['Accounting Standard 26', 'Only purchased goodwill is recorded; self-generated goodwill never is'],
    ['When it is valued', 'Change in profit-sharing ratio, admission, retirement or death of a partner, sale of the business'],
  ],
  'Table on goodwill: its meaning as the value of reputation that earns above-normal profit, its nature as an intangible but real asset, the rule of Accounting Standard 26 that only purchased goodwill is recorded, and the occasions when it is valued',
);
const vFactors = table(
  ['Factor', 'Goodwill is higher when…'],
  [
    ['Nature of business', 'the product is in steady demand'],
    ['Location', 'the business is on a busy, convenient site'],
    ['Efficiency of management', 'costs are controlled and customers well served'],
    ['Market situation', 'competition is limited'],
    ['Special advantages', 'it holds patents, licences or long contracts'],
    ['Period in business', 'it is long established and well known'],
  ],
  'Table of factors affecting goodwill: nature of business, location, efficiency of management, market situation, special advantages such as patents and licences, and the period in business',
);
const vMethods = flow('TB', ['Average profit: average profit × years\' purchase', 'Weighted average profit: more weight to recent years', 'Super profit: (average − normal profit) × years\' purchase', 'Capitalisation: of average profit or of super profit'], 'Flow of the four methods of valuing goodwill: average profit times years of purchase, weighted average profit, super profit times years of purchase, and capitalisation of average or super profit', 'Normal profit = capital employed × normal rate ÷ 100');
const vWE8 = table(
  ['Year', 'Profit (₹)', 'Normal profit (₹)', 'Weight', 'Product (₹)'],
  [
    ...W8.years.map((y, i) => [y, inr(W8.profits[i]), i === W8.abnormal.index ? `${inr(W8norm[i])} (loss of ${inr(W8.abnormal.loss)} added back)` : inr(W8norm[i]), String(i + 1), inr(W8w.products[i])]),
    ['**Total**', '', `**${inr(sum(W8norm))}**`, `**${W8w.weights}**`, `**${inr(W8w.total)}**`],
  ],
  `Table of worked example 4: normal profits ${W8norm.map(inr).join(', ')} rupees total ${inr(sum(W8norm))}, average ${inr(W8avg)}; with weights 1 to 4 the products total ${inr(W8w.total)}, weighted average ${inr(W8w.value)} rupees`,
  `Simple average ${rs(W8avg)} → goodwill ${rs(W8gwAvg)}; weighted average ${rs(W8w.value)} → goodwill ${rs(W8gwW)} (3 years' purchase).`,
);
const vProfitsPlot = {
  kind: 'plot',
  spec: {
    x: { min: 0.4, max: 4.6, label: 'Year (1 = 2022-23 … 4 = 2025-26)' },
    y: { min: 0, max: 240, label: '₹ thousand' },
    functions: [],
    points: [],
    hlines: [{ y: W8avg / 1000, label: `Simple average ${W8avg / 1000}`, dashed: true }, { y: W8w.value / 1000, label: `Weighted average ${W8w.value / 1000}` }],
    series: [{ label: 'Normal profit', points: W8norm.map((p, i) => [i + 1, p / 1000]), kind: 'bar' }],
    grid: true,
  },
  alt: `Bar chart of normal profits of ${W8norm.map((p) => p / 1000).join(', ')} thousand rupees over four years, with a dashed line at the simple average of ${W8avg / 1000} and a solid line at the weighted average of ${W8w.value / 1000} thousand`,
  caption: 'With rising profits, the weighted average sits above the simple average.',
};
const vWE9 = table(
  ['Step', 'Working', 'Amount (₹)'],
  [
    ['Capital employed', `${inr(CE.assets)} − ${inr(CE.liabilities)}`, inr(CEv)],
    ['Normal profit', `${inr(CEv)} × ${CE.nrr} ÷ 100`, inr(GW.normal)],
    ['Super profit', `${inr(W8avg)} − ${inr(GW.normal)}`, inr(GW.superProfit)],
    ['Goodwill at 3 years\' purchase', `${inr(GW.superProfit)} × 3`, `**${inr(GW.bySuper)}**`],
  ],
  `Table of worked example 5: capital employed ${inr(CEv)}, normal profit ${inr(GW.normal)}, super profit ${inr(GW.superProfit)} and goodwill ${inr(GW.bySuper)} rupees`,
);
const vWE10 = table(
  ['Method', 'Working', 'Goodwill (₹)'],
  [
    ['Capitalisation of average profit', `${inr(W8avg)} × 100 ÷ ${CE.nrr} = ${inr(GW.capValue)}; less capital employed ${inr(CEv)}`, `**${inr(GW.byCapAvg)}**`],
    ['Capitalisation of super profit', `${inr(GW.superProfit)} × 100 ÷ ${CE.nrr}`, `**${inr(GW.byCapSuper)}**`],
  ],
  `Table of worked example 6: capitalised value ${inr(GW.capValue)} less capital employed ${inr(CEv)} gives goodwill ${inr(GW.byCapAvg)}; capitalising the super profit of ${inr(GW.superProfit)} gives the same ${inr(GW.byCapSuper)} rupees`,
  'Same figures, same goodwill: the two formulas are one formula rearranged.',
);
const vSummary2 = table(
  ['Topic', 'Key rule'],
  [
    ['Guarantee by the firm', 'Deficiency borne by the other partners in their mutual ratio'],
    ['Guarantee by a partner', 'That partner bears the whole deficiency'],
    ['Guarantee to the firm', 'Guarantor brings in the shortfall; the full guaranteed profit is divided'],
    ['Past adjustment', 'Should-be minus actual for each partner; net effect zero; one entry'],
    ['Goodwill', 'Intangible; only purchased goodwill is recorded (Accounting Standard 26)'],
    ['Average or weighted average', 'Normal average profit × years\' purchase'],
    ['Super profit', '(Average profit − normal profit) × years\' purchase'],
    ['Capitalisation', 'Average profit × 100 ÷ rate − capital employed = super profit × 100 ÷ rate'],
  ],
  'Summary table of Part 2: who bears a deficiency under each kind of guarantee, the rule for past adjustments, the nature of goodwill and the formulas of the four valuation methods',
);

// ================================================================ decks
const part1 = deck({
  part: 1,
  title: 'Accounting for Partnership: Basic Concepts — Part 1: The Firm, Capital Accounts and Appropriation of Profit',
  goals: [
    'State the features of partnership, the contents of a deed and the rules of the Indian Partnership Act, 1932 when the deed is silent',
    'Prepare partners\' capital and current accounts under the fixed and fluctuating capital methods',
    'Prepare the Profit and Loss Appropriation Account with interest on capital and drawings, salary, commission and reserve',
  ],
  slides: [
    sl('title', 'Accounting for Partnership: Basic Concepts', {
      b: 'Part 1 — what a **partnership** is, the **deed** and the Act, **capital accounts**, and the **Profit and Loss Appropriation Account**.',
      v: vRoute1,
      n: 'Welcome to Class twelve accountancy. Many shops, clinics and small factories in India are run by two or more people who pool their money and share the profit. Such a business is a partnership. In this first part we learn what makes a partnership, what partners write in their agreement, how their capital is recorded, and how the profit of the year is divided among them.',
    }),
    sl('concept', 'What is a partnership?', {
      bl: [
        'The Indian Partnership Act, 1932 describes partnership as a relation between persons who agree to share the profits of a business run by all of them, or by any of them acting for all.',
        'The persons are **partners**; together they form the **firm**; the business is run under the **firm name**.',
      ],
      v: vFeatures,
      n: 'The Indian Partnership Act of nineteen thirty two describes partnership as a relation between persons who agree to share the profits of a business run by all of them, or by any of them acting for all. From this come six features: two or more persons, an agreement, a business, sharing of profit, mutual agency and unlimited liability. The table shows each one in an imagined dairy run by two friends.',
    }),
    sl('concept', 'The partnership deed', {
      b: 'The written agreement between partners is the **partnership deed**. It is signed by all partners and stamped as required by law.',
      v: vDeed,
      n: 'Partners usually put their agreement in writing, in a document called the partnership deed. It records who the partners are, the capital each brings, the profit-sharing ratio, interest on capital and drawings, salaries, and rules for admission, retirement, goodwill and disputes. A clear deed prevents quarrels, because every partner can read exactly what was agreed.',
    }),
    sl('concept', 'When the deed is silent', {
      v: vAct,
      n: `If there is no deed, or the deed says nothing on a point, the Indian Partnership Act fills the gap. Profits and losses are shared equally. No interest is allowed on capital and none is charged on drawings. No partner gets a salary or commission. But a partner who lends money to the firm gets interest at six per cent a year. On a loan of ${rupees(LOAN.amount)}, that is ${rupees(LOAN.int)} a year, paid even in a year of loss.`,
    }),
    sl('check', 'Quick check: a partner\'s loan', {
      b: 'A loan is not capital. Which rule applies?',
      chk: 'm_loan6',
      n: 'Read the options carefully. Two things matter here: the rate of interest, and whether that interest depends on the firm making a profit.',
    }),
    sl('two-column', 'Fixed and fluctuating capitals', {
      cols: [
        '**Fixed capital method**\n\n- Two accounts per partner: **capital** and **current**.\n- Capital changes only when capital is added or permanently withdrawn.\n- The current account may show a **debit** balance.',
        '**Fluctuating capital method**\n\n- One **capital** account per partner.\n- Every adjustment is recorded in it, so its balance changes every year.\n- Used when a question does not name a method.',
      ],
      v: vFixFluct,
      n: 'There are two ways to keep partners\' capitals. Under the fixed capital method, each partner has a capital account that changes only when capital is added or permanently withdrawn, and a current account for everything else. Under the fluctuating capital method, a single capital account records everything, so its balance moves every year. If a question does not name a method, use fluctuating capitals.',
    }),
    sl('diagram', 'Where each item goes', {
      v: vWhere,
      n: 'Here is the map to remember. Everything a partner earns from the firm, such as interest on capital, salary, commission and share of profit, is credited. Everything taken out or charged, such as drawings, interest on drawings and a share of loss, is debited. Under the fixed method these go to the current account; under the fluctuating method, straight to the capital account.',
    }),
    sl('example', 'Worked example 1: current accounts under fixed capitals', {
      b: `**Tulsi Traders**, an imagined firm in Surat. Ananya and Rohan share profits 3:2. Fixed capitals ${rs(W1.cap.Ananya)} and ${rs(W1.cap.Rohan)}; interest on capital 10%; salary to Rohan ${rs(W1.salary.Rohan)} a year; drawings ${rs(W1.drawings.Ananya)} and ${rs(W1.drawings.Rohan)}; interest on drawings ${rs(W1.iod.Ananya)} and ${rs(W1.iod.Rohan)}; net profit ${rs(W1.profit)}.`,
      bl: [
        `Divisible profit = ${rs(W1.profit)} + ${rs(W1iodT)} − ${rs(W1iocT)} − ${rs(W1.salary.Rohan)} = ${rs(W1app.divisible)}, shared 3:2.`,
        `With **fluctuating** capitals, the same items would take the capital accounts to ${rs(W1fluct.Ananya)} and ${rs(W1fluct.Rohan)}.`,
      ],
      v: vWE1,
      n: `First, the profit. Add interest on drawings of ${rupees(W1iodT)} to the net profit, then take away interest on capital and Rohan's salary. That leaves ${rupees(W1app.divisible)}, shared three to two. Now the current accounts: credit interest, salary and share of profit; debit drawings and interest on drawings. Ananya's account closes at ${rupees(W1cur.balances.Ananya)} and Rohan's at ${rupees(W1cur.balances.Rohan)}. Their capital accounts do not change.`,
    }),
    sl('check', 'Quick check: current account balance', {
      b: 'Think of a partner who draws more than the firm credits to her.',
      chk: 'tf_current_debit',
      n: 'Imagine a partner whose drawings in a bad year are larger than her interest and share of profit. Which account shows the shortfall, and on which side?',
    }),
    sl('concept', 'Charge or appropriation?', {
      v: vChargeAppro,
      n: 'Some payments to partners are expenses of the firm, called charges. Interest on a partner\'s loan and rent paid to a partner for her shop are charges, debited to the profit and loss account even in a loss year. Other payments, such as interest on capital, salary and commission to partners and transfers to reserve, are appropriations. They divide the profit that is left, so they need a profit to come out of.',
    }),
    sl('diagram', 'The Profit and Loss Appropriation Account', {
      v: vFormat,
      bl: ['It starts from the **net profit** found in the Profit and Loss Account.', 'Its two sides must always total the same.'],
      n: 'The appropriation account is prepared after the profit and loss account. On its credit side are the net profit and interest on drawings. On its debit side are interest on capital, partners\' salaries and commission, and any transfer to reserve. What remains is the divisible profit, credited to the partners in their profit-sharing ratio. Both sides then show the same total.',
    }),
    sl('concept', 'Interest on capital', {
      v: vIocRules,
      bl: ['Calculated on the **opening** capital for the full year, and on additional capital only from the date it was brought in.'],
      n: 'Interest on capital is worked out on the opening capital for the whole year, and on any additional capital only from the date it came in. Its treatment depends on the deed. As an appropriation it can only be paid out of profit: when profit falls short, the whole profit is shared in the ratio of interest due, and in a loss year no interest is allowed. If the deed calls it a charge, it is allowed in full.',
    }),
    sl('example', 'Worked example 2: when profit is not enough', {
      b: `**Neelgiri Tea House**, an imagined firm in Ooty. Ishaan and Farah share profits 3:2. Capitals on 1 April 2025: ${rs(W2.cap.Ishaan)} and ${rs(W2.cap.Farah)}; Ishaan added ${rs(W2.addl)} on 1 October 2025. Interest on capital ${W2.rate}% a year. Net profit only ${rs(W2.profit)}. Show (a) interest as an appropriation, (b) interest as a charge.`,
      v: vWE2,
      n: `Ishaan's interest is eight per cent on his opening capital for a year plus eight per cent on the addition for six months: ${rupees(W2ioc.Ishaan)}. Farah's is ${rupees(W2ioc.Farah)}. The profit cannot cover both. As an appropriation, the profit is shared in the ratio of interest due. As a charge, full interest is allowed and the resulting loss of ${rupees(W2loss)} is shared three to two.`,
    }),
    sl('check', 'Quick check: profit short of interest', {
      b: 'Here interest on capital is an appropriation.',
      chk: 'm_insuff',
      n: 'Remember what happened at the tea house when the profit fell short of the interest due.',
    }),
    sl('concept', 'Interest on drawings: the average period', {
      v: vAvgPeriod,
      bl: ['Charged only if the deed provides; credited to the appropriation account.', 'Unequal amounts or dates: **product method**, interest = sum of (amount × months left) × rate ÷ 100 ÷ 12.'],
      n: 'Interest on drawings is charged only if the deed says so. When a partner draws the same amount at regular intervals, we use an average period. For monthly drawings at the beginning of each month, the money is out for six and a half months on average; in the middle, six; at the end, five and a half. Quarterly drawings give seven and a half, six or four and a half months. With no dates, take six months.',
    }),
    sl('example', 'Worked example 3: timing changes the interest', {
      b: `Meghna, a partner in an imagined bakery, withdraws ${rs(60000)} in all during 2025-26. Interest on drawings is 6% a year. How does the timing of her drawings change the interest?`,
      v: vWE3,
      n: `The amount drawn is the same, ${rupees(60000)}, but the interest depends on timing. Drawing at the beginning of each month, the average period is six and a half months, so the interest is ${rupees(W3[0][1].interest)}. Drawing at the end of each month gives only ${rupees(W3[2][1].interest)}. Quarterly drawings at the beginning cost ${rupees(W3[3][1].interest)}, because the money stays out of the firm for longer.`,
    }),
    sl('concept', 'Salary and commission to partners', {
      v: vCommission,
      bl: ['A partner gets salary or commission **only if the deed provides**; both are appropriations.', 'Commission on profit **before** charging it: profit × rate ÷ 100.', 'Commission on profit **after** charging it: profit × rate ÷ (100 + rate).'],
      n: `A working partner may get a salary or commission, but only if the deed provides for it. Commission is often a percentage of net profit. If it is on profit before charging the commission, simply take the percentage. If it is on profit after charging the commission, divide by one hundred plus the rate. Ten per cent on ${rupees(W4.profit)} after charging gives ${rupees(W4comm.Leela)}, exactly ten per cent of what is left.`,
    }),
    sl('example', 'Worked example 4: a complete appropriation account', {
      b: `**Saraswati Prints**, an imagined firm in Varanasi. Vikram, Leela and Yusuf share profits 3:2:2. Capitals ${W4.names.map((n) => rs(W4.cap[n])).join(', ')}; interest on capital 6%; salary to Yusuf ${rs(W4.salary.Yusuf)}; commission to Leela 10% of net profit after charging it; transfer to general reserve ${rs(W4.reserve)}; interest on drawings Vikram ${rs(W4.iod.Vikram)}, Leela ${rs(W4.iod.Leela)}. Net profit before commission ${rs(W4.profit)}.`,
      v: vWE4,
      n: `Start with the net profit of ${rupees(W4.profit)} and add interest on drawings. Then debit interest on capital at six per cent, Yusuf's salary, Leela's commission of ${rupees(W4comm.Leela)} and the transfer to reserve. The balance, ${rupees(W4app.divisible)}, is divided three to two to two: Vikram gets ${rupees(W4app.shares.Vikram)}, and Leela and Yusuf get ${rupees(W4app.shares.Leela)} each. Equal totals on both sides are your check.`,
    }),
    sl('check', 'Quick check: commission after charging', {
      b: 'Use the after-charging formula.',
      chk: 'n_commission_after',
      n: 'Divide by one hundred plus the rate, not by one hundred. Then check that your answer is the rate on what is left.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up. A partnership rests on an agreement, best written as a deed; where the deed is silent, the Act applies. Capitals may be fixed, with current accounts, or fluctuating. The appropriation account starts from net profit, adds interest on drawings, and takes away interest on capital, salaries, commission and reserve before dividing the rest. Remember the average periods and the commission formula.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Read the deed first: is interest on capital an **appropriation** or a **charge**?',
        'Interest on a partner\'s **loan** goes to the Profit and Loss Account, never the appropriation account.',
        'Interest on additional capital runs **only from its date**: write the months.',
        'Use the right average period; with no dates, use **6 months**.',
        'Total both sides of every account before moving on.',
      ],
      n: 'Examiners give step marks, so show working notes for interest, commission and the divisible profit. The commonest mistakes are putting interest on a partner\'s loan in the appropriation account, charging interest on additional capital for the full year, and allowing interest on capital in a loss year when it is not a charge. Always total both sides of every account before you move on.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Accounting for Partnership: Basic Concepts — Part 2: Guarantee, Past Adjustments and Goodwill',
  goals: [
    'Account for a guarantee of minimum profit given by the firm or by particular partners, and for a guarantee given to the firm',
    'Correct omissions and errors of a closed year with a single adjustment entry',
    'Explain the nature of goodwill and the factors affecting it, and value it by the average profit, weighted average, super profit and capitalisation methods',
  ],
  slides: [
    sl('title', 'Guarantee, past adjustments and goodwill', {
      b: 'Part 2 — **guarantee** of profit, **past adjustments**, and **goodwill**: its nature and its valuation.',
      v: vRoute2,
      n: 'In Part two we deal with three situations every partnership meets sooner or later. A new or junior partner may be promised a minimum profit. A mistake in last year\'s accounts may be found after the books are closed. And the partners may need to put a value on the reputation of their business, which accountants call goodwill. Let us take them one at a time.',
    }),
    sl('concept', 'Guarantee of minimum profit', {
      v: vGuarFlow,
      bl: ['Guarantee by the **firm**: all the other partners bear the deficiency in their mutual ratio.', 'Guarantee by **one partner**: that partner bears all of it.', 'Guarantee by **some partners** in an agreed ratio: they bear it in that ratio.'],
      n: 'Sometimes a partner is promised that her share of profit will not fall below a fixed amount. First divide the profit in the normal ratio. If the guaranteed partner\'s share is below the minimum, the gap is the deficiency. Who fills it depends on who gave the guarantee: the firm, meaning all the other partners in their own ratio; one partner alone; or some partners in an agreed ratio.',
    }),
    sl('example', 'Worked example 1: guarantee by the firm', {
      b: `**Konark Tiles**, an imagined firm in Puri. Dev, Esha and Pranav share profits 2:2:1. The **firm** guarantees Pranav a minimum profit of ${rs(G.min)}. Profit for 2025-26: ${rs(G.profit)}.`,
      v: vWE5,
      n: `Pranav's normal share is one fifth of ${rupees(G.profit)}, that is ${rupees(Gsh.Pranav)}. He was promised ${rupees(G.min)}, so the deficiency is ${rupees(Gdef)}. As the firm gave the guarantee, Dev and Esha bear it in their own ratio, two to two, which is equal: ${rupees(Gfirm.Dev)} each. The final shares still add up to the same profit.`,
    }),
    sl('example', 'Worked example 2: guarantee by one partner', {
      b: 'Same firm and profit, but **Dev alone** gave the guarantee to Pranav.',
      bl: [`Dev bears the whole deficiency of ${rs(Gdef)}: final shares ${rs(G6.Dev)}, ${rs(G6.Esha)} and ${rs(G6.Pranav)}.`, `Entry: Dev's Capital A/c Dr. ${rs(Gdef)}; To Pranav's Capital A/c ${rs(Gdef)}.`],
      v: vGuarChart,
      n: `If Dev alone promised the minimum, he alone makes up the deficiency of ${rupees(Gdef)}. Esha keeps her full ${rupees(G6.Esha)}, Dev is left with ${rupees(G6.Dev)}, and Pranav again gets ${rupees(G.min)}. The chart compares three cases: normal shares, a guarantee by the firm, and a guarantee by Dev alone. The total profit never changes; only its division does.`,
    }),
    sl('check', 'Quick check: who bears the deficiency?', {
      b: 'Who gave the guarantee?',
      chk: 'm_guar_partner',
      n: 'Find the guaranteed partner\'s normal share first, then decide who has to bear the gap.',
    }),
    sl('concept', 'Guarantee given to the firm', {
      v: vGuarToFirm,
      n: `A partner may instead guarantee that the firm itself will earn a minimum profit, perhaps because she brings in the customers. Suppose Esha guarantees the firm ${rupees(GT.min)}. The actual profit is ${rupees(G.profit)}, so she brings in the shortfall of ${rupees(GTshort)}, debited to her capital account. The full ${rupees(GT.min)} is then divided in the usual ratio among all the partners, Esha included.`,
    }),
    sl('concept', 'Past adjustments', {
      v: vPastFlow,
      bl: ['Typical cases: interest on capital or drawings omitted, a salary omitted, profit shared in the wrong ratio.', 'Fixed capitals: use **current** accounts. Fluctuating capitals: use **capital** accounts.'],
      n: 'Sometimes, after the books are closed, the partners find that interest on capital was left out, or that profit was shared in the wrong ratio. We do not reopen the accounts. Instead we draw up a table showing what each partner should have received, less what he actually received. The net effects always add up to zero, because the firm\'s profit has not changed. A single entry moves the difference.',
    }),
    sl('example', 'Worked example 3: omitted interest', {
      b: `**Godavari Traders**, an imagined firm in Nashik. Nisha, Tarun and Zoya share profits 2:2:1 with fixed capitals of ${W7.names.map((n) => rs(W7.cap[n])).join(', ')}. After the 2025-26 profit was distributed, they found that interest on capital at 10% and interest on drawings at 5% (drawings ${W7.names.map((n) => rs(W7.drawings[n])).join(', ')}, dates unknown) were both omitted.`,
      v: vWE7,
      n: `Credit each partner with the omitted interest on capital, and debit the omitted interest on drawings for six months at five per cent. The net omission of ${rupees(W7net)} has to come back out of the profit already shared, in the ratio two to two to one. Adding each column, Nisha gains ${rupees(W7adj.net.Nisha)}, while Tarun and Zoya lose ${rupees(-W7adj.net.Tarun)} and ${rupees(-W7adj.net.Zoya)}.`,
    }),
    sl('example', 'Worked example 3 (contd): the adjustment entry', {
      b: 'The net effects become **one** journal entry.',
      bl: ['Debit the partners who **lose**; credit the partner who **gains**.', 'Capitals are fixed, so the **current** accounts are used.'],
      v: vWE7je,
      n: `The table becomes a single journal entry. Tarun's and Zoya's current accounts are debited with ${rupees(-W7adj.net.Tarun)} and ${rupees(-W7adj.net.Zoya)}, and Nisha's current account is credited with ${rupees(W7adj.net.Nisha)}. Because the capitals are fixed, current accounts are used. With fluctuating capitals the same amounts would go through the capital accounts.`,
    }),
    sl('check', 'Quick check: a past adjustment', {
      b: 'Interest omitted, less the same total taken back in the profit ratio.',
      chk: 'n_past',
      n: 'Work out each partner\'s interest, take the total back in the profit-sharing ratio, and compare the two.',
    }),
    sl('concept', 'Goodwill: meaning and nature', {
      v: vGwNature,
      n: 'Customers return to a well-known sweet shop again and again. That pull, which lets a business earn more than an ordinary business, is goodwill. It is an intangible asset: it has real value but no physical form, and it cannot be sold apart from the business. Under Accounting Standard twenty six, only goodwill that has been paid for is recorded in the books.',
    }),
    sl('concept', 'Factors affecting goodwill', {
      v: vFactors,
      n: 'What makes goodwill high or low? Anything that changes the profits a firm can expect. A product in steady demand, a busy location, efficient management, little competition, and special advantages such as patents, licences or long contracts all raise goodwill. An old, well-known name helps too. Move the same shop to a quiet lane, and its goodwill falls.',
    }),
    sl('check', 'Quick check: what lowers goodwill?', {
      b: 'Think about future profits.',
      chk: 'm_gw_factor',
      n: 'Ask which change would bring fewer customers or lower profits in the future.',
    }),
    sl('concept', 'Methods of valuing goodwill', {
      v: vMethods,
      bl: ['**Normal profit** = capital employed × normal rate of return ÷ 100.', '**Capital employed** = assets (excluding goodwill and fictitious assets) − outside liabilities.', 'Use **normal** profits: add back abnormal losses, remove one-time gains.'],
      n: 'Your syllabus has four methods. The average profit method multiplies average profit by a number of years\' purchase. The weighted average method gives more weight to recent years. The super profit method values only the profit earned above the normal profit. The capitalisation methods ask what capital would earn the firm\'s profit at the normal rate of return.',
    }),
    sl('example', 'Worked example 4: average and weighted average profit', {
      b: `**Malabar Boatworks**, an imagined firm in Kozhikode. Profits: ${W8.years.map((y, i) => `${y} ${rs(W8.profits[i])}`).join('; ')} (2024-25 after an abnormal flood loss of ${rs(W8.abnormal.loss)}). Goodwill at 3 years' purchase.`,
      v: vWE8,
      n: `First make each year normal. The flood loss of ${rupees(W8.abnormal.loss)} will not recur, so add it back. The four normal profits average ${rupees(W8avg)}, so at three years' purchase goodwill is ${rupees(W8gwAvg)}. With weights one to four, the weighted average is ${rupees(W8w.value)}, giving goodwill of ${rupees(W8gwW)}. Rising profits push the weighted figure higher.`,
    }),
    sl('diagram', 'Simple and weighted average compared', {
      v: vProfitsPlot,
      n: 'The bars show the four normal profits, rising over time. The dashed line is the simple average and the solid line the weighted average. Because recent years carry more weight, the weighted average sits closer to the latest profits. That is why a firm whose profits show a clear trend prefers the weighted average method.',
    }),
    sl('example', 'Worked example 5: super profit method', {
      b: `Same firm. Assets other than goodwill ${rs(CE.assets)}; outside liabilities ${rs(CE.liabilities)}; normal rate of return ${CE.nrr}%; average profit ${rs(W8avg)}. Goodwill at 3 years' purchase of super profit.`,
      v: vWE9,
      n: `Capital employed is assets other than goodwill less outside liabilities: ${rupees(CEv)}. A normal firm would earn twelve and a half per cent on it, which is ${rupees(GW.normal)}. Our firm earns ${rupees(W8avg)}, so its super profit is ${rupees(GW.superProfit)}. Three years' purchase of the super profit gives goodwill of ${rupees(GW.bySuper)}.`,
    }),
    sl('example', 'Worked example 6: capitalisation methods', {
      b: 'Same firm and figures. Value goodwill by capitalising (a) the average profit, (b) the super profit.',
      v: vWE10,
      n: `Capitalising the average profit asks what capital would earn ${rupees(W8avg)} at twelve and a half per cent: ${rupees(GW.capValue)}. Subtract the capital actually employed, ${rupees(CEv)}, and goodwill is ${rupees(GW.byCapAvg)}. Capitalising the super profit at the same rate gives the same ${rupees(GW.byCapSuper)}. The two methods are one formula written two ways.`,
    }),
    sl('check', 'Quick check: super profit', {
      b: 'Normal profit first, then super profit, then years\' purchase.',
      chk: 'n_gw_super',
      n: 'Follow the three steps of the last worked example, in the same order.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up. A deficiency under a guarantee is borne by whoever gave it, and the firm\'s total profit never changes. Past errors are corrected with one entry, built from a table whose net effect is zero. Goodwill is an intangible asset, recorded only when purchased. We value it from normal profits by the average, weighted average, super profit and capitalisation methods.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'In guarantee questions, state **who** gave the guarantee before dividing the deficiency.',
        'In past adjustments, total the net row: it **must be zero**.',
        'Normalise profits first: add back abnormal losses, remove one-time gains, deduct a fair salary for unpaid partner work.',
        'Keep existing goodwill and fictitious assets **out** of capital employed.',
        'Write the years\' purchase and the rate in every goodwill working.',
      ],
      n: 'In the exam, read the guarantee clause twice, because the guarantor decides who bears the deficiency. In past adjustments, the net effects must total zero; if they do not, recheck your table. For goodwill, normalise each year\'s profit first, keep existing goodwill out of capital employed, and show every step: average profit, normal profit, super profit and the final value.',
    }),
  ],
});

// ================================================================ notes
const N = notes({
  title: 'Accounting for Partnership: Basic Concepts — Notes',
  sections: [
    {
      h: '1. Partnership, the deed and the Act',
      t: 1,
      b: '**Partnership** (Indian Partnership Act, 1932): a relation between persons who agree to share the profits of a business carried on by all of them or by any of them acting for all.\n\n**Features:** two or more persons (maximum 50, under the Companies Act, 2013 and its rules); an agreement, oral or written; a lawful business; sharing of profits; mutual agency; unlimited liability. Registration of a firm is optional.\n\n**Partnership deed:** the written agreement. It usually covers the names of the firm and partners, nature and duration of business, capitals, profit-sharing ratio, interest on capital, drawings and loans, salaries and commission, accounting rules, and rules for admission, retirement, death, goodwill, disputes and dissolution.\n\n**When the deed is silent (the Act applies):**\n- profits and losses shared **equally**;\n- **no** interest on capital; **no** interest on drawings;\n- **no** salary or commission to any partner;\n- interest on a partner\'s **loan** at **6% per annum**, a charge against profit.',
      terms: [
        ['Partnership deed', 'The written agreement among partners setting out the terms of the partnership.'],
        ['Mutual agency', 'Each partner is an agent of the firm and of the other partners, and also a principal.'],
        ['Unlimited liability', 'Partners are personally liable for the firm\'s debts, beyond their capital.'],
        ['Partner\'s loan', 'Money lent by a partner over and above capital; it earns 6% a year if nothing is agreed.'],
      ],
      v: vFeatures,
      vs: [vAct],
    },
    {
      h: '2. Partners\' capital accounts: fixed and fluctuating',
      t: 2,
      b: '**Fixed capital method:** two accounts per partner.\n- **Capital account**: opening capital, additional capital (credit), capital permanently withdrawn (debit). Always a credit balance.\n- **Current account**: interest on capital, salary, commission, share of profit (credit); drawings, interest on drawings, share of loss (debit). May have a debit balance.\n\n**Fluctuating capital method:** one capital account per partner records all these items; its balance changes every year. Use it when a question names no method.\n\n**Finding opening capital from closing capital:** closing capital + drawings + interest on drawings + share of loss − share of profit − interest on capital − salary − commission − additional capital = opening capital.',
      terms: [
        ['Capital account (fixed method)', 'Shows only capital brought in or permanently withdrawn.'],
        ['Current account', 'Records the routine credits and debits of a partner under the fixed capital method.'],
        ['Fluctuating capital', 'A capital account that records every adjustment, so its balance changes each year.'],
      ],
      v: vFixFluct,
      vs: [vWhere, vWE1],
    },
    {
      h: '3. The Profit and Loss Appropriation Account and interest on capital',
      t: 3,
      b: '**Charges** (Profit and Loss Account): interest on a partner\'s loan, rent paid to a partner, salaries of employees. Allowed even in a loss.\n\n**Appropriations** (Profit and Loss Appropriation Account): interest on capital, salary and commission to partners, transfer to reserve, shares of profit. Allowed only out of profit.\n\n**Format:** credit net profit and interest on drawings; debit interest on capital, salary, commission and reserve; the balance (**divisible profit**) is credited to partners in the profit-sharing ratio.\n\n**Interest on capital:**\n- on opening capital for the year; on additional capital from its date; reduced for capital withdrawn from its date;\n- deed silent: none;\n- appropriation, enough profit: full interest;\n- appropriation, profit short: the whole profit is shared in the **ratio of interest due**;\n- appropriation, loss: no interest;\n- charge: full interest debited to the Profit and Loss Account, even if it causes a loss.',
      terms: [
        ['Charge against profit', 'An expense debited to the Profit and Loss Account before net profit is found.'],
        ['Appropriation of profit', 'A distribution of the net profit among partners or to reserve.'],
        ['Divisible profit', 'Profit left for sharing in the profit-sharing ratio after all appropriations.'],
      ],
      v: vFormat,
      vs: [vChargeAppro, vWE2],
    },
    {
      h: '4. Interest on drawings, salary and commission',
      t: 3,
      b: '**Interest on drawings** is charged only if the deed provides; it is credited to the appropriation account and debited to the partner.\n\n- Equal amounts at regular intervals: interest = total drawings × rate ÷ 100 × average period ÷ 12.\n- Average period: monthly 6½ / 6 / 5½ months (beginning / middle / end); quarterly 7½ / 6 / 4½; half-yearly 9 / 6 / 3.\n- Dates not given: 6 months.\n- Unequal amounts or dates (**product method**): multiply each amount by the months left to the year end, add the products, and charge interest for one month on the total.\n\n**Salary and commission** to partners are appropriations, payable only if the deed provides.\n- Commission on profit **before** charging it = profit × rate ÷ 100.\n- Commission on profit **after** charging it = profit × rate ÷ (100 + rate).',
      terms: [
        ['Average period', 'The average number of months for which equal drawings remain with the partner.'],
        ['Product method', 'Interest on drawings worked out from the sum of each amount multiplied by the months it was outstanding.'],
      ],
      v: vAvgPeriod,
      vs: [vWE3, vWE4],
    },
    {
      h: '5. Guarantee of profit',
      t: 4,
      b: '**Guarantee to a partner:** a partner is promised a minimum share. Divide the profit normally; if the share is below the minimum, the **deficiency** is borne by:\n- the **firm**: all other partners in their mutual profit-sharing ratio;\n- **one partner**: that partner alone;\n- **some partners**: in the ratio they agreed.\n\nIn the appropriation account the guaranteed partner is shown with the minimum and the guarantors with their reduced shares (or the deficiency is passed by an entry: guarantor\'s capital Dr., to guaranteed partner\'s capital).\n\n**Guarantee to the firm:** a partner promises that the firm will earn at least a stated profit. The shortfall is brought in by that partner (debited to his capital, credited to the appropriation account) and the full guaranteed profit is divided among all partners.\n\nThe firm\'s total profit is never changed by a guarantee to a partner.',
      terms: [
        ['Guaranteed partner', 'A partner promised a minimum share of profit.'],
        ['Deficiency', 'The amount by which a guaranteed partner\'s share falls short of the minimum.'],
      ],
      v: vWE5,
      vs: [vGuarChart, vGuarToFirm],
    },
    {
      h: '6. Past adjustments',
      t: 5,
      b: 'Errors or omissions found **after** the accounts are closed (interest on capital or drawings, salary, commission, wrong profit-sharing ratio) are corrected without reopening the accounts.\n\n**Method:**\n1. For each partner, list what should have been credited (+) or debited (−).\n2. Deduct what was actually credited (reverse the profit wrongly shared).\n3. Find the **net effect**; the net effects of all partners total **zero**.\n4. Pass one entry: debit the partners who lose, credit those who gain (current accounts if capitals are fixed, capital accounts if fluctuating).\n\nIf only an appropriation such as interest on capital is omitted, the same total is taken back from the partners in the profit-sharing ratio.',
      terms: [
        ['Adjustment entry', 'A single entry between partners\' accounts that corrects the net effect of past errors.'],
        ['Net effect', 'For each partner, what should have been credited less what was credited.'],
      ],
      v: vWE7,
      vs: [vPastFlow, vWE7je],
    },
    {
      h: '7. Goodwill: nature, factors and valuation',
      t: 6,
      b: '**Goodwill** is the value of a firm\'s reputation that lets it earn more than a normal profit. It is an **intangible** asset (not fictitious) and cannot be sold apart from the business. Under **Accounting Standard 26**, only purchased goodwill is recorded.\n\n**Factors:** nature of business, location, efficiency of management, market situation, special advantages (patents, licences, contracts), period in business.\n\n**Valuation** (use normal profits: add back abnormal losses, remove non-recurring gains, deduct a fair salary for unpaid partner work):\n- **Average profit:** goodwill = average profit × number of years\' purchase.\n- **Weighted average profit:** weighted average = sum of (profit × weight) ÷ sum of weights; × years\' purchase.\n- **Super profit:** normal profit = capital employed × normal rate ÷ 100; super profit = average profit − normal profit; goodwill = super profit × years\' purchase.\n- **Capitalisation of average profit:** capitalised value = average profit × 100 ÷ normal rate; goodwill = capitalised value − capital employed.\n- **Capitalisation of super profit:** goodwill = super profit × 100 ÷ normal rate.\n\n**Capital employed** = total assets (excluding goodwill and fictitious assets) − outside liabilities.',
      terms: [
        ['Goodwill', 'The value of a business\'s reputation that enables it to earn above-normal profits.'],
        ['Normal profit', 'Profit a firm in the same industry earns on its capital at the normal rate of return.'],
        ['Super profit', 'Average profit minus normal profit.'],
        ['Years\' purchase', 'The number of years of profit (or super profit) a buyer agrees to pay for goodwill.'],
        ['Capital employed', 'Assets other than goodwill and fictitious assets, less outside liabilities.'],
      ],
      v: vMethods,
      vs: [vWE8, vWE9, vWE10],
    },
  ],
  tips: '**How marks are usually split**\n- 1 mark: one correct option or term.\n- 3 marks: a short computation with its working (for example interest on drawings, an adjustment entry or a goodwill value).\n- 4 marks: a full appropriation account, a guarantee or a goodwill problem with every step.\n- 6 marks: capital or current accounts with the appropriation account, or a multi-error past adjustment.\n\n**Common mistakes**\n- Putting interest on a partner\'s loan in the appropriation account (it is a charge).\n- Allowing interest on capital in a loss year when the deed does not call it a charge.\n- Charging interest on additional capital for the whole year.\n- Using the wrong average period, or forgetting 6 months when dates are not given.\n- Calculating commission on profit before charging it when the deed says after charging.\n- Letting the guaranteed partner bear part of his own deficiency.\n- A past-adjustment table whose net effects do not total zero.\n- Including goodwill already in the books in capital employed.\n\nAll firms and figures in SOYL practice are imagined; the board paper will give its own.',
});

// ================================================================ flashcards
const F = cards([
  ['**Partnership** (Indian Partnership Act, 1932)', 'A relation between persons who agree to share the profits of a business run by all or any of them acting for all.', 'definition', 1],
  ['Minimum and maximum number of partners', 'At least **2**; at most **50** (Companies Act, 2013 and its rules).', 'fact', 1],
  ['**Mutual agency**', 'Each partner is an agent of the firm and of the others, and also a principal.', 'definition', 1],
  ['Is a written deed compulsory?', '**No.** The agreement may be oral; a written, stamped deed is advisable.', 'concept', 1],
  ['Deed silent: sharing of profit', '**Equally**, whatever the capitals.', 'fact', 1],
  ['Deed silent: interest on capital and drawings', '**None** allowed on capital; **none** charged on drawings.', 'fact', 1],
  ['Deed silent: salary to a working partner', '**Not allowed**.', 'fact', 1],
  ['Deed silent: interest on a partner\'s loan', '**6% per annum**, a charge against profit.', 'exam-tip', 1],
  ['**Fixed capital method**', 'Capital account (permanent changes only) + current account (all routine items).', 'concept', 2],
  ['**Fluctuating capital method**', 'One capital account records every adjustment; balance changes yearly. Default method.', 'concept', 2],
  ['Can a current account have a debit balance?', '**Yes**, when debits (drawings, interest on drawings, loss) exceed credits.', 'concept', 2],
  ['Charge or appropriation: interest on a partner\'s loan', '**Charge**: Profit and Loss Account.', 'exam-tip', 3],
  ['Charge or appropriation: partner\'s salary', '**Appropriation**: Profit and Loss Appropriation Account.', 'exam-tip', 3],
  ['**Divisible profit**', 'Net profit + interest on drawings − interest on capital − salary − commission − reserve.', 'fact', 3],
  ['Profit less than interest on capital (appropriation)', 'Whole profit shared in the **ratio of interest due**.', 'concept', 3],
  ['Loss year, interest on capital not a charge', '**No interest** on capital.', 'concept', 3],
  ['Interest on additional capital', 'From the **date it was brought in** to the year end.', 'exam-tip', 3],
  ['Average period: monthly drawings (beginning / middle / end)', '**6½ / 6 / 5½** months.', 'fact', 3],
  ['Average period: quarterly drawings (beginning / middle / end)', '**7½ / 6 / 4½** months.', 'fact', 3],
  ['Interest on drawings when dates are not given', 'For **6 months** on the total.', 'fact', 3],
  ['Commission after charging such commission', 'Profit × rate ÷ **(100 + rate)**.', 'fact', 3],
  ['Guarantee by the firm: who bears the deficiency?', 'The **other partners** in their mutual profit-sharing ratio.', 'concept', 4],
  ['Guarantee by one partner: who bears the deficiency?', '**That partner alone**.', 'concept', 4],
  ['Guarantee to the firm by a partner', 'The partner brings in the shortfall; the guaranteed profit is divided among all.', 'concept', 4],
  ['Past adjustment: net effect of all partners', 'Always **zero**; one entry debits losers and credits gainers.', 'exam-tip', 5],
  ['**Goodwill**', 'Value of reputation that enables a business to earn above-normal profit; an intangible asset.', 'definition', 6],
  ['Accounting Standard 26 on goodwill', 'Only **purchased** goodwill is recorded; self-generated goodwill is not.', 'fact', 6],
  ['**Super profit**', 'Average profit − normal profit (capital employed × normal rate ÷ 100).', 'definition', 6],
  ['Capitalisation of average profit', 'Average profit × 100 ÷ normal rate − capital employed.', 'fact', 6],
  ['Capitalisation of super profit', 'Super profit × 100 ÷ normal rate (same answer as the other capitalisation method).', 'fact', 6],
  ['**Capital employed**', 'Assets (excluding goodwill and fictitious assets) − outside liabilities.', 'definition', 6],
  ['Abnormal loss in a past year\'s profit', '**Add it back** before averaging; remove one-time gains.', 'exam-tip', 6],
]);

// ================================================================ tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-12-accountancy-chapter-test-short',
  title: 'Chapter test (short) — Accounting for Partnership: Basic Concepts',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_def', 'm_fixed_items', 'm_guar_firm', 'ar_loan'] },
    { id: 'B', title: 'Section B — Short answer (3 marks each)', instr: 'Answer both questions. Show your working and journal entries in full.', items: ['s3_deed_silent', 's3_past_ratio'] },
    { id: 'C', title: 'Section C — Long answer (4 marks)', instr: 'Answer any ONE of the two questions. Show all working notes.', items: [{ attempt: 1, keys: ['l4_appropriation_basic', 'l4_gw_super'] }] },
    { id: 'D', title: 'Section D — Long answer (6 marks)', instr: 'Answer any ONE of the two questions. Prepare the accounts in proper format.', items: [{ attempt: 1, keys: ['l6_current_accounts', 'l6_guar_combo'] }] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-12-accountancy-chapter-test-long',
  title: 'Chapter test (long) — Accounting for Partnership: Basic Concepts',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–8 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_silent_profit', 'm_charge', 'm_loss_ioc', 'm_avg_quarter_end', 'm_as26', 'm_weighted', 'ar_iod', 'ar_gw'] },
    { id: 'B', title: 'Section B — Short answer (3 marks each)', instr: 'Answer questions 9–11, and any ONE of questions 12 and 13. Show your working.', items: ['s3_opening_capital', 's3_ioc_insufficient', 's3_gw_weighted', { attempt: 1, keys: ['s3_iod_quarterly', 's3_factors'] }] },
    { id: 'C', title: 'Section C — Long answer (4 marks each)', instr: 'Answer question 14, and any ONE of questions 15 and 16.', items: ['l4_ioc_loss', { attempt: 1, keys: ['l4_guar_firm', 'l4_past_ioc'] }] },
    { id: 'D', title: 'Section D — Long answer (6 marks each)', instr: 'Answer question 17, and any ONE of questions 18 and 19. Prepare accounts and tables in proper format.', items: ['l6_three_partner_approp', { attempt: 1, keys: ['l6_past_multi', 'l6_gw_cap'] }] },
  ],
});

// ================================================================ extra gates for this chapter
// 1. TTS-safe narration: words only — no digits, symbols, rupee sign, abbreviations or ALL-CAPS.
for (const d of [part1, part2]) for (const s of d.slides) {
  const m = /[0-9₹%/&()"“”|*#+=<>]|\b[A-Z]{2,}\b|\b(?:Dr|Cr|Rs|A\/c|viz|etc|ie|eg)\b/.exec(s.narration);
  if (m) throw new Error(`narration of deck ${d.part} ${s.id} is not TTS-safe: "${m[0]}" in "${s.narration.slice(Math.max(0, m.index - 30), m.index + 30)}"`);
}
// 2. Near-duplicate stems inside the bank (stage 6 measure: Jaccard of word 5-grams ≥ 0.7 is an error).
const dups = nearDuplicates(BANK, { n: 5, threshold: 0.5, minWords: 5 });
for (const d of dups) {
  if (d.similarity >= 0.7) throw new Error(`near-duplicate stems ${d.a.id} / ${d.b.id} (${Math.round(d.similarity * 100)}%)`);
  console.log(`note: stems ${d.a.id} / ${d.b.id} are ${Math.round(d.similarity * 100)}% similar (never together in one test)`);
}
// 3. Tests: disjoint, and no deck-check item in either.
const checksUsed = new Set(['m_loan6', 'tf_current_debit', 'm_insuff', 'n_commission_after', 'm_guar_partner', 'n_past', 'm_gw_factor', 'n_gw_super']);
const inTest = (t) => t.sections.flatMap((s) => s.items.map((i) => i.question_id));
const shortIds = new Set(inTest(T_SHORT));
check(inTest(T_LONG).every((id) => !shortIds.has(id)), 'the two chapter tests share a question');
const deckChecks = new Set([part1, part2].flatMap((d) => d.slides.map((s) => s.check_question_id).filter(Boolean)));
check(deckChecks.size === checksUsed.size, 'deck check list out of date');
check([...shortIds, ...inTest(T_LONG)].every((id) => !deckChecks.has(id)), 'a deck-check question is used in a test');
check(T_SHORT.total_marks === 20 && T_LONG.total_marks === 40, `test marks ${T_SHORT.total_marks} / ${T_LONG.total_marks}`);

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t06 of cbse-12-accountancy-ch01 (nature of partnership, deed and the Act; fixed and fluctuating capitals; Profit and Loss Appropriation Account; guarantee of profit; past adjustments; goodwill nature and valuation by average, weighted average, super profit and capitalisation methods)',
    originality: 'every firm, partner, scenario and figure written for this chapter and labelled imagined; no NCERT illustration or exercise and no CBSE sample-paper or board item reused',
    data: 'every amount computed by src/acc.mjs and asserted: journal entries balance, every capital, current and appropriation account closes, shares add up to the profit divided, past-adjustment net effects total zero, goodwill by capitalisation of average and super profit agree; tables in decks and model answers are generated from the computed values',
    facts: 'Indian Partnership Act 1932 default rules (equal sharing, no interest on capital or drawings, no remuneration, 6% on partners\' loans); 50-partner limit (Companies Act 2013 with Rule 10 of the Companies (Miscellaneous) Rules 2014); Accounting Standard 26 on goodwill',
    gate: 'schema, content lint (lintExemplar), deterministic verify checks, answer-leak scan, TTS-safe narration, near-duplicate stems and test disjointness run clean on this chapter',
  },
});
