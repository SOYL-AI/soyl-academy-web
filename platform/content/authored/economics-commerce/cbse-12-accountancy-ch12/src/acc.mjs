// Engines for CBSE 12 Accountancy ch12 (Computerised Accounting, alternative to Part B).
// Nothing quoted in a key, model answer, table or narration is typed twice: it is computed here.
//   Sheet          a small spreadsheet: every formula shown in the chapter (SUM, IF, ROUND, PMT, SLN, DDB,
//                  VLOOKUP, MIN, MAX, AVERAGE, ABS, arithmetic, comparisons, named cells) is parsed and
//                  evaluated, so a wrong cell reference or a wrong result throws at build time.
//   brs()          bank reconciliation built from a transaction list: the cash book and the pass book are
//                  summed independently, then the statement (add / less rules) must reach the other book.
//   slm(), wdv(), ddb()  depreciation schedules; opening − depreciation = closing asserted on every row.
//   loan()         loan repayment schedule from PMT rounded to the rupee; interest is rounded to the rupee;
//                  interest + principal = instalment asserted on every row; the closing balance after the
//                  last instalment must be within ₹n (n instalments) of zero and is reported.
//   cas()          a computerised accounting system in miniature: chart of accounts with a numeric code
//                  hierarchy, voucher validation (debits = credits, known codes, date in period, voucher-type
//                  rules), ledgers, trial balance (totals asserted equal), trading and profit and loss account
//                  and balance sheet (asserted to balance).

export function check(ok, what) {
  if (!ok) throw new Error(`accounting check failed: ${what}`);
}

// ---------------------------------------------------------------- numbers and words
const IN = new Intl.NumberFormat('en-IN');
const IN2 = new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
/** 120000 -> "1,20,000"; a negative amount -> "(6,000)". Throws on a non-integer. */
export function fig(n) {
  check(Number.isInteger(n), `non-integer amount ${n}`);
  return n < 0 ? `(${IN.format(-n)})` : IN.format(n);
}
/** 120000 -> "₹1,20,000". */
export const rs = (n) => (n < 0 ? `(₹${fig(-n)})` : `₹${fig(n)}`);
export const sum = (xs) => xs.reduce((a, b) => a + b, 0);
/** A number as a spreadsheet would show it: integers grouped, others to two decimal places. */
export function num(v) {
  check(typeof v === 'number' && Number.isFinite(v), `num(${v})`);
  if (Number.isInteger(v)) return v < 0 ? `−${IN.format(-v)}` : IN.format(v);
  return v < 0 ? `−${IN2.format(-v)}` : IN2.format(v);
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
/** "rupees one lakh twenty thousand" for narration. */
export const rupees = (n) => `rupees ${words(n)}`;
/** Spoken decimal: 1.67 -> "one point six seven". */
export function spoken(v) {
  const s = Number.isInteger(v) ? String(v) : v.toFixed(2).replace(/0+$/, '');
  const [i, f] = s.split('.');
  return f ? `${words(Number(i))} point ${[...f].map((d) => ONES[Number(d)]).join(' ')}` : words(Number(i));
}

/** Spreadsheet ROUND: half away from zero, d decimal places. */
export function round(x, d = 0) {
  const s = Math.sign(x);
  const a = Math.abs(x);
  const v = Number(`${Math.round(Number(`${a}e${d}`))}e-${d}`);
  return s * v === 0 ? 0 : s * v;
}

// ---------------------------------------------------------------- markdown tables
/** Markdown table; `numCols` = indexes of right-aligned (amount) columns. */
export function md(headers, rows, numCols = []) {
  for (const r of rows) check(r.length === headers.length, `table row has ${r.length} cells, header ${headers.length}`);
  const sep = headers.map((_, i) => (numCols.includes(i) ? '---:' : '---'));
  const line = (cells) => `| ${cells.map((c) => (c === '' ? ' ' : c)).join(' | ')} |`;
  return [line(headers), line(sep), ...rows.map(line)].join('\n');
}
export const bold = (s) => `**${s}**`;
export const code = (s) => `\`${s}\``;

// ---------------------------------------------------------------- spreadsheet
const COLS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const colIndex = (c) => [...c].reduce((n, ch) => n * 26 + COLS.indexOf(ch) + 1, 0) - 1;
const colName = (i) => (i < 26 ? COLS[i] : COLS[Math.floor(i / 26) - 1] + COLS[i % 26]);
const REF = /^\$?([A-Z]{1,2})\$?(\d+)$/;
function splitRef(ref) {
  const m = REF.exec(ref);
  check(!!m, `bad cell reference ${ref}`);
  return { c: colIndex(m[1]), r: Number(m[2]) };
}
const refOf = (c, r) => `${colName(c)}${r}`;

function tokenize(src) {
  const toks = [];
  let i = 0;
  while (i < src.length) {
    const ch = src[i];
    if (ch === ' ') { i++; continue; }
    let m;
    if ((m = /^\d+(?:\.\d+)?%?/.exec(src.slice(i)))) {
      const t = m[0];
      toks.push({ t: 'num', v: t.endsWith('%') ? Number(t.slice(0, -1)) / 100 : Number(t) });
      i += t.length;
    } else if (ch === '"') {
      const j = src.indexOf('"', i + 1);
      check(j > 0, `unclosed string in ${src}`);
      toks.push({ t: 'str', v: src.slice(i + 1, j) });
      i = j + 1;
    } else if ((m = /^\$?[A-Z]{1,2}\$?\d+(?::\$?[A-Z]{1,2}\$?\d+)?(?![A-Za-z0-9_(])/.exec(src.slice(i)))) {
      toks.push(m[0].includes(':') ? { t: 'range', v: m[0] } : { t: 'ref', v: m[0] });
      i += m[0].length;
    } else if ((m = /^[A-Za-z_][A-Za-z0-9_.]*/.exec(src.slice(i)))) {
      const w = m[0];
      i += w.length;
      if (src[i] === '(') toks.push({ t: 'fn', v: w.toUpperCase() });
      else if (/^(TRUE|FALSE)$/i.test(w)) toks.push({ t: 'bool', v: /^TRUE$/i.test(w) });
      else toks.push({ t: 'name', v: w });
    } else if ((m = /^(<=|>=|<>|[-+*/^&=<>(),])/.exec(src.slice(i)))) {
      toks.push({ t: 'op', v: m[0] });
      i += m[0].length;
    } else throw new Error(`accounting check failed: cannot read "${src.slice(i)}" in formula ${src}`);
  }
  return toks;
}

function parse(src) {
  const toks = tokenize(src);
  let p = 0;
  const peek = () => toks[p];
  const isOp = (v) => peek() && peek().t === 'op' && peek().v === v;
  const take = (v) => { check(isOp(v), `expected "${v}" in ${src}`); p++; };
  function expr() {
    let a = concat();
    while (peek() && peek().t === 'op' && ['=', '<>', '<', '>', '<=', '>='].includes(peek().v)) { const op = toks[p++].v; a = { k: 'bin', op, a, b: concat() }; }
    return a;
  }
  function concat() { let a = add(); while (isOp('&')) { p++; a = { k: 'bin', op: '&', a, b: add() }; } return a; }
  function add() { let a = mul(); while (isOp('+') || isOp('-')) { const op = toks[p++].v; a = { k: 'bin', op, a, b: mul() }; } return a; }
  function mul() { let a = pow(); while (isOp('*') || isOp('/')) { const op = toks[p++].v; a = { k: 'bin', op, a, b: pow() }; } return a; }
  function pow() { let a = unary(); while (isOp('^')) { p++; a = { k: 'bin', op: '^', a, b: unary() }; } return a; }
  function unary() {
    if (isOp('-')) { p++; return { k: 'neg', a: unary() }; }
    if (isOp('+')) { p++; return unary(); }
    return primary();
  }
  function primary() {
    const t = toks[p++];
    check(!!t, `unexpected end of ${src}`);
    if (t.t === 'num' || t.t === 'str' || t.t === 'bool') return { k: 'lit', v: t.v };
    if (t.t === 'ref') return { k: 'ref', v: t.v };
    if (t.t === 'range') return { k: 'range', v: t.v };
    if (t.t === 'name') return { k: 'name', v: t.v };
    if (t.t === 'fn') {
      take('(');
      const args = [];
      if (!isOp(')')) { args.push(expr()); while (isOp(',')) { p++; args.push(expr()); } }
      take(')');
      return { k: 'fn', f: t.v, args };
    }
    if (t.t === 'op' && t.v === '(') { const e = expr(); take(')'); return e; }
    throw new Error(`accounting check failed: unexpected "${t.v}" in ${src}`);
  }
  const e = expr();
  check(p === toks.length, `trailing tokens in ${src}`);
  return e;
}

/** Spreadsheet PMT (payment at the end of each period): negative for a positive present value. */
export function pmt(rate, nper, pv, fv = 0) {
  if (rate === 0) return -(pv + fv) / nper;
  const f = (1 + rate) ** nper;
  return -(rate * (fv + pv * f)) / (f - 1);
}
/** Spreadsheet SLN. */
export const sln = (cost, salvage, life) => (cost - salvage) / life;
/** Spreadsheet DDB: declining balance at factor ÷ life, never taking the book value below salvage. */
export function ddbFn(cost, salvage, life, period, factor = 2) {
  let book = cost;
  let dep = 0;
  for (let k = 1; k <= period; k++) {
    dep = Math.max(0, Math.min((book * factor) / life, book - salvage));
    book -= dep;
  }
  return dep;
}

const FUNCS = {
  SUM: (xs) => sum(xs.flat(Infinity).filter((x) => typeof x === 'number')),
  AVERAGE: (xs) => { const n = xs.flat(Infinity).filter((x) => typeof x === 'number'); return sum(n) / n.length; },
  MIN: (xs) => Math.min(...xs.flat(Infinity).filter((x) => typeof x === 'number')),
  MAX: (xs) => Math.max(...xs.flat(Infinity).filter((x) => typeof x === 'number')),
  ABS: ([x]) => Math.abs(x),
  ROUND: ([x, d]) => round(x, d),
  PMT: ([r, n, pv, fv = 0]) => pmt(r, n, pv, fv),
  SLN: ([c, s, l]) => sln(c, s, l),
  DDB: ([c, s, l, per, f = 2]) => ddbFn(c, s, l, per, f),
};

export class Sheet {
  /** cells: { A1: 'text' | 1200 | '30%' | '=formula' }; names: { Rate: 'B2' } (a name always points at one cell). */
  constructor(cells, names = {}) {
    this.cells = cells;
    this.names = names;
    this.cache = new Map();
    this.busy = new Set();
    for (const [k, v] of Object.entries(cells)) {
      splitRef(k);
      check(typeof v === 'number' || typeof v === 'string', `cell ${k}`);
      if (typeof v === 'string') check(!v.includes('$'), `cell ${k}: no dollar signs in shown formulas (the maths renderer reserves them)`);
    }
    for (const r of Object.values(names)) splitRef(r);
    for (const k of Object.keys(cells)) this.get(k);
  }
  isFormula(ref) { return typeof this.cells[ref] === 'string' && this.cells[ref].startsWith('='); }
  get(ref) {
    const key = refOf(splitRef(ref).c, splitRef(ref).r);
    if (this.cache.has(key)) return this.cache.get(key);
    check(!this.busy.has(key), `circular reference at ${key}`);
    const raw = this.cells[key];
    let v;
    if (raw === undefined) v = 0;
    else if (typeof raw === 'number') v = raw;
    else if (raw.startsWith('=')) {
      this.busy.add(key);
      v = this.ev(parse(raw.slice(1)), raw);
      this.busy.delete(key);
    } else if (/^-?\d+(?:\.\d+)?%$/.test(raw)) v = Number(raw.slice(0, -1)) / 100;
    else v = raw;
    this.cache.set(key, v);
    return v;
  }
  /** The 2-D array of values in a range. */
  range(r) {
    const [a, b] = r.split(':').map(splitRef);
    const out = [];
    for (let row = a.r; row <= b.r; row++) {
      const line = [];
      for (let c = a.c; c <= b.c; c++) line.push(this.get(refOf(c, row)));
      out.push(line);
    }
    return out;
  }
  ev(n, src) {
    const N = (x) => { check(typeof x === 'number', `${src}: expected a number, got ${JSON.stringify(x)}`); return x; };
    switch (n.k) {
      case 'lit': return n.v;
      case 'ref': return this.get(n.v);
      case 'name': check(n.v in this.names, `${src}: unknown name ${n.v}`); return this.get(this.names[n.v]);
      case 'range': return this.range(n.v);
      case 'neg': return -N(this.ev(n.a, src));
      case 'bin': {
        const a = this.ev(n.a, src);
        const b = this.ev(n.b, src);
        switch (n.op) {
          case '+': return N(a) + N(b);
          case '-': return N(a) - N(b);
          case '*': return N(a) * N(b);
          case '/': check(N(b) !== 0, `${src}: division by zero`); return N(a) / b;
          case '^': return N(a) ** N(b);
          case '&': return `${a}${b}`;
          case '=': return a === b;
          case '<>': return a !== b;
          case '<': return N(a) < N(b);
          case '>': return N(a) > N(b);
          case '<=': return N(a) <= N(b);
          case '>=': return N(a) >= N(b);
        }
        break;
      }
      case 'fn': {
        if (n.f === 'IF') { const c = this.ev(n.args[0], src); return c ? this.ev(n.args[1], src) : this.ev(n.args[2], src); }
        if (n.f === 'VLOOKUP') {
          const [want, tbl, col, mode] = n.args.map((x) => this.ev(x, src));
          const exact = mode === false || mode === 0;
          check(exact, `${src}: only exact-match lookups are used in this chapter`);
          const row = tbl.find((r) => r[0] === want);
          check(!!row, `${src}: ${want} not found (#N/A)`);
          check(col >= 1 && col <= row.length, `${src}: column ${col} outside the table`);
          return row[col - 1];
        }
        check(n.f in FUNCS, `${src}: unknown function ${n.f}`);
        const args = n.args.map((x) => this.ev(x, src));
        const v = FUNCS[n.f](args);
        check(typeof v === 'number' && Number.isFinite(v), `${src}: ${n.f} gave ${v}`);
        return v;
      }
    }
    throw new Error(`accounting check failed: cannot evaluate ${src}`);
  }
  /** Shown value of a cell: numbers grouped (two decimals if fractional), percentages as typed, text as is. */
  shown(ref) {
    const raw = this.cells[ref];
    if (typeof raw === 'string' && !raw.startsWith('=')) return raw;
    const v = this.get(ref);
    return typeof v === 'number' ? num(v) : typeof v === 'boolean' ? (v ? 'TRUE' : 'FALSE') : String(v);
  }
  /**
   * The sheet as a markdown table: column letters across, row numbers down. A formula cell is shown
   * as `formula` → **result** (view 'both'), as the formula alone ('formula') or as the result ('value').
   */
  table(cols, rows, view = 'both') {
    const cell = (ref) => {
      if (!(ref in this.cells)) return '';
      if (!this.isFormula(ref)) return this.shown(ref);
      if (view === 'formula') return code(this.cells[ref]);
      if (view === 'value') return this.shown(ref);
      return `${code(this.cells[ref])} → ${bold(this.shown(ref))}`;
    };
    return { headers: ['', ...cols], rows: rows.map((r) => [String(r), ...cols.map((c) => cell(`${c}${r}`))]) };
  }
  md(cols, rows, view = 'both') { const t = this.table(cols, rows, view); return md(t.headers, t.rows); }
}

/** Copies a formula by (dRows, dCols): relative references move, locked parts (with $) and names stay. */
export function shiftFormula(f, dRows, dCols) {
  return f.replace(/(\$?)([A-Z]{1,2})(\$?)(\d+)(?![A-Za-z0-9_(])/g, (_, lc, c, lr, r) => `${lc}${lc ? c : colName(colIndex(c) + dCols)}${lr}${lr ? r : Number(r) + dRows}`);
}

// ---------------------------------------------------------------- bank reconciliation
/**
 * Transactions with the bank in one period. Each entry: [label, amount, dir, inCB, inPB] where dir is
 * 'in' (money into the account: deposit, collection, interest) or 'out' (cheque issued, charge, debit),
 * inCB / inPB = recorded in the cash book (bank column) / in the pass book by the closing date.
 * Balances are signed from the firm's side: positive = money in the bank, negative = overdraft.
 */
export function brs({ opening, entries }) {
  const es = entries.map(([label, amt, dir, inCB, inPB]) => {
    check(Number.isInteger(amt) && amt > 0 && (dir === 'in' || dir === 'out') && (inCB || inPB), `brs entry ${label}`);
    return { label, amt, dir, inCB, inPB };
  });
  const signed = (e) => (e.dir === 'in' ? e.amt : -e.amt);
  const r = { opening, entries: es };
  // Each book is summed on its own from the agreed opening balance.
  r.cb = opening + sum(es.filter((e) => e.inCB).map(signed));
  r.pb = opening + sum(es.filter((e) => e.inPB).map(signed));
  // Differences only: an entry in one book only. Starting from the cash book, an item makes the pass book
  // higher (add) when money came in per the bank only, or went out per the cash book only.
  const diff = es.filter((e) => e.inCB !== e.inPB);
  r.add = diff.filter((e) => (e.dir === 'in' && e.inPB) || (e.dir === 'out' && e.inCB));
  r.less = diff.filter((e) => (e.dir === 'in' && e.inCB) || (e.dir === 'out' && e.inPB));
  r.addT = sum(r.add.map((e) => e.amt));
  r.lessT = sum(r.less.map((e) => e.amt));
  check(r.cb + r.addT - r.lessT === r.pb, `BRS from the cash book: ${r.cb} + ${r.addT} − ${r.lessT} ≠ ${r.pb}`);
  check(r.pb - r.addT + r.lessT === r.cb, 'BRS from the pass book');
  return r;
}
/** How a signed balance is described in each book. */
export const cbSide = (v) => (v >= 0 ? 'debit balance as per cash book' : 'credit balance (overdraft) as per cash book');
export const pbSide = (v) => (v >= 0 ? 'credit balance as per pass book' : 'debit balance (overdraft) as per pass book');
/** The statement as markdown, starting from the cash book (or from the pass book with from: 'pb'). */
export function brsTable(r, { from = 'cb', date = '31 March 2026' } = {}) {
  const s0 = from === 'cb' ? r.cb : r.pb;
  const e0 = from === 'cb' ? r.pb : r.cb;
  check((s0 >= 0) === (e0 >= 0), 'one book favourable and the other overdrawn: not used in this chapter');
  const startLab = from === 'cb' ? cbSide(s0) : pbSide(s0);
  const endLab = from === 'cb' ? pbSide(e0) : cbSide(e0);
  // With an overdraft in both books the statement works in overdraft amounts (positive), so every item
  // moves the other way: what would be added to a favourable balance is deducted from an overdraft.
  const od = s0 < 0;
  const start = od ? -s0 : s0;
  const end = od ? -e0 : e0;
  let plus = from === 'cb' ? r.add : r.less;
  let minus = from === 'cb' ? r.less : r.add;
  if (od) [plus, minus] = [minus, plus];
  const cap = (s) => s[0].toUpperCase() + s.slice(1);
  const rows = [[`${cap(startLab)}`, '', fig(start)]];
  if (plus.length) {
    rows.push([bold('Add:'), '', '']);
    for (const e of plus) rows.push([e.label, fig(e.amt), '']);
    rows.push(['', '', fig(sum(plus.map((e) => e.amt)))]);
  }
  if (minus.length) {
    rows.push([bold('Less:'), '', '']);
    for (const e of minus) rows.push([e.label, fig(e.amt), '']);
    rows.push(['', '', fig(-sum(minus.map((e) => e.amt)))]);
  }
  rows.push([bold(cap(endLab)), '', bold(fig(end))]);
  check(start + sum(plus.map((e) => e.amt)) - sum(minus.map((e) => e.amt)) === end, 'brsTable total');
  return { headers: [`Bank reconciliation statement as at ${date}`, '₹', '₹'], rows, md: md([`Bank reconciliation statement as at ${date}`, '₹', '₹'], rows, [1, 2]) };
}

// ---------------------------------------------------------------- depreciation
/** Straight-line schedule; the closing value of the last year must equal the salvage value. */
export function slm(cost, salvage, life) {
  const d = sln(cost, salvage, life);
  check(Number.isInteger(d), `SLN ${cost}, ${salvage}, ${life} is not whole rupees`);
  const rows = [];
  let open = cost;
  for (let y = 1; y <= life; y++) {
    const close = open - d;
    check(open - d === close, 'slm row');
    rows.push({ y, open, dep: d, close });
    open = close;
  }
  check(open === salvage, 'slm ends at salvage');
  return { cost, salvage, life, dep: d, rows };
}
/** Written-down value at `rate` (whole per cent), depreciation rounded to the rupee each year. */
export function wdv(cost, rate, years) {
  const rows = [];
  let open = cost;
  for (let y = 1; y <= years; y++) {
    const dep = round((open * rate) / 100, 0);
    const close = open - dep;
    rows.push({ y, open, dep, close });
    open = close;
  }
  check(sum(rows.map((r) => r.dep)) === cost - open, 'wdv total');
  return { cost, rate, years, rows };
}
/** Double-declining balance (the DDB function), each year's depreciation asserted equal to the function. */
export function ddb(cost, salvage, life) {
  const rows = [];
  let open = cost;
  for (let y = 1; y <= life; y++) {
    const dep = Math.max(0, Math.min((open * 2) / life, open - salvage));
    check(Math.abs(dep - ddbFn(cost, salvage, life, y)) < 1e-9, 'ddb vs function');
    check(Number.isInteger(dep), `DDB year ${y} not whole rupees`);
    rows.push({ y, open, dep, close: open - dep });
    open -= dep;
  }
  check(open === salvage, 'ddb ends at salvage');
  return { cost, salvage, life, rows };
}
export const depRows = (s) => s.rows.map((r) => [`Year ${r.y}`, fig(r.open), fig(r.dep), fig(r.close)]);
export const depTable = (s) => md(['Year', 'Opening book value (₹)', 'Depreciation (₹)', 'Closing book value (₹)'], depRows(s), [1, 2, 3]);

// ---------------------------------------------------------------- loan repayment
/**
 * Equal instalments: emi = ROUND(PMT(annual rate ÷ periods per year, n, −principal), 0).
 * Each row: interest = ROUND(opening × periodic rate, 0); principal = emi − interest; closing = opening − principal.
 */
export function loan(principal, annualRate, n, perYear = 12) {
  const r = annualRate / 100 / perYear;
  const emi = round(pmt(r, n, -principal), 0);
  const rows = [];
  let open = principal;
  for (let k = 1; k <= n; k++) {
    const interest = round(open * r, 0);
    const prin = emi - interest;
    check(interest + prin === emi, `loan row ${k}: interest + principal = instalment`);
    const close = open - prin;
    rows.push({ k, open, emi, interest, prin, close });
    open = close;
  }
  check(Math.abs(open) <= n, `loan closing ${open} is not a rounding difference`);
  return { principal, annualRate, n, perYear, emi, rows, residual: open, totalInterest: sum(rows.map((x) => x.interest)) };
}
export function loanTable(L, period = 'Month') {
  const rows = L.rows.map((x) => [`${period} ${x.k}`, fig(x.open), fig(x.emi), fig(x.interest), fig(x.prin), fig(x.close)]);
  return md([period, 'Opening balance (₹)', 'Instalment (₹)', 'Interest (₹)', 'Principal repaid (₹)', 'Closing balance (₹)'], rows, [1, 2, 3, 4, 5]);
}

// ---------------------------------------------------------------- computerised accounting system
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
/** '2026-05-02' -> '2 May 2026'. */
export const longDate = (d) => `${Number(d.slice(8, 10))} ${MONTHS[Number(d.slice(5, 7)) - 1]} ${d.slice(0, 4)}`;
/** Primary heads by the first digit of the four-digit code (the coding scheme of this chapter). */
export const HEADS = { 1: 'Assets', 2: 'Liabilities', 3: 'Capital', 4: 'Income', 5: 'Expenses' };
/**
 * accounts: [[code, name, group name]]; codes are four digits: first digit = primary head, second = group,
 * last two = ledger within the group (00 is the group itself). vouchers: [{ no, type, date, lines: [[code, dr, cr]] }].
 * period: ['2026-04-01', '2026-04-30']. Cash and bank codes (for receipt, payment and contra rules): cashBank.
 */
export function cas({ accounts, vouchers, period, cashBank, closingStock = 0 }) {
  const chart = new Map();
  for (const [codeNo, name, group] of accounts) {
    check(/^[1-5]\d{3}$/.test(String(codeNo)) && codeNo % 100 !== 0, `account code ${codeNo}`);
    check(!chart.has(codeNo), `duplicate code ${codeNo}`);
    chart.set(codeNo, { code: codeNo, name, group, head: HEADS[String(codeNo)[0]] });
  }
  const problemsOf = (v) => {
    const why = [];
    const dr = sum(v.lines.map((l) => l[1]));
    const cr = sum(v.lines.map((l) => l[2]));
    if (dr !== cr) why.push(`debits ${fig(dr)} ≠ credits ${fig(cr)}`);
    for (const [c] of v.lines) if (!chart.has(c)) why.push(`code ${c} is not in the chart of accounts`);
    if (v.date < period[0] || v.date > period[1]) why.push(`date ${longDate(v.date)} is outside the open accounting period`);
    const cb = v.lines.filter((l) => cashBank.includes(l[0]));
    if (v.type === 'Contra' && cb.length !== v.lines.length) why.push('a contra voucher may use only cash and bank accounts');
    if (v.type === 'Receipt' && !cb.some((l) => l[1] > 0)) why.push('a receipt voucher must debit cash or bank');
    if (v.type === 'Payment' && !cb.some((l) => l[2] > 0)) why.push('a payment voucher must credit cash or bank');
    for (const l of v.lines) if (!(Number.isInteger(l[1]) && Number.isInteger(l[2]) && l[1] >= 0 && l[2] >= 0 && (l[1] > 0) !== (l[2] > 0))) why.push('each line needs exactly one positive amount');
    return why;
  };
  const checked = vouchers.map((v) => ({ ...v, why: problemsOf(v) }));
  const ok = checked.filter((v) => !v.why.length);
  const bal = new Map([...chart.keys()].map((c) => [c, 0]));
  for (const v of ok) for (const [c, dr, cr] of v.lines) bal.set(c, bal.get(c) + dr - cr);
  const tb = [...chart.values()].filter((a) => bal.get(a.code) !== 0).map((a) => ({ ...a, dr: Math.max(bal.get(a.code), 0), cr: Math.max(-bal.get(a.code), 0) }));
  const tbDr = sum(tb.map((x) => x.dr));
  const tbCr = sum(tb.map((x) => x.cr));
  check(tbDr === tbCr, `trial balance totals ${tbDr} vs ${tbCr}`);
  // Final accounts: 41xx sales and 51xx direct expenses to the trading account; 42xx other income and 52xx
  // indirect expenses to the profit and loss account; 1xxx, 2xxx, 3xxx to the balance sheet.
  const B = (c) => bal.get(c) ?? 0;
  const pick = (pre) => tb.filter((x) => String(x.code).startsWith(pre));
  const sales = -sum(pick('41').map((x) => B(x.code)));
  const direct = pick('51').map((x) => [x.name, B(x.code)]);
  const gp = sales + closingStock - sum(direct.map((x) => x[1]));
  const other = pick('42').map((x) => [x.name, -B(x.code)]);
  const indirect = pick('52').map((x) => [x.name, B(x.code)]);
  const np = gp + sum(other.map((x) => x[1])) - sum(indirect.map((x) => x[1]));
  const assets = pick('1').map((x) => [x.name, B(x.code)]);
  const liab = pick('2').map((x) => [x.name, -B(x.code)]);
  const capital = -sum(pick('31').filter((x) => B(x.code) < 0).map((x) => B(x.code)));
  const drawings = sum(pick('31').filter((x) => B(x.code) > 0).map((x) => B(x.code)));
  const capClose = capital + np - drawings;
  const totA = sum(assets.map((x) => x[1])) + closingStock;
  const totL = capClose + sum(liab.map((x) => x[1]));
  check(totA === totL, `balance sheet: assets ${totA}, capital and liabilities ${totL}`);
  const classified = ['41', '42', '51', '52', '1', '2', '31'].reduce((n, pre) => n + pick(pre).length, 0);
  check(classified === tb.length, 'every trial balance account lands in exactly one statement');
  return { chart, checked, ok, rejected: checked.filter((v) => v.why.length), bal, tb, tbDr, tbCr, sales, direct, closingStock, gp, other, indirect, np, assets, liab, capital, drawings, capClose, totA, totL };
}
export function tbTable(C) {
  const rows = C.tb.map((x) => [String(x.code), x.name, x.dr ? fig(x.dr) : '', x.cr ? fig(x.cr) : '']);
  rows.push(['', bold('Total'), bold(fig(C.tbDr)), bold(fig(C.tbCr))]);
  return md(['Code', 'Ledger account', 'Debit (₹)', 'Credit (₹)'], rows, [2, 3]);
}
export function finalTables(C, { period = 'the month ended 30 April 2026', date = '30 April 2026' } = {}) {
  const trading = [['Revenue from sales', fig(C.sales)], ...C.direct.map(([n, v]) => [`Less: ${n}`, fig(-v)]), ['Add: Closing stock', fig(C.closingStock)], [bold('Gross profit'), bold(fig(C.gp))]];
  check(C.sales - sum(C.direct.map((x) => x[1])) + C.closingStock === C.gp, 'trading rows');
  const pl = [[bold('Gross profit'), fig(C.gp)], ...C.other.map(([n, v]) => [`Add: ${n}`, fig(v)]), ...C.indirect.map(([n, v]) => [`Less: ${n}`, fig(-v)]), [bold('Net profit'), bold(fig(C.np))]];
  const bs = [
    [bold('Capital and liabilities'), ''],
    ['Capital (opening and introduced)', fig(C.capital)],
    ['Add: Net profit', fig(C.np)],
    ...(C.drawings ? [['Less: Drawings', fig(-C.drawings)]] : []),
    ...C.liab.map(([n, v]) => [n, fig(v)]),
    [bold('Total'), bold(fig(C.totL))],
    [bold('Assets'), ''],
    ...C.assets.map(([n, v]) => [n, fig(v)]),
    ['Closing stock', fig(C.closingStock)],
    [bold('Total'), bold(fig(C.totA))],
  ];
  return {
    trading: md([`Trading account for ${period} (statement form)`, '₹'], trading, [1]),
    pl: md([`Profit and loss account for ${period} (statement form)`, '₹'], pl, [1]),
    bs: md([`Balance sheet as at ${date}`, '₹'], bs, [1]),
    rows: { trading, pl, bs },
  };
}
