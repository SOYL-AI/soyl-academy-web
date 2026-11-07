// Shared computed figures for CBSE 11 Accountancy ch07 (Depreciation, Provisions and Reserves): the worked cases of the
// decks (Rana Engineering, Asha Printers, Bhavani Looms, Chitra Packaging, Meena Foods and a same-rate comparison). Every
// amount comes from here or is computed beside the item with extra.mjs and asserted. Imagined firms only.
import * as X from './extra.mjs';
export * from './extra.mjs';
const { fleet, compare, allocate, slm, schedule, same, check } = X;

// ---------------------------------------------------------------- Rana Engineering: straight line formula
export const RANA = { cost: 500000, scrap: 100000, life: 5 };
RANA.dep = slm(RANA);
same(RANA.dep.annual, 80000, 'Rana Engineering annual straight line depreciation');
same(RANA.dep.ratePct, 16, 'Rana Engineering rate on cost');
RANA.depreciable = RANA.cost - RANA.scrap;
RANA.sched = schedule({ cost: RANA.cost, ratePct: RANA.dep.ratePct, method: 'slm', years: 5 });
same(RANA.sched[4].closing, RANA.scrap, 'Rana Engineering book value after the life equals the residual value');

// ---------------------------------------------------------------- Dhruv Engineering: same rate, both methods
export const CMP = compare({ cost: 500000, ratePct: 20, years: 5 });
same(CMP.s[0].dep, CMP.w[0].dep, 'first-year charge is the same under both methods at the same rate');
same(CMP.s[1].dep, 100000, 'SLM charge each year');
same(CMP.w[1].dep, 80000, 'WDV second-year charge');
same(CMP.w[4].closing, 163840, 'WDV book value after five years');
same(CMP.totalSlm, 500000, 'SLM total charge in five years');
same(CMP.totalWdv, 336160, 'WDV total charge in five years');

// ---------------------------------------------------------------- Asha Printers: straight line, direct method, part-year purchase and sale of a machine
export const AP_ITEMS = [
  { id: 'A', label: 'Machine A', cost: 400000, year: 1, months: 12, date: '1 April 2025' },
  { id: 'B', label: 'Machine B', cost: 240000, year: 1, months: 6, date: '1 October 2025' },
];
export const AP = fleet({
  rate: 10, method: 'slm', years: 3, fy0: 2025, items: AP_ITEMS,
  sale: { id: 'B', year: 3, months: 9, value: 180000, date: '1 January 2028' },
});
check(AP.years.map((y) => y.dep).join(',') === '52000,64000,58000', 'Asha Printers depreciation');
same(AP.years[2].sold.bv, 186000, 'Asha Printers book value of Machine B at sale');
same(AP.years[2].sold.result, -6000, 'Asha Printers loss on sale');
same(AP.years[2].closingBV, 280000, 'Asha Printers closing book value');
same(AP.years[1].closingAcc, 116000, 'Asha Printers accumulated depreciation after year 2');
same(AP.years[2].closingAcc, 120000, 'Asha Printers accumulated depreciation after year 3');
same(AP.totalDep, 174000, 'Asha Printers total depreciation');

// ---------------------------------------------------------------- Bhavani Looms: written down value, part-year purchase and sale
export const BL = fleet({
  rate: 20, method: 'wdv', years: 3, fy0: 2025,
  items: [
    { id: 'A', label: 'Machine A', cost: 300000, year: 1, months: 12, date: '1 April 2025' },
    { id: 'B', label: 'Machine B', cost: 160000, year: 2, months: 9, date: '1 July 2026' },
  ],
  sale: { id: 'B', year: 3, months: 6, value: 110000, date: '1 October 2027' },
});
check(BL.years.map((y) => y.dep).join(',') === '60000,72000,52000', 'Bhavani Looms depreciation');
same(BL.years[2].sold.bv, 122400, 'Bhavani Looms book value of Machine B at sale');
same(BL.years[2].sold.result, -12400, 'Bhavani Looms loss on sale');
same(BL.years[2].closingBV, 153600, 'Bhavani Looms closing book value');
same(BL.years[2].closingAcc, 146400, 'Bhavani Looms accumulated depreciation of the machine in hand');

// ---------------------------------------------------------------- Chitra Packaging: straight line, provision method, profit on sale
export const CP = fleet({
  rate: 10, method: 'slm', years: 2, fy0: 2025,
  items: [
    { id: 'A', label: 'Machine A', cost: 600000, year: 1, months: 12, date: '1 April 2025' },
    { id: 'B', label: 'Machine B', cost: 120000, year: 1, months: 9, date: '1 July 2025' },
  ],
  sale: { id: 'B', year: 2, months: 6, value: 110000, date: '1 October 2026' },
});
check(CP.years.map((y) => y.dep).join(',') === '69000,66000', 'Chitra Packaging depreciation');
same(CP.years[1].sold.bv, 105000, 'Chitra Packaging book value of Machine B at sale');
same(CP.years[1].sold.result, 5000, 'Chitra Packaging profit on sale');
same(CP.years[1].closingAcc, 120000, 'Chitra Packaging provision after the sale');
same(CP.years[0].closingAcc, 69000, 'Chitra Packaging provision after year 1');

// ---------------------------------------------------------------- Meena Foods: provision, then general reserve
export const MF = allocate({ before: 200000, provisions: [['provision for repairs', 20000]], reserves: [['transfer to general reserve', 10]] });
same(MF.net, 180000, 'Meena Foods net profit');
same(MF.resTotal, 18000, 'Meena Foods general reserve');
same(MF.left, 162000, 'Meena Foods profit retained');

export { check };
