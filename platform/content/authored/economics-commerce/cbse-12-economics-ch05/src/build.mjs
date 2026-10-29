// Build CBSE 12 Economics ch05 Balance of Payments. Run from platform/:
//   npx tsx content/authored/economics-commerce/cbse-12-economics-ch05/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';

setUnit('cbse-12-economics-ch05', 'economics-commerce');
const { f, must, bop, eqRate, isl } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- the deck country (imagined, USD million)
// Sundaravan: trade deficit 350, invisibles surplus 400, current account surplus 50, net autonomous
// capital outflow 170, overall deficit 120 → reserves fall by 120.
const SUN = { xg: 800, mg: 1150, xs: 520, ms: 260, ir: 30, ip: 70, tr: 200, tp: 20, fdi: 90, fpi: -180, loans: -80 };
const sun = bop(SUN);
must(sun.bot === -350 && sun.svc === 260 && sun.inc === -40 && sun.tr === 180 && sun.invis === 400 && sun.cab === 50 && sun.ka === -170 && sun.overall === -120, 'Sundaravan (narration quotes these)');
// Deck market: Qd = 500 − 5e, Qs = 5e − 100 → e = 60, Q = 200. Demand +100 → e = 70, Q = 250.
// Supply +100 → e = 50, Q = 250.
const E0 = eqRate(500, 5, -100, 5), Q0 = 500 - 5 * E0;
const E1 = eqRate(600, 5, -100, 5), Q1 = 600 - 5 * E1;
const E2 = eqRate(500, 5, 0, 5), Q2 = 500 - 5 * E2;
must(E0 === 60 && Q0 === 200 && E1 === 70 && Q1 === 250 && E2 === 50 && Q2 === 250, 'deck market (narration quotes these)');
const sched = [40, 50, 60, 70, 80].map((e) => [e, 500 - 5 * e, 5 * e - 100]);

// ---------------------------------------------------------------- SVG figures
const dInv = (q, shift = 0) => (500 + shift - q) / 5; // demand: e as a function of Q
const sInv = (q, shift = 0) => (q + 100 - shift) / 5; // supply: e as a function of Q
function fxChart({ demand = true, supply = true, d1 = false, s1 = false, eq = [] }) {
  const s = new Svg(470, 370);
  const c = s.chart({ x1: 400, y1: 120, left: 70, top: 34, width: 330, height: 280, xLabel: 'Quantity of US dollars', yLabel: 'Exchange rate (₹ per USD)' });
  if (demand) c.fn((q) => dInv(q), 0, 400, { color: 'accent', sw: 2.6 }).label([380, dInv(380)], 'D', { dx: 6, dy: -12, color: 'accent', bold: true });
  if (supply) c.fn((q) => sInv(q), 0, 400, { color: 'blue', sw: 2.6 }).label([380, sInv(380)], 'S', { dx: 10, dy: 0, color: 'blue', bold: true });
  if (d1) c.fn((q) => dInv(q, 100), 100, 400, { color: 'accent', sw: 2.2, dash: true }).label([400, dInv(400, 100)], 'D₁', { dx: 8, dy: -10, color: 'accent', bold: true });
  if (s1) c.fn((q) => sInv(q, 100), 0, 400, { color: 'blue', sw: 2.2, dash: true }).label([400, sInv(400, 100)], 'S₁', { dx: 12, dy: 6, color: 'blue', bold: true });
  for (const [q, e, name] of eq) c.drop([q, e]).dot([q, e]).label([q, e], name, { dx: 14, dy: -6, bold: true }).xTick(q, String(q)).yTick(e, String(e));
  return { s, c };
}
const vDemand = (() => {
  const { s, c } = fxChart({ supply: false });
  c.dot([100, dInv(100)]).label([100, dInv(100)], 'imports dear: less demanded', { anchor: 'start', dx: 10, dy: -4, size: 12 });
  c.dot([300, dInv(300)]).label([300, dInv(300)], 'imports cheap: more demanded', { anchor: 'end', dx: -8, dy: 18, size: 12 });
  return s.visual(
    'Downward-sloping demand curve for US dollars: at a high rate of rupees per dollar imports are dear and few dollars are demanded; at a low rate imports are cheap and more dollars are demanded',
    'Imagined schedule: Qd = 500 − 5e (USD million; e in ₹ per USD).',
  );
})();
const vSupply = (() => {
  const { s, c } = fxChart({ demand: false });
  c.dot([100, sInv(100)]).label([100, sInv(100)], 'exports dear abroad: little supplied', { anchor: 'start', dx: 10, dy: 8, size: 12 });
  c.dot([300, sInv(300)]).label([300, sInv(300)], 'exports cheap abroad', { anchor: 'end', dx: -10, dy: -10, size: 12 });
  return s.visual(
    'Upward-sloping supply curve of US dollars: at a low rate Indian exports are dear for foreigners and few dollars are supplied; at a high rate exports are cheap abroad and more dollars are supplied',
    'Imagined schedule: Qs = 5e − 100 (USD million; e in ₹ per USD).',
  );
})();
const vEquil = fxChart({ eq: [[Q0, E0, 'E']] }).s.visual(
  `Demand curve D and supply curve S for US dollars cross at E, where the exchange rate is ${E0} rupees per dollar and ${Q0} million dollars are traded`,
  'Equilibrium: quantity demanded = quantity supplied (imagined figures).',
);
const vDShift = (() => {
  const { s, c } = fxChart({ d1: true, eq: [[Q0, E0, 'E'], [Q1, E1, 'E₁']] });
  return s.visual(
    `Demand for dollars rises: the demand curve shifts right from D to D one; the equilibrium moves from E (${E0} rupees per dollar, ${Q0} million) to E one (${E1} rupees per dollar, ${Q1} million), so the rupee depreciates`,
    'More imports: D shifts right, the rate rises, the rupee depreciates.',
  );
})();
const vSShift = (() => {
  const { s, c } = fxChart({ s1: true, eq: [[Q0, E0, 'E'], [Q2, E2, 'E₂']] });
  return s.visual(
    `Supply of dollars rises: the supply curve shifts right from S to S one; the equilibrium moves from E (${E0} rupees per dollar) to E two (${E2} rupees per dollar, ${Q2} million), so the rupee appreciates`,
    'More inflows (FDI, remittances, tourists): S shifts right, the rate falls, the rupee appreciates.',
  );
})();
const vBars = (() => {
  const items = [['Trade balance', sun.bot], ['Net invisibles', sun.invis], ['Current account', sun.cab], ['Capital account', sun.ka], ['Overall balance', sun.overall]];
  const s = new Svg(520, 340);
  const zero = 160, k = 0.28, left = 40, w = 70, gap = 26;
  s.line(left - 10, zero, left + items.length * (w + gap), zero, { sw: 1.6 });
  items.forEach(([label, v], i) => {
    const x = left + i * (w + gap);
    const h = Math.abs(v) * k;
    s.rect(x, v >= 0 ? zero - h : zero, w, h, { rx: 3, fill: v >= 0 ? 'green' : 'red', fillOpacity: 0.85, stroke: false });
    s.text(x + w / 2, v >= 0 ? zero - h - 12 : zero + h + 14, v >= 0 ? `+${f(v)}` : `−${f(-v)}`, { size: 13, bold: true });
    const words = label.split(' ');
    words.forEach((wd, j) => s.text(x + w / 2, 300 + j * 16, wd, { size: 12 }));
  });
  s.text(left - 10, 20, 'USD million (imagined)', { anchor: 'start', size: 12, muted: true });
  return s.visual(
    `Bar chart of the imagined country Sundaravan: trade balance minus ${-sun.bot}, net invisibles plus ${sun.invis}, current account plus ${sun.cab}, capital account minus ${-sun.ka}, overall balance minus ${-sun.overall}`,
    'Green bars are surpluses, red bars deficits. The overall deficit is met by drawing down reserves.',
  );
})();

const vRoute1 = flow('LR', ['What the BoP records', 'Current account', 'Capital account', 'Autonomous and accommodating', 'Surplus, deficit and reserves'], 'Route map of Part 1: what the BoP records, the current account, the capital account, autonomous and accommodating transactions, surplus, deficit and reserves', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Exchange rate', 'Fixed, flexible, managed floating', 'Devaluation and depreciation', 'Demand and supply of dollars', 'Equilibrium and shifts'], 'Route map of Part 2: the exchange rate, the three systems, devaluation and depreciation, demand and supply of dollars, equilibrium and shifts', 'Part 2 at a glance');
const vBopMeaning = table(
  ['Key word', 'What it means'],
  [
    ['Systematic record', 'Every transaction is entered under a fixed heading, by double entry'],
    ['Economic transactions', 'Goods, services, income, transfers, and assets or liabilities'],
    ['Residents and the rest of the world', 'Only transactions that cross the national boundary of residence'],
    ['During a period', 'A flow, usually over a financial year'],
  ],
  'Table explaining the key words in the meaning of the balance of payments: systematic record, economic transactions, residents and the rest of the world, during a period',
);
const vStructure = flow(
  'TB',
  ['Balance of payments', 'Current account: goods, services, income, transfers', 'Capital account: FDI, portfolio investment, loans, banking capital', 'Errors and omissions; change in official reserves'],
  'Structure of the balance of payments: the current account with goods, services, income and transfers; the capital account with FDI, portfolio investment, loans and banking capital; errors and omissions and the change in official reserves',
  'Two main accounts, plus the balancing items',
  [{ from: 'n1', to: 'n2' }, { from: 'n1', to: 'n3' }, { from: 'n1', to: 'n4' }],
);
const vCurrent = table(
  ['Item', 'Receipt (credit) example', 'Payment (debit) example'],
  [
    ['Goods (visible)', 'Basmati rice shipped to Iran', 'Crude oil bought from abroad'],
    ['Services (invisible)', 'Software designed for a bank in London', 'Freight paid to a foreign shipping line'],
    ['Income (invisible)', 'Dividend from an Indian firm\'s factory in Kenya', 'Interest paid on a foreign loan'],
    ['Transfers (invisible)', 'Money sent home by workers abroad', 'Gift sent to a relative overseas'],
  ],
  'Table of current account items with a receipt and a payment example each: goods, services, income and transfers',
  'Receipts bring foreign exchange in; payments use it up.',
);
const vBotCab = table(
  ['Balance', 'Covers', 'Formula'],
  [
    ['Balance of trade', 'Goods only', 'Exports of goods − imports of goods'],
    ['Balance on invisibles', 'Services, income, transfers', 'Net services + net income + net transfers'],
    ['Current account balance', 'Goods and invisibles', 'Balance of trade + net invisibles'],
  ],
  'Table comparing the balance of trade (goods only), the balance on invisibles, and the current account balance (trade balance plus net invisibles)',
);
const vClassify = table(
  ['Transaction (India)', 'Account and item', 'Side'],
  [
    ['A Bengaluru firm sells cloud services to a US retailer', 'Current: services', 'Receipt'],
    ['An Indian buys a flat in Dubai', 'Capital: investment abroad', 'Payment'],
    ['A Pune factory imports robots from Japan', 'Current: goods', 'Payment'],
    ['Profit sent home by a foreign bank\'s Indian branch', 'Current: income', 'Payment'],
    ['A non-resident Indian deposits money in an Indian bank', 'Capital: banking capital', 'Receipt'],
  ],
  'Table classifying five transactions: cloud services sold abroad is a current receipt; a flat bought in Dubai is a capital payment; imported robots are a current payment for goods; profit sent home by a foreign bank is an income payment; an NRI deposit is a capital receipt',
  'Ask: does it change assets or liabilities? Then capital account. Does money come in? Then receipt.',
);
const vCapital = table(
  ['Capital account item', 'What it is', 'Imagined example'],
  [
    ['Foreign direct investment', 'Buying a lasting, controlling stake', 'A Korean firm builds a plant near Pune'],
    ['Portfolio investment', 'Buying shares or bonds without control', 'A foreign fund buys shares in Mumbai'],
    ['External borrowing', 'Loans from abroad, commercial or official', 'An Indian airline borrows from a foreign bank'],
    ['Banking capital', 'Deposits moving between countries', 'An NRI opens a deposit in Kochi'],
  ],
  'Table of capital account items: foreign direct investment, portfolio investment, external borrowing and banking capital, each with an example',
);
const vAutoAcc = table(
  ['', 'Autonomous', 'Accommodating'],
  [
    ['Why made', 'For their own sake: profit, trade, consumption', 'To fill the gap left by autonomous items'],
    ['Depends on the BoP?', 'No', 'Yes'],
    ['Position', 'Above the line', 'Below the line'],
    ['Examples', 'Exports, imports, FDI, remittances', 'Change in official reserves, borrowing from the IMF'],
  ],
  'Table comparing autonomous transactions (made for their own sake, independent of the BoP, above the line) with accommodating transactions (made to cover the gap, below the line, such as reserve changes and IMF borrowing)',
);
const vDeficit = flow(
  'LR',
  ['Autonomous payments exceed autonomous receipts', 'BoP deficit', 'Central bank sells foreign currency or borrows', 'Official reserves fall'],
  'Flow: when autonomous payments exceed autonomous receipts the BoP is in deficit; the central bank sells foreign currency or borrows, so official reserves fall',
  'A surplus works the other way: reserves rise.',
);
const vSummary1 = table(
  ['Idea', 'Remember'],
  [
    ['BoP', 'Record of all transactions with the rest of the world in a period'],
    ['Current account', 'Goods + services + income + transfers'],
    ['Capital account', 'Changes in assets and liabilities: FDI, portfolio, loans, banking capital'],
    ['Balance of trade', 'Goods only'],
    ['Deficit or surplus', 'Autonomous items only; met by accommodating items'],
  ],
  'Summary table of Part 1: the BoP, current account, capital account, balance of trade, deficit or surplus',
);
const vTips1 = table(
  ['Common mistake', 'Write instead'],
  [
    ['Remittances in the capital account', 'Current account, transfers'],
    ['Interest on a foreign loan in the capital account', 'Current account, income; only the loan is capital'],
    ['Balance of trade includes services', 'Goods only'],
    ['BoP is always in balance, so there is no deficit', 'It balances in accounts; a deficit is in autonomous items'],
  ],
  'Table of common mistakes in Part 1 with corrections: remittances, interest on loans, balance of trade, and the meaning of BoP deficit',
);
const vRate = table(
  ['Quote', 'Meaning'],
  [
    ['₹82 per US dollar', 'One dollar costs 82 rupees'],
    ['Rate rises to ₹85', 'Dollar dearer; rupee worth less (depreciates)'],
    ['Rate falls to ₹80', 'Dollar cheaper; rupee worth more (appreciates)'],
  ],
  'Table reading exchange rates: 82 rupees per dollar means one dollar costs 82 rupees; a rise to 85 means the rupee depreciates; a fall to 80 means it appreciates',
  'Imagined quotes, not current market rates.',
);
const vSystems = table(
  ['System', 'Who sets the rate', 'Changes in value called'],
  [
    ['Fixed (pegged)', 'Government or central bank', 'Devaluation / revaluation'],
    ['Flexible (floating)', 'Demand and supply in the market', 'Depreciation / appreciation'],
    ['Managed floating', 'Market, with central bank intervention', 'Depreciation / appreciation'],
  ],
  'Table of the three exchange rate systems: fixed, set by the government; flexible, set by demand and supply; managed floating, set by the market with central bank intervention',
);
const vPeg = flow(
  'TB',
  ['Rate fixed at the official level', 'At that rate, demand for dollars exceeds supply', 'Central bank sells dollars from reserves', 'Rate held, but reserves fall'],
  'Flow showing how a peg is defended: at the fixed rate demand exceeds supply, so the central bank sells dollars from reserves; the rate holds but reserves fall',
  'Why a fixed rate needs large reserves',
);
const vMeritsTable = table(
  ['', 'Fixed', 'Flexible'],
  [
    ['Merit', 'Certainty for trade and investment', 'No need for large reserves; automatic adjustment'],
    ['Merit', 'Little room for speculation', 'Frees monetary policy for domestic goals'],
    ['Demerit', 'Needs large reserves; rate may be wrong', 'Uncertainty for traders'],
    ['Demerit', 'Sudden devaluations can hurt confidence', 'Speculation can cause sharp swings'],
  ],
  'Table of merits and demerits of fixed and flexible exchange rate systems',
);
const vManaged = flow(
  'LR',
  ['Market sets the rate', 'Sharp swing (too fast a rise or fall)', 'Central bank buys or sells dollars', 'Swing smoothed'],
  'Flow of managed floating: the market sets the rate; when it swings sharply the central bank buys or sells dollars to smooth the swing',
  'India moved to a market-determined rate in the early 1990s and manages it in this way.',
);
const vTerms = table(
  ['', 'Value falls', 'Value rises'],
  [
    ['Official decision (fixed system)', 'Devaluation', 'Revaluation'],
    ['Market forces (flexible system)', 'Depreciation', 'Appreciation'],
  ],
  'Two-by-two table: under a fixed system an official fall is devaluation and an official rise is revaluation; under a flexible system a market fall is depreciation and a market rise is appreciation',
);
const vReadEx = table(
  ['Change (imagined)', 'Rupee', 'Why'],
  [
    ['₹72 → ₹75 per USD in the market', 'Depreciates', 'More rupees for one dollar'],
    ['₹75 → ₹70 per USD in the market', 'Appreciates', 'Fewer rupees for one dollar'],
    ['Peg moved from 40 to 44 by the government', 'Devalued', 'Official decision to lower the value'],
  ],
  'Table of worked readings: 72 to 75 rupees per dollar is depreciation; 75 to 70 is appreciation; a peg moved from 40 to 44 by the government is devaluation',
);
const vSched = table(
  ['Rate (₹ per USD)', 'Demand (USD million)', 'Supply (USD million)', 'Market'],
  sched.map(([e, d, s]) => [String(e), String(d), String(s), d > s ? `Excess demand ${d - s}: rate rises` : d < s ? `Excess supply ${s - d}: rate falls` : 'Equilibrium']),
  `Schedule table from Qd = 500 − 5e and Qs = 5e − 100 at rates 40 to 80: excess demand below ${E0}, equilibrium at ${E0} with ${Q0} million dollars, excess supply above ${E0}`,
  'Imagined schedule.',
);
const vEvents = table(
  ['Event (other things equal)', 'Curve that shifts', 'Exchange rate', 'Rupee'],
  [
    ['More imports of electronics', 'Demand shifts right', 'Rises', 'Depreciates'],
    ['Foreign firms invest more in India', 'Supply shifts right', 'Falls', 'Appreciates'],
    ['Fewer foreign tourists visit', 'Supply shifts left', 'Rises', 'Depreciates'],
    ['Indians travel abroad less', 'Demand shifts left', 'Falls', 'Appreciates'],
  ],
  'Table of four events: more imports shift demand right and the rupee depreciates; more foreign investment shifts supply right and it appreciates; fewer tourists shift supply left and it depreciates; less travel abroad shifts demand left and it appreciates',
);
const vSummary2 = table(
  ['Idea', 'Remember'],
  [
    ['Exchange rate', 'Rupees per unit of foreign currency'],
    ['Fixed / flexible / managed', 'Official / market / market with intervention'],
    ['Devaluation vs depreciation', 'Official fall vs market fall'],
    ['Demand for dollars', 'Imports, travel, study and investment abroad; slopes down'],
    ['Supply of dollars', 'Exports, tourists, remittances, foreign investment; slopes up'],
  ],
  'Summary table of Part 2: exchange rate, the three systems, devaluation versus depreciation, demand for and supply of dollars',
);
const vTips2 = table(
  ['Common mistake', 'Write instead'],
  [
    ['A rise in ₹ per USD is appreciation', 'It is depreciation of the rupee'],
    ['Devaluation under a flexible system', 'Devaluation is official, under a fixed system'],
    ['Drawing the shift without labels', 'Label D, S, D₁ or S₁, E and E₁ and both axes'],
    ['Demand slopes down because exports rise', 'Because imports get cheaper at a lower rate'],
  ],
  'Table of common mistakes in Part 2 with corrections: direction of depreciation, devaluation, labelling diagrams, and the reason for the demand slope',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Balance of Payments — Part 1: The BoP Account',
  goals: [
    'Explain the meaning of the balance of payments and its two main accounts',
    'Classify transactions into the current and capital accounts, as receipts or payments',
    'Calculate the balance of trade, the current account balance and the overall balance',
    'Distinguish autonomous from accommodating transactions and explain BoP surplus and deficit',
  ],
  slides: [
    sl('title', 'Balance of Payments', {
      b: 'Part 1 — what the **BoP** records, the **current** and **capital** accounts, and **surplus, deficit and reserves**.',
      v: vRoute1,
      n: 'Every day, India buys oil and phones from abroad, sells software and rice, receives money from workers in the Gulf, and welcomes foreign investors. All these deals involve foreign currency. In this chapter we learn how a country keeps a record of all of them, called the balance of payments, and what it means when the record shows a surplus or a deficit.',
    }),
    sl('concept', 'What is the balance of payments?', {
      b: 'The **balance of payments (BoP)** is a systematic record of all economic transactions between the **residents** of a country and the **rest of the world** during a **period**, usually a year.',
      v: vBopMeaning,
      n: 'Read the definition word by word. It is systematic, so every deal goes under a fixed heading and is entered twice, once as a receipt and once as a payment. It covers all economic transactions, not just trade in goods. It is about residents dealing with the rest of the world. And it covers a period, usually a financial year, so it is a flow, not a stock.',
    }),
    sl('diagram', 'Structure of the BoP', {
      v: vStructure,
      n: 'The BoP has two main accounts. The current account records trade in goods and services, income and transfers. The capital account records deals that change what residents own abroad or owe to foreigners, such as investment and loans. Below these sit two balancing items: errors and omissions, for things that were missed, and the change in the official reserves of the central bank.',
    }),
    sl('concept', 'The current account', {
      b: 'Goods are **visible**; services, income and transfers are **invisible**. Receipts bring foreign exchange **in**; payments take it **out**.',
      v: vCurrent,
      n: 'The current account has four parts. Goods are called visible items because customs can see them at the border. Services such as software and shipping, income such as interest and dividends, and transfers such as money sent home by workers are called invisibles. For each one, ask whether foreign currency comes into India, which is a receipt, or goes out, which is a payment.',
    }),
    sl('two-column', 'Balance of trade and current account balance', {
      cols: [
        '**Balance of trade**\n\nExports of goods minus imports of goods. Visible items **only**.',
        '**Current account balance**\n\nBalance of trade **plus** net services, net income and net transfers.',
      ],
      v: vBotCab,
      n: 'Two balances are easy to confuse. The balance of trade looks only at goods. The current account balance adds the invisibles: services, income and transfers. So a country can import more goods than it exports and still have a surplus on its current account, if it earns enough from software, tourism and remittances.',
    }),
    sl('check', 'Quick check: gifts from abroad', {
      b: 'A family receives a cash gift from relatives abroad. Which account records it?',
      chk: 'tf_gift',
      n: 'Think about whether a gift creates any asset or any debt. If it does not, it cannot belong to the capital account.',
    }),
    sl('example', 'Worked example 1: classifying transactions', {
      b: 'Five imagined transactions of India, classified by account, item and side.',
      bl: [
        'Step 1 — Does it **change assets or liabilities** with non-residents? Then **capital account**.',
        'Step 2 — Otherwise it is **current**: goods, services, income or transfers.',
        'Step 3 — Does foreign exchange **come in** (receipt) or **go out** (payment)?',
      ],
      v: vClassify,
      n: 'Let us classify five imagined deals. Cloud services sold to an American retailer earn dollars, so they are a service receipt. A flat bought in Dubai is an asset abroad, a capital payment. Robots from Japan are imported goods. Profit sent home by a foreign bank is income paid out. And a deposit by a non-resident Indian is banking capital coming in.',
    }),
    sl('concept', 'The capital account', {
      b: 'The capital account records transactions that **change the assets or liabilities** of residents with the rest of the world.',
      v: vCapital,
      n: 'The capital account records flows that change what residents own or owe. Foreign direct investment buys a lasting, controlling stake, like a new factory. Portfolio investment buys shares or bonds without control. External borrowing brings in loans, which must be repaid. Banking capital includes deposits that move between countries, such as deposits of non-resident Indians in Indian banks.',
    }),
    sl('check', 'Quick check: the invisible items', {
      b: 'Fill in the blank.',
      chk: 'fb_invisibles',
      n: 'Remember which items customs officers cannot see crossing the border.',
    }),
    sl('two-column', 'Autonomous and accommodating transactions', {
      cols: [
        '**Autonomous** (above the line)\n\nMade for a reason of their own, whatever the BoP looks like.',
        '**Accommodating** (below the line)\n\nMade only because autonomous items left a gap.',
      ],
      v: vAutoAcc,
      n: 'Economists divide BoP transactions into two groups. Autonomous transactions happen for their own reasons: a firm exports for profit, a family imports a car, a foreign company invests. Accommodating transactions happen only to fill the gap these leave, for example when the central bank sells dollars from its reserves or borrows from the International Monetary Fund.',
    }),
    sl('diagram', 'Deficit, surplus and reserves', {
      b: 'A **BoP deficit**: autonomous payments exceed autonomous receipts. A **surplus**: the reverse.',
      v: vDeficit,
      n: 'A BoP deficit means autonomous payments to the world are bigger than autonomous receipts. The gap must be filled, usually by the central bank selling foreign currency from its reserves, or by borrowing. So a deficit shows up as a fall in official reserves. A surplus works the other way round and adds to reserves.',
    }),
    sl('example', 'Worked example 2: the BoP of Sundaravan', {
      b: 'Imagined country Sundaravan, USD million.',
      bl: [
        `Trade balance = ${f(SUN.xg)} − ${f(SUN.mg)} = **−${f(-sun.bot)}**`,
        `Net invisibles = services ${f(sun.svc)} + income (−${f(-sun.inc)}) + transfers ${f(sun.tr)} = **${f(sun.invis)}**`,
        `Current account balance = −${f(-sun.bot)} + ${f(sun.invis)} = **+${f(sun.cab)}**`,
        `Net autonomous capital flows = FDI ${f(SUN.fdi)} + portfolio (−${f(-SUN.fpi)}) + loans (−${f(-SUN.loans)}) = **−${f(-sun.ka)}**`,
        `Overall balance = ${f(sun.cab)} − ${f(-sun.ka)} = **−${f(-sun.overall)}**: a deficit, so reserves fall by ${f(-sun.overall)}`,
      ],
      v: table(
        ['Item', 'Receipts', 'Payments', 'Net'],
        [
          ['Goods', f(SUN.xg), f(SUN.mg), `−${f(-sun.bot)}`],
          ['Services', f(SUN.xs), f(SUN.ms), `+${f(sun.svc)}`],
          ['Income', f(SUN.ir), f(SUN.ip), `−${f(-sun.inc)}`],
          ['Transfers', f(SUN.tr), f(SUN.tp), `+${f(sun.tr)}`],
        ],
        `Table of Sundaravan's current account in USD million: goods 800 received and 1,150 paid, services 520 and 260, income 30 and 70, transfers 200 and 20`,
        'Imagined data.',
      ),
      n: 'Here is an imagined country, Sundaravan. Goods show a deficit of three hundred and fifty. But invisibles earn four hundred net, so the current account has a small surplus of fifty. Capital flows are negative: one hundred and seventy more left than came in. Adding them, the overall balance is a deficit of one hundred and twenty, which the central bank covers from its reserves.',
    }),
    sl('diagram', 'Sundaravan at a glance', {
      v: vBars,
      n: 'This chart tells the same story. The red bar on the left is the trade deficit. The tall green bar is the surplus on invisibles, which more than covers it, giving a small current account surplus. The capital account bar is red, because more money left than came in. The last bar, the overall deficit, is the amount by which the central bank\'s reserves must fall.',
    }),
    sl('check', 'Quick check: trade deficit', {
      b: 'Calculate the trade deficit.',
      chk: 'n_bot',
      n: 'Use goods only. Subtract imports of goods from exports of goods, and report the size of the gap.',
    }),
    sl('example', 'Worked example 3: trade deficit, current account surplus', {
      b: 'Can a country import more goods than it sells and still earn more than it spends on its current account?',
      bl: [
        'Step 1 — Write the identity: current account balance = trade balance + net invisibles.',
        'Step 2 — Imagined figures: trade balance −600; services +450; income −50; transfers +300.',
        `Step 3 — Net invisibles = 450 − 50 + 300 = **700**; current account = −600 + 700 = **+100**.`,
        'Step 4 — Conclude: yes, when invisibles earn more than the goods deficit.',
      ],
      v: flow('LR', ['Trade balance −600', 'Net invisibles +700', 'Current account +100'], 'Flow: a trade balance of minus 600 plus net invisibles of 700 gives a current account surplus of 100', 'Imagined figures, USD million.'),
      n: 'Here is a common exam question. Write the identity first. Then add the invisibles carefully with their signs: services plus four hundred and fifty, income minus fifty, transfers plus three hundred, giving seven hundred. Seven hundred more than covers the trade deficit of six hundred, so the current account shows a surplus of one hundred.',
    }),
    sl('check', 'Quick check: the order of working', {
      b: 'Arrange the steps for finding the overall balance.',
      chk: 'ord_overall',
      n: 'Build the balance from the inside out: goods first, then the rest of the current account, then capital, then reserves.',
    }),
    sl('summary', 'Summary', {
      v: vSummary1,
      n: 'To sum up. The BoP records all transactions of residents with the rest of the world over a period. The current account has goods, services, income and transfers. The capital account records changes in assets and liabilities. The balance of trade counts goods only. Surplus and deficit refer to autonomous items, and accommodating items such as reserves fill the gap.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Classification questions: name the **account**, the **item** and the **side** (receipt or payment), with a reason.',
        'Numericals: write each **balance with its sign** and the word **deficit** or **surplus**.',
        'Two-mark differences: state **both** sides in parallel.',
      ],
      v: vTips1,
      n: 'In classification questions, marks come for the account, the item and the reason. In numericals, set out each step, keep the signs, and always end with the words deficit or surplus. Watch the classic traps in this table: remittances and interest belong to the current account, and the balance of trade counts goods only.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Balance of Payments — Part 2: Exchange Rates',
  goals: [
    'Explain the foreign exchange rate and read changes in it',
    'Compare fixed, flexible and managed floating exchange rate systems',
    'Distinguish devaluation from depreciation, and revaluation from appreciation',
    'Explain how demand and supply determine the exchange rate in a free market, and the effect of shifts',
  ],
  slides: [
    sl('title', 'Exchange rates', {
      b: 'Part 2 — the **exchange rate**, the **three systems**, and how **demand and supply** set the rate.',
      v: vRoute2,
      n: 'When an Indian company buys machines from America, it must pay in dollars. How many rupees does a dollar cost, and who decides? In this part we learn what the exchange rate is, compare the systems countries use to manage it, and see how demand and supply set it in a free market.',
    }),
    sl('concept', 'The foreign exchange rate', {
      b: 'The **exchange rate** is the price of one unit of foreign currency in terms of domestic currency, e.g. rupees per US dollar.',
      v: vRate,
      n: 'The exchange rate is simply a price: the price of a dollar in rupees. If a dollar costs eighty two rupees, that is the rate. If it rises to eighty five, the dollar has become dearer and the rupee is worth less: the rupee has depreciated. If it falls to eighty, the rupee has appreciated. These are imagined numbers, not today\'s rate.',
    }),
    sl('concept', 'Three exchange rate systems', {
      v: vSystems,
      n: 'Countries use three broad systems. In a fixed or pegged system, the government or central bank sets the rate. In a flexible or floating system, the market sets it through demand and supply. In between is managed floating, where the market sets the rate but the central bank steps in to smooth sharp movements.',
    }),
    sl('diagram', 'How a fixed rate is defended', {
      v: vPeg,
      n: 'How does a central bank keep a rate fixed? If, at the official rate, people want more dollars than are on offer, the central bank must sell dollars from its reserves to fill the gap. The rate holds, but reserves fall. If this goes on year after year, reserves run low and the country may have to devalue.',
    }),
    sl('check', 'Quick check: reserves under a float', {
      b: 'True or false?',
      chk: 'tf_flex_res',
      n: 'Ask yourself: under a pure float, is there any rate the central bank has promised to defend?',
    }),
    sl('two-column', 'Fixed versus flexible: merits and demerits', {
      cols: [
        '**Fixed**\n\nStable and predictable, but needs large reserves and can be set at the wrong level.',
        '**Flexible**\n\nAdjusts on its own and needs few reserves, but can be volatile and invite speculation.',
      ],
      v: vMeritsTable,
      n: 'Each system has strengths and weaknesses. A fixed rate gives traders certainty and limits speculation, but it needs large reserves, and if the rate is set wrongly it must be changed suddenly. A flexible rate adjusts by itself and needs few reserves, but frequent swings create uncertainty for exporters, importers and investors.',
    }),
    sl('diagram', 'Managed floating', {
      v: vManaged,
      n: 'Most countries today choose the middle path. Under managed floating, demand and supply set the rate from day to day, but when it moves too fast, the central bank buys or sells dollars to calm the market. India moved from a pegged rate to a market-determined rate in stages in the early nineteen nineties, and the Reserve Bank manages it in this way.',
    }),
    sl('concept', 'Four words for changes in value', {
      v: vTerms,
      n: 'Four words describe changes in a currency\'s value. If the change is an official decision under a fixed system, a fall is devaluation and a rise is revaluation. If the change comes from market forces under a flexible system, a fall is depreciation and a rise is appreciation. Learn this little table; examiners test it often.',
    }),
    sl('check', 'Quick check: match the terms', {
      b: 'Match each exchange-rate term with the change in the value of a currency that it describes.',
      chk: 'mt_terms',
      n: 'Sort the four words by two questions: did the value fall or rise, and was it an official decision or the market?',
    }),
    sl('example', 'Worked example 1: reading changes in the rate', {
      b: 'Decide what happened to the rupee in each imagined case.',
      bl: [
        'Step 1 — Did the number of rupees per dollar **rise** (rupee weaker) or **fall** (rupee stronger)?',
        'Step 2 — Was it the **market** or an **official decision**?',
        'Step 3 — Name it: depreciation, appreciation, devaluation or revaluation.',
      ],
      v: vReadEx,
      n: 'Apply two steps. First, did the rupee price of a dollar rise or fall? A rise means the rupee is weaker. Second, who caused it? From seventy two to seventy five in the market is depreciation. From seventy five to seventy in the market is appreciation. A peg moved by the government from forty to forty four is devaluation.',
    }),
    sl('diagram', 'Demand for foreign exchange', {
      b: 'Sources: **imports**, travel and study abroad, investment abroad, gifts sent abroad, repayment of foreign loans.',
      v: vDemand,
      n: 'Who needs dollars? Importers, students and tourists going abroad, Indians investing abroad, and anyone repaying a foreign loan. The demand curve slopes downward. When the rupee price of a dollar is high, imports and foreign trips are expensive, so fewer dollars are demanded. When the rate is low, they are cheap, so more dollars are demanded.',
    }),
    sl('diagram', 'Supply of foreign exchange', {
      b: 'Sources: **exports**, foreign tourists, **remittances**, foreign direct and portfolio investment, loans from abroad.',
      v: vSupply,
      n: 'Who brings dollars in? Exporters, foreign tourists, workers sending money home, and foreign investors. The supply curve usually slopes upward. When each dollar buys more rupees, Indian goods and holidays become cheaper for foreigners, so they buy more and supply more dollars.',
    }),
    sl('diagram', 'Equilibrium exchange rate', {
      v: vEquil,
      n: `Put the two curves together. They cross at point E, where the quantity of dollars demanded equals the quantity supplied. In our imagined market that happens at ${E0} rupees per dollar, with ${Q0} million dollars traded. Above E there is excess supply and the rate falls; below E there is excess demand and the rate rises.`,
    }),
    sl('example', 'Worked example 2: equilibrium from a schedule', {
      b: 'Imagined market: Qd = 500 − 5e and Qs = 5e − 100 (USD million; e in ₹ per USD).',
      bl: [
        'Step 1 — Set demand equal to supply: 500 − 5e = 5e − 100.',
        `Step 2 — 600 = 10e, so **e = ${E0}**.`,
        `Step 3 — Quantity = 500 − 5 × ${E0} = **${Q0}** (check: 5 × ${E0} − 100 = ${Q0}).`,
        'Step 4 — At 50, demand exceeds supply, so the rate is pushed up towards 60.',
      ],
      v: vSched,
      n: `To find the equilibrium, set demand equal to supply and solve. Five hundred minus five e equals five e minus one hundred, so ten e is six hundred and e is ${E0}. At that rate both demand and supply are ${Q0} million dollars. The table confirms it: at lower rates there is excess demand, and at higher rates excess supply.`,
    }),
    sl('check', 'Quick check: reading a rate change', {
      b: 'Choose the correct option.',
      chk: 'm_reading',
      n: 'Fewer rupees for one dollar: is the rupee now worth more or less?',
    }),
    sl('diagram', 'When demand for dollars rises', {
      v: vDShift,
      n: `Suppose Indians start importing many more electronic goods. Demand for dollars rises at every rate, so the demand curve shifts right. At the old rate of ${E0} there is now excess demand, so the rate rises to ${E1} rupees per dollar, and more dollars are traded. The rupee has depreciated.`,
    }),
    sl('diagram', 'When supply of dollars rises', {
      v: vSShift,
      n: `Now suppose foreign investment and remittances pour in. The supply of dollars rises at every rate, so the supply curve shifts right. At the old rate there is excess supply, so the rate falls to ${E2} rupees per dollar. The rupee has appreciated.`,
    }),
    sl('example', 'Worked example 3: predicting the effect of events', {
      b: 'For each event, ask: which curve shifts, which way, and what happens to the rate?',
      v: vEvents,
      n: 'Use one routine for every event. First decide whether it changes the demand for dollars or the supply. Then decide the direction. A rightward shift of demand, or a leftward shift of supply, raises the rate and the rupee depreciates. A rightward shift of supply, or a leftward shift of demand, lowers the rate and the rupee appreciates.',
    }),
    sl('check', 'Quick check: expectations', {
      b: 'True or false?',
      chk: 'tf_speculation',
      n: 'If people expect the dollar to become dearer soon, what will they do today, and how does that affect today\'s demand?',
    }),
    sl('summary', 'Summary', {
      v: vSummary2,
      n: 'To sum up. The exchange rate is the rupee price of foreign currency. Under a fixed system the government sets it; under a flexible system the market does; under managed floating the market sets it with central bank help. Demand for dollars slopes down, supply slopes up, and they meet at the equilibrium rate. Shifts in either curve change the rate.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Diagrams: label **both axes**, the curves, and the old and new equilibria.',
        'In shift questions, state **which curve**, **which way**, the **new rate** and **depreciation or appreciation**.',
        'Merits and demerits: give **three distinct points**, each with a reason.',
      ],
      v: vTips2,
      n: 'For diagram questions, label everything: the axes, demand and supply, and the old and new points. In shift questions, examiners give marks for naming the curve, the direction of the shift, the change in the rate and the right word for the rupee. And remember the most common slip: a rise in rupees per dollar means the rupee depreciates.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Balance of Payments — Notes',
  sections: [
    {
      h: '1. Meaning and structure of the BoP',
      t: 1,
      b: 'The **balance of payments** is a systematic record of all economic transactions of the **residents** of a country with the **rest of the world** during a period, usually a **financial year**. It is a **flow** statement kept by **double entry**: every receipt has a matching payment entry.\n\n**Structure:** (1) **current account**; (2) **capital account**; (3) **errors and omissions** (a statistical adjustment); (4) **change in official reserves** of the central bank.\n\n**Receipts (credit, +)** bring foreign exchange in; **payments (debit, −)** take it out.',
      terms: [
        ['Balance of payments', 'A record of all economic transactions of a country\'s residents with the rest of the world over a period.'],
        ['Official reserves', 'Foreign currency, gold and similar assets held by the central bank.'],
        ['Errors and omissions', 'A balancing item for transactions missed or wrongly recorded.'],
      ],
      v: vStructure,
    },
    {
      h: '2. The current account',
      t: 1,
      b: 'Records transactions that **do not change** a country\'s assets or liabilities with the rest of the world.\n\n1. **Goods (visible trade):** exports and imports of merchandise. **Balance of trade = exports of goods − imports of goods.**\n2. **Services:** travel, transport, software, banking, insurance.\n3. **Income:** compensation of employees and investment income (interest, dividends, profit).\n4. **Transfers:** receipts or payments with nothing given in return: **remittances**, gifts, grants.\n\nItems 2–4 are **invisibles**. **Current account balance = balance of trade + net invisibles.** A **current account deficit** means payments exceed receipts on these items.',
      terms: [
        ['Visible items', 'Exports and imports of goods.'],
        ['Invisible items', 'Services, income and transfers.'],
        ['Balance of trade', 'Exports of goods minus imports of goods.'],
      ],
      v: vCurrent,
      vs: [vBotCab],
    },
    {
      h: '3. The capital account',
      t: 1,
      b: 'Records transactions that **change the assets or liabilities** of residents with the rest of the world.\n\n- **Foreign direct investment (FDI):** a lasting, controlling stake in an enterprise.\n- **Portfolio investment (FPI):** shares and bonds bought without control.\n- **External borrowings:** commercial loans and official assistance.\n- **Banking capital:** deposits such as those of **non-resident Indians**.\n\nInflows (borrowing, foreign investment into India) are **receipts**; outflows (lending abroad, investing abroad, repaying loans) are **payments**. **Interest** on a loan is **income** (current account); only the loan itself is capital.',
      terms: [
        ['Foreign direct investment', 'Investment that gives a lasting interest and control in a foreign enterprise.'],
        ['Portfolio investment', 'Purchase of foreign shares or bonds without control.'],
      ],
      v: vCapital,
      vs: [vClassify],
    },
    {
      h: '4. Autonomous and accommodating transactions; BoP surplus and deficit',
      t: 1,
      b: '- **Autonomous** transactions are undertaken for a motive of their own (profit, trade, consumption), independent of the BoP position: "**above the line**".\n- **Accommodating** transactions are undertaken to cover the gap in autonomous items: "**below the line**", e.g. **sale of reserves** or **borrowing from the IMF**.\n\n**BoP deficit:** autonomous payments > autonomous receipts → **official reserves fall** (or the country borrows). **BoP surplus:** autonomous receipts > autonomous payments → **reserves rise**.\n\nIn the accounting sense the BoP **always balances**, because accommodating items and errors and omissions close any gap. "Deficit" and "surplus" therefore describe **autonomous** items.\n\n**Worked check (imagined Islandia, USD million):** trade −' + f(-isl.bot) + '; invisibles +' + f(isl.invis) + '; current account +' + f(isl.cab) + '; capital +' + f(isl.ka) + '; overall surplus ' + f(isl.overall) + ', so reserves rise.',
      terms: [
        ['Autonomous transactions', 'BoP transactions made for their own sake, independent of the BoP position.'],
        ['Accommodating transactions', 'BoP transactions made to finance the gap in autonomous items.'],
        ['BoP deficit', 'Excess of autonomous payments over autonomous receipts.'],
      ],
      v: vAutoAcc,
      vs: [vDeficit, vBars],
    },
    {
      h: '5. Exchange rate systems',
      t: 2,
      b: 'The **foreign exchange rate** is the price of one unit of foreign currency in domestic currency (e.g. ₹ per USD). A **rise** in this rate means the rupee is **weaker**.\n\n- **Fixed (pegged):** set by the government or central bank, defended by buying and selling foreign currency. Merits: **certainty**, little speculation, policy discipline. Demerits: needs **large reserves**; the rate may be set wrongly; sudden **devaluations**.\n- **Flexible (floating):** set by **demand and supply** without intervention. Merits: **automatic adjustment**, few reserves needed, monetary policy free for domestic aims. Demerits: **uncertainty**, **speculation**, imported inflation after sharp depreciation.\n- **Managed floating ("dirty floating"):** market-determined, with central bank **intervention** to curb sharp swings. India moved from a pegged rate to a market-determined rate in stages in the early 1990s and follows managed floating.\n\n**Terms:** devaluation and revaluation (official, fixed system); depreciation and appreciation (market, flexible system).',
      terms: [
        ['Exchange rate', 'The price of one unit of foreign currency in terms of domestic currency.'],
        ['Devaluation', 'An official reduction in the external value of a currency under a fixed system.'],
        ['Depreciation', 'A fall in the external value of a currency through market forces.'],
        ['Managed floating', 'A market-determined rate with central bank intervention to limit fluctuations.'],
      ],
      v: vSystems,
      vs: [vMeritsTable, vTerms],
    },
    {
      h: '6. Determination of the exchange rate in a free market',
      t: 3,
      b: '**Demand for foreign exchange** comes from imports of goods and services, travel and study abroad, investment and lending abroad, gifts sent abroad and loan repayments. It **slopes downward**: at a higher rate, imports are dearer, so less is demanded.\n\n**Supply of foreign exchange** comes from exports, foreign tourists, **remittances**, foreign direct and portfolio investment and loans from abroad. It usually **slopes upward**: at a higher rate, exports are cheaper for foreigners, so more is supplied.\n\n**Equilibrium:** the rate at which quantity demanded = quantity supplied. Excess demand pushes the rate **up**; excess supply pushes it **down**.\n\n**Shifts:** demand rises (or supply falls) → rate **rises** → rupee **depreciates**. Supply rises (or demand falls) → rate **falls** → rupee **appreciates**. **Speculation** can shift demand by itself: expecting depreciation, traders buy dollars now.',
      terms: [
        ['Equilibrium exchange rate', 'The rate at which the demand for foreign exchange equals its supply.'],
        ['Appreciation', 'A rise in the external value of a currency through market forces.'],
        ['Speculation', 'Buying or selling currency to profit from expected changes in its rate.'],
      ],
      v: vEquil,
      vs: [vDShift, vSShift, vEvents],
    },
  ],
  tips: '**Common mistakes**\n- Putting **remittances** or **interest** in the capital account: both are **current account** items (transfers; income).\n- Including services in the **balance of trade**: it is **goods only**.\n- Saying the BoP "never has a deficit": it **balances in accounts**, but autonomous items can show a deficit.\n- Calling a rise in ₹ per USD an appreciation of the rupee: it is a **depreciation**.\n- Using **devaluation** for a market fall: devaluation is **official**, under a fixed system.\n- Unlabelled diagrams: label **axes, D, S, E** and any new curves and points.\n\n**How marks are usually awarded**\n- 1 mark: one correct option.\n- 2 marks: two points, or a difference stated on both sides (about 30–50 words).\n- 3 marks: three distinct points, or a classification with reasons (about 50–80 words).\n- 4 marks (case-based): numerical parts need the method and the answer with its unit and the word deficit or surplus.\n- 5 marks: five points, or a full numerical with each balance shown; diagrams fully labelled.\n\n**Data in SOYL practice** are imagined; exchange rates in practice items are not market rates.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['**Balance of payments**', 'Systematic record of all economic transactions of residents with the **rest of the world** in a **period**.', 'definition', 1],
  ['Two main accounts of the BoP', '**Current account** and **capital account** (plus errors and omissions and the change in reserves).', 'concept', 1],
  ['Four parts of the **current account**', 'Goods, services, income, transfers.', 'concept', 1],
  ['**Visible** items', 'Exports and imports of **goods**.', 'definition', 1],
  ['**Invisible** items', '**Services, income and transfers**.', 'definition', 1],
  ['**Balance of trade**', 'Exports of goods **minus** imports of goods.', 'formula', 1],
  ['**Current account balance**', 'Balance of trade **+** net invisibles.', 'formula', 1],
  ['Remittances from workers abroad', '**Current account, transfers**, a receipt.', 'example', 1],
  ['Interest paid on a foreign loan', '**Current account, income**, a payment (the loan itself is capital).', 'exam-tip', 1],
  ['What does the **capital account** record?', 'Transactions that **change assets or liabilities** of residents with non-residents.', 'definition', 1],
  ['**FDI** vs **portfolio investment**', 'FDI: lasting, controlling stake. Portfolio: shares or bonds **without control**.', 'concept', 1],
  ['**Autonomous** transactions', 'Made for their own sake, **independent of the BoP**; above the line.', 'definition', 1],
  ['**Accommodating** transactions', 'Made to **cover the gap** in autonomous items; below the line (e.g. sale of reserves).', 'definition', 1],
  ['**BoP deficit**', 'Autonomous payments **exceed** autonomous receipts; reserves fall.', 'definition', 1],
  ['Why does the BoP always balance in accounts?', '**Double entry**: accommodating items and errors and omissions close any gap.', 'concept', 1],
  ['Trade deficit 600, net invisibles +700', 'Current account **surplus of 100**.', 'example', 1],
  ['**Exchange rate**', 'Price of one unit of foreign currency in **domestic currency** (₹ per USD).', 'definition', 2],
  ['**Fixed** exchange rate', 'Set and defended by the **government or central bank**.', 'definition', 2],
  ['**Flexible** exchange rate', 'Set by **demand and supply** in the market, without intervention.', 'definition', 2],
  ['**Managed floating**', 'Market rate with **central bank intervention** to smooth swings; "dirty floating".', 'definition', 2],
  ['Devaluation vs depreciation', 'Devaluation: **official** fall (fixed). Depreciation: **market** fall (flexible).', 'concept', 2],
  ['Revaluation vs appreciation', 'Revaluation: **official** rise. Appreciation: **market** rise.', 'concept', 2],
  ['Why does a fixed rate need large reserves?', 'To **sell foreign currency** whenever demand exceeds supply at the fixed rate.', 'concept', 2],
  ['Two demerits of a flexible rate', '**Uncertainty** for trade and investment; **speculative** swings.', 'concept', 2],
  ['₹ per USD rises from 80 to 84', 'The rupee **depreciates**.', 'example', 2],
  ['Sources of **demand** for foreign exchange', 'Imports, travel and study abroad, investment abroad, loan repayments, gifts sent abroad.', 'concept', 3],
  ['Sources of **supply** of foreign exchange', 'Exports, foreign tourists, remittances, FDI and portfolio inflows, foreign loans.', 'concept', 3],
  ['Why does demand for dollars slope **down**?', 'At a higher rate, **imports are dearer**, so fewer dollars are wanted.', 'concept', 3],
  ['Why does supply of dollars slope **up**?', 'At a higher rate, **exports are cheaper** for foreigners, so more dollars come in.', 'concept', 3],
  ['Effect of a big **FDI inflow**', 'Supply shifts right → rate **falls** → rupee **appreciates**.', 'example', 3],
  ['Effect of a surge in **imports**', 'Demand shifts right → rate **rises** → rupee **depreciates**.', 'example', 3],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-12-default-chapter-test-short',
  title: 'Chapter test (short) — Balance of Payments',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_ca_item', 'm_fixed', 'm_d_shift', 'ar_trade_ca'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and the 3-mark question in about 50–80 words.', items: ['s_bot_bop', 's_dev_dep', 's3_shifts'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80–120 words.', items: [{ attempt: 1, keys: ['l_components', 'l_determination'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks)', instr: 'Study the table and answer all parts. Part (c) has an internal choice.', items: ['cb_islandia'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-12-default-chapter-test-long',
  title: 'Chapter test (long) — Balance of Payments',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_bop_def', 'm_ka_item', 'm_accommodating', 'm_deficit_meaning', 'm_managed', 'm_devaluation', 'm_demand_src', 'm_s_shift', 'ar_devalue', 'ar_s_slope'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and 3-mark questions in about 50–80 words. Questions 13 and 15 have an internal choice.', items: ['s_auto_acc', 's_why_d', { attempt: 1, keys: ['s_ca_ka', 's_managed'] }, 's3_classify', { attempt: 1, keys: ['s3_fixed_merits', 's3_flex_demerits'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18.', items: ['l_islandia_num', { attempt: 1, keys: ['l_compare', 'l_deficit'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks each)', instr: 'Read each case and answer all parts. Part (c) of each has an internal choice.', items: ['cb_market', 'cb_peg'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t03 of cbse-12-economics-ch05 only (BoP account and its components, surplus and deficit; fixed, flexible and managed floating rates; free-market determination of the exchange rate)',
    originality: 'every country, account, schedule and case written for this chapter (imagined places and figures); no NCERT exercise, boxed example or board/sample-paper item reused',
    data: `all numericals computed by the build: Sundaravan trade −${-sun.bot}, invisibles +${sun.invis}, current account +${sun.cab}, capital −${-sun.ka}, overall −${-sun.overall}; Islandia current account +${isl.cab}, overall +${isl.overall}; deck market Qd = 500 − 5e, Qs = 5e − 100 → e ${E0}, demand +100 → ${E1}, supply +100 → ${E2}; question market Qd = 640 − 4e, Qs = 6e − 160 → e 80; SVG curves plotted from the same equations`,
    facts: 'standard BoP classification (current: goods, services, income, transfers; capital: FDI, portfolio, borrowing, banking capital); India\'s move to a market-determined rate in the early 1990s stated broadly; no current exchange rates or Indian BoP statistics used',
    gate: 'schema, pipeline lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
