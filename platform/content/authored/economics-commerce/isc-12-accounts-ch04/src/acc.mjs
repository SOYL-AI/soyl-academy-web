// Accounting helpers for isc-12-accounts-ch04 (Reconstitution of Partnership: Retirement and Death of a Partner).
// Base helpers (fractions, journal, To / By ledger, Revaluation Account, columnar capital accounts, horizontal
// balance sheet, number words) adapted from isc-12-accounts-ch03 (same author); new here: new and gaining
// ratios on retirement or death (a continuing partner may also sacrifice), goodwill adjusted through the
// gaining partners, hidden goodwill from an agreed settlement, profit till death (time and turnover bases),
// a dated loan account (interest accrued and due, or accrued but not due at the year end), capital
// adjustment of the continuing partners, and a full retirement/death solver.
// Every figure the chapter quotes is computed here from the givens and checked: ratios add up to one,
// every share divides exactly into whole rupees, journal entries balance, ledger accounts and balance
// sheets total, loans are repaid in full and the bank balance never goes negative. Any mismatch throws,
// so the build stops. Tables are built from the computed values (Indian digit grouping), never typed by hand.

export function fail(msg) {
  throw new Error(`acc: ${msg}`);
}
export function check(ok, what) {
  if (!ok) fail(what);
}

/** Indian digit grouping (1,20,000); whole rupees only. */
export const inr = (n) => {
  check(Number.isInteger(n), `not a whole number of rupees: ${n}`);
  return n.toLocaleString('en-IN');
};
export const rs = (n) => `₹${inr(n)}`;
export const sum = (xs) => xs.reduce((a, b) => a + b, 0);

// ---------------------------------------------------------------- fractions and ratios
const gcd = (a, b) => {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a;
};
const lcm = (a, b) => (a / gcd(a, b)) * b;

export class F {
  constructor(n, d = 1) {
    check(Number.isInteger(n) && Number.isInteger(d) && d !== 0, `bad fraction ${n}/${d}`);
    if (d < 0) [n, d] = [-n, -d];
    const g = gcd(n, d) || 1;
    this.n = n / g;
    this.d = d / g;
  }
  add(o) { return new F(this.n * o.d + o.n * this.d, this.d * o.d); }
  sub(o) { return new F(this.n * o.d - o.n * this.d, this.d * o.d); }
  mul(o) { return typeof o === 'number' ? new F(this.n * o, this.d) : new F(this.n * o.n, this.d * o.d); }
  div(o) { return typeof o === 'number' ? new F(this.n, this.d * o) : new F(this.n * o.d, this.d * o.n); }
  abs() { return new F(Math.abs(this.n), this.d); }
  eq(o) { return this.n === o.n && this.d === o.d; }
  get zero() { return this.n === 0; }
  get sign() { return Math.sign(this.n); }
  get value() { return this.n / this.d; }
  /** Markdown text: 3/10, or 1 for a whole. */
  toString() { return this.d === 1 ? String(this.n) : `${this.n}/${this.d}`; }
  /** Written over a given denominator, e.g. 3/10 over 40 = "12/40". */
  over(L) {
    check(L % this.d === 0, `${this} over ${L}`);
    return `${(this.n * L) / this.d}/${L}`;
  }
  /** Whole-rupee share of an amount; throws if it does not divide exactly. */
  of(amount) {
    check((amount * this.n) % this.d === 0, `${this} of ${amount} is not a whole number`);
    return (amount * this.n) / this.d;
  }
}
export const fr = (n, d = 1) => new F(n, d);
export const sumF = (list) => list.reduce((a, b) => a.add(b), fr(0));

/** Smallest whole-number ratio of a list of fractions (zeros allowed). */
export function ratioInts(fracs) {
  const L = fracs.reduce((a, f) => lcm(a, f.d), 1);
  const ints = fracs.map((f) => (f.n * L) / f.d);
  const g = ints.reduce((a, b) => gcd(a, b), 0) || 1;
  return ints.map((x) => x / g);
}
export const ratioStr = (ints) => ints.join(' : ');

/** Shares from a ratio of whole numbers, e.g. [3, 2] → {A: 3/5, B: 2/5}. */
export function shares(names, ints) {
  const t = sum(ints);
  return Object.fromEntries(names.map((n, i) => [n, fr(ints[i], t)]));
}

/** Splits an amount in a ratio of whole numbers; every part must be whole and the parts must add up. */
export function splitRatio(amount, names, ints) {
  const t = sum(ints);
  const out = {};
  names.forEach((n, i) => {
    check((amount * ints[i]) % t === 0, `${amount} in ratio ${ints.join(':')} is not whole for ${n}`);
    out[n] = (amount * ints[i]) / t;
  });
  check(sum(Object.values(out)) === amount, `split of ${amount} does not add up`);
  return out;
}
/** Splits an amount by shares { name: F } (old ratio); parts must be whole and add up. */
export function splitShares(amount, sh) {
  const out = Object.fromEntries(Object.keys(sh).map((n) => [n, sh[n].of(amount)]));
  check(sum(Object.values(out)) === amount, `split of ${amount} by shares does not add up`);
  return out;
}

// ---------------------------------------------------------------- ratios on retirement or death
/**
 * New ratio and gaining ratio when `out` leaves the firm (retires or dies). old: { name: F } adding to 1.
 * how:
 *   {}                       continuing partners carry on in their old ratio (nothing agreed)
 *   { newRatio: [ints] }     the new ratio of the continuing partners (order of `old`, outgoing partner skipped)
 *   { take: { name: F } }    each continuing partner acquires this fraction of the firm's profit from the outgoing partner
 *   { inRatio: [ints] }      the outgoing share is taken by the continuing partners in this ratio
 * gain = new share − old share; a continuing partner may lose (sacrifice) only with opts.allowSacrifice.
 * Gains less sacrifices of the continuing partners must equal the outgoing share.
 */
export function retire(old, out, how = {}, opts = {}) {
  const all = Object.keys(old);
  check(all.includes(out), `${out} is not a partner`);
  check(sumF(Object.values(old)).eq(fr(1)), 'old shares do not add to 1');
  const names = all.filter((n) => n !== out);
  const outShare = old[out];
  const nw = {};
  if (how.newRatio) {
    check(how.newRatio.length === names.length, 'newRatio length');
    const t = sum(how.newRatio);
    names.forEach((n, i) => (nw[n] = fr(how.newRatio[i], t)));
  } else if (how.take) {
    names.forEach((n) => (nw[n] = old[n].add(how.take[n] ?? fr(0))));
  } else if (how.inRatio) {
    const t = sum(how.inRatio);
    names.forEach((n, i) => (nw[n] = old[n].add(outShare.mul(fr(how.inRatio[i], t)))));
  } else {
    const rem = sumF(names.map((n) => old[n]));
    names.forEach((n) => (nw[n] = old[n].div(rem)));
  }
  check(sumF(names.map((n) => nw[n])).eq(fr(1)), 'new shares do not add to 1');
  for (const n of names) check(nw[n].n > 0, `${n} has no share in the new firm`);
  const gain = Object.fromEntries(names.map((n) => [n, nw[n].sub(old[n])]));
  check(sumF(Object.values(gain)).eq(outShare), "gains less sacrifices differ from the outgoing partner's share");
  const gainers = names.filter((n) => gain[n].sign > 0);
  const sacrificers = names.filter((n) => gain[n].sign < 0);
  if (!opts.allowSacrifice) check(!sacrificers.length, `${sacrificers.join(', ')} sacrifices on ${out}'s exit`);
  const R = {
    all,
    names,
    out,
    old,
    outShare,
    newShares: nw,
    gain,
    gainers,
    sacrificers,
    oldInts: ratioInts(all.map((n) => old[n])),
    contOldInts: ratioInts(names.map((n) => old[n])),
    newInts: ratioInts(names.map((n) => nw[n])),
    gainInts: ratioInts(gainers.map((n) => gain[n])),
  };
  /**
   * Goodwill adjustment (Accounting Standard 26, no goodwill account): each gaining partner is debited
   * with gain × value; the outgoing partner (outShare × value) and any continuing partner who
   * sacrifices (sacrifice × value) are credited. `pairs` allocates every debit over the credits so the
   * columnar capital accounts can show who pays whom; every allocation must be a whole rupee.
   */
  R.goodwill = (value) => {
    const dr = Object.fromEntries(gainers.map((n) => [n, gain[n].of(value)]));
    const cr = { [out]: outShare.of(value), ...Object.fromEntries(sacrificers.map((n) => [n, gain[n].abs().of(value)])) };
    const total = sum(Object.values(cr));
    check(sum(Object.values(dr)) === total, 'goodwill debits differ from credits');
    const pairs = [];
    for (const g of gainers)
      for (const c of Object.keys(cr)) {
        check((dr[g] * cr[c]) % total === 0, `goodwill allocation ${g} to ${c} is not whole`);
        pairs.push([g, c, (dr[g] * cr[c]) / total]);
      }
    return { value, dr, cr, total, pairs };
  };
  return R;
}

// ---------------------------------------------------------------- profit till death
/** Time basis: base profit (last year's or an average) × months / 12 × share. */
export function timeBasis({ profit, months, share }) {
  const period = fr(months, 12).of(profit);
  return { period, share: share.of(period) };
}
/** Average profit of a list of years (whole rupees). */
export function average(profits) {
  const avg = sum(profits) / profits.length;
  check(Number.isInteger(avg), `average of ${profits} is not whole`);
  return avg;
}
/** Turnover basis: rate = last year's profit ÷ last year's sales; profit = sales till death × rate; × share. */
export function turnoverBasis({ profit, sales, salesTill, share }) {
  const rate = fr(profit, sales);
  const pct = rate.mul(100);
  check(pct.d === 1, `rate of profit ${pct} per cent is not a whole percentage`);
  const period = rate.of(salesTill);
  return { rate, pct: pct.n, period, share: share.of(period) };
}

// ---------------------------------------------------------------- tables
/** Markdown table; `num` = indexes of right-aligned (amount) columns. */
export function mdTable(headers, rows, num = []) {
  const line = (cells) => `| ${cells.join(' | ')} |`;
  const sep = headers.map((_, i) => (num.includes(i) ? '--:' : '---'));
  return [line(headers), line(sep), ...rows.map(line)].join('\n');
}
const amt = (x) => (x === undefined || x === null || x === 0 ? '' : inr(x));
const roman = (i) => ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix', 'x', 'xi', 'xii'][i - 1];
const to = (l) => (l ? `To ${l}` : '');
const by = (l) => (l ? `By ${l}` : '');

/**
 * Journal: entries = [{ dr: [[account, amount]], cr: [[account, amount]], nar }]. Zero lines are
 * dropped; every entry must balance. Returns { headers, rows, md, entries }.
 */
export function journal(entries) {
  const rows = [];
  const clean = entries.map((e, i) => {
    const dr = e.dr.filter(([, x]) => x !== 0);
    const cr = e.cr.filter(([, x]) => x !== 0);
    const d = sum(dr.map(([, x]) => x));
    const c = sum(cr.map(([, x]) => x));
    check(d === c && d > 0, `journal entry ${i + 1} does not balance (${d} vs ${c}): ${e.nar}`);
    for (const [, x] of [...dr, ...cr]) check(x > 0, `journal entry ${i + 1}: negative amount`);
    dr.forEach(([a, x], k) => rows.push([`${k === 0 && entries.length > 1 ? `(${roman(i + 1)}) ` : ''}${a} Dr.`, inr(x), '']));
    cr.forEach(([a, x]) => rows.push([`To ${a}`, '', inr(x)]));
    rows.push([`*(Being ${e.nar})*`, '', '']);
    return { dr, cr, total: d, nar: e.nar };
  });
  const headers = ['Particulars', 'Dr (₹)', 'Cr (₹)'];
  return { headers, rows, entries: clean, md: mdTable(headers, rows, [1, 2]) };
}

/** Two-sided ledger account (To / By); the two sides must total the same. */
export function tAccount(dr, cr) {
  dr = dr.filter(([, x]) => x !== 0);
  cr = cr.filter(([, x]) => x !== 0);
  const td = sum(dr.map(([, x]) => x));
  const tc = sum(cr.map(([, x]) => x));
  check(td === tc, `account does not balance (${td} vs ${tc})`);
  const n = Math.max(dr.length, cr.length);
  const rows = [];
  for (let i = 0; i < n; i++) rows.push([to(dr[i]?.[0]), amt(dr[i]?.[1]), by(cr[i]?.[0]), amt(cr[i]?.[1])]);
  rows.push(['**Total**', `**${inr(td)}**`, '**Total**', `**${inr(tc)}**`]);
  const headers = ['Dr. Particulars', '₹', 'Cr. Particulars', '₹'];
  return { headers, rows, total: td, md: mdTable(headers, rows, [1, 3]) };
}

/**
 * Revaluation account: items = [[label, gain (+) or loss (−)]]; the net result is shared by ALL the
 * partners, the outgoing one included, in their old ratio (oldShares = { name: F }).
 */
export function revaluation(items, oldShares) {
  const net = sum(items.map(([, x]) => x));
  check(net !== 0, 'revaluation with no net result');
  const names = Object.keys(oldShares);
  const parts = splitShares(Math.abs(net), oldShares);
  const dr = items.filter(([, x]) => x < 0).map(([l, x]) => [l, -x]);
  const cr = items.filter(([, x]) => x > 0);
  if (net > 0) dr.push(...names.map((n) => [`${n}'s Capital A/c (profit)`, parts[n]]));
  if (net < 0) cr.push(...names.map((n) => [`${n}'s Capital A/c (loss)`, parts[n]]));
  const acc = tAccount(dr, cr);
  return { net, parts, ...acc };
}

/**
 * Partners' capital accounts in columnar form. dr / cr = [[particulars, { name: amount }]].
 * The closing balance of each partner (credits − debits) must not be negative; it is shown as `Balance c/d`
 * (an outgoing partner's column closes at nil).
 */
export function capitalAccounts(names, dr, cr, closeLabel = 'Balance c/d') {
  const tot = (side) => Object.fromEntries(names.map((n) => [n, sum(side.map(([, m]) => m[n] ?? 0))]));
  const td = tot(dr);
  const tc = tot(cr);
  const closing = Object.fromEntries(names.map((n) => [n, tc[n] - td[n]]));
  for (const n of names) check(closing[n] >= 0, `${n}'s capital account shows a debit balance (${closing[n]})`);
  const drAll = dr.filter(([, m]) => names.some((n) => m[n]));
  const crAll = cr.filter(([, m]) => names.some((n) => m[n]));
  if (names.some((n) => closing[n])) {
    while (drAll.length + 1 < crAll.length) drAll.push(['', {}]); // closing balance on the last line
    drAll.push([closeLabel, closing]);
  }
  for (const n of names) check(sum(drAll.map(([, m]) => m[n] ?? 0)) === tc[n], `capital account of ${n} does not balance`);
  const k = Math.max(drAll.length, crAll.length);
  const rows = [];
  for (let i = 0; i < k; i++) {
    const a = drAll[i];
    const b = crAll[i];
    rows.push([to(a?.[0]), ...names.map((n) => amt(a?.[1][n])), by(b?.[0]), ...names.map((n) => amt(b?.[1][n]))]);
  }
  rows.push(['**Total**', ...names.map((n) => `**${inr(tc[n])}**`), '**Total**', ...names.map((n) => `**${inr(tc[n])}**`)]);
  const headers = ['Dr. Particulars', ...names.map((n) => `${n} (₹)`), 'Cr. Particulars', ...names.map((n) => `${n} (₹)`)];
  const num = [...names.map((_, i) => i + 1), ...names.map((_, i) => i + names.length + 2)];
  return { closing, headers, rows, md: mdTable(headers, rows, num) };
}

/** Balance sheet in horizontal form: liabilities and assets = [[label, amount]]; the totals must agree. */
export function balanceSheet(liabs, assets) {
  liabs = liabs.filter(([, x]) => x !== 0);
  assets = assets.filter(([, x]) => x !== 0);
  for (const [l, x] of [...liabs, ...assets]) check(x > 0, `balance sheet line ${l} is ${x}`);
  const tl = sum(liabs.map(([, x]) => x));
  const ta = sum(assets.map(([, x]) => x));
  check(tl === ta, `balance sheet does not balance (${tl} vs ${ta})`);
  const n = Math.max(liabs.length, assets.length);
  const rows = [];
  for (let i = 0; i < n; i++) rows.push([liabs[i]?.[0] ?? '', amt(liabs[i]?.[1]), assets[i]?.[0] ?? '', amt(assets[i]?.[1])]);
  rows.push(['**Total**', `**${inr(tl)}**`, '**Total**', `**${inr(ta)}**`]);
  const headers = ['Liabilities', '₹', 'Assets', '₹'];
  return { total: tl, headers, rows, md: mdTable(headers, rows, [1, 3]) };
}

// ---------------------------------------------------------------- dated loan account
const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const idx = ({ y, m }) => y * 12 + (m - 1);
const ym = (i) => ({ y: Math.floor(i / 12), m: (i % 12) + 1 });
/** Last day of a month: { y: 2027, m: 3 } → "31 Mar 2027". */
export const endOf = (d) => `${DAYS[d.m - 1]} ${MON[d.m - 1]} ${d.y}`;
const firstOfNext = (d) => {
  const n = ym(idx(d) + 1);
  return `1 ${MON[n.m - 1]} ${n.y}`;
};

/**
 * Loan of an outgoing partner (or an executor) repaid in n equal yearly instalments of principal, each
 * paid with the interest due on the outstanding principal, the first one year after `start` (the last
 * day of a month). Books close on 31 March. Interest is credited to the loan account when it falls due
 * (with the instalment) and, at a year end that falls between two instalments, for the months already
 * run ("accrued but not due"); that accrued interest stays in the balance carried down and is paid with
 * the next instalment. Every year's account must balance, every amount must be whole, and the loan
 * must be repaid in full. Returns the dated ledger, the payments and the year-end balances.
 */
export function loanAccount({ principal, rate, start, n, firstLabel }) {
  const inst = principal / n;
  check(Number.isInteger(inst), `instalment ${principal} / ${n} is not whole`);
  const s = idx(start);
  const last = s + 12 * n;
  let bal = principal;
  let accrued = 0;
  let t = s;
  const years = [];
  const payments = [];
  let cur = { dr: [], cr: [[endOf(start), firstLabel, principal]] };
  const close = (d) => {
    const td = sum(cur.dr.map((r) => r[2]));
    const tc = sum(cur.cr.map((r) => r[2]));
    check(td === tc, `loan account for the year to ${endOf(d)} does not balance (${td} vs ${tc})`);
    years.push({ end: endOf(d), ...cur, total: td, closing: bal + accrued });
  };
  for (let i = s + 1; i <= last; i++) {
    const d = ym(i);
    const isPay = (i - s) % 12 === 0;
    const isEnd = d.m === 3;
    if (!isPay && !isEnd) continue;
    const months = i - t;
    check((bal * rate * months) % 1200 === 0, `interest on ${bal} at ${rate}% for ${months} months is not whole`);
    const interest = (bal * rate * months) / 1200;
    if (interest) cur.cr.push([endOf(d), 'Interest A/c', interest]);
    accrued += interest;
    t = i;
    if (isPay) {
      const pay = inst + accrued;
      cur.dr.push([endOf(d), 'Bank A/c', pay]);
      payments.push({ date: endOf(d), inst, interest: accrued, pay });
      bal -= inst;
      accrued = 0;
    }
    if (isEnd || i === last) {
      const carry = bal + accrued;
      if (carry) cur.dr.push([endOf(d), 'Balance c/d', carry]);
      close(d);
      if (carry) cur = { dr: [], cr: [[firstOfNext(d), 'Balance b/d', carry]] };
    }
  }
  check(bal === 0 && accrued === 0, 'loan not fully repaid');
  check(sum(payments.map((p) => p.inst)) === principal, 'instalments do not add up to the loan');
  const rows = [];
  for (const y of years) {
    const k = Math.max(y.dr.length, y.cr.length);
    for (let i = 0; i < k; i++) {
      const a = y.dr[i];
      const b = y.cr[i];
      rows.push([a?.[0] ?? '', to(a?.[1]), amt(a?.[2]), b?.[0] ?? '', by(b?.[1]), amt(b?.[2])]);
    }
    rows.push(['', '**Total**', `**${inr(y.total)}**`, '', '**Total**', `**${inr(y.total)}**`]);
  }
  const headers = ['Date', 'Dr. Particulars', '₹', 'Date', 'Cr. Particulars', '₹'];
  return { inst, years, payments, headers, rows, md: mdTable(headers, rows, [2, 5]) };
}

// ---------------------------------------------------------------- full retirement or death
/**
 * Solves a complete retirement (or death) from the old balance sheet and the terms.
 * s = {
 *   old: { name: F }, out, how (see retire), allowSacrifice?, death? (true for a deceased partner),
 *   liabs: [[label, amount, tag?]], assets: [[label, amount, tag?]]. Tags:
 *     { cap: name }                 a partner's capital
 *     { reserve: true }             reserve or credit balance of profit and loss, shared by all partners in the old ratio
 *     { wcr: claim }                workmen compensation reserve and the claim against it
 *     { ifr: fall, inv: label }     investment fluctuation reserve and the fall in the investments
 *     { loss: true }                accumulated loss or deferred revenue expenditure on the assets side
 *     { goodwill: true }            goodwill already in the books, written off among all partners in the old ratio
 *     { bank: true }                the bank (or cash) line
 *   reval: [[revaluation label, 'A' | 'L', balance-sheet label, change, newLabel?]]
 *     change in balance-sheet terms (asset up +, liability up +); a missing line is created;
 *     newLabel(oldAmount, change) renames the line in the new balance sheet (e.g. provision shown).
 *   goodwill: { value } or { settle: amount } (hidden goodwill: the amount agreed in full settlement).
 *   profit: { amount, label } share of profit till death credited through Profit and Loss Suspense A/c.
 *   pay: cash paid to the outgoing partner (or the executor) now; 'all' pays everything; the rest becomes
 *        the outgoing partner's loan (or the executor's loan).
 *   adjust: { total } continuing capitals made up to `total` in the new ratio, in cash;
 *           { payOut: minBank } continuing partners bring in just enough cash to pay the outgoing partner
 *           in full and leave `minBank` in the bank, with their capitals in the new ratio.
 * }
 */
export function solveRetirement(s) {
  const R = retire(s.old, s.out, s.how ?? {}, { allowSacrifice: s.allowSacrifice });
  const { all, names, out } = R;
  const L = s.liabs.map(([l, x, t]) => ({ l, x, t: t ?? {} }));
  const A = s.assets.map(([l, x, t]) => ({ l, x, t: t ?? {} }));
  const find = (list, l) => list.find((r) => r.l === l);
  const oldBS = balanceSheet(L.map((r) => [r.l, r.x]), A.map((r) => [r.l, r.x]));
  const capB = Object.fromEntries(all.map((n) => [n, L.find((r) => r.t.cap === n)?.x]));
  for (const n of all) check(Number.isInteger(capB[n]), `no capital line for ${n}`);

  const items = [];
  const notes = [];
  const ac = (l) => (/ A\/c$/.test(l) ? l : `${l} A/c`);
  const oldSplit = (x) => all.map((n) => `${n} ${rs(s.old[n].of(x))}`).join(', ');
  for (const [rl, side, bl, ch, rename] of s.reval ?? []) {
    const list = side === 'A' ? A : L;
    let row = find(list, bl);
    if (!row) {
      check(ch > 0, `new line ${bl} must be positive`);
      row = { l: bl, x: 0, t: {} };
      list.splice(side === 'L' ? list.findIndex((r) => r.t.cap) : list.length, 0, row);
    }
    const before = row.x;
    row.x += ch;
    check(row.x >= 0, `${bl} becomes negative`);
    if (rename) row.l = rename(before, ch);
    items.push([rl, side === 'A' ? ch : -ch]);
  }
  const crRes = [];
  const drRes = [];
  for (const r of [...L]) {
    if (r.t.reserve) {
      crRes.push([ac(r.l), r.x]);
      L.splice(L.indexOf(r), 1);
    } else if (r.t.wcr !== undefined) {
      const claim = r.t.wcr;
      if (claim > 0) L.splice(L.indexOf(r), 0, { l: 'Workmen Compensation Claim', x: claim, t: {} });
      if (claim < r.x) crRes.push([ac(r.l), r.x - claim, true]);
      else if (claim > r.x) items.push(['Workmen Compensation Claim A/c (excess over the reserve)', -(claim - r.x)]);
      notes.push(`${r.l} ${rs(r.x)} against a claim of ${rs(claim)}: ${claim <= r.x ? `the claim is recorded as a liability and the balance ${rs(r.x - claim)} is shared by all the partners in the old ratio (${oldSplit(r.x - claim)})` : `the reserve is used up and the excess claim ${rs(claim - r.x)} is a revaluation loss`}.`);
      L.splice(L.indexOf(r), 1);
    } else if (r.t.ifr !== undefined) {
      const fall = r.t.ifr;
      const inv = find(A, r.t.inv);
      check(inv, `no investments line ${r.t.inv}`);
      inv.x -= fall;
      if (fall < r.x) crRes.push([ac(r.l), r.x - fall, true]);
      else if (fall > r.x) items.push(['Investments A/c (fall beyond the reserve)', -(fall - r.x)]);
      notes.push(`${r.l} ${rs(r.x)}; investments fall by ${rs(fall)} to ${rs(inv.x)}: ${fall <= r.x ? `the reserve absorbs the fall and the balance ${rs(r.x - fall)} goes to all the partners in the old ratio (${oldSplit(r.x - fall)})` : `the reserve is used up and the excess fall ${rs(fall - r.x)} is a revaluation loss`}.`);
      L.splice(L.indexOf(r), 1);
    }
  }
  for (const r of [...A]) {
    if (r.t.loss) {
      drRes.push([ac(r.l.replace(/ \(debit balance\)$/, '')), r.x]);
      A.splice(A.indexOf(r), 1);
    } else if (r.t.goodwill) {
      drRes.push(['Goodwill A/c (written off)', r.x]);
      A.splice(A.indexOf(r), 1);
    }
  }
  const reval = items.length ? revaluation(items, s.old) : null;

  // Capital account lines for every partner.
  const per = (m) => Object.fromEntries(all.map((n) => [n, m[n] ?? 0]));
  const cr = [['Balance b/d', per(capB)]];
  const dr = [];
  if (reval && reval.net > 0) cr.push(['Revaluation A/c (profit)', per(reval.parts)]);
  if (reval && reval.net < 0) dr.push(['Revaluation A/c (loss)', per(reval.parts)]);
  for (const [l, x] of crRes) cr.push([l, per(splitShares(x, s.old))]);
  for (const [l, x] of drRes) dr.push([l, per(splitShares(x, s.old))]);
  let profit = null;
  if (s.profit) {
    check(s.death, 'profit till death needs a deceased partner');
    profit = s.profit;
    cr.push(['Profit and Loss Suspense A/c', { [out]: profit.amount }]);
  }
  const bal = (n) => sum(cr.map(([, m]) => m[n] ?? 0)) - sum(dr.map(([, m]) => m[n] ?? 0));
  const before = bal(out);

  // Goodwill (stated value, or hidden in the amount agreed for the settlement).
  let gw = null;
  let hidden = null;
  if (s.goodwill?.settle !== undefined) {
    const share = s.goodwill.settle - before;
    check(share > 0, `no hidden goodwill (${share})`);
    check(!R.sacrificers.length, 'hidden goodwill with a sacrificing continuing partner is not supported');
    const value = fr(share).div(R.outShare).of(1);
    hidden = { settle: s.goodwill.settle, before, share, value };
    gw = R.goodwill(value);
    check(gw.cr[out] === share, 'hidden goodwill share');
  } else if (s.goodwill) gw = R.goodwill(s.goodwill.value);
  if (gw) {
    for (const [g, c, x] of gw.pairs) {
      dr.push([`${c}'s Capital A/c`, { [g]: x }]);
      cr.push([`${g}'s Capital A/c`, { [c]: x }]);
    }
  }
  const due = bal(out);
  check(due > 0, `nothing is due to ${out}`);
  if (hidden) check(due === hidden.settle, 'settlement differs from the amount due');

  // Payment to the outgoing partner (or transfer to the executor).
  const bank = A.find((r) => r.t.bank);
  check(bank, 'no bank line');
  const bank0 = bank.x;
  const cash = s.pay === 'all' ? due : s.pay ?? 0;
  check(cash >= 0 && cash <= due, 'cash paid exceeds the amount due');
  const loan = due - cash;
  const loanLabel = s.death ? `${out}'s Executor's Loan` : `${out}'s Loan`;
  let exec = null;
  if (s.death) {
    dr.push([`${out}'s Executor's A/c`, { [out]: due }]);
    exec = tAccount([['Bank A/c', cash], [`${loanLabel} A/c`, loan]], [[`${out}'s Capital A/c`, due]]);
  } else {
    if (cash) dr.push(['Bank A/c', { [out]: cash }]);
    if (loan) dr.push([`${loanLabel} A/c`, { [out]: loan }]);
  }

  // Capital adjustment of the continuing partners.
  let adj = null;
  if (s.adjust) {
    const current = Object.fromEntries(names.map((n) => [n, bal(n)]));
    let total;
    let needed = null;
    if (s.adjust.total !== undefined) total = s.adjust.total;
    else {
      needed = cash + s.adjust.payOut - bank0;
      check(needed > 0, 'no cash needs to be brought in');
      total = sum(Object.values(current)) + needed;
    }
    const required = Object.fromEntries(names.map((n) => [n, R.newShares[n].of(total)]));
    const diff = Object.fromEntries(names.map((n) => [n, required[n] - current[n]]));
    if (needed !== null) {
      for (const n of names) check(diff[n] >= 0, `${n} would withdraw while cash is being brought in`);
      check(sum(Object.values(diff)) === needed, 'cash brought differs from the cash needed');
    }
    adj = { total, needed, current, required, diff };
    for (const n of names) {
      if (diff[n] > 0) cr.push(['Bank A/c', { [n]: diff[n] }]);
      if (diff[n] < 0) dr.push(['Bank A/c', { [n]: -diff[n] }]);
    }
  }
  const merge = (side) => {
    const m = new Map();
    for (const [l, v] of side) {
      const c = m.get(l) ?? {};
      for (const [n, x] of Object.entries(v)) c[n] = (c[n] ?? 0) + x;
      m.set(l, c);
    }
    return [...m.entries()];
  };
  const caps = capitalAccounts(all, merge(dr), merge(cr));
  check(caps.closing[out] === 0, `${out}'s account is not closed`);
  if (adj) for (const n of names) check(caps.closing[n] === adj.required[n], `${n}'s capital not adjusted to ${adj.required[n]}`);

  // Bank and the new balance sheet (horizontal form).
  bank.x = bank0 - cash + (adj ? sum(Object.values(adj.diff)) : 0);
  check(bank.x >= 0, `bank overdrawn (${bank.x})`);
  if (adj && adj.needed !== null) check(bank.x === s.adjust.payOut, 'minimum bank balance not reached');
  const assets = A.map((r) => [r.l, r.x]);
  if (profit) assets.push(['Profit and Loss Suspense A/c', profit.amount]);
  const nonCap = L.filter((r) => !r.t.cap);
  const newBS = balanceSheet(
    [...nonCap.map((r) => [r.l, r.x]), [loanLabel, loan], ...names.map((n) => [`${n}'s Capital`, caps.closing[n]])],
    assets,
  );
  return { s, R, oldBS, bank0, reval, items, crRes, drRes, notes, profit, before, gw, hidden, due, cash, loan, loanLabel, exec, adj, caps, bank: bank.x, newBS };
}

// ---------------------------------------------------------------- working notes
/** Working-note lines for the new ratio and the gaining ratio on retirement or death. */
export function ratioNotes(R, how = {}) {
  const { names, out, old, newShares, gain } = R;
  const lines = [];
  if (how.newRatio) lines.push(`New ratio (${names.join(' : ')}) as agreed = **${ratioStr(R.newInts)}**.`);
  else if (how.take) lines.push(`New shares: ${names.map((n) => `${n} ${old[n]} + ${how.take[n] ?? 0} = ${newShares[n]}`).join('; ')}; new ratio (${names.join(' : ')}) = **${ratioStr(R.newInts)}**.`);
  else if (how.inRatio) lines.push(`${out}'s ${R.outShare} is taken in ${ratioStr(how.inRatio)}: ${names.map((n, i) => `${n} ${old[n]} + ${R.outShare} × ${how.inRatio[i]}/${sum(how.inRatio)} = ${newShares[n]}`).join('; ')}; new ratio = **${ratioStr(R.newInts)}**.`);
  else lines.push(`Nothing is agreed, so ${names.join(' and ')} continue in their old ratio: new ratio = **${ratioStr(R.newInts)}**.`);
  const g = (n) => (gain[n].sign > 0 ? `${gain[n]} (gain)` : gain[n].zero ? '0 (no change)' : `−${gain[n].abs()} (sacrifice)`);
  lines.push(`Gain = new share − old share: ${names.map((n) => `${n} ${newShares[n]} − ${old[n]} = ${g(n)}`).join('; ')}. Gaining ratio = **${R.gainers.length === 1 ? `only ${R.gainers[0]} gains` : ratioStr(R.gainInts)}**.`);
  return lines;
}

/** Working notes for a solved retirement or death (see solveRetirement). */
export function retirementNotes(r, opts = {}) {
  const { s, R } = r;
  const lines = opts.skipRatio ? [] : [...ratioNotes(R, s.how ?? {})];
  const oldR = `old ratio ${ratioStr(R.oldInts)}`;
  const split = (m) => R.all.map((n) => `${n} ${rs(m[n])}`).join(', ');
  if (r.reval) {
    const g = r.items.filter(([, x]) => x > 0).reduce((a, [, x]) => a + x, 0);
    const l = -r.items.filter(([, x]) => x < 0).reduce((a, [, x]) => a + x, 0);
    const gl = g && l ? `gains ${rs(g)} − losses ${rs(l)} = ` : '';
    lines.push(`Revaluation: ${gl}${r.reval.net > 0 ? 'profit' : 'loss'} ${rs(Math.abs(r.reval.net))}, shared by all the partners in the ${oldR} (${split(r.reval.parts)}).`);
  }
  for (const [l, x] of r.crRes.filter((c) => !c[2])) lines.push(`${l.replace(' A/c', '')} ${rs(x)} is credited to all the partners in the ${oldR} (${split(splitShares(x, s.old))}).`);
  for (const [l, x] of r.drRes) lines.push(`${l.replace(' A/c', '').replace(' (written off)', '')} ${rs(x)} is ${l.includes('Goodwill') ? 'written off' : 'debited'} to all the partners in the ${oldR} (${split(splitShares(x, s.old))}).`);
  lines.push(...r.notes);
  if (r.profit) lines.push(r.profit.note);
  const gw = r.gw;
  if (r.hidden) {
    lines.push(`Hidden goodwill: ${R.out} is to receive ${rs(r.hidden.settle)} in full settlement against a capital of ${rs(r.hidden.before)} after all other adjustments; the excess ${rs(r.hidden.share)} is ${R.out}'s share of goodwill. Firm's goodwill = ${rs(r.hidden.share)} ÷ ${R.outShare} = **${rs(r.hidden.value)}**.`);
  }
  if (gw) {
    const drs = Object.entries(gw.dr).map(([n, x]) => `${n} ${rs(x)}`).join(', ');
    const crs = Object.entries(gw.cr).map(([n, x]) => `${n} ${rs(x)}`).join(', ');
    lines.push(`Goodwill ${rs(gw.value)}: ${R.out}'s share = ${inr(gw.value)} × ${R.outShare} = ${rs(gw.cr[R.out])}${R.sacrificers.length ? `; ${R.sacrificers.map((n) => `${n} sacrifices ${R.gain[n].abs()} = ${rs(gw.cr[n])}`).join('; ')}` : ''}. Debited to the gaining partner${R.gainers.length > 1 ? `s in ${ratioStr(R.gainInts)}` : ''} (${drs}); credited ${crs}.`);
  }
  if (r.s.death) lines.push(`Amount due to ${R.out}'s executor = ${rs(r.due)}: ${r.cash ? `${rs(r.cash)} paid in cash and ` : ''}${rs(r.loan)} transferred to ${r.loanLabel} A/c.`);
  else lines.push(`Amount due to ${R.out} = ${rs(r.due)}: ${r.cash === r.due ? 'paid in full by bank' : `${r.cash ? `${rs(r.cash)} paid by bank and ` : ''}${rs(r.loan)} transferred to ${r.loanLabel} A/c`}.`);
  if (r.adj) {
    const cur = R.names.map((n) => rs(r.adj.current[n])).join(' + ');
    if (r.adj.needed !== null)
      lines.push(`Cash needed = ${rs(r.cash)} (payment) + ${rs(s.adjust.payOut)} (minimum balance) − ${rs(r.bank0)} (bank) = ${rs(r.adj.needed)}. Total capital of the new firm = ${cur} + ${rs(r.adj.needed)} = **${rs(r.adj.total)}**.`);
    else lines.push(`Total capital of the new firm (agreed) = **${rs(r.adj.total)}**.`);
    for (const n of R.names) {
      const d = r.adj.diff[n];
      lines.push(`${n}: required ${inr(r.adj.total)} × ${R.newShares[n]} = ${rs(r.adj.required[n])}; capital after adjustments ${rs(r.adj.current[n])}; ${d === 0 ? 'no adjustment' : d > 0 ? `brings in ${rs(d)}` : `withdraws ${rs(-d)}`}.`);
    }
  }
  const bits = [['opening', r.bank0]];
  if (r.cash) bits.push([`paid to ${R.out}${r.s.death ? "'s executor" : ''}`, -r.cash]);
  if (r.adj) for (const n of R.names) if (r.adj.diff[n]) bits.push([`${n} ${r.adj.diff[n] > 0 ? 'brings in' : 'withdraws'}`, r.adj.diff[n]]);
  check(bits.reduce((a, [, x]) => a + x, 0) === r.bank, 'bank working does not add up');
  if (bits.length > 1) lines.push(`Bank: ${bits.map(([l, x], i) => `${i === 0 ? '' : x < 0 ? '− ' : '+ '}${rs(Math.abs(x))} (${l})`).join(' ')} = ${rs(r.bank)}.`);
  return lines.map((l, i) => `${i + 1}. ${l}`).join('\n');
}

/** Working notes + the statements, for a full practical problem. */
export function retirementAnswer(r, firm, date) {
  return [
    '**Working notes**',
    retirementNotes(r),
    r.reval ? `**Revaluation Account**\n\n${r.reval.md}` : '',
    `**Partners' Capital Accounts**\n\n${r.caps.md}`,
    r.exec ? `**${r.R.out}'s Executor's Account**\n\n${r.exec.md}` : '',
    `**Balance Sheet of ${firm} as at ${date} (after ${r.R.out}'s ${r.s.death ? 'death' : 'retirement'})**\n\n${r.newBS.md}`,
  ].filter(Boolean).join('\n\n');
}

// ---------------------------------------------------------------- words for narration
const ONES = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
const two = (n) => (n < 20 ? ONES[n] : TENS[Math.floor(n / 10)] + (n % 10 ? `-${ONES[n % 10]}` : ''));
/** Indian number words: 120000 → "one lakh twenty thousand". */
export function words(n) {
  check(Number.isInteger(n) && n >= 0, `words: ${n}`);
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
/** "rupees one lakh twenty thousand" */
export const rw = (n) => `rupees ${words(n)}`;
const ORD = { 2: 'half', 3: 'third', 4: 'quarter', 5: 'fifth', 6: 'sixth', 7: 'seventh', 8: 'eighth', 9: 'ninth', 10: 'tenth', 11: 'eleventh', 12: 'twelfth' };
function ordinal(d) {
  if (ORD[d]) return ORD[d];
  if (d < 20) return `${ONES[d]}th`;
  if (d < 100 && d % 10 === 0) return `${TENS[d / 10].slice(0, -1)}ieth`;
  if (d < 100) return `${TENS[Math.floor(d / 10)]}-${ordinal(d % 10)}`;
  fail(`ordinal ${d}`);
}
/** Fraction words: 3/10 → "three tenths", 1/2 → "one half". */
export function fw(f) {
  if (f.d === 1) return words(f.n);
  let o = ordinal(f.d);
  if (f.n > 1) o = o === 'half' ? 'halves' : `${o}s`;
  return `${words(f.n)} ${o}`;
}
/** Ratio words: [12, 8, 5] → "twelve to eight to five". */
export const ratioWords = (ints) => ints.map((x) => words(x)).join(' to ');
