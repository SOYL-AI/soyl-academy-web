// Build CBSE 12 Accountancy ch05 Dissolution of a Partnership Firm. Run from platform/:
//   npx tsx content/authored/economics-commerce/cbse-12-accountancy-ch05/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';

setUnit('cbse-12-accountancy-ch05', 'economics-commerce');
const { fig, rs, rupees, sum, shares, split, journal, dissolve, check } = await import('./acc.mjs');
const { FACTS } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const T = (t) => table(t.headers, t.rows, t.alt, t.caption);

// ---------------------------------------------------------------- running example: Narmada Textiles (imagined, Jabalpur)
const NAMES = ['Asha', 'Bhavesh', 'Charu'];
const SH = shares(NAMES, [3, 2, 1]);
const EV = {
  building: 134000, machinery: 92000, debtors: 46000, computer: 5000, furniture: 25000, stock: 66000,
  creditors: 58000, bp: 20000, exp: 4000,
};
const NT = dissolve({
  names: NAMES, sh: SH, bank: 26000,
  assets: [['Building', 100000], ['Machinery', 100000], ['Furniture', 30000], ['Stock', 70000], ['Debtors', 50000]],
  provisions: [['Provision for Doubtful Debts', 2000, 'Debtors']],
  liabilities: [['Creditors', 60000], ['Bills Payable', 20000]],
  loans: { Bhavesh: 30000 }, reserves: [['General Reserve', 24000]],
  capitals: { Asha: 120000, Bhavesh: 80000, Charu: 40000 },
  sold: [['Building', EV.building], ['Machinery', EV.machinery], ['Debtors', EV.debtors], ['unrecorded computer', EV.computer]],
  takenOver: [['Furniture', 'Asha', EV.furniture], ['Stock', 'Charu', EV.stock]],
  paid: [['Creditors', EV.creditors], ['Bills Payable', EV.bp], ['realisation expenses', EV.exp]],
});
const GR = split(24000, SH);
for (const [ok, what] of [
  [NT.BS.total === 374000, 'opening balance sheet'],
  [NT.RA.result === 18000 && NT.RA.part.Asha === 9000, 'realisation profit'],
  [NT.CA.pay.Asha === 116000 && NT.CA.pay.Bhavesh === 94000 && NT.CA.bring.Charu === 19000, 'capital accounts'],
  [NT.BANK.total === 322000 && NT.soldTotal === 277000, 'bank account'],
]) check(ok, `Narmada Textiles: ${what}`);

// ---------------------------------------------------------------- Section 48 example: Meena and Nitin (imagined bakery, Shimla)
const MN = { cash: 210000, creditors: 90000, loan: 40000, cap: { Meena: 50000, Nitin: 40000 } };
const MNclaims = MN.creditors + MN.loan + sum(Object.values(MN.cap));
const MNloss = MNclaims - MN.cash;
const MNls = split(MNloss, shares(['Meena', 'Nitin'], [1, 1]));
const MNpay = { Meena: MN.cap.Meena - MNls.Meena, Nitin: MN.cap.Nitin - MNls.Nitin };
check(MNloss === 10000 && MN.creditors + MN.loan + MNpay.Meena + MNpay.Nitin === MN.cash, 'Meena and Nitin');

// ---------------------------------------------------------------- deck 1 visuals
const vRoute1 = flow('LR', ['Partnership or firm?', 'Five modes', 'Section 48 order', 'Realisation Account'], 'Route map of Part 1: dissolution of partnership versus dissolution of the firm, the five modes of dissolution, the order of settlement under Section 48, and the Realisation Account', 'Part 1 at a glance');
const vPvF = table(
  ['Basis', 'Dissolution of partnership', 'Dissolution of the firm'],
  [
    ['What ends', 'The old agreement among the partners', 'The business and every partner’s relationship'],
    ['Business', 'Carries on (reconstituted firm)', 'Is closed'],
    ['Books', 'Continue; assets and liabilities revalued', 'Closed; assets sold, liabilities paid'],
    ['Examples', 'Admission, retirement, death, change in ratio', 'Agreement to close, unlawful business, court order'],
  ],
  'Table comparing dissolution of partnership, where only the agreement ends and the business and books carry on, with dissolution of the firm, where the business is closed, assets are sold, liabilities paid and the books closed',
);
const vTwoPaths = flow(
  'LR',
  ['A change among the partners', 'Partnership dissolved; the firm carries on', 'The business is closed', 'Firm dissolved; the partnership ends too'],
  'Two paths: a change among the partners, such as a retirement, dissolves only the partnership and the firm carries on; closing the business dissolves the firm, and with it the partnership',
  'Every dissolution of a firm is also a dissolution of partnership; not the other way round',
  [{ from: 'n1', to: 'n2' }, { from: 'n3', to: 'n4' }],
);
const vWE1 = table(
  ['Situation (imagined firms)', 'Partnership dissolved?', 'Firm dissolved?'],
  [
    ['Kiran retires; Lina and Manoj carry on the shop', 'Yes', 'No'],
    ['Three partners change their ratio from 3:2:1 to 1:1:1', 'Yes', 'No'],
    ['All the partners agree to close the shop and sell its stock', 'Yes', 'Yes'],
    ['A new partner is admitted for a 1/5 share', 'Yes', 'No'],
  ],
  'Table of four situations: a retirement, a change of ratio and an admission dissolve only the partnership; an agreement to close the shop dissolves the firm as well',
);
const vModes = table(
  ['Mode', 'Section', 'In short'],
  [
    ['By agreement', '40', 'All partners consent, or as the contract provides'],
    ['Compulsory', '41', 'By law, e.g. the business becomes unlawful'],
    ['On contingencies', '42', 'Fixed term ends, venture completed, death of a partner (unless agreed otherwise)'],
    ['By notice', '43', 'Partnership at will: written notice by any partner'],
    ['By the court', '44', 'On a partner’s suit, on grounds the Act lists'],
  ],
  'Table of the five modes of dissolution under the Indian Partnership Act: by agreement, compulsory, on the happening of contingencies, by notice in a partnership at will, and by the court on a partner’s suit',
  'Indian Partnership Act 1932, Sections 40–44',
);
const vCompCont = table(
  ['Compulsory dissolution (Section 41)', 'On contingencies (Section 42)'],
  [
    ['Happens by law, even if the partners want to continue', 'Happens unless the partners have agreed otherwise'],
    ['Example: a new law bans the firm’s trade', 'The fixed term of the firm ends'],
    ['Example: the business can no longer be carried on lawfully', 'The venture the firm was formed for is completed'],
    ['', 'A partner dies'],
  ],
  'Table: compulsory dissolution happens by law, for example when the firm’s trade is banned; dissolution on contingencies happens, unless agreed otherwise, when a fixed term ends, a venture is completed or a partner dies',
);
const vCourt = table(
  ['Ground for dissolution by the court (Section 44)', 'Imagined example'],
  [
    ['Unsound mind of a partner', 'A partner loses mental capacity; another partner sues'],
    ['Permanent incapacity', 'A partner can never again do his share of the work'],
    ['Misconduct or persistent breach', 'A partner keeps signing contracts the deed forbids'],
    ['Transfer of whole interest', 'A partner sells his entire share to an outsider'],
    ['Business only at a loss', 'Losses every year with no hope of recovery'],
    ['Just and equitable ground', 'Deadlock: the partners cannot work together at all'],
  ],
  'Table of grounds on which the court may dissolve a firm on a partner’s suit: unsound mind, permanent incapacity, misconduct or persistent breach, transfer of a partner’s whole interest, a business run only at a loss, and any just and equitable ground',
  'Dissolution by notice (Section 43) needs a partnership at will and a written notice.',
);
const vWE2 = table(
  ['Situation (imagined firms)', 'Mode', 'Section'],
  [
    ['A firm formed to run one trade fair; the fair is over', 'On a contingency', '42'],
    ['A partner in a firm at will writes to the others ending it from 1 July', 'By notice', '43'],
    ['The partners all sign a resolution to close the firm', 'By agreement', '40'],
    ['A partner sells his whole share to an outsider; another partner sues', 'By the court', '44'],
  ],
  'Table naming the mode for four situations: a completed venture is a contingency, a written notice in a firm at will is dissolution by notice, a resolution of all partners is dissolution by agreement, and a transfer of a whole interest followed by a suit is dissolution by the court',
);
const vS48 = flow('TB', ['Losses: out of profits, then capital, then partners personally (profit-sharing ratio)', '1. Debts to third parties (outside liabilities)', '2. Partners’ loans (advances), rateably', '3. Partners’ capitals, rateably', '4. Any surplus: profit-sharing ratio'], 'Flow of Section 48: losses are met out of profits, then capital, then by partners personally; the assets then pay outside debts first, partners’ loans second, partners’ capitals third, and any surplus is shared in the profit-sharing ratio', 'Section 48, Indian Partnership Act 1932 (unless the partners agree otherwise)');
const vWaterfall = (() => {
  const s = new Svg(560, 200);
  const X0 = 40;
  const W = 480;
  const segs = [['Creditors', MN.creditors, 'fill', '1st'], ['Meena’s loan', MN.loan, 'accent', '2nd'], ['Meena capital', MNpay.Meena, 'fill', '3rd'], ['Nitin capital', MNpay.Nitin, 'fill', '3rd']];
  check(sum(segs.map(([, v]) => v)) === MN.cash, 'waterfall adds to the cash');
  s.text(X0 + W / 2, 22, `Bank balance after realisation ₹${fig(MN.cash)}`, { size: 14, bold: true });
  s.line(X0, 36, X0 + W, 36, { sw: 1.4 });
  s.line(X0, 32, X0, 40, { sw: 1.4 });
  s.line(X0 + W, 32, X0 + W, 40, { sw: 1.4 });
  let x = X0;
  for (const [label, v, fill, order] of segs) {
    const w = (W * v) / MN.cash;
    s.rect(x, 50, w, 60, { fill, color: 'accent', sw: 1.5, rx: 2 });
    s.text(x + w / 2, 72, label, { size: 12 });
    s.text(x + w / 2, 92, fig(v), { size: 12, bold: true });
    s.text(x + w / 2, 128, order, { size: 12, muted: true });
    x += w;
  }
  check(Math.abs(x - X0 - W) < 1e-9, 'waterfall width');
  s.text(X0 + W / 2, 160, `Loss ₹${fig(MNloss)} shared equally first: capitals ${fig(MN.cap.Meena)} and ${fig(MN.cap.Nitin)} fall to ${fig(MNpay.Meena)} and ${fig(MNpay.Nitin)}`, { size: 12, muted: true });
  return s.visual(
    `One bar for the bank balance of ${fig(MN.cash)}, divided in the order of payment: creditors ${fig(MN.creditors)} first, Meena's loan ${fig(MN.loan)} second, then capitals of Meena ${fig(MNpay.Meena)} and Nitin ${fig(MNpay.Nitin)} after an equal share of the loss of ${fig(MNloss)}`,
    'Bar widths are computed from the amounts; the bank balance is used up exactly.',
  );
})();
const vWE3 = table(
  ['Order', 'Claim', 'Book (₹)', 'Paid (₹)'],
  [
    ['1', 'Creditors', fig(MN.creditors), fig(MN.creditors)],
    ['2', 'Meena’s loan', fig(MN.loan), fig(MN.loan)],
    ['3', 'Meena’s capital (less 1/2 of the loss)', fig(MN.cap.Meena), fig(MNpay.Meena)],
    ['3', 'Nitin’s capital (less 1/2 of the loss)', fig(MN.cap.Nitin), fig(MNpay.Nitin)],
    ['**Total**', '', `**${fig(MNclaims)}**`, `**${fig(MN.cash)}**`],
  ],
  `Table of worked example: claims total ${fig(MNclaims)} against ${fig(MN.cash)} available, a loss of ${fig(MNloss)} shared equally; creditors and Meena's loan are paid in full and the capitals are paid ${fig(MNpay.Meena)} and ${fig(MNpay.Nitin)}`,
  `Loss = ${fig(MNclaims)} − ${fig(MN.cash)} = ${fig(MNloss)}.`,
);
const vRAformat = table(
  ['Debit side (To)', 'Credit side (By)'],
  [
    ['All assets except cash, bank and fictitious assets, at book value (debtors gross)', 'Provisions against assets (doubtful debts, depreciation)'],
    ['Cash paid to settle outside liabilities', 'All outside liabilities at book value'],
    ['Realisation expenses borne by the firm', 'Cash received from assets, including unrecorded ones'],
    ['Liabilities or expenses taken over or paid by a partner', 'Assets taken over by partners at agreed values'],
    ['Balance: profit, to partners’ capitals', 'Balance: loss, to partners’ capitals'],
  ],
  'Format of the Realisation Account: on the debit side, assets at book value, cash paid for liabilities, realisation expenses, items paid or taken over by partners, and any profit; on the credit side, provisions, outside liabilities, cash from assets, assets taken over by partners, and any loss',
);
const vOutside = table(
  ['Item in the balance sheet', 'Where it goes on dissolution'],
  [
    ['Cash and bank balances', 'Stay in the Cash/Bank Account'],
    ['Partner’s loan to the firm', 'Paid from the bank, after outside liabilities'],
    ['Partners’ capitals and current accounts', 'Capital accounts, closed at the end'],
    ['General Reserve; Profit and Loss credit balance', 'Credited to capitals, profit-sharing ratio'],
    ['Profit and Loss debit balance; deferred revenue expenditure', 'Debited to capitals, profit-sharing ratio'],
  ],
  'Table of items that do not pass through the Realisation Account: cash and bank, partners’ loans, capitals and current accounts, reserves and accumulated profits, and accumulated losses or deferred revenue expenditure',
);
const vBS = T({ ...NT.BS, alt: `Balance sheet of Narmada Textiles totalling ${fig(NT.BS.total)}: creditors, bills payable, Bhavesh's loan, general reserve and three capitals on one side; building, machinery, furniture, stock, debtors less provision and bank on the other`, caption: 'Asha, Bhavesh and Charu share profits 3:2:1.' });
const J_TRANSFER = journal(NT.J.entries.slice(0, 2));
const vSummary1 = table(
  ['Idea', 'Remember'],
  [
    ['Partnership vs firm', 'Firm dissolved = business closed; partnership dissolved = agreement changed'],
    ['Modes', 'Agreement (40), compulsory (41), contingencies (42), notice (43), court (44)'],
    ['Section 48', 'Outsiders → partners’ loans → capitals → surplus'],
    ['Realisation Account', 'Nominal account: assets (Dr) and outside liabilities (Cr) at book value'],
    ['Kept out of Realisation', 'Cash/bank, partners’ loans, capitals, reserves, accumulated losses'],
  ],
  'Summary table of Part 1: the difference between dissolving the partnership and the firm, the five modes with their sections, the Section 48 order of payment, the Realisation Account, and the items kept out of it',
);

// ---------------------------------------------------------------- deck 2 visuals
const vRoute2 = flow('LR', ['Sell assets, pay liabilities', 'Takeovers by partners', 'Unrecorded items', 'Expenses', 'Capitals and loans', 'Bank closes at nil'], 'Route map of Part 2: selling assets and paying liabilities, takeovers by partners, unrecorded items, realisation expenses, partners’ capital and loan accounts, and the Bank Account closing at nil', 'Part 2 at a glance');
const vSalePay = table(
  ['Transaction', 'Journal entry'],
  [
    ['Asset sold for cash', 'Bank A/c Dr, To Realisation A/c'],
    ['Outside liability paid (full or at a discount)', 'Realisation A/c Dr, To Bank A/c (amount actually paid)'],
    ['Asset that fetches nothing', 'No entry (its book value stays on the debit side)'],
  ],
  'Table of entries: an asset sold for cash is Bank debit, Realisation credit; a liability paid is Realisation debit, Bank credit for the amount actually paid; a worthless asset needs no entry',
);
const vTakeover = table(
  ['Transaction', 'Journal entry', 'Effect on the partner'],
  [
    ['Partner takes over an asset', 'Partner’s Capital A/c Dr, To Realisation A/c', 'Gets less cash at the end'],
    ['Partner takes over (pays) a liability', 'Realisation A/c Dr, To Partner’s Capital A/c', 'Gets more cash at the end'],
    ['Partner pays expenses for the firm', 'Realisation A/c Dr, To Partner’s Capital A/c', 'Gets more cash at the end'],
  ],
  'Table of partner transactions: taking over an asset debits the partner’s capital and credits Realisation; taking over a liability or paying firm expenses debits Realisation and credits the partner’s capital',
);
const vEvents = table(
  ['What happened at Narmada Textiles', '₹', 'Realisation side'],
  [
    ['Building sold', fig(EV.building), 'Credit'],
    ['Machinery sold', fig(EV.machinery), 'Credit'],
    ['Debtors collected', fig(EV.debtors), 'Credit'],
    ['Old computer, never recorded, sold', fig(EV.computer), 'Credit'],
    ['Furniture taken over by Asha', fig(EV.furniture), 'Credit'],
    ['Stock taken over by Charu', fig(EV.stock), 'Credit'],
    ['Creditors paid in full settlement', fig(EV.creditors), 'Debit'],
    ['Bills payable paid', fig(EV.bp), 'Debit'],
    ['Realisation expenses paid', fig(EV.exp), 'Debit'],
  ],
  'Table of the events on dissolution of Narmada Textiles: building, machinery, debtors and an unrecorded computer realise cash; Asha takes the furniture and Charu the stock; creditors, bills payable and expenses are paid',
);
const vRA = T({ ...NT.RA, alt: `Realisation Account of Narmada Textiles: assets of ${fig(sum([100000, 100000, 30000, 70000, 50000]))} and payments of ${fig(EV.creditors + EV.bp + EV.exp)} on the debit side; provision, liabilities, cash from assets and takeovers on the credit side; profit ${fig(NT.RA.result)} shared ${fig(NT.RA.part.Asha)}, ${fig(NT.RA.part.Bhavesh)} and ${fig(NT.RA.part.Charu)}`, caption: `Profit on realisation ${rs(NT.RA.result)}, shared 3:2:1.` });
const vColumns = (() => {
  const s = new Svg(640, 360);
  const top = 50;
  const H = 260;
  const total = NT.RA.total;
  const dr = [['Assets (book value)', NT.RA.drTotal - (EV.creditors + EV.bp + EV.exp)], ['Paid: liabilities, expenses', EV.creditors + EV.bp + EV.exp], ['Profit (balance)', NT.RA.result]];
  const cr = [['Provision, liabilities', 82000], ['Cash from assets', NT.soldTotal], ['Taken over by partners', EV.furniture + EV.stock]];
  check(sum(dr.map(([, v]) => v)) === total && sum(cr.map(([, v]) => v)) === total, 'realisation columns add to the total');
  const col = (x, rows, labelX, anchor, head) => {
    s.text(x + 50, top - 18, head, { size: 14, bold: true });
    let y = top;
    rows.forEach(([label, v], i) => {
      const h = (H * v) / total;
      s.rect(x, y, 100, h, { fill: i === rows.length - 1 && head === 'Debit' ? 'accent' : 'fill', color: 'accent', sw: 1.5, rx: 2 });
      s.text(labelX, y + h / 2 - 8, label, { size: 12, anchor });
      s.text(labelX, y + h / 2 + 9, fig(v), { size: 12, anchor, bold: true });
      y += h;
    });
    check(Math.abs(y - top - H) < 1e-9, 'column height');
    s.text(x + 50, top + H + 20, `Total ${fig(total)}`, { size: 12, muted: true });
  };
  col(190, dr, 180, 'end', 'Debit');
  col(330, cr, 440, 'start', 'Credit');
  return s.visual(
    `Two columns of equal height for the Realisation Account of Narmada Textiles, each totalling ${fig(total)}. Debit: assets at book value ${fig(dr[0][1])}, liabilities and expenses paid ${fig(dr[1][1])}, and the balancing profit ${fig(NT.RA.result)}. Credit: provision and liabilities ${fig(cr[0][1])}, cash from assets ${fig(cr[1][1])}, assets taken over ${fig(cr[2][1])}`,
    'Column heights are computed from the account; the profit is the balancing figure.',
  );
})();
const vUnrec = table(
  ['Unrecorded item', 'What happens', 'Journal entry'],
  [
    ['Asset', 'Sold for cash', 'Bank A/c Dr, To Realisation A/c'],
    ['Asset', 'Taken over by a partner', 'Partner’s Capital A/c Dr, To Realisation A/c'],
    ['Liability', 'Paid by the firm', 'Realisation A/c Dr, To Bank A/c'],
    ['Liability', 'Paid by a partner', 'Realisation A/c Dr, To Partner’s Capital A/c'],
  ],
  'Table for unrecorded items: an unrecorded asset sold or taken over is credited to Realisation; an unrecorded liability paid by the firm or by a partner is debited to Realisation',
);
const vCredAsset = table(
  ['How the creditor is settled', 'Entry'],
  [
    ['Accepts an asset in full settlement', 'No entry'],
    ['Accepts an asset plus some cash', 'Realisation A/c Dr, To Bank A/c (cash part only)'],
    ['Accepts an asset worth more than the claim and pays the difference', 'Bank A/c Dr, To Realisation A/c (cash received)'],
  ],
  'Table of creditor settlements: accepting an asset in full settlement needs no entry; if cash is also paid, only the cash is recorded with Realisation debited; if the creditor pays the firm a difference, Bank is debited and Realisation credited',
);
const WE7 = { patent: 6000, cred: 15000, bill: 1500 };
const J_WE7 = journal([
  { dr: [['Bank A/c', WE7.patent]], cr: [['Realisation A/c', WE7.patent]], nar: 'unrecorded patent sold' },
  { dr: [['Realisation A/c', WE7.bill]], cr: [['Bank A/c', WE7.bill]], nar: 'unrecorded telephone bill paid' },
]);
const vExpCases = table(
  ['Case', 'Entry'],
  [
    ['Firm bears and firm pays', 'Realisation A/c Dr, To Bank A/c'],
    ['Firm bears, a partner pays', 'Realisation A/c Dr, To Partner’s Capital A/c'],
    ['A partner bears, firm pays', 'Partner’s Capital A/c Dr, To Bank A/c'],
    ['A partner bears and pays himself', 'No entry'],
    ['Partner gets remuneration and bears expenses', 'Realisation A/c Dr, To Partner’s Capital A/c (remuneration); expenses as in rows 3 or 4'],
  ],
  'Table of five cases for realisation expenses: firm bears and pays, Realisation debit Bank credit; firm bears and partner pays, Realisation debit partner credit; partner bears and firm pays, partner debit Bank credit; partner bears and pays, no entry; remuneration is debited to Realisation and credited to the partner',
);
const WE8 = { fee: 5000, spent: 3000 };
const J_WE8 = journal([{ dr: [['Realisation A/c', WE8.fee]], cr: [["Gautam's Capital A/c", WE8.fee]], nar: 'remuneration allowed to Gautam for winding up the firm' }]);
const vClose = flow('TB', ['Opening capitals (and current accounts)', 'Reserves Cr; accumulated losses Dr (profit-sharing ratio)', 'Realisation profit Cr or loss Dr', 'Assets taken over Dr; liabilities and expenses paid by the partner Cr', 'Debit balance: partner brings cash. Credit balance: partner is paid', 'Every capital account closes at nil'], 'Flow for closing a partner’s capital account: opening balance, reserves and accumulated losses, realisation result, takeovers and payments by the partner, then cash brought in for a debit balance or paid out for a credit balance, closing at nil', 'Partners’ loans are paid from the bank before any capital');
const vCA = T({ ...NT.CA, alt: `Partners' capital accounts of Narmada Textiles: Asha is paid ${fig(NT.CA.pay.Asha)}, Bhavesh ${fig(NT.CA.pay.Bhavesh)}, and Charu, whose account shows a debit balance after taking the stock, brings in ${fig(NT.CA.bring.Charu)}`, caption: `General Reserve ${fig(24000)} shared 3:2:1: ${fig(GR.Asha)}, ${fig(GR.Bhavesh)}, ${fig(GR.Charu)}.` });
const vBank = T({ ...NT.BANK, alt: `Bank Account of Narmada Textiles totalling ${fig(NT.BANK.total)} on each side: opening balance, cash from assets and Charu's cash on the debit side; liabilities, expenses, Bhavesh's loan and the final payments to Asha and Bhavesh on the credit side`, caption: 'The Bank Account closes at nil.' });
const vSummary2 = table(
  ['Event', 'Debit', 'Credit'],
  [
    ['Asset sold', 'Bank', 'Realisation'],
    ['Asset taken over by a partner', 'Partner’s Capital', 'Realisation'],
    ['Liability or firm expense paid', 'Realisation', 'Bank'],
    ['Liability taken over / expense paid by a partner', 'Realisation', 'Partner’s Capital'],
    ['Creditor accepts an asset in full settlement', '—', '— (no entry)'],
    ['Partner’s loan repaid', 'Partner’s Loan', 'Bank'],
    ['Debit balance made good', 'Bank', 'Partner’s Capital'],
    ['Final payment', 'Partner’s Capital', 'Bank'],
  ],
  'Summary table of Part 2 entries: asset sold, Bank debit Realisation credit; asset taken over, partner debit Realisation credit; liability or expense paid, Realisation debit Bank credit; liability taken over by a partner, Realisation debit partner credit; creditor accepting an asset, no entry; loan repaid, Loan debit Bank credit; debit balance made good, Bank debit partner credit; final payment, partner debit Bank credit',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Dissolution of a Partnership Firm — Part 1: Meaning, Modes, Section 48 and the Realisation Account',
  goals: [
    'Distinguish dissolution of partnership from dissolution of the firm',
    'Identify the five modes of dissolution under the Indian Partnership Act 1932',
    'Apply the Section 48 order of settlement',
    'Explain what the Realisation Account records and what stays out of it',
  ],
  slides: [
    sl('title', 'Dissolution of a Partnership Firm', {
      b: 'Part 1 — **partnership or firm?**, the **modes** of dissolution, the **Section 48** order and the **Realisation Account**.',
      v: vRoute1,
      n: 'Every firm eventually changes or closes. In this chapter we study the day a firm closes for good. First we separate two ideas that sound alike: dissolving a partnership and dissolving a firm. Then we see the five ways a firm can be dissolved, the legal order in which its money is paid out, and the special account that records the closing: the Realisation Account.',
    }),
    sl('two-column', 'Partnership or firm: what is dissolved?', {
      cols: [
        '**Dissolution of partnership**\n\n- The old agreement ends.\n- The business carries on.\n- Books continue.',
        '**Dissolution of the firm**\n\n- The business is closed.\n- Assets are sold, liabilities paid.\n- Books are closed.',
      ],
      v: vPvF,
      n: 'When a partner joins, retires or dies, or the partners change their ratio, the old agreement ends and a new one begins. That is dissolution of partnership, and the firm carries on. Dissolution of the firm is final: the business stops, the assets are sold, the debts are paid, the partners are settled and the books are closed.',
    }),
    sl('diagram', 'Two different paths', {
      v: vTwoPaths,
      n: 'Picture two separate paths. A change among the partners leads only to a new partnership, and the same firm goes on trading. Closing the business leads to dissolution of the firm, and since every partner’s relationship then ends, the partnership is dissolved as well. So dissolving a firm always dissolves the partnership, but not the other way round.',
    }),
    sl('example', 'Worked example 1: partnership only, or the firm?', {
      b: 'Decide for each imagined situation.',
      v: vWE1,
      n: 'Look at each case and ask one question: does the business go on? When Kiran retires and the others continue, it does, so only the partnership is dissolved. The same is true of a change in ratio and of admitting a new partner. But when all the partners agree to close the shop and sell its stock, the business ends, so the firm itself is dissolved.',
    }),
    sl('check', 'Quick check: partnership or firm?', {
      b: 'Which event leaves the firm alive?',
      chk: 'm_partnership_only',
      n: 'Look for the one event after which the same business keeps trading.',
    }),
    sl('concept', 'The five modes of dissolution', {
      v: vModes,
      n: 'The Indian Partnership Act gives five ways in which a firm may be dissolved. The partners may simply agree. The law may force it. Certain events may end it, unless the partners have agreed otherwise. In a partnership at will, any partner may end it by notice. And finally, a court may order it when a partner files a suit.',
    }),
    sl('two-column', 'Compulsory dissolution and contingencies', {
      cols: ['**Compulsory**\n\n- By law.\n- The partners’ wishes do not matter.', '**Contingencies**\n\n- Term over, venture done, a partner dies.\n- Unless agreed otherwise.'],
      v: vCompCont,
      n: 'Compulsory dissolution happens by force of law. If a new law bans the trade a firm carries on, the firm ends at once, whatever the partners want. Contingencies are different: the firm ends when its fixed term runs out, when the venture it was formed for is complete, or when a partner dies, but only if the partners have not agreed to carry on.',
    }),
    sl('concept', 'Dissolution by notice and by the court', {
      v: vCourt,
      bl: ['**By notice:** only in a partnership at will; written notice to all the other partners.', '**By the court:** only when a partner files a suit and a ground in the Act applies.'],
      n: 'In a partnership at will, any partner can end the firm by giving written notice to all the others. A court, on the other hand, acts only when a partner files a suit. The Act lists grounds such as a partner of unsound mind, permanent incapacity, misconduct, persistent breach of the agreement, transfer of a whole share, a business that can run only at a loss, or any just and equitable reason.',
    }),
    sl('check', 'Quick check: match the modes', {
      b: 'Match each situation with its mode.',
      chk: 'mt_modes',
      n: 'For each situation, ask what ended the firm: consent, the law, a written notice, or a court order.',
    }),
    sl('example', 'Worked example 2: naming the mode', {
      b: 'Name the mode and the section for each imagined firm.',
      v: vWE2,
      n: 'A firm formed only for one trade fair ends when the fair is over: a contingency, section forty-two. A written notice in a firm at will is dissolution by notice, section forty-three. A resolution signed by every partner is dissolution by agreement, section forty. And a partner who sells his whole share to an outsider gives the others a ground to go to court, section forty-four.',
    }),
    sl('concept', 'Settlement of accounts: Section 48', {
      v: vS48,
      n: 'Once the firm is dissolved, who gets paid first? Section forty-eight answers this, unless the partners have agreed otherwise. Losses are met from profits, then from capital, and if needed by the partners personally. The assets then pay outsiders first, partners’ loans next, partners’ capitals after that, and any surplus is shared in the profit-sharing ratio.',
    }),
    sl('diagram', 'Where the money goes', {
      v: vWaterfall,
      n: `Here is an imagined bakery in Shimla owned by Meena and Nitin. After every asset is sold, the bank holds ${rupees(MN.cash)}. The creditors take ${rupees(MN.creditors)} first. Meena's loan of ${rupees(MN.loan)} comes next. Only what is left goes to the capitals, after the loss has been charged to them.`,
    }),
    sl('example', 'Worked example 3: Section 48 at an imagined bakery', {
      b: `Creditors ${rs(MN.creditors)}; Meena's loan ${rs(MN.loan)}; capitals Meena ${rs(MN.cap.Meena)} and Nitin ${rs(MN.cap.Nitin)}; partners share equally; bank after realisation ${rs(MN.cash)}.`,
      v: vWE3,
      n: `The claims add up to ${rupees(MNclaims)}, but only ${rupees(MN.cash)} is available, so the loss is ${rupees(MNloss)}. It is shared equally and taken out of the capitals. Creditors and the loan are paid in full, then Meena receives ${rupees(MNpay.Meena)} and Nitin ${rupees(MNpay.Nitin)}. Every rupee in the bank is used up.`,
    }),
    sl('check', 'Quick check: who comes first?', {
      b: 'Section 48, first claim on the assets.',
      chk: 'm_s48_first',
      n: 'Think about who stands outside the firm and must be protected before the partners get anything.',
    }),
    sl('concept', 'The Realisation Account', {
      v: vRAformat,
      n: 'To close the books we open a Realisation Account. It is a nominal account. Assets other than cash and bank are moved to its debit side at book value, and outside liabilities to its credit side. As assets are sold and liabilities paid, the money is recorded against it. Its balance is the profit or loss on realisation, shared by the partners in their profit-sharing ratio.',
    }),
    sl('concept', 'What stays out of the Realisation Account', {
      v: vOutside,
      n: 'Not everything goes into the Realisation Account. Cash and bank are already money, so they stay in the Cash or Bank Account. A partner’s loan is paid directly from the bank. Reserves and accumulated profits go straight to the capitals, and so do accumulated losses and deferred expenses, in the profit-sharing ratio.',
    }),
    sl('concept', 'Meet Narmada Textiles', {
      b: 'An imagined firm in Jabalpur. **Asha, Bhavesh and Charu** share profits **3:2:1** and dissolve the firm on 31 March 2026. We follow it to the end of Part 2.',
      v: vBS,
      n: `Narmada Textiles is our running example. Its balance sheet shows creditors, bills payable, a loan from Bhavesh, a general reserve and the three capitals. On the assets side are building, machinery, furniture, stock, debtors with a small provision against them, and ${rupees(26000)} at the bank. Both sides total ${rupees(NT.BS.total)}.`,
    }),
    sl('example', 'Worked example 4: the transfer entries', {
      b: 'The first two entries on dissolution move the assets and outside liabilities to the Realisation Account.',
      v: T({ ...J_TRANSFER, alt: `Journal entries for Narmada Textiles: Realisation debited ${fig(J_TRANSFER.entries[0].dr[0][1])} for building, machinery, furniture, stock and debtors; provision, creditors and bills payable debited and Realisation credited ${fig(J_TRANSFER.entries[1].cr[0][1])}` }),
      bl: ['Debtors go at the **gross** figure; the provision is credited separately.', 'Bank, Bhavesh’s loan, the reserve and the capitals are **not** transferred.'],
      n: `Realisation is debited with ${rupees(J_TRANSFER.entries[0].dr[0][1])}, the book value of the five assets, with debtors at their full amount. Then the provision, the creditors and the bills payable are debited and Realisation is credited with ${rupees(J_TRANSFER.entries[1].cr[0][1])}. The bank balance, the loan, the reserve and the capitals stay where they are.`,
    }),
    sl('check', 'Quick check: what kind of account?', {
      b: 'Complete the sentence.',
      chk: 'fb_nominal',
      n: 'The Realisation Account records gains and losses. Which kind of account does that?',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up: dissolving a firm closes the business, while dissolving a partnership only changes the agreement. A firm may be dissolved by agreement, compulsorily, on contingencies, by notice or by the court. Section forty-eight pays outsiders first, then partners’ loans, then capitals. And the Realisation Account collects the assets and outside liabilities so that the result of closing can be found.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'When asked to distinguish, give **three clear bases** in a table.',
        'Name the **section** with each mode: agreement 40, compulsory 41, contingencies 42, notice 43, court 44.',
        'Section 48: **outsiders → partners’ loans → capitals → surplus**.',
        'Transfer **debtors gross** and credit the **provision** separately.',
        'Never transfer **cash, bank, partners’ loans, capitals or reserves** to Realisation.',
      ],
      n: 'A few tips for the board exam. Present distinctions in a table with at least three bases. Mention the section of the Act with each mode. Learn the Section forty-eight order as a chain: outsiders, loans, capitals, surplus. And when you open the Realisation Account, transfer debtors at their full figure and keep cash, loans, capitals and reserves out of it.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Dissolution of a Partnership Firm — Part 2: Realisation, Capital Accounts and the Bank Account',
  goals: [
    'Record the sale of assets and the payment of liabilities',
    'Record assets and liabilities taken over by partners, and unrecorded items',
    'Treat realisation expenses and a partner’s remuneration correctly',
    'Prepare the Realisation Account, partners’ capital and loan accounts and a Bank Account that closes at nil',
  ],
  slides: [
    sl('title', 'Closing the books of a dissolved firm', {
      b: 'Part 2 — **realising assets**, **paying liabilities**, **takeovers**, **unrecorded items**, **expenses**, and the final **capital** and **Bank** accounts.',
      v: vRoute2,
      n: 'In part one we opened the Realisation Account. Now we fill it. We sell assets, pay liabilities and record what partners take over. We deal with items that were never in the books and with the costs of closing. Then we settle each partner and watch the Bank Account close at exactly nil.',
    }),
    sl('concept', 'Selling assets and paying liabilities', {
      v: vSalePay,
      n: 'When an asset is sold, the cash comes into the bank and the Realisation Account is credited. When a liability is paid, Realisation is debited with the amount actually paid, which may be less than the book figure if the creditor allows a discount. An asset that fetches nothing needs no entry: its book value simply stays on the debit side as a loss.',
    }),
    sl('concept', 'Partners who take over assets or liabilities', {
      v: vTakeover,
      n: 'Partners often take assets home instead of cash. Then the partner’s capital is debited and Realisation is credited with the agreed value. If a partner agrees to pay a liability, or pays an expense for the firm, the opposite happens: Realisation is debited and the partner’s capital is credited, because the firm now owes him more.',
    }),
    sl('example', 'Worked example 5: what happened at Narmada Textiles', {
      b: 'Narmada Textiles (from Part 1) on dissolution:',
      v: vEvents,
      n: `At Narmada Textiles the building fetches ${rupees(EV.building)}, machinery ${rupees(EV.machinery)}, debtors ${rupees(EV.debtors)}, and an old computer that was never recorded fetches ${rupees(EV.computer)}. Asha takes the furniture and Charu the stock. Creditors accept ${rupees(EV.creditors)} in full settlement, bills payable are paid in full and expenses come to ${rupees(EV.exp)}.`,
    }),
    sl('example', 'Worked example 6: the Realisation Account', {
      b: 'Every event goes to one side of the Realisation Account.',
      v: vRA,
      n: `Debit the five assets and every payment. Credit the provision, the two liabilities, the cash from assets and the two takeovers. The credit side is larger by ${rupees(NT.RA.result)}, a profit on realisation. Shared three to two to one, Asha gets ${rupees(NT.RA.part.Asha)}, Bhavesh ${rupees(NT.RA.part.Bhavesh)} and Charu ${rupees(NT.RA.part.Charu)}.`,
    }),
    sl('diagram', 'Why the balance is a profit', {
      v: vColumns,
      n: 'Here are the two sides drawn to scale. On the debit side, the assets at book value and the payments. On the credit side, the provision and liabilities, the cash from assets and the takeovers. The credit side would be taller, so a small profit is placed on the debit side to make both columns equal. That balancing figure is the profit on realisation.',
    }),
    sl('check', 'Quick check: a partner takes an asset', {
      b: 'Which entry records it?',
      chk: 'm_takeover_entry',
      n: 'The partner receives something of value instead of money. Which side of his capital account records that?',
    }),
    sl('concept', 'Unrecorded assets and liabilities', {
      v: vUnrec,
      n: 'Sometimes an asset was fully written off, or never recorded, but still has value. When it is sold or taken over, it is a gain, so Realisation is credited. In the same way, a liability that was never recorded, such as an unpaid bill or a claim for damages, is a loss when it is paid, so Realisation is debited.',
    }),
    sl('concept', 'When a creditor accepts an asset', {
      v: vCredAsset,
      n: 'A creditor may agree to take an asset instead of money. Both the asset and the creditor are already in the Realisation Account, so if he accepts it in full settlement, no entry is needed. If he also receives some cash, record only the cash: Realisation is debited and Bank credited with that amount.',
    }),
    sl('example', 'Worked example 7: unrecorded items and a creditor', {
      b: `An imagined firm in Mangaluru: a patent never recorded is sold for ${rs(WE7.patent)}; a creditor for ${rs(WE7.cred)} takes over the computer in full settlement; an unrecorded telephone bill of ${rs(WE7.bill)} is paid.`,
      v: T({ ...J_WE7, alt: `Journal entries: Bank debited and Realisation credited ${fig(WE7.patent)} for the unrecorded patent sold; Realisation debited and Bank credited ${fig(WE7.bill)} for the unrecorded telephone bill paid` }),
      bl: ['The creditor who takes the computer needs **no entry**.'],
      n: `The patent was never in the books, so the ${rupees(WE7.patent)} it fetches is a gain credited to Realisation. The telephone bill was never recorded either; paying ${rupees(WE7.bill)} is a loss debited to Realisation. The creditor who takes the computer needs no entry at all, because both were already transferred.`,
    }),
    sl('check', 'Quick check: a creditor takes a machine', {
      b: 'What entry is needed?',
      chk: 'm_creditor_asset',
      n: 'Both items are already in the Realisation Account. Does any cash move?',
    }),
    sl('concept', 'Realisation expenses: who bears, who pays?', {
      v: vExpCases,
      n: 'Closing a firm costs money. Ask two questions: who bears the cost, and who pays it? If the firm bears it, Realisation is debited, and the credit goes to Bank or to the partner who paid. If a partner must bear it, Realisation is not touched: his capital is debited if the firm pays, and there is no entry if he pays himself.',
    }),
    sl('example', 'Worked example 8: a partner paid to wind up the firm', {
      b: `Gautam is to receive ${rs(WE8.fee)} for winding up an imagined firm in Kanchipuram and is to bear the expenses. He pays the expenses of ${rs(WE8.spent)} himself.`,
      v: T({ ...J_WE8, alt: `Journal entry: Realisation debited and Gautam's capital credited ${fig(WE8.fee)} for remuneration; no entry for the expenses he pays himself` }),
      bl: [`The ${rs(WE8.spent)} Gautam pays himself: **no entry**.`, 'Had the firm paid them: Gautam’s Capital A/c Dr, To Bank A/c.'],
      n: `Gautam's remuneration of ${rupees(WE8.fee)} is the firm's cost, so Realisation is debited and his capital credited. The expenses are his own burden, and he pays them from his pocket, so nothing is recorded. If the firm had paid them for him, his capital would be debited and Bank credited, still without touching Realisation.`,
    }),
    sl('check', 'Quick check: expenses paid by a partner', {
      b: 'The firm bears the cost; Yusuf pays it.',
      chk: 'm_expense_by_partner',
      n: 'The firm bears the cost, but it is Yusuf who pays. Who is debited, and who is now owed money?',
    }),
    sl('concept', 'Closing the partners’ accounts', {
      v: vClose,
      n: 'Each partner’s capital account collects everything. Credit the opening balance and his share of reserves, debit his share of accumulated losses, then add or subtract his share of the realisation result. Debit what he took over, credit what he paid or took on. A debit balance means he brings in cash; a credit balance is paid to him. Partners’ loans are repaid before any capital.',
    }),
    sl('example', 'Worked example 9: capital accounts at Narmada Textiles', {
      b: 'Reserve and realisation profit are shared 3:2:1; Asha and Charu took assets.',
      v: vCA,
      n: `Asha's account has her capital, reserve and profit, less the furniture, so she is paid ${rupees(NT.CA.pay.Asha)}. Bhavesh receives ${rupees(NT.CA.pay.Bhavesh)}. Charu took stock worth ${rupees(EV.stock)}, more than her balance, so her account shows a debit balance and she must bring in ${rupees(NT.CA.bring.Charu)}.`,
    }),
    sl('example', 'Worked example 10: the Bank Account closes at nil', {
      b: 'Receipts on the left, payments on the right, in the Section 48 order.',
      v: vBank,
      n: `The bank starts with ${rupees(26000)}, receives ${rupees(NT.soldTotal)} from assets and ${rupees(NT.CA.bring.Charu)} from Charu. It pays the liabilities and expenses, then Bhavesh's loan of ${rupees(30000)}, then Asha and Bhavesh. Both sides total ${rupees(NT.BANK.total)}, so the account closes at exactly nil. If it does not, look for a missed entry.`,
    }),
    sl('check', 'Quick check: a debit balance', {
      b: 'How much must Rohit bring in?',
      chk: 'n_cash_brought',
      n: 'Add his credits, subtract his debits, and see which side is bigger.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up: assets sold and assets taken over are credited to Realisation; liabilities paid or taken over and firm expenses are debited to it. A creditor who accepts an asset in full needs no entry. The realisation result, reserves and losses go to the capitals. Loans are repaid before capitals, debit balances are made good in cash, and the Bank Account closes at nil.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Prepare **Realisation → Capitals → Bank**, in that order.',
        'Record only the **cash actually paid** to creditors; no entry for an asset handed over in full settlement.',
        'Expenses a **partner must bear** never go to Realisation.',
        'Settle a partner’s **debit balance** before paying the others.',
        'Your Bank Account **must close at nil**: if it does not, look for a missed item.',
      ],
      n: 'Some final advice. Prepare the Realisation Account first, then the capital accounts, then the Bank Account. Record only cash that actually moves. Keep expenses that a partner must bear out of Realisation. Bring in cash for any debit balance before paying the others. And always check that your Bank Account closes at nil; it is your built-in test.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Dissolution of a Partnership Firm — Notes',
  sections: [
    {
      h: '1. Dissolution of partnership and dissolution of the firm',
      t: 1,
      b: '**Dissolution of partnership:** the existing agreement among the partners ends, for example on admission, retirement or death of a partner or a change in the profit-sharing ratio. The firm is **reconstituted** and its business and books carry on.\n\n**Dissolution of the firm:** the business is closed and the relationship among **all** partners ends. Assets are realised, liabilities paid, partners settled and the books closed.\n\nDissolution of a firm always includes dissolution of the partnership; a dissolution of partnership need not end the firm.',
      terms: [
        ['Dissolution of partnership', 'End of the existing agreement among partners while the firm continues in reconstituted form.'],
        ['Dissolution of the firm', 'Closure of the business and end of the relationship among all the partners.'],
        ['Reconstitution', 'Change in the partnership agreement with the business continuing.'],
      ],
      v: vPvF,
      vs: [vTwoPaths],
    },
    {
      h: '2. Modes of dissolution of a firm',
      t: 1,
      b: '| Mode | Section | Key point |\n| --- | --- | --- |\n| By agreement | 40 | Consent of all the partners, or as their contract says |\n| Compulsory | 41 | By law, whatever the partners wish; e.g. the business becomes unlawful |\n| On contingencies | 42 | Unless agreed otherwise: fixed term expires, venture completed, a partner dies |\n| By notice | 43 | Only a partnership at will; written notice to all other partners |\n| By the court | 44 | Only on a partner’s suit, on a ground listed in the Act |\n\n**Grounds for the court:** unsound mind of a partner; permanent incapacity; misconduct harming the business; wilful or persistent breach of the agreement; transfer of a partner’s whole interest to a third party; business possible only at a loss; just and equitable grounds.',
      terms: [
        ['Partnership at will', 'A partnership with no fixed term and no particular venture; any partner may end it by written notice.'],
        ['Compulsory dissolution', 'Dissolution that happens by operation of law, regardless of the partners’ wishes.'],
      ],
      v: vModes,
      vs: [vCompCont, vCourt],
    },
    {
      h: '3. Settlement of accounts: Section 48',
      t: 2,
      b: 'Unless the partners have agreed otherwise:\n\n**Losses** (including a deficiency of capital) are borne in this order: from profits → from capital → by the partners personally in their profit-sharing ratio.\n\n**The firm’s assets** (with any cash the partners bring in) are applied in this order:\n1. Outside liabilities (debts to third parties).\n2. Partners’ loans (advances), rateably.\n3. Partners’ capitals, rateably.\n4. Any residue, in the profit-sharing ratio.\n\n**Worked figure (imagined bakery):** claims ' + `${fig(MNclaims)} − cash ${fig(MN.cash)} = loss ${fig(MNloss)}; capitals fall to ${fig(MNpay.Meena)} and ${fig(MNpay.Nitin)}.`,
      terms: [
        ['Outside liabilities', 'Amounts the firm owes to persons who are not partners: creditors, bills payable, loans from banks and others.'],
        ['Rateably', 'In proportion to the amounts due to each partner.'],
      ],
      v: vS48,
      vs: [vWaterfall, vWE3],
    },
    {
      h: '4. The Realisation Account: transfers',
      t: 2,
      b: '**Nominal account** that records the sale of assets and the payment of liabilities and shows the profit or loss on realisation.\n\n**Transfer entries:**\n- Realisation A/c Dr, To each asset A/c (book value; debtors gross; not cash, bank or fictitious assets).\n- Provisions A/c Dr, each outside liability A/c Dr, To Realisation A/c.\n\n**Not transferred:** cash and bank; partners’ loans; capitals and current accounts; reserves and accumulated profits (credited to capitals); accumulated losses and deferred revenue expenditure (debited to capitals).',
      terms: [
        ['Realisation Account', 'Nominal account prepared on dissolution to find the profit or loss on realising assets and settling liabilities.'],
        ['Fictitious asset', 'A debit balance with no realisable value, such as a Profit and Loss debit balance or advertisement suspense.'],
      ],
      v: vRAformat,
      vs: [vOutside, T({ ...J_TRANSFER, alt: 'Transfer entries for Narmada Textiles: assets to the debit of Realisation; provision and outside liabilities to its credit' })],
    },
    {
      h: '5. Realising assets, paying liabilities, takeovers and unrecorded items',
      t: 2,
      b: '| Event | Entry |\n| --- | --- |\n| Asset sold (recorded or unrecorded) | Bank A/c Dr, To Realisation A/c |\n| Asset taken over by a partner | Partner’s Capital A/c Dr, To Realisation A/c |\n| Liability paid (amount actually paid) | Realisation A/c Dr, To Bank A/c |\n| Liability taken over by a partner | Realisation A/c Dr, To Partner’s Capital A/c |\n| Unrecorded liability paid | Realisation A/c Dr, To Bank A/c |\n| Creditor accepts an asset in full settlement | No entry |\n| Creditor accepts an asset and some cash | Realisation A/c Dr, To Bank A/c (cash only) |\n\nThe profit or loss on realisation = credit total − debit total, shared in the **profit-sharing ratio**.',
      terms: [
        ['Unrecorded asset', 'An asset not shown in the books (for example, fully written off) that still has value on dissolution.'],
        ['Profit on realisation', 'Excess of the credit side of the Realisation Account over its debit side.'],
      ],
      v: vRA,
      vs: [vTakeover, vUnrec, vCredAsset],
    },
    {
      h: '6. Realisation expenses and remuneration to a partner',
      t: 2,
      b: '**Two questions:** who **bears** the expense, and who **pays** it?\n\n- Firm bears, firm pays → Realisation A/c Dr, To Bank A/c.\n- Firm bears, partner pays → Realisation A/c Dr, To Partner’s Capital A/c.\n- Partner bears, firm pays → Partner’s Capital A/c Dr, To Bank A/c.\n- Partner bears, partner pays → no entry.\n\n**Remuneration** to a partner for winding up (with expenses to be borne by him): Realisation A/c Dr, To Partner’s Capital A/c with the **remuneration only**; the expenses follow the partner-bears rows above.',
      terms: [
        ['Realisation expenses', 'Costs of winding up the firm, such as legal fees, advertising the sale and brokerage.'],
        ['Remuneration for dissolution', 'A fixed sum allowed to a partner for carrying out the dissolution; a cost to the firm.'],
      ],
      v: vExpCases,
      vs: [T({ ...J_WE8, alt: 'Journal entry for remuneration allowed to a partner for winding up the firm' })],
    },
    {
      h: '7. Partners’ capital and loan accounts, and the Bank Account',
      t: 2,
      b: '**Capital accounts:** opening balance (and current accounts) → reserves Cr / accumulated losses Dr → realisation profit Cr or loss Dr → assets taken over Dr → liabilities and expenses paid by the partner Cr → close.\n- Debit balance: Bank A/c Dr, To Partner’s Capital A/c (cash brought in).\n- Credit balance: Partner’s Capital A/c Dr, To Bank A/c (final payment).\n\n**Partner’s loan:** Partner’s Loan A/c Dr, To Bank A/c, paid after outside liabilities and before capitals.\n\n**Bank Account:** opening balance + cash from assets + cash brought in = liabilities and expenses paid + loans + capitals. It **closes at nil**.',
      terms: [
        ['Final payment', 'Cash paid to a partner to close his capital account after all adjustments.'],
        ['Cash brought in', 'Cash a partner pays into the firm to make good a debit balance in his capital account.'],
      ],
      v: vCA,
      vs: [vClose, vBank],
    },
  ],
  tips: '**Common mistakes**\n- Transferring **cash, bank, a partner’s loan or reserves** to the Realisation Account.\n- Transferring debtors at the net figure **and** crediting the provision (counting it twice).\n- Recording an entry when a creditor accepts an asset in **full settlement**.\n- Debiting Realisation with expenses that a **partner must bear**.\n- Paying capitals before **partners’ loans**, or paying a partner before another partner’s **debit balance** is made good.\n- A Bank Account that does not close at nil: an item has been missed.\n\n**How marks are usually awarded**\n- 1 mark: correct option or entry.\n- 3 marks: three journal entries, or a distinction on three bases.\n- 4 marks: a Realisation Account, or a set of four entries with step marks.\n- 6 marks: Realisation Account (about 2–3) + capital accounts (about 2) + Bank Account (about 1), or a full set of journal entries.\n\n**Not in the 2026–27 syllabus:** piecemeal distribution of cash, sale of a firm to a company, and insolvency of partners (including its accounting treatment) are excluded from this chapter and are not examined.\n\n**Figures in SOYL practice** are imagined; your board paper will give its own.',
});

// ---------------------------------------------------------------- flashcards
const FC = cards([
  ['**Dissolution of the firm**', 'Business closed; relationship among **all** partners ends; books closed.', 'definition', 1],
  ['**Dissolution of partnership**', 'Agreement among partners ends; the firm **carries on** in reconstituted form.', 'definition', 1],
  ['Does dissolving a firm dissolve the partnership?', '**Always.** The reverse is not true.', 'concept', 1],
  ['Section 40', 'Dissolution **by agreement** (consent of all partners or per contract).', 'fact', 1],
  ['Section 41', '**Compulsory** dissolution, e.g. when the business becomes unlawful.', 'fact', 1],
  ['Section 42', 'Dissolution **on contingencies**: fixed term over, venture completed, death of a partner (unless agreed otherwise).', 'fact', 1],
  ['Section 43', 'Dissolution **by notice**: only in a partnership at will, notice **in writing**.', 'fact', 1],
  ['Section 44', 'Dissolution **by the court** on a partner’s suit.', 'fact', 1],
  ['Two grounds for the court', 'Unsound mind or permanent incapacity of a partner; persistent breach of agreement; business only at a loss (any two).', 'exam-tip', 1],
  ['Section 48: order of payment', '**Outsiders → partners’ loans → capitals → surplus** (profit-sharing ratio).', 'fact', 2],
  ['Section 48: losses', 'From profits, then capital, then partners personally in the profit-sharing ratio.', 'fact', 2],
  ['**Realisation Account**', 'A **nominal** account that finds the profit or loss on closing the firm.', 'definition', 2],
  ['Debtors and provision on dissolution', 'Debtors **gross** to the debit; provision to the **credit** of Realisation.', 'exam-tip', 2],
  ['Partner’s loan on dissolution', 'Not in Realisation; **Loan A/c Dr, To Bank A/c**, after outsiders, before capitals.', 'fact', 2],
  ['General Reserve on dissolution', 'Credited to capitals in the **profit-sharing ratio**.', 'fact', 2],
  ['Profit and Loss debit balance', 'Debited to capitals in the **profit-sharing ratio**.', 'fact', 2],
  ['Asset sold', '**Bank A/c Dr**, To Realisation A/c.', 'fact', 2],
  ['Asset taken over by a partner', '**Partner’s Capital A/c Dr**, To Realisation A/c.', 'fact', 2],
  ['Liability paid', '**Realisation A/c Dr**, To Bank A/c (amount actually paid).', 'fact', 2],
  ['Liability taken over by a partner', '**Realisation A/c Dr**, To Partner’s Capital A/c.', 'fact', 2],
  ['Unrecorded asset sold', 'Bank A/c Dr, To Realisation A/c: a **gain**.', 'concept', 2],
  ['Unrecorded liability paid', 'Realisation A/c Dr, To Bank A/c: a **loss**.', 'concept', 2],
  ['Creditor accepts an asset in full settlement', '**No entry.**', 'exam-tip', 2],
  ['Creditor accepts an asset plus cash', 'Record **only the cash**: Realisation A/c Dr, To Bank A/c.', 'concept', 2],
  ['Expenses: firm bears, partner pays', 'Realisation A/c Dr, To **Partner’s Capital A/c**.', 'fact', 2],
  ['Expenses: partner bears, firm pays', '**Partner’s Capital A/c Dr**, To Bank A/c (Realisation untouched).', 'fact', 2],
  ['Remuneration to a partner for dissolution', 'Realisation A/c Dr, To Partner’s Capital A/c (**remuneration only**).', 'fact', 2],
  ['Debit balance in a partner’s capital', 'He **brings in cash**: Bank A/c Dr, To Partner’s Capital A/c.', 'concept', 2],
  ['Final payment to a partner', 'Partner’s Capital A/c Dr, To **Bank A/c**.', 'fact', 2],
  ['Built-in check on dissolution', 'The **Bank (Cash) Account closes at nil**.', 'exam-tip', 2],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-12-accountancy-chapter-test-short',
  title: 'Chapter test (short) — Dissolution of a Partnership Firm',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_firm_meaning', 'm_loan_order', 'm_calc_profit', 'ar_provision'] },
    { id: 'B', title: 'Section B — Short answer (3 marks each)', instr: 'Show all working.', items: ['s3_partnership_vs_firm', 's3_takeover_entries'] },
    { id: 'C', title: 'Section C — Long answer (4 marks)', instr: 'Answer any ONE of the two questions. Show all working.', items: [{ attempt: 1, keys: ['l4_realisation', 'l4_modes'] }] },
    { id: 'D', title: 'Section D — Long answer (6 marks)', instr: 'Answer any ONE of the two questions. Show all working.', items: [{ attempt: 1, keys: ['l6_tapti', 'l6_konark'] }] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-12-accountancy-chapter-test-long',
  title: 'Chapter test (long) — Dissolution of a Partnership Firm',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–8 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_compulsory_illegal', 'm_contingency_term', 'm_provision_ra', 'm_assumed_liab', 'm_cash_brought', 'm_calc_remuneration', 'ar_firm_partnership', 'ar_loan'] },
    { id: 'B', title: 'Section B — Short answer (3 marks each)', instr: 'Answer all questions; question 12 has an internal choice. Show all working.', items: ['s3_order_s48', 's3_creditor_settle', 's3_expense_remun', { attempt: 1, keys: ['s3_court_grounds', 's3_bank_close'] }] },
    { id: 'C', title: 'Section C — Long answer (4 marks each)', instr: 'Answer question 13, and any ONE of questions 14 and 15.', items: ['l4_s48', { attempt: 1, keys: ['l4_journal_mixed', 'l4_capital_bank'] }] },
    { id: 'D', title: 'Section D — Long answer (6 marks each)', instr: 'Answer question 16, and any ONE of questions 17 and 18.', items: ['l6_chilika', { attempt: 1, keys: ['l6_sahyadri', 'l6_malwa'] }] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: FC,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t02 of cbse-12-accountancy-ch05 only (dissolution of partnership vs the firm and the modes of dissolution; settlement under Section 48, the Realisation Account, partners’ capital and loan accounts and the Bank/Cash Account); piecemeal distribution, sale to a company and insolvency of partners excluded (2026-27), named once in the notes as not in the syllabus',
    originality: 'every firm, partner, scenario and figure written for this chapter (imagined firms in Indian towns); no NCERT illustration or exercise and no CBSE sample or past-paper item reused',
    accounts: `every figure computed by acc.mjs and asserted: journal entries balance; every Realisation, capital, loan and Bank/Cash account balances; opening balance sheets total; every asset disposed of and every outside liability settled; every capital account and every Bank/Cash Account closes at nil (Narmada Textiles ${fig(NT.BS.total)} balance sheet, profit ${fig(NT.RA.result)}, bank ${fig(NT.BANK.total)}; ${FACTS.join('; ')})`,
    facts: 'Indian Partnership Act 1932: Sections 40 (agreement), 41 (compulsory), 42 (contingencies), 43 (notice, partnership at will), 44 (court), 48 (mode of settlement)',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
