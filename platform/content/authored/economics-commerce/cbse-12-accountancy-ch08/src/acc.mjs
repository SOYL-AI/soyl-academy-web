// Accounting helpers for CBSE 12 Accountancy ch08 (Financial Statements of a Company).
// One classification table (CLASSIFY: item -> sub-head -> major head, in Schedule III, Division I order)
// drives every balance sheet, every note to accounts and every classification key in the chapter, so an
// item can never be classified two ways. The builders compute every total from the givens and throw on
// any mismatch: each note adds up, each balance sheet totals (equity and liabilities = assets), the
// share capital note reconciles shares and calls, and the Statement of Profit and Loss re-adds.
// Tables are rendered FROM the computed values (Indian digit grouping), so no figure is typed twice.

export function check(ok, what) {
  if (!ok) throw new Error(`accounting check failed: ${what}`);
}

// ---------------------------------------------------------------- numbers and words
const IN = new Intl.NumberFormat('en-IN');
/** 120000 -> "1,20,000"; a negative amount (a deduction) -> "(6,000)". Throws on a non-integer. */
export function fig(n) {
  check(Number.isInteger(n), `non-integer amount ${n}`);
  return n < 0 ? `(${IN.format(-n)})` : IN.format(n);
}
/** 120000 -> "₹1,20,000". */
export const rs = (n) => (n < 0 ? `(₹${fig(-n)})` : `₹${fig(n)}`);
export const sum = (xs) => xs.reduce((a, b) => a + b, 0);
/** A whole-rupee percentage of an amount. */
export function pctOf(rate, amount) {
  const v = (amount * rate) / 100;
  check(Number.isInteger(v), `${rate}% of ${amount} is not whole rupees`);
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
/** "rupees one lakh twenty thousand" for narration. */
export const rupees = (n) => `rupees ${words(n)}`;

// ---------------------------------------------------------------- markdown tables
/** Markdown table; `num` = indexes of right-aligned (amount) columns. */
export function md(headers, rows, num = []) {
  for (const r of rows) check(r.length === headers.length, `table row has ${r.length} cells, header ${headers.length}`);
  const sep = headers.map((_, i) => (num.includes(i) ? '---:' : '---'));
  const line = (cells) => `| ${cells.map((c) => (c === '' ? ' ' : c)).join(' | ')} |`;
  return [line(headers), line(sep), ...rows.map(line)].join('\n');
}
export const bold = (s) => `**${s}**`;

// ---------------------------------------------------------------- Schedule III (Division I): heads and sub-heads
export const PARTS = { el: 'Equity and Liabilities', as: 'Assets' };
/** Major heads in Schedule III order, with the part they belong to. */
export const HEADS = {
  sf: ['el', "Shareholders' Funds"],
  sapa: ['el', 'Share Application Money Pending Allotment'],
  ncl: ['el', 'Non-current Liabilities'],
  cl: ['el', 'Current Liabilities'],
  nca: ['as', 'Non-current Assets'],
  ca: ['as', 'Current Assets'],
};
/** Sub-heads in Schedule III order: key -> [major head, name]. */
export const SUBS = {
  sc: ['sf', 'Share Capital'],
  rs: ['sf', 'Reserves and Surplus'],
  msw: ['sf', 'Money Received against Share Warrants'],
  sapa: ['sapa', 'Share Application Money Pending Allotment'],
  ltb: ['ncl', 'Long-term Borrowings'],
  oltl: ['ncl', 'Other Long-term Liabilities'],
  ltp: ['ncl', 'Long-term Provisions'],
  stb: ['cl', 'Short-term Borrowings'],
  tp: ['cl', 'Trade Payables'],
  ocl: ['cl', 'Other Current Liabilities'],
  stp: ['cl', 'Short-term Provisions'],
  ppe: ['nca', 'Property, Plant and Equipment'],
  intang: ['nca', 'Intangible Assets'],
  cwip: ['nca', 'Capital Work-in-Progress'],
  nci: ['nca', 'Non-current Investments'],
  ltla: ['nca', 'Long-term Loans and Advances'],
  onca: ['nca', 'Other Non-current Assets'],
  ci: ['ca', 'Current Investments'],
  inv: ['ca', 'Inventories'],
  tr: ['ca', 'Trade Receivables'],
  cce: ['ca', 'Cash and Cash Equivalents'],
  stla: ['ca', 'Short-term Loans and Advances'],
  oca: ['ca', 'Other Current Assets'],
};
/** The three sub-heads grouped under "(a) Property, Plant and Equipment and Intangible Assets". */
export const PPE_GROUP_NAME = 'Property, Plant and Equipment and Intangible Assets';
const PPE_GROUP = ['ppe', 'intang', 'cwip'];

/**
 * SOYL's classification table: every item used anywhere in the chapter, with its sub-head.
 * Items marked in DEDUCT are shown as deductions inside their note.
 */
export const CLASSIFY = {
  // Shareholders' funds
  'Equity share capital': 'sc',
  'Preference share capital': 'sc',
  'Calls in arrears': 'sc',
  'Securities premium': 'rs',
  'General reserve': 'rs',
  'Capital reserve': 'rs',
  'Surplus, i.e. balance in the Statement of Profit and Loss': 'rs',
  'Debit balance of the Statement of Profit and Loss': 'rs',
  'Money received against share warrants': 'msw',
  'Share application money pending allotment': 'sapa',
  // Non-current liabilities
  Debentures: 'ltb',
  'Long-term loan from a bank': 'ltb',
  'Provision for gratuity payable on retirement': 'ltp',
  // Current liabilities
  'Bank overdraft': 'stb',
  'Cash credit from a bank': 'stb',
  'Loan repayable on demand': 'stb',
  'Current maturities of long-term borrowings': 'stb',
  'Trade creditors': 'tp',
  'Bills payable': 'tp',
  'Calls in advance': 'ocl',
  'Unpaid dividend': 'ocl',
  'Interest accrued on debentures': 'ocl',
  'Outstanding salaries': 'ocl',
  'Outstanding expenses': 'ocl',
  'Income received in advance': 'ocl',
  'Advance received from customers': 'ocl',
  'Provision for tax': 'stp',
  // Non-current assets
  Land: 'ppe',
  Buildings: 'ppe',
  'Land and buildings': 'ppe',
  'Plant and machinery': 'ppe',
  'Furniture and fittings': 'ppe',
  Vehicles: 'ppe',
  'Computer hardware': 'ppe',
  'Accumulated depreciation': 'ppe',
  Goodwill: 'intang',
  Patents: 'intang',
  Trademarks: 'intang',
  Copyrights: 'intang',
  'Computer software': 'intang',
  'Capital work-in-progress': 'cwip',
  'Long-term investments': 'nci',
  'Long-term loans to employees': 'ltla',
  'Capital advances': 'ltla',
  // Current assets
  'Marketable securities held for sale within a year': 'ci',
  'Raw materials': 'inv',
  'Work-in-progress': 'inv',
  'Finished goods': 'inv',
  'Stock-in-trade': 'inv',
  'Stores and spares': 'inv',
  'Loose tools': 'inv',
  'Trade debtors': 'tr',
  'Bills receivable': 'tr',
  'Provision for doubtful debts': 'tr',
  'Cash in hand': 'cce',
  'Cash at bank': 'cce',
  'Cheques in hand': 'cce',
  'Short-term loans to employees': 'stla',
  'Advance to suppliers': 'stla',
  'Prepaid expenses': 'oca',
  'Prepaid insurance': 'oca',
  'Interest accrued on investments': 'oca',
};
export const DEDUCT = new Set(['Calls in arrears', 'Accumulated depreciation', 'Provision for doubtful debts', 'Debit balance of the Statement of Profit and Loss']);

/** Classification of one item from the table: { key, head, sub, subFull, part }. Throws if unlisted. */
export function classOf(item) {
  const key = CLASSIFY[item];
  check(key, `no classification for "${item}"`);
  const [h, sub] = SUBS[key];
  const [part, head] = HEADS[h];
  let subFull = key === 'sapa' ? '— (a separate head; no sub-head)' : PPE_GROUP.includes(key) ? `${PPE_GROUP_NAME}: ${sub}` : sub;
  if (DEDUCT.has(item)) subFull += ' (shown as a deduction)';
  return { key, headKey: h, head, sub, subFull, part: PARTS[part] };
}
/** "Current Liabilities; sub-head Other Current Liabilities" style text for keys and solutions. */
export const headOf = (item) => classOf(item).head;
export const subOf = (item) => classOf(item).subFull;
/** Item | Major head | Sub-head, from the table. items: [label] or [[label, canonical]]. */
export function classTable(items) {
  const rows = items.map((it) => {
    const [label, canon] = Array.isArray(it) ? it : [it, it];
    const c = classOf(canon);
    return [label, c.head, c.subFull];
  });
  return md(['Item', 'Major head', 'Sub-head'], rows);
}
/** The Schedule III skeleton rows (part, head, sub-head) for format visuals. */
export function formatRows(part) {
  const rows = [];
  let hn = 0;
  for (const [h, [p, head]] of Object.entries(HEADS)) {
    if (p !== part) continue;
    hn++;
    const subs = Object.entries(SUBS).filter(([, [hh]]) => hh === h);
    if (h === 'sapa') {
      rows.push([`${hn}. ${head}`, '— (shown as a head by itself)']);
      continue;
    }
    let letter = 0;
    const names = [];
    let grouped = false;
    for (const [k, [, sub]] of subs) {
      if (PPE_GROUP.includes(k)) {
        if (!grouped) names.push(`(${'abcdefgh'[letter++]}) ${PPE_GROUP_NAME}: (i) ${SUBS.ppe[1]}, (ii) ${SUBS.intang[1]}, (iii) ${SUBS.cwip[1]}`);
        grouped = true;
      } else names.push(`(${'abcdefgh'[letter++]}) ${sub}`);
    }
    rows.push([`${hn}. ${head}`, names.join('; ')]);
  }
  return rows;
}

// ---------------------------------------------------------------- notes to accounts
/**
 * One note: lines [[label, signed amount, memo?]]; deductions are negative and printed "Less: … (x)";
 * memo lines (authorised and issued capital) are shown but not added. The total must equal the sum.
 */
function noteRows(no, title, lines, total) {
  const added = sum(lines.filter((l) => !l[2]).map((l) => l[1]));
  check(added === total, `note ${no} ${title}: lines add to ${added}, total ${total}`);
  const rows = [[String(no), bold(title), '']];
  for (const [label, v, memo] of lines) {
    const lab = v < 0 && !/^Less/.test(label) ? `Less: ${label}` : label;
    rows.push(['', memo ? `*${lab}*` : lab, fig(v)]);
  }
  rows.push(['', bold('Total'), bold(fig(total))]);
  return rows;
}
export const NOTE_HEADERS = ['Note No.', 'Particulars', '₹'];

/** A single balance sheet note from items that must all fall under one sub-head (per CLASSIFY). */
export function subNote(no, items) {
  const keys = new Set(items.map(([l, , c = l]) => classOf(c).key));
  check(keys.size === 1, `subNote ${no}: items fall under ${[...keys].join(', ')}`);
  const [key] = keys;
  const lines = items.map(([l, v, c = l]) => {
    check(Number.isInteger(v) && v > 0, `amount of "${l}"`);
    return [l, DEDUCT.has(c) ? -v : v];
  });
  const total = sum(lines.map((l) => l[1]));
  check(key === 'rs' || total > 0, `${SUBS[key][1]} total positive`);
  const title = SUBS[key][1];
  const rows = noteRows(no, title, lines, total);
  return { key, title, total, rows, md: md(NOTE_HEADERS, rows, [2]) };
}
/** A Statement of Profit and Loss note from items that must all fall under one head (per PL_CLASSIFY). */
export function plNote(no, items) {
  const keys = new Set(items.map(([l, , c = l]) => PL_CLASSIFY[c]));
  check(keys.size === 1 && !keys.has(undefined), `plNote ${no}: items fall under ${[...keys].join(', ')}`);
  const [key] = keys;
  const lines = items.map(([l, v]) => [l, v]);
  const total = sum(lines.map((l) => l[1]));
  const rows = noteRows(no, PL_HEADS[key], lines, total);
  return { key, title: PL_HEADS[key], total, rows, md: md(NOTE_HEADERS, rows, [2]) };
}

/**
 * Share capital note. fv = face value; authorised, issued = numbers of shares; full = shares
 * subscribed and fully paid; part = { n, called } shares subscribed but not fully paid (called = amount
 * called up per share); arrears = calls unpaid on those shares. Paid-up = full × fv + n × called − arrears.
 */
export function shareCapitalNote({ fv, authorised, issued, full = 0, part = null, arrears = 0, kind = 'equity' }) {
  const n = full + (part?.n ?? 0);
  check(n > 0 && n <= issued && issued <= authorised, `shares: subscribed ${n} ≤ issued ${issued} ≤ authorised ${authorised}`);
  check(!part || (part.called > 0 && part.called <= fv), 'called-up amount per share');
  check(arrears >= 0 && (!arrears || (part && arrears < part.n * part.called)), 'calls in arrears only on shares not fully paid');
  const fmt = (k) => IN.format(k);
  const sh = (k) => `${fmt(k)} ${kind} shares of ₹${fv} each`;
  const lines = [
    [`Authorised capital: ${sh(authorised)}`, authorised * fv, true],
    [`Issued capital: ${sh(issued)}`, issued * fv, true],
  ];
  if (full) lines.push([`Subscribed capital: subscribed and fully paid — ${sh(full)}`, full * fv]);
  if (part) lines.push([`Subscribed capital: subscribed but not fully paid — ${sh(part.n)}, ${part.called === fv ? 'fully called up' : `₹${part.called} per share called up`}`, part.n * part.called]);
  if (arrears) lines.push(['Calls in arrears', -arrears]);
  const amount = full * fv + (part ? part.n * part.called : 0) - arrears;
  return { amount, lines, called: full * fv + (part ? part.n * part.called : 0) };
}

// ---------------------------------------------------------------- balance sheet
const L = 'abcdefgh';
const ROMAN = ['i', 'ii', 'iii', 'iv'];
/**
 * Balance sheet as per Schedule III (Division I) with notes to accounts.
 * items: [[label, amount, canonical?]…] — canonical (default: label) is looked up in CLASSIFY;
 * DEDUCT items are entered as positive amounts and deducted inside their note.
 * shareCapital: a shareCapitalNote() result (then no Share Capital items may be listed).
 * A sub-head gets a note when it has more than one line, a deduction, or is share capital.
 */
export function scheduleIII({ date, items, shareCapital = null, only = null }) {
  const lines = new Map();
  if (shareCapital) lines.set('sc', shareCapital.lines);
  for (const [label, amount, canon = label] of items) {
    const c = classOf(canon);
    check(!(shareCapital && c.key === 'sc'), `share capital item "${label}" given twice`);
    check(Number.isInteger(amount) && amount > 0, `amount of "${label}" must be a positive whole number`);
    const signed = DEDUCT.has(canon) ? -amount : amount;
    if (!lines.has(c.key)) lines.set(c.key, []);
    lines.get(c.key).push([label, signed]);
  }
  const keys = Object.keys(SUBS).filter((k) => lines.has(k));
  const subTotal = Object.fromEntries(keys.map((k) => [k, k === 'sc' && shareCapital ? shareCapital.amount : sum(lines.get(k).filter((l) => !l[2]).map((l) => l[1]))]));
  for (const k of keys) check(k === 'rs' || subTotal[k] > 0, `${SUBS[k][1]} total ${subTotal[k]} must be positive`);
  const noteNo = {};
  let nn = 0;
  for (const k of keys) {
    const ls = lines.get(k);
    if (k === 'sc' || ls.length > 1 || ls.some((l) => l[1] < 0)) noteNo[k] = ++nn;
  }
  const headTotal = {};
  for (const k of keys) headTotal[SUBS[k][0]] = (headTotal[SUBS[k][0]] ?? 0) + subTotal[k];
  const partTotal = { el: 0, as: 0 };
  for (const [h, v] of Object.entries(headTotal)) partTotal[HEADS[h][0]] += v;
  if (only) {
    // One part only (an extract): every item must belong to that part.
    check(partTotal[only === 'el' ? 'as' : 'el'] === 0 && keys.every((k) => HEADS[SUBS[k][0]][0] === only), `extract ${only} has items of the other part`);
  } else {
    check(partTotal.el === partTotal.as, `balance sheet does not balance: equity and liabilities ${partTotal.el}, assets ${partTotal.as}`);
    check(sum(Object.values(subTotal)) === 2 * partTotal.el, 'sub-head totals add to both sides');
  }

  const rows = [];
  for (const part of only ? [only] : ['el', 'as']) {
    rows.push([bold(part === 'el' ? 'I. Equity and Liabilities' : 'II. Assets'), '', '']);
    let hn = 0;
    for (const [h, [p, head]] of Object.entries(HEADS)) {
      if (p !== part) continue;
      const subs = keys.filter((k) => SUBS[k][0] === h);
      if (!subs.length) continue;
      hn++;
      const note = (k) => (noteNo[k] ? String(noteNo[k]) : '');
      if (h === 'sapa') {
        rows.push([`${hn}. ${head}`, note('sapa'), fig(subTotal.sapa)]);
        continue;
      }
      rows.push([bold(`${hn}. ${head}`), '', '']);
      let letter = 0;
      let roman = 0;
      for (const k of subs) {
        if (PPE_GROUP.includes(k)) {
          if (!roman) rows.push([`(${L[letter++]}) ${PPE_GROUP_NAME}`, '', '']);
          rows.push([`(${ROMAN[roman++]}) ${SUBS[k][1]}`, note(k), fig(subTotal[k])]);
        } else rows.push([`(${L[letter++]}) ${SUBS[k][1]}`, note(k), fig(subTotal[k])]);
      }
    }
    rows.push([bold('Total'), '', bold(fig(partTotal[part]))]);
  }
  const headers = ['Particulars', 'Note No.', `${date} (₹)`];
  const notesRows = keys.filter((k) => noteNo[k]).flatMap((k) => noteRows(noteNo[k], SUBS[k][1], lines.get(k), subTotal[k]));
  return {
    total: only ? partTotal[only] : partTotal.el,
    subTotal,
    headTotal,
    noteNo,
    headers,
    rows,
    md: md(headers, rows, [2]),
    notesHeaders: NOTE_HEADERS,
    notesRows,
    notesMd: md(NOTE_HEADERS, notesRows, [2]),
  };
}

// ---------------------------------------------------------------- Statement of Profit and Loss
export const PL_HEADS = {
  rev: 'Revenue from Operations',
  oi: 'Other Income',
  com: 'Cost of Materials Consumed',
  pst: 'Purchases of Stock-in-Trade',
  chg: 'Changes in Inventories of Finished Goods, Work-in-Progress and Stock-in-Trade',
  emp: 'Employee Benefits Expense',
  fin: 'Finance Costs',
  dep: 'Depreciation and Amortisation Expense',
  oth: 'Other Expenses',
};
const EXPENSE_HEADS = ['com', 'pst', 'chg', 'emp', 'fin', 'dep', 'oth'];
/** SOYL's classification of Statement of Profit and Loss items. */
export const PL_CLASSIFY = {
  'Sale of products': 'rev',
  'Sale of services': 'rev',
  'Sale of scrap': 'rev',
  'Interest received on investments': 'oi',
  'Dividend received': 'oi',
  'Profit on sale of machinery': 'oi',
  'Rent received from letting a spare building': 'oi',
  'Purchases of stock-in-trade': 'pst',
  'Salaries and wages': 'emp',
  'Contribution to provident fund': 'emp',
  'Staff welfare expenses': 'emp',
  'Bonus to employees': 'emp',
  'Interest on debentures': 'fin',
  'Interest on bank loan': 'fin',
  'Interest on bank overdraft': 'fin',
  Depreciation: 'dep',
  'Amortisation of patents': 'dep',
  Rent: 'oth',
  'Power and fuel': 'oth',
  Advertisement: 'oth',
  'Audit fees': 'oth',
  'Repairs and maintenance': 'oth',
  Insurance: 'oth',
  'Loss on sale of furniture': 'oth',
  'Bad debts': 'oth',
  'Printing and stationery': 'oth',
  'Carriage outwards': 'oth',
};
export function plHeadOf(item) {
  const k = PL_CLASSIFY[item];
  check(k, `no profit and loss classification for "${item}"`);
  return PL_HEADS[k];
}

/**
 * Statement of Profit and Loss (2026-27 syllabus format: no exceptional or extraordinary items, no
 * discontinued operations). items: [[label, amount, canonical?]] classified by PL_CLASSIFY;
 * materials: { opening, purchases, closing } -> cost of materials consumed; inventories:
 * { opening: [[label, amt]], closing: [[label, amt]] } -> change (opening − closing, may be negative);
 * taxRate: whole-number percentage of profit before tax, or null.
 */
export function statementPL({ year, items, materials = null, inventories = null, taxRate = null, noteStart = 1 }) {
  const lines = Object.fromEntries(Object.keys(PL_HEADS).map((k) => [k, []]));
  for (const [label, amount, canon = label] of items) {
    const k = PL_CLASSIFY[canon];
    check(k, `no profit and loss classification for "${canon}"`);
    check(Number.isInteger(amount) && amount > 0, `amount of "${label}"`);
    lines[k].push([label, amount]);
  }
  if (materials) {
    const used = materials.opening + materials.purchases - materials.closing;
    check(used > 0, 'materials consumed positive');
    lines.com = [['Opening inventory of materials', materials.opening], ['Add: Purchases of materials', materials.purchases], ['Closing inventory of materials', -materials.closing]];
  }
  if (inventories) {
    lines.chg = [...inventories.opening.map(([l, v]) => [`Opening inventory of ${l}`, v]), ...inventories.closing.map(([l, v]) => [`Closing inventory of ${l}`, -v])];
  }
  const tot = Object.fromEntries(Object.entries(lines).map(([k, ls]) => [k, sum(ls.map((l) => l[1]))]));
  check(tot.rev > 0, 'revenue from operations');
  const totalIncome = tot.rev + tot.oi;
  const heads = EXPENSE_HEADS.filter((k) => lines[k].length);
  const totalExp = sum(heads.map((k) => tot[k]));
  const pbt = totalIncome - totalExp;
  check(totalIncome - totalExp === pbt && pbt + totalExp === tot.rev + tot.oi, 'profit before tax re-adds');
  const tax = taxRate === null ? 0 : pctOf(taxRate, pbt);
  check(taxRate === null || pbt > 0, 'tax only on a profit');
  const pat = pbt - tax;
  const noteNo = {};
  let nn = noteStart - 1;
  for (const k of ['rev', 'oi', ...heads]) if (lines[k].length > 1) noteNo[k] = ++nn;
  const note = (k) => (noteNo[k] ? String(noteNo[k]) : '');
  const rows = [];
  if (lines.rev.length) rows.push([`I. ${PL_HEADS.rev}`, note('rev'), fig(tot.rev)]);
  rows.push([`II. ${PL_HEADS.oi}`, note('oi'), lines.oi.length ? fig(tot.oi) : '—']);
  rows.push([bold('III. Total Income (I + II)'), '', bold(fig(totalIncome))]);
  rows.push([bold('IV. Expenses'), '', '']);
  for (const k of heads) rows.push([PL_HEADS[k], note(k), fig(tot[k])]);
  rows.push([bold('Total Expenses'), '', bold(fig(totalExp))]);
  rows.push([bold('V. Profit before Tax (III − IV)'), '', bold(fig(pbt))]);
  if (taxRate !== null) {
    rows.push([`VI. Tax Expense (${taxRate}% of profit before tax)`, '', fig(tax)]);
    rows.push([bold('VII. Profit for the Year (V − VI)'), '', bold(fig(pat))]);
  }
  const headers = ['Particulars', 'Note No.', `Year ended ${year} (₹)`];
  const notesRows = Object.keys(noteNo).flatMap((k) => noteRows(noteNo[k], PL_HEADS[k], lines[k], tot[k]));
  return { tot, totalIncome, totalExp, pbt, tax, pat, noteNo, headers, rows, md: md(headers, rows, [2]), notesHeaders: NOTE_HEADERS, notesRows, notesMd: notesRows.length ? md(NOTE_HEADERS, notesRows, [2]) : '' };
}
