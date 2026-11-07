// Chapter helpers for CBSE 11 Accountancy ch07 (Depreciation, Provisions and Reserves). Extends the shared acc.mjs:
// a fleet of assets depreciated year by year (straight line or written down value, part-year charges for a purchase or
// a sale during the year), the Machinery Account, the Provision for Depreciation Account and the Asset Disposal Account
// for each year under both methods of recording (every account closes), the journal entries, an SLM against WDV
// comparison and a profit allocation (provision, then general reserve). Every result is asserted: the closing balance of
// the Machinery Account (asset charged directly) equals cost less the Provision for Depreciation Account balance (asset
// kept at cost); the book value at sale and the profit or loss on sale agree across the accounts; the Asset Disposal
// Account closes; depreciation plus closing book value equals cost. Imagined firms only.
import { same, check, sum, whole, inr, rs, words, rupees, mdTable, journal, ledger, slm, schedule, onSale } from '../../cbse-11-accountancy-ch01/src/acc.mjs';

export { same, check, sum, whole, inr, rs, words, rupees, mdTable, journal, ledger, slm, schedule, onSale };

export const fyLabel = (fy0, y) => `${fy0 + y - 1}–${String(fy0 + y).slice(2)}`;
export const fyEnd = (fy0, y) => `31 March ${fy0 + y}`;

/**
 * Assets depreciated over years. items: [{ id, label, cost, year (1-based year of purchase), months (months used in that
 * year), date }]. sale: { id, year, months (months used in the sale year, up to the date of sale), value, date }.
 * rate in per cent; method 'slm' (on original cost) or 'wdv' (on the opening book value). The books are closed every
 * 31 March; the first year ends on 31 March of fy0 + 1.
 */
export function fleet({ asset = 'Machinery', rate, method, items, years, sale, fy0 }) {
  check(['slm', 'wdv'].includes(method), `unknown method ${method}`);
  const per = items.map((it) => {
    const sold = sale?.id === it.id;
    const last = sold ? sale.year : years;
    check(!sold || sale.year > it.year, `${it.id}: sold in the year of purchase is not modelled`);
    const n = last - it.year + 1;
    const months = Array.from({ length: n }, (_, i) => (i === 0 ? it.months : 12));
    if (sold) months[n - 1] = sale.months;
    return { ...it, sold, rows: schedule({ cost: it.cost, ratePct: rate, method, years: n, months }) };
  });
  const A = `${asset} A/c`;
  const out = [];
  for (let y = 1; y <= years; y++) {
    const live = per.filter((p) => p.year <= y && (!p.sold || sale.year >= y));
    const row = (p) => p.rows[y - p.year];
    const old = live.filter((p) => p.year < y);
    const added = live.filter((p) => p.year === y);
    const openingBV = sum(old.map((p) => row(p).opening));
    const openingCost = sum(old.map((p) => p.cost));
    const openAcc = openingCost - openingBV;
    if (y > 1) same(openingBV, out[y - 2].closingBV, `opening book value of year ${y} equals the previous closing`);
    const dep = sum(live.map((p) => row(p).dep));
    const soldP = live.find((p) => p.sold && sale.year === y);
    const keep = live.filter((p) => p !== soldP);
    const closingBV = sum(keep.map((p) => row(p).closing));
    const closingCost = sum(keep.map((p) => p.cost));
    const closingAcc = closingCost - closingBV;
    let sd = null;
    if (soldP) {
      const r = row(soldP);
      sd = { id: soldP.id, label: soldP.label, cost: soldP.cost, bv: r.closing, acc: soldP.cost - r.closing, value: sale.value, result: onSale(r.closing, sale.value), dep: r.dep, date: sale.date, months: sale.months };
      same(sd.bv + sd.acc, sd.cost, 'book value plus accumulated depreciation equals cost');
    }
    const depSold = sd?.dep ?? 0;
    const depRest = dep - depSold;
    const end = fyEnd(fy0, y);

    // ---- asset charged directly: one Machinery Account
    const dm = ledger({
      name: A,
      opening: openingBV ? { side: 'dr', amount: openingBV } : undefined,
      dr: [...added.map((p) => [`To Bank A/c (${p.label}, ${p.date})`, p.cost]), ...(sd && sd.result > 0 ? [[`To Profit and Loss A/c (profit on sale of ${sd.label})`, sd.result]] : [])],
      cr: [['By Depreciation A/c', dep], ...(sd ? [[`By Bank A/c (sale of ${sd.label}, ${sd.date})`, sd.value]] : []), ...(sd && sd.result < 0 ? [[`By Profit and Loss A/c (loss on sale of ${sd.label})`, -sd.result]] : [])],
    });
    same(dm.balance, closingBV, `year ${y}: Machinery A/c (direct) closes at the computed book value`);
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

    // ---- asset kept at cost: Machinery Account, Provision for Depreciation Account, Asset Disposal Account
    const pm = ledger({
      name: A,
      opening: openingCost ? { side: 'dr', amount: openingCost } : undefined,
      dr: added.map((p) => [`To Bank A/c (${p.label}, ${p.date})`, p.cost]),
      cr: sd ? [[`By Asset Disposal A/c (${sd.label})`, sd.cost]] : [],
    });
    same(pm.balance, closingCost, `year ${y}: Machinery A/c (at cost) closes at the cost of the assets in hand`);
    const pv = ledger({
      name: 'Provision for Depreciation A/c',
      opening: openAcc ? { side: 'cr', amount: openAcc } : undefined,
      dr: sd ? [[`To Asset Disposal A/c (${sd.label})`, sd.acc]] : [],
      cr: [['By Depreciation A/c', dep]],
    });
    same(-pv.balance, closingAcc, `year ${y}: Provision for Depreciation A/c closes at the accumulated depreciation of the assets in hand`);
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
      ...(sd ? [{ date: sd.date, dr: [['Depreciation A/c', sd.dep]], cr: [['Provision for Depreciation A/c', sd.dep]], note: `Being depreciation on ${sd.label} charged up to the date of sale` }] : []),
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
      direct: { mach: dm, journal: dJ, entries: dEntries },
      prov: { mach: pm, provision: pv, disposal: ds, journal: pJ, saleJournal: sJ, entries: pEntries, saleEntries: sEntries },
    });
  }
  // the years add up: depreciation plus the book value left, less any asset sold, equals cost
  const totalDep = sum(out.map((o) => o.dep));
  const cost = sum(items.map((i) => i.cost));
  const sd = out.find((o) => o.sold)?.sold;
  same(totalDep + out[years - 1].closingBV + (sd ? sd.bv : 0), cost, 'total depreciation, the book value left and the book value of the asset sold add up to the cost');
  const headers = ['Year ended', ...items.map((i) => `${i.label} (₹)`), 'Total (₹)', 'Book value at year end (₹)'];
  const rows = out.map((o) => [
    o.end,
    ...per.map((p) => {
      const r = p.rows[o.y - p.year];
      return r ? inr(r.dep) : '–';
    }),
    inr(o.dep),
    inr(o.closingBV),
  ]);
  const work = { headers, rows, md: mdTable(headers, rows) };
  return { years: out, per, items, work, totalDep, cost };
}

/** Same rate, both methods, year by year: depreciation and closing book value. Every row adds up to cost. */
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

/**
 * Profit before provisions → provisions charged → net profit → transfers to reserves (per cent of net profit) → profit
 * left. provisions: [[label, amount]]; reserves: [[label, pct]]. Returns rows, md, the amounts and the journal entries.
 */
export function allocate({ before, provisions, reserves }) {
  const provTotal = sum(provisions.map(([, a]) => a));
  const net = before - provTotal;
  const res = reserves.map(([label, pct]) => [label, whole((net * pct) / 100, `reserve ${label}`), pct]);
  const resTotal = sum(res.map(([, a]) => a));
  const left = net - resTotal;
  check(left >= 0 && net > 0, 'profit allocation leaves a negative profit');
  same(before - provTotal - resTotal, left, 'profit allocation adds up');
  const rows = [
    ['Profit before provisions', inr(before)],
    ...provisions.map(([l, a]) => [`Less: ${l}`, `(${inr(a)})`]),
    ['**Net profit**', `**${inr(net)}**`],
    ...res.map(([l, a, p]) => [`Less: ${l} (${p}% of net profit)`, `(${inr(a)})`]),
    ['**Profit retained in the business**', `**${inr(left)}**`],
  ];
  const headers = ['Particulars', '₹'];
  const entries = [
    ...provisions.map(([l, a]) => ({ dr: [['Profit and Loss A/c', a]], cr: [[`Provision for ${l.replace(/^provision for /i, '')} A/c`, a]], note: `Being provision for ${l.replace(/^provision for /i, '')} created` })),
    ...res.map(([l, a]) => ({ dr: [['Profit and Loss A/c', a]], cr: [[`${l.replace(/^transfer to /i, '').replace(/^./, (c) => c.toUpperCase())} A/c`, a]], note: `Being ${l.toLowerCase()} made out of profit` })),
  ];
  return { net, left, provTotal, res, resTotal, headers, rows, md: mdTable(headers, rows), entries, journal: journal(entries) };
}

// ---------------------------------------------------------------- self-check (runs on import)
{
  // SLM 10% on 4,00,000 (1 April) and 2,40,000 (1 October of the first year), the second sold on 1 January of year 3 for 1,80,000.
  const F = fleet({
    rate: 10, method: 'slm', years: 3, fy0: 2025,
    items: [{ id: 'A', label: 'Machine A', cost: 400000, year: 1, months: 12, date: '1 April 2025' }, { id: 'B', label: 'Machine B', cost: 240000, year: 1, months: 6, date: '1 October 2025' }],
    sale: { id: 'B', year: 3, months: 9, value: 180000, date: '1 January 2028' },
  });
  same(F.years[0].dep, 52000, 'selftest year 1 depreciation');
  same(F.years[1].dep, 64000, 'selftest year 2 depreciation');
  same(F.years[2].dep, 58000, 'selftest year 3 depreciation');
  same(F.years[2].sold.bv, 186000, 'selftest book value at sale');
  same(F.years[2].sold.result, -6000, 'selftest loss on sale');
  same(F.years[2].closingBV, 280000, 'selftest closing book value');
  same(F.years[2].prov.provision.balance, -120000, 'selftest provision balance');
  const c = compare({ cost: 500000, ratePct: 20, years: 5 });
  same(c.w[4].closing, 163840, 'selftest WDV closing');
  same(c.s[4].closing, 0, 'selftest SLM closing');
  const a = allocate({ before: 120000, provisions: [['provision for repairs', 20000]], reserves: [['transfer to general reserve', 10]] });
  same(a.left, 90000, 'selftest profit retained');
}
