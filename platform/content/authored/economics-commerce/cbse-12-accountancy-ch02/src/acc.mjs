// Accounting helpers for CBSE 12 Accountancy ch02 (change in profit-sharing ratio). Exact fractions,
// sacrificing/gaining shares, adjustment entries, journal tables, ledger accounts, capital accounts and
// balance sheets. Every helper asserts its own arithmetic (debits = credits, accounts balance, shares
// are whole rupees, sacrifices = gains) and throws on any mismatch, so a figure is never typed twice.

export function assert(ok, msg) {
  if (!ok) throw new Error(`accounting check failed: ${msg}`);
}
const gcd = (a, b) => {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a;
};
const lcm = (a, b) => (a * b) / gcd(a, b);
const isInt = (n) => Number.isInteger(n);

/** Exact fraction n/d in lowest terms (d > 0). */
export class Fr {
  constructor(n, d = 1) {
    assert(isInt(n) && isInt(d) && d !== 0, `fraction ${n}/${d}`);
    if (d < 0) [n, d] = [-n, -d];
    const g = gcd(n, d) || 1;
    this.n = n / g;
    this.d = d / g;
  }
  add(o) { o = fr(o); return new Fr(this.n * o.d + o.n * this.d, this.d * o.d); }
  sub(o) { o = fr(o); return new Fr(this.n * o.d - o.n * this.d, this.d * o.d); }
  mul(o) { o = fr(o); return new Fr(this.n * o.n, this.d * o.d); }
  div(o) { o = fr(o); return new Fr(this.n * o.d, this.d * o.n); }
  get sign() { return Math.sign(this.n); }
  abs() { return new Fr(Math.abs(this.n), this.d); }
  eq(o) { o = fr(o); return this.n === o.n && this.d === o.d; }
  /** This fraction of a whole-rupee amount; must itself be whole rupees. */
  of(amount) {
    const v = (this.n * amount) / this.d;
    assert(isInt(v), `${this} of ${amount} is not a whole number`);
    return v;
  }
  /** Written over a given denominator, e.g. 3/10 over 40 = "12/40". */
  over(L) {
    assert(L % this.d === 0, `${this} over ${L}`);
    return `${(this.n * L) / this.d}/${L}`;
  }
  toString() { return this.d === 1 ? `${this.n}` : `${this.n}/${this.d}`; }
}
export const fr = (x, d) => (x instanceof Fr ? x : new Fr(x, d ?? 1));
const fsum = (xs) => xs.reduce((s, x) => s.add(x), fr(0));

// ---------------------------------------------------------------- money
export const amt = (n) => {
  assert(isInt(n), `amount ${n} is not whole rupees`);
  return n.toLocaleString('en-IN');
};
export const inr = (n) => `₹${amt(n)}`;
export const sum = (xs) => xs.reduce((s, x) => s + x, 0);
const total = (rows) => sum(rows.map(([, a]) => a));

// ---------------------------------------------------------------- ratios
/** Shares of a ratio (integers or fractions) as fractions of 1. */
export function shares(ratio) {
  const tot = fsum(ratio.map((x) => fr(x)));
  return ratio.map((x) => fr(x).div(tot));
}
/** Fractions → smallest whole-number ratio. */
export function ratioInts(fracs) {
  const L = fracs.reduce((a, f) => lcm(a, f.d), 1);
  const ints = fracs.map((f) => (f.n * L) / f.d);
  const g = ints.reduce((a, b) => gcd(a, b));
  return ints.map((x) => x / g);
}
export const fmtRatio = (ints) => ints.join(' : ');

/**
 * Old and new shares of every partner. diff = old − new: positive = sacrifice, negative = gain.
 * Asserts that total sacrifice equals total gain.
 */
export function changes(names, oldRatio, newRatio) {
  const o = shares(oldRatio);
  const n = shares(newRatio);
  assert(names.length === o.length && o.length === n.length, 'ratio lengths');
  const L = [...o, ...n].reduce((a, f) => lcm(a, f.d), 1);
  const rows = names.map((name, i) => ({ name, old: o[i], new: n[i], diff: o[i].sub(n[i]) }));
  assert(fsum(rows.map((r) => r.diff)).n === 0, 'sacrifices equal gains');
  const sac = rows.filter((r) => r.diff.sign > 0);
  const gain = rows.filter((r) => r.diff.sign < 0);
  const nil = rows.filter((r) => r.diff.sign === 0);
  const by = Object.fromEntries(rows.map((r) => [r.name, r]));
  return {
    names, rows, L, sac, gain, nil, by,
    oldInts: ratioInts(o), newInts: ratioInts(n),
    sacRatio: sac.length ? ratioInts(sac.map((r) => r.diff)) : [],
    gainRatio: gain.length ? ratioInts(gain.map((r) => r.diff.abs())) : [],
  };
}
/** Working table: old, new, old − new over a common denominator, and the result. */
export function changeTable(ch) {
  const show = (f) => (f.d === ch.L ? `${f}` : `${f} = ${f.over(ch.L)}`);
  const rows = ch.rows.map((r) => {
    const d = r.diff;
    const res = d.sign > 0 ? `Sacrifices ${d}` : d.sign < 0 ? `Gains ${d.abs()}` : 'No change';
    return `| ${r.name} | ${show(r.old)} | ${show(r.new)} | ${d.sign < 0 ? '−' : ''}${d.abs().over(ch.L)} | ${res} |`;
  });
  return ['| Partner | Old share | New share | Old − new | Result |', '|---|---|---|---|---|', ...rows].join('\n');
}
export const changeRows = (ch) =>
  ch.rows.map((r) => [r.name, `${r.old}`, `${r.new}`, r.diff.sign > 0 ? `Sacrifices ${r.diff}` : r.diff.sign < 0 ? `Gains ${r.diff.abs()}` : 'No change']);

/** Splits a whole-rupee amount in a ratio; every share must be whole rupees. */
export function split(amount, names, ratio) {
  const s = shares(ratio);
  const out = Object.fromEntries(names.map((n, i) => [n, s[i].of(amount)]));
  assert(sum(Object.values(out)) === amount, `split of ${amount}`);
  return out;
}

/**
 * Adjustment for an amount (goodwill, or net accumulated profits/losses kept in the books):
 * each partner's (old − new) × amount; positive = credited (sacrificer), negative = debited (gainer).
 * Works for a net loss too (amount < 0 reverses the sides).
 */
export function adjust(ch, amount) {
  const by = Object.fromEntries(ch.rows.map((r) => [r.name, r.diff.of(amount)]));
  const credit = ch.rows.filter((r) => by[r.name] > 0).map((r) => [r.name, by[r.name]]);
  const debit = ch.rows.filter((r) => by[r.name] < 0).map((r) => [r.name, -by[r.name]]);
  assert(total(credit) === total(debit), `adjustment of ${amount}: debits ${total(debit)} ≠ credits ${total(credit)}`);
  return { by, credit, debit, value: total(credit) };
}

// ---------------------------------------------------------------- journal
const ROMAN = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix', 'x'];
/** One journal entry: dr/cr = [[account, amount]…]; zero lines are dropped; debits must equal credits. */
export function je(dr, cr, narr) {
  dr = dr.filter(([, a]) => a !== 0);
  cr = cr.filter(([, a]) => a !== 0);
  for (const [a, x] of [...dr, ...cr]) assert(isInt(x) && x > 0, `entry line ${a} ${x}`);
  assert(dr.length && cr.length, `empty entry: ${narr}`);
  assert(total(dr) === total(cr), `entry "${narr}": debits ${total(dr)} ≠ credits ${total(cr)}`);
  return { dr, cr, narr, total: total(dr) };
}
/** Journal entries as a markdown table (Dr/Cr columns), numbered (i), (ii)… when more than one. */
export function journal(entries) {
  const rows = ['| Particulars | Dr (₹) | Cr (₹) |', '|---|---:|---:|'];
  entries.forEach((e, i) => {
    const tag = entries.length > 1 ? `(${ROMAN[i]}) ` : '';
    e.dr.forEach(([a, x], k) => rows.push(`| ${k === 0 ? tag : ''}${a} Dr. | ${amt(x)} | |`));
    e.cr.forEach(([a, x]) => rows.push(`| To ${a} | | ${amt(x)} |`));
    rows.push(`| *(Being ${e.narr})* | | |`);
  });
  return rows.join('\n');
}
export const cap = (name) => `${name}'s Capital A/c`;
export const cur = (name) => `${name}'s Current A/c`;

// ---------------------------------------------------------------- ledger accounts
/** T-account: dr/cr rows already include any balancing line; totals must agree. */
export function tAccount(title, dr, cr) {
  assert(total(dr) === total(cr), `${title}: Dr ${total(dr)} ≠ Cr ${total(cr)}`);
  const n = Math.max(dr.length, cr.length);
  const rows = [`**Dr. — ${title} — Cr.**`, '', '| Particulars | ₹ | Particulars | ₹ |', '|---|---:|---|---:|'];
  for (let i = 0; i < n; i++) {
    const d = dr[i];
    const c = cr[i];
    rows.push(`| ${d ? `To ${d[0]}` : ''} | ${d ? amt(d[1]) : ''} | ${c ? `By ${c[0]}` : ''} | ${c ? amt(c[1]) : ''} |`);
  }
  rows.push(`| **Total** | **${amt(total(dr))}** | **Total** | **${amt(total(cr))}** |`);
  return { md: rows.join('\n'), total: total(dr) };
}

/**
 * Revaluation account. losses (Dr) and gains (Cr) as [[label, amount]]; the net is shared in the
 * old ratio. Returns the account, the net (+ gain / − loss) and each partner's share.
 */
export function revaluation(names, oldRatio, losses, gains) {
  const net = total(gains) - total(losses);
  assert(net !== 0, 'revaluation with no net effect');
  const sp = split(Math.abs(net), names, oldRatio);
  const word = net > 0 ? 'Gain' : 'Loss';
  const tr = names.map((n) => [`${cap(n)} (${word.toLowerCase()})`, sp[n]]);
  const acct = net > 0 ? tAccount('Revaluation Account', [...losses, ...tr], gains) : tAccount('Revaluation Account', losses, [...gains, ...tr]);
  const entry = net > 0 ? je([['Revaluation A/c', net]], names.map((n) => [cap(n), sp[n]]), `revaluation gain shared by ${names.join(", ")} in the old ratio ${fmtRatio(oldRatio)}`) : je(names.map((n) => [cap(n), sp[n]]), [['Revaluation A/c', -net]], `revaluation loss borne by ${names.join(", ")} in the old ratio ${fmtRatio(oldRatio)}`);
  return { net, split: sp, md: acct.md, total: acct.total, entry };
}

/**
 * Partners' capital accounts (columnar). cr/dr = [[label, {name: amount}]]; the closing balance of
 * each partner (Balance c/d) is computed and each partner's column must balance.
 */
export function capitalAccounts(names, cr, dr) {
  const val = (row, n) => row[1][n] ?? 0;
  const closing = Object.fromEntries(names.map((n) => [n, sum(cr.map((r) => val(r, n))) - sum(dr.map((r) => val(r, n)))]));
  for (const n of names) assert(closing[n] >= 0, `${n}'s capital is overdrawn (${closing[n]})`);
  const drAll = [...dr, ['Balance c/d', closing]];
  const tot = Object.fromEntries(names.map((n) => [n, sum(cr.map((r) => val(r, n)))]));
  for (const n of names) assert(sum(drAll.map((r) => val(r, n))) === tot[n], `${n}'s capital account does not balance`);
  const cell = (r, n) => (r && val(r, n) ? amt(val(r, n)) : r ? '—' : '');
  const head = `| Particulars | ${names.map((n) => `${n} (₹)`).join(' | ')} | Particulars | ${names.map((n) => `${n} (₹)`).join(' | ')} |`;
  const sep = `|---|${names.map(() => '---:').join('|')}|---|${names.map(() => '---:').join('|')}|`;
  const rows = ["**Dr. — Partners' Capital Accounts — Cr.**", '', head, sep];
  const k = Math.max(drAll.length, cr.length);
  for (let i = 0; i < k; i++) {
    const d = drAll[i];
    const c = cr[i];
    rows.push(`| ${d ? `To ${d[0]}` : ''} | ${names.map((n) => cell(d, n)).join(' | ')} | ${c ? `By ${c[0]}` : ''} | ${names.map((n) => cell(c, n)).join(' | ')} |`);
  }
  rows.push(`| **Total** | ${names.map((n) => `**${amt(tot[n])}**`).join(' | ')} | **Total** | ${names.map((n) => `**${amt(tot[n])}**`).join(' | ')} |`);
  return { md: rows.join('\n'), closing };
}

/** Balance sheet: liabilities and assets as [[label, amount]]; the two sides must agree. */
export function balanceSheet(title, liab, assets) {
  assert(total(liab) === total(assets), `${title}: liabilities ${total(liab)} ≠ assets ${total(assets)}`);
  const n = Math.max(liab.length, assets.length);
  const rows = [`**${title}**`, '', '| Liabilities | ₹ | Assets | ₹ |', '|---|---:|---|---:|'];
  for (let i = 0; i < n; i++) {
    const l = liab[i];
    const a = assets[i];
    rows.push(`| ${l ? l[0] : ''} | ${l ? amt(l[1]) : ''} | ${a ? a[0] : ''} | ${a ? amt(a[1]) : ''} |`);
  }
  rows.push(`| **Total** | **${amt(total(liab))}** | **Total** | **${amt(total(assets))}** |`);
  return { md: rows.join('\n'), total: total(liab) };
}

/** Workmen compensation reserve on a change in ratio: claim met first, excess to partners or shortfall to revaluation. */
export function wcr(reserve, claim) {
  const toPartners = Math.max(reserve - claim, 0);
  const toReval = Math.max(claim - reserve, 0);
  assert(reserve + toReval === claim + toPartners, 'WCR identity');
  return { reserve, claim, toPartners, toReval };
}
/** Investment fluctuation reserve: a fall in market value is met from the reserve first. */
export function ifr(reserve, book, market) {
  const fall = Math.max(book - market, 0);
  const rise = Math.max(market - book, 0);
  const toPartners = Math.max(reserve - fall, 0);
  const toReval = Math.max(fall - reserve, 0);
  assert(reserve + toReval === fall + toPartners, 'IFR identity');
  return { reserve, book, market, fall, rise, toPartners, toReval };
}
