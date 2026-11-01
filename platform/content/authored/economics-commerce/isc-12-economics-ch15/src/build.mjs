// Build ISC 12 Economics ch15 Balance of Payments and Foreign Exchange Rate. Run from platform/:
//   npx tsx content/authored/economics-commerce/isc-12-economics-ch15/src/build.mjs
// Uses the shared ISC 12 Economics lib in isc-12-economics-ch01/src/lib.mjs (not copied, not edited).
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from '../../isc-12-economics-ch01/src/lib.mjs';

setUnit('isc-12-economics-ch15', 'economics-commerce');
const {
  inr, VA, VB, TA, TB, KE, KB, FX, E0, ED, ES, qd, qs, EXCESS_D45, MIC, MIC_1, MIC_2, PCT,
} = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const assert = (cond, msg) => { if (!cond) throw new Error(`build.mjs: ${msg}`); };

// ---------------------------------------------------------------- SVG figures (curves from the asserted equations)
// Demand e = (a − Q) / b; supply e = (Q − c) / d, with Q in millions of US dollars and e in rupees per US dollar.
const eD = (a) => (q) => (a - q) / FX.b;
const eS = (c) => (q) => (q - c) / FX.d;
function fxFrame() {
  const s = new Svg(520, 420);
  const c = s.chart({ x1: 200, y1: 80, left: 80, top: 40, width: 360, height: 300, xLabel: 'Quantity of US dollars (million)', yLabel: 'Rupees per US dollar' });
  return { s, c };
}
const vFxEq = (() => {
  const { s, c } = fxFrame();
  c.fn(eD(FX.a), 20, 180, { color: 'blue', sw: 2.6 });
  c.fn(eS(FX.c), 20, 180, { color: 'accent', sw: 2.6 });
  c.label([180, eD(FX.a)(180)], 'D', { dx: 10, dy: 0, size: 13, bold: true, color: 'blue' });
  c.label([180, eS(FX.c)(180)], 'S', { dx: 10, dy: 0, size: 13, bold: true, color: 'accent' });
  c.drop([E0.q, E0.e]);
  c.dot([E0.q, E0.e]);
  c.label([E0.q, E0.e], 'E', { dx: 0, dy: -14, size: 13, bold: true });
  c.xTick(E0.q, String(E0.q)).yTick(E0.e, String(E0.e));
  assert(eD(FX.a)(E0.q) === E0.e && eS(FX.c)(E0.q) === E0.e, 'E on both curves');
  return s.visual(
    `Demand and supply of US dollars in an imagined market: the demand curve slopes downward and the supply curve slopes upward; they cross at E, where the rate is ${E0.e} rupees per US dollar and ${E0.q} million US dollars are exchanged`,
    `Imagined market: Qd = ${FX.a} − ${FX.b}e, Qs = ${FX.d}e − ${-FX.c}.`,
  );
})();
const vFxDemand = (() => {
  const { s, c } = fxFrame();
  c.fn(eD(FX.a), 20, 180, { color: 'blue', sw: 2.2, dash: true });
  c.fn(eD(FX.a + 40), 60, 200, { color: 'blue', sw: 2.6 });
  c.fn(eS(FX.c), 20, 180, { color: 'accent', sw: 2.6 });
  c.label([180, eD(FX.a)(180)], 'D', { dx: 10, size: 13, bold: true, color: 'blue' });
  c.label([196, eD(FX.a + 40)(196)], 'D1', { dx: -2, dy: -14, size: 13, bold: true, color: 'blue' });
  c.label([180, eS(FX.c)(180)], 'S', { dx: 10, size: 13, bold: true, color: 'accent' });
  c.dot([E0.q, E0.e]).dot([ED.q, ED.e]);
  c.label([E0.q, E0.e], 'E', { dx: -12, dy: -10, size: 13, bold: true });
  c.label([ED.q, ED.e], 'E1', { dx: -16, dy: -12, size: 13, bold: true });
  c.drop([ED.q, ED.e]);
  c.yTick(E0.e, String(E0.e)).yTick(ED.e + 2, '');
  c.label([0, ED.e], String(ED.e), { dx: -26, dy: -6, size: 12 });
  c.xTick(E0.q, String(E0.q)).xTick(ED.q, String(ED.q));
  assert(eD(FX.a + 40)(ED.q) === ED.e && eS(FX.c)(ED.q) === ED.e, 'E1 on both curves');
  return s.visual(
    `An increase in demand for US dollars: the demand curve shifts right from D to D1 along an unchanged supply curve; the equilibrium moves from E at ${E0.e} rupees and ${E0.q} million to E1 at ${ED.e} rupees and ${ED.q} million, so the rupee depreciates`,
    'Imagined market: demand up by 40 million at every rate.',
  );
})();
const vFxSupply = (() => {
  const { s, c } = fxFrame();
  c.fn(eD(FX.a), 20, 180, { color: 'blue', sw: 2.6 });
  c.fn(eS(FX.c), 20, 180, { color: 'accent', sw: 2.2, dash: true });
  c.fn(eS(FX.c + 60), 60, 200, { color: 'accent', sw: 2.6 });
  c.label([180, eD(FX.a)(180)], 'D', { dx: 10, size: 13, bold: true, color: 'blue' });
  c.label([180, eS(FX.c)(180)], 'S', { dx: 10, size: 13, bold: true, color: 'accent' });
  c.label([200, eS(FX.c + 60)(200)], 'S1', { dx: 12, dy: 6, size: 13, bold: true, color: 'accent' });
  c.dot([E0.q, E0.e]).dot([ES.q, ES.e]);
  c.label([E0.q, E0.e], 'E', { dx: 0, dy: -14, size: 13, bold: true });
  c.label([ES.q, ES.e], 'E2', { dx: 14, dy: 12, size: 13, bold: true });
  c.drop([ES.q, ES.e]);
  c.yTick(E0.e, String(E0.e)).yTick(ES.e, String(ES.e));
  c.xTick(E0.q, String(E0.q)).xTick(ES.q, String(ES.q));
  assert(eD(FX.a)(ES.q) === ES.e && eS(FX.c + 60)(ES.q) === ES.e, 'E2 on both curves');
  return s.visual(
    `An increase in the supply of US dollars: the supply curve shifts right from S to S1 along an unchanged demand curve; the equilibrium moves from E at ${E0.e} rupees and ${E0.q} million to E2 at ${ES.e} rupees and ${ES.q} million, so the rupee appreciates`,
    'Imagined market: supply up by 60 million at every rate.',
  );
})();
const vVanadeshBars = (() => {
  const bars = [['Trade', VB.bot], ['Services', VB.services], ['Income', VA.inc], ['Transfers', VB.transfers], ['Current', VB.ca], ['Capital', VB.ka], ['Overall', VB.overall]];
  const s = new Svg(560, 420);
  const c = s.chart({ x0: 0, x1: 8, y0: -1600, y1: 1600, left: 80, top: 40, width: 420, height: 300, xLabel: '', yLabel: '₹ crore' });
  bars.forEach(([name, v], i) => {
    const x = i + 1;
    const x0 = c.X(x - 0.32), x1 = c.X(x + 0.32);
    const top = Math.max(c.Y(v), c.Y(0)), h = Math.abs(c.Y(v) - c.Y(0));
    s.rect(x0, Math.min(c.Y(v), c.Y(0)), x1 - x0, h, { fill: v < 0 ? 'red' : i >= 4 ? 'accent' : 'fill', fillOpacity: v < 0 ? 0.55 : undefined, color: v < 0 ? 'red' : 'accent', sw: 1.4, rx: 2 });
    c.label([x, v], inr(v), { dy: v < 0 ? 12 : -10, size: 11 });
    s.text(c.X(x), 372 + (i % 2) * 14, name, { size: 11 });
    assert(top >= 0, 'bar');
  });
  c.yTick(1000, '1,000').yTick(-1000, '−1,000');
  return s.visual(
    `Bar chart of the imagined Vanadesh accounts in crore rupees: trade ${VB.bot}, services ${VB.services}, income ${VA.inc}, transfers ${VB.transfers}, current account ${VB.ca}, capital account ${VB.ka} and overall balance ${VB.overall}; bars below the zero line are deficits`,
    'Imagined figures — a trade deficit turned into a current account surplus by invisibles.',
  );
})();

// ---------------------------------------------------------------- tables and flows
const vBopStructure = flow('TB', ['Balance of payments', 'Current account: goods, services, income, transfers', 'Capital account: investment, loans, banking capital', 'Change in official reserves (settles the overall gap)'], 'Flow of the structure of the balance of payments: the current account of goods, services, income and transfers; the capital account of investment, loans and banking capital; and the change in official reserves that settles the overall gap', 'Structure of the balance of payments', [
  { from: 'n1', to: 'n2' }, { from: 'n1', to: 'n3' }, { from: 'n2', to: 'n4' }, { from: 'n3', to: 'n4' },
]);
const vClassify = table(
  ['Imagined transaction', 'Account', 'Receipt or payment'],
  [
    ['A Surat firm exports diamonds', 'Current: goods', 'Receipt'],
    ['Indian families holiday in Thailand', 'Current: services', 'Payment'],
    ['A nurse abroad sends money home', 'Current: transfers', 'Receipt'],
    ['Interest paid on a foreign loan', 'Current: income', 'Payment'],
    ['A foreign firm builds a factory in India', 'Capital: direct investment', 'Receipt'],
    ['An Indian firm repays a foreign loan', 'Capital: loans', 'Payment'],
  ],
  'Table classifying six imagined transactions: diamond exports, holidays abroad, remittances and interest paid on a foreign loan are current account items; a foreign firm building a factory and repaying a foreign loan are capital account items; each marked as a receipt or a payment',
  'Ask: does it change a foreign asset or liability? If yes, capital account.',
);
const vCaKa = table(
  ['Basis', 'Current account', 'Capital account'],
  [
    ['Records', 'Goods, services, income, transfers', 'Investment, loans, banking capital'],
    ['Assets and liabilities', 'No change', 'Changes them'],
    ['Example', 'Tea exports', 'Purchase of shares by foreigners'],
  ],
  'Table distinguishing the current account (goods, services, income and transfers, with no change in assets or liabilities) from the capital account (investment, loans and banking capital, which change assets or liabilities)',
);
const vVanTable = table(
  ['Item', '₹ crore'],
  [['Balance of trade', String(VB.bot)], ['Net services', inr(VB.services)], ['Net primary income', String(VA.inc)], ['Net transfers', String(VB.transfers)], ['Current account balance', String(VB.ca)], ['Capital account balance', String(VB.ka)], ['Overall balance', String(VB.overall)]],
  `Table of the imagined Vanadesh balances: balance of trade ${VB.bot}, net services ${VB.services}, net primary income ${VA.inc}, net transfers ${VB.transfers}, current account ${VB.ca}, capital account ${VB.ka} and overall balance ${VB.overall} crore rupees`,
  'Imagined figures, computed in the build.',
);
const vAutonomous = table(
  ['Autonomous items', 'Accommodating items'],
  [['Undertaken for their own sake (profit, need)', 'Undertaken to settle the gap'], ['Trade, travel, remittances, investment', 'Use of official reserves, loans from abroad to cover the gap'], ['Decide surplus or deficit', 'Make the account balance']],
  'Table comparing autonomous items, undertaken for their own sake such as trade and investment and deciding whether there is a surplus or deficit, with accommodating items such as the use of official reserves, which settle the gap',
);
const vCauses = table(
  ['Cause of a deficit', 'How it works'],
  [
    ['Development imports', 'Machines and equipment for growth raise payments'],
    ['Fall in exports', 'Weak demand abroad or high costs at home'],
    ['Inflation at home', 'Exports dearer, imports cheaper'],
    ['Natural calamities', 'Farm exports fall; food may be imported'],
    ['Debt service', 'Interest and repayments on foreign loans'],
    ['Population growth', 'More imports of food and essentials'],
  ],
  'Table of causes of a balance of payments deficit: development imports, a fall in exports, inflation at home, natural calamities, debt service and population growth, with how each raises payments or cuts receipts',
);
const vMeasures = table(
  ['Measure', 'Effect'],
  [
    ['Export promotion', 'Raises receipts'],
    ['Import substitution', 'Home output replaces imports'],
    ['Import control (tariffs, quotas)', 'Cuts payments'],
    ['Devaluation or depreciation', 'Exports cheaper, imports dearer'],
    ['Attracting foreign capital', 'Capital inflows finance the gap'],
    ['Controlling inflation', 'Keeps exports competitive'],
  ],
  'Table of measures to correct a deficit: export promotion, import substitution, import control through tariffs and quotas, devaluation or depreciation, attracting foreign capital and controlling inflation, with the effect of each',
);
const vDeficitChain = flow('LR', ['Export demand falls', 'Receipts fall', 'Payments exceed receipts', 'Reserves are drawn down'], 'Flow of how a fall in export demand leads to lower receipts, payments greater than receipts on autonomous items, and a fall in official reserves', 'From falling exports to falling reserves');
const vFixedFlex = table(
  ['Basis', 'Fixed rate', 'Flexible rate'],
  [
    ['Set by', 'Government or central bank', 'Demand and supply in the market'],
    ['Reserves needed', 'Large, to defend the rate', 'Little'],
    ['Change in value', 'Devaluation or revaluation', 'Depreciation or appreciation'],
    ['Main merit', 'Certainty for traders', 'Automatic correction of imbalances'],
    ['Main demerit', 'Needs reserves; no automatic correction', 'Uncertainty and speculation'],
  ],
  'Table comparing fixed and flexible exchange rates: who sets the rate, need for reserves, how the value changes, the main merit and the main demerit of each',
);
const vManaged = flow('LR', ['Market sets the rate', 'Sharp swing appears', 'Central bank buys or sells foreign currency', 'Swing is smoothed'], 'Flow of managed floating: the market sets the rate, and when a sharp swing appears the central bank buys or sells foreign currency to smooth it', 'Managed floating');
const vSources = table(
  ['Demand for US dollars (outflows)', 'Supply of US dollars (inflows)'],
  [['Imports of goods and services', 'Exports of goods and services'], ['Travel and study abroad', 'Foreign tourists'], ['Investment abroad', 'Foreign investment at home'], ['Repaying foreign loans', 'Remittances from workers abroad']],
  'Table of sources of demand for US dollars (imports, travel and study abroad, investment abroad, repaying foreign loans) and of supply (exports, foreign tourists, foreign investment at home, remittances)',
);
const vExcess = table(
  ['Rate (₹ per US dollar)', 'Demand (million)', 'Supply (million)', 'Result'],
  [['45', String(qd(45)), String(qs(45)), `Excess demand ${qd(45) - qs(45)}: rate rises`], [String(E0.e), String(qd(E0.e)), String(qs(E0.e)), 'Equilibrium'], ['55', String(qd(55)), String(qs(55)), `Excess supply ${qs(55) - qd(55)}: rate falls`]],
  `Table of the imagined market at three rates: at 45 rupees demand ${qd(45)} exceeds supply ${qs(45)}, at ${E0.e} both are ${E0.q}, and at 55 supply ${qs(55)} exceeds demand ${qd(55)}`,
  'Imagined market, computed from the equations.',
);
const vTerms = table(
  ['Term', 'Direction', 'Caused by', 'System'],
  [['Depreciation', 'Value falls', 'Market forces', 'Flexible'], ['Appreciation', 'Value rises', 'Market forces', 'Flexible'], ['Devaluation', 'Value falls', 'Official decision', 'Fixed'], ['Revaluation', 'Value rises', 'Official decision', 'Fixed']],
  'Table of four terms: depreciation and appreciation are market-driven falls and rises in a currency\'s value under a flexible rate; devaluation and revaluation are official falls and rises under a fixed rate',
);
const vMic = table(
  ['Rate (₹ per US dollar)', `Rupee cost of a ${inr(MIC.usd)} US dollar microscope`],
  [[String(MIC.e1), `₹${inr(MIC_1)}`], [String(MIC.e2), `₹${inr(MIC_2)}`]],
  `Table showing that an imported microscope priced at ${inr(MIC.usd)} US dollars costs ${inr(MIC_1)} rupees at 50 rupees per dollar and ${inr(MIC_2)} rupees at 54, a rise of ${inr(MIC_2 - MIC_1)}`,
  'Imagined prices and rates.',
);
const vDepEffects = flow('LR', ['Rupee depreciates', 'Exports cheaper abroad', 'Imports dearer at home', 'Deficit narrows (if demand responds)'], 'Flow of the effects of a depreciation: exports become cheaper abroad, imports dearer at home, and the deficit narrows if demand responds', 'Effects of depreciation');
const vSummary1 = table(
  ['Idea', 'Key point'],
  [['Balance of payments', 'Record of all transactions with the rest of the world'], ['Balance of trade', 'Goods exports − goods imports'], ['Current account', 'Goods, services, income, transfers'], ['Capital account', 'Investment, loans, banking capital'], ['Deficit', 'Autonomous payments exceed receipts; reserves fall'], ['Remedies', 'Export promotion, import control, devaluation, foreign capital']],
  'Summary table of Part 1: the balance of payments, the balance of trade, the current and capital accounts, the meaning of a deficit and the remedies',
);
const vSummary2 = table(
  ['Idea', 'Key point'],
  [['Exchange rate', 'Price of one currency in another'], ['Fixed vs flexible', 'Official rate vs market rate'], ['Equilibrium', 'Demand for foreign exchange = supply'], ['Demand rises', 'Home currency depreciates'], ['Supply rises', 'Home currency appreciates'], ['Official changes', 'Devaluation and revaluation']],
  'Summary table of Part 2: the exchange rate, fixed and flexible systems, the equilibrium rate, the effects of shifts in demand and supply, and official changes',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Balance of Payments and Foreign Exchange Rate — Part 1: The Balance of Payments',
  goals: [
    'Classify transactions into the current and capital accounts and find the balance of trade',
    'Calculate the current account, capital account and overall balances for a country',
    'Explain the causes of a deficit and the measures to correct it',
  ],
  slides: [
    sl('title', 'The Balance of Payments', {
      b: 'Part 1 — what a country **earns from** and **pays to** the rest of the world, and what happens when it pays more than it earns.',
      v: flow('LR', ['Meaning', 'Current account', 'Capital account', 'Balance of trade', 'Deficits', 'Remedies'], 'Route map of Part 1: meaning of the balance of payments, the current account, the capital account, the balance of trade, deficits and remedies', 'Part 1 at a glance'),
      n: 'Every day, people in India buy goods from abroad, sell software overseas, send money to families and invest in foreign firms. A country keeps a record of all these dealings with the rest of the world. In this part we read that record, add up its parts, and see what a country can do when it pays out more than it earns.',
    }),
    sl('diagram', 'What the balance of payments records', {
      b: 'A **systematic record** of all economic transactions between **residents** and the **rest of the world** in a year.',
      v: vBopStructure,
      n: 'The balance of payments has two main accounts. The current account records goods, services, income and gifts. The capital account records investment, loans and banking capital. When the two together show a gap, the central bank settles it by changing its reserves of foreign currency.',
    }),
    sl('concept', 'Current account and capital account', {
      b: 'The **current account** does not change foreign assets or liabilities; the **capital account** does.',
      v: vCaKa,
      n: 'Here is the test. If a transaction changes what the country owns abroad or owes to foreigners, it is a capital account item, such as a loan or a factory built by a foreign firm. If it does not, such as exports of tea or a tourist\'s hotel bill, it belongs to the current account.',
    }),
    sl('check', 'Quick check: where does it go?', {
      b: 'True or false? Loans and investment are recorded in the capital account.',
      chk: 'tf_ka_assets',
      n: 'Ask whether a loan or an investment changes what the country owns or owes abroad.',
    }),
    sl('example', 'Worked example 1: classifying six transactions', {
      b: 'Place each imagined transaction in its account and mark it as a receipt or a payment.',
      bl: ['Goods and services sold abroad: **current, receipt**.', 'Money sent home by workers abroad: **current (transfers), receipt**.', 'Interest on a foreign loan: **current (income), payment**.', 'Loan repaid, factory built by a foreigner: **capital**.'],
      v: vClassify,
      n: 'Let us sort six transactions. Diamond exports and a nurse\'s remittances bring money in, so they are current account receipts. Holidays abroad and interest on a foreign loan send money out, so they are current account payments. A foreign firm building a factory is a capital receipt, and repaying a loan is a capital payment.',
    }),
    sl('concept', 'Balance of trade', {
      b: '**Balance of trade = merchandise exports − merchandise imports**. It covers **visible** items only.',
      v: vVanTable,
      n: 'The balance of trade is narrower than the balance of payments. It compares only goods, which can be seen and counted at the ports. Services such as software and tourism, income such as interest, and gifts such as remittances are called invisible items, and they are left out of the balance of trade.',
    }),
    sl('check', 'Quick check: a trade balance', {
      b: `Exports of goods ₹${inr(VA.gx)} crore; imports ₹${inr(VA.gm)} crore. Balance of trade?`,
      chk: 'n_vanadesh_bot',
      n: 'Subtract imports of goods from exports of goods, and keep the sign.',
    }),
    sl('example', 'Worked example 2: the accounts of Vanadesh', {
      b: 'Imagined Vanadesh, ₹ crore.',
      bl: [`Trade: ${inr(VA.gx)} − ${inr(VA.gm)} = ${VB.bot}.`, `Current account: ${VB.bot} + ${inr(VB.services)} − ${-VA.inc} + ${VB.transfers} = **${VB.ca}**.`, `Capital account: **${VB.ka}**; overall: **${VB.overall}**.`],
      v: vVanadeshBars,
      n: 'Vanadesh imports more goods than it exports, so its trade balance is in deficit by fourteen hundred crore. But it earns twelve hundred crore net from services and seven hundred crore from remittances. After paying three hundred crore of income abroad, its current account shows a surplus of two hundred crore. With capital inflows of another two hundred, its reserves rise by four hundred crore.',
    }),
    sl('check', 'Quick check: a remittance', {
      b: 'A nurse working abroad sends money to her parents in India. How is it recorded?',
      chk: 'm_remittance',
      n: 'Is anything given in return for the money she sends?',
    }),
    sl('concept', 'Does the balance of payments always balance?', {
      b: 'In **accounting** terms, yes. **Autonomous** items decide whether there is a **surplus or deficit**; **accommodating** items settle it.',
      v: vAutonomous,
      n: 'Because every entry has a matching entry, the whole account always balances on paper. Economists therefore look at autonomous items, those undertaken for their own sake, such as trade and investment. If payments on these exceed receipts, there is a deficit, and accommodating items, such as drawing on reserves, fill the gap.',
    }),
    sl('diagram', 'How a deficit drains reserves', {
      v: vDeficitChain,
      n: 'Follow a deficit. Suppose world demand for a country\'s main export falls. Its earnings drop while its import bill stays high. Payments now exceed receipts, and the central bank has to sell foreign currency from its reserves to settle the difference. A long deficit can run reserves dangerously low.',
    }),
    sl('check', 'Quick check: reserves in a deficit', {
      b: 'True or false? A deficit on autonomous items makes official reserves rise.',
      chk: 'tf_reserves_fall',
      n: 'Where does the central bank find the foreign currency to cover the gap?',
    }),
    sl('concept', 'Causes of a deficit', {
      b: 'Deficits come from **higher payments** or **lower receipts**.',
      v: vCauses,
      n: 'Why do deficits arise? A developing country imports machines for growth. Its exports may fall when costs rise or demand abroad weakens. Inflation makes its goods dear. Floods and droughts cut farm exports. Interest and repayments on foreign loans add to payments, and a growing population needs more imported food.',
    }),
    sl('concept', 'Measures to correct a deficit', {
      b: 'Raise **receipts**, cut **payments**, or **finance** the gap.',
      v: vMeasures,
      n: 'To correct a deficit, a country can promote exports with credit and tax relief, produce at home what it now imports, put duties or quotas on non-essential imports, let its currency fall in value, attract foreign investment, and keep inflation under control so that its goods stay competitive.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up Part 1. The balance of payments records all dealings with the rest of the world. The current account covers goods, services, income and transfers; the capital account covers investment and loans. A deficit on autonomous items is met from reserves, and it can be corrected by raising receipts, cutting payments or attracting capital.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Balance of trade = **goods only**; current account adds **services, income and transfers**.',
        'Interest is a **current** item; repaying a loan is a **capital** item.',
        'Show every subtotal with its **sign** and write "deficit" or "surplus".',
        'In accounting terms the account **always balances**; deficits refer to **autonomous** items.',
        'For remedies, say **how** each one raises receipts or cuts payments.',
      ],
      v: vClassify,
      n: 'Keep the balance of trade to goods only. Remember that interest goes in the current account but the loan itself goes in the capital account. In numericals, show every subtotal with its sign and name it a deficit or a surplus. And when you suggest a remedy, explain how it changes receipts or payments.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Balance of Payments and Foreign Exchange Rate — Part 2: The Foreign Exchange Rate',
  goals: [
    'Explain the meaning of the exchange rate and compare fixed and flexible systems',
    'Show how demand and supply of foreign exchange determine the rate, and the effect of shifts',
    'Distinguish depreciation, appreciation, devaluation and revaluation',
  ],
  slides: [
    sl('title', 'The Foreign Exchange Rate', {
      b: 'Part 2 — the **price of foreign currency**, who sets it, and how **demand and supply** move it.',
      v: flow('LR', ['Meaning', 'Fixed and flexible', 'Demand and supply', 'Equilibrium', 'Shifts', 'Four terms'], 'Route map of Part 2: meaning of the exchange rate, fixed and flexible systems, demand and supply of foreign exchange, equilibrium, shifts, and four terms for changes in value', 'Part 2 at a glance'),
      n: 'To buy anything from abroad, we first need foreign currency. The exchange rate tells us how many rupees one unit of foreign currency costs. In this part we see who decides that price, how demand and supply set it in a free market, and what we call it when the rupee gains or loses value.',
    }),
    sl('concept', 'The exchange rate', {
      b: 'The **exchange rate** is the price of one currency in terms of another, for example rupees per US dollar.',
      v: vSources,
      n: 'If one US dollar costs fifty rupees, that is the exchange rate, here an imagined figure. People need US dollars to pay for imports, foreign travel, studies abroad and loan repayments. Dollars come in from exports, foreign tourists, foreign investment and money sent home by workers abroad.',
    }),
    sl('check', 'Quick check: name the figure', {
      b: 'A board shows "1 US dollar = 50 rupees" (imagined). What is this figure?',
      chk: 'm_fx_meaning',
      n: 'It is the price of one currency in terms of another.',
    }),
    sl('concept', 'Fixed and flexible exchange rates', {
      b: 'A **fixed** rate is set and defended by the authorities; a **flexible** rate is set by the **market**.',
      v: vFixedFlex,
      n: 'Under a fixed system, the government or central bank announces the rate and keeps it there by buying and selling foreign currency, so it needs large reserves. Under a flexible system, demand and supply decide the rate every day. A fixed rate gives certainty; a flexible rate corrects imbalances by itself.',
    }),
    sl('diagram', 'Managed floating', {
      b: 'Most countries today mix the two: the **market** sets the rate, and the central bank **smooths sharp swings**.',
      v: vManaged,
      n: 'Many countries, including India, follow a middle path called managed floating. The market sets the rate, but when it swings sharply, the central bank steps in to buy or sell foreign currency and calm the market, without fixing any particular level.',
    }),
    sl('diagram', 'Equilibrium in the market for US dollars', {
      b: '**Demand** slopes **down**, **supply** slopes **up**; they meet at the **equilibrium rate**.',
      v: vFxEq,
      n: 'Draw the rupee price of a US dollar on the vertical axis and the quantity of dollars on the horizontal axis. When dollars are cheap, imports are cheap, so more dollars are demanded. When dollars are dear, exports are cheap for foreigners, so more dollars are supplied. The curves meet at fifty rupees, in this imagined market.',
    }),
    sl('example', 'Worked example 1: finding the equilibrium', {
      b: `Imagined market: **Qd = ${FX.a} − ${FX.b}e**, **Qs = ${FX.d}e − ${-FX.c}**.`,
      bl: [`Set Qd = Qs: ${FX.b + FX.d}e = ${FX.a - FX.c}.`, `**e = ${E0.e}** rupees per US dollar.`, `**Q = ${E0.q}** million US dollars.`, `At ₹45, excess demand of ${EXCESS_D45} million pushes the rate up.`],
      v: vExcess,
      n: 'Set demand equal to supply. Three hundred minus four times the rate equals six times the rate minus two hundred, so ten times the rate is five hundred and the rate is fifty rupees. One hundred million dollars change hands. At forty-five rupees, buyers want fifty million more than sellers offer, so the price is bid up.',
    }),
    sl('check', 'Quick check: the quantity exchanged', {
      b: `The market clears at ₹${E0.e}. How many US dollars are exchanged?`,
      chk: 'n_eq_quantity',
      n: 'Put the equilibrium rate into the demand equation, and check it with supply.',
    }),
    sl('diagram', 'A rise in demand for US dollars', {
      v: vFxDemand,
      n: 'Now suppose fuel imports rise, so the demand for dollars increases at every rate. The demand curve shifts to the right. The new equilibrium is at fifty-four rupees per dollar, with one hundred and twenty-four million exchanged. A dollar now costs more rupees, so the rupee has depreciated.',
    }),
    sl('diagram', 'A rise in supply of US dollars', {
      v: vFxSupply,
      n: 'Suppose instead that foreign investment pours in, so the supply of dollars rises at every rate. The supply curve shifts to the right. The rate falls to forty-four rupees per dollar, again with one hundred and twenty-four million exchanged. A dollar now costs fewer rupees, so the rupee has appreciated.',
    }),
    sl('example', 'Worked example 2: a shift in demand', {
      b: 'Fuel imports raise demand by **40 million** at every rate.',
      bl: [`New demand: Qd = ${FX.a + 40} − ${FX.b}e.`, `${FX.b + FX.d}e = ${FX.a + 40 - FX.c}, so **e = ${ED.e}**.`, `Q = **${ED.q}** million.`, 'More rupees per dollar: the rupee **depreciates**.'],
      v: vFxDemand,
      n: 'Add forty to the demand equation and solve again. Ten times the rate is now five hundred and forty, so the rate is fifty-four rupees. The quantity is one hundred and twenty-four million. Because each dollar costs more rupees than before, we say the rupee has depreciated against the dollar.',
    }),
    sl('concept', 'Four terms for a change in value', {
      b: '**Depreciation** and **appreciation** happen in the **market**; **devaluation** and **revaluation** are **official** decisions under a fixed rate.',
      v: vTerms,
      n: 'When market forces lower the value of the rupee, it depreciates; when they raise it, it appreciates. Under a fixed system, an official decision to lower the value is a devaluation, and an official decision to raise it is a revaluation. The direction may be the same, but the cause is different.',
    }),
    sl('check', 'Quick check: an official rise', {
      b: 'A government with a fixed rate officially raises its currency\'s value. What is this called?',
      chk: 'm_revaluation',
      n: 'Is the change made by the market or by the authorities, and is the value going up or down?',
    }),
    sl('diagram', 'Who gains and who loses from depreciation', {
      b: 'Exporters gain; importers and those paying abroad lose.',
      v: vMic,
      n: 'A school orders a microscope priced at three thousand dollars. If the rupee depreciates from fifty to fifty-four per dollar before it pays, the microscope costs twelve thousand rupees more. Exporters, on the other hand, get more rupees for each dollar they earn, so they can cut their dollar prices and sell more.',
    }),
    sl('diagram', 'Depreciation and the balance of payments', {
      v: vDepEffects,
      n: 'A depreciation makes the country\'s goods cheaper for foreigners and foreign goods dearer at home. If buyers respond, exports rise and imports fall, and a deficit narrows. That is why a falling currency can act as a natural correction under a flexible rate.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up Part 2. The exchange rate is the price of foreign currency. It is set by the authorities under a fixed system and by the market under a flexible one. In a free market, a rise in demand for foreign currency makes the home currency depreciate, and a rise in supply makes it appreciate.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Label the axes: **rupees per US dollar** (vertical) and **quantity of US dollars** (horizontal).',
        'Demand for foreign exchange slopes **down**; supply slopes **up**.',
        'More rupees per dollar = rupee **depreciates**; fewer = rupee **appreciates**.',
        'Depreciation and appreciation are **market**; devaluation and revaluation are **official**.',
        'Never quote a current exchange rate; use the figures in the question.',
      ],
      v: vTerms,
      n: 'Label the axes carefully. Remember that more rupees per dollar means the rupee has lost value. Keep the market terms apart from the official ones. And in every answer about a shift, say which curve moves, which way, and what happens to the rate and the quantity.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Balance of Payments and Foreign Exchange Rate — Notes',
  sections: [
    {
      h: '1. The balance of payments and its accounts',
      t: 1,
      b: '- **Meaning**: a systematic record of all economic transactions between residents of a country and the rest of the world during a year.\n- **Current account**: trade in **goods** (visible), **services**, **primary income** (interest, dividends, wages) and **transfers** (gifts, remittances). It does not change foreign assets or liabilities.\n- **Capital account**: **direct and portfolio investment**, **loans** (borrowing and repayment), **banking capital** such as deposits of non-residents. It changes foreign assets or liabilities.\n- **Balance of trade** = merchandise exports − merchandise imports (visible items only).',
      terms: [['Visible items', 'Exports and imports of goods.'], ['Invisible items', 'Services, income and transfers.'], ['Capital account', 'The part of the balance of payments that records changes in foreign assets and liabilities.']],
      v: vBopStructure,
      vs: [vCaKa, vClassify],
    },
    {
      h: '2. Working out the balances',
      t: 1,
      b: `- Current account balance = balance of trade + net services + net primary income + net transfers.\n- Overall balance = current account balance + capital account balance; it is settled by a **change in official reserves**.\n- Imagined Vanadesh (₹ crore): trade **${VB.bot}**, services **${VB.services}**, income **${VA.inc}**, transfers **${VB.transfers}**; current account **${VB.ca}**; capital account **${VB.ka}**; overall **${VB.overall}** (reserves rise).\n- Imagined Kesarpur shows the opposite case: a trade **surplus** of ${KB.bot} but a current account **deficit** of ${-KB.ca} because it pays heavily for services and income.`,
      terms: [['Balance of trade', 'The difference between the values of exports and imports of goods.'], ['Current account balance', 'The net result of trade in goods and services, income and transfers.']],
      v: vVanadeshBars,
      vs: [vVanTable],
    },
    {
      h: '3. Disequilibrium: causes',
      t: 2,
      b: '- In accounting terms the balance of payments always balances (double entry). **Disequilibrium** means a gap in **autonomous** items, settled by **accommodating** items such as the use of reserves.\n- **Causes of a deficit**: imports for **development**; a **fall in exports** (high costs, weak foreign demand, poor quality); **inflation** at home; **natural calamities**; **debt service**; **population growth**; political instability that drives capital out.',
      terms: [['Autonomous transactions', 'Transactions made for their own sake, such as trade and investment.'], ['Accommodating transactions', 'Transactions made to settle a gap in autonomous items, such as drawing on reserves.']],
      v: vCauses,
      vs: [vAutonomous, vDeficitChain],
    },
    {
      h: '4. Disequilibrium: corrective measures',
      t: 2,
      b: '- **Export promotion**: tax relief, cheaper credit, trade fairs, better quality.\n- **Import substitution**: produce at home what is now imported.\n- **Import control**: tariffs and quotas on non-essentials.\n- **Devaluation or depreciation**: exports cheaper abroad, imports dearer at home.\n- **Attracting foreign capital** and controlling **inflation**.\n- Quick steps (import control) work fast but can raise costs and invite retaliation; lasting cures (exports, competitiveness) take time.',
      terms: [['Tariff', 'A tax on imported goods.'], ['Import substitution', 'Producing at home goods that were earlier imported.']],
      v: vMeasures,
    },
    {
      h: '5. Exchange rate systems',
      t: 3,
      b: '- **Exchange rate**: the price of one currency in terms of another (here, rupees per US dollar; every rate in SOYL items is imagined).\n- **Fixed rate**: set by the authorities and defended with reserves. Merits: certainty, stable trade and investment, less speculation. Demerits: needs large reserves, no automatic correction, may lead to black markets or sudden devaluations.\n- **Flexible rate**: set by demand and supply. Merits: no need for large reserves, automatic correction of imbalances. Demerits: uncertainty, speculation, swings in import prices.\n- **Managed floating**: market-set rate with central bank action to smooth sharp swings.',
      terms: [['Fixed exchange rate', 'A rate set by the government or central bank and kept there by buying and selling foreign currency.'], ['Flexible exchange rate', 'A rate set by the demand for and supply of foreign exchange in the market.']],
      v: vFixedFlex,
      vs: [vManaged],
    },
    {
      h: '6. Determination of the rate; four terms',
      t: [4, 5],
      b: `- **Demand** for foreign exchange (imports, travel and study abroad, investment abroad, loan repayment) slopes **down**; **supply** (exports, tourists, foreign investment, remittances) slopes **up**.\n- **Equilibrium**: where demand = supply. Imagined market Qd = ${FX.a} − ${FX.b}e, Qs = ${FX.d}e − ${-FX.c}: **e = ${E0.e}**, Q = ${E0.q} million.\n- **Demand up** (e.g. fuel imports): rate rises to ${ED.e}: the rupee **depreciates**. **Supply up** (e.g. foreign investment): rate falls to ${ES.e}: the rupee **appreciates**.\n- **Depreciation / appreciation**: market-driven fall / rise in value (flexible). **Devaluation / revaluation**: official fall / rise (fixed).\n- Example: a ${inr(MIC.usd)} US dollar import costs ₹${inr(MIC_1)} at 50 and ₹${inr(MIC_2)} at 54, a rise of ${PCT} per cent in the rupee price of the dollar.`,
      terms: [['Equilibrium exchange rate', 'The rate at which the demand for foreign exchange equals its supply.'], ['Depreciation', 'A fall in the value of the home currency caused by market forces.'], ['Devaluation', 'An official reduction in the value of the home currency under a fixed rate.']],
      v: vFxEq,
      vs: [vFxDemand, vFxSupply, vTerms],
    },
  ],
  tips: '**Common mistakes**\n- Putting services or remittances in the balance of trade (goods only).\n- Recording repayment of a loan in the current account (it is a capital item; only the interest is current).\n- Saying the rupee "appreciates" when a dollar costs more rupees (it depreciates).\n- Mixing up depreciation (market) and devaluation (official).\n- Quoting a current exchange rate or Indian balance of payments figure instead of using the data given.\n\n**How marks are usually awarded**\n- 1 mark: one correct choice or a precise term.\n- 2 marks: two points, or a definition with an example.\n- 3 marks: a calculation in three steps, or three distinct points.\n- 5 marks: parts with working, a labelled diagram and reasons; ISC 4- and 8-mark questions are set as 2 + 2 and 4 + 4.\n\nAll countries, firms and figures in SOYL practice are imagined; state units and signs in every answer.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['**Balance of payments**', 'Record of all transactions between residents and the rest of the world in a year.', 'definition', 1],
  ['**Balance of trade**', 'Merchandise exports − merchandise imports.', 'formula', 1],
  ['**Visible** vs **invisible** items', 'Visible: goods. Invisible: services, income, transfers.', 'concept', 1],
  ['Four parts of the **current account**', 'Goods, services, primary income, transfers.', 'concept', 1],
  ['What goes in the **capital account**?', 'Investment, loans, banking capital: changes in foreign assets and liabilities.', 'concept', 1],
  ['Interest on a foreign loan', '**Current** account (income) payment.', 'example', 1],
  ['Repaying a foreign loan', '**Capital** account payment.', 'example', 1],
  ['A worker abroad sends money home', '**Current** account transfer receipt.', 'example', 1],
  ['Vanadesh (imagined)', `Trade ${VB.bot}, current ${VB.ca}, capital ${VB.ka}, overall ${VB.overall} (₹ crore).`, 'example', 1],
  ['Does the balance of payments always balance?', 'In **accounting** terms, yes: double entry and reserve changes.', 'exam-tip', 2],
  ['**Autonomous** items', 'Made for their own sake (trade, investment); decide surplus or deficit.', 'definition', 2],
  ['**Accommodating** items', 'Settle the gap, such as drawing on reserves.', 'definition', 2],
  ['Three causes of a deficit', 'Development imports; falling exports; inflation at home.', 'concept', 2],
  ['Three remedies for a deficit', 'Export promotion; import control; attracting foreign capital.', 'concept', 2],
  ['**Import substitution**', 'Producing at home what was imported.', 'definition', 2],
  ['**Exchange rate**', 'Price of one currency in terms of another.', 'definition', 3],
  ['**Fixed** rate', 'Set and defended by the authorities; needs reserves.', 'definition', 3],
  ['**Flexible** rate', 'Set by demand and supply in the market.', 'definition', 3],
  ['A merit of a fixed rate', 'Certainty for traders and investors.', 'concept', 3],
  ['A merit of a flexible rate', 'No large reserves needed; self-correcting.', 'concept', 3],
  ['**Managed floating**', 'Market rate with central bank smoothing of sharp swings.', 'definition', 3],
  ['Why demand for US dollars slopes down', 'Cheaper dollars make imports and foreign assets cheaper in rupees.', 'concept', 4],
  ['Why supply of US dollars slopes up', 'Dearer dollars make exports cheaper for foreigners.', 'concept', 4],
  ['Imagined market equilibrium', `Qd = ${FX.a} − ${FX.b}e, Qs = ${FX.d}e − ${-FX.c}: e = ${E0.e}, Q = ${E0.q}.`, 'example', 4],
  ['Demand for US dollars rises', 'Rate rises: the rupee **depreciates**.', 'concept', 4],
  ['Supply of US dollars rises', 'Rate falls: the rupee **appreciates**.', 'concept', 4],
  ['**Depreciation** vs **devaluation**', 'Market fall (flexible) vs official cut (fixed).', 'exam-tip', 5],
  ['**Appreciation** vs **revaluation**', 'Market rise (flexible) vs official rise (fixed).', 'exam-tip', 5],
  ['Who gains from depreciation?', 'Exporters; importers and borrowers in foreign currency lose.', 'concept', 5],
  ['Rupee price of a dollar: 50 to 54', `A ${PCT} per cent rise: the rupee has depreciated.`, 'example', 5],
]);

// ---------------------------------------------------------------- tests (isc-12-default blueprints)
const T_SHORT = test({
  kind: 'short',
  blueprint: 'isc-12-default-chapter-test-short',
  title: 'Chapter test (short) — Balance of Payments and Foreign Exchange Rate',
  duration: 50,
  sections: [
    { id: 'A', title: 'Section A — Objective (5 marks)', instr: 'Answer all questions. Each carries 1 mark. Choose the correct option.', items: ['m_bop_meaning', 'm_classify_ca', 'm_measure_export', 'm_depreciation', 'ar_bot_bop'] },
    { id: 'B', title: 'Section B — Short answer (4 marks)', instr: 'Answer both questions in about 30–50 words each. Question 7 has an internal choice.', items: ['s_bot_bop', { attempt: 1, keys: ['s_two_causes', 's_fixed_vs_flex'] }] },
    { id: 'C', title: 'Section C — Short answer (6 marks)', instr: 'Answer both questions in about 50–80 words each. Question 9 has an internal choice.', items: ['s3_ca_vs_ka', { attempt: 1, keys: ['s3_measures_three', 's3_dep_effects'] }] },
    { id: 'D', title: 'Section D — Long answer (5 marks)', instr: 'Answer the question in parts, with a labelled diagram.', items: ['l_determination'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'isc-12-default-chapter-test-long',
  title: 'Chapter test (long) — Balance of Payments and Foreign Exchange Rate',
  duration: 100,
  sections: [
    { id: 'A', title: 'Section A — Objective (12 marks)', instr: 'Answer all questions. Each carries 1 mark. Choose the correct option.', items: ['m_bot_visible', 'm_classify_ka', 'm_interest_paid', 'm_autonomous', 'm_cause_inflation', 'm_tariff', 'm_fixed_who', 'm_demand_source', 'm_shift_demand', 'm_dep_exports', 'ar_bop_balances', 'ar_fixed_reserves'] },
    { id: 'B', title: 'Section B — Short answer (6 marks)', instr: 'Answer all three questions in about 30–50 words each. Question 15 has an internal choice.', items: ['s_ca_two_items', 's_demand_reasons', { attempt: 1, keys: ['s_dep_vs_dev', 's_import_substitution'] }] },
    { id: 'C', title: 'Section C — Short answer (12 marks)', instr: 'Answer all four questions in about 50–80 words each. Question 19 has an internal choice.', items: ['s3_vanadesh_classify', 's3_causes_three', 's3_excess_demand', { attempt: 1, keys: ['s3_fixed_merits', 's3_flex_demerits'] }] },
    { id: 'D', title: 'Section D — Long answer (10 marks)', instr: 'Answer question 20, and either question 21 or question 22, in parts with working.', items: ['l_bop_structure', { attempt: 1, keys: ['l_disequilibrium', 'l_fixed_flexible'] }] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t05 of isc-12-economics-ch15 only (balance of payments and its accounts, balance of trade; disequilibrium, causes and measures; exchange rate, fixed and flexible; determination in a free market; depreciation, appreciation, devaluation, revaluation)',
    style: 'ISC 2027 Economics specimen pattern (sources/cisce.md isc-2027-specimen-856-economics): 1-mark MCQs, assertion-reason with option (d) both false, 4-mark (2 + 2) and 8-mark (4 + 4) bank items; chapter tests on the isc-12-default blueprints',
    originality: 'every country, firm, person, figure and case written for this chapter (imagined); no textbook, specimen or past-paper item reused; set-ups differ from SOYL CBSE 12 Economics ch05',
    data: `figures computed in questions.mjs and asserted: Vanadesh trade ${VB.bot}, current ${VB.ca}, capital ${VB.ka}, overall ${VB.overall}; Tamrapur trade ${TB.bot}, current ${TB.ca}, overall ${TB.overall}; Kesarpur trade ${KB.bot}, current ${KB.ca}; imagined market e = ${E0.e}, Q = ${E0.q}; demand shift e = ${ED.e}, Q = ${ED.q}; supply shift e = ${ES.e}, Q = ${ES.q}; microscope ${inr(MIC_1)} and ${inr(MIC_2)}`,
    facts: 'no current Indian balance-of-payments figure or exchange rate; every rate is an imagined number of rupees per US dollar; managed floating described in general terms',
    gate: 'schema, pipeline lint (lintExemplar), deterministic verify checks, the answer-leak scan and the exact-stem originality pre-check run clean on this chapter',
  },
});
