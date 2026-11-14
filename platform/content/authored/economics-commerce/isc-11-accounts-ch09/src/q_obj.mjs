// Objective items of ISC 11 Accounts ch09: multiple choice, assertion-reason, true-false, fill-blank. Imagined firms;
// every figure is computed with dep.mjs and asserted. A distractor comes from a named wrong method and is stated by value.
import { mcq, ar, tf, fb } from './lib.mjs';
import { same, check, inr, rs, schedule, slm, onSale } from './dep.mjs';
import { QQ } from './qq.mjs';

// ================================================================ multiple choice
QQ('m_chk_cause', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'A press of Karimnagar Cables, an imagined firm, is in perfect working order, but a faster press has come on the market and the firm expects to replace the old one within two years. The main cause of depreciation on the old press is',
  opts: ['obsolescence', 'wear and tear', 'passage of time', 'depletion'],
  sol: 'The press has not been worn out, so wear and tear is not the cause; it has no fixed term, so passage of time does not apply; and nothing is being extracted from it, so there is no depletion. Being overtaken by a better design is obsolescence.',
}));
{
  const cost = 600000, prov = 210000;
  same(cost - prov, 390000, 'm_chk_prov book value');
  QQ('m_chk_prov', mcq({
    t: 3, d: 2, c: 'understanding',
    stem: `Machinery of Erode Elastics, an imagined firm, cost ${rs(cost)}. The Provision for Depreciation A/c shows a credit balance of ${rs(prov)} at the year end. In the balance sheet the machinery is shown as`,
    opts: [`machinery at ${rs(cost)} less provision ${rs(prov)}, giving ${rs(cost - prov)}`, `machinery at ${rs(cost)} and a liability of ${rs(prov)} on the other side`, `machinery at ${rs(cost + prov)}, being cost plus provision`, `machinery at ${rs(prov)} only`],
    sol: `The provision is a deduction from the asset, not a liability, so showing ${rs(cost)} with ${rs(prov)} as a liability is wrong. Adding the provision gives ${rs(cost + prov)}, which is above the cost. ${rs(prov)} alone ignores the cost.`,
  }));
}
QQ('m_def', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Nagercoil Netting, an imagined firm, charges depreciation every year on its net-making machine. Depreciation is best described as',
  opts: ['the gradual fall in the book value of a fixed asset because of its use, spread over its life', 'the fall in the market price of the asset on a given day', 'the money spent every year to repair the machine', 'a cash reserve kept aside to buy a new machine'],
  sol: 'Depreciation is a charge for the use of the asset. A market-price fall, a repair bill and a cash reserve are separate ideas: a repair keeps the machine working, and no cash is set aside when depreciation is charged.',
}));
{
  const w = schedule({ cost: 500000, ratePct: 12, method: 'wdv', years: 3 });
  check(w.map((r) => r.dep).join(',') === '60000,52800,46464', 'm_wdv_second charges');
  QQ('m_wdv_second', mcq({
    t: 2, d: 3, c: 'application',
    stem: `Gadag Gears, an imagined firm, bought a machine for ${rs(500000)} on 1 April 2026 and writes it down at 12% a year on the written down value. Depreciation for the year ended 31 March 2028 is`,
    opts: [rs(w[1].dep), rs(w[0].dep), rs(w[0].dep + w[1].dep), rs(w[2].dep)],
    sol: `Book value on 1 April 2027 = ${inr(500000)} − ${inr(w[0].dep)} = ${inr(w[1].opening)}. Depreciation = ${inr(w[1].opening)} × 12% = ${rs(w[1].dep)}. ${rs(w[0].dep)} is 12% of the cost (the first year), ${rs(w[0].dep + w[1].dep)} adds the two years together, and ${rs(w[2].dep)} is the charge for the third year.`,
  }));
}
QQ('m_prov_bal', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Salem Sacks, an imagined firm, charges depreciation through a Provision for Depreciation A/c. At the end of the third year the balance of that account equals',
  opts: ['the total depreciation charged up to that date on the assets still held', 'the depreciation charged in the third year alone', 'the book value of the assets held', 'the cost of the assets held'],
  sol: 'The provision collects depreciation year after year, so it holds the accumulated amount, not one year\'s charge. Book value is cost less this balance, and cost is the balance of the asset account.',
}));
{
  const bv = 840000 - 336000;
  same(bv, 504000, 'm_sale_bv book value');
  same(onSale(bv, 490000), -14000, 'm_sale_bv result');
  QQ('m_sale_bv', mcq({
    t: 4, d: 3, c: 'application',
    stem: `A lorry of Ongole Logistics, an imagined firm, cost ${rs(840000)} and the depreciation provided on it up to the date of sale was ${rs(336000)}. It was sold for ${rs(490000)}. The result on sale is`,
    opts: [`a loss of ${rs(14000)}`, `a profit of ${rs(14000)}`, `a profit of ${rs(490000 - 336000)}`, `a loss of ${rs(840000 - 490000)}`],
    sol: `Book value = ${inr(840000)} − ${inr(336000)} = ${inr(bv)}, which is above the price of ${inr(490000)}. A profit of ${rs(154000)} compares the price with the depreciation instead of the book value, and a loss of ${rs(350000)} compares it with the original cost.`,
  }));
}
QQ('m_cause_depl', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'A stone quarry of Tumakuru Granites, an imagined firm, yields less stone every year as the stone is taken out. The fall in the value of the quarry is a case of',
  opts: ['depletion', 'obsolescence', 'passage of time', 'wear and tear of a machine'],
  sol: 'A wasting asset is used up as the resource is removed, which is depletion. The quarry does not become out of date, its value does not depend on the end of a term, and it is not a machine that wears.',
}));
QQ('m_factors', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which one of the following does NOT directly decide the yearly charge by the straight line method for a boiler bought by Bidar Boilers, an imagined firm?',
  opts: ['The price the boiler would fetch in the market on the last day of the year', 'The cost of buying and installing the boiler', 'The number of years the firm expects to use it', 'The scrap value expected at the end of its life'],
  sol: 'The formula uses cost, scrap value and life. A day-to-day market price is not an input, because depreciation is an allocation of cost and not a revaluation.',
}));
{
  const r = slm({ cost: 400000, scrap: 40000, life: 9 });
  same(r.annual, 40000, 'm_slm_rate annual');
  same(r.ratePct, 10, 'm_slm_rate rate');
  QQ('m_slm_rate', mcq({
    t: 2, d: 3, c: 'application',
    stem: `A generator costing ${rs(400000)}, with an expected scrap value of ${rs(40000)} and a life of 9 years, is bought by Thane Thermals, an imagined firm. The rate of depreciation by the straight line method on cost is`,
    opts: ['10%', '11.11%', '90%', '9%'],
    sol: `Annual charge = (${inr(400000)} − ${inr(40000)}) ÷ 9 = ${inr(r.annual)}, and ${inr(r.annual)} ÷ ${inr(400000)} × 100 = 10%. 11.11% comes from dividing ${inr(400000)} by 9 without deducting the scrap value; 90% forgets to divide by the life; 9% confuses the life with the rate.`,
  }));
}
{
  const dep = 270000 * 10 * 10 / 1200;
  same(dep, 22500, 'm_part_months charge');
  QQ('m_part_months', mcq({
    t: 2, d: 3, c: 'application',
    stem: `Kovilpatti Kilns, an imagined firm, bought a kiln for ${rs(270000)} on 1 June 2027 and depreciates it at 10% a year on cost. Books close on 31 March. Depreciation for the year ended 31 March 2028 is`,
    opts: [rs(dep), rs(27000), rs(270000 * 10 * 11 / 1200), rs(270000 * 10 * 9 / 1200)],
    sol: `June to March is 10 months: ${inr(270000)} × 10% × 10/12 = ${inr(dep)}. ${rs(27000)} charges a full year, ${rs(24750)} counts 11 months, and ${rs(20250)} counts only 9 months.`,
  }));
}
QQ('m_wdv_feature', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Which one of the following statements about the written down value method, as used by Palwal Pumps, an imagined firm, is correct?',
  opts: ['The yearly charge falls as the book value falls, because a fixed rate is applied to the opening book value', 'The charge is the same every year', 'Scrap value is deducted from cost before the rate is applied', 'The book value reaches zero at the end of the asset\'s life'],
  sol: 'The base shrinks every year, so the charge shrinks too. An equal yearly charge describes the straight line method, scrap value is not part of the written down value calculation, and the book value is multiplied by one minus the rate each year, so it never reaches zero by itself.',
}));
QQ('m_asset_direct', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Dhubri Dyes, an imagined firm, credits depreciation straight to its Machinery A/c. After three years the balance of that account represents',
  opts: ['the book value of the machinery', 'the original cost of the machinery', 'the depreciation charged so far', 'the price the machinery will fetch on sale'],
  sol: 'Each credit reduces the debit balance, so what remains is cost less depreciation to date. The cost is the figure only under the provision method, the depreciation charged is the provision balance, and the future sale price is an estimate not recorded here.',
}));
QQ('m_prov_sale', mcq({
  t: 4, d: 3, c: 'understanding',
  stem: 'Rajkot Rollers, an imagined firm, keeps its machinery at cost with a Provision for Depreciation A/c and sells one machine during the year. Which treatment of the provision account is correct?',
  opts: ['Debit it with the accumulated depreciation on the machine sold, taking the amount to the Asset Disposal A/c', 'Credit it with the sale price of the machine', 'Leave it unchanged, since the Machinery A/c has been credited with the cost', 'Debit it with the loss on sale'],
  sol: 'The provision still holds depreciation of an asset that has gone, so that amount is removed and it forms one side of the disposal account. The sale price is credited to the disposal account and not to the provision, leaving it unchanged would overstate the provision, and the loss on sale belongs to the profit and loss account.',
}));
{
  const bv = 360000 - 144000;
  same(bv, 216000, 'm_disp_close book value');
  same(onSale(bv, 190000), -26000, 'm_disp_close result');
  QQ('m_disp_close', mcq({
    t: 4, d: 3, c: 'application',
    stem: `In the Asset Disposal A/c of Sikar Springs, an imagined firm, the machine sold is debited at its cost of ${rs(360000)}, and the accumulated depreciation of ${rs(144000)} and the sale price of ${rs(190000)} are credited. The balancing figure is`,
    opts: [`a loss of ${rs(26000)}, debited to the Profit and Loss A/c`, `a profit of ${rs(26000)}, credited to the Profit and Loss A/c`, `a loss of ${rs(360000 - 190000)}`, `a profit of ${rs(190000 - 144000)}`],
    sol: `Debit side ${inr(360000)}; credit side ${inr(144000)} + ${inr(190000)} = ${inr(144000 + 190000)}. The credit side is short by ${inr(26000)}, which is the loss. A profit of the same size has the wrong direction; ${rs(170000)} compares the price with cost; ${rs(46000)} compares the price with the depreciation alone.`,
  }));
}
{
  const w = schedule({ cost: 200000, ratePct: 10, method: 'wdv', years: 2 });
  same(w[1].closing, 162000, 'm_profit_calc book value');
  same(onSale(w[1].closing, 170000), 8000, 'm_profit_calc profit');
  QQ('m_profit_calc', mcq({
    t: 4, d: 3, c: 'application',
    stem: `Lonavala Lamps, an imagined firm, bought a machine for ${rs(200000)} on 1 April 2026 and wrote it down at 10% a year on the written down value. It sold the machine on 31 March 2028 for ${rs(170000)}. The result on sale is`,
    opts: [`a profit of ${rs(8000)}`, `a loss of ${rs(10000)}`, `a profit of ${rs(10000)}`, `a loss of ${rs(8000)}`],
    sol: `Year 1: ${inr(w[0].dep)}, so ${inr(w[0].closing)} is left; year 2: 10% of ${inr(w[1].opening)} = ${inr(w[1].dep)}, leaving ${inr(w[1].closing)}. Price ${inr(170000)} − ${inr(w[1].closing)} = ${rs(8000)}. A loss of ${rs(10000)} forgets the second year, and a profit of ${rs(10000)} uses straight line book value of ${inr(160000)}.`,
  }));
}
QQ('m_land', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which one of these fixed assets of Pathankot Printers, an imagined firm, would normally not be depreciated?',
  opts: ['Freehold land on which the press shed stands', 'The delivery van', 'The printing machine', 'Office furniture'],
  sol: 'Land does not wear out or become obsolete, so no depreciation is normally charged on it. A van, a machine and furniture all lose value with use.',
}));
{
  const dep = 300000 * 10 / 100 + 120000 * 10 * 3 / 1200;
  same(dep, 33000, 'm_additions_months total');
  QQ('m_additions_months', mcq({
    t: 4, d: 3, c: 'application',
    stem: `Neemuch Nuts, an imagined firm, had machinery costing ${rs(300000)} on 1 April 2027 and bought more for ${rs(120000)} on 1 January 2028. It charges 10% a year on cost. Total depreciation for the year ended 31 March 2028 is`,
    opts: [rs(dep), rs(42000), rs(30000), rs(39000)],
    sol: `Old machinery: ${inr(300000)} × 10% = ${inr(30000)}. New machinery for 3 months: ${inr(120000)} × 10% × 3/12 = ${inr(3000)}. Total ${inr(dep)}. ${rs(42000)} gives the new machinery a full year, ${rs(30000)} leaves it out, and ${rs(39000)} counts 9 months instead of 3.`,
  }));
}
{
  const s = schedule({ cost: 400000, ratePct: 20, method: 'slm', years: 3 });
  const w = schedule({ cost: 400000, ratePct: 20, method: 'wdv', years: 3 });
  const ts = s.reduce((a, r) => a + r.dep, 0), tw = w.reduce((a, r) => a + r.dep, 0);
  same(ts, 240000, 'm_compare_total slm');
  same(tw, 195200, 'm_compare_total wdv');
  QQ('m_compare_total', mcq({
    t: 2, d: 3, c: 'application',
    stem: `Sambhal Steels, an imagined firm, is choosing between the two methods for a furnace costing ${rs(400000)} at 20% a year. Over the first three years the straight line method charges how much more depreciation than the written down value method?`,
    opts: [rs(ts - tw), rs(tw), rs(ts), rs(w[2].dep)],
    sol: `Straight line: 3 × ${inr(s[0].dep)} = ${inr(ts)}. Written down value: ${inr(w[0].dep)} + ${inr(w[1].dep)} + ${inr(w[2].dep)} = ${inr(tw)}. The difference is ${inr(ts - tw)}. ${rs(tw)} and ${rs(ts)} are the two totals themselves, and ${rs(w[2].dep)} is only the third-year charge of the written down value method.`,
  }));
}
QQ('m_nature_prov', mcq({
  t: 3, d: 2, c: 'recall',
  stem: 'In the books of Cuddalore Clocks, an imagined firm, the Provision for Depreciation A/c is',
  opts: ['an account with a credit balance, deducted from the asset at cost in the balance sheet', 'an asset account with a debit balance', 'an expense account closed to the profit and loss account at the year end', 'a cash fund kept in the bank to replace the asset'],
  sol: 'It is a credit balance that reduces the asset. The depreciation expense account is a different account, and no cash or bank balance is set aside by this account.',
}));
QQ('m_loss_effect', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Silchar Stoves, an imagined firm, sold a fixed asset for less than its book value on the date of sale. The resulting loss is',
  opts: ['debited to the Profit and Loss A/c', 'credited to the Profit and Loss A/c', 'added to the cost of the next asset bought', 'carried forward as an asset in the balance sheet'],
  sol: 'A loss is an expense of the year and reduces profit, so the Profit and Loss A/c is debited. A credit is for a profit, and a loss is never capitalised into another asset.',
}));

// ================================================================ assertion-reason
QQ('ar_need', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'Brahmapur Boats, an imagined firm, would show too high a profit if it left out depreciation on its fleet.',
  r: 'Depreciation is the cost of using the fleet in the year, and leaving it out leaves that cost out of the expenses.',
  sol: 'Both statements are true, and the reason explains the assertion: a missing expense can only raise the profit.',
}));
QQ('ar_slm_wdv', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'A-true-R-false',
  a: 'Under the written down value method, a machine of Jorhat Jute Mills, an imagined firm, is charged less depreciation each year than in the year before.',
  r: 'The written down value method applies the rate to the original cost of the machine in every year.',
  sol: 'The assertion is true because the base falls each year. The reason is false: the rate is applied to the opening book value, and applying it to cost is the straight line method.',
}));
QQ('ar_prov', ar({
  t: 3, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'Mancherial Mills, an imagined firm, credits depreciation to a Provision for Depreciation A/c, so its Machinery A/c still shows the original cost after three years.',
  r: 'Depreciation is a non-cash charge to the profit and loss account.',
  sol: 'Both statements are true, but the reason does not explain the assertion. The cost stays in the account because depreciation was credited to a provision account instead of the asset.',
}));
QQ('ar_obsol', ar({
  t: 1, d: 2, c: 'understanding', verdict: 'both-false',
  a: 'Wokha Warehouses, an imagined firm, must depreciate its freehold land every year because land wears out through use.',
  r: 'Depreciation is charged only in the year in which the asset is sold.',
  sol: 'Both statements are false. Land does not wear out and is normally not depreciated, and depreciation is charged every year of use, not only on sale.',
}));
QQ('ar_disp', ar({
  t: 4, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'In the Asset Disposal A/c of a firm that keeps a provision account, the accumulated depreciation of the asset sold is shown on the credit side.',
  r: 'The asset is debited to the account at its cost, so the depreciation already provided has to be taken out to leave the book value.',
  sol: 'Both statements are true and the reason explains the assertion: cost less the credited depreciation gives the book value, which is then compared with the price.',
}));
QQ('ar_wdv_zero', ar({
  t: 2, d: 4, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'A machine of Tinsukia Tea Estates, an imagined firm, that is written down at 25% a year on the written down value never reaches a zero book value.',
  r: 'Under the straight line method the book value of an asset falls to its scrap value at the end of its life.',
  sol: 'Both statements are true, but the reason describes the other method and does not explain the assertion. Each written down value charge is only a part of what is left, so something always remains.',
}));

// ================================================================ true-false
QQ('tf_chk_wdv', tf({
  t: 2, d: 2, c: 'understanding', ans: false,
  stem: 'Under the written down value method, Hosur Harvesters, an imagined firm, applies the rate of 20% to the original cost of a machine in every year of its life.',
  sol: 'The rate is applied to the book value at the start of each year, so the yearly charge falls. Using the original cost every year is the straight line method.',
}));
QQ('tf_chk_disp', tf({
  t: 4, d: 2, c: 'understanding', ans: true,
  stem: 'A van of Panipat Parcels, an imagined firm, is sold for less than its book value on the date of sale. The difference is a loss and is debited to the Profit and Loss A/c.',
  sol: 'Book value higher than the price means a loss, and a loss is an expense of the year.',
}));
QQ('tf_land', tf({
  t: 1, d: 1, c: 'recall', ans: false,
  stem: 'Because land is a fixed asset, Bhatinda Bricks, an imagined firm, must charge depreciation on its freehold plot every year.',
  sol: 'Land has an unlimited life and does not wear out, so depreciation is normally not charged on it.',
}));
QQ('tf_prov_direct', tf({
  t: 3, d: 2, c: 'understanding', ans: true,
  stem: 'If Dibrugarh Drums, an imagined firm, credits depreciation to the asset account each year, it needs no Provision for Depreciation A/c.',
  sol: 'The accumulated depreciation is already taken off the asset, so there is nothing left for a separate provision to collect.',
}));
QQ('tf_sale_bv', tf({
  t: 4, d: 3, c: 'understanding', ans: false,
  stem: 'The profit on the sale of a machine by Rewa Rubber Works, an imagined firm, is the sale price less the original cost of the machine.',
  sol: 'The profit is the sale price less the book value on the date of sale, which is the cost less the depreciation provided up to that date.',
}));

// ================================================================ fill in the blanks
QQ('fb_chk_slm', fb({
  t: 2, d: 2, c: 'recall',
  stem: 'Under the straight line method, annual depreciation = (cost − ___) ÷ ___ in years.',
  acc: [['scrap value', 'residual value', 'salvage value', 'scrap'], ['life', 'useful life', 'estimated life', 'estimated useful life']],
  sol: 'The scrap value is taken off the cost, because it will be recovered, and the result is spread over the useful life in years.',
}));
QQ('fb_chk_sale', fb({
  t: 4, d: 2, c: 'recall',
  stem: 'In the Asset Disposal A/c the asset is debited at its ___ and the amount received on sale is entered on the ___ side.',
  acc: [['cost', 'original cost'], ['credit', 'cr']],
  sol: 'The disposal account starts with the cost of the asset on the debit side; the accumulated depreciation and the sale price are credited to it.',
}));
QQ('fb_causes', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'The fall in value of a machine of Mysuru Mills, an imagined firm, because a newer design has made it out of date is called ___.',
  acc: [['obsolescence']],
  sol: 'Loss of value from new inventions and changed fashions is obsolescence.',
}));
QQ('fb_wdv_basis', fb({
  t: 2, d: 2, c: 'recall',
  stem: 'Under the written down value method, the rate is applied to the ___ book value of each year.',
  acc: [['opening', 'beginning', 'opening book value', 'brought forward']],
  sol: 'The charge is the rate on the opening book value, the value at the start of that year.',
}));
QQ('fb_prov_side', fb({
  t: 3, d: 2, c: 'understanding',
  stem: 'When the provision method is used, Depreciation A/c is debited and the ___ A/c is credited.',
  acc: [['provision for depreciation', 'provision for depreciation a/c', 'accumulated depreciation']],
  sol: 'The credit goes to the provision for depreciation account, which is deducted from the asset at cost in the balance sheet.',
}));
