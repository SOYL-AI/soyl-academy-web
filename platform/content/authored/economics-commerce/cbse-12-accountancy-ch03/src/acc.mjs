// Accounting helpers for cbse-12-accountancy-ch03 (Admission of a Partner). Every figure the chapter
// quotes is computed here from the givens and checked: profit-sharing ratios add up to one, every
// share divides exactly into whole rupees, journal entries balance, ledger accounts and balance sheets
// total, and the bank balance never goes negative. Any mismatch throws, so the build stops.
// Tables are built from the computed values (Indian digit grouping), never typed by hand.

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
const sum = (xs) => xs.reduce((a, b) => a + b, 0);

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
  eq(o) { return this.n === o.n && this.d === o.d; }
  get zero() { return this.n === 0; }
  get value() { return this.n / this.d; }
  /** Markdown text: 3/10, or 1 for a whole. */
  toString() { return this.d === 1 ? String(this.n) : `${this.n}/${this.d}`; }
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

/**
 * Ratios on admission. old: { name: F } adding to 1. how:
 *   { proportion: F }           the new partner's share is taken from the old partners in their old ratio
 *   { surrender: { name: F } }  each old partner surrenders this fraction OF HIS OWN share
 *   { give: { name: F } }       each old partner gives this fraction of the firm's profit
 *   { newRatio: [ints] }        the new ratio is given (old partners first, new partner last)
 * Returns new shares (new partner last), sacrifices, the new partner's share and both ratios.
 */
export function admit(old, newName, how) {
  const names = Object.keys(old);
  check(sumF(Object.values(old)).eq(fr(1)), `old shares do not add to 1`);
  const sac = {};
  let newShare;
  if (how.proportion) names.forEach((n) => (sac[n] = old[n].mul(how.proportion)));
  else if (how.surrender) names.forEach((n) => (sac[n] = old[n].mul(how.surrender[n] ?? fr(0))));
  else if (how.give) names.forEach((n) => (sac[n] = how.give[n] ?? fr(0)));
  else if (how.newRatio) {
    const t = sum(how.newRatio);
    names.forEach((n, i) => (sac[n] = old[n].sub(fr(how.newRatio[i], t))));
    newShare = fr(how.newRatio[names.length], t);
  } else fail('admit: unknown mode');
  const total = sumF(Object.values(sac));
  if (newShare) check(total.eq(newShare), `sacrifices ${total} differ from the new partner's share ${newShare}`);
  newShare = total;
  for (const n of names) check(sac[n].n >= 0, `${n} gains on admission (${sac[n]})`);
  const newShares = { ...Object.fromEntries(names.map((n) => [n, old[n].sub(sac[n])])), [newName]: newShare };
  check(sumF(Object.values(newShares)).eq(fr(1)), 'new shares do not add to 1');
  for (const [n, f] of Object.entries(newShares)) check(f.n > 0, `${n} has no share in the new firm`);
  const all = [...names, newName];
  return {
    names,
    all,
    newName,
    old,
    sac,
    newShare,
    newShares,
    oldInts: ratioInts(names.map((n) => old[n])),
    newInts: ratioInts(all.map((n) => newShares[n])),
    sacInts: ratioInts(names.map((n) => sac[n])),
  };
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
    dr.forEach(([a, x], k) => rows.push([`${k === 0 ? `(${roman(i + 1)}) ` : ''}${a} Dr.`, inr(x), '']));
    cr.forEach(([a, x]) => rows.push([`To ${a}`, '', inr(x)]));
    rows.push([`*(${e.nar})*`, '', '']);
    return { dr, cr, total: d, nar: e.nar };
  });
  const headers = ['Particulars', 'Dr (₹)', 'Cr (₹)'];
  return { headers, rows, entries: clean, md: mdTable(headers, rows, [1, 2]) };
}

/** Two-sided ledger account; the two sides must total the same. */
export function tAccount(dr, cr) {
  dr = dr.filter(([, x]) => x !== 0);
  cr = cr.filter(([, x]) => x !== 0);
  const td = sum(dr.map(([, x]) => x));
  const tc = sum(cr.map(([, x]) => x));
  check(td === tc, `account does not balance (${td} vs ${tc})`);
  const n = Math.max(dr.length, cr.length);
  const rows = [];
  for (let i = 0; i < n; i++) rows.push([dr[i]?.[0] ?? '', amt(dr[i]?.[1]), cr[i]?.[0] ?? '', amt(cr[i]?.[1])]);
  rows.push(['**Total**', `**${inr(td)}**`, '**Total**', `**${inr(tc)}**`]);
  const headers = ['Dr. Particulars', '₹', 'Cr. Particulars', '₹'];
  return { headers, rows, total: td, md: mdTable(headers, rows, [1, 3]) };
}

/**
 * Revaluation account: items = [[label, gain (+) or loss (−)]]; the net result is shared by the old
 * partners in their old ratio (oldShares = { name: F }).
 */
export function revaluation(items, oldShares) {
  const net = sum(items.map(([, x]) => x));
  const names = Object.keys(oldShares);
  const parts = Object.fromEntries(names.map((n) => [n, oldShares[n].of(Math.abs(net))]));
  const dr = items.filter(([, x]) => x < 0).map(([l, x]) => [l, -x]);
  const cr = items.filter(([, x]) => x > 0);
  if (net > 0) dr.push(...names.map((n) => [`Profit transferred to ${n}'s Capital A/c`, parts[n]]));
  if (net < 0) cr.push(...names.map((n) => [`Loss transferred to ${n}'s Capital A/c`, parts[n]]));
  const acc = tAccount(dr, cr);
  return { net, parts, ...acc };
}

/**
 * Partners' capital accounts in columnar form. dr / cr = [[particulars, { name: amount }]]. The closing
 * balance of each partner (credits − debits) must not be negative; it is shown as `Balance c/d`.
 */
export function capitalAccounts(names, dr, cr, closeLabel = 'Balance c/d') {
  const tot = (side) => Object.fromEntries(names.map((n) => [n, sum(side.map(([, m]) => m[n] ?? 0))]));
  const td = tot(dr);
  const tc = tot(cr);
  const closing = Object.fromEntries(names.map((n) => [n, tc[n] - td[n]]));
  for (const n of names) check(closing[n] >= 0, `${n}'s capital account shows a debit balance (${closing[n]})`);
  const drAll = dr.filter(([, m]) => names.some((n) => m[n]));
  const crAll = cr.filter(([, m]) => names.some((n) => m[n]));
  while (drAll.length + 1 < crAll.length) drAll.push(['', {}]); // closing balance on the last line
  drAll.push([closeLabel, closing]);
  for (const n of names) check(sum(drAll.map(([, m]) => m[n] ?? 0)) === tc[n], `capital account of ${n} does not balance`);
  const k = Math.max(drAll.length, crAll.length);
  const rows = [];
  for (let i = 0; i < k; i++) {
    const a = drAll[i];
    const b = crAll[i];
    rows.push([a?.[0] ?? '', ...names.map((n) => amt(a?.[1][n])), b?.[0] ?? '', ...names.map((n) => amt(b?.[1][n]))]);
  }
  rows.push(['**Total**', ...names.map((n) => `**${inr(tc[n])}**`), '**Total**', ...names.map((n) => `**${inr(tc[n])}**`)]);
  const headers = ['Dr. Particulars', ...names.map((n) => `${n} (₹)`), 'Cr. Particulars', ...names.map((n) => `${n} (₹)`)];
  const num = [...names.map((_, i) => i + 1), ...names.map((_, i) => i + names.length + 2)];
  return { closing, headers, rows, md: mdTable(headers, rows, num) };
}

/** Balance sheet: liabilities and assets = [[label, amount]]; the totals must agree. */
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

// ---------------------------------------------------------------- full admission
/**
 * Solves a complete admission from the old balance sheet and the terms.
 * s = {
 *   old: { name: F }, newName, how (see admit),
 *   liabs: [[label, amount, tag?]], assets: [[label, amount, tag?]]. Tags:
 *     { cap: name }                 a partner's capital
 *     { reserve: true }             reserve or credit balance of profit and loss, shared in the old ratio
 *     { wcr: claim }                workmen compensation reserve and the claim against it
 *     { ifr: fall, inv: label }     investment fluctuation reserve and the fall in the investments
 *     { loss: true }                accumulated loss (debit balance of profit and loss) on the assets side
 *     { goodwill: true }            goodwill already in the books, written off in the old ratio
 *     { bank: true }                the bank (or cash) line
 *   reval: [[revaluation label, 'A' | 'L', balance-sheet label, change, newLabel?]]
 *     change is in balance-sheet terms (asset up +, liability up +); a missing line is created;
 *     newLabel(oldAmount, change) renames the line in the new balance sheet (e.g. provision shown).
 *   goodwill: { value, cash? } premium = value × new share, `cash` of it brought in cash (default all),
 *             the rest debited to the new partner's capital; or { hidden: true } (no premium brought).
 *   capital: amount brought by the new partner, or 'proportionate' (from the old partners' adjusted capitals).
 *   withdraw: true when the old partners withdraw the premium credited to them in cash.
 *   adjust: 'cash' | 'current' to make the old partners' capitals proportionate to the new partner's.
 * }
 */
export function solveAdmission(s) {
  const R = admit(s.old, s.newName, s.how);
  const { names, all, newName } = R;
  const L = s.liabs.map(([l, x, t]) => ({ l, x, t: t ?? {} }));
  const A = s.assets.map(([l, x, t]) => ({ l, x, t: t ?? {} }));
  const find = (list, l) => list.find((r) => r.l === l);
  const oldBS = balanceSheet(L.map((r) => [r.l, r.x]), A.map((r) => [r.l, r.x]));
  const capB = Object.fromEntries(names.map((n) => [n, L.find((r) => r.t.cap === n)?.x]));
  for (const n of names) check(Number.isInteger(capB[n]), `no capital line for ${n}`);

  const items = [];
  const notes = [];
  const oldSplit = (x) => names.map((n) => `${n} ${rs(s.old[n].of(x))}`).join(", ");
  // Revaluation of assets and liabilities.
  for (const [rl, side, bl, ch, rename] of s.reval ?? []) {
    const list = side === 'A' ? A : L;
    let row = find(list, bl);
    if (!row) {
      check(ch > 0, `new line ${bl} must be positive`);
      row = { l: bl, x: 0, t: {} };
      list.push(row);
    }
    const before = row.x;
    row.x += ch;
    check(row.x >= 0, `${bl} becomes negative`);
    if (rename) row.l = rename(before, ch);
    items.push([rl, side === 'A' ? ch : -ch]);
  }
  // Reserves, accumulated losses, existing goodwill, special reserves.
  const crRes = [];
  const drRes = [];
  for (const r of [...L]) {
    if (r.t.reserve) {
      crRes.push([`${r.l}`, r.x]);
      L.splice(L.indexOf(r), 1);
    } else if (r.t.wcr !== undefined) {
      const claim = r.t.wcr;
      if (claim > 0) L.splice(L.indexOf(r), 0, { l: 'Workmen compensation claim', x: claim, t: {} });
      if (claim <= r.x) crRes.push([r.l, r.x - claim, true]);
      else items.push(['Workmen compensation claim in excess of the reserve', -(claim - r.x)]);
      notes.push(`${r.l} ${rs(r.x)} against a claim of ${rs(claim)}: ${claim <= r.x ? `claim recorded as a liability, the balance ${rs(r.x - claim)} shared by the old partners in the old ratio (${oldSplit(r.x - claim)})` : `the reserve is used up and the excess claim ${rs(claim - r.x)} is a revaluation loss`}.`);
      L.splice(L.indexOf(r), 1);
    } else if (r.t.ifr !== undefined) {
      const fall = r.t.ifr;
      const inv = find(A, r.t.inv);
      check(inv, `no investments line ${r.t.inv}`);
      inv.x -= fall;
      if (fall <= r.x) crRes.push([r.l, r.x - fall, true]);
      else items.push(['Fall in the value of investments in excess of the reserve', -(fall - r.x)]);
      notes.push(`${r.l} ${rs(r.x)}; investments fall by ${rs(fall)} to ${rs(inv.x)}: ${fall <= r.x ? `the reserve absorbs the fall and the balance ${rs(r.x - fall)} goes to the old partners in the old ratio (${oldSplit(r.x - fall)})` : `the reserve is used up and the excess fall ${rs(fall - r.x)} is a revaluation loss`}.`);
      L.splice(L.indexOf(r), 1);
    }
  }
  for (const r of [...A]) {
    if (r.t.loss) {
      drRes.push(['Profit and Loss A/c', r.x]);
      A.splice(A.indexOf(r), 1);
    } else if (r.t.goodwill) {
      drRes.push(['Goodwill A/c (written off)', r.x]);
      A.splice(A.indexOf(r), 1);
    }
  }
  const reval = items.length ? revaluation(items, s.old) : null;

  // Capital account lines (old partners and the new partner).
  const per = (fn) => Object.fromEntries(all.map((n) => [n, fn(n)]));
  const old = (m) => per((n) => (n === newName ? 0 : m[n] ?? 0));
  const cr = [['Balance b/d', old(capB)]];
  const dr = [];
  for (const [l, x] of drRes) dr.push([l, old(Object.fromEntries(names.map((n) => [n, s.old[n].of(x)])))]);
  if (reval && reval.net < 0) dr.push(['Revaluation A/c (loss)', old(reval.parts)]);
  if (reval && reval.net > 0) cr.push(['Revaluation A/c (profit)', old(reval.parts)]);
  for (const [l, x] of crRes) cr.push([l, old(Object.fromEntries(names.map((n) => [n, s.old[n].of(x)])))]);
  const adjusted = Object.fromEntries(names.map((n) => [n, sum(cr.map(([, m]) => m[n])) - sum(dr.map(([, m]) => m[n]))]));
  const adjustedTotal = sum(Object.values(adjusted));

  const bank = A.find((r) => r.t.bank);
  check(bank, 'no bank line');
  const bank0 = bank.x;
  const gw = s.goodwill ?? null;
  let premium = 0;
  let cash = 0;
  let hidden = null;
  let K = s.capital;
  if (K === 'proportionate') {
    // Computed after goodwill below when goodwill changes old capitals; here goodwill is premium in cash only.
    K = null;
  }
  if (gw?.hidden) {
    check(Number.isInteger(K), 'hidden goodwill needs the new partner\'s capital');
    const implied = fr(K).div(R.newShare).of(1);
    const value = implied - (adjustedTotal + K);
    check(value > 0, `no hidden goodwill (${value})`);
    hidden = { implied, actual: adjustedTotal + K, value };
    premium = R.newShare.of(value);
    cash = 0;
  } else if (gw) {
    premium = R.newShare.of(gw.value);
    cash = gw.cash ?? premium;
    check(cash >= 0 && cash <= premium, 'premium brought exceeds the premium');
  }
  const sacParts = (x) => splitRatio(x, names, R.sacInts);
  const cashParts = cash ? sacParts(cash) : null;
  const debitParts = premium - cash ? sacParts(premium - cash) : null;
  if (cashParts) cr.push(['Premium for Goodwill A/c', old(cashParts)]);
  if (debitParts) {
    cr.push([`${newName}'s Capital A/c`, old(debitParts)]);
    for (const n of names) if (debitParts[n]) dr.push([`${n}'s Capital A/c`, { [newName]: debitParts[n] }]);
  }
  if (s.withdraw && cashParts) dr.push(['Bank A/c (premium withdrawn)', old(cashParts)]);
  const afterGw = Object.fromEntries(names.map((n) => [n, sum(cr.map(([, m]) => m[n] ?? 0)) - sum(dr.map(([, m]) => m[n] ?? 0))]));
  const afterGwTotal = sum(Object.values(afterGw));
  if (s.capital === 'proportionate') {
    const oldCombined = sumF(names.map((n) => R.newShares[n]));
    K = R.newShare.mul(afterGwTotal).div(oldCombined).of(1);
  }
  check(Number.isInteger(K) && K > 0, 'new partner capital missing');
  cr.push(['Bank A/c', { [newName]: K }]);

  // Adjustment of the old partners' capitals on the basis of the new partner's capital.
  let adj = null;
  if (s.adjust) {
    const total = fr(K).div(R.newShare).of(1);
    const required = Object.fromEntries(names.map((n) => [n, R.newShares[n].of(total)]));
    const diff = Object.fromEntries(names.map((n) => [n, required[n] - afterGw[n]]));
    adj = { total, required, current: afterGw, diff };
    for (const n of names) {
      if (diff[n] > 0) cr.push([s.adjust === 'cash' ? 'Bank A/c (deficit brought in)' : 'Current A/c (deficit transferred)', { [n]: diff[n] }]);
      if (diff[n] < 0) dr.push([s.adjust === 'cash' ? 'Bank A/c (surplus withdrawn)' : 'Current A/c (surplus transferred)', { [n]: -diff[n] }]);
    }
  }
  // Merge lines with the same particulars (one row per particulars in the columnar account).
  const merge = (side) => {
    const m = new Map();
    for (const [l, v] of side) {
      const cur = m.get(l) ?? {};
      for (const [n, x] of Object.entries(v)) cur[n] = (cur[n] ?? 0) + x;
      m.set(l, cur);
    }
    return [...m.entries()];
  };
  const caps = capitalAccounts(all, merge(dr), merge(cr));
  if (adj) for (const n of names) check(caps.closing[n] === adj.required[n], `${n}'s capital not adjusted to ${adj.required[n]}`);

  // Bank and the new balance sheet.
  bank.x += K + cash;
  if (s.withdraw && cashParts) bank.x -= cash;
  const curLiab = [];
  const curAsset = [];
  if (adj) {
    for (const n of names) {
      if (s.adjust === 'cash') bank.x += adj.diff[n];
      else if (adj.diff[n] < 0) curLiab.push([`${n}'s Current A/c`, -adj.diff[n]]);
      else if (adj.diff[n] > 0) curAsset.push([`${n}'s Current A/c (debit balance)`, adj.diff[n]]);
    }
  }
  check(bank.x >= 0, `bank overdrawn (${bank.x})`);
  const nonCap = L.filter((r) => !r.t.cap);
  const newBS = balanceSheet(
    [...nonCap.map((r) => [r.l, r.x]), ...all.map((n) => [`${n}'s Capital`, caps.closing[n]]), ...curLiab],
    [...A.map((r) => [r.l, r.x]), ...curAsset],
  );
  return { s, R, oldBS, bank0, bankLabel: bank.l, reval, items, crRes, drRes, notes, adjusted, adjustedTotal, afterGw, premium, cash, cashParts, debitParts, hidden, K, adj, caps, bank: bank.x, newBS };
}

// ---------------------------------------------------------------- working notes
/** Working-note lines for the new ratio and the sacrificing ratio. */
export function ratioNotes(R, how) {
  const { names, newName, old, sac, newShares } = R;
  const keep = how.proportion ? fr(1).sub(how.proportion) : null;
  const lines = [];
  if (how.proportion)
    lines.push(`${newName} takes ${how.proportion} from the old partners in their old ratio, so each old partner keeps ${keep} of his or her share: ${names.map((n) => `${n} ${old[n]} × ${keep} = ${newShares[n]}`).join('; ')}; ${newName} ${R.newShare}.`);
  else if (how.surrender)
    lines.push(`Sacrifices: ${names.map((n) => `${n} ${old[n]} × ${how.surrender[n] ?? 0} = ${sac[n]}`).join('; ')}. ${newName}'s share = ${names.filter((n) => !sac[n].zero).map((n) => sac[n]).join(' + ')} = ${R.newShare}. New shares: ${names.map((n) => `${n} ${old[n]} − ${sac[n]} = ${newShares[n]}`).join('; ')}.`);
  else if (how.give)
    lines.push(`New shares: ${names.map((n) => `${n} ${old[n]} − ${sac[n]} = ${newShares[n]}`).join('; ')}; ${newName} ${names.filter((n) => !sac[n].zero).map((n) => sac[n]).join(' + ')} = ${R.newShare}.`);
  else lines.push(`Sacrifice = old share − new share: ${names.map((n) => `${n} ${old[n]} − ${newShares[n]} = ${sac[n]}`).join('; ')}.`);
  lines.push(`New ratio (${R.all.join(' : ')}) = **${ratioStr(R.newInts)}**; sacrificing ratio (${names.join(' : ')}) = **${ratioStr(R.sacInts)}**.`);
  return lines;
}

/** Working notes for a solved admission (see solveAdmission). */
export function admissionNotes(r) {
  const { s, R } = r;
  const lines = [...ratioNotes(R, s.how)];
  const oldR = `old ratio ${ratioStr(R.oldInts)}`;
  if (r.reval) {
    const g = r.items.filter(([, x]) => x > 0).reduce((a, [, x]) => a + x, 0);
    const l = -r.items.filter(([, x]) => x < 0).reduce((a, [, x]) => a + x, 0);
    lines.push(`Revaluation: gains ${rs(g)} − losses ${rs(l)} = ${r.reval.net > 0 ? 'profit' : 'loss'} ${rs(Math.abs(r.reval.net))}, shared in the ${oldR} (${R.names.map((n) => `${n} ${rs(r.reval.parts[n])}`).join(', ')}).`);
  }
  for (const [l, x] of r.crRes.filter((c) => !c[2])) lines.push(`${l} ${rs(x)} is credited to the old partners in the ${oldR} (${R.names.map((n) => `${n} ${rs(s.old[n].of(x))}`).join(', ')}).`);
  for (const [l, x] of r.drRes) lines.push(`${l.replace(' A/c', '').replace(' (written off)', '')} ${rs(x)} is debited to the old partners in the ${oldR} (${R.names.map((n) => `${n} ${rs(s.old[n].of(x))}`).join(', ')}).`);
  lines.push(...r.notes);
  const sacSplit = (parts) => R.names.filter((n) => parts[n]).map((n) => `${n} ${rs(parts[n])}`).join(', ');
  if (r.hidden) {
    lines.push(`Hidden goodwill: ${R.newName}'s capital ${rs(r.K)} for ${R.newShare} share values the firm's capital at ${rs(r.K)} ÷ ${R.newShare} = ${rs(r.hidden.implied)}; actual capital = old partners' adjusted capitals ${rs(r.adjustedTotal)} + ${rs(r.K)} = ${rs(r.hidden.actual)}; hidden goodwill = ${rs(r.hidden.implied)} − ${rs(r.hidden.actual)} = **${rs(r.hidden.value)}**.`);
    lines.push(`${R.newName}'s share = ${rs(r.hidden.value)} × ${R.newShare} = ${rs(r.premium)}, debited to ${R.newName}'s capital and credited to the sacrificing partners in ${ratioStr(R.sacInts)} (${sacSplit(r.debitParts)}).`);
  } else if (r.premium) {
    lines.push(`Premium for goodwill = ${rs(s.goodwill.value)} × ${R.newShare} = **${rs(r.premium)}**, credited to the sacrificing partners in ${ratioStr(R.sacInts)}.`);
    if (r.cash && r.cash < r.premium) lines.push(`${R.newName} brings ${rs(r.cash)} in cash (${sacSplit(r.cashParts)}); the balance ${rs(r.premium - r.cash)} is debited to ${R.newName}'s capital account (${sacSplit(r.debitParts)}).`);
    else if (r.cash) lines.push(`Brought in cash: ${sacSplit(r.cashParts)}${s.withdraw ? '; the old partners withdraw these amounts' : ''}.`);
    else lines.push(`Nothing is brought in cash, so ${R.newName}'s capital account is debited: ${sacSplit(r.debitParts)}.`);
  }
  if (s.capital === 'proportionate') {
    const oc = sumF(R.names.map((n) => R.newShares[n]));
    const tot = fr(sumAmt(r.afterGw)).div(oc).of(1);
    check(R.newShare.of(tot) === r.K, 'proportionate capital working');
    lines.push(`Old partners' capitals after all adjustments = ${R.names.map((n) => rs(r.afterGw[n])).join(' + ')} = ${rs(sumAmt(r.afterGw))} for their combined share ${oc}. Total capital = ${rs(sumAmt(r.afterGw))} ÷ ${oc} = ${rs(tot)}; ${R.newName}'s capital = ${rs(tot)} × ${R.newShare} = **${rs(r.K)}**.`);
  }
  if (r.adj) {
    lines.push(`Total capital on the basis of ${R.newName}'s capital = ${rs(r.K)} ÷ ${R.newShare} = ${rs(r.adj.total)}.`);
    for (const n of R.names) {
      const d = r.adj.diff[n];
      lines.push(`${n}: required ${rs(r.adj.total)} × ${R.newShares[n]} = ${rs(r.adj.required[n])}; adjusted capital ${rs(r.adj.current[n])}; ${d === 0 ? 'no adjustment' : d > 0 ? `deficit ${rs(d)} ${s.adjust === 'cash' ? 'brought in cash' : 'debited to the current account'}` : `surplus ${rs(-d)} ${s.adjust === 'cash' ? 'withdrawn in cash' : 'credited to the current account'}`}.`);
    }
  }
  const bankBits = [[`opening`, r.bank0], [`${R.newName}'s capital`, r.K]];
  if (r.cash) bankBits.push(['premium', r.cash]);
  if (s.withdraw && r.cash) bankBits.push(['premium withdrawn', -r.cash]);
  if (r.adj && s.adjust === 'cash') for (const n of R.names) if (r.adj.diff[n]) bankBits.push([`${n} ${r.adj.diff[n] > 0 ? 'brings' : 'withdraws'}`, r.adj.diff[n]]);
  const bankCalc = bankBits.map(([l, x], i) => `${i === 0 ? '' : x < 0 ? '− ' : '+ '}${rs(Math.abs(x))} (${l})`).join(' ');
  check(bankBits.reduce((a, [, x]) => a + x, 0) === r.bank, 'bank working does not add up');
  lines.push(`${r.bankLabel}: ${bankCalc} = ${rs(r.bank)}.`);
  return lines.map((l, i) => `${i + 1}. ${l}`).join('\n');
}
const sumAmt = (m) => Object.values(m).reduce((a, b) => a + b, 0);

/** Old balance sheet + working notes + the three statements, for a long answer. */
export function admissionAnswer(r, firm) {
  return [
    '**Working notes**',
    admissionNotes(r),
    r.reval ? `**Revaluation Account**\n\n${r.reval.md}` : '',
    `**Partners' Capital Accounts**\n\n${r.caps.md}`,
    `**Balance Sheet of ${firm} (after ${r.R.newName}'s admission)**\n\n${r.newBS.md}`,
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
const ORD = { 2: 'half', 3: 'third', 4: 'fourth', 5: 'fifth', 6: 'sixth', 7: 'seventh', 8: 'eighth', 9: 'ninth', 10: 'tenth', 11: 'eleventh', 12: 'twelfth' };
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
