// Objective items for ch07: multiple choice, assertion-reason, true-false, fill-blank, match, ordering.
// Every firm and person is imagined; every derived amount is computed and asserted.
import { mcq, ar, tf, fb, match, ord } from '../../cbse-11-accountancy-ch01/src/lib.mjs';
import { same, check, sum, inr, rs, slm, schedule, onSale, AP, BL, CP, CMP } from './figures.mjs';
import { QQ } from './qq.mjs';

// ================================================================ multiple choice: t01 (depreciation: meaning, causes, methods)
QQ('m_dep_meaning', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Gauri Textiles, an imagined firm in the imagined town of Sonpur, spreads the cost of its weaving machines, less any amount expected at the end, over the years in which the machines will serve the business. This process is called',
  opts: ['depreciation', 'appreciation', 'amortisation of goodwill only', 'revaluation of the machines'],
  sol: 'The allocation of the depreciable cost of a fixed asset over its useful life is depreciation. Appreciation is a rise in value, goodwill is not a machine, and revaluation means restating the value of an asset to a new figure.',
}));
QQ('m_dep_cause_obs', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Tarun Studio, an imagined photo studio, replaced its working camera printers with newer models after a new printing technology made them out of date, although they had many years of physical life left. The cause of depreciation here is',
  opts: ['obsolescence', 'wear and tear', 'expiry of legal rights', 'an accident'],
  sol: 'An asset that loses its usefulness because newer technology has replaced it is affected by obsolescence. The printers were still in working order, so wear and tear does not apply, no legal right ran out, and nothing abnormal such as an accident happened.',
}));
QQ('m_dep_cause_legal', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Pushkar Quarries, an imagined firm, took a mining lease for 15 years at a cost of ₹9,00,000 and spreads the cost over the 15 years of the lease. The cause of depreciation is',
  opts: ['expiry of legal rights', 'obsolescence', 'wear and tear', 'abnormal factors such as fire'],
  sol: 'A lease, patent or similar right is valid only for a fixed period, and its value falls to nothing when the period ends. That is a fall through the expiry of legal rights. The lease is not damaged by use, is not outdated by technology and has not been hit by an accident.',
}));
QQ('m_dep_noncash', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which statement about depreciation in the books of Lohit Foundry, an imagined firm, is correct?',
  opts: ['It is charged against revenue but no cash leaves the business when it is charged', 'It is paid in cash to the supplier of the asset every year', 'It is a gain that increases the profit of the year', 'It is charged only in the years in which the asset is sold'],
  sol: 'The cash for the asset was paid when it was bought. The yearly charge only spreads that cost against the revenue of each year, so it reduces profit without any cash outflow. It is neither a yearly payment, nor a gain, nor a charge made only on sale.',
}));
QQ('m_dep_factor', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'While deciding the yearly depreciation on a new lathe, Hari Tools, an imagined workshop, considers all of the following. Which one is NOT a factor that fixes the amount of depreciation?',
  opts: ['The selling price of the goods the lathe produces', 'The cost of the lathe', 'The estimated residual value of the lathe', 'The estimated useful life of the lathe'],
  sol: 'The amount of depreciation depends on the cost, the estimated residual value and the estimated useful life. The selling price of the goods produced affects profit, but it plays no part in working out depreciation.',
}));
{
  const cost = 360000;
  const scrap = 60000;
  const life = 5;
  const a = slm({ cost, scrap, life }).annual;
  same(a, 60000, 'm_slm_amount annual');
  QQ('m_slm_amount', mcq({
    t: 1, d: 2, c: 'application',
    stem: `Saket Dyes, an imagined firm, buys a dyeing machine for ${rs(cost)}. It expects the machine to work for ${life} years and to be worth ${rs(scrap)} at the end. Under the straight line method, the yearly depreciation is`,
    opts: [rs(a), rs(cost / life), rs((cost + scrap) / life), rs(scrap / life)],
    sol: `Depreciable cost is ${inr(cost)} − ${inr(scrap)} = ${inr(cost - scrap)}, and ${inr(cost - scrap)} ÷ ${life} = ${rs(a)}. The figure ${rs(cost / life)} ignores the residual value, ${rs((cost + scrap) / life)} adds the residual value instead of deducting it, and ${rs(scrap / life)} divides only the residual value by the life.`,
  }));
}
{
  const w = schedule({ cost: 200000, ratePct: 10, method: 'wdv', years: 2 });
  same(w[1].dep, 18000, 'm_wdv_second');
  QQ('m_wdv_second', mcq({
    t: 1, d: 2, c: 'application',
    stem: `Tulsi Cycles, an imagined firm, buys a machine for ${rs(200000)} and depreciates it at 10% a year by the written down value method. The depreciation for the second year is`,
    opts: [rs(w[1].dep), rs(w[0].dep), rs(w[0].dep + w[1].dep), rs((200000 * 10 * 9) / 1200)],
    sol: `The first-year charge is 10% of ${inr(200000)} = ${inr(w[0].dep)}, which leaves a book value of ${inr(w[0].closing)}. The second-year charge is 10% of that book value, ${rs(w[1].dep)}. The figure ${rs(w[0].dep)} is the straight line charge on cost, ${rs(w[0].dep + w[1].dep)} is the two years added together, and ${rs((200000 * 10 * 9) / 1200)} is a nine-month charge on cost.`,
  }));
}
QQ('m_slm_feature', mcq({
  t: 1, d: 1, c: 'understanding',
  stem: 'Under the straight line method, the depreciation charged to an asset of Veena Mills, an imagined firm, in each full year of its life is',
  opts: ['the same amount, because it is a fixed share of cost', 'higher in the early years and lower in the later years', 'lower in the early years and higher in the later years', 'a fixed per cent of the opening book value'],
  sol: 'The straight line method applies a fixed rate to the original cost, or divides the depreciable cost equally over the life, so each full year bears the same charge. A falling charge belongs to the written down value method, which works on the opening book value.',
}));
QQ('m_wdv_feature', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Under the written down value method, the yearly charge on a machine of Ganga Press, an imagined firm, falls from year to year because the rate is applied to',
  opts: ['the book value at the start of each year', 'the original cost every year', 'the residual value of the machine', 'the total depreciation charged so far'],
  sol: 'The rate is applied to the opening book value, and the book value falls each year as depreciation is deducted, so the charge falls too. Applying the rate to original cost would give an equal charge, which is the straight line method.',
}));
QQ('m_wdv_suits', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'Rupa Looms, an imagined firm, finds that the repair bills of its machines rise steadily as the machines age. It wants the total of depreciation and repairs charged to profit to stay fairly level from year to year. Which method of depreciation suits this aim better, and why?',
  opts: ['Written down value, because the falling depreciation offsets the rising repairs', 'Straight line, because the rising repairs offset the rising depreciation', 'Written down value, because it charges nothing in the first year', 'Straight line, because it charges less than the other method in every year'],
  sol: 'Under the written down value method the depreciation is heavy in the early years, when repairs are low, and light in the later years, when repairs are high, so the total burden stays more even. Under the straight line method depreciation is constant, so the total burden rises with repairs. Neither method charges nothing in the first year, and the straight line method does not charge less in every year.',
}));
{
  const s1 = CMP.s[0].dep;
  const w1 = CMP.w[0].dep;
  same(s1, w1, 'm_compare first year');
  QQ('m_compare', mcq({
    t: 1, d: 3, c: 'analysis',
    stem: `Dhruv Engineering, an imagined firm, buys a press for ${rs(500000)} and is deciding between the straight line method and the written down value method, each at 20% a year. For the first year of the press, the two methods give`,
    opts: [`the same charge of ${rs(s1)}`, `a higher charge under the straight line method`, `a higher charge under the written down value method`, 'no charge under the written down value method'],
    sol: `In the first year the opening book value equals the cost, so 20% of ${inr(500000)} = ${inr(s1)} under both methods. The two charges separate from the second year, when the written down value method charges ${inr(CMP.w[1].dep)} against ${inr(CMP.s[1].dep)}.`,
  }));
}
{
  const cost = 180000;
  const r = schedule({ cost, ratePct: 10, method: 'slm', years: 1, months: [8] })[0].dep;
  same(r, 12000, 'm_partyear');
  QQ('m_partyear', mcq({
    t: [1, 2], d: 3, c: 'application',
    stem: `Naman Packers, an imagined firm, whose books close on 31 March, bought a machine for ${rs(cost)} on 1 August 2026 and depreciates machinery at 10% a year on cost. The depreciation for the year ended 31 March 2027 is`,
    opts: [rs(r), rs((cost * 10) / 100), rs((cost * 10 * 10) / 1200), rs((cost * 10 * 6) / 1200)],
    sol: `The machine was used from 1 August to 31 March, which is 8 months, so the charge is ${inr(cost)} × 10% × 8/12 = ${rs(r)}. The full-year charge ${rs((cost * 10) / 100)} ignores the date of purchase, and ${rs((cost * 10 * 10) / 1200)} and ${rs((cost * 10 * 6) / 1200)} count ten months and six months.`,
  }));
}

// ================================================================ multiple choice: t02 (recording, disposal)
QQ('m_prov_method', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Deepa Looms, an imagined firm, records depreciation by crediting a Provision for Depreciation A/c each year. In its balance sheet the machinery account is shown at',
  opts: ['cost, with the provision shown as a deduction from it', 'cost less depreciation, with no provision shown', 'the market value of the machines', 'the residual value of the machines'],
  sol: 'When a provision account is kept, the asset account stays at original cost and the accumulated depreciation is shown as a deduction, so the net figure is the book value. Showing cost less depreciation with no provision is the direct method, and neither market value nor residual value is used.',
}));
QQ('m_entry_direct', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Ishaan Moulds, an imagined firm, charges depreciation directly to its Machinery A/c. The journal entry for the yearly depreciation is',
  opts: ['Depreciation A/c Dr. To Machinery A/c', 'Machinery A/c Dr. To Depreciation A/c', 'Depreciation A/c Dr. To Provision for Depreciation A/c', 'Profit and Loss A/c Dr. To Machinery A/c'],
  sol: 'Depreciation is an expense, so it is debited, and the asset falls in value, so the Machinery A/c is credited. The second entry has the sides reversed, the third belongs to the provision method, and the last one skips the Depreciation A/c, through which the charge is normally passed on to profit and loss.',
}));
QQ('m_entry_prov', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Jayant Fabrics, an imagined firm, keeps a Provision for Depreciation A/c. The entry that records the yearly depreciation is',
  opts: ['Depreciation A/c Dr. To Provision for Depreciation A/c', 'Depreciation A/c Dr. To Machinery A/c', 'Provision for Depreciation A/c Dr. To Depreciation A/c', 'Machinery A/c Dr. To Provision for Depreciation A/c'],
  sol: 'The expense is debited and the provision is credited, while the Machinery A/c is left untouched at cost. The second entry reduces the asset itself, the third reverses the sides, and the last would raise the cost of the machinery.',
}));
QQ('m_transfer_pl', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'At the end of the year, the Depreciation A/c of Kesar Mills, an imagined firm, is closed by transferring its balance to the',
  opts: ['debit side of the Profit and Loss A/c', 'credit side of the Profit and Loss A/c', 'debit side of the Capital A/c', 'credit side of the Machinery A/c'],
  sol: 'Depreciation is an expense of the year, so its balance goes to the debit of the Profit and Loss A/c, by the entry Profit and Loss A/c Dr. To Depreciation A/c. It is not an appropriation against capital, and it is not credited again to the asset.',
}));
QQ('m_disposal_acc', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Lalit Plastics, an imagined firm, keeps a Provision for Depreciation A/c and sells one of its machines during the year. The profit or loss on the sale is found by opening an',
  opts: ['Asset Disposal A/c', 'Suspense A/c', 'Drawings A/c', 'Capital Reserve A/c'],
  sol: 'When the asset stays at cost in its account, its cost, its accumulated depreciation and its sale proceeds are brought together in an Asset Disposal A/c, and the balancing figure is the profit or loss on sale. A suspense account holds an unexplained difference, and drawings and a capital reserve have nothing to do with the sale.',
}));
{
  const cost = 150000;
  const acc = 60000;
  const sale = 80000;
  const bv = cost - acc;
  const res = onSale(bv, sale);
  same(res, -10000, 'm_loss_sale');
  QQ('m_loss_sale', mcq({
    t: 2, d: 3, c: 'application',
    stem: `Neel Looms, an imagined firm, sells a machine that cost ${rs(cost)} and on which ${rs(acc)} of depreciation has been provided up to the date of sale. The sale price is ${rs(sale)}. The result of the sale is`,
    opts: [`a loss of ${rs(-res)}`, `a profit of ${rs(-res)}`, `a loss of ${rs(cost - sale)}`, `a profit of ${rs(sale - acc)}`],
    sol: `Book value = ${inr(cost)} − ${inr(acc)} = ${inr(bv)}. The machine is sold for ${inr(sale)}, which is ${inr(bv - sale)} less than the book value, so there is a loss of ${rs(-res)}. A loss of ${rs(cost - sale)} compares the sale price with cost and ignores the depreciation already charged.`,
  }));
}
QQ('m_sale_months', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'Mahesh Crafts, an imagined firm whose books close on 31 March, sold a machine on 1 October 2027. Depreciation on that machine for the year ended 31 March 2028 is charged for',
  opts: ['6 months, from 1 April to 30 September', '12 months, as the machine was in the books at the start of the year', '5 months, from 1 October to 31 March', 'no period, since the machine is no longer owned'],
  sol: 'Depreciation is charged up to the date of sale, which is the six months from 1 April to 30 September, so that the book value at sale is right. A full year would overcharge the machine, five months counts the period after the sale, and charging nothing would leave the book value too high.',
}));
{
  const y2 = AP.years[1];
  const ans = y2.closingAcc;
  same(ans, 116000, 'm_balance_prov');
  QQ('m_balance_prov', mcq({
    t: 2, d: 3, c: 'application',
    stem: `Asha Printers, an imagined firm, buys Machine A for ${rs(400000)} on 1 April 2025 and Machine B for ${rs(240000)} on 1 October 2025, and depreciates at 10% a year on cost under the provision method. The balance of its Provision for Depreciation A/c on 31 March 2027 is`,
    opts: [rs(ans), rs(y2.dep), rs(y2.closingBV), rs(AP.years[0].dep)],
    sol: `Year 1 charge: ${inr(AP.years[0].dep)}; year 2 charge: ${inr(y2.dep)}. The provision is the two charges added, ${rs(ans)}. The figure ${rs(y2.dep)} is only the second year, ${rs(y2.closingBV)} is the book value, which the provision does not show, and ${rs(AP.years[0].dep)} is only the first year.`,
  }));
}
QQ('m_disposal_side', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'Under the provision method, a machine of Omkar Plastics, an imagined firm, is sold at a loss. In the Asset Disposal A/c the cost of the machine and the loss on sale appear, respectively, on the',
  opts: ['debit side and credit side', 'credit side and debit side', 'debit side and debit side', 'credit side and credit side'],
  sol: 'The cost of the machine is debited to the Asset Disposal A/c, as it is transferred out of the Machinery A/c. The accumulated depreciation and the sale proceeds are credited, and when these fall short of cost the shortfall, the loss, is credited to balance the account and moved to the debit of the Profit and Loss A/c.',
}));

// ================================================================ multiple choice: t03 (provisions and reserves)
QQ('m_prov_def', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'Pranav Provisions, an imagined firm, charges ₹15,000 against its profit for repairs that it knows it will have to bear but whose exact cost is not yet known. This amount is a',
  opts: ['provision', 'reserve', 'drawing', 'capital receipt'],
  sol: 'An amount charged against profit for a known liability or loss whose amount cannot be stated exactly is a provision. A reserve is a part of profit kept back, drawings are the owner taking money out, and a capital receipt is money brought in as capital.',
}));
QQ('m_reserve_type', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Rohini Dairy, an imagined firm, sets aside ₹40,000 of its profit to meet a possible dip in future payouts to its owners. Such a reserve, kept for a stated purpose, is a',
  opts: ['specific reserve', 'general reserve', 'capital reserve', 'secret reserve'],
  sol: 'A revenue reserve created for a particular purpose, such as evening out future payouts, is a specific reserve. A general reserve has no stated purpose, a capital reserve comes out of capital profit, and a secret reserve is not shown in the books at all.',
}));
QQ('m_capital_res', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'Sudha Traders, an imagined firm, sold a plot of land for ₹3,50,000 more than its book value. The profit is a capital profit, and the firm decides to keep it in a reserve. The reserve is a',
  opts: ['capital reserve', 'general reserve', 'specific reserve', 'secret reserve'],
  sol: 'A reserve built out of a capital profit, such as the profit on the sale of a fixed asset, is a capital reserve. General and specific reserves come from the ordinary trading profit, and a secret reserve is hidden from the balance sheet.',
}));
QQ('m_secret', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Tarini Silks, an imagined firm, writes down the value of its stock in the balance sheet below its true value, which builds a reserve that the balance sheet does not disclose. This is a',
  opts: ['secret reserve', 'capital reserve', 'general reserve', 'provision for doubtful debts'],
  sol: 'A reserve that does not appear in the balance sheet, created by undervaluing assets or overvaluing liabilities, is a secret reserve. Capital and general reserves are shown openly, and a provision for doubtful debts is a charge for a likely loss on debtors.',
}));
QQ('m_prov_reserve_diff', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'Which one of the following correctly distinguishes a provision from a reserve in the books of Uma Stores, an imagined firm?',
  opts: ['A provision is charged before the profit is found, while a reserve is set aside out of profit already found', 'A provision is an appropriation of profit, while a reserve is a charge against profit', 'A provision is never shown in the balance sheet, while a reserve always is', 'A provision strengthens the business, while a reserve meets a known liability'],
  sol: 'A provision reduces the profit, because it is charged against it, while a reserve is part of the profit kept back after it has been found. The second statement reverses the two, a provision is shown in the balance sheet, and the purposes in the last option are also reversed.',
}));

// ================================================================ assertion-reason
QQ('ar_noncash', ar({
  t: 1, d: 3, c: 'understanding', verdict: 'both-true-explains',
  a: 'When Wasim Tools, an imagined firm, charges depreciation on its machines, its profit falls but its cash balance does not.',
  r: 'Depreciation spreads the cost of an asset that was already paid for, so no cash goes out when it is charged.',
  sol: 'Both are true. The cash was paid when the machine was bought, and the yearly charge only moves part of that cost to the profit and loss account, which explains why the cash balance stays the same.',
}));
QQ('ar_wdv_rate', ar({
  t: 1, d: 3, c: 'understanding', verdict: 'A-true-R-false',
  a: 'Under the written down value method, the depreciation charged is highest in the first year of the asset.',
  r: 'Under this method the rate is applied to the original cost of the asset every year.',
  sol: 'The assertion is true, because the book value is highest in the first year. The reason is false: the rate is applied to the opening book value, not to the original cost, which is what makes the charge fall.',
}));
QQ('ar_land', ar({
  t: [1, 2], d: 3, c: 'understanding', verdict: 'both-true-not-explains',
  a: 'Freehold land owned by Yamini Estates, an imagined firm, is usually not depreciated.',
  r: 'Land is a fixed asset of the business.',
  sol: 'Both are true, but the reason does not explain the assertion. Many fixed assets, such as machines, are depreciated, so being a fixed asset is not why land is left out. Land is usually not depreciated because it does not wear out and its useful life is unlimited.',
}));
QQ('ar_prov_profit', ar({
  t: 3, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'Creating a provision for repairs reduces the profit shown by Zarina Garages, an imagined firm, whereas creating a general reserve does not reduce the profit earned.',
  r: 'A provision is charged against profit, while a general reserve is set aside out of the profit that has already been found.',
  sol: 'Both are true. The provision is deducted in finding the profit, so the profit is lower, while the reserve is carved out of the profit after it has been found, so the profit earned is unchanged. The reason therefore explains the assertion.',
}));
QQ('ar_secret', ar({
  t: 3, d: 3, c: 'understanding', verdict: 'A-false-R-true',
  a: 'A secret reserve is shown on the liabilities side of the balance sheet under the heading of reserves.',
  r: 'A secret reserve may be created by undervaluing the assets of the business.',
  sol: 'The assertion is false, because a secret reserve is not disclosed in the balance sheet at all. The reason is true, since undervaluing assets is one way of building such a reserve, but it supports the idea of concealment rather than the assertion.',
}));

// ================================================================ true-false, fill-blank
QQ('tf_noncash_chk', tf({
  t: 1, d: 1, c: 'understanding', ans: false,
  stem: 'True or false: the depreciation charged for a year is an expense that is paid out in cash during that year.',
  sol: 'Depreciation is a non-cash expense: the cost of the asset was paid when it was bought, and the yearly charge only allocates part of that cost to the year.',
}));
QQ('tf_prov_cost', tf({
  t: 2, d: 2, c: 'understanding', ans: true,
  stem: 'True or false: when a Provision for Depreciation A/c is kept, the machinery account of an imagined firm continues to show the machines at their original cost.',
  sol: 'The depreciation is credited to the provision account, so the machinery account is not reduced and stays at cost until an asset is sold.',
}));
QQ('tf_reserve_loss', tf({
  t: 3, d: 2, c: 'understanding', ans: false,
  stem: 'True or false: an imagined firm that has made a loss for the year can create a general reserve out of that year\'s profit.',
  sol: 'A reserve is an appropriation of profit, so it needs profit to be set aside from. A year with a loss has no profit to appropriate, and a provision, unlike a reserve, may still be charged.',
}));
QQ('fb_slm_formula', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'Under the straight line method, yearly depreciation = (cost − ___) ÷ ___ of the asset.',
  acc: [['residual value', 'scrap value', 'salvage value', 'estimated residual value', 'net residual value'], ['estimated life', 'useful life', 'estimated useful life', 'life']],
  sol: 'The yearly charge is the cost less the residual value, divided by the estimated useful life, that is the residual value and the useful life.',
}));
QQ('fb_disposal', fb({
  t: 2, d: 2, c: 'recall',
  stem: 'Profit or loss on the sale of an asset is the sale proceeds less its ___ at the date of sale; when a provision account is kept, it is found in the ___ account.',
  acc: [['book value', 'written down value'], ['asset disposal', 'Asset Disposal']],
  sol: 'The comparison is made with the book value at the date of sale, and under the provision method the working is done in the asset disposal account.',
}));

// ================================================================ match, ordering
QQ('mt_causes', match({
  t: 1, d: 2, c: 'understanding',
  stem: 'Match each situation of an imagined firm in column A with the cause of depreciation in column B.',
  pairs: [
    ['A printing press loses its parts to years of daily running', 'Wear and tear'],
    ['A five-year licence to use a process ends after five years', 'Expiry of legal rights'],
    ['A film projector is replaced because digital projectors have arrived', 'Obsolescence'],
    ['A delivery van is badly damaged in a road accident', 'Abnormal factors'],
  ],
  sol: 'Daily running wears machines, a licence has a fixed period, new technology makes the older equipment out of date, and an accident is an abnormal event.',
}));
QQ('mt_reserves', match({
  t: 3, d: 2, c: 'understanding',
  stem: 'Match each reserve in column A of an imagined firm with its description in column B.',
  pairs: [
    ['General reserve', 'Revenue reserve kept from profit without a stated purpose'],
    ['Dividend equalisation reserve', 'Specific reserve kept to even out future payouts'],
    ['Capital reserve', 'Reserve built from a capital profit, such as a gain on sale of a fixed asset'],
    ['Secret reserve', 'Reserve not disclosed in the balance sheet'],
  ],
  sol: 'A general reserve has no stated use, a dividend equalisation reserve has one, a capital reserve comes from capital profit, and a secret reserve is hidden.',
}));
QQ('ord_slm_steps', ord({
  t: 1, d: 2, c: 'understanding',
  stem: 'Arrange in order the steps of finding the yearly depreciation on an asset of an imagined firm by the straight line method.',
  items: ['Note the cost of the asset', 'Deduct the estimated residual value to get the depreciable cost', 'Estimate the useful life in years', 'Divide the depreciable cost by the number of years'],
  sol: 'The cost comes first, then the residual value is taken off, the life is estimated, and the division gives the yearly charge.',
}));
QQ('ord_sale_entries', ord({
  t: 2, d: 3, c: 'application',
  stem: 'Marwar Metals, an imagined firm that keeps a Provision for Depreciation A/c, sells one machine. Arrange in order the accounting steps of the sale.',
  items: ['Charge depreciation on the machine up to the date of sale', 'Transfer the cost of the machine to the Asset Disposal A/c', 'Transfer the accumulated depreciation from the provision account to the Asset Disposal A/c', 'Transfer the profit or loss shown by the Asset Disposal A/c to the Profit and Loss A/c'],
  sol: 'The part-year charge is made first so that the book value at sale is right, then cost and accumulated depreciation are moved to the disposal account, and the balancing profit or loss goes to the profit and loss account.',
}));

void check;
void sum;
void BL;
void CP;
