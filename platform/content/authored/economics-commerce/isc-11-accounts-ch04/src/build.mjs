// Build ISC 11 Accounts ch04 Ledger. Run from platform/:
//   npx tsx content/authored/economics-commerce/isc-11-accounts-ch04/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build } from './lib.mjs';
import { nearDuplicates } from '../../../../../content-pipeline/src/originality/ngrams.ts';
import { words, rupees } from './acc.mjs';
import { check, same, inr, rs, jrnl, journal, showL, postD, postedOnly, openingsFrom, PC, PC_FOLIO, PC_OPENING, PC_TXN, PC_LED, PC_ALL, PC_CLOSE, PC_ADJ, PC_DEP, HC, HC_ADJ, HC_EFFECT, FIN } from './fig.mjs';

setUnit('isc-11-accounts-ch04', 'economics-commerce');
const { BANK } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OPT = { close: FIN.close, open: FIN.next, openingDate: FIN.open };
const has = (l, text) => l.rows.some((r) => r.some((c) => c.includes(text)));
const tb = (l, alt, caption, opt = OPT) => {
  const s = showL(l, opt);
  return table(s.headers, s.rows, alt, caption);
};

// ================================================================ computed figures (never typed twice)
const cash = PC_LED['Cash A/c'];
const venkat = PC_LED['Venkat Fibre Co. A/c'];
const ismail = PC_LED['Ismail and Sons A/c'];
same(cash.balance, 125000, 'cash balance');
same(venkat.balance, -85000, 'Venkat balance');
same(ismail.balance, 50000, 'Ismail balance');
check(has(PC_LED['Sales A/c'], 'By Cash A/c'), 'cash sale posting on Sales');
check(has(PC_LED['Wages A/c'], 'To Cash A/c'), 'wages posting wording');
check(has(cash, 'By Sundries'), 'compound credit on cash');
check(has(PC_LED['Furniture A/c'], 'To Sundries'), 'compound debit on furniture');
check(PC_CLOSE.entries.length === 14, 'closing entry count');
const cashClose = cash.rows[cash.rows.length - 1];
void cashClose;

// running balance form for Ismail and Sons
let rb = 0;
const rbRows = [];
const rstep = (d, p, dr, cr) => {
  rb += dr - cr;
  rbRows.push([d, p, dr ? inr(dr) : '', cr ? inr(cr) : '', `${inr(rb)} Dr`]);
};
rstep('22 Jun', 'To Sales A/c', PC.creditSale, 0);
rstep('12 Aug', 'By Cash A/c', 0, PC.recdIsmail);
rstep('15 Feb', 'By Sales Return A/c', 0, PC.salesRet);
same(rb, ismail.balance, 'running balance agrees with the T-form balance');

// first entries posted to Cash A/c
const cash3 = postD(PC_TXN.slice(0, 3), { openings: openingsFrom(PC_OPENING) })['Cash A/c'];
same(cash3.balance, PC.open.cash + PC.cashSales - PC.paidVenkat, 'cash after three entries');
const cashPosted = postedOnly(cash3);

// ================================================================ visuals: deck 1
const vRoute1 = flow('LR', ['Transaction', 'Journal entry', 'Posting', 'Ledger account', 'Balance'], 'Route map of Part 1: a transaction is recorded in the journal, posted to the ledger accounts and then each account is balanced', 'Part 1 at a glance');
const vJvsL = table(
  ['Basis', 'Journal', 'Ledger'],
  [
    ['Stage', 'First book: transactions are entered here first', 'Second book: written up from the journal'],
    ['Order', 'Date order', 'Account by account'],
    ['Entry', 'Both accounts of a transaction together, with narration', 'The effect on one account at a time, no narration'],
    ['Folio column', 'Ledger folio (L.F.): page of the account in the ledger', 'Journal folio (J.F.): page of the journal'],
    ['Result', 'Records every transaction', 'Shows the balance of every account'],
  ],
  'Table comparing the journal and the ledger on stage, order, entry, folio column and result',
);
const vFormat = table(
  ['Date', 'Particulars', 'J.F.', '₹', 'Date', 'Particulars', 'J.F.', '₹'],
  [
    ['1 Apr 2027', 'To Balance b/d', '1', inr(PC.open.cash), '15 May', 'By Venkat Fibre Co. A/c', '1', inr(PC.paidVenkat)],
    ['9 Apr', 'To Sales A/c', '1', inr(PC.cashSales), '30 Jun', 'By Sundries', '1', inr(PC.wages + PC.rent)],
  ],
  'Two sided ledger account of Parvati Coir Works, an imagined firm: the debit side with date, particulars, journal folio and amount on the left and the same four columns for the credit side on the right, with To on the debit side and By on the credit side',
  'Cash A/c of an imagined firm in T-form (first lines only)',
);
const vRunning = table(['Date', 'Particulars', 'Dr (₹)', 'Cr (₹)', 'Balance (₹)'], rbRows,
  `Running balance form of the account of Ismail and Sons: a sale of ${words(PC.creditSale)} rupees, a receipt and a return, with the balance worked out after every line, ending at ${words(rb)} rupees debit`,
  'Ismail and Sons A/c in running balance form');
const jFolio = jrnl([PC_OPENING, PC_TXN[0], PC_TXN[1]], PC_FOLIO);
const vJournalLF = table(jFolio.headers, jFolio.rows,
  'Journal of Parvati Coir Works with a ledger folio column: the opening entry, a credit purchase and a cash sale, each account carrying the page number of its ledger account',
  'The L.F. column is filled after posting');
const vPostRule = table(
  ['Journal entry', 'Account', 'Side', 'Particulars written in its ledger account'],
  [
    ['Cash A/c Dr to Sales A/c (9 Apr)', 'Cash A/c', 'Debit', 'To Sales A/c'],
    ['', 'Sales A/c', 'Credit', 'By Cash A/c'],
    ['Wages A/c Dr and Rent A/c Dr to Cash A/c (30 Jun)', 'Wages A/c and Rent A/c', 'Debit', 'To Cash A/c'],
    ['', 'Cash A/c', 'Credit', 'By Sundries'],
    ['Furniture A/c Dr to Cash A/c and Venkat Fibre Co. A/c (3 Oct)', 'Furniture A/c', 'Debit', 'To Sundries'],
    ['', 'Cash A/c and Venkat Fibre Co. A/c', 'Credit', 'By Furniture A/c'],
  ],
  'Table of the rule of posting: the debited account carries To and the name of the other account, the credited account carries By and the name of the other account, and Sundries is written when two or more accounts stand on the other side',
);
const jOpen = jrnl([PC_OPENING], PC_FOLIO);
const vOpening = table(jOpen.headers, jOpen.rows,
  `Opening entry of Parvati Coir Works dated 1 April 2027: cash, stock and machinery debited, Venkat Fibre Co. and capital of ${words(PC.cap)} rupees credited`,
  'Capital is the balancing figure of the opening entry');
const vCashPosted = table(cashPosted.headers, cashPosted.rows,
  `Cash A/c of Parvati Coir Works after posting three entries: the opening balance of ${words(PC.open.cash)} rupees and a cash sale on the debit side, a payment to Venkat Fibre Co. on the credit side`,
  'Posted, not yet balanced');
const jCompound = jrnl([PC_TXN[4], PC_TXN[7]], PC_FOLIO);
const vCompound = table(jCompound.headers, jCompound.rows,
  'Two compound journal entries of Parvati Coir Works: wages and rent paid together in cash, and furniture bought partly for cash and partly on credit from Venkat Fibre Co.',
  'Each compound entry is posted to every account it names');
const vVenkatPosted = (() => {
  const p = postedOnly(venkat);
  return table(p.headers, p.rows, 'Account of Venkat Fibre Co. in the ledger of Parvati Coir Works before balancing: the opening balance, a credit purchase and the balance of the furniture on the credit side, a payment and a return on the debit side', 'Personal account: posted, not yet balanced');
})();
const vSteps = flow('LR', ['Total both sides', 'Find the difference', 'Write it on the smaller side as balance c/d', 'Write the equal total on both sides', 'Bring it down below as balance b/d'], 'Five steps of balancing a ledger account: total each side, find the difference, write it as balance carried down on the smaller side, write the equal total on both sides and bring the balance down on the opposite side', 'Balancing a real or personal account');
const vCashBal = tb(PC_LED['Cash A/c'],
  `Cash A/c of Parvati Coir Works balanced on 31 March 2028: both sides total the same, with a balance carried down on the credit side and brought down on the debit side as ${words(cash.balance)} rupees`,
  'Debit balance of cash carried down and brought down');
const vVenkatBal = tb(PC_LED['Venkat Fibre Co. A/c'],
  `Account of Venkat Fibre Co. balanced on 31 March 2028: a credit balance of ${words(-venkat.balance)} rupees is carried down on the debit side and brought down on the credit side`,
  'Credit balance of a supplier');
const nat = (l) => `${inr(Math.abs(l.balance))} ${l.balance > 0 ? 'Debit' : 'Credit'}`;
const vReading = table(
  ['Account', 'Closing balance (₹)', 'Nature', 'What it tells'],
  [
    ['Cash A/c', nat(cash), 'Asset', 'Cash in hand'],
    ['Ismail and Sons A/c', nat(ismail), 'Asset (debtor)', 'Amount to be received from the customer'],
    ['Venkat Fibre Co. A/c', nat(venkat), 'Liability (creditor)', 'Amount still to be paid to the supplier'],
    ['Capital A/c', nat(PC_LED['Capital A/c']), 'Owner\'s claim', 'Amount owed by the firm to the proprietor'],
  ],
  'Table reading the closing balances of Parvati Coir Works: cash and the customer have debit balances and are assets, the supplier and the capital have credit balances',
);
const vErrors = table(
  ['Slip', 'Why it is wrong', 'Correct practice'],
  [
    ['Naming the account itself in its own account', 'The account is already the heading of the page', 'Name the other account of the entry'],
    ['Writing To on the credit side', 'To belongs to the debit side', 'To on the debit side, By on the credit side'],
    ['Writing the balance c/d on the larger side', 'The totals would still differ', 'Put it on the smaller side'],
    ['Carrying down a nominal account', 'An expense or income of one year has no use next year', 'Close it by transfer instead'],
    ['Forgetting the opening balance', 'The old balance is part of the account', 'Bring it in as balance b/d first'],
  ],
  'Table of five common slips when posting and balancing ledger accounts, why each is wrong and the correct practice',
);

// ================================================================ visuals: deck 2
const vRoute2 = flow('LR', ['Adjusting entries', 'Closing entries', 'Trading Account', 'Profit and Loss Account', 'Capital Account'], 'Route map of Part 2: adjusting entries bring accruals into the books, closing entries move the nominal accounts to the Trading and Profit and Loss Accounts and the profit goes to the Capital Account', 'Part 2 at a glance');
const vRealNominal = table(
  ['', 'Real and personal accounts', 'Nominal accounts'],
  [
    ['Examples', 'Cash, machinery, debtors, creditors, capital', 'Purchases, sales, wages, rent, interest received'],
    ['What they record', 'Things owned, owed or due', 'Expenses, losses, incomes and gains of one period'],
    ['At the end of the period', 'Balanced: balance c/d, then balance b/d', 'Closed by transfer to the Trading or Profit and Loss Account'],
    ['Next period', 'Opens with the balance b/d', 'Opens empty'],
  ],
  'Table contrasting real and personal accounts, which are balanced and carried down, with nominal accounts, which are closed by transfer and open empty in the next period',
);
const vWhich = table(
  ['Account', 'Normal balance', 'Closing entry', 'Closed to'],
  [
    ['Opening stock, purchases, sales return', 'Debit', 'Trading A/c Dr, to the account', 'Trading A/c'],
    ['Wages, carriage inwards (direct expenses)', 'Debit', 'Trading A/c Dr, to the account', 'Trading A/c'],
    ['Sales, purchases return', 'Credit', 'The account Dr, to Trading A/c', 'Trading A/c'],
    ['Closing stock', 'Debit (adjusting entry)', 'Closing Stock A/c Dr, to Trading A/c', 'Trading A/c'],
    ['Rent, salaries, depreciation (indirect expenses)', 'Debit', 'Profit and Loss A/c Dr, to the account', 'Profit and Loss A/c'],
    ['Interest received, commission received (incomes)', 'Credit', 'The account Dr, to Profit and Loss A/c', 'Profit and Loss A/c'],
  ],
  'Table showing where each nominal account is closed: stock, purchases, sales returns and direct expenses are debited to the Trading Account; sales, purchases returns and closing stock are credited to it; indirect expenses are debited and incomes credited to the Profit and Loss Account',
);
const E = PC_CLOSE.entries;
const jStock = journal([E[0], E[1], E[2], E[5], E[6]]);
const vStockClose = table(jStock.headers, jStock.rows, `Closing entries of Parvati Coir Works for opening stock, purchases, sales return, sales and purchases return, each carrying the date 31 March 2028 and a narration`, 'Closing journal entries for the trading items');
const jExp = journal([E[3], E[4], E[9], E[10], E[11]]);
const vExpClose = table(jExp.headers, jExp.rows, 'Closing entries for wages and carriage inwards, which go to the Trading Account, and for rent, depreciation and interest received, which go to the Profit and Loss Account', 'Direct and indirect expenses and incomes');
const trL = PC_ALL['Trading A/c'];
const plL = PC_ALL['Profit and Loss A/c'];
same(PC_CLOSE.gp, 165000, 'gp');
same(PC_CLOSE.np, 125000, 'np');
const vTrading = table(trL.headers, trL.rows, `Trading Account of Parvati Coir Works in ledger form after the closing entries: opening stock, purchases, sales return, wages and carriage inwards on the debit side, sales, purchases return and closing stock on the credit side, and a gross profit of ${words(PC_CLOSE.gp)} rupees transferred`, 'Trading A/c after the closing entries');
const vPL = table(plL.headers, plL.rows, `Profit and Loss Account of Parvati Coir Works after the closing entries: rent and depreciation on the debit side, gross profit and interest received on the credit side, and a net profit of ${words(PC_CLOSE.np)} rupees transferred to capital`, 'Profit and Loss A/c after the closing entries');
const vWages = tb(PC_ALL['Wages A/c'], 'Wages A/c of Parvati Coir Works: wages paid in cash, wages due added by the adjusting entry, and the full amount transferred to the Trading Account so that the account has no balance', 'A nominal account closes with no balance');
const jPro = journal([E[8], E[12], E[13]]);
const vProfitEntries = table(jPro.headers, jPro.rows, 'Closing entries for the gross profit, the net profit and the drawings of Parvati Coir Works, ending with the transfer to the Capital Account', 'Profit and drawings move to capital');
const vCapital = tb(PC_ALL['Capital A/c'], `Capital A/c of Parvati Coir Works after the closing entries: opening capital and net profit on the credit side, drawings on the debit side, and a closing balance of ${words(-PC_ALL['Capital A/c'].balance)} rupees carried down and brought down`, 'Capital A/c at the end of the year');
same(-PC_ALL['Capital A/c'].balance, 549000, 'closing capital');
const vAdjEffect = table(
  ['Item', 'Nature', 'As recorded (₹)', 'Adjustment (₹)', 'Charged or credited for the year (₹)', 'Other end of the entry'],
  HC_EFFECT,
  'Table of four adjustments in the books of Hosur Candle Works: salaries due are added, insurance paid in advance is deducted, commission earned but not received is added and rent received in advance is deducted, each with the asset or liability that results',
  'Hosur Candle Works, an imagined firm: year ended 31 March 2028',
);
const jClStock = journal([HC_ADJ[0]]);
const vClStock = table(jClStock.headers, jClStock.rows.concat([['', '**Where it appears**', '', ''], ['', 'Trading A/c', '', 'Credit side'], ['', 'Balance sheet', '', 'Current asset']]),
  `Entry bringing the closing stock of ${words(HC.stock)} rupees into the books, with the two places where it appears: the credit side of the Trading Account and the assets in the balance sheet`, 'Closing stock entry');
const jAdj = journal(HC_ADJ.slice(1, 5));
const vAdjJournal = table(jAdj.headers, jAdj.rows, 'Four adjusting entries of Hosur Candle Works: outstanding salaries, prepaid insurance, accrued commission and rent received in advance, each with its narration', 'Adjusting entries at 31 March 2028');
const vAdjRule = table(
  ['Adjustment', 'Entry', 'Effect on profit', 'Balance sheet'],
  [
    ['Outstanding expense', 'Expense A/c Dr to Outstanding Expense A/c', 'Lower', 'Liability'],
    ['Prepaid expense', 'Prepaid Expense A/c Dr to Expense A/c', 'Higher', 'Asset'],
    ['Accrued income', 'Accrued Income A/c Dr to Income A/c', 'Higher', 'Asset'],
    ['Income received in advance', 'Income A/c Dr to Income Received in Advance A/c', 'Lower', 'Liability'],
    ['Depreciation', 'Depreciation A/c Dr to Asset A/c', 'Lower', 'Asset reduced'],
  ],
  'Table of the five adjusting entries with the effect of each on profit and where it appears in the balance sheet: outstanding expense is a liability and lowers profit, prepaid expense is an asset and raises profit, accrued income is an asset and raises profit, income received in advance is a liability and lowers profit, depreciation lowers profit and reduces the asset',
);
const vRent = tb(PC_ALL['Rent A/c'], `Rent A/c of Parvati Coir Works: ${words(PC.rent)} rupees paid on the debit side, ${words(PC.rentPrepaid)} rupees prepaid carried to Prepaid Rent A/c and the rest transferred to the Profit and Loss Account`, 'Prepaid rent leaves the expense');
same(PC_ALL['Prepaid Rent A/c'].balance, PC.rentPrepaid, 'prepaid rent balance');
const vMach = tb(PC_ALL['Machinery A/c'], `Machinery A/c of Parvati Coir Works: opening balance of ${words(PC.open.mach)} rupees, depreciation of ${words(PC_DEP)} rupees credited, and ${words(PC_ALL['Machinery A/c'].balance)} rupees carried down`, 'Depreciation reduces the asset');

// ================================================================ summary / exam visuals
const vSummary1 = table(
  ['Topic', 'Remember'],
  [
    ['Ledger', 'Principal book; one account for each head; written up from the journal'],
    ['Posting', 'Debit side: To the other account. Credit side: By the other account. Sundries for several'],
    ['Folios', 'L.F. in the journal; J.F. in the ledger; both filled after posting'],
    ['Opening balances', 'Opening entry; each balance comes in as b/d on its own side'],
    ['Balancing', 'Difference on the smaller side as c/d; equal totals; b/d on the opposite side below'],
    ['Reading', 'Debit balance: asset or amount due from a person. Credit balance: liability or capital'],
  ],
  'Summary table of Part 1: the ledger, the rule of posting, folios, opening balances, balancing and reading balances',
);
const vSummary2 = table(
  ['Topic', 'Remember'],
  [
    ['Nominal accounts', 'Closed by transfer; no balance c/d; open empty'],
    ['To Trading A/c', 'Opening stock, purchases, sales returns, direct expenses (debits); sales, purchases returns, closing stock (credits)'],
    ['To Profit and Loss A/c', 'Indirect expenses (debits); incomes (credits); gross profit or loss comes from Trading'],
    ['Profit and drawings', 'Net profit to Capital A/c; drawings to Capital A/c'],
    ['Adjusting entries', 'Outstanding and prepaid expenses, accrued and advance income, closing stock, depreciation'],
  ],
  'Summary table of Part 2: nominal accounts, what goes to the Trading Account, what goes to the Profit and Loss Account, profit and drawings, and adjusting entries',
);

// ================================================================ decks
const deck1 = deck({
  part: 1,
  title: 'Ledger — Part 1: Posting from the Journal, Balancing and Reading Balances',
  goals: [
    'State the meaning, importance and format of the ledger, including the running balance form, and the use of the ledger folio and the journal folio',
    'Post journal entries, simple, compound and opening entries, to ledger accounts using To and By and naming the other account',
    'Balance real and personal accounts with balance c/d and balance b/d and read a debit or credit balance correctly',
  ],
  slides: [
    sl('title', 'Ledger: posting and balancing', {
      b: 'Part 1 — what the **ledger** is, its **format and folios**, **posting** from the journal, and **balancing** real and personal accounts.',
      v: vRoute1,
      n: 'Welcome to the chapter on the ledger. The journal records each transaction in date order, but a trader also wants to know how much cash is in hand, how much a customer owes and how much a supplier is owed. The ledger gives every item an account of its own. In this part we post, balance and read accounts, using an imagined coir works.',
    }),
    sl('concept', 'The ledger: meaning and importance', {
      bl: [
        'The **ledger** is the principal book of accounts: it has a separate account for each person, asset, liability, expense and income.',
        'It is written up from the **journal**, so it is a book of secondary entry.',
        'It brings together everything about one account, so its **balance** is found at once.',
      ],
      v: vJvsL,
      n: 'The ledger is the principal book of accounts. After a transaction is recorded in the journal, its effect is carried to the ledger account of each item involved. The journal shows what happened in date order. The ledger shows, account by account, where the firm stands. That is why the balance of cash, of a debtor or of a creditor is read from the ledger and not from the journal.',
    }),
    sl('concept', 'Format of a ledger account', {
      b: 'In the **T-form** the page has two sides. The left is the **debit** side and the right is the **credit** side. Each side has date, particulars, journal folio and amount.',
      v: vFormat,
      n: 'A ledger account is drawn as a letter T. The left side is the debit side and the right side is the credit side. Each side has four columns: date, particulars, journal folio and amount. The name of the account is written at the top. On the debit side every particular begins with the word To and on the credit side with the word By.',
    }),
    sl('concept', 'The running balance form', {
      b: 'Customer and supplier accounts are often kept in a form with a **balance column** worked out after every entry. It gives the balance at any moment but is not a T-form.',
      v: vRunning,
      n: 'Besides the T-form there is the running balance form. It has columns for date, particulars, folio, debit, credit and a balance that is worked out after every single entry. Banks and big firms use it for customer accounts because the balance is always visible. In this chapter, however, our main format is the two sided T-form, which is balanced only at the end of the period.',
    }),
    sl('concept', 'Folios: the link between journal and ledger', {
      bl: [
        'The **ledger folio** (L.F.) in the journal gives the page of the account in the ledger. It is written **after posting**.',
        'The **journal folio** (J.F.) in the ledger gives the page of the journal from which the item was posted.',
      ],
      v: vJournalLF,
      n: 'Two folio columns tie the books together. In the journal, the ledger folio column carries the page of each account in the ledger, filled in once the entry has been posted. In the ledger, the journal folio column carries the journal page from which the item came. With the two, any entry can be traced from either book to the other.',
    }),
    sl('concept', 'The rule of posting: To and By', {
      bl: [
        'Post each **debit** to the debit side of its account, writing **To** and the **other account**.',
        'Post each **credit** to the credit side, writing **By** and the **other account**.',
        'When two or more accounts stand on the other side, write **Sundries**.',
      ],
      v: vPostRule,
      n: 'Posting follows one rule. Take the account debited in the entry, go to its page and write the amount on the debit side, with the word To and the name of the other account of the entry. For the account credited, write the amount on the credit side with the word By and the name of the other account. If the other side has more than one account, write Sundries.',
    }),
    sl('concept', 'The opening entry and opening balances', {
      b: 'At the start of the new books an **opening entry** debits every asset and credits every liability and the **capital**, which is the balancing figure. Each balance then opens its ledger account as **balance b/d**.',
      v: vOpening,
      n: 'New books begin with an opening entry. Every asset is debited. Every liability is credited. Capital is the difference between the assets and the liabilities, so it is credited with the balancing figure. When the opening entry is posted, each account starts with its old balance, shown as balance brought down, on the debit side for an asset and on the credit side for a liability or capital.',
    }),
    sl('example', 'Worked example 1: posting simple entries to the cash account', {
      b: `**Parvati Coir Works**, an imagined firm in Kerala, starts on 1 April 2027 with cash ${rs(PC.open.cash)}. It sells goods for cash for ${rs(PC.cashSales)} on 9 April and pays ${rs(PC.paidVenkat)} to Venkat Fibre Co. on 15 May. Post these to the Cash A/c.`,
      bl: ['The opening balance is a debit: **To Balance b/d**.', 'The cash sale is a debit; the other account is **Sales**.', 'The payment is a credit; the other account is **Venkat Fibre Co.**.'],
      v: vCashPosted,
      n: `The cash account opens with the balance brought down, ${rupees(PC.open.cash)}, on the debit side. The cash sale of ${rupees(PC.cashSales)} is a debit, written To Sales. The payment of ${rupees(PC.paidVenkat)} to the supplier is a credit, written By Venkat Fibre Co. Cash is not balanced yet, because the period is still running.`,
    }),
    sl('check', 'Quick check: reading a posting', {
      b: 'Apply the rule of posting to an expense paid in cash.',
      chk: 'm_chk_posting',
      n: 'Decide which account is debited, then recall which word is written on that side and which account is named.',
    }),
    sl('concept', 'Compound entries and Sundries', {
      b: 'A **compound entry** has more than two accounts. Each account is still posted on its own side, and the account whose side has several accounts opposite it shows **Sundries**.',
      v: vCompound,
      n: `The wages and rent entry debits two accounts and credits cash once. Wages and rent each show To Cash, but cash shows By Sundries for the total of ${rupees(PC.wages + PC.rent)}. The furniture entry credits two accounts, so furniture shows To Sundries, while cash and the supplier each show By Furniture.`,
    }),
    sl('example', 'Worked example 2: a supplier\'s account before balancing', {
      b: `Venkat Fibre Co. is owed ${rs(PC.open.venkat)} on 1 April 2027. The firm buys goods on credit for ${rs(PC.purchases)}, pays ${rs(PC.paidVenkat)}, buys furniture partly on credit and returns goods worth ${rs(PC.purchRet)}. Post to the account.`,
      bl: ['The opening balance of a creditor is on the **credit** side.', 'Payments and returns are on the **debit** side.', 'Credit purchases and the credit part of the furniture are on the **credit** side.'],
      v: vVenkatPosted,
      n: `The supplier is owed ${rupees(PC.open.venkat)} at the start, so the account opens on the credit side. Goods bought on credit are credited. The payment of ${rupees(PC.paidVenkat)} and the goods returned are debits, because they reduce what the firm owes. The furniture bought on credit adds the unpaid part to the credit side.`,
    }),
    sl('check', 'Quick check: the two folios', {
      b: 'Which folio goes in which book?',
      chk: 'fb_chk_folio',
      n: 'Recall where each folio is written and what it points to.',
    }),
    sl('concept', 'Balancing a real or personal account', {
      b: 'At the end of the period, real and personal accounts are **balanced**. The balance is carried to the next period.',
      v: vSteps,
      n: 'To balance an account, total each side, then find the difference. Write the difference on the smaller side as balance carried down, so that both sides total the same. Write that total on both sides on the same line. Then bring the balance down below the totals on the opposite side as balance brought down, which opens the next period.',
    }),
    sl('example', 'Worked example 3: balancing the cash account', {
      b: `Balance the Cash A/c of Parvati Coir Works for the year ended 31 March 2028. The debit side is the opening cash, the cash sales, the sum received from Ismail and Sons and the interest; the credit side holds every payment.`,
      bl: [`Debit side total before balancing is larger, so there is a **debit balance** of ${rs(cash.balance)}.`, 'It is written **By Balance c/d** on the smaller side and brought down as **To Balance b/d** on 1 April 2028.'],
      v: vCashBal,
      n: `After all postings the debit side is larger. The difference of ${rupees(cash.balance)} is written on the credit side as balance carried down. Both sides then total ${rupees(cash.total)}. On the first of April the balance is brought down on the debit side, so cash in hand is ${rupees(cash.balance)}.`,
    }),
    sl('concept', 'Reading debit and credit balances', {
      b: 'A balance carried down is either **debit** or **credit**. It tells what the account now means.',
      v: vReading,
      n: 'A debit balance means the account has more debits than credits. For cash and other assets it is the value in hand, and for a customer it is what he still owes. A credit balance means more credits. For a supplier it is the amount the firm owes, and for capital it is the amount owed to the proprietor. So balances are read by their side and the nature of the account.',
    }),
    sl('example', 'Worked example 4: balancing a creditor and reading the balance', {
      b: `Balance the account of Venkat Fibre Co. on 31 March 2028. The credit side is larger, so the balance is **credit**. The account of Ismail and Sons, a customer, closes with a **debit** balance of ${rs(ismail.balance)}.`,
      v: vVenkatBal,
      n: `The credit side of the supplier is larger, so the balance of ${rupees(-venkat.balance)} is written on the debit side as balance carried down and brought down on the credit side. It is a liability. The customer Ismail and Sons, in contrast, has a debit balance of ${rupees(ismail.balance)}, an asset to be received.`,
    }),
    sl('check', 'Quick check: finding a balance', {
      b: 'Total each side separately before you subtract.',
      chk: 'n_chk_balance',
      n: 'Add the debits, add the credits and take the difference. The larger side tells you the nature of the balance.',
    }),
    sl('diagram', 'Slips to avoid', {
      v: vErrors,
      n: 'Five slips cost marks. Do not name the account itself in its own page. Do not write To on the credit side. Do not put the balance on the larger side. Do not carry down a nominal account, which is closed instead. And do not forget to bring in the opening balance. Check the sides, the other account named and the equal totals every time.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up. The ledger is the principal book, written up from the journal with an account for each head. Each debit is posted with To and the other account, and each credit with By. The folios link the two books. Real and personal accounts are balanced with a balance carried down and brought down, and the side of the balance shows its nature.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Bring in every **opening balance** first, on its correct side.',
        'Name the **other account** with **To** or **By**; use **Sundries** for compound entries.',
        'Write the balance on the **smaller** side as **balance c/d**; bring it down as **b/d** below the totals.',
        'State whether the closing balance is a **debit** or a **credit**.',
        'Show the **equal totals**: they usually carry step marks.',
      ],
      n: 'Examiners give marks for the opening balances, for correct particulars, for the balance and for the totals. Common slips are naming the account in itself, writing the amount on the wrong side, forgetting the opening balance and putting the balance on the larger side. Always check that the two totals are equal before moving on.',
    }),
  ],
});

const deck2 = deck({
  part: 2,
  title: 'Ledger — Part 2: Closing Nominal Accounts, Closing and Adjusting Entries',
  goals: [
    'Explain why nominal accounts are closed by transfer to the Trading or Profit and Loss Account and not carried down',
    'Pass closing entries for purchases, sales, returns, opening stock, direct and indirect expenses and incomes, and for profit and drawings',
    'Pass simple adjusting entries for closing stock, outstanding and prepaid expenses, accrued and advance income and depreciation',
  ],
  slides: [
    sl('title', 'Closing and adjusting entries', {
      b: 'Part 2 — how **nominal accounts** are closed, the **closing entries** for the Trading and Profit and Loss Accounts, and **adjusting entries** at an introductory level.',
      v: vRoute2,
      n: 'In Part two we finish the year. Expenses and incomes of the year cannot be carried to the next year, so they are transferred to the Trading Account and the Profit and Loss Account by closing entries. Before that, adjusting entries bring in the items that belong to the year but are not yet recorded. We use the same coir works, with a second firm for adjustments.',
    }),
    sl('concept', 'Nominal accounts are closed, not carried down', {
      b: 'Real and personal accounts are **balanced** and carried down. **Nominal accounts** record the expenses and incomes of one period, so they are **closed by transfer** and show no balance c/d.',
      v: vRealNominal,
      n: 'Cash, machinery, debtors and creditors still matter next year, so they are balanced and carried down. Purchases, sales, wages and rent belong to the year just ended. At the year end they are closed by transfer to the Trading Account or the Profit and Loss Account. They have no balance carried down and open the new year empty.',
    }),
    sl('example', 'Worked example 1: closing the wages account', {
      b: `Wages paid in cash by Parvati Coir Works were ${rs(PC.wages)}, and ${rs(PC.wagesDue)} of wages is due at the year end. The adjusting entry brings in the amount due, and the whole expense is then transferred to the Trading Account.`,
      bl: ['The wages account is closed by a **credit** of its total.', 'Its two sides then agree; there is **no balance c/d**.'],
      v: vWages,
      n: `Wages of ${rupees(PC.wages)} were paid, and ${rupees(PC.wagesDue)} more is due, so the expense for the year is ${rupees(PC.wages + PC.wagesDue)}. Wages is a direct expense, so it is credited with the full amount, written By Trading Account. Both sides total the same, and nothing is carried down. The next year starts with no wages balance.`,
    }),
    sl('concept', 'Closing entries: what goes where', {
      b: 'A **closing entry** is a journal entry passed at the end of the period to transfer a nominal account to the Trading or Profit and Loss Account. One entry is passed for each account.',
      v: vWhich,
      n: 'Sort the nominal accounts first. Items that make up the cost of goods go to the Trading Account: opening stock, purchases, sales returns, direct expenses such as wages and carriage inwards, and on the credit side sales, purchases returns and closing stock. Indirect expenses and incomes go to the Profit and Loss Account. A debit balance is cleared by a credit, a credit balance by a debit.',
    }),
    sl('example', 'Worked example 2: closing the trading items', {
      b: 'Parvati Coir Works closes opening stock (held in Stock A/c), purchases, sales return, sales and purchases return on 31 March 2028. Accounts with a debit balance are **credited**, accounts with a credit balance are **debited**.',
      v: vStockClose,
      n: 'For opening stock, purchases and sales return, the Trading Account is debited and the account itself is credited, which clears its debit balance. For sales and purchases return the account is debited, which clears its credit balance, and the Trading Account is credited. Each entry carries its own narration.',
    }),
    sl('check', 'Quick check: which account is closed by transfer?', {
      b: 'Decide first whether the account is nominal.',
      chk: 'm_chk_nominal',
      n: 'Nominal accounts are closed by transfer. Then think of whether the item is a direct expense or an indirect one.',
    }),
    sl('concept', 'Expenses and incomes to Trading and Profit and Loss', {
      b: 'Direct expenses, wages and carriage inwards, go to the **Trading Account**. Indirect expenses such as rent and depreciation, and incomes such as interest received, go to the **Profit and Loss Account**.',
      v: vExpClose,
      n: 'Wages and carriage inwards are direct expenses, so they are credited and the Trading Account is debited. Rent and depreciation are indirect expenses, so the Profit and Loss Account is debited and the expense is credited. Interest received is an income, so it is debited and the Profit and Loss Account is credited. The rent here is the amount for the year, after the prepaid part.',
    }),
    sl('example', 'Worked example 3: the Trading Account after closing', {
      b: `After every closing entry is posted, the **Trading Account** shows the cost items on the debit side and sales, purchases return and closing stock on the credit side. The difference is the **gross profit**, ${rs(PC_CLOSE.gp)}, transferred to the Profit and Loss Account.`,
      v: vTrading,
      n: `The debit side holds opening stock, purchases, sales return, wages and carriage. The credit side holds sales, purchases return and closing stock. The credit side is larger, and the difference of ${rupees(PC_CLOSE.gp)} is the gross profit, passed on to the Profit and Loss Account. Both sides total ${rupees(trL.total)}, so the Trading Account is closed.`,
    }),
    sl('example', 'Worked example 3 (contd): the Profit and Loss Account', {
      b: `Rent and depreciation are debited and interest received and the gross profit are credited. The difference is the **net profit**, ${rs(PC_CLOSE.np)}, transferred to the Capital Account.`,
      v: vPL,
      n: `The Profit and Loss Account has rent and depreciation on the debit side, and the gross profit with interest received on the credit side. The credit side is larger by ${rupees(PC_CLOSE.np)}. This net profit is debited here and credited to the Capital Account. Both sides total ${rupees(plL.total)}, so this account is closed as well.`,
    }),
    sl('concept', 'Profit and drawings go to capital', {
      b: 'The **gross profit** moves from Trading to Profit and Loss; the **net profit** moves to the **Capital Account**; **drawings** are also transferred to the Capital Account.',
      v: vProfitEntries,
      n: 'Three more closing entries finish the job. The Trading Account is debited and the Profit and Loss Account credited with the gross profit. The Profit and Loss Account is debited and the Capital Account credited with the net profit. And the Capital Account is debited with the drawings, which are credited. A loss would reverse the first two.',
    }),
    sl('diagram', 'The capital account after closing', {
      v: vCapital,
      bl: ['Net profit **adds** to capital; drawings **reduce** it.', 'Capital is a personal-type account: it is **balanced** and carried down.'],
      n: `Capital opens with ${rupees(PC.cap)}. The net profit is credited and the drawings are debited. What remains, ${rupees(-PC_ALL['Capital A/c'].balance)}, is carried down and brought down. Notice that capital, unlike the nominal accounts, is balanced, not closed by transfer.`,
    }),
    sl('check', 'Quick check: a closing entry', {
      b: 'Think of what a nominal account looks like after the entry.',
      chk: 'tf_chk_closing',
      n: 'Decide whether closing entries clear nominal accounts and where the balance is sent.',
    }),
    sl('concept', 'Adjusting entries: meaning and purpose', {
      b: 'An **adjusting entry** is passed at the end of the period to record an item that belongs to the period but is not yet in the books, or one that belongs to the next period. Full final accounts come in Chapters 12 and 13.',
      v: vAdjEffect,
      n: 'Adjusting entries correct the figures of the year. An expense not yet paid must be added, an expense paid ahead for the next year must be taken out, income earned but not received must be added, and income received for the next year must be taken out. Only then is the profit of the year true and the balance sheet complete.',
    }),
    sl('concept', 'Closing stock', {
      b: 'Stock left at the end of the year is brought into the books by debiting **Closing Stock A/c** and crediting the **Trading Account**.',
      v: vClStock,
      n: `If the closing stock is valued at ${rupees(HC.stock)}, the closing stock account is debited and the Trading Account credited. In the Trading Account it appears on the credit side, because it reduces the cost of goods sold. In the balance sheet it is a current asset, and the balance is brought down as the next period's opening stock.`,
    }),
    sl('example', 'Worked example 4: adjusting entries for expenses and incomes', {
      b: `**Hosur Candle Works**, an imagined firm, has salaries of ${rs(HC.salDue)} due, insurance of ${rs(HC.insPrepaid)} paid in advance, commission of ${rs(HC.commAccrued)} earned but not received and rent of ${rs(HC.rentAdv)} received in advance. Pass the entries.`,
      v: vAdjJournal,
      n: 'Salaries due: debit salaries and credit outstanding salaries, a liability. Insurance paid ahead: debit prepaid insurance, an asset, and credit insurance. Commission earned but not received: debit accrued commission, an asset, and credit commission received. Rent received ahead: debit rent received and credit rent received in advance, a liability.',
    }),
    sl('concept', 'The rule behind each adjusting entry', {
      v: vAdjRule,
      bl: ['**Outstanding** and **advance** items are **liabilities**.', '**Prepaid** and **accrued** items are **assets**.'],
      n: 'Remember the pattern. An outstanding expense adds to the expense and creates a liability. A prepaid expense reduces the expense and creates an asset. Accrued income adds to income and creates an asset. Income received in advance reduces income and creates a liability. Depreciation is an expense that reduces the asset itself.',
    }),
    sl('check', 'Quick check: the expense for the year', {
      b: 'Start from the amount paid and adjust.',
      chk: 'm_chk_adjust',
      n: 'Take the payment made and decide whether the prepaid part is added or deducted to get the expense of the year.',
    }),
    sl('example', 'Worked example 5: prepaid rent and depreciation in the ledger', {
      b: `Parvati Coir Works paid rent of ${rs(PC.rent)}; ${rs(PC.rentPrepaid)} is for the next year, so Prepaid Rent A/c is debited and Rent A/c credited. Depreciation at ${PC.depPct}% on machinery of ${rs(PC.open.mach)} is ${rs(PC_DEP)}.`,
      bl: [`Rent for the year ${rs(PC.rent - PC.rentPrepaid)} goes to the Profit and Loss Account.`, `Machinery is carried down at ${rs(PC_ALL['Machinery A/c'].balance)}.`],
      v: vRent,
      n: `Rent of ${rupees(PC.rent)} was paid. Of this, ${rupees(PC.rentPrepaid)} is for next year and moves to prepaid rent, an asset. The remaining ${rupees(PC.rent - PC.rentPrepaid)} is transferred to the Profit and Loss Account. Depreciation of ${rupees(PC_DEP)} is debited to its own account and credited to machinery, which is carried down at ${rupees(PC_ALL['Machinery A/c'].balance)}.`,
    }),
    sl('diagram', 'Machinery after depreciation', {
      v: vMach,
      n: `The machinery account opens with ${rupees(PC.open.mach)}. The adjusting entry credits it with the depreciation, so the balance carried down is ${rupees(PC_ALL['Machinery A/c'].balance)}. This is a real account and is balanced. The depreciation itself is a nominal account closed to the Profit and Loss Account.`,
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up. Nominal accounts are closed by transfer and have no balance carried down. Debit balances are cleared by a credit and credit balances by a debit. Items of cost go to the Trading Account, and the other expenses and incomes go to the Profit and Loss Account. Profit and drawings go to the Capital Account. Adjusting entries correct the year before closing.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        '**Clear** a debit balance by a **credit**; clear a credit balance by a **debit**.',
        'Direct expenses go to **Trading**; indirect expenses and incomes go to **Profit and Loss**.',
        'Never carry down a **nominal** account; transfer it.',
        'Say whether each adjusting entry makes an **asset** or a **liability**.',
        'Write a **narration** under every entry.',
      ],
      n: 'In the examination, pass one closing entry for each account with a narration, and show the gross profit and the net profit separately. Common slips are crediting sales, writing closing stock on the debit side of the Trading Account, treating an outstanding expense as an asset, and carrying down a nominal account. Check that the sides of every account agree at the end.',
    }),
  ],
});

// ================================================================ notes
const N = notes({
  title: 'Ledger — Notes',
  sections: [
    {
      h: '1. The ledger: meaning, importance and format',
      t: 1,
      b: '**Ledger:** the principal book of accounts in which every transaction recorded in the journal is classified under separate heads, each head having an account of its own. It is a book of secondary entry, because it is written up from the journal.\n\n**Importance:** all transactions of one account are brought together; the balance of each account (cash in hand, amount due from a customer, amount owed to a supplier) is easily found; it supplies the figures for the trial balance and the final accounts.\n\n**Format (T-form):** a two-sided account. The left side is the **debit** side, the right side the **credit** side; each side has columns for date, particulars, journal folio and amount, and the debit side particulars begin with **To** and the credit side particulars with **By**.\n\n**Running balance form (mention):** columns for date, particulars, folio, debit, credit and a balance recomputed after every entry; useful for customer and supplier accounts.',
      terms: [
        ['Ledger', 'The principal book of accounts: an account for each head, written up from the journal.'],
        ['Account', 'A summary of all the transactions relating to one person, asset, liability, expense or income.'],
        ['Running balance form', 'A ledger account with a balance column worked out after every entry.'],
      ],
      v: vJvsL,
      vs: [vFormat, vRunning],
    },
    {
      h: '2. Folios and the rule of posting',
      t: 1,
      b: '**Posting** is the process of copying journal entries to the ledger accounts.\n\n- **Debit** of the entry: the account is written on its debit side, with **To** and the name of the other account.\n- **Credit** of the entry: the account is written on its credit side, with **By** and the name of the other account.\n- **Several accounts** on the other side: write **Sundries**.\n- An account never names itself.\n\n**Ledger folio (L.F.):** page of the account in the ledger; written in the journal after the entry is posted. **Journal folio (J.F.):** page of the journal; written in the ledger beside each posted item.',
      terms: [
        ['Posting', 'Transferring the journal entries to the respective ledger accounts.'],
        ['Journal folio (J.F.)', 'The journal page number written in the ledger against each posted item.'],
        ['Ledger folio (L.F.)', 'The ledger page number written in the journal against each account after posting.'],
        ['Sundries', 'The word used when two or more accounts stand on the other side of an entry.'],
      ],
      v: vPostRule,
      vs: [vJournalLF, vCompound],
    },
    {
      h: '3. Opening entries and opening balances',
      t: 1,
      b: 'When a new set of books begins, an **opening entry** is passed: every asset is debited and every liability and the capital are credited. **Capital** = assets − liabilities.\n\nPosting the opening entry opens each ledger account with its balance, written as **To Balance b/d** on the debit side for an asset, or **By Balance b/d** on the credit side for a liability or capital. Later transactions are posted below these opening balances.',
      terms: [['Opening entry', 'The journal entry that brings the old balances into new books: assets Dr, liabilities and capital Cr.']],
      v: vOpening,
      vs: [vCashPosted],
    },
    {
      h: '4. Balancing real and personal accounts',
      t: 2,
      b: 'Real accounts (cash, machinery, stock held) and personal accounts (debtors, creditors, capital) are **balanced** at the end of the period.\n\n1. Total each side.\n2. Take the difference of the two totals.\n3. Enter the difference on the **smaller** side as **Balance c/d**.\n4. Write the equal total on both sides on one line.\n5. Bring the balance down on the opposite side, below the totals, as **Balance b/d**.\n\nA larger debit side gives a **debit** balance, shown By Balance c/d on the credit side. A larger credit side gives a **credit** balance, shown To Balance c/d on the debit side.',
      terms: [
        ['Balance c/d', 'The difference of an account carried down to the next period; written on the smaller side.'],
        ['Balance b/d', 'The same balance brought down as the opening balance of the next period, on the opposite side.'],
      ],
      v: vSteps,
      vs: [vCashBal, vVenkatBal],
    },
    {
      h: '5. Reading debit and credit balances',
      t: 2,
      b: '- **Debit balance:** an asset (cash, stock, machinery) or an amount due from a person (a debtor).\n- **Credit balance:** a liability (an amount owed to a supplier) or the owner\'s capital.\n\nA firm\'s cash account cannot normally have a credit balance, so one signals an error. Bring the balances of all accounts together and the total of the debit balances equals that of the credit balances (the trial balance of Chapter 7).',
      terms: [
        ['Debtor', 'A person who owes money to the firm; shows a debit balance.'],
        ['Creditor', 'A person to whom the firm owes money; shows a credit balance.'],
      ],
      v: vReading,
      vs: [vErrors],
    },
    {
      h: '6. Closing nominal accounts: closing entries',
      t: [2, 3],
      b: '**Nominal accounts** (expenses, losses, incomes, gains) are not carried down. They are **closed by transfer** to the Trading Account or the Profit and Loss Account at the end of the period, through **closing entries**: one entry for each account, with a narration.\n\n- **Debit-balance** accounts are cleared by a **credit**: Trading A/c Dr to Opening Stock, Purchases, Sales Return, Wages and Carriage Inwards; Profit and Loss A/c Dr to indirect expenses.\n- **Credit-balance** accounts are cleared by a **debit**: Sales, Purchases Return to Trading A/c; incomes to Profit and Loss A/c.\n- **Closing stock** (after its adjusting entry) is a credit in the Trading Account.\n- **Gross profit** (credit side of Trading larger) goes to Profit and Loss; a gross loss reverses the entry.\n- **Net profit** goes to Capital A/c; a net loss reverses it; **drawings** are transferred to Capital A/c.',
      terms: [
        ['Closing entry', 'A journal entry passed at the end of the period to transfer a nominal account to the Trading or Profit and Loss Account.'],
        ['Direct expenses', 'Expenses incurred in bringing goods to a saleable state, such as wages and carriage inwards.'],
        ['Indirect expenses', 'Expenses of running the business, such as rent, salaries and depreciation.'],
      ],
      v: vWhich,
      vs: [vStockClose, vExpClose, vWages, vTrading, vPL, vProfitEntries, vCapital],
    },
    {
      h: '7. Adjusting entries at introductory level',
      t: 3,
      b: '**Adjusting entries** are passed at the end of the period, before the closing entries, to bring in items that belong to the period but are not yet recorded, or to take out items that belong to the next period.\n\n- **Closing stock:** Closing Stock A/c Dr to Trading A/c.\n- **Outstanding expense:** Expense A/c Dr to Outstanding Expense A/c (liability).\n- **Prepaid expense:** Prepaid Expense A/c Dr (asset) to Expense A/c.\n- **Accrued income:** Accrued Income A/c Dr (asset) to Income A/c.\n- **Income received in advance:** Income A/c Dr to Income Received in Advance A/c (liability).\n- **Depreciation:** Depreciation A/c Dr to the asset account, then closed to the Profit and Loss Account.\n\nExpense for the year = amount paid + outstanding − prepaid. Income for the year = amount received + accrued − received in advance. Complete final accounts and balance sheets with these items are treated in Chapters 12 and 13.',
      terms: [
        ['Adjusting entry', 'An end-of-period entry that records an accrual, a prepayment or another item belonging to the period.'],
        ['Outstanding expense', 'An expense of the year that is due but unpaid; a liability.'],
        ['Prepaid expense', 'Part of a payment that belongs to the next period; an asset.'],
        ['Accrued income', 'Income earned in the year but not yet received; an asset.'],
      ],
      v: vAdjEffect,
      vs: [vClStock, vAdjJournal, vAdjRule, vRent, vMach],
    },
  ],
  tips: '**How marks are usually split (ISC Accounts, Section A)**\n- 1 mark: one correct option, a term or the side of a balance.\n- 2 marks: a short definition or distinction, one entry with narration or a simple balancing.\n- 3 marks: a ledger account posted from a short journal and balanced, or a set of adjusting or closing entries.\n- 5 marks: several accounts posted and balanced with their totals, or all the closing entries for a year, in proper form.\n\n**Step marks** usually go for each correct account with its opening balance, the postings with the other account named, the balance c/d and b/d, and the equal totals.\n\n**Common mistakes**\n- Naming an account in its own page, or using By on the debit side.\n- Leaving out an opening balance, or placing it on the wrong side.\n- Writing the balance c/d on the larger side, or carrying down a nominal account.\n- Crediting sales to close it, or putting closing stock on the debit side of the Trading Account.\n- Treating an outstanding expense as an asset and a prepaid expense as a liability.\n- Forgetting the narration under a journal entry.\n\nAll firms and figures in SOYL practice are imagined; the board paper will give its own.',
});

// ================================================================ flashcards
const F = cards([
  ['**Ledger**', 'The principal book of accounts with a separate account for each head; written up from the journal.', 'definition', 1],
  ['Journal or ledger: which is the book of original entry?', 'The **journal**. The ledger is a book of secondary entry.', 'fact', 1],
  ['Name one importance of the ledger', 'It brings all transactions of one account together, so the balance of each account is found at once.', 'concept', 1],
  ['Shape of the T-form ledger account', 'Two sides: **debit** (left) and **credit** (right), each with date, particulars, J.F. and amount.', 'fact', 1],
  ['**Running balance form**', 'A ledger account with a balance column that is worked out after every entry.', 'definition', 1],
  ['**Posting**', 'Copying the journal entries to the respective ledger accounts.', 'definition', 1],
  ['Posting a debit: word and account named', '**To**, and the **other account** of the entry, on the debit side.', 'fact', 1],
  ['Posting a credit: word and account named', '**By**, and the **other account** of the entry, on the credit side.', 'fact', 1],
  ['When is **Sundries** written?', 'When two or more accounts stand on the other side of the entry (a compound entry).', 'fact', 1],
  ['**Ledger folio** (L.F.)', 'Page of the account in the ledger, written in the journal after posting.', 'definition', 1],
  ['**Journal folio** (J.F.)', 'Page of the journal, written in the ledger beside the posted item.', 'definition', 1],
  ['**Opening entry**', 'Entry debiting assets and crediting liabilities and capital at the start of new books.', 'definition', 1],
  ['How is capital found in the opening entry?', 'Capital = assets − liabilities; it is the balancing figure.', 'concept', 1],
  ['An asset\'s opening balance is written as', '**To Balance b/d** on the debit side.', 'exam-tip', 1],
  ['A liability\'s opening balance is written as', '**By Balance b/d** on the credit side.', 'exam-tip', 1],
  ['Which accounts are **balanced** at the year end?', 'Real and personal accounts (cash, machinery, debtors, creditors, capital).', 'fact', 2],
  ['Debit side larger: nature of the balance and its wording', '**Debit** balance, written **By Balance c/d** on the credit side.', 'concept', 2],
  ['Credit side larger: nature of the balance and its wording', '**Credit** balance, written **To Balance c/d** on the debit side.', 'concept', 2],
  ['On which side is Balance c/d written?', 'On the **smaller** side, so the two totals become equal.', 'exam-tip', 2],
  ['Balance b/d after a debit balance c/d', 'Written **To Balance b/d** on the debit side, below the totals.', 'fact', 2],
  ['A debit balance in a customer\'s account means', 'The customer **owes** the firm; it is an asset (debtor).', 'concept', 2],
  ['A credit balance in a supplier\'s account means', 'The firm **owes** the supplier; it is a liability (creditor).', 'concept', 2],
  ['**Nominal accounts**: balanced or closed?', '**Closed** by transfer to the Trading or Profit and Loss Account; no balance c/d.', 'fact', 2],
  ['**Closing entry**', 'End-of-period journal entry that transfers a nominal account to the Trading or Profit and Loss Account.', 'definition', 3],
  ['Closing a debit-balance nominal account', 'Credit the account; debit the Trading or Profit and Loss Account.', 'concept', 3],
  ['Closing a credit-balance nominal account', 'Debit the account; credit the Trading or Profit and Loss Account.', 'concept', 3],
  ['Accounts closed to the Trading Account', 'Opening stock, purchases, sales return, direct expenses, sales, purchases return, closing stock.', 'fact', 3],
  ['Accounts closed to the Profit and Loss Account', 'Indirect expenses (rent, salaries, depreciation) and incomes (interest, commission received).', 'fact', 3],
  ['Where do net profit and drawings go?', 'Both are transferred to the **Capital Account**; profit adds to it and drawings reduce it.', 'concept', 3],
  ['**Adjusting entry**', 'End-of-period entry bringing in an accrual or prepayment that belongs to the period.', 'definition', 3],
  ['Entry for closing stock', 'Closing Stock A/c Dr to Trading A/c; a credit in Trading and an asset in the balance sheet.', 'exam-tip', 3],
  ['Entry for an outstanding expense', 'Expense A/c Dr to Outstanding Expense A/c (a **liability**).', 'exam-tip', 3],
  ['Entry for a prepaid expense', 'Prepaid Expense A/c Dr (an **asset**) to Expense A/c.', 'exam-tip', 3],
  ['Entry for accrued income', 'Accrued Income A/c Dr (an **asset**) to Income A/c.', 'exam-tip', 3],
  ['Entry for income received in advance', 'Income A/c Dr to Income Received in Advance A/c (a **liability**).', 'exam-tip', 3],
]);
check(F.cards.length <= 35, `flashcard count ${F.cards.length}`);

// ================================================================ tests (ISC class defaults, item for item)
const T_SHORT = test({
  kind: 'short',
  blueprint: 'isc-11-default-chapter-test-short',
  title: 'Chapter test (short) — Ledger',
  duration: 50,
  sections: [
    { id: 'A', title: 'Section A - Objective (5 marks)', instr: 'Answer all questions. Multiple-choice and assertion-reason items carry 1 mark each.', items: ['m_ledger_meaning', 'm_cd_bd', 'm_close_sales', 'm_nature_balance', 'ar_post_after_journal'] },
    { id: 'B', title: 'Section B - Short answer (4 marks)', instr: 'Answer both questions. Internal choice in the second question. Show your working.', items: ['s2_ledger_meaning', { attempt: 1, keys: ['s2_cd_steps', 's2_prepaid_entry'] }] },
    { id: 'C', title: 'Section C - Short answer (6 marks)', instr: 'Answer both questions. Internal choice in the second question. Show accounts and entries in proper form.', items: ['s3_posting_two', { attempt: 1, keys: ['s3_balance_account', 's3_closing_entries'] }] },
    { id: 'D', title: 'Section D - Long answer (5 marks)', instr: 'Answer the question. Prepare the accounts in proper form.', items: ['l5_balance_close'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'isc-11-default-chapter-test-long',
  title: 'Chapter test (long) — Ledger',
  duration: 100,
  sections: [
    { id: 'A', title: 'Section A - Objective (12 marks)', instr: 'Answer all questions. Multiple-choice and assertion-reason items carry 1 mark each.', items: ['m_jf', 'm_folio', 'm_compound_post', 'm_opening_entry', 'm_balance_side', 'm_creditor_balance', 'm_debit_balance_debtor', 'm_outstanding_entry', 'm_depr_entry', 'm_direct_exp', 'ar_nominal', 'ar_outstanding'] },
    { id: 'B', title: 'Section B - Short answer (6 marks)', instr: 'Answer all three questions. Internal choice in the last question.', items: ['s2_folios', 's2_opening_entry', { attempt: 1, keys: ['s2_nominal_vs_real', 's2_adjusting_meaning'] }] },
    { id: 'C', title: 'Section C - Short answer (12 marks)', instr: 'Answer all four questions. Internal choice in the last question. Show accounts and entries in proper form.', items: ['s3_running_form', 's3_compound_posting', 's3_nominal_close', { attempt: 1, keys: ['s3_adjusting_three', 's3_depr_adj'] }] },
    { id: 'D', title: 'Section D - Long answer (10 marks)', instr: 'Answer both questions. Internal choice in the second question. Prepare accounts and entries in proper form.', items: ['l5_post_ledgers', { attempt: 1, keys: ['l5_closing_entries', 'l5_adjusting'] }] },
  ],
});

// ================================================================ extra gates for this chapter
// 1. TTS-safe narration: words only.
for (const d of [deck1, deck2]) for (const s of d.slides) {
  const m = /[0-9₹%/&()"“”|*#+=<>]|\b[A-Z]{2,}\b|\b(?:Dr|Cr|Rs|A\/c|viz|etc|ie|eg)\b/.exec(s.narration);
  if (m) throw new Error(`narration of deck ${d.part} ${s.id} is not TTS-safe: "${m[0]}" in "${s.narration.slice(Math.max(0, m.index - 30), m.index + 30)}"`);
}
// 2. Near-duplicate stems inside the bank.
for (const d of nearDuplicates(BANK, { n: 5, threshold: 0.5, minWords: 5 })) {
  if (d.similarity >= 0.7) throw new Error(`near-duplicate stems ${d.a.id} / ${d.b.id} (${Math.round(d.similarity * 100)}%)`);
  console.log(`note: stems ${d.a.id} / ${d.b.id} are ${Math.round(d.similarity * 100)}% similar (never together in one test)`);
}
// 3. Tests: disjoint, no deck-check item, marks.
const inTest = (t) => t.sections.flatMap((s) => s.items.map((i) => i.question_id));
const shortIds = new Set(inTest(T_SHORT));
check(inTest(T_LONG).every((id) => !shortIds.has(id)), 'the two chapter tests share a question');
const deckChecks = new Set([deck1, deck2].flatMap((d) => d.slides.map((s) => s.check_question_id).filter(Boolean)));
check(deckChecks.size === 6, `deck check count ${deckChecks.size}`);
check([...shortIds, ...inTest(T_LONG)].every((id) => !deckChecks.has(id)), 'a deck-check question is used in a test');
check(T_SHORT.total_marks === 20 && T_LONG.total_marks === 40, `test marks ${T_SHORT.total_marks} / ${T_LONG.total_marks}`);

build({
  dir: DIR,
  decks: [deck1, deck2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01-t03 of isc-11-accounts-ch04 (ledger meaning, importance, T-form and running balance form, folios, posting with To and By including compound and opening entries; balancing real and personal accounts with c/d and b/d and reading balances; nominal accounts closed to Trading or Profit and Loss; closing entries; introductory adjusting entries for closing stock, outstanding and prepaid expenses, accrued and advance income and depreciation); no GST transactions; full final accounts are Chapters 12 and 13',
    originality: 'every firm, person and figure written for this chapter and labelled imagined; no ISC or CBSE textbook illustration or exercise and no CISCE specimen or board item reused; firms differ from the CBSE 11 Accountancy ledger chapters',
    data: 'every ledger generated by acc.mjs ledger()/post() from balanced journal entries with c/d and b/d asserted; closing entries asserted against trading() and profitLoss(); nominal accounts asserted to close with no balance; closing capital, post-closing trial balance and balance sheet asserted to agree',
    facts: 'ISC Accountancy (858) Class XI Unit 3: ledger, posting, balancing, closing and adjusting entries; GST transactions are not examined; final accounts are Chapters 12 and 13',
    gate: 'schema, content lint (lintExemplar), deterministic verify checks, answer-leak scan, TTS-safe narration, near-duplicate stems, whole-number step marks and test disjointness run clean on this chapter',
  },
});
