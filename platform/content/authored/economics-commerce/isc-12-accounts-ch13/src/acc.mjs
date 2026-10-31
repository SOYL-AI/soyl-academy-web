// Engines for ISC 12 Accounts ch13 (Accounting Application of Electronic Spreadsheet).
// Nothing quoted in a key, model answer, table or narration is typed twice: it is computed here.
//   Sheet      a small spreadsheet. Every formula shown in the chapter is parsed and evaluated: arithmetic and
//              comparison operators, text joining, cell references, ranges, named cells, references to
//              another sheet of the same workbook (May!F9), and the functions SUM, AVERAGE, MIN, MAX, COUNT,
//              COUNTA, ROUND, ABS, IF, AND, OR, NOT, COUNTIF, SUMIF, DATE, DAY, MONTH, YEAR. A wrong reference,
//              a circular reference, text used as a number or division by zero throws at build time.
//              Empty cells count as zero in arithmetic but are skipped by AVERAGE and COUNT, as in a
//              spreadsheet. The sheet never holds a dollar sign (the maths renderer reserves it), so locked
//              references are shown as named cells.
//   fmt()      number and date formats (comma style in Indian grouping, fixed decimals, percentages, dates),
//              rounding half away from zero for display only; the stored value is unchanged.
//   dates      spreadsheet date serials (day 1 = 1 January 1900, so a serial counts days from 30 December 1899).
//   records    sorting (stable, several keys) and filtering of a list, independent of COUNTIF and SUMIF so the
//              two can be compared.
//   payroll(), commission(), grade()  plain arithmetic for each accounting application, used to check the
//              sheet's results row by row.

export function check(ok, what) {
  if (!ok) throw new Error(`accounting check failed: ${what}`);
}
/** Pins a computed value to a hand-checked one. */
export function pin(v, want, what) {
  check(v === want, `${what}: computed ${JSON.stringify(v)}, hand-checked ${JSON.stringify(want)}`);
  return v;
}

// ---------------------------------------------------------------- numbers and words
const IN = new Intl.NumberFormat('en-IN');
const IN2 = new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
/** 120000 -> "1,20,000". Throws on a non-integer. */
export function fig(n) {
  check(Number.isInteger(n), `non-integer amount ${n}`);
  return n < 0 ? `(${IN.format(-n)})` : IN.format(n);
}
/** 120000 -> "₹1,20,000". */
export const rs = (n) => (n < 0 ? `(₹${fig(-n)})` : `₹${fig(n)}`);
export const sum = (xs) => xs.reduce((a, b) => a + b, 0);

/** Spreadsheet ROUND: half away from zero, d decimal places (decimal-string arithmetic, no float drift). */
export function round(x, d = 0) {
  const s = Math.sign(x);
  const a = Math.abs(Number(x.toPrecision(12)));
  const v = Number(`${Math.round(Number(`${a}e${d}`))}e-${d}`);
  return s * v === 0 ? 0 : s * v;
}
/** A number as the comma style shows it: integers grouped, others to two decimal places. */
export function num(v) {
  check(typeof v === 'number' && Number.isFinite(v), `num(${v})`);
  if (Number.isInteger(v)) return v < 0 ? `−${IN.format(-v)}` : IN.format(v);
  const r = round(v, 2);
  return r < 0 ? `−${IN2.format(-r)}` : IN2.format(r);
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
  const s = Number.isInteger(v) ? String(v) : String(round(v, 2));
  const [i, f] = s.split('.');
  return f ? `${words(Number(i))} point ${[...f].map((d) => ONES[Number(d)]).join(' ')}` : words(Number(i));
}

// ---------------------------------------------------------------- markdown
/** Markdown table; `numCols` = indexes of right-aligned (amount) columns. */
export function md(headers, rows, numCols = []) {
  for (const r of rows) check(r.length === headers.length, `table row has ${r.length} cells, header ${headers.length}`);
  for (const r of [headers, ...rows]) for (const c of r) check(!String(c).includes('|'), `table cell with a bar: ${c}`);
  const sep = headers.map((_, i) => (numCols.includes(i) ? '---:' : '---'));
  const line = (cells) => `| ${cells.map((c) => (c === '' ? ' ' : c)).join(' | ')} |`;
  return [line(headers), line(sep), ...rows.map(line)].join('\n');
}
export const bold = (s) => `**${s}**`;
export const code = (s) => `\`${s}\``;

// ---------------------------------------------------------------- columns and references
const COLS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
/** "A" -> 0, "Z" -> 25, "AA" -> 26. */
export const colIndex = (c) => [...c].reduce((n, ch) => n * 26 + COLS.indexOf(ch) + 1, 0) - 1;
/** 0 -> "A", 26 -> "AA", 702 -> "AAA" (bijective base 26). */
export function colName(i) {
  let n = i + 1;
  let s = '';
  while (n > 0) {
    const r = (n - 1) % 26;
    s = COLS[r] + s;
    n = Math.floor((n - 1) / 26);
  }
  return s;
}
const REF = /^([A-Z]{1,3})(\d+)$/;
export function splitRef(ref) {
  const m = REF.exec(ref);
  check(!!m, `bad cell reference ${ref}`);
  return { c: colIndex(m[1]), r: Number(m[2]) };
}
export const refOf = (c, r) => `${colName(c)}${r}`;
/** Number of cells in a range such as B3:E12. */
export function rangeSize(r) {
  const [a, b] = r.split(':').map(splitRef);
  return { rows: b.r - a.r + 1, cols: b.c - a.c + 1, cells: (b.r - a.r + 1) * (b.c - a.c + 1) };
}
/** Freezing panes with `ref` selected keeps the rows above it and the columns to its left on screen. */
export function freezeAt(ref) {
  const { c, r } = splitRef(ref);
  return { rows: r - 1, cols: c, rowText: r > 1 ? (r === 2 ? 'row 1' : `rows 1 to ${r - 1}`) : 'no rows', colText: c > 0 ? (c === 1 ? 'column A' : `columns A to ${colName(c - 1)}`) : 'no columns' };
}

// ---------------------------------------------------------------- dates
const EPOCH = Date.UTC(1899, 11, 30);
const DAY = 86400000;
/** Spreadsheet date serial of y-m-d (month overflow allowed, as in DATE). */
export const serial = (y, m, d) => Math.round((Date.UTC(y, m - 1, d) - EPOCH) / DAY);
export function ymd(s) {
  check(Number.isInteger(s) && s > 60, `date serial ${s}`);
  const t = new Date(EPOCH + s * DAY);
  return { y: t.getUTCFullYear(), m: t.getUTCMonth() + 1, d: t.getUTCDate() };
}
export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const p2 = (n) => String(n).padStart(2, '0');
const DATE_FORMATS = ['dd-mm-yyyy', 'dd-mmm-yyyy', 'd mmmm yyyy', 'dd/mm/yy', 'mmm-yy'];
export function fmtDate(s, f = 'dd-mm-yyyy') {
  const { y, m, d } = ymd(s);
  switch (f) {
    case 'dd-mm-yyyy': return `${p2(d)}-${p2(m)}-${y}`;
    case 'dd-mmm-yyyy': return `${p2(d)}-${MONTHS[m - 1].slice(0, 3)}-${y}`;
    case 'd mmmm yyyy': return `${d} ${MONTHS[m - 1]} ${y}`;
    case 'dd/mm/yy': return `${p2(d)}/${p2(m)}/${String(y).slice(2)}`;
    case 'mmm-yy': return `${MONTHS[m - 1].slice(0, 3)}-${String(y).slice(2)}`;
  }
  throw new Error(`accounting check failed: date format ${f}`);
}
/** "5 February 2027" from a serial. */
export const longDate = (s) => fmtDate(s, 'd mmmm yyyy');
/** Spoken date for narration: "fifth of February". */
const ORD = ['', 'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth', 'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth', 'seventeenth', 'eighteenth', 'nineteenth', 'twentieth', 'twenty-first', 'twenty-second', 'twenty-third', 'twenty-fourth', 'twenty-fifth', 'twenty-sixth', 'twenty-seventh', 'twenty-eighth', 'twenty-ninth', 'thirtieth', 'thirty-first'];
export const spokenDate = (s) => { const { m, d } = ymd(s); return `the ${ORD[d]} of ${MONTHS[m - 1]}`; };

// ---------------------------------------------------------------- display formats
/**
 * What a cell shows under a number format. Formats used in the chapter: General (as stored, no grouping),
 * 0, 0.0, 0.00 (fixed decimals), #,##0 and #,##0.00 (comma style, Indian grouping), 0%, 0.0%, 0.00%
 * (value × 100), and the date formats above. Display rounding is half away from zero.
 */
export function fmt(v, f = 'General') {
  if (typeof v === 'string') return v;
  if (typeof v === 'boolean') return v ? 'TRUE' : 'FALSE';
  check(typeof v === 'number' && Number.isFinite(v), `fmt(${v})`);
  if (DATE_FORMATS.includes(f)) return fmtDate(v, f);
  const fixed = (x, d) => { const r = round(x, d); return d ? r.toFixed(d) : String(r); };
  const neg = (s) => (s.startsWith('-') ? `−${s.slice(1)}` : s);
  let m;
  if (f === 'General') return neg(String(round(v, 9)));
  if ((m = /^0(?:\.(0+))?$/.exec(f))) return neg(fixed(v, m[1]?.length ?? 0));
  if (f === '#,##0') return num(round(v, 0));
  if (f === '#,##0.00') { const r = round(v, 2); return r < 0 ? `−${IN2.format(-r)}` : IN2.format(r); }
  if ((m = /^0(?:\.(0+))?%$/.exec(f))) return `${neg(fixed(round(v * 100, 9), m[1]?.length ?? 0))}%`;
  throw new Error(`accounting check failed: unknown format ${f}`);
}

// ---------------------------------------------------------------- formula parser
function tokenize(src) {
  const toks = [];
  let i = 0;
  while (i < src.length) {
    const ch = src[i];
    const rest = src.slice(i);
    if (ch === ' ') { i++; continue; }
    let m;
    if ((m = /^\d+(?:\.\d+)?%?/.exec(rest))) {
      const t = m[0];
      toks.push({ t: 'num', v: t.endsWith('%') ? round(Number(t.slice(0, -1)) / 100, 12) : Number(t) });
      i += t.length;
    } else if (ch === '"') {
      const j = src.indexOf('"', i + 1);
      check(j > 0, `unclosed string in ${src}`);
      toks.push({ t: 'str', v: src.slice(i + 1, j) });
      i = j + 1;
    } else if ((m = /^([A-Za-z][A-Za-z0-9_]*)!([A-Z]{1,3}\d+(?::[A-Z]{1,3}\d+)?)(?![A-Za-z0-9_(])/.exec(rest))) {
      toks.push({ t: m[2].includes(':') ? 'range' : 'ref', v: m[2], sheet: m[1] });
      i += m[0].length;
    } else if ((m = /^[A-Z]{1,3}\d+(?::[A-Z]{1,3}\d+)?(?![A-Za-z0-9_(])/.exec(rest))) {
      toks.push({ t: m[0].includes(':') ? 'range' : 'ref', v: m[0] });
      i += m[0].length;
    } else if ((m = /^[A-Za-z_][A-Za-z0-9_]*/.exec(rest))) {
      const w = m[0];
      i += w.length;
      if (src[i] === '(') toks.push({ t: 'fn', v: w.toUpperCase() });
      else if (/^(TRUE|FALSE)$/i.test(w)) toks.push({ t: 'bool', v: /^TRUE$/i.test(w) });
      else toks.push({ t: 'name', v: w });
    } else if ((m = /^(<=|>=|<>|[-+*/^&=<>(),])/.exec(rest))) {
      toks.push({ t: 'op', v: m[0] });
      i += m[0].length;
    } else throw new Error(`accounting check failed: cannot read "${rest}" in formula ${src}`);
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
    if (t.t === 'ref') return { k: 'ref', v: t.v, sheet: t.sheet };
    if (t.t === 'range') return { k: 'range', v: t.v, sheet: t.sheet };
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

/** A COUNTIF / SUMIF criterion: 5000, "Due", ">=50000", "<>Paid". Text compares ignoring case. */
export function criterion(c) {
  if (typeof c === 'number') return (v) => v === c;
  check(typeof c === 'string', `criterion ${c}`);
  const m = /^(<=|>=|<>|<|>|=)?(.*)$/.exec(c);
  const op = m[1] || '=';
  const rhs = m[2];
  const n = rhs !== '' && Number.isFinite(Number(rhs)) ? Number(rhs) : null;
  if (n !== null) {
    return (v) => {
      if (typeof v !== 'number') return op === '<>';
      return { '=': v === n, '<>': v !== n, '<': v < n, '>': v > n, '<=': v <= n, '>=': v >= n }[op];
    };
  }
  check(op === '=' || op === '<>', `text criterion ${c}`);
  return (v) => {
    const eq = typeof v === 'string' && v.toLowerCase() === rhs.toLowerCase();
    return op === '=' ? eq : !eq;
  };
}

const nums = (xs) => xs.flat(Infinity).filter((x) => typeof x === 'number');
const FUNCS = {
  SUM: (xs) => sum(nums(xs)),
  AVERAGE: (xs) => { const n = nums(xs); check(n.length > 0, 'AVERAGE of no numbers'); return sum(n) / n.length; },
  MIN: (xs) => Math.min(...nums(xs)),
  MAX: (xs) => Math.max(...nums(xs)),
  COUNT: (xs) => nums(xs).length,
  COUNTA: (xs) => xs.flat(Infinity).filter((x) => x !== null && x !== '').length,
  ABS: ([x]) => Math.abs(x),
  ROUND: ([x, d]) => round(x, d),
  DATE: ([y, m, d]) => serial(y, m, d),
  DAY: ([s]) => ymd(s).d,
  MONTH: ([s]) => ymd(s).m,
  YEAR: ([s]) => ymd(s).y,
  AND: (xs) => xs.flat(Infinity).every((x) => x === true),
  OR: (xs) => xs.flat(Infinity).some((x) => x === true),
  NOT: ([x]) => !x,
  COUNTIF: ([r, c]) => r.flat().filter(criterion(c)).length,
  SUMIF: ([r, c, s]) => {
    const keys = r.flat();
    const vals = (s ?? r).flat();
    check(keys.length === vals.length, 'SUMIF ranges differ in size');
    const ok = criterion(c);
    return sum(vals.filter((v, i) => ok(keys[i]) && typeof v === 'number'));
  },
};

// ---------------------------------------------------------------- the sheet
export class Sheet {
  /**
   * cells: { A1: 'text' | 1200 | '30%' | '=formula' }; names: { DARate: 'N2' } (a name points at one cell);
   * formats: { B2: 'dd-mm-yyyy', C: '0.00%' } (a cell or a whole column); book: { May: sheet } for references to
   * other sheets of the same workbook.
   */
  constructor(cells, { names = {}, formats = {}, book = {} } = {}) {
    this.cells = cells;
    this.names = names;
    this.formats = formats;
    this.book = book;
    this.cache = new Map();
    this.busy = new Set();
    for (const [k, v] of Object.entries(cells)) {
      splitRef(k);
      check(typeof v === 'number' || typeof v === 'string', `cell ${k}`);
      if (typeof v === 'string') check(!v.includes('$') && !v.includes('|'), `cell ${k}: no dollar signs or bars in shown cells`);
    }
    for (const r of Object.values(names)) splitRef(r);
    for (const k of Object.keys(cells)) this.get(k);
  }
  isFormula(ref) { return typeof this.cells[ref] === 'string' && this.cells[ref].startsWith('='); }
  get(ref) {
    const { c, r } = splitRef(ref);
    const key = refOf(c, r);
    if (this.cache.has(key)) return this.cache.get(key);
    check(!this.busy.has(key), `circular reference at ${key}`);
    const raw = this.cells[key];
    let v;
    if (raw === undefined) v = null;
    else if (typeof raw === 'number') v = raw;
    else if (raw.startsWith('=')) {
      this.busy.add(key);
      v = this.ev(parse(raw.slice(1)), raw);
      // A spreadsheet keeps 15 significant digits, so 54000 × 10% is exactly 5400.
      if (typeof v === 'number') v = Number(v.toPrecision(15));
      this.busy.delete(key);
    } else if (/^-?\d+(?:\.\d+)?%$/.test(raw)) v = round(Number(raw.slice(0, -1)) / 100, 12);
    else v = raw;
    this.cache.set(key, v);
    return v;
  }
  /** The value used in arithmetic: an empty cell counts as zero. */
  val(ref) { const v = this.get(ref); return v === null ? 0 : v; }
  /** The 2-D array of values in a range (null for an empty cell). */
  range(r) {
    const [a, b] = r.split(':').map(splitRef);
    check(a.r <= b.r && a.c <= b.c, `range ${r}`);
    const out = [];
    for (let row = a.r; row <= b.r; row++) {
      const line = [];
      for (let c = a.c; c <= b.c; c++) line.push(this.get(refOf(c, row)));
      out.push(line);
    }
    return out;
  }
  other(name, src) {
    check(name in this.book, `${src}: no sheet named ${name}`);
    return this.book[name];
  }
  ev(n, src) {
    const N = (x) => {
      if (x === null) return 0;
      check(typeof x === 'number', `${src}: expected a number, got ${JSON.stringify(x)}`);
      return x;
    };
    switch (n.k) {
      case 'lit': return n.v;
      case 'ref': return n.sheet ? this.other(n.sheet, src).val(n.v) : this.val(n.v);
      case 'name': check(n.v in this.names, `${src}: unknown name ${n.v}`); return this.val(this.names[n.v]);
      case 'range': return n.sheet ? this.other(n.sheet, src).range(n.v) : this.range(n.v);
      case 'neg': return -N(this.ev(n.a, src));
      case 'bin': {
        const a = this.ev(n.a, src);
        const b = this.ev(n.b, src);
        const txt = typeof a === 'string' && typeof b === 'string';
        switch (n.op) {
          case '+': return N(a) + N(b);
          case '-': return N(a) - N(b);
          case '*': return N(a) * N(b);
          case '/': check(N(b) !== 0, `${src}: division by zero`); return N(a) / N(b);
          case '^': return N(a) ** N(b);
          case '&': return `${a}${b}`;
          case '=': return txt ? a.toLowerCase() === b.toLowerCase() : a === b;
          case '<>': return txt ? a.toLowerCase() !== b.toLowerCase() : a !== b;
          case '<': return N(a) < N(b);
          case '>': return N(a) > N(b);
          case '<=': return N(a) <= N(b);
          case '>=': return N(a) >= N(b);
        }
        break;
      }
      case 'fn': {
        if (n.f === 'IF') {
          check(n.args.length === 3, `${src}: IF needs three arguments here`);
          const c = this.ev(n.args[0], src);
          check(typeof c === 'boolean', `${src}: IF test is not TRUE or FALSE`);
          return c ? this.ev(n.args[1], src) : this.ev(n.args[2], src);
        }
        check(n.f in FUNCS, `${src}: unknown function ${n.f}`);
        const args = n.args.map((x) => this.ev(x, src));
        const v = FUNCS[n.f](args);
        check(typeof v === 'boolean' || (typeof v === 'number' && Number.isFinite(v)), `${src}: ${n.f} gave ${v}`);
        return v;
      }
    }
    throw new Error(`accounting check failed: cannot evaluate ${src}`);
  }
  formatOf(ref) { return this.formats[ref] ?? this.formats[ref.replace(/\d+$/, '')] ?? null; }
  /** Shown value of a cell: its format if it has one; else numbers in comma style, percentages as typed, text as is. */
  shown(ref) {
    const raw = this.cells[ref];
    if (raw === undefined) return '';
    const f = this.formatOf(ref);
    if (typeof raw === 'string' && !raw.startsWith('=') && !f) return raw;
    const v = this.get(ref);
    if (f) return fmt(v, f);
    return typeof v === 'number' ? num(v) : typeof v === 'boolean' ? (v ? 'TRUE' : 'FALSE') : String(v);
  }
  /**
   * The sheet as a markdown table: column letters across, row numbers down. A formula cell is shown as
   * `formula` → **result** (view 'both'), as the formula alone ('formula') or as the result ('value').
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
  /** Formula of each listed cell with what it shows: [[cell, `formula`, shown]]. */
  formulaRows(refs) { return refs.map((r) => { check(this.isFormula(r), `${r} is not a formula`); return [r, code(this.cells[r]), this.shown(r)]; }); }
}

/** Copies a formula by (dRows, dCols): every cell reference moves (they are all relative here); names and text stay. */
export function shiftFormula(f, dRows, dCols) {
  return f
    .split('"')
    .map((part, i) => (i % 2 ? part : part.replace(/(?<![A-Za-z0-9_])([A-Z]{1,3})(\d+)(?![A-Za-z0-9_(])/g, (_, c, r) => {
      const nc = colIndex(c) + dCols;
      const nr = Number(r) + dRows;
      check(nc >= 0 && nr >= 1, `copy moves ${c}${r} off the sheet`);
      return `${colName(nc)}${nr}`;
    })))
    .join('"');
}

// ---------------------------------------------------------------- records (database lists)
const cmp = (a, b) => (typeof a === 'number' && typeof b === 'number' ? a - b : String(a).localeCompare(String(b), 'en', { sensitivity: 'base' }));
/** Stable sort on several keys: [[field, 'asc' | 'desc'], …]. */
export function sortRecords(recs, keys) {
  return recs
    .map((r, i) => [r, i])
    .sort(([a, i], [b, j]) => {
      for (const [k, dir] of keys) {
        const c = cmp(a[k], b[k]);
        if (c) return dir === 'desc' ? -c : c;
      }
      return i - j;
    })
    .map(([r]) => r);
}
export const filterRecords = (recs, pred) => recs.filter(pred);
/** Records as a markdown table (fields in order; amounts in comma style). */
export function recordTable(recs, fields, heads = fields, amountFields = []) {
  return md(heads, recs.map((r) => fields.map((f) => (typeof r[f] === 'number' && amountFields.includes(f) ? fig(r[f]) : String(r[f])))), fields.map((f, i) => (amountFields.includes(f) ? i : -1)).filter((i) => i >= 0));
}
/** Records laid out on a sheet: header row 1, records from row 2, fields in columns from A. */
export function recordCells(recs, fields, heads = fields) {
  const cells = {};
  heads.forEach((h, c) => { cells[`${colName(c)}1`] = h; });
  recs.forEach((r, i) => fields.forEach((f, c) => { cells[`${colName(c)}${i + 2}`] = r[f]; }));
  return cells;
}

// ---------------------------------------------------------------- the accounting applications, in plain arithmetic
/**
 * One employee's pay under the rules of a payroll sheet (rates as fractions, amounts in rupees):
 * DA and HRA on basic pay, TA by a basic-pay limit, a flat CCA, PF on basic + DA, and income tax deducted at a
 * flat rate on the monthly gross above a limit (a simplified rule used only in the chapter's exercises).
 */
export function payroll(basic, R) {
  const da = round(basic * R.da, 0);
  const hra = round(basic * R.hra, 0);
  const ta = basic < R.taLimit ? R.taLow : R.taHigh;
  const cca = R.cca;
  const gross = basic + da + hra + ta + cca;
  const pf = round((basic + da) * R.pf, 0);
  const tax = gross > R.taxLimit ? round((gross - R.taxLimit) * R.tax, 0) : 0;
  const ded = pf + tax;
  const net = gross - ded;
  check(net + ded === gross && net > 0, 'payroll row');
  return { basic, da, hra, ta, cca, gross, pf, tax, ded, net };
}
/** Commission at `low` on sales up to the target and `high` on the excess; rounded to the rupee. */
export function commission(sales, target, low, high) {
  return sales > target ? round(target * low + (sales - target) * high, 0) : round(sales * low, 0);
}
/** Grade from a percentage by descending cut-offs [[80, 'A'], [60, 'B'], [40, 'C']], else the last grade. */
export function grade(p, cuts, last) {
  for (const [c, g] of cuts) if (p >= c) return g;
  return last;
}
