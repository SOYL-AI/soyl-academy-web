// Statement engine for isc-12-accounts-ch10 (Financial Statement Analysis: Comparative and Common Size
// Statements), ISC 2027 Accountancy (858), Paper I Section B. The approach follows the CBSE 12
// Accountancy ch09 engine (two-column statement models, then comparative and common-size views computed
// from them); the code, companies and figures here are this chapter's own.
//
// ISC 2027: statements are prepared WITHOUT notes to accounts, so both models stop at head and sub-head
// level (no Note No. column).
//
// plStatement() holds a Statement of Profit and Loss (Schedule III Part II heads; no exceptional or
// extraordinary items) and bsStatement() a Balance Sheet (Schedule III Part I heads and sub-heads) for two
// columns: two years of one company (intra-firm) or two companies in one year (inter-firm). Every derived
// line is computed from the givens and re-added: total income, total expenses, profit before tax, tax in
// whole rupees, profit after tax; head and part totals; equity and liabilities = assets in every column.
//
// comparative() and commonSize() then compute every change and percentage and assert it:
//   - absolute change = second column − first column, for every line; the changes of the totals re-add
//     through the same relations, and in a balance sheet both totals change by the same amount;
//   - percentage change = absolute change ÷ first-column amount × 100, shown only when the first-column
//     amount is positive ("—" otherwise: there is no base to divide by);
//   - common-size % = item ÷ base × 100, base = revenue from operations (profit and loss) or the
//     balance sheet total of the same column (each part of a balance sheet);
//   - ROUNDING RULE (stated in every model answer that rounds): every percentage is rounded to two
//     decimal places, a half (0.005) rounded away from zero, computed in integer hundredths of a per cent
//     so the result never depends on floating point. In a common-size balance sheet each part of each
//     column must total exactly 100.00: when the rounded lines add to 100.01 or 99.99, the line whose
//     rounding error lies furthest in the direction of the excess is moved by 0.01 and marked †, so no
//     line is more than 0.01 from its exact value. In a common-size statement of profit and loss every
//     line (totals included) is rounded on its own and the build throws unless the rounded lines still
//     re-add (choose other figures if they do not).
// Tables and every figure quoted in a key are rendered FROM these computed values (Indian digit grouping),
// so a figure is never typed twice.

export function check(ok, what) {
  if (!ok) throw new Error(`acc: ${what}`);
}

// ---------------------------------------------------------------- numbers and words
const IN = new Intl.NumberFormat('en-IN');
/** 120000 -> "1,20,000"; a negative amount (a decrease) -> "(6,000)". Whole rupees only. */
export function fig(n) {
  check(Number.isInteger(n), `not a whole number of rupees: ${n}`);
  return n < 0 ? `(${IN.format(-n)})` : IN.format(n);
}
/** An amount cell: nil shown as a dash. */
export const amt = (n) => (n === 0 ? '—' : fig(n));
/** 120000 -> "₹1,20,000"; -6000 -> "(₹6,000)". */
export const rs = (n) => (n < 0 ? `(₹${fig(-n)})` : `₹${fig(n)}`);
export const sum = (xs) => xs.reduce((a, b) => a + b, 0);
/** rate per cent of an amount, whole rupees only (tax, a cost given as a share of revenue). */
export function pctOf(rate, amount) {
  const v = (amount * rate) / 100;
  check(Number.isInteger(v), `${rate}% of ${amount} is not whole rupees`);
  return v;
}

const ONES = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
const two = (n) => (n < 20 ? ONES[n] : TENS[Math.floor(n / 10)] + (n % 10 ? `-${ONES[n % 10]}` : ''));
/** Indian number words for narration: 146600 -> "one lakh forty-six thousand six hundred". */
export function words(n) {
  check(Number.isInteger(n) && n >= 0, `words(${n})`);
  if (n === 0) return 'zero';
  const out = [];
  const crore = Math.floor(n / 1e7);
  const lakh = Math.floor(n / 1e5) % 100;
  const th = Math.floor(n / 1000) % 100;
  const h = Math.floor(n / 100) % 10;
  const r = n % 100;
  if (crore) out.push(`${words(crore)} crore`);
  if (lakh) out.push(`${two(lakh)} lakh`);
  if (th) out.push(`${two(th)} thousand`);
  if (h) out.push(`${ONES[h]} hundred`);
  if (r) out.push(two(r));
  return out.join(' ');
}
/** "rupees one lakh twenty thousand" (absolute value) for narration. */
export const rw = (n) => `rupees ${words(Math.abs(n))}`;

// ---------------------------------------------------------------- percentages in integer hundredths
/**
 * part ÷ base × 100 in hundredths of a per cent, rounded half away from zero:
 * (150000, 1200000) -> 1250, i.e. 12.50 %. Integer arithmetic only.
 */
export function hundredths(part, base) {
  check(Number.isInteger(part) && Number.isInteger(base) && base > 0, `hundredths(${part}, ${base})`);
  const n = part * 10000;
  check(Number.isSafeInteger(n), 'percentage numerator too large');
  const q = Math.trunc(n / base);
  const r = n - q * base;
  check(Math.abs(r) < base, 'integer division');
  return 2 * Math.abs(r) >= base ? q + Math.sign(n) : q;
}
/** True when part ÷ base × 100 needs no rounding at two decimals. */
export const exact = (part, base) => (part * 10000) % base === 0;
/** 1250 -> "12.50"; -1250 -> "(12.50)". */
export function pc(h) {
  check(Number.isInteger(h), `pc(${h})`);
  const a = Math.abs(h);
  const s = `${Math.floor(a / 100)}.${String(a % 100).padStart(2, '0')}`;
  return h < 0 ? `(${s})` : s;
}
/** 1250 -> "12.50%"; -1250 -> "−12.50%" (prose). */
export const pcs = (h) => (h < 0 ? `−${pc(-h)}%` : `${pc(h)}%`);
/** Value for an answer key: 1250 -> 12.5. */
export const pcv = (h) => h / 100;
/** Narration: 2429 -> "twenty-four point two nine per cent" (absolute value). */
export function pctWords(h) {
  const a = Math.abs(h);
  const i = Math.floor(a / 100);
  const f = a % 100;
  if (!f) return `${words(i)} per cent`;
  const d = f % 10 ? `${ONES[Math.floor(f / 10)]} ${ONES[f % 10]}` : ONES[f / 10];
  return `${words(i)} point ${d} per cent`;
}

// ---------------------------------------------------------------- markdown
/** Markdown table; `num` = indexes of right-aligned (amount) columns. */
export function md(headers, rows, num = []) {
  for (const r of rows) check(r.length === headers.length, `table row has ${r.length} cells, header ${headers.length}: ${r.join(' | ')}`);
  const sep = headers.map((_, i) => (num.includes(i) ? '---:' : '---'));
  const line = (cells) => `| ${cells.map((c) => (c === '' ? ' ' : c)).join(' | ')} |`;
  return [line(headers), line(sep), ...rows.map(line)].join('\n');
}
export const bold = (s) => (s === '' ? '' : `**${s}**`);

// ---------------------------------------------------------------- Statement of Profit and Loss model
export const PL_HEADS = {
  rev: 'Revenue from Operations',
  oi: 'Other Income',
  com: 'Cost of Materials Consumed',
  pst: 'Purchases of Stock-in-Trade',
  chg: 'Changes in Inventories of Finished Goods, Work-in-Progress and Stock-in-Trade',
  emp: 'Employee Benefits Expense',
  fin: 'Finance Costs',
  dep: 'Depreciation and Amortisation Expense',
  oth: 'Other Expenses',
};
/** Plain labels for the givens of a stem. */
export const PL_GIVEN = {
  rev: 'Revenue from operations',
  oi: 'Other income',
  com: 'Cost of materials consumed',
  pst: 'Purchases of stock-in-trade',
  chg: 'Changes in inventories of finished goods and stock-in-trade',
  emp: 'Employee benefits expense',
  fin: 'Finance costs',
  dep: 'Depreciation and amortisation expense',
  oth: 'Other expenses',
};
const EXP = ['com', 'pst', 'chg', 'emp', 'fin', 'dep', 'oth'];
const L = 'abcdefgh';

/**
 * Statement of Profit and Loss for two columns. cols: column labels (years or companies); v: { rev, oi?,
 * com?, pst?, chg?, emp?, fin?, dep?, oth? } with one whole-rupee amount per column ('chg' may be
 * negative: inventories rose); taxRate: whole-number per cent of profit before tax, one or one per column.
 */
export function plStatement({ cols, v, taxRate }) {
  check(cols.length === 2, 'two columns');
  for (const [k, xs] of Object.entries(v)) {
    check(PL_HEADS[k], `unknown profit and loss head ${k}`);
    check(xs.length === 2 && xs.every(Number.isInteger), `${k}: one whole-rupee amount per column`);
    check(k === 'chg' || xs.every((x) => x >= 0), `${k}: amounts not negative`);
  }
  check(v.rev && v.rev.every((x) => x > 0), 'revenue from operations positive');
  const get = (k) => v[k] ?? [0, 0];
  const exps = EXP.filter((k) => v[k]);
  check(exps.length > 0, 'at least one expense head');
  const hasOI = Boolean(v.oi);
  const ti = [0, 1].map((i) => get('rev')[i] + get('oi')[i]);
  const te = [0, 1].map((i) => sum(exps.map((k) => v[k][i])));
  const pbt = [0, 1].map((i) => ti[i] - te[i]);
  const rates = Array.isArray(taxRate) ? taxRate : [taxRate, taxRate];
  check(rates.length === 2 && rates.every((r) => Number.isInteger(r) && r >= 0 && r < 100), 'tax rates');
  const tax = pbt.map((p, i) => {
    check(p > 0, `profit before tax positive in ${cols[i]}`);
    return pctOf(rates[i], p);
  });
  const pat = pbt.map((p, i) => p - tax[i]);
  [0, 1].forEach((i) => check(pat[i] + tax[i] + te[i] === ti[i], `${cols[i]}: statement re-adds`));

  const R = hasOI ? ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'] : ['I', null, null, 'II', 'III', 'IV', 'V'];
  const taxLabel = rates[0] === rates[1] ? `${R[5]}. Less: Tax (${rates[0]}% of profit before tax)` : `${R[5]}. Less: Tax`;
  const lines = [
    { key: 'rev', label: `I. ${PL_HEADS.rev}`, vals: get('rev') },
    ...(hasOI ? [{ key: 'oi', label: `II. ${PL_HEADS.oi}`, vals: v.oi }, { key: 'ti', label: 'III. Total Income (I + II)', vals: ti, bold: true }] : []),
    { key: 'expH', label: `${R[3]}. Expenses`, header: true },
    ...exps.map((k, j) => ({ key: k, label: `(${L[j]}) ${PL_HEADS[k]}`, vals: v[k] })),
    { key: 'te', label: `Total Expenses (${R[3]})`, vals: te, bold: true },
    { key: 'pbt', label: `${R[4]}. Profit before Tax (${hasOI ? 'III' : 'I'} − ${R[3]})`, vals: pbt, bold: true },
    { key: 'tax', label: taxLabel, vals: tax },
    { key: 'pat', label: `${R[6]}. Profit after Tax (${R[4]} − ${R[5]})`, vals: pat, bold: true },
  ];
  const rel = [...(hasOI ? [['ti', ['rev', 'oi'], []]] : []), ['te', exps, []], ['pbt', [hasOI ? 'ti' : 'rev'], ['te']], ['pat', ['pbt'], ['tax']]];
  return finish({ kind: 'pl', cols, lines, rel, rates, exps });
}

// ---------------------------------------------------------------- Balance Sheet model (Schedule III Part I)
export const HEADS = {
  sf: ['el', "Shareholders' Funds"],
  ncl: ['el', 'Non-current Liabilities'],
  cl: ['el', 'Current Liabilities'],
  nca: ['as', 'Non-current Assets'],
  ca: ['as', 'Current Assets'],
};
export const SUBS = {
  sc: ['sf', 'Share Capital'],
  rs: ['sf', 'Reserves and Surplus'],
  ltb: ['ncl', 'Long-term Borrowings'],
  oltl: ['ncl', 'Other Long-term Liabilities'],
  ltp: ['ncl', 'Long-term Provisions'],
  stb: ['cl', 'Short-term Borrowings'],
  tp: ['cl', 'Trade Payables'],
  ocl: ['cl', 'Other Current Liabilities'],
  stp: ['cl', 'Short-term Provisions'],
  ppe: ['nca', 'Property, Plant and Equipment'],
  intang: ['nca', 'Intangible Assets'],
  cwip: ['nca', 'Capital Work-in-Progress'],
  nci: ['nca', 'Non-current Investments'],
  ltla: ['nca', 'Long-term Loans and Advances'],
  ci: ['ca', 'Current Investments'],
  inv: ['ca', 'Inventories'],
  tr: ['ca', 'Trade Receivables'],
  cce: ['ca', 'Cash and Cash Equivalents'],
  stla: ['ca', 'Short-term Loans and Advances'],
  oca: ['ca', 'Other Current Assets'],
};
export const PPE_GROUP_NAME = 'Property, Plant and Equipment and Intangible Assets';
const PPE_GROUP = ['ppe', 'intang', 'cwip'];
const ROMAN = ['i', 'ii', 'iii'];

/**
 * Balance Sheet at sub-head level for two columns. v: { sc: [a, b], rs: [a, b], … } whole rupees, not
 * negative, at least one positive. Head and part totals are computed; equity and liabilities must equal
 * assets in both columns.
 */
export function bsStatement({ cols, v }) {
  check(cols.length === 2, 'two columns');
  for (const [k, xs] of Object.entries(v)) {
    check(SUBS[k], `unknown sub-head ${k}`);
    check(xs.length === 2 && xs.every((x) => Number.isInteger(x) && x >= 0) && xs.some((x) => x > 0), `${k}: whole-rupee amounts`);
  }
  const keys = Object.keys(SUBS).filter((k) => v[k]);
  const head = {};
  for (const k of keys) {
    const h = SUBS[k][0];
    head[h] = [0, 1].map((i) => (head[h]?.[i] ?? 0) + v[k][i]);
  }
  const part = { el: [0, 0], as: [0, 0] };
  for (const [h, xs] of Object.entries(head)) xs.forEach((x, i) => (part[HEADS[h][0]][i] += x));
  [0, 1].forEach((i) => check(part.el[i] === part.as[i] && part.el[i] > 0, `balance sheet ${cols[i]} does not balance: ${part.el[i]} vs ${part.as[i]}`));

  const lines = [];
  const rel = [];
  for (const p of ['el', 'as']) {
    lines.push({ key: `${p}H`, label: p === 'el' ? 'I. EQUITY AND LIABILITIES' : 'II. ASSETS', header: true });
    let hn = 0;
    const leaves = [];
    for (const [h, [hp, name]] of Object.entries(HEADS)) {
      if (hp !== p) continue;
      const subs = keys.filter((k) => SUBS[k][0] === h);
      if (!subs.length) continue;
      lines.push({ key: `${h}H`, label: `${++hn}. ${name}`, header: true });
      let letter = 0;
      let roman = 0;
      for (const k of subs) {
        if (PPE_GROUP.includes(k)) {
          if (!roman) lines.push({ key: 'ppeH', label: `(${L[letter++]}) ${PPE_GROUP_NAME}`, header: true });
          lines.push({ key: k, label: `(${ROMAN[roman++]}) ${SUBS[k][1]}`, vals: v[k], part: p });
        } else lines.push({ key: k, label: `(${L[letter++]}) ${SUBS[k][1]}`, vals: v[k], part: p });
        leaves.push(k);
      }
    }
    lines.push({ key: `${p}T`, label: 'Total', vals: part[p], bold: true, part: p });
    rel.push([`${p}T`, leaves, []]);
  }
  return finish({ kind: 'bs', cols, lines, rel, head, part, keys });
}

function finish(st) {
  const byKey = new Map(st.lines.filter((l) => !l.header).map((l) => [l.key, l]));
  st.val = (k) => {
    const l = byKey.get(k);
    check(l, `no line ${k}`);
    return l.vals;
  };
  st.has = (k) => byKey.has(k);
  // Every relation holds in both columns, re-added independently of how the totals were built.
  for (const [t, plus, minus] of st.rel) [0, 1].forEach((i) => check(st.val(t)[i] === sum(plus.map((k) => st.val(k)[i])) - sum(minus.map((k) => st.val(k)[i])), `${st.cols[i]}: ${t} re-adds`));
  return st;
}

/** The givens of a statement as a two-column table (for stems). totals: false hides the computed lines. */
export function twoCol(st, { totals = true } = {}) {
  const rows = st.lines
    .filter((l) => totals || !l.bold)
    .map((l) => (l.header ? [bold(l.label), '', ''] : [l.bold ? bold(l.label) : l.label, ...l.vals.map((x) => (l.bold ? bold(amt(x)) : amt(x)))]));
  return md(['Particulars', `${st.cols[0]} (₹)`, `${st.cols[1]} (₹)`], rows, [1, 2]);
}
/** Raw profit and loss givens (no totals) in plain words, for a stem. */
export function plGiven(st) {
  const keys = ['rev', ...(st.has('oi') ? ['oi'] : []), ...st.exps];
  return md(['Particulars', `${st.cols[0]} (₹)`, `${st.cols[1]} (₹)`], keys.map((k) => [PL_GIVEN[k], ...st.val(k).map(fig)]), [1, 2]);
}

// ---------------------------------------------------------------- comparative statement
/**
 * Comparative statement: both columns, absolute change (second − first) and percentage change (change ÷
 * first × 100, two decimals) on every line; "—" where the first column is not positive. interfirm: the
 * columns are two companies and the first is the base (headers say "Difference").
 */
export function comparative(st, { interfirm = false } = {}) {
  const [c0, c1] = st.cols;
  const ch = {};
  const rows = [];
  for (const l of st.lines) {
    if (l.header) {
      rows.push([bold(l.label), '', '', '', '']);
      continue;
    }
    const [a, b] = l.vals;
    const abs = b - a;
    const h = a > 0 ? hundredths(abs, a) : null;
    ch[l.key] = { a, b, abs, h, exact: h === null || exact(abs, a) };
    const cells = [l.label, amt(a), amt(b), fig(abs), h === null ? '—' : pc(h)];
    rows.push(l.bold ? cells.map(bold) : cells);
  }
  for (const [t, plus, minus] of st.rel) check(ch[t].abs === sum(plus.map((k) => ch[k].abs)) - sum(minus.map((k) => ch[k].abs)), `change in ${t} re-adds`);
  if (st.kind === 'bs') check(ch.elT.abs === ch.asT.abs && ch.elT.h === ch.asT.h, 'both totals change by the same amount and percentage');
  // Every percentage re-derived the long way (cross-check of hundredths()).
  for (const c of Object.values(ch)) if (c.h !== null) check(Math.abs((c.abs / c.a) * 10000 - c.h) <= 0.5 + 1e-9, 'percentage change rounding');
  const headers = interfirm
    ? ['Particulars', `${c0} (₹)`, `${c1} (₹)`, `Difference (₹)`, `Difference (% of ${c0})`]
    : ['Particulars', `${c0} (₹)`, `${c1} (₹)`, 'Absolute change (₹)', 'Percentage change (%)'];
  const rounded = Object.values(ch).filter((c) => !c.exact).length;
  // Head totals and their change (for interpretation).
  const headCh = {};
  if (st.kind === 'bs') for (const [h, [a, b]] of Object.entries(st.head)) headCh[h] = { a, b, abs: b - a, h: hundredths(b - a, a) };
  return { st, ch, headCh, headers, rows, md: md(headers, rows, [1, 2, 3, 4]), rounded };
}

// ---------------------------------------------------------------- common-size statement
/**
 * Common-size statement: both columns in rupees and as a percentage of the base (revenue from operations
 * for profit and loss; the part total for a balance sheet). Asserted: the base line is 100.00; each part
 * of each balance sheet column totals 100.00 (after the †-adjustment described at the top); in profit
 * and loss every relation holds in the rounded figures.
 */
export function commonSize(st) {
  const [c0, c1] = st.cols;
  const p = {};
  const err = {}; // rounding error × base, an exact integer: hundredths × base − amount × 10000
  const adjusted = [];
  const baseOf = (l, i) => (st.kind === 'pl' ? st.val('rev')[i] : st.part[l.part][i]);
  for (const l of st.lines) {
    if (l.header) continue;
    p[l.key] = l.vals.map((x, i) => hundredths(x, baseOf(l, i)));
    err[l.key] = l.vals.map((x, i) => p[l.key][i] * baseOf(l, i) - x * 10000);
  }
  if (st.kind === 'bs') {
    for (const [t, leaves] of st.rel) {
      const part = t.slice(0, 2);
      [0, 1].forEach((i) => {
        let residue = 10000 - sum(leaves.map((k) => p[k][i]));
        check(Math.abs(residue) < leaves.length, `${st.cols[i]} ${t}: rounding residue ${residue} too large`);
        while (residue !== 0) {
          const dir = Math.sign(residue); // +1: the lines add to less than 100.00, so raise the most under-rounded line
          const pick = leaves.slice().sort((a, b) => dir * (err[a][i] - err[b][i]) || st.val(b)[i] - st.val(a)[i] || leaves.indexOf(a) - leaves.indexOf(b))[0];
          p[pick][i] += dir;
          err[pick][i] += dir * st.part[part][i];
          adjusted.push({ key: pick, col: i, by: dir, part });
          residue -= dir;
        }
        check(sum(leaves.map((k) => p[k][i])) === 10000 && p[t][i] === 10000, `${st.cols[i]} ${t}: column totals 100.00`);
        for (const k of leaves) check(Math.abs(err[k][i]) < st.part[part][i], `${k}: within 0.01 of its exact value`);
      });
    }
  } else {
    [0, 1].forEach((i) => {
      check(p.rev[i] === 10000, 'revenue from operations is 100.00');
      for (const [t, plus, minus] of st.rel) check(p[t][i] === sum(plus.map((k) => p[k][i])) - sum(minus.map((k) => p[k][i])), `${st.cols[i]}: rounded ${t} re-adds (choose other figures)`);
    });
  }
  const isAdj = (k, i) => adjusted.some((a) => a.key === k && a.col === i);
  const rows = [];
  for (const l of st.lines) {
    if (l.header) {
      rows.push([bold(l.label), '', '', '', '']);
      continue;
    }
    const cells = [l.label, amt(l.vals[0]), amt(l.vals[1]), ...[0, 1].map((i) => `${pc(p[l.key][i])}${isAdj(l.key, i) ? ' †' : ''}`)];
    rows.push(l.bold ? cells.map(bold) : cells);
  }
  const what = st.kind === 'pl' ? 'revenue from operations' : 'total';
  const headers = ['Particulars', `${c0} (₹)`, `${c1} (₹)`, `${c0} (% of ${what})`, `${c1} (% of ${what})`];
  const rounded = Object.values(err).flat().filter((e) => e !== 0).length;
  const adjNote = adjusted.length
    ? `† ${adjusted
        .map((a) => {
          const x = st.val(a.key)[a.col];
          const base = st.part[a.part][a.col];
          const exactH = ((x * 100) / base).toFixed(4);
          const more = (x * 1000000) % base !== 0 ? '…' : '';
          return `${SUBS[a.key][1]} (${st.cols[a.col]}) is ${exactH}${more}% of the total, which rounds to ${pc(p[a.key][a.col] - a.by)}; the rounded ${a.part === 'el' ? 'equity and liabilities' : 'assets'} lines of that column add to ${pc(10000 - a.by)}, so this line, the one with the largest rounding error, is shown as ${pc(p[a.key][a.col])} and the column totals 100.00`;
        })
        .join('; ')}.`
    : '';
  // Head shares for interpretation: each head total ÷ its part total, rounded on its own (so a †-moved
  // sub-head never shows up as a head of 59.99 when the head is exactly 60.00).
  const headP = {};
  if (st.kind === 'bs') for (const [h, xs] of Object.entries(st.head)) headP[h] = [0, 1].map((i) => hundredths(xs[i], st.part[HEADS[h][0]][i]));
  return { st, p, headP, headers, rows, md: md(headers, rows, [1, 2, 3, 4]), adjusted, adjNote, rounded };
}

/** A small two-column table for a stem: rows [[label, a, b]] of whole rupees. */
export const given2 = (cols, rows) => md(['Particulars', `${cols[0]} (₹)`, `${cols[1]} (₹)`], rows.map(([l, a, b]) => [l, fig(a), fig(b)]), [1, 2]);
