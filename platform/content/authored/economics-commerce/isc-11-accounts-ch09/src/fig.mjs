// Worked-case figures for the two decks of ISC 11 Accounts ch09 (Depreciation). Imagined firms. Every amount comes from
// dep.mjs and is pinned here with an assertion.
import { same, check, sum, inr, rs, fleet, compare, track, slmRate, schedule, monthsBetween } from './dep.mjs';
export * from './dep.mjs';

// ---------------------------------------------------------------- deck 1
// Tindivanam Tiles: straight line from cost, scrap value and life.
export const TT = { cost: 800000, scrap: 80000, life: 6 };
TT.r = slmRate(TT);
same(TT.r.annual, 120000, 'Tindivanam annual charge');
same(TT.r.ratePct, 15, 'Tindivanam rate on cost');
TT.t = track({ cost: TT.cost, ratePct: TT.r.ratePct, method: 'slm', years: 6 });
same(TT.t.rows[5].closing, TT.scrap, 'Tindivanam book value after the life equals the scrap value');
same(TT.t.total, TT.cost - TT.scrap, 'Tindivanam total depreciation');

// Pollachi Feeds: written down value, four years at 25%.
export const PF = { cost: 640000, rate: 25 };
PF.t = track({ cost: PF.cost, ratePct: PF.rate, method: 'wdv', years: 4 });
check(PF.t.rows.map((r) => r.dep).join(',') === '160000,120000,90000,67500', 'Pollachi depreciation');
same(PF.t.rows[3].closing, 202500, 'Pollachi book value after four years');

// Bhimavaram Fisheries: bought on 1 August 2026, financial year ends 31 March, 10% on both methods.
export const BF = { cost: 360000, rate: 10, buy: '1 August 2026' };
BF.months = monthsBetween(BF.buy, '31 March 2027');
same(BF.months, 8, 'Bhimavaram months in the first year');
BF.s = track({ cost: BF.cost, ratePct: BF.rate, method: 'slm', years: 2, months: [BF.months] });
BF.w = track({ cost: BF.cost, ratePct: BF.rate, method: 'wdv', years: 2, months: [BF.months] });
check(BF.s.rows.map((r) => r.dep).join(',') === '24000,36000', 'Bhimavaram SLM depreciation');
check(BF.w.rows.map((r) => r.dep).join(',') === '24000,33600', 'Bhimavaram WDV depreciation');

// Hubballi Hydraulics: same rate, both methods, five years.
export const HH = { cost: 625000, rate: 20 };
HH.c = compare({ cost: HH.cost, ratePct: HH.rate, years: 5 });
same(HH.c.s[0].dep, HH.c.w[0].dep, 'first-year charge agrees at the same rate');
same(HH.c.totalSlm, 625000, 'SLM charges in five years');
same(HH.c.totalWdv, 420200, 'WDV charges in five years');
same(HH.c.w[4].closing, 204800, 'WDV book value after five years');

// ---------------------------------------------------------------- deck 2
// Sivaganga Stationers: furniture charged directly, straight line 15%, three years.
export const SS = fleet({ asset: 'Furniture', rate: 15, method: 'slm', years: 3, fy0: 2026, items: [{ id: 'F', label: 'furniture', cost: 260000, buy: '1 April 2026' }] });
check(SS.years.map((y) => y.dep).join(',') === '39000,39000,39000', 'Sivaganga depreciation');
same(SS.years[2].closingBV, 143000, 'Sivaganga book value after three years');

// Nanded Nurseries: machinery at cost with a provision account, written down value 15%, three years.
export const NN = fleet({ asset: 'Machinery', rate: 15, method: 'wdv', years: 3, fy0: 2026, items: [{ id: 'M', label: 'machinery', cost: 480000, buy: '1 April 2026' }] });
check(NN.years.map((y) => y.dep).join(',') === '72000,61200,52020', 'Nanded depreciation');
same(NN.years[2].closingAcc, 185220, 'Nanded provision after three years');
same(NN.years[2].closingBV, 294780, 'Nanded book value after three years');

// Vizianagaram Vessels: plant, an addition in year 2, straight line 10%, direct method.
export const VV = fleet({
  asset: 'Plant', rate: 10, method: 'slm', years: 3, fy0: 2026,
  items: [{ id: 'A', label: 'old plant', cost: 320000, buy: '1 April 2026' }, { id: 'B', label: 'new plant', cost: 160000, buy: '1 October 2027' }],
});
check(VV.years.map((y) => y.dep).join(',') === '32000,40000,48000', 'Vizianagaram depreciation');
same(VV.years[0].closingBV, 288000, 'Vizianagaram book value after year 1');
same(VV.years[1].closingBV, 408000, 'Vizianagaram book value after year 2');
same(VV.years[2].closingBV, 360000, 'Vizianagaram book value after year 3');
same(VV.years[1].added[0].months, 6, 'Vizianagaram months of the addition');
same(VV.R('B')[0].dep, 8000, 'Vizianagaram first charge on the addition');

// Aizawl Appliances: written down value 20%, direct method, a unit bought during year 1 and sold on 1 July 2028 (year 3), no disposal account.
export const AA = fleet({
  asset: 'Machinery', rate: 20, method: 'wdv', years: 3, fy0: 2026,
  items: [{ id: 'A', label: 'machine A', cost: 300000, buy: '1 April 2026' }, { id: 'B', label: 'machine B', cost: 160000, buy: '1 October 2026' }],
  sale: { id: 'B', on: '1 July 2028', value: 100000 },
});
check(AA.years.map((y) => y.dep).join(',') === '76000,76800,44160', 'Aizawl depreciation');
same(AA.years[2].sold.dep, 5760, 'Aizawl depreciation on machine B to the date of sale');
same(AA.years[2].sold.bv, 109440, 'Aizawl book value at sale');
same(AA.years[2].sold.result, -9440, 'Aizawl loss on sale');
same(AA.years[2].closingBV, 153600, 'Aizawl closing book value');

// Dindigul Dairies: straight line 10%, cost kept in the asset account, provision and disposal account; machine sold at a profit on 1 January 2029.
export const DD = fleet({
  asset: 'Machinery', rate: 10, method: 'slm', years: 3, fy0: 2026,
  items: [{ id: 'A', label: 'machine A', cost: 400000, buy: '1 April 2026' }, { id: 'B', label: 'machine B', cost: 280000, buy: '1 July 2026' }],
  sale: { id: 'B', on: '1 January 2029', value: 225000 },
});
check(DD.years.map((y) => y.dep).join(',') === '61000,68000,61000', 'Dindigul depreciation');
same(DD.years[2].sold.acc, 70000, 'Dindigul accumulated depreciation on machine B');
same(DD.years[2].sold.bv, 210000, 'Dindigul book value at sale');
same(DD.years[2].sold.result, 15000, 'Dindigul profit on sale');
same(DD.years[2].closingAcc, 120000, 'Dindigul provision after the sale');
same(DD.years[2].closingBV, 280000, 'Dindigul closing book value');

// ---------------------------------------------------------------- helpers for tables made of several years
import { mdTable } from './dep.mjs';
/** Several ledger accounts of successive years stacked in one table, each under a bold year heading. parts: [[heading, ledger]]. */
export function stack(parts) {
  const headers = parts[0][1].headers;
  const rows = [];
  for (const [h, l] of parts) {
    rows.push([`**${h}**`, '', '', '']);
    rows.push(...l.rows);
  }
  return { headers, rows, md: mdTable(headers, rows) };
}
/** Stack of the asset account (direct) or of the asset account at cost / the provision account over the years of a fleet. */
export const stackDirect = (F, name) => stack(F.years.map((y) => [`${name} A/c, year ended ${y.end}`, y.direct.asset]));
export const stackCost = (F, name) => stack(F.years.map((y) => [`${name} A/c, year ended ${y.end}`, y.prov.asset]));
export const stackProv = (F) => stack(F.years.map((y) => [`Provision for Depreciation A/c, year ended ${y.end}`, y.prov.provision]));
