// Build ISC 12 Accounts ch09 Final Accounts of Companies. Run from platform/:
//   npx tsx content/authored/economics-commerce/isc-12-accounts-ch09/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';
import { inr, rs, rw, words, sum, pct, check, md, classTable, formatRows, shareNote, bs, finalAccounts, noteRowsOf, NOTE_HEADERS, CONTINGENT } from './acc.mjs';

setUnit('isc-12-accounts-ch09', 'economics-commerce');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const eq = (a, b, what) => check(JSON.stringify(a) === JSON.stringify(b), `deck figure ${what}: got ${JSON.stringify(a)}, expected ${JSON.stringify(b)}`);
const D = '31 March 2026';
const tableOf = (B, alt, caption) => table(B.headers, B.rows, alt, caption);
const notesTable = (rows, alt, caption) => table(NOTE_HEADERS, rows, alt, caption);
const ct = (items, alt, caption) => {
  const c = classTable(items);
  return table(c.headers, c.rows, alt, caption);
};

// ---------------------------------------------------------------- Part 1 running company (computed, never typed)
// Thoseghar Agri Drones Ltd, Satara (imagined): balances on 31 March 2026, no adjustments left.
const TDsc = shareNote({ fv: 10, authorised: 200000, issued: 120000, full: 120000 });
const TD_INT = pct(9, 500000) / 2;
eq(TD_INT, 22500, 'Thoseghar half-year interest');
const TD_EL = [
  ['Securities premium', 180000],
  ['General reserve', 220000],
  ['Surplus, i.e. balance in the Statement of Profit and Loss', 130000],
  ['9% Debentures (redeemable in 2030)', 500000, 'Debentures'],
  ['Term loan from a bank (excluding the instalment due in January 2027)', 240000, 'Long-term loan from a bank'],
  ['Provision for gratuity payable after twelve months', 70000],
  ['Bank overdraft', 50000],
  ['Term loan instalment due in January 2027', 60000, 'Current maturities of long-term borrowings'],
  ['Sundry creditors', 210000],
  ['Bills payable', 40000],
  ['Advance received from customers', 35000],
  ['Interest accrued on debentures (half-year)', TD_INT, 'Interest accrued on debentures'],
  ['Provision for tax', 90000],
];
const TD_AS0 = [
  ['Land and buildings', 900000],
  ['Plant and machinery', [['Plant and machinery', 600000], ['Accumulated depreciation', -120000]]],
  ['Flight-control software', 110000, 'Computer software'],
  ['Test hangar under construction', 150000, 'Capital work-in-progress'],
  ['Crop-mapping software being developed', 60000, 'Intangible assets under development'],
  ['Non-current investments', 100000],
  ['Advance paid for a carbon-fibre moulding press', 40000, 'Capital advances'],
  ['Raw materials (drone kits)', 230000, 'Raw materials'],
  ['Finished goods (drones)', 260000, 'Finished goods'],
  ['Loose tools', 20000],
  ['Sundry debtors', [['Sundry debtors', 310000], ['Provision for doubtful debts', -10000]]],
  ['Bills receivable', 30000],
  ['Cash in hand', 8000],
  ['Advance to suppliers', 25000],
  ['Prepaid expenses', 12000],
];
const TDel = bs({ date: D, share: TDsc, items: TD_EL, only: 'el' });
const TDas0 = bs({ date: D, items: TD_AS0, only: 'as' });
const TD_CASH = TDel.total - TDas0.total;
eq([TDel.total, TD_CASH], [3047500, 322500], 'Thoseghar totals');
const TD_AS = [...TD_AS0.slice(0, 12), ['Cash at bank', TD_CASH], ...TD_AS0.slice(12)];
const TDas = bs({ date: D, items: TD_AS, only: 'as' });
const TD = bs({ title: 'Balance Sheet of Thoseghar Agri Drones Ltd (imagined) as at 31 March 2026', date: D, share: TDsc, items: [...TD_EL, ...TD_AS] });
eq([TD.total, TD.headTotal.sf, TD.headTotal.ncl, TD.headTotal.cl, TD.headTotal.nca, TD.headTotal.ca], [3047500, 1730000, 810000, 507500, 1840000, 1207500], 'Thoseghar heads');
eq([TD.subTotal.ppe, TD.subTotal.tr, TD.subTotal.inv, TD.subTotal.stb, TD.subTotal.ocl], [1380000, 330000, 510000, 110000, 57500], 'Thoseghar sub-heads');

// ---------------------------------------------------------------- Part 2 running company
// Kunchikal Rainwear Ltd, Agumbe (imagined): trial balance on 31 March 2026 with adjustments.
const KRsc = shareNote({ fv: 10, authorised: 150000, issued: 100000, full: 99000, forfeited: { n: 1000, amount: 4000 } });
const KR_DIV = pct(10, KRsc.paidUp);
const KR = finalAccounts({
  title: 'Balance Sheet of Kunchikal Rainwear Ltd (imagined) as at 31 March 2026', date: D, opening: '1 April 2025', share: KRsc,
  tb: [
    ['Land', 'dr', 300000],
    ['Buildings', 'dr', 600000],
    ['Plant and machinery', 'dr', 700000],
    ['Trademarks', 'dr', 80000],
    ['Non-current investments', 'dr', 100000],
    ['Raw materials (PVC sheets and lining cloth)', 'dr', 85000, 'Raw materials'],
    ['Finished goods (raincoats and umbrellas)', 'dr', 190000, 'Finished goods'],
    ['Loose tools', 'dr', 24000],
    ['Sundry debtors', 'dr', 240000],
    ['Bills receivable', 'dr', 40000],
    ['Cash at bank', 'dr', 288000],
    ['Cash in hand', 'dr', 12000],
    ['Equity share capital (99,000 shares of ₹10 each, fully paid)', 'cr', 990000, 'Equity share capital'],
    ['Share forfeiture', 'cr', 4000, 'Forfeited shares'],
    ['Securities premium', 'cr', 120000],
    ['General reserve', 'cr', 200000],
    ['Statement of Profit and Loss (1 April 2025)', 'cr', 60000, 'SURPLUS'],
    ['Profit for the year before the adjustments below', 'cr', 340000, 'PROFIT'],
    ['10% Debentures (5,000 of ₹100 each)', 'cr', 500000, 'Debentures'],
    ['Bank overdraft', 'cr', 45000],
    ['Sundry creditors', 'cr', 130000],
    ['Bills payable', 'cr', 25000],
    ['Accumulated depreciation on buildings', 'cr', 90000, 'Accumulated depreciation', 'Buildings'],
    ['Accumulated depreciation on plant and machinery', 'cr', 150000, 'Accumulated depreciation', 'Plant and machinery'],
    ['Provision for doubtful debts', 'cr', 5000],
  ],
  adj: {
    dep: [['Buildings', pct(5, 600000)], ['Plant and machinery', pct(10, 700000)]],
    pdd: pct(5, 240000),
    outstanding: [['Outstanding wages', 14000]],
    prepaid: [['Prepaid insurance', 6000]],
    debInterest: ['Interest accrued on debentures (half-year to 31 March 2026)', pct(10, 500000) / 2],
    tax: 50000,
    toGR: 40000,
    curMat: [['10% Debentures (5,000 of ₹100 each)', 100000, '1,000 debentures due for redemption on 30 June 2026']],
    contingent: [['Proposed final dividend at 10% on the paid-up equity capital, subject to approval at the annual general meeting', KR_DIV]],
  },
});
eq([KR.tb.total, KR.profit, KR.surplus, KR.subTotal.rs, KR.total, KR_DIV], [2659000, 150000, 170000, 530000, 2313000, 99000], 'Kunchikal');
eq([KR.subTotal.sc, KR.subTotal.ltb, KR.subTotal.stb, KR.subTotal.ocl, KR.subTotal.ppe, KR.subTotal.tr], [994000, 400000, 145000, 39000, 1260000, 268000], 'Kunchikal sub-heads');
const KRadj = [
  'Depreciate buildings at 5% and plant and machinery at 10% on cost.',
  'Keep the provision for doubtful debts at 5% of debtors.',
  'Wages of ₹14,000 are outstanding; insurance of ₹6,000 is prepaid.',
  'Interest on the debentures for the half-year to 31 March 2026 is unpaid.',
  'Provide ₹50,000 for tax; transfer ₹40,000 to General Reserve.',
  '1,000 debentures are to be redeemed on 30 June 2026; the Board proposes a dividend of 10% on the paid-up capital.',
];

// ---------------------------------------------------------------- visuals: Part 1
const vRoute1 = flow('LR', ['Section 129 and Schedule III Part I', 'Equity and Liabilities: heads and sub-heads', 'Assets: heads and sub-heads', 'Current or non-current?', 'A complete Balance Sheet with notes'], 'Route map of Part 1: the law that fixes the form, the heads and sub-heads of equity and liabilities and of assets, the test for current and non-current items, and a complete balance sheet with notes', 'Part 1 at a glance');
const vLaw = table(
  ['Point', 'Rule'],
  [
    ['Section 129, Companies Act, 2013', 'Financial statements must give a true and fair view and follow the form in Schedule III'],
    ['Schedule III, Part I', 'Form of the Balance Sheet: vertical; Equity and Liabilities first, then Assets'],
    ['Schedule III, Part II', 'Form of the Statement of Profit and Loss: **not required** for ISC 2027 final accounts'],
    ['Notes to accounts', 'The details behind each figure, numbered and quoted against it on the face of the Balance Sheet'],
    ['The ISC question', 'A Balance Sheet with notes from a trial balance and adjustments; profit given or found in a working'],
  ],
  'Table of the rules behind company final accounts: section one hundred and twenty-nine requires a true and fair view in the form of Schedule Three; Part One gives the vertical balance sheet; Part Two, the statement of profit and loss, is not required for the ISC final accounts; notes give the details; the ISC question asks for a balance sheet with notes from a trial balance and adjustments',
);
const vFormEL = table(['Major head', 'Sub-heads (in order)'], formatRows('el'), 'Table of the equity and liabilities part of Schedule Three: shareholders funds with share capital, reserves and surplus and money received against share warrants; share application money pending allotment as a head by itself; non-current liabilities with long-term borrowings, deferred tax liabilities, other long-term liabilities and long-term provisions; current liabilities with short-term borrowings, trade payables, other current liabilities and short-term provisions', 'Schedule III Part I: I. Equity and Liabilities');
const vFormAS = table(['Major head', 'Sub-heads (in order)'], formatRows('as'), 'Table of the assets part of Schedule Three: non-current assets with property, plant and equipment and intangible assets (property, plant and equipment, intangible assets, capital work-in-progress and intangible assets under development), non-current investments, deferred tax assets, long-term loans and advances and other non-current assets; current assets with current investments, inventories, trade receivables, cash and cash equivalents, short-term loans and advances and other current assets', 'Schedule III Part I (as amended): II. Assets');
const vCycle = flow('TB', ['Will the item be realised or settled within the normal operating cycle?', 'Is it held mainly for trading?', 'Is it due within twelve months after the Balance Sheet date?', 'Yes to any question: current. No to all: non-current'], 'Flow of the test for current items: an asset or liability is current if it will be realised or settled within the normal operating cycle, or is held mainly for trading, or is due within twelve months after the balance sheet date; otherwise it is non-current', 'A liability is also current if the company cannot put off paying it for twelve months.');
const TD_L = [['9% Debentures (redeemable in 2030)', 'Debentures'], ['Term loan instalment due in January 2027', 'Current maturities of long-term borrowings'], ['Bank overdraft', 'Bank overdraft'], ['Bills payable', 'Bills payable'], ['Advance received from customers', 'Advance received from customers'], ['Interest accrued on debentures', 'Interest accrued on debentures'], ['Provision for gratuity payable after twelve months', 'Provision for gratuity payable after twelve months'], ['Provision for tax', 'Provision for tax']];
const vWE1 = ct(TD_L, 'Table classifying eight liabilities of Thoseghar Agri Drones: the debentures under long-term borrowings, the loan instalment due within a year and the overdraft under short-term borrowings, bills payable under trade payables, the customer advance and accrued interest under other current liabilities, the gratuity provision under long-term provisions and the tax provision under short-term provisions', 'Thoseghar Agri Drones Ltd, Satara (imagined), 31 March 2026.');
const vSF = table(
  ['Item', 'Where it goes'],
  [
    ['Share capital', "Shareholders' Funds: subscribed capital less calls in arrears, plus forfeited shares not reissued (note)"],
    ['Securities premium, capital reserve, general reserve', 'Reserves and Surplus (note)'],
    ['Surplus, i.e. balance in the Statement of Profit and Loss', 'Last line of Reserves and Surplus; a debit balance is shown negative there'],
    ['Money received against share warrants', "Shareholders' Funds, own sub-head"],
    ['Share application money pending allotment (not refundable)', 'A major head by itself, after Shareholders\' Funds'],
    ['Calls in advance', 'Not capital: Current Liabilities, Other Current Liabilities'],
  ],
  "Table of where shareholders' items go: share capital net of calls in arrears plus forfeited shares; reserves including the surplus, which may be negative; money against share warrants; share application money pending allotment as a head by itself; calls in advance as an other current liability",
);
const vWE2 = tableOf(TDel, `Equity and liabilities part of Thoseghar's balance sheet: share capital ${inr(TDel.subTotal.sc)}, reserves and surplus ${inr(TDel.subTotal.rs)}, long-term borrowings ${inr(TDel.subTotal.ltb)}, long-term provisions ${inr(TDel.subTotal.ltp)}, short-term borrowings ${inr(TDel.subTotal.stb)}, trade payables ${inr(TDel.subTotal.tp)}, other current liabilities ${inr(TDel.subTotal.ocl)} and short-term provisions ${inr(TDel.subTotal.stp)}, total ${inr(TDel.total)}`, 'Thoseghar Agri Drones Ltd (imagined): I. Equity and Liabilities as at 31 March 2026. Notes are in worked example 5.');
const vCaptions = table(
  ['Before the amendment', 'Amended Schedule III'],
  [
    ['Fixed assets', 'Property, Plant and Equipment and Intangible Assets'],
    ['Tangible assets', '(i) Property, Plant and Equipment'],
    ['Intangible assets', '(ii) Intangible Assets'],
    ['Capital work-in-progress', '(iii) Capital Work-in-Progress'],
    ['Intangible assets under development', '(iv) Intangible Assets under Development'],
  ],
  'Table of the amended captions for fixed assets: fixed assets became property, plant and equipment and intangible assets; tangible assets became property, plant and equipment; intangible assets, capital work-in-progress and intangible assets under development are the other three sub-heads',
  'The amendment also renamed "Securities Premium Reserve" as "Securities Premium" (Reserves and Surplus).',
);
const TD_A = [['Plant and machinery (less accumulated depreciation)', 'Plant and machinery'], ['Flight-control software', 'Computer software'], ['Test hangar under construction', 'Capital work-in-progress'], ['Crop-mapping software being developed', 'Intangible assets under development'], ['Advance paid for a moulding press', 'Capital advances'], ['Drone kits and finished drones', 'Raw materials'], ['Bills receivable', 'Bills receivable'], ['Advance to suppliers of propellers', 'Advance to suppliers']];
const vWE3 = ct(TD_A, 'Table classifying eight assets of Thoseghar: plant under property, plant and equipment; the flight-control software as an intangible asset; the hangar under construction as capital work-in-progress; the software being written as intangible assets under development; the advance for a press as a long-term loan and advance; drone kits and drones as inventories; bills receivable as trade receivables; the advance to suppliers as a short-term loan and advance', 'Thoseghar Agri Drones Ltd (imagined), 31 March 2026.');
const vWE4 = tableOf(TDas, `Assets part of Thoseghar's balance sheet: property, plant and equipment ${inr(TDas.subTotal.ppe)}, intangible assets ${inr(TDas.subTotal.intang)}, capital work-in-progress ${inr(TDas.subTotal.cwip)}, intangible assets under development ${inr(TDas.subTotal.iaud)}, non-current investments ${inr(TDas.subTotal.nci)}, long-term loans and advances ${inr(TDas.subTotal.ltla)}, inventories ${inr(TDas.subTotal.inv)}, trade receivables ${inr(TDas.subTotal.tr)}, cash and cash equivalents ${inr(TDas.subTotal.cce)}, short-term loans and advances ${inr(TDas.subTotal.stla)} and other current assets ${inr(TDas.subTotal.oca)}, total ${inr(TDas.total)}`, 'Thoseghar Agri Drones Ltd (imagined): II. Assets as at 31 March 2026.');
const vSides = (() => {
  const s = new Svg(640, 320);
  const H = 230, top = 50, W = 170, xs = { el: 120, as: 350 };
  const total = TD.total;
  const cols = {
    el: [["Shareholders' Funds", TD.headTotal.sf, 'blue'], ['Non-current Liabilities', TD.headTotal.ncl, 'yellow'], ['Current Liabilities', TD.headTotal.cl, 'red']],
    as: [['Non-current Assets', TD.headTotal.nca, 'green'], ['Current Assets', TD.headTotal.ca, 'yellow']],
  };
  for (const [side, parts] of Object.entries(cols)) {
    check(sum(parts.map(([, v]) => v)) === total, `${side} column adds to the total`);
    let y = top;
    for (const [name, v, color] of parts) {
      const h = (H * v) / total;
      s.rect(xs[side], y, W, h, { fill: color, color: 'accent', sw: 1.5, rx: 2 });
      s.text(xs[side] + W / 2, y + h / 2 - 9, name, { size: 12, bold: true });
      s.text(xs[side] + W / 2, y + h / 2 + 9, rs(v), { size: 12 });
      y += h;
    }
    check(Math.abs(y - top - H) < 1e-9, `${side} column height`);
  }
  s.text(xs.el + W / 2, top - 18, 'I. Equity and Liabilities', { size: 13, bold: true });
  s.text(xs.as + W / 2, top - 18, 'II. Assets', { size: 13, bold: true });
  s.line(xs.el - 10, top, xs.as + W + 10, top, { sw: 1, dash: true, color: 'muted' });
  s.line(xs.el - 10, top + H, xs.as + W + 10, top + H, { sw: 1, dash: true, color: 'muted' });
  s.text(xs.as + W + 16, top + H / 2, `${rs(total)} each`, { size: 12, anchor: 'start', muted: true });
  s.text(320, top + H + 30, 'Thoseghar Agri Drones Ltd (imagined), 31 March 2026: heights drawn to scale', { size: 12, muted: true });
  return s.visual(`Two columns of equal height for Thoseghar's balance sheet. Equity and liabilities: shareholders funds ${rw(TD.headTotal.sf)}, non-current liabilities ${rw(TD.headTotal.ncl)} and current liabilities ${rw(TD.headTotal.cl)}. Assets: non-current assets ${rw(TD.headTotal.nca)} and current assets ${rw(TD.headTotal.ca)}. Both total ${rw(total)}`, 'Segment heights are computed from the balance sheet totals.');
})();
const vWE5 = notesTable(TD.notesRows, `Notes to accounts of Thoseghar, numbered one to ${Object.keys(TD.noteNo).length}: share capital ${inr(TD.subTotal.sc)}, reserves and surplus ${inr(TD.subTotal.rs)}, long-term borrowings, short-term borrowings, trade payables, other current liabilities, property, plant and equipment, inventories, trade receivables, cash and cash equivalents and other current assets`, 'Thoseghar Agri Drones Ltd (imagined): notes to accounts as at 31 March 2026.');
const vTraps = table(
  ['Item', 'Correct place', 'Common slip'],
  [
    ['Calls in advance', 'Other Current Liabilities', 'Added to share capital'],
    ['Calls in arrears', 'Deducted in the Share Capital note', 'Shown as a current asset'],
    ['Loose tools', 'Inventories', 'Property, Plant and Equipment'],
    ['Premium on redemption of debentures', 'Other Long-term Liabilities', 'Reserves and Surplus'],
    ['Capital advance for a machine', 'Long-term Loans and Advances', 'Short-term Loans and Advances'],
    ['Debentures due within 12 months', 'Short-term Borrowings (current maturities)', 'Left in Long-term Borrowings'],
    ['Proposed dividend', 'Note on contingent liabilities', 'Short-term Provisions'],
    ['Debit balance of the Statement of Profit and Loss', 'Negative item in Reserves and Surplus', 'Shown as an asset'],
  ],
  'Table of eight classification traps: calls in advance, calls in arrears, loose tools, premium on redemption, a capital advance, debentures due within a year, proposed dividend and a debit balance of profit and loss, each with its correct place and the usual mistake',
);
const vSummary1 = table(
  ['Idea', 'Rule'],
  [
    ['Form', 'Schedule III Part I: Equity and Liabilities, then Assets; totals on the face, details in notes'],
    ['Current or non-current', 'Operating cycle, held for trading, or due within 12 months: current'],
    ["Shareholders' Funds", 'Share capital, reserves and surplus (may be negative), share warrants'],
    ['Liabilities', 'Borrowings, other liabilities and provisions, each long-term or short-term'],
    ['Assets', 'Property, Plant and Equipment and Intangible Assets first; current assets last'],
    ['Check', 'Both parts must total the same'],
  ],
  'Summary table of Part 1: the form of Schedule Three, the current and non-current test, shareholders funds, liabilities and assets by sub-head, and the check that both parts agree',
);

// ---------------------------------------------------------------- visuals: Part 2
const vRoute2 = flow('LR', ['Notes to accounts', 'Share Capital note', 'Profit working and Reserves and Surplus', 'Borrowings and current maturities', 'Fixed assets and receivables', 'Proposed dividend: contingent'], 'Route map of Part 2: notes to accounts, the share capital note, the profit working with reserves and surplus, borrowings with current maturities, fixed assets and receivables, and the proposed dividend as a contingent liability', 'Part 2 at a glance');
const vNotesFlow = flow('LR', ['Trial balance and adjustments', 'Numbered notes (the details)', 'Balance Sheet (one figure per sub-head, with its note number)', 'Contingent liabilities: disclosed, not added'], 'Flow from the trial balance and adjustments to numbered notes, then to the balance sheet which shows one figure per sub-head with its note number, and finally contingent liabilities which are disclosed but not added', 'How notes and the Balance Sheet fit together');
const vShareFmt = table(
  ['Line of the note', 'What it shows', 'Added to the total?'],
  [
    ['Authorised capital', 'Shares the company may issue (memorandum)', 'No'],
    ['Issued capital', 'Shares offered to the public', 'No'],
    ['Subscribed and fully paid', 'Shares taken up and fully paid', 'Yes'],
    ['Subscribed but not fully paid', 'Amount called up, less calls in arrears', 'Yes (net)'],
    ['Add: Forfeited shares', 'Amount received on forfeited shares not yet reissued', 'Yes'],
  ],
  'Table of the share capital note: authorised and issued capital shown for information only; subscribed and fully paid capital, subscribed but not fully paid capital net of calls in arrears, and forfeited shares not reissued are added to the total',
);
const vWE6 = notesTable(noteRowsOf(KR, ['sc']), `Share capital note of Kunchikal Rainwear: authorised ${inr(1500000)}, issued ${inr(1000000)}, subscribed and fully paid ${inr(990000)}, plus forfeited shares ${inr(4000)}, total ${inr(KR.subTotal.sc)}`, 'Kunchikal Rainwear Ltd, Agumbe (imagined): 1,000 shares forfeited earlier (₹4 per share received) are not reissued.');
const vSurplusFlow = flow('LR', ['Profit for the year (given, or found in a working)', 'Surplus: opening balance + profit', 'Less: transfer to General Reserve', 'Closing surplus in Reserves and Surplus'], 'Flow of the profit into reserves: the profit for the year is added to the opening surplus, the transfer to general reserve is deducted, and the closing surplus is shown in reserves and surplus', 'A proposed dividend is not deducted: it is only disclosed.');
const vAdj = table(
  ['Adjustment', 'Effect on profit', 'Balance Sheet line'],
  [
    ['Depreciation', 'Less', 'Added to accumulated depreciation, deducted in the PPE note'],
    ['Provision for doubtful debts', 'Less the increase', 'Deducted from sundry debtors (Trade Receivables)'],
    ['Outstanding expense', 'Less', 'Other Current Liabilities'],
    ['Prepaid expense', 'Add', 'Other Current Assets'],
    ['Interest accrued on debentures', 'Less', 'Other Current Liabilities'],
    ['Provision for tax', 'Less', 'Short-term Provisions'],
    ['Transfer to General Reserve', 'None (out of surplus)', 'Surplus down, General Reserve up'],
    ['Debentures due within 12 months', 'None', 'Short-term Borrowings (current maturities)'],
    ['Proposed dividend', 'None', 'Note on contingent liabilities only'],
  ],
  'Table of nine adjustments with their effect on profit and the balance sheet line they change: depreciation, provision for doubtful debts, outstanding and prepaid expenses, interest accrued, provision for tax, transfer to general reserve, current maturities and proposed dividend',
  'Each adjustment that changes the profit also changes exactly one other line, so the Balance Sheet still agrees.',
);
const vWE7 = table(KR.tb.headers, KR.tb.rows, `Trial balance of Kunchikal Rainwear at the end of March twenty twenty-six, with debit and credit totals of ${inr(KR.tb.total)}; it includes the profit for the year before adjustments, ${inr(340000)}, and the opening surplus, ${inr(60000)}`, 'Kunchikal Rainwear Ltd (imagined). Authorised capital: 1,50,000 equity shares of ₹10 each.');
const vWE7b = table(['Working: profit for the year', '₹'], KR.profitTable.rows, `Working for Kunchikal's profit: ${inr(340000)} given, less depreciation, the increase in the provision for doubtful debts, outstanding wages, interest accrued and tax, plus prepaid insurance, giving ${inr(KR.profit)}`, 'Each line is also posted to one Balance Sheet line.');
const vWaterfall = (() => {
  const s = new Svg(640, 300);
  const steps = KR.profitTable.rows.slice(0, -1).map(([l]) => l);
  check(steps.length === KR.profitRows.length, 'waterfall steps');
  const short = ['Given', 'Dep. bldg', 'Dep. plant', 'Doubtful', 'Wages', 'Insurance', 'Interest', 'Tax'];
  check(short.length === KR.profitRows.length, 'waterfall labels');
  const left = 40, base = 240, H = 190, max = 360000, bw = 50, gap = 15;
  const Y = (v) => base - (H * v) / max;
  s.line(left - 6, base, 620, base, { sw: 1.4 });
  let level = 0;
  KR.profitRows.forEach(([, v], i) => {
    const x = left + i * (bw + gap);
    const from = i === 0 ? 0 : level;
    const to = level + v;
    const color = i === 0 ? 'blue' : v < 0 ? 'red' : 'green';
    s.rect(x, Y(Math.max(from, to)), bw, Math.abs(Y(from) - Y(to)), { fill: color, color: 'accent', sw: 1.2, rx: 1 });
    s.text(x + bw / 2, Y(Math.max(from, to)) - 10, i === 0 ? inr(v) : `${v < 0 ? '−' : '+'}${inr(Math.abs(v))}`, { size: 11, bold: true });
    s.text(x + bw / 2, base + 16, short[i], { size: 11 });
    level = to;
  });
  check(level === KR.profit, 'waterfall ends at the profit for the year');
  const xf = left + KR.profitRows.length * (bw + gap);
  s.rect(xf, Y(level), bw, base - Y(level), { fill: 'yellow', color: 'accent', sw: 1.5, rx: 1 });
  s.text(xf + bw / 2, Y(level) - 10, inr(level), { size: 11, bold: true });
  s.text(xf + bw / 2, base + 16, 'Profit', { size: 11, bold: true });
  s.text(320, 22, `Kunchikal Rainwear: from ${rs(KR.profitRows[0][1])} given to ${rs(KR.profit)} for the year`, { size: 14, bold: true });
  return s.visual(`Waterfall chart of Kunchikal's profit: it starts at ${rw(KR.profitRows[0][1])}, falls for depreciation on buildings and plant, the larger provision for doubtful debts and outstanding wages, rises for prepaid insurance, falls again for interest accrued and tax, and ends at ${rw(KR.profit)}`, 'Bar positions are computed from the working; the last bar equals the profit for the year.');
})();
const vWE8 = notesTable(noteRowsOf(KR, ['rs']), `Reserves and surplus note of Kunchikal: securities premium ${inr(120000)}; general reserve ${inr(200000)} plus a transfer of ${inr(40000)}; surplus of ${inr(60000)} plus profit ${inr(KR.profit)} less the transfer, ${inr(KR.surplus)}; total ${inr(KR.subTotal.rs)}`, 'Note 2 of Kunchikal Rainwear Ltd (imagined).');
const vBorrow = table(
  ['Borrowing', 'Where it goes'],
  [
    ['Debentures, term loans, public deposits repayable after 12 months', 'Non-current Liabilities: Long-term Borrowings (state the security)'],
    ['The part of those borrowings repayable within 12 months', 'Current Liabilities: Short-term Borrowings, as current maturities of long-term borrowings'],
    ['Bank overdraft, cash credit, loans repayable on demand', 'Current Liabilities: Short-term Borrowings'],
    ['Interest accrued on borrowings', 'Other Current Liabilities (not a borrowing)'],
    ['Premium payable on redemption of debentures', 'Other Long-term Liabilities (not a borrowing)'],
  ],
  'Table of where borrowings go: long-term borrowings for amounts repayable after twelve months; the part repayable within twelve months as current maturities under short-term borrowings; overdrafts and cash credit as short-term borrowings; accrued interest as an other current liability; redemption premium as an other long-term liability',
);
const vWE9 = notesTable(noteRowsOf(KR, ['ltb', 'stb']), `Borrowings notes of Kunchikal: debentures ${inr(500000)} less current maturities ${inr(100000)} leaves long-term borrowings of ${inr(KR.subTotal.ltb)}; short-term borrowings are the current maturities ${inr(100000)} and the overdraft ${inr(45000)}, total ${inr(KR.subTotal.stb)}`, 'Notes 3 and 4 of Kunchikal Rainwear Ltd (imagined).');
const vPPE = table(
  ['Line of the note', 'Rule'],
  [
    ['Each asset at cost', 'Land, buildings, plant and machinery, furniture, vehicles'],
    ['Less: accumulated depreciation', "Opening balance plus this year's depreciation"],
    ['Land', 'Usually not depreciated'],
    ['Intangible Assets (separate note)', 'Goodwill, patents, trademarks, software: less amortisation'],
    ['Capital Work-in-Progress', 'Tangible assets still being built or installed'],
    ['Intangible Assets under Development', 'Intangibles still being developed'],
  ],
  'Table of the property, plant and equipment note: each asset at cost less accumulated depreciation including this year, land usually not depreciated, intangible assets in a separate note less amortisation, and capital work-in-progress and intangible assets under development as separate sub-heads',
);
const vWE10 = notesTable(noteRowsOf(KR, ['ppe', 'tr']), `Property, plant and equipment note of Kunchikal: land ${inr(300000)}; buildings ${inr(600000)} less accumulated depreciation ${inr(120000)}; plant ${inr(700000)} less ${inr(220000)}; total ${inr(KR.subTotal.ppe)}. Trade receivables note: debtors ${inr(240000)} less provision ${inr(12000)}, plus bills receivable ${inr(40000)}, total ${inr(KR.subTotal.tr)}`, 'Notes 7 and 9 of Kunchikal Rainwear Ltd (imagined).');
const vDiv = table(
  ['Question', 'Proposed dividend'],
  [
    ['Who recommends it?', 'The Board of Directors, usually after the year end'],
    ['When does it become payable?', 'Only when the shareholders declare it at the annual general meeting'],
    ['Is it a liability on the Balance Sheet date?', 'No: there is no present obligation'],
    ['Treatment in the ISC syllabus', 'Disclosed under contingent liabilities and commitments in the notes'],
    ['Effect on the figures', 'None: the surplus is not reduced and no provision is made'],
  ],
  'Table on the proposed dividend: the board recommends it after the year end, it becomes payable only when shareholders declare it, so it is not a liability at the balance sheet date; it is disclosed under contingent liabilities and does not reduce the surplus',
);
const vWE11 = tableOf(KR, `Balance sheet of Kunchikal Rainwear at the end of March twenty twenty-six: share capital ${inr(KR.subTotal.sc)}, reserves and surplus ${inr(KR.subTotal.rs)}, long-term borrowings ${inr(KR.subTotal.ltb)}, short-term borrowings ${inr(KR.subTotal.stb)}, trade payables ${inr(KR.subTotal.tp)}, other current liabilities ${inr(KR.subTotal.ocl)}, short-term provisions ${inr(KR.subTotal.stp)}; assets the same total of ${inr(KR.total)}`, `The proposed dividend is disclosed in Note ${KR.contNo} only.`);
const vWE11b = notesTable(noteRowsOf(KR, ['tp', 'ocl', 'inv', 'cce', 'cont']), `Remaining notes of Kunchikal: trade payables ${inr(KR.subTotal.tp)}, other current liabilities ${inr(KR.subTotal.ocl)}, inventories ${inr(KR.subTotal.inv)}, cash and cash equivalents ${inr(KR.subTotal.cce)}, and the contingent liability for the proposed dividend of ${inr(KR_DIV)}`, 'Short-term Provisions (₹50,000) and Other Current Assets (₹6,000) have one item each, so they need no note.');
const vSummary2 = table(
  ['Idea', 'Rule'],
  [
    ['Share Capital note', 'Authorised and issued for information; subscribed less calls in arrears, plus forfeited shares'],
    ['Profit', 'Given, or found in a working from a given profit and the adjustments'],
    ['Reserves and Surplus', 'Opening surplus + profit − transfers; a debit balance is negative'],
    ['Borrowings', 'Repayable within 12 months: current maturities under Short-term Borrowings'],
    ['Fixed assets', 'Cost less accumulated depreciation; intangibles less amortisation'],
    ['Proposed dividend', 'Contingent liability in the notes; never deducted'],
  ],
  'Summary table of Part 2: the share capital note, the profit working, reserves and surplus, current maturities of borrowings, fixed assets net of depreciation and the proposed dividend as a contingent liability',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Final Accounts of Companies — Part 1: Schedule III, Heads and Classification',
  goals: [
    'State what Section 129 and Schedule III Part I of the Companies Act, 2013 require of a company Balance Sheet',
    'Name the major heads and sub-heads of Equity and Liabilities and of Assets in order, including the amended captions',
    'Decide whether an asset or a liability is current or non-current using the operating cycle and the twelve-month rule',
    'Classify the balances of a company and draw up its Balance Sheet with notes',
  ],
  slides: [
    sl('title', 'Final Accounts of Companies', {
      b: 'Part 1 — the **form** of a company Balance Sheet under **Schedule III Part I**, its **heads and sub-heads**, and how to **classify** every balance. Every company, person and figure in this chapter is imagined.',
      v: vRoute1,
      n: 'A company must present its Balance Sheet in a form fixed by law, so that every reader finds each item in the same place. In this part we learn that form, the major heads and sub-heads of Schedule Three, Part One, the test that separates current from non-current items, and the recent changes in captions. Our running company is Thoseghar Agri Drones of Satara.',
    }),
    sl('concept', 'What the law and the ISC syllabus ask for', {
      v: vLaw,
      b: 'For ISC 2027 the **Statement of Profit and Loss (Part II) is not required** for final accounts: profit is given, or found in one working.',
      n: 'Section one hundred and twenty-nine of the Companies Act requires financial statements that give a true and fair view, in the form set out in Schedule Three. Part One of that schedule gives the form of the Balance Sheet. Your syllabus asks for the Balance Sheet with notes, prepared from a trial balance with adjustments. The Statement of Profit and Loss in Part Two is not required.',
    }),
    sl('concept', 'The form: Equity and Liabilities', {
      v: vFormEL,
      b: 'Four major heads, always in this order; each sub-head carries a **note number** when it needs details.',
      n: 'The first part of the Balance Sheet shows where the money came from. Shareholders funds come first, then share application money pending allotment as a head of its own, then non-current liabilities and finally current liabilities. Learn the sub-heads in order, because the examiner expects them in exactly this sequence.',
    }),
    sl('concept', 'The form: Assets', {
      v: vFormAS,
      b: 'The amended caption is **Property, Plant and Equipment and Intangible Assets**, with four sub-heads.',
      n: 'The second part shows how the money is used. Non-current assets come first. Their first group, after the amendment, is property, plant and equipment and intangible assets, with four sub-heads: property, plant and equipment, intangible assets, capital work in progress and intangible assets under development. Current assets follow, from current investments down to other current assets.',
    }),
    sl('concept', 'Current or non-current?', {
      v: vCycle,
      bl: ['The **operating cycle** runs from buying inputs to collecting cash from customers.', 'When no single cycle can be identified, Schedule III takes a cycle of **twelve months**.'],
      n: 'An item is current if it will be realised or settled within the normal operating cycle, if it is held mainly for trading, or if it falls due within twelve months after the Balance Sheet date. Everything else is non-current. Remember that a long operating cycle can make an item current even when it is more than a year away.',
    }),
    sl('example', 'Worked example 1: classifying Thoseghar’s liabilities', {
      b: 'Thoseghar Agri Drones Ltd, Satara (imagined), on 31 March 2026. Place each liability under its major head and sub-head.',
      v: vWE1,
      n: 'Take each liability in turn. The debentures run to twenty thirty, so they are long-term borrowings. The loan instalment due next January and the overdraft are short-term borrowings. Bills payable are trade payables. The customer advance and the accrued interest are other current liabilities. The gratuity provision is long-term and the tax provision short-term.',
    }),
    sl('check', 'Quick check: no clear operating cycle', {
      b: 'Fill in the number.',
      chk: 'fb_twelve',
      n: 'Recall the length that Schedule Three assumes when a company cannot identify its normal operating cycle.',
    }),
    sl('concept', "Shareholders' Funds and the separate head", {
      v: vSF,
      b: 'Owners’ money stays together; money still **owed back** to shareholders does not.',
      n: 'Shareholders funds hold share capital, reserves and surplus, and money received against share warrants. Share capital is shown net of calls in arrears, plus forfeited shares not yet reissued. Share application money that will not be refunded sits as a separate head. Calls received in advance are not capital at all: they are other current liabilities.',
    }),
    sl('example', 'Worked example 2: Thoseghar’s Equity and Liabilities', {
      b: 'Thoseghar has 1,20,000 equity shares of ₹10 each, fully paid (authorised 2,00,000 shares), and the balances classified in worked example 1.',
      v: vWE2,
      n: `Here is the first part of Thoseghar's Balance Sheet. Shareholders funds total ${rw(TD.headTotal.sf)}. Non-current liabilities, the long-term borrowings and the gratuity provision, come to ${rw(TD.headTotal.ncl)}. Current liabilities add ${rw(TD.headTotal.cl)}. Each sub-head with more than one item gets a note number.`,
    }),
    sl('check', 'Quick check: four liabilities, four sub-heads', {
      b: 'Match each liability with its sub-head.',
      chk: 'mt_liab',
      n: 'Ask of each liability whether it is a borrowing, a provision or another kind of liability, and whether it is due within the year.',
    }),
    sl('concept', 'Assets: captions after the amendment', {
      v: vCaptions,
      b: 'Finished assets in use and assets **still being built or developed** are kept apart.',
      n: 'The amended Schedule Three renamed fixed assets as property, plant and equipment and intangible assets. Tangible assets are now called property, plant and equipment. An asset still under construction is capital work in progress, and an intangible still being developed has its own line. The same amendment renamed securities premium reserve as simply securities premium.',
    }),
    sl('example', 'Worked example 3: classifying Thoseghar’s assets', {
      b: 'Eight of Thoseghar’s assets on 31 March 2026, each placed under its sub-head.',
      v: vWE3,
      n: 'Thoseghar owns plant, which is property, plant and equipment. Its flight-control software is an intangible asset, but the crop-mapping software still being written is an intangible under development. The hangar being built is capital work in progress. The advance for a press is a long-term advance, the drone kits are inventories and the bills are trade receivables.',
    }),
    sl('example', 'Worked example 4: Thoseghar’s Assets', {
      b: `Cash at bank of ${rs(TD_CASH)} completes the list of assets.`,
      v: vWE4,
      n: `The assets side follows the same order every time. Property, plant and equipment of ${rw(TD.subTotal.ppe)} comes first, with the other fixed-asset lines beside it. Current assets end with cash and other current assets. The total is ${rw(TD.total)}, exactly the total of equity and liabilities.`,
    }),
    sl('check', 'Quick check: a building not yet finished', {
      b: 'True or false?',
      chk: 'tf_cwip',
      n: 'Decide where an asset that is still under construction belongs.',
    }),
    sl('diagram', 'Both parts tell the same story', {
      v: vSides,
      b: 'Money raised (left) = money used (right).',
      n: 'The two columns are drawn to scale. On the left, owners funds make up more than half of the total, then long-term and current liabilities. On the right, non-current assets are the larger block and current assets the rest. The two columns end at exactly the same height, which is the check every Balance Sheet must pass.',
    }),
    sl('example', 'Worked example 5: Thoseghar’s notes to accounts', {
      b: 'The figures on the face of the Balance Sheet come from these notes.',
      v: vWE5,
      n: 'Each note lists the items behind one figure on the face of the Balance Sheet and ends with the same total. Share capital shows the authorised and issued capital for information. Borrowings separate the debentures from the loan. Plant is shown at cost less accumulated depreciation, and debtors less the provision for doubtful debts.',
    }),
    sl('check', "Quick check: shareholders' funds", {
      b: 'Owners’ money only.',
      chk: 'n_sf',
      n: 'Deduct calls in arrears from share capital, deduct the debit balance within the reserves, and leave the debentures out.',
    }),
    sl('concept', 'Classification traps', {
      v: vTraps,
      n: 'These eight items cause most of the lost marks. Calls in advance are a liability, while calls in arrears are deducted in the share capital note. Loose tools are inventories. The redemption premium is a long-term liability. A debit balance of profit and loss stays inside reserves and surplus as a negative figure, and the proposed dividend is only a note.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up: Schedule Three, Part One fixes the order of heads and sub-heads. Test each item against the operating cycle, trading and the twelve-month rule. Shareholders funds come first, then liabilities. Property, plant and equipment and intangible assets open the assets side. Put the details in notes and make sure both parts agree.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Write the heads and sub-heads **in Schedule III order**, with a Note No. column.',
        'Give the **major head and the sub-head** for every item you classify: half marks are lost for the sub-head alone.',
        'Remember the amended captions: **Property, Plant and Equipment**, **Securities Premium**, **Intangible Assets under Development**.',
        'Never show a loss or calls in arrears as an asset.',
        'Total both parts and check they agree before moving on.',
      ],
      n: 'In the exam, write the heads and sub-heads in their legal order with a column for note numbers. When you classify an item, give both the major head and the sub-head. Use the amended captions. Never show a loss or unpaid calls as an asset. And total both parts before you move on: a difference tells you something is misplaced.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Final Accounts of Companies — Part 2: Notes to Accounts and the Balance Sheet from a Trial Balance',
  goals: [
    'Prepare the notes on Share Capital, Reserves and Surplus, Borrowings and Property, Plant and Equipment',
    'Work out the profit for the year from a given profit and the adjustments, and carry it to the surplus',
    'Show current maturities of long-term borrowings under Short-term Borrowings and a proposed dividend as a contingent liability',
    'Prepare the Balance Sheet of a company from a trial balance with adjustments',
  ],
  slides: [
    sl('title', 'Notes to Accounts and the Balance Sheet from a Trial Balance', {
      b: 'Part 2 — the **notes** behind each figure, the **adjustments** and the **profit working**, and a complete Balance Sheet from a **trial balance**.',
      v: vRoute2,
      n: 'A board final-accounts question gives you a trial balance and a list of adjustments, and asks for the Balance Sheet with notes. In this part we build the notes one at a time: share capital, reserves and surplus, borrowings, and fixed assets, and we see where each adjustment goes. Our running company is Kunchikal Rainwear of Agumbe.',
    }),
    sl('concept', 'Notes to accounts', {
      v: vNotesFlow,
      b: 'The face of the Balance Sheet shows **one figure per sub-head**; the **note** shows how it is made up.',
      n: 'Notes to accounts carry the details that would clutter the face of the Balance Sheet. Each note is numbered, and its number is written against the figure it explains. A note ends with the same total as that figure. Items that are only possible obligations, such as a proposed dividend, are disclosed in a note but never added in.',
    }),
    sl('concept', 'The note on Share Capital', {
      v: vShareFmt,
      b: 'Only **subscribed** capital is added; authorised and issued capital are information.',
      n: 'The share capital note begins with the authorised capital and the issued capital. These are shown for information and are not added. The total is the subscribed capital: shares fully paid, plus shares not fully paid at their called-up amount less calls in arrears, plus the amount received on forfeited shares that have not yet been reissued.',
    }),
    sl('example', 'Worked example 6: Kunchikal’s Share Capital', {
      b: 'Kunchikal Rainwear Ltd (imagined) is authorised to issue 1,50,000 equity shares of ₹10 each. It issued 1,00,000; 1,000 were forfeited after ₹4 per share had been paid and are not reissued; the other 99,000 are fully paid.',
      v: vWE6,
      n: `Authorised and issued capital are listed first. The ninety-nine thousand shares in the hands of shareholders are fully paid. The four thousand rupees received on the forfeited shares is added. The note totals ${rw(KR.subTotal.sc)}, the figure shown against share capital.`,
    }),
    sl('check', 'Quick check: share capital with arrears and forfeiture', {
      b: 'Deduct what is unpaid; add back what was forfeited.',
      chk: 'n_paidup',
      n: 'Start from the subscribed capital, take away the calls in arrears and add the amount received on the forfeited shares.',
    }),
    sl('concept', 'Reserves and Surplus: where the profit lands', {
      v: vSurplusFlow,
      b: 'Surplus = opening balance + profit for the year − transfers to reserves.',
      n: 'The profit for the year is added to the surplus brought forward. Any transfer to general reserve is taken out of the surplus and added to the reserve, so the total of reserves and surplus does not change. If the surplus is a debit balance, it is shown as a negative figure inside reserves and surplus.',
    }),
    sl('concept', 'Adjustments: each one is posted twice', {
      v: vAdj,
      n: 'Every adjustment in a final-accounts question touches two places. Depreciation lowers the profit and raises the accumulated depreciation. An outstanding expense lowers the profit and becomes a current liability. A prepaid expense raises the profit and becomes a current asset. Transfers, debentures falling due and a proposed dividend do not touch the profit at all.',
    }),
    sl('example', 'Worked example 7: Kunchikal’s trial balance', {
      bl: KRadj,
      v: vWE7,
      n: `Kunchikal's trial balance has been drawn up after its profit was found, so it shows a profit of ${rw(340000)} before the adjustments listed, and the surplus brought forward. The debit and credit columns agree. Our task is to post the seven adjustments and prepare the Balance Sheet with notes.`,
    }),
    sl('example', 'Worked example 7 (continued): profit for the year', {
      b: 'Adjust the given profit for every item that changes it.',
      v: vWE7b,
      n: `Depreciation on buildings and plant, the increase in the provision for doubtful debts, outstanding wages, accrued interest and tax all reduce the profit. Prepaid insurance increases it. The profit for the year is ${rw(KR.profit)}. The transfer to general reserve and the proposed dividend are not in this working.`,
    }),
    sl('diagram', 'From given profit to profit for the year', {
      v: vWaterfall,
      b: 'Red bars lower the profit, the green bar raises it.',
      n: 'This waterfall follows the working step by step. Starting from the given profit, each red bar takes away an adjustment and the green bar adds back the prepaid insurance. The last bar, in yellow, is the profit for the year that will be carried to the surplus.',
    }),
    sl('example', 'Worked example 8: Kunchikal’s Reserves and Surplus', {
      b: 'Opening surplus ₹60,000; transfer to General Reserve ₹40,000.',
      v: vWE8,
      n: `Securities premium stays as it is. General reserve grows by the transfer of ${rw(40000)}. The surplus is the opening ${rw(60000)} plus the profit of ${rw(KR.profit)}, less the transfer, leaving ${rw(KR.surplus)}. Reserves and surplus total ${rw(KR.subTotal.rs)}.`,
    }),
    sl('check', 'Quick check: the caption for the profit balance', {
      b: 'Fill in the caption.',
      chk: 'fb_surplus',
      n: 'Recall the name Schedule Three gives to the balance of the statement of profit and loss within reserves and surplus.',
    }),
    sl('concept', 'Borrowings and current maturities', {
      v: vBorrow,
      b: 'Amended Schedule III: the part of a long-term borrowing due within 12 months is a **current maturity** under **Short-term Borrowings**.',
      n: 'Long-term borrowings include debentures, term loans and public deposits that are repayable after twelve months. Whatever part of them falls due within twelve months is moved to short-term borrowings and called current maturities of long-term borrowings. Overdrafts are short-term borrowings too, while accrued interest and the redemption premium are not borrowings at all.',
    }),
    sl('example', 'Worked example 9: Kunchikal’s borrowings', {
      b: '1,000 of the 5,000 debentures are due for redemption on 30 June 2026.',
      v: vWE9,
      n: `One thousand debentures, worth ${rw(100000)}, fall due within twelve months, so they move to short-term borrowings. Long-term borrowings are left at ${rw(KR.subTotal.ltb)}. Short-term borrowings add the current maturities to the overdraft, ${rw(KR.subTotal.stb)} in all.`,
    }),
    sl('concept', 'Property, Plant and Equipment and intangible assets', {
      v: vPPE,
      n: 'In the note on property, plant and equipment, show each asset at cost and deduct its accumulated depreciation, which is the opening balance plus this year charge. Land is usually not depreciated. Intangible assets have a note of their own and are reduced by amortisation. Assets still being built or developed are shown under their own sub-heads.',
    }),
    sl('example', 'Worked example 10: fixed assets and receivables', {
      b: 'Depreciation: buildings 5% and plant 10% on cost. Provision for doubtful debts: 5% of debtors.',
      v: vWE10,
      n: `Buildings carry accumulated depreciation of ${rw(120000)} after this year's charge, and plant ${rw(220000)}. With land, property, plant and equipment total ${rw(KR.subTotal.ppe)}. In the trade receivables note, debtors are reduced by the new provision of ${rw(12000)}, not the old one.`,
    }),
    sl('check', 'Quick check: property, plant and equipment', {
      b: 'Buildings, furniture and land.',
      chk: 'n_ppe',
      n: 'Charge this year depreciation first, deduct it, and remember that patents are not part of property, plant and equipment.',
    }),
    sl('concept', 'Proposed dividend: a contingent liability', {
      v: vDiv,
      b: 'ISC 2027: show a proposed dividend under **contingent liabilities** in the notes.',
      n: 'The Board usually proposes the final dividend after the year end, and it becomes payable only when the shareholders declare it at the annual general meeting. On the Balance Sheet date there is no obligation, so nothing is provided and the surplus is not reduced. The amount is disclosed in the note on contingent liabilities and commitments.',
    }),
    sl('check', 'Quick check: where the proposed dividend goes', {
      b: 'True or false?',
      chk: 'tf_propdiv',
      n: 'Decide whether a dividend the directors have only proposed can be a provision at the year end.',
    }),
    sl('example', 'Worked example 11: Kunchikal’s Balance Sheet', {
      b: 'Every note total is carried to the face of the Balance Sheet.',
      v: vWE11,
      n: `Here is the finished Balance Sheet. Shareholders funds, borrowings and current liabilities on one side total ${rw(KR.total)}. Property, plant and equipment, the trademark, investments and current assets on the other side give the same total. The proposed dividend appears only in the last note.`,
    }),
    sl('example', 'Worked example 11 (continued): the remaining notes', {
      b: 'Trade payables, other current liabilities, inventories, cash and the contingent liability.',
      v: vWE11b,
      n: `The remaining notes complete the picture. Outstanding wages and accrued interest make up other current liabilities of ${rw(KR.subTotal.ocl)}. Inventories include the loose tools. The last note discloses the proposed dividend of ${rw(KR_DIV)}, which is not added to any total.`,
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up: the share capital note adds only subscribed capital, net of arrears and plus forfeited shares. The profit for the year is found in a working and carried to the surplus. Current maturities move to short-term borrowings. Fixed assets are shown net of accumulated depreciation. A proposed dividend is disclosed as a contingent liability.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Show a **working for the profit for the year** before the notes: each adjustment once, with its sign.',
        'Post every adjustment **twice**: once in the working and once in a note.',
        'Use the **required** provision for doubtful debts, and add **this year’s** depreciation to the accumulated depreciation.',
        'Move amounts due within 12 months to **Short-term Borrowings**; never deduct a **proposed dividend**.',
        'Number the notes in Schedule III order and make each note total equal its figure.',
      ],
      n: 'In the exam, start with a working for the profit for the year, writing each adjustment once with its sign. Then post every adjustment in its note. Use the required provision and add this year depreciation to the old balance. Move current maturities to short-term borrowings, and never deduct a proposed dividend. Number the notes in order and check every total.',
    }),
  ],
});

// Narration house rules on top of lib.mjs: no digits, no rupee sign, no slashes, ampersands or per-cent signs, no capitals runs.
for (const d of [part1, part2])
  for (const s of d.slides) {
    const m = /\d|₹|[\/&%]|\b[A-Z]{2,}\b/.exec(s.narration);
    check(!m, `narration of part ${d.part} ${s.id} has "${m?.[0]}"`);
  }

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Final Accounts of Companies — Notes',
  sections: [
    {
      h: '1. Company final accounts and Schedule III Part I',
      t: 1,
      b: "Under **Section 129** of the **Companies Act, 2013**, a company's financial statements must give a **true and fair view** and be drawn up in the form of **Schedule III**. **Part I** of the Schedule gives the form of the **Balance Sheet** (vertical: I. Equity and Liabilities, then II. Assets), with **notes to accounts**; Part II gives the form of the Statement of Profit and Loss.\n\n**ISC 2027 scope:** the Balance Sheet as per Schedule III Part I with notes to accounts, prepared from a **trial balance with adjustments**. *Not in the ISC 2027 syllabus:* the Statement of Profit and Loss as per Schedule III Part II is not required for final accounts, so the profit for the year is either given or worked out in one simple working.\n\n**Layout of the face:** Particulars | Note No. | amount at the year end (the previous year's figures are shown alongside in practice).",
      terms: [
        ['Final accounts of a company', 'For ISC: the Balance Sheet in the Schedule III Part I form with its notes, prepared at the end of the financial year.'],
        ['Schedule III', 'The schedule to the Companies Act, 2013 that prescribes the form of the Balance Sheet (Part I) and of the Statement of Profit and Loss (Part II).'],
        ['Notes to accounts', 'Numbered statements giving the details behind each figure on the face of the Balance Sheet.'],
      ],
      v: vLaw,
      vs: [vFormEL, vFormAS],
    },
    {
      h: '2. Current and non-current items',
      t: 1,
      b: "**Operating cycle:** the time between acquiring the materials for processing and collecting the cash for the finished goods. If a normal operating cycle cannot be identified, Schedule III assumes twelve months.\n\n**An asset is current** when it is expected to be realised (or sold or consumed) in the normal operating cycle, is held mainly for trading, is expected to be realised within twelve months after the reporting date, or is cash or a cash equivalent that is not restricted.\n\n**A liability is current** when it is expected to be settled in the normal operating cycle, is held mainly for trading, is due within twelve months after the reporting date, or the company cannot defer its settlement for at least twelve months.\n\nEverything else is **non-current**. A long operating cycle (aged rice, maturing timber) can make an item current although it is more than a year away.",
      terms: [
        ['Operating cycle', 'The time from buying inputs for processing to realising cash from customers.'],
        ['Current liability', 'A liability settled within the operating cycle or due within twelve months after the reporting date.'],
        ['Non-current asset', 'An asset not expected to be realised within the operating cycle or within twelve months, such as plant or long-term investments.'],
      ],
      v: vCycle,
      vs: [vWE1, vWE3],
    },
    {
      h: '3. Heads and sub-heads: what goes where',
      t: 1,
      b: "| Part | Major head | Sub-heads (with typical items) |\n|---|---|---|\n| I | Shareholders' Funds | Share Capital; Reserves and Surplus (capital reserve, securities premium, general reserve, surplus); Money received against share warrants |\n| I | Share Application Money Pending Allotment | a head by itself (money not refundable) |\n| I | Non-current Liabilities | Long-term Borrowings (debentures, term loans); Deferred Tax Liabilities (Net); Other Long-term Liabilities (premium on redemption); Long-term Provisions (gratuity) |\n| I | Current Liabilities | Short-term Borrowings (overdraft, cash credit, current maturities); Trade Payables (creditors, bills payable); Other Current Liabilities (calls in advance, unpaid dividend, interest accrued, outstanding expenses, advances from customers); Short-term Provisions (tax) |\n| II | Non-current Assets | Property, Plant and Equipment and Intangible Assets (PPE; Intangible Assets; Capital Work-in-Progress; Intangible Assets under Development); Non-current Investments; Deferred Tax Assets (Net); Long-term Loans and Advances (capital advances); Other Non-current Assets |\n| II | Current Assets | Current Investments; Inventories (raw materials, work-in-progress, finished goods, stores, loose tools); Trade Receivables (debtors less provision, bills receivable); Cash and Cash Equivalents; Short-term Loans and Advances; Other Current Assets (prepaid expenses, accrued income) |",
      terms: [
        ['Trade payables', 'Amounts owed for goods and services bought in the normal course of business: sundry creditors and bills payable.'],
        ['Capital advance', 'An advance paid for the purchase of a fixed asset; shown under long-term loans and advances.'],
        ['Share application money pending allotment', 'Application money for shares not yet allotted and not refundable; a major head of its own.'],
      ],
      v: vTraps,
      vs: [vWE2, vWE4, vSides, vWE5],
    },
    {
      h: '4. Notes to accounts: the Share Capital note',
      t: 2,
      b: "A sub-head gets a note when it has more than one item, a deduction or a working; Share Capital and Reserves and Surplus always get one. Notes are numbered in Schedule III order and each note total equals its figure on the face.\n\n**Share Capital note (format)**\n- Authorised capital: number and class of shares, face value — for information.\n- Issued capital — for information.\n- Subscribed capital: subscribed and fully paid; subscribed but not fully paid (called-up amount **less calls in arrears**).\n- **Add:** forfeited shares (amount received on shares forfeited and not reissued).\n- Total = the figure against Share Capital.\n\nCalls in advance are **not** part of this note (Other Current Liabilities).",
      terms: [
        ['Subscribed capital', 'The part of issued capital taken up by the public; only this part is added in the note.'],
        ['Calls in arrears', 'Amounts called up but not paid by shareholders; deducted from called-up capital in the note.'],
        ['Forfeited shares', 'The amount received on shares forfeited and not yet reissued; added in the share capital note.'],
      ],
      v: vShareFmt,
      vs: [vWE6],
    },
    {
      h: '5. The profit working and the Reserves and Surplus note',
      t: 2,
      b: "**Profit for the year (working):** profit given before adjustments − depreciation − increase in provision for doubtful debts − outstanding expenses + prepaid expenses + accrued income − interest accrued on debentures − provision for tax.\n\n**Reserves and Surplus note:** capital reserve; securities premium; general reserve (opening + transfer); **Surplus, i.e. balance in the Statement of Profit and Loss** = opening balance + profit for the year − transfers to reserves. A debit balance is shown as a **negative** figure, even if the head becomes negative.\n\nA transfer to general reserve moves an amount from the surplus to the reserve: the total of Reserves and Surplus is unchanged by it.",
      terms: [
        ['Surplus', 'The balance in the Statement of Profit and Loss carried forward, shown as the last item of Reserves and Surplus.'],
        ['Transfer to general reserve', 'An appropriation of profit out of the surplus; it does not reduce the profit for the year.'],
      ],
      v: vAdj,
      vs: [vWE7, vWE7b, vWaterfall, vWE8],
    },
    {
      h: '6. Borrowings and current maturities (amended Schedule III)',
      t: 2,
      b: "- **Long-term Borrowings:** debentures, term loans, public deposits repayable after twelve months; state the nature of the security and the terms of redemption or repayment.\n- **Short-term Borrowings:** bank overdraft, cash credit, loans repayable on demand and, after the amendment, **current maturities of long-term borrowings** (the instalments or debentures repayable within twelve months).\n- **Not borrowings:** interest accrued (Other Current Liabilities) and premium payable on redemption of debentures (Other Long-term Liabilities).\n\nWorking: long-term part = amount outstanding − amount repayable within twelve months.",
      terms: [
        ['Current maturities of long-term borrowings', 'The part of a long-term borrowing repayable within twelve months after the reporting date; shown under short-term borrowings.'],
        ['Long-term borrowings', 'Borrowings repayable after twelve months, such as debentures and term loans.'],
      ],
      v: vBorrow,
      vs: [vWE9],
    },
    {
      h: '7. Property, Plant and Equipment and Intangible Assets',
      t: [2, 3],
      b: "**Property, Plant and Equipment note:** each class of asset (land, buildings, plant and machinery, furniture, vehicles) at cost, **less accumulated depreciation** = opening accumulated depreciation + depreciation for the year. Land is generally not depreciated.\n\n**Intangible Assets note:** goodwill, patents, trademarks, copyrights, computer software, less amortisation.\n\n**Amended captions:** the group is *Property, Plant and Equipment and Intangible Assets*, with (i) Property, Plant and Equipment (formerly tangible assets), (ii) Intangible Assets, (iii) Capital Work-in-Progress and (iv) Intangible Assets under Development.",
      terms: [
        ['Accumulated depreciation', 'Total depreciation charged on an asset up to the Balance Sheet date, including the current year.'],
        ['Capital work-in-progress', 'Cost of tangible fixed assets still under construction or installation.'],
        ['Intangible assets under development', 'Cost of intangible assets, such as software, still being developed.'],
      ],
      v: vPPE,
      vs: [vCaptions, vWE10],
    },
    {
      h: '8. Recent amendments and contingent liabilities',
      t: 3,
      b: `The ISC 2027 syllabus lists these amended Schedule III points:\n1. **Proposed dividend:** not a liability until the shareholders declare it at the annual general meeting; it is not provided for and is shown under **contingent liabilities and commitments** in the notes.\n2. **Property, Plant and Equipment and Intangible Assets** replaces "fixed assets: tangible / intangible".\n3. **Current maturities of long-term borrowings** are shown under **Short-term Borrowings**.\n4. **Securities Premium** (formerly "Securities Premium Reserve") is shown under Reserves and Surplus.\n\n**Note: ${CONTINGENT}** — for example a proposed dividend, claims against the company not acknowledged as debts, guarantees given. The amounts are disclosed, not added.\n\n**Kunchikal Rainwear Ltd (imagined):** profit for the year ${rs(KR.profit)}; Balance Sheet total ${rs(KR.total)}; proposed dividend ${rs(KR_DIV)} disclosed in Note ${KR.contNo}, not deducted from the surplus of ${rs(KR.surplus)}.`,
      terms: [
        ['Contingent liability', 'A possible obligation that depends on a future event, such as approval by shareholders or a court decision; disclosed in the notes, not provided for.'],
        ['Proposed dividend', 'A dividend recommended by the Board but not yet declared by the shareholders.'],
      ],
      v: vDiv,
      vs: [vWE11, vWE11b],
    },
  ],
  tips: "**Common mistakes**\n- Giving only the major head (or only the sub-head) when asked to classify.\n- Adding authorised or issued capital to the share capital total; forgetting to deduct calls in arrears or to add forfeited shares.\n- Showing calls in advance in Share Capital, or loose tools under Property, Plant and Equipment.\n- Using the old provision for doubtful debts instead of the required one, or deducting only this year's depreciation.\n- Leaving debentures or loan instalments due within twelve months in Long-term Borrowings.\n- Providing for a proposed dividend or deducting it from the surplus.\n- Showing a debit balance of the Statement of Profit and Loss as an asset.\n\n**How marks are usually awarded (SOYL chapter tests on the ISC default pattern)**\n- 1 mark: objective items.\n- 2 marks: classifying four items (half a mark each, in pairs), one short note, or a rule with an example.\n- 3 marks: one note with workings (share capital, reserves, borrowings, fixed assets) or six classifications.\n- 5 marks in parts, e.g. (a) 3 + (b) 2: notes and the Balance Sheet, or a working and a note.\n- Full practical (practice, 8 marks): profit working about 2, notes about 4, the Balance Sheet with totals and the contingent note about 2. The ISC 2027 weightage for Final Accounts of Companies in Paper I is 7 marks.\n\n**Figures in SOYL practice** are imagined; your board paper will give its own.",
});

// ---------------------------------------------------------------- flashcards
const FC = cards([
  ['Form of a company Balance Sheet', 'Schedule III, Part I of the Companies Act, 2013 (Section 129).', 'fact', 1],
  ['Statement of Profit and Loss in ISC 2027 final accounts?', 'Not required (Schedule III Part II); profit is given or found in a working.', 'exam-tip', 1],
  ['Four major heads of Equity and Liabilities', "Shareholders' Funds; Share Application Money Pending Allotment; Non-current Liabilities; Current Liabilities.", 'fact', 1],
  ['Two major heads of Assets', 'Non-current Assets; Current Assets.', 'fact', 1],
  ['**Operating cycle**', 'Time from acquiring inputs for processing to realising cash; assumed 12 months if not identifiable.', 'definition', 1],
  ['A liability is current if…', 'It is settled in the operating cycle, held for trading, due within 12 months, or cannot be deferred for 12 months.', 'concept', 1],
  ['Calls in advance', 'Current Liabilities → Other Current Liabilities.', 'fact', 1],
  ['Loose tools', 'Current Assets → Inventories.', 'fact', 1],
  ['Premium on redemption of debentures', 'Non-current Liabilities → Other Long-term Liabilities.', 'fact', 1],
  ['Bills payable and sundry creditors', 'Current Liabilities → Trade Payables.', 'fact', 1],
  ['Capital advance (for a machine)', 'Non-current Assets → Long-term Loans and Advances.', 'fact', 1],
  ['Share application money (not refundable) at the year end', 'A separate major head: Share Application Money Pending Allotment.', 'fact', 1],
  ['Unpaid dividend', 'Current Liabilities → Other Current Liabilities.', 'fact', 1],
  ['When does a sub-head get a note?', 'Share Capital and Reserves and Surplus always; others when they have several items, a deduction or a working.', 'exam-tip', 2],
  ['Share Capital note: what is added?', 'Subscribed capital (net of calls in arrears) plus forfeited shares; authorised and issued are for information.', 'concept', 2],
  ['Calls in arrears in the Balance Sheet', 'Deducted from called-up capital in the Share Capital note.', 'fact', 2],
  ['Forfeited shares not reissued', 'Amount received on them added in the Share Capital note.', 'fact', 2],
  ['**Surplus**', 'Balance in the Statement of Profit and Loss: opening + profit for the year − transfers to reserves.', 'definition', 2],
  ['Debit balance of the Statement of Profit and Loss', 'Negative item in Reserves and Surplus, even if the head turns negative.', 'fact', 2],
  ['Transfer to general reserve', 'Out of the surplus; does not change the profit for the year or the total of Reserves and Surplus.', 'concept', 2],
  ['Depreciation adjustment', 'Less from profit; added to accumulated depreciation in the PPE note.', 'concept', 2],
  ['Provision for doubtful debts adjustment', 'Profit reduced by the increase; debtors shown less the required provision.', 'concept', 2],
  ['Outstanding and prepaid expenses', 'Outstanding: Other Current Liabilities; prepaid: Other Current Assets.', 'fact', 2],
  ['Interest accrued on debentures', 'Less from profit; Other Current Liabilities.', 'fact', 2],
  ['PPE note format', 'Each asset at cost less accumulated depreciation (opening + this year).', 'exam-tip', 2],
  ['**Proposed dividend** (ISC 2027)', 'Not provided for; disclosed under contingent liabilities and commitments in the notes.', 'definition', 3],
  ['Why is a proposed dividend not a liability?', 'It becomes payable only when shareholders declare it at the annual general meeting.', 'concept', 3],
  ['**Current maturities of long-term borrowings**', 'Part of a long-term borrowing repayable within 12 months; under Short-term Borrowings.', 'definition', 3],
  ['Amended caption for fixed assets', 'Property, Plant and Equipment and Intangible Assets: PPE, Intangible Assets, CWIP, Intangible Assets under Development.', 'fact', 3],
  ['Securities Premium Reserve now reads…', 'Securities Premium (Reserves and Surplus).', 'fact', 3],
  ['Software still being written by the company', 'Intangible Assets under Development.', 'fact', 3],
]);

// ---------------------------------------------------------------- tests (ISC class defaults, item for item)
const T_SHORT = test({
  kind: 'short',
  blueprint: 'isc-12-default-chapter-test-short',
  title: 'Chapter test (short) — Final Accounts of Companies',
  duration: 50,
  sections: [
    { id: 'A', title: 'Section A - Objective (5 marks)', instr: 'Answer all questions. Multiple-choice and assertion-reason items carry 1 mark each.', items: ['m_loose_tools', 'm_paidup', 'm_ppe_net', 'm_propdiv', 'ar_noncurrent'] },
    { id: 'B', title: 'Section B - Short answer (4 marks)', instr: 'Answer both questions. Internal choice in the second question.', items: ['s2_share_simple', { attempt: 1, keys: ['s2_curmat', 's2_propdiv'] }] },
    { id: 'C', title: 'Section C - Short answer (6 marks)', instr: 'Answer both questions. Internal choice in the second question. Show your working.', items: ['s3_rs_note', { attempt: 1, keys: ['s3_classify6', 's3_ppe_note'] }] },
    { id: 'D', title: 'Section D - Long answer (5 marks)', instr: 'Answer the question. It is set in parts (3 + 2 marks); show your working.', items: ['l5_bs_small'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'isc-12-default-chapter-test-long',
  title: 'Chapter test (long) — Final Accounts of Companies',
  duration: 100,
  sections: [
    { id: 'A', title: 'Section A - Objective (12 marks)', instr: 'Answer all questions. Multiple-choice and assertion-reason items carry 1 mark each.', items: ['m_part1', 'm_calls_adv', 'm_bills_payable', 'm_unpaid_div', 'm_op_cycle', 'm_sapa', 'm_surplus', 'm_pdd', 'm_curmat', 'm_div_amt', 'ar_curmat', 'ar_forfeit'] },
    { id: 'B', title: 'Section B - Short answer (6 marks)', instr: 'Answer all three questions. Internal choice in the last question.', items: ['s2_classify4', 's2_arrears_forfeit', { attempt: 1, keys: ['s2_receivables', 's2_amend'] }] },
    { id: 'C', title: 'Section C - Short answer (12 marks)', instr: 'Answer all four questions. Internal choice in the last question. Show your working.', items: ['s3_share_note', 's3_borrowings', 's3_profit_working', { attempt: 1, keys: ['s3_op_cycle', 's3_contingent'] }] },
    { id: 'D', title: 'Section D - Long answer (10 marks)', instr: 'Answer both questions. Internal choice in the second question. Each is set in parts; show your working.', items: ['l5_tb_adjust', { attempt: 1, keys: ['l5_debentures', 'l5_assets'] }] },
  ],
});

// Deck checks never appear in the tests.
const inTests = new Set([T_SHORT, T_LONG].flatMap((t) => t.sections.flatMap((s) => s.items.map((i) => i.question_id))));
for (const d of [part1, part2]) for (const s of d.slides) if (s.check_question_id) check(!inTests.has(s.check_question_id), `deck check ${s.check_question_id} is also in a test`);
check(words(KR_DIV) === 'ninety-nine thousand', 'words');

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: FC,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t03 of isc-12-accounts-ch09 only (the Balance Sheet as per Schedule III Part I with its major heads and sub-heads; notes to accounts for share capital, reserves and surplus, borrowings and property, plant and equipment; the amended Schedule III points: proposed dividend as a contingent liability, Property, Plant and Equipment and Intangible Assets, current maturities of long-term borrowings, Securities Premium). The Statement of Profit and Loss as per Schedule III Part II is removed for ISC 2027 and appears only as one note; profit is given or found in a working.',
    originality: 'every company and figure is imagined and labelled as such; no textbook illustration or exercise and no CISCE specimen or past-paper item is reused; companies and set-ups differ from the CBSE 12 Accountancy chapters and ISC ch01–ch07',
    data: 'every classification comes from one table in acc.mjs; every trial balance agrees, every adjustment is posted to the profit working and to one balance sheet line, the share capital note reconciles shares, calls in arrears and forfeiture with the trial balance, every note totals and both parts of every Balance Sheet agree; all amounts whole rupees',
    accounting: 'ISC 2027: Balance Sheet in the Schedule III Part I (amended) form with notes; proposed dividend under contingent liabilities; current maturities of long-term borrowings under short-term borrowings; Property, Plant and Equipment and Intangible Assets captions; Securities Premium',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
