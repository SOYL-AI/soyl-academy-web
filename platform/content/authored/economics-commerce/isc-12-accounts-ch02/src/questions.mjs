// ISC 12 Accounts, ch02 Goodwill: Nature and Valuation — question bank. Every firm, partner and figure is
// imagined by SOYL; no ISC textbook illustration or exercise and no CISCE specimen or past-paper item is
// reused. Every amount is computed with acc.mjs from the givens in the stem and asserted against the value
// the author worked out by hand, so a figure never drifts between stem, table and key.
import { Q, mcq, ar, tf, fb, match, num, short, long } from './lib.mjs';
import { check, same, sum, inr, rs, pc, average, normalise, stockError, capexWronglyCharged, weightedAverage, weightedTable, capitalEmployed, balanceSheet, normalProfit, capitalise, goodwillAll } from './acc.mjs';

const UNIT = 'isc-12-accounts-ch02';
/** Every registered item's key and stem, for the build's near-duplicate check. */
export const BANK = [];
/** Registers a question after checking that its marking scheme has whole-number steps adding up to its marks. */
function QQ(key, q) {
  for (const s of q.marking_scheme) check(Number.isInteger(s.marks) && s.marks > 0, `marking scheme of ${key}: step marks must be whole numbers`);
  same(sum(q.marking_scheme.map((s) => s.marks)), q.marks, `marking scheme of ${key}`);
  BANK.push({ id: key, unit: UNIT, text: q.stem_md });
  return Q(key, q);
}
/** Numerical item with a rupee key and a marking step that shows the amount in Indian grouping. */
const numQ = (o) => num({ unit: '₹', ...o, scheme: [[`Correct answer: ${rs(o.value)}`, o.marks ?? 1]] });
const lines = (...xs) => xs.join('\n\n');

// ================================================================ t01 Goodwill: meaning, nature, features, factors
QQ('m_intangible', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'An imagined tea stall beside the bus depot in Dharwad has regulars who return every morning, so it earns more than the stall across the road. For accounts, the value of this pull on customers (its goodwill) is classed as',
  opts: ['an intangible asset', 'a fictitious asset', 'a current asset', 'an outside liability'],
  sol: 'Goodwill has a real value that a buyer pays for, but no physical form. A fictitious asset, such as a debit balance of the Profit and Loss Account, has no realisable value at all.',
}));
QQ('m_as26_record', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `The partners of an imagined pottery studio in Khurja estimate that the reputation they have built over twelve years is worth ${rs(200000)}, and want to show it on the assets side of their balance sheet. Under Accounting Standard 26 (Intangible Assets) they`,
  opts: ['cannot do so, because goodwill is recorded only when it has been acquired for a consideration', 'may do so, provided every partner signs the entry', 'may do so, but only at half of the estimated value', 'must do so, because goodwill is a real asset'],
  sol: 'Goodwill built up inside the business cannot be measured reliably, so it is never brought into the books. Only purchased goodwill, paid for in money or money\'s worth, is recorded.',
}));
QQ('m_factor_lower', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Which event is most likely to **reduce** the goodwill of an imagined optician\'s shop in Shillong?',
  opts: ['The partner whose eye tests draw most customers retires and opens a shop across the road', 'The shop wins the sole franchise in the city for a popular lens brand', 'A new district hospital opens next door', 'The shop completes thirty years of trading under the same name'],
  sol: 'When the person customers trust leaves, and takes them to a rival, the profits the shop can expect fall. The other three events would raise its goodwill.',
}));
QQ('m_factor_raise', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'An imagined sports-goods maker in Jalandhar is about to value its goodwill. Which development would **raise** that value?',
  opts: ['It is granted a patent on a new grip for cricket-bat handles', 'A larger rival opens a factory in the same industrial area', 'Its chief bat designer leaves to start his own unit', 'Import duty on foreign bats is cut, so they become cheaper'],
  sol: 'A patent is a special advantage: it protects future sales and profits. More competition, the loss of key talent and cheaper imports all lower expected profits.',
}));
QQ('m_occasion', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Partners must agree a value for their firm\'s goodwill whenever their rights in future profits change. In which situation is a valuation of goodwill **not** needed?',
  opts: ['A partner brings in additional capital and the profit-sharing ratio stays the same', 'A new partner is admitted', 'A partner retires from the firm', 'The existing partners change their profit-sharing ratio'],
  sol: 'Extra capital with an unchanged ratio leaves every partner\'s share of future profits as it was, so no partner gains or sacrifices goodwill.',
}));
QQ('m_buyer_pays', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'A buyer agrees to pay more than the value of the net assets for an imagined flower-wholesale business in Madurai. The extra amount is paid for',
  opts: ['the chance to earn more than a normal profit in future, thanks to the business\'s name and connections', 'the profits the business has already earned in past years', 'the cash and bank balances taken over', 'the creditors the buyer agrees to pay'],
  sol: 'Goodwill is valued on expected future profits. Past profits belong to the old owners, and cash or creditors are already part of the net assets.',
}));
QQ('m_inseparable', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Unlike a delivery van or a stock of goods owned by a firm, goodwill',
  opts: ['cannot be sold on its own; it is realised only when the business as a whole is sold', 'can be sold separately at any time', 'loses its whole value at the end of every accounting year', 'is always shown at whatever value the partners estimate'],
  sol: 'Goodwill is attached to the business itself, so it is realised only on a sale of the business.',
}));
QQ('ar_fictitious', ar({
  t: 1, d: 3, c: 'analysis', key: 'c',
  a: 'Goodwill bought when a firm took over another business is shown on the assets side of the firm\'s balance sheet.',
  r: 'Goodwill is a fictitious asset, like a debit balance of the Profit and Loss Account.',
  sol: 'A is true: purchased goodwill is an asset. R is false: goodwill is intangible but has a real value that can be realised on a sale of the business, whereas a fictitious asset has none.',
}));
QQ('ar_selfgen', ar({
  t: 1, d: 3, c: 'understanding', key: 'b',
  a: 'Goodwill that the partners of a firm have built up themselves is not recorded in the firm\'s books.',
  r: 'Goodwill cannot be sold separately from the business to which it belongs.',
  sol: 'Both are true. A rests on Accounting Standard 26: goodwill not acquired for a consideration cannot be measured reliably. R is a different feature of goodwill, so it does not explain A.',
}));
QQ('ar_current', ar({
  t: 1, d: 2, c: 'understanding', key: 'd',
  a: 'Goodwill is a current asset, because its value changes from year to year.',
  r: 'The value of goodwill depends on the profits a firm expects to earn in future.',
  sol: 'A is false: goodwill is a non-current intangible asset; it is not held for conversion into cash within a year. R is true.',
}));
QQ('tf_selfgen_record', tf({
  t: 1, d: 1, c: 'understanding', ans: false,
  stem: 'True or false? If all the partners of an imagined bakery-supplies firm agree, the firm may record the goodwill it has built up over the years as an asset in its own books.',
  sol: 'Partners\' agreement does not change Accounting Standard 26: goodwill generated inside the firm is never recorded; only purchased goodwill is.',
}));
QQ('fb_intangible', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'Goodwill has a value that a buyer will pay for, yet it cannot be seen or touched; so in a firm\'s accounts goodwill is an ___ asset.',
  acc: [['intangible']],
  sol: 'Goodwill is an intangible asset: valuable, but without physical existence.',
}));
QQ('mt_factors', match({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Each situation below raises the goodwill of an imagined business. Match each situation with the factor affecting goodwill that it shows.',
  pairs: [
    ['A fuel station on a busy national highway', 'Location'],
    ['Costs kept low and every order delivered on time', 'Efficiency of management'],
    ['The only licence in the district to sell a famous brand', 'Special advantages'],
    ['No other cold store within fifty kilometres', 'Market situation (little competition)'],
  ],
  sol: 'Each situation lifts the profits the business can expect, which is what raises goodwill: a site that draws customers, good management, an exclusive right, and freedom from competition.',
}));
QQ('s2_features', short({
  t: 1, d: 1, c: 'recall', marks: 2,
  stem: 'State any **two** features of goodwill.',
  model: lines(
    '1. **Intangible:** goodwill has value but no physical existence.',
    '2. **Inseparable:** it cannot be sold apart from the business; it is realised only when the business is sold.',
    '*(Also accepted: its value depends on expected future profits; it is a valuable, not fictitious, asset; its value can change quickly with conditions; only purchased goodwill is recorded under Accounting Standard 26.)*',
  ),
  sol: 'Any two correct features, each named and explained.',
  scheme: [['First feature', 1], ['Second feature', 1]],
}));
QQ('s2_purchased', short({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Distinguish between **purchased goodwill** and **self-generated goodwill** on any two points.',
  model: mdTable2(
    ['Basis', 'Purchased goodwill', 'Self-generated goodwill'],
    [
      ['How it arises', 'Paid for when a business is bought for more than its net assets', 'Built up by the firm over time through its own reputation'],
      ['Recording', 'Recorded in the books (Accounting Standard 26)', 'Never recorded, as its cost cannot be measured reliably'],
    ],
  ),
  sol: 'Contrast how each arises and whether it may be recorded.',
  scheme: [['How each arises', 1], ['Recording under Accounting Standard 26', 1]],
}));
QQ('s2_need', short({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Give any **two** occasions on which a partnership firm needs to value its goodwill, with a reason for each.',
  model: lines(
    '1. **Admission of a partner:** the newcomer will share future profits the old partners\' reputation produced, so he must compensate them for their sacrifice.',
    '2. **Retirement or death of a partner:** the outgoing partner (or the legal heir) gives up a share of future profits and must be paid for his share of goodwill by the gaining partners.',
    '*(Also accepted: a change in the profit-sharing ratio; amalgamation of firms; sale of the business.)*',
  ),
  sol: 'Valuation is needed whenever partners\' rights in future profits change.',
  scheme: [['First occasion with reason', 1], ['Second occasion with reason', 1]],
}));
QQ('s3_factors', short({
  t: 1, d: 3, c: 'analysis', marks: 3,
  stem: 'An imagined bamboo-craft firm in Agartala faces three changes in 2026: (i) the partner whose designs win most export orders retires and joins a competitor; (ii) the showroom moves from the main market to a narrow back lane to save rent; (iii) the firm signs an exclusive five-year contract to supply a hotel chain. For each change, state its likely effect on the firm\'s goodwill and name the factor involved.',
  model: lines(
    '1. **(i) Goodwill falls** (efficiency and skill of the people running the business): the export orders, and the profits they bring, are likely to follow the designer to the rival.',
    '2. **(ii) Goodwill falls** (location): fewer customers will find a shop in a back lane, so expected sales drop even though rent is saved.',
    '3. **(iii) Goodwill rises** (special advantages): a long exclusive contract assures steady profits for five years.',
  ),
  sol: 'Judge each change by its effect on the profits the firm can expect to earn.',
  scheme: [['Change (i): effect and factor', 1], ['Change (ii): effect and factor', 1], ['Change (iii): effect and factor', 1]],
}));
QQ('s3_nature', short({
  t: 1, d: 2, c: 'understanding', marks: 3,
  stem: 'A student writes: "Goodwill is just a figure the partners invent, so it is a fictitious asset." Correct the student, explaining why goodwill is an **intangible** asset and **not** a fictitious one.',
  model: lines(
    '1. **Intangible:** goodwill cannot be seen or touched, yet it is valuable, because it lets the firm earn more than a normal profit.',
    '2. **Not fictitious:** a fictitious asset (for example a debit balance of the Profit and Loss Account) is a loss or expense not yet written off and can never be sold; goodwill can be realised in cash when the business is sold, and a buyer pays real money for it.',
    '3. **Not invented:** goodwill is valued from the firm\'s profits by agreed methods, and Accounting Standard 26 lets it be recorded only when it has been paid for.',
  ),
  sol: 'Separate "no physical form" from "no realisable value".',
  scheme: [['Meaning of intangible, applied to goodwill', 1], ['Contrast with a fictitious asset', 1], ['Valued from profits / recorded only when purchased', 1]],
}));

/** Markdown table helper for theory answers (same rules as mdTable, local to this file). */
function mdTable2(headers, rows) {
  return [`| ${headers.join(' | ')} |`, `|${headers.map(() => '---').join('|')}|`, ...rows.map((r) => `| ${r.join(' | ')} |`)].join('\n');
}

// ================================================================ t02 Average profit: simple and weighted
// n_avg (deck check, Part 1): Moradabad brassware.
const NA = { profits: [144000, 162000, 177000], years: 2 };
const NAavg = same(average(NA.profits), 161000, 'n_avg average');
const NAgw = same(NAavg * NA.years, 322000, 'n_avg goodwill');
QQ('n_avg', numQ({
  t: 2, d: 2, c: 'application', value: NAgw,
  stem: `An imagined brassware workshop in Moradabad earned profits of ${NA.profits.map(rs).join(', ')} in its last three years, with no abnormal items. Its partners agree to value goodwill at **two years' purchase** of the average profit. Find the goodwill (in ₹).`,
  sol: `Average profit = (${NA.profits.map(inr).join(' + ')}) ÷ 3 = ${inr(NAavg)}; goodwill = ${inr(NAavg)} × 2 = ${rs(NAgw)}.`,
}));
const MA = { profits: [96000, 108000, 120000, 132000], years: 3.5 };
const MAavg = same(average(MA.profits), 114000, 'm_avg_calc average');
const MAgw = same(MAavg * MA.years, 399000, 'm_avg_calc goodwill');
QQ('m_avg_calc', mcq({
  t: 2, d: 2, c: 'application',
  stem: `An imagined lock-making firm in Aligarh earned ${MA.profits.map(rs).join(', ')} in the last four years. Its goodwill at **three and a half years' purchase** of average profit is`,
  opts: [rs(MAgw), rs(MA.profits[3] * MA.years), rs(MAavg * 3), rs(sum(MA.profits))],
  sol: `Average = ${inr(sum(MA.profits))} ÷ 4 = ${inr(MAavg)}; × 3.5 = ${rs(MAgw)}. Using only the latest year, or 3 years' purchase, or the total, gives the distractors.`,
}));
QQ('m_abnormal', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: `In 2024-25 the profit of an imagined glass-bangle unit in Firozabad was cut by ${rs(25000)} when a furnace collapsed in an earthquake (not insured). When the unit's goodwill is valued on average profit, this loss is`,
  opts: ['added back to the 2024-25 profit, because it is not expected to recur', 'deducted again from the 2024-25 profit', 'spread equally over all the years being averaged', 'ignored, because it has already been charged'],
  sol: 'Goodwill rests on profits the business can maintain. An abnormal, non-recurring loss is added back to the year it was charged in.',
}));
const SU = stockError({ y: 0, amount: 10000, kind: 'under', last: 1 });
const SUn = normalise({ years: ['2024-25', '2025-26'], profits: [150000, 170000], adj: SU });
same(SUn.normal[0], 160000, 'm_stock_under 2024-25'); same(SUn.normal[1], 160000, 'm_stock_under 2025-26');
QQ('m_stock_under', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: `An imagined footwear unit in Kolhapur reported profits of ${rs(150000)} for 2024-25 and ${rs(170000)} for 2025-26. It is now found that its closing stock on 31 March 2025 was **undervalued** by ${rs(10000)}. The corrected profits of 2024-25 and 2025-26 are`,
  opts: [`${rs(SUn.normal[0])} and ${rs(SUn.normal[1])}`, `${rs(SUn.normal[0])} and ${rs(170000)}`, `${rs(140000)} and ${rs(180000)}`, `${rs(150000)} and ${rs(180000)}`],
  sol: 'An undervalued closing stock understates that year\'s profit; the same stock opens the next year undervalued, which overstates the next year\'s profit by the same amount.',
}));
const MW = { profits: [90000, 105000, 132000], weights: [1, 2, 3], years: 2 };
const MWw = weightedAverage(MW.profits.map((p, i) => [p, MW.weights[i]]));
same(MWw.value, 116000, 'm_weighted_calc weighted average');
const MWgw = same(MWw.value * MW.years, 232000, 'm_weighted_calc goodwill');
QQ('m_weighted_calc', mcq({
  t: 2, d: 3, c: 'application',
  stem: `An imagined e-rickshaw dealer in Gorakhpur earned ${rs(MW.profits[0])} in 2023-24, ${rs(MW.profits[1])} in 2024-25 and ${rs(MW.profits[2])} in 2025-26. Using weights 1, 2 and 3 for these years, its goodwill at **two years' purchase of the weighted average profit** is`,
  opts: [rs(MWgw), rs(whole2(average(MW.profits) * 2)), rs(MW.profits[2] * 2), rs(MWw.total)],
  sol: `Products: ${MWw.products.map(inr).join(' + ')} = ${inr(MWw.total)}; ÷ ${MWw.weights} = ${inr(MWw.value)}; × 2 = ${rs(MWgw)}.`,
}));
function whole2(x) { check(Number.isInteger(x), `not whole: ${x}`); return x; }
QQ('m_weighted_when', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'The partners of an imagined courier franchise must choose between the simple average and the weighted average of past profits for valuing goodwill. The weighted average profit method suits them best when',
  opts: ['profits show a clear rising or falling trend over the years', 'profits are about the same every year', 'the firm has no capital employed', 'the firm has made a loss in every year'],
  sol: 'Weights make recent years count more, so a trend shows up in the value. With steady profits both averages are nearly the same.',
}));
QQ('m_years_meaning', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'A buyer of an imagined travel agency in Gangtok agrees to pay "three years\' purchase of average profit" for goodwill. Here "three years\' purchase" means',
  opts: ['the buyer pays a price equal to three years of the average profit', 'the profits of the last three years are averaged', 'the price is paid in three yearly instalments', 'the goodwill will be written off over three years'],
  sol: 'The number of years\' purchase is a multiplier: how many years of profit the buyer is prepared to pay for. It is separate from the number of past years averaged.',
}));
QQ('ar_weighted', ar({
  t: 2, d: 3, c: 'analysis', key: 'a',
  a: 'When a firm\'s profits rise every year, goodwill by the weighted average profit method is higher than by the simple average profit method.',
  r: 'The weighted average method gives the greatest weight to the most recent years.',
  sol: 'Both are true, and R explains A: the latest, highest profits carry the most weight, so the weighted average is pulled above the simple average.',
}));
QQ('tf_nti_income', tf({
  t: [2, 5], d: 2, c: 'understanding', ans: true,
  stem: 'True or false? When the goodwill of an imagined seed-processing firm is valued, dividends it received on non-trade investments are deducted from its past profits.',
  sol: 'Non-trade investments are not used in the business, so their income is not part of the profit the business itself earns; it is removed, just as the investments are left out of capital employed.',
}));
QQ('tf_weighted_falling', tf({
  t: 2, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? An imagined printing firm\'s profits have fallen every year for four years, so the weighted average of its profits (weights 1 to 4) will be higher than their simple average.',
  sol: 'With falling profits the heaviest weights go to the lowest, most recent profits, so the weighted average is lower than the simple average.',
}));
QQ('fb_years', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'Under the average profit method, the goodwill of a firm = average profit × number of years\' ___.',
  acc: [['purchase']],
  sol: 'Goodwill is average profit multiplied by the agreed number of years\' purchase.',
}));
QQ('mt_adjust', match({
  t: 2, d: 2, c: 'understanding', marks: 2,
  stem: 'Before averaging the past profits of an imagined furniture showroom for goodwill, its accountant must normalise them. Match each item with its treatment.',
  pairs: [
    ['Uninsured loss of stock in a flood', 'Added back to that year\'s profit'],
    ['Profit on sale of an old delivery van', 'Deducted from that year\'s profit'],
    ['Closing stock of a year undervalued', 'Added to that year\'s profit and deducted from the next year\'s'],
    ['Rent of the showroom to rise from next year', 'Deducted from the average profit as an expected expense'],
  ],
  sol: 'Normalising keeps only profits the business can maintain: abnormal losses come back in, one-time gains go out, stock errors move between two years, and known future expenses are charged.',
}));
const NW = { profits: [120000, 135000, 150000, 180000], weights: [1, 2, 3, 4], years: 2 };
const NWw = weightedAverage(NW.profits.map((p, i) => [p, NW.weights[i]]));
same(NWw.value, 156000, 'n_weighted weighted average');
const NWgw = same(NWw.value * NW.years, 312000, 'n_weighted goodwill');
QQ('n_weighted', numQ({
  t: 2, d: 3, c: 'application', value: NWgw,
  stem: `The profits of an imagined gem-cutting firm in Jaipur for 2022-23 to 2025-26 were ${NW.profits.map(rs).join(', ')}. Its partners give these years weights of 1, 2, 3 and 4. Find goodwill at **two years' purchase of the weighted average profit** (in ₹).`,
  sol: `Products: ${NWw.products.map(inr).join(' + ')} = ${inr(NWw.total)}; weighted average = ${inr(NWw.total)} ÷ 10 = ${inr(NWw.value)}; goodwill = ${inr(NWw.value)} × 2 = ${rs(NWgw)}.`,
}));
const NS = stockError({ y: 0, amount: 15000, kind: 'over', last: 1 });
const NSn = normalise({ years: ['2024-25', '2025-26'], profits: [210000, 240000], adj: NS });
same(NSn.normal[1], 255000, 'n_stock 2025-26');
QQ('n_stock', numQ({
  t: 2, d: 3, c: 'analysis', value: NSn.normal[1],
  stem: `An imagined knitwear exporter in Tiruppur reported profits of ${rs(210000)} for 2024-25 and ${rs(240000)} for 2025-26. While valuing goodwill it finds that the closing stock on 31 March 2025 was **overvalued** by ${rs(15000)}. Calculate the corrected profit of **2025-26** (in ₹).`,
  sol: `The overvalued stock was the opening stock of 2025-26, so that year's cost of goods sold was overstated and its profit understated: ${inr(240000)} + ${inr(15000)} = ${rs(NSn.normal[1])}.`,
}));
QQ('s2_why_normalise', short({
  t: 2, d: 2, c: 'understanding', marks: 2,
  stem: 'Before the average profit of an imagined dairy-equipment dealer is used to value its goodwill, its past profits are "normalised". Explain why, giving two examples of adjustments.',
  model: lines(
    'Goodwill is a price paid for **future** profits, so only profits the business can expect to keep earning should be averaged. Items that will not happen again would give a misleading value.',
    'Examples: (1) an abnormal loss, such as an uninsured theft, is **added back**; (2) a non-recurring gain, such as profit on selling a fixed asset, is **deducted**. *(Also accepted: income from non-trade investments deducted; fair remuneration of a working partner deducted; stock errors corrected; expected future expenses charged.)*',
  ),
  sol: 'Link normalising to maintainable future profit, then give two adjustments.',
  scheme: [['Reason: future maintainable profit', 1], ['Two correct adjustments', 1]],
}));
const RM = { avg: 150000, pay: 36000, years: 2 };
const RMgw = same((RM.avg - RM.pay) * RM.years, 228000, 's2_remuneration goodwill');
QQ('s2_remuneration', short({
  t: 2, d: 2, c: 'application', marks: 2,
  stem: `The average profit of an imagined silver-filigree workshop in Cuttack is ${rs(RM.avg)}. One partner works full time in the workshop but draws no salary; a manager doing the same work would cost ${rs(RM.pay)} a year. Value goodwill at **two years' purchase** of the average profit.`,
  model: lines(
    `Average profit after a fair reward for the partner's work = ${rs(RM.avg)} − ${rs(RM.pay)} = ${rs(RM.avg - RM.pay)}.`,
    `Goodwill = ${rs(RM.avg - RM.pay)} × 2 = **${rs(RMgw)}**.`,
  ),
  sol: 'A buyer would have to pay someone for that work, so its fair cost is charged before goodwill is valued.',
  scheme: [['Fair remuneration deducted', 1], ['Goodwill', 1]],
}));
const PA = { years: ['2021-22', '2022-23', '2023-24', '2024-25', '2025-26'], profits: [120000, 150000, -30000, 180000, 210000], buy: 3 };
const PAavg = same(average(PA.profits), 126000, 's2_avg average');
const PAgw = same(PAavg * PA.buy, 378000, 's2_avg goodwill');
QQ('s2_avg', short({
  t: 2, d: 2, c: 'application', marks: 2,
  stem: `An imagined textile-recycling firm in Panipat had these results: ${PA.years.map((y, i) => `${y} ${PA.profits[i] < 0 ? `loss ${rs(-PA.profits[i])}` : `profit ${rs(PA.profits[i])}`}`).join('; ')}. The loss was a normal trading loss. Calculate goodwill at **three years' purchase** of the average profit of the five years.`,
  model: lines(
    `Total = ${inr(PA.profits[0])} + ${inr(PA.profits[1])} − ${inr(-PA.profits[2])} + ${inr(PA.profits[3])} + ${inr(PA.profits[4])} = ${rs(sum(PA.profits))}; average profit = ${inr(sum(PA.profits))} ÷ 5 = ${rs(PAavg)}.`,
    `Goodwill = ${rs(PAavg)} × 3 = **${rs(PAgw)}**.`,
  ),
  sol: 'A normal trading loss stays in the average: deduct it, and still divide by five.',
  scheme: [['Average profit with the loss deducted', 1], ['Goodwill', 1]],
}));
const BR = { years: ['2023-24', '2024-25', '2025-26'], profits: [140000, 190000, 170000], buy: 2 };
const BRn = normalise({ years: BR.years, profits: BR.profits, adj: [{ y: 0, label: 'abnormal loss added back', amount: 20000 }, { y: 1, label: 'gain on sale of launch deducted', amount: -25000 }] });
const BRavg = same(average(BRn.normal), 165000, 's3_normalise average');
const BRgw = same(BRavg * BR.buy, 330000, 's3_normalise goodwill');
QQ('s3_normalise', short({
  t: 2, d: 3, c: 'application', marks: 3,
  stem: `An imagined boat-rental firm in Puducherry reported profits of ${rs(BR.profits[0])} for 2023-24, ${rs(BR.profits[1])} for 2024-25 and ${rs(BR.profits[2])} for 2025-26. The 2023-24 profit is after an abnormal loss of ${rs(20000)}, when an uninsured boat sank in a cyclone. The 2024-25 profit includes a gain of ${rs(25000)} on selling an old motor launch. Value the firm's goodwill at **two years' purchase** of the average profit.`,
  model: lines(BRn.md, `Average profit = ${inr(BRn.total)} ÷ 3 = ${rs(BRavg)}.`, `Goodwill = ${rs(BRavg)} × 2 = **${rs(BRgw)}**.`),
  sol: 'Add back the abnormal loss and remove the one-time gain before averaging.',
  scheme: [['Normal profits of each year', 1], ['Average profit', 1], ['Goodwill', 1]],
}));
const OJ = { years: ['2023-24', '2024-25', '2025-26'], profits: [114000, 130000, 150000], weights: [1, 2, 3], buy: 3 };
const OJn = normalise({ years: OJ.years, profits: OJ.profits, adj: [{ y: 1, label: 'insurance claim for an earlier year deducted', amount: -10000 }] });
const OJw = weightedTable(OJ.years, OJn.normal, OJ.weights);
same(OJw.value, 134000, 's3_weighted weighted average');
const OJgw = same(OJw.value * OJ.buy, 402000, 's3_weighted goodwill');
QQ('s3_weighted', short({
  t: 2, d: 3, c: 'application', marks: 3,
  stem: `An imagined orange-juice firm in Nagpur earned ${OJ.years.map((y, i) => `${rs(OJ.profits[i])} in ${y}`).join(', ')}. The 2024-25 figure includes ${rs(10000)} received from an insurer for a loss suffered two years earlier. Taking weights 1, 2 and 3, value goodwill at **three years' purchase of the weighted average profit**.`,
  model: lines(`Normal profit of 2024-25 = ${inr(OJ.profits[1])} − ${inr(10000)} = ${rs(OJn.normal[1])}.`, OJw.md, `Weighted average profit = ${inr(OJw.total)} ÷ ${OJw.weights} = ${rs(OJw.value)}.`, `Goodwill = ${rs(OJw.value)} × 3 = **${rs(OJgw)}**.`),
  sol: 'Remove the claim, which relates to an earlier year, then weight and average.',
  scheme: [['Claim removed from 2024-25', 1], ['Weighted average profit', 1], ['Goodwill', 1]],
}));
const VP = { years: ['2023-24', '2024-25', '2025-26'], profits: [185000, 200000, 230000], buy: 2 };
const VPn = normalise({ years: VP.years, profits: VP.profits, adj: stockError({ y: 1, amount: 15000, kind: 'under', last: 2 }) });
const VPavg = same(average(VPn.normal), 205000, 's3_stock average');
const VPgw = same(VPavg * VP.buy, 410000, 's3_stock goodwill');
QQ('s3_stock', short({
  t: 2, d: 3, c: 'analysis', marks: 3,
  stem: `An imagined chemical-trading firm in Vapi reported profits of ${VP.years.map((y, i) => `${rs(VP.profits[i])} for ${y}`).join(', ')}. An audit shows that its stock on **31 March 2025** was undervalued by ${rs(15000)}. Correct the profits and value goodwill at **two years' purchase** of the average profit.`,
  model: lines(VPn.md, `Average profit = ${inr(VPn.total)} ÷ 3 = ${rs(VPavg)}.`, `Goodwill = ${rs(VPavg)} × 2 = **${rs(VPgw)}**.`),
  sol: 'The stock of 31 March 2025 closes 2024-25 and opens 2025-26, so the error is corrected in both years in opposite directions.',
  scheme: [['2024-25 profit raised by the undervaluation', 1], ['2025-26 profit reduced by the same amount', 1], ['Average profit and goodwill', 1]],
}));
const BF = { years: ['2022-23', '2023-24', '2024-25', '2025-26'], profits: [240000, 210000, 180000, 150000], buy: 2 };
const BFavg = same(average(BF.profits), 195000, 's3_compare simple');
const BFw = weightedTable(BF.years, BF.profits, [1, 2, 3, 4]);
same(BFw.value, 180000, 's3_compare weighted');
QQ('s3_compare', short({
  t: 2, d: 3, c: 'analysis', marks: 3,
  stem: `The profits of an imagined steel-fabrication firm in Bhilai have fallen steadily: ${BF.years.map((y, i) => `${y} ${rs(BF.profits[i])}`).join('; ')}. A new partner is to pay for his share of goodwill, valued at **two years' purchase**. Calculate goodwill by (a) the simple average and (b) the weighted average (weights 1 to 4), and (c) say which is fairer to the incoming partner, and why.`,
  model: lines(
    `**(a)** Simple average = ${inr(sum(BF.profits))} ÷ 4 = ${rs(BFavg)}; goodwill = **${rs(BFavg * 2)}**.`,
    `**(b)** Weighted: products ${BFw.products.map(inr).join(' + ')} = ${inr(BFw.total)}; ÷ 10 = ${rs(BFw.value)}; goodwill = **${rs(BFw.value * 2)}**.`,
    `**(c)** The weighted value, ${rs(BFw.value * 2)}, is fairer: profits are falling, and the recent, lower profits are the better guide to what the incoming partner will actually share in.`,
  ),
  sol: 'Weighting pulls the average towards recent years, which matters when there is a trend.',
  scheme: [['Simple-average goodwill', 1], ['Weighted-average goodwill', 1], ['Choice with reason', 1]],
}));
const DB = { profits: [210000, 240000, 270000], pay: 30000, partners: 2, premium: 6000, buy: 3 };
const DBavg = same(average(DB.profits), 240000, 's3_remuneration average');
const DBmaint = same(DBavg - DB.pay * DB.partners - DB.premium, 174000, 's3_remuneration maintainable');
const DBgw = same(DBmaint * DB.buy, 522000, 's3_remuneration goodwill');
QQ('s3_remuneration', short({
  t: 2, d: 3, c: 'application', marks: 3,
  stem: `An imagined book-binding firm in Dehradun earned ${DB.profits.map(rs).join(', ')} in its last three years. Both partners work full time without salary; a fair salary would be ${rs(DB.pay)} a year each. The machinery has never been insured; from next year an annual premium of ${rs(DB.premium)} will be paid. Value goodwill at **three years' purchase** of the future maintainable profit.`,
  model: lines(
    `Average profit = ${DB.profits.map(inr).join(' + ')} = ${inr(sum(DB.profits))}; ÷ 3 = ${rs(DBavg)}.`,
    `Less: fair salary of two partners ${rs(DB.pay * DB.partners)}; insurance premium ${rs(DB.premium)}. Future maintainable profit = ${inr(DBavg)} − ${inr(DB.pay * DB.partners)} − ${inr(DB.premium)} = ${rs(DBmaint)}.`,
    `Goodwill = ${rs(DBmaint)} × 3 = **${rs(DBgw)}**.`,
  ),
  sol: 'Charge every cost a buyer would actually bear in future before applying the years\' purchase.',
  scheme: [['Average profit', 1], ['Remuneration and premium deducted', 1], ['Goodwill', 1]],
}));
// l5_avg_full: Saharanpur wood-carving, abnormal loss and capital expenditure charged to revenue.
const WC = { years: ['2021-22', '2022-23', '2023-24', '2024-25', '2025-26'], profits: [150000, 130000, 190000, 200000, 220000], theft: 40000, buy: 3 };
const WCcap = capexWronglyCharged({ y: 2, cost: 50000, rate: 10, last: 4 });
const WCn = normalise({ years: WC.years, profits: WC.profits, adj: [{ y: 1, label: 'abnormal loss added back', amount: WC.theft }, ...WCcap.adj] });
same(WCn.total, 965000, 'l5_avg_full total');
const WCavg = same(average(WCn.normal), 193000, 'l5_avg_full average');
const WCgw = same(WCavg * WC.buy, 579000, 'l5_avg_full goodwill');
QQ('l5_avg_full', long({
  t: 2, d: 4, c: 'analysis', marks: 5,
  stem: `The partners of an imagined wood-carving firm in Saharanpur value goodwill at **three years' purchase of the average profit of the last five years**. Profits were: ${WC.years.map((y, i) => `${y} ${rs(WC.profits[i])}`).join('; ')}. On checking the books: (i) the 2022-23 profit is after an uninsured theft of carved panels worth ${rs(WC.theft)}; (ii) on 1 April 2023 a polishing machine costing ${rs(50000)} was bought and wrongly charged to revenue; machinery is depreciated at 10% a year on the straight-line method. Calculate the goodwill.`,
  model: lines(
    `Depreciation on the machine = ${inr(50000)} × 10% = ${rs(WCcap.dep)} a year, charged for 2023-24, 2024-25 and 2025-26.`,
    WCn.md,
    `Average profit = ${inr(WCn.total)} ÷ 5 = ${rs(WCavg)}.`,
    `Goodwill = ${rs(WCavg)} × 3 = **${rs(WCgw)}**.`,
  ),
  sol: 'Abnormal loss back in; capital expenditure back in for the year of purchase, then depreciation out for every year the machine was used.',
  scheme: [['Theft added back to 2022-23', 1], ['Machine cost added back to 2023-24', 1], ['Depreciation for three years', 1], ['Average profit', 1], ['Goodwill', 1]],
}));
const GC = { years: ['2022-23', '2023-24', '2024-25', '2025-26'], profits: [200000, 230000, 210000, 270000], buy: 2 };
const GCn = normalise({ years: GC.years, profits: GC.profits, adj: [{ y: 1, label: 'gain on sale of plot deducted', amount: -30000 }, { y: 2, label: 'abnormal loss added back', amount: 40000 }] });
const GCw = weightedTable(GC.years, GCn.normal, [1, 2, 3, 4]);
same(GCw.value, 243000, 'l5_weighted_full weighted');
const GCgw = same(GCw.value * GC.buy, 486000, 'l5_weighted_full goodwill');
const GCavg = same(average(GCn.normal), 230000, 'l5_weighted_full simple');
QQ('l5_weighted_full', long({
  t: 2, d: 3, c: 'application', marks: 5,
  stem: `An imagined chilli-trading firm in Guntur reported profits of ${GC.years.map((y, i) => `${rs(GC.profits[i])} in ${y}`).join(', ')}. The 2023-24 profit includes a gain of ${rs(30000)} on selling a spare warehouse plot; the 2024-25 profit is after a loss of ${rs(40000)} when cyclone rain ruined stock in an uninsured godown. (a) Value goodwill at **two years' purchase of the weighted average profit**, using weights 1, 2, 3 and 4. (b) Find goodwill on the simple average for comparison, and explain the difference.`,
  model: lines(
    '**(a)** Normal profits and weights:',
    GCw.md,
    `Weighted average profit = ${inr(GCw.total)} ÷ 10 = ${rs(GCw.value)}; goodwill = ${rs(GCw.value)} × 2 = **${rs(GCgw)}**.`,
    `**(b)** Simple average = ${inr(GCn.total)} ÷ 4 = ${rs(GCavg)}; goodwill = **${rs(GCavg * 2)}**. The weighted value is higher because the normal profits rise over the period and the latest, largest profit carries weight 4.`,
  ),
  sol: 'Normalise first (gain out, abnormal loss back in), then weight; the trend explains the gap between the two values.',
  scheme: [['Normal profits of 2023-24 and 2024-25', 2], ['Weighted average and goodwill', 1], ['Simple-average goodwill', 1], ['Reason for the difference', 1]],
}));
const KA = { years: ['2023-24', '2024-25', '2025-26'], profits: [160000, 180000, 215000], buy: 2 };
const KAn = normalise({ years: KA.years, profits: KA.profits, adj: [...stockError({ y: 0, amount: 20000, kind: 'over', last: 2 }), ...stockError({ y: 1, amount: 10000, kind: 'under', last: 2 })] });
same(KAn.normal[0], 140000, 'l5_stock_two 2023-24'); same(KAn.normal[1], 210000, 'l5_stock_two 2024-25'); same(KAn.normal[2], 205000, 'l5_stock_two 2025-26');
const KAavg = same(average(KAn.normal), 185000, 'l5_stock_two average');
const KAgw = same(KAavg * KA.buy, 370000, 'l5_stock_two goodwill');
QQ('l5_stock_two', long({
  t: 2, d: 4, c: 'analysis', marks: 5,
  stem: `An imagined perfume (attar) maker in Kannauj reported profits of ${KA.years.map((y, i) => `${rs(KA.profits[i])} for ${y}`).join(', ')}. While preparing for a partner's retirement, the partners find that the stock on 31 March 2024 was **overvalued** by ${rs(20000)} and the stock on 31 March 2025 was **undervalued** by ${rs(10000)}. (a) Explain why one stock error affects the profits of two years. (b) Correct the profits and value goodwill at **two years' purchase** of the average profit.`,
  model: lines(
    '**(a)** The closing stock of one year is the opening stock of the next. A closing stock that is too high raises that year\'s profit; as the next year\'s opening stock it raises cost of goods sold and lowers that year\'s profit by the same amount (and the reverse for undervaluation). Over the two years the errors cancel.',
    '**(b)**',
    KAn.md,
    `Average profit = ${inr(KAn.total)} ÷ 3 = ${rs(KAavg)}; goodwill = ${rs(KAavg)} × 2 = **${rs(KAgw)}**.`,
  ),
  sol: 'Trace each wrong stock figure into both years it touches, then average.',
  scheme: [['Explanation of the two-year effect', 1], ['2023-24 corrected', 1], ['2024-25 corrected for both errors', 1], ['2025-26 corrected', 1], ['Average profit and goodwill', 1]],
}));
QQ('l5_theory', long({
  t: [1, 2], d: 2, c: 'understanding', marks: 5,
  stem: 'The partners of an imagined jaggery-trading firm in Kolhapur plan to admit a new partner and must value goodwill. (a) Distinguish between purchased and self-generated goodwill, and state which of them the firm may record in its books. (b) Their accountant says goodwill must be valued on "future maintainable profit". Explain this idea, with **three** adjustments she will make to the past profits.',
  model: lines(
    '**(a)** Purchased goodwill arises when a business is acquired for more than its net assets; a price has actually been paid. Self-generated goodwill is the reputation a firm builds for itself; no price has been paid and its cost cannot be measured. Under Accounting Standard 26 only purchased goodwill may be recorded.',
    '**(b)** A new partner pays for the profits the firm can go on earning, not for what happened by chance in past years. So the past profits are cleaned of items that will not recur and charged with costs that will arise. Adjustments: (1) abnormal losses such as an uninsured theft are added back; (2) non-recurring gains such as profit on sale of a fixed asset are deducted; (3) a fair salary for a partner who works without pay is deducted. *(Also accepted: income from non-trade investments removed; stock errors corrected; known future expenses such as a new insurance premium charged.)*',
  ),
  sol: 'Part (a): origin and recording rule; part (b): meaning, then any three adjustments.',
  scheme: [['Purchased vs self-generated', 1], ['Recording rule', 1], ['Meaning of future maintainable profit', 1], ['Three adjustments', 2]],
}));

// ================================================================ t03 Super profit
const NP = { ce: 750000, nrr: 14, avg: 130000 };
const NPn = same(normalProfit(NP.ce, NP.nrr), 105000, 'm_normal_profit');
QQ('m_normal_profit', mcq({
  t: 3, d: 2, c: 'application',
  stem: `An imagined spice-grinding unit in Erode employs capital of ${rs(NP.ce)} and earns an average profit of ${rs(NP.avg)}. Similar units earn a normal return of ${pc(NP.nrr)}. Its normal profit is`,
  opts: [rs(NPn), rs(NP.avg - NPn), rs(NP.avg * NP.nrr / 100), rs(NP.avg)],
  sol: `Normal profit = capital employed × normal rate ÷ 100 = ${inr(NP.ce)} × 14 ÷ 100 = ${rs(NPn)}. The average profit plays no part in it.`,
}));
const SH = { ce: 1200000, nrr: 10, avg: 165000, buy: 4 };
const SHg = goodwillAll({ avg: SH.avg, capitalEmployed: SH.ce, nrr: SH.nrr, years: SH.buy });
same(SHg.bySuper, 180000, 'm_super_calc');
QQ('m_super_calc', mcq({
  t: 3, d: 3, c: 'application',
  stem: `An imagined seed company in Hubballi employs capital of ${rs(SH.ce)}; the normal rate of return in its trade is ${pc(SH.nrr)} and its average profit is ${rs(SH.avg)}. Its goodwill at **four years' purchase of super profit** is`,
  opts: [rs(SHg.bySuper), rs(SH.avg * SH.buy), rs(SHg.normal * SH.buy), rs(SHg.superProfit)],
  sol: `Normal profit = ${rs(SHg.normal)}; super profit = ${inr(SH.avg)} − ${inr(SHg.normal)} = ${rs(SHg.superProfit)}; × 4 = ${rs(SHg.bySuper)}.`,
}));
const NG = { ce: 1000000, nrr: 10, avg: 90000 };
const NGn = normalProfit(NG.ce, NG.nrr);
check(NG.avg < NGn, 'm_no_goodwill: average below normal');
QQ('m_no_goodwill', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: `An imagined handloom cooperative's outlet employs capital of ${rs(NG.ce)}; the normal rate of return is ${pc(NG.nrr)} and its average profit is ${rs(NG.avg)}. Under the super profit method at three years' purchase, its goodwill is`,
  opts: ['nil: the firm earns less than the normal profit, so it has no super profit', rs((NGn - NG.avg) * 3), rs(NG.avg * 3), rs(NGn - NG.avg)],
  sol: `Normal profit = ${rs(NGn)}, which is more than the average profit of ${rs(NG.avg)}. There is no super profit, so there is no goodwill to value.`,
}));
QQ('ar_nosuper', ar({
  t: 3, d: 3, c: 'analysis', key: 'a',
  a: 'A firm whose average profit is below its normal profit has no goodwill under the super profit method.',
  r: 'Super profit is the excess of a firm\'s average profit over its normal profit.',
  sol: 'Both are true and R explains A: with no excess over normal profit there is no super profit to multiply.',
}));
QQ('ar_normalrate', ar({
  t: 3, d: 2, c: 'understanding', key: 'd',
  a: 'Normal profit is found by multiplying a firm\'s average profit by the normal rate of return.',
  r: 'The normal rate of return is the rate that similar firms in the same industry usually earn on their capital.',
  sol: 'A is false: normal profit = capital employed × normal rate ÷ 100; average profit is not used. R is true.',
}));
QQ('fb_super', fb({
  t: 3, d: 1, c: 'recall',
  stem: 'Under the super profit method of valuing a firm\'s goodwill, super profit = average profit − ___ profit.',
  acc: [['normal']],
  sol: 'Super profit is average profit less normal profit.',
}));
const SV = { ce: 800000, nrr: 15, avg: 156000, buy: 2.5 };
const SVg = goodwillAll({ avg: SV.avg, capitalEmployed: SV.ce, nrr: SV.nrr, years: SV.buy });
same(SVg.bySuper, 90000, 'n_super');
QQ('n_super', numQ({
  t: 3, d: 2, c: 'application', value: SVg.bySuper,
  stem: `An imagined printing press in Sivakasi employs capital of ${rs(SV.ce)}. The normal rate of return in printing is ${pc(SV.nrr)}, and the press's average profit is ${rs(SV.avg)}. Value its goodwill at **two and a half years' purchase of super profit** (in ₹).`,
  sol: `Normal profit = ${inr(SV.ce)} × 15 ÷ 100 = ${inr(SVg.normal)}; super profit = ${inr(SV.avg)} − ${inr(SVg.normal)} = ${inr(SVg.superProfit)}; goodwill = ${inr(SVg.superProfit)} × 2.5 = ${rs(SVg.bySuper)}.`,
}));
const YR = { gw: 135000, avg: 120000, ce: 600000, nrr: 12.5 };
const YRn = same(normalProfit(YR.ce, YR.nrr), 75000, 'n_years normal');
const YRy = same(YR.gw / (YR.avg - YRn), 3, 'n_years');
QQ('n_years', num({
  t: 3, d: 4, c: 'analysis', value: YRy, unit: 'years',
  stem: `The goodwill of an imagined bus-ticketing agency in Nashik was valued at ${rs(YR.gw)} by the super profit method. Its average profit is ${rs(YR.avg)}, capital employed ${rs(YR.ce)} and the normal rate of return ${pc(YR.nrr)}. How many years' purchase of super profit were used?`,
  sol: `Normal profit = ${inr(YR.ce)} × 12.5 ÷ 100 = ${inr(YRn)}; super profit = ${inr(YR.avg)} − ${inr(YRn)} = ${inr(YR.avg - YRn)}; years = ${inr(YR.gw)} ÷ ${inr(YR.avg - YRn)} = ${YRy} years.`,
  scheme: [[`Correct answer: ${YRy} years`, 1]],
}));
const NR = { normal: 84000, ce: 700000 };
const NRr = same((NR.normal * 100) / NR.ce, 12, 'n_normal_rate');
QQ('n_normal_rate', num({
  t: 3, d: 3, c: 'application', value: NRr, unit: '%',
  stem: `An imagined tile showroom in Morbi employs capital of ${rs(NR.ce)}, and the normal profit for a showroom of this size is worked out to be ${rs(NR.normal)}. What normal rate of return (in %) was used?`,
  sol: `Normal rate = normal profit × 100 ÷ capital employed = ${inr(NR.normal)} × 100 ÷ ${inr(NR.ce)} = ${NRr}%.`,
  scheme: [[`Correct answer: ${NRr}%`, 1]],
}));
const BK = { ce: 500000, nrr: 16, avg: 104000, buy: 2 };
const BKg = goodwillAll({ avg: BK.avg, capitalEmployed: BK.ce, nrr: BK.nrr, years: BK.buy });
same(BKg.normal, 80000, 's2_normal_super normal'); same(BKg.bySuper, 48000, 's2_normal_super goodwill');
QQ('s2_normal_super', short({
  t: 3, d: 2, c: 'application', marks: 2,
  stem: `An imagined namkeen maker in Bikaner employs capital of ${rs(BK.ce)} and earns an average profit of ${rs(BK.avg)}. The normal rate of return in the snack trade is ${pc(BK.nrr)}. Calculate its super profit and its goodwill at **two years' purchase** of super profit.`,
  model: lines(
    `Normal profit = ${rs(BK.ce)} × 16 ÷ 100 = ${rs(BKg.normal)}; super profit = ${rs(BK.avg)} − ${rs(BKg.normal)} = **${rs(BKg.superProfit)}**.`,
    `Goodwill = ${rs(BKg.superProfit)} × 2 = **${rs(BKg.bySuper)}**.`,
  ),
  sol: 'Normal profit from capital employed, then the excess, then the multiplier.',
  scheme: [['Normal and super profit', 1], ['Goodwill', 1]],
}));
const IM = { ce: 800000, nrr: 12, avg: 90000 };
const IMn = same(normalProfit(IM.ce, IM.nrr), 96000, 's2_no_goodwill normal');
check(IM.avg < IMn, 's2_no_goodwill: average below normal');
QQ('s2_no_goodwill', short({
  t: 3, d: 3, c: 'analysis', marks: 2,
  stem: `A partner of an imagined handloom house in Imphal claims ${rs(18000)} as goodwill at three years' purchase of super profit. The firm employs ${rs(IM.ce)}, the normal rate of return is ${pc(IM.nrr)} and its average profit is ${rs(IM.avg)}. Is the claim correct? Show your working.`,
  model: lines(
    `Normal profit = ${rs(IM.ce)} × 12 ÷ 100 = ${rs(IMn)}. Average profit ${rs(IM.avg)} is **less** than normal profit, so super profit = ${inr(IM.avg)} − ${inr(IMn)} is negative.`,
    `The claim is **not correct**: a firm that earns below the normal return has **no super profit and no goodwill** under this method. The partner has multiplied a shortfall of ${rs(IMn - IM.avg)} by three.`,
  ),
  sol: 'Compare average profit with normal profit before applying any years\' purchase.',
  scheme: [['Normal profit compared with average profit', 1], ['Conclusion: no goodwill', 1]],
}));
// s3_super: Haldia logistics, capital employed from totals.
const HL = { assets: 1500000, gw: 100000, creditors: 200000, loan: 300000, profits: [140000, 160000, 180000], nrr: 15, buy: 3 };
const HLce = same(HL.assets - HL.gw - HL.creditors - HL.loan, 900000, 's3_super CE');
const HLavg = same(average(HL.profits), 160000, 's3_super average');
const HLg = goodwillAll({ avg: HLavg, capitalEmployed: HLce, nrr: HL.nrr, years: HL.buy, cap: false });
same(HLg.bySuper, 75000, 's3_super goodwill');
QQ('s3_super', short({
  t: [3, 5], d: 3, c: 'application', marks: 3,
  stem: `An imagined logistics firm in Haldia has total assets of ${rs(HL.assets)}, which include goodwill of ${rs(HL.gw)} brought in when it bought a smaller transporter. Its outside liabilities are creditors ${rs(HL.creditors)} and a term loan of ${rs(HL.loan)}. Profits of the last three years were ${HL.profits.map(rs).join(', ')}; the normal rate of return is ${pc(HL.nrr)}. Value goodwill at **three years' purchase of super profit**.`,
  model: lines(
    `1. Capital employed = ${inr(HL.assets)} − goodwill ${inr(HL.gw)} − (${inr(HL.creditors)} + ${inr(HL.loan)}) = **${rs(HLce)}**.`,
    `2. Average profit = ${inr(sum(HL.profits))} ÷ 3 = ${rs(HLavg)}; normal profit = ${inr(HLce)} × 15 ÷ 100 = ${rs(HLg.normal)}.`,
    `3. Super profit = ${inr(HLavg)} − ${inr(HLg.normal)} = ${rs(HLg.superProfit)}; goodwill = ${inr(HLg.superProfit)} × 3 = **${rs(HLg.bySuper)}**.`,
  ),
  sol: 'Leave the existing goodwill out of capital employed; then normal profit, super profit and the multiplier.',
  scheme: [['Capital employed without existing goodwill', 1], ['Average and normal profit', 1], ['Super profit and goodwill', 1]],
}));
// l5_super_bs: Vellore leather goods, horizontal balance sheet.
const VL = {
  liabilities: [["Ilango's Capital", 500000, 'capital'], ["Mehrunnisa's Capital", 300000, 'capital'], ['General Reserve', 80000, 'reserve'], ['Creditors', 160000, 'outside'], ['Bills Payable', 40000, 'outside'], ['Bank Loan', 220000, 'outside']],
  assets: [['Goodwill', 60000, 'goodwill'], ['Machinery', 540000], ['Furniture', 100000], ['Non-trade Investments', 120000, 'nti'], ['Stock', 210000], ['Debtors', 180000], ['Cash at Bank', 70000], ['Advertisement Suspense (deferred revenue expenditure)', 20000, 'fictitious']],
  profits: [124000, 140000, 156000], nti: 12000, nrr: 15, buy: 2.5,
};
const VLbs = balanceSheet({ liabilities: VL.liabilities, assets: VL.assets });
const VLce = capitalEmployed({ liabilities: VL.liabilities, assets: VL.assets });
same(VLce.ce, 680000, 'l5_super_bs CE');
const VLn = normalise({ years: ['2023-24', '2024-25', '2025-26'], profits: VL.profits, adj: [0, 1, 2].map((y) => ({ y, label: 'interest on non-trade investments', amount: -VL.nti })) });
const VLavg = same(average(VLn.normal), 128000, 'l5_super_bs average');
const VLg = goodwillAll({ avg: VLavg, capitalEmployed: VLce.ce, nrr: VL.nrr, years: VL.buy, cap: false });
same(VLg.normal, 102000, 'l5_super_bs normal'); same(VLg.bySuper, 65000, 'l5_super_bs goodwill');
QQ('l5_super_bs', long({
  t: [3, 5], d: 3, c: 'application', marks: 5,
  stem: lines(
    `Ilango and Mehrunnisa run an imagined leather-goods firm in Vellore. Their Balance Sheet as at 31 March 2026 was:`,
    VLbs.md,
    `Profits for the last three years were ${VL.profits.map(rs).join(', ')}; each includes ${rs(VL.nti)} interest on the non-trade investments. The normal rate of return is ${pc(VL.nrr)}. Calculate (a) the capital employed and (b) goodwill at **two and a half years' purchase of super profit**.`,
  ),
  model: lines(
    `**(a)** Assets used in the business = ${VLce.used.map(([, a]) => inr(a)).join(' + ')} = ${rs(VLce.usedTotal)} (goodwill, non-trade investments and advertisement suspense left out). Outside liabilities = ${VLce.outside.map(([, a]) => inr(a)).join(' + ')} = ${rs(VLce.outsideTotal)}. Capital employed = ${inr(VLce.usedTotal)} − ${inr(VLce.outsideTotal)} = **${rs(VLce.ce)}**. *(Check from the capital side: ${inr(VLce.ownTotal)} − ${inr(VLce.excludedTotal)} = ${inr(VLce.ce)}.)*`,
    `**(b)** Normal profits after removing the investment income: ${VLn.normal.map(inr).join(', ')}; average profit = ${inr(VLn.total)} ÷ 3 = ${rs(VLavg)}.`,
    `Normal profit = ${inr(VLce.ce)} × 15 ÷ 100 = ${rs(VLg.normal)}; super profit = ${inr(VLavg)} − ${inr(VLg.normal)} = ${rs(VLg.superProfit)}.`,
    `Goodwill = ${inr(VLg.superProfit)} × 2.5 = **${rs(VLg.bySuper)}**.`,
  ),
  sol: 'Leave out of capital employed every asset not used in the business, and remove its income from the profits too.',
  scheme: [['Assets used in the business', 1], ['Capital employed', 1], ['Average profit without investment income', 1], ['Normal and super profit', 1], ['Goodwill', 1]],
}));

// ================================================================ t04 Capitalisation
const CA = { avg: 180000, nrr: 15, ce: 1000000 };
const CAg = goodwillAll({ avg: CA.avg, capitalEmployed: CA.ce, nrr: CA.nrr });
same(CAg.byCapAvg, 200000, 'm_cap_avg_calc');
QQ('m_cap_avg_calc', mcq({
  t: 4, d: 3, c: 'application',
  stem: `An imagined solar-panel installer in Jodhpur has an average profit of ${rs(CA.avg)} and capital employed of ${rs(CA.ce)}; the normal rate of return is ${pc(CA.nrr)}. By **capitalising its average profit**, its goodwill is`,
  opts: [rs(CAg.byCapAvg), rs(CAg.capValue), rs(CAg.superProfit), rs(CAg.capValue + CA.ce)],
  sol: `Capitalised value = ${inr(CA.avg)} × 100 ÷ 15 = ${inr(CAg.capValue)}; less capital employed ${inr(CA.ce)} = ${rs(CAg.byCapAvg)}.`,
}));
const CS = { sp: 27000, nrr: 18 };
const CSg = same(capitalise(CS.sp, CS.nrr), 150000, 'm_cap_super_calc');
QQ('m_cap_super_calc', mcq({
  t: 4, d: 2, c: 'application',
  stem: `An imagined cybercafé chain in Bhopal earns a super profit of ${rs(CS.sp)} a year; the normal rate of return is ${pc(CS.nrr)}. Its goodwill by **capitalising the super profit** is`,
  opts: [rs(CSg), rs(CS.sp * CS.nrr / 100), rs(CS.sp * 3), rs(CS.sp * CS.nrr)],
  sol: `Goodwill = super profit × 100 ÷ normal rate = ${inr(CS.sp)} × 100 ÷ 18 = ${rs(CSg)}.`,
}));
QQ('m_cap_formula', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'In valuing the goodwill of an imagined pharmacy chain by the capitalisation of average profit method, the "capitalised value of average profit" is',
  opts: ['the capital that would earn the average profit at the normal rate of return', 'the average profit multiplied by the normal rate of return', 'the capital actually employed in the pharmacy chain', 'the average profit multiplied by the number of years averaged'],
  sol: 'Capitalised value = average profit × 100 ÷ normal rate: the investment a normal business would need to earn that profit. Goodwill is the excess of this over the capital actually employed.',
}));
QQ('ar_capvalue', ar({
  t: 4, d: 2, c: 'understanding', key: 'c',
  a: 'Under the capitalisation of average profit method, goodwill is the capitalised value of the average profit less the capital actually employed.',
  r: 'The capitalised value of average profit is found by multiplying the average profit by the normal rate of return.',
  sol: 'A is true. R is false: the capitalised value is average profit × 100 ÷ normal rate, the capital that would earn that profit at the normal rate.',
}));
QQ('tf_capequal', tf({
  t: 4, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? The accountant of an imagined river-ferry service values its goodwill twice from one set of figures at a normal rate of 12%: first by capitalising the super profit, then by capitalising the average profit and deducting the capital employed. If her arithmetic is right, the two answers will be equal.',
  sol: 'Super profit × 100 ÷ rate = (average profit − capital employed × rate ÷ 100) × 100 ÷ rate = average profit × 100 ÷ rate − capital employed. The two methods are the same formula rearranged.',
}));
const GT = { avg: 126000, nrr: 14, ce: 750000 };
const GTg = goodwillAll({ avg: GT.avg, capitalEmployed: GT.ce, nrr: GT.nrr });
same(GTg.capValue, 900000, 'n_cap_avg capitalised'); same(GTg.byCapAvg, 150000, 'n_cap_avg');
QQ('n_cap_avg', numQ({
  t: 4, d: 3, c: 'application', value: GTg.byCapAvg,
  stem: `An imagined tour operator in Gangtok earns an average profit of ${rs(GT.avg)} on capital employed of ${rs(GT.ce)}. The normal rate of return for tour operators is ${pc(GT.nrr)}. Find its goodwill by **capitalising the average profit** (in ₹).`,
  sol: `Capitalised value = ${inr(GT.avg)} × 100 ÷ 14 = ${inr(GTg.capValue)}; goodwill = ${inr(GTg.capValue)} − ${inr(GT.ce)} = ${rs(GTg.byCapAvg)}.`,
}));
const BS = { sp: 21000, nrr: 15 };
const BSg = same(capitalise(BS.sp, BS.nrr), 140000, 'n_cap_super');
QQ('n_cap_super', numQ({
  t: 4, d: 2, c: 'application', value: BSg,
  stem: `An imagined silk-weaving firm in Bhagalpur earns ${rs(BS.sp)} a year more than a normal firm of its size (its super profit). The normal rate of return in weaving is ${pc(BS.nrr)}. Find its goodwill by **capitalising the super profit** (in ₹).`,
  sol: `Goodwill = ${inr(BS.sp)} × 100 ÷ 15 = ${rs(BSg)}.`,
}));
const MY = { avg: 96000, ce: 600000, nrr: 12 };
const MYg = goodwillAll({ avg: MY.avg, capitalEmployed: MY.ce, nrr: MY.nrr });
same(MYg.byCapSuper, 200000, 's2_cap_super');
QQ('s2_cap_super', short({
  t: 4, d: 2, c: 'application', marks: 2,
  stem: `An imagined incense-stick (agarbatti) maker in Mysuru earns an average profit of ${rs(MY.avg)} on capital employed of ${rs(MY.ce)}. The normal rate of return is ${pc(MY.nrr)}. Value its goodwill by **capitalising the super profit**.`,
  model: lines(
    `Normal profit = ${rs(MY.ce)} × 12 ÷ 100 = ${rs(MYg.normal)}; super profit = ${rs(MY.avg)} − ${rs(MYg.normal)} = ${rs(MYg.superProfit)}.`,
    `Goodwill = ${rs(MYg.superProfit)} × 100 ÷ 12 = **${rs(MYg.byCapSuper)}**.`,
  ),
  sol: 'Find the super profit first, then capitalise it at the normal rate.',
  scheme: [['Super profit', 1], ['Capitalised super profit', 1]],
}));
const TJ = { gw: 160000, ce: 640000, nrr: 12.5 };
const TJcap = TJ.gw + TJ.ce;
const TJavg = same((TJcap * TJ.nrr) / 100, 100000, 's2_find_avg');
check(capitalise(TJavg, TJ.nrr) - TJ.ce === TJ.gw, 's2_find_avg reverse check');
QQ('s2_find_avg', short({
  t: 4, d: 3, c: 'analysis', marks: 2,
  stem: `The goodwill of an imagined art-plate workshop in Thanjavur, found by capitalising its average profit, is ${rs(TJ.gw)}. Its capital employed is ${rs(TJ.ce)} and the normal rate of return is ${pc(TJ.nrr)}. Work backwards to find its average profit.`,
  model: lines(
    `Capitalised value of average profit = goodwill + capital employed = ${rs(TJ.gw)} + ${rs(TJ.ce)} = ${rs(TJcap)}.`,
    `Average profit = ${rs(TJcap)} × 12.5 ÷ 100 = **${rs(TJavg)}**.`,
  ),
  sol: 'Reverse the method: rebuild the capitalised value, then apply the normal rate to it.',
  scheme: [['Capitalised value', 1], ['Average profit', 1]],
}));
const AL = { profits: [185000, 205000, 225000], assets: 1800000, liab: 400000, nrr: 12.5 };
const ALavg = same(average(AL.profits), 205000, 's3_cap_avg average');
const ALce = AL.assets - AL.liab;
const ALg = goodwillAll({ avg: ALavg, capitalEmployed: ALce, nrr: AL.nrr });
same(ALg.capValue, 1640000, 's3_cap_avg capitalised'); same(ALg.byCapAvg, 240000, 's3_cap_avg goodwill');
QQ('s3_cap_avg', short({
  t: [4, 5], d: 3, c: 'application', marks: 3,
  stem: `An imagined mustard-oil mill in Alwar earned profits of ${AL.profits.map(rs).join(', ')} in its last three years. Its assets (there is no goodwill or fictitious asset in the books) total ${rs(AL.assets)} and its outside liabilities ${rs(AL.liab)}. The normal rate of return is ${pc(AL.nrr)}. Value goodwill by **capitalising the average profit**.`,
  model: lines(
    `1. Average profit = ${inr(sum(AL.profits))} ÷ 3 = ${rs(ALavg)}; capital employed = ${inr(AL.assets)} − ${inr(AL.liab)} = ${rs(ALce)}.`,
    `2. Capitalised value = ${inr(ALavg)} × 100 ÷ 12.5 = ${rs(ALg.capValue)}.`,
    `3. Goodwill = ${inr(ALg.capValue)} − ${inr(ALce)} = **${rs(ALg.byCapAvg)}**.`,
  ),
  sol: 'Capitalise the average profit at the normal rate and subtract the net assets actually used.',
  scheme: [['Average profit and capital employed', 1], ['Capitalised value', 1], ['Goodwill', 1]],
}));
const SG = { avg: 108000, ce: 800000, nrr: 12 };
const SGg = goodwillAll({ avg: SG.avg, capitalEmployed: SG.ce, nrr: SG.nrr });
same(SGg.byCapAvg, 100000, 's3_both_cap');
QQ('s3_both_cap', short({
  t: [3, 4], d: 3, c: 'analysis', marks: 3,
  stem: `Two partners of an imagined tea-packaging firm in Siliguri disagree: one wants goodwill by capitalising the average profit, the other by capitalising the super profit. Average profit is ${rs(SG.avg)}, capital employed ${rs(SG.ce)} and the normal rate of return ${pc(SG.nrr)}. Work out both values and settle the dispute.`,
  model: lines(
    `1. Capitalising average profit: ${inr(SG.avg)} × 100 ÷ 12 = ${rs(SGg.capValue)}; less capital employed ${inr(SG.ce)} = **${rs(SGg.byCapAvg)}**.`,
    `2. Capitalising super profit: normal profit = ${inr(SG.ce)} × 12 ÷ 100 = ${inr(SGg.normal)}; super profit = ${inr(SGg.superProfit)}; × 100 ÷ 12 = **${rs(SGg.byCapSuper)}**.`,
    '3. Both give the same goodwill, so the choice of method does not matter here: the two methods are one formula written two ways when the same figures and rate are used.',
  ),
  sol: 'Compute both; the agreement follows algebraically from normal profit = capital employed × rate.',
  scheme: [['Capitalisation of average profit', 1], ['Capitalisation of super profit', 1], ['Conclusion', 1]],
}));
// l5_cap_both: Rourkela fabrication, horizontal balance sheet.
const RK = {
  liabilities: [["Sushanta's Capital", 600000, 'capital'], ["Lipika's Capital", 450000, 'capital'], ['General Reserve', 100000, 'reserve'], ['Creditors', 110000, 'outside'], ['Bank Loan', 240000, 'outside']],
  assets: [['Goodwill', 80000, 'goodwill'], ['Land and Building', 600000], ['Plant', 450000], ['Non-trade Investments', 70000, 'nti'], ['Stock', 150000], ['Debtors', 120000], ['Cash', 30000]],
  profits: [147000, 157000, 167000], div: 7000, nrr: 12,
};
const RKbs = balanceSheet({ liabilities: RK.liabilities, assets: RK.assets });
const RKce = capitalEmployed({ liabilities: RK.liabilities, assets: RK.assets });
same(RKce.ce, 1000000, 'l5_cap_both CE');
const RKn = normalise({ years: ['2023-24', '2024-25', '2025-26'], profits: RK.profits, adj: [0, 1, 2].map((y) => ({ y, label: 'dividend on non-trade investments', amount: -RK.div })) });
const RKavg = same(average(RKn.normal), 150000, 'l5_cap_both average');
const RKg = goodwillAll({ avg: RKavg, capitalEmployed: RKce.ce, nrr: RK.nrr });
same(RKg.byCapAvg, 250000, 'l5_cap_both goodwill');
QQ('l5_cap_both', long({
  t: [4, 5], d: 3, c: 'analysis', marks: 5,
  stem: lines(
    'Sushanta and Lipika own an imagined steel-fabrication shop in Rourkela. Their Balance Sheet as at 31 March 2026 was:',
    RKbs.md,
    `The shop's profits for 2023-24, 2024-25 and 2025-26 were ${RK.profits.map(rs).join(', ')}, each including a dividend of ${rs(RK.div)} on the non-trade investments. The normal rate of return is ${pc(RK.nrr)}. (a) Find the capital employed. (b) Value goodwill by capitalising the average profit. (c) Value goodwill by capitalising the super profit.`,
  ),
  model: lines(
    `**(a)** Capital employed = assets used in the business ${rs(RKce.usedTotal)} − outside liabilities ${rs(RKce.outsideTotal)} = **${rs(RKce.ce)}** (goodwill ${inr(80000)} and non-trade investments ${inr(70000)} left out).`,
    `**(b)** Average profit after removing the dividends = (${RKn.normal.map(inr).join(' + ')}) ÷ 3 = ${rs(RKavg)}. Capitalised value = ${inr(RKavg)} × 100 ÷ 12 = ${rs(RKg.capValue)}. Goodwill = ${inr(RKg.capValue)} − ${inr(RKce.ce)} = **${rs(RKg.byCapAvg)}**.`,
    `**(c)** Normal profit = ${inr(RKce.ce)} × 12 ÷ 100 = ${rs(RKg.normal)}; super profit = ${inr(RKavg)} − ${inr(RKg.normal)} = ${rs(RKg.superProfit)}. Goodwill = ${inr(RKg.superProfit)} × 100 ÷ 12 = **${rs(RKg.byCapSuper)}**, the same as in (b).`,
  ),
  sol: 'Exclude the investments from both capital employed and profit; the two capitalisation answers must agree.',
  scheme: [['Capital employed', 2], ['Average profit without dividends', 1], ['Goodwill by capitalising average profit', 1], ['Goodwill by capitalising super profit', 1]],
}));
const MN = { profits: [130000, 140000, 160000, 170000], ce: 1000000, nrr: 10, buy: 3 };
const MNavg = same(average(MN.profits), 150000, 'l5_all_methods average');
const MNg = goodwillAll({ avg: MNavg, capitalEmployed: MN.ce, nrr: MN.nrr, years: MN.buy });
same(MNg.byAverage, 450000, 'l5_all average'); same(MNg.bySuper, 150000, 'l5_all super'); same(MNg.byCapSuper, 500000, 'l5_all cap');
QQ('l5_all_methods', long({
  t: [2, 3, 4], d: 5, c: 'evaluation', marks: 5,
  stem: `An imagined homestay business in Munnar is to be sold. Its profits for the last four years were ${MN.profits.map(rs).join(', ')}; capital employed is ${rs(MN.ce)} and the normal rate of return ${pc(MN.nrr)}. (a) Value goodwill by (i) three years' purchase of average profit, (ii) three years' purchase of super profit and (iii) capitalisation of super profit. (b) The buyer insists on method (ii). Evaluate whether his position is reasonable.`,
  model: lines(
    `**(a)** Average profit = ${inr(sum(MN.profits))} ÷ 4 = ${rs(MNavg)}; normal profit = ${inr(MN.ce)} × 10 ÷ 100 = ${rs(MNg.normal)}; super profit = ${rs(MNg.superProfit)}.`,
    mdTable2(['Method', 'Working', 'Goodwill (₹)'], [
      ['(i) Average profit', `${inr(MNavg)} × 3`, inr(MNg.byAverage)],
      ['(ii) Super profit', `${inr(MNg.superProfit)} × 3`, inr(MNg.bySuper)],
      ['(iii) Capitalisation of super profit', `${inr(MNg.superProfit)} × 100 ÷ 10`, inr(MNg.byCapSuper)],
    ]),
    `**(b)** Reasonable: the buyer must put in ${rs(MN.ce)} of capital, which would earn ${rs(MNg.normal)} anywhere at the normal rate, so only the excess of ${rs(MNg.superProfit)} a year is due to the business's reputation. Method (i) charges him for normal profit too. But three years' purchase assumes the excess lasts only three years; if the homestay's reputation is likely to last, capitalising the super profit (as if it continues indefinitely) is fairer to the seller, so the years' purchase should be negotiated.`,
  ),
  sol: 'Compare what each method pays for: all profit, excess profit for a few years, or excess profit for ever.',
  scheme: [['Average, normal and super profit', 1], ['Goodwill by each of the three methods', 2], ['Evaluation of the buyer\'s position', 2]],
}));

QQ('mt_methods', match({
  t: [2, 3, 4], d: 2, c: 'understanding', marks: 2,
  stem: 'The seller of an imagined dhaba on a Punjab highway offers the buyer four ways to price its goodwill. Match each valuation formula with what the buyer is really paying for under it.',
  pairs: [
    ['Average profit × years\' purchase', 'All the profit, for a fixed number of years'],
    ['Weighted average profit × years\' purchase', 'All the profit, with recent years counting more'],
    ['Super profit × years\' purchase', 'Only the profit above normal, for a fixed number of years'],
    ['Super profit × 100 ÷ normal rate', 'The profit above normal, with no time limit'],
  ],
  sol: 'Average-profit methods pay for the whole profit; super-profit methods pay only for the excess over what the capital would earn anyway; capitalising treats the excess as lasting indefinitely.',
}));

// ================================================================ t05 Capital employed
QQ('m_ce_exclude', mcq({
  t: 5, d: 2, c: 'understanding',
  stem: 'While calculating the capital employed of an imagined cold-drinks bottler for goodwill, which balance-sheet item is **included** in the assets?',
  opts: ['Bottling machinery used in the plant', 'Goodwill bought when the firm took over a rival', 'Shares of an unrelated company held as non-trade investments', 'Debit balance of the Profit and Loss Account'],
  sol: 'Capital employed counts only assets used to earn the business\'s profit. Existing goodwill, non-trade investments and fictitious assets are left out.',
}));
const CC = { assets: 940000, gw: 60000, nti: 80000, liab: 200000 };
const CCce = same(CC.assets - CC.gw - CC.nti - CC.liab, 600000, 'm_ce_calc');
QQ('m_ce_calc', mcq({
  t: 5, d: 3, c: 'application',
  stem: `An imagined footwear wholesaler in Ambur has total assets of ${rs(CC.assets)}, including goodwill of ${rs(CC.gw)} and non-trade investments of ${rs(CC.nti)}. Its outside liabilities are ${rs(CC.liab)}. Its capital employed for valuing goodwill is`,
  opts: [rs(CCce), rs(CC.assets - CC.liab), rs(CC.assets - CC.gw - CC.liab), rs(CC.assets - CC.gw - CC.nti)],
  sol: `${inr(CC.assets)} − ${inr(CC.gw)} − ${inr(CC.nti)} − ${inr(CC.liab)} = ${rs(CCce)}.`,
}));
QQ('ar_ce', ar({
  t: 5, d: 3, c: 'understanding', key: 'b',
  a: 'Goodwill already appearing in a firm\'s balance sheet is left out when capital employed is calculated for valuing goodwill.',
  r: 'Goodwill is an intangible asset.',
  sol: 'Both are true, but R does not explain A: other intangibles used in the business, such as patents, are included. Goodwill is left out because it is the very thing being valued.',
}));
QQ('tf_fictitious_ce', tf({
  t: 5, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? The debit balance of the Profit and Loss Account on the assets side of an imagined hardware store\'s balance sheet is left out of its capital employed.',
  sol: 'It is a fictitious asset (an accumulated loss), not an asset used in the business, so it is excluded.',
}));
QQ('fb_ce', fb({
  t: 5, d: 1, c: 'recall',
  stem: 'For valuing a firm\'s goodwill, capital employed = total assets (excluding goodwill, non-trade investments and fictitious assets) − ___ liabilities.',
  acc: [['outside', 'external']],
  sol: 'Deduct the outside (external) liabilities: creditors, bills payable, loans and outstanding expenses.',
}));
const HS = { assets: 650000, gw: 40000, pl: 10000, creditors: 90000, od: 60000 };
const HSce = same(HS.assets - HS.gw - HS.pl - HS.creditors - HS.od, 450000, 'n_ce');
QQ('n_ce', numQ({
  t: 5, d: 2, c: 'application', value: HSce,
  stem: `An imagined electronics-repair firm in Hosur shows total assets of ${rs(HS.assets)}, including goodwill of ${rs(HS.gw)} and a debit balance of ${rs(HS.pl)} in the Profit and Loss Account. Its creditors are ${rs(HS.creditors)} and its bank overdraft ${rs(HS.od)}. Calculate its capital employed (in ₹).`,
  sol: `${inr(HS.assets)} − ${inr(HS.gw)} − ${inr(HS.pl)} − (${inr(HS.creditors)} + ${inr(HS.od)}) = ${rs(HSce)}.`,
}));
const RJ = { caps: [500000, 300000], gr: 70000, pl: 30000, gw: 40000, nti: 60000 };
const RJown = sum(RJ.caps) + RJ.gr + RJ.pl;
const RJce = same(RJown - RJ.gw - RJ.nti, 800000, 's2_ce_liab');
QQ('s2_ce_liab', short({
  t: 5, d: 2, c: 'application', marks: 2,
  stem: `An imagined auto-parts firm in Rajkot gives only the capital side of its balance sheet: partners' capitals ${RJ.caps.map(rs).join(' and ')}, General Reserve ${rs(RJ.gr)} and a credit balance of ${rs(RJ.pl)} in the Profit and Loss Account. The assets include goodwill of ${rs(RJ.gw)} and non-trade investments of ${rs(RJ.nti)}. Calculate the capital employed.`,
  model: lines(
    `Capitals and reserves = ${RJ.caps.map(inr).join(' + ')} + ${inr(RJ.gr)} + ${inr(RJ.pl)} = ${rs(RJown)}.`,
    `Capital employed = ${inr(RJown)} − goodwill ${inr(RJ.gw)} − non-trade investments ${inr(RJ.nti)} = **${rs(RJce)}**.`,
  ),
  sol: 'From the capital side: partners\' funds less the assets that do not count.',
  scheme: [['Capitals and reserves added', 1], ['Goodwill and investments deducted', 1]],
}));
const KS = {
  liabilities: [["Bhavna's Capital", 300000, 'capital'], ["Kishore's Capital", 200000, 'capital'], ['Creditors', 90000, 'outside'], ['Outstanding Expenses', 10000, 'outside'], ['Bank Loan', 150000, 'outside']],
  assets: [['Salt Pans and Sheds', 340000], ['Equipment', 160000], ['Goodwill', 40000, 'goodwill'], ['Non-trade Investments', 50000, 'nti'], ['Stock', 70000], ['Debtors', 60000], ['Cash', 20000], ['Profit and Loss Account (debit balance)', 10000, 'fictitious']],
};
const KSbs = balanceSheet(KS);
const KSce = capitalEmployed(KS);
same(KSce.ce, 400000, 's3_ce_bs');
QQ('s3_ce_bs', short({
  t: 5, d: 3, c: 'application', marks: 3,
  stem: lines(`The Balance Sheet of an imagined salt works in Kutch, owned by Bhavna and Kishore, as at 31 March 2026 was:`, KSbs.md, 'Calculate the capital employed for valuing goodwill, and check your answer from the capital side.'),
  model: lines(
    `1. Assets used in the business = ${KSce.used.map(([, a]) => inr(a)).join(' + ')} = ${rs(KSce.usedTotal)}; outside liabilities = ${KSce.outside.map(([, a]) => inr(a)).join(' + ')} = ${rs(KSce.outsideTotal)}.`,
    `2. Capital employed = ${inr(KSce.usedTotal)} − ${inr(KSce.outsideTotal)} = **${rs(KSce.ce)}**.`,
    `3. Check: capitals ${inr(KSce.ownTotal)} − (goodwill, investments and loss ${inr(KSce.excludedTotal)}) = ${inr(KSce.ce)}.`,
  ),
  sol: 'Goodwill, non-trade investments and the debit balance of profit and loss are left out; both routes must agree.',
  scheme: [['Assets used and outside liabilities', 1], ['Capital employed', 1], ['Check from the capital side', 1]],
}));
