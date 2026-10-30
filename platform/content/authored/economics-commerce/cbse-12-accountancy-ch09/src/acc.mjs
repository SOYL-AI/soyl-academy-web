// Accounting helpers for CBSE 12 Accountancy ch09 (Analysis of Financial Statements).
// Two statement models hold the givens: plStatement() (Statement of Profit and Loss, 2026-27 format with
// no exceptional or extraordinary items and no discontinued operations) and bsStatement() (Schedule III,
// Division I balance sheet at sub-head level), each for two columns (two years, or two firms). Every
// derived line is computed from the givens and re-added: total income, total expenses, profit before tax,
// tax in whole rupees, profit after tax; head and part totals, and equity and liabilities = assets in
// every column. comparative() and commonSize() then compute every change and percentage from those
// values and assert them:
//   - absolute change = current − previous for every line, and the changes of totals re-add;
//   - percentage change = absolute change ÷ previous year × 100 (only on a positive previous figure);
//   - common-size % = item ÷ base × 100, base = revenue from operations (profit and loss) or the
//     balance sheet total (each part); in a common-size balance sheet each column re-adds to 100.00;
//   - ROUNDING RULE: every percentage is rounded to two decimals, halves away from zero, using integer
//     hundredths of a per cent (no floating-point rounding). In a common-size balance sheet, if the
//     rounded lines of a column do not add to exactly 100.00, the line with the largest rounding error
//     in the direction of the excess is moved by 0.01 and marked †, so every column totals 100.00 and no
//     line is more than 0.01 from its exact value. In a common-size profit and loss statement every
//     subtotal is rounded directly and the build throws unless the rounded lines still re-add.
// Tables are rendered FROM the computed values (Indian digit grouping), so no figure is typed twice.

export function check(ok, what) {
  if (!ok) throw new Error(`accounting check failed: ${what}`);
}

// ---------------------------------------------------------------- numbers and words
const IN = new Intl.NumberFormat('en-IN');
/** 120000 -> "1,20,000"; a negative amount (a decrease or a deduction) -> "(6,000)". Throws on a non-integer. */
export function fig(n) {
  check(Number.isInteger(n), `non-integer amount ${n}`);
  return n < 0 ? `(${IN.format(-n)})` : IN.format(n);
}
/** An amount cell: nil shown as a dash. */
export const amt = (n) => (n === 0 ? '—' : fig(n));
/** 120000 -> "₹1,20,000". */
export const rs = (n) => (n < 0 ? `(₹${fig(-n)})` : `₹${fig(n)}`);
export const sum = (xs) => xs.reduce((a, b) => a + b, 0);
/** A whole-rupee percentage of an amount (tax, a share of revenue). */
export function pctOf(rate, amount) {
  const v = (amount * rate) / 100;
  check(Number.isInteger(v), `${rate}% of ${amount} is not whole rupees`);
  return v;
}

const ONES = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
const two = (n) => (n < 20 ? ONES[n] : TENS[Math.floor(n / 10)] + (n % 10 ? `-${ONES[n % 10]}` : ''));
const three = (n) => {
  const h = Math.floor(n / 100);
  const r = n % 100;
  return h ? `${ONES[h]} hundred${r ? ` ${two(r)}` : ''}` : two(r);
};
/** Indian-system words for narration: 146600 -> "one lakh forty-six thousand six hundred". */
export function words(n) {
  check(Number.isInteger(n) && n >= 0, `words(${n})`);
  if (n === 0) return 'zero';
  const parts = [];
  const crore = Math.floor(n / 1e7);
  const lakh = Math.floor(n / 1e5) % 100;
  const thou = Math.floor(n / 1e3) % 100;
  const rest = n % 1000;
  if (crore) parts.push(`${words(crore)} crore`);
  if (lakh) parts.push(`${two(lakh)} lakh`);
  if (thou) parts.push(`${two(thou)} thousand`);
  if (rest) parts.push(three(rest));
  return parts.join(' ');
}
/** "rupees one lakh twenty thousand" for narration (absolute value). */
export const rupees = (n) => `rupees ${words(Math.abs(n))}`;

// ---------------------------------------------------------------- percentages (integer hundredths)
/**
 * part ÷ base × 100 in hundredths of a per cent, rounded half away from zero: (150000, 1200000) -> 1250,
 * i.e. 12.50%. Integer arithmetic only, so 16.665 rounds the same way every time.
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
/** True when part ÷ base × 100 has at most two decimals (no rounding happened). */
export const exact = (part, base) => (part * 10000) % base === 0;
/** 1250 -> "12.50"; -1250 -> "(12.50)". */
export function pc(h) {
  check(Number.isInteger(h), `pc(${h})`);
  const a = Math.abs(h);
  const s = `${Math.floor(a / 100)}.${String(a % 100).padStart(2, '0')}`;
  return h < 0 ? `(${s})` : s;
}
/** 1250 -> "12.50%"; -1250 -> "−12.50%" (for prose). */
export const pcs = (h) => (h < 0 ? `−${pc(-h)}%` : `${pc(h)}%`);
/** Numeric value of hundredths for answer keys: 1250 -> 12.5. */
export const pcv = (h) => h / 100;
/** Narration: 1667 -> "sixteen point six seven per cent" (absolute value). */
export function pctWords(h) {
  const a = Math.abs(h);
  const i = Math.floor(a / 100);
  const f = a % 100;
  if (!f) return `${words(i)} per cent`;
  const d = f % 10 ? `${ONES[Math.floor(f / 10)]} ${ONES[f % 10]}` : ONES[f / 10];
  return `${words(i)} point ${d} per cent`;
}

// ---------------------------------------------------------------- markdown tables
/** Markdown table; `num` = indexes of right-aligned (amount) columns. */
export function md(headers, rows, num = []) {
  for (const r of rows) check(r.length === headers.length, `table row has ${r.length} cells, header ${headers.length}`);
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
const EXP = ['com', 'pst', 'chg', 'emp', 'fin', 'dep', 'oth'];
const L = 'abcdefgh';

/**
 * Statement of Profit and Loss for two columns. cols: column labels (years or firms); v: { rev, oi?, com?,
 * pst?, chg?, emp?, fin?, dep?, oth? } with one whole-rupee amount per column; taxRate: whole-number
 * per cent of profit before tax (one rate, or one per column).
 */
export function plStatement({ cols, v, taxRate }) {
  const n = cols.length;
  check(n === 2, 'two columns');
  for (const [k, xs] of Object.entries(v)) {
    check(PL_HEADS[k], `unknown profit and loss head ${k}`);
    check(xs.length === n && xs.every(Number.isInteger), `${k}: one whole-rupee amount per column`);
    check(k === 'chg' || xs.every((x) => x >= 0), `${k}: amounts not negative`);
  }
  check(v.rev && v.rev.every((x) => x > 0), 'revenue from operations positive');
  const zero = cols.map(() => 0);
  const get = (k) => v[k] ?? zero;
  const exps = EXP.filter((k) => v[k]);
  check(exps.length > 0, 'at least one expense head');
  const hasOI = Boolean(v.oi);
  const ti = cols.map((_, i) => get('rev')[i] + get('oi')[i]);
  const te = cols.map((_, i) => sum(exps.map((k) => v[k][i])));
  const pbt = cols.map((_, i) => ti[i] - te[i]);
  const rates = Array.isArray(taxRate) ? taxRate : cols.map(() => taxRate);
  check(rates.length === n && rates.every((r) => Number.isInteger(r) && r >= 0 && r < 100), 'tax rates');
  const tax = pbt.map((p, i) => {
    check(p > 0, `profit before tax positive in ${cols[i]}`);
    return pctOf(rates[i], p);
  });
  const pat = pbt.map((p, i) => p - tax[i]);
  cols.forEach((c, i) => check(pat[i] + tax[i] + te[i] === ti[i] && ti[i] === get('rev')[i] + get('oi')[i], `${c}: statement re-adds`));

  const R = hasOI ? ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'] : ['I', null, null, 'II', 'III', 'IV', 'V'];
  const taxLabel = rates[0] === rates[1] ? `${R[5]}. Less: Tax (${rates[0]}% of profit before tax)` : `${R[5]}. Less: Tax`;
  const lines = [
    { key: 'rev', label: `I. ${PL_HEADS.rev}`, vals: get('rev') },
    ...(hasOI ? [{ key: 'oi', label: `II. Add: ${PL_HEADS.oi}`, vals: v.oi }, { key: 'ti', label: 'III. Total Income (I + II)', vals: ti, bold: true }] : []),
    { key: 'expH', label: `${R[3]}. Less: Expenses`, header: true },
    ...exps.map((k, j) => ({ key: k, label: `(${L[j]}) ${PL_HEADS[k]}`, vals: v[k] })),
    { key: 'te', label: 'Total Expenses', vals: te, bold: true },
    { key: 'pbt', label: `${R[4]}. Profit before Tax (${hasOI ? 'III' : 'I'} − ${R[3]})`, vals: pbt, bold: true },
    { key: 'tax', label: taxLabel, vals: tax },
    { key: 'pat', label: `${R[6]}. Profit after Tax (${R[4]} − ${R[5]})`, vals: pat, bold: true },
  ];
  const rel = [
    ...(hasOI ? [['ti', ['rev', 'oi'], []]] : []),
    ['te', exps, []],
    ['pbt', [hasOI ? 'ti' : 'rev'], ['te']],
    ['pat', ['pbt'], ['tax']],
  ];
  return finish({ kind: 'pl', cols, lines, rel, rates });
}

// ---------------------------------------------------------------- Schedule III balance sheet model
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
 * Balance sheet at sub-head level for two dates. v: { sc: [a, b], rs: [a, b], … } whole rupees, not
 * negative. Head totals and part totals are computed; equity and liabilities must equal assets on
 * both dates.
 */
export function bsStatement({ cols, v }) {
  const n = cols.length;
  check(n === 2, 'two columns');
  for (const [k, xs] of Object.entries(v)) {
    check(SUBS[k], `unknown sub-head ${k}`);
    check(xs.length === n && xs.every((x) => Number.isInteger(x) && x >= 0) && xs.some((x) => x > 0), `${k}: whole-rupee amounts`);
  }
  const keys = Object.keys(SUBS).filter((k) => v[k]);
  const head = {};
  for (const k of keys) {
    const h = SUBS[k][0];
    head[h] = cols.map((_, i) => (head[h]?.[i] ?? 0) + v[k][i]);
  }
  const part = { el: cols.map(() => 0), as: cols.map(() => 0) };
  for (const [h, xs] of Object.entries(head)) xs.forEach((x, i) => (part[HEADS[h][0]][i] += x));
  cols.forEach((c, i) => check(part.el[i] === part.as[i] && part.el[i] > 0, `balance sheet ${c} does not balance: ${part.el[i]} vs ${part.as[i]}`));

  const lines = [];
  const rel = [];
  for (const p of ['el', 'as']) {
    lines.push({ key: `${p}H`, label: p === 'el' ? 'I. Equity and Liabilities' : 'II. Assets', header: true });
    let hn = 0;
    const leaves = [];
    for (const [h, [hp, name]] of Object.entries(HEADS)) {
      if (hp !== p) continue;
      const subs = keys.filter((k) => SUBS[k][0] === h);
      if (!subs.length) continue;
      lines.push({ key: `${h}H`, label: `${++hn}. ${name}`, header: true, head: h });
      let letter = 0;
      let roman = 0;
      for (const k of subs) {
        if (PPE_GROUP.includes(k)) {
          if (!roman) lines.push({ key: 'ppeH', label: `(${L[letter++]}) ${PPE_GROUP_NAME}`, header: true });
          lines.push({ key: k, label: `(${ROMAN[roman++]}) ${SUBS[k][1]}`, vals: v[k], part: p, head: h });
        } else lines.push({ key: k, label: `(${L[letter++]}) ${SUBS[k][1]}`, vals: v[k], part: p, head: h });
        leaves.push(k);
      }
    }
    lines.push({ key: `${p}T`, label: 'Total', vals: part[p], bold: true, part: p, total: true });
    rel.push([`${p}T`, leaves, []]);
  }
  return finish({ kind: 'bs', cols, lines, rel, head, part });
}

function finish(st) {
  const byKey = new Map(st.lines.filter((l) => !l.header).map((l) => [l.key, l]));
  st.val = (k) => {
    const l = byKey.get(k);
    check(l, `no line ${k}`);
    return l.vals;
  };
  st.has = (k) => byKey.has(k);
  // Every relation holds in every column (re-added independently of how the totals were built).
  for (const [t, plus, minus] of st.rel)
    st.cols.forEach((c, i) => check(st.val(t)[i] === sum(plus.map((k) => st.val(k)[i])) - sum(minus.map((k) => st.val(k)[i])), `${c}: ${t} re-adds`));
  return st;
}

/** The givens of a statement as a two-column table (Particulars, both columns), for stems. */
export function twoCol(st, { totals = true } = {}) {
  const rows = st.lines
    .filter((l) => totals || !l.bold)
    .map((l) => (l.header ? [bold(l.label), '', ''] : [l.bold ? bold(l.label) : l.label, ...l.vals.map((x) => (l.bold ? bold(amt(x)) : amt(x)))]));
  return md(['Particulars', `${st.cols[0]} (₹)`, `${st.cols[1]} (₹)`], rows, [1, 2]);
}

// ---------------------------------------------------------------- comparative statement
/**
 * Comparative statement: both columns, absolute change (current − previous) and percentage change
 * (change ÷ previous × 100, two decimals) for every line. A percentage change is shown only when the
 * previous figure is positive (else "—"). Asserted: every change re-adds through the relations, and on
 * a balance sheet the change in total equity and liabilities equals the change in total assets.
 */
export function comparative(st) {
  const [c0, c1] = st.cols;
  const ch = {};
  const rows = [];
  for (const l of st.lines) {
    if (l.header) {
      rows.push([bold(l.label), '', '', '', '']);
      continue;
    }
    const [py, cy] = l.vals;
    const abs = cy - py;
    const h = py > 0 ? hundredths(abs, py) : null;
    ch[l.key] = { py, cy, abs, h, exact: h === null || exact(abs, py) };
    const cells = [l.label, amt(py), amt(cy), fig(abs), h === null ? '—' : pc(h)];
    rows.push(l.bold ? cells.map(bold) : cells);
  }
  for (const [t, plus, minus] of st.rel) check(ch[t].abs === sum(plus.map((k) => ch[k].abs)) - sum(minus.map((k) => ch[k].abs)), `change in ${t} re-adds`);
  if (st.kind === 'bs') check(ch.elT.abs === ch.asT.abs, 'change in both totals equal');
  // Percentage change re-derived the long way for every line (cross-check of hundredths()).
  for (const c of Object.values(ch)) if (c.h !== null) check(Math.abs((c.abs / c.py) * 10000 - c.h) <= 0.5 + 1e-9, 'percentage change rounding');
  const headers = ['Particulars', `${c0} (₹)`, `${c1} (₹)`, 'Absolute change (₹)', 'Percentage change (%)'];
  const rounded = Object.values(ch).filter((c) => !c.exact).length;
  return { st, ch, headers, rows, md: md(headers, rows, [1, 2, 3, 4]), rounded };
}

// ---------------------------------------------------------------- common-size statement
/**
 * Common-size statement: both columns in rupees and as a percentage of the base (revenue from
 * operations for profit and loss; the part total for a balance sheet), two decimals. Asserted: the base
 * line is 100.00; in a balance sheet every part of every column re-adds to 100.00 (after the explicit
 * †-adjustment described at the top of this file); in profit and loss every relation (total income,
 * total expenses, profit before tax, profit after tax) holds in the rounded figures.
 */
export function commonSize(st) {
  const [c0, c1] = st.cols;
  const p = {};
  const err = {}; // rounding error × base: h × base − value × 10000 (an exact integer)
  const adjusted = [];
  const baseOf = (l, i) => (st.kind === 'pl' ? st.val('rev')[i] : st.part[l.part][i]);
  for (const l of st.lines) {
    if (l.header) continue;
    p[l.key] = l.vals.map((x, i) => hundredths(x, baseOf(l, i)));
    err[l.key] = l.vals.map((x, i) => p[l.key][i] * baseOf(l, i) - x * 10000);
  }
  if (st.kind === 'bs') {
    for (const [t, leaves] of st.rel) {
      st.cols.forEach((c, i) => {
        let residue = 10000 - sum(leaves.map((k) => p[k][i]));
        check(Math.abs(residue) < leaves.length, `${c} ${t}: rounding residue ${residue} too large`);
        while (residue !== 0) {
          const dir = Math.sign(residue); // +1: lines too small in total -> raise the most under-rounded line
          const pick = leaves
            .slice()
            .sort((a, b) => dir * (err[a][i] - err[b][i]) || st.val(b)[i] - st.val(a)[i] || leaves.indexOf(a) - leaves.indexOf(b))[0];
          p[pick][i] += dir;
          err[pick][i] += dir * st.part[t.slice(0, 2)][i];
          adjusted.push({ key: pick, col: i, by: dir, part: t.slice(0, 2) });
          residue -= dir;
        }
        check(sum(leaves.map((k) => p[k][i])) === 10000 && p[t][i] === 10000, `${c} ${t}: column re-adds to 100.00`);
        for (const k of leaves) check(Math.abs(err[k][i]) < st.part[t.slice(0, 2)][i], `${k}: within 0.01 of exact`);
      });
    }
  } else {
    st.cols.forEach((c, i) => {
      check(p.rev[i] === 10000, 'revenue from operations is 100.00');
      for (const [t, plus, minus] of st.rel) check(p[t][i] === sum(plus.map((k) => p[k][i])) - sum(minus.map((k) => p[k][i])), `${c}: rounded ${t} re-adds (choose other figures)`);
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
  const what = st.kind === 'pl' ? 'revenue' : 'total';
  const headers = ['Particulars', `${c0} (₹)`, `${c1} (₹)`, `${c0} (% of ${what})`, `${c1} (% of ${what})`];
  const rounded = Object.values(err).flat().filter((e) => e !== 0).length;
  const groups = [...new Set(adjusted.map((a) => `${a.col}|${a.part}`))].map((g) => {
    const [col, part] = g.split('|');
    const by = sum(adjusted.filter((a) => `${a.col}|${a.part}` === g).map((a) => a.by));
    return `the ${part === 'el' ? 'equity and liabilities' : 'assets'} lines of ${st.cols[col]} added to ${pc(10000 - by)}`;
  });
  const adjNote = adjusted.length
    ? `† Each percentage is rounded to two decimals; rounded, ${groups.join(' and ')} instead of 100.00, so the line with the largest rounding error is moved by 0.01 and the column totals 100.00.`
    : '';
  return { st, p, headers, rows, md: md(headers, rows, [1, 2, 3, 4]), adjusted, adjNote, rounded };
}

/** Head-level common-size share (sum of the displayed sub-head percentages) for interpretation. */
export function headShare(cs, h) {
  const keys = Object.keys(SUBS).filter((k) => SUBS[k][0] === h && cs.p[k]);
  check(keys.length, `no sub-heads under ${h}`);
  return [0, 1].map((i) => sum(keys.map((k) => cs.p[k][i])));
}
