// Build ISC 12 Accounts ch05 Dissolution of a Partnership Firm. Run from platform/:
//   npx tsx content/authored/economics-commerce/isc-12-accounts-ch05/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';
import { rs, inr, check, sum, journal, balanceSheet, section48, dissolve, rw, words, ratioWords } from './acc.mjs';

setUnit('isc-12-accounts-ch05', 'economics-commerce');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const C = (n) => `${n}'s Capital A/c`;
const eq = (a, b, what) => check(JSON.stringify(a) === JSON.stringify(b), `deck figure ${what}: got ${JSON.stringify(a)}, expected ${JSON.stringify(b)}`);

// ---------------------------------------------------------------- deck figures (computed, never typed)
// WE2 Ziro Kiwi Orchards (imagined): Oishee and Pratyush 3 : 2; Section 48 settlement.
const ZK = section48({ cash: 240000, outside: 110000, loans: { Pratyush: 30000 }, capitals: { Oishee: 70000, Pratyush: 50000 }, ratio: [3, 2] });
eq([ZK.loss, ZK.part, ZK.capPay], [20000, { Oishee: 12000, Pratyush: 8000 }, { Oishee: 58000, Pratyush: 42000 }], 'ZK');

// WE3 Sohra Umbrella Works (imagined): Banalata and Ishfaq; memorandum balance sheet with cash missing.
const SU = { liab: [['Creditors', 38000], ['Bills Payable', 6000], ["Ishfaq's Loan", 10000], ['General Reserve', 8000], ['Capital: Banalata', 50000], ['Capital: Ishfaq', 30000]], assets: [['Umbrella-making Machines', 60000], ['Stock', 34000], ['Debtors', 22000]] };
const SUcash = sum(SU.liab.map(([, v]) => v)) - sum(SU.assets.map(([, v]) => v));
const SUbs = balanceSheet(SU.liab, [...SU.assets, ['Cash in Hand (balancing figure)', SUcash]]);
eq([SUcash, SUbs.total], [26000, 142000], 'SU');

// WE4–WE8 Kamalabari Mask Makers (imagined): Abhrajit, Shehnaz and Dorjee 3 : 2 : 1.
const MJx = { mach: 112000, debt: 63000, inv: 38000, cred: 46000, exp: 3000 };
const MJs = {
  names: ['Abhrajit', 'Shehnaz', 'Dorjee'], ratio: [3, 2, 1], overdraft: 12000,
  assets: [['Goodwill', 12000], ['Machinery', 130000], ['Investments', 44000], ['Stock', 52000], ['Debtors', 70000], ['Prepaid Insurance', 2000]],
  provisions: [['Provision for Doubtful Debts', 4000, 'Debtors']], funds: [['Investment Fluctuation Fund', 6000]],
  liabilities: [['Creditors', 48000], ['Bank Loan', 30000]], loans: { Shehnaz: 20000 }, loansTo: { Dorjee: 8000 },
  capitals: { Abhrajit: 90000, Shehnaz: 60000, Dorjee: 30000 }, reserves: [['General Reserve', 18000]],
  sold: [['Machinery', MJx.mach], ['Debtors', MJx.debt]], atBook: ['Stock'], worthless: ['Goodwill', 'Prepaid Insurance'],
  takenOver: [['Investments', 'Abhrajit', MJx.inv]], paid: [['Creditors', MJx.cred], ['realisation expenses', MJx.exp]], paidInFull: ['Bank Loan'],
};
const MJ = dissolve(MJs);
eq([MJ.BS.total, MJ.RA.result, MJ.RA.part, MJ.CA.pay, MJ.soldTotal, MJ.BANK.total], [314000, -36000, { Abhrajit: 18000, Shehnaz: 12000, Dorjee: 6000 }, { Abhrajit: 43000, Shehnaz: 54000, Dorjee: 19000 }, 227000, 227000], 'MJ');
const bookOf = (list, k) => list.find(([a]) => a === k)[1];
const MJbook = { stock: bookOf(MJs.assets, 'Stock'), loan: bookOf(MJs.liabilities, 'Bank Loan'), iff: bookOf(MJs.funds, 'Investment Fluctuation Fund'), od: MJs.overdraft, loanTo: MJs.loansTo.Dorjee, sLoan: MJs.loans.Shehnaz };
eq(MJbook, { stock: 52000, loan: 30000, iff: 6000, od: 12000, loanTo: 8000, sLoan: 20000 }, 'MJbook');
const MJtransfer = journal(MJ.J.entries.slice(0, 2));

// WE7 Champaner Glass Beads, Halol (imagined): Hiral and the five cases of realisation expenses.
const CG = { exp: 4500, fee: 6000 };

// ---------------------------------------------------------------- visuals: Part 1
const vRoute1 = flow('LR', ['Partnership or firm?', 'Section 48 settlement', 'Memorandum Balance Sheet', 'What goes to Realisation', 'Silent items (ISC assumptions)'], 'Route map of Part 1: whether the partnership or the firm is dissolved, settlement under section forty-eight, the memorandum balance sheet, what is transferred to the realisation account, and the assumptions for silent items', 'Part 1 at a glance');
const vPvF = table(
  ['Basis', 'Dissolution of partnership', 'Dissolution of the firm'],
  [
    ['What ends', 'The old agreement among the partners', 'The relation among **all** partners and the business'],
    ['Business', 'Continues (reconstitution)', 'Closed down'],
    ['Books of account', 'Adjusted: revaluation, goodwill, capitals', 'Closed: Realisation, capital and Bank/Cash accounts'],
    ['Examples', 'Admission, retirement, death, change in ratio', 'All partners agree to close; the court orders winding up'],
    ['Link', 'May happen without dissolving the firm', 'Always dissolves the partnership too'],
  ],
  'Table comparing dissolution of partnership, where only the old agreement ends and the business continues with adjusted books, with dissolution of the firm, where the relation among all partners and the business end and the books are closed',
);
const vWE1 = table(
  ['Situation (imagined firms)', 'Partnership or firm?', 'Why'],
  [
    ['Sraboni retires from Bagdogra Tea Tasters; the other two carry on', 'Partnership only', 'Business continues under a new agreement'],
    ['Nalbari Bell Metal admits a third partner', 'Partnership only', 'Reconstitution: books adjusted'],
    ['All partners of Chumoukedima Bamboo Shoots agree to wind up and sell the assets', 'Firm', 'Business closed; every account settled'],
    ['The partners of Naharlagun Cane Craft change their ratio from 1 : 1 to 3 : 2', 'Partnership only', 'Same partners, new agreement'],
  ],
  'Table of worked example one: a retirement, an admission and a change in ratio dissolve only the partnership, because the business continues; an agreement by all partners to wind up and sell the assets dissolves the firm',
);
const vS48 = flow('TB', ['Losses (incl. capital deficiency): from profits, then capital, then partners in profit-sharing ratio', 'Pay debts to third parties', "Pay partners' loans (advances) rateably", "Pay partners' capitals rateably", 'Residue: divide in profit-sharing ratio'], 'Flow of section forty-eight: losses are met from profits, then capital, then by the partners in the profit-sharing ratio; the assets then pay third-party debts, partners loans, partners capitals, and any residue is divided in the profit-sharing ratio', 'Section 48 of the Indian Partnership Act, 1932');
const vWE2 = table(
  ['Ziro Kiwi Orchards (imagined)', 'Claim (₹)', 'Paid (₹)'],
  [
    ['1. Creditors (third parties)', inr(ZK.outside), inr(ZK.outside)],
    ["2. Pratyush's loan", inr(ZK.loans.Pratyush), inr(ZK.loans.Pratyush)],
    ["3. Oishee's capital less 3/5 of the loss", inr(ZK.capitals.Oishee), inr(ZK.capPay.Oishee)],
    ["3. Pratyush's capital less 2/5 of the loss", inr(ZK.capitals.Pratyush), inr(ZK.capPay.Pratyush)],
    ['**Total**', `**${inr(ZK.claims)}**`, `**${inr(ZK.cash)}**`],
  ],
  `Table of worked example two: claims of ${inr(ZK.claims)} against cash of ${inr(ZK.cash)} give a loss of ${inr(ZK.loss)}, shared three to two; creditors and Pratyush's loan are paid in full, then Oishee ${inr(ZK.capPay.Oishee)} and Pratyush ${inr(ZK.capPay.Pratyush)}`,
  `Loss = ${rs(ZK.claims)} − ${rs(ZK.cash)} = ${rs(ZK.loss)}: Oishee ${rs(ZK.part.Oishee)}, Pratyush ${rs(ZK.part.Pratyush)}.`,
);
const vLadder = (() => {
  const s = new Svg(620, 300);
  const top = 40, H = 200, colW = 82, gap = 28, x0 = 40;
  const steps = [['Creditors', ZK.outside, 'red'], ["Pratyush's loan", ZK.loans.Pratyush, 'yellow'], ['Oishee capital', ZK.capPay.Oishee, 'blue'], ['Pratyush capital', ZK.capPay.Pratyush, 'green']];
  check(sum(steps.map(([, v]) => v)) === ZK.cash, 'ladder uses the cash exactly');
  const h = (v) => (H * v) / ZK.cash;
  s.rect(x0, top, colW, H, { fill: 'fill', color: 'accent', sw: 1.5, rx: 2 });
  s.text(x0 + colW / 2, top + H / 2 - 8, 'Cash', { size: 13, bold: true });
  s.text(x0 + colW / 2, top + H / 2 + 10, inr(ZK.cash), { size: 13 });
  let left = ZK.cash;
  steps.forEach(([label, v, color], i) => {
    const x = x0 + (i + 1) * (colW + gap);
    const yTop = top + H - h(left);
    s.rect(x, yTop, colW, h(v), { fill: color, color: 'accent', sw: 1.5, rx: 2 });
    s.text(x + colW / 2, yTop + h(v) / 2, inr(v), { size: 12, bold: true });
    s.text(x + colW / 2, top + H + 18, label, { size: 11 });
    s.text(x + colW / 2, top + H + 34, i < 2 ? `${i + 1}${i ? 'nd' : 'st'}` : '3rd', { size: 11, muted: true });
    s.line(x - gap, yTop, x, yTop, { sw: 1, dash: true, color: 'muted' });
    left -= v;
  });
  check(left === 0, 'ladder ends at nil');
  s.text(310, 18, 'The cash steps down in the Section 48 order and ends at nil', { size: 13, bold: true });
  return s.visual(
    `Step diagram for Ziro Kiwi Orchards: a full column of cash, ${inr(ZK.cash)}, followed by four columns stepping down: creditors ${inr(ZK.outside)} first, Pratyush's loan ${inr(ZK.loans.Pratyush)} second, then the capitals of Oishee ${inr(ZK.capPay.Oishee)} and Pratyush ${inr(ZK.capPay.Pratyush)} third, ending at nil`,
    'Column heights are computed from the amounts.',
  );
})();
const vMemo = flow('LR', ['Ledger balances on the date of dissolution', 'Memorandum Balance Sheet (horizontal)', 'Missing figure found as the balancing amount', 'Starting point for Realisation, capital and Bank/Cash accounts'], 'Flow: ledger balances on the date of dissolution are set out in a memorandum balance sheet in horizontal form; a missing figure such as cash or a capital is found as the balancing amount; the statement is the starting point for the realisation, capital and bank or cash accounts', 'Memorandum Balance Sheet');
const vSU = table(SUbs.headers, SUbs.rows, `Memorandum balance sheet of Sohra Umbrella Works totalling ${inr(SUbs.total)}: creditors, bills payable, Ishfaq's loan, general reserve and two capitals on the left; machines, stock, debtors and cash in hand of ${inr(SUcash)} found as the balancing figure on the right`, `Memorandum Balance Sheet of Banalata and Ishfaq (imagined) on the date of dissolution.`);
const vRAformat = table(
  ['Debit side (To)', 'Credit side (By)'],
  [
    ['Assets other than cash/bank, at book (gross) value', 'Provisions and funds related to those assets'],
    ['Cash paid for outside liabilities (incl. bank loan)', 'Outside liabilities at book value (incl. bank loan)'],
    ['Realisation expenses borne by the firm', 'Cash from assets sold (recorded and unrecorded)'],
    ['Liabilities or expenses paid by a partner (his capital)', 'Assets taken over by partners (their capitals)'],
    ['Unrecorded liabilities paid', '**Loss** (balancing figure) to capitals, profit-sharing ratio'],
    ['**Profit** (balancing figure) to capitals, profit-sharing ratio', ''],
  ],
  'Table of the realisation account format: the debit side holds assets at gross book value, cash paid for liabilities, expenses, liabilities paid by partners, unrecorded liabilities and any profit; the credit side holds related provisions and funds, liabilities, cash from assets, assets taken over by partners and any loss',
);
const vWhere = table(
  ['Balance on the date of dissolution', 'Goes to (ISC 2027)'],
  [
    ['Assets (except cash/bank, loan to a partner, fictitious assets)', 'Realisation A/c, debit, at gross value'],
    ['Provision or fund **related** to an asset or liability (doubtful debts, depreciation, investment fluctuation)', 'Realisation A/c, credit'],
    ['Outside liabilities, **bank loan**', 'Realisation A/c, credit'],
    ['**Bank overdraft**', 'Bank/Cash A/c (opening credit balance); not to Realisation'],
    ["Partner's loan to the firm", "Partner's Loan A/c; repaid through Bank/Cash"],
    ['Loan given to a partner', "Debited to that partner's Capital A/c"],
    ['General reserve, credit balance of profit and loss', "Partners' Capital A/cs, profit-sharing ratio"],
    ['Debit balance of profit and loss, advertisement suspense', "Partners' Capital A/cs (debit), profit-sharing ratio"],
    ['Current accounts (fixed capitals)', 'Transferred to Capital A/cs'],
  ],
  'Table of where each balance goes on dissolution under the ISC syllabus: assets at gross value, related provisions and funds, outside liabilities and bank loans go to the realisation account; a bank overdraft goes to the bank or cash account; partners loans are repaid in cash; loans to partners are debited to their capitals; reserves, accumulated losses and current accounts go to the capital accounts',
);
const vMJbs = table(MJ.BS.headers, MJ.BS.rows, `Memorandum balance sheet of Kamalabari Mask Makers totalling ${inr(MJ.BS.total)}: creditors, bank loan, bank overdraft, Shehnaz's loan, investment fluctuation fund, general reserve and three capitals on the left; goodwill, machinery, investments, stock, debtors net of provision, prepaid insurance and a loan to Dorjee on the right`, `Memorandum Balance Sheet of Abhrajit, Shehnaz and Dorjee (imagined) as at 31 March 2026.`);
const vMJtransfer = table(MJtransfer.headers, MJtransfer.rows, `Journal of the two transfer entries for Kamalabari Mask Makers: the realisation account is debited with all six assets at gross book value; the provision for doubtful debts, the investment fluctuation fund, creditors and the bank loan are debited and the realisation account credited`);
const vSilent = table(
  ['If the question is silent about…', 'Assume (ISC 2027)'],
  [
    ['A tangible asset or investments', 'Realised at **book value**'],
    ['An intangible asset (goodwill, patents, trademarks)', 'Realises **nothing**'],
    ['Accrued income or a prepaid expense', 'Realises **nothing**'],
    ['The payment of a liability', 'Paid **in full**'],
  ],
  'Table of the ISC assumptions for silent items: a tangible asset or investments realise book value; intangible assets, accrued income and prepaid expenses realise nothing; a liability is paid in full',
);
const vMJsilent = table(
  ['Kamalabari Mask Makers (imagined)', 'Rule', 'Amount (₹)'],
  [
    ['Stock: nothing said', 'Tangible: book value', inr(MJbook.stock)],
    ['Goodwill: nothing said', 'Intangible: nil', '0'],
    ['Prepaid insurance: nothing said', 'Prepaid expense: nil', '0'],
    ['Bank loan: nothing said', 'Liability: paid in full', inr(MJbook.loan)],
    ['Investment Fluctuation Fund', 'Related to investments: Realisation credit', inr(MJbook.iff)],
    ['Bank overdraft', 'Bank A/c, credit side', inr(MJbook.od)],
    ['Loan to Dorjee', "Dorjee's Capital A/c, debit", inr(MJbook.loanTo)],
  ],
  `Table applying the rules to Kamalabari Mask Makers: stock realises its book value of ${inr(MJbook.stock)}; goodwill and prepaid insurance realise nothing; the bank loan of ${inr(MJbook.loan)} is paid in full; the investment fluctuation fund goes to realisation; the overdraft opens the bank account; the loan to Dorjee is charged to his capital`,
);
const vSummary1 = table(
  ['Idea', 'Rule'],
  [
    ['Partnership vs firm', 'Firm dissolved only when the business closes and all relations end'],
    ['Section 48: losses', 'Profits, then capital, then partners in the profit-sharing ratio'],
    ['Section 48: order of payment', "Third parties → partners' loans → capitals → residue"],
    ['Memorandum Balance Sheet', 'Balances on the date of dissolution; may give a missing figure'],
    ['Realisation Account', 'Assets gross (Dr.), related provisions and funds, liabilities (Cr.)'],
    ['Overdraft vs bank loan', 'Overdraft: Bank A/c; bank loan: Realisation'],
    ['Silent items', 'Tangible at book, intangible and prepaid nil, liabilities in full'],
  ],
  'Summary table of Part 1: dissolution of the firm, the section forty-eight rules for losses and payments, the memorandum balance sheet, the realisation account transfers, the overdraft and bank loan rule, and the assumptions for silent items',
);

// ---------------------------------------------------------------- visuals: Part 2
const vRoute2 = flow('LR', ['Sell assets, pay liabilities', 'Takeovers and creditors accepting assets', 'Unrecorded items', 'Realisation expenses', 'Capitals, loans and the Bank/Cash Account'], 'Route map of Part 2: selling assets and paying liabilities, takeovers by partners and creditors accepting assets, unrecorded items, realisation expenses, and the capital, loan and bank or cash accounts', 'Part 2 at a glance');
const vSellPay = table(
  ['Event', 'Journal entry'],
  [
    ['Asset sold for cash', 'Bank/Cash A/c Dr. To Realisation A/c'],
    ['Outside liability paid in cash', 'Realisation A/c Dr. To Bank/Cash A/c'],
    ['Bank loan repaid', 'Realisation A/c Dr. To Bank/Cash A/c'],
    ['Asset realises nothing', 'No entry (its book value stays on the debit side)'],
    ['Liability settled at a discount', 'Realisation A/c Dr. To Bank/Cash A/c (amount actually paid)'],
  ],
  'Table of entries for realising assets and paying liabilities: cash from an asset is debited to bank and credited to realisation; liabilities and a bank loan paid are debited to realisation; an asset that realises nothing needs no entry; a discounted settlement is entered at the cash paid',
);
const vTakeovers = table(
  ['Event', 'Journal entry'],
  [
    ['Partner takes over an asset', "Partner's Capital A/c Dr. To Realisation A/c (agreed value)"],
    ['Partner agrees to pay a liability', "Realisation A/c Dr. To Partner's Capital A/c"],
    ['Creditor accepts an asset in full settlement', 'No entry'],
    ['Creditor accepts an asset and cash for the rest', 'Realisation A/c Dr. To Bank/Cash A/c (cash part only)'],
  ],
  'Table of entries when partners or creditors take assets: a partner taking an asset is debited at the agreed value; a partner paying a liability is credited; a creditor accepting an asset in full settlement needs no entry; if he also gets cash, only the cash is entered',
);
const vMJra = table(MJ.RA.headers, MJ.RA.rows, `Realisation account of Kamalabari Mask Makers: debit side goodwill, machinery, investments, stock, debtors, prepaid insurance, cash paid to creditors and on the bank loan, and expenses; credit side the provision, the fund, creditors and the bank loan, cash from assets and investments taken over by Abhrajit; loss ${inr(-MJ.RA.result)} shared Abhrajit ${inr(MJ.RA.part.Abhrajit)}, Shehnaz ${inr(MJ.RA.part.Shehnaz)}, Dorjee ${inr(MJ.RA.part.Dorjee)}`);
const vRAsides = (() => {
  const total = MJ.RA.total;
  const assetsDr = sum(MJs.assets.map(([, v]) => v));
  const paidDr = MJ.RA.drTotal - assetsDr;
  const transferred = sum([...MJs.provisions, ...MJs.funds, ...MJs.liabilities].map(([, v]) => v));
  const dr = [['Assets at book value', assetsDr, 'fill'], ['Liabilities and expenses paid', paidDr, 'yellow']];
  const cr = [['Provision, fund, liabilities', transferred, 'fill'], ['Cash from assets', MJ.soldTotal, 'blue'], ['Taken over', MJx.inv, 'green'], ['Loss', -MJ.RA.result, 'red']];
  check(sum(dr.map(([, v]) => v)) === total && sum(cr.map(([, v]) => v)) === total, 'realisation bars add to the total');
  eq([assetsDr, paidDr, transferred], [310000, 79000, 88000], 'realisation bar parts');
  const s = new Svg(640, 250);
  const X0 = 90, W = 520;
  const bar = (y, label, parts) => {
    s.text(X0 - 10, y + 24, label, { anchor: 'end', size: 14, bold: true });
    let x = X0;
    for (const [name, v, color] of parts) {
      const w = (W * v) / total;
      s.rect(x, y, w, 48, { fill: color, color: 'accent', sw: 1.5, rx: 2 });
      s.text(x + w / 2, y + 16, name, { size: 11 });
      s.text(x + w / 2, y + 34, inr(v), { size: 11, bold: true });
      x += w;
    }
    check(Math.abs(x - X0 - W) < 1e-9, 'bar width');
  };
  bar(40, 'Debit', dr);
  bar(130, 'Credit', cr);
  s.text(X0 + W / 2, 214, `Both sides total ${inr(total)}; the loss is the amount the credit side falls short`, { size: 12, muted: true });
  return s.visual(
    `Two bars of equal length for the realisation account of Kamalabari Mask Makers, each totalling ${inr(total)}. Debit: assets at book value ${inr(assetsDr)} and liabilities and expenses paid ${inr(paidDr)}. Credit: provision, fund and liabilities ${inr(transferred)}, cash from assets ${inr(MJ.soldTotal)}, investments taken over ${inr(MJx.inv)} and the balancing loss ${inr(-MJ.RA.result)}`,
    'Segment widths are computed from the account.',
  );
})();
const vUnrec = table(
  ['Unrecorded item', 'Journal entry'],
  [
    ['Asset sold', 'Bank/Cash A/c Dr. To Realisation A/c'],
    ['Asset taken over by a partner', "Partner's Capital A/c Dr. To Realisation A/c"],
    ['Asset given to a creditor', 'No entry (the creditor\'s claim falls; only cash paid is entered)'],
    ['Liability paid', 'Realisation A/c Dr. To Bank/Cash A/c'],
    ['Liability paid by a partner', "Realisation A/c Dr. To Partner's Capital A/c"],
  ],
  'Table of unrecorded assets and liabilities: they are never transferred; an unrecorded asset sold or taken over is credited to realisation, and an unrecorded liability paid by the firm or by a partner is debited to realisation',
);
const vExp = table(
  ['Realisation expenses', 'Entry'],
  [
    ['1. Paid by the firm', 'Realisation A/c Dr. To Bank/Cash A/c'],
    ['2. Paid by a partner on behalf of the firm', "Realisation A/c Dr. To Partner's Capital A/c"],
    ['3. Borne and paid by a partner (no remuneration)', 'No entry'],
    ['   with a fixed remuneration to him', "Realisation A/c Dr. To Partner's Capital A/c (remuneration only)"],
    ['4. To be borne by a partner but paid by the firm', "Partner's Capital A/c Dr. To Bank/Cash A/c"],
    ['5. Paid by a partner, reimbursed with a firm\'s asset', "Realisation A/c Dr. To Partner's Capital A/c; Partner's Capital A/c Dr. To Realisation A/c (asset)"],
  ],
  'Table of the five cases of realisation expenses: paid by the firm, debit realisation; paid by a partner for the firm, credit his capital; borne and paid by a partner, no entry, or only his remuneration; borne by a partner but paid by the firm, debit his capital; paid by a partner and reimbursed with a firm asset, two entries through his capital',
);
const vCG = table(
  ['Champaner Glass Beads (imagined): case', 'Dr.', 'Cr.', '₹'],
  [
    ['Firm pays the expenses', 'Realisation A/c', 'Bank A/c', inr(CG.exp)],
    ['Hiral pays them for the firm', 'Realisation A/c', C('Hiral'), inr(CG.exp)],
    ['Hiral bears and pays them; no remuneration', '—', '—', 'No entry'],
    [`Hiral gets ${rs(CG.fee)}, bears and pays them`, 'Realisation A/c', C('Hiral'), inr(CG.fee)],
    ['Hiral bears them; firm pays', C('Hiral'), 'Bank A/c', inr(CG.exp)],
    ['Hiral pays; takes the bead-cutting table at an agreed value', 'Realisation A/c / Hiral\'s Capital A/c', "Hiral's Capital A/c / Realisation A/c", `${inr(CG.exp)} each`],
  ],
  `Table of worked example seven: with expenses of ${inr(CG.exp)}, the firm paying debits realisation and credits bank; Hiral paying for the firm credits her capital; Hiral bearing and paying needs no entry; a remuneration of ${inr(CG.fee)} is credited to her; if she bears them but the firm pays, her capital is debited; if she is reimbursed with the table, two entries pass through her capital`,
);
const vClose = flow('TB', ['Current accounts → capital accounts (fixed capitals)', 'Reserves credited, accumulated losses debited (profit-sharing ratio)', 'Loan to a partner debited to his capital', 'Realisation profit or loss shared', "Partners' loans repaid through Bank/Cash", 'Debit balances made good in cash', 'Final payment of credit balances: Bank/Cash closes at nil'], 'Flow for closing the books: transfer current accounts to capitals; credit reserves and debit accumulated losses; debit a loan to a partner to his capital; share the realisation result; repay partners loans in cash; partners with debit balances bring cash; pay the credit balances so that the bank or cash account closes at nil', 'Closing the books, in order');
const vLoans = table(
  ['Item', 'ISC treatment on dissolution'],
  [
    ['Bank overdraft', 'Opening credit balance of the Bank A/c (By Balance b/d); no transfer, no entry'],
    ['Bank loan', 'Transferred to Realisation (Cr.); repayment debited to Realisation'],
    ['Loan from a partner', 'Repaid through Bank/Cash, even if his capital is in debit (no set-off)'],
    ['Loan to a partner', "Partner's Capital A/c Dr. To Loan to Partner A/c"],
    ['Current accounts', 'Balances transferred to the capital accounts; no adjustment through them'],
  ],
  'Table of the ISC treatment of bank and partner balances: the overdraft opens the bank account; the bank loan passes through realisation; a partner loan is repaid in cash without set-off; a loan to a partner is debited to his capital; current account balances are transferred to capitals',
);
const vMJcaps = table(MJ.CA.headers, MJ.CA.rows, `Partners' capital accounts of Kamalabari Mask Makers: credits of the opening capitals and the general reserve; debits for the investments taken by Abhrajit, the loan to Dorjee and the realisation loss; final payments Abhrajit ${inr(MJ.CA.pay.Abhrajit)}, Shehnaz ${inr(MJ.CA.pay.Shehnaz)}, Dorjee ${inr(MJ.CA.pay.Dorjee)}`);
const vMJbank = table(MJ.BANK.headers, MJ.BANK.rows, `Bank account of Kamalabari Mask Makers: debit side cash from assets ${inr(MJ.soldTotal)}; credit side the opening overdraft ${inr(MJbook.od)}, liabilities, expenses, Shehnaz's loan ${inr(MJbook.sLoan)} and the three final payments; the account closes at nil with totals of ${inr(MJ.BANK.total)}`, 'The overdraft opens the account on the credit side.');
const vSummary2 = table(
  ['Event', 'Rule'],
  [
    ['Asset sold / liability paid', 'Bank Dr. To Realisation / Realisation Dr. To Bank'],
    ['Takeover by a partner', 'Capital Dr. (asset) or Cr. (liability), Realisation on the other side'],
    ['Creditor accepts an asset', 'No entry, except cash paid for any balance'],
    ['Unrecorded items', 'Only their sale, takeover or payment is entered'],
    ['Realisation expenses', "Firm's cost → Realisation; partner's cost → his capital or no entry"],
    ['Loans', "Partner's loan repaid in cash; loan to a partner → his capital"],
    ['Closing', 'Capitals and Bank/Cash close at nil'],
  ],
  'Summary table of Part 2: entries for assets sold and liabilities paid, takeovers, creditors accepting assets, unrecorded items, realisation expenses, partner loans, and closing the capital and bank accounts at nil',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Dissolution of a Partnership Firm — Part 1: Meaning, Section 48 and the Realisation Account',
  goals: [
    'Distinguish dissolution of the partnership from dissolution of the firm',
    'Settle accounts in the order laid down by Section 48 of the Indian Partnership Act, 1932',
    'Prepare a Memorandum Balance Sheet and transfer balances to the Realisation Account under the ISC rules',
    'Apply the ISC assumptions when the question is silent about an asset or a liability',
  ],
  slides: [
    sl('title', 'Dissolution of a Partnership Firm', {
      b: 'Part 1 — what dissolution means, **Section 48**, the **Memorandum Balance Sheet** and what goes to the **Realisation Account**. Every firm, person and figure in this chapter is imagined.',
      v: vRoute1,
      n: 'So far the firm has always carried on: partners joined, retired or changed their shares, and we adjusted the books. In this chapter the business itself comes to an end. We sell the assets, pay the outside liabilities and settle with the partners until every account is closed. This first part covers the meaning of dissolution, the legal order of settlement and how the balances reach the realisation account.',
    }),
    sl('concept', 'Partnership or firm: what is dissolved?', {
      v: vPvF,
      bl: ['**Dissolution of partnership:** the old agreement ends; the firm continues with adjusted books.', '**Dissolution of the firm:** the relation among all partners ends; the business closes and the books are closed.'],
      n: 'Two ideas sound alike but differ. When a partner joins, retires or dies, or the ratio changes, the old partnership agreement ends, yet the firm carries on and we simply adjust the books. When the firm itself is dissolved, the relation among all the partners ends, the business stops and every account is closed. Dissolving the firm always dissolves the partnership, but not the other way round.',
    }),
    sl('example', 'Worked example 1: partnership or firm?', {
      b: 'Four imagined firms in the north-east. Decide in each case what has been dissolved.',
      v: vWE1,
      n: 'Ask one question each time: does the business carry on? A retirement, an admission and a change in ratio all leave the business running under a new agreement, so only the partnership is dissolved. When every partner agrees to wind up and sell the assets, the business ends, so the firm is dissolved.',
    }),
    sl('check', 'Quick check: a retirement', {
      b: 'Does the business carry on?',
      chk: 'tf_reconstitution',
      n: 'Think about what happens to the firm and its books when only one partner leaves.',
    }),
    sl('concept', 'Settlement of accounts under Section 48', {
      v: vS48,
      bl: ['**Losses** first come out of profits, then capital, then the partners personally in the profit-sharing ratio.', 'The **cash** then pays: third parties → partners\' loans → partners\' capitals → any residue in the profit-sharing ratio.'],
      n: 'Section forty-eight of the Indian Partnership Act gives the order of settlement. Losses, including any shortfall of capital, are met first out of profits, then out of capital, and finally by the partners themselves in their profit-sharing ratio. The money is then paid out in a fixed order: outside creditors first, then loans from partners, then partners capitals, and anything left over is shared like profit.',
    }),
    sl('example', 'Worked example 2: paying out under Section 48', {
      b: `Ziro Kiwi Orchards (imagined): Oishee and Pratyush share **3 : 2**. After selling every asset the firm has ${rs(ZK.cash)}. Creditors ${rs(ZK.outside)}; Pratyush's loan ${rs(ZK.loans.Pratyush)}; capitals Oishee ${rs(ZK.capitals.Oishee)}, Pratyush ${rs(ZK.capitals.Pratyush)}.`,
      v: vWE2,
      n: `The claims add up to ${rw(ZK.claims)}, but only ${rw(ZK.cash)} is available, so the loss is ${rw(ZK.loss)}. Shared three to two, Oishee bears ${rw(ZK.part.Oishee)} and Pratyush ${rw(ZK.part.Pratyush)}. Creditors and Pratyush's loan are paid in full. Oishee then receives ${rw(ZK.capPay.Oishee)} and Pratyush ${rw(ZK.capPay.Pratyush)}, which uses up the cash exactly.`,
    }),
    sl('diagram', 'The cash steps down in order', {
      v: vLadder,
      b: 'Each claim is met before the next one is touched.',
      n: 'Picture the cash as a column that steps down. Creditors take the first slice, Pratyush\'s loan the second, and the two capitals, already reduced by the loss, take the rest. The last step lands exactly at zero, which is how you know the settlement is complete.',
    }),
    sl('check', 'Quick check: the section number', {
      b: 'Which section sets the order?',
      chk: 'fb_s48',
      n: 'Recall the section of the Indian Partnership Act that gives the mode of settlement.',
    }),
    sl('concept', 'The Memorandum Balance Sheet', {
      v: vMemo,
      bl: ['A **Memorandum Balance Sheet** sets out every balance on the date of dissolution, in **horizontal** form.', 'It is a statement, not an account: it often reveals a **missing figure** such as cash or a capital.'],
      n: 'Before closing the books we need a clear picture of what must be closed. A memorandum balance sheet lists every balance on the date of dissolution, liabilities and capitals on the left and assets on the right. It is only a statement, not part of the double entry, and it is handy when one figure, such as the cash or a partner\'s capital, is missing.',
    }),
    sl('example', 'Worked example 3: finding the missing cash', {
      b: 'Sohra Umbrella Works (imagined): Banalata and Ishfaq list their balances on the date of dissolution, but the cash in hand is not given.',
      v: vSU,
      n: `The liabilities and capitals total ${rw(SUbs.total)}. The machines, stock and debtors come to less than that, so the difference, ${rw(SUcash)}, must be the cash in hand. With every balance known, the books are ready to be closed.`,
    }),
    sl('two-column', 'The Realisation Account', {
      cols: [
        '**Debit (To)**\n\n- Assets at book (gross) value\n- Cash paid for liabilities\n- Expenses borne by the firm\n- Profit (balancing figure)',
        '**Credit (By)**\n\n- Related provisions and funds\n- Outside liabilities\n- Cash and takeovers for assets\n- Loss (balancing figure)',
      ],
      v: vRAformat,
      n: 'The realisation account is a nominal account that shows whether winding up made a profit or a loss. Assets go on the debit side at their full book value, and anything the firm pays out for liabilities or expenses joins them. The credit side receives the outside liabilities, related provisions and funds, and whatever the assets fetch. The balance is shared in the profit-sharing ratio.',
    }),
    sl('concept', 'What goes where: the ISC rules', {
      v: vWhere,
      b: 'A provision or fund **related** to an asset or liability follows it into the Realisation Account.',
      n: 'The syllabus is precise about where each balance goes. Assets go to realisation at their gross value, and any provision or fund related to them goes there too. A bank loan is an outside liability and goes to realisation, but a bank overdraft is closed through the bank account. Partners loans, loans to partners, reserves and current accounts all stay out of realisation.',
    }),
    sl('example', 'Worked example 4: Kamalabari Mask Makers', {
      b: 'Kamalabari Mask Makers (imagined): Abhrajit, Shehnaz and Dorjee share **3 : 2 : 1** and dissolve the firm on 31 March 2026.',
      v: vMJbs,
      n: `Here is the memorandum balance sheet of Kamalabari Mask Makers, totalling ${rw(MJ.BS.total)}. Notice the items that need care: a bank overdraft and a bank loan, a loan from Shehnaz and a loan to Dorjee, an investment fluctuation fund, goodwill and prepaid insurance. We will follow this firm right to the end of the chapter.`,
    }),
    sl('example', 'Worked example 4 (continued): the transfer entries', {
      b: 'Assets at gross value to the debit; the provision, the fund and outside liabilities to the credit.',
      v: vMJtransfer,
      n: 'Two entries open the realisation account. The first debits it with all six assets at their gross book value, including goodwill and prepaid insurance. The second credits it with the provision for doubtful debts, the investment fluctuation fund, the creditors and the bank loan. The overdraft, the partners loans and the general reserve are left out.',
    }),
    sl('check', 'Quick check: the fluctuation fund', {
      b: 'Where does a fund related to investments go?',
      chk: 'm_iff',
      n: 'Apply the rule about funds that relate to an asset taken to the realisation account.',
    }),
    sl('concept', 'When the question is silent', {
      v: vSilent,
      bl: ['Tangible assets and investments: **book value**.', 'Intangible assets, accrued income, prepaid expenses: **nil**.', 'Liabilities: paid **in full**.'],
      n: 'Questions often leave some items unmentioned, and the syllabus tells us what to assume. A tangible asset or investments are taken to realise their book value. Intangible assets such as goodwill or patents, accrued income and prepaid expenses are taken to realise nothing. A liability that is not mentioned is paid in full.',
    }),
    sl('example', 'Worked example 5: the assumptions at Kamalabari', {
      b: 'The terms say nothing about the stock, the goodwill, the prepaid insurance or the bank loan.',
      v: vMJsilent,
      n: `At Kamalabari, the stock is taken at its book value of ${rw(MJbook.stock)}. Goodwill and prepaid insurance realise nothing, so their book values become part of the loss. The bank loan of ${rw(MJbook.loan)} is paid in full. The fund goes to realisation, the overdraft opens the bank account and Dorjee's loan is charged to his capital.`,
    }),
    sl('check', 'Quick check: accrued income', {
      b: 'Apply the assumption for accrued income.',
      chk: 'tf_prepaid',
      n: 'If the question never mentions an accrued item, what does it realise?',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up: the firm is dissolved only when the business closes. Section forty-eight meets losses from profits, then capital, then the partners, and pays creditors, partners loans and capitals in that order. A memorandum balance sheet sets out the balances. Assets, related funds and outside liabilities go to realisation, the overdraft goes to the bank account, and silent items follow the syllabus assumptions.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Write **gross** values of assets in the Realisation Account and credit the provision separately.',
        'Send a fund or provision **related** to an asset or liability to Realisation; send an unrelated reserve to the **capitals**.',
        '**Bank overdraft** opens the Bank A/c; **bank loan** goes through Realisation.',
        'State each **assumption** for silent items in a working note: it earns the step mark.',
        'Never transfer cash, bank, partners\' loans or capitals to the Realisation Account.',
      ],
      n: 'A few habits save marks. Show assets at their gross value and credit the provision on its own. Remember that related funds go to realisation but a general reserve goes to the capitals. Keep the overdraft in the bank account and the bank loan in realisation. Write down every assumption you make for silent items, and never send cash or partners balances to realisation.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Dissolution of a Partnership Firm — Part 2: Realisation, Expenses, Capitals and the Bank Account',
  goals: [
    'Record the sale of assets, payment of liabilities, takeovers by partners and settlements with creditors',
    'Treat unrecorded assets and liabilities',
    'Record realisation expenses in each of the cases in the syllabus',
    "Close partners' capital, loan and Bank/Cash accounts, applying the ISC rules for overdrafts and partners' loans",
  ],
  slides: [
    sl('title', 'Realisation, expenses, capitals and the Bank Account', {
      b: 'Part 2 — the **events** of winding up, **realisation expenses**, and closing the **capital**, **loan** and **Bank/Cash** accounts.',
      v: vRoute2,
      n: 'With the balances transferred, the real work of winding up begins. Assets are sold or taken over, liabilities are paid or settled with assets, unrecorded items turn up, and someone pays the expenses. Finally we close the partners accounts and the bank account. We finish the Kamalabari example along the way.',
    }),
    sl('concept', 'Selling assets and paying liabilities', {
      v: vSellPay,
      n: 'When an asset is sold, the bank is debited and the realisation account credited. When a liability is paid, the realisation account is debited and the bank credited, with the amount actually paid, so a discount simply reduces the debit. An asset that fetches nothing needs no entry at all: its book value already sits on the debit side.',
    }),
    sl('concept', 'Partners and creditors who take assets', {
      v: vTakeovers,
      b: 'Only cash that actually moves is entered when a creditor accepts an asset.',
      n: 'A partner who takes over an asset is debited with its agreed value, and realisation is credited. A partner who agrees to pay a liability is credited, and realisation is debited. When a creditor accepts an asset in full settlement, both are already in the realisation account, so no entry is needed. If the creditor also gets some cash, only that cash is entered.',
    }),
    sl('example', 'Worked example 6: the Realisation Account at Kamalabari', {
      b: `Machinery realises ${rs(MJx.mach)} and debtors ${rs(MJx.debt)}; Abhrajit takes the investments at ${rs(MJx.inv)}; creditors accept ${rs(MJx.cred)}; expenses ${rs(MJx.exp)} are paid; the silent items follow the ISC assumptions.`,
      v: vMJra,
      n: `Post the realisations on the credit side, including the stock at book value and Abhrajit's investments, and post the payments on the debit side, including the bank loan in full. The debit side is larger, so there is a loss of ${rw(-MJ.RA.result)}. Shared three to two to one, Abhrajit bears ${rw(MJ.RA.part.Abhrajit)}, Shehnaz ${rw(MJ.RA.part.Shehnaz)} and Dorjee ${rw(MJ.RA.part.Dorjee)}.`,
    }),
    sl('diagram', 'Seeing the loss', {
      v: vRAsides,
      b: 'The loss is the gap between the two sides before balancing.',
      n: 'Here are the two sides of the Kamalabari realisation account drawn to scale. The debit side holds the assets at book value and the cash paid out. The credit side holds the liabilities transferred, the cash received and the investments Abhrajit took. It falls short, and that shortfall is the loss on realisation.',
    }),
    sl('check', 'Quick check: match the entries', {
      b: 'Who gives and who receives?',
      chk: 'match_entries',
      n: 'For each event, decide which account is debited and which is credited.',
    }),
    sl('concept', 'Unrecorded assets and liabilities', {
      v: vUnrec,
      b: 'Items missing from the books are **never transferred**; only what happens to them is entered.',
      n: 'Sometimes an asset that was written off, or a liability that was never recorded, appears at the time of dissolution. Since it is not in the books, there is nothing to transfer. We record only what happens to it: an unrecorded asset sold or taken over is credited to realisation, and an unrecorded liability paid is debited to realisation.',
    }),
    sl('concept', 'Realisation expenses: the cases', {
      v: vExp,
      n: 'Expenses of winding up follow one simple test: whose cost is it, and whose money pays it? If the firm bears them, they go to realisation, whether the firm or a partner pays. If a partner must bear them and pays them himself, there is no entry, unless he is given a remuneration. If the firm pays expenses a partner should bear, his capital is debited.',
    }),
    sl('example', 'Worked example 7: Champaner Glass Beads', {
      b: `Champaner Glass Beads, Halol (imagined): realisation expenses are ${rs(CG.exp)}. How is Hiral, a partner, involved in each case?`,
      v: vCG,
      n: `With expenses of ${rw(CG.exp)}, the firm paying them debits realisation. Hiral paying them for the firm credits her capital. If she bears and pays them, there is no entry, or only her remuneration of ${rw(CG.fee)}. If the firm pays expenses she must bear, her capital is debited. If she is reimbursed with a table, two entries pass through her capital.`,
    }),
    sl('check', 'Quick check: a partner bears the expenses', {
      b: 'Whose cost, whose money?',
      chk: 'm_exp_borne_himself',
      n: 'Apply the test to a partner who must bear the expenses and pays them himself.',
    }),
    sl('concept', 'Closing the books, step by step', {
      v: vClose,
      n: 'Once realisation is balanced, close the remaining accounts in order. Transfer current accounts to capitals. Credit reserves and debit accumulated losses in the profit-sharing ratio. Debit any loan to a partner to his capital. Post the realisation result. Repay partners loans in cash, collect cash from any partner in debit, and pay out the credit balances.',
    }),
    sl('concept', 'Overdraft, bank loan and partners\' loans', {
      v: vLoans,
      n: 'The syllabus fixes five treatments. The overdraft opens the bank account on the credit side. The bank loan goes through realisation. A loan from a partner is repaid in cash even if his capital ends in debit, so there is no set-off. A loan to a partner is debited to his capital. Current account balances are simply moved into the capital accounts.',
    }),
    sl('example', 'Worked example 8: capital accounts at Kamalabari', {
      b: 'General reserve credited 3 : 2 : 1; investments charged to Abhrajit; the loan to Dorjee debited to his capital; the loss shared.',
      v: vMJcaps,
      n: `Each partner is credited with a share of the general reserve and debited with a share of the loss. Abhrajit is also charged for the investments he took, and Dorjee for the loan the firm gave him. The balances left are paid in cash: ${rw(MJ.CA.pay.Abhrajit)} to Abhrajit, ${rw(MJ.CA.pay.Shehnaz)} to Shehnaz and ${rw(MJ.CA.pay.Dorjee)} to Dorjee.`,
    }),
    sl('example', 'Worked example 8 (continued): the Bank Account', {
      b: 'The overdraft is the opening credit balance; the account must close at nil.',
      v: vMJbank,
      n: `The bank account opens with the overdraft of ${rw(MJbook.od)} on the credit side. The assets bring in ${rw(MJ.soldTotal)}. Out of this the firm clears the overdraft, pays the creditors, the bank loan and the expenses, repays Shehnaz's loan of ${rw(MJbook.sLoan)}, and finally pays the three partners. Both sides total ${rw(MJ.BANK.total)}, so the account closes at nil.`,
    }),
    sl('check', 'Quick check: the overdraft', {
      b: 'Where does the overdraft appear?',
      chk: 'm_overdraft_entry',
      n: 'Recall where the syllabus places a bank overdraft on dissolution.',
    }),
    sl('check', 'Quick check: one partner\'s final payment', {
      b: 'Add the credits, subtract the debits.',
      chk: 'n_final_payment',
      n: 'Work through the capital account of one partner, item by item.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up: assets sold and liabilities paid pass through realisation and the bank. Partners taking assets are debited, and partners paying liabilities are credited. A creditor accepting an asset needs no entry except for any cash. Unrecorded items enter only when used. Expenses follow whose cost they are. Partners loans are repaid in cash, and every account closes at nil.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Prepare the accounts in order: **Realisation**, **Partners\' Loan**, **Capital**, **Bank/Cash**.',
        'For realisation expenses, ask **whose cost** and **whose money** before writing the entry.',
        'A creditor taking an asset: **no entry** for the asset; enter only the cash part.',
        "Repay a partner's loan in full even if his capital ends in **debit**; he brings cash separately.",
        'The Bank/Cash A/c and every capital account must close at **nil**: use this as your final check.',
      ],
      n: 'In the exam, prepare the accounts in order: realisation, then partners loans, capitals and finally the bank or cash account. Before writing an expense entry, ask whose cost it is and whose money pays it. Enter only the cash part when a creditor takes an asset. Repay a partner\'s loan in full even if his capital is in debit. And check that every account closes at nil.',
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
  title: 'Dissolution of a Partnership Firm — Notes',
  sections: [
    {
      h: '1. Dissolution of partnership and dissolution of the firm',
      t: 1,
      b: "**Dissolution of partnership** ends the existing agreement among the partners, but the firm continues: admission, retirement, death and a change in the profit-sharing ratio all reconstitute the firm, and its books are adjusted.\n\n**Dissolution of the firm** ends the relation of partnership among **all** the partners. The business closes; the assets are realised, the liabilities paid and the partners settled, so every account in the books is closed.\n\nA dissolution of the firm always dissolves the partnership; a dissolution of the partnership need not dissolve the firm.\n\n*Not in the ISC 2027 syllabus for this chapter:* admission-cum-retirement, amalgamation of firms, conversion or sale to a company, piecemeal distribution and insolvency of partners.",
      terms: [
        ['Dissolution of partnership', 'End of the existing agreement among the partners while the firm and its business continue.'],
        ['Dissolution of the firm', 'End of the relation of partnership among all the partners, with the business closed and its books closed.'],
      ],
      v: vPvF,
      vs: [vWE1],
    },
    {
      h: '2. Settlement of accounts under Section 48',
      t: 1,
      b: "Section 48 of the **Indian Partnership Act, 1932** governs the settlement of accounts between partners after dissolution, subject to any agreement among them.\n\n**(a) Losses**, including deficiencies of capital: paid first out of **profits**, next out of **capital**, and lastly by the **partners individually** in their profit-sharing ratio.\n\n**(b) Application of assets** (including sums partners contribute to make up deficiencies):\n1. debts of the firm to **third parties**;\n2. each partner rateably what is due for **advances (loans)**, as distinct from capital;\n3. each partner rateably what is due on account of **capital**;\n4. the **residue**, if any, among the partners in their profit-sharing ratio.\n\n**Working:** loss = total claims (outside debts + partners' loans + capitals) − cash available; capital paid = capital − share of loss.",
      terms: [
        ['Rateably', 'In proportion to the amounts due to each partner under that head.'],
        ['Deficiency of capital', "The amount by which a partner's share of losses exceeds his capital."],
      ],
      v: vS48,
      vs: [vWE2, vLadder],
    },
    {
      h: '3. The Memorandum Balance Sheet',
      t: 4,
      b: "A **Memorandum Balance Sheet** is the firm's balance sheet drawn up on the date of dissolution, in **horizontal** form, to set out the balances that must now be closed. It is a statement, not an account, and is not part of the double entry.\n\nIt is useful when the question gives ledger balances in a list, or when one figure (often **cash/bank** or a **partner's capital**) is missing: the missing figure is the balancing amount.\n\n**Check:** total liabilities and capitals = total assets.",
      terms: [
        ['Memorandum Balance Sheet', 'A balance sheet prepared on the date of dissolution only to show the balances to be closed; not part of the double entry.'],
        ['Balancing figure', 'The amount that makes the two sides of a statement agree; used to find a missing balance.'],
      ],
      v: vMemo,
      vs: [vSU],
    },
    {
      h: '4. The Realisation Account and the ISC rules for transfers',
      t: 2,
      b: "The **Realisation Account** is a nominal account opened on dissolution to find the profit or loss on realising the assets and settling the outside liabilities.\n\n**Transfer entries**\n- Realisation A/c Dr. To each asset A/c (gross book value; not cash, bank, a loan to a partner or fictitious assets).\n- Related provision or fund A/c Dr., outside liability A/cs Dr. To Realisation A/c.\n\n**ISC 2027 rules**\n- A fund or reserve **related** to an asset or liability taken to Realisation is also transferred to Realisation, not to capitals (e.g. provision for doubtful debts, provision for depreciation, investment fluctuation fund).\n- **Bank overdraft** is taken to the Bank/Cash A/c, not to Realisation; a **bank loan** is transferred to Realisation.\n\n**Silent items (ISC assumptions)**\n- Tangible assets and investments: realised at **book value**.\n- Intangible assets, accrued income, prepaid expenses: realise **nil**.\n- Liabilities: paid **in full**.",
      terms: [
        ['Realisation Account', 'Nominal account recording the transfer, sale and settlement of assets and outside liabilities on dissolution; its balance is the profit or loss on realisation.'],
        ['Related fund or provision', 'A balance set aside against a particular asset or liability; it follows that item into the Realisation Account.'],
      ],
      v: vWhere,
      vs: [vRAformat, vSilent, vMJbs, vMJtransfer, vMJsilent],
    },
    {
      h: '5. Realising assets, settling liabilities and unrecorded items',
      t: 2,
      b: "- **Asset sold:** Bank/Cash A/c Dr. To Realisation A/c.\n- **Asset taken over by a partner:** Partner's Capital A/c Dr. To Realisation A/c (agreed value).\n- **Liability paid:** Realisation A/c Dr. To Bank/Cash A/c (amount actually paid; a discount reduces it).\n- **Liability taken over by a partner:** Realisation A/c Dr. To Partner's Capital A/c.\n- **Creditor accepts an asset in full settlement:** no entry; if he also receives cash: Realisation A/c Dr. To Bank/Cash A/c (cash part only).\n- **Unrecorded asset** sold or taken over: Bank/Cash or Partner's Capital A/c Dr. To Realisation A/c.\n- **Unrecorded liability** paid: Realisation A/c Dr. To Bank/Cash A/c.\n- **Result:** profit — Realisation A/c Dr. To Partners' Capital A/cs; loss — Partners' Capital A/cs Dr. To Realisation A/c (profit-sharing ratio).",
      terms: [
        ['Agreed value', 'The value at which a partner takes over an asset or a creditor accepts it, which may differ from book value.'],
        ['Unrecorded asset', 'An asset of the firm not shown in the books, such as one fully written off, that still fetches something on dissolution.'],
      ],
      v: vSellPay,
      vs: [vTakeovers, vUnrec, vMJra, vRAsides],
    },
    {
      h: '6. Realisation expenses',
      t: 3,
      b: "Test: **whose cost** is it, and **whose money** pays it?\n\n| Case | Entry |\n|---|---|\n| Paid by the firm | Realisation A/c Dr. To Bank/Cash A/c |\n| Paid by a partner on behalf of the firm | Realisation A/c Dr. To Partner's Capital A/c |\n| Borne and paid by a partner | No entry (with a remuneration: Realisation A/c Dr. To Partner's Capital A/c, remuneration only) |\n| To be borne by a partner, paid by the firm | Partner's Capital A/c Dr. To Bank/Cash A/c |\n| Paid by a partner and reimbursed with a firm's asset | Realisation A/c Dr. To Partner's Capital A/c (expenses); Partner's Capital A/c Dr. To Realisation A/c (asset) |",
      terms: [
        ['Realisation expenses', 'Costs of winding up the firm, such as legal fees, advertisement of sale and brokerage.'],
        ['Remuneration for dissolution', 'A fixed amount allowed to a partner for carrying out the winding up, usually in return for bearing its expenses.'],
      ],
      v: vExp,
      vs: [vCG],
    },
    {
      h: '7. Loans, current accounts, capital accounts and the Bank/Cash Account',
      t: 4,
      b: "**Order of closing:** current accounts → reserves and accumulated losses → loan to a partner → realisation result → partners' loans repaid → cash brought in for debit balances → final payment.\n\n- **Current accounts (fixed capitals):** balances transferred to the capital accounts; no adjustment passes through them.\n- **General reserve, credit balance of profit and loss:** Reserve A/c Dr. To Partners' Capital A/cs.\n- **Debit balance of profit and loss, advertisement suspense:** Partners' Capital A/cs Dr. To the account.\n- **Loan to a partner:** Partner's Capital A/c Dr. To Loan to Partner A/c.\n- **Loan from a partner:** Partner's Loan A/c Dr. To Bank/Cash A/c — even if his capital account has a debit balance (no set-off).\n- **Debit balance of capital:** Bank/Cash A/c Dr. To Partner's Capital A/c (cash brought in).\n- **Final payment:** Partners' Capital A/cs Dr. To Bank/Cash A/c.\n- **Bank overdraft:** opening credit balance of the Bank A/c (By Balance b/d), cleared from the cash realised.\n\n**Check:** every capital account and the Bank/Cash Account close at **nil**.",
      terms: [
        ['Final payment', "Cash paid to each partner for the credit balance of his capital account, closing the books."],
        ['Cash brought in', "Cash contributed by a partner whose capital account shows a debit balance after all adjustments."],
      ],
      v: vClose,
      vs: [vLoans, vMJcaps, vMJbank],
    },
  ],
  tips: "**Common mistakes**\n- Transferring a related fund (investment fluctuation fund, provision) to the capitals instead of the Realisation Account, or a general reserve to Realisation.\n- Sending the **bank overdraft** to Realisation; under ISC it opens the Bank/Cash Account. The **bank loan** does go to Realisation.\n- Showing debtors net of the provision in the Realisation Account; transfer the **gross** figure and credit the provision.\n- Making an entry when a creditor accepts an asset in full settlement.\n- Debiting the Realisation Account with expenses that a partner must bear.\n- Setting off a partner's loan against a debit balance in his capital account.\n- Forgetting the ISC assumptions for silent items (tangible at book value; intangible, accrued and prepaid items nil; liabilities in full).\n\n**How marks are usually awarded (SOYL chapter tests on the ISC default pattern)**\n- 1 mark: objective items.\n- 2 marks: two or three journal entries, a Memorandum Balance Sheet, or a distinction.\n- 3 marks: a Realisation Account, a Section 48 payout, a Bank Account, or capital accounts.\n- 5 marks in parts, e.g. (a) 2 + (b) 3: entries and a Realisation Account, or a Realisation Account with capital and Bank accounts.\n- Full practical (practice, 8 marks): Realisation Account about 4, capital accounts about 3, Bank/Cash Account about 1–2; working notes for assumptions earn step marks. The ISC 2027 weightage for Dissolution in Paper I is 8 marks.\n\n**Figures in SOYL practice** are imagined; your board paper will give its own.",
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['**Dissolution of partnership**', 'The old agreement among the partners ends, but the firm continues with adjusted books.', 'definition', 1],
  ['**Dissolution of the firm**', 'The relation among all partners ends; the business closes and every account is closed.', 'definition', 1],
  ['Does dissolving the firm dissolve the partnership?', 'Always; the reverse is not true.', 'concept', 1],
  ['Section 48: losses are met from…', 'Profits, then capital, then the partners individually in the profit-sharing ratio.', 'fact', 1],
  ['Section 48: order of applying the assets', "Third-party debts → partners' loans (rateably) → partners' capitals (rateably) → residue in the profit-sharing ratio.", 'fact', 1],
  ['Loss in a Section 48 question', "Total claims (outside debts + partners' loans + capitals) − cash available.", 'exam-tip', 1],
  ['**Memorandum Balance Sheet**', 'Balance sheet on the date of dissolution, setting out the balances to be closed; not part of the double entry.', 'definition', 4],
  ['A missing cash balance in a Memorandum Balance Sheet', 'Found as the balancing figure: total liabilities and capitals − other assets.', 'exam-tip', 4],
  ['**Realisation Account**', 'Nominal account showing the profit or loss on realising assets and settling outside liabilities.', 'definition', 2],
  ['Assets in the Realisation Account', 'Debited at **gross** book value; the provision is credited separately.', 'fact', 2],
  ['Investment fluctuation fund on dissolution (ISC)', 'Credited to the **Realisation Account**, because the investments go there.', 'fact', 2],
  ['General reserve on dissolution', "Credited to partners' capital accounts in the profit-sharing ratio.", 'fact', 2],
  ['Bank overdraft on dissolution (ISC)', 'Opening credit balance of the Bank/Cash Account; not transferred to Realisation.', 'fact', 4],
  ['Bank loan on dissolution (ISC)', 'Transferred to Realisation; its repayment is debited to Realisation.', 'fact', 2],
  ['Silent tangible asset or investments (ISC)', 'Realised at **book value**.', 'exam-tip', 2],
  ['Silent intangible asset, accrued income or prepaid expense (ISC)', 'Realises **nil**.', 'exam-tip', 2],
  ['Silent liability (ISC)', 'Paid **in full**.', 'exam-tip', 2],
  ['Asset taken over by a partner', "Partner's Capital A/c Dr. To Realisation A/c.", 'fact', 2],
  ['Liability taken over by a partner', "Realisation A/c Dr. To Partner's Capital A/c.", 'fact', 2],
  ['Creditor accepts an asset in full settlement', '**No entry.**', 'fact', 2],
  ['Unrecorded asset sold', 'Bank/Cash A/c Dr. To Realisation A/c.', 'fact', 2],
  ['Unrecorded liability paid', 'Realisation A/c Dr. To Bank/Cash A/c.', 'fact', 2],
  ['Realisation expenses paid by the firm', 'Realisation A/c Dr. To Bank/Cash A/c.', 'fact', 3],
  ['Expenses paid by a partner on behalf of the firm', "Realisation A/c Dr. To Partner's Capital A/c.", 'fact', 3],
  ['Expenses borne and paid by a partner', 'No entry (only his remuneration, if any, is credited to him).', 'concept', 3],
  ['Expenses to be borne by a partner but paid by the firm', "Partner's Capital A/c Dr. To Bank/Cash A/c.", 'fact', 3],
  ["Partner reimbursed for expenses with a firm's asset", "Realisation Dr. To his Capital (expenses); his Capital Dr. To Realisation (asset).", 'concept', 3],
  ['Loan to a partner on dissolution (ISC)', "Partner's Capital A/c Dr. To Loan to Partner A/c.", 'fact', 4],
  ["Partner's loan when his capital is in debit (ISC)", 'Repaid in full through Bank/Cash; no set-off; he brings cash for the debit.', 'concept', 4],
  ['Current accounts on dissolution (ISC)', 'Balances transferred to the capital accounts.', 'fact', 4],
  ['Final check on dissolution', 'Every capital account and the Bank/Cash Account close at **nil**.', 'exam-tip', 4],
]);

// ---------------------------------------------------------------- tests (ISC class defaults, item for item)
const T_SHORT = test({
  kind: 'short',
  blueprint: 'isc-12-default-chapter-test-short',
  title: 'Chapter test (short) — Dissolution of a Partnership Firm',
  duration: 50,
  sections: [
    { id: 'A', title: 'Section A - Objective (5 marks)', instr: 'Answer all questions. Multiple-choice and assertion-reason items carry 1 mark each.', items: ['m_s48_order', 'm_silent_tangible', 'm_exp_firm', 'm_loan_to_partner', 'ar_overdraft'] },
    { id: 'B', title: 'Section B - Short answer (4 marks)', instr: 'Answer both questions. Internal choice in the second question.', items: ['s2_distinguish', { attempt: 1, keys: ['s2_takeover', 's2_exp_cases'] }] },
    { id: 'C', title: 'Section C - Short answer (6 marks)', instr: 'Answer both questions. Internal choice in the second question. Show your working.', items: ['s3_s48_calc', { attempt: 1, keys: ['s3_ra', 's3_bank_account'] }] },
    { id: 'D', title: 'Section D - Long answer (5 marks)', instr: 'Answer the question. It is set in parts (2 + 3 marks); show working notes for any assumption.', items: ['l5_ra'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'isc-12-default-chapter-test-long',
  title: 'Chapter test (long) — Dissolution of a Partnership Firm',
  duration: 100,
  sections: [
    { id: 'A', title: 'Section A - Objective (12 marks)', instr: 'Answer all questions. Multiple-choice and assertion-reason items carry 1 mark each.', items: ['m_firm_vs_pship', 'm_s48_loss', 'm_ra_excluded', 'm_silent_intangible', 'm_partner_assumes', 'm_creditor_asset', 'm_ra_result', 'm_exp_borne_firm_pays', 'm_exp_asset', 'm_partner_loan_debit', 'ar_firm', 'ar_partner_loan'] },
    { id: 'B', title: 'Section B - Short answer (6 marks)', instr: 'Answer all three questions. Internal choice in the last question.', items: ['s2_silent', 's2_overdraft', { attempt: 1, keys: ['s2_loans', 's2_memo_bs'] }] },
    { id: 'C', title: 'Section C - Short answer (12 marks)', instr: 'Answer all four questions. Internal choice in the last question. Show your working.', items: ['s3_s48_rules', 's3_creditors', 's3_related', { attempt: 1, keys: ['s3_exp_cases', 's3_capital_bank'] }] },
    { id: 'D', title: 'Section D - Long answer (10 marks)', instr: 'Answer both questions. Internal choice in the second question. Each is set in parts (2 + 3 or 3 + 2 marks).', items: ['l5_s48', { attempt: 1, keys: ['l5_caps_bank', 'l5_journal'] }] },
  ],
});

// Deck checks never appear in the tests.
const inTests = new Set([T_SHORT, T_LONG].flatMap((t) => t.sections.flatMap((s) => s.items.map((i) => i.question_id))));
for (const d of [part1, part2]) for (const s of d.slides) if (s.check_question_id) check(!inTests.has(s.check_question_id), `deck check ${s.check_question_id} is also in a test`);

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t04 of isc-12-accounts-ch05 only (dissolution of partnership and of the firm and Section 48; the Realisation Account with the ISC transfer rules and assumptions; realisation expenses in every syllabus case; the Memorandum Balance Sheet, partners\' loan, capital and Bank/Cash accounts with the ISC rules for overdraft, bank loan, loans to and from partners and current accounts). Removed topics appear only as one note in notes section 1.',
    originality: 'every firm, person and figure is imagined and labelled as such; no textbook illustration or exercise and no CISCE specimen or past-paper item is reused; firms, people and set-ups differ from the CBSE 12 Accountancy chapters and ISC ch01–ch03',
    data: 'every Section 48 payout, realisation result, capital account and Bank/Cash account is computed by acc.mjs and asserted: journal entries balance, ledger accounts and balance sheets total, every asset is disposed of and every liability settled, every capital account and the Bank/Cash Account close at nil, every share is whole rupees',
    accounting: 'ISC 2027 dissolution notes applied: related funds and provisions to Realisation; bank overdraft through Bank/Cash and bank loan through Realisation; silent tangible assets and investments at book value, intangibles, accrued income and prepaid expenses nil, liabilities in full; partners\' loans repaid in cash without set-off; loans to partners debited to capitals; current accounts transferred to capitals; five cases of realisation expenses',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
