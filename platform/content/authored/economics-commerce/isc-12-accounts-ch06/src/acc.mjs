// Accounting helpers for isc-12-accounts-ch06 (Issue and Forfeiture of Shares).
// The double-entry Books, issue(), forfeit(), reissue(), vendorShares() and the Schedule III note and
// balance-sheet builders follow the approach of the CBSE 12 Accountancy share-capital chapter; this
// chapter adds what the ISC 2027 topics need: interest on calls in arrears and calls in advance (Table F
// rates, whole rupees only), the split of entries into the journal proper and the cash book (bank
// column), underwriting commission in shares, and number words for narration.
// Every figure is computed from the givens and every statement is checked: journal entries balance,
// every ledger account balances, instalments add to the face value, pro-rata allotments give whole
// shares, the minimum subscription is met, forfeiture credits equal the money actually received towards
// capital, the discount on reissue never exceeds the amount forfeited on those shares, the notes agree
// with the ledger balances and the balance sheet totals. Any mismatch throws, so the build stops.
// Tables are rendered FROM the computed values (Indian digit grouping), so no figure is typed twice.

export function check(ok, what) {
  if (!ok) throw new Error(`accounting check failed: ${what}`);
}

// ---------------------------------------------------------------- numbers and words
const IN = new Intl.NumberFormat('en-IN');
/** 120000 -> "1,20,000"; throws on a non-integer amount (every figure must be whole rupees). */
export function inr(n) {
  check(Number.isInteger(n), `non-integer amount ${n}`);
  return n < 0 ? `(−) ${IN.format(-n)}` : IN.format(n);
}
/** 120000 -> "₹1,20,000". */
export const rs = (n) => `₹${inr(n)}`;
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
export const rw = (n) => `rupees ${words(n)}`;

// ---------------------------------------------------------------- arithmetic helpers
/** x per cent of an amount, whole rupees only. */
export function pct(p, amount) {
  const v = (amount * p) / 100;
  check(Number.isInteger(v), `${p}% of ${amount} is not whole (${v})`);
  return v;
}
/** Simple interest at `rate` per cent per annum for `months` months; must be whole rupees. */
export function interest(amount, rate, months) {
  const v = (amount * rate * months) / 1200;
  check(Number.isInteger(v), `interest on ${amount} at ${rate}% for ${months} months is not whole (${v})`);
  return v;
}
/** a / b as a whole number (shares, ratios). */
export function whole(a, b, what = 'division') {
  const v = a / b;
  check(Number.isInteger(v), `${what}: ${a} / ${b} is not whole`);
  return v;
}
const gcd = (a, b) => {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a;
};
/** Ratio in lowest terms with spaces: (60000, 40000) -> "3 : 2". */
export function ratio(a, b) {
  const g = gcd(a, b);
  return `${a / g} : ${b / g}`;
}

// ---------------------------------------------------------------- markdown tables
/** Markdown table; `num` = indexes of right-aligned (amount) columns. */
export function md(headers, rows, num = []) {
  for (const r of rows) check(r.length === headers.length, `table row has ${r.length} cells, header ${headers.length}`);
  const sep = headers.map((_, i) => (num.includes(i) ? '---:' : '---'));
  const line = (cells) => `| ${cells.map((c) => (c === '' ? ' ' : c)).join(' | ')} |`;
  return [line(headers), line(sep), ...rows.map(line)].join('\n');
}
const bold = (s) => `**${s}**`;

/**
 * Journal. entries: [{ date?, dr: [[account, amount]…], cr: [[account, amount]…], nar }].
 * Nil lines are dropped; each entry must balance. Account names are written in full.
 */
export function journal(entries) {
  const dated = entries.some((e) => e.date);
  const rows = [];
  const clean = [];
  for (const e of entries) {
    const dr = e.dr.filter(([, v]) => v !== 0);
    const cr = e.cr.filter(([, v]) => v !== 0);
    const d = sum(dr.map(([, v]) => v));
    const c = sum(cr.map(([, v]) => v));
    check(d === c && d > 0, `journal entry "${e.nar}" debits ${d} ≠ credits ${c}`);
    for (const [, v] of [...dr, ...cr]) check(Number.isInteger(v) && v > 0, `journal amount ${v} in "${e.nar}"`);
    const pre = (first) => (dated ? [first ? e.date ?? '' : ''] : []);
    dr.forEach(([a, v], i) => rows.push([...pre(i === 0), `${a} Dr.`, inr(v), '']));
    cr.forEach(([a, v]) => rows.push([...pre(false), `To ${a}`, '', inr(v)]));
    rows.push([...pre(false), `*(Being ${e.nar})*`, '', '']);
    clean.push({ ...e, dr, cr, total: d });
  }
  const headers = [...(dated ? ['Date'] : []), 'Particulars', 'Dr (₹)', 'Cr (₹)'];
  const n = dated ? [2, 3] : [1, 2];
  return { headers, rows, entries: clean, md: md(headers, rows, n) };
}

/** Two-sided ledger account; "To" on the debit side and "By" on the credit side. Must balance. */
export function ledger(dr, cr, { dates = false, heads } = {}) {
  const td = sum(dr.map((r) => r[r.length - 1]));
  const tc = sum(cr.map((r) => r[r.length - 1]));
  check(td === tc, `ledger account totals ${td} ≠ ${tc}`);
  const side = (r, pre) => (r ? [...(dates ? [r[0]] : []), `${pre} ${r[dates ? 1 : 0]}`, inr(r[r.length - 1])] : [...(dates ? [''] : []), '', '']);
  const n = Math.max(dr.length, cr.length);
  const rows = [];
  for (let i = 0; i < n; i++) rows.push([...side(dr[i], 'To'), ...side(cr[i], 'By')]);
  const blank = dates ? [''] : [];
  rows.push([...blank, bold('Total'), bold(inr(td)), ...blank, bold('Total'), bold(inr(tc))]);
  const [hd, hc] = heads ?? ['Dr: Particulars', 'Cr: Particulars'];
  const headers = dates ? ['Date', hd, '₹', 'Date', hc, '₹'] : [hd, '₹', hc, '₹'];
  return { headers, rows, total: td, md: md(headers, rows, dates ? [2, 5] : [1, 3]) };
}

// ---------------------------------------------------------------- books: post entries, read balances
/**
 * A small double-entry book. post() checks that the entry balances, drops nil lines and records each
 * line in its ledger account (the opposite account is named when the line stands alone on its side,
 * else the first opposite account). bal() is debit minus credit.
 */
export class Books {
  constructor() {
    this.entries = [];
    this.lines = [];
  }
  post(e) {
    const clean = (side) =>
      side.filter(([a, v]) => {
        check(Number.isInteger(v) && v >= 0, `amount ${v} for ${a} in "${e.nar}"`);
        return v > 0;
      });
    const dr = clean(e.dr);
    const cr = clean(e.cr);
    check(sum(dr.map(([, v]) => v)) === sum(cr.map(([, v]) => v)) && dr.length && cr.length, `entry "${e.nar}" does not balance`);
    const ent = { date: e.date, dr, cr, nar: e.nar };
    this.entries.push(ent);
    const add = (own, opp, side) =>
      own.forEach(([a, v]) => {
        if (own.length === 1) opp.forEach(([o, ov]) => this.lines.push({ a, side, other: o, v: ov, date: e.date }));
        else this.lines.push({ a, side, other: opp[0][0], v, date: e.date });
      });
    add(dr, cr, 'dr');
    add(cr, dr, 'cr');
    return this.entries.length - 1;
  }
  bal(a) {
    return sum(this.lines.filter((p) => p.a === a).map((p) => (p.side === 'dr' ? p.v : -p.v)));
  }
  /** Journal of entries [from, to). */
  journal(from = 0, to = this.entries.length) {
    return journal(this.entries.slice(from, to));
  }
  /** Ledger account of `a`, closed with Balance c/d on the lighter side. */
  ledgerOf(a, { cd = 'Balance c/d', heads } = {}) {
    const ps = this.lines.filter((p) => p.a === a);
    check(ps.length > 0, `no postings in ${a}`);
    const dated = ps.some((p) => p.date);
    const row = (p) => (dated ? [p.date ?? '', p.other, p.v] : [p.other, p.v]);
    const dr = ps.filter((p) => p.side === 'dr').map(row);
    const cr = ps.filter((p) => p.side === 'cr').map(row);
    const b = this.bal(a);
    const last = ps[ps.length - 1].date ?? '';
    if (b > 0) cr.push(dated ? [last, cd, b] : [cd, b]);
    if (b < 0) dr.push(dated ? [last, cd, -b] : [cd, -b]);
    return { balance: b, ...ledger(dr, cr, { dates: dated, heads }) };
  }
}

/**
 * Splits journal entries into the journal proper and the cash book (bank column), as when a company
 * keeps a cash book. A line in Bank A/c goes to the cash book against the account on the other side;
 * what is left of a mixed entry (e.g. application money transferred, with the refund paid in cash)
 * stays in the journal proper. Mixed entries must have a single account on the side opposite the bank.
 * Returns { jp: journal(), cb: ledger(), receipts, payments }, and checks that the cash book balance
 * equals the bank balance of the original entries.
 */
export function cashBookSplit(entries, { bank = 'Bank A/c', nars = {} } = {}) {
  const jp = [];
  const rec = [];
  const pay = [];
  entries.forEach((e, i) => {
    const bd = e.dr.filter(([a]) => a === bank);
    const bc = e.cr.filter(([a]) => a === bank);
    if (!bd.length && !bc.length) return jp.push(e);
    check(!(bd.length && bc.length) && bd.length + bc.length === 1, `entry ${i}: bank on both sides`);
    const receipt = bd.length > 0;
    const [ownSide, oppSide] = receipt ? [e.dr, e.cr] : [e.cr, e.dr];
    const amt = (receipt ? bd : bc)[0][1];
    const others = ownSide.filter(([a]) => a !== bank);
    const out = receipt ? rec : pay;
    if (!others.length) oppSide.forEach(([a, v]) => out.push([e.date ?? '', a, v]));
    else {
      check(oppSide.length === 1, `entry ${i}: mixed entry needs one account opposite the bank`);
      const [A, total] = oppSide[0];
      out.push([e.date ?? '', A, amt]);
      const rest = { date: e.date, nar: nars[i] ?? e.nar };
      if (receipt) Object.assign(rest, { dr: others, cr: [[A, total - amt]] });
      else Object.assign(rest, { dr: [[A, total - amt]], cr: others });
      jp.push(rest);
    }
  });
  const inflow = sum(rec.map((r) => r[2]));
  const outflow = sum(pay.map((r) => r[2]));
  const bankBal = sum(entries.flatMap((e) => [...e.dr.filter(([a]) => a === bank).map(([, v]) => v), ...e.cr.filter(([a]) => a === bank).map(([, v]) => -v)]));
  check(inflow - outflow === bankBal, 'cash book balance agrees with the bank lines of the entries');
  check(bankBal >= 0, 'bank balance not negative');
  const dated = entries.some((e) => e.date);
  const last = entries[entries.length - 1].date ?? '';
  const strip = (r) => (dated ? r : [r[1], r[2]]);
  const payRows = pay.map(strip);
  if (bankBal > 0) payRows.push(dated ? [last, 'Balance c/d', bankBal] : ['Balance c/d', bankBal]);
  const cb = ledger(rec.map(strip), payRows, { dates: dated, heads: ['Receipts', 'Payments'] });
  return { jp: journal(jp), cb, receipts: inflow, payments: outflow, balance: bankBal };
}

// ---------------------------------------------------------------- issue of shares
export const ACC = { bank: 'Bank A/c', sp: 'Securities Premium A/c', cia: 'Calls in Arrears A/c', adv: 'Calls in Advance A/c', sf: 'Share Forfeiture A/c', cr: 'Capital Reserve A/c' };

/**
 * Posts a whole issue of shares to `B` and returns its figures.
 * s = {
 *   kind: 'Equity Share', fv, n (shares offered),
 *   inst: [{ name: 'Application', cap, prem? }, { name: 'Allotment', … }, { name: 'First Call', … }…] (capital parts add to fv),
 *   groups: [{ applied, allotted }] (pro-rata categories; allotted 0 = rejected) or applied (one group),
 *   excess: 'allotment' (excess application money adjusted towards allotment, any surplus refunded) | 'calls' (surplus to Calls in Advance),
 *   defaults: [{ who, shares, group?, from }] (pays nothing from instalment index `from` on),
 *   advance: [{ who, shares, at, calls: [k…] }] (pays calls k in advance with instalment `at`),
 *   arrearsAccount: true | false, made: number of instalments made (default all), dates: { app, allot, calls: [] }
 * }
 */
export function issue(B, s) {
  const K = s.kind ?? 'Equity Share';
  const inst = s.inst.map((i) => ({ name: i.name, cap: i.cap, prem: i.prem ?? 0 }));
  const A = { inst: inst.map((i) => `${K} ${i.name} A/c`), cap: `${K} Capital A/c`, ...ACC };
  const rate = inst.map((i) => i.cap + i.prem);
  check(sum(inst.map((i) => i.cap)) === s.fv, `${K}: instalments add to the face value`);
  check(inst[0].name === 'Application' && inst[1]?.name === 'Allotment', 'first two instalments are application and allotment');
  const made = s.made ?? inst.length;
  const mode = s.excess ?? 'allotment';
  const groups = (s.groups ?? [{ applied: s.applied ?? s.n, allotted: Math.min(s.applied ?? s.n, s.n) }]).map((g) => {
    check(g.allotted <= g.applied, 'allotted ≤ applied in a group');
    if (!g.allotted) return { ...g, excess: 0, adj: 0, surplus: 0, refund: g.applied * rate[0], adv: 0 };
    const excess = (g.applied - g.allotted) * rate[0];
    const adj = Math.min(excess, g.allotted * rate[1]);
    const surplus = excess - adj;
    return { ...g, excess, adj, surplus, refund: mode === 'calls' ? 0 : surplus, adv: mode === 'calls' ? surplus : 0 };
  });
  const applied = sum(groups.map((g) => g.applied));
  const allotted = sum(groups.map((g) => g.allotted));
  check(allotted <= s.n, 'allotted ≤ offered');
  if (allotted < s.n) check(10 * allotted >= 9 * s.n, `minimum subscription: ${allotted} of ${s.n}`);
  const holder = (h) => {
    const gi = h.group ?? groups.findIndex((g) => g.allotted > 0);
    const g = groups[gi];
    const ap = (h.shares * g.applied) / g.allotted;
    check(Number.isInteger(ap), `${h.who}: whole shares applied`);
    const ex = (ap - h.shares) * rate[0];
    const adj = Math.min(ex, h.shares * rate[1]);
    return { ...h, applied: ap, adj, surplus: ex - adj };
  };
  const defs = (s.defaults ?? []).map(holder);
  const advs = (s.advance ?? []).map((a) => ({ ...a, money: a.shares * sum(a.calls.map((k) => rate[k])) }));
  if (mode === 'calls') check(!defs.length, 'defaulters with surplus held as calls in advance are not modelled');
  const unpaid = (d, k) => {
    if (k < d.from) return 0;
    const u = d.shares * rate[k] - (k === 1 ? d.adj : 0);
    check(u >= 0, `${d.who}: unpaid on instalment ${k}`);
    return u;
  };
  const unpaidT = (k) => sum(defs.map((d) => unpaid(d, k)));
  const advIn = (k) => sum(advs.filter((a) => a.at === k).map((a) => a.money));
  const advUsed = (k) => sum(advs.filter((a) => a.calls.includes(k)).map((a) => a.shares * rate[k])) + (k === 2 ? sum(groups.map((g) => g.adv)) : 0);
  for (const g of groups) if (g.adv) check(g.adv <= g.allotted * (rate[2] ?? 0), 'surplus within the first call');
  const dt = s.dates ?? {};
  const capT = (k) => allotted * inst[k].cap;
  const premT = (k) => allotted * inst[k].prem;
  const nmT = (k) => inst[k].name.toLowerCase();
  const ents = {};
  const start = B.entries.length;

  ents.app = B.post({ date: dt.app, dr: [[A.bank, applied * rate[0]]], cr: [[A.inst[0], applied * rate[0]]], nar: `application money received on ${inr(applied)} shares` });
  const adjT = sum(groups.map((g) => g.adj));
  const surT = sum(groups.map((g) => g.adv));
  const refT = sum(groups.map((g) => g.refund));
  const why = [`application money on ${inr(allotted)} shares transferred to share capital${premT(0) ? ' and securities premium' : ''}`];
  if (adjT) why.push('excess adjusted towards allotment');
  if (surT) why.push('surplus credited to calls in advance');
  if (refT) why.push(groups.some((g) => !g.allotted) ? 'money on rejected applications refunded' : 'surplus refunded');
  ents.appT = B.post({ date: dt.allot, dr: [[A.inst[0], applied * rate[0]]], cr: [[A.cap, capT(0)], [A.sp, premT(0)], [A.inst[1], adjT], [A.adv, surT], [A.bank, refT]], nar: why.join('; ') });

  const callDue = (k) => B.post({ date: k === 1 ? dt.allot : dt.calls?.[k - 2], dr: [[A.inst[k], allotted * rate[k]]], cr: [[A.cap, capT(k)], [A.sp, premT(k)]], nar: `${nmT(k)} money due on ${inr(allotted)} shares${premT(k) ? ' including premium' : ''}` });
  const callRecv = (k) => {
    const due = allotted * rate[k];
    const off = k === 1 ? adjT : 0;
    const u = unpaidT(k);
    const recv = due - off - u - advUsed(k) + advIn(k);
    const parts = [`${nmT(k)} money received${u && !s.arrearsAccount ? ' except on shares in default' : ''}`];
    if (u && s.arrearsAccount) parts.push('unpaid amount debited to calls in arrears');
    if (advUsed(k)) parts.push('calls in advance adjusted');
    if (advIn(k)) parts.push('later calls received in advance');
    return B.post({
      date: k === 1 ? dt.allot : dt.calls?.[k - 2],
      dr: [[A.bank, recv], [A.adv, advUsed(k)], [A.cia, s.arrearsAccount ? u : 0]],
      cr: [[A.inst[k], due - off - (s.arrearsAccount ? 0 : u)], [A.adv, advIn(k)]],
      nar: parts.join('; '),
    });
  };
  ents.calls = [];
  for (let k = 1; k < made; k++) ents.calls.push([callDue(k), callRecv(k)]);
  // Every instalment account closes at nil, or at the defaulters' unpaid amount if no arrears account.
  for (let k = 0; k < made; k++) check(B.bal(A.inst[k]) === (k && !s.arrearsAccount ? unpaidT(k) : 0), `${A.inst[k]} closes correctly`);
  const calledCap = sum(inst.slice(0, made).map((i) => i.cap));
  return { K, A, inst, rate, groups, applied, allotted, made, defs, advs, unpaid, unpaidT, adjT, refT, surT, ents, start, calledCap, s };
}

/**
 * Forfeits the shares of the named defaulters after the calls made so far. Share Capital is debited
 * with the called-up amount, Securities Premium with any premium not received, the unpaid amounts are
 * credited (to Calls in Arrears or the instalment accounts) and Share Forfeiture with the balance,
 * which must equal the money received on those shares less any premium received.
 */
export function forfeit(B, I, whos, { date, nar } = {}) {
  const ds = I.defs.filter((d) => whos.includes(d.who));
  check(ds.length === whos.length, 'forfeit: unknown defaulter');
  let sc = 0;
  let sp = 0;
  let sf = 0;
  const crs = new Map();
  for (const d of ds) {
    const capCalled = d.shares * I.calledCap;
    const premUnpaid = d.shares * sum(I.inst.slice(d.from, I.made).map((i) => i.prem));
    let unpaid = 0;
    for (let k = d.from; k < I.made; k++) {
      const u = I.unpaid(d, k);
      unpaid += u;
      const acct = I.s.arrearsAccount ? I.A.cia : I.A.inst[k];
      crs.set(acct, (crs.get(acct) ?? 0) + u);
    }
    const f = capCalled + premUnpaid - unpaid;
    const paid = d.applied * I.rate[0] - d.surplus + sum(I.rate.slice(1, d.from).map((r, j) => d.shares * r - (j === 0 ? d.adj : 0)));
    const premPaid = d.shares * sum(I.inst.slice(0, d.from).map((i) => i.prem));
    check(f === paid - premPaid && f > 0, `forfeiture of ${d.who}: ${f} vs received ${paid} less premium ${premPaid}`);
    Object.assign(d, { capCalled, premUnpaid, unpaidAll: unpaid, forfeited: f, paid, premPaid });
    sc += capCalled;
    sp += premUnpaid;
    sf += f;
  }
  const from = Math.min(...ds.map((d) => d.from));
  const owed = I.inst.slice(from, I.made).map((i) => i.name.toLowerCase());
  const owedText = owed.length === 1 ? owed[0] : `${owed.slice(0, -1).join(', ')} and ${owed[owed.length - 1]}`;
  const idx = B.post({ date, dr: [[I.A.cap, sc], [I.A.sp, sp]], cr: [...crs.entries(), [ACC.sf, sf]], nar: nar ?? `${inr(sum(ds.map((d) => d.shares)))} shares forfeited for non-payment of ${owedText} money` });
  if (I.s.arrearsAccount) {
    const left = sum(I.defs.filter((d) => !whos.includes(d.who) && !d.cleared).map((d) => sum(I.inst.slice(1, I.made).map((_, j) => I.unpaid(d, j + 1)))));
    check(B.bal(ACC.cia) === left, 'calls in arrears left only for shares not forfeited');
  }
  return { idx, sc, sp, sf, shares: sum(ds.map((d) => d.shares)), crs: [...crs.entries()], per: Object.fromEntries(ds.map((d) => [d.who, d])) };
}

/**
 * Reissues forfeited shares: Bank Dr (price), Share Forfeiture Dr (discount), To Share Capital (amount
 * credited as paid up), To Securities Premium (any excess). The discount may not exceed the amount
 * forfeited on THOSE shares; the rest of that amount goes to Capital Reserve.
 */
export function reissue(B, { cap, shares, price, credited, forfeitedOn, date, nar }) {
  const disc = Math.max(0, credited - price) * shares;
  const prem = Math.max(0, price - credited) * shares;
  check(disc <= forfeitedOn, `discount ${disc} within forfeited ${forfeitedOn}`);
  const sfBefore = -B.bal(ACC.sf);
  const e1 = B.post({ date, dr: [[ACC.bank, shares * price], [ACC.sf, disc]], cr: [[cap, shares * credited], [ACC.sp, prem]], nar: nar ?? `${inr(shares)} forfeited shares reissued at ₹${price} per share as ₹${credited} paid up` });
  const toCR = forfeitedOn - disc;
  const e2 = toCR ? B.post({ date, dr: [[ACC.sf, toCR]], cr: [[ACC.cr, toCR]], nar: `gain on reissue of ${inr(shares)} forfeited shares transferred to capital reserve` }) : null;
  check(-B.bal(ACC.sf) === sfBefore - forfeitedOn, 'forfeiture left only on shares not reissued');
  return { disc, prem, toCR, e1, e2, sfLeft: -B.bal(ACC.sf) };
}

// ---------------------------------------------------------------- interest on calls (Table F rates)
export const SH = 'Sundry Shareholders A/c';
export const INT = { arrears: 'Interest on Calls in Arrears A/c', advance: 'Interest on Calls in Advance A/c' };

/**
 * A defaulter pays his arrears later, with interest at `rate` % p.a. for `months` months (Table F: at
 * most 10 %). Interest is charged to the shareholder first, then the arrears and interest are received.
 */
export function receiveArrears(B, I, who, { date, months, rate = 10 } = {}) {
  const d = I.defs.find((x) => x.who === who);
  check(d && !d.cleared, `receiveArrears: ${who}`);
  check(I.s.arrearsAccount, 'receiveArrears needs a Calls in Arrears account');
  const owing = I.inst.slice(1, I.made).map((_, j) => I.unpaid(d, j + 1)).filter((u) => u > 0);
  check(owing.length === 1, `${who} owes exactly one instalment (interest runs from one due date)`);
  const amt = owing[0];
  const int = months ? interest(amt, rate, months) : 0;
  const shBefore = B.bal(SH);
  const e1 = int ? B.post({ date, dr: [[SH, int]], cr: [[INT.arrears, int]], nar: `interest at ${rate}% per annum for ${months} months charged on calls in arrears of ${rs(amt)}` }) : null;
  const e2 = B.post({ date, dr: [[ACC.bank, amt + int]], cr: [[ACC.cia, amt], [SH, int]], nar: `calls in arrears${int ? ' and interest' : ''} received` });
  check(B.bal(SH) === shBefore, 'shareholders account settled');
  d.cleared = true;
  return { amt, int, e1, e2 };
}

/** Interest on calls in advance at `rate` % p.a. (Table F: at most 12 %) for `months` months, paid. */
export function payAdvanceInterest(B, { amount, months, rate = 12, date }) {
  const int = interest(amount, rate, months);
  const shBefore = B.bal(SH);
  const e1 = B.post({ date, dr: [[INT.advance, int]], cr: [[SH, int]], nar: `interest at ${rate}% per annum for ${months} months due on calls in advance of ${rs(amount)}` });
  const e2 = B.post({ date, dr: [[SH, int]], cr: [[ACC.bank, int]], nar: 'interest on calls in advance paid' });
  check(B.bal(SH) === shBefore, 'shareholders account settled');
  return { int, e1, e2 };
}

/** Shares issued for a purchase consideration at a price (≥ face value: no discount, Section 53). */
export function vendorShares(amount, fv, price) {
  check(price >= fv, 'no issue at a discount');
  const n = amount / price;
  check(Number.isInteger(n), `${amount} / ${price} is not a whole number of shares`);
  return { n, cap: n * fv, prem: n * (price - fv) };
}

/**
 * Business purchase: assets and liabilities taken over at agreed values for a purchase consideration.
 * Goodwill if the consideration exceeds net assets, Capital Reserve if it falls short.
 */
export function businessPurchase({ assets, liabilities, pc }) {
  const ta = sum(assets.map(([, v]) => v));
  const tl = sum(liabilities.map(([, v]) => v));
  const net = ta - tl;
  const gw = Math.max(0, pc - net);
  const crv = Math.max(0, net - pc);
  check(ta + gw === tl + pc + crv, 'business purchase entry balances');
  return { ta, tl, net, gw, crv };
}

// ---------------------------------------------------------------- disclosure (Schedule III)
/**
 * Note on Share Capital. rows: [{ label, n, called, arrears? }]; forfeited: Share Forfeiture balance.
 * The net total must equal the books: Share Capital balance − calls in arrears + Share Forfeiture.
 */
export function shareNote({ B, cap, kind = 'equity shares', fv, authorised, issued, rows, forfeited = 0, arrearsBooks = 0, note = 1 }) {
  const out = [];
  const each = `${kind} of ₹${fv} each`;
  out.push([bold('Authorised capital'), '', '']);
  out.push([`${inr(authorised)} ${each}`, '', inr(authorised * fv)]);
  out.push([bold('Issued capital'), '', '']);
  out.push([`${inr(issued)} ${each}`, '', inr(issued * fv)]);
  out.push([bold('Subscribed capital'), '', '']);
  let total = 0;
  for (const r of rows) {
    const gross = r.n * r.called;
    if (r.arrears) {
      out.push([`${r.label}: ${inr(r.n)} ${each}${r.called === fv ? ', fully called up' : `, ₹${r.called} per share called up`}`, inr(gross), '']);
      out.push(['Less: Calls in arrears (calls unpaid)', `(${inr(r.arrears)})`, inr(gross - r.arrears)]);
      total += gross - r.arrears;
    } else {
      out.push([`${r.label}: ${inr(r.n)} ${each}${r.called === fv ? '' : `, ₹${r.called} per share called up`}`, '', inr(gross)]);
      total += gross;
    }
  }
  if (forfeited) {
    out.push(['Add: Forfeited shares (Share Forfeiture A/c)', '', inr(forfeited)]);
    total += forfeited;
  }
  out.push([bold('Total'), '', bold(inr(total))]);
  if (B) {
    const arr = sum(rows.map((r) => r.arrears ?? 0));
    check(arr === arrearsBooks, `note arrears ${arr} = books ${arrearsBooks}`);
    check(total === -B.bal(cap) - arrearsBooks + -B.bal(ACC.sf), `share capital note ${total} agrees with the books`);
    check(forfeited === -B.bal(ACC.sf), 'forfeited amount agrees with the books');
  }
  const headers = [`Note ${note}: Share Capital`, '₹', '₹'];
  return { total, headers, rows: out, md: md(headers, out, [1, 2]) };
}

/** A simple note (Reserves and Surplus, Other Current Liabilities…): items [[label, amount]]. */
export function simpleNote(title, items, note) {
  const total = sum(items.map(([, v]) => v));
  const rows = [...items.map(([l, v]) => [l, inr(v)]), [bold('Total'), bold(inr(total))]];
  const headers = [`Note ${note}: ${title}`, '₹'];
  return { total, headers, rows, md: md(headers, rows, [1]) };
}

/**
 * Balance sheet (extract) in the Schedule III Part I vertical form.
 * eq / assets: [[heading, [[label, note, amount]…]]…]; both halves must total the same.
 */
export function bsIII({ eq, assets, title }) {
  const rows = [];
  const half = (h, groups) => {
    rows.push([bold(h), '', '']);
    let t = 0;
    groups.forEach(([g, items], i) => {
      rows.push([`${i + 1}. ${g}`, '', '']);
      items.forEach(([l, n, v], j) => {
        rows.push([`(${'abcdef'[j]}) ${l}`, `${n}`, inr(v)]);
        t += v;
      });
    });
    rows.push([bold('Total'), '', bold(inr(t))]);
    return t;
  };
  const te = half('I. Equity and Liabilities', eq);
  const ta = half('II. Assets', assets);
  check(te === ta, `balance sheet: equity and liabilities ${te} ≠ assets ${ta}`);
  const headers = [title ?? 'Particulars', 'Note No.', '₹'];
  return { total: te, headers, rows, md: md(headers, rows, [2]) };
}
