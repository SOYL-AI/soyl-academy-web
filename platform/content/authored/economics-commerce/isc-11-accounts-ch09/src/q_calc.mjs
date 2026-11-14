// Numerical and short-answer items (2 and 3 marks) of ISC 11 Accounts ch09. Imagined firms; every figure is computed with
// dep.mjs and asserted; every ledger and journal in a model answer is generated.
import { short, num } from './lib.mjs';
import { same, check, sum, inr, rs, fleet, track, slm, slmRate, schedule, onSale, journal, ledger, mdTable, monthsBetween } from './dep.mjs';
import { QQ, numQ } from './qq.mjs';

// ================================================================ numerical (rupees unless stated)
QQ('n_slm_annual', numQ({
  t: 2, d: 2, c: 'understanding',
  stem: `Chittoor Chains, an imagined firm, buys a machine for ${rs(950000)}. It expects the machine to last 15 years and to be sold as scrap for ${rs(50000)}. The annual depreciation by the straight line method is (in ₹)`,
  value: slm({ cost: 950000, scrap: 50000, life: 15 }).annual,
  sol: `Annual depreciation = (${inr(950000)} − ${inr(50000)}) ÷ 15 = ${inr(900000)} ÷ 15 = ₹60,000.`,
}));
same(slm({ cost: 950000, scrap: 50000, life: 15 }).annual, 60000, 'n_slm_annual');
{
  const r = slmRate({ cost: 300000, scrap: 30000, life: 6 });
  same(r.annual, 45000, 'n_slm_rate annual');
  same(r.ratePct, 15, 'n_slm_rate rate');
  QQ('n_slm_rate', num({
    t: 2, d: 3, c: 'application', unit: '%', value: 15, tol: 0,
    stem: `Hindupur Hinges, an imagined firm, buys a drilling machine for ${rs(300000)}, expecting a life of 6 years and a scrap value of ${rs(30000)}. The rate of depreciation on cost by the straight line method is (in per cent)`,
    sol: `Annual charge = (${inr(300000)} − ${inr(30000)}) ÷ 6 = ${inr(45000)}. Rate = ${inr(45000)} ÷ ${inr(300000)} × 100 = 15%.`,
    scheme: [['Correct answer: 15%', 1]],
  }));
}
{
  const w = schedule({ cost: 800000, ratePct: 15, method: 'wdv', years: 3 });
  same(w[2].dep, 86700, 'n_wdv_third');
  QQ('n_wdv_third', numQ({
    t: 2, d: 3, c: 'application',
    stem: `Bellary Boilers, an imagined firm, bought a plant for ${rs(800000)} on 1 April 2026 and depreciates it at 15% a year on the written down value. The depreciation for the year ended 31 March 2029 is (in ₹)`,
    value: w[2].dep,
    sol: `Year 1: ${inr(w[0].dep)}, leaving ${inr(w[0].closing)}. Year 2: 15% of ${inr(w[1].opening)} = ${inr(w[1].dep)}, leaving ${inr(w[1].closing)}. Year 3: 15% × ${inr(w[2].opening)} = ₹86,700.`,
  }));
}
{
  const m = monthsBetween('1 September 2027', '31 March 2028');
  same(m, 7, 'n_part_slm months');
  const dep = 450000 * 12 * m / 1200;
  same(dep, 31500, 'n_part_slm');
  QQ('n_part_slm', numQ({
    t: 2, d: 3, c: 'application',
    stem: `Raichur Rollers, an imagined firm, bought a roller for ${rs(450000)} on 1 September 2027 and charges depreciation at 12% a year on cost. Its books close on 31 March. The depreciation for the year ended 31 March 2028 is (in ₹)`,
    value: dep,
    sol: `September to March is 7 months. Depreciation = ${inr(450000)} × 12% × 7/12 = ₹31,500.`,
  }));
}
{
  const w = schedule({ cost: 360000, ratePct: 20, method: 'wdv', years: 2, months: [6] });
  same(w[1].dep, 64800, 'n_wdv_part second');
  QQ('n_wdv_part', numQ({
    t: 2, d: 4, c: 'application',
    stem: `Bundi Bearings, an imagined firm, bought a machine for ${rs(360000)} on 1 October 2027 and writes it down at 20% a year on the written down value. Books close on 31 March. The depreciation for the year ended 31 March 2029 is (in ₹)`,
    value: w[1].dep,
    sol: `First year, 6 months: ${inr(360000)} × 20% × 6/12 = ${inr(w[0].dep)}, so the book value on 1 April 2028 is ${inr(w[1].opening)}. Second year = 20% × ${inr(w[1].opening)} = ₹64,800.`,
  }));
}
{
  const F = fleet({ asset: 'Machinery', rate: 10, method: 'slm', years: 3, fy0: 2026, items: [{ id: 'M', label: 'machine', cost: 640000, buy: '1 July 2026' }] });
  same(F.years[2].closingBV, 464000, 'n_book_value');
  QQ('n_book_value', numQ({
    t: 2, d: 3, c: 'application',
    stem: `Gulbarga Grinders, an imagined firm, bought a machine for ${rs(640000)} on 1 July 2026 and charges 10% a year on cost. Books close on 31 March. The book value of the machine on 31 March 2029 is (in ₹)`,
    value: 464000,
    sol: `Year 1, 9 months: ${inr(F.years[0].dep)}. Years 2 and 3: ${inr(F.years[1].dep)} each. Total depreciation = ${inr(F.years[0].dep)} + ${inr(F.years[1].dep)} + ${inr(F.years[2].dep)} = ${inr(F.totalDep)}. Book value = ${inr(640000)} − ${inr(F.totalDep)} = ₹4,64,000.`,
  }));
}
{
  const F = fleet({ asset: 'Machinery', rate: 10, method: 'slm', years: 3, fy0: 2026, items: [{ id: 'M', label: 'press', cost: 520000, buy: '1 October 2026' }], sale: { id: 'M', on: '1 January 2029', value: 370000 } });
  const s = F.years[2].sold;
  same(s.acc, 117000, 'n_loss_sale accumulated');
  same(s.bv, 403000, 'n_loss_sale book value');
  same(s.result, -33000, 'n_loss_sale loss');
  QQ('n_loss_sale', numQ({
    t: 4, d: 4, c: 'application',
    stem: `Jammu Jigs, an imagined firm, bought a press for ${rs(520000)} on 1 October 2026 and depreciates it at 10% a year on cost. Its books close on 31 March. On 1 January 2029 the press was sold for ${rs(370000)}. The loss on sale is (in ₹)`,
    value: 33000,
    sol: `Months: 6 in 2026–27, 12 in 2027–28 and 9 in 2028–29. Depreciation = ${inr(F.R('M')[0].dep)} + ${inr(F.R('M')[1].dep)} + ${inr(F.R('M')[2].dep)} = ${inr(s.acc)}. Book value = ${inr(520000)} − ${inr(s.acc)} = ${inr(s.bv)}. Loss = ${inr(s.bv)} − ${inr(370000)} = ₹33,000.`,
  }));
}
{
  const F = fleet({
    asset: 'Machinery', rate: 10, method: 'slm', years: 2, fy0: 2026,
    items: [{ id: 'A', label: 'machine A', cost: 450000, buy: '1 April 2026' }, { id: 'B', label: 'machine B', cost: 210000, buy: '1 October 2026' }],
    sale: { id: 'B', on: '1 October 2027', value: 190000 },
  });
  same(-F.years[1].prov.provision.balance, 90000, 'n_prov_balance');
  QQ('n_prov_balance', numQ({
    t: 3, d: 4, c: 'application',
    stem: `Tirupati Tools, an imagined firm, kept machine A (cost ${rs(450000)}, bought 1 April 2026) and machine B (cost ${rs(210000)}, bought 1 October 2026) with a Provision for Depreciation A/c at 10% a year on cost. Machine B was sold on 1 October 2027 and its accumulated depreciation was transferred out. The balance of the provision account on 31 March 2028 is (in ₹)`,
    value: 90000,
    sol: `Only machine A remains. Its depreciation is ${inr(45000)} × 2 years = ₹90,000, which is what the provision must hold. Machine B's ${inr(F.years[1].sold.acc)} has gone to the Asset Disposal A/c.`,
  }));
}

// ================================================================ short answer, 2 marks
QQ('s2_meaning', short({
  t: 1, d: 1, c: 'recall', marks: 2,
  stem: 'Ambala Axles, an imagined firm, charges depreciation on its plant every year. Define depreciation and state one feature of it.',
  model: 'Depreciation is the fall in the book value of a fixed asset, caused by its use, and the amount for the year is charged to the profit and loss account.\n\nOne feature: it is a non-cash expense, because no payment is made when it is charged.',
  sol: 'One mark for the definition; one for a correct feature.',
  scheme: [['Definition: fall in book value of a fixed asset from use, charged as an expense', 1], ['One feature, for example a non-cash charge made every year', 1]],
}));
{
  const r = slmRate({ cost: 500000, scrap: 50000, life: 15 });
  same(r.annual, 30000, 's2_slm_rate annual');
  same(r.ratePct, 6, 's2_slm_rate rate');
  QQ('s2_slm_rate', short({
    t: 2, d: 3, c: 'application', marks: 2,
    stem: `A crusher costing ${rs(500000)} is bought by Rampur Rice Mills, an imagined firm. Its life is 15 years and its scrap value ${rs(50000)}. Find the annual depreciation by the straight line method and the rate on cost.`,
    model: `Annual depreciation = (${inr(500000)} − ${inr(50000)}) ÷ 15 = ${inr(450000)} ÷ 15 = **${rs(30000)}**.\n\nRate on cost = ${inr(30000)} ÷ ${inr(500000)} × 100 = **6%**.`,
    sol: 'Subtract the scrap value, divide by the life, then express the charge as a percentage of cost.',
    scheme: [[`Annual depreciation ${rs(30000)} with the formula`, 1], ['Rate 6% on cost', 1]],
  }));
}
QQ('s2_prov_use', short({
  t: 3, d: 2, c: 'understanding', marks: 2,
  stem: 'State two differences between crediting depreciation to the asset account and crediting it to a provision for depreciation account, as practised by Hospet Hammers, an imagined firm.',
  model: '1. Asset account credited: the account shows the book value. Provision account credited: the account keeps showing the original cost.\n\n2. Asset account credited: the total depreciation to date is not shown anywhere. Provision account credited: the accumulated depreciation stands in one place and is deducted from the cost in the balance sheet.',
  sol: 'One mark for each difference that is clearly stated.',
  scheme: [['First difference stated (what the asset account shows)', 1], ['Second difference stated (accumulated depreciation or the balance sheet)', 1]],
}));
QQ('s2_objectives', short({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Kolar Kerosene Depot, an imagined firm, wants to know why it must charge depreciation before working out its profit. State two reasons.',
  model: '1. Using the asset costs money over its life; leaving the charge out would overstate the profit of the year.\n\n2. The asset would otherwise stay in the balance sheet at a value higher than what is really left of it.',
  sol: 'One mark for each valid reason: correct profit, true asset value, funds kept for replacement, or matching.',
  scheme: [['First reason, with an explanation', 1], ['Second reason, with an explanation', 1]],
}));
QQ('s2_factors', short({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Name any two factors that decide the amount of depreciation on a machine bought by Dharwad Dies, an imagined firm, and say how each factor affects the yearly charge.',
  model: 'Estimated life: the longer the life, the smaller the yearly charge, because the cost is shared over more years.\n\nScrap value: the higher the expected scrap value, the smaller the yearly charge, because less of the cost has to be written off. (Cost, too, raises the charge when it is higher.)',
  sol: 'One mark for each factor named with its effect.',
  scheme: [['First factor with its effect on the charge', 1], ['Second factor with its effect on the charge', 1]],
}));
QQ('s2_wdv_lim', short({
  t: 2, d: 2, c: 'understanding', marks: 2,
  stem: 'State any two limitations of the written down value method, as seen by Ratlam Rollers, an imagined firm.',
  model: '1. The book value of an asset never falls to nil, so the asset is not written off completely however long it is used.\n\n2. The charge is heavy in the early years, and the yearly working is longer because the base changes every year.',
  sol: 'One mark for each limitation stated.',
  scheme: [['First limitation stated', 1], ['Second limitation stated', 1]],
}));
{
  const F = fleet({ asset: 'Vehicles', rate: 10, method: 'slm', years: 4, fy0: 2026, items: [{ id: 'V', label: 'van', cost: 640000, buy: '1 April 2026' }], sale: { id: 'V', on: '31 March 2030', value: 350000 } });
  const s = F.years[3].sold;
  same(s.dep, 64000, 's2_sale_bv last-year dep');
  same(s.acc, 256000, 's2_sale_bv accumulated');
  same(s.bv, 384000, 's2_sale_bv book value');
  same(s.result, -34000, 's2_sale_bv loss');
  QQ('s2_sale_bv', short({
    t: 4, d: 3, c: 'application', marks: 2,
    stem: `Machilipatnam Movers, an imagined firm, bought a van for ${rs(640000)} on 1 April 2026 and charges 10% a year on cost. The van was sold on 31 March 2030 for ${rs(350000)}. Find the book value on the date of sale and the profit or loss on sale.`,
    model: `Depreciation for 4 full years = ${inr(64000)} × 4 = ${inr(256000)}.\n\nBook value = ${inr(640000)} − ${inr(256000)} = **${rs(384000)}**.\n\nLoss on sale = ${inr(384000)} − ${inr(350000)} = **${rs(34000)}**.`,
    sol: 'Four full years, so no part-year working; book value first, then compare with the price.',
    scheme: [[`Book value ${rs(384000)}`, 1], [`Loss on sale ${rs(34000)}`, 1]],
  }));
}
{
  const w = schedule({ cost: 360000, ratePct: 15, method: 'wdv', years: 2, months: [monthsBetween('1 July 2027', '31 March 2028')] });
  check(w.map((r) => r.dep).join(',') === '40500,47925', 's2_part_year charges');
  QQ('s2_part_year', short({
    t: 2, d: 3, c: 'application', marks: 2,
    stem: `Tezpur Textiles, an imagined firm, bought a loom for ${rs(360000)} on 1 July 2027 and writes it down at 15% a year on the written down value. Find the depreciation for the years ended 31 March 2028 and 31 March 2029.`,
    model: `Year ended 31 March 2028, 9 months: ${inr(360000)} × 15% × 9/12 = **${rs(w[0].dep)}**; book value ${inr(w[0].closing)}.\n\nYear ended 31 March 2029: 15% × ${inr(w[1].opening)} = **${rs(w[1].dep)}**.`,
    sol: 'First year is a part year on cost; second year is a full year on the opening book value.',
    scheme: [[`First year ${rs(w[0].dep)} with the 9 months`, 1], [`Second year ${rs(w[1].dep)} on the opening book value`, 1]],
  }));
}
{
  const direct = journal([{ dr: [['Depreciation A/c', 48000]], cr: [['Machinery A/c', 48000]], note: 'Being depreciation charged to the asset' }]);
  const prov = journal([{ dr: [['Depreciation A/c', 48000]], cr: [['Provision for Depreciation A/c', 48000]], note: 'Being depreciation provided' }]);
  QQ('s2_direct_vs_prov', short({
    t: 3, d: 2, c: 'understanding', marks: 2,
    stem: `Zirakpur Zips, an imagined firm, charges depreciation of ${rs(48000)} on its machinery for the year ended 31 March 2028. Pass the journal entry for the charge (a) when depreciation is credited to the machinery account and (b) when a provision for depreciation account is kept.`,
    model: `**(a) Credited to the asset**\n\n${direct.md}\n\n**(b) Provision kept**\n\n${prov.md}`,
    sol: 'The debit is the same in both; the credit differs.',
    scheme: [['Entry (a): Depreciation A/c debited and Machinery A/c credited', 1], ['Entry (b): Depreciation A/c debited and Provision for Depreciation A/c credited', 1]],
  }));
}
QQ('s2_disp_why', short({
  t: 4, d: 3, c: 'understanding', marks: 2,
  stem: 'Gangtok Garments, an imagined firm, keeps its plant at cost with a provision account and sells a plant at a profit. State two items that are credited to the Asset Disposal A/c, and say where the profit goes.',
  model: 'Credited to the Asset Disposal A/c: (1) the accumulated depreciation on the plant sold, transferred from the provision account, and (2) the sale price received.\n\nThe credit side is larger than the cost debited, so the balancing profit is taken to the credit of the Profit and Loss A/c.',
  sol: 'One mark for the two credits; one mark for the destination of the profit.',
  scheme: [['Accumulated depreciation and sale price named as the credits', 1], ['Profit transferred to the Profit and Loss A/c', 1]],
}));

// ================================================================ short answer, 3 marks
QQ('s3_causes', short({
  t: 1, d: 2, c: 'understanding', marks: 3,
  stem: 'Explain any three causes of depreciation, giving an example of each from the business of Aurangabad Auto Spares, an imagined firm.',
  model: '1. **Wear and tear:** the delivery van wears out through daily use on the road.\n\n2. **Obsolescence:** the old billing machine still works but is replaced by a faster model.\n\n3. **Passage of time:** the lease of the godown shortens every year, so its value falls even if nothing is done to it.\n\n(Depletion, as in a quarry, is a fourth cause.)',
  sol: 'One mark for each cause correctly explained with an example.',
  scheme: [['First cause with an example', 1], ['Second cause with an example', 1], ['Third cause with an example', 1]],
}));
{
  const annual = slm({ cost: 840000, scrap: 60000, life: 12 }).annual;
  const t = { rows: [1, 2, 3].map((y) => ({ year: y, dep: annual, closing: 840000 - annual * y })) };
  same(annual, 65000, 's3_slm_sched annual');
  same(t.rows[2].closing, 645000, 's3_slm_sched book value');
  QQ('s3_slm_sched', short({
    t: 2, d: 3, c: 'application', marks: 3,
    stem: `Karur Kilns, an imagined firm, bought a furnace for ${rs(840000)} on 1 April 2026. Its life is 12 years and its scrap value ${rs(60000)}. Find the annual depreciation by the straight line method, show the depreciation for each of the first three years, and find the book value on 31 March 2029.`,
    model: `Annual depreciation = (${inr(840000)} − ${inr(60000)}) ÷ 12 = ${inr(780000)} ÷ 12 = **${rs(annual)}**.\n\n${mdTable(['Year ended', 'Depreciation (₹)', 'Book value (₹)'], t.rows.map((r) => [`31 March ${2026 + r.year}`, inr(r.dep), inr(r.closing)]))}\n\nBook value on 31 March 2029 = **${rs(645000)}**.`,
    sol: 'The charge is the same each year, so only the book value changes.',
    scheme: [[`Annual depreciation ${rs(annual)} with the formula`, 1], ['Charge shown for each of the three years', 1], [`Book value ${rs(645000)} on 31 March 2029`, 1]],
  }));
}
{
  const t = track({ cost: 450000, ratePct: 20, method: 'wdv', years: 3 });
  check(t.rows.map((r) => r.dep).join(',') === '90000,72000,57600', 's3_wdv_sched');
  QQ('s3_wdv_sched', short({
    t: 2, d: 3, c: 'application', marks: 3,
    stem: `Madurai Mixers, an imagined firm, bought a mixer for ${rs(450000)} on 1 April 2027 and writes it down at 20% a year on the written down value. Show the depreciation for each of the first three years and the book value at the end of each year.`,
    model: mdTable(['Year ended', 'Opening book value (₹)', 'Depreciation at 20% (₹)', 'Closing book value (₹)'], t.rows.map((r) => [`31 March ${2027 + r.year}`, inr(r.opening), inr(r.dep), inr(r.closing)])),
    sol: 'Apply the rate to the opening book value of each year.',
    scheme: [[`Year 1: ${rs(90000)}`, 1], [`Year 2: ${rs(72000)} on ${inr(360000)}`, 1], [`Year 3: ${rs(57600)} and the closing book values`, 1]],
  }));
}
QQ('s3_diff', short({
  t: 2, d: 2, c: 'understanding', marks: 3,
  stem: 'Distinguish the straight line method from the written down value method of depreciation, as the accountant of Mohali Moulds, an imagined firm, would explain them, on any three points.',
  model: mdTable(['Point', 'Straight line method', 'Written down value method'], [
    ['Base of the rate', 'Original cost every year', 'Book value at the start of each year'],
    ['Yearly charge', 'The same every year', 'Falls every year'],
    ['Book value at the end of life', 'Falls to the scrap value', 'Never reaches nil; a balance is left'],
  ]),
  sol: 'One mark for each point stated for both methods.',
  scheme: [['Difference in the base of the rate', 1], ['Difference in the pattern of the charge', 1], ['Difference in the book value at the end of life', 1]],
}));
{
  const F = fleet({ asset: 'Machinery', rate: 10, method: 'slm', years: 1, fy0: 2027, items: [{ id: 'M', label: 'machinery', cost: 320000, buy: '1 April 2027' }] });
  same(F.years[0].dep, 32000, 's3_jr_direct dep');
  QQ('s3_jr_direct', short({
    t: 3, d: 3, c: 'application', marks: 3,
    stem: `Gangapur Gaskets, an imagined firm, bought machinery for ${rs(320000)} on 1 April 2027. It charges depreciation at 10% a year on cost, crediting the machinery account. Pass the journal entries for the year ended 31 March 2028, including the transfer to the profit and loss account.`,
    model: F.years[0].direct.journal.md,
    sol: 'Three entries: purchase, depreciation, transfer to profit and loss.',
    scheme: [['Purchase entry: Machinery A/c Dr, To Bank A/c', 1], [`Depreciation ${rs(32000)} debited and the asset credited`, 1], ['Transfer to the Profit and Loss A/c', 1]],
  }));
}
{
  const F = fleet({ asset: 'Machinery', rate: 15, method: 'wdv', years: 1, fy0: 2027, items: [{ id: 'M', label: 'machinery', cost: 400000, buy: '1 April 2027' }] });
  same(F.years[0].dep, 60000, 's3_jr_prov dep');
  QQ('s3_jr_prov', short({
    t: 3, d: 3, c: 'application', marks: 3,
    stem: `Udupi Utensils, an imagined firm, bought machinery for ${rs(400000)} on 1 April 2027. It depreciates machinery at 15% a year on the written down value and keeps a Provision for Depreciation A/c. Pass the journal entries for the year ended 31 March 2028, including the transfer to the profit and loss account.`,
    model: `${F.years[0].prov.journal.md}\n\nBalance sheet extract: Machinery ${inr(400000)} less Provision for Depreciation ${inr(60000)} = ${inr(340000)}.`,
    sol: 'The asset is recorded at cost; the credit for depreciation goes to the provision.',
    scheme: [['Purchase entry at cost', 1], [`Depreciation ${rs(60000)} credited to the Provision for Depreciation A/c`, 1], ['Transfer of depreciation to the Profit and Loss A/c', 1]],
  }));
}
{
  const F = fleet({ asset: 'Machinery', rate: 12, method: 'slm', years: 2, fy0: 2027, items: [{ id: 'M', label: 'machinery', cost: 500000, buy: '1 April 2027' }] });
  same(F.years[1].dep, 60000, 's3_prov_a dep');
  same(-F.years[1].prov.provision.balance, 120000, 's3_prov_a provision');
  QQ('s3_prov_a', short({
    t: 3, d: 3, c: 'application', marks: 3,
    stem: `Sirsi Saws, an imagined firm, bought machinery for ${rs(500000)} on 1 April 2027 and provides depreciation at 12% a year on cost through a Provision for Depreciation A/c. Prepare the Machinery A/c and the Provision for Depreciation A/c for the years ended 31 March 2028 and 31 March 2029.`,
    model: `**Machinery A/c, year ended 31 March 2028**\n\n${F.years[0].prov.asset.md}\n\n**Machinery A/c, year ended 31 March 2029**\n\n${F.years[1].prov.asset.md}\n\n**Provision for Depreciation A/c, year ended 31 March 2028**\n\n${F.years[0].prov.provision.md}\n\n**Provision for Depreciation A/c, year ended 31 March 2029**\n\n${F.years[1].prov.provision.md}`,
    sol: 'The machinery stays at cost; the provision grows by one year\'s charge.',
    scheme: [['Machinery A/c for both years at cost with c/d and b/d', 1], ['Provision A/c for 2027–28 with the charge and c/d', 1], ['Provision A/c for 2028–29 with b/d, the charge and c/d', 1]],
  }));
}
{
  const F = fleet({ asset: 'Machinery', rate: 10, method: 'slm', years: 3, fy0: 2026, items: [{ id: 'M', label: 'machine', cost: 480000, buy: '1 October 2026' }], sale: { id: 'M', on: '1 January 2029', value: 360000 } });
  const s = F.years[2].sold;
  same(s.acc, 108000, 's3_sale_calc accumulated');
  same(s.bv, 372000, 's3_sale_calc book value');
  same(s.result, -12000, 's3_sale_calc loss');
  QQ('s3_sale_calc', short({
    t: 4, d: 4, c: 'application', marks: 3,
    stem: `Jalna Jars, an imagined firm, bought a machine for ${rs(480000)} on 1 October 2026 and charges depreciation at 10% a year on cost. Books close on 31 March. The machine was sold on 1 January 2029 for ${rs(360000)}. Find the depreciation up to the date of sale, the book value and the profit or loss on sale.`,
    model: `2026–27, 6 months: ${inr(480000)} × 10% × 6/12 = ${inr(F.R('M')[0].dep)}.\n\n2027–28, 12 months: ${inr(F.R('M')[1].dep)}.\n\n2028–29, 9 months: ${inr(480000)} × 10% × 9/12 = ${inr(F.R('M')[2].dep)}.\n\nAccumulated depreciation = ${inr(s.acc)}. Book value = ${inr(480000)} − ${inr(s.acc)} = **${rs(s.bv)}**.\n\nLoss on sale = ${inr(s.bv)} − ${inr(360000)} = **${rs(12000)}**.`,
    sol: 'Count the months in each year first; then book value; then compare with the price.',
    scheme: [[`Depreciation for 6, 12 and 9 months: ${rs(s.acc)} in all`, 1], [`Book value ${rs(s.bv)}`, 1], [`Loss on sale ${rs(12000)}`, 1]],
  }));
}
{
  const cost = 500000, acc = 225000, price = 240000;
  const bv = cost - acc;
  const res = onSale(bv, price);
  same(res, -35000, 's3_disp_a result');
  const D = ledger({ name: 'Asset Disposal A/c', dr: [['To Machinery A/c', cost]], cr: [['By Provision for Depreciation A/c', acc], ['By Bank A/c', price], ['By Profit and Loss A/c (loss on sale)', -res]] });
  same(D.balance, 0, 's3_disp_a closes');
  QQ('s3_disp_a', short({
    t: 4, d: 3, c: 'application', marks: 3,
    stem: `Bhuj Bobbins, an imagined firm, keeps its machinery at cost with a Provision for Depreciation A/c. A machine that cost ${rs(cost)} and on which ${rs(acc)} of depreciation had been provided was sold for ${rs(price)}. Prepare the Asset Disposal A/c.`,
    model: `Book value = ${inr(cost)} − ${inr(acc)} = ${inr(bv)}; loss = ${inr(bv)} − ${inr(price)} = ${inr(-res)}.\n\n${D.md}`,
    sol: 'Cost on the debit side; provision and price on the credit side; the loss is the balancing figure.',
    scheme: [['Machinery A/c debited at cost', 1], ['Provision and Bank credited with the right amounts', 1], [`Loss ${rs(-res)} found as the balancing figure and the account closed`, 1]],
  }));
}
{
  const cost = 280000, acc = 112000, price = 190000;
  const bv = cost - acc;
  same(bv, 168000, 's3_sale_jr book value');
  same(onSale(bv, price), 22000, 's3_sale_jr profit');
  const J = journal([
    { dr: [['Asset Disposal A/c', cost]], cr: [['Machinery A/c', cost]], note: 'Being the machine transferred at cost' },
    { dr: [['Provision for Depreciation A/c', acc]], cr: [['Asset Disposal A/c', acc]], note: 'Being the accumulated depreciation transferred' },
    { dr: [['Bank A/c', price]], cr: [['Asset Disposal A/c', price]], note: 'Being the machine sold' },
    { dr: [['Asset Disposal A/c', 22000]], cr: [['Profit and Loss A/c', 22000]], note: 'Being the profit on sale transferred' },
  ]);
  QQ('s3_sale_jr', short({
    t: 4, d: 3, c: 'application', marks: 3,
    stem: `Narsapur Nets, an imagined firm, sold a machine that cost ${rs(cost)} and had accumulated depreciation of ${rs(acc)} in its Provision for Depreciation A/c. The sale price was ${rs(price)}. Pass the journal entries through the Asset Disposal A/c, including the transfer of the profit or loss.`,
    model: `Book value = ${inr(cost)} − ${inr(acc)} = ${inr(bv)}; profit = ${inr(price)} − ${inr(bv)} = ${inr(22000)}.\n\n${J.md}`,
    sol: 'Four entries; the last one is the profit.',
    scheme: [['Cost transferred to the Asset Disposal A/c', 1], ['Accumulated depreciation transferred from the provision', 1], [`Sale price received and profit ${rs(22000)} transferred`, 1]],
  }));
}
{
  const F = fleet({
    asset: 'Machinery', rate: 10, method: 'wdv', years: 1, fy0: 2027,
    items: [{ id: 'A', label: 'old machinery', cost: 400000, buy: '1 April 2027' }, { id: 'B', label: 'new machine', cost: 240000, buy: '1 August 2027' }],
  });
  same(F.years[0].dep, 40000 + 16000, 's3_add_dep total');
  QQ('s3_add_dep', short({
    t: 4, d: 3, c: 'application', marks: 3,
    stem: `On 1 April 2027 the machinery of Nellore Nets, an imagined firm, stood in the books at ${rs(400000)}. On 1 August 2027 it bought a new machine for ${rs(240000)}. It writes machinery down at 10% a year on the written down value and its books close on 31 March. Find the depreciation for the year ended 31 March 2028 on each and in all.`,
    model: `Old machinery: ${inr(400000)} × 10% = ${inr(40000)}.\n\nNew machine, 1 August to 31 March = 8 months: ${inr(240000)} × 10% × 8/12 = ${inr(16000)}.\n\nTotal depreciation = ${inr(40000)} + ${inr(16000)} = **${rs(56000)}**.`,
    sol: 'Old machinery for a full year, the new machine for 8 months, then add.',
    scheme: [[`Old machinery ${rs(40000)}`, 1], [`New machine ${rs(16000)} for 8 months`, 1], [`Total ${rs(56000)}`, 1]],
  }));
}
