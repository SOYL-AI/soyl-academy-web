// Accounting helpers for isc-12-accounts-ch08 (Redemption of Debentures), ISC 2027 Accountancy (858).
// The generic helpers (rupees, Indian number words, fractions, journal, To/By ledger accounts, notes and
// markdown tables) follow isc-12-accounts-ch07; the redemption helpers are written for this chapter on
// the ISC 2027 scope and Section 71(4) of the Companies Act, 2013 with Rule 18(7) of the Companies (Share
// Capital and Debentures) Rules, 2014 as amended in 2019: who must keep a Debenture Redemption Reserve
// (10% of the value of outstanding debentures, out of profits available for dividend) and who must make
// the Debenture Redemption Investment (at least 15% of the debentures maturing during the year ending on
// the next 31 March, on or before 30 April); redemption out of capital, partly out of profits (the
// statutory 10%) and wholly out of profits (a transfer equal to the face value redeemed); redemption in
// one lump sum at par or at a premium (Premium on Redemption credited when the debentures were issued);
// the reserve moved to General Reserve after redemption; the instalment plan used only to picture
// redemption by draw of lots (concepts only in the ISC 2027 syllabus).
// Every figure is computed from the givens and checked: journal entries balance, the transfer never
// exceeds the surplus available, the investment is at least the minimum, and after a redemption the
// Debentures, Premium on Redemption, Debentureholders, Debenture Redemption Investment and Debenture
// Redemption Reserve accounts all close at nil while the bank moves by exactly the interest earned less
// the amount repaid (never going overdrawn when an opening balance is given). Any mismatch throws.

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
/** "fifteen per cent" */
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

/** Note to accounts: lines [label, amount]; the note total is asserted against `total`. */
export function note(title, lines, total) {
  const rows = [];
  let t = 0;
  for (const [label, v] of lines) {
    check(Number.isInteger(v) && v > 0, `note line ${label} is ${v}`);
    rows.push([label, inr(v)]);
    t += v;
  }
  check(total === undefined || t === total, `note "${title}" totals ${t}, expected ${total}`);
  rows.push([bold('Total'), bold(inr(t))]);
  const headers = [title, '₹'];
  return { total: t, headers, rows, md: mdTable(headers, rows, [1]) };
}

// ---------------------------------------------------------------- ledger
/**
 * A small ledger: opening balances, postings from journal entries (one account on at least one side of
 * each entry, as in a school journal), balances, guards that an account never turns to the wrong side,
 * and To/By rendering with "Balance b/d" and "Balance c/d".
 */
export class Ledger {
  constructor() {
    this.acs = new Map();
    this.guards = [];
  }
  ac(name) {
    if (!this.acs.has(name)) this.acs.set(name, { dr: [], cr: [] });
    return this.acs.get(name);
  }
  open(name, side, amount, date = '') {
    check(side === 'dr' || side === 'cr', `opening side ${side}`);
    if (amount) this.ac(name)[side].push([date, 'Balance b/d', amount]);
    return this;
  }
  /** The account must never go to the other side (a bank never overdrawn, a reserve never debit). */
  guard(name, side) {
    this.guards.push([name, side]);
    return this;
  }
  bal(name) {
    const a = this.acs.get(name);
    if (!a) return 0;
    return sum(a.dr.map((r) => r[2])) - sum(a.cr.map((r) => r[2]));
  }
  post(entries) {
    for (const e of entries) {
      const dr = e.dr.filter(([, x]) => x);
      const cr = e.cr.filter(([, x]) => x);
      check(sum(dr.map(([, x]) => x)) === sum(cr.map(([, x]) => x)), `posting does not balance: ${e.nar}`);
      check(dr.length === 1 || cr.length === 1, `posting needs a single account on one side: ${e.nar}`);
      const d = e.date ?? '';
      if (dr.length === 1) {
        const [A] = dr[0];
        for (const [B, y] of cr) {
          this.ac(A).dr.push([d, B, y]);
          this.ac(B).cr.push([d, A, y]);
        }
      } else {
        const [B] = cr[0];
        for (const [A, x] of dr) {
          this.ac(A).dr.push([d, B, x]);
          this.ac(B).cr.push([d, A, x]);
        }
      }
      for (const [name, side] of this.guards) {
        const b = this.bal(name);
        check(side === 'dr' ? b >= 0 : b <= 0, `${name} turns ${side === 'dr' ? 'credit' : 'debit'} after: ${e.nar}`);
      }
    }
    return this;
  }
  /** To/By account with a closing "Balance c/d" if it does not close at nil. */
  render(name, closeDate = '') {
    const a = this.acs.get(name);
    check(a, `no account ${name}`);
    const dr = a.dr.slice();
    const cr = a.cr.slice();
    const b = this.bal(name);
    if (b > 0) cr.push([closeDate, 'Balance c/d', b]);
    if (b < 0) dr.push([closeDate, 'Balance c/d', -b]);
    return { ...tAccount(dr, cr, { dates: true }), closing: b };
  }
}

// ---------------------------------------------------------------- redemption
export const debAc = (rate) => `${rate}% Debentures A/c`;
export const SURPLUS = 'Surplus, i.e., Balance in Statement of Profit and Loss';
export const DRR = 'Debenture Redemption Reserve A/c';
export const DRI = 'Debenture Redemption Investment A/c';
export const IDRI = 'Interest on Debenture Redemption Investment A/c';
export const GR = 'General Reserve A/c';
export const DH = "Debentureholders' A/c";
export const BANK = 'Bank A/c';
export const PRD = 'Premium on Redemption of Debentures A/c';
export const PL = 'Statement of Profit and Loss';

/**
 * Rule 18(7) of the Companies (Share Capital and Debentures) Rules, 2014, as amended in 2019, reduced to
 * the cases this chapter uses. drr: must keep a Debenture Redemption Reserve of 10% of outstanding
 * debentures; dri: must invest or deposit at least 15% of the debentures maturing during the year.
 */
export const KINDS = {
  aifi: { label: 'All India Financial Institution regulated by the Reserve Bank of India', drr: false, dri: false },
  bank: { label: 'Banking company', drr: false, dri: false },
  nbfc: { label: 'Unlisted NBFC or HFC, debentures privately placed', drr: false, dri: false },
  listed: { label: 'Listed company (other than a bank or financial institution)', drr: false, dri: true },
  unlisted: { label: 'Other unlisted company', drr: true, dri: true },
};
const kindOf = (kind) => {
  const k = KINDS[kind];
  check(k, `unknown company kind ${kind}`);
  return k;
};

/** Minimum DRR (10% of outstanding debentures) and the transfer still needed after `existing`. */
export function drrNeeded({ kind, outstanding, existing = 0 }) {
  const k = kindOf(kind);
  check(Number.isInteger(outstanding) && outstanding > 0 && existing >= 0, 'DRR inputs');
  const required = k.drr ? pct(10, outstanding) : 0;
  const transfer = Math.max(0, required - existing);
  check(existing + transfer >= required && (transfer === 0 || existing + transfer === required), 'DRR reaches the minimum exactly');
  return { required, existing, transfer, after: existing + transfer };
}

/** Minimum DRI: 15% of the debentures maturing during the year ending on the next 31 March. */
export function driNeeded({ kind, maturing }) {
  const k = kindOf(kind);
  check(Number.isInteger(maturing) && maturing >= 0, 'DRI inputs');
  return k.dri ? pct(15, maturing) : 0;
}

/**
 * Redemption of one series in a lump sum at maturity.
 *   n, face, rate        the series (face value 100 unless given)
 *   red                  premium on redemption in per cent of face value (credited to Premium on
 *                        Redemption when the debentures were issued, so it is an opening credit here)
 *   kind                 key of KINDS
 *   source               'capital' (no profits transferred; only for a company exempt from DRR),
 *                        'statutory' (DRR brought up to 10%, partly out of profits) or
 *                        'profits' (DRR brought up to the full face value redeemed)
 *   drrOpen              opening balance of DRR for this series
 *   surplus              surplus available for dividend (the transfer may not exceed it)
 *   dri                  amount invested (default: the 15% minimum, or nil if exempt)
 *   driRate, driMonths   interest earned on the investment (optional)
 *   bankOpen             opening bank balance (optional: then the bank may never be overdrawn)
 *   dates                { drr, dri, due, paid, close }
 *   toGR, toPL           move DRR to General Reserve, and the interest to the Statement of Profit and Loss
 * Asserts that every account closes as it should and that the bank moves by interest − amount repaid.
 */
export function redeem(o) {
  const { n, face = 100, rate, red = 0, kind, source = 'statutory', drrOpen = 0, surplus = Infinity, driRate = 0, driMonths = 0, bankOpen = null, dates = {}, toGR = true, toPL = true, driForm = 'a fixed deposit with a scheduled bank', grOpen = 0 } = o;
  const k = kindOf(kind);
  check(Number.isInteger(n) && n > 0 && red >= 0, `redeem n=${n} red=${red}`);
  const deb = debAc(rate);
  const nominal = n * face;
  const redPremium = n * pct(red, face);
  const repayable = nominal + redPremium;
  let transfer = 0;
  if (source === 'capital') check(!k.drr && drrOpen === 0, 'only a company exempt from DRR can redeem wholly out of capital');
  else if (source === 'statutory') {
    check(k.drr, 'statutory DRR applies to an unlisted company');
    transfer = drrNeeded({ kind, outstanding: nominal, existing: drrOpen }).transfer;
  } else if (source === 'profits') {
    check(drrOpen <= nominal, 'DRR already above the face value');
    transfer = nominal - drrOpen;
  } else fail(`unknown source ${source}`);
  check(transfer <= surplus, `transfer ${transfer} exceeds the surplus available ${surplus}`);
  const drrTotal = drrOpen + transfer;
  check(source !== 'statutory' || drrTotal >= pct(10, nominal), 'statutory DRR at least 10% before redemption');
  check(source !== 'profits' || drrTotal === nominal, 'out of profits: DRR equals the face value redeemed');
  const driMin = driNeeded({ kind, maturing: nominal });
  const driAmt = o.dri ?? driMin;
  check(driAmt >= driMin, `investment ${driAmt} below the 15% minimum ${driMin}`);
  const interest = driAmt && driRate ? interestFor(driAmt, driRate, driMonths) : 0;

  const e = {};
  e.transfer = transfer ? { date: dates.drr, dr: [[SURPLUS, transfer]], cr: [[DRR, transfer]], nar: source === 'profits' ? 'profits transferred so that the reserve equals the face value of the debentures to be redeemed' : 'profits transferred to bring the reserve up to ten per cent of the outstanding debentures' } : null;
  e.invest = driAmt ? { date: dates.dri, dr: [[DRI, driAmt]], cr: [[BANK, driAmt]], nar: `${driAmt === driMin ? 'fifteen per cent' : 'part'} of the debentures maturing this year invested in ${driForm}` } : null;
  e.encash = driAmt ? { date: dates.encash ?? dates.due, dr: [[BANK, driAmt + interest]], cr: [[DRI, driAmt], [IDRI, interest]], nar: `debenture redemption investment encashed${interest ? ` with interest at ${driRate}% a year for ${driMonths} months` : ''}` } : null;
  e.due = { date: dates.due, dr: [[deb, nominal], [PRD, redPremium]], cr: [[DH, repayable]], nar: `amount due on redemption of ${inr(n)} ${rate}% debentures ${red ? `at a premium of ${red}%` : 'at par'}` };
  e.paid = { date: dates.paid ?? dates.due, dr: [[DH, repayable]], cr: [[BANK, repayable]], nar: 'payment made to the debentureholders' };
  e.toGR = drrTotal && toGR ? { date: dates.close ?? dates.paid ?? dates.due, dr: [[DRR, drrTotal]], cr: [[GR, drrTotal]], nar: 'debenture redemption reserve transferred to general reserve after the redemption' } : null;
  e.toPL = interest && toPL ? { date: dates.close ?? dates.paid ?? dates.due, dr: [[IDRI, interest]], cr: [[PL, interest]], nar: 'interest on the investment transferred' } : null;
  const entries = ['transfer', 'invest', 'encash', 'due', 'paid', 'toGR', 'toPL'].map((x) => e[x]).filter(Boolean);
  journal(entries); // balance check

  const led = new Ledger();
  const d0 = dates.open ?? '';
  led.open(deb, 'cr', nominal, d0).open(PRD, 'cr', redPremium, d0).open(DRR, 'cr', drrOpen, d0).open(GR, 'cr', grOpen, d0);
  if (surplus !== Infinity) led.open(SURPLUS, 'cr', surplus, d0).guard(SURPLUS, 'cr');
  if (bankOpen !== null) led.open(BANK, 'dr', bankOpen, d0).guard(BANK, 'dr');
  led.guard(DRR, 'cr').guard(DH, 'cr').guard(DRI, 'dr');
  led.post(entries);
  check(led.bal(deb) === 0, 'Debentures Account closes at nil');
  check(led.bal(PRD) === 0, 'Premium on Redemption closes at nil');
  check(led.bal(DH) === 0, "Debentureholders' Account closes at nil");
  check(led.bal(DRI) === 0, 'Debenture Redemption Investment closes at nil');
  check(!toGR || led.bal(DRR) === 0, 'Debenture Redemption Reserve closes at nil');
  check(!toGR || -led.bal(GR) === grOpen + drrTotal, 'General Reserve receives the whole reserve');
  check(!toPL || led.bal(IDRI) === 0, 'interest account closes to the Statement of Profit and Loss');
  const bankNet = led.bal(BANK) - (bankOpen ?? 0);
  check(bankNet === interest - repayable, 'bank moves by interest earned less the amount repaid');
  return { n, face, rate, red, kind, source, deb, nominal, redPremium, repayable, drrOpen, transfer, drrTotal, driMin, driAmt, interest, bankNet, bankClose: bankOpen === null ? null : led.bal(BANK), e, entries, led };
}

/** Profits kept back in reserves (not distributable as dividend before redemption) under each source. */
export function retained(nominal, source) {
  if (source === 'capital') return 0;
  if (source === 'statutory') return pct(10, nominal);
  if (source === 'profits') return nominal;
  return fail(`unknown source ${source}`);
}

/**
 * Picture of redemption in equal annual instalments (draw of lots, concepts only): the face value drawn
 * each year, the debentures outstanding after the draw, and the 15% investment kept for that year.
 */
export function instalmentPlan({ total, years, first }) {
  check(Number.isInteger(years) && years > 0 && total % years === 0, 'equal instalments');
  const each = total / years;
  const rows = [];
  let out = total;
  for (let i = 0; i < years; i++) {
    const before = out;
    out -= each;
    rows.push({ year: first + i, before, instalment: each, after: out, dri: pct(15, each) });
  }
  check(out === 0 && sum(rows.map((r) => r.instalment)) === total, 'instalments add up to the issue');
  return { each, rows };
}
