// Numerical, short-answer and long-answer items for ch07. Every derived amount is computed with extra.mjs and asserted.
import { short, long } from '../../cbse-11-accountancy-ch01/src/lib.mjs';
import { same, check, sum, inr, rs, mdTable, slm, schedule, onSale, fleet, compare, allocate, journal, AP, BL, CP, CMP, MF } from './figures.mjs';
import { QQ, numQ, S2, S3, L5 } from './qq.mjs';

/** Year-by-year schedule rows of one asset of a fleet: R(F, 'B')[0] is its first year. */
const R = (F, id) => F.per.find((p) => p.id === id).rows;

// ================================================================ numericals (t01, t02, t03)
{
  const o = { cost: 720000, scrap: 60000, life: 6 };
  const a = slm(o).annual;
  same(a, 110000, 'n_slm_annual');
  QQ('n_slm_annual', numQ({
    t: 1, d: 2, c: 'application', value: a, unit: '₹',
    stem: `Abhay Bottlers, an imagined firm, buys a bottling line for ${rs(o.cost)}. The line is expected to work for ${o.life} years and then to be sold as scrap for ${rs(o.scrap)}. Find the yearly depreciation under the straight line method (in ₹).`,
    sol: `Depreciable cost = ${inr(o.cost)} − ${inr(o.scrap)} = ${inr(o.cost - o.scrap)}. Yearly depreciation = ${inr(o.cost - o.scrap)} ÷ ${o.life} = ${rs(a)}.`,
  }));
}
{
  const o = { cost: 600000, scrap: 60000, life: 9 };
  const r = slm(o);
  same(r.annual, 60000, 'n_slm_rate annual');
  same(r.ratePct, 10, 'n_slm_rate');
  QQ('n_slm_rate', numQ({
    t: 1, d: 3, c: 'application', value: r.ratePct, unit: '%',
    stem: `Bela Bakers, an imagined firm, buys an oven for ${rs(o.cost)} that is expected to last ${o.life} years and to fetch ${rs(o.scrap)} at the end. Find the yearly depreciation as a per cent of the original cost under the straight line method (in %).`,
    sol: `Yearly depreciation = (${inr(o.cost)} − ${inr(o.scrap)}) ÷ ${o.life} = ${inr(r.annual)}. As a per cent of cost: ${inr(r.annual)} ÷ ${inr(o.cost)} × 100 = ${r.ratePct}%.`,
  }));
}
{
  const w = schedule({ cost: 300000, ratePct: 10, method: 'wdv', years: 3 });
  same(w[2].dep, 24300, 'n_wdv3');
  QQ('n_wdv3', numQ({
    t: 1, d: 2, c: 'application', value: w[2].dep, unit: '₹',
    stem: `Chandan Carpets, an imagined firm, buys a loom for ${rs(300000)} on 1 April 2025 and depreciates it at 10% a year by the written down value method. Find the depreciation for the year ended 31 March 2028 (in ₹).`,
    sol: `Year 1: 10% of ${inr(300000)} = ${inr(w[0].dep)}, book value ${inr(w[0].closing)}. Year 2: 10% of ${inr(w[1].opening)} = ${inr(w[1].dep)}, book value ${inr(w[1].closing)}. Year 3: 10% of ${inr(w[2].opening)} = ${rs(w[2].dep)}.`,
  }));
}
{
  const w = schedule({ cost: 250000, ratePct: 20, method: 'wdv', years: 3 });
  same(w[2].closing, 128000, 'n_wdv_bv');
  QQ('n_wdv_bv', numQ({
    t: 1, d: 3, c: 'application', value: w[2].closing, unit: '₹',
    stem: `Dinkar Weavers, an imagined firm, buys a machine for ${rs(250000)} and depreciates it at 20% a year by the written down value method. Find the book value of the machine at the end of the third year (in ₹).`,
    sol: `Year 1: 20% of ${inr(250000)} = ${inr(w[0].dep)}, leaving ${inr(w[0].closing)}. Year 2: 20% of ${inr(w[1].opening)} = ${inr(w[1].dep)}, leaving ${inr(w[1].closing)}. Year 3: 20% of ${inr(w[2].opening)} = ${inr(w[2].dep)}, leaving ${rs(w[2].closing)}.`,
  }));
}
{
  const cost = 240000;
  const r = schedule({ cost, ratePct: 15, method: 'wdv', years: 1, months: [10] })[0];
  same(r.dep, 30000, 'n_partyear_wdv');
  QQ('n_partyear_wdv', numQ({
    t: [1, 2], d: 3, c: 'application', value: r.dep, unit: '₹',
    stem: `Eklavya Engineering, an imagined firm with books closing on 31 March, bought a machine for ${rs(cost)} on 1 June 2026 and depreciates machinery at 15% a year by the written down value method. Find the depreciation for the year ended 31 March 2027 (in ₹).`,
    sol: `The machine was used from 1 June 2026 to 31 March 2027, which is 10 months. Depreciation = ${inr(cost)} × 15% × 10/12 = ${rs(r.dep)}.`,
  }));
}
{
  const F = fleet({
    rate: 20, method: 'wdv', years: 2, fy0: 2025,
    items: [{ id: 'A', label: 'old machinery', cost: 400000, year: 1, months: 12, date: '1 April 2025' }, { id: 'B', label: 'new machine', cost: 240000, year: 2, months: 6, date: '1 October 2026' }],
  });
  const y = F.years[1];
  same(y.openingBV, 320000, 'n_two_asset opening book value');
  same(y.dep, 88000, 'n_two_asset');
  const oldDep = R(F, 'A')[1].dep;
  const newDep = R(F, 'B')[0].dep;
  same(oldDep + newDep, y.dep, 'n_two_asset parts');
  QQ('n_two_asset', numQ({
    t: 2, d: 4, c: 'application', value: y.dep, unit: '₹',
    stem: `Falak Presses, an imagined firm, showed machinery at a book value of ${rs(y.openingBV)} on 1 April 2026. On 1 October 2026 it bought a new machine for ${rs(240000)}. Depreciation is 20% a year by the written down value method and the books close on 31 March. Find the total depreciation for the year ended 31 March 2027 (in ₹).`,
    sol: `Old machinery: 20% of ${inr(y.openingBV)} = ${inr(oldDep)}. New machine, 6 months: ${inr(240000)} × 20% × 6/12 = ${inr(newDep)}. Total = ${inr(oldDep)} + ${inr(newDep)} = ${rs(y.dep)}.`,
  }));
}
QQ('n_total_dep', numQ({
  t: 2, d: 3, c: 'application', value: AP.totalDep, unit: '₹',
  stem: `Gagan Printers, an imagined firm, bought Machine A for ${rs(400000)} on 1 April 2025 and Machine B for ${rs(240000)} on 1 October 2025. It depreciates machinery at 10% a year on cost, closes its books on 31 March, and sold Machine B on 1 January 2028. Find the total depreciation charged on both machines up to 31 March 2028 (in ₹).`,
  sol: `${AP.work.md}\n\nTotal depreciation = ${inr(AP.years[0].dep)} + ${inr(AP.years[1].dep)} + ${inr(AP.years[2].dep)} = ${rs(AP.totalDep)}.`,
}));
const BLB = R(BL, 'B');
const BLA = R(BL, 'A');
const APB = R(AP, 'B');
const CPB = R(CP, 'B');
same(BLB[0].dep, 24000, 'Machine B first-year charge (Bhavani Looms)');
QQ('n_bv_sale', numQ({
  t: 2, d: 3, c: 'application', value: BL.years[2].sold.bv, unit: '₹',
  stem: `Hemant Looms, an imagined firm, bought Machine A for ${rs(300000)} on 1 April 2025 and Machine B for ${rs(160000)} on 1 July 2026, and depreciates machinery at 20% a year by the written down value method, with books closing on 31 March. Machine B was sold on 1 October 2027. Find the book value of Machine B on the date of sale (in ₹).`,
  sol: `Year ended 31 March 2027, 9 months: ${inr(160000)} × 20% × 9/12 = ${inr(BLB[0].dep)}, book value ${inr(BLB[0].closing)}. Up to 1 October 2027, 6 months: ${inr(BLB[1].opening)} × 20% × 6/12 = ${inr(BLB[1].dep)}. Book value at sale = ${inr(BLB[1].opening)} − ${inr(BLB[1].dep)} = ${rs(BL.years[2].sold.bv)}.`,
}));
QQ('n_loss_ap', numQ({
  t: 2, d: 3, c: 'application', value: -AP.years[2].sold.result, unit: '₹',
  stem: `Ila Printers, an imagined firm, bought a machine for ${rs(240000)} on 1 October 2025 and sold it on 1 January 2028 for ${rs(180000)}. It depreciates machinery at 10% a year on cost and closes its books on 31 March. Find the loss on sale (in ₹).`,
  sol: `Year ended 31 March 2026, 6 months: ${inr(APB[0].dep)}. Year ended 31 March 2027: ${inr(APB[1].dep)}. Up to 1 January 2028, 9 months: ${inr(APB[2].dep)}. Book value at sale = ${inr(240000)} − ${inr(AP.years[2].sold.acc)} = ${inr(AP.years[2].sold.bv)}. Loss = ${inr(AP.years[2].sold.bv)} − ${inr(180000)} = ${rs(-AP.years[2].sold.result)}.`,
}));
same(BLA[0].dep + BLA[1].dep + BLA[2].dep, BL.years[2].closingAcc, 'Machine A accumulated depreciation');
QQ('n_prov_after', numQ({
  t: 2, d: 4, c: 'application', value: BL.years[2].closingAcc, unit: '₹',
  stem: `Indira Looms, an imagined firm, bought Machine A for ${rs(300000)} on 1 April 2025 and Machine B for ${rs(160000)} on 1 July 2026, depreciates at 20% a year by the written down value method and keeps a Provision for Depreciation A/c. Machine B was sold on 1 October 2027 and the books close on 31 March. Find the balance of the Provision for Depreciation A/c on 31 March 2028 after the sale (in ₹).`,
  sol: `${BL.years[2].prov.provision.md}\n\nMachine A has had ${inr(BLA[0].dep)} + ${inr(BLA[1].dep)} + ${inr(BLA[2].dep)} = ${rs(BL.years[2].closingAcc)} of depreciation, so that is what remains in the provision account; the share of Machine B, ${inr(BL.years[2].sold.acc)}, was transferred to the Asset Disposal A/c.`,
}));
{
  const y = CP.years[1];
  QQ('n_profit_cp', numQ({
    t: 2, d: 3, c: 'application', value: y.sold.result, unit: '₹',
    stem: `Jaya Packaging, an imagined firm, bought a machine for ${rs(120000)} on 1 July 2025 and sold it on 1 October 2026 for ${rs(110000)}. It depreciates machinery at 10% a year on cost and closes its books on 31 March. Find the profit on sale (in ₹).`,
    sol: `Year ended 31 March 2026, 9 months: ${inr(120000)} × 10% × 9/12 = ${inr(CPB[0].dep)}. Up to 1 October 2026, 6 months: ${inr(CPB[1].dep)}. Book value at sale = ${inr(120000)} − ${inr(y.sold.acc)} = ${inr(y.sold.bv)}. Profit = ${inr(110000)} − ${inr(y.sold.bv)} = ${rs(y.sold.result)}.`,
  }));
}
QQ('n_reserve', numQ({
  t: 3, d: 3, c: 'application', value: MF.resTotal, unit: '₹',
  stem: `Kishan Foods, an imagined firm, earned a profit of ${rs(200000)} before any provision. It charged ${rs(20000)} as a provision for repairs and then transferred 10% of the net profit to general reserve. Find the amount transferred to general reserve (in ₹).`,
  sol: `Net profit = ${inr(200000)} − ${inr(20000)} = ${inr(MF.net)}. The provision is charged first, so the reserve is 10% of ${inr(MF.net)} = ${rs(MF.resTotal)}, and ${inr(MF.left)} stays in the business as profit.`,
}));

// ================================================================ short answer, 2 marks
QQ('s2_dep_meaning', short({
  t: 1, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'Define depreciation and state one feature of it.',
  model: '**Depreciation** is the decline in the value of a fixed asset through use, passage of time or obsolescence, charged by spreading its depreciable cost over its useful life. It is a **non-cash expense** charged against the revenue of each year.',
  sol: 'Meaning and one feature.',
  scheme: [['Definition: fall in the value of a fixed asset, cost spread over life', 1], ['One feature, for example non-cash expense', 1]],
}));
QQ('s2_causes', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two causes of depreciation, giving one example of each from the books of Ajay Cycles, an imagined firm.',
  model: '(a) **Wear and tear:** the welding machines of Ajay Cycles lose efficiency through daily use. (b) **Obsolescence:** a cutting machine is replaced because a newer, faster model is available even though it still works.',
  sol: 'Two causes with an example each.',
  scheme: [['First cause with example', 1], ['Second cause with example', 1]],
}));
QQ('s2_need', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Give two reasons why Bhoomi Traders, an imagined firm, must charge depreciation every year even though no cash is paid out.',
  model: '(a) **Matching:** the cost of an asset helps earn revenue over several years, so a part of it must be charged against each year\'s revenue. (b) **True profit and position:** without it, profit is overstated and the asset is shown at more than it is worth.',
  sol: 'Two reasons from matching, true profit, true financial position, replacement and tax.',
  scheme: [['First reason explained', 1], ['Second reason explained', 1]],
}));
QQ('s2_slm_merit', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State one merit and one limitation of the straight line method of depreciation.',
  model: '**Merit:** it is simple to understand and apply, and the charge is the same each year. **Limitation:** the charge stays equal even though repairs rise in later years, so the total burden on profit is uneven.',
  sol: 'One advantage and one drawback.',
  scheme: [['One merit', 1], ['One limitation', 1]],
}));
QQ('s2_wdv_merit', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State one merit and one limitation of the written down value method of depreciation.',
  model: '**Merit:** the heavy charge in the early years is offset by lower repairs, and the later fall in depreciation is offset by rising repairs, so the total burden is more even. **Limitation:** the book value never falls to nil, and the calculation is harder.',
  sol: 'One advantage and one drawback.',
  scheme: [['One merit', 1], ['One limitation', 1]],
}));
QQ('s2_two_ways', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Name the two ways of recording depreciation in the books and state how the asset appears in the balance sheet under each.',
  model: '(a) **Charging depreciation to the asset account:** the asset is shown at cost less depreciation to date, that is, at book value. (b) **Creating a provision for depreciation account:** the asset is shown at original cost, with the provision deducted from it.',
  sol: 'The direct way and the provision way.',
  scheme: [['Direct charge: shown at book value', 1], ['Provision account: cost shown, provision deducted', 1]],
}));
QQ('s2_disposal_def', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is an Asset Disposal A/c? When does Chetna Mills, an imagined firm, open it?',
  model: 'An **Asset Disposal A/c** is a temporary account in which the cost, the accumulated depreciation and the sale proceeds of an asset are brought together to find the profit or loss on its sale. It is opened when an asset is sold and a provision for depreciation account is kept.',
  sol: 'A temporary account to find the result of a sale, used under the provision method.',
  scheme: [['Purpose: to find profit or loss on sale', 1], ['Used when a provision account is kept and an asset is sold', 1]],
}));
QQ('s2_prov_meaning', short({
  t: 3, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'What is a provision? Give one example.',
  model: 'A **provision** is an amount charged against profit for a known liability or a likely loss whose exact amount is not certain. **Example:** a provision for doubtful debts, or a provision for taxation.',
  sol: 'A charge against profit for a known liability or loss.',
  scheme: [['Charge against profit for a known liability or loss of uncertain amount', 1], ['Example', 1]],
}));
QQ('s2_secret', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is a secret reserve? State one way in which Dilip Spices, an imagined firm, could create one.',
  model: 'A **secret reserve** is a reserve that is not shown in the balance sheet, so outsiders cannot know of it. It can be created by undervaluing assets, for example by showing the stock below its true value, or by overvaluing liabilities.',
  sol: 'A reserve hidden from the balance sheet, built by undervaluing assets or overvaluing liabilities.',
  scheme: [['Meaning: not disclosed in the balance sheet', 1], ['One way of creating it', 1]],
}));
QQ('s2_importance', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two reasons why reserves are important to a business such as Esha Handlooms, an imagined firm.',
  model: '(a) Reserves **strengthen the financial position** of the business and help it meet unexpected losses without borrowing. (b) Reserves provide funds for **expansion**, and for evening out payouts to the owners in lean years.',
  sol: 'Any two of strengthening, meeting losses, expansion and even payouts.',
  scheme: [['First reason', 1], ['Second reason', 1]],
}));

// ================================================================ short answer, 3 marks
{
  const F = fleet({ rate: 10, method: 'slm', years: 1, fy0: 2026, items: [{ id: 'A', label: 'a machine', cost: 300000, year: 1, months: 12, date: '1 April 2026' }] });
  const y = F.years[0];
  same(y.dep, 30000, 's3_entries_direct');
  QQ('s3_entries_direct', short({
    t: 2, d: 2, c: 'application', marks: 3,
    stem: `Kunal Foods, an imagined firm, bought a machine for ${rs(300000)} on 1 April 2026 and charges depreciation at 10% a year on cost directly to the asset account. Pass the journal entries for the year ended 31 March 2027, including the transfer of depreciation to the Profit and Loss A/c.`,
    model: `${y.direct.journal.md}\n\nThe machine appears in the balance sheet at ${rs(y.closingBV)}.`,
    sol: 'Purchase, depreciation credited to the machinery account, then the transfer of the expense to profit and loss.',
    scheme: [['Purchase entry', 1], [`Depreciation entry for ${rs(y.dep)}`, 1], ['Transfer to the Profit and Loss A/c', 1]],
  }));
}
{
  const F = fleet({ rate: 10, method: 'slm', years: 1, fy0: 2026, items: [{ id: 'A', label: 'a machine', cost: 450000, year: 1, months: 12, date: '1 April 2026' }] });
  const y = F.years[0];
  same(y.closingCost - y.closingAcc, y.closingBV, 's3_entries_prov book value');
  QQ('s3_entries_prov', short({
    t: 2, d: 3, c: 'application', marks: 3,
    stem: `Lata Textiles, an imagined firm, bought a machine for ${rs(450000)} on 1 April 2026 and provides depreciation at 10% a year on cost by crediting a Provision for Depreciation A/c. Pass the journal entries for the year ended 31 March 2027 and show how the machine appears in the balance sheet on that date.`,
    model: `${y.prov.journal.md}\n\n**Balance sheet (assets side):** Machinery at cost ${inr(y.closingCost)}, less Provision for Depreciation ${inr(y.closingAcc)}, giving ${rs(y.closingBV)}.`,
    sol: 'Purchase, depreciation to the provision account, transfer to profit and loss, and the cost-less-provision presentation.',
    scheme: [['Purchase entry and depreciation entry', 1], ['Transfer to the Profit and Loss A/c', 1], ['Presentation: cost less provision', 1]],
  }));
}
{
  const F = fleet({
    rate: 10, method: 'slm', years: 1, fy0: 2026,
    items: [{ id: 'A', label: 'old machine', cost: 400000, year: 1, months: 12, date: '1 April 2026' }, { id: 'B', label: 'new machine', cost: 120000, year: 1, months: 5, date: '1 November 2026' }],
  });
  const y = F.years[0];
  same(y.dep, 45000, 's3_partyear total');
  QQ('s3_partyear', short({
    t: [1, 2], d: 3, c: 'application', marks: 3,
    stem: `Mohit Metals, an imagined firm, had a machine costing ${rs(400000)} in use on 1 April 2026 and bought another for ${rs(120000)} on 1 November 2026. It charges depreciation at 10% a year on cost and closes its books on 31 March. Find the depreciation on each machine for the year ended 31 March 2027 and the total.`,
    model: `Old machine, full year: ${inr(400000)} × 10% = ${inr(R(F, 'A')[0].dep)}.\n\nNew machine, 5 months (1 November to 31 March): ${inr(120000)} × 10% × 5/12 = ${inr(R(F, 'B')[0].dep)}.\n\nTotal depreciation = ${inr(R(F, 'A')[0].dep)} + ${inr(R(F, 'B')[0].dep)} = **${rs(y.dep)}**.`,
    sol: 'A full year on the old machine, five months on the new one, and the total.',
    scheme: [['Old machine: full year', 1], ['New machine: five months', 1], ['Total', 1]],
  }));
}
{
  const w = schedule({ cost: 100000, ratePct: 10, method: 'wdv', years: 2, months: [12, 3] });
  const bv = w[1].closing;
  const res = onSale(bv, 80000);
  same(w[1].dep, 2250, 's3_sale_calc depreciation to date of sale');
  same(bv, 87750, 's3_sale_calc book value');
  same(res, -7750, 's3_sale_calc result');
  QQ('s3_sale_calc', short({
    t: 2, d: 4, c: 'application', marks: 3,
    stem: `Naveen Mills, an imagined firm, bought a machine for ${rs(100000)} on 1 April 2025 and depreciates it at 10% a year by the written down value method, closing its books on 31 March. It sold the machine on 1 July 2026 for ${rs(80000)}. Find the depreciation up to the date of sale, the book value at the date of sale, and the profit or loss on sale.`,
    model: `Year ended 31 March 2026: 10% of ${inr(100000)} = ${inr(w[0].dep)}; book value ${inr(w[0].closing)}.\n\nDepreciation from 1 April to 30 June 2026, 3 months: ${inr(w[0].closing)} × 10% × 3/12 = **${rs(w[1].dep)}**.\n\nBook value at the date of sale = ${inr(w[0].closing)} − ${inr(w[1].dep)} = **${rs(bv)}**.\n\nLoss on sale = ${inr(bv)} − ${inr(80000)} = **${rs(-res)}**.`,
    sol: 'Three months of depreciation on the written down value, then book value, then sale price against book value.',
    scheme: [[`Depreciation up to the date of sale ${rs(w[1].dep)}`, 1], [`Book value at sale ${rs(bv)}`, 1], [`Loss on sale ${rs(-res)}`, 1]],
  }));
}
QQ('s3_compare', short({
  t: 1, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Distinguish between the straight line method and the written down value method of depreciation on three points.',
  model: '| Basis | Straight line method | Written down value method |\n|---|---|---|\n| Base for the rate | Original cost | Opening book value |\n| Yearly charge | Equal each year | Falls every year |\n| Book value | Can fall to the residual value or nil | Never falls to nil |',
  sol: 'Base, charge each year and book value.',
  scheme: [['Base of the rate', 1], ['Pattern of the yearly charge', 1], ['Effect on the book value', 1]],
}));
QQ('s3_reserve_types', short({
  t: 3, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Name three types of reserves and say in one line what each is.',
  model: '(a) **General reserve:** a revenue reserve made out of profit with no particular purpose. (b) **Specific reserve:** a revenue reserve made for a stated purpose, such as a dividend equalisation reserve. (c) **Capital reserve:** a reserve made out of a capital profit, for example from the sale of a fixed asset.',
  sol: 'General, specific and capital reserves; a secret reserve is also acceptable.',
  scheme: [['General reserve with meaning', 1], ['Specific reserve with meaning', 1], ['Capital reserve with meaning', 1]],
}));
QQ('s3_fund_view', short({
  t: [2, 3], d: 4, c: 'evaluation', marks: 3,
  stem: 'Pooja Garments, an imagined firm, has a Provision for Depreciation A/c with a credit balance of ₹2,40,000. Its partner says, "This balance means that ₹2,40,000 in cash has been kept aside to replace the machines." Do you agree? Give two reasons.',
  model: '**No, I do not agree.** (1) The provision is only an accounting entry. Crediting it records the cost already used up, but no money moves anywhere. (2) Cash is kept aside for replacement only if the firm separately invests an equal sum outside the business, and that is a different decision from charging depreciation.',
  sol: 'The provision is a book entry; cash exists only if invested separately.',
  scheme: [['Disagreement stated', 1], ['Provision is an accounting entry with no cash movement', 1], ['Cash needs a separate investment', 1]],
}));

// ================================================================ long answer, 5 marks: computations
QQ('l5_slm_ledger', long({
  t: [1, 2], d: 4, c: 'application', marks: 5,
  stem: `Asha Printers, an imagined firm, bought Machine A for ${rs(400000)} on 1 April 2025 and Machine B for ${rs(240000)} on 1 October 2025. It charges depreciation at 10% a year on cost by the straight line method, directly to the asset account, and closes its books on 31 March. On 1 January 2028 it sold Machine B for ${rs(180000)}. Prepare the Machinery A/c for the three years ended 31 March 2028.`,
  model: `**Working note (depreciation)**\n\n${AP.work.md}\n\nMachine B, year 3: 9 months to 31 December 2027, ${inr(240000)} × 10% × 9/12 = ${inr(APB[2].dep)}. Book value at sale = ${inr(240000)} − ${inr(AP.years[2].sold.acc)} = ${inr(AP.years[2].sold.bv)}; loss on sale = ${inr(AP.years[2].sold.bv)} − ${inr(180000)} = ${inr(-AP.years[2].sold.result)}.\n\n**Machinery A/c, year ended 31 March 2026**\n\n${AP.years[0].direct.mach.md}\n\n**Year ended 31 March 2027**\n\n${AP.years[1].direct.mach.md}\n\n**Year ended 31 March 2028**\n\n${AP.years[2].direct.mach.md}`,
  sol: 'Work out the yearly depreciation on each machine, including the part-years, then write each year\'s account and carry the balance down.',
  scheme: [['Depreciation worked out for each machine and year, including both part-years', 1], ['Machinery A/c for 2025–26', 1], ['Machinery A/c for 2026–27', 1], ['Year 2027–28: depreciation on both machines, sale proceeds and loss on sale', 1], ['Closing balance carried down and every account balanced', 1]],
}));
QQ('l5_wdv_ledger', long({
  t: [1, 2], d: 4, c: 'application', marks: 5,
  stem: `Bhavani Looms, an imagined firm, bought Machine A for ${rs(300000)} on 1 April 2025 and Machine B for ${rs(160000)} on 1 July 2026. It charges depreciation at 20% a year by the written down value method, directly to the asset account, and closes its books on 31 March. On 1 October 2027 it sold Machine B for ${rs(110000)}. Prepare the Machinery A/c for the three years ended 31 March 2028.`,
  model: `**Working note (depreciation)**\n\n${BL.work.md}\n\nMachine B: 9 months in 2026–27, ${inr(160000)} × 20% × 9/12 = ${inr(BLB[0].dep)}, book value ${inr(BLB[0].closing)}; 6 months in 2027–28, ${inr(BLB[1].opening)} × 20% × 6/12 = ${inr(BLB[1].dep)}. Book value at sale = ${inr(BL.years[2].sold.bv)}; loss on sale = ${inr(BL.years[2].sold.bv)} − ${inr(110000)} = ${inr(-BL.years[2].sold.result)}.\n\n**Machinery A/c, 2025–26**\n\n${BL.years[0].direct.mach.md}\n\n**2026–27**\n\n${BL.years[1].direct.mach.md}\n\n**2027–28**\n\n${BL.years[2].direct.mach.md}`,
  sol: 'Apply the rate to the opening book value of each machine, take part-years for the purchase and the sale, then write each year\'s account.',
  scheme: [['Depreciation worked out on the opening book values, with both part-years', 1], ['Machinery A/c for 2025–26', 1], ['Machinery A/c for 2026–27 with the purchase', 1], ['Year 2027–28: depreciation, sale proceeds and loss on sale', 1], ['Closing balance carried down and every account balanced', 1]],
}));
{
  const y1 = CP.years[0];
  const y2 = CP.years[1];
  QQ('l5_prov', long({
    t: 2, d: 5, c: 'application', marks: 5,
    stem: `Chitra Packaging, an imagined firm, bought Machine A for ${rs(600000)} on 1 April 2025 and Machine B for ${rs(120000)} on 1 July 2025. It provides depreciation at 10% a year on cost by the straight line method through a Provision for Depreciation A/c, and closes its books on 31 March. On 1 October 2026 it sold Machine B for ${rs(110000)}. Prepare the Machinery A/c and the Provision for Depreciation A/c for the two years ended 31 March 2027, and the Asset Disposal A/c.`,
    model: `**Depreciation:** 2025–26: ${inr(R(CP, 'A')[0].dep)} + ${inr(CPB[0].dep)} = ${inr(y1.dep)}; 2026–27: ${inr(R(CP, 'A')[1].dep)} on Machine A + ${inr(y2.sold.dep)} on Machine B up to 30 September 2026 = ${inr(y2.dep)}.\n\n**Machinery A/c, 2025–26**\n\n${y1.prov.mach.md}\n\n**2026–27**\n\n${y2.prov.mach.md}\n\n**Provision for Depreciation A/c, 2025–26**\n\n${y1.prov.provision.md}\n\n**2026–27**\n\n${y2.prov.provision.md}\n\n**Asset Disposal A/c**\n\n${y2.prov.disposal.md}\n\nBook value of Machine B at sale = ${inr(y2.sold.cost)} − ${inr(y2.sold.acc)} = ${inr(y2.sold.bv)}, so the sale gives a profit of ${inr(y2.sold.result)}.`,
    sol: 'The machinery account stays at cost; the provision account collects depreciation and loses the share of the machine sold; the disposal account finds the profit.',
    scheme: [['Depreciation for both years, with the part-years', 1], ['Machinery A/c for both years', 1], ['Provision for Depreciation A/c for both years', 1], ['Asset Disposal A/c with cost, accumulated depreciation and sale proceeds', 1], ['Profit on sale found and taken to the Profit and Loss A/c', 1]],
  }));
}
{
  const C = compare({ cost: 400000, ratePct: 25, years: 3 });
  same(C.totalSlm, 300000, 'l5_compare SLM total');
  same(C.totalWdv, 231250, 'l5_compare WDV total');
  QQ('l5_compare', long({
    t: 1, d: 4, c: 'analysis', marks: 5,
    stem: `Rekha Engineering, an imagined firm, buys a machine for ${rs(400000)} on 1 April 2026 and is considering a depreciation rate of 25% a year, by either the straight line method on cost or the written down value method. Prepare a table showing the depreciation and the book value at the end of each of the first three years under both methods, and state which method gives the higher charge in the third year and the lower total charge over the three years.`,
    model: `${C.md}\n\nIn the first year both methods charge ${inr(C.s[0].dep)}, since the opening book value equals the cost. In the third year the straight line method charges ${inr(C.s[2].dep)} against ${inr(C.w[2].dep)}, so it is **higher under the straight line method**. Over the three years the straight line method charges ${inr(C.totalSlm)} and the written down value method ${inr(C.totalWdv)}, so the **written down value method has the lower total**, because its rate is applied to a falling book value.`,
    sol: 'Tabulate both schedules, then compare the third-year charge and the totals.',
    scheme: [['Straight line column correct', 1], ['Written down value column correct', 2], ['Third-year comparison', 1], ['Totals compared with the reason', 1]],
  }));
}

// ================================================================ long answer, 5 marks: theory
QQ('l5_prov_reserve', long({
  t: 3, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Distinguish between provisions and reserves on five points.',
  model: '| Basis | Provision | Reserve |\n|---|---|---|\n| Nature | Charge against profit for a known liability or loss | Appropriation, a part of profit kept back |\n| Effect on profit | Reduces the profit | Does not reduce the profit earned |\n| Presentation | Deducted from an asset or shown among liabilities | Shown with the owners\' funds |\n| Purpose | To meet a known liability or loss | To strengthen the business |\n| Compulsion | Made even if there is no profit | Created only out of profit, by choice |',
  sol: 'Nature, effect on profit, presentation, purpose and compulsion.',
  scheme: [['Nature', 1], ['Effect on profit', 1], ['Presentation', 1], ['Purpose', 1], ['Compulsion', 1]],
}));
QQ('l5_causes_need', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain the causes of depreciation and the need for charging it.',
  model: '**Causes:** (1) wear and tear through use; (2) expiry of legal rights such as a lease or patent; (3) obsolescence, when newer technology makes an asset out of date; (4) abnormal factors such as accidents or fire.\n\n**Need:** (1) matching, so that each year bears the cost of the asset that helped earn its revenue; (2) true profit, since ignoring it overstates profit; (3) true financial position, so the asset is not shown at more than its worth; (4) funds for replacement, as profit not withdrawn stays in the business; (5) tax and legal needs.',
  sol: 'Four causes and the reasons for charging it every year.',
  scheme: [['Wear and tear, and expiry of legal rights explained', 1], ['Obsolescence and abnormal factors explained', 1], ['Matching and true profit', 1], ['True financial position', 1], ['Replacement and tax considerations', 1]],
}));

void check;
void sum;
void mdTable;
void allocate;
void journal;
void CMP;
