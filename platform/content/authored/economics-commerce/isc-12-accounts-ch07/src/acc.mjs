// Accounting helpers for isc-12-accounts-ch07 (Issue of Debentures), ISC 2027 Accountancy (858).
// The generic helpers (rupees, Indian number words, fractions, journal, To/By ledger accounts, markdown
// tables) follow isc-12-accounts-ch05; the debenture helpers are written for this chapter on the ISC
// 2027 notes: debentures issued at par, premium or discount, in a lump sum or in instalments; the six
// issue-redemption combinations with Discount on Issue or Loss on Issue of Debentures; capital losses
// written off in the year they arise, first from Securities Premium, then from the Statement of Profit
// and Loss and lastly from Capital Reserve; calls in arrears and calls in advance with interest on them;
// interest on debentures with tax deducted at source; collateral security by both methods; debentures
// to promoters, underwriters and vendors (assets or a business); Schedule III Part I disclosure.
// Every figure is computed from the givens and checked: journal entries balance, ledgers balance, the
// debentures credited on an issue add up to the face value, amount received + loss on issue = face value
// + securities premium + premium on redemption, refunds and calls reconcile with the cash, write-offs
// exhaust the loss in the ISC order, notes to accounts total. Any mismatch throws, so the build stops.
// Redemption of debentures (DRR, DRI, methods) is ISC chapter 8 and has no helper here.

export function fail(msg) {
  throw new Error(`acc: ${msg}`);
}
export function check(ok, what) {
  if (!ok) fail(what);
}

// ---------------------------------------------------------------- numbers and words
/** Indian digit grouping (1,20,000); whole rupees only. */
export const inr = (n) => {
  check(Number.isInteger(n), `not a whole number of rupees: ${n}`);
  return n.toLocaleString('en-IN');
};
export const rs = (n) => `₹${inr(n)}`;
export const sum = (xs) => xs.reduce((a, b) => a + b, 0);

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
/** "nine per cent" */
export const pw = (n) => `${words(n)} per cent`;

// ---------------------------------------------------------------- fractions
const gcd = (a, b) => {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a;
};
export class F {
  constructor(n, d = 1) {
    check(Number.isInteger(n) && Number.isInteger(d) && d !== 0, `bad fraction ${n}/${d}`);
    if (d < 0) [n, d] = [-n, -d];
    const g = gcd(n, d) || 1;
    this.n = n / g;
    this.d = d / g;
  }
  toString() { return this.d === 1 ? String(this.n) : `${this.n}/${this.d}`; }
  /** Whole-rupee share of an amount; throws if it does not divide exactly. */
  of(amount) {
    check((amount * this.n) % this.d === 0, `${this} of ${amount} is not a whole number`);
    return (amount * this.n) / this.d;
  }
}
export const fr = (n, d = 1) => new F(n, d);
/** p per cent of an amount, whole rupees only. */
export const pct = (p, amount) => fr(p, 100).of(amount);
/** Simple interest at p per cent a year for m months, whole rupees only. */
export const interestFor = (amount, p, months) => fr(p * months, 1200).of(amount);

// ---------------------------------------------------------------- tables
/** Markdown table; `num` = indexes of right-aligned (amount) columns. */
export function mdTable(headers, rows, num = []) {
  for (const r of rows) check(r.length === headers.length, `table row has ${r.length} cells, header ${headers.length}`);
  const line = (cells) => `| ${cells.map((c) => (c === '' ? ' ' : c)).join(' | ')} |`;
  const sep = headers.map((_, i) => (num.includes(i) ? '--:' : '---'));
  return [line(headers), line(sep), ...rows.map(line)].join('\n');
}
const amt = (x) => (x === undefined || x === null || x === 0 ? '' : inr(x));
const bold = (s) => `**${s}**`;

/**
 * Journal: entries = [{ date?, dr: [[account, amount]], cr: [[account, amount]], nar }]. Zero lines are
 * dropped; every entry must balance and every amount must be positive. Returns { headers, rows, md, entries }.
 */
export function journal(entries) {
  const dated = entries.some((e) => e.date);
  const rows = [];
  const clean = entries.map((e, i) => {
    const dr = e.dr.filter(([, x]) => x !== 0);
    const cr = e.cr.filter(([, x]) => x !== 0);
    const d = sum(dr.map(([, x]) => x));
    const c = sum(cr.map(([, x]) => x));
    check(d === c && d > 0, `journal entry ${i + 1} does not balance (${d} vs ${c}): ${e.nar}`);
    for (const [a, x] of [...dr, ...cr]) check(Number.isInteger(x) && x > 0, `journal entry ${i + 1}: amount ${x} for ${a}`);
    const pre = (first) => (dated ? [first ? e.date ?? '' : ''] : []);
    dr.forEach(([a, x], k) => rows.push([...pre(k === 0), `${a} Dr.`, inr(x), '']));
    cr.forEach(([a, x]) => rows.push([...pre(false), `To ${a}`, '', inr(x)]));
    rows.push([...pre(false), `*(Being ${e.nar})*`, '', '']);
    return { date: e.date, dr, cr, total: d, nar: e.nar };
  });
  const headers = [...(dated ? ['Date'] : []), 'Particulars', 'Dr (₹)', 'Cr (₹)'];
  return { headers, rows, entries: clean, md: mdTable(headers, rows, dated ? [2, 3] : [1, 2]) };
}

/** Two-sided ledger account (To / By); rows [label, amount] or [date, label, amount]; must balance. */
export function tAccount(dr, cr, { dates = false } = {}) {
  const v = (r) => r[r.length - 1];
  dr = dr.filter((r) => v(r) !== 0);
  cr = cr.filter((r) => v(r) !== 0);
  for (const r of [...dr, ...cr]) check(Number.isInteger(v(r)) && v(r) > 0, `ledger line ${r.join(' ')}`);
  const td = sum(dr.map(v));
  const tc = sum(cr.map(v));
  check(td === tc, `account does not balance (${td} vs ${tc})`);
  const side = (r, pre) => (r ? [...(dates ? [r[0]] : []), `${pre} ${r[dates ? 1 : 0]}`, amt(v(r))] : [...(dates ? [''] : []), '', '']);
  const n = Math.max(dr.length, cr.length);
  const rows = [];
  for (let i = 0; i < n; i++) rows.push([...side(dr[i], 'To'), ...side(cr[i], 'By')]);
  const blank = dates ? [''] : [];
  rows.push([...blank, bold('Total'), bold(inr(td)), ...blank, bold('Total'), bold(inr(tc))]);
  const headers = dates ? ['Date', 'Dr. Particulars', '₹', 'Date', 'Cr. Particulars', '₹'] : ['Dr. Particulars', '₹', 'Cr. Particulars', '₹'];
  return { headers, rows, total: td, md: mdTable(headers, rows, dates ? [2, 5] : [1, 3]) };
}

/**
 * Note to accounts. lines: [label, amount] for an item, or [label, [[sub, amount]…]] for an item shown
 * net of deductions (a negative sub-amount is printed "Less:"). The note total is asserted against `total`.
 */
export function note(title, lines, total) {
  const rows = [];
  let t = 0;
  for (const [label, v] of lines) {
    if (Array.isArray(v)) {
      const net = sum(v.map(([, a]) => a));
      check(net >= 0, `note group "${label}" is negative`);
      rows.push([label, '', '']);
      v.forEach(([s, a], i) => rows.push([a < 0 ? `Less: ${s}` : s, inr(Math.abs(a)), i === v.length - 1 ? (net ? inr(net) : 'Nil') : '']));
      t += net;
    } else {
      check(Number.isInteger(v) && v > 0, `note line ${label} is ${v}`);
      rows.push([label, '', inr(v)]);
      t += v;
    }
  }
  check(total === undefined || t === total, `note "${title}" totals ${t}, expected ${total}`);
  rows.push([bold('Total'), '', bold(inr(t))]);
  const headers = [title, '₹', '₹'];
  return { total: t, headers, rows, md: mdTable(headers, rows, [1, 2]) };
}

/**
 * Extract of a company Balance Sheet (Schedule III Part I, Equity and Liabilities side).
 * heads: [[head, [[label, noteNo, amount]…]]…]; every amount must equal the total of its note if given.
 */
export function bsExtract(title, heads) {
  const rows = [];
  for (const [head, items] of heads) {
    rows.push([bold(head), '', '']);
    for (const [label, n, v] of items) {
      check(Number.isInteger(v) && v > 0, `balance sheet line ${label} is ${v}`);
      rows.push([label, n ?? '', inr(v)]);
    }
  }
  const headers = ['Particulars', 'Note No.', 'Current year (₹)'];
  return { title, headers, rows, md: `${bold(title)}\n\n${mdTable(headers, rows, [2])}` };
}

// ---------------------------------------------------------------- debentures
export const debAc = (rate) => `${rate}% Debentures A/c`;
export const SP = 'Securities Premium A/c';
export const PRD = 'Premium on Redemption of Debentures A/c';
export const LOSS = 'Loss on Issue of Debentures A/c';
export const DISC = 'Discount on Issue of Debentures A/c';
export const CR = 'Capital Reserve A/c';
export const PL = 'Statement of Profit and Loss';

/**
 * One lot of debentures: n debentures of `face` each at `iss` per cent premium (+) or discount (−),
 * redeemable at `red` per cent premium (0 = at par). Discount alone is debited to Discount on Issue of
 * Debentures; with a premium on redemption, discount and that premium go together to Loss on Issue.
 */
export function lot({ n, face = 100, rate, iss = 0, red = 0 }) {
  check(Number.isInteger(n) && n > 0 && red >= 0, `lot n=${n} red=${red}`);
  const nominal = n * face;
  const premPer = iss > 0 ? pct(iss, face) : 0;
  const discPer = iss < 0 ? pct(-iss, face) : 0;
  const redPer = red > 0 ? pct(red, face) : 0;
  const price = face + premPer - discPer;
  const premium = n * premPer;
  const discount = n * discPer;
  const redPremium = n * redPer;
  const received = n * price;
  check(received === nominal + premium - discount, 'lot amount received');
  const loss = discount + redPremium;
  check(received + loss === nominal + premium + redPremium, 'issue identity: received + loss = face + premium + redemption premium');
  const lossAc = redPremium ? LOSS : discount ? DISC : null;
  return { n, face, rate, iss, red, nominal, premPer, discPer, redPer, price, premium, discount, redPremium, received, repayable: nominal + redPremium, loss, lossAc, deb: debAc(rate) };
}

/** ", issued at a premium of 10% and redeemable at par" style phrase. */
export function terms(L) {
  const i = L.iss > 0 ? `a premium of ${L.iss}%` : L.iss < 0 ? `a discount of ${-L.iss}%` : 'par';
  const r = L.red > 0 ? `a premium of ${L.red}%` : 'par';
  return `issued at ${i} and redeemable at ${r}`;
}

/** The allotment (or vendor) entry of a whole lot: `debit` for the amount receivable, the loss debited; debentures, premium and redemption premium credited. */
export function lotEntry(L, debit, nar, date) {
  return {
    date,
    dr: [[debit, L.received], ...(L.loss ? [[L.lossAc, L.loss]] : [])],
    cr: [[L.deb, L.nominal], ...(L.premium ? [[SP, L.premium]] : []), ...(L.redPremium ? [[PRD, L.redPremium]] : [])],
    nar,
  };
}

/**
 * Lump-sum issue for cash: the whole issue price payable with the application. Over-subscription is
 * refunded. Returns the entries and the cash kept.
 */
export function lumpSum(L, { applied = L.n, date } = {}) {
  check(applied >= L.n, 'applications at least the debentures allotted');
  const AA = 'Debenture Application and Allotment A/c';
  const got = applied * L.price;
  const refund = got - L.received;
  const entries = [
    { date, dr: [['Bank A/c', got]], cr: [[AA, got]], nar: `application money received on ${inr(applied)} debentures at ₹${inr(L.price)} each` },
    lotEntry(L, AA, `allotment of ${inr(L.n)} ${L.rate}% debentures of ₹${inr(L.face)} each, ${terms(L)}`, date),
    ...(refund ? [{ date, dr: [[AA, refund]], cr: [['Bank A/c', refund]], nar: `application money refunded on ${inr(applied - L.n)} debentures` }] : []),
  ];
  return { got, refund, cash: got - refund, entries };
}

/**
 * Issue in instalments. per = { app, allot, call? } per debenture; the premium is collected with the
 * allotment money and a discount is allowed at allotment. Options:
 *   applied           debentures applied for (excess application money refunded)
 *   arrears = { allot?: k, call?: k }    debentures on which that instalment is not paid (Calls in Arrears)
 *   advance = k       debentures on which the call money is paid with the allotment (Calls in Advance)
 *   dates = { app, allot, call }
 * Asserts: per-debenture instalments = issue price; debentures credited = face value; cash received
 * reconciles with the instalments less arrears.
 */
export function instalments(L, { per, applied = L.n, arrears = {}, advance = 0, dates = {} }) {
  const { app, allot, call = 0 } = per;
  check(app + allot + call === L.price, `instalments ${app} + ${allot} + ${call} ≠ issue price ${L.price}`);
  check(allot > L.premPer, 'allotment money covers the premium');
  check(!advance || call > 0, 'calls in advance need a call');
  const ArrA = arrears.allot ?? 0;
  const ArrC = arrears.call ?? 0;
  check(ArrA + ArrC + advance <= L.n && !(ArrA && advance), 'arrears and advance within the lot');
  const A = 'Debenture Application A/c';
  const B = 'Debenture Allotment A/c';
  const C = 'Debenture First and Final Call A/c';
  const CA = 'Calls in Arrears A/c';
  const CAD = 'Calls in Advance A/c';
  const appCash = applied * app;
  const refund = (applied - L.n) * app;
  const allotDue = L.n * allot;
  const allotDebCredit = L.n * (allot - L.premPer + L.discPer);
  const callDue = L.n * call;
  const allotArrears = ArrA * allot;
  const advanceCash = advance * call;
  const allotCash = allotDue - allotArrears + advanceCash;
  const callArrears = ArrC * call;
  const callCash = callDue - callArrears - advanceCash;
  const e = [
    { date: dates.app, dr: [['Bank A/c', appCash]], cr: [[A, appCash]], nar: `application money received on ${inr(applied)} debentures at ₹${inr(app)} each` },
    { date: dates.app, dr: [[A, L.n * app]], cr: [[L.deb, L.n * app]], nar: `application money on ${inr(L.n)} debentures transferred to the Debentures Account` },
    ...(refund ? [{ date: dates.app, dr: [[A, refund]], cr: [['Bank A/c', refund]], nar: `application money refunded on ${inr(applied - L.n)} debentures` }] : []),
    {
      date: dates.allot,
      dr: [[B, allotDue], ...(L.loss ? [[L.lossAc, L.loss]] : [])],
      cr: [[L.deb, allotDebCredit], ...(L.premium ? [[SP, L.premium]] : []), ...(L.redPremium ? [[PRD, L.redPremium]] : [])],
      nar: `allotment money due on ${inr(L.n)} debentures at ₹${inr(allot)} each${L.premium ? ' including the premium' : ''}${L.discount ? ' after the discount' : ''}${L.redPremium ? ', with the premium payable on redemption' : ''}`,
    },
    {
      date: dates.allot,
      dr: [['Bank A/c', allotCash], ...(allotArrears ? [[CA, allotArrears]] : [])],
      cr: [[B, allotDue], ...(advanceCash ? [[CAD, advanceCash]] : [])],
      nar: `allotment money received${allotArrears ? ` except on ${inr(ArrA)} debentures` : ''}${advanceCash ? `, with the call money on ${inr(advance)} debentures paid in advance` : ''}`,
    },
  ];
  if (call) {
    e.push({ date: dates.call, dr: [[C, callDue]], cr: [[L.deb, callDue]], nar: `first and final call money due on ${inr(L.n)} debentures at ₹${inr(call)} each` });
    e.push({
      date: dates.call,
      dr: [['Bank A/c', callCash], ...(callArrears ? [[CA, callArrears]] : []), ...(advanceCash ? [[CAD, advanceCash]] : [])],
      cr: [[C, callDue]],
      nar: `first and final call money received${callArrears ? ` except on ${inr(ArrC)} debentures` : ''}${advanceCash ? ', the calls in advance adjusted' : ''}`,
    });
  }
  const debCredited = sum(e.flatMap((x) => x.cr.filter(([a]) => a === L.deb).map(([, v]) => v)));
  check(debCredited === L.nominal, `debentures credited ${debCredited} ≠ face value ${L.nominal}`);
  const cash = appCash - refund + allotCash + (call ? callCash : 0);
  check(cash === L.received - allotArrears - callArrears, 'cash received reconciles with the instalments less arrears');
  return { app, allot, call, appCash, refund, allotDue, allotDebCredit, callDue, allotArrears, callArrears, advanceCash, allotCash, callCash, cash, arrears: allotArrears + callArrears, entries: e, A, B, C, CA, CAD };
}

/** Debentures issued to a vendor for `amount`: the number must be whole. */
export function vendorLot({ amount, face = 100, rate, iss = 0, red = 0 }) {
  const L = lot({ n: 1, face, rate, iss, red });
  check(amount % L.price === 0, `vendor amount ${amount} ÷ price ${L.price} is not a whole number of debentures`);
  const V = lot({ n: amount / L.price, face, rate, iss, red });
  check(V.received === amount, 'vendor lot equals the amount payable');
  return V;
}

/** Purchase of a business (Business Purchase A/c route): goodwill or capital reserve as the balancing figure. */
export function purchase({ assets, liabs, pc, vendor, date }) {
  const A = sum(assets.map(([, v]) => v));
  const Lb = sum(liabs.map(([, v]) => v));
  const net = A - Lb;
  const goodwill = pc > net ? pc - net : 0;
  const capRes = pc < net ? net - pc : 0;
  check(A + goodwill === Lb + pc + capRes, 'purchase entry balances');
  const entries = [
    { date, dr: [['Business Purchase A/c', pc]], cr: [[vendor, pc]], nar: 'purchase consideration payable to the vendor' },
    {
      date,
      dr: [...assets.map(([a, v]) => [`${a} A/c`, v]), ...(goodwill ? [['Goodwill A/c', goodwill]] : [])],
      cr: [...liabs.map(([l, v]) => [`${l} A/c`, v]), ['Business Purchase A/c', pc], ...(capRes ? [[CR, capRes]] : [])],
      nar: 'assets and liabilities of the business taken over',
    },
  ];
  return { A, L: Lb, net, pc, goodwill, capRes, entries };
}

/**
 * Writing off a capital loss in the year it arises (ISC 2027 note): first from Securities Premium (up to
 * `sp`), then from the Statement of Profit and Loss (up to `pl`, unlimited unless given), lastly from
 * Capital Reserve (up to `cr`). The three parts must exhaust the loss.
 */
export function writeOff(loss, { sp = 0, pl = Infinity, cr = 0, ac = LOSS, date } = {}) {
  check(Number.isInteger(loss) && loss > 0 && sp >= 0, 'write-off amounts');
  const fromSP = Math.min(loss, sp);
  const fromPL = Math.min(loss - fromSP, pl);
  const fromCR = loss - fromSP - fromPL;
  check(fromCR <= cr, `capital reserve ${cr} cannot absorb ${fromCR}`);
  check(fromSP + fromPL + fromCR === loss, 'write-off exhausts the loss');
  const what = ac === DISC ? 'discount on issue of debentures' : ac === LOSS ? 'loss on issue of debentures' : ac.replace(/ A\/c$/, '').toLowerCase();
  const srcs = [fromSP && 'securities premium', fromPL && 'the Statement of Profit and Loss', fromCR && 'capital reserve'].filter(Boolean);
  const entry = {
    date,
    dr: [...(fromSP ? [[SP, fromSP]] : []), ...(fromPL ? [[PL, fromPL]] : []), ...(fromCR ? [[CR, fromCR]] : [])],
    cr: [[ac, loss]],
    nar: `${what} written off from ${srcs.length > 1 ? `${srcs.slice(0, -1).join(', ')} and ${srcs[srcs.length - 1]}` : srcs[0]}`,
  };
  return { fromSP, fromPL, fromCR, entry };
}

/**
 * Interest on debentures for `months` at `rate` per cent on the face value, with tax deducted at source
 * at `tds` per cent. Entries: interest due (gross to Debenture Interest; net to the holders; TDS to TDS
 * Payable), paid to the holders, and optionally the TDS deposited with the government.
 */
export function interestTDS({ nominal, rate, months, tds = 10, date, deposit = null, holders = "Debentureholders' A/c" }) {
  const gross = interestFor(nominal, rate, months);
  const tax = pct(tds, gross);
  const net = gross - tax;
  check(net + tax === gross, 'gross interest = net + TDS');
  const entries = [
    { date, dr: [['Debenture Interest A/c', gross]], cr: [[holders, net], ['TDS Payable A/c', tax]], nar: `interest due on ${rate}% debentures for ${months} months and tax deducted at source at ${tds}%` },
    { date, dr: [[holders, net]], cr: [['Bank A/c', net]], nar: 'interest paid to the debentureholders' },
    ...(deposit ? [{ date: deposit, dr: [['TDS Payable A/c', tax]], cr: [['Bank A/c', tax]], nar: 'tax deducted at source deposited with the government' }] : []),
  ];
  return { gross, tax, net, entries };
}
