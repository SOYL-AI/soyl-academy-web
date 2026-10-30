// Accounting helpers for CBSE 12 Accountancy ch07 (Issue of Debentures).
// Every figure in the chapter is computed here and every statement is checked: journal entries
// balance, ledger accounts balance, the debentures credited on an issue add up to the face value,
// amount received + loss on issue = face value + securities premium + premium on redemption,
// write-offs exhaust the loss, notes to accounts total, and amounts are whole rupees. Any mismatch
// throws, so the build stops. Tables are rendered FROM the computed values (Indian digit grouping),
// so no figure is typed twice. Redemption of debentures is not in the 2026-27 syllabus and has no helper.

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
/** "nine per cent" for narration. */
export const perCent = (n) => `${words(n)} per cent`;

// ---------------------------------------------------------------- fractions
const gcd = (a, b) => {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a;
};
export class Fr {
  constructor(n, d = 1) {
    check(Number.isInteger(n) && Number.isInteger(d) && d !== 0, `bad fraction ${n}/${d}`);
    if (d < 0) [n, d] = [-n, -d];
    const g = gcd(n, d) || 1;
    this.n = n / g;
    this.d = d / g;
  }
  /** Share of an amount; must be whole rupees. */
  of(amount) {
    const v = (amount * this.n) / this.d;
    check(Number.isInteger(v), `${this} of ${amount} is not whole rupees (${v})`);
    return v;
  }
  toString() { return this.d === 1 ? `${this.n}` : `${this.n}/${this.d}`; }
}
export const F = (n, d = 1) => (n instanceof Fr ? n : new Fr(n, d));
/** p% of an amount, whole rupees. */
export const pctOf = (amount, p) => F(p, 100).of(amount);

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
 * Each entry must balance and every amount must be positive.
 */
export function journal(entries) {
  const dated = entries.some((e) => e.date);
  const rows = [];
  for (const e of entries) {
    const d = sum(e.dr.map(([, v]) => v));
    const c = sum(e.cr.map(([, v]) => v));
    check(d === c, `journal entry "${e.nar}" debits ${d} ≠ credits ${c}`);
    for (const [, v] of [...e.dr, ...e.cr]) check(Number.isInteger(v) && v > 0, `journal amount ${v} in "${e.nar}"`);
    const pre = (first) => (dated ? [first ? e.date ?? '' : ''] : []);
    e.dr.forEach(([a, v], i) => rows.push([...pre(i === 0), `${a} Dr`, fig(v), '']));
    e.cr.forEach(([a, v]) => rows.push([...pre(false), `To ${a}`, '', fig(v)]));
    rows.push([...pre(false), `*(Being ${e.nar})*`, '', '']);
  }
  const headers = [...(dated ? ['Date'] : []), 'Particulars', 'Dr (₹)', 'Cr (₹)'];
  const n = dated ? [2, 3] : [1, 2];
  return { entries, headers, rows, md: md(headers, rows, n) };
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
 * Note to accounts / balance-sheet extract. lines: [label, amount] for an item, or
 * [label, [[sub, amount]…]] for an item shown net of deductions (negative sub-amounts are "Less:").
 * The net of every group is computed and the note total is asserted against `total` when given.
 */
export function note(title, lines, total) {
  const rows = [];
  let t = 0;
  for (const [label, v] of lines) {
    if (Array.isArray(v)) {
      const net = sum(v.map(([, a]) => a));
      check(net >= 0, `note group "${label}" is negative`);
      rows.push([label, '', '']);
      v.forEach(([s, a], i) => rows.push([a < 0 ? `Less: ${s}` : s, fig(Math.abs(a)), i === v.length - 1 ? (net ? fig(net) : 'Nil') : '']));
      t += net;
    } else {
      rows.push([label, '', fig(v)]);
      t += v;
    }
  }
  if (total !== undefined) check(t === total, `note "${title}" totals ${t}, expected ${total}`);
  rows.push([bold('Total'), '', bold(fig(t))]);
  return { total: t, headers: [title, '₹', '₹'], rows, md: md([title, '₹', '₹'], rows, [1, 2]) };
}

// ---------------------------------------------------------------- debentures
export const debAc = (rate) => `${rate}% Debentures A/c`;
export const SP = 'Securities Premium A/c';
export const PRD = 'Premium on Redemption of Debentures A/c';
export const LOSS = 'Loss on Issue of Debentures A/c';
export const DISC = 'Discount on Issue of Debentures A/c';

/**
 * One lot of debentures: n debentures of `face` each, issued at `iss` per cent premium (+) or
 * discount (−) and redeemable at `red` per cent premium (0 = at par). Returns every amount of the
 * issue and asserts the identity received + loss = face value + securities premium + premium on redemption.
 * With a redemption premium the debit is Loss on Issue of Debentures (discount + redemption premium);
 * with only a discount it is Discount on Issue of Debentures.
 */
export function lot({ n, face = 100, rate, iss = 0, red = 0 }) {
  check(Number.isInteger(n) && n > 0 && red >= 0, `lot n=${n} red=${red}`);
  const nominal = n * face;
  const price = F(face * (100 + iss), 100).of(1);
  const premium = iss > 0 ? pctOf(nominal, iss) : 0;
  const discount = iss < 0 ? pctOf(nominal, -iss) : 0;
  const redPremium = red > 0 ? pctOf(nominal, red) : 0;
  const received = nominal + premium - discount;
  check(received === n * price, `lot received ${received} ≠ ${n} × ${price}`);
  const repayable = nominal + redPremium;
  const loss = discount + redPremium;
  check(received + loss === nominal + premium + redPremium, 'issue identity');
  const lossAc = redPremium ? LOSS : discount ? DISC : null;
  return { n, face, rate, iss, red, nominal, price, premium, discount, redPremium, received, repayable, loss, lossAc, deb: debAc(rate) };
}

/** The allotment entry of a lot: `debit` (the application-and-allotment, allotment or vendor account) and the loss debited; debentures, premium and redemption premium credited. */
export function allotEntry(L, debit, nar, { amount = L.received, date } = {}) {
  check(amount === L.received, 'allotment debit equals the amount receivable');
  return {
    date,
    dr: [[debit, amount], ...(L.loss ? [[L.lossAc, L.loss]] : [])],
    cr: [[L.deb, L.nominal], ...(L.premium ? [[SP, L.premium]] : []), ...(L.redPremium ? [[PRD, L.redPremium]] : [])],
    nar,
  };
}

/**
 * Lump-sum issue for cash (whole amount payable with the application): receipt, allotment and the
 * refund on over-subscription (`applied` debentures applied for). Returns the entries.
 */
export function cashIssue(L, { applied = L.n, date, what } = {}) {
  check(applied >= L.n, 'applications at least the debentures allotted');
  const AA = 'Debenture Application and Allotment A/c';
  const got = applied * L.price;
  const refund = got - L.received;
  return [
    { date, dr: [['Bank A/c', got]], cr: [[AA, got]], nar: `application money received on ${fig(applied)} debentures` },
    allotEntry(L, AA, `allotment of ${fig(L.n)} ${what ?? `${L.rate}% debentures of ₹${fig(L.face)} each`}${termsWords(L)}`, { date }),
    ...(refund ? [{ date, dr: [[AA, refund]], cr: [['Bank A/c', refund]], nar: `application money refunded on ${fig(applied - L.n)} debentures` }] : []),
  ];
}

/**
 * Two-stage issue: `app` per debenture on application, the rest of the issue price on allotment
 * (premium and discount are adjusted at allotment). Excess application money is refunded.
 */
export function stagedIssue(L, { app, applied = L.n, date } = {}) {
  check(app > 0 && app <= L.face && app < L.price, 'application money within face value and issue price');
  const allot = L.price - app;
  const A = 'Debenture Application A/c';
  const B = 'Debenture Allotment A/c';
  const appMoney = applied * app;
  const refund = (applied - L.n) * app;
  const entries = [
    { date, dr: [['Bank A/c', appMoney]], cr: [[A, appMoney]], nar: `application money received on ${fig(applied)} debentures at ₹${fig(app)} each` },
    { date, dr: [[A, L.n * app]], cr: [[L.deb, L.n * app]], nar: `application money on ${fig(L.n)} debentures transferred to the debentures account` },
    ...(refund ? [{ date, dr: [[A, refund]], cr: [['Bank A/c', refund]], nar: `application money refunded on ${fig(applied - L.n)} debentures` }] : []),
    {
      date,
      dr: [[B, L.n * allot], ...(L.loss ? [[L.lossAc, L.loss]] : [])],
      cr: [[L.deb, L.nominal - L.n * app], ...(L.premium ? [[SP, L.premium]] : []), ...(L.redPremium ? [[PRD, L.redPremium]] : [])],
      nar: `allotment money due on ${fig(L.n)} debentures at ₹${fig(allot)} each${termsWords(L)}`,
    },
    { date, dr: [['Bank A/c', L.n * allot]], cr: [[B, L.n * allot]], nar: 'allotment money received' },
  ];
  const debCredited = sum(entries.flatMap((e) => e.cr.filter(([a]) => a === L.deb).map(([, v]) => v)));
  check(debCredited === L.nominal, `debentures credited ${debCredited} ≠ face value ${L.nominal}`);
  return { app, allot, refund, entries };
}

/** ", issued at a premium of 10% and redeemable at par" style phrase from the terms. */
export function termsWords(L) {
  const i = L.iss > 0 ? `a premium of ${L.iss}%` : L.iss < 0 ? `a discount of ${-L.iss}%` : 'par';
  const r = L.red > 0 ? `a premium of ${L.red}%` : 'par';
  return `, issued at ${i} and redeemable at ${r}`;
}

/** Debentures issued to a vendor for `amount`: the number must be whole. */
export function vendorLot({ amount, face = 100, rate, iss = 0, red = 0 }) {
  const price = F(face * (100 + iss), 100).of(1);
  const n = amount / price;
  check(Number.isInteger(n), `vendor amount ${amount} ÷ price ${price} is not a whole number of debentures`);
  const L = lot({ n, face, rate, iss, red });
  check(L.received === amount, 'vendor lot equals the amount payable');
  return L;
}

/** Purchase of a business: assets and liabilities taken over at agreed values; goodwill or capital reserve. */
export function purchase({ assets, liabs, pc, vendor }) {
  const A = sum(assets.map(([, v]) => v));
  const Lb = sum(liabs.map(([, v]) => v));
  const net = A - Lb;
  const goodwill = pc > net ? pc - net : 0;
  const capRes = pc < net ? net - pc : 0;
  check(A + goodwill === Lb + pc + capRes, 'purchase entry balances');
  const entry = {
    dr: [...assets, ...(goodwill ? [['Goodwill A/c', goodwill]] : [])],
    cr: [...liabs, [vendor, pc], ...(capRes ? [['Capital Reserve A/c', capRes]] : [])],
    nar: 'assets and liabilities of the business taken over',
  };
  return { A, L: Lb, net, pc, goodwill, capRes, entry };
}

/** Interest on a face value at `rate` per cent for `months` months, whole rupees. */
export const interest = (nominal, rate, months) => F(rate * months, 1200).of(nominal);

/**
 * Interest entries for a year: periods = [[date, months]…] (each instalment falls due and is paid on
 * its date); transferDate closes Debenture Interest to the Statement of Profit and Loss. TDS is
 * excluded per the syllabus. Returns entries, the per-period amounts, the total and both ledgers.
 */
export function interestYear({ nominal, rate, periods, transferDate, holders = "Debentureholders' A/c" }) {
  const amts = periods.map(([, m]) => interest(nominal, rate, m));
  const total = sum(amts);
  check(total === interest(nominal, rate, sum(periods.map(([, m]) => m))), 'interest instalments add to the interest for the months');
  const entries = [];
  periods.forEach(([d], i) => {
    entries.push({ date: d, dr: [['Debenture Interest A/c', amts[i]]], cr: [[holders, amts[i]]], nar: `interest due on ${rate}% debentures for ${periods[i][1]} months` });
    entries.push({ date: d, dr: [[holders, amts[i]]], cr: [['Bank A/c', amts[i]]], nar: 'interest paid to debentureholders' });
  });
  entries.push({ date: transferDate, dr: [['Statement of Profit and Loss', total]], cr: [['Debenture Interest A/c', total]], nar: 'debenture interest for the year transferred' });
  const intLedger = ledger(periods.map(([d], i) => [d, holders, amts[i]]), [[transferDate, 'Statement of Profit and Loss', total]], { dates: true });
  const holdLedger = ledger(periods.map(([d], i) => [d, 'Bank A/c', amts[i]]), periods.map(([d], i) => [d, 'Debenture Interest A/c', amts[i]]), { dates: true });
  return { amts, total, entries, intLedger, holdLedger };
}

/** Write off a loss (or discount) on issue: first from Securities Premium (up to `sp`), the rest from the Statement of Profit and Loss. */
export function writeOff(loss, sp, { ac = LOSS, date } = {}) {
  check(loss > 0 && sp >= 0, 'write-off amounts');
  const fromSP = Math.min(loss, sp);
  const fromPL = loss - fromSP;
  check(fromSP + fromPL === loss, 'write-off exhausts the loss');
  const entry = {
    date,
    dr: [...(fromSP ? [[SP, fromSP]] : []), ...(fromPL ? [['Statement of Profit and Loss', fromPL]] : [])],
    cr: [[ac, loss]],
    nar: `${ac === DISC ? 'discount' : 'loss'} on issue of debentures written off${fromSP && fromPL ? ', first from securities premium and the balance from the Statement of Profit and Loss' : fromSP ? ' from securities premium' : ''}`,
  };
  return { fromSP, fromPL, entry };
}
