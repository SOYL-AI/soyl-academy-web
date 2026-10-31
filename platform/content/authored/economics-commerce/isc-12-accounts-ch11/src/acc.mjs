// Cash-flow engine for ISC 12 Accounts ch11 (Cash Flow Statement, AS 3 revised, indirect method only).
// Same approach as the CBSE 12 Accountancy ch11 engine (two comparative balance sheets in, a checked
// statement out), rewritten and extended for the ISC 2027 topics: previous year's proposed dividend paid
// (an outflow) and the current year's proposed dividend (no effect, a contingent liability); interim
// dividend; share issue expenses and premium on redemption written off against securities premium;
// redemption of preference shares and debentures; loans given; provision for doubtful debts.
//
// cashFlow() works the way a student must, and asserts every step:
//   1. both balance sheets balance (accumulated depreciation and provision for doubtful debts deducted);
//   2. working accounts for every fixed asset (at cost with an accumulated depreciation account, or at
//      written-down value), every investment, the provision for tax and, when it has debits, securities
//      premium; each finds ONE balancing figure, which must not be negative, and each account is asserted
//      to balance (debit total = credit total);
//   3. net profit before tax = change in surplus + transfers to reserves + dividends paid this year
//      (previous year's proposed and this year's interim) + provision for tax made (+ bonus out of surplus);
//      the current year's proposed dividend is recorded but never enters any figure;
//   4. operating: add back depreciation, amortisation, losses on sale, an increase in provision for doubtful
//      debts and finance costs; deduct profits on sale and interest and dividend received; working-capital
//      changes; income tax paid;
//   5. investing and financing sections; non-cash transactions (shares to a vendor, bonus shares) kept out;
//   6. THE CASH CHECK: A + B + C must equal closing minus opening cash and cash equivalents.
// Every balance sheet line must be consumed by exactly one treatment. Optional pins (hand-checked values)
// catch a wrong datum. Tables are rendered FROM the computed values (Indian digit grouping).

export function check(ok, what) {
  if (!ok) throw new Error(`accounting check failed: ${what}`);
}

// ---------------------------------------------------------------- numbers and words
const IN = new Intl.NumberFormat('en-IN');
/** 120000 -> "1,20,000"; a negative amount (an outflow or a deduction) -> "(6,000)". Throws on a non-integer. */
export function fig(n) {
  check(Number.isInteger(n), `non-integer amount ${n}`);
  return n < 0 ? `(${IN.format(-n)})` : IN.format(n);
}
/** 120000 -> "₹1,20,000". */
export const rs = (n) => (n < 0 ? `(₹${fig(-n)})` : `₹${fig(n)}`);
export const sum = (xs) => xs.reduce((a, b) => a + b, 0);
/** A whole-rupee percentage of an amount (rate may be fractional, e.g. 7.5). */
export function pctOf(rate, amount) {
  const v = (amount * rate) / 100;
  check(Number.isInteger(v), `${rate}% of ${amount} is not whole rupees`);
  return v;
}
/** Interest for `months` of a year at `rate` % on `amount`, whole rupees asserted. */
export function interest(rate, amount, months = 12) {
  const v = (amount * rate * months) / 1200;
  check(Number.isInteger(v), `interest ${rate}% on ${amount} for ${months} months is not whole rupees`);
  return v;
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
/** "rupees one lakh twenty thousand" for narration (absolute value). */
export const rupees = (n) => `rupees ${words(Math.abs(n))}`;

// ---------------------------------------------------------------- markdown tables
/** Markdown table; `num` = indexes of right-aligned (amount) columns. */
export function md(headers, rows, num = []) {
  for (const r of rows) check(r.length === headers.length, `table row has ${r.length} cells, header ${headers.length}`);
  const sep = headers.map((_, i) => (num.includes(i) ? '---:' : '---'));
  const line = (cells) => `| ${cells.map((c) => (c === '' ? ' ' : c)).join(' | ')} |`;
  return [line(headers), line(sep), ...rows.map(line)].join('\n');
}
export const bold = (s) => `**${s}**`;
/** Given balances as a two-column table for a stem. */
export const given = (items, head = 'Particulars') => md([head, '₹'], items.map(([l, v]) => [l, fig(v)]), [1]);
/** Two-year extract for a stem: rows = [[label, opening, closing]] shown current year first. */
export const extract = (rows, dates = ['31 March 2026', '31 March 2025']) =>
  md(['Particulars', `${dates[0]} (₹)`, `${dates[1]} (₹)`], rows.map(([l, a, b]) => [l, b === null ? '—' : fig(b), a === null ? '—' : fig(a)]), [1, 2]);
/** "a + b − c = d" from signed terms, asserted. */
export function chain(terms, total, what) {
  check(sum(terms) === total, `${what}: chain ${terms.join(', ')} ≠ ${total}`);
  return `${terms.map((v, i) => (i === 0 ? fig(v) : v < 0 ? `− ${fig(-v)}` : `+ ${fig(v)}`)).join(' ')} = ${fig(total)}`;
}

// ---------------------------------------------------------------- ledger (working) accounts
/**
 * A T-account as a four-column table. dr / cr = [[particulars, amount]] (zero lines dropped). Asserts that
 * every amount is a whole, non-negative number and that the two sides total the same.
 */
export function ledger(title, dr, cr) {
  const d = dr.filter((x) => x[1] !== 0);
  const c = cr.filter((x) => x[1] !== 0);
  for (const [l, v] of [...d, ...c]) check(Number.isInteger(v) && v >= 0, `${title}: "${l}" is ${v}`);
  const td = sum(d.map((x) => x[1]));
  const tc = sum(c.map((x) => x[1]));
  check(td === tc, `${title} does not balance: debit ${td}, credit ${tc}`);
  const n = Math.max(d.length, c.length);
  const rows = [];
  for (let i = 0; i < n; i++) rows.push([d[i]?.[0] ?? '', d[i] ? fig(d[i][1]) : '', c[i]?.[0] ?? '', c[i] ? fig(c[i][1]) : '']);
  rows.push([bold('Total'), bold(fig(td)), bold('Total'), bold(fig(tc))]);
  const headers = ['Dr: Particulars', '₹', 'Cr: Particulars', '₹'];
  return { title, dr: d, cr: c, total: td, headers, rows, md: `${bold(title)}\n\n${md(headers, rows, [1, 3])}` };
}
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
/** "non-current investments" -> "Non-current Investments" (for account titles). */
const titled = (s) => s.split(' ').map((w, i) => (i && ['and', 'of', 'on', 'in'].includes(w) ? w : cap(w))).join(' ');

/**
 * A fixed asset. Gross basis (accumulated depreciation `acc` = [opening, closing] given): the asset account
 * is at cost; the asset sold leaves at cost against its accumulated depreciation, the sale proceeds and the
 * profit or loss. Net basis (no `acc`): the account is at written-down value and is credited with the
 * year's depreciation. Exactly one of purchase / dep is the balancing figure.
 * sold = { cost, accDep, price } (gross) or { bv, price } (net); vendor = assets received for shares.
 */
export function fixedAsset({ name, title, a, b, acc = null, dep = null, purchase = null, sold = null, vendor = 0 }) {
  const t = title ?? `${titled(name)} Account`;
  const bv = sold ? (acc ? sold.cost - sold.accDep : sold.bv) : 0;
  const price = sold ? sold.price : 0;
  const gain = price - bv;
  if (sold) check(Number.isInteger(bv) && bv >= 0 && Number.isInteger(price) && price >= 0, `${name}: sale figures`);
  const r = { name, a, b, acc, sold, vendor, bv, price, gain, profit: Math.max(gain, 0), loss: Math.max(-gain, 0) };
  if (acc) {
    check(sold === null || (sold.cost >= sold.accDep && sold.accDep >= 0), `${name}: asset sold`);
    const accSold = sold ? sold.accDep : 0;
    const cost = sold ? sold.cost : 0;
    r.purchase = purchase ?? b + cost - a - vendor;
    if (purchase !== null) check(a + purchase + vendor - cost === b, `${name}: given purchase does not reconcile the asset account`);
    check(r.purchase >= 0, `${name}: purchase ${r.purchase} is negative`);
    r.dep = dep ?? acc[1] + accSold - acc[0];
    if (dep !== null) check(acc[0] + dep - accSold === acc[1], `${name}: given depreciation does not reconcile accumulated depreciation`);
    check(r.dep >= 0, `${name}: depreciation ${r.dep} is negative`);
    r.ledger = ledger(t, [
      ['Balance b/d', a],
      [`Bank A/c (purchase${purchase === null ? ', balancing figure' : ''})`, r.purchase],
      ['Equity Share Capital A/c (issued to the vendor)', vendor],
      ['Statement of Profit and Loss (profit on sale)', r.profit],
    ], [
      [`Accumulated Depreciation A/c (on the ${name} sold)`, accSold],
      ['Bank A/c (sale proceeds)', price],
      ['Statement of Profit and Loss (loss on sale)', r.loss],
      ['Balance c/d', b],
    ]);
    r.accLedger = ledger(`Accumulated Depreciation on ${titled(name)} Account`, [
      [`${titled(name)} A/c (transfer on sale)`, accSold],
      ['Balance c/d', acc[1]],
    ], [
      ['Balance b/d', acc[0]],
      [`Statement of Profit and Loss (depreciation for the year${dep === null ? ', balancing figure' : ''})`, r.dep],
    ]);
  } else {
    check(purchase === null || dep === null, `${name}: purchase and depreciation cannot both be given`);
    if (purchase === null) {
      check(dep !== null, `${name}: written-down value basis needs depreciation or purchase`);
      r.dep = dep;
      r.purchase = b + bv + dep - a - vendor;
    } else {
      r.purchase = purchase;
      r.dep = a + purchase + vendor - bv - b;
    }
    check(r.purchase >= 0 && r.dep >= 0, `${name}: purchase ${r.purchase}, depreciation ${r.dep}`);
    r.ledger = ledger(t, [
      ['Balance b/d', a],
      [`Bank A/c (purchase${purchase === null ? ', balancing figure' : ''})`, r.purchase],
      ['Equity Share Capital A/c (issued to the vendor)', vendor],
      ['Statement of Profit and Loss (profit on sale)', r.profit],
    ], [
      ['Bank A/c (sale proceeds)', price],
      ['Statement of Profit and Loss (loss on sale)', r.loss],
      [`Depreciation A/c (for the year${purchase === null ? '' : ', balancing figure'})`, r.dep],
      ['Balance c/d', b],
    ]);
  }
  return r;
}

/** Investments account: the purchase is the balancing figure unless given. sold = { cost, price }. */
export function investAccount({ name, title, a, b, sold = null, purchase = null }) {
  const cost = sold ? sold.cost : 0;
  const price = sold ? sold.price : 0;
  const gain = price - cost;
  const p = purchase ?? b + cost - a;
  if (purchase !== null) check(a + purchase - cost === b, `${name}: given purchase does not reconcile`);
  check(p >= 0, `${name}: purchase ${p} is negative`);
  const r = { name, a, b, sold, cost, price, gain, profit: Math.max(gain, 0), loss: Math.max(-gain, 0), purchase: p };
  r.ledger = ledger(title ?? `${titled(name)} Account`, [
    ['Balance b/d', a],
    [`Bank A/c (purchase${purchase === null ? ', balancing figure' : ''})`, p],
    ['Statement of Profit and Loss (profit on sale)', r.profit],
  ], [
    ['Bank A/c (sale proceeds)', price],
    ['Statement of Profit and Loss (loss on sale)', r.loss],
    ['Balance c/d', b],
  ]);
  return r;
}

/** Provision for tax account: tax paid is the balancing figure, unless paid is given (then the provision is). */
export function taxAccount({ a, b, provided = null, paid = null, title = 'Provision for Tax Account' }) {
  check((provided === null) !== (paid === null), 'tax: give exactly one of provided / paid');
  const r = { a, b };
  r.provided = provided ?? b + paid - a;
  r.paid = paid ?? a + provided - b;
  check(r.provided >= 0 && r.paid >= 0, `tax: provided ${r.provided}, paid ${r.paid}`);
  r.ledger = ledger(title, [
    [`Bank A/c (tax paid${paid === null ? ', balancing figure' : ''})`, r.paid],
    ['Balance c/d', b],
  ], [
    ['Balance b/d', a],
    [`Statement of Profit and Loss (provision for the year${provided === null ? ', balancing figure' : ''})`, r.provided],
  ]);
  return r;
}

/**
 * Securities premium account. debits = [[label, amount]] (issue expenses written off, premium on
 * redemption, bonus); the premium received on shares issued for cash is the balancing figure unless given.
 */
export function premiumAccount({ a, b, debits = [], received = null, title = 'Securities Premium Account' }) {
  const out = sum(debits.map((x) => x[1]));
  const r = { a, b, debits, received: received ?? b + out - a };
  if (received !== null) check(a + received - out === b, 'securities premium: given premium does not reconcile');
  check(r.received >= 0, `securities premium received ${r.received}`);
  r.ledger = ledger(title, [...debits, ['Balance c/d', b]], [['Balance b/d', a], [`Bank A/c (premium on shares issued${received === null ? ', balancing figure' : ''})`, r.received]]);
  return r;
}

// ---------------------------------------------------------------- the statement (indirect method)
/** Working-capital change line: [text, signed effect on cash]. side 'A' = current asset, 'L' = current liability. */
export function wcLine(name, a, b, side) {
  const d = b - a;
  if (d === 0) return null;
  const up = d > 0;
  const effect = side === 'A' ? -d : d;
  const text = side === 'A' ? (up ? `Less: Increase in ${name}` : `Add: Decrease in ${name}`) : up ? `Add: Increase in ${name}` : `Less: Decrease in ${name}`;
  return [text, effect];
}

/**
 * Operating activities from net profit before tax. adds / less = [[label, amount]] (amounts positive);
 * wc = [[name, opening, closing, 'A' | 'L']]; taxPaid = amount.
 */
export function operating({ npbt, adds = [], less = [], wc = [], taxPaid = 0 }) {
  for (const [l, v] of [...adds, ...less]) check(Number.isInteger(v) && v > 0, `operating: "${l}" = ${v}`);
  const opbwc = npbt + sum(adds.map((x) => x[1])) - sum(less.map((x) => x[1]));
  const wcRows = wc.map(([n, a, b, s]) => wcLine(n, a, b, s)).filter(Boolean);
  const cashGen = opbwc + sum(wcRows.map((x) => x[1]));
  const A = cashGen - taxPaid;
  const rows = [
    [bold('A. Cash flows from operating activities'), null, null],
    ['Net profit before tax', npbt, null],
    ...adds.map(([l, v]) => [`Add: ${l}`, v, null]),
    ...less.map(([l, v]) => [`Less: ${l}`, -v, null]),
    [bold('Operating profit before working capital changes'), opbwc, null],
    ...wcRows.map(([l, v]) => [l, v, null]),
    [bold('Cash generated from operations'), cashGen, null],
  ];
  if (taxPaid) rows.push(['Less: Income tax paid', -taxPaid, null]);
  rows.push([bold(`Net cash ${A >= 0 ? 'from' : 'used in'} operating activities`), null, A]);
  return { npbt, adds, less, opbwc, wcRows, cashGen, taxPaid, A, rows };
}
/** Investing or financing section: items = [[label, signed amount]]. */
export function section(letter, head, items) {
  const tot = sum(items.map((x) => x[1]));
  for (const [l, v] of items) check(Number.isInteger(v) && v !== 0, `${head}: "${l}" = ${v}`);
  const rows = [[bold(`${letter}. Cash flows from ${head} activities`), null, null], ...items.map(([l, v]) => [l, v, null]), [bold(`Net cash ${tot >= 0 ? 'from' : 'used in'} ${head} activities`), null, tot]];
  return { items, total: tot, rows };
}
const cell = (v, b) => (v === null ? '' : b ? bold(fig(v)) : fig(v));
/** Statement rows [text, inner, outer] to a three-column table (outflows in brackets). */
export function stmtTable(rows) {
  const out = rows.map(([t, i, o]) => [t, cell(i, /^\*\*/.test(t) && o === null), cell(o, /^\*\*/.test(t))]);
  return { headers: ['Particulars', '₹', '₹'], rows: out, md: md(['Particulars', '₹', '₹'], out, [1, 2]) };
}
/** The closing lines: net change, opening and closing cash and cash equivalents (asserted). */
export function closingRows(D, open, close) {
  check(open + D === close, `cash check: opening ${open} + net change ${D} ≠ closing ${close}`);
  return [
    [bold(`Net ${D >= 0 ? 'increase' : 'decrease'} in cash and cash equivalents (A + B + C)`), null, D],
    ['Add: Cash and cash equivalents at the beginning of the year', null, open],
    [bold('Cash and cash equivalents at the end of the year'), null, close],
  ];
}

// ---------------------------------------------------------------- comparative balance sheets
// Line kinds: sc equity share capital · psc preference share capital · sp securities premium · gr a reserve
// built out of profit (general reserve, capital redemption reserve) · surplus balance in the Statement of
// Profit and Loss · ltb long-term borrowings (debentures, loans) · stb short-term borrowings · wcL trade
// payables and other current liabilities · tax provision for tax · ppe fixed asset (at cost if an accdep line
// names it, else at written-down value) · accdep accumulated depreciation (deducted) · intang intangible
// asset · inv investments (non-current, or current but not a cash equivalent: opts.current) · lta long-term
// loans and advances given · wcA inventories, trade receivables, prepaid expenses · pdd provision for
// doubtful debts (deducted from the receivables line named by opts.of) · cce cash and cash equivalents.
const EL = ['sc', 'psc', 'sp', 'gr', 'surplus', 'ltb', 'stb', 'wcL', 'tax'];
const AS = ['ppe', 'accdep', 'intang', 'inv', 'lta', 'wcA', 'pdd', 'cce'];
const NEG = ['accdep', 'pdd'];
const HEADS = [
  ['el', "Shareholders' funds", (l) => ['sc', 'psc', 'sp', 'gr', 'surplus'].includes(l.kind)],
  ['el', 'Non-current liabilities', (l) => l.kind === 'ltb'],
  ['el', 'Current liabilities', (l) => ['stb', 'wcL', 'tax'].includes(l.kind)],
  ['as', 'Non-current assets', (l) => ['ppe', 'accdep', 'intang', 'lta'].includes(l.kind) || (l.kind === 'inv' && !l.current)],
  ['as', 'Current assets', (l) => (l.kind === 'inv' && l.current) || ['wcA', 'pdd', 'cce'].includes(l.kind)],
];

/**
 * lines: [[key, label, kind, opening, closing, opts?]] (opts: { name, of, current });
 * info: { fa: {key: {dep, purchase, sold, vendor}}, invest: {key: {sold, purchase}}, intang: {key: {writtenOff,
 * purchase}}, lta: {key: {given, recovered}}, tax: {key: {provided | paid}}, taxPaidNoProvision: [[label, v]],
 * interestPaid, interestReceived, dividendReceived, dividendPaid: [[label, amount]], proposed: {label, amount},
 * ltb: {key: {raised, repaid, premium, raisedLabel, repaidLabel}}, psc: {key: {redeemed, premium, issued}},
 * issueExpenses, bonus: {amount, from}, sharesLabel };
 * pins: { npbt, A, B, C, D } hand-checked.
 */
export function cashFlow({ name, dates = ['31 March 2026', '31 March 2025'], lines, info = {}, pins = {} }) {
  const L = lines.map(([k, label, kind, a, b, o = {}]) => ({ k, label, kind, a, b, name: o.name ?? label.replace(/\s*\(.*?\)\s*/g, ' ').trim().toLowerCase(), of: o.of, current: !!o.current }));
  const byKey = Object.fromEntries(L.map((l) => [l.k, l]));
  check(Object.keys(byKey).length === L.length, `${name}: duplicate line keys`);
  for (const l of L) check(EL.includes(l.kind) || AS.includes(l.kind), `${name}: unknown kind ${l.kind}`);
  for (const l of L) check(Number.isInteger(l.a) && Number.isInteger(l.b) && l.a >= 0 && l.b >= 0, `${name}: line ${l.k}`);
  // 1. Both balance sheets balance.
  const side = (pick) => {
    const el = sum(L.filter((l) => EL.includes(l.kind)).map(pick));
    const as = sum(L.filter((l) => AS.includes(l.kind)).map((l) => (NEG.includes(l.kind) ? -pick(l) : pick(l))));
    return [el, as];
  };
  const [elA, asA] = side((l) => l.a);
  const [elB, asB] = side((l) => l.b);
  check(elA === asA, `${name}: opening balance sheet ${elA} vs ${asA} (difference ${elA - asA})`);
  check(elB === asB, `${name}: closing balance sheet ${elB} vs ${asB} (difference ${elB - asB})`);
  const used = new Set();
  const use = (l) => { check(!used.has(l.k), `${name}: line ${l.k} used twice`); used.add(l.k); };
  const of = (kind) => L.filter((l) => l.kind === kind);

  const adds = [];
  const less = [];
  const inv = [];
  const fin = [];
  const ledgers = [];
  let vendorShares = 0;
  // 2. Fixed assets.
  for (const l of of('ppe')) {
    use(l);
    const accL = L.find((x) => x.kind === 'accdep' && x.of === l.k);
    if (accL) use(accL);
    const o = info.fa?.[l.k] ?? {};
    const f = fixedAsset({ name: l.name, a: l.a, b: l.b, acc: accL ? [accL.a, accL.b] : null, dep: o.dep ?? null, purchase: o.purchase ?? null, sold: o.sold ?? null, vendor: o.vendor ?? 0 });
    l.fa = f;
    vendorShares += f.vendor;
    if (f.sold || f.vendor || accL || o.showLedger) ledgers.push(f.ledger);
    if (f.accLedger) ledgers.push(f.accLedger);
    if (f.dep) adds.push([`Depreciation on ${f.name}`, f.dep]);
    if (f.loss) adds.push([`Loss on sale of ${f.name}`, f.loss]);
    if (f.profit) less.push([`Profit on sale of ${f.name}`, f.profit]);
    if (f.purchase) inv.push([`Purchase of ${f.name}`, -f.purchase]);
    if (f.price) inv.push([`Proceeds from sale of ${f.name}`, f.price]);
  }
  for (const l of of('accdep')) check(used.has(l.k), `${name}: accumulated depreciation ${l.k} not linked to an asset`);
  // Intangibles: a decrease is written off (amortised) unless stated otherwise.
  for (const l of of('intang')) {
    use(l);
    const o = info.intang?.[l.k] ?? {};
    const off = o.writtenOff ?? Math.max(l.a - l.b, 0);
    const buy = o.purchase ?? l.b - l.a + off;
    check(off >= 0 && buy >= 0 && l.a + buy - off === l.b, `${name}: intangible ${l.k}`);
    if (off) adds.push([`${cap(l.name)} written off (amortisation)`, off]);
    if (buy) inv.push([`Purchase of ${l.name}`, -buy]);
    l.writtenOff = off;
    l.purchase = buy;
  }
  // Investments.
  for (const l of of('inv')) {
    use(l);
    const o = info.invest?.[l.k] ?? {};
    const r = investAccount({ name: l.name, a: l.a, b: l.b, sold: o.sold ?? null, purchase: o.purchase ?? null });
    l.invest = r;
    if (r.sold) ledgers.push(r.ledger);
    if (r.loss) adds.push([`Loss on sale of ${l.name}`, r.loss]);
    if (r.profit) less.push([`Profit on sale of ${l.name}`, r.profit]);
    if (r.purchase) inv.push([`Purchase of ${l.name}`, -r.purchase]);
    if (r.price) inv.push([`Proceeds from sale of ${l.name}`, r.price]);
  }
  // Loans given to others (a non-financial company): investing.
  for (const l of of('lta')) {
    use(l);
    const o = info.lta?.[l.k] ?? {};
    const given = o.given ?? Math.max(l.b - l.a, 0);
    const rec = o.recovered ?? Math.max(l.a - l.b, 0);
    check(l.a + given - rec === l.b, `${name}: loans ${l.k}`);
    if (given) inv.push([`Loans given (${l.name})`, -given]);
    if (rec) inv.push([`Loans recovered (${l.name})`, rec]);
  }
  // Provision for doubtful debts: a non-cash charge (or credit) adjusted before working capital.
  for (const l of of('pdd')) {
    use(l);
    check(byKey[l.of]?.kind === 'wcA', `${name}: provision ${l.k} must name its receivables line`);
    const d = l.b - l.a;
    if (d > 0) adds.push(['Increase in provision for doubtful debts', d]);
    if (d < 0) less.push(['Decrease in provision for doubtful debts', -d]);
  }
  // Interest and dividend received: out of operating, into investing.
  for (const [lab, v] of info.interestReceived ?? []) { less.push([lab, v]); inv.push([lab, v]); }
  for (const [lab, v] of info.dividendReceived ?? []) { less.push([lab, v]); inv.push([lab, v]); }
  // Finance costs: added back, paid under financing.
  const finLater = [];
  for (const [lab, v] of info.interestPaid ?? []) { adds.push([`${lab} (finance cost)`, v]); finLater.push([`${lab} paid`, -v]); }
  // 3. Tax.
  let taxProvided = 0;
  let taxPaid = 0;
  for (const l of of('tax')) {
    use(l);
    const o = info.tax?.[l.k] ?? {};
    const t = taxAccount({ a: l.a, b: l.b, provided: o.provided ?? null, paid: o.paid ?? null });
    l.taxAcc = t;
    ledgers.push(t.ledger);
    taxProvided += t.provided;
    taxPaid += t.paid;
  }
  for (const [, v] of info.taxPaidNoProvision ?? []) { taxProvided += v; taxPaid += v; }
  // Securities premium: debits for issue expenses, premium on redemption and bonus; the premium on shares
  // issued for cash is the balancing figure.
  const bonus = info.bonus ?? { amount: 0, from: null };
  const spDebits = [];
  const issueExp = info.issueExpenses ?? 0;
  if (issueExp) spDebits.push(['Bank A/c (share issue expenses written off)', issueExp]);
  for (const l of of('ltb')) { const p = info.ltb?.[l.k]?.premium ?? 0; if (p) spDebits.push([`Premium on redemption of ${l.name}`, p]); }
  for (const l of of('psc')) { const p = info.psc?.[l.k]?.premium ?? 0; if (p) spDebits.push([`Premium on redemption of ${l.name}`, p]); }
  if (bonus.from === 'sp') spDebits.push(['Bonus to Shareholders A/c', bonus.amount]);
  const spL = of('sp');
  check(spL.length <= 1, `${name}: one securities premium line`);
  spL.forEach(use);
  let premium = { received: 0 };
  if (spL.length) {
    premium = premiumAccount({ a: spL[0].a, b: spL[0].b, debits: spDebits });
    if (spDebits.length) ledgers.push(premium.ledger);
  } else check(spDebits.length === 0, `${name}: premium debits without a securities premium line`);
  // Equity shares: increase less shares to a vendor less bonus, plus the premium received.
  const scDelta = sum(of('sc').map((l) => (use(l), l.b - l.a)));
  const equityFace = scDelta - vendorShares - bonus.amount;
  check(equityFace >= 0, `${name}: equity shares issued for cash ${equityFace}`);
  const sharesCash = equityFace + premium.received;
  if (sharesCash) fin.push([info.sharesLabel ?? `Proceeds from issue of equity shares${premium.received ? ' (including securities premium)' : ''}`, sharesCash]);
  if (issueExp) fin.push(['Share issue expenses paid', -issueExp]);
  // Preference shares: issue and redemption (with any premium).
  for (const l of of('psc')) {
    use(l);
    const o = info.psc?.[l.k] ?? {};
    const red = o.redeemed ?? Math.max(l.a - l.b, 0);
    const iss = o.issued ?? Math.max(l.b - l.a, 0);
    check(l.a + iss - red === l.b, `${name}: preference shares ${l.k}`);
    if (iss) fin.push([`Proceeds from issue of ${l.name}`, iss]);
    if (red) fin.push([`Redemption of ${l.name}${o.premium ? ' (including premium)' : ''}`, -(red + (o.premium ?? 0))]);
  }
  // Reserves out of profit (one row each in the profit working).
  const transfers = [];
  for (const l of of('gr')) {
    use(l);
    const t = l.b - l.a + (bonus.from === l.k ? bonus.amount : 0);
    check(t >= 0, `${name}: transfer to ${l.k} ${t}`);
    if (t) transfers.push([`Add: Transfer to ${l.name}`, t]);
  }
  const transfer = sum(transfers.map((x) => x[1]));
  const surL = of('surplus');
  check(surL.length === 1, `${name}: one surplus line`);
  use(surL[0]);
  const dSurplus = surL[0].b - surL[0].a;
  const divPaid = sum((info.dividendPaid ?? []).map((x) => x[1]));
  const bonusSurplus = bonus.from === 'surplus' ? bonus.amount : 0;
  // The current year's proposed dividend is not provided for: it must not appear as a dividend paid.
  const proposed = info.proposed ?? null;
  if (proposed) for (const [lab] of info.dividendPaid ?? []) check(lab !== proposed.label, `${name}: current proposed dividend treated as paid`);
  const npbt = dSurplus + transfer + divPaid + taxProvided + bonusSurplus;
  const npbtRows = [
    [`Balance in the Statement of Profit and Loss, ${dates[0]}`, surL[0].b],
    [`Less: Balance on ${dates[1]}`, -surL[0].a],
    [bold(dSurplus >= 0 ? 'Increase in surplus (profit retained this year)' : 'Decrease in surplus'), dSurplus],
    ...transfers,
    ...(info.dividendPaid ?? []).map(([lab, v]) => [`Add: ${lab}`, v]),
    ...(bonusSurplus ? [['Add: Bonus shares issued out of surplus', bonusSurplus]] : []),
    [bold('Net profit after tax'), npbt - taxProvided],
    ...(taxProvided ? [['Add: Provision for tax made during the year', taxProvided]] : []),
    [bold('Net profit before tax'), npbt],
  ];
  check(npbt > 0, `${name}: net profit before tax ${npbt}`);
  // Borrowings.
  for (const l of of('ltb')) {
    use(l);
    const o = info.ltb?.[l.k] ?? {};
    const raised = o.raised ?? Math.max(l.b - l.a, 0);
    const repaid = o.repaid ?? Math.max(l.a - l.b, 0);
    check(l.a + raised - repaid === l.b, `${name}: borrowing ${l.k}`);
    const deb = /debenture/.test(l.name);
    if (raised) fin.push([o.raisedLabel ?? (deb ? `Proceeds from issue of ${l.name}` : `Proceeds from ${l.name}`), raised]);
    if (repaid) fin.push([o.repaidLabel ?? (deb ? `Redemption of ${l.name}${o.premium ? ' (including premium)' : ''}` : `Repayment of ${l.name}`), -(repaid + (o.premium ?? 0))]);
  }
  for (const l of of('stb')) {
    use(l);
    const d = l.b - l.a;
    if (d) fin.push([d > 0 ? `Proceeds from ${l.name} (net increase)` : `Repayment of ${l.name} (net decrease)`, d]);
  }
  fin.push(...finLater);
  for (const [lab, v] of info.dividendPaid ?? []) fin.push([`${lab} paid`, -v]);
  // Working capital.
  const wc = [];
  for (const l of [...of('wcA'), ...of('wcL')]) { use(l); wc.push([l.name, l.a, l.b, l.kind === 'wcA' ? 'A' : 'L']); }
  const cceL = of('cce');
  cceL.forEach(use);
  for (const l of L) check(used.has(l.k), `${name}: line ${l.k} (${l.label}) has no treatment`);
  // 4–6. The statement and the cash check.
  const A = operating({ npbt, adds, less, wc, taxPaid });
  const B = section('B', 'investing', inv);
  const C = section('C', 'financing', fin);
  const D = A.A + B.total + C.total;
  const open = sum(cceL.map((l) => l.a));
  const close = sum(cceL.map((l) => l.b));
  check(D === close - open, `${name}: CASH CHECK FAILED: A + B + C = ${D}, closing − opening cash = ${close - open}`);
  for (const [k, v] of Object.entries(pins)) {
    const got = { npbt, A: A.A, B: B.total, C: C.total, D, opbwc: A.opbwc, cashGen: A.cashGen, taxPaid }[k];
    check(got === v, `${name}: pin ${k}: computed ${got}, expected ${v}`);
  }
  const rows = [...A.rows, ...B.rows, ...C.rows, ...closingRows(D, open, close)];
  const bsRows = [];
  const show = (l, v) => (v === 0 ? '—' : NEG.includes(l.kind) ? `(${fig(v)})` : fig(v));
  for (const part of ['el', 'as']) {
    bsRows.push([bold(part === 'el' ? 'I. Equity and Liabilities' : 'II. Assets'), '', '']);
    for (const [pt, head, test] of HEADS) {
      if (pt !== part) continue;
      const ls = L.filter(test);
      if (!ls.length) continue;
      bsRows.push([bold(head), '', '']);
      for (const l of ls) bsRows.push([l.label, show(l, l.b), show(l, l.a)]);
    }
    bsRows.push([bold('Total'), bold(fig(part === 'el' ? elB : asB)), bold(fig(part === 'el' ? elA : asA))]);
  }
  const bsHead = ['Particulars', `${dates[0]} (₹)`, `${dates[1]} (₹)`];
  const npbtTable = npbtRows.map(([l, v]) => [l, /^\*\*/.test(l) ? bold(fig(v)) : fig(v)]);
  return {
    name, L, byKey, npbt, taxProvided, taxPaid, transfer, divPaid, dSurplus, proposed, premium, sharesCash, A, B, C, D, open, close, ledgers, totals: [elB, elA],
    npbtTable: { headers: ['Working: net profit before tax', '₹'], rows: npbtTable, md: md(['Working: net profit before tax', '₹'], npbtTable, [1]) },
    stmt: stmtTable(rows),
    part: (letter) => stmtTable({ A: A.rows, B: B.rows, C: C.rows }[letter]),
    bs: { headers: bsHead, rows: bsRows, md: md(bsHead, bsRows, [1, 2]) },
  };
}
