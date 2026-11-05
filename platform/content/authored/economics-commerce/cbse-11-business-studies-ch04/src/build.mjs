// Build CBSE 11 Business Studies ch04 Business Services. Run from platform/:
//   npx tsx content/authored/economics-commerce/cbse-11-business-studies-ch04/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from '../../cbse-11-business-studies-ch01/src/lib.mjs';

setUnit('cbse-11-business-studies-ch04', 'economics-commerce');
const { fmt, OD, BILL, RD, POOL, FIRE, CONT, SUB, CONS, RECEIPT } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- SVG helpers
// A labelled box that refuses text wider than the box (same width estimate as the label check).
function box(s, x, y, w, h, lines, o = {}) {
  s.rect(x, y, w, h, { fill: o.fill ?? 'fill', fillOpacity: o.fillOpacity, color: o.color ?? 'muted', sw: o.sw ?? 1.6, rx: o.rx ?? 8 });
  const n = lines.length;
  const gap = o.gap ?? 18;
  const y0 = y + h / 2 - ((n - 1) * gap) / 2;
  lines.forEach(([t, size = 12, bold = false, muted = false], i) => {
    if (t.length * size * 0.52 > w - 8) throw new Error(`label too wide for its box: ${t}`);
    s.text(x + w / 2, y0 + i * gap, t, { size, bold, muted });
  });
}

// ---------------------------------------------------------------- SVG visuals
const vTree = (() => {
  const s = new Svg(740, 270);
  const cw = 170, gap = 15, left = 12, top = 90;
  const cx = (i) => left + i * (cw + gap) + cw / 2;
  box(s, 270, 10, 200, 38, [['Banks in India', 14, true]], { fill: 'accent', fillOpacity: 0.18, color: 'accent', sw: 2 });
  s.line(370, 48, 370, 70, {});
  s.line(cx(0), 70, cx(3), 70, {});
  ['Commercial banks', 'Cooperative banks', 'Specialised banks', 'Central bank'].forEach((t, i) => {
    s.line(cx(i), 70, cx(i), top, {});
    box(s, left + i * (cw + gap), top, cw, 40, [[t, 13, true]], { color: i === 3 ? 'accent' : 'muted', sw: i === 3 ? 2 : 1.6 });
  });
  ['Public sector', 'Private sector', 'Foreign'].forEach((t, i) => {
    s.line(cx(0), top + 40, cx(0), 150 + i * 36 + 15, { dash: true, color: 'muted', sw: 1.2 });
    box(s, left + 10, 150 + i * 36, 150, 30, [[t, 12]], { rx: 6, sw: 1.3 });
  });
  ['Export-import bank', 'Rural development bank', 'Small industry bank'].forEach((t, i) => {
    s.line(cx(2), top + 40, cx(2), 150 + i * 36 + 15, { dash: true, color: 'muted', sw: 1.2 });
    box(s, left + 2 * (cw + gap) + 10, 150 + i * 36, 150, 30, [[t, 12]], { rx: 6, sw: 1.3 });
  });
  [['Owned by members;', 'serve farmers and', 'small borrowers'], ['Reserve Bank of India:', 'banker to government', 'and banks; regulator']].forEach((ls, k) => {
    const i = k === 0 ? 1 : 3;
    ls.forEach((t, j) => s.text(cx(i), 160 + j * 18, t, { size: 12, muted: true }));
  });
  return s.visual('Tree of banks in India: commercial banks with public sector, private sector and foreign banks; cooperative banks; specialised banks such as an export-import bank, a rural development bank and a small industry bank; and the central bank, the Reserve Bank of India', 'Four groups of banks; commercial banks have three kinds.');
})();

const vWeb = (() => {
  const s = new Svg(700, 340);
  box(s, 250, 140, 200, 60, [['Commercial bank', 14, true], ['functions', 12, false, true]], { fill: 'accent', fillOpacity: 0.18, color: 'accent', sw: 2 });
  s.line(222, 60, 285, 140, {}); s.line(478, 60, 415, 140, {}); s.line(222, 166, 250, 168, {}); s.line(478, 166, 450, 168, {}); s.line(350, 262, 350, 200, {});
  const items = [
    [12, 14, 'Accepting deposits', 'current, savings, fixed, recurring'],
    [478, 14, 'Lending', 'overdraft, loans, bill discounting'],
    [12, 134, 'Cheques and instruments', 'pay without carrying cash'],
    [478, 134, 'Remittance of funds', 'drafts and transfers'],
    [245, 262, 'Allied services', 'lockers, bills, collection'],
  ];
  items.forEach(([x, y, a, b]) => box(s, x, y, x === 245 ? 210 : 210, 64, [[a, 13, true], [b, 11, false, true]], { gap: 20 }));
  return s.visual('Web of the five functions of a commercial bank: accepting deposits, lending, cheques and payment instruments, remittance of funds, and allied services such as lockers, bill payment and collection', 'Five functions around the commercial bank.');
})();

const vPay = (() => {
  const s = new Svg(752, 250);
  const w = 132, gap = 18, left = 10, top = 30, h = 50;
  const names = ['Customer', "Customer's bank", 'Payment system', "Beneficiary's bank", 'Beneficiary'];
  const steps = [['1. Sends instruction', 'with a secret code'], ['2. Checks, then debits', 'the account'], ['3. Carries the', 'payment message'], ['4. Credits the', "beneficiary's account"], ['5. Receives the money', 'and a confirmation']];
  names.forEach((t, i) => {
    const x = left + i * (w + gap);
    box(s, x, top, w, h, [[t, 12, true]], { fill: i === 2 ? 'accent' : 'fill', fillOpacity: i === 2 ? 0.16 : undefined, color: i === 2 ? 'accent' : 'muted', sw: 1.8 });
    steps[i].forEach((l, k) => s.text(x + w / 2, top + h + 26 + k * 18, l, { size: 11, muted: true }));
    if (i < 4) s.arrow(x + w + 2, top + h / 2, x + w + gap - 2, top + h / 2, { sw: 1.8 });
  });
  s.text(376, 170, 'Instant systems finish steps 2 to 4 within moments; batch systems wait for a batch.', { size: 12 });
  s.text(376, 196, 'Names and features of the systems are dated as of 2024.', { size: 12, muted: true });
  return s.visual("Flow of an electronic payment: the customer sends an instruction with a secret code, the customer's bank checks and debits the account, the payment system carries the message, the beneficiary's bank credits the account, and the beneficiary receives the money and a confirmation", 'Customer, bank, payment system, beneficiary.');
})();

const vPrinciples = (() => {
  const s = new Svg(740, 226);
  s.text(370, 14, 'Seven principles of insurance', { size: 14, bold: true });
  const items = [
    ['Utmost good faith', 'Disclose every', 'material fact'],
    ['Insurable interest', 'A financial stake in', 'the subject insured'],
    ['Indemnity', 'Actual loss, no profit;', 'not for life insurance'],
    ['Proximate cause', 'Nearest effective cause', 'must be an insured risk'],
    ['Subrogation', 'Insurer takes over the', "insured's right to recover"],
    ['Contribution', 'Insurers share a loss', 'when policies overlap'],
    ['Mitigation of loss', 'Insured must try to', 'limit the loss'],
  ];
  items.forEach(([a, b, c], i) => {
    const row = i < 4 ? 0 : 1;
    const n = row === 0 ? 4 : 3;
    const x0 = (740 - (n * 170 + (n - 1) * 14)) / 2;
    const k = row === 0 ? i : i - 4;
    box(s, x0 + k * 184, 30 + row * 98, 170, 82, [[a, 13, true], [b, 11, false, true], [c, 11, false, true]], { gap: 19, color: i === 0 ? 'accent' : 'muted', sw: i === 0 ? 2 : 1.5 });
  });
  return s.visual('Chart of seven principles of insurance: utmost good faith, insurable interest, indemnity, proximate cause, subrogation, contribution and mitigation of loss, each with a one-line meaning', 'Seven principles, one line each.');
})();

const vWareFn = (() => {
  const s = new Svg(720, 306);
  box(s, 290, 120, 140, 64, [['Warehouse', 14, true]], { fill: 'accent', fillOpacity: 0.18, color: 'accent', sw: 2 });
  const left = [['Consolidation', 'Small lots joined into', 'full transport loads'], ['Break-bulk', 'Large lot split into', 'small retail orders'], ['Stockpiling', 'Goods held until', 'demand rises']];
  const right = [['Value-added services', 'Packing, grading and', 'labelling'], ['Price stabilisation', 'Stock released to', 'even out price swings'], ['Financing', 'Receipt is security', 'for a loan']];
  left.forEach(([a, b, c], i) => { const y = 14 + i * 106; s.line(220, y + 32, 290, 152, {}); box(s, 10, y, 210, 64, [[a, 13, true], [b, 11, false, true], [c, 11, false, true]], { gap: 17 }); });
  right.forEach(([a, b, c], i) => { const y = 14 + i * 106; s.line(500, y + 32, 430, 152, {}); box(s, 500, y, 210, 64, [[a, 13, true], [b, 11, false, true], [c, 11, false, true]], { gap: 17 }); });
  return s.visual('Web of six functions of a warehouse: consolidation, break-bulk, stockpiling, value-added services, price stabilisation and financing against a warehouse receipt', 'Six functions around the warehouse.');
})();

// ---------------------------------------------------------------- tables and flows
const vRoute1 = flow('LR', ['Business services', 'Types of banks', 'Bank functions', 'E-banking', 'Benefits and risks'], 'Route map of Part 1: business services, types of banks, functions of banks, e-banking, benefits and risks', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Insurance and pooling', 'Principles', 'Life, fire, marine', 'Post and courier', 'Warehousing'], 'Route map of Part 2: insurance and risk pooling, principles of insurance, life, fire and marine insurance, postal and courier services, warehousing', 'Part 2 at a glance');
const vServices = table(['Characteristic', 'What it means'], [
  ['Intangible', 'Cannot be touched; there is no stock to hold'],
  ['Inseparable', 'Produced and used at the same moment'],
  ['Customer involvement', 'The customer takes part in the process'],
  ['Example', 'Banking, insurance, post, warehousing, transport'],
], 'Table of the characteristics of business services: intangible, inseparable and needing customer involvement, with examples such as banking, insurance, post and warehousing');
const vCommercial = table(['Kind of commercial bank', 'Main idea'], [
  ['Public sector', 'Government holds the major stake'],
  ['Private sector', 'Owned by private shareholders'],
  ['Foreign', 'Head office abroad; works through branches here'],
], 'Table of commercial banks: public sector, private sector and foreign banks with their main idea');
const vOther = table(['Bank', 'Role'], [
  ['Cooperative bank', 'Owned by members; helps farmers and small borrowers'],
  ['Specialised bank', 'One sector: foreign trade, agriculture, small industry'],
  ['Central bank', 'Banker to the government and to banks; regulator'],
], 'Table of cooperative, specialised and central banks with their roles');
const vDeposits = table(['Deposit', 'Who and how'], [
  ['Current', 'Traders; many transactions; usually no interest'],
  ['Savings', 'Households; interest; withdrawals restricted'],
  ['Fixed (term)', 'Lump sum kept for a fixed period'],
  ['Recurring', 'Fixed instalment every month'],
], 'Table of four kinds of deposit accounts: current, savings, fixed and recurring, with who uses them and how');
const vWhichDeposit = table(['Imagined customer', 'Need', 'Best deposit'], [
  ['Farida, shopkeeper', 'Daily takings, many cheques', 'Current'],
  ['Salma, clerk', `Rs ${fmt(RD.monthly)} every month for ${RD.months} months, Rs ${fmt(RD.total)} in all`, 'Recurring'],
  ['Isha, dentist', 'One big sum idle for two years', 'Fixed'],
  ['Ravi, student', 'Small savings, occasional withdrawals', 'Savings'],
], 'Worked example table matching four imagined customers to deposit accounts: shopkeeper to current, clerk to recurring, dentist to fixed and student to savings', 'Match the need to the account.');
const vLending = table(['Facility', 'Idea'], [
  ['Overdraft', 'Pay out more than the balance, up to a limit'],
  ['Cash credit', 'Draw as needed against stock, up to a limit'],
  ['Loan or advance', 'One sum for a purpose, repaid in instalments'],
  ['Discounting a bill', 'Cash now for a bill due later, less a deduction'],
], 'Table of four lending facilities: overdraft, cash credit, loans and advances, and discounting of bills of exchange');
const vLendEx = table(['Imagined case', 'Working', 'Answer'], [
  ['Overdraft', `Cheques ${fmt(OD.cheques)} minus balance ${fmt(OD.balance)}`, `Rs ${fmt(OD.over)} overdrawn, within the limit of Rs ${fmt(OD.limit)}`],
  ['Discounting', `Bill ${fmt(BILL.face)} minus deduction ${fmt(BILL.discount)}`, `Bank pays Rs ${fmt(BILL.paid)} today`],
], 'Worked example table: cheques of forty-five thousand against a balance of ten thousand give thirty-five thousand overdrawn within a limit of fifty thousand; a bill of one lakh twenty thousand discounted with a deduction of three thousand gives one lakh seventeen thousand today', 'Imagined figures.');
const vPayOther = table(['Service', 'What it does'], [
  ['Cheque', 'Order to the bank to pay a sum from the account'],
  ['Bank draft', 'Bank-issued order for payment at another place'],
  ['Transfer', 'Money moved between accounts or places'],
  ['Locker', 'Safe storage of valuables'],
  ['Bill payment, cheque collection', 'Allied services for convenience'],
], 'Table of payment instruments and allied services: cheque, bank draft, transfer, locker, bill payment and collection of cheques');
const vChannels = table(['Channel (as of 2024)', 'What it is'], [
  ['Internet banking', "Use the bank's website to check accounts, pay and transfer"],
  ['Mobile banking', "Do the same through the bank's app on a phone"],
  ['Automated teller machine', 'Cash and other services at any hour'],
  ['Debit card', "Spends the holder's own balance"],
  ['Credit card', "Spends the bank's money; the holder repays later"],
], 'Table of e-banking channels as of 2024: internet banking, mobile banking, automated teller machine, debit card and credit card');
const vSystems = table(['System (as of 2024)', 'How it works'], [
  ['National Electronic Funds Transfer', 'Transfers settled in batches'],
  ['Real time gross settlement', 'Each payment settled at once; for large amounts'],
  ['Immediate payment service', 'Instant transfer between bank accounts'],
  ['Unified payments interface', 'Instant app payment from a linked bank account; launched 2016'],
], 'Table of electronic transfer systems as of 2024: batch-wise National Electronic Funds Transfer, real time gross settlement for large amounts, immediate payment service for instant transfer, and the unified payments interface launched in 2016');
const vCards = table(['Point', 'Debit card', 'Credit card'], [
  ['Whose money', "Holder's own balance", "Bank's money, repaid later"],
  ['When the account is hit', 'At once', 'When the holder repays'],
  ['Nature', 'Payment tool', 'Payment and short-term credit'],
], 'Table comparing a debit card and a credit card on whose money is used, when the account is affected and the nature of each');
const vBenefitsRisks = table(['Benefits', 'Risks'], [
  ['Access at any hour', 'Fraud and phishing'],
  ['Lower cost and convenience', 'Stolen passwords or codes'],
  ['A record of transactions', 'Sharing a one time password'],
  ['Less cash handling', 'Need for security habits'],
], 'Table of the benefits and risks of e-banking: access at any hour, lower cost, a record of transactions and less cash handling against fraud, stolen passwords, shared one time passwords and the need for security habits');
const vSummary1 = table(['Idea', 'Remember'], [
  ['Business services', 'Intangible, inseparable, customer involved'],
  ['Banks', 'Commercial, cooperative, specialised, central'],
  ['Commercial bank functions', 'Deposits, lending, instruments, remittance, allied'],
  ['E-banking (as of 2024)', 'Internet, mobile, cards, transfer systems, unified payments interface'],
  ['Safety', 'Never share secret codes'],
], 'Summary table of Part 1: services, types of banks, bank functions, e-banking and safety');
const vTips1 = table(['Common mistake', 'Fix'], [
  ['Writing rates or limits for payment systems', 'Describe how each works; add as of 2024'],
  ['Mixing overdraft and cash credit', 'Overdraft: beyond balance; cash credit: against stock'],
  ['Calling a credit card a debit card', 'Debit spends own money; credit borrows'],
  ['Naming the central bank as a lender to the public', 'It is banker to government and banks'],
], 'Exam tips table: four common mistakes about payment system details, overdraft and cash credit, debit and credit cards, and the role of the central bank');

const vInsure = table(['Idea', 'Meaning'], [
  ['Insurance', 'A contract: for a premium the insurer compensates a loss from a stated risk, or pays a sum on a life event'],
  ['Insurer', 'The party that takes on the risk'],
  ['Insured', 'The party that pays the premium'],
  ['Pooling', 'Many pay small premiums; the few who suffer loss are paid from the pool'],
], 'Table of the meaning of insurance: a contract for a premium, the insurer, the insured and the pooling of risk');
const vPool = table(['Imagined pool', 'Figure'], [
  ['Members', fmt(POOL.members)],
  ['Premium each (Rs)', fmt(POOL.premium)],
  ['Fund collected (Rs)', fmt(POOL.fund)],
  [`${POOL.claims} losses at Rs ${fmt(POOL.claim)} each (Rs)`, fmt(POOL.paid)],
  ['Left for costs and reserves (Rs)', fmt(POOL.left)],
], 'Worked example table of risk pooling: two thousand members paying fifteen hundred rupees each give thirty lakh rupees, twenty losses of one lakh each cost twenty lakh, leaving ten lakh for costs and reserves', 'Imagined figures; many small premiums pay a few big losses.');
const vGoodFaith = table(['Principle', 'Imagined case'], [
  ['Utmost good faith', 'Kamlesh hides a heart ailment; the insurer may refuse the claim'],
  ['Insurable interest', 'A stranger cannot insure a neighbour\'s shop; the owner can'],
  ['Mitigation of loss', 'After a fire, the owner saves the unburnt stock and calls the fire service'],
], 'Table of three principles with imagined cases: utmost good faith, insurable interest and mitigation of loss');
const vIndem = table(['Principle', 'Rule'], [
  ['Indemnity', 'Compensation is the actual loss, up to the sum insured; not applied to life insurance'],
  ['Proximate cause', 'The nearest effective cause must be an insured risk'],
  ['Example', 'A fire policy pays for fire, not for a flood'],
], 'Table of indemnity and proximate cause: compensation limited to actual loss, the nearest effective cause must be insured, and a fire policy pays for fire and not flood');
const vSubContr = table(['Principle', 'Rule'], [
  ['Subrogation', 'After paying, the insurer takes over the insured\'s right to recover from the party at fault'],
  ['Contribution', 'When two policies cover one risk, insurers share the loss in proportion to their cover'],
], 'Table of subrogation and contribution with their rules');
const vInsEx = table(['Case', 'Working', 'Result'], [
  ['Indemnity', `Loss ${fmt(FIRE.loss)}, sum insured ${fmt(FIRE.insured)}`, `Pays Rs ${fmt(FIRE.loss)}`],
  ['Indemnity, big loss', `Loss ${fmt(FIRE.bigLoss)}, sum insured ${fmt(FIRE.insured)}`, `Pays at most Rs ${fmt(FIRE.insured)}`],
  ['Contribution', `Covers ${fmt(CONT.a)} and ${fmt(CONT.b)}, loss ${fmt(CONT.loss)}`, `Rs ${fmt(CONT.partA)} and Rs ${fmt(CONT.partB)}`],
  ['Subrogation', `Insurer pays ${fmt(SUB.paid)}`, 'Recovers from the party at fault'],
], 'Worked example table: a loss of three lakh fifty thousand on a policy of five lakh pays three lakh fifty thousand; a loss of seven lakh twenty thousand pays at most five lakh; two insurers covering three lakh and two lakh share a loss of two lakh fifty thousand as one lakh fifty thousand and one lakh; an insurer who pays recovers from the party at fault', 'Imagined figures.');
const vLife = table(['Policy', 'Idea'], [
  ['Whole life', 'Sum paid after death, whenever it comes'],
  ['Endowment', 'Sum paid on death or at the end of a fixed term'],
  ['Joint life', 'Covers two lives together'],
  ['Annuity', 'Regular payments to the insured'],
  ["Children's", "Sum for a child's future needs"],
], 'Table of kinds of life insurance policy: whole life, endowment, joint life, annuity and children\'s policies');
const vCompare = table(['Point', 'Life', 'Fire', 'Marine'], [
  ['Nature', 'Guarantee', 'Indemnity', 'Indemnity'],
  ['Insurable interest needed', 'At the contract', 'At contract and loss', 'At the loss'],
  ['Subject', 'A person\'s life', 'Buildings, stock', 'Ship, cargo, freight'],
  ['Special rule', 'Sum fixed in advance', 'Fire is proximate cause', 'Three kinds'],
], 'Table comparing life, fire and marine insurance on nature, when insurable interest is needed, subject matter and special rule');
const vMarine = table(['Kind', 'Covers', 'Imagined taker'], [
  ['Hull', 'The ship itself', 'Sagar Lines, a shipping company'],
  ['Cargo', 'Goods on board', 'Meenakshi Tea Exporters'],
  ['Freight', 'The fee for carrying the cargo', 'The carrier'],
], 'Table of the three kinds of marine insurance: hull insurance on the ship, cargo insurance on the goods and freight insurance on the carrying fee, with imagined takers');
const vOtherIns = table(['Type', 'In one line'], [
  ['Health', 'Pays medical costs of illness or injury'],
  ['Motor', 'Covers loss or damage to vehicles and liability to others'],
  ['Others', 'For example crops, accidents and liability'],
  ['Regulator (as of 2024)', 'The Insurance Regulatory and Development Authority of India regulates and develops insurance'],
], 'Table of other types of insurance, health, motor and others, and the regulator, the Insurance Regulatory and Development Authority of India, as of 2024');
const vPost = table(['Service (as of 2024)', 'Examples'], [
  ['Postal financial services', 'Postal savings schemes; money transfer'],
  ['Mail services', 'Parcel, registered post, speed post, insured post'],
  ['Courier services', 'Private; door-to-door; fast; tracking'],
], 'Table of postal and courier services as of 2024: postal financial services, mail services and private courier services');
const vWareTypes = table(['Type', 'Idea'], [
  ['Private', 'A firm stores its own goods'],
  ['Public', 'Licensed; open to all for a fee'],
  ['Bonded', 'Imported goods await payment of customs duty'],
  ['Government', 'Owned and run by government bodies'],
  ['Cooperative', 'Owned by a society for its members'],
], 'Table of five types of warehouse: private, public, bonded, government and cooperative');
const vWareEx = table(['Imagined case', 'Working', 'Result'], [
  ['Consolidation', `${CONS.lots.join(' + ')} cartons`, `${fmt(CONS.total)} cartons, one full truck`],
  ['Financing', `Stock Rs ${fmt(RECEIPT.stock)}, loan Rs ${fmt(RECEIPT.advance)}`, `Rs ${fmt(RECEIPT.margin)} not covered by the loan`],
], 'Worked example table: lots of four hundred, three hundred fifty and two hundred fifty cartons make one thousand, a full truck; stock worth six lakh with a loan of four lakh twenty thousand leaves one lakh eighty thousand not covered', 'Imagined figures.');
const vBonded = flow('LR', ['Importer brings goods', 'Goods wait in a bonded warehouse', 'Sold at home: duty paid', 'Re-exported: no home duty (as of 2024)'], 'Flow of a bonded warehouse: the importer brings goods, they wait in the bonded warehouse, and are either sold at home after duty is paid or re-exported without home duty as of 2024', 'Duty waits for the goods.');
const vSummary2 = table(['Idea', 'Remember'], [
  ['Insurance', 'Contract; premium; pooling of risk'],
  ['Principles', 'Good faith, interest, indemnity, proximate cause, subrogation, contribution, mitigation'],
  ['Life, fire, marine', 'Guarantee against indemnity; interest at different times'],
  ['Post and courier (as of 2024)', 'Savings and mail services; private door-to-door delivery'],
  ['Warehouses', 'Five types; six functions'],
], 'Summary table of Part 2: insurance, principles, life, fire and marine insurance, post and courier services, and warehouses');
const vTips2 = table(['Common mistake', 'Fix'], [
  ['Applying indemnity to life insurance', 'Life insurance is a guarantee'],
  ['Mixing the time of insurable interest', 'Life: contract; fire: contract and loss; marine: loss'],
  ['Forgetting the date for regulators and services', 'Add as of 2024'],
  ['Describing a bonded warehouse as free storage', 'Duty is only postponed'],
], 'Exam tips table: four common mistakes about indemnity and life insurance, the time of insurable interest, dates for regulators and services, and bonded warehouses');

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Business Services, Part 1: Banking and E-banking',
  goals: [
    'Describe the characteristics of business services',
    'Distinguish commercial, cooperative, specialised and central banks',
    'Explain the functions of commercial banks, including deposits and lending',
    'Explain e-banking channels and payment systems as of 2024, with benefits and risks',
  ],
  slides: [
    sl('title', 'Business Services: Banking', {
      b: 'Part 1: **banks**, their **functions** and **e-banking**.',
      v: vRoute1,
      n: 'Imagine Farida, who runs a small shop and needs a place to keep her takings, a way to pay suppliers and some borrowing when stock runs short. A bank gives her all of these. In this part we study the types of banks, what a commercial bank does, and how electronic banking works, as of two thousand twenty four.',
    }),
    sl('concept', 'What makes a service different', {
      b: 'A **business service** is an activity that gives the customer a benefit without any physical product changing hands.',
      v: vServices,
      n: 'Services are intangible, so there is no stock to keep on a shelf. They are inseparable, because they are produced and used at the same moment. And the customer usually takes part in the process. Banking, insurance, post and warehousing are all examples, and this chapter studies them one by one.',
    }),
    sl('concept', 'Types of banks', {
      b: 'Banks differ in who owns them and whom they serve.',
      v: vTree,
      n: 'This tree shows four groups of banks. Commercial banks take deposits and lend, and they are public sector, private sector or foreign. Cooperative banks are owned by their members. Specialised banks serve one sector, such as foreign trade, agriculture or small industry. At the top of the system stands the central bank.',
    }),
    sl('concept', 'Commercial banks', {
      b: 'A **commercial bank** accepts deposits from the public and lends them to earn a return.',
      v: vCommercial,
      n: 'In a public sector bank, the government holds the major stake. A private sector bank is owned by private shareholders. A foreign bank has its head office in another country and works through branches here. All three do the same basic work of taking deposits and giving loans, and all are supervised by the central bank.',
    }),
    sl('concept', 'Cooperative, specialised and central banks', {
      v: vOther,
      bl: ['Cooperative banks are owned by members.', 'Specialised banks serve one sector, for example foreign trade.', 'The Reserve Bank of India is the central bank.'],
      n: 'A cooperative bank is owned by its members and helps farmers and small borrowers. A specialised bank serves one sector, for example an export import bank for foreign trade or a rural development bank. The Reserve Bank of India, the central bank, is banker to the government and to other banks, and it regulates the banking system.',
    }),
    sl('check', 'Quick check: identify the bank', {
      b: 'Weavers who own a bank together.',
      chk: 'mc_bank_coop',
      n: 'Ask who owns the bank. If the weavers are its members and part owners, which type of bank is it?',
    }),
    sl('diagram', 'Functions of a commercial bank', {
      v: vWeb,
      n: 'A commercial bank performs five functions. It accepts deposits and it lends. It offers cheques and other payment instruments, and it helps remit funds from place to place. And it provides allied services, such as lockers, bill payment and collection of cheques. We take each function in turn.',
    }),
    sl('concept', 'Accepting deposits', {
      v: vDeposits,
      bl: ['Current: for traders', 'Savings: for households', 'Fixed and recurring: for planned saving'],
      n: 'A current deposit is for traders who deal often, and it usually pays no interest. A savings deposit is for households, pays interest and usually limits withdrawals. A fixed deposit keeps a lump sum for a fixed term. A recurring deposit collects a fixed instalment every month. Choose by looking at how the money will be used.',
    }),
    sl('example', 'Worked example 1: which deposit?', {
      b: 'Match four imagined customers to the best account.',
      bl: ['Step 1: Note how often money moves.', 'Step 2: Note whether it is a lump sum or a monthly amount.', 'Step 3: Name the account and give a reason.'],
      v: vWhichDeposit,
      n: 'Farida deals every day, so she needs a current account. Salma saves a fixed amount every month, so she needs a recurring deposit, which collects twenty four thousand rupees over twelve months before interest. Isha has a big idle sum for two years, which suits a fixed deposit. Ravi saves small amounts, so a savings account fits.',
    }),
    sl('concept', 'Lending', {
      v: vLending,
      bl: ['Overdraft: beyond the balance, up to a limit', 'Cash credit: against stock', 'Loan: one sum, repaid in instalments'],
      n: 'An overdraft lets an account holder pay out more than the balance, up to a limit, and interest is charged only on the amount overdrawn. Cash credit lets a business draw as needed against its stock. A loan gives one sum for a purpose, repaid in instalments. Discounting turns a bill that is due later into cash today.',
    }),
    sl('example', 'Worked example 2: overdraft and discounting', {
      b: 'Two imagined businesses use their banks.',
      bl: ['Step 1: Overdrawn amount is the cheques minus the balance.', 'Step 2: Compare it with the limit.', 'Step 3: A discounted bill pays face value minus the deduction.'],
      v: vLendEx,
      n: 'Taruni Stores has ten thousand rupees and issues cheques worth forty five thousand. So thirty five thousand is overdrawn, which is within its limit of fifty thousand. Separately, a bill for one lakh twenty thousand is discounted, with a deduction of three thousand, so the bank pays one lakh seventeen thousand today.',
    }),
    sl('check', 'Quick check: lending facilities', {
      b: 'Match each borrowing arrangement with its facility.',
      chk: 'mt_lending',
      n: 'For each case ask how the money is drawn: beyond the balance, against stock, in one sum, or against a bill not yet due.',
    }),
    sl('concept', 'Cheques, remittance and allied services', {
      v: vPayOther,
      bl: ['Cheques and drafts replace cash.', 'Transfers move money between places.', 'Lockers and bill payment are allied services.'],
      n: 'A cheque is an order to the bank to pay a sum from the account, and a bank draft is a payment order issued by the bank itself. Remittance means moving money from one place to another, by draft or by transfer. Allied services include lockers for valuables, payment of bills and collection of cheques.',
    }),
    sl('concept', 'E-banking: meaning and channels', {
      b: '**E-banking** means banking through electronic channels, as of 2024.',
      v: vChannels,
      n: 'E-banking is banking through electronic channels. As of two thousand twenty four, the main channels are internet banking and mobile banking, the automated teller machine, and debit and credit cards. A debit card spends the balance of the holder, while a credit card spends money lent by the bank, which the holder must repay later.',
    }),
    sl('diagram', 'How an electronic payment travels', {
      v: vPay,
      n: 'Follow a payment from a customer to a supplier. The customer sends an instruction with a secret code. The bank of the customer checks it and debits the account. The payment system carries the message. The bank of the supplier credits the account, and a confirmation returns. Different systems differ in how fast and in what amounts they work.',
    }),
    sl('check', 'Quick check: order of an e-payment', {
      b: 'Arrange the steps of an electronic fund transfer.',
      chk: 'od_epay',
      n: 'Start with the customer and end with the supplier bank. The payment system sits in between.',
    }),
    sl('concept', 'Transfer systems, as of 2024', {
      v: vSystems,
      bl: ['Learn the idea of each system, as of 2024', 'Rates, charges and limits change; do not quote them'],
      n: 'As of two thousand twenty four, National Electronic Funds Transfer settles payments in batches. Real time gross settlement settles each payment at once and is meant for large amounts. Immediate payment service gives instant transfer between accounts. The unified payments interface, launched in two thousand sixteen, gives instant payment through a mobile app linked to a bank account.',
    }),
    sl('concept', 'Debit and credit cards', {
      v: vCards,
      bl: ['Debit card: own money, deducted at once', 'Credit card: bank money, repaid later'],
      n: 'Both cards are used at shops and machines, but they differ in whose money is used. With a debit card the amount is taken from the balance of the holder at once. With a credit card the bank lends the money and the holder repays later. So a credit card is both a payment tool and short term credit.',
    }),
    sl('concept', 'Benefits and risks of e-banking', {
      v: vBenefitsRisks,
      bl: ['Benefits: access at any hour, lower cost, records, less cash', 'Risks: fraud; never share codes'],
      n: 'E-banking offers access at any hour, lower cost, convenience, a record of every transaction and less cash handling. Its risks are fraud and the need for security. Keep your personal identification number and passwords secret, never share the one time password, and log in only through the official app or website.',
    }),
    sl('check', 'Quick check: a date to remember', {
      b: 'Complete the sentence on the unified payments interface.',
      chk: 'fb_upi',
      n: 'Recall the year the system began, and the kind of device from which people use it.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up. Services are intangible, inseparable and involve the customer. Banks are commercial, cooperative, specialised or central. A commercial bank takes deposits, lends, offers cheques, helps remit funds and gives allied services. E-banking works through internet, mobile, cards and transfer systems as of two thousand twenty four, with benefits and security risks.',
    }),
    sl('exam-tips', 'Exam tips', {
      v: vTips1,
      bl: ['Add as of 2024 beside payment systems.', 'Link each facility to the case in the question.'],
      n: 'Some tips. Describe payment systems in general terms and add as of two thousand twenty four, but do not quote rates, charges or limits. Do not mix overdraft with cash credit. Remember that a debit card spends your own money. And always link a deposit or loan to the clues in the case.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Business Services, Part 2: Insurance, Communication and Warehousing',
  goals: [
    'Explain insurance, risk pooling and the seven principles with cases',
    'Distinguish life, fire and marine insurance and name other types',
    'Describe postal and courier services as of 2024',
    'Explain the types and functions of warehouses',
  ],
  slides: [
    sl('title', 'Insurance, Post and Warehousing', {
      b: 'Part 2: **insurance**, **post and courier**, and **warehousing**.',
      v: vRoute2,
      n: 'A warehouse owner worries about fire, an exporter worries about a storm at sea, and a pickle maker needs somewhere to store jars until they sell. This part studies insurance with its principles, the postal and courier services, and warehouses, with their types and functions.',
    }),
    sl('concept', 'What insurance is', {
      b: '**Insurance** is a contract in which the insurer agrees, for a premium, to compensate the insured for a loss from a stated risk, or to pay a sum on a life event.',
      v: vInsure,
      n: 'Insurance is a contract. The insurer agrees, in return for a premium, to compensate the insured for a loss from a stated risk, or to pay a sum when a life event occurs. It works by pooling risk: many people pay small premiums, and the few who suffer a loss are paid from the common fund.',
    }),
    sl('example', 'Worked example 1: how pooling works', {
      b: 'An imagined insurer collects premiums from many members.',
      bl: ['Step 1: Multiply members by premium.', 'Step 2: Multiply the number of losses by the loss.', 'Step 3: What remains meets costs and reserves.'],
      v: vPool,
      n: 'Two thousand members pay fifteen hundred rupees each, so the fund is thirty lakh rupees. In a year, twenty members suffer a loss of one lakh each, which costs twenty lakh. The remaining ten lakh meets costs and reserves. No single member could bear a one lakh loss easily, but together they can.',
    }),
    sl('diagram', 'Seven principles of insurance', {
      v: vPrinciples,
      n: 'Seven principles guide insurance contracts. Utmost good faith, insurable interest, indemnity, proximate cause, subrogation, contribution and mitigation of loss. Not every principle applies to every policy. In particular, indemnity does not apply to life insurance. We now see each one in an imagined case.',
    }),
    sl('concept', 'Good faith, interest and mitigation', {
      v: vGoodFaith,
      bl: ['Disclose every material fact', 'No financial stake means no valid policy'],
      n: 'Under utmost good faith, the proposer must reveal every material fact, so hiding a heart ailment lets the insurer refuse the claim. Insurable interest means a financial stake in the subject, so a stranger cannot insure the shop of a neighbour. Under mitigation of loss, the insured must try to limit the damage, for example by calling the fire service.',
    }),
    sl('concept', 'Indemnity and proximate cause', {
      v: vIndem,
      bl: ['Indemnity: actual loss, no profit', 'Proximate cause: must be an insured risk'],
      n: 'Indemnity means the insured is brought back to the earlier position but is not allowed to gain. Compensation is the actual loss, up to the sum insured. Proximate cause means the nearest effective cause of the loss must be an insured risk. So a policy against fire pays for fire but not for a flood.',
    }),
    sl('check', 'Quick check: recovery from a third party', {
      b: 'Which principle lets the insurer recover from a careless contractor?',
      chk: 'mc_subrogation',
      n: 'The insurer has already paid. Which principle lets it step into the shoes of the insured?',
    }),
    sl('concept', 'Subrogation and contribution', {
      v: vSubContr,
      bl: ['Subrogation: the insurer recovers from the party at fault', 'Contribution: insurers share in proportion to cover'],
      n: 'Subrogation lets an insurer, after paying the claim, step into the shoes of the insured and recover from the party who caused the loss, so the insured cannot gain twice. Contribution applies when two policies cover one risk. The insurers then share the loss in proportion to the amounts they cover.',
    }),
    sl('example', 'Worked example 2: indemnity, contribution and subrogation', {
      b: 'Four imagined cases to work out.',
      bl: ['Step 1: Compensation never exceeds the actual loss or the sum insured.', 'Step 2: Share a loss in the ratio of the covers.', 'Step 3: An insurer who pays recovers from the party at fault.'],
      v: vInsEx,
      n: 'A loss of three lakh fifty thousand on a policy of five lakh is paid at three lakh fifty thousand. A loss of seven lakh twenty thousand is paid at most at five lakh. Two insurers covering three lakh and two lakh share a loss of two lakh fifty thousand in the ratio three to two, so they pay one lakh fifty thousand and one lakh.',
    }),
    sl('check', 'Quick check: match the principle', {
      b: 'Match each situation with its principle.',
      chk: 'mt_principles',
      n: 'For each situation ask what is being disclosed, limited, shared or reduced.',
    }),
    sl('concept', 'Life insurance', {
      b: 'Life insurance is a **contract of guarantee**: the sum is fixed in advance, and insurable interest is needed at the time of the contract.',
      v: vLife,
      n: 'A life policy pays a sum fixed in advance, because the value of a human life cannot be measured. So it is a contract of guarantee, not indemnity. Insurable interest is needed when the contract is made. The kinds are whole life, endowment, joint life, annuity and children policies.',
    }),
    sl('concept', 'Life, fire and marine compared', {
      v: vCompare,
      bl: ['Fire: interest at contract and at loss; fire is proximate cause', 'Marine: interest at the time of loss'],
      n: 'Compare the three. Life insurance is a guarantee, with interest needed at the contract. Fire insurance is indemnity, with interest needed at the contract and at the loss, and fire must be the proximate cause. Marine insurance is also indemnity, and insurable interest is needed at the time of the loss.',
    }),
    sl('concept', 'Marine insurance: hull, cargo and freight', {
      v: vMarine,
      bl: ['Hull: the ship', 'Cargo: the goods', 'Freight: the carrying fee'],
      n: 'Marine insurance has three kinds. Hull insurance covers the ship itself, and the shipping company takes it. Cargo insurance covers the goods on board, and an exporter takes it. Freight insurance covers the fee for carrying the cargo, which the carrier would lose if the cargo were lost.',
    }),
    sl('check', 'Quick check: life insurance', {
      b: 'True or false: life insurance is a contract of indemnity.',
      chk: 'tf_life',
      n: 'Think about whether the value of a human life can be measured to give an exact loss.',
    }),
    sl('concept', 'Other types and the regulator', {
      v: vOtherIns,
      bl: ['Health, motor and others', 'Regulator: the Insurance Regulatory and Development Authority of India, as of 2024'],
      n: 'Health insurance pays the cost of treatment. Motor insurance covers vehicles and liability to others. There are many others, for example crops, accidents and liability. As of two thousand twenty four, the Insurance Regulatory and Development Authority of India regulates and develops the insurance business.',
    }),
    sl('concept', 'Postal and courier services', {
      v: vPost,
      bl: ['Postal services, as of 2024', 'Courier: private, door-to-door, fast, with tracking'],
      n: 'As of two thousand twenty four, the postal department offers financial services, such as postal savings schemes and money transfer, and mail services, such as parcels, registered post, speed post and insured post. Courier firms are private. They offer fast door to door delivery, and a customer can track the parcel.',
    }),
    sl('concept', 'Warehousing: meaning and types', {
      b: '**Warehousing** means storing goods from the time of production until they are needed.',
      v: vWareTypes,
      n: 'Warehousing means storing goods from the time they are produced until they are needed. A private warehouse belongs to a firm for its own goods. A public warehouse is licensed and open to all for a fee. A bonded warehouse holds imported goods until customs duty is paid. Government and cooperative warehouses are owned by government bodies and by societies.',
    }),
    sl('diagram', 'Functions of a warehouse', {
      v: vWareFn,
      n: 'A warehouse does much more than hold goods. It consolidates small lots into full loads, and breaks large lots into small orders. It stockpiles goods until demand rises, and it adds value through packing, grading and labelling. It helps stabilise prices, and a warehouse receipt can be used as security for a loan.',
    }),
    sl('example', 'Worked example 3: consolidation and financing', {
      b: 'An imagined warehouse serves pickle makers and a grain trader.',
      bl: ['Step 1: Add the lots to check a full load.', 'Step 2: Subtract the loan from the stock value.', 'Step 3: Name the function shown.'],
      v: vWareEx,
      n: 'Three pickle makers send four hundred, three hundred fifty and two hundred fifty cartons, which make one thousand, a full truck. That is consolidation. A grain trader stores stock worth six lakh rupees and borrows four lakh twenty thousand against the receipt, so one lakh eighty thousand is not covered. That is the financing function.',
    }),
    sl('check', 'Quick check: borrowing against stored grain', {
      b: 'Arrange the steps in which a farmer borrows against stored grain.',
      chk: 'od_receipt',
      n: 'Start with storage. The receipt comes before the loan.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up. Insurance pools risk through a contract for a premium. Seven principles guide it. Life insurance is a guarantee, while fire and marine insurance are indemnity, with interest needed at different times. Postal and courier services carry mail and parcels, as of two thousand twenty four. Warehouses come in five types and perform six functions.',
    }),
    sl('exam-tips', 'Exam tips', {
      v: vTips2,
      bl: ['Add as of 2024 for regulators and services.', 'Use an imagined case to show each principle.'],
      n: 'Some tips. Do not apply indemnity to life insurance. Remember the time of insurable interest: contract for life, contract and loss for fire, and loss for marine. Add as of two thousand twenty four for the regulator and the postal services. And show each principle with a short case.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Business Services: notes',
  sections: [
    {
      h: '1. Business services and types of banks',
      t: 1,
      b: 'A business service is intangible, cannot be separated from its production and needs the customer to take part. Banking, insurance, post, warehousing and transport are examples.\n\n**Types of banks:** commercial banks (public sector, private sector, foreign); cooperative banks; specialised banks (for example an export-import bank, a rural development bank, a small industry bank); and the central bank, the Reserve Bank of India, which is banker to the government and to banks and the regulator of the banking system.',
      terms: [['Business service', 'An intangible activity that gives the customer a benefit without a physical product changing hands.'], ['Commercial bank', 'A bank that accepts deposits from the public and lends them to earn a return.'], ['Central bank', 'The apex bank, banker to the government and to other banks and regulator of the system.']],
      v: vTree,
      vs: [vCommercial, vOther],
    },
    {
      h: '2. Functions of commercial banks',
      t: 1,
      b: '**Deposits:** current (traders, many transactions), savings (households), fixed or term (lump sum for a period), recurring (monthly instalment).\n\n**Lending:** overdraft (pay beyond the balance up to a limit), cash credit (draw against stock up to a limit), loans and advances (one sum, repaid in instalments), discounting of bills of exchange (cash today for a bill due later, less a deduction).\n\n**Cheques and payment instruments; remittance** of funds by drafts and transfers; **allied services** such as lockers, bill payment and collection of cheques.',
      terms: [['Overdraft', 'A facility to withdraw more than the balance, up to an agreed limit.'], ['Cash credit', 'A limit sanctioned against stock or goods from which the borrower draws as needed.'], ['Discounting of a bill', 'Paying the holder of a bill of exchange its value less a deduction before the due date.']],
      v: vWeb,
      vs: [vDeposits, vLending],
    },
    {
      h: '3. E-banking (as of 2024)',
      t: 1,
      b: 'E-banking is banking through electronic channels. The systems below are dated as of 2024; rates, charges, limits and timings change, so learn the idea, not a figure.\n\n**Channels:** internet banking, mobile banking, automated teller machines, debit cards, credit cards.\n\n**Transfer systems:** National Electronic Funds Transfer (batch-wise), real time gross settlement (each payment settled at once, for large amounts), immediate payment service (instant transfer), unified payments interface (instant payment through a mobile app; launched 2016).\n\n**Benefits:** access at any hour, lower cost, convenience, a record of transactions, less cash handling. **Risks:** fraud; keep codes secret and never share a one time password.',
      terms: [['E-banking', 'Banking through electronic channels such as the internet, mobile apps, machines and cards.'], ['Debit card', "A card that spends the holder's own bank balance."], ['Credit card', "A card that spends the bank's money, to be repaid by the holder later."]],
      v: vPay,
      vs: [vSystems, vBenefitsRisks],
    },
    {
      h: '4. Insurance and its principles',
      t: 2,
      b: 'Insurance is a contract in which the insurer agrees, for a premium, to compensate the insured for a loss from a stated risk, or to pay a sum on a life event. It works by pooling the risk of many.\n\n**Principles:** utmost good faith (disclose every material fact); insurable interest (a financial stake in the subject); indemnity (compensation up to the actual loss, no profit; not for life insurance); proximate cause (the nearest effective cause must be an insured risk); subrogation (the insurer who has paid recovers from the party at fault); contribution (insurers sharing a loss in proportion to cover); mitigation of loss (the insured must act to limit the damage).',
      terms: [['Premium', 'The price paid to the insurer for the cover.'], ['Indemnity', 'Compensation that restores the insured to the earlier position, without profit.'], ['Subrogation', 'The insurer taking over the insured person\'s right to recover from the party at fault.']],
      v: vPrinciples,
      vs: [vPool, vInsEx],
    },
    {
      h: '5. Life, fire, marine and other insurance',
      t: 2,
      b: '**Life insurance:** a contract of guarantee; insurable interest at the time of the contract. Kinds: whole life, endowment, joint life, annuity, children\'s policies.\n\n**Fire insurance:** indemnity; insurable interest at the time of the contract and of the loss; fire must be the proximate cause.\n\n**Marine insurance:** hull, cargo and freight; insurable interest at the time of the loss.\n\n**Others:** health, motor and more. **Regulator (as of 2024):** the Insurance Regulatory and Development Authority of India.',
      terms: [['Hull insurance', 'Marine cover on the ship itself.'], ['Cargo insurance', 'Marine cover on the goods carried.'], ['Freight insurance', 'Marine cover on the fee for carrying goods.']],
      v: vCompare,
      vs: [vLife, vMarine, vOtherIns],
    },
    {
      h: '6. Communication and warehousing services',
      t: 3,
      b: '**Postal services (as of 2024):** financial services (postal savings schemes, money transfer) and mail services (parcel, registered post, speed post, insured post). **Courier services:** private, door-to-door, fast, with tracking.\n\n**Warehousing:** storing goods from production until needed. **Types:** private, public, bonded (imported goods awaiting customs duty), government, cooperative.\n\n**Functions:** consolidation, break-bulk, stockpiling, value-added services (packing, grading), price stabilisation, and financing (a warehouse receipt is security for a loan).',
      terms: [['Warehousing', 'Storing goods from the time of production until they are needed.'], ['Bonded warehouse', 'A licensed warehouse holding imported goods until customs duty is paid.'], ['Warehouse receipt', 'A document showing goods stored, which a lender can accept as security.']],
      v: vWareFn,
      vs: [vPost, vWareTypes, vBonded],
    },
  ],
  tips: '**Common mistakes**\n- Quoting rates, charges, limits or timings for payment systems; describe the idea and add as of 2024.\n- Mixing overdraft with cash credit, or a debit card with a credit card.\n- Applying indemnity to life insurance.\n- Mixing the time at which insurable interest is needed.\n- Treating a bonded warehouse as free of duty; the duty is postponed.\n\n**How marks are usually awarded**\n- 1 mark: a correct option or a quoted line from the case.\n- 2 and 3 marks: one point per feature or function with a short explanation.\n- 5 marks: five points, each with an explanation, in a numbered list.\n- Case questions: quote the line, name the concept, explain in a sentence.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Three characteristics of a business service', 'Intangible; inseparable from production; needs customer involvement.', 'fact', 1],
  ['**Commercial bank**', 'A bank that accepts deposits from the public and lends them to earn a return.', 'definition', 1],
  ['Three kinds of commercial bank', 'Public sector, private sector, foreign.', 'fact', 1],
  ['**Cooperative bank**', 'A bank owned by its members, serving farmers and small borrowers.', 'definition', 1],
  ['**Specialised bank**', 'A bank serving one sector, such as foreign trade, agriculture or small industry.', 'definition', 1],
  ['Roles of the Reserve Bank of India', 'Banker to the government and to banks; regulator of the banking system.', 'fact', 1],
  ['Current deposit', 'For traders with many transactions; usually no interest.', 'concept', 1],
  ['Savings deposit', 'For households; interest; withdrawals restricted.', 'concept', 1],
  ['Fixed deposit', 'A lump sum kept with the bank for a fixed term.', 'concept', 1],
  ['Recurring deposit', 'A fixed instalment deposited every month.', 'concept', 1],
  ['**Overdraft**', 'Withdrawing more than the balance, up to an agreed limit.', 'definition', 1],
  ['**Cash credit**', 'A limit against stock from which the borrower draws as needed.', 'definition', 1],
  ['**Discounting of a bill**', 'The bank pays a bill\'s value less a deduction before the due date.', 'definition', 1],
  ['Cheque and bank draft', 'A cheque orders the bank to pay from an account; a draft is a bank-issued payment order.', 'fact', 1],
  ['Allied services of a bank', 'Lockers, bill payment, collection of cheques and others.', 'fact', 1],
  ['**E-banking**', 'Banking through electronic channels such as internet, mobile, machines and cards.', 'definition', 1],
  ['Debit card versus credit card', "Debit spends the holder's own balance; credit spends the bank's money, repaid later.", 'concept', 1],
  ['What is NEFT? (as of 2024)', 'National Electronic Funds Transfer: transfers settled in batches.', 'fact', 1],
  ['What is RTGS? (as of 2024)', 'Real time gross settlement: each payment settled at once; for large amounts.', 'fact', 1],
  ['IMPS and UPI (as of 2024)', 'Immediate payment service: instant transfer. Unified payments interface: instant app payment, launched 2016.', 'fact', 1],
  ['Benefits of e-banking', 'Access at any hour, lower cost, convenience, a record of transactions, less cash handling.', 'fact', 1],
  ['Safety rule of e-banking', 'Keep codes secret; never share a one time password with anyone.', 'exam-tip', 1],
  ['**Insurance**', 'A contract: for a premium the insurer compensates a loss from a stated risk or pays a sum on a life event.', 'definition', 2],
  ['Seven principles of insurance', 'Utmost good faith, insurable interest, indemnity, proximate cause, subrogation, contribution, mitigation of loss.', 'fact', 2],
  ['**Indemnity**', 'Compensation up to the actual loss, with no profit; not applied to life insurance.', 'definition', 2],
  ['**Subrogation** and **contribution**', 'Subrogation: the insurer recovers from the party at fault. Contribution: insurers share a loss in proportion to cover.', 'definition', 2],
  ['Insurable interest: when needed', 'Life: contract. Fire: contract and loss. Marine: loss.', 'exam-tip', 2],
  ['Kinds of life policy', 'Whole life, endowment, joint life, annuity, children\'s.', 'fact', 2],
  ['Three kinds of marine insurance', 'Hull, cargo and freight.', 'fact', 2],
  ['Regulator of insurance (as of 2024)', 'The Insurance Regulatory and Development Authority of India.', 'fact', 2],
  ['Postal services (as of 2024)', 'Financial: savings schemes, money transfer. Mail: parcel, registered, speed and insured post.', 'fact', 3],
  ['Five types of warehouse', 'Private, public, bonded, government, cooperative.', 'fact', 3],
  ['Six functions of a warehouse', 'Consolidation, break-bulk, stockpiling, value-added services, price stabilisation, financing.', 'fact', 3],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-11-default-chapter-test-short',
  title: 'Chapter test (short): Business Services',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A: Objective (1 mark each)', instr: 'Questions 1 to 4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['mc_deposit_farida', 'mc_indemnity_amt', 'mc_warehouse_bonded', 'ar_deposit_lending'] },
    { id: 'B', title: 'Section B: Short answer (2 and 3 marks)', instr: 'Answer the 2-mark questions in about 30 to 50 words and the 3-mark question in about 50 to 80 words.', items: ['s2_rbi', 's2_indemnity', 's3_ebank_benefits'] },
    { id: 'C', title: 'Section C: Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80 to 120 words.', items: [{ attempt: 1, keys: ['l_types_banks', 'l_warehouse_functions'] }] },
    { id: 'D', title: 'Section D: Case-based (4 marks)', instr: 'Read the case and answer all parts. Part (c) has an internal choice.', items: ['cb_farida'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-11-default-chapter-test-long',
  title: 'Chapter test (long): Business Services',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A: Objective (1 mark each)', instr: 'Questions 1 to 10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['mc_rbi_role', 'mc_overdraft', 'mc_rtgs_amount', 'mc_good_faith', 'mc_proximate', 'mc_marine_interest', 'mc_courier', 'mc_warehouse_function', 'ar_life', 'ar_warehouse'] },
    { id: 'B', title: 'Section B: Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30 to 50 words and 3-mark questions in about 50 to 80 words. Questions 13 and 15 have an internal choice.', items: ['s2_cur_sav', 's2_neft_rtgs', { attempt: 1, keys: ['s2_proximate', 's2_debit_credit'] }, 's3_marine', { attempt: 1, keys: ['s3_warehouse_functions', 's3_life_kinds'] }] },
    { id: 'C', title: 'Section C: Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80 to 120 words each.', items: ['l_principles', { attempt: 1, keys: ['l_life_fire_marine', 'l_ebank'] }] },
    { id: 'D', title: 'Section D: Case-based (4 marks each)', instr: 'Read each case and answer all parts. Part (c) of each has an internal choice.', items: ['cb_fire', 'cb_exporter'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01 to t03 of cbse-11-business-studies-ch04 only (banking and e-banking; insurance; communication and warehousing)',
    originality: 'every bank, firm, shopkeeper, ship and warehouse is imagined and written by SOYL; no NCERT text, example or exercise and no board or sample-paper item reused (D-036)',
    data: 'amounts computed in the build: overdraft, discounted bill, recurring deposit, risk pool, indemnity, contribution, consolidation and receipt loan',
    facts: 'payment systems, regulator and postal services described in general terms and dated as of 2024; no rates, charges, limits or timings quoted',
    gate: 'schema, pipeline lint, deterministic verify, word limits, narration and answer-leak checks run clean in this build',
  },
});
