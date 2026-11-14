// Long-answer items (5 marks) of ISC 11 Accounts ch09. Imagined firms; every schedule, ledger and profit or loss comes from
// dep.mjs (through fig.mjs for the stacked multi-year accounts) and is asserted.
import { long } from './lib.mjs';
import { same, check, inr, rs, fleet, compare, mdTable, journal } from './fig.mjs';
import { stackCost, stackProv, stackDirect } from './fig.mjs';
import { QQ } from './qq.mjs';

// ---------------------------------------------------------------- provision method, written down value, three years (short test D)
{
  const F = fleet({ asset: 'Machinery', rate: 20, method: 'wdv', years: 3, fy0: 2026, items: [{ id: 'M', label: 'machinery', cost: 520000, buy: '1 April 2026' }] });
  check(F.years.map((y) => y.dep).join(',') === '104000,83200,66560', 'l5_prov_ledgers depreciation');
  same(F.years[2].closingAcc, 253760, 'l5_prov_ledgers provision');
  same(F.years[2].closingBV, 266240, 'l5_prov_ledgers book value');
  QQ('l5_prov_ledgers', long({
    t: 3, d: 3, c: 'application', marks: 5,
    stem: `Bettiah Bearings, an imagined firm, bought machinery for ${rs(520000)} on 1 April 2026. It depreciates machinery at 20% a year on the written down value and keeps a Provision for Depreciation A/c; the books close on 31 March. Prepare (a) a working note of the depreciation for three years [1], (b) the Machinery A/c for the three years [1], and (c) the Provision for Depreciation A/c for the three years [3].`,
    model: `**(a) Working note**\n\n${F.work.md}\n\n**(b) Machinery A/c**\n\n${mdTable(stackCost(F, 'Machinery').headers, stackCost(F, 'Machinery').rows)}\n\n**(c) Provision for Depreciation A/c**\n\n${mdTable(stackProv(F).headers, stackProv(F).rows)}\n\nBalance sheet on 31 March 2029: Machinery ${inr(520000)} less Provision ${inr(F.years[2].closingAcc)} = ${inr(F.years[2].closingBV)}.`,
    sol: 'Depreciation is on the opening book value; the asset account is unchanged; the provision grows by each year\'s charge.',
    scheme: [[`Working note: ${inr(104000)}, ${inr(83200)} and ${inr(66560)}`, 1], ['Machinery A/c at cost with c/d and b/d in all three years', 1], ['Provision A/c for the first year', 1], ['Provision A/c for the second year with b/d', 1], [`Provision A/c for the third year, closing at ${rs(253760)}`, 1]],
  }));
}

// ---------------------------------------------------------------- provision method, part-year purchase and sale, disposal account (long test D, compulsory)
{
  const F = fleet({
    asset: 'Machinery', rate: 20, method: 'wdv', years: 3, fy0: 2026,
    items: [{ id: 'P', label: 'machine P', cost: 600000, buy: '1 April 2026' }, { id: 'Q', label: 'machine Q', cost: 300000, buy: '1 July 2026' }],
    sale: { id: 'Q', on: '1 October 2028', value: 175000 },
  });
  check(F.years.map((y) => y.dep).join(',') === '165000,147000,97200', 'l5_prov_sale depreciation');
  const s = F.years[2].sold;
  same(s.dep, 20400, 'l5_prov_sale Q dep to sale');
  same(s.acc, 45000 + 51000 + 20400, 'l5_prov_sale Q accumulated');
  same(s.bv, 183600, 'l5_prov_sale Q book value');
  same(s.result, -8600, 'l5_prov_sale loss');
  same(F.years[2].closingAcc, 292800, 'l5_prov_sale provision at the end');
  QQ('l5_prov_sale', long({
    t: 4, d: 4, c: 'application', marks: 5,
    stem: `Chikmagalur Cutters, an imagined firm, bought machine P for ${rs(600000)} on 1 April 2026 and machine Q for ${rs(300000)} on 1 July 2026. It depreciates machinery at 20% a year on the written down value, keeps the machinery at cost with a Provision for Depreciation A/c, and closes its books on 31 March. On 1 October 2028 machine Q was sold for ${rs(175000)}. Prepare (a) a working note of the depreciation for three years [1], (b) the Machinery A/c [1], (c) the Provision for Depreciation A/c [1], (d) the Asset Disposal A/c [1], and (e) state the book value of machine Q on the date of sale and the loss on sale [1].`,
    model: `**(a) Working note**\n\n${F.work.md}\n\nMachine Q: 9 months in 2026–27, 12 in 2027–28, 6 in 2028–29 (up to 1 October 2028).\n\n**(b) Machinery A/c**\n\n${mdTable(stackCost(F, 'Machinery').headers, stackCost(F, 'Machinery').rows)}\n\n**(c) Provision for Depreciation A/c**\n\n${mdTable(stackProv(F).headers, stackProv(F).rows)}\n\n**(d) Asset Disposal A/c (1 October 2028)**\n\n${F.years[2].prov.disposal.md}\n\n**(e)** Book value of machine Q = ${inr(300000)} − ${inr(s.acc)} = **${rs(s.bv)}**; loss on sale = ${inr(s.bv)} − ${inr(175000)} = **${rs(8600)}**.`,
    sol: 'Count the months for machine Q in each year; after the sale the provision holds only machine P\'s depreciation.',
    scheme: [['Working note with the months for machine Q (9, 12 and 6)', 1], ['Machinery A/c for three years, with the sale of machine Q at cost', 1], [`Provision A/c for three years, closing at ${rs(292800)}`, 1], ['Asset Disposal A/c with cost, provision and price, closed by the loss', 1], [`Book value ${rs(183600)} and loss on sale ${rs(8600)}`, 1]],
  }));
}

// ---------------------------------------------------------------- charged to the asset, straight line, sale at a profit, three years (long test D, choice)
{
  const F = fleet({
    asset: 'Machinery', rate: 10, method: 'slm', years: 3, fy0: 2026,
    items: [{ id: 'X', label: 'machine X', cost: 450000, buy: '1 April 2026' }, { id: 'Y', label: 'machine Y', cost: 180000, buy: '1 October 2027' }],
    sale: { id: 'X', on: '1 October 2028', value: 350000 },
  });
  check(F.years.map((y) => y.dep).join(',') === '45000,54000,40500', 'l5_direct_sale depreciation');
  const s = F.years[2].sold;
  same(s.acc, 112500, 'l5_direct_sale accumulated');
  same(s.bv, 337500, 'l5_direct_sale book value');
  same(s.result, 12500, 'l5_direct_sale profit');
  same(F.years[2].closingBV, 153000, 'l5_direct_sale closing');
  QQ('l5_direct_sale', long({
    t: 4, d: 4, c: 'application', marks: 5,
    stem: `Kakinada Kettles, an imagined firm, bought machine X for ${rs(450000)} on 1 April 2026 and machine Y for ${rs(180000)} on 1 October 2027. It charges depreciation at 10% a year on cost, crediting it to the Machinery A/c, and closes its books on 31 March. On 1 October 2028 machine X was sold for ${rs(350000)}. Prepare (a) a working note of the depreciation for three years [1], (b) the Machinery A/c for each of the three years [3], and (c) show the profit or loss on sale [1].`,
    model: `**(a) Working note**\n\n${F.work.md}\n\nMachine X, 2028–29: ${inr(450000)} × 10% × 6/12 = ${inr(s.dep)}.\n\n**(b) Machinery A/c**\n\n${mdTable(stackDirect(F, 'Machinery').headers, stackDirect(F, 'Machinery').rows)}\n\n**(c) Result on sale:** book value of machine X = ${inr(450000)} − ${inr(s.acc)} = ${inr(s.bv)}; profit = ${inr(350000)} − ${inr(s.bv)} = **${rs(12500)}**.`,
    sol: 'With no provision or disposal account, the sale and the profit appear in the Machinery A/c itself.',
    scheme: [['Working note including 6 months for machine Y in 2027–28 and for machine X in 2028–29', 1], ['Machinery A/c 2026–27', 1], ['Machinery A/c 2027–28 with the purchase', 1], [`Machinery A/c 2028–29 with the sale, the profit ${rs(12500)} and c/d ${rs(153000)}`, 1], [`Book value ${rs(337500)} and profit ${rs(12500)}`, 1]],
  }));
}

// ---------------------------------------------------------------- provision method, written down value, addition in year 2 (long test D, choice)
{
  const F = fleet({
    asset: 'Machinery', rate: 20, method: 'wdv', years: 2, fy0: 2026,
    items: [{ id: 'A', label: 'old machinery', cost: 300000, buy: '1 April 2026' }, { id: 'B', label: 'new machine', cost: 150000, buy: '1 October 2027' }],
  });
  check(F.years.map((y) => y.dep).join(',') === '60000,63000', 'l5_wdv_add depreciation');
  same(F.years[1].closingAcc, 123000, 'l5_wdv_add provision');
  same(F.years[1].closingBV, 327000, 'l5_wdv_add book value');
  QQ('l5_wdv_add', long({
    t: 3, d: 4, c: 'application', marks: 5,
    stem: `Vapi Valves, an imagined firm, bought machinery for ${rs(300000)} on 1 April 2026 and bought a new machine for ${rs(150000)} on 1 October 2027. It depreciates machinery at 20% a year on the written down value, keeps a Provision for Depreciation A/c, and closes its books on 31 March. Prepare (a) a working note of the depreciation for two years [1], (b) the Machinery A/c for the two years [1], (c) the Provision for Depreciation A/c for each of the two years [2], and (d) the extract of the balance sheet on 31 March 2028 [1].`,
    model: `**(a) Working note**\n\n${F.work.md}\n\nNew machine, 1 October 2027 to 31 March 2028, 6 months: ${inr(150000)} × 20% × 6/12 = ${inr(15000)}.\n\n**(b) Machinery A/c**\n\n${mdTable(stackCost(F, 'Machinery').headers, stackCost(F, 'Machinery').rows)}\n\n**(c) Provision for Depreciation A/c**\n\n${mdTable(stackProv(F).headers, stackProv(F).rows)}\n\n**(d) Balance sheet extract on 31 March 2028:** Machinery at cost ${inr(450000)}, less Provision for Depreciation ${inr(123000)}, giving ${inr(327000)}.`,
    sol: 'The new machine is added to the asset account at cost; its charge is for 6 months, on cost.',
    scheme: [['Working note with the 6-month charge on the new machine', 1], ['Machinery A/c with the purchase and c/d at cost', 1], ['Provision A/c for 2026–27', 1], [`Provision A/c for 2027–28, closing at ${rs(123000)}`, 1], [`Balance sheet extract with book value ${rs(327000)}`, 1]],
  }));
}

// ---------------------------------------------------------------- comparison of the two methods (practice)
{
  const C = compare({ cost: 750000, ratePct: 20, years: 4 });
  same(C.totalSlm, 600000, 'l5_compare slm total');
  same(C.totalWdv, 150000 + 120000 + 96000 + 76800, 'l5_compare wdv total');
  same(C.w[3].dep, 76800, 'l5_compare wdv year 4');
  QQ('l5_compare', long({
    t: 2, d: 4, c: 'analysis', marks: 5,
    stem: `Daman Diesel Pumps, an imagined firm, buys a generating set for ${rs(750000)} and is deciding between depreciating it at 20% a year on cost or at 20% a year on the written down value. (a) Prepare a statement showing the depreciation and the book value for four years under both methods [3]. (b) Say which method charges more in the first year and in the fourth year [1]. (c) Recommend a method for an asset that loses most of its value in the early years, with a reason [1].`,
    model: `**(a) Statement**\n\n${C.md}\n\n**(b)** In the first year both methods charge ${rs(150000)}. In the fourth year the straight line method charges ${rs(150000)} and the written down value method ${rs(76800)}, so the straight line method charges more.\n\n**(c)** The written down value method suits an asset that loses most of its value early, because its heavy early charges follow the pattern of the loss, and its charge falls when repairs rise.`,
    sol: 'Run both schedules side by side before commenting.',
    scheme: [['Straight line schedule for four years', 1], ['Written down value schedule for four years', 1], ['Totals and closing book values', 1], ['Higher charge identified for years 1 and 4', 1], ['Recommendation with a reason', 1]],
  }));
}

// ---------------------------------------------------------------- theory (practice)
QQ('l5_theory', long({
  t: 1, d: 3, c: 'understanding', marks: 5,
  stem: 'Gaya Gears, an imagined firm, is reviewing the depreciation on its fixed assets. (a) What is meant by obsolescence and by depletion? Give one example of each [2]. (b) State three factors that decide the amount of depreciation on a machine [3].',
  model: '**(a)** Obsolescence: the asset loses value because a newer design or process has made it out of date, although it is not worn out. For example, a printing press replaced by a faster model.\n\nDepletion: a wasting asset loses value as the resource in it is taken out. For example, a stone quarry from which stone is removed each year.\n\n**(b)** 1. The cost of the machine, including carriage and installation: a higher cost gives a higher charge.\n\n2. The estimated useful life: a longer life gives a lower yearly charge.\n\n3. The estimated scrap value: a higher scrap value leaves less to be written off.',
  sol: 'Marks for each meaning with its example, and for each factor with its effect.',
  scheme: [['Obsolescence explained with an example', 1], ['Depletion explained with an example', 1], ['First factor with its effect', 1], ['Second factor with its effect', 1], ['Third factor with its effect', 1]],
}));

// ---------------------------------------------------------------- provision method, straight line, sale at a loss through the disposal account (practice)
{
  const F = fleet({
    asset: 'Machinery', rate: 15, method: 'slm', years: 2, fy0: 2026,
    items: [{ id: 'A', label: 'machine A', cost: 360000, buy: '1 April 2026' }, { id: 'B', label: 'machine B', cost: 120000, buy: '1 July 2026' }],
    sale: { id: 'B', on: '1 October 2027', value: 80000 },
  });
  check(F.years.map((y) => y.dep).join(',') === '67500,63000', 'l5_disp_loss depreciation');
  const s = F.years[1].sold;
  same(s.acc, 22500, 'l5_disp_loss accumulated');
  same(s.bv, 97500, 'l5_disp_loss book value');
  same(s.result, -17500, 'l5_disp_loss loss');
  same(-F.years[1].prov.provision.balance, 108000, 'l5_disp_loss provision');
  QQ('l5_disp_loss', long({
    t: 4, d: 4, c: 'application', marks: 5,
    stem: `Medak Mixers, an imagined firm, bought machine A for ${rs(360000)} on 1 April 2026 and machine B for ${rs(120000)} on 1 July 2026. It depreciates machinery at 15% a year on cost, keeps a Provision for Depreciation A/c, and closes its books on 31 March. On 1 October 2027 machine B was sold for ${rs(80000)}. Prepare (a) a working note of the depreciation for two years [1], (b) the Machinery A/c [1], (c) the Provision for Depreciation A/c [1], (d) the Asset Disposal A/c [1], and (e) the journal entries on the date of sale [1].`,
    model: `**(a) Working note**\n\n${F.work.md}\n\nMachine B: 9 months in 2026–27 and 6 months up to 1 October 2027.\n\n**(b) Machinery A/c**\n\n${mdTable(stackCost(F, 'Machinery').headers, stackCost(F, 'Machinery').rows)}\n\n**(c) Provision for Depreciation A/c**\n\n${mdTable(stackProv(F).headers, stackProv(F).rows)}\n\n**(d) Asset Disposal A/c**\n\n${F.years[1].prov.disposal.md}\n\n**(e) Journal entries, 1 October 2027**\n\n${journal([F.years[1].prov.entries.find((e) => /up to the date of sale/.test(e.note)), ...F.years[1].prov.saleEntries]).md}\n\nBook value of machine B = ${inr(120000)} − ${inr(s.acc)} = ${inr(s.bv)}; loss = ${inr(s.bv)} − ${inr(80000)} = ${inr(17500)}.`,
    sol: 'Machine B has 9 and 6 months of depreciation; its share leaves the provision on the sale.',
    scheme: [['Working note with the months for machine B', 1], ['Machinery A/c with the sale of machine B at cost', 1], [`Provision A/c, closing at ${rs(108000)}`, 1], [`Asset Disposal A/c closed by the loss ${rs(17500)}`, 1], ['Journal entries on the date of sale, including depreciation on machine B up to that date', 1]],
  }));
}
