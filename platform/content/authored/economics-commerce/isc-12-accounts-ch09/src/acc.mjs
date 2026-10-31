// Accounting helpers for isc-12-accounts-ch09 (Final Accounts of Companies), ISC 2027 Accountancy (858).
// The ISC 2027 syllabus asks for the Balance Sheet of a company in the form of Schedule III Part I of the
// Companies Act, 2013, with notes to accounts, prepared from a trial balance with adjustments; the
// Statement of Profit and Loss (Part II) is not required, so the profit for the year is either given or
// worked out in one simple working from a given profit and the adjustments.
//
// One classification table (CLASSIFY: item -> sub-head -> major head, in the order of the amended
// Schedule III Part I) drives every balance sheet, every note and every classification key, so an item
// can never be classified two ways. The builders compute every figure from the givens and throw on any
// mismatch: a trial balance must agree; every adjustment is posted twice (profit and a balance sheet
// line); each note adds up; the share capital note reconciles shares, calls, arrears and forfeiture;
// both parts of the balance sheet total the same. Tables are rendered FROM the computed values (Indian
// digit grouping), so no figure is typed twice.

export function check(ok, what) {
  if (!ok) throw new Error(`acc: ${what}`);
}

// ---------------------------------------------------------------- numbers and words
/** Indian digit grouping (1,20,000); a negative amount prints in brackets: (30,000). Whole rupees only. */
export function inr(n) {
  check(Number.isInteger(n), `not a whole number of rupees: ${n}`);
  return n < 0 ? `(${(-n).toLocaleString('en-IN')})` : n.toLocaleString('en-IN');
}
export const rs = (n) => (n < 0 ? `(₹${inr(-n)})` : `₹${inr(n)}`);
export const sum = (xs) => xs.reduce((a, b) => a + b, 0);
/** p per cent of an amount, whole rupees only. */
export function pct(p, amount) {
  const v = (amount * p) / 100;
  check(Number.isInteger(v), `${p}% of ${amount} is not whole rupees`);
  return v;
}

const ONES = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
const two = (n) => (n < 20 ? ONES[n] : TENS[Math.floor(n / 10)] + (n % 10 ? `-${ONES[n % 10]}` : ''));
/** Indian number words for narration: 146600 -> "one lakh forty-six thousand six hundred". */
export function words(n) {
  check(Number.isInteger(n) && n >= 0, `words(${n})`);
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

// ---------------------------------------------------------------- markdown
export const bold = (s) => `**${s}**`;
/** Markdown table; `num` = indexes of right-aligned (amount) columns. */
export function md(headers, rows, num = []) {
  for (const r of rows) check(r.length === headers.length, `table row has ${r.length} cells, header ${headers.length}: ${r.join(' | ')}`);
  const sep = headers.map((_, i) => (num.includes(i) ? '---:' : '---'));
  const line = (cells) => `| ${cells.map((c) => (c === '' ? ' ' : c)).join(' | ')} |`;
  return [line(headers), line(sep), ...rows.map(line)].join('\n');
}
/** A two-column list of given balances for a stem. */
export const given = (items, head = 'Particulars') => md([head, '₹'], items.map(([l, v]) => [l, inr(v)]), [1]);

// ---------------------------------------------------------------- Schedule III Part I (as amended): heads and sub-heads
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
  dtl: ['ncl', 'Deferred Tax Liabilities (Net)'],
  oltl: ['ncl', 'Other Long-term Liabilities'],
  ltp: ['ncl', 'Long-term Provisions'],
  stb: ['cl', 'Short-term Borrowings'],
  tp: ['cl', 'Trade Payables'],
  ocl: ['cl', 'Other Current Liabilities'],
  stp: ['cl', 'Short-term Provisions'],
  ppe: ['nca', 'Property, Plant and Equipment'],
  intang: ['nca', 'Intangible Assets'],
  cwip: ['nca', 'Capital Work-in-Progress'],
  iaud: ['nca', 'Intangible Assets under Development'],
  nci: ['nca', 'Non-current Investments'],
  dta: ['nca', 'Deferred Tax Assets (Net)'],
  ltla: ['nca', 'Long-term Loans and Advances'],
  onca: ['nca', 'Other Non-current Assets'],
  ci: ['ca', 'Current Investments'],
  inv: ['ca', 'Inventories'],
  tr: ['ca', 'Trade Receivables'],
  cce: ['ca', 'Cash and Cash Equivalents'],
  stla: ['ca', 'Short-term Loans and Advances'],
  oca: ['ca', 'Other Current Assets'],
};
/** The four sub-heads grouped under "(a) Property, Plant and Equipment and Intangible Assets". */
export const PPE_GROUP_NAME = 'Property, Plant and Equipment and Intangible Assets';
const PPE_GROUP = ['ppe', 'intang', 'cwip', 'iaud'];

/** SOYL's classification table: every item used anywhere in the chapter, with its sub-head. */
export const CLASSIFY = {
  // Shareholders' funds
  'Equity share capital': 'sc',
  'Preference share capital': 'sc',
  'Calls in arrears': 'sc',
  'Forfeited shares': 'sc',
  'Securities premium': 'rs',
  'General reserve': 'rs',
  'Capital reserve': 'rs',
  'Debenture redemption reserve': 'rs',
  'Surplus, i.e. balance in the Statement of Profit and Loss': 'rs',
  'Debit balance of the Statement of Profit and Loss': 'rs',
  'Money received against share warrants': 'msw',
  'Share application money pending allotment': 'sapa',
  // Non-current liabilities
  Debentures: 'ltb',
  'Long-term loan from a bank': 'ltb',
  'Public deposits repayable after twelve months': 'ltb',
  'Premium on redemption of debentures': 'oltl',
  'Provision for gratuity payable after twelve months': 'ltp',
  'Provision for warranty claims payable after twelve months': 'ltp',
  // Current liabilities
  'Bank overdraft': 'stb',
  'Cash credit from a bank': 'stb',
  'Loan repayable on demand': 'stb',
  'Current maturities of long-term borrowings': 'stb',
  'Sundry creditors': 'tp',
  'Bills payable': 'tp',
  'Calls in advance': 'ocl',
  'Unpaid dividend': 'ocl',
  'Interest accrued on debentures': 'ocl',
  'Outstanding expenses': 'ocl',
  'Income received in advance': 'ocl',
  'Advance received from customers': 'ocl',
  'TDS payable': 'ocl',
  'Provision for tax': 'stp',
  // Non-current assets
  Land: 'ppe',
  Buildings: 'ppe',
  'Land and buildings': 'ppe',
  'Plant and machinery': 'ppe',
  'Furniture and fittings': 'ppe',
  Vehicles: 'ppe',
  'Office equipment': 'ppe',
  'Accumulated depreciation': 'ppe',
  Goodwill: 'intang',
  Patents: 'intang',
  Trademarks: 'intang',
  Copyrights: 'intang',
  'Computer software': 'intang',
  'Capital work-in-progress': 'cwip',
  'Intangible assets under development': 'iaud',
  'Non-current investments': 'nci',
  'Capital advances': 'ltla',
  'Long-term loans to employees': 'ltla',
  'Security deposits paid': 'ltla',
  // Current assets
  'Current investments': 'ci',
  'Raw materials': 'inv',
  'Work-in-progress': 'inv',
  'Finished goods': 'inv',
  'Stock-in-trade': 'inv',
  'Stores and spares': 'inv',
  'Loose tools': 'inv',
  'Sundry debtors': 'tr',
  'Bills receivable': 'tr',
  'Provision for doubtful debts': 'tr',
  'Cash in hand': 'cce',
  'Cash at bank': 'cce',
  'Cheques in hand': 'cce',
  'Short-term loans to employees': 'stla',
  'Advance to suppliers': 'stla',
  'Prepaid expenses': 'oca',
  'Interest accrued on investments': 'oca',
};
/** Items entered as positive amounts and shown as deductions inside their note. */
export const DEDUCT = new Set(['Calls in arrears', 'Accumulated depreciation', 'Provision for doubtful debts', 'Debit balance of the Statement of Profit and Loss']);

/** Classification of one item: { key, head, sub, subFull, part }. Throws if the item is not in the table. */
export function classOf(item) {
  const key = CLASSIFY[item];
  check(key, `no classification for "${item}"`);
  const [h, sub] = SUBS[key];
  const [part, head] = HEADS[h];
  let subFull = key === 'sapa' ? '— (a head by itself; no sub-head)' : PPE_GROUP.includes(key) ? `${PPE_GROUP_NAME}: ${sub}` : sub;
  if (DEDUCT.has(item)) subFull += ' (shown as a deduction)';
  return { key, headKey: h, head, sub, subFull, part: PARTS[part] };
}
export const headOf = (item) => classOf(item).head;
export const subOf = (item) => classOf(item).subFull;
/** "Current Liabilities — Other Current Liabilities" */
export const where = (item) => `${headOf(item)} — ${subOf(item)}`;
/** Item | Major head | Sub-head, from the table. items: [label] or [[label, canonical]]. */
export function classTable(items) {
  const rows = items.map((it) => {
    const [label, canon] = Array.isArray(it) ? it : [it, it];
    const c = classOf(canon);
    return [label, c.head, c.subFull];
  });
  return { headers: ['Item', 'Major head', 'Sub-head'], rows, md: md(['Item', 'Major head', 'Sub-head'], rows) };
}
/** The Schedule III Part I skeleton (major head, its sub-heads) for one part, for format visuals. */
export function formatRows(part) {
  const rows = [];
  let hn = 0;
  for (const [h, [p, head]] of Object.entries(HEADS)) {
    if (p !== part) continue;
    hn++;
    if (h === 'sapa') {
      rows.push([`${hn}. ${head}`, '— (shown as a head by itself)']);
      continue;
    }
    const subs = Object.entries(SUBS).filter(([, [hh]]) => hh === h);
    let letter = 0;
    const names = [];
    let grouped = false;
    for (const [k, [, sub]] of subs) {
      if (PPE_GROUP.includes(k)) {
        if (!grouped) names.push(`(${'abcdefgh'[letter++]}) ${PPE_GROUP_NAME}: ${PPE_GROUP.map((g, i) => `(${['i', 'ii', 'iii', 'iv'][i]}) ${SUBS[g][1]}`).join(', ')}`);
        grouped = true;
      } else names.push(`(${'abcdefgh'[letter++]}) ${sub}`);
    }
    rows.push([`${hn}. ${head}`, names.join('; ')]);
  }
  return rows;
}

// ---------------------------------------------------------------- note lines
/**
 * A note line is [label, amount, canonical?] or [label, [[sub, amount]…], canonical?] for an item shown
 * with its working (cost less accumulated depreciation, opening + transfer…). Deduction items (DEDUCT)
 * are entered positive and turned negative. A memo line { memo: true } is shown but not added.
 */
function toLine([label, v, canon = label]) {
  if (Array.isArray(v)) {
    for (const [s, a] of v) check(Number.isInteger(a) && a !== 0, `sub-line "${s}" of "${label}" is ${a}`);
    return { label, canon, parts: v, net: sum(v.map(([, a]) => a)) };
  }
  check(Number.isInteger(v) && v > 0, `amount of "${label}" must be a positive whole number, got ${v}`);
  return { label, canon, parts: null, net: DEDUCT.has(canon) ? -v : v };
}
const prefixed = (s, a) => (a < 0 && !/^(Less|Debit)/.test(s) ? [`Less: ${s}`, inr(-a)] : [s, inr(a)]);
function noteRows(no, title, lines, total) {
  const added = sum(lines.filter((l) => !l.memo).map((l) => l.net));
  check(added === total, `note ${no} ${title}: lines add to ${added}, total ${total}`);
  const rows = [[String(no), bold(title), '', '']];
  for (const l of lines) {
    if (l.memo) rows.push(['', l.label, '', inr(l.net)]);
    else if (l.parts) {
      // A first sub-line with the item's own label is printed on the item's row (no repeated label).
      if (l.parts[0][0] !== l.label) rows.push(['', l.label, '', '']);
      l.parts.forEach(([s, a], i) => {
        const [lab, amt] = prefixed(s, a);
        rows.push(['', lab, amt, i === l.parts.length - 1 ? (l.net ? inr(l.net) : 'Nil') : '']);
      });
    } else {
      const [lab, amt] = prefixed(l.label, l.net);
      rows.push(['', lab, '', amt]);
    }
  }
  rows.push(['', bold('Total'), '', bold(inr(total))]);
  return rows;
}
export const NOTE_HEADERS = ['Note No.', 'Particulars', '₹', '₹'];

/** One stand-alone note whose lines must all fall under one sub-head (per CLASSIFY). */
export function subNote(no, items) {
  const lines = items.map(toLine);
  const keys = new Set(lines.map((l) => classOf(l.canon).key));
  check(keys.size === 1, `subNote ${no}: items fall under ${[...keys].join(', ')}`);
  const [key] = keys;
  const total = sum(lines.map((l) => l.net));
  check(key === 'rs' || total > 0, `${SUBS[key][1]} total positive`);
  const rows = noteRows(no, SUBS[key][1], lines, total);
  return { key, title: SUBS[key][1], total, rows, md: md(NOTE_HEADERS, rows, [2, 3]) };
}

/**
 * Share capital note. fv = face value; authorised and issued = numbers of shares; full = shares
 * subscribed and fully paid; part = { n, called, arrears } shares subscribed but not fully paid (called =
 * amount called up per share; arrears = calls unpaid on them); forfeited = { n, amount } shares forfeited
 * and not reissued (amount = the Share Forfeiture balance). Paid-up shown = full × fv + n × called −
 * arrears + forfeited amount.
 */
export function shareNote({ fv, authorised, issued, full = 0, part = null, forfeited = null, kind = 'equity' }) {
  const subscribed = full + (part?.n ?? 0);
  check(subscribed > 0 && subscribed + (forfeited?.n ?? 0) <= issued && issued <= authorised, `shares: subscribed ${subscribed} + forfeited ≤ issued ${issued} ≤ authorised ${authorised}`);
  check(!part || (part.called > 0 && part.called <= fv), 'called-up amount per share');
  const arrears = part?.arrears ?? 0;
  check(arrears >= 0 && arrears < (part ? part.n * part.called : 1), 'calls in arrears only on shares not fully paid');
  check(!forfeited || (forfeited.amount > 0 && forfeited.amount < forfeited.n * fv), 'forfeited amount is what was paid, less than face value');
  const sh = (k) => `${inr(k)} ${kind} shares of ₹${fv} each`;
  const lines = [
    { label: `Authorised capital: ${sh(authorised)}`, net: authorised * fv, memo: true },
    { label: `Issued capital: ${sh(issued)}`, net: issued * fv, memo: true },
  ];
  if (full) lines.push(toLine([`Subscribed and fully paid: ${sh(full)}`, full * fv, 'Equity share capital']));
  if (part) {
    const label = `Subscribed but not fully paid: ${sh(part.n)}, ${part.called === fv ? 'fully called up' : `₹${part.called} per share called up`}`;
    lines.push(toLine(arrears ? [label, [['Called up', part.n * part.called], ['Calls in arrears', -arrears]], 'Equity share capital'] : [label, part.n * part.called, 'Equity share capital']));
  }
  if (forfeited) lines.push(toLine([`Add: Forfeited shares (amount paid on ${inr(forfeited.n)} shares)`, forfeited.amount, 'Forfeited shares']));
  const called = full * fv + (part ? part.n * part.called : 0);
  const amount = called - arrears + (forfeited?.amount ?? 0);
  check(amount === sum(lines.filter((l) => !l.memo).map((l) => l.net)), 'share capital note adds up');
  return { amount, called, arrears, forfeited: forfeited?.amount ?? 0, paidUp: called - arrears, lines };
}
/** The share capital note on its own (for questions that ask only for it). */
export function shareNoteTable(sc, no = 1) {
  const rows = noteRows(no, SUBS.sc[1], sc.lines, sc.amount);
  return { rows, md: md(NOTE_HEADERS, rows, [2, 3]) };
}

// ---------------------------------------------------------------- balance sheet
const L = 'abcdefgh';
const ROMAN = ['i', 'ii', 'iii', 'iv'];
export const CONTINGENT = 'Contingent Liabilities and Commitments (to the extent not provided for)';
/** Sub-heads that always get a note: the four notes the ISC syllabus names (share capital, reserves and surplus, borrowings, PPE). */
const ALWAYS_NOTE = ['sc', 'rs', 'ltb', 'stb', 'ppe'];
/**
 * Balance Sheet as per Schedule III Part I with notes to accounts.
 * items: note lines (see toLine) classified by their canonical name; share: a shareNote() result (then
 * no share capital item may be listed); contingent: [[label, amount]] for the contingent-liabilities note
 * (shown, never added); only: 'el' or 'as' for an extract of one part.
 * A sub-head gets a note when it is in ALWAYS_NOTE, or has more than one line, a deduction or a working.
 */
export function bs({ title, date, items = [], share = null, contingent = [], only = null }) {
  const lines = new Map();
  if (share) lines.set('sc', share.lines);
  for (const it of items) {
    const l = toLine(it);
    const c = classOf(l.canon);
    check(!(share && c.key === 'sc'), `share capital item "${l.label}" given twice`);
    if (!lines.has(c.key)) lines.set(c.key, []);
    lines.get(c.key).push(l);
  }
  const keys = Object.keys(SUBS).filter((k) => lines.has(k));
  const subTotal = Object.fromEntries(keys.map((k) => [k, sum(lines.get(k).filter((l) => !l.memo).map((l) => l.net))]));
  if (share) check(subTotal.sc === share.amount, 'share capital total = note');
  for (const k of keys) check(k === 'rs' || subTotal[k] > 0, `${SUBS[k][1]} total ${subTotal[k]} must be positive`);
  const noteNo = {};
  let nn = 0;
  for (const k of keys) {
    const ls = lines.get(k);
    if (ALWAYS_NOTE.includes(k) || ls.length > 1 || ls.some((l) => l.parts || l.net < 0)) noteNo[k] = ++nn;
  }
  const headTotal = {};
  for (const k of keys) headTotal[SUBS[k][0]] = (headTotal[SUBS[k][0]] ?? 0) + subTotal[k];
  const partTotal = { el: 0, as: 0 };
  for (const [h, v] of Object.entries(headTotal)) partTotal[HEADS[h][0]] += v;
  if (only) check(keys.every((k) => HEADS[SUBS[k][0]][0] === only), `extract ${only} has items of the other part`);
  else check(partTotal.el === partTotal.as, `balance sheet does not balance: equity and liabilities ${partTotal.el}, assets ${partTotal.as}`);

  const rows = [];
  for (const part of only ? [only] : ['el', 'as']) {
    rows.push([bold(part === 'el' ? 'I. EQUITY AND LIABILITIES' : 'II. ASSETS'), '', '']);
    let hn = 0;
    for (const [h, [p, head]] of Object.entries(HEADS)) {
      if (p !== part) continue;
      const subs = keys.filter((k) => SUBS[k][0] === h);
      if (!subs.length) continue;
      hn++;
      const note = (k) => (noteNo[k] ? String(noteNo[k]) : '');
      if (h === 'sapa') {
        rows.push([`${hn}. ${head}`, note('sapa'), inr(subTotal.sapa)]);
        continue;
      }
      rows.push([bold(`${hn}. ${head}`), '', '']);
      let letter = 0;
      let roman = 0;
      for (const k of subs) {
        if (PPE_GROUP.includes(k)) {
          if (!roman) rows.push([`(${L[letter++]}) ${PPE_GROUP_NAME}`, '', '']);
          rows.push([`(${ROMAN[roman++]}) ${SUBS[k][1]}`, note(k), inr(subTotal[k])]);
        } else rows.push([`(${L[letter++]}) ${SUBS[k][1]}`, note(k), inr(subTotal[k])]);
      }
    }
    rows.push([bold('Total'), '', bold(inr(partTotal[part]))]);
  }
  const headers = ['Particulars', 'Note No.', `${date} (₹)`];
  const notesRows = keys.filter((k) => noteNo[k]).flatMap((k) => noteRows(noteNo[k], SUBS[k][1], lines.get(k), subTotal[k]));
  let contNo = null;
  if (contingent.length) {
    contNo = ++nn;
    notesRows.push([String(contNo), bold(CONTINGENT), '', '']);
    for (const [l, a] of contingent) {
      check(Number.isInteger(a) && a > 0, `contingent ${l}`);
      notesRows.push(['', l, '', inr(a)]);
    }
  }
  const tableMd = md(headers, rows, [2]);
  return {
    title,
    total: only ? partTotal[only] : partTotal.el,
    partTotal,
    subTotal,
    headTotal,
    noteNo,
    contNo,
    headers,
    rows,
    md: `${title ? `${bold(title)}\n\n` : ''}${tableMd}${contNo ? `\n\n${CONTINGENT}: see Note ${contNo}.` : ''}`,
    tableMd,
    notesHeaders: NOTE_HEADERS,
    notesRows,
    notesMd: notesRows.length ? md(NOTE_HEADERS, notesRows, [2, 3]) : '',
  };
}

/** The rows of some numbered notes of a balance sheet (sub-head keys, or 'cont' for contingent liabilities). */
export function noteRowsOf(B, keys) {
  return keys.flatMap((key) => {
    const n = key === 'cont' ? B.contNo : B.noteNo[key];
    check(n, `no note for ${key}`);
    const start = B.notesRows.findIndex((r) => r[0] === String(n));
    let end = B.notesRows.findIndex((r, i) => i > start && r[0] !== '');
    if (end < 0) end = B.notesRows.length;
    return B.notesRows.slice(start, end);
  });
}
/** One numbered note of a balance sheet (by sub-head key) as its own table. */
export const noteOf = (B, key) => md(NOTE_HEADERS, noteRowsOf(B, [key]), [2, 3]);
/** The contingent-liabilities note on its own: [[label, amount]]. */
export function contingentNote(lines) {
  for (const [l, a] of lines) check(Number.isInteger(a) && a > 0, `contingent ${l}`);
  return md([CONTINGENT, '₹'], lines.map(([l, a]) => [l, inr(a)]), [1]);
}

/** A working: rows [[label, signed amount]] added to a total; returns { total, rows, md }. */
export function working(head, lines, totalLabel) {
  for (const [l, v] of lines) check(Number.isInteger(v) && v !== 0, `working line ${l}: ${v}`);
  const total = sum(lines.map(([, v]) => v));
  const rows = [...lines.map(([l, v]) => [l, inr(v)]), [bold(totalLabel), bold(inr(total))]];
  return { total, rows, md: md([head, '₹'], rows, [1]) };
}

// ---------------------------------------------------------------- trial balance and adjustments
/** Trial balance table (Dr/Cr) from rows [label, 'dr'|'cr', amount, …]; the two columns must agree. */
export function trialBalance(tb, date) {
  const dr = sum(tb.filter((r) => r[1] === 'dr').map((r) => r[2]));
  const cr = sum(tb.filter((r) => r[1] === 'cr').map((r) => r[2]));
  check(tb.every((r) => ['dr', 'cr'].includes(r[1]) && Number.isInteger(r[2]) && r[2] > 0), 'trial balance rows');
  check(dr === cr, `trial balance does not agree: Dr ${dr}, Cr ${cr}`);
  const rows = [...tb.map(([l, s, a]) => [l, s === 'dr' ? inr(a) : '', s === 'cr' ? inr(a) : '']), [bold('Total'), bold(inr(dr)), bold(inr(cr))]];
  const headers = [`Trial balance as at ${date}`, 'Dr (₹)', 'Cr (₹)'];
  return { total: dr, headers, rows, md: md(headers, rows, [1, 2]) };
}

/**
 * Balance Sheet from a trial balance and adjustments (the ISC final-accounts question).
 * tb rows: [label, side, amount, canonical?, link?]. Special canonicals: 'PROFIT' (profit for the year
 * before the adjustments, given), 'SURPLUS' (balance of the Statement of Profit and Loss at the start of
 * the year; 'dr' = a debit balance), 'Equity share capital' (called-up capital, checked against `share`),
 * 'Calls in arrears' and 'Forfeited shares' (checked against `share`), 'Accumulated depreciation' (link =
 * the asset's label), 'Provision for doubtful debts' (old provision; goes with 'Sundry debtors').
 * adj: { dep: [[assetLabel, amount]], pdd: required provision, outstanding: [[label, amount, canon?]],
 *   prepaid: [[label, amount, canon?]], accrued: [[label, amount, canon?]], debInterest: [label, amount],
 *   tax: amount, toGR: amount, curMat: [[tbLabel, amount, text]], contingent: [[label, amount]] }.
 * Every adjustment changes the profit and one balance sheet line, so the Balance Sheet must still balance.
 */
export function finalAccounts({ title, date, opening, share, tb, adj = {} }) {
  const T = trialBalance(tb, date);
  const canon = (r) => r[3] ?? r[0];
  const rowsOf = (c) => tb.filter((r) => canon(r) === c);
  const one = (c) => {
    const rr = rowsOf(c);
    check(rr.length <= 1, `more than one trial balance line for ${c}`);
    return rr[0];
  };
  // Share capital agrees with the share note.
  const scRow = one('Equity share capital');
  check(scRow && scRow[1] === 'cr' && scRow[2] === share.called, `share capital in the trial balance ${scRow?.[2]} = called up ${share.called}`);
  check((one('Calls in arrears')?.[2] ?? 0) === share.arrears, 'calls in arrears agree with the share note');
  check((one('Forfeited shares')?.[2] ?? 0) === share.forfeited, 'forfeited shares agree with the share note');
  const P0 = one('PROFIT');
  check(P0 && P0[1] === 'cr', 'profit before adjustments given as a credit');
  const S0 = one('SURPLUS');
  const surplusOpen = S0 ? (S0[1] === 'cr' ? S0[2] : -S0[2]) : 0;

  const profitRows = [['Profit for the year before adjustments (given)', P0[2]]];
  const items = [];
  const used = new Set(['Equity share capital', 'Calls in arrears', 'Forfeited shares', 'PROFIT', 'SURPLUS', 'Accumulated depreciation', 'Provision for doubtful debts']);
  // Fixed assets: cost less accumulated depreciation (opening + this year).
  const dep = new Map((adj.dep ?? []).map(([a, v]) => [a, v]));
  for (const [a] of dep) check(tb.some((r) => r[0] === a && r[1] === 'dr'), `depreciation on "${a}", which is not in the trial balance`);
  const accRows = rowsOf('Accumulated depreciation');
  for (const r of accRows) check(tb.some((x) => x[0] === r[4] && x[1] === 'dr'), `accumulated depreciation linked to "${r[4]}"`);
  // Borrowings with a current maturity.
  const curMat = new Map((adj.curMat ?? []).map(([l, v, text]) => [l, [v, text]]));
  for (const [l] of curMat) check(tb.some((r) => r[0] === l && r[1] === 'cr'), `current maturity of "${l}", which is not in the trial balance`);
  // Debtors with the provision for doubtful debts.
  const pddOld = one('Provision for doubtful debts')?.[2] ?? 0;
  const pddNew = adj.pdd ?? pddOld;
  for (const r of tb) {
    const c = canon(r);
    if (used.has(c)) continue;
    const [label, side, amount] = r;
    const k = classOf(c).key;
    if (k === 'ppe' || k === 'intang') {
      check(side === 'dr', `${label} is an asset`);
      const opAcc = sum(accRows.filter((x) => x[4] === label).map((x) => x[2]));
      const d = dep.get(label) ?? 0;
      const word = k === 'intang' ? 'Amortisation' : 'Depreciation';
      if (d) profitRows.push([k === 'intang' ? `Less: Amortisation of ${label.toLowerCase()}` : `Less: Depreciation on ${label.toLowerCase()}`, -d]);
      if (opAcc) items.push([label, [[label, amount], [`Accumulated ${word.toLowerCase()} (${inr(opAcc)}${d ? ` + ${inr(d)} for the year` : ''})`, -(opAcc + d)]], c]);
      else if (d) items.push([label, [[label, amount], [`${word} for the year`, -d]], c]);
      else items.push([label, amount, c]);
      continue;
    }
    if (c === 'Sundry debtors' && pddNew) {
      items.push([label, [[label, amount], ['Provision for doubtful debts', -pddNew]], c]);
      continue;
    }
    if (curMat.has(label)) {
      const [v, text] = curMat.get(label);
      check(v > 0 && v < amount, `current maturity of ${label}`);
      items.push([label, [[label, amount], ['Current maturities shown under Short-term Borrowings', -v]], c]);
      items.push([`Current maturities of long-term borrowings (${text})`, v, 'Current maturities of long-term borrowings']);
      continue;
    }
    check(side === (classOf(c).part === 'Assets' ? 'dr' : 'cr'), `"${label}" is on the wrong side of the trial balance`);
    if (c === 'General reserve' && adj.toGR) {
      items.push([label, [[`Balance on ${opening}`, amount], ['Add: Transfer from surplus', adj.toGR]], c]);
      continue;
    }
    items.push([label, amount, c]);
  }
  if (adj.toGR && !tb.some((r) => canon(r) === 'General reserve')) items.push(['General reserve', [['Transfer from surplus this year', adj.toGR]], 'General reserve']);
  if (pddNew !== pddOld) profitRows.push([!pddOld ? 'Less: Provision for doubtful debts created' : pddNew > pddOld ? `Less: Provision for doubtful debts raised from ${inr(pddOld)} to ${inr(pddNew)}` : `Add: Provision for doubtful debts reduced from ${inr(pddOld)} to ${inr(pddNew)}`, pddOld - pddNew]);
  for (const [l, v, c = 'Outstanding expenses'] of adj.outstanding ?? []) {
    items.push([l, v, c]);
    profitRows.push([`Less: ${l}`, -v]);
  }
  for (const [l, v, c = 'Prepaid expenses'] of adj.prepaid ?? []) {
    items.push([l, v, c]);
    profitRows.push([`Add: ${l}`, v]);
  }
  for (const [l, v, c = 'Interest accrued on investments'] of adj.accrued ?? []) {
    items.push([l, v, c]);
    profitRows.push([`Add: ${l}`, v]);
  }
  if (adj.debInterest) {
    const [l, v] = adj.debInterest;
    items.push([l, v, 'Interest accrued on debentures']);
    profitRows.push([`Less: ${l}`, -v]);
  }
  if (adj.tax) {
    items.push(['Provision for tax', adj.tax, 'Provision for tax']);
    profitRows.push(['Less: Provision for tax', -adj.tax]);
  }
  const profit = sum(profitRows.map(([, v]) => v));
  const surplusParts = [];
  if (surplusOpen) surplusParts.push([surplusOpen > 0 ? `Balance on ${opening}` : `Debit balance on ${opening}`, surplusOpen]);
  surplusParts.push([profit >= 0 ? 'Add: Profit for the year (see working)' : 'Loss for the year (see working)', profit]);
  if (adj.toGR) surplusParts.push(['Transfer to general reserve', -adj.toGR]);
  const surplus = sum(surplusParts.map(([, v]) => v));
  items.push([surplus >= 0 ? 'Surplus, i.e. balance in the Statement of Profit and Loss' : 'Surplus, i.e. balance in the Statement of Profit and Loss (debit balance)', surplusParts, 'Surplus, i.e. balance in the Statement of Profit and Loss']);
  // bs() throws unless both parts agree: since the trial balance agrees and every adjustment above was
  // posted to the profit and to one balance sheet line, a slip in any adjustment stops the build here.
  const B = bs({ title, date, share, items, contingent: adj.contingent ?? [] });
  const W = working('Working: profit for the year', profitRows, 'Profit for the year');
  check(W.total === profit, 'working total');
  return { ...B, tb: T, profit, profitRows, profitWorking: W.md, profitTable: W, surplus, surplusOpen, items, pddOld, pddNew };
}
