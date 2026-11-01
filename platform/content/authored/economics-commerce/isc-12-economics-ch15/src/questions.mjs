// ISC 12 Economics, ch15 Balance of Payments and Foreign Exchange Rate — question bank. Every country, firm, person and
// figure is imagined by SOYL; no textbook example, exercise, specimen-paper or past-paper item is reused (D-036), and the
// set-ups differ from SOYL's CBSE 12 Economics ch05. No current Indian balance-of-payments figure or exchange rate is
// stated: every rate in an item is an imagined number of rupees per US dollar. Every number in a stem, key or solution is
// computed here and asserted, so stems, keys and solutions cannot drift apart.
// Conventions: balance of trade = merchandise (visible) exports − merchandise imports; current account balance = balance
// of trade + net services + net primary income + net transfers; capital account balance = net capital inflows; overall
// balance (autonomous items) = current + capital account balance, settled by a change in official reserves.
import { Q, mcq, ar, tf, fb, match, ord, num, short, long, caseQ, child } from '../../isc-12-economics-ch01/src/lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const S4 = [70, 110];
const L5 = [100, 150];
const L8 = [150, 220];

const assert = (cond, msg) => { if (!cond) throw new Error(`questions.mjs: ${msg}`); };
export const r3 = (x) => Math.round(x * 1000) / 1000;
export const inr = (n) => r3(n).toLocaleString('en-IN');
const sgn = (n) => (n < 0 ? `(−) ${inr(-n)}` : inr(n));

// ---------------------------------------------------------------- balance-of-payments engine
export function bop(a) {
  const bot = a.gx - a.gm;
  const services = a.sx - a.sm;
  const income = a.inc;
  const transfers = a.tr_in - a.tr_out;
  const ca = bot + services + income + transfers;
  const ka = a.ka.reduce((s, [, v]) => s + v, 0);
  return { bot, services, income, transfers, ca, ka, overall: ca + ka };
}

// (1) Vanadesh (imagined), ₹ crore, one year.
export const VA = {
  gx: 4200, gm: 5600, sx: 2100, sm: 900, inc: -300, tr_in: 800, tr_out: 100,
  ka: [['Foreign direct investment (net)', 600], ['Portfolio investment (net)', -200], ['External commercial borrowing (net)', -200]],
};
export const VB = bop(VA);
assert(VB.bot === -1400 && VB.services === 1200 && VB.transfers === 700, 'vanadesh parts');
assert(VB.ca === 200 && VB.ka === 200 && VB.overall === 400, 'vanadesh balances');

// (2) Tamrapur (imagined), ₹ crore.
export const TA = { gx: 3000, gm: 3800, sx: 1100, sm: 700, inc: -150, tr_in: 250, tr_out: 0, ka: [['Net capital inflows', 100]] };
export const TB = bop(TA);
assert(TB.bot === -800 && TB.ca === -300 && TB.ka === 100 && TB.overall === -200, 'tamrapur');

// (3) Kesarpur (imagined), ₹ crore: a trade surplus with a current-account deficit.
export const KE = { gx: 2600, gm: 2400, sx: 300, sm: 650, inc: -220, tr_in: 90, tr_out: 20, ka: [['Net capital inflows', 260]] };
export const KB = bop(KE);
assert(KB.bot === 200 && KB.services === -350 && KB.transfers === 70, 'kesarpur parts');
assert(KB.ca === -300 && KB.overall === -40, 'kesarpur overall');

// (4) Foreign exchange market (imagined): rupees per US dollar e; millions of US dollars Q.
//     Demand Qd = 300 − 4e; supply Qs = 6e − 200.
export const FX = { a: 300, b: 4, c: -200, d: 6 };
export const eq = (a, b, c, d) => { const e = r3((a - c) / (b + d)); return { e, q: r3(a - b * e) }; };
export const E0 = eq(FX.a, FX.b, FX.c, FX.d);
assert(E0.e === 50 && E0.q === 100, 'fx equilibrium');
export const ED = eq(FX.a + 40, FX.b, FX.c, FX.d); // demand rises by 40 at every rate
assert(ED.e === 54 && ED.q === 124, 'fx demand shift');
export const ES = eq(FX.a, FX.b, FX.c + 60, FX.d); // supply rises by 60 at every rate
assert(ES.e === 44 && ES.q === 124, 'fx supply shift');
export const qd = (e) => r3(FX.a - FX.b * e);
export const qs = (e) => r3(FX.c + FX.d * e);
assert(qd(45) === 120 && qs(45) === 70 && qd(55) === 80 && qs(55) === 130, 'fx off-equilibrium');
export const EXCESS_D45 = qd(45) - qs(45); // 50
export const EXCESS_S55 = qs(55) - qd(55); // 50
assert(EXCESS_D45 === 50 && EXCESS_S55 === 50, 'excess');

// (5) Rupee cost of an import at two rates: a lab microscope priced at 3,000 US dollars.
export const MIC = { usd: 3000, e1: 50, e2: 54 };
export const MIC_1 = MIC.usd * MIC.e1;
export const MIC_2 = MIC.usd * MIC.e2;
assert(MIC_1 === 150000 && MIC_2 === 162000 && MIC_2 - MIC_1 === 12000, 'microscope');

// (6) Percentage change in value: a rate moves from 50 to 54 rupees per US dollar.
export const PCT = r3(((54 - 50) / 50) * 100);
assert(PCT === 8, 'percentage');

const bopTable = (a, b) => `| Item | ₹ crore |\n|---|---|\n| Merchandise exports | ${inr(a.gx)} |\n| Merchandise imports | ${inr(a.gm)} |\n| Exports of services | ${inr(a.sx)} |\n| Imports of services | ${inr(a.sm)} |\n| Net primary income from abroad | ${sgn(a.inc)} |\n| Transfers received | ${inr(a.tr_in)} |\n| Transfers paid | ${inr(a.tr_out)} |\n${a.ka.map(([k, v]) => `| ${k} | ${sgn(v)} |`).join('\n')}`;
export const VA_TABLE_MD = bopTable(VA, VB);
export const TA_TABLE_MD = bopTable(TA, TB);

// ================================================================ t01 Balance of payments: meaning, accounts, balance of trade
Q('m_bop_meaning', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'A Class 12 economics poster in an imagined Raipur school defines the balance of payments. Which definition is correct?',
  opts: [
    'A systematic record of all economic transactions between the residents of a country and the rest of the world in a year',
    'A record of only the goods exported and imported by a country in a year',
    'The difference between a government\'s receipts and its expenditure',
    'The stock of gold and foreign currency held by the central bank',
  ],
  sol: 'The balance of payments records every economic transaction (goods, services, income, transfers and capital) between residents and the rest of the world over a period. Goods alone give the balance of trade; the others describe the budget and the reserves.',
}));
Q('m_bot_visible', mcq({
  t: 1, d: 1, c: 'understanding',
  stem: 'The balance of trade of an imagined island nation, Vanadesh, is worked out from',
  opts: ['exports and imports of goods only', 'exports and imports of goods and services', 'all current and capital account items', 'foreign loans received and repaid'],
  sol: 'The balance of trade compares visible items only: merchandise exports and imports. Adding services, income and transfers gives the current account balance; adding capital flows gives the whole balance of payments.',
}));
Q('m_classify_ca', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which transaction of an imagined Mysuru software firm would be recorded in India\'s current account?',
  opts: [
    'It earns fees for writing programs for a client in Canada',
    'It buys a 30 per cent share in a company in Singapore',
    'It takes a five-year loan from a bank in Japan',
    'It sells some of its shares to an investor in Germany',
  ],
  sol: 'Fees for software services are an export of services, a current account item. Buying a share in a foreign company, borrowing abroad and selling shares to a foreigner change assets or liabilities, so they are capital account items.',
}));
Q('m_classify_ka', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which of these entries for an imagined Tamrapur economy belongs to its capital account?',
  opts: [
    'A foreign car maker builds a factory in Tamrapur',
    'Tamrapur exports tea to Egypt',
    'Tourists from Japan spend money in Tamrapur hotels',
    'Workers abroad send money home to their families',
  ],
  sol: 'Building a factory is foreign direct investment, a capital flow that creates a liability for Tamrapur. Tea exports, tourist spending and workers\' remittances are current account items (goods, services and transfers).',
}));
Q('m_remittance', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'A nurse from an imagined Kerala village working in Oman sends part of her salary to her parents every month. In India\'s balance of payments this is',
  opts: ['a transfer receipt in the current account', 'a capital receipt in the capital account', 'an export of goods', 'an import of services'],
  sol: 'Money sent home without anything given in return is a transfer. Transfers are recorded in the current account; this one is a receipt for India.',
}));
Q('m_interest_paid', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'An imagined Indian steel company borrowed from a foreign bank last year. This year it pays the foreign bank interest of ₹40 crore and repays ₹200 crore of the loan. How are the two payments recorded?',
  opts: [
    'Interest in the current account (income); repayment in the capital account',
    'Both in the current account',
    'Both in the capital account',
    'Interest in the capital account; repayment in the current account',
  ],
  sol: 'Interest is income paid on an asset held by a foreigner, a current account (primary income) payment. Repaying the principal reduces a liability, so it is a capital account payment.',
}));
Q('ar_bop_balances', ar({
  t: 1, d: 3, c: 'analysis', key: 'a',
  a: 'In accounting terms the balance of payments of a country always balances.',
  r: 'It is drawn up on the double-entry system, so every receipt has a matching payment entry, and any gap in autonomous items is settled by a change in official reserves.',
  sol: 'Both are true and R explains A: double entry plus the reserve (accommodating) entries make total receipts equal total payments, even when autonomous items show a surplus or deficit.',
}));
Q('ar_bot_bop', ar({
  t: 1, d: 2, c: 'analysis', key: 'c',
  a: 'A country can have a deficit in its balance of trade and still have a surplus on its current account.',
  r: 'The balance of trade includes services and transfers as well as goods.',
  sol: 'A is true: net earnings from services, income and transfers can more than cover a trade deficit. R is false: the balance of trade covers goods only.',
}));
Q('tf_ka_assets', tf({
  t: 1, d: 1, c: 'recall', ans: true,
  stem: 'True or false? Transactions that change a country\'s foreign assets or foreign liabilities, such as loans and investment, are recorded in the capital account.',
  sol: 'True. The capital account records changes in assets and liabilities: investment flows, borrowing and lending, and banking capital.',
}));
Q('fb_visible', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'Exports and imports of goods, which can be seen and recorded at customs, are called ___ items of the balance of payments.',
  acc: [['visible']],
  sol: 'Goods are visible items; services, income and transfers are invisible items.',
}));
Q('n_vanadesh_bot', num({
  t: 1, d: 2, c: 'understanding', marks: 1, value: VB.bot, unit: '₹ crore',
  stem: `Imagined Vanadesh exported goods worth ₹${inr(VA.gx)} crore and imported goods worth ₹${inr(VA.gm)} crore in a year. Find its balance of trade (in ₹ crore; write a deficit as a negative number).`,
  sol: `Step 1: Balance of trade = merchandise exports − merchandise imports.\nStep 2: ${inr(VA.gx)} − ${inr(VA.gm)} = ${VB.bot}. A deficit of ₹${inr(-VB.bot)} crore.`,
}));
Q('n_vanadesh_ca', num({
  t: 1, d: 3, c: 'application', marks: 2, value: VB.ca, unit: '₹ crore',
  stem: `For imagined Vanadesh (₹ crore): balance of trade ${VB.bot}; exports of services ${inr(VA.sx)}; imports of services ${inr(VA.sm)}; net primary income ${VA.inc}; transfers received ${VA.tr_in} and paid ${VA.tr_out}. Calculate the current account balance.`,
  sol: `Step 1: Net services = ${inr(VA.sx)} − ${VA.sm} = ${inr(VB.services)}; net transfers = ${VA.tr_in} − ${VA.tr_out} = ${VB.transfers}.\nStep 2: Current account balance = ${VB.bot} + ${inr(VB.services)} − ${-VA.inc} + ${VB.transfers} = ${VB.ca}. A surplus of ₹${VB.ca} crore.`,
  scheme: [['Net services and transfers', 1], [`Current account balance ${VB.ca}`, 1]],
}));
Q('n_kesarpur_ca', num({
  t: 1, d: 4, c: 'analysis', marks: 2, value: KB.ca, unit: '₹ crore',
  stem: `Imagined Kesarpur (₹ crore) exports goods worth ${inr(KE.gx)} and imports goods worth ${inr(KE.gm)}; it exports services worth ${KE.sx} and imports services worth ${KE.sm}; its net primary income is ${KE.inc}; it receives transfers of ${KE.tr_in} and pays ${KE.tr_out}. Although it has a trade surplus, find its current account balance (write a deficit as a negative number).`,
  sol: `Step 1: Balance of trade = ${inr(KE.gx)} − ${inr(KE.gm)} = ${KB.bot}; net services = ${KE.sx} − ${KE.sm} = ${KB.services}; net transfers = ${KE.tr_in} − ${KE.tr_out} = ${KB.transfers}.\nStep 2: Current account balance = ${KB.bot} − ${-KB.services} − ${-KE.inc} + ${KB.transfers} = ${KB.ca}. A deficit of ₹${-KB.ca} crore despite the trade surplus.`,
  scheme: [['Trade, services and transfers balances', 1], [`Current account ${KB.ca}`, 1]],
}));
Q('mt_accounts', match({
  t: 1, d: 2, c: 'application', marks: 2,
  stem: 'Match each imagined transaction of India with the part of the balance of payments where it is recorded.',
  pairs: [
    ['A Surat firm exports diamonds to Belgium', 'Current account: merchandise'],
    ['A Goa hotel earns from foreign tourists', 'Current account: services'],
    ['A charity in Pune receives a gift from abroad', 'Current account: transfers'],
    ['A foreign fund buys shares on an Indian stock exchange', 'Capital account: portfolio investment'],
  ],
  sol: 'Goods exports are merchandise; tourist spending is a service export; gifts are transfers; buying shares is a capital (portfolio) flow.',
}));
Q('s_bot_bop', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'A student in an imagined Shimla school uses "balance of trade" and "balance of payments" as if they meant the same. Distinguish the two terms for her.',
  model: 'The **balance of trade** compares only **merchandise exports and imports** (visible items). The **balance of payments** is **wider**: it records goods, **services, income, transfers** and **capital flows**, so it covers every transaction with the rest of the world.',
  sol: 'Coverage of each term.',
  scheme: [['Balance of trade: goods only', 1], ['Balance of payments: all transactions', 1]],
}));
Q('s_ca_two_items', short({
  t: 1, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'Name the components of the current account of the balance of payments and give one example of an invisible item for an imagined port city.',
  model: 'The current account records **trade in goods** (visible), **trade in services**, **primary income** (such as interest and dividends) and **transfers** (gifts and remittances). An invisible item: **shipping charges** earned by the port\'s shipping lines from foreign traders.',
  sol: 'Components and one invisible example.',
  scheme: [['Components named', 1], ['A valid invisible item', 1]],
}));
Q('s3_ca_vs_ka', short({
  t: 1, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Distinguish between the current account and the capital account of the balance of payments on three bases, with an imagined example of each account.',
  model: '1. **Nature**: the current account records transactions that **do not change** a country\'s assets or liabilities (goods, services, income, transfers); the capital account records those that **do** (investment, loans).\n2. **Effect**: current items affect **income and spending now**; capital items affect the **stock of claims** on or by foreigners.\n3. **Examples**: an imagined Ludhiana firm\'s exports of bicycles (current); a foreign company\'s purchase of land for a factory in Ludhiana (capital).',
  sol: 'Three bases with examples.',
  scheme: [['Assets and liabilities basis', 1], ['Second basis', 1], ['Examples for both', 1]],
}));
Q('s3_vanadesh_classify', short({
  t: 1, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Classify each item of the imagined Vanadesh accounts as current or capital, and say whether it is a receipt or a payment: (a) tourists from abroad stay in Vanadesh resorts; (b) Vanadesh repays an old foreign loan; (c) a Vanadesh company pays dividends to its foreign shareholders.',
  model: '(a) **Current account, receipt**: foreigners buy the **services** of Vanadesh resorts, an export of services.\n(b) **Capital account, payment**: repaying the principal **reduces a foreign liability**, so money flows out.\n(c) **Current account, payment**: dividends are **primary income** paid to foreigners on their investment.',
  sol: 'Account and direction for each.',
  scheme: [['(a) current receipt', 1], ['(b) capital payment', 1], ['(c) current payment', 1]],
}));
Q('l_bop_structure', long({
  t: 1, d: 3, c: 'application', marks: 5, wl: L5,
  stem: `The balance of payments of the imagined Vanadesh for one year is given (₹ crore).\n\n${VA_TABLE_MD}\n\n(a) Calculate the balance of trade and the current account balance. [3]\n(b) Calculate the capital account balance and say whether the overall balance shows a surplus or a deficit. [2]`,
  model: `(a) **Balance of trade** = ${inr(VA.gx)} − ${inr(VA.gm)} = **${sgn(VB.bot)}** (deficit). Net services = ${inr(VA.sx)} − ${VA.sm} = ${inr(VB.services)}; net transfers = ${VA.tr_in} − ${VA.tr_out} = ${VB.transfers}. **Current account balance** = ${VB.bot} + ${inr(VB.services)} − ${-VA.inc} + ${VB.transfers} = **${VB.ca}** (surplus): earnings from services and remittances more than cover the trade gap.\n(b) **Capital account balance** = 600 − 200 − 200 = **${VB.ka}**. Overall balance = ${VB.ca} + ${VB.ka} = **${VB.overall}**, a **surplus**, so official reserves rise by ₹${VB.overall} crore.`,
  sol: 'Trade, current, capital and overall balances.',
  scheme: [[`Balance of trade ${VB.bot}`, 1], ['Net services and transfers', 1], [`Current account ${VB.ca}`, 1], [`Capital account ${VB.ka}`, 1], ['Overall surplus and reserves', 1]],
}));

// ================================================================ t02 Disequilibrium: causes and corrective measures
Q('m_autonomous', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Economists at an imagined Bhopal research centre say a country\'s balance of payments is in deficit when',
  opts: [
    'payments on autonomous transactions exceed receipts on them, so reserves must be used',
    'total debits in the account exceed total credits',
    'the government spends more than it collects in taxes',
    'imports of goods exceed imports of services',
  ],
  sol: 'Disequilibrium is judged on autonomous items (those undertaken for their own sake, such as trade and investment). A gap there is settled by accommodating items, such as a fall in reserves. In accounting terms total debits always equal total credits.',
}));
Q('m_cause_inflation', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'Prices in the imagined Tamrapur rise much faster than in its trading partners, while its exchange rate stays fixed. The most likely effect on its balance of payments is',
  opts: [
    'a deficit, as its exports become dearer abroad and imports cheaper at home',
    'a surplus, as foreigners buy more of its goods',
    'no change, because the exchange rate is fixed',
    'a surplus on the capital account only',
  ],
  sol: 'Higher domestic prices make exports less competitive and imports relatively cheaper, so exports fall and imports rise, worsening the balance of payments.',
}));
Q('m_measure_export', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'Which step by the imagined Tamrapur government would help to correct a deficit in its balance of payments?',
  opts: [
    'Giving tax relief and cheaper credit to exporters',
    'Removing all duties on imported luxury cars',
    'Encouraging citizens to holiday abroad',
    'Repaying foreign loans before they fall due',
  ],
  sol: 'Export promotion raises foreign-exchange receipts. Removing duties on luxuries, encouraging foreign holidays and repaying loans early would all raise payments and widen the deficit.',
}));
Q('m_tariff', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'An imagined country puts a 40 per cent duty on imported electronic toys to reduce its deficit. This measure is called',
  opts: ['import control through a tariff', 'export promotion', 'devaluation', 'deficit financing'],
  sol: 'A tax on imports is a tariff, a form of import control that makes imports dearer so that fewer are bought.',
}));
Q('ar_dev_imports', ar({
  t: 2, d: 3, c: 'analysis', key: 'b',
  a: 'A developing country that is building ports, power plants and railways may run a deficit in its balance of payments.',
  r: 'Natural calamities can reduce a country\'s exports of farm goods.',
  sol: 'Both are true, but R does not explain A. A comes from heavy imports of machinery and capital goods for development; R names a different cause of deficits.',
}));
Q('tf_reserves_fall', tf({
  t: 2, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? When an imagined country has a deficit on its autonomous transactions, its official foreign exchange reserves rise.',
  sol: 'False. A deficit means payments exceed receipts on autonomous items; the gap is met by drawing down official reserves (or borrowing), so reserves fall.',
}));
Q('n_tamrapur_overall', num({
  t: 2, d: 3, c: 'application', marks: 2, value: TB.overall, unit: '₹ crore',
  stem: `Imagined Tamrapur has a current account balance of ${TB.ca} and a capital account balance of ${TB.ka} (₹ crore). Find its overall balance of payments position (write a deficit as a negative number).`,
  sol: `Step 1: Overall balance = current account balance + capital account balance.\nStep 2: ${TB.ca} + ${TB.ka} = ${TB.overall}. A deficit of ₹${-TB.overall} crore, met by drawing down reserves.`,
  scheme: [['Method: add the two balances', 1], [`Answer ${TB.overall}`, 1]],
}));
Q('ord_deficit_chain', ord({
  t: 2, d: 2, c: 'analysis', marks: 1,
  stem: 'Arrange the steps by which a sudden fall in world demand for an imagined country\'s main export leads to a fall in its reserves.',
  items: [
    'World demand for its main export falls',
    'Export receipts fall while import payments stay high',
    'Autonomous payments exceed autonomous receipts',
    'The central bank sells foreign currency from its reserves to settle the gap',
  ],
  sol: 'Lower demand cuts export receipts, payments then exceed receipts on autonomous items, and the deficit is settled from reserves.',
}));
Q('s_two_causes', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two causes of a deficit in the balance of payments of a country like the imagined Tamrapur, which imports most of its fuel.',
  model: '1. **Rising fuel import bill**: when world oil prices rise, payments for imports climb sharply.\n2. **Weak exports**: if its goods are dear or of low quality, or foreign demand falls, export receipts stay low.',
  sol: 'Any two valid causes.',
  scheme: [['First cause', 1], ['Second cause', 1]],
}));
Q('s_import_substitution', short({
  t: 2, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'Explain how import substitution could reduce a deficit in an imagined country that imports most of its medicines.',
  model: 'By helping **domestic firms make medicines** at home (with credit, tax relief or research support), the country **buys fewer from abroad**. Import payments fall, so **less foreign exchange** is needed and the deficit narrows.',
  sol: 'Home production replaces imports.',
  scheme: [['Home production of the good', 1], ['Lower import payments', 1]],
}));
Q('s3_measures_three', short({
  t: 2, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'The imagined Tamrapur has a persistent deficit in its balance of payments. Suggest three measures to correct it, explaining how each works.',
  model: '1. **Export promotion**: subsidies, cheaper credit and trade fairs raise **export receipts**.\n2. **Import control**: tariffs or quotas on non-essential imports cut **import payments**.\n3. **Attracting foreign investment**: easier rules for foreign firms bring **capital inflows** that finance the gap (a fall in the external value of its currency, if allowed, also makes exports cheaper and imports dearer).',
  sol: 'Three measures with mechanisms.',
  scheme: [['Export promotion', 1], ['Import control', 1], ['Third measure with mechanism', 1]],
}));
Q('s3_causes_three', short({
  t: 2, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'An economist studying an imagined coastal country finds a deficit in its balance of payments after a cyclone destroyed its rice crop. Explain three causes that may have combined to create this deficit.',
  model: '1. **Natural calamity**: the cyclone cut rice output, so **exports of rice fell** and the country may even have had to **import food**.\n2. **Reconstruction imports**: rebuilding roads and houses needs imported **machinery and materials**, raising payments.\n3. **Inflation**: shortages pushed up domestic **prices**, making its other exports dearer abroad and imports relatively cheaper.',
  sol: 'Three linked causes.',
  scheme: [['Calamity: exports down or food imports up', 1], ['Reconstruction imports', 1], ['Price rise or other valid cause', 1]],
}));
Q('l_disequilibrium', long({
  t: 2, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'A minister of the imagined Tamrapur says, "Our balance of payments deficit is only a problem of too many imports."\n\n(a) Explain three other causes that could lie behind such a deficit. [3]\n(b) Evaluate import control as the only remedy, suggesting one better measure. [2]',
  model: '(a) 1. **Weak exports**: high costs or poor quality keep foreign demand low. 2. **Domestic inflation**: rising prices make exports dear and imports cheap. 3. **Debt service and capital outflows**: interest and loan repayments, or investors moving funds abroad, raise payments even if trade is steady (development imports and calamities are other causes).\n(b) Import control **cuts payments quickly**, but used alone it can **raise costs** for firms that need imported inputs, invite **retaliation** and does nothing about weak exports. A better long-run step is **export promotion** with better quality and lower costs, which **raises receipts** and supports growth.',
  sol: 'Three causes; judgement with an alternative.',
  scheme: [['Cause 1', 1], ['Cause 2', 1], ['Cause 3', 1], ['Limits of import control', 1], ['Better measure justified', 1]],
}));

// ================================================================ t03 Foreign exchange rate; fixed and flexible systems
Q('m_fx_meaning', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'A money-changer\'s board at an imagined Amritsar bus terminal shows "1 US dollar = 50 rupees" (an imagined rate). This figure is the',
  opts: ['foreign exchange rate', 'balance of trade', 'rate of interest', 'terms of trade'],
  sol: 'The foreign exchange rate is the price of one currency in terms of another, here the rupee price of one US dollar.',
}));
Q('m_fixed_who', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Under a fixed exchange rate system in an imagined country, the exchange rate is',
  opts: ['set by the government or central bank and kept there by buying and selling foreign currency', 'decided freely each day by demand and supply in the market', 'fixed by the largest exporters', 'set by the World Bank'],
  sol: 'In a fixed system the authorities announce the rate and defend it, using reserves to buy or sell foreign currency. A market-decided rate describes a flexible system.',
}));
Q('m_flexible_merit', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Which of the following is a merit of a flexible exchange rate, as listed in an imagined Delhi coaching-centre summary?',
  opts: [
    'The central bank does not need large reserves to defend a rate',
    'Traders know exactly what the rate will be next year',
    'Speculation in currencies disappears',
    'The rate never changes',
  ],
  sol: 'With the market setting the rate, the authorities need not hold large reserves to defend it, and imbalances tend to correct themselves. Certainty, absence of speculation and an unchanging rate are features claimed for a fixed system, not a flexible one.',
}));
Q('ar_fixed_reserves', ar({
  t: 3, d: 3, c: 'analysis', key: 'a',
  a: 'A country with a fixed exchange rate needs large reserves of foreign currency.',
  r: 'Its central bank must sell foreign currency whenever demand for it threatens to push the rate above the announced level.',
  sol: 'Both are true and R explains A: defending a fixed rate means meeting any excess demand for foreign currency from reserves.',
}));
Q('ar_flex_stable', ar({
  t: 3, d: 2, c: 'analysis', key: 'd',
  a: 'A flexible exchange rate never changes from day to day.',
  r: 'Under a flexible system the government announces the rate once a year.',
  sol: 'Both are false. A flexible rate moves with demand and supply in the market; a government-announced rate belongs to a fixed system.',
}));
Q('tf_managed', tf({
  t: 3, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? Under managed floating, the rate is mostly set by the market but the central bank buys or sells foreign currency to smooth sharp swings.',
  sol: 'True. Managed floating mixes the two systems: the market sets the rate, and the central bank steps in only to limit sudden large movements.',
}));
Q('s_fixed_vs_flex', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish between fixed and flexible exchange rates on the basis of who sets the rate and whether reserves are needed, using the case of two imagined countries.',
  model: 'In imagined **Country A (fixed)**, the **government or central bank sets** the rate and needs **large reserves** to defend it. In imagined **Country B (flexible)**, **demand and supply** in the market set the rate, and **no reserves** are needed to hold it at any level.',
  sol: 'Two bases.',
  scheme: [['Who sets the rate', 1], ['Need for reserves', 1]],
}));
Q('s3_fixed_merits', short({
  t: 3, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Exporters of handicrafts in an imagined Jaipur cluster prefer a fixed exchange rate. Explain three merits of a fixed rate that support their view.',
  model: '1. **Certainty**: they know the rupee value of future dollar orders, so they can **price and plan** with confidence.\n2. **Encourages trade and investment**: stable rates reduce risk for **long-term contracts** and foreign investors.\n3. **Checks speculation**: as the rate is not expected to move, there is little gain from **speculative buying and selling** of currency.',
  sol: 'Three merits linked to exporters.',
  scheme: [['Certainty for planning', 1], ['Encourages trade and investment', 1], ['Checks speculation', 1]],
}));
Q('s3_flex_demerits', short({
  t: 3, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'An importer of medical equipment in an imagined Kolkata firm complains about a flexible exchange rate. Explain three demerits of a flexible rate from his point of view.',
  model: '1. **Uncertainty**: the rupee cost of equipment he orders today may be **higher when he pays**, so his costs are unpredictable.\n2. **Speculation**: dealers betting on a fall can make the rate **swing more** than trade alone would.\n3. **Hurts long-term contracts**: fear of sudden swings discourages **contracts and investment**, and a falling rupee can push up **import prices** and inflation.',
  sol: 'Three demerits linked to the importer.',
  scheme: [['Uncertainty of cost', 1], ['Speculation', 1], ['Contracts or inflation', 1]],
}));
Q('l_fixed_flexible', long({
  t: 3, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'A debate club in an imagined Lucknow college discusses, "A flexible exchange rate is better than a fixed one."\n\n(a) Give two arguments for a flexible rate and two for a fixed rate. [4]\n(b) State which system you would choose for a large economy and why. [1]',
  model: '(a) **For flexible**: 1. **No large reserves** are needed, since the authorities do not defend any level. 2. **Self-correcting**: a deficit pushes the home currency down, making exports cheaper and imports dearer, which **reduces the deficit**. **For fixed**: 1. **Certainty** for traders and investors, who know future rupee values. 2. **Less speculation** in currency markets, so fewer sudden swings.\n(b) For a large economy, **managed floating** suits best: the market sets the rate and keeps reserves needs low, while the central bank **smooths sharp swings** to keep some certainty.',
  sol: 'Two arguments each; reasoned choice.',
  scheme: [['Flexible argument 1', 1], ['Flexible argument 2', 1], ['Fixed argument 1', 1], ['Fixed argument 2', 1], ['Reasoned choice', 1]],
}));

// ================================================================ t04 Determination of the rate in a free market
Q('m_demand_source', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Which of these creates a demand for US dollars in the imagined market of Vanadesh?',
  opts: [
    'Vanadesh students paying fees to universities in the United States',
    'American tourists spending money in Vanadesh',
    'A US firm investing in a Vanadesh factory',
    'Vanadesh exports of rice to the United States',
  ],
  sol: 'Paying for foreign services (fees abroad) needs US dollars, so it adds to demand for them. Tourists from the US, US investment and exports to the US all bring US dollars in, adding to supply.',
}));
Q('m_supply_source', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Which event would increase the supply of foreign exchange in an imagined Indian market?',
  opts: [
    'More foreign tourists visit Indian heritage sites',
    'Indian firms import more crude oil',
    'Indian families travel abroad more',
    'Indian companies invest more in factories abroad',
  ],
  sol: 'Foreign tourists bring in foreign currency, raising supply. Oil imports, foreign travel and investing abroad all need foreign currency, raising demand.',
}));
Q('m_demand_slope', mcq({
  t: 4, d: 3, c: 'analysis',
  stem: 'In a free market for US dollars in an imagined country, the demand curve slopes downward because, when the rupee price of a US dollar falls,',
  opts: [
    'foreign goods, services and assets become cheaper in rupees, so more are bought',
    'exports become cheaper for foreigners, so more dollars flow in',
    'the central bank must buy more dollars',
    'foreign investors leave the country',
  ],
  sol: 'A lower rupee price of the dollar makes imports, foreign travel and foreign assets cheaper in rupees, so residents demand more dollars. The second option describes the supply side.',
}));
Q('m_eq_rate', mcq({
  t: 4, d: 3, c: 'application',
  stem: `In an imagined foreign exchange market, demand for US dollars is Qd = ${FX.a} − ${FX.b}e and supply is Qs = ${FX.d}e − ${-FX.c}, where e is rupees per US dollar and Q is millions of US dollars. The equilibrium rate is`,
  opts: [`₹${E0.e} per US dollar`, `₹${E0.e + 4} per US dollar`, `₹${E0.e - 6} per US dollar`, `₹${E0.e + 10} per US dollar`],
  sol: `Set Qd = Qs: ${FX.a} − ${FX.b}e = ${FX.d}e − ${-FX.c}, so ${FX.b + FX.d}e = ${FX.a - FX.c} and e = ${E0.e}. At ₹${E0.e}, both demand and supply equal ${E0.q} million US dollars.`,
}));
Q('m_shift_demand', mcq({
  t: 4, d: 3, c: 'analysis',
  stem: 'Imports of gold into an imagined country rise sharply during a wedding season. Under a flexible rate, with other things unchanged, the rupee price of a US dollar will',
  opts: ['rise, because demand for US dollars increases', 'fall, because supply of US dollars increases', 'stay the same, because the market is in equilibrium', 'fall, because demand for US dollars decreases'],
  sol: 'Paying for more gold imports needs more US dollars, so the demand curve shifts right and the rupee price of a dollar rises (the rupee depreciates).',
}));
Q('m_shift_supply', mcq({
  t: 4, d: 3, c: 'analysis',
  stem: 'Foreign firms pour investment into factories in an imagined country. Under a flexible exchange rate, the domestic currency will',
  opts: ['appreciate, because the supply of foreign currency rises', 'depreciate, because demand for foreign currency rises', 'be devalued by the government', 'remain unchanged in every case'],
  sol: 'Investment inflows bring in foreign currency, shifting supply right and lowering the price of foreign currency: the domestic currency appreciates.',
}));
Q('n_eq_quantity', num({
  t: 4, d: 2, c: 'understanding', marks: 1, value: E0.q, unit: 'million US dollars',
  stem: `Demand for US dollars in an imagined market is Qd = ${FX.a} − ${FX.b}e and supply is Qs = ${FX.d}e − ${-FX.c} (e in rupees per US dollar, Q in millions of US dollars). Given that the market clears at e = ${E0.e}, find the quantity of US dollars exchanged.`,
  sol: `Step 1: Substitute e = ${E0.e} in the demand equation: Qd = ${FX.a} − ${FX.b} × ${E0.e} = ${E0.q}.\nStep 2: Check supply: ${FX.d} × ${E0.e} − ${-FX.c} = ${E0.q}. So ${E0.q} million US dollars.`,
}));
Q('n_new_rate', num({
  t: 4, d: 4, c: 'application', marks: 2, value: ED.e, unit: '₹ per US dollar',
  stem: `In the imagined market where Qd = ${FX.a} − ${FX.b}e and Qs = ${FX.d}e − ${-FX.c}, demand for US dollars rises by 40 million at every rate after a rise in fuel imports. Calculate the new equilibrium rate.`,
  sol: `Step 1: New demand Qd = ${FX.a + 40} − ${FX.b}e.\nStep 2: ${FX.a + 40} − ${FX.b}e = ${FX.d}e − ${-FX.c}, so ${FX.b + FX.d}e = ${FX.a + 40 - FX.c} and e = ${ED.e} rupees per US dollar (the rupee depreciates from ${E0.e}).`,
  scheme: [['New demand equation set equal to supply', 1], [`e = ${ED.e}`, 1]],
}));
Q('fb_equilibrium', fb({
  t: 4, d: 1, c: 'recall',
  stem: 'Under a flexible system, the exchange rate at which the demand for foreign exchange equals its supply is called the ___ exchange rate.',
  acc: [['equilibrium']],
  sol: 'Where demand equals supply, the market clears: this is the equilibrium exchange rate.',
}));
Q('s_demand_reasons', short({
  t: 4, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Give two reasons why residents of an imagined country such as Vanadesh demand foreign exchange.',
  model: '1. To pay for **imports** of goods and services, such as machinery or foreign shipping.\n2. To **invest or travel abroad**, for example buying shares of foreign firms or paying for holidays and studies overseas (also to repay foreign loans).',
  sol: 'Any two sources of demand.',
  scheme: [['First reason', 1], ['Second reason', 1]],
}));
Q('s_supply_slope', short({
  t: 4, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'Explain why the supply curve of US dollars in an imagined free market slopes upward from left to right.',
  model: 'When the **rupee price of a US dollar rises**, the country\'s goods become **cheaper for foreigners**, so they buy **more exports** and pay in dollars; foreign tourists and investors also get more for their dollars. More US dollars are therefore **supplied** at a higher rate.',
  sol: 'Higher rate, cheaper exports, more dollars supplied.',
  scheme: [['Exports cheaper for foreigners', 1], ['More dollars supplied', 1]],
}));
Q('s3_excess_demand', short({
  t: 4, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `In the imagined market where Qd = ${FX.a} − ${FX.b}e and Qs = ${FX.d}e − ${-FX.c}, the rate is temporarily ₹45 per US dollar. Calculate the excess demand and explain how the market moves back to equilibrium.`,
  model: `At e = 45, demand = ${FX.a} − ${FX.b} × 45 = **${qd(45)}** and supply = ${FX.d} × 45 − ${-FX.c} = **${qs(45)}** million US dollars, an **excess demand of ${EXCESS_D45} million**. Buyers who cannot get dollars **bid the price up**; as e rises, demand **falls** and supply **rises** until they meet at **₹${E0.e}** with ${E0.q} million exchanged.`,
  sol: 'Compute both quantities; explain the adjustment.',
  scheme: [['Demand and supply at 45', 1], [`Excess demand ${EXCESS_D45}`, 1], [`Adjustment to ${E0.e}`, 1]],
}));
Q('s3_supply_shift_eq', short({
  t: 4, d: 4, c: 'analysis', marks: 3, wl: S3,
  stem: `In the imagined market where Qd = ${FX.a} − ${FX.b}e and Qs = ${FX.d}e − ${-FX.c}, remittances from workers abroad raise the supply of US dollars by 60 million at every rate. Find the new equilibrium rate and quantity, and name the change in the rupee.`,
  model: `New supply: Qs = ${FX.d}e − ${-(FX.c + 60)}. Setting ${FX.a} − ${FX.b}e = ${FX.d}e − ${-(FX.c + 60)} gives ${FX.b + FX.d}e = ${FX.a - FX.c - 60}, so **e = ${ES.e}** and **Q = ${ES.q}** million US dollars. A dollar now costs fewer rupees (${E0.e} to ${ES.e}), so the rupee **appreciates**.`,
  sol: 'Shift supply, solve, name the change.',
  scheme: [['New supply equation', 1], [`e = ${ES.e}, Q = ${ES.q}`, 1], ['Appreciation', 1]],
}));
Q('l_determination', long({
  t: 4, d: 3, c: 'application', marks: 5, wl: L5,
  stem: 'Explain, with a diagram, how the exchange rate is determined in a free foreign exchange market, using an imagined market for US dollars.\n\n(a) State two sources of demand and two sources of supply of US dollars. [2]\n(b) Draw and explain the equilibrium, and what happens at a rate above it. [3]',
  model: '(a) **Demand**: payments for **imports** and for **studies or travel abroad**. **Supply**: receipts from **exports** and inflows of **foreign investment** (also remittances and foreign tourists).\n(b) **Diagram**: the exchange rate (rupees per US dollar) on the vertical axis and the quantity of US dollars on the horizontal axis; demand slopes **downward**, supply slopes **upward**, and they cross at **E**, the **equilibrium rate** where the quantity demanded equals the quantity supplied. **Above E**, supply exceeds demand: sellers of dollars **cut the price**, so the rate **falls** back to E.',
  sol: 'Sources; diagram and adjustment.',
  scheme: [['Two sources of demand', 1], ['Two sources of supply', 1], ['Diagram with axes and curves', 1], ['Equilibrium explained', 1], ['Adjustment above equilibrium', 1]],
}));
Q('l_shifts_both', long({
  t: [4, 5], d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: `In an imagined market, demand for US dollars is Qd = ${FX.a} − ${FX.b}e and supply is Qs = ${FX.d}e − ${-FX.c} (e in rupees per US dollar, Q in millions).\n\n(a) Find the equilibrium rate and quantity. [2]\n(b) Imports of fuel raise demand by 40 million at every rate. Find the new equilibrium and say whether the rupee depreciates or appreciates. [3]`,
  model: `(a) ${FX.a} − ${FX.b}e = ${FX.d}e − ${-FX.c} gives ${FX.b + FX.d}e = ${FX.a - FX.c}, so **e = ${E0.e}**; Q = ${FX.a} − ${FX.b} × ${E0.e} = **${E0.q}** million US dollars.\n(b) New demand Qd = ${FX.a + 40} − ${FX.b}e. Setting it equal to supply: ${FX.b + FX.d}e = ${FX.a + 40 - FX.c}, so **e = ${ED.e}** and Q = ${FX.a + 40} − ${FX.b} × ${ED.e} = **${ED.q}** million. A US dollar now costs **more rupees** (${E0.e} to ${ED.e}), so the rupee **depreciates**: the demand curve has shifted right along an unchanged supply curve.`,
  sol: 'Solve twice; name the change.',
  scheme: [[`e = ${E0.e}`, 1], [`Q = ${E0.q}`, 1], ['New demand set equal to supply', 1], [`e = ${ED.e}, Q = ${ED.q}`, 1], ['Depreciation explained', 1]],
}));

// ================================================================ t05 Depreciation, appreciation, devaluation, revaluation
Q('m_depreciation', mcq({
  t: 5, d: 2, c: 'application',
  stem: 'In an imagined flexible market, the price of a US dollar rises from ₹50 to ₹54 over a month as demand for dollars grows. The rupee has',
  opts: ['depreciated', 'appreciated', 'been devalued', 'been revalued'],
  sol: 'A market-driven fall in the value of the rupee (more rupees per dollar) is depreciation. Devaluation is a deliberate cut by the authorities under a fixed system.',
}));
Q('m_revaluation', mcq({
  t: 5, d: 2, c: 'understanding',
  stem: 'The government of an imagined country with a fixed exchange rate officially raises the value of its currency against the US dollar. This step is called',
  opts: ['revaluation', 'appreciation', 'devaluation', 'depreciation'],
  sol: 'An official increase in the value of a currency under a fixed system is revaluation; the market counterpart under a flexible system is appreciation.',
}));
Q('m_dep_exports', mcq({
  t: 5, d: 3, c: 'analysis',
  stem: 'When the rupee depreciates in an imagined market, which group in India gains most directly?',
  opts: ['Exporters, whose goods become cheaper for foreign buyers', 'Importers of machinery, whose costs fall', 'Families paying fees for children studying abroad', 'Firms repaying loans taken in US dollars'],
  sol: 'A cheaper rupee makes Indian goods cheaper in dollar terms, helping exporters. Importers, families paying fees abroad and dollar borrowers need more rupees per dollar, so they lose.',
}));
Q('n_microscope', num({
  t: 5, d: 3, c: 'application', marks: 2, value: MIC_2 - MIC_1, unit: '₹',
  stem: `A school in an imagined Kochi suburb orders a microscope priced at ${inr(MIC.usd)} US dollars. Before it pays, the rupee depreciates from ₹${MIC.e1} to ₹${MIC.e2} per US dollar. By how many rupees does the microscope\'s cost rise?`,
  sol: `Step 1: Cost before = ${inr(MIC.usd)} × ${MIC.e1} = ${inr(MIC_1)}; cost after = ${inr(MIC.usd)} × ${MIC.e2} = ${inr(MIC_2)}.\nStep 2: Rise = ${inr(MIC_2)} − ${inr(MIC_1)} = ${MIC_2 - MIC_1}, that is ₹${inr(MIC_2 - MIC_1)}.`,
  scheme: [['Both rupee costs', 1], [`Rise ₹${inr(MIC_2 - MIC_1)}`, 1]],
}));
Q('mt_four_terms', match({
  t: 5, d: 2, c: 'understanding', marks: 2,
  stem: 'Match each change in the rupee described by an imagined business newspaper with its correct term.',
  pairs: [
    ['Market forces push the rupee price of a dollar up', 'Depreciation of the rupee'],
    ['Market forces push the rupee price of a dollar down', 'Appreciation of the rupee'],
    ['The authorities officially lower the fixed value of the rupee', 'Devaluation'],
    ['The authorities officially raise the fixed value of the rupee', 'Revaluation'],
  ],
  sol: 'Market-driven changes are depreciation and appreciation; official changes under a fixed system are devaluation and revaluation.',
}));
Q('s_dep_vs_dev', short({
  t: 5, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish between depreciation and devaluation of a currency, giving the system under which each occurs in an imagined economy.',
  model: '**Depreciation** is a fall in the value of the home currency caused by **market demand and supply** under a **flexible** system. **Devaluation** is a **deliberate official cut** in its value by the government or central bank under a **fixed** system.',
  sol: 'Cause and system for each.',
  scheme: [['Depreciation: market, flexible', 1], ['Devaluation: official, fixed', 1]],
}));
Q('s_app_vs_rev', short({
  t: 5, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'A currency dealer in an imagined Mumbai office uses "appreciation" and "revaluation" for the same event. Explain the difference to him.',
  model: '**Appreciation** is a **rise** in the value of the home currency brought about by **market forces** under a flexible rate. **Revaluation** is an **official decision** to raise its value under a **fixed** rate. The direction is the same; the **cause and system** differ.',
  sol: 'Market versus official rise.',
  scheme: [['Appreciation defined', 1], ['Revaluation defined', 1]],
}));
Q('s3_dep_effects', short({
  t: 5, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'The rupee depreciates against the US dollar in an imagined market. Explain its likely effect on (a) exports, (b) imports and (c) the balance of payments deficit.',
  model: '(a) **Exports rise**: Indian goods become **cheaper in dollars**, so foreign buyers purchase more.\n(b) **Imports fall**: foreign goods cost **more rupees**, so residents buy fewer of them.\n(c) With receipts up and payments down, the **deficit narrows**, provided demand at home and abroad responds to the price change.',
  sol: 'Exports, imports, net effect.',
  scheme: [['(a) exports rise', 1], ['(b) imports fall', 1], ['(c) deficit narrows with condition', 1]],
}));

// ================================================================ ISC paper-style items (4-mark, 8-mark) for the bank
Q('q4_vanadesh_balances', short({
  t: 1, d: 3, c: 'application', marks: 4, wl: S4,
  stem: `Answer both parts for the imagined Vanadesh (₹ crore): merchandise exports ${inr(VA.gx)}, merchandise imports ${inr(VA.gm)}, net services ${inr(VB.services)}, net primary income ${VA.inc}, net transfers ${VB.transfers}. [2 + 2]\n\n(i) Calculate the balance of trade and the current account balance.\n(ii) Explain why the two balances have opposite signs.`,
  model: `(i) Balance of trade = ${inr(VA.gx)} − ${inr(VA.gm)} = **${sgn(VB.bot)}**. Current account balance = ${VB.bot} + ${inr(VB.services)} − ${-VA.inc} + ${VB.transfers} = **${VB.ca}**.\n(ii) The trade gap counts **goods only**. Vanadesh earns heavily from **services** (such as software and tourism) and from **remittances**, and these invisible receipts are large enough to **turn the trade deficit into a current account surplus**, even after paying net income abroad.`,
  sol: 'Two balances; role of invisibles.',
  scheme: [[`Balance of trade ${VB.bot}`, 1], [`Current account ${VB.ca}`, 1], ['Invisibles named', 1], ['Why the sign changes', 1]],
}));
Q('q4_fx_market', short({
  t: 4, d: 3, c: 'analysis', marks: 4, wl: S4,
  stem: 'Answer both parts about an imagined free market for US dollars. [2 + 2]\n\n(i) Explain how a rise in foreign tourist arrivals affects the exchange rate.\n(ii) Explain how a rise in the number of students going abroad for study affects it.',
  model: '(i) Tourists bring **US dollars** to spend, so the **supply** of dollars rises (supply curve shifts right). At the old rate there is excess supply, so the rupee price of a dollar **falls**: the rupee **appreciates**.\n(ii) Students must pay **fees and living costs in dollars**, so the **demand** for dollars rises (demand curve shifts right). The rupee price of a dollar **rises**: the rupee **depreciates**.',
  sol: 'Supply shift; demand shift.',
  scheme: [['(i) Supply rises', 1], ['(i) Rupee appreciates', 1], ['(ii) Demand rises', 1], ['(ii) Rupee depreciates', 1]],
}));
Q('q4_systems', short({
  t: 3, d: 2, c: 'understanding', marks: 4, wl: S4,
  stem: 'Answer both parts. [2 + 2]\n\n(i) Explain two demerits of a fixed exchange rate for an imagined country with small reserves.\n(ii) Explain what is meant by managed floating.',
  model: '(i) 1. Defending the rate needs **large reserves**, which a country with small reserves may **run out of**. 2. A deficit is **not corrected automatically**, so pressure builds up until a sudden **devaluation** or **exchange controls** become necessary, and a black market in currency may appear.\n(ii) Under **managed floating**, the exchange rate is set **mainly by the market**, but the central bank **buys or sells foreign currency** to smooth **sharp swings** without fixing any particular level.',
  sol: 'Two demerits; managed floating.',
  scheme: [['(i) Reserves problem', 1], ['(i) No automatic correction', 1], ['(ii) Market-set rate', 1], ['(ii) Central bank smooths swings', 1]],
}));
Q('l8_bop_correct', long({
  t: [1, 2], d: 4, c: 'evaluation', marks: 8, wl: L8,
  stem: `Answer both parts for the imagined Tamrapur. [4 + 4]\n\n${TA_TABLE_MD}\n\n(i) Calculate the balance of trade, the current account balance and the overall balance.\n(ii) Recommend and evaluate two measures to correct the position you find.`,
  model: `(i) Balance of trade = ${inr(TA.gx)} − ${inr(TA.gm)} = **${sgn(TB.bot)}**. Net services = ${inr(TA.sx)} − ${TA.sm} = ${TB.services}; current account = ${TB.bot} + ${TB.services} − ${-TA.inc} + ${TB.transfers} = **${TB.ca}**. Overall = ${TB.ca} + ${TB.ka} = **${TB.overall}**, a **deficit** of ₹${-TB.overall} crore, met by a **fall in reserves**.\n(ii) 1. **Export promotion** (tax relief, cheaper credit, better quality): it raises **receipts** and supports jobs, but results take **time** and depend on foreign demand. 2. **Import control** on non-essentials (tariffs or quotas): it cuts **payments** quickly, but may **raise costs** for firms using imported inputs and invite **retaliation**. **Judgement**: use import control as a **short-run** step to stop the fall in reserves, and rely on export promotion, together with steps to attract **foreign investment** that finances the gap in the meantime, to build a **lasting** improvement. Since the trade gap is the main source of the deficit while services and remittances are positive, policy should focus on making exports **competitive** rather than on cutting essential imports such as machinery.`,
  sol: 'Three balances; two measures evaluated.',
  scheme: [[`(i) Balance of trade ${TB.bot}`, 1], [`(i) Current account ${TB.ca}`, 1], [`(i) Overall ${TB.overall}`, 1], ['(i) Deficit and reserves', 1], ['(ii) Measure 1 explained', 1], ['(ii) Measure 1 evaluated', 1], ['(ii) Measure 2 explained and evaluated', 1], ['(ii) Overall judgement', 1]],
}));
Q('l8_rate_change', long({
  t: [3, 4, 5], d: 4, c: 'analysis', marks: 8, wl: L8,
  stem: `Answer both parts about an imagined market where Qd = ${FX.a} − ${FX.b}e and Qs = ${FX.d}e − ${-FX.c} (e in rupees per US dollar; Q in millions of US dollars). [4 + 4]\n\n(i) Find the equilibrium. Then foreign investment raises supply by 60 million at every rate: find the new equilibrium and name the change in the rupee.\n(ii) Distinguish this change from a revaluation, and explain one effect of it on Indian exporters.`,
  model: `(i) ${FX.a} − ${FX.b}e = ${FX.d}e − ${-FX.c} gives **e = ${E0.e}**, Q = **${E0.q}** million. With supply Qs = ${FX.d}e − ${-(FX.c + 60)}: ${FX.b + FX.d}e = ${FX.a - FX.c - 60}, so **e = ${ES.e}** and **Q = ${ES.q}** million. A dollar now costs **fewer rupees**, so the rupee **appreciates**.\n(ii) This appreciation is caused by **market forces** (more dollars supplied) under a **flexible** rate. A **revaluation** is an **official decision** to raise the value of a currency under a **fixed** rate; the direction is the same, the cause differs. **Effect on exporters**: each dollar earned now brings **fewer rupees** (${E0.e} became ${ES.e}), and Indian goods become **dearer for foreign buyers**, so exporters face **lower earnings** or **lower sales** unless they cut prices. Firms that import inputs, however, gain from cheaper imported materials, which partly offsets the loss. If the appreciation lasts, exporters must raise **productivity** or quality to stay competitive, while importers and families paying fees abroad gain from the stronger rupee.`,
  sol: 'Two equilibria; appreciation versus revaluation; exporters.',
  scheme: [[`(i) e = ${E0.e}, Q = ${E0.q}`, 1], ['(i) New supply set equal to demand', 1], [`(i) e = ${ES.e}, Q = ${ES.q}`, 1], ['(i) Appreciation named', 1], ['(ii) Appreciation: market, flexible', 1], ['(ii) Revaluation: official, fixed', 1], ['(ii) Fewer rupees per dollar earned', 1], ['(ii) Goods dearer abroad', 1]],
}));

// ================================================================ case-based
Q('cb_vanadesh_statement', caseQ({
  t: [1, 2], d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Study the imagined external accounts of Vanadesh and answer the questions that follow. *(Written by SOYL for practice; the country and figures are imagined.)*',
  passage: `**External accounts of Vanadesh for one year (imagined, ₹ crore)**\n\n${VA_TABLE_MD}\n\nThe finance ministry notes that software, tourism and money sent home by workers abroad earn more each year.`,
  parts: [
    child('a', num({ t: 1, d: 2, c: 'understanding', marks: 1, value: VB.services, unit: '₹ crore', stem: 'Calculate net receipts from services (in ₹ crore).', sol: `Net services = ${inr(VA.sx)} − ${VA.sm} = ${VB.services}, that is ₹${inr(VB.services)} crore.` })),
    child('b', num({ t: 1, d: 2, c: 'application', marks: 1, value: VB.ka, unit: '₹ crore', stem: 'Calculate the capital account balance (in ₹ crore).', sol: `Capital account balance = 600 − 200 − 200 = ${VB.ka}, that is ₹${VB.ka} crore.` })),
    child('c', short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): The country has a large trade deficit. Explain how its current account is still in surplus.', model: `Goods alone show a gap of ₹${inr(-VB.bot)} crore, but **net services** (₹${inr(VB.services)} crore) and **net transfers** (₹${VB.transfers} crore) more than make up for it after paying net income abroad, giving a current account **surplus of ₹${VB.ca} crore**.`, sol: 'Invisibles outweigh the trade gap.', scheme: [['Services and transfers named with amounts', 1], ['Surplus explained', 1]] }), [
      short({ t: 2, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): Comment on what will happen to Vanadesh\'s official reserves this year, and whether this is a sign of strength.', model: `With an overall surplus of ₹${VB.overall} crore, **reserves rise** by that amount. It is a **sign of strength**, since earnings from services and remittances are growing; but the large **trade deficit** remains a weakness to watch.`, sol: 'Reserves rise; balanced judgement.', scheme: [['Reserves rise by the surplus', 1], ['Balanced comment', 1]] }),
    ]),
  ],
}));
Q('cb_textile_exporter', caseQ({
  t: [4, 5], d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the imagined letter from an exporter and answer the questions that follow. *(Written by SOYL for practice; the firm and rates are imagined.)*',
  passage: '**Letter from the owner of an imagined Tiruppur knitwear firm to an industry association**\n\nLast quarter the rupee price of a US dollar rose from 50 to 54 in the market, with no change in the government\'s exchange policy. Our buyers in Europe and the United States placed larger orders, and each dollar we earned brought us more rupees. However, the imported dyes and machine parts we use cost more, and our competitors who borrowed in dollars are worried about their repayments.',
  parts: [
    child('a', short({ t: 5, d: 2, c: 'understanding', marks: 1, stem: 'Name the change in the rupee described in the letter.', model: '**Depreciation** of the rupee (a market-driven fall in its value).', sol: 'Market fall in value.', scheme: [['Depreciation', 1]] })),
    child('b', num({ t: 5, d: 2, c: 'application', marks: 1, value: PCT, unit: '%', stem: 'By what percentage did the rupee price of a US dollar rise?', sol: `Rise = (54 − 50) ÷ 50 × 100 = ${PCT}. So ${PCT}%.` })),
    child('c', short({ t: [4, 5], d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Explain why the firm received larger orders.', model: 'With more rupees per dollar, the firm could **cut its dollar prices** without losing rupee income, so its knitwear became **cheaper for foreign buyers**, who therefore **ordered more**.', sol: 'Cheaper in dollars, more orders.', scheme: [['Cheaper in foreign currency', 1], ['More orders follow', 1]] }), [
      short({ t: 5, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): Evaluate whether the change is wholly good for the firm.', model: 'It is **not wholly good**. Exports and rupee earnings rise, but **imported dyes and parts cost more**, squeezing margins, and firms with **dollar loans** must pay more rupees. The net gain depends on how much of its **inputs are imported**.', sol: 'Gains and costs weighed.', scheme: [['Gain stated', 1], ['Costs and conditional judgement', 1]] }),
    ]),
  ],
}));
Q('cb_policy_meeting', caseQ({
  t: [2, 3], d: 4, c: 'evaluation', origin: 'soyl-original',
  stem: 'Read the imagined summary of a policy meeting and answer the questions that follow. *(Written by SOYL for practice; the country is imagined.)*',
  passage: '**Summary of a policy meeting in the imagined Republic of Tamrapur**\n\nTamrapur has kept its currency fixed against the US dollar for ten years. Its oil import bill has doubled, exports of tea have fallen after two droughts, and its foreign exchange reserves now cover only a few weeks of imports. One adviser proposes an official cut in the currency\'s value; another proposes letting the market set the rate; a third wants higher duties on imported cars and electronics.',
  parts: [
    child('a', short({ t: 2, d: 2, c: 'understanding', marks: 1, stem: 'Identify two causes of Tamrapur\'s difficulty from the passage.', model: 'The **doubled oil import bill** and the **fall in tea exports** after droughts.', sol: 'Imports up, exports down.', scheme: [['Both causes', 1]] })),
    child('b', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'What is the official cut in the currency\'s value called?', model: '**Devaluation** (an official cut under a fixed exchange rate).', sol: 'Devaluation.', scheme: [['Devaluation', 1]] })),
    child('c', short({ t: [2, 3], d: 4, c: 'evaluation', marks: 2, stem: '**Either** (i): Evaluate the proposal to let the market set the rate.', model: 'A flexible rate would **save scarce reserves**, since they need not defend a level, and a fall in the currency would **make exports cheaper and imports dearer**, easing the deficit. But it may bring **sharp swings** and dearer oil, so a **managed float** with some central bank smoothing may be safer.', sol: 'Merit, risk, judgement.', scheme: [['Merit: reserves saved, self-correction', 1], ['Risk and reasoned judgement', 1]] }), [
      short({ t: 2, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): Evaluate the proposal to raise duties on imported cars and electronics.', model: 'Higher duties would **cut payments on non-essentials quickly** and save foreign exchange. But they do not touch the **oil bill** or the fall in tea exports, and may invite **smuggling or retaliation**, so they help only as a **short-term** step.', sol: 'Quick saving; limits.', scheme: [['Effect on payments', 1], ['Limits and judgement', 1]] }),
    ]),
  ],
}));
