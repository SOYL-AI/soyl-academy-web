// A tiny in-memory relational engine for ISC 12 Accounts ch14 (Database Management System). Every query
// result, key verdict, report total, debtor balance, bank reconciliation and depreciation figure that
// appears in a deck, note, key or model answer is produced here and asserted by the caller; nothing is
// typed twice.
//   Db.create()   a table: typed columns (text | number | currency | date | yesno), a primary key and
//                 optional foreign keys (each pointing at another table's primary key).
//   Db.insert()   adds a row or throws; Db.verdict() returns the verdict for a proposed row instead
//                 ("Accepted" or "Rejected: …"): duplicate or blank primary key, wrong data type,
//                 no matching parent record (foreign key).
//   Db.run(sql)   parses and runs a subset of SQL: SELECT [cols | * | COUNT/SUM/AVG/MAX/MIN(col | *)
//                 [AS name]] FROM t [WHERE cond] [ORDER BY col [ASC|DESC], …]; UPDATE t SET col = expr,
//                 … [WHERE cond]; DELETE FROM t [WHERE cond]. Conditions use = <> < > <= >=, IS [NOT]
//                 NULL, NOT, AND, OR and brackets, with AND binding tighter than OR and SQL's
//                 three-valued logic (a comparison with NULL is unknown; WHERE keeps only true rows).
//                 Aggregates skip NULLs; COUNT(*) counts rows. UPDATE re-checks keys and types; DELETE
//                 of a parent row that child rows still reference is refused (restrict).
//   join(), groupSum(), unmatched()  build reports from related tables (report totals asserted).
// Numbers are whole rupees; dates are ISO strings ('2026-04-15'), which compare correctly as text.

export function check(ok, what) {
  if (!ok) throw new Error(`accounting check failed: ${what}`);
}

// ---------------------------------------------------------------- numbers, words, markdown
const IN = new Intl.NumberFormat('en-IN');
/** 120000 -> "1,20,000". Throws on a non-integer. */
export function fig(n) {
  check(Number.isInteger(n), `non-integer amount ${n}`);
  return n < 0 ? `(${IN.format(-n)})` : IN.format(n);
}
export const rs = (n) => (n < 0 ? `(₹${fig(-n)})` : `₹${fig(n)}`);
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

/** Markdown table; `num` = indexes of right-aligned columns. */
export function md(headers, rows, num = []) {
  for (const r of rows) check(r.length === headers.length, `table row has ${r.length} cells, header ${headers.length}`);
  const sep = headers.map((_, i) => (num.includes(i) ? '---:' : '---'));
  const line = (cells) => `| ${cells.map((c) => (c === '' ? ' ' : String(c))).join(' | ')} |`;
  return [line(headers), line(sep), ...rows.map(line)].join('\n');
}
export const bold = (s) => `**${s}**`;
/** Inline code for a query or a field name. */
export const code = (s) => {
  check(!s.includes('`') && !s.includes('$'), `code text ${s}`);
  return `\`${s}\``;
};

// ---------------------------------------------------------------- values
const TYPES = ['text', 'number', 'currency', 'date', 'yesno'];
export const TYPE_LABEL = { text: 'Text', number: 'Number', currency: 'Currency', date: 'Date', yesno: 'Yes/No' };
function typeOk(type, v) {
  if (v === null) return true;
  if (type === 'text') return typeof v === 'string';
  if (type === 'number' || type === 'currency') return Number.isInteger(v);
  if (type === 'date') return typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v) && !Number.isNaN(Date.parse(v));
  if (type === 'yesno') return v === 'Yes' || v === 'No';
  return false;
}
/** How a stored value is shown in a result table (as the database shows it: no digit grouping). */
export function cell(v) {
  if (v === null || v === undefined) return 'NULL';
  if (typeof v === 'number') return Number.isInteger(v) ? String(v) : v.toFixed(2);
  return v;
}

// ---------------------------------------------------------------- SQL subset: tokens and parser
const KEYWORDS = new Set(['SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'NOT', 'UPDATE', 'SET', 'DELETE', 'ORDER', 'BY', 'ASC', 'DESC', 'AS', 'NULL', 'IS']);
const AGGS = new Set(['COUNT', 'SUM', 'AVG', 'MAX', 'MIN']);
function tokenize(sql) {
  const out = [];
  const re = /\s*(?:(\d+)|'([^']*)'|([A-Za-z][A-Za-z0-9]*)|(<>|<=|>=|=|<|>|\(|\)|,|\*|\+|-|\/|;))/y;
  let i = 0;
  while (i < sql.length) {
    if (/^\s*$/.test(sql.slice(i))) break;
    re.lastIndex = i;
    const m = re.exec(sql);
    check(m, `SQL: cannot read "${sql.slice(i, i + 20)}" in ${sql}`);
    if (m[1] !== undefined) out.push({ k: 'num', v: Number(m[1]) });
    else if (m[2] !== undefined) out.push({ k: 'str', v: m[2] });
    else if (m[3] !== undefined) {
      const up = m[3].toUpperCase();
      out.push(KEYWORDS.has(up) || AGGS.has(up) ? { k: 'kw', v: up } : { k: 'id', v: m[3] });
    } else out.push({ k: 'op', v: m[4] });
    i = re.lastIndex;
  }
  return out;
}

function parse(sql) {
  const t = tokenize(sql);
  let p = 0;
  const peek = () => t[p];
  const is = (k, v) => t[p] && t[p].k === k && (v === undefined || t[p].v === v);
  const take = (k, v) => {
    check(is(k, v), `SQL: expected ${v ?? k} at token ${p} in ${sql}`);
    return t[p++];
  };
  const ident = () => take('id').v;

  function factor() {
    if (is('num')) return { e: 'lit', v: take('num').v };
    if (is('str')) return { e: 'lit', v: take('str').v };
    if (is('kw', 'NULL')) { p++; return { e: 'lit', v: null }; }
    if (is('op', '(')) { p++; const x = expr(); take('op', ')'); return x; }
    return { e: 'col', v: ident() };
  }
  function term() {
    let x = factor();
    while (is('op', '*') || is('op', '/')) { const op = take('op').v; x = { e: 'bin', op, a: x, b: factor() }; }
    return x;
  }
  function expr() {
    let x = term();
    while (is('op', '+') || is('op', '-')) { const op = take('op').v; x = { e: 'bin', op, a: x, b: term() }; }
    return x;
  }
  function primary() {
    if (is('op', '(')) { p++; const c = orCond(); take('op', ')'); return c; }
    const a = expr();
    if (is('kw', 'IS')) {
      p++;
      const neg = is('kw', 'NOT') ? (p++, true) : false;
      take('kw', 'NULL');
      return { c: 'isnull', a, neg };
    }
    const op = take('op').v;
    check(['=', '<>', '<', '>', '<=', '>='].includes(op), `SQL: bad comparison ${op}`);
    return { c: 'cmp', op, a, b: expr() };
  }
  function notCond() {
    if (is('kw', 'NOT')) { p++; return { c: 'not', a: notCond() }; }
    return primary();
  }
  function andCond() {
    let x = notCond();
    while (is('kw', 'AND')) { p++; x = { c: 'and', a: x, b: notCond() }; }
    return x;
  }
  function orCond() {
    let x = andCond();
    while (is('kw', 'OR')) { p++; x = { c: 'or', a: x, b: andCond() }; }
    return x;
  }
  const where = () => (is('kw', 'WHERE') ? (p++, orCond()) : null);
  const end = () => {
    if (is('op', ';')) p++;
    check(p === t.length, `SQL: unexpected "${peek()?.v}" in ${sql}`);
  };

  if (is('kw', 'SELECT')) {
    p++;
    const items = [];
    if (is('op', '*')) { p++; items.push({ star: true }); }
    else {
      do {
        if (is('kw') && AGGS.has(peek().v)) {
          const fn = take('kw').v;
          take('op', '(');
          const col = is('op', '*') ? (p++, '*') : ident();
          take('op', ')');
          check(col !== '*' || fn === 'COUNT', `SQL: ${fn}(*)`);
          const as = is('kw', 'AS') ? (p++, ident()) : null;
          items.push({ agg: fn, col, as, label: as ?? `${fn}(${col})` });
        } else {
          const col = ident();
          items.push({ col, label: col });
        }
      } while (is('op', ',') && ++p);
    }
    take('kw', 'FROM');
    const table = ident();
    const w = where();
    const order = [];
    if (is('kw', 'ORDER')) {
      p++;
      take('kw', 'BY');
      do {
        const col = ident();
        const dir = is('kw', 'DESC') ? (p++, 'DESC') : is('kw', 'ASC') ? (p++, 'ASC') : 'ASC';
        order.push({ col, dir });
      } while (is('op', ',') && ++p);
    }
    end();
    return { kind: 'select', items, table, where: w, order };
  }
  if (is('kw', 'UPDATE')) {
    p++;
    const table = ident();
    take('kw', 'SET');
    const sets = [];
    do {
      const col = ident();
      take('op', '=');
      sets.push({ col, x: expr() });
    } while (is('op', ',') && ++p);
    const w = where();
    end();
    return { kind: 'update', table, sets, where: w };
  }
  take('kw', 'DELETE');
  take('kw', 'FROM');
  const table = ident();
  const w = where();
  end();
  return { kind: 'delete', table, where: w };
}

// ---------------------------------------------------------------- evaluation
function evalX(x, row, cols) {
  if (x.e === 'lit') return x.v;
  if (x.e === 'col') {
    check(cols.includes(x.v), `SQL: unknown column ${x.v}`);
    return row[x.v];
  }
  const a = evalX(x.a, row, cols);
  const b = evalX(x.b, row, cols);
  if (a === null || b === null) return null;
  check(typeof a === 'number' && typeof b === 'number', 'SQL: arithmetic on text');
  const v = x.op === '+' ? a + b : x.op === '-' ? a - b : x.op === '*' ? a * b : a / b;
  check(Number.isInteger(v), `SQL: ${a} ${x.op} ${b} is not whole`);
  return v;
}
/** Three-valued logic: true, false or null (unknown). */
function evalC(c, row, cols) {
  if (c.c === 'cmp') {
    const a = evalX(c.a, row, cols);
    const b = evalX(c.b, row, cols);
    if (a === null || b === null) return null;
    check(typeof a === typeof b, `SQL: comparing ${typeof a} with ${typeof b}`);
    switch (c.op) {
      case '=': return a === b;
      case '<>': return a !== b;
      case '<': return a < b;
      case '>': return a > b;
      case '<=': return a <= b;
      default: return a >= b;
    }
  }
  if (c.c === 'isnull') {
    const v = evalX(c.a, row, cols) === null;
    return c.neg ? !v : v;
  }
  if (c.c === 'not') {
    const v = evalC(c.a, row, cols);
    return v === null ? null : !v;
  }
  const a = evalC(c.a, row, cols);
  const b = evalC(c.b, row, cols);
  if (c.c === 'and') return a === false || b === false ? false : a === null || b === null ? null : true;
  return a === true || b === true ? true : a === null || b === null ? null : false;
}

// ---------------------------------------------------------------- database
export class Db {
  constructor() { this.t = new Map(); }
  /** cols = [[name, type], …]; o = { pk, fks: { col: 'Parent' } }. */
  create(name, cols, o) {
    check(!this.t.has(name), `table ${name} exists`);
    for (const [, ty] of cols) check(TYPES.includes(ty), `type ${ty}`);
    check(cols.some(([c]) => c === o.pk), `${name}: primary key ${o.pk} is not a column`);
    for (const [c, parent] of Object.entries(o.fks ?? {})) {
      check(cols.some(([x]) => x === c), `${name}: foreign key ${c} is not a column`);
      check(this.t.has(parent), `${name}: parent ${parent} must be created first`);
    }
    this.t.set(name, { name, cols, pk: o.pk, fks: o.fks ?? {}, rows: [] });
    return this;
  }
  table(name) {
    const t = this.t.get(name);
    check(t, `no table ${name}`);
    return t;
  }
  colNames(name) { return this.table(name).cols.map(([c]) => c); }
  /** Verdict for a proposed row (does not add it). `except` = index of a row being replaced. */
  verdict(name, row, except = -1) {
    const t = this.table(name);
    const names = t.cols.map(([c]) => c);
    check(Object.keys(row).every((k) => names.includes(k)), `${name}: unknown column in ${JSON.stringify(row)}`);
    for (const [c, ty] of t.cols) if (!typeOk(ty, row[c] ?? null)) return `Rejected: wrong data type in ${c}`;
    const key = row[t.pk] ?? null;
    if (key === null) return 'Rejected: primary key left blank';
    if (t.rows.some((r, i) => i !== except && r[t.pk] === key)) return 'Rejected: duplicate primary key';
    for (const [c, parent] of Object.entries(t.fks)) {
      const v = row[c] ?? null;
      const pt = this.table(parent);
      if (v !== null && !pt.rows.some((r) => r[pt.pk] === v)) return `Rejected: no matching record in ${parent} (foreign key)`;
    }
    return 'Accepted';
  }
  insert(name, ...rows) {
    const t = this.table(name);
    for (const r of rows) {
      const v = this.verdict(name, r);
      check(v === 'Accepted', `${name} insert ${JSON.stringify(r)}: ${v}`);
      t.rows.push(Object.fromEntries(t.cols.map(([c]) => [c, r[c] ?? null])));
    }
    return this;
  }
  /** Inserts rows given as arrays in column order. */
  load(name, arrays) {
    const cols = this.colNames(name);
    return this.insert(name, ...arrays.map((a) => {
      check(a.length === cols.length, `${name}: row ${JSON.stringify(a)}`);
      return Object.fromEntries(cols.map((c, i) => [c, a[i]]));
    }));
  }
  clone() {
    const d = new Db();
    for (const [k, t] of this.t) d.t.set(k, { ...t, rows: t.rows.map((r) => ({ ...r })) });
    return d;
  }
  /** Children that still reference a parent key. */
  referencing(parent, key) {
    const out = [];
    for (const t of this.t.values()) for (const [c, p] of Object.entries(t.fks)) if (p === parent) for (const r of t.rows) if (r[c] === key) out.push([t.name, r]);
    return out;
  }
  /**
   * Runs one statement. SELECT returns { columns, rows }; UPDATE and DELETE change this database and
   * return { affected, refused } (refused = reason when keys forbid the change; nothing is changed then).
   */
  run(sql) {
    const q = parse(sql);
    const t = this.table(q.table);
    const cols = t.cols.map(([c]) => c);
    const keep = (r) => !q.where || evalC(q.where, r, cols) === true;
    if (q.kind === 'select') {
      let rows = t.rows.filter(keep);
      for (const o of [...q.order].reverse()) {
        check(cols.includes(o.col), `ORDER BY ${o.col}`);
        rows = [...rows].sort((a, b) => {
          const x = a[o.col];
          const y = b[o.col];
          const s = x === y ? 0 : x === null ? -1 : y === null ? 1 : x < y ? -1 : 1;
          return o.dir === 'DESC' ? -s : s;
        });
      }
      if (q.items.some((i) => i.agg)) {
        check(q.items.every((i) => i.agg), 'SQL: aggregate mixed with plain columns needs GROUP BY (not used)');
        const out = q.items.map((i) => {
          if (i.col === '*') return rows.length;
          check(cols.includes(i.col), `SQL: unknown column ${i.col}`);
          const vs = rows.map((r) => r[i.col]).filter((v) => v !== null);
          if (i.agg === 'COUNT') return vs.length;
          if (!vs.length) return null;
          if (i.agg === 'SUM') return sum(vs);
          if (i.agg === 'AVG') return sum(vs) / vs.length;
          return vs.reduce((a, b) => (i.agg === 'MAX' ? (b > a ? b : a) : b < a ? b : a));
        });
        return { columns: q.items.map((i) => i.label), rows: [out] };
      }
      const pick = q.items[0].star ? cols : q.items.map((i) => {
        check(cols.includes(i.col), `SQL: unknown column ${i.col}`);
        return i.col;
      });
      return { columns: pick, rows: rows.map((r) => pick.map((c) => r[c])) };
    }
    if (q.kind === 'update') {
      const next = t.rows.map((r) => {
        if (!keep(r)) return r;
        const n = { ...r };
        for (const s of q.sets) {
          check(cols.includes(s.col), `SET ${s.col}`);
          n[s.col] = evalX(s.x, r, cols);
        }
        return n;
      });
      const affected = t.rows.filter(keep).length;
      const saved = t.rows;
      for (let i = 0; i < next.length; i++) {
        if (next[i] === saved[i]) continue;
        t.rows = next;
        const v = this.verdict(t.name, next[i], i);
        t.rows = saved;
        if (v !== 'Accepted') return { affected: 0, refused: v };
        const oldKey = saved[i][t.pk];
        if (next[i][t.pk] !== oldKey && this.referencing(t.name, oldKey).length) return { affected: 0, refused: 'Refused: other records refer to this key' };
      }
      t.rows = next;
      return { affected, refused: null };
    }
    const gone = t.rows.filter(keep);
    for (const r of gone) {
      const refs = this.referencing(t.name, r[t.pk]);
      if (refs.length) return { affected: 0, refused: `Refused: ${refs.length} record(s) in ${refs[0][0]} refer to ${r[t.pk]}` };
    }
    t.rows = t.rows.filter((r) => !keep(r));
    return { affected: gone.length, refused: null };
  }
  /** SELECT shortcut: result as arrays. */
  q(sql) {
    const r = this.run(sql);
    check(r.columns, `not a SELECT: ${sql}`);
    return r;
  }
  /** Markdown of a whole table (number and currency columns right-aligned). */
  md(name) {
    const t = this.table(name);
    const num = t.cols.flatMap(([, ty], i) => (ty === 'number' || ty === 'currency' ? [i] : []));
    return md(t.cols.map(([c]) => c), t.rows.map((r) => t.cols.map(([c]) => cell(r[c]))), num);
  }
  /** True when the columns together hold a different, non-blank combination in every row (a candidate key). */
  candidate(name, cols) {
    const t = this.table(name);
    if (t.rows.some((r) => cols.some((c) => r[c] === null))) return false;
    return new Set(t.rows.map((r) => JSON.stringify(cols.map((c) => r[c])))).size === t.rows.length;
  }
  /** Table visual spec pieces (headers, rows). */
  spec(name) {
    const t = this.table(name);
    return { headers: t.cols.map(([c]) => c), rows: t.rows.map((r) => t.cols.map(([c]) => cell(r[c]))) };
  }
  /** Design of a table (field, data type, key) as markdown rows. */
  design(name) {
    const t = this.table(name);
    return t.cols.map(([c, ty]) => [c, TYPE_LABEL[ty], c === t.pk ? 'Primary key' : t.fks[c] ? `Foreign key → ${t.fks[c]}` : '']);
  }
}

/** Result of a SELECT as markdown (an empty result is shown as one "(no rows)" line). */
export function resultMd(r) {
  if (!r.rows.length) return md(r.columns, [r.columns.map((_, i) => (i === 0 ? '(no rows)' : ''))]);
  const num = r.columns.flatMap((_, i) => (r.rows.every((x) => typeof x[i] === 'number' || x[i] === null) ? [i] : []));
  return md(r.columns, r.rows.map((x) => x.map(cell)), num);
}
/** Single value of an aggregate SELECT. */
export function scalar(r) {
  check(r.rows.length === 1 && r.rows[0].length === 1, 'scalar result');
  return r.rows[0][0];
}
/** Pins a value to a hand-checked expectation. */
export function pin(v, want, what) {
  check(JSON.stringify(v) === JSON.stringify(want), `${what}: computed ${JSON.stringify(v)}, expected ${JSON.stringify(want)}`);
  return v;
}

// ---------------------------------------------------------------- reports
/** Inner join of two tables on a column (child.col = parent primary key): merged row objects. */
export function join(db, child, col, parent) {
  const c = db.table(child);
  const p = db.table(parent);
  check(c.fks[col] === parent, `${child}.${col} is not a foreign key to ${parent}`);
  return c.rows.map((r) => {
    const m = p.rows.find((x) => x[p.pk] === r[col]);
    check(m, `join: ${r[col]} has no parent`);
    return { ...m, ...r };
  });
}
/** Groups row objects by a column (first-seen order) and sums another: [[key, total]]. */
export function groupSum(rows, by, col) {
  const m = new Map();
  for (const r of rows) m.set(r[by], (m.get(r[by]) ?? 0) + r[col]);
  const out = [...m.entries()];
  check(sum(out.map((x) => x[1])) === sum(rows.map((r) => r[col])), `groupSum ${by}/${col} total`);
  return out;
}
/** Rows of table a whose key value has no row in table b. */
export function unmatched(db, a, b, key) {
  const keys = new Set(db.table(b).rows.map((r) => r[key]));
  return db.table(a).rows.filter((r) => !keys.has(r[key]));
}

// ---------------------------------------------------------------- accounting reports
/**
 * Debtor (or creditor) balances: for each master record, opening balance (optional column) + total of
 * `inv` rows − total of `rcpt` rows (both carry the master key as a foreign key and an Amount column).
 * Returns { rows: [{ key, name, open, billed, paid, balance, limit }], total }; totals asserted
 * against the raw tables.
 */
export function balances(db, master, inv, rcpt, { nameCol, limitCol = null, openCol = null } = {}) {
  const m = db.table(master);
  const key = m.pk;
  const tot = (t, k) => sum(db.table(t).rows.filter((r) => r[key] === k).map((r) => r.Amount));
  const rows = m.rows.map((r) => {
    const billed = tot(inv, r[key]);
    const paid = tot(rcpt, r[key]);
    const open = openCol ? r[openCol] : 0;
    return { key: r[key], name: r[nameCol], open, billed, paid, balance: open + billed - paid, limit: limitCol ? r[limitCol] : null };
  });
  const total = sum(rows.map((r) => r.balance));
  check(total === sum(rows.map((r) => r.open)) + sum(db.table(inv).rows.map((r) => r.Amount)) - sum(db.table(rcpt).rows.map((r) => r.Amount)), 'balances total');
  return { rows, total };
}

/**
 * Bank reconciliation by matching references. CashBook (Ref, …, Deposit, Withdrawal) and BankStmt
 * (Ref, …, Credit, Debit) start from the same opening balance; a Ref present in both must carry the
 * same amounts. Returns both closing balances and the four groups of unmatched items, and asserts
 * cash book + not presented − not credited + bank-only credits − bank-only debits = pass book.
 */
export function reconcile(db, cb, bs, opening) {
  const c = db.table(cb).rows;
  const b = db.table(bs).rows;
  const byRef = new Map(b.map((r) => [r.Ref, r]));
  for (const r of c) {
    const m = byRef.get(r.Ref);
    if (m) check(m.Credit === r.Deposit && m.Debit === r.Withdrawal, `reconcile: ${r.Ref} amounts differ`);
  }
  const cbBal = opening + sum(c.map((r) => r.Deposit - r.Withdrawal));
  const bsBal = opening + sum(b.map((r) => r.Credit - r.Debit));
  const inCb = new Set(c.map((r) => r.Ref));
  const notPresented = c.filter((r) => !byRef.has(r.Ref) && r.Withdrawal > 0);
  const notCredited = c.filter((r) => !byRef.has(r.Ref) && r.Deposit > 0);
  const bankCr = b.filter((r) => !inCb.has(r.Ref) && r.Credit > 0);
  const bankDr = b.filter((r) => !inCb.has(r.Ref) && r.Debit > 0);
  const np = sum(notPresented.map((r) => r.Withdrawal));
  const nc = sum(notCredited.map((r) => r.Deposit));
  const bc = sum(bankCr.map((r) => r.Credit));
  const bd = sum(bankDr.map((r) => r.Debit));
  check(cbBal + np - nc + bc - bd === bsBal, `reconcile: ${cbBal} + ${np} − ${nc} + ${bc} − ${bd} ≠ ${bsBal}`);
  return { cbBal, bsBal, notPresented, notCredited, bankCr, bankDr, np, nc, bc, bd };
}
/** Bank reconciliation statement as markdown, starting from the cash book balance. */
export const brsMd = (r, date) => md(['Particulars', '₹', '₹'], brsRows(r, date), [1, 2]);
/** Rows of the bank reconciliation statement (for markdown or a table visual). */
export function brsRows(r, date) {
  const rows = [[`Balance as per cash book (bank column), ${date}`, '', fig(r.cbBal)]];
  const add = (label, items, f, sign) => {
    if (!items.length) return;
    const amt = sum(items.map(f));
    rows.push([`${label}: ${items.map((x) => `${x.Ref} ${fig(f(x))}`).join('; ')}`, `${sign}${fig(amt)}`, '']);
  };
  add('Add: cheques issued but not yet presented', r.notPresented, (x) => x.Withdrawal, '+');
  add('Add: credited by the bank, not yet in the cash book', r.bankCr, (x) => x.Credit, '+');
  add('Less: cheques deposited but not yet credited', r.notCredited, (x) => x.Deposit, '−');
  add('Less: debited by the bank, not yet in the cash book', r.bankDr, (x) => x.Debit, '−');
  rows.push([`**Balance as per pass book (bank statement), ${date}**`, '', `**${fig(r.bsBal)}**`]);
  return rows;
}

/**
 * Straight-line depreciation register for the year beginning 1 April `year`; every asset was bought
 * on a 1 April, so it has whole years of use. Per asset: depreciation for the year, accumulated
 * depreciation before the year and written-down value at the year end (each asserted).
 */
export function slmRegister(db, name, year) {
  return db.table(name).rows.map((r) => {
    check(/-04-01$/.test(r.PurchaseDate), `${r.AssetNo}: bought on 1 April`);
    const yrs = year - Number(r.PurchaseDate.slice(0, 4));
    check(yrs >= 0, `${r.AssetNo}: bought after the year`);
    const dep = (r.Cost * r.Rate) / 100;
    check(Number.isInteger(dep), `${r.AssetNo}: depreciation not whole rupees`);
    const before = dep * yrs;
    const wdv = r.Cost - before - dep;
    check(wdv >= 0 && before + dep + wdv === r.Cost, `${r.AssetNo}: written-down value`);
    return { ...r, yrs, dep, before, wdv };
  });
}

/**
 * Trial balance from a vouchers table (DrCode, CrCode, Amount; both codes foreign keys to the accounts
 * master): each account's debit and credit totals and its balance; the two columns asserted equal.
 */
export function trialBalance(db, vouchers, accounts) {
  const v = db.table(vouchers).rows;
  const a = db.table(accounts);
  const rows = a.rows.map((r) => {
    const dr = sum(v.filter((x) => x.DrCode === r[a.pk]).map((x) => x.Amount));
    const cr = sum(v.filter((x) => x.CrCode === r[a.pk]).map((x) => x.Amount));
    return { ...r, dr, cr, bal: dr - cr };
  });
  const drT = sum(rows.filter((r) => r.bal > 0).map((r) => r.bal));
  const crT = sum(rows.filter((r) => r.bal < 0).map((r) => -r.bal));
  check(drT === crT && sum(rows.map((r) => r.dr)) === sum(v.map((x) => x.Amount)) && sum(rows.map((r) => r.cr)) === sum(v.map((x) => x.Amount)), 'trial balance agrees');
  return { rows, drT, crT };
}
