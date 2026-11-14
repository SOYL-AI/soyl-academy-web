// Chapter engine for ISC 11 Accounts ch09 (Depreciation). Built on the shared acc.mjs (slm, schedule, onSale, ledger,
// journal). It adds: exact month counting from dates; a fleet of assets depreciated year by year by the straight line
// or written down value method, with part-year charges for a purchase or a sale during the year; for every year the
// asset account (depreciation charged to the asset), and the asset account at cost with the Provision for Depreciation
// account and the Asset Disposal account; the journal entries for both; a same-rate comparison of the two methods.
// Every result is asserted: months counted from the dates; the direct-method asset account closes at the computed book
// value; the provision account closes at the accumulated depreciation of the assets held; cost less provision equals
// the direct-method balance; book value at sale = cost - accumulated depreciation; profit or loss = sale price - book
// value and agrees in every account; the disposal account closes; WDV each full year = opening value x (1 - rate);
// depreciation + closing book value (+ book value of the asset sold) = cost. Imagined firms only. Whole rupees.
import { same, check, sum, whole, inr, rs, words, rupees, mdTable, journal, ledger, slm, schedule, onSale } from './acc.mjs';

export { same, check, sum, whole, inr, rs, words, rupees, mdTable, journal, ledger, slm, schedule, onSale };

// ---------------------------------------------------------------- dates and months
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const lastDay = (y, m) => new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
export function parseDate(s) {
  const m = /^(\d{1,2}) ([A-Za-z]+) (\d{4})$/.exec(s);
  check(m, `date "${s}" is not "D Month YYYY"`);
  const mi = MONTHS.indexOf(m[2]);
  check(mi >= 0, `unknown month in "${s}"`);
  return { d: Number(m[1]), m: mi, y: Number(m[3]) };
}
/** Month boundary of a date: the 1st is the start of its month; the last day is the end of its month; anything else is refused. */
function boundary(s) {
  const { d, m, y } = parseDate(s);
  if (d === 1) return y * 12 + m;
  check(d === lastDay(y, m), `date "${s}" must be the first or the last day of a month (whole months only)`);
  return y * 12 + m + 1;
}
/** Months between two dates, counted exactly: "1 July 2026" to "31 March 2027" = 9. */
export const monthsBetween = (from, to) => {
  const n = boundary(to) - boundary(from);
  check(n >= 0, `${to} is before ${from}`);
  return n;
};
/** Financial year (starting 1 April) that contains a date: returns the starting calendar year. */
export const fyOf = (s) => {
  const { m, y } = parseDate(s);
  return m >= 3 ? y : y - 1;
};
export const fyLabel = (fy0, y) => `${fy0 + y - 1}–${String(fy0 + y).slice(2)}`;
export const fyEnd = (fy0, y) => `31 March ${fy0 + y}`;
export const fyStart = (fy0, y) => `1 April ${fy0 + y - 1}`;

// ---------------------------------------------------------------- the fleet
/**
 * items: [{ id, label, cost, buy }] (buy = purchase date, the 1st of a month); sale: { id, on, value } (on = the 1st or the
 * last day of a month). rate in per cent; method 'slm' (on original cost) or 'wdv' (on the opening book value). Books close
 * every 31 March; fy0 is the calendar year in which year 1 starts. A sale in the year of purchase is not modelled.
 */
export function fleet({ asset = 'Machinery', rate, method, items, years, sale, fy0 }) {
  check(['slm', 'wdv'].includes(method), `unknown method ${method}`);
  const its = items.map((it) => {
    const fy = fyOf(it.buy);
    const year = fy - fy0 + 1;
    check(year >= 1 && year <= years, `${it.id}: purchased outside the years modelled`);
    return { ...it, year, months: monthsBetween(it.buy, fyEnd(fy0, year)), date: it.buy };
  });
  let sl = null;
  if (sale) {
    const it = its.find((x) => x.id === sale.id);
    check(it, `sale of an unknown asset ${sale.id}`);
    const year = fyOf(sale.on) - fy0 + 1;
    check(year > it.year, `${it.id}: sold in the year of purchase is not modelled`);
    sl = { ...sale, year, months: monthsBetween(fyStart(fy0, year), sale.on), date: sale.on };
    check(year <= years, 'sale after the last year modelled');
  }
  const per = its.map((it) => {
    const sold = sl?.id === it.id;
    const last = sold ? sl.year : years;
    const n = last - it.year + 1;
    const months = Array.from({ length: n }, (_, i) => (i === 0 ? it.months : 12));
    if (sold) months[n - 1] = sl.months;
    const rows = schedule({ cost: it.cost, ratePct: rate, method, years: n, months });
    if (method === 'wdv') rows.forEach((r, i) => { if (months[i] === 12) same(r.dep, r.opening * rate / 100, `${it.id} WDV charge is the rate on the opening book value`); });
    return { ...it, sold, rows };
  });
  const A = `${asset} A/c`;
  const out = [];
  for (let y = 1; y <= years; y++) {
    const live = per.filter((p) => p.year <= y && (!p.sold || sl.year >= y));
    const row = (p) => p.rows[y - p.year];
    const old = live.filter((p) => p.year < y);
    const added = live.filter((p) => p.year === y);
    const openingBV = sum(old.map((p) => row(p).opening));
    const openingCost = sum(old.map((p) => p.cost));
    const openAcc = openingCost - openingBV;
    if (y > 1) same(openingBV, out[y - 2].closingBV, `opening book value of year ${y} equals the previous closing`);
    const dep = sum(live.map((p) => row(p).dep));
    const soldP = live.find((p) => p.sold && sl.year === y);
    const keep = live.filter((p) => p !== soldP);
    const closingBV = sum(keep.map((p) => row(p).closing));
    const closingCost = sum(keep.map((p) => p.cost));
    const closingAcc = closingCost - closingBV;
    let sd = null;
    if (soldP) {
      const r = row(soldP);
      sd = { id: soldP.id, label: soldP.label, cost: soldP.cost, bv: r.closing, acc: soldP.cost - r.closing, value: sl.value, result: onSale(r.closing, sl.value), dep: r.dep, date: sl.date, months: sl.months };
      same(sd.bv + sd.acc, sd.cost, 'book value plus accumulated depreciation equals cost');
    }
    const depSold = sd?.dep ?? 0;
    const depRest = dep - depSold;
    const end = fyEnd(fy0, y);

    // ---- depreciation charged to the asset account (no provision, no disposal account)
    const dm = ledger({
      name: A,
      opening: openingBV ? { side: 'dr', amount: openingBV } : undefined,
      dr: [...added.map((p) => [`To Bank A/c (${p.label}, ${p.date})`, p.cost]), ...(sd && sd.result > 0 ? [['To Profit and Loss A/c (profit on sale)', sd.result]] : [])],
      cr: [['By Depreciation A/c', dep], ...(sd ? [[`By Bank A/c (sale of ${sd.label}, ${sd.date})`, sd.value]] : []), ...(sd && sd.result < 0 ? [['By Profit and Loss A/c (loss on sale)', -sd.result]] : [])],
    });
    same(dm.balance, closingBV, `year ${y}: asset A/c (charged directly) closes at the computed book value`);
    const dEntries = [
      ...added.map((p) => ({ date: p.date, dr: [[A, p.cost]], cr: [['Bank A/c', p.cost]], note: `Being ${p.label} purchased` })),
      ...(sd ? [
        { date: sd.date, dr: [['Depreciation A/c', sd.dep]], cr: [[A, sd.dep]], note: `Being depreciation on ${sd.label} charged up to the date of sale` },
        { date: sd.date, dr: [['Bank A/c', sd.value], ...(sd.result < 0 ? [['Profit and Loss A/c', -sd.result]] : [])], cr: [[A, sd.bv], ...(sd.result > 0 ? [['Profit and Loss A/c', sd.result]] : [])], note: `Being ${sd.label} sold for ${rs(sd.value)}` },
      ] : []),
      ...(depRest ? [{ date: end, dr: [['Depreciation A/c', depRest]], cr: [[A, depRest]], note: 'Being depreciation for the year charged to the asset' }] : []),
      { date: end, dr: [['Profit and Loss A/c', dep]], cr: [['Depreciation A/c', dep]], note: 'Being depreciation transferred to Profit and Loss A/c' },
    ];
    const dJ = journal(dEntries);

    // ---- asset kept at cost: asset account, Provision for Depreciation account, Asset Disposal account
    const pm = ledger({
      name: A,
      opening: openingCost ? { side: 'dr', amount: openingCost } : undefined,
      dr: added.map((p) => [`To Bank A/c (${p.label}, ${p.date})`, p.cost]),
      cr: sd ? [[`By Asset Disposal A/c (${sd.label})`, sd.cost]] : [],
    });
    same(pm.balance, closingCost, `year ${y}: asset A/c (at cost) closes at the cost of the assets held`);
    const pv = ledger({
      name: 'Provision for Depreciation A/c',
      opening: openAcc ? { side: 'cr', amount: openAcc } : undefined,
      dr: sd ? [[`To Asset Disposal A/c (${sd.label})`, sd.acc]] : [],
      cr: [['By Depreciation A/c', dep]],
    });
    same(-pv.balance, closingAcc, `year ${y}: Provision for Depreciation A/c closes at the accumulated depreciation of the assets held`);
    same(pm.balance + pv.balance, closingBV, `year ${y}: cost less provision equals the book value found with the direct method`);
    let ds = null;
    if (sd) {
      ds = ledger({
        name: 'Asset Disposal A/c',
        dr: [[`To ${A} (${sd.label})`, sd.cost], ...(sd.result > 0 ? [['To Profit and Loss A/c (profit on sale)', sd.result]] : [])],
        cr: [['By Provision for Depreciation A/c', sd.acc], [`By Bank A/c (${sd.date})`, sd.value], ...(sd.result < 0 ? [['By Profit and Loss A/c (loss on sale)', -sd.result]] : [])],
      });
      same(ds.balance, 0, `year ${y}: Asset Disposal A/c closes`);
      same(sd.cost - sd.acc, sd.bv, 'book value at sale agrees across the accounts');
      same(sd.value - sd.bv, sd.result, 'profit or loss on sale agrees across the accounts');
    }
    const pEntries = [
      ...added.map((p) => ({ date: p.date, dr: [[A, p.cost]], cr: [['Bank A/c', p.cost]], note: `Being ${p.label} purchased` })),
      ...(sd ? [{ date: sd.date, dr: [['Depreciation A/c', sd.dep]], cr: [['Provision for Depreciation A/c', sd.dep]], note: `Being depreciation on ${sd.label} provided up to the date of sale` }] : []),
      ...(depRest ? [{ date: end, dr: [['Depreciation A/c', depRest]], cr: [['Provision for Depreciation A/c', depRest]], note: 'Being depreciation for the year provided' }] : []),
      { date: end, dr: [['Profit and Loss A/c', dep]], cr: [['Depreciation A/c', dep]], note: 'Being depreciation transferred to Profit and Loss A/c' },
    ];
    const sEntries = sd ? [
      { date: sd.date, dr: [['Asset Disposal A/c', sd.cost]], cr: [[A, sd.cost]], note: `Being ${sd.label} transferred to Asset Disposal A/c at cost` },
      { date: sd.date, dr: [['Provision for Depreciation A/c', sd.acc]], cr: [['Asset Disposal A/c', sd.acc]], note: `Being accumulated depreciation on ${sd.label} transferred` },
      { date: sd.date, dr: [['Bank A/c', sd.value]], cr: [['Asset Disposal A/c', sd.value]], note: `Being sale proceeds of ${sd.label} received` },
      sd.result < 0
        ? { date: sd.date, dr: [['Profit and Loss A/c', -sd.result]], cr: [['Asset Disposal A/c', -sd.result]], note: 'Being loss on sale transferred to Profit and Loss A/c' }
        : { date: sd.date, dr: [['Asset Disposal A/c', sd.result]], cr: [['Profit and Loss A/c', sd.result]], note: 'Being profit on sale transferred to Profit and Loss A/c' },
    ] : [];
    const pJ = journal(pEntries);
    const sJ = sEntries.length ? journal(sEntries) : null;
    out.push({
      y, label: fyLabel(fy0, y), end, openingBV, openingCost, openAcc, dep, depSold, depRest, added, sold: sd, closingBV, closingCost, closingAcc,
      direct: { asset: dm, journal: dJ, entries: dEntries },
      prov: { asset: pm, provision: pv, disposal: ds, journal: pJ, saleJournal: sJ, entries: pEntries, saleEntries: sEntries },
    });
  }
  const totalDep = sum(out.map((o) => o.dep));
  const cost = sum(items.map((i) => i.cost));
  const sdAll = out.find((o) => o.sold)?.sold;
  same(totalDep + out[years - 1].closingBV + (sdAll ? sdAll.bv : 0), cost, 'total depreciation, the book value left and the book value of the asset sold add up to the cost');
  const headers = ['Year ended', ...items.map((i) => `${i.label} (₹)`), 'Total (₹)', 'Book value at year end (₹)'];
  const rows = out.map((o) => [o.end, ...per.map((p) => { const r = p.rows[o.y - p.year]; return r ? inr(r.dep) : '–'; }), inr(o.dep), inr(o.closingBV)]);
  const work = { headers, rows, md: mdTable(headers, rows) };
  const R = (id) => per.find((p) => p.id === id).rows;
  return { years: out, per, items: its, work, totalDep, cost, sale: sl, R };
}

/** Same rate, both methods, year by year. Every row adds up to cost. */
export function compare({ cost, ratePct, years }) {
  const s = schedule({ cost, ratePct, method: 'slm', years });
  const w = schedule({ cost, ratePct, method: 'wdv', years });
  for (const r of [...s, ...w]) same(r.opening - r.dep, r.closing, 'closing equals opening less depreciation');
  same(sum(s.map((r) => r.dep)) + s[years - 1].closing, cost, 'SLM depreciation plus closing book value equals cost');
  same(sum(w.map((r) => r.dep)) + w[years - 1].closing, cost, 'WDV depreciation plus closing book value equals cost');
  const headers = ['Year', 'SLM charge (₹)', 'SLM book value (₹)', 'WDV charge (₹)', 'WDV book value (₹)'];
  const rows = s.map((r, i) => [String(r.year), inr(r.dep), inr(r.closing), inr(w[i].dep), inr(w[i].closing)]);
  rows.push(['**Total**', `**${inr(sum(s.map((r) => r.dep)))}**`, '', `**${inr(sum(w.map((r) => r.dep)))}**`, '']);
  return { s, w, headers, rows, md: mdTable(headers, rows), totalSlm: sum(s.map((r) => r.dep)), totalWdv: sum(w.map((r) => r.dep)) };
}

/** One asset, one method, a table of year / opening / charge / closing (and the rate). */
export function track({ cost, ratePct, method, years, months = [], label = 'Year' }) {
  const rows = schedule({ cost, ratePct, method, years, months });
  const headers = [label, 'Opening book value (₹)', 'Depreciation (₹)', 'Closing book value (₹)'];
  const body = rows.map((r) => [String(r.year), inr(r.opening), inr(r.dep), inr(r.closing)]);
  return { rows, headers, md: mdTable(headers, body), body, total: sum(rows.map((r) => r.dep)) };
}

/** Rate per cent of the straight line method from cost, scrap value and life, with the annual charge. */
export function slmRate({ cost, scrap, life }) {
  const r = slm({ cost, scrap, life });
  same(r.annual * life + scrap, cost, 'annual charge times life plus scrap equals cost');
  return r;
}

/** Entries as a markdown journal with the narration. Shortcut used by the items. */
export const jmd = (entries) => journal(entries).md;

// ---------------------------------------------------------------- self-check (runs on import)
{
  same(monthsBetween('1 July 2026', '31 March 2027'), 9, 'months 1 July to 31 March');
  same(monthsBetween('1 April 2026', '31 March 2027'), 12, 'months in a full year');
  same(monthsBetween('1 April 2027', '30 September 2027'), 6, 'months 1 April to 30 September');
  same(monthsBetween('1 April 2027', '1 October 2027'), 6, 'months 1 April to 1 October');
  same(monthsBetween('1 February 2027', '31 March 2027'), 2, 'months 1 February to 31 March');
  const F = fleet({
    asset: 'Plant', rate: 10, method: 'slm', years: 3, fy0: 2026,
    items: [{ id: 'A', label: 'Plant A', cost: 400000, buy: '1 April 2026' }, { id: 'B', label: 'Plant B', cost: 240000, buy: '1 July 2026' }],
    sale: { id: 'B', on: '1 January 2029', value: 200000 },
  });
  check(F.years.map((y) => y.dep).join(',') === '58000,64000,58000', 'self-test depreciation');
  same(F.years[2].sold.bv, 180000, 'self-test book value at sale');
  same(F.years[2].sold.result, 20000, 'self-test profit on sale');
  same(F.years[2].closingBV, 280000, 'self-test closing book value');
  same(F.years[2].prov.provision.balance, -120000, 'self-test provision balance');
  const c = compare({ cost: 625000, ratePct: 20, years: 5 });
  same(c.w[4].closing, 204800, 'self-test WDV closing');
}
