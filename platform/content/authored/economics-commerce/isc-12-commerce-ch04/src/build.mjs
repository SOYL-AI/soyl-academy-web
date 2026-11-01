// Build ISC 12 Commerce ch04 Short-term Sources of Funds. Run from platform/:
//   npx tsx content/authored/economics-commerce/isc-12-commerce-ch04/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';

setUnit('isc-12-commerce-ch04', 'economics-commerce');
const { BILL, CC, FAC, INST, inr } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- visuals
const vRoute1 = flow('LR', ['Overdraft', 'Cash credit', 'Short-term loan', 'Bill discounting', 'Public deposits'], 'Route map of Part 1: overdraft, cash credit, short-term loans, discounting of bills, and public deposits', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Trade credit', 'Customer advances', 'Factoring', 'Inter-corporate deposits', 'Instalment credit'], 'Route map of Part 2: trade credit, customer advances, factoring, inter-corporate deposits and instalment credit', 'Part 2 at a glance');

const vWhy = table(
  ['Short-term need (under a year)', 'Imagined example'],
  [
    ['Buying raw material for a season', 'A knitwear exporter buys yarn before shipments'],
    ['Paying wages and bills before customers pay', 'A cable maker waits 60 days for dealers'],
    ['Carrying stock and debtors', 'A wholesaler stocks rice and pulses for 300 shops'],
  ],
  'Table of three short-term needs for funds with imagined examples',
);
const vBank = table(
  ['Facility', 'How it works', 'Interest on'],
  [
    ['Overdraft', 'Current-account holder draws beyond balance up to a limit', 'Amount overdrawn, for the days used'],
    ['Cash credit', 'Borrowing limit against stock or receivables; draw as needed', 'Amount actually drawn'],
    ['Short-term loan', 'Lump sum credited to the account at once', 'Whole amount from the start'],
    ['Discounting of bills', 'Bank pays bill value before maturity, less a discount', 'Discount deducted in advance'],
  ],
  'Table of four forms of short-term bank assistance: overdraft, cash credit, short-term loan and discounting of bills, how each works and on what interest is charged',
);
const vCcEx = table(
  ['For one month (imagined: Kolar Kraft Papers Ltd)', 'Short-term loan', 'Cash credit'],
  [
    ['Amount on which interest runs', `₹${inr(CC.limit)}`, `₹${inr(CC.used)} (average used)`],
    ['Working at 12 per cent a year', `${inr(CC.limit)} × 0.12 ÷ 12`, `${inr(CC.used)} × 0.12 ÷ 12`],
    ['Interest for the month', `₹${inr(CC.intLoan)}`, `₹${inr(CC.intUsed)}`],
  ],
  'Worked table comparing one month\'s interest: a ten lakh rupee short-term loan costs ten thousand rupees, while a cash credit with six lakh rupees used on average costs six thousand rupees',
  `Saving with cash credit: ₹${inr(CC.intLoan - CC.intUsed)} for the month.`,
);
// Timeline of discounting a bill.
const vBill = (() => {
  const s = new Svg(560, 220);
  s.line(40, 110, 520, 110, { sw: 2 });
  [[60, 'Day 0', 'Bill accepted'], [200, 'Day 10', 'Bill discounted'], [500, 'Day 90', 'Bill matures']].forEach(([x, a, b]) => {
    s.dot(x, 110, 6, 'accent');
    s.text(x, 62, a, { bold: true, size: 13 }).text(x, 86, b, { size: 12 });
  });
  s.arrow(200, 160, 200, 122, { color: 'green', sw: 1.8 });
  s.text(200, 178, 'Bank pays face value − discount', { size: 12, color: 'green' });
  s.arrow(500, 160, 500, 122, { color: 'blue', sw: 1.8 });
  s.text(420, 200, 'Bank collects face value from the customer', { size: 12, color: 'blue' });
  s.text(280, 24, 'Discounting turns a future payment into cash now', { bold: true, size: 14 });
  return s.visual('Timeline: on day 0 the customer accepts a bill; on day 10 the firm discounts it and the bank pays the face value less a discount; on day 90 the bill matures and the bank collects the face value from the customer', 'The discount is the bank\'s interest for waiting until maturity.');
})();
const vBillEx = table(
  ['Step (imagined: Amravati Auto Parts Ltd)', 'Working', 'Result'],
  [
    ['Discount for 3 months at 12 per cent', `${inr(BILL.face)} × 0.12 × 3 ÷ 12`, `₹${inr(BILL.discount)}`],
    ['Cash received now', `${inr(BILL.face)} − ${inr(BILL.discount)}`, `₹${inr(BILL.paid)}`],
  ],
  'Worked table: discounting a two lakh rupee bill due in three months at twelve per cent a year costs six thousand rupees, so the firm receives one lakh ninety-four thousand rupees now',
);
const vPd = table(
  ['Public deposits', 'Points'],
  [
    ['Meaning', 'Deposits invited directly from the public, usually at a rate above bank deposits'],
    ['For the company', 'Simple; often cheaper than bank borrowing; no charge on assets; no dilution'],
    ['Against', 'Short period; only well-known companies can raise them; unreliable in bad times; unsecured for depositors'],
  ],
  'Table summarising public deposits: meaning, advantages to the company and disadvantages',
);
const vTc = table(
  ['Trade credit', 'Customer advances'],
  [
    ['Given by suppliers', 'Given by buyers'],
    ['Firm pays after receiving goods', 'Firm is paid before delivering'],
    ['Open to almost every business', 'Mainly for made-to-order or scarce goods'],
    ['Risk: overtrading; lost cash discounts', 'Risk: penalties for late delivery'],
  ],
  'Table comparing trade credit and customer advances on who gives them, timing, which firms use them, and their main risk',
);
const vTcEx = table(
  ['Imagined firm', 'Source', 'Why it fits'],
  [
    ['Bundi Bangles (beads on 45 days\' credit)', 'Trade credit', 'Sells bangles before paying for beads'],
    ['Bharuch Boilers Ltd (30 per cent with order)', 'Customer advance', 'Each boiler is made to order'],
    ['Pindari Provisions (ordered too much on credit)', 'Trade credit misused', 'Overtrading'],
  ],
  'Worked table of three imagined firms, the short-term source each uses and why it fits, including one case of overtrading',
);
// Factoring triangle: firm, customers, factor.
const vFactor = (() => {
  const s = new Svg(560, 300);
  const box = (x, y, t1, t2, c) => { s.rect(x - 85, y - 28, 170, 56, { fill: c, fillOpacity: 0.14, color: c, sw: 1.5 }); s.text(x, y - 8, t1, { bold: true, size: 14 }).text(x, y + 13, t2, { size: 12 }); };
  box(100, 60, 'Firm (client)', 'sells on credit', 'green');
  box(460, 60, 'Customers', 'owe money', 'blue');
  box(280, 240, 'Factor', 'buys receivables', 'accent');
  s.arrow(188, 52, 372, 52, { sw: 1.6 });
  s.text(280, 38, '1. Goods sold on credit', { size: 12 });
  s.arrow(170, 90, 270, 210, { sw: 1.6 });
  s.text(232, 140, '2. Invoices assigned', { size: 12, anchor: 'start' });
  s.arrow(200, 214, 90, 92, { sw: 1.6, color: 'green' });
  s.text(20, 180, '3. Cash advanced', { size: 12, anchor: 'start', color: 'green' });
  s.arrow(440, 90, 340, 208, { sw: 1.6, color: 'blue' });
  s.text(400, 175, '4. Customers pay factor', { size: 12, anchor: 'start', color: 'blue' });
  return s.visual('Factoring triangle: (1) the firm sells goods on credit to customers; (2) it assigns the invoices to a factor; (3) the factor advances cash to the firm at once; (4) customers later pay the factor, which keeps its commission and pays the firm the balance', 'The factor stands between the firm and its customers.');
})();
const vFactorEx = table(
  ['Step (imagined: Mysuru Silk House)', 'Working', 'Result'],
  [
    ['Advance at 80 per cent', `${inr(FAC.book)} × 0.8`, `₹${inr(FAC.advance)}`],
    ['Commission at 2 per cent', `${inr(FAC.book)} × 0.02`, `₹${inr(FAC.fee)}`],
    ['Cash received now', `${inr(FAC.advance)} − ${inr(FAC.fee)}`, `₹${inr(FAC.net)}`],
  ],
  'Worked table: on ten lakh rupees of receivables a factor advances eighty per cent, eight lakh rupees, and deducts a two per cent commission of twenty thousand rupees, so the firm receives seven lakh eighty thousand rupees now',
  'The balance (less any interest) is paid when customers settle.',
);
const vIcd = table(
  ['Inter-corporate deposits', 'Points'],
  [
    ['Meaning', 'Unsecured short-term deposits by a company with surplus cash in another company'],
    ['Kinds', 'Call deposits (short notice), three-month and six-month deposits'],
    ['For the borrower', 'Quick, few formalities, no security'],
    ['Against', 'Often costly; uncertain availability; risky for the lender as unsecured'],
  ],
  'Table summarising inter-corporate deposits: meaning, kinds, advantages and drawbacks',
);
const vInst = table(
  ['Step (imagined: Bastar Bell Metal Crafts)', 'Working', 'Result'],
  [
    ['Down payment at 20 per cent', `${inr(INST.price)} × 0.2`, `₹${inr(INST.downAmt)}`],
    ['Balance', `${inr(INST.price)} − ${inr(INST.downAmt)}`, `₹${inr(INST.balance)}`],
    ['Flat interest, 10 per cent for 2 years', `${inr(INST.balance)} × 0.1 × 2`, `₹${inr(INST.interest)}`],
    ['Monthly instalment', `(${inr(INST.balance)} + ${inr(INST.interest)}) ÷ 24`, `₹${inr(INST.emi)}`],
  ],
  'Worked table: a nine lakh rupee furnace with twenty per cent down leaves seven lakh twenty thousand; flat interest at ten per cent for two years adds one lakh forty-four thousand; twenty-four equal instalments are thirty-six thousand rupees each',
  'Flat interest is charged on the original balance for the whole period.',
);
const vChooser = table(
  ['If the firm…', 'A suitable short-term source'],
  [
    ['has a current account and a few days\' gap', 'Overdraft'],
    ['carries seasonal stock', 'Cash credit against stock'],
    ['holds customers\' accepted bills', 'Discounting of bills'],
    ['sells on open credit to many buyers', 'Factoring'],
    ['makes goods to order', 'Customer advances'],
    ['belongs to a group with spare cash', 'Inter-corporate deposit'],
    ['needs an asset it cannot pay for at once', 'Instalment credit'],
  ],
  'Decision table matching seven situations to a suitable short-term source',
);
const vSummary1 = table(
  ['Source', 'Key point'],
  [['Overdraft', 'Draw beyond balance; interest on amount overdrawn'], ['Cash credit', 'Secured limit; interest on amount drawn'], ['Short-term loan', 'Lump sum; interest on whole amount'], ['Bill discounting', 'Cash now for a bill, less discount'], ['Public deposits', 'From the public; simple but short and unsecured']],
  'Summary table of Part 1: bank facilities and public deposits',
);
const vSummary2 = table(
  ['Source', 'Key point'],
  [['Trade credit', 'From suppliers; convenient; risk of overtrading'], ['Customer advances', 'From buyers; interest-free; made-to-order goods'], ['Factoring', 'Receivables sold for cash; fee charged'], ['ICDs', 'Company-to-company, unsecured, short'], ['Instalment credit', 'Down payment plus instalments with interest']],
  'Summary table of Part 2: trade credit, customer advances, factoring, inter-corporate deposits and instalment credit',
);
const vCaseSteps = flow('LR', ['Spot who gives the money', 'Name the source', 'Give a merit or risk'], 'Three steps for case questions: spot who gives the money, name the source, and give a merit or risk');

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Short-term Sources — Part 1: Commercial Banks and Public Deposits',
  goals: [
    'Explain overdraft, cash credit, short-term loans and discounting of bills',
    'Compare the cost of a cash credit with a lump-sum loan',
    'State the meaning, advantages and disadvantages of public deposits',
  ],
  slides: [
    sl('title', 'Short-term Sources of Funds', {
      b: 'Part 1: how **commercial banks** meet short-term needs, and what **public deposits** offer.',
      v: vRoute1,
      n: 'Long term funds build factories. Short term funds keep them running: buying materials, paying wages and carrying stock until customers pay. In this part we meet the four ways a bank helps, and the deposits a company can take directly from the public.',
    }),
    sl('concept', 'Why short-term funds?', {
      b: 'Short-term funds finance needs that last **less than a year**: mostly **working capital**.',
      v: vWhy,
      n: 'Short term needs come and go within a year. A knitwear exporter buys yarn before each shipment. A cable maker pays wages while dealers take sixty days to pay. A wholesaler carries stock for hundreds of shops. These needs are best met from short term sources.',
    }),
    sl('concept', 'Four forms of bank assistance', {
      v: vBank,
      n: 'Banks help in four main ways. An overdraft lets a current account holder draw beyond the balance. Cash credit is a limit secured on stock. A short term loan is a lump sum credited at once. And discounting turns a customer\'s bill into cash before it is due.',
    }),
    sl('check', 'Quick check: drawing beyond the balance', {
      b: 'A trader with ₹40,000 in a current account is allowed to pay a ₹1,50,000 cheque. This is…',
      chk: 'm_od',
      n: 'Which facility lets a current account go below zero?',
    }),
    sl('example', 'Worked example 1: cash credit or loan?', {
      b: `An imagined paper company needs up to ₹${inr(CC.limit)} for a month but uses ₹${inr(CC.used)} on average.`,
      bl: ['Step 1: under a **loan**, interest runs on the **whole amount**.', 'Step 2: under **cash credit**, interest runs on the **amount used**.', 'Step 3: compare.'],
      v: vCcEx,
      n: 'With a lump sum loan the company pays interest on all ten lakh rupees, ten thousand rupees for the month. With cash credit it pays only on the six lakh it actually uses, six thousand rupees. Cash credit saves four thousand rupees when needs go up and down.',
    }),
    sl('check', 'Quick check: security for cash credit', {
      b: 'True or false: cash credit is usually secured on stock or receivables.',
      chk: 'tf_cc_security',
      n: 'What does the bank hold as cover for the limit?',
    }),
    sl('diagram', 'Discounting a bill', {
      v: vBill,
      n: 'A customer accepts a bill promising to pay in ninety days. The firm needs cash sooner, so it discounts the bill with its bank, which pays the face value less a discount. On the due date the bank collects the full amount from the customer. The discount is the bank\'s reward for waiting.',
    }),
    sl('example', 'Worked example 2: how much cash now?', {
      b: `An imagined auto-parts firm discounts a ₹${inr(BILL.face)} bill due in 3 months at 12 per cent a year.`,
      bl: ['Step 1: discount = face value × rate × months ÷ 12.', 'Step 2: cash = face value − discount.'],
      v: vBillEx,
      n: 'Twelve per cent a year for three months is three per cent of two lakh rupees, or six thousand rupees. The firm receives one lakh ninety four thousand rupees today, and the bank collects two lakh rupees from the customer at maturity.',
    }),
    sl('two-column', 'Bank finance: for and against', {
      cols: ['**For**\n\nFlexible drawing and repaying; timely; confidential; simple renewal.', '**Against**\n\nSecurity and stock statements; yearly renewal may be refused; interest cost.'],
      v: table(['For', 'Against'], [['Draw and repay as needs change', 'Security and monitoring'], ['Funds quickly once a limit is set', 'Limit may not be renewed'], ['Plans stay private', 'Interest and charges']], 'Table of three advantages and three disadvantages of short-term bank finance'),
      n: 'Bank finance is flexible: firms draw and repay as their needs change, and dealings stay private. But banks want security and regular stock statements, limits must be renewed each year, and interest must be paid.',
    }),
    sl('concept', 'Public deposits', {
      b: 'A company may invite **deposits directly from the public** for short periods, usually paying more than banks do.',
      v: vPd,
      n: 'Well known companies can borrow directly from the public through deposits. The procedure is simple, the cost is often below bank rates, and depositors get no vote and no charge on assets. But deposits are short, unsecured for depositors, and only trusted companies can raise them.',
    }),
    sl('check', 'Quick check: public deposits', {
      b: 'Public deposits as a source of finance are…',
      chk: 'm_pd_meaning',
      n: 'Who places the money, and with whom?',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up. Overdraft and cash credit charge interest only on what is used; a short term loan charges on the whole amount. Discounting turns bills into cash now. Public deposits are simple and cheap for trusted companies, but short and unsecured.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Say **what interest is charged on** when comparing overdraft, cash credit and loan.', 'In discounting sums, convert the yearly rate for the **months** involved.', 'Public deposits are **unsecured** and **short**: never recommend them for a long project.'],
      v: vCaseSteps,
      n: 'Some tips. When comparing bank facilities, always say what interest is charged on. In discounting sums, scale the yearly rate to the months. And never recommend public deposits for a long project, because they are short and may be withdrawn.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Short-term Sources — Part 2: Trade Credit, Advances, Factoring, ICDs and Instalment Credit',
  goals: [
    'State the merits and demerits of trade credit and customer advances',
    'Explain how factoring converts receivables into cash and evaluate it',
    'Describe inter-corporate deposits and instalment credit',
  ],
  slides: [
    sl('title', 'More Short-term Sources', {
      b: 'Part 2: credit from **suppliers**, money from **buyers**, **factoring**, **inter-corporate deposits** and **instalment credit**.',
      v: vRoute2,
      n: 'In this part we look beyond banks. Suppliers and customers can finance a firm. A factor can turn its debtors into cash. Another company can lend its spare money. And a seller can let the firm pay for an asset in instalments.',
    }),
    sl('two-column', 'Trade credit and customer advances', {
      cols: ['**Trade credit**\n\nSuppliers let the firm pay later for goods received.', '**Customer advances**\n\nBuyers pay part of the price before delivery.'],
      v: vTc,
      n: 'Trade credit comes from suppliers: the firm takes goods now and pays later. It is convenient and needs no security, but easy credit can tempt a firm to overtrade. Customer advances come from buyers, mostly for goods made to order. They cost no interest and confirm the sale, but late delivery may bring penalties.',
    }),
    sl('check', 'Quick check: paying the supplier later', {
      b: 'A bangle workshop gets beads now and pays 45 days later. This source is…',
      chk: 'm_tc',
      n: 'Who is giving the credit here?',
    }),
    sl('example', 'Worked example 1: who finances whom?', {
      b: 'Three imagined firms and their short-term sources.',
      bl: ['Step 1: ask **who gives the money**: supplier or buyer?', 'Step 2: name the source.', 'Step 3: note why it fits, or how it was misused.'],
      v: vTcEx,
      n: 'The bangle workshop is financed by its bead supplier through trade credit, and sells its bangles before paying. The boiler maker is financed by its buyers through advances, because each boiler is made to order. The wholesaler misused trade credit and overtraded.',
    }),
    sl('diagram', 'How factoring works', {
      b: '**Factoring:** the firm assigns its **receivables** to a factor, which pays most of their value **at once** and collects from customers for a **fee**.',
      v: vFactor,
      n: 'The firm sells on credit, then assigns its invoices to a factor. The factor advances most of their value at once. Later, customers pay the factor, which keeps its commission and interest and pays the firm the balance. Under non recourse factoring, the factor also bears bad debts.',
    }),
    sl('example', 'Worked example 2: cash from factoring', {
      b: `An imagined silk house factors ₹${inr(FAC.book)} of receivables: 80 per cent advance, 2 per cent commission.`,
      bl: ['Step 1: advance = receivables × 80 per cent.', 'Step 2: commission = receivables × 2 per cent.', 'Step 3: cash now = advance − commission.'],
      v: vFactorEx,
      n: 'The factor advances eight lakh rupees and deducts its two per cent commission of twenty thousand rupees, so the firm receives seven lakh eighty thousand rupees at once. It gets the remaining value, less any interest, when the boutiques pay.',
    }),
    sl('check', 'Quick check: factoring', {
      b: 'Under factoring, a business…',
      chk: 'm_factor',
      n: 'What does the business hand over, and what does it get back?',
    }),
    sl('concept', 'Inter-corporate deposits', {
      v: vIcd,
      n: 'Companies with spare cash often lend it, unsecured, to other companies for short periods. These inter corporate deposits may be call deposits, recallable at very short notice, or deposits for three or six months. They are quick and simple for the borrower, but often costly and uncertain, and risky for the lender.',
    }),
    sl('concept', 'Instalment credit', {
      b: '**Instalment credit:** pay a **down payment**, use the asset at once, and pay the **balance with interest** in instalments.',
      v: table(['Point', 'Instalment credit'], [['Use', 'Asset used from day one'], ['Cost', 'Interest makes it dearer than cash'], ['Risk', 'Under hire purchase, missed instalments may lead to repossession'], ['Ownership', 'Hire purchase: on the last instalment; instalment sale: at once']], 'Table of the use, cost, risk and ownership features of instalment credit'),
      n: 'Instalment credit lets a small firm use a machine before it has paid for it. It pays a down payment and then fixed instalments that include interest. It is convenient, but costlier than paying cash. Under hire purchase the seller remains owner until the last instalment and may take the asset back if payments stop.',
    }),
    sl('example', 'Worked example 3: the monthly instalment', {
      b: `An imagined metal-craft unit buys a ₹${inr(INST.price)} furnace: 20 per cent down, flat interest 10 per cent a year, 24 instalments.`,
      bl: ['Step 1: balance = price − down payment.', 'Step 2: flat interest = balance × rate × years.', 'Step 3: instalment = (balance + interest) ÷ number of instalments.'],
      v: vInst,
      n: 'The unit pays one lakh eighty thousand rupees down, leaving seven lakh twenty thousand. Flat interest at ten per cent for two years adds one lakh forty four thousand. Dividing the total by twenty four gives thirty six thousand rupees a month.',
    }),
    sl('check', 'Quick check: paying over time', {
      b: 'A craft unit pays ₹1.8 lakh now and the rest of a furnace\'s price, with interest, over 24 months. This is…',
      chk: 'm_inst',
      n: 'The asset is used now and paid for in parts.',
    }),
    sl('concept', 'Choosing a short-term source', {
      v: vChooser,
      n: 'Here is a quick guide. A few days\' gap suits an overdraft. Seasonal stock suits cash credit. Accepted bills can be discounted. Open credit sales to many buyers suit factoring. Made to order goods attract advances. Group companies with spare cash can place deposits. And an asset can be bought on instalments.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up. Suppliers give trade credit and buyers give advances. Factoring turns receivables into cash for a fee. Inter corporate deposits are short, unsecured loans between companies. Instalment credit lets a firm use an asset while paying for it, at an interest cost.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Ask **who gives the money**: bank, public, supplier, buyer, factor, another company or seller.', 'For factoring, mention **recourse or non-recourse** when bad debts are mentioned.', 'For ICDs, stress **unsecured** and **short**.', 'Lay out instalment sums **step by step**.'],
      v: vCaseSteps,
      n: 'Final tips. In every case, ask who is providing the money; that usually names the source. Mention recourse when a case talks about bad debts. Remember that inter corporate deposits are unsecured and short. And set out every calculation step by step.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Short-term Sources of Funds — notes',
  sections: [
    {
      h: '1. Short-term assistance from commercial banks',
      t: 1,
      b: 'Short-term funds (for less than a year) mainly finance **working capital**.\n\n- **Overdraft:** a current-account holder may draw more than the balance, up to an agreed limit; interest is charged on the amount overdrawn for the period used.\n- **Cash credit:** a borrowing limit against security (hypothecation or pledge of stock, or receivables); the borrower draws and repays within the limit; interest on the amount drawn.\n- **Short-term loan:** a lump sum credited to the borrower\'s account; interest on the whole amount from the start; repaid in one sum or instalments.\n- **Discounting of bills:** the bank pays the value of an accepted bill before maturity, less a discount, and collects it on the due date.\n\n**Merits:** flexible; timely; confidential; easy renewal; no dilution of control.\n**Demerits:** security and monitoring; uncertain renewal; interest and charges; limits based on the bank\'s judgement.',
      terms: [['Overdraft', 'Drawing beyond the balance in a current account up to a limit.'], ['Cash credit', 'A secured borrowing limit; interest on the amount drawn.'], ['Discounting of bills', 'Getting a bill\'s value before maturity, less a discount.']],
      v: vBank,
      vs: [vWhy, vCcEx, vBill, vBillEx],
    },
    {
      h: '2. Public deposits, trade credit and customer advances',
      t: 2,
      b: '**Public deposits:** deposits a company invites directly from the public for short periods, usually at rates above bank deposits. *Advantages:* simple procedure; often cheaper than bank borrowing; no charge on assets; no dilution of control; interest is tax-deductible. *Disadvantages:* short period; only well-known companies can raise them; may be withdrawn in bad times; unsecured for depositors; subject to legal limits and rules.\n\n**Trade credit:** credit allowed by suppliers on the purchase of goods. *Advantages:* convenient and continuous; no security; links finance to sales. *Disadvantages:* may lead to overtrading; limited amount; may cost cash discounts or higher prices.\n\n**Customer advances:** part of the price paid by buyers before delivery, mainly for made-to-order or scarce goods. *Advantages:* interest-free; sure sale. *Disadvantages:* possible only in some businesses; penalties for late delivery; price fixed in advance.',
      terms: [['Public deposits', 'Short-term deposits raised by a company directly from the public.'], ['Trade credit', 'Credit allowed by suppliers on purchases.'], ['Overtrading', 'Doing more business than the firm\'s funds can support.']],
      v: vPd,
      vs: [vTc, vTcEx],
    },
    {
      h: '3. Factoring, inter-corporate deposits and instalment credit',
      t: 3,
      b: '**Factoring:** a financial service in which a **factor** buys or finances a firm\'s **receivables**, advances most of their value at once, collects from debtors and charges a commission. *With recourse:* the client bears bad debts. *Without recourse (non-recourse):* the factor bears them. *Services:* finance against receivables, collection, credit information, sales-ledger maintenance, protection against bad debts. *Merits:* immediate cash; saves collection effort; credit protection. *Demerits:* cost; customers may dislike an outside agency; sensitive information shared.\n\n**Inter-corporate deposits (ICDs):** unsecured short-term deposits placed by a company with surplus funds in another company. *Kinds:* call deposits (withdrawable at short notice), three-month and six-month deposits. *Merits:* quick, few formalities. *Demerits:* often costly; uncertain; risky for the lender.\n\n**Instalment credit:** the buyer pays a down payment and the balance with interest in instalments, using the asset meanwhile. Under hire purchase, ownership passes on the last instalment. *Merits:* use without full payment. *Demerits:* interest cost; risk of repossession.',
      terms: [['Factoring', 'Selling or financing receivables through a factor for a fee.'], ['Non-recourse factoring', 'The factor bears bad debts.'], ['Inter-corporate deposit', 'Unsecured short-term deposit by one company with another.'], ['Down payment', 'The part of the price paid at purchase under instalment credit.']],
      v: vFactor,
      vs: [vFactorEx, vIcd, vInst, vChooser],
    },
  ],
  tips: '**Common mistakes**\n- Saying interest on cash credit is charged on the full limit.\n- Recommending public deposits or ICDs for long-term projects.\n- Mixing up trade credit (from suppliers) and customer advances (from buyers).\n- Saying factoring is free, or forgetting recourse when bad debts are mentioned.\n\n**How marks are usually awarded**\n- 1 mark: correct option, term or figure.\n- 2–3 marks: source named, explained and linked to the firm; or bases of distinction for both sides.\n- 5 marks: parts answered separately; merits and demerits balanced; calculations step by step.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Short-term funds mainly finance…', 'Working capital (needs of under a year).', 'concept', 1],
  ['**Overdraft**', 'Draw beyond the current-account balance up to a limit; interest on the amount overdrawn.', 'definition', 1],
  ['**Cash credit**', 'Borrowing limit secured on stock or receivables; interest on the amount drawn.', 'definition', 1],
  ['**Short-term loan** vs cash credit', 'Loan: interest on the whole sum. Cash credit: on the amount used.', 'exam-tip', 1],
  ['**Discounting of bills**', 'Bank pays a bill\'s value before maturity, less a discount.', 'definition', 1],
  ['Discount formula', 'Face value × yearly rate × months ÷ 12.', 'formula', 1],
  ['Who collects a discounted bill at maturity?', 'The bank.', 'fact', 1],
  ['Two drawbacks of bank finance', 'Security and monitoring; uncertain renewal.', 'exam-tip', 1],
  ['**Public deposits**', 'Deposits raised by a company directly from the public, short period.', 'definition', 2],
  ['Who can raise public deposits easily?', 'Well-known companies with a sound record.', 'fact', 2],
  ['Risk to a public depositor', 'Deposits are usually unsecured.', 'fact', 2],
  ['**Trade credit**', 'Credit allowed by suppliers on purchases.', 'definition', 2],
  ['Main danger of easy trade credit', 'Overtrading.', 'exam-tip', 2],
  ['Hidden cost of trade credit', 'Lost cash discounts.', 'concept', 2],
  ['**Customer advances**', 'Part of the price paid by buyers before delivery.', 'definition', 2],
  ['Where are customer advances common?', 'Made-to-order or scarce goods.', 'fact', 2],
  ['Trade credit vs customer advances', 'From suppliers vs from buyers.', 'exam-tip', 2],
  ['**Factoring**', 'A factor buys or finances receivables, pays at once and collects for a fee.', 'definition', 3],
  ['Recourse vs non-recourse factoring', 'Client bears bad debts vs factor bears them.', 'concept', 3],
  ['Services of a factor', 'Finance, collection, credit information, ledger keeping, bad-debt cover.', 'fact', 3],
  ['Factoring suits…', 'Firms with large credit sales to many buyers.', 'exam-tip', 3],
  ['Drawbacks of factoring', 'Cost; customers may dislike an outside agency.', 'fact', 3],
  ['**Inter-corporate deposit**', 'Unsecured short-term deposit by one company with another.', 'definition', 3],
  ['Three kinds of ICDs', 'Call, three-month, six-month.', 'fact', 3],
  ['Risk of ICDs for the lender', 'They are unsecured.', 'exam-tip', 3],
  ['**Instalment credit**', 'Down payment, then balance plus interest in instalments.', 'definition', 3],
  ['Hire purchase: when does ownership pass?', 'On payment of the last instalment.', 'fact', 3],
  ['Flat-interest instalment', '(Balance + balance × rate × years) ÷ number of instalments.', 'formula', 3],
  ['Choose: accepted bills, need cash now', 'Discounting of bills.', 'exam-tip', 1],
  ['Choose: made-to-order goods', 'Customer advances.', 'exam-tip', 2],
]);

// ---------------------------------------------------------------- tests (ISC class defaults, item for item)
const T_SHORT = test({
  kind: 'short',
  blueprint: 'isc-12-default-chapter-test-short',
  title: 'Chapter test (short) — Short-term Sources of Funds',
  duration: 50,
  sections: [
    { id: 'A', title: 'Section A - Objective (5 marks)', instr: 'Answer all questions. Multiple-choice and assertion-reason items carry 1 mark each.', items: ['m_cc', 'm_discount', 'm_tc_risk', 'm_icd', 'ar_factor'] },
    { id: 'B', title: 'Section B - Short answer (4 marks)', instr: 'Answer both questions. Internal choice in the second question.', items: ['s_od_cc', { attempt: 1, keys: ['s_tc_merits', 's_icd'] }] },
    { id: 'C', title: 'Section C - Short answer (6 marks)', instr: 'Answer both questions. Internal choice in the second question.', items: ['s3_bank_forms', { attempt: 1, keys: ['s3_adv', 's3_factor_eval'] }] },
    { id: 'D', title: 'Section D - Long answer (5 marks)', instr: 'Answer the question. It is set in parts.', items: ['l_factor_icd'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'isc-12-default-chapter-test-long',
  title: 'Chapter test (long) — Short-term Sources of Funds',
  duration: 100,
  sections: [
    { id: 'A', title: 'Section A - Objective (12 marks)', instr: 'Answer all questions. Multiple-choice and assertion-reason items carry 1 mark each.', items: ['m_stloan', 'm_bank_pqrs', 'm_pd_unsecured', 'm_adv', 'm_factor_recourse', 'm_icd_call', 'm_disc_collect', 'm_pd_who', 'm_tc_amount', 'm_factor_suit', 'ar_od_interest', 'ar_icd'] },
    { id: 'B', title: 'Section B - Short answer (6 marks)', instr: 'Answer all three questions. Internal choice in the last question.', items: ['s_bank_merits', 's_pd_merits', { attempt: 1, keys: ['s_factor_services', 's_disc'] }] },
    { id: 'C', title: 'Section C - Short answer (12 marks)', instr: 'Answer all four questions. Internal choice in the last question.', items: ['s3_bank_limits', 's3_pd_limits', 's3_inst', { attempt: 1, keys: ['s3_tc_vs_adv', 's3_choose'] }] },
    { id: 'D', title: 'Section D - Long answer (10 marks)', instr: 'Answer both questions. Internal choice in the second question. Each is set in parts.', items: ['l_bank', { attempt: 1, keys: ['l_tc_adv', 'l_pd'] }] },
  ],
});
if (T_SHORT.total_marks !== 20 || T_LONG.total_marks !== 40) throw new Error(`test marks ${T_SHORT.total_marks} / ${T_LONG.total_marks}`);

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t03 of isc-12-commerce-ch04 (overdraft, cash credit, short-term loans and discounting of bills; public deposits, trade credit and customer advances; factoring, inter-corporate deposits and instalment credit)',
    originality: 'every firm, person, figure and case is imagined and written by SOYL and labelled; no ISC or CBSE textbook text, illustration or exercise and no CISCE specimen or board item reused (D-036)',
    data: `figures computed in the build and asserted: bill discount ₹${inr(BILL.discount)} (cash ₹${inr(BILL.paid)}), cash-credit saving ₹${inr(CC.intLoan - CC.intUsed)}, factoring cash ₹${inr(FAC.net)}, instalment ₹${inr(INST.emi)}; all rates are imagined round numbers`,
    facts: 'no current interest rates, deposit ceilings or regulatory limits are stated; public deposits are described as subject to legal limits without figures',
    gate: 'schema, pipeline lint, deterministic verify, word limits, narration and answer-leak checks run clean in this build',
  },
});
