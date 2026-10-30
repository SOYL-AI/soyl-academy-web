// Accounting helpers for CBSE 12 Accountancy ch04 (Retirement and Death of a Partner).
// Every figure in the chapter is computed here and every statement is checked: journal entries
// balance, ledger and capital accounts balance per partner, balance sheets total, shares of a ratio
// add back to the whole, and amounts are whole rupees. Any mismatch throws, so the build stops.
// Tables are rendered FROM the computed values (Indian digit grouping), so no figure is typed twice.

export function check(ok, what) {
  if (!ok) throw new Error(`accounting check failed: ${what}`);
}

// ---------------------------------------------------------------- numbers and words
const IN = new Intl.NumberFormat('en-IN');
/** 120000 -> "1,20,000"; throws on a non-integer amount (every figure must be whole rupees). */
export function fig(n) {
  check(Number.isInteger(n), `non-integer amount ${n}`);
  return n < 0 ? `(−) ${IN.format(-n)}` : IN.format(n);
}
/** 120000 -> "₹1,20,000". */
export const rs = (n) => `₹${fig(n)}`;
export const sum = (xs) => xs.reduce((a, b) => a + b, 0);

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
/** "rupees one lakh twenty thousand" for narration. */
export const rupees = (n) => `rupees ${words(n)}`;

const ORD = { 1: 'first', 2: 'second', 3: 'third', 4: 'fourth', 5: 'fifth', 6: 'sixth', 7: 'seventh', 8: 'eighth', 9: 'ninth', 10: 'tenth', 11: 'eleventh', 12: 'twelfth', 13: 'thirteenth', 14: 'fourteenth', 15: 'fifteenth', 16: 'sixteenth', 17: 'seventeenth', 18: 'eighteenth', 19: 'nineteenth' };
function ordinal(n) {
  if (ORD[n]) return ORD[n];
  const t = TENS[Math.floor(n / 10)];
  return n % 10 ? `${t}-${ORD[n % 10]}` : `${t.slice(0, -1)}ieth`;
}

// ---------------------------------------------------------------- fractions and ratios
const gcd = (a, b) => {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a;
};
const lcm = (a, b) => (a / gcd(a, b)) * b;

export class Fr {
  constructor(n, d = 1) {
    check(Number.isInteger(n) && Number.isInteger(d) && d !== 0, `bad fraction ${n}/${d}`);
    if (d < 0) [n, d] = [-n, -d];
    const g = gcd(n, d) || 1;
    this.n = n / g;
    this.d = d / g;
  }
  add(o) { o = F(o); return new Fr(this.n * o.d + o.n * this.d, this.d * o.d); }
  sub(o) { o = F(o); return new Fr(this.n * o.d - o.n * this.d, this.d * o.d); }
  mul(o) { o = F(o); return new Fr(this.n * o.n, this.d * o.d); }
  div(o) { o = F(o); return new Fr(this.n * o.d, this.d * o.n); }
  eq(o) { o = F(o); return this.n === o.n && this.d === o.d; }
  get sign() { return Math.sign(this.n); }
  /** Share of an amount; must be whole rupees. */
  of(amount) {
    const v = (amount * this.n) / this.d;
    check(Number.isInteger(v), `${this} of ${amount} is not whole rupees (${v})`);
    return v;
  }
  toString() { return this.d === 1 ? `${this.n}` : `${this.n}/${this.d}`; }
  /** Words for narration: 3/5 -> "three fifths". */
  words() {
    check(this.n > 0 && this.d > 1 && this.d < 100, `fraction words ${this}`);
    if (this.d === 2) return this.n === 1 ? 'one half' : `${words(this.n)} halves`;
    return `${words(this.n)} ${ordinal(this.d)}${this.n > 1 ? 's' : ''}`;
  }
}
export const F = (n, d = 1) => (n instanceof Fr ? n : new Fr(n, d));
/** A rate as a whole percentage: 3/20 -> "15%" (throws if not whole). */
export function pct(f) {
  const p = F(f).mul(100);
  check(p.d === 1, `rate ${f} is not a whole percentage`);
  return `${p.n}%`;
}
export const sumFr = (xs) => xs.reduce((a, b) => a.add(b), F(0));

/** Shares from ratio parts: (['A','B'], [3,2]) -> { A: 3/5, B: 2/5 }. */
export function shares(names, parts) {
  check(names.length === parts.length, 'shares: names and parts differ');
  const s = sum(parts);
  return Object.fromEntries(names.map((p, i) => [p, F(parts[i], s)]));
}
/** Lowest whole-number ratio of a list of fractions: [3/5, 2/5] -> "3:2". */
export function ratio(fracs) {
  const pos = fracs.map(F);
  const L = pos.reduce((m, f) => lcm(m, f.d), 1);
  const ints = pos.map((f) => (f.n * L) / f.d);
  const g = ints.reduce((m, x) => gcd(m, x), 0) || 1;
  return ints.map((x) => x / g).join(':');
}
export const ratioWords = (r) => r.split(':').map((x) => words(Number(x))).join(' to ');

/** Split an amount by shares; every part is whole rupees and the parts add back to the amount. */
export function split(amount, sh) {
  const out = Object.fromEntries(Object.entries(sh).map(([p, f]) => [p, f.of(amount)]));
  check(sum(Object.values(out)) === amount, `split of ${amount} does not add back`);
  return out;
}

/**
 * Ratios on retirement or death.
 * mode 'old': continuing partners keep their old ratio between themselves;
 * mode 'given': `newShares` agreed; mode 'take': each continuing partner takes the stated fraction
 * of the FIRM's profit from the outgoing share; mode 'portion': each takes the stated portion OF the
 * outgoing partner's share. Returns new shares, change (new − old; the outgoing partner's change is
 * −old) and the gaining ratio.
 */
export function exitShares({ old, out, mode, take = {}, newShares }) {
  const rem = Object.keys(old).filter((p) => p !== out);
  check(sumFr(Object.values(old)).eq(1), 'old shares add to 1');
  let nw;
  if (mode === 'old') {
    const r = F(1).sub(old[out]);
    nw = Object.fromEntries(rem.map((p) => [p, old[p].div(r)]));
  } else if (mode === 'given') nw = newShares;
  else if (mode === 'take') nw = Object.fromEntries(rem.map((p) => [p, old[p].add(take[p] ?? 0)]));
  else if (mode === 'portion') nw = Object.fromEntries(rem.map((p) => [p, old[p].add(old[out].mul(take[p] ?? 0))]));
  else throw new Error(`exitShares mode ${mode}`);
  check(sumFr(Object.values(nw)).eq(1), `new shares add to 1 (${Object.values(nw).join(' + ')})`);
  const change = Object.fromEntries(Object.keys(old).map((p) => [p, (nw[p] ?? F(0)).sub(old[p])]));
  check(sumFr(Object.values(change)).eq(0), 'changes cancel out');
  const gainers = rem.filter((p) => change[p].sign > 0);
  return {
    rem,
    nw,
    change,
    gainers,
    newRatio: ratio(rem.map((p) => nw[p])),
    gainRatio: ratio(gainers.map((p) => change[p])),
  };
}

/**
 * Goodwill adjustment (AS 26: no Goodwill Account is raised): every partner whose share rises is
 * debited and every partner whose share falls (the outgoing partner, and any continuing partner who
 * sacrifices) is credited, each with change × value of the firm's goodwill.
 */
export function goodwillAdj(value, change) {
  const dr = {};
  const cr = {};
  for (const [p, c] of Object.entries(change)) {
    if (c.sign > 0) dr[p] = c.of(value);
    if (c.sign < 0) cr[p] = c.mul(-1).of(value);
  }
  check(sum(Object.values(dr)) === sum(Object.values(cr)), 'goodwill debits equal credits');
  return { dr, cr, total: sum(Object.values(cr)) };
}

/** Value of a firm's goodwill at n years' purchase of average profits. */
export function avgGoodwill(profits, years) {
  const avg = sum(profits) / profits.length;
  check(Number.isInteger(avg), 'average profit whole rupees');
  return { avg, value: avg * years };
}

// ---------------------------------------------------------------- markdown tables
/** Markdown table; `num` = indexes of right-aligned (amount) columns. */
export function md(headers, rows, num = []) {
  for (const r of rows) check(r.length === headers.length, `table row has ${r.length} cells, header ${headers.length}`);
  const sep = headers.map((_, i) => (num.includes(i) ? '---:' : '---'));
  const line = (cells) => `| ${cells.map((c) => (c === '' ? ' ' : c)).join(' | ')} |`;
  return [line(headers), line(sep), ...rows.map(line)].join('\n');
}
const cell = (v) => (v === undefined || v === null || v === 0 ? '—' : fig(v));
const bold = (s) => `**${s}**`;

/**
 * Journal. entries: [{ date?, dr: [[account, amount]…], cr: [[account, amount]…], nar }].
 * Each entry must balance. Account names are written in full ("Arjun's Capital A/c").
 */
export function journal(entries) {
  const dated = entries.some((e) => e.date);
  const rows = [];
  for (const e of entries) {
    const d = sum(e.dr.map(([, v]) => v));
    const c = sum(e.cr.map(([, v]) => v));
    check(d === c, `journal entry "${e.nar}" debits ${d} ≠ credits ${c}`);
    for (const [, v] of [...e.dr, ...e.cr]) check(v > 0, `journal amount ${v} in "${e.nar}"`);
    const pre = (first) => (dated ? [first ? e.date ?? '' : ''] : []);
    e.dr.forEach(([a, v], i) => rows.push([...pre(i === 0), `${a} Dr`, fig(v), '']));
    e.cr.forEach(([a, v]) => rows.push([...pre(false), `To ${a}`, '', fig(v)]));
    rows.push([...pre(false), `*(Being ${e.nar})*`, '', '']);
  }
  const headers = [...(dated ? ['Date'] : []), 'Particulars', 'Dr (₹)', 'Cr (₹)'];
  const n = dated ? [2, 3] : [1, 2];
  return { headers, rows, md: md(headers, rows, n) };
}

/** Two-sided ledger account; "To" on the debit side and "By" on the credit side. Must balance. */
export function ledger(dr, cr, { dates = false } = {}) {
  const td = sum(dr.map((r) => r[r.length - 1]));
  const tc = sum(cr.map((r) => r[r.length - 1]));
  check(td === tc, `ledger account totals ${td} ≠ ${tc}`);
  const side = (r, pre) => (r ? [...(dates ? [r[0]] : []), `${pre} ${r[dates ? 1 : 0]}`, fig(r[r.length - 1])] : [...(dates ? [''] : []), '', '']);
  const n = Math.max(dr.length, cr.length);
  const rows = [];
  for (let i = 0; i < n; i++) rows.push([...side(dr[i], 'To'), ...side(cr[i], 'By')]);
  const blank = dates ? [''] : [];
  rows.push([...blank, bold('Total'), bold(fig(td)), ...blank, bold('Total'), bold(fig(tc))]);
  const headers = dates ? ['Date', 'Dr: Particulars', '₹', 'Date', 'Cr: Particulars', '₹'] : ['Dr: Particulars', '₹', 'Cr: Particulars', '₹'];
  return { headers, rows, total: td, md: md(headers, rows, dates ? [2, 5] : [1, 3]) };
}

/**
 * Columnar capital (or current) accounts.
 * dr / cr: [[label, { partner: amount }]…] (opening balances included by the caller);
 * close: [[label, { partner: amount } | [partners]]…] processed in order: fixed amounts first, a
 * partner list takes that partner's whole remaining balance. Every partner must close at nil.
 */
export function capitalAccounts(names, { dr = [], cr = [], close = [] }) {
  const tot = (rows, p) => sum(rows.map(([, m]) => m[p] ?? 0));
  const balance = Object.fromEntries(names.map((p) => [p, tot(cr, p) - tot(dr, p)]));
  for (const p of names) check(balance[p] >= 0, `${p}'s account closes with a debit balance ${balance[p]}`);
  const left = { ...balance };
  const closeRows = close.map(([label, spec]) => {
    const m = {};
    if (Array.isArray(spec)) for (const p of spec) { m[p] = left[p]; left[p] = 0; }
    else for (const [p, v] of Object.entries(spec)) { m[p] = v; left[p] -= v; }
    return [label, m];
  });
  for (const p of names) check(left[p] === 0, `${p}'s account not closed (left ${left[p]})`);
  const drAll = [...dr, ...closeRows.filter(([, m]) => Object.values(m).some((v) => v))];
  for (const p of names) check(tot(drAll, p) === tot(cr, p), `${p}'s account does not balance`);
  const n = Math.max(drAll.length, cr.length);
  const rows = [];
  const side = (r, pre) => (r ? [`${pre} ${r[0]}`, ...names.map((p) => cell(r[1][p]))] : ['', ...names.map(() => '')]);
  for (let i = 0; i < n; i++) rows.push([...side(drAll[i], 'To'), ...side(cr[i], 'By')]);
  rows.push([bold('Total'), ...names.map((p) => bold(fig(tot(drAll, p)))), bold('Total'), ...names.map((p) => bold(fig(tot(cr, p))))]);
  const headers = ['Dr: Particulars', ...names, 'Cr: Particulars', ...names];
  const numCols = [...names.map((_, i) => i + 1), ...names.map((_, i) => names.length + 2 + i)];
  return { balance, closed: Object.fromEntries(closeRows.map(([l, m]) => [l, m])), headers, rows, md: md(headers, rows, numCols) };
}

/**
 * Revaluation Account. items: [[label, amount]] with + for a gain (credit side) and − for a loss
 * (debit side). The result is shared by `sh` (old ratio of all partners).
 */
export function revaluation(items, sh) {
  const gains = items.filter(([, v]) => v > 0).map(([l, v]) => [l, v]);
  const losses = items.filter(([, v]) => v < 0).map(([l, v]) => [l, -v]);
  const result = sum(items.map(([, v]) => v));
  const part = split(Math.abs(result), sh);
  const partRows = Object.entries(part).map(([p, v]) => [`${p}'s Capital A/c`, v]);
  const dr = result > 0 ? [...losses, ...partRows] : losses;
  const cr = result < 0 ? [...gains, ...partRows] : gains;
  const t = ledger(dr, cr);
  const signed = Object.fromEntries(Object.entries(part).map(([p, v]) => [p, result >= 0 ? v : -v]));
  return { result, part, signed, ...t };
}

/** Balance sheet: liab / assets = [[label, amount]…]; the two sides must total the same. */
export function balanceSheet(liab, assets) {
  const tl = sum(liab.map(([, v]) => v));
  const ta = sum(assets.map(([, v]) => v));
  check(tl === ta, `balance sheet does not balance: liabilities ${tl}, assets ${ta}`);
  const n = Math.max(liab.length, assets.length);
  const rows = [];
  for (let i = 0; i < n; i++) {
    const l = liab[i];
    const a = assets[i];
    rows.push([l ? l[0] : '', l ? fig(l[1]) : '', a ? a[0] : '', a ? fig(a[1]) : '']);
  }
  rows.push([bold('Total'), bold(fig(tl)), bold('Total'), bold(fig(ta))]);
  const headers = ['Liabilities', '₹', 'Assets', '₹'];
  return { total: tl, headers, rows, md: md(headers, rows, [1, 3]) };
}

/**
 * Loan of an outgoing partner repaid in equal instalments of principal with interest on the
 * opening balance each year. Returns the year rows and the ledger in dated form.
 */
export function loanAccount({ name, principal, rate, opens, ends, firstLabel }) {
  check(opens.length === ends.length, 'loan dates');
  const inst = principal / opens.length;
  check(Number.isInteger(inst), 'equal instalment whole rupees');
  let bal = principal;
  const sched = [];
  const blocks = [];
  opens.forEach((open, i) => {
    const interest = (bal * rate) / 100;
    check(Number.isInteger(interest), `interest ${interest} whole rupees`);
    const pay = inst + interest;
    const close = bal - inst;
    sched.push({ open, end: ends[i], opening: bal, interest, inst, pay, close });
    const yDr = [[ends[i], 'Bank A/c', pay], ...(close ? [[ends[i], 'Balance c/d', close]] : [])];
    const yCr = [[open, i === 0 ? firstLabel : 'Balance b/d', bal], [ends[i], 'Interest A/c', interest]];
    blocks.push(ledger(yDr, yCr, { dates: true }).rows);
    bal = close;
  });
  check(bal === 0, 'loan fully repaid');
  const headers = ['Date', 'Dr: Particulars', '₹', 'Date', 'Cr: Particulars', '₹'];
  const rows = blocks.flat();
  return { name, sched, headers, rows, md: md(headers, rows, [2, 5]) };
}
